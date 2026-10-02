# Capitolo 3 — Architettura e implementazione di VulcaTest

## 3.1 Requisiti e limiti delle soluzioni generiche

L’obiettivo di VulcaTest è verificare che una macchina didattica vulnerabile sia conforme a quanto previsto in fase di progettazione e che possa essere risolta seguendo il percorso di attacco previsto (_intended path_). La validazione non deve quindi limitarsi ad accertare che la macchina sia genericamente compromettibile, ma deve controllare che ogni passaggio didattico previsto sia realmente funzionante e accessibile con le modalità stabilite.

Una prima sperimentazione è stata condotta impiegando Google Antigravity con Gemini 3.8 Flash High, configurato mediante un system prompt dedicato e collegato agli strumenti operativi attraverso il protocollo MCP. L’obiettivo di questa fase esplorativa era verificare se un modello di frontiera, dotato degli strumenti necessari e guidato da istruzioni dettagliate, fosse in grado di condurre autonomamente la verifica di penetrazione. Le prove empiriche hanno tuttavia evidenziato limiti strutturali che rendono un harness generico poco idoneo al conformance testing richiesto da VulcaTest.

### Il livello del modello: guardrail e costi di esecuzione

Un primo limite riguarda i filtri di sicurezza e i guardrail applicati ai modelli commerciali di frontiera. Diverse operazioni ordinarie di penetration testing — quali la scansione aggressiva delle porte, la generazione di payload di exploit o l'interazione con servizi vulnerabili — possono attivare i filtri di allineamento del provider, pur essendo eseguite in un ambiente di laboratorio locale completamente isolato. Il blocco improvviso di una risposta impedisce la corretta esecuzione della procedura di verifica, introducendo un fattore di fallimento esterno che non dipende dallo stato effettivo della macchina target né dall'architettura del sistema di test.

A questo vincolo si aggiunge il costo computazionale ed economico delle chiamate API. Lo sviluppo, la calibrazione e la valutazione sperimentale di un sistema agentico richiedono numerose esecuzioni complete e ripetute, ciascuna composta da molteplici turni interattivi e chiamate a strumenti. L’impiego continuativo di servizi commerciali remoti comporta costi variabili significativi, che crescono proporzionalmente alla complessità dei test e rendono poco sostenibile la riproducibilità continua in un contesto accademico.

L’adozione di un modello linguistico locale open-weight permette di superare entrambi i vincoli, operando senza restrizioni esterne e con costi marginali di inferenza azzerati. I criteri di selezione del modello locale e la configurazione dell'inferenza vengono approfonditi nella Sezione 3.10.

### Il livello del controllo operativo

Anche prescindendo dai vincoli del modello, sussiste una criticità più profonda legata alla concezione stessa degli agentic harness general-purpose. Questi framework sono progettati per concedere all’agente la massima autonomia operativa nel raggiungimento del target. Nel conformance testing didattico, al contrario, non è sufficiente ottenere l'accesso finale alla macchina: occorre garantire che la vulnerabilità didattica progettata sia effettivamente quella sfruttata e che ogni transizione di stato sia supportata da riscontri osservabili.

Durante le prove sono emerse tre criticità principali:

1. **Eccessiva libertà operativa.**  
   L’agente tende a privilegiare la scorciatoia più rapida per raggiungere l’obiettivo, deviando dall’_intended path_. Sono stati osservati tentativi di attacco out-of-band non previsti dallo scenario didattico, come l’accesso diretto al socket del demone Docker dell’host o l’ispezione impropria del filesystem sottostante. In questi casi, il successo dell'agente dimostra unicamente una debolezza dell'isolamento dell'ambiente, lasciando del tutto non verificata la vulnerabilità didattica prevista.

2. **Auto-certificazione del risultato.**  
   Negli harness generici lo stesso modello è frequentemente chiamato a eseguire l'azione e a valutarne l'esito. L’agente tende ad accettare come completata una fase sulla base di semplici deduzioni probabilistiche, messaggi di errore parziali o assunzioni non verificate, senza richiedere una prova empirica puntuale. Nel conformance testing questo comportamento produce pericolosi falsi positivi di conformità, considerando valida una macchina che presenta in realtà passaggi compromessi o non funzionanti.

3. **Controllo limitato sul processo di verifica.**  
   Un harness generico offre scarsi margini di governo deterministico sulla persistenza dello stato, sulla formalizzazione delle evidenze e sulle condizioni che sanciscono il successo di uno step. In VulcaTest tali aspetti non possono essere demandati alla discrezionalità dell'agente, ma devono essere governati esplicitamente da regole software esterne al modello.

Un riscontro empirico chiarificatore è emerso durante la verifica della macchina didattica _Pizzeria_B2R_. Il percorso progettato richiedeva allo studente di interagire con una chat di assistenza web per farsi rivelare un endpoint nascosto. A causa di un errore di provisioning nel template infrastrutturale, il servizio di chat non era attivo; tuttavia, il collegamento diretto all’endpoint era rimasto per errore visibile nei commenti del codice sorgente HTML.

L’agente generico ha individuato il commento, ha raggiunto direttamente l'endpoint bypassando la chat non funzionante, ha proseguito nell'attacco fino a ottenere una shell remota e ha infine dichiarato concluso il test con esito positivo. La macchina risultava compromettibile, ma non era conforme alla specifica didattica, poiché il meccanismo di scoperta previsto era rotto.

