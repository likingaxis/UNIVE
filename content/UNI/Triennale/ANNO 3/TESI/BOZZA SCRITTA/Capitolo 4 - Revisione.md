# Capitolo 4 — Il self-healing closed-loop in VulcaTest

VulcaTest permette di rilevare una non conformità e di raccogliere le evidenze che ne descrivono la causa. Il solo rilevamento, però, lascia ancora all’operatore il compito di intervenire sui sorgenti della macchina e di verificare nuovamente il risultato.

Per chiudere questo ciclo VulcaTest include un nodo di healing, che parte dalla diagnosi del Final Evaluator, corregge i sorgenti Infrastructure as Code della macchina, la ricostruisce e avvia un nuovo test.

## 4.1 Il nodo di healing nel workflow closed-loop

Il nodo di healing aggiunge al workflow una fase di correzione, successiva al rilevamento di una non conformità. Test e correzione restano due attività separate, con accessi all’ambiente e responsabilità differenti.

### 4.1.1 Separazione tra verifica e correzione

Affidare la correzione allo stesso agente che esegue il test mescolerebbe due compiti che richiedono punti di vista differenti.

L’Executor lavora **in-band**: parte dalla macchina Kali e interagisce soltanto con i servizi esposti dal target. Non accede ai file usati per generare la macchina, perché queste informazioni non sarebbero disponibili a un utente che affronta la challenge.

Il nodo di healing lavora invece **out-of-band** sui sorgenti dell’infrastruttura, cioè sui file da cui la macchina viene generata: ricette, playbook Ansible, Dockerfile e sorgenti applicativi.

La separazione mantiene anche indipendenti verifica e correzione. Il nodo di healing può modificare i sorgenti, ma non i criteri con cui VulcaTest stabilisce la conformità. L’Executor può verificare la macchina, ma non correggerla durante il test.

### 4.1.2 Posizione del nodo nel grafo

Il nodo `healer` completa lo `StateGraph` descritto nella Sezione 3.5.2. Viene attivato dopo il Final Evaluator se la run non è conforme, se il self-healing è abilitato e se restano tentativi di correzione disponibili. Dopo l’intervento il flusso torna all’Orchestrator e il test riparte con lo stesso Attack Plan (Figura 4.1).

> [Figura 4.1 — Excalidraw: schema leggero del grafo con il nodo `healer` evidenziato e il ritorno all’Orchestrator.]

## 4.2 Il ticket di healing

La diagnosi prodotta dal Final Evaluator arriva al nodo di healing sotto forma di ticket di healing, un file JSON generato quando la run non è conforme (Sezione 3.8.2). Il ticket contiene diverse informazioni utili alla correzione, come lo step in cui il test si è bloccato, il tipo di difetto, il componente coinvolto, una descrizione del problema e una correzione suggerita (_recommended patch_).

Il controller non inserisce il contenuto del ticket nel prompt, ma indica all’agente di healing i percorsi dei file da consultare, tra cui il ticket e il report del test. È l’agente ad aprirli e a decidere quali altri file esaminare.

Il ticket va però letto tenendo conto di come è stato prodotto. Il Final Evaluator conosce soltanto le evidenze raccolte dall’Executor, cioè ciò che si osserva dall’esterno della macchina, e anche la correzione suggerita nasce da questa prospettiva. Il punto in cui l’errore viene rilevato può quindi non coincidere con l’origine del difetto. Una risposta HTTP errata o un servizio non disponibile, ad esempio, possono dipendere da un task di provisioning non eseguito o da una configurazione generata in modo sbagliato (Figura 4.2).

> [Figura 4.2 — Excalidraw: a sinistra l’errore rilevato e il ticket (vista dall’esterno), al centro la catena delle dipendenze, a destra l’origine del difetto nei sorgenti.]

## 4.3 L’agente di healing: delega a un harness agentico

La fase di healing richiede capacità diverse da quelle del conformance testing. L’Executor interagisce con un target già costruito, entro i vincoli definiti dal `TestStep`, dalla checklist e dai tool disponibili. L’agente di healing deve invece navigare i sorgenti del progetto, mettere in relazione file differenti e applicare modifiche di natura molto varia. Può trattarsi di correggere un task Ansible o un Dockerfile, ma anche di generare file mancanti, come una pagina PHP o uno script richiesto dalla challenge.

### 4.3.1 Uso di un harness generico nella fase di correzione

Nel collaudo un harness general-purpose è stato scartato perché lascia all’agente troppa libertà (Sezione 3.1.2). Nella correzione questa libertà diventa utile. Non si può stabilire in anticipo quali file andranno modificati o quali strumenti serviranno, e un harness generico mette a disposizione del modello gli strumenti per esplorare il repository e intervenire dove serve.

