## Come farlo eseguire
- **Setup e preparazione dell'ambiente**
	- Prepara l'immagine e il container Docker del target (su Kali):
		```bash
		cd ~/Desktop/TESI/vulcAIN/macchine_challenge_modificate/<nome_challenge>
		docker build -t <nome_immagine> .
		# Avvio facoltativo (l'orchestrator può gestirne il reset automatico):
		docker run -d --name <nome_container> <nome_immagine>
		```
	- Avvia i due server di supporto su Kali Linux:
		- **Terminal Gateway** (gestione shell interattiva PTY/TTY con `pexpect` e `FastAPI` su porta 8889):
			```bash
			cd ~/Desktop/TESI/vulcAIN/vulcatest/terminal_gateway
			uv run uvicorn terminal_gateway:app --host 0.0.0.0 --port 8889
			```
		- **HexStrike Server** (API dei tool di sicurezza e scansione su porta 8888):
			```bash
			cd ~/Desktop/TESI/vulcAIN/hexstrike
			python3 hexstrike_server.py --host 0.0.0.0 --port 8888
			```
```docker
	docker inspect -f '{{.Name}}: {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -q)
```
- **Configurazione del `.env` (`vulcatest/white-box/.env`)**
	- Percorsi della challenge e dell'Attack Plan:
		- `CHALLENGE_NAME="Nome Challenge"`: etichetta descrittiva/didattica della sfida (es. *"Web Exploitation Masterclass"* o *"Social Y (Exam 1APP26)"*), utilizzata nei banner di esecuzione e nell'intestazione dei report di conformità.
		- `CHALLENGE_DIR=C:\Users\Luca\Desktop\TESI\vulcAIN\vulcamind\<cartella_challenge>`: cartella sorgente della documentazione della challenge. Deve contenere obbligatoriamente i 3 file didattici scritti dal tutor:
			- `DESCRIPTION.md`: panoramica generale della sfida, obiettivi di alto livello e regole di ingaggio.
			- `STORYLINE.md`: contesto narrativo e scenario di ambientazione del test.
			- `WRITEUP.md`: guida risolutiva passo-passo originale del tutor con comandi, payload, porte, credenziali e percorsi dei flag.
			*(Questi tre file costituiscono la Knowledge Base passata in input al Planner per elaborare il piano operativo).*
		- `PLAN_PATH=C:\Users\Luca\Desktop\TESI\vulcAIN\macchine_challenge_modificate\<cartella>\ATTACK_PLAN.md`: file di destinazione e lettura del piano d'attacco strutturato in formato Markdown.
			- Se il file esiste già: il runner lo carica direttamente tramite `plan_parser.py`, risparmiando tempo e token LLM.
			- Se il file non esiste (o con `--generate-plan`): il Planner salva in questo percorso il piano d'attacco appena generato.
	- Dati del container target:
		- `TARGET_DOCKER_CONTAINER=<nome_container>`
		- `TARGET_DOCKER_IMAGE=<nome_immagine>`
		- Ricava il Target IP su Kali con docker inspect:
			```bash
			docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <nome_container>
			```
		- `TARGET_IP=172.17.0.2`
	- Configurazione modulare degli endpoint LLM (permette di separare host/porte o modelli per ruolo):
		- `PLANNER_BASE_URL=http://192.168.1.3:8888/v1`
		- `EXECUTOR_BASE_URL=http://192.168.1.3:8888/v1`
		- `FINAL_EVALUATOR_BASE_URL=http://192.168.1.3:8888/v1`
