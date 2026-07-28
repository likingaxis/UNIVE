### Interpolazione polinomiale
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

una base di $\mathbb{R}_n[x]$ è un insieme di elementi $v_1(x),\ldots,v_r(x)$ appartenenti a $\mathbb{R}_n[x]$ tali che:
- sono linearmente indipendenti
 - cioè l’unica combinazione lineare $\alpha_1v_1(x)+\cdots+\alpha_rv_r(x)$ che coincide con il polinomio nullo è quella con tutti i coefficienti uguali a $0$
 - generano $\mathbb{R}_n[x]$
	- cioè ogni polinomio $q(x)\in\mathbb{R}_n[x]$ si può scrivere come combinazione lineare
 $$
 q(x)=\beta_1v_1(x)+\cdots+\beta_rv_r(x)
 $$
andiamo quindi a dimostrare che 
n+1 elementi sono base di $\mathbb{R}_n[x]$ se e solo se sono linearmente indipendenti tra loro
dimostriamo che sono linearmente indipendenti tra loro
$\forall i,j=0,...,n$ 
$$
L_j(x_i)=
\begin{cases}
1 & \text{se } i=j\\
0 & \text{se } i\neq j
\end{cases}
$$
supponiamo che ci sia questa combinazione lineare
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

quindi $L_0(x),\ldots,L_n(x)$ sono linearmente indipendenti
perché l’unica combinazione lineare che dà il polinomio nullo è quella con tutti i coefficienti uguali a $0$
essendo linearmente indipendenti allora sono base di $\mathbb{R}_n[x]$

sia quindi $p(x)\in \mathbb{R}_n[x]$ polinomio interpolante definito come 
$$
p(x)=y_0L_0(x)+y_1L_1(x)+\cdots+y_nL_n(x)
$$
sappiamo che $p(x)\in \mathbb{R}_n[x]$ poiché è combinazione lineare di polinomi che stanno in $\mathbb{R}_n[x]$, quindi anche $p(x)$ resta in $\mathbb{R}_n[x]$
vogliamo dimostrare che 
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
per cui la matrice di Vandermonde
vettore dei coefficienti:
$$\begin{pmatrix} a_0\\ a_1\\ \vdots\\ a_n \end{pmatrix} = \left[V(x_0,x_1,\dots,x_n)\right]^{-1} \begin{pmatrix} f(x_0)\\ f(x_1)\\ \vdots\\ f(x_n) \end{pmatrix}$$
dove $x_0,x_1,...,x_n$ sono i nodi di interpolazione
##### Errore o resto dell’interpolazione polinomiale
#### TEOREMA 1.2
Sia $f:[a,b]\to\mathbb{R}$ una funzione di classe $C^{n+1}[a,b]$ e sia $p(x)$ il polinomio di interpolazione di $f(x)$ sugli $n+1$ nodi distinti $x_0,x_1,...,x_n \in [a,b]$ 
allora $\forall x \in [a,b]$ $\exists \  un \ punto \xi=\xi(x) \in (a,b)$ t.c
$$
f(x)-p(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)(x-x_1)\cdots(x-x_n)
$$

è l'errore di interpolazione nel punto $x$
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
$x \notin {x_0,x_1,...,x_n}$
definiamo delle funzoni ausiliarie $\forall y\in [a,b]$ 
$$
\pi(y)=(y-x_0)(y-x_1)\cdots(y-x_n)
$$
$$
r(y)=f(y)-p(y)
$$
detta funzione di resto
e sia inoltre $z:[a,b]\to\mathbb{R}$
$$
z(y)=r(y)-\frac{r(x)}{\pi(x)}\pi(y)
$$
questa funzione è di classe $C^{n+1}[a,b]$ poiché $r(y)$ è di quella classe perché a sua volta $f(y)$ è di quella classe mentre $p(y)$ e $\pi(y)$ sono di classe $C^\infty$
sappiamo che $z(y)$ si annulla in almeno n+2 punti di $[a,b]$ 
- per i nodi $x_0,...,x_n$ 
- per il nodo x fissato

