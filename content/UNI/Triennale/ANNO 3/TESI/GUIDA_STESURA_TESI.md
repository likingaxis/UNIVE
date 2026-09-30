# GUIDA STESURA TESI — linea guida di lavoro

> **▶ ISTRUZIONI PER L'ASSISTENTE (leggi prima di tutto).**
> 1. **Regola d'oro**: la tesi la scrive **Luca**, non tu. Tu sei un *sounding board* (struttura, brainstorming, domande, mappa scelte↔letteratura, stime). **Mai** generare prosa della tesi.
> 2. **Ordine di lettura per capire il progetto**: questo file → `Call/call pasquale.md` (architettura completa) → il **codice** in `...\Desktop\TESI\vulcAIN\vulcatest` per ogni claim tecnico.
> 3. **Le fonti sono un percorso di ragionamento, non lo stato attuale**: prima di scrivere un fatto tecnico, verificalo sul codice (vedi §0 caveat).
> 4. **STATO (2026-09-30):** brainstorming CONCLUSO → 6 capitoli + sotto-capitoli fissati (§5), pattern↔codice↔fonte mappati (§7), strategia **draft-first** + piano sprint (§8). **Prossima azione: recall pack del G1 (Cap.3a)**, poi Luca scrive. In attesa da Luca: ore/giorno sprint + ok placeholder risultati Cap.5.

> **Cos'è questo file.** È la *single source of truth* per la stesura della tesi di Luca. Serve a far ripartire da zero qualsiasi chat/assistente senza dover rispiegare tutto: qui stanno path, fonti (con i loro caveat), filo conduttore, feedback del relatore, regole di stile, scaletta dei capitoli e — cosa più importante — il nucleo di "cosa ho fatto" con parole di Luca.
>
> **Regola d'oro.** La tesi la scrive **Luca**. L'assistente fa da *sounding board*: struttura, brainstorming, domande, mappatura scelte↔letteratura, stime. NON genera prosa della tesi.

---

## 0. Path e file

- **File target della tesi** (dove si scrive): `C:\Users\Luca\Desktop\UNI2\quartz\content\UNI\Triennale\ANNO 3\TESI\TESI.md` (vault Obsidian/quartz).
- **Codice sorgente reale** (fonte di verità tecnica): `C:\Users\Luca\Desktop\TESI\vulcAIN\vulcatest` (e `vulcaforge`, `vulcamind`). Ogni sottoprogetto ha `.git` proprio; vulcatest committato solo fino a "versione 1", il resto è working tree non committato.
- **Diario di sviluppo**: `C:\Users\Luca\Desktop\TESI\memoria.md` (storico dettagliato, ma può essere disallineato dal codice — verificare).
- **Fonti-canovaccio** (nella cartella TESI):
  - `Call/call pasquale.md` — la narrazione architetturale più matura e completa (usare come base tecnica).
  - `Call/Call pasquale 2.md` — bozza di lavoro completa.
  - `PAPER LETTI E IDEE CLEAN.md` — mappa letteratura↔scelte di design (calderone, da potare DOPO).
  - `idee_e_struttura_tesi.md` — tabella capitoli + casi di studio CS-1/2/3 + note trasversali.
  - `SLIDE PRESENTAZIONE/PASQUALE SLIDE/template.html` — deck mostrato al prof.

> ⚠️ **Caveat fonti.** Questi file sono un *percorso di ragionamento*, NON una fotografia attuale del progetto: citano componenti rimossi o mai esistiti (es. nodo **Diagnostician**, un `toolbox.md`). Non sono né "da togliere" né "da mettere" di default → verificare sul **codice** prima di scrivere qualsiasi claim tecnico. Un componente *rimosso* può però valere in tesi come **decisione di design** (es. Diagnostician tolto per Goal Drift).

---

## 1. Il nucleo: "cosa ho fatto" (parole di Luca, spiegazione da bar)

*(Grezzo, da raffinare — è il cuore su cui incardinare Introduzione e Contesto.)*

