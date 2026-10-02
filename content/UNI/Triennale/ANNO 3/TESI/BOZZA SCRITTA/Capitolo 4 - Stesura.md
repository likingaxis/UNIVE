# Capitolo 4 — VulcaHealing: closed-loop self-healing

L'identificazione automatica di una non conformità non esaurisce il ciclo di controllo qualità. Se un harness di collaudo si limita a emettere un verdetto negativo e un rapporto di errore, l'onere della diagnosi e dell'intervento correttivo ricade interamente sull'operatore umano, ricreando il medesimo collo di bottiglia che l'automazione intendeva ridurre.

Per completare la pipeline di VulcAIn, ho progettato **VulcaHealing**, un sottosistema incaricato di tentare la riparazione automatica delle macchine didattiche difettose. Operando a valle del collaudo, VulcaHealing riceve il ticket diagnostico generato dal Final Evaluator (§3.8), individua la causa nei file sorgente dell'infrastruttura (*Infrastructure-as-Code*), applica una correzione mirata, coordina la ricompilazione e la ridistribuzione della macchina bersaglio e avvia infine una sessione di ri-collaudo (*regression testing*) per verificare se il problema sia stato effettivamente risolto.

---

## 4.1 Dal rilevamento alla correzione: motivazioni e separazione del sottosistema

Una delle prime decisioni architetturali del progetto ha riguardato la netta separazione tra il modulo collaudatore (**VulcaTest**) e il modulo riparatore (**VulcaHealing**). In prima battuta si potrebbe ipotizzare di demandare la correzione allo stesso modello linguistico che conduce il test, consentendogli di intervenire direttamente sulla macchina attiva non appena riscontra un comando fallito. Nella pratica, questa impostazione presenta limiti sia concettuali che operativi.

La prima ragione riguarda l'asimmetria tra i canali di percezione e azione dei due compiti:
- L'**Executor** di VulcaTest opera *in-band*: agisce da una macchina di attacco esterna (Kali Linux), interagisce unicamente con le interfacce esposte dal bersaglio (porte di rete, socket, sessioni di terminale PTY) e simula il punto di vista di uno studente o di un auditor. Non ha accesso ai file di configurazione con cui la macchina è stata generata, poiché tale conoscenza ne comprometterebbe il realismo e favorirebbe scorciatoie artificiali.
- L'**Healer** di VulcaHealing, al contrario, necessita di una visione *out-of-band* dell'infrastruttura sorgente. Per correggere un difetto in modo persistente non serve modificare la memoria o il filesystem effimero di un container attivo: occorre intervenire sui playbook Ansible, sui Dockerfile e sui file di configurazione da cui l'immagine viene compilata.

La seconda motivazione discende dal principio di separazione delle responsabilità (*Separation of Concerns*, §3.2, Principio 3) [CoALA] e dalla prevenzione del *Goal Drift*: concedere al medesimo agente il compito di collaudare e di riparare incentiva il modello a modificare l'oracolo di prova o ad abbassare i requisiti della checklist pur di dichiarare completato il test. Separando i due ruoli in processi distinti, l'agente riparatore non ha accesso ai criteri di giudizio dell'oracolo, così come il collaudatore non ha permessi di scrittura sui sorgenti dell'infrastruttura.

---

## 4.2 Dalle evidenze alla causa: distinzione tra sintomo e difetto nell’Infrastructure as Code

Anche una volta posizionato l'agente sui file sorgente dell'infrastruttura, sorge un problema metodologico critico: come deve essere interpretato il rapporto di collaudo?

Se il ticket diagnostico (`healing_ticket.json`) venisse trattato come una specifica prescrittiva — alla stregua di un task convenzionale di manutenzione che ordina di *"correggere il componente X"* — l'agente verrebbe sistematicamente indotto in errore. Nelle architetture basate su *Infrastructure-as-Code*, infatti, i difetti di provisioning tendono a propagarsi a cascata lungo la catena delle dipendenze: il punto in cui il malfunzionamento emerge all'esterno quasi mai coincide con la direttiva che lo ha originato.

