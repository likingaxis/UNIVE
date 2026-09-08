# 💡 Idee Future di Progetto & Roadmap (VulcaTest)

Appunti e idee future da implementare o approfondire per la tesi.

---

### 1. Golden Path Test (Verifica del Successo Completo a 10 Step)
* **Cosa significa:** Finora abbiamo testato e dimostrato il ramo in cui la macchina fallisce (`FASE_2 [FAIL]`). Dobbiamo testare anche il ramo in cui la macchina è sana e conforme al 100%.
* **Come fare:** Allineare `FASE_2` alla realtà (cioè cercare il link `orari.php` invece del modulo chat inesistente) e far girare tutta la catena: LFI $\rightarrow$ estrazione password $\rightarrow$ SSH login $\rightarrow$ Privilege Escalation con sudo nano $\rightarrow$ Flag di root `[PASS]`.
* **Valore per la tesi:** Dimostra che il sistema sa sia bocciare una macchina rotta sia promuovere e certificare una macchina perfetta.

---

### 2. Sistema di Screenshot & Ispezione Visiva (Visual QA Multimodale)
* **L'intuizione:** Spesso le web app didattiche usano JavaScript, bottoni o form grafici. Con un semplice `curl` o `grep` nell'HTML grezzo rischi di non vedere se un elemento è nascosto da una regola CSS (`display: none`), se la pagina si rompe visivamente o se il layout non è navigabile.
* **Come implementarlo:**
  - Aggiungere un tool all'Executor (es. Playwright, Chromium headless o `browser_agent_inspect` di HexStrike) che apre l'URL e scatta uno screenshot PNG salvandolo nell'Evidence Store.
  - Passare l'immagine a un modello Vision (es. Qwen2.5-VL locale o Gemini Flash Vision) chiedendogli: *"Il pulsante di login o il modulo di supporto è visibile e cliccabile nella schermata?"*.
* **Valore per la tesi:** Trasforma VulcaTest da semplice strumento CLI a framework avanzato di **Visual Conformance Testing**.

---

### 3. Closed-Loop Self-Healing con VulcaForge
* **L'intuizione:** VulcaTest genera già `healing_ticket.json` con il componente colpevole (es. `webapps/pizzeria/index.php`) e la patch consigliata. Ora dobbiamo chiudere il cerchio collegandolo a VulcaForge.
* **Come implementarlo:**
  - Creare un agente riparatore (o script di patching) dentro VulcaForge che riceve il ticket JSON.
  - L'agente applica la modifica al template o al playbook Ansible, ricompila il container e re-innesca in automatico `main.py` di VulcaTest.
  - Se il secondo test passa `[PASS]`, il ciclo di autoriparazione è concluso con successo!
* **Valore per la tesi:** È il punto più alto del progetto: dimostra una piattaforma completamente autonoma capace di auto-diagnosticarsi e auto-ripararsi.

---

### 4. Benchmark Comparativo tra Modelli (Locale vs Cloud)
* **L'intuizione:** Per la tesi serve dimostrare *perché* abbiamo fatto certe scelte tecnologiche con dati sperimentali alla mano.
* **Cosa confrontare:**
  - Far girare lo stesso test su diversi modelli: **Qwen 3 Coder 30B**, **Qwen 3.8 27B**, **Gemini 3.8 Flash**, **Claude 3.5 Sonnet**, **Llama 3.3 70B**.
  - **Metriche da misurare:**
    - *Success Rate:* Quanti step completano correttamente?
    - *Refusal Rate:* Quante volte il modello cloud si rifiuta di eseguire comandi di pentesting/exploit per via dei filtri etici?
    - *Tempo e Velocità:* Token al secondo e durata totale del test.
    - *Costi:* 0€ della soluzione locale su workstation vs costo in token delle API cloud.

---

### 5. Benchmark su un Dataset di più Macchine del Laboratorio
* **L'intuizione:** Finora il banco di prova principale è stato *Pizzeria B2R*. Per dare validità scientifica generale al framework, dobbiamo testarlo su più ambienti.
* **Come implementarlo:**
  - Selezionare 3-5 macchine diverse create per gli esami universitari o per VulcAIn, che coprano vulnerabilità differenti (es. SQL Injection, Command Injection, path traversal, exploit su permessi SUID).
  - Creare uno script runner batch che esegue VulcaTest su tutte le macchine e compila una tabella riassuntiva con le metriche complessive.

---

