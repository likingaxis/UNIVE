## 1. Setup della call
- pantaloni
- slide che spiegano cosa ho fatto
- esempio di esecuzione
- portatile collegato al mio pc in remoto per fargli vedere il lavoro svolto

---

## 2. Ripasso ecosistema VulcAIn

- VulcAIn: ecosistema che combina agenti AI + IaC per generare macchine vulnerabili (CTF/B2R)
- 3 moduli in pipeline: **VulcaMind** (storyline, percorso di attacco, soluzione) → **VulcaForge** (traduce in IaC: Ansible, Dockerfile, script di verifica) → **VulcaShip** (deployment sull'infrastruttura)
- Problema originale: pipeline **open-loop** — i controlli erano solo sanity check statici (presenza/funzionamento componenti), non garantivano che la macchina fosse *realmente risolvibile* seguendo il percorso ideato da VulcaMind
- La mia parte: **VulcaTest** (chiude il loop: valida la macchina con pentesting agentico rispetto al design) + **VulcaHealing** (se il test fallisce, ripara automaticamente e ri-testa)
- L'intera architettura — sia VulcAIn nel complesso sia la mia white-box — è **role-based**: ogni modulo/nodo ha un ruolo netto, senza sovrapposizioni *(verificare se in letteratura esiste un'etichetta più precisa — "role-based multi-agent system"?)*

---

## 3. Architettura VulcaTest White-Box

Per quanto riguarda VulcaTest ho deciso di definire prima un'architettura disegnata sul concetto white-box, in grado di definire effettivamente la conformance e l'*intended way* della macchina.

**File di input — perché "white-box"**: ha accesso ai file dedicati alla challenge:
- `DESCRIPTION.md` -> descrizione scritta da un umano per definire il design della challenge
- `STORYLINE.md` -> storyline generata da VulcaMind, inventa una storia dietro queste sfide
- `WRITEUP.md` -> writeup di esecuzione, definisce come deve essere svolta la challenge — è però molto superficiale e non definisce bene degli step rigorosi da dover rispettare

**Pattern architetturali, a livelli diversi:**
- **Plan+Execute a livello macro**: il Planner scrive l'intero piano una volta, poi Orchestrator ed Executor lo eseguono step by step senza rinegoziarlo
- **ReAct a livello micro**: dentro il singolo step, l'Executor gira in un loop Reason→Act→Observe turno per turno, con budget dinamico

**Principio architetturale — Evidence-Based Execution / No Self-Certification**: il sistema non si fida mai di un'autocertificazione testuale del modello. Ogni scambio tra i nodi passa attraverso contratti **Pydantic rigidi** (`TestStep`, `StepResult`, `ChecklistItemResult`), non testo libero da interpretare. Il flusso dei dati è: il piano dichiara `produces[]` (cosa ci si aspetta di scoprire in quello step) → l'Executor, chiudendo lo step, riempie `extracted_values` dentro `StepResult` → questi diventano `verified_values` nello stato condiviso **solo se** il gate deterministico sulla checklist (AND logico: un solo `passed:false` forza `FAILED`) è superato. Sono gli oggetti tipizzati a rendere possibile validare questo passaggio con codice deterministico, non con un altro giro di LLM — *questo gate è applicato dentro l'Executor stesso, v. box sotto*.

**Topologia del grafo e modularità (attivazione condizionale dei nodi):** il grafo LangGraph compilato (`orchestrator/graph.py`) parte da `START → orchestrator`, poi alterna `orchestrator ⇄ executor` finché il piano non si esaurisce o uno step fallisce, e converge sul `final_evaluator`. Da qui due esiti: se la macchina è conforme — oppure se l'healing è disattivato — si va a `END`; se è `FAILED` e nel `.env` è impostato `HEALING=true`, il grafo instrada al nodo `healer` e da lì torna all'`orchestrator` per ri-testare la macchina riparata (dettaglio in §5). Ne segue che **due ruoli sono condizionali**:
- il **Planner** vive *a monte* del grafo: non è un nodo LangGraph vero e proprio, ma uno stadio pre-esecuzione invocato da `main.py`. Scatta solo se passo `--generate-plan` oppure se manca `ATTACK_PLAN.md` nella cartella della challenge; altrimenti il piano si carica già pronto da disco e il grafo parte diretto dall'Orchestrator. A livello concettuale è il "nodo 1" della catena, a livello di esecuzione è un pre-processore.
- il **Healer** è invece un nodo del grafo a tutti gli effetti, ma entra in gioco solo con `HEALING=true` (e finché non si supera `MAX_HEALING_ATTEMPTS`).

Questa attivazione condizionale è il riflesso di una scelta di fondo — **tutto è modulare**: non solo i nodi, ma anche i modelli LLM sono intercambiabili per ruolo tramite `.env`. In `config.py` c'è una **triade** di configurazioni (`EXECUTOR` / `EVALUATOR` / `PLANNER`), ciascuna con proprio modello, endpoint e `reasoning_effort`, con hot-swap del peso in VRAM gestito da `model_manager.py`. Così posso confrontare sperimentalmente configurazioni diverse (modello locale vs cloud, planner deterministico vs reasoning, ecc.) senza toccare una riga del core.

**I ruoli dell'architettura** (i quattro nodi del grafo, più il Planner pre-grafo)**:**
- Planner *(stadio pre-grafo, condizionale — v. sopra)*
	- prende in input i tre artefatti didattici di VulcaMind (`DESCRIPTION.md`, `STORYLINE.md`, `WRITEUP.md`) e genera un `ATTACK_PLAN.md` con un formato rigoroso, imposto da un system prompt che obbliga il modello a un certo stile
	- il testo generato viene subito parsato (`orchestrator/plan_parser.py`, funzione condivisa — non un nodo del grafo) e trasformato in oggetti tipizzati: succede sia dentro il Planner stesso appena genera il piano (validazione fail-fast, prima ancora di scrivere il file) sia in `main.py` quando un piano già esistente viene caricato da disco. Così l'Executor lavora sempre su attributi vincolati, non su markdown libero
	- **perché il piano è in YAML e non in JSON**: la scelta segue il destinatario. L'`ATTACK_PLAN` è generato da un LLM e pensato per essere letto e revisionato da un umano (chi progetta la macchina, il relatore, chi valida l'*intended way*), non consumato da un'altra macchina. YAML è più robusto alla generazione probabilistica — una virgola o una parentesi fuori posto non rompono l'intero file come in JSON, quindi meno piani illeggibili e meno retry — gestisce in modo nativo le stringhe multi-linea (gli `objective` e le voci di checklist sono prosa, non dati), ammette i commenti e vive in continuità dentro un documento Markdown. I **contratti tra nodi** seguono invece la logica opposta: dove lo scambio è macchina-a-macchina e serve tipizzazione rigorosa si usa JSON validato da Pydantic (`StepResult`, `run_summary.json`, `healing_ticket.json`). In breve: **YAML dove un LLM scrive e un umano legge, JSON dove il codice deve fidarsi della struttura.**
