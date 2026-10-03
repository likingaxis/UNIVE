# Capitolo 3 — Architettura e implementazione di VulcaTest

Le macchine generate da VulcAIn devono essere verificate prima di essere usate. Non basta che vengano costruite senza errori: devono anche poter essere risolte lungo il percorso didattico previsto. VulcaTest svolge questa verifica attraverso un penetration test agentico, in cui ogni passaggio viene confermato da evidenze raccolte sul target. La correzione delle non conformità è descritta nel Capitolo 4.

## 3.1 Requisiti e limiti delle soluzioni generiche

L’obiettivo di VulcaTest è verificare che una macchina didattica vulnerabile sia conforme a quanto definito in fase di progettazione e, in caso contrario, correggerla. Una macchina è conforme se può essere risolta seguendo il percorso di attacco previsto (_intended path_). Non basta quindi dimostrare che la macchina sia compromettibile: ogni passaggio del percorso deve funzionare realmente.

Una prima sperimentazione è stata condotta con Google Antigravity e il modello Gemini 3.8 Flash High, configurato con un system prompt dedicato e collegato ai tool necessari tramite il protocollo MCP [@googleantigravity2026]. Lo scopo era capire se un modello di frontiera, dotato di tool e istruzioni adeguate, fosse sufficiente a condurre in autonomia il penetration test. Le prove hanno mostrato alcuni limiti che rendono un harness generico poco adatto al conformance testing.

### 3.1.1 Limiti del modello: guardrail e costi di esecuzione

Il primo limite riguarda i guardrail dei modelli di frontiera. Alcune operazioni tipiche del penetration testing, anche se eseguite in un ambiente didattico controllato, possono essere bloccate dai filtri di sicurezza del provider e interrompere il collaudo. Si tratta di un vincolo esterno, che non dipende dall’architettura di VulcaTest.

Il secondo limite è il costo. Lo sviluppo e la valutazione del sistema richiedono molte esecuzioni complete, ciascuna composta da numerosi turni e chiamate ai tool. Con un modello commerciale il costo cresce con il numero e la durata dei test.

Entrambi i problemi si riducono eseguendo il modello in locale. La scelta del modello e la sua configurazione sono descritte nella Sezione 3.10.

### 3.1.2 Limiti sul controllo

Anche eliminando i limiti del modello, resta un problema più generale. Gli harness general-purpose sono pensati per lasciare all’agente la massima autonomia nel raggiungere l’obiettivo. A VulcaTest però non interessa soltanto il risultato finale: serve sapere se la macchina è stata risolta lungo il percorso previsto e se ogni passaggio è supportato da evidenze osservabili.

Durante le prove sono emerse tre criticità.

1. **Eccessiva libertà operativa.** L’agente tende a privilegiare il raggiungimento dell’obiettivo rispetto all’aderenza all’_intended path_. Sono stati osservati tentativi di usare canali esterni alla challenge, come l’accesso diretto al demone Docker dell’host o l’ispezione del filesystem sottostante. In questi casi il test dimostra soltanto che la macchina è compromettibile, non che lo sia attraverso le vulnerabilità didattiche previste.

2. **Auto-certificazione del risultato.** Lo stesso modello esegue uno step e ne valuta l’esito. Una fase può così essere considerata completata sulla base di una deduzione o di un output parziale, senza una prova esplicita per ogni condizione richiesta. Nel conformance testing questo porta ad accettare macchine in cui uno dei passaggi non funziona.

3. **Assenza di controllo sull’esecuzione.** In un harness generico, una volta inviato il prompt, il ciclo agentico procede in autonomia e non è possibile intervenire sulle singole fasi: stabilire quando fermare l’agente, quali tool rendergli disponibili in un dato momento o quali dati registrare. Con un orchestratore sviluppato appositamente, invece, ogni fase e ogni operazione possono essere controllate, ed è possibile raccogliere le metriche necessarie alla valutazione del sistema.

Un caso concreto è emerso durante il test di _Pizzeria_B2R_. Il percorso previsto richiedeva di scoprire un endpoint nascosto attraverso una chat di assistenza. A causa di un difetto di generazione la chat non funzionava, ma il collegamento all’endpoint era rimasto visibile nel codice HTML della pagina. L’agente ha seguito il collegamento diretto, ha proseguito fino a ottenere una shell e ha considerato il test superato. La macchina era quindi compromettibile, ma non conforme: uno dei passaggi del percorso didattico non funzionava.

