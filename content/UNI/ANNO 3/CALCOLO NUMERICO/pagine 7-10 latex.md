# 0. Panoramica della lezione
Le pagine 7-10 introducono il **resto dell’interpolazione polinomiale**, cioè una formula che descrive l’errore commesso quando una funzione $f(x)$ viene sostituita con il suo polinomio interpolante $p(x)$.

Gli argomenti sono la formula del resto, la dimostrazione con il teorema di Rolle, le stime puntuali e uniformi e le applicazioni a $\sin(x)$ ed $e^{x^2}$.

## Macroargomento del corso

> **Interpolazione polinomiale**

Dopo aver costruito l’interpolante, studiamo quanto $p(x)$ possa differire da $f(x)$ fuori dai nodi.

## Perché è importante

Il polinomio coincide con $f$ nei nodi, ma non necessariamente negli altri punti. La formula del resto permette di controllare l’errore, confrontare le scelte dei nodi e stimare valori senza calcolare esplicitamente $p(x)$. È inoltre una base per le successive formule di integrazione numerica.

## Prerequisiti essenziali

Servono il teorema di esistenza e unicità, il teorema di Rolle, le derivate successive, il massimo di una funzione continua su un intervallo chiuso e la ricerca dei punti stazionari.

## Principali esercizi collegati

Gli esercizi chiedono di stimare l’errore in un punto o su un intervallo, maggiorare $f^{(n+1)}$, studiare il prodotto nodale e confrontare una stima semplice con una più precisa.

## Risultati più probabili all’orale

Bisogna conoscere l’enunciato, la dimostrazione con $z(y)$ e Rolle, il significato di $\xi$, i passaggi $p^{(n+1)}=0$ e $\pi^{(n+1)}=(n+1)!$, e la differenza tra stima puntuale e uniforme.

# Indice ragionato

1. Dal polinomio interpolante al suo errore.
2. Teorema del resto dell’interpolazione.
3. Dimostrazione mediante la funzione ausiliaria.
4. Dalla formula esatta alla stima numerica.
5. Esempio: interpolazione di $\sin(x)$.
6. Esempio: interpolazione di $e^{x^2}$.
7. Stima uniforme e stima in un punto.
8. Collegamento con gli esercizi d’esame.
9. Schema operativo.
10. Cosa sapere all’orale.
11. Riassunto.
12. Domande di controllo.

# 1. Contesto generale

Dati $n+1$ nodi distinti

$$
x_0,x_1,\ldots,x_n\in[a,b],
$$

e una funzione $f$, il teorema fondamentale dell’interpolazione garantisce l’esistenza di un unico polinomio $p\in\mathbb R_n[x]$ tale che

$$
p(x_i)=f(x_i),\qquad i=0,\ldots,n.
$$

Questa proprietà riguarda però soltanto i nodi. In un punto generico $x\in[a,b]$ consideriamo l’errore

$$
r(x)=f(x)-p(x).
$$

L’obiettivo delle nuove pagine è descrivere questo errore e poi maggiorarne il valore assoluto.

La formula ottenuta separa l’errore in due fattori:

1. un fattore che dipende dalla funzione, tramite $f^{(n+1)}$;
2. un fattore che dipende dai nodi e dal punto $x$, tramite il prodotto

$$
(x-x_0)(x-x_1)\cdots(x-x_n).
$$

Questa separazione è molto utile negli esercizi. Possiamo studiare indipendentemente la grandezza della derivata e la disposizione dei nodi.

# 2. Teorema del resto dell’interpolazione

## Teorema 1.2

### Enunciato

Sia

$$
f:[a,b]\to\mathbb R
$$

una funzione di classe $C^{n+1}[a,b]$. Sia $p(x)$ il polinomio interpolante di $f(x)$ sugli $n+1$ nodi distinti

$$
x_0,x_1,\ldots,x_n\in[a,b].
$$

Allora, per ogni $x\in[a,b]$, esiste un punto

$$
\xi=\xi(x)\in(a,b)
$$

tale che

$$
f(x)-p(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)(x-x_1)\cdots(x-x_n).
$$

### Ipotesi

Le ipotesi da ricordare sono:

