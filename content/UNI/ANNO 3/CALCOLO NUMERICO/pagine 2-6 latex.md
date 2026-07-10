# 0. Panoramica della lezione

Le pagine 2-6 introducono il primo grande argomento del corso: **l’interpolazione polinomiale**. 

L’idea centrale è questa:

> dati alcuni punti del piano, vogliamo costruire un polinomio che passi esattamente per tutti quei punti.

I risultati principali sono:

1. esistenza del polinomio interpolante;
2. unicità del polinomio interpolante;
3. rappresentazione in forma canonica;
4. matrice di Vandermonde;
5. determinante della matrice di Vandermonde;
6. polinomi fondamentali di Lagrange;
7. forma di Lagrange del polinomio interpolante;
8. passaggio dalla forma di Lagrange alla forma canonica.

## Macroargomento del corso

Queste pagine appartengono a:

> **interpolazione polinomiale**

## Perché è importante

L’interpolazione permette di ricostruire una funzione quando ne conosciamo solo alcuni valori.

Per esempio, possiamo conoscere una grandezza fisica solo attraverso misurazioni:

$$
(x_0,y_0),\quad (x_1,y_1),\quad \ldots,\quad (x_n,y_n).
$$

Non conosciamo necessariamente la formula esatta della funzione che ha generato i dati. Costruiamo allora un polinomio $p(x)$ che soddisfi

$$
p(x_i)=y_i.
$$

Una volta ottenuto $p$, possiamo:

* stimare valori della funzione tra i nodi;
* calcolare approssimazioni;
* derivare o integrare il polinomio;
* costruire formule di integrazione numerica;
* studiare l’errore di interpolazione.

L’interpolazione sarà infatti la base teorica di altri argomenti, come le formule di quadratura.

## Prerequisiti

Servono alcuni richiami:

* polinomi e grado;
* sistemi lineari;
* determinante;
* invertibilità di una matrice;
* spazi vettoriali;
* base e dimensione;
* indipendenza lineare;
* sviluppo di Laplace;
* prodotto e fattorizzazione di polinomi.

## Esercizi d’esame collegati

Gli esercizi tipici sono:

* costruire il polinomio interpolante in forma di Lagrange;
* trasformarlo in forma canonica;
* costruire e risolvere il sistema di Vandermonde;
* verificare che un polinomio interpoli certi dati;
* dimostrare proprietà dei polinomi di Lagrange;
* riconoscere quando l’interpolante ha grado minore di $n$;
* dimostrare identità usando l’unicità dell’interpolante.

## Possibili domande all’orale

Il professore potrebbe chiedere:

* enunciare il teorema di esistenza e unicità;
* spiegare perché i nodi devono essere distinti;
* definire la matrice di Vandermonde;
* dimostrare la formula del suo determinante;
* definire i polinomi di Lagrange;
* dimostrare che $L_j(x_i)=\delta_{ij}$;
* dimostrare che i polinomi di Lagrange formano una base;
* ricavare la forma di Lagrange;
* spiegare le due dimostrazioni del teorema;
* confrontare forma canonica e forma di Lagrange.

---

# Indice ragionato

1. Il problema dell’interpolazione.
2. Lo spazio $\mathbb R_n[x]$.
3. Teorema di esistenza e unicità.
4. Prima dimostrazione: sistema di Vandermonde.
5. Determinante di Vandermonde.
6. Seconda dimostrazione: base di Lagrange.
7. Forma canonica e forma di Lagrange.
8. Esempio con $\sin x$.
9. Collegamenti con gli esercizi.
10. Schema operativo da esame.
11. Riassunto.
12. Domande di controllo.

---

# 1. Contesto generale

## 1.1 Il problema matematico

Supponiamo di avere una funzione

$$
f:[a,b]\to \mathbb R.
$$

Non conosciamo necessariamente tutta la funzione. Conosciamo soltanto i suoi valori in $n+1$ punti distinti:

$$
x_0,x_1,\ldots,x_n.
$$

I valori noti sono:

$$
f(x_0),f(x_1),\ldots,f(x_n).
$$

Cerchiamo una funzione più semplice $p(x)$ che coincida con $f$ nei punti conosciuti:

$$
p(x_i)=f(x_i),\qquad i=0,\ldots,n.
$$

I punti $x_i$ si chiamano **nodi di interpolazione**.

I valori

$$
y_i=f(x_i)
$$

si chiamano **valori interpolati** o dati.

## 1.2 Perché usare un polinomio

I polinomi sono semplici da:

* valutare;
* derivare;
* integrare;
* manipolare algebricamente;
* memorizzare;
* usare negli algoritmi numerici.

Per questo si cerca $p$ nello spazio dei polinomi di grado al massimo $n$.

## 1.3 Interpolazione e approssimazione

È importante distinguere due concetti.

### Interpolazione

Nei nodi il valore deve essere esatto:

$$
p(x_i)=f(x_i).
$$

Il polinomio passa esattamente per i punti assegnati.

### Approssimazione

In generale si cerca una funzione vicina ai dati, ma non necessariamente passante per tutti.

Per esempio, nel metodo dei minimi quadrati non si impone sempre il passaggio esatto per ogni punto.

In queste pagine si parla di **interpolazione esatta**.

---

# 2. Lo spazio dei polinomi $\mathbb R_n[x]$

Le dispense definiscono

$$
\mathbb R_n[x]
=
\left\{
a_0+a_1x+a_2x^2+\cdots+a_nx^n:
a_0,\ldots,a_n\in\mathbb R
\right\}.
$$

## Significato

$\mathbb R_n[x]$ è l’insieme di tutti i polinomi reali di grado al massimo $n$.

La frase “grado al massimo $n$” comprende anche polinomi di grado minore.

Per esempio, in $\mathbb R_3[x]$ appartengono:

$$
2+3x-x^3,
$$

ma anche:

$$
4-x,
$$

e anche il polinomio costante:

$$
7.
$$

Il coefficiente di $x^3$ può infatti essere nullo.

## Forma canonica

La scrittura

$$
p(x)=a_0+a_1x+\cdots+a_nx^n
$$

si chiama **forma canonica** del polinomio.

La base canonica è:

$$
1,x,x^2,\ldots,x^n.
$$

