Certo. Ti scrivo il **Lemma 2.1** con una dimostrazione molto guidata, facendo attenzione soprattutto ai passaggi con la monotonia dell’integrale, alla funzione (z(y)) e al teorema dei valori intermedi.

# Lemma 2.1 — Lemma della media integrale generalizzato

## Contesto

Questo lemma viene usato nello studio dell’**errore della formula dei trapezi**. Serve per trasformare un integrale del tipo

[  
\int_a^b \beta(x)\omega(x),dx  
]

in una forma più semplice:

[  
\alpha(\eta)\int_a^b \omega(x),dx  
]

per un opportuno punto

[  
\eta\in[a,b].  
]

L’idea è simile al teorema della media integrale, ma più generale. Infatti nelle dispense viene detto che, scegliendo (\omega(x)=1) e (\beta(x)=\alpha(x)), si ottiene proprio il teorema della media integrale.

---

# Enunciato

Siano

[  
\omega,\alpha,\beta:[a,b]\to\mathbb{R}  
]

funzioni tali che:

1. (\omega(x)) è continua e non negativa su ([a,b]), cioè
    

[  
\omega(x)\ge 0  
\qquad  
\forall x\in[a,b];  
]

2. (\alpha(x)) e (\beta(x)\omega(x)) sono continue su ([a,b]);
    
3. per ogni (x\in[a,b]) vale
    

[  
m\le \beta(x)\le M,  
]

dove (m) e (M) sono rispettivamente il minimo e il massimo di (\alpha(x)) su ([a,b]).

Allora esiste un punto

[  
\eta\in[a,b]  
]

tale che

# [  
\int_a^b \beta(x)\omega(x),dx

\alpha(\eta)\int_a^b \omega(x),dx.  
]

---

# Dimostrazione

Per ipotesi sappiamo che

[  
m\le \beta(x)\le M  
\qquad  
\forall x\in[a,b].  
]

Inoltre sappiamo che

[  
\omega(x)\ge 0  
\qquad  
\forall x\in[a,b].  
]

Poiché (\omega(x)) è non negativa, possiamo moltiplicare la disuguaglianza

[  
m\le \beta(x)\le M  
]

per (\omega(x)) senza cambiare il verso delle disuguaglianze. Otteniamo quindi

[  
m\omega(x)\le \beta(x)\omega(x)\le M\omega(x)  
\qquad  
\forall x\in[a,b].  
]

Questo è il primo passaggio importante: il fatto che (\omega(x)\ge 0) serve proprio a conservare il verso delle disuguaglianze.

Ora integriamo su ([a,b]). Per la monotonia dell’integrale, da

[  
m\omega(x)\le \beta(x)\omega(x)\le M\omega(x)  
]

segue

[  
\int_a^b m\omega(x),dx  
\le  
\int_a^b \beta(x)\omega(x),dx  
\le  
\int_a^b M\omega(x),dx.  
]

Poiché (m) e (M) sono costanti rispetto alla variabile di integrazione (x), possiamo portarli fuori dall’integrale:

[  
m\int_a^b \omega(x),dx  
\le  
\int_a^b \beta(x)\omega(x),dx  
\le  
M\int_a^b \omega(x),dx.  
]

Quindi abbiamo ottenuto che l’integrale

[  
\int_a^b \beta(x)\omega(x),dx  
]

è compreso tra

[  
m\int_a^b \omega(x),dx  
]

e

[  
M\int_a^b \omega(x),dx.  
]

---

## Costruzione della funzione ausiliaria

Definiamo ora

[  
z:[a,b]\to\mathbb{R}  
]

ponendo

[  
z(y)=\alpha(y)\int_a^b \omega(x),dx.  
]

Qui bisogna distinguere bene le variabili:

[  
y  
]

è la variabile della funzione (z), mentre

[  
x  
]

è solo la variabile di integrazione nell’integrale

[  
\int_a^b \omega(x),dx.  
]

Quindi l’integrale

[  
\int_a^b \omega(x),dx  
]

non dipende da (y): è un numero reale fissato.

Poniamo allora

[  
C=\int_a^b \omega(x),dx.  
]

Poiché

[  
\omega(x)\ge 0  
\qquad  
\forall x\in[a,b],  
]

per monotonia dell’integrale abbiamo

