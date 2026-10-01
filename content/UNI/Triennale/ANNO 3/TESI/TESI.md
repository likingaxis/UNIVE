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

### 3. Architettura VulcaTest *(15–18 pagine — il Tester)*
> *(Allineato alla stesura consolidata in `BOZZA SCRITTA/Capitolo 3 - Stesura.md`)*  
> **Domanda-motrice:** *Come si progetta e si realizza un harness di collaudo che verifichi la conformità dell'intended way senza fidarsi delle autodichiarazioni del modello?*  
> **Lascia aperto:** Il tester emette il report diagnostico e, in caso di non conformità, genera l'`healing_ticket.json` $\rightarrow$ *"Chi interviene per riparare i sorgenti IaC e chiudere il cerchio?"* $\rightarrow$ Apre il Cap. 4.

- **3.1 Dal prototipo all'architettura: perché un harness generico non basta**:
  - Il livello del modello: guardrail commerciali sulle tecniche cyber e insostenibilità economica delle API cloud.
  - Il livello del controllo operativo e dell'oracolo: eccesso di libertà e distorsione da goal-reaching (tentativi out-of-band su Docker/host), assenza di oracolo evidence-based e rischio di allucinazione, carenza di telemetria.
  - *Antigravity come contro-esempio*.
  - Caso empirico di *Pizzeria_B2R*: l'endpoint scoperto per bypass HTML a causa della chat non generata.
- **3.2 Principi di design architetturale**:
  1. *Deterministico quando possibile, probabilistico quando necessario* (CoALA: codice deterministico per flusso/parsing/metriche vs LLM probabilistico per reasoning/exploit/RCA $\rightarrow$ scioglie il dubbio del professore).
  2. *Esecuzione basata su evidenze e rifiuto dell'auto-certificazione* (SWE-bench Pro: verifier gap).
  3. *Separazione delle responsabilità* (Architettura Role-Based per prevenire il Goal Drift).
  4. *Intercambiabilità e modularità architetturale* (modelli, tool e context window pluggabili).
  5. *Controllo gerarchico: Plan-and-Execute a livello macro e ReAct a livello micro*.
- **3.3 Visione d'insieme e architettura di coordinamento**:
  - Inquadramento CoALA: singolo agente cognitivo modulare governato da ruoli specializzati.
  - Gestione della memoria: Working Memory (`VulcaTestState`) e Procedural Memory (codice); esclusione motivata di memoria episodica e semantica (Clean Slate e isolamento scientifico).
  - Punti d'ingresso: Execution Mode vs Planning & Execution Mode.
  - Contratti tipizzati di interfaccia Pydantic (*Structured Artifact Handoff* di MetaGPT).
- **3.4 Il Planner: formalizzazione e parsing dell'Attack Plan**:
  - Architettura ibrida a due stadi: LLM generativo + parser deterministico (`plan_parser.py`).
  - Gerarchia delle fonti (Storyline > Writeup > Description) e de-fence multi-blocco.
  - Regole costituzionali dell'oracolo (**Caso Studio CS-1**: oracolo lasco, connettori logici e grounding del meccanismo di scoperta).
  - Dimensionamento dinamico del contesto (`plan_context_length`).
- **3.5 L'Orchestratore: grafo di controllo e gestione dello stato**:
  - La blackboard condivisa tipizzata (`VulcaTestState`).
  - Topologia dello StateGraph di LangGraph e routing condizionale.
  - Politica di avanzamento: gate logico `AND` sulla checklist e assenza deliberata di retry a livello di grafo.
- **3.6 L'Executor: collaudatore in-band e Auditor Mode**:
  - Il collaudatore in-band: ciclo ReAct vincolato al perimetro dello step.
  - L'Auditor Mode: prompt costituzionale per neutralizzare il *cheating agent*.
  - Gestione dinamica del budget: Graceful Nudge a -2 turni e Checkpoint di proroga.
  - Tool interni e Two-stage retrieval dei valori convalidati (`show_verified_values` $\rightarrow$ `get_verified_value`).
  - Il contratto `StepResult` e la validazione deterministica del verdetto nel codice (`_build_step_result`).
- **3.7 Il Bridge: mediazione operativa, livelli di esecuzione e interazione interattiva**:
  - Canale dell'azione: Livello 1 (HexStrike REST stateless) vs Livello 2 (Terminal Gateway FastAPI + pexpect su porta 8889 per sessioni PTY interattive e persistenti).
  - Canale della percezione: bonifica output ANSI/VT100, `session_last_line`, watchdog adattivo del silenzio (DONE/IDLE/CAP/DEAD).
  - Governo del contesto: troncamento deterministico a 8.000 caratteri e tool-slicing dinamico.
  - Supporto ad editor interattivi (nano, vi, escape carriage return `\r` vs newline `^J`).
- **3.8 Il Final Evaluator: metrologia deterministica e Root Cause Analysis**:
  - Stadio 1 deterministico: metriche quantitative e generazione di `run_summary.json`.
  - Stadio 2 LLM: RCA post-mortem, generazione di `REPORT.md` e triage dell'oracolo (`healing_ticket.json`).
  - La decisione di design sulla rimozione del Diagnostician in-loop (prevenzione del Goal Drift).
