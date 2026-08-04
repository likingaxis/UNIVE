#### Matrici irriducibili

Ripasso rapido su definizione di grafo.

Un grafo è un diagramma formato da un certo numero di nodi e da un certo numero di archi.

Un arco è una freccia che va da un nodo a un altro in modo orientato.

Se il grafo possiede $n$ nodi, essi vengono denotati con

$$
1,\ldots,n
$$

l’arco che va da $i$ a $j$ viene denotato con

$$
i\to j
$$

Un cammino all’interno di un grafo è un percorso che parte da un nodo $i$ e arriva a un nodo $j$ seguendo gli archi del grafo.

Se il nodo di arrivo $j$ coincide con il nodo di partenza $i$, allora il cammino si chiama anche ciclo.

- un grafo è fortemente connesso se vale una delle seguenti due condizioni equivalenti:
	- 1. per ogni coppia di nodi $i$ e $j$ esiste un cammino nel grafo che va da $i$ a $j$
	- 2. esiste un ciclo nel grafo che tocca tutti i nodi

Ex: dimostrare l’equivalenza, quindi che $1\Longleftrightarrow 2$.

![[Pasted image 20260715111953.png]]

Il grafo a sinistra è fortemente connesso.

Il grafo a destra non è fortemente connesso, perché per esempio dal nodo $3$ non posso raggiungere il nodo $1$.

##### Definizione di grafo associato a una matrice

Data una certa matrice

$$
A\in\mathbb{C}^{n\times n}
$$

il grafo associato ad $A$ è il grafo così definito:

- i nodi sono $1,2,\ldots,n$
- gli archi sono le frecce $i\to j$ tali che

$$
a_{ij}\neq 0
$$

quindi nel grafo di $A$ metto una freccia da $i$ a $j$ se e solo se l’elemento della matrice in posizione $(i,j)$ è diverso da zero.

Definizione: $A\in\mathbb{C}^{n\times n}$ si dice irriducibile se il suo grafo associato è fortemente connesso.

Quindi:

$$
A \text{ irriducibile}
\Longleftrightarrow
\text{il grafo associato ad } A \text{ è fortemente connesso}
$$

#### Localizzazione degli autovalori

Indichiamo con

$$
\mathcal{C}(z_0,r)=\{z\in\mathbb{C}: |z-z_0|\leq r\}
$$

il cerchio in $\mathbb{C}$ di centro $z_0\in\mathbb{C}$ e raggio $r\geq 0$.

Ricordiamo che

$$
|z-z_0|
$$

è la distanza tra $z$ e $z_0$.

Quindi $\mathcal{C}(z_0,r)$ è l’insieme di tutti i punti del piano complesso che distano da $z_0$ al massimo $r$.

![[Pasted image (9).png|378]]

Diamo ora una definizione.

Data

$$
A\in\mathbb{C}^{n\times n}
$$

i cerchi di Gershgorin di $A$ sono i cerchi

$$
K_1,\ldots,K_n
$$

definiti nel modo seguente.

Per ogni $i=1,\ldots,n$,

$$
K_i=\mathcal{C}\left(a_{ii},\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|\right)
$$

quindi $K_i$ è il cerchio con:

- centro $a_{ii}$
- raggio

$$
\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|
$$

cioè la somma dei moduli degli elementi della riga $i$-esima, escluso l’elemento diagonale.

I cerchi $K_1,\ldots,K_n$ si chiamano anche cerchi di Gershgorin per riga di $A$.

Esistono anche i cerchi di Gershgorin per colonna, indicati con

$$
H_1,\ldots,H_n
$$

In questo caso, per ogni colonna $j$, si prende centro $a_{jj}$ e raggio dato dalla somma dei moduli degli elementi della colonna $j$-esima, escluso l’elemento diagonale:

$$
H_j=\mathcal{C}\left(a_{jj},\sum_{\substack{i=1\\i\neq j}}^n |a_{ij}|\right)
$$

attenzione: per i cerchi per colonna fisso la colonna $j$ e sommo sugli indici di riga $i$.

#### Teorema 3.3 primo teorema di Gershgorin

Gli autovalori di una matrice

$$
A\in\mathbb{C}^{n\times n}
$$

stanno tutti nell’unione dei cerchi di Gershgorin di $A$.

Cioè, se $\lambda$ è un autovalore di $A$, allora

