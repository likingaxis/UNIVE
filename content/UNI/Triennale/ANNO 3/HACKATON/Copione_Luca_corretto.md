# Copione Luca — versione corretta e naturale

## SLIDE 1 — Perché non usare semplicemente un LLM?

La domanda sorge spontanea: perché non mettere tutto direttamente all’interno del contesto della richiesta, quindi telemetria, regolamento, documentazione tecnica e la query dell’utente, e inviare tutto quanto all’LLM aspettando semplicemente la risposta?

In realtà si potrebbe fare, ma non sarebbe comunque l’approccio migliore.

Il problema principale è che nel nostro caso abbiamo **due fonti di informazione molto diverse**: da una parte i dati di gara e la telemetria, dall’altra il regolamento e la documentazione tecnica.

Mettere tutto insieme nel contesto renderebbe il sistema poco efficiente e poco controllabile.

Innanzitutto avremmo uno spreco importante di token, perché a ogni richiesta dovremmo reinviare anche informazioni che magari non servono affatto per quella specifica domanda.

Inoltre riempiremmo la context window con dati non rilevanti e lasceremmo al modello la responsabilità di ritrovare autonomamente le informazioni utili all’interno di un grande blocco di contesto.

Un’altra cosa che vogliamo evitare è delegare completamente al modello la gestione di valori numerici, calcoli e regole. In quel caso aumenterebbe il rischio di ottenere valori inventati, calcoli approssimativi o interpretazioni non verificate del regolamento.

L’obiettivo quindi non è semplicemente dare al modello più contesto possibile, ma costruire un sistema che gli permetta di recuperare **l’informazione giusta, dalla fonte giusta, nel momento giusto**.
![[Pasted image 20260927104729.png|172]]
---

## SLIDE 2 — Costruire un harness attorno all’LLM

La soluzione è quella di non usare l’LLM come un semplice chatbot, ma di costruire un **harness attorno al modello**.

In questo modo l’LLM diventa una sorta di orchestratore: interpreta la richiesta, decide quali informazioni servono e quali strumenti utilizzare, e poi ragiona sui risultati ottenuti.

Il modello quindi non deve più avere la responsabilità di contenere o cercare da solo tutte le informazioni.

All’interno dell’harness gli mettiamo a disposizione strumenti specializzati.

Da una parte abbiamo strumenti per accedere ai **dati di gara** e ai calcoli sulla telemetria.

Dall’altra abbiamo uno strumento per recuperare informazioni dai **documenti** tramite ricerca semantica.

In questo modo separiamo i compiti:

- l’LLM si occupa principalmente di **interpretare, decidere e ragionare**;
- i tool si occupano di **recuperare dati reali ed eseguire operazioni precise**;
- il sistema di retrieval si occupa di **recuperare solo il contesto documentale utile**.

Quindi, in pratica, non chiediamo al modello di sapere tutto: gli diamo gli strumenti per recuperare ciò che gli serve quando gli serve.
![[Pasted image 20260927104714.png|223]]
---

## SLIDE 3 — Architettura del sistema

Possiamo vedere questa logica direttamente nell’architettura che abbiamo utilizzato nel Task 3, che integra anche il lavoro fatto nei Task 1 e 2.

L’ingegnere di gara interagisce con una **User Interface**.

La User Interface, per la parte grafica, legge direttamente una copia locale dei file JSON e JSONL per rappresentare la telemetria nei grafici.

Per quanto riguarda invece le richieste all’assistente, la User Interface comunica con il nostro **client**.

Il client ha il compito di costruire la richiesta e inviarla a **OCI Generative AI tramite la Responses API**.

La cosa importante è che nella richiesta non passiamo soltanto la domanda dell’utente e il system prompt.

Passiamo anche la **lista dei tool disponibili**.

Quindi, concettualmente, il client invia:

- le istruzioni del sistema;
- la domanda dell’utente;
- i tool che il modello può utilizzare.

A questo punto il modello può decidere quali strumenti usare durante il proprio flusso di ragionamento.

Nel nostro caso abbiamo due percorsi principali.

Il primo è **File Search**, utilizzato quando servono informazioni normative o tecniche dai documenti.

File Search interroga l’**OCI Vector Store** e recupera i passaggi documentali più rilevanti per la richiesta.

Il secondo percorso è **MCP**, utilizzato quando servono informazioni sulla gara, sulla telemetria o calcoli specifici.

In questo caso il modello invoca i tool esposti dal nostro **MCP Server**.

