##### LINK ANALYSIS
Con la Link analysis andiamo ad aggiungere ai nostri modelli di information retrieval un recupero non solo basato sui contenuti testuali dei documenti ma anche basato su come una determinata pagina è collegata rispetto alle altre 
- un link può essere sfruttato per conferire autorità a un documento
diciamo fin da subito che non prendiamo in modo diretto l'autorevolezza di una pagina basandoci solo sui link perché esistono diversi fenomeni come il link spam che portano ad aumentare artificialmente questa informazione
###### Good/Bad/Unknowns
assume che 
- un buon nodo non dovrebbe puntare a un nodo cattivo
- un nodo buono se punta a un nodo cattivo allora potrebbe diventare cattivo
- un nodo buono se punta a un nodo sconosciuto potrebbe far diventare buono quel nodo o viceversa con un nodo cattivo
![[Pasted image 20260527105127.png|548]]
###### Web come un grafo diretto
Il web può essere rappresentato come un grafo diretto dove ci sono più pagine collegate tra loro mediante un `hyperlink` questo descritto da una etichetta detta `anchor text`
![[Pasted image 20260527105654.png|412]]
se molte pagine creano un hyper link a una certa pagina con un anchor text
posso sfruttare questo anchor text per dare informazioni aggiuntive a quella pagina
Quando indicizziamo un documento $D$, possiamo aggiungere, con un certo peso, anche gli anchor text provenienti dalle pagine che linkano $D$
il peso può dipendere ad esempio dalla autorevolezza della pagina che lo fa
![[Pasted image 20260527105825.png]]
##### Connectivity servers
Dopo aver definito un web come grafo diretto ci poniamo un problema su come rappresentarlo in memoria
L'idea alla base è quella di usare una struttura che rimanga sempre operativa e che sfrutti liste di adiacenza
- ogni URL è un intero con due liste una dei suoi **outlinks** e un'altra dei suoi **inlinks**
una rappresentazione può richiedere circa 64 bit per ogni hyperlink e per ridurre tutto ciò si applica l'algoritmo di Boldi and Vigna
##### Boldi and Vigna
per comprimere in modo efficiente le liste di adiacenza si ordinano in modo lessicografico gli URL così da avere domini simili vicini
compongo le liste con 7 URL per ognuna
```scss
www.stanford.edu/alchemy
www.stanford.edu/biology
www.stanford.edu/biology/plant
www.stanford.edu/biology/plant/copyright
www.stanford.edu/biology/plant/people
www.stanford.edu/chemistry
```
ogni lista è definita dalla modifica della precedente mediante operazioni matematiche di sostituzione numerica ad esempio
```scss
1, 2, 4, 8, 16, 32, 64
1, 4, 9, 16, 25, 36, 49, 64
1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
1, 4, 8, 16, 25, 36, 49, 64
```
Per ottenere l’ultima lista dalla seconda, basta dire:
`usa la lista -2, rimuovi 9, aggiungi 8`
inoltre per salvare i valori numerici uso il gab encoding con il gamma code che usa in media un numero di bit che è $1+2\lfloor logx \rfloor$
##### Page rank
per fare page ranking non mi è sufficiente calcolare quanti in-link citano una pagina, ho bisogno di definire quanto è autorevole una pagina che mi cita
###### Page rank scoring Globale
applico questo algoritmo di random surfer che naviga casualmente le pagine nel web esplorando il grafo
il random surfer se è su una pagina con 4 link uscenti andrà a scegliere casualmente uno di quei link con probabilità 1/4
per risolvere problemi di *dead-end* e *loop* vado ad aggiungere con una certa probabilità(es:10%) il **teleporting** che fa saltare il nostro random surfer su una pagina casuale del web

l'algoritmo porta il random surfer a dover calcolare il visit rate ovvero quante volte ha visitato quella pagina nell'esecuzione dell'algoritmo
questo si basa sulle catene di Markov
- il tutto viene visto come un processo che vede una matrice di transizione con le varie probabilità di visitare quella pagina successivamente a un'altra
$$P_{ij} = \text{probabilità di passare dalla pagina } i \text{ alla pagina j }$$

andare a fare la somma delle probabilità di ogni riga mi porta il valore 1 perché si assume che alla fine della visita io abbia la probabilità di aver visitato tutte le pagine
![[Pasted image 20260527113917.png|387]]
definisco quindi un vettore $x$ dove ogni componente rappresenta la probabilità che il random surfer si trovi su quella determinata pagina

aggiornare i valori del vettore x si fa prendendo x e moltiplicando per la matrice di transizione con le varie probabilità
$$x_{\text{next}} = xP$$
le catene di Markov qui definite sono ergodiche ovvero, dopo un certo numero di iterazioni il valore della catena si stabilizza su un certo valore stazionario  definito con $a$, quindi applicare un altro passo alla catena non la cambia particolarmente infatti ha distribuzione
$$a = aP$$
tutto questo è possibile grazie al teleporting che ci permette di non avere punti di fermo o loop
###### Esempio di mini web graph
![[Pasted image 20260527114218.png|236]]
![[Pasted image 20260527114233.png|483]]
definisco sotto la probabilità di random walk e di teleporting con $\alpha$ e $(1-\alpha)$
- quindi conto anche la probabilità di una matrice $nxn$ tutta a $1/n$
	- ovvero la probabilità di $1/n$ di fare teleporting su uno qualsiasi dei nodi
- **gli zeri della matrice originale non restano più zeri**, perché il teleporting aggiunge una piccola probabilità di passare da qualunque nodo a qualunque altro nodo $1/60$
###### Page Rank Locale HITS(Hyperlink-induced Topic Search)
assegna un punteggio locale a partire dalla query effettuata e non assegna un punteggio globale su tutto il grafo 
l'algoritmo inizialmente punta a distinguere tra due pagine
- pagine **authority**, cioè quelle pagine autorevoli che trattano un determinato argomento
- pagine **hub**, quelle pagine che hanno l'obiettivo di puntare a delle buone authority
dopo aver fatto la query le pagine restituite formano un **root set**
questo root set poi viene espanso ad esempio prendendo le pagine connesse formando il **base set**
da questo base set poi recuperiamo le hub e le authority
l'algoritmo calcola per ogni pagina un valore di hub e authority in base se vengono puntate o se puntano
- hub e authority
	- $h(x) \leftarrow \sum_{x \to y} a(y)$
	- $a(x) \leftarrow \sum_{y \to x} h(y)$
###### Dimostrare che l'algoritmo HITS converge
per dimostrare che HITS converge ad una soluzione stabile utilizziamo una matrice di adiacenza $A$ definita come
- $A_{ij}=1$ se i ha un link verso j 0 altrimenti
posso vedere la matrice trasposta per vedere i link entranti o normale per capire i link uscenti quindi
$$h=Aa$$
$$a = A^Th$$
ottenendo quindi poi 
- $h=Aa$
- $a = A^Th$
- sono uno legato alla formula dell'altra quindi dopo diverse iterazioni avrò una buona stima che converge
ad esempio dopo circa 5 iterazioni potrei notare un cambiamento quasi nullo delle informazioni
usato in scenari troppo specifici spesso per discovery
- poi anche topic drift
	- potrei deviare cambiando topic
