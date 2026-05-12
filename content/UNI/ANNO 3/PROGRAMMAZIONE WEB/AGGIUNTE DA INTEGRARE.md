##### Continuo DOM
- In JavaScript è possibile associare del codice a un evento, cioè a qualcosa che accade nella pagina, ad esempio un click su un bottone
	- per catturare eventi posso usare onclick inline e eseguo il javascript che voglio
		- `<button id="btn" onclick="saluta()">sconfiggi louis nell'ULTIMA battaglia FINALE</button>`
	- `document.getElementById("id").tipoevento=funzione;`
	- oppure posso usare 
		- `document.getElementById("id").addEventListener('tipoevento',funzione)`
	- posso chiamare funzioni dichiarate anche dal file `.js`
	- quando l’evento avviene, viene eseguito il codice associato
		- questo codice è gestito dall’**handler dell’evento**
		- l’handler è quindi la funzione che stabilisce cosa deve succedere quando l’evento viene generato
	- posso associare una funzione anche dallo script js
##### Esempi di eventi
- in JavaScript esistono diversi tipi di eventi che posso intercettare sugli elementi del DOM
	- un evento rappresenta qualcosa che accade nella pagina
	- quando si verifica un evento, il browser può passare automaticamente alla funzione un oggetto evento
	- questo oggetto contiene informazioni utili su ciò che è successo
	- nel caso di eventi legati al mouse o al puntatore, posso avere un oggetto di tipo `PointerEvent` o simile
	- per riceverlo basta modificare il codice della funzione, forzando il passaggio del parametro dell’oggetto evento
		- l’oggetto evento dà informazioni utilissime, ad esempio:
		- la posizione del mouse
		- l’elemento che ha generato l’evento
		- l’elemento su cui l’evento è avvenuto
		- proprietà come `srcElement` e `target`
- `onclick`
    - viene generato quando l’utente clicca su un elemento
- `onblur` / `onfocus`
    - `onfocus` viene generato quando un elemento prende il focus
        - ad esempio quando clicco dentro un input
    - `onblur` viene generato quando un elemento perde il focus
- `onchange`
    - viene generato quando il contenuto di un elemento cambia
        - ad esempio quando cambia il valore di un input, di una select o di un campo di un form
- `onload`
    - viene generato quando la pagina, o una certa risorsa, ha finito di caricarsi
    - può essere usato per eseguire codice solo dopo il caricamento del documento
    - esercizio:
        - levare `defer`
        - usare `document.onload` o un evento di caricamento per eseguire lo script solo quando il documento è pronto
- `onmousedown` / `onmouseup`
    - `onmousedown` viene generato quando un bottone del mouse viene premuto
    - `onmouseup` viene generato quando il bottone del mouse viene rilasciato
- `onmousemove` / `onmouseout` / `onmouseover`
    - `onmousemove` viene generato quando il mouse si muove sopra un elemento
    - `onmouseover` quando il mouse entra sopra un elemento
    - `onmouseout` quando il mouse esce da un elemento
- `onsubmit`
    - viene generato quando viene inviato un form
    - è utile per controllare i dati prima dell’invio
    - tramite l’oggetto evento posso capire quale form ha generato il submit
###### Metodi migliori per rispettare la continuazione del DOM
- quando dichiaro un file js in html devo inserirlo quando il DOM ha generato quella determinata porzione da noi interessata
	- questo non è ottimale ma possiamo mettere defer `src`
	- usare `defer`, include il file js solo dopo che il DOM è stato generato totalmente
	- usare `async` per eseguire appena la parte asincrona ha finito di scaricare
		- non aspetta la generazione del DOM
- ricordiamo che l'oggetto global è window
###### Modificare Css dal DOM
- prendo l'elemento con tipo `getElementById` e poi aggiungo .style.proprietà
	- al posto del - uso la prima lettera maiuscola
	- di base funziona come getter
	- se aggiungo un uguale diventa setter
	- `document.getElementById("clickme").style.marginTop=Math.random()*500+"px";`
##### Creare un nodo
- nel DOM ogni elemento della pagina può essere visto come un **nodo**
- il `div` è un nodo
- anche il testo `"Ciao!"` è un nodo
    - più precisamente è un nodo di testo
- posso creare nuovi nodi direttamente con JavaScript
- per creare un nuovo elemento HTML uso `createElement`
```
var newDiv = document.createElement("div");
```
- questo crea un nuovo nodo `<div>`
    - però non appare subito nella pagina
    - esiste solo in memoria finché non lo inserisco nel DOM
- per creare del testo uso `createTextNode`

```
var ourText = document.createTextNode("Ciao!");
```

- per inserire il testo dentro il `div` uso `appendChild`

```
newDiv.appendChild(ourText);
```

- `appendChild` significa “aggiungi come figlio”
    - quindi `ourText` diventa figlio di `newDiv`
- poi inserisco il nuovo `div` dentro un elemento già presente nella pagina

```
var ourDiv = document.getElementById("mydiv");ourDiv.appendChild(newDiv);
```

- quindi:
    - creo un nodo `div`
    - creo un nodo di testo
    - metto il testo dentro il `div`
    - metto il `div` dentro l’elemento con id `"mydiv"`

##### Metodi principali sui nodi

- `appendChild`
    - aggiunge un nodo come ultimo figlio di un altro nodo

```
ourDiv.appendChild(newDiv);
```

- `insertBefore`
    - inserisce un nodo prima di un altro nodo già presente

```
ourDiv.insertBefore(newHeading, para);
```

- `replaceChild`
    - sostituisce un nodo con un altro

```
ourDiv.replaceChild(newImg, oldImg);
```

- `removeChild`
    - rimuove un nodo figlio dal suo nodo genitore

```
parentDiv.removeChild(removeMe);
```