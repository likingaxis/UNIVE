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
La **File Inclusion** si verifica quando una web application PHP usa una funzione come `include()` o `require()` per includere un file, ma il nome del file dipende da un input controllabile dall’utente

```php
$file = $_REQUEST["file"];
include($file . ".php");
```
In questo caso l’utente può controllare il valore di `$file`, quindi può provare a far includere file diversi da quelli previsti dall'applicazione.

La vulnerabilità è tipicamente causata da una **sanitizzazione insufficiente dell’input utente**. Anche quando il codice prova a filtrare alcuni caratteri pericolosi, la protezione può essere incompleta.
Ad esempio, una possibile “protezione” consiste nel rimuovere `../` per impedire il directory traversal:
```
$file = str_replace("../", "", $_GET["file"]);include($file . ".php");
```
Questa però non è una protezione solida, perché può essere aggirata usando tecniche di bypass, come l’encoding dei caratteri nell’URL.
Per esempio `/` può essere scritto come `%2F`, quindi un percorso come:
`../../../../etc/passwd`
può diventare:
`..%2F..%2F..%2F..%2Fetc%2Fpasswd`

- si divide in 2 tipologie
	- LFI
	- La **LFI** si verifica quando l’applicazione include un file presente **localmente** sul file system del server.  
	- In pratica, tramite un parametro controllabile dall’utente, posso provare a far includere file presenti sulla macchina Linux che ospita la web application.
	- Bisogna però ricordare che l’accesso ai file dipende dai permessi dell’utente con cui gira il web server. Spesso questo utente è `www-data`, cioè l’utente tipico usato da Apache/Nginx per eseguire il servizio web.
		- se includo un file **non PHP**, posso leggerne il contenuto;
		- se includo un file **PHP**, normalmente non vedo il sorgente, perché il file viene eseguito dal motore PHP e ottengo l'output
	- Una LFI può anche essere usata per arrivare a eseguire codice, ma serve un modo per far finire codice PHP dentro un file che poi verrà incluso.
		- Una tecnica è il **Log Poisoning**.
			- L’idea alla base prevede 
				- l'invio tramite una richiesta HTTP con dentro il codice PHP
				- far salvare la richiesta nel file log del web browser
				- includere il file log con LFI
				- vedere il codice PHP eseguito
	- RFI
		- inclusione remota tramite URL ma solo se in php.ini è presente `allow_url_include` a true
		- utile per inserire web shell o remote shell
		- di default è disabilitato
#### PHP WRAPPER
I **PHP Wrapper** sono dei meccanismi messi a disposizione da PHP per accedere a diverse risorse usando una sintassi simile a un protocollo, ad esempio `php://`, `file://`, `data://`
- Nel contesto della **Local File Inclusion**, i wrapper possono essere sfruttati per leggere file in modi particolari oppure, in alcuni casi, per eseguire codice
- Un caso molto importante è il wrapper:
	- `php://filter` 
		- serve a **leggere un file esistente applicando un filtro prima che PHP lo interpreti**
	- `php://filter/read=convert.base64-encode/resource=config`
		- In questo caso PHP legge la risorsa `config`, ma prima di restituirla la converte in **Base64**.
		- Una volta ottenuto l’output in Base64, basta decodificarlo per ricostruire il sorgente originale del file PHP.
	- `data://text/plain;base64,PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7Pz4=`
	- serve per **iniettare direttamente del contenuto**, per esempio codice PHP codificato in Base64, senza dover caricare un file sul server.
#### WordPress
- i plugin di Wordpress potrebbero avere varie vulnerabilità
- eseguo e uso wpscan, ritorna le possibili vulnerabilità di un sito che usa framework wordpress
#### Server Side Request Forgery
La **Server Side Request Forgery (SSRF)** è una vulnerabilità in cui una web application effettua una richiesta verso una risorsa remota usando un URL fornito dall’utente, senza validarlo correttamente.  
- Non riguarda più direttamente le tecniche di **Injection**, però viene trattata qui perché è comunque una vulnerabilità lato server.  
L’idea principale è che l’attaccante non accede direttamente a una certa risorsa, ma costringe il **web server** a fare la richiesta al posto suo.  
In altre parole:  
- non sono io attaccante a fare direttamente la richiesta,  
- ma faccio fare la richiesta al server vulnerabile
- idea: fare port scanning, accedere a dati sensibili o servizi interni
ESEMPIO
Un esempio semplice è una funzione che prende un URL dall’utente e lo scarica:
```
@app.route("/fetch1", methods=["POST"])
def fetch1():    
	url = request.form.get("url")    
	r = requests.get(url, timeout=3)
```
Qui non viene fatto nessun controllo sull'URL fornito dall’utente.
potrei accedere a 
`http://127.0.0.1:8080/admin`
![[Pasted image 20260506174823.png|400]]
![[Pasted image 20260506174835.png|400]]

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
	- esistono access.log o file-generico.log
		- I file di log servono a registrare gli eventi del server. 
			- Nel caso del web server, l’`access.log` registra le richieste HTTP ricevute.
		- presenti dentro /var/log/nomeserver
		- LO VEDIAMO DOPO

