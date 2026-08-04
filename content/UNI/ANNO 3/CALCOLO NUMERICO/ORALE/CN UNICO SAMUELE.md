# Interpolazione polinomiale
L'**interpolazione** è il procedimento con cui si costruisce una funzione, in particolare un polinomio, che passa esattamente per un insieme di punti assegnati. Lo scopo è ottenere una funzione che permetta di rappresentare i dati noti e di stimare il valore della funzione in punti compresi tra quelli assegnati

## Polinomio interpolazione
Siano dati $(x_0,y_0),\dots,(x_n,y_n)\in\mathbb{R}^2$ con nodi $x_0,\dots,x_n$ distinti.
L’***unico polinomio***
$$
p\in\mathbb{R}_n[x]
$$
che soddisfa la condizione
$$
p(x_i)=y_i,\qquad i=0,\dots,n,
$$

si chiama **polinomio di interpolazione** dei dati $(x_0,y_0),\dots,(x_n,y_n)\in\mathbb{R}^2$.
(oppure viene chiamato **polinomio di interpolazione dei valori** $y_{0},\dots,y_{n}$ sui nodi $x_{0},\dots,x_{n}$)


### Spazio vettoriale reale dei polinomi di grado $\leq n$
$$
\mathbb{R}_n[x]
=
\left\{
a_0+a_1x+a_2x^2+\dots+a_nx^n
:
a_0,a_1,\dots,a_n\in\mathbb{R}
\right\}
$$


## Teorema 1.1 (unicità di `p(x)`)
Siano $(x_0,y_0),(x_1,y_1),\dots,(x_n,y_n)\in\mathbb{R}^2$ tali che $x_0,x_1,\dots,x_n$ sono tutti distinti.
Allora esiste un unico polinomio
$$
p(x)\in\mathbb{R}_n[x]
$$
tale che
$$
p(x_i)=y_i
\qquad
\forall i=0,\dots,n.
$$
chiamato **polinomio d’interpolazione di $f$ sui nodi $x_0,\dots,x_n$**.

### Dimostrazione 1
Il polinomio $$p(x)=a_0+a_1x+a_2x^2+\dots+a_nx^n\in\mathbb{R}_n[x]$$ soddisfa la proprietà
$$
p(x_i)=y_i
\qquad
\forall i=0,\dots,n
$$
se e solo se
$$
\begin{cases}
a_0+a_1x_0+a_2x_0^2+\dots+a_nx_0^n=y_0\\
a_0+a_1x_1+a_2x_1^2+\dots+a_nx_1^n=y_1\\
\vdots\\
a_0+a_1x_n+a_2x_n^2+\dots+a_nx_n^n=y_n
\end{cases}
$$

cioè se e solo se il suo vettore dei coefficienti
$$
(a_0,a_1,\dots,a_n)^T
$$

soddisfa il sistema lineare
$$
\begin{pmatrix}
1 & x_0 & x_0^2 & \dots & x_0^n\\
1 & x_1 & x_1^2 & \dots & x_1^n\\
\vdots & \vdots & \vdots & \ddots & \vdots\\
1 & x_n & x_n^2 & \dots & x_n^n
\end{pmatrix}
\begin{pmatrix}
a_0\\
a_1\\
\vdots\\
a_n
\end{pmatrix}
=
\begin{pmatrix}
y_0\\
y_1\\
\vdots\\
y_n
\end{pmatrix}.
$$

Dove la matrice è la **matrice di Vandermonde**
$$
V(x_0,x_1,\dots,x_n).
$$

Il sistema assume quindi la forma
$$
V(x_0,x_1,\dots,x_n)
\begin{pmatrix}
a_0\\
a_1\\
\vdots\\
a_n
\end{pmatrix}
=
\begin{pmatrix}
y_0\\
y_1\\
\vdots\\
y_n
\end{pmatrix}
\qquad
(\star)
$$

Il determinante della matrice di Vandermonde è
$$
\det(V)=
\begin{cases}
1, & \text{se }n=0,\\[4pt]
\displaystyle\prod_{\substack{i,j=0\\j<i}}^n(x_i-x_j),
& \text{se }n\geq 1.
\end{cases}
$$
Compaiono tutte le coppie di indici distinti, quindi, poiché gli $x_i$ sono tutti distinti,
$$
\det(V)\neq 0.
$$
E quindi la matrice di Vandermonde è **invertibile**.

Esiste quindi un’unica soluzione del sistema $(\star)$, per Cramer, e questa soluzione è
$$
\begin{pmatrix}
a_0\\
a_1\\
\vdots\\
a_n
\end{pmatrix}
=
V[(x_0,x_1,\dots,x_n)]^{-1}
\begin{pmatrix}
y_0\\
y_1\\
\vdots\\
y_n
\end{pmatrix}.
$$

Quindi esiste un unico vettore dei coefficienti $(a_0,\dots,a_n)$
e quindi un esiste un unico
$$
p(x)\in\mathbb{R}_n[x],
$$
con $p(x)=a_0+a_1x+\dots+a_nx^n,$
che soddisfa
$$
p(x_i)=y_i
\qquad
\forall i=0,\dots,n.
$$

#### Dimostro ora che la formula del determinante per $n\geq 1$ è vera
La dimostrazione la faccio per $n=3$, ma si può generalizzare.
Definisco
$$
d_i=\det(V(x_0,\dots,x_i)),
\qquad i=0,1,2,\dots,n = 3,
$$
e vogliamo calcolare $d_3$.

Si ha quindi che
$$
d_3=
\begin{vmatrix}
1 & x_0 & x_0^2 & x_0^3\\
1 & x_1 & x_1^2 & x_1^3\\
1 & x_2 & x_2^2 & x_2^3\\
1 & x_3 & x_3^2 & x_3^3
\end{vmatrix}.
$$

Per riscrivere meglio il determinante eseguo operazioni sulle colonne che non modificano il determinante.
- è una proprietà delle matrici che vale anche per le righe

###### Modifico la colonna 4
$$
C_4\leftarrow C_4-x_3C_3
$$
$$
d_3=
\begin{vmatrix}
1 & x_0 & x_0^2 & x_0^3-x_0^2x_3\\
1 & x_1 & x_1^2 & x_1^3-x_1^2x_3\\
1 & x_2 & x_2^2 & x_2^3-x_2^2x_3\\
1 & x_3 & x_3^2 & 0
\end{vmatrix}.
$$

###### Modifico colonna 3
$$
C_3\leftarrow C_3-x_3C_2
$$
$$
d_3=
\begin{vmatrix}
1 & x_0 & x_0^2-x_0x_3 & x_0^2(x_0-x_3)\\
1 & x_1 & x_1^2-x_1x_3 & x_1^2(x_1-x_3)\\
1 & x_2 & x_2^2-x_2x_3 & x_2^2(x_2-x_3)\\
1 & x_3 & 0 & 0
\end{vmatrix}.
$$

###### Modifico colonna 2
$$
C_2\leftarrow C_2-x_3C_1
$$
$$
d_3=
\begin{vmatrix}
1 & x_0-x_3 & x_0(x_0-x_3) & x_0^2(x_0-x_3)\\
1 & x_1-x_3 & x_1(x_1-x_3) & x_1^2(x_1-x_3)\\
1 & x_2-x_3 & x_2(x_2-x_3) & x_2^2(x_2-x_3)\\
1 & 0 & 0 & 0
\end{vmatrix}.
$$


Sviluppo ora il determinante lungo l’ultima riga:
$$
d_3
=
-1
\begin{vmatrix}
x_0-x_3 & x_0(x_0-x_3) & x_0^2(x_0-x_3)\\
x_1-x_3 & x_1(x_1-x_3) & x_1^2(x_1-x_3)\\
x_2-x_3 & x_2(x_2-x_3) & x_2^2(x_2-x_3)
\end{vmatrix}.
$$

Raccolgo i fattori comuni per ogni riga e, per la linearità del determinante rispetto a ogni riga/colonna,
$$
d_3
=
\underbrace{(-1)(x_0-x_3)(x_1-x_3)(x_2-x_3)}_{(x_{3}-x_{0})(x_{3}-x_{1})(x_{3}-x_{2})}
\underbrace{\begin{vmatrix}
1 & x_0 & x_0^2\\
1 & x_1 & x_1^2\\
1 & x_2 & x_2^2
\end{vmatrix}}_{d_{2}}
$$
Quindi ho scritto $d_{3}$ come formula ricorsiva in funzione di $d_{2}$
$$
d_3
=
(x_{3}-x_{0})(x_{3}-x_{1})(x_{3}-x_{2})d_2.
$$

Applicando lo stesso ragionamento a $d_2$ ottengo:
$$
d_2=(x_2-x_0)(x_2-x_1)d_1.
$$
E, per $d_1=x_1-x_0.$

Sostituendo tutto in $d_3$ 
$$
d_3
=
(x_3-x_0)(x_3-x_1)(x_3-x_2)
(x_2-x_0)(x_2-x_1)(x_1-x_0),
$$

che è esattamente la formula
$$
\prod_{\substack{i,j=0\\j<i}}^n(x_i-x_j).
$$

### Dimostrazione 2 - Polinomio di lagrange
Definiamo
$$
p(x)=y_0L_0(x)+y_1L_1(x)+\dots+y_nL_n(x)\qquad(*)
$$

Questo polinomio appartiene a $\mathbb{R}_{n}[x]$ poiché è combinazione lineare di polinomi che appartengono a $\mathbb{R}_n[x]$.

Devo verificare le due condizioni di interpolazione.
#### Esistenza
$\forall i=0,\dots,n$,$$
p(x_i)=\sum_{j=0}^n y_jL_j(x_i).
$$
Tutti i termini si annullano tranne quello con $j=i$:
$$
p(x_{i})=y \cdot\underbrace{L_{i}(x_{i})}_{=1}=y_{i}.
$$

#### Unicità
Supponiamo che esista un altro polinomio $q\in\mathbb{R}_n[x]$ tale che
$$
q(x_i)=y_i,
\qquad i=0,\dots,n.
$$

Dato che $L_0,\dots,L_n$ formano una base in $\mathbb{R}_n[x]$, allora esistono $\beta_0,\dots,\beta_n$ tali che
$$
q(x)=\beta_0L_0(x)+\dots+\beta_nL_n(x).
$$

Ma allora, per ogni $i=0,\dots,n$,
$$
y_i=q(x_i)
=
\beta_0L_0(x_i)+\dots+\beta_nL_n(x_i)
=
\beta_iL_i(x_i)
=
\beta_i.
$$

Sostituendo $\beta_i=y_i$ in $q(x)$:
$$
q(x)
=
y_0L_0(x)+y_1L_1(x)+\dots+y_nL_n(x)
\underbrace{=}_{(*)}
p(x).
$$

## Polinomio forma canonica
La **forma canonica** rappresenta il polinomio come combinazione di potenze della variabile. Un polinomio di grado al più $n$ si scrive come $$ p(x)=a_0+a_1x+a_2x^2+\cdots+a_nx^n, $$ dove $a_0,\dots,a_n$ sono i coefficienti da determinare imponendo le condizioni di interpolazione.

## Polinomio Lagrange
La **forma di Lagrange** è una rappresentazione del polinomio di interpolazione che non richiede di calcolare direttamente i coefficienti della forma canonica.
Il polinomio si scrive come $$ p(x)=\sum_{i=0}^{n} y_i\,L_i(x), $$ dove i polinomi fondamentali di Lagrange sono $$ L_i(x)=\prod_{\substack{j=0 \\ j\neq i}}^{n}\frac{x-x_j}{x_i-x_j}, \qquad i=0,\dots,n.$$dove il denominatore è una costante che dipende dai nodi (dati in input).
Quindi $L_{i} \in \mathbb{R}_{n}[x]$

###### Dimostrazione che è una base di $\mathbb{R_{n}[x]}$
Dimostro ora che $L_{0}(x), L_{1}(x),...,L_{n}(x)$ sono una base di $\mathbb{R}_{n}[x]$

>[!tip]- Definizione di base
> Una base di $R_{n}[x]$ è un **insieme di elementi** $v_{1}(x), v_{r}(x) \in R_{n}[x]$ tali che:
> 1. sono **linearmente indipendenti**
> 	- l'unica combinazione lineare $\alpha_{1}v_{1}(x) + \alpha_{r}v_{r}(x)$ che coincide con il polinomio nullo è la combinazione lineare con $\alpha_{1}=\dots=\alpha_{r}=0$
> 2. **generano** tutto lo spazio
> 	- ogni polinomio $q(x) \in R_{n}[x]$ si può scrivere come combinazione lineare $q(x) = \beta_{1}v_{1}(x) + \beta_{r}v_{r}(x)$ 
> 
> Ricordiamo anche che tutte le basi di $R_{n}[x]$ hanno tutte lo stesso numero di elementi che è la **dimensione di** $R_{n}[x]$
> 
> Nel caso di $\mathbb{R}_n[x]$, una base canonica è:
> $$
> \{1,x,x^2,\dots,x^n\}.
> $$
> 
> Quindi:
> $$
> \dim\left(\mathbb{R}_n[x]\right)=n+1.
> $$
> 

Sappiamo che in uno spazio vettoriale di dimensione $n+1$, una famiglia di $n+1$ elementi è una base se e solo se è linearmente indipendente.

Dato che $L_0(x),\dots,L_n(x)$ sono $n+1$, dimostro che sono linearmente indipendenti.

Osservo che, $\forall i,j=0,\dots,n$, si ha
$$
L_j(x_i)
=
\begin{cases}
1, & \text{se } i=j,\\
0, & \text{se } i\neq j.
\end{cases}
\qquad 
(+)
$$
Infatti, se $i\neq j$, al numeratore compare il fattore
$$
x_i-x_i=0.
$$
Quindi ogni polinomio $L_j$ vale $1$ nel proprio nodo $x_j$ e $0$ negli altri.

Supponiamo che
$$
a_0L_0(x)+a_1L_1(x)+\dots+a_nL_n(x)=0
\qquad
\forall x\in\mathbb{R}.
$$

Allora, $\forall i=0,\dots,n$, si ha
$$
a_0L_0(x_i)+a_1L_1(x_i)+\dots+a_nL_n(x_i)=0.
$$

Data la proprietà precedente $(+)$, sappiamo quindi che
$$
a_iL_i(x_i)=0.
$$

Dato $L_i(x_i)=1$ si ha
$$
a_i=0.
$$

Questo vale $\forall i=0,\dots,n$, quindi
$$
a_0=a_1=\dots=a_n=0.
$$

Questo vuol dire che i polinomi $L_0,\dots,L_n$ sono linearmente indipendenti e, dato che sono $n+1$, formano una base di $\mathbb{R}_n[x]$.


## Errore o resto di interpolazione
Dato il polinomio d'interpolazione $p$ su una $f$, vogliamo stimare l'errore $r(x)=f(x)-p(x)$.

## Teorema 1.2
Sia $f:[a,b]\to\mathbb{R}$ una funzione di classe $C^{n+1}[a,b]$ e sia $p(x)$ il polinomio d'interpolazione di $f(x)$ sugli $n+1$ nodi $x_0,x_1,\dots,x_n\in[a,b].$

Allora, per ogni $x\in[a,b]$, esiste un punto $\xi=\xi(x)\in(a,b)$ tale che
$$
f(x)-p(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}
(x-x_0)(x-x_1)\cdots(x-x_n)\qquad(*)
$$
>[!tip] La classe $C^{n+1}[a,b]$ indica la classe di funzioni derivabili n+1 volte nell'intervallo `[a,b]` con le derivate che sono continue proprio sull'intervallo `[a,b]`.

### Dimostrazione
Sia $x\in[a,b]$ fissato.
Dobbiamo dimostrare due casi.
#### Caso 1
Supponiamo che $x=x_i$ per qualche $i\in\{0,\dots,n\}$.
Dato che $p$ interpola $f$, vale che $p(x_i)=f(x_i).$
Quindi
$$
p(x_i)-f(x_i)=0.
$$

Anche il prodotto è uguale a zero, perché compare il fattore
$$
x_i-x_i=0.
$$

Quindi $0=0$ e possiamo scegliere qualunque $\xi\in(a,b)$.

#### Caso 2
Supponiamo che $x\neq x_i \qquad\forall i=0,\dots,n.$
Definiamo una funzione ausiliaria
$$
\pi(y)=(y-x_0)(y-x_1)\cdots(y-x_n)\qquad\in C^\infty[a,b]
$$
e anche
$$
r(y)=\underbrace{f(y)}_{\in C^{n+1}[a,b]}-\underbrace{p(y)}_{\in C^{\infty}[a,b]}\qquad\in C^{n+1}[a,b].
$$

Infine definiamo $z:[a,b]\to\mathbb{R}$ tale che
$$
z(y)
=
r(y)
-
\underbrace{\frac{r(x)}{\pi(x)}}_{\substack{\text{è una} \\ \text{costante}}}
\pi(y)
\qquad\in C^{n+1}[a,b].
$$

Ora, $\forall x_{i}$ (con $i = 0,\dots,n$), vale
$$
z(x_i)
=
r(x_i)
-
\frac{r(x)}{\pi(x)}
\pi(x_i)
=
0.
$$
- Infatti 
	- $r(x_i)=f(x_i)-p(x_i)=0$
	- e $\pi(x_i)=0.$

Inoltre,
$$
z(x)
=
r(x)-\frac{r(x)}{\pi(x)}\pi(x)
=
0.
$$

Quindi $z$ si annulla in almeno $n+2$ punti distinti:
$$
x_0,x_1,\dots,x_n,x.
$$

Applicando il **teorema di Rolle** si ha che:
- $z'$ si annulla in almeno $n+1$ punti;
- $z''$ si annulla in almeno $n$ punti;
- $\dots$
- $z^{(n+1)}$ **si annulla in almeno un punto**, chiamato $\xi$.

Allora esiste $\xi\in(a,b)$ tale che
$$
z^{(n+1)}(\xi)=0.
$$

Calcolo di $z^{(n+1)}$
$$
\begin{array}{rcl}
z^{(n+1)}(\xi)
&=&
r^{(n+1)}(\xi)
-
\dfrac{r(x)}{\pi(x)}
\pi^{(n+1)}(\xi)
\\[1em]

\color{cyan}{
\substack{
\text{Dato che } r(y)=f(y)-p(y)
}}
\qquad
&\Big\vert&
\\[-0.2em]

&=&
f^{(n+1)}(\xi)
-
p^{(n+1)}(\xi)
-
\dfrac{r(x)}{\pi(x)}
\pi^{(n+1)}(\xi)
\\[1em]

\color{cyan}{
\substack{
\text{Poiché } p \text{ ha grado}\\
\text{minore o uguale a } n,\\
p^{(n+1)}(\xi)=0
}
}
\qquad
&\Big\vert&
\\[-0.2em]

&=&
f^{(n+1)}(\xi)
-
\dfrac{r(x)}{\pi(x)}
\pi^{(n+1)}(\xi)
\\[1em]

