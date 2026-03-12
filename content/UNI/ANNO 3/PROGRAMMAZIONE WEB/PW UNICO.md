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
### HTML
- a cosa serve e cosa è
	- html è un linguaggio di markdown che...
- funziona attraverso elementi
	- cosa sono?
- i tag sono ...
- i tag si dividono in 2 tipi
	- void element 
	- e not void element
- sono anche di 2 tipi
	- block element
		- se vanno a capo
	- inline element
		- se non ci vanno
- il browser considera solo uno spazio, gli a capo li rimuove per questo servono i br
- caratteri Unicode al posto di ascii
	- hanno sequenze di escape
		- cosa sono?
- html è composto da head e body
	- head tutte informazioni per il browser
	- body parte visibili della pagina
		- viewport
- l'albero degli elementi di html è
	- .... slide 72
	- è importante che ci sia questo albero per motivi di utilizzo javascript e css
	- per raccogliere alcune specifiche in determinati gruppi dell'albero
- Markup semantico di HTML5
	- ogni volta che uso tag di un elemento voglio dare un significato e strutturare
	- noi vogliamo comunicare al browser il significato dei tag, scegliendone i più opportuni
	- prima di html5 non tutti i tag avevano un significato? ora si apparte div e span?
#### TAG html da ricordare
i tag si dividono in 2 tipi
- void element
- **`<meta>`**  
    tag per **informazioni sulla pagina** (charset, viewport ecc).  
    È un **void element**, quindi **non ha tag di chiusura**.
- **`<img>`**
- **`<!doctype>`**
- **`<main>`** 
- non void element
- **`<html>`**  
    tag radice che contiene tutta la pagina.
- **`<head>`**  
    contiene **metadati** della pagina (titolo, meta, link a CSS).
- **`<title>`**  
    definisce il **titolo della pagina** mostrato nella scheda del browser.
- **`<body>`**  
    contiene **tutto il contenuto visibile della pagina**.
- **`<h1>`**  
    intestazione principale della pagina (heading).
    può andare da 1 a 6
di dividono a loro volta in text e non text level semantic tag
- elenco a slide 30
	- a, strong ,span, br
- comandi da posizionare adeguatamente e fatti
	- header 
	- footer
	- section
	- figure
	- ol
		- ordered list
		- dentro ha li
	- ul unordered list
		- li elemento dell'elenco puntato
	- blockquote
	- dl
	- dt
	- dd
	- figure
	- div
	- span
	- p
	- nav
	- a
		- sta per ancora
		- href
	- hr in html5 ha subito un cambiamento con un suo significato
