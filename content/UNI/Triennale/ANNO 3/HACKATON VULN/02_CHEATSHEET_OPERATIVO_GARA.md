# 02 — SCRIPT & CHEATSHEET OPERATIVO PER LA GARA
### Blue Team · CNIT NAM Lab · Tor Vergata — Metodologia a 7 Fasi
> **Pronto per copia-incolla sul terminale della VM.** Consultabile offline (IA vietata in gara, Art. 11).
> **Mantra**: `Punteggio = Vuln Corrette × % Uptime`. Prima di ogni `Enter`, chiediti: *"questo comando può far cadere un servizio?"*
> **Vietato**: `reboot`, `systemctl stop`, chiusura di porte legittime, patch distruttive. **Sempre**: reload a caldo, backup prima, validazione dopo.

---

## LEGENDA RAPIDA DELLE 7 FASI
| Fase | Nome | Quando | Output |
| :---: | :--- | :--- | :--- |
| **0** | Baseline & Mappatura Uptime | Min 0-5 | So cosa deve restare "verde" |
| **1** | Snapshot & Backup a caldo | Min 5-10 | Rete di sicurezza per rollback |
| **2** | Hunting & POC offensivo locale | Continuo | Vulnerabilità confermata + prova |
| **3** | Live patching & sandboxing | Per ogni vuln | Vettore neutralizzato, servizio up |
| **4** | Validazione incrociata | Prima di notificare | POC KO **E** SLA OK |
| **5** | Notifica & Tick Watch | Dopo validazione | Correzione registrata, 2 tick monitorati |
| **6** | Rollback istantaneo | Se tick rosso | Servizio ripristinato in <30s |

---

# ═══════════════════════════════════════════
# FASE 0 — BASELINE & MAPPATURA UPTIME (Min 0-5)
# ═══════════════════════════════════════════
*Obiettivo: fotografare lo stato "sano" prima che qualsiasi cosa cambi. È la verità contro cui misurerai ogni patch.*

```bash
# --- Directory di lavoro del team ---
mkdir -p /root/_SNAPSHOT_INIT /root/_BASELINE
cd /root/_BASELINE

# --- Porte aperte e processi associati (la mappa dei servizi da proteggere) ---
ss -tulpn | tee ports_baseline.txt
# fallback: netstat -antup 2>/dev/null

# --- Servizi systemd attivi ---
systemctl list-units --type=service --state=running | tee services_baseline.txt

# --- Fingerprint delle risposte web SANE (una per ogni porta HTTP trovata sopra) ---
curl -s -D http_80.txt   -o body_80.html   http://127.0.0.1/
curl -s -D http_8080.txt -o body_8080.html http://127.0.0.1:8080/
# Salva anche gli status code in modo compatto per confronto rapido:
for p in 80 8080 3000 5000; do
  echo -n "porta $p -> "; curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:$p/ 2>/dev/null
done | tee http_status_baseline.txt

# --- Banner dei servizi TCP non-web (SSH, FTP, demoni custom) ---
for p in 22 21 9007; do echo "=== porta $p ==="; timeout 3 nc 127.0.0.1 $p </dev/null; done | tee banners_baseline.txt

# --- Hash dei file critici (per accorgersi di manomissioni) ---
sha256sum /etc/passwd /etc/shadow /etc/sudoers 2>/dev/null | tee hashes_baseline.txt
ps auxf > ps_baseline.txt
```

### Script di health-check locale (il VOSTRO scorebot privato)
Crea `/root/healthcheck.sh` e lancialo prima/dopo ogni patch. Replica ciò che lo scorebot verifica.
```bash
cat > /root/healthcheck.sh <<'EOF'
#!/bin/bash
# Confronta lo stato attuale con la baseline. Verde = tutto come prima.
FAIL=0
check(){ # $1=descrizione  $2=comando  $3=atteso
  OUT=$(eval "$2" 2>/dev/null)
  if [ "$OUT" == "$3" ]; then echo "[OK ] $1"; else echo "[!! ] $1 (atteso '$3', ottenuto '$OUT')"; FAIL=1; fi
}
check "HTTP :80"   "curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1/"        "200"
check "HTTP :8080" "curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8080/"   "200"
check "SSH :22"    "nc -z -w2 127.0.0.1 22 && echo up"                               "up"
[ $FAIL -eq 0 ] && echo ">>> TUTTO VERDE" || echo ">>> ATTENZIONE: SERVIZIO DEGRADATO"
EOF
chmod +x /root/healthcheck.sh
/root/healthcheck.sh   # esegui ora per fissare la baseline verde
```
> [!TIP]
> Adatta porte e codici attesi ai servizi reali della tua VM. Se un endpoint risponde con JSON, aggiungi un check sul contenuto (`grep`) non solo sullo status code: lo scorebot potrebbe validare il *payload*.

