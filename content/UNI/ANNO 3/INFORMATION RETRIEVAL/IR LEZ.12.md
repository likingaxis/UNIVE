### Ridurre le matrici e ottenere uno spazio latente con topic
##### Rappresentazione geometrica
Nel Vector Space Model e ora nella LSI usiamo una matrice termine-documento rappresentare il peso di un termine per quel documento ad esempio la frequenza TF-IDF o altro
la matrice quindi sarà
$$A \in \mathbb{R}^{m \times n}$$
dove le righe sono i termini e le colonne sono i vari documenti
mi piacerebbe decomporre questa matrice per degli autovalori ma visto che la matrice è rettangolare e non quadrata devo usare la **SVD**
##### SVD
la *Singular Value Decomposition* che ci permette di fattorizzare una matrice $A$ $m \times n$ di rango $r$ facendola diventare
$$A = U \Sigma V^T$$
- $U$ è una matrice $m \times m$, rappresenta le **righe**
- $\Sigma$ è una matrice $m \times n$,  che in diagonale ha dei **valori singolari** $\sigma_1, \sigma_2, \dots, \sigma_r$, che permettono di ricostruire i valori della matrice
- $V$ è una matrice $n \times n$, quindi $V^T$ è la sua trasposta, descrive le **colonne** 
###### Low-rank approximation
Possiamo comprimere la matrice fattorizzata con SVD tenendo conto solo dei primi $k$ valori singolari ottenendo una matrice di low-rank 
$$
A_k = U_k\Sigma_k V_k^T
$$
Dopo la riduzione a $k$ dimensioni, **i termini e i documenti restano tutti presenti**, ma vengono rappresentati in uno spazio più piccolo
ricordiamo che $k \ll r$

###### Frobenius
utilizziamo la norma di Frobenius per dimostrare che l'approssimazione low-rank della matrice prodotta con SVD è la migliore possibile per quel determinato rango $k$ 
$$∥A−Ak​∥_F​$$
più $k$ è simile al rango effettivo più $A_k$ è simile ad $A$

spesso $k$ è compreso tra 100 e 300
![[Pasted image 20260521155903.png|525]]
##### Latent Semantic Indexing
tecnica di rappresentazione che sfrutta la SVD per rappresentare termini documenti e query in uno spazio latente con dimensionalità ridotta mediante approssimazioni
- le informazioni delle singole celle vengono poi definite dal rapporto che si fa tra i termini e i documenti per questo si dice latente
una matrice termine documento quindi si rappresenta così
$A = (U\Sigma^{1/2})(\Sigma^{1/2}V^T)$
- $U$ sono i termini che vengono prodotti per i valori singolari
- $V^T$ sono i documenti sempre prodotti per i valori singolari
e si possono rappresentare i termini e i documenti(dopo anche un ipotetico low-rank) come
- $T_k=U_k\Sigma_k^{1/2}$
- $D_k=\Sigma_k^{1/2}V_k^T$
La query invece viene rappresentata nello spazio LSI mediante folding-in
$$q_k = \Sigma_k^{-1} U_k^T$$
la query viene definita dai documenti già presenti nello spazio latente senza dove ricalcolare l'SVD
è possibile inoltre notare come termini che hanno rappresentazione latente simile tendono ad appartenere a un certo topic semantico
Questo nel caso di un recupero dei risultati potrebbe portare a una maggiore **recall** dovuta al fatto che includiamo anche documenti per sinonimia o polisemia ovvero quando due parole hanno significati simili o quando una stessa parola ha significati diversi
ma non un aumento della precision obbligatorio soprattutto perché esso dipende dal $k$ scelto
![[Pasted image 20260521164410.png|462]]
###### Come applicare Cosine Similarity alla rappresentazione con LSI
lo score LSI viene calcolato confrontando:
$$

q_k
\qquad\text{con}\qquad
D_k(d)
$$
questo per ogni documento $d$ effettuando la cosine similarity tra i due vettori 
$$\cos(q_k,d_k)=\frac{q_k \cdot d_k}{\|q_k\|\|d_k\|}$$
##### Formula dell'energia
serve a misurare quanta “energia” o informazione complessiva viene catturata dalle prime $k$ componenti
Questa formula è utile per scegliere $k$. Per esempio posso dire: scelgo $k$ in modo da conservare almeno il 90% o il 95% dell’energia
$$\frac{\sum_{i=1}^{k}\sigma_i^2}{\sum_i \sigma_i^2}$$

L’**energia** misura quanto una componente latente contribuisce a ricostruire la matrice originale
