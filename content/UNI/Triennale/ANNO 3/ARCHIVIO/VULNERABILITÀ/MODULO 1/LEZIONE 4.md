nella scorsa lezione abbiamo visto che per fare **privilege escalation** ci sono 3 modalità (processo sistematico)
- **ENUMERATION**
- **FINDING ATTACK VECTORS**
- **EXPLOIT THEM**
ora vedremo
#### FINDING ATTACK VECTORS
- consiste nell’individuare **punti deboli concreti** del sistema sfruttabili
- è la fase in cui passo da “raccolgo informazioni” a “capisco cosa posso rompere”
- cosa differisce da enumeration:
    - **enumeration → raccolgo informazioni**
    - **finding attack vectors → interpreto quelle info per trovare vulnerabilità sfruttabili**  
        👉 è quindi una fase più **attiva e ragionata**, non solo osservativa
##### COSA SONO I KERNEL EXPLOIT
- sono programmi che attaccano **specifiche versioni vulnerabili del kernel**
- permettono di eseguire codice con privilegi elevati (tipicamente root)
- ci sono tool come `searchsploit`
    - per cercare exploit già presenti in database (Exploit-DB)
    - utile per capire **se la versione del kernel è vulnerabile**
⚠️ nota:
- vanno usati come **ultima scelta**
- possono essere:
    - instabili
    - rumorosi (log)
    - causare crash del sistema
###### dirty cow
- exploit famoso basato su race condition
- Due processi (o thread) “corrono” per accedere o modificare una risorsa
- permette di modificare file protetti
- nel caso tipico:
    - permette di modificare `/etc/passwd`
    - quindi posso creare un utente con privilegi root
- contro:
    - instabile
    - può crashare
    - lascia tracce nei log
###### cosa provare se abbiamo dei ruoli in più stranamente
👉 cioè: se abbiamo **permessi scrittura su file sensibili o privilegi elevati parziali**
- aggiungere un fake root account a `/etc/passwd`
    - `mkpasswd -1 1234`
        - genera la password `hashata`
    - ⚠️ forma corretta:
        - `echo "hacker:<hash>:0:0:root:/root:/bin/bash" >> /etc/passwd`
    - spiegazione:
        - UID = 0 → diventa root
        - quindi l’utente hacker è root
- modificare il file `/etc/sudoers`
    - `echo "eve ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers`
    - l’utente eve ora può:
        - `ALL`usare sudo da qualsiasi terminale
        - `(ALL)` eseguire comandi come qualsiasi utente (root incluso)
        - NON serve password
        - può eseguire qualsiasi comando/binario
- creare una copia di bash con SUID
    - cosa era il SUID?
        - quando un file ha il bit SUID:
            - 👉 viene eseguito con i **permessi del proprietario**
            - non dell’utente che lo esegue
		- comandi:
		    - `cp /bin/bash ~/myBash`
		    - `chmod 4777 ~/myBash` 
			- esecuzione:
			    - `~/myBash -p`
			        - `-p` → preserva i privilegi SUID
###### se non possiamo essere root direttamente possiamo provare a fare
- **password cracking**
    - scarico in locale:
        - `/etc/passwd`
        - `/etc/shadow`
    - poi uso tool come:
        - `john` (John the Ripper)
    - obiettivo:
        - recuperare password in chiaro
        - riutilizzarle per escalation (es. sudo, ssh)
- **Path Hijacking**
    - se uno script con privilegi elevati chiama un comando **senza path assoluto**
        - es: `cp`, `cat`, `python` invece di `/bin/cp`
    - posso:
        - creare un binario malevolo con lo stesso nome
        - metterlo in una directory con priorità più alta nel `$PATH`
            - es: `/home/vickie/bin`
    - quando lo script viene eseguito:  
        👉 esegue il mio comando invece di quello originale
    - idea chiave:
        - sfrutto l’ordine del PATH (precedenza delle directory)
- **Wildcard tricks**
    👉 sfruttano l’espansione dei caratteri speciali (`*`, `?`, ecc.)
- **abuso di sudo con path traversal**  
	- `sudo -l`  
		- lista i comandi eseguibili con sudo  
	- se posso usare un comando tipo:  
		- `/usr/bin/cat`  
	- posso provare:  
		```bash  
		/usr/bin/cat /opt/scripts/../../../../../etc/shadow  
		```  
	👉 uso `../` per uscire dalla directory consentita

