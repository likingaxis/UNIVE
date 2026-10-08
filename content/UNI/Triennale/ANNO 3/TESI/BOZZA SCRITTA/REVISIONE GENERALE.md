# Revisione generale Cap. 2–4 (prima di Cap. 5 e Cap. 1)

Lista di lavoro unica: osservazioni dell'assistente approvate + note scritte a mano di Luca (da aggiungere man mano). Ordine: sostanza → coerenza tra capitoli → forma. Le modifiche si applicano a blocchi, con proposta in chat prima di scrivere nel `.md`.

## Decisioni prese (7/10/2026)

- **Valore del lavoro:** distinguere in modo esplicito le componenti sviluppate in questo lavoro dagli strumenti esterni integrati (HexStrike, LangGraph, Antigravity, llama.cpp, Unsloth…). Niente tabella LLM/codice, niente aneddoti aggiuntivi (si evita l'effetto "lista di esperimenti").
- **Cap. 4:** anticipare nell'introduzione che l'agente di healing è intercambiabile e che il contributo è il ciclo di controllo attorno (perimetro, snapshot, diff, rollback, feedback, regression test).
- **Valori di configurazione del §3.10.2:** nel Cap. 3 restano formule e simboli; i valori di default e l'hardware vanno nel §5.4.
- **Stadi di Planner e Final Evaluator:** in entrambe le sezioni come elenco puntato con etichetta (`- **Stadio 1:** …`).
- **Docker:** alla fase di test basta l'IP del target. Docker serve solo alla ricostruzione nel nodo di healing (le impostazioni di build si possono disattivare).

## Da applicare

### Cap. 2
- [x] §2.3 — chiarire VulcaShip vs Docker: VulcaShip fa il deploy su un'infrastruttura di virtualizzazione (Proxmox); in questo lavoro le macchine sono eseguite come container Docker, in modo indipendente da VulcaShip. Alla fase di test basta una macchina raggiungibile tramite IP, Docker serve solo alla ricostruzione del nodo di healing.
- [x] §2.1–2.5 e introduzione riscritti con le note di Luca (7/10). Resta aperta solo la fonte VulcAIn dai tutor.

### Cap. 3
- [x] §3.2 principio 3 — rimando alla Sezione 2.4 (MetaGPT) per l'impostazione role-based.
- [x] §3.3 — togliere "Prima di descrivere l'architettura nel dettaglio, è utile inquadrare…"; fondere il paragrafo CoALA con la riga su `VulcaTestState`.
- [x] §3.3 — distinguere componenti sviluppate e strumenti integrati (frase e/o figura).
- [x] §3.8 — stadi come lista `- **Stadio 1:** …` (§3.4 già fatto).
- [x] §3.8 — "Infrastructure as Code" → IaC (acronimo già definito nel Cap. 2).
- [x] §3.8 — `SPECIFICATION_DEFECT`: togliere "la macchina è conforme". Comportamento reale: il nodo di healing parte comunque, l'agente chiude con `DECLINED` senza patch, il controller salta rebuild e re-test e la run termina (coerente con §4.5).
- [x] §3.10.2 — tolti i valori di default (8/10).
- [x] §3.10 apertura — non ripetere il motivo del modello locale, ora dichiarato nel §3.1 ("Il modello locale usato da Planner, Executor e Final Evaluator è stato configurato…").
- [x] §3.9–3.10 ritocchi mirati (8/10).
- [x] §3.7 ritocchi di forma e §3.8 riscritto (8/10).
- [x] §3.4–3.6 riscritti (8/10). Aggiunta nota [^pydantic] nel §3.3 e fonte `pydantic` in FONTI.md e references.bib.
- [x] Introduzione e §3.1–3.3 riscritti (7/10). Ricordare: il testo nuovo usa l'apostrofo ' (uniformare nella passata finale).

- [ ] Figura 3.1 — distinguere con colore o bordo diverso le componenti sviluppate nella tesi (Planner, parser, Orchestrator, Executor, Bridge, Terminal Gateway, Final Evaluator, nodo di healing) dagli strumenti esterni (LangGraph, HexStrike, runtime del modello locale, Antigravity), con legenda. Aggiornare la didascalia.
- [ ] (Facoltativa, se resta tempo) Nuova figura nel §3.6 — ciclo di uno step: agente, Executor, Bridge e target, fino a `submit_step_result` e al ricalcolo dello `status` (da disegnare su Excalidraw).

### Cap. 4
- [x] Cap. 4 completato (8/10): intro con Figura 4.1 segnaposto, §4.1–4.3, §4.4 etichette e perimetro come istruzione del prompt, §4.5 motivazione del controllo sul perimetro.
- [x] Introduzione — "Infrastructure as Code" → IaC; anticipare il ruolo del ciclo di controllo rispetto all'agente.
- [x] §4.1 — il nodo di healing lavora sulla ricetta IaC e sugli eventuali sorgenti applicativi dedicati, non su playbook e Dockerfile (generati da VulcaForge in `out/<nome>` e rigenerati a ogni ricostruzione, coerente con §4.4).

- [x] §4.2 — (ridotto a rimando, il concetto è ora nel §3.8) aggiungere in chiusura: la classificazione del Final Evaluator (solo evidenze in-band) è un'ipotesi; il ticket arriva al nodo di healing anche con `SPECIFICATION_DEFECT` e l'agente la conferma sui sorgenti (out-of-band); se non trova difetti chiude senza modifiche (→ §4.5).

### Cap. 1 (da ricordare in stesura)
- [ ] §1.2 — dichiarare il contributo come mechanism engineering (oltre al prompt engineering): non si addestra un nuovo modello, si progetta l'harness che ne controlla l'esecuzione.

### Cap. 5 (da ricordare in stesura)
- [ ] §5.4 — valori di default tolti dal §3.10.2: k = 3, α = 1,15, R_out = 8192 (Planner) / 4096 (Final Evaluator), S = 2048, W_base = 15.872, W_max = 40.960 token. Riportare anche l'hardware (GPU 16 GB VRAM, 64 GB RAM), che resta citato anche nel §3.10.1.

### Cap. 6 (da ricordare in stesura)
- [ ] Sviluppi futuri: ricerca degli unintended path con VulcaTest black-box (richiamata nel §2.2).

### Passata finale di forma (tutti i capitoli)
- [x] Apostrofi uniformi: tutti `'` (8/10).
- [x] Controllo terminologia, rimandi, citazioni (8/10): aggiunte le citazioni di LangGraph, HexStrike, llama.cpp, Unsloth e Antigravity alla prima occorrenza nel §3.3.
- [x] Porting nel `.tex` di Cap. 2, 3 e 4 e confronto frase per frase (8/10). Figure con `[H]`, Figura 4.1 in `images/healing_loop.png`, `parskip` con spazio ridotto a 6pt.

## Domande aperte

## Note scritte a mano di Luca (inserite nei .md come `commento` / ``commento``)

Lette il 7/10. Esito proposto dall'assistente (✔ d'accordo, ~ d'accordo con modifiche, ✘ proposta alternativa). Da confermare in chat.

### Regole generali nate dalle note
- Ritmo: unire le frasi legate da causa/conseguenza, tenere brevi quelle con idee distinte (no testo "a singhiozzo").
- Paragrafi: unire i paragrafi di una o due frasi che continuano lo stesso discorso. Valutare nel .tex l'eliminazione di `parskip` (rientro invece di spazio tra paragrafi).
- Liste: frasi complete con maiuscola e punto finale; voci con etichetta nella forma **Etichetta:** testo; mai `;`.
- Figure: subito dopo il paragrafo che le cita, richiamate nel testo ("Figura 3.x"); nel .tex posizione fissa `[H]`.

### Cap. 2
- ✔ intro più scorrevole, con soggetto · ✔ "il vantaggio è quello di avere…, ripristinabile" · ✔ spiegare exploitation · ~ "Le macchine generate da VulcAIn…" spostata a inizio paragrafo B2R invece che tolta · ~ intended path ("non è quasi mai l'unica soluzione") · ✔ collegare i paragrafi su requisito/conformità e riscrivere "per un'altra strada" · ✔ "per poi procedere con la verifica" · ~ "invalidare" → "rendere impraticabile" · ✔ §2.3 "in questa pipeline", "solo", "i problemi" · ✔ togliere "(Capitoli 3 e 4)" · ✔ riorganizzare il paragrafo VulcaTest/VulcaShip/Docker · ✔ LLM "…(LLM), modelli addestrati…" · ✔ CoALA ciclo decisionale · ✔ riscrivere il blocco ReAct/CoT · ✔ frase MetaGPT · ✔ prompt engineering + mechanism engineering (contributo principale sul secondo)

### Cap. 3
- ✔ intro senza ripetizione · ✔ §3.1 togliere la prima frase · ✔ cite Antigravity subito dopo il nome · ✔ limiti dei modelli di frontiera senza ripetizione (lista con etichette) · ✔ "codice deterministico" è corretto · ✔ §3.3 unire paragrafi CoALA/VulcaTestState/strutture dati · ✔ figure · ~ usare solo "step" per le unità del piano ("fase" resta per le fasi del workflow) e togliere la definizione fase=step · ✔ stadi del Planner come lista · ~ motivazione YAML (da confermare) · ✔ telemetria → metriche · ✔ §3.6 separare in apertura nodo Python e agente · ✔ unire paragrafi del budget · ✔ `status` tra i campi dello StepResult · ? human in the loop per SPECIFICATION_DEFECT (da chiarire) · ✔ §3.9 più fluido · ✔ §3.10 rimando che nomina i motivi · ✔ §3.10.2 più fluido (insieme alla rimozione dei default) · ✔ togliere `;` (nota specdec, lista §3.7)

### Cap. 4
- ✔ schema Excalidraw del ciclo (test → diagnosi → healing → rebuild → re-test) · ✔ punteggiatura liste · ✘ "fase di attacco" → meglio "fase di test" (coerente con il resto della tesi) · ✔ §4.5 spiegare che il perimetro nel prompt è solo un'istruzione (l'agente ha permessi di scrittura sul workspace) + caso GitPoison/Citadel in 1–2 frasi; adeguare il §4.4 ("il prompt consente di scrivere soltanto…")