Questo episodio ha dimostrato empiricamente che completare una challenge non coincide con verificarne la conformità. Da questa necessità è nata la progettazione di VulcaTest: un’architettura in cui l’agente opera entro un perimetro operativo rigoroso e il verdetto finale scaturisce esclusivamente da evidenze oggettive verificate da controlli deterministici.

## 3.2 Principi di progettazione del sistema

I limiti riscontrati nelle sperimentazioni preliminari hanno definito i requisiti fondanti di VulcaTest. L’architettura è stata concepita attorno a cinque principi guida, utilizzati sistematicamente nella definizione di ciascun componente.

### 1. Deterministico quando possibile, probabilistico quando necessario

Non tutte le fasi di un workflow di test richiedono l'intervento di un modello linguistico. Tutte le operazioni traducibili in regole algoritmiche rigorose — validazione dei formati, parsing strutturato, routing del workflow, tracciamento delle sessioni e calcolo delle metriche — sono affidate a codice deterministico in Python. La componente generativa probabilistica viene circoscritta alle attività che richiedono autentica flessibilità interpretativa, quali l'adattamento ai riscontri di sicurezza e la sintesi qualitativa dei difetti.

### 2. Esecuzione basata su evidenze e rifiuto dell’auto-certificazione

Il superamento di uno step di verifica non può basarsi sulle dichiarazioni dell'agente che lo ha eseguito. VulcaTest impone che ogni riscontro positivo corrisponda a evidenze empiriche osservabili raccolte durante l’interazione con l'ambiente (es. output testuali, codici HTTP, porte aperte, file estratti) e che l'assegnazione dello stato finale sia demandata a funzioni di controllo deterministiche esterne all'LLM.

### 3. Separazione delle responsabilità e specializzazione dei ruoli

Pianificazione, coordinamento dell'avanzamento, interazione con il target e valutazione diagnostica finale sono nettamente disaccoppiate e affidate a moduli distinti con perimetri operativi circoscritti. Evitando di concentrare compiti eterogenei in un unico agente generalista, si riduce la complessità dei prompt e si controlla con esattezza il flusso informativo trasferito da una fase alla successiva.

### 4. Intercambiabilità e modularità architetturale

I componenti di VulcaTest sono strutturati per minimizzare le dipendenze reciproche. La sostituzione del modello di inferenza locale, del server di esecuzione degli strumenti o delle logiche di routing non richiede interventi invasivi sulla struttura complessiva. Questa modularità consente di estendere il sistema con facilità e ne abilita l'utilizzo come banco di prova sperimentale per confrontare modelli e configurazioni differenti.

### 5. Controllo gerarchico: pianificazione a livello macro e ReAct a livello micro

Il sistema adotta un approccio ibrido che bilancia rigore procedurale e autonomia tattica. A livello macro, il percorso di attacco viene formalizzato prima dell’esecuzione in un piano sequenziale vincolante; a livello micro, all'interno del singolo step, l'agente dispone dell'autonomia necessaria per gestire un ciclo ReAct (_Reasoning + Action + Observation_), reagendo tempestivamente agli output degli strumenti e ai comportamenti dinamici del target.

## 3.3 Architettura generale e flusso di coordinamento

Prima di analizzare nel dettaglio i singoli moduli, è opportuno inquadrare l’architettura complessiva di VulcaTest e i meccanismi che ne regolano l'avanzamento.

### Inquadramento architetturale e gestione dello stato

Inquadrando il sistema secondo il modello architetturale CoALA (_Cognitive Architectures for Language Agents_, Sumers et al., 2024), VulcaTest si configura come un singolo agente cognitivo modulare basato su ruoli specializzati, coordinati all'interno di un flusso deterministico condiviso.

A differenza dei sistemi multi-agente in cui entità indipendenti comunicano liberamente, in VulcaTest pianificazione, orchestrazione, esecuzione e diagnosi operano su una memoria comune centralizzata. Nel modello CoALA, la Working Memory raccoglie le informazioni necessarie al compito corrente e viene costantemente aggiornata durante l’interazione con l’ambiente esterno. In VulcaTest questo ruolo è svolto da `VulcaTestState`, la struttura dati tipizzata che mantiene lo stato globale dell'esecuzione.

Al suo interno vengono conservati la sequenza dei `TestStep`, l’indice dello step in corso, lo stato globale della run, il dizionario dei valori verificati (`verified_values`), i risultati parziali accumulati e i riferimenti alle sessioni terminali aperte.

### Punti di ingresso e avvio del workflow

VulcaTest prevede due modalità operative di avvio:

- **Execution Mode:** qualora sia già presente un Attack Plan precedentemente generato e validato (`ATTACK_PLAN.md`), il sistema bypassa la fase di pianificazione e avvia direttamente l’orchestrazione del test.
- **Planning & Execution Mode:** in assenza del piano, o quando ne viene richiesta la rigenerazione a partire dai sorgenti della challenge, viene dapprima invocato il Planner. Il piano risultante viene validato a livello sintattico e successivamente inoltrato al motore di esecuzione.

In entrambe le modalità, una volta acquisito l'Attack Plan formale, il workflow prosegue attraverso lo stesso grafo di orchestrazione.

![[Pasted image 20261002152624.png|380]]