---

# ═══════════════════════════════════════════
# FASE 1 — SNAPSHOT LOCALE & BACKUP A CALDO (Min 5-10)
# ═══════════════════════════════════════════
*Obiettivo: rete di sicurezza congelata. Rollback in 15s senza mai toccare lo snapshot degli organizzatori (Art. 8 = perdita di tutte le patch non validate + tick persi irrecuperabili).*

```bash
# --- Backup compresso dei path critici ---
mkdir -p /root/_SNAPSHOT_INIT
tar -czf /root/_SNAPSHOT_INIT/etc_backup.tar.gz      /etc/      2>/dev/null
tar -czf /root/_SNAPSHOT_INIT/var_www_backup.tar.gz  /var/www/  2>/dev/null
tar -czf /root/_SNAPSHOT_INIT/opt_backup.tar.gz      /opt/      2>/dev/null
tar -czf /root/_SNAPSHOT_INIT/home_backup.tar.gz     /home/     2>/dev/null
tar -czf /root/_SNAPSHOT_INIT/etc_systemd.tar.gz     /etc/systemd/ /lib/systemd/system/ 2>/dev/null

# --- Dump database (adatta credenziali/engine) ---
mysqldump --all-databases > /root/_SNAPSHOT_INIT/mysql_all.sql 2>/dev/null
# oppure PostgreSQL:
# sudo -u postgres pg_dumpall > /root/_SNAPSHOT_INIT/pg_all.sql 2>/dev/null

# --- Copia "a freddo" dei singoli file che toccherai spesso (rollback chirurgico veloce) ---
cp -a /etc/ssh/sshd_config            /root/_SNAPSHOT_INIT/sshd_config.orig
cp -a /etc/sudoers                    /root/_SNAPSHOT_INIT/sudoers.orig
cp -a /etc/nginx/nginx.conf           /root/_SNAPSHOT_INIT/nginx.conf.orig 2>/dev/null

# --- CONGELA l'archivio: nessuna sovrascrittura accidentale, neanche da root ---
chattr +i /root/_SNAPSHOT_INIT/*.tar.gz /root/_SNAPSHOT_INIT/*.orig 2>/dev/null

echo "Backup congelato:"; lsattr /root/_SNAPSHOT_INIT/ 2>/dev/null
```
> [!WARNING]
> `chattr +i` sull'archivio impedisce di **sovrascriverlo**, ma puoi sempre leggerlo/estrarlo per il rollback. Per rifare un backup aggiornato devi prima fare `chattr -i`.

### Funzione di rollback pronta (tienila in memoria)
```bash
# Ripristino chirurgico di un singolo file dall'archivio etc:
rollback_file(){  # uso: rollback_file etc/ssh/sshd_config  /etc/ssh/sshd_config  ssh
  tar -xzf /root/_SNAPSHOT_INIT/etc_backup.tar.gz -C /tmp/ "$1" && cp -a "/tmp/$1" "$2"
  systemctl reload-or-restart "$3" 2>/dev/null
  echo "Ripristinato $2"; /root/healthcheck.sh
}
```

---

# ═══════════════════════════════════════════
# FASE 2 — HUNTING & VERIFICA OFFENSIVA LOCALE (POC)
# ═══════════════════════════════════════════
*Obiettivo: trovare la falla E riprodurla su un terminale secondario, per avere la PROVA che esiste (e poi che è chiusa). Ogni categoria ha: Hunting → POC.*

### 2.0 — Mappa processi effimeri & cron (lancia subito, lascia girare)
```bash
./pspy64 -p -i 1000 > /tmp/pspy.log 2>&1 &    # distingue cron scorebot (ogni ~2min) da cron malevoli
```