[  
C=\int_a^b \omega(x),dx\ge 0.  
]

Quindi possiamo scrivere

[  
z(y)=C\alpha(y).  
]

Attenzione: scriviamo

[  
z(y)=C\alpha(y)  
]

non perché (C\ge 0), ma perché abbiamo definito

[  
C=\int_a^b \omega(x),dx.  
]

Il fatto che (C\ge 0) serve invece per capire quali sono il minimo e il massimo di (z).

---

## Continuità di (z)

Per ipotesi, (\alpha) è continua su ([a,b]).

Inoltre (C) è una costante. Quindi

[  
z(y)=C\alpha(y)  
]

è continua su ([a,b]), perché è il prodotto di una funzione continua per una costante.

---

## Minimo e massimo di (z)

Sappiamo che (m) e (M) sono rispettivamente il minimo e il massimo di (\alpha) su ([a,b]). Quindi

[  
m\le \alpha(y)\le M  
\qquad  
\forall y\in[a,b].  
]

Poiché

[  
C\ge 0,  
]

possiamo moltiplicare per (C) senza cambiare il verso delle disuguaglianze:

[  
Cm\le C\alpha(y)\le CM.  
]

Ma

[  
z(y)=C\alpha(y),  
]

quindi

[  
Cm\le z(y)\le CM  
\qquad  
\forall y\in[a,b].  
]

Cioè

[  
m\int_a^b \omega(x),dx  
\le  
z(y)  
\le  
M\int_a^b \omega(x),dx.  
]

In particolare, il minimo di (z) è

[  
m\int_a^b \omega(x),dx,  
]

e il massimo di (z) è

[  
M\int_a^b \omega(x),dx.  
]

Qui il fatto che (C\ge 0) è essenziale: se (C) fosse negativo, minimo e massimo si scambierebbero. Ma nel nostro caso (C\ge 0), quindi l’ordine rimane lo stesso.

---

## Applicazione del teorema dei valori intermedi

Abbiamo dimostrato due cose.

Prima:

[  
m\int_a^b \omega(x),dx  
\le  
\int_a^b \beta(x)\omega(x),dx  
\le  
M\int_a^b \omega(x),dx.  
]

Seconda:

[  
z(y)  
]

è continua su ([a,b]), e i suoi valori vanno dal minimo

[  
m\int_a^b \omega(x),dx  
]

al massimo

[  
M\int_a^b \omega(x),dx.  
]

Quindi il numero

[  
\int_a^b \beta(x)\omega(x),dx  
]

è compreso tra il minimo e il massimo della funzione continua (z).

Per il teorema dei valori intermedi, (z) assume tutti i valori compresi tra il suo minimo e il suo massimo. Quindi esiste un punto

[  
\eta\in[a,b]  
]

tale che

# [  
z(\eta)

\int_a^b \beta(x)\omega(x),dx.  
]

Ma per definizione di (z),

# [  
z(\eta)

\alpha(\eta)\int_a^b \omega(x),dx.  
]

Dunque

# [  
\alpha(\eta)\int_a^b \omega(x),dx

\int_a^b \beta(x)\omega(x),dx.  
]

Scrivendo l’uguaglianza nell’ordine dell’enunciato, otteniamo

# [  
\int_a^b \beta(x)\omega(x),dx

\alpha(\eta)\int_a^b \omega(x),dx.  
]

Questo dimostra il lemma.

---

# Conclusione

Il lemma dice che, sotto opportune ipotesi di continuità e positività del peso (\omega), l’integrale pesato

[  
\int_a^b \beta(x)\omega(x),dx  
]

può essere scritto come

[  
\alpha(\eta)\int_a^b \omega(x),dx  
]

per un certo punto (\eta\in[a,b]).

La logica della dimostrazione è:

[  
m\le \beta(x)\le M  
]

e

[  
\omega(x)\ge 0  
]

implicano

[  
m\omega(x)\le \beta(x)\omega(x)\le M\omega(x).  
]

Integrando:

[  
m\int_a^b \omega(x),dx  
\le  
\int_a^b \beta(x)\omega(x),dx  
\le  
M\int_a^b \omega(x),dx.  
]

Poi si costruisce

[  
z(y)=\alpha(y)\int_a^b \omega(x),dx.  
]

