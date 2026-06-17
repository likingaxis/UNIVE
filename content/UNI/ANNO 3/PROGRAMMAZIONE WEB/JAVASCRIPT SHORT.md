# JavaScript — short per esame

## 1. Cos'è JavaScript
- Linguaggio della **parte dinamica del web**: HTML = struttura, CSS = stile, JS = comportamento.
- Nel browser è l'unico linguaggio standard lato client.
- Standard: **ECMAScript**, definito da **ECMA**. JavaScript è una sua implementazione.
- Non è compilato in senso classico: gira in un **JS engine** / macchina virtuale, es. V8 in Chrome.
- Caratteristiche: **dinamico**, **loosely typed**, **case sensitive**, con **garbage collector**.

## 2. Cosa permette di fare
- **DOM manipulation**: leggere/modificare HTML, CSS, nodi ed eventi.
- **AJAX**: richieste asincrone al server senza full page refresh. Storicamente XML, oggi soprattutto JSON.
- **Polyfill**: librerie/codice che aggiungono feature moderne a browser vecchi.

## 3. Cosa non può fare nel browser
- Accesso diretto e libero ai file locali: bloccato per sicurezza.
- Accesso libero a qualunque server remoto: limitato da Same-Origin Policy / CORS.

## 4. Basi e console
```html
<script src="script.js"></script>
```
```js
console.log("ciao");
alert("ciao");
prompt("scrivi");
confirm("ok?");
typeof x;
```
- JS può stare inline, dentro `<script>`, oppure in file esterno.
- La console dei DevTools serve per testare codice e fare debug.

## 5. Variabili, tipi, conversioni
```js
let x = 1;      // scope di blocco, modificabile
const y = 2;    // scope di blocco, non riassegnabile
var z = 3;      // scope di funzione, vecchio stile
```
Tipi primitivi: `string`, `number`, `bigint`, `boolean`, `symbol`, `null`, `undefined`.

Conversioni e metodi:
```js
parseInt("43");
Number("43");
String(42);
"ciao".toUpperCase();
(3.14159).toFixed(2);
```
Attenzione:
```js
"45" - 3; // 42
"45" + 3; // "453"
0 / 0;    // NaN
```
Confronti:
```js
"2" == 2;   // true, converte
"2" === 2;  // false, confronto stretto
```
Truthy/falsy: `0`, `""`, `false`, `null`, `undefined`, `NaN` sono falsy. Quasi tutto il resto è truthy.

Nullish coalescing:
```js
a ?? b // ritorna a se non è null/undefined, altrimenti b
```
Strict mode:
```js
"use strict";
```
Aggiunge controlli più severi, ad esempio evita variabili globali involontarie.

## 6. Switch
```js
switch (espressione) {
  case valore1:
    // istruzioni
    break;
  case valore2:
    // istruzioni
    break;
  default:
    // default
}
```
`break` evita il fall-through.

## 7. Funzioni
```js
function somma(a, b) {
  return a + b;
}
const somma2 = function(a, b) { return a + b; };
const somma3 = (a, b) => a + b;
```
- **One function, one action**: nome descrittivo e una sola responsabilità.
- Function expression: utilizzabile solo dopo la creazione.
- Funzione anonima: spesso usata come callback.
- Callback = funzione passata come argomento; non è per forza asincrona.
- Arrow function: sintassi breve, ma attenzione a `this`.

## 8. Scope
- Scope = dove una variabile è visibile.
- `let` / `const`: scope di blocco `{ }`.
- `var`: scope di funzione.
- Variabili/parametri non valorizzati: `undefined`.
- In strict mode, assegnare a variabili non dichiarate genera errore.

![[Pasted image 20260505150139.png|400]]

