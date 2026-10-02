# Capitolo 3 — Architettura e implementazione di VulcaTest

## 3.1 Requisiti e limiti delle soluzioni generiche

L’obiettivo fondamentale di VulcaTest è verificare la conformità di una macchina didattica vulnerabile rispetto al progetto pedagogico originario, accertando che essa sia effettivamente risolvibile attraverso il percorso di attacco previsto (_intended path_) e senza affidare all’agente collaudatore la certificazione del proprio operato.

Come anticipato nel capitolo precedente, la necessità di governare in modo strutturato l’interazione tra modello linguistico e ambiente operativo porta naturalmente all’impiego di un _agentic harness_. La prima soluzione esplorata è stata quindi quella apparentemente più immediata: demandare il collaudo a un framework generico già consolidato, nel caso specifico Google Antigravity, configurato mediante un system prompt dedicato e dotato di strumenti di sicurezza esposti tramite protocollo MCP.

L’idea iniziale era che un modello di frontiera, opportunamente istruito e dotato degli strumenti necessari, fosse sufficiente a condurre autonomamente un penetration test aderente al percorso didattico previsto. Le sperimentazioni iniziali hanno però mostrato che un harness generico, progettato per massimizzare l’autonomia nel problem solving, risulta poco adatto a un compito di conformance testing. Le criticità principali si collocano su due livelli distinti.

### Il livello del modello: guardrail e sostenibilità

Il primo livello riguarda le restrizioni intrinseche dei modelli linguistici impiegati dagli harness commerciali. I modelli di frontiera integrano filtri di allineamento e guardrail di sicurezza particolarmente restrittivi nei confronti di comandi e tecniche offensive. Nel contesto di un penetration test didattico, operazioni legittime e necessarie — come scansioni di rete, tentativi di autenticazione, generazione di payload o interazione con servizi intenzionalmente vulnerabili — possono quindi essere bloccate o rifiutate dal provider, interrompendo il flusso operativo del collaudo.

A questo limite si aggiunge il problema della sostenibilità economica. Un test completo richiede numerose iterazioni, chiamate a strumenti esterni e scambi di contesto progressivamente più ampi. L’utilizzo continuativo di API commerciali introduce quindi costi che crescono con la durata e la complessità del collaudo, rendendo meno sostenibili campagne sperimentali estese e ripetute.

Questi problemi possono essere ridotti utilizzando modelli locali o open-weight. Rimane però un secondo livello di criticità, indipendente dal modello adottato: il controllo del comportamento dell’agente e la definizione dell’oracolo di verifica.

### Il livello del controllo operativo e dell’oracolo

Un harness convenzionale è progettato per consentire all’agente di raggiungere un obiettivo con la massima libertà possibile. Nel conformance testing questa caratteristica diventa problematica, perché il risultato finale non è sufficiente: deve essere verificato anche il rispetto dell’intero percorso previsto.

Durante le sperimentazioni sono emerse tre criticità principali.

1. **Eccesso di libertà e tendenza al goal-reaching.**  
    Un agente lasciato operare all’interno di un harness generico tende a privilegiare il raggiungimento dell’obiettivo finale rispetto al rispetto del percorso imposto. Sono stati osservati tentativi di utilizzare canali _out-of-band_, come l’interazione diretta con il demone Docker dell’host di virtualizzazione o l’ispezione del filesystem sottostante alla ricerca di configurazioni e flag. In questo modo il test verifica soltanto se la macchina sia genericamente compromettibile, non se lo sia attraverso le vulnerabilità didattiche previste.
    
2. **Assenza di un oracolo indipendente e rischio di auto-certificazione.**  
    Negli harness generici il modello svolge spesso contemporaneamente il ruolo di esecutore e di valutatore del proprio operato. Questa sovrapposizione rende possibile dichiarare uno step completato sulla base di una deduzione, di un output parziale o di una ricostruzione plausibile, senza che esista una reale evidenza empirica a supporto. In un sistema di collaudo ciò si traduce nel rischio di falsi positivi di conformità.
    
3. **Rigidità architetturale e limitata osservabilità.**  
    Gli harness commerciali operano tipicamente come piattaforme chiuse, nelle quali la personalizzazione è limitata principalmente al system prompt e all’aggiunta di tool esterni. Questo rende difficile intervenire sui meccanismi interni di orchestrazione, sulla gestione dello stato, sulla raccolta delle evidenze e sulla telemetria del processo. Gli harness open-source offrono maggiore flessibilità, ma rimangono generalmente progettati per compiti di problem solving generico e non per imporre i vincoli di isolamento, riproducibilità e verifica richiesti da un collaudo di conformità.
    

Un caso emblematico è emerso durante il test di _Pizzeria_B2R_, una macchina generata attraverso la pipeline VulcaMind e VulcaForge. L’Attack Plan prevedeva, tra i passaggi intermedi, l’estrazione di un endpoint nascosto attraverso una chat di assistenza. A causa di un difetto di generazione, la chat non risultava funzionante, mentre il collegamento all’endpoint era rimasto direttamente accessibile nel codice HTML della pagina.

Nonostante l’agente disponesse di una checklist esplicita, esso ha seguito il collegamento diretto, ha proseguito il percorso di attacco fino a ottenere una shell e ha infine dichiarato completato il test. La macchina risultava quindi compromettibile, ma non conforme al percorso didattico previsto, perché uno dei passaggi richiesti non era realmente funzionante.

Questo caso mostra che la capacità del modello di raggiungere l’obiettivo finale non coincide con la conformità della macchina al progetto originario. Il problema non riguarda quindi soltanto la capacità del modello, ma soprattutto l’assenza di un livello di controllo esterno capace di vincolarne il comportamento, separare esecuzione e valutazione e subordinare il verdetto finale alla presenza di evidenze verificabili.

VulcaTest nasce da questa esigenza: trasformare il collaudo in un processo strutturato di verifica, nel quale il modello opera entro un perimetro controllato e il successo viene determinato sulla base di evidenze empiriche, non sulla dichiarazione dell’agente stesso.
## 3.2 Principi di progettazione del sistema

I limiti emersi dall’impiego di harness generici hanno portato alla definizione di una serie di principi progettuali preliminari. L’obiettivo non era aggiungere ulteriori vincoli al solo livello del prompt, ma costruire un’architettura capace di rendere il collaudo controllabile, tracciabile e riproducibile.

Da questa esigenza derivano cinque principi fondamentali, che guidano l’intera architettura di VulcaTest.

### 1. Deterministico quando possibile, probabilistico quando necessario

Delegare ogni decisione a un modello linguistico introduce variabilità anche in attività che possono essere gestite in modo deterministico. In un sistema di collaudo, dove la riproducibilità è un requisito essenziale, è quindi necessario distinguere con precisione quali compiti richiedano l’intervento dell’LLM e quali possano essere affidati al codice.

In accordo con la separazione tra componenti simboliche e cognitive proposta da architetture come CoALA, VulcaTest adotta una divisione netta tra i due livelli:

- Il **codice deterministico** gestisce parsing, validazione degli artefatti, transizioni di stato, routing del workflow e calcolo delle metriche.
- Il **modello linguistico** interviene nei passaggi che richiedono interpretazione o adattamento al contesto, come la formalizzazione dell’Attack Plan, la scelta dei comandi durante il test e la Root Cause Analysis.

