#### Matrici definite positive

$A\in\mathbb{C}^{n\times n}$ si dice definita positiva se

$$
\operatorname{Re}(x^*Ax)>0
$$

per ogni

$$
x\in\mathbb{C}^n\setminus\{0\}
$$

dove $\operatorname{Re}$ indica la parte reale, non “rappresentazione reale”.

Osserviamo che, per ogni $A\in\mathbb{C}^{n\times n}$ e per ogni $x\in\mathbb{C}^n$, la quantità

$$
x^*Ax
$$

è uno scalare, cioè un numero complesso.

Se chiamo

$$
z=x^*Ax
$$

allora la sua parte reale è

$$
\operatorname{Re}(z)=\frac{z+\overline{z}}{2}
$$

quindi

$$
\operatorname{Re}(x^*Ax)=\frac{x^*Ax+\overline{x^*Ax}}{2}
$$

ma, essendo $x^*Ax$ uno scalare, il suo coniugato coincide con la sua trasposta coniugata:

$$
\overline{x^*Ax}=(x^*Ax)^*
$$

e quindi

$$
(x^*Ax)^*=x^*A^*x
$$

perciò

$$
\operatorname{Re}(x^*Ax)=\frac{x^*Ax+x^*A^*x}{2}
$$

raccogliamo $x^*$ a sinistra e $x$ a destra:

$$
\operatorname{Re}(x^*Ax)
=
x^*\left(\frac{A+A^*}{2}\right)x
$$

la matrice tra $x^*$ e $x$ è la parte reale della matrice $A$, cioè

$$
\operatorname{Re}(A)=\frac{A+A^*}{2}
$$

quindi

$$
\operatorname{Re}(x^*Ax)=x^*\operatorname{Re}(A)x
$$

la parte immaginaria della matrice $A$ è invece

$$
\operatorname{Im}(A)=\frac{A-A^*}{2i}
$$

questo viene dalla formula per i numeri complessi:

$$
\operatorname{Im}(z)=\frac{z-\overline{z}}{2i}
$$

infatti se

$$
z=\alpha+i\beta
$$

allora

$$
\overline{z}=\alpha-i\beta
$$

e quindi

$$
\frac{z-\overline{z}}{2i}
=
\frac{2i\beta}{2i}
=
\beta
$$

per le matrici vale in modo analogo:

$$
A=\operatorname{Re}(A)+i\operatorname{Im}(A)
$$

Oss. $\operatorname{Re}(A)$ e $\operatorname{Im}(A)$ sono sempre matrici hermitiane.

Infatti

$$
\operatorname{Re}(A)=\frac{A+A^*}{2}
$$

e facendo la trasposta coniugata:

$$
\operatorname{Re}(A)^*
=
\left(\frac{A+A^*}{2}\right)^*
=
\frac{A^*+(A^*)^*}{2}
=
\frac{A^*+A}{2}
=
\operatorname{Re}(A)
$$

quindi $\operatorname{Re}(A)$ è hermitiana.

In modo analogo si dimostra che anche

$$
\operatorname{Im}(A)=\frac{A-A^*}{2i}
$$

è hermitiana.

Lo si può dimostrare sfruttando anche il fatto che

$$
(\alpha B)^*=\overline{\alpha}B^*
$$

per ogni $\alpha\in\mathbb{C}$ e ogni matrice $B$.

Ora, usando la formula trovata prima,

$$
\operatorname{Re}(x^*Ax)=x^*\operatorname{Re}(A)x
$$

abbiamo che

$$
A \text{ è definita positiva}
$$

se e solo se

$$
\operatorname{Re}(x^*Ax)>0
$$

per ogni $x\in\mathbb{C}^n\setminus\{0\}$.

Ma questo è equivalente a dire che

$$
x^*\operatorname{Re}(A)x>0
$$

per ogni $x\in\mathbb{C}^n\setminus\{0\}$.

Siccome $\operatorname{Re}(A)$ è hermitiana, allora $x^*\operatorname{Re}(A)x$ è reale, quindi scrivere

$$
x^*\operatorname{Re}(A)x>0
$$

