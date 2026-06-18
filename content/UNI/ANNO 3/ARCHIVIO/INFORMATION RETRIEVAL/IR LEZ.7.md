### Distributional Lexical Semantics
come rappresentare il significato delle parole in modo automatico a partire dai testi seguendo la logica della
##### Distributional Hypothesis
parole con significati simili tendono ad apparire in contesti simili
##### Tipi di relazione
ci sono 3 tipi principali di relazioni tra parole
- **sintagmatiche**
	- parole che co occorrono insieme nello stesso testo
	- `il lupo è affamato` lupo e affamato hanno una relazione sintagmatica
	- Le rappresentiamo di solito con uno spazio di co occorrenza window based
		- window based: considero le parole a destra o a sinistra con una determinata lunghezza definita
			- creando un vettore di parole vicine a quella
- **paradigmatiche**
	- parole che possono essere scambiate nello stesso contesto
	- `il lupo è [affamato | assetato]`
	- Rappresentate di solito da uno spazio di co occorrenza syntax-based
		- cercando di capire il ruolo grammaticale il soggetto il verbo ecc
- **topiche**
	- parole legate allo stesso topic
	- compaiono nello stesso documento
	- `“calcio, stadio, squadra”`
	- Rappresentiamo questo tipo di relazioni con TF-IDF in uno spazio topico
###### COSTRUZIONE DELLA MATRICE DI CO-OCCORRENZA
Costruisco una matrice con 
- righe come parole target
- colonne come parole di contesto
- celle rappresentano il numero di co occorrenze
	- parola target: **lexicon**
	- parole di contesto:
	    - verb
	    - available
	    - online
	- Allora il vettore sarà tipo:
		- `lexicon → [verb:2, available:1, online:1, ...]`
			- “lexicon” appare 2 volte vicino a “verb”
- ogni parola diventa un vettore sparso con tantissimi zeri
#### POINTWISE MUTUAL INFORMATION (PMI)
serve per misurare quanto è sorprendente vedere una parola in relazione con un'altra
$$PMI(x,y) = \log \frac{P(x,y)}{P(x)P(y)}$$
- $P(x)$ → probabilità di vedere $x$
- $P(y)$ → probabilità di vedere $y$
- $P(x,y)$ → probabilità che compaiano insieme
	- parole molto frequenti → penalizzate
	- parole rare ma significative → valorizzate
##### LATENT SEMANTIC ANALYSIS (LSA)
- ho problemi nell'avere una matrice troppo grande(risolvo con SVD) e matrice con low-rank
	- $M = U S V^T$
	- $M \approx U_k S_k V_k^T$
- cerco di prendere relazioni topiche con LSA
	- grazie ai valori latenti