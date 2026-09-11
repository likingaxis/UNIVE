# 🛠️ Guida Hands-On: Architettura e Funzionamento di VulcaTest White-Box

  

> **Manuale Operativo e Guida di Studio di VulcaTest**  

> Questa guida documenta l'architettura completa, i contratti dati e il codice del framework di **Conformance Testing e Quality Assurance** per laboratori didattici di cybersecurity (Ecosistema VulcAIn).  

> È progettata per consentirti di **comprendere a fondo ogni riga di codice, modulo e scelta architetturale**, fornendo la piena padronanza concettuale necessaria per la redazione e la discussione della tesi di laurea.

  

---

  

## 🗺️ Mappa Concettuale e Flusso Operativo

  

Il framework opera come una macchina a stati finiti su **LangGraph**, orchestrando l'interazione tra modelli specializzati su workstation locale e la macchina target su Kali:

  

```mermaid

flowchart TD

    VM["📘 VulcaMind (Design Didattico)"] -->|STORYLINE, WRITEUP| P["🧠 AttackPlanner (planner.py)"]

    P -->|ATTACK_PLAN.md| O["⚙️ Orchestrator (orchestrator/graph.py)"]

    subgraph LOOP ["Ciclo ReAct Multi-Turno con Tool Slicing"]

        O -->|TestStep + Verified Values| E["⚡ Executor (executor.py)"]

        E <-->|FastMCP API| K["🛡️ HexStrike AI / Kali Linux"]

        K <-->|In-Band Traffic| T["🎯 Target Container (Docker)"]

        E -->|submit_step_result| O

    end

    O -->|COMPLETED o BLOCCO FAILED| FE["🩺 Final Evaluator (nodes.py)"]

    subgraph EVAL ["Due Stadi di Valutazione Post-Mortem"]

        FE -->|Stadio 1 Deterministico| J["📊 run_summary.json"]

        FE -->|Stadio 2 Semantico (Qwen 3.8)| R["📝 REPORT.md (RCA)"]

        FE -->|Stadio 2 Semantico (Qwen 3.8)| H["🎫 healing_ticket.json"]

    end

    EVAL -->|Sync Automatico| L["📁 evidence/.../latest/"]

```

  

---

  

## 🏁 STEP 0: Setup Ambiente, Dipendenze UV e Configurazione Multi-Host

  

### 1.1 Inizializzazione con `uv`

Il progetto adotta **`uv`**, il gestore di pacchetti e ambienti virtuali sviluppato in Rust da Astral:

```bash

cd white-box

uv init --app .

uv add "openai" "pydantic>=2.0" "mcp<2" "langgraph" "python-dotenv" "requests" "httpx" "pyyaml"

```

  

> ⚠️ **Nota di Tesi su `mcp<2`:**  

> Il gateway FastMCP di HexStrike (`hexstrike_mcp.py`) su Kali utilizza le specifiche MCP v1.x. Bloccare la dipendenza a `mcp<2` previene breaking change introdotti nelle versioni successive.

  

### 1.2 Configurazione di Rete e Modelli (`.env`)

Il file `.env` disciplina l'architettura distribuita multi-host:

```ini

# Gateway HexStrike (Kali Linux VM)

HEXSTRIKE_URL=http://<KALI_IP>:8888

  

# Target Container Docker (raggiungibile via Kali)

TARGET_IP=172.17.0.2

  

# Executor: Qwen 3 Coder 30B (GGUF quantizzato UD-Q4_K_XL su workstation locale)

EXECUTOR_BASE_URL=http://<LLM_HOST_IP>:8888/v1

EXECUTOR_API_KEY=not-needed

EXECUTOR_MODEL=unsloth/Qwen3-Coder-30B-A3B-Instruct-GGUF

  

# Final Evaluator & RCA: Qwen 3.8 27B (GGUF quantizzato UD-Q3_K_XL su workstation locale)

EVALUATOR_BASE_URL=http://<LLM_HOST_IP>:8888/v1

EVALUATOR_API_KEY=not-needed

EVALUATOR_MODEL=unsloth/Qwen3.8-27B-GGUF

  

# Planner: Qwen 3.8 27B

PLANNER_BASE_URL=http://<LLM_HOST_IP>:8888/v1

PLANNER_API_KEY=not-needed

PLANNER_MODEL=unsloth/Qwen3.8-27B-GGUF

```

  

