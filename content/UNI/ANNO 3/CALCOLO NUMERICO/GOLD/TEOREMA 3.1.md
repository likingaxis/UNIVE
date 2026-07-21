# Teorema 3.1 — Caratterizzazioni delle matrici hermitiane definite positive

## Contesto

Questo teorema riguarda le matrici hermitiane, cioè matrici complesse

[  
A\in\mathbb{C}^{n\times n}  
]

tali che

[  
A=A^*.  
]

Qui (A^*) indica la matrice trasposta coniugata di (A). Quindi (A) è hermitiana se coincide con la propria trasposta coniugata.

Nel caso reale, una matrice hermitiana corrisponde a una matrice simmetrica, cioè

[  
A=A^T.  
]

Il teorema fornisce diverse condizioni equivalenti per dire che una matrice hermitiana è definita positiva.

---

# Enunciato

Sia

[  
A\in\mathbb{C}^{n\times n}  
]

una matrice hermitiana.

Siano

[  
A_1,A_2,\dots,A_n  
]

le sottomatrici principali di testa di (A). Cioè:

[  
A_1=  
\begin{pmatrix}  
a_{11}  
\end{pmatrix},  
]

[  
A_2=  
\begin{pmatrix}  
a_{11} & a_{12}\  
a_{21} & a_{22}  
\end{pmatrix},  
]

[  
A_3=  
\begin{pmatrix}  
a_{11} & a_{12} & a_{13}\  
a_{21} & a_{22} & a_{23}\  
a_{31} & a_{32} & a_{33}  
\end{pmatrix},  
]

e così via fino a

[  
A_n=A.  
]

Allora le seguenti condizioni sono equivalenti:

1. (A) è definita positiva;
    
2. per ogni vettore non nullo (x\in\mathbb{C}^n),
    

[  
x^*Ax>0;  
]

3. tutti gli autovalori di (A) sono reali e positivi;
    
4. tutti i determinanti delle sottomatrici principali di testa sono positivi, cioè
    

[  
\det(A_k)>0,  
\qquad k=1,\dots,n.  
]

Questo teorema vale sotto l’ipotesi fondamentale che (A) sia hermitiana.

---

# Osservazione importante

Per una matrice generica (A), non necessariamente hermitiana, la definizione di matrice definita positiva viene data tramite la parte reale della forma quadratica:

[  
\operatorname{Re}(x^*Ax)>0  
\qquad  
\forall x\in\mathbb{C}^n\setminus{0}.  
]

Se però (A) è hermitiana, allora

[  
x^*Ax\in\mathbb{R}  
]

per ogni (x\in\mathbb{C}^n).

Quindi

[  
\operatorname{Re}(x^*Ax)=x^*Ax.  
]

Perciò, nel caso hermitiano, la condizione di definita positività diventa semplicemente

[  
x^*Ax>0  
\qquad  
\forall x\neq 0.  
]

Questo è il motivo per cui, nel teorema, le condizioni 1 e 2 sono equivalenti.

---

# Nota sulla parte hermitiana di una matrice

Se (A) non è hermitiana, non possiamo applicare direttamente questo teorema ad (A). In quel caso si considera la parte hermitiana di (A):

[  
\operatorname{Re}(A)=\frac{A+A^*}{2}.  
]

Infatti questa matrice è hermitiana, perché

# [  
\left(\frac{A+A^_}{2}\right)^_

# \frac{A^*+A}{2}

\frac{A+A^*}{2}.  
]

Inoltre, per ogni (x\in\mathbb{C}^n),

# [  
x^*\operatorname{Re}(A)x

x^_\frac{A+A^_}{2}x.  
]

Quindi

# [  
x^*\operatorname{Re}(A)x

\frac{x^*Ax+x^*A^*x}{2}.  
]

Ora osserviamo che

[  
x^*A^*x=\overline{x^*Ax}.  
]

Dunque

# [  
x^*\operatorname{Re}(A)x

# \frac{x^*Ax+\overline{x^*Ax}}{2}

\operatorname{Re}(x^*Ax).  
]

Quindi

[  
\operatorname{Re}(x^*Ax)>0  
]

è equivalente a

[  
x^*\operatorname{Re}(A)x>0.  
]

Per questo motivo, se (A) non è hermitiana, si studia la definita positività di

[  
\operatorname{Re}(A)=\frac{A+A^*}{2},  
]

che invece è hermitiana.

---

# Dimostrazione di (1\iff 2)

Vogliamo dimostrare che, poiché (A) è hermitiana,

[  
A \text{ definita positiva}  
]

è equivalente a

[  
x^*Ax>0  
\qquad  
\forall x\neq 0.  
]

Per definizione generale, (A) è definita positiva se

[  
\operatorname{Re}(x^*Ax)>0  
\qquad  
\forall x\in\mathbb{C}^n\setminus{0}.  
]

Ora usiamo l’ipotesi che (A) sia hermitiana.

