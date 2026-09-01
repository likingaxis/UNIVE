### Obiettivo 1 idee

- da quello che ho capito obiettivo 1 è diviso in 2 parti
	- verifica della macchina e fix
	- verifica di unintended ways

- scrivere un toolbox.md che prende `yaml+file` mio md con comandi consigliati da usare(forse utile per la parte 2)
#### Agente di verifica macchina e fix
- script in python che prende
	- STORYLINE_STND.md oppure STORYLINE_B2R.md
	- lo formatta nel miglior modo possibile per l'agente
- l'agente prova attacca la macchina scrivendo un suo writeup.md
	- si confronta writeup_attackwhite.md con writeup.md
	- per progettare questo agente devo fare semplice brainstorming e reasoning con ai per generare un prompt giusto? un agente dentro si fa semplicemente a partire da un prompt e ho finito?

#### Agente di verifica unintended ways
- Strutturare VulcaTEST in almeno 2 agenti
	- 1 scrive linee guida su cosa eseguire(pianificazione) basandosi su STORYLINE.md
		- scrivendo un file chiamato ATTACK_PLAN.md
		- usare anche Storyline_B2R.md al planner
	- 1 le esegue effettivamente(azione)
		- nel frattempo scrive ATTACK.md
- confrontare writeup vulcaTEST ATTACK.md e ATTACK_PLAN.md con writeup vulcaFORGE writeup.md
	- per trovare discrepanze
- utilizzare un file TOOLBOX.md che contiene dei comandi che può utilizzare(fase non unintended way)
	- basandoti sugli yaml e sul mio file che avevo fatto per l'esame

- **(Opzionale / Fase 2)**: Passare queste discrepanze a un Agente Riparatore per eseguire il _Self-Healing_ (auto-correzione del codice sorgente Ansible

NEW:
- Aggiungere sistema di screen per vedere le interfacce? possibilità di fare call di un tool che mostra la schermata attuale
- Fare benchmark con diversi modelli, MCP
	- lista modelli che possono fare pentesting Locali/non
- prendere macchine fatte da loro per fare benchmarking
- creare un sistema di benchmarking accurato per capire se il sistema sta funzionando davvero





#### SOLUZIONE
DIVIDO IN FASI COSA VA FATTO
##### Fase 1: Creazione dell'Infrastruttura e del `TOOLBOX.md`
- Creare la struttura di cartelle indipendente `VULCAIN/vulcatest/sessions/` per separare l'ambiente di QA da quello del Builder e del Designer.
- Recuperare il file degli appunti/comandi dell'esame del tesista.
- Scansionare le vulnerabilità del registry di VulcaForge per dedurre i tool necessari.
- Redigere il file statico `TOOLBOX.md` (salvato in `vulcatest/core/`) che conterrà la lista rigida dei comandi bash autorizzati (es. sintassi esatta per nmap, curl, ssh, nc) limitando così lo "spazio d'azione" dell'agente.

##### Fase 2: Creazione del workflow `.agents/workflows/vulcatest_planner.md`
- Creare il prompt per l'Agente Planner (l'assistente del professore).
- **Input:** Il workflow obbligherà l'agente a leggere la `STORYLINE_B2R.md` (il copione) e il `TOOLBOX.md` (i limiti tecnici).
- **Output:** L'agente dovrà generare un file strutturato chiamato `ATTACK_PLAN.md` (da salvare nella rispettiva cartella in `vulcatest/sessions/<macchina>/`) contenente la sequenza esatta dei comandi da lanciare e i *success criteria*.

##### Fase 3: Creazione del workflow `.agents/workflows/vulcatest_executor.md`
- Creare il prompt per l'Agente Executor (lo studente bendato / il pentester).
- **Input:** Il workflow lo obbligherà a leggere ESCLUSIVAMENTE l'`ATTACK_PLAN.md`.
- **Esecuzione:** L'agente userà il tool `run_command` per lanciare materialmente i comandi contro il container Docker in esecuzione.
- **Output:** Durante l'esecuzione, compilerà il file `ATTACK.md` con gli output reali del terminale (es. "Porta 80 non raggiungibile: errore 404").

##### Fase 4: Creazione del workflow `.agents/workflows/vulcatest_evaluator.md`
- Creare il prompt per l'Agente Evaluator (il giudice / mergiatore).
- **Input:** L'agente raccoglierà sul tavolo la `STORYLINE_B2R.md`, il `WRITEUP.md` generato da VulcaForge e l'`ATTACK.md` reale.
- **Output:** Genererà il documento finale `REPORT.md` (il vero output dell'Obiettivo 1 della tesi) in cui rileverà eventuali discrepanze logiche tra la teoria e la pratica.

##### Fase 5: Testing Prototipale Interattivo (Pizzeria)
- Avviare il container della macchina "Chepizzachiama?".
- **Isolamento del Contesto (Prevenzione Bleeding):**
  1. Eseguire `/vulcatest_planner` nella chat corrente.
  2. Aprire obbligatoriamente una **NUOVA CHAT PULITA** per invocare `/vulcatest_executor`, garantendo che non possa leggere la Storyline in cronologia e barare.
  3. Lanciare `/vulcatest_evaluator` per generare il report finale.
- Correggere eventuali "allucinazioni" affinando i prompt dei 3 workflow appena creati.

##### Fase 6: Porting su LangGraph (Python)
- Una volta che il prototipo tramite prompt Markdown funziona in modo impeccabile, scrivere il motore Python dentro `vulcatest/core/graph_engine.py`.
- Creare i nodi in Python (`planner_node`, `executor_node`, `evaluator_node`).
- Sostituire le chiamate umane `/comando` con il passaggio automatico dello Stato (JSON) tra i nodi del grafo. Essendo API separate, l'isolamento del contesto per l'Executor sarà garantito per design.


Utilizzare Qwen per fare pentesting in locale (ha senso?)