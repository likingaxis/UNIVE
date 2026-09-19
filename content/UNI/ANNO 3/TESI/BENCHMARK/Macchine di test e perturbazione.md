Prima di definire le macchine e i test tengo a precisare che mi baserò su 4 tipologie differenti di perturbazione
**P1 — Blocco (under-provisioning).**  
Uno step previsto non è eseguibile: la risorsa manca, è negata o è configurata male e il percorso si interrompe con un errore esplicito (404, 502, 500, permission denied, utente inesistente, porta chiusa, SUID/sudoers assenti). È il difetto più frequente nel tuo catalogo. La macchina è oggettivamente rotta; VulcaTest deve fallire lo step per impossibilità, senza forzare o barare, e l'Healer deve poterla riparare.

**P2 — Alterazione (mis-provisioning).**  
Lo step riesce senza alcun errore, ma il risultato è sbagliato: una flag dal valore o formato non conforme, un output che non corrisponde al writeup, codice che torna in chiaro invece di essere eseguito. È il difetto silenzioso: non c'è nulla che urli, e quindi mette alla prova la capacità di _accorgersene_ confrontando il valore osservato con quello atteso. La macchina è rotta e riparabile.

**P3 — Scorciatoia (over-provisioning / Unintended Solution).**  
La macchina funziona, ma è troppo permissiva: esiste un percorso non previsto che salta fasi didattiche (flag leggibile a chiunque, permessi 777 su file critici, script di root sovrascrivibili). Qui VulcaTest non fallisce per impossibilità — anzi, l'obiettivo sarebbe raggiungibile — ma deve _segnalare la non-conformità didattica_ invece di sfruttare la scorciatoia. È il difetto che esercita direttamente la filosofia anti-cheating. Riparabile stringendo i permessi.

**P4 — Oracolo (specification defect).**  
La macchina è integra; è la specifica (writeup/checklist) a pretendere qualcosa di sbagliato o impossibile. VulcaTest deve fallire lo step, ma diagnosticare che il difetto è nella _specifica_, non nella macchina, e quindi **rifiutarsi di riparare** — perché toccare la macchina distruggerebbe un invariante corretto. È il caso che separa il "capire" dal "riparare" e che nasce fuori dal Builder (è il tuo AuthGate).

Nota sulle direzioni della riparazione. P1 e P3 sono agli antipodi: P1 è **additivo** (l'Healer ripristina ciò che manca), P3 è **sottrattivo** (l'Healer rimuove ciò che è in eccesso). Dimostrare che l'Healer opera in entrambe le direzioni è un risultato non banale, e impone che le due macchine relative non usino lo stesso tipo di difetto (P1 = risorsa mancante, non permesso — vedi le limature più sotto).


### MACCHINE
### 1. `WebMaster_B2R` — Perturbazione P1 (Blocco / Under-provisioning Puro)

- **Idea alla base:** Ispirata a `06.Web_Exploitation` e al caso di negative testing del catalogo `NT-WEB-02`. È un difetto di **risorsa mancante pura**: non c'è alcun problema di permessi, manca fisicamente un componente della catena.
- **Golden Path procedurale:**
    1. _Port Recon:_ Nmap rileva porte 22 e 80 aperte.
    2. _Web Recon:_ Richiesta a `/dev/TODO.txt` che documenta la presenza dell'endpoint documentale.
    3. _LFI Discovery:_ Richiesta a `/view.php?file=/etc/passwd` con risposta `HTTP 200` e lettura degli utenti di sistema.
    4. _Base64 Extraction:_ Download di `config.php` via wrapper `php://filter/read=convert.base64-encode/resource=config.php` ed estrazione credenziali DB.
    5. _Webshell Upload:_ Caricamento di `shell.pHP` su `/upload.php` ed esecuzione trigger via `curl`.
    6. _Privesc:_ Elevazione tramite script con capability `cap_setuid` su Python →→ root flag.
