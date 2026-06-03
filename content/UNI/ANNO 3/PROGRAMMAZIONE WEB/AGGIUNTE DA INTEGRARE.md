##### Express
- framework minimale di `nodejs`
- routing complesso
- `req/resp` handling
- middleware
- server side rendering
Express ci consente di creare gli endpoint della nostra API e di associare a ciascun endpoint un comportamento diverso

```Javascript
const express=require('express');
const app=express();
const port=4000;
app.get('/',(req,res)=>{
    res.send('Hello World!');
});
app.listen(port,()=>{

    console.log(`Example app listening on port ${port}`);

});
```
Dentro `req` possiamo trovare diverse informazioni utili della richiesta HTTP, come gli header, i parametri della rotta, la query string e, quando viene configurato il middleware corretto, anche il body della richiesta
Rispetto all’utilizzo diretto di `http.createServer`, Express semplifica molto la gestione della richiesta e della risposta, perché fornisce oggetti già più comodi da usare e metodi pronti come `res.send()`.
##### REST API
Una **REST API** è un’interfaccia che permette al client di comunicare con il server tramite richieste HTTP
Un’API è composta da una serie di **endpoint**, cioè URL specifici a cui il client può inviare richieste. Questi endpoint possono restituire dati, ricevere dati o eseguire operazioni su determinate risorse
###### Routing con stringhe con express
dentro `req` di `app.get` potrei avere header con content type il body oppure altre informazioni utili tipo parametri 

```Javascript
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/about', (req, res) => {
    res.send('About page');
});
const PORT =8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```
con express abbiamo dei dati di richiesta già processati e semplificati rispetto a usare http. create server

le rotte dei file sono case sensitive e vanno in ordine di lettura sequenziale
- la possibilità di avere collisioni viene risolto grazie a questa sequenzialità di lettura

Questo è importante perché possono nascere collisioni tra rotte statiche e rotte parametriche. Ad esempio, se scriviamo una rotta parametrica prima di una rotta statica:
```Javascript
app.get('/:post', (req, res) => {
    res.send('Post generico');
});

app.get('/about', (req, res) => {
    res.send('About page');
});
```
la richiesta a `/about` potrebbe essere interpretata come valore del parametro `:post`, invece che arrivare alla rotta specifica `/about`


per creare richieste http con rest api creiamo un file.http creato così
```scss
http://localhost:8080

###

http://localhost:8080/about

###

POST http://localhost:8080/

Content-Type: application/json

{
    "name": "Luca",
    "surname": "Rossi"
}
```
###### Routing sui metodi
Oltre a fare routing sulle stringhe, quindi sui percorsi come `/`, `/about` o `/users`, Express permette anche di fare routing in base al **metodo HTTP** della richiesta
Ad esempio, posso avere lo stesso percorso `/`, ma comportamenti diversi in base al metodo usato:

```Javascript
app.get('/', (req, res) => {
    res.send('GET request to the homepage');
});
```

```Javascript
app.post('/', (req, res) => {
    res.send('POST request to the homepage');
});
```

un metodo oltre a get e post è `app.all`
che permette di intercettare **tutti i metodi HTTP** su una certa rotta. È utile quando voglio eseguire una logica comune indipendentemente dal metodo usato
```Javascript
app.all('/secret', (req, res, next) => { 
	console.log('Accessing the secret section...'); 
	next(); 
});
```
- next lo vediamo dopo
Quando voglio associare più metodi allo stesso percorso, posso usare anche `app.route()`, che permette di concatenare più handler sulla stessa rotta
```Javascript
app.route('/book') 
	.get((req, res) => {
		 res.send('Get a random book');
	}) 
	.post((req, res) => {
	 res.send('Add a book'); 
	 }) 
	 .put((req, res) => { 
	 res.send('Update the book'); 
	 });
```

Per organizzare meglio applicazioni più grandi, Express mette a disposizione anche `express.Router()`
Un router è una specie di “mini-app” che gestisce un gruppo di rotte separatamente dal file principale
creo un file `usermodule.js` se voglio crearla come modulo oppure scrivo solo userRouter.get ecc... e poi faccio solo `app.use`

```Javascript
const express=require('express');
const userRouter=express.Router();
userRouter.get('/login', (req, res) => {
    res.send('Login page');
});
userRouter.get('/register', (req, res) => {
    res.send('Register page');
});
userRouter.get(`/logout`, (req, res) => {
    res.send('Logout page');
});
module.exports=userRouter;
```
creando dei piccoli gestori a se che poi importo con require e la richiamo con
```Javascript
const userRouter = require('./usermodule');
app.use('/user', userRouter);
```
posso mettere Router in moduli separati
ad esempio creando un file js e richiamarlo con require
quindi diciamo che ogni parte del path verrà potenzialmente gestita da un router apparte
###### Parametri con il routing
posso passare dei parametri attraverso il routing
esempio con `/users/:userId/books/:bookId`
che poi posso gestire come
```Javascript
app.get(`/about/:id`, (req, res) => {

    console.log(req.params);

    if(req.params.id === '1') {

        res.send('About page 1');

    } else {

        res.status(404).send('Page not found');

    }

});
```