Essendo (z) continua, per il teorema dei valori intermedi assume tutti i valori compresi tra

[  
m\int_a^b \omega(x),dx  
]

e

[  
M\int_a^b \omega(x),dx.  
]

Quindi assume anche il valore

[  
\int_a^b \beta(x)\omega(x),dx.  
]

Perciò esiste

[  
\eta\in[a,b]  
]

tale che

# [  
\int_a^b \beta(x)\omega(x),dx

\alpha(\eta)\int_a^b \omega(x),dx.  
]


# Teorema 2.1 — Errore della formula composita dei trapezi

## Contesto

Vogliamo approssimare l’integrale

[  
\int_a^b f(x),dx  
]

mediante la **formula composita dei trapezi**.

L’idea geometrica è questa: invece di calcolare l’area esatta sotto il grafico di (f), dividiamo l’intervallo ([a,b]) in tanti sottointervalli e, su ciascuno di essi, sostituiamo il grafico di (f) con il segmento che unisce i due valori agli estremi.

Quindi approssimiamo (f) con una funzione lineare a tratti (s), e integriamo (s) al posto di (f).

Il teorema ci dice quanto vale l’errore

[  
\int_a^b f(x),dx-I_n.  
]

---

# Enunciato

Sia

[  
f:[a,b]\to\mathbb{R}  
]

una funzione di classe

[  
C^2([a,b]).  
]

Sia (I_n) la formula composita dei trapezi di ordine (n), con passo

[  
h=\frac{b-a}{n}.  
]

Allora esiste un punto

[  
\eta\in[a,b]  
]

tale che

# [  
\int_a^b f(x),dx-I_n

-\frac{b-a}{12}h^2 f''(\eta).  
]

Equivalentemente,

# [  
\boxed{  
\int_a^b f(x),dx-I_n

-\frac{(b-a)h^2}{12}f''(\eta)  
}  
]

per un opportuno (\eta\in[a,b]).

---

# Significato delle ipotesi

Dire che

[  
f\in C^2([a,b])  
]

significa che (f) è derivabile due volte e che

[  
f,\quad f',\quad f''  
]

sono continue su ([a,b]).

Questa ipotesi è necessaria perché nella formula finale dell’errore compare

[  
f''(\eta).  
]

La derivata seconda misura, in un certo senso, la curvatura della funzione. Infatti la formula dei trapezi è esatta per funzioni lineari, perché se (f) è una retta allora

[  
f''(x)=0.  
]

In quel caso l’errore è nullo.

---

# Partizione dell’intervallo

Dividiamo l’intervallo ([a,b]) in (n) sottointervalli uguali.

Definiamo i nodi

[  
x_j=a+jh,  
\qquad j=0,\dots,n,  
]

dove

[  
h=\frac{b-a}{n}.  
]

Quindi

[  
x_0=a,  
\qquad  
x_n=b.  
]

Inoltre, per ogni (j=0,\dots,n-1),

[  
x_{j+1}-x_j=h.  
]

Poiché (a<b) e (n\ge 1), abbiamo

[  
h>0.  
]

Quindi

[  
x_{j+1}-x_j=h>0,  
]

e dunque i nodi consecutivi (x_j) e (x_{j+1}) sono distinti. Questo è importante perché nella formula della retta interpolante compare il denominatore

[  
x_{j+1}-x_j,  
]

che quindi è diverso da zero.

---

# La funzione lineare a tratti (s)

Definiamo

[  
s:[a,b]\to\mathbb{R}  
]

come la funzione che su ogni sottointervallo ([x_j,x_{j+1}]) coincide con la retta passante per i punti

[  
(x_j,f(x_j)),  
\qquad  
(x_{j+1},f(x_{j+1})).  
]

Formalmente, per

[  
x\in[x_j,x_{j+1}],  
\qquad j=0,\dots,n-1,  
]

poniamo

# [  
s(x)

f(x_j)  
+  
\frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}  
(x-x_j).  
]

Questa è la formula della retta in forma punto-pendenza.

Infatti il coefficiente

[  
\frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}  
]

è la pendenza della retta secante tra i due punti.

Verifichiamo che (s) interpola davvero (f) agli estremi del sottointervallo.

Se (x=x_j), allora

# [  
s(x_j)

f(x_j)  
+  
\frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}  
(x_j-x_j).  
]

