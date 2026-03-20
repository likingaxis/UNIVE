##### QUANTO È GRANDE UN ALBERO?
- va calcolato in base al logaritmo di qualcosa che non conosciamo
- noi vogliamo poter stimare a priori la stima di quanto è grande un albero di decisione del dizionario seguente, sarà argomento proprio di questa lezione
### INDEX COMPRESSION
- usata per ridurre le dimensioni della indicizzazione
	- ma allo stesso tempo ne preserva la sua operatività
- due tipi di compressione
	- lossy
		- posso perdere alcune informazioni qualità ecc
	- lossless
		- ottengo la stessa informazione dopo la decompressione
- basso costo di decompressione
- nelle posting list potenzialmente se ho 173 e poi 174 metto +1 al posto di 174 così non uso log_2 174 bit per rappresentarlo

###### VANTAGGI DI COSA TOGLIERE NELLA TABELLA E COSA FARE
- questa tabella divide la convenienza in base alla struttura che stiamo analizzando
	- la parte del dizionario(i termini)
	- la parte delle posting non posizionali
	- la parte delle posting posizionali
- la convenienza varia in base a ciò che stiamo analizzando 
- tipo le stopword non cambiano nulla alla struttura del dizionario, ma alle altre due si
- cosa si intende per delta%?
- togliere i numeri non conviene
- case folding(togliere le maiuscole)
	- riduce particolarmente la cosa
- stop word non conviene(pk?) in un dizionario ma per i positional o non positional conviene
- effettuare stemming conviene particolarmente
	- lasciare solo la radice della parola
	- stemming ti porta alla forma base della parola sapendo che una parola è formata sempre da radice e desinenza
	- li serve la lemmatizzazione ovvero una forma base molto più avanzata
		- quindi in italiano è meglio lemmatizzazione
- RICORDA: non ci sono regole generali ogni testo ha la sua particolarità questi dati possono variare in base a cosa hai davanti
	- un tweet avrà una riduzione praticamente solo sulle stopword, il resto di solito non si ripete
- TUTTE QUESTE TECNICHE DI COMPRESSIONE SONO LOSSY perché perdo informazioni
### LEGGE DI HEAPS
- formula $M=kT^b$
- la grandezza del dizionario segue il numero di token nella collezione
- con spesso k compreso tra 30 e 100 e b uguale a 0.5
- spiega meglio questa parte e spiega perché si applica il log in quel modo slide 10
- spiega slide pagina 11 con quel grafico
- usare la seguente legge su una collezione di più di un tot documenti
	- questa legge approssima in modo praticamente esatto rispetto alla reale effettiva
	- la stima è ottima
- la legge predice 38,323 termini
- in realtà sono 38,365 
- ottimo
QUESTO È MOLTO UTILE PER STIMARE LA DIMENSIONE DELL'ALBERO 
- prendi il numero della stima ci fai il logaritmo e vedi bene che hai la dimensione dell'albero
###### ESERCIZIO DI ESAME
non ho capito quale
30 minuti
### LEGGE DI Zipf's 
- forse serve per stimare dopo quanto riapparirà un certo termine?
- spiega la legge adeguatamente e a cosa serve nel mondo della IR
- se io ordinassi le mie parole per frequenza all'interno del corpus più o meno la i esima parola più frequente avrà la frequenza proporzionale a 1/i
	- dove i rappresenta...
- se la parola più frequente occorre un tot numero di volte, quella che viene dopo occorre tot volte
	- l'ultima parola occorre ipoteticamente una volta sola(non ho capito)
### TECNICHE DI COMPRESSIONE
- assunzioni: a slide 17 mi pare nessun positional index ecc...
- sono molto utili perché vogliamo lavorare su memoria (ovviamente RAM)
- versione senza nulla, naive version
	- abbiamo riservato 20 byte per ogni parola
	- ma occupa troppo spazio
- versione dictionary as a string
	- mettiamo tutto in una unica stringa
	- usiamo dei puntatori che indicano la fine della parola per capire dove inizia la prossima
	- uso la frequenza di quella parola non ho capito come
		- forse serve per ridurre la riscrittura del termine sulla stringa?
- uso la varianza per capire bho
	- se la varianza è 0 allora
	- se la varianza è 1 allora
	- teorema del limite centrale
		- media+varianza media-varianza da una stima adeguata per capire non ho capito cosa
- ora si usa in numero la compressione
	- capire quante posizioni risolve un puntatore
	- capire la lunghezza totale della stringa
	- calcoli su calcoli spiegali perfavore sono a slide 21
- se si utilizzasse un albero esso conterrà in ogni nodo l'offset che indica la posizione della parola
#### VERSIONE DICTIONARY AS A STRING CON BLOCCHI
- scelgo una dimensione di blocchi che indica l'inizio di un blocco di parole
	- ognuna di quelle ha una sua lunghezza
	- ogni blocco è puntato da un puntatore
- miglioria per ridurre il numero di byte per i puntatori uso un numero per specificare la lunghezza della stringa
	- uso un puntatore iniziale(iniziale del blocco)
	- salvo 9 byte ma ne uso 3 per scrivere il numero
- risparmio tanti byte, ma poi occupo tempo di ricerca per esplorare il singolo blocco
- se avessi un puntatore per parola occuperei molto meno tempo ma occuperei più spazio per i puntatori
- foto di albero per capire il numero di confronti medi
	- slide 26, credo che la 25 sia come la 26 ma fatta peggio
#### ESERCIZIO DI ESAME
VEDERE COME CAMBIA QUESTA COSA RISPETTO A BLOCCHI DA 8 O DA 16
##### ULTERIORI OTTIMIZZAZIONI APPLICATI ALLA VERSIONE A BLOCCHI FRONT CODING
- tecnica che sfrutta le parole ordinate
	- per ridurre tutte parole con la stessa iniziale ora posso prendere parole che sono praticamente uguali per una certa radice
	- tipo automata, automate, automatic, automation
		- posso prendere la radice e definire come parole diverse tutto il resto

##### QUANTO RIDUCO CON QUALE TECNICA?

foto tabella
- quello fixed width è la versione naive? si credo di si
### LA POSTING COMPRESSION
- senza nulla a quanto pare pure per the uso 32 bit per il termine e 32 per il puntatore?
- operazione essenziale perché le posting possono prendere dimensioni esorbitanti
	- tecnica con gap
		- usare la somma per i docID, mi salvo solo il primo, poi per un termine il successivo sarà la somma
		- ne uso tipo 20 di bit?
	- tecnica con variable length encoding
		- vorrei usare i bit solo di cui ne ho necessità
		- vorrei una codifica che sia logaritmica di G dove G è la media dei termini
		- quando me servono 3 bit uso 3 bit quando me servono 20 bit ne uso 20
		- potrei usare la codifica unaria con alla fine 0
			- questa codifica è stronza, è ottimale solo quando i numeri sono $2^-n$
		- sfruttata però solo per fare la codifica gamma code
			- si sfrutta sempre la tecnica con gap credo
				- gamma code spiegato bene
					- sfruttando magari anche l'esempio di gamma code con il numero 13
				- questa cosa dal livello teorico è buono ma pratico è inapplicabile
				- per codificare serve 2 log in base 2 del numero
					- spiegare perché è ottimo
				- utilizzo di bitmap vector con esso
