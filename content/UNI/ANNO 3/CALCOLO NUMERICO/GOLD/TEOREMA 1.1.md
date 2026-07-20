# Teorema 1.1 — Esistenza e unicità del polinomio d’interpolazione

## Contesto

Siamo nel problema dell’**interpolazione polinomiale**. Abbiamo (n+1) punti

[  
(x_0,y_0),(x_1,y_1),\dots,(x_n,y_n)\in \mathbb{R}^2  
]

e vogliamo trovare un polinomio (p(x)) che passi esattamente per questi punti, cioè tale che

[  
p(x_i)=y_i \qquad \text{per ogni } i=0,\dots,n.  
]

L’idea è cercare questo polinomio nello spazio dei polinomi di grado al massimo (n), indicato con (\mathbb{R}_n[x]). Le dispense introducono il Teorema 1.1 proprio per garantire che tale polinomio esiste ed è unico.

---

## Richiami preliminari

### Che cosa significa (\mathbb{R}_n[x])

Con

[  
\mathbb{R}_n[x]  
]

si indica lo spazio vettoriale dei polinomi reali nella variabile (x) di grado minore o uguale a (n). Quindi

# [  
\mathbb{R}_n[x]

{a_0+a_1x+a_2x^2+\dots+a_nx^n:\ a_0,a_1,\dots,a_n\in\mathbb{R}}.  
]

Un generico polinomio (p\in \mathbb{R}_n[x]) si scrive quindi nella forma

[  
p(x)=a_0+a_1x+\dots+a_nx^n.  
]

Dire che (p\in\mathbb{R}_n[x]) non significa che (p) abbia necessariamente grado esattamente (n), ma che ha grado **al massimo** (n). Per esempio, (1+x\in\mathbb{R}_3[x]), perché ha grado (1\leq 3).

Inoltre,

[  
\dim(\mathbb{R}_n[x])=n+1,  
]

perché ogni polinomio di (\mathbb{R}_n[x]) è determinato dagli (n+1) coefficienti

[  
a_0,a_1,\dots,a_n.  
]

Una base naturale di (\mathbb{R}_n[x]) è

[  
1,x,x^2,\dots,x^n.  
]

---

## Enunciato

Siano

[  
(x_0,y_0),(x_1,y_1),\dots,(x_n,y_n)\in\mathbb{R}^2  
]

tali che i nodi

[  
x_0,x_1,\dots,x_n  
]

siano tutti distinti. Allora esiste un unico polinomio

[  
p(x)\in\mathbb{R}_n[x]  
]

tale che

[  
p(x_i)=y_i  
\qquad  
\text{per ogni } i=0,\dots,n.  
]

In altre parole: dati (n+1) punti con ascisse distinte, esiste ed è unico un polinomio di grado al massimo (n) che passa per tutti questi punti.

---

# Prima dimostrazione — Forma canonica e matrice di Vandermonde

## Idea della dimostrazione

Un polinomio (p\in\mathbb{R}_n[x]) è determinato dai suoi coefficienti

[  
a_0,a_1,\dots,a_n.  
]

Quindi cercare il polinomio interpolante significa cercare questi coefficienti. Imponendo le condizioni

[  
p(x_i)=y_i,  
]

otteniamo un sistema lineare nelle incognite (a_0,\dots,a_n). Se la matrice di questo sistema è invertibile, allora il sistema ha una e una sola soluzione, e quindi anche il polinomio interpolante esiste ed è unico.

---

## Dimostrazione

Consideriamo un generico polinomio

[  
p(x)=a_0+a_1x+a_2x^2+\dots+a_nx^n\in\mathbb{R}_n[x].  
]

Vogliamo imporre le condizioni di interpolazione

[  
p(x_i)=y_i  
\qquad  
i=0,\dots,n.  
]

Sostituendo (x=x_i) nell’espressione di (p(x)), otteniamo

[  
p(x_i)=a_0+a_1x_i+a_2x_i^2+\dots+a_nx_i^n.  
]

Quindi la condizione (p(x_i)=y_i) diventa

[  
a_0+a_1x_i+a_2x_i^2+\dots+a_nx_i^n=y_i.  
]

Facendo questo per tutti i nodi (x_0,\dots,x_n), otteniamo il sistema

