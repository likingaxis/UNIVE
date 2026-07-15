## interpolazione polinomiale
### Problema
data una funzione f:[a,b]->\mathbb{R} di cui sono noti i valori f(x0),f(x1),f(xn) in n+1 punti distinti x0,x1,xn appartenenti a [a,b]
si sceglie una classe C di funzioni definite  su [a,b] a valori in R 
- una classe C è ...
si vuole approssimare la funzione f(x) con una funzione p:[a,b]->R che appartiene a C
e che nei punti x0,x1,xn assume i valori f(x0) f(x1) f(xn)
si vuole definire un problema ben posto ovvero un problema dove questa classe C ha una e una sola funzione
useremo una classe C che non ha l'insieme di tutti i polinomi ma tutto lo spazio vettoriale reale polinomi con grado <=n+1

C=R_n[x]=a0+a1x+a2x^2+anx^n:a0,a1,...,an appartengono a R
scegliendo C dimostriamo il teorema 1.1
esiste un unico p(x) appartenente a Rn[x] tale che p(xi)=f(xi) per ogni i=1,...,n
#### Teorema 1.1 precisato
siano x0,y0 x1,y1 xn,yn appartenente a R^2 tale che x0,x1,xn sono tutti distinti
allora esiste un unico p(x) appartenente a Rn[x] tale che p(xi)=yi per ogni i=0,..,1,...,n

mostriamo ora una figura nel caso n=3
x0,x1,x2,x3 possono anche essere non in ordine e le y possono anche non essere distinte
infatti y0=y2 
metti foto figura nel caso n = 3: esiste un unico polinomio p(x) ∈ R3[x] tale che p(x0) = y0, p(x1) = y1, p(x2) = y2, p(x3) = y3
![[Pasted image 20260711120711.png]]
Abbiamo due dimostrazioni diverse per questo teorema
##### Dimostrazione 1
Osserviamo che un generico polinomio p(x) in R_n[x] si scrive nella forma canonica
- forma standard con cui si scrivono i polinomi
p(x)=a0+a1x+a2x^2+anx^n
p(x) soddisfa la condizione p(xi)=yi per ogni i che va da 0 a n
se e solo se è soddisfatto il seguente sistema
a0,a1x0+anx0^n=y0
....
a0+a1xn+anxn^n=yn

questo sistema lo scriviamo come matrice
abbiamo i coefficienti che sono a0,a1, an li mettiamo come vettore colonna
poi abbiamo la matrice effettiva che sarebbe tutti 1 per la prima colonna e poi x0 e così via con le altre colonne
tutto questo uguale al vettore y0 yn
questa matrice qui ha un simbolo detto V(x0,x1,...xn) e si chiama matrice di vandermonde sui nodi x0,x1,xn
vogliamo dimostrare che questa matrice sia invertibile ovvero che 
det(V(x0,xn))=1 se n=0  se n>=1 abbiamo la produttoria i,j=0 j<i a n (xi-xj)=(x1-x0)(x2-x0)(x2-x1)...(xn-x0)(xn-x1)...(xn-xn-1)

i nodi sono distinti quindi nessuno di questi termini della produttoria è 0
quindi abbiamo determinante diverso da 0
e dunque il determinante di V è diverso da 0 perchè per ipotesi tutti i nodi sono distinti
avendo un sistema lineare quadrato
rango massimo diverso da 0 e invertibile
rouche capelli ci dice per un sistema quadrato che esiste una unica soluzione
poichè V è invertibile il sistema lineare ha una e una sola soluzione che è 
la matrice di vandermone invertita moltiplicata per il termine dei valori noti
quindi portiamo a destra la matrice invertibile
esiste un unico p(x) in R[x] che soddisfa p(xi)=yi per ogni i=0,...,n
e inoltre p(x) è dato da p(x)=a0,....
con vettore deicoefficienti 
dato dallo spostamento a destra della matrice 
ricordando che, dato un polinomio in quella forma, allora se i coefficienti sono unici allora anche il polinomio è unico
ora si vuole dimostrare che il determinante di V è proprio quel determinante
la dimostrazione la facciamo per n=3 ma questo vale per n>=1 per n=0 la matrice ha determinante 1 perchè ha solo x0
calcoliamo il determinante di V(x0,x1,x2,x3) 
per ogni i=0,1,...,3 definiamo di come il determinante della matrice di vandermonde fino al nodo i
calcoliamo d3
d3= matrice con 1 x0 x0^2 ... 1 x3 x3^2 x3^3
creiamo degli 0 nella riga per calcolare il determinante 
sostituisco l'ultima colonna della matrice con se stessa + il multiplo scalare di un altra colonna il determinante non cambia
avrò quindi nel caso della colonna più a destra
scrivi matrice qui
per fare la terza colonna faccio lo stesso ma spostato di 1 e per quello ancora prima idem
mostra qui la matrice applicando anche dei raccoglimenti
ora che abbiamo questa matrice usiamo laplace per calcolare il determinante lungo la riga
noi vogliamo scrivere la cosa in modo generico e quindi non mettiamo il - di laplace nel caso del primo 1
quindi mettiamo $(-1)^n$
in questo caso abbiamo -1 al cubo e devo calcolare il determinante della matrice più piccola
scrivila qui

estraiamo dalle righe gli scalari in comune come x0-x3 ecc...
sfruttando la linearità del determinante rispetto a ogni riga o ogni colonna degli scalari
sono usciti 3 fattori con il -1 al cubo, e li applico ad ogni fattore
la matrice a destra degli scalari è d2 
quindi abbiamo una formula ricorsiva che moltiplica poi con d2
d3= scalari per d2
d2 sarà quindi moltiplicazione con x2-x0 x2-x1 per d1
d1 sarà x1-x0 per d0
ha messo che i va da 0 a n 
quindi calcoliamo anche d0?
questa formula qui è proprio la produttoria vista prima quindi abbiamo dimostrato che il calcolo del determinante è proprio questo

##### Dimostrazione 2
definiamo questi polinomi di lagrange
per ogni j=0 a n 
Lj=produttoria di i=0 con i diverso da j a n di x-xi fratto xj-xi 
uguale al prodotto di xj-x0 ... (xj-xj-1) xj-xj+1 xj-xn
togliamo il caso xj-xj altrimenti verrebbe 0
al numeratore abbiamo x-x0 x-xj-1 x-xj+1 ... x-xn
gli n+1 polinomi L0(x) ... Ln(x) 
sotto abbiamo delle costanti
sopra abbiamo n fattori perchè non mettiamo il caso in cui i è uguale a j
quindi abbiamo grado n perchè moltiplichiamo n fattori di grado 1 
l'unico che ci da grado massimo è x alla n di tutti gli altri non ci interessa quindi i polinomi hanno tutti grado n quindi appartengono a Rn[x]
vogliamo dimostrare che questi polinomi qui sono i polinomi di Rn[x]
quindi che L0,...,Ln sono una base di Rn[x]
>[!info]- cosa è una base?
> 
> una base di Rn[x] è un insieme di elementi v1(x),...,vr(x) appartenenti a Rn[x] tali che 
> - sono linearmente indipendenti
> 	- l'unica combinazione lineare a1v1(x)+...+ arvr(x) che coincide con il polinomio nullo è avere i coefficienti a 0
> - generano Rn[x] cioè ogni polinomio q(X) in Rn[x] si scrive come combinazione lineare della forma q(x)=B1v1(x)+...Brvr(x)
> 
> se abbiamo uno spazio vettoriale tutte le loro basi
> hanno stesso numero di elementi, detto dimensione dello spazio vettoriale
> una base canonica di Rn[x] è 1 x x quadrato x al cubo x alla quarta x alla n
> con n+1 elementi
> ogni polinomio si può scrivere come
> p(x)=a0​+a1​x+a2​x2+⋯+an​xn.
>noi ovviamente al posto di x abbiamo L in teoria giusto?

