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

Definiamo quindi

$$
z:[a,b]\to\mathbb{R}
$$
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
siccome $\alpha$ è continua su $[a,b]$, anche $z$ è continua su $[a,b]$.
Per il teorema dei valori intermedi, $z$ assume tutti i valori compresi tra il suo minimo e il suo massimo
$mC \leq z(y) \leq MC$ 
ma anche 
$$
mC
\leq
\int_a^b \beta(x)\omega(x)\,dx
\leq
MC
$$

Quindi $z$ assume anche il valore

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
Per il teorema dell’errore dell’interpolazione

$\forall x \in [x_j,x_{j+1}]$ $\exists$ un punto $\xi_j(x)\in(x_j,x_{j+1})$ t.c

$$
f(x)-s(x)=\frac{f''(\xi_j(x))}{2!}(x-x_j)(x-x_{j+1})
$$
utilizziamo il lemma 2.1 su $[x_j,x_{j+1}]$ abbiamo che
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

- $\omega(x)$ è continua e $\omega(x)\geq 0$ su $[x_j,x_{j+1}]$
	- è continua perché è un polinomio
	- è $\geq 0$ perché su $[x_j,x_{j+1}]$ abbiamo $x-x_j\geq 0$ e $x_{j+1}-x\geq 0$, quindi il prodotto è non negativo

- $\alpha(x)$ è continua su $[x_j,x_{j+1}]$
	- infatti $\alpha(x)=f''(x)$ e $f\in C^2[a,b]$

- $\beta(x)\omega(x)$ è continua
	- qui non dobbiamo dimostrare che $\beta(x)$ da sola è continua
	- il lemma richiede la continuità di $\beta(x)\omega(x)$
	- infatti, dalla formula dell’errore,

$$
f(x)-s(x)=-\beta(x)\omega(x)
$$

quindi

$$
\beta(x)\omega(x)=s(x)-f(x)
$$

e questa funzione è continua perché sia $s(x)$ sia $f(x)$ sono continue
- $\beta(x)$ è compresa tra il minimo e il massimo di $\alpha(x)=f''(x)$ su $[x_j,x_{j+1}]$
	- infatti $\beta(x)=f''(\xi_j(x))$
	- per ogni $x\in[x_j,x_{j+1}]$, il punto $\xi_j(x)$ appartiene a $(x_j,x_{j+1})$
	- quindi $f''(\xi_j(x))$ è uno dei valori assunti da $f''$ dentro l’intervallino
	- perciò è necessariamente compreso tra il minimo e il massimo di $f''$ su $[x_j,x_{j+1}]$

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

quindi quello di prima diventa

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

quindi

$$
dt=dx$$
Gli estremi diventano:

se $x=x_j$, allora

$$
t=x_j-x_j=0
$$

se $x=x_{j+1}$, allora

$$
t=x_{j+1}-x_j=h
$$

inoltre

$$
x_{j+1}-x=x_{j+1}-(t+x_j)=x_{j+1}-x_j-t=h-t
$$

quindi l’integrale diventa

$$
\int_0^h \frac{t(h-t)}{2}\,dt
$$

calcoliamo questo integrale:

$$
\int_0^h \frac{t(h-t)}{2}\,dt
=
\frac{1}{2}\int_0^h (ht-t^2)\,dt
$$

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

quindi

$$
\int_a^b f(x)\,dx-I_n
=
-
\sum_{j=0}^{n-1}
f''(\eta_j)\frac{h^3}{12}
$$

portiamo fuori la costante:

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

allora

$$
\int_a^b f(x)\,dx-I_n
=
-\frac{(b-a)h^2}{12}
\left[
\frac{1}{n}
\sum_{j=0}^{n-1}f''(\eta_j)
\right]
$$

questa media è un valore compreso tra il minimo e il massimo di $f''$ su $[a,b]$ per Weierstrass
$f''(x)$ continua su $[a,b]$, per il teorema dei valori intermedi esiste sicuramente un punto $\eta\in[a,b]$ tale che