L’LLM viene quindi utilizzato soltanto dove è realmente necessario. La variabilità del modello rimane confinata alle singole decisioni, mentre il flusso complessivo del collaudo resta governato da regole deterministiche.

### 2. Esecuzione basata su evidenze e rifiuto dell’auto-certificazione

Un agente incaricato dell’esecuzione non deve poter certificare autonomamente il successo del proprio operato. Nel conformance testing, il verdetto deve dipendere da ciò che è stato effettivamente osservato sull’ambiente bersaglio, non dalla valutazione dichiarata dal modello.

Per questo motivo, VulcaTest impone due vincoli strutturali:

- **Evidenza empirica obbligatoria:** ogni elemento della checklist deve essere associato a un riscontro osservabile estratto dall’output dei comandi eseguiti.
- **Verifica deterministica del risultato:** il successo dello step viene ricalcolato dal codice sulla base dello stato della checklist, indipendentemente dal verdetto espresso dall’LLM.

La dichiarazione del modello non costituisce quindi l’oracolo del sistema. Il giudizio finale dipende dalle evidenze raccolte e dalla loro verifica nel codice.

### 3. Separazione delle responsabilità e specializzazione dei ruoli

Concentrare pianificazione, esecuzione, valutazione e diagnosi nello stesso agente aumenta il rischio di contaminazione del contesto e di deviazione dall’obiettivo iniziale. Per limitare questo problema, VulcaTest applica il principio di _Separation of Concerns_, assegnando responsabilità distinte ai diversi componenti dell’architettura.

In particolare:

- La pianificazione del percorso viene separata dall’esecuzione operativa.
- Il componente che esegue il test non determina autonomamente la validità del proprio risultato.
- La diagnosi delle cause di fallimento viene effettuata a valle dell’esecuzione, utilizzando le evidenze raccolte.

Ogni componente riceve quindi soltanto il contesto necessario alla propria funzione e comunica con gli altri attraverso strutture dati esplicite e tipizzate. Questa separazione riduce il rischio di _goal drift_ e rende più semplice individuare l’origine di eventuali errori.

### 4. Intercambiabilità e modularità architetturale

La logica del framework non deve dipendere né da uno specifico modello linguistico né da una particolare infrastruttura di inferenza. Vincolare il sistema a un singolo provider ridurrebbe la portabilità della soluzione e renderebbe più difficile confrontare configurazioni differenti durante la valutazione sperimentale.

Per questo motivo, VulcaTest è progettato secondo tre criteri principali:

- **Disaccoppiamento del backend di inferenza:** la logica di controllo rimane indipendente dal modello utilizzato, consentendo di alternare modelli locali e servizi cloud senza modificare il workflow.
- **Configurazione per ruolo:** ogni componente dotato di LLM può utilizzare parametri di inferenza differenti in funzione del proprio compito.
- **Interfacce operative standardizzate:** l’accesso agli strumenti e all’ambiente bersaglio avviene attraverso interfacce comuni, mantenendo separata la logica agentica dai backend esecutivi.

Questa modularità consente di sostituire o modificare singoli componenti senza alterare il funzionamento generale del sistema.

### 5. Controllo gerarchico: pianificazione a livello macro e ReAct a livello micro

Il comportamento dell’agente viene organizzato su due livelli di controllo distinti.

A livello **macro**, il collaudo segue un piano definito prima dell’esecuzione. Le fasi del test vengono organizzate in una sequenza ordinata che rappresenta l’_intended path_ della macchina. Durante il collaudo tale sequenza non viene modificata dinamicamente: se un passaggio previsto non è eseguibile, il sistema deve rilevare una non conformità, non individuare un percorso alternativo.

A livello **micro**, invece, l’Executor mantiene la libertà necessaria per completare il singolo step. L’interazione con il target segue un ciclo di tipo ReAct (_Reasoning + Action + Observation_): il modello osserva lo stato corrente, sceglie un’azione, ne analizza il risultato e decide come procedere fino al completamento della fase o al raggiungimento dei limiti operativi previsti.

La distinzione tra i due livelli consente di combinare rigidità e flessibilità: il percorso complessivo resta vincolato alla specifica didattica, mentre l’agente mantiene autonomia nella gestione delle singole operazioni.

L’insieme di questi cinque principi costituisce la base progettuale dell’architettura di VulcaTest. La sezione successiva descrive come essi vengano tradotti nella struttura complessiva del sistema, nella gestione dello stato condiviso e nel coordinamento tra i diversi componenti.
## 3.3 Architettura generale e flusso di coordinamento

Prima di analizzare nel dettaglio i singoli moduli, è utile descrivere la struttura complessiva di VulcaTest, chiarendo come vengono organizzati i ruoli, come viene gestito lo stato e in che modo i diversi componenti comunicano tra loro.

### Inquadramento nel framework CoALA

Facendo riferimento alla tassonomia proposta da CoALA (_Cognitive Architectures for Language Agents_), VulcaTest può essere descritto come un **singolo agente cognitivo modulare composto da ruoli specializzati**, piuttosto che come un sistema multi-agente composto da entità autonome che cooperano liberamente.

Le diverse funzioni necessarie al collaudo — pianificazione, orchestrazione, esecuzione e valutazione — sono separate in moduli distinti, ma rimangono vincolate a un unico flusso di controllo.

È inoltre necessario distinguere VulcaTest da VulcaHealing. Il sottosistema di collaudo descritto in questo capitolo comprende Planner, Orchestrator, Executor e Final Evaluator. VulcaHealing, approfondito nel Capitolo 4, costituisce invece un componente separato, invocato soltanto quando il collaudo rileva una non conformità.

### Gestione della memoria

La memoria del sistema è stata volutamente limitata alle sole informazioni necessarie all’esecuzione corrente.

La **Working Memory** è rappresentata dalla struttura dati tipizzata `VulcaTestState`, che modella lo stato condiviso (*state*) previsto da framework di orchestrazione a grafo come LangGraph. Ogni nodo del grafo riceve lo stato corrente, legge i campi necessari alla propria funzione e restituisce esclusivamente gli aggiornamenti da applicare.

All’interno di questa struttura vengono mantenuti:

- La sequenza dei `TestStep` da eseguire.
- L’indice dello step corrente.
- Lo stato globale del collaudo (`RUNNING`, `COMPLETED`, `FAILED`).
- Le evidenze raccolte durante l’esecuzione.
- I valori verificati, come credenziali, token e flag.
- Le sessioni terminali PTY ancora attive sul target.
- Le informazioni di telemetria utilizzate per la valutazione sperimentale.

La **Procedural Memory** non viene invece appresa dal modello, ma rimane esplicitamente definita nel software. Le regole di routing, i meccanismi di parsing, le transizioni di stato e i vincoli dei system prompt rappresentano la conoscenza procedurale con cui il sistema opera.

La memoria episodica e quella semantica non vengono utilizzate. Il sistema non conserva informazioni tra run differenti e non impiega database vettoriali o basi di conoscenza persistenti. Questa scelta risponde a due esigenze principali:

- **Riduzione del contesto:** evitare l’accumulo di informazioni non necessarie limita il numero di token elaborati dai modelli locali.
- **Riproducibilità:** ogni run parte da uno stato indipendente, evitando che informazioni acquisite in esecuzioni precedenti influenzino i test successivi.

### Punti di ingresso e ciclo di vita dell’esecuzione

VulcaTest prevede due modalità principali di avvio.

