---
title: "Sessione 0 — Fondamenta metodologiche e stato attuale delle metriche"
---

> Documento di lavoro (seme per il capitolo metodologico della tesi). Nasce dal consolidamento dei paper letti (`PAPER LETTI E IDEE.md`) e dalla verifica diretta del codice di VulcaTest/VulcaHealing.
> Scopo: fissare *cosa dicono i paper*, *cosa VulcaTest già fa by design*, *cosa il sistema misura oggi* e *quanto quelle misure sono affidabili* — prima di decidere quali metriche aggiungere.

---

## A. I principi convergenti dei paper

I cinque paper letti, da angolazioni diverse (pentest, CTF, software engineering, oracle synthetico, valutazione multi-turn), ripetono lo stesso nucleo di principi. Non sono idee isolate: convergono.

**P1 — Il success rate binario è troppo povero. Serve granularità fine.**
Una challenge che dà solo `flag: YES/NO` nasconde quasi tutta l'informazione sulla capability dell'agente: due agenti che falliscono possono aver fatto strade completamente diverse. Cybench scompone ogni challenge in *subtask* intermedi; AgentBoard introduce un *progress rate* (`r_t = max` progresso raggiunto). Il messaggio: misura *dove* l'agente arriva prima di fermarsi, non solo se arriva in fondo.

**P2 — Chi genera la soluzione non deve generare anche il test (oracle integrity).**
SWE-Bench Pro documenta l'*agent-generated oracle failure*: quando lo stesso agente produce soluzione e test, i due possono condividere la stessa assunzione sbagliata e "passare" insieme pur essendo entrambi errati. Il Test Oracle Problem mostra lo stesso rischio con oracoli sintetici da LLM. La difesa è strutturale: separare chi definisce il criterio da chi lo esegue.

**P3 — La performance osservata è Modello + Scaffold, non il modello puro.**
Cybench e AgentBoard insistono: cambiando solo il prompt, la PTY, la struttura della risposta o la memoria, le performance cambiano sensibilmente. Il benchmark non misura *"quanto è bravo il modello X"* ma *"quanto è bravo il modello X dentro questo particolare sistema agentico"*. Corollario: uno scaffold più semplice rende la misura più attribuibile al modello.

**P4 — Environment e trajectory integrity: niente leakage, niente scorciatoie d'infrastruttura, percorso legittimo.**
Cybench trova agenti che risolvono la challenge sfruttando l'infrastruttura (`docker exec`, cache del filesystem) invece della vulnerabilità prevista — "exploit del benchmark, non della sfida". Da qui metriche come *Leakage-Adjusted Success Rate* (successi validi / totali, scontando chi ha barato), *Verifier Gap* (`P(SelfPass ∧ OfficialFail)`) e *Trajectory Integrity* (un `PASS` con `cat /gold_solution` nella traiettoria non è un successo agentico).

