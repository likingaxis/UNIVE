## interpolazione polinomiale

### Problema
data una funzione $f:[a,b]\to\mathbb{R}$ di cui sono noti i valori
$$
f(x_0),f(x_1),\ldots,f(x_n)
$$
negli $n+1$ punti distinti
$$
x_0,x_1,\ldots,x_n\in [a,b]
$$
si sceglie una classe $C$ di funzioni definite su $[a,b]$ a valori in $\mathbb{R}$
- una classe $C$ è un insieme di funzioni dentro cui cerchiamo la funzione che approssima $f$

si vuole approssimare la funzione $f(x)$ con una funzione $p:[a,b]\to\mathbb{R}$ che appartiene a $C$
e che nei punti $x_0,x_1,\ldots,x_n$ assume i valori
$$
f(x_0),f(x_1),\ldots,f(x_n)
$$
cioè vogliamo che valga
$$
p(x_i)=f(x_i)\qquad i=0,\ldots,n
$$
si vuole definire un problema ben posto ovvero un problema dove questa classe $C$ ha una e una sola funzione che soddisfa queste condizioni
useremo una classe $C$ che non è l’insieme di tutti i polinomi ma lo spazio vettoriale reale dei polinomi di grado $\leq n$
$$
C=\mathbb{R}_n[x]
$$
dove
$$
\mathbb{R}_n[x]=\{a_0+a_1x+a_2x^2+\ldots+a_nx^n: a_0,a_1,\ldots,a_n\in\mathbb{R}\}
$$
scegliendo $C$ dimostriamo il teorema 1.1
esiste un unico $p(x)\in\mathbb{R}_n[x]$ tale che
$$
p(x_i)=f(x_i)\qquad i=0,\ldots,n
$$
#### Teorema 1.1 precisato
siano
$$
(x_0,y_0),(x_1,y_1),\ldots,(x_n,y_n)\in\mathbb{R}^2
$$
tali che $x_0,x_1,\ldots,x_n$ sono tutti distinti
allora esiste un unico $p(x)\in\mathbb{R}_n[x]$ tale che
$$
p(x_i)=y_i\qquad i=0,\ldots,n
$$
mostriamo ora una figura nel caso $n=3$
$x_0,x_1,x_2,x_3$ possono anche essere non in ordine e le $y$ possono anche non essere distinte
infatti può succedere che
$$
y_0=y_2
$$
foto figura nel caso $n=3$: esiste un unico polinomio $p(x)\in\mathbb{R}_3[x]$ tale che
$$
p(x_0)=y_0,\qquad p(x_1)=y_1,\qquad p(x_2)=y_2,\qquad p(x_3)=y_3
$$
![[Pasted image 20260711120711.png]]

Abbiamo due dimostrazioni diverse per questo teorema
##### Dimostrazione 1
Osserviamo che un generico polinomio $p(x)$ in $\mathbb{R}_n[x]$ si scrive nella forma canonica
- forma standard con cui si scrivono i polinomi
$$
p(x)=a_0+a_1x+a_2x^2+\ldots+a_nx^n
$$
$p(x)$ soddisfa la condizione $p(x_i)=y_i$ per ogni $i=0,\ldots,n$
se e solo se è soddisfatto il seguente sistema
$$
\begin{cases}
a_0+a_1x_0+a_2x_0^2+\ldots+a_nx_0^n=y_0\\
a_0+a_1x_1+a_2x_1^2+\ldots+a_nx_1^n=y_1\\
a_0+a_1x_2+a_2x_2^2+\ldots+a_nx_2^n=y_2\\
\vdots\\
a_0+a_1x_n+a_2x_n^2+\ldots+a_nx_n^n=y_n
\end{cases}
$$
questo sistema lo scriviamo come matrice
abbiamo i coefficienti $a_0,a_1,\ldots,a_n$ che mettiamo come vettore colonna
poi abbiamo la matrice effettiva che sarebbe tutti $1$ per la prima colonna, poi $x_i$, poi $x_i^2$ e così via fino a $x_i^n$
tutto questo uguale al vettore dei valori noti $y_0,y_1,\ldots,y_n$
$$
\begin{pmatrix}
1 & x_0 & x_0^2 & \cdots & x_0^n\\
1 & x_1 & x_1^2 & \cdots & x_1^n\\
1 & x_2 & x_2^2 & \cdots & x_2^n\\
\vdots & \vdots & \vdots & & \vdots\\
1 & x_n & x_n^2 & \cdots & x_n^n
\end{pmatrix}
\begin{pmatrix}
a_0\\
a_1\\
a_2\\
\vdots\\
a_n
\end{pmatrix}
=
\begin{pmatrix}
y_0\\
y_1\\
y_2\\
\vdots\\
y_n
\end{pmatrix}
$$
questa matrice qui ha un simbolo detto
$$
V(x_0,x_1,\ldots,x_n)
$$
e si chiama matrice di Vandermonde sui nodi $x_0,x_1,\ldots,x_n$
quindi
$$
V(x_0,x_1,\ldots,x_n)=
\begin{pmatrix}
1 & x_0 & x_0^2 & \cdots & x_0^n\\
1 & x_1 & x_1^2 & \cdots & x_1^n\\
1 & x_2 & x_2^2 & \cdots & x_2^n\\
\vdots & \vdots & \vdots & & \vdots\\
1 & x_n & x_n^2 & \cdots & x_n^n
\end{pmatrix}
$$
vogliamo dimostrare che questa matrice sia invertibile ovvero che
$$
\det[V(x_0,x_1,\ldots,x_n)]\neq 0
$$
il determinante della matrice di Vandermonde è
$$
\det[V(x_0,\ldots,x_n)]
=
\begin{cases}
1 & \text{se } n=0\\
\displaystyle\prod_{\substack{i,j=0\\ j<i}}^n (x_i-x_j) & \text{se } n\geq 1
\end{cases}
$$
cioè per $n\geq 1$
$$
\det[V(x_0,\ldots,x_n)]
=
(x_1-x_0)(x_2-x_0)(x_2-x_1)\cdots(x_n-x_0)\cdots(x_n-x_{n-1})
$$
i nodi sono distinti quindi nessuno di questi termini della produttoria è $0$
quindi abbiamo determinante diverso da $0$
$$
\det[V(x_0,\ldots,x_n)]\neq 0
$$
e dunque la matrice di Vandermonde è invertibile perché per ipotesi tutti i nodi sono distinti

