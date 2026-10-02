# GUIDA STESURA TESI — linea guida di lavoro

> **▶ ISTRUZIONI PER L'ASSISTENTE (leggi prima di tutto).**
> 1. **Regola d'oro**: la tesi la scrive **Luca**, non tu. Tu sei un *sounding board* (struttura, brainstorming, domande, mappa scelte↔letteratura, stime). **Mai** generare prosa della tesi.
> 2. **Ordine di lettura per capire il progetto**: questo file → `Call/call pasquale.md` (architettura completa) → il **codice** in `...\Desktop\TESI\vulcAIN\vulcatest` per ogni claim tecnico.
> 3. **Le fonti sono un percorso di ragionamento, non lo stato attuale**: prima di scrivere un fatto tecnico, verificalo sul codice (vedi §0 caveat).
> 4. **STATO (2026-10-02):** Capitolo 3 (Architettura VulcaTest) e Capitolo 4 (VulcaHealing) **COMPLETATI E CONSOLIDATI** in `BOZZA SCRITTA/Capitolo 3 - Stesura.md` e `BOZZA SCRITTA/Capitolo 4 - Stesura.md`. L'indice e i sottoparagrafi di 3° livello sono sincronizzati al 100% in `BOZZA SCRITTA/INDICE e titolo.md` e `TESI.md`. Specifiche hardware congelate: **16 GB VRAM**, **64 GB RAM**. Runtime locale: Qwen 3.8 27B GGUF (`reasoning_effort=medium`, KV-cache fp16, speculative decoding MTP+N-gram, hot-swapping via `model_manager.py`). **Prossima azione:** stesura del **Capitolo 2 (Contesto e lavori correlati)** e formalizzazione metodologica del **Capitolo 5 (Valutazione sperimentale / TestBench)** prima dell'inserimento dei risultati empirici.

> **Cos'è questo file.** È la *single source of truth* per la stesura della tesi di Luca. Serve a far ripartire da zero qualsiasi chat/assistente senza dover rispiegare tutto: qui stanno path, fonti (con i loro caveat), filo conduttore, feedback del relatore, regole di stile, scaletta dei capitoli e — cosa più importante — il nucleo di "cosa ho fatto" con parole di Luca.
>
> **Regola d'oro.** La tesi la scrive **Luca**. L'assistente fa da *sounding board*: struttura, brainstorming, domande, mappatura scelte↔letteratura, stime. NON genera prosa della tesi.

---

## 0. Path e file

- **Bozze di stesura consolidate** (dove si scrive e si rifinisce capitolo per capitolo):
  - `C:\Users\Luca\Desktop\UNI2\quartz\content\UNI\Triennale\ANNO 3\TESI\BOZZA SCRITTA\Capitolo 3 - Stesura.md` (consolidato)
  - `C:\Users\Luca\Desktop\UNI2\quartz\content\UNI\Triennale\ANNO 3\TESI\BOZZA SCRITTA\Capitolo 4 - Stesura.md` (consolidato)
  - `C:\Users\Luca\Desktop\UNI2\quartz\content\UNI\Triennale\ANNO 3\TESI\BOZZA SCRITTA\INDICE e titolo.md` (indice ufficiale con 3° livello)
- **File master della tesi**: `C:\Users\Luca\Desktop\UNI2\quartz\content\UNI\Triennale\ANNO 3\TESI\TESI.md` (mappa concettuale e sintesi).
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
- **Realizzazione.** In **Python**. LLM = **Qwen 3.8 27B in locale** sulla mia macchina (postazione con **16 GB di VRAM** e **64 GB di RAM**).
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

*(CONSOLIDATA 2026-10-01 dopo brainstorming completo + feedback prof. Sostituisce la vecchia scaletta.)*

**Catena macro — ogni capitolo risponde a UNA domanda; la chiusura di un cap. apre il successivo (nessun buco, nessuna sovrapposizione):**