nel caso della nostra dimostrazione abbiamo che
vogliamo dimostrare che queste L sono base di Rn[x]
per farlo ci avvaliamo di questo teorema 
se si hanno n+1 elementi in uno spazio vettoriale di dimensione n+1 come Rn[x] allora questi elementi sono una base dello spazio Rn[x] se e solo se sono linearmente indipendenti

visto che L0(x) Ln(x) sono n+1=dim Rn[x]
per dimostrare che sono  una base di Rn[x] ci basta dimostrare che sono lin indipendenti
polinomialmente per ogni i,j=0,...,n
Lj(xj)=1 se i=j 0 altrimenti
mette alla formula quella sopra della produttoria che al posto di avere i abbiamo k per evitare confusione con questi indici che abbiamo qui

questa proprietà vale 0 quando i è diverso da j perchè al numeratore avremmo il caso in cui xi-xi che quindi azzera il numeratore, ma non azzera anche il denominatore?
con i=j abbiamo uno perchè num è uguale al den

se alfa0L0(x)+alfa1L1(x)+....+anLn(x)=0 per tutti gli x appartenenti a R
allora per ogni i=0,...,n
0=alfa0L0(xi)+...alfanLn(xi)
rimane di questo solo
alfaiLi(xi)=alfa i quindi abbiamo che alfai è uguale a 0
quindi tutti i coefficienti sono a 0 quindi L0,...,Ln sono linearmente indipendenti
perchè se tutte le alfa sono a 0 allora lin indipendenti giusto?

visto che sono lin indip allora sono base di Rn[x]
- a che ci serve dire che sono base di Rn[x]?
definiamo quindi
p(x)= y0L0(x),...,ynLn(x)
con p(x) in Rn[x]
- sono basi lin. indipendenti quindi non escono dallo spazio
vogliamo quindi ora dimostrare che sia soddisfatta la proprietà per cui
p(xi) vale yi con i che va da 0 a n
sfrutto la proprietà vista prima
per ogni i che va da 0 fino a n
p(xi)=y0L0(xi)+ynLn(xi)
rimane solo
yiLi(xi) che per la proprietà di prima è uguale a yi
quindi esiste 
ora dobbiamo dimostrare l'unicità
- cosa si intende per unicità?
supponiamo un assurdo che q(x) in Rn[x] sia un altro polinomio t.c q(x_i)=y_i per ogni i che va da 0 a n
q(x) è un polinomio in Rn[x] sappiamo che L0 L1 Ln sono una base di Rn[x]
allora posso scrivere q(x) come combinazione degli elementi di base per degli scalari che esistono e sono ad esempio B1 Bn in R

q(x)=B0L0(x)+...+BnLn(x)
allora per ogni i da 0 fino a n
abbiamo che yi=q(xi)=B0L0(xi)+BnLn(xi) 
quindi BiLi(xi) rimane e quindi è uguale a Bi
visto che yi è uguale a Bi
allora q(x) è uguale a y0L0+y1L1+...+ynLn(x)
questo però è p(x) quindi q(x) è uguale a p(x)
quindi dimostra unicità

##### Definizione 
siano (x0,y0),...,(xn,yn) in R2 con x0,...,xn come punti distinti
l'unico polinomio p(x) in Rn[x] che soddisfa la condizione 
p(xi)=yi che per ogni i che va da 0 a n
si chiama polinomio di interpolazione dei dati
x0,y0 xn,yn

La prima dimostrazione del teorema precedente ci dice che p(x) si scrive in forma canonica come
p(x)=a0+a1x+a2x^2+...+anx^n detta forma di lagrange di p(x)
con la cosa quella della matrice di vandermonde scrivila qua sotto
dove V(x0,...,xn) è la matrice sui nodi x0,...,xn
la seconda dimostrazione ci da la forma di Lagrange
che è molto più facile perchè abbiamo y0,..,yn
p(x)=y0L0(x)+...+ynLn(x)
dove per ogni j che va da 0 a n Lj(x) è definito dalla definizione quella sopra con la produttoria
e si chiama polinomio di j-esimo polinomio di lagrange relativo ai nodi x0,...,xn

se yi sono i valori nei punti xi di una funzione f:[a,b]->R 
cioè se yi=f(xi) per ogni i che va da 0 a n allora p(x) si chiama anche polinomio d'interpolazione della funzione f(x) sui nodi x0,...,xn
domanda orale
cosa è per definizione il polinomio di interpolazione della funzione f(x) sui nodi x0,xn 
è l'unico polinomio in Rn[x] che soddisfa la condizione p(xi)=f(xi) per ogni i che va da 1 a n
## Errore o resto dell'interpolazione polinomiale
Quanto sbagliamo nell'approssimazione
#### Teorema
sia f:a,b->R 
una funzione di classe $C^{n+1}[a,b]$
- cosa vuol dire classe n+1 di a,b
	- definizione di classe C+n+1
	- esistono derivate nell'intervallo a,b fino alla n+1 esima 
	- funzioni continue nell'intervallo di [a,b]
e sia p(x) il polinomio di interpolazione di f(x) sugli n+1 nodi distinti 
x0,...,xn appartenenti in a,b
cosa è l'oggetto p(x)
- p(x) è l'unico polinomio che appartiene a Rn[x] tale che per ogni i che va da 0 a n 
	- f(xi)=p(xi)
per ogni x che sta nell'intervallo a,b esiste un unico intervallo Csi=csi(x) appartiene ad a,b
f(x)-p(x)= derivata n+1 esima di csi fratto n+1! con x-x0 fino a x-xn
dimostriamo che questo 
mi fisso un punto x in [a,b] 
il primo caso è x coincide con uno dei nodi x0,...,xn
- qualunque csi mi va bene perchè tanto si azzererebbe comunque
- prendo un qualsiasi csi in a,b e la nostra formula vale perchè viene 0=0
il secondo caso è x non coincide con uno dei nodi x0,...,xn
definiamo delle funzioni ausiliarie
pi greco di y=y-x0 per y-x1 fino a y-xn
r(y) è detta funzione di resto ovvero
r(y)=f(y)-p(y)
Z sia una funzione definita da a,b ->R 
Z(y)=r(y)-r(x)/pi greco di (x) pi gredo di y
non usiamo x perchè x è un punto fissato in a,b
usiamo y per l'indeterminata
la parte dove usiamo x dove c'è r(x)/ pi greco(x) è una costante
a che classe appartiene la funzione Z
un polinomio come p(x) ha classe C infinito
se la deriviamo n+1 volte vale 0 e poi possiamo farle all'infinito
pi greco y è un polinomio di grado più alto però anche lui è derivabile infinite volte
r(y) è di classe C n+1
globalmente quindi Z(y) è C n+1 
infatti Z(y) é di classe C^n+1 [a,b]
come differenza di r(y) che è di classe Cn+1 [a,b] e r(x)/pigreco(x) pigreco(y)
di classe C infinito [a,b]
inoltre Z(y) si annulla in almeno n+2 punti di [a,b] perchè si annulla nei nodi x0,x1,...,xn 
e in x(il punto che avevamo fissato)
ad esempio facendo Z(x0) avremmo 0
il caso 1 ci serve per escludere i nodi che abbiamo fissato
se y è un nodo di x0 xn è un conto ma se x fosse così ci sarebbe un problema