### Comunicazione tra i componenti e strutture dati tipizzate

Per prevenire ambiguità e allucinazioni nella cooperazione tra moduli, VulcaTest adotta il paradigma dello _Structured Artifact Handoff_ (ispirato a MetaGPT, Hong et al., 2023). I nodi dell'architettura non comunicano mediante scambi di testo libero in linguaggio naturale, ma si trasmettono contratti dati rigorosamente tipizzati e validati tramite schemi Pydantic.

Il Planner formalizza il percorso didattico in una sequenza ordinata di oggetti `TestStep`; l’Executor restituisce per ciascuna fase un contratto `StepResult` corredato da evidenze empiriche; il Final Evaluator elabora la collezione dei risultati per produrre i report strutturati finali (`run_summary.json` e `healing_ticket.json`). La presenza di contratti dati immutabili e verificabili a tempo di esecuzione consente al codice Python di intercettare difformità prima che possano propagarsi alle fasi successive.

## 3.4 Il Planner: generazione e formalizzazione dell’Attack Plan

Il Planner è il componente preposto a trasformare la documentazione progettuale di una challenge in un Attack Plan formale (`ATTACK_PLAN.md`), contenente la sequenza esplicita di step operativi che VulcaTest dovrà verificare. Rispetto al tradizionale `WRITEUP.md` — concepito come guida discorsiva per l'utente umano — l’Attack Plan deve definire con rigore formale gli obiettivi intermedi, i vincoli operativi e i criteri di verifica necessari a stabilire il superamento di ogni fase.

### Architettura ibrida a due stadi

Il modulo adotta un'architettura ibrida a due stadi:

1. **Stadio generativo (LLM):** un modello linguistico elabora i documenti sorgente della challenge e genera il file `ATTACK_PLAN.md`. Il documento combina sezioni descrittive in formato Markdown con blocchi strutturati in formato YAML. La scelta di YAML è motivata dalla sua immediata leggibilità e dalla naturalezza con cui consente di rappresentare comandi shell multi-riga, parametri complessi e liste annidate.

2. **Stadio deterministico (`plan_parser.py`):** il parser analizza il documento prodotto, ne valida la conformità strutturale rispetto allo schema formale e converte ciascuna sezione in un'istanza della classe Pydantic `TestStep`.

Ciascun `TestStep` formalizza i requisiti operativi della fase:
- L'identificativo progressivo dello step;
- L'obiettivo operativo sintetico;
- L'insieme ristretto degli strumenti autorizzati (`allowed_tools`);
- Le variabili o credenziali che la fase può estrarre e propagare (`produces`);
- La checklist dei criteri di conformità che sanciscono il completamento dello step.

Se il documento generato presenta violazioni di sintassi, blocchi mancanti o campi non conformi, `plan_parser.py` rigetta il piano prima di iniziare il test, attuando un controllo fail-early che impedisce a specifiche corrotte di raggiungere l'Executor.

### Gerarchia delle fonti e risoluzione delle ambiguità

Il Planner riceve in ingresso tre documenti cardine generati nelle fasi a monte della pipeline VulcAIn:
- `DESCRIPTION.md`, contenente la contestualizzazione e le note introduttive fornite dal creatore della challenge;
- `STORYLINE.md`, che descrive la progressione narrativa e la sequenza logica dei passaggi di vulnerabilità;
- `WRITEUP.md`, che riporta i comandi tecnici e le istruzioni operative di exploit.

Poiché tali documenti possono contenere discrepanze dovute a generazioni asincrone, il system prompt del Planner impone una gerarchia vincolante delle fonti:

1. **`STORYLINE.md` — autorità assoluta sul percorso:** stabilisce la sequenza e la natura delle fasi didattiche previste. In caso di divergenza, la Storyline prevale sempre sul Writeup.
2. **`WRITEUP.md` — autorità sull'esecuzione tecnica:** fornisce sintassi, parametri, payload e convenzioni operative, ma non può introdurre deviazioni o scorciatoie non contemplate dalla Storyline.
3. **`DESCRIPTION.md` — contesto ausiliario:** definisce credenziali di default, porte note e dettagli di scenario.

A questa gerarchia si affianca una regola ferrea di _grounding_: indirizzi, porte, chiavi e parametri devono provenire esclusivamente dai documenti o essere rappresentati tramite segnaposto espliciti (quali `<TARGET_IP>`), risolti a runtime durante l'esecuzione.

### Regole per la definizione dei criteri di verifica

La checklist associata a ciascun `TestStep` costituisce il cuore della procedura di conformance testing. Per garantire che l'oracolo di test sia solido e non aggirabile, il Planner applica quattro regole costituzionali:

- **Operatori logici in AND:** tutti i requisiti della checklist devono essere obbligatoriamente soddisfatti per dichiarare il successo della fase, escludendo alternative arbitrarie che allargherebbero indebitamente il margine di tolleranza.
- **Fedeltà al canale di scoperta:** la checklist deve verificare che l'informazione o l'accesso siano stati ottenuti attraverso il meccanismo didattico stabilito. Ottenere la medesima risorsa mediante percorsi out-of-band o scorciatoie non è ammesso.
- **Riscontri empirici osservabili:** ogni controllo deve basarsi su prove riscontrabili nell'output (es. codice di risposta HTTP, banner di servizio, file nel filesystem, stringa estratta). L’exit code di un comando da shell non viene utilizzato come unico indicatore di successo, poiché molti exploit o comandi possono restituire codice zero pur avendo fallito l'obiettivo o viceversa.
- **Gestione dei fallimenti intenzionali:** qualora uno step didattico preveda volutamente un errore (es. un tentativo di accesso respinto che rivela informazioni utili nel messaggio di errore), la checklist deve verificare la presenza dell'errore atteso e non un generico esito positivo.

