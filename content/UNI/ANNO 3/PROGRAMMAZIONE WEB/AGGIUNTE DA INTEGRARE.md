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
definisce lo scope outer function e inner function lo scope si chude su quello del padre
come esempio ha creato una funzione con dentro due sotto funzioni scritte inline che sono inc e dec
credo sia un pattern di programmazione dove lo scope della funzione interna si chiude su quella esterna

posso creare privacy dei dati perchè a non viene vista
```Javascript
function counter(){
let a=0;
return {
	inc: ()=> a++
	dec:()=> a--
	}
}
```
questa cosa ci permette di creare dati privati se metto c=counter()
non ci sarà accesso ad a
posso applicarla a multisum?
le closure permettono di sperare l'implementazione dall'interfaccia
###### IIFE(Independent Invoked Functional Expression)
tecnica che consente di creare una funzione anonima per per le closure?
esempio a slide 118

QUIZ A SLIDE 120
