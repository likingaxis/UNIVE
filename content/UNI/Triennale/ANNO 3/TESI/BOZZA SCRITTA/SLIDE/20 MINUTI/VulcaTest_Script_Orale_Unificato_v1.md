# VulcaTest — Script orale unificato della discussione

**Tesi:** *VulcaTest: Un Framework agentico per la verifica di conformità e il self-healing di scenari Cyber Range*  
**Versione:** bozza narrativa integrale v1 — 13 ottobre 2026  
**Destinazione:** discussione di laurea triennale in Informatica; versione ampia **non ancora ridotta** ai 20 minuti.

> **Come leggere il documento.** I paragrafi senza marcature costituiscono **il testo da pronunciare**, ancora aperto a revisioni di ritmo e stile. I titoli sono riferimenti editoriali e non devono essere pronunciati. Le parti in citazione contrassegnate **[NOTA VISIVA — NON LEGGERE]** o **[NOTA EDITORIALE — NON LEGGERE]** registrano esclusivamente idee e cautele per la progettazione successiva: **non sono una divisione definitiva in slide**. I **[TODO]** segnalano verifiche o scelte rimaste aperte. Prima consolidiamo il discorso, poi produrremo separatamente lo script slide-per-slide e infine le indicazioni visuali per ciascuna slide.
>
> **Criteri di accuratezza.** VulcAIn, HexStrike e Google Antigravity sono componenti preesistenti; la progettazione e implementazione di VulcaTest e dei suoi componenti originali costituiscono il contributo della tesi. I dati sperimentali qui riportati corrispondono al benchmark principale, non alla valutazione supplementare. La Pizzeria storica dell'introduzione non coincide con la perturbazione Pizzeria P1-01 del benchmark.

---

# Blocco 1 — Introduzione: dal problema a VulcaTest

## 1.1 — Cyber Range e macchine Boot-to-Root

Buongiorno a tutti, sono Luca Gugliotta e oggi vi presento il mio progetto di tesi: **VulcaTest**, un framework agentico per la verifica di conformità e il self-healing di scenari Cyber Range.

Partirei proprio dall'ultimo elemento del titolo: che cosa intendiamo per *Cyber Range*? Si tratta di ambienti informatici controllati, progettati per simulare scenari di cybersecurity e permettere ad altre persone di esercitarsi. Possono essere utilizzati in contesti didattici, ma anche per l'addestramento e la formazione professionale.

Un esempio concreto è rappresentato dalle macchine *Boot-to-Root*: computer o ambienti virtualizzati volutamente vulnerabili, predisposti affinché un partecipante possa affrontarli come una sfida pratica. Da una parte abbiamo chi progetta la macchina e decide quali problemi inserirvi; dall'altra chi affronta l'esercitazione, osserva i servizi esposti, individua vulnerabilità e cerca di sfruttarle fino a ottenere i privilegi più elevati del sistema, quelli dell'utente *root*.

> **[NOTA VISIVA — NON LEGGERE]** Titolo della tesi come apertura; possibile evidenziazione della parola «Cyber Range». Rappresentare il rapporto fra progettista, macchina vulnerabile e partecipante, senza aggiungere necessariamente un'illustrazione distinta per ogni soggetto. Piccola icona o rappresentazione Boot-to-Root. Pochissime parole sulla slide.

## 1.2 — L'intended path come percorso formativo

Ma l'obiettivo non è soltanto ottenere root. Quando progetta una challenge, l'autore può stabilire un percorso didattico preciso, costituito da passaggi attraverso i quali il partecipante dovrebbe acquisire una o più competenze. Per esempio, potrebbe dover effettuare una fase di enumerazione, individuare un servizio vulnerabile, recuperare delle credenziali e infine sfruttare una configurazione errata per elevare i privilegi.

Questo percorso progettato prende il nome di **intended path**. I suoi passaggi non sono semplicemente una lista di comandi: corrispondono a obiettivi formativi che la challenge dovrebbe permettere di raggiungere. Per questo è importante che il partecipante possa arrivare ai privilegi di root **seguendo il percorso previsto**, non soltanto attraverso una strada qualunque.

> **[NOTA VISIVA — NON LEGGERE]** Far evolvere la figura della Boot-to-Root in un percorso o in una checklist di obiettivi: «Enumerazione → Sfruttamento → Privilege escalation → Root». È un esempio concettuale, non un Attack Plan autentico. L'idea «percorso formativo, non soltanto risultato finale» deve emergere dalla combinazione di immagine e parlato, senza aggiungere una digressione astratta.

## 1.3 — Il processo di realizzazione e VulcAIn

Realizzare queste macchine, però, richiede diverse attività. Bisogna ideare il percorso, progettare le vulnerabilità e i servizi, implementare e configurare la macchina, distribuirla nell'ambiente di esercitazione e infine verificare che tutto si comporti come previsto. È un processo che può richiedere parecchio tempo, soprattutto nelle fasi più ripetitive di implementazione e configurazione.

Per ridurre questo lavoro esiste **VulcAIn**, un progetto preesistente che utilizza componenti basati sull'intelligenza artificiale per automatizzare buona parte della realizzazione delle challenge. Partendo da una descrizione iniziale, **VulcaMind** prepara i contenuti e la documentazione della sfida; **VulcaForge** traduce questa progettazione negli artefatti necessari a costruire la macchina; **VulcaShip** si occupa della distribuzione nell'ambiente previsto.

L'obiettivo è consentire a chi progetta la challenge di concentrarsi maggiormente sull'idea e sugli obiettivi formativi, delegando al workflow parte del lavoro di generazione.

> **[NOTA VISIVA — NON LEGGERE]** Riutilizzare **la stessa figura in modo evolutivo**: prima «Progettazione → Sviluppo → Distribuzione → Verifica»; poi comparsa di «VulcaMind → VulcaForge → VulcaShip» sulle fasi pertinenti, lasciando visibile il bisogno di verifica/correzione. Transizione potenzialmente animata, ma la tecnica estetica si decide più tardi. Evitare l'orologio che appare soltanto quando si pronuncia la parola «tempo».
>
> **[NOTA EDITORIALE — NON LEGGERE]** Presentare qui VulcAIn a scatola nera: niente spiegazione anticipata degli LLM, degli harness, di Ansible o dei Dockerfile. Non suggerire che la pipeline end-to-end con VulcaTest sia già completamente integrata.

## 1.4 — Il problema: una macchina generata non è necessariamente conforme

C'è però una difficoltà. Il fatto che una macchina sia stata generata e resa disponibile non significa automaticamente che tutti i passaggi del suo intended path funzionino. Possono esserci componenti mancanti, configurazioni errate o differenze fra ciò che era stato progettato e ciò che è stato effettivamente realizzato.

