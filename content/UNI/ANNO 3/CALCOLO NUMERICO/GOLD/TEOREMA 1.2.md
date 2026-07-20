# Teorema 1.2 — Errore o resto dell’interpolazione polinomiale

## Contesto

Siamo nel problema dell’**interpolazione polinomiale**. Data una funzione

[  
f:[a,b]\to\mathbb{R}  
]

e dati (n+1) nodi distinti

[  
x_0,x_1,\dots,x_n\in[a,b],  
]

consideriamo il polinomio d’interpolazione (p(x)\in\mathbb{R}_n[x]), cioè l’unico polinomio di grado minore o uguale a (n) tale che

[  
p(x_i)=f(x_i),\qquad i=0,\dots,n.  
]

Il Teorema 1.2 serve a stimare, o meglio a rappresentare in forma precisa, l’errore che si commette quando si approssima (f(x)) con (p(x)). L’errore è

[  
f(x)-p(x).  
]

Il teorema dimostra che tale errore dipende da due elementi:

[  
f^{(n+1)}(\xi)  
]

per un opportuno punto (\xi\in(a,b)), e il prodotto

[  
(x-x_0)(x-x_1)\cdots(x-x_n).  
]

Nelle dispense questo risultato è indicato come formula dell’errore o resto dell’interpolazione polinomiale.

---

## Richiami preliminari

### 1. Che cosa significa (f\in C^{n+1}([a,b]))

Dire che

[  
f\in C^{n+1}([a,b])  
]

significa che (f) ammette derivate continue fino all’ordine (n+1). Quindi esistono e sono continue le funzioni

[  
f,\ f',\ f'',\dots,\ f^{(n)},\ f^{(n+1)}.  
]

Questa ipotesi è necessaria perché nella formula finale compare proprio la derivata ((n+1))-esima di (f), cioè

[  
f^{(n+1)}(\xi),  
]

e perché nella dimostrazione applicheremo ripetutamente il teorema di Rolle fino ad arrivare alla derivata di ordine (n+1).

---

### 2. Che cos’è (p(x))

Il polinomio (p(x)) è il polinomio d’interpolazione di (f) sui nodi

[  
x_0,x_1,\dots,x_n.  
]

Per il Teorema 1.1, poiché i nodi sono distinti, esiste ed è unico

[  
p\in\mathbb{R}_n[x]  
]

tale che

[  
p(x_i)=f(x_i),\qquad i=0,\dots,n.  
]

Quindi (p) coincide con (f) nei nodi, ma in generale non coincide con (f) in tutti i punti dell’intervallo.

---

### 3. Teorema di Rolle

Useremo il teorema di Rolle nella seguente forma.

Se (g:[\alpha,\beta]\to\mathbb{R}) è continua su ([\alpha,\beta]), derivabile su ((\alpha,\beta)), e

[  
g(\alpha)=g(\beta),  
]

allora esiste almeno un punto

[  
c\in(\alpha,\beta)  
]

tale che

[  
g'(c)=0.  
]

In particolare, se una funzione ha due zeri distinti, allora la sua derivata si annulla almeno una volta tra questi due zeri.

Questo fatto verrà usato ripetutamente: se (z) ha almeno (n+2) zeri distinti, allora (z') ha almeno (n+1) zeri, (z'') ha almeno (n) zeri, e così via, fino a concludere che (z^{(n+1)}) ha almeno uno zero.

---

# Enunciato

Sia

[  
f:[a,b]\to\mathbb{R}  
]

una funzione di classe

[  
C^{n+1}([a,b]).  
]

Sia (p(x)) il polinomio d’interpolazione di (f(x)) sugli (n+1) nodi distinti

[  
x_0,x_1,\dots,x_n\in[a,b].  
]

Allora, per ogni

[  
x\in[a,b],  
]

esiste un punto

[  
\xi=\xi(x)\in(a,b)  
]

tale che

# [  
f(x)-p(x)

\frac{f^{(n+1)}(\xi)}{(n+1)!}  
(x-x_0)(x-x_1)\cdots(x-x_n).  
]

---

# Dimostrazione commentata

Fissiamo un punto

[  
x\in[a,b].  
]

Vogliamo dimostrare che in questo punto vale la formula

# [  
f(x)-p(x)

\frac{f^{(n+1)}(\xi)}{(n+1)!}  
(x-x_0)(x-x_1)\cdots(x-x_n)  
]

per un opportuno (\xi\in(a,b)).

La dimostrazione si divide in due casi.

---

## Caso 1: (x) coincide con uno dei nodi