- $f\in C^{n+1}[a,b]$;
- i nodi $x_0,\ldots,x_n$ sono distinti;
- tutti i nodi appartengono a $[a,b]$;
- il punto $x$ in cui si valuta l’errore appartiene a $[a,b]$;
- $p$ è il polinomio interpolante di grado al massimo $n$.

L’ipotesi $f\in C^{n+1}[a,b]$ serve per poter derivare la funzione ausiliaria $n+1$ volte e applicare ripetutamente il teorema di Rolle.

### Tesi

Per ogni punto $x$ esiste almeno un punto $\xi$, generalmente sconosciuto e dipendente da $x$, che rende vera la formula.

Non si afferma che lo stesso $\xi$ funzioni per tutti i punti dell’intervallo.

### Significato intuitivo

L’errore è proporzionale a:

$$
f^{(n+1)}(\xi)
$$

e al prodotto delle distanze orientate di $x$ dai nodi:

$$
\prod_{i=0}^n(x-x_i).
$$

Il prodotto si annulla quando $x$ coincide con un nodo. La formula riflette quindi automaticamente la proprietà di interpolazione.

La derivata di ordine $n+1$ misura quanto la funzione si discosta dal comportamento di un polinomio di grado al massimo $n$. Se $f$ è essa stessa un polinomio di grado al massimo $n$, allora

$$
f^{(n+1)}=0
$$

e l’errore è nullo in tutto l’intervallo.

### Perché serve

Poiché $\xi$ è ignoto, la formula viene usata soprattutto per ottenere maggiorazioni dell’errore tramite il massimo di $|f^{(n+1)}|$.

### Errore tipico

Usare la derivata $f^{(n)}$ invece di $f^{(n+1)}$, oppure dimenticare il fattoriale $(n+1)!$.

# 3. Dimostrazione del teorema

## 3.1 Idea generale

Fissiamo il punto $x$ in cui vogliamo studiare l’errore. Costruiamo una funzione ausiliaria $z(y)$ che:

- si annulla nei $n+1$ nodi;
- si annulla anche nel punto $x$;
- ha quindi almeno $n+2$ zeri;
- dopo $n+1$ applicazioni del teorema di Rolle ha una derivata di ordine $n+1$ nulla in almeno un punto $\xi$.

Calcolando $z^{(n+1)}(\xi)=0$ si ricava la formula del resto.

## 3.2 Caso in cui $x$ è un nodo

Se

$$
x=x_i
$$

per qualche $i$, allora per definizione di interpolazione

$$
f(x)-p(x)=0.
$$

Anche il prodotto

$$
(x-x_0)\cdots(x-x_n)
$$

è nullo, perché contiene il fattore $x-x_i=0$.

La formula è quindi vera per qualunque $\xi\in(a,b)$.

Il caso interessante è quello in cui $x$ non coincide con nessun nodo.

## 3.3 Definizione di $\pi(y)$ e del resto $r(y)$

Definiamo il polinomio nodale

$$
\pi(y)=(y-x_0)(y-x_1)\cdots(y-x_n).
$$

Esso ha grado $n+1$, è monico e si annulla in tutti i nodi.

Definiamo inoltre

$$
r(y)=f(y)-p(y).
$$

Poiché $p$ interpola $f$, vale

$$
r(x_i)=0,\qquad i=0,\ldots,n.
$$

## 3.4 Costruzione della funzione ausiliaria

Si considera

$$
z(y)=r(y)-\frac{r(x)}{\pi(x)}\pi(y).
$$

Il rapporto è ben definito perché stiamo supponendo che $x$ non coincida con nessun nodo. Quindi

$$
\pi(x)\neq0.
$$

La costante

$$
\frac{r(x)}{\pi(x)}
$$

è scelta in modo preciso per imporre anche lo zero nel punto $x$.

Infatti:

$$
z(x)=r(x)-\frac{r(x)}{\pi(x)}\pi(x)=0.
$$

Nei nodi, invece, si ha

$$
z(x_i)=r(x_i)-\frac{r(x)}{\pi(x)}\pi(x_i)=0-\frac{r(x)}{\pi(x)}\cdot0=0.
$$

Dunque $z$ si annulla nei punti

$$
x_0,x_1,\ldots,x_n,x.
$$

Essi sono almeno $n+2$ punti distinti.

