##### Problema dietro il Polinomio di interpolazione $p(x)$

##### Polinomio di interpolazione $p(x)$

##### Polinomio in forma canonica

##### $Rn[x]$

##### Polinomio in forma di Lagrange

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
