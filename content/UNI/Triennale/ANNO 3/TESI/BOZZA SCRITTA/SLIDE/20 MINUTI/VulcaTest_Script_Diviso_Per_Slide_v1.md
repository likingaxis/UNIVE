# VulcaTest — Script orale suddiviso per slide

**Versione:** v1 — 13 ottobre 2026  
**Base:** `VulcaTest_Script_Orale_Unificato_v1.md` e scelte narrative approvate nel brainstorming  
**Stato:** bozza ampia di **28 slide narrative provvisorie**; non è ancora la selezione definitiva delle slide per i 20 minuti. Il parlato contiene circa **4.900 parole**, quindi è ancora troppo lungo per la discussione e richiederà una successiva riduzione.

> **Come usare questo documento.** Ogni slide riporta un **messaggio guida**, il **testo da pronunciare** e un **promemoria visivo non definitivo**. I titoli servono per organizzare la discussione; non sono necessariamente i titoli che proietteremo. Il parlato deriva dallo script unificato, conservandone argomenti, esempi, dati e transizioni. Le note visive sono ipotesi da verificare nel prossimo documento dedicato alle slide effettive: qui non decidiamo ancora numero di immagini, grafica, palette, animazioni né parole esatte da mostrare sullo schermo.
>
> **Importante:** questa versione intenzionalmente conserva quasi tutto il discorso lungo. Le 28 unità indicano **punti narrativi**, non un obbligo di produrre 28 slide. Quando proveremo il tempo ad alta voce, potremo unire o eliminare schede-slide senza sacrificare i nessi causali. Non è una presentazione già calibrata sui 20 minuti.

## Mappa delle slide proposta

| Blocco | Slide | Funzione narrativa |
|---|---:|---|
| 1 — Introduzione | 01–05 | Contesto → intended path → VulcAIn → Pizzeria → VulcaTest |
| 2 — Architettura | 06–15 | LLM e harness → scelte architetturali → ciclo di verifica e ripristino |
| 3 — Benchmark | 16–25 | Oracle problem → ground truth → disegno sperimentale → risultati → limiti P3 |
| 4 — Conclusioni | 26–28 | Contributo → sviluppi → chiusura |


---

# Blocco 1 — Introduzione

## Slide 01 — Copertina, Cyber Range e Boot-to-Root

**Messaggio centrale:** Dare un contesto accessibile e spiegare chi progetta una challenge e chi la affronta.

### Testo da pronunciare

Buongiorno a tutti, sono Luca Gugliotta e oggi vi presento il mio progetto di tesi: **VulcaTest**, un framework agentico per la verifica di conformità e il self-healing di scenari Cyber Range.

Partirei proprio dall'ultimo elemento del titolo: che cosa intendiamo per *Cyber Range*? Si tratta di ambienti informatici controllati, progettati per simulare scenari di cybersecurity e permettere ad altre persone di esercitarsi. Possono essere utilizzati in contesti didattici, ma anche per l'addestramento e la formazione professionale.

Un esempio concreto è rappresentato dalle macchine *Boot-to-Root*: computer o ambienti virtualizzati volutamente vulnerabili, predisposti affinché un partecipante possa affrontarli come una sfida pratica. Da una parte abbiamo chi progetta la macchina e decide quali problemi inserirvi; dall'altra chi affronta l'esercitazione, osserva i servizi esposti, individua vulnerabilità e cerca di sfruttarle fino a ottenere i privilegi più elevati del sistema, quelli dell'utente *root*.

### Indicazione visiva provvisoria — non da leggere

> Titolo della tesi come apertura; possibile evidenziazione progressiva di “Cyber Range”. Una sola rappresentazione del rapporto progettista–macchina vulnerabile–partecipante, senza figure decorative indipendenti.

## Slide 02 — L’intended path: il percorso formativo

**Messaggio centrale:** Il risultato root ha valore didattico quando il partecipante può seguire il percorso formativo previsto.

### Testo da pronunciare

Ma l'obiettivo non è soltanto ottenere root. Quando progetta una challenge, l'autore può stabilire un percorso didattico preciso, costituito da passaggi attraverso i quali il partecipante dovrebbe acquisire una o più competenze. Per esempio, potrebbe dover effettuare una fase di enumerazione, individuare un servizio vulnerabile, recuperare delle credenziali e infine sfruttare una configurazione errata per elevare i privilegi.

Questo percorso progettato prende il nome di **intended path**. I suoi passaggi non sono semplicemente una lista di comandi: corrispondono a obiettivi formativi che la challenge dovrebbe permettere di raggiungere. Per questo è importante che il partecipante possa arrivare ai privilegi di root **seguendo il percorso previsto**, non soltanto attraverso una strada qualunque.

### Indicazione visiva provvisoria — non da leggere

> Far evolvere la rappresentazione precedente in una sequenza di passaggi con obiettivi formativi. Esempio concettuale, non un Attack Plan reale.

## Slide 03 — Dalla realizzazione manuale a VulcAIn

**Messaggio centrale:** VulcAIn automatizza buona parte della generazione, ma generare e distribuire non significa verificare la conformità.

### Testo da pronunciare

Realizzare queste macchine, però, richiede diverse attività. Bisogna ideare il percorso, progettare le vulnerabilità e i servizi, implementare e configurare la macchina, distribuirla nell'ambiente di esercitazione e infine verificare che tutto si comporti come previsto. È un processo che può richiedere parecchio tempo, soprattutto nelle fasi più ripetitive di implementazione e configurazione.

Per ridurre questo lavoro esiste **VulcAIn**, un progetto preesistente che utilizza componenti basati sull'intelligenza artificiale per automatizzare buona parte della realizzazione delle challenge. Partendo da una descrizione iniziale, **VulcaMind** prepara i contenuti e la documentazione della sfida; **VulcaForge** traduce questa progettazione negli artefatti necessari a costruire la macchina; **VulcaShip** si occupa della distribuzione nell'ambiente previsto.

L'obiettivo è consentire a chi progetta la challenge di concentrarsi maggiormente sull'idea e sugli obiettivi formativi, delegando al workflow parte del lavoro di generazione.

C'è però una difficoltà. Il fatto che una macchina sia stata generata e resa disponibile non significa automaticamente che tutti i passaggi del suo intended path funzionino. Possono esserci componenti mancanti, configurazioni errate o differenze fra ciò che era stato progettato e ciò che è stato effettivamente realizzato.

