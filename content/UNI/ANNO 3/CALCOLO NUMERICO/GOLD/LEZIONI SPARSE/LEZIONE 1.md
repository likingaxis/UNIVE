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
#### Teorema 1.1 
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
##### Dimostrazione 2
definiamo questi polinomi di Lagrange
per ogni $j=0,\ldots,n$
$$
L_j(x)=\prod_{\substack{i=0\\i\neq j}}^n \frac{x-x_i}{x_j-x_i}
$$
cioè
$$
L_j(x)=
\frac{(x-x_0)\cdots(x-x_{j-1})(x-x_{j+1})\cdots(x-x_n)}
{(x_j-x_0)\cdots(x_j-x_{j-1})(x_j-x_{j+1})\cdots(x_j-x_n)}
$$
togliamo il caso $i=j$ perché altrimenti nel denominatore avremmo
$$
x_j-x_j=0
$$
e quindi la frazione non sarebbe definita
al numeratore abbiamo
$$
(x-x_0)\cdots(x-x_{j-1})(x-x_{j+1})\cdots(x-x_n)
$$
mentre al denominatore abbiamo
$$
(x_j-x_0)\cdots(x_j-x_{j-1})(x_j-x_{j+1})\cdots(x_j-x_n)
$$
gli $n+1$ polinomi sono
$$
L_0(x),L_1(x),\ldots,L_n(x)
$$
sotto abbiamo delle costanti, perché i nodi $x_0,\ldots,x_n$ sono fissati
sopra abbiamo $n$ fattori perché non mettiamo il caso in cui $i=j$
quindi ogni $L_j(x)$ ha grado $n$, perché moltiplichiamo $n$ fattori di grado $1$
il termine di grado massimo viene dal prodotto delle $x$ presenti nei vari fattori, quindi otteniamo un termine con $x^n$
per questo i polinomi $L_j(x)$ hanno grado $n$ e quindi appartengono a $\mathbb{R}_n[x]$
vogliamo dimostrare che questi polinomi formano una base di $\mathbb{R}_n[x]$
quindi vogliamo dimostrare che
$$
L_0(x),L_1(x),\ldots,L_n(x)
$$
sono una base di $\mathbb{R}_n[x]$

>[!info]- cosa è una base?
>
> una base di $\mathbb{R}_n[x]$ è un insieme di elementi $v_1(x),\ldots,v_r(x)$ appartenenti a $\mathbb{R}_n[x]$ tali che:
> - sono linearmente indipendenti
> 	- cioè l’unica combinazione lineare $\alpha_1v_1(x)+\cdots+\alpha_rv_r(x)$ che coincide con il polinomio nullo è quella con tutti i coefficienti uguali a $0$
> - generano $\mathbb{R}_n[x]$
> 	- cioè ogni polinomio $q(x)\in\mathbb{R}_n[x]$ si può scrivere come combinazione lineare
>
> $$
> q(x)=\beta_1v_1(x)+\cdots+\beta_rv_r(x)
> $$
>
> se abbiamo uno spazio vettoriale, tutte le sue basi hanno lo stesso numero di elementi, detto dimensione dello spazio vettoriale
>
> una base canonica di $\mathbb{R}_n[x]$ è
>
> $$
> 1,x,x^2,\ldots,x^n
> $$
>
> questa base ha $n+1$ elementi, quindi
>
> $$
> \dim(\mathbb{R}_n[x])=n+1
> $$
>
> ogni polinomio di $\mathbb{R}_n[x]$ si può scrivere come
>
> $$
> p(x)=a_0+a_1x+a_2x^2+\cdots+a_nx^n
> $$
>
> in questa dimostrazione, al posto della base canonica $1,x,x^2,\ldots,x^n$, vogliamo usare come base i polinomi $L_0(x),L_1(x),\ldots,L_n(x)$

