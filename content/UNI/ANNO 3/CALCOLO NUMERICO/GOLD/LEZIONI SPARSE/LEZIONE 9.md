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
