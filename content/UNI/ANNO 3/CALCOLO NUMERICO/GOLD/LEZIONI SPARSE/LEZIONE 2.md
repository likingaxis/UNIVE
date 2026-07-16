## Errore o resto dell'interpolazione polinomiale

Quanto sbagliamo nell'approssimazione.

#### Teorema 1.2

sia $f:[a,b]\to\mathbb{R}$ una funzione di classe $C^{n+1}[a,b]$

- cosa vuol dire classe $C^{n+1}[a,b]$?
	- vuol dire che $f$ è derivabile fino alla derivata $(n+1)$-esima
	- inoltre $f$, $f'$, $f''$, ..., $f^{(n+1)}$ sono continue su $[a,b]$
	- quindi $f$ è abbastanza regolare da poter fare il ragionamento con le derivate fino all’ordine $n+1$

e sia $p(x)$ il polinomio di interpolazione di $f(x)$ sugli $n+1$ nodi distinti

$$
x_0,\ldots,x_n\in [a,b]
$$

cosa è l'oggetto $p(x)$?

- $p(x)$ è l'unico polinomio che appartiene a $\mathbb{R}_n[x]$ tale che per ogni $i=0,\ldots,n$

$$
p(x_i)=f(x_i)
$$

allora per ogni $x\in [a,b]$ esiste un punto $\xi=\xi(x)\in(a,b)$ tale che

$$
f(x)-p(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)(x-x_1)\cdots(x-x_n)
$$

questa formula ci dice l'errore che commettiamo approssimando $f(x)$ con il polinomio interpolante $p(x)$.

Il termine

$$
f(x)-p(x)
$$

è l'errore di interpolazione nel punto $x$.

Dimostriamo questo.

Mi fisso un punto $x\in [a,b]$.

Il primo caso è: $x$ coincide con uno dei nodi $x_0,\ldots,x_n$.

In questo caso la formula vale automaticamente, perché se $x=x_i$ allora

$$
f(x_i)-p(x_i)=0
$$

dato che $p(x_i)=f(x_i)$.

Anche il membro di destra è nullo, perché nel prodotto

$$
(x-x_0)(x-x_1)\cdots(x-x_n)
$$

compare il fattore

$$
x_i-x_i=0
$$

quindi viene $0=0$.

In questo caso qualunque $\xi\in(a,b)$ va bene, perché entrambi i membri sono nulli.

Il secondo caso è: $x$ non coincide con nessuno dei nodi $x_0,\ldots,x_n$.

Definiamo delle funzioni ausiliarie.

Definiamo

$$
\pi(y)=(y-x_0)(y-x_1)\cdots(y-x_n)
$$

questa funzione è un polinomio di grado $n+1$.

Definiamo poi

$$
r(y)=f(y)-p(y)
$$

$r(y)$ è detta funzione di resto, perché misura la differenza tra la funzione $f(y)$ e il polinomio interpolante $p(y)$.
Ora definiamo una funzione
$$
z:[a,b]\to\mathbb{R}
$$
data da
$$
z(y)=r(y)-\frac{r(x)}{\pi(x)}\pi(y)
$$
non usiamo $x$ come variabile perché $x$ è il punto fissato all’inizio. Quindi usiamo $y$ come variabile libera.
La parte
$$
\frac{r(x)}{\pi(x)}
$$

è una costante, perché $x$ è fissato.
Inoltre $\pi(x)\neq 0$, perché in questo secondo caso $x$ non coincide con nessuno dei nodi. Quindi nessuno dei fattori

$$
(x-x_0),\ldots,(x-x_n)
$$

è nullo.

A che classe appartiene la funzione $z$?

Un polinomio come $p(y)$ è di classe $C^\infty$, cioè è derivabile infinite volte.

Se lo deriviamo più di $n$ volte, cioè $n+1$ volte, otteniamo $0$, perché $p(y)$ ha grado minore o uguale a $n$.

Anche $\pi(y)$ è un polinomio, quindi è di classe $C^\infty$.

Invece $f(y)$ è di classe $C^{n+1}[a,b]$ per ipotesi, quindi anche

$$
r(y)=f(y)-p(y)
$$

è di classe $C^{n+1}[a,b]$.

Di conseguenza anche

$$
z(y)=r(y)-\frac{r(x)}{\pi(x)}\pi(y)
$$

