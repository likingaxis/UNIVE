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
---

# Domande possibili JavaScript — risposte pronte da esame

Questa sezione serve per orale/scritto: risposte brevi, ordinate e complete. Le domande coprono gli argomenti del riassunto e quelle emerse nel PDF delle domande.

## 1. Che cos'è JavaScript?
JavaScript è il linguaggio che gestisce il **comportamento dinamico** delle pagine web. HTML descrive la struttura, CSS la presentazione, JavaScript il comportamento. Nel browser è il linguaggio standard lato client ed è basato sullo standard **ECMAScript**. Viene eseguito da un **JavaScript engine**, per esempio V8 in Chrome.

## 2. Quali sono le caratteristiche principali di JavaScript?
JavaScript è **dinamico**, perché viene eseguito a runtime; **loosely typed**, perché non devo dichiarare il tipo delle variabili; **case sensitive**, quindi `nome` e `Nome` sono variabili diverse; ed è gestito da un **garbage collector**, che libera memoria dagli oggetti non più raggiungibili.

## 3. JavaScript è compilato?
Non nel senso classico. Il codice JavaScript viene eseguito da un motore JavaScript. I motori moderni possono fare ottimizzazioni, ma dal punto di vista del programmatore JS è un linguaggio eseguito a runtime.

## 4. Cosa può fare JavaScript nel browser?
Può modificare il DOM, cambiare stili CSS, reagire agli eventi dell'utente, fare richieste asincrone al server con AJAX/fetch, gestire timer, validare form e aggiornare parti della pagina senza ricaricarla.

## 5. Cosa non può fare JavaScript nel browser?
Per sicurezza non può accedere liberamente ai file locali dell'utente e non può leggere liberamente risorse da qualunque dominio remoto. Le richieste cross-origin sono controllate da Same-Origin Policy e CORS.

## 6. Differenza tra `let`, `const` e `var`?
`let` dichiara una variabile modificabile con scope di blocco. `const` dichiara una variabile non riassegnabile, sempre con scope di blocco. `var` è il vecchio modo di dichiarare variabili e ha scope di funzione. Oggi si preferiscono `let` e `const`.

## 7. Cos'è lo scope?
Lo scope è la zona del codice in cui una variabile è visibile. Una variabile globale è visibile in tutto il programma. Una variabile locale è visibile solo dentro una funzione o un blocco, a seconda di come è dichiarata.

## 8. Differenza tra scope di `let` e scope di `var`?
`let` ha scope di **enclosing block**, quindi vale solo dentro le graffe `{ }` in cui è dichiarata. `var` ha scope di **function block**, quindi è visibile in tutta la funzione in cui è dichiarata.

## 9. Cosa significa `undefined`?
`undefined` indica che una variabile è stata dichiarata ma non ha ancora un valore, oppure che sto accedendo a una proprietà che non esiste o a un parametro non passato.

## 10. Differenza tra `==` e `===`?
`==` confronta due valori facendo conversioni automatiche di tipo. `===` confronta sia valore sia tipo, senza conversione automatica. Per esempio `"2" == 2` è `true`, mentre `"2" === 2` è `false`. All'esame conviene dire che `===` è più sicuro.

## 11. Cosa sono truthy e falsy?
In JavaScript alcuni valori si comportano come `false` nei controlli: `0`, `""`, `false`, `null`, `undefined`, `NaN`. Questi sono falsy. Quasi tutto il resto è truthy.

## 12. Cos'è `NaN`?
`NaN` significa Not a Number. È il risultato di un'operazione numerica non valida, per esempio `0 / 0` oppure una conversione numerica fallita.

## 13. A cosa serve `typeof`?
`typeof` restituisce il tipo di un valore o di una variabile. Esempio: `typeof "ciao"` restituisce `"string"`, `typeof 3` restituisce `"number"`.

## 14. A cosa serve la strict mode?
La strict mode si attiva con `"use strict";` e rende JavaScript più rigoroso. Per esempio impedisce alcune assegnazioni pericolose, come creare variabili globali involontarie assegnando un valore a una variabile mai dichiarata.

## 15. Cos'è una funzione?
Una funzione è un blocco di codice riutilizzabile che può ricevere parametri, eseguire istruzioni e restituire un valore con `return`.

