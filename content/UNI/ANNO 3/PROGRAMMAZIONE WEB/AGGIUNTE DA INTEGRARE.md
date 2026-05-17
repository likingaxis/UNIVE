#### Javascript asincrono
- sincrono le istruzioni vengono eseguite una dopo l’altra
- asincrono alcune operazioni possono essere avviate e lasciate “in attesa” mentre il resto del programma continua a essere eseguito
Questo è fondamentale nel web, perché molte operazioni richiedono tempo: caricamento di immagini, timer, richieste a un server, interazioni dell’utente o chiamate tramite `fetch`.
- `fetch`, in particolare, è uno degli strumenti principali per fare richieste HTTP in Javascript in modo asincrono: consente di chiedere dati a un server senza bloccare l’esecuzione del resto della pagina
###### Codice sincrono
Un esempio di codice sincrono è quello in cui selezioniamo una modale, cambiamo il suo colore di sfondo e poi mostriamo una finestra di conferma.
```Javascript
const modal = document.querySelector('.modal');
modal.style.backgroundColor = 'red';

let val = confirm('Show Modal?');

if (val) {
  modal.classList.add('show');
}
```
- In questo caso il codice viene eseguito riga per riga

###### Codice asincrono
Un esempio di codice asincrono è l’utilizzo di `setTimeout`.
```Javascript
const modal = document.querySelector('.modal');
setTimeout(function () {
  modal.classList.add('show');
}, 2000);
modal.style.backgroundColor = 'red';
```
In questo caso `setTimeout` imposta un timer: diciamo al browser di eseguire una certa funzione dopo 2 secondi
Il timer viene affidato a un meccanismo esterno, una sorta di background task gestita dal browser, mentre il codice sincrono continua la sua esecuzione
##### Callback $\neq$ codice asincrono
```Javascript
const buttons = document.querySelectorAll('.btn');

buttons.forEach((el) => {
  el.style.backgroundColor = 'white';
});
```
Una callback è semplicemente una funzione passata come argomento a un’altra funzione. Però può essere usata sia in contesti asincroni sia in contesti sincroni
Qui stiamo usando una callback dentro `forEach`, ma il codice resta sincrono


###### Codice asincrono 2
```Javascript
const image = document.querySelector('.my-img');

image.src = 'mountain.jpg';

image.addEventListener('load', function () {
  image.classList.add('fadeIn');
});

modal.style.backgroundColor = 'white';
```
-  add event listener aggiunge comunque un pezzo di codice asincrono
- aggiungo una immagine con `url` poi quando avviene load aggiungo `fadeIn`
- dopo aver registrato l’evento `load`, continua con la riga successiva e imposta il colore di sfondo della modale a bianco
###### Event Loop
Quando una funzione viene chiamata, entra nella Call Stack. Quando la funzione termina, viene rimossa dalla Call Stack. Questo è il meccanismo con cui Javascript esegue normalmente il codice sincrono: una funzione alla volta, dall’inizio alla fine
Quando una funzione viene chiamata, entra nella Call Stack. Quando la funzione termina, viene rimossa dalla Call Stack. Questo è il meccanismo con cui Javascript esegue normalmente il codice sincrono: una funzione alla volta, dall'inizio alla fine
Javascript, da solo, esegue il codice in modo sincrono. Le operazioni asincrone vengono invece gestite con l’aiuto dell’ambiente in cui Javascript sta girando, ad esempio il browser o alcune web APIs
- Per esempio, nel caso di `setTimeout`, il timer viene gestito dal browser. Nel caso di un `onclick`, il browser registra un handler, cioè una funzione da eseguire quando l’utente cliccherà su un certo elemento
Quando l’operazione asincrona è pronta, la callback associata non viene eseguita immediatamente. Prima viene inserita in una coda chiamata **Callback Queue**, o **Message Queue**.
A questo punto entra in gioco l’**Event Loop**.
L’Event Loop è un meccanismo che controlla continuamente due cose:
1. se la **Call Stack** è vuota;
2. se nella **Callback Queue** ci sono funzioni in attesa.
Quando la Call Stack è vuota e c’è una callback pronta nella Callback Queue, l’Event Loop prende quella callback e la sposta nella Call Stack, dove finalmente può essere eseguita
- aspetta che la funzione termini prima di eseguire il prossimo evento della callback queue
![[Pasted image 20260517181049.png|562]]
###### Gif esempio di una completa operazione 
![[slides_21_24_event_loop.gif]]
- i setTimeout partono sempre dopo l'esecuzione della parte sincrona
- i passaggi quindi sono:
	- il codice sincrono entra nella Call Stack ed è eseguito
	- le operazioni asincrone vengono affidate alle Web APIs
	- quando una background task termina, la sua callback finisce nella Callback Queue
	- l’Event Loop controlla se la Call Stack è vuota
	- se è vuota, prende la prima callback dalla coda e la inserisce nella Call Stack
	- la callback viene eseguita
	- solo quando termina, si può passare all’evento successivo
###### Promises
Le **Promises** consentono a Javascript di gestire il codice asincrono in modo più semplice e ordinato.
- Nel web, infatti, molte operazioni sono asincrone: l’utente può interagire con la pagina, può cliccare un pulsante, può essere caricato un file, può arrivare una risposta da un server, può terminare un timer, e così via.
	- dobbiamo spesso gestire situazioni in cui un risultato **non è disponibile subito**, ma arriverà in un momento futuro.