**P5 — La difficoltà va misurata, non dichiarata.**
Cybench usa il *First Solve Time* umano come proxy oggettivo; AgentBoard separa task `easy`/`hard` per numero di subgoal e mostra che i modelli crollano sui difficili (fanno progresso ma non chiudono l'ultima parte). Dichiarare "difficile" senza misura non è scientifico.

**P6 — Il dataset ha bisogno di ground-truth noto, e il benchmark stesso va validato.**
Il Test Oracle Problem propone la *perturbazione meccanica* (deterministica, verificabile) al posto della generazione da LLM (naturale ma difficile da verificare) per costruire difetti noti. SWE-Bench Pro aggiunge la tassonomia dei difetti (misleading description, test troppo stretti/larghi) e un *human expert* per la decisione finale, più le quattro integrità (environment, task, oracle, information-boundary). C'è anche la matematica per la numerosità del campione: `n ≥ ln(1−C)/ln(1−p)` (per il 99% di confidenza: fault rate 20% → n≈21, 10% → n≈44).

---

## B. Cosa VulcaTest già soddisfa *by design*

Il punto che cambia tutto il brainstorming: **il grosso del brainstorming non è inventare metriche da zero, ma mappare questi principi su misure — distinguendo ciò che l'architettura già garantisce da ciò che va aggiunto.**

| Principio dei paper | VulcaTest lo fa già? |
|---|---|
| **P1** — granularità fine / subtask | **Sì, nativamente.** La checklist con AND-gate *è* la scomposizione in subtask: ogni step ha `checklist_evaluation[]` con `passed`/`evidence` per singolo item. Il segnale fine-grained esiste già, va solo aggregato. |
| **P2** — oracle integrity | **Sì.** Il **Planner** scrive la checklist, l'**Executor** la esegue: separazione tra chi definisce il criterio e chi lo verifica. In più la struttura Pydantic forzata (`StepResult`) impedisce l'agent-generated-oracle failure. |
| **P3** — Model + Scaffold | **Da misurare** — è l'asse *locale-vs-cloud*. Lo scaffold (mcp_bridge, Terminal Gateway, budget management) è documentato in `call pasquale.md`. |
| **P4** — environment / trajectory integrity | **Vincolo di design del dataset** + potenziale metrica: le macchine non devono essere risolvibili per scorciatoie d'infrastruttura (la storia Gemini+MCP nel diario è proprio questo). |
| **P5** — difficoltà misurata | **Da definire** — nessuna misura di difficoltà oggi. |
| **P6** — ground-truth + validare il benchmark | **Da costruire** (dataset con difetti iniettati noti = cardine C5). *Nota:* la verifica di fedeltà delle misure in sezione D è già un'istanza di "il benchmark stesso va testato". |

---

## C. Stato attuale della raccolta metriche (verificato nel codice)

### Il meccanismo: un imbuto deterministico a tre livelli

La raccolta è già strutturata e **deterministica** (non è un LLM che "giudica"), il che soddisfa direttamente P2.

1. **Per singola tool call** — l'Executor registra un `ToolCallRecord`: `tool_name`, `arguments`, `output`, `duration_seconds`, `exit_code`. Si accumula in `StepResult.tool_calls`.
2. **Per step** — `Executor._build_step_result()` costruisce lo `StepResult`: `status` (deciso dall'AND-gate sulla checklist), `summary`, `checklist_evaluation[]`, `extracted_values`, `tool_calls[]`, `turns_used`.
3. **Fine run** — `final_evaluator_node` **Stadio 1** (deterministico, no LLM) aggrega e scrive `run_summary.json`. Sul lato healing, `diff_tracker.compute_folder_diff()` scrive `patch.diff` + `HEALING_REPORT.md`.

### Cosa abbiamo già (persistito in `run_summary.json`)

| Metrica | Valore | Fedeltà |
|---|---|---|
| `status` | verdetto binario di conformità (COMPLETED/FAILED) | solida |
| `total_steps` / `completed_steps_count` / `failed_steps_count` | conteggi | solida |
| `completion_rate_percent` | `completed/total × 100` — di fatto un *progress rate a granularità di step* | solida |
| `total_tool_calls` | numero di invocazioni tool | ⚠️ semantica ambigua (v. D) |
| `total_tool_execution_seconds` | tempo di rete/tool | ✅ misurata davvero |
| `duration_seconds` | wall-clock dell'intera run | solida |
| `blocking_failure` | `{step_id, objective, reason, tool_calls_attempted}` | solida |
| `verified_values` | valori promossi a "noti" | solida |
| `steps_detail` | dump completo di ogni `StepResult` | solida |
| (healing) `modified_count` + `patch.diff` | materiale grezzo per metriche di diff | solida |

### Segnali catturati ma NON ancora aggregati in metrica

Sono dentro `steps_detail`, presenti ma non sintetizzati:

- **`turns_used` per step** — il consumo di budget, mai aggregato (serve per l'asse *efficienza contesto*).
- **checklist per-item `passed`/`evidence`** — la granularità subtask di P1: c'è, ma la usiamo solo come dettaglio, non la trasformiamo in un punteggio tipo "4/6 checklist superate".
- **`exit_code` per tool** — catturato, mai aggregato (v. caveat in D).

### I veri buchi (nulla oggi)

- **Token / costo LLM** — catturati **solo dall'healer** (`agy` `total_tokens`/`thinking_tokens`) e per giunta **solo stampati a schermo, non persistiti**. Executor, Planner e Final Evaluator non misurano i token → asse *efficienza contesto / costo* quasi scoperto.
- **Correttezza della RCA** — zero, perché non esiste ground-truth. C'è il `healing_ticket.json`, ma niente che dica se la diagnosi era giusta.
- **Qualità del diff healing** — solo `modified_count` grezzo; nessun Diff Bloat Ratio / minimal-invasive / didactic-invariant calcolato.
- **Grounding accuracy, difficoltà, identità del modello nel summary** — non presenti.

---

## D. Fedeltà delle misure (il benchmark va testato — P6)

Le tre metriche "di sforzo" hanno fedeltà diversa. Verificarlo *è* applicare P6 ("il benchmark stesso va testato") prima di pubblicare un numero.

**`duration_seconds` — misurato davvero ✅**
`mcp_bridge.call_tool()` cronometra l'esecuzione reale: `start_time = time.time()` prima della chiamata, `elapsed = round(time.time() - start_time, 3)` dopo. È wall-clock reale e include il round-trip di rete verso Kali. `total_tool_execution_seconds` è la somma di questi. Affidabile.

**`total_tool_calls` — conteggio, ma attenzione a *cosa* conta ⚠️**
È un semplice `len()` sulla lista dei `ToolCallRecord`. Il punto è cosa ci finisce: l'Executor registra un record per **ogni** invocazione, compresi i **tool di gestione/meta** (`submit_step_result`, `show_verified_values`, `get_verified_value`, `request_turn_extension`), non solo i comandi d'attacco (che passano per `bridge.call_tool`). Oggi la metrica vale *"quante volte l'agente ha chiamato un tool qualsiasi"*, non *"quanti comandi d'attacco ha lanciato"*. Per il benchmark va decisa la semantica: se serve lo "sforzo operativo reale", i meta-tool vanno filtrati (es. flag `is_management` sul record).

**`exit_code` — semi-sintetico, il meno affidabile ⚠️⚠️**
Non viene (quasi mai) da un vero `$?` di shell. È *derivato*, con logiche diverse per canale (`call_tool`):
- `interactive_terminal_exec` → `res.get("exit_code", 0)`: dipende da cosa risponde il Terminal Gateway; una PTY interattiva spesso non espone un exit code pulito → in pratica default a `0`.
- HexStrike (risultato dict) → **tradotto da un booleano**: `0 if success else int(result.get("exit_code", 1))`. Non è l'exit status reale del processo, è la conversione del flag `success`.
- tool non trovato → `127` (forzato); risultato non-dict → `0` sempre; tool di gestione → `0` hard-coded.

Conseguenza per le metriche: `exit_code` **oggi è troppo inaffidabile** per costruirci sopra una error-rate o una *grounding accuracy* alla Cybench/AgentBoard. Se quella metrica interessa, o si rende fedele l'exit code, o si misura la grounding in altro modo (es. tool call malformate / rifiutate dal bridge — segnale più pulito di un exit code fittizio).

---

## E. Sintesi orientativa: dai principi ai 4 assi

Mappando quanto sopra sui quattro assi di benchmark:

- **Executor / oracolo di conformità (asse core)** → **già ben strumentato**, addirittura a granularità subtask (P1) e con oracle integrity strutturale (P2). Qui il lavoro è *aggregare* segnali già raccolti (checklist per-item, `turns_used`), non instrumentare da zero.
- **Efficienza contesto** → segnale parziale (`turns_used` per step, da aggregare), **token da aggiungere** (oggi persistiti da nessuna parte tranne lo schermo dell'healer).
- **Qualità healing** → materiale grezzo presente (`patch.diff`, `modified_count`), **metriche derivate da calcolare** (Diff Bloat Ratio, minimal-invasive, didactic-invariant).
- **Accuratezza RCA + confronto modelli** → **da costruire**, e dipende dal dataset con ground-truth (P6) e dalla cattura dei token/identità modello (P3).

**Messaggio per la call con Pasquale:** la parte metodologicamente più delicata — l'oracolo deterministico a granularità fine — è già in piedi e incarna i principi dei paper (P1, P2). Il lavoro di benchmark è (1) aggregare ciò che già si raccoglie, (2) aggiungere due strumentazioni mirate (token, ground-truth), (3) costruire il dataset con difetti iniettati noti.