| Cap | Domanda-motrice | Lascia aperto → |
|---|---|---|
| 1 Intro | di cosa parla e com'è fatta la tesi | apre tutto |
| 2 Contesto | perché serve validare+riparare in automatico macchine didattiche AI | "come lo costruisci?" → 3 · (tiene aperto di proposito: "perché non un harness pronto?" → apre 3) |
| 3 Architettura | come ho costruito un harness che verifica la conformità *senza fidarsi dell'agente* | produce il REPORT → "e se dice difetto?" → 4 |
| 4 VulcaHealing | come riparo in automatico e chiudo il loop | loop chiuso → "funziona, e quanto?" → 5 |
| 5 Valutazione | quanto funziona (misurabile/confrontabile/riproducibile) | → 6 |
| 6 Conclusioni | cosa ho dimostrato, limiti, dove si va | — |

**Regola della quota (alto-livello vs codice — vale in TUTTA la tesi):** 3 quote — ① *decisione di design* (cosa/perché/quale principio: SEMPRE nel corpo) · ② *meccanismo* (il come concettuale, schema, niente codice: solo se l'insight non si capisce senza) · ③ *implementazione* (snippet/dettaglio fine: di norma → GitHub/Appendice). **Test per ogni cosa:** "se lo tolgo, il lettore perde una DECISIONE o solo una RIGA DI CODICE?" → decisione = resta; codice = fuori. (Allineata al relatore: "snippet solo se utili".)

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
   6. **Lavori correlati / stato dell'arte** *(aggiunto 2026-10-01)* — posizionamento vs lavoro esistente (distinto dal background concettuale sopra): **PentestGPT** e agentic pentesting framework (fanno exploitation autonoma; NON conformance né oracolo evidence-based, tendono al goal-reaching) · **Automated Program Repair / self-healing** (per posizionare VulcaHealing) · **la novità da dichiarare**: nessuno combina *conformance testing* + *oracolo evidence-based* su *macchine didattiche generate da AI* + *closed-loop self-healing*. NON duplicare: gli harness generici restano in 3.1 (motivazione), i paper di benchmark in Cap.5 (metodologia). 📚 PentestGPT. ⚠️ **Verificare col relatore** se serve un capitolo "Stato dell'arte" dedicato (alcuni corsi lo richiedono) → in tal caso promuovilo a capitolo breve tra Contesto e Architettura.
   > **Decisione (B):** "il problema" (harness generico non basta) NON chiude il Contesto → **apre il Cap.3** come molla. Due motivazioni distinte: *perché esiste VulcaTest* (tutor testano a mano) = Contesto; *perché serve un'architettura dedicata e non un harness pronto* (i 3 problemi) = apertura Cap.3.
   > **Decisione (C):** prompting e uso/scelta dei modelli NON nel Contesto → il *perché* nel Cap.3, il *confronto empirico* nel Cap.4.

**3. Architettura VulcaTest** *(il TESTER — UN capitolo, DUE movimenti. Merge architettura+implementazione (criterio IBRIDO: principi = griglia + cammino per flusso). È GIUSTO sia il cap. più grande ~15-18pp: è il contributo. NON spaccarlo arch/impl = ciò che il prof ha fatto togliere; la divisione legittima è tester(3)/healer(4).)*

*Movimento A — il sistema (cosa È l'harness; percorre i nodi nell'ordine del controllo; finisce producendo il REPORT)*
   1. **Apertura-molla** — dal prototipo (era solo un system prompt) all'architettura vera; ① cosa deve fare VulcaTest → ② i 3 problemi dell'harness pronto (guardrail / troppa libertà / nessun oracolo evidence-based) — **Antigravity qui = CONTRO-esempio** — + esempio Pizzeria → ③ ecco la risposta.
   2. **I 5 principi cardine** (griglia di lettura; parole di Luca): *deterministic where possible, agentic where necessary* · *evidence-based execution* · *separation of concerns* · *interchangeability by design* · *plan+execute & react*. ⭐ qui si **scioglie "determinismo"** (il 1° principio È la risposta al dubbio del prof).
   3. **Visione d'insieme** — il grafo LangGraph e il flusso (START→orchestrator⇄executor→final_evaluator[→healer]).
   4. **Planner** (LLM + `plan_parser` deterministico; `ATTACK_PLAN.md`; snippet YAML; `TestStep`; regole di prompt = CS-1 oracolo lasco, regole 5/6; de-fence multi-blocco).
   5. **Orchestratore** (*prima* dell'Executor, come nelle slide che convincevano; `graph.py`, `state.py`/`VulcaTestState`; avanzamento deterministico, no-retry, gate AND sulla checklist).
   6. **Executor — il cuore** (esecutore con poco margine ma che *interpreta*; Auditor Mode = il suo prompt + origine "cheating agent"; ReAct; `StepResult` + campo `evidence` OBBLIGATORIO = no self-certification *strutturale*).
   7. **Il Bridge — i due sensi dell'Executor** — *azione* (tool-call: L1 HexStrike stateless + L2 `interactive_terminal_exec`, nato da necessità) + *percezione* (output ripulito ANSI/VT100, `session_last_line`, avvisi iniettati). Terminal Gateway = demone REST disaccoppiato (FastAPI+pexpect) su Kali (porta 8889). Tool auto-descriventi a runtime. Nano/special-keys (`\r` vs `^J`) solo alla quota-decisione.
   8. **Final Evaluator** (Stadio 1 deterministico→`run_summary.json`; Stadio 2 LLM→`REPORT.md`/`healing_ticket`). → chiude il Movimento A.
   9. **Il Diagnostician rimosso** *(breve)* — decisione di design (Goal Drift → RCA post-mortem nel Final Evaluator). Richiamabile in 1 riga in apertura Cap.4.

*Movimento B — l'ingegneria dell'harness (come l'ho fatto funzionare; taglia tutti i nodi → viene DOPO che il lettore li conosce)*
   10. **Robustezza e gestione del contesto** ⭐ *(secco C — un'unica molla: l'agente stocastico in una finestra finita)* — troncamento output (`MAX_TOOL_OUTPUT_CHARS`) · tool-slicing (~150→pochi, `list_tools`+matching) · two-stage retrieval dei `verified_values` (`show_`→`get_`, context minimization) · budget turni dinamico + **graceful nudge** (a -2 turni avvisa: tirare le fila / chiedere proroga / emettere verdetto) + checkpoint · **watchdog timeout DONE/IDLE/CAP/DEAD** (aspetta il *silenzio*, non un tempo fisso; marker `stop_pattern`; è la risposta a "come gestisco build/tool lenti").
   11. **Prompt engineering come metodo e PROCESSO** — il processo iterativo reale test→correzione→test ("prompt = hyperparameter search", mechanism engineering, non fine-tuning). Esempi curati: CS-1 (regole 5/6), *state-awareness* da incidente nano, *graceful nudge*. Origine = il "cheating agent". *(Metodo UNA volta → rationale del singolo prompt col suo nodo → testi integrali in Appendice; letteratura: Prompt Report, Constitutional AI, prompt sensitivity.)*
   12. **Il modello locale e l'infrastruttura di inferenza** *(~3-4pp — model & inference engineering, substrato; PERCORSO non elenco di parametri)*:
      - **a. Perché locale** — guardrail (frontiera rifiuta il pentesting) + costo.
      - **b. Ricerca del modello** — Qwen Coder senza CoT → loop (act-only); modelli grossi → troppo lenti (si resta su Qwen3.8-27B, vedi memoria planner-variance); approdo finale.
      - **c. Reasoning/CoT** — serve CoT (utile solo su modelli capaci); fallimento act-only ReAct.
      - **d. Ottimizzazione inferenza** — context window ↔ tok/s · reasoning level (low) · temperatura · MTP+n-gram (speculative decoding) · ablazione vision · **sizing dinamico della finestra** (`token_utils`, kv-cache/VRAM) *(ri-prende il §10: 10 = riduci l'input, 12d = dimensiona il contenitore)*.
      - **e. Infrastruttura** — server Unsloth + hot-swap `model_manager` + triade Executor/Evaluator/Planner via `.env` (Principio #4).
      - **f. Costo reale** — "molto basso" NON zero (fix prof), ~$6-equiv.
      - ⚠️ **Anti-duplicazione Cap.5**: qui il *perché* (qualitativo); i *numeri* local-vs-cloud stanno nel Cap.5. Parametri esatti dal `.env`/`config.py`.
   → **chiude il capitolo:** il report con un difetto → apre il Cap.4.

**Inventario implementazioni (i "secchi" → dove vanno), verificato sul codice 2026-10-01:**
- **A. Contratti**: `VulcaTestState`→§3.5 · `TestStep`/`StepResult`→ai punti di handoff · `ChecklistItemResult.evidence`→§3.6/principi · `ToolCallRecord`→§3.6 (ponte verso B4 del Cap.5).
- **B. Bridge** → §3.7.
- **C. Robustezza/contesto** → §3.10 (RAGGRUPPATO, non sparso: trasforma 5 "trucchi" in un argomento di design unico).
- **D. Planner** (YAML + `plan_parser`, de-fence multi-blocco) → §3.4.
- **E. Build Docker + IP dinamico** → NON qui: Cap.4 (nodo healer).
- *Isolamento cross-run* (`reset_all_sessions`/`clear_cache`) → citato in §3.7, agganciato al Cap.5 (igiene benchmark).

**4. VulcaHealing: closed-loop self-healing** *(consolidato a 6 sezioni, 7-9 pp; chiuso nello stesso StateGraph)*
   1. **Integrazione di VulcaHealing nel workflow closed-loop** — estensione naturale dello StateGraph (`Final Evaluator -> healer_node -> rebuild -> Orchestrator`); asimmetria operativa in-band (Kali, attacco, nessun accesso IaC per prevenire scorciatoie) vs out-of-band (sorgenti IaC, persistenza); prevenzione di Goal Drift e conflitto di interessi.
   2. **Dal ticket diagnostico alla localizzazione del difetto nell'Infrastructure as Code** — la RCA è già chiusa dal Final Evaluator (§3.8); qui il ticket si trasforma in localizzazione mirata nei file IaC; principio dell'**Heuristic Lead** (il ticket è un indizio euristico, non una prescrizione rigida); risalita della catena di dipendenze (caso studio DataVault: HTTP 404 Nginx originato a monte da socket errato in Ansible).
   3. **L'Healer: delega operativa a harness agentici generici** — ruolo complementare degli harness generici (inadatti al testing vincolato di §3.1, ideali per il code editing multi-file); controller `healer.py` che invoca Antigravity CLI (`agy --mode accept-edits --output-format stream-json /goal`) in modalità headless; modularità e sostituibilità del motore di editing (Principio 4).
   4. **Prompt dell'Healer, vincoli operativi e perimetro di modifica** — vincoli deontologici (Constitutional AI): riparazione minima, No-Leak, **preservazione categorica delle vulnerabilità didattiche** (non sanificare le falle volute!), divieto modifiche fittizie, economia esplorazione; perimetro rigido: modificabile solo `machines/<slug>.yaml` (e webapp), `out/` in sola lettura (artefatto derivato effimero); cicli stateless con iniezione di `BUILD_ERROR.md` al ciclo successivo.
   5. **Tracciamento e validazione delle modifiche** — rifiuto dell'autocertificazione dell'agente riparatore; modulo deterministico `diff_tracker.py`: snapshot iniziale pre-fix, calcolo del diff unificato `patch.diff` ed emissione di `HEALING_REPORT.md` via `difflib`; misurazione delta per Benchmark B3.
   6. **Chiusura del ciclo: ricostruzione dell’ambiente e regression testing** — rigenerazione bundle con `generator/main.py`; compilazione Docker su Kali con **Gate Echo-Safe** (Caso Studio CS-2, marker concatenato quotato `echo '"__BUILD""_""SUCCESS__"'`); ricreazione container (*Clean Slate*) e IP dinamico (`docker inspect`); **regression testing integrale** da Fase 1 (`current_step_index = 0`) per escludere regressioni; limite di terminazione `MAX_HEALING_ATTEMPTS=1`.

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

## 5-BIS. MAPPA RAPIDA DEI CAPITOLI (da qui si scrive)

> Versione scansionabile della struttura (§5) — **tienila aperta mentre scrivi**.
> Legenda: ⭐ citazione forte · 📚 citazione puntuale · (—) niente, è tuo.
> **Regola della quota (sempre):** decisione → corpo · meccanismo → se l'insight lo richiede · codice → GitHub/Appendice.

**1 · Introduzione** — *per ultima · 3-4 pp*
1. Aggancio al problema (macchine didattiche AI, oggi validate/riparate a mano)
2. Il contributo in sintesi (VulcaTest + VulcaHealing)
3. Roadmap della tesi
→ quasi zero citazioni (al max 📚 mechanism engineering)

**2 · Contesto** — *la "scala di concetti" · 8-11 pp*
1. Dominio: CTF / B2R, il pentest come esame — 📚 Cybench
2. Intended way e white-box testing: vulnerabilità volute vs veri difetti — (—)
3. Agenti LLM e architetture agentiche — 📚 Prompt Report, CoALA
4. Il concetto di **harness** — ⭐ Autonomous Agents Survey *(il gancio: "è ciò che ho costruito")*
5. L'ecosistema VulcAIn (Mind/Forge/Ship) + il bisogno grezzo — (—)
6. **Lavori correlati / stato dell'arte** — PentestGPT + agentic pentest · APR/self-healing · il gap (nessuno combina conformance + oracolo evidence-based su macchine AI + closed-loop) — 📚 PentestGPT
→ lascia aperto di proposito: *"perché non un harness pronto?"* (apre il Cap.3)

**3 · Architettura e implementazione di VulcaTest** — *il tester · 15-18 pp (CONSOLIDATO)*
3.1 Requisiti e limiti delle soluzioni generiche (guardrail, sostenibilità, controllo/oracolo, contro-esempio Antigravity, caso Pizzeria) — 📚 SWE-bench Pro, Cybench
3.2 Principi di progettazione del sistema (1. Deterministico vs probabilistico · 2. Evidenze e no auto-certificazione · 3. Separazione responsabilità · 4. Intercambiabilità · 5. Controllo gerarchico Plan-and-Solve + ReAct) — ⭐ CoALA, MetaGPT, Plan-and-Solve (Wang), ReAct (Yao)
3.3 Architettura generale e flusso di coordinamento (inquadramento CoALA, memoria di lavoro `VulcaTestState` in LangGraph, punti d'ingresso, contratti tipizzati Pydantic) — 📚 CoALA, MetaGPT
3.4 Il Planner: generazione e formalizzazione dell’Attack Plan (architettura ibrida 2 stadi, gerarchia fonti, regole oracolo CS-1, contesto dinamico) — 📚 planning senza feedback
3.5 L’Orchestrator: controllo del workflow e gestione dello stato (stato condiviso tipizzato, topologia StateGraph condizionale, gate AND) — 📚 LangGraph, CoALA
3.6 L’Executor: esecuzione degli step e modalità di auditing (Auditor Mode, budget dinamico + graceful nudge, tool interni, contratto `StepResult`) — ⭐ ReAct, Constitutional AI, MetaGPT
3.7 Il Bridge di esecuzione: gestione degli strumenti e delle interazioni con il target (canale azione L1 HexStrike / L2 Terminal Gateway, canale percezione e watchdog del silenzio, gestione contesto e tool-slicing, supporto TUI/PTY) — 📚 CoALA grounding, AgentBoard
3.8 Il Final Evaluator: valutazione deterministica e Root Cause Analysis (Stadio 1 metriche deterministiche `run_summary.json`, Stadio 2 RCA e `healing_ticket.json`, Diagnostician rimosso) — ⭐ SWE-bench Pro (verifier gap), Cybench
3.9 Prompt engineering e definizione dei ruoli agentici (sviluppo iterativo, specializzazione prompt, regole e formati vincolati) — ⭐ Prompt Report, Constitutional AI
3.10 Modello locale e configurazione dell’inferenza (motivazioni locale, 16 GB VRAM, 64 GB RAM, Qwen 3.8 27B GGUF, CoT `reasoning_effort=medium`, quantizzazione 3-bit, KV fp16, speculative MTP+N-gram, hot-swap `model_manager`, benchmark per LLM) — 📚 Chain-of-Thought (Wei)
→ chiude: il report diagnostico e il ticket aprono il Cap. 4.

**4 · VulcaHealing: closed-loop self-healing** — *l'healer · 7-9 pp (CONSOLIDATO)*
4.1 Integrazione di VulcaHealing nel workflow closed-loop (estensione StateGraph, separazione in-band/out-of-band, prevenzione goal drift) — 📚 CoALA modularità
4.2 Dal ticket diagnostico alla localizzazione del difetto nell'Infrastructure as Code (Heuristic Lead, risalita catena IaC, caso DataVault) — (—)
4.3 L'Healer: delega operativa a harness agentici generici (harness generico per code editing, controller `healer.py`, Antigravity CLI headless `/goal`, modularità) — 📚 mechanism engineering
4.4 Prompt dell'Healer, vincoli operativi e perimetro di modifica (5 regole deontologiche, preservazione vulnerabilità didattiche, protezione `out/`, feedback `BUILD_ERROR.md`) — ⭐ Constitutional AI
4.5 Tracciamento e validazione delle modifiche (rifiuto auto-certificazione, `diff_tracker.py`, snapshot, patch.diff, HEALING_REPORT.md) — ⭐ SWE-bench Pro
4.6 Chiusura del ciclo: ricostruzione dell’ambiente e regression testing (rebuild bundle, gate Echo-Safe CS-2, Clean Slate, IP dinamico, regression testing da Fase 1, `MAX_HEALING_ATTEMPTS=1`) — (—)

**5 · Valutazione sperimentale** — *numeri in arrivo · 9-12 pp · il cap. più "accademico"*
1. Metodologia (dal "funziona" al "quanto") — 📚 Survey, AgentBoard
2. Dataset golden source — 📚 Test Oracle
3. Perturbazione P1-P4 + baseline gate — ⭐ Test Oracle (mutation)
4. I 4 benchmark (B1 riconoscimento · B2 RCA · B3 healing · B4 costi) — ⭐ Cybench, AgentBoard, SWE-Bench Pro
5. La questione statistica (*n* non indipendente) — ⭐ Test Oracle + feedback prof
6. Pizzeria ammiraglia (CS-3) — (—)
7. Confronto modelli (local vs cloud) — ⭐ Model+Scaffold (Cybench/AgentBoard)
8. Ablazione dei ruoli — 📚 MetaGPT, Cybench
9. Risultati e discussione — 📚 AgentBoard

**6 · Conclusioni e sviluppi futuri** — *per ultima · 3-4 pp*
1. Sintesi del contributo
2. Limiti onesti (`MAX_HEALING_ATTEMPTS=1`, *n*, dataset piccolo)
3. Sviluppi futuri (black-box · dataset statistico · healing locale)
4. Considerazioni finali — 📚 CoALA (la decomposizione resta valida)

**Appendici** — prompt integrali (Planner/Executor/Healer) · eventuale config modello · link repo GitHub

**Ordine di scrittura consigliato:** 3 → 4 → 2 → 5(metodologia) → 6 → 1 *(i numeri del Cap.5 dipendono dai benchmark; intro/conclusioni riassumono → per ultime)*.

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
- LangGraph State / working memory `[USATO]` — `VulcaTestState` TypedDict condiviso tra nodi dello StateGraph. → CoALA (working memory), LangGraph.
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

**PROSSIMA AZIONE quando si riparte:** Luca STA SCRIVENDO il Cap.3 in `...\ANNO 3\BOZZA SCRITTA\Capitolo 3.md` (a 3.3 al 2026-10-01). L'assistente fornisce **recall pack per nodo** (§9.4/9.5) e applica la **regola della quota** alle bozze. NON scrive prosa. Dettagli operativi completi in §9.

---

## 9. DETTAGLI DI STESURA (recall pack + regole operative, consolidati 2026-10-01)

### 9.1 Come scrivere UN nodo — template a 5 mosse
Ogni sotto-capitolo di nodo segue lo stesso stampo (è anche la cura all'"mi blocco, non so come si scrive"):
1. **Cosa fa** — 1 frase (il ruolo).
2. **La decisione di design + perché** — il cuore (quota 1, SEMPRE). *È la mossa che il relatore vuole: non "cosa fa" ma "perché l'ho progettato così".*
3. **Il come** — meccanismo a parole/schema, solo se l'insight non si capisce senza (quota 2).
4. **Quota codice** — snippet solo se È la decisione; altrimenti → GitHub/Appendice.
5. **Aggancio al nodo dopo** — 1 frase (la molla che apre il prossimo). *È così che si collegano i nodi senza salti.*

**Budget pagine per nodo (Cap.3):** apertura 1,5-2 · principi 1,5-2 · visione 1-1,5 · Planner 1-1,5 · Orchestratore 0,5-1 · **Executor 2-2,5** · Bridge 1,5-2 · Final Eval 1 · Diagnostician 0,5 · Robustezza 1,5-2 · Prompt eng 1-1,5 · **Modello 3-4**.

**Regola codice (mostra / non mostra):**
- **MOSTRA** (3-8 righe) solo se il codice è la decisione e si capisce a colpo d'occhio: schema `ChecklistItemResult` (`item`/`passed`/`evidence`), un `TestStep` in YAML, le 5 regole della costituzione healer.
- **NON MOSTRARE** (→ GitHub): `SPECIAL_KEYS_MAP`, polling del watchdog, regex del parser, loop di budget. Descrivi la *decisione* a parole.

### 9.2 Strutture dati — in contesto, non in un capitolo a parte
NON fare una sezione "strutture dati" prima dei nodi (diventa catalogo arido). Introduci ogni contratto al **nodo proprietario**: `TestStep`→Planner · `StepResult`/`ChecklistItemResult`→Executor · `ToolCallRecord`→Executor/Bridge (telemetria, ponte a B4) · `VulcaTestState`→Orchestratore. Mostra i campi solo dove *sono* la decisione (`TestStep`, `ChecklistItemResult`).
**Mossa opzionale forte:** una frase in 3.3 che nomina la decisione senza i campi — *"i nodi non si scambiano messaggi liberi ma contratti tipizzati (structured artifact handoff)"*. 📚 MetaGPT.

### 9.3 Citazioni — la regola dei 3 lavori
Una citazione guadagna il posto solo se fa UNO di: **① giustifica** una scelta · **② dà un nome/formalismo** · **③ fa da contrasto**. Altrimenti fuori (e dove non serve, scrivilo). Le citazioni **si concentrano** (Cap.3: §3.2/3.6/3.8/3.11; Cap.5 quasi tutto), non si spalmano. Mappa inline per capitolo in §5-BIS.
**Framing onesto (NON "derivati dai paper"):** i principi sono TUOI, la letteratura li *fonda a posteriori*. Verbi: pattern davvero usati → "riprende/adotta"; inquadrati dopo → "trova fondamento in/è inquadrabile come".
**Per-principio (3.2):** ① deterministic-where-possible → CoALA (LLM vs Code, scioglie "determinismo") · ② no-self-certification → SWE-Bench Pro (+ Constitutional AI) · ③ separation of concerns → CoALA modularità (+ MetaGPT) · ④ intercambiabilità → *nessuna, è tuo* · ⑤ plan+execute & react → ReAct + Prompt Report (Plan-and-Solve); contrasto Survey (planning senza feedback).

### 9.4 Gap analysis per nodo — cosa AGGIUNGERE a Call pasquale 2 (verificato su codice)
*(ciò che manca/è sotto-raccontato rispetto alla spiegazione già scritta in `Call/Call pasquale 2.md`)*
- **Planner:** gerarchia fonti STORYLINE>WRITEUP>DESCRIPTION · regole 5/6 del prompt ("Fedeltà Connettori Logici" + "Meccanismo di Scoperta" = fix CS-1, nasce da Pizzeria → collega a 3.1) · de-fence multi-blocco del parser (reverse shell listener/trigger/pty).
- **Orchestratore:** no-retry esplicito (retry ASSENTE, op-level non cablato — limite onesto) · gate AND come *meccanismo dell'oracolo*.
- **Executor ⭐ (buco più grosso):** **Auditor Mode** (§9.5) — del tutto assente in Call pasquale · origine "cheating agent" · **graceful nudge** (a −2 turni) · `evidence` OBBLIGATORIA per item (no-self-cert = struttura dati, [executor.py:112]) · regola state-awareness da incidente nano.
- **Bridge/Robustezza:** Terminal Gateway = demone REST FastAPI su Kali:8889 · il **secondo senso (percezione)**: pulizia ANSI/VT100, `session_last_line`, rilevamento password, tool auto-descriventi a runtime (`list_tools` inietta avvisi) · **watchdog DONE/IDLE/CAP/DEAD** (`wait_utils`: aspetta il silenzio, non un tempo fisso; marker `stop_pattern`) — assente · nano `\r` vs `^J`.
- **Final Evaluator:** il **Diagnostician rimosso** (l'RCA vive qui perché il nodo è stato tolto per goal drift) · campi `healing_ticket` (`defect_type`: IAC_GENERATION/CONFIG/SPECIFICATION, `blocking_step`, `affected_component`, `root_cause`).
- **Healing (Cap.4):** Heuristic Lead (report=sintomo) · 5ª regola (interpretazione restrittiva) · perimetro `out/` read-only · gate build echo-safe (marker `__BUILD_SUCCESS__`, no-deploy se assente) + IP dinamico post-rebuild · cicli stateless-ma-informati (no `--resume`, rilegge HEALING_REPORT/BUILD_ERROR) · delega agent-agnostic · limite `MAX_HEALING_ATTEMPTS=1`.

### 9.5 Recall pack Auditor Mode (il prompt dell'Executor — [executor.py:21-83])
Origine = **cheating agent** (il modello dichiarava successi senza provarli). È il no-self-certification reso prompt. Le 8 regole → raggruppale in **4 temi** (il prompt integrale va in Appendice, NON nel corpo):
- **A — l'auditor certifica, non aggiusta** (reg.1): solo in-band; vietato out-of-band (docker host); servizio rotto = difetto. 📚 Cybench (isolation).
- **B — giudizio vincolato: AND + evidenza ⭐** (reg.2+3): gate AND (un `false`→FAILED); "ESEGUI non dedurre"; simmetria dell'onere di prova (assenza di segnale ≠ fallimento). 📚 SWE-Bench Pro, Constitutional AI.
- **C — modello mentale del terminale** (reg.4+5+6): sessioni PTY vs one-shot; host awareness; TTY hygiene (nano, anti-flooding). *Queste regole nascono da fallimenti concreti → prova del "prompt eng come processo" (3.11).*
- **D — economia e chiusura** (reg.7+8): 1 tool = 1 turno; verified values; `request_turn_extension`; verdetto via `submit_step_result` (`checklist_evaluation` 1:1 con `evidence`).
Tool interni: `submit_step_result`, `request_turn_extension`, `show_verified_values`, `get_verified_value`.

### 9.6 Classificazione CoALA di VulcaTest (per 3.3/3.4)
**Verdetto:** singolo agente cognitivo di moduli · working memory (`VulcaTestState`) + procedural memory esplicita (il codice) · azioni interne (reasoning + retrieval two-stage) + grounding digitale esterno (`interactive_terminal_exec`) · decision-making **ReAct-like** · **privo** di memoria episodica/semantica e di apprendimento persistente. ⭐ La forza è dichiarare i limiti (CoALA descrive un sistema così come "ReAct-like, senza long-term memory né learning" — citalo).
**Due livelli di agente (non confonderli):** il *tester* (Planner+Executor+Final Evaluator, accoppiati) = **un** agente di moduli → Cap.3. Con l'**healer**, VulcaTest **delega** ad **Antigravity**, agente separato/autonomo/sostituibile (coupling debole) → **due agenti**, tema del Cap.4. In 3.4 resta nello scope tester.

### 9.7 Diagrammi — uno per capitolo
- **Cap.3 (3.3) = solo il tester.** TOGLI dal diagramma: nodo HEALER, arco FAILED→HEALER, HEALER→PATCH.DIFF, l'anello FIX→ORCHESTRATOR. TIENI `FINAL EVALUATOR → REPORT/RUNSUMMARY/HEALINGTICKET`: il `HEALINGTICKET.json` è il **gancio** (freccia tratteggiata "→ VulcaHealing Cap.4").
- **Cap.4 = il loop chiuso completo** (Healer→Antigravity→PATCH.DIFF→rebuild→FIX→re-test).
- **Note accuratezza:** i due "START" confondono (sono 2 modalità: genera-piano vs esegui-con-piano) → etichetta o semplifica · **MCP Bridge non è un nodo** del grafo (vive nell'Executor) e il **Planner è a monte** del grafo — dillo nel testo.
