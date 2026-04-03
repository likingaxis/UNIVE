### RANKED RETRIEVAL
Nel modello Booleano classico, un documento o soddisfa la query oppure no. Questo però crea un problema pratico: spesso otteniamo o troppi risultati oppure nessuno. Questo fenomeno è chiamato _feast or famine_: con AND restringiamo troppo, con OR allarghiamo troppo.
Per risolvere questo limite si introduce il **ranked retrieval**, dove invece di filtrare i documenti, li **ordiniamo per rilevanza**. L’idea è quindi assegnare uno **score** a ogni coppia (query, documento), che misura quanto il documento è rilevante rispetto alla query, e poi restituire solo i migliori (top-k).
In questo modo otteniamo una sorta di **soft AND**: non richiedo che tutte le parole siano presenti, ma preferisco i documenti che matchano meglio la query.
##### Primo tentativo: confronto come insiemi
Un primo modo per misurare la similarità tra query e documento è trattarli come **insiemi di parole** e usare la **Jaccard similarity**:
$\frac{|A \cap B|}{|A \cup B|}$
Questa misura cattura quanto i due insiemi si sovrappongono. Tuttavia ha due limiti importanti:
- non considera quante volte compare una parola
- non distingue tra parole frequenti e parole rare
Quindi è troppo semplice per un sistema di retrieval efficace.

#### VECTOR SPACE MODEL
Per superare questi limiti si introduce il **Vector Space Model**. L’idea è rappresentare sia i documenti sia le query come **vettori in uno spazio ad alta dimensionalità**, dove ogni dimensione corrisponde a un termine del vocabolario. A questo punto non ragiono più solo in termini di “parola presente o assente”, ma posso associare a ogni termine un certo peso, che dipende dalla sua importanza nel documento e nella collezione.
###### Come rappresentiamo i documenti in questo modello
Per migliorare il modello, dobbiamo rappresentare i documenti in modo più informativo.
Nel caso più semplice usiamo una **incidence matrix**, dove ogni documento è rappresentato da un vettore binario:
- 1 se la parola è presente
- 0 se non è presente
Questo però è ancora limitato, perché non tiene conto della frequenza.
Per questo passiamo alla **count matrix**, dove ogni documento è rappresentato da un vettore di conteggi:
- ogni componente indica quante volte compare un termine
Questa rappresentazione è più ricca, perché introduce l’idea che:

> più una parola compare in un documento, più quel documento è rilevante per quella parola

![[Pasted image 20260329183548.png|400]]
##### Bag of words
In tutto questo modello assumiamo il **bag of words**:
- ignoriamo completamente l’ordine delle parole
- consideriamo solo quali parole compaiono e quante volte
Questo semplifica molto il problema, anche se perdiamo informazione sul contesto
- il seguente modello funziona quindi per $tf$ (term frequency)
- $tf_{t,d​}$=numero di volte che il termine t appare nel documento d
###### Problema della frequenza
A questo punto potremmo pensare di usare direttamente il numero di occorrenze ($tf$), ma c’è un problema:
se una parola compare 10 volte in un documento, non significa che quel documento sia 10 volte più rilevante rispetto a uno in cui compare una sola volta.
Quindi la crescita della rilevanza rispetto alla frequenza **non è lineare**.
###### Soluzione: logaritmo
Per gestire questo problema si usa una trasformazione logaritmica:
Per sistemare questo problema introduco un **peso**:

$w_{t,d} = \begin{cases} 1 + \log(tf_{t,d}) & \text{se } tf_{t,d} > 0 \\ 0 & \text{altrimenti} \end{cases}$
- questo sistema studiato sopra non funziona benissimo
- la funzione di ordinamento sarà proporzionale al contributo delle singole parole nel documento come esse sono riportate all'interno della query
Il modello basato solo su $tf$ (anche con il log) non è ancora sufficiente.
Infatti:
- parole molto frequenti (es. _the, is, and_) compaiono in quasi tutti i documenti
- quindi hanno un tftftf alto, ma **non sono informative**
👉 problema:
- il modello darebbe troppo peso a parole inutili
### Introduzione dell’idf (inverse document frequency)
Per risolvere questo problema introduciamo una misura della **rarità del termine nella collezione**.
- definiamo quindi:
$idf_t = \log \frac{N}{df_t}$
dove:
- $N$ = numero totale di documenti
![[Pasted image 20260329185228.png|400]]
### Intuizione dell’idf
- se un termine compare in **pochi documenti**:
    - $df_t$​ piccolo → $idf_t$​ alto  
        → termine molto informativo
