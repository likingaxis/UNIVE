#### Stile per liste
- `list-style-type|image|position`
	- modificano il tipo l'immagine o la posizione delle liste
##### Uso di link
- possibilità di ricondursi con href a id di determinati elementi
- specifica del protocollo in href con `tel:` o `mailto:`
#### reset.css
- file css che ci garantisce che il sito sia resettato senza avere regole css del browser(user agent stylesheet), resettandole
	- codice reset.css
	- si usava una volta
#### Posizione degli elementi
- gli elementi hanno una posizione di default
	- o inline o blocco
	- posso modificarlo con css con `display:inline`
- gli elementi hanno una proprietà position
	- indica il posizionamento degli elementi all'interno della pagina
	- `position:static|relative|absolute|fixed`
		- static è quella normale
		- relative è relativa alla posizione originale static
			- quindi se metto `left:80px` si sposta a destra di 80px
		- absolute prende il primo elemento antenato che non ha una position static
			- se non trova nulla si posiziona rispetto al body
		- fixed rispetto al viewport
- foto slide 6
- gestire sovrapposizioni con `z-index:numer|auto|inherit`
	- consente di gestire la profondità
- gioco con display none e display block per far apparire le cose con pseudoclasse `:hover`
- `float:|left|right`
	- usato per far girare il testo attorno a quel determinato elemento
	- in alto a dx o sx rispetto al contenitore
	- i float possono invadere altri elementi
	- non occupano spazio
	- questi elementi possono invadere altri elementi successivi a quelli dopo il contenitore
	- si deve usare `clear:left|right` per chiudere il float
div elemento generico di tipo blocco