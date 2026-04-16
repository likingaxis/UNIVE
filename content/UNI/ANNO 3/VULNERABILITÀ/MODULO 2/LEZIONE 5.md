## WEB
- breve introduzione su cosa è
##### PROTOCOLLO HTTP
- protocollo applicativo che funziona attraverso operazioni di GET e POST
- in versione 1.1 protocollo stateless, ogni richiesta è indipendente dall'altra
	- meccanismo dei cookie da un identificativo tra browser e client per consentire uno scambio di dati per quel determinato utente
- PHP viene eseguito solo sul server JAVASCRIPT solo sul client

##### Regole importanti per sviluppo web
- non fidarti mai del client
#### Enumeration WEB
- i codici di errore HTTP 
	- utili per scansioni web

| **Codice**              | **Descrizione**                                                                  |
| ----------------------- | -------------------------------------------------------------------------------- |
| **1xx** (Informational) | Messaggi informativi, raramente usati.                                           |
| **2xx** (Success)       | La richiesta è andata a buon fine.                                               |
| **3xx** (Redirect)      | Il client deve fare un’altra richiesta perché la risorsa si è spostata.          |
| **4xx** (Client Error)  | La richiesta contiene un errore (es. risorsa non trovata, richiesta non valida). |
| **5xx** (Server Error)  | Errore lato server, il server non ha potuto soddisfare la richiesta.             |
negli applicativi web esiste un file che si chiama robots.txt
- è un file accedibile solo tramite query http e non attraverso crawler web
###### Virtual hosts
- il parametro host modificato mi consente di cambiare l'indirizzamento a una pagina web
	- in base al valore di host vado su diverse applicazioni web
	- nella richiesta http possiamo vedere dentro `host:` per indirizzare il virtual host

##### ESERCITAZIONE WEB ENUMERATION
- si può analizzare il sito con inspect, analisi del sito curl per scaricare parti
- poi si può passare a usare burp suite
	- permette di analizzare richieste e risposte
	- funziona con un meccanismo di proxy, si pone come intermediario e analizza i vari dati
	- dobbiamo configurare il proxy con foxy-proxy
	- importiamo il certificato per accedere in rete
	- il certificato è una firma di autenticazione 
	- sapere la versione del server può portare a sapere determinate CVE
	- determinate vulnerabilità
	- https://www.exploit-db.com/