Questo disallineamento è emerso chiaramente durante lo sviluppo della macchina *DataVault*:
- Il ticket di collaudo registrava un codice HTTP `404 Not Found` sul server web Nginx, indicando quest'ultimo come componente bloccante;
- Un intervento ingenuo avrebbe modificato la configurazione di Nginx (`nginx.conf`) per tentare di forzare la risoluzione dell'endpoint;
- In realtà, Nginx era perfettamente integro: la vera causa del blocco risiedeva a monte, in un task Ansible che configurava in modo errato i permessi del socket Unix di PHP-FPM, impedendo al web server di comunicare con il backend applicativo.

Da questa esperienza discende il principio dell'**Heuristic Lead**: il ticket diagnostico costituisce un *indizio euristico*, utile unicamente a restringere l'area di indagine, e non una direttiva vincolante di modifica. 

```
       ┌────────────────────────┐
       │   TICKET / SINTOMO     │  Es. Errore HTTP 404 registrato su Nginx
       └───────────┬────────────┘
                   │  Indizio di partenza (non prescrizione)
                   ▼
       ┌────────────────────────┐
       │ Risalita della catena  │  Analisi dipendenze: Nginx -> PHP-FPM -> task Ansible
       │ di provisioning IaC    │
       └───────────┬────────────┘
                   │  Isolamento della reale causa radice
                   ▼
       ┌────────────────────────┐
       │ Modifica mirata        │  Correzione permessi socket in machines/datavault.yaml
       │ alla radice causale    │
       └────────────────────────┘
```

L'healer riceve il sintomo come coordinata di partenza, ma ha l'onere di risalire la catena delle dipendenze dichiarative fino a individuare la discrepanza tra l'intento didattico (espresso nella storyline) e la configurazione effettiva delle ricette Ansible.

---

## 4.3 Delega operativa a harness generici: integrazione con Antigravity CLI

Per operare sui sorgenti IaC, le competenze richieste al modello linguistico differiscono da quelle dell'Executor:
- Nel collaudo operativo è prioritaria una bassa latenza per gestire turni di shell ravvicinati su una grammatica di azioni circoscritta;
- Nella riparazione dei sorgenti è necessaria una maggiore capacità di astrazione semantica sul codice (Ansible YAML, Python, Dockerfile e configurazioni di sistema) e sull'editing multi-file.

Per questa ragione, ho affidato la fase di modifica dei sorgenti a un agente esterno, invocato tramite l'interfaccia a riga di comando di **Antigravity** (`agy`).

È opportuno richiamare la distinzione rispetto all'analisi svolta nel paragrafo 3.1:
- Nel Capitolo 3, Antigravity è stato trattato come **contro-esempio** di harness generico inadatto al collaudo didattico, per via dell'assenza di un oracolo evidence-based e dei filtri di moderazione che bloccano i payload di attacco;
- Nel Capitolo 4, Antigravity interviene invece come **strumento operativo** per l'editing del codice sorgente, operando su file di configurazione in un contesto per il quale è espressamente progettato.

In accordo con il principio di intercambiabilità (§3.2, Principio 4), l'integrazione non introduce un vincolo rigido. La logica di interfaccia risiede nel controller Python `healer.py`, che avvia la CLI di Antigravity come processo subprocess in modalità headless (`--mode accept-edits`). Il controller specifica la cartella radice di lavoro, richiede lo streaming degli eventi in formato JSON (`--output-format stream-json`) per tracciare in tempo reale l'uso dei tool e i token consumati, e prefissa le istruzioni con la direttiva speciale `/goal`. Quest'ultima attiva la modalità orientata all'obiettivo di Antigravity, inducendo l'agente a proseguire nell'esplorazione e nell'applicazione delle modifiche fino al completamento del compito o al raggiungimento del timeout.

Qualora si rendesse opportuno sostituire Antigravity con un altro strumento di coding agentico (come Claude Code, OpenHands o un modello locale opportunamente attrezzato), la struttura del controller, il calcolo dei diff e la gestione del ciclo di re-test rimarrebbero inalterati, richiedendo soltanto l'adeguamento del comando di invocazione.

---

## 4.4 Prompt costituzionale, vincoli operativi e perimetro di modifica

Un modello linguistico avanzato istruito genericamente a "correggere gli errori del sistema" tende a comportarsi secondo i canoni della manutenzione software convenzionale: il suo istinto naturale è sanificare le falle e irrobustire le configurazioni. Nel dominio delle macchine didattiche, questo approccio risulterebbe controproducente: **eliminare le vulnerabilità volute vanifica l'intero scopo pedagogico della challenge**.