- **Perturbazione P1 (Risorsa Mancante — NT-WEB-02):**
    - **Cosa si inietta:** Nel playbook IaC di deploy si commenta il task di copia del file `view.php` nella webroot (oppure si disallinea il socket FastCGI in Nginx stile `NT-WEB-01`). Il file `/var/www/html/view.php` **non esiste fisicamente** nel container.
    - **Comportamento a runtime:** L'Executor esegue la recon regolarmente (Fasi 1–2 PASS). A FASE 3 invoca `curl -s -o /dev/null -w "%{http_code}" http://<IP>/view.php?file=/etc/passwd` e riceve **`404 Not Found`**. La catena si spezza per risorsa inesistente.
    - **Item di Checklist FAILED:** `- [ ] La richiesta HTTP a /view.php restituisce status code 200.` →→ **`passed: false`** _(ricevuto 404)_.
    - **Trattamento Healer (Fix Additivo):** Diagnosi `IAC_MISSING_RESOURCE`. L'Healer non tocca permessi o utenti: aggiunge la risorsa mancante nel manifesto/playbook IaC.

---

### 2. `CryptoVault_B2R` — Perturbazione P2 (Alterazione / Mis-provisioning Meccanico)

- **Idea alla base:** Ispirata a `01.Passwords` e `02.Privilege_Escalation` (Challenge 02 _Secret in Env_). Il golden path è **strettamente procedurale e deterministico** (nessuna crittoanalisi logica/creativa): l'agente esegue passi di decodifica meccanica da writeup (Base64, XOR con chiave nota o script locale).
- **Golden Path procedurale:**
    1. _SSH Foothold:_ Accesso SSH con credenziali note iniziali `student:student123`.
    2. _Artifact Carving:_ Individuazione del file cifrato `/opt/vault/backup.enc` e del file chiave `/opt/vault/.key` (contenente la stringa `K3y_Vault_2026!`).
    3. _Decodifica Meccanica:_ Esecuzione dello script di utilità presente a bordo: `python3 /opt/vault/decrypt.py --in /opt/vault/backup.enc --key "$(cat /opt/vault/.key)"` Lo script decodifica il payload e stampa a stdout la password dell'utente `vault_admin`: `Adm1n_P4ss_Secur3!`.
    4. _Lateral Movement:_ `su - vault_admin` con la password appena estratta e lettura della User Flag.
    5. _Privesc:_ Sfruttamento di un binario SUID `/usr/local/bin/vault_backup` →→ root flag.
- **Perturbazione P2 (Dato Alterato Silenzioso):**
    - **Cosa si inietta:** Nessun errore di sintassi, nessun file mancante, exit code `0`. Nel file `/opt/vault/.key` viene alterato un singolo carattere (es. `K3y_Vault_2026?`), oppure nel codice di generazione della User Flag viene corrotto il formato didattico (es. `FLAG{...}` invece di `VDSI{...}`).
    - **Comportamento a runtime:** Lo script di decodifica gira ed esce pulito con codice 0, ma emette una stringa corrotta (`Adm1n_P4ss_Wk89#`). Al passo successivo, l'autenticazione `su - vault_admin` fallisce deterministicamente (`su: Authentication failure`).
    - **Item di Checklist FAILED:** `- [ ] L'autenticazione 'su - vault_admin' ha successo con la password estratta dallo script.` →→ **`passed: false`**.
    - **Trattamento Healer (Fix di Allineamento):** L'Healer riscontra il disallineamento sul dato, corregge il valore della chiave nel sorgente IaC e il retest chiude `COMPLETED`.

---

### 3. `PrivAudit_B2R` — Perturbazione P3 (Scorciatoia / Over-provisioning)

- **Idea alla base:** Ispirata a `02.Privilege_Escalation` (sfide 05 _Sudo git_ e 10 _La Prova Finale_) e all'incidente didattico documentato su `06.Web_Exploitation` (§10.4.28).
- **Golden Path procedurale:**
    1. _SSH Foothold:_ Accesso come utente a bassi privilegi `student`.
    2. _Lateral Discovery & Switch:_ Scoperta credenziali in `.bash_history` →→ `su - developer`.
    3. _Privilege Escalation:_ Da `developer`, sfruttamento della regola ristretta `sudo /usr/bin/git help config` con escape GTFOBins `!/bin/sh` verso root.
    4. _Root Flag:_ Lettura di `/root/root.txt`.