### 2.1 — SUID/SGID anomali
```bash
# HUNTING
find / -perm -4000 -type f -exec ls -la {} + 2>/dev/null         # SUID
find / -perm -2000 -type f -exec ls -la {} + 2>/dev/null         # SGID
# Confronta con la lista standard: binari sospetti = find, cp, python, bash, nmap, vim, tar con bit SUID
```
```bash
# POC (terminale da utente non privilegiato, es. www-data o user di servizio)
# Se è un binario GTFOBins-abusabile, es. find con SUID:
/usr/bin/find . -exec /bin/sh -p \; -quit    # se apre shell root => VULNERABILE
# PATH hijacking su SUID che chiama comando senza path assoluto:
echo -e '#!/bin/bash\n/bin/bash -p' > /tmp/cat; chmod +x /tmp/cat; PATH=/tmp:$PATH /path/to/suid_binary
```

### 2.2 — Capabilities POSIX
```bash
# HUNTING
getcap -r / 2>/dev/null         # cerca cap_setuid, cap_dac_override, cap_sys_admin su binari non di sistema
# POC: es. python con cap_setuid+ep
/usr/bin/python3 -c 'import os; os.setuid(0); os.system("id")'   # se mostra uid=0 => VULNERABILE
```

### 2.3 — Sudoers permissivi
```bash
# HUNTING
sudo -l 2>/dev/null
cat /etc/sudoers /etc/sudoers.d/* 2>/dev/null | grep -vE '^\s*#|^\s*$'
# cerca: NOPASSWD, ALL=(ALL), wildcard pericolose, binari GTFOBins (vim, less, awk, python...)
# POC: se 'sudo NOPASSWD: /usr/bin/less' => 
sudo less /etc/shadow    # se lo leggi => escalation confermata (less -> !sh)
```

### 2.4 — Cronjob malevoli / script scrivibili
```bash
# HUNTING
cat /etc/crontab; ls -la /etc/cron.*; ls -la /var/spool/cron/crontabs/ 2>/dev/null
grep -R "" /etc/cron.d/ 2>/dev/null
# Trova script eseguiti da cron ma scrivibili da utenti bassi:
find / -writable -type f 2>/dev/null | grep -Ev "^(/proc|/sys|/tmp)" 
# Incrocia con pspy.log: quale script gira periodicamente ed è world-writable?
# POC: scrivi un marker nello script scrivibile e verifica che venga eseguito (NON una reverse shell!)
echo 'id > /tmp/cron_poc_$(date +%s)' >> /path/to/writable_cron_script   # se compare il file => VULNERABILE
```

