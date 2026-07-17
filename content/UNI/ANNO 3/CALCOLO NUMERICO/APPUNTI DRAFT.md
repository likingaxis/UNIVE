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
#### Matrici irriducibili
Ripasso rapido su definizione di grafo
è un diagramma formato da un certo numero di nodi e da un certo numero di archi
un arco è una freccia che va da un nodo a un'altro in modo orientato
se il grafo possiede n nodi, essi vengono denotati con 1,..,n
l'arco che va da i a j viene denotato con la freccia che va da i a j
un cammino all'interno di un grafo è un percorso che parte da un nodo i e arriva ad un nodo j seguendo gli archi del grafo se il nodo di arrivo j coincide con il nodo di partenza i allora il cammino si chiama anche ciclo
- un grafo fortemente connesso se vale una delle seguenti 2 condizioni equivalenti
	- 1. per ogni coppia di nodi i e j esiste un cammino nel grafo che va da i a j
	- 2. esiste un ciclo nel grafo che tocca tutti i nodi
Ex: dimostrare l'equivalenza quindi che 1<=>2
![[Pasted image 20260715111953.png]]
il grafo a sinistra è fortemente connesso
il grafo a destra non è fortemente connesso
##### Definizione di grafo associato a una matrice
data una certa matrice A in C nxn il grafo associato ad A è il grafo così definito
- i nodi sono 1,2,...,n
- gli archi ovvero le frecce le frecce i->j t.c aij neq 0
def A i C nxn si dice irriducibile se il suo grafo associato è fortemente connesso
#### Localizzazione degli autovalori
C(z0,r)={z in C:modulo x-z0<=r}= cerchio in C di centro z0 in C e raggio r>=0
ricordiamo che il modulo z-z0 è la distanza tra z e z0
quindi denotiamo tutti gli elementi che stanno dentro il cerchio
![[Pasted image (9).png|378]]
Diamo ora una definizione
Data A in C nxn, i cerchi di gershgorin (G) di A sono i cerchi K1,..,Kn definiti nel modo seguente:
per ogni i da 1 a n 
Ki=C(aii,somma j=1 a n tranne i di modulo di aij) 
quindi C con centro aii e raggio la somma 
i cerchi K1,Kn si chiamano anche cerchi di G per riga di A
esistono anche i cerchi per colonna H1,..,Hn dove al posto di aver fissato i di aij fisso i e metto aji
#### Teorema 3.3 primo teorema di Gershgorin
Gli autovalori di una matrice A in C nxn stanno tutti nell'unione dei cerchi di gershgorin di A
questo si dice localizzazione, ho identificato uno spazio dove al suo interno di sono tutti gli autovalori
Dim
sia lambda un autovalore di A. Mostriamo che lambda appartiene ad almeno un cerchio di G di A
e quindi sta nell'unione dei cerchi
siccome lambda è autovalore esiste u!=0 autovettore corrispondende
cioè Au=lambdau
due vettori sono uguali quando Au=lambdau <=> Aui=lambdaui per ogni i che va da 1 a n <=>sommatoria che va da j=1 a n aij per uj=scalare che moltiplica un vettore lambda per ui per ogni i da 1 a n
scelgo l'indice i0 in {1,..,n} t.c ui0 è una componente di modulo massimo quindi modulo di ui0 è il massimo tra u1 u2,...,un tutti a modulo
per i=i0 la sommatoria di j che va da 1 a n di aij uj=lambdaui per ogni i che va da 1 a n
ci dice che quella con i0 è uguale a lambda ui0 => lambda-ai0i0 per ui0
abbiamo tirato fuori dalla sommatoria il termine con j=i0 questo uguale alla sommatoria di j che va da 1 a n di j!=i0 di ai0juj
=> sapendo che modulo di alfa beta= modulo alfa per modulo di beta per ogni alfa beta in C abbiamo che modulo di alfa-ai0i0 per modulo ui0 è uguale al moudlo della sommatoria
usiamo la disuguaglianza triangolare ovvero per ogni afa1 alfa n in C il modulo della sommatoria che va da k=1 a n di alfak è minore uguale di k=1 a n di modlo di alfak
questo quindi è <= di sommatoria di j che va da 1 a j per j!=i0 n del modulo di ai0j per modulo di uj
sapendo che il modulo di uj è minore uguale del modulo di ui0 
quindi mettiamo minore uguale e mettiamo ui0
portiamo fuori modulo di ui0 e metiamo la sommatoria
visto che il vettore u è diverso da zero possiamo vedere la scelta di modulo di ui0 come las celda del max ma il max è diverso da 0
quindi lo semplifichiamo 
in conclusione
modulo di lambda -ai0i0 è minore uguale della sommatoria che va da j=1 a n per j!=j0 di modulo di ai0j
ai0i0 sarebbe il centro di Ki0 la sommatoria invece è il raggio
il modulo di lambda-ai0i0 sarebbe la distanza di lambda ai0i0
quindi lambda dista dal centro per una quantità minore del raggio quindi lambda appartiene a Ki0
#### Teorema 3.4 secondo teorema di Gershgorin
supponiamo che l'unione di K cerchi di G di A sia disgiunta dall'unione degli altri n-k
alora
k autovalori di A stanno nella prima unione e n-k stanno nella seconda unione
Esempio 
poniamo dia vere n=3 per cui 2 cerchi sono uniti e uno è fuori
allora quello fuori ha 1 autovalore e quelli dentro ne hanno 2
#### Teorema 3.5 terzo teorema di Gershgorin(forte)
supponiamo che A in C nxn sia irriducibile allora i punti che stanno sul bordo di quei cerchi di Gershgorin a cui appartengono ma non sul bordo di tutti i cerchi non sono autovalori di A
spiega bene la cosa dei punti sul bordo che non ho ben capito
il prof ha fatto una rappresentazione di questo ma alla lavagna quindi se puoi scrivermi tu un esempio sarebbe ottimo
![[Pasted image (12).png]]
ho trovato questa foto me la faccio spiegare da chat gpt e poi tu la spieghi bene
Supponiamo n=3n=3n=3, quindi abbiamo tre cerchi:

