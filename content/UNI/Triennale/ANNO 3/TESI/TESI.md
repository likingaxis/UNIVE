## 🗺️ Indice e Mappa dei Capitoli

---

### 1. Introduzione *(3–4 pagine — si scrive per ULTIMA)*
> **Domanda-motrice:** *Di cosa parla questo lavoro, qual è il problema concreto affrontato e come è articolata la trattazione?*  
> **Lascia aperto:** Apre l'intero quadro concettuale $\rightarrow$ Cap. 2.

- **1.1 Il problema di partenza: il collaudo manuale di ambienti didattici generati da AI**:
  - Macchine didattiche e ambienti CTF/Boot-to-Root generati tramite AI (pipeline VulcAIn).
  - Il collo di bottiglia del collaudo e della riparazione manuale affidati ai tutor (costoso, lento, non scala).
- **1.2 Il contributo in sintesi: conformance testing e autoriparazione a ciclo chiuso**:
  - **VulcaTest**: sistema agentico white-box per il conformance testing rigoroso dell'*intended way* senza affidarsi all'autocertificazione del modello.
  - **VulcaHealing**: sottosistema di auto-riparazione closed-loop guidato da regole costituzionali che agisce sui sorgenti Infrastructure-as-Code (IaC) e risincronizza la macchina con re-test di regressione.
  - **Il concetto di Harness e Mechanism Engineering**: il focus scientifico della tesi non è l'addestramento di un nuovo LLM, ma la progettazione dell'infrastruttura di controllo, isolamento e mediazione operativa (*harness*) attorno a modelli esistenti.
- **1.3 Guida alla lettura e roadmap della tesi**:
  - Sintesi capitolo per capitolo con la progressione logica della trattazione.

---

### 2. Contesto e Lavori Correlati *(8–11 pagine — la scala dei concetti)*
> **Domanda-motrice:** *Quali sono i fondamenti del pentesting didattico e delle architetture agentiche, perché la pipeline VulcAIn necessitava di un collaudo automatico e dove si posiziona questa tesi rispetto allo stato dell'arte?*  
> **Lascia aperto:** *"Se serve un agente per collaudare la macchina, perché non utilizzare direttamente un harness generico come Google Antigravity o AutoGPT?"* $\rightarrow$ Apre il Cap. 3.

- **2.1 Il dominio didattico e il penetration testing come prova d'esame**:
  - Struttura delle sfide Capture The Flag (CTF) e delle macchine Boot-to-Root (B2R).
  - L'esame pratico di sicurezza: dalla ricognizione remota (scansione IP e porte) allo sfruttamento delle vulnerabilità applicative fino alla Privilege Escalation a root.
