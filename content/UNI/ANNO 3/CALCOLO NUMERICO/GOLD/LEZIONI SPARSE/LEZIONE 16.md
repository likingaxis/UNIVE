### Teoremi di convergenza Per Jacobi e Gauss Saidel
##### Teorema 4.3
Supponiamo che A in C nxn soddisfi almeno una delle seguenti condizioni:
- A è a diagonale dominante(per righe) e irriducibile
- A è a diagonale dominante per senso stretto
- A è a diagonale dominante per colonne e irriducibile
- A è a diagonale dominante in senso stretto per colonne
Allora i metodi di Jacobi e Gauss Seidel per risolvere un sistema lineare di matrice A sono convergenti
###### Osservazione
Se A in C nxn soddisfa almeno una delle 4 condizioni del teorema allora
- A è invertibile per Teorema 3.7
- Gli elementi diagonali di A sono diversi da 0
	- se per assurdo ce ne fosse uno uguale a 0 allora tutta la corrispondente riga o colonna sarebbe nulla perchè A è a diagonale dominante per righe o colonne
	- risulta essere impossibile perchè A è invertibile
Conclusione Se A soddisfa almeno una delle 4 condizioni del Teorema 4.3 allora i metodi di Jacobi e Gauss Saidel sono applicabili per risolvere un sistema lineare di matrice A

##### Dimostrazione Teorema 4.3
- lo dimostriamo intanto per il metodo di Gauss Seidel sotto l'ipotesi che A sia a diagonale dominante e irriducibile
	- per esercizio ci sono da fare gli altri 7 casi
Dobbiamo dimostrare che ro(G)<1 dove G=I-E-1A è la matrice d'iterazione di Gauss Saidel
Per l'oss Smart gli autovalori di G sono le soluzioni dell'eq det(lambdaE+A-E)=0 cioè le radici del polinomio
vediamo il polinomio nel caso n=4
det(λE + A − E) =  ∣ ∣ ∣ ∣ ∣ ∣ ∣ ∣ ∣ ∣ ∣  λa11 a12 a13 a14 λa21 λa22 a23 a24 λa31 λa32 λa33 a34 λa41 λa42 λa43 λa44  ∣ ∣ ∣ ∣ ∣ ∣ ∣ ∣ ∣ ∣ ∣  .

Vogliamo dimostrare che i moduli delle radici di questo polinomio siano tutti <1
Mostriamo che nessun numero lambda in C di modulo lambda>=1 può essere una radice del polinomio visto sopra con n=4
Sia dunque lambda in C un numero tale che il modulo di lambda >=1 allora la matrice lambdaE+A-E è a diagonale dominante e irriducibile esattamente come A
- lambdaE+A-E è irriducibile come A perchè ha gli eri nelle stesse posizioni di A quindi ha lo stesso grafo di A e quindi il suo grafo è fortemente connesso come quello di A
- lambdaE+A-E è a diagonale dominante come A
	- perché tutti gli elementi diagonali sono stati dilatati di un fattore lambda di modulo >=1
	- gli elementi extra diagonali sono rimasti invariati e altri invece dilatati per il fattore lambda
	- quindi la condizione di dominanza diagonale per lambdaE+A-E è soddisfatta su ogni riga i=1,...,n
