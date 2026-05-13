##### Efficienza dei sistemi di ranking
- La seguente lezione tratta **come calcolare il ranking dei documenti in modo efficiente**, senza dover valutare in modo esaustivo ogni documento della collezione per ogni query
- se dovessi calcolare la cosin similarity o una delle funzioni viste avrei troppo lavoro di CPU
###### Ranking Safe o non safe
- distinzione tra safe e non safe
	- *safe*, se il ranking dei primi $K$ documenti restituiti è garantito che sia corretto
	- *non safe*, non garantisce sempre di restituire i veri $K$ documenti migliori
		- di solito sfruttiamo non safe
			- nella pratica questo può essere accettabile, perché la funzione di ranking è comunque solo una **proxy** della soddisfazione dell’utente: non misura direttamente ciò che l’utente considera utile, ma prova ad approssimarlo
			- Se i documenti restituiti sono molto vicini ai migliori secondo la funzione di ranking, la qualità percepita può rimanere alta.
- Esempio:se un documento non contiene nessun termine della query, normalmente viene ignorato. 
	- Questa esclusione può essere considerata safe in un modello in cui solo i documenti con almeno un termine della query possono avere cosine score non nullo
#### Operatività del ranking
Dal punto di vista operativo, il problema del ranking si riduce a due passaggi principali:
1. **calcolare uno score** per i documenti candidati;
2. **selezionare i migliori $K$** documenti secondo quello score.
- Nel caso della cosine similarity, il sistema cerca i $K$ documenti più vicini alla query nello spazio vettoriale. Questo richiede, almeno in forma diretta, di calcolare molti valori di coseno tra query e documenti
	-  calcolare in modo efficiente ogni singola cosine similarity;
	- scegliere in modo efficiente i $K$ valori più alti.
#### Perchè non applicare degli algoritmi di ordinamento?
- Una volta calcolati gli score dei documenti candidati, non è necessario ordinare completamente tutti i documenti. Se l’obiettivo è mostrare solo i primi $K$ risultati, basta selezionare i $K$ score più alti.
	- sia $J=\text{numero di documenti con cosine score non nullo}$
Un ordinamento completo di tutti i $J$ documenti sarebbe inutile, perché produrrebbe un ordine totale anche per documenti che non verranno mai mostrati all’utente. È più efficiente usare una struttura dati adatta alla selezione dei migliori valori, come un **heap**.
###### Heap
- si costruisce uno heap a partire dai $J$ documenti con score non nullo
	- con costo $O(2J)$
- poi si estraggono i $K$ documenti con score più alto.
	- $O(log J)$ 
	- $logJ$ corrisponde all’altezza dell’albero.
- con K=100 e con J=1milione  
	- usare uno heap per selezionare i primi 100 risultati costa circa il **10%** rispetto al costo di ordinare completamente tutti i documenti candidati
![[Pasted image 20260513190532.png|222]]
- assunzione di OR, la query viene fatta con OR, ma se ho tanti OR il costo cresce decisamente
#### Il problema di base
- il problema alla base però rimane, ho comunque un numero altissimo di operazioni demandate al calcolo della cosine similarity per tutti i vari processi
- l'utilizzo di una struttura dati a heap aiuta nella fase finale, cioè nella scelta dei migliori $K$ score tra quelli già calcolati. Tuttavia, non risolve completamente il collo di bottiglia principale: **calcolare gli score per troppi documenti candidati**.
- Il vero obiettivo diventa quindi ridurre drasticamente il numero di documenti per cui vale la pena calcolare lo score. 
	- Da qui nascono diverse tecniche di **pruning**, cioè di eliminazione preventiva di documenti che probabilmente non entreranno nella top $K$
molte di queste tecniche possono essere combinate, ma con attenzione.
L’idea generale è che ciascuna tecnica riduce l’insieme dei documenti candidati secondo un criterio diverso
più pruning si applica, più aumenta il rischio di perdere documenti che avrebbero potuto avere un punteggio alto. Per questo molte di queste tecniche sono **non-safe**: migliorano l’efficienza, ma non garantiscono sempre di recuperare esattamente i veri top $K$
#### Approccio generico
La struttura comune di queste tecniche è la seguente: 
- invece di considerare tutti i documenti della collezione, il sistema costruisce un insieme $A$ di **contender**
	- documenti candidati al ranking finale.