- **3.9 Prompt engineering come metodo e processo sperimentale**:
  - Il ciclo iterativo reale: test $\rightarrow$ fallimento empirico $\rightarrow$ regola costituzionale.
  - Dai fallimenti pratici alle regole deontologiche e di TTY hygiene.
- **3.10 Modello locale adottato, infrastruttura di serving e sweet-spot dei parametri**:
  - Motivazioni: privacy, assenza di guardrail offensivi, sostenibilità economica.
  - Esplorazione e selezione: fallimento dell'approccio act-only (perché Qwen Coder falliva senza CoT $\rightarrow$ scelta finale `Qwen 3.8 27B`).
  - Calibrazione del Chain-of-Thought (`reasoning_effort=low`).
  - Ottimizzazioni locali: quantizzazione GGUF e speculative decoding (MTP + n-gram).
  - Architettura di serving con Unsloth e hot-swapping dinamico (`model_manager.py`).
  - Analisi del costo reale di calcolo ("costo molto basso", non zero per l'energia, confrontato con i costi cloud equivalenti).

---

### 4. VulcaHealing: il Ciclo Chiuso di Auto-Riparazione *(7–9 pagine — l'Healer)*
> *(Allineato alla stesura consolidata in `BOZZA SCRITTA/Capitolo 4 - Stesura.md` con accorpamenti recepiti)*  
> **Domanda-motrice:** *Come si ripara in modo autonomo e deterministico il codice IaC a fronte di una non conformità senza alterare le vulnerabilità didattiche e chiudendo il loop con il re-test?*  
> **Lascia aperto:** Il loop agentico è chiuso $\rightarrow$ *"In che misura e con quale efficacia il sistema rileva, diagnostica e corregge i difetti?"* $\rightarrow$ Apre il Cap. 5.

- **4.1 Dal collaudo alla riparazione: motivazioni di un sottosistema separato**:
  - Asimmetria operativa: collaudatore *in-band* (esterno, shell d'attacco) vs riparatore *out-of-band* (sui sorgenti IaC).
  - Separazione delle responsabilità e prevenzione del conflitto di interessi (chi ripara non deve poter manomettere l'oracolo di prova).
- **4.2 Distinguere le evidenze: il principio dell'Heuristic Lead (sintomo vs causa radice IaC)**:
  - Disaccoppiamento tra sintomo esterno e radice dichiarativa (Caso Studio DataVault: HTTP 404 Nginx dovuto a socket errato in Ansible).
- **4.3 Delega operativa ad harness generici: il ruolo di Antigravity CLI**:
  - Competenze richieste: reasoning su codice multi-file.
  - *Antigravity come strumento operativo* headless (`agy --mode accept-edits --output-format stream-json /goal`) governato dal controller `healer.py` (ruolo opposto al Cap. 3).
  - Rispetto del Principio 4: modularità e sostituibilità del motore di healing con altri agenti (Claude Code, modelli locali).
- **4.4 Gestione del prompt costituzionale per modelli di frontiera e perimetro di scrittura**:
  - Le 5 regole deontologiche di riparazione (Constitutional AI):
    1. Riparazione minima.
    2. Divieto di leakage didattico (*No-Leak*).
    3. Preservazione delle vulnerabilità didattiche (non sanificare le falle volute!).
    4. Divieto di modifiche spurie.
    5. Economia di esplorazione.
  - Delimitazione rigorosa dei diritti di scrittura: sorgenti modificabili (`machines/<slug>.yaml`, webapp) vs sola lettura (`out/<slug>/`, report, documentazione) per impedire modifiche su artefatti effimeri.
- **4.5 Tenere traccia delle modifiche: diff deterministico e rifiuto dell'autocertificazione**:
  - Il modulo deterministico `diff_tracker.py`: snapshot iniziale, calcolo del diff unificato `patch.diff` ed emissione di `HEALING_REPORT.md` via `difflib`.
- **4.6 Chiusura del loop agentico: ricompilazione Docker, gate echo-safe e re-test di regressione**:
  - Sequenza operativa del nodo Healer nello StateGraph.
  - Sincronizzazione bundle con VulcaForge (`generator/main.py`).
  - **Caso Studio CS-2**: Il falso positivo da Terminal Echo nel Rebuild Docker e soluzione con marker concatenato (`echo '"__BUILD""_""SUCCESS__"'`).
  - Ricreazione del container Docker (*Clean Slate*) e risoluzione dinamica dell'IP via `docker inspect`.
  - Regression testing completo: ripartenza da FASE 1 per convalidare l'intera catena d'attacco.
  - Cicli stateless ma informati: assenza di `--resume`, con memoria contestuale esternalizzata su filesystem (`BUILD_ERROR.md` iniettato nel prompt successivo).
  - Limiti attuali: vincolo a tentativo singolo (`MAX_HEALING_ATTEMPTS=1`).

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
  - **5.5.3 Confronto empirico tra modelli (Locale vs Cloud)**: impatto del substrato (*Model vs Scaffold*): Qwen 3.8 27B vs API commerciali.
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
- **6.3 Sviluppi futuri: black-box testing, healing locale e supporto real-time agli esami**:
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