A CASA AGGIUNGI UNA FOTO DEL GRAFICO DI Z nel caso n=2?
guardiamo 2 punti consecutivi in cui si annulla la funzione
in mezzo a questi due punti ci deve essere un punto in cui la derivata fa 0
questo lo dice il teorema di rolle
nella foto i punti blu sono i punti dove si annulla la derivata
se la mia funzione Z si annulla in almeno n+2 punti
la derivata prima si annulla in almeno n+1 punti
Z secondo per rolle si annulla in n punti
Z terzo n-1 punti
Z n+1(y) si annullerà in almeno 1 punto
quando diciamo punti diciamo a,b quindi punti interni nell'intervallo
questo punto lo chiamo proprio csi appartenente in a,b
farà al caso nostro
verifichiamo che questo punto csi fa valere la nostra funzione di calcolo di errore
dobbiamo fare la derivata Z n+1 esima di y
sarebbe la derivata di r(y) invece r(x)/pi greco(x) rimane così poichè costante pi greco di y invece va derivato anche quello
facciamo dei calcoli della derivata n+1 esima
luca ripassa un pò le derivate regole base
derivo il polinomio più del suo grado quindi farà 0 per ogni y 
perché p(y) ha grado minore uguale di n
togliamo p(y)
fare la derivata fa venire il fattoriale di una costante
facendo la derivata di pi greco abbiamo che tutte le altre derivate muoiono di pi greco
questo si può dire monico e quindi si può scrivere come n+1!
- il coefficiente davanti a y alla n+1 è 1 il più grande
dobbiamo ricordarci che questa derivata si annulla in quel punto csi
quindi 
0=z derivato di csi è uguale alla nostra funzione infatti
scrivi formula qui
isola r(x) e si ritrova la formula di prima
### Polinomio di interpolazione con forma di newton
abbiamo per ora visto la forma canonica e la forma di lagrange
p(x) polinomio dei dati x0,y0 x1,y1 xn,yb appartenenti a R alla seconda con x0,xn distinti

- forma canonica
	- p(x)=a0+a1x+...+anx^n 
	- poi matrice di vandermonde ecc
- forma di lagrance
	- p(x)=y0+L0(x)+...+ynLn(x)
	- con L0 Ln che sono i polinomi di lagrange relativi a x0,...,xn
la differenza tra i due è la base, nel caso della forma canonica sono i coefficienti che stanno davanti alla base canonica
in lagrange i coefficienti sono y0 ecc

Ora vediamo la forma di Newton del polinomio di interpolazione
##### Definizione dei coefficienti della forma di newton
sia f:[a,b]->R 
si definiscono 2 casi se 
- se y è un punto in a,b allora si definisce differenza divisa di f(x) relativa a y il numero f[y]=f(y)
- se y1,...,yk in a,b sono k>=2 si definisce differenza divisa di f(x) relativa a y1,...,yk il numero definito in questo modo f[y1,...,yk]=f[y1,...,yk-2,yk]-f[y1,...,yk-1]/yk-yk-1
	- è ricorsiva poichè ...
	- risolvendo otteniamo il rapporto incrementale di f(x) relativo ai punti y1,y2
#### ora definiamo il teorema di newton
sia f:[a,b]->R e siano x0,x1,...,xn appartenenti ad a,b distinti
allora il polinomio di interpolazione di f(x) su questi nodi è dato da 
$p(x)=f[x0]+f[x0,x1](x-x0)+f[x0,x1,x2](x-x0)(x-x1)+....+f[x0,...,xn](x-x0)...(x-xn-1)$
questa si chiama forma di newton del polinomio di interpolazione p(x)
i coefficienti sono le f[x] 1 x-x0 x-x1 x-x0 x-x1 x-xn-1 ecc...
i coefficienti sono le differenze di x
##### Dimostriamo un piccolo corollario
sia f:[a,b]->R e siano x0,x1,...,xn in a,b distinti
allora f[x0,x1,...,xn] non cambia se vengono permutati i suoi n+1 argomenti, cioè
f[x0,x1,...,xn]=f[xsigma(0),...xsigma(n)] per ogni permutazione sigma di {0,...,n}
una permutazione è un riordinamento dei numeri
Dimostrazione 
il coefficiente direttore sulla differenza dei nodi è f[x0,x1,...,xn]
esso non cambia per nessuna permutazione poiché è un polinomio
altrimenti avremmo un polinomio diverso
perciò
sia sigma una qualsiasi permutazione, di {0,...,n}
applicando la formula scritta sopra prima con i nodi x0,x1,...,xn in ordine standard
e poi permutati per quel sigma quindi xsigma0 xsigma1,...xsigman
vediamo che f[x0,x1,...,xn] e f[xsigma0,..., fxsigman] sono entrambi il coefficiente direttore (quello davanti a x^n) del polinomio p(x)
lo sono perchè rappresentano lo svolgimento del termine con grado n esimo di x 
del polinomio p(x)=polinomio di interpolazione di f(x) sui nodi x0,x1,...,xn è uguale a il polinomio di interpolazione di f(x) sui nodi xsigma0, xsigman
quindi questo dimostra il corollario

N.B possiamo usare la forma di newton anche senza conoscere la funzione, noi ci possiamo fare il calcolo anche solo con i nodi, e definiamo f come una qualsiasi funzione
##### Algoritmo di valutazione del polinomio di interpolazione in un punto
sia f:[a,b]->R siano x0,...,xn in [a,b] punti distinti e sia t in R
vogliamo costruire un algoritmo per calcolare p(t) dove p(x) è il polinomio di interpolazione di f(x) sui nodi x0,x1,...,xn
per chiarezza illustriamo l'algoritmo nel caso n=3
in base al teorema della forma di Newton
$p(x)=f[x0]+f[x0,x1]+f[x0,x1,x2](x-x0)(x-x1)+f[x0,x1,x2,x2](x-x0)(x-x1)(x-x2)$
la prima parte è indipendente dal punto t devo valutare p(x)
consiste nel calcolo delle differenze divise blu, con la tabella delle differenze divise
la seconda parte utilizza il metodo ruffini horner
calcoliamo p(t) con questo metodo
per farlo raccogliamo t-x0 t-x1 ecc così faccio moltiplicazioni uniche
$p(t)=f[x0]+(t-x0)(f[x0,x1]+(t-x1)(f[x0,x1,x2]+(t-x2)f[x0,x1,x2,x3]))$
come la calcoliamo questa cosa?
prima definiamo l'ultima differenza divisa come h3 poi h2 è tutta la parentesi rossa
h1 è tutta la parentesi grande
poi h0 sarà tutto ovvero p(t)
noi calcoliamo prima h3 poi h2 e così via

