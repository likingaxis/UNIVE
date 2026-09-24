#### Procedura di costruzione di metodi iterativi mediante decomposizione della matrice

Vediamo una procedura generale per costruire metodi iterativi della forma

$$
x^{(k+1)}=Px^{(k)}+q
$$

per risolvere il sistema

$$
Ax=b
$$

che chiamiamo $S$.

Si considera una decomposizione della matrice

$$
A=M-(M-A)
$$

con

$$
M\in\mathbb{C}^{n\times n}
$$

invertibile.

La matrice $M$ viene detta precondizionatore.

L’idea è questa: invece di usare direttamente $A$, scegliamo una matrice $M$ che assomigli ad $A$, ma che sia molto più facile da usare nei calcoli, cioè tale che i sistemi lineari con matrice $M$ siano facili da risolvere.

Osserviamo che il sistema

$$
Ax=b
$$

si può riscrivere usando

$$
A=M-(M-A)
$$

infatti

$$
Ax=b
$$

diventa

$$
[M-(M-A)]x=b
$$

cioè

$$
Mx-(M-A)x=b
$$

portando il secondo termine a destra:

$$
Mx=(M-A)x+b
$$

siccome $M$ è invertibile, moltiplichiamo per $M^{-1}$:

$$
x=M^{-1}(M-A)x+M^{-1}b
$$

questa è una forma a punto fisso.

Possiamo anche riscriverla in un altro modo:

$$
x=M^{-1}(M-A)x+M^{-1}b
$$

sviluppiamo

$$
M^{-1}(M-A)=M^{-1}M-M^{-1}A=I-M^{-1}A
$$

quindi

$$
x=(I-M^{-1}A)x+M^{-1}b
$$

cioè

$$
x=x-M^{-1}Ax+M^{-1}b
$$

raccogliendo $M^{-1}$:

$$
x=x+M^{-1}(b-Ax)
$$

chiamiamo

$$
r(x)=b-Ax
$$

il residuo del sistema nel punto $x$.

Infatti, se $x$ fosse la soluzione esatta, avremmo

$$
Ax=b
$$

e quindi

$$
r(x)=b-Ax=0
$$

Più in generale, per ogni $y\in\mathbb{C}^n$,

$$
r(y)=b-Ay
$$

è il residuo in $y$ per il sistema $S$.

A partire da questa riscrittura, si definisce il metodo iterativo:

$$
x^{(0)}\in\mathbb{C}^n \text{ dato}
$$

$$
x^{(k+1)}=M^{-1}(M-A)x^{(k)}+M^{-1}b
$$

per

$$
k=0,1,2,\ldots
$$

equivalentemente,

$$
x^{(k+1)}=x^{(k)}+M^{-1}r^{(k)}
$$

dove

$$
r^{(k)}=b-Ax^{(k)}
$$

è il residuo calcolato in $x^{(k)}$.

Il metodo è della forma

$$
x^{(k+1)}=Px^{(k)}+q
$$

con matrice di iterazione

$$
P=M^{-1}(M-A)
$$

cioè

$$
P=I-M^{-1}A
$$

e

$$
q=M^{-1}b
$$

##### Teorema 4.2

Il metodo costruito sopra è consistente con il sistema $S$.

Infatti, se $x$ è la soluzione esatta di

$$
Ax=b
$$

allora

$$
b-Ax=0
$$

quindi

$$
x+M^{-1}(b-Ax)=x+M^{-1}0=x
$$

cioè

$$
x=x+M^{-1}(b-Ax)
$$

e dunque la soluzione esatta è un punto fisso del metodo.

Equivalentemente, usando la forma

$$
x=M^{-1}(M-A)x+M^{-1}b
$$

questa è vera proprio perché deriva dal sistema originale $Ax=b$.

Quindi il metodo è consistente.

Per il teorema generale sui metodi iterativi, il metodo è convergente se e solo se

$$
\rho(P)<1
$$

cioè se e solo se

$$
\rho(I-M^{-1}A)<1
$$

##### Osservazione smart

Il polinomio caratteristico di

$$
I-M^{-1}A
$$

è

$$
C_{I-M^{-1}A}(\lambda)
=
\det(\lambda I-(I-M^{-1}A))
$$

quindi

$$
C_{I-M^{-1}A}(\lambda)
=
\det(\lambda I-I+M^{-1}A)
$$

Ora vogliamo evitare di calcolare esplicitamente $M^{-1}$.

Osserviamo che

$$
\lambda I-I+M^{-1}A
=
(\lambda-1)I+M^{-1}A
$$

possiamo raccogliere $M^{-1}$ scrivendo

