Queste pagine introducono una terza rappresentazione del polinomio interpolante: la **forma di Newton**.

Nelle pagine precedenti abbiamo visto:

- la forma canonica;
- la forma di Lagrange;
- il teorema di esistenza e unicità;
- il resto dell’interpolazione.

Ora viene introdotto un nuovo strumento: le **differenze divise**.

L’idea centrale è costruire il polinomio interpolante nella forma

$$
p(x)
=
f[x_0]
+
f[x_0,x_1](x-x_0)
+
f[x_0,x_1,x_2](x-x_0)(x-x_1)
+\cdots
$$

I coefficienti non sono più i coefficienti della forma canonica e non sono nemmeno i valori $f(x_i)$ della forma di Lagrange. Sono le differenze divise:

$$
f[x_0],\quad
f[x_0,x_1],\quad
f[x_0,x_1,x_2],\quad \ldots
$$

## Macroargomento del corso

Queste pagine appartengono a:

> **interpolazione polinomiale**

## Perché è importante

La forma di Newton permette di:

- costruire il polinomio interpolante in modo progressivo;
- organizzare i calcoli con una tabella;
- aggiungere un nuovo nodo senza rifare tutto da capo;
- passare facilmente alla forma canonica;
- lavorare anche quando sono dati soltanto punti $(x_i,y_i)$ e non una formula esplicita di $f$.

È una forma molto utile negli esercizi, perché evita di costruire tutti i polinomi fondamentali di Lagrange.

## Prerequisiti essenziali

Bisogna conoscere:

- il teorema di esistenza e unicità;
- il significato di nodo di interpolazione;
- la forma canonica;
- la forma di Lagrange;
- il rapporto incrementale;
- le operazioni con polinomi;
- le frazioni;
- il concetto di permutazione.

## Principali esercizi collegati

Gli esercizi tipici sono:

- calcolare le differenze divise;
- costruire la tabella delle differenze divise;
- scrivere il polinomio in forma di Newton;
- passare dalla forma di Newton alla forma canonica;
- interpolare dati numerici $(x_i,y_i)$;
- riconoscere quali valori della tabella diventano coefficienti;
- verificare che una differenza divisa non dipende dall’ordine dei nodi.

## Risultati probabili all’orale

Il professore potrebbe chiedere:

- definizione di differenza divisa;
- differenza divisa di ordine uno;
- interpretazione come rapporto incrementale;
- enunciato della forma di Newton;
- significato dei coefficienti;
- costruzione della tabella;
- dimostrazione della simmetria delle differenze divise;
- relazione tra forma di Newton e unicità del polinomio interpolante;
- vantaggi della forma di Newton rispetto a Lagrange e forma canonica.

---

# Indice ragionato

1. Contesto: perché introdurre la forma di Newton.
2. Definizione di differenza divisa.
3. Differenze divise di ordine crescente.
4. Teorema della forma di Newton.
5. Significato della struttura del polinomio.
6. Simmetria delle differenze divise.
7. Tabella delle differenze divise.
8. Esempio con $f(x)=\sqrt{x}$.
9. Passaggio alla forma canonica.
10. Interpolazione di dati senza formula esplicita.
11. Collegamento con gli esercizi.
12. Schema operativo.
13. Cosa sapere all’orale.
14. Riassunto.
15. Domande di controllo.

---

# 1. Contesto generale

Il problema resta quello già studiato.

Dati nodi distinti

$$
x_0,x_1,\ldots,x_n
$$

e valori

$$
f(x_0),f(x_1),\ldots,f(x_n),
$$

vogliamo trovare l’unico polinomio

$$
p\in\mathbb R_n[x]
$$

tale che

$$
p(x_i)=f(x_i),
\qquad i=0,\ldots,n.
$$

Finora abbiamo due rappresentazioni.

## Forma canonica

$$
p(x)=a_0+a_1x+\cdots+a_nx^n.
$$

I coefficienti $a_0,\ldots,a_n$ si trovano risolvendo un sistema lineare con matrice di Vandermonde.

## Forma di Lagrange

$$
p(x)=\sum_{j=0}^n f(x_j)L_j(x).
$$

È immediata da costruire, ma può diventare poco comoda quando i nodi sono molti.

## Perché introdurre Newton

La forma di Newton costruisce il polinomio per livelli.

Con un nodo si ha un polinomio costante.

Con due nodi si aggiunge un termine lineare.

Con tre nodi si aggiunge un termine quadratico.

Con quattro nodi si aggiunge un termine cubico.

La struttura è:

$$
p_0(x)=f[x_0],
$$

$$
p_1(x)=p_0(x)+f[x_0,x_1](x-x_0),
$$

$$
p_2(x)=p_1(x)+f[x_0,x_1,x_2](x-x_0)(x-x_1),
$$

e così via.

Ogni nuovo termine contiene un prodotto che si annulla nei nodi precedenti. Per questo aggiungere un nuovo termine non rovina le condizioni di interpolazione già soddisfatte.

---

# 2. Definizione di differenza divisa

Sia

$$
f:[a,b]\to\mathbb R.
$$

## 2.1 Differenza divisa relativa a un solo punto

Se

$$
y\in[a,b],
$$

si definisce:

$$
f[y]=f(y).
$$

Questa non è ancora una differenza nel senso comune. È il caso iniziale della definizione ricorsiva.