### 6. Modulo Black-Box (Ricerca di Unintended Ways & Bypass)
* **L'intuizione:** Solo DOPO che la macchina è stata certificata conforme via White-Box, possiamo chiederci: *"Ci sono scorciatoie che permettono a uno studente furbetto di diventare root senza fare la strada voluta dal professore?"*.
* **Come implementarlo:**
  - Lanciare un agente Executor "cieco": conosce solo l'IP del target e i tool consentiti, senza avere l'Attack Plan.
  - L'agente cerca misconfiguration comuni: file di backup `.bak`, password di default, porte lasciate aperte per errore, permessi `777`.
  - Se trova un modo per diventare root diverso dalla storyline, genera una segnalazione di "Unintended Bypass".

---

### 7. Ingegnerizzazione dell'Orchestratore di Generazione in Python
* **L'intuizione:** Tenere Ansible per la configurazione dei servizi dentro i container (è lo standard del settore e funziona benissimo), ma **unificare e ripulire tutta la logica di generazione delle macchine in moduli Python moderni**.
* **Come strutturarlo:**
  - Sostituire eventuali script bash sparsi con classi Python tipizzate (es. `VulcaForgeEngine`) per leggere i manifesti, gestire i template Jinja2 e invocare le build Docker.
  - Questo rende immediato e naturale l'aggancio tra VulcaForge e VulcaTest per il Self-Healing.

---

### 8. Gestione Sessioni Interattive & Reverse Shell: VulcaHarness (Stateful Session Broker)
* **Il Limite Teorico degli Agenti LLM (Stateless RPC vs Stateful Stream):**
  - Tutti i framework correnti per agenti di cybersecurity (HexStrike, AutoGen, CrewAI, OpenAI tools) operano nel paradigma **Stateless Request/Response (RPC)**: l'agente invia una stringa di comando, il server lancia `subprocess.run()`, attende la morte del processo e restituisce l'output.
  - La realtà dell'Offensive Security e del Penetration Testing richiede invece canali bidirezionali a stati (**Stateful Duplex Channels / PTY / TCP Sockets**):
    1. *Prompt interattivi a metà esecuzione:* comandi come `ssh`, `su`, `sudo -i`, `passwd`, o database client (`mysql`) chiedono input su TTY e con i runner sincroni vanno in hang/timeout (come visto in FASE_6 di Pizzeria B2R).
    2. *Connessioni asincrone in ingresso (Reverse Shells):* payload da `revshells.com` (bash `/dev/tcp`, python, netcat, php) richiedono che la macchina attaccante tenga aperta una porta in ascolto (`listen`), non bloccante, per poi interagire con la shell catturata lungo più turni dell'LLM.
    3. *Persistenza dello stato operativo (Context & Working Directory):* senza sessioni a stati, ogni turno perde `cd`, variabili d'ambiente (`export`) e privilegi acquisiti.
    4. *Sequenze GTFOBins / Escape interattivi:* l'interazione con editor come `sudo nano /etc/passwd` o `vi` richiede l'invio di byte di controllo (`Ctrl+X`, `\r`) dentro un terminale già allocato.

* **L'Architettura di VulcaHarness (Micro-modulo di ~160 righe su Kali):**
  - Un demone leggero in Python (`vulca_harness.py`) residente sulla macchina attaccante (Kali Linux) ed esposto come server indipendente **FastMCP** (es. su porta `8889`), mentre HexStrike continua a gestire i suoi 150 tool batch sulla porta `8888` senza alcun conflitto.
  - Gestisce un registro di sessioni in memoria `sessions = {id: SessionObject}` e implementa un multiplexer I/O non-bloccante tramite `pty` e `asyncio`.
  - **Le 4 Primitive Universali esposte all'Agente:**
    1. `harness_spawn(command, pty=True) -> session_id`: lancia comandi locali allocando un vero pseudo-terminale (es. SSH, GDB, `su`, client DB).
    2. `harness_listen(port, protocol="tcp") -> session_id`: apre un listener server TCP asincrono in background per catturare qualsiasi reverse shell senza bloccare il flusso dell'agente.
    3. `harness_interact(session_id, input_data=None, timeout=2.0) -> output`: invia byte/comandi/password alla sessione attiva e legge l'output con idle-drain non-bloccante e pulizia codici ANSI.
    4. `harness_close(session_id)` e `harness_list()`: ispezione e distruzione controllata dei socket e dei processi figli.

