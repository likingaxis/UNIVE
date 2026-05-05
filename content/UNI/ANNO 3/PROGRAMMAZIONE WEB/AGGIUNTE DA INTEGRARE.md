lezione del 5 maggio
cosa è una closure
cosa è una eredità prototipale
##### Oggetti built-in
- Date
	- oggetto che ti permette di creare una data
- typeof
	- ritorna un numero
- theDay
- Math
	- oggetto con metodi che permettono operazioni matematiche
	- pow, exp, min, max, round, sin, cos, tan
- JSON
	- oggetto utilizzato moltissimo per scambio dati via client server
	- JSON.stringify(studente)
		- crea una stringa di un oggetto
	- JSON.parse(stringa)
		- trasforma una stringa in un oggetto
- Window
	- rappresenta la finestra del browser
	- puoi anche non precisarlo esplicitamente
	- window open, close
	- window alert, prompt 
	- `Scrollto()`
	- set interval
		- `setInterval(()=> console.log("ciao"),1000)`
			- esegue una funzione ogni tot secondi
		- ogni intervallo restituisce un suo handler con un suo id
		- per terminarlo `clearInterval(handler)`
	- setTimeout per programmare una funzione
non ho ancora ben capito la scrittura tramite freccia
- location
	- oggetto utile per refreshare la pagina ad esempio
	- `setTimeout(()=>location.reload(),5000);`
##### Exception in java
- utilizzato mediante throw e catch
- consente la gestione di errori tra varie funzioni del call stack
	- l'eccezione è un oggetto
	- `throw (new Error('The message'));`
	- `catch(e)`

aggiungi precisazione a vecchi appunti 
- una variabile se dichiarata con let ha uno scope di enclosing block
	- la variabile viene vista solo nelle graffe
- se dichiarata con var ha uno score di tipo functional block
	- valore della variabile permane dentro tutta la funzione
- foto a slide 111
##### una funzione che ritorna una funzione
slide 111 esempio
uso doppi parametri per doppia funzione dentro
posso salvare la funzione dentro e poi richiamarla?
quindi fare tipo s=multisum(15) e poi fare s=(12,13) per far fare la somma
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
##### 