avendo un sistema lineare quadrato con matrice invertibile, esiste una unica soluzione

poiché $V$ è invertibile il sistema lineare ha una e una sola soluzione che è
$$
\begin{pmatrix}
a_0\\
a_1\\
a_2\\
\vdots\\
a_n
\end{pmatrix}
=
[V(x_0,\ldots,x_n)]^{-1}
\begin{pmatrix}
y_0\\
y_1\\
y_2\\
\vdots\\
y_n
\end{pmatrix}
$$
quindi portiamo a destra la matrice invertibile moltiplicando per $V^{-1}$
esiste un unico $p(x)\in\mathbb{R}_n[x]$ che soddisfa
$$
p(x_i)=y_i\qquad i=0,\ldots,n
$$
e inoltre $p(x)$ è dato da
$$
p(x)=a_0+a_1x+\ldots+a_nx^n
$$
con vettore dei coefficienti dato da
$$
\begin{pmatrix}
a_0\\
a_1\\
a_2\\
\vdots\\
a_n
\end{pmatrix}
=
[V(x_0,\ldots,x_n)]^{-1}
\begin{pmatrix}
y_0\\
y_1\\
y_2\\
\vdots\\
y_n
\end{pmatrix}
$$
ricordando che, dato un polinomio in quella forma, allora se i coefficienti sono unici allora anche il polinomio è unico

ora si vuole dimostrare che il determinante di $V$ è proprio quel determinante
la dimostrazione la facciamo per $n=3$ ma questo vale per $n\geq 1$
per $n=0$ la matrice ha determinante $1$ perché
$$
V(x_0)=(1)
$$
calcoliamo il determinante di $V(x_0,x_1,x_2,x_3)$
per ogni $i=1,\ldots,3$ definiamo $d_i$ come il determinante della matrice di Vandermonde fino al nodo $i$
$$
d_i=\det[V(x_0,\ldots,x_i)]
$$

calcoliamo $d_3$

$$
d_3=
\begin{vmatrix}
1 & x_0 & x_0^2 & x_0^3\\
1 & x_1 & x_1^2 & x_1^3\\
1 & x_2 & x_2^2 & x_2^3\\
1 & x_3 & x_3^2 & x_3^3
\end{vmatrix}
$$

creiamo degli $0$ nella riga per calcolare il determinante

sostituiamo una colonna con se stessa meno la colonna precedente moltiplicata per $x_3$

questa operazione non cambia il determinante

partendo dalla colonna più a destra facciamo

$$
C_4\leftarrow C_4-x_3C_3
$$

quindi

$$
d_3=
\begin{vmatrix}
1 & x_0 & x_0^2 & x_0^3-x_0^2x_3\\
1 & x_1 & x_1^2 & x_1^3-x_1^2x_3\\
1 & x_2 & x_2^2 & x_2^3-x_2^2x_3\\
1 & x_3 & x_3^2 & 0
\end{vmatrix}
$$