Ogni polinomio di $\mathbb R_n[x]$ si scrive in modo unico come combinazione lineare di questi elementi.

## Dimensione

Lo spazio $\mathbb R_n[x]$ ha dimensione

$$
\dim\mathbb R_n[x]=n+1.
$$

Questo perché la base canonica contiene $n+1$ elementi:

$$
1,x,\ldots,x^n.
$$

Questo fatto è essenziale.

Abbiamo:

* $n+1$ coefficienti sconosciuti;
* $n+1$ condizioni di interpolazione.

Le condizioni sono:

$$
p(x_0)=y_0,\ldots,p(x_n)=y_n.
$$

Non basta però contare le equazioni. Dobbiamo dimostrare che le condizioni sono indipendenti. Questo sarà garantito dal fatto che i nodi sono distinti.

---

# 3. Teorema di esistenza e unicità

## Teorema 1.1

Siano

$$
(x_0,y_0),(x_1,y_1),\ldots,(x_n,y_n)\in\mathbb R^2
$$

con

$$
x_0,x_1,\ldots,x_n
$$

tutti distinti.

Allora esiste un unico polinomio

$$
p(x)\in\mathbb R_n[x]
$$

tale che

$$
p(x_i)=y_i,\qquad i=0,\ldots,n.
$$

## Ipotesi

Le ipotesi sono:

1. abbiamo $n+1$ coppie di dati;
2. ogni $x_i$ è reale;
3. ogni $y_i$ è reale;
4. i nodi $x_i$ sono tutti distinti.

## Tesi

Esiste uno e un solo polinomio di grado al massimo $n$ che passa per tutti i punti.

La tesi ha due parti:

### Esistenza

Esiste almeno un polinomio che soddisfa le condizioni.

### Unicità

Non possono esistere due polinomi diversi di grado al massimo $n$ che soddisfano le stesse condizioni.

## Significato intuitivo

* Due punti con ascisse distinte determinano una retta.
* Tre punti con ascisse distinte determinano un’unica parabola di grado al massimo $2$.
* Quattro punti determinano un unico polinomio di grado al massimo $3$.
* In generale, $n+1$ punti determinano un unico polinomio di grado al massimo $n$.

Attenzione: il grado effettivo può essere minore di $n$.

Per esempio, quattro punti potrebbero trovarsi tutti sulla stessa retta. Il polinomio interpolante appartiene comunque a $\mathbb R_3[x]$, ma avrà grado $1$.

## Perché i nodi devono essere distinti

Se avessimo

$$
x_i=x_j
$$

ma

$$
y_i\neq y_j,
$$

chiederemmo al polinomio di soddisfare:

$$
p(x_i)=y_i
$$

e contemporaneamente

$$
p(x_i)=y_j.
$$

È impossibile.

Anche se $y_i=y_j$, il dato duplicato non aggiunge una nuova informazione indipendente.

## Come potrebbe essere chiesto all’orale

> Enunci il teorema fondamentale dell’interpolazione polinomiale.

Bisogna dire chiaramente:

* $n+1$ nodi distinti;
* valori arbitrari $y_i$;
* esistenza;
* unicità;
* grado al massimo $n$.

Un errore frequente è dire “esiste un unico polinomio di grado $n$”. Non è sempre vero.

La formulazione corretta è:

$$
\deg p\leq n.
$$

---

# 4. Prima dimostrazione: matrice di Vandermonde

## 4.1 Dalle condizioni di interpolazione a un sistema lineare

Scriviamo il polinomio in forma canonica:

$$
p(x)=a_0+a_1x+a_2x^2+\cdots+a_nx^n.
$$

I coefficienti

$$
a_0,a_1,\ldots,a_n
$$

sono le incognite.

La condizione

$$
p(x_i)=y_i
$$

diventa:

$$
a_0+a_1x_i+a_2x_i^2+\cdots+a_nx_i^n=y_i.
$$

Ripetendo per ogni nodo:

$$
\begin{cases}
a_0+a_1x_0+a_2x_0^2+\cdots+a_nx_0^n=y_0,\\
a_0+a_1x_1+a_2x_1^2+\cdots+a_nx_1^n=y_1,\\
\vdots\\
a_0+a_1x_n+a_2x_n^2+\cdots+a_nx_n^n=y_n.
\end{cases}
$$

In forma matriciale:

$$
\begin{pmatrix}
1 & x_0 & x_0^2 & \cdots & x_0^n\\
1 & x_1 & x_1^2 & \cdots & x_1^n\\
\vdots & \vdots & \vdots & & \vdots\\
1 & x_n & x_n^2 & \cdots & x_n^n
\end{pmatrix}
\begin{pmatrix}
a_0\\
a_1\\
\vdots\\
a_n
\end{pmatrix}
=
\begin{pmatrix}
y_0\\
y_1\\
\vdots\\
y_n
\end{pmatrix}.
$$

Indichiamo:

$$
V\mathbf a=\mathbf y.
$$

Dove:

$$
\mathbf a=
\begin{pmatrix}
a_0\\
\vdots\\
a_n
\end{pmatrix},
\qquad
\mathbf y=
\begin{pmatrix}
y_0\\
\vdots\\
y_n
\end{pmatrix}.
$$

---

# 5. La matrice di Vandermonde

## Definizione

La matrice

$$
V(x_0,\ldots,x_n)=
\begin{pmatrix}
1 & x_0 & x_0^2 & \cdots & x_0^n\\
1 & x_1 & x_1^2 & \cdots & x_1^n\\
\vdots & \vdots & \vdots & & \vdots\\
1 & x_n & x_n^2 & \cdots & x_n^n
\end{pmatrix}
$$

si chiama **matrice di Vandermonde** associata ai nodi

$$
x_0,\ldots,x_n.
$$

## Come ricordarla

Ogni riga è associata a un nodo.

La riga relativa a $x_i$ è:

$$
(1,x_i,x_i^2,\ldots,x_i^n).
$$

Ogni colonna è associata a una potenza:

* prima colonna: $x_i^0=1$;
* seconda colonna: $x_i^1$;
* terza colonna: $x_i^2$;
* e così via.

## Perché serve

La matrice traduce il problema dell’interpolazione in un problema di algebra lineare.

