- Linguaggio che descrive la **parte dinamica del web**
    - HTML → struttura
    - CSS → presentazione
    - JS → comportamento
- **Lato server**
    - esistono molti linguaggi:
        - `PHP`
        - `Python`
        - `Java`
        - ecc.
- **Lato client**
    - Javascript è **l’unico linguaggio standard eseguito nel browser**
    - gira direttamente nel browser dell’utente
- Javascript è uno **standard**
    - definito da **ECMA**
- nome ufficiale:
    - **ECMAScript**
- Javascript = **implementazione di ECMAScript**
- Javascript:
    - **non è compilato**
    - viene eseguito in una **macchina virtuale (JS engine)**
        - es: V8 (Chrome)
*COSA PERMETTE DI FARE*
- Javascript permette di gestire il **comportamento dinamico** delle pagine web
1. **DOM MANIPULATION**
- Consente di:
    - modificare elementi HTML
    - cambiare stili CSS
    - reagire a eventi dell’utente (click, scroll, input)
- Ricordiamo che il DOM (Document Object Model) è
    - rappresentazione ad albero della pagina HTML
    - ogni elemento è un **nodo**
    - Javascript può:
        - leggere
        - modificare
        - aggiungere o rimuovere elementi
2. **COMUNICAZIONE ASINCRONA (AJAX)**
	- **AJAX = Asynchronous JavaScript and XML**
	- Permette di:
	    - inviare/ricevere dati dal server
	    - senza ricaricare la pagina
	- caratteristiche:
	    - comunicazione *asincrona*
	        - la pagina continua a funzionare mentre arriva la risposta
	    - dati scambiati:
	        - `XML` (storico)
	        - `JSON` (più usato oggi)
	- vantaggio:
	    - evita il **full page refresh**
	    - migliora UX (es. chat, typeahead)
3. POLYFILL
	- **Polyfill**
	    - librerie Javascript che:
	        - aggiungono funzionalità mancanti
	        - rendono compatibile codice moderno con browser vecchi
	- esempio:
	    - usare feature HTML5/ES6 anche su browser non aggiornati
**COSA NON PUÒ FARE JAVASCRIPT (NEL BROWSER)**
- ❌ **Accesso diretto ai file locali**
    - per motivi di sicurezza
- ❌ **Accesso libero a qualsiasi server remoto**
    - limitato da politiche di sicurezza (es. Same-Origin Policy)
###### Caratteristiche di Javascript
- **Linguaggio dinamico**
    - non è compilato
    - viene eseguito in una **macchina virtuale (engine JS)**
    - il codice è interpretato a runtime
- **Loosely typed (tipizzazione dinamica)**
    - non serve specificare il tipo delle variabili
    - il tipo è deciso automaticamente a runtime
    - una variabile può cambiare tipo
- **Case sensitive**
    - distingue tra maiuscole e minuscole
        - `myVar` ≠ `myvar`
- **Garbage Collector**
    - gestione automatica della memoria
    - rimuove gli oggetti non più referenziati
    - evita (in parte) problemi di memoria
	- risolve il concetto di memory leak

##### BASI DI JAVASCRIPT
Javascript può essere inserito in una pagina:

- **inline**
    - direttamente dentro HTML
- **tag `<script>`**
    - dentro `<head>` o `<body>`
- **file esterno**
	- `<script src="script.js"></script>`
*CONSOLE (DEVELOPER TOOLS)*
- usata per:
    - testare codice
    - fare debug
- comandi base:
- Comandi alla console javascript di developer options
	- `console.log("ciao");`
		- stampa direttamente sulla console
	- `alert("ciao");`
		- apre una finestra modale nel browser
		- si dividono in: alert`(ok)`, prompt`(scrivi)`, confirm`(cancella,ok)`
- variabili in javascript
	- `let myName="lorenzo";`
		- inizializzazione opzionale
	- `const prefix`
		- per le costanti
	- `typeof(test)` per vedere il tipo di variabile
##### Gestione di variabili
- Una variabile ha dei metodi
	- Stringa `v.toUpperCase()`
	- number `v.toFixed()` per ridurre il numero di cifre decimali
