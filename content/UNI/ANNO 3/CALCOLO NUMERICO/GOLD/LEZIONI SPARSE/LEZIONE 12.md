#### Norme matriciali

Si vuole introdurre un concetto di distanza sullo spazio delle matrici per misurare la vicinanza tra due matrici

$$
A,B\in\mathbb{C}^{n\times n}
$$

##### Definizione

Una funzione

$$
\|\cdot\|:\mathbb{C}^{n\times n}\to\mathbb{R}
$$

si dice norma matriciale se soddisfa le seguenti proprietà:

a) positività

$$
\|A\|\geq 0
\qquad \forall A\in\mathbb{C}^{n\times n}
$$

e

$$
\|A\|=0 \iff A=0
$$

b) omogeneità

$$
\|\alpha A\|=|\alpha|\|A\|
\qquad \forall \alpha\in\mathbb{C},\ \forall A\in\mathbb{C}^{n\times n}
$$

c) disuguaglianza triangolare

$$
\|A+B\|\leq \|A\|+\|B\|
\qquad \forall A,B\in\mathbb{C}^{n\times n}
$$

Data una norma matriciale

$$
\|\cdot\|:\mathbb{C}^{n\times n}\to\mathbb{R}
$$

definiamo la distanza tra due matrici $A,B\in\mathbb{C}^{n\times n}$ come

$$
\|A-B\|
$$

Un modo intuitivo per definire una norma matriciale su $\mathbb{C}^{n\times n}$ consiste nell’interpretare una matrice $A$ come un vettore di $n^2$ componenti e usare una norma vettoriale.

Per esempio, data

$$
A=(a_{ij})_{i,j=1}^n
$$

potremmo definire

$$
|A|_\infty=\max_{i,j=1,\ldots,n}|a_{ij}|
$$

Questa è analoga alla norma infinito per i vettori, perché prende il massimo tra i moduli di tutte le componenti della matrice.

Problema: questa norma con una sola stanghetta non si comporta bene rispetto al prodotto di matrici, cioè non è submoltiplicativa.

Infatti non è detto che valga

$$
|AB|_\infty\leq |A|_\infty |B|_\infty
$$

Esempio:

$$
A=
\begin{pmatrix}
1 & 1\\
0 & 1
\end{pmatrix},
\qquad
B=
\begin{pmatrix}
1 & 0\\
1 & 1
\end{pmatrix}
$$

allora

$$
AB=
\begin{pmatrix}
2 & 1\\
1 & 1
\end{pmatrix}
$$

e quindi

$$
|A|_\infty=1,
\qquad
|B|_\infty=1,
\qquad
|AB|_\infty=2
$$

quindi

$$
|AB|_\infty=2>1=|A|_\infty |B|_\infty
$$

Una norma matriciale soddisfa già positività, omogeneità e disuguaglianza triangolare, ma noi vogliamo spesso una proprietà in più, detta submoltiplicatività:

$$
\|AB\|\leq \|A\|\|B\|
$$

#### Norme matriciali indotte

Definizione.

Data una norma vettoriale

$$
\|\cdot\|:\mathbb{C}^n\to\mathbb{R}
$$

e una matrice

$$
A\in\mathbb{C}^{n\times n}
$$

definiamo la norma matriciale indotta da quella norma vettoriale come

$$
\|A\|=\max_{x\in\mathbb{C}^n,\ x\neq 0}\frac{\|Ax\|}{\|x\|}
$$

cioè guardiamo quanto la matrice $A$ può “amplificare” un vettore $x$.

Questa formula si può riscrivere usando solo vettori di norma $1$.

Infatti

$$
\frac{\|Ax\|}{\|x\|}
=
\left\|A\frac{x}{\|x\|}\right\|
$$

perché

$$
A\left(\frac{x}{\|x\|}\right)=\frac{1}{\|x\|}Ax
$$

e, per omogeneità della norma vettoriale,

$$
\left\|\frac{1}{\|x\|}Ax\right\|
=
\frac{1}{\|x\|}\|Ax\|
$$

Ora poniamo

$$
y=\frac{x}{\|x\|}
$$

allora

$$
\|y\|=\left\|\frac{x}{\|x\|}\right\|
=
\frac{1}{\|x\|}\|x\|=1
$$

quindi possiamo scrivere

$$
\|A\|=\max_{\|y\|=1}\|Ay\|
$$

Si può dimostrare che questa funzione

$$
\|\cdot\|:\mathbb{C}^{n\times n}\to\mathbb{R}
$$

è una norma matriciale.

Si chiama norma matriciale indotta dalla norma vettoriale di partenza.

OSS.

Una norma matriciale indotta si denota sempre con lo stesso simbolo della norma vettoriale da cui è stata indotta.

Per esempio, dalla norma vettoriale $\|\cdot\|_\infty$ nasce la norma matriciale indotta $\|\cdot\|_\infty$.

##### Teorema 3.9

Sia

$$
\|\cdot\|:\mathbb{C}^{n\times n}\to\mathbb{R}
$$

