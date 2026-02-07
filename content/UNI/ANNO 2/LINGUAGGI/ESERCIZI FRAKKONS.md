# ESERCIZIO 0
## 📘 LMP – Programmazione Orientata agli Oggetti (Java)

Si vuole realizzare un software per la gestione di una **rubrica di contatti**.

Ogni **contatto** è caratterizzato da:

- un **id univoco** (intero),
    
- **nome** e **cognome** (stringhe),
    
- **numero di telefono** (stringa),
    
- **categoria** del contatto (stringa, ad esempio: “amici”, “lavoro”, “famiglia”).
    

Non è consentito avere due contatti con lo stesso id.

La rubrica deve consentire di:

1. **Aggiungere** un contatto alla rubrica.
    
2. **Rimuovere** un contatto dato il suo id.
    
3. **Cercare** un contatto dato il suo id.
    
4. Restituire la lista di tutti i contatti appartenenti a una certa **categoria** (data come stringa).
    
5. Restituire il numero totale di contatti presenti in rubrica.
    

### Vincoli e indicazioni

- Tutti gli attributi devono essere **privati**.
    
- Devono essere presenti i **getter** per tutti gli attributi; i **setter** devono essere presenti solo dove ha senso (ad esempio l’id non dovrebbe essere modificabile dopo la creazione).
    
- Il numero di telefono non deve essere una stringa vuota.
    
- Implementare `toString()` nella classe `Contatto` in modo che stampi in modo leggibile tutte le informazioni del contatto.
    
- Utilizzare una **lista** (`ArrayList`) per memorizzare i contatti.
    

Si progetti e si implementi, in Java, un software che soddisfi le esigenze descritte tramite una opportuna modellazione degli elementi di dominio e delle funzioni richieste.  
Si sviluppi inoltre un piccolo esempio con una classe contenente il metodo `main` che inserisca alcuni contatti, effettui ricerche e rimozioni (includendo anche almeno un caso non valido) e stampi i risultati ottenuti.


# ESERCIZIO 1
## 📘 LMP – Programmazione Orientata agli Oggetti (Java)

### Archivio di Dispositivi di Prestito (30’–40’)

Una piccola biblioteca di quartiere vuole realizzare un software per gestire un **archivio di dispositivi** prestabili ai soci (es. tablet, laptop, e-reader). Ogni dispositivo è identificato univocamente da un **codice** (stringa) e ha almeno le seguenti informazioni comuni: **marca**, **modello**, **anno di acquisto** (intero) e **stato** (disponibile / in prestito).  
Inoltre, a seconda del tipo di dispositivo, è necessario gestire informazioni specifiche.

Si considerino i seguenti tipi di dispositivi:

- **Laptop**: oltre ai dati comuni, memorizza la quantità di **RAM** in GB (intero) e il **sistema operativo** (stringa).
    
- **Tablet**: oltre ai dati comuni, memorizza la **dimensione dello schermo** in pollici (double) e se supporta o meno la **SIM** (boolean).
    
- **EReader**: oltre ai dati comuni, memorizza il tipo di **tecnologia schermo** (stringa, es. “e-ink”) e la **memoria** in GB (intero).
    

L’archivio deve consentire di:

1. **Aggiungere** un nuovo dispositivo all’archivio. Non è consentito inserire due dispositivi con lo stesso codice.
    
2. **Cercare** un dispositivo dato il suo codice.
    
3. **Prestare** un dispositivo dato il suo codice e il nome del socio (stringa). Se il dispositivo non è disponibile, l’operazione deve fallire con un messaggio.
    
4. **Restituire** un dispositivo dato il suo codice. Se il dispositivo non è attualmente in prestito, l’operazione deve fallire con un messaggio.
    
5. Restituire la **lista dei dispositivi disponibili**.
    
6. Restituire la **lista dei dispositivi attualmente in prestito**, includendo per ciascuno anche il nome del socio che lo ha preso.
    

Per semplicità, si assuma che per i prestiti sia sufficiente memorizzare: **codice dispositivo**, **nome socio**, e una **data** (puoi rappresentarla come stringa, oppure con tre interi anno/mese/giorno, a scelta).

### Vincoli e indicazioni di progettazione

- Tutti gli attributi devono essere **privati** e accessibili tramite **getter**; i **setter** vanno previsti solo dove sensato (ad esempio: non dovrebbe essere possibile cambiare liberamente il codice identificativo dopo la creazione).
    
- L’anno di acquisto deve essere un intero **>= 2000** (se non valido, rifiutare l’inserimento o correggere con messaggio: scelta libera ma coerente).
    
- Implementare `toString()`:
    
    - per ogni tipo di dispositivo, in modo che stampi in modo leggibile i dati (inclusi quelli specifici);
        
    - per l’eventuale “record di prestito”, in modo da stampare chiaramente chi ha preso cosa.
        
