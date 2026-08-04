# Teorema 3.2 — Autovalori di un polinomio di matrice

## Contesto

Stiamo studiando i **polinomi di matrici**.

Sia

[  
p(\lambda)=a_0+a_1\lambda+a_2\lambda^2+\cdots+a_m\lambda^m  
]

un polinomio.

Se

[  
A\in\mathbb{C}^{n\times n},  
]

allora definiamo

[  
p(A)=a_0I+a_1A+a_2A^2+\cdots+a_mA^m.  
]

Questa espressione ha senso perché stiamo sostituendo la matrice (A) alla variabile (\lambda). Il termine costante (a_0) diventa

[  
a_0I,  
]

perché dobbiamo sommare matrici della stessa dimensione.

Quindi

[  
p(A)\in\mathbb{C}^{n\times n}.  
]

L’obiettivo del teorema è capire quali sono gli autovalori della matrice (p(A)), partendo dagli autovalori della matrice (A). Nei tuoi appunti il risultato viene trattato distinguendo tre casi: polinomio costante, polinomio di grado (1), e caso diagonalizzabile generale.

---

# Enunciato

Sia

[  
p(\lambda)  
]

un polinomio e sia

[  
A\in\mathbb{C}^{n\times n}  
]

una matrice con autovalori

[  
\lambda_1,\lambda_2,\dots,\lambda_n.  
]

Allora gli autovalori di

[  
p(A)  
]

sono

[  
p(\lambda_1),p(\lambda_2),\dots,p(\lambda_n).  
]

In parole:

> per ottenere gli autovalori di (p(A)), si prende il polinomio (p) e lo si valuta sugli autovalori di (A).

Nel caso diagonalizzabile, se

[  
A=XDX^{-1},  
]

con

[  
D=\operatorname{diag}(\lambda_1,\dots,\lambda_n),  
]

allora

[  
p(A)=Xp(D)X^{-1},  
]

dove

[  
p(D)=\operatorname{diag}(p(\lambda_1),\dots,p(\lambda_n)).  
]

---

# Dimostrazione

Dimostriamo il risultato distinguendo tre casi.

---

# Caso 1 — (p) è costante

Supponiamo che

[  
p(\lambda)=a_0.  
]

Allora, sostituendo (A) al posto di (\lambda), otteniamo

[  
p(A)=a_0I.  
]

Quindi

# [  
p(A)

# a_0I

\begin{pmatrix}  
a_0 & 0 & \cdots & 0\  
0 & a_0 & \cdots & 0\  
\vdots & \vdots & & \vdots\  
0 & 0 & \cdots & a_0  
\end{pmatrix}.  
]

Questa è una matrice diagonale con tutti gli elementi diagonali uguali ad (a_0).

Ricordiamo che gli autovalori di una matrice diagonale sono gli elementi sulla diagonale. Quindi gli autovalori di (p(A)=a_0I) sono

[  
a_0,a_0,\dots,a_0.  
]

D’altra parte, poiché (p) è costante,

[  
p(\lambda_i)=a_0  
]

per ogni

[  
i=1,\dots,n.  
]

Quindi

[  
p(\lambda_1)=p(\lambda_2)=\cdots=p(\lambda_n)=a_0.  
]

Pertanto gli autovalori di (p(A)) sono proprio

[  
p(\lambda_1),p(\lambda_2),\dots,p(\lambda_n).  
]

Il risultato è quindi verificato nel caso costante.

---

## Spiegazione tramite definizione di autovalore

Possiamo anche vedere direttamente perché (a_0) è autovalore di (a_0I).

Sia

[  
v\in\mathbb{C}^n\setminus{0}.  
]

Allora

[  
(a_0I)v=a_0Iv.  
]

Poiché

[  
Iv=v,  
]

abbiamo

[  
(a_0I)v=a_0v.  
]

Quindi ogni vettore non nullo (v) è autovettore di (a_0I), associato all’autovalore

[  
a_0.  
]

---

# Caso 2 — (p) è di grado (1)

Supponiamo ora che

[  
p(\lambda)=a_0+a_1\lambda,  
]

con

[  
a_1\neq 0.  
]

Se (a_1=0), infatti, ricadremmo nel caso precedente.