[  
\begin{cases}  
a_0+a_1x_0+a_2x_0^2+\dots+a_nx_0^n=y_0,\  
a_0+a_1x_1+a_2x_1^2+\dots+a_nx_1^n=y_1,\  
a_0+a_1x_2+a_2x_2^2+\dots+a_nx_2^n=y_2,\  
\qquad\vdots\  
a_0+a_1x_n+a_2x_n^2+\dots+a_nx_n^n=y_n.  
\end{cases}  
]

Il “se e solo se” significa precisamente questo: un polinomio (p(x)) soddisfa le condizioni (p(x_i)=y_i) per ogni (i) **se e solo se** il suo vettore dei coefficienti

[  
(a_0,a_1,\dots,a_n)^T  
]

è soluzione di questo sistema lineare.

Quindi non stiamo ancora dicendo che il sistema abbia soluzione. Stiamo solo traducendo il problema:

[  
\text{trovare il polinomio interpolante}  
]

nel problema

[  
\text{trovare i coefficienti } a_0,\dots,a_n.  
]

Il sistema si può scrivere in forma matriciale come

# [  
\begin{pmatrix}  
1 & x_0 & x_0^2 & \cdots & x_0^n\  
1 & x_1 & x_1^2 & \cdots & x_1^n\  
1 & x_2 & x_2^2 & \cdots & x_2^n\  
\vdots & \vdots & \vdots & & \vdots\  
1 & x_n & x_n^2 & \cdots & x_n^n  
\end{pmatrix}  
\begin{pmatrix}  
a_0\  
a_1\  
a_2\  
\vdots\  
a_n  
\end{pmatrix}

\begin{pmatrix}  
y_0\  
y_1\  
y_2\  
\vdots\  
y_n  
\end{pmatrix}.  
]

La matrice

[  
V(x_0,\dots,x_n)=  
\begin{pmatrix}  
1 & x_0 & x_0^2 & \cdots & x_0^n\  
1 & x_1 & x_1^2 & \cdots & x_1^n\  
1 & x_2 & x_2^2 & \cdots & x_2^n\  
\vdots & \vdots & \vdots & & \vdots\  
1 & x_n & x_n^2 & \cdots & x_n^n  
\end{pmatrix}  
]

si chiama **matrice di Vandermonde** associata ai nodi (x_0,\dots,x_n).

Per concludere che il sistema ha una e una sola soluzione, vogliamo dimostrare che (V(x_0,\dots,x_n)) è invertibile.

Perché basta dimostrare che la matrice è invertibile? Perché un sistema quadrato

[  
A\mathbf{x}=\mathbf{b}  
]

con (A) invertibile ha soluzione unica, data da

[  
\mathbf{x}=A^{-1}\mathbf{b}.  
]

Infatti, moltiplicando a sinistra per (A^{-1}), otteniamo

[  
A^{-1}A\mathbf{x}=A^{-1}\mathbf{b}.  
]

Poiché

[  
A^{-1}A=I,  
]

segue che

[  
\mathbf{x}=A^{-1}\mathbf{b}.  
]

Questo dimostra sia l’esistenza sia l’unicità: la soluzione esiste perché è costruita esplicitamente come (A^{-1}\mathbf{b}), ed è unica perché ogni soluzione deve necessariamente essere uguale a (A^{-1}\mathbf{b}).

Nel nostro caso, quindi, se (V(x_0,\dots,x_n)) è invertibile, allora

# [  
\begin{pmatrix}  
a_0\  
a_1\  
\vdots\  
a_n  
\end{pmatrix}

[V(x_0,\dots,x_n)]^{-1}  
\begin{pmatrix}  
y_0\  
y_1\  
\vdots\  
y_n  
\end{pmatrix}.  
]

Dunque i coefficienti (a_0,\dots,a_n) sono determinati in modo unico, e quindi è determinato in modo unico anche il polinomio

[  
p(x)=a_0+a_1x+\dots+a_nx^n.  
]

Resta quindi da giustificare l’invertibilità della matrice di Vandermonde.

---

## Calcolo del determinante della matrice di Vandermonde

La formula generale del determinante di Vandermonde è

# [  
\det V(x_0,\dots,x_n)

\prod_{0\leq j<i\leq n}(x_i-x_j).  
]

Esplicitamente,

# [  
\det V(x_0,\dots,x_n)

(x_1-x_0)(x_2-x_0)(x_2-x_1)\cdots(x_n-x_0)\cdots(x_n-x_{n-1}).  
]

