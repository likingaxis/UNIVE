#### Estrapolazione

sia $f:[a,b]\to\mathbb{R}$ integrabile e siano

$$
I_{n_0},I_{n_1},\ldots,I_{n_m}
$$

le formule dei trapezi di ordini distinti

$$
n_0,n_1,\ldots,n_m
$$

e passi

$$
h_0=\frac{b-a}{n_0},\qquad h_1=\frac{b-a}{n_1},\qquad \ldots,\qquad h_m=\frac{b-a}{n_m}
$$

per approssimare

$$
\int_a^b f(x)\,dx
$$

chiamiamo $p(x)$ il polinomio di interpolazione dei dati

$$
(h_0^2,I_{n_0}),\ (h_1^2,I_{n_1}),\ldots,(h_m^2,I_{n_m})
$$

quindi $p(x)$ è l’unico polinomio in $\mathbb{R}_m[x]$ tale che

$$
p(h_i^2)=I_{n_i}\qquad i=0,\ldots,m
$$

questo polinomio esiste ed è unico perché i nodi

$$
h_0^2,h_1^2,\ldots,h_m^2
$$

sono distinti, dato che gli ordini $n_0,n_1,\ldots,n_m$ sono distinti e quindi anche i passi $h_i=\frac{b-a}{n_i}$ sono distinti.

risultato non dimostrato:

$$
p(0)
$$

è un’approssimazione dell’integrale

$$
\int_a^b f(x)\,dx
$$

molto più precisa rispetto alle singole formule dei trapezi

$$
I_{n_0},I_{n_1},\ldots,I_{n_m}
$$

![[Pasted image 20260714104259.png|424]]

con $m=2$, il polinomio $p(x)$ interpola i tre dati

$$
(h_0^2,I_{n_0}),\qquad (h_1^2,I_{n_1}),\qquad (h_2^2,I_{n_2})
$$

la funzione in rosso è

$$
y=p(x)
$$

e il valore

$$
p(0)
$$

è una approssimazione dell’integrale molto più valida rispetto alle singole approssimazioni

$$
I_{n_0},I_{n_1},I_{n_2}
$$

la procedura di valutare in $0$ il polinomio di interpolazione $p(x)$ si chiama estrapolazione, perché $p(x)$ viene valutato in un punto, cioè $x=0$, che sta fuori dal più piccolo intervallo contenente i nodi

$$
h_0^2,h_1^2,\ldots,h_m^2
$$

infatti tutti questi nodi sono positivi, mentre $0$ sta a sinistra di essi.

Il valore

$$
p(0)
$$

è detto valore estrapolato.

>[!info]- idea intuitiva dell'estrapolazione
> Il polinomio $p(x)$ non approssima direttamente la funzione originale $f(x)$.
>
> Il polinomio $p(x)$ approssima il comportamento delle approssimazioni dei trapezi $I_n$ al variare di $h^2$.
>
> In questo contesto la variabile del polinomio $p$ è
>
> $$
> x=h^2
> $$
>
> quindi, se valutiamo in
>
> $$
> x=0
> $$
>
> stiamo immaginando
>
> $$
> h^2=0
> $$
>
> cioè
>
> $$
> h=0
> $$
>
> Ma $h=0$ significherebbe avere intervallini infinitamente piccoli, cioè un numero infinito di trapezi.
>
> In quel caso l’approssimazione dei trapezi dovrebbe tendere all’integrale vero:
>
> $$
> \lim_{h\to 0} I_n=\int_a^b f(x)\,dx
> $$
>
> quindi $p(0)$ cerca di prevedere quale sarebbe il valore dell’integrale nel caso ideale $h=0$.

quindi il procedimento è:

1. calcolo varie formule dei trapezi

$$
I_{n_0},I_{n_1},\ldots,I_{n_m}
$$

2. costruisco il polinomio di interpolazione sui dati

$$
(h_0^2,I_{n_0}),\ (h_1^2,I_{n_1}),\ldots,(h_m^2,I_{n_m})
$$

3. valuto questo polinomio in $0$

$$
p(0)
$$

4. uso $p(0)$ come approssimazione più accurata di

$$
\int_a^b f(x)\,dx
$$

dall’Esempio 2.4 alla fine realizziamo che il valore estrapolato può essere molto più conveniente rispetto ad aumentare tantissimo il numero di trapezi.

Nell’esempio il valore estrapolato $p(0)$ ha errore circa

$$
|I-p(0)|\approx 1.3\cdot 10^{-9}
$$

Per ottenere la stessa precisione usando solo la formula dei trapezi $I_n$, servirebbe prendere

$$
n=123114
$$

che è un numero molto grande.

Quindi non vale la pena calcolare direttamente $I_n$ con un $n$ così grande, perché la stessa precisione si ottiene molto più facilmente calcolando prima poche formule dei trapezi, ad esempio

$$
I_{12},I_{24},I_{30}
$$

e poi il valore estrapolato

$$
p(0)
$$

Questa è l’idea principale dell’estrapolazione: combinare più approssimazioni non troppo costose per ottenere una stima finale molto più precisa.