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
## Verifica vettori L.I
![[Screenshot 2026-02-04 114557 1.png]]



## GAUSS
![[Screenshot 2026-02-04 175120.png]]
- serve per risolvere facilmente sistemi lineari
- faccio il MEG(metodo eliminazione gauss)
![[Screenshot 2026-02-04 175133.png]]
- se ho una riga con tutti 0 allora ho una variabile libera, di conseguenza il sistema è possibile indeterminato
![[Screenshot 2026-02-04 175144.png]]
- qui ho incongruenze quindi è impossibile
## SISTEMI LINEARI con Rouché capelli
![[Screenshot 2026-02-04 181450.png]]
- sistemi con incognite a un solo grado
- prendo la mia matrice incompleta dei coefficienti
- e la matrice completa(con i risultati)
	- calcolo il rango di entrambe
	- se sono uguali allora il sistema ha soluzioni
![[Screenshot 2026-02-04 181435.png]]
- se il numero di variabili m è > di r allora è indeterminato
- se è uguale allora determinato
![[Screenshot 2026-02-04 181416.png]]
- esempio
## SISTEMI INDETERMINATI
![[Screenshot 2026-02-04 183032.png]]
- hanno una variabile libera
![[Screenshot 2026-02-04 183049.png]]
- scegli le variabili libere in modo corretto prendendo le variabili corrette
- variabili libere presenti in entrambi
## SISTEMI LINEARI CON PARAMETRO
![[Screenshot 2026-02-05 101312.png]]
- scrivi la matrice completa con anche i parametri 
- calcolo il rango e applico Rouché capelli ma definendo adeguatamente il dominio di quel determinato parametro
##  CON VARIABILI LIBERE
![[Screenshot 2026-02-05 101330.png]]
- scegli due equazioni e prendi le variabili per trovare il loro valore a sistema
## CRAMER
![[Screenshot 2026-02-05 103810.png]]
- serve per risolvere sistemi
- la foto è abbastanza chiara
- sostituisci la colonna di quella variabile che cerchi con i termini noti
### ESEMPIO DI UN SISTEMA DETERMINATO
![[Screenshot 2026-02-05 103827.png]]
### ESEMPIO INDETERMINATO
![[Screenshot 2026-02-05 103834.png]]
- alcune variabili libere altre no
##### DIMOSTRAZIONE CRAMER
![[Screenshot 2026-02-05 103818.png]]

## MATRICE INVERSA ALTRO METODO
- puoi invertire solo se matrice quadratica
- e rango diverso da 0
![[Screenshot 2026-02-05 110121.png]]
- $B$ rappresenta $A^{-1}$ 
![[Screenshot 2026-02-05 110133.png]]
- metti a sistema le righe che rappresentano B e mettile uguale alla matrice identità
![[Screenshot 2026-02-05 110142.png]]
- risolviamo con gauss prendendo la matrice completa
- e moltiplichiamo i valori con i vettori e1 e2 e3
### VERIFICA DELLA SOUZIONE 
![[Screenshot 2026-02-05 110314.png]]
- deve uscire matrice identità
## APPLICAZIONI LINEARI
![[Screenshot 2026-02-06 102649.png]]
- funzioni di insiemi che devono verificare le due condizioni scritte sopra per essere tali
- sotto c'è un esempio che verifica le due cose
- se la funzione mappa la stessa dimensione si dice endomorfismo
### ALTRO ESEMPIO
![[Screenshot 2026-02-06 102701.png]]
## MATRICE ASSOCIATA
![[Screenshot 2026-02-06 111018.png]]
- matrice associata ad una determinata base di destinazione e di arrivo
- può essere con basi canoniche oppure no ed è definita da una certa applicazione lineare
![[Screenshot 2026-02-06 111033.png]]
- definisci la tua base di arrivo e di destinazione
- calcola la f della destinazione
- metti a combinazione lineare con parametri a b e c rispetto alla base
- se hai le basi canoniche puoi scrivere direttamente in colonna le cose
### SENZA BASI CANONICHE
![[Screenshot 2026-02-06 111043.png]]
- stesso ma non puoi mettere in colonna come vuoi

## TROVARE UNA MATRICE ASSOCIATA CON BASI CANONICHE DA FUNZIONI GIÀ RISOLTE
![[Screenshot 2026-02-06 112641.png]]
- metti a sistema con le basi canoniche che moltiplicano i coefficineti del vettore di input
![[Screenshot 2026-02-06 112709.png]]

![[Screenshot 2026-02-06 112720.png]]

## CAMBIO BASE DI UNA MATRICE ASSOCIATA
![[Screenshot 2026-02-06 120026.png]]
- calcola in base i vari output della funzione
![[Screenshot 2026-02-06 120036.png]]
- matrice non canonica, fai gli stessi calcoli 
## NUCLEO E IMMAGINE
![[Screenshot 2026-02-06 122326.png]]
- nucleo=ker
- immagine di f, sottoinsieme di W della funzione
## TROVARE DIM IMMAGINE, BASE IMM DIM KER E KER
![[Screenshot 2026-02-06 122340.png]]
- tutto deve partire dalla matrice associata
- la dim immagine è uguale al rango
- la base è un insieme di vettori in colonna che sono della dimensione del rango
- prendi r vettori dalla matrice associata
	- calcoli dimensione ker facendo dimensione insieme partenza- dim immagine
- scrivi i tuoi vettori come una equazione con incognite e poni tutto uguale a 0 
	- il Ker rappresenta i vettori nulli
	- le variabili libere sono dei valori a caso





