Per questo la modifica dei sorgenti è affidata a Google Antigravity [@googleantigravity2026], con il modello Gemini 3.8 Flash e reasoning impostato su High. Anche questo nodo potrebbe usare un modello locale, ma i modelli eseguibili sull’hardware disponibile (Sezione 3.10.1) hanno capacità limitate nella scrittura e correzione di codice, mentre i modelli di frontiera sono ottimizzati proprio per questo tipo di compito.

La libertà dell’agente resta comunque delimitata dalle regole del prompt (Sezione 4.4) e dai controlli che il codice applica alle modifiche (Sezione 4.5).

### 4.3.2 Integrazione con Antigravity CLI

Il nodo `healer` avvia la CLI di Antigravity (`agy`) come sottoprocesso Python, in modalità non interattiva. L’obiettivo della correzione viene passato nel prompt con il comando `/goal`, una funzione di Antigravity che permette all’agente di perseguire un obiettivo in autonomia. L’agente è configurato per applicare le modifiche direttamente sui file e per non chiedere conferme sui permessi, così la sessione prosegue senza l’intervento di un operatore. Gli eventi della sessione arrivano in tempo reale in formato JSON e vengono registrati, compresi i token consumati e i tool usati.

La dipendenza da Antigravity è confinata a questo livello. Le fasi successive non dipendono dall’harness usato.

## 4.4 Prompt dell’agente di healing e perimetro di modifica

Come per i componenti descritti nella Sezione 3.9, anche il comportamento dell’agente di healing è delimitato da un prompt dedicato. Rispetto a quello dell’Executor, il prompt è meno rigido. L’agente non segue un piano diviso in step con una checklist da soddisfare, perché la correzione da applicare non è nota in anticipo e può richiedere interventi molto diversi tra loro. Il prompt non descrive come correggere la macchina, ma fissa le regole entro cui l’agente può muoversi.

Una di queste regole dipende da una caratteristica delle macchine didattiche. Alcune configurazioni che un agente di coding potrebbe interpretare come problemi di sicurezza sono in realtà vulnerabilità previste dalla challenge e devono essere preservate.

### 4.4.1 Vincoli di riparazione e preservazione delle vulnerabilità didattiche

Il prompt impone all’agente cinque vincoli:

1. **Modifica minima.** La correzione interessa soltanto ciò che serve a risolvere la non conformità.
2. **Nessun leakage didattico.** La modifica non deve introdurre suggerimenti, credenziali in chiaro o altre informazioni che semplifichino la challenge.
3. **Preservazione delle vulnerabilità previste.** Vulnerabilità come SQL injection, binari SUID o configurazioni `sudo` deboli possono far parte del percorso didattico e non vanno corrette.
4. **Nessuna modifica arbitraria.** Se l’analisi non individua un difetto nei sorgenti, l’agente termina senza applicare una patch.
5. **Esplorazione limitata alla macchina interessata.** Ricerche e modifiche restano sui file della challenge corrente.

### 4.4.2 Perimetro di lettura e scrittura

L’agente può leggere l’intero workspace, perché per risalire all’origine del difetto deve confrontare documentazione, report del test e sorgenti. Può invece scrivere soltanto sui sorgenti della macchina corrente, cioè la ricetta da cui VulcaForge la genera e gli eventuali sorgenti applicativi dedicati.

La documentazione della challenge e il report di VulcaTest restano in sola lettura. Lo stesso vale per i file che VulcaForge genera dalla ricetta, come il Dockerfile e il playbook Ansible: vengono ricreati a ogni generazione e una modifica applicata lì andrebbe persa. Il codice di VulcaTest, le altre challenge e l’ambiente host non possono essere modificati.

### 4.4.3 Feedback tra tentativi successivi

Ogni tentativo di correzione avvia una nuova sessione dell’agente, che non conserva il contesto dei tentativi precedenti. Le informazioni da trasmettere da un tentativo al successivo vengono salvate sul filesystem e indicate nel prompt.

Il feedback è di due tipi. Se la modifica impedisce la compilazione, per un errore nel build Docker o nell’esecuzione del playbook Ansible, la macchina non viene avviata e l’errore viene salvato in `BUILD_ERROR.md`. Al tentativo successivo il contenuto del file viene inserito all’inizio del prompt, e l’agente deve rendere di nuovo compilabile la macchina prima di occuparsi della non conformità.

Se invece la compilazione riesce ma il nuovo test fallisce, l’agente riceve il report aggiornato, che descrive il comportamento della macchina dopo la modifica.

## 4.5 Tracciamento e validazione delle modifiche

Come per gli step del test, anche nella fase di healing ciò che il modello dichiara di aver fatto non viene preso come prova del risultato. Il controller confronta lo stato dei file prima e dopo la sessione e salva le modifiche effettuate come evidenza.

### 4.5.1 Snapshot e registrazione delle modifiche

