# 3 Architettura e implementazione di VulcaTest

VulcaTest verifica la conformità di una macchina attraverso un penetration test agentico, in cui l'esito di ogni passaggio viene associato alle evidenze raccolte sul target. Questo capitolo ne descrive l'architettura, a partire dai limiti che hanno portato a non utilizzare un harness general-purpose.

## 3.1 Requisiti e limiti delle soluzioni generiche

Una prima sperimentazione è stata condotta con Google Antigravity [11] e il modello Gemini 3.8 Flash con reasoning High, configurato con un system prompt dedicato e collegato ai tool necessari tramite il protocollo MCP. Lo scopo era capire se un modello proprietario, dotato di tool e istruzioni adeguate, fosse sufficiente a condurre in autonomia il penetration test. Questa prima sperimentazione ha portato a considerare due criticità legate all'utilizzo di modelli proprietari erogati come servizio:

- **Guardrail:** alcune operazioni tipiche del penetration testing, anche se eseguite in un ambiente didattico controllato, possono essere bloccate dai filtri di sicurezza del provider e interrompere il test.
- **Costo:** lo sviluppo e la valutazione del sistema richiedono molte esecuzioni complete, ciascuna composta da numerosi turni e chiamate ai tool, e con un modello commerciale il costo cresce con il numero e la durata dei test.

Per questi motivi, Planner, Executor e Final Evaluator utilizzano un modello eseguito in locale, evitando la dipendenza dai filtri di sicurezza di un provider esterno e i costi variabili associati alle chiamate API (Sezione 3.10).

Anche eliminando i limiti legati al modello, resta un problema di adeguatezza architetturale. Gli harness general-purpose, come quello utilizzato nelle prove preliminari, sono progettati per gestire attività eterogenee lasciando all'agente una certa autonomia operativa. La verifica di conformità richiede invece un controllo puntuale del percorso di attacco e delle condizioni di avanzamento. Adattare uno strumento generico a questo compito può quindi introdurre complessità aggiuntiva per imporre vincoli e meccanismi di coordinamento che un'architettura dedicata gestisce direttamente. Durante le prove con Antigravity sono emerse tre criticità:

1. **Eccessiva libertà operativa:** l'agente tende a privilegiare il raggiungimento dell'obiettivo rispetto all'aderenza all'intended path. Sono stati osservati tentativi di usare canali esterni alla challenge, come l'accesso diretto al demone Docker dell'host o l'ispezione del filesystem sottostante, e in questi casi il test dimostra soltanto che la macchina è compromettibile, non che lo sia attraverso le sole vulnerabilità didattiche previste.
2. **Auto-certificazione del risultato:** lo stesso agente che esegue un'azione dell'attacco ne valuta anche l'esito, e un passaggio può così essere considerato completato sulla base di una deduzione o di un output parziale, senza una prova esplicita per ogni condizione richiesta. Nel conformance testing questo può portare ad accettare macchine in cui uno dei passaggi in realtà non funziona.
3. **Controllo limitato e scarsa personalizzazione del workflow:** gli harness general-purpose sono progettati per gestire autonomamente il ciclo agentico, senza offrire necessariamente un controllo granulare sulle singole fasi. Nelle prove con Antigravity è risultato difficile imporre una sequenza di step con condizioni esplicite di avanzamento e arresto, gestire dinamicamente i tool disponibili e raccogliere in modo strutturato le informazioni necessarie alla valutazione. Un orchestratore sviluppato appositamente consente invece di definire queste operazioni attraverso una logica deterministica, mantenendo il controllo sull'intero processo di verifica.

Un caso concreto è emerso durante il test di Pizzeria_B2R, una delle macchine generate dalla pipeline. Il percorso previsto richiedeva di scoprire un endpoint nascosto attraverso una chat di assistenza. A causa di un difetto di generazione, tuttavia, la chat non funzionava, mentre il collegamento all'endpoint era rimasto visibile nel codice HTML della pagina. L'agente ha seguito il collegamento diretto, ha proseguito fino a ottenere una shell e ha considerato il test superato: la macchina risultava compromettibile ma non conforme, perché uno dei passaggi del percorso didattico non funzionava.

