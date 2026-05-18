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

#### Tiered Indexes
- Se restringiamo troppo l’insieme dei documenti candidati $A$, potremmo ottenere meno di $K$ documenti da restituire
Per risolvere questo problema si può organizzare l’indice in più livelli, detti **tiers**. L’idea è creare una stratificazione delle posting list:
- nel **tier 1** mettiamo i documenti più promettenti;
- nel **tier 2** mettiamo documenti meno forti, ma comunque potenzialmente utili;
- nei tier successivi mettiamo documenti via via meno importanti.
![[Pasted image 20260518121617.png|462]]
- prendo il tier 1
- se qualche termine non ha sufficienti documenti nel tier 1
- analizzo anche la tier 2 e prendo quel numero di documenti
-  questa importanza può essere determinata da $g(d)$, dal peso del termine nel documento o da un’altra misura utile al ranking
Quindi il sistema non parte subito dall'intera posting list, ma prova prima a lavorare sulla parte più importante dell’indice. Solo se questa parte non è sufficiente, amplia la ricerca
##### impact ordered posting
- non vogliamo calcolare gli score per tutti i documenti, ma solo per quelli in cui un termine ha un peso abbastanza grande
- sfruttare la weighted term frequency
$$wf_{t,d} = 1 + \log(tf_{t,d})$$

$tf_{t,d} > 0$
- ordiniamo le posting basandoci su questo $wf_{t,d}$
Questa scelta ha un vantaggio: i documenti più promettenti per quel termine vengono analizzati prima. 
- Però ha anche una conseguenza importante: le posting list non condividono più un ordinamento comune. Ogni termine ha un proprio ordinamento, perché il peso $wf_{t,d}$​ cambia da termine a termine
	- non è più possibile attraversare tutte le posting list in parallelo
	- si passa ad un approccio term-at-a-time
	- si processa un termine alla volta e si accumulano progressivamente i punteggi dei documenti
###### Early termination
- prima tecnica collegata all'impact ordered posting
- Con l’early termination si attraversa solo un prefisso della posting list ordinata per impatto, fermandosi dopo $r$ documenti o quando il peso del termine diventa troppo basso
Questa è una tecnica efficiente, ma generalmente **non-safe**, perché un documento ignorato potrebbe comunque ottenere un buon punteggio
###### Ordino le posting dei termini per idf
analizzare prima i termini con idf più alto: sono quelli che probabilmente contribuiscono di più allo score finale e permettono di individuare prima i documenti più promettenti
- idf: Termini rari in tutta la collezione hanno idf alto ovvero più informativi
processando prima i termini con idf più alto, il sistema concentra il calcolo sui documenti più promettenti, cioè quelli associati ai termini più informativi della query
- L’obiettivo è ridurre il costo computazionale mantenendo una recall sufficientemente alta, cioè cercando di non eliminare troppi documenti che potrebbero essere rilevanti
- la **recall** dipende dai **falsi negativi**
###### Compromesso
Quindi il compromesso è:
- più pruning → meno costo computazionale
- più pruning → maggiore rischio di perdere documenti rilevanti
- meno pruning → più garanzie di qualità, ma costo maggiore
#### Safe vs non safe ranking
- vogliamo ridurre il numero di documenti da valutare completamente, ma mantenendo la garanzia di ottenere davvero i top $K$
- un metodo safe non trova semplicemente “un sottoinsieme con i top”; trova un modo per scartare documenti solo quando è garantito che non possano superare la soglia della top $K$. Gli score completi vengono calcolati solo per i documenti non scartati
##### Scoring Wand
- con la tecnica Scoring Wand il sistema ragiona sui documenti uno alla volta, provando a capire se un certo documento può avere uno score abbastanza alto da meritare il calcolo completo
- per evitare calcoli inutili e rimanere safe scartando i documenti che con una garanzia matematica non possono rientrare nella top $K$ fa questo:
	- mantengo una soglia corrente, cioè lo score del $K$-esimo miglior documento trovato finora
	- per ogni nuovo documento candidato, calcolo un limite superiore massimo teorico del punteggio che potrebbe ottenere
	- se anche nel caso migliore quel documento non può superare la soglia, lo scarto
	- se invece potrebbe superarla, allora calcolo il suo score completo