poi facciamo la stessa cosa sulla terza colonna

$$
C_3\leftarrow C_3-x_3C_2
$$

e otteniamo

$$
d_3=
\begin{vmatrix}
1 & x_0 & x_0^2-x_0x_3 & x_0^2(x_0-x_3)\\
1 & x_1 & x_1^2-x_1x_3 & x_1^2(x_1-x_3)\\
1 & x_2 & x_2^2-x_2x_3 & x_2^2(x_2-x_3)\\
1 & x_3 & 0 & 0
\end{vmatrix}
$$

poi facciamo la stessa cosa sulla seconda colonna

$$
C_2\leftarrow C_2-x_3C_1
$$

e otteniamo

$$
d_3=
\begin{vmatrix}
1 & x_0-x_3 & x_0(x_0-x_3) & x_0^2(x_0-x_3)\\
1 & x_1-x_3 & x_1(x_1-x_3) & x_1^2(x_1-x_3)\\
1 & x_2-x_3 & x_2(x_2-x_3) & x_2^2(x_2-x_3)\\
1 & 0 & 0 & 0
\end{vmatrix}
$$

ora che abbiamo questa matrice usiamo Laplace per calcolare il determinante lungo l’ultima riga

siccome l’unico elemento non nullo è il primo $1$, il segno è

$$
(-1)^3
$$

quindi

$$
d_3
=
(-1)^3
\begin{vmatrix}
x_0-x_3 & x_0(x_0-x_3) & x_0^2(x_0-x_3)\\
x_1-x_3 & x_1(x_1-x_3) & x_1^2(x_1-x_3)\\
x_2-x_3 & x_2(x_2-x_3) & x_2^2(x_2-x_3)
\end{vmatrix}
$$

estraiamo dalle righe gli scalari in comune

nella prima riga raccogliamo $x_0-x_3$

nella seconda riga raccogliamo $x_1-x_3$

nella terza riga raccogliamo $x_2-x_3$

quindi

$$
d_3
=
(-1)^3
(x_0-x_3)(x_1-x_3)(x_2-x_3)
\begin{vmatrix}
1 & x_0 & x_0^2\\
1 & x_1 & x_1^2\\
1 & x_2 & x_2^2
\end{vmatrix}
$$

la matrice a destra è proprio $d_2$

$$
d_2=
\begin{vmatrix}
1 & x_0 & x_0^2\\
1 & x_1 & x_1^2\\
1 & x_2 & x_2^2
\end{vmatrix}
$$

quindi

$$
d_3
=
(-1)^3
(x_0-x_3)(x_1-x_3)(x_2-x_3)d_2
$$

sono usciti $3$ fattori e il $(-1)^3$ lo possiamo applicare cambiando il verso di ogni fattore

infatti

$$
(-1)^3(x_0-x_3)(x_1-x_3)(x_2-x_3)
=
(x_3-x_0)(x_3-x_1)(x_3-x_2)
$$

quindi

$$
d_3=(x_3-x_0)(x_3-x_1)(x_3-x_2)d_2
$$

questa è una formula ricorsiva

allo stesso modo

$$
d_2=(x_2-x_0)(x_2-x_1)d_1
$$

e

$$
d_1=(x_1-x_0)
$$

infatti

$$
d_1=
\begin{vmatrix}
1 & x_0\\
1 & x_1
\end{vmatrix}
=
x_1-x_0
$$
e abbiamo che
$$
d_0=1
$$
quindi

$$
d_3
=
(x_3-x_0)(x_3-x_1)(x_3-x_2)d_2
$$

$$
=
(x_3-x_0)(x_3-x_1)(x_3-x_2)(x_2-x_0)(x_2-x_1)d_1
$$

$$
=
(x_3-x_0)(x_3-x_1)(x_3-x_2)(x_2-x_0)(x_2-x_1)(x_1-x_0)
$$

questa formula qui è proprio la produttoria vista prima

$$
\prod_{\substack{i,j=0\\j<i}}^3 (x_i-x_j)
$$

quindi abbiamo dimostrato che il calcolo del determinante è proprio questo nel caso $n=3$

nel caso generale si ottiene nello stesso modo

$$
d_n=\prod_{\substack{i,j=0\\j<i}}^n (x_i-x_j)
$$

cioè

$$
\det[V(x_0,\ldots,x_n)]
=
\prod_{\substack{i,j=0\\j<i}}^n (x_i-x_j)
$$

siccome i nodi sono distinti, tutti i fattori sono diversi da $0$
quindi il determinante è diverso da $0$ e la matrice di Vandermonde è invertibile
questo conclude la prima dimostrazione del teorema 1.1