### Dimensionamento dinamico del contesto

L'intero Attack Plan viene generato in un'unica invocazione del modello per garantire coerenza globale tra gli step. Nei modelli locali open-weight, riservare costantemente la finestra di contesto massima comporterebbe un consumo eccessivo di memoria VRAM, mentre una finestra insufficiente troncherebbe l'output.

VulcaTest integra in `token_utils.py` un algoritmo euristico di dimensionamento dinamico della finestra di contesto, calcolato prima dell'inferenza. Il numero di token dei documenti di input viene stimato a partire dalla lunghezza totale in caratteri:

$$
T_{\text{input}} = \left\lceil \frac{C_{\text{tot}}}{k} \right\rceil + 1
$$

dove $C_{\text{tot}}$ rappresenta il conteggio complessivo dei caratteri dei tre documenti sorgente e $k = 3.0$ è il rapporto caratteri/token adottato per testi tecnici.

A questa quantità viene sommata la quota di generazione stimata per il piano ($R_{\text{out}}$), applicando un margine di sicurezza cautelativo:

$$
T_{\text{richiesti}} = \left\lfloor (T_{\text{input}} + R_{\text{out}})\cdot\alpha \right\rfloor
$$

con $\alpha = 1.15$. La finestra effettiva viene quindi allineata per eccesso a blocchi discreti ($S = 2048$ token) e vincolata tra i limiti architetturali supportati dal runtime:

$$
W_{\text{effettiva}} = \min \left( \max \left( W_{\text{base}}, \left\lceil \frac{T_{\text{richiesti}}}{S} \right\rceil \cdot S \right), W_{\text{max}} \right)
$$

Questo meccanismo garantisce l'allocazione ottimale delle risorse computazionali sulla GPU, prevenendo troncamenti e saturazioni di memoria.

## 3.5 L’Orchestrator: controllo del workflow e gestione dello stato

Completata la formalizzazione dell’Attack Plan, il coordinamento del processo di convalida è affidato all’Orchestrator. In VulcaTest il termine non designa un singolo agente autonomo, ma l'architettura logica e deterministica che gestisce le transizioni di stato e l'avanzamento dei moduli.

L'orchestrazione è implementata tramite LangGraph, modellando l'intero ciclo di vita del test come uno `StateGraph`. I nodi del grafo incarnano le funzioni operative principali, mentre gli archi definiscono le condizioni deterministiche che regolano il passaggio tra gli stati. L’Orchestrator non prende decisioni sui comandi da eseguire sul bersaglio, ma vigila sull'integrità del workflow, decidendo quando procedere, quando dichiarare il fallimento e quando attivare i meccanismi di riparazione.

All’interno dello schema è presente anche un nodo denominato `orchestrator`, preposto all'avanzamento dell'indice dello step corrente e alla preparazione dell'ambiente per l'Executor.

### Working Memory: `VulcaTestState`

Lo stato condiviso del workflow è rappresentato dalla classe `VulcaTestState`. A ogni transizione, il nodo corrente riceve la copia aggiornata dello stato e vi applica le sole mutazioni di propria competenza.

`VulcaTestState` memorizza:
- La lista ordinata dei `TestStep` ricavati dal piano;
- L'indice dello step attualmente in elaborazione;
- Lo stato cumulativo della run (`PENDING`, `IN_PROGRESS`, `SUCCESS`, `FAILED`);
- I contratti `StepResult` registrati per ciascuna fase conclusa;
- Il dizionario `verified_values`, contenente credenziali, flag e parametri validati;
- L'elenco descrittivo delle sessioni PTY interattive attualmente aperte;
- I contatori di telemetria (token spesi e tempi di esecuzione).

La centralizzazione dello stato in una struttura dati tipizzata consente a ciascun modulo di attingere direttamente alle informazioni necessarie, senza dover ricostruire la storia del test attraverso il contesto testuale del modello.

### Topologia del grafo e instradamento condizionale

Lo `StateGraph` coordina quattro nodi principali: `orchestrator`, `executor`, `final_evaluator` e l'eventuale nodo di estensione `healer`.

Il flusso di instradamento condizionale si articola come segue:
1. Il nodo `orchestrator` estrae il `TestStep` corrente. Se tutti gli step del piano sono stati eseguiti con successo, instrada il controllo verso il `final_evaluator`; in caso contrario, attiva l’`executor`.
2. Al termine dello step, l’`executor` restituisce il verdetto formalizzato. Se l'esito è positivo, lo stato viene aggiornato e il grafo torna al nodo `orchestrator` per la fase successiva.
3. Se lo step fallisce, il workflow applica una rigorosa politica di **Fail-Fast**: l’esecuzione viene interrotta immediatamente e il flusso viene deviato al `final_evaluator`. Poiché in una catena di penetrazione le fasi successive dipendono strettamente dai privilegi o dalle credenziali acquisite in quelle precedenti, proseguire l'esecuzione dopo un fallimento genererebbe soltanto rumore privo di valore diagnostico.
4. Conclusa la valutazione diagnostica del `final_evaluator`, se la run ha riscontrato non conformità e il self-healing è abilitato, il controllo passa al nodo `healer` (oggetto del Capitolo 4). A valle della riparazione, il test viene reinizializzato per rieseguire la verifica da uno stato pulito.