calcoliamo i costi
della prima fase abbiamo la nostra tabella che era quella che aveva fatto in precedenza ovvero
![[Pasted image (4).png]]
per calcolarla dobbiamo calcolare solo le differenze divise dopo la prima colonna poichè quella è nota
abbiamo n^2 elementi - la diagonale n diviso 2 +n che fa 
n(n+1)/2
perchè diviso 2?
per tutte le n differenze divise abbiamo 2 sottrazioni e una divisione
le operazioni complessive da fare sono 
2 volte n per n+1 diviso 2 sottrazioni
n per n+1/2 divisioni
costo computazionale della seconda parte
abbiamo una addizione una sottrazione e una moltiplicazione per tutti gli h
e sono n in totale
quindi per ciascuna abbiamo
1 molt, 1 sottr, 1 addizione
quindi in totale n molt, n sottr, n addizioni
quindi il costo complessivo fa notare che una addizione ha stesso costo di una sottrazione
poichè a-B=a+-B e il segno meno non costa nulla alla macchina
cosa non vale per moltiplicazione per divisioni
A=addizioni e sottrazioni
M moltiplicazioni
D divisioni
abbiamo 
costofase 1 c1(n)=n(n+1)A+n(n+1)/2 D
costo fase 2 c2(n)=2nA+nM
costo complessivo abbiamo
c1(n)+c2(n)
ovvero approssimando abbiamo
n^2 A + n^2/2 D 
###### Se valutiamo la cosa per m punti t
la prima parte è indipendente e quindi si ripete 1 volta
e m volte la seconda
quindi costo di valutazione di p(x) in m punti
cm(n)=c1(n)+mc2(n)=n^2+2nm+nA +nmM+n^2/2^n/2 D
che approssimato è n^2+2nm A+nmM+n^2/2 D
#### Aggiunta di un nodo di interpolazione
la forma di Newton è conveniente quando ai dati di interpolazione x0,y0 xn,yn
ne viene aggiunto uno nuovo dato xn+1,yn+1 con xn+1 diverso dai precedenti
infatti detta f(x) una qualche funzione qualsiasi tale che f(xi)=yi per ogni i che va da 0 a n+1
il polinomio di interpolazione dei dati x0,y0 xn,yn si scrive in forma di Newton nel modo seguente
p(x)=f[x0]+f[x0,x1](x-x0)+...+ f[x0,...,xn]  ecc
il nuovo polinomio di interpolazione dei dati x0 y0 xn+1 yn+1 si scrive come
q(x)=p(x)+f[x0,xn+1](x-x0)...x-xn
osservazioni relative a ciò
osservazioni
prendendo il caso n=2 
scrivi tabella

1. avendo a disposizione di p(x) in forma di newton sono note le differenze divise(coefficienti di newton) f[x0] f[x0,x1] ... f[x0,...,xn] quindi basta calcolare f[x0,...,xn+1] per ottenere la forma di newton di q(x) il costo per calcolare f[x0,...,xn+1] è dato da 2n+1 A + n+1 D inoltre questo calcolo sfrutta solo gli elementi f[x0] f[x0,x1] f[x0,...,xn] più il valore aggiunto f[xn+1]=yn+1
2. avendo a disposizione p(x) in forma di Newton e il suo valore p(t) in un dato punto t per calcolare q(t) abbiamo che q(t)=p(t)+f[x0,xn+1](t-x0)...(t-xn) devo fare 2(n+1)A+n+1M quindi in totale avrò 3n+4 A+n+1D+n+1M 

aggiungere un nodo potrebbe peggiorare le cose! non è detto ma potrebbe

### Integrazione numerica
Calcolo numerico degli integrali andando ad approssimarli

data una funzione integrabile f:[a,b]->R e si vuole calcolare un'approssimazione di integrale tra a e b di f(x) dx
ricordiamo che l'integrale è l'area sottesa 
a tal fine si suddivide l'intervallo a,b in n>=1 sottointervalli tutti della stessa ampiezza h=b-1/n

foto del grafico fatto dal prof
![[Pasted image 20260713130109.png]]

con il caso n=5
xj=a+jh con j=0,...,n 
abbiamo a=x0 e b=x5

questi punti che individuo nel grafico della funzione li congiungo con sei segmenti
l'area è data dalla somma di questi trapezi del grafico ovvero la nostra approssimazione
il valore che si prende come approssimazione del nostro integrale a,b f(x) dx 
l'area tratteggiata in rosso è il nostro integrale
come approssimazione di integrale di questo è integrale di s(x) dx da a in b
dove s(x) è la funzione verde 
s:[a,b]->R dove per x che appartiene all'intervallo xj,xj+1 
abbiamo come coefficiente angolare f(xj+1)-f(xj)/xj+1-xj 
quindi 
s(x)=f(xj)+coefficiente angolare per x-xj per x che appartiene a xj,xj+1 
questa regola vale per ogni indice j=0,n
vogliamo capire quanto vale questo integrale In integrale che va da a a b di s(x) dx che è uguale alla sommatoria degli integrali j=0 a n-1 che è l'integrale di xj xj+1 di s(x) dx
che è uguale alla sommatoria di j che va da 0 a n-1 della formula di s(x) scritta prima su questo intervallo
scrivi qui la formula bene
risolviamo la primitiva ma la risolviamo come f(xj)(x-xj)+f(xj+1)-f(xj)/xj+1-xj per la primitiva (x-xj)^2/2
l'unica variabile qui è la x
risolviamo integrale per la primitiva
raccogliamo per h e abbiamo la sommatoria ovvero
è una somma telescopica infatti abbiamo il primo e l'ultimo che appaiono 1 volta
invece quelli dentro appaiono 2 volte
quindi sarebbe 
scrivi qui formula
ottenendo alla fine questa formula che sarebbe la formula dei trapezi di ordine n
con h=b-a/n uguale al passo di discretizzazione della formula In

non mi ricordo bene questa parte sugli integrali in generale gli integrali
spiega bene i passaggi dentro questo specchietto
>[!info]- metti qua
>spiegazione

notare che stiamo sommando le aree di questi trapezi potevamo saltare calcoli integrali sfruttando la formula dell'area del trapezio, ma questa formula ci dice che vale anche se abbiamo cose negative

Se tu prendessi direttamente tutta la funzione vera f(x)f(x)f(x), senza sostituirla con la spezzata verde s(x)s(x)s(x), allora l’area sarebbe proprio quella effettiva:

∫abf(x) dx\int_a^b f(x)\,dx∫ab​f(x)dx

cioè l’**integrale esatto** della funzione.

Graficamente sarebbe l’area sotto la curva nera y=f(x)y=f(x)y=f(x).

---

Il problema è che spesso questa area non è facile da calcolare.

