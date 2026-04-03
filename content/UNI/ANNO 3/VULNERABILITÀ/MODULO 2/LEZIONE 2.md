#### Discover Open services
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
foto slide 56

##### TIPOLOGIE DI SCANSIONE DELLE PORTE
- prima abbiamo visto che esiste un `synbit`
	- la prima tipologia di scan è `syn` scan
	- con `netcat` facciamo una richiesta con `syn`, se riceviamo un` syn ack` bene
	- utilizzo ad esempio con `netcat`
		- `nc -vv -w1 -n -z indirizzo ip 1-80  `
		- prova tutti i protocolli?
		- credo che mettendo -u faccia `udp`
- piccolo off topic utilizzato a lezione perché non si poteva fare un esempio con dns
	- se ci si trova indirizzo IP in una rete locale
	- se il target è nella stessa rete locale
		- si fa una scansione provano i vari indirizzi IP
		- con un tool nmap `nmap-sP indirizzoIP/la roba sul range`