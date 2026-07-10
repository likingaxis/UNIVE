# 0. Panoramica della lezione

Le pagine 7-10 introducono il tema centrale successivo alla costruzione del polinomio interpolante: **l'errore, o resto, dell'interpolazione polinomiale**.

Nelle pagine precedenti abbiamo visto che, dati $n+1$ nodi distinti $x_0,\ldots,x_n$ e i corrispondenti valori $f(x_0),\ldots,f(x_n)$, esiste un unico polinomio $p\in\mathbb R_n[x]$ tale che

$$
p(x_i)=f(x_i),\qquad i=0,\ldots,n.
$$

Questo risultato garantisce che il polinomio interpolante esiste ed è unico, ma non dice ancora quanto bene $p(x)$ approssimi $f(x)$ nei punti diversi dai nodi.

Le pagine 7-10 rispondono proprio a questa domanda.

## Argomenti presenti

1. definizione dell'errore di interpolazione;
2. formula puntuale del resto dell'interpolazione;
3. teorema dell'errore di interpolazione polinomiale;
4. dimostrazione mediante una funzione ausiliaria e applicazioni ripetute del teorema di Rolle;
5. ruolo del polinomio nodale

   $$
   \pi(x)=\prod_{i=0}^n(x-x_i);
   $$

6. trasformazione della formula esatta in una stima superiore;
7. stima semplice tramite maggiorazione separata dei fattori;
8. stima più precisa tramite il massimo di $|\pi(x)|$;
9. ricerca del massimo assoluto di un polinomio su un intervallo chiuso;
10. applicazioni a $\sin x$ ed $e^{x^2}$;
11. stima dell'errore in un punto specifico senza calcolare né il valore esatto della funzione né il polinomio interpolante;
12. confronto tra stime globali e stime puntuali.

## Macroargomento del corso

Queste pagine appartengono a:

> **interpolazione polinomiale**

Più precisamente, trattano la parte dedicata all'**errore di interpolazione**.

## Perché questi argomenti sono importanti

Costruire un polinomio interpolante non basta. Il fatto che $p$ coincida con $f$ nei nodi non implica che sia vicino a $f$ in tutto l'intervallo.

Serve quindi una formula che descriva la differenza

$$
f(x)-p(x).
$$

La formula del resto permette di:

- capire da quali elementi dipende l'errore;
- stimare l'accuratezza dell'interpolazione;
- confrontare diverse scelte dei nodi;
- stabilire se un'approssimazione rispetta una tolleranza assegnata;
- giustificare teoricamente gli esercizi in cui si usa $p(t)$ al posto di $f(t)$;
- preparare il terreno alle formule di quadratura e alle stime di errore nell'integrazione numerica.

L'errore dipende da due fattori distinti:

1. dalla funzione, attraverso la derivata $f^{(n+1)}$;
2. dalla disposizione dei nodi e dal punto di valutazione, attraverso

   $$
   \prod_{i=0}^n(x-x_i).
   $$

Questa separazione è uno dei concetti più importanti della lezione.

## Prerequisiti

Per capire bene queste pagine servono:

- polinomio interpolante di Lagrange;
- grado di un polinomio;
- derivate successive;
- funzioni di classe $C^{n+1}$;
- teorema di Rolle;
- massimo e minimo assoluto su un intervallo chiuso;
- punti stazionari;
- valore assoluto;
- prodotto di fattori;
- derivazione con la regola del prodotto e della catena;
- proprietà secondo cui la derivata di ordine superiore al grado di un polinomio è identicamente nulla.

## Tipi di esercizi d'esame collegati

Gli esercizi tipici sono:

- stimare $|f(t)-p(t)|$ in un punto fissato $t$;
- trovare una costante $C$ tale che

  $$
  |f(x)-p(x)|\le C\qquad\text{per ogni }x\in[a,b];
  $$

- applicare il teorema senza costruire esplicitamente $p$;
- calcolare o maggiorare $\max|f^{(n+1)}|$;
- calcolare o maggiorare $\max|\pi(x)|$;
- scegliere tra una stima rapida e una più precisa;
- confrontare l'errore prodotto da insiemi diversi di nodi;
- riconoscere il più piccolo intervallo che contiene nodi e punto di valutazione;
- stimare un valore come $\sqrt[9]{e}$, $\sqrt2$ o $\cos(1)$ senza calcolarlo direttamente.

## Risultati teorici che possono essere chiesti all'orale

Il professore potrebbe chiedere:

- l'enunciato preciso del teorema del resto;
- il significato dell'ipotesi $f\in C^{n+1}[a,b]$;
- perché i nodi devono essere distinti;
- perché il caso $x=x_i$ è immediato;
- come si costruisce la funzione ausiliaria $z$;
- perché $z$ ha almeno $n+2$ zeri;
- come si applica ripetutamente Rolle;
- perché $p^{(n+1)}\equiv0$;
- perché $\pi^{(n+1)}=(n+1)!$;
- come si ricava la formula finale;
- differenza tra formula esatta e stima dell'errore;
- differenza tra stima globale e stima puntuale;
- perché non è necessario conoscere esplicitamente $p$.

---

# Indice ragionato

1. Il problema dell'errore di interpolazione.
2. Richiami necessari di analisi.
3. Il polinomio nodale $\pi(x)$.
4. Teorema del resto dell'interpolazione.
5. Significato della formula.
6. Dimostrazione completa, riga per riga.
7. Dalla formula esatta alla stima pratica.
8. Stima semplice e stima più precisa.
9. Esempio su $\sin x$.
10. Esempio su $e^{x^2}$.
11. Stima globale e stima puntuale.
12. Collegamento con gli esercizi 1.4-1.7.
13. Schede dei risultati da sapere.
14. Schema operativo da esame.
15. Errori frequenti.
16. Cosa saper dire all'orale.
17. Riassunto finale.
18. Domande di controllo.

---

# 1. Contesto generale

## 1.1 Il problema matematico

Sia

$$
f:[a,b]\to\mathbb R
$$

una funzione sufficientemente regolare.

Siano

$$
x_0,x_1,\ldots,x_n\in[a,b]
$$

$n+1$ nodi distinti.

Indichiamo con $p\in\mathbb R_n[x]$ il polinomio interpolante di $f$ sui nodi assegnati, cioè l'unico polinomio di grado al massimo $n$ tale che

$$
p(x_i)=f(x_i),\qquad i=0,\ldots,n.
$$

Nei nodi, l'errore è esattamente nullo:

$$
f(x_i)-p(x_i)=0.
$$

Il problema è capire che cosa accade in un punto generico $x\in[a,b]$.

Definiamo l'errore puntuale di interpolazione come

$$
E(x)=f(x)-p(x).
$$

Il valore assoluto

$$
|E(x)|=|f(x)-p(x)|
$$

misura la distanza tra il valore esatto e il valore approssimato.

## 1.2 Perché non basta sapere che il polinomio interpola

Il polinomio $p$ passa esattamente per i punti

$$
(x_i,f(x_i)).
$$

Tuttavia, tra un nodo e l'altro potrebbe discostarsi dalla funzione.

Quindi l'interpolazione fornisce esattezza nei nodi, non automaticamente in tutto l'intervallo.

La domanda numerica è:

> Se sostituisco $f(x)$ con $p(x)$, quanto posso sbagliare?