- se un termine compare in **tutti i documenti**:
    - $df_t \approx N$ → $idf_t \approx 0$
        → termine poco utile
👉 quindi:
- parole rare → **peso alto**
- parole frequenti → **peso basso**
### tf-idf: peso finale del termine
A questo punto combiniamo:
- frequenza nel documento ($tf$)
- rarità nella collezione ($idf$)
$dftw_{t,d} = (1 + \log tf_{t,d}) \cdot \log \frac{N}{df_t}$
### Intuizione finale del tf-idf
Un termine ha peso alto se:
- compare spesso nel documento
- ma compare poco nella collezione
👉 cioè:
- è **rappresentativo di quel documento**
### Collegamento con il ranking
A questo punto:
- ogni documento è rappresentato come vettore di pesi $w_{t,d}$
- ogni query viene rappresentata allo stesso modo
👉 il ranking dipenderà da:
- quanto i pesi dei termini della query sono presenti nel documento
### Nota sulle stop words
- parole molto frequenti (the, is, ecc.)
    - hanno $idf \approx 0$
    - quindi contribuiscono pochissimo
per questo:
- spesso vengono direttamente rimosse (stop words)

##### Query come vettori
- ordinare i documenti in base alla loro prossimità
	- distanza tra vettori di termini
		- caratterizzate da
			- simmetria 
			- non negatività
			- 0 uguaglianza
- perché la distanza ha delle limitazioni
	- grafico a slide 41
	- la query rich poor
		- la term frequency aumenta di un documento
			- non ci interessa la distanza del vettore ma l'angolo compreso tra essi
			- quando due vettori coincidono 0 gradi
			- quando due vettori sono a 90 gradi
				- momento in cui i 2 vettori sono totalmente distanti
					- vettori ortogonali
				- vedere il coseno dell'angolo, se sono ortogonali 0, se sono coincidenti il coseno vale 1
- la distanza è una metrica, quando due cose sono coincidenti vale 0
	- quando sono massimamente simili vale 1, questa distanza si chiama cosin similarity
- ordinare gli elementi seguendo l'angolo tra il vettore della query e il documento in ordine decrescente
	- cosa è esattamente il vettore della query o del documento
		- tf/idf forma il vettore! in teoria
- il coseno tra due vettori può essere visto come il prodotto tra due vettori normalizzati
	- vettore fratto la norma ti normalizza il vettore a distanza uno
	- ciò ci consente di calcolare il coseno
	- formula a slide 47
	- problema: data sparseness
		- il seguente sistema è bag of word
			- se ho cane e rotwiler ha dimensione ortogonale
		- tolto questo svantaggio la cosin similarity è comunque utile per rappresentare distanza
		- compreso tra 0 e 1
		- la normalizzazione ha un side effect:
			- se non avessi normalizzato, ci sarebbe stato l'effetto garzanti ovvero in cui il dizionario sarebbe uscito per primo ogni volta
			- invece ora con la normalizzazione non esce
		- se scrivo information retrieval troverò tutti i documenti che contengono entrambi
		- più corti
		- pk?
- pseudocodice di cosine score
- noi non vogliamo tutti i documenti
	- applichiamo precedentemente un filtro con l'or dei documenti che contengono uno o l'altro
	- anche l'or prenderebbe molto, successivamente vedremo un affinamento alla selezione di documenti da valutare
- vettore=tf idf
- confronto tra tutto quello che abbiamo visto per dare peso alla frequenza di un documento(ho capito idf ma non so se in realtà è tf)
	- natural
	- boolean
	- sum
	- max frequency
	- logarithmic
	- fraction
		- formula con n(t,d)/n(t,d)+k
		- logaritmo cresce a infinito, questi saturano invece verso il valore 1
		- grafico a slide quella colorata dopo 53
		- 
	- quello che useremo (BM25)
		- con paradigma probabilistico 
- non esiste il migliore, ma esiste il migliore per un certo ambiente
	- attraverso benchmark