Per esempio, se f(x)f(x)f(x) è una funzione complicata, potresti non riuscire a trovare una primitiva esplicita, cioè una funzione F(x)F(x)F(x) tale che:

F′(x)=f(x).F'(x)=f(x).F′(x)=f(x).

Quindi non puoi usare facilmente:

∫abf(x) dx=F(b)−F(a).\int_a^b f(x)\,dx=F(b)-F(a).∫ab​f(x)dx=F(b)−F(a).

Allora cosa si fa?

Si sostituisce f(x)f(x)f(x) con una funzione più semplice s(x)s(x)s(x), costruita a tratti.
ricordiamo la formula della formula dei trapezi
In...
ora vedremo 
##### Errore o resto della formula dei trapezi
abbiamo quindi l'errore |integrale di f(x)-In|
vediamo ora un lemma utile per dimostrare poi il teorema
###### Lemma
siano omega, alfa, beta delle funzioni definite nel nostro intervallo a,b in R sono funzioni tali che 
- omega di x è continua e >=0 su a,b
- alfa e b(x)w(x) sono continue su a,b
- la funzione b(x) è compreso tra m e M ovvero il minimo e il massimo della funzione alfa(y) per un y in a,b
- citando weirestrass sappiamo che il max e il min sono compresi tra a e b perchè alfa è continua
allora esiste un certo punto eta in a,b tale che
integrale di B(x)w(x)dx= alfa(eta)integrale w(x) dx
è come se noi portassimo fuori b(x) e diventasse alfa(eta)

>[!info]- oss del lemma
> Oss. se nel lemma prendo w(x)=1 identicamente B(x)=alfa(x) continua su a,b
> allora esiste eta in a,b tale che l'integrale di a,b di alfa(x)dx è uguale a alfa di eta per b-a
> concludendo abbiamo che questo in realtà è il teorema della media integrale
> in pratica il teorema della media integrale ci dice che preso un integrale y=alfa(x) continuo in due punti a,b
> abbiamo che esiste un punto eta in a,b tale che l'integrale è uguale a scrivi
> per cui le due aree sono uguali 

Dimostriamo ora il lemma
visto che w(x)>=0 e per ogni x in a,b e B(x) compreso tra m e M per ogni x in a,b
allora
B(x) per w(x) è compreso in m w(x) e Mw(x) per ogni x in a,b
questo perchè ho w(x) innocuo e quindi la disuguaglianza non ci cambia particolarmente
se prendo un integrale di tutti i membri la disuguaglianza rimane uguale alla precedente
perchè vale per ogni x in a b
quindi 
scrivi integrale della disuguaglianza scritta prima

metti disegno del prof
siccome B(x)w(x) sta sempre sopra e sotto di mw(x) e Mw(x) possiamo fare questo integrale facendo valere la regola della monotonia dell'integrale

definiamo quindi z:[a,b] ->R , z(y)= alfa(y) per integrale che va da a a b di w(x) dx 
chiamiamo l'ultimo integrale C>=0
siccome alfa è continua su a,b anche Z lo è 
per il teorema dei valori intermedi z assume tutti i valori tra il suo minimo mC e il suo massimo MC
Quindi Z assume anche il valore dell'integrale di B(x)w(x) dx perchè anche lui era compreso tra mC e MC 
per valore si intende che esiste un eta a,b t.c Z(eta) è l'integrale che va da a a b di B(x)w(x)dx
quindi Z(eta) corrisponde proprio ad alfa di eta per integrale di w(x)dx

>[!info]- piccolo specchietto che spiega teorema dei valori intermedi
>metti qui

##### Teorema
![[Pasted image 20260713130109.png]]

sia f:[a,b]->R di classe C2a,b e sia In la formula dei trapezi di ordine n e passo h=b-a/n
per approssimare integrale tra a b di f(x) dx
allora esiste un certo punto eta che sta tra a e b tale che 
integrale che va da a e b di f(x)dx -In= -b-a f ''eta/12 h alla seconda
- C2a,b vuol dire che le prime 2 derivate esistono e sono continue
Dim
siano xj=a+hj con j=0,...,n i punti mostrati in figura e sia s(x) la funzione lineaere a tratti mostrata in figura.
il grafico di s(x) su due punti xj e xj+1 rappresenta proprio un polinomio di interpolazione
su questo intervallo fissato quindi abbiamo che è l'unico polinomio minore uguale di 1 che coincide con la funzione dei nodi
se xj e xj+1 sono uguali abbiamo grado 0?
ne traiamo questa osservazione
osservazione: s(x) coincide sull'intervallino [xj,xj+1] con il polinomio di interpolazione di f(x) sui 2 nodi xj,xj+1 vero per ogni j che va da 0 a n-1

vogliamo trovare integrale che va da a a b con f(x) dx-In che è uguale a quello che era davvero In
poi mettiamo tutto sotto un unico integrale sfruttando la linearità degli integrali
questo integrale lo calcolo come somma j=0 a n-1 dell'integrale dei singoli intervallini xj xj+1 di f(x)-s(x) dx
f(x)-s(x) è l'errore dell'interpolazione polinomiale, per ogni x in questo intervallo xj xj+1
esiste un punto csij=csij(x) per ogni intervallino scelgo uno csi j che appartiene a questo intervallino aperto xj xj+1 t.c f(x)-s(x) è la derivata seconda di f(csi(x))/2! (x-xj)(x-xj+1)
csi è un punto che dipende da x, quindi lo scriviamo in modo esplicito così che dentro l'integrale scritto qua sotto siamo sicuri di non trattarlo come una cosa che si può portare fuori

ovvero la sommatoria di j=0 a n-1 di integrale che va da xj a xj+1 di f'' di csi(x)/2 (x-xj)(x-xj+1) dx
abbiamo un prodotto negativo qua dentro, ma noi ora volevamo applicare il lemma scritto prima
quindi mettiamo un meno davanti così non diventa negativo
scrivi formula con il meno e applichiamo ora il lemma dove x-xjxj+1-x  per 1/2 è il mio omega x e invece f''(csi(x)) è beta(x) senza il fratto 2
alfa di x è invece f''(x) senza csij(x)
per applicare il lemma devono essere soddisfatte le ipotesi
- omega(x) è continua e >=0 su intervallo xj,xj+1
	- perchè?
- alfa(x) continua su xj,xj+1 perchè f sta nella classe C2[a,b]
- beta(x)omega(x) è continua?
	- abbiamo una ipotesi che guarda all'indietro beta di x per omega di x è -[f(x)-s(x)]
	- questa è continua quindi anche beta(x)omega(x) è continua su xj,xj+1
- beta di x è compreso tra il min e il max
	- poiché per ogni x in xj,xj+1 abbiamo che csij è in xj,xj+1 dunque sono comprese perchè
	- non ho capito perchè
esiste un etaj appartenente a xj,xj+1 tale che integrale xj xj+1 Beta(x)w(x) dx= f''(etaj) di integrale che va da xj a xj+1 di w(x) dx
ora applichiamo il lemma sul nostro intervallino
quindi quello di prima è la - sommatoria con j=0 che va a n-1 f''(etaj) integrale xj xj+1 x-xj xj+1-x/2 dx
vale per quel lemma messo sopra
faccio il calcolo mettendo t=x-xj
dt=dx
con estremi che sono 0 e h non ho capito perchè 
di t h-t /2 dt 

