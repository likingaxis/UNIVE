#### Richiami delle matrici di algebra lineare

- calcolo dei determinanti
	- ripassiamo il metodo di Laplace per il calcolo dei determinanti
	- il metodo di Laplace consiste nello sviluppare il determinante lungo una riga o una colonna, usando i minori e i segni dati dalla regola della scacchiera

per esempio, per una matrice $3\times 3$, la regola dei segni è

$$
\begin{pmatrix}
+ & - & +\\
- & + & -\\
+ & - & +
\end{pmatrix}
$$

- teorema di Binet
	- per ogni $A,B\in\mathbb{C}^{n\times n}$ vale

$$
\det(AB)=\det(A)\det(B)
$$

- altro teorema importante
	- per ogni $A\in\mathbb{C}^{n\times n}$ vale

$$
\det(A)=\det(A^T)
$$

cioè una matrice e la sua trasposta hanno lo stesso determinante

- fa un esempio per cui la matrice ha determinante nullo
	- usiamo Binet
	- se $A=LU$, allora

$$
\det(A)=\det(LU)=\det(L)\det(U)
$$

quindi se uno tra $\det(L)$ e $\det(U)$ è uguale a $0$, allora anche

$$
\det(A)=0
$$

questo perché il prodotto diventa nullo.

- traccia, determinante, raggio spettrale e autovalori
	- per noi gli autovalori di una matrice $A\in\mathbb{C}^{n\times n}$ vengono considerati con la loro molteplicità algebrica
	- quindi una matrice $n\times n$ ha $n$ autovalori contati con molteplicità, cioè

$$
\lambda_1,\lambda_2,\ldots,\lambda_n
$$

la traccia è definita come la somma degli elementi diagonali:

$$
\operatorname{traccia}(A)=a_{11}+a_{22}+\cdots+a_{nn}
$$

e coincide con la somma degli autovalori, contati con molteplicità algebrica:

$$
\operatorname{traccia}(A)=\lambda_1+\lambda_2+\cdots+\lambda_n
$$

il determinante di una matrice coincide con il prodotto degli autovalori, sempre contati con molteplicità algebrica:

$$
\det(A)=\lambda_1\lambda_2\cdots\lambda_n
$$

attenzione: non è “il prodotto delle molteplicità”, ma il prodotto degli autovalori contati con molteplicità.

Il raggio spettrale di $A$ è definito come

$$
\rho(A)=\max\{|\lambda_1|,|\lambda_2|,\ldots,|\lambda_n|\}
$$

- cosa si intende per modulo di $\lambda_1,\lambda_2,\ldots$?
	- se $\lambda$ è reale, $|\lambda|$ è il valore assoluto
	- se $\lambda$ è complesso, $|\lambda|$ è la distanza di $\lambda$ dallo zero nel piano complesso
	- quindi, se $\lambda=\alpha+i\beta$, allora

$$
|\lambda|=\sqrt{\alpha^2+\beta^2}
$$

- si sfrutta la traccia per capire se una matrice possiede almeno un autovalore $\lambda$ non reale, cioè tale che

$$
\operatorname{Im}(\lambda)\neq 0
$$

nell’esempio del prof si nota che

$$
\operatorname{traccia}(A)=-8+i
$$

quindi la traccia non è reale.

Siccome la traccia è la somma degli autovalori, se tutti gli autovalori fossero reali allora anche la loro somma sarebbe reale. Però la traccia è $-8+i$, quindi non è reale.

Allora deve esistere almeno un autovalore $\lambda$ non reale.

- dimostrare che $A$ possiede almeno un autovalore $\mu$ con parte reale minore o uguale a $-2$

Nell’esempio la matrice è $4\times 4$, quindi ha quattro autovalori

$$
\lambda_1,\lambda_2,\lambda_3,\lambda_4
$$

contati con molteplicità.

Sappiamo che

$$
\operatorname{Re}(\operatorname{traccia}(A))=-8
$$

Supponiamo per assurdo che tutti gli autovalori abbiano parte reale maggiore di $-2$, cioè

$$
\operatorname{Re}(\lambda_i)>-2
$$

per ogni $i=1,2,3,4$.

Allora

$$
\operatorname{Re}(\operatorname{traccia}(A))
=
\operatorname{Re}(\lambda_1+\lambda_2+\lambda_3+\lambda_4)
$$

cioè

$$
\operatorname{Re}(\operatorname{traccia}(A))
=
\operatorname{Re}(\lambda_1)+\operatorname{Re}(\lambda_2)+\operatorname{Re}(\lambda_3)+\operatorname{Re}(\lambda_4)
$$

ma, per l’ipotesi fatta,

