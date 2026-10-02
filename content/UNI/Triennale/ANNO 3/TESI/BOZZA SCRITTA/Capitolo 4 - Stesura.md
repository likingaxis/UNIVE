# Capitolo 4 — VulcaHealing: closed-loop self-healing

L'identificazione automatica di una non conformità non esaurisce il ciclo di controllo qualità. Se l'harness di collaudo si limitasse a emettere un verdetto negativo e un rapporto di errore, l'onere della diagnosi e dell'intervento correttivo ricadrebbe interamente sull'operatore umano, ricreando il medesimo collo di bottiglia che l'automazione intende eliminare.

Per completare la pipeline di VulcAIn ho sviluppato **VulcaHealing**, il sottosistema incaricato di tentare la riparazione automatica delle macchine didattiche difettose. Operando a valle del collaudo, VulcaHealing riceve il ticket diagnostico generato dal Final Evaluator (§3.8), localizza la causa del difetto nei file sorgente dell'infrastruttura (*Infrastructure-as-Code*), applica una correzione mirata, coordina la ricompilazione dell'ambiente bersaglio e avvia infine una sessione di ri-collaudo (*regression testing*) per verificare l'effettiva risoluzione della non conformità.

In questo capitolo viene analizzata la struttura di VulcaHealing, evidenziando come la fase di correzione si integri nel medesimo grafo di orchestrazione di VulcaTest senza duplicarne le responsabilità.

---

## 4.1 Integrazione di VulcaHealing nel workflow closed-loop

Una delle scelte architetturali fondamentali del progetto riguarda l'integrazione di VulcaHealing come prosecuzione naturale del collaudo, mantenendo al contempo una netta separazione funzionale tra i due compiti. 

### Separazione funzionale tra collaudo e autoriparazione
In prima battuta si potrebbe ipotizzare di demandare la riparazione allo stesso agente che conduce il test, permettendogli di intervenire sulla macchina attiva non appena riscontra un comando fallito. Questa impostazione presenta tuttavia limiti concettuali e operativi insormontabili:

- **Asimmetria dei punti di vista (in-band vs out-of-band):** L'Executor di VulcaTest opera *in-band*, simulando un attaccante esterno (dalla macchina Kali Linux) che interagisce unicamente con le interfacce esposte dal target (porte di rete, socket, terminale). Non possiede né deve possedere accesso ai file di configurazione con cui l'ambiente è stato generato, poiché tale informazione comprometterebbe il realismo del collaudo. Al contrario, l'Healer richiede una prospettiva *out-of-band*: per correggere un difetto in modo persistente non serve alterare lo stato effimero di un container in esecuzione, ma occorre modificare i playbook Ansible, i Dockerfile e le ricette dichiarative da cui l'immagine viene compilata.
- **Prevenzione del Goal Drift e conflitto di interessi:** Affidare allo stesso agente sia il collaudo sia la correzione incentiva il modello ad abbassare i requisiti della checklist o a considerare risolti passaggi non verificati pur di dichiarare completato il compito (§3.2, Principio 3). Separando rigorosamente i ruoli, l'agente riparatore non ha alcun potere di alterare i criteri di giudizio dell'oracolo, così come il collaudatore non dispone di permessi di scrittura sui sorgenti dell'infrastruttura.

### Estensione dello StateGraph e attivazione condizionale
VulcaHealing non costituisce un'architettura separata o un software indipendente, ma si inserisce come nodo funzionale all'interno del medesimo grafo di orchestrazione LangGraph descritto nel Capitolo 3:

$$\text{Planner} \longrightarrow \text{Orchestrator} \rightleftarrows \text{Executor} \longrightarrow \text{Final Evaluator} \xrightarrow[\text{non conforme}]{\text{healing abilitato}} \text{Healer} \longrightarrow \text{Rebuild} \longrightarrow \text{Orchestrator}$$

Quando il collaudo si conclude con esito negativo e l'autoriparazione è abilitata (`HEALING=true` in configurazione), l'arco condizionale del grafo indirizza il flusso al nodo `healer_node` — l'instradamento dipende unicamente dall'esito del collaudo e dal numero di tentativi già consumati (§4.6), non dalla presenza di un particolare artefatto. In parallelo, il Final Evaluator deposita tra le evidenze di collaudo il file diagnostico `healing_ticket.json`: non è questo a determinare se il flusso vada verso l'Healer, ma è il materiale di corredo alla diagnosi, che alimenta a valle le metriche di accuratezza della RCA discusse nel Capitolo 5.

