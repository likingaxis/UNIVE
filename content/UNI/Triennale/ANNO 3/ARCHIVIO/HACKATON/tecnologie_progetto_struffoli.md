# Tecnologie usate nel progetto — Struffolihackaton

> Documento di studio pensato per preparare la parte di presentazione dedicata all'architettura e alle tecnologie.
> L'obiettivo non è essere una slide, ma spiegare **cosa fa ogni tecnologia, perché serve e come viene usata nel progetto**.

---

# 1. Idea generale: da chatbot a sistema agentico

Il progetto non usa `gpt-oss-120b` come un semplice chatbot a cui viene passato tutto il contesto disponibile.

L'idea architetturale è costruire intorno al modello un **insieme di strumenti e sorgenti dati** che gli permettano di recuperare le informazioni necessarie nel momento in cui servono.

Il modello svolge quindi soprattutto tre funzioni:

1. **interpreta la richiesta dell'utente**;
2. **decide quali strumenti utilizzare**;
3. **combina e interpreta i risultati** per produrre la risposta finale.

Le informazioni vere non devono essere inventate dal modello:

- la **telemetria** viene letta tramite tool esposti da un server MCP;
- le **regole e il dossier tecnico** vengono recuperati tramite `file_search` da un Vector Store;
- i **calcoli numerici più delicati** vengono eseguiti in Python nei tool e non affidati all'aritmetica dell'LLM.

Il punto quindi non è solo "avere una context window più grande", ma evitare di inserire ogni volta enormi quantità di dati nel prompt e permettere al modello di recuperare **solo il contesto rilevante**.

---

# 2. Architettura generale

L'architettura del Task 3 può essere vista così:

```text
Utente
  |
  v
Streamlit UI
  |
  v
client.py
  |
  v
OCI Generative AI / Responses API
  |
  +--------------------+
  |                    |
  v                    v
MCP Tool            file_search
  |                    |
  v                    v
ngrok              Vector Store
  |
  v
MCP Server
  |
  v
JSON / JSONL
```

Il client invia **una sola richiesta** alla Responses API mettendo a disposizione contemporaneamente:

- il tool `mcp`;
- il tool `file_search`.

Il modello può quindi usare:

- solo MCP;
- solo File Search;
- entrambi;
- nessuno dei due, se non servono dati esterni.

---

# 3. OCI Generative AI

## Cos'è

OCI Generative AI è il servizio gestito di Oracle Cloud utilizzato nel progetto per eseguire il modello linguistico.

Nel progetto viene utilizzato:

```text
openai.gpt-oss-120b
```

tramite endpoint compatibili con l'SDK OpenAI.

Quindi il codice usa il package Python `openai`, ma:

- il modello gira su infrastruttura Oracle;
- l'autenticazione è quella OCI;
- il progetto e le risorse sono su OCI;
- il Vector Store è gestito su OCI.

Esempio concettuale:

```python
client = OpenAI(
    base_url=OCI_GENAI_BASE_URL,
    api_key=OCI_GENAI_API_KEY,
    project=OCI_GENAI_PROJECT_ID,
)
```

## Perché è importante nel progetto

OCI Generative AI non viene usato soltanto per "ospitare un LLM".

Il valore maggiore, nel nostro caso, è la possibilità di usare la **Responses API** e integrare tool come:

- MCP;
- File Search;
- funzioni;
- altri strumenti supportati dal servizio.

Il modello diventa quindi una parte di un sistema più ampio.

---

# 4. Responses API

## Cos'è

La Responses API permette di inviare nella stessa richiesta:

- le istruzioni del sistema;
- la domanda dell'utente;
- il modello;
- gli strumenti disponibili.

Esempio semplificato:

```python
response = client.responses.create(
    model=MODEL,
    instructions=PROMPT,
    input=question,
    tools=[
        {... mcp ...},
        {... file_search ...}
    ],
)
```

La parte importante è che il client **non deve implementare manualmente tutto il ciclo di tool calling**.

Il backend gestisce il ciclo:

```text
Utente fa una domanda
        |
        v
LLM interpreta la richiesta
        |
        v
Serve un tool?
   /          \
  no          sì
  |            |
  |            v
  |       tool call
  |            |
  |            v
  |       risultato tool
  |            |
  +------------+
        |
        v
LLM continua il ragionamento
        |
        v
Risposta finale
```

## Perché è importante

Con una classica interazione chatbot:

```text
input -> modello -> output
```

Nel nostro progetto invece:

```text
input
  |
  v
modello
  |
  +--> MCP
  |
  +--> File Search
  |
  +--> eventualmente entrambi
  |
  v
risposta finale
```

La Responses API è quindi il **punto di orchestrazione** dell'intero sistema.

---

# 5. Tool calling

## Concetto generale

Il tool calling permette al modello di chiedere l'esecuzione di un'operazione esterna.

Il modello non esegue direttamente il codice.

Produce invece una richiesta strutturata del tipo:

```json
{
  "name": "get_component_state",
  "arguments": {
    "component": "front_left_tire",
    "lap": 23
  }
}
```

Un componente esterno esegue quella funzione e restituisce il risultato.

Il modello riceve quindi dati verificabili sui quali può continuare a ragionare.

## Perché è utile

Consente di separare:

```text
LLM
-> linguaggio naturale
-> ragionamento
-> interpretazione

Tool
-> accesso ai dati
-> calcoli deterministici
-> operazioni controllate
```

Una sintesi efficace è:

> **Il tool calcola e recupera; il modello interpreta.**

---

# 6. MCP — Model Context Protocol

## Cos'è

MCP significa **Model Context Protocol**.

È un protocollo aperto che standardizza il modo in cui applicazioni AI possono accedere a:

- tool;
- dati;
- risorse esterne.

L'idea è evitare integrazioni completamente diverse per ogni modello o client.

Un server MCP espone operazioni descritte con:

- nome;
- descrizione;
- parametri;
- schema JSON.

Il modello può leggere queste descrizioni e capire quale tool sia appropriato.

---

# 7. MCP nel progetto

Nel progetto abbiamo scritto un server MCP dedicato alla telemetria della gara.

I dati originali sono nei file:

```text
race_session_telemetry.json
race_session_telemetry_stream.jsonl
```

Il modello **non legge direttamente questi file**.

Interagisce con il server MCP attraverso tool specializzati.

Esempi:

```text
get_session_overview
get_lap_window
get_component_state
compare_to_wear_model
get_strategy_context
list_race_control_events
stream_live_telemetry
forecast_tyre_life
recommend_pit_strategy
```

### Esempio

Domanda:

> What is happening to the front-left tyre at lap 23?

Flusso:

```text
Utente
  |
  v
LLM
  |
  | decide di usare:
  v
get_component_state(
    component="front_left_tire",
    lap=23
)
  |
  v
MCP Server
  |
  v
JSON telemetria
  |
  v
risultato strutturato
  |
  v
LLM
  |
  v
risposta comprensibile
```

---

# 8. Perché usare MCP invece di dare il JSON al modello

È uno dei punti più importanti dell'architettura.

## 8.1 Contesto ridotto

Non è necessario inserire tutto il dataset di telemetria nel prompt.

Il modello chiede solamente:

- il giro;
- il componente;
- l'intervallo;
- la metrica;

di cui ha bisogno.

## 8.2 Controllo

Il modello può fare solamente le operazioni che decidiamo di esporre.

Se il server offre tool in sola lettura, il modello non può modificare accidentalmente i dati.

## 8.3 Disaccoppiamento

Il modello non deve conoscere:

- il percorso dei file;
- lo schema interno completo;
- come i dati sono caricati;
- come sono implementati i calcoli.

Conosce soltanto l'interfaccia dei tool.

## 8.4 Calcoli deterministici

Un LLM genera testo probabilisticamente.

Per operazioni come:

- confronto tra usura reale e prevista;
- soglie di allarme;
- previsione della vita della gomma;
- strategia di pit stop;