- **Execution Mode:** se è già disponibile un Attack Plan validato (`ATTACK_PLAN.md`), il sistema salta la fase di pianificazione e avvia direttamente il flusso di esecuzione.
- **Planning & Execution Mode:** se il piano non è presente, oppure viene richiesta esplicitamente la sua rigenerazione, viene prima invocato il Planner. Il piano prodotto viene validato e successivamente passato al normale flusso di esecuzione.

In entrambi i casi, dopo la disponibilità dell’Attack Plan, l’esecuzione converge sullo stesso grafo di orchestrazione.

![[Pasted image 20261001134308.png|504]]
### Comunicazione tra nodi e contratti tipizzati

I componenti di VulcaTest non comunicano attraverso messaggi liberi in linguaggio naturale. Lo scambio di informazioni avviene invece tramite strutture dati tipizzate, in modo da ridurre ambiguità e rendere ogni passaggio verificabile.

In particolare:

- Il Planner produce una sequenza di oggetti `TestStep`.
- L’Orchestrator seleziona lo step corrente e fornisce all’Executor le informazioni necessarie alla sua esecuzione.
- L’Executor restituisce un oggetto `StepResult`, contenente esito, evidenze raccolte e telemetria.
- Il Final Evaluator utilizza i risultati accumulati per generare gli artefatti conclusivi, tra cui `run_summary.json` e, in caso di fallimento, `healing_ticket.json`.

Questo meccanismo di _Structured Artifact Handoff_ consente al codice deterministico di validare il formato dei dati prima che vengano utilizzati dal componente successivo, evitando che errori o ambiguità del linguaggio naturale si propaghino lungo il workflow.

Definita la struttura generale del sistema, le sezioni successive analizzano nel dettaglio i singoli componenti, a partire dal Planner.
## 3.4 Il Planner: generazione e formalizzazione dell’Attack Plan

Il **Planner** è il modulo incaricato di trasformare la documentazione della challenge in un Attack Plan operativo (`ATTACK_PLAN.md`) utilizzabile dall’Executor.

A differenza di un piano scritto per un analista umano, l’Attack Plan costituisce una specifica formale destinata all’esecuzione automatica. Ogni step deve quindi essere sufficientemente completo, verificabile e coerente con lo stato raggiunto nelle fasi precedenti.

### Architettura ibrida a due stadi

In accordo con il principio _deterministico quando possibile, probabilistico quando necessario_, il Planner non affida l’intero processo a una singola generazione del modello, ma utilizza una pipeline composta da due stadi.

1. **Stadio generativo (LLM).**  
    Il modello elabora la documentazione della challenge e produce un documento strutturato che combina sezioni descrittive in Markdown e blocchi formali in YAML.
    
    Il formato YAML è stato scelto perché consente di rappresentare in modo leggibile comandi multi-riga, liste e parametri strutturati, risultando più pratico del JSON per questo tipo di contenuto.
    
2. **Stadio deterministico.**  
    Il documento generato viene analizzato da `plan_parser.py`, che utilizza parsing YAML ed espressioni regolari per estrarre e validare le informazioni necessarie. Il risultato viene convertito in una sequenza ordinata di oggetti `TestStep`.
    

Ogni `TestStep` descrive una singola fase del percorso didattico e include:

- L’identificativo dello step.
- L’obiettivo da raggiungere.
- L’insieme degli strumenti autorizzati (`allowed_tools`).
- I valori che lo step può produrre (`produces`), come credenziali o flag.
- La checklist utilizzata per verificare il corretto completamento della fase.

La checklist rappresenta l’elemento centrale dello step, perché definisce in modo esplicito quali condizioni devono essere osservate affinché la fase possa essere considerata completata.

Se il documento generato presenta errori strutturali, sezioni mancanti o violazioni dello schema previsto, il parser rigetta il piano prima dell’avvio del collaudo. In questo modo, errori prodotti nella fase di generazione non vengono propagati all’Executor.

### Gerarchia delle fonti e risoluzione delle ambiguità

Il Planner riceve in ingresso tre documenti prodotti dai moduli precedenti dell’ecosistema VulcAIn:

- `DESCRIPTION.md`, contenente la descrizione generale della challenge.
- `STORYLINE.md`, che definisce il percorso didattico e la sequenza delle fasi.
- `WRITEUP.md`, che contiene le informazioni tecniche e i comandi necessari alla risoluzione.

Poiché questi documenti vengono prodotti in momenti differenti della pipeline, possono contenere informazioni non perfettamente allineate. Per evitare che il modello risolva autonomamente eventuali conflitti, il system prompt stabilisce una gerarchia esplicita tra le fonti.

1. **`STORYLINE.md` — autorità sul percorso.**  
    Definisce le fasi previste, il loro ordine e gli stati attesi. In caso di conflitto sul flusso del percorso didattico, la Storyline ha priorità.
    
2. **`WRITEUP.md` — autorità sull’esecuzione tecnica.**  
    Fornisce sintassi, comandi, parametri e payload necessari per eseguire le singole operazioni, ma non può introdurre passaggi non previsti dalla Storyline.
    
3. **`DESCRIPTION.md` — autorità sul contesto generale.**  
    Fornisce informazioni aggiuntive sulla challenge, come credenziali iniziali, formato dei flag e altri parametri di contesto.
    

A questa gerarchia si aggiunge una regola di grounding: porte, percorsi, credenziali e parametri devono derivare dai documenti di input. Quando un valore necessario non è disponibile, il Planner deve utilizzare un segnaposto esplicito, come `<TARGET_IP>`, che verrà risolto successivamente durante l’esecuzione.

### Regole per la costruzione dell’oracolo

Il system prompt del Planner contiene una serie di regole dedicate alla costruzione delle checklist. L’obiettivo è evitare criteri di successo troppo permissivi o poco verificabili.

Le principali regole sono:

- **Connettori logici in AND:** salvo casi esplicitamente previsti dalla challenge, tutti i requisiti della checklist devono essere soddisfatti. Non devono quindi essere introdotte alternative arbitrarie tramite connettori come “o” oppure “oppure”.
- **Fedeltà al meccanismo di scoperta:** se una risorsa deve essere ottenuta attraverso uno specifico passaggio, la checklist deve verificare proprio quel meccanismo. Il semplice raggiungimento della risorsa tramite una scorciatoia non è sufficiente.
- **Verifica di effetti osservabili:** ogni controllo deve basarsi su un risultato concretamente osservabile, come una risposta HTTP, una porta aperta, un file presente o un token estratto. L’exit code di un comando non viene utilizzato come unico indicatore di successo.
- **Gestione dei fallimenti intenzionali:** in alcuni scenari didattici, un errore è parte del comportamento previsto. In questi casi, la checklist deve verificare la presenza dell’errore atteso invece di richiedere il successo del comando.

Queste regole permettono di trasformare la checklist in un vero oracolo di conformità, evitando che il Planner produca criteri troppo generici o interpretabili.

### Dimensionamento dinamico del contesto

La generazione dell’intero Attack Plan avviene in una singola invocazione, in modo da mantenere una visione completa del percorso ed evitare frammentazioni tra fasi separate.

Questa scelta aumenta però il numero di token richiesti sia in input sia in output. Nei modelli locali, dove la memoria disponibile è limitata dalla VRAM, un contesto sottodimensionato può causare il troncamento del piano prima del completamento.

Per ridurre questo rischio, il sistema stima a priori la dimensione necessaria della finestra di contesto.

