### Matrice a diagonale dominante e a diagonale dominante in senso stretto

Sia $A\in\mathbb{C}^{n\times n}$ una matrice.

Si dice che $A$ è a diagonale dominante per righe se valgono queste due condizioni:

- 1.

$$
|a_{ii}|\geq \sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|
\qquad \forall i=1,\ldots,n
$$

cioè, in ogni riga, il modulo dell’elemento diagonale è maggiore o uguale della somma dei moduli degli elementi fuori diagonale.

Questa condizione si può interpretare con i cerchi di Gershgorin.

Ricordiamo che il cerchio $K_i$ ha centro $a_{ii}$ e raggio

$$
r_i=\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|
$$

quindi la condizione

$$
|a_{ii}|\geq r_i
$$

significa che la distanza del centro $a_{ii}$ dall’origine è maggiore o uguale del raggio del cerchio.

Infatti nel piano complesso il modulo

$$
|a_{ii}|
$$

è proprio la distanza di $a_{ii}$ dall’origine, cioè da $0$.

Questa condizione si esprime anche dicendo che nessun cerchio di Gershgorin di $A$ contiene lo $0$ al suo interno.

Attenzione: può succedere che $0$ stia sul bordo di qualche cerchio, perché abbiamo una disuguaglianza non stretta.

Infatti:

$$
|a_{ii}|=r_i
$$

vuol dire che la distanza di $0$ dal centro è esattamente uguale al raggio, quindi $0$ sta sul bordo del cerchio $K_i$.

![[Pasted image (16).png]]

- 2.

esiste almeno un indice $k\in\{1,\ldots,n\}$ tale che

$$
|a_{kk}|>\sum_{\substack{j=1\\j\neq k}}^n |a_{kj}|
$$

cioè almeno in una riga la disuguaglianza è stretta.

Questa condizione si esprime anche dicendo che esiste almeno un cerchio di Gershgorin di $A$ che non contiene lo $0$ nemmeno sul bordo.

Infatti se

$$
|a_{kk}|>r_k
$$

allora la distanza del centro $a_{kk}$ dall’origine è maggiore del raggio, quindi $0$ sta fuori dal cerchio $K_k$.

Quindi, riassumendo:

- la condizione 1 dice che $0$ non è interno a nessun cerchio;
- la condizione 2 dice che almeno un cerchio lascia $0$ completamente fuori.

Si dice invece che $A$ è a diagonale dominante in senso stretto per righe se

$$
|a_{ii}|>\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|
\qquad \forall i=1,\ldots,n
$$

cioè la disuguaglianza è stretta per tutte le righe.

In questo caso nessun cerchio di Gershgorin di $A$ contiene lo $0$, nemmeno sul bordo.

Per colonne specifichiamo invece che $A$ è a diagonale dominante per colonne se:

- 1.

$$
|a_{jj}|\geq \sum_{\substack{i=1\\i\neq j}}^n |a_{ij}|
\qquad \forall j=1,\ldots,n
$$

cioè, in ogni colonna, il modulo dell’elemento diagonale è maggiore o uguale della somma dei moduli degli elementi fuori diagonale della stessa colonna.

Questa condizione riguarda i cerchi di Gershgorin per colonna.

- 2.

esiste almeno un indice $k\in\{1,\ldots,n\}$ tale che

$$
|a_{kk}|>\sum_{\substack{i=1\\i\neq k}}^n |a_{ik}|
$$

cioè almeno in una colonna la disuguaglianza è stretta.

Si dice invece che $A$ è a diagonale dominante in senso stretto per colonne se

$$
|a_{jj}|>\sum_{\substack{i=1\\i\neq j}}^n |a_{ij}|
\qquad \forall j=1,\ldots,n
$$

#### Teorema 3.7

Supponiamo che la matrice $A\in\mathbb{C}^{n\times n}$ soddisfi almeno una delle seguenti condizioni:

1. $A$ è a diagonale dominante per righe e irriducibile;
2. $A$ è a diagonale dominante in senso stretto per righe;
3. $A$ è a diagonale dominante per colonne e irriducibile;
4. $A$ è a diagonale dominante in senso stretto per colonne.

Allora $A$ è invertibile.

Dimostriamo la prima ipotesi.

Supponiamo che $A$ sia a diagonale dominante per righe e irriducibile.

Vogliamo dimostrare che $A$ è invertibile.

Per farlo dimostriamo che $0$ non è autovalore di $A$, usando il terzo teorema di Gershgorin forte.

Ricordiamo che una matrice è invertibile se e solo se $0$ non è un suo autovalore.

Verifichiamo che $0$ soddisfa le ipotesi del terzo teorema di Gershgorin forte.

- $0$ sta sul bordo di quei cerchi di Gershgorin a cui appartiene.

Questo è vero per la condizione 1 della diagonale dominante per righe.

Infatti, per ogni $i$,

$$
|a_{ii}|\geq r_i
$$

dove

$$
r_i=\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|
$$

Quindi $0$ non può stare dentro nessun cerchio $K_i$.

Può solo stare fuori oppure sul bordo.

Se $0$ appartiene a un cerchio $K_i$, non può esserne interno, quindi deve stare per forza sul bordo.

- $0$ non sta sul bordo di tutti i cerchi.

Questo è vero per la condizione 2 della diagonale dominante per righe.

Infatti esiste almeno un indice $k$ tale che

$$
|a_{kk}|>r_k
$$

quindi $0$ sta fuori dal cerchio $K_k$, non sul bordo.

Quindi $0$ non sta sul bordo di tutti i cerchi.

- $A$ è irriducibile per ipotesi.

Sono quindi soddisfatte le ipotesi del terzo teorema di Gershgorin forte.

Perciò $0$ non è autovalore di $A$.

Quindi $A$ è invertibile.

$$
\square
$$

Dimostrazione della seconda ipotesi.

Supponiamo che $A$ sia a diagonale dominante in senso stretto per righe.

Allora per ogni $i=1,\ldots,n$ vale

$$
|a_{ii}|>\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|
$$

cioè

$$
|a_{ii}|>r_i
$$

dove $r_i$ è il raggio del cerchio di Gershgorin $K_i$.

Questo significa che la distanza di $0$ dal centro $a_{ii}$ è maggiore del raggio.

Quindi $0$ sta fuori da ogni cerchio di Gershgorin $K_i$.

Per il primo teorema di Gershgorin, tutti gli autovalori di $A$ stanno nell’unione dei cerchi:

$$
K_1\cup\cdots\cup K_n
$$

ma $0$ non appartiene a nessuno di questi cerchi, quindi $0$ non può essere autovalore di $A$.

Allora $A$ è invertibile.

$$
\square
$$

Dimostrazione della terza ipotesi.

Supponiamo che $A$ sia a diagonale dominante per colonne e irriducibile.

Dire che $A$ è a diagonale dominante per colonne equivale a dire che $A^T$ è a diagonale dominante per righe.

Infatti le colonne di $A$ diventano le righe di $A^T$.

Inoltre $A$ è irriducibile se e solo se $A^T$ è irriducibile.

Quindi $A^T$ è a diagonale dominante per righe e irriducibile.

Per la dimostrazione del caso 1, applicata ad $A^T$, otteniamo che $A^T$ è invertibile.

Ma

$$
\det(A^T)=\det(A)
$$

quindi se $A^T$ è invertibile, allora anche $A$ è invertibile.

$$
\square
$$

Dimostrazione della quarta ipotesi.

Supponiamo che $A$ sia a diagonale dominante in senso stretto per colonne.

Allora $A^T$ è a diagonale dominante in senso stretto per righe.

Per la dimostrazione del caso 2, applicata ad $A^T$, segue che $A^T$ è invertibile.

Ma

$$
\det(A^T)=\det(A)
$$

quindi anche $A$ è invertibile.

$$
\square
$$

Osservazione:

non possiamo usare sempre la versione debole del terzo teorema di Gershgorin, e questo viene spiegato con il seguente esempio.

![[Pasted image (17).png]]

La matrice dell’esempio è a diagonale dominante e irriducibile, e ha i cerchi di Gershgorin, sia per righe sia per colonne, mostrati in figura.

La versione debole del terzo teorema guarda solo i punti che stanno sul bordo dell’unione dei cerchi.

Il problema è che lo $0$ potrebbe non stare sul bordo esterno dell’unione dei cerchi, ma stare comunque sul bordo di alcuni cerchi interni.

In quel caso la versione debole non ci permette di escludere $0$ come autovalore.

Invece la versione forte sì, perché guarda i punti che stanno sul bordo dei cerchi a cui appartengono, anche se non sono necessariamente sul bordo esterno dell’unione.

Quindi, per dimostrare il caso “diagonale dominante e irriducibile”, serve davvero il terzo teorema di Gershgorin forte.

#### Norme Vettoriali

Consideriamo il seguente sistema lineare

$$
\begin{pmatrix}
8 & 1 & 1\\
1 & 5 & -1\\
1 & -1 & 5
\end{pmatrix}
\begin{pmatrix}
x_1\\
x_2\\
x_3
\end{pmatrix}
=
\begin{pmatrix}
26\\
7\\
7
\end{pmatrix}
$$

la cui soluzione è

$$
x=
\begin{pmatrix}
3\\
1\\
1
\end{pmatrix}
$$

Supponiamo di aver ottenuto le seguenti approssimazioni di $x$:

$$
y=
\begin{pmatrix}
2.99972\\
1.00023\\
1.00030
\end{pmatrix}
$$

e

$$
z=
\begin{pmatrix}
3.00027\\
0.99971\\
0.99955
\end{pmatrix}
$$

Come stabiliamo quale delle due è più vicina alla soluzione $x$?

Occorre un concetto di distanza sullo spazio dei vettori.

Misuriamo poi le distanze di $y$ da $x$ e di $z$ da $x$.

Chi ha la distanza minore è la migliore approssimazione.

###### Definizione informale di norma vettoriale

Una funzione

$$
\|\cdot\|:\mathbb{C}^n\to\mathbb{R}
$$

si dice norma vettoriale se soddisfa le seguenti proprietà:

a) positività

$$
\|x\|\geq 0
\qquad \forall x\in\mathbb{C}^n
$$

e

$$
\|x\|=0 \iff x=0
$$

b) omogeneità

$$
\|\alpha x\|=|\alpha|\|x\|
\qquad \forall \alpha\in\mathbb{C},\ \forall x\in\mathbb{C}^n
$$

c) disuguaglianza triangolare

$$
\|x+y\|\leq \|x\|+\|y\|
\qquad \forall x,y\in\mathbb{C}^n
$$

Se devo misurare la distanza tra due numeri reali o complessi, faccio la differenza e poi il modulo.

Allo stesso modo, data una norma vettoriale

$$
\|\cdot\|:\mathbb{C}^n\to\mathbb{R}
$$

definiamo la distanza tra due vettori $x,y\in\mathbb{C}^n$ come

$$
\|x-y\|
$$

###### Definiamo norme $1$, $2$ e infinito

Dato

$$
x=
\begin{pmatrix}
x_1\\
x_2\\
\vdots\\
x_n
\end{pmatrix}
\in\mathbb{C}^n
$$

definiamo:

norma $1$:

$$
\|x\|_1=|x_1|+|x_2|+\cdots+|x_n|
$$

norma $2$:

$$
\|x\|_2=\sqrt{|x_1|^2+|x_2|^2+\cdots+|x_n|^2}
$$

norma infinito:

$$
\|x\|_\infty=\max\{|x_1|,|x_2|,\ldots,|x_n|\}
$$

tutte queste rispettano le proprietà precedenti.

Le relative distanze sono definite nel modo seguente:

$$
\|x-y\|_1=
|x_1-y_1|+|x_2-y_2|+\cdots+|x_n-y_n|
$$

