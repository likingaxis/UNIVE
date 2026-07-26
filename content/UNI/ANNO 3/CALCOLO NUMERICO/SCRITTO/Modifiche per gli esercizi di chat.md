## Forma di Newton
Metti la forma di newton ALL'INIZIO.
Prima di svolgere i calcoli delle varie $f[x_{i}]$ metti la tabella
![[Pasted image 20260724121953.png]]


## Errore su formula trapezi
Scrivere all'inizio la formula base 
![[Pasted image 20260726144146.png]]
- dove 2-1 diventa `n-1`

Quando leggi
![[Pasted image 20260726144416.png]]
scrivi prima $x_j=a+jh,\qquad j=0,\dots,n.$



Alla fine quando scrivi $n \geq QUALCOSA$ ricordati di mettere
![[Pasted image 20260724145858.png|500]]

E poi la conclusione scrivila così
![[Pasted image 20260724145935.png]]



## Determinante
Il metodo è strano ma figo
![[Pasted image 20260715104606.png]]
Il prof mette dentro la matrice 9 sotto matrici, in questo ordine
- PRIMA RIGA MATRICE GRANDE -> metti nella **prima colonna** di ogni sottomatrice il vettore identità (uno diverso per ogni sottomatrice) + ricopi le colonne mancanti (seconda e terza) dalla **matrice originale**
	
- SECONDA RIGA MATRICE GRANDE -> metti nella **seconda colonna** di ogni sottomatrice il vettore identità + ricopi le colonne mancanti dalla **matrice originale**
	
- TERZA RIGA MATRICE GRANDE -> metti nella **terza colonna** di ogni sottomatrice il vettore identità + ricopi le colonne mancanti dalla **matrice originale**

Calcoli poi il determinante di ogni sottomatrice (chiaramente scegliendo come colonna quella identità) RICORDANDOTI I SEGNI DELLA SCACCHIERA sia fuori che dentro la sottomatrice

>[!tip] N.B.: credo che i segni vadano visti in verticale, nel senso che la sottomatrice in posizione `1,2` ha il segno in posizione `2,1`



## Cerchi di gersboring
**Al posto di mettere**
La localizzazione più precisa è dunque
$$\boxed{ \sigma(A)\subset \bigl(C(4i,3)\setminus\partial C(4i,3)\bigr) \cup \bigl(C(-4i,3)\setminus\partial C(-4i,3)\bigr) }$$
con esattamente n autovalori all’interno di ciascun cerchio.


**metti**
$$
\boxed{
\text{Gli autovalori di (A) si trovano nei cerchi }
C(4i,3)\text{ e }C(-4i,3),
\text{ privati del loro bordo.}
}
$$
Inoltre:
$$\boxed{
\text{(n) autovalori stanno nel cerchio (C(4i,3))
e (n) nel cerchio (C(-4i,3)).}
}$$


## Jacobi e Gauss-Seidel
Se la matrice è a diagonale dominante usi il teorema di Jacobi per dimostrare se il metodo converge.
Se la matrice è HDP puoi usare il teorema di Gauss-Seidel per vedere se il metodo converge

Per dare un'approssimazione della convergenza dei metodi, quindi calcolare $\rho(J)$ e $\rho(G)$, puoi usare l'osservazione smart (4.5 del libro)
- SE TI CHIEDE LE ITERAZIONI NON CONVIENE USARLA ma devi calcolartele tu a mano


![[Pasted image 20260725113156.png]]



![[Pasted image 20260726101836.png]]



## Metodi iterativi
Quando scrive "Per il teorema di convergenza dei metodi iterativi stazionari, il metodo è convergente se e solo se $\rho(P)<1$"
DEVI DIRE CHE QUESTA È LA ***CONDIZIONE NECESSARIA E SUFFICIENTE PER LA CONVERGENZA***



## Generali
Quando arrivi alla fine di un esercizio e hai una frazione scrivi sempre quando vale in decimale la frazione.