## 3.5 Applicazioni ripetute del teorema di Rolle

Ordinando gli $n+2$ zeri lungo l’intervallo, tra ogni coppia consecutiva esiste almeno uno zero di $z'$. Quindi $z'$ ha almeno $n+1$ zeri.

Applicando ancora Rolle:

- $z''$ ha almeno $n$ zeri;
- $z'''$ ha almeno $n-1$ zeri;
- continuando, $z^{(n+1)}$ ha almeno uno zero.

Esiste quindi

$$
\xi\in(a,b)
$$

tale che

$$
z^{(n+1)}(\xi)=0.
$$

All’orale è importante spiegare che il numero degli zeri diminuisce di almeno uno a ogni derivazione.

## 3.6 Calcolo della derivata di ordine $n+1$

Partiamo da

$$
z(y)=r(y)-\frac{r(x)}{\pi(x)}\pi(y).
$$

Il termine $r(x)/\pi(x)$ è costante rispetto alla variabile $y$. Quindi

$$
z^{(n+1)}(y)=r^{(n+1)}(y)-\frac{r(x)}{\pi(x)}\pi^{(n+1)}(y).
$$

Poiché

$$
r(y)=f(y)-p(y),
$$

si ha

$$
r^{(n+1)}(y)=f^{(n+1)}(y)-p^{(n+1)}(y).
$$

Essendo $p$ di grado al massimo $n$:

$$
p^{(n+1)}(y)=0.
$$

Inoltre $\pi$ è un polinomio monico di grado $n+1$. Il suo termine di grado massimo è $y^{n+1}$; derivandolo $n+1$ volte si ottiene $(n+1)!$, mentre tutti i termini di grado minore scompaiono. Perciò

$$
\pi^{(n+1)}(y)=(n+1)!.
$$

Valutando nel punto $\xi$:

$$
0=z^{(n+1)}(\xi)
=f^{(n+1)}(\xi)-\frac{r(x)}{\pi(x)}(n+1)!.
$$

Da cui

$$
\frac{r(x)}{\pi(x)}=\frac{f^{(n+1)}(\xi)}{(n+1)!}.
$$

Moltiplicando per $\pi(x)$ e ricordando che $r(x)=f(x)-p(x)$:

$$
f(x)-p(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\pi(x).
$$

Infine:

$$
f(x)-p(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)\cdots(x-x_n).
$$

## Cosa saper ripetere all’orale

Bisogna saper motivare la scelta di $z$, il conteggio degli zeri, le applicazioni di Rolle e i passaggi finali che usano $p^{(n+1)}=0$ e $\pi^{(n+1)}=(n+1)!$.

# 4. Dalla formula esatta alla stima dell’errore

Prendendo il valore assoluto:

$$
|f(x)-p(x)|
=\frac{|f^{(n+1)}(\xi)|}{(n+1)!}\prod_{i=0}^n|x-x_i|.
$$

Poiché $\xi$ è sconosciuto, si cerca una maggiorazione valida su tutto l’intervallo:

$$
|f^{(n+1)}(\xi)|\leq M_{n+1},
$$

con

$$
M_{n+1}=\max_{y\in[a,b]}|f^{(n+1)}(y)|.
$$

Pertanto:

$$
|f(x)-p(x)|\leq\frac{M_{n+1}}{(n+1)!}\prod_{i=0}^n|x-x_i|.
$$

## Stima puntuale

Se $x=t$ è fissato, si sostituisce direttamente il valore $t$:

$$
|f(t)-p(t)|\leq\frac{M_{n+1}}{(n+1)!}\prod_{i=0}^n|t-x_i|.
$$

Questa è spesso più precisa perché non dobbiamo maggiorare il prodotto per tutti i punti dell’intervallo.

## Stima uniforme

Se si cerca una costante $C$ valida per ogni $x\in[a,b]$, si usa

$$
|f(x)-p(x)|\leq
\frac{M_{n+1}}{(n+1)!}
\max_{y\in[a,b]}\left|\prod_{i=0}^n(y-x_i)\right|.
$$

Definendo

$$
\omega(y)=\prod_{i=0}^n(y-x_i),
$$

la costante può essere scelta come

$$
C=\frac{M_{n+1}}{(n+1)!}\max_{y\in[a,b]}|\omega(y)|.
$$

# 5. Esempio 1.2: interpolazione di $\sin(x)$

I nodi sono

$$
x_0=0,\qquad x_1=\frac\pi6,\qquad x_2=\frac\pi4,
$$

e si fissa $t\in[0,1]$.

Il polinomio interpolante è di grado al massimo $2$, quindi nella formula compare la terza derivata:

$$
f'''(x)=-\cos(x).
$$

