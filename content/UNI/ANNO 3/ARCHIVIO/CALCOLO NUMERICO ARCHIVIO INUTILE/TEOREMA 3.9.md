# Teorema 3.9 — Proprietà delle norme matriciali indotte

Prima di enunciare il teorema, ricordiamo dove siamo.

Abbiamo una **norma vettoriale**

[  
|\cdot|:\mathbb{C}^n\to\mathbb{R}.  
]

Questa norma misura la grandezza dei vettori di (\mathbb{C}^n).

A partire da questa norma vettoriale, definiamo una **norma matriciale indotta** su (\mathbb{C}^{n\times n}) nel modo seguente:

# [  
|A|

\max_{x\neq 0}  
\frac{|Ax|}{|x|}.  
]

Questa è la definizione fondamentale. Il significato è che (|A|) misura il massimo fattore con cui la matrice (A) può aumentare la norma di un vettore non nullo.

La stessa definizione può essere scritta anche come

# [  
|A|

\max_{|x|=1}|Ax|.  
]

Infatti, invece di considerare tutti i vettori non nulli (x), possiamo limitarci ai vettori di norma (1), perché ogni vettore non nullo può essere normalizzato. Le dispense definiscono proprio così la norma matriciale indotta e osservano che viene indicata con lo stesso simbolo della norma vettoriale da cui deriva.

---

# Enunciato

Sia

[  
|\cdot|:\mathbb{C}^{n\times n}\to\mathbb{R}  
]

una norma matriciale indotta dalla norma vettoriale

[  
|\cdot|:\mathbb{C}^{n}\to\mathbb{R}.  
]

Siano

[  
A,B\in\mathbb{C}^{n\times n}.  
]

Allora valgono le seguenti proprietà:

[  
1.\qquad |I|=1.  
]

[  
2.\qquad |Ax|\leq |A||x|  
\qquad \forall x\in\mathbb{C}^n.  
]

[  
3.\qquad |A| \text{ è la più piccola costante } C  
\text{ tale che }  
|Ax|\leq C|x|  
\quad \forall x\in\mathbb{C}^n.  
]

[  
4.\qquad |AB|\leq |A||B|.  
]

Questa proprietà si chiama **submoltiplicatività**.

[  
5.\qquad \rho(A)\leq |A|.  
]

Dove (\rho(A)) è il **raggio spettrale** di (A), cioè il massimo dei moduli degli autovalori di (A):

[  
\rho(A)=\max{|\lambda|:\lambda \text{ autovalore di }A}.  
]

Le cinque proprietà sono esattamente quelle riportate dal Teorema 3.9 delle dispense.

---

# Dimostrazione del punto 1

Vogliamo dimostrare che

[  
|I|=1,  
]

dove (I) è la matrice identità.

Per definizione di norma matriciale indotta,

# [  
|I|

\max_{|x|=1}|Ix|.  
]

Ora, (I) è la matrice identità, quindi lascia invariato ogni vettore:

[  
Ix=x.  
]

Allora

# [  
|I|

\max_{|x|=1}|x|.  
]

Ma stiamo prendendo il massimo tra vettori (x) tali che

[  
|x|=1.  
]

Quindi per tutti questi vettori vale già

[  
|x|=1.  
]

Pertanto

[  
\max_{|x|=1}|x|=1.  
]

Quindi

[  
|I|=1.  
]

[  
\square  
]

---

# Dimostrazione del punto 2

Vogliamo dimostrare che

[  
|Ax|\leq |A||x|  
\qquad \forall x\in\mathbb{C}^n.  
]

Partiamo dal caso

[  
x\neq 0.  
]

Per definizione di norma matriciale indotta,

# [  
|A|

\max_{y\neq 0}  
\frac{|Ay|}{|y|}.  
]

Questo significa che (|A|) è il massimo di tutti i rapporti

[  
\frac{|Ay|}{|y|}  
]

al variare di (y\neq 0).

Se scelgo un vettore particolare (x\neq 0), allora il rapporto