Questo caso mostra che risolvere una challenge non equivale a verificarne la conformità, ed è da qui che nasce VulcaTest: un'architettura in cui l'agente opera entro un perimetro controllato e l'esito del test dipende dagli esiti della checklist associati alle evidenze raccolte durante l'esecuzione, non dalla sola dichiarazione di successo del modello.

## 3.2 Principi di progettazione del sistema

La progettazione di VulcaTest si basa su cinque principi che guidano le scelte architetturali e definiscono i vincoli che il framework deve rispettare.

1. **Deterministico quando possibile, probabilistico quando necessario:** non tutte le operazioni del workflow richiedono un modello generativo, e ciò che può essere espresso con regole precise viene affidato a codice deterministico. Il modello interviene solo dove servono interpretazione, adattamento al contesto o la scelta tra più azioni possibili.
2. **Esecuzione basata su evidenze:** l'esito di uno step non deve dipendere soltanto dal giudizio della componente che lo ha eseguito. Ogni risultato deve essere accompagnato dalle evidenze raccolte sul target, in modo da poter ricostruire cosa è stato fatto e su quali elementi si basa la valutazione.
3. **Separazione delle responsabilità:** pianificazione, coordinamento, esecuzione e valutazione sono assegnate a componenti distinte, ciascuna con un ruolo e compiti definiti, secondo l'impostazione role-based discussa nella Sezione 2.4.
4. **Modularità:** le componenti devono restare il più possibile indipendenti tra loro, in modo che si possano cambiare modello, parametri di inferenza o backend senza modificare la struttura del workflow, e aggiungere nuovi tool senza toccare le parti che non li usano.
5. **Pianificazione globale, ReAct nell'esecuzione:** il sistema lavora su due livelli. A livello globale segue un approccio Plan-and-Execute (Sezione 2.4), in cui il percorso viene definito prima dell'esecuzione e non cambia durante il test, perché quello da verificare è uno solo: il percorso progettato dall'autore. All'interno di ogni step l'esecuzione segue invece un ciclo ReAct, in cui l'azione successiva viene decisa in base agli output osservati sul target, senza modificare gli obiettivi e i vincoli definiti dal piano.

## 3.3 Architettura generale e flusso di coordinamento

VulcaTest è composto da quattro componenti principali: Planner, Orchestrator, Executor e Final Evaluator. A queste si affiancano il Bridge, che gestisce l'accesso ai tool, e il nodo di healing, descritto nel Capitolo 4. Il Planner opera prima dell'avvio del workflow di esecuzione, mentre l'Orchestrator coordina le componenti coinvolte nel test e nell'eventuale correzione.

Il workflow di VulcaTest segue una sequenza di operazioni definita. Il Planner legge la documentazione della challenge e genera l'Attack Plan, cioè la sequenza di step da verificare. L'Executor esegue poi uno step alla volta: per ciascuno, un LLM sceglie le azioni da compiere, che vengono eseguite attraverso il Bridge sui tool di una macchina Kali dedicata. La Kali fornisce la postazione di attacco, mentre la macchina target da verificare è raggiunta attraverso il proprio indirizzo IP.

Al termine del piano, oppure al primo step fallito, il Final Evaluator analizza i risultati raccolti e produce la valutazione finale della run. In caso di fallimento, il controllo può passare al nodo di healing per un'ulteriore verifica e un'eventuale correzione. L'avanzamento tra queste fasi è coordinato dall'Orchestrator, che decide quale componente eseguire e quando passare alla successiva, senza lasciare questa scelta all'LLM (Figura 2).

Facendo riferimento al modello CoALA (Sezione 2.4), VulcaTest può essere descritto come un agente modulare, in cui funzioni diverse sono affidate a componenti specializzate e coordinate all'interno di un unico flusso di esecuzione. Le componenti condividono una *working memory* che raccoglie le informazioni necessarie al compito corrente e viene aggiornata durante l'interazione con l'ambiente. In VulcaTest questo ruolo è svolto da `VulcaTestState`, la struttura dati che mantiene lo stato della run e che viene letta e aggiornata dalle diverse componenti.

Lo scambio delle informazioni necessarie al coordinamento del workflow avviene attraverso strutture dati tipizzate[^pydantic], che il codice può validare prima di passarle alla fase successiva: ogni step del piano è rappresentato da un oggetto `TestStep` e il suo esito da uno `StepResult`. In questo modo ogni componente trova le informazioni di cui ha bisogno senza doverle ricostruire dal testo generato dall'LLM.

