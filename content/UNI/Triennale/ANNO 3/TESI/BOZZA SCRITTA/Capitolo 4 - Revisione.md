# 4 Il self-healing closed-loop in VulcaTest

Il solo rilevamento di una non conformità lascia ancora all'operatore il compito di correggere i sorgenti della macchina e di verificarla di nuovo. Per chiudere questo ciclo VulcaTest include un nodo di healing, che parte dalla diagnosi del Final Evaluator, interviene sui sorgenti della macchina, la ricostruisce e avvia un nuovo test (Figura 4).

La correzione è delegata a un harness agentico esterno, mentre il codice di VulcaTest gestisce il ciclo che la circonda, dalla delimitazione delle modifiche alla verifica del risultato. Questa separazione permette di sostituire l'agente di healing senza modificare il resto del workflow.

![[Pasted image 20261008103606.png]]

*[Figura 4: Ciclo di self-healing di VulcaTest — mantenere la figura già presente nel documento LaTeX.]*

## 4.1 Il nodo di healing nel workflow closed-loop

Il nodo di healing aggiunge al workflow una fase di analisi e possibile correzione, successiva a un test fallito. Test e correzione restano due attività separate, poiché richiedono modalità di accesso all'ambiente e prospettive differenti:

- **L'Executor lavora in-band:** parte dalla macchina Kali e interagisce soltanto con i servizi esposti dal target. Non accede ai file usati per generare la macchina, perché queste informazioni non sarebbero disponibili a un utente che affronta la challenge.
- **Il nodo di healing lavora invece out-of-band:** interviene sui sorgenti della macchina, cioè sulla ricetta IaC da cui viene generata e sugli eventuali sorgenti applicativi dedicati.

Questa distinzione riguarda anche le responsabilità delle due componenti. Il nodo di healing può modificare i sorgenti della macchina, ma non i criteri con cui VulcaTest stabilisce la conformità. L'Executor può verificare la macchina, ma non correggerla durante il test.

Il nodo healer completa il grafo descritto nella Sezione 3.5. Viene attivato dopo il Final Evaluator se il test è fallito, il self-healing è abilitato e restano tentativi di correzione disponibili. Se l'agente produce una modifica valida e la ricostruzione della macchina riesce, il controllo torna al nodo orchestrator e il test riparte dall'inizio con lo stesso Attack Plan.

## 4.2 Il ticket di healing

La diagnosi prodotta dal Final Evaluator arriva al nodo di healing sotto forma di ticket, un file JSON generato quando uno step termina con esito FAILED (Sezione 3.8). Il ticket indica lo step in cui il test si è bloccato, il tipo di difetto, la parte della macchina coinvolta, una descrizione del problema e una correzione suggerita (*recommended patch*).

Il controller Python che gestisce il nodo di healing non inserisce il contenuto del ticket nel prompt, ma indica all'agente di healing i percorsi dei file da consultare, tra cui il ticket e il report del test. È l'agente ad aprirli e a decidere quali altri file esaminare.

Il ticket va letto tenendo conto di come è stato prodotto. Il Final Evaluator conosce soltanto le evidenze raccolte dall'Executor, cioè ciò che si osserva dall'esterno della macchina, e anche la correzione suggerita nasce da questa prospettiva. Il punto in cui l'errore viene rilevato può quindi non coincidere con l'origine del difetto. Una risposta HTTP errata o un servizio non disponibile, ad esempio, possono dipendere da un task di provisioning non eseguito o da una configurazione generata in modo sbagliato. Per lo stesso motivo anche il tipo di difetto indicato nel ticket va confermato sui sorgenti (Sezione 3.8), e se l'agente di healing non trova difetti la sessione termina senza modifiche (Sezione 4.5).

## 4.3 L'agente di healing: delega a un harness agentico

La fase di healing richiede capacità diverse da quelle del conformance testing. Mentre l'Executor interagisce con un target già costruito, seguendo gli obiettivi e i vincoli definiti nell'Attack Plan, l'agente di healing deve esplorare i sorgenti del progetto, individuare le possibili cause del problema e applicare modifiche che possono coinvolgere file e componenti differenti. Gli interventi possono riguardare la ricetta IaC, i sorgenti applicativi o la creazione di file mancanti, come una pagina PHP o uno script richiesto dalla challenge.

