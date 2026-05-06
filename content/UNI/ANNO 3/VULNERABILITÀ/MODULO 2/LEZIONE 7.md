###### 🌐 HTTP recap (veloce)
1. Richiesta iniziale
```
GET /index.html HTTP/1.1
```
 il browser chiede una pagina
2. Login (POST)
```
POST login.phpusername=abc&password=def
```
 qui succede la cosa importante:
- i dati vengono mandati **al server**
- il server esegue codice (PHP)
3. Risposta con sessione
```
Set-Cookie: SessionId=87325
```
 il server:
- autentica
- crea una sessione
- salva un cookie nel browser
4. Richieste successive
```
GET /list.php?id=3Cookie: SessionId=87325
```
 il browser manda il cookie → il server sa chi sei

- PHP / Python / Java girano **sul server**
- il client vede solo HTML/JS finale

##### 🎯 Modelli di attacco
In ambito web, possiamo distinguere **due principali modelli di attacco**:
- **server-side attacks**  
- **client-side attacks**
Questa distinzione è fondamentale perché cambia completamente:
- il **target dell’attacco**
- il **tipo di vulnerabilità**
- il **modo in cui viene sfruttata**
###### 1. Server-Side Attacks
Nel modello **server-side**, abbiamo:
**un client malevolo che attacca il server**
Come mostrato nella slide, il flusso è:
- l’attaccante invia una richiesta HTTP
- il server la elabora
- l’attacco avviene durante l’elaborazione lato server
 l’attacco consiste nel far eseguire al server:
- codice non previsto
- operazioni non autorizzate
Principali tipologie
- **Injection**
    - es: SQL Injection, Command Injection
    - l’input utente viene interpretato come codice
- **File System Traversal**
    - accesso a file sensibili (es: `/etc/passwd`)
- **Broken Access Control**
    - accesso a risorse senza permessi
Esempi:
- estrai dati dal database
- leggi file del sistema
- esegui comandi sul server
###### 2. Server-side in applicazioni multi-server
In sistemi più complessi (es. login con Google, pagamenti online):
l’attacco non è su un solo server, ma su **più server che comunicano tra loro**
Esempi
- autenticarsi come un altro utente (SSO)
- effettuare operazioni senza pagarle
Concetto chiave
👉 l’attacco sfrutta:  
**la fiducia tra sistemi diversi**
###### 3. Client-Side Attacks
Nel modello **client-side**, invece:
 **un utente malevolo attacca altri utenti**
Non attacca direttamente il server
- il server rimane “vittima indiretta”
- l’attacco avviene nel **browser della vittima**
 Principali tipologie
- **Cross-Site Scripting (XSS)**
    - inietti JavaScript nella pagina
- **Cross-Site Request Forgery (CSRF)**
    - fai eseguire azioni all’utente senza che lo sappia
- **Remote Script Inclusion**
    - carichi script malevoli
#####  🛡 OWASP Top 10 (recap)
![[Pasted image 20260430125943.png]]

La OWASP Top 10 è un documento standard di sensibilizzazione per sviluppatori e esperti di sicurezza delle applicazioni web. Rappresenta un ampio consenso sui rischi per la sicurezza più critici delle applicazioni web.

##### 🐘 PHP
*PHP (Hypertext Preprocessor)* è un linguaggio di scripting utilizzato nelle web application.
La caratteristica principale è:
- il codice viene **eseguito lato server**
- il risultato dell’esecuzione è **HTML** inviato al client
##### Funzioni pericolose
Due funzioni molto importanti (e pericolose):
######  include()
```
include("file.php");
```
cosa fa:
- include un file
- lo **esegue come codice PHP** in automatico come import in Python
######  eval()
```
eval("codice");
```
cosa fa:
- prende una stringa
- la esegue come codice PHP
#### 🌐 Parametri HTTP in PHP
PHP permette di accedere ai dati dell’utente tramite variabili globali.

###### $_GET
- prende i dati dall’URL
- i dati parametro dell'URL sono in un dizionario della get
Esempio:
```
index.php?id=3
```
###### $_POST
- prende i dati dal body della richiesta
tipico nei form
- prende i dati dal body della richiesta
###### $_REQUEST
- combina tutti i dizionari del caso
 contiene:
- $_GET
- $_POST
- $_COOKIE
⚠️ Nota importante

usando `$_REQUEST`:
- **non sai da dove arriva il dato**
- aumenti la superficie di attacco
###### PHP FILE INCLUSION
- quando ho una include()
	- che dipende dall'input utente che non è stato sanitization propriamente
	- a slide 20 e 21 ci sono esempi di `"sanitizzazione"` dell'input 
	- slide 22 bho
- si divide in 2 tipologie
	- LFI
		- di tipo locale, posso includere un file locale presente sulla macchina Linux
		- www-data, nome utente tipico che gestisce il server web
		- ci consente di vedere l'esecuzione(se file php) oppure la sorgente(per file non php) in caso di file locali(permessi permettendo)
			- a slide 19 abbiamo un esempio
		- se ho un LFI come posso vedere il sorgente di file php?
			- Log Poisoning
				- 
	- RFI
		- inclusione remota tramite URL ma solo se in php.ini è presente `allow_url_include` a true
		- utile per inserire web shell o remote shell
		- di default è disabilitato
#### PHP WRAPPER
slide 31
#### WordPress
- i plugin di wordpress potrebbero avere varie vulnerabilità
- eseguo e uso wpscan, ritorna le possibili vulnerabilità di un sito che usa framework wordpress
##### SKIP da 36 a 44
#### Server Side Request Forgery
- NON RIGUARDA PIÙ LE TECNICHE DI INJECTION MA LO AGGIUNGO QUI
- accedo a pagine non a nome mio ma a nome del web server
	- ad esempio richieste a URL che solo quel web server può accedere
- foto a slide 47 e 48
- ci sono poi 3 esempi
- idea: fare port scanning, accedere a dati sensibili o servizi interni

###### ESERCITAZIONE DVWA
cerco nell'URL input dei parametri dell'utente e provo a fare LFI
- LFI cerca nel file system dell'utente quindi se cerco /etc/passwd me lo trova
	- quindi se ho `?page=path`
	- posso sostituire path
	- se ho un certo blocco per determinati file, posso mettere innumerevoli ../ finché non raggiungo il  root e poi il path necessario 
	- se viene anche bloccato questo posso mettere `?page=file:///etc/passwd`
		- ovvero ricerca dell'URL locale
		- utilizzi il protocollo di accesso dei file locali
- SE NON FUNZIONA BURP 
	- network.proxy.allow_hijacking_localhost -> true dentro about::conf
- ESERCIZIO PHP WRAPPER
	- creiamo un file php da revshell
	- lo uplodiamo nella macchina
	- lo eseguiamo da include nel parametro page
	- la rev shell magari funziona se non funziona prova un altro comando
	- la più stabile credo sia la `proc_open`
	- gli altri eseguono il comando nel web server e il processo shell muore subito
	- così apre il nuovo processo

- cosa fare se non si ha file upload?
	- esistono file.log e access.log
		- spiega a cosa servono
		- presenti dentro /var/log/nomeserver
		- LO VEDIAMO DOPO