ha senso come disuguaglianza reale.

Quindi

$$
A \text{ è definita positiva}
\iff
\operatorname{Re}(A) \text{ è definita positiva}
$$

in parole: per stabilire se una matrice qualunque $A$ è definita positiva, posso guardare la sua parte reale hermitiana $\operatorname{Re}(A)$.

Ricordiamo infatti che la parte reale di $A$ è sempre hermitiana.

Proprietà

se $A\in\mathbb{C}^{n\times n}$ è definita positiva, allora i suoi autovalori hanno parte reale positiva e di conseguenza $A$ è invertibile, perché $0$ non può essere un autovalore di $A$.

Dimostrazione

sia $A\in\mathbb{C}^{n\times n}$ definita positiva e sia $\lambda$ un generico autovalore di $A$.

Allora esiste un autovettore

$$
x\in\mathbb{C}^n\setminus\{0\}
$$

associato a $\lambda$, cioè

$$
Ax=\lambda x
$$

moltiplichiamo a sinistra per $x^*$:

$$
x^*Ax=x^*(\lambda x)
$$

siccome $\lambda$ è uno scalare, posso portarlo fuori:

$$
x^*Ax=\lambda x^*x
$$

ma

$$
x^*x=\sum_{i=1}^n \overline{x_i}x_i=\sum_{i=1}^n |x_i|^2
$$

quindi

$$
x^*Ax=\lambda\sum_{i=1}^n |x_i|^2
$$

da cui

$$
\lambda=
\frac{x^*Ax}{\sum_{i=1}^n |x_i|^2}
$$

il denominatore è reale e strettamente positivo perché $x\neq 0$.

Ora prendiamo la parte reale:

$$
\operatorname{Re}(\lambda)
=
\frac{\operatorname{Re}(x^*Ax)}{\sum_{i=1}^n |x_i|^2}
$$

siccome $A$ è definita positiva,

$$
\operatorname{Re}(x^*Ax)>0
$$

e siccome il denominatore è positivo, otteniamo

$$
\operatorname{Re}(\lambda)>0
$$

questo perché se un numero complesso ha parte reale positiva, dividendo per un numero reale positivo la parte reale resta positiva.

Infatti se

$$
z=\alpha+i\beta
$$

con $\alpha>0$ e $r>0$, allora

$$
\frac{z}{r}=\frac{\alpha}{r}+i\frac{\beta}{r}
$$

e quindi

$$
\operatorname{Re}\left(\frac{z}{r}\right)=\frac{\alpha}{r}>0
$$

dunque tutti gli autovalori di $A$ hanno parte reale positiva. In particolare nessun autovalore può essere $0$, quindi $A$ è invertibile.

##### Teorema 3.1

sia $A\in\mathbb{C}^{n\times n}$ una matrice hermitiana e siano $A_1,A_2,\ldots,A_n$ le sue sottomatrici principali di testa.

Cioè, se

$$
A=
\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots & & \vdots\\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{pmatrix}
$$

allora

$$
A_1=
\begin{pmatrix}
a_{11}
\end{pmatrix}
$$

$$
A_2=
\begin{pmatrix}
a_{11} & a_{12}\\
a_{21} & a_{22}
\end{pmatrix}
$$

$$
A_3=
\begin{pmatrix}
a_{11} & a_{12} & a_{13}\\
a_{21} & a_{22} & a_{23}\\
a_{31} & a_{32} & a_{33}
\end{pmatrix}
$$

e così via fino a

$$
A_n=A
$$

queste si chiamano sottomatrici principali di testa di $A$.

Allora, se $A$ è hermitiana, le seguenti condizioni sono equivalenti:

1. $A$ è definita positiva
2. $x^*Ax>0$ per ogni $x\in\mathbb{C}^n\setminus\{0\}$
3. gli autovalori di $A$ sono reali e positivi
4. $\det(A_k)>0$ per ogni $k=1,\ldots,n$

MI RACCOMANDO: questo teorema vale solo se la matrice è hermitiana.

Spieghiamo meglio la cosa.

Per una matrice qualunque $A$, la definizione di definita positiva è