Questo caso mostra che risolvere una challenge non equivale a verificarne la conformità. Da qui nasce VulcaTest: un’architettura in cui l’agente opera entro un perimetro controllato e l’esito del test dipende dalle evidenze raccolte durante l’esecuzione, non dalla sola valutazione del modello.

## 3.2 Principi di progettazione del sistema

Prima di progettare l’architettura di VulcaTest sono stati fissati cinque principi, usati come vincoli per le scelte successive. Non descrivono ancora componenti concreti, ma le proprietà che il sistema avrebbe dovuto rispettare.

1. **Deterministico quando possibile, probabilistico quando necessario.** Non tutte le operazioni del workflow richiedono un modello generativo. Ciò che può essere espresso con regole precise viene affidato a codice deterministico. Il modello interviene solo dove servono interpretazione, adattamento al contesto o la scelta tra più azioni possibili.
2. **Esecuzione basata su evidenze.** L’esito di uno step non deve dipendere soltanto dal giudizio dell’Executor. Ogni risultato deve essere accompagnato dalle evidenze raccolte sul target, in modo da poter ricostruire cosa è stato fatto e su quali elementi si basa la valutazione.
3. **Separazione delle responsabilità.** Pianificazione, coordinamento, esecuzione e valutazione sono assegnate a componenti distinti, ciascuno con un ruolo e compiti definiti (impostazione _role-based_).
4. **Modularità.** I componenti devono restare il più possibile indipendenti tra loro. Deve essere possibile cambiare modello, parametri di inferenza o backend senza modificare la struttura del workflow, e aggiungere nuovi tool senza toccare le parti che non li usano.
5. **Pianificazione globale, ReAct nell’esecuzione.** Il sistema lavora su due livelli. A livello globale segue un approccio Plan-and-Execute: il percorso da verificare viene definito prima dell’esecuzione. All’interno di ogni step, l’Executor segue un ciclo ReAct e decide l’azione successiva in base agli output osservati sul target.

## 3.3 Architettura generale e flusso di coordinamento

VulcaTest è composto da quattro componenti principali (Planner, Orchestrator, Executor e Final Evaluator), affiancati dal Bridge, che gestisce l’accesso ai tool, e dal nodo di healing, descritto nel Capitolo 4. Prima di descriverli singolarmente, questa sezione ne presenta l’organizzazione complessiva.

### 3.3.1 Inquadramento architetturale e gestione dello stato

Facendo riferimento al modello architetturale proposto da CoALA (_Cognitive Architectures for Language Agents_) [@sumers2024coala], VulcaTest può essere descritto come un agente modulare, in cui funzioni diverse sono separate in componenti specializzati ma restano coordinate all’interno di un unico flusso di esecuzione. Pianificazione, orchestrazione, esecuzione e valutazione hanno responsabilità distinte e lavorano sullo stesso stato del workflow.

Nel modello CoALA, la Working Memory raccoglie le informazioni necessarie al compito corrente e viene aggiornata durante l’interazione dell’agente con l’ambiente [@sumers2024coala]. In VulcaTest questo ruolo è svolto da `VulcaTestState`, la struttura dati condivisa che mantiene lo stato della run e che viene letta e aggiornata dai diversi componenti.

### 3.3.2 Punti di ingresso e avvio del workflow

VulcaTest può essere avviato in due modalità:

- **Execution Mode:** se è già disponibile un Attack Plan validato (`ATTACK_PLAN.md`), la pianificazione viene saltata e il test parte direttamente dall’esecuzione.
- **Planning & Execution Mode:** se il piano non esiste, o se ne viene richiesta la rigenerazione, viene eseguito prima il Planner. Il piano prodotto viene validato e poi passato allo stesso flusso di esecuzione.

In entrambi i casi, una volta disponibile l’Attack Plan, il test prosegue attraverso lo stesso grafo di orchestrazione.

![[Pasted image 20261002152624.png|380]]

### 3.3.3 Comunicazione tra i componenti e strutture dati tipizzate