## 9. DEBUGGING CON CHROME (ESAME)
Strumento: **Chrome DevTools → Sources**.
- **Breakpoint**: blocca l'esecuzione su una riga.
- Permette di vedere variabili, call stack e flusso del programma.
- **Step over**: esegue la riga senza entrare nelle funzioni.
- **Step into**: entra nella funzione chiamata.
- **Step out**: esce dalla funzione corrente.
Da provare praticamente: il prof può chiedere di usarlo.

## 10. Oggetti
Oggetto = coppie chiave-valore.
```js
let studente = { nome: "Mario", eta: 20 };
studente.voto = 30;
studente.nome;
studente["nome"];
delete studente.voto;
```
Se una proprietà non esiste → `undefined`.

Metodo = funzione dentro oggetto:
```js
let studente = {
  nome: "Mario",
  saluta: function() { console.log("ciao"); }
};
studente.saluta();
```

## 11. Aliasing, riferimenti, garbage collector
Gli oggetti sono assegnati per **riferimento**.
```js
let luca = { voto: 30 };
let aneta = luca;
luca.voto = 18;
console.log(aneta.voto); // 18
```
Due oggetti distinti non sono uguali:
```js
{} == {}; // false
```
Il **garbage collector** libera oggetti non più raggiungibili. Un **memory leak** avviene quando dati inutili restano ancora referenziati.

## 12. `this`
`this` è l'oggetto che sta eseguendo la funzione. Viene deciso a **call time**.
```js
function sayMyName() { console.log(this.name); }
let a = { name: "pippo", saluta: sayMyName };
let b = { name: "pluto", saluta: sayMyName };
a.saluta(); // pippo
b.saluta(); // pluto
```
Arrow function: non ha un proprio `this`, prende quello esterno.
```js
let a = {
  name: "pippo",
  saluta: function() {
    let x = () => console.log(this.name);
    x();
  }
};
```

## 13. Costruttori e `new`
```js
function User(name) {
  this.name = name;
  this.isAdmin = false;
}
let user = new User("Pippo");
```
`new`: crea oggetto vuoto, lo assegna a `this`, esegue la funzione, ritorna l'oggetto.

## 14. JSDoc
```js
/**
 * @param {number} shortSideLen
 * @returns {number}
 */
function getGoldenRectangle(shortSideLen) {
  return shortSideLen * 1.61803398875;
}
```
Serve a documentare funzioni, parametri e ritorni.

## 15. Array
```js
let arr = [5, "ciao", false, undefined];
arr[0] = "nuovo";
arr.push("fine");
arr.unshift("inizio");
arr.pop();
arr.shift();
arr.length; // non length()
```
`delete arr[0]` non compatta l'array: lascia un buco. Meglio `splice`.

### Slice vs splice
```js
arr.slice(1, 4);          // nuovo array, originale invariato
arr.splice(3, 2);         // modifica originale
arr.splice(start, deleteCount, ...nuoviElementi);
```

### Iterazione e metodi
```js
for (let i in arr) {} // indici/chiavi
for (let v of arr) {} // valori
arr.forEach(item => console.log(item));
arr.indexOf("b");
arr.join(" - ");
arr.map(item => item.length);
[1,2,3].reduce((acc, item) => acc + item, 0);
```
- `forEach`: itera.
- `map`: trasforma e ritorna nuovo array.
- `reduce`: riduce a un singolo valore.

## 16. Stringhe
```js
let s = "Ciao a tutti";
s.indexOf("a");
s.slice(1);
s.trim();
s.charAt(1);
s.toUpperCase();
s.toLowerCase();
```
Replace:
```js
"ciao ciao".replace("ciao", "bye");  // solo prima
"ciao ciao".replace(/ciao/g, "bye"); // tutte
```
Template string:
```js
let n = 3;
`Lezione numero ${n}`;
```
Array e stringhe sono oggetti, ma è meglio usare la forma letterale: `[]`, `"ciao"`.