Quindi la generazione non è necessariamente un'operazione che riesce correttamente al primo tentativo. E, anche dopo aver automatizzato molte attività, rimane il lavoro di controllare la challenge, individuare eventuali difetti e intervenire per correggerli.

### Indicazione visiva provvisoria — non da leggere

> Stessa figura in evoluzione: fasi manuali → VulcaMind / VulcaForge / VulcaShip, lasciando evidente la verifica ancora necessaria. Evitare figure aggiuntive soltanto per evocare il tempo.

## Slide 04 — Pizzeria: un problema nel percorso previsto

**Messaggio centrale:** Una macchina generata e avviata può avere un componente didattico non funzionante.

### Testo da pronunciare

Un esempio concreto che ho incontrato riguarda **Pizzeria**, una macchina Boot-to-Root che avevo generato utilizzando il workflow di VulcAIn.

Secondo il percorso didattico previsto, all'interno dell'interfaccia web doveva essere disponibile una chat. L'interazione con questa componente avrebbe permesso al partecipante di scoprire informazioni utili per proseguire verso le fasi successive della challenge. Nella macchina ottenuta, però, la chat non risultava accessibile e funzionante come previsto.

Questo è un difetto particolarmente significativo: la macchina poteva essere stata costruita e avviata, e presentare comunque un problema proprio in un passaggio che il progettista voleva far affrontare. Non basta quindi verificare che un servizio sia raggiungibile o che, in qualche modo, sia possibile procedere: dobbiamo controllare **la conformità rispetto al percorso didattico che avevamo definito**.

### Indicazione visiva provvisoria — non da leggere

> Screenshot autentico della Pizzeria storica, evidenziando la chat prevista ma non correttamente disponibile. Non anticipare il bypass di Antigravity né confondere con P1-01.

## Slide 05 — VulcaTest: verifica e possibile correzione

**Messaggio centrale:** Presentare il contributo originale e aprire la domanda sull’automazione della verifica.

### Testo da pronunciare

È da questa esigenza che nasce **VulcaTest**, il framework che ho progettato e implementato durante la tesi.

L'idea è automatizzare due attività che altrimenti richiederebbero una verifica manuale: **controllare che la macchina rispetti l'intended path** e, quando viene individuato un problema, **tentare di correggerlo** per poi verificarne nuovamente il funzionamento.

Il lavoro riguarda quindi non la generazione iniziale della challenge, già affrontata da VulcAIn, ma il processo di controllo della conformità e di possibile ripristino. L'intenzione è aggiungere una fase di verifica dedicata a un processo di generazione già automatizzato.

A questo punto, però, nasce una prima difficoltà: **come automatizziamo una verifica che richiede di leggere output, interpretare il comportamento di una macchina vulnerabile e scegliere quali operazioni eseguire?**

### Indicazione visiva provvisoria — non da leggere

> La figura di VulcAIn si sposta o si ridimensiona; VulcaTest compare come componente concettuale di verifica e possibile ripristino. Non rappresentare una integrazione end-to-end già realizzata.


---

# Blocco 2 — Agenti, architettura e implementazione

## Slide 06 — Dal modello linguistico all’agente

**Messaggio centrale:** Il modello interpreta osservazioni, ma per agire gli servono strumenti e un harness.

### Testo da pronunciare

Per affrontare un compito del genere possiamo utilizzare un **Large Language Model**, un LLM, capace di interpretare le osservazioni ottenute dalla macchina e scegliere dinamicamente le azioni successive.

Pensiamo a un comando che restituisce un errore, a una risposta HTTP inattesa oppure a una sessione SSH che richiede ulteriori interazioni. Un sistema che eseguisse soltanto una sequenza rigida di comandi rischierebbe di bloccarsi appena qualcosa si presenta in modo diverso. Un LLM può invece interpretare il risultato e decidere come proseguire, sempre all'interno di un obiettivo assegnato.

Da solo, tuttavia, il modello riceve informazioni e produce risposte: non dispone automaticamente degli strumenti per eseguire comandi o interagire con la macchina target.

Per permettergli di compiere azioni serve un livello software che colleghi il modello agli strumenti disponibili: un **harness**. Questo gestisce le chiamate al modello, espone i tool, esegue le operazioni richieste e restituisce i risultati osservati.

Si crea così un ciclo di interazione: l'agente osserva qualcosa, decide un'azione, la esegue attraverso uno strumento e utilizza il nuovo risultato per scegliere come procedere. È questo meccanismo che rende possibile utilizzare un LLM per un'attività operativa, anziché soltanto per generare testo.

### Indicazione visiva provvisoria — non da leggere

> Schema progressivo: input → LLM → output, poi harness e tool tra LLM e macchina. Nessuna spiegazione superflua sul training.

## Slide 07 — Perché un harness general-purpose non basta

**Messaggio centrale:** Svolgere la challenge e verificare l’intended path non sono la stessa cosa.

### Testo da pronunciare

A questo punto potrebbe sembrare che il problema sia già risolto. Esistono infatti harness general-purpose, come quelli impiegati negli assistenti di coding, che permettono a un agente di usare strumenti, eseguire comandi e svolgere autonomamente attività complesse.

La difficoltà è che **svolgere un compito e verificarne la conformità a un percorso prestabilito sono due obiettivi diversi**.

Un agente general-purpose tende ad avere molta libertà nella scelta delle azioni intermedie. Questa flessibilità è spesso un vantaggio: se deve correggere un programma o raggiungere un risultato, può esplorare più strade possibili. Per VulcaTest, però, non vogliamo semplicemente arrivare ai privilegi di root. Vogliamo controllare che siano stati attraversati e verificati determinati passaggi, raccogliendo le evidenze necessarie per valutare ognuno di essi.

Durante alcune prove preliminari con **Google Antigravity** ho osservato proprio questo problema. Tornando alla Pizzeria, l'agente era riuscito a proseguire attraverso un collegamento alternativo ancora presente nella pagina e a raggiungere una shell, senza avere verificato il corretto funzionamento della chat prevista dal percorso didattico. Dal punto di vista del raggiungimento dell'obiettivo finale poteva sembrare un successo; dal punto di vista della conformità, invece, rimaneva un difetto non verificato.

Perciò la scelta non è stata quella di eliminare ogni autonomia dell'agente, ma di **controllarne il perimetro**: seguire un Attack Plan, limitare gli strumenti e l'avanzamento, registrare le evidenze e separare ciò che può decidere l'LLM da ciò che deve essere gestito attraverso regole applicative.