K1,K2,K3.K_1,\quad K_2,\quad K_3.K1​,K2​,K3​.

Immagina questa situazione:

- K1K_1K1​ e K2K_2K2​ si intersecano;
- K3K_3K3​ è separato dagli altri;
- AAA è irriducibile.

Graficamente:

K1∩K2≠∅,K_1\cap K_2 \neq \varnothing,K1​∩K2​=∅,

ma

K3K_3K3​

è lontano.

Per il secondo teorema di Gershgorin, se K1∪K2K_1\cup K_2K1​∪K2​ è una componente separata contenente due cerchi, allora dentro quella regione ci sono due autovalori.
Dentro K3K_3K3​ c’è un autovalore.

Questo è il senso del disegno del prof:

- la regione formata da K1K_1K1​ e K2K_2K2​ contiene 222 autovalori;
- il cerchio K3K_3K3​ isolato contiene 111 autovalore.
Supponi che un punto zzz sia sul bordo di K1K_1K1​, ma non sul bordo di K2K_2K2​ e non sul bordo di K3K_3K3​.

Per esempio:

z∈∂K1z\in \partial K_1z∈∂K1​

ma

z∉∂K2,z∉∂K3.z\notin \partial K_2,\qquad z\notin \partial K_3.z∈/∂K2​,z∈/∂K3​.

Allora, se AAA è irriducibile, quel punto **non può essere un autovalore**.

Anche se sta nell’unione dei cerchi.
mmagina tre cerchi che si toccano in un punto rosso.

Tipo:

K1, K2, K3K_1,\ K_2,\ K_3K1​, K2​, K3​

e il punto rosso sta contemporaneamente sui bordi di tutti e tre:

z∈∂K1∩∂K2∩∂K3.z\in \partial K_1\cap \partial K_2\cap \partial K_3.z∈∂K1​∩∂K2​∩∂K3​.

Allora il terzo teorema **non esclude** che quel punto sia autovalore.

Attenzione: non dice che sicuramente è autovalore.

Dice solo:

potrebbe esserlo.\text{potrebbe esserlo.}potrebbe esserlo.

Perché soddisfa la condizione necessaria: se è sul bordo, è sul bordo di tutti.

Invece, se un punto sta sul bordo solo di K1K_1K1​ e K2K_2K2​, ma non di K3K_3K3​, allora non può essere autovalore.



il prof ha detto che si accontenta che sappiamo definire l'enunciato del teorema


#### Teorema 3.6 Terzo teorema di Gershgorin(debole)
supponiamo che A in C nxn sia irriducibile e sia B il bordo dell'unione dei cerchi
allora i punti di B che non stanno sul bordo di tutti i cerchi non sono autovalori di A:
in questo esempio qua sotto nessuno può essere un autovalore di A
![[Pasted image (13).png|312]]
- recap di come si definisce una matrice irriducibile