Il teorema del resto fornisce una risposta teorica.

## 1.3 Formula esatta e stima

È importante distinguere:

### Formula esatta del resto

$$
f(x)-p(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}
\prod_{i=0}^n(x-x_i),
$$

per un opportuno punto $\xi=\xi(x)\in(a,b)$.

Questa è un'uguaglianza esatta, ma $\xi$ non è generalmente noto.

### Stima dell'errore

Sostituendo $|f^{(n+1)}(\xi)|$ con un maggiorante noto, si ottiene una disuguaglianza del tipo

$$
|f(x)-p(x)|\le C.
$$

Questa è la forma usata negli esercizi.

---

# 2. Richiami necessari di analisi

## 2.1 Funzione di classe $C^{n+1}[a,b]$

Scrivere

$$
f\in C^{n+1}[a,b]
$$

significa che $f$ possiede derivate fino all'ordine $n+1$ e che queste derivate sono continue su $[a,b]$.

In particolare esistono:

$$
f',f'',\ldots,f^{(n+1)}.
$$

Questa ipotesi serve perché la dimostrazione applica il teorema di Rolle ripetutamente fino alla derivata di ordine $n+1$.

Serve inoltre per poter considerare e maggiorare

$$
|f^{(n+1)}(x)|
$$

su un intervallo chiuso.

## 2.2 Teorema di Rolle

### Enunciato

Sia $g:[\alpha,\beta]\to\mathbb R$ continua su $[\alpha,\beta]$, derivabile su $(\alpha,\beta)$ e tale che

$$
g(\alpha)=g(\beta).
$$

Allora esiste almeno un punto $c\in(\alpha,\beta)$ tale che

$$
g'(c)=0.
$$

### Significato geometrico

Se una curva parte e arriva alla stessa altezza, in almeno un punto intermedio deve avere tangente orizzontale.

### Uso nella dimostrazione

Se una funzione ha molti zeri distinti, Rolle garantisce che la derivata abbia almeno uno zero tra ogni coppia di zeri consecutivi.

Più precisamente:

- se $z$ ha almeno $n+2$ zeri distinti;
- allora $z'$ ha almeno $n+1$ zeri;
- $z''$ ha almeno $n$ zeri;
- continuando, $z^{(n+1)}$ ha almeno uno zero.

## 2.3 Massimo assoluto su un intervallo chiuso

Se $g$ è continua su $[a,b]$, allora raggiunge massimo e minimo assoluti.

Per trovare

$$
\max_{x\in[a,b]}|g(x)|,
$$

si controllano:

1. gli estremi $a$ e $b$;
2. i punti interni in cui $g'(x)=0$;
3. eventuali punti in cui la derivata non esiste.

Nel nostro caso $g$ è un polinomio, quindi la derivata esiste ovunque.

Un modo pratico è calcolare i valori di $g$ nei candidati e scegliere quello con valore assoluto maggiore.

---

# 3. Il polinomio nodale

## 3.1 Definizione

Associati ai nodi $x_0,\ldots,x_n$, definiamo

$$
\pi(x)=\prod_{i=0}^n(x-x_i).
$$

Esplicitamente:

$$
\pi(x)=(x-x_0)(x-x_1)\cdots(x-x_n).
$$

Questo polinomio viene spesso chiamato **polinomio nodale**.

## 3.2 Proprietà

### Grado

Ogni fattore ha grado $1$ e i fattori sono $n+1$. Quindi

$$
\deg\pi=n+1.
$$

### Monicità

Il termine di grado massimo nasce moltiplicando tutti gli $x$:

$$
x\cdot x\cdots x=x^{n+1}.
$$

Il coefficiente principale è quindi $1$.

Perciò $\pi$ è monico.

### Zeri

Per ogni nodo $x_i$:

$$
\pi(x_i)=0,
$$

perché nel prodotto compare il fattore

$$
x_i-x_i=0.
$$

### Derivata di ordine $n+1$

Essendo $\pi$ monico di grado $n+1$, ha la forma

$$
\pi(x)=x^{n+1}+\text{termini di grado minore}.
$$

Derivando $n+1$ volte:

$$
\frac{d^{n+1}}{dx^{n+1}}x^{n+1}=(n+1)!.
$$

Tutti i termini di grado minore scompaiono.

Quindi

$$
\pi^{(n+1)}(x)=(n+1)!
$$

per ogni $x$.

## 3.3 Significato nell'errore

Il fattore

$$
\pi(x)=\prod_{i=0}^n(x-x_i)
$$

misura geometricamente la posizione di $x$ rispetto ai nodi.

In particolare:

- se $x$ coincide con un nodo, $\pi(x)=0$ e l'errore è nullo;
- se $x$ è vicino a uno o più nodi, alcuni fattori sono piccoli;
- se $x$ è lontano dai nodi, il prodotto può diventare grande;
- la distribuzione dei nodi influenza direttamente l'errore.

---

# 4. Teorema del resto dell'interpolazione polinomiale

## Teorema 1.2

Sia

$$
f:[a,b]\to\mathbb R
$$

una funzione di classe

$$
f\in C^{n+1}[a,b].
$$

Sia $p(x)$ il polinomio d'interpolazione di $f(x)$ sugli $n+1$ nodi distinti

$$
x_0,x_1,\ldots,x_n\in[a,b].
$$

Allora, per ogni $x\in[a,b]$, esiste un punto

$$
\xi=\xi(x)\in(a,b)
$$

tale che

$$
\boxed{
f(x)-p(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}
(x-x_0)(x-x_1)\cdots(x-x_n)
}.
$$

In forma compatta:

$$
\boxed{
f(x)-p(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}\pi(x)
}.
$$

## Ipotesi

1. $f$ è definita su $[a,b]$;
2. $f\in C^{n+1}[a,b]$;
3. i nodi $x_0,\ldots,x_n$ appartengono a $[a,b]$;
4. i nodi sono distinti;
5. $p$ è il polinomio interpolante di grado al massimo $n$;
6. il punto $x$ appartiene a $[a,b]$.

## Tesi

Per ogni $x\in[a,b]$, esiste un punto $\xi$, generalmente dipendente da $x$, tale che vale la formula del resto.

## Significato intuitivo

L'errore è il prodotto di:

1. una quantità legata alla curvatura di ordine $n+1$ della funzione:

   $$
   \frac{f^{(n+1)}(\xi)}{(n+1)!};
   $$

2. una quantità legata ai nodi e al punto $x$:

   $$
   \pi(x)=\prod_{i=0}^n(x-x_i).
   $$

Quindi:

- se $f^{(n+1)}$ è piccola, l'interpolazione tende a essere accurata;
- se $x$ è vicino ai nodi, il prodotto tende a essere piccolo;
- nei nodi l'errore è esattamente zero.

## Perché le ipotesi sono necessarie

### Regolarità $C^{n+1}$

Serve per derivare la funzione ausiliaria fino all'ordine $n+1$ e applicare Rolle ripetutamente.

### Nodi distinti

Serve sia per l'esistenza e unicità di $p$, sia per avere $n+1$ zeri distinti della funzione ausiliaria.

### Grado di $p$ al massimo $n$

Serve per concludere

$$
p^{(n+1)}\equiv0.
$$

### Appartenenza all'intervallo

Serve perché tutti i punti coinvolti devono trovarsi nell'intervallo in cui valgono continuità e derivabilità.

