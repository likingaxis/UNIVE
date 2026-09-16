# Idee e struttura della tesi — quaderno di lavoro

> **Cos'è questo file.** Non è un capitolo, è il mio *contenitore di lavoro*: qui butto le idee su cosa dire nella tesi appena mi vengono, e le organizzo per capitolo. In fase di scrittura lo rileggo e ritrovo sia i contenuti sia la struttura.
>
> **Come lo uso.** Idea grezza → la scarico nell'📥 INBOX qui sotto. Con calma la sposto nel capitolo giusto. Ogni sezione-capitolo è un elenco di "cose che voglio dire" che cresce nel tempo.

---

## 📥 INBOX — idee da collocare

*(Butta qui le idee al volo, senza pensare a dove vanno. Poi le sposti nel capitolo giusto.)*

- _(vuoto — la prima idea è già stata collocata nel Cap. 3, vedi sotto)_

---

## 🗺️ Struttura dei capitoli (indice di riferimento)

| Cap | Titolo | Obiettivo (cosa dimostra) | Contenuti chiave | Pagine | Natura |
|---|---|---|---|---|---|
| **1** | **Introduzione e contesto** | Inquadra il problema e posiziona il *mio* contributo dentro VulcAIn | Dominio didattico CTF/B2R; cos'è un workflow agentico e un agente LLM (livello funzionale); il problema: garantire conformità e auto-riparazione delle macchine generate; obiettivi e struttura della tesi | 5–7 | Discorsivo |
| **2** | **Architettura e scelte di design** | Che ho *progettato* un sistema, con decisioni motivate — non solo scritto codice | Pipeline VulcAIn (Mind→Forge→Deploy→Test⇄Healing) e dove sta il mio lavoro; separazione a 3 ruoli (Planner→Executor→Evaluator) e il *perché* (no context bleeding / no cheating); il loop LangGraph del White-Box; rimozione del Diagnostician per il Goal Drift → RCA post-mortem nell'Evaluator; ruolo di Planner ed Evaluator | 8–10 | Presente (sistema esistente) |
| **3** | **Gli agenti operativi: esecuzione e riparazione** | Come il sistema *agisce* nel concreto, il cuore tecnico e più originale | **Executor** in dettaglio; **Self-healing**; **panoramica modelli** (breve, a priori) | 8–11 | Presente (design + implementazione) |
| **4** | **Valutazione sperimentale** | Che il sistema *funziona davvero e quanto* — il contributo scientifico | Metodologia di benchmark; assi e metriche; macchine di test; risultati; confronto empirico modelli; discussione | 7–10 | Passato (esperimenti condotti) |
| **5** | **Conclusioni e sviluppi futuri** | Tira le somme e apre | Sintesi del contributo; limiti; sviluppi futuri (modulo black-box, usi oltre il testing); considerazioni finali | 3–4 | Chiusura |

**Filo narrativo:** problema → *come l'ho progettato* → *come agisce nel concreto* → *quanto funziona davvero* → *dove può andare*.

---

## Cap. 1 — Introduzione e contesto

- Dominio didattico CTF/B2R: cosa sono, a cosa servono le macchine vulnerabili didattiche.
- Cos'è un workflow agentico e un agente LLM (livello funzionale, non da manuale): harness, tool-use loop, ciclo ragiona→agisci→osserva.
- Il problema: garantire la **conformità** delle macchine generate e la loro **auto-riparazione**.
- Obiettivi della tesi e dove sta il *mio* contributo dentro VulcAIn.
- _(altre idee qui...)_

## Cap. 2 — Architettura e scelte di design

- La pipeline completa VulcAIn: Mind → Forge → Deploy → Test ⇄ Healing, e dove si colloca il mio lavoro.
- Separazione a **3 ruoli** (Planner → Executor → Evaluator) e il *perché*: evitare context bleeding e cheating dell'agente.
- Il **loop LangGraph** del White-Box.
- **Rimozione del Diagnostician** per il Goal Drift → RCA spostata post-mortem nel Final Evaluator (scelta di design motivata!).
- Ruolo e responsabilità di **Planner** ed **Evaluator** (qui, così nel cap. 3 non restano orfani).
- _(altre idee qui...)_