Quindi la generazione non è necessariamente un'operazione che riesce correttamente al primo tentativo. E, anche dopo aver automatizzato molte attività, rimane il lavoro di controllare la challenge, individuare eventuali difetti e intervenire per correggerli.

## 1.5 — Il caso Pizzeria

Un esempio concreto che ho incontrato riguarda **Pizzeria**, una macchina Boot-to-Root che avevo generato utilizzando il workflow di VulcAIn.

Secondo il percorso didattico previsto, all'interno dell'interfaccia web doveva essere disponibile una chat. L'interazione con questa componente avrebbe permesso al partecipante di scoprire informazioni utili per proseguire verso le fasi successive della challenge. Nella macchina ottenuta, però, la chat non risultava accessibile e funzionante come previsto.

Questo è un difetto particolarmente significativo: la macchina poteva essere stata costruita e avviata, e presentare comunque un problema proprio in un passaggio che il progettista voleva far affrontare. Non basta quindi verificare che un servizio sia raggiungibile o che, in qualche modo, sia possibile procedere: dobbiamo controllare **la conformità rispetto al percorso didattico che avevamo definito**.

> **[NOTA VISIVA — NON LEGGERE]** Mostrare uno screenshot **autentico** della Pizzeria storica recuperata, evidenziando con discrezione la zona in cui la chat doveva essere disponibile. L'utente ha già recuperato il materiale; scegliere insieme l'immagine definitiva. Non introdurre ancora tutti i dettagli del bypass dell'agente general-purpose, utili nel blocco 2.
>
> **[NOTA EDITORIALE — NON LEGGERE]** L'episodio storico della chat difettosa è **diverso** dal test Pizzeria P1-01 del benchmark, relativo al modulo Ansible `web-app-deploy` e a risposte HTTP 404. Non usare prove dell'uno come dimostrazione dell'altro.

## 1.6 — Il contributo: VulcaTest

È da questa esigenza che nasce **VulcaTest**, il framework che ho progettato e implementato durante la tesi.

L'idea è automatizzare due attività che altrimenti richiederebbero una verifica manuale: **controllare che la macchina rispetti l'intended path** e, quando viene individuato un problema, **tentare di correggerlo** per poi verificarne nuovamente il funzionamento.

Il lavoro riguarda quindi non la generazione iniziale della challenge, già affrontata da VulcAIn, ma il processo di controllo della conformità e di possibile ripristino. L'intenzione è aggiungere una fase di verifica dedicata a un processo di generazione già automatizzato.

A questo punto, però, nasce una prima difficoltà: **come automatizziamo una verifica che richiede di leggere output, interpretare il comportamento di una macchina vulnerabile e scegliere quali operazioni eseguire?**

> **[NOTA VISIVA — NON LEGGERE]** Riprendere la figura evolutiva di VulcAIn: la pipeline può spostarsi sulla sinistra e far comparire «VulcaTest» sulla destra, con le parole «Verifica» e «Correzione». Deve risultare un **affiancamento concettuale**, non una rappresentazione di una integrazione completa già disponibile in produzione. La domanda finale introduce il blocco 2.

---

# Blocco 2 — Agenti, architettura e implementazione

## 2.1 — Perché un LLM

Per affrontare un compito del genere possiamo utilizzare un **Large Language Model**, un LLM, capace di interpretare le osservazioni ottenute dalla macchina e scegliere dinamicamente le azioni successive.

Pensiamo a un comando che restituisce un errore, a una risposta HTTP inattesa oppure a una sessione SSH che richiede ulteriori interazioni. Un sistema che eseguisse soltanto una sequenza rigida di comandi rischierebbe di bloccarsi appena qualcosa si presenta in modo diverso. Un LLM può invece interpretare il risultato e decidere come proseguire, sempre all'interno di un obiettivo assegnato.

Da solo, tuttavia, il modello riceve informazioni e produce risposte: non dispone automaticamente degli strumenti per eseguire comandi o interagire con la macchina target.

> **[NOTA VISIVA — NON LEGGERE]** Schema essenziale: «Input testuale → LLM → Output testuale». Non aprire una spiegazione su Transformer o chain-of-thought; l'interesse è mostrare perché il modello da solo non può agire sulla macchina.

## 2.2 — Dall'LLM all'agente: l'harness

Per permettergli di compiere azioni serve un livello software che colleghi il modello agli strumenti disponibili: un **harness**. Questo gestisce le chiamate al modello, espone i tool, esegue le operazioni richieste e restituisce i risultati osservati.

Si crea così un ciclo di interazione: l'agente osserva qualcosa, decide un'azione, la esegue attraverso uno strumento e utilizza il nuovo risultato per scegliere come procedere. È questo meccanismo che rende possibile utilizzare un LLM per un'attività operativa, anziché soltanto per generare testo.

> **[NOTA VISIVA — NON LEGGERE]** Far evolvere la figura precedente: LLM al centro, harness attorno, strumenti e macchina con frecce bidirezionali «azioni / osservazioni». La resa grafica precisa è aperta.

## 2.3 — Perché non basta un harness general-purpose

A questo punto potrebbe sembrare che il problema sia già risolto. Esistono infatti harness general-purpose, come quelli impiegati negli assistenti di coding, che permettono a un agente di usare strumenti, eseguire comandi e svolgere autonomamente attività complesse.

La difficoltà è che **svolgere un compito e verificarne la conformità a un percorso prestabilito sono due obiettivi diversi**.

Un agente general-purpose tende ad avere molta libertà nella scelta delle azioni intermedie. Questa flessibilità è spesso un vantaggio: se deve correggere un programma o raggiungere un risultato, può esplorare più strade possibili. Per VulcaTest, però, non vogliamo semplicemente arrivare ai privilegi di root. Vogliamo controllare che siano stati attraversati e verificati determinati passaggi, raccogliendo le evidenze necessarie per valutare ognuno di essi.

Durante alcune prove preliminari con **Google Antigravity** ho osservato proprio questo problema. Tornando alla Pizzeria, l'agente era riuscito a proseguire attraverso un collegamento alternativo ancora presente nella pagina e a raggiungere una shell, senza avere verificato il corretto funzionamento della chat prevista dal percorso didattico. Dal punto di vista del raggiungimento dell'obiettivo finale poteva sembrare un successo; dal punto di vista della conformità, invece, rimaneva un difetto non verificato.

Perciò la scelta non è stata quella di eliminare ogni autonomia dell'agente, ma di **controllarne il perimetro**: seguire un Attack Plan, limitare gli strumenti e l'avanzamento, registrare le evidenze e separare ciò che può decidere l'LLM da ciò che deve essere gestito attraverso regole applicative.