Il numero di token di input viene approssimato a partire dalla lunghezza complessiva dei documenti:

$$T_{\text{input}} = \left\lceil \frac{C_{\text{tot}}}{k} \right\rceil + 1 $$

dove $C_{\text{tot}}$ rappresenta il numero complessivo di caratteri e $(k = 3.0)$ il rapporto conservativo caratteri/token utilizzato nella stima.

Alla dimensione dell’input viene quindi aggiunta una riserva per l’output del Planner, applicando un margine di sicurezza:

$$T_{\text{richiesti}} = \left\lfloor (T_{\text{input}} + R_{\text{out}})\cdot\alpha \right\rfloor$$

con $(\alpha = 1.15)$.

Infine, la dimensione effettiva del contesto viene arrotondata al multiplo successivo di $(S = 2048)$ token e vincolata tra la finestra minima configurata e il massimo supportato dall’hardware:

$$ W_{\text{effettiva}} = \min \left( \max \left( W_{\text{base}}, \left\lceil \frac{T_{\text{richiesti}}}{S} \right\rceil \cdot S \right), W_{\text{max}} \right)$$

Se la dimensione stimata supera il limite massimo disponibile, il sistema registra la condizione di saturazione. Nel caso in cui il piano venga comunque troncato o risulti incompleto, il parser deterministico lo rigetta e impedisce l’avvio del collaudo.

Una volta validato e convertito nella sequenza di `TestStep`, l’Attack Plan viene passato all’Orchestrator, che ne controlla l’esecuzione lungo l’intero workflow.

## 3.5 L’Orchestrator: controllo del workflow e gestione dello stato

Una volta formalizzato l’Attack Plan, il collaudo richiede un livello di controllo capace di governare la successione degli step, mantenere lo stato dell’esecuzione e stabilire quando il test può proseguire o deve essere interrotto. Questo ruolo è svolto dall’**Orchestrator**.

Nel contesto di VulcaTest, il termine Orchestrator non identifica un singolo componente isolato, ma l’insieme della logica implementata in Python che governa il workflow di collaudo. Tale logica comprende la gestione dello stato condiviso, l’avanzamento tra gli step, il trattamento degli errori e le condizioni di terminazione.

La parte centrale di questa orchestrazione è implementata mediante **LangGraph**, utilizzato per modellare il workflow come un grafo a stati. I diversi nodi rappresentano le principali fasi operative del sistema, mentre gli archi e le condizioni di routing definiscono in modo esplicito le transizioni possibili tra esse.

In coerenza con il principio _deterministico quando possibile, probabilistico quando necessario_, queste decisioni di coordinamento non vengono affidate a un modello linguistico, ma rimangono interamente governate dal codice. L’Orchestrator non decide quindi come risolvere uno step, ma stabilisce quale componente deve essere eseguito, con quale stato e in quali condizioni il flusso può avanzare.

All’interno del grafo è presente anche un nodo denominato `orchestrator`, che rappresenta il punto principale di controllo tra uno step e il successivo. Questo nodo non coincide però con l’intero concetto di Orchestrator, che comprende più in generale tutta la logica di coordinamento del workflow.

### Working Memory: `VulcaTestState`

Lo stato condiviso del collaudo è rappresentato dalla struttura tipizzata `VulcaTestState`. Ogni nodo del grafo riceve lo stato corrente, legge i campi necessari alla propria funzione e restituisce esclusivamente gli aggiornamenti da applicare.

Oltre all’indice dello step corrente e allo stato globale del test (`RUNNING`, `COMPLETED`, `FAILED`), `VulcaTestState` mantiene alcune informazioni fondamentali:

- **Valori verificati (`verified_values`):** un dizionario che contiene esclusivamente dati già confermati durante il collaudo, come credenziali, username, porte, token e flag. Questi valori possono essere riutilizzati negli step successivi senza dover ripetere le stesse operazioni di raccolta.
- **Sessioni terminali (`sessions`):** il registro delle sessioni PTY ancora attive. Questo permette di mantenere e riutilizzare shell persistenti tra step differenti.
- **Telemetria (`node_timings`):** i tempi di esecuzione associati ai diversi nodi del workflow, utilizzati successivamente nella valutazione sperimentale.

Lo schema completo dello stato e la definizione degli attributi sono riportati in Appendice.

### Topologia del grafo e instradamento condizionale

Il workflow è implementato mediante **LangGraph** attraverso uno `StateGraph` che coordina i nodi `orchestrator`, `executor`, `final_evaluator` e `healer`.

Il flusso segue una sequenza di transizioni definite.

1. **Inizializzazione.**  
    Il grafo parte dal nodo `START`, inizializza lo stato del collaudo e imposta `current_step_index = 0`.
    
2. **Selezione dello step.**  
    Il nodo `orchestrator` verifica se esistono ancora step da eseguire. Se il piano non è terminato, seleziona il `TestStep` corrente, imposta lo stato a `RUNNING` e inoltra il controllo all’Executor. Se invece tutti gli step sono stati completati, imposta lo stato globale a `COMPLETED` e passa direttamente al Final Evaluator.
    
3. **Valutazione del risultato e Fail-Fast.**  
    Al termine dello step, l’Executor restituisce uno `StepResult`. Se lo stato è `SUCCESS`, l’Orchestrator aggiorna `verified_values`, incrementa l’indice e avvia lo step successivo.
    
    Se invece lo step è `FAILED`, il collaudo viene interrotto immediatamente secondo un principio di **Fail-Fast**. Poiché le fasi successive dipendono spesso dai privilegi o dai dati ottenuti in quelle precedenti, proseguire dopo un fallimento produrrebbe risultati poco significativi e aumenterebbe inutilmente il costo dell’esecuzione.
    
4. **Valutazione finale.**  
    Sia in caso di completamento sia in caso di fallimento, il flusso converge sul `final_evaluator`, che aggrega i risultati della run e produce gli artefatti conclusivi.
    
5. **Avvio dell’healing.**  
    Se il collaudo è fallito e l’autoriparazione è abilitata, il sistema verifica che il numero massimo di tentativi non sia stato superato. In caso contrario, il controllo viene trasferito al nodo `healer`.
    
6. **Nuova esecuzione dopo la correzione.**  
    Dopo l’intervento di VulcaHealing e la ricostruzione dell’ambiente, il workflow ritorna all’Orchestrator e il collaudo viene eseguito nuovamente dall’inizio.
    

Questa organizzazione separa in modo netto il controllo del workflow dall’esecuzione operativa. L’Orchestrator non decide come completare uno step e non interpreta gli output del target: gestisce esclusivamente lo stato del sistema e applica le regole di transizione definite dall’architettura.

La sezione successiva descrive l’Executor, il componente incaricato di eseguire concretamente i singoli step dell’Attack Plan e raccogliere le evidenze necessarie alla loro verifica.

## 3.6 L’Executor: esecuzione degli step e modalità di auditing

Se il Planner definisce la specifica del collaudo, l’**Executor** è il componente incaricato di eseguire concretamente i singoli `TestStep` sull’ambiente bersaglio e raccogliere le evidenze necessarie alla loro verifica.

A livello operativo, l’Executor segue un ciclo di tipo **ReAct** (_Reasoning + Action + Observation_). A ogni iterazione il modello analizza lo stato corrente, seleziona un’azione, ne osserva il risultato e decide come procedere. A differenza di un agente ReAct libero, però, l’Executor opera esclusivamente all’interno dei vincoli definiti dal `TestStep` corrente.