- **2.2 Definizione di intended way e conformità: vulnerabilità intenzionali vs veri difetti**:
  - *Vulnerabilità volute vs veri difetti*: la peculiarità dei sistemi didattici (ciò che sembra rotto è voluto; il difetto reale è ciò che devia o spezza l'esperienza didattica progettata).
  - Il concetto di *White-Box Conformance Testing*: verificare che l'esatta traiettoria didattica ideata dal docente sia percorribile.
- **2.3 Agenti basati su LLM e pattern decisionali (ReAct e Plan-and-Execute)**:
  - Definizione formale di agente (LLM + percezione + azione + ambiente).
  - Pattern cognitivi fondamentali: *ReAct* (Reasoning + Action + Observation) e *Plan-and-Execute*.
  - Limiti della singola chiamata inferenziale nel problem-solving procedurale e interattivo.
- **2.4 Il concetto di harness e l'ingegneria del meccanismo (mechanism engineering)**:
  - L'infrastruttura attorno al modello: contratti tipizzati, budget di turni, gestione del contesto, guardrail e disaccoppiamento dei tool.
  - Il gancio concettuale: *"L'harness è l'oggetto primario di progettazione e realizzazione di questo lavoro"*.
- **2.5 L'ecosistema VulcAIn e la necessità del conformance testing automatico**:
  - La pipeline ereditata: VulcaMind (design didattico) $\rightarrow$ VulcaForge (IaC: Ansible + Docker) $\rightarrow$ VulcaShip (deploy su Proxmox).
  - I controlli statici al boot (Obiettivo 0 / `verify_solution.sh`) e **perché non bastano**: uno script bash verifica se i demoni sono attivi, ma non può accertare la risolvibilità di una catena d'attacco interattiva multi-step.
  - L'onere del collaudo manuale svolto dai tutor didattici.
- **2.6 Stato dell'arte e posizionamento scientifico: offensive pentesting e self-healing**:
  - Agenti per il penetration testing autonomo (*PentestGPT*, hack-bot): orientati all'exploit opportunistico e al goal-reaching a ogni costo, non al conformance testing didattico.
  - Automated Program Repair (APR) per IaC: riparazione classica vs riparazione con vincolo di preservazione delle vulnerabilità didattiche.
  - Il gap scientifico colmato: assenza in letteratura di soluzioni che uniscano *conformance testing evidence-based* (senza autocertificazione) e *closed-loop self-healing* su macchine didattiche generate da AI.

---

### 3. Architettura e implementazione di VulcaTest *(15–18 pagine — il Tester)*
> *(Allineato alla stesura consolidata in `BOZZA SCRITTA/Capitolo 3 - Stesura.md` e `BOZZA SCRITTA/INDICE e titolo.md`)*  
> **Domanda-motrice:** *Come si progetta e si realizza un harness di validazione che verifichi la conformità dell'intended way senza fidarsi delle autodichiarazioni del modello?*  
> **Lascia aperto:** Il tester emette il report diagnostico e, in caso di non conformità, genera l'`healing_ticket.json` $\rightarrow$ *"Chi interviene per riparare i sorgenti IaC e chiudere il cerchio?"* $\rightarrow$ Apre il Cap. 4.

- **3.1 Requisiti e limiti delle soluzioni generiche**:
  - **3.1.1 Il livello del modello: guardrail e costi di esecuzione**: guardrail commerciali sulle tecniche offensive e insostenibilità economica delle chiamate API cloud su task iterativi.
  - **3.1.2 Il livello del controllo operativo**: assenza di un oracolo evidence-based e rischio di allucinazione, eccesso di libertà operativa e distorsione da goal-reaching (tentativi out-of-band su Docker/host), carenza di telemetria; contro-esempio empirico di Antigravity e caso studio di *Pizzeria_B2R* con bypass HTML della chat non generata.
- **3.2 Principi di progettazione del sistema**:
  - **3.2.1 Deterministico quando possibile, probabilistico quando necessario**: dualismo CoALA (codice deterministico per flusso, parsing e metriche vs modello probabilistico per reasoning, exploit e RCA $\rightarrow$ formalizzazione del controllo ibrido).
  - **3.2.2 Esecuzione basata su evidenze e rifiuto dell’auto-certificazione**: principio SWE-bench Pro (verifier gap e verifica oggettiva dei comandi eseguiti).
  - **3.2.3 Separazione delle responsabilità e specializzazione dei ruoli**: architettura role-based per prevenire il Goal Drift tra pianificazione, esecuzione e valutazione.
  - **3.2.4 Intercambiabilità e modularità architetturale**: modelli, tool e context window pluggabili e configurabili via runtime.
  - **3.2.5 Controllo gerarchico: pianificazione a livello macro e ReAct a livello micro**: scomposizione del problema in macro-fasi sequenziali e micro-cicli d'azione reattivi.
- **3.3 Architettura generale e flusso di coordinamento**:
  - **3.3.1 Inquadramento architetturale e gestione dello stato**: inquadramento CoALA (singolo agente cognitivo modulare governato da ruoli specializzati); Working Memory (`VulcaTestState`) e Procedural Memory nel codice; motivazione scientifica dell'assenza di memoria episodica/semantica per isolamento e riproducibilità (Clean Slate).
  - **3.3.2 Punti di ingresso e avvio del workflow**: Execution Mode (piano esistente) vs Planning & Execution Mode (generazione dinamica dell'attacco).
  - **3.3.3 Comunicazione tra i componenti e strutture dati tipizzate**: contratti dati Pydantic e paradigma dello *Structured Artifact Handoff* (MetaGPT).
- **3.4 Il Planner: generazione e formalizzazione dell’Attack Plan**:
  - **3.4.1 Architettura ibrida a due stadi**: LLM generativo per la sintesi della strategia e parser deterministico (`plan_parser.py`) con convalida Pydantic su `ATTACK_PLAN.md`.
  - **3.4.2 Gerarchia delle fonti e risoluzione delle ambiguità**: priorità vincolante (Storyline > Writeup > Description), de-fence multi-blocco e grounding anti-allucinazione.
  - **3.4.3 Regole per la definizione dei criteri di verifica**: definizione formale dell'oracolo, insufficienza del solo exit code bash, connettori logici AND/OR, ancoraggio del meccanismo di scoperta; Caso Studio CS-1 (oracolo lasco).
  - **3.4.4 Dimensionamento dinamico del contesto**: formula euristica `plan_context_length` su `token_utils.py` per allocare la finestra ottimale.
- **3.5 L’Orchestrator: controllo del workflow e gestione dello stato**:
  - **3.5.1 Working Memory: `VulcaTestState`**: stato condiviso tipizzato in LangGraph e aggregazione cumulativa delle evidenze.
  - **3.5.2 Topologia del grafo e instradamento condizionale**: StateGraph di LangGraph, funzioni di routing condizionale (`route_orchestrator`), gate logico `AND` sui checkpoint della checklist e assenza deliberata di retry a livello di grafo.
- **3.6 L’Executor: esecuzione degli step e modalità di auditing**:
  - **3.6.1 Auditor Mode**: il tester in-band vincolato al perimetro dello step; prompt costituzionale per neutralizzare il *cheating agent* e le scorciatoie fuori perimetro.
  - **3.6.2 Gestione dinamica del budget operativo**: Graceful Nudge a -2 turni e Checkpoint di proroga con `request_turn_extension`.
  - **3.6.3 Tool interni e recupero dei valori verificati**: meccanismo di Two-stage retrieval (`show_verified_values` $\rightarrow$ `get_verified_value`) per la minimizzazione del contesto.
  - **3.6.4 Il contratto `StepResult` e la verifica dello step**: validazione deterministica del verdetto nel codice (`_build_step_result`), riesame indipendente della checklist e sovrascrittura anti-allucinazione.
- **3.7 Il Bridge di esecuzione: gestione degli strumenti e delle interazioni con il target**:
  - **3.7.1 Canale dell’azione: architettura a due livelli**: Livello 1 (HexStrike REST stateless su porta 8888) vs Livello 2 (Terminal Gateway FastAPI + pexpect su porta 8889 per sessioni PTY interattive e persistenti).
  - **3.7.2 Canale della percezione: normalizzazione dell’output e informazioni di stato**: bonifica sequenze ANSI/VT100, `session_last_line`, watchdog adattivo del silenzio con stati DONE/IDLE/CAP/DEAD su pexpect.
  - **3.7.3 Gestione del contesto: troncamento degli output e tool-slicing**: prevenzione della saturazione da comandi verbosi (es. `find /`), budget `MAX_TOOL_OUTPUT_CHARS = 8000` con conservazione di testa e coda, tool-slicing dinamico per la riduzione dello spazio delle azioni.
  - **3.7.4 Supporto alle applicazioni terminali interattive**: gestione di editor a schermo pieno (nano, vi) e mappatura dei tasti speciali `SPECIAL_KEYS_MAP` (conversione carriage return `\r` vs newline `^J`).
- **3.8 Il Final Evaluator: valutazione deterministica e Root Cause Analysis**:
  - **3.8.1 Stadio 1: raccolta delle metriche**: calcolo deterministico delle metriche di esecuzione, aggregazione evidenze e generazione di `run_summary.json`.
  - **3.8.2 Stadio 2: diagnosi del fallimento e Root Cause Analysis**: triage LLM post-mortem, generazione del report qualitativo `REPORT.md` e dell'`healing_ticket.json`; decisione architetturale sulla rimozione del Diagnostician in-loop a favore della valutazione post-mortem per prevenire il Goal Drift.
- **3.9 Prompt engineering e sviluppo iterativo delle istruzioni**:
  - **3.9.1 Sviluppo e specializzazione dei prompt**: processo iterativo guidato da evidenze empiriche reali (esecuzione del test $\rightarrow$ fallimento operativo $\rightarrow$ introduzione di vincoli costituzionali).
  - **3.9.2 Regole esplicite e formati vincolati**: regole deontologiche dell'Auditor Mode, formati di risposta vincolati, isolamento dei token di reasoning e TTY hygiene.
- **3.10 Modello locale e ottimizzazione dei parametri di inferenza**:
  - **3.10.1 Scelta del modello locale**: indipendenza da API commerciali, superamento dei guardrail etici e sostenibilità economica; vincoli hardware reali (16 GB VRAM, 64 GB RAM); selezione di Qwen 3.8 27B quantizzato GGUF IQ3_S; ruolo essenziale del Chain-of-Thought e calibrazione dello sforzo cognitivo con `reasoning_effort=medium`.
  - **3.10.2 Configurazione e ottimizzazione dell’inferenza**: quantizzazione a 3 bit, KV-cache a 16 bit fp16, speculative decoding con MTP + N-gram, gestione dinamica dei contesti e hot-swap tramite `model_manager.py`.

---

### 4. VulcaHealing: closed-loop self-healing *(7–9 pagine — l'Healer)*
> *(Allineato alla stesura consolidata in `BOZZA SCRITTA/Capitolo 4 - Stesura.md` con accorpamenti recepiti)*  
> **Domanda-motrice:** *Come si ripara in modo autonomo e deterministico il codice IaC a fronte di una non conformità senza alterare le vulnerabilità didattiche e chiudendo il loop con il re-test?*  
> **Lascia aperto:** Il loop agentico è chiuso $\rightarrow$ *"In che misura e con quale efficacia il sistema rileva, diagnostica e corregge i difetti?"* $\rightarrow$ Apre il Cap. 5.

- **4.1 Integrazione di VulcaHealing nel workflow closed-loop**:
  - **4.1.1 Separazione funzionale tra validazione e autoriparazione**: asimmetria operativa tra tester *in-band* (esterno, shell d'attacco, nessun accesso IaC per prevenire scorciatoie) e riparatore *out-of-band* (sorgenti IaC, persistenza); prevenzione del Goal Drift e del conflitto di interessi (chi ripara non ha potere di modifica sull'oracolo di prova).
  - **4.1.2 Estensione dello StateGraph e attivazione condizionale**: estensione naturale del medesimo StateGraph di LangGraph con transizione condizionale `Final Evaluator -> healer_node -> rebuild -> Orchestrator`.
- **4.2 Dal ticket diagnostico alla localizzazione del difetto nell’Infrastructure as Code**:
  - Traduzione dalla diagnosi al codice: la Root Cause Analysis è già chiusa dal Final Evaluator (§3.8); qui il ticket si trasforma in localizzazione mirata nei file IaC.
  - Il principio dell'**Heuristic Lead**: il sintomo registrato è un indizio euristico per risalire la catena delle dipendenze, non una prescrizione rigida.
  - Caso Studio DataVault: falso sintomo HTTP 404 su Nginx causato a monte da permessi errati sul socket PHP-FPM in un task Ansible.
- **4.3 L’Healer: delega operativa a harness agentici generici**:
  - Ruolo complementare degli harness generici: inadatti al testing vincolato (§3.1), ma pienamente appropriati per il code editing multi-file.
  - Integrazione con Antigravity CLI (`agy --mode accept-edits --output-format stream-json /goal`) governata dal controller `healer.py`.
  - Principio di modularità: disaccoppiamento del motore di editing (sostituibile con Claude Code, OpenHands o modelli locali).
- **4.4 Prompt dell’Healer, vincoli operativi e perimetro di modifica**:
  - Vincoli deontologici ispirati alla Constitutional AI:
    1. Riparazione minima e mirata.
    2. Divieto di leakage didattico (*No-Leak*).
    3. Preservazione categorica delle vulnerabilità didattiche (non sanificare le debolezze intenzionali!).
    4. Divieto di modifiche fittizie o cosmetiche.
    5. Economia di esplorazione del repository.
  - Delimitazione rigida del perimetro sul filesystem: sorgenti modificabili (`machines/<slug>.yaml`, webapp) vs sola lettura (`out/<slug>/`, report, documentazione) per impedire modifiche su artefatti effimeri sovrascritti al build.
  - Esecuzione stateless ed esternalizzazione della memoria: iniezione di `BUILD_ERROR.md` in cima al prompt nei cicli successivi in caso di errori di compilazione.
- **4.5 Tracciamento e validazione delle modifiche**:
  - Rifiuto dell'auto-certificazione: verifica oggettiva delle modifiche sul filesystem.
  - Modulo deterministico `diff_tracker.py`: snapshot iniziale pre-fix, calcolo del diff unificato `patch.diff` ed emissione di `HEALING_REPORT.md` via `difflib`.
  - Misurazione della dimensione della patch come metrica per il Benchmark B3.
- **4.6 Chiusura del ciclo: ricostruzione dell'ambiente e riverifica della conformità**:
  - Sequenza operativa: sincronizzazione bundle con VulcaForge (`generator/main.py`) e ricompilazione Docker su Kali.
  - **Caso Studio CS-2**: Il falso positivo da Terminal Echo nel Rebuild Docker e soluzione con marker concatenato quotato (`echo '"__BUILD""_""SUCCESS__"'`).
  - Ricreazione del container Docker (*Clean Slate*), intervallo di stabilizzazione (5s) e risoluzione dinamica dell'IP via `docker inspect`.
  - **Regression testing integrale**: ripartenza obbligatoria da FASE 1 (`current_step_index = 0`) per verificare che la patch non abbia introdotto effetti collaterali sulle fasi precedenti.
  - Condizioni di arresto e limiti attuali: vincolo a tentativo singolo (`MAX_HEALING_ATTEMPTS=1`), dipendenza da modello cloud per l'healing vs modello locale di VulcaTest.

---

### 5. Valutazione Sperimentale *(9–12 pagine — la dimostrazione scientifica)*
> *(Allineato alla formalizzazione di `TESI/BENCHMARK/Benchmark.md` con accorpamenti recepiti)*  
> **Domanda-motrice:** *In che misura e con quale grado di accuratezza, robustezza ed efficienza computazionale VulcaTest e VulcaHealing riconoscono i difetti, diagnosticano la causa radice e riparano le macchine a ciclo chiuso?*  
> **Lascia aperto:** I dati empirici convalidano il sistema $\rightarrow$ Sintesi finale e direzioni future $\rightarrow$ Cap. 6.

- **5.1 Paradigma metodologico: Test Oracle Problem e perturbazione controllata**:
  - Dal "funziona a vista" alla metrologia scientifica: misurabilità, confrontabilità e riproducibilità.
  - Il *Test Oracle Problem* e il rifiuto di oracoli sintetici soggettivi non verificati (*The Test Oracle Problem in Synthetic LLM-as-Judge Corpora*).
  - Il paradigma della *Perturbazione Controllata*: ground truth noto *per costruzione* a partire da macchine nominali sane (*golden machines*).
  - Software testing vs inferenza statistica: i casi di test come sonde progettate ad hoc, non come campioni casuali indipendenti (i.i.d.).
- **5.2 Il dataset di riferimento (Golden Source) e formalizzazione Set Cover**:
  - Le sfide didattiche validate e certificate al 100% (8 macchine B2R: Pizzeria, AuthGate, Citadel, DataVault, WebMaster, CryptoVault, ConsoleGate, PrivAudit + 3 estensioni d'esame).
  - Tassonomia delle vulnerabilità didattiche coperte: LFI, SQLi, command injection, upload bypass, bruteforce SSH, Linux capabilities, SUID, crontab, library hijacking, GTFObins.
  - Dimensionamento del dataset mediante formalizzazione a *Set Cover*: copertura completa e priva di ridondanze dello spazio delle vulnerabilità d'esame.
- **5.3 Metodologia di benchmark: baseline gate, tassonomia perturbazioni (P1–P4) e spazio delle run**:
  - Il **Baseline Gate obbligatorio**: validazione preliminare della macchina sana (se la versione sana non chiude `COMPLETED`, la perturbazione non è valida).
  - Tassonomia delle perturbazioni empiriche (classi P1–P4):
    - *P1 (Provisioning IaC)*: componenti non copiati, dipendenze o task Ansible mancanti.
    - *P2 (Networking e Servizi)*: porte errate, firewall, binding mancanti, demoni down.
    - *P3 (Permessi e Filesystem)*: permessi errati, flag leggibile da subito, SUID preimpostato o mancante.
    - *P4 (Specifica e Logica Didattica)*: oracolo lasco, bypass accidentale dell'intended way, incoerenza nella storyline.
  - Lo spazio multidimensionale delle esecuzioni ($casi \times K \times profilo$):
    - *Casi*: coppie $(\text{base}, \text{operatore})$;
    - *K ripetizioni*: non per potenza campionaria, ma per misurare la *flakiness* e la dispersione dovute alla natura stocastica dell'LLM;
    - *Profilo*: configurazione modelli (Locale vs Cloud).
- **5.4 TestBench: i quattro benchmark operativi (B1 Riconoscimento, B2 RCA, B3 Healing, B4 Costi/Efficienza)**:
  - **B1 — Riconoscimento dei Difetti e Progress Rate**: matrice di confusione (TP, FP, TN, FN) per classe, avanzamento non binario (*Progress Rate* sui checkpoint della checklist, ispirato a *AgentBoard* e *Cybench*).
  - **B2 — Accuratezza Diagnostica (Root Cause Analysis)**: accuratezza della diagnosi del Final Evaluator rispetto alla tripla attesa nota a priori.
  - **B3 — Efficacia di Riparazione (Closed-Loop Self-Healing)**: success rate del re-test completo post-patch, ampiezza della modifica (righe/file da `diff_tracker.py`), riparazioni additive/sottrattive/rifiuti.
  - **B4 — Efficienza Computazionale, Latenza e Consumo di Token**: consumo token per attore e tempi di permanenza per fase; confronto locale vs cloud.
- **5.5 Analisi sperimentale e discussione dei risultati** *(da popolare a conclusione dei benchmark)*:
  - **5.5.1 La questione statistica: pseudo-repliche e argomentazione per copertura**: difesa scientifica sul campionamento correlato; dimensionamento statistico formale come *future work*.
  - **5.5.2 Caso studio ammiraglia Pizzeria_B2R: validazione closed-loop end-to-end**: dimostrazione completa del ciclo difetto $\rightarrow$ blocco $\rightarrow$ ticket $\rightarrow$ healing $\rightarrow$ re-test 7/7 superato (CS-3). Vignette su *Citadel* (cron) e *DataVault* (socket asincroni).
  - **5.5.3 Valutazione comparativa dei modelli**: impatto del reasoning e confronto con modelli orientati al codice (Qwen Coder vs Qwen 3.8 27B come Executor).
  - **5.5.4 Studio di ablazione dei ruoli: l'impatto della modularità contro il Goal Drift**: confronto tra StateGraph a ruoli e agente monolitico privo di vincoli.
  - **5.5.5 Discussione generale delle risultanze empiriche**.

---

### 6. Conclusioni e Sviluppi Futuri *(3–4 pagine — si scrive per ULTIMA)*
> **Domanda-motrice:** *Cosa ha dimostrato questo lavoro, quali sono i suoi limiti intrinseci e quali prospettive apre nella didattica e nella ricerca sulla sicurezza?*

- **6.1 Sintesi del contributo scientifico e progettuale**:
  - Realizzazione del primo harness di conformance testing evidence-based e closed-loop self-healing per ambienti didattici di cybersecurity generati da AI.
  - Validazione empirica del paradigma del *Mechanism Engineering*: primato dell'infrastruttura di controllo e dell'oracolo deterministico sulla potenza bruta dei modelli linguistici.
- **6.2 Limiti della soluzione attuale**:
  - Vincolo del singolo tentativo di autoriparazione (`MAX_HEALING_ATTEMPTS=1`).
  - Dipendenza dalla completezza delle specifiche di design generate a monte da VulcaMind.
  - Dimensione del dataset limitata al programma didattico triennale.
- **6.3 Sviluppi futuri: benchmark esteso con modelli cloud, black-box testing, healing locale e supporto real-time agli esami**:
  - *Modalità Black-Box Testing*: affiancare alla conformance un agente di auditing autonomo privo di writeup per scoprire scorciatoie non intenzionali (*unintended paths*).
  - *Healing completamente locale*: addestramento o fine-tuning di modelli open-weight specializzati per eliminare la dipendenza da API esterne.
  - *Oracolo per esami in tempo reale*: impiego dell'harness per la valutazione continua e l'assegnazione automatica del punteggio durante le prove pratiche degli studenti.
  - *Generazione automatica di dataset di benchmark su larga scala*.
- **6.4 Considerazioni finali**.

---

### Appendici
- **Appendice A — Prompt costituzionali integrali**:
  - A.1 System Prompt del Planner (con Regole 5 e 6).
  - A.2 System Prompt dell'Executor (Auditor Mode, protocollo terminale e checklist).
  - A.3 System Prompt dell'Healer (le 5 regole deontologiche di riparazione).
- **Appendice B — Configurazione del modello locale e parametri d'inferenza**:
  - Parametri Unsloth, quantizzazione GGUF, context window dinamica e speculative decoding (MTP + n-gram).
- **Appendice C — Repository del codice sorgente e note di riproducibilità**:
  - Struttura del repository GitHub, istruzioni Docker/Kali e tracciamento delle dipendenze.