Osservazione 3.1. Gli autovalori di una matrice A ∈ Cn×n e della sua trasposta AT coincidono perché i polinomi caratteristici di A e AT coincidono:  CAT (λ) = det(λI − AT ) = det((λI − A)T ) = det(λI − A) = CA(λ).  Di conseguenza, possiamo applicare i teoremi di Gershgorin non solo ad A ma anche ad AT per ottenere localizzazioni migliori degli autovalori di A. In particolare, il primo teorema di Gershgorin applicato ad A e AT ci dice la cosa seguente.
Di conseguenza, possiamo applicare i teoremi di Gershgorin non solo ad A ma anche ad AT per ottenere localizzazioni migliori degli autovalori di A. In particolare, il primo teorema di Gershgorin applicato ad A e AT ci dice la cosa seguente.  Gli autovalori di una matrice A ∈ Cn×n stanno tutti sia nell’unione dei cerchi di Gershgorin K1, . . . , Kn di A sia nell’unione dei cerchi di Gershgorin H1, . . . , Hn di AT , per cui stanno nell’intersezione delle due unioni (K1 ∪ · · · ∪ Kn) ∩ (H1 ∪ · · · ∪ Hn).  Notiamo che i cerchi di Gershgorin H1, . . . , Hn di AT sono semplicemente i cerchi di Gershgorin per colonna di A, in quanto le righe di AT sono le colonne di A. Pertanto, il risultato precedente può anche essere enunciato nel modo seguente.  Gli autovalori di una matrice A ∈ Cn×n stanno tutti sia nell’unione dei cerchi di Gershgorin per riga K1, . . . , Kn di A sia nell’unione dei cerchi di Gershgorin per colonna H1, . . . , Hn di A, per cui stanno nell’intersezione delle due unioni (K1 ∪ · · · ∪ Kn) ∩ (H1 ∪ · · · ∪ Hn).  Osserviamo inoltre, in vista dell’applicazione del terzo teorema di Gershgorin, che una matrice A è irriducibile se e solo se la sua trasposta AT è irriducibile (Esercizio 3.8
### Matrice a diagonale dominante e a diagonale dominante in senso stretto
Sia A in C nxn una matrice
si dice che A è a diagonale dominante per righe se:
- 1.
	 - modulo di aii >= sommatoria di j che va da 1 a n di j diverso da i modulo aij per ogni i che va da 1 a n
	 - la distanza del centro Ki è maggiore uguale del raggio
	- questa condizione si esprime anche dicendo che nessun cerchio di gershgorin di A contiene lo 0 al suo interno
	- Infatti nel piano complesso il modulo
	- ∣aii∣|a_{ii}|∣aii​∣
	- è proprio la distanza di aiia_{ii}aii​ dall’origine.
![[Pasted image (16).png]]
- 2.
	- esiste almeno un indice k in 1 n interno
	- tale che modulo di akk > sommatoria di j=1 n con j!=k modulo akj questa condizione si esprime anche dicendo che esiste almeno un cerchio di gershgorin di A che non contiene lo 0

- si dice che A è diagonale dominante in senso stretto (per righe)
- se modulo di aii è maggiore della somma j=1 j!=i che va a n di modulo di aij per ogni i che va da 1 a n
	- quindi nessun cerchio di G di a contiene solo lo 0

per colonne specifichiamo invece che
si dice che A è diagonale dominante per colonne se
- modulo ajj >= somma che va da i=1 a n con i diverso da j modulo aij per ogni j che va da 1 a n
	- ovviamente questo vale per i cerchi per colonna
- esiste almeno un indice K in 1,...,n tale che modulo di akk > della somma di i che va da 1 a n con i diverso da k di modulo di aik
in senso stretto per colonne si dice che A è diagonale dominante se
- modulo di ajj > sommatoria di i che va da 1 a n con i diverso da j del modulo di aij per ogni j che va da 1 a n
#### Teorema 3.7
supponiamo che la matrice A in C nxn soddisfi almeno una delle seguenti condizioni
1. A è a diagonale dominante e irriducibile
2. A è a diagonale dominante in senso stretto per righe
3. A è a diagonale dominante per colonne e irriducibile
4. A è a diagonale dominante in senso stretto per colonne
Allora A è invertibile
Dimostriamo la prima ipotesi, scrivimi tu la dimostrazione anche per gli altri casi
supponiamo che A sia a diagonale dominante e irriducibile
Dimostriamo che 0 non è autovalore di A usando il 3 teorema di Gershgorin forte
per farlo verifichiamo che 0 soddisfa le ipotesi del 3 teorema di gershgorin
- 0 sta sul bordo di quei cerchi di Gershgorin a cui esso appartiene
	- è vero per via della condizione a della definizione di matrice a diagonale dominante la quale ci assicura che 0 non può stare dentro nessun cerchio
- 0 non sta sul bordo di tutti i cerchi
	- vero per via della condizione b della definizione di matrice a diagonale dominante
- sono soddisfatte le ipotesi del terzo teorema di Gershgorin forte quindi 0 non è autovalore di A
quindi A è invertibile
$$\square$$
Osservazione:
non possiamo utilizzare la versione debole del teorema di Gershgorin e questo viene spiegato con il seguente esempio
![[Pasted image (17).png]]
è a diagonale dominante e irriducibile (lo si verifichi per esercizio), e ha i cerchi di Gershgorin (sia per righe che per colonne) mostrati in Figura 3.4, per cui non riusciremmo a dimostrare che è invertibile (cioè che 0 non è un autovalore) usando la sola versione debole del terzo teorema di Gershgorin
#### Norme Vettoriali
consideriamo il seguente sistema lineare
    81 1 1 5 −1 1 −1 5       x1 x2 x3   =     26 7 7     la cui soluzione è x = [3, 1, 1]T . 
Supponiamo di aver ottenuto le seguenti approssimazioni di x
y=2.99972 1.00023 1.00030 
z=3.000027 0.99971 0.99955 
Come stabiliamo quale delle due è più vicina alla soluzione x?
Occorre un concetto di distanza sullo spazio dei vettori e misurare poi le distanze di y da x e di z da x
chi ha la distanza minore è la migliore approssimazione
###### Definizione informale di norma vettoriale
|| . || : C n -> R si dice norma vettoriale se soddisfa le seguenti proprietà:
a) norma di x >=0 per ogni x in Cn e norma di x=0 se e solo se x=0 questo caso si chiama positività
b) norma di alfa x= modulo di alfa per norma di x per ogni alfa in C per ogni x in Cn questo si chiama omogeneità
c) norma di x+y minore uguale di norma di x + norma di y per ogni x y in Cn questo si chiama disuguaglianza triangolare

