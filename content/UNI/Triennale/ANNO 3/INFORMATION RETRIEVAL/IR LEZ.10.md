##### Efficienza dei sistemi di ranking
Si vuole andare a migliorare quella che è l'efficienza nella fase di calcolo del ranking dei documenti nelle seguenti fasi principali
- calcolo della rilevanza dei documenti
- ordinamento del ranking
- selezione dei primi k documenti da mostrare
innanzitutto andiamo a dividere il ranking in 2 tipologie
- *safe*, se il ranking dei primi $K$ documenti restituiti è garantito che sia corretto
- *non safe*, non garantisce sempre di restituire i veri $K$ documenti migliori
	- di solito usiamo non safe per il semplice fatto che la soddisfazione dell'utente è soggettiva e l'importante è avere una buona qualità percepita dall'utente
##### Uso di Heap
si va ad utilizzare la struttura dati ad Heap per andare a ridurre il tempo di estrazione dei primi $K$ documenti senza andare ad ordinarli tutti
- si prendono solo i documenti con score non nullo di similarità definendoli in un insieme $J$ 
- si costruisce l'Heap con costo $O(J)$ 
- e poi si selezionano i primi $K$ con costo $O(Klog J)$ 
- vedendo una riduzione computazionale di selezione del 10%
![[Pasted image 20260513190532.png|222]]
- questo risolve il problema di selezione ma non risolve il problema di ridurre il calcolo degli score, devo comunque farli tutti quelli
#### Tecniche di pruning
da qui nascono diverse tecniche di **pruning** con l'obiettivo di eliminare preventivamente i documenti che non sono destinati a rientrare nella top $K$ 
molte tecniche posso anche combinarle ma devo bene tenere a mente che devo avere un trade-off tra:
- *poco pruning* significa *maggior costo* ma *più safeness*
- *troppo pruning* significa *minor costo* ma potrei aumentare la *non-safeness*
##### APPROCCIO GENERICO
l'approccio generico di pruning prevede la costruzione di un insieme $A$ di **contender** che abbia una dimensione compresa tra i top K e il numero totale di documenti
$$K < |A| \ll N$$
- e poi calcolare gli score solo su $A$ 
##### Index Elimination
la prima tecnica prevede l'eliminazione preventiva di una parte di indice
precisiamo non essere safe
prevede due idee alla base per capire chi eliminare
- <font color="#b2a2c7">high idf query terms only</font>
	- elimino tutti i termini della query che hanno però un **idf** troppo basso
		- ad esempio le stop word
- <font color="#b2a2c7">docs containing a lot of query terms</font>
	- non elimino solo quei documenti che contengono più di un certo numero di termini all'interno
	- ad esempio solo i documenti che contengono almeno 3 termini su 4 della query
	- introduce una forma di SOFT AND perché non prevede che tutti i termini della query siano citati nel documento
![[Pasted image 20260513192545.png]]
##### Champion lists
Consiste nel creare una lista dei migliori $r$ documenti costruita a index time
per ogni termine $t$ 
presenta diverse problematiche tra cui la possibilità di creare una sorta di obbligo nel recuperare solo determinati documenti escludendo a priori altri e quindi non dando visibilità a essi
#### Static quality scores
Si va ad aggiungere alla sola rilevanza testuale come `tf` `idf` ecc aggiungendo il concetto di autorevolezza
un documento è autorevole secondo un determinato criterio che gli da un punteggio
$$g(d)$$
 ad esempio possiamo avere nel caso della cosine similarity una applicazione molto semplice che da peso uguale all'autorevolezza e al cosine score che è il 
###### Net score
$$\text{net-score}(q,d) = g(d) + \text{cosine}(q,d)$$
- il documento rispetto alla query ottiene un buon punteggio se è autorevole e se è rilevante per cosine similarity
###### Global champions lists
posso creare delle liste di documenti autorevoli per ogni termine sfruttando
$$g(d) + tf\text{-}idf_{t,d}$$
##### Cluster Pruning
è una tecnica non-safe che prevede un lavoro di preprocessing per poi ridurre il costo computazionale del calcolo degli score per la query
1. si scelgono casualmente circa $\sqrt{N}$​ documenti, chiamati **leaders**;
2. ogni altro documento viene assegnato al leader più vicino, diventando un suo **follower**
con $\sqrt{N}$ leaders avrò $\sqrt{N}$​ followers 
- all'arrivo di una query prima di calcolare lo score seleziono quale leader è più vicino alla query nello spazio vettoriale
- poi posso calcolare ​cosine similarity per quell'insieme di followers con un tempo computazionale nell'ordine di $O(\sqrt{N})$
###### Cluster Pruning con random sampling
posso scegliere casualmente quali leader prendere in considerazione una volta fatta la query senza calcolare vicinanze nello spazio vettoriale
si andranno a prendere più leader dove ci sono più documenti e quindi dove è possibile che ci sia la query
![[Pasted image 20260513194816.png|362]]
#### Tiered Indexes
Tecnica che divide in Tier le posting list dei termini, questo è molto utile perché potrei avere un insieme troppo ridotto di contender $A$ e quindi di non avere abbastanza documenti da calcolare
potrei dividere in più tier ad esempio in base all'autorevolezza del documento $g(d)$ 
- se nel primo tier non ho abbastanza documenti vado a vedere i tier più bassi
##### impact ordered posting
sfrutto la weighted term frequency per fare early elimination, ovvero una tecnica non safe che va ad eliminare tutti i documenti che non rispettano un certo peso $r$ oppure ordinando per weighted term frequency potrei prendere solo i primi $r$ documenti della lista
$$wf_{t,d} = 1 + \log(tf_{t,d})$$$tf_{t,d} > 0$
- ordinare le posting list in base alla $wf_{t,d}$ fa si che non possiamo più scorrerle in parallelo ma solo term-at-a-time
si potrebbe sennò ordinare i documenti in base a $idf$ considerando prima quelli con $idf$ più alto
- L’obiettivo è ridurre il costo computazionale mantenendo una recall sufficientemente alta, cioè cercando di non eliminare troppi documenti che potrebbero essere rilevanti
- la **recall** dipende dai **falsi negativi**
- quindi si cerca un compromesso buono
##### Scoring Wand
tecnica di pruning safe che scarta i documenti che con una garanzia matematica non possono rientrare nella top $K$ 
mediante finger upper bound pivot e threshold
e ordinando le posting list per docID
- finger è un puntatore della singola posting list al successivo docID che ancora deve essere analizzato
- upper bound rappresenta il massimo valore informativo che il termine fornisce
	- calcolo UB ad esempio mediante BM25 senza query
	- $UB_t = \max score_t(d)$
- il pivot è una informazione globale che rappresenta l'ultimo docID minimo che ha superato la threshold di una determinata iterazione
- la threshold è quel valore numerico globale che deve essere superato dalla somma degli upper bound dei termini, se sommati non superano la threshold allora quei docID matematicamente non sono informativi
- se il docID minimo della lista di quella iterazione supera la threshold allora si calcola lo score effettivo
	- altrimenti si ignora e si passa a i docID successivi
- ad ogni iterazione ordino per docID crescente e sommo gli UB 
successivamente si calcolano gli score dei soli docID precedenti a quel pivot
![[Pasted image 20260518134841.png|391]]
![[Pasted image 20260518134826.png|484]]
WAND è safe perché smette di selezionare i documenti solo quando essi non superano più la threshold informativa aspettata
nei test, WAND può portare a una riduzione superiore al **90%** nel numero di score computation