### 2.5 — Command injection in script/CGI
```bash
# HUNTING
grep -rnE "(system|popen|exec|shell_exec|passthru|subprocess|os\.system|eval|`)" /var/www/ /opt/ /usr/local/ 2>/dev/null
# POC su endpoint che esegue comandi (es. un "ping tool"):
curl "http://127.0.0.1/ping?host=127.0.0.1;id"        # se l'output contiene uid= => VULNERABILE
curl "http://127.0.0.1/tool" --data 'host=127.0.0.1 && id'
```

### 2.6 — Webshell & upload
```bash
# HUNTING
grep -rnE "(system|exec|shell_exec|passthru|eval|base64_decode|assert|\\\$_(GET|POST|REQUEST))" /var/www/ 2>/dev/null
find /var/www/ -type f -name "*.php" -mmin -180 -ls     # php creati di recente = sospetti
# POC: se esiste /var/www/html/uploads/shell.php?cmd=
curl "http://127.0.0.1/uploads/shell.php?cmd=id"        # uid= => webshell attiva
```

### 2.6b — SQL Injection (SQLi) & Bypass Login
```bash
# HUNTING (cerca query concatenate nei sorgenti PHP / Python)
grep -rnE "(\"SELECT .* WHERE .* \. \$|\"INSERT .* VALUES .* \. \$|execute\(\s*f\"|cursor\.execute\(.*%s)" /var/www/ /opt/ 2>/dev/null
# POC 1: Bypass login rapido su form web o endpoint API:
curl -s -d "username=' OR '1'='1&password=foo" "http://127.0.0.1/login"
curl -s -d "user=admin' -- -&pass=foo" "http://127.0.0.1/api/auth"
# POC 2: SQLi in parametro GET:
curl -s "http://127.0.0.1/products?id=1' OR 1=1 -- -"
# Se la risposta cambia drasticamente o fa il login => VULNERABILE
```

### 2.6c — Local File Inclusion (LFI), Directory Traversal & PHP Wrappers
```bash
# HUNTING (cerca inclusioni dinamiche nei file PHP/Python)
grep -rnE "(include|require|include_once|require_once|file_get_contents|open\()\s*(\(?[^\"'].*\$)" /var/www/ 2>/dev/null
# POC 1: Directory Traversal verso /etc/passwd:
curl -s "http://127.0.0.1/?page=../../../../etc/passwd"
curl -s "http://127.0.0.1/view?file=..%2F..%2F..%2F..%2Fetc%2Fpasswd"
# POC 2: Wrapper PHP (Base64 source leak):
curl -s "http://127.0.0.1/?page=php://filter/read=convert.base64-encode/resource=config"
# POC 3: Wrapper PHP (Data URI RCE):
curl -s "http://127.0.0.1/?page=data://text/plain;base64,PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7Pz4=&cmd=id"
# Se leggi /etc/passwd o il base64 del file => VULNERABILE
```

### 2.6d — Python / Flask SSTI (Template Injection) & Debugger Mode
```bash
# HUNTING (cerca template renderizzati da stringa utente in app Flask/Jinja2)
grep -rnE "(render_template_string|jinja2|eval\(|pickle\.loads)" /var/www/ /opt/ 2>/dev/null
# POC SSTI:
curl -s "http://127.0.0.1/greet?name={{7*7}}"          # se risponde 49 => SSTI confermata!
curl -s "http://127.0.0.1/greet?name={{config.items()}}" # se vedi le secret key => RCE imminente
```

### 2.7 — Demoni C/Python con RCE o buffer overflow
```bash
# HUNTING
checksec --file=/opt/<daemon> 2>/dev/null                           # canary/NX/PIE/RELRO
objdump -M intel -d /opt/<daemon> 2>/dev/null | grep -E "strcpy|gets|sprintf|strcat"
ltrace -f /opt/<daemon> 2>&1 | head -50                             # password hardcoded, strcmp
strace -f -e trace=network,execve -p $(pgrep -f <daemon>) 2>&1 &    # syscall anomale live
# POC: invia input malformato e osserva crash/comportamento (su terminale secondario)
# ATTENZIONE: se il demone crasha, RIAVVIALO SUBITO per non perdere il tick dello scorebot!
python3 -c 'print("A"*2000)' | nc 127.0.0.1 <porta>; sleep 1; systemctl reload-or-restart <daemon>
coredumpctl list 2>/dev/null                                        # conferma il crash nei log di sistema
/root/healthcheck.sh                                                # verifica che il demone sia tornato UP subito
```

### 2.8 — Porte/servizi di troppo & Banner Grabbing
```bash
# HUNTING
ss -tulpn    # confronta con ports_baseline.txt: una porta/servizio che NON è negli obiettivi dello scorebot = candidato alla chiusura
lsof -i -P -n | grep LISTEN
# Banner grabbing rapido con Netcat per identificare servizi custom:
for p in $(ss -tlpn | awk '{print $4}' | awk -F: '{print $NF}' | sort -u); do
  echo "--- Porta $p ---"; timeout 2 nc -vn 127.0.0.1 $p </dev/null 2>&1