VulcaTest può essere avviato in due modalità:

- **Execution Mode:** se è già disponibile un Attack Plan generato e validato (`ATTACK_PLAN.md`), la pianificazione viene saltata e il test parte direttamente dall'esecuzione.
- **Planning & Execution Mode:** se il piano non esiste, o se ne viene richiesta la rigenerazione, viene eseguito prima il Planner, e il piano prodotto viene validato e poi passato allo stesso flusso di esecuzione.

![[Pasted image 20261002152624.png|380]]
**Figura 2 — Architettura e flusso di coordinamento di VulcaTest:** transizioni tra i nodi del grafo gestite dall'Orchestrator. Il Planner è eseguito prima dell'ingresso nel grafo LangGraph.

<!-- Inserire qui la figura originale 2 dal documento LaTeX/PDF. -->

## 3.4 Il Planner: generazione e formalizzazione dell'Attack Plan

Il Planner trasforma la documentazione della challenge in un Attack Plan (`ATTACK_PLAN.md`), articolato in step che definiscono gli obiettivi da raggiungere e le condizioni da verificare prima di proseguire.

Il Planner riceve tre documenti: `DESCRIPTION.md`, scritto dall'utente, e `STORYLINE.md` e `WRITEUP.md`, generati da VulcaMind. Poiché hanno ruoli diversi, i tre documenti possono contenere informazioni non del tutto allineate, e per evitare che sia il modello a risolvere i conflitti in modo arbitrario il prompt stabilisce un ordine di priorità:

- `STORYLINE.md` definisce il percorso previsto e l'ordine degli step.
- `WRITEUP.md` fornisce i dettagli tecnici per eseguirli.
- `DESCRIPTION.md` contiene le informazioni generali sulla challenge.

In caso di conflitto il Planner mantiene il percorso della Storyline, usa il Writeup come riferimento tecnico e non introduce passaggi assenti dai documenti. Anche porte, credenziali, percorsi e altri parametri relativi alla challenge devono provenire dalla documentazione, senza essere inventati dal Planner. Quando un valore non è ancora disponibile, il Planner utilizza un placeholder esplicito, come `<TARGET_IP>`, che l'Executor interpreta durante l'esecuzione sulla base delle informazioni ricevute nel proprio contesto.

La generazione dell'Attack Plan si articola in due fasi:

- **Fase 1:** un LLM legge i documenti della challenge e genera `ATTACK_PLAN.md`, un documento Markdown in cui le informazioni strutturate (liste, parametri, comandi) sono racchiuse in blocchi YAML. Il formato YAML è stato preferito al JSON per la sintassi generalmente più compatta e leggibile, che semplifica la rappresentazione di parametri e comandi.
- **Fase 2:** un parser in Python converte ogni step in un oggetto `TestStep`, una rappresentazione strutturata utilizzata dal resto del workflow. Il parser verifica che gli step rispettino il formato richiesto e rifiuta quelli non validi prima dell'avvio del test. Questa validazione riguarda la struttura del piano, non la correttezza dei passaggi generati rispetto alla documentazione della challenge.

Ogni `TestStep` contiene un identificativo, l'obiettivo, i tool consentiti, i valori da produrre e una checklist che definisce le condizioni necessarie per completare lo step. La costruzione della checklist segue alcune regole precise, definite nel system prompt del Planner:

- **Tutti i requisiti sono obbligatori:** le voci della checklist sono in AND e non possono essere marcate come opzionali. Un controllo che non è un requisito rigido dello step va rimosso o spostato nello step in cui lo diventa.
- **Il meccanismo di scoperta previsto va verificato:** se una risorsa deve essere ottenuta attraverso uno specifico passaggio, la checklist richiede di verificare quel passaggio, e raggiungere la stessa risorsa con una scorciatoia non è sufficiente.
- **Ogni controllo si basa su un risultato osservabile:** deve trattarsi di un output concreto, come una risposta HTTP, una porta aperta, un file presente o un valore estratto, ottenibile con i privilegi disponibili in quello step.
- **Anche un fallimento può essere il comportamento atteso:** se uno step prevede intenzionalmente un errore o un rifiuto, la checklist verifica che quel comportamento si presenti, invece di richiedere l'esito positivo del comando.