Poiché

[  
x_j-x_j=0,  
]

otteniamo

[  
s(x_j)=f(x_j).  
]

Se invece (x=x_{j+1}), allora

# [  
s(x_{j+1})

f(x_j)  
+  
\frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}  
(x_{j+1}-x_j).  
]

Semplificando,

# [  
s(x_{j+1})

# f(x_j)+f(x_{j+1})-f(x_j)

f(x_{j+1}).  
]

Quindi, su ogni sottointervallo,

[  
s(x_j)=f(x_j),  
\qquad  
s(x_{j+1})=f(x_{j+1}).  
]

Pertanto (s), ristretta a ([x_j,x_{j+1}]), è il polinomio interpolante lineare di (f) nei nodi (x_j) e (x_{j+1}).

Più precisamente, è un polinomio di grado al massimo (1). Se

[  
f(x_j)\neq f(x_{j+1}),  
]

la retta è obliqua e ha grado (1). Se invece

[  
f(x_j)=f(x_{j+1}),  
]

la retta è orizzontale e il polinomio ha grado (0). In ogni caso appartiene a

[  
\mathbb{R}_1[x].  
]

---

# Formula dei trapezi come integrale di (s)

La formula composita dei trapezi è

[  
I_n=\int_a^b s(x),dx.  
]

Poiché (s) è definita a tratti, possiamo scrivere

# [  
I_n

\sum_{j=0}^{n-1}  
\int_{x_j}^{x_{j+1}} s(x),dx.  
]

Su ogni sottointervallo ([x_j,x_{j+1}]), l’area sotto (s) è l’area di un trapezio con basi verticali

[  
f(x_j),  
\qquad  
f(x_{j+1}),  
]

e altezza orizzontale

[  
h=x_{j+1}-x_j.  
]

Quindi

# [  
\int_{x_j}^{x_{j+1}}s(x),dx

\frac{h}{2}\left(f(x_j)+f(x_{j+1})\right).  
]

Sommando per (j=0,\dots,n-1), otteniamo

# [  
I_n

\sum_{j=0}^{n-1}  
\frac{h}{2}  
\left(f(x_j)+f(x_{j+1})\right).  
]

Sviluppando la somma:

# [  
I_n

\frac{h}{2}  
\left[  
f(x_0)+f(x_1)  
+  
f(x_1)+f(x_2)  
+  
\dots  
+  
f(x_{n-1})+f(x_n)  
\right].  
]

I nodi interni compaiono due volte, perché ciascun nodo interno appartiene a due trapezi consecutivi. Quindi

# [  
I_n

\frac{h}{2}  
\left[  
f(x_0)  
+  
2\sum_{j=1}^{n-1}f(x_j)  
+  
f(x_n)  
\right].  
]

Questa è la formula composita dei trapezi.

---

# Dimostrazione dell’errore

Vogliamo studiare

[  
\int_a^b f(x),dx-I_n.  
]

Poiché

[  
I_n=\int_a^b s(x),dx,  
]

abbiamo

# [  
\int_a^b f(x),dx-I_n

\int_a^b f(x),dx-\int_a^b s(x),dx.  
]

Per linearità dell’integrale,

# [  
\int_a^b f(x),dx-I_n

\int_a^b (f(x)-s(x)),dx.  
]

Ora spezziamo l’integrale sulla partizione:

# [  
\int_a^b (f(x)-s(x)),dx

\sum_{j=0}^{n-1}  
\int_{x_j}^{x_{j+1}}(f(x)-s(x)),dx.  
]

Quindi

# [  
\int_a^b f(x),dx-I_n

\sum_{j=0}^{n-1}  
\int_{x_j}^{x_{j+1}}(f(x)-s(x)),dx.  
]

---

# Errore sul singolo sottointervallo

Fissiamo un indice

[  
j\in{0,\dots,n-1}.  
]

Sul sottointervallo

[  
[x_j,x_{j+1}],  
]

la funzione (s) è il polinomio interpolante di grado al massimo (1) di (f) nei nodi (x_j) e (x_{j+1}).

Possiamo quindi applicare il Teorema 1.2, cioè la formula dell’errore dell’interpolazione polinomiale, con (n=1).

