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
### TAG html da ricordare
- **`<html>`**  
    tag radice che contiene tutta la pagina.
- **`<head>`**  
    contiene **metadati** della pagina (titolo, meta, link a CSS).
- **`<meta>`**  
    tag per **informazioni sulla pagina** (charset, viewport ecc).  
    È un **void element**, quindi **non ha tag di chiusura**.
- **`<title>`**  
    definisce il **titolo della pagina** mostrato nella scheda del browser.
- **`<body>`**  
    contiene **tutto il contenuto visibile della pagina**.
- **`<h1>`**  
    intestazione principale della pagina (heading).
