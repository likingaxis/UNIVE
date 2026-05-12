##### Continuo DOM
- mediante inline posso mettere determinati codici in `js`
	- per catturare eventi posso usare onclick inline e eseguo il javascript che voglio
		- `<button id="btn" onclick="saluta()">sconfiggi louis nell'ULTIMA battaglia FINALE</button>`
	- `document.getElementById("id").tipoevento=funzione;`
	- oppure posso usare `document.getElementById("id").addEventListener('tipoevento',funzione)`
	- posso chiamare funzioni dichiarate anche dal file `.js`
	- gestito dall'handler dell'evento
	- posso associarla anche dallo script js

##### Esempi di eventi
- esiste un puntatore a un evento pointerEvent
	- basta modificare il codice per forzare il passaggio di parametro dell'oggetto evento
	- che da informazioni utilissime come la posizione `srcElement` `target`
	- 
- onclick
- onblur/onfocus
- onchange
- onload
	- Esercizio levare il defer e fare document onload 
- onmousedown/up
- onmousemove/out/over
- onsubmit
	- posso capire a quale form appartiene un certo onsubmit?
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
- spiega cosa sono i nodi
- non ho capito
- appendChild il più usate
- poi abbiamo replaceChild
- removeChild
- insertBefore