[  
\frac{|Ax|}{|x|}  
]

è solo uno dei rapporti considerati nel massimo. Quindi deve essere minore o uguale al massimo:

# [  
\frac{|Ax|}{|x|}  
\leq  
\max_{y\neq 0}  
\frac{|Ay|}{|y|}

|A|.  
]

Moltiplicando entrambi i membri per (|x|), che è positivo perché (x\neq 0), otteniamo

[  
|Ax|\leq |A||x|.  
]

Resta il caso

[  
x=0.  
]

In questo caso

[  
Ax=A0=0,  
]

quindi

[  
|Ax|=|0|=0.  
]

Inoltre

[  
|A||x|=|A||0|=0.  
]

Quindi la disuguaglianza diventa

[  
0\leq 0,  
]

che è vera.

Pertanto

[  
|Ax|\leq |A||x|  
\qquad \forall x\in\mathbb{C}^n.  
]

[  
\square  
]

Questa è una proprietà fondamentale: dice che la norma di (Ax) è controllata dalla norma della matrice (A) moltiplicata per la norma del vettore (x).

---

# Dimostrazione del punto 3

Vogliamo dimostrare che (|A|) è la più piccola costante (C) tale che

[  
|Ax|\leq C|x|  
\qquad \forall x\in\mathbb{C}^n.  
]

Dal punto 2 sappiamo già che

[  
|Ax|\leq |A||x|  
\qquad \forall x\in\mathbb{C}^n.  
]

Quindi (|A|) è sicuramente una costante che soddisfa questa proprietà.

Ora dobbiamo dimostrare che è la **più piccola**.

Prendiamo una qualsiasi costante (C) tale che

[  
|Ax|\leq C|x|  
\qquad \forall x\in\mathbb{C}^n.  
]

Consideriamo un vettore non nullo (x\neq 0). Poiché (|x|>0), possiamo dividere per (|x|):

[  
\frac{|Ax|}{|x|}\leq C.  
]

Questa disuguaglianza vale per ogni (x\neq 0). Quindi anche il massimo di tutti questi rapporti sarà minore o uguale a (C):

[  
\max_{x\neq 0}  
\frac{|Ax|}{|x|}  
\leq C.  
]

Ma per definizione

# [  
\max_{x\neq 0}  
\frac{|Ax|}{|x|}

|A|.  
]

Quindi

[  
|A|\leq C.  
]

Abbiamo dimostrato che ogni costante (C) che soddisfa

[  
|Ax|\leq C|x|  
]

deve essere almeno grande quanto (|A|). Dunque (|A|) è la più piccola costante possibile.

[  
\square  
]

Questa proprietà è molto importante perché dice che (|A|) non è una costante qualunque: è la migliore costante possibile nella stima

[  
|Ax|\leq C|x|.  
]

---

# Dimostrazione del punto 4

Vogliamo dimostrare la **submoltiplicatività**:

[  
|AB|\leq |A||B|.  
]

Prendiamo un vettore qualunque

[  
x\in\mathbb{C}^n.  
]

Consideriamo

[  
ABx.  
]

Poiché il prodotto si legge da destra verso sinistra, prima (B) agisce su (x), producendo il vettore (Bx), poi (A) agisce su (Bx). Quindi

[  
ABx=A(Bx).  
]

Ora usiamo il punto 2, cioè

[  
|Ay|\leq |A||y|  
\qquad \forall y\in\mathbb{C}^n.  
]

Lo applichiamo una prima volta alla matrice (A) e al vettore

[  
y=Bx.  
]

Otteniamo

[  
|A(Bx)|\leq |A||Bx|.  
]

Cioè

[  
|ABx|\leq |A||Bx|.  
]

Adesso applichiamo di nuovo il punto 2, questa volta alla matrice (B) e al vettore (x):

[  
|Bx|\leq |B||x|.  
]

Sostituendo questa stima nella disuguaglianza precedente, otteniamo

[  
|ABx|  
\leq  
|A||Bx|  
\leq  
|A||B||x|.  
]