Vediamo questa dimostrazione per calcoli
modulo di lambdaaii=modulo di lambda per modulo di aii>= modulo di lambda(modulo ai1+...+moduloai,i-1+modulo ai,i+1+...+modulo ain)) A è a diagonale dominante ma abbiamo escluso la diagonale(come mai?)
è uguale a lambda moltiplicato per ogni elemento della matrice con modulo
la parte dopo la diagonale quindi modulo di lambda modulo ai,i+1+...+modulo lambda modulo ain
è >= al modulo lambda ai1 +...+ modulo lambda ai,i-1 + modulo ai,i+1 + modulo ain
quindi la diagonale lambda aii è >= di tutte le altre righe tranne la diagonale
quindi la condizione di dominanza è valida ma prevedeva anche un'altra proprietà
deve anche esistere un indice sul quale la disuguaglianza vale con il > stretto
se su una certa riga valeva il maggiore stretto allora in quel caso la vale il maggiore stretto
Inoltre la disuguaglianza stretta vale per la matrice lambdaE+A-E sulle stesse righe per cui vale per A ad esempio se la disuguaglianza stretta valesse per A sulla riga i allora avremmo il maggiore stretto al posto del maggiore uguale
Dunque lambdaE+A-E è invertibile essendo a diagonale dominante e irriducibile
allora det(lambdaE+A-E ) diverso da 0 allora lambda non è una radice del polinomio della matrice
Conclusione, tutte le radici hanno modulo <1 cioè tutti gli autovalori di G hanno modulo <1
allora ro(G)<1
##### Teorema 4.4
Sia A in C nxn HDP(Hermitiana Definita Positiva)
Allora il metodo di Gauss Seidel per risolvere un sistema lineare di matrice A è convergente
###### Osservazione 
Se A in C nxn è HDP allora: 
- A è invertibile perchè i suoi autovalori sono reali e positivi quindi 0 non è autovalore di A
- per l'Esercizio 3.4 gli elementi diagonali di A sono positivi
ricorda: autovalori e diagonali sono diversi

##### Dimostriamo Teorema 4.4
Dobbiamo dimostrare che il raggio spettrale di G <1
dove G=I-E-1A è la matrice d'iterazione di Gauss Seidel
la dimostrazione si divide in 2 parti
###### Parte 1 
dimostriamo che $A-G*AG$ è HDP
$A-G*AG$ è hermitiana perchè $A-G*AG*$= $A*-(G*AG)*$ =A*-G*A*(G*)* 
è esattamente G anche A* è A perché hermitiana
quindi =A-G*AG 
con (xy)*=y*x* per ogni x,y matrici moltiplicabili
Dimostriamo che A-G*AG è definita positiva
A-G*AG=(A-I-E-1A)*A(I-E-1A)=A-(I-F)=A-A+F*A+AF-F*AF
F*(AF-1+F-*A-A)F
F*(E+E*-A)F

leggendo sotto sappiamo che E+E*=A+D
$F*DF$
abbiamo scoperto che la nostra matrice $A-G*AG=F*DF$

dunque per ogni y in Cn tranne 0
y*(A-G*AG)y=y*F*DFy =(Fy*)D(Fy)=u*Du con u=Fy diverso dal vettore nullo perchè F è invertibile per cui ker(F)={0} dunque Fy divero dal vettore nullo perchè anche y é diverso dal vettore nullo
quindi u* sarebbe [u1 coniugato ... un coniugato]
e D sarebbe [a11,...,ann] in diagonale con [u1,...,un] in colonna
facendo il prodotto abbiamo che
[u1 coniugato,...,un coniugato][a11 u1 a22u2 ... annun]= sommatoria di i che va da 1 a n di aii modulo ui 2 >0 perchè 
almeno una componente aii>0 per ogni i che va da 1 a n per esercizio 3.4
inoltre ui è diverso da 0 in in quanto u diverso da 0
il fatto che sia >0 quindi implica che A-G*AG è definita positiva per il toerema 3.1

dove F=E-1A notiamo inoltre che F è invertibile perchè prodotto di 2 matrici invertibili per Binet
e inoltre l'inversa di F-1=(E-1A)-1=A-1E
per ogni matrice F vale che F-1*=F*-1
Infatti F-1* é l'inversa di F* perchè $F-1*F*$=(FF-1)*= I*= I
F*(F-1)*=(F-1F)*=I*=I
in forza dell'uguaglianza blu si pone per definizione
F-*= F-1*=F*-1
dove F-* sta ad indicare che è uguale quale cosa fare prima
F-*A=(F-1)*A=(A-1E)*A=E*A-*A=E*A*-1A=E*A-1A=E*
A è hermitiana quindi A=[a11, a21 coniugato a31 coniugato ... continua tu]
vediamo anche E ed E*
possiamo concludere che E+E*=A+D
dove D=parte diagonale di A

###### Parte 2