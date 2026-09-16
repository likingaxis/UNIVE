Ordine che uso — parto dai dati e dallo scheletro (base solida), poi seguo il flusso di esecuzione reale (comodo per la narrazione con Pasquale):

1. **Contratti dati** — `executor/models.py` + `orchestrator/state.py` (cosa gira nel sistema: TestStep, StepResult, VulcaTestState)
2. **Scheletro del grafo** — `orchestrator/graph.py` + le costanti rilevanti di `config.py` (la forma del pipeline prima dei dettagli)
3. **Planning** — `orchestrator/plan_parser.py` + `planner/planner.py` (da DESCRIPTION/STORYLINE a lista di TestStep)
4. **Nodi orchestrator/executor** — `orchestrator/nodes.py` (parte `orchestrator_node`/`executor_node`, la colla tra grafo ed executor)
5. **Il cuore ReAct** — `executor/executor.py` (budget dinamico, tool interni, Auditor Mode)
6. **Il bridge** — `executor/mcp_bridge.py` (HexStrike + terminal gateway, sessioni PTY)
7. **Final Evaluator** — resto di `nodes.py` (Stage 1 KPI, Stage 2 REPORT.md/healing_ticket.json)
8. **Healing** — `vulcahealing/healer.py` (+ `diff_tracker.py` se serve)
9. (facoltativo, veloce) `model_manager.py`, `evidence_manager.py`, `main.py` — moduli satellite/collante

Fai come dici tu: leggi la Fase 1 per conto tuo (`models.py` e `state.py`), e quando trovi un pezzo che non ti torna me lo chiedi — ci applico sopra il Feynman method (ti faccio domande mirate su quel pezzo finché non riesci a rispiegarmelo tu con parole tue). Quando hai finito di leggere o hai le prime domande, dimmi pure e procediamo.