La Responses API gestisce il ciclo di tool calling: il modello può utilizzare un tool, ricevere il risultato e, se necessario, effettuare ulteriori chiamate prima di generare la risposta finale.

Il nostro MCP Server gira localmente, mentre OCI Generative AI gira nel cloud.

OCI quindi non può raggiungere direttamente il `localhost` della nostra macchina.

Per questo abbiamo utilizzato **ngrok**, che crea un endpoint HTTPS pubblico e inoltra le richieste verso il nostro MCP Server locale.

Una volta recuperate tutte le informazioni necessarie, il modello produce la risposta finale, che torna al client e viene mostrata nella User Interface.
![[Pasted image 20260927104658.png|519]]
---

## SLIDE 4 — MCP Server
![[Pasted image 20260927115007.png|248]]
Uno dei due strumenti principali è il nostro **MCP Server**.

MCP significa **Model Context Protocol**.

Il concetto è quello di avere uno standard che definisce in modo chiaro come un’applicazione AI può scoprire, invocare e utilizzare tool esterni.

Nel nostro caso il server MCP espone una serie di tool che permettono al modello di accedere in modo controllato ai dati della telemetria.

Questi dati sono salvati nei file **JSON e JSONL**.

Il modello però non accede direttamente ai file.

Invoca invece un tool specifico, ad esempio per leggere lo stato di una gomma, confrontare l’usura con il valore atteso oppure recuperare il contesto strategico di un determinato giro.

Il server MCP legge quindi i dati necessari, esegue eventualmente un calcolo deterministico e restituisce al modello un risultato strutturato.

Questo è importante perché ci permette di spostare fuori dall’LLM tutte quelle operazioni per cui vogliamo avere risultati riproducibili e controllabili.

Quindi possiamo riassumere MCP così:

- espone tool per accedere in modo controllato a dati esterni;
- nel nostro caso lavora sulla telemetria in JSON / JSONL;
- fornisce uno standard per l’integrazione dei tool con gli LLM;
- la comunicazione avviene tramite il **Model Context Protocol**.

In pratica, il tool recupera o calcola; il modello interpreta.

---

## SLIDE 5 — OCI Vector Store e ricerca semantica
![[embedding.jpg|256]]
Il secondo strumento principale è l’**OCI Vector Store**.

In questo caso il problema è diverso: non dobbiamo interrogare dati strutturati di telemetria, ma documenti come regolamento e dossier tecnico.

I documenti vengono prima suddivisi in **chunk**, quindi in porzioni più piccole di testo.

Ogni chunk viene poi trasformato in un **embedding**.

Un embedding è un vettore multidimensionale che rappresenta semanticamente il significato di quel chunk.

Quindi possiamo immaginare ogni chunk come un punto all’interno di uno spazio vettoriale multidimensionale.

Chunk che hanno significati simili tendono ad avere vettori vicini nello spazio.

Questo ci permette di effettuare una **ricerca semantica**.

Quando il modello decide di utilizzare `file_search`, OCI effettua una ricerca nel Vector Store e recupera soltanto i chunk più rilevanti per quella specifica richiesta.

Il modello quindi non legge tutto il contenuto del Vector Store.

Riceve solamente il contesto documentale più pertinente e lo utilizza per costruire la risposta.

Il vantaggio è che OCI gestisce direttamente gran parte dell’infrastruttura necessaria per embedding, indicizzazione e retrieval.

Nel nostro progetto abbiamo invece lavorato sulla preparazione dei documenti e sulla strategia di **chunking**, che viene approfondita successivamente.

Quindi possiamo riassumere il funzionamento così:

- il documento viene diviso in chunk;
- ogni chunk viene trasformato in un embedding;
- gli embedding vengono memorizzati nel Vector Store;
- `file_search` effettua il retrieval semantico;
- il modello riceve solo i chunk più pertinenti alla query.

---

## Frasi chiave da ricordare

### Perché non mettere tutto nel prompt?
**Non vogliamo dare al modello più contesto possibile, ma l’informazione giusta, dalla fonte giusta, nel momento giusto.**

### Harness
**Il modello interpreta e decide; i tool recuperano e calcolano.**

### Responses API
**Nella stessa richiesta passiamo domanda, istruzioni e tool disponibili.**

### MCP
**Il modello non legge direttamente il JSON: invoca un tool e riceve un risultato strutturato.**

### Vector Store
**L’embedding è il vettore; il Vector Store memorizza questi vettori e permette di recuperare i chunk semanticamente più vicini alla query.**

### ngrok
**Serve a rendere il server MCP locale raggiungibile da OCI Generative AI nel cloud.**