una norma matriciale indotta dalla norma vettoriale denotata con lo stesso simbolo.

Siano

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

###### Dimostrazione

Dimostriamo 1.

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

Dimostriamo 2.

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

Dimostriamo 3.

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

Dimostriamo 4.

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

Dimostriamo 5.

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

#### Norme matriciali indotte $1$, $2$, infinito

Le norme matriciali indotte più importanti sono:

$$
\|A\|_1=
\max_{x\neq 0}\frac{\|Ax\|_1}{\|x\|_1}
$$

$$
\|A\|_2=
\max_{x\neq 0}\frac{\|Ax\|_2}{\|x\|_2}
$$

$$
\|A\|_\infty=
\max_{x\neq 0}\frac{\|Ax\|_\infty}{\|x\|_\infty}
$$

##### Teorema 3.10

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

#### Equivalenza delle norme

##### Teorema 3.11

Tutte le norme matriciali, sia indotte sia non indotte, in $\mathbb{C}^{n\times n}$ sono equivalenti.

Questo significa che, se prendiamo due norme matriciali qualsiasi

$$
\|\cdot\|'
$$

e

$$
\|\cdot\|''
$$

da $\mathbb{C}^{n\times n}$ in $\mathbb{R}$, allora esistono due costanti positive

$$
\alpha,\beta>0
$$

indipendenti da $A$ tali che

$$
\alpha\|A\|''\leq \|A\|'\leq \beta\|A\|''
$$

per ogni

$$
A\in\mathbb{C}^{n\times n}
$$

#### Successioni di matrici

Una successione di matrici

$$
A^{(0)},A^{(1)},A^{(2)},\ldots
$$

in $\mathbb{C}^{n\times n}$ si dice convergente alla matrice

$$
A\in\mathbb{C}^{n\times n}
$$

rispetto alla norma matriciale $\|\cdot\|$ se

$$
\|A^{(k)}-A\|\to 0
$$

per

$$
k\to+\infty
$$

Siccome tutte le norme matriciali sono equivalenti, se una successione di matrici converge ad $A$ rispetto a una norma, allora converge ad $A$ rispetto a tutte le norme.

Dimostrazione.

Supponiamo che

$$
A^{(k)}\to A
$$

rispetto alla norma $\|\cdot\|$.

Questo significa che

$$
\|A^{(k)}-A\|\to 0
$$

Sia $\|\cdot\|'$ un’altra norma matriciale.

Poiché le due norme sono equivalenti, esistono due costanti positive $\alpha,\beta>0$ tali che

$$
\alpha\|M\|\leq \|M\|'\leq \beta\|M\|
$$

per ogni matrice

$$
M\in\mathbb{C}^{n\times n}
$$

Ora sostituiamo

$$
M=A^{(k)}-A
$$

e otteniamo

$$
\alpha\|A^{(k)}-A\|
\leq
\|A^{(k)}-A\|'
\leq
\beta\|A^{(k)}-A\|
$$

siccome

$$
\|A^{(k)}-A\|\to 0
$$

anche

$$
\alpha\|A^{(k)}-A\|\to 0
$$

e

$$
\beta\|A^{(k)}-A\|\to 0
$$

Per il teorema del confronto, o teorema dei carabinieri, segue che

$$
\|A^{(k)}-A\|'\to 0
$$

quindi

$$
A^{(k)}\to A
$$

anche rispetto alla norma $\|\cdot\|'$.

Una successione di matrici

$$
A^{(0)},A^{(1)},A^{(2)},\ldots
$$

in $\mathbb{C}^{n\times n}$ si dice convergente componente per componente alla matrice

$$
A=(a_{ij})_{i,j=1}^n
$$

se, scrivendo

$$
A^{(k)}=(a_{ij}^{(k)})_{i,j=1}^n
$$

vale

$$
a_{ij}^{(k)}\to a_{ij}
$$

per ogni

$$
i,j=1,\ldots,n
$$

cioè

$$
|a_{ij}^{(k)}-a_{ij}|\to 0
$$

per ogni $i,j$.

Questo è equivalente a dire che

$$
\max_{i,j=1,\ldots,n}|a_{ij}^{(k)}-a_{ij}|\to 0
$$

ma questa è proprio la norma infinito “classica” con una sola stanghetta, cioè

$$
|A^{(k)}-A|_\infty
=
\max_{i,j=1,\ldots,n}|a_{ij}^{(k)}-a_{ij}|
$$

quindi la convergenza componente per componente coincide con la convergenza rispetto alla norma infinito classica.

Ricordando il teorema di equivalenza di tutte le norme matriciali, dire

$$
A^{(k)}\to A
$$

componente per componente è equivalente a dire

$$
A^{(k)}\to A
$$

rispetto a una qualsiasi norma matriciale.

##### Teorema 3.12

Sia

$$
A\in\mathbb{C}^{n\times n}
$$

allora

$$
A^k\to 0
$$