* **Scalabilità e Aggiunta a Costo Zero di Nuovi Tool e Driver:**
  - L'Harness rende l'agente **completamente agnostico rispetto al mezzo di comunicazione**. L'LLM interagisce sempre e solo con `interact(session_id, command)`:
    - *Container & Cloud:* `docker exec -it` o `kubectl exec` vengono gestiti come semplici sessioni PTY.
    - *Framework C2:* sessioni Metasploit (`meterpreter`) o agenti Sliver/Havoc possono essere incapsulati nello stesso broker.
    - *Tooling Helper di alto livello:* permette di costruire sopra l'Harness tool composti come `session_upload_file` (trasferimento file in base64 dentro la sessione attiva) o `session_privesc_check`.

* **Disaccoppiamento Pulito (Separation of Concerns):**
  - **VulcaTest (Windows / LangGraph):** il *Cervello* (logica di pianificazione, FSM a stati finiti, validazione contratti Pydantic, self-healing).
  - **HexStrike (Kali / Porta 8888):** la *Cassetta degli attrezzi batch* (Nmap, Gobuster, Nikto, Nuclei per scansioni pesanti una tantum).
  - **VulcaHarness (Kali / Porta 8889):** il *Sistema nervoso interattivo* (canali I/O persistenti, reverse shell e PTY streaming).

* **Valore Scientifico e Accademico per la Tesi:**
  - Dimostra che il framework non si limita a usare wrapper di terze parti o workaround fragili (`expect` inline), ma affronta e risolve formalmente uno dei problemi aperti più discussi nella letteratura degli agenti autonomi di sicurezza: la transizione da *stateless tool-use* a *stateful reactive environments*.


---

### 9. Evidence Carving & OCR per Artefatti Complessi (PDF, PCAP, Immagini)
* **Il problema:** Se una challenge nasconde una password in un PDF scansionato, in una cattura di rete `.pcap` o in un'immagine con steganografia, l'agente testuale che fa `curl` si ritrova byte binari illeggibili o è completamente cieco.
* **Come risolverlo:**
  - *Carving da terminale:* Insegnare all'agente a usare tool specifici su Kali (`pdftotext` per PDF testuali, `tshark` per PCAP, `strings` ed `exiftool` per metadati).
  - *OCR & Multimodalità:* Se il PDF è un'immagine scansionata, estrarre il PNG e passarlo a `tesseract` o a un modello Vision (es. Qwen-VL o Gemini Flash) per leggere il testo scritto a mano o nella foto.

---

### 10. Writeup Generator Automatico per gli Studenti (Da Trace a Guida Didattica)
* **L'intuizione:** Quando una macchina supera tutti gli step (`[CONFORME]`), abbiamo nell'Evidence Store l'audit trail perfetto: comandi esatti funzionanti, log di output reali, flag estratti e screenshot.
* **Come implementarlo:**
  - Un modulo downstream che rielabora questo trace e compila automaticamente la guida illustrata ufficiale della challenge (`WRITEUP_GENERATED.md`).
  - Risparmia ore di lavoro manuale al docente e garantisce che la soluzione spiegata agli studenti corrisponda al 100% alla macchina reale.

---

### 11. Matrice di Iniezione Guasti (Negative Testing Sistematico a 5 Livelli)
* **L'intuizione:** Per validare scientificamente la capacità diagnostica di VulcaTest, non basta testare un guasto casuale, ma serve una batteria di difetti controllati iniettati apposta nei sorgenti IaC.
* **I 5 livelli di difetto da testare:**
  1. *Rete:* Porta chiusa o bindata solo su `127.0.0.1` invece che su `0.0.0.0`.
  2. *Web/App:* Socket FastCGI/PHP-FPM spento (`502 Bad Gateway`) o file mancanti in webroot.
  3. *Autenticazione:* Password errata nei file di configurazione o permessi sbagliati su chiavi SSH (`chmod 777` che fa scattare lo `StrictModes`).
  4. *Privilege Escalation:* Bit SUID mancante su un binario o sintassi errata nel file `/etc/sudoers`.
  5. *Flag:* Permessi errati su `/root/flag.txt` o file vuoto.
