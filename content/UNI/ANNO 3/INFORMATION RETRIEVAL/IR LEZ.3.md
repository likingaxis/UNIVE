### INDEX COMPRESSION
- La **index compression** serve a **ridurre lo spazio occupato dall’indice**, mantenendo però la sua capacità di funzionare correttamente(operatività)
	- Non vogliamo perdere efficienza: l’obiettivo è avere una struttura **più compatta ma ancora utilizzabile velocemente**.
- Possiamo distinguere due tipi di compressione:
    - **Lossless**
        - Non si perde informazione
        - Dopo decompressione otteniamo esattamente i dati originali
        - È quella usata principalmente in Information Retrieval
    - **Lossy**
        - Si perde parte dell’informazione
        - Può influenzare la qualità dei risultati
        - Alcuni preprocessing (come stopword o stemming) possono essere visti come forme di compressione lossy
- Le tecniche di compressione devono avere un **basso costo di decompressione**
- Questo perché:
    - i dati vengono decompressi frequentemente durante le query
    - se la decompressione fosse lenta, annullerebbe i vantaggi della compressione
###### VANTAGGI DI COSA TOGLIERE NELLA TABELLA E COSA FARE
![[Pasted image 20260320170023.png]]
- questa tabella mostra **come cambia la dimensione dell’indice** a seconda del preprocessing applicato
	- il cambiamento viene misurato separatamente su:
		- **dizionario** = numero di termini distinti
		- **indice non posizionale** = numero di postings
		- **indice posizionale** = numero di posizioni da memorizzare
##### Effetti delle tecniche di preprocessing
- Le diverse tecniche di preprocessing non hanno lo stesso effetto su tutte le componenti dell’indice: la loro convenienza dipende da cosa stiamo analizzando (dizionario, postings non posizionali, postings posizionali).
- In particolare:
    - **Rimozione delle stopword**
	    - elimina tutte quelle che sono le stopword
        - è **molto efficace** nel ridurre la dimensione delle postings lists (sia non posizionali che posizionali), perché le stopword sono estremamente frequenti
        - è invece **poco utile sul dizionario**, perché il numero di termini distinti coinvolti è molto piccolo
    - **Case folding (rimozione delle maiuscole)**
	    - operazione che mira a togliere le maiuscole
        - è **molto efficace sul dizionario**, perché unifica parole come _Apple_ e _apple_
        - ha invece **effetto limitato sui postings**, e può non cambiare affatto il numero di posizioni
    - **Eliminazione dei numeri**
        - ha un **impatto ridotto sul dizionario**
        - ha un effetto **moderato sulle postings**, ma non è tra le tecniche più incisive
    - **Stemming**
	    - operazione che riduce le parole a una forma comune, eliminando suffissi e variazioni morfologiche
	        - è **molto efficace nel ridurre il numero di termini distinti** (dizionario)
	        - ha un effetto **più contenuto sulle postings**
	        - inoltre introduce una perdita di informazione, perché le parole vengono ridotte a forme non sempre linguisticamente corrette
        - per lingue come l'italiano è consigliata la lemmatizzazione, rispetto allo stemming è più complessa ma efficace
- cosa si intende per $\Delta \%$
	- **Δ%** indica la variazione percentuale rispetto alla riga precedente della tabella
	- **T%/cumul %** indica la riduzione cumulativa rispetto al caso iniziale “unfiltered”
- RICORDA: non ci sono regole generali ogni testo ha la sua particolarità questi dati possono variare in base a cosa hai davanti
	- un tweet avrà una riduzione praticamente solo sulle stopword, il resto di solito non si ripete
- **questi preprocessing** possono essere visti come forme di compressione **lossy**, perché eliminano o modificano informazione
### LEGGE DI HEAPS
- La legge di Heaps descrive come *cresce* il numero di *termini distinti* (dizionario) al crescere del numero di token in una collezione
- *formula* $M=kT^b$
	- $M$ è il numero di termini distinti
	- $T$ è il numero totale di token
	- $k$ è una costante (tipicamente tra 30 e 100)
	- $b$ è circa 0.5
Questa stima è *utile* perché consente di:
- **prevedere la dimensione dell’indice**
- **stimare** **l’altezza** delle strutture di ricerca (albero) (circa $log⁡M$) 
- funziona bene per **collezioni grandi (T sufficientemente grande)**
	- NON è esatta
	- ma è **molto accurata**
	- es con $1,000,020$ token
		- la legge predice $38,323$ termini
		- in realtà sono $38,365$ 