## 16. Cos'è una function expression?
Una function expression è una funzione assegnata a una variabile. Viene creata quando l'esecuzione arriva a quella riga, quindi è utilizzabile solo dopo quel punto.

```js
const somma = function(a, b) {
  return a + b;
};
```

## 17. Cos'è una funzione anonima?
È una funzione senza nome. Si usa spesso come callback, cioè come funzione passata ad altre funzioni.

## 18. Cos'è una arrow function?
È una sintassi compatta per scrivere funzioni.

```js
const somma = (a, b) => a + b;
```

Attenzione: le arrow function non hanno un proprio `this`, ma prendono il `this` dal contesto esterno.

## 19. Cos'è una callback?
Una callback è una funzione passata come argomento a un'altra funzione. Non è automaticamente asincrona: per esempio la callback di `forEach` è sincrona, mentre quella di `setTimeout` è asincrona.

## 20. Cosa significa “one function, one action”?
Significa che una funzione dovrebbe fare una sola cosa e avere un nome descrittivo. Se una funzione fa troppe cose, conviene dividerla in funzioni più piccole.

## 21. Cos'è un oggetto in JavaScript?
Un oggetto è una struttura composta da coppie **chiave-valore**. Le chiavi sono proprietà, i valori possono essere numeri, stringhe, array, funzioni o altri oggetti.

```js
let studente = {
  nome: "Mario",
  eta: 20
};
```

## 22. Cos'è un metodo?
Un metodo è una funzione salvata come proprietà di un oggetto. Rappresenta un'azione che l'oggetto può compiere.

```js
let user = {
  name: "Pippo",
  saluta: function() {
    console.log("Ciao");
  }
};
```

## 23. Cos'è `this`?
`this` è il riferimento all'oggetto che sta eseguendo la funzione. Il suo valore dipende da **come viene chiamata** la funzione, non solo da dove viene scritta.

```js
function saluta() {
  console.log(this.name);
}

let a = { name: "Pippo", saluta };
let b = { name: "Pluto", saluta };

a.saluta(); // Pippo
b.saluta(); // Pluto
```

## 24. Differenza tra `this` in funzione normale e arrow function?
In una funzione normale, `this` dipende dall'oggetto che chiama la funzione. In una arrow function, `this` non viene ricalcolato: viene preso dallo scope esterno.

## 25. Cos'è il binding di `this`?
È il modo in cui JavaScript decide quale oggetto associare a `this` durante una chiamata di funzione. Può avvenire implicitamente, quando chiamo `oggetto.metodo()`, oppure esplicitamente con `call` e `apply`.

## 26. Differenza tra `call` e `apply`?
Entrambi permettono di chiamare una funzione impostando manualmente il valore di `this`. La differenza è negli argomenti: `call` li passa uno per uno, `apply` li passa dentro un array.

```js
fn.call(obj, a, b);
fn.apply(obj, [a, b]);
```

## 27. Cos'è un costruttore?
Un costruttore è una funzione usata per creare oggetti simili. Per convenzione ha l'iniziale maiuscola e si usa con `new`.

```js
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let u = new User("Pippo");
```

## 28. Cosa fa `new`?
Quando chiamo una funzione con `new`: crea un oggetto vuoto, lo assegna a `this`, esegue la funzione e ritorna `this`.

## 29. Cos'è l'aliasing negli oggetti?
Quando assegno un oggetto a un'altra variabile, non copio l'oggetto: copio il riferimento. Quindi due variabili possono puntare allo stesso oggetto in memoria.

```js
let a = { voto: 30 };
let b = a;
b.voto = 18;
console.log(a.voto); // 18
```

## 30. Perché `{ } == { }` è false?
Perché sono due oggetti diversi in memoria. Gli oggetti vengono confrontati per riferimento, non per contenuto.

## 31. Cos'è il garbage collector?
È il meccanismo che libera automaticamente la memoria dagli oggetti non più raggiungibili dal programma. Non elimina però tutti i problemi: se mantengo riferimenti inutili, posso creare memory leak.

## 32. Cos'è un memory leak?
È una perdita di memoria: succede quando oggetti non più utili restano comunque referenziati e quindi il garbage collector non può liberarli.