Poiché

$$
|\cos(\xi)|\leq1,
$$

si ha

$$
|\sin(t)-p(t)|
\leq\frac16|t|\left|t-\frac\pi6\right|\left|t-\frac\pi4\right|.
$$

## 5.1 Stima semplice

Per $t\in[0,1]$:

$$
|t|\leq1.
$$

Inoltre, nelle dispense si usano le maggiorazioni

$$
\left|t-\frac\pi6\right|\leq\frac\pi6,
\qquad
\left|t-\frac\pi4\right|\leq\frac\pi4.
$$

Si ottiene

$$
|\sin(t)-p(t)|
\leq\frac16\cdot1\cdot\frac\pi6\cdot\frac\pi4
\approx0.0685.
$$

Questa stima è rapida, ma maggiora separatamente i fattori. Il massimo del prodotto può essere molto minore del prodotto dei singoli massimi.

## 5.2 Stima più precisa

Si definisce

$$
\omega(y)=y\left(y-\frac\pi6\right)\left(y-\frac\pi4\right).
$$

Allora

$$
|\sin(t)-p(t)|\leq\frac16\max_{y\in[0,1]}|\omega(y)|.
$$

Sviluppando:

$$
\omega(y)=y^3-\frac{5\pi}{12}y^2+\frac{\pi^2}{24}y.
$$

La derivata è

$$
\omega'(y)=3y^2-\frac{5\pi}{6}y+\frac{\pi^2}{24}.
$$

I punti stazionari sono

$$
y_{1,2}=\frac{5\pi}{36}\pm\frac{\sqrt7\pi}{36}.
$$

Per trovare il massimo di $|\omega|$ su un intervallo chiuso bisogna confrontare:

- gli estremi $0$ e $1$;
- tutti i punti stazionari interni.

Dalle valutazioni delle dispense:

$$
\max_{y\in[0,1]}|\omega(y)|\leq0.103.
$$

Quindi

$$
|\sin(t)-p(t)|\leq\frac{0.103}{6}\approx0.0172.
$$

La seconda stima è circa quattro volte più piccola della prima.

## Insegnamento dell’esempio

Non serve conoscere $p(x)$. La stima semplice è rapida; quella precisa richiede il massimo di $|\omega|$ e può diventare difficile con molti nodi.

# 6. Esempio 1.3: interpolazione di $e^{x^2}$

La funzione è

$$
f(x)=e^{x^2},
$$

con nodi

$$
x_0=0,\qquad x_1=\frac12,\qquad x_2=1.
$$

Anche qui $n=2$, quindi serve $f'''$.

## 6.1 Calcolo delle derivate

Prima derivata:

$$
f'(x)=2xe^{x^2}.
$$

Seconda derivata, usando la regola del prodotto:

$$
f''(x)=2e^{x^2}+2x\cdot2xe^{x^2}
=(2+4x^2)e^{x^2}.
$$

Terza derivata:

$$
f'''(x)=8xe^{x^2}+(2+4x^2)2xe^{x^2}.
$$

Raccogliendo:

$$
f'''(x)=(12x+8x^3)e^{x^2}.
$$

Per $x\in[0,1]$ tutti i fattori sono non negativi. Inoltre

$$
12x+8x^3\leq20
$$

e

$$
e^{x^2}\leq e.
$$

Quindi

$$
|f'''(x)|\leq20e.
$$

La maggiorazione è esatta nel senso che il massimo viene raggiunto in $x=1$:

$$
f'''(1)=20e.
$$

## 6.2 Stima uniforme semplice

La formula del resto dà

$$
|f(x)-p(x)|
\leq\frac{20e}{6}|x|\left|x-\frac12\right||x-1|.
$$

Maggiorando separatamente su $[0,1]$:

$$
|x|\leq1,
\qquad
\left|x-\frac12\right|\leq\frac12,
\qquad
|x-1|\leq1,
$$

si ottiene

$$
|f(x)-p(x)|\leq\frac{20e}{6}\cdot1\cdot\frac12\cdot1
\approx4.530.
$$

La stima è valida, ma molto larga.

## 6.3 Stima uniforme più precisa

Definiamo

$$
\omega(y)=y\left(y-\frac12\right)(y-1).
$$

Sviluppando:

$$
\omega(y)=y^3-\frac32y^2+\frac12y.
$$

La derivata è

$$
\omega'(y)=3y^2-3y+\frac12.
$$

I punti stazionari sono

$$
y_{1,2}=\frac12\pm\frac{\sqrt3}{6}.
$$

Valutando $|\omega|$ agli estremi e nei punti stazionari:

$$
\max_{y\in[0,1]}|\omega(y)|=\frac{\sqrt3}{36}.
$$

Pertanto

$$
|f(x)-p(x)|
\leq\frac{20e}{6}\frac{\sqrt3}{36}
\approx0.436.
$$

La differenza rispetto alla stima semplice è notevole. Il miglioramento non deriva da una stima migliore di $f'''$, che era già esatta, ma da una valutazione più accurata del prodotto nodale.

## 6.4 Stima nel punto $x=1/3$

Poiché

$$
f\left(\frac13\right)=e^{1/9}=\sqrt[9]{e},
$$

la stima uniforme permette subito di scrivere

$$
\left|\sqrt[9]{e}-p\left(\frac13\right)\right|\leq0.436.
$$

Una stima puntuale migliore si ottiene sostituendo direttamente $x=1/3$ nella formula:

$$
\left|\sqrt[9]{e}-p\left(\frac13\right)\right|
\leq
\frac{20e}{6}
\left|\frac13\right|
\left|\frac13-\frac12\right|
\left|\frac13-1\right|.
$$

Poiché

$$
\left|\frac13-\frac12\right|=\frac16,
\qquad
\left|\frac13-1\right|=\frac23,
$$

si ottiene

$$
\left|\sqrt[9]{e}-p\left(\frac13\right)\right|
\leq
\frac{20e}{6}\cdot\frac13\cdot\frac16\cdot\frac23
\approx0.336.
$$

## Insegnamento dell’esempio

La stima uniforme controlla il caso peggiore sull’intervallo. Per un punto già fissato conviene valutare direttamente il prodotto nodale.

# 7. Osservazioni importanti

Per stimare l’errore non serve conoscere $p(x)$: bastano $f^{(n+1)}$, i nodi e il punto o intervallo di interesse.

La stima più precisa richiede il massimo del polinomio nodale

$$
\omega(y)=\prod_{i=0}^n(y-x_i).
$$

Poiché $\omega'$ ha grado $n$, con molti nodi la ricerca esatta dei punti stazionari può essere difficile. In quel caso conviene usare una maggiorazione semplice. L’intervallo scelto deve contenere nodi e punto di valutazione; in genere conviene prendere il più piccolo possibile.

# 8. Collegamento con gli esercizi d’esame

## Stima in un punto fissato

Si riconosce dalla richiesta $|f(t)-p(t)|$. Si contano i nodi, si calcola $f^{(n+1)}$, si sceglie un intervallo contenente nodi e $t$, si maggiora la derivata e si valuta esattamente $\prod|t-x_i|$.

## Stima valida su tutto l’intervallo

La richiesta è trovare $C$ tale che $|f(x)-p(x)|\leq C$. Oltre alla derivata, bisogna maggiorare il prodotto nodale. Si può maggiorare ogni fattore separatamente oppure calcolare $\max|\omega|$.

## Confronto tra stime

La stima semplice usa il prodotto dei massimi dei singoli fattori. La stima più precisa usa il massimo del prodotto completo. In generale:

$$
\max\left|\prod_i g_i(x)
ight|\leq\prod_i\max|g_i(x)|.
$$

## Esercizi senza calcolare $f(t)$ e $p(t)$

Questa richiesta segnala l’uso diretto del teorema del resto: servono solo la derivata, i nodi e il punto di valutazione.

# 9. Schema operativo

## Quando vedo un esercizio sul resto dell’interpolazione, faccio così

