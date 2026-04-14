### DNS DEFINIZIONE
Il **DNS (Domain Name System)** è un sistema che traduce i **nomi di dominio leggibili dagli utenti** (es. `google.com`) negli **indirizzi IP** utilizzati dai computer per comunicare sulla rete.
### HTTP DEFINIZIONE
**HTTP (HyperText Transfer Protocol)** è il **protocollo di comunicazione** utilizzato sul Web per lo **scambio di dati tra client (browser) e server**.
Funziona tramite **richieste (request)** e **risposte (response)**:
- il **browser invia una richiesta HTTP**
- il **server risponde inviando la pagina web o i dati richiesti**
È un protocollo **stateless**, cioè **non mantiene memoria delle richieste precedenti**.
### PARADIGMA CLIENT SERVER WEB 
Il Web si basa su un **modello client-server**.
- **CLIENT (Browser)**  
    programma usato dall’utente (Chrome, Firefox, Edge) che **invia richieste al server**.
- **SERVER (Web Server)**  
    computer che **ospita i siti web** e **risponde alle richieste dei client** inviando pagine HTML, CSS, JS o altri dati.
## GIT
- DEFINIZIONE -> 
	- strumento di versionamento per utilizzo produzione software ecc
	- **Git** è un **sistema di controllo di versione (Version Control System)** utilizzato nello sviluppo software per **gestire e tracciare le modifiche al codice nel tempo**.
### Concetto di branch in git
- Un **branch** è una **linea di sviluppo indipendente** all’interno di un repository
- Permette di lavorare su più funzionalità **in parallelo senza interferire**
- Ogni branch rappresenta una **istantanea del progetto in un certo momento**
- Tecnicamente:
	- un branch è un **puntatore a un commit**
	- spostandosi nel branch si cambia la “versione” del progetto
- di solito si ha la linea di sviluppo principale
	- branch principale main
	- da questo poi se ne derivano diverse linee di sviluppo
Best practice:
- creare **un branch per ogni task**
- fare merge spesso → evita conflitti grossi alla fine
- `HEAD` è un **puntatore al commit corrente**
	- indica:
		- su quale branch sei
		- quale versione stai usando
DIVIDE IN:
- WORKING TREE
	- È la **cartella di lavoro locale** sul computer dello sviluppatore locale
- INDEX (Staging Area)
	- È l'area dove si **preparano le modifiche prima del commit**.
	- Qui vengono messi i file che si vogliono includere nel prossimo commit.
- REPOSITORY locale
	- release del prodotto somma dei commit in locale
	- contiene tutte le commit tutte le info ecc anche in locale!
- REPOSITORY REMOTO SERVER
	- stessa repo ma su un server
- COMPOSTO DA COMMIT
	- SNAPSHOT DELLA REPOSITORY, LA LORO SOMMA MOSTRA IL PRODOTTO FINALE
	- Salva le modifiche preparate nello **staging area** dentro il **repository locale**.
- operazioni
	- push -> carico dal repository locale a quello remoto
	- pull -> scarico dalla repo remota , in realtà fa 2 step
		- fetch recupera le modifiche dalla repo ma senza modificare la working directory
		- merge congiunge il repository locale con quello remoto
	- add -> aggiunge i file allo staging area
	- status -> ti dice lo status della repository locale
	- git log -> ti dice tutti i commit della repo con nome, ora ecc...
### comandi
- `git branch nome`  
    crea un nuovo branch a partire dal commit corrente (di solito dal main)

- `git checkout nome/id`  
    cambia la working directory in base al branch o commit, ti fa passare da un branch a un altro
    - il passaggio puoi farlo solo se hai salvato le modifiche:
        - `git commit`
        - oppure `git stash`

- `HEAD`  
    punta al commit corrente del branch su cui stiamo lavorando (cioè la posizione attuale nella storia)

- `git stash`  
    salva temporaneamente le modifiche non committate e ti riporta allo stato del commit precedente

- `git stash pop`  
    recupera lo stato salvato con stash e lo riapplica alla working directory

- `git merge`  
    consente di unire due branch tra loro
    - **fast forward**:  
        il branch principale (es. main) viene semplicemente “spostato avanti” seguendo i commit dell’altro branch (storia lineare)
