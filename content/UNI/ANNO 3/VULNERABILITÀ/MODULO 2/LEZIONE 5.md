#### WEB
- introduzione al modello **client-server**
    - il client (browser) invia una richiesta
    - il server la elabora e restituisce una risposta
- tipicamente: **1 server → più client**
- Regole importanti per sviluppo web
	- **non fidarti mai del client**
	- tutto ciò che arriva dal client può essere modificato
	- validazioni e controlli vanno fatti **lato server**
##### PROTOCOLLO HTTP
- protocollo applicativo usato per la comunicazione web
- funziona tramite richieste e risposte (es. **GET, POST**)
- HTTP/1.1 è **stateless**
    - ogni richiesta è indipendente dalle altre
    - per mantenere lo stato si usano i **cookie**
        - permettono di identificare l’utente tra richieste diverse
- esecuzione del codice:
    - **PHP → lato server**
    - **JavaScript → lato client** _(anche se oggi può essere anche lato server, ma qui restiamo base)_
#### Enumeration WEB
fase in cui si raccolgono informazioni su un'applicazione web
- i codici di errore HTTP 
	- fondamentali durante l’enumeration perché danno informazioni sul comportamento del server

| **Codice**              | **Descrizione**                                                                  |
| ----------------------- | -------------------------------------------------------------------------------- |
| **1xx** (Informational) | Messaggi informativi, raramente usati.                                           |
| **2xx** (Success)       | La richiesta è andata a buon fine.                                               |
| **3xx** (Redirect)      | Il client deve fare un’altra richiesta perché la risorsa si è spostata.          |
| **4xx** (Client Error)  | La richiesta contiene un errore (es. risorsa non trovata, richiesta non valida). |
| **5xx** (Server Error)  | Errore lato server, il server non ha potuto soddisfare la richiesta.             |
- **403 Forbidden → la risorsa esiste ma non puoi accedervi**
- **404 Not Found → probabilmente non esiste**
##### robots.txt
- file accessibile via HTTP (`/robots.txt`)
- contiene istruzioni per i crawler su cosa NON visitare
- punto importante:
    - può rivelare directory nascoste
    - quindi è utile in fase di enumeration
#### Virtual Hosts
- più siti web possono stare sullo stesso IP
- il server decide quale mostrare in base all’header:
    - `Host:`
- modificando questo valore possiamo:
    - scoprire altri siti/applicazioni sullo stesso server
- Il livello applicativo viene gestito dalla web app
- i livelli sottostanti sono gestiti dal OS
- più applicazioni web sulla stessa porta si differenziano dall'HOST
- tool per usare wordlist delle virtual host `wfuzz`
- usi FUZZ come wildcard
	- `wfuzz -w ./subdomains-top1million-5000.txt -u http://192.168.14.132 -H "HOST: FUZZ.cloud.vdsi" `

![[Pasted image 20260423100404.png|400]]

##### ESERCITAZIONE WEB ENUMERATION
##### Analisi base
- **Inspect (browser)** → analisi frontend
- **curl** → scaricare e analizzare contenuti da terminale
##### Burp Suite
- tool fondamentale per il web testing
- funziona come **proxy**
    - si mette tra browser e server
    - intercetta tutte le richieste HTTP
 Permette di:
- leggere richieste e risposte
- modificarle
- reinviare (repeater)
Configurazione
- usare **FoxyProxy** nel browser
- configurare il proxy di Burp
- importare il certificato di Burp nel browser
    - serve per intercettare traffico HTTPS
###### Note utili
- conoscere la **versione del server** può aiutare a:
    - trovare vulnerabilità note (CVE)
- database utile:
    - [https://www.exploit-db.com/](https://www.exploit-db.com/)
##### Gobuster
- `Gobuster` è un tool di **content discovery**
    - prova migliaia di nomi di cartelle/file in pochi secondi usando una **wordlist**
    - serve per scoprire directory, file nascosti, backup, pannelli di login ecc.
- **Wordlist**
    - lista di parole che Gobuster prova nel target
    - esempio:
```
/usr/share/wordlists/seclists/Discovery/Web-Content/big.txt
```
- **Content length**
    - utile per escludere risposte sempre uguali
    - se un URL non esiste, a volte il server reindirizza sempre a `index.html`
    - in quel caso le risposte false hanno tutte la stessa dimensione
    - possiamo escluderle con `--exclude-length`
```
gobuster dir -u http://cloud.vdsi/archive --proxy http://127.0.0.1:8080 -w /usr/share/wordlists/seclists/Discovery/Web-Content/big.txt --exclude-length 4829
```
- `--exclude-length 4829`
    - ignora tutte le risposte lunghe `4829` byte
    - utile per eliminare falsi positivi
- `-x`
    - aggiunge estensioni ai nomi della wordlist
    - esempio:
```
-x php,txt,html,bak
```
- **Modalità `vhost`**
    - utile per fare **virtual host enumeration**
    - prova possibili sottodomini/host nascosti
    - esempio: `admin.sito.com`, `dev.sito.com`, `test.sito.com`
- **Host discovery / virtual host enumeration**
    - serve a scoprire host o sottodomini non visibili direttamente
    - Gobuster è molto utile soprattutto in modalità `vhost`
- **Alternativa**
```
feroxbuster -u http://TARGET_IP -w /usr/share/seclists/Discovery/Web-Content/common.txt
```
- **Altro tool simile**
    - `ffuf`
    - usato per fuzzing di path, parametri, header e virtual host