done
```

### 2.9 — Account backdoor in /etc/passwd
```bash
# HUNTING
awk -F: '($3==0){print $1" ha UID 0!"}' /etc/passwd     # qualsiasi UID 0 oltre root = backdoor
awk -F: '($7 ~ /bash|sh/ && $3>=1000){print}' /etc/passwd  # utenti con shell inattesi
grep -vE '/nologin|/false' /etc/passwd | grep -E ':0:|bash'
```

### 2.9b — Credential Hunting, Hash Dump & Cracking (John / Unshadow)
```bash
# HUNTING (utenti con password deboli in /etc/shadow o file di configurazione)
unshadow /etc/passwd /etc/shadow > /tmp/unshadowed.txt 2>/dev/null
# Cracking rapido con John the Ripper su wordlist standard:
john --wordlist=/usr/share/wordlists/rockyou.txt /tmp/unshadowed.txt 2>/dev/null
john --show /tmp/unshadowed.txt
# Se compaiono password tipo 'password123', 'admin', 'student' => VULNERABILITÀ CRITICA
```

### 2.9c — Docker Socket Escape & Container Privileges
```bash
# HUNTING (vettore classico docenti Pellegrini / Detti)
ls -la /var/run/docker.sock 2>/dev/null                 # chi ha accesso in lettura/scrittura?
getent group docker                                      # utenti non-root nel gruppo docker?
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null
# POC: utente nel gruppo docker ottiene root istantaneo sull'host:
# docker run -v /:/host -it alpine chroot /host /bin/bash
```

### 2.9d — Form & Service Bruteforce Check (Hydra)
```bash
# POC: verificare se un servizio o form HTTP cade con bruteforce banale:
hydra -l admin -P /usr/share/wordlists/rockyou.txt 127.0.0.1 http-post-form "/login:user=^USER^&pass=^PASS^:F=Login Failed" -t 4 -V
# Se trova la password in pochi secondi => manca rate limiting o password troppo debole!
```

---

# ═══════════════════════════════════════════
# FASE 3 — LIVE PATCHING CHIRURGICO & SANDBOXING A ZERO DOWNTIME
# ═══════════════════════════════════════════
*Obiettivo: eliminare il vettore con la modifica MINIMA. Mai `stop`, mai `reboot`. Reload a caldo.*

> [!IMPORTANT]
> **Principio di non-interruzione**:
> - Ricarica, non spegnere: `systemctl reload <servizio>` oppure `kill -HUP $(pgrep <servizio>)`.
> - `systemctl restart` è accettabile **solo** per demoni stateless con avvio <1s (sandboxing). Verifica col health-check subito dopo.
> - Non chiudere MAI una porta che lo scorebot interroga.

### 3.1 — SUID/SGID → rimozione bit (non il binario!)
```bash
chmod u-s /path/to/binary        # toglie SUID
chmod g-s /path/to/binary        # toglie SGID
# NON toccare sudo, su, passwd, mount legittimi di sistema se servono.
# Se il bit SERVE al funzionamento ma è abusabile, in alternativa: auditctl -w /path/to/binary -p x -k priv_alert
```

### 3.2 — Capabilities → revoca
```bash
setcap -r /path/to/binary        # rimuove tutte le capabilities
getcap /path/to/binary           # verifica: output vuoto
```

### 3.3 — Sudoers → stringi la regola
```bash
chattr -i /etc/sudoers 2>/dev/null     # se l'avevi congelato
visudo -c                               # valida la sintassi PRIMA di salvare (evita lockout)
# Rimuovi/commenta la riga NOPASSWD pericolosa, poi:
visudo -c && chattr +i /etc/sudoers
```

### 3.4 — Cronjob malevolo → rimuovi & congela
```bash
# Rimuovi la riga malevola dal crontab (NON cancellare i cron dello scorebot!)
crontab -l -u <utente> | grep -v 'comando_malevolo' | crontab -u <utente> -
# oppure neutralizza lo script scrivibile e congelalo:
: > /path/to/malicious_script        # svuota (se non è richiesto dallo scorebot)
chattr +i /path/to/legit_script      # impedisce ri-scrittura della backdoor
chmod o-w,g-w /path/to/script        # rimuovi scrivibilità indebita
```

### 3.5 — Command injection / webshell → input filter + congela webroot
```bash
# Rimedio immediato: congela la webroot statica (HTTP continua a servire in lettura)
chattr -R +i /var/www/html
# SBLOCCA SUBITO le directory dove l'applicazione DEVE scrivere (upload, cache, sessioni, logs):
# Se non le sblocchi, l'app darà errore 500 al prossimo check SLA!
chattr -R -i /var/www/html/uploads/ /var/www/html/cache/ /var/www/html/storage/ /var/www/html/tmp/ 2>/dev/null

# Elimina la webshell trovata:
chattr -i /var/www/html/uploads/shell.php 2>/dev/null; rm -f /var/www/html/uploads/shell.php
# Nginx: blocca esecuzione script nelle dir di upload
cat > /etc/nginx/conf.d/harden_uploads.conf <<'EOF'
location ~* /uploads/.*\.(php|phar|sh|py|cgi|pl)$ { deny all; }
EOF
nginx -t && systemctl reload nginx   # reload a CALDO
# Monta /tmp e upload come noexec se possibile:
mount -o remount,noexec,nosuid,nodev /tmp 2>/dev/null
```

### 3.5b — SQL Injection → Sanitizzazione Rapida & Prepared Statements
```bash
# In PHP (sostituire concatenazione con intval o prepared statement):
# Prima:  $id = $_GET['id']; $res = mysqli_query($db, "SELECT * FROM items WHERE id = $id");
# Patch 1 (se parametro numerico ID):
#   $id = intval($_GET['id']);
# Patch 2 (Prepared statement PDO minimale):
#   $stmt = $pdo->prepare('SELECT * FROM users WHERE user = :u AND pass = :p');
#   $stmt->execute(['u' => $user, 'p' => $pass]);

