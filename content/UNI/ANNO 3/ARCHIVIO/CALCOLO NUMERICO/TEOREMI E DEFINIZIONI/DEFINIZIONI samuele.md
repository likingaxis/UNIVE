# Interpolazione polinomiale
L'**interpolazione** è il procedimento con cui si costruisce una funzione, in particolare un polinomio, che passa esattamente per un insieme di punti assegnati. Lo scopo è ottenere una funzione che permetta di rappresentare i dati noti e di stimare il valore della funzione in punti compresi tra quelli assegnati.

## Polinomio interpolazione
Siano dati $(x_0,y_0),\dots,(x_n,y_n)\in\mathbb{R}^2$ con $x_0,\dots,x_n$ distinti.
L’***unico polinomio***
$$
p\in\mathbb{R}_n[x]
$$
che soddisfa la condizione
$$
p(x_i)=y_i,\qquad i=0,\dots,n,
$$

si chiama **polinomio di interpolazione** dei dati $(x_0,y_0),\dots,(x_n,y_n)\in\mathbb{R}^2$.
(oppure viene chiamato **polinomio di interpolazione dei valori** $y_{0},\dots,y_{n}$ sui nodi $x_{0},\dots,x_{n}$)

## Polinomio forma canonica
La **forma canonica** rappresenta il polinomio come combinazione di potenze della variabile. Un polinomio di grado al più $n$ si scrive come $$ p(x)=a_0+a_1x+a_2x^2+\cdots+a_nx^n, $$ dove $a_0,\dots,a_n$ sono i coefficienti da determinare imponendo le condizioni di interpolazione.

## Polinomio Lagrange
La **forma di Lagrange** è una rappresentazione del polinomio di interpolazione che non richiede di calcolare direttamente i coefficienti della forma canonica.
Il polinomio si scrive come $$ p(x)=\sum_{i=0}^{n} y_i\,L_i(x), $$ dove i polinomi fondamentali di Lagrange sono $$ L_i(x)=\prod_{\substack{j=0 \\ j\neq i}}^{n}\frac{x-x_j}{x_i-x_j}, \qquad i=0,\dots,n. $$ Ogni polinomio $L_i(x)$ vale $$ L_i(x_j)= \begin{cases} 1, & \text{se } i=j,\\ 0, & \text{se } i\neq j. \end{cases} $$ Per questo motivo il polinomio di Lagrange soddisfa automaticamente $$ p(x_i)=y_i,\qquad i=0,\dots,n. $$

## Definizione di base
Una base di $R_{n}[x]$ è un **insieme di elementi** $v_{1}(x), v_{r}(x) \in R_{n}[x]$ tali che:
1. sono **linearmente indipendenti**
	- l'unica combinazione lineare $\alpha_{1}v_{1}(x) + \alpha_{r}v_{r}(x)$ che coincide con il polinomio nullo è la combinazione lineare con $\alpha_{1}=\dots=\alpha_{r}=0$
2. **generano** tutto lo spazio
	- ogni polinomio $q(x) \in R_{n}[x]$ si può scrivere come combinazione lineare $q(x) = \beta_{1}v_{1}(x) + \beta_{r}v_{r}(x)$ 

Ricordiamo anche che tutte le basi di $R_{n}[x]$ hanno tutte lo stesso numero di elementi che è la **dimensione di** $R_{n}[x]$

Nel caso di $\mathbb{R}_n[x]$, una base canonica è:
$$
\{1,x,x^2,\dots,x^n\}.
$$

Quindi:
$$
\dim\left(\mathbb{R}_n[x]\right)=n+1.
$$


## Differenze divise per Newton
Sia $f:[a,b]\to\mathbb{R}$.
### 2.1 Caso base
Per $y\in[a,b]$ si definisce la differenza divisa di $f(x)$ relativa a $y$:
$$
f[y]=f(y).
$$
### 2.2 Definizione ricorsiva
Siano:
$$
y_1,\dots,y_k\in[a,b]
$$
punti distinti, con $k\geq 2$.

Si definisce:
$$
f[y_1,\dots,y_k]
=
\frac{
f[y_1,\dots,y_{k-2},y_k]
-
f[y_1,\dots,y_{k-1}]
}{
y_k-y_{k-1}
}.
$$

## Metodo Ruffini-Horner
>[!tip] Una sottrazione e un addizione a livello computazionale sono simili perché fare $\alpha - \beta$ equivale a fare $\alpha + (-\beta)$. Quindi mettere un segno `-` non costa nulla.
>Discorso non applicabile alla divisione.


## Aggiunta di un nodo di interpolazione
La forma di Newton è particolarmente utile quando, ai dati di interpolazione già disponibili,
$$
(x_0,y_0),\dots,(x_n,y_n),
$$
viene aggiunto un nuovo dato $(x_{n+1},y_{n+1}),$ con: $x_{n+1}\neq x_i,\qquad i=0,\dots,n.$

L’idea è aggiornare il polinomio interpolante senza rifare tutti i calcoli da zero.

### Funzione associata ai dati e polinomi
Consideriamo una funzione $f(x)$ tale che:
$$
f(x_i)=y_i,
\qquad i=0,\dots,n+1.
$$

Il polinomio interpolante dei dati vecchi è $p\in\mathbb{R}_n[x]:$
$$
p(x)
=
f[x_0]
+
f[x_0,x_1](x-x_0)
+ \dots +
f[x_0,\dots,x_n]
\prod_{j=0}^{n-1}(x-x_j).
$$

Il polinomio interpolante dei dati nuovi è invece $q\in\mathbb{R}_{n+1}[x]:$
$$
q(x)
=
p(x)
+
f[x_0,\dots,x_n,x_{n+1}]
(x-x_0)(x-x_1)\cdots(x-x_n)
$$

> [!tip] La forma di Newton è **incrementale**: il nuovo polinomio si ottiene aggiungendo un solo termine al polinomio precedente.

### Aggiornamento della tabella delle differenze divise
Supponiamo di avere già $p(x)$ in forma di Newton.
Sono quindi già noti i coefficienti (o differenze divise):
$$
f[x_0],
\quad
f[x_0,x_1],
\quad
\dots,
\quad
f[x_0,\dots,x_n].
$$

Per ottenere la forma di Newton di $q(x)$ basta calcolare la nuova differenza divisa:
$$
f[x_0,\dots,x_n,x_{n+1}].
$$

Non serve ricalcolare tutta la tabella, ma si aggiunge soltanto una nuova riga, partendo dal nuovo valore:
$$
f[x_{n+1}]=y_{n+1}.
$$

Da questo valore si calcolano, uno dopo l’altro:
$$
f[x_0,x_{n+1}],
$$
$$
f[x_0,x_1,x_{n+1}],
$$
$$
\dots,
$$
$$
f[x_0,\dots,x_n,x_{n+1}].
$$

> [!tip] Per costruire la nuova riga bastano:
> - i coefficienti già presenti nella forma di Newton;
> - il nuovo valore $f[x_{n+1}]$.
> 
> ![[Pasted image 20260713125631.png]]
> Se noti infatti io costruisco il nuovo valore usando solo quelli cerchiati in blu e il nuovo $f[x_{3}]$


---

# Integrazione numerica
## Formula dei trapezi
Sia $f:[a,b]\to\mathbb{R}$ una funzione integrabile e si vuole calcolare un'approssimazione di $\int_a^b f(x)\,dx$ (dato che non sempre è possibile calcolare l'integrale con i metodi elementari).

A tal fine suddividiamo l'intervallo `[a,b]` in $n\geq 1$ sottointervalli della stessa ampiezza: $$
h=\frac{b-a}{n}
$$
I nodi sono $x_j=a+jh,\qquad \text{con} \ j=0,\dots,n.$

In particolare: $x_{0}=a \quad e \quad x_{n} = b$

Ogni sottointervallo ha la forma $[x_j,x_{j+1}]$ e ampiezza $x_{j+1}-x_j=h.$

> [!tip] Aumentando $n$, il passo $h$ diminuisce e la suddivisione diventa più fitta.


Il valore che si prende come approssimazione di $\int_{a}^{b}f(x)dx$ è $$\int_{a}^{b}s(x)dx \qquad \text{con }s:[a,b]\to\mathbb{R}$$
### Espressione di $s$ su un sottointervallo
Per $x\in[x_j,x_{j+1}],$ si ha:
$$
s(x)
=
f(x_j)
+
\frac{
f(x_{j+1})-f(x_j)
}{
\underbrace{x_{j+1}-x_j}_{h}
}
(x-x_j).
$$

> [!tip] Su ogni intervallo $[x_j,x_{j+1}]$, la funzione $S$ è il polinomio interpolante lineare di $f$ nei due estremi.

### Effettiva formula trapezi
Come approssimazione di $\int_a^b f(x)\,dx$ si usa:
$$
I_n
=
\int_a^b s(x)\,dx.
$$
Sviluppando l'integrale si ottiene: 
$$
\boxed{
I_n
=
h
\left[
\frac{f(a)+f(b)}{2}
+
\sum_{j=1}^{n-1}f(x_j)
\right]
}
$$


## Estrapolazione
Sia $f:[a,b]\to\mathbb{R}$ una funzione integrabile.
Consideriamo più formule dei trapezi, tutte usate per approssimare lo stesso integrale:
$$
\int_a^b f(x)\,dx.
$$

