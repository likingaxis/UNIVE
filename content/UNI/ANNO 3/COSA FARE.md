- fregatene dei voti, stai costruendo la persona che sarai in magistrale, lì puoi grindare di brutto sei bravo in quelle cose e inoltre farai esperienze come erasmus ecc... (Se ti impegni davvero)
Ecco la scaletta in step, divisa netta pre-call / post-call, con l'ordine giusto e le dipendenze.

## 🎯 PRE-CALL — arrivare pronti

**Fase A — Credibilità / correttezza (farla per prima, è la base)**

- **A1.** Chiudere il loop reale: **rerun pulito di Pizzeria** post-healing fino a certificare con un `run_summary.json` che FASE_2 passa (residuo Idea 5). Senza questo il self-healing è "non dimostrato end-to-end".
- **A2.** (rafforzativo) Rerun pulito di **Exam_1APP26** per confermare il fix del Planner → allarga la tabella di validazione.

**Fase B — Materiale espositivo (punti 1-3)**

- **B1.** Completare `call pasquale.md` (finire la sezione "Come si esegue"), tenendolo a **livello relatore**: top-down, si scende nel dettaglio solo su richiesta.
- **B2.** **Slide** con arco narrativo: problema → architettura a 3 ruoli _e perché_ (Auditor Mode / no-Diagnostician) → numeri di validazione (4 macchine 100%) → self-healing a contesto asimmetrico → **piano sperimentale**.
- **B3.** **Demo kit**: artefatti reali già pronti come sostanza + fallback (`REPORT.md`, `run_summary.json`, `patch.diff`); run live breve solo se c'è tempo. La guida comandi = appendice/per te, non da esporre.

**Fase C — Piano scientifico come _design_ (punti 4-6, la metà "prima")**

- **C1.** **Metriche**: definire i 4 assi (accuratezza RCA / qualità healing / modello locale-vs-cloud / efficienza contesto) con metriche candidate. Per l'healing: Diff Bloat Ratio, Didactic Invariant Preservation, Minimal-Invasive Patch.
- **C2.** **Prova di fattibilità** (1 solo campione, non la suite): calcolare es. il Diff Bloat Ratio sul `patch.diff` di Pizzeria `output_41` già esistente → dimostri che la metrica è _misurabile_, non teorica.
- **C3.** **Related work**: 2-3 paper àncora da Scholar (agentic eval: SWE-bench/AgentBench; cyber-agent: Cybench/CyberSecEval; program repair per patch-minimality).
- **C4.** **Struttura tesi**: bozza dei capitoli (da definire insieme nel prossimo brainstorming).
- **C5.** **Tassonomia macchine di benchmark** come proposta (Idea 27 stress-test asincroni/stateful + Idea 11 difetti IaC iniettati per la confusion matrix).

**Fase D — Framing della call**

- **D1.** Preparare le **3 decisioni da far approvare**: (a) struttura della tesi, (b) priorità degli assi di benchmark per una triennale, (c) black-box / corpus esterno HTB: in-scope o sviluppi futuri.

---

## 🚀 POST-CALL — esecuzione (dopo l'ok di Pasquale)

- **P1.** Recepire il feedback: finalizzare metriche approvate + tassonomia macchine approvata.
- **P2.** Strumentare la **raccolta dati mancante**: `generate_thesis_tables.py` (Idea 13) + eventuali campi extra in `ToolCallRecord`/`run_summary.json` se le metriche approvate lo richiedono.
- **P3.** **Costruire le macchine** di benchmark approvate (VulcaMind → VulcaForge).
- **P4.** Eseguire la **matrice** (la parte meccanica): per ogni macchina/scenario → run → raccogli `run_summary`/`REPORT`/`patch`.
- **P5.** **Elaborare i dati** → tabelle/grafici (confusion matrix della RCA, metriche di healing, confronto modelli…).
- **P6.** Scrivere i **capitoli sperimentali** riempiendo i placeholder della struttura definita in C4.
- **P7.** (se approvato in D1) **black-box / corpus esterno** per la validità esterna.

---

**Dipendenze chiave da tenere a mente:** A1 prima di tutto (correttezza); C1 → C2 → C5 (le macchine si disegnano _sulle_ metriche); e nel post, P1 → P3 → P4 → P5 → P6.

Vuoi che la salvi da qualche parte (in fondo a `call pasquale.md`, o in un file `scaletta.md` a parte), o la teniamo qui e passiamo a lavorare il primo step di contenuto — tipo **C4 (struttura tesi)** o **C1 (metriche)**?