se io devo misurare la distanza tra due numeri faccio la differenza e il modulo infatti
data una norma vettoriale norma da Cn in R 
definiamo la distanza fra 2 vettori x,y in Cn come la norma di x-y
###### Definiamo Norme 1,2 e infinito
dato x in Cn definiamo
norma di x1=modulo di x1+modulo di x2+...+modulo di xn
norma di x2= radice quadrata della somma dei quadrati dei modulo di x1+x2+ xn alla 2
norma di xinfinito= max(modulo x1,x2,...,xn)
tutte queste rispettano le proprietà precedenti

Le relative distanze sono definite nel modo seguente:  ‖x − y‖1 = |x1 − y1| + |x2 − y2| + . . . + |xn − yn|, ‖x − y‖2 = √|x1 − y1|2 + |x2 − y2|2 + . . . + |xn − yn|2, ‖x − y‖∞ = max(|x1 − y1|, |x2 − y2|, . . . , |xn − yn|).

Tornando all’esempio introduttivo, se calcoliamo la distanza dei vettori y e z in (3.6)–(3.7) dal vettore soluzione x = [3, 1, 1]T usando la ‖ · ‖∞, otteniamo  x − y = [0.00028, −0.00023, −0.00030]T =⇒ ‖x − y‖∞ = 0.00030, x − z = [−0.00027, 0.00029, 0.00045]T =⇒ ‖x − z‖∞ = 0.00045.  Quindi rispetto alla ‖ · ‖∞ il vettore y è più vicino a x rispetto al vettore z.
###### Equivalenza delle norme vettoriali
##### Teorema 3.8
Tutte le norme vettoriali in Cn sono equivalenti nel senso che se prendiamo due norme a caso
norma primo e norma secondo in cn->R
allora si ha che la norma primo di x è compreso tra la norma alfa per norma seconda di x e beta per norma seconda di x per ogni x in Cn
dove alfa e beta sono due costanti indipendenti da x
Verifichiamo che la norma 1 e la norma infinito sono equivalenti
per ogni x in Cn 
la norma 1 di x è la somma del modulo delle componenti e la mettiamo compresa tra
norma infinito e n volte la norma x infinito
mettendo al centro la norma 1 di x abbiamo che le costanti alfa e beta del teoremas ono alfa=1 e beta=n se considero come norma prima la norma 1 e norma seconda norma infinito
mentre sono alfa 1/n Beta 1 se considero la norma prima uguale a norma infinito e norma seconda norma 1
questo perchè se prendiamo la formula del teorema e la poniamo per norma seconda dobbiamo fare fratto alfa e beta e quindi abbiamo
scrivi
1/beta norma x primo<= norma x secondo<=1/alfa norma x primo
perchè alfa e beta sono 1 e n?