Per il teorema di Rolle sappiamo che
Se una funzione si annulla in due punti consecutivi, allora in mezzo a questi due punti esiste almeno un punto in cui la derivata prima si annulla.
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
$$
r^{(n+1)}(y)=f^{(n+1)}(y)-p^{(n+1)}(y)
$$
$p(y)$ con derivato n+1 volte si annulla perché ha grado al più n

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

facendo la derivata $(n+1)$-esima, tutti i termini di grado minore spariscono e rimane
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
$$
\frac{r(x)}{\pi(x)}(n+1)!=f^{(n+1)}(\xi)
$$
$$
r(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\pi(x)
$$


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
#### TEOREMA 1.3
sia $f:[a,b]\to\mathbb{R}$ e siano $x_0,x_1,\ldots,x_n\in[a,b]$ nodi distinti
allora il polinomio di interpolazione di $f(x)$ su questi nodi è dato da
$$
p(x)=f[x_0]+f[x_0,x_1](x-x_0)+f[x_0,x_1,x_2](x-x_0)(x-x_1)+\cdots+f[x_0,\ldots,x_n](x-x_0)\cdots(x-x_{n-1})
$$

questa si chiama forma di Newton del polinomio di interpolazione $p(x)$
i coefficienti sono le differenze divise
$$
f[x_0],\ f[x_0,x_1],\ f[x_0,x_1,x_2],\ldots,\ f[x_0,\ldots,x_n]
$$
#### Corollario 1.1
sia $f:[a,b]\to\mathbb{R}$ e siano $x_0,x_1,\ldots,x_n\in[a,b]$ distinti
allora $f[x_0,x_1,\ldots,x_n]$ non cambia se vengono permutati i suoi $n+1$ argomenti
$$
f[x_0,\ldots,x_n]=f[x_{\sigma(0)},\ldots,x_{\sigma(n)}]
$$
per ogni permutazione $\sigma$ di $\{0,\ldots,n\}$
##### Dimostrazione

sia $\sigma$ una qualsiasi permutazione di $\{0,\ldots,n\}$

applichiamo la forma di Newton prima con i nodi in ordine standard

$$
x_0,x_1,\ldots,x_n
$$

e poi con i nodi permutati

$$
x_{\sigma(0)},x_{\sigma(1)},\ldots,x_{\sigma(n)}
$$
in entrambi i casi otteniamo lo stesso polinomio interpolante, perché i nodi sono gli stessi e cambiare l’ordine dei nodi non cambia i dati da interpolare
$p(x)$ ha come ultimo termine
$f[x_0,\ldots,x_n]$ e $f[x_{\sigma(0)},\ldots,x_{\sigma(n)}]$
con coefficienti $(x-x_0)...(x-x_{n-1})$ e $(x-x_{\sigma(0)})...(x-x_{\sigma(n-1)})$
abbiamo due polinomi interpolanti uguali su stesso nodo dunque
$$
f[x_0,\ldots,x_n]=f[x_{\sigma(0)},\ldots,x_{\sigma(n)}]
$$
$$\square$$
##### Osservazione 1.1
Dati per supposizione i punti $(x_0,y_0),(x_1,y_1),...,(x_n,y_n) \in \mathbb{R}^2$
con $x_0,x_1,...,x_n$ distinti allora i numeri $y_0,y_1,...,y_n$ possono essere interpretati come valori in $x_0,x_1,...,x_n$ di una qualche funzione $f:[a,b]->\mathbb{R}$ definita su un qualche intervallo $[a,b]$ che contiene i punti $x_0,...,x_n$ 
perciò ha senso parlare di forma di Newton del polinomio di interpolazione dei dati $(x_0,y_0),...,(x_n,y_n)$ anche quando non viene specificata alcuna funzione $f(x)$ t.c $f(x_i)=y_i$ $\forall i =0,...,n$ 
in questi casi qui è sufficiente immaginarsi una funzione che assume quei valori y in quei nodi
##### Osservazione 1.2
la prima parte dell'algoritmo è indipendente dal punto t in cui $p(x)$ viene valutato quindi per valutare $p(x)$ in $m$ punti $t_1,t_2,...,t_m \in \mathbb{R}$ 
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

