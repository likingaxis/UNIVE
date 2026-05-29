### LINK ANALYSIS
Finora, nei modelli di Information Retrieval, abbiamo considerato soprattutto il **contenuto testuale dei documenti**: termini presenti nel documento, frequenze, pesi, similarità con la query e così via. Con la **link analysis** si introduce un’informazione aggiuntiva: non guardiamo solo cosa contiene una pagina, ma anche **come quella pagina è collegata alle altre**
l'idea alla base vuole che un link tra pagine può indicare un **conferral of authority**, cioè un trasferimento di autorevolezza dalla pagina sorgente alla pagina destinazione
###### Good/Bad/Unknowns
- un nodo buono, in generale, non dovrebbe puntare a un nodo cattivo
- se una pagina punta a un nodo cattivo, questo è un segnale negativo anche per quella pagina
- se una pagina buona punta a una pagina sconosciuta, allora quella pagina sconosciuta diventa più probabilmente buona
Quindi la qualità o autorevolezza di una pagina può propagarsi attraverso i link. Questo è importante perché permette di usare la struttura del grafo per stimare proprietà di pagine che non conosciamo direttamente
![[Pasted image 20260527105127.png|548]]
se una pagina è puntata da molti nodi, allora probabilmente è una pagina importante o autorevole
il semplice numero di link entranti non basta. Una pagina potrebbe infatti cercare di aumentare artificialmente la propria autorevolezza creando molte altre pagine che puntano verso di essa(link spam)
La link analysis serve quindi a estendere le funzionalità di un sistema di IR oltre il puro contenuto testuale. In particolare, i link possono essere usati per:
- **scoring e ranking**, cioè per assegnare punteggi alle pagine e ordinarle nei risultati
- **link-based clustering**, cioè per individuare strutture tematiche a partire dai collegamenti tra documenti
- **classificazione**, perché documenti che si linkano tra loro tendono spesso a trattare argomenti simili
- **crawling**, cioè per decidere quali pagine visitare successivamente durante l’esplorazione del Web


###### Web come un grafo diretto
Il Web può essere rappresentato come un **grafo diretto**: ogni pagina web è un nodo, mentre ogni hyperlink è un arco orientato che parte da una pagina sorgente e arriva a una pagina destinazione.

![[Pasted image 20260527105654.png|412]]

Il link non è però soltanto un collegamento tecnico. Spesso contiene anche un testo cliccabile, chiamato **anchor text**, che funziona come una sorta di etichetta del collegamento. Se la pagina A punta alla pagina B usando un certo anchor text, quel testo può dare informazioni su B
Per esempio, se molte pagine puntano a `www.ibm.com` usando anchor come “IBM”, “ibm.com” o “IBM home page”, quei testi diventano segnali utili per descrivere la pagina IBM, anche se alcuni di quei termini non compaiono direttamente nella pagina stessa

![[Pasted image 20260527105825.png]]


