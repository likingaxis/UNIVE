### Interpolazione polinomiale
##### Problema dietro il Polinomio di interpolazione $p(x)$
data una funzione $f:[a,b]\to\mathbb{R}$ di cui sono noti i valori
$$
f(x_0),f(x_1),\ldots,f(x_n)
$$
negli $n+1$ punti distinti
$$
x_0,x_1,\ldots,x_n\in [a,b]
$$
si sceglie una classe $C$ di funzioni definite su $[a,b]$ a valori in $\mathbb{R}$
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

scegliendo $C$ dimostriamo il teorema 1.1
esiste un unico $p(x)\in\mathbb{R}_n[x]$ tale che
$$
p(x_i)=f(x_i)\qquad i=0,\ldots,n
$$

##### Polinomio di interpolazione $p(x)$
è l’unico polinomio $p(x)\in\mathbb{R}_n[x]$ che soddisfa la condizione
$$
p(x_i)=f(x_i)
$$
per ogni $i=0,\ldots,n$

##### Polinomio in forma canonica
siano definite delle coppie di numeri
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
data da coefficienti e la variabile del polinomio 
questa si chiama forma canonica di $p(x)$

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
##### Polinomio in forma di Lagrange
la forma di Lagrange, che è molto più facile da scrivere perché usa direttamente i valori $y_0,\ldots,y_n$
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
#### TEOREMA 1.1
Siano $(x_0,y_0),(x_1,y_1),...,(x_n,y_n) \in \mathbb{R}^2$
Allora esiste un unico polinomio $p(x)\in \mathbb{R}_n[x]$ tale che $p(x_i)=f(x_i) \ \forall i=0,...,n$ 
##### Dimostrazione 1
Un polinomio $p(x)=a_0+a_1x+a_2x^2+...+a_nx^n \in \mathbb{R}_n[x]$
che soddisfa la proprietà per cui $p(x_i)=y_i$ $\forall i=0,...,n$ 
se e solo se
$$
\begin{cases}
a_0+a_1x_0+a_2x_0^2+\ldots+a_nx_0^n=y_0\\
a_0+a_1x_1+a_2x_1^2+\ldots+a_nx_1^n=y_1\\
a_0+a_1x_2+a_2x_2^2+\ldots+a_nx_2^n=y_2\\
\vdots\\
a_0+a_1x_n+a_2x_n^2+\ldots+a_nx_n^n=y_n
\end{cases}
$$
ha soluzione
scriviamo questo sistema come matrice con coefficienti come vettore colonna $$(a_0,a_1,...,a_n)^T$$
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
Questa matrice appena rappresentata è definita matrice di Vandermonde e viene descritta da $V(x_0,x_1,...,x_n)$

Si vuole dimostrare che questa matrice è invertibile con lo scopo di dimostrare che il polinomio descritto precedentemente è unico
il determinante della matrice di Vandermonde si calcola dalla seguente formula
$$
\det[V(x_0,\ldots,x_n)]
=
\begin{cases}
1 & \text{se } n=0\\
\displaystyle\prod_{\substack{i,j=0\\ j<i}}^n (x_i-x_j) & \text{se } n\geq 1
\end{cases}
$$
quindi $$
\det[V(x_0,\ldots,x_n)]
=
(x_1-x_0)(x_2-x_0)(x_2-x_1)\cdots(x_n-x_0)\cdots(x_n-x_{n-1})
$$
possiamo notare che tutti i termini della produttoria sono distinti tra loro quindi di conseguenza il prodotto risulta diverso da 0
quindi abbiamo determinante diverso da $0$
$$
\det[V(x_0,\ldots,x_n)]\neq 0
$$
dalla teoria sappiamo che se il determinante è $\neq 0$ allora la matrice è invertibile e di conseguenza il sistema lineare ha soluzione unica
che è
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

ora si vuole dimostrare che il determinante di $V$ è proprio 
$$
\det[V(x_0,\ldots,x_n)]
=
\begin{cases}
1 & \text{se } n=0\\
\displaystyle\prod_{\substack{i,j=0\\ j<i}}^n (x_i-x_j) & \text{se } n\geq 1
\end{cases}
$$
Dimostriamo nel caso $n=0$ e $n=3$ ma questo vale per un generico $n$
per $n=0$ la matrice ha determinante $1$ perché
$$
V(x_0)=(1)
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
vogliamo avere degli zeri sull'ultima riga quindi facciamo delle operazioni che non modificano il determinante
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
inoltre raccogliamo anche la colonna tutta a destra per $x_0$

poi facciamo la stessa cosa sulla seconda colonna

$$
C_2\leftarrow C_2-x_3C_1
$$

e otteniamo e raccogliamo anche
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
come segno associato alla posizione dell'ultimo 1 abbiamo
$(-1)^{i+j}$
Qui $i=4$$j=1$, quindi
$(-1)^{4+1}=(-1)^5$
lo scriviamo però come
$(-1)^3$
È la stessa cosa 
rimane il minore ottenuto eliminando quarta riga e prima colonna:
$$\begin{vmatrix} x_0-x_3 & x_0(x_0-x_3) & x_0^2(x_0-x_3)\\ x_1-x_3 & x_1(x_1-x_3) & x_1^2(x_1-x_3)\\ x_2-x_3 & x_2(x_2-x_3) & x_2^2(x_2-x_3) \end{vmatrix}$$
Qui si vede bene il motivo.
Nella **prima riga** tutti gli elementi hanno in comune il fattore
$x_0-x_3$
Infatti: 
$x_0-x_3=(x_0-x_3)\cdot 1$
Quindi dalla prima riga posso raccogliere $x_0-x_3$
Nella **seconda riga** raccolgo $x_1-x_3$
Nella **terza riga** raccolgo $x_2-x_3$
Quindi il determinante diventa portando fuori:
$$(x_0-x_3)(x_1-x_3)(x_2-x_3) \begin{vmatrix} 1 & x_0 & x_0^2\\ 1 & x_1 & x_1^2\\ 1 & x_2 & x_2^2 \end{vmatrix}$$
Ma questo determinante$3\times 3$ è proprio
$d_2=\det V(x_0,x_1,x_2)$

Perciò otteniamo:
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

corrisponde proprio alla produttoria
$$
\det[V(x_0,\ldots,x_n)]
=
\begin{cases}
1 & \text{se } n=0\\
\displaystyle\prod_{\substack{i,j=0\\ j<i}}^n (x_i-x_j) & \text{se } n\geq 1
\end{cases}
$$
nel caso n=3 
##### Dimostrazione 2
Dimostriamo l'unicità del polinomio mediante 
rappresentazione dei polinomi di Lagrange definiti come
$\forall j=0,...,n$ 
$$
L_j(x)=\prod_{\substack{i=0\\i\neq j}}^n \frac{x-x_i}{x_j-x_i}=\frac{(x-x_0)\cdots(x-x_{j-1})(x-x_{j+1})\cdots(x-x_n)}
{(x_j-x_0)\cdots(x_j-x_{j-1})(x_j-x_{j+1})\cdots(x_j-x_n)}
$$
togliamo il caso $i=j$ perché altrimenti nel denominatore avremmo
$$
x_j-x_j=0
$$
abbiamo quindi n+1 polinomi
vogliamo dimostrare che 
$L_0(x),...,L_n(x)\in base(\mathbb{R}_n(x))$

perché così ogni polinomio di grado al più $n$ si può scrivere come combinazione lineare di essi
andiamo quindi a dimostrare che 

n+1 elementi sono base di $\mathbb{R}_n[x]$ se e solo se sono linearmente indipendenti tra loro

dimostriamo che sono linearmente indipendenti tra loro

conosciamo la seguente proprietà dei polinomi di Lagrange:
$\forall i,j=0,...,n$ 
$$
L_j(x_i)=
\begin{cases}
1 & \text{se } i=j\\
0 & \text{se } i\neq j
\end{cases}
$$
supponiamo che ci sia la seguente combinazione lineare
$$
\alpha_0L_0(x)+\alpha_1L_1(x)+\cdots+\alpha_nL_n(x)=0
$$
definita per ogni $x\in\mathbb{R}$

allora possiamo valutare questa combinazione lineare per i nodi $x_i$ $\forall i=0,...,n$ 
quindi
$$
0=\alpha_0L_0(x_i)+\alpha_1L_1(x_i)+\cdots+\alpha_nL_n(x_i)
$$
per la proprietà definita sopra che vale 1 o 0 se i=j o i diverso da j abbiamo che tutti i termini si annullano eccetto quello in posizione i=j
rimane
$$
0=\alpha_iL_i(x_i)
$$
ma sappiamo che
$$
L_i(x_i)=1
$$
quindi rimane
$$
0=\alpha_i
$$
questo vale per ogni $i=0,\ldots,n$, quindi tutti i coefficienti sono uguali a $0$
$$
\alpha_0=\alpha_1=\cdots=\alpha_n=0
$$

tutti i coefficienti sono nulli, dunque i polinomi  $L_0(x),\ldots,L_n(x)$ sono linearmente indipendenti

perché l’unica combinazione lineare che dà il polinomio nullo è quella con tutti i coefficienti uguali a $0$

essendo linearmente indipendenti allora sono base di $\mathbb{R}_n[x]$

Poiché $L_0(x),\ldots,L_n(x)$ formano una base di $\mathbb{R}_n$ possiamo costruire un polinomio in $\mathbb{R}_n[x]$ come combinazione lineare di questi polinomi. 

L’idea è scegliere come coefficienti proprio i valori $y_0,\ldots,y_n$, perché ogni $L_j$​ vale $1$ nel proprio nodo $x_j$ e vale $0$ negli altri nodi

sia quindi $p(x)\in \mathbb{R}_n[x]$ polinomio interpolante definito come 
$$
p(x)=y_0L_0(x)+y_1L_1(x)+\cdots+y_nL_n(x)
$$
sappiamo che $p(x)\in \mathbb{R}_n[x]$ poiché è combinazione lineare di polinomi che stanno in $\mathbb{R}_n[x]$, quindi anche $p(x)$ resta in $\mathbb{R}_n[x]$

vogliamo dimostrare ora che 
$$
p(x_i)=y_i
$$
con la proprietà vista in precedenza rimane solo il termine con indice $i$
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

ora dimostriamo la sua unicità 
sia $q(x)\in\mathbb{R}_n[x]$ un altro polinomio t.c

$$
q(x_i)=y_i \ \forall i=0,...,n$$
siccome $q(x)$ è un polinomio in $\mathbb{R}_n[x]$ e sappiamo che $L_0(x),L_1(x),\ldots,L_n(x)$ sono una base di $\mathbb{R}_n[x]$, allora posso scrivere $q(x)$ come combinazione lineare degli elementi della base

quindi esistono $\beta_0,\beta_1,\ldots,\beta_n\in\mathbb{R}$ tali che
$$
q(x)=\beta_0L_0(x)+\beta_1L_1(x)+\cdots+\beta_nL_n(x)
$$
$\forall i=0,...,n$ sappiamo che per i nodi abbiamo

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
$$\square$$
#### Osservazione a pagina 6
una volta che hai trovato il polinomio $p(x)$ in **forma canonica**, i suoi coefficienti sono esattamente gli stessi che otterresti risolvendo il sistema con la matrice di Vandermonde
$$p(x)=a_0+a_1x+a_2x^2+\cdots+a_nx^n$$
per cui la matrice di Vandermonde è
$$\begin{pmatrix} a_0\\ a_1\\ \vdots\\ a_n \end{pmatrix} = \left[V(x_0,x_1,\dots,x_n)\right]^{-1} \begin{pmatrix} f(x_0)\\ f(x_1)\\ \vdots\\ f(x_n) \end{pmatrix}$$
dove $x_0,x_1,...,x_n$ sono i nodi di interpolazione
##### Errore o resto dell’interpolazione polinomiale
Dato il polinomio interpolante $p(x)$ di una funzione $f(x)$
sui nodi distinti $x_0,x_1,\ldots,x_n\in [a,b]$
si chiama **errore di interpolazione nel punto x** la quantità
$$f(x)-p(x)$$
Il Teorema 1.2 fornisce una formula esplicita per questo errore
#### TEOREMA 1.2
Sia $f:[a,b]\to\mathbb{R}$ una funzione di classe $C^{n+1}[a,b]$ e sia $p(x)$ il polinomio di interpolazione di $f(x)$ sugli $n+1$ nodi distinti $x_0,x_1,...,x_n \in [a,b]$ 
allora $\forall x \in [a,b]$ $\exists \  un \ punto \ \xi=\xi(x) \in (a,b)$ t.c
$$
f(x)-p(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)(x-x_1)\cdots(x-x_n)
$$
è l'errore di interpolazione nel punto $x$

##### Cosa vuol dire $C^{n+1}[a,b]$
Dire che $f\in C^{n+1}$ significa che $f$ è derivabile fino all’ordine $n+1$ e che tali derivate sono continue su $[a,b]$. Questa ipotesi è necessaria perché nella formula dell’errore compare la derivata $(n+1)$- esima della funzione
##### Dimostrazione
sia $x \in [a,b]$ un punto fissato
strutturo la dimostrazione in 2 casistiche separate
*Caso 1:*
se $x=x_i$ $\forall i=0,...,n$ allora
$f(x_i)-p(x_i)=0$ 
in questo caso $\forall \xi \in (a,b)$ si annullano entrambi i membri della formula
poiché compare il fattore  che azzera tutto il prodotto
$$
x_i-x_i=0
$$
*Caso 2:*
se $x \notin {x_0,x_1,...,x_n}$
definiamo delle funzioni ausiliarie $\forall y\in [a,b]$ 
$$
\pi(y)=(y-x_0)(y-x_1)\cdots(y-x_n)
$$
inoltre definiamo una funzione di resto tale che
$$
r(y)=f(y)-p(y)
$$
e sia inoltre $z:[a,b]\to\mathbb{R}$
$$
z(y)=r(y)-\frac{r(x)}{\pi(x)}\pi(y)
$$
questa funzione è di classe $C^{n+1}[a,b]$ poiché $r(y)$ è di quella classe e perché a sua volta $f(y)$ è di quella classe mentre
$p(y)$ e $\pi(y)$ sono di classe $C^\infty$
sappiamo che $z(y)$ si annulla in almeno n+2 punti di $[a,b]$ 
- per i nodi $x_0,...,x_n$  che sono $n+1$
- per il nodo x fissato che è $1$
per verificarlo basta sostituire questo nella formula di $z(y)$

Per il teorema di Rolle sappiamo che
Se una funzione si annulla in due punti consecutivi, allora tra questi due punti esiste almeno un punto in cui la derivata prima si annulla
Quindi, se $z(y)$ si annulla in almeno $n+2$ punti, allora $z'(y)$ si annulla in almeno $n+1$ punti.
applicando Rolle per la derivata  $(n+1)$ esima
$$
z^{(n+1)}(y)
$$
abbiamo che si annulla in almeno un punto $\xi \in (a,b)$ 
tale che 
$$
z^{(n+1)}(\xi)=0
$$
calcoliamo la derivata $z^{(n+1)}$
$$z^{(n+1)}(y)=r^{(n+1)}(y)-\frac{r(x)}{\pi(x)}\pi^{(n+1)}(y)$$

sappiamo che $r^{(n+1)}(y)$ è questo 
$$
r^{(n+1)}(y)=f^{(n+1)}(y)-p^{(n+1)}(y)
$$

dove $p(y)$ derivato $n+1$ volte si annulla perché ha grado al più $n$

$$
\pi(y)=(y-x_0)(y-x_1)\cdots(y-x_n)
$$
è un polinomio di grado $n+1$ ed è monico, cioè il coefficiente davanti a $y^{n+1}$ è $1$.

Infatti, se moltiplico tutti i termini principali dei fattori, ottengo
$$
y\cdot y\cdots y=y^{n+1}
$$

quindi
$$
\pi(y)=y^{n+1}+\text{termini di grado minore}
$$

![[Pasted image 20260728163027.png]]