- Orchestrator
	- gestisce in modo deterministico l'avanzamento del piano, step dopo step
	- **selezione dello step attivo**: tiene un indice di avanzamento (`current_step_index`) e ad ogni giro estrae lo step successivo dalla lista; quando l'indice supera l'ultimo step, marca la run `COMPLETED`
	- **verdetto e "retry policy"**: riceve lo `StepResult` e legge solo `status` (SUCCESS/FAILED, già garantito a monte dall'Executor — qui non si ricalcola nulla). Su SUCCESS: merge di `extracted_values` dentro `verified_values`, avanza l'indice, richiama se stesso per lo step successivo. Su FAILED (basta un solo item della checklist con `passed:false`): **nessun retry a questo livello** — la run si ferma subito e passa dritta al Final Evaluator
- Executor
	- nodo di esecuzione, un vero e proprio Auditor: prende il piano passo passo ed esegue gli step lavorando su una checklist dettagliata che obbliga a verifiche di conformità — basta un solo punto assente per dichiarare il fallimento
	- ha diversi tool per eseguire attacchi, tutti gestiti da `mcp_bridge`
- Final Evaluator
	- Stadio 1 (deterministico, no LLM): calcola le metriche da `step_results`/`state`/`attack_plan` e scrive `run_summary.json`
	- Stadio 2 (LLM, RCA post-mortem): **prima** genera `REPORT.md` (vede l'intero Attack Plan + il dump sanitizzato del solo step fallito), **poi**, solo se c'è un fallimento, una seconda chiamata LLM separata genera `healing_ticket.json`. Se la macchina è conforme, il ticket non viene nemmeno creato
	- instradamento finale: chiusa la relazione, è il grafo (non il nodo) a decidere dove andare — `END` se la macchina è conforme o se l'healing è spento, altrimenti il nodo `healer` (v. topologia a inizio sezione)

Era presente anche un nodo **Diagnostician**, rimosso dopo alcuni test per un problema di **Goal Drift**: un diagnostico in-loop rischia di portare l'Executor a chiudere la challenge "a tutti i costi" pur di dichiararla conforme, invece di aiutare nel reasoning sulla conformità reale. La diagnosi causale (RCA) oggi vive solo post-mortem, nello Stadio 2 del Final Evaluator (v. sopra).

>[!info] **📦 Box — mappa degli oggetti che girano nel codice**
>
> **— Contratti rigidi (validati da Pydantic, `executor/models.py`)** — se un campo manca o ha tipo sbagliato, l'oggetto non nasce.
>
> **`TestStep`** — il piano di un singolo step (dato di *input*, immutabile).
> - *Attributi*: `id`, `objective` (obiettivo in linguaggio naturale), `action` (comando/azione suggerita, opzionale), `produces[]` (nomi dei valori attesi), `checklist[]` (punti da verificare), `allowed_tools[]` (tool ammessi in quello step).
> - *Chi lo usa*: lo produce il **Planner** (markdown → oggetto, via `plan_parser.py`); lo legge l'**Orchestrator** per selezionare lo step e l'**Executor** per eseguirlo. Vive nella lista `attack_plan` dello stato.
> - *Stati*: nessuno — è un input, non ha `status`.
>
> **`StepResult`** — l'esito di un intero step (dato di *output* dell'Executor).
> - *Attributi*: `step_id`, `status`, `summary`, `checklist_evaluation[]` (lista di `ChecklistItemResult`), `extracted_values{}`, `tool_calls[]` (lista di `ToolCallRecord`), `turns_used`.
> - *Chi lo usa*: lo costruisce `Executor._build_step_result()` — ed è lì che scatta l'**AND logico** sulla checklist; lo legge l'**Orchestrator** per il verdetto e il **Final Evaluator** per metriche e RCA. Si accumula nella lista `step_results`.
> - *Stati*: `status ∈ {SUCCESS, FAILED}` — basta *un* punto di checklist a `false` per forzare FAILED.
>
> **`ChecklistItemResult`** — la valutazione di *un* punto della checklist (vive dentro `StepResult`).
> - *Attributi*: `item` (il testo del punto), `passed` (bool), `evidence` (la prova a supporto).
> - *Chi lo usa*: prodotto dall'Executor; è l'AND su tutti i `passed` a decidere lo `status` dello step.
> - *Stati*: `passed` vero/falso.
>
> **`ToolCallRecord`** — la traccia di *una* chiamata a un tool (vive dentro `StepResult`).
> - *Attributi*: `tool_name`, `arguments`, `output`, `duration_seconds`, `exit_code`.
> - *Chi lo usa*: registrato dall'Executor a ogni tool usato; alimenta le metriche (numero di tool call) del Final Evaluator.
> - *Stati*: nessuno; l'`exit_code` conserva l'esito del comando lanciato.
>
> **— Stato condiviso (`orchestrator/state.py`)**
>
> **`VulcaTestState`** — la lavagna comune passata di nodo in nodo.
> - *Tipo*: `TypedDict` (dizionario tipizzato, senza logica propria: solo un contenitore con campi dichiarati).
> - *Attributi* (tra i principali): `attack_plan: list[TestStep]`, `step_results: list[StepResult]` (storico di *tutti* gli step), `verified_values: dict` (i valori promossi a "noti"), `completed_steps`/`failed_steps`, più i campi del ciclo di healing (`healing_attempts`, `healing_status`…).
> - *Chi lo usa*: ogni nodo LangGraph lo riceve *intero* e ritorna solo le chiavi che ha cambiato.
> - *Stati*: porta lui stesso lo stato della run (RUNNING → COMPLETED / FAILED).
>
> **— Oggetti "usa e getta" (dict al volo, senza contratto Pydantic)**
>
> **`failure_detail`** — riassunto del fallimento, non una fonte di dati nuova.
> - *Come nasce*: dentro `final_evaluator_node`, solo se `failed_steps` non è vuoto; ripesca il `TestStep` giusto (per l'`objective`) e il `StepResult` giusto (`summary` → motivo, numero di `tool_calls` → tentativi).
> - *Chi lo usa*: confluisce in `summary_data` sotto la chiave `blocking_failure`.
>
> **`summary_data`** — il dict serializzato su disco come `run_summary.json`.
> - *Contiene*: metadata + metriche calcolate + `blocking_failure` (cioè `failure_detail`) + `verified_values` + `steps_detail` (dump di tutti gli `StepResult`).
> - *Chi lo usa*: è l'output deterministico dello **Stadio 1** del Final Evaluator (nessun LLM).
>
> **`healing_ticket.json`** — il ticket di riparazione per l'healer. **L'unico senza schema.**
> - *Come nasce*: seconda chiamata LLM dello **Stadio 2**, solo in caso di fallimento; è testo vincolato dal *prompt* e non da una struttura, poi solo `json.loads()`-ato.
> - *Conseguenza*: un campo come `defect_type` può uscire con valori fuori dai due suggeriti nel prompt (es. `ENV-PRIVILEGE-MISCONFIG`).

---

## 4. Executor in dettaglio

Ad ogni step del piano viene istanziato un **nuovo oggetto `Executor`**: non ne esiste uno che persiste per tutta la run — uno step, un'istanza. Da solo, quindi, questo oggetto non ricorderebbe nulla del passo precedente. È qui che entra in gioco lo **stato condiviso**: tenere la memoria in un oggetto di stato che si passa di nodo in nodo è il modo *nativo* con cui si lavora in LangGraph, ed è esattamente ciò che fa `VulcaTestState`. È la struttura che porta con sé tutto quel che serve alla run — il piano completo (`attack_plan`), lo storico di ogni step già eseguito (`step_results`), i valori ormai verificati e promossi a "noti" (`verified_values`), l'elenco degli step riusciti e falliti, e i contatori del ciclo di healing. L'Executor perciò non "ricorda" niente di suo: legge e scrive sullo stato, che gli viene ripassato intero ad ogni chiamata *(scheda completa nel Box della sezione 3)*.

**Cosa riceve dal `TestStep`.** Il contesto dello step attivo arriva quasi tutto dal `TestStep`: l'obiettivo, l'azione suggerita, la checklist da verificare, i nomi dei valori da estrarre (`produces`) e — importante — la lista dei tool ammessi (`allowed_tools`), che lo vincola al percorso didattico previsto filtrando quali tool d'attacco può vedere. Il filtro (`mcp_bridge.list_tools()`) ritaglia i soli tool *specializzati* di HexStrike — riconosciuti dal nome, per prefisso o per parola (`hydra` → `hydra_attack`, `nmap` → `nmap_scan`) — ma aggiunge **sempre** i due tool generici `execute_command` e `interactive_terminal_exec`: si dà cioè sempre all'Executor la possibilità di eseguire un'operazione al di fuori dei soliti tool MCP di HexStrike, consentendo un'esecuzione più libera.

**Cosa riceve oltre al `TestStep`.**

> **`target_ip`** — l'indirizzo del bersaglio.
> - *Cosa fa*: dice all'Executor su quale host lavorare.
> - *Da dove viene*: passato a parte al costruttore (`self.target_ip`), **non** è un campo del `TestStep`. Durante l'healing viene riletto dopo il rebuild del container (v. sezione 5).
>
> **`session_info`** — lo stato delle sessioni di terminale.
> - *Cosa fa*: fa sapere all'Executor quali terminali sono già aperti e quale sta usando in questo momento.
> - *Cosa contiene*: l'elenco delle sessioni PTY attive sul Terminal Gateway + quale sia quella corrente.
> - *Da dove viene*: dallo stato condiviso, aggiornato man mano che l'Executor apre nuove sessioni.
>
> **valori noti (solo le chiavi)** — i nomi dei valori già scoperti negli step precedenti.
> - *Cosa fa*: gli dice cosa è già stato estratto, senza però esporgli i valori veri.
> - *Come si usano*: pattern a due stadi — `show_verified_values` per vedere le chiavi disponibili, `get_verified_value` per prelevare on-demand il singolo valore che serve.
>
> **budget di turni** — quanti turni del loop ReAct ha a disposizione per lo step.
> - *Cosa fa*: limita la lunghezza del ragionamento su un singolo step.
> - *Da dove viene*: da `.env` (`EXECUTOR_INITIAL_BUDGET`, default 8), con un tetto massimo invalicabile (`EXECUTOR_HARD_LIMIT`, default 20).

**I tool si dividono in due livelli** — e a fare da smistamento tra i due c'è il **bridge** (`mcp_bridge`), che è una scelta di design prima ancora che un componente: espone al modello un'**unica lista piatta di function-call** e nasconde il fatto che dietro ognuna ci può essere un trasporto diverso. Il modello chiede "esegui questo tool", il bridge decide *dove* mandarlo.

**Livello 1 — i tool d'attacco specializzati (via HexStrike).** Sono nmap, hydra e simili: il motore è **HexStrike**, un server reale che gira su Kali (porta `:8888`). Il bridge ne importa in locale solo gli *schemi*, ma l'esecuzione effettiva è una chiamata HTTP verso Kali. Il limite di questo livello è che il suo `execute_command` è **stateless**: internamente è un runner sincrono headless (stile `subprocess.run`), quindi una volta lanciato il comando non c'è più modo di mandargli input. Il problema si è visto in un test reale: un login SSH ha chiesto la password sul terminale ed `execute_command` è rimasto **bloccato 120 secondi** in attesa di un input che non poteva mai arrivare, bruciando da solo tutto il budget dello step.

**Livello 2 — il terminale interattivo (`interactive_terminal_exec`).** Nasce proprio per superare quel limite, ed è un tool che ho scritto io. Il punto da non confondere: **non è un tool di HexStrike**, è nativo del bridge. Al modello appare come una normale chiamata di funzione, ma il bridge la **intercetta prima che arrivi a MCP** e la serve via **REST puro** al mio **Terminal Gateway** — un servizio FastAPI che, con la libreria `pexpect`, pilota vere sessioni PTY (sempre su Kali, porta `:8889`). Questa è l'architettura: due trasporti diversi (MCP-su-HTTP per HexStrike, REST diretto per il Gateway), un solo modo di chiamarli dal punto di vista del modello.

Ma il Gateway non è un semplice tunnel: incorpora una serie di **funzionalità pensate per un problema concreto**, cioè rendere davvero utilizzabile un terminale a un modello che "ragiona in testo".

- **Sessioni parallele** — può tenere più PTY aperte insieme (ognuna con un suo `session_name`). Non è un vezzo: certi attacchi lo *richiedono*, come un listener in ascolto su una sessione e il comando che lo innesca su un'altra (è il caso della reverse shell di DataVault, v. sezione 6).
- **Riconoscimento dei prompt di password** — un `sudo` o un `ssh` blocca il terminale in attesa di input; il Gateway se ne accorge (disattiva l'eco del terminale e cerca parole-chiave sull'ultima riga) così il modello *sa* che deve mandare la password, invece di restare fermo a fissare una riga che non cambia.
- **Pulizia delle sequenze ANSI** — i terminali sputano codici di colore e formattazione (`\x1b[…`) che per il modello sarebbero solo rumore; vengono ripuliti prima di restituire l'output.

**Due scelte trasversali del bridge, entrambe per non saturare la context window.** Sono cross-cutting — valgono per *tutti* i tool, di qualunque livello — ed è per questo che vivono nel bridge e non in un singolo canale:

- **Troncamento degli output** (`call_tool`) — un comando "ingenuo" come un `find /` può restituire megabyte di testo che, riversati nel contesto, lo riempirebbero e ne degraderebbero il ragionamento. Perciò ogni output oltre la soglia (`MAX_TOOL_OUTPUT_CHARS`) viene tagliato e accompagnato da un avviso — e nel caso dei tool d'attacco anche da un suggerimento pratico ("*se cerchi qualcosa di preciso usa `grep`/`head`/`tail` o restringi il path*").
- **Lista di tool "ritagliata"** (`list_tools`) — il bridge non presenta mai al modello l'intero arsenale: parte dai tool ammessi nello step (`allowed_tools`), ci aggiunge quelli che combaciano per nome e i due generici, e scarta tutto il resto. Doppio vantaggio: meno descrizioni di tool a ingombrare il contesto, e un modello più "incanalato" sul percorso didattico. È qui, tra l'altro, che alla descrizione di `execute_command` viene appeso al volo l'avviso "*sono stateless, per l'interattività usa `interactive_terminal_exec`*".

**La terza categoria — i tool di gestione.** `submit_step_result`, `request_turn_extension`, `show_verified_values`, `get_verified_value`: non toccano la macchina bersaglio, servono all'Executor per **dialogare col sistema** — chiudere uno step, chiedere più turni, consultare i valori noti. Vivono dentro `executor.py` e non passano mai dal bridge.

**L'attesa adattiva dell'output (l'*idle-watchdog*).** C'è un problema specifico: aspettare la fine di un comando **lungo e dai tempi imprevedibili** sul terminale, senza fissare un timeout assoluto (troppo corto uccide il comando lento, troppo lungo fa perdere tempo su uno ormai morto). Il caso concreto che l'ha reso necessario è il `docker build` che ricompila la macchina durante l'healing (v. sezione 5): può volerci molto, e quanto non si sa in anticipo. La soluzione (in `wait_utils.py`) ribalta il criterio: non si aspetta *un tot di secondi totali*, ma ci si arrende solo dopo *un tot di secondi di **silenzio***. Il mattoncino è `watching()`, che guarda l'ultimo pezzo di output e dice se è arrivato qualcosa di nuovo — il "**segno di vita**" del processo; `wait_until()` lo usa per azzerare il cronometro dell'inattività ad ogni segno di vita, e chiude in `DONE`, `IDLE` (troppo silenzio, default 300 s) o `DEAD` (sessione morta). Il punto delicato è **come fa a sapere che il build è finito**: non lo indovina a tempo, lo *legge*. È il comando stesso a stampare un marcatore-sentinella alla fine (`__BUILD_SUCCESS__` / `__BUILD_FAILED__`, scritto a "token spezzati" per non farsi ingannare dall'eco del terminale — v. sezione 5), e `DONE` scatta nell'istante in cui quel marcatore compare nell'output. Il meccanismo è **generico per costruzione** — marcatore e soglia di silenzio sono parametri, non valori fissi — quindi potrebbe governare qualunque altro comando lungo sul terminale; ma il completamento che oggi "sorveglia" davvero è quello del build. *(Le normali esecuzioni dell'Executor usano invece l'attesa a tempo fisso `wait_seconds`.)*

**Come si guida un editor a schermo intero (nano/vim).** Un problema tutt'altro che ovvio: salvare e uscire da nano o vim richiede caratteri di controllo (`Ctrl+O` = `\x0f`, `Ctrl+X` = `\x18`, `ESC` = `\x1b`) che un modello, ragionando in testo, non ha modo di "indovinare" come byte. La traduzione dal *nome leggibile del tasto* al byte giusto avviene nel bridge (`mcp_bridge.py`) in due pezzi complementari: una tabella (`SPECIAL_KEYS_MAP`) copre i tasti *con un nome* — `esc`, `enter`, le frecce, `home`/`end`, `page_up`/`page_down`, fino a un'intercettazione difensiva di certi codici Unicode "strani" iniettati da WebDriver; e una funzione (`_resolve_terminal_input`) che risolve *per calcolo* le combinazioni `ctrl+<lettera>` (e la notazione a cappelletto `^<lettera>`), così `ctrl+o` diventa `\x0f` senza doverle elencare una per una. Risultato: il modello scrive nomi di tasti leggibili, il sistema li converte nei byte grezzi.

Un episodio reale, qui, ha fatto nascere anche una regola di prompt. nano ha mostrato una conferma imprevista (`open anyway? Y/N`, per un file di lock `.swp` rimasto da un test interrotto) e l'Executor l'ha scambiata per output statico, tirando dritto come se fosse già tornato alla shell. Da lì la regola di **state-awareness**: non sparare comandi alla cieca finché un'applicazione interattiva non si è davvero chiusa e il prompt della shell non è tornato visibile.

**Cosa produce.** L'output di ogni chiamata è uno `StepResult` — lo stesso oggetto tipizzato descritto nel Box della sezione 3 (stato, riassunto, valutazione della checklist, valori estratti, tool usati, turni consumati).

**Il retry vive solo qui.** L'unico meccanismo di "riprova" è interno allo step: il budget dinamico di turni e la possibilità di chiederne altri (`request_turn_extension`) fino al tetto massimo — entrambi i valori (budget iniziale `EXECUTOR_INITIAL_BUDGET` e tetto `EXECUTOR_HARD_LIMIT`) sono **tarabili da `.env`**, senza toccare il codice. A livello alto, invece, **non c'è retry**: se lo step fallisce, si va dritti al Final Evaluator, senza secondi tentativi.

**Due accorgimenti che tengono in piedi il loop ReAct.**

- *Graceful Nudge* — se il modello risponde con solo testo, **senza chiamare alcun tool**, ma ha ancora budget, l'Executor non lo boccia: gli inietta un messaggio di sistema che lo sollecita a usare un tool (o a chiudere lo step) e prosegue. Evita di bruciare uno step per una singola risposta "discorsiva", tipica dei modelli di reasoning.
- *Checkpoint di budget* — quando il budget corrente si esaurisce, l'agente è messo davanti a una scelta netta: chiedere un'estensione (`request_turn_extension`) se la catena sta avanzando, oppure chiudere lo step (`submit_step_result`) se è bloccato. Solo al raggiungimento del tetto massimo scatta la chiusura forzata (`_force_final_submission`).

**Da dove nasce tutto questo: il "Cheating Agent".** Nei primissimi test — un LLM con un semplice harness, senza Auditor Mode — l'agente tendeva a "risolvere a tutti i costi" invece di certificare onestamente un fallimento: in letteratura è il *reward hacking* / *specification gaming*. Auditor Mode nasce esattamente per contenere quella spinta.

*(Nota a voce)*: Auditor Mode contiene la spinta a *barare*, non è una censura etica — sono due assi diversi. Un modello locale "zero-refusal" avrebbe lo stesso identico rischio, se non fosse vincolato dal system prompt.



---

## 5. VulcaHealing

**Cos'è e dove vive.** Il self-healing chiude il loop. Senza, VulcaTest si ferma a certificare che la macchina è rotta. Con esso, il sistema tenta di ripararla e di ri-testarla in autonomia. Si attiva a due condizioni congiunte: il Final Evaluator ha certificato `FAILED` e nel `.env` è attivo `HEALING=true`. In quel caso il grafo instrada al nodo `healer` (v. la topologia nella sezione 3).

Il nodo `healer` contiene poca logica propria e delega a due moduli esterni al white-box. `healer.py` è il controller che pilota l'agente di riparazione. `diff_tracker.py` calcola in modo deterministico le modifiche apportate. Come nel resto del sistema, il comportamento è configurabile da `.env`: `HEALING`, `HEALING_MODEL`, `MAX_HEALING_ATTEMPTS` (default 1), `HEALING_TIMEOUT`, `HEALING_DRY_RUN`.

**Il principio di fondo: contesto asimmetrico (*Heuristic Lead*).** Il meccanismo si regge sul fatto che, tra chi *diagnostica il sintomo* e chi *ripara la causa*, le informazioni disponibili sono diverse.

Sul versante del sintomo lavorano l'Executor e il Final Evaluator. L'**Executor** interagisce con la macchina dall'esterno, come con una scatola nera, e ne raccoglie le evidenze osservabili: un 404, un 403 "Access denied", un `whoami` che restituisce l'utente sbagliato. Il **Final Evaluator** non accede alla macchina: si basa sulle evidenze riportate dall'Executor per formulare il ticket (`healing_ticket.json`) con la sua `recommended_patch`. Poiché quella patch nasce dai soli sintomi, è un'ipotesi spesso imprecisa: può indicare "modifica Nginx" quando la causa reale è in PHP-FPM.

L'**Healing Node** parte invece dall'altro capo, i sorgenti. Ha accesso completo all'Infrastructure-as-Code che genera la macchina: la ricetta (`machines/<slug>.yaml`), la webapp (`registry/web/webapps/<slug>/`) e, in sola lettura, il bundle compilato (`out/<slug>/`).

La regola che collega i due versanti è l'**Heuristic Lead**: il REPORT e la patch suggerita indicano *dove* guardare, non *cosa* fare. Il sintomo è a valle, la causa a monte nei sorgenti. Esempio reale (DataVault): il ticket indicava "il server rifiuta i file `.pHP`, intervenire su Nginx", ma l'analisi dei manifest ha individuato un'altra causa — un bug di scoping di Ansible (una `with_fileglob` risolta sul nodo di controllo Windows, che faceva saltare un task senza segnalare errori) — e la correzione corretta era su PHP-FPM.

**Il system prompt dell'agente (`_build_healing_prompt`).** All'agente di riparazione non viene passato il dettaglio di un singolo bug, ma un system prompt generico in 7 sezioni: chi è, come funziona il sistema che deve riparare e cosa può toccare, il fatto che il REPORT è solo un indizio, il metodo diagnostico da seguire, le regole di riparazione, lo storico dei tentativi precedenti, la chiusura. Due parti di questo prompt sono i vincoli più importanti.

**1. Il perimetro di scrittura.** Definisce su quali file l'agente può intervenire. Può **scrivere** solo sui sorgenti a monte (`machines/<slug>.yaml` e `registry/web/webapps/<slug>/`). Il bundle compilato (`out/<slug>/`) è in **sola lettura**: lo consulta per vedere cosa è finito effettivamente sulla macchina, ma non lo modifica, perché viene rigenerato dal framework. Il codice del framework interno è **fuori perimetro**. Il vincolo serve a impedire che l'agente corregga l'artefatto sbagliato — per esempio il file già compilato invece del sorgente che lo produce.

**2. Le regole di riparazione.** Vincolano *come* l'agente deve riparare, e sono anch'esse scritte nel prompt. Sono cinque, e saranno la base delle metriche di healing in tesi:

- fix minimo, solo il delta necessario;
- interpretazione restrittiva del design;
- nessun abbassamento della difficoltà della macchina;
- nessun leak: mai flag, credenziali o hint nel codice servito allo studente;
- preservazione delle vulnerabilità didattiche volute.

L'obiettivo complessivo è far esistere il percorso previsto senza renderlo più facile del previsto.

**Il flusso operativo (`run_healing`).** Cinque passi in sequenza.

**1. Snapshot pre-intervento.** `take_folder_snapshot()` percorre l'albero dei sorgenti (`vulcaforge/`) e ne salva in memoria il **contenuto testuale**: costruisce un dizionario che associa a ogni file di testo il suo contenuto (i file binari e alcune cartelle sono saltati, v. più sotto). Non salva nomi o date di modifica, ma proprio il testo — ed è questa la scelta che rende possibile, a fine intervento, calcolare un diff riga per riga confrontando "prima" e "dopo".

**2. Draft immutabile (backup fisico).** `backup_machine_draft()` fa una cosa diversa dallo snapshot, e complementare: copia **su disco** (in `healing_N/draft_pre_fix/`) due artefatti specifici — la ricetta della macchina (`machines/<slug>.yaml`) e l'intero bundle già compilato (`out/<slug>/`). Lo snapshot è una copia *in memoria* dei sorgenti, usata per il confronto; il draft è una copia *fisica e permanente* dello stato della macchina prima del fix, che resta come riferimento ripristinabile e termine di paragone, indipendente da ciò che l'agente modificherà.

**3. Riparazione via Antigravity CLI.** L'agente di riparazione è l'eseguibile `agy`, lanciato come sottoprocesso. Il comando è:

```
agy --mode accept-edits --dangerously-skip-permissions --model <HEALING_MODEL> --output-format stream-json --print-timeout=<T>s -p <prompt>
```

Due scelte, in questa riga:

- **`--output-format stream-json` e flusso a schermo.** La CLI emette gli eventi come JSON in streaming, una riga per evento. Un thread di lettura li interpreta (`format_agy_event`) e li stampa **a video in tempo reale**, salvandoli anche in `agy_execution.log`. Il motivo è l'osservabilità: `agy` lavora headless e può girare per parecchi minuti, quindi vedere in diretta cosa sta leggendo e modificando — e conservarne il log — è indispensabile per seguire e diagnosticare un intervento autonomo.
- **Il timeout, a due livelli.** `HEALING_TIMEOUT` (default 1200 s, 20 minuti) è il tetto imposto *da noi*: se scade, il sottoprocesso viene ucciso. Ma la CLI ha *anche* un proprio timeout interno (`--print-timeout`) fissato di fabbrica a 5 minuti, troppo pochi per un healing reale. Per questo glielo passiamo esplicitamente, allineato a `HEALING_TIMEOUT`: senza, la CLI si fermerebbe dopo 5 minuti pur avendo noi concesso 20.

**4. Fail-safe di ricompilazione.** A prescindere dal fatto che l'agente abbia rigenerato la macchina, richiamo io il generatore VulcaForge (`generator/main.py ... --no-check`). Così la sincronizzazione tra sorgenti (`registry/`) e bundle (`out/`) è garantita in modo deterministico. Nasce da un caso reale in cui l'agente aveva scritto i file corretti nel sorgente ma senza compilarli.

**5. Diff deterministico.** `compute_folder_diff()` scatta un nuovo snapshot (lo stato "dopo"), lo confronta con quello "prima" e produce due file: `patch.diff` (un diff unificato, in stile Git) e `HEALING_REPORT.md` (un riepilogo leggibile). La scelta progettuale è la stessa del "niente auto-certificazione" del resto del sistema: *quali* modifiche siano state fatte non lo racconta l'LLM, lo calcola il codice confrontando i contenuti reali dei file. Non a caso, l'ultima sezione del system prompt istruisce esplicitamente l'agente a *non* calcolare differenze né scrivere patch: a quello pensa VulcaHealing. Il resoconto delle modifiche è così affidabile e verificabile, senza allucinazioni.

**Il ritorno nel grafo: la chiusura fisica del loop (`healer_node`).** Finito `run_healing`, il nodo ricostruisce il container su Kali e resetta lo stato per il retest.

- **Rebuild con gate.** Parte il `docker build` dell'immagine. Per sapere quando è finito si usa l'idle-watchdog della sezione 4: il comando di build stampa in coda un marcatore e `wait_until()` chiude in `DONE` appena quel marcatore compare nell'output. Il marcatore di successo è `__BUILD_SUCCESS__` (in caso di errore, `__BUILD_FAILED__`). Un accorgimento necessario: nell'`echo` il marcatore è scritto a pezzi separati (`echo "__BUILD""_""SUCCESS__"`), così quando il terminale ri-echeggia la riga di comando questa non contiene la stringa intera e non fa scattare un falso `DONE` — era il bug che faceva credere il build finito in ~0,3 secondi e rideployava la *vecchia* immagine. Il `docker run` parte **solo** se `__BUILD_SUCCESS__` compare davvero. Se il build fallisce non c'è deploy: il container resta com'è e l'errore finisce in `BUILD_ERROR.md`.
- **IP dinamico.** Dopo il rebuild rileggo l'IP reale del container (`docker inspect`) e aggiorno `target_ip` nello stato. Evita che il retest fallisca solo per un cambio d'indirizzo assegnato dall'IPAM di Docker.
- **Reset e retest.** Azzero indice, valori e risultati (`status = RUNNING`) e torno all'orchestrator, che riparte dallo step 1 sulla macchina risanata. Il ciclo si ripete fino a `MAX_HEALING_ATTEMPTS`.

*(Nota infrastrutturale: `agy` gira sull'host Windows e modifica i sorgenti, il generatore rigenera `out/` sempre su Windows, mentre il `docker build` avviene su Kali, che vede la cartella tramite un mount condiviso del repository. Da qui la breve attesa di flush del filesystem prima del build.)*

**Il diff in dettaglio (`diff_tracker.py`).** La funzione `is_binary_or_excluded()` tiene fuori dal `patch.diff` i file non testuali prodotti dal build. Per "file binari" si intendono gli artefatti che non sono testo leggibile — archivi compilati (`.tar.gz`, `.zip`), immagini (`.png`), database (`.db`, `.sqlite`), eseguibili (`.bin`) — che in un diff testuale produrrebbero solo caratteri illeggibili. Il filtro li riconosce in due modi: per estensione (una blacklist) e per contenuto (se trova un byte nullo `\x00` nei primi 1024 byte del file, lo tratta come binario). Il risultato è un diff pulito, leggibile sia da un revisore umano sia in un commit Git.

**Cicli stateless ma informati.** Ogni chiamata `agy -p` è una sessione nuova e senza stato. Non si usa `--resume`, che trascinerebbe l'intero transcript e farebbe crescere i token invece di ridurli. Lo stato tra un tentativo e l'altro vive quindi sul filesystem. Il ciclo N legge gli `HEALING_REPORT.md` dei tentativi precedenti — il prompt gli dice di leggere il *report*, non i voluminosi `patch.diff` — per sapere cosa è già stato tentato senza successo e cambiare approccio. E se il ciclo N-1 ha rotto la build, il suo `BUILD_ERROR.md` viene messo in cima al prompt del ciclo N come priorità assoluta: "la tua ultima modifica ha rotto la build, sistemala prima di rincorrere la conformità".

**Esito: la prima certificazione closed-loop (Pizzeria B2R).** La prima certificazione closed-loop end-to-end con oracolo severo è stata ottenuta su Pizzeria B2R (evidenze in `evidence/11.Pizzeria_B2R/latest/` e `healing/healing_1/`). È arrivata dopo aver corretto tre bug d'infrastruttura nel loop di rebuild — il falso positivo dovuto all'eco del marcatore, il deploy incondizionato e il timeout fisso — e una debolezza dell'oracolo: una voce di checklist disgiuntiva ("…tramite la chat *o* l'interfaccia") che rendeva il collaudo aggirabile. Il dato rilevante è che il self-healing non falliva per un limite del modello, ma per fragilità dell'infrastruttura nel loop di rebuild. Il percorso completo, con i fix in vigore: macchina generata senza la chat prevista (difetto) → diagnosi `IAC_GENERATION_DEFECT` → l'healer crea `chat.php` e `chat.js`, integra il widget e rimuove il link diretto che permetteva di saltare la chat → retest `COMPLETED`, 7 step su 7 fino a root. La certificazione parte quindi da una macchina difettosa e attraversa una riparazione reale: verifica il closed-loop, non solo l'esecuzione. In tesi è formalizzata come trittico di casi di studio (CS-1 oracolo lasco → CS-2 echo bug → CS-3 milestone).

**Limiti attuali.** Due precisazioni, per non attribuire al sistema più di quanto faccia oggi:

- **Un solo tentativo di default.** `MAX_HEALING_ATTEMPTS` è fissato a 1: il ciclo esegue *una* riparazione seguita da *un* retest, non ritenta molte volte. Il valore è estendibile da `.env`, ma la certificazione qui sopra è avvenuta con un singolo tentativo.
- **Un'incoerenza nota nel codice.** La funzione che ricava lo `slug` della challenge (`resolve_challenge_context()`) lo deriva in due modi diversi a seconda che il nome arrivi come parametro esplicito o da variabile d'ambiente, e solo uno dei due rami rimuove il prefisso numerico in stile VulcaMind (per es. il `11.` di `11.Pizzeria_B2R`). Oggi non causa problemi (in pratica il nome non arriva mai con quel prefisso), ma è un punto ruvido da ripulire.

---

## 6. Test Eseguiti

Per validare l'Executor l'ho messo alla prova su **quattro macchine B2R**, ognuna costruita per stressare una capacità precisa e con vulnerabilità e difetti **noti a priori** (la ground truth con cui confrontare l'esito). Tutte le evidenze sono in `white-box/evidence/<challenge>/`. Ogni macchina è descritta con lo stesso schema: cosa mette alla prova, la catena di vulnerabilità che il percorso previsto attraversa, e l'esito con le flag e il riferimento all'`output_N` di evidenza.

### 1. Pizzeria_B2R — il caso di self-healing

Mette alla prova l'intera catena Design → Test → RCA → Healing → retest: è la macchina su cui è stato certificato il closed-loop (indirizzo `172.17.0.2`).

Il percorso previsto parte da una ricognizione web e sfrutta una **LFI** (`orari.php?file=`) per leggere `/etc/passwd`. Da lì un leak di credenziali in `config.php` (`user:user`) apre un foothold via SSH. La lettura di `/opt/test.sh` fornisce la password di `franchino`, che consente un **movimento laterale** (`su franchino`); l'audit `sudo -l` rivela la possibilità di eseguire `sudo /bin/nano /etc/passwd`, sfruttata in stile GTFOBins (aggiunta di una riga con UID 0) per arrivare a **root**.

La particolarità di questa macchina è un'**incoerenza didattica** che ha innescato l'healing. La `DESCRIPTION` prevedeva una chat di assistenza come meccanismo *nascosto* per scoprire `/orari.php`, ma la pipeline non l'aveva generata e il link era esposto in chiaro. VulcaTest ha bloccato FASE_2 (ticket con `defect_type = IAC_GENERATION_DEFECT`, `blocking_step = FASE_2`) e VulcaHealing ha creato `chat.php` e `chat.js`, integrato il widget e rimosso il link diretto, chiudendo il bypass.

*Esito.* Closed-loop certificato: da macchina **difettosa** (FASE_2 bloccata), attraverso una riparazione reale, fino al retest **COMPLETED 7/7** (~26 minuti, inclusi build e ciclo di healing). Un'unica run mostra così le due facce del collaudo: bloccare la macchina rotta e, dopo il fix, promuovere quella corretta. Flag `user VDSI{f00th0ld_4cqu1r3d_ch3_p1zz4}` e `root VDSI{r00t_pwn3d_p1zz4_m4rgh3r1t4}`. Evidenze in `evidence/11.Pizzeria_B2R/latest/` (`REPORT.md`, `healing_ticket.json`) e in `healing/healing_1/` (`patch.diff`, `HEALING_REPORT.md`).

### 2. AuthGate_B2R — bruteforce, permessi, GTFOBins

Mette alla prova gli attacchi a dizionario e una privilege escalation classica (indirizzo `172.17.0.2`).

Dalla homepage sono raggiungibili `/staff.txt` (l'elenco degli utenti) e `/passwords.txt` (una wordlist). Con questi, **Hydra** trova via SSH la coppia `operator:Summer2026!` (al tentativo 11 su 25) e apre il foothold. La chiave `id_rsa` ha però permessi troppo aperti (`0644`) e il primo `ssh -i` viene rifiutato: l'agente applica `chmod 600` e accede come `sysadmin`. L'escalation finale sfrutta una regola `sudoers` (`sysadmin` può eseguire `/usr/bin/vi` come root senza password) con la tecnica GTFOBins per `vi` (`:!/bin/bash`), fino a **root**.

*Esito.* COMPLETED 5/5 (`output_7`), 247,4 s, 19 chiamate a tool. Flag `user VDSI{hydr4_brut3_f0rc3_4nd_k3y_p3rms_pwnd}` e `root VDSI{v1m_m0d4l_3sc4p3_r00t_m4st3r}`.

### 3. DataVault_B2R — metadati, upload, reverse shell asincrona, capabilities

Mette alla prova quattro capacità in un'unica catena (indirizzo `172.17.0.4`): l'estrazione di un segreto dai **metadati** di un'immagine (non dai pixel), un **upload web** con bypass di una blacklist, una **reverse shell asincrona** che richiede più sessioni di terminale in parallelo, e una privilege escalation via **Linux capabilities**.

`exiftool` sul commento EXIF di `vault_banner.jpg` rivela il segreto ("Dev note: … portal available at `/upload.php`. Blacklist filter blocks .php files"). Sfruttando il fatto che il filtro è case-sensitive, l'agente carica una webshell con estensione `.pHP`. Apre quindi una **reverse shell** coordinando due sessioni: un listener `nc -lvnp` su una (`session_name="listener"`) e il trigger via cURL su un'altra (`"default"`), poi stabilizzata con `python3 pty.spawn`, ottenendo una shell come `www-data`. Infine `getcap` rivela una `CAP_SETUID` su Python, sfruttata per la privesc a **root**.

Questa macchina risponde a una domanda precisa: l'Executor sa gestire più sessioni insieme? Sì. È qui che il Session Broker regge due PTY concorrenti (listener e trigger) senza bloccarsi — una capacità progettata (il parametro `session_name`) e validata sul campo.

*Esito.* COMPLETED 10/10 (`output_11`), 458,9 s, 41 chiamate a tool. Flag `user VDSI{4sync_sh3ll_br0k3r_m1m3_byp4ss_pwnd}` e `root VDSI{c4p_s3tu1d_pyth0n_k3rn3l_pr1v3sc_m4st3r}`. Vale la pena notare che una run precedente (`output_7`) era `FAILED 5/10`, bloccata da un difetto IaC reale: la direttiva `security.limit_extensions` di PHP-FPM saltata per un bug di scoping Ansible. È un buon esempio di test che intercetta un bug d'infrastruttura, poi risolto.

### 4. Citadel_B2R — catena lunga multi-hop, tenuta del contesto

È la macchina più complessa (indirizzo `172.17.0.5`): **14 fasi consecutive** con **due movimenti laterali distinti**. Serve a verificare la tenuta dell'Executor sulle catene lunghe, dove i rischi sono le allucinazioni e la degradazione della context window man mano che si accumula lo storico. *(Da non confondere con il "context bleeding", che indica la fuga di informazioni di soluzione nel contesto dell'agente: è un problema di isolamento, diverso. Qui il rischio è la degradazione del contesto su una catena lunga.)*

La catena parte da una **SQLi** che bypassa il login (`' OR 1=1--`) e porta alla dashboard. Da qui va estratto il **testo di un PDF** di audit: l'endpoint utile (`/admin/tools/diagnostic.php?target=`) è scritto nel *corpo* del documento, non nei metadati. Il tool previsto (`pdftotext`) non era installato e l'agente si è adattato usando `strings`. L'endpoint è vulnerabile a **command injection** (quote breakout), che apre una reverse shell come `www-data`. Il **primo movimento laterale** sfrutta un cron job scrivibile con un'iniezione *time-aware*: l'agente ha atteso circa un minuto l'esecuzione automatica del cron come root, arrivando a `sysadmin`. Il **secondo** sfrutta un binario **SUID** custom vulnerabile a **PATH hijacking**, fino a **root**.

*Esito.* COMPLETED 14/14 (`output_4`), 856,8 s, 75 chiamate a tool. Flag `user_flag_1 VDSI{c1t4d3l_sql1_pdf_c0mm4nd_1nj_pwnd}`, `user_flag_2 VDSI{cr0nj0b_t1m3_4w4r3_l4t3r4l_m0v3_succ3ss}` e `root VDSI{su1d_p4th_h1j4ck_c1t4d3l_r00t_m4st3r}`. Dimostra che Two-Stage Retrieval e Session Broker reggono catene lunghe e multi-hop senza perdere lo stato tra fasi eterogenee.




---

## 7. Piano scientifico da proporre

*(da scrivere insieme)*