è di classe $C^{n+1}[a,b]$, perché è differenza tra una funzione di classe $C^{n+1}$ e un polinomio.

Inoltre $z(y)$ si annulla in almeno $n+2$ punti di $[a,b]$.

Infatti si annulla nei nodi $x_0,x_1,\ldots,x_n$ e anche nel punto $x$ che abbiamo fissato.

Vediamo perché si annulla nei nodi.

Se prendiamo un nodo $x_i$, allora

$$
z(x_i)=r(x_i)-\frac{r(x)}{\pi(x)}\pi(x_i)
$$

ma

$$
r(x_i)=f(x_i)-p(x_i)=0
$$

perché $p$ interpola $f$ nei nodi, e inoltre

$$
\pi(x_i)=0
$$

perché nel prodotto compare il fattore $x_i-x_i$.

Quindi

$$
z(x_i)=0
$$

Vediamo perché si annulla anche nel punto $x$.

$$
z(x)=r(x)-\frac{r(x)}{\pi(x)}\pi(x)
$$

quindi

$$
z(x)=r(x)-r(x)=0
$$

Il caso 1 ci serve proprio per escludere il caso in cui il punto fissato $x$ coincida con un nodo. Infatti, se $x$ fosse un nodo, avremmo $\pi(x)=0$ e quindi la frazione

$$
\frac{r(x)}{\pi(x)}
$$

non sarebbe definita.

A CASA AGGIUNGI UNA FOTO DEL GRAFICO DI $z$ nel caso $n=3$.
![[Pasted image 20260712155016.png]]


Adesso usiamo il teorema di Rolle.

Se una funzione si annulla in due punti consecutivi, allora in mezzo a questi due punti esiste almeno un punto in cui la derivata prima si annulla.

Quindi, se $z(y)$ si annulla in almeno $n+2$ punti, allora $z'(y)$ si annulla in almeno $n+1$ punti.

Poi, applicando di nuovo Rolle, $z''(y)$ si annulla in almeno $n$ punti.

Poi $z'''(y)$ si annulla in almeno $n-1$ punti.

Continuando così, la derivata $(n+1)$-esima

$$
z^{(n+1)}(y)
$$

si annulla in almeno un punto.

Questo punto lo chiamiamo

$$
\xi\in(a,b)
$$

quindi

$$
z^{(n+1)}(\xi)=0
$$

Questo punto $\xi$ farà al caso nostro.

Ora verifichiamo che questo punto $\xi$ fa valere la formula dell'errore.

Dobbiamo calcolare la derivata $(n+1)$-esima di $z(y)$.

Ricordiamo che

$$
z(y)=r(y)-\frac{r(x)}{\pi(x)}\pi(y)
$$

quindi

$$
z^{(n+1)}(y)=r^{(n+1)}(y)-\frac{r(x)}{\pi(x)}\pi^{(n+1)}(y)
$$

la quantità

$$
\frac{r(x)}{\pi(x)}
$$

rimane così perché è una costante rispetto alla variabile $y$.

Ora calcoliamo i pezzi.

Siccome

$$
r(y)=f(y)-p(y)
$$

allora

$$
r^{(n+1)}(y)=f^{(n+1)}(y)-p^{(n+1)}(y)
$$

ma

$$
p^{(n+1)}(y)=0
$$

perché $p(y)$ ha grado minore o uguale a $n$, quindi derivandolo $n+1$ volte si annulla.

Quindi

$$
r^{(n+1)}(y)=f^{(n+1)}(y)
$$

Ora guardiamo $\pi(y)$.

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

facendo la derivata $(n+1)$-esima, tutti i termini di grado minore spariscono e rimane

$$
\pi^{(n+1)}(y)=(n+1)!
$$

quindi

$$
z^{(n+1)}(y)=f^{(n+1)}(y)-\frac{r(x)}{\pi(x)}(n+1)!
$$

Ora valutiamo nel punto $\xi$, dove sappiamo che $z^{(n+1)}(\xi)=0$.

Quindi

$$
0=z^{(n+1)}(\xi)=f^{(n+1)}(\xi)-\frac{r(x)}{\pi(x)}(n+1)!
$$

da cui

$$
\frac{r(x)}{\pi(x)}(n+1)!=f^{(n+1)}(\xi)
$$

quindi

$$
r(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\pi(x)
$$

ma

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