Se i nodi (x_0,\dots,x_n) sono distinti, ogni fattore (x_i-x_j) è diverso da zero. Quindi il prodotto è diverso da zero, e perciò la matrice di Vandermonde è invertibile.

Nelle dispense il calcolo viene mostrato esplicitamente nel caso (n=3), perché il procedimento generale è analogo e si può formalizzare per induzione. Vediamo il calcolo completo.

Poniamo

[  
d_3=\det V(x_0,x_1,x_2,x_3).  
]

Allora

[  
d_3=  
\begin{vmatrix}  
1 & x_0 & x_0^2 & x_0^3\  
1 & x_1 & x_1^2 & x_1^3\  
1 & x_2 & x_2^2 & x_2^3\  
1 & x_3 & x_3^2 & x_3^3  
\end{vmatrix}.  
]

Vogliamo trasformare questo determinante in modo da far comparire molti zeri nell’ultima riga. Usiamo operazioni sulle colonne che non cambiano il determinante: sottrarre a una colonna un multiplo di un’altra colonna non modifica il determinante.

Prima facciamo

[  
C_4 \leftarrow C_4-x_3C_3.  
]

Otteniamo

[  
d_3=  
\begin{vmatrix}  
1 & x_0 & x_0^2 & x_0^3-x_3x_0^2\  
1 & x_1 & x_1^2 & x_1^3-x_3x_1^2\  
1 & x_2 & x_2^2 & x_2^3-x_3x_2^2\  
1 & x_3 & x_3^2 & x_3^3-x_3x_3^2  
\end{vmatrix}.  
]

Nell’ultima riga l’ultimo elemento diventa

[  
x_3^3-x_3x_3^2=0.  
]

Inoltre, per le altre righe,

[  
x_i^3-x_3x_i^2=x_i^2(x_i-x_3).  
]

Quindi

[  
d_3=  
\begin{vmatrix}  
1 & x_0 & x_0^2 & x_0^2(x_0-x_3)\  
1 & x_1 & x_1^2 & x_1^2(x_1-x_3)\  
1 & x_2 & x_2^2 & x_2^2(x_2-x_3)\  
1 & x_3 & x_3^2 & 0  
\end{vmatrix}.  
]

Poi facciamo

[  
C_3 \leftarrow C_3-x_3C_2.  
]

Otteniamo

[  
d_3=  
\begin{vmatrix}  
1 & x_0 & x_0^2-x_3x_0 & x_0^2(x_0-x_3)\  
1 & x_1 & x_1^2-x_3x_1 & x_1^2(x_1-x_3)\  
1 & x_2 & x_2^2-x_3x_2 & x_2^2(x_2-x_3)\  
1 & x_3 & x_3^2-x_3x_3 & 0  
\end{vmatrix}.  
]

Poiché

[  
x_i^2-x_3x_i=x_i(x_i-x_3),  
]

e nell’ultima riga

[  
x_3^2-x_3x_3=0,  
]

si ha

[  
d_3=  
\begin{vmatrix}  
1 & x_0 & x_0(x_0-x_3) & x_0^2(x_0-x_3)\  
1 & x_1 & x_1(x_1-x_3) & x_1^2(x_1-x_3)\  
1 & x_2 & x_2(x_2-x_3) & x_2^2(x_2-x_3)\  
1 & x_3 & 0 & 0  
\end{vmatrix}.  
]

Infine facciamo

[  
C_2 \leftarrow C_2-x_3C_1.  
]

Otteniamo

[  
d_3=  
\begin{vmatrix}  
1 & x_0-x_3 & x_0(x_0-x_3) & x_0^2(x_0-x_3)\  
1 & x_1-x_3 & x_1(x_1-x_3) & x_1^2(x_1-x_3)\  
1 & x_2-x_3 & x_2(x_2-x_3) & x_2^2(x_2-x_3)\  
1 & x_3-x_3 & 0 & 0  
\end{vmatrix}.  
]

Quindi

[  
d_3=  
\begin{vmatrix}  
1 & x_0-x_3 & x_0(x_0-x_3) & x_0^2(x_0-x_3)\  
1 & x_1-x_3 & x_1(x_1-x_3) & x_1^2(x_1-x_3)\  
1 & x_2-x_3 & x_2(x_2-x_3) & x_2^2(x_2-x_3)\  
1 & 0 & 0 & 0  
\end{vmatrix}.  
]

