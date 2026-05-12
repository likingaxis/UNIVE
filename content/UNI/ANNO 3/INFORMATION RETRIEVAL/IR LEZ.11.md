##### System issues
- se dovessi calcolare la cosin similarity o una delle funzioni viste avrei troppo lavoro di CPU
- distinzione tra safe e non safe, simile a lossless lossy
	- safe, se il ranking è assolutamente il top score
	- non safe, se il ranking non è sempre il top score
		- di solito sfruttiamo non safe
	- tipo se un documento non contiene nemmeno un termine della query, lo ignoro
		- potenzialmente potrebbe essere safe
- l'operatività alla fine si riduce in
	- calcola i vari ranking
	- ordina i migliori k ranking
- che algoritmo uso?
	- heap sort 
	- con J=1M numero di archi=numero di nodi 
	- posso calcolare O(log J) per ordinare altezza dell'albero
- assunzione di OR, la query viene fatta con OR, ma se ho tanti OR il costo cresce decisamente
ora spiego algoritmi utili per ridurre molto i contender
###### Approccio generico
- trovare un insieme A di contender
###### eliminazione
###### high idf query terms only
- qui ha molto senso ridurre le stopword
###### Docs containing a lot of query terms
- quali di questi documenti prendo in considerazione?
	- applico un soft and, prendo solo i documenti per 8 16 e 32 
	- lo facciamo osservando le caratteristiche e i contributi che danno le singole parole
###### Champion lists
- rispetto ai nostri contenders andiamo a precomputare i champions
- una lista di documenti con caratteristiche molto buone
	- è solo una cosa a scopo didattico perchè creerei la possibilità di censurare determinati documenti
- questa cosa viene fatta a index time
ESERCIZI CROCS 
##### Static quality scores
- la cosine similarity prende la rilevanza ma poi
	- ci sono proprietà di un documento che riguardano l'autorevolezza
- le pagine più autorevoli sono quelle più puntate
##### Modellare l'autorevolezza
- compreso tra 0 e 1
	- perchè si prende per scontato che vada utilizzato tipo cosine similarity
	- ma se avessimo BM25 sarebbe 0 infinito oppure k+maxroba
###### Net score
- modello che va a calcolare l'autorevolezza data una qualsiasi query di un certo documento
- si può anche applicare un top k net score per tutte le posting list
	- prima calcoli per tutte le posting 
	- poi ti calcoli la rilevanza dei top k
- ad esempio applicato sui tweet
- posso anche sfruttare la champion list calcolata con net score
##### Cluster Pruning
- precomputando
- partendo da una query effettuata
- prendiamo un N 
	- prendiamo radice di N documenti a caso e li definiamo leaders
	- con buona probabilità ne copro una buona distanza
- ogni leader ha circa radice di N followers
- prendo i k più vicini agli L's followers
- date 1 miliardo di query avrò circa 30k cosine similarity da fare
	- $10^{9/2}$
- NON É SAFE
- metti foto delle slide
- prendo tot leader e poi faccio l'unione tra i followers di quei tot leader
- è una strategia efficiente per lavorare ma scala abbastanza bene
- perchè usare il random sampling
- veloce ecc