calcoliamo questo integrale ora
scrivi qua sotto quanto vale
-sommatoria che va da j=0 a n-1 di f''(etaj)[h/2 per t alla seconda/2 -1/2 per t cubo/3] tra 0 e h
sostituiamo 0 e h e abbiamo
-sommatoria j=0 n-1 di f''(etaj) h al cubo/12
portiamo fuori la costante e moltiplichiamo e dividiamo per n così abbiamo una media
h al cubo lo riscriviamo con -h quadro b-a/12  
questa media è un valore compreso tra il minimo e il massimo ovvero f'' di etaj 
- essendo f''(x) continua su a,b e essendo la media aritmetica 1/n somme per j=0 n-1 di f'' etaj un valore compreso tra il minimo e il massimo di f'' su a,b per il teorema dei valori intermedi esiste sicuramente un punto eta in a,b t.c il valore di f''(eta) è uguale a questa media aritmetica
abbiamo ora raggiunto la fine quindi
##### Osservazione di errore
in alcuni esercizi viene usato questo valore n(epsilon) quello che garantisce un errore integrale tra a e b di f(x)dx-In<=epsilon se prendiamo n>=n epsilon è della forma C/radice di epsilon con C costante
è un fatto generale infatti in base alla formula del teorema della stima degli errori se chiamo K una costante t.c modulo f''(x) <= K per ogni  x in a,b
allora la formula della stima degli errori prende b-a al cubo f'' di eta /12 n al quadrato che e  <=b-a al cubo K/12 n al quadrato 
e b-a al cubo K/12n al quadrato è <= epsilon se e solo se n al quadrato è >= b-a al cubo k /12 epsilon se e solo se n>= radice di b-a al cubo K/12 epsilon= n per epsilon
con n epsilon= radice b-a al cubo K/12 epsilon = C/radice di epsilon con C=radice b-a al cubo k/12

Questo numero si chiama:

n(ε)n(\varepsilon)n(ε)

cioè il numero minimo teorico di sottointervalli necessario per garantire errore al massimo ε\varepsilonε.
#### Estrapolazione
sia f:[a,b]->R integrabile e siano In0 In1 Inm le formule dei trapezi di ordini distinti n0 n1 nm passi h0=b-a/n0 h1=b-a/n1 ... hm=b-a/nm per approssimare integrale a b di f(x)dx
chiamiamo
p(x) il polinomio di interpolazione dei dati (h0 al quadrato, In0), (h1 al quadrato, In1),...,(hm al quadrato, Inm)
dove p(x) è l'unico polinomio in Rm[x] t.c p(hi^2)=Ini per ogni i=0,..,m
risultato non dimostrato:
p(0) è il polinomio di interpolazione calcolato in p(0) è una approssimazione dell'integrale di a,b f(x) dx molto più precisa rispetto alle singole formule dei trapezi In0 In1,Inm
![[Pasted image 20260714104259.png|424]]
con m=2 p(0) è una approssimazione dell'integrale molto più valida di In2 In1 In0
la funzione in rosso invece è y=p(x)
la procedura di valutare in 0 il polinomio di interpolazione p(x) si chiama estrapolazione perchè p(x) viene valutato in un punto 0 che sta fuori dal più piccolo intervallo che contiene i nodi h0 quadro h1 quadro fino ad hm quadro
p(0) è detto valore estrapolato
Quindi il polinomio ppp non approssima la funzione originale fff. Approssima il comportamento delle approssimazioni InI_nIn​ al variare di h2h^2h2.
Perché:

x=h2.x=h^2.x=h2.

Se valuto in:

x=0,x=0,x=0,

sto immaginando:

h2=0h^2=0h2=0

cioè:

h=0.h=0.h=0.

Ma h=0h=0h=0 significherebbe avere intervallini infinitamente piccoli, cioè un numero infinito di trapezi.

In quel caso l’approssimazione dei trapezi dovrebbe diventare l’integrale vero:

lim⁡h→0In=∫abf(x) dx.\lim_{h\to0} I_n = \int_a^b f(x)\,dx.h→0lim​In​=∫ab​f(x)dx.

Quindi p(0)p(0)p(0) cerca di prevedere quale sarebbe il valore dell’integrale nel caso ideale h=0h=0h=0.
Infine valutiamo questo polinomio in 000, cioè nel caso ideale h=0h=0h=0. Il valore p(0)p(0)p(0) fornisce una stima più accurata dell’integrale ver
dall'esempio 2.4 alla fine realizziamo che
Osservazione. Il risultato ottenuto nel punto (d) mostra che, per garantire mediante la formula dei trapezi In un’approssimazione di I con una precisione ε = 1.3 · 10−9 pari a quella fornita da p(0), occorre prendere n = 123114 molto grande. Non vale quindi la pena calcolare In per un n così grande, considerato che la stessa precisione può essere molto più facilmente ottenuta calcolando prima I12, I24, I30 e poi il valore estrapolato p(0) come abbiamo fatto nei punti (b)–(c) di questo esempio.
#### Richiami delle matrici di algebra lineare
- calcolo dei detetrminanti
	- ripassiamo il metodo di laplace per i determinanti
- teorema di binet il det(AB)=det(a)det(B) per ogni A,B in C nxn
- altro teorema det(A)=det(A^T) per ogni A in C nxn
- fa un esempio per cui la matrice ha determinante nullo
	- usiamo binet
- traccia, determinante, raggio spettrale e autovalori
	- per noi gli autovalori di una matrice nxn sono valutati in base al numero di volte pari alla sua molteplicità algebrica, quindi sono massimo n
- viene definita la traccia come la somma degli elementi in diagonale, coincide con la somma degli autovalori considerati con la molteplicità
- il determinante di una matrice è il prodotto delle molteplicità degli autovalori
- il raggio spettrale di A è \ro(A)=max dei moduli degli autovalori lambda di A
- cosa si intende per modulo di lambda1 lambda 2 ecc...
	- sarebbe la distanza dallo 0 quindi la lunghezza del segmento
- si sfrutta la traccia per capire se una matrice possiede almeno un autovalore lambda non reale cioè che la parte immaginaria di lambda é diversa da 0
- dimostrare che A possiede almeno un autovalore lambda non reale mu con parte reale <=-2
- notiamo che la traccia di A è -8+i nell'esempio del prof, quindi non è reale
	- la somma degli autovalori deve per forza esistere almeno un autovalore di A non reale
	- Deve esistere per forza almeno un autovalore μ con parte reale minore o uguale a −2, perché se tutti  gli autovalori λ1, λ2, λ3, λ4 avessero parte reale maggiore di −2 allora la traccia avrebbe parte reale maggiore di −8:  Re(traccia(A)) = Re(λ1 + λ2 + λ3 + λ4)  = Re(λ1) + Re(λ2) + Re(λ3) + Re(λ4)  > −2 + (−2) + (−2) + (−2) = −8.
	- ma noi abbiamo visto che il max è -8