nel WAND, le posting list devono essere attraversabili in ordine crescente di docID, perché l’algoritmo usa i docID correnti dei vari termini per decidere quali documenti possono essere saltati
- si assume che esista un iteratore speciale capace di saltare al primo docID maggiore o uguale a un certo valore $X$
###### Finger e upper bound
Per ogni termine della query, l’algoritmo mantiene un puntatore, chiamato nelle slide **finger**, dentro la posting list di quel termine
- il finger punta al successivo docID di quella posting list che deve ancora essere processato
	- tutti i precedenti sono stati processati oppure scartati
- per ogni termine t WAND mantiene anche un limite superiore detto $UB_t$ che rappresenta quanto al massimo può contribuire quel termine allo score di un determinato documento ancora non processato nella sua posting list a destra del finger
![[Pasted image 20260518131636.png|600]]
$UB_t$ è calcolato sui documenti ancora rimanenti nella posting list. 
Se procedo verso destra, sto eliminando dalla parte “ancora possibile” alcuni documenti. Il massimo tra i documenti rimanenti non può aumentare: può restare uguale o diminuire
$$UB_t = \max score_t(d)$$
###### Threshold e Pivoting
WAND mantiene anche una **threshold**, cioè una *soglia* corrente. Questa soglia corrisponde allo score del $K$-esimo miglior documento trovato finora
- se ho per ora selezionato 100 documenti, il successivo deve superare la threshold del 100esimo documento scelto
- dove il 100esimo è quello con score peggiore
Il **pivoting** è il meccanismo con cui WAND decide quali documenti possono essere scartati e su quale documento eventualmente calcolare lo score completo
- si ordinano i termini della query in base al docID attualmente puntato dai loro finger
- si sommano progressivamente gli upper bound dei termini in questo ordine
- ci si ferma quando la somma degli upper bound supera la threshold
- il docID del termine in cui ci si ferma diventa il **pivot**
fino a quel pivot, la somma massima teorica dei contributi diventa finalmente abbastanza alta da poter superare la soglia. Prima del pivot, invece, i documenti non hanno speranza di raggiungere la threshold **(hopeless)**
###### Esempio per capire UB
![[Pasted image 20260518134439.png|359]]
- andando avanti di finger al documento 589 $UB$ sarà uguale a 1.7
- andando verso destra nella posting list, UB può solo diminuire
###### Esempio completo con più documenti
![[Pasted image 20260518134841.png|391]]
![[Pasted image 20260518134826.png|484]]

Lo score reale di un documento viene calcolato combinando i contributi di tutti i termini della query presenti nel documento (ad esempio tramite cosine similarity o BM25).  
Questo calcolo può essere costoso, soprattutto quando i documenti candidati sono moltissimi.
Per questo WAND usa gli **upper bound (UB)**: invece di calcolare subito lo score completo, il sistema mantiene per ogni termine una stima del massimo contributo che quel termine può ancora dare ai documenti non processati.
Sommando gli upper bound dei termini della query, il sistema ottiene un massimo score teorico possibile.  
Se anche questo massimo teorico non supera la threshold corrente della top $K$, allora non vale la pena calcolare lo score completo del documento, che può essere scartato in modo safe.
Gli upper bound servono quindi a evitare moltissimi calcoli completi inutili

###### SAFENESS DI WAND
WAND è safe perché non elimina documenti “a intuito”. Elimina un documento solo quando la somma massima possibile dei contributi dei termini non può superare la threshold
significa che anche nel migliore scenario possibile non potrebbe entrare nella top $K$
- WAND non è specifico della cosine similarity. Può funzionare anche con BM25 o altre funzioni, purché lo score sia **additivo per termine**
- nei test, WAND può portare a una riduzione superiore al **90%** nel numero di score computation. Inoltre, i guadagni sono migliori per query più lunghe, perché con più termini ci sono più upper bound e più possibilità di dimostrare che certi documenti non possono superare la soglia
- WAND è più efficiente di una valutazione OR esaustiva delle posting list, perché evita di calcolare lo score completo per molti documenti che, pur contenendo termini della query, non possono entrare nella top $K$