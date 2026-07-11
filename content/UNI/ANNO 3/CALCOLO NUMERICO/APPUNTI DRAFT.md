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