$$
f''(\eta)
=
\frac{1}{n}
\sum_{j=0}^{n-1}f''(\eta_j)
$$

sostituendo otteniamo

$$
\int_a^b f(x)\,dx-I_n
=
-\frac{(b-a)h^2}{12}f''(\eta)
$$

cioè
$$
\int_a^b f(x)\,dx-I_n
=
-\frac{(b-a)f''(\eta)}{12}h^2
$$
$$\square$$
##### Osservazione 2.1
Questa osservazione sta dicendo una cosa pratica sulla **formula dei trapezi composita**: se voglio garantire un errore al massimo uguale a ε\varepsilonε, allora devo scegliere un numero di sottointervalli nnn che cresce come
$\frac{1}{\sqrt{\varepsilon}}$
Cioè: più voglio un errore piccolo, più devo aumentare $n$, ma non in modo lineare rispetto a $1/\varepsilon$, bensì rispetto a $1/\sqrt{\varepsilon}$​
Sostituendo nella formula dell’errore:
$$\left|\int_a^b f(x)\,dx-I_n\right| = \frac{(b-a)|f''(\eta)|}{12}\frac{(b-a)^2}{n^2}$$
Quindi
$$\left|\int_a^b f(x)\,dx-I_n\right| = \frac{(b-a)^3|f''(\eta)|}{12n^2}$$
Ora, di solito non conosciamo il punto η\etaη, quindi non possiamo calcolare esattamente $$|f''(\eta)|$$Allora prendiamo una costante $K$ tale che
$$|f''(x)|\leq K \qquad \forall x\in[a,b]$$
Questa $K$ è un maggiorante della derivata seconda sull’intervallo.
Allora sicuramente
$$|f''(\eta)|\leq K$$
e quindi
$$\left|\int_a^b f(x)\,dx-I_n\right| \leq \frac{(b-a)^3K}{12n^2}$$
A questo punto vogliamo che l’errore sia al massimo $\varepsilon$, quindi imponiamo
$$\frac{(b-a)^3K}{12n^2}\leq \varepsilon$$
Risolviamo rispetto a nnn.

Moltiplicando:
$(b-a)^3K\leq 12\varepsilon n^2$
Dividendo per $12\varepsilon$:
$\frac{(b-a)^3K}{12\varepsilon}\leq n^2$
Quindi
$n\geq \sqrt{\frac{(b-a)^3K}{12\varepsilon}}$
Questa quantità viene chiamata
$n(\varepsilon)$
Quindi
$n(\varepsilon)=\sqrt{\frac{(b-a)^3K}{12\varepsilon}}$
L’osservazione poi nota che questa formula si può scrivere come
$n(\varepsilon)=\frac{C}{\sqrt{\varepsilon}}$
dove
$C=\sqrt{\frac{(b-a)^3K}{12}}$
Infatti:
$\sqrt{\frac{(b-a)^3K}{12\varepsilon}} = \frac{1}{\sqrt{\varepsilon}} \sqrt{\frac{(b-a)^3K}{12}}$
##### Osservazione a pagina 27
 Osservazione — Esistenza di un autovalore con parte immaginaria $(\ge \frac14)$

Nell’Esempio 3.2 si considera la matrice
$$\begin{pmatrix} 2 & 4 & -1 & 0\\ 0 & 1+i & 0 & 7\\ 1 & -1 & 1 & -2i\\ 3 & -1 & 0 & -12 \end{pmatrix}$$

La matrice è $4\times 4$, quindi ha quattro autovalori, che indichiamo con
La matrice è ($4\times 4$), quindi ha quattro autovalori, che indichiamo con
$\lambda_1,\lambda_2,\lambda_3,\lambda_4$ 
Dal richiamo teorico sappiamo che la traccia di una matrice è uguale alla somma dei suoi autovalori, contati con molteplicità algebrica:
$$\operatorname{tr}(A)=\lambda_1+\lambda_2+\lambda_3+\lambda_4.  $$
Nel libro viene calcolato che 
$$\operatorname{tr}(A)=-8+i.  $$