> **[NOTA VISIVA — NON LEGGERE]** Confronto semplice fra «General-purpose: più percorsi per arrivare al risultato» e «Verifica di conformità: passaggi previsti + evidenze». Possibili pochi loghi rappresentativi, senza trasformare il confronto in una valutazione comparativa fra prodotti mai eseguita. Richiamare la Pizzeria storica senza ripeterne l'intera spiegazione.
>
> **[NOTA EDITORIALE — NON LEGGERE]** Non dire che VulcaTest garantisce in senso assoluto la correttezza dell'azione scelta o la verità di ogni evidenza. L'affermazione sostenibile è che **riduce lo spazio di manovra e rende il percorso più controllabile e tracciabile**.

## 2.4 — L'architettura generale

Queste esigenze hanno guidato la progettazione dell'architettura di VulcaTest. Ho separato il workflow in componenti con responsabilità differenti, coordinate da un **Orchestrator**.

Il **Planner** prepara il percorso che deve essere verificato. L'**Executor** si occupa di interagire con la macchina per eseguire gli step del piano. Il **Final Evaluator** analizza i risultati raccolti e produce una valutazione complessiva. Quando viene rilevato un problema e il self-healing è abilitato, entra in gioco il nodo di **healing**, che tenta un intervento sui sorgenti; dopo la ricostruzione, il sistema può eseguire nuovamente i test.

Questa è la visione d'insieme. Vediamo ora quali problemi risolvono concretamente le singole componenti.

> **[NOTA VISIVA — NON LEGGERE]** Figura architetturale **top-down**, derivata dalla figura 3.1 della tesi ma semplificata. Mantenere visibile il ruolo di coordinamento dell'Orchestrator: **non rappresentare l'Executor come contenitore di tutti i nodi**. L'idea dell'utente è di fare progressivi **zoom** sui singoli componenti, rivelando dettagli e flussi di input/output. È una prima scelta narrativa valida; la tecnica finale delle transizioni verrà decisa nel documento grafico. In visione generale basta un bivio «Problema?» che porti eventualmente all'healing.

## 2.5 — Il Planner e l'Attack Plan

Il primo componente è il Planner. Riceve la documentazione della challenge e utilizza un LLM per preparare un **Attack Plan**, cioè un piano di verifica organizzato in step.

Ogni step descrive ciò che bisogna ottenere, gli strumenti utilizzabili e una **checklist** di condizioni da verificare. La checklist è centrale perché non chiediamo all'agente soltanto di svolgere una certa operazione: gli chiediamo anche di dichiarare quali condizioni siano state soddisfatte e di associare a questi esiti le evidenze osservate.

Il piano generato dal modello viene trasformato e controllato nella sua struttura dal codice, così da poter essere utilizzato dalle componenti successive. Questo controllo, però, non garantisce che tutte le istruzioni del piano siano corrette dal punto di vista semantico: il tema diventerà importante quando parleremo del benchmark.

Una volta che abbiamo un piano, il problema successivo è eseguirlo senza perdere il controllo sul percorso.

> **[NOTA VISIVA — NON LEGGERE]** Zoom sul Planner con «Documentazione → generazione LLM → controllo/strutturazione → Attack Plan». Affiancare un **estratto reale** del piano presente nella tesi, evidenziando «Obiettivo», «Tool ammessi» e «Checklist». **[TODO]** Selezionare l'estratto autentico prima della versione slide; non inventare YAML attribuendolo alla tesi.

## 2.6 — Executor e Orchestrator: autonomia locale, controllo globale

Per l'esecuzione ho distinto due responsabilità fondamentali: quella dell'**Executor** e quella dell'**Orchestrator**.

L'Orchestrator governa l'avanzamento complessivo. Consegna all'Executor uno step alla volta e, sulla base dell'esito restituito, determina se proseguire, interrompere la verifica oppure passare alle fasi successive del workflow. Queste transizioni seguono regole implementate in codice e non sono lasciate alla libera scelta del modello.

L'Executor, invece, opera **all'interno dello step ricevuto**. Contiene una componente agentica basata su LLM, che interpreta gli output e decide quali tool chiamare, secondo un ciclo di ragionamento, azione e osservazione di tipo **ReAct**. Attorno a questa componente c'è codice Python che gestisce il contesto dello step, gli strumenti consentiti, i limiti delle interazioni e la costruzione del risultato.

Un elemento importante riguarda proprio la checklist. L'agente riporta per ogni condizione l'esito e le relative evidenze. Il codice dell'Executor non si limita ad accettare l'etichetta di successo fornita dall'LLM: ricalcola in modo deterministico la coerenza dello stato rispetto alle voci della checklist. Se anche una condizione è dichiarata non soddisfatta, lo step non può essere considerato superato.

Questo è un controllo preciso, ma ha un confine: **non significa che il codice sia in grado di dimostrare automaticamente la veridicità di ogni evidenza testuale**. L'interpretazione dell'osservazione conserva una componente agentica.

Infine, per evitare che l'agente continui a effettuare chiamate senza concludere, l'Executor gestisce un budget di **turni di interazione per step**, eventualmente estendibile soltanto fino a un limite massimo. Non si tratta del numero totale di step dell'Attack Plan, che è un'altra cosa.

> **[NOTA VISIVA — NON LEGGERE]** Zoom su Orchestrator ed Executor. All'interno dell'Executor distinguere **LLM/ReAct** e **codice Python**; mostrare il ciclo azione/osservazione e, a lato, «Checklist → controllo di coerenza → StepResult». Rendere visibile che **Orchestrator** decide la transizione tra step, mentre **Executor Python** calcola la coerenza dell'esito della checklist.

## 2.7 — Il Bridge: tool stateless, shell persistenti e controllo degli strumenti

Ma in che modo l'Executor riesce materialmente a interagire con la macchina vulnerabile?

A questo scopo ho realizzato un livello di integrazione, chiamato **Bridge**, che consente all'Executor di utilizzare backend di strumenti differenti. Uno di questi è **HexStrike**, un sistema preesistente che mette a disposizione diversi tool di cybersecurity. Questi strumenti si prestano soprattutto a chiamate indipendenti, di tipo *stateless*.

Nel testing, però, non tutte le operazioni sono indipendenti. Pensiamo a una connessione SSH, a una shell o a un programma interattivo: dopo averlo avviato dobbiamo poter continuare a interagire con **la stessa sessione**, senza ricominciare ogni volta.

Per rispondere a questa necessità ho sviluppato il **Terminal Gateway**, eseguito sulla macchina Kali, che gestisce sessioni di terminale persistenti attraverso PTY. L'agente può così mantenere e utilizzare più sessioni interattive nel corso degli step, ampliando le tecniche effettivamente eseguibili.

Un'altra scelta che considero importante è la **selezione degli strumenti**: l'Executor non riceve necessariamente tutto il catalogo disponibile, ma i tool pertinenti allo step, secondo quanto previsto dal piano. Questo riduce gli strumenti inutili nel contesto del modello e contribuisce a limitare le operazioni possibili durante la verifica.

La separazione introdotta dal Bridge permette anche di aggiungere in futuro nuovi backend di strumenti, senza dover riprogettare l'intero Executor.