- `parseInt()` funzione che effettua il parsing di una stringa e ritorna la forma numerica di quest'ultima
- casting con `let num= Number("43")`
- tante volte le conversioni avvengono in automatico `"45"-3` crea una stringa giusta con `42` numerico
- determinate codifiche non sono effettuabili `0/0` -> `NaN `
- `"use strict"` per usare la strict mode, che aggiunge un interprete per lo strict mode
	- il vecchio interprete lo leggerà come una normale stringa quello nuovo lo legge e si attiva
- `"2"==2` true UGUALE
- `"2"===2` false IDENTICO
- truthy e falsy, i numeri sono truthy o falsy
	- `0` è falsy oppure se diverso da `0` è truthy
- `a??b` ritorna a se esiste a oppure b se a non esiste
###### Switch
- Switch case
```JS
switch (espressione) {
	case valore1:
		// istruzioni
		break;

	case valore2:
		// istruzioni
		break;

	default:
		// caso di default
}
```
##### Funzioni
- copiate da **Scheme**
- modo pratico per raggruppare comandi e richiamarli più volte
```JS
function calcolatrice(parametri){
let n1,n1,somma;
ecc...
return n1
}
```

##### Scope di una variabile
- indica i punti di visibilità di una variabile
- Locale o Globale
- Locale tipo dentro la funzione
variabili non dichiarate sono `UNDEFINED`
- anche parametri non dichiarati o non necessari
- una variabile se dichiarata con let ha uno scope di enclosing block
	- è visibile solo dentro il blocco di codice in cui viene dichiarata.
	- Per “blocco” si intendono le graffe `{ }`
- se dichiarata con var ha uno score di tipo functional block
	- cioè rimane visibile dentro tutta la funzione in cui viene dichiarata.
![[Pasted image 20260505150139.png|400]]
#### DEBUGGING CON CHROME (ESAME)
- Strumento:
    - **Chrome DevTools → tab "Sources"**
*BREAKPOINT*
- si inserisce su una riga di codice
- serve per:
    - **bloccare l’esecuzione** in quel punto
- permette di:
    - analizzare variabili
    - vedere il flusso del programma
**CONTROLLO DELL’ESECUZIONE**
Dopo il breakpoint possiamo eseguire il codice passo passo:
- **Step over**
    - esegue la riga corrente
    - **senza entrare nelle funzioni**
- **Step into**
    - entra dentro la funzione chiamata
    - permette di analizzarla riga per riga
- **Step out**
    - esce dalla funzione corrente
    - torna al chiamante
PROVA A USARLO
##### One function, one action
- una funzione deve avere **nome descrittivo**
    - es: `getName`, `runCalculator`, `checkIsOnline`
- una funzione deve fare **una sola cosa**
    - deve fare _esattamente ciò che dice il nome_
    - se fa più cose → va **divisa in più funzioni**
###### Functional expression
- le funzioni sono **oggetti che possiamo chiamare**
- una _function expression_ viene creata **quando il codice viene eseguito**
    - quindi è utilizzabile **solo da quel punto in poi**
###### Funzioni anonime
- dichiaro una funzione **senza nome**
- spesso direttamente **come parametro di un’altra funzione**
- usate molto come **callback**
###### Arrow functions
- sintassi più compatta per scrivere funzioni
- esempio:
	`somma(a,b) => a+b`
	utile per funzioni brevi
##### Oggetti
insieme di coppie `(chiave, valore)`
- chiave = **proprietà**
- valore = dato associato (numero, stringa, array, funzione, oggetto…)
Dichiarazione di un oggetto esempio:
```
let studente = {  name: "Pierpaolo",  age: 80};
```
- oggetto vuoto:
```
let studente = {};// oppurelet studente = new Object();
```
###### PROPRIETÀ
- aggiungere proprietà:
```
studente.voto = 30;
```
- accesso:
```
studente.votostudente["voto"]
```
- eliminare proprietà:
```
delete studente.voto;
```
- se accedi a una proprietà che non esiste → `undefined`
###### METODI
- un oggetto può avere **funzioni come proprietà**
```
let studente = {  nome: "pippo",  saluta: () => alert("ciao sono pippo")};
```
- si chiamano:
```
studente.saluta();
```
hanno metodi
- aggiungi una proprietà `saluta:() => alert("ciao sono pippo");`
###### Concetto di aliasing
```
let luca = { voto: 30 }let aneta = luca
```
- **non viene copiato l’oggetto**, ma il **riferimento**
- quindi `luca` e `aneta` puntano allo **stesso oggetto in memoria**
- se modifico uno → cambia anche l’altro
    ```
    luca.voto = 18// anche aneta.voto diventa 18
    ```
