### Host discovery
- **ARP Scan (stessa rete / same subnet)**
    - funziona solo se sei nella **stessa rete locale del target**
    - usa il protocollo **ARP**
    - è **veloce e affidabile**
- **Ping Scan (reti diverse)**
    - usa **ICMP (echo request/reply)**
    - funziona anche su reti remote
    - può essere **bloccato dai firewall → meno affidabile**
#### Discovering Open services
- dopo aver trovato gli indirizzi IP bisogna identificare i processi attivi ovvero la porta
	- ogni servizio gira su una specifica porta (es: 22 SSH, 80 HTTP)
- port scanning per rilevamento delle porte
	- esiste un valore che va da $1$ a $2^{16}$ di numero di porta
		- proviamo a connetterci ad ognuna di queste
##### Port binding
- un processo (servizio) che vuole comunicare in rete deve **registrarsi presso il sistema operativo**
- lo fa chiedendo al **kernel** di associare:
    - un **indirizzo IP**
    - una **porta**
- questa associazione si chiama **port binding**
- un determinato indirizzo IP potrebbe
    - essere presente anche in loopback (es: `127.0.0.1`)
    - quindi un servizio può essere visibile solo localmente
- ogni IP ha il suo set di porte
    - quindi ad ogni IP dobbiamo fare port scanning
- più servizi possono usare **la stessa porta su IP diversi**
##### Protocol awareness
- la scansione delle porte con protocollo X trova solo i servizi con protocollo X
    - quindi ne va fatta una con TCP, UDP o altri
- il kernel gestisce le porte a livello di trasporto (TCP/UDP)
- se uso il protocollo sbagliato:
    - non ricevo risposta significativa
    - perché ogni porta “parla il suo linguaggio”
###### Ripasso sul funzionamento di TCP
- TCP è un protocollo **connection-oriented**
    - prima di comunicare deve **stabilire una connessione**
- la connessione avviene con il **three-way handshake**:
1. **SYN**
    - il client manda un pacchetto SYN al server
    - significa: _“voglio iniziare una connessione”_
2. **SYN/ACK**
    - il server risponde con SYN + ACK
    - significa: _“ok, ho ricevuto, sono pronto”_
3. **ACK**
    - il client manda ACK finale
    - significa: _“connessione stabilita”_
- per chiudere:
    - FIN → ACK → FIN → ACK
- quindi TCP gestisce anche la chiusura in modo ordinato
	![[Pasted image 20260409171700.png|400]]
##### TIPOLOGIE DI SCANSIONE DELLE PORTE

- il port scanning sfrutta il comportamento dei protocolli (TCP/UDP)
- in base alla risposta capisco lo stato della porta

- *TCP SCAN (basato su handshake)*
	-  SYN scan (`-sS`)
- è lo scan principale e più importante
	- sfrutta il **three-way handshake TCP**
	- funzionamento:
		1. mando **SYN**
		2. se la porta è:
		    - **open** → ricevo **SYN/ACK**
		    - **closed** → ricevo **RST**
		3. se ricevo SYN/ACK:
		    - NON completo la connessione
		    - mando subito **RST** (connessione abortita)
	- non apro davvero la connessione → **half-open scan**
	- più stealth rispetto al connect scan
-  *TCP CONNECT SCAN (`-sT`)*
	- completa tutto il handshake TCP
	- quindi:
	    - più **rumoroso**
	    - viene loggato dai servizi
	- si usa:
	- quando non hai privilegi (no root)
	- con netcat
		- `nc -vv -w1 -n -z <ip> 1-80`
- *UDP SCAN (`-sU`)*
	- UDP **non ha handshake**
	-  funzionamento:
	- invio pacchetto UDP vuoto
	- risposta:
	    - **porta chiusa** → ICMP "port unreachable"
	    - **porta aperta** → nessuna risposta
	- problema:
	- se non ricevo risposta:
	    - potrebbe essere **open**
	    - oppure **filtrata**
- *STEALTH SCAN(`-sF`, `-sN`, `-sX`)*
	-  idea
	- inviano **pacchetti TCP “strani” (flag anomali)**
		- senza handshake
	- funzionamento:
	- se la porta è:
	    - **closed** → ricevo **RST**
	    - **open** → **nessuna risposta**
	- quindi:
	- risultato:
	    - open | filtered
	    - oppure closed
		tipi:
		- **FIN scan (`-sF`)**
		- **NULL scan (`-sN`)** → tutti i flag a 0
		- **XMAS scan (`-sX`)** → più flag attivi insieme
	- funzionano bene su Linux ma non su windows