> **[NOTA VISIVA — NON LEGGERE]** Zoom sul Bridge: Executor → Bridge → **HexStrike / Terminal Gateway** → Kali → macchina target. Piccola rappresentazione di più shell persistenti per chiarire intuitivamente il comportamento *stateful*. Mostrare «tool necessari allo step» come filtro. Non trasformare la slide in una lista di API o server.

## 2.8 — Evidenze e Final Evaluator

Durante l'esecuzione vengono raccolti gli esiti degli step, le risposte degli strumenti, gli errori e le evidenze associate alle condizioni del piano. Queste informazioni consentono di ricostruire il percorso effettivamente seguito dall'agente.

Al termine interviene il **Final Evaluator**, che analizza il risultato complessivo e produce un report facilmente interpretabile. Quando il test fallisce, può anche formulare un **ticket** con una prima ipotesi sulla natura del problema, da utilizzare nell'eventuale fase di correzione.

È importante distinguere ciò che il sistema osserva da ciò che può sapere con certezza. Il Final Evaluator vede il comportamento esterno della macchina attraverso le tracce del test: può segnalare, per esempio, che una risorsa web restituisce un errore, ma non sa ancora necessariamente se la causa risieda nel deployment, in un file mancante o in una configurazione errata. La diagnosi è quindi un'ipotesi da verificare, non una prova definitiva sui sorgenti.

> **[NOTA VISIVA — NON LEGGERE]** Zoom su «Evidenze degli step → Final Evaluator → report / eventuale ticket». Se si usa un estratto reale, selezionare poche righe significative. Non rappresentare il ticket come una root cause certamente corretta. In caso di fallimento e tentativi disponibili, il nodo di healing può comunque approfondire il problema anche quando l'ipotesi iniziale è incompleta.

## 2.9 — Due prospettive complementari: visione esterna e visione interna

Prima di vedere come funziona la correzione, vorrei distinguere **due prospettive** che caratterizzano VulcaTest.

Durante il testing adottiamo una **visione esterna** della macchina. L'Executor deve comportarsi come un partecipante alla challenge: osserva i servizi esposti e interagisce con essi dalla macchina di attacco, senza consultare il codice con cui la challenge è stata costruita. Altrimenti rischieremmo di verificare il percorso utilizzando informazioni che il partecipante non dovrebbe conoscere.

Nel self-healing passiamo invece a una **visione interna**. Per correggere un difetto è necessario poter leggere le configurazioni, analizzare i sorgenti e capire perché la macchina non si comporta come previsto.

Ed è qui che torna utile la flessibilità di un harness general-purpose, che prima avevamo giudicato poco adatta al testing di conformità. Per ricercare e correggere la causa di un difetto, l'esplorazione del codice è proprio ciò che ci serve. Quello che cambia è il compito assegnato all'agente e il modo in cui ne viene governato l'intervento.

> **[NOTA VISIVA — NON LEGGERE]** Etichette approvate: **«Visione esterna» / «Visione interna»**, più immediate e meno ambigue di *in-band/out-of-band* in questa presentazione. Le due etichette descrivono il punto di vista sulla **macchina target**, non l'architettura interna di VulcaTest. Possibile transizione da servizi esposti a sorgenti/IaC della stessa challenge.

## 2.10 — Self-healing, controllo delle modifiche e re-test

Quando una verifica termina con un problema e la correzione è abilitata, il workflow può avviare il nodo di **self-healing**. Qui utilizzo **Google Antigravity**, un agente di coding esterno, per analizzare i sorgenti e tentare una correzione. Attorno a questo agente, però, VulcaTest integra un controller che gestisce la sessione, fornisce le informazioni sul problema e controlla il processo di intervento.

L'agente riceve istruzioni specifiche. Per esempio, gli viene richiesto di non introdurre scorciatoie o informazioni che facilitino indebitamente la challenge e, soprattutto, di **non eliminare le vulnerabilità didattiche intenzionali**: un difetto che sarebbe da correggere in un normale sistema applicativo potrebbe essere proprio la vulnerabilità che un partecipante deve studiare e sfruttare.

Il controller mantiene anche traccia delle modifiche, confrontando i file testuali monitorati prima e dopo l'intervento, e applica verifiche sul perimetro delle modifiche, con possibilità di ripristinare quelle non consentite. Viene inoltre imposto un numero massimo di tentativi. Questi meccanismi aumentano la controllabilità del processo, pur non equivalendo a un isolamento assoluto dell'agente o a una garanzia di correttezza della patch.

Terminato l'intervento, non basta che l'agente affermi di avere risolto il problema. Se è stata prodotta una correzione pertinente, **la macchina viene ricostruita** e VulcaTest avvia un nuovo test, **dall'inizio e utilizzando lo stesso Attack Plan**. In questo modo verifichiamo sia che il passaggio difettoso sia tornato eseguibile sia che la modifica non abbia compromesso i passaggi precedenti.

Si chiude così il ciclo: **verifica, valutazione, eventuale correzione, rebuild e re-test**. La possibilità di ripetere il ciclo rimane comunque soggetta ai limiti configurati.

> **[NOTA VISIVA — NON LEGGERE]** Zoom sul nodo di healing con **Antigravity** chiaramente identificato come componente esterno e, attorno, i controlli sviluppati per VulcaTest. Tre etichette essenziali: «Vincoli di modifica», «Tracciamento patch», «Tentativi limitati». Poi mostrare l'intero ciclo con il re-test che riparte dall'inizio dello stesso piano. Non presentare i controlli sui file monitorati come una sandbox inviolabile.
>
> **[NOTA VISIVA — NON LEGGERE]** **Richiamo alla Pizzeria storica recuperata:** è il punto narrativo scelto per un eventuale *prima/dopo* della chat, subito dopo avere spiegato rebuild e re-test. **[TODO]** Verificare e selezionare screenshot autentici e l'esatto intervento dimostrato. Se il materiale mostra soltanto una ricostruzione o una correzione effettuata fuori dal benchmark, presentarlo come **dimostrazione distinta**, senza attribuirgli le metriche sperimentali di P1-01.

Abbiamo quindi visto come VulcaTest organizza una verifica e, quando possibile, prova a ripristinare il percorso previsto. Ma questo porta a un'altra domanda: **come possiamo capire se i risultati prodotti da un sistema agentico sono davvero affidabili?**

---

# Blocco 3 — Valutazione sperimentale

## 3.1 — Il problema dell'oracolo di test

Per valutare un framework come VulcaTest non era sufficiente prendere un insieme di macchine vulnerabili e osservare quante esecuzioni terminassero con successo. Non avevo a disposizione un benchmark già pronto che rispondesse direttamente a questa specifica esigenza: misurare la verifica dell'intended path e il successivo tentativo di ripristino.

