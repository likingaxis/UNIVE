# Teorema 3.10 — Formule per le norme matriciali (1), (2), (\infty)

Siamo nella sezione sulle **norme matriciali indotte**. Ricordiamo che una norma matriciale indotta nasce da una norma vettoriale. Per esempio, dalla norma vettoriale (1) si ottiene la norma matriciale (1), dalla norma vettoriale (2) si ottiene la norma matriciale (2), e dalla norma vettoriale (\infty) si ottiene la norma matriciale (\infty). Il libro introduce il Teorema 3.10 proprio per dare formule pratiche con cui calcolare queste tre norme.

Sia

[  
A=(a_{ij})\in\mathbb{C}^{n\times n}.  
]

Indichiamo con

[  
A_{[i]}  
]

la riga (i)-esima di (A), e con

[  
A^{[j]}  
]

la colonna (j)-esima di (A).

Quindi:

[  
A_{[i]}=(a_{i1},a_{i2},\dots,a_{in})  
]

è una riga, mentre

[  
A^{[j]}=  
\begin{pmatrix}  
a_{1j}\  
a_{2j}\  
\vdots\  
a_{nj}  
\end{pmatrix}  
]

è una colonna.

---

## Enunciato

Per ogni matrice

[  
A\in\mathbb{C}^{n\times n}  
]

valgono le seguenti formule:

[  
\boxed{  
|A|_1=  
\max_{j=1,\dots,n}  
\sum_{i=1}^n |a_{ij}|  
}  
]

cioè la norma (1) di (A) è il **massimo delle somme dei moduli lungo le colonne**.

Equivalentemente:

# [  
|A|_1

\max\left(  
|A^{[1]}|_1,  
|A^{[2]}|_1,  
\dots,  
|A^{[n]}|_1  
\right).  
]

Poi:

[  
\boxed{  
|A|_2=\sqrt{\rho(A^*A)}  
}  
]

dove (A^_) indica la matrice trasposta coniugata di (A). Se (A) è reale, allora (A^_=A^T). Inoltre (\rho(A^*A)) è il raggio spettrale di (A^*A), cioè il massimo dei moduli degli autovalori di (A^*A).

Infine:

[  
\boxed{  
|A|_\infty=  
\max_{i=1,\dots,n}  
\sum_{j=1}^n |a_{ij}|  
}  
]

cioè la norma infinito di (A) è il **massimo delle somme dei moduli lungo le righe**.

Equivalentemente:

# [  
|A|_\infty

\max\left(  
|A_{[1]}|_1,  
|A_{[2]}|_1,  
\dots,  
|A_{[n]}|_1  
\right).  
]

Queste sono esattamente le tre formule riportate dal Teorema 3.10.

---

# Come ricordarlo

La cosa più importante da memorizzare è:

[  
\boxed{  
|A|_1 = \text{massima somma per colonne}  
}  
]

[  
\boxed{  
|A|_\infty = \text{massima somma per righe}  
}  
]

[  
\boxed{  
|A|_2 = \sqrt{\rho(A^*A)}  
}  
]

Attenzione: la norma (2) non è, in generale,

[  
\rho(A).  
]

È invece

[  
\sqrt{\rho(A^*A)}.  
]

Questo perché la norma (2) misura il massimo allungamento euclideo prodotto dalla matrice (A), e questo massimo è legato agli autovalori della matrice (A^*A), non direttamente agli autovalori di (A).

---

# Dimostrazione della formula per (|A|_1)

Vogliamo capire perché

[  
|A|_1=  
\max_{j=1,\dots,n}  
\sum_{i=1}^n |a_{ij}|.  
]

Ricordiamo che la norma matriciale indotta è definita da

# [  
|A|_1

\max_{x\neq 0}  
\frac{|Ax|_1}{|x|_1}.  
]

Quindi dobbiamo capire quanto può diventare grande (|Ax|_1) rispetto a (|x|_1).

Sia

[  
x=  
\begin{pmatrix}  
x_1\  
x_2\  
\vdots\  
x_n  
\end{pmatrix}.  
]

La componente (i)-esima di (Ax) è

[  
(Ax)_i=\sum_{j=1}^n a_{ij}x_j.  
]

Allora