## 3.6 L’Executor: esecuzione degli step e modalità di auditing

L’Executor è il componente incaricato di coordinare l'esecuzione dei singoli `TestStep`. Per ogni fase predispone il contesto operativo, configura gli strumenti consentiti e guida il modello linguistico locale attraverso un ciclo ReAct (_Reasoning + Action + Observation_): a ciascun turno il modello analizza l'output osservato, pondera la mossa successiva, richiama lo strumento opportuno e prosegue fino a conseguire i requisiti della checklist o a esaurire le risorse disponibili.

L'infrastruttura software dell'Executor vigila costantemente sull'operato del modello generativo, imponendo vincoli stringenti sul perimetro di attacco, sul budget di turni consentiti e sulla validazione formale dei risultati.

### Auditor Mode

Il comportamento del modello generativo durante l'esecuzione dello step è governato da un system prompt costituzionale denominato _Auditor Mode_. L'obiettivo dell'Auditor Mode è trasformare il modello da generico penetratore autonomo a rigoroso collaudatore di conformità, impedendogli di deviare dall'_intended path_ o di mascherare anomalie dell'ambiente.

L’Auditor Mode prescrive quattro vincoli deontologici non eludibili:
1. **Interazione rigorosamente in-band:** il modello può operare esclusivamente attraverso i servizi di rete e i canali applicativi esposti dalla macchina bersaglio. È severamente proibito tentare accessi all'infrastruttura di virtualizzazione host o utilizzare canali di controllo esterni al percorso didattico.
2. **Convalida tramite evidenze empiriche:** nessun elemento della checklist può essere dichiarato soddisfatto sulla base di mere deduzioni probabilistiche o dichiarazioni verbali. Ogni affermazione deve essere comprovata da un riscontro oggettivo ottenuto nell'output dello strumento.
3. **Isolamento delle sessioni operative:** il modello deve distinguere in modo impeccabile tra la macchina attaccante locale e le sessioni terminali aperte sul target, evitando di lanciare payload remoti sulla macchina locale o viceversa.
4. **Disciplina del budget operativo:** ciascuna interazione consuma turni operativi. Il modello è vincolato a pianificare azioni mirate e concise, evitando tentativi ridondanti o attacchi a forza bruta non strutturati.

L'Auditor Mode definisce le regole deontologiche di interazione per il modello; la determinazione dell'esito della fase rimane tuttavia affidata a verifiche algoritmiche implementate nel codice.

### Gestione dinamica del budget operativo

L'esecuzione dello step deve bilanciare la libertà tattica dell'agente con la necessità di prevenire loop infiniti o consumi anomali di risorse. Assegnare un limite fisso e rigido rischierebbe di troncare procedure articolate che richiedono più comandi, mentre un budget illimitato permetterebbe al modello di bloccarsi su tentativi fallimentari ripetuti.

Per questo motivo, l’Executor adotta un modello di budget dinamico a due soglie, gestito via codice e calibrato tramite `.env`:
- **Budget iniziale:** all'avvio dello step vengono concessi 8 turni operativi.
- **Estensione controllata:** se il modello sta facendo progressi concreti ma necessita di turni supplementari, può invocare il tool interno `request_turn_extension`. Il codice dell'Executor autorizza incrementi fino al limite rigido di `EXECUTOR_HARD_LIMIT = 20` turni per step.

Il governo del budget si avvale di due precisi meccanismi software:
1. **Graceful Nudge:** quando mancano due turni all'esaurimento del budget corrente (`turns_remaining <= 2`), l'Executor inietta nel contesto dell'agente un messaggio di notifica prioritario. Tale avviso sollecita il modello a verificare se abbia raccolto le evidenze per concludere lo step o se debba richiedere un'estensione prima del blocco.
2. **Checkpoint di fine budget:** qualora il modello consumi l'ultimo turno a disposizione (`turns_remaining == 0`), il sistema intercetta la condizione e congela le interazioni con il target, costringendo il modello a optare tassativamente tra due sole alternative: invocare `request_turn_extension` (se il massimale di 20 non è stato superato) o richiamare `submit_step_result` per formalizzare l'esito con le evidenze raccolte.

### Tool interni e recupero dei valori verificati

Oltre agli strumenti di attacco esposti sul target, l’Executor mette a disposizione del modello un corredo di tool interni preposti al controllo del workflow:
- `submit_step_result`: finalizza la fase e trasmette le risultanze all'Orchestrator;
- `request_turn_extension`: richiede turni operativi addizionali;
- `show_verified_values`: visualizza i nomi delle variabili accertate accumulate nel workflow;
- `get_verified_value`: estrae il contenuto puntuale di una specifica variabile validata.

La gestione di credenziali, flag, password e token accumulati durante il test segue una strategia di recupero a due stadi. All'avvio di un nuovo `TestStep`, l'Executor non riversa nel contesto del modello tutti i dati testuali accumulati nelle fasi precedenti, ma inietta unicamente l'elenco delle chiavi disponibili in `verified_values`.