- **Il dominio.** Esistono esami/esercizi di sicurezza in cui lo studente riceve un **indirizzo IP** e deve fare **pen testing** su una macchina: trovarne le vulnerabilità. Servono ad allenare gli studenti ad analizzare le possibili vulnerabilità di un sistema.
- **Chi crea le macchine.** I due tutor (Michele e Danilo) generano queste macchine con un sistema di AI a moduli: **VulcaMind** (genera la storyline, l'idea della sfida, quali vulnerabilità ci saranno, la soluzione) + **VulcaForge** (traduce tutto in IaC: Ansible + immagine Docker = la macchina vera e propria).
- **Il problema.** Le macchine generate presentano spesso problematiche, che i tutor dovevano scoprire **testandole a mano** (una rottura di tempo). Serve distinguere due cose che *si somigliano*: le **vulnerabilità volute** (didattiche, sembrano problemi ma sono intenzionali per lo studente) dai **veri difetti** (problemi non voluti che rovinano l'esperienza dello studente / l'*intended way*).
- **Il mio compito → VulcaTest.** Un sistema automatico che **impersona uno studente** e verifica se, seguendo il piano previsto (l'*intended way*), la macchina si risolve davvero con successo. Se il percorso previsto non funziona, la macchina ha un difetto.
  - *Esempio Pizzeria* (macchina che ho **generato** io): mancava una **chat** che invece era prevista come parte dell'intended way (il canale con cui lo studente scopre l'endpoint nascosto). Senza, lo studente non ritrova il percorso voluto dai professori → difetto.
- **L'architettura.** VulcaTest invoca più volte un LLM ed è organizzato in **Planner** + **Executor**, coordinati da un **Orchestratore** e un **Final Evaluator**. Sopra/attorno all'LLM c'è un'**infrastruttura = harness** — ed è proprio questa la parte che ho costruito io. *(Il concetto di "harness" va spiegato in introduzione: è di fatto ciò che ho fatto.)*
- **Realizzazione.** In **Python**. LLM = **Qwen 3.8 27B in locale** sulla mia macchina *(specificare le specifiche hardware in tesi)*.
- **Il report e l'healing.** Il test produce un **report** che rappresenta le eventuali rotture della macchina. Le rotture vanno a un **nodo di Healing** che prova a risolverle in automatico. L'healing è demandato ad **Antigravity da command line**, ma arricchito da funzionalità mie che misurano l'output, rafforzano la struttura dell'healing e forniscono le informazioni direttamente al nodo (così non deve cercarsele).
- **Il loop.** Dopo l'healing il test viene **richiamato** → si chiude il loop test → healing → re-test.

---

## 1-bis. Glossario-lampo dei componenti di VulcaTest

*(Modello mentale rapido. Dettaglio completo in `Call/call pasquale.md`; verità tecnica nel codice.)*

- **Planner** — genera l'`ATTACK_PLAN.md` (l'intended way in step) dai documenti di design di VulcaMind (`DESCRIPTION/STORYLINE/WRITEUP`). Due parti: LLM (genera) + `plan_parser.py` deterministico (trasforma in oggetti tipizzati `TestStep`). Vive *a monte* del grafo.
- **Orchestratore** — insieme di componenti deterministici (LangGraph, `graph.py` + stato condiviso `state.py`) che governano l'avanzamento step-by-step. Nessun retry a questo livello: un solo item di checklist a `false` → FAILED.
- **Executor** — l'"auditor": esegue ogni step in loop ReAct (budget di turni dinamico), impersona lo studente, riempie un `StepResult` con evidenze punto-per-punto. Vincolato da *Auditor Mode* (anti-cheating).
- **Bridge** (`mcp_bridge`) — dentro l'Executor, non è un nodo. Espone al modello un'unica lista di tool e smista tra 2 livelli: **L1** tool d'attacco via **HexStrike** (server su Kali, HTTP, stateless) e **L2** `interactive_terminal_exec` via **Terminal Gateway** (FastAPI+pexpect, sessioni PTY reali). Tronca output e ritaglia la lista tool per non saturare il contesto.
- **Final Evaluator** — Stadio 1 deterministico (metriche → `run_summary.json`) + Stadio 2 LLM (RCA post-mortem → `REPORT.md` e, se difetto, `healing_ticket.json`).
- **Healer (VulcaHealing)** — nodo condizionale (`HEALING=true`): delega la riparazione ad **Antigravity CLI** (`agy`) sui *sorgenti* IaC, con snapshot+diff deterministico, poi rebuild Docker e re-test → chiude il loop. Principio *Heuristic Lead*: il report è un indizio (sintomo), la causa è a monte nei sorgenti.