## 17. Oggetti built-in
### Date, Math, JSON
```js
new Date();
Math.max(1, 5);
Math.round(3.6);
Math.random();
```
JSON:
```js
let studente = { nome: "Mario", eta: 20 };
let s = JSON.stringify(studente); // oggetto -> stringa JSON
let o = JSON.parse(s);            // stringa JSON -> oggetto
```
JSON rappresenta dati, non istanzia oggetti con metodi.

### Window e location
Nel browser l'oggetto globale è `window`.
```js
alert("ciao");        // window.alert("ciao")
setTimeout(() => console.log("dopo"), 1000);
const id = setInterval(() => console.log("ripeti"), 1000);
clearInterval(id);
location.reload();
```
Esempio intervallo massimo 4 volte:
```js
let i = 0;
const s = setInterval(function() {
  console.log("ciao");
  i++;
  if (i == 4) clearInterval(s);
}, 5000);
```

## 18. Eccezioni
```js
try {
  throw new Error("The message");
} catch (e) {
  console.error(e);
} finally {
  console.log("sempre");
}
```
- `throw`: genera errore.
- `catch`: intercetta errore.
- `finally`: eseguito sempre.
Un errore può essere intercettato più in alto nel **call stack**.

![[Pasted image 20260505145652.png|600]]

## 19. Funzioni che ritornano funzioni
```js
function multisum(p1) {
  let x = p1;
  return function sum(a, b) {
    return x * (a + b);
  };
}
multisum(10)(1, 2);
let s = multisum(15);
s(12, 13);
```

## 20. Closure
Closure = funzione interna che usa variabili dello scope esterno e continua ad averle disponibili anche dopo la fine della funzione esterna.
```js
function salutatore(name) {
  let text = "Ciao " + name;
  return function() { alert(text); };
}
let s = salutatore("Lorenzo");
s();
```
Uso importante: dati privati.
```js
function counter() {
  let a = 0;
  return {
    inc: () => a++,
    dec: () => a--,
    get: () => a,
    reset: () => a = 0
  };
}
let c = counter();
c.inc(); c.inc();
console.log(c.get()); // 2
console.log(c.a);     // undefined
```
`a` non è accessibile direttamente: è privata nello scope di `counter`.

## 21. IIFE
IIFE = funzione anonima invocata subito.
```js
(function() {
  let a = 0;
  let b = 0;
  function pippo(x, y) { return x * y; }
})();
```
Serve a creare scope locale e non sporcare il global scope.

Quiz slide 120:
```js
(function() {
  let a = b = 5;
})();
console.log(b);
```
Non è `let a = 5; let b = 5;`, ma `b = 5; let a = b;`. Senza strict mode, `b` diventa globale (`window.b`) e stampa `5`.

## 22. Ereditarietà prototipale
Ogni oggetto può avere un **prototipo**. Se una proprietà non è nell'oggetto, JS la cerca nel prototipo, poi nel prototipo del prototipo: **prototype chain**.
```js
pippo.hasOwnProperty("university");
Student.prototype.sayName = function() { return this.name; };
```
- Proprietà proprie: definite direttamente sull'oggetto.
- Proprietà ereditate: trovate nel prototipo.
- `Student.prototype`: prototipo collegato al costruttore.
- `pippo.__proto__`: prototipo effettivo dell'oggetto.
Se modifico il prototipo esistente, anche gli oggetti vecchi vedono la modifica. Se riassegno tutto il prototype, solo i nuovi oggetti usano il nuovo prototipo.

![[Pasted image 20260507145440.png]]

### call e apply
```js
sayName.call(pippo, arg1, arg2);
sayName.apply(pippo, [arg1, arg2]);
```
Entrambi impostano manualmente `this`; `call` passa argomenti separati, `apply` dentro array.

### Copiare oggetti
```js
let c1 = { ...obj };             // shallow copy
let c2 = Object.assign({}, obj); // shallow copy
let c3 = structuredClone(obj);   // deep copy moderna, se supportata
```
Shallow copy copia solo il primo livello; gli oggetti annidati restano riferimenti.