Il modello, qualora necessiti di una password o di un token estratto in uno step precedente per autenticarsi su una nuova shell, invoca selettivamente `get_verified_value`. Questa soluzione riduce drasticamente l'occupazione della finestra di contesto del modello locale e impedisce il degrado dell'attenzione dovuto all'accumulo di informazioni storiche non pertinenti allo step corrente.

### Il contratto `StepResult` e la verifica dello step

La finalizzazione di uno step avviene mediante l'invocazione di `submit_step_result`. I parametri forniti dal modello vengono incapsulati e validati all'interno della struttura Pydantic `StepResult`.

Il contratto `StepResult` registra l'identificativo dello step, la sintesi delle azioni eseguite, le variabili estratte, il computo dei turni spesi, il tracciamento completo delle chiamate ai tool con relativi output e lo stato analitico della checklist. Ciascun elemento della checklist viene formalizzato all'interno di `StepResult` come istanza di `ChecklistItemResult`, che mappa in modo immutabile il requisito, l'esito booleano assegnato e la stringa di evidenza estratta dall'output.

A presidio dell'integrità del test, lo `status` complessivo dello step non viene accettato passivamente dalla dichiarazione dell'agente. La funzione interna dell'Executor `_build_step_result` riesamina deterministicamente ogni singolo `ChecklistItemResult`: se anche un solo requisito della checklist risulta non soddisfatto o privo di evidenza conforme, il codice sovrascrive d'ufficio lo stato globale dello step forzandolo a `FAILED`. L'agente agisce quindi da esecutore e interprete delle risultanze; la certificazione del superamento della prova rimane rigorosamente affidata al codice deterministico.

## 3.7 Il Bridge di esecuzione: gestione degli strumenti e delle interazioni con il target

Per consentire all’agente di agire sull’ambiente bersaglio, VulcaTest implementa un modulo di mediazione architetturale denominato Bridge (`executor/mcp_bridge.py`). Il Bridge si colloca a livello di esecuzione e si interpone tra il ragionamento del modello e gli strumenti installati sulla macchina operativa Kali Linux.

Il compito primario del Bridge è disaccoppiare la logica dell'agente dai backend di esecuzione, offrendo un'interfaccia omogenea sia per l'invocazione di comandi stateless sia per la gestione di sessioni terminali interattive complesse.

### Canale dell’azione: architettura a due livelli

Le operazioni di penetration testing presentano requisiti operativi eterogenei: comandi di ricognizione o scansione possono essere eseguiti in modo isolato e senza stato, mentre l'ottenimento di shell remote, l'interazione con exploit e la privilege escalation esigono la persistenza del contesto terminale tra turni successivi.

Per soddisfare entrambi i pattern, il Bridge implementa un'architettura a due livelli:

- **Livello 1 (L1) — HexStrike e tool stateless:** dedicato all'esecuzione di utilità indipendenti prive di stato persistente (quali `nmap` o `hydra`). Il Bridge inoltra la richiesta al server HexStrike attivo sulla macchina Kali, ne attende la terminazione e restituisce il risultato normalizzato.
- **Livello 2 (L2) — Terminal Gateway e sessioni PTY persistenti:** basato su un microservizio dedicato (`terminal_gateway/terminal_gateway.py`), sviluppato con FastAPI e `pexpect`. Il Terminal Gateway crea e governa pseudo-terminali Unix (PTY) autentici, esposti all’Executor attraverso il metodo `interactive_terminal_exec`.

Ciascuna sessione PTY è associata a un identificatore univoco `session_name`, consentendo la gestione di molteplici terminali concorrenti. Questa capacità abilita flussi asincroni indispensabili negli scenari realistici: ad esempio, una sessione terminale può avviare un listener in attesa di connessione (come un handler di reverse shell tramite `nc`), mentre una seconda sessione parallela lancia il comando di exploit che innesca la connessione remota verso il listener precedentemente aperto.

La figura seguente illustra l’architettura del Bridge e il disaccoppiamento tra tool stateless ed esecuzione interattiva:

![[Pasted image 20261002152954.png]]

### Canale della percezione: normalizzazione dell’output e informazioni di stato

Il Bridge gestisce anche il flusso percettivo di ritorno prima che gli output raggiungano il modello linguistico. Gli output grezzi generati dalle sessioni terminali contengono sequenze di escape ANSI/VT100 (utilizzate per colorazioni, riposizionamento del cursore e aggiornamento video), che occuperebbero spazio inutile nel contesto e degraderebbero le capacità attentive dell'LLM. Il Bridge rimuove tali codici e normalizza i caratteri di a capo (`\r\n` $\rightarrow$ `\n`).

Il modulo integra inoltre meccanismi euristici per il rilevamento di prompt di autenticazione bloccanti (es. richieste di `Password:`, `passphrase:` o conferme interattive). Quando una sessione PTY rimane in attesa di credenziali, il Bridge arricchisce l'output con un'indicazione esplicita, guidando il modello a fornire la password richiesta nella successiva interazione anziché reiterare comandi a vuoto.

Infine, le descrizioni dei tool esposte al modello vengono aggiornate dinamicamente in base alle sessioni PTY vive, indicando chiaramente all'agente quali terminali siano attualmente aperti e utilizzabili.

### Gestione del contesto: troncamento degli output e tool-slicing

