### Integrazione numerica

Calcolo numerico degli integrali andando ad approssimarli.

Data una funzione integrabile $f:[a,b]\to\mathbb{R}$, si vuole calcolare un’approssimazione di

$$
\int_a^b f(x)\,dx
$$

ricordiamo che l’integrale rappresenta l’area sottesa dal grafico della funzione, più precisamente l’area con segno: se la funzione è sopra l’asse $x$ l’area contribuisce positivamente, se è sotto contribuisce negativamente.

A tal fine si suddivide l’intervallo $[a,b]$ in $n\geq 1$ sottointervalli tutti della stessa ampiezza

$$
h=\frac{b-a}{n}
$$

dove $h$ si chiama passo di discretizzazione.

grafico fatto dal prof
![[Pasted image 20260713130109.png]]
con il caso $n=5$.
Definiamo i nodi
$$
x_j=a+jh,\qquad j=0,\ldots,n
$$
quindi nel caso $n=5$ abbiamo

$$
a=x_0,\qquad b=x_5
$$

Questi punti che individuo nel grafico della funzione li congiungo con dei segmenti. Nel caso $n=5$ ho $6$ nodi, cioè $x_0,\ldots,x_5$, e quindi $5$ segmenti, uno per ogni sotto intervallo.

L’idea è questa: invece di calcolare l’area sotto la funzione vera $f(x)$, approssimo $f(x)$ con una funzione più semplice, indicata con $s(x)$, che è lineare a tratti.

Il valore che si prende come approssimazione del nostro integrale

$$
\int_a^b f(x)\,dx
$$

è

$$
\int_a^b s(x)\,dx
$$

dove $s(x)$ è la funzione spezzata verde.

![[Pasted image 20260717110444.png]]

La funzione
$$
s:[a,b]\to\mathbb{R}
$$
è definita a tratti: per $x\in[x_j,x_{j+1}]$ si prende la retta che passa per i punti

$$
(x_j,f(x_j)),\qquad (x_{j+1},f(x_{j+1}))
$$

Il coefficiente angolare di questa retta è
$$
\frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}
$$
quindi, per $x\in[x_j,x_{j+1}]$, abbiamo

$$
s(x)=f(x_j)+\frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}(x-x_j)
$$

questa regola vale per ogni indice

$$
j=0,\ldots,n-1
$$

Vogliamo capire quanto vale

$$
I_n=\int_a^b s(x)\,dx
$$

Questo integrale si può scrivere come somma degli integrali sui singoli sottointervalli:

$$
I_n=\int_a^b s(x)\,dx
=
\sum_{j=0}^{n-1}\int_{x_j}^{x_{j+1}}s(x)\,dx
$$

cioè

$$
I_n=
\sum_{j=0}^{n-1}
\int_{x_j}^{x_{j+1}}
\left[
f(x_j)+\frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}(x-x_j)
\right]dx
$$

Ora risolviamo l’integrale dentro la sommatoria.

L’unica variabile è $x$, mentre $f(x_j)$, $f(x_{j+1})$, $x_j$, $x_{j+1}$ sono costanti rispetto a $x$.

La primitiva è

$$
f(x_j)(x-x_j)+
\frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}
\frac{(x-x_j)^2}{2}
$$

quindi

$$
I_n=
\sum_{j=0}^{n-1}
\left[
f(x_j)(x-x_j)+
\frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}
\frac{(x-x_j)^2}{2}
\right]_{x_j}^{x_{j+1}}
$$

Sostituendo gli estremi, quando $x=x_j$ viene tutto $0$, mentre quando $x=x_{j+1}$ otteniamo

$$
x_{j+1}-x_j=h
$$

quindi

$$
I_n=
\sum_{j=0}^{n-1}
\left[
f(x_j)h+
\frac{f(x_{j+1})-f(x_j)}{h}
\frac{h^2}{2}
\right]
$$

semplificando

$$
I_n=
\sum_{j=0}^{n-1}
\left[
f(x_j)h+
\frac{f(x_{j+1})-f(x_j)}{2}h
\right]
$$

raccogliamo $h$:

$$
I_n=
h\sum_{j=0}^{n-1}
\left[
f(x_j)+\frac{f(x_{j+1})-f(x_j)}{2}
\right]
$$

mettiamo tutto allo stesso denominatore:

$$
f(x_j)+\frac{f(x_{j+1})-f(x_j)}{2}
=
\frac{2f(x_j)+f(x_{j+1})-f(x_j)}{2}
=
\frac{f(x_j)+f(x_{j+1})}{2}
$$

quindi

$$
I_n=
\sum_{j=0}^{n-1}
\frac{f(x_j)+f(x_{j+1})}{2}h
$$

oppure

$$
I_n=
\frac{h}{2}
\sum_{j=0}^{n-1}
\left[
f(x_j)+f(x_{j+1})
\right]
$$

Adesso sviluppiamo la sommatoria:

$$
I_n=
\frac{h}{2}
\left[
f(x_0)+f(x_1)+f(x_1)+f(x_2)+f(x_2)+f(x_3)+\cdots+f(x_{n-1})+f(x_n)
\right]
$$

