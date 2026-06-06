# Laboratorio Solr – Da BM25 al retrieval vettoriale su Cranfield

###**Corso:** Information Retrieval  
###**Laurea Magistrale in Informatica** - **Università degli Studi di Roma “Tor Vergata”**  
###**Docente:** Prof. Danilo Croce  

Nel laboratorio precedente abbiamo usato **Lucene** per indicizzare la collezione Cranfield e interrogare un indice testuale.

In questo laboratorio continuiamo lo stesso percorso, ma usiamo **Apache Solr**, un motore di ricerca costruito sopra Lucene che espone le funzionalità di indicizzazione e ricerca tramite API HTTP.

L'obiettivo non è imparare Solr come prodotto industriale, ma osservare come concetti già visti nel corso compaiono in un sistema reale:

- documenti e campi;
- analyzer e indicizzazione;
- ranking lessicale con BM25;
- interrogazione tramite API;
- confronto tra diversi segnali di ranking;
- prima introduzione operativa al dense retrieval.

Useremo ancora la collezione **Cranfield**, così possiamo confrontare questa esercitazione con quelle precedenti.

# Indice

Introduzione ad Apache Solr

1. Obiettivo del laboratorio
2. BM25 e dense retrieval
3. Struttura attesa della directory
4. Creazione dell'ambiente Python
5. Preparazione della collezione Cranfield
6. Download e avvio di Apache Solr
7. Creazione del core Cranfield
8. Definizione dello schema Solr
9. Indicizzazione dei documenti
10. Query BM25
11. Query kNN sui vettori densi
12. Confronto BM25 vs kNN
13. Cosa osservare
14. Interpretazione IR
15. Problemi comuni
16. Comandi principali riassunti
17. Take-away
18. Altre funzionalità Solr da osservare
19. Estensione possibile: valutazione su query e qrels Cranfield
20. Nota: usare anche l'interfaccia web di Solr
21. Nota di coerenza con il laboratorio Lucene: analyzer e schema

---

# Introduzione ad Apache Solr

Apache Solr è una piattaforma open source per la ricerca testuale costruita sopra **Apache Lucene**.

Lucene è la libreria che fornisce le strutture fondamentali dell'Information Retrieval:

- indice inverso;
- analisi del testo;
- tokenizzazione;
- ranking;
- ricerca full-text.

Solr aggiunge sopra Lucene un vero motore di ricerca utilizzabile tramite API HTTP.

In pratica, invece di usare direttamente le API Java di Lucene, possiamo comunicare con Solr tramite richieste REST, ad esempio da:

- terminale, usando `curl`;
- Python, usando `requests`;
- applicazioni web;
- client Java, Python o altri linguaggi.

Solr restituisce i risultati in formati standard come JSON, XML e CSV.

Nel corso, Solr ci interessa perché permette di vedere in un sistema reale molti concetti già studiati:

```text
documenti
campi
indice inverso
analyzer
BM25
query parser
ranking
filtri
campi vettoriali
ricerca kNN
```

## Documenti e campi

In Solr tutto viene indicizzato come un **documento**.

Un documento è un insieme di campi.

Per esempio, nel nostro laboratorio useremo documenti Cranfield rappresentati così:

```json
{
  "id": "cranfield_12",
  "path": "resources/cranfield_collection_splitted/cranfield0012",
  "title": "some structural and aeroelastic considerations of high speed flight .",
  "body": "...",
  "text": "...",
  "title_vector": [...],
  "body_vector": [...]
}
```

I campi testuali:

```text
title
body
text
```

servono per la ricerca lessicale con BM25.

I campi vettoriali:

```text
title_vector
body_vector
```

servono per la ricerca kNN su embedding densi.

Questa distinzione è importante: in un motore di ricerca reale non esiste solo “il testo del documento”, ma diversi campi con ruoli diversi.

Un termine nel titolo può essere più informativo dello stesso termine nel corpo del documento.

## Schema

Lo **schema** di Solr descrive i campi del documento.

Per ogni campo possiamo specificare, ad esempio:

```text
name: nome del campo
type: tipo del campo
indexed: se il campo deve essere indicizzato
stored: se il valore originale deve essere conservato
multiValued: se il campo può contenere più valori
```

Esempio:

```text
title: campo testuale indicizzato e memorizzato
body: campo testuale indicizzato e memorizzato
body_vector: campo vettoriale indicizzato e memorizzato
```

Nel nostro laboratorio definiremo esplicitamente i campi vettoriali, perché Solr deve sapere che non sono semplici liste di numeri, ma vettori su cui fare ricerca kNN.

## Core e collection

In Solr i documenti vengono indicizzati dentro un **core** o una **collection**.

Per questo laboratorio useremo un core chiamato:

```text
cranfield
```

In una configurazione semplice, su una singola macchina, possiamo pensare al core come all'indice che contiene i nostri documenti.

In configurazioni distribuite, Solr usa il concetto di collection, shard e replica, ma in questo laboratorio non ci serve entrare in questi dettagli.

## Query

Solr permette di interrogare l'indice tramite URL o richieste HTTP.

Una query BM25 sul campo `text` può avere questa forma:

```text
text:(aeroelastic models aircraft)
```

e restituisce i documenti ordinati per score.

Solr supporta anche query più articolate:

```text
title:aircraft
body:aeroelastic
title:(aircraft)^3 OR body:(aircraft)
```

Il simbolo `^3` indica un boost: stiamo dicendo che un match nel titolo deve pesare più di un match nel corpo.