## 3.5 L'Orchestrator: controllo del workflow e gestione dello stato

L'Orchestrator coordina l'avanzamento del workflow di VulcaTest, compresa la fase di healing. Non si tratta di un singolo modulo, ma dell'insieme delle regole che determinano quali componenti eseguire, in quale ordine e quando il test deve proseguire o terminare. L'Orchestrator non decide come completare uno step, ma soltanto cosa deve succedere dopo.

Questa logica è implementata con LangGraph [16], che rappresenta il workflow come un grafo a stati: i nodi sono `orchestrator`, `executor`, `final_evaluator` e `healer` (Figura 2), mentre gli archi rappresentano le transizioni tra i nodi, regolate da condizioni valutate interamente dal codice.

I nodi condividono le informazioni della run attraverso `VulcaTestState` (Sezione 3.3): LangGraph passa lo stato a ogni nodo, che al termine della propria esecuzione restituisce gli aggiornamenti prodotti. `VulcaTestState` contiene la sequenza dei `TestStep`, l'indice dello step corrente, lo stato generale della run, i risultati degli step già eseguiti, i valori verificati e i riferimenti alle sessioni terminali attive, oltre alle metriche usate per i report finali.

Il grafo contiene un nodo chiamato anch'esso `orchestrator`, da non confondere con l'Orchestrator nel suo insieme. Questo nodo svolge una funzione di smistamento: seleziona il `TestStep` corrente e, se il piano è terminato, passa il controllo al Final Evaluator. In caso contrario, avvia l'Executor.

Al termine dello step, l'Executor ne registra il risultato nello stato condiviso. Se lo step ha successo, il controllo torna al nodo `orchestrator`, che seleziona quello successivo. Se invece fallisce, il test si interrompe secondo una logica *fail-fast* e il controllo passa direttamente al Final Evaluator.

Dopo la valutazione finale, una run completata termina. In caso di fallimento, se il self-healing è abilitato e restano tentativi di correzione disponibili, il controllo passa al nodo `healer`. Se la correzione produce una patch valida e la macchina viene ricostruita correttamente, il test riparte dall'inizio.

## 3.6 L'Executor: esecuzione e verifica degli step

L'esecuzione di ogni `TestStep` coinvolge due elementi con ruoli distinti:

- **Executor:** la componente in Python, che corrisponde al nodo `executor` del grafo. Per ogni step prepara il contesto, mette a disposizione i tool consentiti, applica i vincoli dello step, gestisce il budget di turni e raccoglie il risultato.
- **Agente:** l'LLM invocato dall'Executor, che decide di volta in volta quale azione eseguire sul target.

L'interazione tra i due segue un ciclo ReAct (Sezione 2.4): a ogni turno l'agente ragiona sullo stato corrente e sceglie un'azione sotto forma di chiamata a un tool, che l'Executor inoltra al Bridge, e in base al risultato restituito decide come proseguire. Il comportamento dell'agente è regolato da un system prompt dedicato, il cui scopo è verificare il percorso previsto senza aggirare le eventuali anomalie della macchina. Le regole principali sono:

1. **Interazione esclusivamente in-band:** con il target si interagisce solo attraverso i servizi e i canali esposti dalla challenge, e l'host di virtualizzazione non può essere usato per ispezionare, modificare o riavviare la macchina.
2. **Rispetto dell'intended path:** tutti i requisiti della checklist vanno soddisfatti e un passaggio previsto non può essere sostituito da una scorciatoia equivalente.
3. **Verifica tramite evidenze:** ogni voce della checklist deve essere associata a un risultato osservato durante l'esecuzione.
4. **Evidenze per i fallimenti:** uno step fallito deve essere motivato con un riscontro concreto, come un messaggio di errore o l'esito di un controllo. L'assenza di un segnale atteso non è sufficiente per dichiarare il fallimento senza prima effettuare una verifica mirata.
5. **Gestione delle sessioni e del terminale:** la shell locale della macchina Kali va distinta dalle sessioni aperte sul target. Prompt di autenticazione e sessioni persistenti vanno gestiti senza chiuderli per errore e, dopo l'uso di applicazioni interattive, il terminale va riportato a uno stato utilizzabile.

