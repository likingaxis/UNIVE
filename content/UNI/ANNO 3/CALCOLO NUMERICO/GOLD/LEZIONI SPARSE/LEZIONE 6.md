ricordiamo la formula dei trapezi

$$
I_n=h\left[\frac{f(a)+f(b)}{2}+\sum_{j=1}^{n-1}f(x_j)\right]
$$

con

$$
h=\frac{b-a}{n}
$$

ora vedremo

##### Errore o resto della formula dei trapezi

abbiamo quindi l'errore

$$
\left|\int_a^b f(x)\,dx-I_n\right|
$$

vediamo ora un lemma utile per dimostrare poi il teorema

###### Lemma 2.1

siano $\omega,\alpha,\beta:[a,b]\to\mathbb{R}$ funzioni tali che:

- $\omega(x)$ è continua e $\omega(x)\geq 0$ su $[a,b]$
- $\alpha(x)$ e $\beta(x)\omega(x)$ sono continue su $[a,b]$
- $\beta(x)$ è compresa tra $m$ e $M$, dove $m$ e $M$ sono rispettivamente il minimo e il massimo della funzione $\alpha(x)$ su $[a,b]$

cioè

$$
m\leq \beta(x)\leq M \qquad \forall x\in[a,b]
$$

citando Weierstrass sappiamo che il massimo e il minimo esistono, perché $\alpha$ è continua su un intervallo chiuso e limitato $[a,b]$.

Allora esiste un certo punto $\eta\in[a,b]$ tale che

$$
\int_a^b \beta(x)\omega(x)\,dx
=
\alpha(\eta)\int_a^b \omega(x)\,dx
$$

è come se noi portassimo fuori $\beta(x)$ dall’integrale, ma non diventa semplicemente $\beta(\eta)$: diventa $\alpha(\eta)$, perché per ipotesi $\beta(x)$ sta tra il minimo e il massimo di $\alpha(x)$.

>[!info]- oss del lemma
> Se nel lemma prendo $\omega(x)=1$ identicamente e $\beta(x)=\alpha(x)$ continua su $[a,b]$, allora ottengo:
>
> $$
> \int_a^b \alpha(x)\,dx=\alpha(\eta)\int_a^b 1\,dx
> $$
>
> quindi
>
> $$
> \int_a^b \alpha(x)\,dx=\alpha(\eta)(b-a)
> $$
>
> con $\eta\in[a,b]$.
>
> Questo è proprio il teorema della media integrale.
>
> In pratica il teorema della media integrale ci dice che, presa una funzione continua $y=\alpha(x)$ su $[a,b]$, esiste un punto $\eta\in[a,b]$ tale che l’area sotto la curva è uguale all’area del rettangolo di base $b-a$ e altezza $\alpha(\eta)$.

Dimostriamo ora il lemma.

Visto che $\omega(x)\geq 0$ per ogni $x\in[a,b]$ e visto che

$$
m\leq \beta(x)\leq M
$$

per ogni $x\in[a,b]$, allora possiamo moltiplicare tutta la disuguaglianza per $\omega(x)$ senza cambiare il verso, perché $\omega(x)$ è non negativa.

Quindi

$$
m\omega(x)\leq \beta(x)\omega(x)\leq M\omega(x)
$$

per ogni $x\in[a,b]$.

Se prendiamo l’integrale di tutti i membri, la disuguaglianza rimane valida per monotonia dell’integrale:

$$
m\int_a^b \omega(x)\,dx
\leq
\int_a^b \beta(x)\omega(x)\,dx
\leq
M\int_a^b \omega(x)\,dx
$$

metti disegno del prof

Siccome $\beta(x)\omega(x)$ sta sempre tra $m\omega(x)$ e $M\omega(x)$, anche il suo integrale sta tra gli integrali di $m\omega(x)$ e $M\omega(x)$.

Definiamo quindi

$$
z:[a,b]\to\mathbb{R}
$$

con

$$
z(y)=\alpha(y)\int_a^b \omega(x)\,dx
$$

chiamiamo

$$
C=\int_a^b \omega(x)\,dx
$$

con

$$
C\geq 0
$$

perché $\omega(x)\geq 0$.

Allora