---

  

## 🧱 STEP 1: I Contratti Dati Rigidi (`executor/models.py`)

  

Per garantire scientificità, VulcaTest vieta il parsing fragile di testo libero o l'autocertificazione allucinata. Tutto si basa su modelli **Pydantic v2**:

  

```python

from __future__ import annotations

from typing import Any, Literal, Optional

from pydantic import BaseModel, Field

  
  

class ToolCallRecord(BaseModel):

    """Traccia ogni singola interazione di rete: tool, input, output, durata ed exit code."""

    tool_name: str

    arguments: dict[str, Any]

    output: Any

    duration_seconds: float = 0.0

    exit_code: Optional[int] = None

  
  

class TestStep(BaseModel):

    """Singolo step dell'Attack Plan con vincoli di dipendenza e checklist."""

    id: str                                          # es. "FASE_1"

    objective: str                                   # es. "Scansione porte TCP con Nmap"

    action: Optional[str] = None                     # Comando di riferimento consigliato

    requires: list[str] = Field(default_factory=list)  # Variabili richieste a monte

    produces: list[str] = Field(default_factory=list)  # Variabili estratte a valle

    checklist: list[str] = Field(default_factory=list) # Criteri vincolanti di superamento

    allowed_tools: list[str] = Field(default_factory=list) # Tool autorizzati (Tool Slicing)

  
  

class ChecklistItemResult(BaseModel):

    """Esito puntuale 1:1 per ciascun punto della checklist didattica."""

    item: str

    passed: bool

    evidence: str = ""

  
  

class StepResult(BaseModel):

    """Esito formale restituito dall'Executor al termine dello step."""

    step_id: str

    status: Literal["SUCCESS", "FAILED"]

    summary: str

    checklist_evaluation: list[ChecklistItemResult] = Field(default_factory=list)

    extracted_values: dict[str, Any] = Field(default_factory=dict)

    tool_calls: list[ToolCallRecord] = Field(default_factory=list)

```

  

> 🔬 **Invariante di Conformance (Formula di Tesi):**  

> Un risultato ha stato `SUCCESS` se e solo se ogni singolo punto della checklist è verificato positivamente:  

> $$\text{Status} = \text{SUCCESS} \iff \forall c \in \text{checklist\_evaluation}, \; c.\text{passed} = \text{True}$$  

> Se anche un solo elemento risulta `False`, il runtime Python forza matematicamente `status = FAILED`.

  

---

  

## 🌉 STEP 2: Il Gateway FastMCP & Tool Slicing (`executor/mcp_bridge.py`)

  

Il modulo `MCPBridge` connette l'Executor al server **HexStrike AI** su Kali Linux:

  

1. **Prevenzione Riscontri Stantii (`clear_cache`):** All'inizio di ogni run, la cache interna di HexStrike viene azzerata (`POST /api/cache/clear`) per evitare che comandi ripetuti restituiscano vecchi riscontri (Cache HIT falsati).

2. **Tool Slicing Selettivo (`list_tools`):**  

   - Se esponessimo all'agente tutti i 60+ tool di HexStrike contemporaneamente, lo schema JSON consumerebbe oltre **40.000 token** ad ogni turno (Tool Bloat).

   - `list_tools(step.allowed_tools)` applica un filtro chirurgico: espone solo i tool autorizzati dal piano didattico per quello specifico step (es. solo `nmap_scan` e `execute_command` in FASE_1), riducendo il payload a meno di 2.000 token.

3. **Misurazione Temporale Deterministica (`call_tool`):** Ogni invocazione viene cronometrata con precisione milliseconda, permettendo di separare nei report il tempo effettivo di rete dal tempo di inferenza dell'LLM.

  

---

  

## ⚡ STEP 3: L'Auditor Agent & Completion Tool (`executor/executor.py`)

  

L'Executor implementa un agente ReAct conforme allo standard OpenAI Tool Calling.

  

### 3.1 I Tre Principi della Auditor Mode:

1. **Interazione Esclusivamente In-Band:** L'agente interagisce con il target SOLO tramite la rete (`curl`, `nmap`). È severamente vietato interagire con Docker sull'host per riparare il container.