In particolare:

$$
f[x_0]=f(x_0).
$$

## 2.2 Differenza divisa relativa a più punti

Siano

$$
y_1,\ldots,y_k\in[a,b]
$$

con $k\geq2$, tutti distinti.

La differenza divisa relativa a questi punti è definita ricorsivamente da:

$$
f[y_1,\ldots,y_k]
=
\frac{
f[y_1,\ldots,y_{k-2},y_k]
-
f[y_1,\ldots,y_{k-1}]
}{
y_k-y_{k-1}
}.
$$

La formula usa due differenze divise di ordine inferiore.

La prima contiene:

$$
y_1,\ldots,y_{k-2},y_k,
$$

mentre la seconda contiene:

$$
y_1,\ldots,y_{k-2},y_{k-1}.
$$

Le due quantità vengono sottratte e divise per:

$$
y_k-y_{k-1}.
$$

## Significato intuitivo

Le differenze divise generalizzano il rapporto incrementale.

- Con un solo punto si ottiene il valore della funzione.
- Con due punti si misura la pendenza media.
- Con tre punti si misura come cambia la pendenza media.
- Con quattro punti si misura come cambia la differenza divisa precedente.

Ogni nuovo livello descrive una variazione di ordine superiore.

## Perché i punti devono essere distinti

Nel denominatore compare:

$$
y_k-y_{k-1}.
$$

Se i due punti coincidessero:

$$
y_k=y_{k-1},
$$

il denominatore sarebbe zero.

Più in generale, l’interpolazione standard richiede nodi distinti.

---

# 3. Differenze divise di ordine crescente

È utile distinguere i vari livelli.

## Ordine zero

$$
f[x_i]=f(x_i).
$$

## Ordine uno

Per due punti distinti $x_i$ e $x_j$:

$$
f[x_i,x_j]
=
\frac{f[x_j]-f[x_i]}{x_j-x_i}
=
\frac{f(x_j)-f(x_i)}{x_j-x_i}.
$$

Questa è il normale rapporto incrementale.

Geometricamente è il coefficiente angolare della retta secante che passa per:

$$
(x_i,f(x_i))
$$

e

$$
(x_j,f(x_j)).
$$

## Ordine due

Per tre punti distinti:

$$
f[x_0,x_1,x_2]
=
\frac{
f[x_0,x_2]-f[x_0,x_1]
}{
x_2-x_1
}.
$$

Seguendo la definizione delle dispense, il primo termine è:

$$
f[x_0,x_2],
$$

e il secondo è:

$$
f[x_0,x_1].
$$

Quindi:

$$
f[x_0,x_1,x_2]
=
\frac{
\frac{f(x_2)-f(x_0)}{x_2-x_0}
-
\frac{f(x_1)-f(x_0)}{x_1-x_0}
}{
x_2-x_1
}.
$$

Questa quantità misura la variazione delle pendenze medie.

## Ordine tre

Per quattro nodi:

$$
f[x_0,x_1,x_2,x_3]
=
\frac{
f[x_0,x_1,x_3]
-
f[x_0,x_1,x_2]
}{
x_3-x_2
}.
$$

Ogni differenza divisa di ordine $m$ usa due differenze divise di ordine $m-1$.

## Attenzione alla notazione

Le parentesi quadre non indicano un intervallo.

La scrittura:

$$
f[x_0,x_1,x_2]
$$

indica una differenza divisa della funzione $f$ relativa ai nodi indicati.

Non significa:

$$
f([x_0,x_1,x_2]).
$$

---

# 4. Teorema della forma di Newton

## Teorema 1.3

Sia

$$
f:[a,b]\to\mathbb R
$$

e siano

$$
x_0,x_1,\ldots,x_n\in[a,b]
$$

nodi distinti.

Allora il polinomio interpolante di $f$ sui nodi $x_0,\ldots,x_n$ è:

$$
\begin{aligned}
p(x)
={}&f[x_0]
+f[x_0,x_1](x-x_0)\\
&+f[x_0,x_1,x_2](x-x_0)(x-x_1)\\
&+\cdots\\
&+f[x_0,\ldots,x_n](x-x_0)\cdots(x-x_{n-1}).
\end{aligned}
$$

Questa è la **forma di Newton** del polinomio interpolante.

## Ipotesi

Le ipotesi sono:

1. $f$ è definita su un intervallo $[a,b]$;
2. i nodi appartengono a $[a,b]$;
3. i nodi sono tutti distinti.

Non è richiesta derivabilità.

Questo è importante: per costruire il polinomio interpolante bastano i valori della funzione nei nodi.

## Tesi

Il polinomio interpolante può essere scritto nella forma indicata, con coefficienti uguali alle differenze divise:

$$
f[x_0],
\quad
f[x_0,x_1],
\quad
f[x_0,x_1,x_2],
\quad \ldots
$$

## Significato intuitivo

La forma di Newton costruisce il polinomio un termine alla volta.

Il primo termine:

$$
f[x_0]
$$

impone il valore nel nodo $x_0$.

Il secondo termine:

$$
f[x_0,x_1](x-x_0)
$$

serve a correggere il valore nel nodo $x_1$ senza cambiare quello in $x_0$, perché per $x=x_0$ vale:

$$
x-x_0=0.
$$

Il terzo termine:

$$
f[x_0,x_1,x_2](x-x_0)(x-x_1)
$$

