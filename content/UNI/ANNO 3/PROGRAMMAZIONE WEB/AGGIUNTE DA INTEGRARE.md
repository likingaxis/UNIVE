#### VARIABILI IN CSS
- possiamo definire custom properties 
	- si dichiarano in modo globale da :root
	- con `--nome custom property:valore`
	- `var(<custom-property>,<declaration-value>)`
		- assegna come valore la custom property, oppure se non rilevata si usa il declaration value
#### Grid system
- sistema a griglia 
	- proporzione fra elementi in termini di dimensione di colonne 
		- suddivide il sito in colonne consentendo agli elementi di essere suddivisi per colonne per dare una giusta proporzione 
	- composta in colonna, gutter, container, riga
##### I FRAMEWORK 
- definizione di framework
- di solito si dividono in 2 parti, css e javascript
- sappi che anche i flexbox lo erano, forse non lo avevi specificato
- un esempio è il CSS grid
	- introduce il concetto di grid lines, sistema a 2 dimensioni che alloca elementi alle grid lines
	- spazi composti da righe e colonne 
	- foto delle grid
	- andando a specificare 
```css
display: grid;

                grid-template-columns: 200px 300px 100px;

                grid-template-rows: auto;
```
- vado a definire le colonne e le righe della nostra griglia
- possiamo poi assegnare ad ogni colonna o riga un determinato elemento
```css
            .header {

                grid-column: 1 / 4;

            }
```
- spesso però si lavora con i template a frazioni 1fr
- posso definire posso avere repeat 12,1fr
- posso fare grid column 1/-1 prende l'ultima grid lines
- posso fare 1/7 per dire una porzione di 6 colonne
- lo vado a fissare con width definito e margin auto
- una volta fissata la larghezza le colonne degli elementi saranno frazioni della larghezza definita
	- fare un esempio con menu e header
	- vedi file del prof aggiornato, utile per capire il cambiamento tra le cose e anche slide 27
	- `grid-gap`
		- spazio tra colonne
- andiamo a definire delle aree del container
	- `grid-template-areas`
	- utilizzo delle stringhe per dire dove sono posizionate le varie posizioni
```css
h h h h h h h
a a a a a a a
m m m m m . . 
```
- e poi dico a quel determinato elemento chi è con 
	- `grid-area:h`
- bootstrap
	- framework responsive mobile first
	- esiste una versione minimized di bootstrap, quella che usiamo davvero
	- bootstrap grid definisce i breakpoint per la dimensione dei dispositivi
		- divisi in `xs, sm, md, lg, xl, xxl`
		- usiamo le classi per definire un elemento in base a una certa dimensione
		- vedi `col-md-12 col-lg-3`
		- `col-|sm-|md-|lg-|xl-|xxl-`
	- uso CDN, content delivery network per definire il file css di bootstrap, non in memoria
		- si può anche fare dalla memoria
	- dobbiamo usare le classi di bootstrap
	- esiste container
	- posso fare l'override con uno style interno delle regole che già esistono