nel caso della nostra dimostrazione vogliamo dimostrare che queste $L_j(x)$ sono una base di $\mathbb{R}_n[x]$
per farlo ci avvaliamo di questo fatto:
se si hanno $n+1$ elementi in uno spazio vettoriale di dimensione $n+1$, come $\mathbb{R}_n[x]$, allora questi elementi sono una base dello spazio se e solo se sono linearmente indipendenti
visto che
$$
L_0(x),L_1(x),\ldots,L_n(x)
$$
sono $n+1$ polinomi e
$$
\dim(\mathbb{R}_n[x])=n+1
$$
per dimostrare che sono una base di $\mathbb{R}_n[x]$ ci basta dimostrare che sono linearmente indipendenti
per ogni $i,j=0,\ldots,n$ vale la proprietà fondamentale
$$
L_j(x_i)=
\begin{cases}
1 & \text{se } i=j\\
0 & \text{se } i\neq j
\end{cases}
$$
nella formula della produttoria usiamo l’indice $k$ invece dell’indice $i$, per evitare confusione con il nodo $x_i$ in cui stiamo valutando
quindi scriviamo
$$
L_j(x)=\prod_{\substack{k=0\\k\neq j}}^n \frac{x-x_k}{x_j-x_k}
$$

e valutiamo in $x_i$

$$
L_j(x_i)=\prod_{\substack{k=0\\k\neq j}}^n \frac{x_i-x_k}{x_j-x_k}
$$

questa proprietà vale $0$ quando $i\neq j$ perché nella produttoria compare il fattore con $k=i$

infatti, se $i\neq j$, allora $k=i$ è ammesso nella produttoria perché stiamo escludendo solo $k=j$

quindi al numeratore compare

$$
x_i-x_i=0
$$

mentre il denominatore non si annulla, perché è

$$
x_j-x_i
$$

e questo è diverso da $0$ dato che i nodi sono distinti e $i\neq j$

quindi

$$
L_j(x_i)=0 \qquad \text{se } i\neq j
$$

invece, se $i=j$, otteniamo

$$
L_j(x_j)=\prod_{\substack{k=0\\k\neq j}}^n \frac{x_j-x_k}{x_j-x_k}=1
$$

perché ogni fattore della produttoria è uguale a $1$

ora dimostriamo che $L_0(x),\ldots,L_n(x)$ sono linearmente indipendenti

supponiamo che

$$
\alpha_0L_0(x)+\alpha_1L_1(x)+\cdots+\alpha_nL_n(x)=0
$$

per ogni $x\in\mathbb{R}$

allora in particolare posso valutare questa uguaglianza nei nodi $x_i$, con $i=0,\ldots,n$

quindi

$$
0=\alpha_0L_0(x_i)+\alpha_1L_1(x_i)+\cdots+\alpha_nL_n(x_i)
$$

per la proprietà vista prima, tutti i termini si annullano tranne quello con indice $i$

rimane

$$
0=\alpha_iL_i(x_i)
$$

ma

$$
L_i(x_i)=1
$$

quindi

$$
0=\alpha_i
$$

questo vale per ogni $i=0,\ldots,n$, quindi tutti i coefficienti sono uguali a $0$

$$
\alpha_0=\alpha_1=\cdots=\alpha_n=0
$$

quindi $L_0(x),\ldots,L_n(x)$ sono linearmente indipendenti

sono linearmente indipendenti perché l’unica combinazione lineare che dà il polinomio nullo è quella con tutti i coefficienti uguali a $0$

visto che sono $n+1$ polinomi linearmente indipendenti in uno spazio di dimensione $n+1$, allora sono una base di $\mathbb{R}_n[x]$

- a che ci serve dire che sono base di $\mathbb{R}_n[x]$?
	- ci serve perché così sappiamo che ogni polinomio di $\mathbb{R}_n[x]$ si può scrivere in modo unico come combinazione lineare di $L_0(x),\ldots,L_n(x)$
	- in particolare, questa cosa ci servirà per dimostrare l’unicità del polinomio interpolante

definiamo quindi

$$
p(x)=y_0L_0(x)+y_1L_1(x)+\cdots+y_nL_n(x)
$$

con

$$
p(x)\in\mathbb{R}_n[x]
$$

infatti $p(x)$ è combinazione lineare di polinomi che stanno in $\mathbb{R}_n[x]$, quindi anche $p(x)$ resta in $\mathbb{R}_n[x]$

vogliamo quindi ora dimostrare che sia soddisfatta la proprietà

$$
p(x_i)=y_i
$$

per ogni $i=0,\ldots,n$

sfruttiamo la proprietà vista prima

$$
p(x_i)=y_0L_0(x_i)+y_1L_1(x_i)+\cdots+y_nL_n(x_i)
$$

rimane solo il termine con indice $i$

$$
p(x_i)=y_iL_i(x_i)
$$

ma

$$
L_i(x_i)=1
$$