- confronto:
    ```
    let a = {}let b = {}a == b // false (oggetti diversi)let c = ac == a // true (stesso riferimento)
    ```
###### Garbage collector e memory leak
- JavaScript alloca memoria **dinamicamente**
- il **garbage collector** libera la memoria degli oggetti **non più raggiungibili**
- ⚠️ però:
    - non sempre basta → possono esserci **memory leak**
    - esempio: oggetti che si referenziano tra loro
        ```
        a.dog = bb.owner = a
        ```
    - anche se metti `a = null` e `b = null`, il riferimento interno può mantenerli “vivi”
###### this
- `this` contiene il **riferimento all’oggetto che sta eseguendo la funzione**
- esempio:
    ```
    let a = {  name: "pippo",  saluta: function () {    alert("ciao sono " + this.name)  }}
    ```
- **importante**:
    - `this` viene valutato a **call time** (quando la funzione viene chiamata)
    - non quando viene definita
	- this se non contiene null usa le assegnazioni di window
###### Binding di this
```
function sayMyName() {  alert("ciao sono " + this.name)}let a = { name: "pippo", saluta: sayMyName }let b = { name: "pluto", saluta: sayMyName }a.saluta() // pippob.saluta() // pluto
```
- dipende da **chi chiama la funzione**, non da dove è scritta
###### Arrow functions e this
- nelle arrow function `this` **NON cambia**
- prende il valore dal **contesto esterno (outer scope)**
```
let a = {  name: "pippo",  saluta: function () {    let x = () => alert(this.name)    x()  }}
```
###### Costruttori
- funzione usata per creare oggetti
- convenzione: **nome con iniziale maiuscola**
```
function User(name) {  this.name = name  this.isAdmin = false}
```
- uso:
```
let user = new User("Pippo")
```
- cosa fa `new`:
    1. crea un **oggetto vuoto**
    2. lo assegna a `this`
    3. esegue la funzione
    4. ritorna `this`
###### Tipi primitivi e metodi
- tipi primitivi in JS:
    - `string`, `number`, `bigint`, `boolean`, `symbol`, `null`, `undefined`
- contengono un **solo valore**
- però hanno comunque dei **metodi**
    ```
    let v = "ciao"v.toUpperCase()
    ```
- perché?
    - JS crea temporaneamente un **object wrapper**
    - poi lo distrugge dopo l’uso
##### Buona pratica (JSDoc)

- commenti strutturati per spiegare funzione e parametri
- esempio (slide con codice)

```
/** * @param {number} shortSideLen * @returns {number} */function getGoldenRectangle(shortSideLen) {  const phi = 1.61803398875;  return shortSideLen * phi;}
```
#### Array
- contenitori di valori (anche di tipo diverso)
- ogni elemento ha un **indice (parte da 0)**

```
let arr = [5, "ciao", false, undefined];
```

##### Creazione e modifica

```Javascript
let arr = [1,2,3];  

// modifica  
arr[0] = "nuovo"  
  
// aggiunta  
arr.push("fine") // fine  
arr.unshift("inizio") // inizio  
  
// rimozione  
arr.pop() // ultimo  
arr.shift() // primo  
  
// lunghezza  
arr.length
```

Attenzione agli indici
```Javascript
let a = ["a","b","c"];
delete a[0]; // NON compatta array
```
- `delete` lascia `undefined`
- `length` non diminuisce
###### Slice vs Splice

```Javascript
arr.slice(1,4) // NON modifica array  
  
arr.splice(3,2) // modifica array
array.splice(start, deleteCount, ...nuoviElementi) // scrittura reale
```

- `slice` → copia porzione
- `splice` → modifica array originale

###### Iterazione
**for...in**
- itera sulle **proprietà (chiavi)** dell’oggetto
**for...of**
- itera sui **valori** (elementi)
```Javascript
for (let i in arr) { }  
for (let v of arr) { }
```
###### Metodi utili array

**forEach**
```Javascript
arr.forEach(item => console.log(item));
```
**indexOf**
```Javascript
arr.indexOf("b");
```
**join**
```Javascript
arr.join(" - ");
```
###### map
- trasforma un array in un altro
```Javascript
arr.map(item => item.length);
```
- ritorna nuovo array
###### reduce
- riduce array a un singolo valore
```Javascript
[1,2,3].reduce((acc, item) => acc + item);
```
- `acc` = accumulatore

