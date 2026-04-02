#### NETWORK SECURITY
- Come si raggiunge un host
	- non per forza con `ssh`
- porte utili da sapere
	- 80 -> HTTP
	- 443 -> HTTPS
	- 22 -> SSH
	- 53 -> UDP
- foto utile sul funzionamento
![[Pasted image 20260402192502.png|400]]
- ricorda che sotto una applicazione web è presente la socket
	- una socket è un’interfaccia software che permette a un processo di inviare e ricevere dati tramite una connessione di rete, utilizzando protocolli come TCP o UDP
- Firewall
	- controllo su quale traffico è consentito per l'accesso o l'uscita della rete network
	- funzionamento attraverso regole che filtrano i pacchetti 
![[Pasted image 20260402192522.png|400]]
###### COMANDI
- `ping`
    - verifica la **raggiungibilità** di un host
    - invia pacchetti ICMP echo request
    - misura il **tempo di risposta (RTT)**
- `traceroute`
    - mostra il **percorso** dei pacchetti fino alla destinazione
    - elenca tutti i **router intermedi (hop)**
    - utile per capire dove si verificano rallentamenti o blocchi
- `arp` / `ip neigh`
    - gestiscono la **tabella ARP** (mapping IP → MAC)
    - `arp` → comando più vecchio
    - `ip neigh` → versione moderna (suite `ip`)
- `ip` / `ifconfig`
    - configurano e mostrano informazioni sulle **interfacce di rete**
    - `ip` → comando moderno e completo
    - `ifconfig` → più vecchio, mostra solo interfacce attive
    - `ipconfig` (Windows) → mostra tutte le interfacce
- `route` / `ip route`
    - visualizzano e modificano la **tabella di routing**
    - `route` → comando legacy
    - `ip route` → versione moderna e più flessibile
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
- con `ns` abbiamo trovato i name server del DNS
	- dopo abbiamo chiesto con any tutto ciò che riguarda un certo DNS
	- ricorsivamente andiamo a interrogare il DNS, facendo query
- reverse lookup
- un altro approccio potrebbe essere utilizzando PTR con un approccio inverso
	- invio richieste PTR con indirizzi IP simili 
	- per sapere quale indirizzo IP provare per quel DNS
		- `whois indirizzo`
		- ti dice il range di indirizzi IP gestiti da quella società `NETRANGE:`