quindi

$$
p(x_i)=y_i
$$

quindi esiste un polinomio $p(x)\in\mathbb{R}_n[x]$ che soddisfa la condizione di interpolazione

ora dobbiamo dimostrare l’unicità

- cosa si intende per unicità?
	- significa che non può esistere un altro polinomio diverso da $p(x)$, sempre in $\mathbb{R}_n[x]$, che assume gli stessi valori $y_i$ negli stessi nodi $x_i$

supponiamo che $q(x)\in\mathbb{R}_n[x]$ sia un altro polinomio tale che

$$
q(x_i)=y_i
$$

per ogni $i=0,\ldots,n$

siccome $q(x)$ è un polinomio in $\mathbb{R}_n[x]$ e sappiamo che $L_0(x),L_1(x),\ldots,L_n(x)$ sono una base di $\mathbb{R}_n[x]$, allora posso scrivere $q(x)$ come combinazione lineare degli elementi della base

quindi esistono $\beta_0,\beta_1,\ldots,\beta_n\in\mathbb{R}$ tali che

$$
q(x)=\beta_0L_0(x)+\beta_1L_1(x)+\cdots+\beta_nL_n(x)
$$

allora per ogni $i=0,\ldots,n$ abbiamo

$$
y_i=q(x_i)=\beta_0L_0(x_i)+\beta_1L_1(x_i)+\cdots+\beta_nL_n(x_i)
$$

per la proprietà dei polinomi di Lagrange rimane solo

$$
y_i=\beta_iL_i(x_i)
$$

ma

$$
L_i(x_i)=1
$$

quindi

$$
y_i=\beta_i
$$

visto che $\beta_i=y_i$ per ogni $i=0,\ldots,n$, allora

$$
q(x)=y_0L_0(x)+y_1L_1(x)+\cdots+y_nL_n(x)
$$

questo però è proprio $p(x)$, quindi

$$
q(x)=p(x)
$$

quindi abbiamo dimostrato l’unicità del polinomio interpolante

##### Definizione
siano
$$
(x_0,y_0),\ldots,(x_n,y_n)\in\mathbb{R}^2
$$
con $x_0,\ldots,x_n$ punti distinti
l’unico polinomio $p(x)\in\mathbb{R}_n[x]$ che soddisfa la condizione
$$
p(x_i)=y_i \qquad i=0,\ldots,n
$$
si chiama polinomio d’interpolazione dei dati
$$
(x_0,y_0),\ldots,(x_n,y_n)
$$
oppure polinomio d’interpolazione dei valori $y_0,\ldots,y_n$ sui nodi $x_0,\ldots,x_n$
la prima dimostrazione del teorema precedente ci dice che $p(x)$ si scrive in forma canonica come
$$
p(x)=a_0+a_1x+a_2x^2+\cdots+a_nx^n
$$
questa si chiama forma canonica di $p(x)$
attenzione: non è la forma di Lagrange, è la forma canonica
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
dove $V(x_0,\ldots,x_n)$ è la matrice di Vandermonde sui nodi $x_0,\ldots,x_n$
la seconda dimostrazione ci dà invece la forma di Lagrange, che è molto più facile da scrivere perché usa direttamente i valori $y_0,\ldots,y_n$
$$
p(x)=y_0L_0(x)+y_1L_1(x)+\cdots+y_nL_n(x)
$$
dove per ogni $j=0,\ldots,n$
$$
L_j(x)=\prod_{\substack{i=0\\i\neq j}}^n \frac{x-x_i}{x_j-x_i}
$$
e $L_j(x)$ si chiama $j$-esimo polinomio di Lagrange relativo ai nodi $x_0,\ldots,x_n$
se gli $y_i$ sono i valori nei punti $x_i$ di una funzione $f:[a,b]\to\mathbb{R}$, cioè se
$$
y_i=f(x_i)
$$
per ogni $i=0,\ldots,n$, allora $p(x)$ si chiama anche polinomio d’interpolazione della funzione $f(x)$ sui nodi $x_0,\ldots,x_n$
domanda orale
cosa è per definizione il polinomio di interpolazione della funzione $f(x)$ sui nodi $x_0,\ldots,x_n$?
è l’unico polinomio $p(x)\in\mathbb{R}_n[x]$ che soddisfa la condizione
$$
p(x_i)=f(x_i)
$$
per ogni $i=0,\ldots,n$