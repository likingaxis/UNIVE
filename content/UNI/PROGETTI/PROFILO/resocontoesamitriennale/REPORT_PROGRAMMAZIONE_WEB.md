# Resoconto Corso: Programmazione Web

- **Anno:** 3° Anno Triennale
- **Area:** Ingegneria Informatica / Sistemi di Elaborazione delle Informazioni e Sviluppo Web Full-Stack (ING-INF/05)
- **Riferimenti e Testi:** Materiale didattico ufficiale, standard W3C/WHATWG, documentazione MDN Web Docs, guide e repository del progetto full-stack.

---

## Obiettivi del Corso in Sintesi

Il corso fornisce le competenze teoriche, architetturali e pratiche per la progettazione e implementazione di applicazioni web moderne full-stack conformi agli standard industriali. Vengono approfonditi i protocolli e i modelli di rete del Web (architettura client-server, DNS, protocollo HTTP stateless, policy CORS), la strutturazione dei contenuti con HTML5 semantico, la modellazione del layout e del rendering con CSS3 avanzato (Box Model, specificità, Flexbox, Grid, Responsive Web Design), la logica di programmazione frontend con JavaScript moderno (ES6+, DOM, eventi, closures, Event Loop, Promise e Fetch API), lo sviluppo del backend con runtime Node.js e framework Express.js (routing RESTful, middleware, gestione errori), fino alle metodologie di autenticazione e sicurezza (cookie di sessione, token JWT) e al controllo di versione con Git.

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### 1. Architettura del Web e Protocolli di Comunicazione
- **Il modello Client-Server sul Web:**
  - Ruoli: Client / User Agent (browser web) e Server (Web server e Application server).
  - Risoluzione dei nomi: **DNS (Domain Name System)**, mappatura tra hostname leggibili (FQDN) e indirizzi IP, record di tipo A e CNAME.
- **Il Protocollo HTTP (HyperText Transfer Protocol):**
  - Modello Request-Response e natura **stateless** (assenza di memoria nativa tra richieste distinte).
  - Anatomia della richiesta HTTP (metodo, request target/URI, versione HTTP, headers, body opzionale).
  - Anatomia della risposta HTTP (versione, status code, reason phrase, headers, body/payload).
  - **Metodi HTTP standard:**
    - `GET`: recupero sicuro e idempotente di una risorsa.
    - `POST`: invio di dati per creazione risorsa o esecuzione operazione non idempotente.
    - `PUT`: sostituzione completa e idempotente della risorsa indicata.
    - `PATCH`: modifica parziale di una risorsa preesistente.
    - `DELETE`: rimozione della risorsa identificata.
    - `OPTIONS`: negoziazione delle capacità e preflight CORS.
  - **Classi di Codici di Stato HTTP:**
    - `1xx`: informativi (es. 101 Switching Protocols).
    - `2xx`: successo (`200 OK`, `201 Created`, `204 No Content`).
    - `3xx`: reindirizzamento (`301 Moved Permanently`, `302 Found`, `304 Not Modified`).
    - `4xx`: errori client (`400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`).
    - `5xx`: errori server (`500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable`).
  - Headers fondamentali: `Content-Type` (es. `application/json`, `text/html`), `Accept`, `Authorization`, `Cookie`, `Set-Cookie`.
- **CORS (Cross-Origin Resource Sharing) e Sicurezza del Browser:**
  - **Same-Origin Policy (SOP):** isolamento tra origini definite dalla tripla (protocollo, dominio/host, porta).
  - Meccanismo di condivisione sicura CORS:
    - *Richieste Semplici:* invio diretto con controllo dell'header di risposta `Access-Control-Allow-Origin`.
    - *Richieste Preflight:* invio automatico preventivo di una richiesta con metodo `OPTIONS` per verificare autorizzazioni, metodi ammessi (`Access-Control-Allow-Methods`) e headers consentiti (`Access-Control-Allow-Headers`).

---

