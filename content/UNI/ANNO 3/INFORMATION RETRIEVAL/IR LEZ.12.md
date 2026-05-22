### Latent Semantic Indexing
- useremo tecniche di dimensionalità per trasformare una cosa sparsa in una cosa densa
- questa lezione è di inciso della lezione 11
##### Ripassino di geometria
[[Ripasso geometria]]
Fin qui abbiamo parlato soprattutto di matrici quadrate.
Ma nel Vector Space Model e nella LSI usiamo una matrice termine-documento:
$$A \in \mathbb{R}^{m \times n}$$
dove:
- le righe sono i termini;
- le colonne sono i documenti;
- ogni cella rappresenta il peso di un termine in un documento, ad esempio frequenza, TF-IDF o altro peso.
Questa matrice di solito è rettangolare, non quadrata.
Quindi non posso applicare direttamente la decomposizione agli autovalori vista prima.
Per questo si usa la **Singular Value Decomposition**, abbreviata in **SVD**.
Se $A$ è una matrice $m \times n$ di rango $r$, allora esiste una fattorizzazione:
$$A = U \Sigma V^T$$
- $U$ è una matrice $m \times m$, rappresenta le righe
- $\Sigma$ è una matrice $m \times n$, i valori singolari, ovvero i valori che consentono di ricostruire la matrice
- $V$ è una matrice $n \times n$, quindi $V^T$ è la sua trasposta, descrive le colonne 
Le colonne di $U$ sono gli autovettori ortogonali di $AA^T$, mentre le colonne di $V$ sono gli autovettori ortogonali di $A^TA$. I valori sulla diagonale di $\Sigma$ sono i **valori singolari** $\sigma_1, \sigma_2, \dots, \sigma_r$, ordinati in modo decrescente.
##### Low rank matrix approximation
se vogliamo comprimere la matrice, possiamo tenere solo i primi $k$ valori singolari e mettere a zero gli altri. In questo modo otteniamo una matrice approssimata detta di low-rank:
$$A_k = U \, \mathrm{diag}(\sigma_1, \dots, \sigma_k, 0, \dots, 0)V^T$$
Invece di usare tutta la matrice $A$, scegliamo una versione compressa di rango $k$, con $k \ll r$
Dopo la riduzione a $k$ dimensioni, **i termini e i documenti restano tutti presenti**, ma vengono rappresentati in uno spazio più piccolo

###### vicinanza con la matrice originale
si vuole misurare tramite un sistema di norma di Frobenius la vicinanza di una matrice $A$ da una sua approssimazione con low-rank $A_k$ vedendo l'errore complessivo tra due celle delle due matrici
- la SVD produce la miglior approssimazione possibile di rango $k$ rispetto alla norma di Frobenius
	- abbiamo il minimo errore possibile per $k$ valori singolari tenuti
La matrice approssimata può anche essere vista come somma di matrici di rango 1:
$$A_k = \sum_{i=1}^{k} \sigma_i u_i v_i^T$$
dove ogni termine della somma rappresenta una componente della matrice originale
Man mano che $i$ cresce, i valori singolari tendono a diminuire, quindi il contributo delle componenti successive diventa meno rilevante
![[Pasted image 20260521155903.png|525]]

info sul rango
Se abbiamo una matrice termine-documento con $m$ termini e $n$ documenti, il rango massimo è:
$r \leq \min(m,n)$
Quindi, se per esempio abbiamo $m = 50000$ termini e $n = 10$ milioni di documenti, il rango non può superare $50000$
##### Latent Semantic Indexing
rappresenta una tecnica di rappresentazione che sfrutta la SVD per rappresentare termini documenti e query in uno spazio semantico latente a dimensionalità ridotta
“Latente” significa che il significato non è rappresentato direttamente come parola o etichetta, ma emerge indirettamente dai rapporti tra termini e documenti
- nella formula vista in precedenza della rappresentazione della matrice intera $S$ , quella davvero strutturata con termini documenti e pesi tf-idf
	- abbiamo che 
	- $U$ può essere visto come il lato dei **termini**
	- $V^T$ come il lato dei **documenti**
	- $\Sigma$ contiene i **valori singolari**, cioè i pesi delle dimensioni latenti