# [  
|Ax|_1

# \sum_{i=1}^n |(Ax)_i|

\sum_{i=1}^n  
\left|  
\sum_{j=1}^n a_{ij}x_j  
\right|.  
]

Usiamo la disuguaglianza triangolare:

[  
\left|  
\sum_{j=1}^n a_{ij}x_j  
\right|  
\leq  
\sum_{j=1}^n |a_{ij}||x_j|.  
]

Quindi

[  
|Ax|_1  
\leq  
\sum_{i=1}^n  
\sum_{j=1}^n |a_{ij}||x_j|.  
]

Ora scambiamo l’ordine delle somme:

# [  
\sum_{i=1}^n  
\sum_{j=1}^n |a_{ij}||x_j|

\sum_{j=1}^n  
\left(  
\sum_{i=1}^n |a_{ij}|  
\right)  
|x_j|.  
]

La quantità

[  
\sum_{i=1}^n |a_{ij}|  
]

è la somma dei moduli degli elementi della colonna (j)-esima.

Poniamo

[  
M=  
\max_{j=1,\dots,n}  
\sum_{i=1}^n |a_{ij}|.  
]

Allora ogni somma di colonna è minore o uguale a (M), quindi

[  
\sum_{j=1}^n  
\left(  
\sum_{i=1}^n |a_{ij}|  
\right)  
|x_j|  
\leq  
\sum_{j=1}^n M|x_j|.  
]

Quindi

# [  
|Ax|_1  
\leq  
M\sum_{j=1}^n |x_j|

M|x|_1.  
]

Questo ci dice che

[  
\frac{|Ax|_1}{|x|_1}\leq M  
\qquad \forall x\neq 0.  
]

Perciò

[  
|A|_1\leq M.  
]

Si può poi verificare che questa stima è effettivamente raggiungibile scegliendo un vettore (x) che seleziona la colonna con somma massima. Dunque

[  
|A|_1=M.  
]

Quindi

[  
\boxed{  
|A|_1=  
\max_{j=1,\dots,n}  
\sum_{i=1}^n |a_{ij}|  
}.  
]

---

# Dimostrazione della formula per (|A|_\infty)

La dimostrazione è simile, ma ora usiamo la norma infinito.

Per definizione,

# [  
|A|_\infty

\max_{x\neq 0}  
\frac{|Ax|_\infty}{|x|_\infty}.  
]

Ricordiamo che

[  
|x|_\infty=\max_j |x_j|.  
]

Per ogni componente di (Ax) abbiamo

[  
(Ax)_i=\sum_{j=1}^n a_{ij}x_j.  
]

Quindi

# [  
|(Ax)_i|

\left|  
\sum_{j=1}^n a_{ij}x_j  
\right|  
\leq  
\sum_{j=1}^n |a_{ij}||x_j|.  
]

Siccome

[  
|x_j|\leq |x|_\infty  
\qquad \forall j,  
]

otteniamo

# [  
|(Ax)_i|  
\leq  
\sum_{j=1}^n |a_{ij}||x|_\infty

\left(  
\sum_{j=1}^n |a_{ij}|  
\right)  
|x|_\infty.  
]

Ora prendiamo il massimo su (i):

# [  
|Ax|_\infty

\max_i |(Ax)_i|  
\leq  
\left(  
\max_{i=1,\dots,n}  
\sum_{j=1}^n |a_{ij}|  
\right)  
|x|_\infty.  
]

Ponendo

[  
M=  
\max_{i=1,\dots,n}  
\sum_{j=1}^n |a_{ij}|,  
]

otteniamo

[  
|Ax|_\infty\leq M|x|_\infty.  
]

Quindi

[  
|A|_\infty\leq M.  
]

Anche qui la stima è raggiungibile scegliendo un vettore (x) con componenti di modulo (1) e fasi adatte, in modo da allineare i termini della riga che realizza il massimo. Quindi

[  
|A|_\infty=M.  
]

Pertanto

[  
\boxed{  
|A|_\infty=  
\max_{i=1,\dots,n}  
\sum_{j=1}^n |a_{ij}|  
}.  
]

---

# Spiegazione della formula per (|A|_2)

La norma (2) è definita da

# [  
|A|_2

