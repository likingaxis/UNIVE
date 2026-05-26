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