Dato che (f\in C^2([a,b])), in particolare (f\in C^2([x_j,x_{j+1}])), quindi le ipotesi del Teorema 1.2 sono soddisfatte sul sottointervallo.

Il Teorema 1.2 ci dice che, per ogni

[  
x\in[x_j,x_{j+1}],  
]

esiste un punto

[  
\xi_x\in(x_j,x_{j+1})  
]

tale che

# [  
f(x)-s(x)

\frac{f''(\xi_x)}{2}  
(x-x_j)(x-x_{j+1}).  
]

Qui compare (f'') perché stiamo interpolando con un polinomio di grado (1), quindi l’errore coinvolge la derivata di ordine (1+1=2).

Ora osserviamo il segno del prodotto

[  
(x-x_j)(x-x_{j+1}).  
]

Se

[  
x\in[x_j,x_{j+1}],  
]

allora

[  
x-x_j\ge 0,  
]

mentre

[  
x-x_{j+1}\le 0.  
]

Quindi

[  
(x-x_j)(x-x_{j+1})\le 0.  
]

Scriviamo allora

[  
x-x_{j+1}=-(x_{j+1}-x).  
]

Quindi

# [  
(x-x_j)(x-x_{j+1})

-(x-x_j)(x_{j+1}-x).  
]

Pertanto

# [  
f(x)-s(x)

-\frac{f''(\xi_x)}{2}  
(x-x_j)(x_{j+1}-x).  
]

Questa forma è utile perché

[  
(x-x_j)(x_{j+1}-x)\ge 0  
]

su tutto l’intervallo ([x_j,x_{j+1}]).

---

# Applicazione del Lemma 2.1

Integrando l’errore locale, otteniamo

# [  
\int_{x_j}^{x_{j+1}}(f(x)-s(x)),dx

-\int_{x_j}^{x_{j+1}}  
\frac{f''(\xi_x)}{2}  
(x-x_j)(x_{j+1}-x),dx.  
]

Portiamo fuori il fattore costante (-\frac12):

# [  
\int_{x_j}^{x_{j+1}}(f(x)-s(x)),dx

-\frac12  
\int_{x_j}^{x_{j+1}}  
f''(\xi_x)  
(x-x_j)(x_{j+1}-x),dx.  
]

Ora vogliamo applicare il Lemma 2.1.

Poniamo

[  
\alpha(x)=f''(x),  
]

[  
\beta(x)=f''(\xi_x),  
]

e

[  
\omega(x)=(x-x_j)(x_{j+1}-x).  
]

Verifichiamo le ipotesi del lemma.

Prima ipotesi: (\omega) deve essere continua e non negativa.

La funzione

[  
\omega(x)=(x-x_j)(x_{j+1}-x)  
]

è un polinomio, quindi è continua.

Inoltre, se (x\in[x_j,x_{j+1}]), allora

[  
x-x_j\ge 0  
]

e

[  
x_{j+1}-x\ge 0.  
]

Quindi

[  
\omega(x)\ge 0  
\qquad  
\forall x\in[x_j,x_{j+1}].  
]

Seconda ipotesi: (\alpha) deve essere continua.

Poiché

[  
\alpha(x)=f''(x)  
]

e per ipotesi

[  
f\in C^2([a,b]),  
]

la derivata seconda (f'') è continua su ([a,b]). Dunque è continua anche sul sottointervallo

[  
[x_j,x_{j+1}].  
]

Terza ipotesi: (\beta(x)) deve essere compresa tra il minimo e il massimo di (\alpha).

Poiché (f'') è continua su ([x_j,x_{j+1}]), per il teorema di Weierstrass ammette minimo e massimo su questo intervallo. Indichiamoli con

[  
m_j=\min_{x\in[x_j,x_{j+1}]}f''(x),  
]

[  
M_j=\max_{x\in[x_j,x_{j+1}]}f''(x).  
]

Allora per ogni (t\in[x_j,x_{j+1}]) vale

[  
m_j\le f''(t)\le M_j.  
]

Nel nostro caso

[  
\xi_x\in(x_j,x_{j+1})\subseteq[x_j,x_{j+1}],  
]

quindi possiamo prendere (t=\xi_x) e ottenere

[  
m_j\le f''(\xi_x)\le M_j.  
]

Cioè

[  
m_j\le \beta(x)\le M_j.  
]

Quindi le ipotesi del Lemma 2.1 sono soddisfatte.