$$
\operatorname{Re}(x^*Ax)>0
$$

per ogni $x\neq 0$.

Se però $A$ è hermitiana, allora $x^*Ax$ è sempre reale, quindi

$$
\operatorname{Re}(x^*Ax)=x^*Ax
$$

e allora la definizione diventa semplicemente

$$
x^*Ax>0
$$

per ogni $x\neq 0$.

Quindi, se $A$ è hermitiana, le condizioni 1 e 2 sono equivalenti.

Se invece $A$ non è hermitiana, non posso applicare direttamente questo teorema ad $A$.

In quel caso uso il fatto che

$$
A \text{ è definita positiva}
\iff
\operatorname{Re}(A) \text{ è definita positiva}
$$

e siccome $\operatorname{Re}(A)$ è hermitiana, posso applicare il teorema a $\operatorname{Re}(A)$.

Quindi:
- se $A$ è hermitiana, applico il teorema direttamente ad $A$
- se $A$ non è hermitiana, guardo prima $\operatorname{Re}(A)=\frac{A+A^*}{2}$ e applico il teorema a quella

il prof ha chiesto di dimostrare che $1\iff 2$ e che $1\Rightarrow 3$.

Ricordiamo che

$$
\operatorname{Re}(A)=\frac{A+A^*}{2}
$$

Dimostrazione di $1\iff 2$

siccome $A$ è hermitiana, sappiamo che

$$
x^*Ax\in\mathbb{R}
$$

per ogni $x\in\mathbb{C}^n$.

Quindi

$$
\operatorname{Re}(x^*Ax)=x^*Ax
$$

Allora dire che $A$ è definita positiva significa dire

$$
\operatorname{Re}(x^*Ax)>0
$$

per ogni $x\neq 0$, ma questo è equivalente a dire

$$
x^*Ax>0
$$

per ogni $x\neq 0$.

Quindi $1\iff 2$.

Dimostrazione di $1\Rightarrow 3$

supponiamo che $A$ sia hermitiana e definita positiva.

Sappiamo già che gli autovalori di una matrice hermitiana sono reali.

Dobbiamo dimostrare che sono anche positivi.

Sia $\lambda$ un autovalore di $A$ e sia

$$
x\in\mathbb{C}^n\setminus\{0\}
$$

un autovettore associato, quindi

$$
Ax=\lambda x
$$

moltiplichiamo per $x^*$ a sinistra:

$$
x^*Ax=x^*(\lambda x)=\lambda x^*x
$$

quindi

$$
x^*Ax=\lambda\sum_{i=1}^n |x_i|^2
$$

da cui

$$
\lambda=
\frac{x^*Ax}{\sum_{i=1}^n |x_i|^2}
$$

siccome $A$ è definita positiva e hermitiana, abbiamo

$$
x^*Ax>0
$$

e siccome

$$
\sum_{i=1}^n |x_i|^2>0
$$

otteniamo

$$
\lambda>0
$$

quindi gli autovalori sono reali e positivi.

##### Polinomi di matrici

sia

$$
p(\lambda)=a_0+a_1\lambda+a_2\lambda^2+\cdots+a_m\lambda^m
$$

un polinomio.

Al posto di usare $x$ usiamo $\lambda$ perché stiamo lavorando con autovalori e matrici, ma formalmente potevamo chiamare la variabile anche $x$.

Sia poi

$$
A\in\mathbb{C}^{n\times n}
$$

una matrice.

Definiamo

$$
p(A)=a_0I+a_1A+a_2A^2+\cdots+a_mA^m
$$

quindi stiamo sostituendo la matrice $A$ alla variabile $\lambda$.

Sto sommando matrici $n\times n$ moltiplicate per scalari, quindi il risultato è ancora una matrice $n\times n$:

$$
p(A)\in\mathbb{C}^{n\times n}
$$

##### Teorema 3.2

sia $p(\lambda)$ un polinomio e sia $A\in\mathbb{C}^{n\times n}$ una matrice con autovalori

$$
\lambda_1,\ldots,\lambda_n
$$

allora gli autovalori di $p(A)$ sono

$$
p(\lambda_1),\ldots,p(\lambda_n)
$$

