##### Frontend e Backend
Nel contesto della programmazione web possiamo distinguere tra **frontend** e **backend**
Il **frontend** è la parte dell’applicazione che viene eseguita nel browser dell’utente
Il **backend**, invece, è la parte che lavora lato server. Qui troviamo il **web server**, le applicazioni server-side, eventuali file da servire al client e spesso anche la comunicazione con un database
- Un esempio classico di applicazione backend è un **CMS**, come WordPress, scritto principalmente in PHP. 
- In questo caso il CMS gira sul server, comunica con il web server e può recuperare dati da un database, ad esempio articoli, utenti, commenti o impostazioni del sito
![[Pasted image 20260526150518.png|438]]


Un **sito statico** è composto da file già pronti, ad esempio HTML, CSS e JavaScript. Il server si limita a inviare questi file al browser, senza dover costruire ogni volta una pagina diversa
Un **sito dinamico**, invece, genera le pagine in base alla richiesta dell’utente e ai dati disponibili. In questo caso entra in gioco un’applicazione server-side, che possiamo vedere come un **site builder** lato server: prende dati dal database, costruisce la pagina HTML e la manda al browser

Nei siti dinamici tradizionali il server si occupa sia di recuperare i dati sia di costruire l’HTML finale. Quindi il browser riceve già una pagina pronta da visualizzare

Nei siti **API based**, invece, il server non genera direttamente HTML e CSS. Il backend espone soltanto dati, spesso tramite **JSON API**. In questo modello il server recupera i dati dal database e li restituisce in formato JSON, mentre il browser si occupa di costruire la pagina lato client. Questo passaggio è mostrato nelle slide quando, al posto del site builder lato server, compare una JSON API e il site builder viene spostato verso il browser/client

![[Pasted image 20260526150834.png|450]]

###### NODEJS
**Node.js** può essere considerato un **ambiente runtime per JavaScript**, costruito sopra il motore **V8 di Google**, cioè lo stesso motore JavaScript usato da Google Chrome. La differenza principale è che, mentre nel browser JavaScript viene usato soprattutto per rendere interattive le pagine web, con Node.js possiamo eseguire JavaScript anche **fuori dal browser**, ad esempio lato server
JavaScript, nel browser, viene normalmente eseguito con un modello **single thread**: il codice principale viene eseguito da un solo thread. Anche Node.js mantiene questa idea di base: il cuore dell’esecuzione è basato su un **event loop single thread**
Questo però non significa che Node.js possa fare una sola cosa alla volta in senso assoluto. Node.js usa una libreria chiamata **libuv**, che permette di gestire operazioni asincrone e operazioni più pesanti tramite meccanismi interni come
- event loop 
- worker thread pool
Poi ci sono anche alcune librerie/componenti usate internamente, tra cui:
- `http-parser`, per il parsing delle richieste HTTP;
- `z-lib`, per la compressione;
- `OpenSSL`, per la parte crittografica e le connessioni sicure;
- `c-ares`, per alcune operazioni DNS asincrone.
![[Pasted image 20260526151208.png|483]]
Nelle slide vengono distinti tre tipi principali di moduli:

| Tipo di modulo          | Significato                                |
| ----------------------- | ------------------------------------------ |
| **Core modules**        | Moduli già inclusi in Node.js              |
| **Local modules**       | Moduli creati da noi localmente con `path` |
| **Third party modules** | Moduli esterni installati tramite `npm`    |

I **core modules** sono moduli di sistema già installati con Node.js. Alcuni esempi importanti sono:

| Modulo        | A cosa serve                          |
| ------------- | ------------------------------------- |
| `http`        | creare server HTTP                    |
| `url`         | gestire e analizzare URL              |
| `querystring` | lavorare con query string             |
| `path`        | gestire percorsi di file              |
| `fs`          | lavorare con file e operazioni di I/O |
| `util`        | usare funzioni di utilità             |
###### Creare un server con nodejs
```Javascript
const http= require('http');

const server= http.createServer((req, res) => {

    console.log(`Received request for ${req.url}`);

    res.statusCode=200;

    res.setHeader('Content-Type', 'text/plain');

    res.end('Hello World\n');

});

const PORT=8080

server.listen(PORT, 'localhost', () => {

    console.log(`Server running at http://localhost:${PORT}/`);

});
```

```
(request, response)
```
- `request` rappresenta la richiesta fatta dal client;
- `response` rappresenta la risposta che il server deve mandare indietro.

###### Routing
Il **routing** è il processo con cui il server decide **cosa fare quando riceve una richiesta verso un determinato percorso**.

Una richiesta HTTP non contiene solo il path, ma anche il **metodo HTTP**, ad esempio `GET`, `POST`, `PUT` o `DELETE`. Per questo nelle slide il routing viene definito come il modo in cui un’applicazione risponde a una richiesta client verso uno specifico endpoint, formato da un **URI/percorso** e da un **metodo HTTP**

###### Creare un modulo
In Node.js possiamo organizzare il codice creando dei **moduli locali**. Un modulo è, in pratica, un file JavaScript che contiene funzioni, oggetti o valori che vogliamo riutilizzare in altri file
creo un file js con una funzione e per esportarla faccio 
```Javascript
const debug= function(txt){
    console.log("DEBUG--"+txt);
}
const error= function(txt){
    console.error("ERROR--"+txt);
}
exports.debug=debug;
exports.error=error;
```
`exports.debug=debug`
associamo a exports un metodo con debug 
e lo importiamo con 
`const betterlog=require('./betterLog');`
poi possiamo usare l'oggetto betterlog con i metodi che sono le funzioni del file

###### Esempio con fs
```Javascript
const fs= require('fs');
const http= require('http');
const betterlog=require(`./betterLog`);
betterlog.debug("ciao");
betterlog.error("errore");