## Osservazione importante su $\xi$

Il punto $\xi$:

- esiste, ma normalmente non è noto;
- può cambiare al cambiare di $x$;
- non è necessariamente uno dei nodi;
- non viene calcolato negli esercizi;
- viene eliminato dalla stima usando un massimo di $|f^{(n+1)}|$.

---

# 5. Analisi della formula del resto

La formula è

$$
f(x)-p(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}
\prod_{i=0}^n(x-x_i).
$$

## 5.1 Il membro sinistro

$$
f(x)-p(x)
$$

è l'errore con segno.

Può essere:

- positivo, se $p(x)<f(x)$;
- negativo, se $p(x)>f(x)$;
- nullo, se $p(x)=f(x)$.

Negli esercizi di stima si considera quasi sempre

$$
|f(x)-p(x)|.
$$

## 5.2 La derivata di ordine $n+1$

Il polinomio ha grado al massimo $n$. La prima derivata che non può essere riprodotta esattamente da un polinomio di quel grado è la derivata di ordine $n+1$.

Per questo nella formula compare

$$
f^{(n+1)}.
$$

Esempi:

- con due nodi, $n=1$, compare $f''$;
- con tre nodi, $n=2$, compare $f'''$;
- con quattro nodi, $n=3$, compare $f^{(4)}$.

## 5.3 Il fattoriale

Il denominatore

$$
(n+1)!
$$

nasce dalla derivata di ordine $n+1$ del polinomio monico $\pi$.

Infatti:

$$
\pi^{(n+1)}=(n+1)!.
$$

## 5.4 Il prodotto nodale

$$
(x-x_0)(x-x_1)\cdots(x-x_n)
$$

si annulla nei nodi e determina come varia l'errore al variare di $x$.

Non va confuso con il prodotto usato nei polinomi di Lagrange. Qui non ci sono denominatori.

## 5.5 Caso in cui $f$ è già un polinomio di grado al massimo $n$

Se

$$
f\in\mathbb R_n[x],
$$

allora

$$
f^{(n+1)}\equiv0.
$$

La formula dà

$$
f(x)-p(x)=0
$$

per ogni $x$.

Quindi l'interpolazione riproduce esattamente ogni polinomio di grado al massimo $n$.

Questo è un risultato teorico importante.

---

# 6. Dimostrazione del teorema del resto

## 6.1 Idea generale

Fissiamo un punto $x\in[a,b]$.

Se $x$ è un nodo, l'errore è già zero.

Se $x$ non è un nodo, si costruisce una funzione ausiliaria $z(y)$ che:

- si annulla in tutti gli $n+1$ nodi;
- si annulla anche nel punto $x$;
- ha quindi almeno $n+2$ zeri distinti.

Applicando il teorema di Rolle $n+1$ volte, si trova un punto $\xi$ in cui

$$
z^{(n+1)}(\xi)=0.
$$

Calcolando esplicitamente questa derivata si ottiene la formula del resto.

## 6.2 Primo caso: $x$ coincide con un nodo

Supponiamo

$$
x=x_i
$$

per qualche $i$.

Poiché $p$ interpola $f$:

$$
f(x_i)-p(x_i)=0.
$$

Nel membro destro compare il prodotto

$$
(x_i-x_0)\cdots(x_i-x_i)\cdots(x_i-x_n).
$$

Il fattore

$$
x_i-x_i=0
$$

annulla tutto il prodotto.

Quindi entrambi i membri sono zero.

La formula vale per qualsiasi $\xi\in(a,b)$.

## 6.3 Secondo caso: $x$ non coincide con nessun nodo

Supponiamo ora

$$
x\ne x_i\qquad\text{per ogni }i.
$$

In questo caso

$$
\pi(x)\ne0,
$$

perché nessun fattore $x-x_i$ è nullo.

Questo permette di dividere per $\pi(x)$.

## 6.4 Definizione del resto $r$

Definiamo

$$
r(y)=f(y)-p(y).
$$

Questa funzione rappresenta l'errore come funzione della variabile $y$.

Nei nodi:

$$
r(x_i)=f(x_i)-p(x_i)=0.
$$

Nel punto fissato $x$:

$$
r(x)=f(x)-p(x).
$$

## 6.5 Definizione della funzione ausiliaria

Definiamo

$$
z(y)=r(y)-\frac{r(x)}{\pi(x)}\pi(y).
$$

Sostituendo $r$:

$$
z(y)=f(y)-p(y)-\frac{f(x)-p(x)}{\pi(x)}\pi(y).
$$

### Perché viene scelta proprio questa funzione

Il coefficiente

$$
\frac{r(x)}{\pi(x)}
$$

è scelto in modo che $z(x)=0$.

Infatti:

$$
z(x)=r(x)-\frac{r(x)}{\pi(x)}\pi(x)=r(x)-r(x)=0.
$$

Inoltre $\pi$ si annulla nei nodi, quindi $z$ conserva gli zeri di $r$ nei nodi.

La funzione è quindi costruita appositamente per avere uno zero in ogni nodo e uno zero aggiuntivo in $x$.

## 6.6 Regolarità di $z$

La funzione $f$ è in $C^{n+1}[a,b]$.

Il polinomio $p$ è derivabile infinite volte.

Anche $\pi$ è un polinomio.

Il coefficiente

$$
\frac{r(x)}{\pi(x)}
$$

è una costante rispetto alla variabile $y$.

Quindi

$$
z\in C^{n+1}[a,b].
$$

## 6.7 Zeri di $z$ nei nodi

Per ogni $i$:

$$
z(x_i)
=r(x_i)-\frac{r(x)}{\pi(x)}\pi(x_i).
$$

Ma

$$
r(x_i)=0
$$

e

$$
\pi(x_i)=0.
$$

Quindi

$$
z(x_i)=0.
$$

## 6.8 Zero aggiuntivo nel punto $x$

Come già visto:

$$
z(x)=r(x)-\frac{r(x)}{\pi(x)}\pi(x)=0.
$$

Poiché $x$ non coincide con nessun nodo, gli zeri

$$
x_0,x_1,\ldots,x_n,x
$$

sono almeno $n+2$ zeri distinti.

## 6.9 Applicazioni ripetute di Rolle

Ordiniamo idealmente gli $n+2$ zeri lungo l'intervallo.

Tra ogni coppia di zeri consecutivi di $z$, Rolle garantisce almeno uno zero di $z'$.

Quindi $z'$ ha almeno $n+1$ zeri.

Applicando Rolle a $z'$:

$$
z''
$$

ha almeno $n$ zeri.

Continuando:

- $z^{(3)}$ ha almeno $n-1$ zeri;
- $\ldots$
- $z^{(n)}$ ha almeno $2$ zeri;
- $z^{(n+1)}$ ha almeno $1$ zero.

Esiste quindi

$$
\xi\in(a,b)
$$

tale che

$$
z^{(n+1)}(\xi)=0.
$$

Questo è il passaggio centrale della dimostrazione.

## 6.10 Calcolo della derivata di ordine $n+1$

Partiamo da

$$
z(y)=r(y)-\frac{r(x)}{\pi(x)}\pi(y).
$$

Il rapporto

$$
\frac{r(x)}{\pi(x)}
$$

è costante rispetto a $y$.

Quindi

$$
z^{(n+1)}(y)
=r^{(n+1)}(y)-\frac{r(x)}{\pi(x)}\pi^{(n+1)}(y).
$$

Poiché

$$
r(y)=f(y)-p(y),
$$

abbiamo

$$
r^{(n+1)}(y)=f^{(n+1)}(y)-p^{(n+1)}(y).
$$

Ma $p$ ha grado al massimo $n$, dunque

$$
p^{(n+1)}(y)=0.
$$

Inoltre

$$
\pi^{(n+1)}(y)=(n+1)!.
$$

Pertanto

$$
z^{(n+1)}(y)
=f^{(n+1)}(y)-\frac{r(x)}{\pi(x)}(n+1)!.
$$

Nel punto $\xi$:

$$
0=z^{(n+1)}(\xi)
=f^{(n+1)}(\xi)-\frac{r(x)}{\pi(x)}(n+1)!.
$$

## 6.11 Isolamento di $r(x)$

Dalla relazione

$$
0=f^{(n+1)}(\xi)-\frac{r(x)}{\pi(x)}(n+1)!
$$

portiamo il secondo termine dall'altra parte:

$$
\frac{r(x)}{\pi(x)}(n+1)!=f^{(n+1)}(\xi).
$$

Dividiamo per $(n+1)!$:

$$
\frac{r(x)}{\pi(x)}
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}.
$$

Moltiplichiamo per $\pi(x)$:

$$
r(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}\pi(x).
$$

Infine ricordiamo che

$$
r(x)=f(x)-p(x).
$$

Otteniamo

$$
\boxed{
f(x)-p(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}
\prod_{i=0}^n(x-x_i)
}.
$$

La dimostrazione è conclusa.

## 6.12 Cosa sapere ripetere all'orale

Bisogna saper spiegare:

1. la distinzione tra il caso $x=x_i$ e il caso $x\ne x_i$;
2. la definizione di $\pi$ e $r$;
3. la costruzione di $z$;
4. perché $z$ si annulla in $n+2$ punti;
5. la catena di applicazioni di Rolle;
6. il calcolo di $z^{(n+1)}$;
7. perché $p^{(n+1)}=0$;
8. perché $\pi^{(n+1)}=(n+1)!$;
9. l'isolamento finale di $f(x)-p(x)$.

---

# 7. Dalla formula esatta alla stima dell'errore

La formula contiene il punto ignoto $\xi$:

$$
|f(x)-p(x)|
=
\frac{|f^{(n+1)}(\xi)|}{(n+1)!}
|\pi(x)|.
$$

Per ottenere una stima utilizzabile, definiamo

$$
M_{n+1}=
\max_{y\in[a,b]}|f^{(n+1)}(y)|.
$$

Poiché $\xi\in(a,b)$:

$$
|f^{(n+1)}(\xi)|\le M_{n+1}.
$$

Quindi

$$
\boxed{
|f(x)-p(x)|
\le
\frac{M_{n+1}}{(n+1)!}|\pi(x)|
}.
$$

Questa è la stima puntuale standard.

Se vogliamo una costante valida per ogni $x\in[a,b]$, poniamo

$$
\Pi_{n+1}=
\max_{x\in[a,b]}|\pi(x)|.
$$

Allora

$$
\boxed{
\max_{x\in[a,b]}|f(x)-p(x)|
\le
\frac{M_{n+1}}{(n+1)!}\Pi_{n+1}
}.
$$

## Significato

La stima globale separa:

- la parte legata alla funzione:

  $$
  M_{n+1};
  $$

- la parte legata ai nodi:

  $$
  \Pi_{n+1}.
  $$

---

# 8. Due strategie per stimare il prodotto nodale

## 8.1 Stima semplice

Si maggiora separatamente ogni fattore:

$$
|\pi(x)|
=
|x-x_0|\cdots|x-x_n|.
$$

Se sappiamo che

$$
|x-x_i|\le d_i,
$$

allora

$$
|\pi(x)|\le d_0d_1\cdots d_n.
$$

### Vantaggi

- è rapida;
- richiede pochi calcoli;
- funziona anche con molti nodi;
- non richiede risolvere equazioni di grado elevato.

### Svantaggi

- può essere molto grossolana;
- i massimi dei singoli fattori possono avvenire in punti diversi;
- il prodotto dei massimi può sovrastimare molto il massimo del prodotto.

## 8.2 Stima più precisa

Si considera direttamente

$$
\omega(y)=\pi(y)=\prod_{i=0}^n(y-x_i)
$$

e si calcola

$$
\max_{y\in[a,b]}|\omega(y)|.
$$

La procedura è:

1. sviluppare $\omega(y)$, se utile;
2. calcolare $\omega'(y)$;
3. risolvere

   $$
   \omega'(y)=0;
   $$

4. tenere solo i punti stazionari interni all'intervallo;
5. valutare $|\omega|$ agli estremi e nei punti stazionari;
6. scegliere il valore più grande.

### Vantaggi

- produce una stima più stretta;
- sfrutta la vera struttura del prodotto.

### Svantaggi

- può richiedere calcoli lunghi;
- se $\omega$ ha grado alto, $\omega'$ può essere difficile da risolvere;
- per grado superiore a $4$, in generale non esiste una formula algebrica semplice per tutte le radici.

## 8.3 Quando scegliere una strategia

- Se l'esercizio chiede solo una stima valida, spesso basta la stima semplice.
- Se chiede una stima più precisa, conviene calcolare il massimo di $|\omega|$.
- Se il numero di nodi è elevato, spesso la stima semplice è la scelta realistica.
- Se il punto $x=t$ è fissato, conviene valutare direttamente il prodotto in $t$ invece di cercarne il massimo su tutto l'intervallo.

---

# 9. Esempio 1.2: interpolazione di $\sin x$

I nodi sono

$$
x_0=0,\qquad x_1=\frac\pi6,\qquad x_2=\frac\pi4.
$$

Il polinomio interpolante $p$ ha grado al massimo $2$, quindi

$$
n=2.
$$

Fissiamo

$$
t\in[0,1].
$$

Vogliamo stimare

$$
|\sin t-p(t)|.
$$

## 9.1 Scelta dell'intervallo

Il teorema deve essere applicato su un intervallo che contenga:

- tutti i nodi;
- il punto $t$.

Poiché

$$
0,\frac\pi6,\frac\pi4,t\in[0,1],
$$

si usa

$$
[a,b]=[0,1].
$$

## 9.2 Derivata richiesta

Con $n=2$ serve la derivata di ordine $3$:

$$
f(x)=\sin x,
$$

$$
f'(x)=\cos x,
$$

$$
f''(x)=-\sin x,
$$

$$
f'''(x)=-\cos x.
$$