![[Pasted image 20260317152201.png|300]]
    - **merge commit**:  
        quando i branch hanno entrambi modifiche → viene creato un nuovo commit di merge
        - può esserci conflitto → automatico o manuale
        - alla fine ottieni un commit che unisce entrambe le modifiche
        - Git lavora riga per riga, ma con file binari spesso non riesce → devi scegliere quale versione tenere
![[Pasted image 20260317152315.png|300]]
![[Pasted image 20260317152347.png|300]]

- **rebase**  
    quando hai due linee di sviluppo, invece di fare merge puoi “spostare” i commit sopra un altro branch
    - rende la storia più lineare
    - attenzione: riscrive la history

- `.gitignore`  
    file per dire a Git cosa ignorare
    - file temporanei
    - cartelle (es. `node_modules/`)
    - file di build o sensibili
```scss
Working Tree
     ↓
   add
     ↓
   Index
     ↓
  commit
     ↓
Repository locale
     ↓
   push
     ↓
Repository remoto
```

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
### CSS
- standard del W3C
- il CSS definisce la *presentazione* del documento HTML
- CSS consente di dividere il **contenuto(HTML)** dalla **resa visiva(CSS)**
- CSS può essere definito come
	- external *style sheet*
		- file esterno da associare nella head con 
		- `<link rel="stylesheet" type="text/css" href="mystyle.css">`
	- internal *style element*
		- usando i tag 
			- `<style>...</style>`
	- *inline*
		- scrivendo negli elementi
			- usando l'attributo `style=`
			- `<h1 style="color:red"> This is a Heading</h1>`
- com'è fatto di solito
	- selettore `(h1)`
	- dichiarazione tutto quanto il pezzo `color: green`
	- proprietà `color`
	- valore `green`
```css
h1 {
	color: green;
	font-size: 32px;
}
```
- parametro `class`
	- crea un gruppo per quel determinato elemento
	- posso fare più classi (AND logico)
	- mettendole con lo spazio
		- `class="classe1 classe2"`
	- gestione dei conflitti:
		- dipende dalla **specificità**
			- `id, tag.classe, .`
		- e dall’ordine (vince l’ultima regola scritta)
- `*` selettore prende tutti gli elementi
###### SPECIFICITÀ IN CSS
- in css posso fare `tag.classe` per specificare quei tag con quella classe
- oppure `.classe` per prendere TUTTI i tag di quella classe
- parametro `id`
	- da assegnare a un solo elemento della pagina
	- uso `#` in css per selezionarlo
		- si suggerisce di usarlo solo per un elemento per evitare problemi
#### TIPI DI SELETTORI che vedremo in CSS
- **selettore di elemento**
    - es: `p { ... }`
- **selettore di classe**
    - es: `.classe { ... }`
- **selettore id**
    - es: `#id { ... }`
- **selettori composti**
    - es:
	    ```
	    div p  
	    div > p  
	    h2 + p
	    ```
- **selettori attributo**
    - es:    `[attribute]  ``[attribute=value]`
- **pseudoclassi**
    - es:`:hover`   `:visited`  `:nth-child()`
- **pseudoelementi**
    - es:   `::before`  `::after`
##### SELETTORI WEB DOM
- HTML è visto come un **albero**
    - parent (genitore)
    - child (figlio)
    - sibling (fratelli)
    - ancestor (antenati)
![[Pasted image 20260319152110.png|400]]