I componenti non si passano informazioni sotto forma di testo libero, ma attraverso strutture dati definite, che il codice può controllare prima di passarle alla fase successiva. Il Planner produce una sequenza di `TestStep`, l’Executor restituisce uno `StepResult` per ogni step e il Final Evaluator usa i risultati raccolti per generare gli artefatti finali della run. Grazie allo stato condiviso, ogni componente trova le informazioni di cui ha bisogno senza doverle ricostruire dal testo generato dal modello.

## 3.4 Il Planner: generazione e formalizzazione dell’Attack Plan

Il Planner trasforma la documentazione della challenge in un Attack Plan (`ATTACK_PLAN.md`) che elenca gli step da verificare. Il `WRITEUP.md` è pensato come guida alla risoluzione e descrive cosa fare. L’Attack Plan deve indicare anche, per ogni fase, cosa deve essere raggiunto e quali condizioni vanno verificate prima di proseguire.

### 3.4.1 Generazione del piano e parsing deterministico

Il Planner lavora in due stadi. Nel primo, il modello legge i documenti della challenge e scrive `ATTACK_PLAN.md`, un documento Markdown in cui le informazioni strutturate (liste, parametri, comandi) sono racchiuse in blocchi YAML. Il formato YAML è stato preferito al JSON perché ha una sintassi più permissiva.

Nel secondo stadio, un parser in Python verifica la struttura del documento e converte ogni fase in un oggetto `TestStep`. Il modello resta responsabile dell’interpretazione dei documenti, mentre il codice controlla che il risultato sia utilizzabile dal resto del workflow. Se il piano ha sezioni mancanti o non rispetta il formato, viene rifiutato prima dell’avvio del test, in modo che un errore di generazione non arrivi alle fasi successive.

Ogni `TestStep` contiene un identificativo, l’obiettivo della fase, i tool consentiti, i valori che la fase deve produrre e una checklist di condizioni da verificare. Al termine dello step, è sulla checklist che si stabilisce se lo step è stato completato.

### 3.4.2 Gerarchia delle fonti e gestione delle ambiguità

Il Planner riceve tre documenti: `DESCRIPTION.md`, scritto dall’utente, e `STORYLINE.md` e `WRITEUP.md`, generati da VulcaMind a partire da questa descrizione. Poiché hanno ruoli diversi, i tre documenti possono contenere informazioni non del tutto allineate. Per evitare che sia il modello a risolvere i conflitti in modo arbitrario, il prompt stabilisce un ordine di priorità:

- `STORYLINE.md` definisce il percorso previsto e l’ordine delle fasi;
- `WRITEUP.md` fornisce i dettagli tecnici per eseguirle;
- `DESCRIPTION.md` contiene le informazioni generali sulla challenge.

In caso di conflitto il Planner mantiene il percorso della Storyline, usa il Writeup come riferimento tecnico e non introduce passaggi assenti dai documenti.

Anche porte, credenziali, percorsi e altri parametri devono provenire dai documenti di input. Se un valore non è ancora noto viene usato un segnaposto esplicito, come `<TARGET_IP>`, che viene risolto durante l’esecuzione.

### 3.4.3 Regole per la definizione dei criteri di verifica

La checklist di ogni `TestStep` stabilisce quando lo step può considerarsi completato. Per questo la sua costruzione segue alcune regole precise.

- **Tutti i requisiti sono obbligatori.** Le voci della checklist sono in AND e non possono essere marcate come opzionali. Un controllo che non è un requisito rigido della fase va rimosso o spostato nella fase in cui lo diventa.
- **Il meccanismo di scoperta previsto va verificato.** Se una risorsa deve essere ottenuta attraverso uno specifico passaggio, la checklist richiede di verificare quel passaggio. Raggiungere la stessa risorsa con una scorciatoia non basta.
- **Ogni controllo si basa su un risultato osservabile.** Deve trattarsi di un output concreto, come una risposta HTTP, una porta aperta, un file presente o un valore estratto, ottenibile con i privilegi disponibili in quella fase.
- **Anche un fallimento può essere il comportamento atteso.** Se uno step prevede intenzionalmente un errore o un rifiuto, la checklist verifica che quel comportamento si presenti, invece di richiedere l’esito positivo del comando.