###### Successioni di Vettori
Una successione di vettori x 0 x1 x2 in Cn si dice convergente al vettore x in Cn
rispetto alla norma vettoriale norma se la distanza tra x k -x tende a 0 per k che tende a infinito
il teorema delle equivalenze delle norme di prima ci permette di dire che
poichè tutte le norme sono equivalenti per il teorema 3.8 precedente se una successione di vettori converge a x rispetto a una norma allora converge a x rispetto a tutte le norme
Dimostrazione
infatti supponiamo che xk k=0,1,2... converga a x rispetto alla norma norma e sia norma ' un'altra norma
allora poichè queste norme sono equivalenti 
poichè norma e norma primo sono equivalenti esistono due costanti alfa e beta positive
tali che la norma ' di y posso metterla compresa tra
alfa norma y e Bnorma y per ogni y in Cn
sostituisco xk-x al posto di y
e avrò una cosa che vale per ogni k
α‖x(k) − x‖ ≤ ‖x(k) − x‖′ ≤ β‖x(k) − x‖

il modulo di xk-x a destra e sinistra della cosa tendono a 0
per cui usiamo il teorema del sandwitch
anche la norma di xk-x primo tende a 0 
quindi xk tende a x in norma primo

Una successione di vettori si dice convergente
x0 x1 x2 in cn si dice convergente componente per componente
al vettore x in Cn se xk tende a x componente per componente
cioè se x1k-> x1

x2k->x2 
xnk->xn 

se e solo se 

x1k-x1 tende a 0 x1k -x1 tende a 0
... xnk-x1 tende a 0
allora è come dire che il massimo di questi tende a zero
che corrisponde alla norma di xk-x a infinito
che tende a 0
quindi la convergenza componente per componente coincide con la convergenza rispetto alla norma infinito
allora ricordando l'equivalenza di tutte le norme
dire x k->x componente per componente è lo stesso che dire che xk->x in una qualsiasi norma
#### Norme matriciali
Si vuole introdurre un concetto di distanza sullo spazio delle matrici per misurare la vicinanza tra due matrici A,B in C nxn
Definizione
Una funzione || . || : C nxn in R si dice norma matriciale se soddisfa le seguenti proprietà
a) norma di A maggiore uguale di 0 e norma di A =0 se e solo se A=0 positività
b) norma di alfa A= modulo di alfa per norma di A per ogni alfa in C per ogni A in Cnxn omoegeneità
c) norma A+B <= norma di A + norma di B per ogni A,B in C nxn disuguaglianza triangolare

Data una norma matriciale || . || : C nxn -> R definiamo la distanza fra due matrici A,B in C nxn 
come la norma di A-B
un modo intuitivo per definire una norma matriciale su C nxn consiste nell'interpretare una matrice A in C nxn come un vettore di n^2 componenti e usare come norma di A una delle norme vettoriali già usate per i vettori
Data A in C nxn definisco la norma infinito di A con una sola stanghetta che usa la norma dei vettori= max i,j che va da 1 a n modulo aij analoga della norma infinito per i vettori
Problema: questa norma infinito con una stanghetta sola non si comporta bene rispetto al prodotto di matrici, nel senso che non é sub moltiplicativa, date due matrici A,B in C nxn non è detto che valga norma AB infinito <=norma di A infinito per norma di B infinito
Ecco un esempio:  A=  [1 1 01  ]  , B=  [1 0 11  ]  , AB =  [2 1 11  ]  ,  |A|∞ = 1, |B|∞ = 1, |AB|∞ = 2.

una norma matriciale è anche definita così ma noi vogliamo una proprietà in più detta di sub additività ovvero quella definita sopra
#### Norme matriciali indotte
Definizione. Data una norma vettoriale con doppia stanghetta in C nxn e una matrice A in C nxn definiamo 
norma A=max x!=0 norma di Ax fratto norma di x dove x è in Cn tutti i vettori tranne lo zero
max di x in Cn x diverso da 0 
questo uguale al max x in Cn x diverso da 0 applichiamo la proprietà di omogeneità e avere norma di 1/norma di x per Ax
max x in Cn x diverso da 0 norma di A x/norma di x 
sapendo che A(alfax)=alfaAx

