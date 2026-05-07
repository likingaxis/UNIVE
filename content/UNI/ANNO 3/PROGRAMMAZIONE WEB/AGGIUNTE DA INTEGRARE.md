#### Ereditarietà prototipale in Javascript
##### I prototipi in java
- un oggetto in javascript è collegato direttamente a un prototipo dell'oggetto se usato con uno stesso costruttore
- ogni oggetto javascript ha delle proprietà personali
	- `pippo.eta`
- ma anche ereditate dall'oggetto prototipo
	- definito con `pippo.__proto__`
	- quindi per assegnare una proprietà faremo `pippo.__proto__.sbebbers=15`
- si cerca prima nelle proprietà interne dell'oggetto, poi dentro il prototipo
foto a slide 125
- un prototipo può avere a sua volta prototipi
	- prototype chain
- ma senza costruttori
- metodi di base di un prototipo
- il costruttore ha associato un oggetto prototipo, posso prendere l'oggetto della funzione e inserire nel prototype quello che si vuole
	- `Studente.prototype.prova=4444`
	- ogni prototype di ogni oggetto creato  avrà prova
- utile per avere cose in comune come anche metodi
- se cambio il prototipo del costruttore creo un nuovo oggetto
	- i precedenti del costruttore puntano ancora a quello vecchio
###### Impostare il this
- usare apply e call
- consente di lanciare la funzione per un determinato oggetto
	- `sayName.apply(pippo)`
	- con una funzione dichiarata a se
	- esegue sayName per pippo
	- il this varrà per pippo
- call è tipo apply ma non so che cambia
###### Copiare un oggetto
- SI FA A MANO
- si può fare in 2 modi
	- shell on copy
		- copia solo l'oggetto
	- deep copy
		- copia tutta la prototype chain
- non ho capito però poi nel concreto come cazzo si fa!
###### Oggetto Window
è un oggetto globale del browser
poi ci sono nodejs e workers 
aggiungi più robetta

AGGIUNGI DIFFERENZA TRA LET E CONST
##### DOM MANIPULATION SU JAVASCRIPT
- Document Object model, standard w3c
- ti da una mappa del documento e contiene dei metodi da poter applicare a quel documento
- DOM tree 
	- Foto a slide 141
- radice document
- il javascript modifica il file di base HTML dopo averlo eseguito!
###### Selettori
documentbyid
documetsbyclass
documentsbytag
queryselectorAll
ritornano array quelli al plurale