- Utilizzare una o più **liste** (es. `ArrayList`) per memorizzare i dispositivi e, se necessario, i prestiti.
    

Si progetti e si implementi, in Java, un software che sia in grado di soddisfare le esigenze descritte tramite una opportuna modellazione degli elementi di dominio e delle funzioni richieste. Si sviluppi inoltre un piccolo esempio con una `main` che inserisca alcuni dispositivi (di tipi diversi), effettui prestiti e restituzioni, e stampi a schermo i risultati delle funzioni richieste.

---

Se vuoi renderlo ancora più “da esame completo” senza esagerare, due micro-bonus facoltativi tipici:

- **(Bonus)** metodo `rimuoviDispositivo(codice)` consentito solo se il dispositivo è disponibile.
    
- **(Bonus)** metodo `dispositiviPerMarca(String marca)` che restituisce una lista filtrata.
    

Vuoi che te ne scriva anche una **traccia di classi** (solo nomi campi/metodi) così sai subito “che classi fare” senza spoilerarti tutta la soluzione?
# ESERCIZIO 2
## 📘 LMP – Programmazione Orientata agli Oggetti (Java)

Si vuole realizzare un software per la gestione di un **servizio di prenotazione di spazi in un coworking**.

Ogni **utente** del coworking è descritto da: **id univoco** (stringa), **nome**, **cognome** ed **email** (stringhe). Non è necessario validare l’email, ma non devono esistere due utenti con lo stesso id.

Il coworking mette a disposizione diversi **spazi prenotabili**, identificati da un **codice** (stringa) e descritti da: **nome**, **capienza massima** (intero) e **tariffa oraria** (double). Si considerino almeno due tipologie di spazio:

- **Postazione**: oltre ai dati comuni, indica se è **dotata di monitor** (boolean).
    
- **SalaRiunioni**: oltre ai dati comuni, indica se ha un **proiettore** (boolean) e il numero di **lavagne** (intero).
    

Una **prenotazione** rappresenta l’uso di uno spazio da parte di un utente e deve contenere: l’**utente**, lo **spazio**, una **data** (stringa a scelta, es. “2026-02-07”), un **orario di inizio** (intero 0–23) e una **durata** in ore (intero). Il costo di una prenotazione è dato da: `durata * tariffa_oraria` dello spazio. Per semplicità si assuma che le prenotazioni siano sempre in ore intere e non attraversino la mezzanotte.

Il gestore del coworking è interessato a:

- inserire nuovi utenti e nuovi spazi nel sistema;
    
- creare una prenotazione dato **id utente**, **codice spazio**, **data**, **ora inizio**, **durata**;
    
- impedire prenotazioni non valide secondo i seguenti vincoli:
    
    1. non è possibile prenotare uno spazio se esiste già una prenotazione, per lo stesso spazio e stessa data, con intervallo orario sovrapposto;
        
    2. `durata` deve essere positiva e `oraInizio` deve essere tra 0 e 23;
        
    3. non è possibile creare prenotazioni per utenti o spazi non presenti nel sistema.
        
- annullare una prenotazione, identificandola tramite (codice spazio, data, ora inizio);
    
- ottenere la lista delle prenotazioni di un certo utente (dato il suo id);
    
- ottenere la lista delle prenotazioni di un certo spazio (dato il suo codice);
    
- calcolare l’incasso totale relativo a una certa data (somma dei costi di tutte le prenotazioni in quella data).
    

Si richiede di progettare e implementare, in Java, una soluzione che modelli correttamente gli elementi di dominio descritti e le funzioni richieste, utilizzando opportunamente **liste** per memorizzare utenti, spazi e prenotazioni.

### Vincoli di implementazione

- Tutti gli attributi devono essere **privati**. Devono essere presenti opportuni **getter** e **setter** (solo dove sensato: ad esempio l’id utente e il codice spazio non dovrebbero essere modificabili dopo la creazione).
    
- Implementare `toString()` per **Utente**, per ciascun tipo di **Spazio** e per **Prenotazione**, in modo da stampare informazioni leggibili e utili al debug.
    
- In caso di operazioni non consentite (utente/spazio non trovato, sovrapposizione, parametri non validi) stampare un messaggio informativo e non modificare lo stato del sistema.
    

Si sviluppi inoltre un piccolo esempio con una classe `main` che inserisca alcuni utenti e spazi di tipi diversi, crei prenotazioni valide e non valide (mostrando i messaggi di errore), e stampi:

- l’elenco prenotazioni di un utente,
    
- l’elenco prenotazioni di uno spazio,
    
- l’incasso totale di una data.
    

---