- **7zip trick (file list injection)**  
	- creo un file:  
		```bash  
		touch @tosteal  
		echo "/etc/passwd" > tosteal  
		```  
	- comando vulnerabile:  
		```bash  
		7za a backup.7z -t7z -snl *  
		```  
	- cosa succede:  
		- `*` include anche `@tosteal`  
		- `7zip` interpreta `@file` come lista di file  
	👉 quindi legge `/etc/passwd` anche se non dovrebbe
- **bash script wildcard / input vulnerabilities**  
	- se uno script usa `*` in modo non sicuro:  
		- posso creare file con nomi “malevoli”  
	- esempio concettuale:  
		- confronto password fatto male  
		- oppure parsing input senza sanitizzazione  

- **python exploitation**
    - ci sono diverse tecniche di exploitation legate a python
    - **python2 – input vulnerability**
        - in python2 la funzione `input()` è pericolosa
        - interpreta direttamente l’input come codice
        - esempio:
            __import__('os').system('/bin/bash')
        👉 permette di eseguire comandi arbitrari (anche come root se lo script è privilegiato)
    - **module override (import hijacking)**
        - quando python fa:
            `import modulo`
        - cerca il modulo in questo ordine:
            1. directory corrente
            2. moduli built-in
            3. PYTHONPATH
            4. librerie standard
            5. site-packages
        👉 se riesco a scrivere in una directory “prima”:
        - posso creare un modulo malevolo con lo stesso nome
        - python importerà il mio codice
        👉 risultato:
        - esecuzione di codice con privilegi elevati
    - **python3 – script replacement**
        - se uno script python viene eseguito con sudo:
            `sudo python3 script.py`
        - e io posso modificarlo o sostituirlo:
            `import os`  
            `os.system('/bin/bash')`
        👉 ottengo una shell privilegiata
- **cronjobs**
    - task schedulati che vengono eseguiti automaticamente (spesso come root)
    - **script cronjob scrivibile**
        - se trovo uno script eseguito da `cron` con più privilegi:
            - e ho permessi di scrittura
        👉 posso modificarlo e far eseguire:  
        - comandi miei  
        - reverse shell  
        - aggiunta utente root  
        - SUID backdoor
    - idea chiave:
        - non devo “bucare” nulla
        - faccio eseguire al sistema il mio codice automaticamente
        - sfrutto i privilegi del proprietario del cronjob

- **insecure binary permissions**
    - alcuni binari di sistema hanno **permessi elevati** (SUID, SGID, sudo, capabilities)
    - servono per operazioni legittime (es. cambiare password)
    👉 problema:
    - se il binario permette:
        - shell escape
        - lettura/scrittura file arbitrari
    - può essere abusato per ottenere root
    - cose da controllare:
        - `sudo -l`
            - binari eseguibili come root
        - SUID binaries:
            ```bash
            find / -type f \( -perm -u+s -o -perm -g+s \) -exec 
            ls -l {} \; 2>/dev/null
            ```
        - capabilities:
            `getcap -r / 2>/dev/null`
    👉 idea:
    - trovare binari “potenti” e capire **come abusarli**
- **exploiting Capabilities**
    - le capabilities sono tipo:  
        👉 “root ma solo per una cosa specifica”
    - invece di dare root completo:
        - danno singoli privilegi (es. leggere file, cambiare uid)
    ⚠️ problema:
    - alcune capabilities sono **equivalenti a root**
- esempi importanti:  
- **cap_setuid**  
	- permette di cambiare UID (diventare root)  
	```bash  
	python3 -c 'import os; os.setuid(0); os.system("/bin/bash")'  
	```  
	👉 shell root   
- **cap_dac_read_search**  
	- permette di leggere file ignorando permessi  
	```bash  
	tar -czf /tmp/shadow.tar.gz /etc/shadow  
	```  
	👉 leggo `/etc/shadow`     
- **cap_dac_override**  
	- permette di bypassare controlli di accesso (scrittura inclusa)  
	```bash  
	vim /etc/passwd  
	```  
	👉 posso modificare file di sistema   
👉 idea chiave:  
- capabilities = “root-lite”  
- ma alcune → escalation completa
- **GTFOBins**
    - sito: [https://gtfobins.org/](https://gtfobins.org/)
    - contiene:
        - tecniche per sfruttare binari già presenti nel sistema
    - permette:
        - privilege escalation
        - file read/write
        - shell escape
