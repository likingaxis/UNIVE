# Teorema 1.3 — Forma di Newton del polinomio interpolante

Siano

[  
x_0,x_1,\dots,x_n  
]

(n+1) nodi distinti, e sia (f) una funzione assegnata su tali nodi.

Sia (p\in\mathbb{R}_n[x]) il polinomio d’interpolazione di (f) sui nodi

[  
x_0,x_1,\dots,x_n,  
]

cioè l’unico polinomio di grado minore o uguale a (n) tale che

[  
p(x_i)=f(x_i),\qquad i=0,\dots,n.  
]

Allora (p) può essere scritto nella **forma di Newton**

# [  
p(x)

f[x_0]  
+  
f[x_0,x_1](https://chatgpt.com/g/g-p-6a4e031cfb348191be43170d0fd1dd0f-calcolo-numerico/c/x-x_0)  
+  
f[x_0,x_1,x_2](https://chatgpt.com/g/g-p-6a4e031cfb348191be43170d0fd1dd0f-calcolo-numerico/c/x-x_0)(x-x_1)  
+\dots  
+  
f[x_0,\dots,x_n](https://chatgpt.com/g/g-p-6a4e031cfb348191be43170d0fd1dd0f-calcolo-numerico/c/x-x_0)(x-x_1)\cdots(x-x_{n-1}).  
]

In forma compatta:

# [  
p(x)

\sum_{k=0}^{n}  
f[x_0,\dots,x_k]  
\prod_{j=0}^{k-1}(x-x_j),  
]

dove, per (k=0), il prodotto vuoto vale (1).

I coefficienti

[  
f[x_0],\quad f[x_0,x_1],\quad \dots,\quad f[x_0,\dots,x_n]  
]

sono le **differenze divise** di (f), mentre i polinomi

[  
1,\quad  
(x-x_0),\quad  
(x-x_0)(x-x_1),\quad  
\dots,\quad  
(x-x_0)\cdots(x-x_{n-1})  
]

formano la **base di Newton**.

Quindi i coefficienti della forma di Newton non sono i fattori ((x-x_i)), ma sono le differenze divise.

---

# Corollario 1.1 — Invarianza della differenza divisa rispetto all’ordine dei nodi

## Enunciato

Siano

[  
x_0,x_1,\dots,x_n  
]

(n+1) nodi distinti, e sia (\sigma) una permutazione degli indici

[  
0,1,\dots,n.  
]

Allora la differenza divisa di ordine (n) non dipende dall’ordine con cui vengono scritti i nodi. Cioè

# [  
f[x_0,\dots,x_n]

f[x_{\sigma(0)},\dots,x_{\sigma(n)}].  
]

In altre parole, se considero gli stessi nodi ma li riordino, la differenza divisa di ordine massimo rimane la stessa.

---

# Dimostrazione

Consideriamo il polinomio interpolante (p\in\mathbb{R}_n[x]) relativo ai nodi

[  
x_0,x_1,\dots,x_n.  
]

Per il Teorema 1.3, possiamo scriverlo in forma di Newton come

# [  
p(x)