Indichiamo queste formule con $I_{n_0},I_{n_1},\dots,I_{n_m},$ dove gli ordini $n_0,n_1,\dots,n_m$ sono tutti distinti.

A ogni formula corrisponde un diverso passo di discretizzazione:
$$
h_0=\frac{b-a}{n_0},
$$
$$
h_1=\frac{b-a}{n_1},
$$
$$
\dots
$$
$$
h_m=\frac{b-a}{n_m}.
$$

Poiché gli ordini sono distinti, anche i passi $h_0,h_1,\dots,h_m$ e i loro quadrati $h_0^2,h_1^2,\dots,h_m^2$
sono distinti.

### Costruzione del polinomio interpolante
Consideriamo i dati:
$$
(h_0^2,I_{n_0}),
$$
$$
(h_1^2,I_{n_1}),
$$
$$
\dots
$$
$$
(h_m^2,I_{n_m}).
$$

Chiamiamo $p\in\mathbb{R}_m[x]$ il polinomio interpolante di questi dati.

Quindi $p$ è l’unico polinomio di grado minore o uguale a $m$ tale che:
$$
p(h_j^2)=I_{n_j},
\qquad j=0,\dots,m.
$$

> [!tip] In questo problema i nodi dell’interpolazione non sono i nodi usati dalla formula dei trapezi.  
> I nodi del nuovo polinomio sono:
> $$
> h_0^2,h_1^2,\dots,h_m^2.
> $$
> I valori interpolati sono invece:
> $$
> I_{n_0},I_{n_1},\dots,I_{n_m}.
> $$

### Il valore estrapolato $p(0)$
Un risultato, che non viene dimostrato, afferma che $p(0)$ è un’approssimazione di: $$\int_a^b f(x)\,dx$$molto più accurata delle singole formule dei trapezi $I_{n_0},I_{n_1},\dots,I_{n_m}$.

In altre parole, si combinano diverse approssimazioni (non particolarmente precise) per ottenerne una nuova molto più accurata.

![[Pasted image 20260714150346.png]]
Qui dice che $p(0)$ è molto più preciso delle singole formule dei trapezi.

> [!tip]
> Le informazioni sulla funzione $f$ e sull’intervallo $[a,b]$ sono già contenute nei valori:
> $$
> I_{n_0},\dots,I_{n_m}.
> $$
> Una volta costruito $p$, il polinomio dipende direttamente soltanto dai dati:
> $$
> (h_j^2,I_{n_j}).
> $$

### Perché si chiama estrapolazione
Il polinomio $p(x)$ è costruito usando i nodi positivi:
$$
h_0^2,h_1^2,\dots,h_m^2.
$$

Il punto `0` non è uno di questi nodi e si ***trova fuori*** dal più piccolo intervallo che li contiene.

La procedura di valutare un polinomio interpolante fuori dal più piccolo intervallo contenente i nodi si chiama **estrapolazione**.

Il valore $p(0)$ si chiama **valore estrapolato**.

> [!tip]
> Nell’interpolazione il polinomio viene generalmente valutato tra i nodi.  
> Nell’estrapolazione viene valutato fuori dall’intervallo che contiene i nodi.


---

# Analisi di matrici
## Traccia, determinante, raggio spettrale e autovalori
Data una matrice $A ∈ \mathbb{C}^{n×n}$ con autovalori $λ_{1}, λ_{2}, . . . , λ_{n}$ si ha
- **AUTOVALORE** -> è uno scalare λ associato a una trasformazione lineare o a una matrice quadrata A, per il quale esiste un vettore non nullo v (detto **autovettore**) tale che l'equazione fondamentale $Av=λv$ sia soddisfatta.
- **TRACCIA** -> $tr(A)$ = somma degli elementi diagonali = $a_{11} + a_{22} + \dots + a_{nn}$ = somma degli autovettori = $\lambda_{1} + \lambda_{2} + \dots + \lambda_{n}$
- **DETERMINANTE** -> $\det(A)$ = prodotto degli autovalori = $\lambda_{1} \cdot \lambda_{2} \cdot \dots \cdot \lambda_{n}$
- **RAGGIO SPETTRALE** -> $\rho(A)$ = massimo tra il modulo degli autovalori = $max(|\lambda_{1}|, |\lambda_{2}|, \dots, |\lambda_{n}|)$ 
## Matrice invertibile
Una matrice $A ∈ \mathbb{C}^{n×n}$ si dice invertibile se esiste una matrice $B ∈ \mathbb{C}^{n \times n}$ tale che $AB = BA = I$.  In tal caso, la matrice $B$ è univocamente determinata, prende il nome di **matrice inversa di A** e viene denotata con $A^{−1}$ . 

Ricordiamo che una matrice $A ∈ \mathbb{C}^{n×n}$ è invertibile **se e solo se det(A) != 0**, ossia **se e solo se 0 non è un autovalore di A**. 

Ricordiamo inoltre che il prodotto AB di due matrici $A, B ∈ \mathbb{C}^{n×n}$ è **invertibile** se e solo se A e B sono invertibili; l’inversa in tal caso è $(AB)^{−1} = B^{−1}A^{−1}$ come si può verificare direttamente: $$ABB^{−1}A^{−1} = B^{−1}A^{−1}AB = I$$

## Matrice diagonalizzabile
Una matrice $A ∈ \mathbb{C}^{n×n}$ si dice diagonalizzabile se esistono una matrice invertibile $X ∈ \mathbb{C}^{n×n}$ e una matrice diagonale $D = diag(λ_{1}, λ_{2}, \dots , λ_{n}) ∈ \mathbb{C}^{n×n}$ tali che $$A = XDX^{−1}$$
Dalla formula sappiamo che $\forall i = 1,\dots,n$ l'elemento diagonale $\lambda_{i}$ è un autovalore di A con corrispondente autovalore $x_{i} =$ i-esima colonna di X.
Questo lo si vede moltiplicando a destra entrambi i membri e ottenendo $$AX = XD$$e da qui si nota che la colonna i-esima di AX è $AX_{i}$ e la colonna i-esima di XD è $\lambda_{i}x_{i}$, per cui $$Ax_{i} = \lambda_{i}x_{i}$$Ricordiamo che ogni matrice $A \in \mathbb{C}^{n \times n}$ che possiede `n` autovalori *distinti* è **diagonalizzabile**.


## Matrice Hermitiana e simmetrica
Data una matrice $A \in \mathbb{C}^{m \times n}$, indichiamo con $A^{*}$ la **trasposta coniugata di `A`**.
Se `A` e `B` sono matrici moltiplicabili allora $$(AB)^{T} = B^{T}A^{T}, \qquad (AB)^{*} = B^{*}A^{*}$$
Una matrice $A \in \mathbb{C}^{n \times n}$ si dice **hermitiana** se $A^{*} = A$.
Nel caso in cui le componenti di A siano reali (ossia $A \in \mathbb{R}^{n \times n}$) si ha che $A^{T} = A^{*}$, per cui dire che `A` è hermitiana equivale a dire che `A` è **simmetrica** (ossia $A^{T} = A)$.
Gli elementi diagonali di una matrice hermitiana `A` sono uguali ai loro coniugati e dunque sono reali.
Anche gli autovalori di una matrice hermitiana sono reali, infatti se $\lambda$ è un autovalore di `A` e indichiamo con $x \neq 0$ un corrispondente autovettore, allora 
![[Pasted image 20260729120801.png]]
perché $x^{*}Ax$ è un numero reale, essendo uguale al suo complesso coniugato vale quindi
![[Pasted image 20260729120839.png]]

## Matrice definita positiva
Una matrice $A \in \mathbb{C}^{n \times n}$ si dice **definita positiva se** $$\operatorname{Re}(x^{*}Ax)>0\qquad \forall x\in\mathbb{C}^n\setminus\{0\}$$
Per analogia con i numeri complessi definiamo:
$$
\operatorname{Re}(A)=\frac{A+A^{*}}{2} \qquad e \qquad \operatorname{Im}(A)=\frac{A-A^*}{2i}.
$$

Vale:
$$
A=\operatorname{Re}(A)+i\operatorname{Im}(A).
$$

Inoltre:
$$
\operatorname{Re}(x^*Ax)=x^*\operatorname{Re}(A)x.
$$

Infatti:
$$
\operatorname{Re}(x^{*}Ax)
=
\frac{x^{*}Ax+\overline{x^{*}Ax}}{2}
=
\frac{x^{*}Ax+x^{*}A^{*}x}{2}
=
x^{*} \  \underbrace{\frac{A+A^{*}}{2}}_{\operatorname{Re}(A)} \ x.
$$

>[!tip] OSS.: Le matrici $\operatorname{Re}(A)$ e $\operatorname{Im}(A)$ sono sempre hermitiane.
>Vale anche se `A` di base non è hermitiana.

##### Dimostrazione dell'osservazione
Ricordiamo che una matrice $B$ è hermitiana se $B^{*}=B.$

Inoltre, utilizziamo le proprietà:
$$
(B+C)^*=B^*+C^*
$$
$$
(\alpha B)^*=\overline{\alpha}B^*
$$
$$
(A^*)^*=A.
$$

###### Dimostrazione per $\operatorname{Re}(A)$
Calcoliamo l’aggiunta della parte reale:
$$
\operatorname{Re}(A)^*
=
\left(\frac{A+A^*}{2}\right)^*.
$$

Poiché $\frac{1}{2}$ è un numero reale, il suo coniugato coincide con se stesso. Quindi:
$$
\operatorname{Re}(A)^*
=
\frac{(A+A^*)^*}{2}.
$$

