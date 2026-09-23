---
title: "Benchmark — Macchine e Scenari"
---


- [x] GitPoison 172.17.0.7
- [x] TunnelGate 172.17.0.8
- [ ] NetVault 172.17.0.9









# Benchmark delle Macchine Vulnerabili (Boot2Root)

Panoramica schematica di tutte le macchine create nel generatore **VulcaForge** e di quelle pianificate per coprire l'intero programma pratico d'esame.

---

## 1. Tabella Riassuntiva di Confronto

|   #    | Macchina        | Tipo / Servizio     | Foothold (Initial Access)                   | Lateral Movement                           | Privilege Escalation (Root)                    |    Stato    |
| :----: | --------------- | ------------------- | ------------------------------------------- | ------------------------------------------ | ---------------------------------------------- | :---------: |
| **1**  | **Pizzeria**    | Web PHP / Nginx     | Info disclosure (`/opt/test.sh`)            | Passaggio a `franchino`                    | Sudo editor (`sudo nano /etc/passwd`)          | Realizzata  |
| **2**  | **AuthGate**    | Web Portal + SSH    | Leak utenti/pass -> Hydra bruteforce SSH    | Chiave SSH permessi deboli (`id_rsa`)      | Sudo shell escape (`sudo vi`)                  | Realizzata  |
| **3**  | **Citadel**     | Web PHP Multi-tier  | SQLi login bypass + Command Injection       | Cronjob `/opt/backup.sh`                   | SUID PATH Hijacking                            | Realizzata  |
| **4**  | **DataVault**   | Web Upload Portal   | File upload con MIME / Content-Type bypass  | —                                          | Linux Capabilities (`cap_setuid` su Python3)   | Realizzata  |
| **5**  | **WebMaster**   | CMS Web PHP         | LFI con wrapper PHP (`php://filter/base64`) | —                                          | Linux Capabilities (`cap_setuid` su Python3)   | Realizzata  |
| **6**  | **CryptoVault** | Servizio Backup SSH | Credenziali fornite (`student:student123`)  | Reversing script XOR (`decrypt.py`)        | SUID PATH Hijacking (`tar`)                    | Realizzata  |
| **7**  | **ConsoleGate** | Demone TCP grezzo   | High-port (20000) banner grabbing & auth    | —                                          | Python Module Hijacking via Cronjob root       | Realizzata  |
| **8**  | **PrivAudit**   | Linux Dev System    | Credenziali fornite (`student:student123`)  | Leak credenziali in `.bash_history`        | Sudo Git pager escape (`sudo git help config`) | Realizzata  |
| **9**  | **NetVault**    | DNS Server + Web    | DNS AXFR (Zone Transfer) + VHost            | Archivio protetto (`7z2john` + John Rules) | Scrittura diretta `/etc/passwd` (`openssl`)    | Pianificata |
| **10** | **GitPoison**   | Web App / Dev       | Exposed `.git` dump + Hydra Web Form        | —                                          | LFI to RCE via Apache Log Poisoning            | Pianificata |
| **11** | **TunnelGate**  | Portale Interno     | Web wrapper / SSH base (`trainee`)          | SSH Local Port Forwarding (`ssh -L`)       | Dump hash, `unshadow` e Shadow group           | Pianificata |

---

## 2. Dettaglio delle Macchine Realizzate (8)

### 🍕 1. Pizzeria
- **Scenario:** Portale web di una pizzeria (*Chepizzachiama*) con script di manutenzione dimenticato.
- **Foothold:** Esplorazione web e individuazione di credenziali hardcoded in chiaro nello script `/opt/test.sh`.
- **Lateral Movement:** Switch all'utente `franchino` (`franchinopizzaiolo123!`).
- **Privilege Escalation:** Regola sudo `sudo /bin/nano /etc/passwd` che consente la modifica arbitraria del file delle password o l'escape via GTFObins (`^R^X`).
- **Flag:** `/home/user/user.txt`, `/root/root.txt`.
- **Competenze:** Web inspection, credential hunting in script, GTFObins sudo text editor.

---