Adesso sviluppiamo il determinante lungo l’ultima riga, perché contiene tre zeri. Rimane solo l’elemento in posizione ((4,1)), cioè (1). Il suo cofattore ha segno

[  
(-1)^{4+1}=(-1)^5=-1.  
]

La dispensa lo scrive come ((-1)^3), che è comunque uguale a (-1). Dunque

# [  
d_3

(-1)^3  
\begin{vmatrix}  
x_0-x_3 & x_0(x_0-x_3) & x_0^2(x_0-x_3)\  
x_1-x_3 & x_1(x_1-x_3) & x_1^2(x_1-x_3)\  
x_2-x_3 & x_2(x_2-x_3) & x_2^2(x_2-x_3)  
\end{vmatrix}.  
]

Ora raccogliamo il fattore comune ((x_0-x_3)) dalla prima riga, ((x_1-x_3)) dalla seconda riga, e ((x_2-x_3)) dalla terza riga:

# [  
d_3

(-1)^3  
(x_0-x_3)(x_1-x_3)(x_2-x_3)  
\begin{vmatrix}  
1 & x_0 & x_0^2\  
1 & x_1 & x_1^2\  
1 & x_2 & x_2^2  
\end{vmatrix}.  
]

Il determinante rimasto è proprio

[  
d_2=\det V(x_0,x_1,x_2).  
]

Quindi

# [  
d_3

(-1)^3  
(x_0-x_3)(x_1-x_3)(x_2-x_3)d_2.  
]

Poiché

# [  
(-1)^3(x_0-x_3)(x_1-x_3)(x_2-x_3)

(x_3-x_0)(x_3-x_1)(x_3-x_2),  
]

otteniamo

[  
d_3=(x_3-x_0)(x_3-x_1)(x_3-x_2)d_2.  
]

Ora si applica lo stesso ragionamento a (d_2). Si ottiene

[  
d_2=(x_2-x_0)(x_2-x_1)d_1.  
]

Infine

# [  
d_1=  
\det V(x_0,x_1)

# \begin{vmatrix}  
1 & x_0\  
1 & x_1  
\end{vmatrix}

x_1-x_0.  
]

Quindi

# [  
d_3

(x_3-x_0)(x_3-x_1)(x_3-x_2)  
(x_2-x_0)(x_2-x_1)  
(x_1-x_0).  
]

Questa è proprio la formula

[  
d_3=  
\prod_{0\leq j<i\leq 3}(x_i-x_j).  
]

Nel caso generale si ottiene analogamente

# [  
\det V(x_0,\dots,x_n)

\prod_{0\leq j<i\leq n}(x_i-x_j).  
]

Poiché per ipotesi i nodi (x_0,\dots,x_n) sono tutti distinti, se (i\neq j) allora

[  
x_i-x_j\neq 0.  
]

Dunque tutti i fattori della produttoria sono non nulli, e quindi

[  
\det V(x_0,\dots,x_n)\neq 0.  
]

Pertanto la matrice di Vandermonde è invertibile.

Di conseguenza il sistema lineare nei coefficienti (a_0,\dots,a_n) ha un’unica soluzione. Quindi esiste un unico vettore dei coefficienti

[  
(a_0,\dots,a_n)^T,  
]

e quindi esiste un unico polinomio

[  
p(x)=a_0+a_1x+\dots+a_nx^n  
]

che soddisfa

[  
p(x_i)=y_i  
\qquad  
i=0,\dots,n.  
]

Questo conclude la prima dimostrazione.

---

# Seconda dimostrazione — Forma di Lagrange

## Idea della dimostrazione

Invece di cercare i coefficienti nella forma canonica

[  
p(x)=a_0+a_1x+\dots+a_nx^n,  
]

costruiamo direttamente dei polinomi speciali (L_0,\dots,L_n), detti **polinomi fondamentali di Lagrange**, tali che ciascuno di essi valga (1) in un nodo e (0) in tutti gli altri.

Questa proprietà ci permette di costruire direttamente il polinomio interpolante:

[  
p(x)=y_0L_0(x)+y_1L_1(x)+\dots+y_nL_n(x).  
]

---

## Definizione dei polinomi di Lagrange

Per ogni (j=0,\dots,n), definiamo

# [  
L_j(x)