$$
z(y)=\alpha(y)C
$$

siccome $\alpha$ è continua su $[a,b]$, anche $z$ è continua su $[a,b]$.

Per il teorema dei valori intermedi, $z$ assume tutti i valori compresi tra il suo minimo e il suo massimo, cioè tra

$$
mC
$$

e

$$
MC
$$

Ma abbiamo visto prima che

$$
\int_a^b \beta(x)\omega(x)\,dx
$$

è compreso proprio tra $mC$ e $MC$.

Quindi $z$ assume anche il valore

$$
\int_a^b \beta(x)\omega(x)\,dx
$$

cioè esiste un punto $\eta\in[a,b]$ tale che

$$
z(\eta)=\int_a^b \beta(x)\omega(x)\,dx
$$

ma

$$
z(\eta)=\alpha(\eta)\int_a^b \omega(x)\,dx
$$

quindi

$$
\int_a^b \beta(x)\omega(x)\,dx
=
\alpha(\eta)\int_a^b \omega(x)\,dx
$$

che è proprio quello che volevamo dimostrare.

>[!info]- piccolo specchietto che spiega teorema dei valori intermedi
> Il teorema dei valori intermedi dice che se una funzione $z$ è continua su un intervallo $[a,b]$, allora assume tutti i valori compresi tra $z(a)$ e $z(b)$.
>
> Più in generale, se $z$ è continua su $[a,b]$, allora assume tutti i valori compresi tra il suo minimo e il suo massimo.
>
> Quindi, se sappiamo che un certo numero $L$ è compreso tra il minimo e il massimo di $z$, allora esiste almeno un punto $\eta\in[a,b]$ tale che
>
> $$
> z(\eta)=L
> $$

##### Teorema 2.1

![[Pasted image 20260713130109.png]]

sia $f:[a,b]\to\mathbb{R}$ di classe $C^2[a,b]$ e sia $I_n$ la formula dei trapezi di ordine $n$ e passo

$$
h=\frac{b-a}{n}
$$

per approssimare

$$
\int_a^b f(x)\,dx
$$

allora esiste un certo punto $\eta\in[a,b]$ tale che

$$
\int_a^b f(x)\,dx-I_n
=
-\frac{(b-a)f''(\eta)}{12}h^2
$$

- $C^2[a,b]$ vuol dire che $f$, $f'$ e $f''$ esistono e sono continue su $[a,b]$

Dim

siano

$$
x_j=a+jh,\qquad j=0,\ldots,n
$$

i punti mostrati in figura e sia $s(x)$ la funzione lineare a tratti mostrata in figura.

Il grafico di $s(x)$ tra due punti $x_j$ e $x_{j+1}$ rappresenta proprio un polinomio di interpolazione di grado minore o uguale a $1$.

Su questo intervallo fissato, quindi, $s(x)$ è l’unico polinomio di grado $\leq 1$ che coincide con $f$ nei nodi $x_j$ e $x_{j+1}$.

Se $f(x_j)=f(x_{j+1})$, allora la retta è orizzontale e quindi il polinomio ha grado $0$, ma va comunque bene perché un polinomio di grado $0$ appartiene comunque a $\mathbb{R}_1[x]$.

Invece $x_j$ e $x_{j+1}$ non sono uguali, perché

$$
x_{j+1}-x_j=h>0
$$

osservazione: $s(x)$ coincide sull'intervallino $[x_j,x_{j+1}]$ con il polinomio di interpolazione di $f(x)$ sui due nodi $x_j,x_{j+1}$, vero per ogni $j=0,\ldots,n-1$.

Vogliamo trovare

$$
\int_a^b f(x)\,dx-I_n
$$

ma ricordiamo che

$$
I_n=\int_a^b s(x)\,dx
$$

quindi

$$
\int_a^b f(x)\,dx-I_n
=
\int_a^b f(x)\,dx-\int_a^b s(x)\,dx
$$

per linearità degli integrali mettiamo tutto sotto un unico integrale:

$$
\int_a^b f(x)\,dx-I_n
=
\int_a^b [f(x)-s(x)]\,dx
$$

questo integrale lo scriviamo come somma sugli intervallini:

$$
\int_a^b [f(x)-s(x)]\,dx
=
\sum_{j=0}^{n-1}\int_{x_j}^{x_{j+1}}[f(x)-s(x)]\,dx
$$

Ora, su ogni intervallo $[x_j,x_{j+1}]$, $s(x)$ è il polinomio di interpolazione di $f(x)$ nei nodi $x_j$ e $x_{j+1}$.

Quindi $f(x)-s(x)$ è l’errore dell’interpolazione polinomiale con $n=1$.

Per il teorema dell’errore dell’interpolazione, per ogni $x\in[x_j,x_{j+1}]$ esiste un punto

$$
\xi_j(x)\in(x_j,x_{j+1})
$$

tale che

$$
f(x)-s(x)=\frac{f''(\xi_j(x))}{2!}(x-x_j)(x-x_{j+1})
$$

cioè

$$
f(x)-s(x)=\frac{f''(\xi_j(x))}{2}(x-x_j)(x-x_{j+1})
$$

$\xi_j(x)$ è un punto che dipende da $x$, quindi lo scriviamo in modo esplicito così dentro l’integrale siamo sicuri di non trattarlo come una costante che si può portare fuori.

Quindi

$$
\int_a^b f(x)\,dx-I_n
=
\sum_{j=0}^{n-1}
\int_{x_j}^{x_{j+1}}
\frac{f''(\xi_j(x))}{2}(x-x_j)(x-x_{j+1})\,dx
$$

Ora osserviamo che, per $x\in[x_j,x_{j+1}]$,

$$
x-x_j\geq 0
$$

mentre

$$
x-x_{j+1}\leq 0
$$

quindi il prodotto

$$
(x-x_j)(x-x_{j+1})
$$

è negativo o nullo.

Per applicare il lemma vogliamo una funzione $\omega(x)$ non negativa, quindi riscriviamo

$$
x-x_{j+1}=-(x_{j+1}-x)$$
e quindi

$$
(x-x_j)(x-x_{j+1})
=
-(x-x_j)(x_{j+1}-x)
$$

allora

$$
\int_a^b f(x)\,dx-I_n
=
-
\sum_{j=0}^{n-1}
\int_{x_j}^{x_{j+1}}
f''(\xi_j(x))\frac{(x-x_j)(x_{j+1}-x)}{2}\,dx
$$

ora applichiamo il lemma sul singolo intervallino $[x_j,x_{j+1}]$ ponendo

$$
\omega(x)=\frac{(x-x_j)(x_{j+1}-x)}{2}
$$

$$
\beta(x)=f''(\xi_j(x))
$$

$$
\alpha(x)=f''(x)
$$

per applicare il lemma devono essere soddisfatte le ipotesi:

- $\omega(x)$ è continua e $\omega(x)\geq 0$ su $[x_j,x_{j+1}]$
	- è continua perché è un polinomio
	- è $\geq 0$ perché su $[x_j,x_{j+1}]$ abbiamo $x-x_j\geq 0$ e $x_{j+1}-x\geq 0$, quindi il prodotto è non negativo

- $\alpha(x)$ è continua su $[x_j,x_{j+1}]$
	- infatti $\alpha(x)=f''(x)$ e $f\in C^2[a,b]$

- $\beta(x)\omega(x)$ è continua
	- qui non dobbiamo dimostrare che $\beta(x)$ da sola è continua
	- il lemma richiede la continuità di $\beta(x)\omega(x)$
	- infatti, dalla formula dell’errore,

$$
f(x)-s(x)=-\beta(x)\omega(x)
$$

quindi

$$
\beta(x)\omega(x)=s(x)-f(x)
$$

e questa funzione è continua perché sia $s(x)$ sia $f(x)$ sono continue

- $\beta(x)$ è compresa tra il minimo e il massimo di $\alpha(x)=f''(x)$ su $[x_j,x_{j+1}]$
	- infatti $\beta(x)=f''(\xi_j(x))$
	- per ogni $x\in[x_j,x_{j+1}]$, il punto $\xi_j(x)$ appartiene a $(x_j,x_{j+1})$
	- quindi $f''(\xi_j(x))$ è uno dei valori assunti da $f''$ dentro l’intervallino
	- perciò è necessariamente compreso tra il minimo e il massimo di $f''$ su $[x_j,x_{j+1}]$