## 23. Oggetto globale
Nel browser l'oggetto globale è `window`.
```js
var foo = "foobar";
foo === window.foo; // true
```
Con `var`, una globale diventa proprietà di `window`; con `let` e `const` no nello stesso modo.
Ambienti: browser = `window`, Node.js = `global`, Web Worker = `WorkerGlobalScope`.

## 24. DOM manipulation
DOM = rappresentazione ad albero della pagina. Radice: `document`. Ogni elemento è un nodo; anche il testo è nodo di testo.

### Selettori
```js
document.getElementById("miodiv");
document.getElementsByClassName("warning");
document.getElementsByTagName("p");
document.querySelector(".classe");
document.querySelectorAll("p .warning");
```
I metodi al plurale restituiscono `NodeList` o `HTMLCollection`.

### Modificare contenuto
```js
el.innerHTML = "<b>Ciao</b>"; // interpreta HTML
el.textContent = "Ciao";     // testo puro
```

### Eventi
```html
<button onclick="saluta()">Clicca</button>
```
```js
btn.onclick = saluta;
btn.addEventListener("click", saluta); // senza "on"
```
L'handler è la funzione eseguita quando l'evento avviene. L'oggetto evento contiene info come `target`, posizione mouse, elemento coinvolto.

Eventi principali: `click`, `focus`, `blur`, `change`, `load`, `mousedown`, `mouseup`, `mousemove`, `mouseover`, `mouseout`, `submit`.

### Caricamento script
```html
<script src="script.js" defer></script>
```
- `defer`: esegue dopo il parsing del DOM.
- `async`: esegue appena scaricato, non aspetta necessariamente il DOM.
Per manipolare il DOM, spesso meglio `defer`.

### CSS dal DOM
```js
el.style.marginTop = "20px";
el.style.backgroundColor = "red";
```
Le proprietà con trattino diventano camelCase: `margin-top` → `marginTop`.

### Creare nodi
```js
const newDiv = document.createElement("div");
const text = document.createTextNode("Ciao!");
newDiv.appendChild(text);
document.getElementById("mydiv").appendChild(newDiv);
```
Metodi: `appendChild`, `insertBefore`, `replaceChild`, `removeChild`.

## 25. JavaScript asincrono
Sincrono = istruzioni una dopo l'altra. Asincrono = operazioni avviate e gestite mentre il resto continua.
Esempi: timer, eventi, caricamento immagini, `fetch`.

```js
setTimeout(function () {
  modal.classList.add('show');
}, 2000);
modal.style.backgroundColor = 'red';
```
Il timer viene affidato al browser; il codice successivo continua subito.

Callback ≠ sempre asincrono:
```js
buttons.forEach(el => el.style.backgroundColor = 'white'); // sincrono
```

## 26. Event Loop
Componenti:
- **Call Stack**: funzioni in esecuzione.
- **Web APIs**: timer, eventi, fetch gestiti dal browser.
- **Callback Queue / Message Queue**: callback pronte.
- **Microtask Queue**: Promise.
- **Event Loop**: porta callback nella Call Stack quando è vuota.

Flusso: codice sincrono → Web APIs per task asincrone → coda → Event Loop → Call Stack.

![[Pasted image 20260517181049.png|562]]

![[slides_21_24_event_loop.gif]]

Regola: `setTimeout(..., 0)` parte comunque dopo il codice sincrono.

## 27. Promise
Promise = oggetto che rappresenta un risultato futuro di operazione asincrona. Evita callback hell.
Stati: `pending`, `fulfilled`, `rejected`.
```js
const promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve("done");
  }, 1000);
});
```
La funzione del costruttore parte subito. Una Promise termina una sola volta: o `resolve` o `reject`.

![[Pasted image 20260517184004.png|528]]

### then, catch, finally
```js
promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("fine"));
```
- `then`: successo.
- `catch`: errore.
- `finally`: sempre.