Questo è un esempio di **field-aware retrieval**.

## Ricerca vettoriale

Oltre alla ricerca lessicale, Solr può indicizzare campi vettoriali densi.

In questo laboratorio useremo due vettori per ogni documento:

```text
title_vector
body_vector
```

L'idea è semplice: un modello neurale trasforma un testo in un vettore numerico. Testi semanticamente simili dovrebbero avere vettori vicini.

Useremo questa funzionalità in modo operativo, senza approfondire qui la teoria degli embedding neurali. Quella parte sarà studiata nel corso di Deep Learning.

Qui ci interessa confrontare due segnali di ranking:

```text
BM25:
matching lessicale tra query e documenti

kNN su embedding:
vicinanza nello spazio vettoriale
```

## Perché Solr in questo laboratorio

Solr ci permette di collegare tre livelli del corso:

```text
1. Information Retrieval classico
   indice inverso, campi, BM25

2. Sistemi di ricerca reali
   schema, core, API HTTP, query parser

3. Retrieval moderno
   campi vettoriali, kNN, confronto con BM25
```

Quindi Solr non è l'argomento principale del laboratorio.

Solr è lo strumento che useremo per vedere come i modelli studiati a lezione diventano un sistema di ricerca interrogabile.

---

# 1. Obiettivo del laboratorio

In questo laboratorio costruiremo due tipi di indice sulla stessa collezione.

Il primo è un indice testuale classico:

```text
title, body, text
```

che useremo per fare retrieval con **BM25**.

Il secondo contiene anche vettori densi:

```text
title_vector, body_vector
```

che useremo per fare ricerca kNN, cioè ricerca dei documenti più vicini al vettore della query.

La pipeline complessiva sarà:

```text
Cranfield documents
        |
        v
estrazione di title e body
        |
        +----------------------+
        |                      |
        v                      v
indice testuale BM25       embedding densi
(title/body/text)          (title_vector/body_vector)
        |                      |
        v                      v
query lessicale            query kNN
        |                      |
        +----------+-----------+
                   v
          confronto dei ranking
```

Quindi la parte tecnica serve a costruire due modi diversi di interrogare la stessa collezione.

---

# 2. BM25 e dense retrieval

## BM25

BM25 è il modello di ranking lessicale che abbiamo studiato nel corso.

L'idea è che un documento sia rilevante se contiene i termini della query, soprattutto se questi termini sono informativi nella collezione.

BM25 usa:

- frequenza del termine nel documento;
- rarità del termine nella collezione;
- normalizzazione rispetto alla lunghezza del documento.

In Solr, BM25 è il ranking lessicale standard.

## Dense retrieval

Oltre al matching lessicale, molti sistemi moderni usano anche rappresentazioni dense, dette **embedding**.

L'idea, in modo informale, è questa: un modello neurale trasforma un testo in un vettore numerico, in modo che testi semanticamente simili finiscano vicini nello spazio vettoriale.

In questo laboratorio useremo gli embedding solo come strumento operativo: calcoliamo un vettore per il titolo e uno per il corpo di ogni documento, poi chiediamo a Solr di trovare i documenti più vicini al vettore della query.

La teoria degli embedding neurali, di come si addestrano e perché funzionano, sarà approfondita nel corso di **Deep Learning**. Qui ci interessa solo confrontare due segnali di retrieval:

```text
BM25:
similarità lessicale basata sui termini

kNN su embedding:
similarità vettoriale basata su rappresentazioni dense
```

---

# 3. Struttura attesa della directory

La directory del laboratorio dovrebbe contenere almeno:

```text
solr/
├── resources/
│   └── cranfield_collection_splitted/
│       ├── cranfield0001
│       ├── cranfield0002
│       ├── ...
├── prepare_cranfield_for_solr.py
├── index_cranfield_jsonl.py
├── query_bm25.py
├── query_knn.py
├── compare_bm25_knn.py
└── requirements.txt
```

La directory:

```text
resources/cranfield_collection_splitted/
```

contiene i documenti Cranfield in formato testuale.

---

# 4. Creazione dell'ambiente Python

Creiamo un ambiente Conda dedicato.

```bash
conda create -n irlab python=3.11 -y
conda activate irlab
```

Controlliamo che `python` e `pip` siano quelli dell'ambiente appena creato:

```bash
which python
which pip
```

Installiamo le dipendenze principali:

```bash
python -m pip install tqdm requests pandas sentence-transformers
```

Oppure, se è presente il file `requirements.txt`:

```bash
python -m pip install -r requirements.txt
```

Un file `requirements.txt` minimale può contenere:

```text
requests
tqdm
pandas
sentence-transformers
```

---

# 5. Preparazione della collezione Cranfield

Il file:

```text
prepare_cranfield_for_solr.py
```

legge i documenti Cranfield, estrae:

- `id`;
- `path`;
- `title`;
- `body`.

Poi costruisce anche:

- `text`, ottenuto come concatenazione di titolo e corpo;
- `title_vector`, embedding del titolo;
- `body_vector`, embedding del corpo.

Il modello usato per calcolare gli embedding è:

```text
BAAI/bge-small-en-v1.5
```

Questo modello produce vettori di dimensione:

```text
384
```

Lanciamo:

```bash
python prepare_cranfield_for_solr.py \
  --input_dir resources/cranfield_collection_splitted/
```

Alla fine verrà prodotto il file:

```text
cranfield_solr_docs.jsonl
```

Controlliamo che esista:

```bash
ls -lrth
```