### 🛡️ 2. AuthGate
- **Scenario:** Bastion host e gateway di autenticazione aziendale a più livelli.
- **Foothold:** Discovery web dei file `staff.txt` e `passwords.txt`, seguito da brute-force SSH con **Hydra** per l'utente `operator`.
- **Lateral Movement:** Nel profilo di `operator` è presente una chiave SSH privata (`id_rsa`) con permessi permissivi (`0644`), valida per il login come `sysadmin`.
- **Privilege Escalation:** L'utente `sysadmin` ha permessi `sudo /usr/bin/vi`, sfruttabile per l'uscita in shell root (`:!/bin/bash`).
- **Flag:** `/home/sysadmin/user.txt`, `/root/root.txt`.
- **Competenze:** Hydra SSH bruteforce, SSH key permission abuse, GTFObins `sudo vi`.

---

### 🏰 3. Citadel
- **Scenario:** Portale centrale di difesa militare ("The Grand Master Challenge") con catena d'attacco completa.
- **Foothold:** SQL Injection nel login di amministrazione (`' OR '1'='1`) seguita da Command Injection (`ping` utility in `diagnostic.php`) per ottenere RCE come `developer`.
- **Lateral Movement:** Cronjob periodico di root/sysadmin che esegue `/opt/backup.sh`, sfruttabile per passare a `sysadmin`.
- **Privilege Escalation:** Binario custom con SUID attivo (`/usr/local/bin/citadel_report`) che richiama comandi senza percorso assoluto, vulnerabile a PATH Hijacking verso root.
- **Flag:** `/home/developer/user.txt`, `/home/sysadmin/user2.txt`, `/root/root.txt`.
- **Competenze:** SQLi Auth Bypass, Command Injection, Cron lateral move, SUID PATH Hijacking.

---

### 📦 4. DataVault
- **Scenario:** Sistema di archiviazione dati aziendale con upload file asincrono.
- **Foothold:** Portale di upload file su `upload.php` con filtro di estensione debole e validazione MIME/Content-Type bypassabile con proxy HTTP (Burp Suite), ottenendo shell come `www-data`.
- **Privilege Escalation:** Linux Capability `cap_setuid+ep` impostata sull'interprete `/usr/bin/python3`, che permette l'elevazione istantanea a root tramite `os.setuid(0)`.
- **Flag:** `/var/www/user.txt`, `/root/root.txt`.
- **Competenze:** File Upload bypass (Content-Type spoofing), Linux Capabilities (`getcap`).

---

### 🌐 5. WebMaster
- **Scenario:** CMS aziendale per gestione contenuti con supporto a moduli dinamici.
- **Foothold:** Local File Inclusion (LFI) sul parametro `view.php?file=...` sfruttando i PHP Wrappers (`php://filter/read=convert.base64-encode/resource=...`) per leggere i sorgenti PHP, combinata con upload bypass.
- **Privilege Escalation:** Linux Capabilities su Python3 (`cap_setuid+ep`) per ottenere root shell.
- **Flag:** `/var/www/user.txt`, `/home/webmaster/user.txt`, `/root/root.txt`.
- **Competenze:** LFI, PHP stream filters (Base64 encoding), Linux Capabilities.

---

### 🔐 6. CryptoVault
- **Scenario:** Server centrale per backup cifrati e gestione chiavi con accesso SSH base.
- **Foothold:** Accesso iniziale SSH fornito allo studente (`student:student123`).
- **Lateral Movement:** Analisi del file cifrato `/opt/vault/backup.enc` e reverse engineering dello script Python `/opt/vault/decrypt.py` (cifrario XOR) per estrarre la password di `vault_admin`.
- **Privilege Escalation:** Binario SUID `/usr/local/bin/vault_backup` che invoca `tar` con percorso relativo; privesc a root tramite PATH Hijacking.
- **Flag:** `/home/vault_admin/user.txt`, `/root/root.txt`.
- **Competenze:** Linux local enum, reverse engineering script/XOR crypto, SUID PATH Hijacking.

---

### 📡 7. ConsoleGate
- **Scenario:** Gateway industriale di telemetria con porta di controllo remota non documentata.
- **Foothold:** Scansione porte alte con Nmap (`-p-`) che rivela un demone su porta TCP 20000; interazione grezza via `nc` con banner grabbing e autenticazione console per ricavare credenziali dell'utente `operator`.
- **Privilege Escalation:** Cronjob eseguito da root (`cleanup.py`) situato in una cartella con permessi di scrittura per il gruppo `operator`. L'inclusione del modulo `random` permette un **Python Module Hijacking** creando un file malevolo `random.py`.
- **Flag:** `/home/operator/user.txt`, `/root/root.txt`.
- **Competenze:** High-port scanning, raw socket/netcat interaction, Cron monitoring (`pspy`), Python Library Hijacking.