Il polinomio interpolante esiste ed è unico se e solo se il sistema

$$
V\mathbf a=\mathbf y
$$

ha una sola soluzione.

Questo succede se $V$ è invertibile.

---

# 6. Determinante di Vandermonde

## Formula

Per $n\geq 1$:

$$
\det V(x_0,\ldots,x_n)
=
\prod_{\substack{i,j=0\\j<i}}^n(x_i-x_j).
$$

Una scrittura equivalente, più leggibile, è:

$$
\det V(x_0,\ldots,x_n)
=
\prod_{0\leq j<i\leq n}(x_i-x_j).
$$

Esplicitamente:

$$
\det V=
(x_1-x_0)
(x_2-x_0)(x_2-x_1)
\cdots
(x_n-x_0)\cdots(x_n-x_{n-1}).
$$

## Significato del prodotto

Per ogni coppia di nodi con $j<i$, compare il fattore:

$$
x_i-x_j.
$$

Se i nodi sono distinti, ogni differenza è diversa da zero.

Quindi:

$$
\det V\neq 0.
$$

Ne segue che $V$ è invertibile.

## Conclusione della prima dimostrazione

Se $V$ è invertibile, il sistema ha un’unica soluzione:

$$
\mathbf a=V^{-1}\mathbf y.
$$

Quindi esiste un unico vettore di coefficienti:

$$
(a_0,\ldots,a_n)^T.
$$

Questo determina un unico polinomio:

$$
p(x)=a_0+a_1x+\cdots+a_nx^n.
$$

Abbiamo dimostrato sia l’esistenza sia l’unicità.

---

# 7. Dimostrazione del determinante di Vandermonde

Le dispense mostrano il caso $n=3$.

Definiamo:

$$
d_3=\det V(x_0,x_1,x_2,x_3).
$$

Quindi:

$$
d_3=
\begin{vmatrix}
1&x_0&x_0^2&x_0^3\\
1&x_1&x_1^2&x_1^3\\
1&x_2&x_2^2&x_2^3\\
1&x_3&x_3^2&x_3^3
\end{vmatrix}.
$$

## 7.1 Idea generale

L’obiettivo è ricavare dalla matrice alcuni fattori:

$$
x_3-x_0,\qquad x_3-x_1,\qquad x_3-x_2.
$$

Dopo averli estratti, rimane una matrice di Vandermonde più piccola:

$$
V(x_0,x_1,x_2).
$$

Si ottiene così la relazione ricorsiva:

$$
d_3=(x_3-x_0)(x_3-x_1)(x_3-x_2)d_2.
$$

Poi si applica lo stesso ragionamento a $d_2$.

## 7.2 Operazioni sulle colonne

Si effettuano, da destra verso sinistra, le operazioni:

$$
C_4\leftarrow C_4-x_3C_3,
$$

$$
C_3\leftarrow C_3-x_3C_2,
$$

$$
C_2\leftarrow C_2-x_3C_1.
$$

Perché da destra verso sinistra?

Perché in questo modo ogni operazione usa ancora la colonna originale precedente.

Se partissimo da sinistra, modificheremmo una colonna che servirebbe nelle operazioni successive.

Queste operazioni non cambiano il determinante perché aggiungere a una colonna un multiplo di un’altra colonna conserva il determinante.

## 7.3 Cosa accade alla riga relativa a $x_3$

Nell’ultima riga:

$$
x_3-x_3\cdot1=0,
$$

$$
x_3^2-x_3\cdot x_3=0,
$$

$$
x_3^3-x_3\cdot x_3^2=0.
$$

L’ultima riga diventa:

$$
(1,0,0,0).
$$

## 7.4 Cosa accade alle altre righe

Nella riga relativa a $x_i$, con $i=0,1,2$, compaiono:

$$
x_i-x_3,
$$

$$
x_i^2-x_3x_i=x_i(x_i-x_3),
$$

$$
x_i^3-x_3x_i^2=x_i^2(x_i-x_3).
$$

Quindi:

$$
d_3=
\begin{vmatrix}
1&x_0-x_3&x_0(x_0-x_3)&x_0^2(x_0-x_3)\\
1&x_1-x_3&x_1(x_1-x_3)&x_1^2(x_1-x_3)\\
1&x_2-x_3&x_2(x_2-x_3)&x_2^2(x_2-x_3)\\
1&0&0&0
\end{vmatrix}.
$$

## 7.5 Sviluppo di Laplace

Sviluppiamo lungo l’ultima riga.

L’unico elemento non nullo è il primo elemento, che si trova in posizione $(4,1)$.

Il segno del cofattore è:

$$
(-1)^{4+1}=(-1)^5=-1.
$$

Nella notazione delle dispense compare $(-1)^3$, che è ancora $-1$.

Otteniamo:

$$
d_3
=
- \begin{vmatrix}
  x_0-x_3 & x_0(x_0-x_3) & x_0^2(x_0-x_3)\\
  x_1-x_3 & x_1(x_1-x_3) & x_1^2(x_1-x_3)\\
  x_2-x_3 & x_2(x_2-x_3) & x_2^2(x_2-x_3)
  \end{vmatrix}.
$$

## 7.6 Raccolta dei fattori

Dalla prima riga raccogliamo:

$$
x_0-x_3.
$$

Dalla seconda:

$$
x_1-x_3.
$$

Dalla terza:

$$
x_2-x_3.
$$

Quindi:

$$
d_3
=
-(x_0-x_3)(x_1-x_3)(x_2-x_3)
\begin{vmatrix}
1&x_0&x_0^2\\
1&x_1&x_1^2\\
1&x_2&x_2^2
\end{vmatrix}.
$$

La matrice rimasta è precisamente:

$$
V(x_0,x_1,x_2).
$$

Il suo determinante è $d_2$.

Perciò:

$$
d_3
=
-(x_0-x_3)(x_1-x_3)(x_2-x_3)d_2.
$$

Ora:

$$
x_i-x_3=-(x_3-x_i).
$$

Ci sono tre fattori, quindi:

$$
(x_0-x_3)(x_1-x_3)(x_2-x_3)
=
(-1)^3
(x_3-x_0)(x_3-x_1)(x_3-x_2).
$$