Possiamo ispezionarlo con:

```bash
less cranfield_solr_docs.jsonl
```

Ogni riga del file è un documento JSON. Per esempio:

```json
{
  "id": "cranfield_12",
  "path": "resources/cranfield_collection_splitted/cranfield0012",
  "title": "some structural and aeroelastic considerations of high speed flight .",
  "body": "...",
  "text": "some structural and aeroelastic considerations of high speed flight . ...",
  "title_vector": [...],
  "body_vector": [...]
}
```

Questo file è il punto di passaggio tra Python e Solr.

---

# 6. Download e avvio di Apache Solr

Scarichiamo Solr 10.0.0.

```bash
wget "https://dlcdn.apache.org/solr/solr/10.0.0/solr-10.0.0.tgz"
```

Estraiamo l'archivio:

```bash
tar xfvz solr-10.0.0.tgz
```

Entriamo nella directory:

```bash
cd solr-10.0.0
```

Avviamo Solr:

```bash
./bin/solr start -p 8983
```

Attenzione: usare il trattino normale `-p`, non il trattino lungo `–p`.

Verifichiamo che Solr sia attivo:

```bash
curl "http://localhost:8983/solr/admin/info/system?wt=json"
```

Se Solr risponde con un JSON, il server è attivo.

---

# 7. Creazione del core Cranfield

Creiamo un core chiamato:

```text
cranfield
```

```bash
./bin/solr create -c cranfield
```

Verifichiamo:

```bash
curl "http://localhost:8983/solr/admin/cores?action=STATUS&core=cranfield&wt=json"
```

---

# 8. Definizione dello schema Solr

Prima di indicizzare i documenti dobbiamo dichiarare i campi.

Questo passaggio è importante perché Solr deve sapere quali campi sono testuali e quali campi sono vettoriali.

I campi testuali saranno:

```text
path
title
body
text
```

I campi vettoriali saranno:

```text
title_vector
body_vector
```

In particolare, i campi vettoriali devono essere dichiarati come:

```text
DenseVectorField
```

Se Solr li crea automaticamente come semplici liste di numeri, cioè come `pdoubles`, la ricerca kNN non funzionerà.

---

## 8.1 Creazione del tipo vettoriale

Da dentro la directory `solr-10.0.0`, eseguiamo:

```bash
curl -X POST "http://localhost:8983/solr/cranfield/schema" \
  -H "Content-type:application/json" \
  --data-binary '{
    "add-field-type": {
      "name": "knn_vector_384",
      "class": "solr.DenseVectorField",
      "vectorDimension": 384,
      "similarityFunction": "cosine"
    }
  }'
```

Questo crea un tipo di campo vettoriale per embedding di dimensione 384.

---

## 8.2 Creazione dei campi

Aggiungiamo i campi testuali e vettoriali:

```bash
curl -X POST "http://localhost:8983/solr/cranfield/schema" \
  -H "Content-type:application/json" \
  --data-binary '{
    "add-field": [
      {"name": "path", "type": "string", "stored": true, "indexed": true},
      {"name": "title", "type": "text_general", "stored": true, "indexed": true},
      {"name": "body", "type": "text_general", "stored": true, "indexed": true},
      {"name": "text", "type": "text_general", "stored": true, "indexed": true},
      {"name": "title_vector", "type": "knn_vector_384", "stored": true, "indexed": true},
      {"name": "body_vector", "type": "knn_vector_384", "stored": true, "indexed": true}
    ]
  }'
```

Verifichiamo che `body_vector` sia corretto:

```bash
curl "http://localhost:8983/solr/cranfield/schema/fields/body_vector?wt=json"
```

L'output deve contenere:

```json
{
  "field": {
    "name": "body_vector",
    "type": "knn_vector_384",
    "indexed": true,
    "stored": true
  }
}
```

Se invece vediamo:

```json
"type": "pdoubles"
```

allora il campo è stato creato in modo sbagliato.

In quel caso bisogna cancellare e ricreare il core:

```bash
./bin/solr delete -c cranfield
./bin/solr create -c cranfield
```

e poi ripetere:

1. creazione del field type `knn_vector_384`;
2. creazione dei campi;
3. indicizzazione.

---

# 9. Indicizzazione dei documenti

Torniamo nella directory del laboratorio, cioè quella che contiene:

```text
cranfield_solr_docs.jsonl
index_cranfield_jsonl.py
```

Ad esempio:

```bash
cd ..
```

Lanciamo:

```bash
python index_cranfield_jsonl.py
```

Questo script:

1. cancella eventuali documenti già presenti nel core;
2. legge `cranfield_solr_docs.jsonl`;
3. invia i documenti a Solr a batch;
4. esegue il commit finale.

Verifichiamo quanti documenti sono indicizzati:

```bash
curl "http://localhost:8983/solr/cranfield/select?q=*:*&rows=0&wt=json"
```

Dovremmo vedere un numero di documenti compatibile con la collezione Cranfield.

Possiamo anche visualizzare un documento:

```bash
curl "http://localhost:8983/solr/cranfield/select?q=*:*&rows=1&fl=id,title,score&wt=json"
```

---

# 10. Query BM25

Solr può interrogare i campi testuali usando il ranking BM25.

Facciamo una query sul campo `text`, che contiene titolo e corpo del documento.

Da terminale:

```bash
curl "http://localhost:8983/solr/cranfield/select?q=text:(aeroelastic%20models%20aircraft)&fl=id,title,score&rows=10&wt=json"
```

