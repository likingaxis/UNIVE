
## Clustering e Community Detection
Il **clustering** ha l’obiettivo di dividere un insieme di oggetti in gruppi, detti **cluster**, in modo che gli oggetti nello stesso gruppo siano simili tra loro.

### Definizione del problema di clustering
Abbiamo un insieme `U` di `n` oggetti: $p_1, p_2, ..., p_n$
Per ogni coppia di oggetti $p_i, p_j$ è definita una funzione distanza: $$distance(p_i, p_j)$$Questa distanza misura quanto due oggetti sono diversi.

Proprietà della funzione distanza

![[Pasted image 20260706181208.png]]

Una soluzione possibile è una **k-partizione** di `U`, cioè una divisione di `U` in `k` cluster, la quale deve rispettare due proprietà:
- i cluster non si sovrappongono;
- l’unione di tutti i cluster restituisce l’intero insieme `U`.

>[!tip] Spesso però il valore di `k` non è noto in anticipo e viene scelto in modo empirico.

### Spacing tra cluster
Dato un clustering, lo **spacing** tra due cluster è la *distanza minima tra una coppia di punti appartenenti ai due cluster*.

L’obiettivo è ottenere cluster ben separati, per questo vogliamo ***massimizzare il minimo spacing tra cluster***.

### Formulazione come problema di ottimizzazione
Un problema di ottimizzazione è definito da:
- insieme delle istanze;
- insieme delle soluzioni ammissibili;
- costo di una soluzione;
- obiettivo: massimizzare o minimizzare il costo.

Nel nostro caso:
- l’istanza è data dagli oggetti, dalla funzione distanza e dal valore `k`;
- le soluzioni ammissibili sono tutte le possibili k-partizioni;
	- è molto grande, serve un algoritmo efficiente
- il costo è il minimo spacing tra coppie di cluster;
- l’obiettivo è massimizzare questo minimo spacing.

### Trasformazione in grafo completo pesato
Il problema può essere visto come un problema su grafi.
Costruiamo un grafo completo pesato:
- ogni oggetto diventa un nodo;
- ogni coppia di nodi è collegata da un arco;
- il peso dell’arco è la distanza tra i due oggetti.

#### Algoritmo basato su MST
Un modo per risolvere il problema è usare il **Minimum Spanning Tree**.

L’idea è:
1. costruire il grafo completo pesato;
2. calcolare un MST del grafo (albero che tocca tutti i nodi la cui somma degli archi è minima);
3. ordinare gli archi dell’MST in ordine decrescente di peso;
4. rimuovere i `k-1` archi più pesanti;
5. le componenti connesse rimanenti sono i `k` cluster.
###### Intuizione sulla correttezza
Il teorema afferma che la k-partition ottenuta rimuovendo i `k-1` archi più pesanti dell’MST è un clustering di spacing massimo.
- L’intuizione è che, se esistesse un clustering migliore, dovrebbe separare due punti che nell’MST sono collegati da archi più leggeri rispetto a quelli rimossi.
	- Ma questo produrrebbe uno spacing minore, quindi non sarebbe migliore.


## Community Detection
Nella **community detection** non sempre abbiamo una metrica precisa tra gli oggetti.
Inoltre, un nodo può anche appartenere a più comunità.

Quindi il problema è più flessibile rispetto al clustering classico.
L’obiettivo è trovare gruppi di nodi che rappresentano comunità nella rete.


Nelle reti sociali, un concetto importante è la **edge betweenness**.
- La betweenness di un arco misura quanto quell’arco è importante per collegare parti diverse della rete.
	- È definita come il numero di cammini minimi che passano su quell’arco.

Un arco con alta betweenness spesso collega due comunità diverse.
- Quindi rimuovere archi con alta betweenness può aiutare a separare le comunità.

### Algoritmo di Girvan-Newman
L’algoritmo di **Girvan-Newman** usa la edge betweenness per trovare comunità.

Funziona così:
1. calcola la edge betweenness di ogni arco;
2. elimina l’arco con betweenness maggiore;
3. ricalcola la edge betweenness nel grafo modificato;
4. elimina di nuovo l’arco con valore massimo;
5. ripete il processo.

Ogni rimozione può separare il grafo in componenti più piccole.

Il risultato può essere rappresentato come una struttura gerarchica, cioè un albero di cluster a diversi livelli.
![[Pasted image 20260706181124.png]]