La prima difficoltà è collegata a un problema noto nel software testing, il **Test Oracle Problem**: per stabilire se un test ha fornito un risultato corretto occorre disporre di un riferimento affidabile con cui confrontarlo.

Nel nostro caso, una run `COMPLETED` non dimostra automaticamente che tutte le condizioni siano state verificate correttamente: l'agente potrebbe aver interpretato male una risposta o dichiarato soddisfatta una checklist senza evidenze adeguate. Allo stesso modo, una run `FAILED` non dimostra automaticamente che la macchina abbia un difetto: il problema potrebbe risiedere nell'agente, in uno strumento o nel piano stesso.

Per misurare l'affidabilità del framework dovevo quindi conoscere **in anticipo il comportamento atteso della macchina**, indipendentemente dal risultato dichiarato da VulcaTest.

> **[NOTA VISIVA — NON LEGGERE]** Due esiti grandi, «COMPLETED?» e «FAILED?», entrambi accompagnati da un interrogativo. Evitare una slide di definizioni teoriche. L'oracle problem nasce naturalmente dal dubbio sui due esiti.

## 3.2 — Costruire le Golden Machine

Per creare questo riferimento ho lavorato su diverse challenge prodotte attraverso VulcAIn. Questa fase non ha consistito soltanto nel generare macchine: ho dovuto rivedere la documentazione e i passaggi didattici, eseguire le challenge, individuare eventuali problemi e correggere i sorgenti finché fosse possibile percorrere l'intended path previsto.

Le versioni risultanti, sottoposte a revisione e qualificazione, sono state chiamate **Golden Machine**. Sono le macchine che, ai fini del benchmark, abbiamo considerato conformi al percorso didattico. Non sto affermando che siano prive di qualsiasi difetto possibile; sto dicendo che è stato svolto un lavoro concreto di verifica e correzione rispetto alle condizioni che volevamo testare.

Questo passaggio ha richiesto anche di distinguere lo sviluppo preliminare dal benchmark finale. Nelle prove iniziali cambiavano sia il framework sia gli ambienti utilizzati, quindi quelle esecuzioni sono servite per sviluppare e stabilizzare il sistema, non per calcolare le metriche sperimentali.

> **[NOTA VISIVA — NON LEGGERE]** L'idea dell'utente: **molte macchine generate → revisione, risoluzione e fixing → Golden Machine**, con differenziazione visiva «oro» del riferimento. La rappresentazione è concettuale: non implica la certificazione assoluta delle macchine. Rimandare la spiegazione dei Golden Plan al momento in cui si parlerà di E2, come concordato.

## 3.3 — Introdurre perturbazioni controllate

A questo punto avevo bisogno non soltanto di macchine considerate conformi, ma anche di **versioni con difetti conosciuti**, sulle quali misurare la capacità di VulcaTest di individuare le non conformità.

Per questo ho progettato delle **perturbazioni controllate**: modifiche introdotte intenzionalmente nei sorgenti, conoscendo la condizione alterata e il comportamento atteso. Ogni perturbazione è specifica della macchina e del suo percorso didattico; non sono state applicate le stesse modifiche indistintamente a tutte le challenge.

Le perturbazioni sono state organizzate in tre categorie. Le **P1** rimuovono o rendono indisponibile un elemento necessario al percorso, per esempio una risorsa web. Le **P2** mantengono presente l'elemento, ma ne alterano un valore importante, come una password, un token o una chiave. Le **P3**, invece, introducono una scorciatoia o una configurazione aggiuntiva non prevista, senza necessariamente rendere impossibile il percorso originale.

Questa distinzione è importante: **P1 e P2** rappresentano il nucleo della valutazione di conformità, mentre le **P3** esplorano una proprietà differente, cioè la capacità di accorgersi di comportamenti ulteriori rispetto a quelli previsti dal piano.

Lavorare con perturbazioni controllate rende possibile confrontare un ambiente di riferimento e una sua versione modificata, riducendo l'ambiguità nell'interpretazione degli esiti.

> **[NOTA VISIVA — NON LEGGERE]** Tre rappresentazioni concise per P1/P2/P3, con un esempio intuitivo ciascuna. Mostrare che da una singola Golden Machine possono derivare varianti perturbate. Non presentare P3 come equivalente a una P1/P2 nella matrice principale.

## 3.4 — Tre esperimenti e il ruolo dei Golden Plan

Una volta costruiti gli ambienti di riferimento, ho suddiviso la valutazione in **tre esperimenti**, perché un fallimento può derivare da componenti differenti del workflow e volevo distinguerne, per quanto possibile, le responsabilità.

Il primo esperimento, **E1**, riguarda la pianificazione. Per ogni run il Planner genera autonomamente un nuovo Attack Plan a partire dalla documentazione revisionata e il sistema prova a eseguirlo sulla Golden Machine. Qui la domanda è: *con quale frequenza il framework riesce a generare ed eseguire fino alla fine un piano per una macchina conforme?* Non si tratta di una misura perfettamente isolata del solo Planner, perché anche l'esecuzione può incontrare problemi.

Per il secondo esperimento, **E2**, volevo invece misurare la capacità di segnalare le non conformità evitando che il risultato variasse ogni volta per colpa di un nuovo piano. Per questo, durante la preparazione della ground truth, avevo selezionato e corretto manualmente per ciascuna macchina un **Golden Plan**: un Attack Plan fisso, verificato rispetto alla documentazione e considerato valido dopo **tre esecuzioni consecutive `COMPLETED`** sulla relativa Golden Machine.

In E2 utilizzo quindi **lo stesso Golden Plan** sia sulla macchina conforme sia sulle sue varianti perturbate. Così escludo la generazione di nuovi piani come fattore di variabilità e mi concentro sul comportamento del workflow di rilevazione, pur sapendo che al risultato contribuiscono ancora Executor, strumenti e Final Evaluator.

Infine, **E3** riguarda il self-healing. Quando, durante E2, viene avviata una correzione, valuto due cose separatamente: se la modifica apportata ai sorgenti sia **tecnicamente valida**, attraverso una revisione manuale, e se, dopo rebuild, il **re-test completo** del Golden Plan arrivi effettivamente a `COMPLETED`.

L'obiettivo di questi tre esperimenti non è fingere che ogni nodo funzioni in isolamento assoluto, ma cercare di capire **dove** il framework funziona e **quali fattori** possono spiegare un esito negativo.

> **[NOTA VISIVA — NON LEGGERE]** Prendere come riferimento la figura 5.1 della tesi, semplificandola: «E1 — Piano nuovo», «E2 — Piano fisso su Golden/Perturbata», «E3 — Healing + re-test». La costruzione del Golden Plan è avvenuta nella qualificazione iniziale, anche se viene **spiegata ora** per ragioni narrative. Possibile formula visiva E2: stesso piano + due configurazioni → confronto degli esiti.