Oppure da Python:

```bash
python query_bm25.py
```

Esempio di query:

```text
aeroelastic models aircraft
```

BM25 recupera documenti in base al matching lessicale tra i termini della query e i termini presenti nei documenti.

È interessante osservare:

- quali documenti contengono davvero i termini della query;
- se il match avviene nel titolo o nel corpo;
- come cambiano i risultati se la query viene modificata.

---

# 11. Query kNN sui vettori densi

Ora usiamo il campo:

```text
body_vector
```

Ogni documento ha un embedding del body.

La query viene codificata con lo stesso modello usato per i documenti:

```text
BAAI/bge-small-en-v1.5
```

Poi Solr cerca i documenti più vicini al vettore della query.

Lanciamo:

```bash
python query_knn.py
```

Esempio di query:

```text
aeroelastic models of heated high speed aircraft
```

Esempio di risultati:

```text
cranfield_12   some structural and aeroelastic considerations of high speed flight .
cranfield_14   piston theory - a new aerodynamic tool for the aeroelastician .
cranfield_746  aeroelastic problems in connection with high speed flight .
cranfield_486  similarity laws for aerothermoelastic testing .
```

Questi risultati sono ottenuti tramite similarità vettoriale, non tramite puro matching dei termini.

L'idea da osservare è:

```text
BM25 cerca documenti che condividono termini con la query.

kNN cerca documenti il cui vettore è vicino al vettore della query.
```

---

# 12. Confronto BM25 vs kNN

Lanciamo:

```bash
python compare_bm25_knn.py
```

Questo script confronta tre ranking:

```text
BM25 text
kNN body_vector
kNN title_vector
```

Il confronto è il cuore didattico del laboratorio.

---

## 12.1 BM25 text

BM25 lavora sul campo:

```text
text = title + body
```

Quindi usa informazione lessicale proveniente sia dal titolo sia dal corpo.

BM25 tende a favorire documenti che contengono termini importanti della query.

---

## 12.2 kNN body_vector

La ricerca kNN su `body_vector` confronta il vettore della query con il vettore del corpo del documento.

Questo può essere utile quando il corpo del documento contiene il contenuto informativo principale.

---

## 12.3 kNN title_vector

La ricerca kNN su `title_vector` confronta il vettore della query con il vettore del titolo del documento.

Questo può essere molto efficace quando il titolo è una buona sintesi del documento.

Può però essere meno robusto quando il titolo è troppo breve o ambiguo.

---

# 13. Cosa osservare

Durante il laboratorio proviamo a rispondere a queste domande:

1. I documenti recuperati da BM25 e da kNN sono gli stessi?
2. BM25 favorisce documenti che condividono esattamente i termini della query?
3. kNN recupera documenti semanticamente vicini anche quando il lessico cambia?
4. Il vettore del titolo e il vettore del corpo producono ranking diversi?
5. In quali casi sarebbe utile combinare i due segnali?
6. Quale metodo sembra più interpretabile?
7. Quale metodo sembra più robusto a query formulate con parole diverse da quelle dei documenti?

---

# 14. Interpretazione IR

Questo laboratorio mostra tre livelli di astrazione.

## Primo livello: retrieval lessicale

Il documento è rappresentato dai termini che contiene.

La query viene confrontata con i documenti usando BM25.

```text
query terms
   |
   v
inverted index
   |
   v
BM25 ranking
```

Questo è il paradigma classico dei motori di ricerca.

---

## Secondo livello: retrieval field-aware

Il documento non è un blocco unico.

Ha campi diversi:

```text
title
body
text
```

In un motore di ricerca reale, campi diversi possono avere importanza diversa.

Ad esempio, un termine nel titolo può essere più informativo di un termine nel corpo.

---

## Terzo livello: dense retrieval

Il documento e la query vengono rappresentati come vettori densi.

La ricerca diventa:

```text
trova i documenti più vicini al vettore della query
```

Questo non sostituisce necessariamente BM25.

Molti sistemi moderni usano strategie ibride:

```text
lexical retrieval + dense retrieval
```

per combinare precisione lessicale e similarità semantica.


## Quarto livello: hybrid retrieval

Il dense retrieval non sostituisce necessariamente BM25.

Molti sistemi moderni usano strategie ibride:

```text
lexical retrieval + dense retrieval
```

L'idea è combinare due segnali diversi:

```text
BM25:
precisione lessicale e matching sui termini

kNN:
similarità vettoriale nello spazio degli embedding
```

Un documento può essere rilevante perché contiene esattamente i termini della query.

Un altro documento può essere rilevante perché è semanticamente vicino alla query, anche se usa parole diverse.

Un sistema ibrido cerca di sfruttare entrambi i segnali.

### Combinazione tramite somma pesata

Una prima possibilità è combinare gli score con una somma pesata:

```text
hybrid_score(d) =
alpha * bm25_norm(d)
+
(1 - alpha) * knn_norm(d)
```

dove:

```text
bm25_norm(d):
score BM25 normalizzato del documento d

knn_norm(d):
score kNN normalizzato del documento d

alpha:
peso dato al segnale BM25
```

Se:

```text
alpha = 0.8
```

il ranking ibrido dà più importanza a BM25.

Se:

```text
alpha = 0.2
```

il ranking ibrido dà più importanza al segnale vettoriale.

Prima di sommare gli score è importante normalizzarli, perché BM25 e kNN possono avere scale diverse.

Per esempio:

```text
BM25 score:       0.0, 3.2, 8.5, 14.7
kNN similarity:  0.41, 0.63, 0.78, 0.91
```

Una normalizzazione semplice è la min-max normalization:

```text
score_norm(d) =
(score(d) - min_score) / (max_score - min_score)
```

Dopo questa trasformazione, gli score stanno tra 0 e 1.

### Combinazione tramite prodotto pesato

Un'altra possibilità è usare un prodotto pesato:

```text
hybrid_score(d) =
bm25_norm(d)^alpha
*
knn_norm(d)^(1 - alpha)
```

Questa combinazione è più selettiva.

Con la somma pesata, un documento può ottenere un buon punteggio anche se è forte solo per uno dei due segnali.

Con il prodotto, invece, un documento viene penalizzato molto se uno dei due segnali è basso.

Per esempio:

```text
bm25_norm(d) = 0.9
knn_norm(d) = 0.1
```

Con la somma pesata il documento può ancora ottenere uno score discreto.

Con il prodotto, invece, il documento viene penalizzato perché il segnale kNN è basso.

Quindi:

```text
somma pesata:
più flessibile

prodotto pesato:
più severo
```

### Esercizio: implementare un ranking ibrido

Estendere lo script di confronto tra BM25 e kNN implementando almeno una combinazione ibrida.

Provare una somma pesata:

```text
hybrid_score(d) =
alpha * bm25_norm(d)
+
(1 - alpha) * knn_norm(d)
```

e, opzionalmente, un prodotto pesato:

```text
hybrid_score(d) =
bm25_norm(d)^alpha
*
knn_norm(d)^(1 - alpha)
```

Provare diversi valori di `alpha`:

```text
alpha = 0.2
alpha = 0.5
alpha = 0.8
```

Domande guida:

1. Il ranking ibrido è più simile a BM25 o a kNN?
2. Quali documenti entrano nella top-10 grazie al segnale vettoriale?
3. Quali documenti restano in alto perché sono forti sia per BM25 sia per kNN?
4. La somma pesata e il prodotto pesato producono ranking diversi?
5. Quale valore di `alpha` sembra più convincente sulle query Cranfield provate?
6. In quali casi il segnale dense aiuta BM25?
7. In quali casi BM25 sembra più affidabile del dense retrieval?

### Interpretazione

BM25 e kNN non sono segnali alternativi in senso stretto.

Sono segnali complementari.

BM25 è forte quando il matching lessicale è importante.

Il dense retrieval può aiutare quando la query e il documento usano parole diverse ma descrivono concetti vicini.

Per questo molti sistemi reali non scelgono semplicemente tra BM25 e dense retrieval, ma combinano i due approcci:

```text
BM25 + dense retrieval = hybrid retrieval
```

Il punto importante è che Solr ci permette di vedere nello stesso sistema:

- indicizzazione;
- campi;
- ranking BM25;
- vettori densi;
- ricerca kNN;
- confronto tra ranking diversi;
- possibile combinazione ibrida dei segnali.

---

# 15. Problemi comuni

## Problema 1: Solr non parte

Controllare che Solr sia avviato:

```bash
curl "http://localhost:8983/solr/admin/info/system?wt=json"
```

Se non risponde, avviare Solr:

```bash
cd solr-10.0.0
./bin/solr start -p 8983
```

---

## Problema 2: errore sulla query kNN

Controllare il campo `body_vector`:

```bash
curl "http://localhost:8983/solr/cranfield/schema/fields/body_vector?wt=json"
```

Deve essere:

```json
"type": "knn_vector_384"
```

Se è:

```json
"type": "pdoubles"
```

il core va ricreato.

Procedura:

```bash
cd solr-10.0.0
./bin/solr delete -c cranfield
./bin/solr create -c cranfield
```

Poi ripetere:

1. creazione del field type `knn_vector_384`;
2. creazione dei campi;
3. indicizzazione.

---

## Problema 3: dimensione del vettore errata

Controllare la dimensione dei vettori nel JSONL:

```bash
python - <<'PY'
import json

with open("cranfield_solr_docs.jsonl", encoding="utf-8") as f:
    doc = json.loads(next(f))

print(type(doc["body_vector"]))
print(len(doc["body_vector"]))
print(type(doc["body_vector"][0]))
PY
```

L'output atteso è:

```text
<class 'list'>
384
<class 'float'>
```

Se la dimensione non è 384, il field type Solr deve usare la dimensione corretta.

---

## Problema 4: `requests`, `tqdm` o `sentence_transformers` non trovati

Installare le dipendenze:

```bash
python -m pip install requests tqdm pandas sentence-transformers
```

Assicurarsi di essere nell'ambiente corretto:

```bash
conda activate irlab
which python
```

---

# 16. Comandi principali riassunti

## Ambiente Python

```bash
conda create -n irlab python=3.11 -y
conda activate irlab
python -m pip install requests tqdm pandas sentence-transformers
```

## Preparazione Cranfield

```bash
python prepare_cranfield_for_solr.py \
  --input_dir resources/cranfield_collection_splitted/
```

## Avvio Solr

```bash
cd solr-10.0.0
./bin/solr start -p 8983
```

## Creazione core

```bash
./bin/solr create -c cranfield
```

## Creazione field type vettoriale

```bash
curl -X POST "http://localhost:8983/solr/cranfield/schema" \
  -H "Content-type:application/json" \
  --data-binary '{
    "add-field-type": {
      "name": "knn_vector_384",
      "class": "solr.DenseVectorField",
      "vectorDimension": 384,
      "similarityFunction": "cosine"
    }
  }'
```