$$
(\lambda-1)I+M^{-1}A
=
M^{-1}[(\lambda-1)M+A]
$$

infatti

$$
M^{-1}[(\lambda-1)M+A]
=
(\lambda-1)M^{-1}M+M^{-1}A
=
(\lambda-1)I+M^{-1}A
$$

quindi

$$
C_{I-M^{-1}A}(\lambda)
=
\det(M^{-1}[(\lambda-1)M+A])
$$

per Binet:

$$
C_{I-M^{-1}A}(\lambda)
=
\det(M^{-1})\det((\lambda-1)M+A)
$$

cioè

$$
C_{I-M^{-1}A}(\lambda)
=
\det(M^{-1})\det(\lambda M-M+A)
$$

Il primo determinante

$$
\det(M^{-1})
$$

è diverso da zero perché $M$ è invertibile.

Infatti

$$
\det(M)\neq 0
$$

e quindi

$$
\det(M^{-1})=\frac{1}{\det(M)}\neq 0
$$

Allora

$$
C_{I-M^{-1}A}(\lambda)=0
$$

se e solo se

$$
\det(\lambda M-M+A)=0
$$

Questa è l’equazione smart.

Serve per calcolare gli autovalori e quindi il raggio spettrale di

$$
I-M^{-1}A
$$

senza calcolare esplicitamente né

$$
M^{-1}
$$

né

$$
I-M^{-1}A
$$

Quindi, invece di costruire la matrice di iterazione e poi calcolarne gli autovalori, possiamo risolvere direttamente

$$
\det(\lambda M-M+A)=0
$$

Oss.

L’iterazione $k$-esima del metodo viene calcolata con la formula

$$
x^{(k+1)}=x^{(k)}+M^{-1}r^{(k)}
$$

e richiede il calcolo del vettore

$$
z^{(k)}=M^{-1}r^{(k)}
$$

detto residuo precondizionato.

In pratica, però, non si calcola mai esplicitamente $M^{-1}$.

Il calcolo di $z^{(k)}$ si fa risolvendo il sistema lineare

$$
Mz^{(k)}=r^{(k)}
$$

Infatti, se

$$
Mz^{(k)}=r^{(k)}
$$

allora

$$
z^{(k)}=M^{-1}r^{(k)}
$$

Questo è molto più conveniente dal punto di vista computazionale rispetto al calcolo esplicito di $M^{-1}$.

Ovviamente il sistema lineare

$$
Mz^{(k)}=r^{(k)}
$$

deve essere più rapido da risolvere del sistema originario

$$
Ax=b
$$

altrimenti non converrebbe usare questo metodo iterativo.

Oss.

Intuitivamente, quanto più il precondizionatore $M$ assomiglia alla matrice $A$, tanto più il metodo dovrebbe convergere velocemente.

La velocità dipende dal raggio spettrale della matrice di iterazione

$$
P=I-M^{-1}A
$$

Se

$$
M\approx A
$$

allora

$$
M-A\approx 0
$$

e quindi

$$
M^{-1}(M-A)\approx 0
$$

cioè

$$
I-M^{-1}A\approx 0
$$

per cui ci si aspetta un raggio spettrale piccolo.

Il caso limite è

$$
M=A
$$

In questo caso

$$
I-M^{-1}A=I-A^{-1}A=I-I=0
$$

quindi la matrice di iterazione è nulla.

Il metodo diventa

$$
x^{(k+1)}=x^{(k)}+A^{-1}(b-Ax^{(k)})
$$

cioè

$$
x^{(k+1)}=x^{(k)}+A^{-1}b-A^{-1}Ax^{(k)}
$$

quindi

$$
x^{(k+1)}=x^{(k)}+A^{-1}b-x^{(k)}
$$

e dunque

$$
x^{(k+1)}=A^{-1}b=x
$$

cioè converge in una sola iterazione alla soluzione esatta.

Il problema è che questa unica iterazione richiede di risolvere un sistema con matrice $A$, quindi costa come risolvere direttamente il sistema originale

$$
Ax=b
$$

Conclusione: nella scelta del precondizionatore $M$ occorre mediare fra due cose:

- qualità dell’approssimazione $M\approx A$
- facilità e rapidità della risoluzione di un sistema lineare con matrice $M$

Una buona approssimazione

$$
M\approx A
$$

generalmente assicura una buona velocità di convergenza.

La facilità e rapidità della risoluzione di

$$
Mz=r
$$

assicura invece che ogni iterazione del metodo sia veloce.

#### Metodo di Jacobi
Supponiamo che $A$ abbia elementi diagonali non nulli, cioè