\prod_{\substack{k=0\ k\neq j}}^n  
\frac{x-x_k}{x_j-x_k}.  
]

Esplicitamente,

# [  
L_j(x)

\frac{(x-x_0)\cdots(x-x_{j-1})(x-x_{j+1})\cdots(x-x_n)}  
{(x_j-x_0)\cdots(x_j-x_{j-1})(x_j-x_{j+1})\cdots(x_j-x_n)}.  
]

Questa definizione è ben posta perché i nodi sono distinti. Infatti, se (k\neq j), allora

[  
x_j\neq x_k,  
]

quindi

[  
x_j-x_k\neq 0.  
]

Pertanto nessun denominatore si annulla.

Perché (L_j(x)) ha grado (n)? Nel prodotto l’indice (k) va da (0) a (n), ma viene escluso (k=j). Quindi ci sono

[  
n+1-1=n  
]

fattori. Ogni fattore

[  
\frac{x-x_k}{x_j-x_k}  
]

è un polinomio di grado (1) nella variabile (x), moltiplicato per una costante non nulla. Il prodotto di (n) fattori lineari ha grado (n). Quindi

[  
L_j(x)\in\mathbb{R}_n[x].  
]

---

## Proprietà fondamentale dei polinomi di Lagrange

Vogliamo calcolare (L_j(x_i)). Ci sono due casi.

Se (i=j), allora

# [  
L_j(x_j)

# \prod_{\substack{k=0\ k\neq j}}^n  
\frac{x_j-x_k}{x_j-x_k}

# \prod_{\substack{k=0\ k\neq j}}^n 1

]

Se invece (i\neq j), allora nel prodotto che definisce (L_j(x_i)) compare il fattore corrispondente a (k=i), perché (i\neq j) e quindi (k=i) non è escluso. Tale fattore è

[  
\frac{x_i-x_i}{x_j-x_i}=0.  
]

Quindi tutto il prodotto si annulla:

[  
L_j(x_i)=0.  
]

Riassumendo,

[  
L_j(x_i)=  
\begin{cases}  
1 & \text{se } i=j,\  
0 & \text{se } i\neq j.  
\end{cases}  
]

Questa proprietà si può anche scrivere come

[  
L_j(x_i)=\delta_{ij},  
]

dove (\delta_{ij}) è il simbolo di Kronecker.

---

## Perché dimostriamo che gli (L_j) formano una base

Dimostriamo che

[  
L_0(x),L_1(x),\dots,L_n(x)  
]

formano una base di (\mathbb{R}_n[x]) perché, se sono una base, allora ogni polinomio (q\in\mathbb{R}_n[x]) può essere scritto in modo unico come combinazione lineare di essi:

[  
q(x)=\beta_0L_0(x)+\beta_1L_1(x)+\dots+\beta_nL_n(x).  
]

Questo sarà fondamentale per dimostrare l’unicità.

Sappiamo che (\mathbb{R}_n[x]) ha dimensione (n+1), e abbiamo esattamente (n+1) polinomi:

[  
L_0,\dots,L_n.  
]

Quindi, per dimostrare che sono una base, basta dimostrare che sono linearmente indipendenti.

---

## Indipendenza lineare degli (L_j)

Prendiamo una combinazione lineare generica:

[  
\alpha_0L_0(x)+\alpha_1L_1(x)+\dots+\alpha_nL_n(x).  
]

Supponiamo che questa combinazione coincida con il polinomio nullo, cioè

[  
\alpha_0L_0(x)+\alpha_1L_1(x)+\dots+\alpha_nL_n(x)=0  
\qquad  
\text{per ogni } x\in\mathbb{R}.  
]

Per dimostrare l’indipendenza lineare, dobbiamo provare che necessariamente

[  
\alpha_0=\alpha_1=\dots=\alpha_n=0.  
]

Poiché l’uguaglianza vale per ogni (x), possiamo valutarla in particolare nei nodi.

Valutiamo in (x_i). Otteniamo

[  
\alpha_0L_0(x_i)+\alpha_1L_1(x_i)+\dots+\alpha_nL_n(x_i)=0.  
]

Ma, per la proprietà fondamentale dei polinomi di Lagrange,

[  
L_j(x_i)=0 \quad \text{se } j\neq i,  
]

mentre

[  
L_i(x_i)=1.  
]

Quindi tutti i termini si annullano tranne quello con indice (i), e rimane

