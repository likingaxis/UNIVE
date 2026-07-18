#### Velocità di convergenza

Consideriamo il metodo $M$ per risolvere il sistema $S$ e supponiamo che sia convergente, cioè

$$
x=Px+q
$$

e

$$
\rho(P)<1
$$

Usando l’equazione dell’errore

$$
e^{(k)}=P^ke^{(0)}
$$

per ogni

$$
k=0,1,2,\ldots
$$

si può dimostrare questo fatto.

Fissiamo una qualsiasi norma vettoriale $\|\cdot\|$. Per quasi tutti i vettori iniziali

$$
x^{(0)}\in\mathbb{C}^n
$$

l’errore

$$
e^{(k)}=x^{(k)}-x
$$

commesso dal metodo $M$ al passo $k$ soddisfa una stima del tipo

$$
\|e^{(k)}\|\approx C k^m \rho(P)^k
$$

per $k$ abbastanza grande, anche se nella pratica questa stima descrive spesso bene il comportamento anche per valori piccoli di $k$.

Qui:

- $C$ è una costante indipendente da $k$
- $m$ è un numero intero compreso tra $0$ e $n-1$
- $m$ dipende solo dalla matrice $P$
- $m$ non è il metodo, è solo un esponente
- se $P$ è diagonalizzabile, allora

$$
m=0
$$

quindi in quel caso la stima diventa circa

$$
\|e^{(k)}\|\approx C\rho(P)^k
$$

La convergenza delle successioni

$$
x^{(0)},x^{(1)},x^{(2)},\ldots
$$

prodotte dal metodo $M$ è tanto più veloce quanto più $\rho(P)$ è piccolo.

Infatti $\rho(P)^k$ è il termine che domina la velocità con cui l’errore va a zero.

##### Definizione

Dati due metodi $\alpha$ e $\beta$ della forma

$$
x^{(k+1)}=Px^{(k)}+q
$$

per risolvere lo stesso sistema $S$, entrambi convergenti, diremo che $\alpha$ converge più velocemente di $\beta$ se

$$
\rho(P_\alpha)<\rho(P_\beta)
$$

dove $P_\alpha$ e $P_\beta$ sono le matrici di iterazione associate rispettivamente ai metodi $\alpha$ e $\beta$.

#### Criterio del resto del residuo

Consideriamo il metodo $M$ per risolvere il sistema $S$.

La successione

$$
x^{(0)},x^{(1)},x^{(2)},\ldots
$$

generata da $M$, anche quando risulta convergente, deve essere prima o poi arrestata.

Il criterio di arresto più usato è quello del residuo.

Si sceglie una norma vettoriale $\|\cdot\|$, tipicamente

$$
\|\cdot\|_1,\qquad \|\cdot\|_2,\qquad \|\cdot\|_\infty
$$

e si arresta la successione al primo vettore $x^{(K)}$ che soddisfa la condizione

$$
\frac{\|r^{(K)}\|}{\|b\|}\leq \varepsilon
$$

dove

$$
r^{(K)}=b-Ax^{(K)}
$$

è il residuo del sistema $S$ relativo al passo $K$, ed $\varepsilon>0$ è una soglia di precisione prefissata.

Ricordiamo che $b$ è il vettore dei termini noti del sistema lineare

$$
Ax=b
$$

La condizione del residuo impone che l’errore relativo

$$
\frac{\|Ax^{(K)}-b\|}{\|b\|}
$$

commesso approssimando $b$ con $Ax^{(K)}$ sia minore o uguale a $\varepsilon$.

Infatti

$$
r^{(K)}=b-Ax^{(K)}
$$

quindi

$$
\|r^{(K)}\|=\|b-Ax^{(K)}\|=\|Ax^{(K)}-b\|
$$

perché la norma non cambia se moltiplico per $-1$.

Perché si usa l’errore relativo e non quello assoluto?

La quantità

$$
\frac{\|Ax^{(K)}-b\|}{\|b\|}
$$

rappresenta l’errore relativo con cui $Ax^{(K)}$ approssima $b\neq 0$, così come

$$
\frac{|\tilde a-a|}{|a|}
$$

rappresenta l’errore relativo con cui $\tilde a$ approssima $a\neq 0$.

L’errore relativo tiene conto della grandezza del dato che stiamo approssimando.

Per esempio, se

$$
a=10000
$$

e

$$
\tilde a=9999
$$

allora l’errore assoluto è

$$
|\tilde a-a|=1
$$

ma l’errore relativo è

$$
\frac{|\tilde a-a|}{|a|}
=
\frac{1}{10000}
=
10^{-4}
$$

