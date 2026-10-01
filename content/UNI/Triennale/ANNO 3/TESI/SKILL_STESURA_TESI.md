---
name: stesura-tesi
description: Guida operativa, stile e fonti di riferimento per la stesura e revisione della tesi triennale di Luca Gugliotta su VulcaTest e VulcAIn. Attiva questa skill all'inizio di ogni chat per allineare immediatamente l'assistente su contesto, fonti, registro e stato di avanzamento.
---

# SKILL: Stesura Tesi Triennale — VulcaTest (Luca Gugliotta)

Questa skill definisce il protocollo di lavoro, il registro stilistico e la mappa di tutte le fonti per la stesura della tesi di laurea triennale in Informatica di Luca Gugliotta. 
Ogni volta che viene aperta una nuova chat per lavorare alla tesi, l'assistente deve consultare questa guida per allinearsi istantaneamente.

---

## 1. Il Ruolo dell'Assistente e la Modalità di Lavoro

- **Co-autore e Sounding Board Tecnico**: L'assistente redige proposte di testo per le varie sezioni in **prosa continua da tesi**, rigorosa e solida, senza semplificazioni né elenchi aridi. Luca revisiona ogni testo, lo adatta con le proprie parole e lo integra nel file definitivo.
- **Decision-First (Perché prima del Come)**: Ogni paragrafo deve partire dal problema empirico reale affrontato, passare alla *decisione di design architetturale*, spiegare il *meccanismo software* e concludere con il raccordo logico alla sezione successiva.
- **Regola della Quota (Cosa va nel testo vs cosa va fuori)**:
  - **Quota 1 (Decisioni di progetto)**: SEMPRE nel corpo del testo.
  - **Quota 2 (Meccanismi concettuali)**: Schemi e logica solo se indispensabili alla comprensione.
  - **Quota 3 (Dettagli di codice/campi)**: **MAI** fare liste o elenchi puntati con gli attributi di una classe (`id`, `status`, `objective`). Si citano in prosa solo i 2-3 concetti chiave (es. `verified_values`, `sessions`). Il resto è demandato ad Appendice e GitHub.

---

## 2. Le Fonti di Verità (Single Source of Truth)

L'assistente deve fare riferimento ai seguenti percorsi assoluti sul file system:

### A. Idee, Voce di Luca e Feedback del Relatore
1. **`C:\Users\Luca\Desktop\TESI\Spiegazione progetto di tesi Luca Gugliotta.pdf`**:
   - Esposizione originaria del progetto con le parole e la voce di Luca (chiarezza, pragmatismo, focus sul problema didattico).
2. **`C:\Users\Luca\Desktop\UNI2\quartz\content\UNI\Triennale\ANNO 3\TESI\Call\Call pasquale 2.md`**:
   - Canovaccio architetturale e tecnico completo, note della call con il tutor/relatore (Prof. Pasquale) e pianificazione dei benchmark.
3. **`C:\Users\Luca\Desktop\UNI2\quartz\content\UNI\Triennale\ANNO 3\TESI\GUIDA_STESURA_TESI.md`**:
   - Linee guida metodologiche, feedback ricevuti dal professore (es. sciogliere il dubbio su *determinismo vs stocasticità* con CoALA, costi reali di calcolo non zero ma molto bassi).
4. **`C:\Users\Luca\Desktop\UNI2\quartz\content\UNI\Triennale\ANNO 3\TESI\TESI.md`**:
   - L'indice e la mappa consolidata dei capitoli con la domanda-motrice di ciascuno.