quindi, per il lemma, esiste un punto

$$
\eta_j\in[x_j,x_{j+1}]
$$

tale che

$$
\int_{x_j}^{x_{j+1}}\beta(x)\omega(x)\,dx
=
f''(\eta_j)
\int_{x_j}^{x_{j+1}}\omega(x)\,dx
$$

cioè

$$
\int_{x_j}^{x_{j+1}}
f''(\xi_j(x))\frac{(x-x_j)(x_{j+1}-x)}{2}\,dx
=
f''(\eta_j)
\int_{x_j}^{x_{j+1}}
\frac{(x-x_j)(x_{j+1}-x)}{2}\,dx
$$

quindi quello di prima diventa

$$
\int_a^b f(x)\,dx-I_n
=
-
\sum_{j=0}^{n-1}
f''(\eta_j)
\int_{x_j}^{x_{j+1}}
\frac{(x-x_j)(x_{j+1}-x)}{2}\,dx
$$

ora calcoliamo l’integrale

$$
\int_{x_j}^{x_{j+1}}
\frac{(x-x_j)(x_{j+1}-x)}{2}\,dx
$$

faccio il cambio di variabile

$$
t=x-x_j
$$

quindi

$$
dt=dx$$
Gli estremi diventano:

se $x=x_j$, allora

$$
t=x_j-x_j=0
$$

se $x=x_{j+1}$, allora

$$
t=x_{j+1}-x_j=h
$$

inoltre

$$
x_{j+1}-x=x_{j+1}-(t+x_j)=x_{j+1}-x_j-t=h-t
$$

quindi l’integrale diventa

$$
\int_0^h \frac{t(h-t)}{2}\,dt
$$

calcoliamo questo integrale:

$$
\int_0^h \frac{t(h-t)}{2}\,dt
=
\frac{1}{2}\int_0^h (ht-t^2)\,dt
$$

$$
=
\frac{1}{2}
\left[
\frac{h t^2}{2}-\frac{t^3}{3}
\right]_0^h
$$

sostituendo $h$ e $0$:

$$
=
\frac{1}{2}
\left(
\frac{h\cdot h^2}{2}-\frac{h^3}{3}
\right)
$$

$$
=
\frac{1}{2}
\left(
\frac{h^3}{2}-\frac{h^3}{3}
\right)
$$

$$
=
\frac{1}{2}\cdot \frac{h^3}{6}
=
\frac{h^3}{12}
$$

quindi

$$
\int_a^b f(x)\,dx-I_n
=
-
\sum_{j=0}^{n-1}
f''(\eta_j)\frac{h^3}{12}
$$

portiamo fuori la costante:

$$
\int_a^b f(x)\,dx-I_n
=
-\frac{h^3}{12}
\sum_{j=0}^{n-1}f''(\eta_j)
$$

moltiplichiamo e dividiamo per $n$ così otteniamo una media aritmetica:

$$
-\frac{h^3}{12}
\sum_{j=0}^{n-1}f''(\eta_j)
=
-\frac{nh^3}{12}
\frac{1}{n}
\sum_{j=0}^{n-1}f''(\eta_j)
$$

ora usiamo il fatto che

$$
nh=b-a
$$

perché

$$
h=\frac{b-a}{n}
$$

quindi

$$
nh^3=h^2(nh)=h^2(b-a)
$$

allora

$$
\int_a^b f(x)\,dx-I_n
=
-\frac{(b-a)h^2}{12}
\left[
\frac{1}{n}
\sum_{j=0}^{n-1}f''(\eta_j)
\right]
$$

questa media è un valore compreso tra il minimo e il massimo di $f''$ su $[a,b]$.

Infatti ogni $\eta_j$ appartiene a $[a,b]$, quindi ogni valore $f''(\eta_j)$ è compreso tra il minimo e il massimo di $f''$ su $[a,b]$.

Anche la media aritmetica di questi valori resta compresa tra il minimo e il massimo.

Essendo $f''(x)$ continua su $[a,b]$, per il teorema dei valori intermedi esiste sicuramente un punto $\eta\in[a,b]$ tale che

