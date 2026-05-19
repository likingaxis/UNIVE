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
- $C_r$: l’insieme di **tutti** i documenti rilevanti nella collezione
- $C_{nr}$​: l’insieme di **tutti** i documenti non rilevanti nella collezione
Se conoscessimo davvero questi due insiemi, potremmo costruire una **query ottima**, cioè una query che separa il più possibile i documenti rilevanti da quelli non rilevanti
L’obiettivo è trovare un vettore query $\vec{q}$​ che massimizzi la similarità con i documenti rilevanti e minimizzi la similarità con quelli non rilevanti:
$$S(\vec{q}, C_r, C_{nr}) = s(\vec{q}, \vec{\mu}(C_r)) - s(\vec{q}, \vec{\mu}(C_{nr}))$$
- $s$ è una misura di similarità
- $\vec{\mu}(C_r)$ è il centroide dei documenti rilevanti
- $\vec{\mu}(C_{nr})$ è il centroide dei documenti non rilevanti
- vogliamo una query molto simile al centro dei documenti rilevanti e poco simile al centro dei documenti non rilevanti
- q è uguale per entrambi quindi la porto fuori e rimangono $\mu$
Con la **cosine similarity**, questa idea porta alla seguente forma della query ottima:
$$\vec{q}_{opt} = \vec{\mu}(C_r) - \vec{\mu}(C_{nr})$$
cioè:
$$\vec{q}_{opt} = \frac{1}{|C_r|} \sum_{\vec{d}_j \in C_r} \vec{d}_j - \frac{1}{|C_{nr}|} \sum_{\vec{d}_j \in C_{nr}} \vec{d}_j$$

Questa formula significa che la query ottima è la **differenza tra il centroide dei documenti rilevanti e il centroide dei documenti non rilevanti**
- da qui nasce l'idea di rocchio
	- non usiamo tutti i documenti rilevanti e non rilevanti, perché non li conosciamo
	- usiamo solo quelli che l’utente ha giudicato durante il feedback
- non sappiamo in anticipo quali siano **tutti** i documenti rilevanti e **tutti** quelli non rilevanti della collezione
![[Pasted image 20260519160332.png|496]]
##### Rocchio Algorithm
L’algoritmo di **Rocchio** approssima la query ottima usando le informazioni disponibili dopo il *relevance feedback*
- ​$q_0$​: la query originale
- $D_r$​: l’insieme dei documenti giudicati rilevanti dall’utente
- $D_{nr}$​: l’insieme dei documenti giudicati non rilevanti dall’utente
Allora Rocchio costruisce una nuova query modificata
$$\vec{q}_m = \alpha \vec{q}_0 + \beta \frac{1}{|D_r|} \sum_{\vec{d}_j \in D_r} \vec{d}_j - \gamma \frac{1}{|D_{nr}|} \sum_{\vec{d}_j \in D_{nr}} \vec{d}$$Questa formula è una **combinazione lineare** di tre componenti:
1. la query originale
2. il centroide dei documenti giudicati rilevanti
3. il centroide dei documenti giudicati non rilevanti
	- $\alpha$: quanto peso dare alla query iniziale
	- $\beta$: quanto peso dare ai documenti rilevanti
	- $\gamma$: quanto peso dare ai documenti non rilevanti
Quindi Rocchio non sostituisce semplicemente la query con il centroide dei documenti rilevanti.
La modifica in modo controllato, mantenendo una parte della query originale e aggiungendo l’informazione ottenuta dal feedback
Il libro osserva che il feedback positivo tende a essere più utile del feedback negativo, quindi molti sistemi usano $\gamma < \beta$. 
Un esempio di valori ragionevoli riportato dal libro è:
$\alpha = 1, \qquad \beta = 0.75, \qquad \gamma = 0.15$
Questo riflette un comportamento conservativo: si mantiene la query originale, si dà un peso significativo ai documenti rilevanti e un peso più limitato a quelli non rilevanti

L’idea alla base di Rocchio è collegata alla visione geometrica usata anche in alcuni algoritmi di machine learning: documenti e query sono punti nello spazio, e la decisione dipende da vicinanza e distanza. Tuttavia Rocchio non coincide con k-NN: Rocchio usa centroidi e combinazioni lineari, mentre k-NN classifica in base ai vicini più prossimi
##### Assunzioni al relevance feedback
ci sono due assunzioni principali per il funzionamento del relevance feedback
- l’utente riesca comunque a formulare una query iniziale abbastanza vicina al suo bisogno informativo. Se la query iniziale è completamente fuori strada, il sistema potrebbe non recuperare documenti utili su cui fare feedback
- Se i documenti rilevanti hanno vocabolari molto diversi tra loro, il centroide può diventare poco rappresentativo. Per esempio, una query può avere più “prototipi” diversi di documenti rilevanti. In quel caso il feedback su un gruppo di documenti rilevanti può aiutare a trovare altri documenti simili a quel gruppo, ma non necessariamente documenti rilevanti appartenenti a un altro gruppo

>[!info] Il relevance feedback non è un bullseye: non centra automaticamente il bisogno informativo dell’utente. È una tecnica di approssimazione che usa pochi giudizi di rilevanza per spostare la query in una direzione probabilmente migliore, ma il risultato dipende dalla qualità della query iniziale e dalla rappresentatività dei documenti giudicati


##### Come automatizzare il feedback: pseudo-relevance feedback
Nel pseudo-relevance feedback, questa fase viene automatizzata: il sistema non chiede nulla all'utente, ma assume direttamente che i primi documenti recuperati siano rilevanti
La procedura è la seguente:
1. l’utente inserisce una query;
2. il sistema esegue una normale ricerca ad hoc;
3. viene prodotto un primo ranking di documenti;
4. il sistema assume che i primi $k$ documenti del ranking siano rilevanti;
5. su questi documenti viene applicato un metodo di relevance feedback, per esempio Rocchio;
6. la query viene riformulata automaticamente;
7. il sistema riesegue la ricerca con la query modificata.
Quindi la differenza principale rispetto al relevance feedback classico è che l’utente non marca manualmente i documenti. Il sistema prende i primi risultati e li tratta come se fossero stati giudicati rilevanti.
###### Assunzioni dello pseudo relevance feedback migliorie e rischi
- si vuole prima vedere una assunzione
	- primo il sistema iniziale deve essere abbastanza buono da mettere almeno alcuni documenti realmente rilevanti nelle prime posizioni del ranking
- cosa ottima: il sistema può migliorare la recall senza chiedere aiuto aggiuntivo all'utente
	- Supponiamo che i primi documenti restituiti siano davvero pertinenti. Questi documenti possono contenere termini utili che non erano presenti nella query iniziale. Inserendo o pesando maggiormente quei termini nella query riformulata, il sistema può recuperare altri documenti rilevanti
- rischio: query drift
	- Il query drift si verifica quando la query riformulata si sposta progressivamente verso un significato diverso da quello cercato dall’utente
	- Se tra i primi risultati ci sono documenti non rilevanti o solo parzialmente rilevanti, i termini contenuti in quei documenti possono contaminare la nuova query