Quindi la parte immaginaria della traccia è
$$\operatorname{Im}(\operatorname{tr}(A))=1 $$
Vogliamo dimostrare che esiste almeno un autovalore $\lambda_j$ tale che
$\operatorname{Im}(\lambda_j)\ge \frac14$
Cioè vogliamo dimostrare che almeno uno degli autovalori ha parte immaginaria maggiore o uguale a ($\frac14$)

Supponiamo per assurdo che nessun autovalore abbia parte immaginaria maggiore o uguale a $(\frac14)$.
Allora tutti e quattro gli autovalori avrebbero parte immaginaria strettamente minore di $(\frac14)$:
$\operatorname{Im}(\lambda_1)<\frac14$
$\operatorname{Im}(\lambda_2)<\frac14$
$\operatorname{Im}(\lambda_3)<\frac14$
$\operatorname{Im}(\lambda_4)<\frac14$
Ora usiamo il fatto che
$$\operatorname{tr}(A)=\lambda_1+\lambda_2+\lambda_3+\lambda_4$$
Prendiamo la parte immaginaria di entrambi i membri:
$\operatorname{Im}(\operatorname{tr}(A))$
$\operatorname{Im}(\lambda_1+\lambda_2+\lambda_3+\lambda_4)$
La parte immaginaria della somma è la somma delle parti immaginarie, quindi
$\operatorname{Im}(\operatorname{tr}(A))$
$\operatorname{Im}(\lambda_1)$
$\operatorname{Im}(\lambda_2)$
$\operatorname{Im}(\lambda_3)$  
$\operatorname{Im}(\lambda_4)$
Per l’ipotesi assurda, ciascun termine è minore di $(\frac14)$ Quindi
$$\operatorname{Im}(\operatorname{tr}(A))  
<  
\frac14+\frac14+\frac14+\frac14$$
Ma
$\frac14+\frac14+\frac14+\frac14=1$
Dunque avremmo
$\operatorname{Im}(\operatorname{tr}(A))<1$
Però sappiamo che
$\operatorname{tr}(A)=-8+i,$
quindi
$\operatorname{Im}(\operatorname{tr}(A))=1$
Abbiamo ottenuto una contraddizione:
$1<1$
che è impossibile.
Quindi l’ipotesi assurda era falsa.
Pertanto deve esistere almeno un autovalore ($\lambda_j$) tale che
$\operatorname{Im}(\lambda_j)\ge \frac14$
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
1. $A$ è definita positiva
2. $x^*Ax>0$ per ogni $x\in\mathbb{C}^n\setminus\{0\}$
3. gli autovalori di $A$ sono reali e positivi
4. $\det(A_k)>0$ per ogni $k=1,\ldots,n$
##### Dimostrazione

$$
\operatorname{Re}(A)=\frac{A+A^*}{2}
$$

Dimostrazione di $1\iff 2$

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

per ogni $x\neq 0$, ma questo è equivalente a dire

$$
x^*Ax>0
$$

per ogni $x\neq 0$.

Dimostrazione di $1\Rightarrow 3$

supponiamo che $A$ sia hermitiana e definita positiva.

Sappiamo già che gli autovalori di una matrice hermitiana sono reali.

Dobbiamo dimostrare che sono anche positivi.

Sia $\lambda$ un autovalore di $A$ e sia

$$
x\in\mathbb{C}^n\setminus\{0\}
$$

un autovettore associato, quindi

$$
Ax=\lambda x
$$

moltiplichiamo per $x^*$ a sinistra:

$$
x^*Ax=x^*(\lambda x)=\lambda x^*x
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

siccome $A$ è definita positiva e hermitiana, abbiamo

$$
x^*Ax>0
$$

e siccome

$$
\sum_{i=1}^n |x_i|^2>0
$$

otteniamo

$$
\lambda>0
$$

quindi gli autovalori sono reali e positivi.
##### Esercizio 3.4
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
questa dimostrazione è divisa in 3 casi