$$
f''(\eta)
=
\frac{1}{n}
\sum_{j=0}^{n-1}f''(\eta_j)
$$

sostituendo otteniamo

$$
\int_a^b f(x)\,dx-I_n
=
-\frac{(b-a)h^2}{12}f''(\eta)
$$

cioè
$$
\int_a^b f(x)\,dx-I_n
=
-\frac{(b-a)f''(\eta)}{12}h^2
$$
abbiamo ora raggiunto la fine della dimostrazione.

##### Osservazione di errore

in alcuni esercizi viene usato questo valore $n(\varepsilon)$, cioè il valore che garantisce un errore

$$
\left|\int_a^b f(x)\,dx-I_n\right|\leq \varepsilon
$$

se prendiamo

$$
n\geq n(\varepsilon)
$$

questo valore $n(\varepsilon)$ è della forma

$$
\frac{C}{\sqrt{\varepsilon}}
$$

con $C$ costante.

È un fatto generale, infatti in base alla formula del teorema dell’errore della formula dei trapezi sappiamo che

$$
\int_a^b f(x)\,dx-I_n
=
-\frac{(b-a)f''(\eta)}{12}h^2
$$

dove $\eta\in[a,b]$ e

$$
h=\frac{b-a}{n}
$$

quindi, passando al modulo,

$$
\left|\int_a^b f(x)\,dx-I_n\right|
=
\left|-\frac{(b-a)f''(\eta)}{12}h^2\right|
=
\frac{(b-a)|f''(\eta)|}{12}h^2
$$

siccome

$$
h^2=\left(\frac{b-a}{n}\right)^2=\frac{(b-a)^2}{n^2}
$$

allora

$$
\left|\int_a^b f(x)\,dx-I_n\right|
=
\frac{(b-a)|f''(\eta)|}{12}\frac{(b-a)^2}{n^2}
=
\frac{(b-a)^3|f''(\eta)|}{12n^2}
$$

ora chiamiamo $K$ una costante tale che

$$
|f''(x)|\leq K
$$

per ogni $x\in[a,b]$.

In particolare, siccome $\eta\in[a,b]$, vale anche

$$
|f''(\eta)|\leq K
$$

quindi

$$
\left|\int_a^b f(x)\,dx-I_n\right|
=
\frac{(b-a)^3|f''(\eta)|}{12n^2}
\leq
\frac{(b-a)^3K}{12n^2}
$$

per garantire che l’errore sia minore o uguale a $\varepsilon$, basta imporre

$$
\frac{(b-a)^3K}{12n^2}\leq \varepsilon
$$

risolviamo rispetto a $n$:

$$
\frac{(b-a)^3K}{12n^2}\leq \varepsilon
$$

equivale a

$$
(b-a)^3K\leq 12\varepsilon n^2
$$

quindi

$$
n^2\geq \frac{(b-a)^3K}{12\varepsilon}
$$

e dunque

$$
n\geq \sqrt{\frac{(b-a)^3K}{12\varepsilon}}
$$

definiamo quindi

$$
n(\varepsilon)=\sqrt{\frac{(b-a)^3K}{12\varepsilon}}
$$

in questo modo, se prendiamo

$$
n\geq n(\varepsilon)
$$

allora è garantito che

$$
\left|\int_a^b f(x)\,dx-I_n\right|\leq \varepsilon
$$

inoltre possiamo riscrivere

$$
n(\varepsilon)=\sqrt{\frac{(b-a)^3K}{12\varepsilon}}
=
\frac{1}{\sqrt{\varepsilon}}\sqrt{\frac{(b-a)^3K}{12}}
$$

quindi

$$
n(\varepsilon)=\frac{C}{\sqrt{\varepsilon}}
$$

dove

$$
C=\sqrt{\frac{(b-a)^3K}{12}}
$$

quindi il valore minimo teorico di $n$ cresce come $\frac{1}{\sqrt{\varepsilon}}$: se voglio un errore molto più piccolo, devo aumentare parecchio $n$.

Negli esercizi, siccome $n$ deve essere un numero intero, alla fine si prende

$$
n=\lceil n(\varepsilon)\rceil
$$
cioè il primo intero maggiore o uguale a $n(\varepsilon)$.