$$
\lambda\in K_1\cup K_2\cup\cdots\cup K_n
$$

questo si dice localizzazione degli autovalori, perché abbiamo identificato una regione del piano complesso dentro cui stanno tutti gli autovalori.

Dim

sia $\lambda$ un autovalore di $A$.

Mostriamo che $\lambda$ appartiene ad almeno un cerchio di Gershgorin di $A$, e quindi sta nell’unione dei cerchi.

Siccome $\lambda$ è autovalore, esiste un autovettore corrispondente

$$
u\neq 0
$$

tale che

$$
Au=\lambda u
$$

Due vettori sono uguali se e solo se sono uguali componente per componente, quindi

$$
Au=\lambda u
$$

equivale a dire

$$
(Au)_i=(\lambda u)_i
$$

per ogni $i=1,\ldots,n$.

Ma

$$
(Au)_i=\sum_{j=1}^n a_{ij}u_j
$$

e

$$
(\lambda u)_i=\lambda u_i
$$

quindi

$$
\sum_{j=1}^n a_{ij}u_j=\lambda u_i
$$

per ogni $i=1,\ldots,n$.

Scegliamo l’indice $i_0\in\{1,\ldots,n\}$ tale che $u_{i_0}$ sia una componente di modulo massimo, cioè

$$
|u_{i_0}|=\max\{|u_1|,\ldots,|u_n|\}
$$

siccome $u\neq 0$, almeno una componente di $u$ è diversa da zero, quindi

$$
|u_{i_0}|>0
$$

Ora prendiamo l’equazione corrispondente all’indice $i_0$:

$$
\sum_{j=1}^n a_{i_0j}u_j=\lambda u_{i_0}
$$

separiamo dalla sommatoria il termine con $j=i_0$:

$$
a_{i_0i_0}u_{i_0}+\sum_{\substack{j=1\\j\neq i_0}}^n a_{i_0j}u_j=\lambda u_{i_0}
$$

portiamo il termine diagonale dall’altra parte:

$$
(\lambda-a_{i_0i_0})u_{i_0}
=
\sum_{\substack{j=1\\j\neq i_0}}^n a_{i_0j}u_j
$$

ora facciamo il modulo di entrambi i membri:

$$
|\lambda-a_{i_0i_0}||u_{i_0}|
=
\left|
\sum_{\substack{j=1\\j\neq i_0}}^n a_{i_0j}u_j
\right|
$$

usiamo la disuguaglianza triangolare:

$$
\left|
\sum_{\substack{j=1\\j\neq i_0}}^n a_{i_0j}u_j
\right|
\leq
\sum_{\substack{j=1\\j\neq i_0}}^n |a_{i_0j}u_j|
$$

e siccome

$$
|a_{i_0j}u_j|=|a_{i_0j}||u_j|$$
otteniamo

$$
|\lambda-a_{i_0i_0}||u_{i_0}|
\leq
\sum_{\substack{j=1\\j\neq i_0}}^n |a_{i_0j}||u_j|
$$

ma $|u_{i_0}|$ è il massimo tra i moduli delle componenti di $u$, quindi

$$
|u_j|\leq |u_{i_0}|
$$

per ogni $j$.

Allora

$$
\sum_{\substack{j=1\\j\neq i_0}}^n |a_{i_0j}||u_j|
\leq
\sum_{\substack{j=1\\j\neq i_0}}^n |a_{i_0j}||u_{i_0}|
$$

portiamo fuori $|u_{i_0}|$:

$$
|\lambda-a_{i_0i_0}||u_{i_0}|
\leq
|u_{i_0}|\sum_{\substack{j=1\\j\neq i_0}}^n |a_{i_0j}|
$$

siccome $|u_{i_0}|>0$, possiamo semplificare:

$$
|\lambda-a_{i_0i_0}|
\leq
\sum_{\substack{j=1\\j\neq i_0}}^n |a_{i_0j}|
$$

ma $a_{i_0i_0}$ è il centro del cerchio $K_{i_0}$ e

$$
\sum_{\substack{j=1\\j\neq i_0}}^n |a_{i_0j}|
$$

è il suo raggio.

Quindi

$$
|\lambda-a_{i_0i_0}|\leq r_{i_0}
$$

cioè $\lambda$ dista dal centro $a_{i_0i_0}$ una quantità minore o uguale al raggio.

Dunque