cioè gli autovalori della matrice $p(A)$ si ottengono valutando il polinomio $p$ sugli autovalori di $A$.

Dimostriamo questo teorema in tre casi.

- caso 1

$p(\lambda)=a_0$ è costante.

In tal caso

$$
p(A)=a_0I
$$

quindi

$$
p(A)=
\begin{pmatrix}
a_0 & 0 & \cdots & 0\\
0 & a_0 & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & a_0
\end{pmatrix}
$$

gli autovalori di questa matrice sono

$$
a_0,\ldots,a_0
$$

ripetuto $n$ volte.

Questo coincide con

$$
p(\lambda_1),\ldots,p(\lambda_n)
$$

perché, essendo $p$ costante, vale

$$
p(\lambda_i)=a_0
$$

per ogni $i$.

Piccola spiegazione aggiuntiva.

Chiediamoci quali sono gli autovalori di $a_0I$.

Ricordiamo la definizione: $\lambda$ è autovalore di una matrice $B$ se esiste un vettore $v\neq 0$ tale che

$$
Bv=\lambda v
$$

nel nostro caso

$$
B=a_0I
$$

quindi

$$
Bv=a_0Iv
$$

ma la matrice identità lascia invariato ogni vettore:

$$
Iv=v
$$

quindi

$$
a_0Iv=a_0v
$$

e questo ha proprio la forma

$$
Bv=\lambda v
$$

con

$$
\lambda=a_0
$$

quindi l’unico autovalore è $a_0$, ripetuto $n$ volte.

- caso 2

$p(\lambda)=a_0+a_1\lambda$ ha grado $1$.

Qui assumiamo $a_1\neq 0$, altrimenti ricadiamo nel caso costante.

In questo caso

$$
p(A)=a_0I+a_1A
$$

il polinomio caratteristico di $p(A)$ e quello di $A$ sono legati dalla seguente relazione.

Per ogni $\lambda\in\mathbb{C}$,

$$
C_{p(A)}(\lambda)=\det(\lambda I-p(A))
$$

quindi

$$
C_{p(A)}(\lambda)=\det(\lambda I-(a_0I+a_1A))
$$

raccogliendo i termini con $I$:

$$
C_{p(A)}(\lambda)=\det((\lambda-a_0)I-a_1A)
$$

ora raccogliamo $a_1$:

$$
(\lambda-a_0)I-a_1A
=
a_1\left(\frac{\lambda-a_0}{a_1}I-A\right)$$
quindi

$$
C_{p(A)}(\lambda)
=
\det\left(a_1\left(\frac{\lambda-a_0}{a_1}I-A\right)\right)
$$

ricordiamo che, per ogni $\alpha\in\mathbb{C}$ e ogni $B\in\mathbb{C}^{n\times n}$,

$$
\det(\alpha B)=\alpha^n\det(B)
$$

perciò

$$
C_{p(A)}(\lambda)
=
a_1^n\det\left(\frac{\lambda-a_0}{a_1}I-A\right)
$$

ma

$$
C_A(z)=\det(zI-A)
$$

quindi, mettendo

$$
z=\frac{\lambda-a_0}{a_1}
$$

otteniamo

$$
C_{p(A)}(\lambda)
=
a_1^n C_A\left(\frac{\lambda-a_0}{a_1}\right)
$$

gli autovalori di $p(A)$ sono gli zeri del suo polinomio caratteristico:

$$
\{\lambda\in\mathbb{C}:C_{p(A)}(\lambda)=0\}
$$

quindi

$$
C_{p(A)}(\lambda)=0
\iff
C_A\left(\frac{\lambda-a_0}{a_1}\right)=0
$$

il polinomio caratteristico di $A$ si annulla quando il suo argomento è uno degli autovalori di $A$.

Quindi

$$
\frac{\lambda-a_0}{a_1}\in\{\lambda_1,\ldots,\lambda_n\}
$$

cioè

$$
\frac{\lambda-a_0}{a_1}=\lambda_i
$$

per qualche $i$.

Da qui

$$
\lambda=a_0+a_1\lambda_i
$$

