#### Procedura di costruzione di metodi iterativi mediante decomposizione della matrice
Vediamo una procedura generale per costruire metodi iterativi della forma m per risolvere il sistema s
Si considera una decomposizione della matrice
A=M-(M-A)
con M in C nxn invertibile detta precondizionatore
si osserva che il sistema
Ax=b si può scrivere come M-(M-A)x=B <=> Mx=(M-A)x+b<=>x=M-1(M-A)x+M-1b<=> x=x+M-1(b-Ax)
b-Ax lo chiamiamo r(x) che sarebbe il residuo infatti 
r(y)=b-Ay è il residuo in y per il sistema s con y in Cn
si definisce il metodo
x0 in Cn dato
si calcola xk+1 con i 2 metodi visti prima
xk+1=M-1(M-A)xk+M-1b 
xk+1=xk+M-1rk
k=0,1,2,...
dove rk è il residuo calcolato in xk=b-Axk
il metodo è della forma m con matrice di iterazione P=M-1(M-A)=I-M-1A
e q=M-1b

##### Teorema 4.2
questo metodo è consistente perchè mettendo x al posto di xk+1 otterremmo Ax=b per costruzione vedi sopra dove x è soluzione di s
questo metodo è convergente se e solo se ro(I-M-1A))<1
Osservazione(Smart):
Il polinomio caratteristico di I-M-1A è dato da CI-M-1A(lambda))=det(lambdaI-(I-M-1A))=det(lambdaI-I+M-1A)=det(M-1(lambdaM-M+A)) 
per Binet il det(M-1)det(lambdaM+A-M)
- il primo determinante è diverso da 0 perchè M è invertibile ma per essere invertibile deve avere det diverso da 0
quindi 
CI-M-1A(lambda)=0 <=>det(lambdaM+A-M)=0
il det è una equazione smart
per calcolare gli autovalori e il raggio spettrale di I-M-1A possiao risolvere l'equazione smart
evitando così di calcolare M-1 e I-M-1A
Oss.
l'iterazione k-esima del metodo viene calcolata con la formula blu xk+1=xk+M-1rk
e richiede il calcolo del vettore zk=M-1rk detto residuo precondizionato
il calcolo di zk si fa risolvendo il sistema lineare Mzk=rk e non calcolando M-1
cosa sconveniente dal punto di vista computazionale
ovviamente il sistema lineare Mzk=rk deve essere più rapido da risolvere del sistema originario
Ax=b altrimenti non converrebbe farlo
Oss.
Intuitivamente quanto più il precondizionatore M assomiglia alla matrice A tanto più il metodo convergerà velocemente
la sua velocità dipende dal raggio spettrale
se il raggio spettrale è I-M-1A<1 
infatti se M circa A allora intuitivamente M-A circa 0
M-1A circa I e M-1(M-A)=I-M-1A circa 0
per cui ci si aspetta un raggio spettrale piccolo
il caso limite è in cui M=A risulta I-M-1A=0 e il metodo converge in una unica iterazione alla soluzione esatta x
ma il problema è che questa unica iterazione da fare costa come la risoluzione del sistema originale Ax=b
Conclusione nella scelta del precondizionatore M occorre mediare fra due cose:
qualità dell'approssimazione M circa A'' e facilità/rapidità della risoluzione di un sistema lineare di matrice M
- una buona approssimazione M circa A generalmente assicura una buona velocità di convergenza
- la facilità/rapidità della risoluzione di un sistema lineare di matrice M assicura che ogni iterazione del metodo sia veloce
#### Metodo di Jacobi
supponiamo che A abbia elementi diagonali non nulli
Allora la parte diagonale di A ovvero D ottenuta dalla parte diagonale di A è invertibile infatti moltiplichiamo per gli elementi in diagonale e devono essere 0
Dunque posso definire il metodo di Jacobi che è il metodo con M=D
x0 in Cn dato xk+1=D-1(D-A)xk+D-1b=dxk+D-1rk k=0,1,2,...
il metodo di Jacobi è convergente se e solo se il ro(J)<1 dove J=D-1(D-A)=I-D-1A
l'iterazione k-esima di J richiede di calcolare il vettore zk=D-1rk risolvendo il sistema diagonale 
Dzk=rk facilissimo da risolvere
con un sistema composto ad esempio da

                a11z(k)  1 = r(k)  1  a22z(k)  2 = r(k)  2  . . . ...  annz(k)  n = r(k)  n  ⇐⇒                  z(k)  1 = r(k)  1 /a11  z(k)  2 = r(k)  2 /a22  ...  z(k)  n = r(k)  n /ann  (4.14) Il costo del calcolo di z(k) è nD. 20
