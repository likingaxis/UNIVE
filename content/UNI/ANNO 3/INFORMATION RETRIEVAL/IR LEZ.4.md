#### SPELL CORRECTION
- introduzione rapida su questa parte, cosa studia esattamente la spell correction?
##### WILD CARD
- utilizzo tipo sintassi di grep
come faccio `- mon*`
come faccio `- *mon`
come faccio `- pro*cent`
- poco ottimizzato dovrei fare and tra `pro*` e `*cent` 
###### Permuterm index
- in cosa consiste, spiegazione
- ESEMPIO CON hello
	- slide 6
- uso del $ come carattere speciale
- la parte con il dollaro sono i placholder da mettere dentro `l' *`
- con `X*Y*Z` vedo un insieme dei due e poi filtro quello rimanente
###### Bigram (k-gram) indexes
- funzionamento, che problema risolve?
- problema: falsi positivi
#### SPELLING TASK
- si divide in
	- spelling error detection
	- spelling error correction
##### TIPI DI ERRORI DI SPELLING
- non word
- real word
- cognitive
##### Risolvere non word spelling error correction
- contesto rapido della situazione
- creare un modello che generi i candidati delle real words
- terminologia
	- cose riguardo la terminologia
- utilizzo di noisty channel intuition
	- volevo una parola ma per sbablio ne ho scritta un'altra
- utilizzo di bayes per il noisy channel
	- le w sono le ipotesi
	- inverto la probabilità condizionata con Bayes
	- probabilità a priori di w
		- derivante da quante volte leggo quella parola nel documento
		- Cw/T
		- quale è la probabilità che ho scelto w per x
- uso di edit distance per correggere eventuali cose
	- spiegazione rapida su cosa è la edit distance
	- con operazioni semplici come
	- deletion, insertion, transposition, substitution
	- tabella 
	- 80% errori con una edit distance pari a 1
###### Come generare i candidati
- ci sono varie opzioni vedi queste 5 a slide 29
- spiega la Jaccard similarity
###### Computing error probability Confusion matrix
- matrice di confusione cosa è?
###### Channel model
- varie probabilità per le varie sostituzioni
- sfrutta la confusion matrix?
###### Concetto di smoothing
- utilizzo lo smoothing
	- per evitare di avere probabilità a 0
	- rapporto a tutti l'aumento per avere lo smoothing