- selettori composti (dipendono dalla posizione nell'albero)
    - **descendant (spazio)**
        - `A B`
        - tutti gli elementi B dentro A (anche annidati)
        - es:
	        `main p`
	        → tutti i `p` dentro `main` (anche dentro div ecc)
    - **child (`>`)**
        - `A > B`    
        - solo i figli diretti
        - es:
	        `main > p`
	        → solo i `p` figli diretti di `main`
    - **adjacent sibling (`+`)**
        - `A + B`
        - prende **solo il primo elemento subito dopo A**
        - es:
	        `h2 + p`
	        → il primo `p` subito dopo un `h2`
    - **general sibling (`~`)**
        - `A ~ B`
        - prende **tutti gli elementi B dopo A (stesso livello)**
        - es:
	        `h2 ~ p`    
	        → tutti i `p` dopo un `h2` (non solo il primo)
##### SPECIFICITÀ DI UN SELETTORE (DA ESAME)
- è la **forza** con cui un selettore compete con altri
- serve per capire quale regola viene applicata in caso di conflitto
- come va calcolata la specificità:
    - definita come una lista `[a,b,c,d]`
    - **a = dichiarazione inline**
        - 1 se presente, 0 altrimenti
    - **b = numero di selettori id**
    - **c = numero di:**
        - classi
        - attributi
        - pseudoclassi
    - **d = numero di:**
        - elementi
        - pseudoelementi
- il confronto avviene da sx a dx `inline > id > classe > elemento`
- esempio con un selettore CSS lungo: 
- ```css
  html body div#pagewrap ul#summer-drinks li.favorite
  ```
  ID: `#pagewrap`, `#summer-drinks` → **2**
- Classi: `.favorite` → **1**
- Tag: `html`, `body`, `div`, `ul`, `li` → **5**
- quindi sarà `(2,1,5)`
##### PSEUDOCLASSI
- uso `:`
- sono pseudoclassi
    - definiscono lo **stato di un elemento** (non di una classe!)
- esempi:
    - `:hover`
        - elemento quando ci passo sopra col mouse
    - `:visited`
        - link già visitati
    - `:focus`
        - elemento selezionato (es input)
- nel browser (Elements → Styles)
    - posso fare testing delle pseudoclassi
##### PSEUDOELEMENTI
- definiti con `::`
	- selezionano **una parte dell’elemento** oppure aggiungono contenuto
- esempi:
```css
p::first-letter  
p::before  
p::after
```
##### SELETTORE SU ATTRIBUTI
- definito con `[]`
	- seleziona elementi in base agli attributi
- esempi:
```css
[attribute]  
[attribute=value]  
a[target="_blank"]
```
- NON sono vere regex
    - ma posso fare match su:
        - inizio
        - fine
        - contenuto
- a cosa serve:
    - quando uso librerie esterne
    - quando non posso modificare HTML
- tipo TUTTI GLI ATTRIBUTI VERDI...
##### EREDITARIETÀ (DA ESAME)
- alcune proprietà vengono ereditate dai discendenti
- NON vale per tutte:
    - ✅ proprietà del testo
        - color, font, ecc
    - ❌ proprietà di layout
        - border, margin, padding
##### CONFLITTI (DA ESAME)
- se più regole si applicano allo stesso elemento
    - il browser deve scegliere
- criteri:
    - specificità `(id > classe > elemento)`
    - se pari:
        - vince l’ultima regola scritta
##### CASCADE (DA ESAME)
- algoritmo che decide **quale valore di una proprietà applicare** quando più regole si applicano allo stesso elemento
	- combina i valori provenienti da fonti diverse seguendo una cascata come gerarchia di scelta
- **diversi stili classificati:**
	- *stile del browser *
		- `user agent stylesheet `
		- file di stile di default ma non affidabile poiché dipende dal browser
	- *stile dell'autore *
		- quello scritto da noi in `css`
	- *stile dell'utente *
		- quello dell'utente tipo estensione dark mode
- la cascata:
    - gestisce situazioni in cui più regole si applicano allo stesso elemento
    - risolve i conflitti usando:
        - specificità
        - ordine (vince l’ultima)
##### !important
- forza una dichiarazione
```css
color: red !important;
```
- viene applicata sopra le altre regole
- da evitare (usare solo in casi particolari)
##### I FONT
- si dividono in
    - *font specifici*
        - hanno un nome preciso (es. Arial, Times New Roman)
        - funzionano solo se presenti nel sistema
    - *font generici*
        - famiglie generiche (serif, sans-serif, monospace)
        - usati come fallback
- si raggruppano spesso **in famiglie**
    - es: `serif, sans-serif, monospace, cursive, fantasy`
    - monospace → caratteri con stessa larghezza
- i font **dipendono** dal **sistema**
    - funzionano solo se installati sul dispositivo
    - browser e OS diversi → font diversi
si usa una sequenza (font stack)
- il browser prova in ordine
- alla fine dei font è sempre presente una famiglia generica
- esempio
```css
    body {  
    	font-family: Arial, Helvetica, sans-serif;  
    }
```
- importare i font
    - locali → nel progetto
    - esterni → es Google Fonts
    - con `@font-face`
    - formato tipico `.woff`
    - poi usato con `font-family`
```css
      @font-face {  
            font-family:'Roboto';  
            src:url('Roboto-Light-webfont.woff') format('woff');    
        }
```
- `font size:`
    - specifica dimensione testo
    - *relative*
        - `%` → rispetto al valore ereditato
        - `em` → multiplo del font corrente
        - più flessibili
    - *assolute*
        - `px` → valore fisso
- `font-weight` e `font-style`
    - *weight* → spessore (bold, normal)
    - *style* → corsivo o normale
- `font:`
    - shorthand → tutte le proprietà in una riga
    - ordine: style weight size/line-height family
    - esempio
        
```css
        p {  
        	font: italic bold 16px/1.5 Arial, sans-serif;  
        }
```
- i colori
    - `color` → colore testo (ereditato)
    - formati
        - nome
            - `color: red;`
        - esadecimale
            - `color: #336699;`
        - *rgb()*
            - `color: rgb(51, 102, 153);`
        - *rgba()* (con opacità)
            - `color: rgba(51, 102, 153, 0.5);`
- `text align:`
    - allineamento orizzontale
    - valori: left / right / center / justify
    - esempio
        ```css
        p {  
        	text-align: center;  
        }
        ```
- `text decoration:`
    - decorazioni testo
    - valori: none / underline / overline / line-through
    - esempio
        ```css
        a {  
        	text-decoration: none;  
        }
        ```
- `text transform:`
    - cambia maiuscole/minuscole
    - valori: uppercase / lowercase / capitalize
    - esempio
        ```css
        h1 {  
        	text-transform: uppercase;  
        }
        ```
- `text indent:`
    - indentazione primo rigo
    - valori: `px / em / %`
    - esempio
        ```css
        p {  
        	text-indent: 2em;  
        }
        ```
- `text shadow:`
    - ombra testo
    - parametri: offset-x offset-y blur colore
    - esempio
        ```css
        h1 {  
        	text-shadow: 2px 2px 5px gray;  
        }
        ```
#### BOX MODEL(DOMANDA DA ESAME)
- le proprietà CSS si applicano al **box dell'elemento**
    - ogni elemento HTML occupa un rettangolo (box)
    - il box rappresenta **come l'elemento viene renderizzato nella pagina**
- la dimensione del box dipende da più componenti
    - si può visualizzare usando un bordo:
        ```css
        div {  
        	border: 1px solid black;  
        }
        ```
    - si può modificare con `width` e `height`
        - ATTENZIONE:
        - `width` e `height` rappresentano **solo l’area del contenuto**
        - la dimensione reale del box è:
        `dimensione totale = content + padding + border + margin`
- *STRUTTURA DEL BOX*
	- ogni elemento è composto da **4 aree**
	- ogni area ha lati: **top, right, bottom, left**
1. **AREA DEL CONTENUTO (content)**
- è la parte interna dove si trova il contenuto (testo, immagini, ecc.)
- è l’area controllata da:
    - `width`
    - `height`
```css
div {  
	width: 200px;  
	height: 100px;  
}
```
- tutto il resto (padding, border, margin) si aggiunge **intorno**
2. AREA DEL PADDING
- è lo spazio tra contenuto e bordo
- serve a creare **spazio interno**
```css
div {  
	padding: 10px;  
}
```
- proprietà:
    - `padding-top`, `padding-right`, `padding-bottom`, `padding-left`
- shorthand:
	- `padding: top right bottom left;`
3. **AREA DEL BORDER**
- è il bordo che circonda padding + contenuto
- serve sia visivamente che per il layout
```css
div {  
	border: 2px solid black;  
}
```
- proprietà:
    - `border-width`
    - `border-style` → solid, dashed, double…
    - `border-color`
- shorthand:
	- `border: 2px solid red;`
4. **AREA DEL MARGINE (margin)**
- è lo spazio esterno tra elementi
- separa un box dagli altri
```css
div {  
	margin: 20px;  
}
```
- proprietà:
    - `margin-top`, `margin-right`,  `margin-bottom`, `margin-left`
- shorthand:
	- `margin: top right bottom left;`
		- `margin: 10px 20px 10px 20px;`
- tutte queste aree sono visibili nei `DevTools` del browser
    - sezione **Computed / Box Model**
    - utile per debug layout
![[Pasted image 20260401100105.png]]

- *AREA VISIBILE*
	- quando si parla di **area visibile**
	    - si intende **come il browser mostra il box**
	    - cioè la combinazione di:
	        - contenuto, padding, border
		- il margine NON è visibile (è spazio esterno)
- *BOX SIZING*
	- è una proprietà introdotta in **CSS3**
	- permette di controllare **come vengono calcolate le dimensioni del box**
```CSS
box-sizing: content-box | border-box;
```
- *CONTENT-BOX (default)*
- è il comportamento **di default**
- `width` e `height` si riferiscono **solo al contenuto**
	- `dimensione totale = width + padding + border`
- il box **cresce** aggiungendo padding e border
```CSS
div {  
	width: 200px;  
	padding: 20px;  
	border: 5px solid black;  
}
```
➡ larghezza reale = **200 + 40 + 10 = 250px**
- se è presente height sarà sommato anche quello per l'altezza, in questo caso si calcola solo la larghezza
- *BORDER-BOX*
	- `width` e `height` includono:
	    - contenuto
	    - padding
	    - border
	- `dimensione totale = width (rimane fissa)`
- il contenuto si **riduce automaticamente** per far spazio a padding e border
```css
div {  
	box-sizing: border-box;  
	width: 200px;  
	padding: 20px;  
	border: 5px solid black;  
}
```
➡ larghezza totale = **sempre 200px**
- con `content-box` è difficile gestire layout precisi
- con `border-box`:
    - le dimensioni sono **prevedibili**
    - molto usato nei layout responsive
*MARGINI E INLINE*
- gli elementi **inline** (tipo `span` oppure `a`):
    - ignorano `margin-top` e `margin-bottom`
        - funziona solo`margin-left` , `margin-right`
    - elementi **replaced** (ad esempio il tag `img`)
        - accettano anche top e bottom
*COLLASSO DEI MARGINI*
- succede tra margini verticali (top/bottom)
👉 se due margini si incontrano:
viene preso solo il valore maggiore
Esempio:
```css
div1 { margin-bottom: 30px; }  
div2 { margin-top: 20px; }
```
➡ distanza reale = **30px (non 50)**
![[Pasted image 20260331121034.png]]
- i margini possono avere valori negativi
    - l’elemento si **sposta verso l’interno** rispetto alla posizione normale
    - può **sovrapporsi** ad altri elementi
		- uso:
		    - aggiustamenti fini del layout
		    - effetti particolari (overlap)
*OVERFLOW*
- controlla cosa succede quando il contenuto **esce dal box**
👉 NON riguarda solo il padding, ma il contenuto che “sborda”
```css
overflow: visible;  /* default */  
overflow: hidden;  
overflow: scroll;  
overflow: auto;
```
- `visible` (default)
    - il contenuto esce dal box
- `hidden`
    - il contenuto in eccesso viene **tagliato**
- `scroll`
    - barre di scorrimento sempre visibili
- `auto`
    - scroll solo se necessario
##### Background
- permette di controllare lo **sfondo di un elemento**
- si applica al box (contenuto + padding)
*PROPRIETÀ PRINCIPALI*
- `background-color:color`
- `opacity: valore;`
- `background-image: url("img.png");  `
- `background-repeat: repeat|no-repeat|repeat-x|repeat-y;` 
	- controlla se l’immagine si ripete (tiling)
- `background-position: center|top left|50% 50%;`  
- `background-attachment: scroll|fixed;`
	- controlla il comportamento durante lo scroll
	- `fixed` → sfondo fisso mentre la pagina scorre
- `background: url("img.png") no-repeat center fixed;`
	- shorthand del background
#### Flexbox Display
- `display:flex`
    - consente di controllare la distribuzione degli elementi all’interno di un contenitore
    - **introduce un nuovo modello di layout**
        - non si basa più su blocchi/inline o float
        - ma su una gestione “flessibile” dello spazio
    - introduce il concetto di:
        - **container**
            - elemento padre su cui si applica `display:flex`
            - definisce le regole di disposizione
        - **items**
            - elementi figli diretti del container
            - vengono disposti automaticamente secondo le regole del container
    - gli item non sono più gestiti come blocchi normali ma lungo una direzione principale
- si può definire una `flex-direction: row | column`
    - determina come vengono disposti gli item
        - `row` → orizzontale (default)
        - `column` → verticale
- il container ha una struttura basata su assi:
    - **main axis**
        - asse principale lungo cui vengono disposti gli elementi
        - dipende da `flex-direction`
            - `row` → orizzontale
            - `column` → verticale
    - **cross axis**
        - asse perpendicolare al main axis
        - serve per l’allineamento trasversale degli elementi
    - **start / end**
        - indicano l’inizio e la fine degli assi (main-start, main-end, cross-start, cross-end)
	- ![[Pasted image 20260409165710.png|400]]
- `flex-wrap:`
    - `nowrap | wrap | wrap-reverse`
    - permette agli elementi di andare a capo quando non c’è spazio
- data la direzione possiamo usare:
    - `justify-content:`
        - distribuisce gli elementi lungo il **main axis**
			- ![[Pasted image 20260409165206.png|250]]
	-  `align-items`
        - allinea gli item lungo il **cross axis**
        - valori:
            - `flex-start`, `flex-end`, `center`, `stretch`, `baseline`
- proprietà sugli item:
    - `order`
        - permette di cambiare l’ordine degli elementi
        - default = 0
        - valori più piccoli → vengono prima
    - `align-self`
        - permette a un singolo elemento di ignorare `align-items`
        - si posiziona indipendentemente dagli altri
#### LAYOUT DELLE PAGINE
- semplificando, il layout delle pagine rappresenta come i contenuti si distribuiscono nella pagina
- si divide principalmente in:
    - **fluid**
        - la larghezza è proporzionale al viewport (dimensione del browser)
            - si lavora con percentuali
        - **pro**
            - si adatta automaticamente allo schermo evitando spazi vuoti e scrollbar orizzontali
        - **contro**
            - è difficile controllare esattamente il layout e su schermi grandi le righe possono diventare troppo lunghe
    - **fixed**
        - la larghezza non dipende dalla finestra del browser
            - si definisce con i pixel il container
        - **pro**
            - permette un controllo preciso del layout ed è più semplice da progettare
        - **contro**
            - non si adatta agli schermi: su schermi piccoli si taglia, su schermi grandi lascia spazi vuoti
- fluido e fisso riguardano **solo la dimensione del container**
    - il comportamento degli elementi interni dipende da come sono definiti (non è automatico)
#### SITI RESPONSIVE
- cosa vuol dire responsive?
    - è una tecnica che permette al sito di adattarsi automaticamente alla dimensione dello schermo (viewport)
    - insieme di regole che, per ogni viewport, mostrano una visualizzazione ottimizzata per il dispositivo
    - stessi contenuti ma presentati in modo diverso a seconda dello schermo
- interessante sapere:
    - i primi dispositivi mobili (es. iPhone) dichiaravano un viewport di circa **980px**
    - poi ridimensionavano il sito per adattarlo allo schermo reale
- si gestisce con 3 elementi principali:
    - **controllo del viewport**
        - tramite tag `meta` dentro `<head>`
        - es:
            - `<meta name="viewport" content="width=device-width, initial-scale=1">`
        - definisce la larghezza reale della pagina sul dispositivo
    - **media queries**
        - `@media` in CSS permette di definire regole condizionate
        - es:
			```css
			@media (max-width: 768px) {  
				body {  
					background-color: lightblue;  
				}  
			}
			```
            - se lo schermo ha una certa dimensione → applico certe regole
        - si basano su:
            - **media types** (`screen`, `print`, ecc.)
            - **media features** (`width`, `height`, `orientation`, ecc.)
        - le query si possono combinare con `and o or con la virgola`
        - permettono di cambiare layout dinamicamente
        - **breakpoints**
            - sono punti di larghezza in cui il layout cambia
            - definiti nelle media queries
            - servono per adattare il layout ai diversi dispositivi
        - strategie:
            - **mobile first (`min-width`)**
                - parto da schermi piccoli e aggiungo regole per schermi più grandi
                - approccio: _progressive enhancement_
            - **desktop first (`max-width`)**
                - parto da schermi grandi e riduco per quelli piccoli
                - approccio: _graceful degradation_
    - **media fluidi**
        - elementi (es. immagini) che si adattano al container
        - tipicamente:
            - `max-width: 100%`
            - `height: auto`
        - permette ai contenuti di ridimensionarsi senza rompere il layout
chiedi al prof della gerarchia del body

#### VARIABILI IN CSS
- possiamo definire delle **custom properties**
	- si dichiarano in modo globale dentro `:root`
	- sintassi:
	    - `--nome-custom-property: valore;`
	- per usarle:
	    - `var(<custom-property>, <declaration-value>)`
	        - assegna come valore la custom property
	        - se non è definita, usa il _declaration value_ (fallback)
#### Grid system
- sistema a griglia
    - permette di organizzare il layout in modo ordinato
    - si basa sulla **proporzione fra elementi**, soprattutto rispetto alle colonne
        - il sito viene suddiviso in colonne
        - gli elementi vengono posizionati dentro queste colonne per mantenere allineamento e proporzioni
    - è composto da:
        - **colonne** → suddivisione verticale dello spazio
        - **righe (row)** → suddivisione orizzontale
        - **gutter** → spazio tra le colonne
        - **container** → contenitore principale che racchiude la griglia
![[Pasted image 20260414135656.png|400]]
- è una **feature nativa del CSS**
    - permette di creare layout a griglia
    - sistema **bidimensionale** → gestisce **righe + colonne** contemporaneamente
- introduce il concetto di:
    - **grid lines**
        - linee che delimitano le celle della griglia
        - servono per posizionare gli elementi
    - **celle**
        - spazi composti dall’intersezione tra righe e colonne
- `display: grid;`
	- attiva la grid
```css
grid-template-columns: 200px 300px 100px;  
grid-template-rows: auto;
```
- vado a definire:
    - quante colonne ho e la loro dimensione
    - quante righe ho
- posso assegnare gli elementi alla griglia:
``` css
.header {  
    grid-column: 1 / 4;  
}
```
- occupa le colonne dalla 1 alla 4
- spesso si usano le **unità frazionarie (`fr`)**
    - dividono lo spazio disponibile in proporzioni
	- `grid-template-columns: 1fr 2fr 1fr;`
	- `grid-template-columns: repeat(12, 1fr);`
	- utile per creare layout tipo Bootstrap (12 colonne)
- shorthand e casi utili:
    - `grid-column: 1 / -1`
        - prende tutta la riga (fino all’ultima grid line)
    - `grid-column: 1 / 7`
        - occupa una porzione (es. metà su 12 colonne)
- dimensionamento layout:
    - spesso si usa un **container centrato**
```css
width: 1200px;  
margin: auto;
```
- una volta fissata la larghezza:
    - le colonne in `fr` diventano **frazioni di quella larghezza**
- andiamo a definire delle **aree del container**
    - proprietà: `grid-template-areas`
    - utilizzo delle **stringhe** per descrivere il layout della griglia
        - ogni lettera rappresenta un’area
        - il punto `.` rappresenta una cella vuota
- grid-template-areas:  
```css
"h h h h h h h"  
"a a a a a a a"  
"m m m m m . .";
```
- in questo modo:
	 - ogni riga rappresenta una riga della griglia
	  - elementi con lo stesso nome occupano più celle
- poi assegno ogni elemento alla sua area:
```css
.header {  
    grid-area: h;  
}
```
##### I FRAMEWORK
- un **framework** è una libreria che fornisce strumenti già pronti per sviluppare applicazioni
    - include codice riutilizzabile
    - evita di scrivere tutto da zero
- di solito è composto da:
    - **CSS** → layout, stile
    - **JavaScript** → comportamento dinamico
- **Bootstrap**
    - è un **framework CSS (con componenti JS)**
    - è **responsive** e segue un approccio **mobile-first**
    - esiste una versione **minified**
        - più leggera
        - senza spazi/commenti → quella usata in produzione
- **Bootstrap grid**
    - definisce un sistema a griglia con **breakpoint**
        - dimensioni dei dispositivi:
            - `sm, md, lg, xl, xxl`
            - (`xs` nelle versioni più vecchie)
    - uso delle classi:
        - `col-md-12 col-lg-3`
            - su schermi medi → 12 colonne
            - su schermi grandi → 3 colonne
        - sintassi:
            - `col-[breakpoint]-[numero]`
- **uso di Bootstrap**
    - tramite **CDN (Content Delivery Network)**
        - importo il file CSS online (non locale)
    - oppure in locale (scaricando i file)
- concetti base:
    - uso di classi predefinite
    - esiste il **container**
        - contiene la griglia
    - posso fare **override**
        - sovrascrivo gli stili di Bootstrap con CSS personalizzato