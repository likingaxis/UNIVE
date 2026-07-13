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