- caso 1

$p(\lambda)=a_0$ è costante.

In tal caso

$$
p(A)=a_0I
$$

quindi

$$
p(A)=
\begin{pmatrix}
a_0 & 0 & \cdots & 0\\
0 & a_0 & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & a_0
\end{pmatrix}
$$

gli autovalori di questa matrice sono

$$
a_0,\ldots,a_0
$$

ripetuto $n$ volte.

Questo coincide con

$$
p(\lambda_1),\ldots,p(\lambda_n)
$$

perché, essendo $p$ costante, vale

$$
p(\lambda_i)=a_0
$$

per ogni $i$.

Piccola spiegazione aggiuntiva.

Chiediamoci quali sono gli autovalori di $a_0I$.

Ricordiamo la definizione: $\lambda$ è autovalore di una matrice $B$ se esiste un vettore $v\neq 0$ tale che

$$
Bv=\lambda v
$$

nel nostro caso

$$
B=a_0I
$$

quindi

$$
Bv=a_0Iv
$$

ma la matrice identità lascia invariato ogni vettore:

$$
Iv=v
$$

quindi

$$
a_0Iv=a_0v
$$

e questo ha proprio la forma

$$
Bv=\lambda v
$$

con

$$
\lambda=a_0
$$

quindi l’unico autovalore è $a_0$, ripetuto $n$ volte.

- caso 2

$p(\lambda)=a_0+a_1\lambda$ ha grado $1$.

Qui assumiamo $a_1\neq 0$, altrimenti ricadiamo nel caso costante.

In questo caso

$$
p(A)=a_0I+a_1A
$$

il polinomio caratteristico di $p(A)$ e quello di $A$ sono legati dalla seguente relazione.

Per ogni $\lambda\in\mathbb{C}$,

$$
C_{p(A)}(\lambda)=\det(\lambda I-p(A))
$$

quindi

$$
C_{p(A)}(\lambda)=\det(\lambda I-(a_0I+a_1A))
$$

raccogliendo i termini con $I$:

$$
C_{p(A)}(\lambda)=\det((\lambda-a_0)I-a_1A)
$$

ora raccogliamo $a_1$:

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

ricordiamo che, per ogni $\alpha\in\mathbb{C}$ e ogni $B\in\mathbb{C}^{n\times n}$,

$$
\det(\alpha B)=\alpha^n\det(B)
$$

perciò

$$
C_{p(A)}(\lambda)
=
a_1^n\det\left(\frac{\lambda-a_0}{a_1}I-A\right)
$$

ma

$$
C_A(z)=\det(zI-A)
$$

quindi, mettendo

$$
z=\frac{\lambda-a_0}{a_1}
$$

otteniamo

$$
C_{p(A)}(\lambda)
=
a_1^n C_A\left(\frac{\lambda-a_0}{a_1}\right)
$$

gli autovalori di $p(A)$ sono gli zeri del suo polinomio caratteristico:

$$
\{\lambda\in\mathbb{C}:C_{p(A)}(\lambda)=0\}
$$

quindi

$$
C_{p(A)}(\lambda)=0
\iff
C_A\left(\frac{\lambda-a_0}{a_1}\right)=0
$$

il polinomio caratteristico di $A$ si annulla quando il suo argomento è uno degli autovalori di $A$.

Quindi

$$
\frac{\lambda-a_0}{a_1}\in\{\lambda_1,\ldots,\lambda_n\}
$$

cioè

$$
\frac{\lambda-a_0}{a_1}=\lambda_i
$$

per qualche $i$.

Da qui

$$
\lambda=a_0+a_1\lambda_i
$$

quindi gli autovalori di $p(A)$ sono

$$
a_0+a_1\lambda_1,\ldots,a_0+a_1\lambda_n
$$

cioè

$$
p(\lambda_1),\ldots,p(\lambda_n)
$$


- caso 3

assumiamo che $A$ sia diagonalizzabile.

Allora esistono una matrice invertibile

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

siccome