2. **Zero Deviation:** Se un componente atteso non risponde o manca (es. chat 404), l'agente non cerca percorsi alternativi né anticipa exploit futuri: dichiara il fallimento dello step.

3. **Turn Budgeting Dinamico:** Budget base di 6 turni, estendibile fino a un tetto massimo di 15 tramite il tool nativo `request_turn_extension(reason, additional_turns=3)`.

  

### 3.2 Il Completion Tool `submit_step_result`:

* **Il Problema del Coder Loop:** I modelli specializzati nel codice, quando invitati a restituire un JSON di riepilogo a fine turno, tendevano a invocare `execute_command({"command": "echo 'SUCCESS'"})` consumando turni inutilmente.

* **La Soluzione:** Fornire un tool nativo di chiusura **`submit_step_result`**:

```json

{

  "type": "function",

  "function": {

    "name": "submit_step_result",

    "description": "Invia formalmente l'esito dello step, la checklist e i valori estratti.",

    "parameters": {

      "type": "object",

      "properties": {

        "status": {"type": "string", "enum": ["SUCCESS", "FAILED"]},

        "summary": {"type": "string"},

        "checklist_evaluation": {

          "type": "array",

          "items": {

            "type": "object",

            "properties": {

              "item": {"type": "string"},

              "passed": {"type": "boolean"},

              "evidence": {"type": "string"}

            },

            "required": ["item", "passed", "evidence"]

          }

        },

        "extracted_values": {"type": "object"}

      },

      "required": ["status", "summary", "checklist_evaluation"]

    }

  }

}

```

Non appena `Qwen3-Coder` raccoglie le evidenze, chiama `submit_step_result`: l'esecuzione dello step termina istantaneamente al **Turno 2**, propagando le variabili nello stato.

  

---

  

## 📋 STEP 4: Planner & Parser dell'Attack Plan

  

### 4.1 Il Compilatore `planner/planner.py`

Trasforma gli artefatti concettuali di VulcaMind (`DESCRIPTION.md`, `STORYLINE_B2R.md`, `WRITEUP.md`) nel piano d'attacco formale `ATTACK_PLAN.md`:

* Utilizza `Qwen3.8-27B` (Tier 1 di alto ragionamento).

* **Controllo Anti-Starvation:** Passa `extra_body={"enable_thinking": False}` o `reasoning_effort: "medium"` con `max_tokens=10000`, evitando che il ragionamento saturi la context window prima dell'emissione del markdown.

  

### 4.2 Il Parser `orchestrator/plan_parser.py`

Analizza il file `ATTACK_PLAN.md` estraendo deterministicamente:

* I metadati YAML di ogni fase (`id`, `requires`, `produces`, `allowed_tools`).

* Il comando shell di riferimento.

* La checklist formale di verifica.

Restituisce la lista ordinata di oggetti `TestStep`.

  

---

  

## 🔄 STEP 5: Gestione della VRAM a Caldo (`orchestrator/model_manager.py`)

  

Sulla workstation locale (AMD RX 9070 XT 16GB VRAM + 64GB RAM), i due modelli open-weight pesano rispettivamente:

* `Qwen3-Coder-30B-A3B` (UD-Q4_K_XL): ~17.5 GB

* `Qwen3.8-27B` (UD-Q3_K_XL): ~14.2 GB

  

Non potendo risiedere simultaneamente in VRAM, `model_manager.py` gestisce lo **switch automatico a caldo**:

1. Interroga `GET /v1/models` sul server di inferenza locale.

2. Se il modello richiesto è già attivo, prosegue a latenza zero.

3. Se serve l'altro modello (es. passaggio dall'Executor al Final Evaluator), invia una richiesta:

   ```http

   POST /api/inference/load

   Content-Type: application/json

   Authorization: Bearer <API_KEY>

  

   {

     "model_path": "unsloth/Qwen3.8-27B-GGUF",

     "gguf_variant": "UD-Q3_K_XL",

     "context_length": 15872,

     "force_cancel_active": true

   }

   ```

4. Il server scarica il vecchio modello e carica il nuovo in **circa 10 secondi**, senza alcuna interruzione o pressione di tasti manuale (**100% Autonomo**).

  

---

  

## 🗄️ STEP 6: Evidence Store Gerarchico (`orchestrator/evidence_manager.py`)

  