serve a correggere il valore in $x_2$ senza cambiare i valori già corretti in $x_0$ e $x_1$.

Infatti:

$$
(x-x_0)(x-x_1)=0
$$

quando $x=x_0$ oppure $x=x_1$.

Lo stesso principio continua per tutti i nodi.

## Perché serve

Serve a costruire il polinomio interpolante in una base diversa da quella canonica e da quella di Lagrange.

La base usata è:

$$
1,
$$

$$
(x-x_0),
$$

$$
(x-x_0)(x-x_1),
$$

$$
\ldots,
$$

$$
(x-x_0)\cdots(x-x_{n-1}).
$$

I coefficienti rispetto a questa base sono le differenze divise.

## Uso negli esercizi

Negli esercizi si procede così:

1. si calcolano i valori $f[x_i]$;
2. si calcolano le differenze divise di ordine uno;
3. si calcolano quelle di ordine due;
4. si continua fino all’ordine $n$;
5. si prendono i coefficienti della forma di Newton;
6. si scrive il polinomio;
7. se richiesto, si sviluppa in forma canonica.

## Possibile domanda orale

> Enunci la forma di Newton del polinomio interpolante e spieghi il significato dei coefficienti.

Una risposta completa deve dire che i coefficienti sono differenze divise e che ogni nuovo termine si annulla nei nodi precedenti.

## Errore tipico

Mettere nel termine di ordine $k$ un prodotto con troppi fattori.

Il termine con coefficiente:

$$
f[x_0,\ldots,x_k]
$$

deve essere moltiplicato per:

$$
(x-x_0)\cdots(x-x_{k-1}).
$$

Ci sono quindi $k$ fattori.

Non compare il fattore:

$$
(x-x_k).
$$

---

# 5. Struttura progressiva della forma di Newton

Per capire meglio il teorema, consideriamo i primi casi.

## Un solo nodo

Con il nodo $x_0$:

$$
p_0(x)=f[x_0]=f(x_0).
$$

È un polinomio costante.

## Due nodi

Con $x_0,x_1$:

$$
p_1(x)
=
f[x_0]
+
f[x_0,x_1](x-x_0).
$$

Nel nodo $x_0$:

$$
p_1(x_0)=f[x_0].
$$

Nel nodo $x_1$:

$$
p_1(x_1)
=
f[x_0]
+
f[x_0,x_1](x_1-x_0).
$$

Poiché:

$$
f[x_0,x_1]
=
\frac{f[x_1]-f[x_0]}{x_1-x_0},
$$

si ha:

$$
p_1(x_1)
=
f[x_0]
+
f[x_1]-f[x_0]
=
f[x_1].
$$

## Tre nodi

Con $x_0,x_1,x_2$:

$$
p_2(x)
=
p_1(x)
+
f[x_0,x_1,x_2](x-x_0)(x-x_1).
$$

Il nuovo termine vale zero sia in $x_0$ sia in $x_1$.

Quindi:

$$
p_2(x_0)=p_1(x_0)=f(x_0),
$$

$$
p_2(x_1)=p_1(x_1)=f(x_1).
$$

Il coefficiente $f[x_0,x_1,x_2]$ viene scelto in modo che:

$$
p_2(x_2)=f(x_2).
$$

## Idea generale della dimostrazione

La prova si può interpretare per induzione.

Supponiamo di avere già il polinomio interpolante sui primi $k$ nodi:

$$
x_0,\ldots,x_{k-1}.
$$

Aggiungiamo:

$$
c_k(x-x_0)\cdots(x-x_{k-1}).
$$

Questo termine è nullo nei nodi precedenti. Quindi non modifica le condizioni già soddisfatte.

Il coefficiente $c_k$ viene scelto in modo da imporre l’interpolazione nel nuovo nodo $x_k$.

Il risultato è:

$$
c_k=f[x_0,\ldots,x_k].
$$

Questa è l’idea essenziale da saper spiegare all’orale.

---

# 6. Corollario: simmetria delle differenze divise

## Corollario 1.1

Sia

$$
f:[a,b]\to\mathbb R
$$

e siano

$$
x_0,x_1,\ldots,x_n\in[a,b]
$$

nodi distinti.

Allora:

$$
f[x_0,\ldots,x_n]
$$

non cambia se si permutano i suoi argomenti.

Se $\sigma$ è una permutazione dell’insieme:

$$
\{0,\ldots,n\},
$$

allora:

$$
f[x_0,\ldots,x_n]
=
f[x_{\sigma(0)},\ldots,x_{\sigma(n)}].
$$

## Ipotesi

- La funzione è definita sui nodi.
- I nodi sono distinti.
- $\sigma$ è una permutazione degli indici.

## Tesi

La differenza divisa di ordine $n$ è simmetrica rispetto ai nodi.

L’ordine con cui vengono scritti gli argomenti non cambia il valore finale.

## Significato intuitivo

La formula ricorsiva sembra dipendere dall’ordine dei nodi.

Per esempio:

$$
f[x_0,x_1,x_2]
$$

e

$$
f[x_2,x_0,x_1]
$$

sono calcolate con passaggi intermedi diversi.

Il corollario dice che il risultato finale è lo stesso.

## Perché serve

Serve a giustificare che la differenza divisa è una quantità associata all’insieme dei nodi, non al loro ordine.