## 3.5 — Dimensione e rigore del benchmark

Il benchmark principale è stato costruito su **otto Golden Machine**, con percorsi didattici differenti, e **quindici perturbazioni** progettate per le singole challenge.

In totale ho effettuato **108 run principali**: **24 per E1**, cioè tre ripetizioni per ciascuna delle otto macchine, e **84 per E2**, considerando le macchine conformi e quelle perturbate. All'interno delle esecuzioni di E2 si sono inoltre svolte **36 sessioni di self-healing**, valutate in E3. Queste 36 sessioni **non sono altre 36 run indipendenti da sommare alle 108**: sono fasi aggiuntive attivate durante il workflow E2.

Prima della valutazione avevo congelato la versione del codice e dei prompt. Le esecuzioni partivano da macchine ricostruite nello stato previsto e non condividevano né il contesto dell'agente né informazioni ricavate dai test precedenti. Questo era importante per osservare la variabilità del sistema senza introdurre apprendimento o correzioni fra una run e l'altra.

> **[NOTA VISIVA — NON LEGGERE]** Numeri principali ben leggibili «8 macchine», «15 perturbazioni», «108 run» e relazione «24 E1 + 84 E2»; «36 healing dentro E2», non come somma separata. Evitare grafici decorativi e sovraccarichi. Il benchmark supplementare su altre quattro macchine e 24 run rimane materiale per eventuali domande, non il racconto principale.

## 3.6 — Risultati di E1: generazione dei piani

Partiamo dalla pianificazione. Su **24 run E1**, **20 sono terminate con `COMPLETED`**, cioè circa **l'83,3%**.

Questo dato ci dice quante volte il workflow è riuscito a completare operativamente un Attack Plan generato per la run. Non va interpretato come una percentuale isolata di accuratezza del Planner: anche un piano sostanzialmente corretto può incontrare problemi durante l'esecuzione.

Infatti, analizzando le prove, **22 piani su 24** sono risultati sostanzialmente coerenti con l'intended path nella revisione qualitativa, e soltanto uno dei quattro arresti è stato attribuito direttamente a un errore semantico di pianificazione. Il risultato mostra quindi la possibilità di generare piani utilizzabili, ma anche la necessità di distinguere la qualità del piano dall'esito operativo della sua esecuzione.

> **[NOTA VISIVA — NON LEGGERE]** Visualizzare soprattutto «20/24 COMPLETED»; l'analisi qualitativa «22/24 piani coerenti» può comparire come dettaglio secondario o rimanere orale, secondo il tempo. Non etichettare l'83,3% come «accuracy del Planner».

## 3.7 — Risultati di E2: rilevare le non conformità

Per E2 mi concentro innanzitutto sulle perturbazioni **P1 e P2**, perché sono quelle che alterano le condizioni previste dall'intended path.

Qui una segnalazione positiva è definita operativamente dalla **produzione di un ticket iniziale**. Quindi la metrica ci dice con quale affidabilità il sistema segnala una macchina perturbata, non se ha identificato automaticamente e con certezza la causa esatta del difetto.

Nelle **40 esecuzioni** con perturbazioni P1 o P2, VulcaTest ha emesso un ticket in **38 casi**. Abbiamo quindi una **recall del 95%**: in termini semplici, nel nostro insieme di prove il sistema ha segnalato 38 delle 40 esecuzioni perturbate.

Ho misurato anche quanto fossero affidabili le segnalazioni rispetto alle esecuzioni su macchine conformi. Considerando le 40 run perturbate e le 24 run sulle Golden Machine, abbiamo **38 veri positivi**, **2 falsi negativi**, **1 falso positivo** e **23 veri negativi**. Ne derivano una **precision del 97,44%** e un **F1-score del 96,20%**.

La precision risponde alla domanda: *quando viene emessa una segnalazione, quanto spesso riguarda effettivamente una macchina perturbata?* La recall risponde invece a: *quante delle macchine perturbate vengono segnalate?* L'F1 combina le due misure e aiuta a leggerle insieme, senza sostituirne il significato.

Anche i casi negativi sono istruttivi. Nei due falsi negativi il test iniziale risultava `FAILED`, ma il Final Evaluator **non aveva prodotto il ticket** richiesto dalla definizione sperimentale. Non erano, quindi, due challenge semplicemente completate ignorando il problema. Il falso positivo riguardava invece una Golden Machine in cui si era verificata una difficoltà operativa nella gestione del contesto SSH.

Questi risultati mostrano che VulcaTest è riuscito a segnalare la maggior parte delle alterazioni previste dal protocollo P1/P2, pur mantenendo una distinzione necessaria fra **rilevare un problema** e **diagnosticarne correttamente la causa**.

> **[NOTA VISIVA — NON LEGGERE]** Possibile matrice di confusione **TP 38, FN 2, FP 1, TN 23**, con enfasi grafica su «Recall 95%» e «Precision 97,44%». L'F1 può comparire in piccolo. Non usare tutte le percentuali come KPI indipendenti e senza contesto. La matrice riguarda **64 run**: 40 P1/P2 + 24 Golden; non l'intero E2 di 84 run, che include 20 P3.
>
> **[NOTA EDITORIALE — NON LEGGERE]** Promemoria formule: `Recall = TP/(TP+FN)`, `Precision = TP/(TP+FP)`, `Specificity = TN/(TN+FP)`, `F1 = 2·Precision·Recall/(Precision+Recall)`. Specificity nel benchmark: **95,83%**. Le formule possono essere mostrate in modo discreto o tenute come supporto per domande, senza trasformare la presentazione in una lezione di classificazione.

## 3.8 — Risultati di E3: correggere e riverificare

Passiamo infine al self-healing. Nel benchmark sono state effettuate **36 sessioni di correzione**, con **un solo tentativo consentito per sessione**.

Dalla revisione manuale dei sorgenti è emerso che **35 interventi su 36** hanno prodotto una **patch tecnicamente valida**, cioè circa il **97,2%**. Ma questo è soltanto il primo livello della valutazione: una correzione del codice non implica automaticamente che tutta la macchina sia stata ricostruita e che il percorso didattico sia stato completato di nuovo.

Per questo ho misurato separatamente il risultato del re-test. **33 sessioni su 36**, pari al **91,7%**, hanno portato a una nuova esecuzione `COMPLETED` dell'intero Golden Plan.

In due casi la modifica ai sorgenti era stata giudicata valida, ma il re-test non era arrivato alla fine per problemi operativi: in **GitPoison**, per esempio, il modello ha superato la finestra di contesto durante le fasi successive della verifica; in **TunnelGate** si è verificato un problema legato all'esecuzione di John the Ripper. In un terzo caso, su una perturbazione P3 di **Citadel**, l'agente non ha prodotto una correzione e la sessione si è conclusa con `DECLINED`.

