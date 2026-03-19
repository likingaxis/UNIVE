### CSS
- standard del W3C
- il css definisce la presentazione del documento HTML
- CSS consente di dividere il contenuto(HTML) dalla resa visiva(CSS)
- css può essere definito come
	- external style sheet
		- file esterno da associare nella head con 
		- `<link rel="stylesheet" type="text/css" href="mystyle.css">`
	- internal style element
		- usando i tag 
			- `<style>...</style>`
	- inline
		- scrivendo negli elementi
			- usando l'attributo `style=`
			- `<h1 style="color:red"> This is a Heading</h1>`
		- utilizzo: scrittura regole in javascript
			- non ho capito
		- in alcuni casi: combattere con regole
- com'è fatto
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
	- crea una sorta di gruppo per quel determinato elemento
	- posso fare più classi con una sorta di and
		- mettendole con lo spazio
	- gestione dei conflitti:
		- 
- in css posso fare `tag.classe` per specificare quei tag con quella classe
- oppure .classe per prendere TUTTI i tag di quella classe
- parametro `id`
	- da assegnare a un solo elemento della pagina
	- uso `#` in css per riprendere un certo id
		- si suggerisce di usarlo solo per un elemento per evitare problemi
#### Esercizio a slide 13?

##### PARTE WEB GENERALE
##### SELETTORI WEB DOM
- albero con
	- elemento 1
	- 2 
	- ecc
- selettori composti
	- descendant metto spazio
		- tutti i paragrafi dentro quell' elemento
	- child maggiore >
		- solo i figli diretti
	- Adjacent sibling +
		- solo il primo elemento successivo a quello definito
	- General sibling tilde
		- borg
esempio con section

foto albero
	main p modifica pure em?

#### TIPI DI SELETTORI
- tipo 1
- tipo 2
- tipo 3
ecc...
##### SPECIFICITÀ DI UN SELETTORE (DA ESAME)
- è la forza contro cui combatte contro altri selettori
- regola di un determinato selettore
- come va calcolata la specificità di un selettore
- definita una lista con 4 flag `[a,b,c,d]`
	- a= dichiarazione inline
	- b= numero di selettori id
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