qui il primo termine $f(x_0)$ e l’ultimo termine $f(x_n)$ compaiono una sola volta, mentre tutti i nodi interni compaiono due volte.

Quindi

$$
I_n=
\frac{h}{2}
\left[
f(x_0)+2\sum_{j=1}^{n-1}f(x_j)+f(x_n)
\right]
$$

siccome $x_0=a$ e $x_n=b$, possiamo scrivere

$$
I_n=
\frac{h}{2}
\left[
f(a)+2\sum_{j=1}^{n-1}f(x_j)+f(b)
\right]
$$

equivalentemente

$$
I_n=
h\left[
\frac{f(a)+f(b)}{2}
+
\sum_{j=1}^{n-1}f(x_j)
\right]
$$

questa è la formula dei trapezi di ordine $n$

$$
I_n=
h\left[
\frac{f(a)+f(b)}{2}
+
\sum_{j=1}^{n-1}f(x_j)
\right]
$$

con

$$
h=\frac{b-a}{n}
$$

uguale al passo di discretizzazione della formula $I_n$.

>[!info]- spiegazione dei passaggi sugli integrali
>
> L’integrale esatto che vorremmo calcolare è
>
> $$
> \int_a^b f(x)\,dx
> $$
>
> cioè l’area con segno sotto la funzione vera $f(x)$.
>
> Se conoscessimo una primitiva $F(x)$ di $f(x)$, cioè una funzione tale che
>
> $$
> F'(x)=f(x)
> $$
>
> allora potremmo calcolare l’integrale esatto usando
>
> $$
> \int_a^b f(x)\,dx=F(b)-F(a)
> $$
>
> Il problema è che spesso $f(x)$ è complicata e non sappiamo trovare una primitiva esplicita, oppure calcolarla è scomodo.
>
> Allora sostituiamo $f(x)$ con una funzione più semplice $s(x)$, costruita a tratti.
>
> Su ogni sottointervallo $[x_j,x_{j+1}]$, la funzione $s(x)$ è una retta, quindi il suo integrale è facile da calcolare.
>
> Per questo scriviamo
>
> $$
> \int_a^b f(x)\,dx \approx \int_a^b s(x)\,dx
> $$
>
> e definiamo
>
> $$
> I_n=\int_a^b s(x)\,dx
> $$
>
> Siccome $s(x)$ è definita a tratti, spezziamo l’integrale:
>
> $$
> \int_a^b s(x)\,dx
> =
> \sum_{j=0}^{n-1}\int_{x_j}^{x_{j+1}}s(x)\,dx
> $$
>
> Su ogni intervallo $[x_j,x_{j+1}]$, la funzione $s(x)$ è la retta che passa per $(x_j,f(x_j))$ e $(x_{j+1},f(x_{j+1}))$, quindi ha formula
>
> $$
> s(x)=f(x_j)+\frac{f(x_{j+1})-f(x_j)}{x_{j+1}-x_j}(x-x_j)
> $$
>
> L’integrale di questa retta dà l’area di un trapezio con basi $f(x_j)$ e $f(x_{j+1})$ e altezza $h$:
>
> $$
> \frac{f(x_j)+f(x_{j+1})}{2}h
> $$
>
> Sommando questi contributi su tutti i sottointervalli otteniamo la formula dei trapezi.
>
> Quindi il nome “formula dei trapezi” viene dal fatto che stiamo sommando le aree dei trapezi costruiti sotto la spezzata $s(x)$.

Notare che stiamo sommando le aree di questi trapezi. In realtà potevamo anche saltare i calcoli integrali sfruttando direttamente la formula dell’area del trapezio:

$$
\text{area trapezio}=\frac{\text{base maggiore}+\text{base minore}}{2}\cdot \text{altezza}
$$

nel nostro caso, sul sottointervallo $[x_j,x_{j+1}]$, le due basi sono $f(x_j)$ e $f(x_{j+1})$, mentre l’altezza è $h$, quindi

$$
\frac{f(x_j)+f(x_{j+1})}{2}h
$$

Però fare il ragionamento con gli integrali è più generale, perché vale anche quando la funzione assume valori negativi: in quel caso non stiamo calcolando semplicemente un’area geometrica positiva, ma un’area con segno.

Se prendessimo direttamente tutta la funzione vera $f(x)$, senza sostituirla con la spezzata $s(x)$, allora avremmo l’integrale esatto:

$$
\int_a^b f(x)\,dx
$$

Graficamente sarebbe l’area sotto la curva vera $y=f(x)$.

Il problema è che spesso questa area non è facile da calcolare. Per esempio, se $f(x)$ è una funzione complicata, potremmo non riuscire a trovare una primitiva esplicita, cioè una funzione $F(x)$ tale che

$$
F'(x)=f(x)
$$

e quindi non potremmo usare facilmente

$$
\int_a^b f(x)\,dx=F(b)-F(a)
$$

Allora si sostituisce $f(x)$ con una funzione più semplice $s(x)$, costruita a tratti, e si calcola

$$
I_n=\int_a^b s(x)\,dx
$$

come approssimazione di

$$
\int_a^b f(x)\,dx
$$
