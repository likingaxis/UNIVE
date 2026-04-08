#### Discovering Open services
- dopo aver trovato gli indirizzi IP bisogna identificare  i processi attivi ovvero la porta
- port scanning per rilevamento delle porte
	- esiste un valore che va da $1$ a $2^{16}$ di numero di porta
		- proviamo a connetterci ad ognuna di questi
##### Port binding
- processo o programma che si espone alla rete, richiede al kernel di esporsi alla rete
	- specificando porta e indirizzo IP
	- questa operazione si chiama port binding
	- un determinato indirizzo IP potrebbe
		- essere presente anche in loopback
	- ogni IP ha il suo plot di porte
		- quindi ad ogni IP dobbiamo fare port scanning
- la scansione delle porte con protocollo X trova solo i servizi con protocollo X
	- quindi ne va fatta una con TCP, UDP o altro
	- il kernel non risponde per una richiesta con protocollo sbagliato
		- è il kernel a rispondere alle richieste sulle porte
###### Ripasso sul funzionamento di TCP
- rapida spiegazione di TCP e del suo SYN, SYN/ACK ACK
	foto slide 56
	foto slide 72
##### TIPOLOGIE DI SCANSIONE DELLE PORTE
- prima abbiamo visto che esiste un `synbit`
	- la prima tipologia di scan è `syn` scan
	- con `netcat` facciamo una richiesta con `syn`, se riceviamo un` syn ack` bene
		- se riceviamo RST ack non esiste la porta
		- non fa un synscan vero e proprio perché successivamente invia un synack e un reset
		- con nmap vedi sotto il vero synscan
	- utilizzo ad esempio con `netcat`
		- `nc -vv -w1 -n -z indirizzo ip 1-80  `
		- prova tutti i protocolli?
		- mettendo -u faccia `udp`
			- UDP non ha handshake quindi potrei non ricevere risposte anche se la porta esiste
			- si invia un pacchetto UDP vuoto, se la porta non è presente si riceve un pacchetto ICMP che ci informa che la porta non sia configurata
- piccolo off topic utilizzato a lezione perché non si poteva fare un esempio con dns
	- se ci si trova indirizzo IP in una rete locale
	- se il target è nella stessa rete locale
		- si fa una scansione provano i vari indirizzi IP
		- con un tool nmap  `nmap-sP indirizzoIP/la roba sul range`
- secondo tool `nmap`
	- consente di fare una scansione della rete su un range di indirizzi IP
	- si usa se il target è nella stessa rete locale
		- `nmap scantype options ip address`
		- possibile specificare la porta con `-p25-80`
			- da 25 a 80
		- la porta può avere 3 stati
			- open
			- rest
			- burger
			- foto slide 64
		- con nmap usare -sS consente di usare il syn scan effettivo
			- che non invia un syn ack e invia solo il reset
- Stealth scan
	- con `-sF` faccio il Fin scan con null scan `-sN` invio un pacchetto con tutti i flag a 0 quindi invio un pacchetto totalmente nullo con xmas scan ` -sX` non ho capito
	- non ho ben capito credo lavorino a livello di bit, e inviano solo un pacchetto quando gli altri dovevano inviarne almeno 2
	- alcuni funzionano solo su linux e non su windows
		- se non ricevo risposte allora la porta potrebbe essere aperta o filtrata 
		- se ricevo il reset allora è chiusa
	- slide 80 e 81
	- vantaggi e svantaggi dello stealth scan
- Ping scan
	- si usa in una rete locale sfruttando il protocollo ARP
	- flag `-sP`
		- fa la scansione con ping ma locale, quindi con ARP
		- utilizzando il protocollo ARP per fare un broadcast per la ricerca del MAC del dispositivo
		- con questa modalità rispondiamo sempre con certezza
- Ack scan 
	- flag`-sA`
		- invia da subito il TCP Ack
			- spiega meglio
#### Spoofing & Decoy Scan
- nell'effettuare la scansione non voglio essere identificato
	- Spoofing: utilizzo un indirizzo IP di sorgente di qualcun'altro per non farmi rilevare
	- uno di questi sarà vero mentre gli altri no
	- `-D` per fare roba
	- a cosa serve il Decoy scan?
##### Basic Firewalls Evasion
- `nmap -P0 ipaddress`
	- utilizzo `nmap` con -P0 per bypassare la funzione del ping
	- normalmente fa il ping per ricevere la scansione delle porte con echo reply
	- alcuni host rilevano il ping come malevolo senza reply
		- per risolvere faccio P0
- fare una scansione con nmap fa apparire 3 colonne, la porta lo stato della porta e il nome del servizio di quella porta
	- si vogliono ricevere maggiori informazioni sul servizio presente in nmap
		- di solito dice solo il protocollo di default
	- utilizzo di Banner
		- un servizio ritorna un banner al client come messaggio 
			- il Banner fornisce tutte informazioni utili come versione e altro 
			- si vuole utilizzare un Banner grabber 
				- con netcat `nc <address> <port>`
				- con nmap `nmap -sV <-p porte> <address>`
##### Scan Timing `-T`
- la scansione avverrà a tempi intervallati
##### OS fingerprinting
- cosa è esattamente
	- lo puoi fare attivo nmap
	- oppure passivo p0f
	- `-sV`
##### SMB enumeration
- server message block di windows
	- spiega bene come funziona
	- puoi usare degli script automatizzati su nmap per fare cose particolari
##### SMTP enumeration

#### Esercitazione
`ip -a` 
`sudo nmap -sP ip`
- scansione host
- `sudo nmap -sS indirizzo ip target -p-`
- `sudo nmap -sS indirizzo ip target -p- -Sv` 
	- `Sv` per fare una scansione più precisa
- `nc indirizzo ip porta`