---

## 4.2 Dal ticket diagnostico alla localizzazione del difetto nell’Infrastructure as Code

La responsabilità della diagnosi qualitativa appartiene interamente al Final Evaluator (§3.8), che attraverso la Root Cause Analysis isola il passo fallito, le evidenze raccolte e il componente di sistema coinvolto. VulcaHealing non ripete tale diagnosi, ma prende in carico il problema a valle: **trasformare la diagnosi in una localizzazione precisa del difetto all'interno dei file sorgente IaC**.

### Il principio dell’Heuristic Lead: sintomo vs causa radice
Nelle architetture basate su Infrastructure as Code, i difetti di configurazione tendono a propagarsi a cascata lungo la catena delle dipendenze: il punto in cui il malfunzionamento emerge all'esterno quasi mai coincide con la direttiva sorgente che lo ha originato.

Trattare il ticket diagnostico come una prescrizione rigida ("correggi il componente X") indurrebbe l'agente in errore. Da questa evidenza discende il principio dell'**Heuristic Lead**: il ticket costituisce un *indizio euristico* di partenza per restringere l'area di indagine, lasciando all'agente l'onere di risalire la catena causale fino al file dichiarativo corretto.

```
       ┌────────────────────────┐
       │   TICKET / SINTOMO     │  Es. HTTP 403 «Access denied.» sulla webshell `.pHP`
       └───────────┬────────────┘
                   │  Indizio di partenza (non prescrizione vincolante)
                   ▼
       ┌────────────────────────┐
       │ Risalita della catena  │  Analisi dipendenze: Nginx -> PHP-FPM -> task Ansible
       │ di provisioning IaC    │
       └───────────┬────────────┘
                   │  Isolamento della reale causa radice
                   ▼
       ┌────────────────────────┐
       │ Modifica mirata        │  Ripristino della direttiva limit_extensions nel task Ansible sorgente
       │ alla radice causale    │
       └────────────────────────┘
```

### Dalla diagnosi alla ricetta dichiarativa: il caso DataVault
Un esempio emblematico è emerso durante il collaudo della macchina didattica *DataVault*:
- Il ticket di collaudo registrava un codice HTTP `403 Forbidden` con corpo `Access denied.` alla richiesta della webshell, portando il Final Evaluator a indicare il web server Nginx come componente bloccante (la sua `recommended_patch` suggeriva di intervenire sulla direttiva `location` di Nginx);
- Un intervento ingenuo avrebbe modificato la configurazione del web server (`nginx.conf`) per tentare di forzare l'accesso alla risorsa;
- In realtà Nginx inoltrava correttamente la richiesta al backend FastCGI: la radice del guasto risiedeva a monte, in un task Ansible che avrebbe dovuto abilitare in PHP-FPM l'esecuzione dell'estensione `.pHP` (direttiva `security.limit_extensions`) ma che veniva silenziosamente saltato — il costrutto `with_fileglob` era risolto sul nodo di controllo anziché sul target — lasciando il container con la configurazione di fabbrica che rifiutava di eseguire la webshell caricata.

L'Healer riceve quindi il sintomo registrato nel report di collaudo (`REPORT.md`, la sintesi distillata della RCA del Final Evaluator) come coordinata iniziale, ma concentra la propria analisi sul confronto tra l'intento didattico descritto nella documentazione e le direttive presenti nei playbook di VulcaForge.

---

## 4.3 L’Healer: delega operativa a harness agentici generici

Per intervenire sui sorgenti Infrastructure as Code, le facoltà cognitive richieste al modello differiscono radicalmente da quelle dell'Executor di VulcaTest:
- Nel collaudo operativo è fondamentale un'interazione a turni serrati, orientata a una sequenza fissa di comandi shell e vincolata a un oracolo deterministico;
- Nella riparazione dei sorgenti è richiesta una capacità avanzata di comprensione semantica del codice, navigazione dell'albero di directory e modifica multi-file su formati eterogenei (YAML di Ansible, Dockerfile, Python, configurazioni Linux).

Per questa ragione, la fase esecutiva di modifica è stata delegata a un agente esterno invocato tramite la CLI di **Google Antigravity** (`agy`).