$$
a_{ii}\neq 0
\qquad i=1,\ldots,n
$$
Allora la parte diagonale di $A$, cioè la matrice

$$
D=
\begin{pmatrix}
a_{11} & 0 & \cdots & 0\\
0 & a_{22} & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & a_{nn}
\end{pmatrix}
$$

è invertibile.

Infatti $D$ è diagonale e

$$
\det(D)=a_{11}a_{22}\cdots a_{nn}
$$

siccome tutti gli elementi diagonali sono non nulli, il determinante è diverso da zero.

Dunque posso definire il metodo di Jacobi, che è il metodo ottenuto scegliendo

$$
M=D
$$

Il metodo è

$$
x^{(0)}\in\mathbb{C}^n \text{ dato}
$$

$$
x^{(k+1)}=D^{-1}(D-A)x^{(k)}+D^{-1}b
$$

equivalentemente

$$
x^{(k+1)}=x^{(k)}+D^{-1}r^{(k)}
$$

per

$$
k=0,1,2,\ldots
$$

dove

$$
r^{(k)}=b-Ax^{(k)}
$$

La matrice di iterazione del metodo di Jacobi è

$$
J=D^{-1}(D-A)
$$

cioè

$$
J=I-D^{-1}A
$$

Il metodo di Jacobi è convergente se e solo se

$$
\rho(J)<1
$$

cioè

$$
\rho(I-D^{-1}A)<1
$$

L’iterazione $k$-esima di Jacobi richiede di calcolare il vettore

$$
z^{(k)}=D^{-1}r^{(k)}
$$

risolvendo il sistema diagonale

$$
Dz^{(k)}=r^{(k)}
$$

Questo sistema è facilissimo da risolvere, perché è diagonale:

$$
\begin{cases}
a_{11}z_1^{(k)}=r_1^{(k)}\\
a_{22}z_2^{(k)}=r_2^{(k)}\\
\vdots\\
a_{nn}z_n^{(k)}=r_n^{(k)}
\end{cases}
$$

equivalentemente

$$
\begin{cases}
z_1^{(k)}=\dfrac{r_1^{(k)}}{a_{11}}\\
z_2^{(k)}=\dfrac{r_2^{(k)}}{a_{22}}\\
\vdots\\
z_n^{(k)}=\dfrac{r_n^{(k)}}{a_{nn}}
\end{cases}
$$

Il costo del calcolo di $z^{(k)}$ è

$$
nD
$$

cioè $n$ divisioni.

#### Metodo di Gauss-Seidel

Supponiamo ancora che $A$ abbia elementi diagonali non nulli:

$$
a_{ii}\neq 0
\qquad i=1,\ldots,n
$$

Allora la parte triangolare inferiore di $A$, cioè la matrice $E$ ottenuta ricopiando la parte triangolare inferiore di $A$ inclusa la diagonale, è invertibile.

Quindi

$$
E=
\begin{pmatrix}
a_{11} & 0 & 0 & \cdots & 0\\
a_{21} & a_{22} & 0 & \cdots & 0\\
a_{31} & a_{32} & a_{33} & \cdots & 0\\
\vdots & \vdots & \vdots & \ddots & \vdots\\
a_{n1} & a_{n2} & a_{n3} & \cdots & a_{nn}
\end{pmatrix}
$$

Essendo triangolare inferiore,

$$
\det(E)=a_{11}a_{22}\cdots a_{nn}
$$

e siccome gli elementi diagonali sono non nulli,

$$
\det(E)\neq 0
$$

quindi $E$ è invertibile.

Dunque posso definire il metodo di Gauss-Seidel, che è il metodo costruito scegliendo

$$
M=E
$$

Il metodo è

$$
x^{(0)}\in\mathbb{C}^n \text{ dato}
$$

$$
x^{(k+1)}=E^{-1}(E-A)x^{(k)}+E^{-1}b
$$

equivalentemente

$$
x^{(k+1)}=x^{(k)}+E^{-1}r^{(k)}
$$

per

$$
k=0,1,2,\ldots
$$

dove

$$
r^{(k)}=b-Ax^{(k)}
$$

La matrice di iterazione di Gauss-Seidel è

$$
G=E^{-1}(E-A)
$$

cioè

$$
G=I-E^{-1}A
$$

Il metodo di Gauss-Seidel è convergente se e solo se

