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
