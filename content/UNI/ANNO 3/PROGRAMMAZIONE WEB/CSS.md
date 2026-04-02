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
- `<div>` è un elemento generico di tipo blocco
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