x/norma di x diventa y
quanto sarebbe la norma di y?
norma di x/norma di x= 1/norma x per norma x=1
quindi il massimo è al variare di y in Cn con norma di y=1 della norma di Ay
Si può dimostrare che || . || tale che C nxn -> R è una norma matriciale
che si chiama norma matriciale indotta dalla norma vettoriale con stessa norma
OSS. 
una norma matriciale indotta si denota sempre allo stesso modo con cui è stata indotta
##### Teorema 3.9
Sia ||.||: C nxn -> R una norma matriciale indotta dalla norma vettoriale denotata con lo stesso simbolo
e siano A,B in C nxn  valgono le seguenti proprietà:
1. la norma della matrice Identità vale 1 norma I=1
2. la norma di Ax<=norma di A per norma di x per ogni x in Cn
3. la norma di A è la più piccola costante C che soddisfa la proprietà del punto 2 quindi norma di Ax<= C norma di x per ogni x in Cn
4. norma di AB <= norma di A per norma di B submoltiplicatività
5. ro(A) ovvero il raggio spettrale di A è il massimo degli autovalori di A è <= norma di A
###### Soluzione
dimostriamo 1
norma di I=max x in Cn norma di x=1 norma di Ix è la norma di x ovvero =1
dimostriamo 2
per ogni x in Cn tranne vettore nullo si ha che la norma di Ax/norma di x<=max y in Cn con y diverso vettore nullo di norma di Ay/norma di y per definizione questa è la norma di A
moltiplico per norma di x per cui la norma di Ax <= norma di A per norma di x
per il vettore nullo faccio una vera e propria sostituzione
avremmo 0<=0
quindi dimostrato anche per l'unico vettore nullo x=0
dimostriamo 3
sia C una costante che soddisfa la norma di Ax<= C norma x per ogni vettore x in Cn
mostriamo che C è maggiore uguale della norma di A 
Da Ax<=C norma di x si ottiene dividendo per norma di x che per ogni vettore di x diverso dal vettore nullo
la norma di Ax/norma di x <= C per ogni x diverso dal vettore nullo
se vale per tutti gli x diversi dal vettore nullo quindi anche per il massimo
perciò max y in Cn y diverso da 0 norma di Ay/norma y <=C 
questa qui è esattamente la norma di A che è <= C 
dimostriamo 4
per ogni x in Cn si ha norma di Abx <= norma di A per norma di Bx<= norma di A per norma di B per norma di x
la applichiamo quindi 2 volte
quindi  norma di A per norma di B è una delle costanti C che soddisfano la disuguaglianza norma di Abx <= C norma x per ogni x in Cn
riprendendo la proprietà 3 e la 2
sapendo questo per la proprietà 3 la norma di Ab è la più piccola costante C che soddisfa 
norma di AB x <= C norma di x per ogni x in Cn
quindi la norma di Ab <= norma di A per la norma di B
dimostriamo 5
sia lambda un autovalore di A t.c modulo di lambda= ro(A)
e sia x diverso da vettore nullo un corrispondente autovettore
Ax=lambdax
abbiamo poi la norma di Ax= norma di lambda x
per omogeneità scriviamo= modulo di lambda normax = ro(A) norma di x
divido per norma di x e ottengo ro(A)= norma di Ax/ norma di x
questo è minore uguale del max di y in Cn y diverso da 0 di norma Ay/ norma y = norma di A
#### Norme vettoriali indotte 1,2, infinito
Le norme matriciali più importanti sono
norma A1= max x in Cn con x diverso vettore nullo con norma Ax1 fratto norma di x1
norma A2= max x in Cn x diverso da 0 norma Ax 2/norma x 2
norma A infinito=max x in Cn x diverso da 0 norma di Ax infinito/norma x infinito

##### Teorema 3.10
per ogni A in C nxn valgono le seguenti formule
norma di A 1= max j=1 n delle somme di i che va da 1 a n modulo di aij= max(‖A[1]‖1, ‖A[2]‖1, . . . , ‖A[n]‖1).
norma di A2= radice di ro(A per A)
norma infinito= max di i che va da 1 a n della sommatoria di j=1 n del modulo di aij= max(‖A[1]‖1, ‖A[2]‖1, . . . , ‖A[n]‖1).

A* rappresenta la trasposta
#### Equivalenza delle norme
##### Teorema 3.11
Tutte le norme matriciali, anche quelle indotte e non in Cnxn sono equivalenti nel senso che 
se prendiamo due norme matriciali norma primo e norma secondo da C nxn ->R allora si ha che la norma di A primo è compreso tra alfa norma di A secondo e Beta norma di A secondo per ogni A in C nxn dove alfa, beta>0 sono costanti indipendenti da A
#### Successioni di matrici
Una successione di matrici A0 A1 A2 ... in C nxn si dice convergente alla matrice A in C nxn
rispetto alla norma matriciale ||.|| se norma di A (k) -A tende a 0 dove (k) è l'indice della successione
siccome tutte le norme matriciali sono equivalenti, se una successione di matrici converge ad A rispetto a una norma allora converge ad A rispetto a tutte le norme
dimostrazione data per esercizio, ma fallo tu grazie

