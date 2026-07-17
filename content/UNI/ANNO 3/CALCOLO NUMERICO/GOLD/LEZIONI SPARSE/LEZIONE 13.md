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