Se vuoi fare “ancora mezzo passo in più” senza diventare troppo pesante, posso aggiungere **una sola** di queste cose (a scelta, ma posso anche decidere io in stile esame):

- **(bonus leggero)** uno sconto % per gli utenti “Premium” (sottoclasse di Utente) applicato al costo;
    
- **(bonus leggero)** metodo `stampaReportGiornaliero(data)` che stampa tutte le prenotazioni ordinate per ora (anche senza sort avanzato: basta inserirle in ordine nel main).
# ESERCIZIO 3
Si vuole realizzare, in **Java**, un software per la gestione di un **servizio di noleggio** di mezzi urbani (monopattini e auto condivise). Il sistema deve consentire di registrare mezzi e clienti, avviare e terminare noleggi e produrre alcune statistiche.

Ogni **cliente** è identificato univocamente da un **codiceCliente** (stringa) e possiede inoltre **nome**, **cognome** ed **età** (intero). Non devono esistere due clienti con lo stesso codiceCliente. L’età deve essere **>= 14**; in caso contrario il cliente non deve essere registrato.

Ogni **mezzo** è identificato univocamente da un **codiceMezzo** (stringa) e ha: **marca** (stringa), **tariffaOraria** (double) e uno **stato** (disponibile / in noleggio). Il sistema gestisce almeno due tipologie di mezzo:

- **Monopattino**: oltre ai dati comuni, contiene il livello di **batteria** (intero 0–100).
    
- **Auto**: oltre ai dati comuni, contiene il numero di **posti** (intero) e la **targa** (stringa).
    

Un **noleggio** associa un cliente a un mezzo e deve contenere: **cliente**, **mezzo**, una **data** (stringa nel formato che si preferisce), **oraInizio** (intero 0–23), **durataOre** (intero) e **costo** calcolato come `durataOre * tariffaOraria` del mezzo. Per semplicità, si consideri che un noleggio non attraversi la mezzanotte e che la durata sia sempre espressa in ore intere.

Il sistema deve permettere di:

1. **Registrare un cliente**.
    
2. **Aggiungere un mezzo** al parco mezzi.
    
3. **Cercare** un cliente dato il suo codiceCliente e **cercare** un mezzo dato il suo codiceMezzo.
    
4. **Avviare un noleggio** specificando: codiceCliente, codiceMezzo, data, oraInizio, durataOre.  
    L’operazione deve rispettare i seguenti vincoli:
    
    - cliente e mezzo devono esistere nel sistema;
        
    - il mezzo deve essere **disponibile**;
        
    - `durataOre` deve essere **> 0** e `oraInizio` deve essere tra 0 e 23;
        
    - nel caso di monopattino, la batteria deve essere **>= 20** per poter avviare un noleggio (altrimenti operazione non consentita).  
        In caso di operazione non consentita, stampare un messaggio informativo e non modificare lo stato del sistema.
        
5. **Terminare un noleggio** dato il codiceMezzo: il mezzo torna disponibile. Per semplicità, si assume che per ciascun mezzo possa esistere al massimo un noleggio attivo alla volta.
    
6. Restituire la **lista dei mezzi disponibili**.
    
7. Restituire la **lista dei noleggi effettuati da un cliente** (dato codiceCliente).
    
8. Calcolare l’**incasso totale** del sistema (somma dei costi di tutti i noleggi terminati).
    
9. Calcolare l’**incasso totale in una data** specificata (somma dei costi dei noleggi terminati in quella data).
    

Vincoli di implementazione:

- Tutti gli attributi devono essere **privati**. Devono essere presenti **getter** per tutti gli attributi e **setter** solo dove sensato (ad esempio, il codice univoco di cliente e mezzo non dovrebbe essere modificabile dopo la creazione).
    
- Implementare `toString()` per le classi **Cliente**, **Mezzo** (e relative specializzazioni) e **Noleggio**, in modo che la stampa risulti chiara e utile.
    
- Utilizzare opportunamente una o più **liste** (`ArrayList`) per memorizzare clienti, mezzi e noleggi (attivi e/o terminati, a scelta progettuale).
    
- In caso di errori o vincoli violati, il sistema deve **segnalare** il problema con messaggi e mantenere uno stato coerente.
    

Si progetti e si implementi, in Java, un software che sia in grado di soddisfare le esigenze espresse tramite una opportuna modellazione degli elementi di dominio descritti e delle funzioni richieste. Si sviluppi inoltre un piccolo esempio con una classe `main` che:

- registri almeno 2 clienti (includendo almeno un caso non valido),
    
- aggiunga almeno 3 mezzi (almeno un monopattino e un’auto),
    
- avvii e termini alcuni noleggi (includendo almeno un tentativo non consentito),
    
- stampi la lista dei mezzi disponibili,
    
- stampi i noleggi di un cliente,
    
- stampi incasso totale e incasso per una data.