È utile anche nei calcoli, perché possiamo scegliere un ordine conveniente.

Attenzione però: la **forma di Newton completa** cambia nella sua scrittura se cambiamo l’ordine dei nodi, perché cambiano i prodotti:

$$
(x-x_0),
\quad
(x-x_0)(x-x_1),
\quad \ldots
$$

Il polinomio finale resta lo stesso per unicità, ma la rappresentazione intermedia può essere diversa.

---

# 7. Dimostrazione della simmetria

## Idea generale

Si costruisce il polinomio interpolante due volte:

1. usando i nodi nell’ordine originale;
2. usando i nodi permutati.

Le due costruzioni devono dare lo stesso polinomio, perché i nodi e i valori interpolati sono gli stessi.

Poi si confrontano i coefficienti del termine di grado massimo.

## Passaggi

Sia $\sigma$ una permutazione di:

$$
\{0,\ldots,n\}.
$$

Applicando la forma di Newton ai nodi:

$$
x_0,\ldots,x_n,
$$

il coefficiente del termine:

$$
(x-x_0)\cdots(x-x_{n-1})
$$

è:

$$
f[x_0,\ldots,x_n].
$$

Applicando la forma di Newton ai nodi permutati:

$$
x_{\sigma(0)},\ldots,x_{\sigma(n)},
$$

il coefficiente del termine di ordine massimo è:

$$
f[x_{\sigma(0)},\ldots,x_{\sigma(n)}].
$$

In entrambi i casi si ottiene lo stesso polinomio interpolante:

$$
p(x).
$$

Questo accade perché permutare i nodi non cambia l’insieme dei dati interpolati.

## Perché si confrontano proprio i coefficienti direttori

Il prodotto:

$$
(x-x_0)\cdots(x-x_{n-1})
$$

è un polinomio monico di grado $n$.

Il suo termine di grado massimo è:

$$
x^n.
$$

Quindi il coefficiente:

$$
f[x_0,\ldots,x_n]
$$

è anche il coefficiente direttore del polinomio interpolante scritto in forma di Newton.

Nella forma permutata, anche:

$$
(x-x_{\sigma(0)})\cdots(x-x_{\sigma(n-1)})
$$

è monico di grado $n$.

Il suo coefficiente direttore è:

$$
f[x_{\sigma(0)},\ldots,x_{\sigma(n)}].
$$

Poiché i due polinomi sono uguali, devono avere lo stesso coefficiente di $x^n$.

Quindi:

$$
f[x_0,\ldots,x_n]
=
f[x_{\sigma(0)},\ldots,x_{\sigma(n)}].
$$

## Cosa sapere all’orale

Bisogna saper dire:

> Permutando i nodi si ottiene sempre lo stesso polinomio interpolante per il teorema di unicità. Nella forma di Newton, la differenza divisa di ordine massimo coincide con il coefficiente direttore, perché il prodotto associato è monico. Quindi le due differenze divise devono essere uguali.

## Errore tipico

Dire soltanto che “la formula è simmetrica”.

La formula ricorsiva non appare immediatamente simmetrica. La simmetria viene dimostrata usando l’unicità del polinomio interpolante.

---

# 8. Tabella delle differenze divise

Per organizzare i calcoli si usa la **tabella delle differenze divise**.

I calcoli vengono eseguiti colonna per colonna.

Con quattro nodi $x_0,x_1,x_2,x_3$, la struttura è:

| Nodi | Ordine 0 | Ordine 1 | Ordine 2 | Ordine 3 |
|---|---:|---:|---:|---:|
| $x_0$ | $f[x_0]$ | $f[x_0,x_1]$ | $f[x_0,x_1,x_2]$ | $f[x_0,x_1,x_2,x_3]$ |
| $x_1$ | $f[x_1]$ | $f[x_1,x_2]$ | $f[x_1,x_2,x_3]$ | |
| $x_2$ | $f[x_2]$ | $f[x_2,x_3]$ | | |
| $x_3$ | $f[x_3]$ | | | |

Nelle dispense vengono calcolate anche alcune differenze come:

$$
f[x_0,x_2],
\qquad
f[x_0,x_3],
$$

per seguire direttamente la definizione ricorsiva adottata.

I coefficienti della forma di Newton sono:

$$
f[x_0],
$$

$$
f[x_0,x_1],
$$

$$
f[x_0,x_1,x_2],
$$

$$
f[x_0,x_1,x_2,x_3].
$$

Sono quindi i valori che compaiono lungo la prima riga della struttura relativa all’ordine scelto.

## Attenzione

Non tutti i valori calcolati entrano direttamente nella forma di Newton.

Alcune differenze divise servono soltanto come passaggi intermedi.

---

# 9. Esempio 1.4: interpolazione di $f(x)=\sqrt{x}$

## Dati

La funzione è:

$$
f(x)=\sqrt{x}.
$$

I nodi sono:

$$
x_0=0,
\qquad
x_1=0.16,
\qquad
x_2=0.64,
\qquad
x_3=1.
$$

Cerchiamo il polinomio interpolante in:

- forma di Newton;
- forma canonica.

Poiché ci sono quattro nodi:

$$
n+1=4,
$$

quindi:

$$
n=3.
$$

Il polinomio ha grado al massimo $3$.

## 9.1 Struttura della forma di Newton

La formula è:

$$
\begin{aligned}
p(x)
={}&f[x_0]
+f[x_0,x_1](x-x_0)\\
&+f[x_0,x_1,x_2](x-x_0)(x-x_1)\\
&+f[x_0,x_1,x_2,x_3]
(x-x_0)(x-x_1)(x-x_2).
\end{aligned}
$$

Poiché:

$$
x_0=0,
$$

i prodotti con $(x-x_0)$ diventano semplicemente $x$.

---

# 10. Calcolo delle differenze divise

## 10.1 Valori di ordine zero

Calcoliamo i valori della funzione:

$$
f[x_0]=f(0)=0,
$$

$$
f[x_1]=f(0.16)=0.4,
$$

$$
f[x_2]=f(0.64)=0.8,
$$

$$
f[x_3]=f(1)=1.
$$

Questi valori sono semplici perché:

$$
0.16=(0.4)^2,
$$

$$
0.64=(0.8)^2.
$$

## 10.2 Differenze divise di ordine uno

### Tra $x_0$ e $x_1$

$$
f[x_0,x_1]
=
\frac{f[x_1]-f[x_0]}{x_1-x_0}.
$$

Sostituendo:

$$
f[x_0,x_1]
=
\frac{0.4-0}{0.16-0}
=
\frac{0.4}{0.16}
=
\frac52.
$$

### Tra $x_0$ e $x_2$

$$
f[x_0,x_2]
=
\frac{f[x_2]-f[x_0]}{x_2-x_0}.
$$

Quindi:

$$
f[x_0,x_2]
=
\frac{0.8}{0.64}
=
\frac54.
$$

### Tra $x_0$ e $x_3$

$$
f[x_0,x_3]
=
\frac{f[x_3]-f[x_0]}{x_3-x_0}
=
\frac{1}{1}
=
1.
$$

## 10.3 Differenze divise di ordine due

### Differenza $f[x_0,x_1,x_2]$

Per definizione:

$$
f[x_0,x_1,x_2]
=
\frac{
f[x_0,x_2]-f[x_0,x_1]
}{
x_2-x_1
}.
$$

Sostituendo:

$$
f[x_0,x_1,x_2]
=
\frac{
\frac54-\frac52
}{
0.64-0.16
}.
$$

Calcoliamo il numeratore:

$$
\frac54-\frac52
=
\frac54-\frac{10}{4}
=
-\frac54.
$$

Il denominatore è:

$$
0.64-0.16=0.48.
$$

Quindi:

$$
f[x_0,x_1,x_2]
=
\frac{-1.25}{0.48}.
$$

Scrivendo in frazione:

$$
-1.25=-\frac54,
$$

$$
0.48=\frac{12}{25}.
$$

Pertanto:

$$
f[x_0,x_1,x_2]
=
-\frac54\cdot\frac{25}{12}
=
-\frac{125}{48}.
$$

### Differenza $f[x_0,x_1,x_3]$

Per definizione:

$$
f[x_0,x_1,x_3]
=
\frac{
f[x_0,x_3]-f[x_0,x_1]
}{
x_3-x_1
}.
$$

Sostituendo:

$$
f[x_0,x_1,x_3]
=
\frac{
1-\frac52
}{
1-0.16
}.
$$

Il numeratore è:

$$
1-\frac52=-\frac32=-1.5.
$$

Il denominatore è:

$$
1-0.16=0.84.
$$

Quindi:

$$
f[x_0,x_1,x_3]
=
\frac{-1.5}{0.84}
=
-\frac{25}{14}.
$$

## 10.4 Differenza divisa di ordine tre

Ora:

$$
f[x_0,x_1,x_2,x_3]
=
\frac{
f[x_0,x_1,x_3]
-
f[x_0,x_1,x_2]
}{
x_3-x_2
}.
$$

Sostituendo:

$$
f[x_0,x_1,x_2,x_3]
=
\frac{
-\frac{25}{14}
+
\frac{125}{48}
}{
1-0.64
}.
$$

Nel numeratore abbiamo:

$$
-\frac{25}{14}+\frac{125}{48}.
$$

Il minimo comune multiplo di $14$ e $48$ è $336$.

Quindi:

$$
-\frac{25}{14}
=
-\frac{600}{336},
$$

$$
\frac{125}{48}
=
\frac{875}{336}.
$$

La somma è:

$$
-\frac{600}{336}
+
\frac{875}{336}
=
\frac{275}{336}.
$$

Il denominatore è:

$$
1-0.64=0.36=\frac9{25}.
$$

Quindi:

$$
f[x_0,x_1,x_2,x_3]
=
\frac{275}{336}\cdot\frac{25}{9}
=
\frac{6875}{3024}.
$$

---

# 11. Forma di Newton dell’esempio

I coefficienti necessari sono:

$$
f[x_0]=0,
$$

$$
f[x_0,x_1]=\frac52,
$$

$$
f[x_0,x_1,x_2]=-\frac{125}{48},
$$

$$
f[x_0,x_1,x_2,x_3]=\frac{6875}{3024}.
$$

Sostituendo nella formula:

$$
\begin{aligned}
p(x)
={}&0
+\frac52(x-0)\\
&-\frac{125}{48}(x-0)(x-0.16)\\
&+\frac{6875}{3024}
(x-0)(x-0.16)(x-0.64).
\end{aligned}
$$

Quindi:

$$
p(x)
=
\frac52x
-\frac{125}{48}x(x-0.16)
+\frac{6875}{3024}x(x-0.16)(x-0.64).
$$

Questa è la forma di Newton richiesta.

## Controllo strutturale

- Il primo termine è di grado $1$.
- Il secondo è di grado $2$.
- Il terzo è di grado $3$.
- Il grado totale è al massimo $3$.
- Ogni nuovo termine contiene i fattori relativi ai nodi precedenti.

---

# 12. Passaggio alla forma canonica

Vogliamo ottenere:

$$
p(x)=a_0+a_1x+a_2x^2+a_3x^3.
$$

Partiamo da:

$$
p(x)
=
\frac52x
-\frac{125}{48}x(x-0.16)
+\frac{6875}{3024}x(x-0.16)(x-0.64).
$$

## 12.1 Secondo termine

Scriviamo:

$$
0.16=\frac4{25}.
$$

Quindi:

$$
-\frac{125}{48}x\left(x-\frac4{25}\right).
$$

Sviluppando:

$$
-\frac{125}{48}x^2
+
\frac{125}{48}\cdot\frac4{25}x.
$$

Poiché:

$$
\frac{125}{48}\cdot\frac4{25}
=
\frac5{12},
$$

il secondo termine diventa:

$$
-\frac{125}{48}x^2+\frac5{12}x.
$$

## 12.2 Terzo termine

Scriviamo:

$$
0.64=\frac{16}{25}.
$$

Il prodotto è:

$$
x\left(x-\frac4{25}\right)\left(x-\frac{16}{25}\right).
$$

Prima moltiplichiamo gli ultimi due fattori:

$$
\left(x-\frac4{25}\right)
\left(x-\frac{16}{25}\right)
=
x^2-\frac{20}{25}x+\frac{64}{625}.
$$

Poiché:

$$
\frac{20}{25}=\frac45,
$$

si ha:

$$
\left(x-\frac4{25}\right)
\left(x-\frac{16}{25}\right)
=
x^2-\frac45x+\frac{64}{625}.
$$

Moltiplicando per $x$:

$$
x^3-\frac45x^2+\frac{64}{625}x.
$$

Quindi il terzo termine è:

$$
\frac{6875}{3024}x^3
-
\frac{6875}{3024}\cdot\frac45x^2
+
\frac{6875}{3024}\cdot\frac{64}{625}x.
$$

## 12.3 Raccolta dei coefficienti

### Coefficiente di $x^3$

$$
a_3=\frac{6875}{3024}.
$$

### Coefficiente di $x^2$

Proviene da:

$$
-\frac{125}{48}x^2
$$

e da:

$$
-\frac{6875}{3024}\cdot\frac45x^2.
$$

Il risultato è:

$$
a_2=-\frac{13375}{3024}.
$$

### Coefficiente di $x$

Proviene da:

$$
\frac52x,
$$

$$
\frac5{12}x,
$$

e dal termine lineare del prodotto cubico.

Il risultato è:

$$
a_1=\frac{2381}{756}.
$$

### Termine costante

Tutti i termini contengono un fattore $x$, quindi:

$$
a_0=0.
$$

La forma canonica è:

$$
\boxed{
p(x)
=
\frac{6875}{3024}x^3
-
\frac{13375}{3024}x^2
+
\frac{2381}{756}x
}.
$$

## Controllo finale

Poiché:

$$
p(0)=0,
$$

il primo dato è rispettato immediatamente.

Bisogna inoltre verificare, almeno concettualmente:

$$
p(0.16)=0.4,
$$

$$
p(0.64)=0.8,
$$

$$
p(1)=1.
$$

---

# 13. Osservazione: quando non è data una funzione

Supponiamo di avere soltanto punti:

$$
(x_0,y_0),
\quad
(x_1,y_1),
\quad
\ldots,
\quad
(x_n,y_n),
$$

con ascisse distinte.

Non è necessario conoscere una formula esplicita di una funzione $f$.

Possiamo immaginare una qualsiasi funzione tale che:

$$
f(x_i)=y_i.
$$

Poi usiamo:

$$
f[x_i]=y_i.
$$

Le differenze divise vengono calcolate direttamente dai valori $y_i$.

Per esempio:

$$
f[x_0,x_1]
=
\frac{y_1-y_0}{x_1-x_0}.
$$

Quindi la forma di Newton può essere usata anche quando l’esercizio fornisce solo una tabella di dati.

## Perché è lecito

Il polinomio interpolante dipende soltanto dai nodi e dai valori associati.

Non dipende dalla formula della funzione che eventualmente ha generato quei valori.

Per questo si parla anche di polinomio interpolante dei dati:

$$
(x_0,y_0),\ldots,(x_n,y_n).
$$

## Uso negli esercizi

Se il testo fornisce solo coppie $(x_i,y_i)$:

1. poni mentalmente $f(x_i)=y_i$;
2. costruisci le differenze divise;
3. scrivi la forma di Newton;
4. sviluppa se richiesta la forma canonica.

---

# 14. Confronto tra forma canonica, Lagrange e Newton

## Forma canonica

$$
p(x)=a_0+a_1x+\cdots+a_nx^n.
$$

### Vantaggi

- mostra subito i coefficienti;
- rende chiaro il grado effettivo;
- è comoda per derivare e integrare.

### Svantaggi