Se (A=A^*), allora per ogni (x\in\mathbb{C}^n), la quantità

[  
x^*Ax  
]

è reale.

Infatti, prendiamo il coniugato di (x^*Ax). Poiché (x^*Ax) è uno scalare, vale

[  
\overline{x^*Ax}=(x^_Ax)^_.  
]

Usando le proprietà della trasposta coniugata,

[  
(x^_Ax)^_=x^*A^*x.  
]

Ma (A) è hermitiana, quindi

[  
A^*=A.  
]

Pertanto

[  
(x^_Ax)^_=x^*Ax.  
]

Quindi

[  
\overline{x^*Ax}=x^*Ax.  
]

Uno scalare complesso uguale al proprio coniugato è reale. Dunque

[  
x^*Ax\in\mathbb{R}.  
]

Perciò

[  
\operatorname{Re}(x^*Ax)=x^*Ax.  
]

Allora la condizione

[  
\operatorname{Re}(x^*Ax)>0  
]

è equivalente a

[  
x^*Ax>0.  
]

Quindi

[  
A \text{ definita positiva}  
\iff  
x^*Ax>0  
\quad \forall x\neq 0.  
]

Questo dimostra

[  
1\iff 2.  
]

---

# Dimostrazione di (1\Rightarrow 3)

Supponiamo ora che (A) sia hermitiana e definita positiva.

Vogliamo dimostrare che tutti gli autovalori di (A) sono reali e positivi.

Prima osserviamo che, essendo (A) hermitiana, i suoi autovalori sono reali. Questo è un risultato fondamentale sulle matrici hermitiane.

Resta quindi da dimostrare che tali autovalori sono positivi.

Sia (\lambda) un autovalore di (A). Allora esiste un autovettore non nullo

[  
x\in\mathbb{C}^n\setminus{0}  
]

tale che

[  
Ax=\lambda x.  
]

Questa è la definizione di autovalore e autovettore.

Ora moltiplichiamo a sinistra per (x^*). Otteniamo

[  
x^_Ax=x^_(\lambda x).  
]

Poiché (\lambda) è uno scalare, può essere portato fuori dal prodotto:

[  
x^*(\lambda x)=\lambda x^*x.  
]

Quindi

[  
x^*Ax=\lambda x^*x.  
]

Adesso analizziamo (x^*x).

Se

[  
x=  
\begin{pmatrix}  
x_1\  
x_2\  
\vdots\  
x_n  
\end{pmatrix},  
]

allora

[  
x^*=  
\begin{pmatrix}  
\overline{x_1} & \overline{x_2} & \cdots & \overline{x_n}  
\end{pmatrix}.  
]

Perciò

# [  
x^*x

\overline{x_1}x_1+\overline{x_2}x_2+\cdots+\overline{x_n}x_n.  
]

Ma

[  
\overline{x_i}x_i=|x_i|^2.  
]

Quindi

# [  
x^*x

\sum_{i=1}^n |x_i|^2.  
]

Poiché (x\neq 0), almeno una componente (x_i) è diversa da zero. Pertanto

[  
\sum_{i=1}^n |x_i|^2>0.  
]

Quindi

[  
x^*x>0.  
]

Dalla relazione

[  
x^*Ax=\lambda x^*x  
]

otteniamo

[  
\lambda=\frac{x^*Ax}{x^*x}.  
]

Ora, siccome (A) è definita positiva e hermitiana, per quanto dimostrato in (1\iff 2) vale

[  
x^*Ax>0  
]

per ogni (x\neq 0).

In particolare, vale per l’autovettore (x) che stiamo considerando.

Abbiamo quindi:

[  
x^*Ax>0,  
]

e

[  
x^*x>0.  
]

Di conseguenza

[  
\lambda=\frac{x^*Ax}{x^*x}>0.  
]

Quindi ogni autovalore (\lambda) di (A) è positivo.

Poiché (A) è hermitiana, gli autovalori sono reali; e poiché abbiamo appena dimostrato che sono positivi, concludiamo che gli autovalori di (A) sono reali e positivi.

Questo dimostra

[  
1\Rightarrow 3.  
]

---

# Conclusione da orale

Il Teorema 3.1 dice che, per una matrice hermitiana, essere definita positiva equivale a molte proprietà diverse: la positività della forma quadratica, la positività degli autovalori e la positività dei minori principali di testa.

Nel caso hermitiano, la definita positività si scrive semplicemente come

[  
x^*Ax>0  
\qquad  
\forall x\neq 0,  
]

perché (x^*Ax) è reale.

Inoltre, se (A) è definita positiva e (Ax=\lambda x), allora

[  
x^*Ax=\lambda x^*x,  
]

da cui

[  
\lambda=\frac{x^*Ax}{x^*x}.  
]

Il numeratore è positivo per definita positività, il denominatore è positivo perché (x\neq 0), quindi

[  
\lambda>0.  
]

Quindi una matrice hermitiana definita positiva ha tutti gli autovalori reali e positivi.