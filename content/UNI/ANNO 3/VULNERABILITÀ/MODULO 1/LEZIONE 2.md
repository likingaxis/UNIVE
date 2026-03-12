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
	- SPIEGAZIONE RAPIDA DEL COMANDO CON ESEMPIO PRESENTE A SLIDE 21
- `CeWL`
	- SPIEGAZIONE RAPIDA DEL COMANDO CON ESEMPIO PRESENTE A SLIDE 22
- `Username-Anarchy`
	- SPIEGAZIONE RAPIDA DEL COMANDO CON ESEMPIO PRESENTE A SLIDE 23

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
	- SPIEGAZIONE RAPIDA DI HASHCAT
- jhon the ripper
	- ci sono salvate nel pc le password hashate
	- ora questi due tools provano offline
	- limite: velocità della macchina, devo avere il database anche se hashato
##### Come le password vengono criptate
- hash function che cripta le password con sistema di hashing con una funzione one way
	- esempio foto banca con alice
- aggiunta del sale
	- spiegazione ben fatta sul sale che non ho capito
- spiegazione di slide 29
- crackstation
	- spiegazione rapida con foto esempio
#### Le Password su Linux
- le password stanno in etc shadow
	- scritte con id,salt,hash: altra roba
- differenza tra etc passwd e etc shadow spiegata bene
	- etc passwd dice solo le leggibilita dei file e a quale utente sono associate ma non fa vedere la password criptata con sale ecc, passwd ha la x come blocco di lettura
	- in etc shadow ci sono i dati veri e propri come username algoritmo di hashing digest e sale, spiegazione di quest'ultimi soprattutto di digest
foto slide 33
##### Cracking Hashes offensive side
- provo una parola e vedo se corrisponde a un codice hash?, spiegazione di slide 38

### CRACKING HASHES JHON THE RIPPER
- unshadow tool spiegazione con comando a slide 40

#### SINGLE CRACK
spiegazione a slide 41 scrivila qui

#### DICTIONARY
spiegazione a slide 42 scrivila e perfezionala qui
- rock you come dizionario
	- uso -w per specificare il path della wordlist
	- jhon permette di applicare delle regole

#### INCREMENTAL
spiegazione a slide 43 spiegala tu per bene

#### CUSTOM
definire delle aggiunte alle wordlist 
spiegazione a slide 44 spiegala tu per bene
poi ci sono pochi esempi da 45 a 50
- fai l'esempio e spiega la situazione diciamo
### CRACKING HASHES WITH HASHCAT
 - comandi di hashcat di slide 53 e 54 e 55 con spiegazione su una tabella
### CRACKING ARCHIVE PASSWORDS
- slide 57 spiegata, cosa è fcrackzip ecc?
### HYDRA
- comandi hydra da 58 a 59

## WINDOWS

##### Windows- active directory
cosa è la windows active directory spiegato semplice
### LA WINDOWS AUTHENTICATION
windows authentication è divisa in:
- authentication protocol
- password hash
### HASHING 
- prima era LM ma è vecchietto
	- non ho capito cosa sia LAN se era l'algoritmo di hashing o cosa
- più recente NT hash
	- NTLM è il protocollo(?) verrà spiegato bene dopo
		- ma viene usato anche per dire NT hash
	- password hashate in SAM 
		- database di windows
			- standalone significato
cose citate ma che non so dove mettere di slide 67
- NTDS.dit
- Pth pass the hash
- SSO single sign on
##### Dumping tools per windows
- prima di spiegare questi dumping tools vorrei dare una definizione di post exploitation
- mimikatz
	- dumping sam
		- sam systembkup.hiv sambkup.hiv
	- dumping lsass.exe
		- privilege:: debug
		- sekurlsa logon passwords full
#### SPIEGAZIONE APPROFONDITA DI NET NTLM protocol
- protocollo challenge responsive
	-  ovvero un protocollo che ha questo meccanismo dove invia una challenge per la singola autenticazione e applica delle operazioni rispetto all'hash... spiegazione continuata
	- su questi protocolli non abbiamo l'hash effettivo con un aspetto diverso, ogni challenge ha una variazione di hashing??
- esiste una versione 2
	- algoritmo migliorato ma stessa struttura e vulnerabilità di v1?
	- unici cambiamenti: aggiunge una roba 
#### protocollo v2 funzionamento in step
SPIEGALO BENE SPIEGANDO OGNI COSA PER BENE TIPO SC COSA È CC COSA È CC A CHE SERVE ECC
DA SLIDE 74 A 76
- server manda challenge SC a client di 8 byte string
	- arriva al client 
	- genera 8 byte challenge random CC
		- CC* non so cosa sia
		- e altra roba che non ho capito
#### ATTACCO di poisoning con spiderlabs
- spiegazione di attacco poisoning
	- utilizzo nelle password con NLTM v2
	- come funziona?
	- quando il dns fallisce la vittima invia in broadcast un messaggio con protocolli normali
		- sto tizio responder con spiderlabs risponde come il dns fingendosi
		- così ti colleghi tipo
			- il client invia l'hashing e il server del responder lo riceve
NON HO BEN CAPITO QUESTA PARTE QUINDI SE PUOI SPIEGARLA TU IN MODO DETTAGLIATO E SENZA LASCIARE COSE SPARSE
