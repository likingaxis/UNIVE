### Perché non usare semplicemente un LLM?

> A questo punto la domanda che ci siamo posti è: **come possiamo sfruttare davvero un LLM, senza limitarci a usarlo come un normale chatbot?**
> 
> Un modello linguistico, preso da solo, lavora principalmente sulle informazioni che possiede già e su quelle che gli vengono fornite all'interno del contesto della richiesta.
> 
> Questo però, per il nostro caso d'uso, non era sufficiente.
> 
> Noi abbiamo due fonti di informazione molto diverse: da una parte la **telemetria della vettura**, quindi dati numerici che cambiano giro per giro; dall'altra il **regolamento e il dossier tecnico**, quindi documenti lunghi nei quali bisogna recuperare delle informazioni precise.
> 
> Inserire semplicemente tutto all'interno del prompt sarebbe un approccio poco efficiente e soprattutto poco controllabile.

Qui eviterei di rendere la context window il problema centrale.

Puoi eventualmente aggiungere:

> Anche modelli con context window molto ampie hanno comunque un limite: avere più spazio disponibile non significa necessariamente voler inserire ogni volta tutto il dataset e tutto il regolamento nel prompt.
> 
> È molto più efficace dare al modello la possibilità di **recuperare solamente le informazioni che gli servono nel momento in cui gli servono**.

Nel vostro progetto questo è particolarmente evidente per la telemetria: MCP permette di evitare di passare circa 127 KB di JSON al modello e di richiedere solamente i giri o i componenti necessari. Struffolihackaton_Documentazione

Sul dato **131.072 token**: nei file del progetto che mi hai dato non è documentato, quindi prima di metterlo nella presentazione lo verificherei. Non ne hai realmente bisogno per sostenere il ragionamento.

---

### Il modello diventa parte di un sistema

> La soluzione che abbiamo scelto è quindi quella di costruire una sorta di **harness attorno all'LLM**.
> 
> Il modello non viene più utilizzato come contenitore di tutte le informazioni, ma come **orchestratore**.
> 
> Riceve una richiesta, la interpreta, decide quali strumenti utilizzare, raccoglie le informazioni necessarie e infine le combina per produrre una risposta.
> 
> Quindi il suo compito principale diventa quello di **ragionare e interpretare**, mentre l'accesso ai dati viene delegato a strumenti specializzati.

Questa è secondo me la frase chiave:

> **Non chiediamo al modello di sapere tutto. Gli diamo gli strumenti per sapere dove trovare ciò che gli serve.**

E subito dopo mostri lo schema.

---

# Architettura
![[Pasted image 20260926164510.png]]

> Questa è l'architettura generale che abbiamo progettato.
> 
> Partiamo dall'utente, quindi dall'ingegnere di gara, che interagisce con il sistema attraverso una **User Interface sviluppata in Streamlit**.
> 
> L'interfaccia permette sia di conversare con l'assistente, sia di visualizzare dashboard e grafici della telemetria, sia di caricare nuovi documenti nel sistema. Struffolihackaton_Documentazione

Indichi **User Interface**.

> La User Interface comunica poi con il nostro **client Python**.
> 
> Il client ha un compito relativamente semplice ma molto importante: costruisce la richiesta che viene inviata a **OCI Generative AI attraverso la Responses API**.

Indichi **Client → OCI**.

> Ed è qui che cambia radicalmente il comportamento rispetto a un normale chatbot.
> 
> Nella stessa richiesta non inviamo solamente il prompt dell'utente, ma diciamo anche al modello quali **tool** ha a disposizione.
> 
> Nel nostro caso ne rendiamo disponibili contemporaneamente due categorie:
> 
> da una parte il **File Search**, collegato al Vector Store;
> 
> dall'altra il nostro **MCP Server**, collegato alla telemetria.

Il vostro `client.py` passa effettivamente MCP e `file_search` insieme nella stessa richiesta, lasciando al modello la possibilità di usarne uno o entrambi. Struffolihackaton_Documentazione

---

# OCI Generative AI e Responses API

Qui farei proprio una slide successiva.

> Il primo elemento centrale è quindi **OCI Generative AI**.
> 
> È il servizio Oracle sul quale viene eseguito il modello che ci è stato fornito, `gpt-oss-120b`.
> 
> Ma la parte particolarmente interessante per il nostro progetto non è solamente avere il modello nel cloud.
> 
> È l'utilizzo della **Responses API**.

Poi farei comparire graficamente:

```
INPUT + INSTRUCTIONS + TOOLS
              ↓
       Responses API
              ↓
            LLM
```

E dici:

> Con una normale chiamata a un LLM noi inviamo un input e riceviamo un output.
> 
> Con la Responses API, invece, insieme all'input possiamo dichiarare una serie di strumenti disponibili.
> 
> A quel punto il modello può analizzare la richiesta e decidere autonomamente se ha bisogno di chiamare uno strumento prima di formulare la risposta.

Questa è proprio la funzione descritta nel progetto: la Responses API gestisce il ciclo modello → richiesta del tool → esecuzione → risultato → continuazione del ragionamento. Struffolihackaton_Documentazione

