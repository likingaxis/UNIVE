## Fase 0, Ricognizione:
* Esegui pspy in background e reindirizza l'output su un file persistente
  `./pspy64 -pf -i 1000 > /tmp/pspy_triage.txt &`
* Avvia l'enumerazione silenziosa e salva il report
  `./linpeas.sh -a > /tmp/linpeas_report.txt`
* Backup delle configurazioni di rete e dei servizi esposti
  `iptables-save > /root/firewall_backup.rules`
  `cp -a /etc/nginx /root/nginx_backup_fase0`
  `cp -a /etc/ssh /root/ssh_backup_fase0`
*  Imposta una regola per monitorare in scrittura (w) e modifica attributi (a) il file delle password
`auditctl -w /etc/shadow -p wa -k shadow_monitor`
 Imposta una regola per monitorare la directory web
`auditctl -w /var/www/html -p wa -k web_integrity`
per cercare i risultati delle regole in /var/log/audit/audit.log usa `ausearch -k web_integrity o quello che è`

## Fase 1, isolamento invasivo

**Rinforzamento SSH:**
Disabilita l'accesso diretto a root
`sed -i 's/^#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config`

Impone l'autenticazione a chiavi disattivando le password in chiaro
`sed -i 's/^#PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config`

Imposta timeout stringenti per le sessioni
`echo "ClientAliveInterval 300" >> /etc/ssh/sshd_config`
`echo "ClientAliveCountMax 0" >> /etc/ssh/sshd_config`

Riavvia il servizio per applicare le modifiche
`systemctl restart sshd`

Per fare reverse: `cp /root/ssh_backup_fase0/sshd_config /etc/ssh/sshd_config
systemctl restart sshd`

**Congelamento del file system:**
Protezione delle credenziali (Immutabile)
`chattr +i /etc/shadow`
`chattr +i /etc/passwd`

Protezione delle configurazioni di rete e SSH appena modificate (Immutabile)
`chattr +i /etc/ssh/sshd_config`

Protezione della root del server web vulnerabile (Immutabile)
`chattr -R +i /var/www/html`

Protezione dei log per l'analisi forense (Append-Only)
`chattr +a /var/log/auth.log`
`chattr +a /var/log/nginx/access.log`

**Egress filtering**:
Consenti tutto il traffico sull'interfaccia di loopback (necessario per i servizi interni)
`iptables -A OUTPUT -o lo -j ACCEPT`

Consenti il traffico uscente SOLO se correlato a connessioni iniziate dall'esterno
`iptables -A OUTPUT -m state --state ESTABLISHED,RELATED -j ACCEPT`

Blocca per default tutto il resto del traffico in uscita
`iptables -P OUTPUT DROP`

Per fare reverse:
`iptables -P OUTPUT ACCEPT`
`iptables -D OUTPUT -o lo -j ACCEPT`
`iptables -D OUTPUT -m state --state ESTABLISHED,RELATED -j ACCEPT`

**Hardening del server web (nginx)**:
Per evitare che le risposte http del server contengano versione e OS:
Inserire direttive come `server_tokens off;` nei blocchi HTTP di configurazione.

## Fase 2, Sandboxing

`systemd-analyze security api-backend.service` per vedere quannto un service è vulnerabile

Per modificare i file .service/.systemd senza fare casino:
Crea dinamicamente la gerarchia di directory e apre un editor sicuro
`systemctl edit api-backend.service`

Cosa inserirci dentro:

`[Service]`
Impedisce l'escalation di privilegi tramite execve e binari SUID mal configurati
`NoNewPrivileges=true`

Monta l'intero OS in read-only per il processo, bloccando modifiche a binari o configurazioni
`ProtectSystem=strict`

Crea un mount namespace isolato per /tmp, prevenendo attacchi symlink
`PrivateTmp=true`

Rimuove l'accesso all'hardware fisico in /dev, evitando l'inserimento di rootkit
`PrivateDevices=true`

Rende le directory home e di root inaccessibili, proteggendo dati personali e chiavi SSH
`ProtectHome=true`

Applica profili seccomp-bpf per limitare le system call, ostacolando shellcode complessi
`SystemCallFilter=@system-service`

In casi di programmi che devono pefforza scrive in directory, usa: `ReadWritePaths=/var/lib/api-backend`

Infine riavvia il servizio:
Riavvia il servizio per farlo nascere all'interno della nuova sandbox
`systemctl restart api-backend.service`

Controlla che il servizio sia attivo e non in errore (fondamentale per la SLA)
`systemctl status api-backend.service`

## Fase 3, correzione e patching

Adesso puoi iniziare a modificare i file per patchare i bug, rimuovi gli attributi immutable con `chattr -i` e rimettili a fine patch per evitare code injections o altre puttanate.
Dopodichè continua ad osservare quei file! Sulregolamento dicono che potrebbero introdurre nuove vulnerabilità.