Allora

[  
p(A)=a_0I+a_1A.  
]

Vogliamo dimostrare che gli autovalori di (p(A)) sono

[  
a_0+a_1\lambda_1,\dots,a_0+a_1\lambda_n.  
]

Cioè

[  
p(\lambda_1),\dots,p(\lambda_n).  
]

---

## Polinomio caratteristico di (p(A))

Ricordiamo che, se (B\in\mathbb{C}^{n\times n}), il suo polinomio caratteristico è

[  
C_B(\lambda)=\det(\lambda I-B).  
]

Nel nostro caso prendiamo

[  
B=p(A).  
]

Quindi

[  
C_{p(A)}(\lambda)=\det(\lambda I-p(A)).  
]

Poiché

[  
p(A)=a_0I+a_1A,  
]

otteniamo

# [  
C_{p(A)}(\lambda)

\det(\lambda I-(a_0I+a_1A)).  
]

Sviluppiamo l’espressione dentro il determinante:

# [  
\lambda I-(a_0I+a_1A)

\lambda I-a_0I-a_1A.  
]

Raccogliendo i termini con (I),

[  
\lambda I-a_0I=(\lambda-a_0)I.  
]

Quindi

# [  
C_{p(A)}(\lambda)

\det((\lambda-a_0)I-a_1A).  
]

Ora vogliamo raccogliere (a_1). Scriviamo:

# [  
(\lambda-a_0)I-a_1A

a_1\left(\frac{\lambda-a_0}{a_1}I-A\right).  
]

Verifichiamo questo passaggio:

# [  
a_1\left(\frac{\lambda-a_0}{a_1}I-A\right)

# a_1\frac{\lambda-a_0}{a_1}I-a_1A

(\lambda-a_0)I-a_1A.  
]

Quindi

# [  
C_{p(A)}(\lambda)

\det\left(  
a_1\left(\frac{\lambda-a_0}{a_1}I-A\right)  
\right).  
]

Adesso usiamo la proprietà del determinante:

[  
\det(\alpha B)=\alpha^n\det(B),  
]

per ogni

[  
\alpha\in\mathbb{C}  
]

e ogni matrice

[  
B\in\mathbb{C}^{n\times n}.  
]

Qui (\alpha=a_1) e

[  
B=  
\frac{\lambda-a_0}{a_1}I-A.  
]

Quindi

# [  
C_{p(A)}(\lambda)

a_1^n  
\det\left(  
\frac{\lambda-a_0}{a_1}I-A  
\right).  
]

---

## Riconoscimento del polinomio caratteristico di (A)

Il polinomio caratteristico di (A) è

[  
C_A(z)=\det(zI-A).  
]

Qui (z) è solo una variabile ausiliaria.

Nella nostra espressione compare

[  
\det\left(  
\frac{\lambda-a_0}{a_1}I-A  
\right).  
]

Questa ha la stessa forma di

[  
\det(zI-A),  
]

con

[  
z=\frac{\lambda-a_0}{a_1}.  
]

Quindi

# [  
\det\left(  
\frac{\lambda-a_0}{a_1}I-A  
\right)

C_A\left(\frac{\lambda-a_0}{a_1}\right).  
]

Pertanto

# [  
C_{p(A)}(\lambda)

a_1^n  
C_A\left(\frac{\lambda-a_0}{a_1}\right).  
]

---

## Zeri del polinomio caratteristico

Gli autovalori di una matrice sono gli zeri del suo polinomio caratteristico.

Quindi gli autovalori di (p(A)) sono i valori di (\lambda) tali che

[  
C_{p(A)}(\lambda)=0.  
]

Abbiamo appena ottenuto

# [  
C_{p(A)}(\lambda)

a_1^n  
C_A\left(\frac{\lambda-a_0}{a_1}\right).  
]

Poiché

[  
a_1\neq 0,  
]

abbiamo anche

[  
a_1^n\neq 0.  
]

Quindi il fattore (a_1^n) non influisce sugli zeri. Di conseguenza:

[  
C_{p(A)}(\lambda)=0  
]

se e solo se

[  
C_A\left(\frac{\lambda-a_0}{a_1}\right)=0.  
]

