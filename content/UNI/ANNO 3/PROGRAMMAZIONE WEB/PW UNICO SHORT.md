#### GIT
- **Git**: sistema di versionamento che permette di tracciare modifiche al codice nel tempo.
- **Repository**: cartella/progetto gestito da Git.
    - **Locale**: sul proprio computer.
    - **Remoto**: online, per esempio su GitHub.
- **Working tree**: area dove si modificano i file.
- **Staging area**: area intermedia dove si preparano i file da inserire nel commit.
- **Commit**: salvataggio di una versione del progetto.
- **Branch**: linea di sviluppo separata.
- **HEAD**: puntatore al commit/branch attualmente attivo.
```bash
git add file
git commit -m "messaggio"
git push
git pull
git log
git log --oneline
```
#### HTTP CONCETTI
- **HTTP**: protocollo usato per la comunicazione tra client e server.
- **GET**: richiede dati.
- **POST**: invia nuovi dati al server.
- **PUT**: sostituisce completamente una risorsa.
- **PATCH**: modifica parzialmente una risorsa.
- **DELETE**: elimina una risorsa.
- **Content-Type**: indica il formato dei dati inviati, ad esempio `application/json`.
- **CORS**: meccanismo di sicurezza che regola le richieste tra domini diversi come porta o ip o protocollo
	- se il client invia richieste semplici il tutto viene autorizzato dal browser
	- se invia richieste complesse si ha il bisogno di inviare una preflight al server per chidere l'autorizzazione prima di farlo
- **1xx**: informativi.
- **2xx**: successo.
- **3xx**: redirect.
- **4xx**: errore lato client.
- **5xx**: errore lato server.
#### HTML
- **HTML**: linguaggio di markup usato per strutturare il contenuto di una pagina web.
- **HTML semantico**: uso di tag che descrivono il significato del contenuto, come `header`, `main`, `section`, `article`, `footer`.
- **Form**: elemento usato per raccogliere input dall’utente.
- **head**: contiene metadati, titolo, link CSS, charset, viewport.
- **header**: intestazione visibile di una pagina o sezione.
Esempio viewport:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
#### CSS
- **CSS**: linguaggio usato per definire stile e layout delle pagine HTML.
- **DOM**: rappresentazione ad albero della pagina HTML, manipolabile anche con JavaScript.
Selettori principali:
```css
p              /* selettore per tag */
.classe        /* selettore per classe */
#id            /* selettore per id */

div p      /* p discendente di div */
div > p    /* p figlio diretto di div */
h2 + p     /* primo p subito dopo h2 */
h2 ~ p     /* tutti i p fratelli dopo h2 */
p.red      /* p con classe red */
.card.active /* elemento con entrambe le classi */
h1, h2, p  /* raggruppamento */
a:hover        /* pseudoclasse */
```
Specificità CSS:  
- si può rappresentare come `[a,b,c,d]  `
- a = stile inline  
- b = ID  
- c = classi, attributi e pseudo-classi  
- d = tag/elementi e pseudo-elementi  
- il confronto si fa da sinistra verso destra: vince il selettore con il primo valore più alto
```css
#menu .link {  
color: red;  
}
```
`[0,1,1,0]`

Font:
- **font di sistema**: già presenti nel sistema operativo.
- **web font**: caricati da servizi esterni o file.
- **font-family**: definisce la famiglia di caratteri.
Box model:
```text
content → padding → border → margin
```
- `box-sizing: content-box`: width/height riguardano solo il contenuto.
- `box-sizing: border-box`: width/height includono contenuto, padding e border.
Position:
- **static**: valore di default
- **relative**: si sposta rispetto alla sua posizione originale
- **absolute**: si posiziona rispetto al primo antenato posizionato non come static, se non esiste è definito dal body
- **fixed**: resta fisso rispetto al viewport area visibile del browser
Float:
- usato per far “galleggiare” elementi a sinistra/destra, oggi spesso sostituito da Flexbox e Grid.
Flexbox:
- `display: flex` definisce il contenitore che avrà gli item
- lavora su un asse principale e uno trasversale
- `flex-direction: row | column` definisce come disporre gli item
- `flex-wrap: nowrap | wrap` definisce se farli andare a capo o no
- `justify-content:start|end|center`: allinea sulla main axis
- `align-items:start|end|center`: allinea sulla cross axis
- `order`: cambia l’ordine visivo degli item
Grid:
- `display: grid` definisce il contenitore degli item
- permette layout bidimensionali, con righe e colonne
- gli elementi figli diventano grid items
Responsive design:
- serve ad adattare il sito a dispositivi diversi.
- si usa il viewport nel meta tag.
- **media queries**:
    - mobile first: `min-width`
    - desktop first: `max-width`