Quindi

$$
|f'''(x)|=|\cos x|\le1.
$$

## 9.3 Formula del resto

Per un opportuno $\xi\in(0,1)$:

$$
\sin t-p(t)
=
\frac{-\cos\xi}{3!}
\,t\left(t-\frac\pi6\right)
\left(t-\frac\pi4\right).
$$

Passando al valore assoluto:

$$
|\sin t-p(t)|
=
\frac{|\cos\xi|}{6}
|t|
\left|t-\frac\pi6\right|
\left|t-\frac\pi4\right|.
$$

## 9.4 Prima stima: maggiorazione separata

Per $t\in[0,1]$:

$$
|t|\le1.
$$

Le dispense usano inoltre le maggiorazioni

$$
\left|t-\frac\pi6\right|\le\frac\pi6,
$$

$$
\left|t-\frac\pi4\right|\le\frac\pi4.
$$

Si ottiene

$$
|\sin t-p(t)|
\le
\frac16\cdot1\cdot\frac\pi6\cdot\frac\pi4.
$$

Quindi

$$
|\sin t-p(t)|\lesssim0.0685.
$$

### Osservazione tecnica

La logica della stima è moltiplicare maggioranti semplici dei singoli fattori.

Negli esercizi bisogna sempre verificare con attenzione che ogni maggiorazione sia valida su tutto l'intervallo dichiarato.

 ## 9.5 Seconda stima: massimo del prodotto

Definiamo

$$
\omega(y)=y\left(y-\frac\pi6\right)
\left(y-\frac\pi4\right).
$$

Allora

$$
|\sin t-p(t)|
\le
\frac16
\max_{y\in[0,1]}|\omega(y)|.
$$

Sviluppiamo:

$$
\omega(y)
=
y^3-\frac{5\pi}{12}y^2+\frac{\pi^2}{24}y.
$$

### Passaggio algebrico

Prima moltiplichiamo:

$$
\left(y-\frac\pi6\right)
\left(y-\frac\pi4\right)
=
y^2-\left(\frac\pi6+\frac\pi4\right)y+
\frac{\pi^2}{24}.
$$

Poiché

$$
\frac\pi6+\frac\pi4
=
\frac{2\pi+3\pi}{12}
=
\frac{5\pi}{12},
$$

segue

$$
\left(y-\frac{\pi}{6}\right)
\left(y-\frac{\pi}{4}\right)
=
y^2-\frac{5\pi}{12}y+\frac{\pi^2}{24}.
$$

Moltiplicando per $y$:

$$
\omega(y)=y^3-\frac{5\pi}{12}y^2+\frac{\pi^2}{24}y.
$$

Deriviamo:

$$  
\omega'(y)=3y^2-\frac{5\pi}{6}y+\frac{\pi^2}{24}.  
$$

Risolviamo:

$$  
3y^2-\frac{5\pi}{6}y+\frac{\pi^2}{24}=0.  
$$

Applicando la formula risolutiva:
$$  
y_{1,2} =
\frac{  
\frac{5\pi}{6}  
\pm  
\sqrt{  
\left(\frac{5\pi}{6}\right)^2

4\cdot 3\cdot \frac{\pi^2}{24}  
}  
}{  
2\cdot 3  
}.  
$$

Poiché:
 $$  
4\cdot 3\cdot \frac{\pi^2}{24}

\frac{\pi^2}{2},  
$$

si ottiene:
$$  
y_{1,2}=
\frac{  
\frac{5\pi}{6}  
\pm  
\sqrt{  
\left(\frac{5\pi}{6}\right)^2

\frac{\pi^2}{2}  
}  
}{6}.  
$$

Semplificando:
 $$  
y_{1,2}

\frac{5\pi}{36}  
\pm  
\frac{\sqrt{7}\pi}{36}.  
$$
Entrambi appartengono a $[0,1]$.

I candidati per il massimo assoluto sono:

$$
0,
\quad
\frac{5\pi}{36}+\frac{\sqrt7\pi}{36},
\quad
\frac{5\pi}{36}-\frac{\sqrt7\pi}{36},
\quad
1.
$$

Valutando $|\omega|$:

$$
\max_{y\in[0,1]}|\omega(y)|\le0.103.
$$

Quindi

$$
|\sin t-p(t)|
\le
\frac{0.103}{6}
\approx0.0172.
$$

La seconda stima è molto migliore della prima.

## 9.6 Cosa insegna l'esempio

1. non serve conoscere esplicitamente $p$;
2. servono nodi, funzione e ordine della derivata;
3. una stima semplice può essere molto più grande del vero massimo;
4. il massimo del prodotto nodale può migliorare sensibilmente il risultato;
5. il miglioramento richiede però più calcoli.

---

# 10. Esempio 1.3: interpolazione di $e^{x^2}$

Consideriamo

$$
f(x)=e^{x^2}
$$

con nodi

$$
x_0=0,\qquad x_1=\frac12,\qquad x_2=1.
$$

Il polinomio interpolante ha grado al massimo $2$, quindi

$$
n=2.
$$

## 10.1 Parte (a): stima uniforme su $[0,1]$

Vogliamo trovare una costante $C$ tale che

$$
|f(x)-p(x)|\le C
$$

per ogni $x\in[0,1]$.

Dal teorema:

$$
|f(x)-p(x)|
=
\frac{|f'''(\xi)|}{6}
\left|x\left(x-\frac12\right)(x-1)\right|.
$$