### B. Il Codice Reale (Verità Implementativa)
- **Directory principale**: `C:\Users\Luca\Desktop\TESI\vulcAIN\vulcatest\`
  - `white-box/executor/executor.py`: logica a turni ReAct, Auditor Mode (righe 21-83), budget dinamico con Graceful Nudge e Checkpoint (righe 280-315), tool interni (`submit_step_result`, `request_turn_extension`, `show_verified_values`, `get_verified_value`), ricalcolo deterministico del verdetto (`_build_step_result`, riga 595).
  - `white-box/executor/mcp_bridge.py`: disaccoppiamento L1 HexStrike (8888) vs L2 Terminal Gateway (8889), PTY persistenti (`pexpect`), gestione `session_name`, `SPECIAL_KEYS_MAP` (conversione `enter` $\rightarrow$ `\r` per nano), troncamento a 8.000 car., pulizia ANSI e watchdog.
  - `white-box/executor/models.py`: contratti Pydantic (`TestStep`, `StepResult`, `ChecklistItemResult`, `ToolCallRecord`).
  - `white-box/executor/token_utils.py`: formula euristica di dimensionamento dinamico della context window (`plan_context_length`).
  - `white-box/orchestrator/graph.py`: StateGraph di LangGraph e funzioni di routing condizionale (`route_orchestrator`, `route_executor`, `route_final_evaluator`).
  - `white-box/orchestrator/state.py`: `VulcaTestState` (working memory condivisa).
  - `white-box/planner/planner.py`: prompt costituzionale del Planner, gerarchia fonti (Storyline > Writeup > Description), grounding e anti-allucinazione.
  - `vulcahealing/healer.py`: nodo Healer, controller Antigravity CLI (`agy`), diff deterministico (`diff_tracker.py`), regole costituzionali di riparazione.

### C. File di Stesura Attivi
- **Dove si scrive il Capitolo 3**: `C:\Users\Luca\Desktop\UNI2\quartz\content\UNI\Triennale\ANNO 3\BOZZA SCRITTA\Capitolo 3 - Stesura.md`.

---

## 3. Registro e Stile di Scrittura

- **Tono Accademico ma Concreto**: Stile rigoroso, chiaro, fluido e naturale per una tesi di laurea in Informatica.
- **No Retorica da Saggio / No Meta-Discorso**:
  - Evitare aperture enfatiche (*"Se il Planner scrive il test, l'Executor lo esegue"*, *"Ci tengo a precisare subito..."*, *"La terza decisione è la più importante..."*).
  - Evitare formule difensive (*"Non li ho presi dalla letteratura ma ci ho pensato io..."*). Presentare le scelte con autorevolezza scientifica.
  - Evitare l'abuso di trattini lunghi (`—`) a centro frase; preferire subordinate fluide e punteggiatura canonica.
- **Voce Attiva in Prima Persona per le Decisioni**:
  - Usare la prima persona per decisioni e riscontri empirici (*"ho separato"*, *"ho introdotto"*, *"ho osservato durante le sperimentazioni"*).
  - Evitare passivismi artificiosi (*"è stato deciso dall'autore..."*).

---

## 4. Mappa della Letteratura Scientifica da Integrare

Le scelte progettuali devono essere inquadrate nei rispettivi paper cardine:
- **CoALA (Sumers et al.)**: 
  - Dualismo fondamentale: *codice deterministico* (regole, parser, grafo, metriche) vs *modello probabilistico* (ragionamento, exploit, sintesi). Scioglie il dubbio del relatore sul determinismo.
  - Classificazione architetturale: singolo agente cognitivo di moduli specializzati (per il tester).
  - Tipi di memoria: Working Memory (`VulcaTestState`) e Procedural Memory esplicita nel codice; assenza motivata di memoria episodica/semantica per isolamento scientifico nei benchmark (Clean Slate).
  - Digital Grounding (il Bridge L1/L2 verso l'ambiente).
- **SWE-bench Pro**:
  - Il concetto di *verifier gap* e integrità dell'oracolo: rifiuto dell'auto-certificazione dell'agente.
  - La no-self-certification strutturale: il codice Python riesamina la checklist e sovrascrive `FAILED` se manca evidenza, indipendentemente da cosa dichiara l'LLM.
- **ReAct (Yao et al.)**:
  - Paradigma a turni (Reasoning + Action + Observation), ma circoscritto al perimetro operativo dello step.
- **Constitutional AI (Bai et al.)**:
  - Ispirazione per i prompt di sistema vincolanti: regole deontologiche esplicite per l'Auditor Mode dell'Executor e per le regole dell'oracolo nel Planner.
- **MetaGPT (Hong et al.)**:
  - Paradigma dello *Structured Artifact Handoff*: i nodi comunicano scambiandosi contratti dati Pydantic tipizzati (`TestStep`, `StepResult`), mai testo libero in linguaggio naturale.
- **Cybench / AgentBoard**:
  - Prevenzione della *specification gaming* e del *goal drift*.
  - Metriche di avanzamento non binarie (Progress sui singoli checkpoint della checklist).
- **Test Oracle Problem (Mutation Testing)**:
  - Metodologia del benchmark nel Capitolo 5: generazione da golden state e perturbazioni controllate (P1-P4).

---

## 5. Struttura dei Capitoli della Tesi

1. **Capitolo 1: Introduzione** *(3–4 pp, per ultimo)* — Sintesi del problema (macchine AI collaudate a mano), contributo (VulcaTest + VulcaHealing), roadmap.
2. **Capitolo 2: Contesto** *(8–11 pp)* — CTF/B2R, vulnerabilità didattiche vs veri difetti, agenti LLM, concetto di harness, pipeline VulcAIn, gancio finale verso il Cap. 3.
3. **Capitolo 3: Architettura VulcaTest** *(15–18 pp, tester a due movimenti)*:
   - *Movimento A (Il Sistema)*: 3.1 Perché harness generico fallisce; 3.2 I 5 Principi; 3.3 Visione d'insieme del Grafo; 3.4 Planner; 3.5 Orchestrator; 3.6 Executor; 3.7 Bridge; 3.8 Final Evaluator.
   - *Movimento B (L'Ingegneria dell'Harness)*: 3.9 Prompt Engineering come processo iterativo; 3.10 Modello locale e infrastruttura di inferenza (Qwen 27B, CoT low, Unsloth, quantizzazione, costi reali).
4. **Capitolo 4: VulcaHealing** *(7–9 pp, il modulo di autoriparazione a loop chiuso)*:
   - Disaccoppiamento, Heuristic Lead, Costituzione a 5 regole, diff deterministico, rebuild Docker con gate echo-safe e retest post-fix.
5. **Capitolo 5: Valutazione Sperimentale** *(9–12 pp, i benchmark)*:
   - Metodologia, perturbazioni P1-P4, i 4 benchmark (B1 riconoscimento, B2 accuratezza RCA, B3 efficacia riparazione, B4 costi/token/tempi), caso studio ammiraglia Pizzeria.
6. **Capitolo 6: Conclusioni e Sviluppi Futuri** *(3–4 pp, per ultimo)*.