### Indicazione visiva provvisoria — non da leggere

> Confronto “scorciatoia verso root” vs “percorso di verifica con evidenze”; richiamo breve alla Pizzeria. Eventuali loghi solo come contesto, non confronto tra prodotti.

## Slide 08 — Architettura generale di VulcaTest

**Messaggio centrale:** Prima la visione d’insieme delle responsabilità, poi gli approfondimenti.

### Testo da pronunciare

Queste esigenze hanno guidato la progettazione dell'architettura di VulcaTest. Ho separato il workflow in componenti con responsabilità differenti, coordinate da un **Orchestrator**.

Il **Planner** prepara il percorso che deve essere verificato. L'**Executor** si occupa di interagire con la macchina per eseguire gli step del piano. Il **Final Evaluator** analizza i risultati raccolti e produce una valutazione complessiva. Quando viene rilevato un problema e il self-healing è abilitato, entra in gioco il nodo di **healing**, che tenta un intervento sui sorgenti; dopo la ricostruzione, il sistema può eseguire nuovamente i test.

Questa è la visione d'insieme. Vediamo ora quali problemi risolvono concretamente le singole componenti.

### Indicazione visiva provvisoria — non da leggere

> Schema semplificato derivato dall’architettura della tesi. Orchestrator governa il flusso. Mantenere la stessa mappa di riferimento per gli zoom successivi.

## Slide 09 — Planner e Attack Plan

**Messaggio centrale:** Dal documento della challenge a un piano strutturato in step e checklist.

### Testo da pronunciare

Il primo componente è il Planner. Riceve la documentazione della challenge e utilizza un LLM per preparare un **Attack Plan**, cioè un piano di verifica organizzato in step.

Ogni step descrive ciò che bisogna ottenere, gli strumenti utilizzabili e una **checklist** di condizioni da verificare. La checklist è centrale perché non chiediamo all'agente soltanto di svolgere una certa operazione: gli chiediamo anche di dichiarare quali condizioni siano state soddisfatte e di associare a questi esiti le evidenze osservate.

Il piano generato dal modello viene trasformato e controllato nella sua struttura dal codice, così da poter essere utilizzato dalle componenti successive. Questo controllo, però, non garantisce che tutte le istruzioni del piano siano corrette dal punto di vista semantico: il tema diventerà importante quando parleremo del benchmark.

Una volta che abbiamo un piano, il problema successivo è eseguirlo senza perdere il controllo sul percorso.

### Indicazione visiva provvisoria — non da leggere

> Zoom top-down sul Planner e un estratto AUTENTICO di Attack Plan con obiettivo, tool e checklist; niente YAML inventato.

## Slide 10 — Executor e Orchestrator: flessibilità sotto controllo

**Messaggio centrale:** Distinguere decisioni agentiche nel singolo step da avanzamento deterministico del workflow.

### Testo da pronunciare

Per l'esecuzione ho distinto due responsabilità fondamentali: quella dell'**Executor** e quella dell'**Orchestrator**.

L'Orchestrator governa l'avanzamento complessivo. Consegna all'Executor uno step alla volta e, sulla base dell'esito restituito, determina se proseguire, interrompere la verifica oppure passare alle fasi successive del workflow. Queste transizioni seguono regole implementate in codice e non sono lasciate alla libera scelta del modello.

L'Executor, invece, opera **all'interno dello step ricevuto**. Contiene una componente agentica basata su LLM, che interpreta gli output e decide quali tool chiamare, secondo un ciclo di ragionamento, azione e osservazione di tipo **ReAct**. Attorno a questa componente c'è codice Python che gestisce il contesto dello step, gli strumenti consentiti, i limiti delle interazioni e la costruzione del risultato.

Un elemento importante riguarda proprio la checklist. L'agente riporta per ogni condizione l'esito e le relative evidenze. Il codice dell'Executor non si limita ad accettare l'etichetta di successo fornita dall'LLM: ricalcola in modo deterministico la coerenza dello stato rispetto alle voci della checklist. Se anche una condizione è dichiarata non soddisfatta, lo step non può essere considerato superato.

Questo è un controllo preciso, ma ha un confine: **non significa che il codice sia in grado di dimostrare automaticamente la veridicità di ogni evidenza testuale**. L'interpretazione dell'osservazione conserva una componente agentica.

Infine, per evitare che l'agente continui a effettuare chiamate senza concludere, l'Executor gestisce un budget di **turni di interazione per step**, eventualmente estendibile soltanto fino a un limite massimo. Non si tratta del numero totale di step dell'Attack Plan, che è un'altra cosa.

### Indicazione visiva provvisoria — non da leggere

> Zoom su Executor (LLM/ReAct + codice Python) e Orchestrator; ciclo azioni/osservazioni, checklist e controllo di coerenza. Non raffigurare Executor come contenitore dell’intera architettura.

## Slide 11 — Bridge: strumenti, sessioni persistenti e tool-slicing

**Messaggio centrale:** Rendere concreta l’interazione col target, valorizzando Terminal Gateway e selezione dei tool.

### Testo da pronunciare

Ma in che modo l'Executor riesce materialmente a interagire con la macchina vulnerabile?

A questo scopo ho realizzato un livello di integrazione, chiamato **Bridge**, che consente all'Executor di utilizzare backend di strumenti differenti. Uno di questi è **HexStrike**, un sistema preesistente che mette a disposizione diversi tool di cybersecurity. Questi strumenti si prestano soprattutto a chiamate indipendenti, di tipo *stateless*.

Nel testing, però, non tutte le operazioni sono indipendenti. Pensiamo a una connessione SSH, a una shell o a un programma interattivo: dopo averlo avviato dobbiamo poter continuare a interagire con **la stessa sessione**, senza ricominciare ogni volta.

Per rispondere a questa necessità ho sviluppato il **Terminal Gateway**, eseguito sulla macchina Kali, che gestisce sessioni di terminale persistenti attraverso PTY. L'agente può così mantenere e utilizzare più sessioni interattive nel corso degli step, ampliando le tecniche effettivamente eseguibili.

Un'altra scelta che considero importante è la **selezione degli strumenti**: l'Executor non riceve necessariamente tutto il catalogo disponibile, ma i tool pertinenti allo step, secondo quanto previsto dal piano. Questo riduce gli strumenti inutili nel contesto del modello e contribuisce a limitare le operazioni possibili durante la verifica.

