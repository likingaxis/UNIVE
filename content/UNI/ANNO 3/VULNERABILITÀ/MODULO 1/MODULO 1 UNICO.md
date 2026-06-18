##### Password cosa sono
Sono un segreto condiviso tra due parti 
###### Hashing con salt
le password spesso vengono criptate con una funzione a una via di hashing
- restituisce un digest
- viene aggiunto un salt per evitare che due persone con stessa pass abbiano stesso hash
- il sistema per capire se hai usato la password corretta
	- utilizza stesso algoritmo e stesso salt quando digiti la password per controllare se è quella giusta
###### Pass cracking tools e come funzionano
- i password cracking tools confrontano una wordlist di candidati, effettuano l'algoritmo di hash e vedono se coincide con l'hash che si vuole rubare
###### Attacchi online ed offline
- attacchi online, faccio la verifica della password online ad esempio con attacchi come hydra
	- alta latenza e alta visibilità
- attacchi offline, faccio tutta la verifica in locale come con john the ripper

##### Privesc
Le Privesc racchiudono quella sequenza di passaggi che portano a effettuare una privilege escalation, ossia una vera e propria scalata dei privilegi fino a raggiungere l'utente da noi richiesto
###### Enumeration finding attack vectors exploit them
- sono i passaggi principali delle privesc
- la prima consiste nel raccogliere più informazioni possibili
- la seconda consiste nel dare un senso alle informazioni raccolte e trovare delle vulnerabilità fattibili da utilizzare
- la terza è la vera e propria applicazione di quelle vulnerabilità per scalare e raggiungere l'obiettivo prefissato
###### Capabilities
I sistemi Linux permettono di scomporre le capacità del ruolo root ad esempio dando la possibilità di leggere i file root, scrivere o eseguire
- questa suddivisione viene fatta in piccole capabilities
###### Bit SUID
il bit suid sta per Set user ID, può essere associato a un certo file e permette l'esecuzione di quel file a nome di quell'utente che lo possiede
nella parte del proprietario ci sarà come owner nella parte di esecuzione al posto di `x` `s`
`rwsr-xr-x`
###### Cronjob
Tool di linux che consente di schedulare e iterare l'esecuzione di determinate istruzioni
utile per fare attacchi che minano a quei file che vengono eseguiti periodicamente a nome di utenti linux particolari
##### Dirty cow
quando due processi o thread accedono alla stessa risorsa avviene una race condition, durante quest'ultima è possibile nella fase di copy on write di modificare dei file protetti
è estremamente instabile
##### Path hijacking
attacco che consiste nello sfruttare una vulnerabilità ben specifica dove un comando bash o in generale un programma che esegue comandi non usa path assoluti ma relativi, di conseguenza quello che avviene è che noi possiamo modificare la variabile d'ambiente da cui attinge la macchina per definire dove trovare quel determinato eseguibile e andare a metterne uno noi che risulta prima 

