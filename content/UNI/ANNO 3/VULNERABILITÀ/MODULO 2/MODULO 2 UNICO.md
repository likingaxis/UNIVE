##### DNS, DNS query e DNS record
Il DNS è un sistema distribuito che permette di associare nomi di dominio a informazioni utili, soprattutto indirizzi IP. Interagiamo con il DNS tramite query e riceviamo record come `A`, `AAAA`, `MX`, `TXT`, `PTR`, `CNAME`, `SOA`
###### Forward lookup brute force
Consiste nel provare molti possibili sottodomini tramite una wordlist, ad esempio `admin.dominio.it`, `dev.dominio.it`, `test.dominio.it`, per vedere quali esistono e a quali IP puntano
###### Reverse lookup
Consiste nel partire da un indirizzo IP o da un range di IP e cercare i nomi associati tramite record `PTR`
###### Zone transfer
Consiste nel provare una richiesta `AXFR` per ottenere una copia completa della zona DNS. Se il server è configurato male, può rivelare molti record, host e sottodomini interni.
##### Host discovery
Serve a capire quali host/IP sono attivi e raggiungibili in una rete. È una fase iniziale dell’enumeration.
###### ARP scan
Funziona nella rete locale. Usa ARP per risolvere indirizzi IP in MAC address. È molto affidabile nella stessa subnet perché usa richieste broadcast a livello link.
###### Ping scan
Usa ICMP echo request/reply per capire se un host è attivo. Può funzionare anche su reti remote, ma può essere bloccato da firewall, quindi non sempre è affidabile.
##### Port scanning
Dopo aver trovato gli host attivi, il port scanning serve a capire quali porte sono aperte e quali servizi sono in ascolto. Un servizio di rete si registra presso il kernel facendo binding su indirizzo IP, porta e protocollo.
###### TCP handshake
TCP è connection-oriented: prima dello scambio dati stabilisce una connessione tramite three-way handshake:
- client → server: `SYN`
- server → client: `SYN/ACK`
- client → server: `ACK`
Nel SYN scan si invia `SYN`; se arriva `SYN/ACK`, la porta è aperta, ma invece di completare la connessione si manda `RST`. Per questo è detto half-open scan.
###### Stati delle porte
- `open`: c’è un servizio in ascolto.
- `closed`: l’host è raggiungibile, ma nessun servizio ascolta su quella porta.
- `filtered`: non si riesce a capire se la porta sia aperta o chiusa perché probabilmente il traffico è filtrato da firewall.
###### UDP scan
UDP non ha handshake, quindi è più ambiguo: se una porta è chiusa posso ricevere ICMP port unreachable; se non ricevo risposta, la porta potrebbe essere aperta oppure filtrata.
###### Spoofing e decoy scan
Lo spoofing consiste nel falsificare l’indirizzo IP sorgente. Il decoy scan invece maschera il vero IP dell’attaccante tra altri IP fittizi, così il target vede più sorgenti e fa più fatica a capire chi sta realmente scansionando.
##### Sniffing e analisi della rete
Per analizzare il traffico di rete si osservano i pacchetti, distinguendo header e payload. Gli header contengono informazioni di controllo come IP, porte, flag e protocollo; il payload contiene i dati veri trasportati.
###### tcpdump
È un tool da riga di comando per catturare traffico da un’interfaccia di rete. Può mostrare pacchetti in tempo reale e salvare catture in formato `.pcap`.
###### Wireshark
È un analizzatore grafico di pacchetti. Permette di filtrare il traffico, analizzare protocolli, vedere endpoint, conversazioni e seguire uno stream TCP per ricostruire la comunicazione tra due host.
##### Shell remote
Una shell remota permette di eseguire comandi su una macchina target. È molto più comoda rispetto a inviare un singolo comando alla volta tramite una vulnerabilità RCE.
###### Bind shell
Il target apre una porta in ascolto con una shell collegata. L’attaccante si connette a quella porta e ottiene la shell. Spesso è bloccata dai firewall perché richiede una connessione in ingresso verso il target.
###### Reverse shell
L’attaccante si mette in ascolto su una porta e fa connettere il target verso di lui. È spesso più utile perché sfrutta una connessione in uscita dal target, che di solito è meno filtrata.
##### Pivoting
Il pivoting consiste nell’usare una macchina compromessa come ponte per raggiungere servizi o host interni che non sono direttamente accessibili dall’attaccante.
###### Tunneling
Consiste nel creare un canale di comunicazione, spesso tramite SSH, dentro cui viene incapsulato altro traffico. È il mezzo che permette di trasportare il traffico attraverso una macchina intermedia.
###### Local port forwarding
Apro una porta sul mio PC. Quando mi collego a quella porta locale, il traffico passa nel tunnel verso la macchina compromessa, che lo inoltra a un servizio interno raggiungibile da lei.
###### Remote port forwarding
Apro una porta sulla macchina remota. Tutto il traffico che arriva a quella porta viene inoltrato attraverso il tunnel verso la mia macchina o un mio servizio locale.
###### Proxying
Uso la macchina compromessa come proxy: lei invia richieste al posto mio verso la rete interna e mi restituisce le risposte. È più flessibile del port forwarding perché può essere usato per più servizi e destinazioni.
##### Web enumeration
La web enumeration consiste nel raccogliere informazioni su una web application per trovare possibili attack vector: pagine nascoste, directory, file, tecnologie, versioni, virtual host e comportamenti anomali.
###### Virtual host discovery
Più siti possono stare sullo stesso indirizzo IP e sulla stessa porta. Il server decide quale sito mostrare in base all’header HTTP `Host`. Modificando o fuzzando questo header posso scoprire applicazioni web nascoste.
##### Web exploits
###### Command injection
Una command injection avviene quando l’applicazione inserisce input utente dentro un comando di sistema senza validarlo correttamente. L’attaccante può quindi far eseguire comandi arbitrari al server.

Difese:
- input validation, meglio con whitelist;
- parsing corretto dell’input;
- principio del least privilege, facendo girare il servizio web con un utente poco privilegiato.
###### SQL injection
Una SQL injection avviene quando input utente viene inserito direttamente in una query SQL senza separarlo dal codice SQL. L’attaccante può modificare la query, bypassare login, leggere dati o, se i privilegi lo permettono, modificare il database.
Tipi principali:

- in-band: input e output passano dallo stesso canale, cioè la risposta della web app;
- out-of-band: i dati vengono estratti tramite un canale diverso, ad esempio DNS o email;
- blind: non vedo direttamente i dati, ma li deduco osservando differenze nella risposta o nei tempi di risposta.
###### PHP lato server
PHP viene eseguito lato server: il client riceve solo l’HTML prodotto. Funzioni come `include()` ed `eval()` sono pericolose se usano input utente senza controlli.
###### File inclusion
La file inclusion avviene quando una web app include un file il cui nome/percorso è controllabile dall’utente.
- LFI: include file locali del server, ad esempio file di configurazione o `/etc/passwd`, se i permessi lo consentono.
- RFI: include file remoti tramite URL, ma richiede configurazioni PHP permissive come `allow_url_include`.
###### Path traversal
Il path traversal permette di uscire dalla directory prevista usando sequenze come `../`, oppure varianti codificate, per raggiungere file in altre directory del filesystem.
###### PHP wrapper
I PHP wrapper sono meccanismi come `php://`, `file://`, `data://` che permettono di accedere a risorse in modi particolari. In una LFI, `php://filter` può essere usato per leggere il sorgente di un file PHP codificandolo in Base64 prima che venga interpretato.