Qui puoi fare un esempio concreto:

> Se io chiedo:
> 
> _“Qual è lo stato della gomma anteriore sinistra al giro 23?”_
> 
> il modello riconosce che la domanda riguarda la telemetria e può utilizzare MCP.
> 
> Se invece chiedo:
> 
> _“Il materiale utilizzato per il contenitore della batteria è conforme?”_
> 
> può utilizzare File Search.
> 
> E se la domanda richiede contemporaneamente una decisione strategica e una verifica regolamentare, può utilizzare **entrambi**.

Il vostro prompt è stato progettato proprio con questo routing: telemetria → MCP, normativa → File Search, domande miste → entrambi. Struffolihackaton_Documentazione

E questa frase secondo me è molto efficace:

> **La Responses API è quindi il punto di orchestrazione dell'intero sistema.**

---

# MCP — Model Context Protocol

Poi passi al ramo inferiore dello schema.

> Vediamo quindi il primo degli strumenti che abbiamo messo a disposizione del modello: **MCP, Model Context Protocol**.
> 
> MCP è un protocollo aperto che standardizza il modo in cui un'applicazione basata su AI può utilizzare strumenti e sorgenti dati esterne. Struffolihackaton_Documentazione
> 
> L'idea fondamentale è separare il modello dalla sorgente dei dati.

Poi:

```
LLM
 ↓
"Mi serve lo stato della gomma FL al giro 23"
 ↓
MCP Tool
 ↓
Telemetria
 ↓
Risultato strutturato
 ↓
LLM
```

A voce:

> Nel nostro caso abbiamo scritto un **MCP Server** che espone una serie di tool.
> 
> Il modello non apre direttamente il file JSON e non deve conoscere la sua struttura interna.
> 
> Può invece dire, concettualmente:
> 
> “chiamami `get_component_state` per la gomma anteriore sinistra al giro 23”.

Il server espone effettivamente tool per stato componente, finestre di giri, confronto con il modello di usura, strategia e così via. Struffolihackaton_Documentazione

Poi arriva un concetto importante:

> Il server esegue quindi del **codice Python deterministico**, legge i dati necessari e restituisce al modello un risultato strutturato.
> 
> Questo ci permette di spostare fuori dall'LLM alcune operazioni per le quali non vogliamo affidarci alla generazione probabilistica.

Esempio:

> Per esempio, il confronto tra usura osservata e prevista viene calcolato dal codice.
> 
> È Python che determina se il gap è normale, in monitoraggio, warning o critical.
> 
> L'LLM riceve quel risultato e si occupa di **interpretarlo e comunicarlo** all'ingegnere.

Le soglie sono infatti implementate direttamente nel tool Python e non lasciate all'aritmetica del modello. Struffolihackaton_Documentazione

Questa frase la terrei:

> **Il modello interpreta; il tool calcola.**

Molto semplice, ma comunica perfettamente la scelta progettuale.

---

# Perché c'è ngrok?

A questo punto puoi sfruttare lo schema.

> C'è però un problema infrastrutturale.
> 
> Il nostro MCP Server gira localmente sulla nostra macchina, mentre il modello viene eseguito sui server Oracle.
> 
> Quindi OCI non può semplicemente connettersi a `localhost:8000`.

Indichi ngrok.

> Per questo abbiamo utilizzato **ngrok**, che crea un tunnel HTTPS pubblico verso il nostro server locale.
> 
> OCI chiama l'endpoint pubblico di ngrok e ngrok inoltra la richiesta al nostro MCP Server.

È esattamente il motivo per cui è presente nell'architettura. Struffolihackaton_Documentazione

Non gli dedicherei però più di 20-30 secondi.

---

# RAG — Retrieval-Augmented Generation

Poi torni sul ramo superiore.

> Il secondo grande problema era completamente diverso.
> 
> In questo caso non abbiamo dati strutturati di telemetria, ma abbiamo **documenti**: regolamento tecnico e dossier della vettura.
> 
> Qui utilizziamo un approccio **RAG, Retrieval-Augmented Generation**.

Quindi:

> L'idea del RAG è semplice:
> 
> invece di chiedere al modello di ricordare o conoscere il nostro regolamento, prima cerchiamo all'interno dei documenti le informazioni pertinenti alla domanda.
> 
> Solo quei passaggi vengono poi forniti al modello come contesto per generare la risposta.

Schema:

```
          DOMANDA
             ↓
         RETRIEVAL
             ↓
   CONTENUTI PERTINENTI
             ↓
            LLM
             ↓
          RISPOSTA
```

Poi la frase importante:

> Quindi **RAG non significa riaddestrare il modello**.
> 
> Il modello rimane lo stesso.
> 
> Quello che cambia dinamicamente è il contesto che gli viene fornito.

Questa è precisamente la logica descritta nella documentazione del progetto. Struffolihackaton_Documentazione

---

# Embedding e Vector Store

Qui entrerei un minimo più nel tecnico, proprio perché Oracle vuole valorizzare queste tecnologie.

> Ma come facciamo a trovare i passaggi pertinenti?
> 
> Qui entrano in gioco **embedding e Vector Store**.

