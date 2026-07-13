### Polinomio di interpolazione con forma di Newton

abbiamo per ora visto la forma canonica e la forma di Lagrange

$p(x)$ è il polinomio d’interpolazione dei dati

$$
(x_0,y_0),(x_1,y_1),\ldots,(x_n,y_n)\in\mathbb{R}^2
$$

con $x_0,\ldots,x_n$ distinti

- forma canonica
	- $p(x)=a_0+a_1x+\cdots+a_nx^n$
	- poi matrice di Vandermonde ecc.
- forma di Lagrange
	- $p(x)=y_0L_0(x)+\cdots+y_nL_n(x)$
	- con $L_0(x),\ldots,L_n(x)$ che sono i polinomi di Lagrange relativi ai nodi $x_0,\ldots,x_n$

la differenza tra i due modi di scrivere $p(x)$ è la base che stiamo usando

nella forma canonica usiamo la base canonica

$$
1,x,x^2,\ldots,x^n
$$

e i coefficienti sono

$$
a_0,a_1,\ldots,a_n
$$

nella forma di Lagrange usiamo la base

$$
L_0(x),L_1(x),\ldots,L_n(x)
$$

e i coefficienti sono direttamente i valori

$$
y_0,y_1,\ldots,y_n
$$

Ora vediamo la forma di Newton del polinomio di interpolazione

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

#### ora definiamo il teorema di Newton

sia $f:[a,b]\to\mathbb{R}$ e siano

$$
x_0,x_1,\ldots,x_n\in[a,b]
$$

nodi distinti

allora il polinomio di interpolazione di $f(x)$ su questi nodi è dato da

$$
p(x)=f[x_0]+f[x_0,x_1](x-x_0)+f[x_0,x_1,x_2](x-x_0)(x-x_1)+\cdots+f[x_0,\ldots,x_n](x-x_0)\cdots(x-x_{n-1})
$$

questa si chiama forma di Newton del polinomio di interpolazione $p(x)$

i coefficienti sono le differenze divise

$$
f[x_0],\ f[x_0,x_1],\ f[x_0,x_1,x_2],\ldots,\ f[x_0,\ldots,x_n]
$$

mentre la base è fatta dai prodotti

$$
1,\quad (x-x_0),\quad (x-x_0)(x-x_1),\quad \ldots,\quad (x-x_0)\cdots(x-x_{n-1})
$$

quindi non sono “le differenze di $x$” i coefficienti: i coefficienti sono le differenze divise, mentre i fattori $(x-x_i)$ costruiscono la base di Newton

##### Dimostriamo un piccolo corollario

sia $f:[a,b]\to\mathbb{R}$ e siano $x_0,x_1,\ldots,x_n\in[a,b]$ distinti

allora $f[x_0,x_1,\ldots,x_n]$ non cambia se vengono permutati i suoi $n+1$ argomenti, cioè

$$
f[x_0,\ldots,x_n]=f[x_{\sigma(0)},\ldots,x_{\sigma(n)}]
$$

per ogni permutazione $\sigma$ di $\{0,\ldots,n\}$

una permutazione è un riordinamento degli indici

Dimostrazione

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

quindi

$$
p(x)=\text{polinomio d’interpolazione di } f(x) \text{ sui nodi } x_0,\ldots,x_n
$$

è uguale a

$$
p(x)=\text{polinomio d’interpolazione di } f(x) \text{ sui nodi } x_{\sigma(0)},\ldots,x_{\sigma(n)}
$$

nella forma di Newton il termine di grado massimo è quello finale

$$
f[x_0,\ldots,x_n](x-x_0)\cdots(x-x_{n-1})
$$

e il coefficiente davanti a $x^n$, cioè il coefficiente direttore, è proprio

$$
f[x_0,\ldots,x_n]
$$

infatti il prodotto

$$
(x-x_0)\cdots(x-x_{n-1})
$$

ha termine principale $x^n$

se scrivo lo stesso polinomio con i nodi permutati, il coefficiente direttore sarà

$$
f[x_{\sigma(0)},\ldots,x_{\sigma(n)}]
$$

ma il polinomio è lo stesso, quindi anche il coefficiente direttore deve essere lo stesso

perciò

$$
f[x_0,\ldots,x_n]=f[x_{\sigma(0)},\ldots,x_{\sigma(n)}]
$$

questo dimostra il corollario