Ogni step viene eseguito con un numero limitato di turni, per evitare che l'agente ripeta all'infinito tentativi simili. Un limite fisso, però, rischierebbe di interrompere gli step che richiedono più interazioni, e per questo l'Executor assegna un budget iniziale, estendibile tramite il tool `request_turn_extension` fino a un tetto massimo per step. I due valori sono configurabili e di default sono impostati a 8 e 20 turni. Quando mancano due turni alla fine del budget, e di nuovo all'ultimo turno, l'agente riceve un avviso con i turni rimanenti e può chiedere un'estensione, se ancora disponibile, oppure chiudere lo step.

Lo step si chiude con la chiamata al tool `submit_step_result`, con cui l'agente dichiara l'esito dello step (`status`) e ne riporta i dettagli. I campi vengono validati dall'Executor e raccolti in un oggetto tipizzato `StepResult`, che registra l'identificativo dello step, l'esito, una sintesi delle operazioni svolte, i valori estratti, i turni usati, le chiamate ai tool e la valutazione della checklist, con l'esito e l'evidenza di ogni voce.

L'esito dichiarato dall'agente viene sottoposto a un controllo deterministico di coerenza con la checklist. Uno step può essere considerato completato soltanto se tutte le condizioni risultano soddisfatte. In caso contrario, un eventuale esito `COMPLETED` viene corretto in `FAILED`. Un fallimento dichiarato dall'agente viene invece mantenuto anche quando tutte le condizioni risultano soddisfatte, lasciando la valutazione dell'anomalia al Final Evaluator. Il controllo riguarda la coerenza strutturale degli esiti, non la validità semantica delle evidenze fornite dall'agente. Queste restano associate al risultato per essere interpretate successivamente dal Final Evaluator.

I valori estratti dall'agente durante uno step, come username, password o token, vengono inizialmente raccolti in `extracted_values`. Quando tutte le condizioni della checklist risultano soddisfatte, secondo gli esiti dichiarati dall'agente, vengono trasferiti in `verified_values` e resi disponibili agli step successivi. All'inizio di ogni step l'agente riceve l'elenco di questi valori: quelli brevi sono mostrati direttamente, mentre per quelli più lunghi, come una chiave privata o un output su più righe, compare solo il nome. Il contenuto si recupera con `get_verified_value` e l'elenco può essere richiesto di nuovo con `show_verified_values`, così i dati già raccolti non vengono reinseriti per intero a ogni step. Questo meccanismo riduce l'occupazione della finestra di contesto dell'agente, un aspetto ripreso nella Sezione 3.10.

## 3.7 Il Bridge di esecuzione: gestione dei tool e delle interazioni con il target

Le azioni scelte dall'agente vengono eseguite attraverso il Bridge, un modulo Python sviluppato per VulcaTest che permette all'Executor di accedere ai tool installati sulla macchina Kali. Il Bridge non è un nodo del grafo, ma astrae le differenze tra i backend: una richiesta può essere inoltrata a un tool stateless esposto da HexStrike [14] oppure a una sessione terminale persistente gestita dal Terminal Gateway. Grazie a questa separazione, nuovi tool o backend possono essere aggiunti senza modificare l'Executor.

Non tutti i tool richiedono lo stesso tipo di interazione. Scansioni ed enumerazioni possono essere eseguite come chiamate indipendenti, mentre alcune operazioni, come l'accesso a shell remote o l'interazione con programmi che richiedono input successivi, necessitano di mantenere una sessione attiva tra più turni. Poiché i tool stateless esposti da HexStrike non permettono di gestire queste interazioni persistenti, è stato sviluppato appositamente per VulcaTest un Terminal Gateway basato su sessioni PTY. Il Bridge supporta quindi due modalità di esecuzione (Figura 3):

- **Tool stateless:** il Bridge si appoggia a HexStrike per strumenti come `nmap` o `hydra`, inoltra la richiesta al server in esecuzione sulla macchina Kali e restituisce il risultato.
- **Sessioni persistenti:** il Bridge utilizza il Terminal Gateway, che mantiene sessioni PTY[^pty] tramite il modulo Python Pexpect [20]. Le chiamate successive al tool `interactive_terminal_exec` proseguono sulla stessa shell, e ogni sessione è identificata da un `session_name`, così da poter mantenere più terminali aperti contemporaneamente.

![[Pasted image 20261002152954.png]]
**Figura 3 — Architettura del Bridge di esecuzione:** disaccoppiamento tra tool stateless (HexStrike) e sessioni PTY persistenti (Terminal Gateway).

