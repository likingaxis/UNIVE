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
## WINDOWS

##### Windows- active directory
windows authentication è divisa in:
- authentication protocol
- password hash
### HASHING 
- prima era LAN ma è vecchietto
- più recente NT hash
	- NTLM è il protocollo(?)
		- ma viene usato anche per dire NT hash
	- password hashate in SAM 
		- database di windows
			- standalone significato
cose citate ma che non so dove mettere
- NTDS.dit
- Pth pass the hash
- SSO single sign on

##### Dumping tools per windows
- mimikatz
	- post exploitation
		- definizione
	- dumping sam
		- sam systembkup.hiv sambkup.hiv
	- dumping lsass.exe
		- privilege:: debug
		- sekurlsa logon passwords
#### SPIEGAZIONE APPROFONDITA DI NET NTLM protocol
- protocollo challenge responsive
	-  ovvero un protocollo che ha questo meccanismo dove invia una challenge per la singola autenticazione e applica delle operazioni rispetto all'hash... spiegazione continuata
	- su questi protocolli non abbiamo l'hash effettivo con un aspetto diverso, ogni challenge ha una variazione di hashing??
- esiste una versione 2
	- algoritmo migliorato ma stessa struttura e vulnerabilità di v1?
	- unici cambiamenti: aggiunge una roba 
	- protocollo v2 funzionamento in step
		- server manda challenge SC a client di 8 byte string
		- arriva al client 
			- genera 8 byte challenge random CC
			- CC*
			- e altra roba che non ho capito
#### ATTACCO di poisoning con spiderlabs
- spiegazione di attacco poisoning
	- utilizzo nelle password con NLTM v2
	- come funziona?
	- quando il dns fallisce la vittima invia in broadcast un messaggio con protocolli normali
		- sto tizio responder con spiderlabs risponde come il dns fingendosi
		- così ti colleghi tipo
			- il client invia l'hashing e il server del responder lo riceve
