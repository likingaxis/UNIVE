# 1 Introduzione

## 1.1 Il problema: verificare macchine vulnerabili generate automaticamente

Le Cyber Range sono ambienti utilizzati per la formazione e l'addestramento in cybersecurity, nei quali è possibile esercitarsi attraverso scenari che riproducono vulnerabilità e tecniche di attacco. Tra questi rientrano le macchine didattiche vulnerabili, progettate per essere compromesse seguendo un percorso di attacco che permette allo studente di applicare le conoscenze acquisite in un contesto controllato.

La realizzazione di queste macchine richiede attività di progettazione, configurazione e distribuzione, che possono essere automatizzate attraverso strumenti dedicati. In questo contesto si inserisce VulcAIn, un ecosistema che automatizza il processo di generazione degli scenari didattici. La pipeline originale, tuttavia, non comprende una fase di verifica automatica delle macchine prodotte. Il controllo del loro corretto funzionamento e la correzione degli eventuali difetti rimangono quindi attività affidate all'operatore.

La corretta generazione e distribuzione di una macchina non garantisce che tutte le vulnerabilità previste siano effettivamente sfruttabili. Eventuali errori possono compromettere singoli passaggi dell'*intended path*, ossia il percorso di attacco progettato per lo studente. Verificarne il funzionamento è quindi essenziale per assicurare che la macchina rispetti gli obiettivi didattici per cui è stata realizzata.

La presente tesi affronta questo problema introducendo VulcaTest, un framework agentico che automatizza la verifica dell'*intended path* e integra un processo di *self-healing* per intervenire sui difetti rilevati. Il lavoro si concentra quindi sulla conformità del percorso previsto, considerata prioritaria per garantire il corretto funzionamento didattico delle macchine.

## 1.2 Obiettivi e contributi della tesi

L'obiettivo della tesi è progettare, implementare e valutare sperimentalmente VulcaTest, un framework agentico per la verifica della conformità delle macchine didattiche vulnerabili rispetto all'*intended path* e per il ripristino dei difetti individuati attraverso un processo di *self-healing*.

Il contributo principale è la progettazione e l'implementazione di VulcaTest, sia nella sua architettura di orchestrazione sia nelle componenti agentiche e negli strumenti che ne permettono il funzionamento. Il framework integra queste componenti con logiche di controllo deterministiche, coordinando le attività di pianificazione, esecuzione e valutazione dei test. Il Planner genera un Attack Plan strutturato a partire dalla documentazione della macchina, mentre l'Executor ne verifica i passaggi attraverso l'interazione con l'ambiente di test. Il Final Evaluator analizza gli esiti e le evidenze raccolte per individuare eventuali difformità.

Il framework integra inoltre un processo di *self-healing* che, a partire dai difetti rilevati, permette di intervenire sui sorgenti della macchina, ricostruirla e sottoporla a una nuova verifica. In questo modo, il testing e il ripristino vengono collegati in un unico workflow, nel quale è possibile valutare anche l'esito delle correzioni effettuate.

Un'altra caratteristica centrale di VulcaTest è la modularità dell'architettura, che mantiene separati il coordinamento del workflow, le componenti agentiche e gli strumenti di esecuzione. Questa organizzazione è stata scelta per rendere il sistema più flessibile, consentendo di sostituire i modelli linguistici, modificare i componenti o ampliare gli strumenti disponibili senza intervenire sull'intera architettura.

Il lavoro comprende infine una valutazione sperimentale basata su macchine di riferimento e perturbazioni controllate, finalizzata a esaminare la generazione degli Attack Plan, il rilevamento delle non conformità e l'efficacia del *self-healing*. Sono state inoltre condotte prove su quattro macchine non utilizzate durante lo sviluppo, per osservare il comportamento del framework su scenari aggiuntivi e identificarne i limiti.

## 1.3 Struttura della tesi

La tesi è organizzata in sei capitoli. Dopo questa introduzione, il Capitolo 2 presenta il contesto delle Cyber Range e delle macchine didattiche vulnerabili, approfondendo il concetto di conformità rispetto all'*intended path*, l'ecosistema VulcAIn e i principali paradigmi agentici di riferimento. Su queste basi, il Capitolo 3 descrive la progettazione e l'implementazione di VulcaTest, illustrandone l'architettura e il funzionamento delle componenti. Il Capitolo 4 approfondisce il processo di *self-healing*, dalla gestione dei difetti individuati fino alla ricostruzione e alla riverifica della macchina. Il lavoro prosegue con il Capitolo 5, dedicato alla metodologia sperimentale e all'analisi dei risultati, attraverso cui vengono valutate le capacità e i limiti del framework. Infine, il Capitolo 6 raccoglie le conclusioni del lavoro e ne discute i possibili sviluppi futuri.