N.B. possiamo usare la forma di Newton anche senza conoscere esplicitamente la funzione: se abbiamo solo i dati $(x_0,y_0),\ldots,(x_n,y_n)$, possiamo pensare che esista una qualsiasi funzione $f$ tale che $f(x_i)=y_i$ e calcolare le differenze divise a partire dai valori $y_i$

##### Algoritmo di valutazione del polinomio di interpolazione in un punto

sia $f:[a,b]\to\mathbb{R}$, siano

$$
x_0,\ldots,x_n\in[a,b]
$$

punti distinti e sia $t\in\mathbb{R}$

vogliamo costruire un algoritmo per calcolare $p(t)$, dove $p(x)$ è il polinomio di interpolazione di $f(x)$ sui nodi

$$
x_0,x_1,\ldots,x_n
$$

per chiarezza illustriamo l’algoritmo nel caso $n=3$

in base al teorema della forma di Newton abbiamo

$$
p(x)=f[x_0]+f[x_0,x_1](x-x_0)+f[x_0,x_1,x_2](x-x_0)(x-x_1)+f[x_0,x_1,x_2,x_3](x-x_0)(x-x_1)(x-x_2)
$$

la prima parte è indipendente dal punto $t$ in cui devo valutare $p(x)$

consiste nel calcolo delle differenze divise, con la tabella delle differenze divise

la seconda parte utilizza il metodo di Ruffini-Horner

calcoliamo $p(t)$ con questo metodo

per farlo raccogliamo i fattori $(t-x_0),(t-x_1),(t-x_2)$ così evitiamo di rifare molti prodotti separati

$$
p(t)=f[x_0]+(t-x_0)\left(f[x_0,x_1]+(t-x_1)\left(f[x_0,x_1,x_2]+(t-x_2)f[x_0,x_1,x_2,x_3]\right)\right)
$$

come calcoliamo questa cosa?

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

per calcolarla dobbiamo calcolare solo le differenze divise dopo la prima colonna, perché la prima colonna è nota

infatti la prima colonna contiene

$$
f[x_0],f[x_1],\ldots,f[x_n]
$$

cioè i valori della funzione nei nodi

il numero di elementi da calcolare è

$$
1+2+\cdots+n=\frac{n(n+1)}{2}
$$

questa è la parte triangolare della tabella delle differenze divise

perché diviso $2$?

perché la somma

$$
1+2+\cdots+n
$$

si calcola con la formula

$$
\frac{n(n+1)}{2}
$$

equivalentemente, è come prendere metà della parte rettangolare/triangolare: il numero di elementi cresce come un triangolo, non come un quadrato pieno

per ciascuna differenza divisa servono $2$ sottrazioni e $1$ divisione

infatti una differenza divisa ha forma

$$
\frac{\text{differenza divisa}-\text{differenza divisa}}{\text{nodo}-\text{nodo}}
$$

quindi ci sono:
- una sottrazione al numeratore
- una sottrazione al denominatore
- una divisione finale

le operazioni complessive della prima fase sono quindi

$$
2\cdot\frac{n(n+1)}{2}=n(n+1)
$$

sottrazioni, e

$$
\frac{n(n+1)}{2}
$$

divisioni

costo computazionale della seconda parte

abbiamo una addizione, una sottrazione e una moltiplicazione per tutti gli $h$ da calcolare dopo $h_n$

$h_n$ non va calcolato perché è già l’ultima differenza divisa

in totale dobbiamo calcolare

$$
h_{n-1},h_{n-2},\ldots,h_0
$$

quindi sono $n$ valori

per ciascuno abbiamo:
- $1$ sottrazione
- $1$ moltiplicazione
- $1$ addizione

quindi in totale:
- $n$ sottrazioni
- $n$ moltiplicazioni
- $n$ addizioni

quindi il costo complessivo fa notare che una addizione ha lo stesso costo di una sottrazione

infatti

$$
a-b=a+(-b)
$$

e il segno meno non costa nulla alla macchina

questo non vale invece per moltiplicazioni e divisioni, che vengono contate separatamente

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

il costo complessivo è

$$
c(n)=c_1(n)+c_2(n)
$$

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

###### Se valutiamo la cosa per $m$ punti $t$

la prima parte è indipendente dal punto $t$, quindi si ripete una sola volta

la seconda parte invece va ripetuta $m$ volte, una per ogni punto

quindi il costo di valutazione di $p(x)$ in $m$ punti è

$$
c_m(n)=c_1(n)+mc_2(n)
$$

cioè

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