### Il ruolo complementare degli harness generici nel code editing
Questa scelta evidenzia la complementarietà tra i due approcci discussi nella tesi:
- Nel **conformance testing** (§3.1), un harness generico si è rivelato inadatto a causa della tendenza a cercare scorciatoie e dell'assenza di un oracolo basato su evidenze oggettive;
- Nella **riparazione dei sorgenti**, al contrario, la flessibilità di un harness generico per il coding rappresenta un punto di forza, purché l'azione del modello sia vincolata a un perimetro di modifica rigidamente controllato dal controller esterno.

### Architettura di integrazione con Antigravity CLI
In pieno accordo con il principio di modularità (§3.2, Principio 4), l'integrazione con Antigravity non introduce vincoli proprietari nel framework. L'interfaccia risiede nel controller Python `healer.py`, che avvia la CLI di Antigravity come sottoprocesso in modalità headless (`--mode accept-edits`). 

Il controller imposta la root di lavoro sul repository della sfida, richiede lo streaming degli eventi in formato JSON (`--output-format stream-json`) per tracciare token e strumenti utilizzati, e attiva la modalità orientata all'obiettivo mediante il comando `/goal`. 

Se in futuro si decidesse di sostituire Antigravity con un altro strumento agentico di coding (come Claude Code, OpenHands o un modello locale specializzato), l'intera infrastruttura circostante — calcolo dei diff, gate di compilazione e ciclo di re-test — rimarrà invariata, richiedendo unicamente l'adeguamento del comando di invocazione.

---

## 4.4 Prompt dell’Healer, vincoli operativi e perimetro di modifica

Un modello avanzato istruito genericamente a "correggere gli errori dell'infrastruttura" tende spontaneamente ad applicare le buone pratiche dell'amministrazione di sistema: chiudere porte non necessarie, correggere permessi deboli e sanificare configurazioni vulnerabili. Nel contesto di un Cyber Range didattico, questo comportamento distruggerebbe l'utilità del laboratorio: **eliminare le vulnerabilità volute vanifica l'intero scopo formativo della macchina**.

Per scongiurare questo rischio, il prompt di missione dell'Healer (`_build_healing_prompt`) è strutturato attorno a tre cardini: regole deontologiche esplicite, perimetro rigido dei permessi di scrittura e retroazione sugli errori di compilazione.

### Vincoli di riparazione e preservazione delle vulnerabilità didattiche
Riprendendo concettualmente l'impostazione della *Constitutional AI* (l'impiego di una serie di principi non negoziabili per governare le decisioni del modello), il prompt codifica un insieme di regole vincolanti, sintetizzabili in cinque cardini:
1. **Riparazione minima e mirata:** modificare esclusivamente il codice strettamente indispensabile per sbloccare lo step non conforme, senza alterare altre direttive.
2. **Divieto di leakage didattico (*No-Leak*):** non inserire messaggi di aiuto, suggerimenti o credenziali in chiaro che possano facilitare indebitamente la prova per lo studente.
3. **Preservazione categorica delle vulnerabilità didattiche:** le debolezze di sicurezza previste dal progetto (es. injection SQL, permessi SUID, configurazioni sudo deboli) costituiscono requisiti funzionali della sfida e non devono essere rimosse.
4. **Divieto di modifiche fittizie:** se l'analisi dimostra che i sorgenti sono già conformi e il problema risiede a monte nella specifica di collaudo, l'agente deve astenersi da modifiche arbitrarie e terminare la sessione.
5. **Economia di esplorazione:** limitare l'ispezione ai soli file pertinenti alla macchina in esame, evitando scansioni indiscriminate dell'intero repository.

### Delimitazione del perimetro di scrittura e protezione del bundle
Oltre alle regole di comportamento, il framework impone una netta separazione dei privilegi di scrittura:
- **File modificabili:** la ricetta dichiarativa della macchina (`machines/<slug>.yaml`) ed eventuali sorgenti applicativi dedicati (`registry/web/webapps/<slug>/`).
- **File in sola lettura:** il report di collaudo da cui parte la diagnosi (`REPORT.md`), le specifiche didattiche (`STORYLINE_B2R.md`, `WRITEUP.md`), il ticket diagnostico (`healing_ticket.json`) e la directory del bundle compilato (`out/<slug>/`).
- **Directory interdette:** il codice di VulcaTest e VulcaHealing, le configurazioni delle altre sfide e l'ambiente host di virtualizzazione.

