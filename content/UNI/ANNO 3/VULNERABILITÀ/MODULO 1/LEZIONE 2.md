## LE PASSWORD
- definizione
- probabilita di azzeccare una pass
- password overload
- entropia
	- bassa entropia
	- formula e definizioni
- predicibilità di una password
### WORDLIST 
- definizione e utilizzo (dizionari)

##### Creare un custom wordlist
- `Crunch`
	- SPIEGAZIONE RAPIDA DEL COMANDO
- `CeWL`
	- SPIEGAZIONE RAPIDA DEL COMANDO
- `Username-Anarchy`
	- SPIEGAZIONE RAPIDA DEL COMANDO

#### Attacchi alle password
- introuduzione e spiegazione
##### uso con Hydra
- SPIEGAZIONE RAPIDA DEL TOOL
- problemi: 
	- alta latenza
	- alta visibilità
	- rischio di essere bloccato fuori dalla macchina
##### Attacchi offlne
- hashcat
- jhon the ripper
	- ci sono salvate nel pc le password hashate
	- ora questi due tools provano offline
	- limite: velocità della macchina, devo avere il database anche se hashato
##### Come le password vengono criptate
- hash function che cripta le password con sistema di hashing con una funzione one way
	- esempio foto banca con alice
- aggiunta del sale
	- spiegazione ben fatta
- noccapito slide 29
- crackstation
	- spiegazione rapida con foto esempio
#### Le Password su Linux
- le password stanno in etc shadow
	- scritte con id,salt,hash: altra roba
- differenza tra etc passwd e etc shadow
- etc passwd dice solo le leggibilita dei file e a quale utente sono associate ma non fa vedere la password criptata con sale ecc, passwd ha la x come blocco di lettura
- in etc shadow ci sono i dati veri e propri come username algoritmo di hashing digest e sale
foto slide 33
##### Cracking Hashes offensive side
- provo una parola e vedo se corrisponde a un codice hash?

### CRACKING HASHES JHON THE RIPPER
- unshadow

#### SINGLE CRACK

#### DICTIONARY
- rock you come dizionario
	- uso -w per specificare il path della wordlist
	- jhon permette di applicare delle regole

#### INCREMENTAL

#### CUSTOM
definire delle aggiunte alle wordlist 

### CRACKING HASHES WITH HASHCAT
 - comandi di hashcat
### CRACKING ARCHIVE PASSWORDS

### HYDRA