Per il Lemma 2.1 esiste un punto

[  
\eta_j\in[x_j,x_{j+1}]  
]

tale che

# [  
\int_{x_j}^{x_{j+1}}  
f''(\xi_x)  
(x-x_j)(x_{j+1}-x),dx

f''(\eta_j)  
\int_{x_j}^{x_{j+1}}  
(x-x_j)(x_{j+1}-x),dx.  
]

Di conseguenza,

# [  
\int_{x_j}^{x_{j+1}}(f(x)-s(x)),dx

-\frac12 f''(\eta_j)  
\int_{x_j}^{x_{j+1}}  
(x-x_j)(x_{j+1}-x),dx.  
]

Equivalentemente,

# [  
\int_{x_j}^{x_{j+1}}(f(x)-s(x)),dx

f''(\eta_j)  
\int_{x_j}^{x_{j+1}}  
\frac{(x-x_j)(x_{j+1}-x)}{2},dx.  
]

---

# Calcolo dell’integrale elementare

Dobbiamo calcolare

[  
\int_{x_j}^{x_{j+1}}  
\frac{(x-x_j)(x_{j+1}-x)}{2},dx.  
]

Facciamo il cambio di variabile

[  
t=x-x_j.  
]

Allora

[  
dt=dx.  
]

Vediamo come cambiano gli estremi.

Se

[  
x=x_j,  
]

allora

[  
t=x_j-x_j=0.  
]

Se invece

[  
x=x_{j+1},  
]

allora

[  
t=x_{j+1}-x_j=h.  
]

Inoltre,

[  
x=t+x_j.  
]

Quindi

# [  
x_{j+1}-x

# x_{j+1}-(t+x_j)

x_{j+1}-x_j-t.  
]

Poiché

[  
x_{j+1}-x_j=h,  
]

abbiamo

[  
x_{j+1}-x=h-t.  
]

Pertanto l’integrale diventa

[  
\int_{0}^{h}  
\frac{t(h-t)}{2},dt.  
]

Calcoliamolo:

# [  
\int_0^h \frac{t(h-t)}{2},dt

\frac12\int_0^h (ht-t^2),dt.  
]

Ora integriamo termine a termine:

# [  
\int_0^h ht,dt

# h\int_0^h t,dt

h\left[\frac{t^2}{2}\right]_0^h,  
]

e

# [  
\int_0^h t^2,dt

\left[\frac{t^3}{3}\right]_0^h.  
]

Quindi

# [  
\frac12\int_0^h (ht-t^2),dt

## \frac12  
\left[  
\frac{h t^2}{2}

\frac{t^3}{3}  
\right]_0^h.  
]

Sostituendo gli estremi:

# [

## \frac12  
\left(  
\frac{h\cdot h^2}{2}

\frac{h^3}{3}  
\right).  
]

Cioè

# [

## \frac12  
\left(  
\frac{h^3}{2}

\frac{h^3}{3}  
\right).  
]

Mettiamo a denominatore comune:

## [  
\frac{h^3}{2}

# \frac{h^3}{3}

# \frac{3h^3-2h^3}{6}

\frac{h^3}{6}.  
]

Quindi

# [  
\frac12  
\left(  
\frac{h^3}{6}  
\right)

\frac{h^3}{12}.  
]

Abbiamo dunque ottenuto

# [  
\int_{x_j}^{x_{j+1}}  
\frac{(x-x_j)(x_{j+1}-x)}{2},dx

\frac{h^3}{12}.  
]

Pertanto

# [  
\int_{x_j}^{x_{j+1}}(f(x)-s(x)),dx

f''(\eta_j)\frac{h^3}{12}.  
]

---

# Somma degli errori locali

Ora torniamo all’errore globale:

# [  
\int_a^b f(x),dx-I_n

\sum_{j=0}^{n-1}  
\int_{x_j}^{x_{j+1}}(f(x)-s(x)),dx.  
]

Sostituendo la formula appena trovata per ogni sottointervallo:

# [  
\int_a^b f(x),dx-I_n

\sum_{j=0}^{n-1}  
\left(  
-f''(\eta_j)\frac{h^3}{12}  
\right).  
]

Quindi

# [  
\int_a^b f(x),dx-I_n

