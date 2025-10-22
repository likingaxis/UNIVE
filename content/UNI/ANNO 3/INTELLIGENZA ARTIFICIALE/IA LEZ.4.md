## Ricerca euristica
- viene effettuata una ricerca con una stima che cerca di approssimarsi a una soluzione ottima
- l'obiettivo è quello di trovare una soluzione BUONA in un tempo accettabile
	- conoscenza euristica
		- ci consente di effettuare scelte oculate
- si usa quando non abbiamo tutte le informazioni sull'ambiente modellato

##### Funzione di valutazione euristica
- ci consente di avere una conoscenza del problema
$f:n \rightarrow R$ 
- si applica al nodo
##### Alcuni esempi di euristica
foto

#### Algoritmo di ricerca Best-first
- effettua una scelta euristica, ponendo f(n)=g(n)
	- posso calcolare il costo di quel cammino solo una volta che lo ho eseguito
	- ma non avevamo detto che un algoritmo euristico si ha solo quando l'ambiente non è tutto sotto controllo?
	- f(n)=g(n)
- a quanto pare posso cambiare l'algoritmo conosciuto ponendo una f(n) cosí diventa greedy e quindi cosí sfrutta una euristica
- posso massimizzare o minimizzare il risultato cercato, basta mettere il -
	- se voglio soddisfare una bella scopata
- foto di strategia best-first
- algoritmo non ottimo perchè rischia di perdersi
###### Avere una funzione g lo rende euirstico? una funzione che conosce il passato?
la risposta è no, introduciamo quindi una funzione h che vede al futuro al posto di g
- h rappresenta una stima, ma come fa a essere una stima invece che un calcolo vero e proprio?
	- abbiamo detto che una cosa euristica non conosce l'ambiente... mh... sborra...
- Esempio con mappa fatta della romania
- a quanto pare h è una funzione che mi restituisce una ENORME CAZZATA DI MERDA(linea d'area)
### Ricerca A*
- evitare di espandere cammini che siano già costosi
- funzione di valutazione
	- $f(n)=g(n)+h(n)$
- $g(n)$ costo in corso nel raggiungere $n$
- hn
- fn
- quando la h ha certe caratteristiche diventa A* altrimenti è solo A
- A* vs A
	- bho
#### Esempi algoritmi A
- foto
#### Completezza algoritmo A
##### Dimostrazione Completezza di A

### Algoritmo A* stima ideale
- siano tute le varie f g ecc... ottime, ideali
la manhattan distance

## Beam search
- AD OGNI LIVELLO RICORDO 3 NODI
### Valutazioni di funzioni euristiche
- oracolo tipo quello usato in machine learning

- quando ci sta il grafico si parla della pianificazione e non l'azione 
## Come invento una euristica?

