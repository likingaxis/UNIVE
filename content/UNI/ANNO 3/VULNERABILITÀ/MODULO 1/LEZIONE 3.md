### PRIVILEGE ESCALATION
- La **privilege escalation** è il processo con cui un attaccante sfrutta:
	- bug
	- errori di configurazione
	- vulnerabilità
	per ottenere **privilegi più elevati (tipicamente root)** rispetto a quelli iniziali
- `echo $SHELL`
	- stampa la shell di default dell’utente (es: /bin/bash)
	- utile per capire in che ambiente siamo
- `echo $0`
	- mostra il nome della shell/processo corrente
	- utile per capire se siamo in una shell ristretta o spawnata
- `bash`
	- avvia una nuova shell bash (se permesso)
- `/bin/bash`
	- esegue direttamente la bash dal path
	- utile se il comando `bash` è bloccato ma il path no
- `/bin/sh`
	- shell più minimale (spesso linkata a bash o dash)
	- può bypassare alcune restrizioni
- `vi`
	- editor di testo che permette anche esecuzione di comandi shell
- `vim`
	- versione avanzata di vi, stessa idea ma più potente
### Shell ristretta
- una **restricted shell (rbash, bash --restricted)** limita:
	- esecuzione di comandi
	- cambio directory
	- uso di path assoluti
- viene usata per limitare ciò che può fare un utente compromesso
### Escape dalla restricted shell
- `vi -c '!/bin/bash'`
	- apre vi ed esegue direttamente `/bin/bash`
	- permette di uscire dalla restricted shell
- nano:
	- `CTRL + T` → permette di eseguire comandi esterni
	- `CTRL + C` per uscire
	- può essere abusato per ottenere una shell
- Python:
	- `python3 -c "import pty; pty.spawn('/bin/bash')"`
	- crea una **TTY interattiva**
	- utile per avere una shell stabile
- `script -qc /bin/bash /dev/null`
	- crea una nuova shell interattiva tramite il comando `script`
	- NON è per keylogging qui, ma per ottenere una TTY completa
### Bypass restrizioni sui comandi
- se i binari sono filtrati:
	- `/bin/b?sh`
	- `/bin/b[a]sh`
		- uso wildcard per bypassare controlli semplici
- variabili:
	- `p${u}i${u}n${u}g`
		- `${u}` viene espansa (anche vuota)
		- serve per offuscare il comando
- history trick:
	- `mi`
	- `whoam`
	- `!-1!-2`
		- concatena comandi precedenti → `whoami`
- concatenazione caratteri:
	- `w'u'h'u'o'u'a'u'm'u'i`
		- bypass di filtri semplici
### Bypass degli spazi (molto importante)
- `cat${IFS}/etc/passwd`
	- `IFS` = Internal Field Separator (spazio)
	- usato quando lo spazio è bloccato
- `IFS=];b=/bin/bash];$b`
	- cambio IFS in `]`
	- quando si usa `]` viene interpretato come separatore (tipo spazio)
- `{cat,lol.txt}`
	- espansione bash → `cat lol.txt`
- `cat</etc/passwd`
	- uso redirect invece dello spazio
### Encoding / offuscamento
- esadecimale:
	- `$'\x2f\x62\x69\x6e\x2f\x6c\x73'`
		- rappresenta `/bin/ls`
- variabile:
	- `X=$'\x63\x64\x20\x2e\x2e'; $X`
		- esegue `cd ..`
- tool:
	- CyberChef → utile per convertire stringhe in hex
- riferimento:
	- https://www.verylazytech.com/linux/bypassing-bash-restrictions-rbash
## 🔥 Processo di Privilege Escalation
- **ENUMERATION**
	- raccolta di tutte le informazioni sul sistema target
- **FINDING ATTACK VECTORS**
	- identificazione di vulnerabilità o misconfigurazioni
- **EXPLOIT THEM**
	- sfruttamento delle vulnerabilità trovate per ottenere privilegi
## 🔍 ENUMERATION
### MOTD
- Message Of The Day
	- messaggio mostrato al login (es: ssh)
- può contenere info utili:
	- IP interni
	- credenziali riutilizzabili
- comandi:
	- `cat /etc/motd`
	- `cat /etc/update-motd.d/*`
### Informazioni del SO
- servono per:
	- capire vulnerabilità note
	- trovare exploit compatibili
- `uname -a`
	- mostra:
		- kernel
		- architettura
		- hostname
		- info complete sistema
- altri comandi utili:
	- `uname -r` → versione kernel
	- `uname -m` → architettura
	- `cat /etc/*release`
	- `cat /proc/version`
	- `lsb_release -a`
### Informazioni interessanti (base)
- utente:
	- `whoami`
	- `id`
	- `groups`
- utenti e shell:
	- `cat /etc/passwd | grep "sh$"`
- history:
	- `cat ~/.bash_history`
		- può contenere password o comandi sensibili
- env:
	- `printenv`
	- `echo $PATH`
- shell disponibili:
	- `cat /etc/shells`
- hostname:
	- `hostname`
- linguaggi disponibili:
	- `which python`
	- `which python3`
	- `which perl`
##### TROVARE I FILE SCRIVIBILI DA QUEL DETERMINATO UTENTE
- `find / -type -f....  a slide 18`
	- cerca i file dal root in poi solo scrivibili...
- `who`
	- mostra le sessioni attive
- `last`
	- ultime sessioni di login
- `cat /var/log/auth.log`
	- log di autorizzazione particolari
- `sudo -l`
	- ti dice cosa può fare quel determinato utente come root
- `find -type f a slide 20`
	- trova i file eseguibili con SUID
#### ENUMERATION- FASE DI ANALISI DEI PROCESSI
- `ps aux`
	- tipo gestione attività
- `ps aux | cat | grep "processo"`
	- 
- `pidof "path del processo"`
	- pid di un certo path
- `isof -i -n -P`
	- lista dele risorse usate da un processo
- `netstat -tulpn`
	- bho
- `top`
	- fa vedere i processi in ordine di sbers
- `cronotab`
- `cronjobs`

#### ENUMERATION MYSQL
#### ENUMERATION CRONJOBS
#### ENUMERATION CAPABILITIES
- creazione di un sottoinsieme di privilegi da assegnare a dei processi
- inherited
- effective
- permitted
- bounding
- ambient 
- facendo getcap -r / 2> dev/null
	- possiamo vedere le capabilities delle varie cose 
#### PROGRAMMI DI SCRIPT AUTOMATIZZATI
- `linpeas` script che in modo automatico fa tutta la enumeration 
	- fa una serie di operazioni che abbiamo visto anche oggi
- `pspy`
- sono belli ma rumorosi
	- non conviene usarli subito