## 3.5 L’Orchestrator: controllo del workflow e gestione dello stato

L’Orchestrator controlla l’avanzamento del test e mantiene lo stato condiviso tra le fasi. Con questo termine non si indica un singolo modulo, ma l’insieme della logica che coordina il workflow.

L’orchestrazione è implementata con LangGraph [@langgraph], che rappresenta il flusso come un grafo a stati: i nodi sono le fasi principali del sistema, gli archi le condizioni con cui il controllo passa da una fase all’altra. Le transizioni sono decise interamente dal codice. L’Orchestrator non sceglie come completare uno step, ma quale componente eseguire e quando il workflow deve proseguire o terminare.

Nel grafo esiste anche un nodo chiamato `orchestrator`, che seleziona lo step corrente e controlla l’avanzamento del piano. È solo una parte dell’Orchestrator e non coincide con l’intera logica di coordinamento.

### 3.5.1 Stato condiviso: `VulcaTestState`

Lo stato introdotto nella Sezione 3.3.1 viene passato a ogni nodo del grafo, che restituisce gli aggiornamenti prodotti durante la propria esecuzione. `VulcaTestState` contiene la sequenza dei `TestStep`, l’indice dello step corrente, lo stato generale della run, i risultati degli step già eseguiti, i valori verificati e le sessioni terminali ancora attive, oltre ai dati di telemetria usati per i report finali.

### 3.5.2 Grafo di esecuzione e condizioni di transizione

Lo `StateGraph` collega i nodi `orchestrator`, `executor`, `final_evaluator` e `healer`. I primi tre costituiscono il flusso di verifica, mentre `healer` estende il grafo con la fase di correzione descritta nel Capitolo 4.

Il nodo `orchestrator` seleziona il `TestStep` corrente: se il piano è terminato il controllo passa al Final Evaluator, altrimenti viene avviato l’Executor. Se lo step ha successo, lo stato viene aggiornato e si passa allo step successivo. Se fallisce, il test si interrompe secondo una logica _fail-fast_ e il controllo passa direttamente al Final Evaluator. Le fasi successive dipendono spesso dai dati o dai privilegi ottenuti nelle precedenti, quindi proseguire dopo un fallimento produrrebbe risultati poco significativi.

Dopo la valutazione finale, una run completata termina. Se invece è stata rilevata una non conformità, il self-healing è abilitato e restano tentativi di correzione disponibili, il controllo passa al nodo `healer`. Al termine della correzione il test riparte dall’inizio.

## 3.6 L’Executor: esecuzione e verifica degli step

L’Executor gestisce l’esecuzione dei singoli `TestStep`. Per ogni step prepara il contesto, mette a disposizione i tool consentiti e avvia il modello, che decide di volta in volta quale azione eseguire.

L’interazione segue un ciclo ReAct (_Reasoning + Action + Observation_) [@yao2023react]: a ogni turno il modello ragiona sullo stato corrente, sceglie un’azione, ne osserva il risultato e decide come proseguire. Il controllo dell’esecuzione resta però all’Executor, che applica i vincoli dello step, gestisce il budget di turni e raccoglie il risultato finale.

### 3.6.1 Il system prompt dell’Executor

Il comportamento del modello durante uno step è regolato da un system prompt dedicato. Il suo scopo è far verificare al modello il percorso previsto, senza aggirare le eventuali anomalie della macchina. Le regole principali sono:

1. **Interazione esclusivamente in-band.** Il modello interagisce con il target solo attraverso i servizi e i canali esposti dalla challenge. Non può usare l’host di virtualizzazione per ispezionare, modificare o riavviare la macchina.
2. **Rispetto dell’intended path.** Tutti i requisiti della checklist vanno soddisfatti e un passaggio previsto non può essere sostituito da una scorciatoia equivalente.
3. **Verifica tramite evidenze.** Ogni voce della checklist deve essere associata a un risultato osservato durante l’esecuzione.
4. **Evidenze anche per i fallimenti.** Anche uno step fallito va motivato con un riscontro concreto, come un messaggio di errore o l’esito di un controllo. Se un segnale atteso non compare, il modello non può concludere subito che lo step è fallito, ma deve prima verificarlo con un comando mirato.
5. **Gestione delle sessioni e del terminale.** Il modello deve distinguere la shell locale della macchina Kali dalle sessioni aperte sul target, gestire prompt di autenticazione e sessioni persistenti senza chiuderle per errore e, dopo aver usato applicazioni interattive, riportare il terminale a uno stato utilizzabile.