# In Python Flask / SQLite:
# Prima:  cursor.execute(f"SELECT * FROM users WHERE user = '{u}'")
# Patch:  cursor.execute("SELECT * FROM users WHERE user = ?", (u,))
```

### 3.5c — LFI & Wrappers → basename() & Hardening php.ini
```bash
# In PHP (disabilitare directory traversal usando solo il nome file):
# Prima:  include($_GET['page']);
# Patch:  include(basename($_GET['page']));   # rimuove tutti i '../' e percorsi assoluti!

# Hardening php.ini a caldo (disabilita inclusione di URL e data:// wrapper):
# Modifica in /etc/php/*/fpm/php.ini oppure /etc/php/*/apache2/php.ini:
sed -i 's/^allow_url_include\s*=.*/allow_url_include = Off/' /etc/php/*/*/php.ini 2>/dev/null
systemctl reload php*-fpm 2>/dev/null || systemctl reload apache2 2>/dev/null
```

### 3.5d — Docker Socket → Bonifica Permessi & Rimozione Gruppo
```bash
# Se /var/run/docker.sock è aperto a tutti o utenti non autorizzati sono nel gruppo docker:
chmod 660 /var/run/docker.sock
chown root:docker /var/run/docker.sock
# Rimuovi utente malevolo/compromesso dal gruppo docker:
gpasswd -d <utente_sospetto> docker 2>/dev/null
```

### 3.6 — Demone vulnerabile → SANDBOXING systemd (gabbia senza toccare il sorgente)
```bash
SVC=<servizio>
mkdir -p /etc/systemd/system/$SVC.service.d
cat > /etc/systemd/system/$SVC.service.d/override.conf <<'EOF'
[Service]
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true
ProtectKernelTunables=true
ProtectKernelModules=true
RestrictSUIDSGID=true
SystemCallFilter=@system-service
RestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX
# IMPORTANTE: concedi scrittura SOLO dove il servizio ne ha bisogno
ReadWritePaths=/var/lib/<app> /var/log/<app> /run/<app>
Restart=always
RestartSec=1s
EOF
systemctl daemon-reload
systemctl restart $SVC               # restart <1s
systemctl status $SVC --no-pager     # deve essere active (running)
/root/healthcheck.sh                 # DEVE restare verde
```
> [!WARNING]
> Se dopo il restart il servizio è `failed`, quasi sempre manca un `ReadWritePaths`. Guarda `journalctl -u $SVC -n 30`: cerca "Read-only file system" e aggiungi quel path. Se non risolvi in <30s → **rollback** (Fase 6) e riprova offline.

### 3.7 — Reverse shell / exfil → EGRESS FILTERING chirurgico
```bash
# Consenti risposte ai check in ingresso + DNS, blocca nuove connessioni in uscita del processo compromesso
iptables -A OUTPUT -o lo -j ACCEPT
iptables -A OUTPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A OUTPUT -p udp --dport 53 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 53 -j ACCEPT
iptables -A OUTPUT -m owner --uid-owner www-data -m state --state NEW -j DROP   # blocca reverse shell da www-data
# Drop di payload noti a livello di pacchetto (es. stringa /bin/sh verso il demone):
iptables -I INPUT -p tcp --dport <porta> -m string --string "/bin/sh" --algo bm -j DROP
```

### 3.8 — Flood / brute-force → rate limiting (senza bloccare i check)
```bash
# Throttle delle NUOVE connessioni aggressive su una porta (senza fermare il servizio)
iptables -A INPUT -p tcp --dport <porta> -m state --state NEW -m recent --set
iptables -A INPUT -p tcp --dport <porta> -m state --state NEW -m recent --update --seconds 1 --hitcount 20 -j DROP
# fail2ban su SSH:
apt-get install -y fail2ban 2>/dev/null; systemctl enable --now fail2ban
```
> [!TIP]
> Tara l'`hitcount` **sopra** la frequenza dello scorebot (che fa ~1 check/2min). Un hitcount troppo basso droppa i check legittimi → tick rosso.

### 3.9 — Account backdoor → disattiva (non cancellare ciecamente)
```bash
chattr -i /etc/passwd /etc/shadow 2>/dev/null
usermod -L <backdoor_user>                      # blocca login
usermod -s /usr/sbin/nologin <backdoor_user>    # niente shell
# se UID 0 illegittimo: correggi o rimuovi SOLO dopo aver confermato che non è usato dallo scorebot
chattr +i /etc/passwd /etc/shadow
```

### 3.10 — Pacchetto vulnerabile noto (PwnKit, Baron Samedit, Dirty Pipe...) → upgrade
```bash
apt-get update && apt-get install --only-upgrade -y sudo polkitd   # esempio sudo/pkexec
# In alternativa, mitigazione senza upgrade (es. PwnKit): togli SUID a pkexec
chmod u-s /usr/bin/pkexec
# Baron Samedit se non puoi aggiornare: non esiste mitigazione pulita se non l'upgrade -> upgrade mirato
```

### 3.11 — Hardening kernel trasversale (con precaricamento moduli di rete)
```bash
# --- 1. PRE-CARICA I MODULI NETFILTER PRIMA DI QUALSIASI BLOCCO (CRITICO!) ---
# Se blocchi i moduli prima di caricarli, iptables fallirà nei comandi successivi!
modprobe xt_string xt_owner xt_recent iptable_filter iptable_mangle 2>/dev/null