facendo la derivata $(n+1)$-esima, tutti i termini di grado minore spariscono e rimane $y^{n+1}$ che derivato fa $(n+1)!$ 
$$
\pi^{(n+1)}(y)=(n+1)!
$$
quindi
$$
z^{(n+1)}(y)=f^{(n+1)}(y)-\frac{r(x)}{\pi(x)}(n+1)!
$$
quindi per $\xi$ abbiamo che 
$$
0=z^{(n+1)}(\xi)=f^{(n+1)}(\xi)-\frac{r(x)}{\pi(x)}(n+1)!
$$
portiamo a sinistra $r(x)/\pi(x)$ 
$$
\frac{r(x)}{\pi(x)}(n+1)!=f^{(n+1)}(\xi)
$$
moltiplicando per $\pi(x)$$/(n+1)!$
$$
r(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\pi(x)
$$
sappiamo però che
$$
r(x)=f(x)-p(x)
$$
e
$$
\pi(x)=(x-x_0)(x-x_1)\cdots(x-x_n)
$$
quindi otteniamo

$$
f(x)-p(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)(x-x_1)\cdots(x-x_n)
$$

che è proprio la formula dell’errore o resto dell’interpolazione polinomiale.
$$\square$$

##### Definizione dei coefficienti della forma di Newton
sia
$$
f:[a,b]\to\mathbb{R}
$$
si definiscono due casi:
- se $y\in[a,b]$, allora si definisce differenza divisa di $f(x)$ relativa a $y$ il numero
$$
f[y]=f(y)
$$
- se $y_1,\ldots,y_k\in[a,b]$ sono $k\geq 2$ punti distinti, si definisce differenza divisa di $f(x)$ relativa a $y_1,\ldots,y_k$ il numero
$$
f[y_1,\ldots,y_k]
=
\frac{f[y_1,\ldots,y_{k-2},y_k]-f[y_1,\ldots,y_{k-1}]}{y_k-y_{k-1}}
$$
questa definizione è ricorsiva perché per calcolare una differenza divisa con $k$ punti devo usare differenze divise calcolate con meno punti
nel caso $k=2$ otteniamo
$$
f[y_1,y_2]
=
\frac{f[y_2]-f[y_1]}{y_2-y_1}
=
\frac{f(y_2)-f(y_1)}{y_2-y_1}
$$
quindi nel caso di due punti la differenza divisa coincide con il rapporto incrementale di $f(x)$ relativo ai punti $y_1,y_2$
##### Polinomio in forma di Newton
Il polinomio in forma di Newton è definito dal seguente Teorema
#### TEOREMA 1.3
sia $f:[a,b]\to\mathbb{R}$ e siano $x_0,x_1,\ldots,x_n\in[a,b]$ nodi distinti
allora il polinomio di interpolazione di $f(x)$ su questi nodi è dato da
$$p(x)=f[x_0]+f[x_0,x_1](x-x_0)+f[x_0,x_1,x_2](x-x_0)(x-x_1)+\cdots+f[x_0,\ldots,x_n](x-x_0)\cdots(x-x_{n-1})$$

questa si chiama forma di Newton del polinomio di interpolazione $p(x)$
i coefficienti sono le differenze divise
$$
f[x_0],\ f[x_0,x_1],\ f[x_0,x_1,x_2],\ldots,\ f[x_0,\ldots,x_n]
$$
#### Corollario 1.1
sia $f:[a,b]\to\mathbb{R}$ e siano $x_0,x_1,\ldots,x_n\in[a,b]$ distinti
allora la differenza divisa $f[x_0,x_1,\ldots,x_n]$ non cambia se vengono permutati i suoi $n+1$ argomenti
$$
f[x_0,\ldots,x_n]=f[x_{\sigma(0)},\ldots,x_{\sigma(n)}]
$$
per ogni permutazione $\sigma$ di $\{0,\ldots,n\}$
##### Dimostrazione
Sia $\sigma$ sigma una qualsiasi permutazione di $\{0,\ldots,n\}$
Consideriamo il polinomio interpolante relativo ai nodi nell’ordine
$x_0,x_1,\ldots,x_n$
Nella forma di Newton esso si scrive come
$p(x) = f[x_0] + f[x_0,x_1](x-x_0) +\cdots+ f[x_0,\ldots,x_n](x-x_0)\cdots(x-x_{n-1})$
Adesso consideriamo gli stessi nodi, ma nell’ordine permutato
$x_{\sigma(0)},x_{\sigma(1)},\ldots,x_{\sigma(n)}$

Otteniamo ancora il medesimo polinomio interpolante, perché i dati interpolati sono gli stessi: cambiare l’ordine dei nodi non cambia le condizioni
$p(x_i)=f(x_i)$

Quindi anche nella forma di Newton rispetto all’ordine permutato si ha lo stesso polinomio $p(x)$, scritto però come
$$p(x) = f[x_{\sigma(0)}] + f[x_{\sigma(0)},x_{\sigma(1)}](x-x_{\sigma(0)}) +\cdots+ f[x_{\sigma(0)},\ldots,x_{\sigma(n)}] (x-x_{\sigma(0)})\cdots(x-x_{\sigma(n-1)})$$

Ora confrontiamo il coefficiente del termine di grado massimo, cioè il coefficiente di $x^n$

Nella prima scrittura, tutti i termini tranne l’ultimo hanno grado minore di $n$. L’ultimo termine è
$f[x_0,\ldots,x_n](x-x_0)\cdots(x-x_{n-1})$

Il prodotto $(x-x_0)\cdots(x-x_{n-1})$
è monico di grado $n$, quindi il coefficiente di $x^n$ è $f[x_0,\ldots,x_n]$

Nella seconda scrittura, allo stesso modo, il coefficiente di $x^n$ è $f[x_{\sigma(0)},\ldots,x_{\sigma(n)}]$

Poiché le due scritture rappresentano lo stesso polinomio $p(x)$, i coefficienti di $x^n$ devono coincidere. 

Pertanto
$f[x_0,\ldots,x_n] = f[x_{\sigma(0)},\ldots,x_{\sigma(n)}]$
Quindi la differenza divisa non dipende dall’ordine dei nodi
$$\square$$
##### Osservazione 1.1
ha senso parlare di forma di Newton del polinomio di interpolazione dei dati $(x_0,y_0),...,(x_n,y_n)$ anche quando non viene specificata alcuna funzione $f(x)$ t.c $f(x_i)=y_i$ $\forall i =0,...,n$ 
in questi casi qui è sufficiente immaginarsi una funzione che assume quei valori $y$ in quei nodi

Dati per supposizione i punti $(x_0,y_0),(x_1,y_1),...,(x_n,y_n) \in \mathbb{R}^2$
con $x_0,x_1,...,x_n$ distinti 
allora i numeri $y_0,y_1,...,y_n$ possono essere interpretati come valori in $x_0,x_1,...,x_n$ di una qualche funzione $f:[a,b]->\mathbb{R}$ definita su un qualche intervallo $[a,b]$ che contiene i punti $x_0,...,x_n$ 
##### Algoritmo di valutazione del polinomio d'interpolazione in un punto e il suo costo
sia $f:[a,b]\to\mathbb{R}$, siano
$x_0,\ldots,x_n\in[a,b]$
punti distinti e sia $t\in\mathbb{R}$
vogliamo costruire un algoritmo per calcolare $p(t)$, dove $p(x)$ è il polinomio di interpolazione di $f(x)$ sui nodi $x_0,x_1,\ldots,x_n$
l’algoritmo nel caso $n=3$
in base al teorema della forma di Newton
Partiamo da
$$p(t)=f[x_0]+f[x_0,x_1](t-x_0)+f[x_0,x_1,x_2](t-x_0)(t-x_1)+f[x_0,x_1,x_2,x_3](t-x_0)(t-x_1)(t-x_2)$$

la prima parte dell'algoritmo è indipendente dal punto $t$ in cui devo valutare $p(x)$

consiste nel calcolo delle differenze divise, con la tabella delle differenze divise

scriviamo $p(t)$ nella seguente forma
raccolgo per $(t-x_0)$ poi per $(t-x_1)$ e raccolgo infine per $(t-x_2)$
$$
p(t)=f[x_0]+(t-x_0)\left(f[x_0,x_1]+(t-x_1)\left(f[x_0,x_1,x_2]+(t-x_2)f[x_0,x_1,x_2,x_3]\right)\right)
$$

prima definiamo l’ultima differenza divisa come $h_3$, poi $h_2$ è la parentesi più interna, $h_1$ è la parentesi successiva e $h_0$ sarà tutto il valore finale, cioè $p(t)$
quindi calcoliamo prima $h_3$, poi $h_2$, poi $h_1$, poi $h_0$

$$
h_3=f[x_0,x_1,x_2,x_3]
$$
$$
h_2=f[x_0,x_1,x_2]+(t-x_2)h_3
$$
$$
h_1=f[x_0,x_1]+(t-x_1)h_2
$$
$$
h_0=f[x_0]+(t-x_0)h_1
$$
alla fine
$$
h_0=p(t)
$$
calcoliamo i costi

della prima fase abbiamo la nostra tabella delle differenze divise
![[Pasted image (4).png]]
il numero di elementi da calcolare è
$$
1+2+\cdots+n=\frac{n(n+1)}{2}
$$
nel nostro caso 6 elementi

il numero di elementi consiste nella parte triangolare inferiore della tabella delle differenze divise tranne la prima colonna

la formula delle differenze divise per essere svolta ha bisogno di  2 sottrazioni e 1 divisione quindi

$2\cdot\frac{n(n+1)}{2}=n(n+1)$ sottrazioni, 
e $\frac{n(n+1)}{2}$ divisioni
$$
c_1(n)=n(n+1)A+\frac{n(n+1)}{2}D
$$
nel nostro caso 12 sottrazioni e 6 divisioni


Dopo aver calcolato, nella prima fase, tutte le differenze divise, la seconda fase consiste nel valutare il polinomio interpolante nel punto assegnato $t$
quindi calcoliamo le varie $h$

abbiamo una addizione, una sottrazione e una moltiplicazione per tutti gli $h$ da calcolare dopo $h_n$

$h_n$ non va calcolato perché è già l’ultima differenza divisa
quindi in totale:
- $n$ sottrazioni
- $n$ moltiplicazioni
- $n$ addizioni

ma il costo delle addizioni e delle sottrazioni è uguale ma questo non vale per le divisioni e le moltiplicazioni
poniamo:
- $A=$ addizioni e sottrazioni
- $M=$ moltiplicazioni
- $D=$ divisioni
abbiamo
per la seconda fase abbiamo
$$
c_2(n)=2nA+nM
$$
perché ci sono $n$ sottrazioni e $n$ addizioni, quindi $2nA$, più $n$ moltiplicazioni
quindi
$$
c(n)=n(n+1)A+2nA+nM+\frac{n(n+1)}{2}D
$$
cioè moltiplicando e sommando otteniamo
$$
c(n)=(n^2+3n)A+nM+\left(\frac{n^2}{2}+\frac{n}{2}\right)D
$$
approssimando per $n$ grande, guardiamo solo i termini di grado più alto
$$
c(n)\approx n^2A+\frac{n^2}{2}D
$$
##### Osservazione 1.2
la prima parte dell'algoritmo è indipendente dal punto $t$ in cui $p(x)$ viene valutato quindi per valutare $p(x)$ in $m$ punti $t_1,t_2,...,t_m \in \mathbb{R}$ 
si calcolano le differenze divise una volta sola con costo$$
c_1(n)=n(n+1)A+\frac{n(n+1)}{2}D
$$
si calcolano invece per la seconda fase tutti i $p(t_i)$ con $i=1,...m$ 
con costo computazionale 
$$
c_2(n)=m(2nA+nM)
$$
$$
c_m(n)=n(n+1)A+\frac{n(n+1)}{2}D+m(2nA+nM)
$$
quindi
$$
c_m(n)=(n^2+2mn+n)A+mnM+\left(\frac{n^2}{2}+\frac{n}{2}\right)D
$$
approssimando per $n$ grande otteniamo
$$
c_m(n)\approx (n^2+2mn)A+mnM+\frac{n^2}{2}D
$$

##### Aggiunta di un nodo di interpolazione nella forma di Newton
la forma di Newton è conveniente quando ai dati di interpolazione
$$
(x_0,y_0),\ldots,(x_n,y_n)
$$
viene aggiunto un nuovo dato
$$
(x_{n+1},y_{n+1})
$$
con il nuovo nodo diverso dai precedenti
$$
x_{n+1}\neq x_0,\ldots,x_n
$$
infatti, detta $f(x)$ una qualche funzione qualsiasi tale che
$$
f(x_i)=y_i \qquad i=0,\ldots,n+1
$$
il polinomio di interpolazione dei dati
$$
(x_0,y_0),\ldots,(x_n,y_n)
$$
si scrive in forma di Newton nel modo seguente
$$
p(x)=f[x_0]+f[x_0,x_1](x-x_0)+\cdots+f[x_0,\ldots,x_n](x-x_0)\cdots(x-x_{n-1})
$$
il nuovo polinomio di interpolazione dei dati
$$
(x_0,y_0),\ldots,(x_{n+1},y_{n+1})
$$
si scrive invece come
$$
q(x)=p(x)+f[x_0,\ldots,x_{n+1}](x-x_0)\cdots(x-x_n)
$$

La forma di Newton è **incrementale**: il nuovo polinomio si ottiene aggiungendo un solo termine al polinomio precedente.

Supponiamo di avere già $p(x)$ in forma di Newton.
Sono quindi già noti i coefficienti (ovvero le differenze divise):
$$
f[x_0],
\quad
f[x_0,x_1],
\quad
\dots,
\quad
f[x_0,\dots,x_n].
$$

Per ottenere la forma di Newton di $q(x)$ basta calcolare la nuova differenza divisa:
$$
f[x_0,\dots,x_n,x_{n+1}].
$$

Non serve ricalcolare tutta la tabella, ma si aggiunge soltanto una nuova riga, partendo dal nuovo valore:
$$
f[x_{n+1}]=y_{n+1}.
$$

Da questo valore si calcolano, uno dopo l’altro:
$$
f[x_0,x_{n+1}],
$$
$$
f[x_0,x_1,x_{n+1}],
$$
$$
\dots,
$$
$$
f[x_0,\dots,x_n,x_{n+1}].
$$
Per costruire la nuova riga bastano:
- i coefficienti già presenti nella forma di Newton;
- il nuovo valore $f[x_{n+1}]$.
 ![[Pasted image 20260713125631.png]]


### INTEGRAZIONE NUMERICA
Data una funzione integrabile $f:[a,b]\to\mathbb{R}$, si vuole calcolare un’approssimazione di

$$
\int_a^b f(x)\,dx
$$
A tal fine si suddivide l’intervallo $[a,b]$ in $n\geq 1$ sotto-intervalli tutti della stessa ampiezza
$$
h=\frac{b-a}{n}
$$
dove $h$ è detto passo di discretizzazione.
Definiamo i nodi
$$
x_j=a+jh,\qquad j=0,\ldots,n
$$
Il valore che si prende come approssimazione del nostro integrale $\int_a^b f(x)\,dx$ è $\int_a^b s(x)\,dx$
La funzione
$$
s:[a,b]\to\mathbb{R}
$$
è definita a tratti: per $x\in[x_j,x_{j+1}]$ si prende la retta che passa per i punti
$$
(x_j,f(x_j)),\qquad (x_{j+1},f(x_{j+1}))
$$
Il coefficiente angolare di questa retta è
$$
\frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}
$$
quindi, per $x\in[x_j,x_{j+1}]$, abbiamo
$$
s(x)=f(x_j)+\frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}(x-x_j)
$$
questa regola vale per ogni indice $j=0,\ldots,n-1$

Quindi prendiamo come approssimazione di $\int_a^b f(x)\,dx$
$$
I_n=\int_a^b s(x)\,dx
=
\sum_{j=0}^{n-1}\int_{x_j}^{x_{j+1}}s(x)\,dx
$$
Siccome $s(x)$ è definita a tratti possiamo spezzare l’integrale come sopra
poi sostituendo $s(x)$
$$
I_n=
\sum_{j=0}^{n-1}
\int_{x_j}^{x_{j+1}}
\left[
f(x_j)+\frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}(x-x_j)
\right]dx
$$
Ora risolviamo l’integrale dentro la sommatoria
Dividiamolo in due pezzi:
$$\int_{x_j}^{x_{j+1}} f(x_j)\,dx + \int_{x_j}^{x_{j+1}} \frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}(x-x_j)\,dx$$
la prima parte risulta essere
$\int f(x_j)\,dx$

Qui $f(x_j)$ è costante, perché $x_j$è fissato. Quindi una primitiva potrebbe essere
$f(x_j)(x-x_j)$

Si sceglie questa forma perché quando poi metti $x=x_j$, viene subito zero:
$f(x_j)(x_j-x_j)=0$

Consideriamo la seconda parte dell'integrale
$$\int \frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}(x-x_j)\,dx$$
La frazione
$$\frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}$$
è costante rispetto a $x$. Quindi la portiamo idealmente fuori dall’integrale.
Rimane da integrare: $\int (x-x_j)\,dx$

La primitiva è $\frac{(x-x_j)^2}{2}.$
Perché?

Perché derivando:
$$\frac{d}{dx}\left(\frac{(x-x_j)^2}{2}\right) = \frac{1}{2}\cdot 2(x-x_j)\cdot 1 = x-x_j.dx$$
Quindi la primitiva completa è
$$f(x_j)(x-x_j)+ \frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j} \frac{(x-x_j)^2}{2}$$
Da scrivere con gli estremi:
$$\left[ f(x_j)(x-x_j)+ \frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j} \frac{(x-x_j)^2}{2} \right]_{x_j}^{x_{j+1}}$$

Ora valutiamo per l'estremo $x=x_{j+1}$
$$f(x_j)(x_{j+1}-x_j)+ \frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j} \frac{(x_{j+1}-x_j)^2}{2}$$
invece per $x=x_j$
$$f(x_j)(x_j-x_j)+ \frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j} \frac{(x_j-x_j)^2}{2}=0$$
Quindi resta solo il valore nel punto superiore

Adesso semplifichiamo il secondo termine tra denominatore e numeratore
$$\frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j} \frac{(x_{j+1}-x_j)^2}{2} = \frac{f(x_{j+1})-f(x_j)}{2}(x_{j+1}-x_j)$$
Quindi otteniamo:
$$f(x_j)(x_{j+1}-x_j) + \frac{f(x_{j+1})-f(x_j)}{2}(x_{j+1}-x_j)$$
Raccogliamo $(x_{j+1}-x_j)$
$$(x_{j+1}-x_j) \left[ f(x_j)+\frac{f(x_{j+1})-f(x_j)}{2} \right]$$
Dentro la parentesi:
$$f(x_j)+\frac{f(x_{j+1})-f(x_j)}{2} = \frac{2f(x_j)+f(x_{j+1})-f(x_j)}{2} = \frac{f(x_j)+f(x_{j+1})}{2}$$
Quindi:
$$\int_{x_j}^{x_{j+1}}s(x)\,dx = (x_{j+1}-x_j)\frac{f(x_j)+f(x_{j+1})}{2}$$
Siccome gli intervalli hanno tutti ampiezza $h=x_{j+1}-x_j$
allora possiamo scrivere direttamente $h$
$$\int_{x_j}^{x_{j+1}}s(x)\,dx = h\frac{f(x_j)+f(x_{j+1})}{2}$$
quindi ponendo la sommatoria abbiamo
$$I_n= \sum_{j=0}^{n-1} \frac{f(x_j)+f(x_{j+1})}{2}h$$

Poi si porta fuori $\frac{h}{2}$
$$I_n= \frac{h}{2} \sum_{j=0}^{n-1} \left[ f(x_j)+f(x_{j+1}) \right]$$
Ora il passaggio importante è capire cosa succede sviluppando la sommatoria:
$$\begin{aligned} I_n &= \frac{h}{2} \left[ f(x_0)+f(x_1) +f(x_1)+f(x_2) +f(x_2)+f(x_3) +\cdots +f(x_{n-1})+f(x_n) \right]. \end{aligned}$$
Qui:
$f(x_0)$
compare solo nel primo trapezio, mentre
$f(x_n)$
compare solo nell’ultimo trapezio.
Invece ogni nodo interno
$f(x_1),f(x_2),\ldots,f(x_{n-1})$
compare due volte, perché ogni nodo interno è contemporaneamente estremo destro di un sotto-intervallo ed estremo sinistro del successivo

Quindi la somma diventa:
$$I_n= \frac{h}{2} \left[ f(x_0)+2\sum_{j=1}^{n-1}f(x_j)+f(x_n) \right]$$
con $f(x_n)$ fuori dalla sommatoria
Dato che $x_0=a,\qquad x_n=b$
possiamo scrivere:
$$I_n= \frac{h}{2} \left[ f(a)+2\sum_{j=1}^{n-1}f(x_j)+f(b) \right]$$
Infine distribuiamo il fattore $\frac h2$
$$I_n= h\left[ \frac{f(a)+f(b)}{2} + \sum_{j=1}^{n-1}f(x_j) \right]$$

Questa è la **formula dei trapezi di ordine n**:
$$I_n= h\left[ \frac{f(a)+f(b)}{2} + \sum_{j=1}^{n-1}f(x_j) \right], \qquad h=\frac{b-a}{n}$$
##### Errore o resto della formula dei trapezi
Finora abbiamo costruito la formula dei trapezi, cioè un valore numerico $I_n$ che approssima l’integrale esatto$$\int_a^b f(x)\,dx$$A questo punto è naturale chiedersi quanto sia buona questa approssimazione, cioè quanto $I_n$ sia vicino al valore reale dell’integrale. 
Per misurare questa distanza consideriamo l’errore $\left|\int_a^b f(x)\,dx-I_n\right|$ 

L’obiettivo è quindi ottenere una stima di questo errore in funzione del passo di discretizzazione  $h=\frac{b-a}{n}$ In particolare vogliamo capire come cambia l’errore quando aumentiamo il numero di sotto-intervalli $n$ cioè quando il passo $h$ diventa più piccolo. 

Per dimostrare la formula dell’errore della formula dei trapezi, introduciamo prima un lemma tecnico, che è una generalizzazione del teorema della media integrale.
#### LEMMA 2.1
Siano $\omega,\alpha,\beta:[a,b]\to\mathbb{R}$ funzioni tali che:
- $\omega(x)$ è continua e $\omega(x)\geq 0$ su $[a,b]$
- $\alpha(x)$ e $\beta(x)\omega(x)$ sono continue su $[a,b]$
- $m\leq \beta(x)\leq M \qquad \forall x\in[a,b]$ dove m e M sono min e max della funzione $\alpha(x)$ su $[a,b]$ 

Allora $\exists$ un certo punto $\eta\in[a,b]$ tale che
$$
\int_a^b \beta(x)\omega(x)\,dx
=
\alpha(\eta)\int_a^b \omega(x)\,dx
$$

notiamo che con $\omega(x)=1$ e $\beta(x)=\alpha(x)$ risulta essere il teorema della media integrale
##### Dimostrazione
poiché $\omega(x)\geq 0$ per ogni $x\in[a,b]$ e visto che
$m\leq \beta(x)\leq M$  $\forall$ $x\in[a,b]$
allora possiamo moltiplicare tutta la disuguaglianza per $\omega(x)$ senza cambiare il verso, perché $\omega(x)$ è non negativa.
Quindi 
$m\omega(x)\leq \beta(x)\omega(x)\leq M\omega(x)$
Se prendiamo l’integrale di tutti i membri, la disuguaglianza rimane valida per monotonia dell’integrale:
$$
m\int_a^b \omega(x)\,dx
\leq
\int_a^b \beta(x)\omega(x)\,dx
\leq
M\int_a^b \omega(x)\,dx
$$
![[Pasted image 20260717111916.png]]
Siccome $\beta(x)\omega(x)$ sta sempre tra $m\omega(x)$ e $M\omega(x)$, anche il suo integrale sta tra gli integrali di $m\omega(x)$ e $M\omega(x)$.

Definiamo quindi una funzione $z$
$$
z:[a,b]\to\mathbb{R}
$$
tale che
$$
z(y)=\alpha(y)\int_a^b \omega(x)\,dx
$$
$\forall y \in [a,b]$ 
chiamiamo
$$
C=\int_a^b \omega(x)\,dx
$$
con
$$
C\geq 0
$$
perché $\omega(x)\geq 0$.

Allora
$$
z(y)=\alpha(y)C
$$
siccome $\alpha$ è continua su $[a,b]$, anche $z$ è continua su $[a,b]$

Per il teorema dei valori intermedi, $z$ assume tutti i valori compresi tra il suo minimo e il suo massimo

$mC \leq z(y) \leq MC$ 

ma anche questo lo era
$$
mC
\leq
\int_a^b \beta(x)\omega(x)\,dx
\leq
MC
$$

Quindi $z$ essendo continua assumerà anche il valore
$$
\int_a^b \beta(x)\omega(x)\,dx
$$
cioè esiste un punto $\eta\in[a,b]$ tale che
$$
z(\eta)=\int_a^b \beta(x)\omega(x)\,dx
$$
ma
$$
z(\eta)=\alpha(\eta)\int_a^b \omega(x)\,dx
$$
quindi
$$
\int_a^b \beta(x)\omega(x)\,dx
=
\alpha(\eta)\int_a^b \omega(x)\,dx
$$

$$\square$$
#### TEOREMA 2.1
sia $f:[a,b]\to\mathbb{R}$ di classe $C^2[a,b]$ e sia $I_n$ la formula dei trapezi di ordine $n$ e passo $h=\frac{b-a}{n}$

per approssimare
$$
\int_a^b f(x)\,dx
$$
allora $\exists$ un certo punto $\eta\in[a,b]$ tale che
$$
\int_a^b f(x)\,dx-I_n
=
-\frac{(b-a)f''(\eta)}{12}h^2
$$
Questo teorema ci dice quanto vale l’errore commesso dalla formula dei trapezi
##### DIMOSTRAZIONE
Siano
$x_j=a+jh,\qquad j=0,\ldots,n$ e sia $s(x)$ la funzione lineare a tratti dove $s(x)$ su un intervallo $[x_j,x_{j+1}]$ rappresenta l'unico polinomio di interpolazione di $f(x)$ sui nodi $x_j$ e $x_{j+1}$ che appartiene a $\mathbb{R}_1[x]$