### 3.6.2 Gestione dinamica del budget

Ogni `TestStep` viene eseguito con un numero limitato di turni, per evitare che il modello continui a ripetere tentativi simili senza fine. Un limite fisso, però, rischierebbe di interrompere gli step che richiedono più interazioni.

Per questo l’Executor assegna un budget iniziale di turni, che il modello può estendere tramite il tool `request_turn_extension` fino a un tetto massimo per step. I due valori sono configurabili e di default sono impostati a 8 e 20 turni.

Quando mancano due turni alla fine del budget corrente, e di nuovo all’ultimo turno, il modello riceve un avviso con il numero di turni rimanenti. Arrivato al limite deve scegliere se chiedere un’estensione, se ancora disponibile, oppure chiudere lo step inviando il risultato.

### 3.6.3 Recupero dei valori verificati

I dati ottenuti durante gli step, come username, password o token, vengono salvati in `verified_values`. All’inizio di ogni step il modello riceve l’elenco di questi valori: quelli brevi vengono mostrati direttamente, mentre per quelli più lunghi, come una chiave privata o un output su più righe, viene indicato solo il nome. Il contenuto si recupera con `get_verified_value`, e l’elenco può essere richiesto di nuovo con `show_verified_values`.

In questo modo i dati già raccolti non vengono reinseriti per intero a ogni step e il contesto del modello resta più contenuto.

### 3.6.4 Il contratto `StepResult` e la verifica dello step

Lo step si conclude con la chiamata al tool `submit_step_result`. Il modello compila i campi richiesti dal tool, e l’Executor li valida e li organizza in un oggetto tipizzato `StepResult`.

Lo `StepResult` registra l’identificativo dello step, una sintesi delle operazioni svolte, i valori estratti, i turni usati, le chiamate ai tool e la valutazione della checklist. Ogni voce della checklist è associata al suo esito e all’evidenza che il modello indica a supporto.

Lo `status` dichiarato dal modello non viene accettato così com’è: il codice lo ricalcola a partire dagli esiti della checklist e, se anche una sola voce risulta non soddisfatta, marca lo step come `FAILED`. Le evidenze restano associate al risultato e documentano la valutazione del modello, ma il codice non ne interpreta il contenuto.

## 3.7 Il Bridge di esecuzione: gestione dei tool e delle interazioni con il target

Le azioni scelte dal modello vengono eseguite attraverso un componente intermedio, il Bridge (`executor/mcp_bridge.py`). Il Bridge non è un nodo del grafo: fa parte del livello di esecuzione e gestisce l’accesso ai tool installati sulla macchina Kali.

Il suo compito è nascondere all’Executor le differenze tra i backend. Una richiesta può essere inoltrata a un tool stateless esposto da HexStrike oppure a una sessione terminale persistente gestita dal Terminal Gateway. Grazie a questa separazione, nuovi tool o backend possono essere aggiunti senza modificare l’Executor.

### 3.7.1 Esecuzione dei tool: HexStrike e Terminal Gateway

Non tutti i tool richiedono lo stesso tipo di interazione. Scansioni ed enumerazioni possono essere eseguite come chiamate indipendenti, mentre autenticazioni, shell remote o privilege escalation richiedono che lo stato della sessione venga mantenuto da un turno all’altro. Per questo il Bridge usa due livelli di esecuzione:

- il primo si appoggia a HexStrike [@hexstrikeai] per i tool stateless, come `nmap` o `hydra`: il Bridge inoltra la richiesta al server in esecuzione sulla macchina Kali e restituisce il risultato;
- il secondo usa un Terminal Gateway sviluppato appositamente per VulcaTest, che mantiene sessioni PTY[^pty] persistenti tramite `pexpect` [@pexpect]. Il modello continua a interagire con la stessa shell attraverso chiamate successive a `interactive_terminal_exec`. Ogni sessione è identificata da un `session_name`, così da poter mantenere più terminali aperti contemporaneamente.