Poi:

> Un embedding è una rappresentazione numerica del significato di un testo.
> 
> In maniera semplificata, possiamo immaginare ogni pezzo di documento come un punto all'interno di uno spazio multidimensionale.
> 
> Testi semanticamente simili vengono rappresentati da vettori vicini.

Visualmente:

```
"materiale accumulatore"       ●
                              /
                             /
        ● "battery enclosure safety"

                      ● "magnesium alloy prohibited"
```

Poi:

> Durante la fase di indicizzazione il documento viene suddiviso in **chunk**.
> 
> Ogni chunk viene trasformato in un embedding e memorizzato nel **Vector Store**.

```
PDF
 ↓
Chunking
 ↓
Chunk 1  Chunk 2  Chunk 3 ...
   ↓        ↓        ↓
Embedding Embedding Embedding
     \       |       /
       Vector Store
```

Nel Task 2 avete utilizzato chunk da 1500 caratteri con overlap di 200. Struffolihackaton_Documentazione

Poi spieghi la query:

> Quando arriva una domanda, viene cercato nel Vector Store il contenuto semanticamente più vicino.
> 
> Questo significa che non stiamo semplicemente facendo una ricerca per parola chiave.
> 
> Possiamo recuperare una regola pertinente anche quando domanda e documento utilizzano parole differenti.

E puoi usare **il vostro vero esempio**:

> Per esempio, possiamo chiedere:
> 
> _“Can the BAT-X9 enclosure material be used?”_
> 
> Anche se la domanda non contiene esattamente l'espressione utilizzata dal regolamento, la ricerca semantica può recuperare la sezione relativa ai materiali ammessi per l'enclosure dell'accumulatore. Struffolihackaton_Documentazione

---

# OCI Vector Store + File Search

Poi chiudi il cerchio:

> Nel nostro caso non abbiamo dovuto implementare manualmente tutta questa infrastruttura.
> 
> Utilizziamo **OCI Vector Store**, che gestisce l'indicizzazione dei documenti e la ricerca vettoriale.
> 
> Attraverso il tool **File Search**, la Responses API può interrogare direttamente quel Vector Store.

Quindi:

```
                OCI
 ┌─────────────────────────────┐
 │                             │
 │       Generative AI         │
 │             │               │
 │        file_search          │
 │             │               │
 │             ▼               │
 │       Vector Store          │
 │                             │
 └─────────────────────────────┘
```

> Il risultato è che il modello riceve solamente i passaggi del regolamento più rilevanti per quella specifica domanda.

Nel progetto il Vector Store e la ricerca sono infatti gestiti da OCI, mentre il client rende disponibile `file_search` al modello. Struffolihackaton_Documentazione

---

# Riuniamo i due mondi

Secondo me questa mini-conclusione è fondamentale prima di passare ad Alfredo.

> Arrivati a questo punto abbiamo quindi due meccanismi completamente diversi, ma esposti allo stesso modello.
> 
> **MCP** ci permette di accedere a dati strutturati e a calcoli deterministici.
> 
> **RAG e Vector Store** ci permettono di recuperare conoscenza non strutturata dai documenti.
> 
> Sopra entrambi c'è la **Responses API**, che permette al modello di scegliere quale sorgente utilizzare.

E farei comparire:

```
                         USER
                           │
                           ▼
                     Responses API
                           │
                 ┌─────────┴─────────┐
                 │                   │
                 ▼                   ▼
                MCP             FILE SEARCH
                 │                   │
                 ▼                   ▼
         JSON / JSONL          VECTOR STORE
         Telemetria            Documentazione
                 │                   │
                 └─────────┬─────────┘
                           ▼
                          LLM
                           │
                           ▼
                       RISPOSTA
```

E chiudi con:

> Questo è probabilmente il punto principale della nostra architettura:
> 
> **non abbiamo cercato di mettere più informazioni possibili dentro l'LLM.**
> 
> Abbiamo cercato di costruire intorno all'LLM un ecosistema che gli permettesse di recuperare **l'informazione giusta, dalla sorgente giusta, nel momento giusto**.
> 
> Ed è proprio questo che permette di passare da un semplice chatbot a un vero **AI Race Engineer Copilot**.

Poi passaggio ad Alfredo:

> A questo punto, vista l'architettura generale e il ruolo delle tecnologie principali, possiamo vedere **come questi componenti sono stati implementati concretamente**: come abbiamo costruito il Vector Store, come abbiamo implementato il server MCP e quali tool abbiamo esposto al modello.

Questo si aggancia praticamente perfettamente alla divisione che avete già deciso: la tua parte è “cosa abbiamo progettato per risolvere il problema”, mentre Alfredo entra in chunking, implementazione MCP, tool e prompt engineering. ORDINE SLIDE

Una cosa che farei assolutamente nelle slide: **non mettere tutto questo testo**. Questo deve essere il tuo copione. Nelle slide terrei quasi solo schemi, parole chiave e magari una singola frase per concetto. In particolare, per questa parte userei 4 slide: **Architecture → Responses API → MCP → RAG & Vector Store**. Il resto lo racconti tu.