L'interazione con utility di sistema e di sicurezza può generare flussi testuali massivi capaci di saturare istantaneamente la context window del modello locale. Durante le prime fasi sperimentali, l'esecuzione di una scansione ricorsiva non vincolata tramite il comando `find` sull'intero filesystem ha generato migliaia di righe di log, saturando interamente la finestra di contesto di Qwen e provocandone il blocco operativo.

A fronte di tale riscontro empirico, il Bridge introduce due meccanismi di mitigazione:

1. **Troncamento deterministico degli output:** se l'output testuale restituito da uno strumento supera la soglia configurata `MAX_TOOL_OUTPUT_CHARS = 8000` caratteri, il testo viene troncato preservando la porzione iniziale (maggiormente informativa) e vi viene apposto un marcatore esplicito che specifica l'avvenuto troncamento e il volume di caratteri originali generati dal comando.
2. **Tool-slicing tramite `allowed_tools`:** inviare all'LLM l'intero catalogo degli strumenti Kali comporterebbe un consumo elevato di token e aumenterebbe la probabilità di invocazioni scorrette. A ogni step l'Executor espone al modello unicamente gli strumenti autorizzati esplicitamente dal Planner nel campo `allowed_tools` del `TestStep`, affiancati dai soli comandi base di gestione terminale.

### Supporto alle applicazioni terminali interattive

Le sessioni PTY supportano nativamente anche l'interazione con programmi a schermo intero o a interfaccia testuale complessa, quali editor di testo (`nano`, `vi`, `vim`) e paginatori (`less`, `more`). Questi programmi non accettano semplici comandi lineari su standard input, ma richiedono la corretta interpretazione di sequenze di controllo da tastiera.

Il Bridge supporta un vocabolario di tasti simbolici (`enter`, `esc`, `tab`, `backspace`, frecce direzionali e combinazioni di controllo come `ctrl+x` o `ctrl+c`), convertendoli nelle rispettive sequenze di escape inviate al PTY. Tramite il parametro `commands`, l'agente può trasmettere raffiche sequenziali di input ordinate all'interno del medesimo turno operativo.

Un accorgimento critico ha riguardato la gestione del tasto Invio: in applicazioni a schermo intero come `nano`, l'invio del carattere standard `\n` non produce il salvataggio o l'avanzamento atteso, venendo spesso interpretato come un codice improprio. Il Bridge effettua una conversione trasparente, traducendo l'identificatore `enter` nel carattere `\r` (Carriage Return), garantendo la corretta ricezione del comando da parte del programma interattivo.

## 3.8 Il Final Evaluator: valutazione deterministica e Root Cause Analysis

Il Final Evaluator rappresenta il nodo conclusivo del conformance testing di VulcaTest. Viene invocato al completamento dell'intero Attack Plan oppure anticipatamente qualora intervenga un'interruzione Fail-Fast a seguito del fallimento di uno step.

Il componente opera secondo una pipeline a due stadi: il primo elabora deterministicamente i dati quantitativi della run; il secondo impiega il modello linguistico locale per redigere la sintesi qualitativa e condurre la Root Cause Analysis (RCA).

### Stadio 1: raccolta delle metriche

Il primo stadio è implementato interamente in Python e non fa uso di modelli linguistici. Elaborando `VulcaTestState`, la sequenza degli `StepResult` e i registri delle chiamate ai tool, calcola con precisione algoritmica le metriche essenziali per la valutazione sperimentale:
- Lo stato conclusivo della run (`SUCCESS` o `FAILED`);
- Il tasso di avanzamento percentuale rispetto alla checklist del piano;
- I tempi di esecuzione complessivi e la latenza di ciascun nodo;
- Il volume cumulativo di chiamate ai tool suddivise tra L1 ed L2;
- Il consumo dettagliato di token (prompt e completamento) sostenuto dai diversi moduli.

I risultati vengono consolidati nel file strutturato `run_summary.json`, rendendo i dati quantitativi immediatamente interrogabili ed elaborabili a fini sperimentali e statistici.

### Stadio 2: diagnosi del fallimento e Root Cause Analysis

Il secondo stadio non altera l'esito della run, ma ne analizza le evidenze qualitative. Il modello generativo locale riceve in ingresso l’Attack Plan, gli `StepResult` con relative evidenze e gli output dei comandi salienti, generando il documento descrittivo `REPORT.md`.

In caso di fallimento o difformità riscontrata, il modello redige la Root Cause Analysis e genera l'artefatto formale `healing_ticket.json`, specificando lo step interrotto, il componente software o infrastrutturale coinvolto, la causa primaria del guasto e la tassonomia del difetto.

Il sistema cataloga le anomalie secondo tre categorie fondamentali:
- **`IAC_GENERATION_DEFECT`:** il difetto risiede nel codice di provisioning Infrastructure as Code o nei file di configurazione generati per la macchina (es. un Dockerfile malformato, un servizio non avviato o un file con permessi errati);
- **`CONFIG_DEFECT`:** la macchina presenta incongruenze nei parametri di runtime o nelle variabili ambientali;
- **`SPECIFICATION_DEFECT`:** la macchina bersaglio è corretta e funzionante, ma il Planner ha formalizzato un criterio di verifica errato, incoerente o irrealizzabile nella checklist dell'Attack Plan.