## 33. Cosa sono i tipi primitivi?
Sono valori semplici, non oggetti veri e propri: `string`, `number`, `bigint`, `boolean`, `symbol`, `null`, `undefined`. Anche se sono primitivi, alcuni possono usare metodi grazie agli object wrapper temporanei.

## 34. Perché una stringa può avere metodi?
Perché JavaScript crea temporaneamente un object wrapper intorno al valore primitivo, esegue il metodo e poi distrugge il wrapper.

```js
"ciao".toUpperCase();
```

## 35. Cos'è un array?
Un array è una struttura ordinata che contiene valori indicizzati a partire da 0.

```js
let arr = [10, "ciao", true];
```

## 36. Metodi principali degli array?
`push`, `pop`, `unshift`, `shift`, `indexOf`, `join`, `forEach`, `map`, `reduce`.

## 37. Differenza tra `slice` e `splice`?
`slice` restituisce una copia di una porzione dell'array e non modifica l'originale. `splice` modifica l'array originale, rimuovendo, aggiungendo o sostituendo elementi.

## 38. Differenza tra `for...in` e `for...of`?
`for...in` itera sulle chiavi/proprietà. `for...of` itera sui valori degli elementi iterabili, per esempio gli array.

## 39. Cos'è `map`?
`map` crea un nuovo array applicando una funzione a ogni elemento dell'array originale.

```js
[1, 2, 3].map(x => x * 2); // [2, 4, 6]
```

## 40. Cos'è `reduce`?
`reduce` riduce un array a un solo valore usando un accumulatore.

```js
[1, 2, 3].reduce((acc, x) => acc + x, 0); // 6
```

## 41. Metodi principali delle stringhe?
`indexOf`, `slice`, `trim`, `charAt`, `toUpperCase`, `toLowerCase`, `replace`.

## 42. Come sostituisco tutte le occorrenze in una stringa?
Con una regular expression globale:

```js
"ciao ciao".replace(/ciao/g, "bye");
```

## 43. Cosa sono le template string?
Sono stringhe delimitate da backtick che permettono interpolazione con `${}`.

```js
let n = 3;
console.log(`Lezione numero ${n}`);
```

## 44. Cosa sono gli oggetti built-in?
Sono oggetti già disponibili in JavaScript, come `Date`, `Math`, `JSON`, `Window`, `Array`, `String`.

## 45. A cosa serve `Math`?
Serve per operazioni matematiche: `Math.random()`, `Math.round()`, `Math.max()`, `Math.min()`, `Math.pow()`.

## 46. A cosa serve `JSON.stringify`?
Trasforma un oggetto JavaScript in una stringa JSON, utile per inviare dati al server.

## 47. A cosa serve `JSON.parse`?
Trasforma una stringa JSON in un oggetto JavaScript.

## 48. Cos'è `window`?
Nel browser, `window` è l'oggetto globale che rappresenta la finestra. Contiene funzioni come `alert`, `prompt`, `setTimeout`, `setInterval`, `location`.

## 49. Differenza tra `setTimeout` e `setInterval`?
`setTimeout` esegue una funzione una sola volta dopo un certo tempo. `setInterval` la esegue ripetutamente ogni tot millisecondi finché non viene fermata con `clearInterval`.

## 50. Cos'è `location`?
È un oggetto del browser che rappresenta l'indirizzo corrente della pagina. Può essere usato anche per ricaricare la pagina, per esempio `location.reload()`.

## 51. Cosa sono le eccezioni?
Sono errori o situazioni anomale gestibili con `throw`, `try`, `catch` e `finally`.

```js
try {
  throw new Error("Errore");
} catch (e) {
  console.error(e.message);
} finally {
  console.log("Fine");
}
```

## 52. Cosa fa `throw`?
`throw` lancia un errore. L'errore può essere intercettato da un blocco `catch` più in alto nel call stack.

## 53. Cos'è una funzione che ritorna una funzione?
È una funzione il cui valore di ritorno è un'altra funzione. È possibile perché in JavaScript le funzioni sono oggetti.

```js
function moltiplicaPer(x) {
  return function(n) {
    return n * x;
  };
}
```