L’obiettivo è avere:
$$K < |A| \ll NK$$

- $K$ è il numero di risultati che vogliamo restituire;
- $|A|$ è il numero di documenti candidati;
- $N$ è il numero totale di documenti nella collezione.
L’insieme $A$ deve essere abbastanza grande da contenere documenti buoni, ma molto più piccolo dell’intera collezione. 
- Una volta costruito $A$, il sistema calcola gli score solo per i documenti in $A$, poi restituisce i migliori $K$ tra questi
- ora spiego delle tecniche precise per la costruzione di $A$
##### Index Elimination
La prima tecnica è l’**index elimination**, cioè l’eliminazione di una parte dell’indice o di una parte dei candidati prima del calcolo completo degli score.
- Nel calcolo cosine standard, un documento viene considerato candidato se contiene almeno uno dei termini della query. 
	- Questo è già un primo filtro: se un documento non contiene nessun termine della query, avrà score nullo rispetto a quella query nel modello vettoriale classico, quindi può essere ignorato.
L’index elimination porta questa idea oltre. Invece di considerare tutti i documenti che contengono almeno un termine della query, si restringe ulteriormente il calcolo usando due criteri principali:
1. considerare solo i termini della query con alto **idf**;
2. considerare solo i documenti che contengono molti termini della query
Questa tecnica riduce il numero di documenti da valutare, ma può diventare non-safe: un documento eliminato potrebbe comunque essere rilevante, soprattutto se il ranking finale combina più segnali
- è composta da due forme principali
	- high idf query terms only
	- docs containing a lot of query terms
###### high idf query terms only
- La prima forma di index elimination consiste nel considerare solo i termini della query con alto **idf**
	- termini a basso idf contribuiscono poco allo score e difficilmente modificano molto l’ordinamento finale
	- L’**idf** misura quanto un termine è discriminante nella collezione. Termini rari hanno idf alto, perché compaiono in pochi documenti e quindi aiutano molto a distinguere i documenti rilevanti
- questo fa capire molto bene come le stopword ai fini del ranking potrebbero essere escluse
###### Docs containing a lot of query terms
La seconda forma di index elimination consiste nel considerare solo i documenti che contengono molti termini della query
- Nel modello vettoriale classico, un documento che contiene anche solo un termine della query può avere score non nullo ed essere quindi candidato
	- Tuttavia, per query con più termini, spesso è ragionevole privilegiare i documenti che contengono diversi termini della query, perché sono più probabilmente pertinenti
- Questa tecnica introduce una forma di **soft AND** o **soft conjunction**. Non è una AND booleana rigida, perché non richiede necessariamente che tutti i termini siano presenti.
	- Richiede però che il documento contenga un numero sufficientemente alto di termini della query
Esempio
![[Pasted image 20260513192545.png]]
applicando il criterio “3 termini su 4”, vengono considerati solo i documenti **8, 16 e 32**, perché sono quelli che compaiono in almeno tre posting list
- prendo in considerazione solo i documenti che soddisfano una soglia minima di copertura dei termini della query
	- lo facciamo osservando le caratteristiche e i contributi che danno le singole parole
##### Champion lists
- L’idea è precomputare, per ogni termine $t$ del dizionario, una lista dei migliori $r$ documenti per quel termine. 
- Nel caso del peso tf-idf, questi possono essere i documenti con peso più alto per $t$, cioè documenti in cui quel termine ha una forte importanza. 
	- Questa lista viene costruita **a index time**, cioè durante la costruzione dell’indice, non al momento della query
- poi ad una determinata query consulto solo le champion lists
	- per ottenere l'insieme dei contender $A$
- è solo una cosa a scopo didattico perchè creerei la possibilità di censurare determinati documenti
ESERCIZI CROCS 
A SLIDE 17
### Static quality scores
Nei sistemi di ricerca reali, la sola rilevanza testuale non è sufficiente. Due documenti possono essere entrambi pertinenti rispetto alla query
- ma avere livelli molto diversi di **autorevolezza**, affidabilità o qualità generale.
	- segnali di *autorevolezza* come: pagine molto collegate, articoli pubblicati da giornali importanti, paper con molte citazioni, contenuti con molti bookmark, like o riferimenti, e più in generale PageRank
