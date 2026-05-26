https://colab.research.google.com/drive/1XHONRbBC7tMeTzhIW3-jJoaet4snEbDr?usp=sharing

#### BM25 AND LANGUAGE MODELS
L'obiettivo non è solo implementare le formule, ma capire:

- perché BM25 modifica TF-IDF;
- perché la term frequency deve saturare;
- perché la lunghezza dei documenti va normalizzata;
- perché nei language model serve lo smoothing;
- come cambiano i ranking prodotti dai diversi modelli.

1. caricamento della stessa collezione del laboratorio precedente
2. preprocessing dei documenti
3. costruzione delle statistiche della collezione
4. intuizione della formula BM25
5. analisi del ruolo di k1
6. analisi del ruolo di b
7. implementazione di BM25
8. ispezione dei contributi termine-per-termine
9. confronto qualitativo con TF-IDF
10. introduzione ai language model
11. smoothing con Dirichlet


#### INIZIO LABORATORIO BM25
###### Funzione di load 20 news group
con una funzione di fetch poi vai a precisare la categoria e il subset train
###### Applicazione di preprocessing
- rimozione dell'header;
- lowercase;
- normalizzazione dei numeri;
- rimozione della punteggiatura;
- tokenizzazione;
- rimozione delle stop words;
- rimozione dei token troppo corti;
- stemming.
L'obiettivo non è costruire il miglior preprocessing possibile, ma avere una rappresentazione semplice e controllabile.
###### Struttura dati
costruiamo una struttura dati composta da 
docID -> lista di token che lo riguardano
e poi aggiungiamo 
- $L_d$
	- è la lunghezza del documento, cioè il numero di token dopo il preprocessing.
- $tf_{t,d}$
	- è la frequenza del termine nel documento.
- $df_t$
	- è il numero di documenti in cui il termine compare almeno una volta.
- $cf_t$
	- è il numero totale di occorrenze del termine nell'intera collezione.
- $\bar{L}$
	- è la lunghezza media dei documenti.

La formula BM25 che useremo è:
$$

BM25(d,q)

=

\sum_{t \in q^\ast}

IDF(t)

\cdot

\frac{(k_1+1)tf_{t,d}}

{k_1\left((1-b)+b\frac{L_d}{\overline L}\right)+tf_{t,d}}

$$

- $tf_{t,d}$ è la frequenza del termine nel documento;
- $L_d$ è la lunghezza del documento;
- $\overline L$ è la lunghezza media dei documenti;
- $k_1$ controlla la saturazione della term frequency;
- $b$ controlla la normalizzazione per lunghezza;
- $q^\ast$ indica l'insieme dei termini distinti della query.
Per l'IDF useremo:
$$

IDF(t)=

\log\left(

1+

\frac{N-df_t+0.5}{df_t+0.5}

\right)

$$
Questa è una variante comune che evita valori negativi dell'IDF.
 nel denominatore è presente la formula Bd
La formula BM25 contiene $B_d$ nel denominatore:
$$

\frac{(k_1+1)tf_{t,d}}{tf_{t,d}+k_1 B_d}

$$
Quindi:
- se un documento è più lungo della media, $B_d$ aumenta
- se $B_d$ aumenta, il denominatore aumenta
- se il denominatore aumenta, il contributo del termine diminuisce
In questo modo BM25 cerca di evitare che i documenti lunghi siano favoriti solo perché contengono più parole.
$$
B_d = (1-b) + b \frac{L_d}{\overline L}
$$

La normalizzazione per lunghezza serve a ridurre la disparità tra documenti lunghi e documenti corti. Un documento lungo ha più probabilità di contenere molte volte un termine solo perché contiene più parole, quindi senza normalizzazione potrebbe ricevere uno score più alto anche se non è davvero più rilevante.  
In BM25 questa correzione è controllata dal parametro `b`