Per questo motivo, durante la fase di **indicizzazione**, non si indicizza solo il contenuto interno della pagina, ma si può includere anche l’anchor text dei link che puntano a quella pagina. In pratica, quando indicizziamo un documento $D$, possiamo aggiungere, con un certo peso, anche gli anchor text provenienti dalle pagine che linkano $D$
Quindi, se un utente cerca qualcosa come “grande azienda informatica” o un’espressione simile, una pagina può essere recuperata non solo perché contiene direttamente quei termini, ma perché **altre pagine la citano o la linkano usando quei termini**
Tuttavia, gli anchor text non hanno tutti lo stesso valore. Il peso assegnato a un anchor può dipendere anche dall’**autorevolezza della pagina che contiene il link**
L’uso dell’anchor text può generare risultati inattesi, come nel caso del fenomeno chiamato **miserable failure**, dove molte pagine usano lo stesso anchor text in modo coordinato per far apparire una certa pagina tra i risultati di una query non necessariamente descrittiva o neutrale
##### Connectivity servers
Dopo aver rappresentato il Web come un **grafo diretto**, nasce un problema pratico: questo grafo è enorme, quindi bisogna chiedersi **dove e come memorizzarlo** per poterlo usare in modo efficiente
e che la struttura dati rimanga comunque sempre operativa
$$\text{URL} \rightarrow \text{outlinks}$$
$$\text{URL} \rightarrow \text{inlinks}$$
##### Liste di adiacenza
Un modo naturale per rappresentare il grafo è usare le **liste di adiacenza**. Ogni URL viene rappresentato come un intero, e a ogni URL viene associata la lista dei suoi vicini, cioè le pagine collegate tramite link
Quindi, se ogni pagina è un nodo del grafo:
- la lista degli **outlinks** contiene gli archi uscenti;
- la lista degli **inlinks** contiene gli archi entranti
Una rappresentazione ingenua può richiedere circa **64 bit per hyperlink**, mentre l’obiettivo è ridurre drasticamente questo costo
##### Boldi and Vigna
mantenere in memoria le liste di adiacenza del grafo del Web attraverso una compressione molto efficiente
Una delle idee principali è ordinare gli URL in modo **lessicografico**. Questo funziona bene per il Web perché URL simili, appartenenti allo stesso dominio o alla stessa sezione del sito, tendono a finire vicini nell’ordinamento
```scss
www.stanford.edu/alchemy
www.stanford.edu/biology
www.stanford.edu/biology/plant
www.stanford.edu/biology/plant/copyright
www.stanford.edu/biology/plant/people
www.stanford.edu/chemistry
```
Questi URL sono vicini nell’ordinamento e, molto probabilmente, hanno anche link simili, perché fanno parte dello stesso sito o della stessa struttura
la lista di adiacenza di un nodo è spesso simile a quella di uno dei **7 URL precedenti**; se è così, la nuova lista viene codificata come differenza rispetto a una lista precedente, altrimenti viene codificata da capo
```scss
1, 2, 4, 8, 16, 32, 64
1, 4, 9, 16, 25, 36, 49, 64
1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
1, 4, 8, 16, 25, 36, 49, 64
```
Per ottenere l’ultima lista dalla seconda, basta dire:
`usa la lista -2, rimuovi 9, aggiungi 8`
###### GAP ENCODING
invece di salvare tutti i valori assoluti, salvo il primo valore e poi le differenze tra valori consecutivi
Una volta ottenuti i gap, ogni intero può essere codificato usando codici compressi, per esempio il **gamma code**
con occupazione di bit media a $1+2\lfloor logx \rfloor$
L’ordinamento lessicografico degli URL funziona bene perché pagine simili tendono a essere vicine
##### Page rank
i link del Web vengono trattati in modo simile alle citazioni accademiche, come possibili segnali di conferimento di autorità. Tuttavia, viene anche precisato che non ogni link implica davvero autorevolezza, quindi il semplice conteggio degli in-link non è abbastanza robusto
è stato fatto un esempio con Fedez: se una persona molto seguita, con milioni di follower, segue o cita poche persone, quelle persone ricevono un segnale forte di visibilità/autorevolezza. Il punto non è solo “quanti link ricevo”, ma anche **quanto è autorevole chi mi linka**
###### Page rank scoring
Per calcolare PageRank si immagina un utente ideale, detto **random surfer**, che naviga casualmente tra le pagine web
Se una pagina contiene $i$ link uscenti, il random surfer sceglie ciascun link con probabilità:
$\frac{1}{i}$
Quindi, se una pagina ha 4 link uscenti, ogni link viene seguito con probabilità:
$\frac{1}{4}$
se, navigando casualmente per molto tempo, finisco spesso su una certa pagina, allora quella pagina è probabilmente importante. Quindi PageRank non misura direttamente “quanto è bello” il contenuto di una pagina, ma quanto quella pagina è **raggiungibile e centrale nella struttura dei link**
Il modello appena descritto, però, non basta
Quindi il modello “seguo sempre un link uscente a caso” può fallire per due motivi:
- se arrivo in una pagina senza link uscenti, mi blocco **(dead-end)**
- se arrivo in un ciclo o in una zona chiusa del grafo, continuo a girare lì dentro **(loop)**
Per risolvere questi problemi, PageRank introduce il **teleporting**
- con probabilità (es: 90%), il random surfer segue un link uscente scelto a caso;
- con probabilità (es: 10%), salta a una pagina casuale del Web.
con il teleporting, non ci si può più bloccare localmente e diventa possibile definire un tasso di visita di lungo periodo per ogni pagina
###### Calcolare il visit rate
Per trasformare l’intuizione del **random surfer** in un calcolo vero e proprio, PageRank usa un modello matematico basato sulle **catene di Markov**
una catena di Markov come un processo in cui la probabilità del prossimo stato dipende dallo stato attuale, secondo una matrice di transizione $P$
se il surfer si trova nella pagina $i$, la probabilità di andare nella pagina $j$ dipende solo da $i$, non da come è arrivato lì
###### Matrice di transizione
Costruiamo quindi una **matrice di transizione** $P$, dove ogni elemento $P_{ij}$ rappresenta:
$$P_{ij} = \text{probabilità di passare dalla pagina } i \text{ alla pagina }$$
Ogni riga della matrice rappresenta tutte le possibili destinazioni a partire da una certa pagina. Per questo motivo, la somma degli elementi di ogni riga deve essere uguale a 1:
$$\sum_{j=1}^{n} P_{ij}= 1$$
![[Pasted image 20260527113917.png|387]]
Per descrivere dove si trova il random surfer in un certo momento, usiamo un **vettore di probabilità**.
Un vettore di probabilità è un vettore:
$$x = (x_1, x_2, \dots, x_n)$$
dove ogni componente $x_i$ indica la probabilità che il surfer si trovi nella pagina $i$. Naturalmente, tutte le componenti devono essere comprese tra $0$ e $1$, e la loro somma deve essere $1$
Per esempio, se abbiamo tre pagine e il vettore è:
$x = (1, 0, 0)$
significa che il surfer si trova con probabilità 1 nella prima pagina. 
Se invece:
$x = \left(\frac{1}{3}, \frac{1}{3}, \frac{1}{3}\right)$
significa che il surfer ha la stessa probabilità di trovarsi in ognuna delle tre pagine