##### Modellare l'autorevolezza
Per integrare l’autorevolezza nel ranking, si assegna a ogni documento $d$ un punteggio statico di qualità, indicato con:
$$g(d)$$
- Questo punteggio è detto **static quality score**, perché è indipendente dalla query. In altre parole,
- $g(d)$ misura una proprietà generale del documento, non quanto quel documento sia rilevante per una query specifica
- spesso compreso tra 0 e 1
	- Questa normalizzazione è utile perché consente di combinare facilmente il punteggio statico con la cosine similarity, che anch’essa è normalmente compresa tra 0 e 1
- con una funzione come BM25 avremmo dovuto applicare un'altra forma di scala e di pesatura per confrontare le due cose
###### Net score
Una volta introdotto il punteggio statico di qualità, si può definire un punteggio complessivo, detto **net score**, che combina rilevanza e autorevolezza:
$$\text{net-score}(q,d) = g(d) + \text{cosine}(q,d)$$
- $q$ è la query;
- $d$ è il documento;
- $g(d)$ è il punteggio statico di qualità del documento;
- $\text{cosine}$ misura la rilevanza del documento rispetto alla query.
- In questa formulazione, il documento ottiene un punteggio alto se è 
	- sia pertinente rispetto alla query 
	- sia autorevole in generale 
- Trovare i top $K$ ora non è solo in base alla cosine similarity ma anche in base al net score
	- posso **ordinare** le posting list secondo $g(d)$ 
		- analizzo prima i documenti con miglior autorità
- Le **champion lists** anche possono essere adattate per tenere conto non solo del peso del termine nel documento, ma anche della qualità statica del documento
	- **global champion lists**, costruite scegliendo i documenti con valori più alti di $g(d) + tf\text{-}idf_{t,d}$
- nei tweet posso sfruttare lo static quality score come ad esempio i like i followers o simili per trovare risultati di una ricerca
##### Cluster Pruning
Il **cluster pruning** è una tecnica che serve a ridurre il numero di documenti per cui calcolare la **cosine similarity**. 
- L’idea è spostare una parte del lavoro in **preprocessing**, così da rendere più veloce la fase di risposta alla query
Supponiamo di avere $N$ documenti nella collezione. Il preprocessing del cluster pruning avviene in due passaggi:
1. si scelgono casualmente circa $\sqrt{N}$​ documenti, chiamati **leaders**;
2. ogni altro documento viene assegnato al leader più vicino, diventando un suo **follower**
Se scelgo $\sqrt{N}$​ leader, ottengo grosso modo $\sqrt{N}$​ gruppi, ciascuno con circa $\sqrt{N}$​ documenti
- Quando arriva una query $q$, il sistema non confronta subito $q$ con tutti i documenti. Segue invece questa procedura:
	- calcola quale **leader** è più vicino alla query
	- prende quel leader e i suoi follower come insieme di candidati
	- calcola la cosine similarity solo su questo sottoinsieme
	- restituisce i migliori $K$ documenti trovati tra questi candidati
- relativi costi
	- servono circa $\sqrt{N}$​ confronti per trovare il leader più vicino alla query
	- poi servono circa $\sqrt{N}$​ confronti per valutare i documenti del cluster selezionato
- Quindi il numero totale di cosine similarity da calcolare è dell’ordine di:
	- $O(\sqrt{N})$
- dati 1 miliardo di documenti avrò circa 30k cosine similarity da fare
	- $10^{9/2} \approx$  31,623
- NON É SAFE, non esplora tutti i documenti
	- ma è molto veloce e facile da usare con qualsiasi scala di collezione di documenti

###### Random sampling nella scelta dei leader
- si scelgono i leader in modo casuale per offrire velocità e semplicità di utilizzo
- se una regione dello spazio vettoriale contiene molti documenti, è probabile che il campionamento casuale selezioni più leader proprio in quella zona, producendo una partizione più fine dove la densità dei documenti è più alta
![[Pasted image 20260513194816.png|362]]

FINO ALLA SLIDE 30