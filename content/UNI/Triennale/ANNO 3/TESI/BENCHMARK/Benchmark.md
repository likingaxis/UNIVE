---
title: "Benchmark — Macchine e Scenari"
---
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






### PERTURBAZIONI LISTA
i tutor hanno espresso questo:

SI DIVIDONO IN 4 TIPOLOGIE:
1. ...
2. ...
3. ...
4. ...
AGGIUNGERNE ALTRE?


#### Benchmark che farò e motivazioni varie

Obiettivo di questa parte è rendere le prestazioni del mio workflow **misurabili, confrontabili e riproducibili**. Prima ancora di elencare le metriche voglio però chiarire *che tipo* di valutazione sto facendo, perché è una scelta metodologica che condiziona tutto il resto — e che ho preso in modo consapevole dopo aver letto i lavori di riferimento.

##### Il paradigma: una test suite con oracolo noto, non un'inferenza statistica

Il problema di fondo quando si valuta un sistema come il mio è il *test oracle problem*: se costruissi da zero una macchina "rotta", non conoscerei con certezza quale sia il difetto e quale la reazione corretta, e finirei per giudicare l'output del mio sistema con un altro giudizio soggettivo (tipicamente un altro LLM), reintroducendo proprio l'imprecisione che voglio eliminare. Il lavoro *The Test Oracle Problem in Synthetic LLM-as-Judge Corpora* mette in guardia esattamente da questo: quando l'oracolo è sintetico e non verificato, la verità di riferimento si distorce o sparisce.

La soluzione che adotto è la **perturbazione controllata**: parto da una macchina **sana e conforme** (una *golden machine*, che VulcaTest supera al 100%) e vi inietto **una singola mutazione deterministica e isolata**. Così il ground truth è noto *per costruzione* — so con esattezza quale difetto ho introdotto, dove, e quale tripla (verdetto, diagnosi, azione) mi aspetto in risposta — senza alcuna etichettatura manuale e senza alcun giudice soggettivo.

Ci tengo a precisare una conseguenza importante di questa scelta: quello che sto facendo appartiene al paradigma del **software testing**, non della statistica inferenziale. Ogni caso di test non è un'estrazione casuale da una popolazione, ma una **sonda progettata di proposito** per verificare un comportamento noto in un contesto noto. I casi quindi **non sono indipendenti** — li scelgo io e condividono le stesse macchine base — e sarebbe scorretto leggerli come un campione i.i.d. da cui stimare un parametro con un intervallo di confidenza. Le metriche che riporterò sono **descrittive sulla suite** ("su questi casi progettati il sistema si è comportato così"), non stime di popolazione.

##### Da dove vengono le perturbazioni — e cosa NON è una perturbazione

Le perturbazioni non sono guasti inventati: **replicano errori di generazione realmente accaduti**, segnalati dai tutor (catalogo E1–E6) o documentati come incidenti durante i miei test. Questo dà validità ecologica al dataset — quando reinietto "web app non copiata" o "permessi troppo laschi" sto riproducendo un errore che *è successo davvero* prima che la macchina fosse corretta al suo stato golden.

Va però fatta una distinzione netta, perché negli output iniziali dei test convivono due nature diverse. Mentre collaudavo le macchine ho corretto problemi di **due tipi**, e solo uno alimenta il benchmark:

- **Difetti lato macchina** (generazione / IaC): componente non copiato, configurazione nginx errata, utente mancante, ownership o permessi sbagliati, SUID preimpostato. Sono stati risolti correggendo *la macchina*, ed esistono nell'IaC come singola manopola. **Solo questi** sono ammissibili come perturbazioni: li reinietto sopra il golden e ne conosco la tripla per costruzione.
- **Immaturità del framework** (harness / prompt / codice): blocchi dovuti al guardrail del provider (errori 403 sull'LLM), output non serializzato correttamente, budget di turni insufficiente, gestione di reverse-shell o sessioni interattive. Questi li ho risolti correggendo *VulcaTest stesso* (prompt engineering e codice), non la macchina. Non sono perturbazioni: appartengono alla narrazione dell'evoluzione del sistema (capitolo su architettura e scelte di design), e semmai motivano scelte come l'adozione di modelli locali per aggirare i guardrail.

Il criterio operativo che ne deriva è semplice: **una cella del benchmark è ammissibile solo se il difetto è correggibile — ed era stato corretto — sul lato macchina**. Un fallimento risolto sul lato framework non è mai una perturbazione. Questa separazione va verificata sul sorgente IaC attuale (la mutazione deve esistere come toggle nel golden), non ricostruita a memoria dagli output grezzi, dove le due nature si mescolano.

##### Come dimensiono il dataset: copertura, non un numero magico

Se non sto stimando una probabilità di guasto su una popolazione, allora la domanda "quante macchine servono?" non si risolve con una formula di confidenza, ma con un **argomento di copertura**. Formalizzo il criterio come un problema classico di *set cover*.

Sia $V$ l'insieme delle classi di vulnerabilità e di difetto che voglio esercitare (LFI, file upload, SUID, PATH hijacking, capabilities, cron hijacking, sudo GTFObins, crypto XOR, interazione su socket grezzo, e così via), e sia $\text{cover}(b) \subseteq V$ ciò che una singola macchina base $b$ copre. Definisco il numero di macchine base come:

$$m = \min |B| \quad \text{tale che} \quad \bigcup_{b \in B} \text{cover}(b) = V$$

In parole: $m$ è il **minimo numero di macchine il cui insieme, preso tutto insieme, tocca ogni classe di $V$**. È il principio del set cover — scelgo poche macchine complementari ed evito quelle ridondanti che ripetono classi già coperte. La frase che porto in tesi è dunque:

> Le macchine base non sono state scelte in numero arbitrario: costituiscono l'insieme (minimo) che, collettivamente, esercita tutte le classi di vulnerabilità e di difetto del mio tassonario. La copertura è quindi completa e senza ridondanza.

Sono onesto su due punti: il set cover è un problema NP-hard, quindi **argomento** la copertura, non ne calcolo l'ottimo; e la formula di numerosità campionaria $n \ge \frac{\ln(1-C)}{\ln(1-p)}$, che pure compare in letteratura, la uso **solo come motivazione dell'ordine di grandezza** della suite (serve una ventina abbondante di casi-difetto, non tre e non mille), dichiarando esplicitamente che i casi non sono i.i.d. e che quindi non ne ricavo un livello di confidenza. È la copertura a dare validità, non la formula.

Il vantaggio pratico di questo approccio è il **riuso**. Un operatore di perturbazione (per esempio "rendi la root flag leggibile a tutti", classe P3) è una *ricetta* svincolata dalla singola macchina, e si applica a molte basi. Definendo la matrice di applicabilità $A$ — dove $A_{ij}=1$ se l'operatore $o_j$ ha senso sulla base $b_i$ — il numero di casi di test è

$$T = \sum_{i,j} A_{ij} \; \ll \; m \cdot M$$

dove la disuguaglianza vale perché $A$ è **sparsa**: non ogni operatore si applica a ogni macchina (un difetto web non ha senso su una macchina senza web). Con una decina di macchine base e operatori riusabili arrivo dell'ordine del centinaio di casi **senza scrivere un centinaio di macchine**, e con il ground truth automatico per ognuno.

##### Lo spazio delle run: casi × K × profilo

Il dataset appena descritto definisce i **casi**. Lo spazio effettivo delle esecuzioni ha però più assi, e voglio tenerli distinti perché ognuno risponde a una domanda diversa.

- **Casi** = le coppie $(\text{base}, \text{operatore})$ con $A_{ij}=1$, ciascuna con la sua tripla attesa. A questi affianco le **run sane** (una per macchina base): non sono un contorno ma parte integrante della misura, perché fungono da *gate* del baseline (se la sana non chiude `COMPLETED` pulito, la macchina esce dal dataset perché un fallimento successivo non sarebbe più attribuibile alla mutazione), da **veri negativi** (dimostrano che il sistema non inventa difetti dove non ce ne sono) e da **costo di riferimento**.
- **K — ripetizioni per caso.** Qui sta un punto delicato che voglio dichiarare apertamente: le K ripetizioni **non** servono a darmi potenza statistica (sarebbero pseudo-repliche correlate, non nuovi campioni indipendenti). Servono a **caratterizzare il non-determinismo** del sistema — lo stesso caso, su K run, può chiudere $k$ volte `FAILED` e $K-k$ volte `COMPLETED` a causa del sampling del modello. È una misura descrittiva di *flakiness*, resa necessaria dal fatto che l'Executor è un LLM: ho osservato empiricamente casi in cui l'esito oscillava per via del quoting di un payload o della gestione del terminale. Riportare la dispersione sulle K è più onesto che nascondere la varianza dietro un valore secco.
- **Profilo — configurazione dei modelli.** È l'unica vera variabile indipendente che manipolo di proposito: cambiando il profilo (per esempio modello **locale** vs **cloud**, per attore) rispondo alla domanda "quanto conta il modello e quanto lo scaffold?" — domanda che nasce direttamente da *Cybench* e dai lavori sugli agenti software. L'architettura è già predisposta per questo, perché i modelli sono configurabili per ruolo (planner, executor, evaluator, healer).

Tutto ciò che **non** è un asse d'interesse va invece **congelato** e registrato, altrimenti un risultato non sarebbe più attribuibile: il piano d'attacco (uso un piano *congelato* per macchina, così la qualità del Planner non inquina la misura di Executor/Evaluator/Healer), il budget di turni dell'Executor, la lunghezza di context window e la soglia di troncamento degli output dei tool. Queste sono variabili di controllo: le tengo costanti nella matrice principale, e le muovo — una alla volta — solo in un eventuale esperimento di *ablation* dedicato.

Il budget complessivo di run che ne deriva, per un singolo profilo, è

$$R = \underbrace{m}_{\text{run sane (gate + veri negativi)}} + \underbrace{n \cdot K}_{\text{casi perturbati} \times \text{ripetizioni}}$$

dove $n \le T$ è il sottoinsieme di casi che scelgo effettivamente di girare (per copertura delle classi, non per confidenza). Il gate del baseline è anche ciò che mi fa **risparmiare**: valido ogni macchina base *una volta*, invece di validare da zero ognuno dei $T$ casi come se fosse una macchina nuova.

##### Come leggo i risultati: metriche descrittive e per classe

Coerentemente col paradigma, lo scoring è **deterministico** (nessun LLM-as-judge, per non ricadere nella distorsione dell'oracolo sintetico) e i risultati sono presentati **per classe di perturbazione**, non aggregati in un unico numero di popolazione. La confusion matrix di B1 resta uno strumento utile, ma la leggo come *conteggio descrittivo attribuibile* (quanti difetti di classe P1 riconosciuti, quanti P2, ecc.), non come stima di una "precision globale" che reintrodurrebbe di nascosto l'ottica statistica che ho scartato. Le K ripetizioni entrano come dispersione, non come campioni.

I quattro benchmark che calcolo restano quelli del piano scientifico, e li ancoro così ai lavori di riferimento:

- **B1 — Riconoscimento.** Il sistema distingue una macchina difettosa da una sana? Confronto verdetto prodotto vs atteso su sane e perturbate (confusion matrix, e da lì accuracy/precision/recall/$F_1$ come sintesi descrittive per classe). Integro una misura di **avanzamento** non binaria — la frazione di checkpoint della checklist superati — ispirata all'idea di *progress rate* su subtask di *AgentBoard* e *Cybench*, per non appiattire tutto su un Pass/Fail.
- **B2 — Accuratezza diagnostica.** Il Final Evaluator comprende la *causa reale*? Confronto la diagnosi prodotta (dove si è bloccato + tipo di difetto + componente) con la tripla nota. È qui che la classe P4 (oracolo/specifica) è cruciale, perché richiede di attribuire il difetto alla *specifica* e non alla macchina.
- **B3 — Efficacia di riparazione.** L'Healer ripara con interventi minimi, o declina quando deve? Misuro il *closed-loop success rate* e l'**ampiezza della patch** (file e righe, da diff deterministico), e verifico anche la *direzione* corretta della riparazione: additiva (ripristina ciò che manca, P1), sottrattiva/hardening (rimuove l'eccesso, P3), oppure rifiuto (P4). Questo è il punto in cui il mio sistema si distingue da un harness generico, in linea con la critica alla mancanza di rigore dell'oracolo.
- **B4 — Costi ed efficienza.** Quanto costa in tempo e token? Tempi per fase e consumo per attore, con la run sana come baseline e la differenza sana/perturbata come costo di gestione del difetto. È l'asse su cui il confronto locale/cloud del profilo diventa concreto.

Il dominio (pentesting agentico su CTF/B2R) e l'impianto di valutazione si appoggiano infine ai precedenti del settore — *PentestGPT* per l'agente di penetration testing e *Cybench* per il benchmark di cybersecurity su LLM — mentre l'attenzione all'affidabilità della valutazione e alla verifica del ground truth richiama *SWE-Bench Pro Verified*.

*Riferimenti considerati:* The Test Oracle Problem in Synthetic LLM-as-Judge Corpora; Cybench; AgentBoard; PentestGPT; SWE-Bench Pro Verified.

