- [x] serata 1
- [x] serata 2
- [x] serata 3
- [x] serata 4
- [x] serata 5
- [x] serata 6
- [x] serata 7
- [ ] serata 8
- [ ] serata 9
- [ ] serata 10




## Piano operativo — 10 serate da circa 2 ore

|Serata|Obiettivo concreto|Cosa faremo insieme|Argomenti ripassati|Output finale della serata|
|--:|---|---|---|---|
|1|Definire bene il progetto e scrivere le specifiche|Scriviamo il documento `specifiche/progetto.md` con obiettivo, utenti, funzionalità, struttura frontend, mockup minimale e scenari di test. Deve essere fatto prima dello sviluppo, come chiede il prof .|Git, specifiche, progettazione, requisiti, uso AI|Cartella `specifiche/` + file `.md` pronto + primo commit: `specifiche: primo documento di specifica del progetto`|
|2|Creare struttura del progetto e HTML semantico|Creiamo repository, `package.json`, cartelle, `index.html`, sezioni principali: header, nav, appelli, orari, comunicazioni, archivio, area docente.|HTML semantico, form, input, accessibilità base|Prima pagina statica navigabile|
|3|Costruire layout CSS responsive|Scriviamo `style.css`: layout con Flexbox/Grid, card, form, sezioni, responsive mobile, stati visivi.|CSS, box model, selettori, specificità, Flexbox/Grid, responsive|Sito statico presentabile graficamente|
|4|Creare backend Express minimo|Creiamo `server.js`, installiamo Express, usiamo `express.json()` e `express.static()`, avviamo server, serviamo frontend.|Node.js, npm, package.json, moduli, Express, middleware|Server funzionante + frontend servito da Express|
|5|Implementare API REST per appelli|Creiamo dati iniziali degli appelli, poi rotte `GET /api/exams`, `GET /api/exams/:id`, `POST /api/exams`. Risposte JSON e status code corretti.|HTTP, REST, JSON, status code, routing, parametri di rotta|Backend REST completo per la risorsa principale|
|6|Collegare frontend e backend con JavaScript|In `app.js` facciamo `fetch` con `async/await`, carichiamo appelli, mostriamo card nel DOM, click per dettaglio appello.|JavaScript, DOM, eventi, fetch, Promise, async/await|Lista appelli dinamica caricata dal backend|
|7|Gestire form docente, validazioni e stati UI|Facciamo submit del form con `POST`, validazione client, validazione server, messaggi di loading, errore, successo e lista vuota. Questi stati sono richiesti esplicitamente nel frontend .|Form, eventi, validazione, error handling, status code 400/404/500|Area docente simulata funzionante|
|8|Aggiungere sezioni secondarie: comunicazioni, orari, archivio|Inseriamo comunicazioni, orari e prove scritte passate. Possiamo farle statiche o tramite altre API semplici tipo `/api/notices`, `/api/lessons`, `/api/past-exams`.|Organizzazione dati, rendering DOM, struttura frontend|Portale completo nelle sue sezioni principali|
|9|Aggiungere 2/3 extra intelligenti|Scegliamo extra utili ma spiegabili: filtro per corso/docente, `DELETE`, eventuale `PUT`, salvataggio su file JSON. La consegna suggerisce modifica/cancellazione, filtri e persistenza come extra facoltativi .|Query params, DELETE/PUT, persistenza, gestione errori|Progetto più completo e più forte all’orale|
|10|Rifinitura, README, test manuali e simulazione orale|Scriviamo `README.md`, documentiamo uso AI, funzionalità, installazione, avvio, test manuali. Poi prepariamo cosa mostrare: DevTools, Network, Console, log server, git log.|README, Git, DevTools, Network, debugging, esposizione orale|Progetto pronto da presentare|

---

## Versione più dettagliata serata per serata

### Serata 1 — Specifiche, prima ancora del codice

Questa è importantissima perché il professore chiede esplicitamente un documento di specifiche **prima dello sviluppo**. Non dobbiamo saltarla.

File da creare:

```txt
specifiche/progetto.md
```

Dentro ci mettiamo:

```md
# Specifiche progetto — Portale Informatica Tor Vergata

## 1. Obiettivo dell'applicazione

## 2. Cosa può fare l'utente

## 3. Struttura del frontend

## 4. Mockup minimale

## 5. Scenari di test
```

Alla fine commit:

```bash
git add .
git commit -m "specifiche: primo documento di specifica del progetto"
```

Questo messaggio è proprio quello indicato dalla consegna .

---

### Serata 2 — HTML semantico

Costruiamo la pagina statica.

Struttura possibile:

```txt
public/
├── index.html
├── css/
│   └── style.css
└── js/
    └── app.js
```

Sezioni:

```html
<header>
<nav>
<main>
  <section id="appelli"></section>
  <section id="orari"></section>
  <section id="comunicazioni"></section>
  <section id="archivio"></section>
  <section id="area-docente"></section>
</main>
<footer>
```

Qui ripassi molto bene HTML semantico, form, input e organizzazione del contenuto.

---

### Serata 3 — CSS responsive

Obiettivo: farlo sembrare un portale universitario ordinato, non una pagina buttata lì.

Cose da usare:

```css
display: flex;
display: grid;
@media screen and (max-width: 768px) { ... }
```

Elementi grafici:

- navbar;
    
- card appelli;
    
- card comunicazioni;
    
- tabella/card orari;
    
- form docente;
    
- messaggi di errore/successo;
    
- layout mobile.
    