- matrici invertibili
	- A i C nxn si dice invertibile se esiste una matrice B in C nxn tale che AB=BA=I
	- in tal caso la marice B è univocamente determinata e si chiama inversa di A denotata con A alla -1
	- una matrice A si dice invertibile se sei l determinante di A è diverso da 0 se e solo se 0 non è un autovalore di A 
		- poiché il determinante è il prodotto degli autovalori
	- AB è invertibile se e solo se A e B sono invertibili poichè det(AB)=det(A)det(B)
	- l’inversa in tal caso è (AB)−1 = B−1A−1
	- per trovare l'inversa usiamo il metodo con 1/det(A) per i determinanti di A
	- facendo scorrere i vettori della base canonica e ricopiando la matrice, poi calcoliamo il determinante
- matrice diagonalizzabili
	- una matrice A in C nxn si dice diagonalizzabile se esistono una matrice invertibile X in C nxn e una matrice diagonale D in C nxn t.c A=XDX^-1
	- oss importante da esame
		- se indichiamo con lambda 1 lambda n gli elementi diagonali di A e con x1 xn le colonne della matrice X allora nella formula precedente è scritto che per ogni i che va da 1 a n lambda i è un autovalore di A con corrispondente autovettore xi
		- dimostrazione
			- quando incontriamo una scrittura di quel tipo come la formula c'è scritto che le colonne di x sono gli autovettori di A gli elementi di D sono autovalori di A 
			- hanno un ordine ben preciso con corrispondenza ordinata rispetto gli autovalori e gli autovettori
			- moltiplichiamo la formula di entrambi i membri per X
				- AX=XD
				- adesso guardiamo questa equazione column wise quindi colonna per colonna
				- queste sono due matrici e XD è una matrice in C nxn 
				- quando le colonne sono uguali queste due cose sono uguali
				- ogni colonna di AX è uguale alla corrispondente colonna di XD dunque per ogni i da 1 fino a n si ha che AX^i=XD^i
				- cosa è AX^1 e cosa è XD^1?
				- pensiamo al prodotto righe per colonne per le matrici
				- per ottenere la prima colonna facciamo riga per colonna
				- la prima colonna di AX è tutta A per la prima colonna di X 
					- che sarebbe x1
				- e poi XD 1 sarebbe XD per la prima colonna di D ma la prima colonna di D ha tutti zeri quindi l'unico che sopravvive è lambda1x1 
				- quindi la nostra assegnazione per i=1 ci dice che 
				- Ax1=lambda1x1
					- cioè abbiamo la definizione di autovalore ovvero che lambda1 è un autovalore di A con autovettore x1
				- con lo stesso ragionamento si dimostra che Axi=lambdaixi per ogni i che va da 1 a n
				- infatti lambdai è un autovalore corrispondente dell'autovettore di xi
- Matrici hermitiane e simmetriche
	- data A in C nxn indichiamo con A* la trasposta coniugata di A
		- ricordando che il coniugato di un numero complesso è
		- per ogni z in C z=alfa+iB
		- z coniugato è alfa-iBeta
	- la trasposta di una matrice coniugata andiamo a fare la trasposta e poi coniughiamo gli elementi come sopra
	- la trasposta di un prodotto funziona come l'inversa 
	- AB trasposto è uguale a B trasposto A trasposto
	- quindi i trasposto coniugato vale uguale AB coniugato trasposto quindi $*$= B* A*
	- per ogni coppia di matrici moltiplicabili A,B
	- A in C nxn si dice hermitiana se A*=A 
	- Oss. 
		- se le componenti di A sono reali allora A è hermitiana se AT=A cioè se e solo se é simmetrica
	- Oss.
		- gli elementi diagonali di una matrice hermitiana sono reali perchè sono uguali ai loro coniugati per definizione di matrici Hermitiane
	- Oss.
		- gli autovalori di una matrice hermitiana sono reali
		- dimostrazione
		- sia A in C nxn harmitiana e sia lambda un suo autovalore generico
		- allora esiste un autovettore sia x in C n \{0} un autovettore associato a lambda
		- Ax=lambdax
		- x* sarebbe= vettore riga di x ma anche coniugato
		- posso moltiplicare entrambi i membri per x* 
		- x*Ax=x*lambdax
		- Ax era un vettore colonna
		- x*Ax è uno scalare 
		- qui abbiamo una uguaglianza tra 2 scalari
		- porto fuori lambda e posso scrivere x*x come scalare quindi metterlo come
		- lambda che moltiplica i=1 a n di xi coniugato xi
		- cosa succede se facciamo un valore per il suo coniugato?
		- avremmo a+iB e a-iB quindi viene il modulo al quadrato
		- quindi dentro la sommatoria mettiamo il modulo al quadrato
		- è un numero strettamente positivo quindi lambda=x*Ax/sommatoria che va da 1 a n di moudulo di xi al quadrato
		- se ho un numero reale diviso un numero positivo allora ne ho uno reale
		- dimostriamo che x*Ax è reale
		- quale è il complesso coniugato di tutto x*Ax coincide con il numero x*Ax tutto coniugato e trasposto
		- quindi (xy)*=y*x*
		- ottenendo perciò x*A*(x*)*=x*Ax 
		- un numero complesso coniugato a se stesso è reale 
#### Matrici definite positive
A in C nxn si dice dice definita postiva se Re(x*Ax)>0 per ogni x in Cn\{0}
dove Re sta per rappresentazione reale
osserviamo che per ogni A in C nxn e per ogni x in Cn
la parte reale Re(x*Ax) sarebbe z+z coniugato/2 uguale ad alfa
quindi Re(x*Ax)=x*Ax+x*Ax coniugato/2=x*Ax+x*A*x/2
raccogliamo per x* 
e abbiamo questo
la matrice tra x* e x è la matrice parte Reale di A
la parte immagiaria di A Im(A) è A-A*/2i perchè la parte immaginaria di 2 valori è z-z coniugato/2i 
partendo sempre dal fatto che z coniugato di z= alfa-iB per alfa+iB
Oss. Re(A) e Im(A) sono sempre matrici hermitiane dim=esercizio usate questa 
Lo si dimostri per esercizio sfruttando il fatto che (αB)∗ = αB∗ per ogni α ∈ C e ogni matrice B.
A in C nxn è definita positiva se e solo se la parte reale di x*AX>0 per ogn x in C n tranne 0
è la stessa cosa di dire che x*Re(A)x>0 per ogni x in C n tranne 0
è come dire Re(x*Re(A)x)>0 per ogni x in Cn tranne 0
sto dicendo quindi che la parte reale di A è definita positiva per definizione
ovvero è un amatrice che ha parte Re(x*Ax)>0 per ogni x in Cn
quindi A è definita positiva è come dire che la sua parte reale Re(A) è definita positiva
ricordiamo che la parte reale di A è sempre harmitiana