è più sicuro utilizzare codice Python.

Esempio:

```python
gap = observed - expected

if gap >= 18:
    status = "critical"
elif gap >= 10:
    status = "warning"
elif gap >= 5:
    status = "monitor"
else:
    status = "normal"
```

Il modello non decide autonomamente quale soglia applicare.

Riceve il risultato calcolato dal tool.

---

# 9. FastMCP

## Cos'è

FastMCP è l'API di alto livello dell'SDK Python MCP utilizzata per costruire il server.

Una funzione Python può diventare un tool MCP tramite un decoratore.

Concettualmente:

```python
@mcp.tool()
def get_component_state(component: str, lap: int):
    ...
```

FastMCP usa:

- nome della funzione;
- type hints;
- docstring;

per generare automaticamente la descrizione del tool e lo schema dei parametri.

## Perché la docstring è importante

Nel normale codice una docstring è soprattutto documentazione per lo sviluppatore.

Qui invece è anche parte dell'interfaccia che il modello legge.

La descrizione deve quindi spiegare:

- cosa fa il tool;
- quando utilizzarlo;
- quali parametri accetta;
- che tipo di risultato restituisce.

Una docstring scritta male può portare il modello a scegliere il tool sbagliato.

---

# 10. Streamable HTTP

Il server MCP viene esposto tramite **Streamable HTTP**.

Nel progetto viene eseguito come applicazione ASGI tramite Uvicorn.

Schema:

```text
OCI
 |
 | HTTP
 v
/mcp
 |
 v
FastMCP
 |
 v
Python tools
```

Il server è configurato in maniera stateless:

- ogni richiesta è indipendente;
- non viene mantenuta una sessione complessa fra una chiamata e l'altra.

Questo è adatto perché i tool del progetto effettuano principalmente letture e calcoli sui dati.

---

# 11. ngrok

## Il problema

Il server MCP gira sulla macchina locale.

Ma la chiamata al tool parte da OCI.

Per OCI:

```text
localhost:8000
```

non indica il nostro computer.

Indica la macchina remota stessa.

Serve quindi un endpoint pubblico.

## Soluzione

ngrok crea un tunnel:

```text
OCI
 |
 v
https://xxxx.ngrok-free.app
 |
 v
ngrok tunnel
 |
 v
localhost:8000
 |
 v
MCP Server
```

Quindi:

1. OCI invia la chiamata MCP all'URL pubblico;
2. ngrok riceve la richiesta;
3. la inoltra alla porta locale;
4. il server MCP esegue il tool;
5. la risposta percorre il tragitto inverso.

## Nota architetturale

ngrok è molto utile per sviluppo e demo.

In un'architettura di produzione avrebbe più senso:

- distribuire il server MCP direttamente nel cloud;
- aggiungere autenticazione;
- evitare un tunnel verso una macchina locale.

---

# 12. RAG — Retrieval-Augmented Generation

RAG significa:

**Retrieval-Augmented Generation**

Il concetto è:

> prima recuperare le informazioni pertinenti, poi generare la risposta.

Senza RAG:

```text
Domanda
  |
  v
LLM
  |
  v
Risposta basata su training + prompt
```

Con RAG:

```text
Domanda
  |
  v
Retrieval
  |
  v
Passaggi pertinenti
  |
  v
LLM + contesto recuperato
  |
  v
Risposta
```

Nel progetto il RAG viene usato per:

- regolamento;
- dossier tecnico;
- documenti caricati dall'utente.

---

# 13. Perché serve il RAG

Il regolamento utilizzato nel progetto è specifico.

Non possiamo assumere che il modello:

- lo conosca;
- ne conosca la versione;
- ricordi correttamente sezioni e limiti;
- non confonda le regole con conoscenze generali.

Quindi vogliamo che il modello risponda usando **il testo recuperato dai nostri documenti**.

Questo permette di passare da:

```text
"Secondo quello che ricordo..."
```

a:

```text
"Nel documento fornito, la sezione pertinente dice..."
```

Il RAG riduce quindi il rischio che il modello inventi:

- regole;
- limiti;
- materiali;
- numeri di sezione;
- requisiti di conformità.

---

# 14. Embedding

## Cos'è un embedding

Un embedding è una rappresentazione numerica del significato di un contenuto.

Un testo viene trasformato in un vettore:

```text
"magnesium alloys are prohibited"
       |
       v
[0.13, -0.92, 0.44, ..., 0.17]
```

Il vettore ha molte dimensioni.

L'importante non sono i singoli numeri, ma la posizione relativa dei vettori nello spazio.

Testi semanticamente simili tendono ad avere vettori vicini.

Esempio concettuale:

```text
 "battery enclosure material"
           *
          /
         /
        * "accumulator enclosure requirements"

                       * "magnesium alloys prohibited"
```

---

# 15. Ricerca semantica

Una normale ricerca testuale confronta parole.

La ricerca semantica confronta significati.

Per esempio:

```text
Domanda:
"Can the BAT-X9 enclosure material be used?"
```

Il regolamento potrebbe contenere:

```text
"Permitted accumulator enclosure materials..."
```

Le parole non sono identiche.

Ma semanticamente i concetti sono vicini.

Gli embedding permettono quindi di trovare il passaggio pertinente anche senza una corrispondenza lessicale esatta.

---

# 16. Vector Store

## Cos'è

Un Vector Store è una struttura progettata per memorizzare e ricercare embedding.

Concettualmente contiene:

```text
chunk di testo
+
embedding
+
metadati
```

Esempio:

```text
Chunk:
"Magnesium and magnesium-lithium alloys are prohibited..."

Embedding:
[0.14, -0.51, ...]

Metadata:
document = regulations
section = 5.3
```

Quando arriva una query, viene cercato il vettore più simile.

---

# 17. Pipeline di indicizzazione

Prima di poter effettuare una ricerca, i documenti devono essere indicizzati.

Il processo è:

```text
PDF
 |
 v
estrazione testo
 |
 v
chunking
 |
 v
embedding
 |
 v
Vector Store
```

Nel Task 2 il progetto effettua manualmente:

1. estrazione del testo dal PDF con PyPDF2;
2. suddivisione in chunk;
3. caricamento dei chunk nel Vector Store.

---

# 18. Chunking

## Cos'è

Un documento lungo non viene normalmente trattato come un unico blocco.

Viene diviso in pezzi chiamati **chunk**.

Esempio:

```text
Documento
 |
 +--> chunk 0
 |
 +--> chunk 1
 |
 +--> chunk 2
 |
 +--> chunk 3
```

Nel Task 2:

```text
dimensione chunk = 1500 caratteri
overlap = 200 caratteri
```

Quindi:

```text
chunk 0:    0 -> 1500
chunk 1: 1300 -> 2800
chunk 2: 2600 -> 4100
```

## Perché esiste l'overlap

Supponiamo che una frase inizi alla fine di un chunk e termini all'inizio del successivo.

Senza overlap:

```text
chunk A: "...magnesium alloys are"
chunk B: "strictly prohibited..."
```

Il significato viene spezzato.

Con overlap, una parte del testo viene ripetuta e il contesto si conserva meglio.

---

# 19. Trade-off del chunking

Chunk troppo piccoli:

```text
+ retrieval preciso
- poco contesto
- rischio di separare informazioni collegate
```

Chunk troppo grandi:

```text
+ più contesto
- embedding meno specifico
- più contenuto irrilevante
```

Nel progetto è stato utilizzato un chunking a lunghezza fissa.

La documentazione stessa identifica come possibile miglioramento un **chunking basato sulle sezioni del regolamento**.

Esempio:

```text
3.2 Rear wing
   -> un chunk

3.3 Endplates
   -> un chunk

5.3 Accumulator enclosure
   -> un chunk
```

Questo sarebbe più coerente semanticamente rispetto a tagliare il documento ogni N caratteri.