quindi gli autovalori di $p(A)$ sono

$$
a_0+a_1\lambda_1,\ldots,a_0+a_1\lambda_n
$$

cioè

$$
p(\lambda_1),\ldots,p(\lambda_n)
$$

- caso 3

assumiamo che $A$ sia diagonalizzabile.

Allora esistono una matrice invertibile

$$
X\in\mathbb{C}^{n\times n}
$$

e una matrice diagonale

$$
D=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)
$$

con gli autovalori di $A$ sulla diagonale, tali che

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
A^3=(XDX^{-1})(XDX^{-1})(XDX^{-1})=XD^3X^{-1}
$$

e in generale

$$
A^k=XD^kX^{-1}
$$

per ogni $k\geq 1$.

Per $k=0$, ricordiamo che

$$
A^0=I
$$

e si può scrivere anche

$$
I=XIX^{-1}
$$

vogliamo dimostrare il risultato per

$$
p(\lambda)=a_0+a_1\lambda+\cdots+a_m\lambda^m
$$

il polinomio nella matrice è

$$
p(A)=a_0I+a_1A+a_2A^2+\cdots+a_mA^m
$$

sostituiamo le potenze di $A$ usando la diagonalizzazione:

$$
p(A)=a_0XIX^{-1}+a_1XDX^{-1}+a_2XD^2X^{-1}+\cdots+a_mXD^mX^{-1}
$$

raccogliamo $X$ a sinistra e $X^{-1}$ a destra:

$$
p(A)=X(a_0I+a_1D+a_2D^2+\cdots+a_mD^m)X^{-1}
$$

la matrice al centro è proprio

$$
p(D)
$$

quindi

$$
p(A)=Xp(D)X^{-1}
$$

Ora vediamo com’è fatta $p(D)$.

Siccome

$$
D=
\begin{pmatrix}
\lambda_1 & 0 & \cdots & 0\\
0 & \lambda_2 & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & \lambda_n
\end{pmatrix}
$$

allora

$$
D^2=
\begin{pmatrix}
\lambda_1^2 & 0 & \cdots & 0\\
0 & \lambda_2^2 & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & \lambda_n^2
\end{pmatrix}
$$

e in generale

$$
D^m=
\begin{pmatrix}
\lambda_1^m & 0 & \cdots & 0\\
0 & \lambda_2^m & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & \lambda_n^m
\end{pmatrix}
$$

quindi

$$
p(D)=a_0I+a_1D+a_2D^2+\cdots+a_mD^m
$$

cioè

$$
p(D)=
\begin{pmatrix}
a_0+a_1\lambda_1+a_2\lambda_1^2+\cdots+a_m\lambda_1^m & 0 & \cdots & 0\\
0 & a_0+a_1\lambda_2+a_2\lambda_2^2+\cdots+a_m\lambda_2^m & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & a_0+a_1\lambda_n+a_2\lambda_n^2+\cdots+a_m\lambda_n^m
\end{pmatrix}
$$

ma ciascun elemento diagonale è proprio il polinomio valutato nell’autovalore corrispondente:

$$
p(D)=
\begin{pmatrix}
p(\lambda_1) & 0 & \cdots & 0\\
0 & p(\lambda_2) & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & p(\lambda_n)
\end{pmatrix}
$$

ora abbiamo dimostrato che

$$
p(A)=Xp(D)X^{-1}
$$

in questa formula stiamo dicendo diverse cose:

- $p(A)$ è diagonalizzabile
- gli elementi diagonali di $p(D)$ sono gli autovalori di $p(A)$
- quindi gli autovalori di $p(A)$ sono

$$
p(\lambda_1),p(\lambda_2),\ldots,p(\lambda_n)
$$

- le colonne di $X$ sono ancora autovettori, quindi $p(A)$ ha gli stessi autovettori di $A$ in questo caso diagonalizzabile

Infatti, se $x_i$ è la colonna $i$-esima di $X$, allora

$$
p(A)x_i=p(\lambda_i)x_i
$$

quindi $x_i$ è autovettore di $p(A)$ associato all’autovalore $p(\lambda_i)$.