<!-- Inserire qui la figura originale 3 dal documento LaTeX/PDF. -->

Il Bridge elabora gli output dei tool prima di restituirli all'agente. Per le sessioni PTY, il Terminal Gateway raccoglie l'output prodotto durante ciascuna interazione attraverso letture successive, fino a quando il flusso rimane inattivo per un breve intervallo o viene raggiunto il timeout. I dati raccolti vengono concatenati e ripuliti dalle sequenze di controllo ANSI/VT100, normalizzando i caratteri di fine riga. L'output testuale così ottenuto viene restituito all'agente come risultato del tool, permettendogli di scegliere l'azione successiva in base a quanto osservato.

Il Terminal Gateway riconosce inoltre alcune richieste interattive attraverso pattern presenti nell'output, come i prompt di password o passphrase, e ne segnala la presenza all'agente insieme al risultato del comando. Inoltre, le descrizioni dei tool vengono aggiornate in base alle sessioni aperte: a ogni `session_name` è associata l'ultima riga prodotta dal terminale, così l'agente può riconoscere le sessioni attive e disporre di un'indicazione sul loro stato, scegliendo tra una sessione persistente e un tool stateless.

Due meccanismi limitano l'occupazione della finestra di contesto. Gli output molto lunghi vengono troncati oltre una soglia prestabilita, con l'indicazione che l'originale era più lungo. Inoltre, il Bridge espone all'agente soltanto i tool indicati negli `allowed_tools` del `TestStep`, oltre ad alcuni strumenti sempre disponibili per la gestione del terminale (*tool-slicing*). Il filtraggio evita di includere nel contesto le descrizioni degli oltre 150 tool disponibili, riducendo il numero di token utilizzati. Se il Planner indica `*`, vengono resi disponibili tutti i tool.

Le sessioni PTY supportano anche applicazioni interattive come `nano`, `vi` o `vim`, che richiedono interazioni da tastiera diverse dall'esecuzione di normali comandi. Per gestirle, il Terminal Gateway utilizza una mappatura di tasti e combinazioni, rappresentati attraverso identificatori testuali come `enter`, `esc` e `ctrl+x`. Questi vengono tradotti nelle corrispondenti sequenze di controllo e inviati alla sessione PTY, senza richiedere all'agente di conoscerne la codifica. Il parametro `commands` permette inoltre di inviare più input in sequenza.

## 3.8 Il Final Evaluator: valutazione finale e Root Cause Analysis

Il Final Evaluator interviene al termine dell'Attack Plan oppure quando un fallimento interrompe il test. A partire dallo stato della run e dai risultati degli step, produce gli artefatti conclusivi della verifica. La valutazione si articola in due fasi: una prima elaborazione deterministica dei dati della run, seguita dall'interpretazione delle evidenze affidata a un LLM.

- **Fase 1:** un modulo Python ricava da `VulcaTestState`, dagli `StepResult` e dai record delle chiamate ai tool le metriche della run: lo stato finale, l'avanzamento del test, i tempi di esecuzione, il numero di chiamate ai tool e i token consumati da ciascuna componente. Questi dati vengono salvati in `run_summary.json`, insieme ai valori verificati e ai risultati dei singoli step, e possono essere elaborati in seguito senza dipendere dalla valutazione dell'LLM, come avviene nella valutazione sperimentale del Capitolo 5.
- **Fase 2:** la diagnosi del fallimento e la Root Cause Analysis sono affidate a un LLM, che interpreta le evidenze senza modificare l'esito della run. L'LLM riceve l'Attack Plan, gli `StepResult` e gli output rilevanti e produce `REPORT.md`, che riassume lo svolgimento del test e, in caso di fallimento, ne analizza la possibile causa.

Se uno step termina con esito `FAILED`, la seconda fase genera anche `healing_ticket.json`, che riporta lo step in cui il test si è interrotto e una diagnosi preliminare del problema, comprendente la componente coinvolta, la possibile causa e il tipo di difetto. I tipi previsti sono tre: difetti nella generazione dell'IaC (`IAC_GENERATION_DEFECT`), errori di configurazione (`CONFIG_DEFECT`) ed errori nella specifica del test, cioè criteri di verifica dell'Attack Plan formulati in modo errato (`SPECIFICATION_DEFECT`).

