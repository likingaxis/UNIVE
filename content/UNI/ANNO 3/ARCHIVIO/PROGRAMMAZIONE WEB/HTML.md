### PAGINA WEB
Una **pagina web** è un documento visualizzato dal browser composto da tre parti principali:
- 3 componenti
	- statica(HTML)
	- grafica(CSS)
	- dinamica(JAVASCRIPT)
- il server web non manda il file HTML ma manda il contenuto del file HTML
### HTML(HyperText Markup Language)
- a cosa serve e cosa è
	- *html* è linguaggio di marcatura per strutturare documenti ipertestuali e come standard molto usato per creare pagine visualizzabili tramite browser
	- *“HyperText”* vuol dire che il documento può contenere i link
- funziona attraverso *elementi*
	- Un **elemento HTML** è una parte logica della pagina.  
		- Per esempio:
			- un titolo un paragrafo, un link, un’immagine, una sezione
- I *tag* sono le scritte tra parentesi angolari che servono a definire gli elementi HTML.
- i tag si dividono in 2 tipi
	- void elements
		- non hanno contenuto interno e in genere non hanno tag di chiusura
	- not void element
		- hanno chiusura e contenuto
- sono anche di 2 tipi
	- *block element*
		- sono elementi che di solito vengono visualizzati **andando a capo** e occupando tutta la larghezza disponibile
	- *inline element*
		- Sono elementi che di solito **non vanno a capo** e stanno “in linea” con il testo.
- In HTML, il browser normalmente:
	- comprime spazi multipli in uno solo
	- ignora gli a capo scritti nel codice
	- ignora gran parte dell’indentazione usata per rendere il file leggibile
	- per questo servono i `<br>`
- HTML moderno usa il concetto di **charset**, e oggi normalmente si lavora in **Unicode**, molto più ampio di ASCII.
	- hanno sequenze di escape
		- Sono modi speciali per scrivere in HTML caratteri che:
			- il browser potrebbe interpretare come parte del markup
				- oppure sono simboli particolari
				- Per esempio:
				- `&lt;` rappresenta `<`
- html è composto da head e body
	- *head* tutte informazioni per il browser
	- *body* parte visibili della pagina
		- viewport
			- Il viewport è l’area visibile della pagina nel browser
- *l'albero degli elementi* di html è
	- gli elementi formano un albero e che l’elemento `<html>` è la radice
	- Vuol dire che gli elementi HTML sono organizzati in una struttura gerarchica:
		- c’è un elemento radice
		- alcuni elementi stanno dentro altri elementi
		- quindi si formano relazioni padre-figlio
	- è importante che ci sia questo albero per motivi di utilizzo javascript e css
		- Quindi l’albero è essenziale per raggruppare e selezionare parti specifiche della pagina.
		- il browser costruisce a partire da essi quindi gli elementi devono essere correttamente annidati
	- è un albero e non una lista perché  in HTML c’è una **gerarchia** dove un elemento è dentro un altro
- gli *attributi*
	- Gli **attributi** aggiungono informazioni all’elemento.
		- `<img src="foods.gif" alt="food illustration">`
- Markup semantico di HTML5
	- Il **markup semantico** in HTML consiste nell’utilizzare i tag HTML non solo per organizzare visivamente il contenuto della pagina, ma soprattutto per **esprimere il significato e il ruolo logico delle diverse parti del documento**.
	- L’obiettivo è **descrivere la struttura logica del documento** utilizzando i tag più appropriati.
		- Questo significa che ogni volta che si utilizza un tag HTML si sta:
			- **strutturando il documento**
			- **attribuendo un significato al contenuto**
			- **comunicando al browser e ad altri sistemi il ruolo di quella parte della pagina**
	- Il prof dice che una delle ragioni forti dell’HTML5 semantico è che sistemi come **Google** avevano bisogno di capire meglio la struttura delle pagine.
L’uso corretto del markup semantico permette di:
1. **Migliorare la comprensione della pagina da parte del browser**
2. **Favorire l’indicizzazione nei motori di ricerca (SEO)**
3. **Migliorare l’accessibilità**, ad esempio per screen reader usati da utenti con disabilità
4. **Rendere il codice più leggibile e mantenibile** per gli sviluppatori
5. **Facilitare l’utilizzo di CSS e JavaScript**, che possono selezionare più facilmente parti specifiche del documento
TIPICA PAGINA HTML5
![[Pasted image 20260312184956.png|400]]

#### Path HTML
- path relativi o assoluti
- Assoluto
	`/img/logo.png`
	- indica il path di destinazione esatto del web server
- Relativo
	`img/logo.png`
	`../img/logo.png`
	- il browser sfrutta la concatenazione con il path precedente
👉 Il browser:
- concatena automaticamente il path corrente con quello relativo

#### TAG html da ricordare
##### dichiarazione documento
- **`<!DOCTYPE html>`**  
	- indica al browser che il documento è **HTML5**.  
	- non è un vero tag HTML e **non ha chiusura**.
##### struttura principale della pagina
- **`<html>`**  
	- tag **radice** che contiene tutta la pagina.
- **`<head>`**  
	- contiene **metadati** della pagina (title, meta, link CSS ecc).
- **`<title>`**  
	- definisce il **titolo della pagina** mostrato nella scheda del browser.
- **`<meta>`**  
	- tag per **informazioni sulla pagina** (charset, viewport ecc).  
	- è un **void element**, quindi **non ha chiusura**.
- **`<body>`**  
	- contiene **tutto il contenuto visibile della pagina**.
##### struttura semantica html5
- **`<header>`**  
	- intestazione della pagina o di una sezione.
- **`<nav>`**  
	- area di **navigazione** (menu).
- **`<main>`**  
	- contenuto **principale** della pagina.
- **`<section>`**  
	- rappresenta una **sezione tematica** della pagina.
- **`<footer>`**  
	- parte **finale** della pagina o di una sezione.
- **`<figure>`**  
	- contenitore per **immagini, grafici o illustrazioni**.
##### tag per il testo
- **`<h1>`**  
	- intestazione principale della pagina.  
	- può andare da **h1 a h6**.
- **`<p>`**  
	- definisce un **paragrafo di testo**.
- **`<strong>`**  
	- indica testo **semanticamente importante**.
- **`<blockquote>`**  
	- indica una **citazione lunga**.
##### link
- **`<a>`**  
	- sta per **anchor**.  
	- serve per creare **link ipertestuali**.
	- attributo principale:
	    - **`href`** → destinazione del link
##### liste
- **`<ol>`**  
	- **ordered list** → lista numerata.
- **`<ul>`**  
	- **unordered list** → lista puntata.
- **`<li>`**  
	- elemento della lista.
##### liste di definizione
- **`<dl>`**  
	- definition list.
- **`<dt>`**  
	- termine.
- **`<dd>`**  
	- definizione del termine.
##### elementi generici
- **`<div>`**  
	- contenitore **block generico**.
- **`<span>`**  
	- contenitore **inline generico**.
##### void elements
- **`<img>`**  
	- inserisce un'immagine.
- **`<br>`**  
	- ritorno a capo.
- **`<hr>`**  
	- linea orizzontale di separazione.  
	- in **HTML5** indica anche un **cambio di argomento/sezione**
