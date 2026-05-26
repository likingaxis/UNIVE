### LINK ANALYSIS
oltre a usare il contenuto dei documenti usiamo anche gli hyperlink che danno segno di autorevolezza della pagina
esempio di autorevolezza è il good bad unknown
- se punti a un bad node sei bad
- se un good node ti punta sei good
se una pagina è puntata da tanti nodi probabilmente è autorevole
cerco di costruire altre pagine per puntare a me
- link analysis consente di estendere le funzionalità del sistema di IR al di fuori del testo dei contenuti
- facendo link based clustering
- Crawling per scoprire le pagine
###### Web come un grafo diretto
- page A con un anchor che con un hyperlink e una pagina B
Anchor text
attraverso il link tengo traccia dell'etichetta che riguarda il link
salvo il testo delle anchor
includiamo anche gli anchor text della pagina nella fase di indicizzazione con peso diverso
tutti i puntatori a quella pagina dicono direttamente delle cose, ma quindi se puntano a quella pagina uno troverà quella pagina
se cerco azienda più grande al mondo avrò IBM, ma questo non perchè dentro IBM ho scritto pagina più grande al mondo ma perchè le altre pagine lo citano scrivendo azienda più grande al mondo
dare un peso alle informazioni da altre citazioni serve per risolvere i miserable failure 
dipende dall'autorevolezza di chi lo scrive o altro

##### Connectivity servers
questo grafo dove lo memorizziamo?
###### Boldi and Vigna
Cerchiamo una compressione con una lista di adiacenza
la struttura dati deve essere operativa
le proprietà che devo vedere sono
similarità
località
gap encoding in sorted list
distribuzione dei gap values
riduco a circa 3 bit per link
ognuna di queste URL ha una lista di adiacenza
i link possono essere entranti o uscenti
considerando i link entranti 
prendi il numero -2 ovvero il diff , 9 rimuovi 9 e aggiungi 8
vedono a blocchi di 7 URL, una volta ordinati in modo lessicografico 
posso usare il gamma code
main advantages of BV
##### Page rank
Bibliography analysis è stato fatto une sempio con fedez fedez segue 100 persone ma ha milioni di followers
- le persone che segue prendono molta autorevolezza
###### Page rank scoring
immaginiamo un utente che fa random walk sui siti
casualmente aprirò un link uscente con probabilità 1/i come numero i il numero di pagine citate su quella pagina
una pagina senza link uscenti frega tutto
non navigherò tutte le pagine possibili anche a infinito perchè potrei raggiungere un loop
ma posso comunque stimare il tempo di visualizzazione dell'utente, basta vedere il tempo totale di navigazione posso sapere sul tempo con maggior probabilità
la pagina con più alta probabilità di visualizzazione è la più figa
il nostro utente se raggiunge un loop o un nodo bloccato faccio il teleporting
il nostro utente fa un jump su altre pagine
in ogni pagina con una certa probabilità continuo l'esplorazione con un'altra probabilità mi teletrasporto in un'altro punto della rete
questo permette la visualizzazione completa
###### Calcolare il visit rate
uso un modello markoviano per cui esiste una probabilità ij
per cui faccio delle scelte locali, non vedo la storia dei nodi precedenti
costruiamo una matrice che rappresenta la probabilità del nodo j per essere il prossimo stato dato lo stato corrente i
questa somma della matrice deve dare 1
esercizio, scrivere la distribuzione di probabilità della markov chain
processo diventa ergodico per un lungo periodo di tempo
indipendentemente dal nodo di partenza
al termine del calcolo di page rank ho sempre una soluzione
###### Probability vectors
con probabilità $x_i$
###### Esempio con mini web graph a slide 39
1 per uno trasposto è una matrice con un nome
Visto che è indipendente lo stato di inizio avrò una probabilità di 1/n in tutti
a partire da x faccio xP
il teletrasporto permette anche entrature di verso da 0 quindi ho autovalori diversi da 0
$a=a*P$
il random surfing ci dirà con che probabilità finirò lì dentro
se la pagina ha probabilità alta allora significa che vale la pena valutarla e metterla in prime posizioni
Quella vista sopra è Globale
###### Locale HITS
ci sono due tipi di pagine, pagine hub e pagine authority