Questa classificazione è fondamentale per evitare che il modulo di correzione intervenga sull'infrastruttura bersaglio quando l'errore è imputabile alla sola specifica di test. Qualora il difetto risieda nella macchina, `healing_ticket.json` costituisce il contratto formale passato in ingresso a VulcaHealing.

## 3.9 Prompt engineering e definizione dei ruoli agentici

I componenti di VulcaTest che integrano un modello generativo assolvono funzioni cognitive differenti e richiedono una progettazione dei prompt mirata e controllata. La definizione delle istruzioni di sistema non è avvenuta in modo teorico, ma attraverso un processo iterativo di calibrazione empirica basato sull'osservazione dei comportamenti anomali emersi nei primi test.

### Sviluppo e specializzazione dei prompt

Le versioni preliminari dei prompt affidavano all'agente direttive troppo ampie. Nelle sperimentazioni pratiche sono emersi pattern disfunzionali ricorrenti: la tendenza a dichiarare completato uno step in assenza di evidenze adeguate, il tentativo di aggirare ostacoli tramite canali non didattici o la cattiva gestione dei programmi interattivi. A fronte di ciascuna anomalia, le istruzioni sono state progressivamente raffinate, traducendo ogni errore riscontrato in vincoli operativi espliciti.

I prompt sono stati rigorosamente specializzati per ruolo:
- Il **Planner** è istruito a estrarre una specifica formale ancorata alle fonti, vietando l'invenzione di passaggi arbitrari;
- L’**Executor** adotta la costituzione operativa dell’_Auditor Mode_, che vincola l'azione a canali in-band e all'accumulo di evidenze;
- Il **Final Evaluator** riceve indicazioni orientate alla sola sintesi e all'analisi causale, escludendo qualsiasi velleità esecutiva.

Le regole che governano il modulo di auto-riparazione Healer vengono invece trattate separatamente nel Capitolo 4.

### Regole esplicite e formati vincolati

L'ingegneria dei prompt in VulcaTest si ispira concettualmente ai principi di Constitutional AI (Bai et al., 2022), declinati sotto forma di regole deontologiche esplicite integrate nel system prompt che delimitano rigidamente lo spazio d'azione dell'agente.

A tutela dell'integrità del sistema, ogni qualvolta il modello debba dialogare con il codice circostante, l'output non è lasciato a testo libero, ma è rigidamente vincolato a schemi strutturati (`TestStep`, `StepResult`, `healing_ticket.json`). In questo modo l'espressività linguistica del modello viene imbrigliata entro contratti dati controllabili algoritmicamente. I testi integrali dei system prompt adottati sono riportati in Appendice.

## 3.10 Modello locale e ottimizzazione dei parametri di inferenza

Per lo sviluppo e la validazione di VulcaTest è stato impiegato un modello linguistico open-weight eseguito localmente. L'architettura è stata calibrata tenendo in considerazione la natura iterativa del workflow e i vincoli hardware dell'ambiente di test, intervenendo su quantizzazione, context window e parametri di inferenza.

Il modello locale presiede le operazioni del Planner, dell’Executor e del Final Evaluator, mentre la fase di riparazione adotta una differente soluzione presentata nel capitolo successivo.

### Scelta del modello locale

La scelta di un modello locale risponde a due motivazioni primarie: operare in piena immunità dai filtri etici dei provider commerciali (indispensabile nel penetration testing) e azzerare i costi variabili per token durante le sessioni sperimentali massive.

Il modello selezionato è **Qwen3.8-27B** nella variante quantizzata **`IQ3_S`** (~3,5 bit per parametro), distribuita in formato GGUF all'interno del repository [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF). La quantizzazione consente di abbattere l'occupazione dei pesi in VRAM preservando eccellenti capacità di ragionamento e di utilizzo dei tool.

Planner ed Executor vengono eseguiti con un livello di reasoning impostato su **`medium`**. Questa impostazione riserva al modello uno spazio di riflessione sufficiente per interpretare gli output complessi della shell e calibrare le mosse successive, evitando sia la precipitazione dei modelli privi di Chain-of-Thought sia la prolissità eccessiva di livelli di ragionamento elevati.

### Configurazione e ottimizzazione dell’inferenza

L’infrastruttura di sviluppo dispone di una singola GPU con 16 GB di VRAM affiancata da 64 GB di RAM di sistema. La configurazione del runtime ha richiesto un bilanciamento accurato tra occupazione di memoria, velocità di generazione e capienza del contesto:
- **Quantizzazione GGUF a 3,5 bit (`IQ3_S`):** alloca i pesi del modello in circa 11-12 GB di VRAM, riservando la memoria residua alla KV-cache del contesto;
- **KV-cache in FP16:** preserva la precisione dell'attenzione sul contesto senza degradazione qualitativa;
- **Speculative Decoding tramite MTP e N-gram:** sfrutta la previsione multi-token e l'analisi n-gram per accelerare notevolmente la frequenza di generazione dei token, fattore critico nelle fasi multi-turno dell'Executor;
- **Dimensionamento differenziato del contesto:** adatta la finestra in funzione del componente attivo (ampia e calcolata dinamicamente per il Planner, contenuta e focalizzata per l'Executor).

L'orchestrazione di questi parametri è centralizzata nel modulo `model_manager.py`, che configura il server di inferenza locale in modo trasparente prima dell'invocazione di ciascun nodo.

---