## 10.2 Calcolo delle derivate

Partiamo da

$$
f(x)=e^{x^2}.
$$

### Prima derivata

Usiamo la regola della catena:

$$
f'(x)=e^{x^2}\cdot2x=2xe^{x^2}.
$$

### Seconda derivata

Deriviamo il prodotto $2x\,e^{x^2}$:

$$
f''(x)
=2e^{x^2}+2x\cdot2xe^{x^2}.
$$

Quindi

$$
f''(x)=(2+4x^2)e^{x^2}.
$$

### Terza derivata

Deriviamo

$$
(2+4x^2)e^{x^2}.
$$

Con la regola del prodotto:

$$
f'''(x)
=8xe^{x^2}+(2+4x^2)\cdot2xe^{x^2}.
$$

Sviluppiamo il secondo termine:

$$
(2+4x^2)2x=4x+8x^3.
$$

Sommiamo con $8x$:

$$
8x+4x+8x^3=12x+8x^3.
$$

Quindi

$$
\boxed{
f'''(x)=(12x+8x^3)e^{x^2}
}.
$$

## 10.3 Massimo della derivata

Per $x\in[0,1]$:

$$
12x+8x^3\ge0,
$$

quindi

$$
|f'''(x)|=(12x+8x^3)e^{x^2}.
$$

Inoltre:

$$
12x\le12,
$$

$$
8x^3\le8,
$$

$$
e^{x^2}\le e.
$$

Dunque

$$
|f'''(x)|\le20e.
$$

La stima è esatta come massimo perché in $x=1$:

$$
|f'''(1)|=(12+8)e=20e.
$$

Quindi

$$
M_3=20e.
$$

## 10.4 Prima stima globale

Per $x\in[0,1]$:

$$
|x|\le1,
$$

$$
\left|x-\frac12\right|\le\frac12,
$$

$$
|x-1|\le1.
$$

Pertanto

$$
|f(x)-p(x)|
\le
\frac{20e}{6}\cdot1\cdot\frac12\cdot1.
$$

Quindi

$$
|f(x)-p(x)|\lesssim4.530.
$$

È una stima valida, ma molto grossolana.

## 10.5 Stima più precisa

Definiamo

$$
\omega(y)=y\left(y-\frac12\right)(y-1).
$$

Sviluppiamo:

$$
\left(y-\frac12\right)(y-1)
=y^2-\frac32y+\frac12.
$$

Moltiplicando per $y$:

$$
\omega(y)=y^3-\frac32y^2+\frac12y.
$$

Deriviamo:

$$
\omega'(y)=3y^2-3y+\frac12.
$$

Risolviamo

$$
3y^2-3y+\frac12=0.
$$

Moltiplicando per $2$:

$$
6y^2-6y+1=0.
$$

Con la formula risolutiva:

$$
y_{1,2}
=
\frac{6\pm\sqrt{36-24}}{12}
=
\frac{6\pm2\sqrt3}{12}
=
\frac12\pm\frac{\sqrt3}{6}.
$$

Entrambi appartengono a $[0,1]$.

Valutiamo $|\omega|$ negli estremi e nei punti stazionari:

$$
|\omega(0)|=0,
$$

$$
|\omega(1)|=0,
$$

$$
\left|\omega\left(\frac12\pm\frac{\sqrt3}{6}\right)\right|
=
\frac{\sqrt3}{36}.
$$

Quindi

$$
\max_{y\in[0,1]}|\omega(y)|
=
\frac{\sqrt3}{36}.
$$

La stima diventa

$$
|f(x)-p(x)|
\le
\frac{20e}{6}\cdot\frac{\sqrt3}{36}.
$$

Pertanto

$$
|f(x)-p(x)|\lesssim0.436.
$$

Il miglioramento rispetto a $4.530$ è notevole.

## 10.6 Parte (b): stima in $x=\frac13$

Poiché

$$
f\left(\frac13\right)
=e^{1/9}
=\sqrt[9]{e},
$$

l'errore richiesto è

$$
\left|\sqrt[9]{e}-p\left(\frac13\right)\right|.
$$

### Uso della stima globale

Dal punto (a):

$$
\left|\sqrt[9]{e}-p\left(\frac13\right)\right|
\le0.436.
$$

Questa conclusione è immediata, perché la stima vale per ogni $x\in[0,1]$.

### Stima puntuale più precisa

Usiamo direttamente il prodotto in $x=\frac13$:

$$
\left|\sqrt[9]{e}-p\left(\frac13\right)\right|
=
\frac{|f'''(\xi)|}{6}
\left|
\frac13
\left(\frac13-\frac12\right)
\left(\frac13-1\right)
\right|.
$$

Calcoliamo le differenze:

$$
\frac13-\frac12=-\frac16,
$$

$$
\frac13-1=-\frac23.
$$

In valore assoluto:

$$
\left|\frac13\right|=\frac13,
$$

$$
\left|-\frac16\right|=\frac16,
$$

$$
\left|-\frac23\right|=\frac23.
$$

Quindi

$$
\left|\sqrt[9]{e}-p\left(\frac13\right)\right|
\le
\frac{20e}{6}\cdot\frac13\cdot\frac16\cdot\frac23.
$$

Pertanto

$$
\left|\sqrt[9]{e}-p\left(\frac13\right)\right|
\lesssim0.336.
$$

La stima puntuale è migliore della stima uniforme, perché usa il valore reale del prodotto nel punto specifico.

---

# 11. Stima globale e stima puntuale

## Stima globale

Cerca una costante $C$ tale che

$$
|f(x)-p(x)|\le C
$$

per ogni $x\in[a,b]$.

Richiede un massimo su tutto l'intervallo:

$$
C=
\frac{M_{n+1}}{(n+1)!}
\max_{x\in[a,b]}|\pi(x)|.
$$

È utile quando il testo dice:

- “per ogni $x$ nell'intervallo”;
- “determinare una costante $C$”;
- “fornire una stima uniforme”.

## Stima puntuale

Il punto $t$ è fissato.

Si usa

$$
|f(t)-p(t)|
\le
\frac{M_{n+1}}{(n+1)!}
\prod_{i=0}^n|t-x_i|.
$$

È spesso più precisa.

È utile quando il testo chiede:

- “stimare l'errore in $t$”;
- “approssimare $f(t)$ con $p(t)$”;
- “senza calcolare né $f(t)$ né $p(t)$”.

## Errore comune

Usare il massimo globale del prodotto anche quando il punto è fissato. La stima resta valida, ma può essere inutilmente peggiore.

---

# 12. Osservazioni fondamentali delle dispense

## Osservazione 1: non serve conoscere $p$

Per applicare la formula di stima servono:

- la funzione $f$;
- l'ordine $n+1$ della derivata;
- i nodi $x_i$;
- il punto o l'intervallo di valutazione.

Non serve conoscere i coefficienti di $p$.

Questo accade perché la formula del resto usa $p$ solo indirettamente attraverso il fatto che interpola $f$ e ha grado al massimo $n$.

## Osservazione 2: il massimo di $|\omega|$ può essere difficile

Con tre nodi, $\omega$ ha grado $3$ e $\omega'$ ha grado $2$.

L'equazione

$$
\omega'(y)=0
$$

si risolve con la formula delle equazioni quadratiche.

Con più nodi, il grado cresce:

- $n+1$ nodi producono $\omega$ di grado $n+1$;
- $\omega'$ ha grado $n$.

Per $n$ elevato, trovare esattamente tutti i punti stazionari può essere difficile o impossibile in forma chiusa.

In questi casi conviene usare una maggiorazione semplice.

---

# 13. Collegamento con gli esercizi 1.4-1.7

## Esercizio 1.4: $f(x)=\arctan x$

### Parte (a)

Bisogna costruire $p$ in forma di Lagrange e canonica sui nodi

$$
0,1,\sqrt3.
$$

I valori sono:

$$
\arctan0=0,
$$

$$
\arctan1=\frac\pi4,
$$

$$
\arctan\sqrt3=\frac\pi3.
$$

### Parte (b)

Con tre nodi si ha $n=2$, quindi serve