Moltiplicando per il segno esterno $-1$:

$$
(-1)(-1)^3=(-1)^4=1.
$$

Quindi:

$$
d_3=
(x_3-x_0)(x_3-x_1)(x_3-x_2)d_2.
$$

## 7.7 Applicazione ricorsiva

Analogamente:

$$
d_2=
(x_2-x_0)(x_2-x_1)d_1.
$$

Inoltre:

$$
d_1=
\begin{vmatrix}
1&x_0\\
1&x_1
\end{vmatrix}
=x_1-x_0.
$$

Pertanto:

$$
\begin{aligned}
d_3
={}&(x_3-x_0)(x_3-x_1)(x_3-x_2)\\
&\cdot(x_2-x_0)(x_2-x_1)\\
&\cdot(x_1-x_0).
\end{aligned}
$$

Questa è la formula di Vandermonde per $n=3$.

## Cosa sapere all’orale

Non è necessario imparare ogni matrice a memoria. Bisogna sapere l’idea:

1. si fanno operazioni sulle colonne;
2. l’ultima riga diventa $(1,0,\ldots,0)$;
3. si sviluppa lungo l’ultima riga;
4. si estraggono i fattori $x_n-x_i$;
5. rimane una Vandermonde di dimensione inferiore;
6. si conclude per ricorrenza.

---

# 8. Seconda dimostrazione: polinomi di Lagrange

La seconda dimostrazione è più costruttiva.

Non dimostra solo che il polinomio esiste. Fornisce direttamente una formula per costruirlo.

## 8.1 Definizione dei polinomi fondamentali

Per ogni $j=0,\ldots,n$, definiamo:

$$
L_j(x)
=
\prod_{\substack{k=0\\k\neq j}}^n
\frac{x-x_k}{x_j-x_k}.
$$

Il prodotto contiene tutti i nodi tranne $x_j$.

Esplicitamente:

$$
L_j(x)=
\frac{
(x-x_0)\cdots(x-x_{j-1})(x-x_{j+1})\cdots(x-x_n)
}{
(x_j-x_0)\cdots(x_j-x_{j-1})(x_j-x_{j+1})\cdots(x_j-x_n)
}.
$$

## Significato dei simboli

* $j$ indica quale polinomio di Lagrange stiamo costruendo;
* $k$ scorre tutti i nodi;
* $k\neq j$ significa che escludiamo $x_j$;
* il numeratore dipende da $x$;
* il denominatore è un numero costante.

## Perché il denominatore non è zero

Nel denominatore compaiono fattori:

$$
x_j-x_k.
$$

Poiché i nodi sono distinti:

$$
x_j\neq x_k
$$

per $j\neq k$.

Quindi:

$$
x_j-x_k\neq 0.
$$

La formula è ben definita.

---

# 9. Proprietà fondamentale dei polinomi di Lagrange

Per ogni $i,j$:

$$
L_j(x_i)=
\begin{cases}
1,&i=j,\\
0,&i\neq j.
\end{cases}
$$

Questa proprietà può essere scritta anche come:

$$
L_j(x_i)=\delta_{ij},
$$

dove $\delta_{ij}$ è il delta di Kronecker.

## Caso $i=j$

Valutiamo $L_j$ in $x_j$:

$$
L_j(x_j)
=
\prod_{k\neq j}
\frac{x_j-x_k}{x_j-x_k}.
$$

Ogni fattore è uguale a $1$. Quindi:

$$
L_j(x_j)=1.
$$

## Caso $i\neq j$

Valutiamo $L_j$ in $x_i$.

Nel prodotto compare anche il fattore corrispondente a $k=i$:

$$
\frac{x_i-x_i}{x_j-x_i}=0.
$$

Poiché un fattore del prodotto è zero:

$$
L_j(x_i)=0.
$$

## Significato intuitivo

Il polinomio $L_j$:

* vale $1$ nel nodo $x_j$;
* vale $0$ in tutti gli altri nodi.

Possiamo pensare a $L_j$ come a un “interruttore” che seleziona il valore associato al nodo $x_j$.

---

# 10. I polinomi di Lagrange formano una base

Abbiamo $n+1$ polinomi:

$$
L_0,L_1,\ldots,L_n.
$$

Ognuno ha grado al massimo $n$, quindi appartiene a:

$$
\mathbb R_n[x].
$$

Per dimostrare che formano una base, basta dimostrare che sono linearmente indipendenti.

Questo basta perché:

$$
\dim\mathbb R_n[x]=n+1
$$

e abbiamo esattamente $n+1$ polinomi.

## Dimostrazione dell’indipendenza lineare

Supponiamo:

$$
\alpha_0L_0(x)+\alpha_1L_1(x)+\cdots+\alpha_nL_n(x)=0
$$

per ogni $x$.

Dobbiamo dimostrare:

$$
\alpha_0=\cdots=\alpha_n=0.
$$

Valutiamo l’uguaglianza nel nodo $x_i$:

$$
\alpha_0L_0(x_i)+\cdots+\alpha_nL_n(x_i)=0.
$$

Tutti i termini sono nulli tranne quello con indice $i$:

$$
\alpha_iL_i(x_i)=0.
$$

Poiché:

$$
L_i(x_i)=1,
$$

segue:

$$
\alpha_i=0.
$$

Questo vale per ogni $i$. Quindi tutti i coefficienti sono nulli.

I polinomi sono linearmente indipendenti.

Essendo $n+1$ elementi linearmente indipendenti in uno spazio di dimensione $n+1$, formano una base.

---

# 11. Costruzione del polinomio interpolante

Definiamo:

$$
p(x)=y_0L_0(x)+y_1L_1(x)+\cdots+y_nL_n(x).
$$

Questa è la **forma di Lagrange**.

In forma compatta:

$$
p(x)=\sum_{j=0}^n y_jL_j(x).
$$

## Verifica dell’interpolazione

Valutiamo $p$ in $x_i$:

$$
p(x_i)=\sum_{j=0}^n y_jL_j(x_i).
$$

Per la proprietà fondamentale:

$$
L_j(x_i)=0
$$

se $j\neq i$, mentre:

$$
L_i(x_i)=1.
$$

Quindi:

$$
p(x_i)=y_i.
$$