$$
\rho(G)<1
$$`

cioè

$$
\rho(I-E^{-1}A)<1
$$

L’iterazione $k$-esima di Gauss-Seidel richiede di calcolare il vettore

$$
z^{(k)}=E^{-1}r^{(k)}
$$

risolvendo il sistema triangolare inferiore

$$
Ez^{(k)}=r^{(k)}
$$

Questo è facile, ma meno immediato rispetto al caso diagonale. Un sistema triangolare inferiore si risolve con la sostituzione in avanti.

Infatti

$$
Ez^{(k)}=r^{(k)}
$$

equivale a

$$
\begin{cases}
a_{11}z_1^{(k)}=r_1^{(k)}\\
a_{21}z_1^{(k)}+a_{22}z_2^{(k)}=r_2^{(k)}\\
a_{31}z_1^{(k)}+a_{32}z_2^{(k)}+a_{33}z_3^{(k)}=r_3^{(k)}\\
\vdots\\
a_{n1}z_1^{(k)}+a_{n2}z_2^{(k)}+\cdots+a_{nn}z_n^{(k)}=r_n^{(k)}
\end{cases}
$$

Da qui si ricava:

$$
\begin{cases}
z_1^{(k)}=\dfrac{r_1^{(k)}}{a_{11}}\\[6pt]
z_2^{(k)}=\dfrac{r_2^{(k)}-a_{21}z_1^{(k)}}{a_{22}}\\[6pt]
z_3^{(k)}=\dfrac{r_3^{(k)}-a_{31}z_1^{(k)}-a_{32}z_2^{(k)}}{a_{33}}\\
\vdots\\
z_n^{(k)}=\dfrac{r_n^{(k)}-a_{n1}z_1^{(k)}-a_{n2}z_2^{(k)}-\cdots-a_{n,n-1}z_{n-1}^{(k)}}{a_{nn}}
\end{cases}
$$

In generale, per ogni

$$
i=1,\ldots,n
$$

si ha

$$
z_i^{(k)}
=
\frac{
r_i^{(k)}
-
a_{i1}z_1^{(k)}
-
a_{i2}z_2^{(k)}
-
\cdots
-
a_{i,i-1}z_{i-1}^{(k)}
}{a_{ii}}
$$

Il costo del calcolo di $z_i^{(k)}$ è

$$
1D+(i-1)M+(i-1)A
$$

perché:

- serve una divisione per $a_{ii}$
- servono $(i-1)$ moltiplicazioni per i termini $a_{ij}z_j^{(k)}$
- servono $(i-1)$ addizioni/sottrazioni per combinarli con $r_i^{(k)}$

Quindi il costo complessivo del calcolo di $z^{(k)}$ è

$$
\sum_{i=1}^n \left[1D+(i-1)M+(i-1)A\right]
$$

cioè

$$
nD+\left(\sum_{i=1}^n(i-1)\right)M+\left(\sum_{i=1}^n(i-1)\right)A
$$

sapendo che

$$
\sum_{i=1}^n(i-1)=0+1+\cdots+(n-1)=\frac{n(n-1)}{2}
$$

otteniamo

$$
nD+\frac{n(n-1)}{2}M+\frac{n(n-1)}{2}A
$$

Questo costo può ridursi se la parte triangolare inferiore $E$ di $A$ ha molti zeri.

Osservazione

Confrontando i precondizionatori $D$ ed $E$ dei metodi di Jacobi e Gauss-Seidel, osserviamo quanto segue.

- L’approssimazione

$$
E\approx A
$$

è migliore dell’approssimazione

$$
D\approx A
$$

perché $E$ contiene più informazioni di $A$ rispetto a $D$.

Infatti $D$ contiene solo la diagonale di $A$, mentre $E$ contiene tutta la parte triangolare inferiore, inclusa la diagonale.

Inoltre

$$
E-A
$$

ha più zeri rispetto a

$$
D-A
$$

Questo spiega perché molto spesso il metodo di Gauss-Seidel converge più velocemente del metodo di Jacobi, cioè spesso

$$
\rho(G)<\rho(J)
$$

dove $J$ e $G$ sono rispettivamente le matrici di iterazione di Jacobi e Gauss-Seidel.

- Però la risoluzione di un sistema lineare con matrice $E$ è più costosa della risoluzione di un sistema lineare con matrice $D$.

Infatti:

- con $D$ basta risolvere un sistema diagonale, cioè fare $n$ divisioni;
- con $E$ bisogna risolvere un sistema triangolare inferiore, usando sostituzione in avanti.

Pertanto, una iterazione di Gauss-Seidel costa di più di una iterazione di Jacobi.

Quindi il confronto è questo:

- Jacobi: iterazioni più economiche, ma spesso convergenza più lenta;
- Gauss-Seidel: iterazioni più costose, ma spesso convergenza più veloce.