La separazione introdotta dal Bridge permette anche di aggiungere in futuro nuovi backend di strumenti, senza dover riprogettare l'intero Executor.

### Indicazione visiva provvisoria — non da leggere

> Zoom Executor → Bridge → HexStrike / Terminal Gateway → Kali → target. Piccola rappresentazione delle sessioni PTY persistenti e del filtraggio degli strumenti per step.

## Slide 12 — Final Evaluator: evidenze, report e ipotesi

**Messaggio centrale:** Il risultato deve essere ricostruibile; il ticket contiene una diagnosi preliminare, non una causa certa.

### Testo da pronunciare

Durante l'esecuzione vengono raccolti gli esiti degli step, le risposte degli strumenti, gli errori e le evidenze associate alle condizioni del piano. Queste informazioni consentono di ricostruire il percorso effettivamente seguito dall'agente.

Al termine interviene il **Final Evaluator**, che analizza il risultato complessivo e produce un report facilmente interpretabile. Quando il test fallisce, può anche formulare un **ticket** con una prima ipotesi sulla natura del problema, da utilizzare nell'eventuale fase di correzione.

È importante distinguere ciò che il sistema osserva da ciò che può sapere con certezza. Il Final Evaluator vede il comportamento esterno della macchina attraverso le tracce del test: può segnalare, per esempio, che una risorsa web restituisce un errore, ma non sa ancora necessariamente se la causa risieda nel deployment, in un file mancante o in una configurazione errata. La diagnosi è quindi un'ipotesi da verificare, non una prova definitiva sui sorgenti.

### Indicazione visiva provvisoria — non da leggere

> Zoom su step/evidenze → Final Evaluator → report/ticket. Eventuale frammento autentico, non una tabella tecnica esaustiva.

## Slide 13 — Visione esterna e visione interna

**Messaggio centrale:** Testing e correzione richiedono due prospettive di accesso diverse sulla stessa macchina.

### Testo da pronunciare

Prima di vedere come funziona la correzione, vorrei distinguere **due prospettive** che caratterizzano VulcaTest.

Durante il testing adottiamo una **visione esterna** della macchina. L'Executor deve comportarsi come un partecipante alla challenge: osserva i servizi esposti e interagisce con essi dalla macchina di attacco, senza consultare il codice con cui la challenge è stata costruita. Altrimenti rischieremmo di verificare il percorso utilizzando informazioni che il partecipante non dovrebbe conoscere.

Nel self-healing passiamo invece a una **visione interna**. Per correggere un difetto è necessario poter leggere le configurazioni, analizzare i sorgenti e capire perché la macchina non si comporta come previsto.

Ed è qui che torna utile la flessibilità di un harness general-purpose, che prima avevamo giudicato poco adatta al testing di conformità. Per ricercare e correggere la causa di un difetto, l'esplorazione del codice è proprio ciò che ci serve. Quello che cambia è il compito assegnato all'agente e il modo in cui ne viene governato l'intervento.

### Indicazione visiva provvisoria — non da leggere

> Contrasto visivo sulla macchina target: servizi esposti e comandi dall’esterno / sorgenti e configurazioni dall’interno. Titoli approvati “Visione esterna” e “Visione interna”.

## Slide 14 — Self-healing: Antigravity sotto controllo

**Messaggio centrale:** La flessibilità dell’harness generico diventa utile nel repair, mantenendo vincoli e tracciamento.

### Testo da pronunciare

Quando una verifica termina con un problema e la correzione è abilitata, il workflow può avviare il nodo di **self-healing**. Qui utilizzo **Google Antigravity**, un agente di coding esterno, per analizzare i sorgenti e tentare una correzione. Attorno a questo agente, però, VulcaTest integra un controller che gestisce la sessione, fornisce le informazioni sul problema e controlla il processo di intervento.

L'agente riceve istruzioni specifiche. Per esempio, gli viene richiesto di non introdurre scorciatoie o informazioni che facilitino indebitamente la challenge e, soprattutto, di **non eliminare le vulnerabilità didattiche intenzionali**: un difetto che sarebbe da correggere in un normale sistema applicativo potrebbe essere proprio la vulnerabilità che un partecipante deve studiare e sfruttare.

Il controller mantiene anche traccia delle modifiche, confrontando i file testuali monitorati prima e dopo l'intervento, e applica verifiche sul perimetro delle modifiche, con possibilità di ripristinare quelle non consentite. Viene inoltre imposto un numero massimo di tentativi. Questi meccanismi aumentano la controllabilità del processo, pur non equivalendo a un isolamento assoluto dell'agente o a una garanzia di correttezza della patch.

### Indicazione visiva provvisoria — non da leggere

> Zoom sul nodo di healing: Antigravity come componente esterno e controller sviluppato nel framework. Candidati tre richiami: vincoli, diff/rollback dei file monitorati, limite tentativi.

## Slide 15 — Rebuild, re-test e ritorno alla Pizzeria

**Messaggio centrale:** Una patch non è sufficiente: serve ricostruire e ripercorrere lo stesso piano dall’inizio.

### Testo da pronunciare

Terminato l'intervento, non basta che l'agente affermi di avere risolto il problema. Se è stata prodotta una correzione pertinente, **la macchina viene ricostruita** e VulcaTest avvia un nuovo test, **dall'inizio e utilizzando lo stesso Attack Plan**. In questo modo verifichiamo sia che il passaggio difettoso sia tornato eseguibile sia che la modifica non abbia compromesso i passaggi precedenti.

Si chiude così il ciclo: **verifica, valutazione, eventuale correzione, rebuild e re-test**. La possibilità di ripetere il ciclo rimane comunque soggetta ai limiti configurati.

Abbiamo quindi visto come VulcaTest organizza una verifica e, quando possibile, prova a ripristinare il percorso previsto. Ma questo porta a un'altra domanda: **come possiamo capire se i risultati prodotti da un sistema agentico sono davvero affidabili?**

### Indicazione visiva provvisoria — non da leggere

> Chiudere il loop Test → Valutazione → Healing → Rebuild → Re-test, con lo stesso Attack Plan. Qui mostrare, se verificati, gli screenshot prima/dopo della Pizzeria storica; non attribuirli al benchmark P1-01.


---

# Blocco 3 — Valutazione sperimentale