## 54. Cos'è una closure?
Una closure si crea quando una funzione interna usa variabili dello scope esterno. Anche dopo che la funzione esterna è finita, la funzione interna mantiene accesso a quelle variabili.

```js
function counter() {
  let n = 0;
  return function() {
    return ++n;
  };
}
```

## 55. A cosa servono le closure?
Servono per conservare stato e creare dati privati. Per esempio un contatore può esporre solo metodi come `inc`, `dec`, `get`, senza rendere accessibile direttamente la variabile interna.

## 56. Cos'è una IIFE?
Una IIFE è una funzione anonima invocata immediatamente. Serve per creare uno scope locale ed evitare di sporcare il global scope.

```js
(function() {
  let a = 0;
})();
```

## 57. Domanda trabocchetto: cosa stampa?
```js
(function() {
  let a = b = 5;
})();

console.log(b);
```
Se non siamo in strict mode, stampa `5`. Questo perché `let a = b = 5` equivale a fare prima `b = 5`, che crea una variabile globale implicita, e poi `let a = b`. In strict mode darebbe errore.

## 58. Cos'è il prototipo?
In JavaScript ogni oggetto può avere un prototipo, cioè un altro oggetto da cui eredita proprietà e metodi. Se una proprietà non viene trovata nell'oggetto, JavaScript la cerca nel prototipo, poi nel prototipo del prototipo, formando la prototype chain.

## 59. Cos'è la prototype chain?
È la catena di prototipi che JavaScript percorre quando cerca una proprietà. Prima cerca nell'oggetto, poi nel suo prototipo, poi ancora più su, finché trova la proprietà o arriva a `null`.

## 60. Differenza tra proprietà propria e proprietà ereditata?
Una proprietà propria appartiene direttamente all'oggetto. Una proprietà ereditata non è scritta nell'oggetto, ma viene trovata nel suo prototipo.

## 61. A cosa serve `hasOwnProperty`?
Serve per verificare se una proprietà appartiene direttamente all'oggetto e non al suo prototipo.

```js
obj.hasOwnProperty("nome");
```

## 62. Differenza tra `prototype` e `__proto__`?
`Costruttore.prototype` è l'oggetto che diventerà il prototipo degli oggetti creati con quel costruttore. `oggetto.__proto__` è il prototipo effettivo di un oggetto già creato.

## 63. Come aggiungo un metodo a tutti gli oggetti creati da un costruttore?
Lo aggiungo al `prototype` del costruttore.

```js
function Student(name) {
  this.name = name;
}

Student.prototype.sayName = function() {
  return this.name;
};
```

## 64. Cosa succede se modifico il prototype dopo aver creato oggetti?
Se modifico il prototype esistente aggiungendo proprietà, anche gli oggetti già creati le vedono. Se invece riassegno completamente `Costruttore.prototype`, gli oggetti già creati continuano a puntare al vecchio prototipo.

## 65. Cos'è il DOM?
Il DOM, Document Object Model, è la rappresentazione ad albero della pagina HTML. Ogni elemento della pagina è un nodo e la radice principale è `document`. JavaScript usa il DOM per leggere e modificare dinamicamente la pagina.

## 66. Come seleziono elementi dal DOM?
Metodi principali:

```js
document.getElementById("id");
document.getElementsByClassName("classe");
document.getElementsByTagName("p");
document.querySelector(".classe");
document.querySelectorAll("p .warning");
```

## 67. Differenza tra `querySelector` e `querySelectorAll`?
`querySelector` restituisce il primo elemento che corrisponde al selettore CSS. `querySelectorAll` restituisce una lista di tutti gli elementi corrispondenti.

## 68. Cosa sono `NodeList` e `HTMLCollection`?
Sono collezioni di nodi/elementi restituite da metodi DOM che selezionano più elementi. Sono simili ad array, ma non sono sempre array veri e propri.

## 69. Come modifico il contenuto di un elemento?
Posso usare `textContent` per testo semplice o `innerHTML` se voglio inserire codice HTML.

```js
el.textContent = "Ciao";
el.innerHTML = "<strong>Ciao</strong>";
```

## 70. Differenza tra `textContent` e `innerHTML`?
`textContent` inserisce testo e non interpreta tag HTML. `innerHTML` interpreta la stringa come HTML. Per sicurezza e chiarezza, se devo solo scrivere testo è meglio `textContent`.