Questo dimostra l’esistenza.

---

# 12. Unicità nella seconda dimostrazione

Supponiamo che esista un altro polinomio $q\in\mathbb R_n[x]$ che interpola gli stessi dati.

Poiché $L_0,\ldots,L_n$ formano una base, possiamo scrivere:

$$
q(x)=\beta_0L_0(x)+\cdots+\beta_nL_n(x).
$$

Valutiamo nel nodo $x_i$:

$$
q(x_i)=\beta_0L_0(x_i)+\cdots+\beta_nL_n(x_i).
$$

Rimane solo:

$$
q(x_i)=\beta_i.
$$

Ma $q$ interpola i dati, quindi:

$$
q(x_i)=y_i.
$$

Ne segue:

$$
\beta_i=y_i.
$$

Questo vale per ogni $i$. Quindi:

$$
q(x)=y_0L_0(x)+\cdots+y_nL_n(x)=p(x).
$$

Dunque il polinomio è unico.

---

# 13. Confronto tra le due dimostrazioni

## Prima dimostrazione

Usa:

* forma canonica;
* sistemi lineari;
* matrice di Vandermonde;
* determinante;
* invertibilità.

Produce:

$$
\mathbf a=V^{-1}\mathbf y.
$$

È utile per collegare l’interpolazione all’algebra lineare.

## Seconda dimostrazione

Usa:

* polinomi fondamentali di Lagrange;
* proprietà $L_j(x_i)=\delta_{ij}$;
* basi di spazi vettoriali.

Produce direttamente:

$$
p(x)=\sum_{j=0}^n y_jL_j(x).
$$

È più pratica per costruire il polinomio a mano.

## Cosa dire all’orale

La prima dimostrazione mostra che le condizioni di interpolazione definiscono un sistema lineare con matrice di Vandermonde invertibile.

La seconda costruisce esplicitamente una base adattata ai nodi. In questa base, i coefficienti del polinomio interpolante sono direttamente i valori $y_j$.

---

# 14. Definizione di polinomio interpolante

Dati nodi distinti:

$$
x_0,\ldots,x_n
$$

e valori:

$$
y_0,\ldots,y_n,
$$

l’unico polinomio $p\in\mathbb R_n[x]$ tale che

$$
p(x_i)=y_i
$$

si chiama **polinomio di interpolazione** dei dati.

Se:

$$
y_i=f(x_i),
$$

si parla di polinomio di interpolazione della funzione $f$ sui nodi dati.

## Attenzione

Il polinomio dipende sia:

* dai nodi $x_i$;
* dai valori $y_i$.

Gli stessi valori posti su nodi diversi producono generalmente un polinomio diverso.

---

# 15. Forma canonica e forma di Lagrange

## Forma canonica

$$
p(x)=a_0+a_1x+\cdots+a_nx^n.
$$

I coefficienti si possono ottenere risolvendo:

$$
V\mathbf a=\mathbf y.
$$

Formalmente:

$$
\mathbf a=V^{-1}\mathbf y.
$$

Negli esercizi non conviene quasi mai calcolare esplicitamente $V^{-1}$. È meglio risolvere il sistema o partire dalla forma di Lagrange e sviluppare.

## Forma di Lagrange

$$
p(x)=\sum_{j=0}^n y_jL_j(x).
$$

Con:

$$
L_j(x)=\prod_{k\neq j}\frac{x-x_k}{x_j-x_k}.
$$

## Vantaggi della forma di Lagrange

* si costruisce direttamente dai dati;
* rende evidente che $p(x_i)=y_i$;
* non richiede la soluzione esplicita di un sistema;
* è adatta alle dimostrazioni teoriche.

## Vantaggi della forma canonica

* permette di leggere subito i coefficienti;
* facilita derivazione e integrazione;
* rende chiaro il grado effettivo;
* può essere richiesta esplicitamente negli esercizi.

---

# 16. Esempio delle dispense: interpolazione di $\sin x$

I nodi sono:

$$
x_0=0,\qquad x_1=\frac{\pi}{6},\qquad x_2=\frac{\pi}{4}.
$$

I valori sono:

$$
y_0=\sin 0=0,
$$

$$
y_1=\sin\frac{\pi}{6}=\frac12,
$$

$$
y_2=\sin\frac{\pi}{4}=\frac1{\sqrt2}.
$$

Cerchiamo $p\in\mathbb R_2[x]$.

## 16.1 Polinomi di Lagrange

Il primo è:

$$
L_0(x)=
\frac{
\left(x-\frac{\pi}{6}\right)
\left(x-\frac{\pi}{4}\right)
}{
\left(0-\frac{\pi}{6}\right)
\left(0-\frac{\pi}{4}\right)
}.
$$

Non serve calcolarlo nel polinomio finale perché:

$$
y_0=0.
$$

Il secondo è:

$$
L_1(x)=
\frac{
x\left(x-\frac{\pi}{4}\right)
}{
\left(\frac{\pi}{6}-0\right)
\left(\frac{\pi}{6}-\frac{\pi}{4}\right)
}.
$$

Calcoliamo il denominatore:

$$
\frac{\pi}{6}-\frac{\pi}{4}
=
\frac{2\pi-3\pi}{12}
=
-\frac{\pi}{12}.
$$

Quindi:

$$
\left(\frac{\pi}{6}\right)
\left(-\frac{\pi}{12}\right)
=
-\frac{\pi^2}{72}.
$$

Pertanto:

$$
L_1(x)=
\frac{x\left(x-\frac{\pi}{4}\right)}
{-\frac{\pi^2}{72}}.
$$

Il terzo è:

$$
L_2(x)=
\frac{
x\left(x-\frac{\pi}{6}\right)
}{
\left(\frac{\pi}{4}-0\right)
\left(\frac{\pi}{4}-\frac{\pi}{6}\right)
}.
$$

Calcoliamo:

$$
\frac{\pi}{4}-\frac{\pi}{6}
=
\frac{3\pi-2\pi}{12}
=
\frac{\pi}{12}.
$$

Quindi:

$$
\left(\frac{\pi}{4}\right)
\left(\frac{\pi}{12}\right)
=
\frac{\pi^2}{48}.
$$

Pertanto:

$$
L_2(x)=
\frac{x\left(x-\frac{\pi}{6}\right)}
{\frac{\pi^2}{48}}.
$$

## 16.2 Forma di Lagrange

$$
p(x)=0\cdot L_0(x)+\frac12L_1(x)+\frac1{\sqrt2}L_2(x).
$$

Quindi:

$$
p(x)
=
\frac12
\frac{x\left(x-\frac{\pi}{4}\right)}
{-\frac{\pi^2}{72}}
+
\frac1{\sqrt2}
\frac{x\left(x-\frac{\pi}{6}\right)}
{\frac{\pi^2}{48}}.
$$

Questa è già una forma di Lagrange corretta.

## 16.3 Passaggio alla forma canonica

Primo termine:

$$
\frac12\cdot\frac{1}{-\pi^2/72}
=
\frac12\cdot\left(-\frac{72}{\pi^2}\right)
=
-\frac{36}{\pi^2}.
$$

Quindi:

$$
-\frac{36}{\pi^2}
x\left(x-\frac{\pi}{4}\right).
$$

Sviluppiamo:

$$
x\left(x-\frac{\pi}{4}\right)
=
x^2-\frac{\pi}{4}x.
$$

Pertanto:

$$
-\frac{36}{\pi^2}x^2
+
\frac{9}{\pi}x.
$$

Secondo termine:

$$
\frac1{\sqrt2}\cdot\frac{1}{\pi^2/48}
=
\frac{48}{\sqrt2\pi^2}.
$$

Razionalmente:

$$
\frac{48}{\sqrt2}=24\sqrt2.
$$

Quindi:

$$
\frac{24\sqrt2}{\pi^2}
x\left(x-\frac{\pi}{6}\right).
$$

Sviluppiamo:

$$
x\left(x-\frac{\pi}{6}\right)
=
x^2-\frac{\pi}{6}x.
$$

Pertanto:

$$
\frac{24\sqrt2}{\pi^2}x^2
-
\frac{4\sqrt2}{\pi}x.
$$

Sommiamo i termini in $x^2$:

$$
-\frac{36}{\pi^2}
+
\frac{24\sqrt2}{\pi^2}
=
\frac{24\sqrt2-36}{\pi^2}.
$$

Sommiamo i termini in $x$:

$$
\frac9\pi-\frac{4\sqrt2}{\pi}
=
\frac{9-4\sqrt2}{\pi}.
$$

Il termine costante è zero.

Quindi:

$$
\boxed{
p(x)=
\frac{24\sqrt2-36}{\pi^2}x^2
+
\frac{9-4\sqrt2}{\pi}x
}.
$$

## Controllo

Bisogna verificare almeno:

$$
p(0)=0,
$$

$$
p\left(\frac{\pi}{6}\right)=\frac12,
$$

$$
p\left(\frac{\pi}{4}\right)=\frac1{\sqrt2}.
$$

La figura a pagina 6 mostra che il polinomio e $\sin x$ coincidono nei tre nodi, ma non necessariamente negli altri punti. 

Questo è importante: interpolare non significa essere uguali ovunque.

---

# 17. Collegamento con gli esercizi

## Tipo 1: costruire la forma di Lagrange

### Dati tipici

Sono dati:

$$
x_0,\ldots,x_n
$$

e:

$$
y_0,\ldots,y_n.
$$

Oppure è data una funzione $f$ e bisogna calcolare:

$$
y_i=f(x_i).
$$

### Cosa riconoscere

Parole come:

* “polinomio interpolante”;
* “interpola i dati”;
* “sui nodi”;
* “forma di Lagrange”.

### Procedura

1. Controllare che i nodi siano distinti.

2. Calcolare i valori $y_i$, se non sono già dati.

3. Costruire ogni $L_j$.

4. Scrivere:

   $$
   p(x)=\sum y_jL_j(x).
   $$

5. Semplificare solo quanto richiesto.

6. Verificare $p(x_i)=y_i$.

### Errore comune

Dimenticare di escludere $k=j$ dal prodotto.

---

## Tipo 2: passare alla forma canonica

### Procedura

Partire da:

$$
p(x)=\sum_{j=0}^n y_jL_j(x).
$$

Poi:

1. calcolare i denominatori;
2. sviluppare i prodotti;
3. moltiplicare per $y_j$;
4. raccogliere i termini con la stessa potenza;
5. ordinare:

   $$
   p(x)=a_0+a_1x+\cdots+a_nx^n.
   $$

### Controlli

* il grado deve essere al massimo $n$;
* il polinomio deve rispettare tutti i dati;
* i coefficienti devono essere coerenti con eventuali simmetrie.

---

## Tipo 3: usare la matrice di Vandermonde

### Procedura

1. Scrivere:

   $$
   p(x)=a_0+\cdots+a_nx^n.
   $$

2. Costruire:

   $$
   V=
   \begin{pmatrix}
   1&x_0&\cdots&x_0^n\\
   \vdots&\vdots&&\vdots\\
   1&x_n&\cdots&x_n^n
   \end{pmatrix}.
   $$

3. Scrivere:

   $$
   V\mathbf a=\mathbf y.
   $$

4. Risolvere il sistema.

5. Scrivere il polinomio.

### Attenzione

Non conviene calcolare $V^{-1}$ esplicitamente, salvo richiesta.

La formula:

$$
\mathbf a=V^{-1}\mathbf y
$$

è soprattutto teorica.

---

## Tipo 4: dimostrare un’identità con i polinomi di Lagrange

Nelle dispense compare l’esercizio:

$$
\sum_{i=0}^nL_i(x)=1.
$$

### Strategia elegante

Osserviamo che il polinomio costante:

$$
q(x)=1
$$

interpola i valori:

$$
1,1,\ldots,1
$$

sui nodi $x_0,\ldots,x_n$.

La sua forma di Lagrange è:

$$
q(x)=\sum_{i=0}^n1\cdot L_i(x).
$$

Quindi:

$$
\sum_{i=0}^nL_i(x)=1.
$$

La giustificazione profonda è l’unicità del polinomio interpolante.

Questo tipo di ragionamento è molto importante all’orale.

---

# 18. Mini-esempio numerico

Consideriamo i punti:

$$
(0,1),\quad (1,3),\quad (2,2).
$$