---

# 20. OCI Vector Store

Nel progetto il Vector Store è una risorsa gestita da OCI.

L'obiettivo è evitare di implementare manualmente:

- database vettoriale;
- infrastruttura di ricerca;
- gestione dell'indice;
- similarity search.

Il servizio gestisce la parte di retrieval.

Nel Task 3 il client mette a disposizione del modello:

```python
{
    "type": "file_search",
    "vector_store_ids": [VECTOR_STORE_ID]
}
```

Il modello può quindi utilizzare `file_search` quando ritiene necessaria una ricerca documentale.

---

# 21. File Search

`file_search` è il tool attraverso il quale il modello interroga il Vector Store.

Il modello non esegue direttamente qualcosa come:

```sql
SELECT ...
```

o una query vettoriale esplicita.

Dichiariamo invece il tool:

```text
file_search -> vector_store_id
```

e la Responses API gestisce la ricerca.

Flusso:

```text
Domanda
  |
  v
LLM capisce che servono documenti
  |
  v
file_search
  |
  v
Vector Store
  |
  v
chunk rilevanti
  |
  v
LLM
  |
  v
risposta
```

---

# 22. MCP e RAG: due problemi diversi

Una distinzione importante da ricordare durante la presentazione:

## MCP

È utile quando abbiamo:

- dati strutturati;
- funzioni;
- operazioni;
- calcoli;
- sorgenti dinamiche.

Nel progetto:

```text
telemetria -> MCP
```

## RAG + Vector Store

È utile quando abbiamo:

- testo;
- documenti lunghi;
- regolamenti;
- manuali;
- dossier.

Nel progetto:

```text
documentazione -> RAG
```

Quindi:

```text
            LLM
           /   \
          /     \
        MCP      RAG
        |         |
        v         v
   telemetria  documenti
```

---

# 23. Perché non usare il RAG anche per la telemetria

Teoricamente si potrebbero trasformare anche i dati numerici in testo e indicizzarli.

Ma sarebbe poco adatto.

La domanda:

> Qual era l'usura FL al giro 23?

ha bisogno di un valore esatto.

Con MCP possiamo fare:

```python
get_component_state("front_left_tire", 23)
```

ottenendo direttamente il record corretto.

Il retrieval semantico invece è più utile quando la domanda riguarda significati e contenuti testuali.

Quindi le due tecnologie sono complementari:

```text
MCP -> precisione strutturata / operazioni

RAG -> recupero semantico / documenti
```

---

# 24. Perché non mettere tutto nella context window

Il limite non è solamente la dimensione massima della context window.

Anche se tutto il contenuto potesse tecnicamente entrare, esistono altri problemi:

## Costo e quantità di token

Inviare continuamente:

- dataset completo;
- regolamento completo;
- dossier completo;

significa elaborare moltissimo testo anche quando la domanda richiede una sola informazione.

## Rumore

Più informazioni irrilevanti vengono date al modello, più deve distinguere ciò che serve da ciò che non serve.

## Aggiornabilità

Un tool può interrogare dati aggiornati senza ricostruire un enorme prompt.

## Affidabilità

Per una domanda numerica conviene recuperare il valore direttamente dalla fonte invece di affidarsi alla capacità del modello di localizzarlo dentro un grande blocco di testo.

Per questo il paradigma è:

```text
NON:
porta tutti i dati al modello

MA:
porta al modello solo i dati necessari
```

---

# 25. System Prompt e routing

Il system prompt del Task 3 specifica come scegliere le fonti.

Schema concettuale:

```text
Domanda
 |
 v
Che tipo di informazione serve?
 |
 +--> telemetria / gara / strategia
 |       |
 |       v
 |      MCP
 |
 +--> regole / materiali / dossier
 |       |
 |       v
 |   file_search
 |
 +--> entrambe
         |
         v
     MCP + RAG
```

Questo è importante perché il tool calling non è completamente "magico".

Il comportamento del modello viene influenzato da:

- system prompt;
- descrizione dei tool;
- nomi dei tool;
- schema dei parametri.

---

# 26. Esempio di domanda solo MCP

Domanda:

```text
What is happening to the front-left tyre at lap 23,
and should we pit?
```

Possibile flusso:

```text
LLM
 |
 +--> get_component_state(front_left_tire, 23)
 |
 +--> compare_to_wear_model(front_left, ...)
 |
 +--> get_strategy_context(23)
 |
 v
combina i risultati
 |
 v
risposta
```

Qui il Vector Store non è necessario.

---

# 27. Esempio di domanda solo File Search

Domanda:

```text
Can the BAT-X9 accumulator enclosure material be used
under the safety rules?
```

Possibile flusso:

```text
LLM
 |
 v
file_search
 |
 v
Vector Store
 |
 v
sezione 5.3 + dossier BAT-X9
 |
 v
LLM
 |
 v
confronto requisito / specifica
```

---

# 28. Esempio di domanda mista

Domanda:

```text
Telemetry recommends pitting between laps 24 and 26.
Check whether the tyre change is allowed.
```

Qui servono due mondi:

```text
MCP
 |
 | dati gara
 v

       LLM
      /   \
     /     \
telemetria  regolamento
   |           |
  MCP      file_search
```

Il modello può quindi distinguere:

- **giustificazione operativa**;
- **conformità regolamentare**.

Questa è una delle caratteristiche più interessanti dell'architettura.

---

# 29. Streamlit

## Cos'è

Streamlit è il framework usato per realizzare rapidamente una web app in Python.

Nel progetto fornisce:

- chat con il Race Engineer;
- dashboard;
- grafici;
- quick actions;
- upload PDF;
- stato della sessione.

## Modello di esecuzione

Streamlit riesegue lo script ad ogni interazione.

Per mantenere dati tra un'interazione e l'altra si utilizza:

```python
st.session_state
```

Nel progetto viene usato anche un pattern `pending_prompt` per permettere ai pulsanti delle quick action di inviare prompt alla stessa pipeline usata dalla chat.

---

# 30. Grafici e dati locali

Un dettaglio importante dell'architettura attuale:

```text
LLM -> MCP Server -> telemetria

UI grafici -> copia locale della telemetria
```

Quindi UI e LLM non leggono esattamente dallo stesso percorso.

I file sono oggi equivalenti, ma potrebbero divergere.

La documentazione identifica come miglioramento futuro una **singola fonte dati**, facendo passare anche dashboard e grafici attraverso il server MCP.

---

# 31. FastAPI

FastAPI viene utilizzato nel Task 2 per esporre il RAG come servizio HTTP.

Schema:

```text
Streamlit chatbot
 |
 v
POST /query
 |
 v
FastAPI
 |
 v
Responses API
 |
 v
file_search
 |
 v
Vector Store
```

Nel Task 3 questa API intermedia non è più necessaria.

Il client parla direttamente con la Responses API e passa contemporaneamente MCP e File Search.

---

# 32. Uvicorn

Uvicorn è il server ASGI utilizzato per eseguire applicazioni Python web asincrone.

Nel progetto viene utilizzato per:

- server MCP;
- API FastAPI del Task 2.

Quindi:

```text
FastAPI / FastMCP
       |
       v
     Uvicorn
       |
       v
HTTP endpoint
```

---

# 33. JSON e JSONL

## JSON

Il file JSON contiene l'intera sessione strutturata.

Esempio concettuale:

```json
{
  "session_metadata": {...},
  "laps": [
    {...},
    {...}
  ]
}
```

È utile per query casuali su qualsiasi giro.

## JSONL

JSON Lines contiene un oggetto per riga:

```text
{"lap": 1, ...}
{"lap": 2, ...}
{"lap": 3, ...}
```

È adatto a simulare un flusso di eventi.

Nel progetto viene usato dal tool `stream_live_telemetry`.

---

# 34. Cosa rende il sistema diverso da un normale chatbot

Un chatbot classico può essere rappresentato come:

```text
Utente
 |
 v
LLM
 |
 v
Risposta
```

Il nostro sistema:

```text
                   +--> MCP ---------> telemetria
                   |
Utente -> LLM -----+
                   |
                   +--> File Search -> Vector Store
                   |
                   +--> tool Python -> calcoli

                   |
                   v
              risposta finale
```

Il valore aggiunto è quindi:

### Grounding

Le risposte possono essere ancorate a fonti reali.

### Tool use

Il modello può effettuare operazioni che non fanno parte della semplice generazione di testo.

### Retrieval

Non deve ricevere tutto il dataset contemporaneamente.

### Separazione dei compiti

```text
LLM       -> interpreta
MCP       -> accede ai dati / esegue tool
Python    -> calcola
RAG       -> recupera documenti
OCI       -> orchestra
Streamlit -> interfaccia
```

---

# 35. Limiti attuali

È utile conoscere anche i limiti, perché possono diventare domande durante la presentazione.

## Telemetria simulata

La telemetria arriva da JSON/JSONL e non da una sorgente realmente live.

Un'evoluzione naturale sarebbe:

```text
CAN bus / websocket
        |
        v
MCP Server
```

senza modificare l'interfaccia dei tool.

## Chunking a lunghezza fissa

Può spezzare una sezione del regolamento.

Miglioramento:

```text
chunking semantico / per sezioni
```

## Server MCP locale

È esposto tramite ngrok.

In produzione sarebbe preferibile un deploy cloud con autenticazione.

## Conversazione senza memoria

Nel Task 3 ogni domanda viene inviata in modo indipendente.

Una domanda del tipo:

```text
"E il giro successivo?"
```

non contiene abbastanza contesto se la cronologia non viene reinviata.

## Doppia fonte dati

Dashboard e LLM leggono due copie della telemetria.

Andrebbero unificate.

---

# 36. Concetti da ricordare per la presentazione

Se devi ricordare poche frasi, queste sono probabilmente le più importanti.

## LLM

> Il modello non deve contenere tutti i dati: deve sapere quali strumenti usare per recuperarli.

## Responses API

> È il livello di orchestrazione che permette al modello di utilizzare più tool nella stessa richiesta.

## MCP

> È l'interfaccia standardizzata tra il modello e dati o funzioni esterne.

## Tool calling

> Il modello decide quale operazione richiedere, ma l'operazione viene eseguita da codice esterno.

## RAG

> Prima recuperiamo il contesto pertinente, poi chiediamo al modello di generare la risposta.

## Embedding

> È una rappresentazione numerica del significato del testo.

## Vector Store

> Memorizza gli embedding e permette di recuperare i contenuti semanticamente più vicini alla query.

## File Search

> È lo strumento attraverso il quale il modello interroga il Vector Store.

## Chunking

> Divide i documenti in unità più piccole e semanticamente recuperabili.

## ngrok

> Rende il server MCP locale raggiungibile dai server OCI.

---

# 37. Sintesi dell'intera architettura

```text
                           UTENTE
                             |
                             v
                       STREAMLIT UI
                             |
                             v
                          CLIENT
                             |
                             v
                  OCI RESPONSES API
                             |
                         gpt-oss-120b
                             |
             +---------------+---------------+
             |                               |
             |                               |
             v                               v
         MCP TOOL                        FILE SEARCH
             |                               |
             v                               v
           NGROK                       VECTOR STORE
             |                               |
             v                               |
        MCP SERVER                           |
             |                               |
             v                               |
        JSON / JSONL                         |
             |                               |
             +---------------+---------------+
                             |
                             v
                       informazioni
                         rilevanti
                             |
                             v
                            LLM
                             |
                             v
                     RISPOSTA FINALE
```

---

# 38. In una frase

> Il progetto trasforma un LLM generico in un Race Engineer Copilot collegandolo, tramite la Responses API, a strumenti specializzati: MCP per telemetria e calcoli deterministici, e File Search + Vector Store per il retrieval semantico della documentazione.