Usando la proprietà dell’aggiunta della somma:
$$
\operatorname{Re}(A)^*
=
\frac{A^*+(A^*)^*}{2}.
$$

Poiché $(A^*)^*=A$, si ottiene:
$$
\operatorname{Re}(A)^*
=
\frac{A^*+A}{2}.
$$

Dato che la somma tra matrici è commutativa:
$$
\operatorname{Re}(A)^*
=
\frac{A+A^*}{2}
=
\operatorname{Re}(A).
$$

Quindi $\operatorname{Re}(A)$ è hermitiana.

###### Dimostrazione per $\operatorname{Im}(A)$
Calcoliamo l’aggiunta della parte immaginaria:
$$
\operatorname{Im}(A)^*
=
\left(\frac{A-A^*}{2i}\right)^*.
$$
In questo caso:
$$
\overline{\frac{1}{2i}}
=
-\frac{1}{2i}.
$$

Pertanto:
$$
\operatorname{Im}(A)^*
=
-\frac{1}{2i}(A-A^*)^*.
$$

Usando la proprietà dell’aggiunta:
$$
(A-A^*)^*
=
A^*-(A^*)^*.
$$

Poiché $(A^*)^*=A$, segue che:
$$
(A-A^*)^*
=
A^*-A.
$$

Quindi:
$$
\operatorname{Im}(A)^*
=
-\frac{1}{2i}(A^*-A).
$$

Portando il segno meno dentro la parentesi:
$$
\operatorname{Im}(A)^*
=
\frac{A-A^{*}}{2i} \ = \ \mathrm{Im}(A).
$$

Quindi anche $\operatorname{Im}(A)$ è hermitiana.

###### Conclusione
Pertanto, per ogni matrice $A \in \mathbb{C}^{n \times n}$, le matrici $\operatorname{Re}(A)$ e $\operatorname{Im}(A)$ sono sempre hermitiane.

### Condizioni per cui A è definita positiva
Dalla relazione precedente segue:
![[Pasted image 20260715120002.png]]

>[!tip] Il terzo passaggio vale perché $\operatorname{Re}(A)$ è hermitiana e dunque $x^*\operatorname{Re}(A)x$ è reale.


### Matrice definita positiva e invertibilità
> [!lemma] Proprietà
> Se $A\in\mathbb{C}^{n \times n}$ è definita positiva, allora tutti i suoi autovalori hanno parte reale positiva.
> E di conseguenza $A$ è invertibile perché `0` non è un autovalore di `A`.
###### Dimostrazione
Sia $A\in\mathbb{C}^{n \times n}$ e sia $\lambda$ un autovalore generico di `A` 
Allora, preso un autovettore $x\in\mathbb{C}\setminus\{0\}$ di `A` associato a $\lambda$:
$$
Ax=\lambda x.
$$

Come prima:
$$
\lambda=\frac{x^*Ax}{x^*x}.
$$

Passando alle parti reali:
$$
\operatorname{Re}(\lambda)
=
\frac{\operatorname{Re}(x^*Ax)}{x^*x}.
$$

Il numeratore è positivo per definizione e il denominatore è positivo. Quindi:
$$
\boxed{
\operatorname{Re}(\lambda)>0
}
$$

Di conseguenza zero non è un autovalore e dunque:
$$
\boxed{
A\text{ definita positiva}\implies A\text{ invertibile}
}
$$


## Polinomi di matrici
Sia $p(\lambda)$ un polinomio:
$$
p(\lambda)
=
a_0+a_1\lambda+\dots+a_m\lambda^m.
$$

Per $A\in\mathbb{C}^{n\times n}$ si definisce il polinomio:
$$
\boxed{
p(A)
=
a_{0}I+a_{1}A+a_{2}A^{2},\dots+a_mA^m
} \qquad \in \mathbb{C}^{n \times n}
$$

Il termine costante diventa $a_0I$ perché:
$$
A^0=I.
$$

## Grafi orientati
Un grafo è un diagramma formato da un certo numero di nodi e da un certo numero di archi.
Un **grafo orientato** è formato da nodi e archi orientati.
- letteralmente è una freccia che va da un nodo a un altro
Se il grafo ha $n$ nodi, li indichiamo con:
$$
1,2,\dots,n.
$$

L’arco che va dal nodo $i$ al nodo $j$ si indica con:
$$
i\to j.
$$

Un self-loop si definisce **cappio**:
$$
i\to i.
$$

## Cammini e cicli
Un **cammino** è un percorso che parte da un nodo $i$ e arriva a un nodo $j$ seguendo gli archi del grafo.
Se il nodo di arrivo coincide con quello di partenza, il cammino si chiama **ciclo**.

## Grafi fortemente connessi

> [!lemma] Definizione
> Un grafo orientato si dice **fortemente connesso** se vale una delle seguenti condizioni equivalenti:
>
> 1. per ogni coppia di nodi $i,j$ esiste un cammino che va da $i$ a $j$;
> 2. esiste un ciclo che tocca tutti i nodi.

### 3.1 Equivalenza tra le due condizioni
Se per ogni coppia di nodi esiste un cammino, possiamo concatenare un cammino da $1$ a $2$, da $2$ a $3$, e così via, fino a tornare da $n$ a $1$. Otteniamo così un ciclo che tocca tutti i nodi.

Viceversa, se esiste un ciclo che tocca tutti i nodi, fissati due nodi qualsiasi $i$ e $j$, basta partire da $i$ e seguire il ciclo fino a raggiungere $j$.


## 4. Grafo associato a una matrice
**DEFINIZIONE**: Sia $A\in\mathbb{C}^{n\times n}.$
Il **grafo associato ad $A$** ha:
- nodi: $1,\dots,n;$
- un arco: $i\to j$  se e solo se:$$
  a_{ij}\neq0.
  $$
> [!tip] La riga $i$ descrive tutti gli archi che escono dal nodo $i$.

## 5. Matrici irriducibili

> [!lemma] Definizione
> Una matrice: $A\in\mathbb{C}^{n\times n}$ si dice **irriducibile** se il grafo associato ad $A$ è fortemente connesso.
Se il grafo associato non è fortemente connesso, la matrice si dice **riducibile**.


## Localizzazione autovalori - cerchi nel piano complesso
Indichiamo con:
$$
C(z_0,r)
=
\{z\in\mathbb{C}:|z-z_0|\leq r\}.
$$
il cerchio di centro $z_0\in\mathbb{C}$ e raggio $r\geq0$.
- Il numero $|z-z_0|$ rappresenta la distanza tra $z$ e $z_0$.

### Cerchi di Gershgorin per riga
Data $A \in C^{n\times n}$, i cerchi di **Gershgorin** di `A` sono i cerchi $K_{1},\dots,K_{n}$ definiti nel modo seguente:
$$
\forall \text{ riga } i=1,\dots n \qquad K_i
=
C\left(
a_{ii},
\sum_{\substack{j=1\\j\neq i}}^n|a_{ij}|
\right).
$$
Quindi:
- il centro è $a_{ii}$;
- il raggio è:$$
  r_i=
  \sum_{\substack{j=1\\j\neq i}}^n|a_{ij}|.
  $$
I cerchi $K_1,\dots,K_n$ si chiamano anche **cerchi di Gershgorin per riga**.


### 7.2 Cerchi di Gershgorin per colonna
Per ogni colonna $j$ definiamo:
$$
H_j
=
C\left(
a_{jj},
\sum_{\substack{i=1\\i\neq j}}^n|a_{ij}|
\right).
$$
Il centro è sempre l’elemento diagonale, mentre il raggio è la somma dei moduli degli altri elementi della colonna.



## Autovalori di $A$ e di $A^T$

> [!lemma] Proprietà
> Gli autovalori di una matrice $A\in\mathbb{C}^{n\times n}$ coincidono con quelli della sua trasposta $A^T.$
### Dimostrazione
Il polinomio caratteristico di $A^T$ è:
$$
c_{A^T}(\lambda)
=
\det(\lambda I-A^T).
$$

Poiché:
$$
\lambda I-A^T
=
(\lambda I-A)^T,
$$
- trasporre la matrice identità restituisce la matrice identità stessa (ha tutti 0 fuori dalla diagonale)

si ha:
$$
c_{A^T}(\lambda)
=
\det\left((\lambda I-A)^T\right).
$$

Il determinante di una matrice coincide con quello della sua trasposta:
$$
\det(M^T)=\det(M).
$$

Quindi:
$$
c_{A^T}(\lambda)
=
\det(\lambda I-A)
=
c_A(\lambda).
$$

Pertanto $A$ e $A^T$ hanno lo stesso polinomio caratteristico e quindi gli stessi autovalori.

### Miglioramento della localizzazione di autovalori con righe e colonne
Poiché $A$ e $A^T$ hanno gli stessi autovalori, possiamo applicare i teoremi di Gershgorin sia ad $A$ sia ad $A^T$.

In particolare, il *primo teo di G.* applicato ad $A$ e $A^{T}$ ci dice quanto segue
- Gli autovalori di una matrice $A \in \mathbb{C}^{n \times n}$ stanno tutti
	- SIA nell'unione dei *cerchi per riga* **di A**$$K_1,\dots,K_{n}\quad \text{di A}$$
	- SIA nell'unione dei *cerchi per colonna* **di $A^{T}$** $$H_1,\dots,H_{n}\quad \text{di } A^{T}$$
	Per cui stanno nell'**INTERSEZIONE DELLE DUE UNIONI**

