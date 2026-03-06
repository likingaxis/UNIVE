## DEF IR
- ebbers
- NON SONO FORMULE MA SONO UNA CATENA DI ELABORAZIONE end to end che porta a un output
#### Assunzioni
- collezione dati statica
- cerchiamo documenti rilevanti per information need

### Tipico modello di ricerca 
foto

- information need importante per poi misurare l'efficacia del modello
- notare come tra query e search engine sono presenti delle query term ovvero delle ESTRAZIONI in forma comprensibile dal search engine per le query scritte da noi
- info need è nascosto per il search engine

### Strumenti di misura utilizzati per IR
- come misuro una determinata fase della catena?
	- spesso si misura la catena end to end
#### 2 metriche specifiche utilizzate in modo end to end(di solito)
- Precision
	- def
	- vede i falsi positivi
- Recall
	- def
	- vede i falsi negativi

- DOMANDA ALL'ESAME SULLA DIFFERENZA TRA MUTAZIONE SPARSA E DENSA
	- una è la natura intrinseca del fenomeno
	- una come la rappresento
- rappresentazione sparsa
	- esclude i bit inutili a 0
- densa
	- metto tutti i bit pure quelli inutili
densa diverso da sparsa potresti intendere la natura o la rappresentazione del fenomeno

### Struttura dati utilizzata, matrice a indice inverso
- per ogni termine memorizziamo la lista di documenti che lo contiene
	- indice del documento numerato
- per rappresentare questa matrice useremo la linked list ma chiamata posting list
	- ogni pos è detta posting
- dizionario che punta all'inizio di una linked list
- al momento non ordino le posting list
#### Costruzione di questa struttura dati
foto

divisa in tokenizzazione, normalizzazione, indicizzazione

- tokenizzazione generare il token stream Tokenizer (?)
- moduli linguistici di modifica dei token token stream normalizzati da un punto di vista linguistico
	- esempio signor rossi o colore rossi? a quale posting list mi affido?
	- lemmatizzazione -> portare parole alla forma base, con infinito singolare ecc...
		- studentessa diventa studente
- poi viene messo nell'indice (effettiva struttura dati)
