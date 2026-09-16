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

## 📌 Casi di studio (episodi reali da raccontare in tesi)

### CS-1 — L'oracolo lasco: una checklist disgiuntiva che nascondeva un difetto (Pizzeria_B2R, 16/09/2026)

> **Perché vale come caso di studio.** Illustra un principio forte: *il collaudo è affidabile quanto il suo oracolo (la checklist)*. E mostra un ciclo di **miglioramento del prompt guidato da un fallimento osservato** — utile da raccontare proprio quando si spiega il `SYSTEM_PROMPT` del Planner (Cap. 2). Materiale ideale anche per il Cap. 4 come evidenza empirica.

**Cosa è successo.** La FASE_2 di Pizzeria passava con `SUCCESS` *pur mancando la chat di assistenza*, che nel design (STORYLINE/WRITEUP/CTFD) è il **meccanismo obbligatorio** con cui si scopre l'endpoint nascosto `/orari.php`. La macchina deployata non aveva la chat ed esponeva `/orari.php` con un **link diretto** in home.

**Perché passava — non è colpa dell'Executor.** L'Executor è stato *onesto*: ha persino cercato la chat e non l'ha trovata (log sotto), ma la checklist generata dal Planner conteneva una voce **disgiuntiva** che gli concedeva una via alternativa:

```
- [ ] È stata individuata la funzionalità di consultazione orari tramite la chat o l'interfaccia.
```

Quell'`o l'interfaccia` rende la voce soddisfacibile *aggirando* il percorso didattico previsto. Estratto del log (esecuzione poi stoppata a mano):

```
[Turno 2] curl -s http://172.17.0.2/ | grep -i -E "chat|assistenza|messag"
          → ⚠️ Command completed with errors   # nessun match: la chat NON c'è
[Turno 5] submit_step_result(status=SUCCESS ...)
   item "…tramite la chat o l'interfaccia" → passed=True
   evidence: '<li>🍕 <a href="orari.php">Consulta gli orari delle sedi</a></li>'
   # soddisfatto via LINK DIRETTO, non via chat → difetto invisibile, verde falso