![[Pasted image 20260713130109.png]]
Si vuole trovare
$$
\int_a^b f(x)\,dx-I_n
$$
$$
\int_a^b f(x)\,dx-I_n
=
\int_a^b f(x)\,dx-\int_a^b s(x)\,dx
$$
per linearità degli integrali mettiamo tutto sotto un unico integrale:
$$
\int_a^b f(x)\,dx-I_n
=
\int_a^b [f(x)-s(x)]\,dx
$$
questo integrale lo scriviamo come somma sugli intervallini:
$$
\int_a^b [f(x)-s(x)]\,dx
=
\sum_{j=0}^{n-1}\int_{x_j}^{x_{j+1}}[f(x)-s(x)]\,dx
$$
 $f(x)-s(x)$ è l’errore dell’interpolazione polinomiale con $n=1$.

Per il teorema dell’errore dell’interpolazione sappiamo che

$\forall x \in [x_j,x_{j+1}]$ $\exists$ un punto $\xi_j(x)\in(x_j,x_{j+1})$ t.c

$$
f(x)-s(x)=\frac{f''(\xi_j(x))}{2!}(x-x_j)(x-x_{j+1})
$$

utilizziamo il lemma 2.1 sull'intervallo $[x_j,x_{j+1}]$ e poniamo che
$$
\omega(x)=\frac{(x-x_j)(x_{j+1}-x)}{2}
$$
$$
\beta(x)=f''(\xi_j(x))
$$
$$
\alpha(x)=f''(x)
$$

per applicare il lemma devono essere soddisfatte le ipotesi:
Siano $\omega,\alpha,\beta:[a,b]\to\mathbb{R}$ funzioni tali che:
- $\omega(x)$ è continua e $\omega(x)\geq 0$ su $[a,b]$
- $\alpha(x)$ e $\beta(x)\omega(x)$ sono continue su $[a,b]$
- $m\leq \beta(x)\leq M \qquad \forall x\in[a,b]$ 
	- dove m e M sono min e max della funzione $\alpha(x)$ su $[a,b]$ 

- $\omega(x)$ è continua e $\omega(x)\geq 0$ su $[x_j,x_{j+1}]$
	- è continua poiché è un polinomio
	- è $\geq 0$ perché su $[x_j,x_{j+1}]$ abbiamo al numeratore
	- $x-x_j\geq 0$ e $x_{j+1}-x\geq 0$, quindi il prodotto è non negativo

- $\alpha(x)$ è continua su $[x_j,x_{j+1}]$
	- infatti $\alpha(x)=f''(x)$ e $f\in C^2[a,b]$ 
	- f è derivabile due volte e la derivata seconda $f''$ è continua su $[a,b]$.
- $\beta(x)\omega(x)$ è continua
	- qui non dobbiamo dimostrare che $\beta(x)$ da sola è continua
	- il lemma richiede la continuità di $\beta(x)\omega(x)$
	- infatti, dalla formula dell’errore sappiamo la seguente uguaglianza
$$
f(x)-s(x)=-\beta(x)\omega(x)
$$
quindi
$$
\beta(x)\omega(x)=s(x)-f(x)
$$
e questa funzione è continua perché sia $s(x)$ sia $f(x)$ sono continue

- Infine dobbiamo verificare che $\beta(x)$ sia compresa tra il minimo e il massimo di $\alpha(x)$. 
- Nel nostro caso $\alpha(x)=f''(x)$, quindi il minimo e il massimo sono quelli di $f''$ su $[x_j,x_{j+1}]$ 
- Poiché $\beta(x)=f''(\xi_j(x))$ e $\xi_j(x)\in(x_j,x_{j+1})$,
- $\beta(x)$ è un valore assunto da $f''$ all’interno dell’intervallo. 
- Quindi $\beta(x)$ è necessariamente compresa tra il minimo e il massimo di $f''$ su $[x_j,x_{j+1}]$ In questo modo anche l’ultima ipotesi del lemma è verificata

ora che le proprietà sono tutte verificate il lemma diceva che $\exists \ \eta_j\in[x_j,x_{j+1}]$ t.c
$$
\int_{x_j}^{x_{j+1}}\beta(x)\omega(x)\,dx
=
f''(\eta_j)
\int_{x_j}^{x_{j+1}}\omega(x)\,dx
$$
cioè
$$
\int_{x_j}^{x_{j+1}}
f''(\xi_j(x))\frac{(x-x_j)(x_{j+1}-x)}{2}\,dx
=
f''(\eta_j)
\int_{x_j}^{x_{j+1}}
\frac{(x-x_j)(x_{j+1}-x)}{2}\,dx
$$

Applicando il Lemma 2.1 a ciascun sotto-intervallo
$[x_j,x_{j+1}]$, possiamo sostituire il termine $f''(\xi_j(x))$, che dipende da $x$, con un valore costante $f''(\eta_j)$, per un opportuno punto $\eta_j\in[x_j,x_{j+1}]$ Pertanto otteniamo
$$
\int_a^b f(x)\,dx-I_n
=
-
\sum_{j=0}^{n-1}
f''(\eta_j)
\int_{x_j}^{x_{j+1}}
\frac{(x-x_j)(x_{j+1}-x)}{2}\,dx
$$
ora calcoliamo l’integrale
$$
\int_{x_j}^{x_{j+1}}
\frac{(x-x_j)(x_{j+1}-x)}{2}\,dx
$$
faccio il cambio di variabile
$$
t=x-x_j
$$
ricaviamo:
$x=t+x_j$
derivando rispetto a $x$:
$$\frac{dt}{dx}=\frac{d}{dx}(x-x_j)=1$$
Infatti:
$$\frac{d}{dx}x=1, \qquad \frac{d}{dx}x_j=0$$
Quindi: $\frac{dt}{dx}=1$

Da questa uguaglianza si scrive informalmente:
$dt=dx$
Quindi il differenziale non cambia.

Cambiando gli estremi abbiamo che 
all'inizio dell'intervallo  $x=x_j$, allora
$$
t=x_j-x_j=0
$$
alla fine dell'intervallo $x=x_{j+1}$, allora
$$
t=x_{j+1}-x_j=h
$$
ma sappiamo che è proprio uguale a h questo perché
$$x_{j}=a+(j)h$$
$$x_{j+1}=a+(j+1)h$$
quindi
$$x_{j+1}-x_j = a+(j+1)h-(a+jh) = h$$

inoltre possiamo definire che al numeratore il primo fattore
$$x-(x_j)=t$$
il secondo fattore
$$
x_{j+1}-x=x_{j+1}-(t+x_j)=x_{j+1}-x_j-t=h-t
$$
quindi l’integrale diventa

$$
\int_0^h \frac{t(h-t)}{2}\,dt
$$

calcoliamo questo integrale: portiamo fuori $1/2$ e moltiplichiamo $t$
$$
\int_0^h \frac{t(h-t)}{2}\,dt
=
\frac{1}{2}\int_0^h (ht-t^2)\,dt
$$
Ora calcola una primitiva di
$$ht-t^2$$
portiamo fuori una costante h e vediamo le due primitive di $t$ e di $t^2$
questa parte ha come primitiva
$$\int ht\,dt = h\int t\,dt = h\frac{t^2}{2}$$
la seconda parte ha come primitiva
$$\int t^2\,dt = \frac{t^3}{3}$$
Quindi:
$$\int (ht-t^2)\,dt = \frac{ht^2}{2}-\frac{t^3}{3}$$
Per questo otteniamo:
$$
=
\frac{1}{2}
\left[
\frac{h t^2}{2}-\frac{t^3}{3}
\right]_0^h
$$

sostituendo $h$ e $0$:
$$
=
\frac{1}{2}
\left(
\frac{h\cdot h^2}{2}-\frac{h^3}{3}
\right)
$$

$$
=
\frac{1}{2}
\left(
\frac{h^3}{2}-\frac{h^3}{3}
\right)
$$
$$
=
\frac{1}{2}\cdot \frac{h^3}{6}
=
\frac{h^3}{12}
$$

quindi abbiamo che 
$$
\int_a^b f(x)\,dx-I_n
=
-
\sum_{j=0}^{n-1}
f''(\eta_j)\frac{h^3}{12}
$$
portiamo fuori la costante $h^3/12$
$$
\int_a^b f(x)\,dx-I_n
=
-\frac{h^3}{12}
\sum_{j=0}^{n-1}f''(\eta_j)
$$
moltiplichiamo e dividiamo per $n$ così otteniamo una media aritmetica:
$$
-\frac{h^3}{12}
\sum_{j=0}^{n-1}f''(\eta_j)
=
-\frac{nh^3}{12}
\frac{1}{n}
\sum_{j=0}^{n-1}f''(\eta_j)
$$
ora usiamo il fatto che
$$
nh=b-a
$$
perché
$$
h=\frac{b-a}{n}
$$
quindi
$$
nh^3=h^2(nh)=h^2(b-a)
$$
allora abbiamo che
$$
\int_a^b f(x)\,dx-I_n
=
-\frac{(b-a)h^2}{12}
\left[
\frac{1}{n}
\sum_{j=0}^{n-1}f''(\eta_j)
\right]
$$

Poiché $f''$ è continua su $[a,b]$ 

La quantità $\frac{1}{n}\sum_{j=0}^{n-1}f''(\eta_j)$ è una media aritmetica di valori assunti da $f''$ quindi è compresa tra il minimo e il massimo di $f''$ su $[a,b]$ 

Per il teorema dei valori intermedi, esiste allora un punto $\eta\in[a,b]$ tale che  $f''(\eta) = \frac{1}{n} \sum_{j=0}^{n-1}f''(\eta_j)$

$$
f''(\eta)
=
\frac{1}{n}
\sum_{j=0}^{n-1}f''(\eta_j)
$$
sostituendo alla formula originale otteniamo
$$
\int_a^b f(x)\,dx-I_n
=
-\frac{(b-a)h^2}{12}f''(\eta)
$$
cioè otteniamo la formula finale dell’errore della formula dei trapezi
$$
\int_a^b f(x)\,dx-I_n
=
-\frac{(b-a)f''(\eta)}{12}h^2
$$
$$\square$$
##### Osservazione 2.1
**come scegliere $n$**, cioè il numero di sotto-intervalli della formula dei trapezi, per garantire che l’errore sia minore o uguale a una certa tolleranza $\varepsilon>0$
Dal Teorema 2.1 sappiamo che la formula dell'errore dei trapezi è la seguente
$$\int_a^b f(x)\,dx-I_n = -\frac{(b-a)f''(\eta)}{12}h^2$$
dove abbiamo 
$$h=\frac{b-a}{n}$$
Passando al valore assoluto otteniamo, mettendo a destra solo il modulo alla derivata perché tutto il resto sappiamo essere maggiore di 0
$$\left|\int_a^b f(x)\,dx-I_n\right| = \frac{(b-a)|f''(\eta)|}{12}h^2$$
Sostituendo
$$h=\frac{b-a}{n}$$
abbiamo
$$\left|\int_a^b f(x)\,dx-I_n\right| = \frac{(b-a)|f''(\eta)|}{12} \frac{(b-a)^2}{n^2}$$

quindi moltiplicando $b-a$ abbiamo che
$$\left|\int_a^b f(x)\,dx-I_n\right| = \frac{(b-a)^3|f''(\eta)|}{12n^2}$$

Il problema è che il punto $\eta$  non lo conosciamo. 
Quindi non possiamo usare direttamente il valore $|f''(\eta)|$
Per questo introduciamo una costante $K$ tale che
$$|f''(x)|\leq K \qquad \forall x\in[a,b]$$
In questo modo, sicuramente,
$$|f''(\eta)|\leq K$$
Allora otteniamo la stima
$$\left|\int_a^b f(x)\,dx-I_n\right| \leq \frac{(b-a)^3K}{12n^2}$$
Ora vogliamo imporre che l’errore sia al massimo $\varepsilon$

Basta quindi mettere a disuguaglianza che
$$\frac{(b-a)^3K}{12n^2}\leq \varepsilon$$

Risolviamo rispetto a $n$:
$$(b-a)^3K\leq 12\varepsilon n^2$$
quindi
$$\frac{(b-a)^3K}{12\varepsilon}\leq n^2$$
Dato che $n>0$, mettiamo la radice da una parte e dall'altra
$$n\geq \sqrt{\frac{(b-a)^3K}{12\varepsilon}}$$
Definiamo quindi
$$n(\varepsilon)=\sqrt{\frac{(b-a)^3K}{12\varepsilon}}$$
Questo valore ci dice che, per garantire un errore minore o uguale a $\varepsilon$, basta scegliere un intero $n$ tale che $n\geq n(\varepsilon)$

Infine osserviamo che possiamo portare fuori la radice di epsilon
$$n(\varepsilon) = \sqrt{\frac{(b-a)^3K}{12\varepsilon}} = \frac{1}{\sqrt{\varepsilon}} \sqrt{\frac{(b-a)^3K}{12}}$$

Ponendo
$$C=\sqrt{\frac{(b-a)^3K}{12}}$$
si ottiene
$$n(\varepsilon)=\frac{C}{\sqrt{\varepsilon}}$$
Quindi il numero di sotto-intervalli necessario cresce come la funzione
$$\frac{1}{\sqrt{\varepsilon}}$$
##### Estrapolazione
Dopo aver studiato la formula dei trapezi, abbiamo visto che l’approssimazione
$$I_n$$​
dipende dal passo di discretizzazione
$$h=\frac{b-a}{n}$$
L’idea dell’estrapolazione è usare **più formule dei trapezi**, calcolate con passi diversi, per ottenere una nuova approssimazione dell’integrale più accurata delle singole approssimazioni di partenza

Sia quindi
$$f:[a,b]\to\mathbb{R}$$
una funzione integrabile e siano
$$I_{n_0},I_{n_1},\ldots,I_{n_m}$$

le formule dei trapezi di ordini distinti
$$n_0,n_1,\ldots,n_m$$
dove a ciascun ordine $n_i$corrisponde il passo
$$h_i=\frac{b-a}{n_i}$$
Quindi abbiamo le approssimazioni
$$I_{n_0},I_{n_1},\ldots,I_{n_m}$$
dell’integrale esatto
$$\int_a^b f(x)\,dx$$
A questo punto costruiamo il polinomio di interpolazione $$p(x)\in\mathbb{R}$$dei dati
$$(h_0^2,I_{n_0}),\ (h_1^2,I_{n_1}),\ldots,(h_m^2,I_{n_m})$$

Cioè $p(x)$ è l’unico polinomio di grado al più $m$ tale che
$$p(h_i^2)=I_{n_i}, \qquad i=0,\ldots ,m$$
Questo polinomio esiste ed è unico perché i nodi
$$h_0^2,h_1^2,\ldots,h_m^2$$​
sono distinti. Infatti gli ordini $n_0,\ldots,n_m$​ sono distinti, quindi anche i passi $h_i=\frac{b-a}{n_i}$​ sono distinti, e quindi sono distinti anche i loro quadrati.
A questo punto si considera il valore
$p(0)$
sapendo che $p(0)$ fornisce un’approssimazione dell’integrale generalmente molto più accurata delle singole formule dei trapezi 
Si parla di estrapolazione perché valutiamo il polinomio interpolante in un punto esterno all’intervallo dei nodi di interpolazione. In particolare, i nodi sono$h_i^2>0$, mentre noi valutiamo il polinomio in $0$

### Definizioni matriciali
##### Traccia, determinante, raggio spettrale e autovalori
Sia
$$A\in \mathbb{C}^{n\times n}$$
una matrice quadrata complessa, e siano
$$\lambda_1,\lambda_2,\ldots,\lambda_n$$
i suoi autovalori, contati con la loro molteplicità algebrica, cioè contando ogni autovalore tante volte quante è la sua molteplicità come radice del polinomio caratteristico
###### Autovalori
Gli autovalori di $A$ sono i numeri $\lambda$ associati alla matrice che descrivono, in un certo senso, alcune direzioni fondamentali su cui l’azione di $A$ si comporta come una semplice moltiplicazione
In modo operativo, si trovano come radici del polinomio caratteristico:
$det(A-\lambda I)=0$
Quindi, quando scriviamo
$\lambda_1,\lambda_2,\ldots,\lambda_n$
intendiamo tutti gli autovalori della matrice, ripetuti secondo la loro molteplicità algebrica.
###### Traccia
La traccia di una matrice quadrata è la somma degli autovalori 
$$\operatorname{traccia}(A) = \lambda_1+\lambda_2+\cdots+\lambda_n$$
Quindi la traccia è uguale alla somma degli autovalori, contati con molteplicità algebrica
###### Determinante
Il determinante è un numero associato a una matrice quadrata. Dal punto di vista pratico può essere calcolato, ad esempio, con il metodo di Laplace, scegliendo una riga o una colonna e sviluppando il determinante con la regola dei segni. Le dispense ricordano anche il teorema di Binet:
$$\det(AB)=\det(A)\det(B)$$
e il fatto che per una matrice quadrata vale che
$$\det(A)=\det(A^T)$$

Rispetto agli autovalori, vale la proprietà fondamentale:
$$\det(A)=\lambda_1\lambda_2\cdots\lambda_n$$
Quindi il determinante è il prodotto degli autovalori, sempre contati con molteplicità algebrica
###### Raggio spettrale
Il raggio spettrale di $A$, indicato con
$\rho(A)$
è definito come il massimo dei moduli degli autovalori:
$$\rho(A) = \max\left(|\lambda_1|,|\lambda_2|,\ldots,|\lambda_n|\right)$$
Quindi misura quanto è “grande”, in modulo, l’autovalore più grande della matrice


>[!info]-  ##### Osservazione a pagina 27 sugli autovalori
>  Osservazione — Esistenza di un autovalore con parte immaginaria $(\ge \frac14)$
> 
> Nell’Esempio 3.2 si considera la matrice
> $$\begin{pmatrix} 2 & 4 & -1 & 0\\ 0 & 1+i & 0 & 7\\ 1 & -1 & 1 & -2i\\ 3 & -1 & 0 & -12 \end{pmatrix}$$
> 
> La matrice è $4\times 4$, quindi ha quattro autovalori, che indichiamo con
> La matrice è ($4\times 4$), quindi ha quattro autovalori, che indichiamo con
> $\lambda_1,\lambda_2,\lambda_3,\lambda_4$ 
> Dal richiamo teorico sappiamo che la traccia di una matrice è uguale alla somma dei suoi autovalori, contati con molteplicità algebrica:
> $$\operatorname{tr}(A)=\lambda_1+\lambda_2+\lambda_3+\lambda_4.  $$
> Nel libro viene calcolato che 
> $$\operatorname{tr}(A)=-8+i.  $$
> 
> Quindi la parte immaginaria della traccia è
> $$\operatorname{Im}(\operatorname{tr}(A))=1 $$
> Vogliamo dimostrare che esiste almeno un autovalore $\lambda_j$ tale che
> $\operatorname{Im}(\lambda_j)\ge \frac14$
> Cioè vogliamo dimostrare che almeno uno degli autovalori ha parte immaginaria maggiore o uguale a ($\frac14$)
> 
> Supponiamo per assurdo che nessun autovalore abbia parte immaginaria maggiore o uguale a $(\frac14)$.
> Allora tutti e quattro gli autovalori avrebbero parte immaginaria strettamente minore di $(\frac14)$:
> $\operatorname{Im}(\lambda_1)<\frac14$
> $\operatorname{Im}(\lambda_2)<\frac14$
> $\operatorname{Im}(\lambda_3)<\frac14$
> $\operatorname{Im}(\lambda_4)<\frac14$
> Ora usiamo il fatto che
> $$\operatorname{tr}(A)=\lambda_1+\lambda_2+\lambda_3+\lambda_4$$
> Prendiamo la parte immaginaria di entrambi i membri:
> $\operatorname{Im}(\operatorname{tr}(A))$
> $\operatorname{Im}(\lambda_1+\lambda_2+\lambda_3+\lambda_4)$
> La parte immaginaria della somma è la somma delle parti immaginarie, quindi
> $\operatorname{Im}(\operatorname{tr}(A))$
> $\operatorname{Im}(\lambda_1)$
> $\operatorname{Im}(\lambda_2)$
> $\operatorname{Im}(\lambda_3)$  
> $\operatorname{Im}(\lambda_4)$
> Per l’ipotesi assurda, ciascun termine è minore di $(\frac14)$ Quindi
> $$\operatorname{Im}(\operatorname{tr}(A))  
> <  
> \frac14+\frac14+\frac14+\frac14$$
> Ma
> $\frac14+\frac14+\frac14+\frac14=1$
> Dunque avremmo
> $\operatorname{Im}(\operatorname{tr}(A))<1$
> Però sappiamo che
> $\operatorname{tr}(A)=-8+i,$
> quindi
> $\operatorname{Im}(\operatorname{tr}(A))=1$
> Abbiamo ottenuto una contraddizione:
> $1<1$
> che è impossibile.
> Quindi l’ipotesi assurda era falsa.
> Pertanto deve esistere almeno un autovalore ($\lambda_j$) tale che
> $\operatorname{Im}(\lambda_j)\ge \frac14$
##### Matrici invertibili
Una matrice $A ∈ \mathbb{C}^{n×n}$ si dice invertibile se esiste una matrice $B ∈ \mathbb{C}^{n \times n}$ tale che $AB = BA = I$. 
In tal caso, la matrice $B$ è univocamente determinata, prende il nome di **matrice inversa di A** e viene denotata con $A^{−1}$ 
Ricordiamo che una matrice $A ∈ \mathbb{C}^{n×n}$ è invertibile **se e solo se det(A) != 0**, ossia **se e solo se 0 non è un autovalore di A**. 
##### Matrici diagonalizzabili
Una matrice $A ∈ \mathbb{C}^{n×n}$ si dice diagonalizzabile se esistono una matrice invertibile $X ∈ \mathbb{C}^{n×n}$ e una matrice diagonale $D = diag(λ_{1}, λ_{2}, \dots , λ_{n}) ∈ \mathbb{C}^{n×n}$ tali che $$A = XDX^{−1}$$
se indichiamo con $\lambda_1,\ldots,\lambda_n$ gli elementi diagonali di $D$ e con $x_1,\ldots,x_n$ le colonne della matrice $X$, allora nella formula sopra