Queste attività richiedono un grado di autonomia diverso da quello consentito durante il test. Nel conformance testing, la libertà operativa degli harness general-purpose rappresentava una criticità, poiché rendeva difficile imporre il rispetto dell'intended path e il controllo delle condizioni di avanzamento (Sezione 3.1). Nella fase di healing, invece, non è possibile stabilire in anticipo quali file debbano essere modificati o quali strumenti siano necessari. Gli harness agentici orientati allo sviluppo software sono progettati per affrontare attività di esplorazione, analisi e modifica del codice, e risultano quindi adatti a questo compito. Per questo la correzione dei sorgenti è affidata a Google Antigravity [11], con il modello Gemini 3.8 Flash e reasoning High.

L'integrazione avviene attraverso la CLI di Antigravity (`agy`), avviata dal nodo healer come sottoprocesso Python in modalità non interattiva. L'obiettivo della correzione viene trasmesso attraverso il comando `/goal`, che consente all'agente di lavorare autonomamente sui file del progetto. La sessione è configurata per applicare direttamente le modifiche senza richiedere conferme sui permessi. Gli eventi prodotti vengono raccolti in tempo reale in formato JSON, insieme alle informazioni sui token consumati e sui tool utilizzati.

L'autonomia dell'agente non si estende tuttavia al controllo del workflow. Il suo comportamento è guidato dal prompt dedicato (Sezione 4.4), mentre VulcaTest mantiene la responsabilità di verificare le modifiche e gestire le fasi successive (Sezione 4.5). La dipendenza da Antigravity resta così confinata alla componente di correzione, che può essere sostituita senza modificare il resto del workflow.

## 4.4 Prompt dell'agente di healing e perimetro di modifica

Come per le componenti descritte nella Sezione 3.9, anche il comportamento dell'agente di healing è guidato da un prompt dedicato. A differenza di quello dell'Executor, il prompt non impone una sequenza prestabilita di operazioni: la correzione da applicare non è nota in anticipo e può richiedere interventi differenti. Le istruzioni non descrivono quindi come correggere la macchina, ma stabiliscono i vincoli entro cui l'agente può operare.

Il prompt impone cinque vincoli:

1. **Modifica minima:** la correzione interessa soltanto ciò che serve a risolvere la non conformità.
2. **Nessun leakage didattico:** la modifica non deve introdurre suggerimenti, credenziali in chiaro o altre informazioni che semplifichino la challenge.
3. **Preservazione delle vulnerabilità previste:** ciò che un agente di coding tratterebbe come un problema di sicurezza, ad esempio una SQL injection, un binario SUID o una configurazione sudo debole, può far parte del percorso didattico e non va corretto.
4. **Nessuna modifica arbitraria:** se l'analisi non individua un difetto nei sorgenti, l'agente termina senza applicare una patch.
5. **Modifiche limitate alla macchina interessata:** l'agente può intervenire soltanto sui sorgenti autorizzati della challenge corrente, senza modificare altre macchine o componenti del progetto.

Oltre a questi vincoli, il prompt distingue il perimetro di lettura da quello di scrittura. L'agente può leggere l'intero workspace, perché per risalire all'origine del difetto deve confrontare documentazione, report del test e sorgenti. Può invece modificare soltanto i sorgenti della macchina corrente, cioè la ricetta da cui VulcaForge la genera e gli eventuali sorgenti applicativi dedicati.

La documentazione della challenge e il report di VulcaTest restano in sola lettura. Lo stesso vale per i file che VulcaForge genera dalla ricetta, come il Dockerfile e il playbook Ansible: vengono ricreati a ogni generazione e una modifica applicata lì andrebbe persa. Il codice di VulcaTest, le altre challenge e l'ambiente host non possono essere modificati.

Ogni tentativo di correzione avvia una nuova sessione dell'agente, che non conserva il contesto dei tentativi precedenti. Le modifiche ai sorgenti vengono invece mantenute, mentre le informazioni necessarie a proseguire vengono salvate sul filesystem e indicate nel prompt.

Il feedback fornito all'agente dipende dall'esito del tentativo precedente:

- **Fallimento della ricostruzione:** se la modifica provoca un errore nel build Docker o nell'esecuzione del playbook Ansible, il nuovo ambiente non viene avviato e l'errore viene salvato in `BUILD_ERROR.md`. Se restano tentativi disponibili, viene avviata una nuova sessione di healing: il contenuto del file viene inserito all'inizio del prompt e l'agente deve prima risolvere il problema di ricostruzione.
- **Fallimento del test:** se la ricostruzione riesce ma il nuovo test fallisce, l'agente riceve il report aggiornato, che descrive il comportamento della macchina dopo la modifica.

## 4.5 Tracciamento e validazione delle modifiche