---

### Serata 4 — Backend Express

Creiamo il cuore Node/Express.

Struttura:

```txt
server.js
package.json
data/
  exams.json
public/
```

Middleware obbligatori:

```js
app.use(express.json());
app.use(express.static("public"));
```

Questi sono richiesti nella consegna: parsing JSON e file statici .

---

### Serata 5 — API REST appelli

Risorsa principale:

```txt
/api/exams
```

Oggetto esempio:

```js
{
  id: 1,
  corso: "Programmazione Web",
  docente: "Pierpaolo Loreti",
  data: "2026-07-10",
  ora: "09:00",
  aula: "Aula T1",
  tipo: "Scritto",
  note: "Prenotazione obbligatoria"
}
```

Rotte:

```js
GET /api/exams
GET /api/exams/:id
POST /api/exams
```

Status code da sapere spiegare:

```txt
200 OK
201 Created
400 Bad Request
404 Not Found
500 Internal Server Error
```

---

### Serata 6 — JavaScript frontend con fetch

Qui colleghiamo davvero browser e server.

Funzioni probabili:

```js
loadExams()
renderExams(exams)
showExamDetail(id)
```

Concetti da ripassare:

```js
async function loadExams() {
  const response = await fetch("/api/exams");
  const data = await response.json();
}
```

E all’orale puoi mostrare la richiesta nel pannello **Network** delle DevTools, cosa richiesta esplicitamente nella consegna .

---

### Serata 7 — Form, POST, validazioni, stati

Questa serata è molto importante perché copre tanti requisiti.

Stati da mostrare:

```txt
Caricamento...
Errore nel caricamento degli appelli
Nessun appello disponibile
Appello creato con successo
Campo corso obbligatorio
```

Validazione client:

```js
if (!corso || !docente || !data) {
  showError("Compila tutti i campi obbligatori");
  return;
}
```

Validazione server:

```js
if (!corso || !docente || !data) {
  return res.status(400).json({ error: "Dati non validi" });
}
```

Questa parte è fondamentale perché la consegna chiede sia validazione lato client sia lato server .

---

### Serata 8 — Comunicazioni, orari, archivio

Qui completiamo l’identità del portale.

Sezioni:

```txt
Comunicazioni
- cambio aula
- sospensione lezione
- avviso esame

Orari lezioni
- corso
- giorno
- orario
- aula
- docente

Archivio prove scritte
- corso
- anno
- tipo
- link al file/statico
```

Puoi farle in modo semplice. Non serve che tutto abbia POST. L’importante è che il progetto risulti completo ma non ingestibile.

---

### Serata 9 — Extra

Sceglierei massimo 2 o 3 extra.

I migliori per te secondo me sono:

|Extra|Perché conviene|
|---|---|
|Filtro appelli per corso/docente|Facile da spiegare, utile per query params|
|DELETE appello|Mostra un metodo REST in più|
|Persistenza su file JSON|Più realistico dei dati solo in memoria|
|PUT modifica appello|Bello, ma solo se rimane tempo|

Io farei:

```txt
GET /api/exams?corso=Programmazione Web
DELETE /api/exams/:id
salvataggio su data/exams.json
```

Sono extra buoni ma non troppo pericolosi.

---

### Serata 10 — Consegna, README, test, orale

La consegna richiede anche un `README.md` obbligatorio con titolo, descrizione, istruzioni, funzionalità, extra e note sull’uso dell’AI .

README:

```md
# Portale Informatica Tor Vergata

## Descrizione

## Installazione

npm install

## Avvio

npm start

## Funzionalità implementate

## Funzionalità extra

## Uso dell'AI
```

Poi prepariamo una mini scaletta orale:

```txt
1. Mostro il sito nel browser
2. Mostro appelli caricati via fetch
3. Apro DevTools > Network
4. Mostro GET /api/exams
5. Inserisco un appello valido
6. Mostro POST /api/exams con payload e response
7. Inserisco un appello non valido
8. Mostro errore 400
9. Mostro codice Express
10. Mostro git log
```

---

## Commit consigliati

Visto che la consegna dice che la storia dei commit deve mostrare fasi di sviluppo e non un unico commit finale , ti conviene fare commit piccoli.

Esempio:

```bash
git commit -m "specifiche: primo documento di specifica del progetto"
git commit -m "struttura: crea layout HTML iniziale"
git commit -m "stile: aggiunge layout responsive"
git commit -m "backend: configura server express"
git commit -m "api: aggiunge rotte REST per appelli"
git commit -m "frontend: carica appelli tramite fetch"
git commit -m "frontend: aggiunge form creazione appello"
git commit -m "validazione: gestisce errori client e server"
git commit -m "feature: aggiunge comunicazioni e orari"
git commit -m "extra: aggiunge filtro appelli"
git commit -m "docs: completa README e scenari di test"
```

---

## Obiettivo finale realistico

Alla fine delle 10 serate dovresti avere:

```txt
✅ Documento specifiche in Markdown
✅ Frontend HTML/CSS/JS separati
✅ Layout responsive
✅ Backend Node.js + Express
✅ API REST per appelli
✅ GET lista
✅ GET dettaglio
✅ POST creazione
✅ Validazione client
✅ Validazione server
✅ Stati loading/errore/successo/lista vuota
✅ Comunicazioni
✅ Orari lezioni
✅ Archivio prove passate
✅ 2 extra semplici
✅ README completo
✅ Commit progressivi
✅ Scenari di test manuali
✅ Preparazione orale
```