- i coefficienti non si ottengono direttamente dai dati;
- spesso richiede la soluzione di un sistema.

## Forma di Lagrange

$$
p(x)=\sum_{j=0}^n f(x_j)L_j(x).
$$

### Vantaggi

- si costruisce direttamente;
- verifica facilmente l’interpolazione;
- non richiede una tabella ricorsiva.

### Svantaggi

- può diventare lunga;
- aggiungere un nodo richiede normalmente di ricostruire tutti i polinomi fondamentali.

## Forma di Newton

$$
p(x)
=
f[x_0]
+
f[x_0,x_1](x-x_0)
+\cdots.
$$

### Vantaggi

- costruzione progressiva;
- coefficienti organizzati in tabella;
- facile aggiunta di nuovi nodi;
- passaggio ordinato alla forma canonica.

### Svantaggi

- richiede attenzione nella costruzione delle differenze divise;
- la forma dipende dall’ordine scelto per i nodi, anche se il polinomio finale non cambia.

---

# 15. Collegamento con gli esercizi d’esame

## Tipo 1: calcolare differenze divise

### Come riconoscerlo

Il testo chiede:

- “calcolare le differenze divise”;
- “costruire la tabella”;
- “determinare i coefficienti di Newton”.

### Dati forniti

- nodi $x_i$;
- valori $f(x_i)$ oppure valori $y_i$.

### Procedura

1. scrivere i valori di ordine zero;
2. calcolare le differenze di ordine uno;
3. usare queste per l’ordine due;
4. proseguire fino all’ordine richiesto.

### Controlli

- denominatori non nulli;
- ordine corretto dei nodi;
- segni delle sottrazioni;
- frazioni semplificate.

### Errore frequente

Confondere:

$$
x_k-x_{k-1}
$$

con:

$$
x_{k-1}-x_k.
$$

---

## Tipo 2: scrivere la forma di Newton

### Come riconoscerlo

Il testo chiede esplicitamente:

> Scrivere il polinomio interpolante in forma di Newton.

### Procedura

Dopo aver calcolato i coefficienti:

$$
f[x_0],
\quad
f[x_0,x_1],
\quad
\ldots,
$$

si scrive:

$$
p(x)
=
f[x_0]
+
f[x_0,x_1](x-x_0)
+
f[x_0,x_1,x_2](x-x_0)(x-x_1)
+\cdots.
$$

### Controlli

Il coefficiente di ordine $k$ deve avere esattamente $k$ fattori.

---

## Tipo 3: passare alla forma canonica

### Procedura

1. partire dalla forma di Newton;
2. trasformare i decimali in frazioni, se utile;
3. sviluppare i prodotti;
4. moltiplicare per i coefficienti;
5. raccogliere le potenze uguali;
6. ordinare per grado.

### Controlli

- grado al massimo $n$;
- verifica nei nodi;
- termine costante coerente.

---

## Tipo 4: dati senza funzione esplicita

### Come riconoscerlo

Sono date solo coppie:

$$
(x_i,y_i).
$$

### Procedura

Usare:

$$
f[x_i]=y_i
$$

e calcolare normalmente tutte le differenze divise.

Non serve inventare una formula per $f$.

---

## Tipo 5: dimostrare la simmetria

### Strategia

1. scrivere la forma di Newton con i nodi in un ordine;
2. scriverla con i nodi permutati;
3. usare l’unicità dell’interpolante;
4. confrontare i coefficienti direttori;
5. concludere che la differenza divisa di ordine massimo è invariata.

---

# 16. Schema operativo

## Quando vedo un esercizio sulla forma di Newton, faccio così

### 1. Identifico i nodi e i valori

Scrivo:

$$
x_0,\ldots,x_n
$$

e:

$$
f(x_0),\ldots,f(x_n).
$$

Se sono dati $y_i$, pongo:

$$
f[x_i]=y_i.
$$

### 2. Controllo che i nodi siano distinti

Deve valere:

$$
x_i\neq x_j
$$

per $i\neq j$.

### 3. Determino il grado massimo

Con $n+1$ nodi:

$$
\deg p\leq n.
$$

### 4. Calcolo le differenze di ordine zero

$$
f[x_i]=f(x_i).
$$

### 5. Calcolo le differenze di ordine uno

$$
f[x_i,x_j]
=
\frac{f[x_j]-f[x_i]}{x_j-x_i}.
$$

### 6. Calcolo gli ordini successivi

Uso la definizione ricorsiva e procedo colonna per colonna.

### 7. Seleziono i coefficienti della forma di Newton

Prendo:

$$
f[x_0],
$$

$$
f[x_0,x_1],
$$

$$
f[x_0,x_1,x_2],
$$

e così via.

### 8. Scrivo la forma di Newton

$$
p(x)
=
f[x_0]
+
\sum_{k=1}^n
f[x_0,\ldots,x_k]
\prod_{j=0}^{k-1}(x-x_j).
$$

### 9. Sviluppo se richiesta la forma canonica

Espando un prodotto alla volta.

### 10. Verifico

Controllo:

$$
p(x_i)=f(x_i).
$$

---

# 17. Errori frequenti