###### PSEUDOCODICE BM25
```scss
INPUT:
    D = collezione di documenti tokenizzati
    q = query testuale
    k1, b = parametri BM25
    top_k = numero di documenti da restituire

1. Calcolo le statistiche della collezione:  
	- N = numero documenti  
	- len[d] = lunghezza di ogni documento  
	- avg_len = lunghezza media  
	- tf[t,d] = frequenza del termine t nel documento d  
	- df[t] = numero di documenti che contengono t

2. Calcolo inverse document frequency
	se df[t] = 0:
	    idf(t) = 0
	altrimenti:
	    idf(t) = log(1 + (N - df[t] + 0.5) / (df[t] + 0.5))
3. funzione di calcolo del contributo
   contributo(t,d):
		se tf = 0:
		    contributo(t, d) = 0
		altrimenti:
		    B = (1 - b) + b * len[d] / avg_len
		    componente_tf = ((k1 + 1) * tf) / (tf + k1 * B)
		    contributo(t, d) = idf(t) * componente_tf
4. applicazione alla query q
	preprocessing alla query q, possiamo decidere se semplificare le cose togliendo la 
	ripetizione dei termini
	Q = insieme dei termini distinti della query
	Costruisco l'insieme dei candidati C:
		C=insieme vuoto
		per ogni termine t in Q:
		aggiungo a C tutti i documenti di t
			usando un inverted index
	per ogni documento d in C:
	    score[d] = 0
	    per ogni termine t in Q:
	        score[d] = score[d] + contributo(t, d)
	    se score[d] > 0:
	        salva (d, score[d])
	ordina i documenti salvati per score decrescente
	restituisci i primi top_k documenti
```

Document frequency vs idf con BM25

| **Term**    | **DF** | **IDF** |
| ----------- | ------ | ------- |
| **graphic** | 190    | 1.1220  |
| **imag**    | 139    | 1.4335  |
| **file**    | 158    | 1.3059  |
| **format**  | 71     | 2.1019  |
| **window**  | 74     | 2.0608  |
| **jpeg**    | 24     | 3.1729  |
| **card**    | 59     | 2.2856  |

### Cosa è cambiato?

## Esercizio 1 — Interpretare uno score BM25

DOMANDA PAPABILE DA ESAMES
Scegli uno dei documenti nella top-10 BM25.
Usa `explain_bm25_score` per rispondere:
1. Quale termine della query contribuisce di più allo score?
2. Il contributo maggiore dipende da `tf`, da `idf`, o da entrambi?
3. Ci sono termini della query che hanno contributo zero?
4. Il documento è lungo o corto rispetto alla media?


Query: graphic file format
Processed query: ['file', 'format', 'graphic']
Document: 490
Document length: 86

|**Term**|**TF**|**DF**|**IDF**|**Contribution**|
|---|---|---|---|---|
|**file**|2|158|1.3059|2.1686|
|**format**|4|71|2.1019|4.1947|
|**graphic**|1|190|1.1220|1.3949|
|---|---|---|---|---|
|**TOTAL**||||**7.7582**|


scelto il documento numero `490`
risposta 1. il termine format
risposta 2. - BM25 combina questi due aspetti, ma la `tf` non cresce linearmente: viene saturata dalla formula BM25
risposta 3. forse graphic che ha in realtà term frequency a 0
risposta 4. se il documento scelto è lungo 86 mi basta confrontarlo con L average ovvero la media della dimensione di un documento

N.B è possibile sfruttare la saturazione delle term frequency della query usando k3

BM25 è robusto con valori compresi tra k1=1.2-2.0 e b circa 0.75
Questi valori non sono leggi universali.
In un sistema reale, i parametri andrebbero scelti su un development set, misurando metriche come:
- precision
- recall
- MAP
- nDCG
- MRR

COSINE SIMILARITY VS BM25 
- TF-IDF + cosine normalizza geometricamente i vettori
- BM25 usa saturazione della term frequency e normalizzazione esplicita della lunghezza
- cosine similarity ritorna un valore compreso tra 0 e 1 mentre BM25 uno score numerico che va a infinito
### LANGUAGE MODEL PER INFORMATION RETRIEVAL
Formalmente, per un documento $d$ costruiamo un modello $M_d$ e ordiniamo i documenti secondo:
$$

p(q \mid M_d)

$$
Con una query composta dai termini $w_1,\ldots,w_m$, usando un modello unigramma:
$$

p(q \mid M_d) =

\prod_{i=1}^{m} p(w_i \mid M_d)

$$
In pratica useremo i logaritmi:
$$

\log p(q \mid M_d) =

\sum_{i=1}^{m} \log p(w_i \mid M_d)

$$
un termine non presente nel documento ha probabilità zero.
renderebbe tutta la probabilità nulla
Per evitare questo problema usiamo lo **smoothing**.
Qui implementiamo lo smoothing di Dirichlet:
$$

p(t \mid d)

=

\frac{tf_{t,d} + \mu p(t \mid C)}

{|d| + \mu}

$$