c’è scritto che per ogni $i=1,\ldots,n$,    $\lambda_i$ è un autovalore di $A$ con corrispondente autovettore $x_i$.
*Dimostrazione*
Partiamo da
$$
A=XDX^{-1}
$$
moltiplichiamo entrambi i membri a destra per $X$:
$$
AX=XD
$$
adesso guardiamo questa equazione colonna per colonna.
La matrice $X$ ha colonne
$$
x_1,x_2,\ldots,x_n
$$
quindi
$$
X=
\begin{pmatrix}
| & | & & |\\
x_1 & x_2 & \cdots & x_n\\
| & | & & |
\end{pmatrix}
$$
La prima colonna di $AX$ è
$$
Ax_1
$$
la seconda colonna di $AX$ è
$$
Ax_2
$$
e in generale la colonna $i$-esima di $AX$ è
$$
Ax_i
$$
Ora guardiamo $XD$.
Poiché $D$ è diagonale,
$$
D=
\begin{pmatrix}
\lambda_1 & 0 & \cdots & 0\\
0 & \lambda_2 & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & \lambda_n
\end{pmatrix}
$$
moltiplicare $X$ per $D$ significa moltiplicare ogni colonna $x_i$ di $X$ per il corrispondente elemento diagonale $\lambda_i$.
Quindi
$$
XD=
\begin{pmatrix}
| & | & & |\\
\lambda_1x_1 & \lambda_2x_2 & \cdots & \lambda_nx_n\\
| & | & & |
\end{pmatrix}
$$
siccome
$$
AX=XD
$$
le colonne corrispondenti devono essere uguali.
Quindi, per ogni $i=1,\ldots,n$,
$$
Ax_i=\lambda_i x_i
$$
questa è proprio la definizione di autovalore e autovettore.
Quindi $\lambda_i$ è un autovalore di $A$ e $x_i$ è un autovettore associato a $\lambda_i$
##### Matrici hermitiane e simmetriche
una matrice $A\in\mathbb{C}^{n\times n}$ si dice hermitiana se

$$
A^*=A
$$

indichiamo con $A^*$ la trasposta coniugata di $A$

ricordiamo che, se $z\in\mathbb{C}$ e
$$
z=\alpha+i\beta
$$
allora il suo coniugato è
$$
\overline{z}=\alpha-i\beta
$$
- inoltre sappiamo che
	- se le componenti di $A$ sono reali, allora $A^*=A^T$
	- quindi, se $A\in\mathbb{R}^{n\times n}$, dire che $A$ è hermitiana equivale a dire che $A$ è simmetrica
cioè
$$
A^T=A
$$
###### gli autovalori di una matrice hermitiana sono reali
*Dimostrazione*
Sia $A\in\mathbb{C}^{n\times n}$ hermitiana e sia $\lambda$ un suo autovalore generico.
Allora esiste un autovettore
$$
x\in\mathbb{C}^n\setminus\{0\}
$$
associato a $\lambda$, cioè
$$
Ax=\lambda x
$$
Moltiplichiamo entrambi i membri a sinistra per $x^*$ coniugato trasposto:
$$
x^*Ax=x^*(\lambda x)$$
poiché $\lambda$ è uno scalare, posso portarlo fuori:
$$
x^*Ax=\lambda x^*x
$$
Ora sappiamo che il prodotto tra un vettore x coniugato trasposto e il prodotto del vettore x è la sommatoria
$$
x^*x=\sum_{i=1}^n \overline{x_i}x_i
$$
ma questo prodotto è uguale al modulo al quadrato
$$
\overline{x_i}x_i=|x_i|^2
$$
quindi
$$
x^*x=\sum_{i=1}^n |x_i|^2
$$
siccome $x\neq 0$, almeno una componente $x_i$ è diversa da $0$, quindi
$$
\sum_{i=1}^n |x_i|^2>0
$$
Dunque possiamo dire che
$$
x^*Ax=\lambda \sum_{i=1}^n |x_i|^2
$$
e quindi isolando lambda otteniamo che 
$$
\lambda=
\frac{x^*Ax}{\sum_{i=1}^n |x_i|^2}
$$
il denominatore è un numero reale strettamente positivo come detto in precedenza

Ora dobbiamo dimostrare che anche il numeratore $x^*Ax$ è reale

Osserviamo che $x^*Ax$ è uno scalare, cioè una matrice 1x1

Per dimostrare che questo scalare è reale dobbiamo verificare che coincide proprio con il suo coniugato
$$
\overline{x^*Ax}=(x^*Ax)
$$
Per uno scalare, fare il coniugato coincide con fare la trasposta coniugata, quindi
$$
\overline{x^*Ax}=(x^*Ax)^*
$$
usando la proprietà della trasposta coniugata del prodotto:
$$
(x^*Ax)^*=x^*A^*(x^*)^*
$$
ma
$$
(x^*)^*=x
$$
e, siccome $A$ è hermitiana,
$$
A^*=A
$$
quindi
$$
(x^*Ax)^*=x^*Ax
$$
cioè
$$
\overline{x^*Ax}=x^*Ax
$$
quindi $x^*Ax$ è uguale al suo coniugato, e perciò è reale.

Abbiamo allora
$$
\lambda=
\frac{x^*Ax}{\sum_{i=1}^n |x_i|^2}
$$
dove il numeratore è reale e il denominatore è reale positivo.

Quindi
$$
\lambda\in\mathbb{R}
$$
e abbiamo dimostrato che ogni autovalore di una matrice hermitiana è reale.

##### Matrici definite positive
$A\in\mathbb{C}^{n\times n}$ si dice definita positiva se

$$
\operatorname{Re}(x^*Ax)>0
$$
per ogni vettore
$$
x\in\mathbb{C}^n\setminus\{0\}
$$
dove $\operatorname{Re}$ indica la parte reale

la parte reale di A
$$
\operatorname{Re}(A)=\frac{A+A^*}{2}
$$
mentre la parte immaginaria come
$$
\operatorname{Im}(A)=\frac{A-A^*}{2i}
$$
per dimostrare la parte reale di A è proprio questa partiamo dal suo scalare complesso e definiamo la sua parte reale
$$
\operatorname{Re}(x^*Ax)=\frac{x^*Ax+\overline{x^*Ax}}{2}
$$
ma, essendo $x^*Ax$ uno scalare, il suo coniugato coincide con la sua trasposta coniugata:
$$
\overline{x^*Ax}=(x^*Ax)^*
$$
e quindi
$$
(x^*Ax)^*=x^*A^*x
$$
perciò
$$
\operatorname{Re}(x^*Ax)=\frac{x^*Ax+x^*A^*x}{2}
$$
raccogliamo $x^*$ a sinistra e $x$ a destra:
$$
\operatorname{Re}(x^*Ax)
=
x^*\left(\frac{A+A^*}{2}\right)x
$$
la matrice tra $x^*$ e $x$ è la parte reale della matrice $A$, cioè
$$
\operatorname{Re}(A)=\frac{A+A^*}{2}
$$
quindi
$$
\operatorname{Re}(x^*Ax)=x^*\operatorname{Re}(A)x
$$
la parte immaginaria della matrice $A$ è invece
$$
\operatorname{Im}(A)=\frac{A-A^*}{2i}
$$
inoltre sappiamo che 
######  $\operatorname{Re}(A)$ e $\operatorname{Im}(A)$ sono sempre matrici hermitiane.
Infatti
$$
\operatorname{Re}(A)=\frac{A+A^*}{2}
$$
e facendo la trasposta coniugata:
$$
\operatorname{Re}(A)^*
=
\left(\frac{A+A^*}{2}\right)^*
=
\frac{A^*+(A^*)^*}{2}
=
\frac{A^*+A}{2}
=
\operatorname{Re}(A)
$$
quindi $\operatorname{Re}(A)$ è hermitiana
dobbiamo verificare che $Im(A)$ è hermitiana

$\operatorname{Im}(A)^*=\operatorname{Im}(A)$$

Partiamo da sinistra:
$$\operatorname{Im}(A)^* = \left(\frac{A-A^*}{2i}\right)^*$$
Possiamo vedere il fattore davanti $1/2i$ come uno scalare
$$\frac{1}{2i}(A-A^*)$$
Quindi:
$$\left(\frac{A-A^*}{2i}\right)^* = \left(\frac{1}{2i}(A-A^*)\right)^*$$
Ora usiamo la proprietà:
$$(\alpha B)^*=\overline{\alpha}B^*$$
Qui abbiamo che
$$\alpha=\frac{1}{2i}, \qquad B=A-A^*$$
Quindi sapendo questo possiamo scrivere che
$$\left(\frac{1}{2i}(A-A^*)\right)^* = \overline{\frac{1}{2i}}(A-A^*)^*$$
Ora calcoliamo i due pezzi.

Prima lo scalare moltiplichiamo e dividiamo per $i$ successivamente sappiamo che $i^2$ è -1 quindi otteniamo che
$$\frac{1}{2i}=-\frac{i}{2}$$
Quindi il suo coniugato è
$$\overline{\frac{1}{2i}} = \overline{-\frac{i}{2}} = \frac{i}{2}$$
Ma moltiplicando per -1 otteniamo che 
$$\frac{i}{2}=-\frac{1}{2i}$$
Quindi possiamo dire che
$$\overline{\frac{1}{2i}}=-\frac{1}{2i}$$
Adesso calcoliamo la matrice:
$$(A-A^*)^* = A^*-(A^*)^*$$
Poiché
$$(A^*)^*=A$$
otteniamo
$$(A-A^*)^* = A^*-A = -(A-A^*)$$
Allora ritornando alla formula completa abbiamo che
$$\operatorname{Im}(A)^* = \left(\frac{1}{2i}(A-A^*)\right)^*$$
ma avevamo calcolato che la parte coniugata trasposta di $1/2i$ è
$$= \overline{\frac{1}{2i}}(A-A^*)^*$$
e quindi abbiamo che 
$$= \left(-\frac{1}{2i}\right)\left(-(A-A^*)\right)$$

I due segni meno si cancellano:
$$= \frac{1}{2i}(A-A^*)$$
Quindi:
$$\operatorname{Im}(A)^* = \frac{A-A^*}{2i} = \operatorname{Im}(A)$$

Abbiamo dimostrato che
$\operatorname{Im}(A)$ è hermitiana
###### Condizioni per cui A è definita positiva
Dalla relazione precedente segue:
![[Pasted image 20260715120002.png]]

>[!tip] Il terzo passaggio vale perché $\operatorname{Re}(A)$ è hermitiana e dunque $x^*\operatorname{Re}(A)x$ è reale.
###### A è invertibile se definita positiva
se $A\in\mathbb{C}^{n\times n}$ è definita positiva, allora i suoi autovalori hanno parte reale positiva e di conseguenza $A$ è invertibile, perché $0$ non può essere un autovalore di $A$

sia $A\in\mathbb{C}^{n\times n}$ definita positiva e sia $\lambda$ un generico autovalore di $A$.
Allora esiste un autovettore
$$
x\in\mathbb{C}^n\setminus\{0\}
$$
associato a $\lambda$, cioè
$$
Ax=\lambda x
$$
moltiplichiamo a sinistra per $x^*$:
$$
x^*Ax=x^*(\lambda x)
$$
siccome $\lambda$ è uno scalare, posso portarlo fuori:
$$
x^*Ax=\lambda x^*x
$$
ma
$$
x^*x=\sum_{i=1}^n \overline{x_i}x_i=\sum_{i=1}^n |x_i|^2
$$
quindi
$$
x^*Ax=\lambda\sum_{i=1}^n |x_i|^2
$$
da cui
$$
\lambda=
\frac{x^*Ax}{\sum_{i=1}^n |x_i|^2}
$$
il denominatore è reale e strettamente positivo perché $x\neq 0$.
Ora prendiamo la parte reale:
$$
\operatorname{Re}(\lambda)
=
\frac{\operatorname{Re}(x^*Ax)}{\sum_{i=1}^n |x_i|^2}
$$
siccome $A$ è definita positiva,
$$
\operatorname{Re}(x^*Ax)>0
$$
e siccome il denominatore è positivo, otteniamo
$$
\operatorname{Re}(\lambda)>0
$$
questo perché se un numero complesso ha parte reale positiva, dividendo per un numero reale positivo la parte reale resta positiva.

Infatti se
$$
z=\alpha+i\beta
$$
con $\alpha>0$ e $r>0$, allora
$$
\frac{z}{r}=\frac{\alpha}{r}+i\frac{\beta}{r}
$$
e quindi
$$
\operatorname{Re}\left(\frac{z}{r}\right)=\frac{\alpha}{r}>0
$$
dunque tutti gli autovalori di $A$ hanno parte reale positiva. In particolare nessun autovalore può essere $0$, quindi $A$ è invertibile.


#### TEOREMA 3.1
sia $A\in\mathbb{C}^{n\times n}$ una matrice hermitiana e siano $A_1,A_2,\ldots,A_n$ le sue sottomatrici principali di testa
$$
A=
\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots & & \vdots\\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{pmatrix}
$$
allora le sue sottomatrici di testa sono
$$
A_1=
\begin{pmatrix}
a_{11}
\end{pmatrix}
$$
$$
A_2=
\begin{pmatrix}
a_{11} & a_{12}\\
a_{21} & a_{22}
\end{pmatrix}
$$
$$
A_3=
\begin{pmatrix}
a_{11} & a_{12} & a_{13}\\
a_{21} & a_{22} & a_{23}\\
a_{31} & a_{32} & a_{33}
\end{pmatrix}
$$
e così via fino a
$$
A_n=A
$$
Allora, se $A$ è hermitiana, le seguenti condizioni sono equivalenti:
1. $A$ è definita positiva quindi $Re(x^*Ax)>0$ 
2. $x^*Ax>0$ per ogni $x\in\mathbb{C}^n\setminus\{0\}$
3. gli autovalori di $A$ sono reali e positivi
4. $\det(A_k)>0$ per ogni $k=1,\ldots,n$
##### Dimostrazione
si vuole iniziare con la dimostrazione che la proprietà 1 vale se e solo se vale la proprietà 2
 $1\iff 2$

siccome $A$ è hermitiana, sappiamo che
$$
x^*Ax\in\mathbb{R}
$$
per ogni $x\in\mathbb{C}^n$.

Quindi

$$
\operatorname{Re}(x^*Ax)=x^*Ax
$$

Allora dire che $A$ è definita positiva significa dire

$$
\operatorname{Re}(x^*Ax)>0
$$

per ogni $x\neq 0$, ma visto che $x^*Ax$ è reale allora questo è equivalente a dire
$$
x^*Ax>0
$$
per ogni $x\neq 0$.

vogliamo ora dimostrare che $1\Rightarrow 3$

supponiamo che $A$ sia hermitiana e definita positiva.

Sappiamo già che gli autovalori di una matrice hermitiana sono reali

Dobbiamo dimostrare che sono anche positivi

Sia $\lambda$ un autovalore di $A$ e sia
$$
x\in\mathbb{C}^n\setminus\{0\}
$$
un autovettore associato, quindi abbiamo che
$$
Ax=\lambda x
$$
moltiplichiamo per $x^*$ a sinistra e a destra
$$
x^*Ax=x^*(\lambda x)=\lambda x^*x
$$

quindi sapendo che $x^*x$ è uguale alla sommatoria dopo lambda possiamo scrivere che
$$
x^*Ax=\lambda\sum_{i=1}^n |x_i|^2
$$
da cui possiamo isolare lambda e ottenere
$$
\lambda=
\frac{x^*Ax}{\sum_{i=1}^n |x_i|^2}
$$
siccome $A$ è definita positiva e hermitiana, abbiamo
$$
x^*Ax>0
$$
e siccome
$$
\sum_{i=1}^n |x_i|^2>0
$$
perché x è un vettore non nullo quindi in almeno una posizione non abbiamo 0
otteniamo

$$
\lambda>0
$$
quindi gli autovalori sono sia reali che positivi
#### Esercizio 3.4
Sia $A \in \mathbb{C}^{n \times n}$ una matrice hermitiana definita positiva
Si vuole dimostrare che gli elementi diagonali di $A$ sono tutti positivi ovvero
$$
a_{ii}>0
\qquad \text{per ogni } i=1,\dots,n.
$$
Prendiamo il vettore ($e_i$) della base canonica di $\mathbb{C}^n$ 
- cioè il vettore che ha $(1)$ nella posizione (i)-esima e (0) in tutte le altre posizioni.
Poiché ($A$) è definita positiva, per ogni vettore non nullo $(x)$ sappiamo la seguente proprietà
per ogni x non nullo vale che 
$$x^*Ax>0.$$
In particolare possiamo scegliere come autovettore proprio il vettore della base canonica
$$x=e_i$$
Quindi
$$e_i^*Ae_i>0$$
Ora vediamo quanto vale questo prodotto
Calcoliamo ora il prodotto $e_i^*Ae_i$
Prima calcoliamo

$Ae_i$
Poiché ($e_i$) ha tutti zeri tranne un ($1$) nella posizione ($i$)-esima, il prodotto ($Ae_i$) seleziona la colonna ($i$)-esima di (A):
$$Ae_i=  
\begin{pmatrix}  
a_{1i}\  
a_{2i}\  
\vdots\  
a_{ii}\  
\vdots\  
a_{ni}  
\end{pmatrix}.  $$
Ora moltiplichiamo a sinistra per ($e_i^*$).
Essendo ($e_i$) formato soltanto da numeri reali, il suo trasposto coniugato è
$$
e_i^*=  
\begin{pmatrix}  
0&\cdots&0&1&0&\cdots&0  
\end{pmatrix}.  
$$
Quindi
$$
\begin{pmatrix}  
0&\cdots&0&1&0&\cdots&0  
\end{pmatrix}  
\begin{pmatrix}  
a_{1i}\  
a_{2i}\  
\vdots\  
a_{ii}\  
\vdots\  
a_{ni}  
\end{pmatrix}.  
$$
Eseguendo il prodotto scalare, tutti i termini vengono moltiplicati per (0), tranne la componente (i)-esima, che viene moltiplicata per (1):
$$0\cdot a_{1i}  
+\cdots+  
1\cdot a_{ii}  
+\cdots+  
0\cdot a_{ni}.  
]$$
Pertanto
$$
e_i^*Ae_i=a_{ii}.  
$$
Ma avevamo già ottenuto
$$ 
e_i^*Ae_i>0.  
$$
Quindi
$$
\boxed{a_{ii}>0}  
\qquad \text{per ogni } i=1,\ldots,n.  
$$
Poi $(e_i^*)$ seleziona la componente (i)-esima di questa colonna. Quindi
$$
e_i^*Ae_i=a_{ii}.
$$
Pertanto
$$
a_{ii}=e_i^*Ae_i>0.
$$
Essendo $(i)$ arbitrario, concludiamo che
$$
a_{ii}>0
\qquad
\forall i=1,\dots,n.
$$
In generale si possono usare due indici $i,j\in{1,...,n}$
$$
e_i^*Ae_j=a_{ij}.
$$
Infatti $(Ae_j)$ seleziona la colonna $(j)-esima$, mentre $(e_i^*)$ ne seleziona la componente $(i)$-esima. Ponendo $(j=i)$, otteniamo proprio un elemento diagonale
$$e_i^*Ae_i=a_{ii}$$
##### Polinomi di matrici
Sia
$$
p(\lambda)=a_0+a_1\lambda+a_2\lambda^2+\cdots+a_m\lambda^m
$$

un polinomio a coefficienti complessi, cioè
$$a_1,\ldots,a_m\in\mathbb{C}$$
Usiamo la variabile $\lambda$ perché nel contesto delle matrici è naturale collegarsi agli autovalori, ma formalmente è solo una variabile
Sia ora
$$A\in\mathbb{C}^{n\times n}$$