1. Usare nodi coincidenti.
2. Sbagliare l’ordine della sottrazione al numeratore.
3. Sbagliare il denominatore.
4. Confondere $f[x_i]$ con una funzione diversa da $f(x_i)$.
5. Inserire tutte le differenze divise nella forma di Newton.
6. Dimenticare un fattore $(x-x_j)$.
7. Inserire anche $(x-x_k)$ nel termine con $f[x_0,\ldots,x_k]$.
8. Confondere forma di Newton e forma canonica.
9. Pensare che la formula richieda una funzione derivabile.
10. Pensare che senza formula esplicita di $f$ non si possa interpolare.
11. Dire che permutare i nodi lascia identica la scrittura di Newton.
12. Non usare l’unicità nella dimostrazione della simmetria.
13. Usare troppo presto i decimali e perdere precisione.
14. Non verificare il polinomio nei nodi.

---

# 18. Cosa sapere all’orale

Bisogna saper esporre questi punti.

## Definizioni

- differenza divisa di ordine zero;
- differenza divisa di ordine uno;
- definizione ricorsiva;
- forma di Newton.

## Teoremi

- enunciato della forma di Newton;
- ipotesi dei nodi distinti;
- simmetria delle differenze divise.

## Dimostrazioni

Bisogna saper spiegare almeno l’idea:

1. la forma di Newton costruisce l’interpolante progressivamente;
2. ogni nuovo termine si annulla nei nodi precedenti;
3. il coefficiente viene scelto per imporre il valore nel nuovo nodo;
4. la simmetria segue dall’unicità dell’interpolante;
5. la differenza divisa di ordine massimo coincide con il coefficiente direttore.

## Domande probabili

- Che cos’è una differenza divisa?
- Qual è il legame con il rapporto incrementale?
- Come si costruisce la forma di Newton?
- Perché ogni nuovo termine non altera i valori nei nodi precedenti?
- Quali coefficienti si prendono dalla tabella?
- La forma di Newton dipende dall’ordine dei nodi?
- La differenza divisa dipende dall’ordine?
- Come si dimostra la simmetria?
- Si può usare Newton se non è data la formula di $f$?
- Come si passa alla forma canonica?

---

# 19. Riassunto finale

Le differenze divise sono definite ricorsivamente.

Per un solo nodo:

$$
f[x_i]=f(x_i).
$$

Per due nodi:

$$
f[x_i,x_j]
=
\frac{f(x_j)-f(x_i)}{x_j-x_i}.
$$

Per più nodi:

$$
f[y_1,\ldots,y_k]
=
\frac{
f[y_1,\ldots,y_{k-2},y_k]
-
f[y_1,\ldots,y_{k-1}]
}{
y_k-y_{k-1}
}.
$$

Il polinomio interpolante in forma di Newton è:

$$
\begin{aligned}
p(x)
={}&f[x_0]
+f[x_0,x_1](x-x_0)\\
&+f[x_0,x_1,x_2](x-x_0)(x-x_1)\\
&+\cdots\\
&+f[x_0,\ldots,x_n](x-x_0)\cdots(x-x_{n-1}).
\end{aligned}
$$

Ogni nuovo termine si annulla nei nodi precedenti.

La differenza divisa:

$$
f[x_0,\ldots,x_n]
$$

non cambia se si permutano i nodi.

Nell’esempio con:

$$
f(x)=\sqrt{x},
$$

e nodi:

$$
0,\quad0.16,\quad0.64,\quad1,
$$

si ottiene:

$$
p(x)
=
\frac52x
-\frac{125}{48}x(x-0.16)
+\frac{6875}{3024}x(x-0.16)(x-0.64).
$$

In forma canonica:

$$
p(x)
=
\frac{6875}{3024}x^3
-
\frac{13375}{3024}x^2
+
\frac{2381}{756}x.
$$

La forma di Newton può essere usata anche quando sono dati soltanto punti $(x_i,y_i)$.

---

# 20. Domande di controllo

## Domande base

1. Che cosa significa $f[x_i]$?
2. Come si definisce $f[x_i,x_j]$?
3. Qual è il legame tra $f[x_i,x_j]$ e il rapporto incrementale?
4. Perché i nodi devono essere distinti?
5. Qual è la differenza tra forma canonica e forma di Newton?

## Domande teoriche

1. Enuncia il teorema della forma di Newton.
2. Quali sono le ipotesi del teorema?
3. Perché il termine di ordine $k$ contiene i fattori fino a $(x-x_{k-1})$?
4. Perché aggiungere un nuovo termine non modifica i valori nei nodi precedenti?
5. Che cosa significa che le differenze divise sono simmetriche?

## Domande da orale

1. Spiega la costruzione progressiva del polinomio di Newton.
2. Dimostra il corollario sulla simmetria delle differenze divise.
3. Spiega perché la differenza divisa di ordine massimo è il coefficiente direttore.
4. Confronta forma canonica, forma di Lagrange e forma di Newton.
5. Spiega come si usa Newton quando non è data una formula esplicita di $f$.

## Domande applicative

1. Calcola le differenze divise di ordine uno per i dati:

   $$
   (0,1),\quad(1,3),\quad(2,7).
   $$

2. Costruisci la forma di Newton del polinomio interpolante dei dati:

   $$
   (0,1),\quad(1,2),\quad(3,10).
   $$

3. Trasforma in forma canonica:

   $$
   p(x)=2+3(x-1)-\frac12(x-1)(x-2).
   $$

4. Verifica direttamente che:

   $$
   f[x_0,x_1]=f[x_1,x_0].
   $$
"""