## 71. Come modifico lo stile CSS con JavaScript?
Uso la proprietà `style`. Le proprietà CSS con trattino diventano camelCase.

```js
el.style.marginTop = "20px";
el.style.backgroundColor = "red";
```

## 72. Come creo un nodo DOM?
Uso `createElement` per creare un elemento, `createTextNode` per creare testo e `appendChild` per inserirlo.

```js
const div = document.createElement("div");
const text = document.createTextNode("Ciao");
div.appendChild(text);
document.body.appendChild(div);
```

## 73. Metodi principali per modificare nodi?
`appendChild`, `insertBefore`, `replaceChild`, `removeChild`.

## 74. Cos'è un evento?
Un evento è qualcosa che accade nella pagina, come un click, un input, un submit, il caricamento della pagina o il movimento del mouse. A un evento posso associare una funzione handler.

## 75. Come associo un evento a un elemento?
Si può fare inline in HTML, assegnando una proprietà come `onclick`, oppure meglio con `addEventListener`.

```js
btn.addEventListener("click", function(event) {
  console.log(event.target);
});
```

Con `addEventListener` si scrive `"click"`, non `"onclick"`.

## 76. Cos'è l'oggetto evento?
È un oggetto passato automaticamente all'handler che contiene informazioni sull'evento: elemento che lo ha generato, coordinate del mouse, tipo di evento, ecc.

## 77. Eventi importanti da ricordare?
`click`, `focus`, `blur`, `change`, `load`, `mousedown`, `mouseup`, `mousemove`, `mouseover`, `mouseout`, `submit`.

## 78. A cosa serve `defer`?
`defer` fa scaricare lo script senza bloccare il parsing HTML e lo esegue dopo che il DOM è stato costruito. È utile quando lo script deve manipolare elementi già presenti nella pagina.

## 79. Differenza tra `defer` e `async`?
`defer` esegue lo script dopo la costruzione del DOM e mantiene l'ordine degli script. `async` esegue lo script appena ha finito di scaricarlo, senza aspettare necessariamente il DOM e senza garantire lo stesso ordine.

## 80. Cos'è il codice sincrono?
È codice eseguito riga per riga: ogni istruzione aspetta la fine della precedente. Se un'operazione è lunga, blocca l'esecuzione.

## 81. Cos'è il codice asincrono?
È codice in cui alcune operazioni vengono avviate e completate più tardi, mentre il resto del programma continua. Esempi: timer, eventi, caricamento immagini, richieste `fetch`.

## 82. Una callback è sempre asincrona?
No. Una callback è solo una funzione passata come argomento. Può essere usata in modo sincrono, come in `forEach`, o asincrono, come in `setTimeout`.

## 83. Cos'è l'Event Loop?
L'Event Loop è il meccanismo che coordina Call Stack, Web APIs e code di callback. Quando la Call Stack è vuota, prende callback pronte dalle code e le porta nella Call Stack per eseguirle.

## 84. Cos'è la Call Stack?
È la pila delle funzioni in esecuzione. Quando una funzione viene chiamata entra nello stack; quando termina viene rimossa.

## 85. Cosa succede con `setTimeout(..., 0)`?
La callback non viene eseguita subito. Viene messa in coda e sarà eseguita solo dopo che il codice sincrono corrente ha finito e la Call Stack è vuota.

## 86. Cos'è una Promise?
Una Promise è un oggetto usato come contenitore/placeholder per il risultato futuro di un'operazione asincrona. Può terminare con successo oppure con errore.

## 87. Stati di una Promise?
Una Promise può essere `pending`, `fulfilled` o `rejected`.

## 88. Come si crea una Promise?
```js
const promise = new Promise(function(resolve, reject) {
  if (ok) resolve("successo");
  else reject(new Error("errore"));
});
```

La funzione passata al costruttore viene eseguita subito.

## 89. A cosa servono `resolve` e `reject`?
`resolve` completa la Promise con successo. `reject` completa la Promise con errore. Una Promise può terminare una sola volta: dopo `resolve` o `reject`, il suo stato non cambia più.

## 90. Come consumo una Promise?
Con `.then()`, `.catch()` e `.finally()`.