Supponiamo che

[  
x=x_i  
]

per qualche (i\in{0,\dots,n}).

Poiché (p) è il polinomio d’interpolazione di (f), sappiamo che

[  
p(x_i)=f(x_i).  
]

Quindi

# [  
f(x)-p(x)

# f(x_i)-p(x_i)

]

D’altra parte, anche il prodotto

[  
(x-x_0)(x-x_1)\cdots(x-x_n)  
]

è nullo, perché tra i fattori compare

[  
x-x_i=0.  
]

Quindi anche il secondo membro della formula è nullo:

# [  
\frac{f^{(n+1)}(\xi)}{(n+1)!}  
(x-x_0)\cdots(x-x_i)\cdots(x-x_n)

]

Dunque la formula è verificata immediatamente, con un qualsiasi

[  
\xi\in(a,b).  
]

---

## Caso 2: (x) non coincide con nessuno dei nodi

Supponiamo ora che

[  
x\neq x_i  
\qquad  
\text{per ogni } i=0,\dots,n.  
]

Allora

[  
(x-x_0)(x-x_1)\cdots(x-x_n)\neq 0,  
]

perché nessuno dei fattori è nullo. Questo sarà importante perché tra poco divideremo per questa quantità.

---

## Definizione delle funzioni ausiliarie

Introduciamo una variabile ausiliaria (y\in[a,b]). Il punto (x) rimane fissato; (y), invece, è la variabile rispetto alla quale definiamo alcune funzioni.

Per ogni

[  
y\in[a,b],  
]

definiamo

[  
\pi(y)=(y-x_0)(y-x_1)\cdots(y-x_n),  
]

e

[  
r(y)=f(y)-p(y).  
]

Qui (r(y)) rappresenta l’errore di interpolazione nel generico punto (y).

Ora definiamo la funzione ausiliaria

[  
z:[a,b]\to\mathbb{R}  
]

mediante

[  
z(y)=r(y)-\frac{r(x)}{\pi(x)}\pi(y).  
]

Osserviamo bene il ruolo delle variabili: (x) è fissato, quindi

[  
\frac{r(x)}{\pi(x)}  
]

è una costante rispetto alla variabile (y). Inoltre (\pi(x)\neq 0), perché stiamo considerando il caso in cui (x) non coincide con nessuno dei nodi.

La funzione (z) è costruita apposta per annullarsi sia nei nodi (x_0,\dots,x_n), sia nel punto fissato (x).

---

## Regolarità di (z)

Vogliamo capire a quale classe appartiene (z).

Per ipotesi,

[  
f\in C^{n+1}([a,b]).  
]

Inoltre (p) è un polinomio, quindi è di classe (C^\infty), e in particolare

[  
p\in C^{n+1}([a,b]).  
]

Di conseguenza

[  
r(y)=f(y)-p(y)  
]

è di classe

[  
C^{n+1}([a,b]),  
]

perché è differenza di due funzioni di classe (C^{n+1}).

Anche

[  
\pi(y)=(y-x_0)(y-x_1)\cdots(y-x_n)  
]

è un polinomio, quindi

[  
\pi\in C^\infty([a,b]),  
]

e in particolare

[  
\pi\in C^{n+1}([a,b]).  
]

Infine,

[  
\frac{r(x)}{\pi(x)}  
]

è una costante rispetto a (y). Quindi

[  
\frac{r(x)}{\pi(x)}\pi(y)  
]

è ancora una funzione di classe (C^{n+1}([a,b])).

Pertanto

[  
z(y)=r(y)-\frac{r(x)}{\pi(x)}\pi(y)  
]

è di classe

[  
C^{n+1}([a,b]).  
]

Questa regolarità è fondamentale perché ci permetterà di applicare ripetutamente il teorema di Rolle fino alla derivata di ordine (n+1).

---

## Zeri della funzione (z)

Mostriamo ora che (z) si annulla in almeno (n+2) punti distinti.

### Primo tipo di zeri: i nodi (x_0,\dots,x_n)

Consideriamo un nodo (x_i). Calcoliamo (z(x_i)).

Per definizione,

[  
z(x_i)=r(x_i)-\frac{r(x)}{\pi(x)}\pi(x_i).  
]

Ora,

[  
r(x_i)=f(x_i)-p(x_i).  
]

Poiché (p) interpola (f) nei nodi,

[  
p(x_i)=f(x_i),  
]

quindi

[  
r(x_i)=0.  
]

Inoltre

[  
\pi(x_i)=(x_i-x_0)(x_i-x_1)\cdots(x_i-x_n).  
]