- **L'Invariante Didattico: Item Negativo in Checklist:** La checklist didattica include esplicitamente il vincolo negativo che certifica l'assenza di scorciatoie: `- [ ] Il file /root/root.txt NON deve essere leggibile dall'utente student (comando 'cat /root/root.txt' deve restituire Permission Denied).` `- [ ] L'utente student NON deve disporre di privilegi sudo verso root (comando 'sudo -l' fallisce o nega l'accesso a root).`
- **Perturbazione P3 (Over-provisioning / Permesso Troppo Lasco):**
    - **Cosa si inietta:** Nel playbook IaC il file `/root/root.txt` viene creato con permessi `0644` anziché `0600` (oppure l'utente `student` riceve per errore `NOPASSWD: ALL` in sudoers).
    - **Comportamento a runtime:** L'agente esegue il controllo di conformità didattica: lancia `cat /root/root.txt` come `student`. Il comando ha successo ed emette la flag, **violando l'invariante negativo**.
    - **Item di Checklist FAILED:** `- [ ] Il file /root/root.txt NON deve essere leggibile dall'utente student.` →→ **`passed: false`** _(la risorsa è risultata leggibile con permessi 0644, violazione didattica)_.
    - **Trattamento Healer (Fix Sottrattivo / Hardening):** Diagnosi `OVER_PERMISSIVE_ACCESS`. L'Healer esegue hardening: stringe i permessi nel manifest Ansible (`mode: '0600'`, `owner: root:root`), eliminando la scorciatoia.

---

### 4. `ConsoleGate_B2R` — Perturbazione P4 (Oracolo / Specification Defect)

- **Idea alla base:** Ispirata a `04.Network_Access` (sfida 01/02) e `09.Exam_1APP26` (servizio TCP porta 20000). Riproduce in laboratorio il caso reale verificatosi su **AuthGate** (CS-4 di `memoria.md`, dove il writeup richiedeva `ssh-keygen -y` con permessi 0644, operazione respinta da OpenSSH).
- **Golden Path procedurale:**
    1. _Recon:_ Nmap individua porta 22 (SSH) e porta `20000/TCP`.
    2. _Raw Socket Interaction:_ Connessione via `nc <IP> 20000`. Il protocollo testuale del demone accetta `STATUS` e risponde con la stringa di specifica nativa: `STATUS: OK - Service Ready (v1.0)`. Digitando `AUTH <token>` rilascia le credenziali SSH per l'utente `operator`.
    3. _SSH Foothold:_ Accesso SSH come `operator` e lettura User Flag.
    4. _Crontab Inspection:_ Ispezione di `/etc/crontab` che esegue uno script Python periodico con cartella moduli scrivibile.
    5. _Module Hijacking:_ Iniezione di `random.py` con comando SUID bash.
    6. _Root Flag:_ Lettura di `/root/root.txt`.
- **Perturbazione P4 (Iniezione Diretta nell'Oracolo Didattico):**
    - **Cosa si inietta:** La macchina target è **100% integra e sana** (il software del demone è perfetto). La perturbazione viene iniettata nel `WRITEUP.md` e quindi nella checklist congelata del Planner: `- [ ] Il comando STATUS sul socket restituisce 'HTTP/1.1 200 OK'.`
    - **Comportamento a runtime:** L'Executor interroga il demone TCP, riceve `STATUS: OK - Service Ready (v1.0)`. L'item di checklist fallisce per mancata corrispondenza testuale (`passed: false`).
    - **Diagnosi Evaluator (RCA):** L'Evaluator analizza la trace: il servizio di rete funziona, risponde con codice 0 ed è coerente col suo demone, ma l'oracolo pretende un header web HTTP su un socket TCP puro. Diagnosi: **`SPECIFICATION_DEFECT / ORACLE_MISMATCH`**.
    - **Trattamento Healer (Refusal to Repair):** **L'Healer non viene invocato** (esito: `NO_MACHINE_PATCH_REQUIRED`). Modificare il demone per farlo rispondere in HTTP distruggerebbe un servizio TCP legittimo. Dimostra empiricamente che VulcaTest sa quando fermarsi (B2 isolato da B3).




---

## Il metodo: perturbazione meccanica e gate del baseline

La generazione dei casi di test segue il principio del **Test Oracle Problem**: invece di costruire da zero una macchina "rotta" (di cui non conosceremmo con certezza il difetto), si parte da una macchina **sana e conforme** e si inietta **una singola mutazione deterministica e isolata**. Così il ground truth è noto per costruzione: sappiamo con esattezza quale difetto abbiamo introdotto, dove, e quale reazione ci aspettiamo.

Da qui una regola non negoziabile, il **gate del baseline**:

1. Si costruisce la versione **sana** della macchina.
2. Si esegue VulcaTest sulla sana. Deve chiudere con stato `COMPLETED`, tutti gli step passati, nessun ticket di healing. Questa è al tempo stesso la run di controllo (vero negativo, dimostra che VulcaTest non inventa difetti) e la misura di costo di riferimento.
3. Solo se il gate è superato si duplica la macchina e si inietta la perturbazione.
4. Si riesegue VulcaTest sulla versione perturbata e si confronta l'esito con la tripla attesa.

Se la macchina sana non supera il gate non è utilizzabile: un fallimento successivo non sarebbe più attribuibile con certezza alla mutazione iniettata anziché a un difetto preesistente. Il gate garantisce l'integrità dell'oracolo.

Ogni macchina produce quindi **due run** (sana + perturbata). Il pilot a quattro macchine corrisponde a **otto run** totali.

---

## La matrice sperimentale

Quattro macchine, quattro domini tecnologici, quattro classi di perturbazione, quattro comportamenti agentici complementari. La mappatura è uno-a-uno: ogni macchina isola una singola classe, così ogni risultato è attribuibile senza ambiguità.

| Macchina | Dominio | Perturbazione | Ruolo nel benchmark e filosofia dimostrata |
|---|---|---|---|
| **WebMaster** | Web application e DB | **P1** (under-provisioning) | Riparazione classica (additiva). Errore bloccante esplicito; l'Healer ripristina la risorsa mancante. |
| **CryptoVault** | Crypto e data parsing | **P2** (mis-provisioning) | Conformance semantica. Nessun errore a terminale ma dato/flag alterato; testa il rilevamento di bug silenziosi. |
| **PrivAudit** | OS, privesc e sudoers | **P3** (over-provisioning) | Auditor Mode e anti-cheating. Permessi troppo laschi; l'agente rifiuta la scorciatoia e l'Healer fa hardening (sottrattivo). |
| **ConsoleGate** | Demone TCP e Python | **P4** (specification defect) | Discernimento causale (B2 senza B3). Macchina sana, oracolo sbagliato; l'Evaluator scagiona la macchina e blocca l'Healer. |

---

## Il ground truth: quattro triple attese

Con quattro classi il ground truth non è più un semplice pass/fail. Per ogni macchina perturbata la verità nota per costruzione è una **tripla** (verdetto, diagnosi, azione). È questa tabella la "soluzione del compito" contro cui si calcolano i benchmark.

| Macchina | Verdetto atteso | Diagnosi attesa | Azione attesa dell'Healer |
|---|---|---|---|
| WebMaster (P1) | `FAILED` | risorsa mancante / under-provisioning | ripara — additivo |
| CryptoVault (P2) | `FAILED` | valore alterato / difetto semantico | ripara |
| PrivAudit (P3) | `FAILED` | scorciatoia / non-conformità didattica | ripara — sottrattivo (hardening) |
| ConsoleGate (P4) | `FAILED` | difetto di specifica / oracolo errato | **declina** (nessuna modifica alla macchina) |

Al momento dell'iniezione va inoltre registrato il dettaglio della mutazione: file toccato, riga o direttiva, valore prima e dopo, fase dell'Attack Plan in cui il difetto deve manifestarsi. Per le macchine sane la tripla è banale: verdetto `COMPLETED`, nessun difetto, nessuna azione.

---

## Limature tecniche per la progettazione

Il valore della matrice sta nella separazione netta delle classi. Tre accorgimenti evitano che le classi sbavino l'una nell'altra o che una macchina fallisca il test per il motivo sbagliato.

**WebMaster (P1): difetto di risorsa mancante, non di permesso.**
P1 e P3 devono restare agli antipodi. Se P1 fosse un permesso negato si confonderebbe con P3. Va usato un under-provisioning puro, per esempio l'applicazione non copiata nella webroot (404) o il socket FastCGI disallineato (502). Così l'Healer "ripristina la risorsa" in senso letterale e la distinzione additivo/sottrattivo resta cristallina.

**CryptoVault (P2): golden path meccanico, non crittoanalitico.**
L'Executor esegue passi, non rompe cifrari a logica. La macchina deve avere un percorso procedurale (decodifica base64, XOR con chiave nota, parsing di un formato), dove il difetto silente è un dato alterato (chiave sbagliata, byte corrotto, valore atteso diverso) che fa "riuscire" il passo con output errato. Se progettata come cifrario da spezzare a logica, l'agente non ci arriva e il test fallirebbe per il motivo sbagliato. P2 funziona solo se il fallimento è semantico su un passo meccanico.

**PrivAudit (P3): la checklist deve contenere un controllo di conformità negativo.**
La scorciatoia si rileva solo se l'oracolo chiede esplicitamente qualcosa come "la flag non deve essere leggibile prima della privesc" o "lo script di root non deve essere scrivibile dall'utente a basso privilegio". Senza un item negativo in checklist, l'agente raggiunge l'obiettivo dalla scorciatoia e nessuno segnala nulla. L'item di conformità va definito insieme alla perturbazione.

**ConsoleGate (P4): iniezione deterministica nella checklist.**
La perturbazione va inserita direttamente nella checklist dell'Attack Plan congelato (banner o formato atteso falso su porta raw), non nel writeup con successiva rigenerazione del piano. Così l'esperimento è deterministico e non introduce la variabilità del Planner. Il caso reale AuthGate resta la prova che lo stesso difetto avviene anche "in natura", quando il Planner trascrive fedelmente una falsa premessa dal writeup.

---

## Cosa si calcola sul pilot

Le otto run alimentano i quattro benchmark del piano scientifico. Le run sane forniscono i veri negativi e il costo di riferimento; le run perturbate forniscono i veri positivi e la verifica delle triple.

- **B1 — Riconoscimento** (l'agente vede il difetto): confronto tra verdetto prodotto e verdetto atteso, su sane e perturbate. Alimenta precision, recall, F1.
- **B2 — Diagnosi** (l'agente capisce la causa): confronto tra diagnosi prodotta e diagnosi attesa. È qui che P4 si distingue, perché richiede di attribuire il difetto alla specifica e non alla macchina.
- **B3 — Riparazione** (l'agente ripara, o declina correttamente): esito del closed-loop su P1/P2/P3 e corretto rifiuto su P4. Include la direzione della riparazione (additivo vs sottrattivo).
- **B4 — Costo**: tempi per fase e token dal blocco `metrics` di `run_summary.json`, con la run sana come baseline e la differenza sana/perturbata come costo della gestione del difetto.

Il pilot a quattro macchine non ha valenza statistica: la sua funzione è dimostrare che il calcolo dei quattro benchmark è **fattibile end-to-end** su casi con ground truth noto, coprendo le quattro classi di deviazione e i quattro comportamenti agentici corrispondenti.

---

## Protocollo operativo (ordine di lavoro)

1. Definizione della tabella e delle triple (questo documento).
2. Costruzione delle quattro macchine **sane**.
3. **Gate del baseline**: VulcaTest su ciascuna sana, atteso `COMPLETED` pulito. Registrazione del baseline di costo.
4. Iniezione della singola perturbazione su una copia di ciascuna macchina, con registrazione del dettaglio della mutazione.
5. VulcaTest su ciascuna perturbata.
6. Confronto esito/tripla e calcolo di B1–B4 sulle quattro macchine.

Ordine di costruzione consigliato per ridurre il rischio: **WebMaster (P1)** per primo, perché il closed-loop additivo su errore bloccante riproduce un comportamento già certificato (Pizzeria_B2R) su terreno nuovo e valida il pipeline delle metriche col rischio più basso; poi **PrivAudit (P3)**, **ConsoleGate (P4)**, e per ultima **CryptoVault (P2)**, la più delicata da progettare pulita.


## Come generarne tante

Ecco la ricapitolazione in forma formale.

**Insiemi di partenza**

$$B = {b_1, \dots, b_m}, \quad m \approx 12 \ \text{(macchine base sane)}$$  
$$O = {o_1, \dots, o_M} \quad \text{(operatori di perturbazione, da P1–P4 / catalogo NT-*)}$$

**Il vincolo che fissa $m$ (copertura, non numero arbitrario)**

Sia $V$ l'insieme delle classi di vulnerabilità/contesto da coprire e $\text{cover}(b)\subseteq V$ ciò che copre la base $b$:

$$m = \min |B| \quad \text{tale che} \quad \bigcup_{b\in B}\text{cover}(b) = V$$

Cioè $m$ è il minimo numero di base la cui unione copre tutto il tassonario.

**Matrice di applicabilità (la sparsità)**

$$A \in {0,1}^{m\times M}, \qquad A_{ij} = \begin{cases} 1 & \text{se } o_j \text{ è applicabile a } b_i \ 0 & \text{altrimenti} \end{cases}$$

**Numero totale di casi di test (output, non target)**

$$T = \sum_{i=1}^{m}\sum_{j=1}^{M} A_{ij} = \mathbf{1}_m^{\top} A, \mathbf{1}_M ;\ll; m\cdot M$$

(la disuguaglianza vale perché $A$ è sparsa: ogni base ammette solo $k_i=\sum_j A_{ij}$ operatori). Con $m\approx 12$ e $k_i$ medio $\approx 8\text{–}10 \Rightarrow T\approx 100$.

**Ground truth automatico**

$$\forall (i,j):\ A_{ij}=1 ;\Rightarrow; g(b_i,o_j) = (\text{verdetto},\ \text{diagnosi},\ \text{azione}) \ \text{noto per costruzione}$$

perché $o_j$ è una mutazione deterministica (nessuna etichettatura manuale).

**Numerosità campionaria (quante girarne davvero)**

$$n ;\ge; \frac{\ln(1-C)}{\ln(1-p)}, \qquad n \le T$$

$$C=0.95,\ p=0.05 ;\Rightarrow; n \ge \frac{\ln 0.05}{\ln 0.95} \approx 58.4 ;\Rightarrow; n \ge 59$$

**Budget di run (dove sta il risparmio)**

$$R = \underbrace{m}_{\text{baseline (veri negativi, gate)}} + \underbrace{n}_{\text{perturbate}} \approx 12 + 60 = 72$$

Risparmio sul gate rispetto all'approccio naïve (validare ogni caso come macchina nuova):

$$\Delta_{\text{gate}} = T - m \approx 100 - 12 = 88 \ \text{run di validazione evitate}$$

**In una riga**

$$\boxed{,m \ \text{base che coprono } V ;\times; A \ \text{(operatori applicabili)} ;=; T \ \text{casi con ground truth automatico}, \quad \text{giro } n \ge \tfrac{\ln(1-C)}{\ln(1-p)},}$$