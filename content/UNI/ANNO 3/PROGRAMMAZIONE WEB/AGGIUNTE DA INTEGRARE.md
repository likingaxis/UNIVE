#### Javascript asincrono
- sincrono invio di richieste una appresso all'altra
- asincrono invio di richieste insieme
- definizione completa di FETCH
###### Codice sincrono
- modale con background color red e poi creiamo una conferma
	- fa vedere la modale e poi si blocca, successivamente continua dopo aver risposto alla modale
###### Codice asincrono
- settimeout imposta il timer e poi avviene un background task
	- dopo 2 secondi viene eseguito questo
	- che succede se ne accumulo di più nello stesso tempo?
- avere una callback chiamata a funzione non rende il codice asincrono 
	- ad esempio con il forEach avrei comunque una situazione sincrona
	- perchè eseguirebbe la riga 2 e poi la 3
- Codice asincrono 2
	- add event listener aggiunge comunque un pezzo di codice asincrono
	- aggiungo una immagine con url poi quando avviene load aggiungo fadeIn
###### Event Loop
- come funziona?
- abbiamo la call stack la memory heap 
	- le web apis che fanno partire un processo separato che gestisce la background task
	- in caso di onclick magari un handler che gestisce il click e che si attiva quando l'utente clicka
	- una volta terminate finiscono in una coda chiamata Callback Queue
		- Event loop cicla all'interno di questa lista di eventi e vede se si riempie
		- non mi ricordo chi esegue il codice javascript facendo eseguire gli step sincroni
			- l'Event loop rimane attivo in attesa di eventi nella coda e li esegue
				- aspetta che la funzione termini prima di eseguire il prossimo evento della callback queue
###### Gif esempio di una completa operazione 
- prendila dalle slide
- i setTimeout partono sempre dopo l'esecuzione della parte sincrona

###### Promises
- consentono a java di eseguire codice asincrono in modo semplice
- in javascript ricordiamo che
- quasi tutto è asincrono
	- utente online che interagisce con la pagina ecc
	- funzione con una certa callback ecc
- Callback hell problema dove ho un sacco di callback
	- Esempio di Callback Hell nelle ultime slide
- promises è un oggetto usato come placeholder per il risultato futuro di una operazione asincrona
	- un contenitore per un valore assegnato in modo asincrono
		- per un valore futuro che arriverà dopo
	- puoi gestire il risultato anche prima che arrivi il dato
	- restituisce un risultato che dirà in futuro arriverà qualcosa
- `new Promise(executor)`
	- executor è una funzione che chiama 2 callback
	- restituisce un oggetto che ha 3 stati con una sorta di enum
		- pending, resolved, rejected
- Esempio pratico di una promise
	- function ha 2 parametri resolve e reject
- Esempio da fare a casa con math random
	- quando refresho la cosa non funziona
- Le promise hanno un attributo detto then, quando la promise è fullfilled o rejected 
	- quindi fare tipo quando il server ha dei dati then renderizzali
	- then ha due argomenti uno per resolve uno per reject
	- il then dietro le quinte ad una funzione aggiunge il new promise
- una volta che hai fatto resolve non avviene il reject
	- sono uno o l'altro
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
#### Posso creare delle catene di promise
- Esercizio 2: orderpizza.then console log viene eseguito dopo quando si risolverà la promise
- Esempio 3: il then viene eseguito comunque alla fine perchè l'event loop lo fa eseguire alla fine
	- in questo caso viene messo subito nella coda
- Esempio 4: se non premo entro 5 secondi fa console.log Option B
Foto con concatenazione di promise
- Esempio 5
	- javascript te lo cambia come se ci fosse una sorta di new promise
	- il then dietro le quinte ad una funzione aggiunge il new promise
- alla fine della chain potrei mettere un finally o un catch di un ipotetico errore se vengono usate per errori
##### Le microtask queue
- le promise non vanno nel callback queue ma nel microtask queue
	- con priorità maggiore preemptive
		- la svuota tutta e poi fa la callback queue
- esempio di priorità
	- fa prima start poi stop poi fa quelle della micro quindi res ciclo res e poi fa timer 0