Dal primo teorema:
$$
\sigma(A)
\subseteq
\bigcup_{i=1}^{n}K_{i}\qquad e \qquad \sigma(A)
\subseteq
\bigcup_{j=1}^nH_j.
$$

Quindi:
$$
\boxed{
\sigma(A)
\subseteq
\left(\bigcup_{i=1}^nK_i\right)
\cap
\left(\bigcup_{j=1}^nH_j\right)
}
$$

> [!tip] L’intersezione tra le due unioni fornisce una localizzazione più precisa rispetto all’uso dei soli cerchi per riga o dei soli cerchi per colonna.

### Irriducibilità della trasposta
Per applicare il terzo teorema anche ad $A^T$ è necessario sapere che $A^T$ è irriducibile.

> [!lemma] Proprietà
> Vale
> $$
> A\text{ irriducibile}
> \iff
> A^T\text{ irriducibile}.
> $$

### Idea della dimostrazione
Nel grafo associato ad $A^T$, ogni arco del grafo di $A$ viene invertito.

Infatti:
$$
(A^T)_{ij}=a_{ji}.
$$

Quindi:
$$
i\to j\text{ nel grafo di }A^T
$$

se e solo se:
$$
j\to i\text{ nel grafo di }A.
$$

Se nel grafo di $A$ esiste un cammino da $i$ a $j$, invertendo tutti gli archi otteniamo nel grafo di $A^T$ un cammino da $j$ a $i$.

La forte connessione si conserva quindi passando alla trasposta.



## Matrici a diagonale dominante

> [!lemma] Definizione
> La matrice $A \in \mathbb{C}^{n \times n}$ si dice **a diagonale dominante (per righe)** se valgono entrambe le condizioni seguenti:
>
> 1. per ogni $i=1,\dots,n$:
>    $$
>    |a_{ii}|
>    \geq
>    \sum_{\substack{j=1\\j\neq i}}^n|a_{ij}|;
>    $$
> 2. esiste almeno un indice $k\in\{1,\dots,n\}$ tale che:
>    $$
>    |a_{kk}|
>    >
>    \sum_{\substack{j=1\\j\neq k}}^n|a_{kj}|.
>    $$

### Interpretazione tramite i cerchi di Gershgorin
#### Prima condizione
Il cerchio di Gershgorin per riga è:
$$
K_i
=
C\left(
a_{ii},
\sum_{\substack{j=1\\j\neq i}}^n|a_{ij}|
\right).
$$

La quantità $|a_{ii}|$ è la distanza del centro $a_{ii}$ dall’origine.
Il raggio è:
$$
r_i
=
\sum_{\substack{j=1\\j\neq i}}^n|a_{ij}|.
$$

Quindi la condizione:$$
|a_{ii}|\geq r_i
$$si legge "la distanza del centro $a_{ii}$ dall'origine è maggiore (o uguale) del suo raggio".

In altre parole significa che **lo zero non può stare all’interno del cerchio** $K_i$.
- Può eventualmente stare sul bordo, nel caso di uguaglianza.
E QUESTO DEVE VALERE PER OGNI CERCHIO.

#### Seconda condizione
La seconda condizione garantisce invece che **esista almeno un cerchio che non contiene affatto lo zero**, neppure sul bordo.

## Diagonale dominante in *senso stretto* per righe

> [!lemma] Definizione
> La matrice $A$ si dice **a diagonale dominante in senso stretto per righe** se:
>
> $$
> |a_{ii}|
> >
> \sum_{\substack{j=1\\j\neq i}}^n|a_{ij}|
> $$
>
> per ogni $> i=1,\dots,n.$

In termini di Gershgorin, nessun cerchio per riga contiene lo zero (neppure sul bordo).

## Diagonale dominante per colonne

> [!lemma] Definizione
> La matrice $A$ si dice **a diagonale dominante per colonne** se:
>
> 1. per ogni $j=1,\dots,n$:
>    $$
>    |a_{jj}|
>    \geq
>    \sum_{\substack{i=1\\i\neq j}}^n|a_{ij}|;
>    $$
> 2. esiste almeno un indice $k$ tale che:
>    $$
>    |a_{kk}|
>    >
>    \sum_{\substack{i=1\\i\neq k}}^n|a_{ik}|.
>    $$

Qui il confronto viene effettuato lungo le colonne.
L’interpretazione geometrica è la stessa, ma si usano i cerchi di Gershgorin per colonna.


## Diagonale dominante in *senso stretto* per colonne

> [!lemma] Definizione
> La matrice $A$ si dice **a diagonale dominante in senso stretto per colonne** se:
>
> $$
> |a_{jj}|
> >
> \sum_{\substack{i=1\\i\neq j}}^n|a_{ij}|
> $$
>
> per ogni:
>
> $$
> j=1,\dots,n.
> $$



---

# Norme vettoriali 
## Introduzione
Consideriamo il sistema $Ax=b$:
$$
\begin{pmatrix}
8 & 1 & 1  \\
1 & 5 & -1 \\
1 & -1 & 5 
\end{pmatrix}
\begin{pmatrix}
x_{1}\\
x_{2}\\
x_{3}
\end{pmatrix}
=
\begin{pmatrix}
26\\
7\\
7
\end{pmatrix}
$$
La cui soluzione è
$$
x=
\begin{pmatrix}
3\\
1\\
1
\end{pmatrix}.
$$


Supponiamo di avere due approssimazioni:
$$
y=
\begin{pmatrix}
2.99972\\
1.00023\\
1.00030
\end{pmatrix},
$$

$$
z=
\begin{pmatrix}
3.00027\\
0.99971\\
0.99955
\end{pmatrix}.
$$

Per stabilire quale delle due sia migliore, occorre misurare la distanza da $x$.

Serve quindi un concetto di distanza nello spazio dei vettori.


## Definizione di norma vettoriale

> [!lemma] Definizione
> Una funzione:
>
> $$
> \|\cdot\|:\mathbb{C}^n\to\mathbb{R}
> $$
>
> si dice **norma vettoriale** se soddisfa le seguenti proprietà.
> 
> ### 1 Positività
> $$||x|| \geq 0 \quad \forall x \in \mathbb{C}^{n} \qquad e \qquad ||x|| = 0 \iff x =0$$
> 
> ### 2 Omogeneità
> $$\|\alpha x\|
> =
> |\alpha|\|x\| \qquad \forall a \in C \quad e \quad \forall x \in \mathbb{C}^{n}$$
> 
> ### 3 Disuguaglianza triangolare
> $$\|x+y\|
> \leq
> \|x\|+\|y\| \quad \forall x,y \in C^{n}$$
> 


> [!tip] La norma è una generalizzazione del modulo di un numero complesso.
> Il modulo è una norma in $C^{1}$

## Distanza indotta da una norma
Fissata una norma, la distanza tra due vettori $x$ e $y$ si definisce come:
$$
\boxed{
d(x,y)=\|x-y\|
}
$$

Quindi:
1. si calcola la differenza $x-y$;
2. si calcola la norma del vettore ottenuto.

## Le norme $1$, $2$ e $\infty$
Sia:
$$
x=
\begin{pmatrix}
x_1\\
\vdots\\
x_n
\end{pmatrix}
\in\mathbb{C}^n.
$$

### Norma $1$
$$
\boxed{
\|x\|_1
=
\sum_{i=1}^n|x_i|
}
$$
È la somma dei moduli delle componenti.

### Norma $2$

$$
\boxed{
\|x\|_2
=
\sqrt{
\sum_{i=1}^n|x_i|^2
}
}
$$
È la generalizzazione della distanza euclidea.

### Norma infinito

$$
\boxed{
\|x\|_\infty
=
\max_{1\leq i\leq n}|x_i|
}
$$
È il massimo dei moduli delle componenti.


## Norme pesate
In alcune applicazioni una componente può essere più importante delle altre.

Per esempio, si può considerare una norma del tipo:
$$
\|x\|
=
\max
\left\{
100|x_1|,
|x_2|,
|x_3|
\right\}.
$$
In questo caso la prima componente riceve un peso maggiore.

La scelta della norma dipende quindi dal significato concreto delle componenti e dal tipo di errore che si vuole controllare.

> [!tip] Usando norme diverse si possono ottenere confronti diversi, perché ogni norma misura la distanza secondo un criterio differente.



## Successioni di vettori
Consideriamo una successione:
$$
x^{(0)},x^{(1)},x^{(2)},\dots \qquad \text{in } C^{n}
$$

> [!lemma] Definizione
> La successione $x^{(k)}$ si dice convergente a $x$ rispetto alla norma $\|\cdot\|$ se:
> $$
> \boxed{
> \|x^{(k)}-x\|\to0
> }
> $$
>
> per $k\to\infty.$

In simboli:
$$
x^{(k)}\to x
\quad\text{nella norma }\|\cdot\|.
$$


### La convergenza non dipende dalla norma

>[!tip] Poiché tutte le norme sono equivalenti per il teorema precedente, se una successione di vettori converge a `x` rispetto a una norma $|| \cdot ||$, allora converge a `x` rispetto a tutte le norme.

#### Dimostrazione
Supponiamo che $x^{(k)}\to x$ rispetto a una norma $\|\cdot\|$.

Sia $\|\cdot\|'$ un’altra norma.