$$
\operatorname{Re}(\lambda_1)+\operatorname{Re}(\lambda_2)+\operatorname{Re}(\lambda_3)+\operatorname{Re}(\lambda_4)
>
-2-2-2-2=-8
$$

quindi avremmo

$$
\operatorname{Re}(\operatorname{traccia}(A))>-8
$$

ma questo è impossibile perché sappiamo che

$$
\operatorname{Re}(\operatorname{traccia}(A))=-8
$$

quindi deve esistere almeno un autovalore $\mu$ tale che

$$
\operatorname{Re}(\mu)\leq -2
$$

attenzione: non è che “il massimo è $-8$”, ma è la parte reale della traccia che vale $-8$.

- matrici invertibili
	- una matrice $A\in\mathbb{C}^{n\times n}$ si dice invertibile se esiste una matrice $B\in\mathbb{C}^{n\times n}$ tale che

$$
AB=BA=I
$$

in tal caso la matrice $B$ è univocamente determinata e si chiama inversa di $A$.

Si denota con

$$
A^{-1}
$$

quindi

$$
AA^{-1}=A^{-1}A=I
$$

una matrice $A$ è invertibile se e solo se

$$
\det(A)\neq 0
$$

se e solo se $0$ non è un autovalore di $A$.

Questo perché

$$
\det(A)=\lambda_1\lambda_2\cdots\lambda_n
$$

quindi il determinante è diverso da $0$ se e solo se nessun autovalore è uguale a $0$.

- $AB$ è invertibile se e solo se $A$ e $B$ sono invertibili
	- usando Binet:

$$
\det(AB)=\det(A)\det(B)
$$

quindi $\det(AB)\neq 0$ se e solo se sia $\det(A)\neq 0$ sia $\det(B)\neq 0$.

In tal caso l’inversa è

$$
(AB)^{-1}=B^{-1}A^{-1}
$$

attenzione all’ordine: l’inversa del prodotto si scrive invertendo l’ordine dei fattori.

Infatti

$$
AB(B^{-1}A^{-1})=AIA^{-1}=AA^{-1}=I
$$

e

$$
(B^{-1}A^{-1})AB=B^{-1}IB=B^{-1}B=I
$$

- per trovare l’inversa possiamo usare il metodo dei cofattori
	- la formula generale è

$$
A^{-1}=\frac{1}{\det(A)}\operatorname{adj}(A)
$$

dove $\operatorname{adj}(A)$ è la matrice aggiunta, cioè la trasposta della matrice dei cofattori.

Quindi questo metodo funziona solo se

$$
\det(A)\neq 0
$$

perché altrimenti non posso dividere per il determinante.

- matrici diagonalizzabili
	- una matrice $A\in\mathbb{C}^{n\times n}$ si dice diagonalizzabile se esistono una matrice invertibile $X\in\mathbb{C}^{n\times n}$ e una matrice diagonale $D\in\mathbb{C}^{n\times n}$ tali che

$$
A=XDX^{-1}
$$

dove

$$
D=\operatorname{diag}(\lambda_1,\lambda_2,\ldots,\lambda_n)
$$

- osservazione importante da esame
	- se indichiamo con $\lambda_1,\ldots,\lambda_n$ gli elementi diagonali di $D$ e con $x_1,\ldots,x_n$ le colonne della matrice $X$, allora nella formula

$$
A=XDX^{-1}
$$

c’è scritto che per ogni $i=1,\ldots,n$, $\lambda_i$ è un autovalore di $A$ con corrispondente autovettore $x_i$.

attenzione: gli elementi diagonali sono quelli di $D$, non quelli di $A$.

Dimostrazione.

Partiamo da

$$
A=XDX^{-1}
$$

moltiplichiamo entrambi i membri a destra per $X$:

$$
AX=XD
$$

adesso guardiamo questa equazione colonna per colonna.

La matrice $X$ ha colonne

$$
x_1,x_2,\ldots,x_n
$$

quindi

$$
X=
\begin{pmatrix}
| & | & & |\\
x_1 & x_2 & \cdots & x_n\\
| & | & & |
\end{pmatrix}
$$

La prima colonna di $AX$ è

$$
Ax_1
$$

la seconda colonna di $AX$ è

$$
Ax_2
$$

e in generale la colonna $i$-esima di $AX$ è

$$
Ax_i
$$

Ora guardiamo $XD$.

Poiché $D$ è diagonale,

$$
D=
\begin{pmatrix}
\lambda_1 & 0 & \cdots & 0\\
0 & \lambda_2 & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & \lambda_n
\end{pmatrix}
$$

moltiplicare $X$ per $D$ significa moltiplicare ogni colonna $x_i$ di $X$ per il corrispondente elemento diagonale $\lambda_i$.

Quindi

