### DEFINIZIONE DI IR
**Information Retrieval (IR)** racchiude il processo di trovare materiale (di solito documenti), di natura non strutturata (generalmente testo), che soddisfa un **information need** all’interno di grandi collezioni di dati, solitamente memorizzate su computer.
- NON SONO FORMULE MA SONO UNA **catena di elaborazione end-to-end** che porta a un output.
##### Assunzioni
- la **collezione di dati è statica**
- cerchiamo **documenti rilevanti** rispetto ad un certo **information need** 
#### Tipico modello di ricerca
![[Pasted image 20260306165440.png]]

- *User task*
	- È il **problema reale dell’utente nel mondo reale**.
- *Information need*
	- È il **bisogno informativo reale** dell’utente.
	- È importante per misurare l'efficacia del modello.
- *Query*
	- La **query** è ciò che l’utente scrive nel motore di ricerca.

- *Query Terms* sono presenti tra **query** e **search engine** , cioè estrazioni dei termini in una forma comprensibile al motore di ricerca.

- *Search Engine*
	- Il motore di ricerca prende la **query** e cerca nei documenti.
	- l’**information need è nascosto** per il search engine.
- *Collection*
	- È la **collezione di documenti** in risposta alla query

>[!tip] **Information need vs Query**
> - **Information need**: il bisogno informativo dell’utente, cioè il tema o l’argomento su cui vuole ottenere informazioni.
> - **Query**: la formulazione esplicita che l’utente inserisce nel sistema per comunicare il proprio bisogno informativo.
### COME SI MISURA UN sistema IR
Spesso si misura **l’intera pipeline end-to-end**.
- non le varie fasi
#### 2 metriche specifiche utilizzate in modo end-to-end (di solito)
##### Precision
- La *precision* misura, tra tutti i *documenti recuperati* dal sistema, *quanti* sono effettivamente *rilevanti*.
	- misura i **falsi positivi**
Formula concettuale:
```scss
Precision = documenti rilevanti recuperati / documenti recuperati
```
##### Recall
- La *recall* misura, tra tutti i *documenti rilevanti* presenti nella collezione, quanti sono stati *recuperati dal sistema*.
	- misura i **falsi negativi**
Formula concettuale:
```scss
Recall = documenti rilevanti recuperati / documenti rilevanti totali
```
###### Domanda d’esame: differenza tra notazione sparsa e densa
Attenzione: la differenza può riferirsi a **due cose diverse**:
- **Natura intrinseca del fenomeno:** 
	- indica **come il fenomeno è realmente** (es. i dati sono naturalmente sparsi perché molti valori sono zero).
- **Modo in cui lo rappresentiamo:** 
	- indica **come scegliamo di memorizzare o modellare quei dati nel sistema** (es. rappresentazione sparsa o densa in memoria).
###### Rappresentazione sparsa
- si memorizzano **solo gli elementi diversi da zero**
- si evitano i bit inutili a 0
###### Rappresentazione densa
- si memorizzano **tutti i valori**, anche quelli inutili (0)

Nel caso dell’IR le matrici sono **molto sparse**, perché la maggior parte dei termini **non appare nella maggior parte dei documenti**.
##### Struttura dati utilizzata: matrice a indice inverso
Idea iniziale:
- per ogni **termine** memorizziamo la **lista dei documenti che lo contengono**
- i documenti sono identificati da un **docID**

Questa struttura si chiama **inverted index**.
- Un **inverted index** è una struttura dati che associa ad ogni termine la lista dei documenti in cui quel termine appare.
###### Struttura dell’inverted index
![[Pasted image 20260306175858.png|600]]
È composto da due parti principali:
- **Dictionary**  
    insieme dei termini indicizzati
- **Postings list**  
    lista dei documenti che contengono il termine
- **Posting**  
    singolo elemento della lista che indica che un termine appare in un documento.
- **Postings list**  
    lista di tutti i documenti che contengono un determinato termine.
### Implementazione
Per rappresentare questa struttura useremo:
- **linked list** chiamate **posting list**
- ogni posizione della lista è detta **posting**

- il **dizionario punta all’inizio della posting list**
- per ora **non ordiniamo le posting list**
#### Costruzione di questa struttura dati
![[Pasted image 20260306165514.png]]
La costruzione dell’indice è divisa in tre fasi principali.
###### Tokenizzazione
- La **tokenizzazione** consiste nel trasformare il testo di un documento in una sequenza di **token**, cioè unità elementari (di solito parole)
Esempio:
```
Friends, Romans, countrymen
↓
Friends Romans countrymen
```
- il risultato viene detto:
	- *token stream*
###### Normalizzazione linguistica
- Si applicano **moduli linguistici** che modificano i token.
Obiettivo:
- rendere i termini **più uniformi**
- ridurre le varianti linguistiche
Esempio:
```
signor rossi
colore rossi
```
problema: a quale posting list associare "rossi"?
- viene affrontato dalla normalizzazione linguistica

- Lemmatizzazione
	- Processo che fa parte della normalizzazione linguistica e porta una parola alla sua **forma base (lemma)**
Esempio:
```
studentessa → studente
correndo → correre
```
Serve per ridurre le varianti grammaticali
###### Indicizzazione
- Ultima fase:
	- i token normalizzati vengono inseriti nell’**indice inverso**
Quindi:
```
token normalizzati
↓
inverted index
↓
dictionary + postings lists
```




#### SORTING IN BASE AI TERMINI
- document frequency è molto utile
	- tipo se esce the 3000k volte, posso pure ignorarlo nella fase di filtering
- quindi alla fine avremo
	- termine, frequenza, docID -> messa dentro le posting list

### BOOLEAN RETRIEVAL MODEL
- definizione e idea
	- uso di AND, OR e NOT
- svantaggi (lettura delle parole non in ordine)
	- persona mangia gelato= gelato mangia persona
- utilizzo
	- spotlight
	- email
	- library catalog
##### IMPORTANZA DEL MERGE CON GLI AND
### SCRIVERE ESERCIZI!!!

### AGGIUNGERE PHRASE QUERIES
### CON B-GRAMMI
Un **bi-gramma (bigram)** è una **sequenza di due token consecutivi**.
- token = parola o unità lessicale ottenuta dopo la **tokenizzazione**    
- bi-gramma = **due token di seguito**

- se avessi una frase "stanford university"
- non posso usare un solo token per 2 parole 
- uso biword indexes
	- ma per query maggiori di 2 non funzionerebbe
	- la precision ne viene intaccata perchè potrei avere più falsi positivi
	- soluzione non fattibile
- soluzione peffozza
	- salvo la posizione in cui appare la parola
		- così poi posso fare stanford and university con il controllo delle posizioni uno dopo l'altro
	- problema: tanta memoria dovuto alla posizione del testo
	- un documento avrà un migliaio di parole
	- con un documento circa 10 bit

### NUMERI SU NUMERI SPIEGAZIONE
- tokenizzo le cose più cercate
	- tipo Michael Jackson
		- per ridurre perdite di tempo
	- senza usare positional index

#### MISURA DEI TREND
- usiamo probabilità condizionata
	- per misurare un trend