$$
\|x-y\|_2=
\sqrt{|x_1-y_1|^2+|x_2-y_2|^2+\cdots+|x_n-y_n|^2}
$$

$$
\|x-y\|_\infty=
\max\{|x_1-y_1|,|x_2-y_2|,\ldots,|x_n-y_n|\}
$$

Tornando all’esempio introduttivo, se calcoliamo la distanza dei vettori $y$ e $z$ dalla soluzione

$$
x=
\begin{pmatrix}
3\\
1\\
1
\end{pmatrix}
$$

usando la norma infinito, otteniamo

$$
x-y=
\begin{pmatrix}
0.00028\\
-0.00023\\
-0.00030
\end{pmatrix}
$$

quindi

$$
\|x-y\|_\infty=0.00030
$$

invece

$$
x-z=
\begin{pmatrix}
-0.00027\\
0.00029\\
0.00045
\end{pmatrix}
$$

quindi

$$
\|x-z\|_\infty=0.00045
$$

Quindi rispetto alla norma infinito il vettore $y$ è più vicino a $x$ rispetto al vettore $z$.

###### Equivalenza delle norme vettoriali

##### Teorema 3.8

Tutte le norme vettoriali in $\mathbb{C}^n$ sono equivalenti.

Questo significa che, se prendiamo due norme qualunque

$$
\|\cdot\|'
$$

e

$$
\|\cdot\|''
$$

su $\mathbb{C}^n$, allora esistono due costanti positive $\alpha,\beta>0$, indipendenti da $x$, tali che

$$
\alpha\|x\|''\leq \|x\|'\leq \beta\|x\|''
$$

per ogni

$$
x\in\mathbb{C}^n
$$

Verifichiamo che la norma $1$ e la norma infinito sono equivalenti.

Per ogni $x\in\mathbb{C}^n$ vale

$$
\|x\|_\infty\leq \|x\|_1\leq n\|x\|_\infty
$$

Infatti:

- $\|x\|_\infty\leq \|x\|_1$, perché il massimo dei moduli delle componenti è sicuramente minore o uguale della somma di tutti i moduli;

- $\|x\|_1\leq n\|x\|_\infty$, perché ogni componente soddisfa

$$
|x_i|\leq \|x\|_\infty
$$

quindi

$$
\|x\|_1=|x_1|+\cdots+|x_n|
\leq
\|x\|_\infty+\cdots+\|x\|_\infty
=
n\|x\|_\infty
$$

mettendo al centro la norma $1$, abbiamo

$$
\|x\|_\infty\leq \|x\|_1\leq n\|x\|_\infty
$$

quindi, se considero

$$
\|x\|'=\|x\|_1
$$

e

$$
\|x\|''=\|x\|_\infty
$$

allora le costanti del teorema sono

$$
\alpha=1,\qquad \beta=n
$$

perché

$$
1\cdot\|x\|_\infty\leq \|x\|_1\leq n\|x\|_\infty
$$

Se invece voglio mettere al centro la norma infinito, parto sempre da

$$
\|x\|_\infty\leq \|x\|_1\leq n\|x\|_\infty
$$

dalla seconda disuguaglianza ottengo

$$
\frac{1}{n}\|x\|_1\leq \|x\|_\infty
$$

quindi

$$
\frac{1}{n}\|x\|_1\leq \|x\|_\infty\leq \|x\|_1
$$

allora, se considero

$$
\|x\|'=\|x\|_\infty
$$

e

$$
\|x\|''=\|x\|_1
$$

le costanti sono

$$
\alpha=\frac{1}{n},\qquad \beta=1
$$

Questo spiega perché prima avevamo $\alpha=1,\beta=n$, mentre invertendo l’ordine delle norme otteniamo $\alpha=\frac{1}{n},\beta=1$.

In generale, dalla formula

$$
\alpha\|x\|''\leq \|x\|'\leq \beta\|x\|''
$$

possiamo anche isolare $\|x\|''$:

dalla parte destra