Per supportare run comparative e self-healing iterativo senza sovrascritture:

```text

evidence/

└── 11.Pizzeria_B2R/

    ├── output_1/

    ├── output_2/

    ├── output_3/

    ├── output_4/              <-- Archivio immutabile del singolo tentativo

    │   ├── ATTACK_PLAN.md     <-- Snapshot del piano eseguito

    │   ├── run_summary.json   <-- Dati quantitativi e checklist

    │   ├── REPORT.md          <-- Relazione accademica RCA

    │   └── healing_ticket.json<-- Ticket per VulcaForge

    └── latest/                <-- Sincronizzato con l'ultimo output valido

```

`sync_latest_copy()` garantisce che i moduli downstream leggano sempre l'ultimo ticket senza dover calcolare l'indice numerico.

  

---

  

## 🕸️ STEP 7: Macchina a Stati LangGraph & Evaluator a Due Stadi

  

### 7.1 Lo Stato Globale (`orchestrator/state.py`)

```python

class VulcaTestState(TypedDict):

    target_ip: str

    challenge_name: str

    attack_plan: list[TestStep]

    current_step_index: int

    current_step: Optional[TestStep]

    verified_values: dict[str, Any]

    completed_steps: list[str]

    failed_steps: list[str]

    step_results: list[StepResult]

    status: Literal["RUNNING", "COMPLETED", "FAILED"]

    error_message: Optional[str]

    start_time: float

    start_time_iso: str

    output_dir: str

```

  

### 7.2 Il Grafo Esecutivo (`orchestrator/graph.py`)

```python

workflow = StateGraph(VulcaTestState)

workflow.add_node("orchestrator", orchestrator_node)

workflow.add_node("executor", executor_node)

workflow.add_node("final_evaluator", final_evaluator_node)

  

workflow.add_edge(START, "orchestrator")

workflow.add_conditional_edges("orchestrator", route_orchestrator, {

    "executor": "executor",

    "final_evaluator": "final_evaluator"

})

workflow.add_conditional_edges("executor", route_executor, {

    "orchestrator": "orchestrator",

    "final_evaluator": "final_evaluator"

})

workflow.add_edge("final_evaluator", END)

```

  

### 7.3 I Due Stadi del `final_evaluator_node`:

* **Stadio 1 (Deterministico):** Calcola metriche scientifiche (SCR %, tempo totale, tempo tool/rete, numero chiamate) e scrive `run_summary.json`.

* **Stadio 2 (Semantico Post-Mortem):**

  - Esegue lo switch in VRAM a `Qwen3.8-27B`.

  - Redige la relazione accademica formale `REPORT.md` (Executive Summary, KPI, Analisi Forense, Root Cause Analysis con discriminazione tra `IAC_GENERATION_DEFECT`, `CONFIG_DEFECT`, `DIDACTIC_MISMATCH`, e Remediation Guidance).

  - Genera il ticket strutturato `healing_ticket.json` per il modulo riparatore di VulcaForge.

  

---

  

## 🚀 STEP 8: Esecuzione End-to-End (`main.py`)

  

Per avviare la verifica completa del target:

```powershell

uv run python main.py

```

  

Opzioni disponibili:

* `--target-ip 172.17.0.2`: Specifica l'IP del container.

* `--challenge "Pizzeria B2R"`: Nome identificativo della sfida.

* `--challenge-dir <path>`: Cartella contenente i documenti didattici di VulcaMind.

* `--generate-plan`: Forza la compilazione automatica dell'Attack Plan tramite LLM.

  

---

  

## 📊 STEP 9: Interpretazione degli Output per la Tesi

  

Al termine di ogni run, ispeziona la cartella `evidence/<challenge_id>/latest/`:

  

1. **`run_summary.json`:** Dati strutturati machine-readable per aggregazioni statistiche (KPI di tesi).

2. **`REPORT.md`:** Documento formale che certifica il verdetto (`[CONFORME]` o `[NON CONFORME]`), descrive le evidenze empiriche e isola la causa radice del guasto didattico.

3. **`healing_ticket.json`:** Oggetto JSON contenente il file impattato (es. `webapps/pizzeria/index.php`), la root cause e la patch raccomandata per l'agente autoriparatore Ansible.