#### STRINGHE

###### Stringhe base

```
let s = "Ciao a tutti";
```
###### Metodi principali
```Javascript
s.indexOf("a")
s.slice(1)
s.trim()
s.charAt(1)
s.toUpperCase()
s.toLowerCase()
```
###### Replace
```Javascript
"ciao ciao".replace("ciao", "bye")      // solo prima
"ciao ciao".replace(/ciao/g, "bye")     // tutte
```
`“trova **tutte le occorrenze** di `ciao` nella stringa”`
###### Template string
```Javascript
let n = 3;
`Lezione numero ${n}`
```
- più leggibile rispetto a concatenazione
##### Array e stringhe sono oggetti
- ma si scrivono in forma semplificata
```Javascript
let a = []
let a = new Array() // equivalente

let s = "ciao"
let s = new String("ciao")
```
- meglio usare forma **semplice**

Iterazione avanzata (nota utile)
- console interattiva:
    - TAB → mostra metodi disponibili
##### Oggetti built-in
Gli **oggetti built-in** sono oggetti già disponibili in JavaScript, quindi non devono essere creati da zero dal programmatore. Forniscono metodi e proprietà utili per svolgere operazioni comuni, come lavorare con date, numeri, stringhe, JSON, finestre del browser e così via.
- *Date*
	- oggetto che ti permette di creare una data
	- è un oggetto built-in che permette di creare e gestire una data.
- *typeof*
	- ritorna il tipo di dato
- *Math*
	- oggetto con metodi che permettono operazioni matematiche
	- pow, exp, min, max, round, sin, cos, tan
	- `Math.random()`
- *JSON*
	- è un oggetto utilizzato moltissimo nello scambio dati tra client e server.
		- È utile perché permette di trasformare oggetti JavaScript in stringhe e viceversa.
	- con un oggetto tipo
	```Javascript
	let studente = {  nome: "Mario",  eta: 20};
	```
	- `JSON.stringify(studente)`
		-  trasforma una stringa JSON di un oggetto
	- `JSON.parse(stringa)`
		- trasforma una stringa JSON in un oggetto
- *Window*
	- rappresenta la finestra del browser.
	- È un oggetto molto importante perché contiene molte funzioni e proprietà legate all’ambiente del browser.
		- Spesso possiamo anche non scrivere esplicitamente `window`, perché molte sue funzioni sono disponibili direttamente.
	- window open, close
		- apre una schermata web o la chiude
	- window alert, prompt 
	- `ScrollTo()`
	- set interval
		- `setInterval(()=> console.log("ciao"),1000)`
			- serve per eseguire una funzione ripetutamente ogni tot millisecondi
		- ogni intervallo restituisce un suo handler con un suo id
		- per terminarlo `clearInterval(handler)`
	- `setTimeout` per programmare una funzione da eseguire dopo tot millisecondi
>[!info]- Esempio completo: stampare `"ciao"` ogni 5 secondi per un massimo di 4 volte.
> 
> ```Javascript
> let i = 0;
> const s = setInterval(function() {
>   console.log("ciao");
>     i++;
>       if (i == 4) {
>           clearInterval(s);  
>           }
>     }, 5000);
> ```
> Spiegazione:
> - `i` parte da `0`;
> - ogni 5 secondi viene eseguita la funzione;
> - la funzione stampa `"ciao"`;
> - poi incrementa `i`;
> - quando `i` arriva a `4`, viene chiamato `clearInterval(s)`;
> - quindi l’intervallo viene fermato.

- *location*
	- `location` è un oggetto utile per lavorare con l’indirizzo della pagina corrente.
	- ad esempio puoi refreshare
		- `setTimeout(()=>location.reload(),5000);`
##### Exception in java
- Le **eccezioni** servono per gestire situazioni in cui qualcosa va storto durante l’esecuzione del programma.
- possiamo dire che le eccezioni consentono la gestione degli errori anche tra varie funzioni del **call stack**: un errore può nascere dentro una funzione chiamata da un’altra funzione, ma può essere intercettato più in alto, nel punto in cui è presente il `catch`
- utilizzato mediante throw e catch
	- Error è un oggetto
		- composto da un nome dell'errore e una descrizione(viene precisata con throw)
	- `throw (new Error('The message'));`
	- `catch(e)`