quindi è molto piccolo.

Invece lo stesso errore assoluto $1$ sarebbe enorme se il valore vero fosse vicino a $1$.

Vediamo ora che cosa possiamo dire sull’errore relativo sulla soluzione.

Vogliamo stimare

$$
\frac{\|x-x^{(K)}\|}{\|x\|}
$$

dove $x$ è la soluzione esatta del sistema.

Siccome

$$
Ax=b
$$

e

$$
r^{(K)}=b-Ax^{(K)}
$$

abbiamo

$$
r^{(K)}=Ax-Ax^{(K)}
$$

quindi

$$
r^{(K)}=A(x-x^{(K)})
$$

da cui, moltiplicando per $A^{-1}$,

$$
x-x^{(K)}=A^{-1}r^{(K)}
$$

Allora

$$
\frac{\|x-x^{(K)}\|}{\|x\|}
=
\frac{\|A^{-1}r^{(K)}\|}{\|x\|}$$
Usiamo la proprietà delle norme matriciali indotte:

$$
\|A^{-1}r^{(K)}\|\leq \|A^{-1}\|\|r^{(K)}\|
$$

quindi

$$
\frac{\|x-x^{(K)}\|}{\|x\|}
\leq
\frac{\|A^{-1}\|\|r^{(K)}\|}{\|x\|}
$$

Ora vogliamo far comparire $\|b\|$ al denominatore, perché il criterio di arresto usa

$$
\frac{\|r^{(K)}\|}{\|b\|}
$$

Ricordiamo che

$$
b=Ax
$$

quindi

$$
\|b\|=\|Ax\|
$$

Inoltre, sempre per la proprietà delle norme indotte,

$$
\|Ax\|\leq \|A\|\|x\|
$$

cioè

$$
\|b\|\leq \|A\|\|x\|
$$

da cui

$$
\frac{1}{\|x\|}
\leq
\frac{\|A\|}{\|b\|}
$$

Infatti, dalla disuguaglianza

$$
\|b\|\leq \|A\|\|x\|
$$

dividendo per $\|b\|\|x\|$ otteniamo

$$
\frac{1}{\|x\|}
\leq
\frac{\|A\|}{\|b\|}
$$

Quindi

$$
\frac{\|A^{-1}\|\|r^{(K)}\|}{\|x\|}
\leq
\|A^{-1}\|\|r^{(K)}\|\frac{\|A\|}{\|b\|}
$$

cioè

$$
\frac{\|x-x^{(K)}\|}{\|x\|}
\leq
\|A\|\|A^{-1}\|
\frac{\|r^{(K)}\|}{\|b\|}
$$

Definiamo

$$
\mu(A)=\|A\|\|A^{-1}\|
$$

Questo numero si chiama numero di condizionamento della matrice $A$ rispetto alla norma considerata.

Quindi otteniamo

$$
\frac{\|x-x^{(K)}\|}{\|x\|}
\leq
\mu(A)
\frac{\|r^{(K)}\|}{\|b\|}
$$

Se arrestiamo il metodo quando

$$
\frac{\|r^{(K)}\|}{\|b\|}\leq \varepsilon
$$

allora segue che

$$
\frac{\|x-x^{(K)}\|}{\|x\|}
\leq
\mu(A)\varepsilon
$$

Quindi il criterio del residuo controlla l’errore relativo sulla soluzione, ma con un fattore moltiplicativo dato dal numero di condizionamento $\mu(A)$.

Se $\mu(A)$ è piccolo, allora un residuo relativo piccolo implica anche un errore relativo piccolo sulla soluzione.

Se invece $\mu(A)$ è grande, un residuo relativo piccolo non garantisce necessariamente un errore relativo altrettanto piccolo sulla soluzione.

Quindi vogliamo che

$$
\mu(A)
$$

sia il più piccolo possibile.

Osservazione.

La successione di vettori

$$
x^{(0)},x^{(1)},x^{(2)},\ldots
$$

generata dal metodo, anche quando risulta convergente alla soluzione $x$ del sistema, potrebbe impiegare troppo tempo a convergere.

In tal caso potrebbero volerci troppe iterazioni prima che venga soddisfatta la condizione di arresto del residuo

$$
\frac{\|r^{(K)}\|}{\|b\|}\leq \varepsilon
$$

Per questo motivo, quando si implementa un metodo iterativo, è indispensabile fissare sempre un numero massimo di iterazioni consentite.

Questo serve anche ad arrestare le iterazioni quando non c’è convergenza.