\max_{x\neq 0}  
\frac{|Ax|_2}{|x|_2}.  
]

Questa norma misura il massimo allungamento euclideo prodotto da (A).

Il Teorema 3.10 afferma che

[  
|A|_2=\sqrt{\rho(A^*A)}.  
]

Qui (A^*A) è una matrice importante perché, usando il prodotto scalare complesso, si ha

# [  
|Ax|_2^2

# (Ax)^*(Ax)

x^*A^*Ax.  
]

Quindi lo studio di (|Ax|_2) viene ricondotto allo studio della matrice

[  
A^*A.  
]

La matrice (A^*A) è hermitiana e semidefinita positiva, quindi i suoi autovalori sono reali e non negativi. Per questo ha senso prendere

[  
\sqrt{\rho(A^*A)}.  
]

In pratica:

# [  
\boxed{  
|A|_2

\sqrt{\text{massimo autovalore di }A^*A}  
}  
]

perché, essendo (A^*A) semidefinita positiva, il suo raggio spettrale coincide con il suo massimo autovalore.

---

# Frase da orale per il Teorema 3.10

> “Il Teorema 3.10 fornisce formule esplicite per calcolare le norme matriciali indotte (1), (2) e (\infty). La norma (1) è il massimo delle somme dei moduli lungo le colonne, la norma infinito è il massimo delle somme dei moduli lungo le righe, mentre la norma (2) è la radice quadrata del raggio spettrale di (A^*A). Queste formule sono utili perché evitano di dover calcolare direttamente il massimo nella definizione di norma indotta.”

---

# Teorema 3.11 — Equivalenza delle norme matriciali

Il Teorema 3.11 è l’analogo, per le matrici, del Teorema 3.8 sulle norme vettoriali. Il libro dice infatti che per le norme matriciali vale un teorema di equivalenza identico a quello visto per le norme vettoriali.

---

## Enunciato

Tutte le norme matriciali in

[  
\mathbb{C}^{n\times n}  
]

sono equivalenti.

Più precisamente, se prendiamo due norme matriciali

[  
|\cdot|'  
]

e

[  
|\cdot|''  
]

con

[  
|\cdot|',|\cdot|''  
:  
\mathbb{C}^{n\times n}\to\mathbb{R},  
]

allora esistono due costanti positive

[  
\alpha,\beta>0  
]

tali che

[  
\boxed{  
\alpha|A|''  
\leq  
|A|'  
\leq  
\beta|A|''  
\qquad  
\forall A\in\mathbb{C}^{n\times n}.  
}  
]

Le costanti (\alpha) e (\beta) sono indipendenti da (A). Possono dipendere dalle due norme scelte e dalla dimensione (n), ma non dalla matrice specifica (A). Questo è proprio ciò che viene specificato nell’enunciato del Teorema 3.11.

---

# Spiegazione dei simboli

Quando scriviamo

[  
|\cdot|',|\cdot|''  
:  
\mathbb{C}^{n\times n}\to\mathbb{R},  
]

intendiamo che queste norme prendono in input una matrice complessa

[  
A\in\mathbb{C}^{n\times n}  
]

e restituiscono un numero reale non negativo:

[  
|A|'\in\mathbb{R},  
\qquad  
|A|''\in\mathbb{R}.  
]

Quindi il simbolo

[  
\mathbb{R}  
]

si riferisce al codominio della norma, cioè al fatto che una norma restituisce un numero reale.

Le costanti

[  
\alpha,\beta>0  
]

sono anch’esse numeri reali positivi, ma non sono ciò a cui si riferisce direttamente la scrittura

[  
\mathbb{C}^{n\times n}\to\mathbb{R}.  
]

Quella scrittura descrive la funzione norma.

---

# Significato del teorema

Dire che due norme matriciali sono equivalenti significa che una può essere controllata dall’altra, a meno di costanti moltiplicative.

Quindi due norme matriciali diverse possono dare valori numerici diversi sulla stessa matrice, ma in dimensione finita non possono comportarsi in modo completamente diverso.

Per esempio, se una matrice ha norma piccola rispetto a una certa norma, allora avrà norma piccola anche rispetto a qualunque altra norma, magari moltiplicata per una costante.

