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
##### REST API
utile per inviare dati al server e vedere la risposta credo