La difficoltà principale non consiste quindi nel consentire al modello di eseguire comandi, ma nel controllare il modo in cui li utilizza. In presenza di errori, output inattesi o passaggi non immediatamente risolvibili, un agente lasciato libero può tentare scorciatoie, considerare soddisfatti requisiti non realmente verificati oppure interrompere prematuramente la fase. Per limitare questi comportamenti, l’Executor è stato progettato attorno a tre elementi principali: **Auditor Mode, gestione del budget operativo e verifica deterministica del risultato**.

### Auditor Mode

Il comportamento dell’Executor è regolato da un system prompt dedicato, denominato **Auditor Mode**. Il prompt definisce una serie di regole vincolanti che stabiliscono il perimetro operativo dell’agente e le condizioni con cui uno step può essere considerato completato.

Le regole principali sono le seguenti.

1. **Interazione esclusivamente in-band.**  
    L’Executor può interagire con la macchina bersaglio soltanto attraverso i servizi e i canali previsti dallo scenario. Non può utilizzare l’accesso all’host di virtualizzazione o altri canali esterni per ispezionare direttamente il target, modificarne lo stato o aggirare un malfunzionamento.
    
    Se un servizio non risponde o presenta una configurazione errata, l’Executor deve registrare il problema come possibile non conformità, senza correggerlo durante il collaudo.
    
2. **Verifica basata su evidenze.**  
    Ogni elemento della checklist deve essere verificato attraverso un’azione effettivamente eseguita e un’evidenza osservabile nell’output ottenuto. Il modello non può considerare soddisfatto un requisito sulla base di una semplice deduzione.
    
    Lo stesso principio vale per il fallimento: anche un esito negativo deve essere supportato da un riscontro osservabile, evitando che l’agente interrompa uno step senza aver prima verificato la presenza di un problema reale.
    
3. **Consapevolezza della sessione terminale.**  
    L’Executor può operare contemporaneamente sulla macchina attaccante e su sessioni aperte verso il target. Deve quindi mantenere consapevolezza della sessione attiva e del contesto in cui viene eseguito ogni comando.
    
    Il prompt definisce inoltre alcune regole per la gestione delle sessioni interattive, come prompt di autenticazione, shell persistenti e applicazioni terminali a schermo intero, in modo da evitare la perdita accidentale delle sessioni attive.
    
4. **Contabilizzazione dei turni.**  
    Ogni interazione operativa consuma una parte del budget assegnato allo step. Il numero di turni viene quindi utilizzato come limite esplicito all’autonomia dell’Executor, evitando cicli indefiniti e ripetizioni inutili.
    

L’Auditor Mode non sostituisce i controlli deterministici implementati nel codice. Il prompt limita il comportamento del modello durante l’esecuzione, mentre la verifica finale dello step rimane indipendente dalle sue dichiarazioni.

### Gestione dinamica del budget operativo

L’esecuzione di uno step richiede un compromesso tra due esigenze opposte. Un limite troppo basso può interrompere prematuramente una sequenza ancora in corso, mentre l’assenza di un limite può portare il modello a ripetere indefinitamente le stesse operazioni.

Per questo motivo, ogni `TestStep` viene eseguito con un budget iniziale di turni, che può essere esteso entro un limite massimo prestabilito.

Il meccanismo prevede tre livelli.

- **Budget iniziale:** ogni fase dispone inizialmente di 8 turni.
- **Estensione controllata:** se lo step sta procedendo ma richiede ulteriori operazioni, l’Executor può richiedere nuovi turni tramite `request_turn_extension`, fino al limite massimo configurato.
- **Hard limit:** il numero complessivo di turni non può superare `EXECUTOR_HARD_LIMIT`, fissato a 20.

A questo sistema si aggiungono due controlli automatici.

Il **Graceful Nudge** viene attivato quando il budget disponibile si avvicina all’esaurimento. Il sistema informa l’Executor dei turni rimanenti e gli richiede di scegliere se continuare, chiedere un’estensione oppure concludere lo step.

Il **Checkpoint di fine budget** interviene invece quando il limite corrente viene raggiunto. A quel punto l’Executor deve necessariamente richiedere un’estensione, se ancora disponibile, oppure terminare la fase con un risultato formale.

In questo modo, il budget limita l’autonomia senza imporre una durata rigida uguale per tutti gli step.

### Tool interni e recupero dei valori verificati

Oltre agli strumenti utilizzati per interagire con l’ambiente, l’Executor dispone di alcuni tool interni dedicati alla gestione del workflow.

I principali sono:

- `submit_step_result`, utilizzato per terminare formalmente lo step e restituirne il risultato.
- `request_turn_extension`, utilizzato per richiedere un’estensione del budget.
- `show_verified_values` e `get_verified_value`, utilizzati per accedere ai dati verificati negli step precedenti.

La gestione dei `verified_values` segue un meccanismo di recupero a due stadi. All’inizio di ogni fase, l’Executor non riceve l’intero contenuto delle informazioni raccolte precedentemente, ma soltanto l’elenco delle chiavi disponibili.

Ad esempio, può sapere che nello stato sono presenti valori identificati come `ssh_user` o `web_admin_password`, senza riceverne immediatamente il contenuto. Il valore effettivo viene recuperato solo quando necessario tramite `get_verified_value`.

Questa scelta riduce la quantità di informazioni inserite nel contesto del modello e impedisce che credenziali, token, hash e altri dati accumulati durante il test vengano ripetuti a ogni nuovo step.

### Il contratto `StepResult` e il rifiuto dell’auto-certificazione

La conclusione di uno step avviene attraverso il tool `submit_step_result`. I dati restituiti dal modello vengono trasformati in un oggetto tipizzato `StepResult`, che rappresenta il contratto formale tra Executor e Orchestrator.

`StepResult` contiene:

- L’identificativo dello step e una sintesi delle operazioni eseguite.
- I valori eventualmente estratti durante la fase.
- Il numero di turni e le chiamate ai tool effettuate.
- La telemetria relativa ai token utilizzati.
- La valutazione della checklist.
- Le evidenze associate a ciascun controllo.

Ogni voce della checklist viene rappresentata tramite un `ChecklistItemResult`, che associa al requisito un esito booleano e la relativa evidenza.

Il punto fondamentale è che il valore finale di `status` non viene accettato direttamente dalla risposta dell’LLM. Prima di creare lo `StepResult`, il codice ricalcola il risultato sulla base della checklist.

Se anche un solo requisito non è stato soddisfatto, lo stato dello step viene forzato a `FAILED`, indipendentemente dal giudizio espresso dal modello.

La conformità dello step non dipende quindi dall’auto-valutazione dell’Executor, ma dall’applicazione deterministica delle condizioni definite nell’Attack Plan. Il modello raccoglie e interpreta le evidenze, mentre il codice mantiene il controllo sul verdetto finale.

Per eseguire queste operazioni, l’Executor necessita infine di uno strato capace di mediare l’interazione tra il modello, gli strumenti di sicurezza e le sessioni terminali persistenti. Questo ruolo è svolto dal **Bridge**, descritto nella sezione successiva.

## 3.7 Il Bridge di esecuzione: mediazione operativa e gestione delle interazioni con il target

L’Executor non interagisce direttamente con la macchina attaccante o con il target. Tra la logica decisionale del modello e l’ambiente operativo è presente un componente dedicato, denominato **Bridge** (`executor/mcp_bridge.py`).