1. **Identifico il numero dei nodi.** Con $n+1$ nodi, il polinomio ha grado al massimo $n$ e serve $f^{(n+1)}$.

2. **Controllo le ipotesi.** I nodi devono essere distinti e la funzione deve appartenere a $C^{n+1}$ sull’intervallo scelto.

3. **Scelgo l’intervallo.** Deve contenere tutti i nodi e il punto di valutazione. Scelgo, se possibile, il più piccolo.

4. **Calcolo la derivata necessaria.** Determino $f^{(n+1)}(x)$ con attenzione ai prodotti e alle composizioni.

5. **Maggioro la derivata.** Trovo

$$
M_{n+1}=\max|f^{(n+1)}|.
$$

6. **Studio il prodotto nodale.** Se il punto è fissato, lo valuto direttamente. Se serve una stima uniforme, scelgo tra maggiorazione semplice e massimo di $|\omega|$.

7. **Inserisco il fattoriale.** Scrivo sempre il denominatore $(n+1)!$.

8. **Concludo con una disuguaglianza.** Il risultato deve avere la forma

$$
|f(x)-p(x)|\leq C.
$$

9. **Controllo il risultato.** Verifico che la costante sia positiva, che l’ordine della derivata sia corretto e che l’intervallo contenga tutti i punti necessari.

# 10. Cosa sapere all’orale

Bisogna conoscere l’enunciato completo, il significato di $\xi=\xi(x)$ e la dimostrazione con $z(y)$. Vanno motivati il conteggio degli zeri, le applicazioni di Rolle, $p^{(n+1)}=0$ e $\pi^{(n+1)}=(n+1)!$. Bisogna inoltre distinguere stima puntuale e uniforme e spiegare perché il massimo del prodotto è più preciso del prodotto dei massimi.

Domande probabili: perché si introduce $z(y)$? Dove serve $f\in C^{n+1}$? Perché $\xi$ dipende da $x$? Come si ottiene una maggiorazione uniforme?

# 11. Riassunto finale

Per $f\in C^{n+1}[a,b]$ e il suo interpolante $p\in\mathbb R_n[x]$, per ogni $x\in[a,b]$ esiste $\xi\in(a,b)$ tale che

$$
f(x)-p(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{i=0}^n(x-x_i).
$$

Ponendo

$$
M_{n+1}=\max_{y\in[a,b]}|f^{(n+1)}(y)|,
$$

si ottiene

$$
|f(x)-p(x)|\leq\frac{M_{n+1}}{(n+1)!}\prod_{i=0}^n|x-x_i|.
$$

Per una stima uniforme si maggiora anche il prodotto nodale. Per un punto fissato conviene invece valutarlo direttamente. La formula non richiede la conoscenza esplicita di $p(x)$.

# 12. Domande di controllo

## Domande base

1. Che cosa rappresenta il resto $f(x)-p(x)$?
2. Quale derivata compare nella formula con $n+1$ nodi?
3. Perché il prodotto nodale si annulla nei nodi?
4. Che differenza c’è tra una stima puntuale e una stima uniforme?

## Domande teoriche

1. Enuncia il teorema del resto dell’interpolazione specificando tutte le ipotesi.
2. Perché il punto $\xi$ può dipendere da $x$?
3. Perché $\pi^{(n+1)}(y)=(n+1)!$?
4. Perché il prodotto dei massimi fornisce una stima generalmente meno precisa del massimo del prodotto?

## Domande da orale

1. Dimostra il teorema del resto mediante la funzione ausiliaria $z(y)$.
2. Spiega perché $z(y)$ possiede almeno $n+2$ zeri.
3. Spiega nel dettaglio le applicazioni ripetute del teorema di Rolle.
4. Confronta la stima semplice e la stima precisa nell’Esempio 1.2.

## Domande applicative

1. Sia $f(x)=\arctan(x)$ e siano dati tre nodi. Quale derivata devi calcolare per stimare il resto?
2. Per $f(x)=\cos(x)$ interpolata su cinque nodi, scrivi la struttura della formula dell’errore senza svolgere i calcoli.
3. Data una stima uniforme $|f(x)-p(x)|\leq C$, spiega come potresti ottenere una stima più precisa in un punto fissato $t$.