- viene sfruttata la SVD con low rank a k
Con LSI, termini e documenti non sono più rappresentati nello spazio originale, dove ogni dimensione corrispondeva a una parola. Vengono invece rappresentati in uno spazio di dimensione $k$, detto **spazio semantico latente**
- è detto latente perchè grazie all'SVD 
termini come “laptop”, “portable”, “computer” e “display” possono finire vicini perché appartengono allo stesso contesto semantico
![[Pasted image 20260521161841.png|489]]
nello spazio originale “Laptop” e “Portable” sono assi distinti, mentre nello spazio LSI diventano punti o direzioni dentro un sistema di coordinate nuovo. In questo nuovo spazio, un documento può essere vicino a un termine anche se nel vettore originale quel termine non compariva direttamente
###### Densità della LSI dopo la SVD
La matrice originale termine-documento è spesso sparsa, perché ogni documento contiene solo pochi termini del vocabolario. Dopo la SVD, invece, le celle vengono ricostruite come combinazioni di componenti latenti, quindi possono comparire valori non nulli anche dove prima c’erano zeri
Un modo utile di vedere la LSI è separare la decomposizione in due parti:
$$A = U \Sigma V^T$$​
e riscriverla, concettualmente, come:
$$A = (U\Sigma^{1/2})(\Sigma^{1/2}V^T)$$
Questa forma serve a dare una rappresentazione simmetrica a termini e documenti nello stesso spazio latente. La prima parte può essere vista come rappresentazione dei termini, la seconda come rappresentazione dei documenti
Quindi, se voglio capire quanto un termine è collegato a un documento, posso confrontare il vettore del termine con il vettore del documento nello spazio latente, per esempio tramite prodotto scalare. Se il prodotto scalare è alto, significa che quel termine e quel documento sono vicini nello spazio latente
“prendiamo il vettore del termine laptop e lo moltiplichiamo per il vettore del documento 3”: non sto controllando solo se la parola “laptop” appare letteralmente nel documento 3, ma sto stimando quanto il documento 3 sia vicino semanticamente alla direzione latente associata a quel termine
che poi ridotta a $k$ dimensioni sarebbe
$A_k = U_k \Sigma_k V_k^T$
##### Mapping delle query
Se $q$ è il vettore della query nello spazio originale dei termini, la sua rappresentazione nello spazio LSI è:
$q_k = \Sigma_k^{-1} U_k^T$ 
Le slide dicono che ogni riga e colonna di $A$ viene mappata nello spazio LSI a $k$ dimensioni, e che anche la query $q$ viene mappata nello stesso spazio. Inoltre, dopo questa trasformazione, la query non è più sparsa come nel modello vettoriale classico
Serve a prendere una **query scritta nello spazio originale dei termini** e trasformarla nello **spazio latente LSI** a $k$ dimensioni
se la query contiene solo due parole, per esempio “dog” e “friends”, il vettore query ha valori non nulli solo su quelle due dimensioni. In LSI, invece, la query viene proiettata nello spazio latente e diventa una combinazione delle dimensioni latenti. Quindi può attivare anche concetti collegati indirettamente ai termini originali
LSI può essere vista anche come una forma di **query expansion globale**: non espande la query usando un thesaurus esterno come WordNet, ma sfrutta le associazioni presenti nell'intera collezione
![[Pasted image 20260521164410.png|462]]

Il vantaggio principale della LSI è che prova a correggere alcuni limiti del Vector Space Model, in particolare **sinonimia** e **polisemia**
- **sinonimia**, quando parole diverse hanno significati simili, come “car” e “automobile”;
- **polisemia**, quando la stessa parola può avere significati diversi, come “saturn” pianeta o “Saturn” marca/azienda
Dal punto di vista del retrieval, ci si aspetta spesso un miglioramento della **recall**, perché il sistema può recuperare documenti anche quando non condividono esattamente le stesse parole della query. La precisione, invece, non migliora sempre in modo netto: le slide riportano risultati sperimentali in cui LSI può essere leggermente migliore del Vector Space Model classico, ma anche che la scelta della dimensionalità $k$ è delicata
Non è adatta a esprimere richieste del tipo:
```scss
fiat volkswagen NOT ford
```
oppure condizioni rigide del tipo “trova documenti che parlano di queste cinque aziende”


- **full-text search** con indice inverso e modelli come BM25;
- rappresentazioni dense, oggi spesso ottenute con modelli neurali come BERT o altri embedding model;
- tecniche di **reranking**, in cui un primo sistema recupera candidati e un secondo modello li riordina.
Quindi LSI non è necessariamente la tecnica più usata oggi nella sua forma classica, ma è fondamentale per capire il passaggio concettuale: dal matching lessicale puro alla rappresentazione semantica vettoriale
#### Vero e proprio ranking
poi per fare il vero e proprio ranking si può applicare la cosine similarity
Una volta che ho:
$q_k$
e per ogni documento ho:
$d_{1,k}, d_{2,k}, d_{3,k}, \dots$
posso calcolare la similarità tra query e documenti.
Di solito si usa:
$\cos(q_k,d_k)$
cioè la **cosine similarity**, oppure un prodotto scalare, a seconda della formulazione.
La cosine similarity misura quanto due vettori puntano nella stessa direzione:
$$\cos(q_k,d_k)=\frac{q_k \cdot d_k}{\|q_k\|\|d_k\|}$$
Se il valore è alto, vuol dire che query e documento sono vicini nello spazio latente




sigma sono i valori singolari sono gli autovalori con la radice ma sono gli autovalori della trasposta
le due matrici vengono confrontate facendo la sommatoria sugli esercizi
le componenti intende le informazioni latenti?
Come viene raccontato un documento
la matrice originale ha dellle informazioni
immaginiamo uno spazio con 3 dimensioni
applicando una trasformazione tipo una rotazione
il punto 0 non è più 0 
l'informazione varia conviene comunque calcolare con frobenius
non conviene usare la formula iniziale con le sommatorie, potremmo comunque ipotizzare male l'ottimo
per trovare l'ottimo devo comunque calcolarmeli tutti
k spesso è sempre compreso tra 100-1000