## Creazione campi

```bash
curl -X POST "http://localhost:8983/solr/cranfield/schema" \
  -H "Content-type:application/json" \
  --data-binary '{
    "add-field": [
      {"name": "path", "type": "string", "stored": true, "indexed": true},
      {"name": "title", "type": "text_general", "stored": true, "indexed": true},
      {"name": "body", "type": "text_general", "stored": true, "indexed": true},
      {"name": "text", "type": "text_general", "stored": true, "indexed": true},
      {"name": "title_vector", "type": "knn_vector_384", "stored": true, "indexed": true},
      {"name": "body_vector", "type": "knn_vector_384", "stored": true, "indexed": true}
    ]
  }'
```

## Indicizzazione

```bash
cd ..
python index_cranfield_jsonl.py
```

## Query BM25

```bash
python query_bm25.py
```

## Query kNN

```bash
python query_knn.py
```

## Confronto

```bash
python compare_bm25_knn.py
```

---

# 17. Take-away

In questo laboratorio abbiamo usato Solr per vedere due famiglie di metodi di retrieval sulla stessa collezione.

BM25 rappresenta il retrieval lessicale classico:

```text
documenti e query sono confrontati attraverso i termini
```

Il dense retrieval rappresenta documenti e query come vettori:

```text
documenti e query sono confrontati attraverso la vicinanza nello spazio degli embedding
```

I due approcci catturano segnali diversi.

BM25 è forte quando il matching lessicale è importante.

Il dense retrieval può essere utile quando vogliamo catturare similarità semantica anche senza perfetta sovrapposizione di parole.

In molti sistemi reali, questi segnali vengono combinati:

```text
BM25 + dense retrieval = hybrid retrieval
```

Il punto importante per il corso di Information Retrieval è che Solr ci permette di vedere nello stesso sistema:

- indicizzazione;
- campi;
- ranking BM25;
- vettori densi;
- ricerca kNN;
- confronto tra ranking diversi.

# 18. Altre funzionalità Solr da osservare

In questo laboratorio ci siamo concentrati su:

```text
BM25
campi testuali
campi vettoriali
ricerca kNN
confronto tra ranking
```

Solr però offre molte altre funzionalità tipiche di un motore di ricerca reale.

In questa sezione vediamo alcune estensioni utili da provare.

---

## 18.1 Analyzer: come Solr trasforma il testo

Quando indicizziamo un campo testuale, Solr non salva semplicemente la stringa originale.

Prima applica una pipeline di analisi del testo, chiamata **analyzer**.

Un analyzer può includere operazioni come:

```text
tokenizzazione
lowercasing
rimozione di stopword
stemming
normalizzazione
```

Nel laboratorio Lucene abbiamo usato esplicitamente un `Analyzer`.

In Solr, invece, l'analyzer è associato al **tipo del campo**.

Per esempio, nel nostro schema usiamo:

```text
title: text_general
body: text_general
text: text_general
```

Il tipo `text_general` definisce come il testo viene trasformato prima di essere inserito nell'indice.

Quindi, concettualmente:

```text
testo originale
      |
      v
analyzer
      |
      v
token indicizzati
      |
      v
indice inverso
```

Questo è importante perché la stessa query può produrre risultati diversi a seconda dell'analyzer usato.

Domande da osservare:

1. Una parola maiuscola e minuscola viene trattata allo stesso modo?
2. Le parole molto comuni vengono rimosse?
3. Forme diverse della stessa parola vengono ricondotte a una forma comune?
4. Il comportamento è lo stesso nei campi `title`, `body` e `text`?

Se si usa la Admin UI di Solr, è possibile esplorare l'analisi dei campi dalla sezione dedicata all'analysis dello schema.

---

## 18.2 Query parser: alcune query da provare

Finora abbiamo usato query semplici, per esempio:

```text
text:(aeroelastic models aircraft)
```

Solr permette però query più articolate.

Esempi:

```text
text:aircraft
```

cerca il termine `aircraft` nel campo `text`.

```text
title:aircraft
```

cerca il termine `aircraft` solo nel titolo.

```text
body:aeroelastic
```

cerca il termine `aeroelastic` solo nel corpo.

```text
title:(aircraft)^3 OR body:(aircraft)
```

dà più peso ai match nel titolo rispetto ai match nel corpo.

```text
text:"high speed"
```

cerca la frase `high speed`.

```text
text:aero*
```

cerca termini che iniziano con `aero`.

```text
text:aircraft~1
```

cerca termini simili ad `aircraft`, con una piccola distanza di edit.

Queste query mostrano che Solr non riceve solo una stringa, ma la interpreta attraverso un **query parser**.

Il query parser trasforma la query testuale in una struttura interna che viene poi valutata sull'indice.

---

## 18.3 Parametri utili: q, fq, fl, rows, sort

Quando interroghiamo Solr, alcuni parametri sono particolarmente importanti.

```text
q
```

è la query principale. Determina quali documenti matchano e contribuisce allo score.

Esempio:

```text
q=text:(aeroelastic models aircraft)
```

```text
fq
```

è un filtro. Restringe i risultati, ma non contribuisce allo score.

Esempio:

```text
fq=title:aircraft
```

```text
fl
```

specifica quali campi vogliamo ricevere in output.

Esempio:

```text
fl=id,title,score
```

```text
rows
```

specifica quanti risultati vogliamo ottenere.

Esempio:

```text
rows=10
```

```text
sort
```