Cerchiamo un polinomio di grado al massimo $2$.

## Polinomi di Lagrange

$$
L_0(x)
=
\frac{(x-1)(x-2)}{(0-1)(0-2)}
=
\frac{(x-1)(x-2)}{2}.
$$

$$
L_1(x)
=
\frac{x(x-2)}{(1-0)(1-2)}
=
-x(x-2).
$$

$$
L_2(x)
=
\frac{x(x-1)}{(2-0)(2-1)}
=
\frac{x(x-1)}{2}.
$$

## Polinomio

$$
p(x)=1L_0(x)+3L_1(x)+2L_2(x).
$$

Quindi:

$$
p(x)
=
\frac{(x-1)(x-2)}2
-3x(x-2)
+x(x-1).
$$

Sviluppiamo:

$$
\frac{x^2-3x+2}{2}
-3x^2+6x
+x^2-x.
$$

Coefficienti di $x^2$:

$$
\frac12-3+1=-\frac32.
$$

Coefficienti di $x$:

$$
-\frac32+6-1=\frac72.
$$

Termine costante:

$$
1.
$$

Quindi:

$$
\boxed{
p(x)=-\frac32x^2+\frac72x+1
}.
$$

Controllo:

$$
p(0)=1,
$$

$$
p(1)=-\frac32+\frac72+1=3,
$$

$$
p(2)=-6+7+1=2.
$$

---

# 19. Schede dei risultati da sapere

## Teorema di esistenza e unicità

* **Enunciato:** dati $n+1$ nodi distinti e $n+1$ valori reali, esiste un unico polinomio di grado al massimo $n$ che interpola i dati.
* **Ipotesi:** nodi distinti.
* **Tesi:** esistenza e unicità.
* **Idea intuitiva:** $n+1$ condizioni indipendenti determinano gli $n+1$ coefficienti.
* **Perché le ipotesi servono:** nodi coincidenti rendono la Vandermonde singolare e possono produrre condizioni incompatibili.
* **Prima dimostrazione:** sistema di Vandermonde invertibile.
* **Seconda dimostrazione:** costruzione della base di Lagrange.
* **Uso negli esercizi:** garantisce che la formula costruita è il solo polinomio possibile.
* **Domanda orale:** “Dimostri esistenza e unicità del polinomio interpolante”.
* **Errore tipico:** dire grado esattamente $n$.

## Formula del determinante di Vandermonde

* **Enunciato:**

  $$
  \det V(x_0,\ldots,x_n)
  =
  \prod_{0\leq j<i\leq n}(x_i-x_j).
  $$

* **Ipotesi:** nessuna per scrivere la formula; nodi distinti per dedurre l’invertibilità.

* **Tesi:** espressione fattorizzata del determinante.

* **Significato:** il determinante si annulla esattamente quando almeno due nodi coincidono.

* **Idea della dimostrazione:** riduzione ricorsiva a una Vandermonde più piccola.

* **Uso:** dimostrare che il sistema di interpolazione ha soluzione unica.

* **Errore tipico:** invertire l’ordine delle differenze senza controllare il segno.

## Proprietà cardinale dei polinomi di Lagrange

* **Enunciato:**

  $$
  L_j(x_i)=\delta_{ij}.
  $$

* **Ipotesi:** nodi distinti.

* **Tesi:** $L_j$ vale $1$ nel proprio nodo e $0$ negli altri.

* **Significato:** ogni $L_j$ seleziona un solo dato.

* **Idea della dimostrazione:** se $i=j$, tutti i rapporti valgono $1$; se $i\neq j$, compare un fattore nullo.

* **Uso:** verifica immediata della forma di Lagrange.

* **Errore tipico:** confondere $L_j(x_i)$ con $L_i(x_j)$. La proprietà vale comunque in forma simmetrica come delta, ma gli indici vanno letti correttamente.

## Base di Lagrange

* **Enunciato:** i polinomi $L_0,\ldots,L_n$ formano una base di $\mathbb R_n[x]$.
* **Ipotesi:** nodi distinti.
* **Tesi:** indipendenza lineare e generazione dello spazio.
* **Idea:** valutare una combinazione lineare nei nodi.
* **Uso:** ogni polinomio di grado al massimo $n$ può essere scritto nella base di Lagrange.
* **Errore tipico:** dimostrare solo che sono $n+1$, senza dimostrare l’indipendenza lineare.

---

# 20. Schema operativo da esame

## Quando vedo un esercizio di interpolazione

### Passo 1: identifico i dati

Scrivo ordinatamente:

$$
x_0,\ldots,x_n,
$$

$$
y_0,\ldots,y_n.
$$

Se è data una funzione:

$$
y_i=f(x_i).
$$

### Passo 2: controllo i nodi

Devono essere distinti.

Se non lo sono, il teorema standard non si applica.

### Passo 3: stabilisco il grado massimo

Con $n+1$ nodi:

$$
p\in\mathbb R_n[x].
$$

Quindi:

$$
\deg p\leq n.
$$

### Passo 4: scelgo il metodo

Se viene chiesta la forma di Lagrange:

$$
L_j(x)=\prod_{k\neq j}\frac{x-x_k}{x_j-x_k},
$$

$$
p(x)=\sum_{j=0}^ny_jL_j(x).
$$

Se viene chiesta la forma canonica, posso:

* sviluppare la forma di Lagrange;
* oppure risolvere il sistema di Vandermonde.

### Passo 5: semplifico con ordine

Calcolo prima i denominatori.

Poi sviluppo un termine alla volta.

Solo alla fine raccolgo le potenze uguali.

### Passo 6: controllo il grado

Il risultato non deve avere potenze maggiori di $x^n$.

### Passo 7: verifico i nodi

Calcolo:

$$
p(x_i)
$$

almeno nei punti più semplici, idealmente in tutti.

### Passo 8: scrivo la conclusione

Per il teorema di esistenza e unicità, il polinomio trovato è l’unico polinomio in $\mathbb R_n[x]$ che interpola i dati.

---

# 21. Errori frequenti