\color{cyan}
{\substack{
\pi(y) \text{è monico (con coefficiente di grado max = 1},\\
\pi(y) = (y-x_{0})(y-x_{1})\dots(y-x_{n})= 1 \cdot y^{n+1} + q_{n}(x) \\
\text{quindi }\pi^{(n+1)}(\xi)=(n+1)!
}}
\qquad
&\Big\vert&
\\[-0.2em]

0
&=&
f^{(n+1)}(\xi)
-
\dfrac{r(x)}{\pi(x)}(n+1)!
\end{array}
$$

Da cui, portando a sinistra $r(x)$ si ottiene
$$
r(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}\pi(x).
$$
essendo
- $r(x)=f(x)-p(x)$
 e
- $\pi(x)=(x-x_0)(x-x_1)\cdots(x-x_n),$
si ottiene
$$
f(x)-p(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}
(x-x_0)(x-x_1)\cdots(x-x_n).
$$

**Osservazione:** non serve necessariamente conoscere il polinomio interpolante $p(x)$.


## Forma di Newton
I coefficienti sono le **differenze divise**.
### Differenze divise per Newton
Sia $f:[a,b]\to\mathbb{R}$.
#### 2.1 Caso base
Per $y\in[a,b]$ si definisce la differenza divisa di $f(x)$ relativa a $y$:
$$
f[y]=f(y).
$$
#### 2.2 Definizione ricorsiva
Siano:
$$
y_1,\dots,y_k\in[a,b]
$$
punti distinti, con $k\geq 2$.

Si definisce:
$$
f[y_1,\dots,y_k]
=
\frac{
f[y_2,\dots,y_{k-2},y_k]
-
f[y_1,\dots,y_{k-1}]
}{
y_k-y_{k-1}
}.
$$

## Teorema 1.3
Sia $f:[a,b]\to\mathbb{R}$ e siano $x_0,x_1,\dots,x_n\in[a,b]$ nodi distinti.
Allora il polinomio d'interpolazione in forma di newton di $f(x)$ sui nodi $x_0,x_1,\dots,x_n$ è
$$
\begin{aligned}
p(x)
={}&f[x_0]
+f[x_0,x_1](x-x_0)\\
&+f[x_0,x_1,x_2](x-x_0)(x-x_1)
+\dots\\
&+f[x_0,\dots,x_n](x-x_0)\cdots(x-x_{n-1}).
\end{aligned}
$$
- metto alla fine $x_{n-1}$ così il grado massimo è $n$.

## Corollario 1.1
Sia $f:[a,b]\to\mathbb{R}$ e siano $x_0,x_1,\dots,x_n\in[a,b]$ nodi distinti.
Allora $f[x_0,\dots,x_n]$ non cambia se vengono permutati i suoi $n+1$ argomenti, ossia, se $\sigma$ è una qualunque permutazione di $\{0,\dots,n\}$,
$$
f[x_0,\dots,x_n]
=
f[x_{\sigma(0)},\dots,x_{\sigma(n)}].
$$

### Dimostrazione
Sia $\sigma$ una qualunque permutazione di $\{0,\dots,n\}$.
Dalla forma di Newton applicata con i nodi $x_0,x_1,\dots,x_n$ e poi con i nodi permutati $x_{\sigma(0)},\dots,x_{\sigma(n)},$
notiamo che
$$
f[x_0,\dots,x_n]
\qquad\text{e}\qquad
f[x_{\sigma(0)},\dots,x_{\sigma(n)}]
$$
sono entrambi i coefficienti direttori (cioè i coefficienti davanti a $x^n$), del polinomio d'interpolazione $p(x)$ sui nodi $x_0,x_1,\dots,x_n$.

Cambiando l'ordine dei nodi il polinomio d'interpolazione non cambia, quindi non cambia nemmeno il suo coefficiente direttore.


## Osservazione 1.1
Supponiamo che siano dati solo $(x_0,y_0),\dots,(x_n,y_n)\in\mathbb{R}^2$ con $x_0,\dots,x_n$ distinti.

I numeri $y_0,\dots,y_n$ possono sempre essere interpretati come i valori di una qualche funzione
$$
f:[a,b]\to\mathbb{R} \qquad \text{con }(x_0,\dots,x_n)\in[a,b].
$$

Quindi non serve conoscere la funzione per scrivere la forma di Newton.


## Algoritmo di valutazione di un polinomio in un punto
- Sia $f:[a,b]\to\mathbb{R}$ una funzione.
- Siano $x_0,\dots,x_n\in[a,b]$ nodi distinti.
- Sia $t\in\mathbb{R}$.

Dalla forma di Newton possiamo costruire un algoritmo per calcolare $p(t)$, dove $p(x)$ è il polinomio d'interpolazione di $f(x)$ sui nodi $x_0,\dots,x_n$.

L'algoritmo si divide in due parti.
### Prima parte
Partendo dalla forma di Newton si calcolano le differenze divise
$$
f[x_0],f[x_0,x_1],\dots,f[x_0,x_1,\dots,x_n].
$$

>[!tip] **N.B.:** questa parte non dipende da $t$.

### Costo
Per ogni differenza divisa servono due sottrazioni e una divisione.
Dato che $f[x_i] \qquad i=0,\dots,n,$ sono già note, le operazioni complessive sono
il numero di elementi da calcolare è
$$
1+2+\cdots+n=\frac{n(n+1)}{2}
$$
Quindi
$$
C_1(n)
=
2\cdot\frac{n(n+1)}{2}A
+
\frac{n(n+1)}{2}D.
$$
Quindi
$$
C_1(n)
=
n(n+1)A
+
\frac{n(n+1)}{2}D.
$$

## Seconda parte
Calcoliamo $p(t)$ usando il metodo di Ruffini-Horner, in cui si raccolgono gli elementi simili $(x-x_i)$.

Nel caso $n=3$:
$$
p(t)
=
f[x_0]
+
(t-x_0)
\Biggl( 
f[x_0,x_1]
+
(t-x_1)
\Bigl(
f[x_0,x_1,x_2]
+
(t-x_2)f[x_0,x_1,x_2,x_3]
\Bigr) 
\Biggr).
$$

Ponendo
$$
h_3=f[x_0,x_1,x_2,x_3],
$$
$$
h_2=f[x_0,x_1,x_2]+(t-x_2)h_3,
$$
$$
h_1=f[x_0,x_1]+(t-x_1)h_2,
$$
$$
h_0=f[x_0]+(t-x_0)h_1,
$$
con una procedura ricorsiva otteniamo
$$
p(t)=h_0.
$$

### Costo
Bisogna calcolare
$$
h_{n-1},h_{n-2},\dots,h_0,
$$
cioè $n$ valori.

Per ogni valore calcolato servono:
- una sottrazione;
- una moltiplicazione;
- un'addizione.

Quindi
$$
C_2(n)=2nA+nM.
$$

# Costo totale dell'algoritmo
$$
C(n)=C_1(n)+C_2(n).
$$

Quindi
$$
C(n)
=
(n^2+3n)A
+nM
+
\frac{n^2+n}{2}D.
$$

Per grandi valori di $n$,
$$
C(n)\approx n^2A+\frac{n^2}{2}D.
$$

>[!tip] Una sottrazione e un addizione a livello computazionale sono simili perché fare $\alpha - \beta$ equivale a fare $\alpha + (-\beta)$. Quindi mettere un segno `-` non costa nulla.
>Discorso non applicabile alla divisione.


## Aggiunta di un nodo di interpolazione
La forma di Newton è particolarmente utile quando, ai dati di interpolazione già disponibili,
$$
(x_0,y_0),\dots,(x_n,y_n),
$$
viene aggiunto un nuovo dato $(x_{n+1},y_{n+1}),$ con: $x_{n+1}\neq x_i,\qquad i=0,\dots,n.$

L’idea è aggiornare il polinomio interpolante senza rifare tutti i calcoli da zero.

### Funzione associata ai dati e polinomi
Consideriamo una funzione $f(x)$ tale che:
$$
f(x_i)=y_i,
\qquad i=0,\dots,n+1.
$$

Il polinomio interpolante dei dati vecchi è $p\in\mathbb{R}_n[x]:$
$$
p(x)
=
f[x_0]
+
f[x_0,x_1](x-x_0)
+ \dots +
f[x_0,\dots,x_n]
\prod_{j=0}^{n-1}(x-x_j).
$$

Il polinomio interpolante dei dati nuovi è invece $q\in\mathbb{R}_{n+1}[x]:$
$$
q(x)
=
p(x)
+
f[x_0,\dots,x_n,x_{n+1}]
(x-x_0)(x-x_1)\cdots(x-x_n)
$$

> [!tip] La forma di Newton è **incrementale**: il nuovo polinomio si ottiene aggiungendo un solo termine al polinomio precedente.

### Aggiornamento della tabella delle differenze divise
Supponiamo di avere già $p(x)$ in forma di Newton.
Sono quindi già noti i coefficienti (o differenze divise):
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

> [!tip] Per costruire la nuova riga bastano:
> - i coefficienti già presenti nella forma di Newton;
> - il nuovo valore $f[x_{n+1}]$.
> 
> ![[Pasted image 20260713125631.png]]
> Se noti infatti io costruisco il nuovo valore usando solo quelli cerchiati in blu e il nuovo $f[x_{3}]$


---

# Integrazione numerica
L'**integrazione numerica** è l'insieme dei metodi che permettono di approssimare il valore di un integrale definito quando il suo calcolo esatto è difficile o impossibile.
L'idea è sostituire la funzione con un'approssimazione più semplice (ad esempio un polinomio interpolante) e calcolare l'integrale di tale approssimazione.

## Formula dei trapezi
Sia $f:[a,b]\to\mathbb{R}$ una funzione integrabile e si vuole calcolare un'approssimazione di $\int_a^b f(x)\,dx$ (dato che non sempre è possibile calcolare l'integrale con i metodi elementari).

A tal fine suddividiamo l'intervallo `[a,b]` in $n\geq 1$ sottointervalli della stessa ampiezza: $$
h=\frac{b-a}{n}
$$
I nodi sono $x_j=a+jh,\qquad \text{con} \ j=0,\dots,n.$

In particolare: $x_{0}=a \quad e \quad x_{n} = b$

Ogni sottointervallo ha la forma $[x_j,x_{j+1}]$ e ampiezza $x_{j+1}-x_j=h.$

> [!tip] Aumentando $n$, il passo $h$ diminuisce e la suddivisione diventa più fitta.


Il valore che si prende come approssimazione di $\int_{a}^{b}f(x)dx$ è $$\int_{a}^{b}s(x)dx \qquad \text{con }s:[a,b]\to\mathbb{R}$$
### Espressione di $s$ su un sottointervallo
Per $x\in[x_j,x_{j+1}],$ si ha:
$$
s(x)
=
f(x_j)
+
\frac{
f(x_{j+1})-f(x_j)
}{
\underbrace{x_{j+1}-x_j}_{h}
}
(x-x_j).
$$

> [!tip] Su ogni intervallo $[x_j,x_{j+1}]$, la funzione $S$ è il polinomio interpolante lineare di $f$ nei due estremi.

### Effettiva formula trapezi
Come approssimazione di $\int_a^b f(x)\,dx$ si usa:
$$
I_n
=
\int_a^b s(x)\,dx.
$$
Sviluppando l'integrale si ottiene: 
$$
\boxed{
I_n
=
h
\left[
\frac{f(a)+f(b)}{2}
+
\sum_{j=1}^{n-1}f(x_j)
\right]
}
$$

## Errore o resto della formula dei trapezi
Vogliamo capire qual è l'errore che si commette approssimando
$$
\int_a^{b} f(x)\,dx\quad\text{con } \quad I_n
$$

## Lemma 2.1
Siano $w,\alpha,\beta:[a,b]\to\mathbb{R}$ tali che:
- $w$ è continua e $w\geq 0$ su $[a,b]$;
- $\alpha(x)$ e $\beta(x)\omega(x)$ sono continue su $[a,b]$;
- $\forall x\in[a,b]$ vale
$$
m\leq \beta(x)\leq M,
$$
dove
$$
m=\min_{x\in[a,b]}\beta(x),
\qquad
M=\max_{x\in[a,b]}\beta(x).
$$

Allora esiste un punto $\eta\in[a,b]$ tale che
$$
\int_a^b \beta(x)\omega(x)\,dx
=
\alpha(\eta)\int_a^b \omega(x)\,dx.
$$

### Dimostrazione
Poiché $\omega(x)\geq 0$ su $[a,b]$ e
$$
m\leq \beta(x)\leq M
\qquad
\forall x\in[a,b],
$$

si ha che
$$
mw(x)\leq \beta(x)w(x)\leq Mw(x)
\qquad
\forall x\in[a,b].
$$

e questa disuguaglianza vale anche per gli integrali
$$
m\int_a^b w(x)\,dx
\leq
\int_a^b \beta(x)w(x)\,dx
\leq
M\int_a^b w(x)\,dx.
$$


Consideriamo ora la funzione $z:[a,b]\to\mathbb{R}$ definita da
$$
z(y)=\alpha(y)\int_a^b w(x)\,dx.
$$
Questa funzione è continua su $[a,b]$ poiché $\alpha(y)$ è continua su $[a,b]$.
Quindi, per il **teorema dei valori intermedi**, $z(y)$ assume tutti i valori compresi tra il suo minimo
$$
m\int_a^b w(x)\,dx
$$
e il suo massimo
$$
M\int_a^b w(x)\,dx.
$$

In particolare assume il valore
$$
\int_a^b \beta(x)\omega(x)\,dx,
$$

ossia esiste $\eta\in[a,b]$ tale che
$$
z(\eta)
=
\int_a^b \beta(x)\omega(x)\,dx.
$$

## Teorema 2.1
Sia $f:[a,b]\to\mathbb{R}$ di classe $C^2[a,b]$ e sia $I_n$ la formula dei trapezi di ordine $n$ e passo $h=\frac{b-a}{n}$ per approssimare
$$
\int_a^b f(x)\,dx.
$$

Allora esiste $\eta\in[a,b]$ tale che
$$
\int_a^b f(x)\,dx-I_n
=
-\frac{(b-a)f''(\eta)}{12}h^2.
$$

### Dimostrazione
Poniamo
$$
x_j=a+jh
\qquad
\text{per } j=0,\dots,n
$$
e indichiamo con $s(x)$ la funzione lineare a tratti che interpola $f(x)$ nei nodi.

Osserviamo che sull'intervallo $[x_j,x_{j+1}]$, $s(x)$ coincide con il polinomio d'interpolazione di $f(x)$ nei nodi $x_j$ e $x_{j+1}$.

Possiamo applicare il teorema di errore dell'interpolazione di grado $1$.
$$
\begin{array}{rcl}

\displaystyle
\int_a^b f(x)\,dx-I_n
&=&
\displaystyle
\int_a^b f(x)\,dx-\int_a^b s(x)\,dx
\\[1em]

\color{cyan}{
\substack{
\text{Per la linearità}\\
\text{dell’integrale}
}}
&\Big\vert&
\\[-0.2em]

&=&
\displaystyle
\int_a^b \bigl[f(x)-s(x)\bigr]\,dx
\\[1em]

\color{cyan}{
\substack{
\text{Separo l’integrale}\\
\text{nei sottointervalli}
}}
&\Big\vert&
\\[-0.2em]

&=&
\displaystyle
\sum_{j=0}^{n-1}
\int_{x_j}^{x_{j+1}}
\bigl[f(x)-s(x)\bigr]\,dx
\\[1em]

\color{cyan}{
\substack{
\text{Per il teorema dell’errore di interpolazione,}\\
\forall x\in[x_j,x_{j+1}]
\quad
\exists\,\xi_j(x)\in(x_j,x_{j+1})
\text{ tale che}\\
f(x)-s(x)
=
\dfrac{f''(\xi_j(x))}{2!}
(x-x_j)(x-x_{j+1})
}}
&\Big\vert&
\\[-0.2em]

&=&
\displaystyle
\sum_{j=0}^{n-1}
\int_{x_j}^{x_{j+1}}
\frac{f''(\xi_j(x))}{2}
(x-x_j)(x-x_{j+1})\,dx
\\[1em]

\color{cyan}{
\substack{
(x-x_{j+1})\leq_{0} \\
\text{ma per applicare il lemma 2.1 non deve mai cambiare di segno} \\
\text{quindi metto } \ (x-x_{j+1})=-(x_{j+1}-x) \\
\text{e porto il "-" fuori}
}}
&\Big\vert&
\\[-0.2em]

&=&
\displaystyle
-\sum_{j=0}^{n-1}
\int_{x_j}^{x_{j+1}}
f''(\xi_j(x))
\frac{(x-x_j)(x_{j+1}-x)}{2}\,dx
\\[1em]

\color{cyan}{
\substack{
\text{Applico il Lemma 2.1 con}\\
\alpha(x) = f''(x), \quad \beta(x)=f''(\xi_{j(x)),}\\
w(x)=\dfrac{(x-x_j)(x_{j+1}-x)}{2}.
}}
&\Big\vert&
\\[-0.2em]

&=&
\displaystyle
-\sum_{j=0}^{n-1}
f''(\eta_j)
\int_{x_j}^{x_{j+1}}
\frac{(x-x_j)(x_{j+1}-x)}{2}\,dx
\\[1em]

\color{cyan}{
\substack{
t=x-x_j,\\
x=x_j+t,\qquad dx=dt,\\
x=x_j\Rightarrow t=0,\\
x=x_{j+1}\Rightarrow t=h
}}
&\Big\vert&
\\[-0.2em]

&=&
\displaystyle
-\sum_{j=0}^{n-1}
f''(\eta_j)
\int_0^h
\frac{t(h-t)}{2}\,dt
\\[1em]

&\Big\vert&
\\[-0.2em]

&=&
\displaystyle
-\sum_{j=0}^{n-1}
f''(\eta_j)
\int_0^h
\left(
\frac{ht}{2}-\frac{t^2}{2}
\right)\,dt
\\[1em]

\color{cyan}{
\substack{
\displaystyle
\int_0^h
\left(
\frac{ht}{2}-\frac{t^2}{2}
\right)dt
=
\left[
\frac{ht^2}{4}-\frac{t^3}{6}
\right]_0^h
=
\frac{h^3}{12}
}}
&\Big\vert&
\\[-0.2em]