Il Bridge non costituisce un nodo autonomo del grafo di orchestrazione, ma rappresenta lo strato attraverso cui l’Executor accede agli strumenti di sicurezza e alle sessioni terminali. Il suo compito è uniformare backend operativi differenti dietro un’unica interfaccia e adattare input e output alle esigenze del modello linguistico.

Il componente opera su due direzioni principali:

- **Canale dell’azione**, attraverso il quale vengono selezionati e invocati i comandi verso l’ambiente operativo.
- **Canale della percezione**, attraverso il quale gli output restituiti dagli strumenti e dalle sessioni terminali vengono normalizzati e preparati per l’Executor.

### Canale dell’azione: architettura a due livelli

Le operazioni necessarie durante un penetration test didattico non presentano tutte le stesse caratteristiche. Attività come scansione ed enumerazione possono essere eseguite come comandi indipendenti, mentre exploit, autenticazioni interattive e privilege escalation richiedono sessioni persistenti.

Per supportare entrambe le modalità, il Bridge espone due livelli operativi distinti.

**1. Livello 1 (L1) — Tool stateless tramite HexStrike**

Il primo livello fornisce accesso agli strumenti di sicurezza esposti dal server **HexStrike**, in esecuzione sulla macchina Kali Linux. Rientrano in questa categoria tool come `nmap`, `hydra`, `gobuster`, `nikto` e `curl`.

Ogni chiamata è indipendente: l’Executor invia lo strumento e i relativi parametri, HexStrike esegue il comando, ne attende la terminazione e restituisce stdout e stderr.

Questo modello è adatto alle operazioni che non richiedono il mantenimento dello stato tra una chiamata e la successiva. Non è invece sufficiente per interazioni che prevedono prompt, autenticazioni o shell persistenti.

**2. Livello 2 (L2) — Terminal Gateway e sessioni PTY persistenti**

Per le operazioni interattive è stato sviluppato un microservizio dedicato, denominato **Terminal Gateway** (`terminal_gateway/terminal_gateway.py`), in esecuzione sulla macchina Kali Linux e basato su FastAPI e `pexpect`.

Il gateway gestisce pseudo-terminali Unix persistenti e li espone all’Executor attraverso `interactive_terminal_exec`.

Questo livello consente di:

- **Mantenere lo stato della sessione.** Directory corrente, variabili d’ambiente, stato di autenticazione e shell ottenute rimangono disponibili tra turni e step differenti.
- **Gestire più sessioni in parallelo.** Ogni terminale viene identificato tramite `session_name`, permettendo all’Executor di mantenere contemporaneamente più contesti operativi.
- **Supportare flussi asincroni.** Ad esempio, una sessione può mantenere un listener in attesa mentre un’altra esegue l’azione che provoca la connessione verso il listener.

La distinzione tra i due livelli permette quindi di utilizzare tool stateless per le operazioni semplici e sessioni PTY persistenti quando è necessario mantenere continuità nell’interazione.

La figura seguente riassume questa struttura, mostrando il rapporto tra Executor, Bridge, HexStrike e Terminal Gateway.

![[Pasted image 20261002090531.png]]

### Canale della percezione: normalizzazione dell’output e informazioni di stato

Il Bridge non si limita a inoltrare i risultati dei comandi. Gli output vengono pre-elaborati prima di essere restituiti all’Executor, in modo da ridurre il rumore e fornire al modello informazioni utili sullo stato dell’interazione.

Le principali operazioni sono:

- **Rimozione delle sequenze ANSI/VT100.** Gli output provenienti dalle sessioni PTY possono contenere codici di controllo utilizzati per colori, movimento del cursore e aggiornamento dello schermo. Il Bridge rimuove queste sequenze e normalizza i caratteri di fine riga prima di restituire il testo al modello.
- **Rilevamento dei prompt di autenticazione.** Il Bridge identifica euristicamente richieste di password o passphrase. Quando viene rilevato un prompt ancora attivo, l’output viene arricchito con un avviso che segnala all’Executor la necessità di fornire una credenziale oppure gestire correttamente l’interazione.
- **Aggiornamento dinamico delle descrizioni dei tool.** Le descrizioni fornite all’Executor vengono adattate in funzione dello stato corrente. Se sono presenti sessioni PTY attive, queste vengono indicate direttamente nella descrizione di `interactive_terminal_exec`; analogamente, i tool stateless possono essere marcati come non adatti alle operazioni che devono essere eseguite all’interno di una shell remota.

Queste informazioni riducono il rischio che l’Executor perda il contesto della sessione corrente o utilizzi un backend non adatto all’operazione da svolgere.

### Gestione del contesto: troncamento degli output e tool-slicing

Gli output prodotti dagli strumenti di sicurezza possono raggiungere dimensioni molto elevate. Questo costituisce un problema soprattutto con modelli locali, dove la finestra di contesto disponibile è limitata.

Il Bridge applica due meccanismi principali per ridurre il consumo di token.

**1. Troncamento degli output.**  
Se un risultato supera la soglia configurata (`MAX_TOOL_OUTPUT_CHARS = 8000`), il testo viene ridotto preservandone la parte iniziale e quella finale. La sezione centrale viene sostituita da un marcatore che segnala l’avvenuto troncamento.

Questa scelta permette di mantenere sia il contesto iniziale del comando sia eventuali messaggi conclusivi o errori, evitando di inserire nel contesto migliaia di caratteri non necessari.

**2. Tool-slicing tramite `allowed_tools`.**  
Il catalogo completo degli strumenti disponibili può essere molto ampio. Inviare all’LLM la descrizione di tutti i tool a ogni iterazione comporterebbe un costo significativo in termini di token e aumenterebbe il numero di opzioni non pertinenti.

Per ogni `TestStep`, il Bridge espone quindi soltanto gli strumenti presenti in `allowed_tools`, oltre a quelli disponibili globalmente per la gestione del terminale. L’Executor riceve così un insieme di tool limitato alle esigenze della fase corrente.

A queste misure si aggiunge un **watchdog con timeout adattivo**. Nell’interazione con una sessione PTY, il Bridge non considera conclusa un’operazione dopo un intervallo fisso, ma continua a osservare il flusso di output fino al raggiungimento di una finestra di silenzio oppure al rilevamento di una condizione di arresto prevista.

### Supporto alle applicazioni terminali interattive

Le sessioni PTY possono essere utilizzate anche con applicazioni terminali interattive, come `nano`, `vi`, `vim`, `less` o `more`. Questi programmi non si comportano come normali comandi lineari, perché interpretano direttamente eventi di tastiera e sequenze di controllo.

Per consentire all’Executor di interagire con queste applicazioni, il Terminal Gateway implementa una mappatura dei principali tasti speciali. Identificatori simbolici come `enter`, `esc`, `tab`, `backspace`, i tasti direzionali e combinazioni come `ctrl+x` vengono convertiti nelle corrispondenti sequenze inviate alla sessione PTY.

È inoltre possibile trasmettere sequenze ordinate di input attraverso il parametro `commands`, permettendo di eseguire più interazioni terminali all’interno dello stesso turno.

Un caso specifico riguarda il tasto Invio. In alcune applicazioni terminali, l’invio del carattere `\n` non equivale alla pressione fisica di Enter. In `nano`, ad esempio, può essere interpretato come una combinazione di controllo differente. Per evitare questo comportamento, il Gateway traduce l’azione `enter` nel carattere `\r`, corrispondente al Carriage Return atteso dal terminale interattivo.