$$
XD=
\begin{pmatrix}
| & | & & |\\
\lambda_1x_1 & \lambda_2x_2 & \cdots & \lambda_nx_n\\
| & | & & |
\end{pmatrix}
$$

siccome

$$
AX=XD
$$

le colonne corrispondenti devono essere uguali.

Quindi, per ogni $i=1,\ldots,n$,

$$
Ax_i=\lambda_i x_i
$$

questa è proprio la definizione di autovalore e autovettore.

Quindi $\lambda_i$ è un autovalore di $A$ e $x_i$ è un autovettore associato a $\lambda_i$.

- Matrici hermitiane e simmetriche
	- data $A\in\mathbb{C}^{m\times n}$, indichiamo con $A^*$ la trasposta coniugata di $A$

ricordiamo che, se $z\in\mathbb{C}$ e

$$
z=\alpha+i\beta
$$

allora il suo coniugato è

$$
\overline{z}=\alpha-i\beta
$$

Per ottenere $A^*$ si fa la trasposta e si coniugano gli elementi.

In formule:

$$
A^*=\overline{A}^T
$$

oppure equivalentemente

$$
A^*=\overline{A^T}
$$

per matrici moltiplicabili $A,B$ valgono

$$
(AB)^T=B^TA^T
$$

e

$$
(AB)^*=B^*A^*
$$

quindi la trasposta di un prodotto e la trasposta coniugata di un prodotto invertono l’ordine dei fattori.

- una matrice $A\in\mathbb{C}^{n\times n}$ si dice hermitiana se

$$
A^*=A
$$

- Oss.
	- se le componenti di $A$ sono reali, allora $A^*=A^T$
	- quindi, se $A\in\mathbb{R}^{n\times n}$, dire che $A$ è hermitiana equivale a dire che $A$ è simmetrica

cioè

$$
A^T=A
$$

- Oss.
	- gli elementi diagonali di una matrice hermitiana sono reali

infatti, se $A$ è hermitiana, allora

$$
A^*=A
$$

sulla diagonale questo significa che

$$
\overline{a_{ii}}=a_{ii}
$$

ma un numero complesso uguale al proprio coniugato è reale.

Quindi

$$
a_{ii}\in\mathbb{R}
$$

- Oss.
	- gli autovalori di una matrice hermitiana sono reali

Dimostrazione.

Sia $A\in\mathbb{C}^{n\times n}$ hermitiana e sia $\lambda$ un suo autovalore generico.

Allora esiste un autovettore

$$
x\in\mathbb{C}^n\setminus\{0\}
$$

associato a $\lambda$, cioè

$$
Ax=\lambda x
$$

Moltiplichiamo entrambi i membri a sinistra per $x^*$:

$$
x^*Ax=x^*(\lambda x)$$
poiché $\lambda$ è uno scalare, posso portarlo fuori:

$$
x^*Ax=\lambda x^*x
$$

Ora

$$
x^*x=\sum_{i=1}^n \overline{x_i}x_i
$$

ma

$$
\overline{x_i}x_i=|x_i|^2
$$

quindi

$$
x^*x=\sum_{i=1}^n |x_i|^2
$$

siccome $x\neq 0$, almeno una componente $x_i$ è diversa da $0$, quindi

$$
\sum_{i=1}^n |x_i|^2>0
$$

Dunque

$$
x^*Ax=\lambda \sum_{i=1}^n |x_i|^2
$$

e quindi

$$
\lambda=
\frac{x^*Ax}{\sum_{i=1}^n |x_i|^2}
$$

il denominatore è un numero reale strettamente positivo.

Ora dobbiamo dimostrare che anche il numeratore $x^*Ax$ è reale.

Osserviamo che $x^*Ax$ è uno scalare, cioè un numero complesso.

Calcoliamo il suo coniugato. Per uno scalare, fare il coniugato coincide con fare la trasposta coniugata, quindi

$$
\overline{x^*Ax}=(x^*Ax)^*
$$

usando la proprietà della trasposta coniugata del prodotto:

$$
(x^*Ax)^*=x^*A^*(x^*)^*
$$

ma

$$
(x^*)^*=x
$$

e, siccome $A$ è hermitiana,

$$
A^*=A
$$

quindi

$$
(x^*Ax)^*=x^*Ax
$$

cioè

$$
\overline{x^*Ax}=x^*Ax
$$

quindi $x^*Ax$ è uguale al suo coniugato, e perciò è reale.

Abbiamo allora

$$
\lambda=
\frac{x^*Ax}{\sum_{i=1}^n |x_i|^2}
$$

dove il numeratore è reale e il denominatore è reale positivo.

Quindi

$$
\lambda\in\mathbb{R}
$$

e abbiamo dimostrato che ogni autovalore di una matrice hermitiana è reale.