##### STILE PER LE LISTE
- proprietà CSS: `list-style-type`, `list-style-image`, `list-style-position`
    - servono per modificare l’aspetto delle liste
    - in particolare permettono di definire:
        - il tipo di marcatore
        - un’eventuale immagine come marcatore
        - la posizione del marcatore rispetto al contenuto
##### USO DEI LINK
- con l’attributo `href` posso collegarmi a:
    - altre pagine
    - risorse esterne
    - un punto specifico della stessa pagina
- per collegarmi a un elemento della stessa pagina uso il suo `id`
- in `href` posso anche specificare protocolli particolari, ad esempio:
    - `mailto:` per aprire il client di posta
    - `tel:` per avviare una chiamata da dispositivi che lo supportano
##### RESET.CSS
- `reset.css` è un file CSS usato per azzerare o uniformare gli stili di default applicati dal browser
    - questi stili di default sono detti **user agent stylesheet**
- l’obiettivo è partire da una base più controllabile e coerente tra browser diversi
- storicamente si usava molto per “resettare” margini, padding e altri valori automatici
- oggi si usa meno nella forma classica, perché spesso si preferiscono:
    - reset più moderni
    - normalizzazioni
    - stylesheet di base personalizzati
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
![[Pasted image 20260402141242.png|400]]
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