permette di ordinare i risultati in un modo diverso dallo score.

Esempio:

```text
sort=id asc
```

Questa distinzione è importante:

```text
q  -> retrieval e ranking
fq -> filtering
fl -> output
```

Nel corso di IR, questa differenza corrisponde alla separazione tra:

```text
selezione dei candidati
ranking dei candidati
presentazione dei risultati
```

---

## 18.4 Explain e debugQuery: leggere lo score BM25

Una funzionalità molto utile di Solr è la possibilità di chiedere una spiegazione dello score.

Per esempio:

```bash
curl "http://localhost:8983/solr/cranfield/select?q=text:(aeroelastic%20models%20aircraft)&fl=id,title,score&rows=3&debugQuery=true&wt=json"
```

Il parametro:

```text
debugQuery=true
```

chiede a Solr di restituire informazioni aggiuntive sul modo in cui è stato calcolato lo score.

Questo è utile per collegare Solr alla teoria vista a lezione.

In particolare, nell'explain possiamo osservare componenti legate a:

```text
BM25
frequenza del termine
rarità del termine
normalizzazione del campo
contributi dei singoli termini
```

Questa parte è importante perché rende il ranking meno opaco.

Non vediamo solo che un documento è primo, ma possiamo chiederci:

```text
Perché questo documento ha questo score?
Quali termini hanno contribuito di più?
Il match è avvenuto nel titolo o nel corpo?
```

---

## 18.5 Funzionalità Solr non usate in questo laboratorio

Solr include molte altre funzionalità importanti.

Per esempio:

```text
faceting
highlighting
spell checking
suggestion/autocomplete
pagination
sorting
near real-time indexing
replication
sharding
SolrCloud
```

In questo laboratorio non le useremo, perché l'obiettivo è concentrarsi sul confronto tra:

```text
BM25
dense retrieval
kNN
campi testuali e campi vettoriali
```

Tuttavia, queste funzionalità sono centrali nei motori di ricerca reali.

Per esempio:

```text
faceting
```

serve per navigare i risultati per categoria, autore, anno, tipo di documento.

```text
highlighting
```

serve per mostrare all'utente le parti del documento che hanno prodotto il match.

```text
spell checking
```

serve per correggere o suggerire query alternative.

```text
autocomplete
```

serve per suggerire query mentre l'utente digita.

Quindi Solr non è solo un ranking engine, ma una piattaforma completa per costruire applicazioni di search.

Per approfondire queste funzionalità, conviene partire dalla documentazione ufficiale Solr:

- Faceting:
  https://solr.apache.org/guide/solr/latest/query-guide/faceting.html

- Highlighting:
  https://solr.apache.org/guide/solr/latest/query-guide/highlighting.html

- Spell checking:
  https://solr.apache.org/guide/solr/latest/query-guide/spell-checking.html

- Suggester / autocomplete:
  https://solr.apache.org/guide/solr/latest/query-guide/suggester.html

- Solr Reference Guide:
  https://solr.apache.org/guide/solr/latest/index.html

---

# 19. Estensione possibile: valutazione su query e qrels Cranfield

Nel laboratorio precedente abbiamo visto che un sistema di retrieval non va solo costruito, ma anche valutato.

La collezione Cranfield è storicamente importante proprio perché contiene:

```text
documenti
query
giudizi di rilevanza
```

I giudizi di rilevanza sono spesso chiamati:

```text
qrels
```

Una possibile estensione del laboratorio consiste nel valutare i ranking prodotti da:

```text
BM25
kNN su title_vector
kNN su body_vector
eventuale sistema ibrido
```

usando metriche come:

```text
Precision@k
Recall@k
MAP
nDCG
MRR
```

Esempio di domande sperimentali:

1. BM25 è migliore del dense retrieval sulle query Cranfield?
2. Il vettore del body funziona meglio del vettore del title?
3. Un sistema ibrido BM25 + kNN migliora rispetto ai due sistemi separati?
4. Quali query migliorano con il dense retrieval?
5. Quali query peggiorano?

Questa estensione chiude il ciclo classico dell'Information Retrieval:

```text
indicizzazione
      |
      v
ranking
      |
      v
valutazione
      |
      v
analisi degli errori
```

In questo laboratorio ci concentriamo sulla costruzione e sull'osservazione qualitativa dei ranking.

La valutazione quantitativa può essere svolta come estensione o esercizio successivo.

---

# 20. Nota: usare anche l'interfaccia web di Solr

Finora abbiamo usato Solr soprattutto da terminale e da Python, tramite API HTTP.

Solr però fornisce anche una Admin UI, cioè un'interfaccia web utile per esplorare il core, controllare lo schema, fare query e vedere rapidamente i risultati.

Dopo aver avviato Solr:

```bash
cd solr-10.0.0
./bin/solr start -p 8983
```

l'interfaccia è disponibile all'indirizzo:

```text
http://localhost:8983/solr
```

Da lì è possibile:

- selezionare il core `cranfield`;
- controllare lo stato del core;
- vedere i campi nello schema;
- eseguire query dal pannello `Query`;
- osservare i risultati restituiti da Solr;
- verificare che i campi `title`, `body`, `text`, `title_vector` e `body_vector` siano presenti.

Per esempio, nel pannello `Query`, dopo aver selezionato il core `cranfield`, si può provare:

```text
q = text:(aeroelastic models aircraft)
fl = id,title,score
rows = 10
wt = json
```

Questa query corrisponde alla ricerca BM25 che abbiamo eseguito anche da terminale e da Python.