Il messaggio principale è:

[  
\boxed{  
\text{in } \mathbb{C}^{n\times n}  
\text{ la convergenza di matrici non dipende dalla norma scelta.}  
}  
]

---

# Conseguenza sulle successioni di matrici

Una successione di matrici

[  
A^{(0)},A^{(1)},A^{(2)},\dots  
]

in

[  
\mathbb{C}^{n\times n}  
]

si dice convergente alla matrice

[  
A\in\mathbb{C}^{n\times n}  
]

rispetto alla norma matriciale (|\cdot|) se

[  
|A^{(k)}-A|\to 0  
\qquad \text{per } k\to+\infty.  
]

Il Teorema 3.11 implica che, se una successione converge rispetto a una norma matriciale, allora converge rispetto a tutte le norme matriciali.

Infatti, supponiamo che

[  
A^{(k)}\to A  
]

rispetto alla norma (|\cdot|). Questo significa che

[  
|A^{(k)}-A|\to 0.  
]

Sia ora

[  
|\cdot|'  
]

un’altra norma matriciale. Per il Teorema 3.11, esistono costanti positive

[  
\alpha,\beta>0  
]

tali che

[  
\alpha|B|  
\leq  
|B|'  
\leq  
\beta|B|  
\qquad  
\forall B\in\mathbb{C}^{n\times n}.  
]

Applichiamo questa disuguaglianza alla matrice

[  
B=A^{(k)}-A.  
]

Otteniamo

[  
\alpha|A^{(k)}-A|  
\leq  
|A^{(k)}-A|'  
\leq  
\beta|A^{(k)}-A|.  
]

Poiché

[  
|A^{(k)}-A|\to 0,  
]

anche

[  
\beta|A^{(k)}-A|\to 0.  
]

Inoltre

[  
|A^{(k)}-A|'\geq 0.  
]

Quindi, per il teorema del confronto,

[  
|A^{(k)}-A|'\to 0.  
]

Dunque

[  
A^{(k)}\to A  
]

anche rispetto alla norma (|\cdot|').

---

# Convergenza componente per componente

Una successione di matrici

[  
A^{(0)},A^{(1)},A^{(2)},\dots  
]

con

[  
A^{(k)}=(a_{ij}^{(k)})  
]

si dice convergente componente per componente alla matrice

[  
A=(a_{ij})  
]

se

[  
a_{ij}^{(k)}\to a_{ij}  
\qquad  
\forall i,j=1,\dots,n.  
]

Equivalentemente,

[  
|a_{ij}^{(k)}-a_{ij}|\to 0  
\qquad  
\forall i,j.  
]

Poiché gli elementi della matrice sono in numero finito, questa condizione equivale a dire che il massimo degli errori sulle componenti tende a zero:

[  
\max_{i,j=1,\dots,n}  
|a_{ij}^{(k)}-a_{ij}|  
\to 0.  
]

Ma questa quantità è proprio la norma

[  
|A^{(k)}-A|_\infty  
]

se consideriamo la matrice come un vettore con (n^2) componenti, cioè la norma data dal massimo modulo degli elementi.

Quindi:

[  
A^{(k)}\to A  
\text{ componente per componente}  
]

è equivalente a

[  
|A^{(k)}-A|_\infty\to 0.  
]

Poiché tutte le norme matriciali sono equivalenti, concludiamo che dire

[  
A^{(k)}\to A  
]

componente per componente è equivalente a dire che

[  
A^{(k)}\to A  
]

rispetto a una qualunque norma matriciale. Il libro afferma proprio questa conseguenza subito dopo il Teorema 3.11.

---

# Frase conclusiva da orale

> “Il Teorema 3.10 fornisce le formule pratiche per calcolare le norme matriciali (1), (2) e (\infty): la norma (1) è la massima somma per colonne, la norma infinito è la massima somma per righe, e la norma (2) è (\sqrt{\rho(A^*A)}). Il Teorema 3.11 dice invece che tutte le norme matriciali su (\mathbb{C}^{n\times n}) sono equivalenti. Quindi la convergenza di una successione di matrici non dipende dalla norma scelta; in particolare, la convergenza componente per componente coincide con la convergenza rispetto a una qualunque norma matriciale.”