const rootDir= __dirname+"/file";

  

const server= http.createServer((req, res) => {

    console.log(`Received request for ${req.url}`);

    fs.readFile(rootDir+req.url, 'utf8', (err, data) => { //chiamata asincrona infatti verrà prima visualizzato il console.log sotto

        if (err) {

            console.error(err);

            res.statusCode=404;

            res.setHeader('Content-Type', 'text/plain');

            res.end('File not found\n');

            return;

        }

        else {

            console.log(`serving file ${req.url}`);

            res.statusCode=200;

            res.setHeader('Content-Type', 'text/plain');

            res.end(data);

        }

    });

});

const PORT=8080

server.listen(PORT, 'localhost', () => {

    console.log(`Server running at http://localhost:${PORT}/`);

});
```
##### Importare terze parti con npm
Scaricare i moduli degli altri con 
`npm` node packet manager
`su npmjs.com` 
il progetto è una cartella con dentro il file `package.json`
comandi `npm`
- `init`
- `un`
	- elimina i moduli
- `up`
	- aggiorna i moduli
- `run`
	- eseguo gli script presenti nel file `package.json`
			```Javascript
			  "scripts": {
			
			    "test": "echo \"Error: no test specified\" && exit 1",
			
			    "dev": "nodemon index.js",
			
			    "start": "node index.js"
			
			  },
			```
- `i`
	- ci fa scaricare tute le dipendenze
- `--global`
	- opzione che fa installare il progetto in modo globale
###### Npm nodemon
- pacchetto per aiuto sviluppo ma non è essenziale per l'esecuzione
- si può eseguire facendo
	- `npm install nodemon --save-dev`
	- serve per installare il modulo a parte
	- fare `nodemon index.js`
		- non modifica il frontend ma salva i cambiamenti del backend del server
#### Versioni
se cambio la prima cifra della versione quindi da `1.0.0` a `2.0.0` non posso garantire la backward compatibility
la terza cifra dice le patch fix invece la 2 cifra dice minor release
- posso sfruttarlo nel file delle dipendenze andando a limitare quale aggiornamento deve essere fatto
- `~1.0.4` patch release
- `^1.0.4` fino a minor release
- `*.0.4` anche le major
- se non metto niente niente aggiornamenti
###### Nota sui moduli
i moduli vengono eseguiti una sola volta, quando chiamiamo la require nel codice
successivamente non più 

###### Wrapping 
In Node.js ogni file JavaScript viene trattato come un **modulo**.
Quando Node carica un file, non esegue semplicemente il codice così com’è in uno scope globale unico, ma lo avvolge internamente dentro una funzione wrapper simile a questa:
```Javascript
(function (exports, require, module, __filename, __dirname) {
    // codice del modulo
});
```
Questo spiega perché in ogni file Node abbiamo disponibili variabili e funzioni come:
`require` serve per importare altri moduli.
`module.exports` o `exports` servono per decidere cosa rendere visibile all'esterno del modulo.
`__filename` rappresenta il percorso completo del file corrente.
`__dirname` rappresenta la cartella in cui si trova il file corrente.

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

##### API JSON
- application program interface, che vede con il REST come stile architetturale che consente una costruzione di API web usando HTTP
- endpoint indentifica la risorsa nel web mediante URL
REST OPERATIONS consentono URL operations più esplicite e semplici
vedi slide 7
##### CRUD
sta per create read update delete
sono le operazioni di base che possiamo fare sulle risorse
##### STATUS CODE 
a slide 13
ma ricordiamo comunque che

500 di solito quando il database non risponde e viene staccato

| **Codice**              | **Descrizione**                                                                  |
| ----------------------- | -------------------------------------------------------------------------------- |
| **1xx** (Informational) | Messaggi informativi, raramente usati.                                           |
| **2xx** (Success)       | La richiesta è andata a buon fine.                                               |
| **3xx** (Redirect)      | Il client deve fare un’altra richiesta perché la risorsa si è spostata.          |
| **4xx** (Client Error)  | La richiesta contiene un errore (es. risorsa non trovata, richiesta non valida). |
| **5xx** (Server Error)  | Errore lato server, il server non ha potuto soddisfare la richiesta.             |
##### JSEND
comunicare al programma javascript che riceve il messaggio dire l'esito della richiesta ecc
secondo delle logiche si vuole scrivere un modo best practice per inviare status di richieste in formato JSON

aggiungi middleware `app.use(express.json)`

abbiamo aggiunto pure morgan un middleware per le CORS