### Promise chain
```js
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```
Ogni `.then()` restituisce una nuova Promise e passa il risultato al successivo.

![[Pasted image 20260517185434.png|527]]

### Microtask Queue
Le Promise usano la **Microtask Queue**, che ha priorità sulla Callback Queue.
```js
console.log('Start');
setTimeout(() => console.log('Timer 0'), 0);
Promise.resolve('Promise').then(res => console.log(res));
console.log('Stop');
```
Ordine: `Start`, `Stop`, `Promise`, `Timer 0`.

![[Pasted image 20260517190340.png|508]]

## 28. Fetch e AJAX
`fetch()` fa richieste HTTP asincrone e ritorna una Promise.
```js
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
```
Pipeline: `fetch` → `Response` → `res.json()` → dati JS → `catch` per errori.
`res.json()` ritorna un'altra Promise perché leggere/convertire il body è asincrono.

![[Pasted image 20260521173037.png|432]]

### GET e POST
GET = ottenere dati.
```js
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => console.log(data));
```
POST = inviare dati nel body.
```js
const myPost = { title: "A post", body: "42", userId: 2 };
const options = {
  method: "POST",
  body: JSON.stringify(myPost),
  headers: { "Content-Type": "application/json" }
};
fetch("https://jsonplaceholder.typicode.com/posts", options)
  .then(res => res.json())
  .then(data => console.log(data));
```
Nel body HTTP mando testo, quindi uso `JSON.stringify`.

## 29. Async / await
`async` e `await` sono **syntactic sugar** sulle Promise.
```js
async function f() {
  return 1;
}
f().then(result => console.log(result));
```
Una funzione `async` ritorna sempre una Promise.

`await` aspetta il risultato di una Promise dentro una funzione `async`.
```js
async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  console.log(data);
}
fetchUsers();
```
Non elimina l'asincronia: rende il codice più leggibile.

### Errori con async/await
```js
async function f() {
  try {
    let response = await fetch("http://no-such-url");
  } catch (err) {
    alert(err);
  } finally {
    console.log("operazione terminata");
  }
}
```
Se la Promise viene rifiutata, l'errore viene trattato come un `throw` nel punto dell'`await`.

Esempio GET:
```js
async function fetchUsers(endpoint) {
  const res = await fetch(endpoint);      // microtask
  const data = await res.json();          // microtask
  const usernames = data.map(user => user.username);
  console.log(usernames);
}
```

## 30. CORS
Same-Origin Policy: uno script può accedere liberamente solo a risorse della stessa origine:
```text
protocollo + dominio + porta
```
CORS permette al server di dire al browser quali origini sono autorizzate.

- **Simple request**: richieste cross-origin semplici, es. `GET`, `HEAD`, alcune `POST` con content-type semplici.
- **Preflight request**: per richieste complesse, il browser manda prima una richiesta di controllo.
- CORS non blocca internet: blocca l'accesso da JS alla risposta se il server non autorizza.

Nota appunti: **CORS non è da fare**, quindi basta il concetto generale.

## 31. Ripasso lampo
- JS = comportamento dinamico della pagina.
- DOM = albero modificabile con JS.
- `let`/`const` scope di blocco, `var` scope di funzione.
- `===` meglio di `==`.
- Oggetti/array per riferimento.
- `this` dipende dalla chiamata; arrow prende `this` esterno.
- Closure = funzione che ricorda scope esterno.
- IIFE = funzione eseguita subito per creare scope locale.
- Prototipi = ereditarietà tramite prototype chain.
- `addEventListener("click", fn)`, senza `on`.
- `defer` utile se JS manipola DOM.
- Event Loop: stack vuota → microtask → callback.
- Promise = risultato futuro; `then/catch/finally`.
- `async/await` = Promise più leggibili.
- `fetch` ritorna Promise; `res.json()` ritorna Promise.
- POST: `method`, `body: JSON.stringify(...)`, header JSON.
