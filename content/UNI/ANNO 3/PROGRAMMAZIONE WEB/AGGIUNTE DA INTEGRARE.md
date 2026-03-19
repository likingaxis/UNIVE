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
###### SPECIFICITÀ IN CSS
- in css posso fare `tag.classe` per specificare quei tag con quella classe
- oppure `.classe` per prendere TUTTI i tag di quella classe
- parametro `id`
	- da assegnare a un solo elemento della pagina
	- uso `#` in css per selezionarlo
		- si suggerisce di usarlo solo per un elemento per evitare problemi
##### PARTE WEB GENERALE
##### SELETTORI WEB DOM
- HTML è visto come un **albero**
    - parent (genitore)
    - child (figlio)
    - sibling (fratelli)
    - ancestor (antenati)
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
- foto albero
![[Pasted image 20260319152110.png|400]]
#### TIPI DI SELETTORI
- **selettore di elemento**
    - es:
	    `p { ... }`
- **selettore di classe**
    - es:
	    `.classe { ... }`
- **selettore id**
    - es:
	    `#id { ... }`
- **selettori composti**
    - es:
	    ```
	    div p  
	    div > p  
	    h2 + p
	    ```
- **selettori attributo**
    - es:
	    `[attribute]  `
	    `[attribute=value]`
- **pseudoclassi**
    - es:
	    `:hover`  
	    `:visited`  
	    `:nth-child()`
- **pseudoelementi**
    - es:
	    `::before`  
	    `::after`
##### PECIFICITÀ DI UN SELETTORE (DA ESAME)
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
FINISCI DA QUA
##### PSEUDOCLASSI
uso vicino al CSS i `:`
- sono pseudoclassi
	- definizione di pseudolasse ricordando che precisa lo stato di una classe
- tipo `:hover`
	- pseudoclasse che definisce un elemento che viene preso dal mouse
- tipo `:visited`
	- per i link visitati
- NEL BROWSER SU ELEMENTS -> STYLES
	- è possibile fare testing sulle pseudoclassi

##### PSEUDOELEMENTI
- definito con `::`
- definizione breve

##### SELETTORE SU ATTRIBUTI
- definito con `[]`
	- seleziona un determinato attributo
	- si possono usare le regular expression
	- definizione rapida
	- a cosa serve?
		- se usi una libreria di qualcun'altro

##### EREDITARIETÀ(DA ESAME)
- le regole si applicano a tutti gli elementi dei discendenti
	- MA NON VALE CON TUTTE LE REGOLE
		- tutte quelle dei caratteri di solito sono passate
		- quindi tipo font color ecc
		- quelle relative al blocco di solito non vengono applicate, tipo i bordi o cose così
##### CONFLITTI(DA ESAME)
- se più regole si applicano allo stesso elemento
	- il browser deve scegliere quale applicare
	- di solito id ha più priorità
	- se sono a parità di forza vale l'ultima (peffozza
##### CASCADE (DA ESAME)
- Cascade, algoritmo che definisce come combinare i valori di proprietà provenienti da fonti diverse
- di default dai browser esiste user agent stylesheet
	- file di stile di default ma non affidabile poiché dipende dal browser
- diversi stili classificati:
	- stile del browser
		- user agent ecc
	- stile dell'autore
		- quello scritto da noi
	- stile dell'utente
		- quello dell'utente tipo estensione dark mode
- la cascata crea collisioni che vanno risolte
-  il valore !important va a scrivere la dichiarazione su un file che va applicato dopo