Se in un certo momento la distribuzione del surfer è descritta dal vettore $x$, allora la distribuzione al passo i esimo si ottiene moltiplicando $x$ per la matrice di transizione $P$ e mettendo potenza per il numero di passi se il passo è 1 sarà elevato a 1:
$$x_{\text{next}} = xP^i$$
la catena di Markov deve avere una distribuzione stabile nel lungo periodo. Qui entra il concetto di **ergodicità** ovvero
non importa da quale pagina comincia il random surfer: dopo molti passi, la distribuzione tende sempre alla stessa configurazione
- grazie al teleporting questa proprietà è valida
A un certo punto, continuando a moltiplicare per $P$, il vettore delle probabilità tende a stabilizzarsi. Chiamiamo questo vettore stazionario $a$
Se $a$ è stabile, significa che applicare un altro passo della catena non lo cambia più:
$$a = aP$$
Questa formula è centrale: dice che, se il surfer è già distribuito secondo il vettore stazionario $a$, dopo un altro passo di navigazione la distribuzione rimane ancora $a$
$a$ è un **autovettore sinistro** della matrice $P$, associato all’autovalore 1. Le slide indicano proprio che risolvere l’equazione $a = aP$ permette di ottenere il vettore delle probabilità stazionarie, cioè il PageRank