Una convenzione dichiarata nel prompt non è, da sola, una garanzia: l'harness agentico necessita di un accesso in lettura più ampio del solo perimetro consentito (deve poter consultare, ad esempio, la documentazione didattica della challenge), e nulla a livello di sistema operativo gli impedisce fisicamente di scrivere altrove. Per questo il controller non si limita a dichiarare il perimetro, ma lo **verifica a posteriori in modo deterministico**: subito dopo la conclusione della sessione dell'agente — e PRIMA che la ricompilazione automatica del bundle (`out/<slug>/`) abbia luogo, per non confondere un'eventuale scrittura diretta e indebita in quella cartella con la rigenerazione legittima che la segue — confronta l'insieme dei file realmente modificati (lo stesso diff calcolato da `diff_tracker`, §4.5) con il perimetro dichiarato. Ogni file al di fuori di quell'elenco viene automaticamente ripristinato al proprio stato precedente, usando lo snapshot già raccolto per il calcolo del diff. La separazione dei privilegi smette così di dipendere dal buon comportamento del modello e diventa una proprietà strutturale del sistema, verificabile a prescindere dall'esito della sessione agentica.

La protezione della cartella `out/<slug>/` risponde a un preciso principio dell'Infrastructure as Code: in essa risiedono gli artefatti derivati (il Dockerfile assemblato e il playbook `setup_machine.yml`) generati automaticamente da VulcaForge. Consentire all'agente di modificare direttamente i file in `out/` risolverebbe il problema solo temporaneamente, poiché la prima ricompilazione automatica sovrascriverebbe le modifiche. Confinando la scrittura alla sola ricetta dichiarativa `machines/<slug>.yaml`, si assicura che ogni correzione rimanga persistente alla fonte.

### Feedback deterministico su errori di compilazione pregressi
L'Healer opera in modalità **stateless**: ogni invocazione costituisce una sessione pulita priva di memoria pregressa, impedendo che errori accumulati in tentativi precedenti influenzino le decisioni attuali.

Tuttavia, l'agente deve poter apprendere dai fallimenti operativi. Il passaggio di informazioni avviene tramite il filesystem: a ogni ciclo viene associata una cartella progressiva (`healing_1/`, `healing_2/`). Se la modifica introdotta provoca un errore di compilazione Docker o Ansible, il controller cattura l'output del compilatore nel file `BUILD_ERROR.md`. Al tentativo successivo, tale log viene inserito con priorità in cima al prompt, costringendo il modello a risolvere l'errore di sintassi o di direttiva appena introdotto prima di proseguire.

---

## 4.5 Tracciamento e validazione delle modifiche

In continuità con il principio dell'esecuzione basata su evidenze (§3.2, Principio 2), VulcaHealing rifiuta qualunque forma di auto-certificazione da parte del modello. Il fatto che l'agente dichiari di aver risolto il problema non costituisce una prova: le modifiche devono essere riscontrate oggettivamente sul filesystem.

### Rifiuto dell’auto-certificazione nella fase di riparazione
La validazione delle correzioni non si basa sull'output testuale generato da Antigravity, ma su un controllo deterministico affidato al modulo Python `diff_tracker.py`. 

### Snapshot, calcolo del diff deterministico e artefatti generati
Il modulo gestisce il ciclo di controllo attraverso tre passaggi sequenziali:
1. **Snapshot iniziale:** prima di avviare l'agente, la funzione `take_folder_snapshot` scansiona l'albero di directory della sfida registrando il contenuto testuale di ciascun file. Contemporaneamente, `backup_machine_draft` genera una copia fisica di sicurezza dello stato pre-riparazione (`draft_pre_fix`).
2. **Intervento dell'agente:** l'Healer applica le modifiche sui file autorizzati entro il perimetro consentito.
3. **Calcolo deterministico del differenziale:** al termine dell'esecuzione, la funzione `compute_folder_diff` confronta lo stato del filesystem con lo snapshot iniziale mediante la libreria Python `difflib`, generando due artefatti formali:
   - `patch.diff`: il file di differenze unificato standard, che traccia esattamente ogni riga aggiunta, rimossa o modificata;
   - `HEALING_REPORT.md`: un riepilogo leggibile dei file coinvolti e dell'entità delle variazioni.