![[Pasted image 20261002152954.png]]

### 3.7.2 Normalizzazione degli output e stato delle sessioni

Prima di arrivare al modello, gli output dei tool passano dal Bridge. Nelle sessioni PTY vengono rimosse le sequenze di controllo ANSI/VT100 e normalizzati i caratteri di fine riga, così che il modello riceva testo pulito.

Il Bridge riconosce anche alcuni stati dell’interazione, come una richiesta di password o di passphrase ancora in attesa, e li segnala insieme all’output.

Infine, le descrizioni dei tool vengono aggiornate in base alle sessioni aperte. A ogni `session_name` il Bridge associa l’ultima riga prodotta dal terminale: in questo modo il modello sa quali terminali sono attivi e in che stato si trovano, e può scegliere tra una sessione persistente e un tool stateless.

### 3.7.3 Gestione del contesto: troncamento degli output e tool-slicing

Gli output dei tool possono essere molto lunghi e occupare una parte consistente della finestra di contesto. Per questo il Bridge tronca i risultati che superano una soglia prestabilita e segnala che l’output originale era più lungo.

Un secondo meccanismo riguarda i tool disponibili. In ogni step il modello non vede l’intero insieme dei tool, ma solo quelli indicati negli `allowed_tools` del `TestStep`, più alcuni tool sempre presenti per la gestione del terminale (_tool-slicing_). Se il Planner indica `*`, tutti i tool vengono resi disponibili.

### 3.7.4 Supporto alle applicazioni terminali interattive

Le sessioni PTY devono supportare anche applicazioni interattive come `nano`, `vi`, `vim`, `less` o `more`. A differenza dei normali comandi di shell, questi programmi reagiscono direttamente ai tasti premuti.

Per gestirle, il Bridge permette al modello di indicare tasti come `enter`, `esc`, `tab`, `backspace`, le frecce direzionali e combinazioni come `ctrl+x` tramite identificatori testuali, che vengono convertiti nelle sequenze corrispondenti e inviati alla sessione. Più input possono essere inviati in sequenza attraverso il parametro `commands`.

Un caso particolare riguarda il tasto Invio. In un terminale, la pressione di Enter invia il carattere Carriage Return (`\r`), non il newline (`\n`). Molte applicazioni interattive distinguono i due caratteri: in `nano`, ad esempio, `\n` corrisponde alla combinazione `Ctrl+J`, che giustifica il testo invece di andare a capo o confermare un comando. Per questo il Bridge traduce `enter` in `\r`, in modo che il tasto produca lo stesso effetto della pressione reale.

## 3.8 Il Final Evaluator: valutazione finale e Root Cause Analysis

Il Final Evaluator viene eseguito al termine dell’Attack Plan, oppure quando un fallimento interrompe il test. A partire dallo stato della run e dai risultati degli step, genera gli artefatti conclusivi della verifica. Come il Planner, è diviso in due stadi: il primo calcola in modo deterministico i dati della run, il secondo usa il modello per interpretare le evidenze e, se necessario, individuare la causa del fallimento.

### 3.8.1 Stadio 1: raccolta delle metriche

Il primo stadio è scritto interamente in Python e raccoglie le metriche usate nella valutazione sperimentale del Capitolo 5. Da `VulcaTestState`, dagli `StepResult` e dai record delle chiamate ai tool ricava i dati della run: lo stato finale, l’avanzamento del test, i tempi di esecuzione, il numero di chiamate ai tool e i token consumati da ciascun componente.

Questi dati vengono salvati in `run_summary.json`, insieme ai valori verificati e ai risultati dei singoli step, e possono essere elaborati in seguito senza dipendere dall’interpretazione del modello.

### 3.8.2 Stadio 2: diagnosi del fallimento e Root Cause Analysis

Il secondo stadio interpreta le evidenze senza modificare l’esito della run. Il modello riceve l’Attack Plan, gli `StepResult` e gli output rilevanti e produce `REPORT.md`, che riassume lo svolgimento del test e, in caso di fallimento, ne analizza la possibile causa.