### 2. Struttura dei Documenti con HTML5 Semantico
- **Fondamenti di HTML5:**
  - Struttura base del documento: `<!DOCTYPE html>`, tag `<html>`, sezione `<head>` con metadati tecnici (encoding UTF-8, `<title>`, meta viewport per dispositivi mobili `<meta name="viewport" content="width=device-width, initial-scale=1.0">`), sezione `<body>`.
- **Tag Semantici di HTML5:**
  - Tag strutturali: `<header>` (intestazione visibile di pagina o sezione), `<nav>` (blocchi di navigazione), `<main>` (contenuto principale unico del documento), `<section>` (suddivisione tematica generica), `<article>` (unità di contenuto autonoma e distribuibile), `<aside>` (contenuti correlati secondari), `<footer>` (chiusura di pagina o sezione).
  - Vantaggi dell'HTML semantico: accessibilità per screen reader e tecnologie assistive (A11y), ottimizzazione per motori di ricerca (SEO), pulizia e manutenibilità del codice sorgente.
- **Form e Acquisizione Dati Utente:**
  - Tag `<form>` (attributi `action`, `method`).
  - Controlli utente: `<input>` (tipi `text`, `number`, `email`, `password`, `date`, `radio`, `checkbox`, `submit`), `<textarea>`, `<select>` con `<option>`, `<button>`.
  - Attributi di validazione nativa HTML5: `required`, `min`, `max`, `pattern` (espressioni regolari), `maxlength`.

---

### 3. Fogli di Stile e Layout con CSS3
- **Integrazione e Sintassi CSS:**
  - Modalità di collegamento: foglio esterno (`<link rel="stylesheet">`), interno (`<style>`), stili in linea.
  - Il **DOM (Document Object Model)** come albero gerarchico di nodi renderizzati.
- **Selettori e Specificità CSS:**
  - Tipologie di selettori: per elemento/tag, per classe (`.nome-classe`), per ID (`#nome-id`), per attributo (`[type="text"]`).
  - Combinatori: discendente (`div p`), figlio diretto (`div > p`), fratello adiacente (`h2 + p`), fratello generale (`h2 ~ p`).
  - Pseudo-classi di interazione e strutturali: `:hover`, `:focus`, `:active`, `:first-child`, `:nth-child()`, `:disabled`.
  - Pseudo-elementi: `::before`, `::after`.
  - **Calcolo della Specificità (Vettore $[a, b, c, d]$):**
    - $a$: stili in linea.
    - $b$: numero di selettori ID.
    - $c$: numero di classi, attributi e pseudo-classi.
    - $d$: numero di elementi e pseudo-elementi.
    - Regola di risoluzione dei conflitti: confronto lessicografico da sinistra a destra; clausola di override `!important`.