Oggi un diff vuoto non interrompe il ciclo: la ricompilazione del bundle e il redeploy del container (§4.6) vengono comunque eseguiti anche quando l'Healer non ha applicato alcuna patch, per poi ripresentare al retest esattamente lo stesso esito di partenza. Condizionare il salto di queste fasi all'esito `DECLINED`/`OUT_OF_SCOPE` — reso ora esplicito proprio da questo diff (§4.6) — è un'ottimizzazione identificata ma non ancora implementata, rimandata per non introdurre variazioni non controllate nei dati di benchmark già raccolti con il comportamento attuale. La misura delle righe modificate resta comunque il dato oggettivo impiegato per quantificare l'ampiezza dell'intervento nei benchmark del Capitolo 5.

---

## 4.6 Chiusura del ciclo: ricostruzione dell’ambiente e regression testing

Una volta convalidato il diff, il controllo ritorna al nodo `healer_node` all'interno dello StateGraph di LangGraph, che avvia la sequenza di operazioni necessarie a chiudere il ciclo di retroazione (*closed-loop*):

```
       ┌────────────────────────┐
       │ Modifica sorgente YAML │
       └───────────┬────────────┘
                   │
                   ▼
       ┌────────────────────────┐
       │ Sincronizzazione bundle│  (generator/main.py generate)
       │ con VulcaForge         │
       └───────────┬────────────┘
                   │
                   ▼
       ┌────────────────────────┐
       │ docker build su Kali   │
       │ con Gate Echo-Safe     │  (echo '"__BUILD""_""SUCCESS__"')
       └───────────┬────────────┘
                   │
          Compilazione riuscita?
          /                    \
     SÌ  /                      \  NO
        ▼                        ▼
 ┌──────────────────────┐   ┌─────────────────────────────┐
 │ Clean Slate: ricrea  │   │ Annulla deploy, salva       │
 │ container Docker     │   │ BUILD_ERROR.md e inietta    │
 └──────────┬───────────┘   │ nel ciclo successivo        │
            │               └─────────────────────────────┘
            ▼
 ┌──────────────────────┐
 │ Risolvi nuovo IP via │
 │ docker inspect       │
 └──────────┬───────────┘
            │
            ▼
 ┌──────────────────────┐
 │ Reset stato grafo:   │
 │ Re-Test da FASE 1    │
 └──────────────────────┘
```

### Pipeline di rebuild e il gate di compilazione Echo-Safe
La ricompilazione e la ridistribuzione della macchina seguono un percorso rigoroso:
1. **Sincronizzazione del bundle:** il framework invoca lo script `generator/main.py` di VulcaForge per tradurre la ricetta dichiarativa aggiornata nel nuovo playbook Ansible e nel relativo Dockerfile in `out/<slug>/`.
2. **Compilazione su Kali e Gate Echo-Safe:** la compilazione della nuova immagine viene lanciata sul nodo Kali Linux attraverso il Terminal Gateway PTY. Durante lo sviluppo è emersa un'anomalia empirica legata all'eco locale dei terminali pseudo-TTY:

> [!NOTE]
> **Il falso positivo da Terminal Echo nel Rebuild Docker**  
> Nelle versioni preliminari, il comando di compilazione veniva inviato nella forma:  
> `docker build -t <image> . && echo __BUILD_SUCCESS__ || echo __BUILD_FAILED__`  
> Poiché i terminali PTY replicano immediatamente in ingresso i caratteri digitati (*local echo*), il watchdog intercettava la stringa `__BUILD_SUCCESS__` restituita dall'eco prima ancora che il comando fosse eseguito, considerando erroneamente conclusa la compilazione.  
> Il problema è stato risolto spezzando il marcatore tramite concatenazione di stringhe quotate:  
> `echo '"__BUILD""_""SUCCESS__"'`  
> In questo modo l'eco del terminale riceve frammenti separati che non attivano la regex del watchdog, mentre il marcatore contiguo compare nell'output solo dopo l'effettiva conclusione del processo di build.

Se il build non si conclude con successo, interviene un gate deterministico: il deploy viene abortito e l'errore registrato per il ciclo successivo, evitando di testare un ambiente disallineato rispetto ai sorgenti.

### Ripristino dello stato e regression testing integrale
A fronte di una compilazione riuscita, il sistema ricrea l'ambiente partendo da uno stato pulito (*Clean Slate*):
- Il vecchio container viene terminato e rimosso, avviando una nuova istanza a partire dall'immagine aggiornata;
- Viene applicata una pausa di stabilizzazione di 5 secondi per consentire l'avvio ordinato dei servizi di rete (Nginx, PHP-FPM, OpenSSH);
- Tramite `docker inspect`, il controller estrae dinamicamente il nuovo indirizzo IPv4 assegnato al container e aggiorna il campo `target_ip` nello stato del grafo;
- **Regression testing integrale:** il flusso non ripete unicamente lo step che era fallito, ma azzera l'indice dei passi (`current_step_index = 0`) e riavvia il collaudo dalla prima fase (`FASE 1`). Questo passaggio è indispensabile per accertare che la correzione introdotta non abbia prodotto effetti collaterali indesiderati, alterando la raggiungibilità degli step precedenti.

