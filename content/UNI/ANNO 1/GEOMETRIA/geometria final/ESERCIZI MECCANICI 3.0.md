##### RETTE INCIDENTI SGHEMBE BLA BLA BLA

##### Se sono complanari
- **parallele** → sono complanari;
- **incidenti** → sono complanari;
- **sghembe** → non sono complanari;
- **coincidenti** → sono complanari.
1. Trovo i vettori direttori di r e s.
2. Controllo se sono multipli.
   - Se sono multipli, le rette sono parallele o coincidenti.
   - In ogni caso sono complanari.
3. Se non sono multipli, controllo se si intersecano.
   - Se si intersecano, sono complanari.
   - Se non si intersecano, sono sghembe, quindi non complanari.
1. Solo se sono complanari trovo il piano.

per definire un piano dobbiamo prendere due punti paralleli e trovare il vettore associato a quei punti

## 1. Additività

Se sommi due vettori prima di applicare fff, deve essere uguale ad applicare fff ai due vettori separatamente e poi sommare:
$f(u+v)=f(u)+f(v)$

## 2. Omogeneità

Se moltiplichi un vettore per uno scalare prima di applicare fff, deve essere uguale ad applicare fff e poi moltiplicare il risultato per quello scalare:
$f(\lambda u)=\lambda f(u)$

Spesso le due proprietà si riassumono in una sola:
$f(\alpha u+\beta v)=\alpha f(u)+\beta f(v)$
per ogni α,β∈R\alpha,\beta\in\mathbb Rα,β∈R.



- det diverso 0 rango max quindi lin ind
- iniettiva suriettiva 
	- suriettiva se rg(A) = numero di righe
	- iniettiva se rg(A) = numero di colonne


##### Cosa abbiamo scoperto di nuovo
###### Rette
- retta ortogonale a r1 e r2 che passa per intersez
	- prendo le parametriche di r1 e r2 scrivo i vettori direttori
	- poi costruiamo il piano con quei vettori direttori e passante per il punto di intersez
	- prendiamo valore di t trovato nella cartsiana di r2 e lo sostituiamo alla parametrica di r1 per trovare il punto di intersez
- complanarità di due rette
	- **parallele** → sono complanari;
	- **incidenti** → sono complanari;
	- **sghembe** → non sono complanari;
	- **coincidenti** → sono complanari.
	1. Trovo i vettori direttori di r e s.
	2. Controllo se sono multipli.
	   - Se sono multipli, le rette sono parallele o coincidenti.
	   - In ogni caso sono complanari.
	1. Se non sono multipli, controllo se si intersecano.
	   - Se si intersecano, sono complanari.
	   - Se non si intersecano, sono sghembe, quindi non complanari.
	1. Solo se sono complanari trovo il piano.
	per definire un piano dobbiamo prendere due punti paralleli e trovare il vettore associato a quei punti
###### Vettori e matrici
- omogeneo con termini noti a 0
- compatibile se ha soluzione
- rappresentativa della base canonica sarebbe quella cosa che fai prendendo i coefficienti del sistema lineare e disponendoli in matrice
- moltiplichi per tutti i vettori a base canonica
- molt tra matrici
###### Applicazione lineare
- verificare se una applicazione è lineare
	1. Additività
		Se sommi due vettori prima di applicare fff, deve essere uguale ad applicare fff ai due vettori separatamente e poi sommare:
		$f(u+v)=f(u)+f(v)$
	2. Omogeneità
		Se moltiplichi un vettore per uno scalare prima di applicare fff, deve essere uguale ad applicare fff e poi moltiplicare il risultato per quello scalare:
		$f(\lambda u)=\lambda f(u)$
- suriettiva
	- Dim(IMMAGINE)=numero colonne
- iniettiva
	- Ker=insieme vuoto
- f(span(v,w))=span{f(v),f(w)}
	- prendi i due vettori e gli applichi l'app lineare poi ottieni l'insieme dei due vettori
###### Det e inversa
- se matrice triangolare superiore det=molt dei pivot
- se det!=0 rango=n e la matrice è quadrata
	- altrimenti rango <=n-1
		- trovare una sottomatrice di dimensione di 1 ridotta 
			- per cui det !=0 
- per invertire la matrice i cofattori e poi fai fratto det
	- ai cofattori cambia segno quando indici dispari
- se una matrice non è quadrata non è invertibile
	- pk vale la regola che per essere invertibile deve essere sia iniettiva che suriettiva

- f composto g diventa il prodotto delle matrici f e g
- g composto f allora era prodotto tra g e f
allora queste condizioni sono tutte equivalenti:

$$\boxed{ A \text{ invertibile} \Longleftrightarrow \det(A)\neq 0 \Longleftrightarrow \operatorname{rg}(A)=n \Longleftrightarrow \ker(A)=\{0\} \Longleftrightarrow L_A \text{ iniettiva} \Longleftrightarrow L_A \text{ suriettiva} }$$

###### Autovettori Autovalori
- insieme di vettori è una base se sono linearmente indipendenti
- polinomio caratteristico detto P di lambda= det(a-lambda I)
- un autospazio è l'insieme di tutti gli autovettori associati a un autovalore
- per verificare se un vettore è autovettore di una applicazione lineare
	- sostituiscila e vedere se ha autovalori multipli di quelli originali

###### Rouche capelli
- rango matrice normale= rango matrice estesa 