```js
promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("fine"));
```

## 91. A cosa serve `.then()`?
Serve a registrare il codice da eseguire quando la Promise viene risolta con successo. `.then()` restituisce a sua volta una nuova Promise, quindi posso concatenare più `.then()`.

## 92. A cosa serve `.catch()`?
Serve a gestire gli errori della Promise o della catena di Promise.

## 93. A cosa serve `.finally()`?
Serve a eseguire codice in ogni caso, sia se la Promise va a buon fine sia se fallisce.

## 94. Cos'è una Promise chain?
È una concatenazione di `.then()` in cui ogni passaggio lavora sul risultato del precedente. Serve a evitare callback annidate e rendere il codice asincrono più leggibile.

## 95. Cos'è il callback hell?
È una situazione in cui molte callback sono annidate una dentro l'altra, rendendo il codice difficile da leggere e mantenere. Le Promise e `async/await` aiutano a evitarlo.

## 96. Cos'è la Microtask Queue?
È la coda dove finiscono i callback delle Promise, cioè `.then`, `.catch`, `.finally`. Ha priorità rispetto alla normale Callback Queue dei timer/eventi.

## 97. Che priorità hanno Promise e timer?
Prima viene eseguito il codice sincrono. Poi JavaScript svuota la Microtask Queue, quindi esegue i `.then` delle Promise. Solo dopo passa alla Callback Queue, dove ci sono callback come quelle di `setTimeout`.

## 98. Ordine di esecuzione tipico?
```js
console.log("Start");
setTimeout(() => console.log("Timer"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");
```

Output:

```text
Start
End
Promise
Timer
```

## 99. Cos'è `fetch`?
`fetch` è una API moderna del browser per fare richieste HTTP asincrone. È basata sulle Promise e sostituisce il vecchio `XMLHttpRequest`.

## 100. Cosa ritorna `fetch()`?
`fetch()` ritorna una Promise che, se risolta, produce un oggetto `Response`. Per leggere il body come JSON uso `res.json()`, che restituisce un'altra Promise.

## 101. Esempio di GET con fetch?
```js
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

## 102. Perché `res.json()` restituisce una Promise?
Perché leggere e convertire il body della risposta può richiedere tempo. Quindi anche questa operazione è asincrona.

## 103. Esempio di POST con fetch?
```js
const nuovoPost = {
  title: "Titolo",
  body: "Testo",
  userId: 1
};

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(nuovoPost)
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## 104. Perché uso `JSON.stringify` nel body di una POST?
Perché nel body HTTP non invio direttamente un oggetto JavaScript, ma una rappresentazione testuale dei dati. Se sto inviando JSON, imposto anche l'header `Content-Type: application/json`.

## 105. Cos'è AJAX?
AJAX significa Asynchronous JavaScript and XML. È un pattern che permette a una pagina web di comunicare con il server in modo asincrono, senza ricaricare tutta la pagina. Oggi spesso usa JSON e `fetch`.

## 106. Cos'è CORS?
CORS è un meccanismo di sicurezza legato alle richieste cross-origin. Il browser permette a JavaScript di leggere risposte da un altro dominio solo se il server lo autorizza tramite opportuni header HTTP.

## 107. Cos'è la Same-Origin Policy?
È una regola di sicurezza per cui uno script può accedere liberamente solo a risorse con la stessa origine, cioè stesso protocollo, dominio e porta.

## 108. Cosa sono le richieste semplici CORS?
Sono richieste cross-origin considerate semplici, per esempio con metodi `GET`, `HEAD`, `POST` e con alcuni header/content-type ammessi. In questi casi non serve una richiesta preliminare.

## 109. Cos'è una preflight request?
È una richiesta preliminare `OPTIONS` che il browser invia prima della vera richiesta cross-origin complessa. Serve a verificare se il server autorizza metodo, origine e header richiesti.

## 110. Cos'è `async/await`?
`async/await` è syntactic sugar sopra le Promise. Permette di scrivere codice asincrono con una forma più simile al codice sequenziale, ma sotto rimangono Promise.

## 111. Cosa fa `async`?
Una funzione dichiarata `async` restituisce sempre una Promise. Se ritorna un valore normale, JavaScript lo incapsula in una Promise risolta.

