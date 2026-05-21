##### Oggi vederemo esempi effettivi delle promise con AJAX
###### Le fetch
Oggi vediamo esempi pratici di uso delle **Promise** con **AJAX**.
AJAX significa **Asynchronous JavaScript and XML** ed è un pattern che permette a una pagina web di fare richieste HTTP verso un server senza dover ricaricare tutta la pagina.
Un esempio tipico è una pagina che aggiorna solo una piccola parte del sito, come il cuoricino di un like
JavaScript è adatto a questo perché può fare richieste asincrone: il browser manda la richiesta al server e, mentre aspetta la risposta, la pagina continua a funzionare.
Storicamente si usava `XMLHttpRequest`, che però non era basato sulle Promise. Oggi viene usata soprattutto la **Fetch API**, che è già disponibile nel browser e non richiede importazioni esterne.
```
fetch("https://jsonplaceholder.typicode.com/users")
```
`fetch()` ritorna una **Promise**.
Quando la risposta arriva, può essere gestita con `.then()`:
```Javascript
fetch("https://jsonplaceholder.typicode.com/users")  
.then(res => res.json())  
.then(data => console.log(data))  
.catch(err => console.log(err));
```
La pipeline funziona così:
![[Pasted image 20260521173037.png|432]]
- `fetch()` fa la richiesta HTTP e ritorna una Promise;
- `.then()` intercetta il risultato della Promise precedente;
- `res.json()` legge il body della risposta e ritorna un’altra Promise;
- il secondo `.then()` riceve i dati già trasformati;
- `.catch()` intercetta eventuali errori della catena
Le Promise risolte vengono gestite nella **microtask queue**, quindi hanno priorità rispetto ad altri task asincroni più “normali”, come alcuni eventi o timer
##### Usiamo JSON placeholder
Per fare esempi pratici con `fetch()` usiamo **JSONPlaceholder**, cioè un servizio online che mette a disposizione degli endpoint finti a scopo didattico.
Questi endpoint simulano un vero server e permettono di fare richieste HTTP
```Javascript
fetch("https://jsonplaceholder.typicode.com/users/1")
```

>[!info] JSON modo di costruire oggetti o liste scritte un po con uno stile javascript
>rappresenta oggetti ma non li istanzia

Quando facciamo una richiesta con `fetch()`, la Promise risolta ci restituisce un oggetto `Response`.
Dentro questo oggetto ci sono varie informazioni sulla risposta HTTP, ad esempio:
- lo stato della risposta;
- l’URL;
- gli header;
- il body della risposta.
Il `body` contiene i dati veri e propri, ma inizialmente non è ancora direttamente leggibile come oggetto JavaScript. Possiamo pensarlo come un flusso di dati testuali, quasi come uno **stream**.
Per trasformare il body in dati utilizzabili usiamo `res.json()`:
```Javascript
fetch("https://jsonplaceholder.typicode.com/users")  
.then(res => res.json())  
.then(data => console.log(data));
```
- legge il body della risposta e lo converte in un oggetto JavaScript o in un array di oggetti JavaScript, a seconda dei dati ricevuti.
	- È importante ricordare che anche `res.json()` restituisce una **Promise**, perché la lettura e la conversione del body non sono immediate
###### Get e POST
- la richiesta `GET` è come quella vista sopra
```Javascript
fetch("https://jsonplaceholder.typicode.com/users")  
.then(res => res.json())  
.then(data => console.log(data));
```
- Una richiesta `POST`, invece, viene usata quando voglio inviare dati al server.
	- Rispetto a una `GET`, la `POST` permette di inserire informazioni nel **body** della richiesta.
```Javascript
const myPost = {
  title: "A post about true facts",
  body: "42",
  userId: 2
};

const options = {
  method: "POST",
  body: JSON.stringify(myPost),
  headers: {
    "Content-Type": "application/json"
  }
};

fetch("https://jsonplaceholder.typicode.com/posts", options)
  .then(res => res.json())
  .then(data => console.log(data));
```

- creo un oggetto `myPost`, poi lo trasformo in stringa con `JSON.stringify(Oggetto)`
	- Questo serve perché nel body di una richiesta HTTP non mando direttamente “l’oggetto JavaScript vivo”, ma una rappresentazione testuale dei dati
	- lo invio con un Content-Type con `"Content-Type": "application/json"`
	- ad esempio un content type è anche `text/html`
##### ASYNC e AWAIT
`async` e `await` sono una forma di **syntactic sugar**, cioè un modo più comodo e leggibile per lavorare con le Promise.
Invece di scrivere tante `.then()`, posso scrivere codice che sembra più sequenziale, anche se sotto rimane comunque asincrono
###### ASYNC
Mettere `async` davanti a una funzione significa che quella funzione **ritorna sempre una Promise**
```Javascript
async function f() {
  return 1;
}
//e leggerla poi con ->
f().then(result => console.log(result)); //darà 1 come output
```
###### AWAIT
`await` si usa dentro una funzione `async` e permette di **aspettare il risultato di una Promise**
```Javascript
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });

  let result = await promise;

  alert(result);
}

f();
```
1. viene creata una Promise;
2. la Promise si risolve dopo 1 secondo;
3. `await` aspetta il risultato della Promise;
4. quando il risultato arriva, viene salvato dentro `result`;
5. viene eseguito `alert(result)`



###### Esempio con Promise:
```Javascript
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => console.log(data));
```
Lo stesso esempio con `async/await`:
```Javascript
async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  console.log(data);
}

fetchUsers();
```
La cosa importante è che `async/await` **non elimina le Promise**: le rende solo più facili da leggere e scrivere

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