una matrice quadrata. Definiamo il polinomio $p$ applicato alla matrice $A$ ponendo
$$p(A)=a_0I+a_1A+a_2A^2+\cdots+a_mA^m$$
In pratica, sostituiamo la matrice $A$ alla variabile $\lambda$ Il termine costante $a_0$​ diventa $a_0I$ perché dobbiamo sommare matrici della stessa dimensione.
Poiché
$$A,A^2,\ldots,A^m$$

sono tutte matrici $n\times n$ e i coefficienti $a_i$ sono scalari, anche $p(A)$ è una matrice $n\times n$
Quindi
$$p(A)\in\mathbb{C}^{n\times n}$$

#### TEOREMA 3.2
sia $p(\lambda)$ un polinomio e sia $A\in\mathbb{C}^{n\times n}$ una matrice con autovalori
$$
\lambda_1,\ldots,\lambda_n
$$
allora gli autovalori di $p(A)$ sono
$$
p(\lambda_1),\ldots,p(\lambda_n)
$$
con $p(A)=a_0I+a_1A+a_2A^2+...+a_nA^n$
##### Dimostrazione
questa dimostrazione la dimostriamo soltanto in 3 casi

- caso 1
partiamo dal caso più semplice, cioè il caso in cui il polinomio $p$ è costante e non dipende da $\lambda$ 

$p(\lambda)=a_0$
In tal caso
$$
p(A)=a_0I
$$
quindi abbiamo la matrice di $p(A)$ con solo i valori $a_0$ in diagonale
$$
p(A)=
\begin{pmatrix}
a_0 & 0 & \cdots & 0\\
0 & a_0 & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & a_0
\end{pmatrix}
$$
gli autovalori di questa matrice sono tutti
$$
a_0,\ldots,a_0
$$
ripetuto $n$ volte

Questo coincide con
$$
p(\lambda_1),\ldots,p(\lambda_n)
$$
perché, essendo $p$ costante, vale
$$
p(\lambda_i)=a_0
$$
per ogni $i$.
quindi caso 1 verificato

- caso 2
per il caso 2 vediamo invece he il nostro polinomio $p$ è di grado $1$ definito come

$p(\lambda)=a_0+a_1\lambda$ 

Qui assumiamo $a_1\neq 0$, altrimenti ricadiamo nel caso 1 descritto in precedenza

In questo caso il polinomio valutato in $A$ sarebbe
$$
p(A)=a_0I+a_1A
$$

ora per determinare gli autovalori di $p(A)$ definiamo il suo polinomio caratteristico di $p(A)$, valutato in $\lambda$               $\forall \lambda \in \mathbb{C}$
$$
C_{p(A)}(\lambda)=\det(\lambda I-p(A))
$$
sostituendo $p(A)$ abbiamo
$$
C_{p(A)}(\lambda)=\det(\lambda I-(a_0I+a_1A))
$$
raccogliendo i primi due termini per $I$:
$$
C_{p(A)}(\lambda)=\det((\lambda-a_0)I-a_1A)
$$
ora raccogliamo $a_1$
$$
(\lambda-a_0)I-a_1A
=
a_1\left(\frac{\lambda-a_0}{a_1}I-A\right)$$
quindi
$$
C_{p(A)}(\lambda)
=
\det\left(a_1\left(\frac{\lambda-a_0}{a_1}I-A\right)\right)
$$
ricordiamo la seguente proprietà del determinante ovvero che, per ogni $\alpha\in\mathbb{C}$ e ogni $B\in\mathbb{C}^{n\times n}$,
$$
\det(\alpha B)=\alpha^n\det(B)
$$
perciò
$$
C_{p(A)}(\lambda)
=
a_1^n\det\left(\frac{\lambda-a_0}{a_1}I-A\right)
$$
ma questo determinante si può riconoscere come il polinomio caratteristico di A valutato in quel determinato punto che possiamo chiamare $z$ 
$$
z=\frac{\lambda-a_0}{a_1}
$$
per cui il polinomio caratteristico di A valutato in z può essere definito come
$$
C_A(z)=\det(zI-A)
$$
quindi, mettendo questo come sostituzione

otteniamo
$$
C_{p(A)}(\lambda)
=
a_1^n C_A\left(\frac{\lambda-a_0}{a_1}\right)
$$
gli autovalori di $p(A)$ sono gli zeri del suo polinomio caratteristico che in insiemistica possiamo definire questi autovalori come:
$$
\{\lambda\in\mathbb{C}:C_{p(A)}(\lambda)=0\}
$$
quindi possiamo dire che il polinomio caratteristico di $p(A)$ valutato in $\lambda$ è uguale a 0 se e solo se il polinomio caratteristico di A valutato in quel punto $z$ è uguale a 0
$$
C_{p(A)}(\lambda)=0
\iff
C_A\left(\frac{\lambda-a_0}{a_1}\right)=0
$$
il polinomio caratteristico di $A$ si annulla quando il suo argomento è uno degli autovalori di $A$

Quindi
$$
\frac{\lambda-a_0}{a_1}\in\{\lambda_1,\ldots,\lambda_n\}
$$
cioè
$$
\frac{\lambda-a_0}{a_1}=\lambda_i
$$
per qualche $i$.

Da qui possiamo risolvere rispetto a lambda ottenendo che
$$
\lambda=a_0+a_1\lambda_i
$$

quindi gli autovalori di $p(A)$ sono
$$
a_0+a_1\lambda_1,\ldots,a_0+a_1\lambda_n
$$
ma visto che $p(\lambda_i)=a_0+a_1\lambda_i$  allora questi sono proprio i vari polinomi valutati negli autovalori
$$
p(\lambda_1),\ldots,p(\lambda_n)
$$

- caso 3
assumiamo che $A$ sia diagonalizzabile

Allora sappiamo che esistono una matrice invertibile
$$
X\in\mathbb{C}^{n\times n}
$$
e una matrice diagonale
$$
D=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)
$$
con gli autovalori di $A$ sulla diagonale, tali che
$$
A=XDX^{-1}
$$
Allora
$$
A^2=(XDX^{-1})(XDX^{-1})
$$
ma visto che
$$
X^{-1}X=I
$$
otteniamo
$$
A^2=XD^2X^{-1}
$$
stessa cosa per $A^3$
$$
A^3=(XDX^{-1})(XDX^{-1})(XDX^{-1})=XD^3X^{-1}
$$
e in generale per ogni $k\geq 1$ possiamo dire che
$$
A^k=XD^kX^{-1}
$$
Per $k=0$, ricordiamo che invece abbiamo
$$
A^0=I
$$
e si può scrivere anche
$$
I=XIX^{-1}
$$

vogliamo dimostrare il risultato per un certo polinomio fissato definito come
$$
p(\lambda)=a_0+a_1\lambda+\cdots+a_m\lambda^m
$$
il polinomio valutato per la matrice sarà
$$
p(A)=a_0I+a_1A+a_2A^2+\cdots+a_mA^m
$$
sostituiamo le potenze di $A$ usando la diagonalizzazione:
$$
p(A)=a_0XIX^{-1}+a_1XDX^{-1}+a_2XD^2X^{-1}+\cdots+a_mXD^mX^{-1}
$$
raccogliamo $X$ a sinistra e $X^{-1}$ a destra:
$$
p(A)=X(a_0I+a_1D+a_2D^2+\cdots+a_mD^m)X^{-1}
$$
la matrice al centro è proprio il polinomio valutato per la matrice $D$
$$
p(D)
$$
quindi
$$
p(A)=Xp(D)X^{-1}
$$
Ora verifichiamo com’è fatto davvero $p(D)$
Siccome D è la matrice che in diagonale ha gli autovalori
$$
D=
\begin{pmatrix}
\lambda_1 & 0 & \cdots & 0\\
0 & \lambda_2 & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & \lambda_n
\end{pmatrix}
$$

allora abbiamo D alla seconda come matrice con in diagonale gli autovalori alla seconda
$$
D^2=
\begin{pmatrix}
\lambda_1^2 & 0 & \cdots & 0\\
0 & \lambda_2^2 & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & \lambda_n^2
\end{pmatrix}
$$
e in generale alla m
$$
D^m=
\begin{pmatrix}
\lambda_1^m & 0 & \cdots & 0\\
0 & \lambda_2^m & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & \lambda_n^m
\end{pmatrix}
$$
quindi il polinomio valutato in D sarà definito proprio come
$$
p(D)=a_0I+a_1D+a_2D^2+\cdots+a_mD^m
$$
visto che la loro somma è di matrici diagonali allora anche la loro somma sarà diagonale
infatti abbiamo una matrice con ogni elemento diagonale è definito dal polinomio valutato per un certo $\lambda_i$
$$
p(D)=
\begin{pmatrix}
a_0+a_1\lambda_1+a_2\lambda_1^2+\cdots+a_m\lambda_1^m & 0 & \cdots & 0\\
0 & a_0+a_1\lambda_2+a_2\lambda_2^2+\cdots+a_m\lambda_2^m & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & a_0+a_1\lambda_n+a_2\lambda_n^2+\cdots+a_m\lambda_n^m
\end{pmatrix}
$$
scritto in modo più tranquillo abbiamo che

$$
p(D)=
\begin{pmatrix}
p(\lambda_1) & 0 & \cdots & 0\\
0 & p(\lambda_2) & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & p(\lambda_n)
\end{pmatrix}
$$

ora abbiamo dimostrato che
$$
p(A)=Xp(D)X^{-1}
$$

visto questo e visto che $p(D)$ ha come elementi diagonali proprio il polinomio dei vari lambda
e che $p(A)$ come è scritto sopra ovvero come prodotto di x e $p(D)$
visto che $p(D)$ è diagonale allora gli autovalori di $p(A)$ sono proprio gli elementi diagonali di $p(D)$ 
$$\square$$

##### Grafi
prima di parlare di Matrici irriducibili definiamo brevemente cosa rappresenta esattamente un grafo

Un grafo è un diagramma formato da un certo numero di nodi e da un certo numero di archi
Un arco è una freccia che va da un nodo a un altro in modo orientato
l’arco che va da $i$ a $j$ viene denotato con
$$
i\to j
$$
Un cammino all’interno di un grafo è un percorso che parte da un nodo $i$ e arriva a un nodo $j$ seguendo gli archi del grafo
Se il nodo di arrivo $j$ coincide con il nodo di partenza $i$, allora il cammino si chiama anche ciclo
- un grafo è fortemente connesso se vale una delle seguenti due condizioni equivalenti:
	- 1. per ogni coppia di nodi $i$ e $j$ esiste un cammino nel grafo che va da $i$ a $j$
	- 2. esiste un ciclo nel grafo che tocca tutti i nodi
dimostriamo che sono equivalenti:
Se per ogni coppia di nodi esiste un cammino, possiamo concatenare un cammino da $1$ a $2$, da $2$ a $3$, e così via, fino a tornare da $n$ a $1$. Otteniamo così un ciclo che tocca tutti i nodi.

Viceversa, se esiste un ciclo che tocca tutti i nodi, fissati due nodi qualsiasi $i$ e $j$, basta partire da $i$ e seguire il ciclo fino a raggiungere $j$

##### Grafo associato alla matrice
per grafo associato alla matrice si intende un grafo che data una matrice
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
##### Matrici irriducibili
$A\in\mathbb{C}^{n\times n}$ si dice irriducibile se il suo grafo associato è fortemente connesso
Quindi:
$$
A \text{ irriducibile}
\Longleftrightarrow
\text{il grafo associato ad } A \text{ è fortemente connesso}
$$
##### Localizzazione degli autovalori
Per localizzare gli autovalori utilizziamo i cerchi di Gershgorin nel piano complesso indicando con
$$
\mathcal{C}(z_0,r)=\{z\in\mathbb{C}: |z-z_0|\leq r\}
$$
un cerchio in $\mathbb{C}$ di centro $z_0\in\mathbb{C}$ e raggio $r\geq 0$.
Ricordando che
$$
|z-z_0|
$$
è la distanza tra un punto $z$ e il centro $z_0$

 $\mathcal{C}(z_0,r)$ è l’insieme di tutti i punti del piano complesso che distano da $z_0$ al massimo $r$
 
Sia allora definita una matrice
$$
A\in\mathbb{C}^{n\times n}
$$
i cerchi di Gershgorin di $A$ sono i cerchi
$$
K_1,\ldots,K_n
$$
definiti come
Per ogni $i=1,\ldots,n$,
$$
K_i=\mathcal{C}\left(a_{ii},\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|\right)
$$
quindi $K_i$ è il cerchio con:
- centro $a_{ii}$
- raggio $\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|$
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

#### TEOREMA 3.3 primo teorema di Gershgorin
Gli autovalori di una matrice
$$
A\in\mathbb{C}^{n\times n}
$$
stanno tutti nell’unione dei cerchi di Gershgorin di $A$.

Cioè, se $\lambda$ è un autovalore di $A$, allora

$$
\lambda\in K_1\cup K_2\cup\cdots\cup K_n
$$

questo si dice localizzazione degli autovalori, perché abbiamo identificato una regione del piano complesso dentro cui stanno tutti gli autovalori
##### Dimostrazione
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

Due vettori sono uguali se e solo se sono uguali componente per componente, quindi possiamo scrivere quello sopra come
$$
(Au)_i=(\lambda u)_i
$$
per ogni $i=1,\ldots,n$
Ma sappiamo che la componente i esima del vettore $Au$ si ottiene facendo il prodotto scalare per la riga $i$ di $A$ e il vettore $u$
$$
(Au)_i=\sum_{j=1}^n a_{ij}u_j
$$
e a destra scriviamo che
$$
(\lambda u)_i=\lambda u_i
$$
quindi
$$
\sum_{j=1}^n a_{ij}u_j=\lambda u_i
$$

per ogni $i=1,\ldots,n$.

Scegliamo un certo indice $i\in\{1,\ldots,n\}$ tale che $u$ sia una componente di modulo massimo, cioè
$$
|u|=\max\{|u_1|,\ldots,|u_n|\}
$$
siccome $u\neq 0$, almeno una componente di $u$ è diversa da zero, quindi

$$
|u_{i_0}|>0
$$

Ora prendiamo l’equazione corrispondente all’indice $i$ scelto:

$$
\sum_{j=1}^n a_{ij}u_j=\lambda u_{i}
$$

separiamo dalla sommatoria il termine con $j=i$ per cui abbiamo come somma a se stante l'elemento diagonale di $a$ e $u_i$

$$
a_{ii}u_{i}+\sum_{\substack{j=1\\j\neq i}}^n a_{ij}u_j=\lambda u_{i}
$$
portiamo il termine con $\lambda u_{i}$ dall’altra parte e raccogliamo per $u_i$
$$
(\lambda-a_{ii})u_{i}
=
\sum_{\substack{j=1\\j\neq i}}^n a_{ij}u_j
$$
ora facciamo il modulo di entrambi i membri:
$$
|\lambda-a_{i_0i_0}||u_{i_0}|
=
\left|
\sum_{\substack{j=1\\j\neq i_0}}^n a_{i_0j}u_j
\right|
$$
per la disuguaglianza triangolare possiamo dire che:
$$
\left|
\sum_{\substack{j=1\\j\neq i}}^n a_{ij}u_j
\right|
\leq
\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}u_j|
$$
e possiamo separare il prodotto nel modulo come due moduli per proprietà dei moduli per cui
$$
|a_{ij}u_j|=|a_{ij}||u_j|$$
otteniamo
$$
|\lambda-a_{ii}||u_{i}|
\leq
\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}||u_j|
$$
ma abbiamo che $|u_{i}|$ è il massimo tra i moduli delle componenti di $u$, quindi
$$
|u_j|\leq |u_{i}|
$$
per ogni $j$

Allora possiamo porre il seguente bound
$$
\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}||u_j|
\leq
\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}||u_{i}|
$$
portiamo fuori $|u_{i}|$ e ci rimane che
$$
|\lambda-a_{ii}||u_{i}|
\leq
|u_{i}|\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|
$$
siccome $|u_{i}|>0$, possiamo moltiplicare per $1/|u_i|$
$$
|\lambda-a_{ii}|
\leq
\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|
$$

ma $a_{ii}$ è il centro del cerchio di Gershgorin $K_{i}$ e invece
$$
\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|
$$
è il suo raggio

Quindi sappiamo che la distanza dal centro di lambda è minore o uguale del raggio del cerchio di Gershgorin $K_i$
$$
|\lambda-a_{ii}|\leq r_{i}
$$

cioè $\lambda$ dista dal centro $a_{i_0i_0}$ una quantità minore o uguale al raggio.
Dunque
$$
\lambda\in K_{i}
$$
e quindi $\lambda$ sta nell’unione dei cerchi di Gershgorin

#### TEOREMA 3.4 secondo teorema di Gershgorin
Supponendo che l’unione di $k$ cerchi di Gershgorin di $A \in \mathbb{C}^{n \times n}$ sia disgiunta dall’unione degli altri $n-k$ cerchi

Allora $k$ autovalori di $A$ stanno nella prima unione e $n-k$ autovalori stanno nella seconda unione
#### Teorema 3.5 terzo teorema di Gershgorin(forte)
supponiamo che

$$
A\in\mathbb{C}^{n\times n}
$$
sia irriducibile.
Allora i punti che stanno sul bordo di quei cerchi di Gershgorin a cui appartengono, ma non sul bordo di tutti i cerchi, non sono autovalori di $A$
![[Pasted image 20260729112808.png]]
#### TEOREMA 3.6 terzo teorema di Gershgorin(debole)
supponiamo che
$$
A\in\mathbb{C}^{n\times n}
$$
sia irriducibile e sia $B$ il bordo dell’unione dei cerchi di Gershgorin
Allora i punti di $B$ che non stanno sul bordo di tutti i cerchi non sono autovalori di $A$ 
##### Dimostrazione
ogni punto di $B$ sta nei bordi dell'unione dei cerchi, quindi soddisfa le ipotesi del 3 teorema di Gershgorin forte
quindi ogni punto di $B$ è escluso dagli autovalori di A
##### Matrice a diagonale dominante
Sia $A\in\mathbb{C}^{n\times n}$ una matrice.
Si dice che $A$ è a **diagonale dominante per righe** se valgono queste due condizioni:
- 1. in ogni riga, il modulo dell’elemento diagonale è maggiore o uguale della somma dei moduli degli elementi fuori diagonale
$$
|a_{ii}|\geq \sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|
\qquad \forall i=1,\ldots,n
$$

- 2. almeno in una riga la disuguaglianza è stretta

esiste almeno un indice $k\in\{1,\ldots,n\}$ tale che
$$
|a_{kk}|>\sum_{\substack{j=1\\j\neq k}}^n |a_{kj}|
$$

La prima condizione si può interpretare con i cerchi di Gershgorin.
Ricordiamo che il cerchio $K_i$ ha centro $a_{ii}$ e raggio
$$
r_i=\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|
$$
quindi la condizione
$$
|a_{ii}|\geq r_i
$$
significa che la distanza del centro $a_{ii}$ dall’origine è maggiore o uguale del raggio del cerchio.


Si dice invece che $A$ è a **diagonale dominante in senso stretto** per righe se

$$
|a_{ii}|>\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|
\qquad \forall i=1,\ldots,n
$$
cioè la disuguaglianza è stretta per tutte le righe

**PER COLONNE**
Per colonne specifichiamo invece che $A$ è a diagonale dominante per colonne se:
- 1. in ogni colonna, il modulo dell’elemento diagonale è maggiore o uguale della somma dei moduli degli elementi fuori diagonale della stessa colonna

$$
|a_{jj}|\geq \sum_{\substack{i=1\\i\neq j}}^n |a_{ij}|
\qquad \forall j=1,\ldots,n
$$

Questa condizione riguarda i cerchi di Gershgorin per colonna.
- 2. cioè almeno in una colonna la disuguaglianza è stretta
esiste almeno un indice $k\in\{1,\ldots,n\}$ tale che

$$
|a_{kk}|>\sum_{\substack{i=1\\i\neq k}}^n |a_{ik}|
$$

Si dice invece che $A$ è a **diagonale dominante in senso stretto per colonne** se

$$
|a_{jj}|>\sum_{\substack{i=1\\i\neq j}}^n |a_{ij}|
\qquad \forall j=1,\ldots,n
$$
#### TEOREMA 3.7
Sia una matrice $A\in\mathbb{C}^{n\times n}$ tale che soddisfi almeno una delle seguenti condizioni:

1. $A$ è a diagonale dominante per righe e irriducibile
2. $A$ è a diagonale dominante in senso stretto per righe
3. $A$ è a diagonale dominante per colonne e irriducibile
4. $A$ è a diagonale dominante in senso stretto per colonne

Allora $A$ è invertibile
##### Dimostrazioni
##### Dimostrazione 1

Supponiamo che $A$ sia a diagonale dominante per righe e irriducibile
Vogliamo dimostrare che $A$ è invertibile

