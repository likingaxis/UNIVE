# 01 — COSA STUDIARE & ROADMAP DI SQUADRA
### Hackathon Blue Team · CNIT NAM Lab · Università di Roma "Tor Vergata"
> Documento di preparazione pre-gara per **Luca, Davide, Alfredo**.
> Obiettivo: capovolgere il paradigma da **Red Team (boot-to-root)** a **Blue Team (remediation a caldo con preservazione dell'uptime)**.
> Regola sovrana da tenere a mente in ogni riga di questo documento: `Punteggio = (Vuln Corrette) × (% Uptime)`. **Una patch che rompe un servizio vale zero.**

---

## INDICE
1. [Sezione 1 — Argomenti Noti da Ripassare (Baseline Esame)](#sezione-1)
2. [Sezione 2 — Argomenti Extra & Nuova Superficie d'Attacco (Specifici CNIT)](#sezione-2)
3. [Sezione 3 — Matrice di Ripartizione dei 3 Ruoli](#sezione-3)
4. [Appendice — Piano di studio a 2 settimane](#appendice)

---
<a name="sezione-1"></a>
## SEZIONE 1 — ARGOMENTI NOTI DA RIPASSARE (Baseline Esame Triennale)

Il team padroneggia già queste competenze (da `FILE UTILE PER LE ESERCITAZIONI.md` e `REPORT UTILITY.md`). **In gara NON servono più per attaccare, ma per due scopi difensivi:**
1. **Pensare come l'attaccante** → sapere *dove* cercare le falle che lo scorebot sfrutterà.
2. **Costruire il POC locale** (Fase 2 della metodologia) → riprodurre l'attacco su un terminale secondario per avere la *prova* che la patch funziona.

> [!IMPORTANT]
> **Capovolgimento mentale**: ogni tecnica offensiva che conoscete diventa un *checklist di hunting*. Se sapete come si sfrutta un SUID, sapete come trovarlo e neutralizzarlo.

### 1.1 Recon & Enumerazione (Nmap, banner grabbing)
| Competenza | Comando esame (offensivo) | Uso difensivo in gara |
| :--- | :--- | :--- |
| Port scan | `nmap -sC -sV -sS <ip>` | Mapparsi **da soli** per sapere cosa vede lo scorebot/avversario. Confronto con `ss -tulpn` locale |
| Banner grabbing | `nc <ip> <porta>` | Catturare il banner "sano" da preservare (Fase 0 baseline) |
| Enumerazione servizi | `systemctl`, `ps aux` | Distinguere servizio legittimo da demone sospetto |

**Da ripassare**: lettura output `nmap`, significato di `-sV` (versioni → CVE note), differenza tra porta filtrata/chiusa/aperta.

### 1.2 Web Recon & Exploitation (SQLi, LFI/RFI, Command Injection, Webshell)
Conoscenze dall'esame (sezione *Web Exploitation*): `' OR '1'='1`, LFI `?page=../../../etc/passwd`, PHP wrapper (`php://filter`, `data://`), poisoning dei log, webshell `<?php system($_GET['cmd']); ?>`, upload bypass via `Content-Type`.

| Vettore noto | Dove si nasconde nella VM | Come lo userete per il POC |
| :--- | :--- | :--- |
| SQL Injection | Form di login, parametri GET/POST | Riprodurre `' OR '1'='1` sul target locale per confermare la falla |
| LFI / Path Traversal | Parametri `?page=`, `?file=` | `curl "http://127.0.0.1/?page=../../../../etc/passwd"` |
| Command Injection | Campi che eseguono comandi (ping, lookup) | `;id`, `";id"` |
| Webshell / Upload | `/var/www/html/uploads/`, file `.php` recenti | `grep -rnE "(system\|exec\|shell_exec\|passthru\|eval\|base64_decode)" /var/www/` |

**Da ripassare**: i wrapper PHP, la tecnica del log poisoning (serve per capire *dove* un attaccante scrive), MIME bypass.

### 1.3 Password & Hash (John, Hashid, Unshadow, Hydra)
- `unshadow /etc/passwd /etc/shadow`, `john --wordlist=rockyou.txt`, tabella prefissi hash (`$6$`=SHA-512, `$y$`=yescrypt).
- Bruteforce online: `hydra -L users -P pass <ip> ssh/ftp/http-post-form`.

**Uso difensivo**:
- **Audit delle password deboli nella VM**: se trovate un hash debole in `/etc/shadow` o in un DB, è una vulnerabilità da sanare (forzare cambio password / rimuovere account).
- **Fail2ban + rate-limiting** (vedi Sezione 2) è la risposta difensiva all'Hydra che lo scorebot/avversario lancerà contro SSH e i form di login.

### 1.4 Privilege Escalation classica (SUID/SGID, sudo, cron, capabilities, PATH hijacking)
Il cuore del vantaggio del team. Dall'esame conoscete:
- SUID: `find / -perm -u=s -type f 2>/dev/null` + GTFOBins.
- Capabilities: `getcap -r / 2>/dev/null`.
- Sudo permissivo: `sudo -l`, `/etc/sudoers.d/*` con `NOPASSWD`.
- Cronjob scrivibili: `pspy64`, `/etc/cron*`, `/var/spool/cron/crontabs/`.
- PATH hijacking su binari SUID che chiamano comandi senza path assoluto.
- Aggiunta utente backdoor in `/etc/passwd` (openssl passwd -6).

> [!NOTE]
> **Questa è la vostra arma segreta difensiva.** Gli organizzatori (docenti del corso) inseriranno quasi certamente catene di privesc che voi conoscete a memoria. Sapere *esattamente* come si sfruttano = saperle trovare e disinnescare in secondi. La Sezione 2 aggiunge *come neutralizzarle senza spegnere nulla*.

---
<a name="sezione-2"></a>
## SEZIONE 2 — ARGOMENTI EXTRA & NUOVA SUPERFICIE D'ATTACCO (Specifici dei Docenti CNIT NAM Lab)

Gli organizzatori sono i ricercatori del **NAM Lab** (Bianchi, Quaglia, Pellegrini, Caporaso, Tulumello, Detti, ecc.). La loro ricerca va **oltre** le sfide web da esame: kernel Linux, eBPF/XDP, memory safety, sandboxing dei demoni, data-plane ad alte prestazioni. Questi sono gli argomenti **nuovi** da studiare, tutti orientati alla **difesa a zero-downtime**.

### 2.1 Confinamento dei servizi con Systemd ⭐ [PRIORITÀ P0 — INDISPENSABILE]
**Perché è decisiva**: se un demone (C/Python/web) ha una RCE o un buffer overflow che **non potete correggere nel sorgente in tempo**, lo **ingabbiate** con direttive systemd. L'exploit continua a "partire" ma non può più toccare l'OS, aprire shell o scrivere file → la batteria d'attacco fallisce, e il servizio resta **up**.

Override da creare in `/etc/systemd/system/<servizio>.service.d/override.conf`:
```ini
[Service]
NoNewPrivileges=true          # il processo e i figli non possono acquisire nuovi privilegi (uccide i SUID-escalation)
ProtectSystem=strict          # tutto il filesystem è read-only tranne path esplicitamente concessi
ProtectHome=true              # /home, /root, /run/user invisibili
PrivateTmp=true               # /tmp e /var/tmp privati e isolati (uccide il tmp-staging di payload)
ProtectKernelTunables=true    # /proc/sys, /sys read-only
ProtectKernelModules=true     # vieta load/unload di moduli kernel
SystemCallFilter=@system-service  # seccomp allowlist: solo syscall "normali", blocca exec esotiche
CapabilityBoundingSet=        # azzera tutte le capabilities (poi riaggiungere solo quelle necessarie)
RestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX  # niente socket esotici
```
Applicazione **senza downtime percepibile**:
```bash
systemctl daemon-reload
systemctl restart <servizio>   # restart < 1s; se il servizio è stateless, lo scorebot non lo nota
```
> [!WARNING]
> `ProtectSystem=strict` rende read-only anche le dir dove il servizio scrive (log, cache, upload, socket). **DEVI** aggiungere `ReadWritePaths=/var/lib/app /var/log/app` per quelle, altrimenti rompi il servizio → tick rosso. Testa SEMPRE con la validazione incrociata (Fase 4) prima di notificare.

**Da studiare (dossier Luca #2, Davide #3, Alfredo #2)**: `https://systemd.io/SANDBOXING/`, le direttive `ReadWritePaths`, `RestrictSUIDSGID`, `MemoryDenyWriteExecute`, e Firejail come alternativa (`firejail --seccomp --noexec=/tmp`).

### 2.2 Egress Filtering con iptables/nftables ⭐ [PRIORITÀ P0 — INDISPENSABILE]
**Perché è decisivo**: la maggior parte degli exploit automatici termina con una **reverse shell** verso l'attaccante. Se bloccate il traffico **in uscita** non autorizzato, l'exploit "riesce" ma la shell non si connette mai → attacco neutralizzato, e il traffico **in ingresso** dello scorebot resta intatto (uptime salvo).

```bash
# Permetti connessioni già stabilite (le risposte ai check in ingresso) e DNS
iptables -A OUTPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT
iptables -A OUTPUT -p udp --dport 53 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 53 -j ACCEPT
# Blocca le NUOVE connessioni in uscita dell'utente del web server (reverse shell da www-data)
iptables -A OUTPUT -m owner --uid-owner www-data -m state --state NEW -j DROP
```
> [!IMPORTANT]
> **Perché `-m owner --uid-owner www-data` e non un DROP globale?** Un DROP globale sull'OUTPUT rischia di bloccare traffico legittimo del sistema o le risposte ai check → tick rosso. Filtrare **per utente** colpisce solo il processo compromesso. Questo è il principio chirurgico della gara.

**Da studiare (Luca #7, Davide #8, Alfredo #9)**: policy default-DROP ragionata, modulo `string` per droppare payload noti (`-m string --string "/bin/sh" --algo bm -j DROP`), rate-limiting con `-m recent` e `hashlimit`, `fail2ban` su SSH. Differenza stateful (`conntrack`) vs stateless.

### 2.3 Attributi immutabili del filesystem (chattr +i / +a) ⭐ [PRIORITÀ P0 — INDISPENSABILE]
**Perché è decisivo**: impedisce il deposito di webshell e la persistenza anche se l'attaccante ottiene scrittura.
```bash
# Congela i file di sistema critici (nessun utente, neanche root, può modificarli finché +i è attivo)
chattr +i /etc/passwd /etc/shadow /etc/sudoers
# Congela la webroot statica: HTTP continua a SERVIRE (lettura ok), ma nessuno può scrivere webshell
chattr -R +i /var/www/html
# Sblocca SUBITO le directory dove l'app scrive (upload/cache/sessioni) per evitare errori 500:
chattr -R -i /var/www/html/uploads/ /var/www/html/cache/ 2>/dev/null
# Log in modalità append-only (si può scrivere in coda ma non alterare/cancellare)
chattr +a /var/log/app/access.log
```
> [!WARNING]
> Se l'applicazione **deve** scrivere in una cartella (upload legittimi, cache, sessioni PHP), **non** congelarla con `+i` o la romperai. Congela solo ciò che è realmente statico. Per sbloccare: `chattr -i <file>`.

**Da studiare (Davide #1)**: `https://linux-audit.com/linux-file-protection-with-chattr/`, differenza `+i` (immutable totale) vs `+a` (append-only, ideale per log), verifica con `lsattr`.

### 2.4 Process & ephemeral execution hunting (pspy64) ⭐ [PRIORITÀ P0 — INDISPENSABILE]
**Perché è decisivo**: i cronjob malevoli e i processi effimeri (che partono e muoiono tra un `ps` e l'altro) sono invisibili ai tool classici. `pspy64` li intercetta **senza root**.
```bash
./pspy64 -p -i 1000 > /tmp/pspy.log 2>&1 &   # -p mostra anche le mappe processi, -i polling 1s
```
Obiettivo: **distinguere i cronjob dello scorebot** (che girano ogni 2 min = 1 tick e NON vanno toccati) **dai cronjob malevoli** (che droppano payload, aproprono shell, ricreano backdoor). I secondi si neutralizzano rimuovendo lo script/crontab e congelando la dir con `chattr +i`.

### 2.5 Hardening Web/Proxy Nginx & SQLi/LFI Remediation 🔹 [PRIORITÀ P1 — FREQUENTE]
- Disabilitare esecuzione script nelle dir di upload in Nginx:
```nginx
location /uploads/ {
    location ~ \.(php|phar|sh|py|cgi)$ { deny all; }
}
```
- Disabilitare wrapper pericolosi in `php.ini`: `allow_url_include = Off`.
- Sostituzione query SQL concatenate con query parametrizzate (`PDO::prepare`, `cursor.execute(..., (?,))`).
- `nginx -t && systemctl reload nginx` → **reload a caldo, zero downtime** (le connessioni esistenti non cadono).

### 2.6 Memory safety dei binari & Checksec 🔹 [PRIORITÀ P1 — DA ISOLARE]
Campo del **Prof. Quaglia** e del **Dott. Caporaso**. Attesi: demoni C con buffer overflow, format string, race condition.
- **Triage**: `checksec --file=<daemon>` (canary? NX? PIE? RELRO?), `objdump -d | grep -E "strcpy|gets|sprintf"`, `strace -f` per vedere syscall anomale, `ltrace` per estrarre password hardcoded e `strcmp`.
- **Difesa primaria senza toccare il sorgente** = **sandboxing systemd (2.1)** + **egress filtering (2.2)**. Se il sorgente c'è: `gcc -fstack-protector-all -D_FORTIFY_SOURCE=2 -Wl,-z,relro,-z,now -fPIE -pie`.
- `sysctl -w kernel.randomize_va_space=2` (ASLR pieno), `fs.suid_dumpable=0`.

### 2.7 Docker Container Breakouts & Socket Privileges 🔹 [PRIORITÀ P1 — VETTORE PELLEGRINI/DETTI]
- **Triage**: verificare permessi su `/var/run/docker.sock` e membri del gruppo `docker` (`getent group docker`).
- Se un container monta `/var/run/docker.sock` o il filesystem `/host`, o gira con `--privileged`, permette triviale host takeover.
- **Difesa**: `chmod 660 /var/run/docker.sock`, rimuovere utenti sospetti dal gruppo docker (`gpasswd -d <user> docker`), drop delle capabilities non necessarie nei container.

### 2.8 eBPF / XDP & Monitoraggio Basso Livello 🔸 [PRIORITÀ P2 — EDGE CASE AVANZATO]
Campo di ricerca del **Prof. Bianchi** e del **Dott. Tulumello**. Attesi: programmi eBPF malevoli caricati nel kernel (sniffer nascosti, hook), pacchetti anomali per DoS, saturazione delle porte.
- **Difesa**: `bpftool prog list` / `bpftool prog show` per elencare programmi eBPF caricati (un programma sconosciuto = sospetto). `tc filter show dev <iface>` e `ip link` per ispezionare i filtri sulle interfacce. `sysctl -w kernel.unprivileged_bpf_disabled=1` per bloccare il load di eBPF da utenti non privilegiati.
- **Da studiare**: `bpftool`, i comandi `tc`, e la CVE-2023-2163 (eBPF verifier pruning flaw, nel dossier Luca).

### Riepilogo CVE "firma dei docenti" (dai dossier)
Non per impararle a memoria, ma per riconoscere la *categoria* se compaiono: **PwnKit** (CVE-2021-4034, pkexec), **Baron Samedit** (CVE-2021-3156, sudo), **Dirty Pipe** (CVE-2022-0847, kernel), **runc escape** (CVE-2019-5736), **Log4Shell** (CVE-2021-44228), **HTTP/2 Rapid Reset** (CVE-2023-44487). Se la VM monta un pacchetto vulnerabile → **upgrade del pacchetto** è spesso la patch più pulita e non-distruttiva.

---
<a name="sezione-3"></a>
## SEZIONE 3 — MATRICE DI RIPARTIZIONE DEI 3 RUOLI

Divisione pensata per coprire **in parallelo** l'intera superficie d'attacco senza pestarsi i piedi sul terminale. Ogni membro ha un perimetro, le sue risorse di studio (dai dossier) e i suoi comandi-chiave di Fase 0/1.

> [!NOTE]
> Regola d'oro operativa: **un solo membro scrive su un dato file/servizio alla volta.** Comunicate le modifiche ad alta voce. Un secondo terminale per membro serve per il POC offensivo (Fase 2/4).

### 🛡️ MEMBRO 1 — Host Hardening, FS Integrity & Systemd Confinement *(es. Luca)*
**Perimetro**: utenti, SUID/SGID, capabilities, sudoers, cron, file immutabili (`chattr`), SSH/PAM config, confinamento systemd dei demoni, moduli kernel.

**Priorità iniziale (Fase 0-1)**:
```bash
tar -czf /root/_SNAPSHOT_INIT/etc_backup.tar.gz /etc/ 2>/dev/null; chattr +i /root/_SNAPSHOT_INIT/*.tar.gz
find / -perm -4000 -type f -exec ls -la {} + 2>/dev/null      # audit SUID
getcap -r / 2>/dev/null                                        # audit capabilities
cat /etc/sudoers /etc/sudoers.d/* 2>/dev/null                  # sudoers permissivi
chattr +i /etc/passwd /etc/shadow /etc/sudoers                 # congela identità
```
**Risorse assegnate (dossier Luca)**: `strace` (hunting syscall), `systemctl`/systemd SANDBOXING, `docker` hardening, detection rootkit LKM (`insmod`/`rmmod`), ASLR. Pratica: TryHackMe *Baron Samedit*, *Boiler Plate*, HTB *Bashed*, *Networked*.
**CVE focus**: Baron Samedit (sudo), eBPF verifier, Log4Shell, runc escape.

### 🌐 MEMBRO 2 — Network Perimeter, Egress Filtering, eBPF & Traffic Hunting *(es. Davide)*
**Perimetro**: porte aperte (`ss`), firewall ingress/egress (`iptables`/`nftables`/`ufw`), reverse shell detection, `tcpdump`/`ngrep`, traffic control (`tc`), eBPF monitoring, fail2ban.

**Priorità iniziale (Fase 0-1)**:
```bash
ss -tulpn > /root/_SNAPSHOT_INIT/baseline_ports.txt           # baseline porte
lsof -iTCP -sTCP:LISTEN -P -n                                  # processi in ascolto
tcpdump -nn -i any not port 22 -w /tmp/baseline_traffic.pcap & # cattura baseline
# predisponi le regole egress (NON attivare DROP finché non hai mappato il traffico legittimo)
```
**Risorse assegnate (dossier Davide)**: `iptables`/`nftables` (DDoS protection), `tc`, `nmap` difensivo, `scapy`, OWASP ZAP/API Top 10, Envoy. GEF/pwndbg, `readelf`, AFL++. Pratica: THM *PwnKit*, *Blue*, HTB *Lame*, *Stratosphere*, Snort/Zeek.
**CVE focus**: Dirty Pipe, Sequoia, HTTP/2 Data Dribble, runc.

### 🕸️ MEMBRO 3 — Web Applications, Backend Daemons & Memory Safety/Binaries *(es. Alfredo)*
**Perimetro**: web server (Nginx/Apache), web app (PHP/Python/Node), DB, demoni C/C++ custom, sandboxing/Firejail, analisi binari, webroot immutabile.

**Priorità iniziale (Fase 0-1)**:
```bash
tar -czf /root/_SNAPSHOT_INIT/var_www_backup.tar.gz /var/www/ 2>/dev/null
curl -s -D /root/_SNAPSHOT_INIT/baseline_http.txt -o /dev/null http://127.0.0.1/   # baseline risposta web
grep -rnE "(system|exec|shell_exec|passthru|eval|base64_decode)" /var/www/ 2>/dev/null  # hunting webshell
find /var/www/ -type f -mmin -120 -ls                          # file modificati di recente
checksec --file=/opt/<daemon> 2>/dev/null                      # mitigazioni binario
```
**Risorse assegnate (dossier Alfredo)**: `lsof`, `firejail`, `coredumpctl`, `sysctl` hardening, `setcap`/`getcap`, Lynis, `radare2`, `pwndbg`, `binwalk`, `angr`, `objdump`, OWASP Secure Headers/REST. Pratica: THM *Linux PrivEsc*, *OWASP Top 10*, *Pwn101*, HTB *OpenAdmin*, *Ignite*.
**CVE focus**: PwnKit, Spectre/CrossTalk, HTTP/2 Rapid Reset.

### Tabella sinottica dei ruoli
| | Membro 1 (Host) | Membro 2 (Network) | Membro 3 (Web/Binari) |
| :--- | :--- | :--- | :--- |
| **Backup Fase 1** | `/etc/`, `/home/` | tabelle porte, pcap baseline | `/var/www/`, `/opt/`, DB dump |
| **Tool primari** | `find`, `getcap`, `chattr`, `systemd` | `ss`, `iptables`, `tcpdump`, `bpftool` | `grep`, `checksec`, `firejail`, `nginx` |
| **Patch-firma** | `chmod u-s`, override systemd, `chattr +i` /etc | egress filter per-uid, rate-limit, fail2ban | webroot immutabile, deny exec upload, sandboxing demone |
| **Verifica POC** | lancia binario SUID → deve dare Permission Denied | reverse shell di test → non si connette | `curl` payload webshell → bloccato |

---
<a name="appendice"></a>
## APPENDICE — Piano di studio consigliato (2 settimane)

**Settimana 1 — Fondamenta difensive (tutti insieme)**
- Giorni 1-2: leggere a fondo gli artefatti `00`, `01`, `02`. Memorizzare la metodologia a 7 fasi.
- Giorni 3-4: systemd sandboxing (tutti) — è la tecnica trasversale. Ognuno ingabbia un servizio su una VM di prova e verifica che resti up.
- Giorni 5-7: ciascun membro approfondisce le proprie risorse di ruolo + 2 pratice machine assegnate.

**Settimana 2 — Simulazione a secco (dress rehearsal)**
- Montare una VM Debian/Ubuntu con 4-5 vulnerabilità piazzate da voi (un SUID, un cron scrivibile, una webshell, un demone C con overflow, una porta di troppo).
- **Cronometrare** il ciclo completo a 7 fasi su ciascuna, con il vincolo: *nessun servizio deve mai cadere*.
- Simulare il tick da 2 minuti con uno script health-check locale (vedi Artefatto 02, Fase 0).
- Rodare la **comunicazione di squadra** e il protocollo di rollback (Fase 6).

> [!TIP]
> Il team che vince non è quello che corregge più vulnerabilità: è quello che ne corregge abbastanza **senza mai far scendere l'uptime**. `6 × 0.99 = 5.94` batte `10 × 0.20 = 2.0`. Allenate la disciplina, non la velocità cieca.