La classificazione resta un'ipotesi, poiché il Final Evaluator dispone soltanto delle evidenze raccolte dall'Executor dall'esterno della macchina. Se il self-healing è abilitato e restano tentativi disponibili, il ticket viene passato al nodo di healing indipendentemente dal tipo di difetto diagnosticato, affinché l'agente possa esaminare i sorgenti e verificare la possibile causa del problema (Capitolo 4). Se il difetto riguarda effettivamente la specifica del test, la macchina non viene modificata e la correzione dell'Attack Plan resta affidata a un operatore.

## 3.9 Prompt engineering e sviluppo iterativo delle istruzioni

Ogni componente di VulcaTest che usa un LLM è guidata da un system prompt specifico, scritto in funzione del ruolo che svolge nel workflow.

I prompt sono stati sviluppati iterativamente, osservando il comportamento degli agenti durante le prove preliminari e modificando le istruzioni in risposta alle criticità riscontrate. Tra queste sono emerse dichiarazioni di successo premature, tentativi di aggirare il percorso previsto e difficoltà nella gestione delle sessioni interattive. Queste osservazioni hanno portato a introdurre vincoli progressivamente più precisi.

Nella revisione si è cercato di evitare che i prompt diventassero troppo specifici rispetto agli scenari utilizzati durante lo sviluppo. Una regola costruita attorno a un singolo caso rischia infatti di funzionare soltanto sulle macchine già incontrate, riducendo la capacità di generalizzazione delle istruzioni. Per questo le nuove regole sono state formulate per correggere il comportamento problematico, senza dipendere dalle caratteristiche della challenge in cui era stato osservato.

Un esempio riguarda il Planner. Nelle prime versioni separava in step distinti operazioni strettamente consecutive. Poiché l'Executor affronta ogni step con un contesto proprio, all'inizio di uno step poteva trovarsi davanti a un'operazione lasciata incompleta da quella precedente, senza avere le informazioni necessarie per completarla. Per affrontare il problema, il prompt è stato modificato descrivendo come l'Executor gestisce il contesto tra uno step e l'altro e chiedendo al Planner di accorpare in un unico step le operazioni troppo legate tra loro per essere eseguite separatamente.

I prompt non prescrivono ogni singola azione da eseguire, ma definiscono vincoli e criteri entro i quali l'LLM può scegliere come svolgere il proprio compito. Quando il risultato deve essere usato direttamente dal codice, viene richiesto anche un formato di output prestabilito, come i blocchi YAML dell'Attack Plan, i campi di `submit_step_result` e la struttura di `healing_ticket.json`.

## 3.10 Modello locale e configurazione dei parametri

Per Planner, Executor e Final Evaluator è stato scelto un modello eseguito in locale, così da ridurre i costi e non dipendere dai filtri di sicurezza di un provider esterno (Sezione 3.1). La configurazione è stata adattata alle esigenze del workflow e all'hardware disponibile, intervenendo su quantizzazione, finestra di contesto e parametri di inferenza. La fase di healing usa invece una soluzione diversa, descritta nel Capitolo 4.

### 3.10.1 Modello e runtime

Il modello scelto è Qwen3.8-27B [21] nella variante quantizzata IQ3_S, distribuita in formato GGUF[^gguf] nel repository `ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF` [22]. Il checkpoint è ottenuto con il metodo di quantizzazione GSQ [23] e con l'ottimizzazione RCO [24]. La quantizzazione riduce l'occupazione in memoria e permette di eseguire un modello da 27 miliardi di parametri sull'hardware disponibile.

Planner ed Executor utilizzano un livello di reasoning *medium*, scelto per bilanciare la capacità di elaborazione delle informazioni e il numero di token generati. Il Final Evaluator, che interpreta risultati già raccolti, utilizza invece un livello *low*.

L'ambiente di sviluppo dispone di una GPU con 16 GB di VRAM e 64 GB di RAM. Il modello viene eseguito con llama.cpp [17] su ROCm [25], mentre caricamento e configurazione avvengono mediante Unsloth [18], che espone un'API compatibile con quella di OpenAI. La variante IQ3_S usa una quantizzazione a circa 3,5 bit e la KV-cache[^kvcache] è mantenuta a 16 bit. Lo speculative decoding[^specdec] (MTP e N-gram) viene utilizzato per accelerare la generazione, particolarmente importante negli step che richiedono numerosi turni di interazione.