---

## 2. Filo conduttore (gerarchia, non un solo messaggio)

1. **Problema di dominio** = il *movente*: macchine didattiche generate da AI che vanno validate e riparate (oggi a mano = costoso).
2. **Mechanism engineering** = l'*ombrello* del contributo: ho progettato un **meccanismo agentico** (un harness) attorno a LLM esistenti, **non un modello**. È qui che ogni scelta di design diventa "contributo intellettuale". *(Termine dai paper: survey autonomous agents.)*
3. **Rigore dell'oracolo (evidence-based / no self-certification)** = il *gioiello*: un harness generico si fida di ciò che l'agente dichiara; il mio no, è vincolato a checklist con evidenze punto per punto.

---

## 3. Feedback del relatore (Prof. Pasquale) — da rispettare

1. **Introduzione ≠ Contesto.** L'introduzione serve SOLO a dire di cosa parla la tesi (riassunto + roadmap). Il contesto va in un **capitolo dedicato in più**.
2. **Merge Architettura + Implementazione** in un unico capitolo (erano due separati nelle slide, la frattura si sentiva); scendere nel tecnico dove serve.
3. **Snippet di codice solo se utili** alla spiegazione; altrimenti tutto su **GitHub** + link.
4. **"È corretto parlare di determinismo?"** — dubbio aperto. L'opposto di *deterministico* è *stocastico/probabilistico*, non *agentico*. Asse vero: **codice/regole (deterministico) vs LLM (probabilistico)**. Munizioni: CoALA "LLM vs Code", LLM come *probabilistic production system*. → **DA DECIDERE (Luca).**
5. **Numero *n* delle macchine — campioni NON indipendenti.** Le perturbazioni della stessa macchina base sono correlate (disegno clusterizzato): non si può dichiarare $n = M \times N$. Difesa corretta = "copertura + ground-truth stratificata"; il sizing con la formula $n \ge \frac{\ln(1-C)}{\ln(1-p)}$ va come *future work*.
6. **Modelli locali: NON "costo zero" ma "costo molto basso"** (c'è la corrente elettrica). Il numero stimato-se-cloud (~$6,58 su 14,3M token) resta valido come confronto.

---

## 4. Regole di stile e taglio

- **Lettore livello-1**: conosce i fondamenti ML/LLM ma NON gli agenti/CTF. Spiegare da zero: agente, harness, tool-use, ReAct, CTF/B2R, IaC, *intended way*.
- **Accessibile a tutti senza banalizzare**: prendere un concetto, se difficile spiegarlo bene — non annacquarlo (metodo Feynman).
- **Curare, non catalogare**: gli episodi di try-and-error entrano solo se dimostrano un principio di design (candidati forti: Diagnostician→Goal Drift; echo-bug). Niente cimitero di errori. Il resto → appendice o fuori.
- **Scala di concetti nel Contesto** (la cura all'errore delle slide, dove si "partiva di botto"): agente / architettura agentica → CTF e *intended way* → perché un harness generico non basta → **frase-gancio su cosa fa VulcaTest** → poi il dettaglio.
- **Letteratura ibrida**: background breve nel contesto + citazioni puntuali intrecciate come *giustificazione* delle scelte nei capitoli tecnici.

---

## 5. Scaletta emergente dei capitoli

*(Uscita dal brainstorming + feedback prof. Cap.1 e Cap.2 FISSATI il 2026-09-27; Cap.3-5 sotto-capitoli ancora da brainstormare.)*

**1. Introduzione** *(corta, vincolata dal prof: serve solo a dire di cosa parla la tesi)*
   1. Aggancio al problema in 2 frasi (macchine didattiche generate da AI, oggi validate/riparate a mano).
   2. Cosa fa questa tesi — contributo in sintesi (VulcaTest + VulcaHealing, il "cosa ho fatto").
   3. Struttura della tesi (roadmap capitolo per capitolo).

**2. Contesto** *(la "scala di concetti"; concetti PRIMA di VulcaIn perché VulcaIn è esso stesso agentico)*
   1. Il dominio didattico — CTF/B2R, il pentest come esame (ricevo un IP, trovo le vulnerabilità).
   2. Intended way e conformance — la macchina si risolve solo seguendo il percorso previsto; **vulnerabilità volute vs veri difetti**.
   3. Agenti LLM e architetture agentiche — agente = LLM + azione + ambiente; ReAct, Plan+Execute a livello concettuale.
   4. Il concetto di **harness** — l'infrastruttura attorno all'LLM (il gancio: "è ciò che ho costruito io").
   5. L'ecosistema **VulcAIn** ereditato (Mind/Forge/Ship) + il bisogno grezzo (difetti testati a mano = costoso → motiva l'ESISTENZA di VulcaTest). Soft handoff: nominare VulcaTest come protagonista in arrivo.
   > **Decisione (B):** "il problema" (harness generico non basta) NON chiude il Contesto → **apre il Cap.3** come molla. Due motivazioni distinte: *perché esiste VulcaTest* (tutor testano a mano) = Contesto; *perché serve un'architettura dedicata e non un harness pronto* (i 3 problemi) = apertura Cap.3.
   > **Decisione (C):** prompting e uso/scelta dei modelli NON nel Contesto → il *perché* nel Cap.3, il *confronto empirico* nel Cap.4.

**3. Architettura VulcaTest** *(merge architettura+implementazione del TESTER; criterio IBRIDO: principi come griglia + cammino per flusso. FISSATO 2026-09-27)*
   1. **Apertura-molla**: ① cosa dovrebbe fare VulcaTest → ② "naturale usare un harness pronto… ma no": i 3 problemi (guardrail / troppa libertà / imprecisioni-no oracolo) + esempio Pizzeria → ③ ecco l'architettura che risolve.
   2. **I 5 principi cardine** (griglia di lettura del capitolo).
   3. **Visione d'insieme** — il grafo LangGraph e il flusso (START→orchestrator⇄executor→final_evaluator[→healer]).
   4. **Planner** (LLM + `plan_parser` deterministico; `ATTACK_PLAN.md`; YAML vs JSON; `TestStep`; le sue regole di prompt = CS-1 oracolo lasco, regole 5/6).
   5. **Orchestratore** (`graph.py`, `state.py`, avanzamento deterministico, no-retry, gate AND sulla checklist).
   6. **Executor — il cuore** (Auditor Mode = il suo prompt + origine "cheating agent"; budget dinamico; ReAct; `StepResult`; two-stage retrieval dei `verified_values`; graceful nudge/checkpoint).
   7. **Il Bridge e i tool a due livelli** *(sotto-capitolo separato)* — HexStrike L1 stateless + Terminal Gateway L2 pexpect/PTY; troncamento output; lista tool ritagliata; editor a schermo/tasti speciali; idle-watchdog.
   8. **Final Evaluator** (Stadio 1 deterministico→`run_summary.json`; Stadio 2 LLM→`REPORT.md`/`healing_ticket`).
   9. **(a) Prompt engineering come metodo e PROCESSO** — non solo il concetto, ma il **processo iterativo reale** test→correzione→test seguito da Luca (contributo: "prompt = hyperparameter search", mechanism engineering, non fine-tuning). Esempi curati di iterazione: CS-1 (regole 5/6 del Planner), la regola di *state-awareness* nata dall'incidente nano, il *graceful nudge*. Origine = il "cheating agent". *(Breve: prompt specifici coi nodi; testi integrali in Appendice; letteratura: Prompt Report, Constitutional AI, prompt sensitivity.)*
   10. **(b) Il modello locale e l'infrastruttura di inferenza** *(sotto-capitolo vero ~3-4 pag — model & inference engineering, lavoro non documentato; raccontarlo come PERCORSO, non elenco di parametri)*. Arco interno:
      - **a. Perché locale** — guardrail (frontiera rifiuta il pentesting) + costo.
      - **b. La ricerca del modello giusto** — quali provati e perché scartati: Qwen Coder senza CoT → loop (act-only); modelli grossi → troppo lenti (decisione già presa: si resta su Qwen3.8-27B, vedi memoria planner-variance); approdo finale.
      - **c. Perché serve reasoning/CoT** — CoT utile solo su modelli capaci + fallimento act-only ReAct.
      - **d. Ottimizzazione inferenza** — trade-off **context window ↔ tok/s**, **reasoning level** (low), **temperatura**, **MTP + n-gram** (speculative decoding), **ablazione vision**.
      - **e. Infrastruttura** — server **Unsloth** + hot-swap `model_manager` + triade Executor/Evaluator/Planner via `.env` (Principio #4).
      - **f. Costo reale** — "molto basso" NON zero (fix prof), ~$6-equiv.
      - ⚠️ **Anti-duplicazione col Cap.5**: qui il *perché* (qualitativo); i *numeri* del confronto local vs cloud stanno nel Cap.5. Parametri esatti (temperatura, reasoning, MTP+ngram, Unsloth) dal `.env`/`config.py` nel recall pack.
   11. **Il Diagnostician rimosso** *(sotto-capitolo breve)* — decisione di design (Goal Drift → RCA post-mortem nel Final Evaluator). Richiamabile in 1 riga all'apertura del Cap.4.

**Regola prompt (trasversale):** metodo spiegato UNA volta (3.9a) → rationale del singolo prompt col suo nodo (Planner/Executor/Healer) → testi integrali in **Appendice: prompt integrali**.

**4. VulcaHealing** *(capitolo a sé — Strada B decisa 2026-09-27; 9 sotto-capitoli abbozzati)*
   1. Perché un sottosistema separato (agente stateless, serve piena agency sui sorgenti IaC).
   2. **Perché delegare a un agente esterno, e perché è intercambiabile** — Antigravity come *caso*, non vincolo: estendibile a Claude Code / Codex / harness locali (DeepSeek) cambiando le righe del subprocess. Lega al Principio #4 (modularità) e al filo mechanism-engineering (il valore è il meccanismo, l'agente è pluggable).
   3. Il contesto asimmetrico (**Heuristic Lead**) — il report è un indizio, la causa è a monte nei sorgenti (es. DataVault: ticket "Nginx" → causa reale bug scoping Ansible/PHP-FPM).
   4. La **costituzione**: le 5 regole di riparazione (minima riparazione, no leak, no abbassare difficoltà, preservare vuln volute, interpretazione restrittiva) → mappa su **Constitutional AI**; base delle metriche **B3**.
   5. Il **perimetro di scrittura** (scrive solo i sorgenti; `out/` in sola lettura) — per non riparare l'artefatto sbagliato.
   6. Il **flusso operativo** (snapshot in-memory vs draft fisico → invocazione `agy` stream-json + timeout a due livelli → fail-safe recompile → **diff deterministico = no self-certification**).
   7. La **chiusura del loop** (rebuild con **gate echo-safe** = CS-2, IP dinamico dopo rebuild, reset+retest).
   8. **Cicli stateless ma informati** (no `--resume`, stato sul filesystem, legge gli HEALING_REPORT precedenti, BUILD_ERROR in cima al prompt del ciclo dopo).
   9. **Limiti attuali** (`MAX_HEALING_ATTEMPTS=1` di default, incoerenza slug).

**5. Valutazione sperimentale** *(scheletro FISSATO 2026-09-27; numeri APERTI — benchmark in esecuzione. Regola: ogni benchmark agganciato al paper che lo fonda — approccio ibrido.)*
   1. **Dal "funziona" al "quanto funziona"** — obiettivo e metodologia (misurabile / confrontabile / riproducibile).
   2. **Il dataset di macchine (golden source / ground truth)** — framing: ideate ~11-12 macchine *(numero da confermare)*, certificate sane, usate come golden source per i benchmark via perturbazione. **NO catalogo macchina-per-macchina** (noioso) → un **panorama unico dei tool/tecniche raccolti** (raggruppamento per vulnerabilità) + 1 riga di storia solo per le più significative.
   3. **Metodologia di benchmark: perturbazione controllata** — golden state → mutazione singola + **baseline gate** obbligatorio; tassonomia **P1-P4**. *(cit. Test Oracle Problem — mutation testing)*
   4. **I 4 benchmark** — B1 riconoscimento (confusion matrix + progress; cit. AgentBoard/Cybench), B2 RCA, B3 healing (closed-loop + ampiezza patch), B4 costi/token/tempi. *(oracolo→SWE-Bench Pro; scaffold-aware→SWE-agent)*
   5. **La questione statistica** — perché $M\times N \neq n$ (campioni correlati/clusterizzati), difesa "copertura + ground-truth stratificata", sizing come *future work*. *(feedback prof)*
   6. **Caso studio-ammiraglia: Pizzeria_B2R** — closed-loop end-to-end (CS-3). Citadel/DataVault = vignette brevi di capacità Executor.
   7. **Confronto empirico modelli** (local vs cloud) — *nucleo*; solo misure, niente ri-descrizione modelli (sta nel Cap.3).
   8. **Ablazione dei ruoli** (modulare vs monolitico) — *nucleo*; dimostra che la separazione previene il goal drift.
   9. **Risultati e discussione.**

**6. Conclusioni e sviluppi futuri** *(scheletro FISSATO 2026-09-27)*
   1. **Sintesi del contributo** — ricapitola il mechanism engineering: harness evidence-based + closed-loop self-healing.
   2. **Limiti** onesti (`MAX_HEALING_ATTEMPTS=1`, *n* statistico, dataset piccolo…).
   3. **Sviluppi futuri** — modalità black-box; dataset grande statistico; healing in locale (costo ~0); coerenza del Planner; usi oltre il testing.
   4. **Considerazioni finali.**

**Appendici** — *Prompt integrali* (Planner, Executor/Auditor Mode, Healer); eventuale *config modello/inferenza*. Link al repo GitHub.

**Parcheggiati:** termine "determinismo" (§3.4). *(Risolto 2026-09-27: healing = capitolo a sé, Strada B → struttura a 6 capitoli.)*

---

## 6. Stato e ordine di lavoro

> **Modalità di lavoro "recall pack".** Luca ha lavorato 3 mesi: ricorda bene il recente (benchmark, config modello — temperatura, MTP+ngram, thinking), meno il vecchio. I dettagli NON vivono nella sua testa ma nel **codice** + **`memoria.md`** (diario, 1276 righe, poco scavato finora) + fonti. Prima di ogni sotto-capitolo l'assistente prepara un *recall pack*: cosa fa · decisioni di design · il perché · evidenza (file/riga) · pattern da citare (§7). Luca poi scrive di suo pugno. L'assistente = motore di recupero, non autore.


- **Struttura**: brainstorming completato il 2026-09-27 — 6 capitoli + sotto-capitoli fissati (§5). Benchmark **in esecuzione** → i *numeri* del Cap.5 arrivano da lì.
- **Ordine di scrittura consigliato** (dipendenze: l'intro riassume tutto → per ultima; i numeri del Cap.5 dipendono dai benchmark → in parallelo):
  1. **Cap.3 Architettura** — più materiale e chiarezza; qui si cattura anche il lavoro non documentato (modello/inferenza §3.10, processo di prompt engineering §3.9a) finché è fresco.
  2. **Cap.4 VulcaHealing** — stessa base di materiale, stesso slancio.
  3. **Cap.2 Contesto** — scritto DOPO 3-4: ora sai esattamente quali concetti servono al lettore (costruisci la scala su misura).
  4. **Cap.5 Valutazione — parti results-INDIPENDENTI** *(in parallelo ai benchmark, da subito)*: metodologia, dataset macchine, perturbazione, definizioni+formule+citazioni dei 4 benchmark, discussione statistica dell'*n*. I **numeri/risultati/confronto modelli/ablazione** si scrivono quando i benchmark finiscono.
  5. **Cap.6 Conclusioni** + **Cap.1 Introduzione** — per ultimi (si riassume ciò che esiste).
  - **Appendice prompt** — riempita strada facendo (copia il prompt quando tocchi ogni nodo).
- **Da risolvere prima/mentre si scrive**: (a) termine "determinismo" → PRIMA del Cap.3 §2 (i 5 principi); (b) conferma caso studio (Pizzeria ammiraglia); (c) verificare ogni claim tecnico sul codice; (d) link alla "versione draft abbozzata" (path mancante, da aggiungere alle fonti §0).

---

## 7. Mappa pattern ↔ codice ↔ fonte (verificata sul codice 2026-09-27)

*(Tag onestà: **[USATO]** = pattern applicato/ispiratore; **[INQUADRABILE]** = il design lo istanzia, citabile come fondamento a posteriori. Frasare di conseguenza in tesi.)*

**Architettura (Cap.3 principi+flusso)**
- Plan-and-Execute `[USATO]` — piano scritto una volta, no replanning (grafo `executor→orchestrator→executor`). → Prompt Report (Plan-and-Solve), Survey Autonomous Agents (planning senza feedback).
- Blackboard / working memory `[INQUADRABILE]` — `VulcaTestState` TypedDict condiviso. → CoALA (working memory) + Blackboard pattern SE.
- Agente cognitivo modulare / role-based `[USATO]` — moduli specializzati. → CoALA (singolo agente di moduli), Multi-Agents Survey (layered / cooperative / pre-defined profiling).
- **LLM vs Code** `[USATO]` — deterministico (parsing/orchestrazione/metriche) vs LLM (planning/exec/RCA). → CoALA "LLM vs Code". ⭐ munizioni per il dubbio "determinismo".
- Conditional routing / macchina a stati `[INQUADRABILE]` — `route_*` in `graph.py`.

**Executor (Cap.3 §Executor)**
- ReAct `[USATO]` — loop `while turn<=budget`, reasoning+tool+observe. → ReAct (Yao); fallimento act-only = Qwen Coder senza CoT.
- Constitution / behavioral policy `[USATO]` — Auditor Mode (regole vincolanti nel SYSTEM_PROMPT). → Constitutional AI (regole cyber quasi identiche).
- Structured artifact handoff / typed contracts `[USATO]` — Pydantic `TestStep/StepResult/ChecklistItemResult/ToolCallRecord`. → MetaGPT.
- External digital grounding `[INQUADRABILE]` — `interactive_terminal_exec`. → CoALA, AgentBoard (grounding accuracy).
- Retrieval lazy / context minimization `[USATO]` — two-stage `show_verified_values`→`get_verified_value`. → MetaGPT (filtro per ruolo), AgentBoard (context mgmt).
- Reward hacking / specification gaming `[USATO come motivazione]` — cheating agent → Auditor Mode; goal drift → rimozione Diagnostician. → Cybench (isolation/shortcut).

**Oracolo & valutazione (Cap.3 §Final Eval + Cap.5)**
- Oracle integrity / no self-certification `[USATO]` — gate AND deterministico, attore ≠ giudice. → SWE-Bench Pro (verifier gap), Test Oracle Problem.
- Mutation testing / perturbazione controllata `[USATO]` — golden→mutazione→ground truth. → Test Oracle Problem.
- Progress rate / subtask `[USATO]` — B1 da `checklist_evaluation`. → AgentBoard, Cybench.

**Healing (Cap.4)**
- Constitution (5 regole) `[USATO]` — REGOLE VINCOLANTI in `_build_healing_prompt`. → Constitutional AI.
- Deterministic diff / no self-cert `[USATO]` — diff da `diff_tracker`, prompt vieta all'agente di scrivere patch. → SWE-Bench Pro.
- Externalized/episodic memory `[INQUADRABILE]` — cicli stateless, stato su filesystem, legge HEALING_REPORT/BUILD_ERROR precedenti. → CoALA (episodic).
- Agent-agnostic delegation `[USATO]` — subprocess `agy` intercambiabile. → Principio #4.
- Fail-safe / watchdog / sentinel `[INQUADRABILE]` — rigenerazione forzata, idle-watchdog, marker echo-safe. → pattern SE classici.

**Modello & inferenza (Cap.3 §modello locale)**
- CoT necessaria `[USATO]` — Qwen Coder senza CoT falliva. → Chain-of-Thought (Wei).
- Ablation study `[USATO]` — rimozione modalità vision. → metodologia ablazione.
- Speculative decoding `[USATO]` — MTP + n-gram.

**Verità dal codice (correzioni):** `TestStep` NON ha `requires` (esiste solo nel formato YAML del piano, non nel contratto Pydantic). Grafo, gate AND, two-stage retrieval, graceful nudge, budget checkpoint = confermati in codice.

**File letti sul codice (per il recall pack, path da `...\Desktop\TESI\vulcAIN\vulcatest\`):** `white-box/executor/executor.py` (SYSTEM_PROMPT Auditor Mode righe ~21-83, budget/nudge/checkpoint ~273-487, tool submit/extension/verified ~85-190), `white-box/planner/planner.py` (SYSTEM_PROMPT righe ~37-120), `vulcahealing/healer.py` (`_build_healing_prompt` righe ~259-331, `run_healing` ~334+), `white-box/executor/models.py` (contratti Pydantic), `white-box/orchestrator/graph.py` (routing), `white-box/orchestrator/state.py` (`VulcaTestState`). Ancora da leggere per i recall pack: `orchestrator/nodes.py` (32k, i 4 nodi), `executor/mcp_bridge.py` (bridge L1/L2, troncamento, list_tools, SPECIAL_KEYS_MAP), `orchestrator/plan_parser.py`, `orchestrator/model_manager.py` (hot-swap), `.env`/`config.py` (parametri modello: temperatura, reasoning, MTP+ngram, Unsloth), `wait_utils.py` (idle-watchdog), `diff_tracker.py`. Diario `memoria.md` (1276 righe) poco scavato: fonte per i dettagli storici.

---

## 8. Stima tempi/pagine + piano sprint bozza (2026-09-30)

**Pagine per capitolo (corpo):**
| Cap | Pagine | Ore 1ª stesura (~2h/pag) |
|---|---|---|
| 1. Introduzione | 3-4 | ~7 |
| 2. Contesto | 8-11 | ~20 |
| 3. Architettura | 14-18 | ~30 |
| 4. VulcaHealing | 7-9 | ~15 |
| 5. Valutazione | 9-12 | ~23 |
| 6. Conclusioni | 3-4 | ~7 |
| Appendice | 5-8 | ~3 |

Corpo ≈ **44-58 pag**. Prima stesura ≈ **105h**. Con overhead (figure, verifica su codice, revisioni, formattazione, +40%): **totale ~145-160h**. Di cui ~15-25h **bloccate** sui numeri del Cap.5 (benchmark in corso).

**Supporto AI (recall pack + revisione + figure, NON scrittura di prosa): riduzione ~30-40% → ~95-110h totali.** Taglia molto su recupero/revisione/figure, quasi nulla su pensiero+scrittura in voce di Luca (che deve restare sua per la discussione).

**STRATEGIA DECISA (Luca, 2026-09-30): draft-first.** Scrivere una **prima bozza completa il prima possibile** (~5 giorni) → mandarla al relatore per feedback sull'intera forma → poi rifinire con calma. Bozza = asticella bassa (contenuto giù, no polish/figure lucide/verifica esaustiva), ritmo ~1h/pag, ~40-50h totali. **Risultati Cap.5 = placeholder** ("tabella da popolare", benchmark in corso).

**Ordine di scrittura CONFERMATO da Luca: 3 → 4 → 2 → 5(metodologia) → 6 → 1.** (Non l'ordine di lettura: intro/conclusioni riassumono → per ultime; contesto tarato dopo i tecnici; Cap.5 numeri bloccati. Il file `TESI.md` resta ordinato 1→6; si scrive fuori ordine, si consegna in ordine.)

**Piano sprint 5 giorni (~9-10h/giorno; leve: 7 giorni a ~6-7h/g, oppure bozza più scarna ~30-35 pag):**
- **G1** — Cap.3a: molla · principi (incl. sciogliere "determinismo" = LLM-vs-Code di CoALA) · visione · Planner · Orchestratore
- **G2** — Cap.3b: Executor · Bridge · Final Evaluator · prompt-eng · modello · Diagnostician
- **G3** — Cap.4 VulcaHealing (9 sotto-cap.)
- **G4** — Cap.2 Contesto + Cap.5 metodologia (senza numeri)
- **G5** — Cap.6 + Cap.1 + placeholder risultati Cap.5 + rilettura e invio al relatore

**IN ATTESA da Luca per finalizzare il calendario:** (1) ore/giorno reali nello sprint; (2) conferma placeholder risultati Cap.5.

**PROSSIMA AZIONE quando si riparte:** preparare il **recall pack del G1 (Cap.3a)** — estrarre da codice + `memoria.md` i dettagli di: apertura-molla (3 problemi harness generico + Pizzeria), 5 principi cardine, visione d'insieme del grafo, Planner, Orchestratore; con evidenza (file/riga) e pattern da citare (§7). Poi Luca scrive.
