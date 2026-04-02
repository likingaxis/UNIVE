#### NETWORK SECURITY
- Come si raggiunge un host
	- non per forza con `ssh`
- porte utili da sapere
	- 80 -> HTTP
	- 443 -> HTTPS
	- 22 -> SSH
	- 53 -> UDP
- foto utile sul funzionamento a slide 11
- ricorda che sotto una applicazione web è presente la socket
	- una socket è un’interfaccia software che permette a un processo di inviare e ricevere dati tramite una connessione di rete, utilizzando protocolli come TCP o UDP
- Firewall
	- controllo su quale traffico è consentito per l'accesso o l'uscita della rete network
	- funzionamento attraverso regole che filtrano i pacchetti 
	- foto slide 14
###### COMANDI
- `ping`
- `traceroute`
- `arp / ip neigh`
- `ip / ifconfig
	- The `ipconfig` command displays all the currently connected network interfaces whether they are active or not. On the other hand, the `ifconfig` command displays only the enabled network interfaces that are connected to the system
- `route / ip route`
##### IDENTIFICAZIONE DEL TARGET
- attraverso indirizzo IP 
	- può essere recuperato sfruttando il DNS
		- distribuito e gerarchico
		- ROOT, TLD, 2LEVEL, 3LEVEL
		- DNS client <-> DNS resolver <-> DNS server
		- ad esempio il DNS di tor vergata può dirci cose sulle macchine di tor vergata
###### Record DNS come è fatto
- in risposta un DNS può inviare il tipo del record che sta inviando
	- A= ipv4
	- AAAA= ipv6
	- MX= per la mail
	- PTR= il client invia al DNS server un indirizzo IP per ricevere il nome
	- CNAME= **creare un alias** per un altro nome di dominio
###### Cosa accade dentro linux
- prima di contattare il DNS linux controlla
	- `/etc/hosts/`
		- presenti indirizzi `ip` come localhost
	- Local cache
	- DNS resolver
- con `dig` contatta il DNS attraverso una query
	- `dig hostname`
	- `dig @dns-server hostname record-name`
		- per un determinato record name tipo MX
	- `dig @dns-server hostname`
	- `host` è tipo dig
###### Interacting with DNS
- forward lookup
- con ns abbiamo trovato i name server del DNS
	- dopo abbiamo chiesto con any tutto ciò che riguarda un certo DNS
	- ricorsivamente andiamo a interrogare il DNS, facendo query
- reverse lookup
- un altro approccio potrebbe essere utilizzando PTR con un approccio inverso
	- invio richieste PTR con indirizzi IP simili 
	- per sapere quale indirizzo IP provare per quel DNS
		- `whois indirizzo`
		- ti dice il range di indirizzi IP gestiti da quella società `NETRANGE:`