$$
f'''(x).
$$

Bisogna lavorare su un intervallo che contenga nodi e $t\in[0,2]$, quindi naturalmente

$$
[0,2].
$$

La struttura della stima sarà

$$
|f(t)-p(t)|
\le
\frac{M_3}{6}
|t(t-1)(t-\sqrt3)|.
$$

Oppure, per una stima uniforme:

$$
|f(t)-p(t)|
\le
\frac{M_3}{6}
\max_{y\in[0,2]}|y(y-1)(y-\sqrt3)|.
$$

### Cosa riconoscere

L'esercizio combina due parti:

1. costruzione dell'interpolante;
2. stima dell'errore.

Sono due procedure separate. Per la seconda parte non serve riutilizzare la forma esplicita di $p$.

## Esercizio 1.5: più nodi per $\sin x$

I nodi sono cinque, quindi

$$
n=4.
$$

Serve la derivata di ordine $5$:

$$
f^{(5)}(x)=\cos x.
$$

Quindi

$$
|f^{(5)}(x)|\le1.
$$

La stima ha la forma

$$
|\sin t-p(t)|
\le
\frac1{5!}
\prod_{i=0}^4|t-x_i|.
$$

Il confronto con l'Esempio 1.2 serve a osservare che l'aggiunta di nodi può ridurre il prodotto nodale e introduce anche il fattore

$$
\frac1{5!},
$$

ma non basta dire genericamente “più nodi significa sempre meno errore”. La qualità dipende anche dalla funzione, dall'intervallo e dalla distribuzione dei nodi.

## Esercizio 1.6: approssimare $\sqrt2$

La funzione è

$$
f(x)=\sqrt x.
$$

Il punto è

$$
x=2.
$$

I nodi sono sette, quindi

$$
n=6.
$$

Serve la derivata di ordine $7$:

$$
f^{(7)}(x).
$$

Bisogna scegliere il più piccolo intervallo contenente tutti i nodi e il punto $2$.

La stima sarà

$$
|\sqrt2-p(2)|
\le
\frac{M_7}{7!}
\prod_{i=0}^6|2-x_i|.
$$

Il prodotto va calcolato direttamente nel punto $2$.

Non serve costruire $p$.

## Esercizio 1.7: approssimare $\cos1$

La funzione è

$$
f(x)=\cos x.
$$

I nodi sono cinque, quindi

$$
n=4.
$$

Serve la quinta derivata:

$$
f^{(5)}(x)=-\sin x.
$$

Si può usare

$$
|f^{(5)}(x)|\le1.
$$

La stima puntuale è

$$
|\cos1-p(1)|
\le
\frac1{5!}
\left|1-0\right|
\left|1-\frac\pi6\right|
\left|1-\frac\pi4\right|
\left|1-\frac\pi3\right|
\left|1-\frac\pi2\right|.
$$

Anche qui non serve calcolare né $\cos1$ né $p(1)$.

---

# 14. Schede dei risultati da sapere

## Teorema del resto dell'interpolazione

- **Enunciato:** se $f\in C^{n+1}[a,b]$ e $p\in\mathbb R_n[x]$ interpola $f$ in $n+1$ nodi distinti di $[a,b]$, allora per ogni $x\in[a,b]$ esiste $\xi\in(a,b)$ tale che

  $$
  f(x)-p(x)
  =
  \frac{f^{(n+1)}(\xi)}{(n+1)!}
  \prod_{i=0}^n(x-x_i).
  $$

- **Ipotesi:** regolarità $C^{n+1}$, nodi distinti, $p$ interpolante, $x$ nell'intervallo.
- **Tesi:** esistenza di un punto $\xi$ per cui vale la formula.
- **Significato intuitivo:** l'errore è controllato dalla derivata di ordine $n+1$ e dal prodotto delle distanze dai nodi.
- **Perché le ipotesi servono:** consentono di costruire e derivare la funzione ausiliaria e di applicare Rolle.
- **Idea della dimostrazione:** costruire una funzione con $n+2$ zeri e applicare Rolle $n+1$ volte.
- **Passaggi chiave:** definizione di $r$, $\pi$, $z$; zeri; Rolle; derivata di ordine $n+1$; isolamento di $r(x)$.
- **Uso negli esercizi:** stimare l'errore senza calcolare il polinomio.
- **Domanda orale:** “Enunci e dimostri il teorema del resto dell'interpolazione”.
- **Errore tipico:** dimenticare che $\xi$ dipende da $x$.

## Stima puntuale dell'errore

- **Enunciato:** se

  $$
  M_{n+1}=\max_{y\in[a,b]}|f^{(n+1)}(y)|,
  $$

  allora

  $$
  |f(x)-p(x)|
  \le
  \frac{M_{n+1}}{(n+1)!}
  \prod_{i=0}^n|x-x_i|.
  $$

- **Ipotesi:** quelle del teorema del resto.
- **Significato:** sostituiamo il valore ignoto della derivata in $\xi$ con un massimo noto.
- **Uso:** stima in un punto fissato.
- **Errore tipico:** usare la derivata di ordine sbagliato.

## Stima uniforme dell'errore

- **Enunciato:**

  $$
  \max_{x\in[a,b]}|f(x)-p(x)|
  \le
  \frac{M_{n+1}}{(n+1)!}
  \max_{x\in[a,b]}|\pi(x)|.
  $$

- **Significato:** fornisce una sola costante valida in tutto l'intervallo.
- **Uso:** esercizi che chiedono un limite uniforme.
- **Errore tipico:** dimenticare di controllare estremi e punti stazionari quando si calcola il massimo di $|\pi|$.

## Riproduzione esatta dei polinomi

- **Enunciato:** se $f$ è un polinomio di grado al massimo $n$, il suo interpolante su $n+1$ nodi distinti coincide con $f$ ovunque.
- **Motivo:**

  $$
  f^{(n+1)}\equiv0.
  $$

- **Uso:** riconoscere casi in cui l'errore è nullo senza calcoli.
- **Domanda orale:** “Perché l'interpolazione è esatta sui polinomi di grado al massimo $n$?”

---

# 15. Schema operativo da esame

## Quando vedo un esercizio sull'errore di interpolazione

### Passo 1: conto i nodi

Se ci sono $n+1$ nodi, allora

$$
p\in\mathbb R_n[x]
$$

e serve la derivata

$$
f^{(n+1)}.
$$

### Passo 2: scelgo l'intervallo

Prendo un intervallo che contenga:

- tutti i nodi;
- il punto di valutazione, se fissato.

Quando possibile uso il più piccolo intervallo che contiene tutto, perché spesso produce un massimo più piccolo della derivata.

### Passo 3: scrivo subito la struttura della formula

$$
|f(x)-p(x)|
\le
\frac{M_{n+1}}{(n+1)!}
\prod_{i=0}^n|x-x_i|.
$$

### Passo 4: calcolo la derivata corretta

Calcolo

$$
f^{(n+1)}(x).
$$

Controllo con attenzione l'ordine.

### Passo 5: trovo un maggiorante

Determino

$$
M_{n+1}=\max|f^{(n+1)}|.
$$

Posso:

- calcolarlo esattamente;
- dimostrare monotonia;
- usare disuguaglianze semplici;
- usare limiti noti come $|\sin x|\le1$ e $|\cos x|\le1$.

### Passo 6A: se il punto è fissato

Sostituisco direttamente il punto $t$:

$$
|f(t)-p(t)|
\le
\frac{M_{n+1}}{(n+1)!}
\prod_{i=0}^n|t-x_i|.
$$

### Passo 6B: se serve una stima per ogni $x$

Scelgo tra:

#### Metodo rapido

Maggioro ogni fattore separatamente.

#### Metodo preciso

Definisco

$$
\omega(y)=\prod_{i=0}^n(y-x_i)
$$

e calcolo

$$
\max|\omega(y)|.
$$

### Passo 7: controllo il risultato

Verifico:

- che il limite sia non negativo;
- che l'ordine della derivata sia corretto;
- che il fattoriale sia $(n+1)!$;
- che tutti i nodi compaiano nel prodotto;
- che l'intervallo contenga nodi e punto;
- che i valori assoluti siano gestiti correttamente.

### Passo 8: scrivo la conclusione

Una conclusione corretta è:

> Per il teorema del resto dell'interpolazione, l'errore è limitato superiormente da ...

---

# 16. Errori frequenti

1. Confondere il numero di nodi con il grado $n$.
2. Con tre nodi usare $f''$ invece di $f'''$.
3. Dimenticare il fattoriale $(n+1)!$.
4. Dimenticare uno dei fattori $(x-x_i)$.
5. Non usare il valore assoluto nella stima.
6. Cercare di calcolare il punto $\xi$.
7. Pensare che $\xi$ sia fisso per tutti gli $x$.
8. Applicare il teorema su un intervallo che non contiene tutti i nodi.
9. Calcolare inutilmente il polinomio interpolante.
10. Usare una stima globale quando il punto è fissato, ottenendo un limite peggiore.
11. Cercare il massimo di $\omega$ invece del massimo di $|\omega|$.
12. Controllare solo i punti stazionari e dimenticare gli estremi.
13. Dimenticare che nei nodi l'errore è zero.
14. Confondere la formula esatta con la disuguaglianza di stima.
15. Affermare che aggiungere nodi riduce sempre l'errore senza ulteriori condizioni.
16. Sbagliare regola del prodotto o della catena nelle derivate.
17. Usare maggiorazioni dei fattori senza verificarne la validità sull'intero intervallo.

