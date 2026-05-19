##### Relevance feedback e query expansion
dopo aver definito una funzione di ranking, cioè una funzione che ordina i documenti in base alla loro presunta rilevanza rispetto a una query, bisogna capire se questo ordinamento funziona davvero. Per farlo serve una nozione di **rilevanza**: un documento è rilevante se fornisce all'utente l’informazione che stava cercando
Per valutare un sistema non basta guardare un singolo risultato, ma serve un **benchmark**
Su questa base si possono usare misure come **precision** e **recall**.

La **precision** misura quanti dei documenti recuperati sono effettivamente rilevanti:
$$Precision = \frac{\# \text{documenti rilevanti recuperati}}{\# \text{documenti recuperati}}$$
La **recall** misura invece quanti dei documenti rilevanti totali sono stati recuperati:
$$Recall = \frac{\# \text{documenti rilevanti recuperati}}{\# \text{documenti rilevanti}}$$
In altre parole, la precision guarda alla “qualità” dei risultati restituiti, mentre la recall guarda alla “copertura” rispetto a tutti i documenti rilevanti disponibili
Per combinare queste due misure si usa la **F-measure**, in particolare la misura bilanciata $F_1$​:
$$F_1 = \frac{2PR}{P + R}$$
​dove $P$ è la precision e $R$ è la recall.
Questa misura può essere vista come una **media armonica pessimistica**: se una delle due quantità è molto bassa, anche $F_1$​ tende a essere bassa. Quindi non basta avere alta precision o alta recall separatamente
- in questa lezione ci concentriamo soprattutto a ottimizzare la recall, cioè recuperare documenti rilevanti che la query originale non riusciva a trovare
- quando un utente inserisce una query con dei termini che intendono la stessa cosa ma non corrispondono esattamente a quello che è scritto nei documenti
	- il sistema IR potrebbe fallire(questo fenomeno è detto *synonymy*)
- esempio: Se ho una query con `aircraft` ma nei documenti ho dei termini con `aeroplano` non troverò nulla
###### Ad hoc retrieval e relevance feedback retrieval
Con **ad hoc retrieval** si intende il recupero “normale”, cioè il caso in cui l’utente formula una query e il sistema restituisce una lista ordinata di risultati, senza usare un successivo feedback esplicito dell’utente
Con **relevance feedback** il sistema lavora solo l’utente interviene dopo i primi risultati, segnalando quali documenti sono rilevanti e quali no
- Si distingue due grandi famiglie di metodi:
	- *metodi locali*
		- l’utente formula una query, il sistema restituisce alcuni documenti, e poi quei risultati vengono analizzati per migliorare la query. Il metodo locale principale è il **relevance feedback**
	- *metodi globali*
		- non dipendono direttamente dai risultati della singola query. Usano informazioni costruite a partire dall'intera collezione o da risorse esterne
		- reti semantiche, vocabolari controllati, risorse come WordNet o thesauri di dominio
		- mediante esse il sistema di retrieval punta a riformulare la query es: mette sia `aircraft` che `plane`
			- Questa è la base della **query expansion**: si parte dalla query originale e si aggiungono termini semanticamente collegati, con l’obiettivo di recuperare più documenti rilevanti
###### Relevance feedback
- *metodo locale*
	- l'utente fa la query
	- ottiene dei risultati
	- l'utente restituisce un feedback su quei risultati
	- se l’utente segnala alcuni documenti come rilevanti, il sistema può osservare i termini presenti in quei documenti e usarli per costruire una query migliore
	- usa i giudizi dell’utente sui documenti per calcolare una nuova query
Nell’esempio qua sotto, i documenti sono ordinati da un sistema di ranking basato su rappresentazioni vettoriali dei termini. Dopo il feedback dell’utente, i termini presenti nei documenti rilevanti vengono usati per espandere e ripesare la query
![[Pasted image 20260519113238.png|462]]
![[Pasted image 20260519113314.png|462]]
![[Pasted image 20260519113343.png|462]]
L’utente marca alcuni documenti come rilevanti, indicati con il simbolo “+”
la query dopo il feedback contiene anche nuovi termini 
ottenendo così un nuovo ranking
- si può applicare a tutti i modelli ma in particolare ora lo vedremo per vector space model che ricordiamo essere composto da
	- un documento è un punto/vettore nello spazio;
	- una query è anch’essa un punto/vettore nello stesso spazio;
	- la similarità tra query e documento può essere calcolata, per esempio, tramite **cosine similarity**
Questa è l’intuizione che sta alla base dell’algoritmo di **Rocchio**, che è il metodo classico per implementare il relevance feedback nel Vector Space Model
###### Centroid e rocchio algorithm
- funziona SOLO con il vector space model
- si vuole innanzitutto formalizzare l'idea di centroide in uno spazio vettoriale
Il **centroide** di un insieme di documenti è il vettore medio di quei documenti. In termini geometrici, è il “centro di massa” dell’insieme
Se $D$ è un insieme di documenti, il suo centroide è:
$$\vec{\mu}(D) = \frac{1}{|D|} \sum_{d \in D} \vec{v}(d)$$
- $D$ è un insieme di documenti
- $\vec{v}(d)$ è il vettore che rappresenta il documento $d$
- la somma dei vettori viene divisa per il numero di documenti, quindi si ottiene una media

##### Query ottima
In un caso ideale, potremmo immaginare di conoscere:
- $C_r$: l’insieme di **tutti** i documenti rilevanti nella collezione;
- $C_{nr}$​: l’insieme di **tutti** i documenti non rilevanti nella collezione.
Se conoscessimo davvero questi due insiemi, potremmo costruire una **query ottima**, cioè una query che separa il più possibile i documenti rilevanti da quelli non rilevanti
L’obiettivo è trovare un vettore query $\vec{q}$​ che massimizzi la similarità con i documenti rilevanti e minimizzi la similarità con quelli non rilevanti:
$$S(\vec{q}, C_r, C_{nr}) = s(\vec{q}, \vec{\mu}(C_r)) - s(\vec{q}, \vec{\mu}(C_{nr}))$$
- $s$ è una misura di similarità;
- $\vec{\mu}(C_r)$ è il centroide dei documenti rilevanti;
- $\vec{\mu}(C_{nr})$ è il centroide dei documenti non rilevanti.
- vogliamo una query molto simile al centro dei documenti rilevanti e poco simile al centro dei documenti non rilevanti.
Con la **cosine similarity**, questa idea porta alla seguente forma della query ottima:
$$\vec{q}_{opt} = \vec{\mu}(C_r) - \vec{\mu}(C_{nr})$$
cioè:
$$\vec{q}_{opt} = \frac{1}{|C_r|} \sum_{\vec{d}_j \in C_r} \vec{d}_j - \frac{1}{|C_{nr}|} \sum_{\vec{d}_j \in C_{nr}} \vec{d}_j$$

Questa formula significa che la query ottima è la **differenza tra il centroide dei documenti rilevanti e il centroide dei documenti non rilevanti**
- da qui nasce l'idea di rocchio
	- non usiamo tutti i documenti rilevanti e non rilevanti, perché non li conosciamo; usiamo solo quelli che l’utente ha giudicato durante il feedback
- non sappiamo in anticipo quali siano **tutti** i documenti rilevanti e **tutti** quelli non rilevanti della collezione
##### Rocchio Algorithm
L’algoritmo di **Rocchio** approssima la query ottima usando le informazioni disponibili dopo il *relevance feedback*
- ​$q_0$​: la query originale;
- $D_r$​: l’insieme dei documenti giudicati rilevanti dall’utente;
- $D_{nr}$​: l’insieme dei documenti giudicati non rilevanti dall’utente
Allora Rocchio costruisce una nuova query modificata
$$\vec{q}_m = \alpha \vec{q}_0 + \beta \frac{1}{|D_r|} \sum_{\vec{d}_j \in D_r} \vec{d}_j - \gamma \frac{1}{|D_{nr}|} \sum_{\vec{d}_j \in D_{nr}} \vec{d}$$Questa formula è una **combinazione lineare** di tre componenti:
1. la query originale
2. il centroide dei documenti giudicati rilevanti
3. il centroide dei documenti giudicati non rilevanti
	- $\alpha$: quanto peso dare alla query iniziale
	- $\beta$: quanto peso dare ai documenti rilevanti
	- $\gamma$: quanto peso dare ai documenti non rilevanti
Quindi Rocchio non sostituisce semplicemente la query con il centroide dei documenti rilevanti. La modifica in modo controllato, mantenendo una parte della query originale e aggiungendo l’informazione ottenuta dal feedback

- in un mondo geometrico posso assumere l'insieme di tutti e solo i documenti rilevanti dalla query e tutti e solo quelli non rilevanti
	- potrei avere la query ottima
	- data dalla formula della optimal query che massimizza S formula a slide 16
	- al posto di includere il vettore query dentro lo tiro fuori e fare la differenza
- non avrò sicuramente la certezza della rilevanza o meno, quindi la query ottima non si può fare
	- posso però approssimare un sottoinsieme di documenti
- per spostare il vettore query ai documenti più importanti e rilevanti
	- posso spostare la query su quel punto centroide
	- ma cerco di spostarmi in modo non eccessivo bensì a metà
- faccio la combinazione lineare
	- me lo lascio parametrico perchè
	- non so se dare importanza alla query alla rilevanza o alla non rilevanza
	- si consiglia sempre di essere conservativi e dare valori
- in modo quasi virtuale aggiunge termini alla query, spostando la query in un altro punto
	- Dnr sta per segnalati non rilevanti dopo un feedback
- questo schema funziona bene anche per classificazione di machine learning applicando algoritmo k-nn
- Non Automatizzazione del feedback
	- faccio 2 assunzioni
		- che l'utente sia molto consapevole della collezione
		- che i documenti rilevanti contengono termini simili
	- relevance feedback non è un bullseye
###### Come automatizzare il feedback(Pseudo relevance feedback)
- lo faccio di nascosto all'utente
- assunzione
	- il primo sistema di ad hoc retrieval non sia così male
- i documenti meno rilevanti che appaiono in pagina 12213213312
	- potrebbero contenere termini diversi
		- li metto tipo al 4-5 posto per migliorare la recall
	- i primi 1-3 saranno davvero i migliori recuperati
	- questo viene detto query drift
###### Migliorare la recall non con metodi locali
- potrei usare metodi globali
	- tipo una rete semantica
	- 