#### Metodo di Gauss-Seidel
Supponiamo che A abbia elementi diagonali non nulli 
Allora la parte triangolare inferiore di A cioè la matrice E ottenuta ricopiando la parte triangolare inferiore di A inclusa la diagonale è invertibile che sappiamo avere determinante come prodotto degli elementi in diagonale per regola delle matrici triangolari inferiori
Dunque posso definire il metodo di Gauss Seidel che è il metodo scritto sopra con M=E
x(0) ∈ Cn dato, x(k+1) = E−1(E − A)x(k) + E−1b = x(k) + E−1r(k), k = 0, 1, 2, . . .
il metodo di Gauss Seidel è convergente se e solo se il raggio spettrale di G<1 dove G=E-1(E-A)=I-E-1A
l'iterazione k-esima di GS richiede di calcolare il vettore zk=E-1rk risolvendo il sistema triangolare inferiore
Ezk=rk 
è facile ma non facilissimo
un sistemo triangolare inferiore si risolve usando la sostituzione in avanti
sistema triangolare inferiore Ez(k) = r(k), il che è facile (la soluzione si ottiene per sostituzione in avanti):                        a11z(k)  1 = r(k)  1  a21z(k)  1 + a22z(k)  2 = r(k)  2  a31z(k)  1 + a32z(k)  2 + a33z(k)  3 = r(k)  3  ... ...  an1z(k)  1 + an2z(k)  2 + . . . + annz(k)  n = r(k)  n  ⇐⇒                        z(k)  1 = r(k)  1 /a11  z(k)  2 = (r(k)  2 − a21z(k)  1 )/a22  z(k)  3 = (r(k)  3 − a31z(k)  1 − a32z(k)  2 )/a33  ...  z(k)  n = (r(k)  n − an1z(k)  1 − an2z(k)  2 − . . . − an,n−1z(k)  n−1)/ann
Per ogni i = 1, . . . , n, il costo del calcolo di  z(k)  i = r(k)  i − ai1z(k)  1 − ai2z(k)  2 − . . . − ai,i−1z(k)  i−1  aii  è 1D + (i − 1)M + (i − 1)A, per cui il costo complessivo del calcolo di z(k) è  n  ∑  i=1  (1D + (i − 1)M + (i − 1)A) = nD + n(n − 1)  2 M + n(n − 1)  2 A.  Questo costo può ridursi se la parte triangolare inferiore E di A ha molti zeri.
sapendo che la sommatoria di i che va da 1 a n di i-1 è uguale a n(n-1)/2 ovvero una somma
Osservazione
Osservazione 4.8. Confrontando i precondizionatori D ed E dei metodi di Jacobi e Gauss-Seidel, osserviamo quanto segue che si ricollega all’Osservazione 4.7. • L’approssimazione E ≈ A è migliore dell’approssimazione D ≈ A perché E − A ha più zeri di D − A.  Questo spiega perché molto spesso il metodo di Gauss-Seidel converge più velocemente del metodo di Jacobi (cioè ρ(G) < ρ(J), essendo J e G le matrici d’iterazione di Jacobi e Gauss-Seidel). • La risoluzione di un sistema lineare di matrice E è più costosa della risoluzione di un sistema lineare di  matrice D (cfr. (4.16) e (4.14)). Pertanto, un’iterazione di Gauss-Seidel costa di più di un’iterazione di Jacobi.