###### Esempio di mini web graph
![[Pasted image 20260527114218.png|236]]
![[Pasted image 20260527114233.png|483]]
definisco sotto la probabilità di random walk e di teleporting con $\alpha$ e $(1-\alpha)$
- quindi conto anche la probabilità di una matrice $nxn$ tutta a $1/n$
	- ovvero la probabilità di $1/n$ di fare teleporting su uno qualsiasi dei nodi
- **gli zeri della matrice originale non restano più zeri**, perché il teleporting aggiunge una piccola probabilità di passare da qualunque nodo a qualunque altro nodo $1/60$
###### Locale HITS(Hyperlink-induced Topic Search)
- metodo locale, non cerca di assegnare un punteggio stabile a tutte le pagine del Web, ma lavora su un sottoinsieme di pagine costruito a partire da una **query**
vogliamo distinguere tra due tipi di pagine:
- pagine **authority**, cioè pagine autorevoli su un certo argomento;
- pagine **hub**, cioè pagine che raccolgono e puntano a buone authority
La relazione tra hub e authority è circolare:
$$\text{un buon hub punta a molte buone authority}$$$$\text{una buona authority è puntata da molti buoni hub}$$
Questa idea assomiglia, a livello intuitivo, allo **pseudo relevance feedback**: si parte da un primo insieme di risultati ottenuti con una query, poi si usa quell’insieme per espandere o raffinare l’informazione. In HITS, però, l’espansione non avviene principalmente sui termini della query, ma sulla struttura dei link
Il procedimento è:
1. si parte da una query testuale;
2. si recuperano le pagine che contengono quella query;
3. queste pagine formano il **root set**;
4. dal root set si costruisce un insieme più ampio, detto **base set**;
5. sul base set si calcolano hub score e authority score.
HITS è utile soprattutto per **broad topic queries**, cioè query ampie e informative
###### Come capisco se una pagina è buona da selezionare?
- l'obiettivo è restituire all'utente pagine authority
inizialmente assegno 1 sia ad hub che authority
- $h(x) \leftarrow 1$
- $a(x) \leftarrow 1$

Poi l’algoritmo aggiorna iterativamente i punteggi guardando i link
Il punteggio hub di una pagina $x$ si calcola sommando i punteggi authority delle pagine verso cui $x$ punta:
$$h(x) \leftarrow \sum_{x \to y} a(y)$$

Il punteggio authority di una pagina $x$ si calcola sommando i punteggi hub delle pagine che puntano a $x$:
$$a(x) \leftarrow \sum_{y \to x} h(y)$$





Per dimostrare perché l’algoritmo converge, si usa la **matrice di adiacenza** $A$ del grafo costruito sul base set.
La matrice ha una riga e una colonna per ogni pagina. 
L’elemento:
$A_{ij}$ vale 1 se la pagina $i$ contiene un link verso la pagina $j$ altrimenti 0
La direzione entrante o uscente dipende da come leggo la matrice:
- leggendo la **riga $i$** vedo i link uscenti dalla pagina $i$;
- leggendo la **colonna $j$** vedo i link entranti nella pagina $j$.
In forma matriciale, gli aggiornamenti diventano:
$$h=Aa$$
$$a = A^Th$$
- Il ruolo della trasposta è importante perché permette di invertire il punto di vista: con $A$ guardo i link uscenti, mentre con $A^T$ guardo i link entranti.​
Sostituendo una formula nell'altra si ottiene:
$$h = AA^Th$$$$a = A^T A a$$
sono uno legato dall'autovettore dell'altro
- Dopo quante iterazioni ho una buona stima?
	- In teoria si può continuare fino alla convergenza, cioè fino a quando i valori cambiano pochissimo da un’iterazione alla successiva. In pratica, però, spesso bastano poche iterazioni per ottenere un ordinamento abbastanza stabile delle migliori pagine
	- circa $5$
usato in scenari troppo specifici spesso per discovery
- globale lo fai una volta locale lo dovrei fare più volte, quindi limitante
- poi anche topic drift
	- potrei deviare cambiando topic