### Condizioni di terminazione del ciclo e limiti attuali
Per impedire cicli infiniti e contenere i consumi di calcolo, il loop di autoriparazione è regolato da precise condizioni di arresto:
- **Limite sui tentativi (`MAX_HEALING_ATTEMPTS=1`):** nella configurazione predefinita adottata per la validazione sperimentale, il numero massimo di iterazioni correttive per ciascuna macchina è impostato a 1. Se la patch non consente di superare l'intero collaudo di conformità al primo tentativo, il ciclo si arresta con esito negativo, consentendo di misurare con precisione il tasso di successo del primo intervento correttivo.
- **Classificazione strutturata dell'esito:** ogni ciclo di healing termina con un verdetto esplicito — `PATCHED` (una modifica reale è stata applicata nel perimetro consentito), `DECLINED` (l'agente ha correttamente concluso che la causa è a monte, §4.4, senza applicare alcuna patch), `OUT_OF_SCOPE` (l'unica scrittura rilevata era fuori perimetro ed è stata automaticamente ripristinata), oppure `ERROR` (l'harness agentico è terminato con un errore o un timeout). Il solo codice di uscita del processo non basta a distinguerli — l'harness termina con successo tanto quando applica una correzione quanto quando declina onestamente — per cui il verdetto viene derivato dal confronto fra il diff e il perimetro dichiarato (§4.4), non dal codice di uscita.
- **Convergence guard (predisposto, non ancora esercitato):** quando il numero di tentativi consentiti è superiore a uno, un controllo aggiuntivo confronta l'esito del ciclo appena concluso e lo step di conformità che lo aveva innescato con quelli del tentativo precedente: se un ciclo `DECLINED`/`OUT_OF_SCOPE` lascia il retest bloccato sullo stesso identico step, il loop si interrompe anziché ripetere lo stesso esito. Con `MAX_HEALING_ATTEMPTS=1` questo controllo non può mai attivarsi — non esiste un "tentativo precedente" con cui confrontarsi — ma resta pronto per quando il budget di tentativi verrà aumentato.
- **Distinzione tra guasto dello strumento e difetto della macchina:** un'eccezione imprevista nelle fasi di rebuild/redeploy (ad esempio una caduta della connessione verso il Terminal Gateway) viene etichettata esplicitamente come guasto dell'infrastruttura di collaudo, distinta dal gate di build Echo-Safe descritto sopra e mai registrata, nei dati aggregati, come un difetto di conformità della macchina bersaglio.
- **Dipendenza da modelli esterni:** mentre VulcaTest opera interamente su pesi locali aperti (§3.10), VulcaHealing si affida al modello Gemini 3.8 Flash tramite Antigravity CLI — nella configurazione sperimentale del Capitolo 5, la variante `gemini-3.8-flash-high` — per gestire compiti complessi di refactoring del codice. La transizione della fase di healing verso modelli locali specializzati nella programmazione rappresenta uno dei principali sviluppi futuri del lavoro (§6.3).

---

## Conclusioni del capitolo: verso la valutazione sperimentale

L'introduzione di VulcaHealing completa l'architettura complessiva di VulcAIn, realizzando un ciclo chiuso tra verifica di conformità e autoriparazione guidata dell'Infrastructure as Code.

L'asimmetria operativa tra testing in-band e riparazione out-of-band, l'interpretazione del ticket secondo il principio dell'Heuristic Lead, i vincoli espliciti di preservazione delle vulnerabilità didattiche, il tracciamento oggettivo del diff e il collaudo di regressione integrale permettono di sanare i difetti di generazione senza richiedere l'intervento dell'operatore umano.

Definita la struttura teorica e implementativa dei moduli, il **Capitolo 5** presenta la campagna sperimentale condotta su un dataset eterogeneo di macchine didattiche, analizzando quantitativamente la capacità di rilevamento delle non conformità, l'accuratezza diagnostica del Final Evaluator e l'efficacia correttiva di VulcaHealing.