---

### 📜 8. PrivAudit
- **Scenario:** Macchina di collaudo per sviluppatori con cronologia comandi attiva.
- **Foothold:** Accesso SSH iniziale con utente `student:student123`.
- **Lateral Movement:** Enumerazione post-compromissione e lettura del file `/home/student/.bash_history`, che rivela la password dell'utente `developer`.
- **Privilege Escalation:** Regola sudo `sudo git help config` che avvia il pager di sistema (`less`); escape interattivo eseguendo `!/bin/bash` con privilegi di root.
- **Flag:** `/home/developer/user.txt`, `/root/root.txt`.
- **Competenze:** Linux history credential leak, GTFObins `sudo git` pager escape.

---

## 3. Dettaglio delle Macchine Pianificate (3)

Queste 3 macchine sono progettate per colmare i concetti rimanenti del syllabus d'esame.

### 🌍 9. NetVault
- **Obiettivo Didattico:** Network Recon su DNS, cracking di archivi con regole John e scrittura diretta su `/etc/passwd`.
- **Foothold:**
  1. Scansione DNS e **Zone Transfer AXFR** (`dig @target domain axfr`) per mappare i sottodomini interni e individuare record `TXT` informativi.
  2. Fuzzing Virtual Host con `wfuzz` / `gobuster vhost` per raggiungere il sito interno `backup.corp.vdsi` e scaricare un archivio `backup.7z`.
- **Lateral Movement:**
  1. Estrazione hash archivio con `7z2john`.
  2. Generazione wordlist con `cewl` e creazione di una regola personalizzata per John the Ripper (`rules.conf` con sintassi `[List.Rules:E04]` con trasposizioni e suffissi).
  3. Cracking e recupero credenziali/chiavi SSH per l'utente `operator`.
- **Privilege Escalation:** File `/etc/passwd` con permessi di scrittura (`0666` o gruppo); privesc creando un hash con `openssl passwd -6` e inserendo un utente UID 0 (`backdoor:...:0:0:... >> /etc/passwd`).

---

### 🕵️ 10. GitPoison
- **Obiettivo Didattico:** Web enumeration avanzata, dump di sorgenti Git, Hydra web form e Apache Log Poisoning LFI.
- **Foothold:**
  1. Directory enumeration con `gobuster -x php` o `feroxbuster` che individua un repository `.git` esposto.
  2. Recupero del codice sorgente tramite `git_dumper.py` e ispezione dei vecchi commit per trovare endpoint nascosti e lista utenti.
  3. Brute-force del form di login con Hydra (`http-post-form`).
  4. LFI presente nell'area admin senza possibilità di upload file: sfruttamento dell'**Apache Log Poisoning** (invio payload PHP nell'header `User-Agent` e inclusione di `/var/log/apache2/access.log`) per ottenere una reverse shell.
- **Privilege Escalation:** Ispezione dei processi periodici con `pspy64` e privesc con binario GTFObins (es. `sudo mawk` o `crontab_writable`).

---

### 🚇 11. TunnelGate
- **Obiettivo Didattico:** SSH Local Port Forwarding, cracking di hash `/etc/shadow` e permessi di gruppo.
- **Foothold:**
  1. Accesso iniziale via SSH con utente a bassi privilegi (`trainee`).
  2. Analisi porte con `netstat -tulpn` che rivela un portale di gestione interno vincolato su `127.0.0.1:8080`.
  3. Creazione di un tunnel **SSH Local Port Forwarding** (`ssh -L 8080:127.0.0.1:8080 trainee@target`) per accedere al portale dal browser dell'attaccante.
- **Lateral Movement:**
  1. Download dal portale interno di file di backup contenenti `passwd.txt` e `shadow.txt`.
  2. Identificazione dell'algoritmo hash con `hashid` (`$6$` SHA-512 o `$y$` yescrypt).
  3. Esecuzione di `unshadow passwd.txt shadow.txt > unshadowed.txt` e cracking con John (`john --wordlist=rockyou.txt`).
- **Privilege Escalation:** L'utente amministratore fa parte del gruppo speciale `shadow` (o ha una regola `sudo socat`), permettendo la lettura/modifica diretta delle credenziali di root.