## Cap. 3 — Gli agenti operativi: esecuzione e riparazione

### Executor (in dettaglio)
- Auditor Mode: nessuna assunzione senza evidenza empirica; budget di turni dinamico; gestione delle evidenze.
- **[IDEA — 1ª annotata]** Architettura **client-server** che abilita il tool-use dell'Executor: il **Terminal Gateway** (FastAPI + pexpect, PTY su Kali :8889) e l'**MCP bridge** con cui l'Executor pilota la macchina target. Spiegare il modello client-server, perché serve un PTY reale, come l'Executor invia comandi e riceve output.
- _(altre idee sull'Executor qui...)_

### Self-healing
- **Da valorizzare (il sugo concettuale):**
  - Asimmetria di contesto: il **report è un indizio, non una specifica** (il tester osserva sintomi dall'esterno / out-of-band; l'healer agisce sulle cause con accesso ai sorgenti IaC).
  - **Minima Riparazione + Fedeltà all'Intento + No-Leak**: riparare ≠ far passare il test su un artefatto *didattico*. Non abbassare la difficoltà, non scrivere flag/credenziali a schermo, preservare le vuln intenzionali.
  - Perché l'healer è un agente **separato e stateless** (Antigravity CLI headless), non un nodo del loop.
- **Da citare brevemente (meccanica):** snapshot/diff (diff_tracker), chat stateless per ciclo, ri-risoluzione dell'IP target dopo il rebuild, storico degli HEALING_REPORT per non ripetere ipotesi fallite.
- _(altre idee sull'healing qui...)_

### Panoramica modelli (breve, a priori — zero numeri qui)
- Triade Executor/Evaluator/Planner + modello dell'Healer (Antigravity, gemini-3.8-flash-low).
- *Perché a priori*: ipotesi di design (tool-use per l'Executor, rigore per l'Evaluator, local-vs-cloud per costo/privacy).
- Gestione della **context window** (evidence manager, chat stateless nell'healing).
- ⚠️ Il confronto empirico tra modelli va nel Cap. 4, non qui.
- _(altre idee qui...)_

## Cap. 4 — Valutazione sperimentale

- Metodologia di benchmark: come misuro.
- Assi e metriche: conformità/RCA, qualità dell'healing, efficienza di contesto, confronto modelli.
- Macchine di test (tassonomia da definire).
- Risultati + **confronto empirico modelli** (local vs cloud, Qwen 3.8 vs altri) che conferma/smentisce le ipotesi del Cap. 3.
- Discussione.
- _(altre idee qui — travasare da ORGANIZZAZIONE TESI.md: negative testing matrix, KPI, MTTR...)_

## Cap. 5 — Conclusioni e sviluppi futuri

- Sintesi del contributo.
- Limiti.
- Sviluppi futuri: modulo **black-box**; usi oltre il testing di macchine vulnerabili.
- Considerazioni finali.
- _(altre idee qui...)_

---

## 🧭 Note trasversali (promemoria da tenere a mente scrivendo)

- **Software finito ≠ tesi finita.** Cap. 2–3 descrivono un sistema *già esistente* (presente, con sicurezza); Cap. 4 descrive lavoro *ancora da produrre* post-call (passato).
- **Regola anti-duplicazione modelli:** Cap. 3 zero numeri (solo scelte e motivazioni); Cap. 4 zero ri-descrizioni degli agenti (solo misure e interpretazione).
- **Curse of knowledge sull'healing:** ciò che mi sembra banale ("do un prompt e ripara") è in realtà il contributo — sono ~7 decisioni di design motivate.

---

## 📎 Da consolidare più avanti

- `ORGANIZZAZIONE TESI.md` (vecchio dump idee): contiene materiale ancora valido da travasare qui — negative testing matrix, categorie di metriche/KPI, MTTR. Attenzione: cita cose datate (Diagnostician, caso Pizzeria orari.php) da NON riprendere pari pari.
- `TESI.md`: contiene già questa tabella; una volta consolidato qui, archiviare per evitare doppioni.