Ricordiamo che una matrice è invertibile se e solo se $0$ non è un suo autovalore
Quindi per farlo dimostriamo che $0$ non è autovalore di $A$, usando il terzo teorema di Gershgorin forte

Verifichiamo che $0$ soddisfa le ipotesi del terzo teorema di Gershgorin forte
- $0$ sta sul bordo di quei cerchi di Gershgorin a cui appartiene

visto che $A$ è a diagonale dominante per righe

Infatti, per ogni $i$ abbiamo che il modulo dell'elemento in diagonale è maggiore uguale del raggio
$$
|a_{ii}|\geq r_i
$$
dove il raggio è definito come
$$
r_i=\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|
$$
Quindi $0$ non può stare dentro nessun cerchio $K_i$
sappiamo infatti che essendo A diagonale dominante per righe
esiste almeno un indice $k$ tale che il modulo dell'elemento in diagonale è strettamente maggiore del raggio $r_k$ 
$$
|a_{kk}|>r_k
$$
quindi $0$ sta fuori dal cerchio di Gershgorin $K_k$, non sul bordo

Quindi $0$ non sta sul bordo di tutti i cerchi
- inoltre $A$ è irriducibile per ipotesi

Sono quindi soddisfatte le ipotesi del terzo teorema di Gershgorin forte
Perciò $0$ non è autovalore di $A$
Quindi $A$ è invertibile
$$
\square
$$
##### Dimostrazione 2
Supponiamo che $A$ sia a diagonale dominante in senso stretto per righe.
Allora per ogni $i=1,\ldots,n$ vale che il modulo dell'elemento diagonale e  maggiore del raggio $r_i$
$$
|a_{ii}|>\sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|
$$
cioè
$$
|a_{ii}|>r_i
$$

dove $r_i$ è il raggio del cerchio di Gershgorin $K_i$.

Questo significa che la distanza di $0$ dal centro $a_{ii}$ è maggiore del raggio

Quindi $0$ sta fuori da ogni cerchio di Gershgorin $K_i$.

Per il primo teorema di Gershgorin, tutti gli autovalori di $A$ stanno nell’unione dei cerchi:
$$
K_1\cup\cdots\cup K_n
$$
ma $0$ non appartiene a nessuno di questi cerchi, quindi $0$ non può essere autovalore di $A$

Allora $A$ è invertibile.
$$
\square
$$
##### Dimostrazione 3
Supponiamo che $A$ sia a diagonale dominante per colonne e irriducibile

Dire che $A$ è a diagonale dominante per colonne equivale a dire che $A^T$ è a diagonale dominante per righe.

Infatti le colonne di $A$ diventano le righe di $A^T$

Inoltre $A$ è irriducibile se e solo se $A^T$ è irriducibile.

Quindi $A^T$ è a diagonale dominante per righe e irriducibile

Per la dimostrazione del caso 1, applicata ad $A^T$, otteniamo che $A^T$ è invertibile

Ma
$$
\det(A^T)=\det(A)
$$
quindi se $A^T$ è invertibile, allora anche $A$ è invertibile
$$
\square
$$
##### Dimostrazione 4
Dimostrazione della quarta ipotesi.
Supponiamo che $A$ sia a diagonale dominante in senso stretto per colonne

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
##### Norme Vettoriali
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
Allo stesso modo, data una norma vettoriale
$$
\|\cdot\|:\mathbb{C}^n\to\mathbb{R}
$$
definiamo la distanza tra due vettori $x,y\in\mathbb{C}^n$ come
$$
\|x-y\|
$$

###### Definiamo norme $1$, $2$ e infinito
Dato un vettore
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
norma $1$ come la soma dei moduli di quel vettore:
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


###### Equivalenza delle norme vettoriali
#### TEOREMA 3.8
Tutte le norme vettoriali in $\mathbb{C}^n$ sono equivalenti.

Questo significa che, se prendiamo due norme qualsiasi
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
per ogni $x\in\mathbb{C}^n$
##### Vediamo un esempio
Verifichiamo che la norma $1$ e la norma infinito sono equivalenti
Per ogni $x\in\mathbb{C}^n$ sappiamo che vale che 
$$
\|x\|_\infty\leq \|x\|_1\leq n\|x\|_\infty
$$
Infatti:
- $\|x\|_\infty\leq \|x\|_1$, perché il massimo dei moduli delle componenti è sicuramente minore o uguale della somma di tutti i moduli
- $\|x\|_1\leq n\|x\|_\infty$, perché ogni componente soddisfa
$$
|x_i|\leq \|x\|_\infty
$$
quindi possiamo porre la norma 1 come minore uguale della somma delle norme di x infinito per n volte
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
dalla seconda disuguaglianza divido per n da una parte e l'altra e ottengo
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

#### Successioni di vettori
Una successione di vettori

$$
x^{(0)},x^{(1)},x^{(2)},\ldots
$$

in $\mathbb{C}^n$ si dice convergente al vettore $x\in\mathbb{C}^n$ rispetto alla norma $\|\cdot\|$ se
$$ lim_{k->\infty}
\|x^{(k)}-x\|\to 0
$$

Il teorema di equivalenza delle norme ci permette di dire che, poiché tutte le norme sono equivalenti in $\mathbb{C}^n$, se una successione di vettori converge a $x$ rispetto a una norma, allora converge a $x$ rispetto a tutte le norme
##### Dimostrazione
Supponiamo che
$$
x^{(k)}\to x
$$
rispetto alla norma $\|\cdot\|$

Questo significa che
$$
\|x^{(k)}-x\|\to 0
$$
Sia $\|\cdot\|'$ un’altra norma

Poiché le due norme sono equivalenti, esistono due costanti positive $\alpha,\beta>0$ tali che

$$
\alpha\|y\|\leq \|y\|'\leq \beta\|y\|
$$

per ogni $y\in\mathbb{C}^n$

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
Per il teorema del confronto, o teorema dei carabinieri, otteniamo che anche al centro
$$
\|x^{(k)}-x\|'\to 0
$$
quindi l'ipotesi è valida
$$
x^{(k)}\to x
$$


##### Successione di vettori convergente componente per componente
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
vale che ogni componente del vettore nella successione k esima x di quell'elemento converge alla componente corrispondente di x
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

Questo è equivalente a dire che la massima distanza tra una componente di $x^{(k)}$ e la componente corrispondente di $x$ tende a zero
$$
\max_{i=1,\ldots,n}|x_i^{(k)}-x_i|\to 0
$$
ma è proprio la norma infinito
$$
\max_{i=1,\ldots,n}|x_i^{(k)}-x_i|
=
\|x^{(k)}-x\|_\infty
$$
quindi la convergenza componente per componente coincide con la convergenza rispetto alla norma infinito

Allora, ricordando l’equivalenza di tutte le norme in $\mathbb{C}^n$, dire
$$
x^{(k)}\to x
$$
componente per componente è lo stesso che dire rispetto a una qualsiasi norma vettoriale abbiamo una convergenza componente per componente
$$
x^{(k)}\to x
$$
##### Norme matriciali
Si vuole introdurre un concetto di distanza sullo spazio delle matrici per misurare la vicinanza tra due matrici
$$
A,B\in\mathbb{C}^{n\times n}
$$
Una funzione
$$
\|\cdot\|:\mathbb{C}^{n\times n}\to\mathbb{R}
$$
si dice norma matriciale se soddisfa le seguenti proprietà:
a) positività
$$
\|A\|\geq 0
\qquad \forall A\in\mathbb{C}^{n\times n}
$$
e
$$
\|A\|=0 \iff A=0
$$
b) omogeneità
$$
\|\alpha A\|=|\alpha|\|A\|
\qquad \forall \alpha\in\mathbb{C},\ \forall A\in\mathbb{C}^{n\times n}
$$
c) disuguaglianza triangolare
$$
\|A+B\|\leq \|A\|+\|B\|
\qquad \forall A,B\in\mathbb{C}^{n\times n}
$$
Data una norma matriciale
$$
\|\cdot\|:\mathbb{C}^{n\times n}\to\mathbb{R}
$$
definiamo la distanza tra due matrici $A,B\in\mathbb{C}^{n\times n}$ come
$$
\|A-B\|
$$
Un modo intuitivo per definire una norma matriciale su $\mathbb{C}^{n\times n}$ consiste nell’interpretare una matrice $A$ come un vettore di $n^2$ componenti e usare una norma vettoriale.

Per esempio, data

$$
A=(a_{ij})_{i,j=1}^n
$$

potremmo definire

$$
|A|_\infty=\max_{i,j=1,\ldots,n}|a_{ij}|
$$

Questa è analoga alla norma infinito per i vettori, perché prende il massimo tra i moduli di tutte le componenti della matrice
ma questa norma non è sub-moltiplicativa
Infatti non è detto che valga
$$
|AB|_\infty\leq |A|_\infty |B|_\infty
$$
per questo si introducono le
##### Norme matriciali INDOTTE
Data una norma vettoriale
$$
\|\cdot\|:\mathbb{C}^n\to\mathbb{R}
$$
e una matrice
$$
A\in\mathbb{C}^{n\times n}
$$
definiamo la norma matriciale indotta da quella norma vettoriale come
$$
\|A\|=\max_{x\in\mathbb{C}^n,\ x\neq 0}\frac{\|Ax\|}{\|x\|}
$$
cioè guardiamo quanto la matrice $A$ può “amplificare” un vettore $x$.

Questa formula si può riscrivere usando solo vettori di norma $1$
Poiché $x\neq 0$, abbiamo $\|x\|>0$, quindi possiamo dividere per $\|x\|$

posso scrivere la divisione spezzandola in un prodotto
$$\frac{\|Ax\|}{\|x\|} = \frac{1}{\|x\|}\|Ax\|$$
Ora uso una proprietà della norma:
$$\|\alpha v\|=|\alpha|\|v\|$$
Nel nostro caso prendiamo
$$\alpha=\frac{1}{\|x\|}, \qquad v=Ax$$
Siccome  $x\neq 0$ allora $\|x\|>0$

quindi
$$\left|\frac{1}{\|x\|}\right| = \frac{1}{\|x\|}$$
Allora posso scrivere:
$$\frac{1}{\|x\|}\|Ax\| = \left\|\frac{1}{\|x\|}Ax\right\|$$
Quindi abbiamo:
$$\frac{\|Ax\|}{\|x\|} = \left\|\frac{1}{\|x\|}Ax\right\|$$
Adesso uso la linearità della matrice $A$ Siccome 
$$\frac{1}{\|x\|}$$​ 
è uno scalare, posso portarlo dentro l’argomento di $A$:
$$\frac{1}{\|x\|}Ax = A\left(\frac{1}{\|x\|}x\right)$$
E abbiamo che
$$\frac{1}{\|x\|}x = \frac{x}{\|x\|}$$
Quindi:
$$\left\|\frac{1}{\|x\|}Ax\right\| = \left\|A\left(\frac{x}{\|x\|}\right)\right\|$$
Adesso si pone
$$y=\frac{x}{\|x\|}$$
E si osserva che
$$\|y\| = \left\|\frac{x}{\|x\|}\right\| = \frac{1}{\|x\|}$$
Quindi ogni rapporto
$$\frac{\|Ax\|}{\|x\|}$$​
può essere visto come $\|Ay\|$ con $y$ di norma $1$

Quindi si ottiene che:
$$\|A\| = \max_{x\neq 0}\frac{\|Ax\|}{\|x\|} = \max_{\|y\|=1}\|Ay\|$$

##### Teorema 3.9
Sia
$$
\|\cdot\|:\mathbb{C}^{n\times n}\to\mathbb{R}
$$
una norma matriciale indotta dalla norma vettoriale denotata con lo stesso simbolo $\|\cdot\|$ e siano 
$$
A,B\in\mathbb{C}^{n\times n}
$$

valgono le seguenti proprietà:

1. 

$$
\|I\|=1
$$

2. 

$$
\|Ax\|\leq \|A\|\|x\|
\qquad \forall x\in\mathbb{C}^n
$$

3. $\|A\|$ è la più piccola costante $C$ che soddisfa

$$
\|Ax\|\leq C\|x\|
\qquad \forall x\in\mathbb{C}^n
$$

4. submoltiplicatività:

$$
\|AB\|\leq \|A\|\|B\|
$$

5. il raggio spettrale è minore o uguale di ogni norma matriciale indotta:

$$
\rho(A)\leq \|A\|
$$

dove

$$
\rho(A)=\max\{|\lambda|:\lambda \text{ autovalore di } A\}
$$
##### Dimostrazioni
##### Dimostrazione 1
Per definizione di norma indotta,
$$
\|I\|=\max_{\|x\|=1}\|Ix\|
$$
ma
$$
Ix=x
$$
quindi
$$
\|I\|=\max_{\|x\|=1}\|x\|=1
$$
##### Dimostrazione 2

Per ogni $x\neq 0$ si ha

$$
\frac{\|Ax\|}{\|x\|}
\leq
\max_{y\neq 0}\frac{\|Ay\|}{\|y\|}
$$

per definizione di massimo.

Il termine a destra è proprio

$$
\|A\|
$$

quindi

$$
\frac{\|Ax\|}{\|x\|}\leq \|A\|
$$

moltiplicando per $\|x\|>0$ otteniamo

$$
\|Ax\|\leq \|A\|\|x\|
$$

Se invece $x=0$, allora

$$
\|A0\|=\|0\|=0
$$

e

$$
\|A\|\|0\|=0
$$

quindi la disuguaglianza diventa

$$
0\leq 0
$$

ed è vera.
##### Dimostrazione 3

Sia $C$ una costante tale che

$$
\|Ax\|\leq C\|x\|
$$

per ogni $x\in\mathbb{C}^n$.

Per ogni $x\neq 0$, dividendo per $\|x\|$, otteniamo

$$
\frac{\|Ax\|}{\|x\|}\leq C
$$

siccome questa disuguaglianza vale per ogni $x\neq 0$, vale anche per il massimo:

$$
\max_{x\neq 0}\frac{\|Ax\|}{\|x\|}\leq C
$$

ma

$$
\max_{x\neq 0}\frac{\|Ax\|}{\|x\|}=\|A\|
$$

quindi

$$
\|A\|\leq C
$$

Questo significa che $\|A\|$ è la più piccola costante possibile che soddisfa

$$
\|Ax\|\leq C\|x\|
$$
##### Dimostrazione 4
Per ogni $x\in\mathbb{C}^n$, usando il punto 2 due volte, abbiamo
$$
\|ABx\|=\|A(Bx)\|
\leq
\|A\|\|Bx\|
$$
e ancora
$$
\|Bx\|\leq \|B\|\|x\|
$$
quindi
$$
\|ABx\|
\leq
\|A\|\|B\|\|x\|
$$
Questo significa che la costante
$$
C=\|A\|\|B\|
$$
soddisfa
$$
\|ABx\|\leq C\|x\|
\qquad \forall x\in\mathbb{C}^n
$$
Per il punto 3, $\|AB\|$ è la più piccola costante con questa proprietà.
Quindi
$$
\|AB\|\leq \|A\|\|B\|
$$
##### Dimostrazione 5
Sia $\lambda$ un autovalore di $A$ tale che
$$
|\lambda|=\rho(A)
$$
e sia $x\neq 0$ un corrispondente autovettore.
Allora
$$
Ax=\lambda x
$$
quindi
$$
\|Ax\|=\|\lambda x\|
$$
per omogeneità della norma vettoriale,
$$
\|\lambda x\|=|\lambda|\|x\|
$$
quindi
$$
\|Ax\|=|\lambda|\|x\|
$$
cioè
$$
\|Ax\|=\rho(A)\|x\|
$$
dividendo per $\|x\|>0$,
$$
\rho(A)=\frac{\|Ax\|}{\|x\|}
$$
ma
$$
\frac{\|Ax\|}{\|x\|}
\leq
\max_{y\neq 0}\frac{\|Ay\|}{\|y\|}
=
\|A\|
$$
quindi
$$
\rho(A)\leq \|A\|
$$
#### TEOREMA 3.10
Per ogni
$$
A\in\mathbb{C}^{n\times n}
$$
valgono le seguenti formule.
Norma $1$:
$$
\|A\|_1=
\max_{j=1,\ldots,n}
\sum_{i=1}^n |a_{ij}|
$$
cioè la norma $1$ matriciale indotta è il massimo delle somme dei moduli degli elementi sulle colonne.
Se indichiamo con $A^{[j]}$ la colonna $j$-esima di $A$, allora
$$
\|A\|_1=
\max\left(\|A^{[1]}\|_1,\|A^{[2]}\|_1,\ldots,\|A^{[n]}\|_1\right)
$$
Norma $2$:
$$
\|A\|_2=
\sqrt{\rho(A^*A)}
$$
dove $A^*$ è la trasposta coniugata di $A$.
Attenzione: non è $\sqrt{\rho(A\cdot A)}$, ma
$$
\sqrt{\rho(A^*A)}
$$
Norma infinito:
$$
\|A\|_\infty=
\max_{i=1,\ldots,n}
\sum_{j=1}^n |a_{ij}|
$$

cioè la norma infinito matriciale indotta è il massimo delle somme dei moduli degli elementi sulle righe.
Se indichiamo con $A_{[i]}$ la riga $i$-esima di $A$, allora
$$
\|A\|_\infty=
\max\left(\|A_{[1]}\|_1,\|A_{[2]}\|_1,\ldots,\|A_{[n]}\|_1\right)
$$
Attenzione alla differenza:
- $\|A\|_1$ guarda le colonne;
- $\|A\|_\infty$ guarda le righe.
#### TEOREMA 3.11
Tutte le norme matriciali, sia indotte sia non indotte, in $\mathbb{C}^{n\times n}$ sono equivalenti.
Questo significa che, se prendiamo due norme matriciali qualsiasi
$\|\cdot\|'$ e $\|\cdot\|''$
da $\mathbb{C}^{n\times n}$ in $\mathbb{R}$, allora esistono due costanti positive
$$
\alpha,\beta>0
$$
indipendenti da $A$ tali che
$$
\alpha\|A\|''\leq \|A\|'\leq \beta\|A\|''
$$
per ogni
$$
A\in\mathbb{C}^{n\times n}
$$
dimostrazione analoga alla 3.7.4
#### TEOREMA 3.12
Sia
$$
A\in\mathbb{C}^{n\times n}
$$
allora
$$
lim_{\ k->\infty}A^k\to 0
$$
cioè la potenza $k$-esima di $A$ tende alla matrice nulla, se e solo se
$$
\rho(A)<1
$$
dove $\rho(A)$ è il raggio spettrale di $A$.

#####  Dimostrazione
Dimostriamo il teorema nel caso in cui $A$ sia diagonalizzabile
Allora esistono una matrice invertibile

$$
X\in\mathbb{C}^{n\times n}
$$
e una matrice diagonale
$$
D=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)
$$
avente sulla diagonale gli autovalori di $A$ t.c
$$
A=XDX^{-1}
$$
Allora

$A^2=(XDX^{-1})(XDX^{-1})$ siccome $X^{-1}X=I$
otteniamo $A^2=XD^2X^{-1}$

Analogamente $A^3=XD^3X^{-1}$ e in generale
$$
A^k=XD^kX^{-1}
$$
##### Dimostrazione 1
$$
\rho(A)<1 \Longrightarrow A^k\to 0
$$