L'interfaccia web è utile per esplorare Solr, ma nel laboratorio useremo soprattutto Python perché rende più semplice confrontare ranking diversi e automatizzare gli esperimenti.

Riferimenti utili:

- Documentazione ufficiale della Solr Admin UI:
  https://solr.apache.org/guide/solr/latest/getting-started/solr-admin-ui.html

- Tutorial ufficiali Solr:
  https://solr.apache.org/guide/solr/latest/getting-started/solr-tutorial.html

- Introduzione ufficiale a Solr:
  https://solr.apache.org/guide/solr/latest/getting-started/introduction.html

- Documenti, campi e schema design:
  https://solr.apache.org/guide/solr/latest/getting-started/documents-fields-schema-design.html

- Schema API, utile per capire le chiamate curl usate nel laboratorio:
  https://solr.apache.org/guide/solr/latest/indexing-guide/schema-api.html
  
  
# 21. Nota di coerenza con il laboratorio Lucene: analyzer e schema

Nel laboratorio precedente abbiamo usato direttamente Lucene da Java.

In particolare, avevamo definito un analyzer personalizzato, chiamato `SimpleCranfieldAnalyzer`, che applicava una pipeline di questo tipo:

- tokenizzazione standard;
- normalizzazione standard;
- lowercase;
- rimozione delle stopword;
- Porter stemming.

In forma schematica:

    testo originale
          |
          v
    tokenizzazione standard
          |
          v
    lowercase
          |
          v
    rimozione stopword
          |
          v
    Porter stemming
          |
          v
    token indicizzati

Nel codice Lucene, questa scelta era esplicita: l'analyzer veniva creato e passato direttamente all'indicizzatore e al query parser.

In Solr, invece, non scriviamo direttamente codice Java per costruire l'analyzer.

In Solr l'analyzer è associato al tipo del campo nello schema.

Per esempio, quando definiamo campi come:

    title: text_general
    body: text_general
    text: text_general

stiamo dicendo a Solr di usare l'analyzer associato al field type `text_general`.

Quindi il punto importante è:

    Lucene:
    l'analyzer è scelto esplicitamente nel codice Java.

    Solr:
    l'analyzer è scelto nello schema, tramite il tipo del campo.

## Attenzione: `text_general` non è necessariamente identico al nostro analyzer Lucene

Nel laboratorio Lucene usavamo esplicitamente una pipeline con lowercase, stopword removal e Porter stemming.

Nel laboratorio Solr, se usiamo il field type standard `text_general`, la pipeline dipende dalla configurazione del core Solr.

Quindi `text_general` può non essere esattamente equivalente al nostro `SimpleCranfieldAnalyzer`.

Questo significa che i risultati ottenuti con Solr possono essere leggermente diversi da quelli ottenuti con il laboratorio Lucene, anche usando gli stessi documenti e le stesse query.

La differenza non è un errore: è una conseguenza del fatto che abbiamo usato analyzer diversi.

## Come rendere Solr più simile al laboratorio Lucene

Se vogliamo replicare meglio il comportamento del laboratorio Lucene, possiamo definire in Solr un field type dedicato, per esempio:

    text_en_stem

Questo field type dovrebbe usare una pipeline simile a quella del laboratorio Lucene:

    tokenizer standard
          |
          v
    lowercase
          |
          v
    stopword removal
          |
          v
    Porter stemming

Concettualmente, nello schema Solr il field type potrebbe essere definito così:

    <fieldType name="text_en_stem" class="solr.TextField">
      <analyzer>
        <tokenizer class="solr.StandardTokenizerFactory"/>
        <filter class="solr.LowerCaseFilterFactory"/>
        <filter class="solr.StopFilterFactory" ignoreCase="true"/>
        <filter class="solr.PorterStemFilterFactory"/>
      </analyzer>
    </fieldType>

Poi potremmo definire i campi testuali usando questo tipo:

    title: text_en_stem
    body: text_en_stem
    text: text_en_stem

In questo modo la pipeline Solr sarebbe più vicina a quella usata nel laboratorio Lucene.

## Perché questa differenza è importante

Questa differenza è didatticamente importante perché cambiare analyzer significa cambiare i token che finiscono nell'indice.

Per esempio, con lo stemming parole come:

    compute
    computing
    computation

possono essere ricondotte a forme più simili.

Con la rimozione delle stopword, parole molto frequenti come:

    the
    of
    and

possono essere eliminate dall'indice.

Queste scelte possono modificare:

- quali documenti matchano una query;
- il valore dello score BM25;
- l'ordine finale dei risultati;
- il confronto tra Lucene e Solr.

Quindi, quando confrontiamo i risultati del laboratorio Lucene con quelli del laboratorio Solr, dobbiamo ricordare che il ranking dipende non solo dal modello di scoring, ma anche dalla pipeline di analisi del testo.

## Messaggio finale

Nel laboratorio Lucene controllavamo direttamente l'analyzer nel codice.

Nel laboratorio Solr controlliamo l'analyzer tramite lo schema.

Il concetto IR è lo stesso:

    testo
      |
      v
    analyzer
      |
      v
    token
      |
      v
    indice inverso
      |
      v
    ranking

ma cambia il livello a cui configuriamo il sistema.

Per questo motivo, Solr non va visto come un sistema diverso da Lucene dal punto di vista concettuale: Solr usa Lucene sotto il cofano, ma espone le sue funzionalità tramite schema, core, campi, API HTTP e configurazioni dichiarative.