Per governare il comportamento del modello di frontiera ho strutturato l'ingegneria del prompt attorno a tre elementi complementari: principi deontologici, perimetro di scrittura e retroazione su errori di compilazione pregressi.

### I vincoli deontologici (Constitutional AI)
Seguendo il paradigma della *Constitutional AI* [Constitutional AI], ho definito cinque regole vincolanti nel system prompt del nodo Healer (`_build_healing_prompt`):
1. **Riparazione minima e mirata**: correggere esclusivamente il delta necessario a sbloccare lo step non conforme, senza alterare direttive o impostazioni non correlate.
2. **Divieto di leakage didattico (*No-Leak*)**: non inserire messaggi di aiuto, suggerimenti espliciti (*hints*) o credenziali in chiaro a schermo, per non abbassare la difficoltà prevista per lo studente.
3. **Preservazione categorica delle vulnerabilità didattiche**: le debolezze di sicurezza richieste dalla storyline (binari SUID, injection SQL, permessi permissivi) costituiscono requisiti funzionali della sfida e non devono essere rimosse.
4. **Divieto di modifiche spurie**: se dal confronto tra documentazione e sorgenti emerge che la macchina è già coerente con l'intento didattico, l'agente deve astenersi da modifiche cosmetiche e dichiarare che la causa risiede a monte, terminando la sessione.
5. **Economia di esplorazione**: circoscrivere l'analisi ai soli file indicati nel prompt della sfida corrente, evitando scansioni indiscriminate dell'intero repository.

### Delimitazione del perimetro operativo di scrittura
Oltre ai vincoli comportamentali, il prompt stabilisce una rigida demarcazione dei privilegi di accesso al filesystem:
- **Sorgenti modificabili**: la ricetta dichiarativa della macchina (`machines/<slug>.yaml`) e, qualora presente, il codice sorgente della web application didattica (`registry/web/webapps/<slug>/`).
- **File in sola lettura**: le specifiche di VulcaMind (`STORYLINE_B2R.md`, `WRITEUP.md`), i report del collaudatore (`REPORT.md`, `healing_ticket.json`) e il bundle compilato (`out/<slug>/`).
- **Percorsi interdetti**: il codice del framework (`vulcatest/`, `vulcahealing/`, `generator/`), le configurazioni delle altre challenge e l'ambiente host di virtualizzazione.

La decisione di rendere la directory `out/<slug>/` accessibile in sola lettura risponde a un preciso vincolo del paradigma IaC: tale cartella ospita artefatti derivati (il Dockerfile compilato, il playbook Ansible `setup_machine.yml` e gli script ausiliari) generati automaticamente dal generatore di VulcaForge. Se all'agente fosse consentito scrivere direttamente in `out/`, interverrebbe su file temporanei che verrebbero irrimediabilmente sovrascritti alla prima ricompilazione automatica. Confinando la scrittura alla sola ricetta sorgente `machines/<slug>.yaml`, si assicura che ogni modifica sia registrata in modo persistente alla fonte dichiarativa.

### Cicli informati e iniezione degli errori di compilazione
Coerentemente con il modello concettuale CoALA [CoALA], l'agente riparatore opera in modalità **stateless**: ogni esecuzione di Antigravity costituisce una sessione pulita priva di memoria episodica pregressa (non viene utilizzato il flag `--resume`), prevenendo il consolidamento di allucinazioni o convinzioni errate maturate nei tentativi precedenti.

Tuttavia, l'agente deve poter apprendere dagli esiti delle azioni passate. Tale continuità viene gestita tramite il filesystem: a ogni tentativo viene associata una cartella dedicata numerata progressivamente (`healing_1/`, `healing_2/`, ...). Se una modifica ai sorgenti provoca un errore di compilazione Docker, il controller salva l'intero output del compilatore nel file `healing_{N}/BUILD_ERROR.md`. All'avvio del ciclo successivo, la funzione `find_previous_build_error` rileva l'eventuale errore pregresso e lo inietta in cima al prompt con priorità immediata, imponendo all'agente di correggere l'errore di sintassi o di direttiva appena introdotto prima di riprendere l'analisi dei requisiti didattici.

