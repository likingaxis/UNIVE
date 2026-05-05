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
