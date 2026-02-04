## INTRODUZIONE SPAZIO VETTORIALE 
![[Screenshot 2026-02-03 103511.png]]
- ci stanno cose particolari tipo $0_v$ che è il vettore zero di quello spazio vettoriale
- proprietà di somma e moltiplicazione con vettori e scalari
- più dimensioni
## SOTTOSPAZIO
![[Screenshot 2026-02-03 105011.png]]
- sottospazi definiti da determinate condizioni che devono essere rispettate
- per essere un vero sottospazio deve contenere anche il vettore $0$
## Combinazioni lineari
![[Screenshot 2026-02-03 112113.png]]
- un vettore $v$ si dice combinazione lineare di vettori se ci sono degli scalari indipendenti che moltiplicano i vettori e che formano il vettore $v$
## GENERATORI
![[Screenshot 2026-02-03 112055.png]]
- $v1$ $v2$ generano lo spazio $V$ se $v$ è combinazione lineare di $v1$ $v2$
## LINEARITÀ INDIPENDENTE
![[Screenshot 2026-02-03 113819.png]]
- dei vettori si dicono linearmente indipendenti se e soltanto se combinati linearmente portano a un vettore $0_v$ 
- dove gli scalari $a_1$, $a_n$ sono uguali tutti a $0$
- altrimenti sono l.d linearmente dipendenti
 
## BASI
![[Screenshot 2026-02-03 115346.png]]
 - dei vettori si dicono base di $V$ se
	 - sono linearmente indipendenti
	 - se sono combinazione lineare di $V$
## MATRICI
![[Screenshot 2026-02-03 183250.png]]
Una matrice quadrata (con $n$ righe e $n$ colonne) possiamo dire MATRICE DI ORDINE $n$
## DIAGONALE 
se la matrice è pari in righe e colonne ha sia diagonale primaria che secondaria
altrimenti solo diagonale
sono tutti gli elementi con $i=j$
![[Screenshot 2026-02-03 183324.png]]
## TRIANGOLO INFERIORE E SUPERIORE e MATRICE IDENTITÀ
![[Screenshot 2026-02-03 183422.png]]
## MATRICE SIMMETRICA
![[Screenshot 2026-02-03 183451.png]]
## MATRICE ANTISIMMETRICA
![[Screenshot 2026-02-03 183523.png]]
## OPERAZIONI CON MATRICI
![[Screenshot 2026-02-03 183557.png]]
- posso moltiplicare uno scalare per una matrice
- posso fare somma tra matrici solo se hanno stessa $n*m$
## MOLTIPLICAZIONI TRA MATRICI
![[Screenshot 2026-02-03 184453.png]]
- POSSO FARE $A*B$  SOLO SE IL NUMERO DI COLONNE DI A È UGUALE AL NUMERO DI COLONNE DI B
## MATRICE C RISULTATO
- deve essere con il numero di righe di A e il numero di colonne di B

![[Screenshot 2026-02-03 184519.png]]
- definisci C11 ecc come la somma di tutti gli elementi a riga 1 e a colonna 1 nei rispettivi posti moltiplicati tra loro
### ESEMPI
![[Screenshot 2026-02-03 184545.png]]
![[Screenshot 2026-02-03 184605.png]]

## PROPRIETÀ VARIE
![[Screenshot 2026-02-03 184617.png]]


## DETERMINANTE
![[Screenshot 2026-02-03 185131.png]]
- si può fare solo sulle matrici quadrate
- normalmente si applica la formula vista in alto ma se è troppo grande si applica laplace
	- laplace è quello che vedi sotto
	- si consiglia la colonna o la riga con più zeri
	- e si fa $elem*cofattore$ 
		- se indice pari risultato singolo positivo sennò negativo
### ESEMPI
![[Screenshot 2026-02-03 185224.png]]

![[Screenshot 2026-02-03 185201.png]]

## TRUCCHETTI DETERMINANTI
### TRASPOSTA
![[Screenshot 2026-02-03 185630.png]]
- determinante della matrice trasposta è uguale a quello della matrice
### TRIANGOLARE SUPERIORE O INFERIORE
![[Screenshot 2026-02-03 185656.png]]
- basta moltiplicare la diagonale
### SCAMBIO LINEE PARALLELE
![[Screenshot 2026-02-03 185721.png]]
- con scambi opportuni posso semplificarmi il calcolo del determinante lasciando invariato il suo valore
## SCALARE
![[Screenshot 2026-02-03 185733.png]]
- basta che trattengo fuori quell'elemento $B$ e lo moltiplico con il determinante
### SOMMA O SOTTRAZIONE MATRICE
![[Screenshot 2026-02-03 185748.png]]
- sottraggo alcune righe con altre per semplificare il tutto
### BINET TEOREMA
![[Screenshot 2026-02-03 185802.png]]
- non devo calcolare la matrice risultante basta che calcolo i due determinanti
### ALTRE PROPRIETÀ
- se ho solo 0 su riga o colonna allora det è 0
- se ho prodotti scalari è 0
- se ho somme o altro che formano una riga già esistente allora è 0
![[Screenshot 2026-02-03 185825.png]]


## MATRICE INVERSA
![[Pasted image 20260203190829.png]]

- il determinante deve essere 0 per poter invertire
- in alto a dx ci sono delle proprietà tra identità e matrici inverse e matrici normali
- sotto puoi vedere lo svolgimento di una matrice inversa
	- la matrice aggiunta quella in basso a sx viene calcolata dai complementi algebrici(quelli usati nel determinante)
	- poi vengono disposti in modo invertito
	- poi ognuno viene messo fratto con il determinante
	- ecco fatto

## RANGO
![[Screenshot 2026-02-04 112308.png]]
- il rango è un numero naturale
	- uguale a 0 solo se la matrice è nulla
- si caclola prendendo gli elementi speciali non nulli
	- elementi che sotto hanno tutti 0
- indica quante righe sono indipendenti tra loro
- deve essere al massimo il minimo della riga o della colonna
### RANGO CON MATRICE QUADRATA
![[Screenshot 2026-02-04 112322.png]]
- calcolo il determinante
	- se diverso da $0$ $rango=n$
	- se uguale a 0
		- prendo una sottomatrice e vedo se il determinante è diverso da $0$
			- se lo è allora il rango è quello della sottomatrice
## RICAVARE UNA BASE
![[Screenshot 2026-02-04 120031.png]]
- in alto a dx ci sono i vettori di base canonici che formano una base canonica, sono la dimensione dello spazio vettoriale e traslati con 1 sempre più a destra
- in basso invece c'è la base di vettori non canonica
	- formando num dimensione di vettori con elementi speciali 
- tutto basso la base di un sottospazio vettoriale
	- calcoli la dimensione facendo dimensione spazio vettoriale- numero di equazioni 
	- questo numero indica quante variabili dipendenti avere 
		- e anche quanti vettori che formano la base
	- segui i passaggi scritti e stai zitto
### ESTENSIONE DELLA BASE
![[Screenshot 2026-02-04 122659.png]]
- calcoli la base del sottospazio come prima
- aggiungi un quantitativo di righe per ottenere la dimensione dello spazio totale
	- quelli sono i tuoi vettori e devono formare elementi speciali
	- matrice=rango