Se è stata rilevata una non conformità viene generato anche `healing_ticket.json`, che indica lo step che ha bloccato l’esecuzione, il componente coinvolto, la causa individuata e il tipo di difetto. I tipi previsti sono tre: difetti nella generazione dell’Infrastructure as Code (`IAC_GENERATION_DEFECT`), errori di configurazione (`CONFIG_DEFECT`) ed errori nella specifica del test (`SPECIFICATION_DEFECT`).

L’ultima categoria serve a distinguere un problema reale della macchina da un criterio di verifica formulato in modo errato. In questo caso la macchina è conforme e non deve essere modificata. Quando invece il difetto riguarda la macchina, il ticket diventa l’input del nodo di healing, descritto nel Capitolo 4.

## 3.9 Prompt engineering e definizione dei ruoli agentici

Ogni componente di VulcaTest che usa un modello è guidato da un system prompt specifico, scritto in funzione del ruolo che svolge nel workflow.

I prompt sono stati progettati in modo iterativo. Le prime versioni lasciavano al modello più margine di interpretazione e durante i test sono emersi comportamenti come dichiarazioni di successo premature, tentativi di aggirare il percorso previsto o una gestione errata delle sessioni interattive. Questi casi sono stati tradotti, di volta in volta, in vincoli più chiari.

Nel correggere i prompt si è cercato di non specializzarli sui singoli casi incontrati durante lo sviluppo. Una regola costruita attorno a uno scenario specifico rischia di funzionare solo sulle macchine usate nei test, una forma di overfitting del prompt, mentre VulcaTest deve verificare macchine sempre diverse generate da VulcaMind. Per questo ogni nuova istruzione interviene sul comportamento che aveva prodotto l’errore, non sullo scenario in cui si era presentato.

Un esempio riguarda il Planner. Nelle prime versioni il modello separava in fasi distinte operazioni strettamente consecutive. Poiché l’Executor affronta ogni fase con un contesto proprio, all’inizio di una fase poteva trovarsi davanti a un’operazione lasciata incompleta in quella precedente, senza le informazioni necessarie per completarla. Il problema è stato risolto descrivendo nel prompt come l’Executor gestisce il contesto tra una fase e l’altra e chiedendo al Planner di accorpare in un’unica fase le operazioni troppo legate tra loro per essere eseguite separatamente.

I prompt non impongono una sequenza prestabilita di azioni: definiscono vincoli e criteri da rispettare, all’interno dei quali il modello decide come affrontare il compito. Quando il risultato deve essere usato direttamente dal codice, viene richiesto anche un formato di output prestabilito, come i blocchi YAML dell’Attack Plan, i campi di `submit_step_result` e la struttura di `healing_ticket.json`.

## 3.10 Modello locale e configurazione dei parametri

Planner, Executor e Final Evaluator usano un modello eseguito in locale, per i motivi discussi nella Sezione 3.1.1. La fase di healing usa invece una soluzione diversa, descritta nel Capitolo 4. La configurazione è stata definita in base alle operazioni richieste dal workflow e all’hardware disponibile, intervenendo su quantizzazione, finestra di contesto e parametri di inferenza.

### 3.10.1 Scelta del modello locale

Il modello utilizzato è Qwen3.8-27B [@qwenteam2026qwen38] nella variante quantizzata `IQ3_S`, distribuita in formato GGUF[^gguf] nel repository [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) [@istadaslab2026qwen38]. Il checkpoint è ottenuto con il metodo di quantizzazione GSQ [@dadgarnia2026gsq] e con l’ottimizzazione RCO [@helcig2026rco]. La quantizzazione riduce l’occupazione in memoria e permette di eseguire un modello da 27 miliardi di parametri sull’hardware disponibile.

Planner ed Executor vengono eseguiti con un livello di reasoning `medium`, che lascia al modello margine sufficiente per analizzare gli output e scegliere le azioni successive senza aumentare troppo i token generati. Il Final Evaluator, che lavora su risultati già raccolti, usa invece un livello `low`.

### 3.10.2 Configurazione del runtime e gestione del contesto

L’ambiente di sviluppo dispone di una GPU con 16 GB di VRAM e 64 GB di RAM. Eseguire il modello in locale ha richiesto di bilanciare occupazione di memoria, finestra di contesto e velocità di generazione.