Usiamo una norma matriciale indotta, per esempio la norma infinito.
Abbiamo
$$
\|A^k\|_\infty
=
\|XD^kX^{-1}\|_\infty
$$
per submoltiplicatività,
$$
\|XD^kX^{-1}\|_\infty
\leq
\|X\|_\infty \|D^kX^{-1}\|_\infty
$$
e ancora, applicando una seconda volta la submoltiplicatività,
$$
\|D^kX^{-1}\|_\infty
\leq
\|D^k\|_\infty \|X^{-1}\|_\infty
$$
quindi
$$
\|A^k\|_\infty
\leq
\|X\|_\infty \|D^k\|_\infty \|X^{-1}\|_\infty
$$
Ora
$$
D^k=
\operatorname{diag}(\lambda_1^k,\ldots,\lambda_n^k)
$$
quindi
$$
\|D^k\|_\infty
=
\max_{i=1,\ldots,n}|\lambda_i^k|
$$
ma
$$
|\lambda_i^k|=|\lambda_i|^k
$$
perciò
$$
\|D^k\|_\infty
=
\max_{i=1,\ldots,n}|\lambda_i|^k
=
\left(\max_{i=1,\ldots,n}|\lambda_i|\right)^k
$$`
cioè
$$
\|D^k\|_\infty=\rho(A)^k
$$
quindi
$$
\|A^k\|_\infty
\leq
\|X\|_\infty \|X^{-1}\|_\infty \rho(A)^k
$$
siccome
$$
\rho(A)<1
$$
allora
$$
\rho(A)^k\to 0
$$
per $k\to+\infty$.
Dato che $\|X\|_\infty$ e $\|X^{-1}\|_\infty$ sono costanti, otteniamo
$$
\|X\|_\infty \|X^{-1}\|_\infty \rho(A)^k\to 0
$$
Inoltre
$$
0\leq \|A^k\|_\infty
\leq
\|X\|_\infty \|X^{-1}\|_\infty \rho(A)^k
$$
quindi, per il teorema del confronto,
$$
\|A^k\|_\infty\to 0
$$
e dunque
$$
A^k\to 0
$$
##### Dimostrazione 2
$$
A^k\to 0 \Longrightarrow \rho(A)<1
$$
Supponiamo che
$$
A^k\to 0
$$
cioè
$$
lim_{k->\infty} \ \|A^k\|_\infty\to 0
$$
Poiché
$$
A^k=XD^kX^{-1}
$$
moltiplichiamo a sinistra per $X^{-1}$ e a destra per $X$:
$$
X^{-1}A^kX=D^k
$$
quindi
$$
D^k=X^{-1}A^kX
$$
Ora calcoliamo la norma infinito:
$$
\|D^k\|_\infty
=
\|X^{-1}A^kX\|_\infty
$$
per submoltiplicatività,
$$
\|X^{-1}A^kX\|_\infty
\leq
\|X^{-1}\|_\infty \|A^kX\|_\infty
$$
e ancora
$$
\|A^kX\|_\infty
\leq
\|A^k\|_\infty \|X\|_\infty
$$
quindi
$$
\|D^k\|_\infty
\leq
\|X^{-1}\|_\infty \|A^k\|_\infty \|X\|_\infty
$$
ma
$$
\|A^k\|_\infty\to 0
$$
e $\|X^{-1}\|_\infty,\|X\|_\infty$ sono costanti, quindi
$$
\|D^k\|_\infty\to 0
$$
D’altra parte abbiamo già visto che
$$
\|D^k\|_\infty=\rho(A)^k
$$
quindi
$$
\rho(A)^k\to 0
$$
Ora, siccome $\rho(A)\geq 0$, l’unico modo affinché
$$
\rho(A)^k\to 0
$$
è che
$$
\rho(A)<1
$$
infatti:
- se $\rho(A)=1$, allora $\rho(A)^k=1$ per ogni $k$
- se $\rho(A)>1$, allora $\rho(A)^k\to+\infty$
- se $0\leq \rho(A)<1$, allora $\rho(A)^k\to 0$
quindi
$$
\rho(A)<1
$$
Abbiamo dimostrato che, nel caso diagonalizzabile,
$$
A^k\to 0
\iff
\rho(A)<1
$$
$$
\square
$$
##### Osservazione 4.1
Se una successione ${x^{(k)}}_{k=0,1,2,...}$ generata dal metodo 
$$
x^{(0)}\in\mathbb{C}^n \text{ dato}
$$
$$
x^{(k+1)}=Px^{(k)}+q,\qquad k=0,1,2,\ldots
$$
dove $P\in\mathbb{C}^{n\times n}$ è una matrice fissata, che si chiama matrice di iterazione, e $q\in\mathbb{C}^n$ è un vettore fissato
converge a un vettore $x^{(\infty)}$ allora $x^{(\infty)}$ soddisfa l'equazione
Supponiamo che la successione converga a un vettore $(x^{(\infty)})$, cioè
$$ 
x^{(k)}\to x^{(\infty)}  
\qquad \text{per } k\to\infty.  $$
Allora anche la successione ($x^{(k+1)}$) converge allo stesso limite:
$$ 
x^{(k+1)}\to x^{(\infty)}.  $$
Passando al limite nell’equazione del metodo iterativo, otteniamo
$$ \lim_{k\to\infty}x^{(k+1)}=
\lim_{k\to\infty}\left(Px^{(k)}+q\right)$$
Poiché (P) e (q) non dipendono da (k), possiamo portare il limite all’interno:
$$P\left(\lim_{k\to\infty}x^{(k)}\right)+q$$
Dato che
$\lim_{k\to\infty}x^{(k)}=x^{(\infty)}$, 
segue che
$\boxed{x^{(\infty)}=Px^{(\infty)}+q}$
Quindi, se una successione generata dal metodo iterativo converge, il suo limite deve necessariamente soddisfare l’equazione
$x=Px+q$
Di conseguenza, se la soluzione (x) del sistema iniziale non soddisfa
$x=Px+q$
allora nessuna successione generata dal metodo
$x^{(k+1)}=Px^{(k)}+q$  
può convergere a quella soluzione.
Dire che (x) soddisfa
$x=Px+q$
significa dire che (x) è un **punto fisso** della funzione
$g(y)=Py+q$
perché
$g(x)=Px+q=$
In conclusione, affinché il metodo iterativo possa convergere alla soluzione del sistema, è necessario che tale soluzione sia un punto fisso della funzione (g)
#### TEOREMA 4.1, CNS, condizione necessaria e sufficiente di convergenza
Sia M metodo definito come iterativo
Supponiamo che il metodo $M$ sia consistente con il sistema $S$
Allora il metodo $M$ è convergente se e solo se
$$
\rho(P)<1
$$
raggio spettrale della matrice di iterazione

Dove il metodo M è definito come
dato un sistema lineare
$$
Ax=b
$$
che chiamiamo $S$, con
$$
A\in\mathbb{C}^{n\times n},\qquad b\in\mathbb{C}^n
$$
e supponiamo che $A$ sia invertibile
Per risolvere $S$ consideriamo questo metodo iterativo stazionario, cioè metodo della forma
$$
x^{(0)}\in\mathbb{C}^n \text{ dato}
$$
$$
x^{(k+1)}=Px^{(k)}+q,\qquad k=0,1,2,\ldots
$$
dove
$$
P\in\mathbb{C}^{n\times n}
$$
è una matrice fissata, che si chiama matrice di iterazione, e
$$
q\in\mathbb{C}^n
$$
è un vettore fissato

##### Dimostrazione
Dimostriamo solo la direzione
$$
\rho(P)<1\Longrightarrow M \text{ convergente}
$$
Dobbiamo dimostrare che il metodo $M$ è convergente, cioè che la successione generata dal metodo converge alla soluzione $x$ di $S$, indipendentemente dalla scelta di $x^{(0)}$.
Poiché $M$ è consistente con $S$ per ipotesi, vale
$$
x=Px+q
$$
chiamiamo questa equazione $(a)$.
Inoltre, la successione generata dal metodo soddisfa
$$
x^{(k+1)}=Px^{(k)}+q
$$
per ogni $k=0,1,2,\ldots$
chiamiamo questa equazione $(b)$
Sottraendo membro a membro $(a)$ da $(b)$ otteniamo
$$
x^{(k+1)}-x=Px^{(k)}+q-(Px+q)
$$
quindi
$$
x^{(k+1)}-x=P(x^{(k)}-x)
$$
per ogni $k=0,1,2,\ldots$
Definiamo l’errore al passo $k$ come
$$
e^{(k)}=x^{(k)}-x
$$
Allora l’equazione precedente diventa
$$
e^{(k+1)}=Pe^{(k)}
$$
per ogni $k=0,1,2,\ldots$
questa è l’equazione dell’errore
Sviluppiamo per ricorrenza:
per $k=0$,
$$
e^{(1)}=Pe^{(0)}
$$
per $k=1$,
$$
e^{(2)}=Pe^{(1)}=P(Pe^{(0)})=P^2e^{(0)}
$$
per $k=2$,
$$
e^{(3)}=Pe^{(2)}=P(P^2e^{(0)})=P^3e^{(0)}
$$
e quindi, in generale,
$$
e^{(k)}=P^ke^{(0)}
$$
per ogni $k=0,1,2,\ldots$
anche per $k=0$ la formula è vera, perché
$$
P^0=I
$$
e quindi
$$
P^0e^{(0)}=Ie^{(0)}=e^{(0)}
$$
per il teorema 3.12 abbiamo che

data una matrice
$$
P\in\mathbb{C}^{n\times n}
$$
si ha
$$
P^k\to 0
$$
se e solo se
$$
\rho(P)<1
$$
Siccome per ipotesi
$$
\rho(P)<1
$$
allora
$$
P^k\to 0
$$
Quindi
$$
e^{(k)}=P^ke^{(0)}\to 0
$$
Infatti, intuitivamente, una matrice che tende alla matrice nulla, moltiplicata per un vettore fissato $e^{(0)}$, dà un vettore che tende al vettore nullo.
Dunque
$$
e^{(k)}\to 0
$$
ma
$$
e^{(k)}=x^{(k)}-x
$$
quindi
$$
x^{(k)}-x\to 0
$$
e perciò
$$
x^{(k)}\to x
$$
Abbiamo dimostrato che la successione converge alla soluzione $x$, qualunque sia $x^{(0)}$.
Quindi il metodo $M$ è convergente.
$$
\square
$$
##### COROLLARIO 4.1, CS, condizione sufficiente di convergenza
Supponiamo che il metodo $M$ sia consistente con il sistema $S$.
Se esiste una norma matriciale indotta $\|\cdot\|$ tale che
$$
\|P\|<1
$$
allora il metodo $M$ è convergente.
##### Dimostrazione
Sappiamo che, per ogni norma matriciale indotta,
$$
\rho(P)\leq \|P\|
$$
Se
$$
\|P\|<1
$$
allora
$$
\rho(P)\leq \|P\|<1
$$
quindi
$$
\rho(P)<1
$$
Per il teorema 4.1, cioè per la condizione necessaria e sufficiente di convergenza, il metodo $M$ è convergente.
$$
\square
$$

##### COROLLARIO 4.2, CN, condizioni necessarie di convergenza
chiedere a Samuele se le dimostrazioni se le sta scrivendo anche su obsidian

Supponiamo che il metodo $M$ sia consistente con il sistema $S$.

- se $|\operatorname{traccia}(P)|\geq n$ allora il metodo $M$ non è convergente;
- se $|\det(P)|\geq 1$ allora il metodo $M$ non è convergente.
Quindi le condizioni

$|\operatorname{traccia}(P)|<n$ e $|\det(P)|<1$

sono condizioni necessarie per la convergenza.
Attenzione: sono condizioni necessarie, non sufficienti

Vuol dire che se il metodo converge, allora devono valere. Però il fatto che valgano non garantisce da solo che il metodo converga
##### Dimostrazione sulla |traccia(P)|
Supponiamo che
$$
|\operatorname{traccia}(P)|\geq n
$$
allora M non è convergente
Siano $\lambda_1,\ldots,\lambda_n$
sappiamo che
$$
\operatorname{traccia}(P)=\lambda_1+\cdots+\lambda_n
$$

Supponiamo per assurdo che tutti gli autovalori abbiano modulo strettamente minore di $1$, cioè
$$
|\lambda_i|<1 \ \ \ \ \ \ \ \ \ \forall  i=1,\ldots,n
$$
Allora, per la disuguaglianza triangolare,
$$
|\operatorname{traccia}(P)|
=
|\lambda_1+\cdots+\lambda_n|
\leq
|\lambda_1|+\cdots+|\lambda_n|
$$
ma, siccome ogni $|\lambda_i|<1$, otteniamo
$$
|\lambda_1|+\cdots+|\lambda_n|<n
$$
quindi
$$
|\operatorname{traccia}(P)|<n
$$
ma questo contraddice l’ipotesi
$$
|\operatorname{traccia}(P)|\geq n
$$
Quindi deve esistere almeno un autovalore $\lambda_i$ tale che
$$
|\lambda_i|\geq 1
$$
Allora
$$
\rho(P)\geq 1
$$
e quindi, per il teorema 4.1, il metodo $M$ non è convergente
##### Dimostrazione sul |Det(P)|
Supponiamo che
$$
|\det(P)|\geq 1
$$
Sappiamo che
$$
\det(P)=\lambda_1\lambda_2\cdots\lambda_n
$$
quindi

$$
|\det(P)|=|\lambda_1\lambda_2\cdots\lambda_n|
$$

e usando la proprietà del modulo del prodotto,

$$
|\det(P)|=|\lambda_1||\lambda_2|\cdots|\lambda_n|
$$
Se tutti gli autovalori avessero modulo strettamente minore di $1$, cioè
$$
|\lambda_i|<1
$$
per ogni $i=1,\ldots,n$, allora anche il prodotto dei loro moduli sarebbe strettamente minore di $1$:
$$
|\lambda_1||\lambda_2|\cdots|\lambda_n|<1
$$
quindi
$$
|\det(P)|<1
$$
ma questo contraddice l’ipotesi
$$
|\det(P)|\geq 1
$$
Dunque deve esistere almeno un autovalore $\lambda_i$ tale che
$$
|\lambda_i|\geq 1
$$
quindi
$$
\rho(P)\geq 1
$$
Per il teorema 4.1, il metodo $M$ non è convergente.
$$
\square
$$
##### OSSERVAZIONE 4.2
Si può dimostrare che se il metodo iterativo non è convergente allora ogni scelta del vettore $x^{(0)}$ produce una successione che non converge alla soluzione $x$ del sistema

L’Osservazione 4.2 non viene dimostrata nel dettaglio. Si basa sull’equazione dell’errore $$e(0)e^{(k)}=P^k e^{(0)}$$Poiché il comportamento asintotico delle potenze $P^k$ è governato dal raggio spettrale $\rho(P)$, l’errore si comporta, per $k$ grande, come $Ck^m\rho(P)^k$ Perciò, tra due metodi convergenti, quello con raggio spettrale più piccolo converge più velocemente
#### TEOREMA 4.2 PRIMA (Costruzione metodo iterativo)
Un metodo iterativo per risolvere $Ax=b$
Si considera una decomposizione della matrice
$$
A=M-(M-A)
$$
con $M\in\mathbb{C}^{n\times n}$ invertibile detta matrice di precondizionamento

L’idea è questa: invece di usare direttamente $A$, scegliamo una matrice $M$ che assomigli ad $A$, ma che sia molto più facile da usare nei calcoli, cioè tale che i sistemi lineari con matrice $M$ siano facili da risolvere

Osserviamo che il sistema
$$
Ax=b
$$
si può riscrivere usando
$$
A=M-(M-A)
$$
infatti
$$
Ax=b
$$
diventa
$$
[M-(M-A)]x=b
$$
cioè
$$
Mx-(M-A)x=b
$$
portando il secondo termine a destra:
$$
Mx=(M-A)x+b
$$
siccome $M$ è invertibile, moltiplichiamo per $M^{-1}$:
$$
x=M^{-1}(M-A)x+M^{-1}b
$$
questa è una forma a punto fisso.
Possiamo anche riscriverla in un altro modo:
$$
x=M^{-1}(M-A)x+M^{-1}b
$$
sviluppiamo
$$
M^{-1}(M-A)=M^{-1}M-M^{-1}A=I-M^{-1}A
$$

quindi
$$
x=(I-M^{-1}A)x+M^{-1}b
$$
cioè
$$
x=x-M^{-1}Ax+M^{-1}b
$$
raccogliendo $M^{-1}$:
$$
x=x+M^{-1}(b-Ax)
$$
per cui $\forall y \in \mathbb{C}^n$ definiamo $r(y)=b-Ay$ 

il residuo del sistema nel punto $y$

per cui $x=x+M^{-1}r(x)$ 

A partire da questa riscrittura, si definisce il metodo iterativo:
$$
x^{(0)}\in\mathbb{C}^n \text{ dato}
$$
$$
x^{(k+1)}=M^{-1}(M-A)x^{(k)}+M^{-1}b
$$
per $k=0,1,2,\ldots$
equivalentemente,
$$
x^{(k+1)}=x^{(k)}+M^{-1}r^{(k)}
$$
dove $r^{(k)}=r(x^{(k)})=b-Ax^{(k)}$
e come matrice di iterazione abbiamo
$M^{-1}(M-A)=I-M^{-1}A$ 
Il metodo costruito qui è consistente con il sistema $S$ $Ax=b$ dove

$Ax=b$   -> $b-Ax=0$ quindi

$x+M^{-1}(b-Ax)=x+M^{-1}0=x$ 

per cui $x=x+M^{-1}(b-Ax)$

un punto fisso del metodo

#### TEOREMA 4.2 DOPO
Il metodo Costruito per risolvere $Ax=b$
è convergente se e solo se 
$$
\rho(I-M^{-1}A)<1
$$
sappiamo che il metodo è 
$$
x^{(k+1)}=x^{(k)}+M^{-1}(b-Ax^{(k))})
$$
nella forma del teorema della convergenza abbiamo
$$x^{(k+1)}=x^{k}b-M^{-1}Ax^{(k)}$$
dove poi abbiamo
$$x^{(k+1)}=(I-M^{-1}A)x^{(k)}+M^{-1}b$$
la prima parte è P la seconda é q
il metodo converge se e solo se $$\rho(P) < 1$$
Quindi $\rho(I-M^{-1}A) < 1$
##### Osservazione 4.5 (SMART)

Il polinomio caratteristico di
$$
I-M^{-1}A
$$
è
$$
C_{I-M^{-1}A}(\lambda)
=
\det(\lambda I-(I-M^{-1}A))
$$
quindi
$$
C_{I-M^{-1}A}(\lambda)
=
\det(\lambda I-I+M^{-1}A)
$$
Ora vogliamo evitare di calcolare esplicitamente $M^{-1}$.
Osserviamo che
$$
\lambda I-I+M^{-1}A
=
(\lambda-1)I+M^{-1}A
$$
possiamo raccogliere $M^{-1}$ scrivendo
$$
(\lambda-1)I+M^{-1}A
=
M^{-1}[(\lambda-1)M+A]
$$
infatti
$$
M^{-1}[(\lambda-1)M+A]
=
(\lambda-1)M^{-1}M+M^{-1}A
=
(\lambda-1)I+M^{-1}A
$$
quindi
$$
C_{I-M^{-1}A}(\lambda)
=
\det(M^{-1}[(\lambda-1)M+A])
$$
per Binet:
$$
C_{I-M^{-1}A}(\lambda)
=
\det(M^{-1})\det((\lambda-1)M+A)
$$
cioè
$$
C_{I-M^{-1}A}(\lambda)
=
\det(M^{-1})\det(\lambda M-M+A)
$$
Il primo determinante
$$
\det(M^{-1})
$$
è diverso da zero perché $M$ è invertibile.
Infatti
$$
\det(M)\neq 0
$$
e quindi
$$
\det(M^{-1})=\frac{1}{\det(M)}\neq 0
$$
Allora
$$
C_{I-M^{-1}A}(\lambda)=0
$$
se e solo se
$$
\det(\lambda M-M+A)=0
$$
Questa è l’equazione smart.
Serve per calcolare gli autovalori e quindi il raggio spettrale di
$$
I-M^{-1}A
$$
senza calcolare esplicitamente né
$$
M^{-1}
$$
né
$$
I-M^{-1}A
$$
Quindi, invece di costruire la matrice di iterazione e poi calcolarne gli autovalori, possiamo risolvere direttamente
$$
\det(\lambda M-M+A)=0
$$
##### OSSERVAZIONE 4.6
L’iterazione $k$-esima del metodo viene calcolata con la formula
$$
x^{(k+1)}=x^{(k)}+M^{-1}r^{(k)}
$$
e richiede il calcolo del vettore
$$
z^{(k)}=M^{-1}r^{(k)}
$$
detto residuo precondizionato.
In pratica, però, non si calcola mai esplicitamente $M^{-1}$.
Il calcolo di $z^{(k)}$ si fa risolvendo il sistema lineare
$$
Mz^{(k)}=r^{(k)}
$$
Infatti, se
$$
Mz^{(k)}=r^{(k)}
$$
allora
$$
z^{(k)}=M^{-1}r^{(k)}
$$
Questo è molto più conveniente dal punto di vista computazionale rispetto al calcolo esplicito di $M^{-1}$.
Ovviamente il sistema lineare
$$
Mz^{(k)}=r^{(k)}
$$
deve essere più rapido da risolvere del sistema originario
$$
Ax=b
$$
altrimenti non converrebbe usare questo metodo iterativo.
##### OSSERVAZIONE 4.7
Intuitivamente, quanto più il precondizionatore $M$ assomiglia alla matrice $A$, tanto più il metodo dovrebbe convergere velocemente.
La velocità dipende dal raggio spettrale della matrice di iterazione
$$
P=I-M^{-1}A
$$
Se
$$
M\approx A
$$
allora
$$
M-A\approx 0
$$
e quindi
$$
M^{-1}(M-A)\approx 0
$$
cioè
$$
I-M^{-1}A\approx 0
$$
per cui ci si aspetta un raggio spettrale piccolo.
Il caso limite è
$$
M=A
$$
In questo caso
$$
I-M^{-1}A=I-A^{-1}A=I-I=0
$$
quindi la matrice di iterazione è nulla.
Il metodo diventa
$$
x^{(k+1)}=x^{(k)}+A^{-1}(b-Ax^{(k)})
$$
cioè
$$
x^{(k+1)}=x^{(k)}+A^{-1}b-A^{-1}Ax^{(k)}
$$
quindi
$$
x^{(k+1)}=x^{(k)}+A^{-1}b-x^{(k)}
$$
e dunque
$$
x^{(k+1)}=A^{-1}b=x
$$
cioè converge in una sola iterazione alla soluzione esatta.
Il problema è che questa unica iterazione richiede di risolvere un sistema con matrice $A$, quindi costa come risolvere direttamente il sistema originale
$$
Ax=b
$$
Conclusione: nella scelta del precondizionatore $M$ occorre mediare fra due cose:
- qualità dell’approssimazione $M\approx A$
- facilità e rapidità della risoluzione di un sistema lineare con matrice $M$
Una buona approssimazione
$$
M\approx A
$$
generalmente assicura una buona velocità di convergenza.
La facilità e rapidità della risoluzione di
$$
Mz=r
$$
assicura invece che ogni iterazione del metodo sia veloce.
##### OSSERVAZIONE 4.8
Confrontando i precondizionatori $D$ ed $E$ dei metodi di Jacobi e Gauss-Seidel, osserviamo quanto segue
- L’approssimazione
$$
E\approx A
$$
è migliore dell’approssimazione
$$
D\approx A
$$
perché $E$ contiene più informazioni di $A$ rispetto a $D$.
Infatti $D$ contiene solo la diagonale di $A$, mentre $E$ contiene tutta la parte triangolare inferiore, inclusa la diagonale.
Inoltre
$$
E-A
$$
ha più zeri rispetto a
$$
D-A
$$
Questo spiega perché molto spesso il metodo di Gauss-Seidel converge più velocemente del metodo di Jacobi, cioè spesso
$$
\rho(G)<\rho(J)
$$
dove $J$ e $G$ sono rispettivamente le matrici di iterazione di Jacobi e Gauss-Seidel.
- Però la risoluzione di un sistema lineare con matrice $E$ è più costosa della risoluzione di un sistema lineare con matrice $D$.
Infatti:
- con $D$ basta risolvere un sistema diagonale, cioè fare $n$ divisioni;
- con $E$ bisogna risolvere un sistema triangolare inferiore, usando sostituzione in avanti.
Pertanto, una iterazione di Gauss-Seidel costa di più di una iterazione di Jacobi.
Quindi il confronto è questo:
- Jacobi: iterazioni più economiche, ma spesso convergenza più lenta;
- Gauss-Seidel: iterazioni più costose, ma spesso convergenza più veloce.
#### TEOREMA 4.3
Supponiamo che $A\in\mathbb{C}^{n\times n}$ soddisfi almeno una delle seguenti condizioni:
- $A$ è a diagonale dominante per righe e irriducibile
- $A$ è a diagonale dominante in senso stretto per righe
- $A$ è a diagonale dominante per colonne e irriducibile
- $A$ è a diagonale dominante in senso stretto per colonne.
Allora i metodi di Jacobi e Gauss-Seidel per risolvere un sistema lineare di matrice $A$ sono convergenti
##### Osservazione 4.9
Se $A\in\mathbb{C}^{n\times n}$ soddisfa almeno una delle quattro condizioni del teorema, allora:
- $A$ è invertibile per il Teorema 3.7
- gli elementi diagonali di $A$ sono diversi da $0$
Infatti, se per assurdo ci fosse un elemento diagonale nullo, ad esempio
$$
a_{ii}=0
$$
allora, nel caso di dominanza diagonale per righe, avremmo
$$
0=|a_{ii}|\geq \sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|
$$
quindi necessariamente
$$
a_{ij}=0 \qquad \forall j\neq i
$$

cioè tutta la riga $i$-esima sarebbe nulla. Questo è impossibile se $A$ è invertibile
Analogamente, nel caso di dominanza per colonne, se $a_{jj}=0$, allora tutta la colonna $j$-esima sarebbe nulla, quindi $A$ non potrebbe essere invertibile

Conclusione: 
se $A$ soddisfa almeno una delle quattro condizioni del Teorema 4.3, allora i metodi di Jacobi e Gauss-Seidel sono applicabili, perché richiedono che gli elementi diagonali di $A$ siano non nulli

##### Dimostrazione Teorema 4.3
##### Dimostrazione 1 per il metodo di Gauss-Seidel a diagonale dominante per righe e irriducibile
per dimostrare che  il metodo di Gauss-Seidel converge dobbiamo dimostrare che $\rho(G)<1$
con $G=I-E^{-1}A$ come matrice di iterazione di Gauss-Seidel
per osservazione smart gli autovalori di G sono dati dall'equazione del $det(\lambda E+A-E)=0$
ipotizzando un caso dove n=4 abbiamo che 
$$
E=
\begin{pmatrix}
a_{11} & 0 & 0 & 0\\
a_{21} & a_{22} & 0 & 0\\
a_{31} & a_{32} & a_{33} & 0\\
a_{41} & a_{42} & a_{43} & a_{44}
\end{pmatrix}
$$
allora
$$
\lambda E+A-E=
\begin{pmatrix}
\lambda a_{11} & a_{12} & a_{13} & a_{14}\\
\lambda a_{21} & \lambda a_{22} & a_{23} & a_{24}\\
\lambda a_{31} & \lambda a_{32} & \lambda a_{33} & a_{34}\\
\lambda a_{41} & \lambda a_{42} & \lambda a_{43} & \lambda a_{44}
\end{pmatrix}
$$
si vuole dimostrare che nessun $|\lambda|\geq 1$ è in G 
per questo vogliamo dimostrare che $\lambda E+A-E$ è invertibile $\forall \lambda \geq 1$ 
se questo è invertibile allora significa che il suo determinante è diverso da 0 perciò quel $\lambda$ non è autovalore di G
per il teorema 3.7 se A è a diagonale dominante e irriducibile allora A è invertibile visto che $|\lambda| \geq 1$ 

abbiamo $\lambda\neq 0$, quindi moltiplicare certi elementi di $A$ per $\lambda$ non cambia il fatto che siano nulli o non nulli

Gli zeri della matrice $\lambda E+A-E$ stanno nelle stesse posizioni degli zeri di $A$
Quindi le due matrici hanno lo stesso grafo associato
Siccome $A$ è irriducibile, il grafo di $A$ è fortemente connesso, e quindi anche il grafo di $\lambda E+A-E$ è fortemente connesso

quindi $\lambda E + A-E$ è irriducibile
per dimostrare invece che $\lambda E + A-E$ è a diagonale dominante per righe
Fissiamo una riga $i$.
L’elemento diagonale della riga $i$ è
$$
\lambda a_{ii}
$$
quindi il suo modulo è
$$
|\lambda a_{ii}|=|\lambda||a_{ii}|
$$
Gli elementi fuori diagonale della riga $i$ sono:
- quelli con $j<i$, cioè sotto la diagonale, moltiplicati per $\lambda$;
- quelli con $j>i$, cioè sopra la diagonale, lasciati invariati.
Quindi la somma dei moduli degli elementi fuori diagonale della riga $i$ della matrice $\lambda E+A-E$ è
$$
\sum_{j=1}^{i-1}|\lambda a_{ij}|+\sum_{j=i+1}^n |a_{ij}|
$$
cioè
$$
|\lambda|\sum_{j=1}^{i-1}|a_{ij}|+\sum_{j=i+1}^n |a_{ij}|
$$
Ora, siccome $A$ è a diagonale dominante per righe,
$$
|a_{ii}|
\geq
\sum_{j=1}^{i-1}|a_{ij}|+\sum_{j=i+1}^n |a_{ij}|
$$
moltiplichiamo per $|\lambda|$:
$$
|\lambda||a_{ii}|
\geq
|\lambda|\sum_{j=1}^{i-1}|a_{ij}|
+
|\lambda|\sum_{j=i+1}^n |a_{ij}|
$$
siccome $|\lambda|\geq 1$
abbiamo
$$
|\lambda|\sum_{j=i+1}^n |a_{ij}|
\geq
\sum_{j=i+1}^n |a_{ij}|
$$
quindi
$$
|\lambda||a_{ii}|
\geq
|\lambda|\sum_{j=1}^{i-1}|a_{ij}|
+
\sum_{j=i+1}^n |a_{ij}|
$$
cioè
$$
|\lambda a_{ii}|
\geq
\sum_{j=1}^{i-1}|\lambda a_{ij}|
+
\sum_{j=i+1}^n |a_{ij}|
$$
Questa è esattamente la dominanza diagonale per righe della matrice $\lambda E+A-E$

definire dominanza diagonale implica anche che per una riga k si ha che 

$$
|a_{kk}|>
\sum_{\substack{j=1\\j\neq k}}^n |a_{kj}|
$$
per cui  per $\lambda E+A-E$ abbiamo che 
$$
|\lambda||a_{kk}|>
|\lambda|\sum_{\substack{j=1\\j\neq k}}^n |a_{kj}|
$$
quindi per il teorema 3.7 $\lambda E+A-E$ è invertibile
quindi $det(\lambda E+ A -E)\ \neq 0 \ \ \ \forall |\lambda| \geq 1$
Conclusione: tutte le radici hanno modulo minore di $1$.
Ma queste radici sono gli autovalori di $G$.
Quindi tutti gli autovalori di $G$ hanno modulo minore di $1$, e dunque
$$
\rho(G)<1
$$
Perciò il metodo di Gauss-Seidel è convergente.
$$
\square
$$
##### Dimostrazione per jacobi

Per il metodo di Jacobi, il ragionamento è analogo, ma si usa
$$
J=I-D^{-1}A
$$
e l’equazione smart diventa
$$
\det(\lambda D + A-D)=0
$$
Se $|\lambda|\geq 1$, la matrice $\lambda D+A-D$ conserva la dominanza diagonale e l’irriducibilità, quindi è invertibile per il Teorema 3.7. Dunque nessun $\lambda$ con $|\lambda|\geq 1$ può essere autovalore di $J$, e quindi
$$
\rho(J)<1
$$
##### Caso della dominanza per colonne
Se $A$ è a diagonale dominante per colonne e irriducibile, il ragionamento è lo stesso, ma si lavora sulle **colonne** invece che sulle righe.
In particolare, per ogni $\lambda$ con $|\lambda|\geq 1$
si dimostra che la matrice ausiliaria considerata nella dimostrazione, cioè
$\lambda E+A-E$ nel caso di Gauss-Seidel, oppure
$\lambda D+A-D$ nel caso di Jacobi, conserva la dominanza diagonale per colonne e l’irriducibilità

Quindi, per il Teorema 3.7, tale matrice è invertibile. Di conseguenza $\det(\lambda E+A-E)\neq 0$
oppure $\det(\lambda D+A-D)\neq 0$
Pertanto nessun $\lambda$ con$|\lambda|\geq 1$ può essere autovalore della matrice di iterazione corrispondente. 
Quindi il raggio spettrale della matrice di iterazione è minore di 1, e il metodo converge per il Teorema 4.1.
##### Caso della dominanza in senso stretto
Se invece $A$ è a diagonale dominante in senso stretto, per righe o per colonne, la dimostrazione è più semplice.

Infatti, in questo caso non serve usare l’irriducibilità. La dominanza stretta garantisce che lo zero sta fuori da tutti i cerchi di Gershgorin della matrice ausiliaria.

Per esempio, se una matrice $B$ è a diagonale dominante in senso stretto per righe, allora per ogni riga $i$ vale
$$|b_{ii}|>\sum_{j\neq i}|b_{ij}|$$
Questo significa che, nel cerchio di Gershgorin $K_i$, la distanza dello zero dal centro $b_{ii}$​ è maggiore del raggio. 

Quindi $0\notin K_i \qquad \forall i$

Per il primo teorema di Gershgorin, tutti gli autovalori di $B$ stanno nell’unione dei cerchi di Gershgorin. Poiché lo zero non appartiene a nessun cerchio, lo zero non è autovalore di $B$. Quindi $B$ è invertibile.
Applicando questo alla matrice ausiliaria $\lambda E+A-E$
oppure $\lambda D+A-D$
si conclude ancora che, per ogni $\lambda$ con $|\lambda|\geq 1$, tale matrice è invertibile. Quindi quel $\lambda$ non è autovalore della matrice di iterazione. 
Di conseguenza tutti gli autovalori della matrice di iterazione hanno modulo minore di 1, cioè $\rho(G)<1$
oppure $\rho(J)<1$
Per il Teorema 4.1, il metodo converge
#### TEOREMA 4.4
Sia
$$
A\in\mathbb{C}^{n\times n}
$$
HDP, cioè hermitiana definita positiva.
Allora il metodo di Gauss-Seidel per risolvere un sistema lineare di matrice $A$ è convergente.
##### Osservazione 4.10
Se $A\in\mathbb{C}^{n\times n}$ è HDP, allora:
- $A$ è invertibile, perché i suoi autovalori sono reali e positivi, quindi $0$ non è autovalore di $A$;
- gli elementi diagonali di $A$ sono positivi, infatti
$$
a_{ii}=e_i^*Ae_i>0
$$
dove $e_i$ è l’$i$-esimo vettore della base canonica.
Ricorda: autovalori ed elementi diagonali sono due cose diverse.
Il fatto che $A$ sia HDP implica sia positività degli autovalori sia positività degli elementi diagonali, ma sono due proprietà diverse.
##### Dimostrazione
Dobbiamo dimostrare che
$$
\rho(G)<1
$$
dove
$$
G=I-E^{-1}A
$$
è la matrice di iterazione di Gauss-Seidel.
La dimostrazione si divide in due parti.
###### Parte 1
Dimostriamo che
$$
A-G^*AG
$$
è HDP.
Prima dimostriamo che è hermitiana.
Siccome $A$ è hermitiana, abbiamo
$$
A^*=A
$$
Calcoliamo la trasposta coniugata:
$$
(A-G^*AG)^*
=
A^*-(G^*AG)^*
$$
usando la proprietà
$$
(XY)^*=Y^*X^*
$$
otteniamo
$$
(G^*AG)^*=G^*A^*G
$$
perché
$$
(G^*)^*=G
$$
e poi l’ordine si ricompone nello stesso modo.
Siccome $A^*=A$, segue
$$
(G^*AG)^*=G^*AG
$$
quindi
$$
(A-G^*AG)^*=A-G^*AG
$$
dunque $A-G^*AG$ è hermitiana.
Ora dimostriamo che è definita positiva.
Poniamo
$$
F=E^{-1}A
$$
Allora
$$
G=I-E^{-1}A=I-F
$$
Osserviamo che $F$ è invertibile perché è prodotto di matrici invertibili:
$$
F=E^{-1}A
$$
infatti $E$ è invertibile perché ha diagonale positiva, e $A$ è invertibile perché è HDP.
Inoltre
$$
F^{-1}=A^{-1}E
$$
Infatti
$$
F^{-1}=(E^{-1}A)^{-1}=A^{-1}E
$$
Usiamo anche la notazione
$$
F^{-*}=(F^{-1})^*=(F^*)^{-1}
$$
Questa notazione ha senso perché
$$
(F^{-1})^*
$$
è proprio l’inversa di $F^*$.
Infatti
$$
(F^{-1})^*F^*=(FF^{-1})^*=I^*=I
$$
e
$$
F^*(F^{-1})^*=(F^{-1}F)^*=I^*=I
$$
Ora sviluppiamo
$$
A-G^*AG
$$
siccome
$$
G=I-F
$$
abbiamo
$$
A-G^*AG=A-(I-F)^*A(I-F)
$$
cioè
$$
A-G^*AG=A-(I-F^*)A(I-F)
$$
sviluppiamo il prodotto:
$$
(I-F^*)A(I-F)=A-AF-F^*A+F^*AF
$$
quindi
$$
A-G^*AG=A-\left(A-AF-F^*A+F^*AF\right)
$$
da cui
$$
A-G^*AG=AF+F^*A-F^*AF
$$
Adesso vogliamo riscrivere questa espressione raccogliendo $F^*$ a sinistra e $F$ a destra:
$$
AF+F^*A-F^*AF
=
F^*(F^{-*}A+AF^{-1}-A)F
$$
Verifichiamo i tre termini:
$$
F^*F^{-*}AF=AF
$$
perché
$$
F^*F^{-*}=I
$$
poi
$$
F^*AF^{-1}F=F^*A
$$
e infine resta
$$
-F^*AF
$$
Quindi
$$
A-G^*AG
=
F^*(F^{-*}A+AF^{-1}-A)F
$$
Ora calcoliamo i due termini dentro la parentesi.
Siccome
$$
F^{-1}=A^{-1}E
$$
abbiamo
$$
AF^{-1}=A(A^{-1}E)=E
$$
Inoltre
$$
F^{-*}A=(F^{-1})^*A
$$
ma
$$
F^{-1}=A^{-1}E
$$
quindi
$$
(F^{-1})^*=(A^{-1}E)^*=E^*(A^{-1})^*
$$
siccome $A$ è hermitiana, anche $A^{-1}$ è hermitiana, quindi
$$
(A^{-1})^*=A^{-1}
$$
perciò
$$
(F^{-1})^*=E^*A^{-1}
$$
e dunque
$$
F^{-*}A=E^*A^{-1}A=E^*
$$
Quindi
$$
F^{-*}A+AF^{-1}-A=E^*+E-A
$$
Ora ricordiamo che $E$ è la parte triangolare inferiore di $A$ inclusa la diagonale.
Poiché $A$ è hermitiana, la parte triangolare superiore di $A$ è la trasposta coniugata della parte triangolare inferiore.
Quindi
$$
E+E^*=A+D
$$
dove $D$ è la parte diagonale di $A$:
$$
D=
\begin{pmatrix}
a_{11} & 0 & \cdots & 0\\
0 & a_{22} & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & a_{nn}
\end{pmatrix}
$$
Infatti, fuori dalla diagonale, $E+E^*$ ricostruisce $A$, mentre sulla diagonale conta due volte gli elementi diagonali. Per questo
$$
E+E^*=A+D
$$
e quindi
$$
E^*+E-A=D
$$
Allora
$$
A-G^*AG=F^*DF
$$
Abbiamo scoperto quindi che
$$
A-G^*AG=F^*DF
$$
Ora dimostriamo la positività.
Per ogni
$$
y\in\mathbb{C}^n\setminus\{0\}
$$
abbiamo
$$
y^*(A-G^*AG)y
=
y^*F^*DFy
$$
poniamo
$$
u=Fy
$$
Allora
$$
y^*F^*DFy=(Fy)^*D(Fy)=u^*Du
$$
Siccome $F$ è invertibile e $y\neq 0$, allora
$$
u=Fy\neq 0
$$
Ora
$$
u^*Du
=
\sum_{i=1}^n a_{ii}|u_i|^2
$$
siccome $A$ è HDP, gli elementi diagonali sono positivi:
$$
a_{ii}>0
$$
per ogni $i=1,\ldots,n$.
Inoltre $u\neq 0$, quindi almeno una componente $u_i$ è diversa da zero.
Dunque
$$
\sum_{i=1}^n a_{ii}|u_i|^2>0
$$
quindi
$$
y^*(A-G^*AG)y>0
$$
per ogni $y\neq 0$.
Abbiamo quindi dimostrato che
$$
A-G^*AG
$$
è hermitiana definita positiva.
###### Parte 2
Dimostriamo ora che il metodo è convergente, cioè che
$$
\rho(G)<1
$$
Sia $\lambda$ un autovalore di $G$.
Vogliamo mostrare che
$$
|\lambda|<1
$$
Prendiamo un autovettore
$$
y\neq 0
$$
di $G$ associato a $\lambda$, quindi
$$
Gy=\lambda y
$$
Siccome dalla Parte 1 sappiamo che
$$
A-G^*AG
$$
è HDP, allora
$$
y^*(A-G^*AG)y>0
$$
Sviluppiamo:
$$
y^*(A-G^*AG)y
=
y^*Ay-y^*G^*AGy
$$
ma
$$
y^*G^*=(Gy)^*$$
quindi
$$
y^*G^*AGy=(Gy)^*A(Gy)
$$
Siccome

$$
Gy=\lambda y
$$
abbiamo
$$
(Gy)^*A(Gy)
=
(\lambda y)^*A(\lambda y)
$$
Ora
$$
(\lambda y)^*=\overline{\lambda}y^*
$$
quindi
$$
(\lambda y)^*A(\lambda y)
=
\overline{\lambda}y^*A(\lambda y)
$$
portiamo fuori anche $\lambda$:
$$
=
\overline{\lambda}\lambda y^*Ay
$$
cioè
$$
=
|\lambda|^2y^*Ay
$$
Quindi
$$
y^*(A-G^*AG)y
=
y^*Ay-|\lambda|^2y^*Ay
$$
cioè
$$
y^*(A-G^*AG)y
=
(1-|\lambda|^2)y^*Ay
$$
Ora sappiamo due cose:
- dalla Parte 1,
$$
y^*(A-G^*AG)y>0
$$
- siccome $A$ è HDP e $y\neq 0$,
$$
y^*Ay>0
$$
Quindi
$$
(1-|\lambda|^2)y^*Ay>0
$$
ma
$$
y^*Ay>0
$$
perciò deve essere
$$
1-|\lambda|^2>0
$$
cioè
$$
|\lambda|^2<1
$$
e dunque
$$
|\lambda|<1
$$
Abbiamo dimostrato che ogni autovalore $\lambda$ di $G$ ha modulo minore di $1$.
Quindi
$$
\rho(G)<1
$$
Per il teorema generale di convergenza dei metodi iterativi, il metodo di Gauss-Seidel è convergente.
$$
\square
$$