---

## 4.5 Tracciamento delle modifiche: diff deterministico e validazione delle correzioni

In continuità con il principio *Evidence-Based Execution* e con il rifiuto del *verifier gap* [SWE-bench Pro] adottato nell'Executor (§3.6), VulcaHealing non si affida all'autocertificazione dell'agente riparatore. Non è sufficiente che il modello dichiari nel proprio riepilogo testuale di aver sistemato la configurazione: occorre una verifica oggettiva delle modifiche apportate sul filesystem.

A questo scopo ho sviluppato il modulo deterministico `diff_tracker.py`, che opera secondo la seguente sequenza:
1. **Snapshot iniziale**: prima di avviare Antigravity, la funzione `take_folder_snapshot` scansiona l'albero di directory di VulcaForge, registrando il contenuto testuale di ogni file (escludendo directory binarie come `.git` e `.venv`). Parallelamente, `backup_machine_draft` salva una copia fisica di sicurezza dello stato pre-fix (`draft_pre_fix`);
2. **Esecuzione dell'agente**: Antigravity applica le modifiche sui file consentiti;
3. **Calcolo deterministico delle differenze**: al termine del processo, la funzione `compute_folder_diff` confronta lo stato del filesystem con lo snapshot iniziale mediante la libreria `difflib` di Python, producendo due artefatti:
   - `patch.diff`: il file di differenze unificato standard con l'elenco esatto delle righe aggiunte, eliminate o modificate;
   - `HEALING_REPORT.md`: un riepilogo sintetico dei file interessati e dell'entità del delta.

Questo tracciamento oggettivo garantisce che l'intervento sia realmente avvenuto ed esclude modifiche fantasma o non registrate, fornendo inoltre i dati necessari a quantificare l'ampiezza dell'intervento nel Benchmark B3 del Capitolo 5.

---

## 4.6 Chiusura del ciclo: ricostruzione dell’ambiente e regression testing

Una volta calcolato il diff deterministico, il nodo `healer_node` all'interno dello StateGraph di LangGraph (`white-box/orchestrator/nodes.py`) prende in carico la sequenza operativa necessaria a chiudere il ciclo di retroazione (*closed-loop*):

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

Il flusso operativo comprende cinque fasi sequenziali:

1. **Sincronizzazione del bundle**: il framework invoca lo script `generator/main.py` di VulcaForge per rigenerare gli artefatti in `out/<slug>/` a partire dalla ricetta YAML modificata, traducendo la configurazione aggiornata nei corrispondenti task Ansible e direttive Dockerfile.
2. **Il Gate di compilazione e il caso studio del falso positivo da Terminal Echo**: la compilazione della nuova immagine Docker viene eseguita sull'ambiente Kali Linux attraverso il Terminal Gateway PTY. Durante lo sviluppo è emersa un'anomalia empirica significativa legata alla gestione dei terminali interattivi:

> [!IMPORTANT]
> **Caso Studio CS-2: Il falso positivo da Terminal Echo nel Rebuild Docker**  
> Nelle prime prove, il comando di compilazione Docker veniva inviato sulla sessione PTY nella forma:  
> `docker build -t <image> . && echo __BUILD_SUCCESS__ || echo __BUILD_FAILED__`  
> Il watchdog del Terminal Gateway era impostato per rilevare la stringa `__BUILD_SUCCESS__` come marcatore di conclusione del comando.  
> Tuttavia, i terminali pseudo-TTY replicano in locale (*local echo*) i caratteri ricevuti in ingresso prima della loro elaborazione. Di conseguenza, non appena il comando veniva trasmesso, il terminale restituiva immediatamente indietro la stringa digitata, contenente la parola `__BUILD_SUCCESS__`. Il watchdog intercettava l'eco come segnale di completamento, considerando conclusa la compilazione quando il processo `docker build` era appena iniziato o rischiava di fallire. Di riflesso, il framework avviava il test su un container non aggiornato.  
> Ho risolto il problema spezzando il marcatore nel comando tramite concatenazione di stringhe quotate:  
> `echo '"__BUILD""_""SUCCESS__"'`  
> In questo modo, l'eco del terminale riceve unicamente i frammenti separati `"__BUILD"`, `"_"` e `"SUCCESS__"`, che non attivano la regex del watchdog. Il marcatore contiguo compare nello stream di output unicamente quando la shell ha effettivamente eseguito il comando a valle del build.

