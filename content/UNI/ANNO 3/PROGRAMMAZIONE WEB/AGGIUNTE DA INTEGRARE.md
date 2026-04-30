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