Framework:
- librerie/insiemi di strumenti già pronti che facilitano lo sviluppo, per esempio Bootstrap
#### JAVASCRIPT
- **JavaScript**: linguaggio di programmazione usato nel browser e anche lato server con Node.js
- È **loosely typed**, cioè i tipi sono gestiti in modo flessibile
- Ha un **garbage collector**, che libera automaticamente memoria non più utilizzata
Oggetti:
- Un oggetto è una collezione di proprietà chiave-valore
```js
const user = {
  name: "Luca",
  age: 22
};
```
- Un **costruttore** è una funzione usata per creare oggetti
- Il **prototipo** è un oggetto da cui altri oggetti possono ereditare proprietà e metodi
- Se una proprietà/metodo non è presente nell'oggetto, JavaScript la cerca nella **prototype chain**
	- `oggetto.__proto__`
	- oppure per sovrascriverlo di un costruttore `Persona.prototype={metti proprietà e metodi qui}`
Variabili:
- `let`: scope di blocco.
- `const`: scope di blocco, ma non può essere riassegnata.
- `var`: scope di funzione, oggi meno consigliata.
Closure:
- Una **closure** si ha quando una funzione interna mantiene accesso alle variabili della funzione esterna, anche dopo che la funzione esterna è terminata.
```js
function counter() {
  let count = 0;

  return function() {
    count++;
    return count;
  };
}
```

IIFE:
- **Immediately Invoked Function Expression**: funzione eseguita subito, usata per non sporcare lo scope globale.
```js
(function() {
  console.log("Eseguita subito");
})();
```
Event loop:
- JavaScript è single-thread: esegue una cosa alla volta.
- Le operazioni sincrone vengono eseguite nella **call stack**.
- Le operazioni asincrone vengono gestite da **Web API** nel browser o **Node API** in Node.js.
- Quando un’operazione asincrona termina, la callback viene inserita in una coda.
- Le **microtask queue**, usate per le Promise, hanno priorità sulla task queue.
- Ordine generale:
```text
call stack → microtask queue → task queue
```
Promise:
- Una Promise rappresenta un risultato futuro.
- Stati:
    - `pending`        
    - `fulfilled`
    - `rejected`
```js
fetch("/api/data")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
- `.then()` gestisce il successo.
- `.catch()` gestisce l’errore.
- `.finally()` viene eseguito comunque, sia in caso di successo sia in caso di errore.
- Se si annidano troppe callback o `.then`, il codice può diventare poco leggibile
Async/await:
- `async` definisce una funzione asincrona.
- `await` aspetta la risoluzione di una Promise.
- È zucchero sintattico sulle Promise, utile per scrivere codice più leggibile.
```js
async function loadData() {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```
Fetch:
- `fetch()` permette di fare richieste HTTP verso un server.
- Può usare vari metodi: GET, POST, PUT, PATCH, DELETE.
```js
fetch("/api/exams", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    course: "Programmazione Web"
  })
});
```
Window e document:
- `window`: oggetto globale del browser, rappresenta la finestra e contiene molte API del browser.
- `document`: rappresenta il documento HTML caricato nella pagina.
DOM e creazione nodi:
```js
const li = document.createElement("li");
const text = document.createTextNode("Testo");
li.appendChild(text);
document.querySelector("ul").appendChild(li);
```
Array utili:
```js
array.forEach(element => {});
array.map(element => nuovoElemento);
array.filter(element => condizione);
array.find(element => condizione);
array.sort((a, b) => a - b);
```
#### NODE.JS
- **Node.js**: ambiente runtime che permette di eseguire JavaScript fuori dal browser.
- È basato sul motore **V8** di Google.
- Può accedere a risorse del sistema operativo, file system, rete e server.
- Ha architettura single-thread, ma gestisce operazioni asincrone non bloccanti grazie all’event loop
- Può gestire più richieste senza bloccare il programma durante operazioni lente, come lettura file o richieste di rete.
Moduli
- **Core modules**: già inclusi in Node.js, per esempio `fs`, `http`, `path`.
- **Local modules**: file creati da noi.
- **Third-party modules**: installati con npm, per esempio `express`, `morgan`, `cors`.
Express:
- **Express** è un framework third-party per Node.js.
- Semplifica la creazione di server, rotte, middleware e API.
Esempio base:
```js
const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/exams", (req, res) => {
  res.json([]);
});

app.post("/api/exams", (req, res) => {
  res.status(201).json(req.body);
});

app.listen(3000, () => {
  console.log("Server avviato");
});
```
Middleware:
- Funzione che sta tra richiesta e risposta.
- Può leggere/modificare `req`, `res` o passare al middleware successivo con `next()`.
    In Express si può abilitare con il middleware `cors`, ad esempio `app.use(cors())`.
```js
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
```
Gestione 404:
```js
app.use((req, res) => {
  res.status(404).json({
    error: "Rotta non trovata"
  });
});
```
Gestione errori:
```js
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Errore interno del server"
  });
});
```
Wrapping Node.js:
- Quando Node.js esegue un file, lo incapsula in una funzione.
- Per questo esistono variabili come:
```js
__dirname   // percorso assoluto della cartella del file corrente
__filename  // percorso assoluto del file corrente
require     // importa moduli/file in CommonJS
module      // rappresenta il modulo/file corrente
exports     // oggetto usato per esportare valori dal modulo
```