Per l’equivalenza delle norme, esiste $\beta>0$ tale che:
$$
\|y\|'
\leq
\beta\|y\|
\qquad 
\text{per ogni vettore } y
$$

Ponendo:
$$
y=x^{(k)}-x,
$$

si ottiene:
$$
\alpha||x^{(k)}-x||
\ \leq \ 
\|x^{(k)}-x\|'
\ \leq \
\beta\|x^{(k)}-x\|.
$$

Poiché:
$$
\|x^{(k)}-x\|\to0,
$$

per il teorema dei due carabinieri:
$$
\|x^{(k)}-x\|'
\to0.
$$

Quindi:
$$
\boxed{
x^{(k)}\to x
\text{ rispetto a una norma}
\implies
x^{(k)}\to x
\text{ rispetto a tutte le norme}
}
$$


### Convergenza componente per componente
Scriviamo:
$$
x^{(k)}
=
\begin{pmatrix}
x_1^{(k)}\\
\vdots\\
x_n^{(k)}
\end{pmatrix}
\qquad
e
\qquad
x=
\begin{pmatrix}
x_1\\
\vdots\\
x_n
\end{pmatrix}.
$$

> [!lemma] Definizione
> La successione $x^{(k)}$ converge a $x$ **componente per componente** se:
>
> $$
> x_{i}^{(k)}\to x_{i}
> \qquad
> \forall i =1,\dots,n.
> $$

Equivalentemente possiamo dire che per ogni componente vale che:
$$
|x_i^{(k)}-x_i|
\to0
$$

#### Equivalenza con la convergenza in norma infinito
La convergenza componente per componente equivale anche a:
$$
\max_{1\leq i\leq n}
|x_i^{(k)}-x_i|
\to0.
$$

Ma quella che abbiamo scritto è la norma infinito:
$$
\max_{1\leq i\leq n}
|x_i^{(k)}-x_i|
=
\|x^{(k)}-x\|_\infty.
$$
- Quindi la convergenza componente per componente coincide con la convergenza rispetto alla norma infinito.

Quindi:
$$
\boxed{
x^{(k)}\to x
\text{ componente per componente}
\iff
\|x^{(k)}-x\|_\infty\to0
}
$$

Poiché tutte le norme sono equivalenti:
$$
\boxed{
x^{(k)}\to x
\text{ componente per componente}
\iff
x^{(k)}\to x
\text{ in una qualunque norma}
}
$$

>[!tip] Stesse cose dette sopra ma scritte come il prof
>![[Pasted image 20260717113849.png]]


# Norme matriciali
Dopo le norme vettoriali, introduciamo le **norme matriciali**, definite sullo spazio:
$$
\mathbb{C}^{n\times n}.
$$

Lo scopo è introdurre un concetto di distanza per misurare "vicinanza" tra due matrici $A$ e $B \in \mathbb{C}^{n\times n}$.

## Definizione di norma matriciale

> [!lemma] Definizione
> Una funzione:
> $$
> \|\cdot\|:\mathbb{C}^{n\times n}\to\mathbb{R}
> $$
>
> si dice **norma matriciale** se soddisfa le proprietà seguenti.
> 
> ### 2.1 Positività
> 
> $$
> \|A\|\geq0 \qquad e \qquad \|A\|=0 \iff A=O.
> $$
> è una `o` non uno 0
> 
> ### 2.2 Omogeneità
> 
> Per ogni $\alpha\in\mathbb{C}$ e $\forall A \in \mathbb{C}^{n \times n}$:
> 
> $$
> \|\alpha A\|
> =
> |\alpha|\|A\|.
> $$
> 
> ### 2.3 Disuguaglianza triangolare
> 
> $$
> \|A+B\|
> \leq
> \|A\|+\|B\|
> \qquad
> \forall A,B \in \mathbb{C}^{n \times n}
> $$
> 

## Distanza tra matrici
Fissata una norma matriciale $\|\cdot\|:\mathbb{C}^{n\times n}\to\mathbb{R}$, definiamo la distanza tra due matrici $A,B \in \mathbb{C}^{n \times n}$ come:
$$
\boxed{
d(A,B)=\|A-B\|
}
$$


## Una norma ottenuta vedendo la matrice come vettore
Una matrice può essere interpretata come un vettore di $n^2$ componenti, quindi possiamo usare come $||A||$ una delle norme $||\cdot||$ già usate per i vettori.

L’analoga della norma infinito vettoriale è:
$$
|A|_\infty
=
\max_{i,j = 1, \dots, n}|a_{ij}|.
$$

Usiamo volutamente una sola stanghetta perché non si comporta bene questa norma rispetto al prodotto di matrici, nel senso che non è submoltiplicativa.

## Submoltiplicatività

> [!lemma] Definizione
> Una norma matriciale si dice **submoltiplicativa** se, date due matrici $A,B \in \mathbb{C}^{n \times n}$:
>
> $$
> \|AB\|
> \leq
> \|A\|\|B\|
> $$
per ogni coppia di matrici compatibili.


## Norme matriciali indotte
Sia $\|\cdot\|$ una norma vettoriale su $\mathbb{C}^n$.
Per ogni $A\in\mathbb{C}^{n\times n}$ definiamo:
$$
\boxed{
\|A\|
=
\max_{x\neq0}
\frac{\|Ax\|}{\|x\|}
}
$$
- `x` è un vettore $\in \mathbb{C}^{n}$

Questa è la **norma matriciale indotta** dalla norma vettoriale considerata.
- La norma indotta si indica con lo stesso simbolo della norma vettoriale.

### Formula equivalente
Dato che $\frac{1}{||x||}$ è uno scalare posso usare l'***omogeneità*** e scrivere 
$$
\|A\|
=
\max_{x\neq0}
\frac{1}{||x||}
\cdot
||Ax||
$$
Non serve mettere il modulo perché già è positivo.
Ora posso scrivere
$$
\boxed{
\|A\|
=
\max_{x\neq0}
\left\|
\frac{1}{||x||}
\cdot
Ax
\right\|
}
$$

Sapendo che $\boxed{A(\alpha \cdot x) = \alpha \cdot Ax}$ posso scrivere
$$
\boxed{
\|A\|
=
\max_{x\neq0}
\left\|
A 
\cdot
\frac{x}{||x||}
\right\|
}
$$

Ponendo:
$$
y=\frac{x}{\|x\|},
$$

si ha $$
\|y\|
\ = \ 
\left\|
\frac{x}{||x||}
\right\|
\ = \
\frac{1}{\|x\|} \cdot \|x\|
\ = \
1
$$ e quindi:
$$
\boxed{
\|A\|
=
\max_{\|y\|=1}\|Ay\|
}
$$
dove chiaramente $y \in \mathbb{C}^{n \times n}$

![[Pasted image 20260722103051.png]]

> [!tip] La norma indotta misura il massimo fattore di amplificazione prodotto dalla matrice sui vettori.


## Norme indotte principali
Le norme matriciali indotte più importanti sono:
$$
\|\cdot\|_1,
\qquad
\|\cdot\|_2,
\qquad
\|\cdot\|_\infty.
$$
Dove
![[Pasted image 20260722111155.png]]


## Successioni di matrici

### Convergenza rispetto a una norma
Una successione:
$$
A^{(0)},A^{(1)},A^{(2)},\dots \qquad \in \mathbb{C}^{n \times n}
$$

converge ad $A$ rispetto alla norma $\|\cdot\|$ se:
$$
\boxed{
\|A^{(k)}-A\|\to0
}
$$

Poiché tutte le norme matriciali sono equivalenti, la convergenza rispetto a una norma implica la convergenza rispetto a tutte.

>[!danger] LA DIMOSTRAZIONE È UN ESERCIZIO PER CASA


## Convergenza componente per componente
La successione $A^{(k)}$ converge componente per componente ad $A \in \mathbb{C}^{n\times n}$ se:
$$
a_{ij}^{(k)}
\to
a_{ij}
\qquad
\forall i,j = 1,\dots,n
$$


Equivalentemente:
$$
\iff |a_{ij}^{(k)}-a_{ij}| \to0 \qquad \forall i,j=1,...,n
$$
$$
\iff \max_{i,j}
|a_{ij}^{(k)}-a_{ij}|
\to0
$$
$$
\iff |A^{(k)} - A|_{\infty} \to 0
$$

Questa è la convergenza rispetto alla norma:
$$
|A|_\infty
=
\max_{i,j}|a_{ij}|.
$$

Quindi:
$$
\boxed{
A^{(k)}\to A
\text{ componente per componente}
\iff
|A^{(k)}-A|_\infty\to0
}
$$

Per l’equivalenza delle norme:
$$
\boxed{
A^{(k)}\to A
\text{ componente per componente}
\iff
A^{(k)}\to A
\text{ in una qualsiasi norma matriciale}
}
$$


---

# Metodi iterativi per la risoluzione di sistemi lineari
Consideriamo il sistema lineare `(s)` $Ax=b,$ con:
$$
A\in\mathbb{C}^{n\times n},
\qquad
b\in\mathbb{C}^n,
$$
e supponiamo che $A$ sia invertibile.

Allora il sistema ha un’unica soluzione:
$$
x=A^{-1}b.
$$

Un metodo diretto, come Gauss, produce la **soluzione esatta** in un numero finito di passi.