---

# 17. Cosa devi saper dire all'orale

Dovresti saper esporre un discorso di questo tipo:

> Sia $f\in C^{n+1}[a,b]$ e sia $p$ il polinomio interpolante di grado al massimo $n$ sui nodi distinti $x_0,\ldots,x_n$. Per ogni $x\in[a,b]$ esiste $\xi\in(a,b)$ tale che
>
> $$
> f(x)-p(x)
> =
> \frac{f^{(n+1)}(\xi)}{(n+1)!}
> \prod_{i=0}^n(x-x_i).
> $$
>
> Se $x$ coincide con un nodo, entrambi i membri sono nulli. Altrimenti si definiscono $r(y)=f(y)-p(y)$ e $\pi(y)=\prod_{i=0}^n(y-x_i)$, poi si considera
>
> $$
> z(y)=r(y)-\frac{r(x)}{\pi(x)}\pi(y).
> $$
>
> La funzione $z$ si annulla negli $n+1$ nodi e anche in $x$, quindi ha almeno $n+2$ zeri. Applicando Rolle ripetutamente, esiste $\xi$ tale che $z^{(n+1)}(\xi)=0$. Poiché $p^{(n+1)}=0$ e $\pi^{(n+1)}=(n+1)!$, si ricava la formula.

Devi poi saper spiegare come si passa alla stima:

$$
|f(x)-p(x)|
\le
\frac{M_{n+1}}{(n+1)!}
\prod_{i=0}^n|x-x_i|.
$$

E devi sapere distinguere:

- stima puntuale;
- stima uniforme;
- stima semplice;
- stima tramite massimo esatto del prodotto nodale.

---

# 18. Riassunto finale

Dati $n+1$ nodi distinti e il polinomio interpolante $p\in\mathbb R_n[x]$, l'errore in un punto $x$ è

$$
f(x)-p(x).
$$

Se

$$
f\in C^{n+1}[a,b],
$$

allora esiste $\xi\in(a,b)$ tale che

$$
f(x)-p(x)
=
\frac{f^{(n+1)}(\xi)}{(n+1)!}
\prod_{i=0}^n(x-x_i).
$$

Il prodotto

$$
\pi(x)=\prod_{i=0}^n(x-x_i)
$$

si annulla nei nodi e descrive l'effetto della loro posizione.

Definendo

$$
M_{n+1}=\max_{y\in[a,b]}|f^{(n+1)}(y)|,
$$

si ottiene la stima puntuale

$$
|f(x)-p(x)|
\le
\frac{M_{n+1}}{(n+1)!}|\pi(x)|.
$$

Per una stima uniforme:

$$
\max_{x\in[a,b]}|f(x)-p(x)|
\le
\frac{M_{n+1}}{(n+1)!}
\max_{x\in[a,b]}|\pi(x)|.
$$

Il massimo del prodotto può essere:

- maggiorato rapidamente fattore per fattore;
- calcolato più precisamente studiando punti stazionari ed estremi.

Il polinomio interpolante non deve essere necessariamente calcolato.

---

# 19. Domande di controllo

## Domande base

1. Che cosa si intende per errore di interpolazione?
2. Perché l'errore è nullo nei nodi?
3. Che cos'è il polinomio nodale $\pi(x)$?
4. Qual è il grado di $\pi(x)$?
5. Perché $\pi$ è monico?
6. Quanto vale $\pi^{(n+1)}(x)$?
7. Con $n+1$ nodi, quale derivata di $f$ compare nel resto?
8. Che cosa significa $f\in C^{n+1}[a,b]$?
9. Che differenza c'è tra errore con segno ed errore assoluto?
10. Perché il punto $\xi$ non viene normalmente calcolato?

## Domande teoriche

1. Enuncia precisamente il teorema del resto dell'interpolazione.
2. Quali sono le ipotesi del teorema?
3. Qual è la tesi?
4. Perché si distingue il caso in cui $x$ è un nodo?
5. Perché nel caso $x\ne x_i$ si può dividere per $\pi(x)$?
6. Perché la funzione ausiliaria si annulla nei nodi?
7. Perché si annulla anche nel punto $x$?
8. Quanti zeri ha $z'$ dopo la prima applicazione di Rolle?
9. Perché esiste un punto in cui $z^{(n+1)}$ si annulla?
10. Perché $p^{(n+1)}$ è identicamente nullo?
11. Perché $\pi^{(n+1)}=(n+1)!$?
12. Come si passa dalla formula esatta alla stima?
13. Qual è la differenza tra stima puntuale e uniforme?
14. Perché l'interpolazione è esatta sui polinomi di grado al massimo $n$?
15. In che modo la scelta dei nodi influenza l'errore?

## Domande da orale

1. Dimostri il teorema del resto dell'interpolazione.
2. Spieghi perché la funzione ausiliaria viene costruita con il coefficiente $r(x)/\pi(x)$.
3. Spieghi il ruolo del teorema di Rolle nella dimostrazione.
4. Mostri con precisione il passaggio da $z^{(n+1)}(\xi)=0$ alla formula finale.
5. Spieghi perché $\xi$ dipende in generale da $x$.
6. Confronti formula esatta e stima dell'errore.
7. Spieghi come ottenere una stima uniforme.
8. Confronti la maggiorazione separata dei fattori con il calcolo del massimo di $|\pi|$.
9. Spieghi perché non è necessario conoscere il polinomio interpolante.
10. Discuta i problemi che sorgono nel calcolo del massimo di $|\pi|$ quando il numero di nodi è elevato.
11. Spieghi che cosa accade se $f$ è già un polinomio di grado al massimo $n$.
12. Spieghi come scegliere l'intervallo su cui applicare il teorema.

## Domande applicative

1. Con quattro nodi, quale derivata compare nella formula del resto?
2. Scrivi il polinomio nodale per i nodi $-1,0,2$.
3. Calcola $\pi^{(3)}$ per il polinomio nodale dell'esercizio precedente.
4. Per $f(x)=e^x$ e nodi $0,1$, scrivi la formula dell'errore nel punto $t\in[0,1]$.
5. Per $f(x)=\cos x$ e tre nodi, quale maggiorante semplice puoi usare per la derivata richiesta?
6. Trova i punti stazionari di

   $$
   \omega(x)=x\left(x-\frac12\right)(x-1).
   $$

7. Spiega quali valori devi confrontare per trovare

   $$
   \max_{x\in[0,1]}|\omega(x)|.
   $$

8. Perché la stima in un punto fissato può essere migliore di quella uniforme?
9. Senza costruire il polinomio, imposta la stima di $|\sqrt2-p(2)|$ per l'Esercizio 1.6.
10. Senza calcolare $\cos1$, imposta la stima dell'Esercizio 1.7.
11. Se $f(x)=x^3-2x+1$ e si interpola su quattro nodi distinti, quale sarà l'errore?
12. Se il punto di valutazione coincide con un nodo, che cosa puoi concludere immediatamente?