$$
\|x\|'\leq \beta\|x\|''
$$

otteniamo

$$
\frac{1}{\beta}\|x\|'\leq \|x\|''
$$

dalla parte sinistra

$$
\alpha\|x\|''\leq \|x\|'
$$

otteniamo

$$
\|x\|''\leq \frac{1}{\alpha}\|x\|'
$$

quindi

$$
\frac{1}{\beta}\|x\|'\leq \|x\|''\leq \frac{1}{\alpha}\|x\|'
$$

###### Successioni di vettori

Una successione di vettori

$$
x^{(0)},x^{(1)},x^{(2)},\ldots
$$

in $\mathbb{C}^n$ si dice convergente al vettore $x\in\mathbb{C}^n$ rispetto alla norma $\|\cdot\|$ se

$$
\|x^{(k)}-x\|\to 0
$$

per

$$
k\to+\infty
$$

Il teorema di equivalenza delle norme ci permette di dire che, poiché tutte le norme sono equivalenti in $\mathbb{C}^n$, se una successione di vettori converge a $x$ rispetto a una norma, allora converge a $x$ rispetto a tutte le norme.

Dimostrazione.

Supponiamo che

$$
x^{(k)}\to x
$$

rispetto alla norma $\|\cdot\|$.

Questo significa che

$$
\|x^{(k)}-x\|\to 0
$$

Sia $\|\cdot\|'$ un’altra norma.

Poiché le due norme sono equivalenti, esistono due costanti positive $\alpha,\beta>0$ tali che

$$
\alpha\|y\|\leq \|y\|'\leq \beta\|y\|
$$

per ogni $y\in\mathbb{C}^n$.

Sostituiamo

$$
y=x^{(k)}-x
$$

e otteniamo

$$
\alpha\|x^{(k)}-x\|
\leq
\|x^{(k)}-x\|'
\leq
\beta\|x^{(k)}-x\|
$$

Poiché

$$
\|x^{(k)}-x\|\to 0
$$

anche

$$
\alpha\|x^{(k)}-x\|\to 0
$$

e

$$
\beta\|x^{(k)}-x\|\to 0
$$

Per il teorema del confronto, o teorema dei carabinieri, otteniamo

$$
\|x^{(k)}-x\|'\to 0
$$

quindi

$$
x^{(k)}\to x
$$

anche rispetto alla norma $\|\cdot\|'$.

Una successione di vettori

$$
x^{(0)},x^{(1)},x^{(2)},\ldots
$$

in $\mathbb{C}^n$ si dice convergente componente per componente al vettore

$$
x=
\begin{pmatrix}
x_1\\
x_2\\
\vdots\\
x_n
\end{pmatrix}
$$

se, scrivendo

$$
x^{(k)}=
\begin{pmatrix}
x_1^{(k)}\\
x_2^{(k)}\\
\vdots\\
x_n^{(k)}
\end{pmatrix}
$$

vale

$$
x_i^{(k)}\to x_i
$$

per ogni

$$
i=1,\ldots,n
$$

cioè

$$
x_1^{(k)}\to x_1
$$

$$
x_2^{(k)}\to x_2
$$

$$
\vdots
$$

$$
x_n^{(k)}\to x_n
$$

equivalentemente,

$$
x_i^{(k)}-x_i\to 0
$$

per ogni $i=1,\ldots,n$.

Questo è equivalente a dire che

$$
\max_{i=1,\ldots,n}|x_i^{(k)}-x_i|\to 0
$$

ma

$$
\max_{i=1,\ldots,n}|x_i^{(k)}-x_i|
=
\|x^{(k)}-x\|_\infty
$$

quindi la convergenza componente per componente coincide con la convergenza rispetto alla norma infinito.

Allora, ricordando l’equivalenza di tutte le norme in $\mathbb{C}^n$, dire

$$
x^{(k)}\to x
$$

componente per componente è lo stesso che dire

$$
x^{(k)}\to x
$$

rispetto a una qualsiasi norma vettoriale.