cioè la potenza $k$-esima di $A$ tende alla matrice nulla, se e solo se

$$
\rho(A)<1
$$

dove $\rho(A)$ è il raggio spettrale di $A$.

Dimostriamo il teorema nel caso in cui $A$ sia diagonalizzabile.

Allora esistono una matrice invertibile

$$
X\in\mathbb{C}^{n\times n}
$$

e una matrice diagonale

$$
D=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)
$$

avente sulla diagonale gli autovalori di $A$, tali che

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
A^3=XD^3X^{-1}
$$

e in generale

$$
A^k=XD^kX^{-1}
$$

Dimostriamo prima

$$
\rho(A)<1 \Longrightarrow A^k\to 0
$$

Supponiamo quindi che

$$
\rho(A)<1
$$

Usiamo una norma matriciale indotta, per esempio la norma infinito.

Abbiamo

$$
\|A^k\|_\infty
=
\|XD^kX^{-1}\|_\infty
$$

per submoltiplicatività,

$$
\|XD^kX^{-1}\|_\infty
\leq
\|X\|_\infty \|D^kX^{-1}\|_\infty
$$

e ancora, applicando una seconda volta la submoltiplicatività,

$$
\|D^kX^{-1}\|_\infty
\leq
\|D^k\|_\infty \|X^{-1}\|_\infty
$$

quindi

$$
\|A^k\|_\infty
\leq
\|X\|_\infty \|D^k\|_\infty \|X^{-1}\|_\infty
$$

Ora

$$
D^k=
\operatorname{diag}(\lambda_1^k,\ldots,\lambda_n^k)
$$

quindi

$$
\|D^k\|_\infty
=
\max_{i=1,\ldots,n}|\lambda_i^k|
$$

ma

$$
|\lambda_i^k|=|\lambda_i|^k
$$

perciò

$$
\|D^k\|_\infty
=
\max_{i=1,\ldots,n}|\lambda_i|^k
=
\left(\max_{i=1,\ldots,n}|\lambda_i|\right)^k
$$`

cioè

$$
\|D^k\|_\infty=\rho(A)^k
$$

quindi

$$
\|A^k\|_\infty
\leq
\|X\|_\infty \|X^{-1}\|_\infty \rho(A)^k
$$

siccome

$$
\rho(A)<1
$$

allora

$$
\rho(A)^k\to 0
$$

per $k\to+\infty$.

Dato che $\|X\|_\infty$ e $\|X^{-1}\|_\infty$ sono costanti, otteniamo

$$
\|X\|_\infty \|X^{-1}\|_\infty \rho(A)^k\to 0
$$

Inoltre

$$
0\leq \|A^k\|_\infty
\leq
\|X\|_\infty \|X^{-1}\|_\infty \rho(A)^k
$$

quindi, per il teorema del confronto,

$$
\|A^k\|_\infty\to 0
$$

e dunque

$$
A^k\to 0
$$

Ora dimostriamo

$$
A^k\to 0 \Longrightarrow \rho(A)<1
$$

Supponiamo che

$$
A^k\to 0
$$

cioè

$$
\|A^k\|_\infty\to 0
$$

Poiché

$$
A^k=XD^kX^{-1}
$$

moltiplichiamo a sinistra per $X^{-1}$ e a destra per $X$:

$$
X^{-1}A^kX=D^k
$$

quindi

$$
D^k=X^{-1}A^kX
$$

Ora calcoliamo la norma infinito:

$$
\|D^k\|_\infty
=
\|X^{-1}A^kX\|_\infty
$$

per submoltiplicatività,

$$
\|X^{-1}A^kX\|_\infty
\leq
\|X^{-1}\|_\infty \|A^kX\|_\infty
$$

e ancora

$$
\|A^kX\|_\infty
\leq
\|A^k\|_\infty \|X\|_\infty
$$

quindi

$$
\|D^k\|_\infty
\leq
\|X^{-1}\|_\infty \|A^k\|_\infty \|X\|_\infty
$$

ma

$$
\|A^k\|_\infty\to 0
$$

e $\|X^{-1}\|_\infty,\|X\|_\infty$ sono costanti, quindi

$$
\|D^k\|_\infty\to 0
$$

D’altra parte abbiamo già visto che

$$
\|D^k\|_\infty=\rho(A)^k
$$

quindi

$$
\rho(A)^k\to 0
$$

Ora, siccome $\rho(A)\geq 0$, l’unico modo affinché

$$
\rho(A)^k\to 0
$$

è che

$$
\rho(A)<1
$$

infatti:
- se $\rho(A)=1$, allora $\rho(A)^k=1$ per ogni $k$
- se $\rho(A)>1$, allora $\rho(A)^k\to+\infty$
- se $0\leq \rho(A)<1$, allora $\rho(A)^k\to 0$

quindi

$$
\rho(A)<1
$$

Abbiamo dimostrato che, nel caso diagonalizzabile,

$$
A^k\to 0
\iff
\rho(A)<1
$$

$$
\square
$$