Come per gli step del test, anche nella fase di healing ciò che l'agente dichiara di aver fatto non viene preso come prova del risultato. Il controller confronta lo stato dei file prima e dopo la sessione e salva le modifiche effettuate come evidenza.

Il tracciamento delle modifiche è implementato in un modulo Python. Prima dell'avvio dell'agente viene registrato lo stato dei file del repository di VulcaForge e viene salvata una copia dei sorgenti della macchina, usata come riferimento e per eventuali ripristini. Al termine della sessione il filesystem viene confrontato con lo snapshot iniziale. Dal confronto vengono prodotti `patch.diff`, che contiene le differenze riga per riga, e `HEALING_REPORT.md`, che elenca i file modificati. Il diff permette anche di misurare l'ampiezza della patch, una delle metriche usate nel Capitolo 5.

Il perimetro definito nella Sezione 4.4 è inizialmente affidato alle istruzioni del prompt, poiché l'agente dispone dei permessi necessari per scrivere nell'intero workspace. Il suo rispetto viene quindi controllato dal codice al termine della sessione. Se l'agente ha scritto fuori dal perimetro, le modifiche esterne vengono annullate ripristinando lo stato dello snapshot, prima che la macchina venga ricostruita. I file coinvolti vengono elencati in `PERIMETER_VIOLATIONS.md`, così il tentativo resta documentato anche se i suoi effetti sono stati annullati.

Il codice di uscita dell'agente da solo non basta a capire se sia stata applicata una correzione. Per questo l'esito della sessione viene classificato in base alle modifiche rilevate sul filesystem e all'esito dell'agente:

- **PATCHED:** almeno una modifica rilevata all'interno del perimetro autorizzato.
- **DECLINED:** la sessione termina senza errori, ma senza modifiche ai sorgenti autorizzati.
- **OUT_OF_SCOPE:** tutte le modifiche rilevate erano fuori dal perimetro e sono state annullate.
- **ERROR:** l'harness termina con un errore o supera il tempo massimo.

La classificazione determina anche il passo successivo. Solo nel caso `PATCHED` viene avviata la ricostruzione della macchina e, se questa riesce, un nuovo test. Negli altri casi non c'è nessuna modifica da verificare e il workflow termina.

## 4.6 Chiusura del ciclo: ricostruzione dell'ambiente e riverifica della conformità

Una modifica ai sorgenti non basta a considerare risolta la non conformità. La macchina deve essere ricostruita a partire dai sorgenti modificati e deve superare un nuovo test.

Dopo la modifica, il nodo di healing richiama il generatore di VulcaForge, che traduce la ricetta aggiornata in un nuovo Dockerfile e in un nuovo playbook Ansible. L'immagine viene poi compilata sulla macchina Kali attraverso il Terminal Gateway. Il controller monitora l'output della compilazione e ne riconosce il completamento attraverso un messaggio di conferma, senza basarsi su un tempo di attesa fisso. È comunque previsto un timeout massimo configurabile, per evitare che un'eventuale compilazione bloccata provochi un'attesa indefinita.

Se la compilazione fallisce, l'errore viene salvato in `BUILD_ERROR.md` (Sezione 4.4) e il nuovo test non viene avviato.

Se il build riesce, il container precedente viene sostituito da uno nuovo, avviato dall'immagine appena compilata. Il suo indirizzo IP viene recuperato e salvato nello stato condiviso come nuovo target.

Il test non riparte dallo step fallito, ma dall'inizio dell'Attack Plan. Una modifica che risolve lo step fallito potrebbe aver alterato un passaggio precedente, per questo l'esito della correzione viene valutato sull'intera macchina, con gli stessi criteri del test iniziale.

Nella ricostruzione può anche verificarsi un guasto degli strumenti di test, come una disconnessione del Terminal Gateway o il mancato recupero dell'indirizzo IP del container. Questo caso viene tenuto distinto da un errore di compilazione: il guasto è registrato nello stato come errore dell'infrastruttura e riportato in `run_summary.json`. Senza questa distinzione, un nuovo test lanciato contro un container non raggiungibile verrebbe registrato come una non conformità della macchina, mentre il problema riguarda lo strumento di test.

Il numero di tentativi di healing è limitato da un parametro configurabile, per evitare cicli indefiniti di correzione e verifica. Una volta raggiunto il limite, il workflow termina senza avviare ulteriori interventi.

Con questa fase il ciclo si chiude: una non conformità può essere diagnosticata, corretta sui sorgenti e verificata di nuovo con gli stessi criteri. Il Capitolo 5 valuta separatamente le prestazioni del test, della diagnosi e della correzione.