- **Esecuzione con `uv`**
	- Installazione rapida di `uv` (se non già presente sul sistema):
		- **Linux / macOS (One-liner):**
			```bash
			curl -LsSf https://astral.sh/uv/install.sh | sh
			```
		- **Windows (PowerShell One-liner):**
			```powershell
			powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
			```
		- *Alternativa rapida con pip:* `pip install uv`
	- Spostarsi nella root del test engine e installare/sincronizzare le dipendenze in un istante:
		```bash
		cd C:\Users\Luca\Desktop\TESI\vulcAIN\vulcatest\white-box
		uv sync
		```
	- Esecuzione standard (usa l'Attack Plan già compilato):
		```bash
		uv run main.py
		```
	- Generazione o rigenerazione forzata del piano tramite LLM Planner:
		```bash
		uv run main.py --generate-plan
		```
	- Visualizzazione dei parametri e opzioni disponibili:
		```bash
		uv run main.py --help
		```
	- Tag e flag principali di `main.py`:
		- `--generate-plan`: invoca l'LLM Planner per ricompilare da zero `ATTACK_PLAN.md` leggendo i markdown della challenge.
		- `--no-reset` (o `--no-restart`): disabilita il reset automatico **Clean Slate** del container.
			- *Cosa fa il reset di default:* prima di ogni test, `main.py` invia a Kali il comando:
			  ```bash
			  docker rm -f <target_container> && docker run -d --name <target_container> <target_image>
			  ```
			  inoltre svuota la cache di HexStrike (`clear_cache()`). Questo assicura l'idempotenza e garantisce che ogni run parta da uno stato completamente vergine senza file o modifiche lasciate da exploit precedenti.
			- *Quando usare `--no-reset`:* quando il container è già attivo e configurato manualmente, o per fare debug veloce evitando i tempi di riavvio.
		- `--output-name <nome>`: imposta un nome custom per la cartella di evidenze (default: incrementale automatico `output_1`, `output_2`, ecc.).
		- `--plan <percorso>`: specifica un file di Attack Plan alternativo.
		- `--target-ip <IP>`: sovrascrive temporaneamente l'IP del target senza modificare il `.env`.
## Cosa ho fatto
- ho realizzato l'architettura whitebox senza diagnostician composta da
	- planner
	- executor
	- final evaluator

andando più nel dettaglio con i file e le cartelle abbiamo:
- cartella vulcatest 
	- cartella hexstrike dentro ha il client hexstrike che viene usato dal bridge mcp
	- cartella terminal_gateway
	- file terminal_gatway.py  server consente le comunicazioni con il terminale kali mediante limpreria pexpect e fastapi da dover eseguire su kali
	- cartella white-box
		- evidence (contiene gli output delle varie run divise per cartelle challenge)
		- cartella executor
			- `executor.py` 
				- codice effettivo con system prompt, user prompt, tool che può utilizzare, gestione dei singoli step ed esecuzione di una singola fase; gestisce i turni (fino a 20 per step) e la modalità "Auditor" (nessuna assunzione senza evidenza empirica).
					- **riceve in input i seguenti file-variabili:**
						- `step: TestStep` (oggetto con ID fase, obiettivo, comando consigliato, checklist, requires, produces, allowed_tools)
						- `target_ip: str` (indirizzo IP del container bersaglio)
						- `verified_values: dict[str, Any]` (blackboard con le variabili e credenziali convalidate nelle fasi precedenti)
						- `output_dir: str` (cartella dove scrivere i log e gli output forensi)
					- **interagisce con i seguenti file-variabili:**
						- `mcp_bridge.py` (`MCPBridge`): per invocare i tool di sicurezza (HexStrike) e la shell interattiva PTY (Terminal Gateway)
						- Client OpenAI verso `EXECUTOR_BASE_URL`: invia la conversazione multi-turno all'LLM (supportando la Chain-of-Thought / reasoning)
						- **Tool interni built-in dell'Executor:**
							- `submit_step_result`: tool obbligatorio di chiusura con cui l'LLM certifica l'esito dello step (`COMPLETED` o `FAILED`) e mappa la checklist
							- `request_turn_extension`: permette all'LLM di richiedere turni extra (+3 di default) per operazioni empiriche articolate o interattive prima di esaurire il budget
							- `show_verified_values`: restituisce l'elenco delle chiavi già convalidate nei passi precedenti
							- `get_verified_value`: recupera il valore specifico di una chiave (es. password o token estratto in uno step precedente)
					- **manda in output:**
						- `StepResult`: oggetto Pydantic con stato (`COMPLETED` o `FAILED`), checklist validata punto per punto, nuove variabili estratte (`produced_values`), log delle evidenze (`evidence_log`), numero di turni e durata
						- Tutti i turni e i risultati delle singole fasi vengono poi **accorpati a fine run in un unico file master**: `run_summary.json` (archiviato nella cartella `evidence/<challenge>/output_X/`), dal quale il Final Evaluator genera `REPORT.md` e `healing_ticket.json`.
			- `mcp_bridge.py`
				- codice che fa da ponte verso i server MCP, fornendo all'Executor i tool convertiti nel formato atteso dalle API OpenAI.
				- collegato a 2 server di backend su Kali: **HexStrike** (porta 8888, 100+ tool di sicurezza) e **Terminal Gateway** (porta 8889, shell persistente PTY).
				- gestione del troncamento e budget:
					- **Come tronca l'output:** se l'output di un comando supera `MAX_TOOL_OUTPUT_CHARS` (default 8.000 caratteri), preserva l'inizio e la fine inserendo un marcatore centrale `[... TRUNCATED X CHARS ...]`, evitando di saturare la context window dell'LLM.
					- **Budget tool call:** impone un tetto massimo di chiamate a step (`MAX_TOOL_CALLS_PER_STEP = 15`), prevenendo loop infiniti.
				- **Cose aggiuntive fondamentali gestite dal bridge:**
					- Gestione shell persistente: tool `interactive_terminal_exec` con supporto per sessioni multiple (`session_name`), comandi batch atomici (`commands: [...]`) e gestione di prompt interattivi (sudo password, TUI come nano).
					- `clear_cache()`: metodo per azzerare la cache di HexStrike tra le run garantendo test puliti.
			- `models.py`
				- strutture dati utilizzate con Pydantic / Dataclass.
				- qui vengono definiti `TestStep`, `StepResult`, `ToolCallRecord`, `StepStatus` (`PENDING`, `RUNNING`, `COMPLETED`, `FAILED`, `SKIPPED`).
		- cartella `orchestrator`
			- `evidence_manager.py`
				- gestisce la cartella `evidence`, calcola l'ID univoco della sfida, crea le cartelle incrementali (`output_1`, `output_2`, ...) e aggiorna la cartella puntatore `latest/`.
			- `graph.py`
				- compila lo StateGraph di LangGraph collegando i nodi: `orchestrator` ➔ `executor` ➔ `final_evaluator`.
				- definisce le funzioni di **routing condizionale** (gli archi decisionali):
					- `route_orchestrator`: controlla se ci sono ancora step da eseguire; se sì instrada verso `executor`, altrimenti (se tutti completati) passa la mano a `final_evaluator`.
					- `route_executor`: valuta l'esito dello step appena terminato; se ha avuto successo (`RUNNING`) rimanda a `orchestrator` per passare al prossimo step (creando il loop), mentre se è fallito (`FAILED`) applica il principio di **Fail-Fast** interrompendo la catena e deviando subito su `final_evaluator` per la Root Cause Analysis.
			- `model_manager.py`
				- gestisce l'infrastruttura di inferenza locale (Unsloth / vLLM): consente di verificare lo stato del server, cambiare la context length e abilitare/disabilitare il reasoning (thinking) in base al nodo attivo.
			- `nodes.py`
				- contiene l'implementazione dei tre nodi di LangGraph:
					- `orchestrator_node`: controlla se ci sono altri step, verifica che i prerequisiti (`step.requires`) siano soddisfatti in `state["verified_values"]` e assegna il `current_step`.
					- `executor_node`: coordina l'esecuzione dello step tramite `AuditorExecutor`, aggiorna i valori prodotti in `verified_values` e registra il risultato.
					- `final_evaluator_node`: genera la relazione forense (`REPORT.md`), calcola i KPI, analizza le Root Cause (metodo 5 Why + Ishikawa) e genera l'eventuale `healing_ticket.json` in caso di fallimento.
			- `plan_parser.py` (Deterministico)
				- parser deterministico ibrido: legge `ATTACK_PLAN.md`, estrae i metadati strutturati tramite `yaml.safe_load` e ricava azioni e checklist via Regex Markdown, istanziando la lista di oggetti tipizzati `list[TestStep]`.
			- `state.py`
				- definisce la struttura dati `VulcaTestState` (TypedDict condiviso in LangGraph) che memorizza i passi del piano, lo step corrente, le variabili estratte, la storia dei risultati e i timestamp.
		- `planner`
			- `planner.py`
				- legge la documentazione della challenge (`DESCRIPTION.md`, `STORYLINE.md`, `WRITEUP.md`) e invoca l'LLM con un apposito `SYSTEM_PROMPT` per compilare l'Attack Plan.
				- riceve i percorsi dal `main.py` (che a sua volta li legge dagli argomenti CLI o dal `.env`).
				- valida sintatticamente il markdown generato invocando `plan_parser.py` prima di scriverlo su file (`ATTACK_PLAN.md`).
	- `config.py`
		- carica il file `.env` tramite `python-dotenv` e definisce le costanti globali del framework (IP target, URL dei servizi, parametri di contesto e soglie di budget).
	- `main.py`
		- entrypoint principale del runner: gestisce gli argomenti da linea di comando (`argparse`), archivia gli snapshot del piano, esegue il reset Clean Slate del container target, inizializza lo stato e avvia il grafo di LangGraph.