Una successione di matrici A0 A1 A2 ... in C nxn si dice convergente componente per componente
a una matrice A in c nxn se Ak ->A componente per componente
cioè se 

akij -> aij per ogni i,j che va da 1 a n dove a sono le componenti
se e solo se modulo di aijk -aij->0 per ogni i che va da 1 a n se e solo se max i,j che va da 1 a n modulo aijk-aij ->0 questa rappresenta proprio la norma delle matrici classica 
quindi norma di Ak-A infinito ->0
Quindi la convergenza componente per componente altro non è che la convergenza in norma infinito classica con una stanghetta sola
ricordando il teorema di equivalenza di tutte le norme dire che Ak ->A componente per componente è come dire che Ak-> A in una qualsiasi norma
##### Teorema 3.12
Sia A in C nxn allora 
Ak -> 0 ovvero la matrice nulla se e solo se ro(A)<1
dove per Ak qui si intende la potenza 
Dimostriamo nel caso di A in C nxn diagonalizzabile
allora esiste x in C nxn invertibile ed esiste D= diag( lambda1,lambdan)
diagonale avente sulla diagonale gli autovalori di A tali che la matrice A la posso scrivere come A=XDXalla meno 1
A2 sarà XDX-1per XDX -1 quindi qui abbiamo XDIDX-1= XD al quadrato per X -1
A3 sarà XD3X-1
Ak sarà XDkX-1
dimostriamo <=
supponiamo che raggio spettrale di A sia <1
allora applichiamo una norma indotta come quella infinito
ottengo che norma Ak infinito=norma XdkX-1 infinito per sub moltiplicatività abbiamo che <= norma X infinito per norma DkX-1 una seconda volta <=norma X infinito per norma Dk infinito per norma X-1 infinito
D alla k sono i valori in diagonale lambda alla k di D
quindi la norma di Dk di infinito è uguale al massimo delle righe quindi il massimo delle lambda perchè nelle righe c'è solo lambda
tiro fuori dal modulo alla k e quindi ho il massimo tra i vari lambda in modulo tutto alla k
il massimo dei lambda è proprio uguale al ro di A alla k
quindi abbiamo
norma di X infinito ro(A) alla k norma di X-1 infinito
il raggio spettrale di A per ipotesi era <1 per k che tende a infinito tende a 0
se avessimo raggio spettrale -2 avremmo una cosa che non tende a 0 ma il raggio spettrale è sempre positivo quindi ro(A alla k) tende a 0 per k che tende a infinito

quindi la norma di Ak infinito è compresa tra 0 e 0  per k che tende a infinito
quindi la norma di Ak infinito tende a 0
ora dimostriamo =>
supponiamo che A alla k ->matrice nulla
Ak=xDkX-1 se moltiplichiamo a sx e dx per X e X-1
X-1AkX=Dk
dimostrato prima che ro(A) allak è uguale a norma di Dk infinito è uguale a norma di x-1AkX infinito per sub moltiplicatività in 2 step <=norma di X-1 infinito per norma Ak infinito per norma di X infinito
norma di Ak infinito tende a 0 quindi ro Ak è compreso tra 0 e una cosa che tende a 0
quindi per il teorema del sandwitch ro(Ak) tende a 0
raggio spettrale di A <1 perchè il raggio spettrale di A compreso tra 0 e infinito
se fosse 1 tende a 1 se fosse più grande di 1 tende a infinito
quindi compreso tra 0 e 1 con 1 escluso quindi <1
$$\square$$
#### Metodi iterativi per risoluzione di sistemi lineari
È dato un sistema lineare Ax=b chiamato s
con b vettore in Cn e A in C nxn invertibile
se A è invertibile allora il sistema s ha unica soluzione per rouche capelli
x=A^-1b 
ci proponiamo di risolvere il sistema s con un metodo iterativo cioè un metodo che a partire da un vettore iniziale x0 scelto dall'utente costruisce una successione di vettori x0 x1 x2,... vogliamo che tale successione sia facile da costruire e converga a x il vettore soluzione del sistema s
componente per componente qualunque sia il vettore x0 scelto
Per risolvere s consideriamo solo metodi iterativi stazionari cioè metodi della forma
x0 in Cn dato 
xk+1=Pxk+q, k=0,1,2,... 
dove P in C nxn è una matrice fissata che si chiama matrice di iterazione e q è un vettore fissato in Cn
Osservazione:
sia xk k=0,1,2 ...
una successione generata dal metodo m e supponiamo che xk -> x infinito per k->infinito in Cn
allora x infinito= lim k->infinito di xk+1=lim k->infinito di P(x)k+q= Px infinito=q
per dimostrarlo vediamo la prima iterazione e la facciamo per k->infinito
Pxk+q 1 = Pxk1+q1=p11x1k+P12x2k+...+P1nxnk+q1 -> P11x1infinito+P12x2 infinito+...+P1nxninfinito+q1=Pxinfinito+q1
Dunque x infinito soddisfa l'equazione x infinito=Px infinito+q
conseguenza: se la soluzione x di s non soddisfa l'equazione del metodo x=Px+q
allora non c'è speranza che una successione generata dal metodo m converga a x
perché se avessi una successione generata da m che converge a x allora il ragionamento precedente mostra che x deve soddisfare l'equazione x=Px+q
questo si dice consistenza
Definizione di consistenza
il metodo m si dice consistente con il sistema s se la soluzione x di s
soddisfa l'equazione x=Px+q 