Ora, il polinomio caratteristico di (A) si annulla esattamente nei suoi autovalori. Quindi

[  
C_A(z)=0  
]

se e solo se

[  
z\in{\lambda_1,\dots,\lambda_n}.  
]

Nel nostro caso

[  
z=\frac{\lambda-a_0}{a_1}.  
]

Quindi

[  
C_A\left(\frac{\lambda-a_0}{a_1}\right)=0  
]

se e solo se

[  
\frac{\lambda-a_0}{a_1}\in{\lambda_1,\dots,\lambda_n}.  
]

Cioè esiste un indice (i\in{1,\dots,n}) tale che

[  
\frac{\lambda-a_0}{a_1}=\lambda_i.  
]

Risolviamo rispetto a (\lambda):

[  
\lambda-a_0=a_1\lambda_i,  
]

quindi

[  
\lambda=a_0+a_1\lambda_i.  
]

Ma

[  
p(\lambda_i)=a_0+a_1\lambda_i.  
]

Quindi gli autovalori di (p(A)) sono

[  
p(\lambda_1),p(\lambda_2),\dots,p(\lambda_n).  
]

Anche il caso di grado (1) è dimostrato.

---

# Caso 3 — Caso generale con (A) diagonalizzabile

Adesso consideriamo il caso generale in cui

[  
p(\lambda)=a_0+a_1\lambda+a_2\lambda^2+\cdots+a_m\lambda^m.  
]

Assumiamo che (A) sia diagonalizzabile.

Questo significa che esistono una matrice invertibile

[  
X\in\mathbb{C}^{n\times n}  
]

e una matrice diagonale

[  
D=\operatorname{diag}(\lambda_1,\dots,\lambda_n)  
]

tali che

[  
A=XDX^{-1}.  
]

La matrice (D) contiene gli autovalori di (A) sulla diagonale.

La matrice (X), invece, contiene nelle sue colonne gli autovettori di (A). Più precisamente, se

[  
x_1,\dots,x_n  
]

sono autovettori linearmente indipendenti associati rispettivamente agli autovalori

[  
\lambda_1,\dots,\lambda_n,  
]

allora

[  
X=  
\begin{pmatrix}  
| & | & & |\  
x_1 & x_2 & \cdots & x_n\  
| & | & & |  
\end{pmatrix}.  
]

L’ordine è importante: la colonna (x_i) di (X) corrisponde all’autovalore (\lambda_i) nella posizione diagonale (i)-esima di (D).

Infatti vale

[  
AX=XD.  
]

Perché

# [  
AX=A[x_1\ x_2\ \cdots\ x_n]

[Ax_1\ Ax_2\ \cdots\ Ax_n],  
]

e siccome

[  
Ax_i=\lambda_i x_i,  
]

si ha

[  
AX=[\lambda_1x_1\ \lambda_2x_2\ \cdots\ \lambda_nx_n].  
]

D’altra parte,

# [  
XD=[x_1\ x_2\ \cdots\ x_n]  
\begin{pmatrix}  
\lambda_1 & 0 & \cdots & 0\  
0 & \lambda_2 & \cdots & 0\  
\vdots & \vdots & & \vdots\  
0 & 0 & \cdots & \lambda_n  
\end{pmatrix}

[\lambda_1x_1\ \lambda_2x_2\ \cdots\ \lambda_nx_n].  
]

Quindi

[  
AX=XD.  
]

Moltiplicando a destra per (X^{-1}), otteniamo

[  
A=XDX^{-1}.  
]

---

## Potenze di (A)

Vogliamo studiare

[  
p(A)=a_0I+a_1A+a_2A^2+\cdots+a_mA^m.  
]

Per farlo, ci serve capire come si scrivono le potenze di (A) usando la diagonalizzazione.

Dato che

[  
A=XDX^{-1},  
]

allora

[  
A^2=(XDX^{-1})(XDX^{-1}).  
]

Per associatività del prodotto matriciale,

[  
A^2=XD(X^{-1}X)DX^{-1}.  
]

Poiché

[  
X^{-1}X=I,  
]

otteniamo

[  
A^2=XDID X^{-1}.  
]

Quindi

[  
A^2=XD^2X^{-1}.  
]

Allo stesso modo,