Questa distinzione è essenziale: **validità della patch e completamento del ciclo di ripristino sono due misure differenti**. Il re-test non serve a confermare soltanto che un file è stato modificato, ma a osservare nuovamente il comportamento della macchina lungo il percorso previsto.

> **[NOTA VISIVA — NON LEGGERE]** Mettere a confronto «35/36 patch valide» e «33/36 re-test COMPLETED», non fonderli in un'unica misura di successo. Possibile caso GitPoison come breve esempio orale; evita una nuova sottosezione tecnica se la presentazione è già densa. Distinguere questo da Pizzeria storica, usata per illustrare il ciclo nel blocco 2.

## 3.9 — Tempi di esecuzione e consumo di risorse

Oltre agli esiti, ho osservato i tempi necessari per eseguire questi processi, perché un workflow agentico richiede numerose interazioni con il modello e con gli strumenti.

In **E1**, generazione e verifica hanno richiesto mediamente circa **14 minuti e 34 secondi**. La **verifica iniziale di E2** ha richiesto in media circa **14 minuti e 5 secondi**, calcolati su tutte le 84 run. Quando si è attivato il self-healing, il **ciclo completo di verifica, correzione e re-test** ha richiesto mediamente circa **34 minuti e 50 secondi**, sulle 35 sessioni per cui era disponibile la misurazione completa.

Questi numeri descrivono il costo temporale delle esecuzioni osservate sul mio ambiente sperimentale; non sono una misura del risparmio rispetto al lavoro manuale, che non ho confrontato direttamente.

Dal punto di vista del modello, una scelta importante per il progetto è stata l'utilizzo di **Qwen3.8-27B in locale**, in una versione **IQ3_S quantizzata**. Ho cercato una configurazione capace di sostenere i numerosi passaggi del workflow sull'hardware disponibile, con **16 GB di VRAM e 64 GB di RAM**.

Questo ha richiesto lavoro sulla configurazione dell'inferenza, sulla gestione della finestra di contesto e sulle ottimizzazioni, tra cui lo **speculative decoding con MTP e N-gram**. Il modello locale gestisce le componenti di pianificazione, esecuzione e valutazione; il nodo di healing utilizza invece l'agente esterno Antigravity.

Ho inoltre raccolto il consumo di token delle diverse fasi, utile per comprendere il volume delle interazioni richieste. È un dato che presenterò distinguendo il modello locale dall'agente esterno, perché i relativi contatori non sono direttamente sovrapponibili.

> **[NOTA VISIVA — NON LEGGERE]** Tempi principali: «14m05s verifica iniziale E2» e «34m50s ciclo E2+E3»; eventuale ripartizione sulla popolazione completa da 35 casi: **11,1 min verifica**, **8,3 min controller healing**, **15,4 min re-test**. Questa ripartizione **non** è la media della verifica E2 su 84 run. Inserire Qwen3.8-27B IQ3_S, hardware, MTP/N-gram come blocco di contesto, non come seconda lezione tecnica.
>
> **[TODO — TOKEN]** Decidere quali medie riportare sulla slide. Dati presenti nella tesi: **E2 Qwen verifica 225.382 input / 17.843 output medi**, **E2+E3 Qwen verifica+re-test 462.970 / 36.548**, **E3 Antigravity healing 134.470 / 13.856**; contabilizzazioni differenti. **E1 Qwen Executor+Final Evaluator 288.929 / 20.994**, con consumo del Planner non disponibile in modo affidabile. Non sommare indiscriminatamente Qwen e Antigravity. Nell'eventuale versione slide si potrà lasciare «XX token» finché non sarà deciso il confronto visuale.
>
> **[TODO — PRESTAZIONI MODELLO]** L'utente segnala **circa 45 token/s** e **contesto fino a 40k token** dalla configurazione impiegata. Prima di renderli dati pubblici, verificare log, condizioni della misura e configurazione effettiva. Non sono stati verificati come medie sperimentali nel capitolo 5. Distinguere throughput di generazione da durata dell'intero workflow.
>
> **[TODO — STIMA API]** Un eventuale costo equivalente per run deve essere presentato **solo come stima ipotetica** basata su listino e conteggi comparabili, non come costo realmente sostenuto o confronto di prestazioni fra modelli. Nessun importo viene inventato qui.

## 3.10 — Le P3 e il confine della copertura

Finora mi sono concentrato sulla verifica delle condizioni che compongono l'intended path. Ho però voluto svolgere anche una valutazione **trasversale** rispetto al focus principale della tesi, introducendo le perturbazioni **P3**: situazioni nelle quali compare una scorciatoia o una possibilità non prevista dal progettista, mentre il percorso documentato può continuare a funzionare.

Le P3 sono state analizzate separatamente proprio perché richiedono una capacità diversa dalla semplice verifica dei passaggi descritti nel piano. Nel benchmark principale ho effettuato **20 esecuzioni P3**; in **quattro casi** è stato emesso un ticket, e tutte le segnalazioni hanno riguardato **Citadel**, il cui piano conteneva controlli indirettamente pertinenti alla modifica.

Questo **20% non può essere interpretato come una recall del rilevamento delle scorciatoie**: le evidenze non permettono di stabilire con certezza che tutte le segnalazioni siano state causate dalla scorciatoia stessa.

Un caso più immediato per comprendere il limite è **NetVault**. Qui avevo aggiunto un record DNS TXT denominato `vault-internal`. Durante il test l'Executor ha effettivamente eseguito il trasferimento della zona DNS e ha ricevuto anche quel record aggiuntivo. Il Golden Plan, però, chiedeva di verificare la **presenza** dei record previsti, non l'**assenza** di ulteriori record inattesi. Il test è quindi terminato con `COMPLETED`, senza generare alcuna segnalazione.

Il punto è che **un'informazione può essere presente nelle evidenze e non essere riconosciuta come difformità se il piano non contiene il controllo necessario**. Non è una confutazione del risultato ottenuto sulle P1 e P2, ma rappresenta un limite reale della copertura: il conformance testing verifica ciò che è stato definito, mentre la ricerca autonoma di percorsi non previsti richiede un'attività esplorativa diversa.

> **[NOTA VISIVA — NON LEGGERE]** Mostrare «4 ticket / 20 run P3» con etichetta corretta **«ticket emessi»**, non «20% di scorciatoie rilevate». Possibile mostrare il grafico P3 della tesi, ma **NetVault è probabilmente il caso più esplicativo**: output DNS con record `vault-internal` e checklist che controlla solo i record attesi. Chiudere qui il risultato sperimentale, **senza anticipare ancora la soluzione futura**.

---

# Blocco 4 — Conclusioni e sviluppi futuri

## 4.1 — Riprendere il contributo

Ricapitolando, siamo partiti da un problema concreto: con VulcAIn possiamo automatizzare buona parte della generazione di una macchina didattica vulnerabile, ma questo non dimostra automaticamente che la challenge rispetti il percorso formativo progettato.