```js
async function f() {
  return 1;
}

f().then(x => console.log(x));
```

## 112. Cosa fa `await`?
`await` si usa dentro funzioni `async` e aspetta la risoluzione di una Promise. Quando la Promise si risolve, restituisce il valore risolto. Non blocca tutto il browser: sospende solo quella funzione async.

## 113. Esempio fetch con async/await?
```js
async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  console.log(data);
}

fetchUsers();
```

## 114. Come gestisco errori con async/await?
Con `try/catch`, perché una Promise rejected viene trattata come un errore lanciato nel punto dell'`await`.

```js
async function loadData() {
  try {
    const res = await fetch("/api/data");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("operazione terminata");
  }
}
```

## 115. Differenza tra `.then/.catch` e `async/await`?
Sono due modi per lavorare con le Promise. `.then/.catch` usa concatenazione di callback. `async/await` rende il codice più leggibile e simile al sincrono, ma non elimina l'asincronia.

## 116. Cos'è un polyfill?
Un polyfill è codice/libreria che aggiunge funzionalità moderne in ambienti o browser che non le supportano nativamente.

## 117. Cos'è un transpiler?
Un transpiler traduce codice scritto in una versione o linguaggio in un'altra versione di JavaScript compatibile. Per esempio può trasformare codice moderno in codice comprensibile da browser più vecchi.

## 118. Cosa sono i DevTools di Chrome?
Sono strumenti del browser per ispezionare HTML/CSS, usare la console, vedere rete, sorgenti e debug del codice JavaScript.

## 119. Come funziona il debugging in Chrome? (DA ESAME)
Si usa Chrome DevTools, tab **Sources**. Si mette un breakpoint su una riga per fermare l'esecuzione. Poi si possono controllare variabili, call stack e flusso del programma.

## 120. Differenza tra Step over, Step into e Step out? (DA ESAME)
- **Step over**: esegue la riga corrente senza entrare nelle funzioni chiamate.
- **Step into**: entra dentro la funzione chiamata e permette di analizzarla riga per riga.
- **Step out**: esce dalla funzione corrente e torna al chiamante.

## 121. Come spiegherei JavaScript asincrono in 30 secondi?
JavaScript esegue il codice sincrono nella Call Stack. Le operazioni asincrone, come timer, eventi e fetch, vengono gestite dall'ambiente del browser. Quando sono pronte, le callback vengono messe in coda. L'Event Loop le porta nella Call Stack quando questa è vuota. Le Promise usano la Microtask Queue, che ha priorità sulla normale Callback Queue.

## 122. Come spiegherei Promise, async e await in 30 secondi?
Una Promise rappresenta un risultato futuro. Può essere pending, fulfilled o rejected. La gestisco con `then`, `catch` e `finally`. `async/await` è un modo più leggibile per usare le Promise: `async` fa restituire una Promise alla funzione, `await` aspetta il risultato di una Promise dentro quella funzione, e gli errori si gestiscono con `try/catch`.

## 123. Come spiegherei DOM ed eventi in 30 secondi?
Il DOM è la rappresentazione ad albero della pagina HTML. JavaScript può selezionare nodi con metodi come `getElementById` o `querySelector`, modificarne contenuto e stile, creare o rimuovere nodi. Gli eventi sono azioni che avvengono nella pagina, come click o submit, e posso gestirli con handler registrati tramite `addEventListener`.

## 124. Come spiegherei prototipi e costruttori in 30 secondi?
In JavaScript gli oggetti possono ereditare proprietà da un prototipo. Quando cerco una proprietà, JavaScript la cerca prima nell'oggetto e poi lungo la prototype chain. Un costruttore è una funzione usata con `new` per creare oggetti simili. I metodi comuni si mettono nel `prototype` del costruttore, così sono condivisi da tutte le istanze.

## 125. Come spiegherei `this` in 30 secondi?
`this` indica l'oggetto che sta eseguendo una funzione. Nelle funzioni normali dipende da come la funzione viene chiamata: `obj.metodo()` fa sì che `this` sia `obj`. Con `call` e `apply` posso impostarlo manualmente. Le arrow function invece non hanno un proprio `this`, ma usano quello dello scope esterno.