Prima delle Promises, molte operazioni asincrone venivano gestite principalmente tramite callback. Il problema è che, quando abbiamo tante operazioni asincrone una dentro l’altra, rischiamo di creare il cosiddetto **Callback Hell**.
Il Callback Hell è una situazione in cui abbiamo molte callback annidate, cioè una dentro l’altra, e il codice diventa difficile da leggere, da modificare e da mantenere.
Un esempio tipico è quello con tanti `setTimeout` annidati:

```Javascript
setTimeout(() => {
  console.log('1 second passed');

  setTimeout(() => {
    console.log('2 seconds passed');

    setTimeout(() => {
      console.log('3 second passed');

      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
```
Le **Promises** servono proprio a gestire meglio questi casi.
Una Promise è un oggetto usato come **placeholder per il risultato futuro di una operazione asincrona**
In altre parole, è un contenitore per un valore che ancora non abbiamo, ma che arriverà più avanti
Quando creo una Promise, non sto necessariamente ottenendo subito il risultato finale. Sto ottenendo un oggetto che mi dice: “in futuro questa operazione potrà terminare con successo oppure con un errore”.
Questo è utile perché posso già preparare il codice che dovrà gestire il risultato, anche se il risultato non è ancora arrivato.
###### Creazione di una promise
```Javascript
new Promise(function (resolve, reject) {  
	// operazione asincrona
});
```
- resolve e reject sono le 2 callback che vengono chiamate rispettivamente quando l'operazione termina con *successo* o *errore*
- una Promise si può trovare in 3 stati principali
	- *pending*, in attesa di essere risolta
	- *fulfilled*, completata con resolve
	- *rejected*, fallita con reject
![[Pasted image 20260517184004.png|528]]
Un esempio
```Javascript
const promise = new Promise(function (resolve, reject) {  
	setTimeout(function () {  
	resolve('done');  
	}, 1000);  
});
```
- dopo 1 secondo viene risolta la background task e entra in stato fulfilled con resolve

###### Consumare una promise con then
Una Promise rappresenta un risultato futuro. Per gestire quel risultato, cioè per dire cosa deve succedere quando la Promise termina, possiamo usare il metodo `.then()`
- viene eseguito quando la Promise non è più nello stato `pending`, ma è stata completata

`promise.then(onFulfilled, onRejected);`
- Il primo argomento, `onFulfilled`, è la funzione che viene eseguita quando la Promise termina con successo `resolved`
- il secondo quando fallisce quindi `rejected`

```Javascript
const promise = new Promise((resolve, reject) => {  
	setTimeout(() => {  
		resolve('Dati ricevuti dal server');  
	}, 2000);  
});  
promise.then(  
	result => {  
		console.log(result);  
		},  
	error => {  
		console.error(error);  
		}  
);
```
Dopo 2 secondi viene chiamato `resolve('Dati ricevuti dal server')`.
A quel punto viene eseguita la prima funzione passata a `.then()`, che riceve come parametro il valore passato a `resolve`


>[!attention]
> Una Promise può terminare una sola volta.
> Questo significa che, una volta chiamato `resolve`, la Promise viene considerata completata con successo e non potrà più essere rifiutata.
> `resolve` e `reject` sono alternativi: o succede uno, o succede l’altro.
`.then()` restituisce a sua volta una nuova Promise.

###### Promise chain
possiamo concatenare più `.then()` uno dopo l’altro.
Dietro le quinte, quando scriviamo un `.then()`, Javascript costruisce un nuovo passaggio asincrono basato sul valore restituito dalla funzione precedente
![[Pasted image 20260517185434.png|527]]
Invece di annidare tante callback una dentro l’altra, possiamo mettere più `.then()` in sequenza, rendendo il codice più leggibile e più facile da seguire
- quando uso `.then` sto registrando una task che sarà eseguita quando la promise originale sarà completata
```Javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Dati ricevuti dal server');
  }, 2000);
});

promise.then(
  result => {
    console.log(result);
  },
  error => {
    console.error(error);
  }
);
```


```Javascript
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(Math.random() > 0.5) {
            reject(new Error("errore!"));
        }
        else{
            resolve("fatto!");
        }
        console.log(promise) //sono dentro la promise
    }, 10000);
});
console.log(promise); //ci sarà la promise pending
promise.then(result => console.log(result), error => console.error(error)); //risultato fatto!
```

##### La MicroTask Queue
Le Promise non usano la normale **Callback Queue**, ma una coda speciale chiamata **Microtask Queue**.
Questa distinzione è importante perché la Microtask Queue ha una priorità maggiore rispetto alla Callback Queue
Quindi, prima di eseguire una callback normale, Javascript svuota completamente la Microtask Queue
![[Pasted image 20260517190340.png|508]]
###### Esempio di priorità
```Javascript
console.log('Start');
setTimeout(() => console.log('Timer 0'), 0);
Promise.resolve('resolved Promise 1').then((res) => {
  console.log(res);
});
Promise.resolve('resolved Promise 2').then((res) => {
  for (let index = 0; index < 1000000000; index++) {}
  console.log(res);
});
console.log('Stop');
```
in questo esempio la Promise non viene salvata in una variabile. Viene creata “al volo”.
`Promise.resolve(...)` è una scorciatoia per creare una Promise già risolta
- anche se `Promise.resolve(...)` crea una Promise già risolta, il codice dentro `.then()` **non viene eseguito subito**.
- Viene comunque messo nella **Microtask Queue** e verrà eseguito solo dopo che il codice sincrono è finito
##### Usare try catch e finally con le promise
```Javascript
Promise.resolve('Dati ricevuti')
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log('Operazione terminata');
  });
```
Il significato è:
```scss
then    → cosa faccio se la Promise va a buon fine
catch   → cosa faccio se la Promise fallisce
finally → cosa faccio in ogni caso, sia successo sia errore
```