Def convergenza
il metodo m per risolvere il sistema S si dice convergente se per ogni scelta del vettore iniziale x0, la successione prodotta dal metodo xk k=0,1... generata dal metodo converge alla soluzione x di s
##### Teorema 4.1 (CNS) Condizione necessaria e sufficiente di convergenza
Supponiamo che il metodo m sia consistente con il sistema s, allora il metodo m è convergente se e solo se il raggio spettrale ro(P)<1
dimostriamo solo <=
supponiamo che ro(P)<1 
Dimostriamo che il metodo m è convergente
Dobbiamo dimostrare che la successione m converge alla soluzione x di s indipendentemente dalla scelta di x0
poichè m è consistente con s per ipotesi vale l'equazione x=Px+q (a)
inoltre ovviamente si ha che la successione generata dal metodo m soddisfa l'equazione del metodo
xk+1=Pxk+q per ogni k che va da 0,1,2 (b)

sottraendo membro a membro la b e la a si ottiene xk+1-x= P(xk-x) per ogni k=0,1,2...
mettiamo che quello prima dell'uguale è ek+1 e ek ovvero l'errore al passo k+1 e passo k
Dunque abbiamo ottenuto l'equazione dell'errore
ek+1=Pek per ogni k=0,1,2, ...  (e) 
sviluppiamo per ricorrenza la (e):
ek+1=Pek=P2ek-1=P3ek-2=...=Pk+1e0 per ogni k che va da 0,1,2...
controlliamo se vale per k anche uguale a 0
quindi ek=pke0 per ogni k=0,1,2,...
quindi vale 

per il teorema 3.12 Data P in C nxn si ha che Pk->0 se e solo se ro(P)<1

siccome r(P)<1 per ipotesi allora Pk->0 
quindi ek=pke0 -> 0e0=0
quindi xk-x->0 cioè xk->x
$$\square$$
##### Corollario 4.1 (CS Condizione sufficiente di convergenza)
Supponiamo che il metodo m sia consistente con s
se esiste una norma matriciale indotta ||.|| tale che ||P||<1 allora il metodo m è convergente
Dimostrazione
Siccome il ro(P)<= ||P||<1 deduciamo che il metodo è convergente per la CNS
##### Corollario 4.2(CN Condizioni necessarie di convergenza)
Supponiamo che il metodo m sia consistente con s
- se modulo traccia di p è >=n allora il metodo m non è convergente
- se modulo det(P)>=1 allora il metodo m non è convergente
Quindi le condizioni 
- modulo traccia P<n modulo det(P))<1
sono condizioni necessarie per la convergenza 
Dimostrazione
Supponiamo che il modulo della traccia di P >=n
- Allora esiste almeno un autovalore di P di modulo >=1
	- infatti se tutti gli autovalori lambda1,...lambdan di P fossero tutti di modulo <1 allora avremmo |traccia(P)|= somma del modulo degli autovalori <=modulo lambda1+...+modulo lambda n $<n$ per disuguaglianza triangolare
Esistendo un autovalore di P modulo >=1 si ha che ro(P)>=1 
=> il metodo m non è convergente per il teorema 4.1

la dimostrazione è identica per il determinante solo che cambia al posto di traccia uno scrive det e fa il prodotto e basta