## Slide 16 — Test Oracle Problem: cosa significa “test corretto”?

**Messaggio centrale:** Per misurare VulcaTest non basta leggere i suoi status: serve un riferimento indipendente.

### Testo da pronunciare

Per valutare un framework come VulcaTest non era sufficiente prendere un insieme di macchine vulnerabili e osservare quante esecuzioni terminassero con successo. Non avevo a disposizione un benchmark già pronto che rispondesse direttamente a questa specifica esigenza: misurare la verifica dell'intended path e il successivo tentativo di ripristino.

La prima difficoltà è collegata a un problema noto nel software testing, il **Test Oracle Problem**: per stabilire se un test ha fornito un risultato corretto occorre disporre di un riferimento affidabile con cui confrontarlo.

Nel nostro caso, una run `COMPLETED` non dimostra automaticamente che tutte le condizioni siano state verificate correttamente: l'agente potrebbe aver interpretato male una risposta o dichiarato soddisfatta una checklist senza evidenze adeguate. Allo stesso modo, una run `FAILED` non dimostra automaticamente che la macchina abbia un difetto: il problema potrebbe risiedere nell'agente, in uno strumento o nel piano stesso.

Per misurare l'affidabilità del framework dovevo quindi conoscere **in anticipo il comportamento atteso della macchina**, indipendentemente dal risultato dichiarato da VulcaTest.

### Indicazione visiva provvisoria — non da leggere

> Due stati COMPLETED? / FAILED? accompagnati dal dubbio sulla loro interpretazione. Non una lezione astratta di teoria del testing.

## Slide 17 — Golden Machine: costruire la ground truth

**Messaggio centrale:** Il riferimento nasce da revisione manuale di documentazione, percorso e sorgenti.

### Testo da pronunciare

Per creare questo riferimento ho lavorato su diverse challenge prodotte attraverso VulcAIn. Questa fase non ha consistito soltanto nel generare macchine: ho dovuto rivedere la documentazione e i passaggi didattici, eseguire le challenge, individuare eventuali problemi e correggere i sorgenti finché fosse possibile percorrere l'intended path previsto.

Le versioni risultanti, sottoposte a revisione e qualificazione, sono state chiamate **Golden Machine**. Sono le macchine che, ai fini del benchmark, abbiamo considerato conformi al percorso didattico. Non sto affermando che siano prive di qualsiasi difetto possibile; sto dicendo che è stato svolto un lavoro concreto di verifica e correzione rispetto alle condizioni che volevamo testare.

Questo passaggio ha richiesto anche di distinguere lo sviluppo preliminare dal benchmark finale. Nelle prove iniziali cambiavano sia il framework sia gli ambienti utilizzati, quindi quelle esecuzioni sono servite per sviluppare e stabilizzare il sistema, non per calcolare le metriche sperimentali.

### Indicazione visiva provvisoria — non da leggere

> Macchine generate → revisione e fixing → Golden Machine. L’oro simboleggia una versione qualificata, non una garanzia assoluta. Golden Plan introdotto più avanti.

## Slide 18 — Perturbazioni P1, P2 e P3

**Messaggio centrale:** Difetti noti e specifici per macchina permettono un confronto controllato.

### Testo da pronunciare

A questo punto avevo bisogno non soltanto di macchine considerate conformi, ma anche di **versioni con difetti conosciuti**, sulle quali misurare la capacità di VulcaTest di individuare le non conformità.

Per questo ho progettato delle **perturbazioni controllate**: modifiche introdotte intenzionalmente nei sorgenti, conoscendo la condizione alterata e il comportamento atteso. Ogni perturbazione è specifica della macchina e del suo percorso didattico; non sono state applicate le stesse modifiche indistintamente a tutte le challenge.

Le perturbazioni sono state organizzate in tre categorie. Le **P1** rimuovono o rendono indisponibile un elemento necessario al percorso, per esempio una risorsa web. Le **P2** mantengono presente l'elemento, ma ne alterano un valore importante, come una password, un token o una chiave. Le **P3**, invece, introducono una scorciatoia o una configurazione aggiuntiva non prevista, senza necessariamente rendere impossibile il percorso originale.

Questa distinzione è importante: **P1 e P2** rappresentano il nucleo della valutazione di conformità, mentre le **P3** esplorano una proprietà differente, cioè la capacità di accorgersi di comportamenti ulteriori rispetto a quelli previsti dal piano.

Lavorare con perturbazioni controllate rende possibile confrontare un ambiente di riferimento e una sua versione modificata, riducendo l'ambiguità nell'interpretazione degli esiti.

### Indicazione visiva provvisoria — non da leggere

> Schema Golden Machine → varianti; esempi chiari P1 elemento assente, P2 valore alterato, P3 scorciatoia aggiuntiva. Le P3 restano esplorative.

## Slide 19 — Esperimenti E1, E2, E3 e Golden Plan

**Messaggio centrale:** Le tre prove separano per quanto possibile pianificazione, rilevazione e ripristino.

### Testo da pronunciare

Una volta costruiti gli ambienti di riferimento, ho suddiviso la valutazione in **tre esperimenti**, perché un fallimento può derivare da componenti differenti del workflow e volevo distinguerne, per quanto possibile, le responsabilità.

Il primo esperimento, **E1**, riguarda la pianificazione. Per ogni run il Planner genera autonomamente un nuovo Attack Plan a partire dalla documentazione revisionata e il sistema prova a eseguirlo sulla Golden Machine. Qui la domanda è: *con quale frequenza il framework riesce a generare ed eseguire fino alla fine un piano per una macchina conforme?* Non si tratta di una misura perfettamente isolata del solo Planner, perché anche l'esecuzione può incontrare problemi.

Per il secondo esperimento, **E2**, volevo invece misurare la capacità di segnalare le non conformità evitando che il risultato variasse ogni volta per colpa di un nuovo piano. Per questo, durante la preparazione della ground truth, avevo selezionato e corretto manualmente per ciascuna macchina un **Golden Plan**: un Attack Plan fisso, verificato rispetto alla documentazione e considerato valido dopo **tre esecuzioni consecutive `COMPLETED`** sulla relativa Golden Machine.

In E2 utilizzo quindi **lo stesso Golden Plan** sia sulla macchina conforme sia sulle sue varianti perturbate. Così escludo la generazione di nuovi piani come fattore di variabilità e mi concentro sul comportamento del workflow di rilevazione, pur sapendo che al risultato contribuiscono ancora Executor, strumenti e Final Evaluator.