Questo prodotto è nullo perché tra i fattori compare

[  
x_i-x_i=0.  
]

Quindi

[  
\pi(x_i)=0.  
]

Pertanto

# [  
z(x_i)

# 0-\frac{r(x)}{\pi(x)}\cdot 0

]

Dunque (z) si annulla in tutti i nodi:

[  
z(x_i)=0,  
\qquad i=0,\dots,n.  
]

Abbiamo già (n+1) zeri.

---

### Secondo tipo di zero: il punto fissato (x)

Ora calcoliamo (z(x)). Per definizione,

[  
z(x)=r(x)-\frac{r(x)}{\pi(x)}\pi(x).  
]

Poiché (\pi(x)\neq 0), possiamo semplificare:

[  
\frac{r(x)}{\pi(x)}\pi(x)=r(x).  
]

Quindi

[  
z(x)=r(x)-r(x)=0.  
]

Pertanto (z) si annulla anche nel punto fissato (x).

Poiché in questo secondo caso abbiamo assunto che (x\neq x_i) per ogni (i), il punto (x) è distinto da tutti i nodi (x_0,\dots,x_n).

Quindi (z) ha almeno

[  
n+2  
]

zeri distinti in ([a,b]):

[  
x_0,x_1,\dots,x_n,x.  
]

---

## Applicazione ripetuta del teorema di Rolle

Poiché (z\in C^{n+1}([a,b])), possiamo applicare il teorema di Rolle ripetutamente.

La funzione (z) ha almeno (n+2) zeri distinti. Ordinandoli sull’intervallo ([a,b]), tra ogni coppia di zeri consecutivi il teorema di Rolle garantisce l’esistenza di almeno uno zero di (z'). Quindi

[  
z'  
]

ha almeno (n+1) zeri in ((a,b)).

Ora applichiamo lo stesso ragionamento a (z'). Poiché (z') ha almeno (n+1) zeri, allora (z'') ha almeno (n) zeri.

Continuando:

[  
z \text{ ha almeno } n+2 \text{ zeri},  
]

[  
z' \text{ ha almeno } n+1 \text{ zeri},  
]

[  
z'' \text{ ha almeno } n \text{ zeri},  
]

[  
z^{(3)} \text{ ha almeno } n-1 \text{ zeri},  
]

e così via, fino ad arrivare a

[  
z^{(n+1)} \text{ ha almeno } 1 \text{ zero}.  
]

Dunque esiste un punto

[  
\xi\in(a,b)  
]

tale che

[  
z^{(n+1)}(\xi)=0.  
]

Questo è il punto (\xi) che comparirà nella formula finale dell’errore.

---

## Calcolo di (z^{(n+1)})

Ricordiamo che

[  
z(y)=r(y)-\frac{r(x)}{\pi(x)}\pi(y).  
]

Derivando (n+1) volte rispetto alla variabile (y), otteniamo

# [  
z^{(n+1)}(y)

## r^{(n+1)}(y)

\frac{r(x)}{\pi(x)}\pi^{(n+1)}(y).  
]

La quantità

[  
\frac{r(x)}{\pi(x)}  
]

rimane invariata perché è una costante rispetto alla variabile (y).

Ora analizziamo separatamente i due termini.

---

### Calcolo di (r^{(n+1)}(y))

Per definizione,

[  
r(y)=f(y)-p(y).  
]

Quindi

# [  
r^{(n+1)}(y)

f^{(n+1)}(y)-p^{(n+1)}(y).  
]

Ma

[  
p\in\mathbb{R}_n[x],  
]

quindi (p) ha grado minore o uguale a (n). Pertanto

[  
p^{(n+1)}(y)=0,  
]

perché derivando (n+1) volte un polinomio di grado al massimo (n) si ottiene il polinomio nullo.

Di conseguenza

[  
r^{(n+1)}(y)=f^{(n+1)}(y).  
]

---

### Calcolo di (\pi^{(n+1)}(y))

Ora guardiamo

[  
\pi(y)=(y-x_0)(y-x_1)\cdots(y-x_n).  
]

Questa è il prodotto di (n+1) fattori lineari nella variabile (y). Ogni fattore ha la forma

[  
y-x_i,  
]

quindi ha grado (1) e coefficiente principale uguale a (1).

Moltiplicando (n+1) fattori di grado (1), otteniamo un polinomio di grado (n+1). Inoltre, il termine di grado massimo si ottiene moltiplicando tra loro i termini principali dei fattori:

[  
y\cdot y\cdots y=y^{n+1}.  
]