$$
X^{-1}X=I
$$

otteniamo

$$
A^2=XD^2X^{-1}
$$

Analogamente

$$
A^3=(XDX^{-1})(XDX^{-1})(XDX^{-1})=XD^3X^{-1}
$$

e in generale

$$
A^k=XD^kX^{-1}
$$

per ogni $k\geq 1$.

Per $k=0$, ricordiamo che

$$
A^0=I
$$

e si può scrivere anche

$$
I=XIX^{-1}
$$

vogliamo dimostrare il risultato per

$$
p(\lambda)=a_0+a_1\lambda+\cdots+a_m\lambda^m
$$

il polinomio nella matrice è

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

la matrice al centro è proprio

$$
p(D)
$$

quindi

$$
p(A)=Xp(D)X^{-1}
$$

Ora vediamo com’è fatta $p(D)$.

Siccome

$$
D=
\begin{pmatrix}
\lambda_1 & 0 & \cdots & 0\\
0 & \lambda_2 & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & \lambda_n
\end{pmatrix}
$$

allora

$$
D^2=
\begin{pmatrix}
\lambda_1^2 & 0 & \cdots & 0\\
0 & \lambda_2^2 & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & \lambda_n^2
\end{pmatrix}
$$

e in generale

$$
D^m=
\begin{pmatrix}
\lambda_1^m & 0 & \cdots & 0\\
0 & \lambda_2^m & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & \lambda_n^m
\end{pmatrix}
$$

quindi

$$
p(D)=a_0I+a_1D+a_2D^2+\cdots+a_mD^m
$$

cioè

$$
p(D)=
\begin{pmatrix}
a_0+a_1\lambda_1+a_2\lambda_1^2+\cdots+a_m\lambda_1^m & 0 & \cdots & 0\\
0 & a_0+a_1\lambda_2+a_2\lambda_2^2+\cdots+a_m\lambda_2^m & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & a_0+a_1\lambda_n+a_2\lambda_n^2+\cdots+a_m\lambda_n^m
\end{pmatrix}
$$

ma ciascun elemento diagonale è proprio il polinomio valutato nell’autovalore corrispondente:

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
quindi
- $p(A) è diagonalizzabile$ 
- gli autovalori di $p(A)$ sono $p(D)$ con autovettori $x_1,...,x_n$ come quelli di $A$ 

quindi $x_i$ è autovettore di $p(A)$ associato all’autovalore $p(\lambda_i)$
$$\square$$
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

#### TEOREMA 3.4 secondo teorema di Gershgorin

Supponiamo che l’unione di $k$ cerchi di Gershgorin di $A$ sia disgiunta dall’unione degli altri $n-k$ cerchi.
Allora $k$ autovalori di $A$ stanno nella prima unione e $n-k$autovalori stanno nella seconda unione.
#### Teorema 3.5 terzo teorema di Gershgorin(forte)
supponiamo che

$$
A\in\mathbb{C}^{n\times n}
$$
sia irriducibile.
Allora i punti che stanno sul bordo di quei cerchi di Gershgorin a cui appartengono, ma non sul bordo di tutti i cerchi, non sono autovalori di $A$.
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
quindi è escluso dagli autovalori di A
#### TEOREMA 3.7
Sia una matrice $A\in\mathbb{C}^{n\times n}$ tale che soddisfi almeno una delle seguenti condizioni:

1. $A$ è a diagonale dominante per righe e irriducibile
2. $A$ è a diagonale dominante in senso stretto per righe
3. $A$ è a diagonale dominante per colonne e irriducibile
4. $A$ è a diagonale dominante in senso stretto per colonne

Allora $A$ è invertibile
##### Dimostrazioni
##### Dimostrazione 1

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
##### Dimostrazione 2

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
##### Dimostrazione 3

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
##### Dimostrazione 4

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

#### TEOREMA 3.8

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

per ogni $x\in\mathbb{C}^n$
##### Esempio
Verifichiamo che la norma $1$ e la norma infinito sono equivalenti
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
