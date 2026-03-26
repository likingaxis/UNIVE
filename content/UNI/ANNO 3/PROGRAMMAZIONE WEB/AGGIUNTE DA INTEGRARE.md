##### I FONT
- si dividono in 
	- Font specifici
		- spiegazione
	- Font generici
		- spiegazione
- si raggruppano spesso in famiglie
	- tipo Monospace
- i font dipendono dal sistema, ne scriviamo una sequenza perché ne prova una serie
	- a seconda delle disponibilità del computer
	- alla fine è presente un generico della famiglia
- importare i font da un server esterno
	- è possibile con `@font-face`
	- e viene fornito un `.woff` file
	- ```css
	  @font-face {
		  font-family:'Roboto';
		  src:url('Roboto-Light-webfont.woff')format('woff');  
		 }
	  ```
	- poi viene usato normalmente
- font size
	- relative
		- prende il font di base e ne aumenta la dimensione in %
			- in base all'eredità o alla definizione precedente
		- con la % 
		- ed `em` è il font di base
	- assolute
		- tipo i pixel
- `font weight` e `font style`
	- bold non bold style corsivo non corsivo
- `font:` inline ci permette di mettere tutte le proprietà inline
- i colori
	- color colore preciso
	- rgb in decimale
	- argb con opacità
- text align
	- commento
- text decoration
	- togliere il sottolineato
- text transform
	- trasforma maiusc minusc ecc
- text indent
	- indent
- text shadow
	- ombra del testo
- 