```

**Diagnosi.** La leva è a monte (Planner), non l'Executor: il Planner *genera* l'`ATTACK_PLAN.md` dai documenti di design, e aveva **ammorbidito** una storyline rigida ("pannello nascosto svelato *tramite la chat*") in un generico "chat o interfaccia". Un OR *inventato* = una forma di allucinazione (una via che il design non autorizza).

**Intervento — miglioramento del `SYSTEM_PROMPT` del Planner.** Aggiunte due regole ai "Criteri di Qualità", *generiche* (non overfittate su Pizzeria): il metro resta sempre *"cosa dice il design"*, non *"quale parola è vietata"* — l'OR resta lecito per macchine che offrono davvero più vie valide.

- **Regola 5 — Fedeltà dei Connettori Logici (grounding delle congiunzioni):** la struttura logica della checklist deve rispecchiare quella del design, come già comandi/tool/porte. Alternative ammesse *solo* se i documenti prevedono esplicitamente più vie valide; mai introdurre alternative assenti.
- **Regola 6 — Fedeltà al Meccanismo di Scoperta:** risorsa descritta come *nascosta e rivelata tramite un'interazione specifica* (chat, parametro nascosto, trigger) ⇒ voce distinta che verifica la scoperta *tramite quel meccanismo*, senza scorciatoie dirette.

**Il punto concettuale (il "sugo").** Una macchina che **passa** il collaudo pur mancando una funzionalità prevista è il bug vero (oracolo rotto, falso verde) — molto più insidioso di un fallimento. Con la checklist severa il primo giro *deve* dare rosso su Pizzeria: ed è **corretto**, perché quel rosso onesto è esattamente il trigger che innesca il self-healing (checklist severa → Executor fallisce "manca la chat" → healer aggiunge la chat → stessa checklist ora passa). Collega Cap. 2 (oracolo/Planner) → Cap. 3 (healing) → Cap. 4 (evidenza).

**Domanda aperta di scrittura.** *Ha senso includere i prompt usati nella tesi?* Ipotesi: sì, ma con misura — nel corpo del testo le regole 5/6 come *estratto motivato* (esempio di design dell'oracolo e di prompt engineering iterativo), il `SYSTEM_PROMPT` integrale del Planner in **appendice**. Il "prima/dopo" della checklist di FASE_2 è una figura efficace.

### CS-2 — Il falso-positivo da *terminal echo*: quando la sentinella matcha sé stessa (16/09/2026)

> **Perché vale come caso di studio.** È un bug di *infrastruttura del loop* (non del modello), sottile e istruttivo, con un colpo di scena metodologico: era il **vero root cause** dietro un sintomo che avevamo prima diagnosticato male. Materiale per il Cap. 2/3 (architettura client-server Executor↔Terminal Gateway) e come esempio onesto di *debugging di un sistema agentico*.

**Il sintomo.** Nel primo ciclo di healing di Pizzeria l'healer lavorava bene (patch reale, `out/` rigenerati), ma la ricompilazione Docker risultava **durata ≈0 secondi** (di solito 3-4 minuti), il container restava quello **vecchio**, eppure i file `out/` su Kali erano **aggiornati**.

**Il meccanismo.** Il rebuild gira sul Terminal Gateway (PTY su Kali) e il completamento è rilevato via *sentinella*:

```bash
docker build -t pizzeria . && echo __BUILD_SUCCESS__ || echo __BUILD_FAILED__
```

con attesa fino a comparsa di `__BUILD_SUCCESS__` / `__BUILD_FAILED__`. Ma una shell su PTY fa l'**echo del comando** appena lo riceve: la prima riga letta è il comando stesso, che contiene *testualmente* entrambi i marker. La sentinella matcha **sé stessa** al primo giro (~0.3s) → uscita immediata con "successo" → il deploy (`docker run`) parte mentre il `docker build` vero è appena iniziato in background → **container dalla vecchia immagine**; `out/` aggiornati perché il generatore gira su Windows *prima* del build.

**Il colpo di scena metodologico.** Avevamo attribuito il "fix che non arriva al container" a un **timeout di build troppo corto** (180s) e introdotto un *idle-watchdog* adattivo. Giusto in sé, ma **non era quello** il root cause: anche il watchdog "completava" subito sull'echo. La vera causa era il falso match della sentinella. Lezione da raccontare: in un sistema agentico che pilota una shell reale, i confini *out-of-band* (echo del PTY, buffering, sessioni parallele) sono fonti di bug sottili quanto il modello — e vanno isolati con lo stesso rigore.

**Il fix (minimo).** Spezzare il token nel comando con concatenazione di stringhe quotate — `echo "__BUILD""_""SUCCESS__"` stampa `__BUILD_SUCCESS__`, ma il testo del comando (quindi l'echo) contiene `__BUILD""_""SUCCESS__`, che non matcha il marker contiguo. Il marker pulito compare **solo** all'esecuzione reale dell'`echo`, cioè a build concluso. Due righe, logica invariata.

**Aggancio agli altri contributi.** Questo episodio dà valore al *gate* di CS-anteriore (deploy solo su `__BUILD_SUCCESS__`) e all'iniezione dell'errore di build nel prompt dell'healer: pezzi di robustezza del **loop di rebuild** che, insieme, rendono il self-healing affidabile end-to-end. Bel filo per il Cap. 3: *"il self-healing non falliva per incapacità del modello, ma per fragilità d'infrastruttura nel loop"*.

---

## 🧭 Note trasversali (promemoria da tenere a mente scrivendo)

- **Software finito ≠ tesi finita.** Cap. 2–3 descrivono un sistema *già esistente* (presente, con sicurezza); Cap. 4 descrive lavoro *ancora da produrre* post-call (passato).
- **Regola anti-duplicazione modelli:** Cap. 3 zero numeri (solo scelte e motivazioni); Cap. 4 zero ri-descrizioni degli agenti (solo misure e interpretazione).
- **Curse of knowledge sull'healing:** ciò che mi sembra banale ("do un prompt e ripara") è in realtà il contributo — sono ~7 decisioni di design motivate.

---

## 📎 Da consolidare più avanti

- `ORGANIZZAZIONE TESI.md` (vecchio dump idee): contiene materiale ancora valido da travasare qui — negative testing matrix, categorie di metriche/KPI, MTTR. Attenzione: cita cose datate (Diagnostician, caso Pizzeria orari.php) da NON riprendere pari pari.
- `TESI.md`: contiene già questa tabella; una volta consolidato qui, archiviare per evitare doppioni.