-\frac{h^3}{12}  
\sum_{j=0}^{n-1}f''(\eta_j).  
]

A questo punto vogliamo riscrivere la somma come una media aritmetica. Moltiplichiamo e dividiamo per (n):

# [  
-\frac{h^3}{12}  
\sum_{j=0}^{n-1}f''(\eta_j)

-\frac{nh^3}{12}  
\left[  
\frac1n  
\sum_{j=0}^{n-1}f''(\eta_j)  
\right].  
]

Ora usiamo

[  
h=\frac{b-a}{n}.  
]

Da questa uguaglianza segue

[  
nh=b-a.  
]

Quindi

[  
nh^3=h^2(nh)=h^2(b-a).  
]

Perciò

# [  
-\frac{nh^3}{12}

-\frac{(b-a)h^2}{12}.  
]

Otteniamo

# [  
\int_a^b f(x),dx-I_n

-\frac{(b-a)h^2}{12}  
\left[  
\frac1n  
\sum_{j=0}^{n-1}f''(\eta_j)  
\right].  
]

---

# Uso della continuità di (f'')

Ora dobbiamo trasformare la media

[  
\frac1n  
\sum_{j=0}^{n-1}f''(\eta_j)  
]

in un valore assunto da (f'') in un punto opportuno dell’intervallo.

Poiché

[  
\eta_j\in[x_j,x_{j+1}]  
]

per ogni (j), e ciascun sottointervallo è contenuto in ([a,b]), abbiamo

[  
\eta_j\in[a,b].  
]

Dato che (f'') è continua su ([a,b]), per il teorema di Weierstrass (f'') ammette minimo e massimo su ([a,b]). Indichiamoli con

[  
m=\min_{x\in[a,b]}f''(x),  
\qquad  
M=\max_{x\in[a,b]}f''(x).  
]

Allora, per ogni (j),

[  
m\le f''(\eta_j)\le M.  
]

Facendo la media aritmetica di questi valori, otteniamo ancora un numero compreso tra (m) e (M):

[  
m  
\le  
\frac1n  
\sum_{j=0}^{n-1}f''(\eta_j)  
\le  
M.  
]

Infatti una media di numeri tutti compresi tra (m) e (M) rimane compresa tra (m) e (M).

Poiché (f'') è continua su ([a,b]), per il teorema dei valori intermedi (f'') assume tutti i valori compresi tra il suo minimo (m) e il suo massimo (M).

Quindi esiste un punto

[  
\eta\in[a,b]  
]

tale che

# [  
f''(\eta)

\frac1n  
\sum_{j=0}^{n-1}f''(\eta_j).  
]

Sostituendo questa uguaglianza nella formula dell’errore, otteniamo

# [  
\int_a^b f(x),dx-I_n

-\frac{(b-a)h^2}{12}f''(\eta).  
]

Cioè

# [  
\boxed{  
\int_a^b f(x),dx-I_n

-\frac{b-a}{12}h^2 f''(\eta)  
}  
]

per un opportuno

[  
\eta\in[a,b].  
]

Questo conclude la dimostrazione.

---

# Interpretazione finale

La formula

# [  
\int_a^b f(x),dx-I_n

-\frac{b-a}{12}h^2 f''(\eta)  
]

dice che l’errore della formula composita dei trapezi è proporzionale a

[  
h^2.  
]

Quindi, se dimezziamo il passo (h), l’errore si riduce dell’ordine di (h^2), cioè circa di un fattore (4), a parità di comportamento di (f'').

Il segno dell’errore dipende da (f''(\eta)).

Se

[  
f''(\eta)>0,  
]

allora

[  
\int_a^b f(x),dx-I_n<0,  
]

quindi

[  
I_n>\int_a^b f(x),dx.  
]

In questo caso la formula dei trapezi sovrastima l’integrale.

Se invece

[  
f''(\eta)<0,  
]

allora

[  
\int_a^b f(x),dx-I_n>0,  
]

quindi

[  
I_n<\int_a^b f(x),dx.  
]

In questo caso la formula dei trapezi sottostima l’integrale.

Se (f) è lineare, allora

[  
f''(x)=0  
]

per ogni (x), e quindi

[  
\int_a^b f(x),dx-I_n=0.  
]

Questo conferma che la formula dei trapezi è esatta per i polinomi di grado al massimo (1).