###### Funzioni non di port scanning:
- *ACK SCAN (`-sA`)*
	- cosa fa:
		- manda direttamente un pacchetto **ACK**
	- risposta:
		- **RST** → porta **unfiltered**
		- nessuna risposta → **filtered**
	- quindi:
		- serve per:
		    - capire presenza di **firewall**
		    - mappare filtri di rete
- *PING / HOST DISCOVERY (`-sP` / `-sn`)*
	- serve per:
	- trovare host attivi
		- due casi:
		- **rete locale → ARP**
		    - sempre affidabile
		- **rete remota → ICMP ping**
		    - può essere bloccato
###### USO DEL TOOL NMAP
- sintassi:
    - `nmap <scantype> <options> <ip>`
- porte:
    - `-p25-80`
- stati:
    - **open**
	    - la porta è **aperta**
		- c’è un **servizio in ascolto**
    - **closed**
	    - la porta è **chiusa**
		- nessun servizio è in ascolto
    - **filtered**
	    - la porta è **filtrata**
			- non riesci a capire se è open o closed forse a causa di un firewall
### Spoofing & Decoy Scan
- durante una scansione potrei non voler essere identificato
- *Spoofing*
	- consiste nel **falsificare l’indirizzo IP sorgente**
	- quindi:
	    - i pacchetti sembrano provenire da un altro host
	- le risposte del target vanno all’IP falso
- *Decoy scan (`-D`)*
	- serve per **nascondere il vero IP tra tanti IP falsi**
		- invio la scansione insieme a più indirizzi fake
	- il target vede:
    - più host che stanno scansionando
		- difficile capire chi è il vero attaccante
##### Basic Firewalls Evasion
- Disabilitare ping (`-P0`)
	- di default nmap:
	    - manda un **ping (ICMP)** per vedere se l’host è attivo
	- problema:
	    - firewall possono bloccare il ping
	- `nmap -P0 <ip>`
	    - salta la fase di ping
	    - prova direttamente il port scanning
##### Banner Grabbing / Version Detection
- quando ti connetti a un servizio:
    - spesso manda un messaggio iniziale (banner)
- contiene:
	- tipo di servizio
	- software (es: Apache, OpenSSH)
	- versione
	- a volte info sull’OS
- *Come ottenerlo*
	- con netcat:
	    - `nc <address> <port>`
	    - connessione manuale → leggi risposta
	- con nmap:
	    - `nmap -sV -p <porte> <address>`
	    - rileva automaticamente versione del servizio
##### Scan Timing `-T`
- la scansione avverrà a tempi intervallati
- modalità principali:
	- **paranoid / sneaky** → molto lente, difficili da rilevare
	- **normal** → default
	- **aggressive / insane** → molto veloci ma rumorose
##### OS fingerprinting
- tecnica per capire **quale sistema operativo gira sul target**
	- la puoi fare 
		- **attiva (nmap)**
	    - invia pacchetti “particolari”
	    - analizza le risposte
	    - ogni OS risponde in modo leggermente diverso
	- **passiva (p0f)**
	    - non invia pacchetti
	    - osserva il traffico di rete
	    - più stealth
- con nmap
	- `-sV` = versione servizi  
	-  `-O` = sistema operativo
##### SMB enumeration
- protocollo di Windows per:
    - condivisione file
    - stampanti
    - risorse di rete
- usa porte:
    - **139** e **445**
- può esporre:
    - utenti
    - condivisioni
    - configurazioni
- `nmap -p 139,445 <ip>`
- con script:
    - `nmap --script smb* <ip>`
##### SMTP enumeration
- protocollo usato per l’invio delle email
- tipicamente su porta:
    - **25**
- comandi principali
	- **VRFY**
	    - chiede al server:
	        - “questo utente esiste?”
	    - esempio:
	        - `VRFY mario`
	- **EXPN**
	    - espande una mailing list
	    - restituisce tutti gli utenti nella lista
	- molti server moderni:
		- disabilitano VRFY / EXPN
		- oppure rispondono sempre in modo generico
#### Esercitazione
`ip -a` 
`sudo nmap -sP ip`
- scansione host
- `sudo nmap -sS indirizzo ip target -p-`
- `sudo nmap -sS indirizzo ip target -p- -Sv` 
	- `Sv` per fare una scansione più precisa
- `nc indirizzo ip porta`

