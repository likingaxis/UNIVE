### PROBLEMA DI MEMORIZZAZIONE
- quando token string fa a infinito e oltre ci sono problemi di memorizzazione
	- cosa erano i token string?
#### RCV1
- collezione di lecture di reuters per stimare la sua dimensione
##### Come è fatto un documento in questo esempio
- notizia con title e body
	- i loro testi dovranno essere segmentati e in termini di rilevanza adatti
- fare a casa, cat txt pipe una parola per colonna quindi spazio che diventa \n con tr, poi pipe sort poi pipe uniq poi pipe wc -l per fare il word count
- avg byte per term rispetto a token chiede all'esame
###### TOKEN vs TERM
- token si intende token stream
	- parole nel testo effettivo
- term intende
	- le parole nel dizionario
- perchè avg byte per term è maggiore di byte per token?
	- presenza di sop word ecc

- tutta questo vedendo i dati (slide con quelle tabelle) occupa tanta memoria
##### Come risolvere?
- uso il disco per salvare tutto
	- divido in blocchi da n che può supportare le ram
	- ogni volta sposto il blocco nella ram e uso il merge
#### ALGORITMI DI SORTING
##### BSBI
- definizione algoritmo 
- divisione del token stream in blocchi
- sort e riscrivi sul disco

- potrei usare il 90% della ram
###### PSEUDOCODICE
- N dimensione originale
	- divido in blocchi da b
	- ho N/b log N/b di ordinamento per ogni blocco quindi b
- costi
	- merge iniziale di un singolo blocco(in teoria)
		- log
	- merge delle posting list dei blocchi totali
		- concatenazione
			- divisione dei blocchi quindi sono uno seguente all'altro
			- quindi basta che li metto uno appresso all'altro

##### SPIMI
- definizione algoritmo
	- obiettivo: uso il 100% della ram
	- single pass memory
	- non ordino tanto poi devo comunque fare il merge dei risultati
	- uso hash per capire a quale posting list appartiene un docID(?)
		- funzione che mappa a un elemento il suo determinato valore
		- tempo costante
###### PSEUDOCODICE



##### INDEXING DISTRIBUITO
- significato di distribuito
	- ricordiamo che distribuito significa...
- SLA 
	- Service level agreement
		- quanto tempo sta su la macchina
		- lo SLA al 99.99% non è sempre fattibile per costi
	- calcoliamo su 1000 nodi la probabilità che in un qualche giorno mi esploda qualcosa
- con l'indexing distribuito si esegue
	- map e reduce
	- quando una macchina scoppia si assegna il work a un'altra di quelle disponibili
		- questa cosa consente la scalabilità
		- se il master si rompe c'è un bel problema per questo ce ne sono molti