[  
A^3=(XDX^{-1})(XDX^{-1})(XDX^{-1}).  
]

Nel prodotto, ogni (X^{-1}X) diventa (I), quindi rimane

[  
A^3=XD^3X^{-1}.  
]

In generale,

[  
A^k=XD^kX^{-1},  
\qquad k\ge 1.  
]

Per (k=0), ricordiamo che

[  
A^0=I.  
]

Anche questo si può scrivere nella forma

[  
I=XIX^{-1},  
]

perché

[  
XIX^{-1}=XX^{-1}=I.  
]

---

## Calcolo di (p(A))

Ora partiamo dalla definizione di (p(A)):

[  
p(A)=a_0I+a_1A+a_2A^2+\cdots+a_mA^m.  
]

Sostituiamo:

[  
I=XIX^{-1},  
]

[  
A=XDX^{-1},  
]

[  
A^2=XD^2X^{-1},  
]

e in generale

[  
A^k=XD^kX^{-1}.  
]

Otteniamo

# [  
p(A)

a_0XIX^{-1}  
+a_1XDX^{-1}  
+a_2XD^2X^{-1}  
+\cdots  
+a_mXD^mX^{-1}.  
]

Ora raccogliamo (X) a sinistra e (X^{-1}) a destra.

Questo è possibile perché ogni termine ha la forma

[  
X(\text{qualcosa})X^{-1}.  
]

Quindi

# [  
p(A)

X(a_0I+a_1D+a_2D^2+\cdots+a_mD^m)X^{-1}.  
]

La matrice tra parentesi è, per definizione,

[  
p(D).  
]

Infatti

[  
p(D)=a_0I+a_1D+a_2D^2+\cdots+a_mD^m.  
]

Quindi abbiamo ottenuto la formula fondamentale:

[  
p(A)=Xp(D)X^{-1}.  
]

Questa formula è il collegamento tra l’inizio e la conclusione del caso 3.

All’inizio avevamo

[  
A=XDX^{-1}.  
]

Alla fine abbiamo dimostrato che

[  
p(A)=Xp(D)X^{-1}.  
]

Cioè: se diagonalizziamo (A), allora possiamo diagonalizzare anche (p(A)) usando la stessa matrice (X), ma sostituendo (D) con (p(D)).

---

## Com’è fatta (p(D))

Ora dobbiamo capire com’è fatta la matrice

[  
p(D).  
]

Poiché

[  
D=\operatorname{diag}(\lambda_1,\dots,\lambda_n),  
]

abbiamo

[  
D^2=\operatorname{diag}(\lambda_1^2,\dots,\lambda_n^2),  
]

[  
D^3=\operatorname{diag}(\lambda_1^3,\dots,\lambda_n^3),  
]

e in generale

[  
D^k=\operatorname{diag}(\lambda_1^k,\dots,\lambda_n^k).  
]

Quindi

[  
p(D)=a_0I+a_1D+a_2D^2+\cdots+a_mD^m.  
]

Poiché tutte queste matrici sono diagonali, anche la loro somma è diagonale.

L’elemento diagonale (i)-esimo è

[  
a_0+a_1\lambda_i+a_2\lambda_i^2+\cdots+a_m\lambda_i^m.  
]

Ma questa quantità è proprio

[  
p(\lambda_i).  
]

Quindi

[  
p(D)=  
\operatorname{diag}(p(\lambda_1),p(\lambda_2),\dots,p(\lambda_n)).  
]

Scritta esplicitamente:

[  
p(D)=  
\begin{pmatrix}  
p(\lambda_1) & 0 & \cdots & 0\  
0 & p(\lambda_2) & \cdots & 0\  
\vdots & \vdots & & \vdots\  
0 & 0 & \cdots & p(\lambda_n)  
\end{pmatrix}.  
]

---

# Conclusione del caso 3

Abbiamo dimostrato che

[  
p(A)=Xp(D)X^{-1},  
]

dove

[  
p(D)=\operatorname{diag}(p(\lambda_1),\dots,p(\lambda_n)).  
]

Ora ricordiamo la definizione di matrice diagonalizzabile.

Una matrice (B) è diagonalizzabile se esistono una matrice invertibile (Y) e una matrice diagonale (\Delta) tali che