Infine, **E3** riguarda il self-healing. Quando, durante E2, viene avviata una correzione, valuto due cose separatamente: se la modifica apportata ai sorgenti sia **tecnicamente valida**, attraverso una revisione manuale, e se, dopo rebuild, il **re-test completo** del Golden Plan arrivi effettivamente a `COMPLETED`.

L'obiettivo di questi tre esperimenti non è fingere che ogni nodo funzioni in isolamento assoluto, ma cercare di capire **dove** il framework funziona e **quali fattori** possono spiegare un esito negativo.

### Indicazione visiva provvisoria — non da leggere

> Schema ispirato alla figura 5.1: E1 piano nuovo; E2 stesso Golden Plan su Golden/Perturbata; E3 healing e re-test. Visualizzare la validazione preliminare del Golden Plan (3 run COMPLETED).

## Slide 20 — La dimensione del benchmark principale

**Messaggio centrale:** La consistenza del protocollo conta quanto il numero dei test.

### Testo da pronunciare

Il benchmark principale è stato costruito su **otto Golden Machine**, con percorsi didattici differenti, e **quindici perturbazioni** progettate per le singole challenge.

In totale ho effettuato **108 run principali**: **24 per E1**, cioè tre ripetizioni per ciascuna delle otto macchine, e **84 per E2**, considerando le macchine conformi e quelle perturbate. All'interno delle esecuzioni di E2 si sono inoltre svolte **36 sessioni di self-healing**, valutate in E3. Queste 36 sessioni **non sono altre 36 run indipendenti da sommare alle 108**: sono fasi aggiuntive attivate durante il workflow E2.

Prima della valutazione avevo congelato la versione del codice e dei prompt. Le esecuzioni partivano da macchine ricostruite nello stato previsto e non condividevano né il contesto dell'agente né informazioni ricavate dai test precedenti. Questo era importante per osservare la variabilità del sistema senza introdurre apprendimento o correzioni fra una run e l'altra.

### Indicazione visiva provvisoria — non da leggere

> 8 Golden Machine, 15 perturbazioni, 108 run = 24 E1 + 84 E2. Chiarire graficamente che 36 sessioni healing E3 sono contenute dentro E2.

## Slide 21 — E1: generazione e completamento dei piani

**Messaggio centrale:** Misurare la capacità operativa del workflow con piani generati, senza chiamarla accuratezza isolata del Planner.

### Testo da pronunciare

Partiamo dalla pianificazione. Su **24 run E1**, **20 sono terminate con `COMPLETED`**, cioè circa **l'83,3%**.

Questo dato ci dice quante volte il workflow è riuscito a completare operativamente un Attack Plan generato per la run. Non va interpretato come una percentuale isolata di accuratezza del Planner: anche un piano sostanzialmente corretto può incontrare problemi durante l'esecuzione.

Infatti, analizzando le prove, **22 piani su 24** sono risultati sostanzialmente coerenti con l'intended path nella revisione qualitativa, e soltanto uno dei quattro arresti è stato attribuito direttamente a un errore semantico di pianificazione. Il risultato mostra quindi la possibilità di generare piani utilizzabili, ma anche la necessità di distinguere la qualità del piano dall'esito operativo della sua esecuzione.

### Indicazione visiva provvisoria — non da leggere

> 20/24 COMPLETED in grande, 22/24 piani sostanzialmente coerenti come contesto eventuale. Non far coincidere le due misure.

## Slide 22 — E2: capacità di segnalare le non conformità

**Messaggio centrale:** Quantificare le segnalazioni P1/P2 e spiegare che si misura l’emissione del ticket.

### Testo da pronunciare

Per E2 mi concentro innanzitutto sulle perturbazioni **P1 e P2**, perché sono quelle che alterano le condizioni previste dall'intended path.

Qui una segnalazione positiva è definita operativamente dalla **produzione di un ticket iniziale**. Quindi la metrica ci dice con quale affidabilità il sistema segnala una macchina perturbata, non se ha identificato automaticamente e con certezza la causa esatta del difetto.

Nelle **40 esecuzioni** con perturbazioni P1 o P2, VulcaTest ha emesso un ticket in **38 casi**. Abbiamo quindi una **recall del 95%**: in termini semplici, nel nostro insieme di prove il sistema ha segnalato 38 delle 40 esecuzioni perturbate.

Ho misurato anche quanto fossero affidabili le segnalazioni rispetto alle esecuzioni su macchine conformi. Considerando le 40 run perturbate e le 24 run sulle Golden Machine, abbiamo **38 veri positivi**, **2 falsi negativi**, **1 falso positivo** e **23 veri negativi**. Ne derivano una **precision del 97,44%** e un **F1-score del 96,20%**.

La precision risponde alla domanda: *quando viene emessa una segnalazione, quanto spesso riguarda effettivamente una macchina perturbata?* La recall risponde invece a: *quante delle macchine perturbate vengono segnalate?* L'F1 combina le due misure e aiuta a leggerle insieme, senza sostituirne il significato.

Anche i casi negativi sono istruttivi. Nei due falsi negativi il test iniziale risultava `FAILED`, ma il Final Evaluator **non aveva prodotto il ticket** richiesto dalla definizione sperimentale. Non erano, quindi, due challenge semplicemente completate ignorando il problema. Il falso positivo riguardava invece una Golden Machine in cui si era verificata una difficoltà operativa nella gestione del contesto SSH.

Questi risultati mostrano che VulcaTest è riuscito a segnalare la maggior parte delle alterazioni previste dal protocollo P1/P2, pur mantenendo una distinzione necessaria fra **rilevare un problema** e **diagnosticarne correttamente la causa**.

### Indicazione visiva provvisoria — non da leggere

> Matrice 38 TP, 2 FN, 1 FP, 23 TN, enfatizzando Recall 95% e Precision 97,44%; F1 96,20% secondaria. Evitare “correttezza della diagnosi” come metrica.

## Slide 23 — E3: correzione valida e re-test completato

**Messaggio centrale:** Una patch corretta e un re-test concluso sono due risultati diversi.

### Testo da pronunciare

Passiamo infine al self-healing. Nel benchmark sono state effettuate **36 sessioni di correzione**, con **un solo tentativo consentito per sessione**.