Un **metodo iterativo** costruisce invece una **successione di vettori** che parte da un vettore iniziale $x^{(0)}$:
$$
x^{(0)},x^{(1)},x^{(2)},\dots
$$
Vogliamo che
- tale successione sia facile da costruire
- e converga a `x` (componente per componente) rispetto a una qualsiasi norma
	- qualunque sia $x^{(0)}$ scelto


## Metodi iterativi stazionari (gli unici che consideriamo)
Consideriamo metodi della forma:
$$
(m) \qquad
\begin{cases}
	x^{(0)} \in \mathbb{C}^{n} \qquad \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \text{dato a priori} \\
	x^{(k+1)}=Px^{(k)}+q \qquad k = 0,1,2,\dots
\end{cases}
$$

dove:
$$
P\in\mathbb{C}^{n\times n} \qquad \text{è la matrice di iterazione}
$$
e:
$$
q\in\mathbb{C}^{n} \qquad \text{è un vettore fissato}
$$

> [!tip] Il metodo è detto stazionario perché $P$ e $q$ non dipendono da $k$.


## Equazione del metodo
Sia $\{x^{(k)}\}_{k=0,1,2,\dots}$ una successione generata dal metodo *(m)*, e supponiamo che:$$
x^{(k)}\to x^{(\infty)} \qquad \text{per } k \to \infty
$$con $x^{\infty} \in \mathbb{C}^{n}$.
Allora $$x^{(\infty)} = \lim_{ k \to \infty } x^{(k+1)} = \lim_{ k \to \infty } Px^{(k)} + q$$
si ottiene:
$$
\boxed{
x^{\infty} = Px^{(\infty)}+q
}
$$
![[Pasted image 20260722125345.png]]

Questo vuol dire quindi che ogni possibile limite deve quindi soddisfare l’equazione:
$$
x=Px+q.
$$
>[!tip] Se la soluzione `x` di *(s)* non soddisfa l'equazione del metodo $x = Px +q$ allora non c'è speranza che una successione generata dal metodo *(m)* converga a `x`.
>Perché se avessi una successione generata da *(m)* che converge a `x` allora il ragionamento precedente mostra che `x` deve soddisfare l'equazione $x = Px + q$


## Consistenza dei metodi iterativi

> [!lemma] Definizione
> Il metodo *(m)* si dice **consistente** con il sistema $Ax=b$ se la soluzione esatta $x$ soddisfa: $$\boxed{x=Px+q}$$

Se la soluzione non soddisfa l’equazione del metodo, nessuna successione generata dal metodo può convergere a essa.

## Convergenza

> [!lemma] Definizione
> Il metodo si dice **convergente** se, per ogni scelta del vettore iniziale $x^{(0)}$, la successione generata converge alla soluzione esatta:
>
> $$
> x^{(k)}\to x.
> $$
  
## Condizione sufficiente tramite norma indotta

> [!lemma] Corollario
> Supponiamo che il metodo *(m)* sia consistente. Se esiste una norma matriciale indotta $\| \cdot \|$ tale che: $$\boxed{\|P\|<1}$$
> allora il metodo *(m)* è convergente.

###### Dimostrazione
Siccome: $$\rho(P) \underbrace{\leq}_{\text{teorema visto}} \|P\|\underbrace{<}_{\text{   ipotesi }} 1,$$deduciamo che il metodo *(m)* è convergente per il teorema precedente

> [!warning] La norma deve essere indotta.


## Condizioni necessarie
Per la convergenza del metodo *(m)* è necessario che:
$$
\boxed{
|\operatorname{traccia}(P)|<n \qquad e \qquad 
|\det(P)|<1
}
$$
>[!tip] La traccia è la somma degli autovalori di una matrice.

#### Dimostrazione
##### 10.1 Traccia
Supponiamo che 
$$
|\operatorname{traccia}(P)|\geq n,
$$
allora vuol dire che ***almeno un autovalore*** ha modulo maggiore o uguale a $1$

Infatti, se tutti gli autovalori avessero modulo minore di $1$, allora:
$$
|\operatorname{tr}(P)|
=
|\lambda_{1} + \lambda_{2} + \dots + \lambda_{n}|
\underbrace{\leq}_{\text{disuguaglianza } \triangle}
|\lambda_1|+\dots+|\lambda_n|
<n.
$$

Dunque, esistendo un autovalore di `P` di modulo $\geq 1$, si ha:
$$
\rho(P)\geq1.
$$
Allora il metodo *(m)* NON è convergente per il teorema precedente


##### 10.2 Determinante
Supponiamo che 
$$
|\operatorname{\det}(P)|\geq n,
$$
allora vuol dire che ***almeno un autovalore*** ha modulo maggiore o uguale a $1$

Infatti, se tutti gli autovalori avessero modulo minore di $1$, allora:
$$
|\det(P)|
=
|\lambda_{1} * \lambda_{2} * \dots * \lambda_{n}|
\underbrace{\leq}_{\text{disuguaglianza } \triangle}
|\lambda_{1}| * |\lambda_{2}| * \dots * |\lambda_{n}|
<n.
$$

Dunque, esistendo un autovalore di `P` di modulo $\geq 1$, si ha:
$$
\rho(P)\geq1.
$$
Allora il metodo *(m)* NON è convergente per il teorema precedente


## Osservazione 4.2
![[Pasted image 20260730113142.png]]
L’osservazione si dimostra usando la formula dell’errore:
$$  
e^{(k)}=P^k e^{(0)},  
$$

dove $$e^{(0)}=x^{(0)}-x.$$
Se il metodo non è convergente, dal teorema della condizione necessaria e sufficiente segue che
$$  
\rho(P)\geq 1.  
$$

Quindi (P) possiede almeno un autovalore ($\lambda$) tale che
$$  
|\lambda|\geq 1.  
$$

Sia ($v\neq 0$) un autovettore associato a ($\lambda$):
$$  
Pv=\lambda v.  
$$

Scegliamo il vettore iniziale $x^{(0)}=x+v.$
L’errore iniziale è allora
$$  
e^{(0)}=x^{(0)}-x=v.  
$$
Pertanto: $$e^{(k)} = P^ke^{(0)}= P^kv.$$
Poiché (v) è un autovettore otteniamo:
$$  
P^kv=\lambda^k v.  
$$
Quindi
$$  
e^{(k)}=\lambda^k v.  
$$

Ora:
- se ($|\lambda|>1$), l’errore cresce;
- se ($|\lambda|=1$), l’errore non tende a zero.
In entrambi i casi:
$$  
e^{(k)}\not\to 0.  
$$
Di conseguenza:
$$  
x^{(k)}\not\to x.  
$$


## Velocità di convergenza
Consideriamo il metodo *(m)* per risolvere il sistema *(s)* e supponiamo che sia convergente (cioè $x = Px +q$ e $\rho(P) < 1$).

Usando l'equazione dell'errore: $e^{(k)}=P^{k}e^{(0)}\qquad \forall k = 0,1,2,\dots$ si può dimostrare questo fatto.

Fissiamo una qualsiasi norma vettoriale $\| \cdot \|$. Per quasi tutti i vettori $x^{(0)} \in \mathbb{C}^{n}$, l'errore $e^{(k)} = x^{(k)} -x$ commesso dal metodo *(m)* al passo `k` soddisfa:
$$
\boxed{
\left\|e^{(k)}\right\|
\approx
C\,k^{m}\,\rho(P)^{k},
}
$$
($\forall k$ abbastanza grande (nella pratica anche per k piccolo))
dove:
- $C$ è indipendente da $k$;
- $m\in\{0,\dots,n-1\}$ dipende da $P$;
- se $P$ è diagonalizzabile, allora $m=0$.

Il termine dominante è $\rho(P)^k$.

Quindi la convergenza delle successioni $x^{(0)}, x^{(1)}, x^{(2)},\dots$ prodotte dal metodo *(m)* è tanto più veloce quanto più piccolo è $\rho(P)$.

## Confronto tra due metodi

> [!lemma] Definizione
> Consideriamo due metodi convergenti $\alpha$ e $\beta$ della forma *(m)* per risolvere lo stesso sistema.
> Se:
> $$
> \rho(P_\alpha)<\rho(P_\beta),
> $$
> allora $\alpha$ converge più velocemente di $\beta$.
> Dove $P_{\alpha}$ e $P_{\beta}$ sono le matrici d'intersezione associate ad $\alpha$ e $\beta$.


## Criterio di arresto del residuo
Consideriamo il metodo *(m)* per risolvere il sistema *(s)*.

Anche se il metodo che genera la successione $x^{(0)}, x^{(1)}, x^{(2)},\dots$ converge, non possiamo eseguire infinite iterazioni.
Abbiamo bisogno quindi di un criterio che permetta di arrestare tale metodo.

Il criterio di arresto più usato è il **criterio di arresto del residuo**.
### Definizione di residuo
Al passo $K$:
$$
\boxed{
r^{(K)}=b-Ax^{(K)}.
}
$$

### Criterio del residuo relativo
Si fissa una norma vettoriale a nostra scelta $\| \cdot \|$ e una soglia $\varepsilon>0$.

La successione si arresta al primo vettore $x^{K}$ che soddisfa la condizione:
$$
(R) \quad\boxed{
\frac{\left\|r^{(K)}\right\|}{\left\|b\right\|}
\leq
\varepsilon.
}
$$

La *(R)* impone che l'errore relativo commesso approssimando $b$ con $Ax^{K}$ sia $\le \varepsilon$
$$
\frac{\left\|b-Ax^{(K)}\right\|}{\left\|b\right\|}
\leq
\varepsilon.
$$