* **Valore per la tesi:** Permette di calcolare la *Confusion Matrix* della Root Cause Analysis (quante volte l'LLM identifica esattamente il file e la causa del guasto).

---

### 12. Adattamento Dinamico del Budget di Thinking per Modelli di Reasoning
* **Il problema:** I modelli "ragionatori" (come Qwen 3.8) su prompt didattici lunghi rischiano di generare oltre 10.000 token di ragionamento interno, esaurendo il limite (`max_tokens`) prima di emettere il testo finale.
* **Come risolverlo:**
  - Un middleware dinamico nell'SDK che calcola la finestra utile e forza parametri controllati (`reasoning_effort: "medium"` o `enable_thinking: False` a seconda se il nodo richiede sintesi o codice), prevenendo a monte qualsiasi blocco da saturazione token.

---

### 13. Script di Benchmark & Generazione Tabelle LaTeX per la Tesi
* **L'intuizione:** Dopo aver eseguito decine di test su varie macchine, avremo molti file `run_summary.json` con metriche preziose (tempi, tool calls, ratei di conformità).
* **Come implementarlo:**
  - Uno script Python dedicato (`generate_thesis_tables.py`) che aggrega tutti i JSON dell'Evidence Store, calcola medie e deviazioni standard e genera direttamente tabelle formattate in sintassi **LaTeX** (`\begin{tabular}...`).
  - Pronto per essere copiato e incollato direttamente nel capitolo sperimentale della tesi.

---

### 14. Benchmark su Goal Drift, Patch Bloat & Didactic Preservation nel Self-Healing
* **Il problema:** Quando un LLM riceve il compito di riparare un file sorgente o un playbook Ansible sulla base del ticket di healing, rischia di entrare in un "loop perfezionistico" o di subire un drift:
  - *Patch Bloat:* Riscrive 100 righe di CSS o layout quando bastava inserire un form minimale di 5 righe.
  - *Scope Creep:* Aggiunge librerie o funzionalità extra non richieste dalla storyline didattica.
  - *Il "Paradosso del Secure-by-Default":* I modelli di coding sono addestrati a sanificare le vulnerabilità. Se il riparatore vede una falla didattica (es. l'LFI `include($_GET['file'])`), rischia di "sanificarla" per perfezionismo, rendendo la sfida impossibile da risolvere per gli studenti!
* **Come misurarlo e benchmarkarlo per la tesi:**
  - *Diff Bloat Ratio:* Rapporto tra righe modificate dall'agente e righe strettamente necessarie.
  - *Didactic Invariant Preservation:* Verifica che dopo la patch lo step bloccato passi `[PASS]`, ma soprattutto che le vulnerabilità e i passaggi delle fasi successive siano rimasti intatti e sfruttabili.
  - *Guardrail della Minimal Invasive Patch:* Vincolare il riparatore a generare un formato `diff -u` minimale con divieto assoluto di refactoring estetico o bonifica di vulnerabilità didattiche intenzionali.

---

### 15. Il Caso FASE_7: Host Blindness, Context Explosion & Truncation Guards
* **L'Incidente:** In FASE_7 l'agente doveva cercare `/opt/test.sh` tramite `find / -name "*.sh"`. Avendo solo `execute_command`, ha lanciato il comando credendo di essere dentro il container, ma il comando è stato eseguito sull'**host Kali dell'attaccante** (Host Blindness).
  - Kali ha restituito oltre 80.000 caratteri (migliaia di righe di script di Metasploit, exploitdb, pacchetti).
  - L'output raw di 86 KB ha fatto esplodere a catena la context window dell'Executor (16.470 token su 8.192) e poi del Final Evaluator (17.286 token su 15.872), bloccando il report.
* **Le 3 Soluzioni Architetturali da Implementare:**
  1. *Truncation Guard su `mcp_bridge.py`:* Tagliare l'output di qualsiasi comando a max 4.000 caratteri con warning esplicito per l'agente (`[Output troncato: usa grep o head]`), impedendo a monte qualsiasi crash da token overflow.
  2. *Target Execution Wrapper (Post-Exploitation):* Nelle fasi successive all'ottenimento della shell (FASE 6+), imporre che i comandi vengano eseguiti dentro la sessione SSH (`sshpass -p user ssh user@target "find /opt -name '*.sh'"` o tool dedicato `target_exec`), evitando che l'agente confonda la shell di Kali con quella del bersaglio.
  3. *Prompt Sanitizer nel Final Evaluator (`nodes.py`):* Troncare gli output dei tool calls a max 1.500 caratteri prima di passarli a Qwen 3.8 per la RCA, eliminando inoltre il vecchio fallback a `Qwen3-Coder` (che produceva 404 perché scaricato dalla VRAM).