Il tracciamento è implementato nel modulo `diff_tracker.py`. Prima dell’avvio dell’agente viene registrato lo stato dei file del repository di VulcaForge e viene salvata una copia dei sorgenti della macchina, usata come riferimento e per eventuali ripristini.

Al termine della sessione il filesystem viene confrontato con lo snapshot iniziale. Dal confronto vengono prodotti `patch.diff`, che contiene le differenze riga per riga, e `HEALING_REPORT.md`, che elenca i file modificati. Il diff permette anche di misurare l’ampiezza della patch, una delle metriche usate nel Capitolo 5.

### 4.5.2 Verifica del perimetro di scrittura

Lo stesso confronto mostra se l’agente ha scritto fuori dal perimetro definito nella Sezione 4.4.2. In questo caso le modifiche esterne vengono annullate ripristinando lo stato dello snapshot, prima che la macchina venga ricostruita. I file coinvolti vengono elencati in `PERIMETER_VIOLATIONS.md`, così il tentativo resta documentato anche se i suoi effetti sono stati annullati.

### 4.5.3 Classificazione dell’intervento

L’esito della sessione viene classificato in base alle modifiche rilevate sul filesystem e all’esito dell’agente:

- `PATCHED`: almeno una modifica valida all’interno del perimetro.
- `DECLINED`: la sessione termina senza errori, ma senza modifiche ai sorgenti autorizzati.
- `OUT_OF_SCOPE`: tutte le modifiche rilevate erano fuori dal perimetro e sono state annullate.
- `ERROR`: l’harness termina con un errore o supera il tempo massimo.

Il codice di uscita dell’agente da solo non basta a capire se sia stata applicata una correzione. La classificazione determina anche il passo successivo. Solo nel caso `PATCHED` la macchina viene ricostruita e testata di nuovo. Negli altri casi non c’è nessuna modifica da verificare e il workflow termina.

## 4.6 Chiusura del ciclo: rebuild dell’ambiente e regression testing

Una modifica ai sorgenti non basta a considerare risolta la non conformità. La macchina deve essere ricostruita a partire dai sorgenti corretti e deve superare un nuovo test (Figura 4.3).

> [Figura 4.3 — Excalidraw: modifica dei sorgenti → generazione del bundle → build → nuovo container → nuovo test. In caso di errore di build, ritorno al tentativo successivo con `BUILD_ERROR.md`.]

### 4.6.1 Generazione del bundle e build dell’immagine

Dopo la modifica, il nodo di healing richiama il generatore di VulcaForge, che traduce la ricetta aggiornata in un nuovo Dockerfile e in un nuovo playbook Ansible. L’immagine viene poi compilata sulla macchina Kali attraverso il Terminal Gateway, e il controller considera concluso il build solo quando nell’output compare un messaggio di conferma stampato al termine della compilazione. In questo modo non serve fissare un timeout: il controller attende il tempo effettivamente richiesto dalla compilazione, che varia da una macchina all’altra.

Se la compilazione fallisce, l’errore viene salvato in `BUILD_ERROR.md` (Sezione 4.4.3) e il nuovo test non viene avviato.

### 4.6.2 Ricreazione dell’ambiente e regression testing

Se il build riesce, il container precedente viene sostituito da uno nuovo, avviato dall’immagine appena compilata. Il suo indirizzo IP viene recuperato e salvato nello stato condiviso come nuovo target.

Il test non riparte dallo step fallito, ma dall’inizio dell’Attack Plan. Una modifica che risolve lo step fallito potrebbe aver alterato un passaggio precedente, per questo l’esito della correzione viene valutato sull’intera macchina, con gli stessi criteri del test iniziale.

Nella ricostruzione può anche verificarsi un guasto degli strumenti di test, come una disconnessione del Terminal Gateway o il mancato recupero dell’indirizzo IP del container. Questo caso viene tenuto distinto da un errore di compilazione: il guasto è registrato nello stato come errore dell’infrastruttura e riportato in `run_summary.json`. Senza questa distinzione, un nuovo test lanciato contro un container non raggiungibile verrebbe registrato come una non conformità della macchina, mentre il problema riguarda lo strumento di test.

### 4.6.3 Numero massimo di tentativi

Il numero di interventi del nodo di healing è limitato dal parametro `MAX_HEALING_ATTEMPTS`. Senza questo limite, una correzione che non risolve il problema potrebbe innescare un ciclo senza fine di modifiche, ricostruzioni e nuovi test. Raggiunto il limite, il workflow termina con l’esito dell’ultimo test.

Con questa fase il ciclo si chiude: una non conformità può essere diagnosticata, corretta sui sorgenti e verificata di nuovo con gli stessi criteri. Il Capitolo 5 valuta separatamente le prestazioni del test, della diagnosi e della correzione.