[  
\alpha_i=0.  
]

Siccome questo vale per ogni (i=0,\dots,n), otteniamo

[  
\alpha_0=\alpha_1=\dots=\alpha_n=0.  
]

Dunque (L_0,\dots,L_n) sono linearmente indipendenti. Essendo (n+1) polinomi linearmente indipendenti in uno spazio di dimensione (n+1), essi formano una base di (\mathbb{R}_n[x]).

---

## Esistenza del polinomio interpolante

Definiamo

[  
p(x)=y_0L_0(x)+y_1L_1(x)+\dots+y_nL_n(x).  
]

Poiché ogni (L_j\in\mathbb{R}_n[x]), e (\mathbb{R}_n[x]) è uno spazio vettoriale, anche (p\in\mathbb{R}_n[x]).

Ora verifichiamo che (p) interpola i dati. Fissiamo un indice (i\in{0,\dots,n}). Allora

# [  
p(x_i)

y_0L_0(x_i)+y_1L_1(x_i)+\dots+y_nL_n(x_i).  
]

Usando la proprietà dei polinomi di Lagrange, tutti i termini si annullano tranne quello con indice (i), perché

[  
L_j(x_i)=0 \quad \text{se } j\neq i,  
]

mentre

[  
L_i(x_i)=1.  
]

Quindi

[  
p(x_i)=y_iL_i(x_i)=y_i.  
]

Pertanto

[  
p(x_i)=y_i  
\qquad  
\text{per ogni } i=0,\dots,n.  
]

Abbiamo quindi costruito un polinomio (p\in\mathbb{R}_n[x]) che interpola i dati. Questo dimostra l’esistenza.

---

## Unicità del polinomio interpolante

Supponiamo ora che esista un altro polinomio

[  
q(x)\in\mathbb{R}_n[x]  
]

tale che

[  
q(x_i)=y_i  
\qquad  
\text{per ogni } i=0,\dots,n.  
]

Vogliamo dimostrare che (q=p).

Poiché (L_0,\dots,L_n) formano una base di (\mathbb{R}_n[x]), possiamo scrivere (q) come combinazione lineare degli (L_j):

[  
q(x)=\beta_0L_0(x)+\beta_1L_1(x)+\dots+\beta_nL_n(x),  
]

per opportuni coefficienti (\beta_0,\dots,\beta_n\in\mathbb{R}).

Valutiamo questa uguaglianza nel nodo (x_i). Otteniamo

# [  
q(x_i)

\beta_0L_0(x_i)+\beta_1L_1(x_i)+\dots+\beta_nL_n(x_i).  
]

Ancora una volta, tutti i termini si annullano tranne quello con indice (i), quindi

[  
q(x_i)=\beta_i.  
]

Ma per ipotesi (q) interpola i dati, quindi

[  
q(x_i)=y_i.  
]

Di conseguenza

[  
\beta_i=y_i.  
]

Questo vale per ogni (i=0,\dots,n). Dunque

[  
q(x)=y_0L_0(x)+y_1L_1(x)+\dots+y_nL_n(x).  
]

Ma il membro di destra è proprio il polinomio (p(x)) che abbiamo costruito prima. Quindi

[  
q(x)=p(x).  
]

Pertanto non può esistere un secondo polinomio interpolante diverso da (p). Questo dimostra l’unicità.

---

# Conclusione del teorema

Abbiamo dimostrato che, dati (n+1) punti

[  
(x_0,y_0),\dots,(x_n,y_n)  
]

con nodi (x_0,\dots,x_n) distinti, esiste un unico polinomio

[  
p\in\mathbb{R}_n[x]  
]

tale che

[  
p(x_i)=y_i  
\qquad  
i=0,\dots,n.  
]

La prima dimostrazione fornisce la **forma canonica** del polinomio, perché determina i coefficienti tramite il sistema di Vandermonde:

[  
p(x)=a_0+a_1x+\dots+a_nx^n.  
]

La seconda dimostrazione fornisce direttamente la **forma di Lagrange**:

[  
p(x)=\sum_{j=0}^n y_jL_j(x),  
]

dove

# [  
L_j(x)

\prod_{\substack{k=0\ k\neq j}}^n  
\frac{x-x_k}{x_j-x_k}.  
]

Quindi il Teorema 1.1 garantisce sia l’esistenza sia l’unicità del polinomio d’interpolazione.