#### Aggiunta di un nodo di interpolazione

la forma di Newton è conveniente quando ai dati di interpolazione

$$
(x_0,y_0),\ldots,(x_n,y_n)
$$

viene aggiunto un nuovo dato

$$
(x_{n+1},y_{n+1})
$$

con

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

attenzione: il coefficiente nuovo non è $f[x_0,x_{n+1}]$, ma è

$$
f[x_0,\ldots,x_{n+1}]
$$

perché è la differenza divisa costruita usando tutti i nodi da $x_0$ fino al nuovo nodo $x_{n+1}$.

osservazioni relative a ciò

osservazioni

prendendo il caso $n=2$, abbiamo i dati iniziali

$$
(x_0,y_0),(x_1,y_1),(x_2,y_2)
$$

e aggiungiamo

$$
(x_3,y_3)
$$

la tabella delle differenze divise, prima dell’aggiunta del nodo, contiene i coefficienti di Newton di $p(x)$:

$$
\begin{array}{c|cccc}
x_0 & f[x_0] \\
x_1 & f[x_1] & f[x_0,x_1] \\
x_2 & f[x_2] & f[x_0,x_2] & f[x_0,x_1,x_2]
\end{array}
$$

quindi il polinomio iniziale è

$$
p(x)=f[x_0]+f[x_0,x_1](x-x_0)+f[x_0,x_1,x_2](x-x_0)(x-x_1)
$$

aggiungendo il nodo $x_3$, dobbiamo aggiungere una nuova riga alla tabella

$$
\begin{array}{c|cccc}
x_0 & f[x_0] \\
x_1 & f[x_1] & f[x_0,x_1] \\
x_2 & f[x_2] & f[x_0,x_2] & f[x_0,x_1,x_2] \\
x_3 & f[x_3] & f[x_0,x_3] & f[x_0,x_1,x_3] & f[x_0,x_1,x_2,x_3]
\end{array}
$$

il nuovo coefficiente che serve per passare da $p(x)$ a $q(x)$ è

$$
f[x_0,x_1,x_2,x_3]
$$

e quindi

$$
q(x)=p(x)+f[x_0,x_1,x_2,x_3](x-x_0)(x-x_1)(x-x_2)
$$

1. avendo a disposizione $p(x)$ in forma di Newton, sono già note le differenze divise, cioè i coefficienti di Newton

$$
f[x_0],f[x_0,x_1],\ldots,f[x_0,\ldots,x_n]
$$

quindi basta calcolare il nuovo coefficiente

$$
f[x_0,\ldots,x_{n+1}]
$$

per ottenere la forma di Newton di $q(x)$.

questo calcolo sfrutta gli elementi già noti

$$
f[x_0],f[x_0,x_1],\ldots,f[x_0,\ldots,x_n]
$$

più il valore aggiunto

$$
f[x_{n+1}]=y_{n+1}
$$

il costo per calcolare il nuovo coefficiente $f[x_0,\ldots,x_{n+1}]$ è

$$
2(n+1)A+(n+1)D
$$

dove $A$ indica addizioni/sottrazioni e $D$ indica divisioni.

l’idea è che bisogna calcolare solo l’ultima riga della tabella delle differenze divise, non rifare tutta la tabella da capo.

2. avendo a disposizione $p(x)$ in forma di Newton e anche il suo valore $p(t)$ in un dato punto $t$, per calcolare $q(t)$ usiamo

$$
q(t)=p(t)+f[x_0,\ldots,x_{n+1}](t-x_0)\cdots(t-x_n)
$$

quindi dobbiamo calcolare il nuovo coefficiente

$$
f[x_0,\ldots,x_{n+1}]
$$

e poi il termine aggiuntivo

$$
f[x_0,\ldots,x_{n+1}](t-x_0)\cdots(t-x_n)
$$

il costo totale è

$$
(3n+4)A+(n+1)M+(n+1)D
$$

infatti:
- per calcolare $f[x_0,\ldots,x_{n+1}]$ servono

$$
2(n+1)A+(n+1)D
$$

- per calcolare il prodotto

$$
f[x_0,\ldots,x_{n+1}](t-x_0)\cdots(t-x_n)
$$

servono

$$
(n+1)A+(n+1)M
$$

- per sommare il risultato a $p(t)$ serve ancora

$$
1A
$$

quindi in totale

$$
2(n+1)A+(n+1)D+(n+1)A+(n+1)M+1A
$$

cioè

$$
(3n+4)A+(n+1)M+(n+1)D
$$

aggiungere un nodo potrebbe migliorare l’approssimazione, ma non è garantito che la migliori sempre.

infatti, intuitivamente, aggiungere un nodo dà più informazioni sulla funzione, però il polinomio interpolante cambia globalmente e in certi punti può anche peggiorare l’approssimazione.