![[Pasted image 20260505145652.png|600]]
##### una funzione che ritorna una funzione
- In JavaScript una funzione può anche **ritornare un’altra funzione**.
- Questo significa che il `return` della prima funzione non è per forza un numero, una stringa o un oggetto, ma può essere direttamente una nuova funzione(che è comunque un oggetto)
```Javascript
function multisum(p1) {  
let x = p1;  
  
return function sum(a, b) {  
return x * (a + b);  
}  
}
```
- possibilità:
	- chiamo `multisum(10)(1, 2);`
	- salvo `let s = multisum(15);`
		- poi chiamo `s(12, 13);`
##### Closure
- Una closure si crea quando una funzione interna usa variabili appartenenti allo scope della funzione esterna. Lo scope della funzione interna si “chiude” su quello del padre, quindi la funzione interna continua ad avere accesso a quelle variabili anche dopo che la funzione esterna ha terminato la sua esecuzione.
Esempio base:
```Javascript
function salutatore(name) {  
	let text = "Ciao " + name;  
	let diCiao = function() { alert(text);  }; 
	 return diCiao;
	 }
let s = salutatore("Lorenzo");
s();
```
Qui `salutatore("Lorenzo")` ritorna una funzione.
La cosa importante è che `s` non memorizza solo la funzione ritornata, ma anche l’ambiente in cui quella funzione è stata creata.
###### Closure e dati privati
- Un uso molto importante delle closure è creare dati “privati”.
Esempio:
```Javascript
function counter() {
  let a = 0;

  return {
    inc: () => a++,
    dec: () => a--,
    get: () => a,
    reset: () => a = 0
  };
}
```
- Qui `counter()` crea una variabile locale
- Queste funzioni sono definite dentro `counter()`, quindi formano una closure sulla variabile `a`.
Uso:
```Javascript
let c = counter();c.inc();c.inc();console.log(c.get());// 2
```
- Se però provo ad accedere direttamente ad `a`:
```Javascript
console.log(c.a);
```
- non ottengo il valore di `a`.
- Questo succede perché `a` non è una proprietà dell’oggetto ritornato. È una variabile locale della funzione `counter()`, accessibile solo dalle funzioni interne che sono state create in quello scope.
- Le closure permettono anche di separare **interfaccia** e **implementazione**.
- Nel caso di `counter`, l’interfaccia è ciò che l’utente può usare dall’esterno:
- L’implementazione, invece, è il modo in cui il dato viene gestito internamente
- Chi usa `counter()` non può modificare direttamente `a`.

###### IIFE (Immediately Invoked Function Expression)
Una IIFE è una funzione anonima invocata immediatamente. Viene usata per creare uno scope locale e non sporcare il global scope. Può essere usata anche insieme alle closure, perché le funzioni interne possono accedere alle variabili definite dentro la IIFE.
La struttura è questa:
```Javascript
(function() {  
// codice
})();
```
Esempio:

>[!info]- normalmente avresti fatto
> ```Javascript
> let a = 0;  
> let b = 0;  
>   
> function pippo(x, y) {  
> return x * y;  
> }
> ```

ma ora è:
```Javascript
(function() {
  let a = 0;
  let b = 0;

  function pippo(x, y) {
    return x * y;
  }
})();
```
La funzione viene eseguita subito, quindi il codice al suo interno parte immediatamente.
Però, appena finisce, le variabili `a`, `b` e la funzione `pippo` non sono visibili dall’esterno.
Quindi il punto non è “eseguirla subito” perché ci piace farlo, ma perché vogliamo dire:
> questo pezzo di codice deve partire subito, ma le sue variabili devono rimanere private/locali.

>[!info]- normalmente avresti fatto
> ```Javascript
> let a = 0;  
> let b = 0;  
>   
> function pippo(x, y) {  
> return x * y;  
> }
> ```

QUIZ A SLIDE 120
```Javascript
(function() {
  let a = b = 5;
})();

console.log(b);
```
- non significa davvero:`let a = 5;let b = 5;`
- Significa invece: `b = 5;let a = b;`
- **`b` diventa una proprietà dell’oggetto globale `window`**, se il codice non è in strict mode. quindi `console.log` stampa 5