Dalla revisione manuale dei sorgenti è emerso che **35 interventi su 36** hanno prodotto una **patch tecnicamente valida**, cioè circa il **97,2%**. Ma questo è soltanto il primo livello della valutazione: una correzione del codice non implica automaticamente che tutta la macchina sia stata ricostruita e che il percorso didattico sia stato completato di nuovo.

Per questo ho misurato separatamente il risultato del re-test. **33 sessioni su 36**, pari al **91,7%**, hanno portato a una nuova esecuzione `COMPLETED` dell'intero Golden Plan.

In due casi la modifica ai sorgenti era stata giudicata valida, ma il re-test non era arrivato alla fine per problemi operativi: in **GitPoison**, per esempio, il modello ha superato la finestra di contesto durante le fasi successive della verifica; in **TunnelGate** si è verificato un problema legato all'esecuzione di John the Ripper. In un terzo caso, su una perturbazione P3 di **Citadel**, l'agente non ha prodotto una correzione e la sessione si è conclusa con `DECLINED`.

Questa distinzione è essenziale: **validità della patch e completamento del ciclo di ripristino sono due misure differenti**. Il re-test non serve a confermare soltanto che un file è stato modificato, ma a osservare nuovamente il comportamento della macchina lungo il percorso previsto.

### Indicazione visiva provvisoria — non da leggere

> Confronto chiaro fra 35/36 patch tecnicamente valide e 33/36 re-test COMPLETED. GitPoison come eventuale breve esempio di esito operativo.

## Slide 24 — Tempi, token e modello locale

**Messaggio centrale:** Contestualizzare costi operativi e lavoro di adattamento dell’inferenza su hardware locale.

### Testo da pronunciare

Oltre agli esiti, ho osservato i tempi necessari per eseguire questi processi, perché un workflow agentico richiede numerose interazioni con il modello e con gli strumenti.

In **E1**, generazione e verifica hanno richiesto mediamente circa **14 minuti e 34 secondi**. La **verifica iniziale di E2** ha richiesto in media circa **14 minuti e 5 secondi**, calcolati su tutte le 84 run. Quando si è attivato il self-healing, il **ciclo completo di verifica, correzione e re-test** ha richiesto mediamente circa **34 minuti e 50 secondi**, sulle 35 sessioni per cui era disponibile la misurazione completa.

Questi numeri descrivono il costo temporale delle esecuzioni osservate sul mio ambiente sperimentale; non sono una misura del risparmio rispetto al lavoro manuale, che non ho confrontato direttamente.

Dal punto di vista del modello, una scelta importante per il progetto è stata l'utilizzo di **Qwen3.8-27B in locale**, in una versione **IQ3_S quantizzata**. Ho cercato una configurazione capace di sostenere i numerosi passaggi del workflow sull'hardware disponibile, con **16 GB di VRAM e 64 GB di RAM**.

Questo ha richiesto lavoro sulla configurazione dell'inferenza, sulla gestione della finestra di contesto e sulle ottimizzazioni, tra cui lo **speculative decoding con MTP e N-gram**. Il modello locale gestisce le componenti di pianificazione, esecuzione e valutazione; il nodo di healing utilizza invece l'agente esterno Antigravity.

Ho inoltre raccolto il consumo di token delle diverse fasi, utile per comprendere il volume delle interazioni richieste. È un dato che presenterò distinguendo il modello locale dall'agente esterno, perché i relativi contatori non sono direttamente sovrapponibili.

### Indicazione visiva provvisoria — non da leggere

> Media E2 14m05s, ciclo completo 34m50s su 35 casi; Qwen3.8-27B IQ3_S, MTP/N-gram; eventuale grafico delle fasi e token selezionati in modo comparabile. TODO sulle prestazioni riportate oralmente.

## Slide 25 — P3: il limite della copertura del piano

**Messaggio centrale:** Una difformità aggiuntiva può essere visibile ma non segnalata se il piano non la cerca.

### Testo da pronunciare

Finora mi sono concentrato sulla verifica delle condizioni che compongono l'intended path. Ho però voluto svolgere anche una valutazione **trasversale** rispetto al focus principale della tesi, introducendo le perturbazioni **P3**: situazioni nelle quali compare una scorciatoia o una possibilità non prevista dal progettista, mentre il percorso documentato può continuare a funzionare.

Le P3 sono state analizzate separatamente proprio perché richiedono una capacità diversa dalla semplice verifica dei passaggi descritti nel piano. Nel benchmark principale ho effettuato **20 esecuzioni P3**; in **quattro casi** è stato emesso un ticket, e tutte le segnalazioni hanno riguardato **Citadel**, il cui piano conteneva controlli indirettamente pertinenti alla modifica.

Questo **20% non può essere interpretato come una recall del rilevamento delle scorciatoie**: le evidenze non permettono di stabilire con certezza che tutte le segnalazioni siano state causate dalla scorciatoia stessa.

Un caso più immediato per comprendere il limite è **NetVault**. Qui avevo aggiunto un record DNS TXT denominato `vault-internal`. Durante il test l'Executor ha effettivamente eseguito il trasferimento della zona DNS e ha ricevuto anche quel record aggiuntivo. Il Golden Plan, però, chiedeva di verificare la **presenza** dei record previsti, non l'**assenza** di ulteriori record inattesi. Il test è quindi terminato con `COMPLETED`, senza generare alcuna segnalazione.

Il punto è che **un'informazione può essere presente nelle evidenze e non essere riconosciuta come difformità se il piano non contiene il controllo necessario**. Non è una confutazione del risultato ottenuto sulle P1 e P2, ma rappresenta un limite reale della copertura: il conformance testing verifica ciò che è stato definito, mentre la ricerca autonoma di percorsi non previsti richiede un'attività esplorativa diversa.

### Indicazione visiva provvisoria — non da leggere

> 4 ticket su 20 run P3 non è recall; caso NetVault TXT vault-internal come evidenza concreta. Qui non proporre ancora il testing esplorativo futuro.


---

# Blocco 4 — Conclusioni e sviluppi futuri

## Slide 26 — Che cosa abbiamo realizzato e cosa mostrano i risultati

**Messaggio centrale:** Ritornare al problema originario, dare una sintesi equilibrata del contributo e dei limiti.

### Testo da pronunciare

Ricapitolando, siamo partiti da un problema concreto: con VulcAIn possiamo automatizzare buona parte della generazione di una macchina didattica vulnerabile, ma questo non dimostra automaticamente che la challenge rispetti il percorso formativo progettato.