$$
\lambda\in K_{i_0}
$$

e quindi $\lambda$ sta nell’unione dei cerchi di Gershgorin.

#### Teorema 3.4 secondo teorema di Gershgorin

Supponiamo che l’unione di $k$ cerchi di Gershgorin di $A$ sia disgiunta dall’unione degli altri $n-k$ cerchi.

Allora $k$ autovalori di $A$ stanno nella prima unione e $n-k$ autovalori stanno nella seconda unione.

Esempio:

poniamo di avere $n=3$ e supponiamo che due cerchi siano uniti tra loro, mentre uno sia separato dagli altri.

Allora nell’unione dei due cerchi stanno $2$ autovalori, mentre nel cerchio isolato sta $1$ autovalore.

Gli autovalori sono sempre contati con molteplicità algebrica.

#### Teorema 3.5 terzo teorema di Gershgorin(forte)

supponiamo che

$$
A\in\mathbb{C}^{n\times n}
$$

sia irriducibile.

Allora i punti che stanno sul bordo di quei cerchi di Gershgorin a cui appartengono, ma non sul bordo di tutti i cerchi, non sono autovalori di $A$.

Questo teorema serve per escludere certi punti dai possibili autovalori.

Il prof ha detto che si accontenta che sappiamo definire l’enunciato del teorema.

Spieghiamo bene la frase:

“punti che stanno sul bordo di quei cerchi di Gershgorin a cui appartengono”.

Prendiamo un punto $z\in\mathbb{C}$.

Questo punto può:
- non appartenere a nessun cerchio;
- appartenere a un solo cerchio;
- appartenere a più cerchi.

Il teorema forte guarda solo i cerchi a cui $z$ appartiene.

Per ogni cerchio $K_i$ che contiene $z$, il punto $z$ deve stare sul bordo di quel cerchio, cioè

$$
z\in\partial K_i
$$

Quindi non basta dire “$z$ sta sul bordo di un cerchio”.

Bisogna dire:

se $z$ appartiene a certi cerchi, allora in tutti quei cerchi deve stare sul bordo, non dentro.

Poi il teorema chiede anche un’altra cosa: $z$ non deve stare sul bordo di tutti i cerchi di Gershgorin.

Quindi il teorema dice:

se $A$ è irriducibile e un punto $z$ sta sul bordo di tutti i cerchi a cui appartiene, ma non sta sul bordo di tutti i cerchi complessivi, allora $z$ non può essere un autovalore.

Esempio semplice.

Supponiamo di avere tre cerchi $K_1,K_2,K_3$.

Caso 1:

$$
z\in K_1,\qquad z\notin K_2,\qquad z\notin K_3
$$

e inoltre

$$
z\in\partial K_1
$$

Allora $z$ sta sul bordo di tutti i cerchi a cui appartiene, perché appartiene solo a $K_1$ e lì sta sul bordo.

Però $z$ non sta sul bordo di tutti i cerchi, perché non sta sul bordo di $K_2$ e $K_3$.

Quindi, se $A$ è irriducibile, $z$ non può essere autovalore.

Caso 2:

$$
z\in K_1\cap K_2
$$

e

$$
z\in\partial K_1,\qquad z\in\partial K_2
$$

ma $z$ non sta sul bordo di $K_3$.

Allora $z$ sta sul bordo di tutti i cerchi a cui appartiene, ma non sul bordo di tutti i cerchi.

Quindi, se $A$ è irriducibile, $z$ non può essere autovalore.

Caso 3:

$$
z\in K_1\cap K_2
$$

ma

$$
z\in\partial K_1
$$

e $z$ è interno a $K_2$.

Allora il terzo teorema forte non si applica, perché $z$ appartiene a $K_2$, ma non sta sul bordo di $K_2$.

Quindi in questo caso non possiamo escludere $z$ con questo teorema.

Caso 4:

$$
z\in\partial K_1\cap\partial K_2\cap\partial K_3
$$

cioè $z$ sta sul bordo di tutti i cerchi.

Allora il teorema forte non lo esclude.

Attenzione: non vuol dire che $z$ sia sicuramente autovalore.

Vuol dire solo che questo teorema non basta per escluderlo.

![[Pasted image (12).png]]

Nella foto l’idea è questa: se un punto rosso sta sul bordo dei cerchi a cui appartiene, ma non sul bordo di tutti i cerchi del sistema, allora, nel caso di matrice irriducibile, quel punto non può essere autovalore.