1. Dire “grado $n$” invece di “grado al massimo $n$”.
2. Usare nodi non distinti senza segnalarlo.
3. Inserire anche $k=j$ nel prodotto di $L_j$.
4. Sbagliare il segno nei denominatori.
5. Confondere $x$, variabile del polinomio, con $x_i$, nodo fissato.
6. Dimenticare il coefficiente $y_j$.
7. Non verificare il risultato.
8. Confondere interpolazione con approssimazione globale.
9. Pensare che il polinomio coincida con la funzione in tutti i punti.
10. Calcolare inutilmente l’inversa della Vandermonde.
11. Dire che $n+1$ polinomi formano automaticamente una base. Serve anche l’indipendenza lineare.
12. Non spiegare perché i denominatori di Lagrange sono diversi da zero.

---

# 22. Cosa devi saper dire all’orale

Dovresti saper esporre questo percorso:

> Dati $n+1$ nodi distinti e $n+1$ valori, cerchiamo un polinomio di grado al massimo $n$ che soddisfi le condizioni di interpolazione. Scrivendo il polinomio nella base canonica, le condizioni producono un sistema lineare con matrice di Vandermonde. Il determinante della Vandermonde è il prodotto delle differenze tra tutte le coppie di nodi. Poiché i nodi sono distinti, il determinante è non nullo. La matrice è quindi invertibile e il sistema ha un’unica soluzione. In alternativa, si costruiscono i polinomi fondamentali di Lagrange, che valgono uno nel proprio nodo e zero negli altri. Essi formano una base di $\mathbb R_n[x]$. Il polinomio interpolante è quindi $p(x)=\sum y_jL_j(x)$, e la proprietà cardinale dimostra immediatamente che interpola i dati.

Per una risposta completa devi anche specificare:

* perché il denominatore di $L_j$ non si annulla;
* perché i polinomi $L_j$ sono linearmente indipendenti;
* dove entra l’ipotesi dei nodi distinti;
* perché il grado è al massimo $n$.

---

# 23. Riassunto finale

Dati $n+1$ nodi distinti:

$$
x_0,\ldots,x_n
$$

e valori:

$$
y_0,\ldots,y_n,
$$

esiste un unico polinomio:

$$
p\in\mathbb R_n[x]
$$

tale che:

$$
p(x_i)=y_i.
$$

In forma canonica:

$$
p(x)=a_0+\cdots+a_nx^n,
$$

dove i coefficienti risolvono:

$$
V\mathbf a=\mathbf y.
$$

La matrice $V$ è la matrice di Vandermonde e:

$$
\det V=
\prod_{0\leq j<i\leq n}(x_i-x_j).
$$

Poiché i nodi sono distinti:

$$
\det V\neq0.
$$

In forma di Lagrange:

$$
p(x)=\sum_{j=0}^ny_jL_j(x),
$$

con:

$$
L_j(x)=
\prod_{k\neq j}
\frac{x-x_k}{x_j-x_k}.
$$

La proprietà essenziale è:

$$
L_j(x_i)=\delta_{ij}.
$$

Questa proprietà garantisce che:

$$
p(x_i)=y_i.
$$

---

# 24. Domande di controllo

## Domande base

1. Che cosa si intende per nodo di interpolazione?
2. Che cosa rappresentano i valori $y_i$?
3. Che cos’è lo spazio $\mathbb R_n[x]$?
4. Qual è la dimensione di $\mathbb R_n[x]$?
5. Qual è la base canonica di $\mathbb R_n[x]$?
6. Che differenza c’è tra grado $n$ e grado al massimo $n$?
7. Che cosa significa che un polinomio interpola alcuni dati?
8. Qual è la forma canonica di un polinomio?
9. Qual è la forma di Lagrange?
10. Che cosa significa $L_j(x_i)=\delta_{ij}$?

## Domande teoriche

1. Enuncia precisamente il teorema di esistenza e unicità.
2. Perché è necessaria l’ipotesi che i nodi siano distinti?
3. Come si ottiene il sistema lineare di Vandermonde?
4. Qual è la formula del determinante di Vandermonde?
5. Perché il determinante è diverso da zero quando i nodi sono distinti?
6. Perché i polinomi di Lagrange appartengono a $\mathbb R_n[x]$?
7. Come si dimostra che i polinomi di Lagrange sono linearmente indipendenti?
8. Perché $n+1$ polinomi linearmente indipendenti formano una base di $\mathbb R_n[x]$?
9. Come si dimostra l’esistenza usando la forma di Lagrange?
10. Come si dimostra l’unicità usando la base di Lagrange?

## Domande da orale

1. Dimostri il teorema di esistenza e unicità usando la matrice di Vandermonde.
2. Spieghi l’idea della dimostrazione della formula del determinante di Vandermonde.
3. Costruisca i polinomi fondamentali di Lagrange.
4. Dimostri la proprietà $L_j(x_i)=\delta_{ij}$.
5. Dimostri che $L_0,\ldots,L_n$ formano una base.
6. Confronti la base canonica e la base di Lagrange.
7. Dove viene utilizzata l’ipotesi che i nodi siano distinti nelle due dimostrazioni?
8. Perché la forma di Lagrange dimostra contemporaneamente l’esistenza?
9. Perché il polinomio interpolante può avere grado minore di $n$?
10. Perché la formula $\mathbf a=V^{-1}\mathbf y$ è più teorica che pratica?

## Domande applicative

1. Costruisci i polinomi $L_0,L_1,L_2$ per i nodi $(0,1,3)$.

2. Trova il polinomio che interpola:

   $$
   (0,2),\quad(1,1),\quad(2,4).
   $$

3. Scrivi la matrice di Vandermonde per i nodi:

   $$
   -1,0,2.
   $$

4. Calcola il determinante della Vandermonde precedente usando la formula del prodotto.

5. Verifica che:

   $$
   \sum_{j=0}^nL_j(x)
   $$

   interpoli il valore $1$ in tutti i nodi.

6. Spiega perché il polinomio interpolante dei dati:

   $$
   (0,1),\quad(1,3),\quad(2,5)
   $$

   ha in realtà grado $1$.

7. Costruisci il polinomio interpolante di $f(x)=x^2+1$ sui nodi $(0,1,2)$. Confrontalo con $f(x)$.

8. Determina senza calcolare il polinomio se l’interpolante di una funzione lineare su quattro nodi distinti può avere grado $3$.