&=&
\displaystyle
\underbrace{-\frac{h^3}{12}}_{\substack{\text{l'ho portata fuori} \\ \text{perché è una costante}}}
\sum_{j=0}^{n-1}f''(\eta_j)
\\[1em]

\color{cyan}{
\substack{
\text{Moltiplico e divido per }n\\
\text{per ottenere una media aritmetica}
}}
&\Big\vert&
\\[-0.2em]

&=&
\displaystyle
-\frac{nh^3}{12}
\left[
\frac{1}{n}
\sum_{j=0}^{n-1}f''(\eta_j)
\right]
\\[1em]

\color{cyan}{
\substack{
nh=b-a
}}
&\Big\vert&
\\[-0.2em]

&=&
\displaystyle
-\frac{(b-a)h^2}{12}
\left[
\frac{1}{n}
\sum_{j=0}^{n-1}f''(\eta_j)
\right]
\\[1em]

\color{cyan}{
\substack{
\text{La media aritmetica dei valori }f''(\eta_j)\\
\text{è compresa tra il minimo e il massimo di }f''\text{ in }[a,b].\\
\text{Poiché }f''\text{ è continua, per il teorema}\\
\text{dei valori intermedi esiste }\eta\in[a,b]\text{ tale che}\\
\displaystyle
\frac{1}{n}\sum_{j=0}^{n-1}f''(\eta_j)=f''(\eta)
}}
&\Big\vert&
\\[-0.2em]

\displaystyle
\int_a^b f(x)\,dx-I_n
&=&
\displaystyle
-\frac{b-a}{12}f''(\eta)h^2.

\end{array}
$$

## Osservazione su $m(\varepsilon)$ negli esercizi
Il valore $m(\varepsilon)$, che ci garantisce un errore minore o uguale a $\varepsilon$ se prendiamo $n\geq m(\varepsilon)$, è della forma
$$
\frac{C}{\sqrt{\varepsilon}} \qquad \text{con C costante}
$$

In base alla formula precedente, sia $K$ una costante tale che
$$
|f''(x)|\leq K
\qquad
\forall x\in[a,b].
$$

Si ha che
$$
\left|
\int_a^b f(x)\,dx-I_n
\right|
=
\left|
-\frac{(b-a)}{12}f''(\eta)h^2
\right|
$$
$$
=
\frac{(b-a)^3}{12n^2}|f''(\eta)|
\leq
\frac{(b-a)^3K}{12n^2}.
$$
e
$$
\frac{(b-a)^3K}{12n^2}
\leq
\varepsilon
\iff
n
\geq
\sqrt{
\frac{(b-a)^3K}{12\varepsilon}
}
=
m(\varepsilon).
$$

Quindi è garantito che
$$
\left|
\int_a^b f(x)\,dx-I_n
\right|
\leq
\varepsilon
$$

se prendiamo
$$
n\geq m(\varepsilon)
=
\frac{C}{\sqrt{\varepsilon}},
$$

con
$$
C=\sqrt{\frac{(b-a)^3K}{12}}
$$

e $K$ che soddisfa
$$
|f''(x)|\leq K
\qquad
\forall x\in[a,b].
$$


## Estrapolazione
Sia $f:[a,b]\to\mathbb{R}$ una funzione integrabile.
Consideriamo più formule dei trapezi, tutte usate per approssimare lo stesso integrale:
$$
\int_a^b f(x)\,dx.
$$

Indichiamo queste formule con $I_{n_0},I_{n_1},\dots,I_{n_m},$ dove gli ordini $n_0,n_1,\dots,n_m$ sono tutti distinti.

A ogni formula corrisponde un diverso passo di discretizzazione:
$$
h_0=\frac{b-a}{n_0},
$$
$$
h_1=\frac{b-a}{n_1},
$$
$$
\dots
$$
$$
h_m=\frac{b-a}{n_m}.
$$

Poiché gli ordini sono distinti, anche i passi $h_0,h_1,\dots,h_m$ e i loro quadrati $h_0^2,h_1^2,\dots,h_m^2$
sono distinti.

### Costruzione del polinomio interpolante
Consideriamo i dati:
$$
(h_0^2,I_{n_0}),
$$
$$
(h_1^2,I_{n_1}),
$$
$$
\dots
$$
$$
(h_m^2,I_{n_m}).
$$

Chiamiamo $p\in\mathbb{R}_m[x]$ il polinomio interpolante di questi dati.

Quindi $p$ è l’unico polinomio di grado minore o uguale a $m$ tale che:
$$
p(h_j^2)=I_{n_j},
\qquad j=0,\dots,m.
$$

> [!tip] In questo problema i nodi dell’interpolazione non sono i nodi usati dalla formula dei trapezi.  
> I nodi del nuovo polinomio sono:
> $$
> h_0^2,h_1^2,\dots,h_m^2.
> $$
> I valori interpolati sono invece:
> $$
> I_{n_0},I_{n_1},\dots,I_{n_m}.
> $$

### Il valore estrapolato $p(0)$
Un risultato, che non viene dimostrato, afferma che $p(0)$ è un’approssimazione di: $$\int_a^b f(x)\,dx$$molto più accurata delle singole formule dei trapezi $I_{n_0},I_{n_1},\dots,I_{n_m}$.

In altre parole, si combinano diverse approssimazioni (non particolarmente precise) per ottenerne una nuova molto più accurata.

![[Pasted image 20260714150346.png]]
Qui dice che $p(0)$ è molto più preciso delle singole formule dei trapezi.

> [!tip]
> Le informazioni sulla funzione $f$ e sull’intervallo $[a,b]$ sono già contenute nei valori:
> $$
> I_{n_0},\dots,I_{n_m}.
> $$
> Una volta costruito $p$, il polinomio dipende direttamente soltanto dai dati:
> $$
> (h_j^2,I_{n_j}).
> $$

### Perché si chiama estrapolazione
Il polinomio $p(x)$ è costruito usando i nodi positivi:
$$
h_0^2,h_1^2,\dots,h_m^2.
$$

Il punto `0` non è uno di questi nodi e si ***trova fuori*** dal più piccolo intervallo che li contiene.

La procedura di valutare un polinomio interpolante fuori dal più piccolo intervallo contenente i nodi si chiama **estrapolazione**.

Il valore $p(0)$ si chiama **valore estrapolato**.

> [!tip]
> Nell’interpolazione il polinomio viene generalmente valutato tra i nodi.  
> Nell’estrapolazione viene valutato fuori dall’intervallo che contiene i nodi.


---

# Analisi di matrici
## Traccia, determinante, raggio spettrale e autovalori
Data una matrice $A ∈ \mathbb{C}^{n×n}$ con autovalori $λ_{1}, λ_{2}, . . . , λ_{n}$ si ha
- **AUTOVALORE** -> è uno scalare λ associato a una trasformazione lineare o a una matrice quadrata A, per il quale esiste un vettore non nullo v (detto **autovettore**) tale che l'equazione fondamentale $Av=λv$ sia soddisfatta.
- **TRACCIA** -> $tr(A)$ = somma degli elementi diagonali = $a_{11} + a_{22} + \dots + a_{nn}$.
	- per una proprietà sappiamo che la traccia è la somma degli autovalori = $\lambda_{1} + \lambda_{2} + \dots + \lambda_{n}$
- **DETERMINANTE** -> $\det(A)$ = prodotto degli autovalori = $\lambda_{1} \cdot \lambda_{2} \cdot \dots \cdot \lambda_{n}$
- **RAGGIO SPETTRALE** -> $\rho(A)$ = massimo tra il modulo degli autovalori = $max(|\lambda_{1}|, |\lambda_{2}|, \dots, |\lambda_{n}|)$ 
## Matrice invertibile
Una matrice $A ∈ \mathbb{C}^{n×n}$ si dice invertibile se esiste una matrice $B ∈ \mathbb{C}^{n \times n}$ tale che $AB = BA = I$.  In tal caso, la matrice $B$ è univocamente determinata, prende il nome di **matrice inversa di A** e viene denotata con $A^{−1}$ . 

Ricordiamo che una matrice $A ∈ \mathbb{C}^{n×n}$ è invertibile **se e solo se det(A) != 0**, ossia **se e solo se 0 non è un autovalore di A**. 

Ricordiamo inoltre che il prodotto AB di due matrici $A, B ∈ \mathbb{C}^{n×n}$ è **invertibile** se e solo se A e B sono invertibili; l’inversa in tal caso è $(AB)^{−1} = B^{−1}A^{−1}$ come si può verificare direttamente: $$ABB^{−1}A^{−1} = B^{−1}A^{−1}AB = I$$

>[!tip]- Osservazione a pagina 27
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
> 
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
> 

## Matrice diagonalizzabile
Una matrice $A ∈ \mathbb{C}^{n×n}$ si dice diagonalizzabile se esistono una matrice invertibile $X ∈ \mathbb{C}^{n×n}$ e una matrice diagonale $D = diag(λ_{1}, λ_{2}, \dots , λ_{n}) ∈ \mathbb{C}^{n×n}$ tali che $$A = XDX^{−1}$$
Dalla formula sappiamo che $\forall i = 1,\dots,n$ l'elemento diagonale $\lambda_{i}$ è un autovalore di A con corrispondente autovalore $x_{i} =$ i-esima colonna di X.
Questo lo si vede moltiplicando a destra entrambi i membri e ottenendo $$AX = XD$$e da qui si nota che la colonna i-esima di AX è $AX_{i}$ e la colonna i-esima di XD è $\lambda_{i}x_{i}$, per cui $$Ax_{i} = \lambda_{i}x_{i}$$Ricordiamo che ogni matrice $A \in \mathbb{C}^{n \times n}$ che possiede `n` autovalori *distinti* è **diagonalizzabile**.


## Matrice Hermitiana e simmetrica
Data una matrice $A \in \mathbb{C}^{m \times n}$, indichiamo con $A^{*}$ la **trasposta coniugata di `A`**.
Se `A` e `B` sono matrici moltiplicabili allora $$(AB)^{T} = B^{T}A^{T}, \qquad (AB)^{*} = B^{*}A^{*}$$
Una matrice $A \in \mathbb{C}^{n \times n}$ si dice **hermitiana** se $A^{*} = A$.
Nel caso in cui le componenti di A siano reali (ossia $A \in \mathbb{R}^{n \times n}$) si ha che $A^{T} = A^{*}$, per cui dire che `A` è hermitiana equivale a dire che `A` è **simmetrica** (ossia $A^{T} = A)$.
Gli elementi diagonali di una matrice hermitiana `A` sono uguali ai loro coniugati e dunque sono reali.
Anche gli autovalori di una matrice hermitiana sono reali, infatti se $\lambda$ è un autovalore di `A` e indichiamo con $x \neq 0$ un corrispondente autovettore, allora 
![[Pasted image 20260729120801.png]]
perché $x^{*}Ax$ è un numero reale, essendo uguale al suo complesso coniugato vale quindi
![[Pasted image 20260729120839.png]]

## Matrice definita positiva
Una matrice $A \in \mathbb{C}^{n \times n}$ si dice **definita positiva se** $$\operatorname{Re}(x^{*}Ax)>0\qquad \forall x\in\mathbb{C}^n\setminus\{0\}$$
Per analogia con i numeri complessi definiamo:
$$
\operatorname{Re}(A)=\frac{A+A^{*}}{2} \qquad e \qquad \operatorname{Im}(A)=\frac{A-A^*}{2i}.
$$

Vale:
$$
A=\operatorname{Re}(A)+i\operatorname{Im}(A).
$$

Inoltre:
$$
\operatorname{Re}(x^*Ax)=x^*\operatorname{Re}(A)x.
$$

Infatti:
$$
\operatorname{Re}(x^{*}Ax)
=
\frac{x^{*}Ax+\overline{x^{*}Ax}}{2}
=
\frac{x^{*}Ax+x^{*}A^{*}x}{2}
=
x^{*} \  \underbrace{\frac{A+A^{*}}{2}}_{\operatorname{Re}(A)} \ x.
$$

>[!tip] OSS.: Le matrici $\operatorname{Re}(A)$ e $\operatorname{Im}(A)$ sono sempre hermitiane.
>Vale anche se `A` di base non è hermitiana.

##### Dimostrazione dell'osservazione
Ricordiamo che una matrice $B$ è hermitiana se $B^{*}=B.$

Inoltre, utilizziamo le proprietà:
$$
(B+C)^*=B^*+C^*
$$
$$
(\alpha B)^*=\overline{\alpha}B^*
$$
$$
(A^*)^*=A.
$$

###### Dimostrazione per $\operatorname{Re}(A)$
Calcoliamo l’aggiunta della parte reale:
$$
\operatorname{Re}(A)^*
=
\left(\frac{A+A^*}{2}\right)^*.
$$

Poiché $\frac{1}{2}$ è un numero reale, il suo coniugato coincide con se stesso. Quindi:
$$
\operatorname{Re}(A)^*
=
\frac{(A+A^*)^*}{2}.
$$

Usando la proprietà dell’aggiunta della somma:
$$
\operatorname{Re}(A)^*
=
\frac{A^*+(A^*)^*}{2}.
$$

Poiché $(A^*)^*=A$, si ottiene:
$$
\operatorname{Re}(A)^*
=
\frac{A^*+A}{2}.
$$

Dato che la somma tra matrici è commutativa:
$$
\operatorname{Re}(A)^*
=
\frac{A+A^*}{2}
=
\operatorname{Re}(A).
$$

Quindi $\operatorname{Re}(A)$ è hermitiana.

###### Dimostrazione per $\operatorname{Im}(A)$
Calcoliamo l’aggiunta della parte immaginaria:
$$
\operatorname{Im}(A)^*
=
\left(\frac{A-A^*}{2i}\right)^*.
$$
In questo caso:
$$
\overline{\frac{1}{2i}}
=
-\frac{1}{2i}.
$$

Pertanto:
$$
\operatorname{Im}(A)^*
=
-\frac{1}{2i}(A-A^*)^*.
$$

Usando la proprietà dell’aggiunta:
$$
(A-A^*)^*
=
A^*-(A^*)^*.
$$

Poiché $(A^*)^*=A$, segue che:
$$
(A-A^*)^*
=
A^*-A.
$$

Quindi:
$$
\operatorname{Im}(A)^*
=
-\frac{1}{2i}(A^*-A).
$$

Portando il segno meno dentro la parentesi:
$$
\operatorname{Im}(A)^*
=
\frac{A-A^{*}}{2i} \ = \ \mathrm{Im}(A).
$$

Quindi anche $\operatorname{Im}(A)$ è hermitiana.

###### Conclusione
Pertanto, per ogni matrice $A \in \mathbb{C}^{n \times n}$, le matrici $\operatorname{Re}(A)$ e $\operatorname{Im}(A)$ sono sempre hermitiane.

### Condizioni per cui A è definita positiva
Dalla relazione precedente segue:
![[Pasted image 20260715120002.png]]

>[!tip] Il terzo passaggio vale perché $\operatorname{Re}(A)$ è hermitiana e dunque $x^*\operatorname{Re}(A)x$ è reale.


### Matrice definita positiva e invertibilità
> [!lemma] Proprietà
> Se $A\in\mathbb{C}^{n \times n}$ è definita positiva, allora tutti i suoi autovalori hanno parte reale positiva.
> E di conseguenza $A$ è invertibile perché `0` non è un autovalore di `A`.
###### Dimostrazione
Sia $A\in\mathbb{C}^{n \times n}$ e sia $\lambda$ un autovalore generico di `A` 
Allora, preso un autovettore $x\in\mathbb{C}\setminus\{0\}$ di `A` associato a $\lambda$:
$$
Ax=\lambda x.
$$

Come prima:
$$
\lambda=\frac{x^*Ax}{x^*x}.
$$

Passando alle parti reali:
$$
\operatorname{Re}(\lambda)
=
\frac{\operatorname{Re}(x^*Ax)}{x^*x}.
$$

Il numeratore è positivo per definizione e il denominatore è positivo. Quindi:
$$
\boxed{
\operatorname{Re}(\lambda)>0
}
$$

Di conseguenza zero non è un autovalore e dunque:
$$
\boxed{
A\text{ definita positiva}\implies A\text{ invertibile}
}
$$


## Teorema 3.1 (sottomatrici principali di testa)
Sia $A\in\mathbb{C}^{n\times n}$ hermitiana e siano $A_1,\dots,A_n$ le sottomatrici principali di testa:
$$
A_1=[a_{11}],
\qquad
A_2=
\begin{pmatrix}
a_{11} & a_{12}\\
a_{21} & a_{22}
\end{pmatrix},
\qquad
\dots,
\qquad
A_n=A.
$$

Per una matrice hermitiana le seguenti condizioni sono equivalenti:
1. $A$ è definita positiva;
2. $x^{*}Ax>0\quad\forall x\in\mathbb{C}^n\setminus\{0\}$;
3. gli autovalori di $A$ sono reali e positivi;
4. $\det(A_k)>0$ per ogni $k=1,\dots,n$.
	- I determinanti di ogni sottomatrice sono positivi.

### Dimostrazione di $1\iff 2$
Per definizione, $A$ è definita positiva se
$$
\operatorname{Re}(x^*Ax)>0
\qquad
\forall x\in\mathbb{C}^n\setminus\{0\}.
$$

Poiché $A$ è hermitiana, il numero $x^*Ax$ è reale.
Infatti:
$$
\overline{x^*Ax}
=
(x^*Ax)^*
=
x^*A^*x
=
x^*Ax.
$$
Un numero complesso coincide con il suo coniugato se e solo se è reale.

Quindi
$$
\operatorname{Re}(x^*Ax)=x^*Ax.
$$

Di conseguenza,
$$
\operatorname{Re}(x^*Ax)>0
\iff
x^*Ax>0.
$$

Quindi
$$
A \text{ è definita positiva}
\iff
x^*Ax>0
\qquad
\forall x\neq 0.
$$

### Dimostrazione di $1\Rightarrow 3$
Supponiamo che $A$ sia definita positiva.
Sia $\lambda$ un autovalore di $A$ e sia $x\neq 0$ un autovettore associato.

Allora
$$
Ax=\lambda x.
$$

Moltiplicando a sinistra entrambi i membri per $x^*$, otteniamo
$$
x^*Ax=x^*(\lambda x).
$$

Dato che $\lambda$ è uno scalare, possiamo portarlo fuori:
$$
x^*Ax=\lambda x^*x.
$$

Mettendo $\lambda$ in evidenza,
$$
\lambda
=
\frac{x^*Ax}{x^*x}
>0.
$$

Infatti, $A$ è definita positiva, quindi il numeratore è positivo, mentre
$$
x^*x=\|x\|_2^2>0.
$$
Quindi tutti gli autovalori di $A$ sono positivi.

## Esercizio 3.4
Se $A\in\mathbb{C}^{n\times n}$ è hermitiana definita positiva, allora
$$
a_{ii}>0
\qquad
\forall i=1,\dots,n.
$$
### Dimostrazione
Prendiamo il vettore $e_i$ della base canonica di $\mathbb{C}^n$, che ha $1$ in posizione $i$ e $0$ nelle altre.
Poiché $A$ è definita positiva, per ogni vettore non nullo $x$ vale
$$
x^*Ax>0.
$$

In particolare possiamo scegliere
$$
x=e_i
$$
e ottenere
$$
e_i^*Ae_i>0.
$$

Il prodotto
$$
Ae_i
$$
restituisce un vettore che coincide con la colonna $i$-esima di $A$.

Poi $e_i^*$ seleziona la componente $i$-esima di questa colonna e quindi restituisce uno **scalare**.

Quindi
$$
e_i^*Ae_i=a_{ii}>0.
$$

Essendo $i$ arbitrario, possiamo concludere che
$$
a_{ii}>0
\qquad
\forall i=1,\dots,n.
$$

Più in generale, si possono usare due indici $i,j\in\{1,\dots,n\}$ e si ottiene
$$
e_i^*Ae_j=a_{ij}.
$$
Ponendo $i=j$, otteniamo proprio
$$
e_i^*Ae_i=a_{ii}.
$$



## Polinomi di matrici
Sia $p(\lambda)$ un polinomio:
$$
p(\lambda)
=
a_0+a_1\lambda+\dots+a_m\lambda^m.
$$

Per $A\in\mathbb{C}^{n\times n}$ si definisce il polinomio:
$$
\boxed{
p(A)
=
a_{0}I+a_{1}A+a_{2}A^{2},\dots+a_mA^m
} \qquad \in \mathbb{C}^{n \times n}
$$

Il termine costante diventa $a_0I$ perché:
$$
A^0=I.
$$

## Teorema 3.2 (autovalori di `A` sono $p(\lambda_{i})$)
Sia $p(\lambda)$ un polinomio e sia $A\in\mathbb{C}^{n\times n}$ una matrice con autovalori
$$
\lambda_1,\lambda_2,\dots,\lambda_n.
$$

Allora gli autovalori della matrice $p(A)$ sono
$$
p(\lambda_1),\dots,p(\lambda_n).
$$

### Dimostrazione (3 casi)
#### Caso 1: $p(\lambda)=a_0$ è costante
Se
$$
p(\lambda)=a_{0} \implies p(A)=a_0I
$$
e $p(A)$ ha come autovalori $a_0$ ripetuto $n$ volte.

Quindi gli autovalori di $p(A)$ sono
$$
p(\lambda_1),\dots,p(\lambda_n),
$$
e la tesi vale.

#### Caso 2: $p(\lambda)=a_0+a_1\lambda$ ha grado $1$
Se $p(\lambda)=a_0+a_1\lambda$ ha grado $1$, allora il polinomio caratteristico di $p(A)$ e quello di $A$ sono legati dalla seguente relazione:
$$
\begin{array}{rcl}

C_{p(A)}(\lambda)
&=&
\det\bigl(\lambda I-p(A)\bigr)
\\[1em]

\color{cyan}{
\substack{
\text{Riscrivo }p(A)=a_0I+a_1A
}}
&\Big\vert&
\\[-0.2em]

&=&
\det\left(
\lambda I-(a_0I+a_1A)
\right)
\\[1em]

\color{cyan}{
\substack{
\text{Raccolgo i termini che moltiplicano }I
}}
&\Big\vert&
\\[-0.2em]

&=&
\det\left(
(\lambda-a_0)I-a_1A
\right)
\\[1em]

\color{cyan}{
\substack{
\text{Raccolgo }a_1
}}
&\Big\vert&
\\[-0.2em]

&=&
\det\left[
a_1
\left(
\frac{\lambda-a_0}{a_1}I-A
\right)
\right]
\\[1em]

\color{cyan}{
\substack{
\text{dato che }\forall a \in \mathbb{C} \text{ e } \forall B \in \mathbb{C}^{n \times n},\\
\det(aB)=a^{n}\det(B)
}}
&\Big\vert&
\\[-0.2em]

&=&
a_1^n
\det\left(
\frac{\lambda-a_0}{a_1}I-A
\right)
\\[1em]

\color{cyan}{
\substack{
\text{Per definizione di polinomio caratteristico}\\
\displaystyle
C_A(\mu)=\det(\mu I-A),\\
\displaystyle
\mu=\frac{\lambda-a_0}{a_1}
}}
&\Big\vert&
\\[-0.2em]

C_{p(A)}(\lambda)
&=&
a_1^n
C_A\left(
\frac{\lambda-a_0}{a_1}
\right).

\end{array}
$$

Dunque gli autovalori di $p(A)$ sono
$$
\begin{array}{rcl}

\left\{
\lambda\in\mathbb{C}:
c_{p(A)}(\lambda)=0
\right\}
&=&
\left\{
\lambda\in\mathbb{C}:
a_1^n
c_A\left(
\frac{\lambda-a_0}{a_1}
\right)=0
\right\}
\\[1em]

\color{cyan}{
\substack{
a_1\neq 0
\text{, quindi }a_1^n\neq 0\\
\text{e il prodotto è nullo se e solo se}\\
\displaystyle
c_A\left(
\frac{\lambda-a_0}{a_1}
\right)=0 \\ 
\text{ossia se }\frac{\lambda - a_{0}}{a_{1}} \text{ è un autovalore di } C_{A}
}}
&\Big\vert&
\\[-0.2em]

&=&
\left\{
\lambda\in\mathbb{C}:
\frac{\lambda-a_0}{a_1}
=
\lambda_1,\dots,\lambda_n
\right\}
\\[1em]

\color{cyan}{
\substack{
\lambda_1,\dots,\lambda_n
\text{ sono gli autovalori di }A
}}
&\Big\vert&
\\[-0.2em]

&=&
\left\{
\lambda\in\mathbb{C}:
\lambda
=
a_0+a_1\lambda_1,\dots,
a_0+a_1\lambda_n
\right\}
\\[1em]

\color{cyan}{
\substack{
\text{Risolvo rispetto a }\lambda
}}
&\Big\vert&
\\[-0.2em]

&=&
\left\{
a_0+a_1\lambda_1,\dots,
a_0+a_1\lambda_n
\right\}
\\[1em]

\color{cyan}{
\substack{
p(\lambda)=a_0+a_1\lambda
}}
&\Big\vert&
\\[-0.2em]

&=&
\left\{
p(\lambda_1),\dots,p(\lambda_n)
\right\}.

\end{array}
$$

#### Caso 3: la matrice $A$ è diagonalizzabile
Se $A$ è diagonalizzabile, allora esistono una matrice $X\in\mathbb{C}^{n\times n}$ invertibile e una matrice $D=\operatorname{diag}(\lambda_1,\dots,\lambda_n),$ che ha sulla diagonale gli autovalori di $A$, tali che
$$
A=XDX^{-1}.
$$

Allora
$$
A^2
=
XDX^{-1}XDX^{-1}
=
XD^2X^{-1},
$$
$$
A^3
=
XDX^{-1}XDX^{-1}XDX^{-1}
=
XD^3X^{-1},
$$
e, in generale,
$$
A^k=XD^kX^{-1}
\qquad
\forall k\geq 0.
$$


Sia $p(\lambda)=a_0+a_1\lambda+a_2\lambda^2+\dots+a_m\lambda^m$ il polinomio d'interpolazione nell'HP del teorema.
Allora
$$
\begin{array}{rcl}

p(A)
&=&
a_0I+a_1A+a_2A^2+\dots+a_mA^m
\\[1em]

\color{cyan}{
\substack{
\text{Poiché }A=XDX^{-1},\\
A^2=XD^2X^{-1},\dots,A^m=XD^mX^{-1},\\
\text{e inoltre }I=XIX^{-1}
}}
&\Big\vert&
\\[-0.2em]

&=&
a_0XIX^{-1}
+
a_1XDX^{-1}
+
a_2XD^2X^{-1}
+\dots+
a_mXD^mX^{-1}
\\[1em]

\color{cyan}{
\substack{
\text{Raccolgo }X\text{ a sinistra}\\
\text{e }X^{-1}\text{ a destra}
}}
&\Big\vert&
\\[-0.2em]

&=&
X
\underbrace{\left(
a_0I+a_1D+a_2D^2+\dots+a_mD^m
\right)}_{p(D)}
X^{-1}
\\[1em]

&\Big\vert&
\\[-0.2em]

p(A)
&=&
Xp(D)X^{-1}.

\end{array}
$$

Ponendo quindi
$$
p(D)
=
a_0I+a_1D+a_2D^2+\dots+a_mD^m,
$$
si ha
$$
p(A)=Xp(D)X^{-1}.
$$
Inoltre
$$
p(D)
=
\begin{pmatrix}
p(\lambda_1) & & \\
& \ddots & \\
& & p(\lambda_n)
\end{pmatrix}.
$$

>[!tip]- La matrice sopra vale per questa cosa qui
>![[Pasted image 20260803204952.png]]

Per ora abbiamo dimostrato che
$$
p(A)=Xp(D)X^{-1}.
$$

Da qui sappiamo che:
1. $p(A)$ è diagonalizzabile;
	- perché esistono X e $p(D)$
2. gli elementi diagonali di $p(D)$ sono gli autovalori di $p(A)$;
3. le colonne di $X$ sono gli autovettori di $p(A)$.

Grazie al punto 2, il caso è dimostrato.


## Grafi orientati
Un grafo è un diagramma formato da un certo numero di nodi e da un certo numero di archi.
Un **grafo orientato** è formato da nodi e archi orientati.
- letteralmente è una freccia che va da un nodo a un altro
Se il grafo ha $n$ nodi, li indichiamo con:
$$
1,2,\dots,n.
$$

L’arco che va dal nodo $i$ al nodo $j$ si indica con:
$$
i\to j.
$$

Un self-loop si definisce **cappio**:
$$
i\to i.
$$

## Cammini e cicli
Un **cammino** è un percorso che parte da un nodo $i$ e arriva a un nodo $j$ seguendo gli archi del grafo.
Se il nodo di arrivo coincide con quello di partenza, il cammino si chiama **ciclo**.

## Grafi fortemente connessi

> [!lemma] Definizione
> Un grafo orientato si dice **fortemente connesso** se vale una delle seguenti condizioni equivalenti:
>
> 1. per ogni coppia di nodi $i,j$ esiste un cammino che va da $i$ a $j$;
> 2. esiste un ciclo che tocca tutti i nodi.

### 3.1 Equivalenza tra le due condizioni
Se per ogni coppia di nodi esiste un cammino, possiamo concatenare un cammino da $1$ a $2$, da $2$ a $3$, e così via, fino a tornare da $n$ a $1$. Otteniamo così un ciclo che tocca tutti i nodi.

Viceversa, se esiste un ciclo che tocca tutti i nodi, fissati due nodi qualsiasi $i$ e $j$, basta partire da $i$ e seguire il ciclo fino a raggiungere $j$.


## 4. Grafo associato a una matrice
**DEFINIZIONE**: Sia $A\in\mathbb{C}^{n\times n}.$
Il **grafo associato ad $A$** ha:
- nodi sono gli indici delle righe, $1,\dots,n;$
- un arco: $i\to j$  se e solo se:$$
  a_{ij}\neq0.
  $$
> [!tip] La riga $i$ descrive tutti gli archi che escono dal nodo $i$.

## 5. Matrici irriducibili

> [!lemma] Definizione
> Una matrice: $A\in\mathbb{C}^{n\times n}$ si dice **irriducibile** se il grafo associato ad $A$ è fortemente connesso.
Se il grafo associato non è fortemente connesso, la matrice si dice **riducibile**.


## Localizzazione autovalori - cerchi nel piano complesso
In molte applicazioni non è necessario calcolare esplicitamente gli autovalori di una matrice. È spesso sufficiente conoscere una **regione del piano complesso** in cui essi si trovano. A questo scopo si utilizzano i **teoremi di Gershgorin**, che permettono di localizzare gli autovalori costruendo dei cerchi nel piano complesso a partire dagli elementi della matrice. L'idea fondamentale è che **tutti gli autovalori di una matrice appartengono all'unione dei cerchi di Gershgorin**, definiti mediante gli elementi della diagonale e la somma dei moduli degli elementi fuori diagonale.

Indichiamo con:
$$
C(z_0,r)
=
\{z\in\mathbb{C}:|z-z_0|\leq r\}.
$$
il cerchio di centro $z_0\in\mathbb{C}$ e raggio $r\geq0$.
- Il numero $|z-z_0|$ rappresenta la distanza tra $z$ e $z_0$.

### Cerchi di Gershgorin per riga
Data $A \in C^{n\times n}$, i cerchi di **Gershgorin** di `A` sono i cerchi $K_{1},\dots,K_{n}$ definiti nel modo seguente:
$$
\forall \text{ riga } i=1,\dots n \qquad K_i
=
C\left(
a_{ii},
\sum_{\substack{j=1\\j\neq i}}^n|a_{ij}|
\right).
$$
Quindi:
- il centro è $a_{ii}$;
- il raggio è:$$
  r_i=
  \sum_{\substack{j=1\\j\neq i}}^n|a_{ij}|.
  $$
I cerchi $K_1,\dots,K_n$ si chiamano anche **cerchi di Gershgorin per riga**.


### 7.2 Cerchi di Gershgorin per colonna
Per ogni colonna $j$ definiamo:
$$
H_j
=
C\left(
a_{jj},
\sum_{\substack{i=1\\i\neq j}}^n|a_{ij}|
\right).
$$
Il centro è sempre l’elemento diagonale, mentre il raggio è la somma dei moduli degli altri elementi della colonna.



## Teorema 3.3 — Primo teorema di Gershgorin
Gli autovalori di una matrice $A\in\mathbb{C}^{n\times n}$ stanno tutti nell'unione dei cerchi di Gershgorin di $A$.

### Dimostrazione
Sia $\lambda$ un autovalore di $A$.
Vogliamo mostrare che appartiene ad almeno un cerchio.
Dato che $\lambda$ è un autovalore, allora esiste un autovettore
$$
u\in\mathbb{C}^{n}\setminus\{0\} \quad t.c. \quad Au=\lambda u.
$$

Allora
$$
Au=\lambda u
\iff
(Au)_{i}=(\lambda u)_{i} \qquad \forall i=1,\dots,n
$$
e quindi vale
$$
\iff
\sum_{j=1}^n a_{ij}u_j
=
\lambda u_i
\qquad
\forall i=1,\dots,n.
$$

Scegliamo $i_0\in\{1,\dots,n\}$ tale che
$$
|u_{i_0}|
=
\max_{i\in\{1,\dots,n\}}|u_i|.
$$

Poiché $u\neq 0$, allora
$$
|u_{i_0}|>0.
$$

L'uguaglianza precedente, per $i=i_0$, diventa
$$
\begin{array}{rcl}

\displaystyle
\sum_{j=1}^n a_{i_0j}u_j
&=&
\lambda u_{i_0}
\\[1em]

\color{cyan}{
\substack{
\text{Separo il termine con }j=i_0
}}
&\Big\vert&
\\[-0.2em]

a_{i_0i_0}u_{i_0}
+
\displaystyle
\sum_{\substack{j=1\\j\neq i_0}}^n
a_{i_0j}u_j
&=&
\lambda u_{i_0}
\\[1em]

\color{cyan}{
\substack{
\text{Sposto la sommatoria a destra}\\
\text{e raccolgo }u_{i_0}
}}
&\Big\vert&
\\[-0.2em]

(\lambda-a_{i_0i_0})u_{i_0}
&=&
\displaystyle
\sum_{\substack{j=1\\j\neq i_0}}^n
a_{i_0j}u_j
\\[1em]

\color{cyan}{
\substack{
\text{Applico il modulo e uso}\\
|\alpha\beta|=|\alpha||\beta|
}}
&\Big\vert&
\\[-0.2em]

|\lambda-a_{i_0i_0}|\,
|u_{i_0}|
&=&
\left|
\displaystyle
\sum_{\substack{j=1\\j\neq i_0}}^n
a_{i_0j}u_j
\right|
\\[1em]

\color{cyan}{
\substack{
\text{Applico la disuguaglianza triangolare} \\
\text{nella sommatoria e applico di nuovo} \\
|\alpha \beta| = |\alpha| |\beta|
}}
&\Big\vert&
\\[-0.2em]

|\lambda-a_{i_0i_0}|\,
|u_{i_0}|
&\leq&
\displaystyle
\sum_{\substack{j=1\\j\neq i_0}}^n
|a_{i_0j}||u_j|
\\[1em]

\color{cyan}{
\substack{
\text{Per la scelta di }i_0,\\
|u_j|\leq |u_{i_0}|
}}
&\Big\vert&
\\[-0.2em]

&\leq&
\displaystyle
\sum_{\substack{j=1\\j\neq i_0}}^n
|a_{i_0j}||u_{i_0}|
\\[1em]

\color{cyan}{
\substack{
\text{Raccolgo }|u_{i_0}|
}}
&\Big\vert&
\\[-0.2em]

&=&
|u_{i_0}|
\displaystyle
\sum_{\substack{j=1\\j\neq i_0}}^n
|a_{i_0j}|
\\[1em]

\color{cyan}{
\substack{
\text{Divido per }|u_{i_0}|>0
}}
&\Big\vert&
\\[-0.2em]

\underbrace{
|\lambda-a_{i_0i_0}|
}_{\color{cyan}{\text{distanza di }\lambda\text{ dal centro }a_{i_0i_0}}}
&\leq&
\underbrace{
\displaystyle
\sum_{\substack{j=1\\j\neq i_0}}^n
|a_{i_0j}|
}_{\color{cyan}{\text{raggio del cerchio }K_{i_0}}}.

\end{array}
$$

Quindi $\lambda\in K_{i_0}$ e dunque
$$
\lambda\in\bigcup_{i=1}^n K_i,
$$
cioè nell'unione dei cerchi di Gershgorin di $A$.

## Teorema 3.4 — Secondo teorema di Gershgorin
Supponiamo che l'unione di $k$ cerchi di Gershgorin sia disgiunta dall'unione degli altri $n-k$ cerchi.
Allora:
- la prima unione contiene esattamente $k$ autovalori;
- la seconda unione contiene esattamente $n-k$ autovalori.
Gli autovalori sono contati con molteplicità algebrica.


## Teorema 3.5 — Terzo teorema di Gershgorin, forma forte
Supponiamo che $A\in\mathbb{C}^{n\times n}$ sia irriducibile.
Allora i punti che stanno sul bordo di quei cerchi di Gershgorin a cui appartengono, ma non sul bordo di tutti i cerchi, non sono autovalori di $A$.

## Teorema 3.6 — Terzo teorema di Gershgorin, forma debole
Supponiamo che $A\in\mathbb{C}^{n\times n}$ sia irriducibile e sia $\mathcal{B}$ il bordo dell'unione di tutti i cerchi di Gershgorin.
Allora i punti di $\mathcal{B}$ che non stanno sul bordo di tutti i cerchi non sono autovalori di $A$.

### Dimostrazione del teorema 3.6
Ogni punto di $\mathcal{B}$ sta per forza sul bordo di quei cerchi a cui appartiene e non può stare dentro un cerchio.
Quindi ogni punto di $\mathcal{B}$ che non sta sul bordo di tutti i cerchi soddisfa l'ipotesi del Teorema 3.5.

## Osservazione: Autovalori di $A$ e di $A^T$

> [!lemma] Proprietà
> Gli autovalori di una matrice $A\in\mathbb{C}^{n\times n}$ coincidono con quelli della sua trasposta $A^T.$
### Dimostrazione
Il polinomio caratteristico di $A^T$ è:
$$
c_{A^T}(\lambda)
=
\det(\lambda I-A^T).
$$

Poiché:
$$
\lambda I-A^T
=
(\lambda I-A)^T,
$$
- trasporre la matrice identità restituisce la matrice identità stessa (ha tutti 0 fuori dalla diagonale)

si ha:
$$
c_{A^T}(\lambda)
=
\det\left((\lambda I-A)^T\right).
$$

Il determinante di una matrice coincide con quello della sua trasposta:
$$
\det(M^T)=\det(M).
$$

Quindi:
$$
c_{A^T}(\lambda)
=
\det(\lambda I-A)
=
c_A(\lambda).
$$

Pertanto $A$ e $A^T$ hanno lo stesso polinomio caratteristico e quindi gli stessi autovalori.

### Miglioramento della localizzazione di autovalori con righe e colonne
Poiché $A$ e $A^T$ hanno gli stessi autovalori, possiamo applicare i teoremi di Gershgorin sia ad $A$ sia ad $A^T$.

In particolare, il *primo teo di G.* applicato ad $A$ e $A^{T}$ ci dice quanto segue
- Gli autovalori di una matrice $A \in \mathbb{C}^{n \times n}$ stanno tutti
	- SIA nell'unione dei *cerchi per riga* **di A**$$K_1,\dots,K_{n}\quad \text{di A}$$
	- SIA nell'unione dei *cerchi per colonna* **di $A^{T}$** $$H_1,\dots,H_{n}\quad \text{di } A^{T}$$
	Per cui stanno nell'**INTERSEZIONE DELLE DUE UNIONI**

Dal primo teorema:
$$
\sigma(A)
\subseteq
\bigcup_{i=1}^{n}K_{i}\qquad e \qquad \sigma(A)
\subseteq
\bigcup_{j=1}^nH_j.
$$

Quindi:
$$
\boxed{
\sigma(A)
\subseteq
\left(\bigcup_{i=1}^nK_i\right)
\cap
\left(\bigcup_{j=1}^nH_j\right)
}
$$

> [!tip] L’intersezione tra le due unioni fornisce una localizzazione più precisa rispetto all’uso dei soli cerchi per riga o dei soli cerchi per colonna.

### Irriducibilità della trasposta
Per applicare il terzo teorema anche ad $A^T$ è necessario sapere che $A^T$ è irriducibile.

> [!lemma] Proprietà
> Vale
> $$
> A\text{ irriducibile}
> \iff
> A^T\text{ irriducibile}.
> $$

### Idea della dimostrazione
Nel grafo associato ad $A^T$, ogni arco del grafo di $A$ viene invertito.

Infatti:
$$
(A^T)_{ij}=a_{ji}.
$$

Quindi:
$$
i\to j\text{ nel grafo di }A^T
$$

se e solo se:
$$
j\to i\text{ nel grafo di }A.
$$

Se nel grafo di $A$ esiste un cammino da $i$ a $j$, invertendo tutti gli archi otteniamo nel grafo di $A^T$ un cammino da $j$ a $i$.

La forte connessione si conserva quindi passando alla trasposta.



## Matrici a diagonale dominante

> [!lemma] Definizione
> La matrice $A \in \mathbb{C}^{n \times n}$ si dice **a diagonale dominante (per righe)** se valgono entrambe le condizioni seguenti:
>
> 1. per ogni $i=1,\dots,n$:
>    $$
>    |a_{ii}|
>    \geq
>    \sum_{\substack{j=1\\j\neq i}}^n|a_{ij}|;
>    $$
> 2. esiste almeno un indice $k\in\{1,\dots,n\}$ tale che:
>    $$
>    |a_{kk}|
>    >
>    \sum_{\substack{j=1\\j\neq k}}^n|a_{kj}|.
>    $$

### Interpretazione tramite i cerchi di Gershgorin
#### Prima condizione
Il cerchio di Gershgorin per riga è:
$$
K_i
=
C\left(
a_{ii},
\sum_{\substack{j=1\\j\neq i}}^n|a_{ij}|
\right).
$$

La quantità $|a_{ii}|$ è la distanza del centro $a_{ii}$ dall’origine.
Il raggio è:
$$
r_i
=
\sum_{\substack{j=1\\j\neq i}}^n|a_{ij}|.
$$

Quindi la condizione:$$
|a_{ii}|\geq r_i
$$si legge "la distanza del centro $a_{ii}$ dall'origine è maggiore (o uguale) del suo raggio".

In altre parole significa che **lo zero non può stare all’interno del cerchio** $K_i$.
- Può eventualmente stare sul bordo, nel caso di uguaglianza.
E QUESTO DEVE VALERE PER OGNI CERCHIO.

#### Seconda condizione
La seconda condizione garantisce invece che **esista almeno un cerchio che non contiene affatto lo zero**, neppure sul bordo.

## Diagonale dominante in *senso stretto* per righe

> [!lemma] Definizione
> La matrice $A$ si dice **a diagonale dominante in senso stretto per righe** se:
>
> $$
> |a_{ii}|
> >
> \sum_{\substack{j=1\\j\neq i}}^n|a_{ij}|
> $$
>
> per ogni $> i=1,\dots,n.$

In termini di Gershgorin, nessun cerchio per riga contiene lo zero (neppure sul bordo).

## Diagonale dominante per colonne

> [!lemma] Definizione
> La matrice $A$ si dice **a diagonale dominante per colonne** se:
>
> 1. per ogni $j=1,\dots,n$:
>    $$
>    |a_{jj}|
>    \geq
>    \sum_{\substack{i=1\\i\neq j}}^n|a_{ij}|;
>    $$
> 2. esiste almeno un indice $k$ tale che:
>    $$
>    |a_{kk}|
>    >
>    \sum_{\substack{i=1\\i\neq k}}^n|a_{ik}|.
>    $$

Qui il confronto viene effettuato lungo le colonne.
L’interpretazione geometrica è la stessa, ma si usano i cerchi di Gershgorin per colonna.


## Diagonale dominante in *senso stretto* per colonne

> [!lemma] Definizione
> La matrice $A$ si dice **a diagonale dominante in senso stretto per colonne** se:
>
> $$
> |a_{jj}|
> >
> \sum_{\substack{i=1\\i\neq j}}^n|a_{ij}|
> $$
>
> per ogni:
>
> $$
> j=1,\dots,n.
> $$


## Teorema 3.7 (`A` è invertibile se rispetta una delle 4 condizioni)
Supponiamo che la matrice $A\in\mathbb{C}^{n\times n}$ soddisfi almeno una delle seguenti condizioni:
- $A$ è a diagonale dominante e irriducibile;
- $A$ è a diagonale dominante in senso stretto;
- $A$ è a diagonale dominante per colonne e irriducibile;
- $A$ è a diagonale dominante per colonne in senso stretto.
Allora $A$ è **invertibile**

### Dimostrazione
#### Caso 1
Per ipotesi sappiamo che $A$ è a diagonale dominante e irriducibile.
Usiamo il **terzo teorema di Gershgorin forte**.
- Per la prima condizione di dominanza diagonale, $0$ non sta all'interno di nessun cerchio.
	- Se appartiene a un cerchio, allora sta sul bordo e quindi $0$ sta sul bordo dei cerchi ai quali appartiene.
- Per la seconda condizione di dominanza diagonale, esiste almeno un cerchio che non ha $0$ sul bordo e quindi $0$ non sta sul bordo di tutti i cerchi.

Poiché $A$ è irriducibile, il terzo teorema forte implica che
$$
0\notin\sigma(A).
$$
Quindi $A$ è invertibile.

>[!tip] Oss. Il terzo teorema debole qui non bastava, perché esistono delle matrici a diagonale dominante e irriducibili per le quali lo 0 non appartiene al bordo dell'unione dei cerchi (es. il quadrifoglio visto a leizone).

#### Caso 2
Se $A$ è a diagonale dominante in senso stretto, allora $0$ non appartiene a nessun cerchio.
Dal primo teorema di Gershgorin sappiamo che tutti gli autovalori di $A$ si trovano nell'unione dei cerchi.
Quindi
$$
0\notin\sigma(A)
$$
e dunque $A$ è invertibile.

#### Caso 3
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

#### Caso 4
Supponiamo che $A$ sia a diagonale dominante in senso stretto per colonne

Allora $A^T$ è a diagonale dominante in senso stretto per righe.
Per la dimostrazione del caso 2, applicata ad $A^T$, segue che $A^T$ è invertibile.
Ma
$$
\det(A^T)=\det(A)
$$
quindi anche $A$ è invertibile.


---

# Norme vettoriali 
## Introduzione
Consideriamo il sistema $Ax=b$:
$$
\begin{pmatrix}
8 & 1 & 1  \\
1 & 5 & -1 \\
1 & -1 & 5 
\end{pmatrix}
\begin{pmatrix}
x_{1}\\
x_{2}\\
x_{3}
\end{pmatrix}
=
\begin{pmatrix}
26\\
7\\
7
\end{pmatrix}
$$
La cui soluzione è
$$
x=
\begin{pmatrix}
3\\
1\\
1
\end{pmatrix}.
$$


Supponiamo di avere due approssimazioni:
$$
y=
\begin{pmatrix}
2.99972\\
1.00023\\
1.00030
\end{pmatrix},
$$

$$
z=
\begin{pmatrix}
3.00027\\
0.99971\\
0.99955
\end{pmatrix}.
$$

Per stabilire quale delle due sia migliore, occorre misurare la distanza da $x$.

Serve quindi un concetto di distanza nello spazio dei vettori.


## Definizione di norma vettoriale

> [!lemma] Definizione
> Una funzione:
>
> $$
> \|\cdot\|:\mathbb{C}^n\to\mathbb{R}
> $$
>
> si dice **norma vettoriale** se soddisfa le seguenti proprietà.
> 
> ### 1 Positività
> $$||x|| \geq 0 \quad \forall x \in \mathbb{C}^{n} \qquad e \qquad ||x|| = 0 \iff x =0$$
> 
> ### 2 Omogeneità
> $$\|\alpha x\|
> =
> |\alpha|\|x\| \qquad \forall a \in C \quad e \quad \forall x \in \mathbb{C}^{n}$$
> 
> ### 3 Disuguaglianza triangolare
> $$\|x+y\|
> \leq
> \|x\|+\|y\| \quad \forall x,y \in C^{n}$$
> 


> [!tip] La norma è una generalizzazione del modulo di un numero complesso.
> Il modulo è una norma in $C^{1}$

## Distanza indotta da una norma
Fissata una norma, la distanza tra due vettori $x$ e $y$ si definisce come:
$$
\boxed{
d(x,y)=\|x-y\|
}
$$

Quindi:
1. si calcola la differenza $x-y$;
2. si calcola la norma del vettore ottenuto.

## Le norme $1$, $2$ e $\infty$
Sia:
$$
x=
\begin{pmatrix}
x_1\\
\vdots\\
x_n
\end{pmatrix}
\in\mathbb{C}^n.
$$

### Norma $1$
$$
\boxed{
\|x\|_1
=
\sum_{i=1}^n|x_i|
}
$$
È la somma dei moduli delle componenti.

### Norma $2$

$$
\boxed{
\|x\|_2
=
\sqrt{
\sum_{i=1}^n|x_i|^2
}
}
$$
È la generalizzazione della distanza euclidea.

### Norma infinito

$$
\boxed{
\|x\|_\infty
=
\max_{1\leq i\leq n}|x_i|
}
$$
È il massimo dei moduli delle componenti.


## Teorema 3.8 (equivalenza delle norme vettoriali)
Tutte le norme vettoriali su $\mathbb{C}^n$ sono equivalenti.
Questo significa che, date due norme $\|\cdot\|'$ e $\|\cdot\|''$, esistono due costanti $\alpha>0$ e $\beta>0$, indipendenti da $x$, tali che
$$
\alpha\|x\|''
\leq
\|x\|'
\leq
\beta\|x\|''
\qquad
\forall x\in\mathbb{C}^n.
$$

In funzione di $\|x\|''$ sarebbe
$$
\frac{1}{\beta}\|x\|'
\leq
\|x\|''
\leq
\frac{1}{\alpha}\|x\|'.
$$

### Dimostrazione: equivalenza tra $\|\cdot\|_1$ e $\|\cdot\|_\infty$
Dato che
$$
\|x\|_1
=
\sum_{i=1}^n |x_i|
\qquad
\forall x\in\mathbb{C}^n,
$$
poiché il massimo dei moduli è uno dei termini della somma, allora
$$
\|x\|_\infty
\leq
\|x\|_1.
$$

Inoltre,
$$
|x_i|
\leq
\|x\|_\infty
\qquad
\forall i=1,\dots,n.
$$

Sommando per $n$ termini otteniamo che
$$
\|x\|_1
\leq
n\|x\|_\infty.
$$

Quindi
$$
\|x\|_\infty
\leq
\|x\|_1
\leq
n\|x\|_\infty.
$$

Per isolare $\|x\|_\infty$ poniamo $\alpha=1$ e $\beta=n$ e otteniamo
$$
\frac{1}{n}\|x\|_1
\leq
\|x\|_\infty
\leq
\|x\|_1.
$$


## Norme pesate
In alcune applicazioni una componente può essere più importante delle altre.

Per esempio, si può considerare una norma del tipo:
$$
\|x\|
=
\max
\left\{
100|x_1|,
|x_2|,
|x_3|
\right\}.
$$
In questo caso la prima componente riceve un peso maggiore.

La scelta della norma dipende quindi dal significato concreto delle componenti e dal tipo di errore che si vuole controllare.

> [!tip] Usando norme diverse si possono ottenere confronti diversi, perché ogni norma misura la distanza secondo un criterio differente.



## Successioni di vettori
Consideriamo una successione:
$$
x^{(0)},x^{(1)},x^{(2)},\dots \qquad \text{in } C^{n}
$$

> [!lemma] Definizione
> La successione $x^{(k)}$ si dice convergente a $x$ rispetto alla norma $\|\cdot\|$ se:
> $$
> \boxed{
> \|x^{(k)}-x\|\to0
> }
> $$
>
> per $k\to\infty.$

In simboli:
$$
x^{(k)}\to x
\quad\text{nella norma }\|\cdot\|.
$$


### La convergenza non dipende dalla norma

>[!tip] Poiché tutte le norme sono equivalenti per il teorema precedente, se una successione di vettori converge a `x` rispetto a una norma $|| \cdot ||$, allora converge a `x` rispetto a tutte le norme.

#### Dimostrazione
Supponiamo che $x^{(k)}\to x$ rispetto a una norma $\|\cdot\|$.

Sia $\|\cdot\|'$ un’altra norma.

Per l’equivalenza delle norme, esiste $\beta>0$ tale che:
$$
\|y\|'
\leq
\beta\|y\|
\qquad 
\text{per ogni vettore } y
$$

Ponendo:
$$
y=x^{(k)}-x,
$$

si ottiene:
$$
\alpha||x^{(k)}-x||
\ \leq \ 
\|x^{(k)}-x\|'
\ \leq \
\beta\|x^{(k)}-x\|.
$$

Poiché:
$$
\|x^{(k)}-x\|\to0,
$$

per il teorema dei due carabinieri:
$$
\|x^{(k)}-x\|'
\to0.
$$

Quindi:
$$
\boxed{
x^{(k)}\to x
\text{ rispetto a una norma}
\implies
x^{(k)}\to x
\text{ rispetto a tutte le norme}
}
$$


### Convergenza componente per componente
Scriviamo:
$$
x^{(k)}
=
\begin{pmatrix}
x_1^{(k)}\\
\vdots\\
x_n^{(k)}
\end{pmatrix}
\qquad
e
\qquad
x=
\begin{pmatrix}
x_1\\
\vdots\\
x_n
\end{pmatrix}.
$$

> [!lemma] Definizione
> La successione $x^{(k)}$ converge a $x$ **componente per componente** se:
>
> $$
> x_{i}^{(k)}\to x_{i}
> \qquad
> \forall i =1,\dots,n.
> $$

Equivalentemente possiamo dire che per ogni componente vale che:
$$
|x_i^{(k)}-x_i|
\to0
$$

#### Equivalenza con la convergenza in norma infinito
La convergenza componente per componente equivale anche a:
$$
\max_{1\leq i\leq n}
|x_i^{(k)}-x_i|
\to0.
$$

Ma quella che abbiamo scritto è la norma infinito:
$$
\max_{1\leq i\leq n}
|x_i^{(k)}-x_i|
=
\|x^{(k)}-x\|_\infty.
$$
- Quindi la convergenza componente per componente coincide con la convergenza rispetto alla norma infinito.

Quindi:
$$
\boxed{
x^{(k)}\to x
\text{ componente per componente}
\iff
\|x^{(k)}-x\|_\infty\to0
}
$$

Poiché tutte le norme sono equivalenti:
$$
\boxed{
x^{(k)}\to x
\text{ componente per componente}
\iff
x^{(k)}\to x
\text{ in una qualunque norma}
}
$$

>[!tip] Stesse cose dette sopra ma scritte come il prof
>![[Pasted image 20260717113849.png]]


# Norme matriciali
Dopo le norme vettoriali, introduciamo le **norme matriciali**, definite sullo spazio:
$$
\mathbb{C}^{n\times n}.
$$

Lo scopo è introdurre un concetto di distanza per misurare "vicinanza" tra due matrici $A$ e $B \in \mathbb{C}^{n\times n}$.

## Definizione di norma matriciale

> [!lemma] Definizione
> Una funzione:
> $$
> \|\cdot\|:\mathbb{C}^{n\times n}\to\mathbb{R}
> $$
>
> si dice **norma matriciale** se soddisfa le proprietà seguenti.
> 
> ### 2.1 Positività
> 
> $$
> \|A\|\geq0 \qquad e \qquad \|A\|=0 \iff A=O.
> $$
> è una `o` non uno 0
> 
> ### 2.2 Omogeneità
> 
> Per ogni $\alpha\in\mathbb{C}$ e $\forall A \in \mathbb{C}^{n \times n}$:
> 
> $$
> \|\alpha A\|
> =
> |\alpha|\|A\|.
> $$
> 
> ### 2.3 Disuguaglianza triangolare
> 
> $$
> \|A+B\|
> \leq
> \|A\|+\|B\|
> \qquad
> \forall A,B \in \mathbb{C}^{n \times n}
> $$
> 

## Distanza tra matrici
Fissata una norma matriciale $\|\cdot\|:\mathbb{C}^{n\times n}\to\mathbb{R}$, definiamo la distanza tra due matrici $A,B \in \mathbb{C}^{n \times n}$ come:
$$
\boxed{
d(A,B)=\|A-B\|
}
$$


## Submoltiplicatività

> [!lemma] Definizione
> Una norma matriciale si dice **submoltiplicativa** se, date due matrici $A,B \in \mathbb{C}^{n \times n}$:
>
> $$
> \|AB\|
> \leq
> \|A\|\|B\|
> $$
per ogni coppia di matrici compatibili.


## Norme matriciali indotte
Sia $\|\cdot\|$ una norma vettoriale su $\mathbb{C}^n$.
Per ogni $A\in\mathbb{C}^{n\times n}$ definiamo:
$$
\boxed{
\|A\|
=
\max_{x\neq0}
\frac{\|Ax\|}{\|x\|}
}
$$
- `x` è un vettore $\in \mathbb{C}^{n}$

Questa è la **norma matriciale indotta** dalla norma vettoriale considerata.
- La norma indotta si indica con lo stesso simbolo della norma vettoriale.

### Formula equivalente
Dato che $\frac{1}{||x||}$ è uno scalare posso usare l'***omogeneità*** e scrivere 
$$
\|A\|
=
\max_{x\neq0}
\frac{1}{||x||}
\cdot
||Ax||
$$
Non serve mettere il modulo perché già è positivo.
Ora posso scrivere
$$
\boxed{
\|A\|
=
\max_{x\neq0}
\left\|
\frac{1}{||x||}
\cdot
Ax
\right\|
}
$$

Sapendo che $\boxed{A(\alpha \cdot x) = \alpha \cdot Ax}$ posso scrivere
$$
\boxed{
\|A\|
=
\max_{x\neq0}
\left\|
A 
\cdot
\frac{x}{||x||}
\right\|
}
$$

Ponendo:
$$
y=\frac{x}{\|x\|},
$$

si ha $$
\|y\|
\ = \ 
\left\|
\frac{x}{||x||}
\right\|
\ = \
\frac{1}{\|x\|} \cdot \|x\|
\ = \
1
$$ e quindi:
$$
\boxed{
\|A\|
=
\max_{\|y\|=1}\|Ay\|
}
$$
dove chiaramente $y \in \mathbb{C}^{n \times n}$

![[Pasted image 20260722103051.png]]

> [!tip] La norma indotta misura il massimo fattore di amplificazione prodotto dalla matrice sui vettori.

## Teorema 3.9 (proprietà su norme matriciali indotte)
Sia $\|\cdot\|:\mathbb{C}^n\to\mathbb{R}$ una norma matriciale indotta e siano $A,B\in\mathbb{C}^{n\times n}$ due matrici.

Allora valgono le seguenti proprietà:
1. $\|I\|=1$;
2. $\|Ax\|\leq \|A\|\cdot\|x\|$;
3. $\|A\|$ è la più piccola costante $C$ che soddisfa
$$
\|Ax\|\leq C\|x\|
\qquad
\forall x\in\mathbb{C}^n;
$$
4. $\|AB\|\leq \|A\|\cdot\|B\|$;
5. $\rho(A)\leq\|A\|$.

### Dimostrazione
1. Risulta$$
\|I\|
=
\max_{x\neq 0}\{\underbrace{\|Ix\|}_{{\|x\|}}\}
=
1.
$$
2. Per ogni $x\in\mathbb{C}^n\setminus\{0\}$,
$$
\frac{\|Ax\|}{\|x\|}
\leq
\max_{y\neq 0}
\frac{\|Ay\|}{\|y\|}
=
\|A\|.
$$
	Allora, moltiplicando per $\|x\|$, $$
\|Ax\|
\leq
\|A\|\cdot\|x\|.
$$
	Con $x=0$ è immediata, poiché $0=0.$

3. Presa una qualsiasi costante $C$ che soddisfa
$$
\|Ax\|\leq C\|x\|
\qquad
\forall x\in\mathbb{C}^n,
$$
	si ha che $$
\frac{\|Ax\|}{\|x\|}
\leq
C
\qquad
\forall x\neq 0.
$$
	Quindi$$
\|A\|
=
\max_{x\neq 0}
\frac{\|Ax\|}{\|x\|}
\leq
C.
$$

4. Per ogni $x\in\mathbb{C}^n$ si ha $$
\|ABx\|
\underbrace{\leq}_{(2)}
\|A\|\|Bx\|
\underbrace{\leq}_{(2)}
\|A\|\|B\|\|x\|.
$$
	Quindi $\|A\|\|B\|$ è una delle costanti $C$ tali che $$
\|ABx\|
\leq
C\|x\|
\qquad
\forall x\in\mathbb{C}^n.
$$
	Per il punto 3 abbiamo che $\|AB\|$ è la più piccola costante $C$ che soddisfa $$
\|ABx\|\leq \|A\|\|B\|\|x\|.
$$
	Quindi $$
\|AB\|
\leq
\|A\|\|B\|.
$$

5. Sia $\lambda$ un autovalore di $A$ di modulo massimo e sia $x\neq 0$ un corrispondente autovettore.
	Dall'equazione $Ax=\lambda x$ otteniamo$$
\|Ax\|
=
\|\lambda x\|
=
|\lambda|\|x\|
=
\rho(A)\|x\|.
$$
	Allora $$
\rho(A)
=
\frac{\|Ax\|}{\|x\|}
\leq
\max_{y\neq 0}
\frac{\|Ay\|}{\|y\|}
=
\|A\|.
$$


## Norme indotte principali
Le norme matriciali indotte più importanti sono:
$$
\|\cdot\|_1,
\qquad
\|\cdot\|_2,
\qquad
\|\cdot\|_\infty.
$$
Dove
![[Pasted image 20260722111155.png]]



## Teorema 3.10
Per ogni $A\in\mathbb{C}^{n\times n}$ valgono le seguenti formule:
- $\|A\|_1=\max_j\sum_i |a_{ij}|=\max\left(\|Ae_1\|_1,\|Ae_2\|_1,\dots,\|Ae_n\|_1\right)$
	- È il massimo delle somme dei moduli lungo le colonne.
	
- $\|A\|_2=\sqrt{\rho(A^*A)}$
	
- $\|A\|_\infty=\max_i\sum_j|a_{ij}|=\max\left(\|A^Te_1\|_1,\|A^Te_2\|_1,\dots,\|A^Te_n\|_1\right).$
	- È il massimo delle somme dei moduli lungo le righe.

## Teorema 3.11
Tutte le norme matriciali in $\mathbb{C}^{n\times n}$ sono equivalenti, nel senso che, se prendiamo due norme matriciali $\|\cdot\|'$ e $\|\cdot\|'',$ allora si ha
$$
\alpha\|A\|'
\leq
\|A\|''
\leq
\beta\|A\|'
\qquad
\forall A\in\mathbb{C}^{n\times n},
$$
dove $\alpha,\beta>0$ sono costanti indipendenti da $A$.
In funzione di $\|A\|''$,

$$
\frac{1}{\beta}\|A\|''
\leq
\|A\|'
\leq
\frac{1}{\alpha}\|A\|''.
$$

>[!danger] LUCA SE ME LO HA CHIESTO FATTI FARE LA DIMOSTRAZIONE DA CHAT.

## Successioni di matrici
### Convergenza rispetto a una norma
Una successione:
$$
A^{(0)},A^{(1)},A^{(2)},\dots \qquad \in \mathbb{C}^{n \times n}
$$

converge ad $A$ rispetto alla norma $\|\cdot\|$ se:
$$
\boxed{
\|A^{(k)}-A\|\to0
}
$$

Poiché tutte le norme matriciali sono equivalenti, la convergenza rispetto a una norma implica la convergenza rispetto a tutte.

>[!danger] LA DIMOSTRAZIONE È UN ESERCIZIO PER CASA


## Convergenza componente per componente
La successione $A^{(k)}$ converge componente per componente ad $A \in \mathbb{C}^{n\times n}$ se:
$$
a_{ij}^{(k)}
\to
a_{ij}
\qquad
\forall i,j = 1,\dots,n
$$


Equivalentemente:
$$
\iff |a_{ij}^{(k)}-a_{ij}| \to0 \qquad \forall i,j=1,...,n
$$
$$
\iff \max_{i,j}
|a_{ij}^{(k)}-a_{ij}|
\to0
$$
$$
\iff |A^{(k)} - A|_{\infty} \to 0
$$

Questa è la convergenza rispetto alla norma:
$$
|A|_\infty
=
\max_{i,j}|a_{ij}|.
$$

Quindi:
$$
\boxed{
A^{(k)}\to A
\text{ componente per componente}
\iff
|A^{(k)}-A|_\infty\to0
}
$$

Per l’equivalenza delle norme:
$$
\boxed{
A^{(k)}\to A
\text{ componente per componente}
\iff
A^{(k)}\to A
\text{ in una qualsiasi norma matriciale}
}
$$

## Teorema 3.12
Sia $A\in\mathbb{C}^{n\times n}.$ Allora
$$
\lim_{k\to\infty}A^k=0
\iff
\rho(A)<1.
$$

### Dimostrazione nel caso in cui $A$ sia diagonalizzabile
Sia $A$ diagonalizzabile. Allora esistono $X\in\mathbb{C}^{n\times n}$ invertibile e $D=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$ tali che
$$
A=XDX^{-1}.
$$

Inoltre,
$$
A^2
=
XDX^{-1}XDX^{-1}
=
XD^2X^{-1},
$$
e, in generale,
$$
A^k=XD^kX^{-1}.
$$

### ($\Leftarrow$) Dimostrazione di $\rho(A)<1\Rightarrow A^k\to 0$
Per submoltiplicatività,
$$
\|A^k\|_\infty
=
\|XD^kX^{-1}\|_\infty
\leq
\|X\|_\infty
\|D^k\|_\infty
\|X^{-1}\|_\infty.
$$

Dato che $D^k=\operatorname{diag}(\lambda_1^k,\dots,\lambda_n^k),$ si ha che
$$
\|D^k\|_\infty
=
\max_i|\lambda_i^k|
=
\max_i|\lambda_i|^k
=
\rho(A)^k.
$$

Quindi
$$
0
\leq
\|A^k\|_\infty
\leq
\|X\|_\infty
\rho(A)^k
\|X^{-1}\|_\infty.
$$

Se $\rho(A)<1,$ allora $\rho(A)^k\to 0.$
Per il teorema dei due carabinieri,
$$
\|A^k\|_\infty\to 0.
$$

Quindi
$$
A^k\to 0.
$$

### ($\Rightarrow$) Dimostrazione di $A^k\to 0\Rightarrow \rho(A)<1$
Mettendo in evidenza $D^k$,
$$
D^k=X^{-1}A^kX.
$$

Da cui
$$
\|D^k\|_\infty
=
\|X^{-1}A^kX\|_\infty.
$$
Per submoltiplicatività,
$$
\|D^k\|_\infty
\leq
\|X^{-1}\|_\infty
\|A^k\|_\infty
\|X\|_\infty.
$$

Dato che $\|D^k\|_\infty=\rho(A)^k,$ si ha
$$
0
\leq
\rho(A)^k
\leq
\|X^{-1}\|_\infty
\|A^k\|_\infty
\|X\|_\infty.
$$

Se $A^k\to 0,$ allora il membro di destra tende a zero.
Quindi $\rho(A)^k\to 0.$
Dato che $\rho(A)\geq 0,$ vale che
$$
\rho(A)<1.
$$


---

# Metodi iterativi per la risoluzione di sistemi lineari
Consideriamo il sistema lineare `(s)` $Ax=b,$ con:
$$
A\in\mathbb{C}^{n\times n},
\qquad
b\in\mathbb{C}^n,
$$
e supponiamo che $A$ sia invertibile.

Allora il sistema ha un’unica soluzione:
$$
x=A^{-1}b.
$$

Un metodo diretto, come Gauss, produce la **soluzione esatta** in un numero finito di passi.

Un **metodo iterativo** costruisce invece una **successione di vettori** che parte da un vettore iniziale $x^{(0)}$:
$$
x^{(0)},x^{(1)},x^{(2)},\dots
$$
Vogliamo che
- tale successione sia facile da costruire
- e converga a `x` (componente per componente) rispetto a una qualsiasi norma, qualunque sia $x^{(0)}$ scelto


## Metodi iterativi stazionari
Consideriamo metodi della forma:
$$
(m) \qquad
\begin{cases}
	x^{(0)} \in \mathbb{C}^{n} \qquad \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \text{dato a priori} \\
	x^{(k+1)}=Px^{(k)}+q \qquad k = 0,1,2,\dots
\end{cases}
$$

dove:
$$
P\in\mathbb{C}^{n\times n} \qquad \text{è la matrice di iterazione}
$$
e:
$$
q\in\mathbb{C}^{n} \qquad \text{è un vettore fissato}
$$

> [!tip] Il metodo è detto stazionario perché $P$ e $q$ non dipendono da $k$.


## Osservazione: equazione del metodo
Sia $\{x^{(k)}\}_{k=0,1,2,\dots}$ una successione generata dal metodo *(m)*, e supponiamo che:$$
x^{(k)}\to x^{(\infty)} \qquad \text{per } k \to \infty
$$con $x^{\infty} \in \mathbb{C}^{n}$.
Allora $$x^{(\infty)} = \lim_{ k \to \infty } x^{(k+1)} = \lim_{ k \to \infty } Px^{(k)} + q$$
si ottiene:
$$
\boxed{
x^{\infty} = Px^{(\infty)}+q
}
$$
![[Pasted image 20260722125345.png]]

Questo vuol dire quindi che ogni possibile limite deve quindi soddisfare l’equazione:
$$
x=Px+q.
$$
>[!tip] Se la soluzione `x` di *(s)* non soddisfa l'equazione del metodo $x = Px +q$ allora non c'è speranza che una successione generata dal metodo *(m)* converga a `x`.
>Perché se avessi una successione generata da *(m)* che converge a `x` allora il ragionamento precedente mostra che `x` deve soddisfare l'equazione $x = Px + q$


## Consistenza dei metodi iterativi

> [!lemma] Definizione
> Il metodo *(m)* si dice **consistente** con il sistema $Ax=b$ se la soluzione esatta $x$ soddisfa: $$\boxed{x=Px+q}$$

Se la soluzione non soddisfa l’equazione del metodo, nessuna successione generata dal metodo può convergere a essa.

## Convergenza

> [!lemma] Definizione
> Il metodo si dice **convergente** se, per ogni scelta del vettore iniziale $x^{(0)}$, la successione generata converge alla soluzione esatta:
>
> $$
> x^{(k)}\to x.
> $$

## Teorema 4.1 (condizione necessaria e sufficiente di convergenza)
Supponiamo che il metodo
$$
(m)
\quad
\begin{cases}
x^{(0)} & \text{dato a priori},\\
x^{(k+1)}=Px^{(k)}+q,
& k=0,1,2,\dots
\end{cases}
$$
sia consistente, cioè la sua soluzione esatta soddisfa
$$
x=Px+q.
$$
- P è la matrice d'iterazione

Allora il metodo è convergente se e solo se
$$
\rho(P)<1.
$$

### ($\Rightarrow$) Dimostrazione di $\rho(P)<1\Rightarrow$ convergenza
Supponiamo che $\rho(P)<1.$
Dobbiamo dimostrare che la successione $(m)$ converge alla soluzione $x$ di $Ax=b$ indipendentemente dalla scelta di $x^{(0)}$.

Dato che il metodo è consistente con il sistema per ipotesi, allora vale l'equazione
$$
x=Px+q.
$$

Inoltre si ha
$$
x^{(k+1)}
=
Px^{(k)}+q
\qquad
\forall k=0,1,2,\dots
$$

Sottraendo membro a membro le due equazioni si ottiene
$$
x^{(k+1)}-x
=
P\left(x^{(k)}-x\right).
$$
Ponendo $$e^{(k+1)}=x^{(k+1)}-x  \quad \text{e} \quad  e^{(k)}=x^{(k)}-x,$$
otteniamo l'equazione dell'errore
$$
e^{(k+1)}
=
Pe^{(k)}.
$$

Sviluppando la ricorrenza,
$$
e^{(k+1)}
=
Pe^{(k)}
=
P^2e^{(k-1)}
=
P^3e^{(k-2)}
=
\dots
=
P^{k+1}e^{(0)}
\qquad
\forall k\geq 0.
$$

Da cui $e^{(k)}=P^ke^{(0)}.$
Dato che $\rho(P)<1,$ per ipotesi allora
$$
P^k\to 0.
$$
Quindi
$$
e^{(k)}
=
P^ke^{(0)}
\to 0.
$$
Per cui
$$
e^{(k)}
=
x^{(k)}-x
\to 0
$$
e dunque
$$
x^{(k)}\to x.
$$

La dimostrazione vale per qualunque $x^{(0)}$.


## Condizione sufficiente tramite norma indotta

> [!lemma] Corollario
> Supponiamo che il metodo *(m)* sia consistente. Se esiste una norma matriciale indotta $\| \cdot \|$ tale che $\|P\|<1$ allora il metodo *(m)* è convergente.

###### Dimostrazione
Sappiamo che, per ogni norma matriciale indotta
$$
\rho(P)\leq \|P\|
$$
Se per ipotesi avevamo che
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
e Per il teorema 4.1, cioè per la condizione necessaria e sufficiente di convergenza, visto che $\rho(P)<1$ il metodo $M$ è convergente.


## Condizioni necessarie di convergenza
Per la convergenza del metodo *(m)* è necessario che:
$$
\boxed{
|\operatorname{traccia}(P)|<n \qquad e \qquad 
|\det(P)|<1
}
$$
>[!tip] La traccia è la somma degli autovalori di una matrice.

#### Dimostrazione
##### 10.1 Traccia
Supponiamo che 
$$
|\operatorname{traccia}(P)|\geq n,
$$
allora vuol dire che ***almeno un autovalore*** ha modulo maggiore o uguale a $1$

Infatti, se tutti gli autovalori avessero modulo minore di $1$, allora:
$$
|\operatorname{tr}(P)|
=
|\lambda_{1} + \lambda_{2} + \dots + \lambda_{n}|
\underbrace{\leq}_{\text{disuguaglianza } \triangle}
|\lambda_1|+\dots+|\lambda_n|
<n.
$$

Dunque, esistendo un autovalore di `P` di modulo $\geq 1$, si ha:
$$
\rho(P)\geq1.
$$
Allora il metodo *(m)* NON è convergente per il teorema precedente


##### 10.2 Determinante
Supponiamo che 
$$
|\operatorname{\det}(P)|\geq n,
$$
allora vuol dire che ***almeno un autovalore*** ha modulo maggiore o uguale a $1$

Infatti, se tutti gli autovalori avessero modulo minore di $1$, allora:
$$
|\det(P)|
=
|\lambda_{1} * \lambda_{2} * \dots * \lambda_{n}|
\underbrace{\leq}_{\text{disuguaglianza } \triangle}
|\lambda_{1}| * |\lambda_{2}| * \dots * |\lambda_{n}|
<n.
$$

Dunque, esistendo un autovalore di `P` di modulo $\geq 1$, si ha:
$$
\rho(P)\geq1.
$$
Allora il metodo *(m)* NON è convergente per il teorema precedente


## Osservazione 4.2
![[Pasted image 20260730113142.png]]
L’osservazione si dimostra usando la formula dell’errore:
$$  
e^{(k)}=P^k e^{(0)},  
$$

dove $$e^{(0)}=x^{(0)}-x.$$
Se il metodo non è convergente, dal teorema della condizione necessaria e sufficiente segue che
$$  
\rho(P)\geq 1.  
$$

Quindi (P) possiede almeno un autovalore ($\lambda$) tale che
$$  
|\lambda|\geq 1.  
$$

Sia ($v\neq 0$) un autovettore associato a ($\lambda$):
$$  
Pv=\lambda v.  
$$

Scegliamo il vettore iniziale $x^{(0)}=x+v.$
L’errore iniziale è allora
$$  
e^{(0)}=x^{(0)}-x=v.  
$$
Pertanto: $$e^{(k)} = P^ke^{(0)}= P^kv.$$
Poiché (v) è un autovettore otteniamo:
$$  
P^kv=\lambda^k v.  
$$
Quindi
$$  
e^{(k)}=\lambda^k v.  
$$

Ora:
- se ($|\lambda|>1$), l’errore cresce;
- se ($|\lambda|=1$), l’errore non tende a zero.
In entrambi i casi:
$$  
e^{(k)}\not\to 0.  
$$
Di conseguenza:
$$  
x^{(k)}\not\to x.  
$$


## Velocità di convergenza
Consideriamo il metodo *(m)* per risolvere il sistema *(s)* e supponiamo che sia convergente (cioè $x = Px +q$ e $\rho(P) < 1$).

Usando l'equazione dell'errore: $e^{(k)}=P^{k}e^{(0)}\qquad \forall k = 0,1,2,\dots$ si può dimostrare che, fissata una qualsiasi norma vettoriale $\| \cdot \|$, per quasi tutti i vettori $x^{(0)} \in \mathbb{C}^{n}$, l'errore $e^{(k)} = x^{(k)} -x$ commesso dal metodo *(m)* al passo `k` soddisfa:
$$
\boxed{
\left\|e^{(k)}\right\|
\approx
C\,k^{m}\,\rho(P)^{k},
}
$$
($\forall k$ abbastanza grande (nella pratica anche per k piccolo))
dove:
- $C$ è indipendente da $k$;
- $m\in\{0,\dots,n-1\}$ dipende da $P$;
- se $P$ è diagonalizzabile, allora $m=0$.

Il termine dominante è $\rho(P)^k$.

Quindi la convergenza delle successioni $x^{(0)}, x^{(1)}, x^{(2)},\dots$ prodotte dal metodo *(m)* è tanto più veloce quanto più piccolo è $\rho(P)$.

## Confronto tra due metodi

> [!lemma] Definizione
> Consideriamo due metodi convergenti $\alpha$ e $\beta$ della forma *(m)* per risolvere lo stesso sistema.
> Se:
> $$
> \rho(P_\alpha)<\rho(P_\beta),
> $$
> allora $\alpha$ converge più velocemente di $\beta$.
> Dove $P_{\alpha}$ e $P_{\beta}$ sono le matrici d'intersezione associate ad $\alpha$ e $\beta$.


## Criterio di arresto del residuo
Consideriamo il metodo *(m)* per risolvere il sistema *(s)*.

Anche se il metodo che genera la successione $x^{(0)}, x^{(1)}, x^{(2)},\dots$ converge, non possiamo eseguire infinite iterazioni.
Abbiamo bisogno quindi di un criterio che permetta di arrestare tale metodo.

Il criterio di arresto più usato è il **criterio di arresto del residuo**.
### Definizione di residuo
Al passo $K$:
$$
\boxed{
r^{(K)}=b-Ax^{(K)}.
}
$$

### Criterio del residuo relativo
Si fissa una norma vettoriale a nostra scelta $\| \cdot \|$ e una soglia $\varepsilon>0$.

La successione si arresta al primo vettore $x^{K}$ che soddisfa la condizione:
$$
(R) \quad\boxed{
\frac{\left\|r^{(K)}\right\|}{\left\|b\right\|}
\leq
\varepsilon.
}
$$

La *(R)* impone che l'errore relativo commesso approssimando $b$ con $Ax^{K}$ sia $\le \varepsilon$
$$
\frac{\left\|b-Ax^{(K)}\right\|}{\left\|b\right\|}
\leq
\varepsilon.
$$

In tal modo avremo che l'errore relativo sulla soluzione soddisfa l'equazione
![[Screenshot 2026-08-02 (10.48.41).jpeg.png]]


>[!tip]- Numero di condizionamento
> Il numero di condizionamento misura quanto la soluzione del sistema $Ax=b$ può essere amplificato rispetto all’errore relativo presente nei dati.
> 
> In pratica:
> - se $\mu(A)$ è vicino a $1$, il sistema è ben condizionato;
> - se $\mu(A)$ è molto grande, il sistema è mal condizionato;
> - se $A$ è singolare, $A^{-1}$ non esiste e si pone
> $$  
> \mu(A)=+\infty.  
> $$
> 

###### Perché si usa l’errore relativo e non assoluto?
L’errore assoluto non tiene conto della grandezza del dato.
Per esempio:
$$
a=10000,
\qquad
\widetilde a=9999.
$$
![[Pasted image 20260723113837.png]]
La prima è l'errore relativo e il secondo è l'errore assoluto.

## Costruzione di metodi iterativi mediante decomposizione della matrice
Consideriamo:
$$
(s) \ Ax=b,
\qquad
A\in\mathbb{C}^{n\times n},
\qquad
b\in\mathbb{C}^n.
$$

Si sceglie una matrice invertibile:
$$
M\in\mathbb{C}^{n\times n},
$$
detta **precondizionatore**, e si scrive una decomposizione:
$$
A=M-(M-A).
$$

![[Screenshot 2026-08-02 (11.15.51).jpeg.png]]

Per ogni $y\in\mathbb{C}^n$ di *(s)* si definisce:
$$
\boxed{
r(y)=b-Ay
}
$$
e, al passo $k$:
$$
r^{(k)}=b-Ax^{(k)}.
$$

Si definisce quindi il metodo applicato al precondizionatore:
$$
\boxed{
x^{(k+1)}
=
M^{-1}(M-A)x^{(k)}+M^{-1}b
}
$$
oppure si può scrivere come:
$$
\boxed{
x^{(k+1)}
=
x^{(k)}+M^{-1}r^{(k)}
}
\qquad 
k = 0,1,2,\dots \quad ($)
$$
- dove $r^{(k)} = r(x^{(k)}) = b - Ax^{(k)}$

Il metodo *($)* è della forma *(m)*:
$$
x^{(k+1)}=Px^{(k)}+q,
$$
con matrice di iterazione:
$$
\boxed{
P=M^{-1}(M-A)=I-M^{-1}A
}
$$
e:
$$
\boxed{
q=M^{-1}b.
}
$$

Il metodo *($)* è consistente per costruzione, perché sostituendo la soluzione esatta $x$ si ritrova il sistema:
$$
Ax=b.
$$

#### Teorema 4.2
Pertanto:
>[!lemma] Teorema 4.2
> $$
> \boxed{
> \text{il metodo converge}
> \iff
> \rho(I-M^{-1}A)<1.
> }
> $$


## Osservazione smart
> [!tip]
> Permette di trovare gli autovalori e il raggio spettrale della matrice di iterazione senza calcolare esplicitamente $M^{-1}$ e $I-M^{-1}A$.

Il polinomio caratteristico della matrice di iterazione è:
$$
c_P(\lambda)
=
\det\left(
\lambda I-(I-M^{-1}A)
\right).
$$
Da cui, scrivendo tutto in funzione di $M^{-1}$
- $\lambda I =M^{-1}(\lambda M)$
- $I = M^{-1} M$

Quindi si ha:
$$
c_P(\lambda)
=
\det\left(
M^{-1}(\lambda M+A-M)
\right).
$$

Per il teorema di Binet (per cui il determinante di un prodotto è il prodotto dei determinanti):
$$
c_P(\lambda)
=
\det(M^{-1})
\det(\lambda M+A-M).
$$

Poiché:
$$
\det(M^{-1})\neq0,
$$

segue che:
$$
\boxed{
c_P(\lambda)=0
\iff
\det(\lambda M+A-M)=0.
}
$$

Questa è l’**equazione smart**.


### Aspetti computazionali
#### OSS 1 (4.6): Residuo precondizionato
L'iterazione `k-esima` del metodo *($)* viene calcolata dalla formula $x^{(k+1)}  = x^{(k)} + M^{-1}r^{(k)}$

Per calcolare $M^{-1}r^{(k)},$ si introduce il vettore:
$$
z^{(k)}=M^{-1}r^{(k)}.
$$
detto **residuo precondizionato**.

Non si calcola l’inversa ma si risolve il sistema lineare:
$$
\boxed{
Mz^{(k)}=r^{(k)}.
}
$$

Poi:
$$
x^{(k+1)}
=
x^{(k)}+z^{(k)}.
$$

Il sistema con matrice $M$ deve essere *più facile (rapido) da risolvere* del sistema originario $Ax = b$.

#### OSS 2 (4.7): Scelta del precondizionatore
Intuitivamente, quanto più il precondizionatore "M" assomiglia alla matrice `A`, tanto più il metodo *($)* convergerà più velocemente.

Bisogna mediare fra:
1. qualità dell’approssimazione:$$
   M\approx A;
   $$
2. facilità di risoluzione dei sistemi con matrice $M$.

Se $M\approx A,$ allora:
$$
I-M^{-1}A\approx0,
$$
e ci si aspetta un raggio spettrale piccolo.

Nel caso limite:
$$
M=A,
$$
la matrice di iterazione è nulla e il metodo converge in una sola iterazione, ma quell’iterazione costa quanto risolvere il sistema originario.

>[!tip] Quindi devo avere una `M` molto simile a `A` MA NON UGUALE, altrimenti risolvo tutto in una singola iterazione ma mi costa quanto risolvere il sistema normale.



## Metodo di Jacobi
Supponiamo che $\forall i \ a_{ii}\neq0$.
- quindi la matrice A abbia elementi diagonali non nulli

Sia $D=\operatorname{diag}(a_{11},\dots,a_{nn})$ la parte diagonale di $A$.
- Poiché $\det(D)=a_{11}\cdots a_{nn}\neq0,$ $D$ è invertibile.

Il metodo di Jacobi si ottiene scegliendo il precondizionatore:
$$
\boxed{
M=D.
}
$$

Quindi:
$$
\begin{cases}
	x^{(0)} \in \mathbb{C}^{n} \qquad \qquad \qquad \qquad \qquad \qquad \ \ \ \ \ \text{dato} \\
\boxed{x^{(k+1)}
=
D^{-1}(D-A)x^{(k)}+D^{-1}b} \ \ \qquad k = 0,1,2,\dots
\end{cases}
$$

oppure si può scrivere:
$$
\boxed{
x^{(k+1)}
=
x^{(k)}+D^{-1}r^{(k)}.
}
$$

La matrice di iterazione è:
$$
\boxed{
J=D^{-1}(D-A)=I-D^{-1}A.
}
$$

Il metodo converge se e solo se:
$$
\boxed{
\rho(J)<1.
}
$$

### Costo di un’iterazione di Jacobi
L'iterazione `k-esima` di $J$ richiede di calcolare il vettore
$$
z^{(k)} = D^{-1}r^{(k)}
$$

Per calcolare $z^{(k)}$ si risolve:
$$
Dz^{(k)}=r^{(k)}.
$$

Essendo il sistema diagonale
![[Pasted image 20260802113959.png]]
Si ottiene
$$
\boxed{
z_i^{(k)}
=
\frac{r_i^{(k)}}{a_{ii}},
\qquad
i=1,\dots,n.
}
$$
Il costo è $nD$ .



## Metodo di Gauss-Seidel
Supponiamo (anche qui) che `A` abbia elementi diagonali non nulli.

Sia $E$ la parte triangolare inferiore di $A$, compresa la diagonale:
$$
E=
\begin{pmatrix}
a_{11}&0&\cdots&0\\
a_{21}&a_{22}&\cdots&0\\
\vdots&\vdots&\ddots&\vdots\\
a_{n1}&a_{n2}&\cdots&a_{nn}
\end{pmatrix}.
$$

Poiché il det di una matrice triangolare inferiore è il prodotto degli elementi della diagonale:
$$
\det(E)=a_{11}\cdots a_{nn}\neq0,
$$
$E$ è invertibile.


Il metodo di Gauss-Seidel si ottiene scegliendo il precondizionatore:
$$
\boxed{
M=E.
}
$$

Quindi:
$$
\begin{cases}
	x^{(0)} \in \mathbb{C}^{n} \qquad \qquad \qquad \qquad \qquad \qquad \ \ \ \ \ \text{dato} \\
\boxed{
x^{(k+1)}
=
E^{-1}(E-A)x^{(k)}+E^{-1}b
} \ \ \qquad k = 0,1,2,\dots
\end{cases}

$$

oppure:
$$
\boxed{
x^{(k+1)}
=
x^{(k)}+E^{-1}r^{(k)}.
}
$$


La matrice di iterazione è:
$$
\boxed{
G=E^{-1}(E-A)=I-E^{-1}A.
}
$$

Il metodo converge se e solo se:
$$
\boxed{
\rho(G)<1.
}
$$


### Sostituzione in avanti
L'iterazione `k-esima` di $G$ richiede di calcolare il vettore
$$
z^{(k)} = E^{-1}r^{(k)}
$$

Per calcolare $z^{(k)}$ si risolve:
$$
Ez^{(k)}=r^{(k)}.
$$

La soluzione si ottiene per **sostituzione in avanti**:
![[Pasted image 20260723133848.png]]
Che diventa
$$
\boxed{
z_i^{(k)}
=
\frac{
r_i^{(k)}
-
\sum_{j=1}^{i-1}a_{ij}z_j^{(k)}
}{
a_{ii}
},
\qquad
i=1,\dots,n.
}
$$
- che tra l'altro se noti in $z_{3}^{(k)}$ ho $z_{1}^{(k)}$ e $z_{2}^{(k)}$ già calcolate.

### Costo
Per ogni componente $z_i^{(k)}$ servono:
- $i-1$ moltiplicazioni;
- $i-1$ addizioni o sottrazioni;
- una divisione.
Il costo del calcolo di $z_i^{(k)}$ è dunque
$$
1D+(i-1)M+(i-1)A
$$
perché:
- serve una divisione per $a_{ii}$
- servono $(i-1)$ moltiplicazioni per i termini $a_{ij}z_j^{(k)}$
- servono $(i-1)$ addizioni/sottrazioni per combinarli con $r_i^{(k)}$

Quindi il costo complessivo del calcolo di tutto $z^{(k)}$ è la sommatoria del costo dei singoli $z_i^{(k)}$
$$
\sum_{i=1}^n \left[1D+(i-1)M+(i-1)A\right]
$$
cioè risolvendo la sommatoria di 1D abbiamo $n$
$$
nD+\left(\sum_{i=1}^n(i-1)\right)M+\left(\sum_{i=1}^n(i-1)\right)A
$$
sapendo che la somma dei primi n-1 numeri naturali è
$$
\sum_{i=1}^n(i-1)=0+1+\cdots+(n-1)=\frac{n(n-1)}{2}
$$
otteniamo quindi
$$
nD+\frac{n(n-1)}{2}M+\frac{n(n-1)}{2}A
$$
Questo costo può ridursi se la parte triangolare inferiore $E$ di $A$ ha molti zeri
## Confronto tra Jacobi e Gauss-Seidel (oss. 4.8)
### Velocità e costo
Il precondizionatore $E$ approssima normalmente $A$ meglio di $D$.
- perché $E-A$ ha più zeri di $D-A$

Perciò, molto spesso:
$$
\rho(G)<\rho(J),
$$
e Gauss-Seidel converge in meno iterazioni.

Tuttavia:
- un’iterazione di Jacobi è meno costosa;
- un’iterazione di Gauss-Seidel è più costosa.

Il tempo totale dipende quindi dal problema, anche se spesso Gauss-Seidel risulta più efficiente.


## Teorema 4.3 sulla convergenza dei metodi di J e GS
Supponiamo che $A\in\mathbb{C}^{n\times n}$ soddisfi almeno una delle seguenti condizioni:
1. $A$ è a diagonale dominante e irriducibile;
2. $A$ è a diagonale dominante in senso stretto;
3. $A$ è a diagonale dominante per colonne e irriducibile;
4. $A$ è a diagonale dominante in senso stretto per colonne.
Allora i metodi di Jacobi e Gauss-Seidel per risolvere un sistema lineare sono convergenti.
#### Osservazioni
Se $A\in\mathbb{C}^{n\times n}$ rispetta una delle condizioni sopra, allora:
1. $A$ è invertibile per il Teorema 3.7;
2. gli elementi diagonali di $A$ sono diversi da zero.
	Supponiamo, per assurdo, che $\exists\, a_{ii}=0.$
	Allora, dato che $A$ rispetta per forza una delle condizioni precedenti, tutta la corrispondente riga o colonna è tutta uguale a zero, e di conseguenza il determinante sarebbe 0.
	Ciò è impossibile perché $A$ è invertibile.

### Dimostrazione teorema Diagonale dominante per righe e Gauss-Seidel
La dimostrazione viene svolta:
- per il metodo di Gauss-Seidel;
- con $A$ a diagonale dominante per righe;
- con $A$ irriducibile.

Sia $E$ la parte triangolare inferiore di $A$, inclusa la diagonale.
La matrice d'iterazione di Gauss-Seidel è
$$
G=I-E^{-1}A.
$$

Dobbiamo dimostrare che
$$
\rho(G)<1.
$$

Uso l'equazione smart per trovare gli autovalori di $G$ e devo trovare le soluzioni di
$$
\det(\lambda E+A-E)=0.
$$

Scrivo la matrice nel caso $n=4$:
$$
\det(\lambda E+A-E)
=
\begin{vmatrix}
\lambda a_{11} & a_{12} & a_{13} & a_{14}\\
\lambda a_{21} & \lambda a_{22} & a_{23} & a_{24}\\
\lambda a_{31} & \lambda a_{32} & \lambda a_{33} & a_{34}\\
\lambda a_{41} & \lambda a_{42} & \lambda a_{43} & \lambda a_{44}
\end{vmatrix}
\quad
(\star)
$$

Dimostro che tutte le radici di questo polinomio hanno modulo minore di $1$ e lo faccio dimostrando che nessun numero complesso $\lambda$ con $|\lambda|\geq 1$ può essere una radice.

1. Fisso $\lambda\in\mathbb{C}$ tale che $|\lambda|\geq 1$ e chiamo $B_\lambda=\lambda E+A-E.$
	Poiché $|\lambda|\geq 1,$ allora $$\lambda\neq 0.$$
	Questo vuol dire che $B_\lambda$ ha gli zeri nelle stesse posizioni di $A$.
	Quindi $B_\lambda$ **ha lo stesso grafo associato di $A$**, che è fortemente connesso dato che $A$ è irriducibile.
	Pertanto $B_\lambda$ è **irriducibile**.

2. Dimostro la dominanza diagonale di $B_\lambda$.
	Per ogni riga $i$ abbiamo che $$|\lambda a_{ii}|=|\lambda||a_{ii}|.$$
	Poiché $A$ è a diagonale dominante,$$
|a_{ii}|
\geq
\sum_{j\neq i}|a_{ij}|.
$$
	Moltiplicando per $|\lambda|$,$$
|\lambda||a_{ii}|
\geq
|\lambda|
\sum_{j\neq i}|a_{ij}|.
$$
	Separando gli elementi prima e dopo la diagonale,
$$
|\lambda||a_{ii}|
\geq
|\lambda|
\sum_{j<i}|a_{ij}|
+
\sum_{j>i}|a_{ij}|.
$$
	Poiché $|\lambda|\geq 1,$ si ha $$
|\lambda|
\sum_{j<i}|a_{ij}|
\geq
\sum_{j<i}|a_{ij}|.
$$
	E quindi$$
|\lambda a_{ii}|
\geq
\sum_{j<i}|\lambda a_{ij}|
+
\sum_{j>i}|a_{ij}|.
$$
	Questa è esattamente **la condizione di dominanza diagonale per righe**.
	Inoltre, la disuguaglianza in senso stretto per $B_\lambda$ vale sulle stesse righe di $A$.

Abbiamo dimostrato quindi che $B_\lambda$ è:
- a diagonale dominante;
- irriducibile.
Per un teorema $B_\lambda=\lambda E+A-E$ è invertibile.
Quindi
$$
\det(\lambda E+A-E)\neq 0.
$$
Pertanto nessun numero complesso con modulo maggiore o uguale a $1$ può essere radice dell'equazione smart.

Alloea tutti gli autovalori di $G$ hanno
$$
|\lambda_i(G)|<1
\qquad
\forall i.
$$
Quindi
$$
\rho(G)<1
$$
e dunque il metodo di Gauss-Seidel converge.

### Caso GAUSS-SEIDEL e A a DIAGONALE DOMINANTE IN SENSO STRETTO PER RIGHE
Supponiamo che $A\in\mathbb{C}^{n\times n}$ sia a diagonale dominante in senso stretto per righe, cioè
$$
|a_{ii}|
>
\sum_{j\neq i}|a_{ij}|,
\qquad i=1,\dots,n.
$$

Consideriamo il metodo di Gauss-Seidel.
Sia \(E\) la parte triangolare inferiore di \(A\), inclusa la diagonale. La matrice di iterazione è
$$
G=I-E^{-1}A.
$$

Dobbiamo dimostrare che $\rho(G)<1.$
Utilizziamo l’equazione smart per trovare gli autovalori di $G$, che sono le soluzioni di
$$
\det(\lambda E+A-E)=0.
$$

Dimostriamo che nessun numero complesso ($\lambda$) con $|\lambda|\geq 1$ può essere una soluzione.

Fissiamo quindi $\lambda\in\mathbb{C}$ con $|\lambda|\geq 1,$ e poniamo
$$
B_\lambda=\lambda E+A-E.
$$

Nel caso $n=4$, la matrice $B_\lambda$ è
$$
B_\lambda=
\begin{pmatrix}
\lambda a_{11} & a_{12} & a_{13} & a_{14}\\
\lambda a_{21} & \lambda a_{22} & a_{23} & a_{24}\\
\lambda a_{31} & \lambda a_{32} & \lambda a_{33} & a_{34}\\
\lambda a_{41} & \lambda a_{42} & \lambda a_{43} & \lambda a_{44}
\end{pmatrix}.
$$

Dimostriamo che $B_\lambda$ è a diagonale dominante in senso stretto per righe.

Per ogni riga `i`, l’elemento diagonale di $B_\lambda$ è $\lambda a_{ii},$ quindi
$$
|\lambda a_{ii}|=|\lambda||a_{ii}|.
$$

Poiché $A$ è a diagonale dominante in senso stretto per righe, abbiamo
$$
|a_{ii}|
>
\sum_{j\neq i}|a_{ij}|.
$$

Separando gli elementi che si trovano prima e dopo la diagonale,
$$
|a_{ii}|
>
\sum_{j<i}|a_{ij}|
+
\sum_{j>i}|a_{ij}|.
$$

Moltiplicando entrambi i membri per $|\lambda|$, otteniamo
$$
|\lambda||a_{ii}|
>
|\lambda|
\sum_{j<i}|a_{ij}|
+
|\lambda|
\sum_{j>i}|a_{ij}|.
$$
Poiché $|\lambda|\geq 1,$ per la seconda sommatoria si ha che
$$
|\lambda|
\sum_{j>i}|a_{ij}|
\geq
\sum_{j>i}|a_{ij}|.
$$

Di conseguenza,
$$
|\lambda||a_{ii}|
>
|\lambda|
\sum_{j<i}|a_{ij}|
+
\sum_{j>i}|a_{ij}|.
$$

Quindi, riportando $\lambda$ all'interno dei moduli otteniamo che
$$
|\lambda a_{ii}|
>
\sum_{j<i}|\lambda a_{ij}|
+
\sum_{j>i}|a_{ij}|.
$$

Questa è esattamente **la condizione di dominanza diagonale stretta per righe**.

Per un teorema sappiamo quindi che $B_\lambda$ è invertibile. Quindi
$$
\det(B_\lambda)\neq 0,
$$
e di conseguenza
$$
\det(\lambda E+A-E)\neq 0.
$$

 Quindi abbiamo dimostrato che nessun numero complesso $\lambda$ con $|\lambda|\geq 1$ può essere un autovalore di $G$.

Pertanto tutti gli autovalori di \(G\) soddisfano
$$
|\lambda_i(G)|<1,
\qquad i=1,\dots,n.
$$
Di conseguenza,
$$
\rho(G)<1.
$$

Quindi il metodo di Gauss-Seidel converge.

In questo caso **non serve dimostrare che $B_\lambda$ è irriducibile**, perché la dominanza diagonale è già stretta in tutte le righe.


### Caso Gauss-Seidel con dominanza diagonale per colonne e irriducibilità
Supponiamo che $A\in\mathbb{C}^{n\times n}$ sia:
- a diagonale dominante per colonne;
- irriducibile.

Questo significa che, per ogni colonna $j$,
$$  
|a_{jj}|  
\geq  
\sum_{i\neq j}|a_{ij}|,  
$$
e che la disuguaglianza è stretta per almeno una colonna.

Sia $E$ la parte triangolare inferiore di $A$, inclusa la diagonale.

La matrice di iterazione del metodo di Gauss-Seidel è
$$  
G=I-E^{-1}A.  
$$

Dobbiamo dimostrare che
$$  
\rho(G)<1.  
$$

Utilizziamo l’equazione smart. Gli autovalori di $G$ sono le soluzioni dell’equazione
$$  
\det(\lambda E+A-E)=0.  
$$

Nel caso $n=4$ si ha
$$  
\det(\lambda E+A-E) =
\begin{vmatrix}  
\lambda a_{11} & a_{12} & a_{13} & a_{14}\\  
\lambda a_{21} & \lambda a_{22} & a_{23} & a_{24}\\  
\lambda a_{31} & \lambda a_{32} & \lambda a_{33} & a_{34}\\  
\lambda a_{41} & \lambda a_{42} & \lambda a_{43} & \lambda a_{44}  
\end{vmatrix}.  
$$

Vogliamo dimostrare che nessun numero complesso $\lambda$ con $|\lambda|\geq 1$ può essere una soluzione di questa equazione.

Fissiamo quindi $\lambda\in\mathbb{C}$ tale che
$$  
|\lambda|\geq 1  
$$

e definiamo
$$  
B_\lambda=\lambda E+A-E.  
$$

#### 1. Irriducibilità di $B_\lambda$
Poiché $|\lambda|\geq 1$, si ha necessariamente
$$  
\lambda\neq 0.  
$$

La matrice $B_\lambda$ si ottiene moltiplicando per $\lambda$ gli elementi di $A$ che si trovano sulla diagonale e sotto la diagonale.
Dato che $\lambda\neq 0$, un elemento non nullo di $A$ non può diventare nullo dopo essere stato moltiplicato per $\lambda$.
Quindi $B_\lambda$ presenta gli zeri e gli elementi non nulli nelle stesse posizioni di $A$.
Di conseguenza, $B_\lambda$ ha lo stesso grafo associato di $A$.
Poiché $A$ è irriducibile, il suo grafo associato è fortemente connesso. Lo stesso vale quindi per $B_\lambda$.
Pertanto $B_\lambda$ è irriducibile.

#### 2. Dominanza diagonale per colonne di $B_\lambda$
Consideriamo una generica colonna $j$ di $B_\lambda$.
L’elemento diagonale della colonna $j$ è $\lambda a_{jj}$ e quindi
$$  
|\lambda a_{jj}|
=
|\lambda||a_{jj}|.  
$$

Poiché $A$ è a diagonale dominante per colonne, si ha
$$  
|a_{jj}|  
\geq  
\sum_{i\neq j}|a_{ij}|.  
$$

Separiamo gli elementi che si trovano sopra e sotto la diagonale:
$$  
|a_{jj}|  
\geq  
\sum_{i<j}|a_{ij}|  
+  
\sum_{i>j}|a_{ij}|.  
$$

Moltiplicando entrambi i membri per $|\lambda|$, otteniamo
$$  
|\lambda||a_{jj}|  
\geq  
|\lambda|  
\sum_{i<j}|a_{ij}|  
+  
|\lambda|  
\sum_{i>j}|a_{ij}|.  
$$

Nella colonna $j$ di $B_\lambda$, gli elementi sopra la diagonale rimangono uguali ad $a_{ij}$, mentre gli elementi sotto la diagonale diventano $\lambda a_{ij}$.

Poiché $|\lambda|\geq 1$, si ha
$$  
|\lambda|  
\sum_{i<j}|a_{ij}|  
\geq  
\sum_{i<j}|a_{ij}|.  
$$

Possiamo quindi ottenere
$$  
|\lambda||a_{jj}|  
\geq  
\sum_{i<j}|a_{ij}|  
+  
|\lambda|  
\sum_{i>j}|a_{ij}|.  
$$

Usando la proprietà
$$  
|\lambda a_{ij}|
=
|\lambda||a_{ij}|,  
$$
si ha
$$  
|\lambda a_{jj}|  
\geq  
\sum_{i<j}|a_{ij}|  
+  
\sum_{i>j}|\lambda a_{ij}|.  
$$

Questa è esattamente **la condizione di dominanza diagonale per colonne**.
Inoltre, nella colonna in cui la dominanza diagonale di $A$ è stretta, anche la dominanza diagonale di $B_\lambda$ rimane stretta.

Infatti, se per una colonna $j$ vale
$$  
|a_{jj}|
>
\sum_{i\neq j}|a_{ij}|,  
$$

moltiplicando per $|\lambda|$ si mantiene la disuguaglianza stretta e si ottiene
$$  
|\lambda a_{jj}|
>
\sum_{i<j}|a_{ij}|  
+  
\sum_{i>j}|\lambda a_{ij}|.  
$$

Abbiamo quindi dimostrato che $B_\lambda$ è:
- a diagonale dominante per colonne;
- irriducibile;
- a dominanza stretta in almeno una colonna.

Per un teorema, $B_\lambda$ è invertibile.

Quindi
$$  
\det(B_\lambda)\neq 0,  
$$
ossia
$$  
\det(\lambda E+A-E)\neq 0.  
$$

Pertanto nessun numero complesso $\lambda$ con $|\lambda|\geq 1$ può essere una radice dell’equazione smart.

Questo significa che tutti gli autovalori di $G$ soddisfano
$$  
|\lambda_i(G)|<1,  
\qquad i=1,\dots,n.  
$$

Di conseguenza,
$$  
\rho(G)<1.  
$$

Quindi il metodo di Gauss-Seidel converge.

### Caso Gauss-Seidel con dominanza diagonale stretta per colonne
Supponiamo che $A\in\mathbb{C}^{n\times n}$ sia a diagonale dominante in senso stretto per colonne.
Questo significa che, per ogni colonna $j$,
$$  
|a_{jj}|
>
\sum_{i\neq j}|a_{ij}|.  
$$

Sia $E$ la parte triangolare inferiore di $A$, inclusa la diagonale.
La matrice di iterazione del metodo di Gauss-Seidel è
$$  
G=I-E^{-1}A.  
$$

Dobbiamo dimostrare che
$$  
\rho(G)<1.  
$$

Usiamo l’equazione smart. Gli autovalori di $G$ sono le soluzioni di
$$  
\det(\lambda E+A-E)=0.  
$$

Vogliamo dimostrare che nessun numero complesso $\lambda$ con $|\lambda|\geq 1$ può essere una soluzione.

Fissiamo quindi $\lambda\in\mathbb{C}$ tale che
$$  
|\lambda|\geq 1  
$$
e poniamo
$$  
B_\lambda=\lambda E+A-E.  
$$

Nel caso $n=4$, la matrice $B_\lambda$ è
$$  
B_\lambda=  
\begin{pmatrix}  
\lambda a_{11} & a_{12} & a_{13} & a_{14}\\  
\lambda a_{21} & \lambda a_{22} & a_{23} & a_{24}\\  
\lambda a_{31} & \lambda a_{32} & \lambda a_{33} & a_{34}\\  
\lambda a_{41} & \lambda a_{42} & \lambda a_{43} & \lambda a_{44}  
\end{pmatrix}.  
$$

Dobbiamo dimostrare che $B_\lambda$ è a diagonale dominante in senso stretto per colonne.

Consideriamo una generica colonna $j$.

L’elemento diagonale di questa colonna è $\lambda a_{jj}$, quindi $$  
|\lambda a_{jj}|
=
|\lambda||a_{jj}|.  
$$
Poiché $A$ è a diagonale dominante in senso stretto per colonne, si ha
$$  
|a_{jj}|
>
\sum_{i\neq j}|a_{ij}|.  
$$

Separiamo gli elementi sopra e sotto la diagonale:
$$  
|a_{jj}|
>
\sum_{i<j}|a_{ij}|  
+  
\sum_{i>j}|a_{ij}|.  
$$

Moltiplicando entrambi i membri per $|\lambda|$, otteniamo
$$  
|\lambda||a_{jj}|
>
|\lambda|  
\sum_{i<j}|a_{ij}|  
+  
|\lambda|  
\sum_{i>j}|a_{ij}|.  
$$

Nella colonna $j$ di $B_\lambda$:
- gli elementi sopra la diagonale rimangono $a_{ij}$;
- gli elementi sotto la diagonale diventano $\lambda a_{ij}$.

Poiché $|\lambda|\geq 1$, vale
$$  
|\lambda|  
\sum_{i<j}|a_{ij}|  
\geq  
\sum_{i<j}|a_{ij}|.  
$$

Quindi dal passaggio precedente segue
$$  
|\lambda||a_{jj}|
>
\sum_{i<j}|a_{ij}|  
+  
|\lambda|  
\sum_{i>j}|a_{ij}|.  
$$

Usando che
$$  
|\lambda a_{ij}|
= 
|\lambda||a_{ij}|,  
$$

otteniamo
$$  
|\lambda a_{jj}|
>
\sum_{i<j}|a_{ij}|  
+  
\sum_{i>j}|\lambda a_{ij}|.  
$$
Questa è esattamente **la condizione di dominanza diagonale stretta per colonne**.

Questa disuguaglianza vale per ogni colonna $j$, quindi $B_\lambda$ è a diagonale dominante in senso stretto per colonne.

Per un teorema sappiamo che $B_\lambda$ è invertibile.

Quindi
$$  
\det(B_\lambda)\neq 0,  
$$

ossia
$$  
\det(\lambda E+A-E)\neq 0.  
$$

Pertanto nessun numero complesso $\lambda$ con $|\lambda|\geq 1$ può essere una radice dell’equazione smart.

Questo significa che ogni autovalore di $G$ soddisfa
$$  
|\lambda_i(G)|<1,  
\qquad i=1,\dots,n.  
$$

Di conseguenza,
$$  
\rho(G)<1.  
$$

Quindi il metodo di Gauss-Seidel converge.

In questo caso non serve dimostrare che $B_\lambda$ sia irriducibile, perché la dominanza diagonale è già stretta in tutte le colonne.


### Caso Jacobi con dominanza diagonale per righe e irriducibilità
Supponiamo che $A\in\mathbb{C}^{n\times n}$ sia:
- a diagonale dominante per righe;
- irriducibile.

Quindi, per ogni riga $i$,
$$  
|a_{ii}|  
\geq  
\sum_{j\neq i}|a_{ij}|,  
$$
e la disuguaglianza è stretta per almeno una riga.

Sia $D$ la matrice diagonale formata dagli elementi diagonali di $A$.

La matrice di iterazione del metodo di Jacobi è
$$  
G=I-D^{-1}A.  
$$

Dobbiamo dimostrare che
$$  
\rho(G)<1.  
$$

Usando l’equazione smart, gli autovalori di $G$ sono le soluzioni dell’equazione
$$  
\det(\lambda D+A-D)=0.  
$$

Vogliamo dimostrare che nessun numero complesso $\lambda$ con $|\lambda|\geq 1$ può essere una soluzione.

Fissiamo quindi $\lambda\in\mathbb{C}$ tale che
$$  
|\lambda|\geq 1  
$$

e poniamo
$$  
B_\lambda=\lambda D+A-D.  
$$

Nel caso $n=4$, la matrice $B_\lambda$ è
$$  
B_\lambda=  
\begin{pmatrix}  
\lambda a_{11} & a_{12} & a_{13} & a_{14}\\  
a_{21} & \lambda a_{22} & a_{23} & a_{24}\\ 
a_{31} & a_{32} & \lambda a_{33} & a_{34}\\  
a_{41} & a_{42} & a_{43} & \lambda a_{44}  
\end{pmatrix}.  
$$

Rispetto ad $A$, quindi, cambiano soltanto gli elementi diagonali, che vengono moltiplicati per $\lambda$.

#### 1. Irriducibilità di $B_\lambda$
Poiché $|\lambda|\geq 1$, si ha
$$  
\lambda\neq 0.  
$$

Gli elementi fuori dalla diagonale di $B_\lambda$ sono esattamente gli stessi di $A$.
Gli elementi diagonali, invece, non influenzano i collegamenti tra nodi distinti nel grafo associato.
Quindi $B_\lambda$ ha lo stesso grafo associato di $A$.
Poiché $A$ è irriducibile, il suo grafo è fortemente connesso. Di conseguenza anche il grafo di $B_\lambda$ è fortemente connesso.
Pertanto $B_\lambda$ è irriducibile.

#### 2. Dominanza diagonale per righe di $B_\lambda$
Consideriamo una generica riga $i$.
L’elemento diagonale di $B_\lambda$ è $\lambda a_{ii}$, quindi $$  
|\lambda a_{ii}|
=
|\lambda||a_{ii}|.  
$$
Poiché $A$ è a diagonale dominante per righe, si ha
$$  
|a_{ii}|  
\geq  
\sum_{j\neq i}|a_{ij}|.  
$$
Moltiplicando entrambi i membri per $|\lambda|$, otteniamo
$$  
|\lambda||a_{ii}|  
\geq  
|\lambda|  
\sum_{j\neq i}|a_{ij}|.  
$$

Poiché $|\lambda|\geq 1$, vale
$$  
|\lambda|  
\sum_{j\neq i}|a_{ij}|  
\geq  
\sum_{j\neq i}|a_{ij}|.  
$$

Di conseguenza,
$$  
|\lambda||a_{ii}|  
\geq  
\sum_{j\neq i}|a_{ij}|.  
$$

Quindi
$$  
|\lambda a_{ii}|  
\geq  
\sum_{j\neq i}|a_{ij}|.  
$$

Questa è esattamente la condizione di **dominanza diagonale per righe**
Questa disuguaglianza vale per ogni riga, quindi $B_\lambda$ è a diagonale dominante per righe.
Inoltre, nella riga in cui $A$ ha dominanza stretta, anche $B_\lambda$ mantiene la dominanza stretta.

Infatti, se per una certa riga $i$ vale
$$  
|a_{ii}|
>
\sum_{j\neq i}|a_{ij}|,  
$$
allora, moltiplicando il primo membro per $|\lambda|\geq 1$, si ottiene ancora
$$  
|\lambda a_{ii}|
>
\sum_{j\neq i}|a_{ij}|.  
$$

Abbiamo quindi dimostrato che $B_\lambda$ è:
- a diagonale dominante per righe;
- irriducibile;
- a dominanza stretta in almeno una riga.

Per un teorema sappiamo che $B_\lambda$ è invertibile.

Quindi
$$  
\det(B_\lambda)\neq 0,  
$$

ossia
$$  
\det(\lambda D+A-D)\neq 0.  
$$

Pertanto nessun numero complesso $\lambda$ con $|\lambda|\geq 1$ può essere una radice dell’equazione smart.

Questo significa che tutti gli autovalori di $G$ soddisfano
$$  
|\lambda_i(G)|<1,  
\qquad i=1,\dots,n.  
$$

Di conseguenza,
$$  
\rho(G)<1.  
$$

Quindi il metodo di Jacobi converge.


### Caso Jacobi con dominanza diagonale stretta per righe
Supponiamo che $A\in\mathbb{C}^{n\times n}$ sia a diagonale dominante in senso stretto per righe.
Questo significa che, per ogni riga $i$,
$$  
|a_{ii}|
>
\sum_{j\neq i}|a_{ij}|.  
$$

Sia $D$ la matrice diagonale formata dagli elementi diagonali di $A$.

La matrice di iterazione del metodo di Jacobi è
$$  
G=I-D^{-1}A.  
$$

Dobbiamo dimostrare che
$$  
\rho(G)<1.  
$$

Utilizzando l’equazione smart, gli autovalori di $G$ sono le soluzioni dell’equazione
$$  
\det(\lambda D+A-D)=0.  
$$

Vogliamo dimostrare che nessun numero complesso $\lambda$ con $|\lambda|\geq 1$ può essere una soluzione.

Fissiamo quindi $\lambda\in\mathbb{C}$ tale che
$$  
|\lambda|\geq 1  
$$

e definiamo
$$  
B_\lambda=\lambda D+A-D.  
$$

Nel caso $n=4$, la matrice $B_\lambda$ è
$$  
B_\lambda=  
\begin{pmatrix}  
\lambda a_{11} & a_{12} & a_{13} & a_{14}\\  
a_{21} & \lambda a_{22} & a_{23} & a_{24}\\  
a_{31} & a_{32} & \lambda a_{33} & a_{34}\\  
a_{41} & a_{42} & a_{43} & \lambda a_{44}  
\end{pmatrix}.  
$$

Rispetto alla matrice $A$, quindi, vengono moltiplicati per $\lambda$ soltanto gli elementi diagonali. Tutti gli elementi fuori dalla diagonale rimangono invariati.

#### Dominanza diagonale stretta di $B_\lambda$
Consideriamo una generica riga $i$.
L’elemento diagonale della riga $i$ di $B_\lambda$ è $\lambda a_{ii}$, quindi $$  
|\lambda a_{ii}|
>
|\lambda||a_{ii}|.  
$$
Poiché $A$ è a diagonale dominante in senso stretto per righe, abbiamo
$$  
|a_{ii}|
>
\sum_{j\neq i}|a_{ij}|.  
$$

Moltiplicando entrambi i membri per $|\lambda|$, che è positivo, la disuguaglianza rimane stretta:
$$  
|\lambda||a_{ii}|
>
|\lambda|  
\sum_{j\neq i}|a_{ij}|.  
$$

Poiché $|\lambda|\geq 1$, si ha
$$  
|\lambda|  
\sum_{j\neq i}|a_{ij}|  
\geq  
\sum_{j\neq i}|a_{ij}|.  
$$

Unendo le due disuguaglianze, otteniamo
$$  
|\lambda||a_{ii}|
>
\sum_{j\neq i}|a_{ij}|.  
$$

Quindi
$$  
|\lambda a_{ii}|
>
\sum_{j\neq i}|a_{ij}|.  
$$
Questa è esattamente la condizione per la **dominanza diagonale in senso stretto per righe**.
La disuguaglianza vale per ogni riga $i$, quindi $B_\lambda$ è a diagonale dominante in senso stretto per righe.

Per un teorema sappiamo che $B_\lambda$ è invertibile.

Essendo $B_\lambda$ invertibile, si ha
$$  
\det(B_\lambda)\neq 0,  
$$

ossia
$$  
\det(\lambda D+A-D)\neq 0.  
$$

Pertanto nessun numero complesso $\lambda$ con $|\lambda|\geq 1$ può essere una radice dell’equazione smart.

Questo significa che tutti gli autovalori di $G$ soddisfano
$$  
|\lambda_i(G)|<1,  
\qquad i=1,\dots,n.  
$$

Di conseguenza,
$$  
\rho(G)<1.  
$$

Quindi il metodo di Jacobi converge.

Non serve dimostrare che $B_\lambda$ sia irriducibile, perché la dominanza diagonale è già stretta in tutte le righe.


### Caso Jacobi con dominanza diagonale per colonne e irriducibilità
Supponiamo che $A\in\mathbb{C}^{n\times n}$ sia:
- a diagonale dominante per colonne;
- irriducibile.

Questo significa che, per ogni colonna $j$,
$$  
|a_{jj}|  
\geq  
\sum_{i\neq j}|a_{ij}|,  
$$

e che la disuguaglianza è stretta per almeno una colonna.

Sia $D$ la matrice diagonale formata dagli elementi diagonali di $A$.

La matrice di iterazione del metodo di Jacobi è
$$  
G=I-D^{-1}A.  
$$

Dobbiamo dimostrare che
$$  
\rho(G)<1.  
$$

Usando l’equazione smart, gli autovalori di $G$ sono le soluzioni dell’equazione
$$  
\det(\lambda D+A-D)=0.  
$$

Vogliamo dimostrare che nessun numero complesso $\lambda$ con $|\lambda|\geq 1$ può essere una soluzione.

Fissiamo quindi $\lambda\in\mathbb{C}$ tale che
$$  
|\lambda|\geq 1  
$$

e definiamo
$$  
B_\lambda=\lambda D+A-D.  
$$

Nel caso $n=4$, la matrice $B_\lambda$ è
$$  
B_\lambda=  
\begin{pmatrix}  
\lambda a_{11} & a_{12} & a_{13} & a_{14}\\  
a_{21} & \lambda a_{22} & a_{23} & a_{24}\\  
a_{31} & a_{32} & \lambda a_{33} & a_{34}\\  
a_{41} & a_{42} & a_{43} & \lambda a_{44}  
\end{pmatrix}.  
$$

Rispetto ad $A$, cambiano soltanto gli elementi diagonali, che vengono moltiplicati per $\lambda$. Tutti gli elementi fuori dalla diagonale rimangono uguali.

#### 1. Irriducibilità di $B_\lambda$
Poiché $|\lambda|\geq 1$, si ha
$$  
\lambda\neq 0.  
$$

Gli elementi fuori dalla diagonale di $B_\lambda$ coincidono esattamente con quelli di $A$.
Il grafo associato a una matrice dipende dagli elementi fuori dalla diagonale, perché questi descrivono i collegamenti tra nodi distinti.
Quindi $B_\lambda$ ha lo stesso grafo associato di $A$.
Poiché $A$ è irriducibile, il suo grafo è fortemente connesso. Di conseguenza, anche il grafo di $B_\lambda$ è fortemente connesso.
Pertanto $B_\lambda$ è irriducibile.

#### 2. Dominanza diagonale per colonne di $B_\lambda$
Consideriamo una generica colonna $j$.
L’elemento diagonale della colonna $j$ di $B_\lambda$ è $\lambda a_{jj}$, quindi $$  
|\lambda a_{jj}|
=
|\lambda||a_{jj}|.  
$$

Poiché $A$ è a diagonale dominante per colonne, si ha
$$  
|a_{jj}|  
\geq  
\sum_{i\neq j}|a_{ij}|.  
$$

Moltiplicando entrambi i membri per $|\lambda|$, otteniamo
$$  
|\lambda||a_{jj}|  
\geq  
|\lambda|  
\sum_{i\neq j}|a_{ij}|.  
$$

Poiché $|\lambda|\geq 1$, vale
$$  
|\lambda|  
\sum_{i\neq j}|a_{ij}|  
\geq  
\sum_{i\neq j}|a_{ij}|.  
$$

Unendo le due disuguaglianze, si ottiene
$$  
|\lambda||a_{jj}|  
\geq  
\sum_{i\neq j}|a_{ij}|.  
$$

Quindi
$$  
|\lambda a_{jj}|  
\geq  
\sum_{i\neq j}|a_{ij}|.  
$$
Questa è esattamente la condizione di **dominanza diagonale per colonne**.

Questa disuguaglianza vale per ogni colonna $j$, quindi $B_\lambda$ è a diagonale dominante per colonne.

Inoltre, nella colonna in cui $A$ ha dominanza stretta, anche $B_\lambda$ mantiene la dominanza stretta.

Infatti, se per una certa colonna $j$ vale
$$  
|a_{jj}|
>
\sum_{i\neq j}|a_{ij}|,  
$$

allora, poiché $|\lambda|\geq 1$,
$$  
|\lambda a_{jj}|
>
\sum_{i\neq j}|a_{ij}|.  
$$

Quindi $B_\lambda$ ha dominanza stretta in almeno una colonna.

Abbiamo quindi dimostrato che $B_\lambda$ è:
- a diagonale dominante per colonne;
- irriducibile;
- a dominanza stretta in almeno una colonna.

Per un teorema sappiamo che $B_\lambda$ è invertibile.

Di conseguenza,
$$  
\det(B_\lambda)\neq 0,  
$$

ossia
$$  
\det(\lambda D+A-D)\neq 0.  
$$

Pertanto nessun numero complesso $\lambda$ con $|\lambda|\geq 1$ può essere una radice dell’equazione smart.

Questo significa che tutti gli autovalori di $G$ soddisfano
$$  
|\lambda_i(G)|<1,  
\qquad i=1,\dots,n.  
$$

Di conseguenza,
$$  
\rho(G)<1.  
$$

Quindi il metodo di Jacobi converge.

### Caso Jacobi con dominanza diagonale stretta per colonne
Supponiamo che $A\in\mathbb{C}^{n\times n}$ sia a diagonale dominante in senso stretto per colonne.
Questo significa che, per ogni colonna $j$,
$$  
|a_{jj}|
>
\sum_{i\neq j}|a_{ij}|.  
$$

Sia $D$ la matrice diagonale formata dagli elementi diagonali di $A$.

La matrice di iterazione del metodo di Jacobi è
$$  
G=I-D^{-1}A.  
$$

Dobbiamo dimostrare che
$$  
\rho(G)<1.  
$$

Utilizzando l’equazione smart, gli autovalori di $G$ sono le soluzioni dell’equazione
$$  
\det(\lambda D+A-D)=0.  
$$

Vogliamo dimostrare che nessun numero complesso $\lambda$ con $|\lambda|\geq 1$ può essere una soluzione.

Fissiamo quindi $\lambda\in\mathbb{C}$ tale che
$$  
|\lambda|\geq 1  
$$

e definiamo
$$  
B_\lambda=\lambda D+A-D.  
$$

Nel caso $n=4$, la matrice $B_\lambda$ è
$$  
B_\lambda=  
\begin{pmatrix}  
\lambda a_{11} & a_{12} & a_{13} & a_{14}\\  
a_{21} & \lambda a_{22} & a_{23} & a_{24}\\  
a_{31} & a_{32} & \lambda a_{33} & a_{34}\\  
a_{41} & a_{42} & a_{43} & \lambda a_{44}  
\end{pmatrix}.  
$$

Rispetto ad $A$, quindi, cambiano soltanto gli elementi diagonali, che vengono moltiplicati per $\lambda$.

Tutti gli elementi fuori dalla diagonale rimangono invariati.

#### Dominanza diagonale stretta per colonne di $B_\lambda$
Consideriamo una generica colonna $j$.
L’elemento diagonale della colonna $j$ di $B_\lambda$ è $\lambda a_{jj}$, quindi $$  
|\lambda a_{jj}|
=
|\lambda||a_{jj}|.  
$$
Poiché $A$ è a diagonale dominante in senso stretto per colonne, si ha
$$  
|a_{jj}|
>
\sum_{i\neq j}|a_{ij}|.  
$$

Moltiplicando entrambi i membri per $|\lambda|$, che è positivo, la disuguaglianza rimane stretta:
$$  
|\lambda||a_{jj}|
>
|\lambda|  
\sum_{i\neq j}|a_{ij}|.  
$$

Poiché $|\lambda|\geq 1$, vale
$$  
|\lambda|  
\sum_{i\neq j}|a_{ij}|  
\geq  
\sum_{i\neq j}|a_{ij}|.  
$$

Unendo le due disuguaglianze, otteniamo
$$  
|\lambda||a_{jj}|
>
\sum_{i\neq j}|a_{ij}|.  
$$

Quindi
$$  
|\lambda a_{jj}|
>
\sum_{i\neq j}|a_{ij}|.  
$$
Questa è esattamente la condizione della **dominanza diagonale in senso stretto per colonne**.

Questa disuguaglianza vale per ogni colonna $j$.
Quindi $B_\lambda$ è a diagonale dominante in senso stretto per colonne.

Per un teorema sappiamo che $B_\lambda$ è invertibile.
Di conseguenza,
$$  
\det(B_\lambda)\neq 0,  
$$

ossia
$$  
\det(\lambda D+A-D)\neq 0.  
$$

Pertanto nessun numero complesso $\lambda$ con $|\lambda|\geq 1$ può essere una radice dell’equazione smart.

Questo significa che tutti gli autovalori di $G$ soddisfano
$$  
|\lambda_i(G)|<1,  
\qquad i=1,\dots,n.  
$$

Di conseguenza,
$$  
\rho(G)<1.  
$$
Quindi il metodo di Jacobi converge.


In questo caso non serve dimostrare che $B_\lambda$ sia irriducibile, perché la dominanza diagonale è stretta in tutte le colonne e garantisce già l’invertibilità.



## Teorema 4.4
Supponiamo che $A\in\mathbb{C}^{n\times n}$ sia hermitiana definita positiva.
Allora il metodo di Gauss-Seidel per risolvere un sistema lineare di matrice $A$ è convergente.

### Osservazioni
Se $A\in\mathbb{C}^{n\times n}$ è hermitiana definita positiva, allora:
- $A$ è invertibile perché i suoi autovalori sono positivi e quindi
$$
0\notin\sigma(A);
$$
- per un esercizio dimostrato, gli elementi diagonali di $A$ sono positivi.

Dunque, se $A$ è hermitiana definita positiva, i metodi di Jacobi e Gauss-Seidel sono applicabili per risolvere un sistema lineare di matrice $A$.

### Dimostrazione del teorema
Dobbiamo dimostrare che $\rho(G)<1,$ dove
$$
G=I-E^{-1}A
$$
è la matrice d'iterazione del metodo di Gauss-Seidel ed $E$ è la parte triangolare inferiore di $A$ inclusa la diagonale.

Divido la dimostrazione in due parti.

#### Parte 1
Dimostriamo che la matrice ausiliaria $A-G^*AG$ è hermitiana definita positiva.
###### Hermitiana
Il fatto che sia hermitiana segue direttamente dall'ipotesi che $A$ è hermitiana e dalla proprietà
$$
(XY)^*=Y^*X^*,
$$
che vale per ogni coppia di matrici moltiplicabili.

Quindi
$$
(A-G^*AG)^*
=
A^*-(G^*AG)^*
$$
$$
=
A^*-G^*A^*(G^*)^*
$$
$$
=
A-G^*AG.
$$
Quindi $A-G^*AG$ è hermitiana.
###### Definita positiva
Per dimostrare che $A-G^*AG$ è definita positiva osserviamo che
$$
\begin{array}{rcl}

A-G^*AG
&=&
A-(I-E^{-1}A)^*A(I-E^{-1}A)
\\[1em]

\color{cyan}{
\substack{
\text{Pongo }F=E^{-1}A.\\
\text{Poiché }E^{-1}\text{ e }A\text{ sono invertibili,}\\
F\text{ è invertibile e }F^{-1}=A^{-1}E
}}
&\Big\vert&
\\[-0.2em]

&=&
A-(I-F)^*A(I-F)
\\[1em]

\color{cyan}{
\substack{
(I-F)^*=I-F^*
}}
&\Big\vert&
\\[-0.2em]

&=&
A-(I-F^*)A(I-F)
\\[1em]

\color{cyan}{
\substack{
\text{Moltiplico prima }A(I-F)
}}
&\Big\vert&
\\[-0.2em]

&=&
A-(I-F^*)(A-AF)
\\[1em]

\color{cyan}{
\substack{
\text{Sviluppo il secondo prodotto}
}}
&\Big\vert&
\\[-0.2em]

&=&
A-\bigl(A-AF-F^*A+F^*AF\bigr)
\\[1em]

\color{cyan}{
\substack{
\text{Tolgo le parentesi cambiando i segni}
}}
&\Big\vert&
\\[-0.2em]

&=&
A-A+AF+F^*A-F^*AF
\\[1em]

\color{cyan}{
\substack{  
\text{Raccolgo }F^*\text{ a sinistra}\\
\text{e }F\text{ a destra} \\ 
\\
\text{Per ogni matrice invertibile }F,\\
(F^{-1})^*=(F^*)^{-1}=:F^{-*}.\\
\text{Quindi }F^*F^{-*}=I
\text{ e }AF=F^*F^{-*}AF 
}}
&\Big\vert&
\\[-0.2em]

&=&
F^*
\left(
F^{-*}A+AF^{-1}-A
\right)
F
\\[1em]

\color{cyan}{
\substack{
F^{-1}=A^{-1}E,\\
AF^{-1}=AA^{-1}E=E
}}
&\Big\vert&
\\[-0.2em]

&=&
F^*
\left(
F^{-*}A + E -A
\right)
F
\\[1em]

\color{cyan}{
\substack{
F^{-*}=(F^{-1})^*=(A^{-1}E)^*
=E^*(A^{-1})^*.\\
\text{Poiché }A=A^*,\text{ anche }(A^{-1})^*=A^{-1},\\
\text{quindi }F^{-*}A=E^*A^{-1}A=E^*
}}
&\Big\vert&
\\[-0.2em]

&=&
F^*
\left(
E^*+E-A
\right)
F
\\[1em]

\color{cyan}{
\substack{
\text{Poiché }A\text{ è hermitiana ed }E\text{ contiene}\\
\text{la parte triangolare inferiore, diagonale inclusa,}\\
E+E^*-A=D,\\
\text{dove }D=\operatorname{diag}(a_{11},\dots,a_{nn})
}}
&\Big\vert&
\\[-0.2em]

\underbrace{
A-G^*AG
}_{\color{cyan}{\text{matrice da studiare}}}
&=&
\underbrace{
F^*DF
}_{\color{cyan}{\text{forma finale}}}.

\end{array}
$$


Pertanto, per ogni $y\in\mathbb{C}^{n},\qquad y\neq 0,$ si ha
$$
y^*(A-G^*AG)y
=
y^*F^*DFy.
$$
Ponendo
$$
u=Fy,
$$

si ottiene
$$
y^*(A-G^*AG)y
=
u^*Du.
$$

Poiché $F$ è invertibile e $y\neq 0$, allora
$$
u\neq 0.
$$

Inoltre,
$$
u^*Du
=
\sum_{i=1}^n a_{ii}|u_i|^2.
$$
- Per questo motivo qui
	![[Pasted image 20260803215544.png]]

Poiché

$$
a_{ii}>0
\qquad
\forall i
$$
e almeno una componente di $u$ è diversa da zero, si ha
$$
u^*Du>0.
$$

Quindi
$$
y^*(A-G^*AG)y>0.
$$

Per un teorema sappiamo quindi che $A-G^*AG$ è definita positiva.


Unendo le due sottodimostrazioni, otteniamo che $A-G^*AG$ è hermitiana definita positiva.

## Parte 2
Resta da dimostrare che $\rho(G)<1.$
Sia $\lambda$ un autovalore qualsiasi di $G$.
Vogliamo dimostrare che $|\lambda|<1.$

Prendiamo un autovettore associato $y\neq 0$ tale che$$
Gy=\lambda y.
$$
Poiché $A-G^*AG$ è hermitiana definita positiva, per lo stesso teorema nominato in precedenza si ha
$$
\begin{array}{rcl}

0
&<&
y^*(A-G^*AG)y
\\[1em]

\color{cyan}{
\substack{
\text{Sviluppo il prodotto}
}}
&\Big\vert&
\\[-0.2em]

&=&
y^*Ay-y^*G^*AGy
\\[1em]

\color{cyan}{
\substack{
y^*G^*=(Gy)^*
}}
&\Big\vert&
\\[-0.2em]

&=&
y^*Ay-(Gy)^*AGy
\\[1em]

\color{cyan}{
\substack{
Gy=\lambda y
}}
&\Big\vert&
\\[-0.2em]

&=&
y^*Ay-(\lambda y)^*A(\lambda y)
\\[1em]

\color{cyan}{
\substack{
(\lambda y)^*=\overline{\lambda}\,y^* \\
\text{qui la regola vale per le matrici ma} \\
\text{y può essere considerato una matrice } n \times 1
}}
&\Big\vert&
\\[-0.2em]

&=&
y^*Ay-\overline{\lambda}\,y^*A(\lambda y)
\\[1em]

\color{cyan}{
\substack{
\lambda\text{ è uno scalare, quindi può essere}\\
\text{portato fuori dal prodotto matriciale}
}}
&\Big\vert&
\\[-0.2em]

&=&
y^*Ay-\overline{\lambda}\lambda\,y^*Ay
\\[1em]

\color{cyan}{
\substack{
\overline{\lambda}\lambda=|\lambda|^2
}}
&\Big\vert&
\\[-0.2em]

&=&
y^*Ay-|\lambda|^2y^*Ay
\\[1em]

\color{cyan}{
\substack{
\text{Raccolgo }y^*Ay
}}
&\Big\vert&
\\[-0.2em]


&=&
y^*Ay
\left(
1-|\lambda|^2
\right) > 0

\end{array}
$$
Dato che $A$ è hermitiana definita positiva e $y\neq 0$, allora
$$
y^*Ay>0.
$$

Deve quindi valere$$
1-|\lambda|^2>0.
$$
Da cui
$$
|\lambda|^2<1
$$
e quindi
$$
|\lambda|<1.
$$

Questo vale per ogni autovalore di $G$, quindi
$$
\rho(G)<1.
$$

Quindi abbiamo dimostrato che il metodo di Gauss-Seidel è convergente.
