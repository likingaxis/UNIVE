#### Metodi iterativi per risoluzione di sistemi lineari
È dato un sistema lineare
$$
Ax=b
$$
che chiamiamo $S$, con
$$
A\in\mathbb{C}^{n\times n},\qquad b\in\mathbb{C}^n
$$
e supponiamo che $A$ sia invertibile
Se $A$ è invertibile, allora il sistema $S$ ha un’unica soluzione, per il teorema di Rouché-Capelli, e tale soluzione è
$$
x=A^{-1}b
$$
Ci proponiamo di risolvere il sistema $S$ con un metodo iterativo, cioè un metodo che, a partire da un vettore iniziale
$$
x^{(0)}\in\mathbb{C}^n
$$
scelto dall’utente, costruisce una successione di vettori
$$
x^{(0)},x^{(1)},x^{(2)},\ldots
$$
Vogliamo che tale successione sia facile da costruire e converga alla soluzione esatta $x$ del sistema $S$, qualunque sia il vettore iniziale $x^{(0)}$ scelto
Per risolvere $S$ consideriamo solo metodi M iterativi stazionari, cioè metodi della forma
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

Osservazione
Sia
$$
x^{(0)},x^{(1)},x^{(2)},\ldots
$$
una successione generata dal metodo $M$ e supponiamo che

$$
x^{(k)}\to x^{(\infty)}
$$

per

$$
k\to+\infty
$$

allora necessariamente il limite deve soddisfare

$$
x^{(\infty)}=Px^{(\infty)}+q
$$

Infatti, dalla relazione del metodo,

$$
x^{(k+1)}=Px^{(k)}+q
$$

passando al limite per $k\to+\infty$ otteniamo

$$
\lim_{k\to+\infty}x^{(k+1)}
=
\lim_{k\to+\infty}(Px^{(k)}+q)
$$

siccome $x^{(k)}\to x^{(\infty)}$, anche

$$
x^{(k+1)}\to x^{(\infty)}
$$

e inoltre, essendo $P$ fissata,

$$
Px^{(k)}+q\to Px^{(\infty)}+q
$$

quindi

$$
x^{(\infty)}=Px^{(\infty)}+q
$$

Se vogliamo vedere il passaggio componente per componente, la prima componente di $Px^{(k)}+q$ è

$$
p_{11}x_1^{(k)}+p_{12}x_2^{(k)}+\cdots+p_{1n}x_n^{(k)}+q_1
$$

e passando al limite diventa

$$
p_{11}x_1^{(\infty)}+p_{12}x_2^{(\infty)}+\cdots+p_{1n}x_n^{(\infty)}+q_1
$$

cioè la prima componente di

$$
Px^{(\infty)}+q
$$

Lo stesso vale per tutte le componenti.

Dunque $x^{(\infty)}$ soddisfa l’equazione

$$
x^{(\infty)}=Px^{(\infty)}+q
$$

Conseguenza: se la soluzione $x$ del sistema $S$ non soddisfa l’equazione del metodo

$$
x=Px+q
$$

allora non c’è speranza che una successione generata dal metodo $M$ converga a $x$.

Infatti, se una successione generata da $M$ convergesse a $x$, allora il ragionamento precedente mostrerebbe che $x$ deve soddisfare necessariamente

$$
x=Px+q
$$

Questa proprietà si chiama consistenza.

##### Definizione di consistenza

Il metodo $M$ si dice consistente con il sistema $S$ se la soluzione $x$ di $S$ soddisfa l’equazione del metodo, cioè

$$
x=Px+q
$$

Quindi la consistenza significa che la soluzione esatta del sistema è un punto fisso del metodo iterativo.

##### Definizione di convergenza

Il metodo $M$ per risolvere il sistema $S$ si dice convergente se, per ogni scelta del vettore iniziale

$$
x^{(0)}\in\mathbb{C}^n
$$

la successione prodotta dal metodo

$$
x^{(0)},x^{(1)},x^{(2)},\ldots
$$

converge alla soluzione $x$ di $S$.

Cioè

$$
x^{(k)}\to x
$$

per ogni scelta di $x^{(0)}$.

##### Teorema 4.1, CNS, condizione necessaria e sufficiente di convergenza

Supponiamo che il metodo $M$ sia consistente con il sistema $S$.

Allora il metodo $M$ è convergente se e solo se

$$
\rho(P)<1
$$

dove $\rho(P)$ è il raggio spettrale della matrice di iterazione $P$.

Dimostriamo solo la direzione

$$
\rho(P)<1\Longrightarrow M \text{ convergente}
$$

Supponiamo che

$$
\rho(P)<1
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

per ogni

$$
k=0,1,2,\ldots
$$

chiamiamo questa equazione $(b)$.

Sottraendo membro a membro $(a)$ da $(b)$ otteniamo

$$
x^{(k+1)}-x=Px^{(k)}+q-(Px+q)
$$

quindi

$$
x^{(k+1)}-x=P(x^{(k)}-x)
$$

per ogni

$$
k=0,1,2,\ldots
$$

Definiamo l’errore al passo $k$ come

$$
e^{(k)}=x^{(k)}-x
$$

Allora l’equazione precedente diventa

$$
e^{(k+1)}=Pe^{(k)}
$$

per ogni

$$
k=0,1,2,\ldots
$$

questa è l’equazione dell’errore.

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

per ogni

$$
k=0,1,2,\ldots
$$

anche per $k=0$ la formula è vera, perché

$$
P^0=I
$$

e quindi

$$
P^0e^{(0)}=Ie^{(0)}=e^{(0)}
$$

Ora usiamo il teorema 3.12:

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

##### Corollario 4.1, CS, condizione sufficiente di convergenza

Supponiamo che il metodo $M$ sia consistente con il sistema $S$.

Se esiste una norma matriciale indotta $\|\cdot\|$ tale che

$$
\|P\|<1
$$

allora il metodo $M$ è convergente.

Dimostrazione.

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

##### Corollario 4.2, CN, condizioni necessarie di convergenza
Supponiamo che il metodo $M$ sia consistente con il sistema $S$
- se
$$
|\operatorname{traccia}(P)|\geq n
$$
allora il metodo $M$ non è convergente
- se
$$
|\det(P)|\geq 1
$$
allora il metodo $M$ non è convergente

Quindi possiamo vedere le condizioni anche come che il fatto che 
$$
|\operatorname{traccia}(P)|<n
$$
e
$$
|\det(P)|<1
$$
sono delle condizioni necessarie per la convergenza

Vuol dire che se il metodo converge, allora devono valere
Però il fatto che valgano non garantisce da solo che il metodo converga

##### Dimostrazione sulla traccia

Supponiamo che

$$
|\operatorname{traccia}(P)|\geq n
$$

Mostriamo che allora il metodo non può convergere.

Siano

$$
\lambda_1,\ldots,\lambda_n
$$

gli autovalori di $P$, contati con molteplicità algebrica.

Sappiamo che

$$
\operatorname{traccia}(P)=\lambda_1+\cdots+\lambda_n
$$

Supponiamo per assurdo che tutti gli autovalori abbiano modulo strettamente minore di $1$, cioè

$$
|\lambda_i|<1
$$

per ogni $i=1,\ldots,n$.

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

e quindi, per il teorema 4.1, il metodo $M$ non è convergente.

Dimostrazione della condizione sul determinante.

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