Se il marcatore di successo non compare nell'output, si attiva un **gate di sicurezza**: il deploy viene annullato. Procedere con la ridistribuzione in caso di build fallito porterebbe a eseguire il test sul vecchio container mentre i sorgenti su disco risultano modificati, introducendo un disallineamento nello stato del sistema.

3. **Ricreazione del container (Clean Slate)**: a fronte di una compilazione valida, il vecchio container viene arrestato e rimosso, istanziandone uno nuovo a partire dall'immagine aggiornata. Il framework attende un intervallo di riscaldamento di 5 secondi per permettere la stabilizzazione dei servizi di rete interni (Nginx, PHP-FPM, OpenSSH).
4. **Risoluzione dinamica dell'indirizzo IP**: poiché la ricreazione del container può comportare l'assegnazione di un nuovo indirizzo IP all'interno della rete bridge di Docker, il controller interroga il demone tramite `docker inspect` ed estrae via espressione regolare il nuovo indirizzo IPv4 assegnato, aggiornando la variabile `target_ip` nello stato del grafo prima della ripartenza del test.
5. **Regression testing completo**: il controller non ripete soltanto lo step che era fallito: azzera l'indice dei passi (`current_step_index = 0`), reimposta le sessioni di terminale e rinvia il flusso all'Orchestratore per ricominciare il collaudo dal primo passo (`FASE 1`). Questo approccio di regression testing integrale è necessario per verificare che la modifica introdotta non abbia alterato le precondizioni richieste dalle fasi precedenti. Solo una macchina che completa l'intero percorso fino alla fase finale viene considerata riparata.

### Limiti attuali dell'implementazione
L'infrastruttura di riparazione presenta alcuni limiti operativi:
- **Numero di tentativi limitato (`MAX_HEALING_ATTEMPTS=1`)**: nella configurazione predefinita impiegata per la campagna sperimentale, il numero massimo di iterazioni di riparazione per ciascuna macchina è fissato a 1. Se la patch non consente di superare il re-test completo al primo tentativo, il ciclo si arresta con esito negativo. Questa scelta ha permesso di valutare nei benchmark l'accuratezza del primo intervento correttivo, evitando loop prolungati e consumi eccessivi di token su difetti non risolvibili.
- **Copertura dei componenti applicativi**: l'automazione di rigenerazione di VulcaForge presuppone una corrispondenza diretta tra ricette YAML e playbook Ansible. Sfide complesse basate su logiche applicative esterne (come binari compilati custom o architetture distribuite su più macchine) richiedono un set di coordinate sorgente più articolato rispetto a quello attualmente gestito dal prompt di missione.
- **Dipendenza da un modello cloud**: mentre VulcaTest opera interamente su un modello locale a pesi aperti (§3.10), VulcaHealing fa uso di Gemini 3.8 Flash tramite Antigravity. Sebbene questa scelta sia motivata dalla necessità di elevate capacità di refactoring del codice sorgente, un'evoluzione naturale del lavoro consisterà nel valutare l'impiego di modelli locali specializzati nel coding per raggiungere la piena indipendenza da servizi esterni.

### Conclusioni del capitolo
L'integrazione di VulcaHealing completa l'architettura di VulcAIn collegando la fase di collaudo a un meccanismo automatico di correzione a ciclo chiuso.

La separazione tra collaudatore in-band e riparatore out-of-band, l'adozione del principio dell'Heuristic Lead, i vincoli della costituzione di riparazione e il tracciamento deterministico delle modifiche tramite diff consentono di intervenire sui difetti IaC senza ricorrere a interventi manuali e senza compromettere le vulnerabilità didattiche della macchina.

Resta ora da verificare sperimentalmente l'efficacia pratica di questa architettura: con quale accuratezza VulcaTest individua le anomalie rispetto allo stato nominale, e con quale frequenza e ampiezza di modifica VulcaHealing riesce a ripristinare la conformità del percorso di attacco. Questi aspetti costituiscono l'oggetto della valutazione sperimentale presentata nel Capitolo 5.