# --- 2. APPLICA SYSCTL HARDENING ---
sysctl -w kernel.randomize_va_space=2
sysctl -w kernel.unprivileged_bpf_disabled=1
sysctl -w fs.suid_dumpable=0
sysctl -w fs.protected_symlinks=1
sysctl -w fs.protected_hardlinks=1

# ATTENZIONE: applica modules_disabled=1 SOLO se sei sicuro al 100% di non dover caricare altri moduli di rete.
# Non è reversibile senza reboot! Se hai dubbi durante la gara, lascia abilitato il caricamento moduli.
# sysctl -w kernel.modules_disabled=1
```

---

# ═══════════════════════════════════════════
# FASE 4 — VALIDAZIONE INCROCIATA (POC KO + SLA OK)
# ═══════════════════════════════════════════
*Regola aurea: MAI notificare senza aver passato ENTRAMBI i controlli.*

```bash
# ---- CONTROLLO 1: il POC offensivo DEVE fallire ----
# Riesegui ESATTAMENTE il comando POC della Fase 2 per questa vulnerabilità.
# Esito atteso: Permission denied / Connection refused / Execution blocked / nessuna shell.

# ---- CONTROLLO 2: il servizio DEVE rispondere identico alla baseline ----
/root/healthcheck.sh
# Confronto puntuale con la baseline di Fase 0:
curl -s -D - http://127.0.0.1/ | head -20          # confronta header/status con body_80/http_80.txt
diff <(curl -s http://127.0.0.1/) /root/_BASELINE/body_80.html && echo "PAYLOAD IDENTICO"
```
Tabella decisionale:

| POC offensivo | Health-check SLA | Decisione |
| :---: | :---: | :--- |
| FALLISCE ✅ | VERDE ✅ | **Notifica** (Fase 5) |
| FALLISCE ✅ | ROSSO ❌ | Patch troppo aggressiva → **Rollback** (Fase 6) e riprova più chirurgica |
| RIESCE ❌ | VERDE ✅ | Patch inefficace → torna a Fase 3, rinforza |
| RIESCE ❌ | ROSSO ❌ | Disastro → **Rollback** immediato, ripensa l'approccio |

---

# ═══════════════════════════════════════════
# FASE 5 — NOTIFICA & PROTOCOLLO DEI 2 MINUTI (TICK WATCH)
# ═══════════════════════════════════════════
*Obiettivo: registrare la correzione (Art. 6) e sorvegliare i 2 tick successivi.*

**Checklist di notifica alla commissione:**
- [ ] Nome/identificativo del servizio o componente sanato.
- [ ] Natura della vulnerabilità (es. "SUID abusabile su /usr/bin/find", "command injection in /ping").
- [ ] Tipo di patch applicata (conforme Art. 6: non distruttiva, servizio operativo).
- [ ] Orario della notifica annotato (conta per lo spareggio, Art. 10).

**Tick Watch — monitoraggio per 2 tick (4 minuti) dopo la patch:**
```bash
# Loop di sorveglianza: esegui l'health-check ogni 20s e timestampa
while true; do echo "=== $(date +%T) ==="; /root/healthcheck.sh; sleep 20; done
# In un secondo terminale, sorveglia i log del servizio patchato:
journalctl -fu <servizio> --no-pager
tail -f /var/log/nginx/error.log /var/log/nginx/access.log 2>/dev/null
```
> [!NOTE]
> Se per 2 tick pieni resta verde, la correzione è consolidata. Solo allora passa alla vulnerabilità successiva. **Non accumulare patch non validate**: se dovessi chiedere lo snapshot (Art. 8), le perderesti tutte.

---

# ═══════════════════════════════════════════
# FASE 6 — ROLLBACK ISTANTANEO LOCALE (<30 secondi)
# ═══════════════════════════════════════════
*Se lo scorebot segna un tick rosso: NON panico, NON snapshot organizzatori. Ripristina in locale.*

```bash
# 1) Identifica il file/config che hai appena toccato per quel servizio.
# 2) Ripristina dal backup di Fase 1 (singolo file, non tutto):
rollback_file etc/ssh/sshd_config /etc/ssh/sshd_config ssh     # (funzione definita in Fase 1)

# --- Rollback manuale di un override systemd ---
rm -f /etc/systemd/system/<servizio>.service.d/override.conf
systemctl daemon-reload && systemctl restart <servizio>

# --- Rollback di regole iptables (se l'egress ha rotto qualcosa) ---
iptables -L OUTPUT --line-numbers         # trova la riga incriminata
iptables -D OUTPUT <num>                  # elimina la singola regola
# oppure azzera solo la catena OUTPUT se serve (le INPUT dei check restano):
# iptables -F OUTPUT

# --- Sblocca un file congelato per errore ---
chattr -i /path/al/file

# 3) Verifica il ritorno al verde IMMEDIATO:
/root/healthcheck.sh
```
> [!IMPORTANT]
> Dopo il rollback, **rianalizza offline** cosa ha rotto l'health-check (quasi sempre: `ProtectSystem=strict` senza `ReadWritePaths`, un egress DROP troppo ampio, o un `chattr +i` su una dir che l'app scrive). Correggi l'approccio e **riprova con patch più chirurgica** — non lasciare la vulnerabilità aperta, ma non ri-rompere l'uptime.

---

## APPENDICE A — ONE-LINER DI EMERGENZA (pronti all'uso)
```bash
# Chi sta facendo cosa adesso (triage rapido processi/rete)
watch -n2 'ss -tnp state established; echo; ps aux --sort=-%cpu | head'
# Trova file modificati negli ultimi 10 minuti in tutto il sistema (manomissioni live)
find / -xdev -mmin -10 -type f 2>/dev/null | grep -Ev '^/(proc|sys|run|tmp)'
# Connessioni in uscita sospette in tempo reale
watch -n1 'ss -tnp state established | grep -v 127.0.0.1'
# Port Forwarding SSH per ispezionare servizi interni aperti solo su localhost:
ssh -L 8080:127.0.0.1:<PORTA_INTERNA> <user>@127.0.0.1 -N -f
# Elenco programmi eBPF caricati (sniffer nascosti dei docenti)
bpftool prog list 2>/dev/null
# Verifica immutabilità applicata
lsattr -R /var/www/html 2>/dev/null | grep -- '-i-'
```

## APPENDICE B — ERRORI DA NON FARE MAI (azzerano l'uptime)
| ❌ Mai | ✅ Invece |
| :--- | :--- |
| `reboot` / `shutdown` | reload a caldo del singolo servizio |
| `systemctl stop <svc>` | `systemctl reload` o sandboxing via override |
| `iptables -P OUTPUT DROP` globale | DROP mirato `-m owner --uid-owner <user>` |
| chiudere la porta che lo scorebot interroga | sandbox del demone dietro quella porta |
| `chattr -R +i /var/www` includendo le dir di upload/cache | congela solo i path realmente statici |
| notificare senza health-check | sempre Fase 4 (POC KO + SLA OK) prima di Fase 5 |
| accumulare 10 patch non validate | valida e consolida una per volta |