Proprietà
se A è in C nxn è definita positiva allora i suoi autovalori hanno parte reale positiva e di conseguenza A è invertibile perchè 0 non è un autovalore di A
Dimostrazione
Sia A in C nxn definita positiva e sia lambda un generico autovalore di A allora preso x in C n tranne 0 autovttore di A associato a lambda allora si ha Ax=lambdax
moltiplico per x* e avrò x*Ax=x*(lambdax)=lambda della sommatoria di i che va da 1 a n di xi coniugato per xi= lambda della sommatoria del modulo di xi al quadrato
per cui lambda= x*Ax/sommatoria di i che va da1 a n di xi modulo al quadrato
sappiamo che la parte al numeratore ha parte reale positiva e che sotto è >0
al numeratore 
la parte reale di lambda è uguale a Re(x*Ax)/la sommatoria di i che va da 1 a n di modulo xi al quadrato
che è >0
questo perchè sappiamo che definita z=alfa+iB con alfa>0 abbiamo che z/r=alfa/r+iB/r
dove dividiamo tutto per un r che rappresenta un reale positivo
serve per dire che se un numero complesso ha parte reale positiva, allora anche dividendo per un numero reale positivo, la parte reale resta positiva.
##### Teorema
sia A in C nxn una matrice hermitiana e siano A1=[a11], A2=[a11 a12 a21 a22], A3=[a11 a1 ] 
scrivile come matrici fino ad An=A
queste sono definite come le principali sottomatrici di testa di A
sapendo che A è definito come la matrice che va da a11 fino ad ann
allora le seguenti condizioni sono equivalenti:
1. A è definita positiva
2. x*Ax>0 per ogni x in Cn tranne 0
3. gli autovalori di A sono reali e positivi
4. det(Ak)>0 per ogni k che va da 1 a n
MI RACCOMANDO QUESTO VALE SOLO SE LA MATRICE È HERMITIANA
ma ricordiamo che una matrice A è definita positiva se solo se la sua parte reale è positiva
lo applico alla parte reale o alla matrice se è hermitiana (spiega meglio questa cosa)
il prof ha chiesto di dimostrare che 1<=>2 e che 1=>3 
ricordiamo che Re(A)=A+A*/2
##### Polinomi di matrici
sia p(lambda) un polinomo =a0+a1lambda+a2lambda2+...+amlambdam
- al posto di avere x mettiamo lambda perchè lavoriamo con matrici ma andava bene anche x
e sia A in Cnxn una matrice
Definiamo
p(A)=a0I+a1A+a2Aquadro+...+amA allam in C nxn
sto sommando delle matrici nxn per degli scalari, rimane comunque in totale una matrice nxn
##### Teorema
Sia p(lambda) un polinomio e sia A in C nxn una matrice con autovalori da lambda1 a lambda n
allora gli autovalori di p(A) sono p(lambda1),...,p(lambdan)
- gli autovalori del polinomio di p(A) sono le valutazioni del polinomio di p(lambda1)...p(lambdan)
Dimostriamo questo teorema in 3 casi
- caso 1
	- p(lambda)=a0 è costante in tal caso p(A)=a0I=>gli autovalori di p(A) sono a0,...,a0 n volte= p(lambda1),...,p(lambdan) sono tutti a0 perchè quello che restituisce p(lambda) è sempre a0 indipendentemente da lambda
		- perchè abbiamo una matrice diagonale, infatti è quella identità e quindi gli autovalori di una matrice diagonale sono proprio tutti a0
piccola spiegazione aggiuntiva da integrare al caso 1 in formato breve:
Adesso chiediamoci: quali sono gli autovalori di

a0I?a_0I?a0​I?

Ricorda la definizione: λ\lambdaλ è autovalore di una matrice BBB se esiste un vettore v≠0v\neq0v=0 tale che:

Bv=λv.Bv=\lambda v.Bv=λv.

Nel nostro caso:

B=a0I.B=a_0I.B=a0​I.

Allora:

Bv=a0Iv.Bv=a_0Iv.Bv=a0​Iv.

Ma la matrice identità lascia invariato ogni vettore:

Iv=v.Iv=v.Iv=v.

Quindi:

a0Iv=a0v.a_0Iv=a_0v.a0​Iv=a0​v.

Questo ha esattamente la forma:

Bv=λv.Bv=\lambda v.Bv=λv.
- caso 2
	- p(lambda)=a0+a1lambda ha grado 1 rispetto a prima che era grado 0
	- in tal caso il polinomio caratteristico di p(A) e quello di A sono legati dalla seguente relazione
	- per ogni lambda in C il polinomio caratteristico C_{p(A)}(lambda)=det(lambdaI-p(A))=det(lambdaI-(a0I+a1A)) raccolgo per I = det((lambda-a0)I-a1A)=det(a1(lambda-A0/a1I-A))
	- ricordiamo che per ogni a in C e per ogni B in C nxn abbiamo che det(aB)=a^ndet(B)
	- quindi a1 alla n det(lambda-a0/a1I-A))
	- vediamo quel lambda-a0/a1 come una possibile variabile del polinomio caratteristico di A 
	- quindi abbiamo che questo è uguale a a1alla n per CA(lambda-a0/a1)
	- gli autovalori di p(A) sono {lambda in C:Cp(A)lambda=0}={lambda in C:CA(lambda-a0/a1)=0}
	- il polinomio caratteristico si annulla quando lambda deve essere uno degli autovalori di A
	- quindi {lambda in C:lambda-a0/a1=lambda1,...,lambdan}={lambda in C:lambda=a0+a1lambda1,a0+a1lambda2,...,a0+a1lambdan}={a0+a1lambda1,a0+a1lambda2,...,a0+a1lambdan}=p(lambda1),p(lambda2),...,p(lambdan)
- caso 3
	- assumendo A diagonalizzabile allora esiste matrice X in Cnxn e esiste una matrice D=diag(lambda1,..,lambdan) in diagonale con gli autovalori di A
	- t.c A=XDX alla meno 1
	- A quadro sarebbe= XDX alla-1 XDX alla-1= XDquadroX alla -1
	- A cubo sarebbe scrivi tu cosa sarebbe
	- A alla k avremmo XD alla k X alla -1 per ogni k>=0
	- vogliamo dimostrare che sia p(lambda)=a0+a1lambda+amlambda alla m
	- il polinomio nelle ipotesi del teorema è p(A)=a0I+a1A+a2A quadro+...+amA alla m
	- sostituendo le A come le conosciamo scriviamo p(A)= scrivi tu come sarebbe
	- raccogliamo per x alla -1 e x la cosa al centro sarebbe uguale a p(D) 
	- p(D) per definizione è a0I+a1D+...+amD alla m=a0 [matrice identità]+a1[matrice D mettila qui]+a2[matrice con D al quadrato]+...+am[matrice con D alla m]
	- facciamo la somma di queste matrici avremmo [scrivi qui la matrice con i puntini puntini]
	- il primo elemento di questa matrice è p(lambda1) e alla fine abbiamo p(lambdan)
	- ora abbiamo dimostrato che p(A)=Xp(D)X alla -1
	- in questa formula stiamo dicendo diverse cose, p(A) è diagonalizzabile, gli elementi diagonali di p(D) sono gli autovalori di p(A) le colonne di X sono gli autovettori di p(A)
	- dal punto 2 segue quindi che gli autovalori di p(A) sono p(lamda1) p(lambda2),...,p(lambdan)
