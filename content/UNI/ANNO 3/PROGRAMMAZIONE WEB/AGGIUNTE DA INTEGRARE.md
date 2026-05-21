##### Oggi vederemo esempi effettivi delle promise con AJAX
###### Le fetch
- esempio: una pagina che deve aggiornare delle parti del sito 
	- tipo il cuoricino 
	- Javascript è perfettamente adatto a questo genere di cose 
- vere e proprie richieste http verso server remoti
- creiamo un pattern detto AJAX
- Asyncronous Javascript and Xml
	- un framework storico si chiama XMLHttpRequest
		- non usa le promise
	- superato da FrameworkFetch(si implementa senza importazioni varie)
		- le fetch qui ritornano una promise
		- e abbiamo priorità sugli altri eventi perchè siamo nella microtask queue
- foto della promise pipeline
	- le risposte vengono intercettate dalle `.then`
	- HandleResponse è il nostro codice
	- qualunque errore può essere intercettato da un `.then` o un `catch`
```Javascript
fetch(`https://jsonp)
```
##### Usiamo json placeholder
abbiamo questi endpoint che ci permettono di ottenere queste informazioni finte a scopo didattico

>[!info] JSON modo di costruire oggetti o liste scritte un po con uno stile javascript
>rappresenta oggetti ma non li istanzia

dentro la risposta della promise abbiamo varie informazioni, tipo di richiesta fatta, lo stato url e il body, che dentro ha i dati in forma testuale quasi come se fosse uno stream
- per rendere il tutto più leggibile usiamo il metodo `oggetto.json()` che ci restituisce un oggetto JSON
- la post rispetto alla get permette di aggiungere delle info nel body
	- facendo una struttura dati fatta a slide 5
	- trasformo un oggetto di una macchina in una stringa facendo `JSON.stringify(oggetto)`
- il content type ad esempio di html è `text/html`
##### ASYNC AWAIT
syntatic sugar
- permette di scrivere codice pulito senza dover usare le promise come abbiamo visto
async davanti a una funzione trasforma in una promise, non crea una funzione asincrona
- per leggere il risultato devo fare il then
- async da solo è un pò inutile ma insieme ad await
io posso aspettare il risultato di una promise creata con await
esempio nelle slide
il codice rompe la sua sequenzialità
al posto di fare await avrei dovuto fare promise.then
non ho capito cosa si intende quando si dice che ritorna una nuova promise
esempio utile che fa vedere l'uso di try e catch
###### Esempio di GET con async await
ci sono 2 microtask
Esercizietto per casa
facciamo due bottoni che chiamiamo button1 e button2
quando clicchiamo quel bottone dobbiamo eseguire questo metodo ed eseguire id della persona
##### Cors
- problema principale che abbiamo quando facciamo una chiamata http con javascript
- all'interno del browser vengono memorizzate informazioni dell'utente tipo cookie di sessione
	- le chiamate javascript sono chiamate nascoste e potenzialmente pericolose
- potrei mettere chiamate inaspettate dall'utente
- ad esempio il login di tutta la banca
- chiamate javacript vengono dette cors
- se sono dentro la parte javascript il browser non vuole fare chiamate al di fuori
	- sono attenzionate dal browser con delle regole speciali
- se faccio una chiamata al server non standard potrei avere un errore
foto carina slide 23
- chiamate fatte su un altro dominio sono CORS
	- è un problema di cors se cambio indirizzo ip ma anche solo la porta
- se rientra in determinate categorie di richieste queste vengono dette semplici e quindi non sono di tipo cors(forse ho capito male)
	- tabella che spiega le simple request
- pre flight request
	- ci sono richieste difficili che contengono un messaggio di protezione iniziale
	- richiesta application/json se risponde accetto allora bene sennò non faccio nemmeno partire la richiesta
- quando avremo un server dobbiamo gestire le cors, sarà interessante
 - questa cosa funziona anche con fetch o solo con XMLHTTP?
martedì avremo degli esempietti da vedere, cors non è da fare