[  
B=Y\Delta Y^{-1}.  
]

Nel nostro caso, prendendo

[  
B=p(A),  
]

abbiamo

[  
p(A)=Xp(D)X^{-1}.  
]

Qui:

- (X) è invertibile;
    
- (p(D)) è diagonale;
    
- (X^{-1}) è l’inversa di (X).
    

Quindi (p(A)) è diagonalizzabile.

Inoltre, quando una matrice è diagonalizzata nella forma

[  
B=Y\Delta Y^{-1},  
]

gli autovalori di (B) sono gli elementi diagonali di (\Delta).

Nel nostro caso la matrice diagonale è

[  
p(D).  
]

Gli elementi diagonali di (p(D)) sono

[  
p(\lambda_1),p(\lambda_2),\dots,p(\lambda_n).  
]

Quindi gli autovalori di (p(A)) sono

[  
p(\lambda_1),p(\lambda_2),\dots,p(\lambda_n).  
]

Questo dimostra il caso generale diagonalizzabile.

---

# Gli autovettori restano gli stessi

C’è anche una conclusione importante: nel caso diagonalizzabile, (p(A)) ha gli stessi autovettori di (A).

Infatti le colonne di (X) sono gli autovettori di (A). Ma nella diagonalizzazione

[  
p(A)=Xp(D)X^{-1}  
]

compare la stessa matrice (X). Quindi le colonne di (X) sono anche autovettori di (p(A)).

Vediamolo direttamente.

Sia (x_i) la colonna (i)-esima di (X). Allora

[  
Ax_i=\lambda_i x_i.  
]

Poiché

[  
p(A)=a_0I+a_1A+a_2A^2+\cdots+a_mA^m,  
]

applichiamo (p(A)) a (x_i):

# [  
p(A)x_i

(a_0I+a_1A+a_2A^2+\cdots+a_mA^m)x_i.  
]

Distribuendo:

# [  
p(A)x_i

a_0Ix_i+a_1Ax_i+a_2A^2x_i+\cdots+a_mA^mx_i.  
]

Ora, siccome

[  
Ax_i=\lambda_i x_i,  
]

si ha

[  
A^2x_i=\lambda_i^2x_i,  
]

[  
A^3x_i=\lambda_i^3x_i,  
]

e in generale

[  
A^kx_i=\lambda_i^kx_i.  
]

Quindi

# [  
p(A)x_i

a_0x_i+a_1\lambda_i x_i+a_2\lambda_i^2x_i+\cdots+a_m\lambda_i^m x_i.  
]

Raccogliendo (x_i):

# [  
p(A)x_i

(a_0+a_1\lambda_i+a_2\lambda_i^2+\cdots+a_m\lambda_i^m)x_i.  
]

La quantità tra parentesi è

[  
p(\lambda_i).  
]

Quindi

[  
p(A)x_i=p(\lambda_i)x_i.  
]

Questo significa che (x_i) è autovettore di (p(A)) associato all’autovalore

[  
p(\lambda_i).  
]

Quindi gli autovettori sono gli stessi, mentre gli autovalori vengono trasformati dal polinomio.

---

# Conclusione finale del Teorema 3.2

Abbiamo dimostrato che, se (A) è diagonalizzabile e ha autovalori

[  
\lambda_1,\dots,\lambda_n,  
]

allora

[  
p(A)  
]

è diagonalizzabile e i suoi autovalori sono

[  
p(\lambda_1),\dots,p(\lambda_n).  
]

La formula fondamentale è

[  
p(A)=Xp(D)X^{-1}.  
]

Questa formula nasce dalla diagonalizzazione di (A):

[  
A=XDX^{-1}.  
]

Poiché (p(D)) è diagonale e ha sulla diagonale i valori

[  
p(\lambda_1),\dots,p(\lambda_n),  
]

la matrice (p(A)) ha proprio questi come autovalori.

Da ricordare all’orale:

> Se (A) è diagonalizzabile, allora applicare un polinomio (p) ad (A) significa applicare (p) alla matrice diagonale degli autovalori. Gli autovettori restano gli stessi, mentre gli autovalori (\lambda_i) diventano (p(\lambda_i)).