- **Il Box Model CSS:**
  - Componenti concentrici: Content $\to$ Padding $\to$ Border $\to$ Margin.
  - Proprietà `box-sizing`:
    - `content-box` (default): larghezza effettiva $= \text{width} + \text{padding} + \text{border}$.
    - `border-box`: larghezza effettiva coincidente con `width` (padding e border inclusi all'interno).
- **Sistemi di Posizionamento (Position):**
  - `static`: posizionamento naturale nel normale flusso del documento.
  - `relative`: traslazione rispetto alla posizione naturale senza alterare lo spazio occupato.
  - `absolute`: posizionamento rispetto al primo antenato non statico (o rispetto al body).
  - `fixed`: posizionamento ancorato alle coordinate del viewport della finestra del browser.
  - `sticky`: ibrido tra relative e fixed dipendente dallo scroll.
- **Modelli di Layout Moderni:**
  - **Flexbox (Layout Monodimensionale):** contenitore flessibile (`display: flex`), gestione asse principale (*main axis*) e trasversale (*cross axis*), direzioni (`flex-direction: row | column`), allineamento (`justify-content`, `align-items`), comportamento di a-capo (`flex-wrap`), gap tra elementi e ordinamento visivo (`order`).
  - **CSS Grid (Layout Bidimensionale):** contenitore a griglia (`display: grid`), definizione di righe e colonne (`grid-template-columns`, `grid-template-rows` con unità frazionarie `fr`), posizionamento esplicito su linee di griglia o tramite aree con nome (`grid-template-areas`).
- **Responsive Web Design (RWD):**
  - Filosofia *Mobile-First*.
  - Media Queries: regole condizionali basate su breakpoint di ampiezza viewport (`@media (min-width: ...)`). Unità di misura relative (`rem`, `em`, `%`, `vw`, `vh`). Cenni su framework CSS (Bootstrap).

---

### 4. Linguaggio JavaScript (ES6+) e Manipolazione del DOM
- **Caratteristiche del linguaggio:**
  - Linguaggio di scripting interpretato/JIT, a tipizzazione debole e dinamica (*loosely typed*), gestione automatica della memoria tramite Garbage Collector.
  - Tipi primitivi vs Oggetti complessi; mutabilità.
  - Dichiarazione di variabili: `var` (scope di funzione, hoisting), `let` (scope di blocco), `const` (scope di blocco con binding costante).
  - Manipolazione avanzata di Array: metodi funzionali `forEach`, `map`, `filter`, `find`, `reduce`, `sort`.
- **Modello ad Oggetti e Prototipi:**
  - Oggetti letterali con proprietà chiave-valore. Funzioni costruttore.
  - Ereditarietà prototipale: proprietà `prototype`, catena dei prototipi (**Prototype Chain**) e risalita per lookup di proprietà; ispezione tramite `Object.getPrototypeOf()` / `__proto__`.
  - Sintassi delle classi ES6: costruttori (`constructor`), metodi d'istanza e statici, ereditarietà con `extends` e `super`.
- **Funzioni di Ordine Superiore, Scope e Chiusure (Closures):**
  - Funzioni come cittadini di prima classe (assegnabili a variabili, passabili come argomenti, restituibili da altre funzioni).
  - **Closures:** meccanismo per cui una funzione interna mantiene accesso alle variabili del suo lexical environment esterno anche dopo che la funzione genitrice è terminata (incapsulamento e data privacy).
  - **IIFE (Immediately Invoked Function Expressions):** funzioni eseguite immediatamente alla definizione per isolare lo scope.
- **Manipolazione del DOM ed Event Driven Programming:**
  - Selezione di elementi: `document.getElementById()`, `document.querySelector()`, `document.querySelectorAll()`.
  - Creazione e modifica nodi: `document.createElement()`, `document.createTextNode()`, `appendChild()`, `removeChild()`, proprietà `textContent` (sicura da XSS) vs `innerHTML`.
  - Gestione eventi: `addEventListener()`, rimozione ascoltatori, oggetto `event`, arresto della propagazione (`event.stopPropagation()`), soppressione comportamenti di default (`event.preventDefault()`). Meccanismi di **Event Bubbling** e delega degli eventi.

---

### 5. Asincronia in JavaScript, Event Loop e Fetch API
- **Architettura Single-Threaded ed Event Loop di JavaScript:**
  - Struttura del motore di esecuzione:
    - **Call Stack:** stack di esecuzione sincrono a singolo thread.
    - **Web APIs (nel browser) / Node APIs (in Node.js):** esecuzione asincrona delegata (timer, richieste di rete, I/O su filesystem).
    - **Microtask Queue:** coda ad altissima priorità riservata alla risoluzione delle callback di Promise (`.then`, `.catch`, `await`).
    - **Macrotask Queue (Task Queue):** coda per eventi di timer (`setTimeout`, `setInterval`), eventi I/O e callback utente.
  - **Ciclo operativo dell'Event Loop:** esecuzione dello stack sincrono fino a svuotamento $\to$ consumo di *tutti* i task nella Microtask Queue $\to$ estrazione di un singolo macrotask dalla Task Queue $\to$ rendering della pagina.
- **Evoluzione della gestione dell'asincronia:**
  - Callback asincrone e limiti (*Callback Hell* / *Pyramid of Doom*).
  - **Promise:** oggetto che rappresenta il completamento o fallimento eventuale di un'operazione asincrona. Stati: `pending`, `fulfilled`, `rejected`. Concatenazione tramite `.then()`, gestione centralizzata degli errori con `.catch()`, finalizzazione con `.finally()`.
  - **Async / Await:** costrutti ES8 per scrivere codice asincrono con sintassi sequenziale e leggibile, gestione delle eccezioni tramite blocchi `try ... catch`.
- **Comunicazione Client-Server con Fetch API:**
  - Utilizzo di `fetch(url, options)` per richieste HTTP asincrone verso API REST.
  - Configurazione: metodo HTTP (`GET`, `POST`, `PUT`, `DELETE`), headers (`'Content-Type': 'application/json'`), serializzazione del body con `JSON.stringify()`.
  - Gestione della risposta: parsing asincrono del JSON (`await response.json()`), verifica dello stato (`response.ok`, `response.status`).

---

### 6. Sviluppo Backend con Node.js ed Express.js
- **Runtime Node.js:**
  - Motore V8 di Google per l'esecuzione di JavaScript lato server.
  - Architettura orientata agli eventi non bloccante (*Non-Blocking I/O* basato su thread pool interno libuv): gestione di migliaia di connessioni concorrenti su un unico thread principale.
  - Sistema di moduli CommonJS: importazione con `require()` ed esportazione con `module.exports`; wrapper di modulo (`__dirname`, `__filename`, `module`, `exports`).
  - Gestore di pacchetti **npm** e file `package.json` (gestione delle dipendenze, script di avvio).
- **Framework Express.js:**
  - Inizializzazione del server e ascolto su porta di rete (`app.listen()`).
  - **Routing RESTful:** mappatura dichiarativa degli endpoint HTTP (`app.get()`, `app.post()`, `app.put()`, `app.delete()`).
  - Oggetti `req` e `res`: estrazione di parametri dinamici di rotta (`req.params`), parametri di query string (`req.query`), payload JSON (`req.body`), invio risposte formattate (`res.json()`, `res.status()`, `res.send()`, `res.sendFile()`).
  - **Architettura a Middleware:** funzioni a catena `(req, res, next)` che intercettano e manipolano il flusso; middleware applicativi, router middleware, middleware di terze parti (`cors`, `morgan`), middleware per file statici (`express.static()`), middleware per parsing JSON (`express.json()`).
  - **Gestione degli Errori e Rotte 404:** middleware catch-all terminale per risorse non trovate (status 404); middleware a 4 argomenti `(err, req, res, next)` per la cattura e formattazione unificata degli errori non gestiti (status 500).

---

### 7. Autenticazione, Sessioni, Cookie e Token (JWT)
- **Concetti Fondamentali:**
  - **Autenticazione:** verifica dell'identità dell'utente (*chi sei*).
  - **Autorizzazione:** verifica dei permessi e privilegi sulle risorse (*cosa puoi fare*).
- **Gestione dello Stato su Protocollo Stateless:**
  - **Cookie e Sessioni Server-Side:**
    - Utilizzo del middleware `express-session`.
    - Creazione della sessione sul server a seguito del login; invio dell'identificatore opaco di sessione al browser tramite header `Set-Cookie`.
    - Memorizzazione del cookie nel browser e reinvio automatico nelle richieste successive; recupero dell'istanza utente dallo store della sessione.
  - **Token-Based Authentication (Bearer Token):**
    - Architettura stateless: il server non mantiene tabelle di sessione in memoria.
    - Il client riceve il token all'atto del login e lo memorizza localmente, trasmettendolo esplicitamente nell'header: `Authorization: Bearer <token>`.
  - **JSON Web Token (JWT):**
    - Struttura compatta formata da 3 componenti codificati Base64Url e separati da punti: `Header.Payload.Signature`.
    - *Header:* tipo di token e algoritmo crittografico (es. HMAC-SHA256).
    - *Payload:* asserzioni (*claims*) relative all'utente e ai metadati (es. `userId`, `role`, `exp` per la scadenza).
    - *Signature:* firma digitale calcolata sul digest di header e payload usando un segreto condiviso (*secret key*), garantendo l'integrità del dato contro manomissioni.
    - Middleware Express per l'ispezione e la validazione del token JWT prima dell'accesso alle rotte protette.

---

### 8. Controllo di Versione con Git
- **Modello di Lavoro con Git:**
  - I 3 stati/aree di Git: Working Directory (modifiche locali) $\to$ Staging Area (preparazione snapshot con `git add`) $\to$ Repository Locale (salvataggio cronologico con `git commit`).
  - Integrazione con repository remoti (GitHub) tramite `git push` e `git pull`.
  - Comandi essenziali di esplorazione e tracciamento: `git status`, `git log --oneline`, gestione dei branch (`git branch`, `git checkout -b`, `git merge`).

---

## Linguaggi, Strumenti e Tecnologie
- **Linguaggi e Standard:** HTML5, CSS3, JavaScript (ECMAScript 2020+), JSON.
- **Ambiente Backend & Runtime:** Node.js, Express.js, npm.
- **Strumenti di Sviluppo, Test e Debugging:**
  - Git e GitHub per versionamento del codice e documentazione specifica.
  - Browser DevTools: pannello *Elements* (ispezione DOM e Box Model), pannello *Console* (log e debugging JS), pannello *Network* (ispezione dettagliata richieste HTTP, header, payload JSON, codici di stato), pannello *Application* (ispezione cookie, storage).
  - Client REST per test API: Postman, cURL.

---

## Tipologia Esercizi e Prove d'Esame
- **Realizzazione del Progetto Full-Stack (Portale Web Universitario):**
  - **Fase 1 - Specifica dei requisiti (`specifiche/progetto.md`):** redazione del documento di progetto prima dello sviluppo (obiettivi, ruoli utente studente/docente, lista funzionalità, mockup essenziali, scenari di test).
  - **Fase 2 - Frontend Statico Semantico e Responsive:** implementazione della struttura HTML5 semantica e styling completo con CSS3 (layout responsive con Flexbox e Grid, Mobile-First, form per inserimento dati, stati visivi).
  - **Fase 3 - Backend RESTful con Node.js ed Express:** creazione di server `server.js`, configurazione middleware (`express.json()`, `express.static()`), implementazione di rotte REST complete (`GET /api/exams`, `GET /api/exams/:id`, `POST /api/exams`, `DELETE /api/exams/:id`) con status code conformi (`200`, `201`, `400`, `404`, `500`).
  - **Fase 4 - Integrazione Asincrona Frontend-Backend:** implementazione di script `app.js` con funzioni `async/await` e chiamate `fetch`, rendering dinamico delle card nel DOM, sottomissione form docente con validazione client e server, gestione completa dei 4 stati UI fondamentali (*Loading*, *Success*, *Error*, *Empty State*).
  - **Fase 5 - Extra e Rifinitura:** aggiunta di filtri di ricerca con query parameters (`/api/exams?search=...`), cancellazione elementi, persistenza su file JSON, README tecnico con istruzioni di avvio e test.
- **Prova Orale e Discussione del Progetto:**
  - Dimostrazione pratica dell'applicazione in esecuzione e verifica del funzionamento end-to-end con i DevTools aperti.
  - Domande teoriche approfondite: funzionamento dettagliato dell'Event Loop di JavaScript (Call Stack vs Microtask vs Task Queue), differenze tra `let`, `const` e `var`, meccanismo delle chiusure (closures) ed ereditarietà prototipale, calcolo della specificità CSS, ciclo di vita delle richieste HTTP e differenze architetturali tra sessioni a cookie e token JWT.
