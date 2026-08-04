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
##### $Rn[x]$
Una base di $R_{n}[x]$ è un **insieme di elementi** $v_{1}(x), v_{r}(x) \in R_{n}[x]$ tali che:
1. sono **linearmente indipendenti**
	- l'unica combinazione lineare $\alpha_{1}v_{1}(x) + \alpha_{r}v_{r}(x)$ che coincide con il polinomio nullo è la combinazione lineare con $\alpha_{1}=\dots=\alpha_{r}=0$
2. **generano** tutto lo spazio
	- ogni polinomio $q(x) \in R_{n}[x]$ si può scrivere come combinazione lineare $q(x) = \beta_{1}v_{1}(x) + \beta_{r}v_{r}(x)$ 
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
##### Errore o resto dell'interpolazione polinomiale

##### Cosa vuol dire $C^{n+1}[a,b]$


##### Differenze divise

##### Polinomio in forma di Newton

##### Algoritmo di valutazione del polinomio d'interpolazione in un punto e il suo costo
sia $f:[a,b]\to\mathbb{R}$, siano
$x_0,\ldots,x_n\in[a,b]$
punti distinti e sia $t\in\mathbb{R}$
vogliamo costruire un algoritmo per calcolare $p(t)$, dove $p(x)$ è il polinomio di interpolazione di $f(x)$ sui nodi $x_0,x_1,\ldots,x_n$
l’algoritmo nel caso $n=3$
in base al teorema della forma di Newton abbiamo
$$
p(x)=f[x_0]+f[x_0,x_1](x-x_0)+f[x_0,x_1,x_2](x-x_0)(x-x_1)+f[x_0,x_1,x_2,x_3](x-x_0)(x-x_1)(x-x_2)
$$

la prima parte dell'algoritmo è indipendente dal punto $t$ in cui devo valutare $p(x)$
consiste nel calcolo delle differenze divise, con la tabella delle differenze divise

la seconda parte utilizza il metodo di Ruffini-Horner

scriviamo $p(t)$ nella seguente forma
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
il numero di elementi consiste nella parte triangolare inferiore della tabella di una ipotetica matrice $n\times n$
per fare questi calcoli sono necessarie 2 sottrazioni e 1 divisione quindi
$2\cdot\frac{n(n+1)}{2}=n(n+1)$ sottrazioni, 
e $\frac{n(n+1)}{2}$ divisioni
nel nostro caso 12 sottrazioni e 6 divisioni
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
$$
c_1(n)=n(n+1)A+\frac{n(n+1)}{2}D
$$
per la prima fase, cioè il calcolo delle differenze divise
per la seconda fase abbiamo
$$
c_2(n)=2nA+nM
$$
perché ci sono $n$ sottrazioni e $n$ addizioni, quindi $2nA$, più $n$ moltiplicazioni
quindi
$$
c(n)=n(n+1)A+2nA+nM+\frac{n(n+1)}{2}D
$$
cioè
$$
c(n)=(n^2+3n)A+nM+\left(\frac{n^2}{2}+\frac{n}{2}\right)D
$$
approssimando per $n$ grande, guardiamo solo i termini di grado più alto
$$
c(n)\approx n^2A+\frac{n^2}{2}D
$$

##### Aggiunta di un nodo
##### Formula dei trapezi
Data una funzione integrabile $f:[a,b]\to\mathbb{R}$, si vuole calcolare un’approssimazione di

$$
\int_a^b f(x)\,dx
$$

ricordiamo che l’integrale rappresenta l’area sottesa dal grafico della funzione, più precisamente l’area con segno: se la funzione è sopra l’asse $x$ l’area contribuisce positivamente, se è sotto contribuisce negativamente.

A tal fine si suddivide l’intervallo $[a,b]$ in $n\geq 1$ sottointervalli tutti della stessa ampiezza

$$
h=\frac{b-a}{n}
$$

dove $h$ si chiama passo di discretizzazione.

Il valore che si prende come approssimazione del nostro integrale

$$
\int_a^b f(x)\,dx
$$

è

$$
\int_a^b s(x)\,dx
$$

La funzione
$$
s:[a,b]\to\mathbb{R}
$$
è definita a tratti: per $x\in[x_j,x_{j+1}]$ si prende la retta che passa per i punti

$$
(x_j,f(x_j)),\qquad (x_{j+1},f(x_{j+1}))
$$
quindi, per $x\in[x_j,x_{j+1}]$, abbiamo

$$
s(x)=f(x_j)+\frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}(x-x_j)
$$

questa regola vale per ogni indice

$$
j=0,\ldots,n-1
$$
corrisponde alla formula dei trapezi
$$
I_n=
h\left[
\frac{f(a)+f(b)}{2}
+
\sum_{j=1}^{n-1}f(x_j)
\right]
$$
##### Estrapolazione

##### Traccia, determinante, raggio spettrale e autovalori

##### Matrici diagonalizzabili

##### Matrici hermitiane e simmetriche e definite positive

##### Polinomi di matrici
##### Matrici irriducibili
##### Localizzazione degli autovalori
##### Matrice a diagonale dominante
##### Norme Vettoriali
##### Successioni di vettori
##### Raggio spettrale
##### Norme matriciali
##### Norme matriciali indotte
##### Successioni di matrici
##### Metodi iterativi per risoluzione di sistemi lineari

##### Metodo consistente
##### Metodo convergente
##### Velocità di convergenza
##### Criterio del resto del residuo
##### Procedura di costruzione di metodi iterativi mediante decomposizione della matrice
##### Metodo di Jacobi
##### Metodo di Gauss-Seidel