f[x_0]  
+  
f[x_0,x_1](https://chatgpt.com/g/g-p-6a4e031cfb348191be43170d0fd1dd0f-calcolo-numerico/c/x-x_0)  
+  
f[x_0,x_1,x_2](https://chatgpt.com/g/g-p-6a4e031cfb348191be43170d0fd1dd0f-calcolo-numerico/c/x-x_0)(x-x_1)  
+\dots  
+  
f[x_0,\dots,x_n](https://chatgpt.com/g/g-p-6a4e031cfb348191be43170d0fd1dd0f-calcolo-numerico/c/x-x_0)\cdots(x-x_{n-1}).  
]

Ora vogliamo osservare qual è il coefficiente direttore di (p), cioè il coefficiente davanti a (x^n).

Tutti i termini della forma di Newton prima dell’ultimo hanno grado al massimo (n-1). Infatti:

[  
f[x_0]  
]

ha grado (0),

[  
f[x_0,x_1](https://chatgpt.com/g/g-p-6a4e031cfb348191be43170d0fd1dd0f-calcolo-numerico/c/x-x_0)  
]

ha grado (1),

[  
f[x_0,x_1,x_2](https://chatgpt.com/g/g-p-6a4e031cfb348191be43170d0fd1dd0f-calcolo-numerico/c/x-x_0)(x-x_1)  
]

ha grado (2),

e così via.

L’unico termine che può produrre una potenza (x^n) è l’ultimo:

[  
f[x_0,\dots,x_n](https://chatgpt.com/g/g-p-6a4e031cfb348191be43170d0fd1dd0f-calcolo-numerico/c/x-x_0)(x-x_1)\cdots(x-x_{n-1}).  
]

Ora,

[  
(x-x_0)(x-x_1)\cdots(x-x_{n-1})  
]

è un polinomio monico di grado (n), perché è prodotto di (n) fattori lineari, ciascuno con coefficiente principale uguale a (1). Quindi

# [  
(x-x_0)(x-x_1)\cdots(x-x_{n-1})

x^n+\text{termini di grado minore}.  
]

Perciò l’ultimo termine diventa

[  
f[x_0,\dots,x_n]  
\left(  
x^n+\text{termini di grado minore}  
\right).  
]

Da qui segue che il coefficiente davanti a (x^n) nel polinomio (p(x)) è

[  
f[x_0,\dots,x_n].  
]

Quindi

[  
f[x_0,\dots,x_n]  
]

è il coefficiente direttore del polinomio interpolante (p).

---

Ora permutiamo i nodi. Consideriamo cioè l’ordine

[  
x_{\sigma(0)},x_{\sigma(1)},\dots,x_{\sigma(n)}.  
]

Il polinomio interpolante non cambia, perché i nodi sono gli stessi, solo scritti in ordine diverso. Infatti stiamo imponendo le stesse condizioni di interpolazione:

[  
p(x_i)=f(x_i),  
\qquad i=0,\dots,n.  
]

Per il Teorema 1.1, il polinomio interpolante in (\mathbb{R}_n[x]) è unico. Quindi, anche cambiando l’ordine dei nodi, il polinomio interpolante resta lo stesso.

Scriviamo allora lo stesso polinomio (p(x)) in forma di Newton usando l’ordine permutato:

# [  
p(x)

f[x_{\sigma(0)}]  
+  
f[x_{\sigma(0)},x_{\sigma(1)}](https://chatgpt.com/g/g-p-6a4e031cfb348191be43170d0fd1dd0f-calcolo-numerico/c/x-x_%7B%5Csigma\(0\)%7D)  
+\dots  
+  
f[x_{\sigma(0)},\dots,x_{\sigma(n)}]  
(x-x_{\sigma(0)})\cdots(x-x_{\sigma(n-1)}).  
]

Anche in questa scrittura, tutti i termini prima dell’ultimo hanno grado al massimo (n-1). L’unico termine di grado (n) è

[  
f[x_{\sigma(0)},\dots,x_{\sigma(n)}]  
(x-x_{\sigma(0)})\cdots(x-x_{\sigma(n-1)}).  
]

Il prodotto

[  
(x-x_{\sigma(0)})\cdots(x-x_{\sigma(n-1)})  
]

è ancora un polinomio monico di grado (n), quindi il coefficiente davanti a (x^n) in questa seconda scrittura è

[  
f[x_{\sigma(0)},\dots,x_{\sigma(n)}].  
]

Ma stiamo parlando dello stesso polinomio (p(x)). Uno stesso polinomio non può avere due coefficienti direttori diversi. Dunque i due coefficienti devono coincidere:

# [  
f[x_0,\dots,x_n]

f[x_{\sigma(0)},\dots,x_{\sigma(n)}].  
]

Questo dimostra il corollario.

---

# Conclusione

Il Teorema 1.3 ci dice che il polinomio interpolante può essere scritto nella forma di Newton, dove i coefficienti sono le differenze divise.

Il Corollario 1.1 sfrutta questa forma per osservare che la differenza divisa di ordine massimo

[  
f[x_0,\dots,x_n]  
]

è il coefficiente direttore del polinomio interpolante.

Poiché permutare i nodi non cambia il polinomio interpolante, non può cambiare nemmeno il suo coefficiente direttore. Quindi

# [  
f[x_0,\dots,x_n]

f[x_{\sigma(0)},\dots,x_{\sigma(n)}].  
]