Se invece il punto rosso fosse sul bordo di tutti i cerchi, il terzo teorema forte non permetterebbe di escluderlo.

#### Teorema 3.6 Terzo teorema di Gershgorin(debole)

supponiamo che

$$
A\in\mathbb{C}^{n\times n}
$$

sia irriducibile e sia $B$ il bordo dell’unione dei cerchi di Gershgorin.

Allora i punti di $B$ che non stanno sul bordo di tutti i cerchi non sono autovalori di $A$.

Cioè:

$$
z\in B
$$

e $z$ non sta sul bordo di tutti i cerchi

$$
\Longrightarrow
z \text{ non è autovalore di } A
$$

Perché questa versione è più debole?

Perché guarda solo i punti che stanno sul bordo dell’unione dei cerchi.

Invece il teorema forte può escludere anche punti che stanno dentro l’unione dei cerchi, purché stiano sul bordo dei cerchi a cui appartengono.

In questo esempio qua sotto nessun punto del bordo esterno può essere autovalore di $A$, se $A$ è irriducibile e se quei punti non stanno sul bordo di tutti i cerchi.

![[Pasted image (13).png|312]]

- recap di come si definisce una matrice irriducibile:
	- costruisco il grafo associato ad $A$
	- i nodi sono $1,\ldots,n$
	- metto una freccia $i\to j$ se $a_{ij}\neq 0$
	- $A$ è irriducibile se questo grafo è fortemente connesso

Osservazione 3.1.

Gli autovalori di una matrice

$$
A\in\mathbb{C}^{n\times n}
$$

e della sua trasposta

$$
A^T
$$

coincidono, perché i polinomi caratteristici di $A$ e $A^T$ coincidono.

Infatti

$$
C_{A^T}(\lambda)
=
\det(\lambda I-A^T)
$$

ma

$$
\lambda I-A^T=(\lambda I-A)^T
$$

quindi

$$
C_{A^T}(\lambda)
=
\det((\lambda I-A)^T)
$$

e siccome

$$
\det(M^T)=\det(M)
$$

otteniamo

$$
C_{A^T}(\lambda)=\det(\lambda I-A)=C_A(\lambda)
$$

Quindi $A$ e $A^T$ hanno gli stessi autovalori.

Di conseguenza, possiamo applicare i teoremi di Gershgorin non solo ad $A$ ma anche ad $A^T$, per ottenere localizzazioni migliori degli autovalori di $A$.

Applicando il primo teorema di Gershgorin ad $A$, otteniamo i cerchi per riga

$$
K_1,\ldots,K_n
$$

e sappiamo che gli autovalori stanno in

$$
K_1\cup\cdots\cup K_n
$$

Applicando il primo teorema di Gershgorin ad $A^T$, otteniamo i cerchi di Gershgorin per riga di $A^T$.

Ma le righe di $A^T$ sono le colonne di $A$, quindi questi sono proprio i cerchi di Gershgorin per colonna di $A$, che chiamiamo

$$
H_1,\ldots,H_n
$$

Quindi gli autovalori di $A$ stanno anche in

$$
H_1\cup\cdots\cup H_n
$$

Perciò gli autovalori di $A$ stanno nell’intersezione delle due localizzazioni:

$$
(K_1\cup\cdots\cup K_n)\cap(H_1\cup\cdots\cup H_n)
$$

Questa localizzazione è in generale più precisa, perché intersecare due regioni può solo restringere la zona in cui gli autovalori possono stare.

Osserviamo inoltre, in vista dell’applicazione del terzo teorema di Gershgorin, che una matrice $A$ è irriducibile se e solo se la sua trasposta $A^T$ è irriducibile.
Infatti, nel grafo di $A^T$ le frecce sono quelle del grafo di $A$ percorse al contrario.
Quindi, se nel grafo di $A$ esiste un ciclo che tocca tutti i nodi, allora nel grafo di $A^T$ esiste lo stesso ciclo percorso al contrario.
Per esempio, se nel grafo di $A$ c’è il ciclo
$$
1\to 2\to 4\to 3\to 4\to 1
$$
allora nel grafo di $A^T$ c’è il ciclo
$$
1\to 4\to 3\to 4\to 2\to 1
$$
quindi anche $A^T$ è irriducibile.