Poiché il workflow non utilizza funzionalità di visione, la componente multimodale del modello non viene caricata. Il file `mmproj-Qwen3.8-27B-BF16.gguf`, che contiene il vision encoder e il projector, occupa circa 0,9 GB su disco. La sua esclusione evita di caricare componenti non necessari, contribuendo a contenere l'occupazione di memoria.

### 3.10.2 Dimensionamento della finestra di contesto

La finestra di contesto viene dimensionata in modo diverso a seconda della componente. L'Executor usa una finestra fissa, perché lavora su contesti contenuti, grazie anche ai meccanismi descritti nelle Sezioni 3.6 e 3.7, ma viene invocato molte volte durante il test. Planner e Final Evaluator usano invece un dimensionamento dinamico, perché la quantità di informazioni da elaborare cambia molto da una run all'altra. Tutte queste impostazioni sono gestite da una componente Python dedicata, che le applica prima dell'inferenza senza toccare la logica dei singoli moduli.

Per Planner e Final Evaluator la finestra viene stimata a partire dalla lunghezza dell'input. Il numero di token è approssimato come:

$$
T_{\text{input}} = \left\lfloor \frac{C_{\text{tot}}}{c_{\text{tok}}} \right\rfloor + 1
$$

dove $C_{\text{tot}}$ è il numero di caratteri dell'input e $c_{\text{tok}}$ è il rapporto caratteri/token utilizzato per la stima. Il valore di $c_{\text{tok}}$ è scelto volutamente basso, così da sovrastimare il numero di token: una finestra un po' più grande del necessario è preferibile a un piano troncato.

A questa stima si aggiunge una riserva $R_{\text{out}}$ per l'output del modello, compresi i token di reasoning, e si applica un margine di sicurezza $\alpha$:

$$
T_{\text{richiesti}} = \left\lfloor (T_{\text{input}} + R_{\text{out}}) \cdot \alpha \right\rfloor
$$

La riserva $R_{\text{out}}$ è più ampia per il Planner che per il Final Evaluator. La finestra viene poi arrotondata al multiplo successivo di un passo $S$ e mantenuta tra un minimo $W_{\text{base}}$ e un massimo $W_{\text{max}}$:

$$
W_{\text{effettiva}} = \min\!\left(W_{\text{max}},\; \max\!\left(W_{\text{base}},\; S\left\lceil\frac{T_{\text{richiesti}}}{S}\right\rceil\right)\right)
$$

$W_{\text{base}}$ evita finestre troppo piccole quando l'input è breve, mentre $W_{\text{max}}$ rappresenta il limite superiore imposto dalla memoria disponibile per la KV-cache.

Se la finestra stimata supera $W_{\text{max}}$, il sistema segnala la condizione con un avviso e procede comunque con la finestra massima.

---

[^pydantic]: Le strutture dati di VulcaTest, come `TestStep` e `StepResult`, sono definite con Pydantic [19], una libreria Python che valida automaticamente i dati rispetto ai tipi dichiarati.

[^pty]: Un PTY (*pseudo-terminal*) è una coppia di dispositivi virtuali che emula un terminale reale: i programmi in esecuzione si comportano come se fossero collegati a una tastiera e a uno schermo, e possono quindi essere controllati da un altro processo.

[^gguf]: GGUF è il formato di file usato da llama.cpp per distribuire modelli, anche quantizzati, che raccoglie in un unico file i pesi e i metadati necessari al caricamento.

[^kvcache]: La KV-cache è la memoria in cui il modello conserva le chiavi e i valori del meccanismo di attenzione già calcolati per i token precedenti, così da non doverli ricalcolare a ogni nuovo token. La sua occupazione cresce con la lunghezza del contesto.

[^specdec]: Nello speculative decoding alcuni token vengono proposti in anticipo da un meccanismo più veloce e poi verificati dal modello principale in un unico passaggio. I token corretti vengono accettati, riducendo il tempo di generazione senza modificare l'output. Con MTP (*Multi-Token Prediction*) le proposte provengono da teste aggiuntive del modello che predicono più token futuri, mentre con N-gram vengono ricavate da sequenze di token già presenti nel contesto.