![[Pasted image 20260320172623.png|400]]
- il log viene usato principalmente per rendere il grafico lineare e quindi più leggibile e confrontabile con i dati reali
	- qui abbiamo la retta teorica(quella tratteggiata)
	- e la retta data dai valori effettivi dove ogni punto è una coppia `(M,T)`
		- dove M sono i termini distinti e T i token totali
###### ESERCIZIO DI ESAME
non ho capito quale
30 minuti
### LEGGE DI Zipf's
- La legge di Zipf descrive **come sono distribuite le frequenze dei termini** all’interno di un corpus
- NON serve a stimare quando riappare un termine, ma a capire **quanto spesso compaiono i termini rispetto agli altri**
- Se ordiniamo le parole per frequenza decrescente:
    - la parola in posizione $i$ (cioè la i-esima più frequente) avrà una frequenza **inversamente proporzionale a iii**
    - dove:
        - $i = 1$ → parola più frequente
        - $i = 2$ → seconda più frequente
        - ecc…
- In formula:
    $cf_i \approx \frac{K}{i}$
    **cf = collection frequency**
Se la parola più frequente compare un certo numero di volte:
- la seconda compare circa la metà
- la terza circa un terzo
- e così via
- Le frequenze non vengono calcolate da Zipf:
    - sono già presenti nei dati
- Zipf descrive il fatto che:
    - poche parole sono **molto frequenti**
    - moltissime parole sono **molto rare**
![[Pasted image 20260320181700.png|400]]

### TECNICHE DI COMPRESSIONE
- Assunzioni:
    - ci concentriamo sulla compressione del **dizionario**
    - non consideriamo (per ora) l’indice posizionale
- L’obiettivo è ridurre lo spazio occupato, in modo da poter mantenere il dizionario in memoria (RAM)
###### VERSIONE SENZA NULLA, NAIVE fixed-width
- ogni termine è memorizzato separatamente
- si riserva uno spazio fisso (es. 20 byte per parola)
- problema:
    - grande spreco di spazio (molte parole sono più corte)
![[Pasted image 20260320182736.png]]
###### VERSIONE DICTIONARY AS A STRING
- si concatenano tutti i termini in un’unica stringa
- per accedere ai termini:
    - si usano **puntatori (offset)** che indicano dove inizia ogni parola
    - oppure si memorizza la lunghezza della parola
- vantaggi:
    - si elimina lo spazio inutilizzato
    - si memorizzano solo i caratteri effettivi
- il costo totale è dato da:
    - dimensione della stringa (somma delle lunghezze delle parole)
    - spazio per i puntatori
i puntatori sono importanti:
- ogni puntatore occupa memoria (es. 4 byte)
- quindi bisogna bilanciare:
    - numero di puntatori
    - spazio risparmiato sulle stringhe
se si usa una struttura ad albero:
- ogni nodo contiene un offset alla stringa
- questo permette di accedere ai termini mantenendo la struttura di ricerca
![[Pasted image 20260320182805.png]]
bit per puntatore≈$log_2​(total \ string \ length)$
#### VERSIONE DICTIONARY AS A STRING CON BLOCCHI
- Per ridurre il numero di puntatori, si raggruppano i termini in **blocchi di k parole**
- Si memorizza:
    - una stringa unica con tutte le parole
    - un puntatore per ogni blocco (non per ogni parola)
- All’interno di un blocco:
    - le parole sono salvate consecutivamente
    - ogni parola è preceduta dalla sua lunghezza, per poterla individuare
- *VANTAGGI*
	- Il numero di puntatori passa da $M$ a $M/k$
		- dove $k$ è il numero di blocchi
	- Riduzione significativa dello spazio occupato
- *SVANTAGGI*
	- Per cercare un termine:
	    - si individua il blocco
	    - si scansionano le parole nel blocco
	- Aumenta il numero di confronti → maggiore tempo di ricerca
		- Più blocchi piccoli → più spazio, meno tempo
		- Blocchi grandi → meno spazio, più tempo
	- Il costo medio della ricerca aumenta perché è necessario esplorare sequenzialmente il blocco dopo aver trovato il puntatore
RIPRENDI QUI APPROFONDENDO DA SLIDE 24 A 26
#### ESERCIZIO DI ESAME
VEDERE COME CAMBIA QUESTA COSA RISPETTO A BLOCCHI DA 8 O DA 16
SLIDE 27
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
