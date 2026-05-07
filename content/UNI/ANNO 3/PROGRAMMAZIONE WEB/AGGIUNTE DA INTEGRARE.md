#### Ereditarietà prototipale in Javascript
##### I prototipi in java
- In JavaScript ogni oggetto può essere collegato a un altro oggetto, chiamato prototipo.
- Un oggetto quindi può avere due tipi di proprietà: 
- le proprietà proprie, cioè quelle definite direttamente dentro l’oggetto
- proprietà ereditate, cioè quelle che non si trovano nell'oggetto stesso ma nel suo prototipo.
Per esempio, se abbiamo un oggetto `pippo`, una proprietà propria può essere:
`pippo.eta`
Il prototipo dell’oggetto invece si può vedere con:
`pippo.__proto__`
- Se assegniamo una proprietà al prototipo, quella proprietà diventa disponibile anche per gli oggetti che usano quel prototipo. Per esempio:
- `pippo.__proto__.university = "Tor Vergata"`
	- In questo caso `university` non è una proprietà scritta direttamente dentro `pippo`, ma viene trovata nel suo prototipo.
- Quando cerchiamo una proprietà su un oggetto, JavaScript segue un ordine preciso: prima cerca tra le proprietà interne dell’oggetto; se non la trova, cerca nel prototipo; se non la trova nemmeno lì, cerca nel prototipo del prototipo, e così via
	- Questa catena si chiama prototype chain
- `pippo.hasOwnProperty("university")`
	- Per controllare se una proprietà appartiene direttamente all'oggetto oppure è ereditata dal prototipo, possiamo usare:
- Per esempio:
	- `Student.prototype.sayName = function() { return this.name; }`
	- In questo modo tutti gli studenti possono usare `sayName()`, ma la funzione esiste una sola volta nel prototipo.
- Differenza tra `prototype` e `__proto__`
	- `Student.prototype` è il prototipo associato alla funzione costruttore `Student`.
	- `pippo.__proto__` è invece il prototipo dell’oggetto `pippo`.
- Se modifico una proprietà del prototipo già esistente, gli oggetti creati in precedenza vedono la modifica, perché continuano a puntare allo stesso prototipo.
- Diverso è il caso in cui riassegno completamente il prototipo:
	- `Student.prototype = { university: "La Terza" }`
	- In questo caso non sto modificando il vecchio prototipo, ma sto creando un nuovo oggetto prototipo
	- Gli oggetti creati prima continueranno a puntare al vecchio prototipo, mentre gli oggetti creati dopo useranno quello nuovo
![[Pasted image 20260507145440.png]]
###### Impostare il this
a volte può essere utile decidere manualmente quale oggetto deve essere considerato come `this` durante l’esecuzione di una funzione.
- Per fare questa cosa possiamo usare i metodi `apply`, `call`.
- consente di lanciare la funzione per un determinato oggetto
	- `sayName.apply(pippo)`
	- con una funzione dichiarata a se
	- esegue sayName per pippo
	- il this varrà per pippo
- La differenza tra `apply` e `call` riguarda il modo in cui vengono passati gli argomenti alla funzione.
	- con questi due dopo l'oggetto con la , potrei precisare gli argomenti
		- Con `apply`, gli argomenti vengono passati dentro un array
		- Con `call`, invece, gli argomenti vengono passati uno per uno, separatamente come parametri
###### Copiare un oggetto
In JavaScript gli oggetti non vengono copiati automaticamente quando li assegniamo a una nuova variabile
- Per duplicare davvero un oggetto, bisogna copiarlo manualmente.
- si può fare in 2 modi
	- shallow copy
		- copia solo l'oggetto
	- deep copy
		- copia tutta la prototype chain
- non ho capito però poi nel concreto come cazzo si fa!
Per questo copiare un oggetto può essere pericoloso: bisogna sapere se si vuole copiare solo i dati dell’oggetto oppure anche mantenere il suo prototipo.
###### Oggetto Window
Nel browser esiste un oggetto globale chiamato `window`.
- `window` rappresenta la finestra del browser ed è l’oggetto globale principale dell’ambiente web.
- Quando eseguiamo JavaScript dentro un browser, molte funzioni e variabili globali appartengono in realtà all'oggetto `window`.
	- `alert("ciao")`
- in realtà è come se stessimo scrivendo:
	- `window.alert("ciao")`
- Questo perché `alert` è un metodo dell’oggetto `window`.
	- Un’altra cosa importante è che, nel browser, le variabili globali dichiarate con `var` diventano proprietà dell’oggetto `window`.
		- `var foo = "foobar";`
	- Dopo questa dichiarazione, possiamo accedere a `foo` anche così:
		- `window.foo`
		- `foo === window.foo`
			- restituisce `true`.
- Questo significa che `foo` è stata aggiunta come proprietà dell’oggetto globale `window`.
Questa cosa però non vale allo stesso modo con `let` e `const`.
- Nel browser l’oggetto globale è:
	- `window`
- In Node.js l’oggetto globale è:
	- `global`
- Nei Web Worker l’oggetto globale è:
	- `WorkerGlobalScope`
- Quindi JavaScript è lo stesso linguaggio, ma l’ambiente in cui viene eseguito cambia alcuni oggetti disponibili.
##### DOM MANIPULATION SU JAVASCRIPT
- Il DOM, cioè Document Object Model, è un’interfaccia di programmazione per documenti HTML e XML.
	- Il DOM è uno standard definito dal W3C, quindi fornisce un modo comune per rappresentare e manipolare i documenti web.
	- In pratica il DOM fornisce a JavaScript una rappresentazione strutturata della pagina web.
	- La pagina HTML non viene vista soltanto come testo, ma come una struttura composta da oggetti.
	- Questa struttura viene chiamata DOM tree, cioè albero del DOM e rappresenta ogni elemento del file html
- Nel DOM tree ogni elemento della pagina è rappresentato come un nodo.
	- La radice principale del DOM è `document`.
	- `document` rappresenta l’intera pagina HTML caricata nel browser.
- Per esempio, se vogliamo prendere un elemento con un certo id, possiamo scrivere:
	- `document.getElementById("miodiv")`
- Questa istruzione cerca nel documento HTML l’elemento che ha `id="miodiv"` e restituisce il nodo corrispondente.
- Una volta preso un elemento, possiamo modificarlo.
- `document.getElementById("miodiv").innerHTML = "Ciao"`
- Questo cambia il contenuto HTML dell’elemento con id `miodiv`.
	 - dopo che il browser ha caricato ed eseguito la pagina, JavaScript modifica la rappresentazione della pagina in memoria, cioè il DOM.
	 - JavaScript modifica dinamicamente la pagina HTML dopo che è stata caricata.
###### Selettori
- `document.getElementById("miodiv")` restituisce un solo elemento
- `document.getElementsByClassName("warning")` restituisce una lista di elementi
- `document.getElementsByTagName("p")` restituisce una lista di elementi
-  `document.querySelectorAll("p .warning")` restituisce una lista di elementi
- I metodi “al plurale”, cioè quelli che possono trovare più elementi
	- restituiscono una lista simile a un array, chiamata `NodeList` oppure `HTMLCollection`, a seconda del metodo usato.
		- Per esempio:
		- `let paragraphs = document.getElementsByTagName("p");`
		- In questo caso `paragraphs` contiene tutti gli elementi `<p>` della pagina.
		- Possiamo accedere al primo elemento con:
		- `paragraphs[0]`
		- e possiamo sapere quanti elementi sono stati trovati con:
		- `paragraphs.length`