Il modello viene eseguito con llama.cpp [@llamacpp] su ROCm [@amdrocm], mentre caricamento e configurazione passano attraverso Unsloth [@unsloth], che espone un’API compatibile con quella di OpenAI. La variante `IQ3_S` usa una quantizzazione a circa 3,5 bit e la KV-cache[^kvcache] è mantenuta a 16 bit. Lo speculative decoding[^specdec] (MTP e N-gram) aumenta la velocità di generazione, un aspetto importante nelle fasi con molti turni di interazione.

Poiché il workflow non usa in alcun modo la visione, la parte multimodale del modello non viene caricata. Il file `mmproj-Qwen3.8-27B-BF16.gguf`, che contiene il vision encoder e il projector, occupa circa 0,9 GB: escluderlo libera memoria che può essere destinata alla KV-cache, e quindi a una finestra di contesto più ampia.

La finestra di contesto dipende dal componente. L’Executor usa una finestra fissa: lavora su contesti contenuti, ma viene invocato molte volte durante il test. Planner e Final Evaluator usano invece un dimensionamento dinamico, perché la quantità di informazioni da elaborare cambia molto da una run all’altra. Tutte queste impostazioni sono gestite da un componente Python dedicato, che le applica prima dell’inferenza senza toccare la logica dei singoli moduli.

Per Planner e Final Evaluator la finestra viene stimata a partire dalla lunghezza dell’input. Il numero di token è approssimato come:

$$
T_{\text{input}} = \left\lfloor \frac{C_{\text{tot}}}{k} \right\rfloor + 1
$$

dove $C_{\text{tot}}$ è il numero di caratteri dell’input e $k$ il rapporto caratteri/token usato per la stima, di default pari a 3. Il valore è volutamente basso e porta a sovrastimare i token: una finestra un po’ più grande del necessario è preferibile a un piano troncato.

A questa stima si aggiunge una riserva $R_{\text{out}}$ per l’output del modello, reasoning compreso, e si applica un margine di sicurezza $\alpha$:

$$
T_{\text{richiesti}} = \left\lfloor (T_{\text{input}} + R_{\text{out}})\cdot\alpha \right\rfloor
$$

Di default $\alpha = 1{,}15$, mentre $R_{\text{out}}$ vale 8192 token per il Planner e 4096 per il Final Evaluator.

La finestra viene poi arrotondata al multiplo successivo di $S = 2048$ token e mantenuta tra un minimo $W_{\text{base}}$ e un massimo $W_{\text{max}}$:

$$
W_{\text{effettiva}} =
\min \left(
\max \left(
W_{\text{base}},
\left\lceil \frac{T_{\text{richiesti}}}{S} \right\rceil \cdot S
\right),
W_{\text{max}}
\right)
$$

$W_{\text{base}}$, di default 15.872 token, evita finestre troppo piccole quando l’input è breve. $W_{\text{max}}$, di default 40.960 token, è il limite imposto dai 16 GB di VRAM e dal costo in memoria della KV-cache.

Se la finestra necessaria supera $W_{\text{max}}$, la condizione viene segnalata. Nel caso del Planner, un piano troncato viene comunque intercettato dal parser e rifiutato prima dell’esecuzione.

[^pty]: Un PTY (_pseudo-terminal_) è una coppia di dispositivi virtuali che emula un terminale reale: i programmi in esecuzione si comportano come se fossero collegati a una tastiera e a uno schermo, e possono quindi essere controllati da un altro processo.

[^gguf]: GGUF è il formato di file usato da llama.cpp per distribuire modelli, anche quantizzati, che raccoglie in un unico file i pesi e i metadati necessari al caricamento.

[^kvcache]: La KV-cache è la memoria in cui il modello conserva le chiavi e i valori del meccanismo di attenzione già calcolati per i token precedenti, così da non doverli ricalcolare a ogni nuovo token. La sua occupazione cresce con la lunghezza del contesto.

[^specdec]: Nello speculative decoding alcuni token vengono proposti in anticipo da un meccanismo più veloce e poi verificati dal modello principale in un unico passaggio; i token corretti vengono accettati, riducendo il tempo di generazione senza modificare l’output. Con MTP (_Multi-Token Prediction_) le proposte provengono da teste aggiuntive del modello che predicono più token futuri; con N-gram vengono ricavate da sequenze di token già presenti nel contesto.
