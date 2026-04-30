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
- lo **esegue come codice PHP**
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
Esempio:
```
index.php?id=3
```
###### $_POST
- prende i dati dal body della richiesta
tipico nei form
- prende i dati dal body della richiesta
###### $_REQUEST
 contiene:
- $_GET
- $_POST
- $_COOKIE
⚠️ Nota importante

usando `$_REQUEST`:
- **non sai da dove arriva il dato**
- aumenti la superficie di attacco