Il contributo della mia tesi è stato **progettare, implementare e valutare VulcaTest**, un framework dedicato proprio a questa verifica. Abbiamo visto come il sistema utilizzi componenti agentiche per interpretare gli output e interagire con il target, ma anche come ne governi il comportamento attraverso un piano, regole di orchestrazione, strumenti selezionati e raccolta delle evidenze.

Quando viene individuata una difformità, il workflow può inoltre tentare una correzione dei sorgenti, ricostruire la macchina e ripetere il test, mantenendo invariati i criteri di verifica.

La valutazione sperimentale ha mostrato che, nelle condizioni considerate, il framework riesce in molti casi a completare i piani di verifica, segnalare alterazioni dell'intended path e produrre correzioni tecnicamente valide, che possono poi essere sottoposte a un re-test completo.

Allo stesso tempo, i risultati hanno chiarito alcuni limiti. La riuscita dipende dalla qualità e dalla copertura dell'Attack Plan, oltre che dal comportamento degli agenti e degli strumenti utilizzati. In particolare, le perturbazioni P3 hanno mostrato che possono esistere scorciatoie o comportamenti non previsti che un controllo vincolato al piano non segnala.

Questa distinzione ci permette di interpretare il contributo in modo preciso: **VulcaTest automatizza una verifica mirata della conformità del percorso didattico; non sostituisce una valutazione esaustiva della sicurezza dell'intera macchina**.

### Indicazione visiva provvisoria — non da leggere

> Riprendere la mappa generale del workflow, senza il dettaglio di ogni nodo. Evitare altre batterie di metriche.

## Slide 27 — Due sviluppi futuri

**Messaggio centrale:** Dal limite P3 all’esplorazione autonoma, e dalla modularità all’integrazione completa con GUI.

### Testo da pronunciare

Proprio a partire da questi risultati vedo due possibili direzioni di sviluppo.

La prima è **affiancare alla verifica dell'intended path una componente di testing esplorativo**, capace di cercare comportamenti indesiderati, configurazioni non previste e possibili scorciatoie anche quando non sono già descritti nella checklist. Sarebbe una capacità complementare, da mantenere distinta dalla verifica di conformità.

La seconda è completare **l'orchestrazione end-to-end dell'ecosistema VulcAIn**, collegando generazione, distribuzione, verifica e possibile correzione in un unico processo, accompagnato da un'**interfaccia grafica** per avviare le attività, seguirne lo svolgimento e consultare risultati ed evidenze.

La modularità dell'architettura di VulcaTest, già realizzata, offre una base per lavorare in queste direzioni senza dover ripensare da zero tutte le componenti.

### Indicazione visiva provvisoria — non da leggere

> Solo due direzioni “Testing esplorativo” e “Pipeline end-to-end + GUI”. Modularità come proprietà attuale, non terza direzione.

## Slide 28 — Chiusura: il percorso conta quanto root

**Messaggio centrale:** Chiudere con il contributo effettivamente realizzato, non solo con le prospettive mancanti.

### Testo da pronunciare

Vorrei chiudere tornando al punto da cui siamo partiti. **Il problema non è costruire un agente capace semplicemente di ottenere i privilegi di root**: è verificare che una macchina vulnerabile permetta davvero di seguire il percorso didattico che il suo progettista aveva previsto.

Con VulcaTest ho cercato di trasformare questa esigenza in un **processo controllato e verificabile**, capace di raccogliere evidenze, segnalare difformità e tentare il ripristino della challenge, valutandone sperimentalmente i risultati e i limiti.

Vi ringrazio per l'attenzione. Sono a disposizione per eventuali domande.

### Indicazione visiva provvisoria — non da leggere

> Riprendere visualmente il percorso formativo o usare una chiusura molto semplice con ringraziamenti; niente slogan.

---

# Promemoria per la prossima revisione

Questi punti **non** sono parte del parlato né del contenuto definitivo delle slide.

1. **Ritmo e numero di slide:** le 28 unità derivano dalla necessità di conservare integralmente la narrazione. Cronometrare lo script ad alta voce e valutare fusioni/tagli per raggiungere i 20 minuti; non trattare le 28 slide come vincolo.
2. **Pizzeria storica:** il materiale autentico è stato recuperato. Usare la chat difettosa nel blocco 1 e il prima/dopo nel blocco 2 soltanto dopo aver verificato che cosa mostrano effettivamente gli screenshot e l’intervento; non equiparare alla perturbazione formale P1-01.
3. **Estratto del piano:** per la slide 09 utilizzare un estratto reale di Attack Plan, non un esempio sintetico fatto passare per originale.
4. **E1, E2, E3:** non attribuire a un singolo nodo l’esito dell’intero workflow. Golden Plan spiegato nella slide 19 per isolare la variabilità della pianificazione in E2; preparato e validato già durante la ground truth.
5. **Benchmark:** E1 20/24 COMPLETED; E2 P1/P2 TP 38, FN 2, FP 1, TN 23, recall 95%, precision 97,44%, F1 96,20%; E3 35/36 patch valide, 33/36 re-test COMPLETED. Le 36 sessioni E3 sono comprese nell’insieme E2 (108 run complessive = 24 E1 + 84 E2).
6. **P3:** 4 ticket su 20 run non equivale a 20% di recall delle scorciatoie. Chiudere il blocco sperimentale con il limite di copertura e riprenderlo solo nel blocco 4 per il testing esplorativo.
7. **Prestazioni e consumi:** TODO per verificare circa 45 token/s e finestra fino a 40k con log/configurazione; selezionare in maniera metodologicamente comparabile i contatori Qwen e Antigravity. E1 non ha un conteggio affidabile dei token del Planner.
8. **Costi API:** se si decide di includere la stima, dichiararla come esercizio ipotetico fondato su prezzi verificati, non una spesa effettiva o un confronto prestazionale.
9. **Ruolo delle componenti:** VulcAIn, HexStrike e Antigravity preesistenti; VulcaTest, controller, Bridge/Terminal Gateway e integrazione come lavoro della tesi. Visione esterna/interna è riferita alla macchina target.
10. **Prossimo deliverable, distinto da questo:** specifica delle slide *effettive* con parole chiave da proiettare, grafici, figure autentiche, composizione e eventuali animazioni. Nessun layout finale viene fissato in questa versione.