Questa gestione permette all’Executor di mantenere la stessa interfaccia anche quando il percorso di attacco richiede applicazioni interattive, evitando di interrompere la sessione o modificare involontariamente il contenuto visualizzato.

Il Bridge fornisce quindi all’Executor un’interfaccia unica per strumenti stateless e terminali persistenti, occupandosi allo stesso tempo della normalizzazione degli output, della gestione dello stato delle sessioni e del contenimento del contesto.

Una volta terminata l’esecuzione degli step, oppure in caso di interruzione dovuta a una non conformità, il workflow passa al **Final Evaluator**, responsabile della valutazione complessiva della run.

## 3.8 Il Final Evaluator: valutazione deterministica e Root Cause Analysis

Il **Final Evaluator** è il nodo conclusivo del workflow di collaudo. Viene eseguito al termine dell’Attack Plan oppure immediatamente dopo il primo fallimento, in accordo con il principio di Fail-Fast.

Il suo compito è duplice: consolidare le metriche della run e analizzare le eventuali cause di fallimento. Per mantenere separati i dati quantitativi dall’interpretazione dell’LLM, il componente è organizzato in due stadi.

### Stadio 1: metriche deterministiche

Il primo stadio è interamente implementato in Python e non utilizza modelli linguistici. A partire dallo stato condiviso e dagli `StepResult` raccolti durante il test, il sistema calcola:

- Il livello di avanzamento del collaudo.
- I tempi di esecuzione complessivi e per nodo.
- Il numero di token utilizzati dai diversi componenti.
- Lo stato finale della run.

I risultati vengono serializzati nel file `run_summary.json`, utilizzato successivamente per la valutazione sperimentale descritta nel Capitolo 5.

### Stadio 2: analisi qualitativa e Root Cause Analysis

Il secondo stadio utilizza un modello linguistico per interpretare le evidenze raccolte e produrre una diagnosi del fallimento.

L’LLM riceve l’Attack Plan, i risultati degli step e gli output rilevanti, producendo due artefatti principali:

- **`REPORT.md`**, contenente una sintesi della run, le metriche principali e la Root Cause Analysis.
- **`healing_ticket.json`**, generato in caso di non conformità e destinato al sottosistema VulcaHealing.

Il `healing_ticket.json` classifica inoltre la natura del problema, distinguendo tra un difetto effettivo della macchina e un errore nella specifica di collaudo.

Nel primo caso, il problema può essere ricondotto a una configurazione o a un artefatto Infrastructure as Code non corretto. Nel secondo caso, il comportamento della macchina è coerente, ma è la checklist a richiedere una condizione errata o non realistica.

Questa distinzione evita che il sistema di healing modifichi un ambiente corretto per soddisfare un test formulato in modo errato.

Con la produzione di `run_summary.json`, `REPORT.md` e dell’eventuale `healing_ticket.json` si conclude il workflow di VulcaTest. Il ticket diagnostico costituisce quindi il punto di collegamento con VulcaHealing, descritto nel Capitolo 4.

## 3.9 Prompt engineering e definizione dei ruoli agentici

Una parte rilevante dello sviluppo di VulcaTest ha riguardato la definizione dei system prompt associati ai componenti basati su modelli linguistici. Planner, Executor, Final Evaluator e Healer svolgono infatti compiti differenti e richiedono quindi istruzioni, vincoli e formati di output specifici.

È importante distinguere questo approccio dal fine-tuning. I modelli utilizzati non vengono modificati nei pesi e non vengono sottoposti a nuove fasi di addestramento. Il loro comportamento viene invece guidato attraverso system prompt dedicati, regole esplicite, strumenti disponibili e strutture di output definite dall’architettura.

### Sviluppo iterativo dei prompt

La definizione dei prompt è avvenuta attraverso un processo iterativo basato sull’osservazione dei comportamenti dell’agente durante i test.

Il ciclo seguito può essere riassunto in quattro fasi:

1. Esecuzione del test.
2. Individuazione di un comportamento indesiderato o di un errore ricorrente.
3. Introduzione di una nuova regola o modifica del prompt.
4. Nuova esecuzione per verificarne l’effetto.

Le prime versioni dei prompt, formulate in modo più generale, lasciavano al modello un margine di interpretazione eccessivo. Durante i test sono emersi comportamenti ricorrenti, come dichiarazioni premature di successo, tentativi di aggirare il percorso previsto, uso improprio di canali out-of-band o gestione errata delle sessioni interattive.

Questi casi sono stati progressivamente tradotti in vincoli più espliciti, riducendo l’ambiguità delle istruzioni.

### Specializzazione dei prompt per ruolo

I prompt sono stati differenziati in funzione del compito svolto dal singolo componente.

Il **Planner** è orientato alla produzione di una specifica verificabile e coerente con le fonti di input. Il prompt definisce la gerarchia dei documenti, le regole per la costruzione delle checklist e i criteri di grounding.

L’**Executor** utilizza invece l’Auditor Mode, che stabilisce il perimetro operativo, impone la raccolta di evidenze e limita la possibilità di aggirare il percorso previsto.

Il **Final Evaluator** riceve istruzioni più orientate alla sintesi e alla diagnosi, con l’obiettivo di correlare le evidenze raccolte e produrre la Root Cause Analysis senza modificare il verdetto deterministico già calcolato dal sistema.

Il **Healer**, descritto nel Capitolo 4, utilizza infine un prompt specifico per la modifica controllata dei sorgenti Infrastructure as Code.

### Regole esplicite e formati vincolati

Per ridurre l’interpretazione libera delle istruzioni, i prompt sono stati strutturati secondo un’impostazione basata su regole esplicite.

Ogni prompt definisce:

- Il ruolo del componente.
- Il perimetro delle azioni consentite.
- I divieti principali.
- Le condizioni di successo o fallimento.
- Il formato degli output attesi.

Questa impostazione richiama il principio della _Constitutional AI_, pur senza implementarne l’intera metodologia: l’obiettivo è utilizzare un insieme stabile di regole per vincolare il comportamento del modello durante l’esecuzione.

I prompt completi sono riportati in Appendice. In questa sezione vengono invece evidenziati soltanto i principi che ne hanno guidato la progettazione e il processo con cui sono stati progressivamente raffinati.

---

## 3.10 Modello locale e ottimizzazione dei parametri di inferenza

Come definito nel principio di modularità (3.2), l’architettura di VulcaTest è indipendente dallo specifico modello linguistico utilizzato. Planner, Executor e Final Evaluator comunicano con il backend di inferenza attraverso interfacce standard, consentendo in linea di principio di sostituire il modello senza modificare la logica del workflow.

Questa indipendenza non rende però secondaria la scelta del modello. Per rendere VulcaTest concretamente utilizzabile è stato necessario individuare una configurazione capace di sostenere il ciclo agentico, le finestre di contesto richieste e le numerose interazioni con i tool entro i limiti dell’hardware disponibile.

L’ambiente utilizzato durante lo sviluppo dispone di una singola GPU con **16 GB di VRAM** e **64 GB di RAM di sistema**. La selezione e la configurazione del modello sono state quindi affrontate come parte integrante dello sviluppo del sistema.

### Scelta dell’inferenza locale

