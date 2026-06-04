##### API JSON
- application program interface, che vede con il REST come stile architetturale che consente una costruzione di API web usando HTTP
- endpoint indentifica la risorsa nel web mediante URL
REST OPERATIONS consentono URL operations più esplicite e semplici
vedi slide 7
##### CRUD
sta per create read update delete
sono le operazioni di base che possiamo fare sulle risorse
##### STATUS CODE 
a slide 13
ma ricordiamo comunque che

500 di solito quando il database non risponde e viene staccato

| **Codice**              | **Descrizione**                                                                  |
| ----------------------- | -------------------------------------------------------------------------------- |
| **1xx** (Informational) | Messaggi informativi, raramente usati.                                           |
| **2xx** (Success)       | La richiesta è andata a buon fine.                                               |
| **3xx** (Redirect)      | Il client deve fare un’altra richiesta perché la risorsa si è spostata.          |
| **4xx** (Client Error)  | La richiesta contiene un errore (es. risorsa non trovata, richiesta non valida). |
| **5xx** (Server Error)  | Errore lato server, il server non ha potuto soddisfare la richiesta.             |
##### JSEND
comunicare al programma javascript che riceve il messaggio dire l'esito della richiesta ecc
secondo delle logiche si vuole scrivere un modo best practice per inviare status di richieste in formato JSON

aggiungi middleware `app.use(express.json)`

abbiamo aggiunto pure morgan un middleware per le CORS