###### Perché si usa l’errore relativo e non assoluto?
L’errore assoluto non tiene conto della grandezza del dato.
Per esempio:
$$
a=10000,
\qquad
\widetilde a=9999.
$$
![[Pasted image 20260723113837.png]]
La prima è l'errore relativo e il secondo è l'errore assoluto.

### Numero di condizionamento
Sia $A\in\mathbb{C}^{n\times n}$ una matrice invertibile.

Il numero di condizionamento di $A$, rispetto a una norma matriciale, è definito come
$$  
\mu(A)=|A|,|A^{-1}|.  
$$

Il numero di condizionamento misura quanto la soluzione del sistema $Ax=b$ può essere amplificato rispetto all’errore relativo presente nei dati.

In pratica:
- se $\mu(A)$ è vicino a $1$, il sistema è ben condizionato;
- se $\mu(A)$ è molto grande, il sistema è mal condizionato;
- se $A$ è singolare, $A^{-1}$ non esiste e si pone
$$  
\mu(A)=+\infty.  
$$



## Costruzione mediante decomposizione della matrice
Consideriamo:
$$
(s) \ Ax=b,
\qquad
A\in\mathbb{C}^{n\times n},
\qquad
b\in\mathbb{C}^n.
$$

Si sceglie una matrice invertibile:
$$
M\in\mathbb{C}^{n\times n},
$$
detta **precondizionatore**, e si scrive una decomposizione:
$$
A=M-(M-A).
$$

Dal sistema:
$$
Ax=b
$$
si ottiene:
$$
Mx=(M-A)x+b.
$$

Moltiplicando a sinistra per $M^{-1}$:
$$
x=M^{-1}(M-A)x+M^{-1}b.
$$

Equivalentemente:
$$
x=x+M^{-1}\underbrace{(b-Ax)}_{r(x)}.
$$
### Residuo
Per ogni $y\in\mathbb{C}^n$ di *(s)* si definisce:
$$
\boxed{
r(y)=b-Ay
}
$$
e, al passo $k$:
$$
r^{(k)}=b-Ax^{(k)}.
$$

## Metodo associato al precondizionatore
Si definisce:
$$
\boxed{
x^{(k+1)}
=
M^{-1}(M-A)x^{(k)}+M^{-1}b
}
$$
oppure:
$$
\boxed{
x^{(k+1)}
=
x^{(k)}+M^{-1}r^{(k)}
}
\qquad 
k = 0,1,2,\dots \quad ($)
$$
- dove $r^{(k)} = r(x^{(k)}) = b - Ax^{(k)}$

Il metodo *($)* è della forma *(m)*:
$$
x^{(k+1)}=Px^{(k)}+q,
$$
con matrice di iterazione:
$$
\boxed{
P=M^{-1}(M-A)=I-M^{-1}A
}
$$
e:
$$
\boxed{
q=M^{-1}b.
}
$$

## Consistenza e convergenza
Il metodo *($)* è consistente per costruzione, perché sostituendo la soluzione esatta $x$ si ritrova il sistema:
$$
Ax=b.
$$

Pertanto:
>[!lemma] Teorema 4.2
> $$
> \boxed{
> \text{il metodo converge}
> \iff
> \rho(I-M^{-1}A)<1.
> }
> $$

## Osservazione smart
Il polinomio caratteristico della matrice di iterazione è:
$$
c_P(\lambda)
=
\det\left(
\lambda I-(I-M^{-1}A)
\right).
$$

Si ha:
$$
c_P(\lambda)
=
\det\left(
M^{-1}(\lambda M+A-M)
\right).
$$

Per il teorema di Binet (determinante di un prodotto è il prodotto dei determinanti):
$$
c_P(\lambda)
=
\det(M^{-1})
\det(\lambda M+A-M).
$$

Poiché:
$$
\det(M^{-1})\neq0,
$$

segue che:
$$
\boxed{
c_P(\lambda)=0
\iff
\det(\lambda M+A-M)=0.
}
$$

Questa è l’**equazione smart**.

> [!tip]
> Permette di trovare gli autovalori e il raggio spettrale della matrice di iterazione senza calcolare esplicitamente $M^{-1}$ e $I-M^{-1}A$.


### Aspetti computazionali
#### OSS 1: Residuo precondizionato
L'iterazione `k-esima` del metodo *($)* viene calcolata dalla formula $x^{(k+1)}  = x^{(k)} + M^{-1}r^{(k)}$

Per calcolare $M^{-1}r^{(k)},$ si introduce il vettore:
$$
z^{(k)}=M^{-1}r^{(k)}.
$$
detto **residuo precondizionato**.

Non si calcola l’inversa ma si risolve il sistema lineare:
$$
\boxed{
Mz^{(k)}=r^{(k)}.
}
$$

Poi:
$$
x^{(k+1)}
=
x^{(k)}+z^{(k)}.
$$

Il sistema con matrice $M$ deve essere *più facile (rapido) da risolvere* del sistema originario $Ax = b$.

### OSS 2: Scelta del precondizionatore
Intuitivamente, quanto più il precondizionatore "M" assomiglia alla matrice `A`, tanto più il metodo *($)* convergerà più velocemente.

Bisogna mediare fra:
1. qualità dell’approssimazione:$$
   M\approx A;
   $$
2. facilità di risoluzione dei sistemi con matrice $M$.

Se $M\approx A,$ allora:
$$
I-M^{-1}A\approx0,
$$
e ci si aspetta un raggio spettrale piccolo.

Nel caso limite:
$$
M=A,
$$
la matrice di iterazione è nulla e il metodo converge in una sola iterazione, ma quell’iterazione costa quanto risolvere il sistema originario.

>[!tip] Quindi devo avere una `M` molto simile a `A` MA NON UGUALE, altrimenti risolvo tutto in una singola iterazione ma mi costa quanto risolvere il sistema normale.



## Metodo di Jacobi
Supponiamo che $\forall i \ a_{ii}\neq0$.
- quindi la matrice A abbia elementi diagonali non nulli

Sia $D=\operatorname{diag}(a_{11},\dots,a_{nn})$ la parte diagonale di $A$.
- Poiché $\det(D)=a_{11}\cdots a_{nn}\neq0,$ $D$ è invertibile.

Il metodo di Jacobi si ottiene scegliendo il precondizionatore:
$$
\boxed{
M=D.
}
$$

Quindi:
$$
\begin{cases}
	x^{(0)} \in \mathbb{C}^{2} \qquad \qquad \qquad \qquad \qquad \qquad \ \ \ \ \ \text{dato} \\
\boxed{x^{(k+1)}
=
D^{-1}(D-A)x^{(k)}+D^{-1}b} \ \ \qquad k = 0,1,2,\dots
\end{cases}
$$

oppure si può scrivere:
$$
\boxed{
x^{(k+1)}
=
x^{(k)}+D^{-1}r^{(k)}.
}
$$

La matrice di iterazione è:
$$
\boxed{
J=D^{-1}(D-A)=I-D^{-1}A.
}
$$

Il metodo converge se e solo se:
$$
\boxed{
\rho(J)<1.
}
$$

### Costo di un’iterazione di Jacobi
L'iterazione `k-esima` di $J$ richiede di calcolare il vettore
$$
z^{(k)} = D^{-1}r^{(k)}
$$

Per calcolare $z^{(k)}$ si risolve:
$$
Dz^{(k)}=r^{(k)}.
$$

Essendo il sistema diagonale
![[Pasted image 20260723132907.png]]
Si ottiene
$$
\boxed{
z_i^{(k)}
=
\frac{r_i^{(k)}}{a_{ii}},
\qquad
i=1,\dots,n.
}
$$
Il costo è di $n$ divisioni.



## Metodo di Gauss-Seidel
Supponiamo (anche qui) che `A` abbia elementi diagonali non nulli.

Sia $E$ la parte triangolare inferiore di $A$, compresa la diagonale:
$$
E=
\begin{pmatrix}
a_{11}&0&\cdots&0\\
a_{21}&a_{22}&\cdots&0\\
\vdots&\vdots&\ddots&\vdots\\
a_{n1}&a_{n2}&\cdots&a_{nn}
\end{pmatrix}.
$$

Poiché il det di una matrice triangolare inferiore è il prodotto degli elementi della diagonale:
$$
\det(E)=a_{11}\cdots a_{nn}\neq0,
$$
$E$ è invertibile.


Il metodo di Gauss-Seidel si ottiene scegliendo il precondizionatore:
$$
\boxed{
M=E.
}
$$

Quindi:
$$
\begin{cases}
	x^{(0)} \in \mathbb{C}^{2} \qquad \qquad \qquad \qquad \qquad \qquad \ \ \ \ \ \text{dato} \\
\boxed{
x^{(k+1)}
=
E^{-1}(E-A)x^{(k)}+E^{-1}b
} \ \ \qquad k = 0,1,2,\dots
\end{cases}

$$

oppure:
$$
\boxed{
x^{(k+1)}
=
x^{(k)}+E^{-1}r^{(k)}.
}
$$


La matrice di iterazione è:
$$
\boxed{
G=E^{-1}(E-A)=I-E^{-1}A.
}
$$

Il metodo converge se e solo se:
$$
\boxed{
\rho(G)<1.
}
$$


### Sostituzione in avanti
L'iterazione `k-esima` di $G$ richiede di calcolare il vettore
$$
z^{(k)} = E^{-1}r^{(k)}
$$