Come discusso nella sezione 3.1, l’utilizzo continuativo di modelli commerciali tramite API presenta due criticità nel caso d’uso considerato: l’interferenza dei guardrail con alcune operazioni necessarie al penetration testing didattico e il costo associato a esecuzioni lunghe e ripetute.

L’impiego di un modello locale open-weight consente di ridurre entrambi i problemi. Il modello può essere eseguito all’interno dell’infrastruttura controllata del laboratorio e presenta generalmente minori restrizioni rispetto ai servizi commerciali sulle operazioni svolte nell’ambiente didattico. Allo stesso tempo, l’inferenza locale elimina il costo variabile per token, rendendo più semplice ripetere il collaudo durante lo sviluppo e la valutazione sperimentale.

Il vantaggio dell’approccio locale deve però essere bilanciato con i limiti delle risorse disponibili. La dimensione del modello, il livello di quantizzazione e la finestra di contesto incidono direttamente sulla quantità di memoria richiesta e sulla velocità di inferenza.

### Selezione del modello e reasoning

All’interno dei vincoli hardware disponibili è stata adottata una variante quantizzata di **Qwen 3.8 27B**, eseguita localmente tramite formato GGUF.

La scelta non deriva dalla volontà di legare VulcaTest a uno specifico modello, ma dalla ricerca di una configurazione sufficientemente capace da gestire il ciclo operativo dell’agente pur rimanendo compatibile con i 16 GB di VRAM disponibili.

Un requisito particolarmente importante è risultato essere il supporto a una fase esplicita di **reasoning** prima dell’esecuzione delle azioni. L’Executor non deve infatti limitarsi a produrre un comando, ma deve interpretare l’output precedente, confrontarlo con il `TestStep` corrente e decidere come proseguire.

Durante lo sviluppo è emerso che un comportamento eccessivamente orientato all’azione immediata può portare il modello a ripetere tentativi simili di fronte a un errore senza rivalutare adeguatamente lo stato dell’esecuzione. Per questo motivo, Planner ed Executor vengono utilizzati con un livello di `reasoning_effort` **medium**, lasciando al modello uno spazio sufficiente per analizzare il problema senza aumentare eccessivamente il numero di token generati.

Il confronto sistematico con configurazioni o modelli differenti viene invece affrontato nel Capitolo 5, dove VulcaTest stesso può essere utilizzato come ambiente controllato per misurarne il comportamento.

### Configurazione del runtime

L’esecuzione del modello entro i limiti della GPU ha richiesto alcune ottimizzazioni del runtime.

- **Quantizzazione GGUF a circa 3 bit.** La quantizzazione riduce l’occupazione dei pesi e rende possibile l’esecuzione del modello entro la memoria disponibile, lasciando spazio alla KV-cache necessaria per il contesto.
- **KV-cache a 16 bit.** La cache dell’attenzione viene mantenuta in fp16 nella configurazione utilizzata durante i test.
- **Speculative Decoding tramite MTP e N-gram.** L’abilitazione della predizione multi-token e del supporto N-gram viene utilizzata per aumentare la velocità di generazione, particolarmente importante nell’Executor, dove una singola fase può richiedere numerose iterazioni.
- **Dimensionamento differenziato del contesto.** I diversi componenti non richiedono la stessa finestra di contesto. Il Planner deve elaborare contemporaneamente più documenti di specifica, mentre l’Executor opera su contesti più contenuti ma viene invocato ripetutamente durante il test.

La gestione di queste configurazioni è affidata al modulo `model_manager.py`. Prima dell’inferenza, il componente verifica il modello e la finestra di contesto attualmente caricati e, quando necessario, aggiorna la configurazione del server locale senza richiedere un intervento manuale.

Questo permette di associare configurazioni differenti ai diversi ruoli mantenendo invariata la logica del framework.

### VulcaTest come ambiente di valutazione dei modelli

La separazione tra architettura e modello introduce anche una seconda possibilità di utilizzo del sistema. Poiché il workflow, gli strumenti disponibili, l’Attack Plan e i criteri di verifica possono essere mantenuti invariati, VulcaTest può essere utilizzato anche per confrontare il comportamento di modelli differenti nello stesso scenario.

In particolare, il sistema permette di osservare aspetti come la capacità di seguire un piano prestabilito, interpretare gli output dei tool, gestire sessioni interattive, recuperare da errori e produrre le evidenze richieste dalla checklist.

La valutazione del modello diventa quindi separabile dalla valutazione dell’architettura: mantenendo invariato VulcaTest è possibile sostituire il backend di inferenza e misurare come cambia il comportamento dell’Executor. Questa possibilità verrà ripresa nel Capitolo 5 durante la valutazione sperimentale.

---

## Conclusioni del capitolo: dal collaudo alla riparazione autonoma

In questo capitolo è stata esaminata in dettaglio l'architettura di **VulcaTest**, il sistema ideato per trasformare il collaudo di sicurezza delle macchine didattiche da un processo manuale o stocastico in un'attività rigorosa, metodica ed evidence-based. 

Attraverso la formalizzazione di cinque principi architetturali fondamentali — tra cui spiccano la netta separazione tra codice deterministico e modelli probabilistici, il rifiuto categorico dell'autocertificazione dell'agente e la rigida demarcazione dei ruoli operativi — è stato possibile superare tutti i limiti che rendevano inapplicabili i comuni harness generici:
- Il **Planner** traduce la documentazione di progetto in una sequenza tipizzata di `TestStep`, vincolando i criteri di successo a oracoli composti in congiunzione logica `AND`;
- L'**Orchestratore** controlla deterministicamente la progressione del test lungo un grafo a stati esplicito, impedendo all'agente di deviare dagli obiettivi assegnati;
- L'**Executor**, operando in regime di *Auditor Mode*, interagisce con l'ambiente esclusivamente tramite comandi in-band e raccoglie evidenze testuali verificabili per ciascun checkpoint, subordinando il verdetto a un ricalcolo deterministico condotto dal codice Python;
- Il **Bridge** fornisce un canale robusto di azione e percezione, garantendo l'igiene dei contesti mediante tool-slicing, troncamento dinamico degli output e gestione di sessioni PTY interattive;
- Il **Final Evaluator** consolida la telemetria di esecuzione in metriche strutturate e conduce un'analisi retrospettiva delle cause radice qualora il collaudo registri un fallimento.

Al termine di una sessione di collaudo che ha rilevato la non conformità della macchina bersaglio, VulcaTest non si limita a emettere un verdetto negativo generico, ma produce un artefatto strutturato formale: il file `healing_ticket.json`. Tale documento isola con precisione lo step bloccante, il componente di sistema coinvolto e la natura del difetto riscontrato.

A questo punto si apre un interrogativo fondamentale, che segna il passaggio al capitolo successivo: **è possibile sfruttare l'evidenza puntuale prodotta dal collaudatore per riparare automaticamente i difetti della macchina, chiudendo il ciclo tra verifica e correzione?**

Tentare di demandare la correzione al medesimo agente di collaudo o intervenire direttamente all'interno dell'ambiente virtualizzato attivo costituirebbe una grave violazione architetturale, riparando l'effetto visibile anziché la causa d'origine. Nel Capitolo 4 verrà introdotto **VulcaHealing**, il sottosistema autonomo progettato per ricevere il ticket diagnostico e intervenire chirurgicamente sui sorgenti *Infrastructure-as-Code* a monte, implementando un ciclo completo di auto-riparazione a loop chiuso.