Poiché il coefficiente di (y^{n+1}) è (1), il polinomio (\pi(y)) è monico. Quindi possiamo scrivere

# [  
\pi(y)

y^{n+1}+c_ny^n+c_{n-1}y^{n-1}+\dots+c_1y+c_0  
]

per opportuni coefficienti reali

[  
c_0,c_1,\dots,c_n.  
]

Ora deriviamo (\pi) (n+1) volte.

Il termine principale dà

[  
\frac{d^{n+1}}{dy^{n+1}}y^{n+1}=(n+1)!.  
]

Infatti, derivando successivamente,

[  
\frac{d}{dy}y^{n+1}=(n+1)y^n,  
]

[  
\frac{d^2}{dy^2}y^{n+1}=(n+1)n y^{n-1},  
]

e continuando fino alla derivata ((n+1))-esima si ottiene

[  
(n+1)n(n-1)\cdots 2\cdot 1=(n+1)!.  
]

Invece tutti gli altri termini

[  
c_ky^k,\qquad k\leq n,  
]

si annullano dopo (n+1) derivate, perché hanno grado minore o uguale a (n).

Dunque

[  
\pi^{(n+1)}(y)=(n+1)!.  
]

---

## Uso del punto (\xi)

Abbiamo dimostrato che esiste

[  
\xi\in(a,b)  
]

tale che

[  
z^{(n+1)}(\xi)=0.  
]

Usando il calcolo precedente,

# [  
z^{(n+1)}(y)

## r^{(n+1)}(y)

\frac{r(x)}{\pi(x)}\pi^{(n+1)}(y),  
]

valutiamo in (y=\xi):

# [  
0

# z^{(n+1)}(\xi)

## r^{(n+1)}(\xi)

\frac{r(x)}{\pi(x)}\pi^{(n+1)}(\xi).  
]

Ora sostituiamo

[  
r^{(n+1)}(\xi)=f^{(n+1)}(\xi)  
]

e

[  
\pi^{(n+1)}(\xi)=(n+1)!.  
]

Otteniamo

# [  
0

## f^{(n+1)}(\xi)

\frac{r(x)}{\pi(x)}(n+1)!.  
]

Poiché

[  
r(x)=f(x)-p(x)  
]

e

[  
\pi(x)=(x-x_0)(x-x_1)\cdots(x-x_n),  
]

si ha

# [  
0

## f^{(n+1)}(\xi)

\frac{f(x)-p(x)}  
{(x-x_0)(x-x_1)\cdots(x-x_n)}  
(n+1)!.  
]

Portiamo il secondo termine dall’altra parte:

# [  
\frac{f(x)-p(x)}  
{(x-x_0)(x-x_1)\cdots(x-x_n)}  
(n+1)!

f^{(n+1)}(\xi).  
]

Dividiamo per ((n+1)!):

# [  
\frac{f(x)-p(x)}  
{(x-x_0)(x-x_1)\cdots(x-x_n)}

\frac{f^{(n+1)}(\xi)}{(n+1)!}.  
]

Infine moltiplichiamo entrambi i membri per

[  
(x-x_0)(x-x_1)\cdots(x-x_n),  
]

ottenendo

# [  
f(x)-p(x)

\frac{f^{(n+1)}(\xi)}{(n+1)!}  
(x-x_0)(x-x_1)\cdots(x-x_n).  
]

Questa è esattamente la formula dell’errore dell’interpolazione polinomiale.

---

# Conclusione

Abbiamo quindi dimostrato che, se

[  
f\in C^{n+1}([a,b])  
]

e (p\in\mathbb{R}_n[x]) è il polinomio d’interpolazione di (f) nei nodi distinti

[  
x_0,\dots,x_n,  
]

allora per ogni

[  
x\in[a,b]  
]

esiste un punto

[  
\xi=\xi(x)\in(a,b)  
]

tale che

# [  
f(x)-p(x)

\frac{f^{(n+1)}(\xi)}{(n+1)!}  
(x-x_0)(x-x_1)\cdots(x-x_n).  
]

Il punto (\xi) dipende in generale da (x), ma non viene determinato esplicitamente. Il teorema è comunque fondamentale perché permette di stimare l’errore tramite una stima della derivata

[  
f^{(n+1)}  
]

e del prodotto

[  
(x-x_0)(x-x_1)\cdots(x-x_n).  
]

La strategia della dimostrazione è stata costruire una funzione ausiliaria (z) con molti zeri, applicare ripetutamente Rolle e ricavare la formula finale da

[  
z^{(n+1)}(\xi)=0.  
]