Quindi per ogni (x\in\mathbb{C}^n) vale

[  
|ABx|\leq |A||B||x|.  
]

Ora usiamo il punto 3.

Il punto 3 dice che (|AB|) è la più piccola costante (C) tale che

[  
|ABx|\leq C|x|  
\qquad \forall x\in\mathbb{C}^n.  
]

Noi abbiamo appena trovato una costante che funziona, cioè

[  
C=|A||B|.  
]

Infatti abbiamo dimostrato che

[  
|ABx|\leq |A||B||x|  
\qquad \forall x.  
]

Siccome (|AB|) è la più piccola costante con questa proprietà, deve valere

[  
|AB|\leq |A||B|.  
]

Quindi

[  
\boxed{|AB|\leq |A||B|}.  
]

[  
\square  
]

Questa proprietà è detta **submoltiplicatività** perché la norma del prodotto è minore o uguale al prodotto delle norme. Le dispense dimostrano esattamente questo passaggio usando due volte il punto 2 e poi il punto 3.

---

# Dimostrazione del punto 5

Vogliamo dimostrare che

[  
\rho(A)\leq |A|.  
]

Ricordiamo che (\rho(A)) è il raggio spettrale di (A), cioè

[  
\rho(A)=\max{|\lambda|:\lambda \text{ autovalore di }A}.  
]

Sia (\lambda) un autovalore di (A) di modulo massimo. Quindi

[  
|\lambda|=\rho(A).  
]

Sia

[  
x\neq 0  
]

un autovettore corrispondente a (\lambda). Per definizione di autovalore e autovettore, vale

[  
Ax=\lambda x.  
]

Ora prendiamo la norma di entrambi i membri:

[  
|Ax|=|\lambda x|.  
]

Usando l’omogeneità della norma vettoriale, cioè

[  
|\alpha x|=|\alpha||x|,  
]

otteniamo

[  
|\lambda x|=|\lambda||x|.  
]

Poiché (|\lambda|=\rho(A)), segue che

[  
|Ax|=\rho(A)|x|.  
]

Poiché (x\neq 0), possiamo dividere per (|x|):

[  
\rho(A)=\frac{|Ax|}{|x|}.  
]

Ora usiamo la definizione di norma matriciale indotta:

# [  
|A|

\max_{y\neq 0}  
\frac{|Ay|}{|y|}.  
]

Il rapporto

[  
\frac{|Ax|}{|x|}  
]

è uno dei rapporti considerati nel massimo. Quindi

# [  
\frac{|Ax|}{|x|}  
\leq  
\max_{y\neq 0}  
\frac{|Ay|}{|y|}

|A|.  
]

Pertanto

[  
\rho(A)\leq |A|.  
]

[  
\square  
]

Questa proprietà dice che qualunque norma matriciale indotta fornisce una stima superiore del raggio spettrale. Nelle dispense questo viene dimostrato scegliendo un autovalore di modulo massimo e un autovettore corrispondente.

---

# Conclusione da orale

Il Teorema 3.9 raccoglie le proprietà fondamentali delle norme matriciali indotte. La norma indotta nasce da una norma vettoriale e misura il massimo fattore di amplificazione della matrice sui vettori.

Le proprietà principali sono:

[  
|I|=1,  
]

cioè la matrice identità ha norma uno;

[  
|Ax|\leq |A||x|,  
]

cioè la norma di (Ax) è controllata dalla norma di (A) e dalla norma di (x);

[  
|A|  
]

è la più piccola costante che permette questa stima;

[  
|AB|\leq |A||B|,  
]

cioè la norma indotta è submoltiplicativa;

e infine

[  
\rho(A)\leq |A|,  
]

cioè il raggio spettrale è sempre minore o uguale a qualunque norma matriciale indotta.

La proprietà più importante per i teoremi successivi è spesso la submoltiplicatività, perché permette di stimare norme di prodotti di matrici, per esempio nelle successioni di potenze (A^k).