Per calcolare $z^{(k)}$ si risolve:
$$
Ez^{(k)}=r^{(k)}.
$$

La soluzione si ottiene per **sostituzione in avanti**:
![[Pasted image 20260723133848.png]]
Che diventa
$$
\boxed{
z_i^{(k)}
=
\frac{
r_i^{(k)}
-
\sum_{j=1}^{i-1}a_{ij}z_j^{(k)}
}{
a_{ii}
},
\qquad
i=1,\dots,n.
}
$$
- che tra l'altro se noti in $z_{3}^{(k)}$ ho $z_{1}^{(k)}$ e $z_{2}^{(k)}$ già calcolate.

### Costo
Per ogni componente $z_i^{(k)}$ servono:
- $i-1$ moltiplicazioni;
- $i-1$ addizioni o sottrazioni;
- una divisione.
Il costo complessivo è
![[Pasted image 20260723134150.png]]
Ossia
$$
n \text{ divisioni} \qquad e \qquad \frac{n(n-1)}2 \text{ moltiplicazioni e addizioni}
$$

Quindi:
$$
nD + \frac{{n(n+1)}}{2}A + \frac{{n(n+1)}}{2}M
$$


## Confronto tra Jacobi e Gauss-Seidel (oss. 4.8)
### Velocità e costo
Il precondizionatore $E$ approssima normalmente $A$ meglio di $D$.
- perché $E-A$ ha più zeri di $D-A$

Perciò, molto spesso:
$$
\rho(G)<\rho(J),
$$
e Gauss-Seidel converge in meno iterazioni.

Tuttavia:
- un’iterazione di Jacobi è meno costosa;
- un’iterazione di Gauss-Seidel è più costosa.

Il tempo totale dipende quindi dal problema, anche se spesso Gauss-Seidel risulta più efficiente.



## Teorema 4.3 sulla convergenza dei metodi di J e GS
Dimostro gli altri 7 casi
##### Dimostrazione del Teorema 4.3
Dimostriamo il risultato per il metodo di Gauss-Seidel sotto l’ipotesi che $A$ sia a diagonale dominante per righe e irriducibile.

Gli altri casi si dimostrano in modo analogo.

Dobbiamo dimostrare che

$$
\rho(G)<1
$$

dove

$$
G=I-E^{-1}A
$$

è la matrice di iterazione di Gauss-Seidel, con $E$ parte triangolare inferiore di $A$ inclusa la diagonale.

Per l’osservazione smart, gli autovalori di $G$ sono le soluzioni dell’equazione

$$
\det(\lambda E + A - E)=0
$$

cioè le radici del polinomio

$$
\det(\lambda E + A - E)
$$

Vediamo la matrice nel caso $n=4$.

Se

$$
E=
\begin{pmatrix}
a_{11} & 0 & 0 & 0\\
a_{21} & a_{22} & 0 & 0\\
a_{31} & a_{32} & a_{33} & 0\\
a_{41} & a_{42} & a_{43} & a_{44}
\end{pmatrix}
$$

allora

$$
\lambda E+A-E=
\begin{pmatrix}
\lambda a_{11} & a_{12} & a_{13} & a_{14}\\
\lambda a_{21} & \lambda a_{22} & a_{23} & a_{24}\\
\lambda a_{31} & \lambda a_{32} & \lambda a_{33} & a_{34}\\
\lambda a_{41} & \lambda a_{42} & \lambda a_{43} & \lambda a_{44}
\end{pmatrix}
$$

cioè gli elementi sulla parte triangolare inferiore, diagonale inclusa, vengono moltiplicati per $\lambda$, mentre gli elementi strettamente sopra la diagonale restano invariati.

Vogliamo dimostrare che tutte le radici di questo polinomio hanno modulo minore di $1$.

Equivalentemente, mostriamo che nessun numero

$$
\lambda\in\mathbb{C}
$$

con

$$
|\lambda|\geq 1
$$

può essere radice del polinomio.

Sia quindi $\lambda\in\mathbb{C}$ tale che

$$
|\lambda|\geq 1
$$

Consideriamo la matrice

$$
\lambda E+A-E
$$

Vogliamo dimostrare che questa matrice è invertibile. Per farlo mostriamo che è a diagonale dominante per righe e irriducibile, esattamente come $A$.

Prima osservazione: $\lambda E+A-E$ è irriducibile come $A$.

Infatti, siccome

$$
|\lambda|\geq 1
$$
abbiamo $\lambda\neq 0$, quindi moltiplicare certi elementi di $A$ per $\lambda$ non cambia il fatto che siano nulli o non nulli.

Gli zeri della matrice $\lambda E+A-E$ stanno nelle stesse posizioni degli zeri di $A$.

Quindi le due matrici hanno lo stesso grafo associato.

Siccome $A$ è irriducibile, il grafo di $A$ è fortemente connesso, e quindi anche il grafo di $\lambda E+A-E$ è fortemente connesso.

Dunque $\lambda E+A-E$ è irriducibile.

Seconda osservazione: $\lambda E+A-E$ è a diagonale dominante per righe.

Fissiamo una riga $i$.

L’elemento diagonale della riga $i$ è

$$
\lambda a_{ii}
$$

quindi il suo modulo è

$$
|\lambda a_{ii}|=|\lambda||a_{ii}|
$$

Gli elementi fuori diagonale della riga $i$ sono:

- quelli con $j<i$, cioè sotto la diagonale, moltiplicati per $\lambda$;
- quelli con $j>i$, cioè sopra la diagonale, lasciati invariati.

Quindi la somma dei moduli degli elementi fuori diagonale della riga $i$ della matrice $\lambda E+A-E$ è

$$
\sum_{j=1}^{i-1}|\lambda a_{ij}|+\sum_{j=i+1}^n |a_{ij}|
$$

cioè

$$
|\lambda|\sum_{j=1}^{i-1}|a_{ij}|+\sum_{j=i+1}^n |a_{ij}|
$$

Ora, siccome $A$ è a diagonale dominante per righe,

$$
|a_{ii}|
\geq
\sum_{j=1}^{i-1}|a_{ij}|+\sum_{j=i+1}^n |a_{ij}|
$$

moltiplichiamo per $|\lambda|$:

$$
|\lambda||a_{ii}|
\geq
|\lambda|\sum_{j=1}^{i-1}|a_{ij}|
+
|\lambda|\sum_{j=i+1}^n |a_{ij}|
$$

siccome

$$
|\lambda|\geq 1
$$

abbiamo

$$
|\lambda|\sum_{j=i+1}^n |a_{ij}|
\geq
\sum_{j=i+1}^n |a_{ij}|
$$

quindi

$$
|\lambda||a_{ii}|
\geq
|\lambda|\sum_{j=1}^{i-1}|a_{ij}|
+
\sum_{j=i+1}^n |a_{ij}|
$$

cioè

$$
|\lambda a_{ii}|
\geq
\sum_{j=1}^{i-1}|\lambda a_{ij}|
+
\sum_{j=i+1}^n |a_{ij}|
$$

Questa è esattamente la dominanza diagonale per righe della matrice $\lambda E+A-E$.

Rimane da verificare che esiste almeno una riga in cui la disuguaglianza è stretta.

Poiché $A$ è a diagonale dominante per righe, nella definizione usata dal prof esiste almeno una riga $k$ tale che $$
|a_{kk}|>
\sum_{\substack{j=1\\j\neq k}}^n |a_{kj}|
$$

Ripetendo il ragionamento precedente sulla riga $k$, otteniamo una disuguaglianza stretta anche per $\lambda E+A-E$:

$$
|\lambda a_{kk}|
>
\sum_{j=1}^{k-1}|\lambda a_{kj}|
+
\sum_{j=k+1}^n |a_{kj}|
$$

Quindi $\lambda E+A-E$ è a diagonale dominante per righe e irriducibile.

Per il Teorema 3.7, $\lambda E+A-E$ è invertibile.

Allora

$$
\det(\lambda E+A-E)\neq 0
$$

quindi $\lambda$ non è una radice del polinomio.

Abbiamo dimostrato che nessun $\lambda$ con $|\lambda|\geq 1$ è radice del polinomio.

Conclusione: tutte le radici hanno modulo minore di $1$.

Ma queste radici sono gli autovalori di $G$.

Quindi tutti gli autovalori di $G$ hanno modulo minore di $1$, e dunque

$$
\rho(G)<1
$$

Perciò il metodo di Gauss-Seidel è convergente.

$$
\square
$$

Per il metodo di Jacobi, il ragionamento è analogo, ma si usa

$$
J=I-D^{-1}A
$$

e l’equazione smart diventa

$$
\det(\lambda D + A-D)=0
$$

Se $|\lambda|\geq 1$, la matrice $\lambda D+A-D$ conserva la dominanza diagonale e l’irriducibilità, quindi è invertibile per il Teorema 3.7. Dunque nessun $\lambda$ con $|\lambda|\geq 1$ può essere autovalore di $J$, e quindi

$$
\rho(J)<1
$$

I casi per colonne si fanno allo stesso modo, usando la dominanza per colonne nella matrice $\lambda E+A-E$ oppure $\lambda D+A-D$.

I casi in senso stretto sono più semplici, perché basta il primo teorema di Gershgorin: se la dominanza è stretta, lo $0$ sta fuori da tutti i cerchi, quindi la matrice è invertibile senza dover usare l’irriducibilità.