##### Response
In Express, l’oggetto `res` rappresenta la **risposta HTTP** che il server invia al client.
Quando una rotta viene eseguita, riceve normalmente due oggetti principali:
`req` contiene le informazioni della richiesta ricevuta, mentre `res` viene usato per costruire e inviare la risposta
I metodi principali dell’oggetto `res` sono:
- `res.send()`: invia una risposta generica, ad esempio testo, HTML, oggetti o buffer;
- `res.json()`: invia una risposta in formato JSON;
- `res.sendFile()`: invia un file al client;
- `res.redirect()`: reindirizza il client verso un altro URL;
- `res.status()`: imposta il codice di stato HTTP della risposta;
- `res.set()`: imposta uno o più header HTTP
###### Aggiunte a `res.send`
![[Pasted image 20260603172337.png|425]]

`__dirname` indica la cartella in cui si trova il file JavaScript in esecuzione. `path.join()` costruisce il percorso completo del file in modo sicuro. Quindi Express non sta mandando una stringa qualsiasi, ma il file HTML vero e proprio.

##### Middleware
architettura software usata per express di tipo middleware
si ha come obiettivo finale quello di creare una catena di funzioni che rispondono a richieste ecc
![[Pasted image 20260603172723.png|581]]
concatenate e fatte da richiesta risposta e `next()`
da quello che ho capito next rimanda la `req` al middleware successivo che non conosco
![[Pasted image 20260603173307.png]]
Una funzione middleware riceve normalmente tre parametri:

```Javascript
app.use((req, res, next) => {
    console.log('Richiesta ricevuta');
    next();
});
```
In questo caso il middleware stampa un messaggio e poi chiama `next()`, passando la richiesta al middleware successivo
Se un middleware non chiama `next()` e non invia una risposta con metodi come `res.send()`, la richiesta rimane bloccata e il client non riceve una risposta
Quindi `next()` non “rimanda la req” in modo generico, ma passa il controllo alla prossima funzione middleware registrata nella catena
###### Static files
Express permette di gestire file statici tramite il middleware integrato `express.static()`.
I file statici sono file che il server invia così come sono, senza elaborarli dinamicamente. Esempi di file statici sono tipo foto immagini html ecc
```
app.use(express.static('public'));
```
In questo caso Express rende accessibili al client i file contenuti nella cartella `public`.
La cartella `public` non ha un significato speciale obbligatorio: è semplicemente una cartella scelta dal programmatore per contenere file pubblici, come immagini, CSS o script da inviare al browser.
Si può anche montare la cartella statica su un percorso specifico:
In questo caso i file dentro `public` saranno accessibili partendo dal percorso `/static`.
`express.static()` è un middleware perché intercetta la richiesta e, se trova un file corrispondente, lo restituisce direttamente al client. Se invece non trova il file, può passare il controllo ai middleware successivi.


Oltre ai middleware integrati in Express, possiamo usare anche middleware di terze parti.
Un esempio è `morgan`, che serve per fare logging delle richieste HTTP ricevute dal server.
Si installa con:
```
npm install morgan
```
Poi si importa e si usa con `app.use()`:
```
const morgan = require('morgan');

app.use(morgan('dev'));
```
In questo modo, ogni volta che il server riceve una richiesta, `morgan` stampa nella console informazioni utili, come metodo HTTP, URL richiesto, codice di risposta e tempo impiegato.
##### CORS nel server nodejs
Il **CORS** riguarda le richieste HTTP fatte da un client verso un server che si trova su un’origine diversa.
Per il browser, due origini sono diverse se cambia almeno uno di questi elementi:
- protocollo;
- dominio o indirizzo IP;
- porta.
Ad esempio, se il frontend gira su:
```
http://localhost:3000
```
e prova a fare una richiesta `fetch` verso:
```
http://localhost:8080
```
il browser considera la richiesta cross-origin, perché la porta è diversa.
In questi casi il browser può bloccare la richiesta se il server non autorizza esplicitamente quell’origine.
In un server Node.js con Express, il CORS può essere gestito tramite un middleware installabile:
```
npm install cors
```
Poi si può usare così:
```
const cors = require('cors');

app.use(cors());
```
In questo modo il server aggiunge gli header necessari per permettere al browser di accettare richieste provenienti da origini diverse.
