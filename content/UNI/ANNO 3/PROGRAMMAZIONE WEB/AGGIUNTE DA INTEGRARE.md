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