Il contributo della mia tesi è stato **progettare, implementare e valutare VulcaTest**, un framework dedicato proprio a questa verifica. Abbiamo visto come il sistema utilizzi componenti agentiche per interpretare gli output e interagire con il target, ma anche come ne governi il comportamento attraverso un piano, regole di orchestrazione, strumenti selezionati e raccolta delle evidenze.

Quando viene individuata una difformità, il workflow può inoltre tentare una correzione dei sorgenti, ricostruire la macchina e ripetere il test, mantenendo invariati i criteri di verifica.

> **[NOTA VISIVA — NON LEGGERE]** Ritornare alla **visione generale** di VulcaTest, non necessariamente al grafo tecnico completo. Se gli zoom top-down del blocco 2 funzioneranno, questa sarà la figura che ricompone il tutto. Può anche richiamare la pipeline VulcAIn → verifica/correzione, senza far pensare a un'integrazione end-to-end già completa.

## 4.2 — Significato dei risultati e limiti

La valutazione sperimentale ha mostrato che, nelle condizioni considerate, il framework riesce in molti casi a completare i piani di verifica, segnalare alterazioni dell'intended path e produrre correzioni tecnicamente valide, che possono poi essere sottoposte a un re-test completo.

Allo stesso tempo, i risultati hanno chiarito alcuni limiti. La riuscita dipende dalla qualità e dalla copertura dell'Attack Plan, oltre che dal comportamento degli agenti e degli strumenti utilizzati. In particolare, le perturbazioni P3 hanno mostrato che possono esistere scorciatoie o comportamenti non previsti che un controllo vincolato al piano non segnala.

Questa distinzione ci permette di interpretare il contributo in modo preciso: **VulcaTest automatizza una verifica mirata della conformità del percorso didattico; non sostituisce una valutazione esaustiva della sicurezza dell'intera macchina**.

## 4.3 — Due direzioni di sviluppo

Proprio a partire da questi risultati vedo due possibili direzioni di sviluppo.

La prima è **affiancare alla verifica dell'intended path una componente di testing esplorativo**, capace di cercare comportamenti indesiderati, configurazioni non previste e possibili scorciatoie anche quando non sono già descritti nella checklist. Sarebbe una capacità complementare, da mantenere distinta dalla verifica di conformità.

La seconda è completare **l'orchestrazione end-to-end dell'ecosistema VulcAIn**, collegando generazione, distribuzione, verifica e possibile correzione in un unico processo, accompagnato da un'**interfaccia grafica** per avviare le attività, seguirne lo svolgimento e consultare risultati ed evidenze.

La modularità dell'architettura di VulcaTest, già realizzata, offre una base per lavorare in queste direzioni senza dover ripensare da zero tutte le componenti.

> **[NOTA VISIVA — NON LEGGERE]** Solo due prospettive, con etichette brevi: **«Testing esplorativo»** e **«Pipeline end-to-end + GUI»**. Niente terza categoria «modularità»: è una proprietà già ottenuta, non uno sviluppo futuro. Non dilungarsi nella progettazione di funzionalità non implementate.

## 4.4 — Chiusura

Vorrei chiudere tornando al punto da cui siamo partiti. **Il problema non è costruire un agente capace semplicemente di ottenere i privilegi di root**: è verificare che una macchina vulnerabile permetta davvero di seguire il percorso didattico che il suo progettista aveva previsto.

Con VulcaTest ho cercato di trasformare questa esigenza in un **processo controllato e verificabile**, capace di raccogliere evidenze, segnalare difformità e tentare il ripristino della challenge, valutandone sperimentalmente i risultati e i limiti.

Vi ringrazio per l'attenzione. Sono a disposizione per eventuali domande.

> **[NOTA VISIVA — NON LEGGERE]** Chiusura semplice: l'ultima idea sostanziale riguarda il **contributo realizzato**, non soltanto ciò che rimane da fare. Decidere in seguito se mantenere il loop ad alto livello o passare direttamente a una slide finale minimale. Non aggiungere slogan.

---

# Appendice di lavoro — Verifiche prima della versione definitiva

Questa appendice **non fa parte del discorso orale**. Serve a non perdere le questioni emerse nel brainstorming e a proteggere la correttezza del documento quando verrà trasformato in slide.

1. **Asset della Pizzeria.** Il materiale storico è stato recuperato. Selezionare schermate originali prima/dopo e accertare che cosa dimostrino concretamente: difetto, modifica, nuovo funzionamento, eventuale re-test. Non associare automaticamente questi asset alla perturbazione benchmark P1-01.
2. **Estratto dell'Attack Plan.** Inserire un estratto autentico tratto dalla tesi o dagli artefatti reali, non un falso esempio spacciato per output del Planner. Evidenziare obiettivo, tool, checklist ed evidenza.
3. **Dati del modello locale.** Verificare con log/configurazione effettiva l'indicazione di circa **45 token/s** e una finestra fino a **40k**; specificare quali invocazioni e quale configurazione descrivono. Nel testo orale questi numeri sono volutamente omessi finché non verificati.
4. **Token.** Definire quali consumi medi mostrare senza mischiare contatori di Qwen e Antigravity, tenendo presente la mancanza del conteggio affidabile dei token del Planner in E1.
5. **Stima di costi via API.** Eventuale esercizio ipotetico separato dalla misura di tempi e risorse; richiede un listino datato, ipotesi esplicite e controllo della comparabilità.
6. **Metriche.** E2 P1/P2: **TP 38, FN 2, FP 1, TN 23**; recall **95,00%**, precision **97,44%**, specificity **95,83%**, F1 **96,20%**. E3: **35/36 patch valide**, **33/36 re-test COMPLETED**. Non presentare P3 **4/20 ticket** come recall formale delle scorciatoie.
7. **Fonte degli esperimenti.** La valutazione principale è **108 run = 24 E1 + 84 E2**, con **36 healing** svolti all'interno delle E2. La valutazione supplementare di 24 run su quattro nuove macchine rimane materiale di approfondimento, non parte del corpo della discussione.
8. **Scelte visive ancora aperte.** Numero effettivo delle slide, tempi per blocco, uso tecnico degli zoom, quale grafico per le metriche, quanto testo proiettare, prima/dopo della Pizzeria e grafica definitiva non sono decisioni già congelate.
9. **Revisione del parlato.** Il testo è volutamente ampio. Nella fase successiva valutare ad alta voce durata, chiarezza, naturalezza e ripetizioni, senza perdere i passaggi causali che motivano l'architettura e il protocollo di valutazione.

**Percorso di produzione concordato:** ① approvazione di questo **script orale unico** → ② **script orale suddiviso per slide** (ancora narrativo) → ③ **specifica concreta delle slide**, con immagini, figure, parole chiave e animazioni realmente necessarie.
