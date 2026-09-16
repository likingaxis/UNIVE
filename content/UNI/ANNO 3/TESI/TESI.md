### STRUTTURA DATI TESI
Ecco una tabella pensata proprio per essere mostrata a Pasquale: comunica l'arco narrativo, cosa dimostra ogni capitolo e come si distribuisce il lavoro. Ho aggiunto una stima di pagine (per centrare le 30–40) e la _natura_ di ogni capitolo, che chiarisce subito cosa è già fatto e cosa è da produrre.

|Cap|Titolo|Obiettivo (cosa dimostra)|Contenuti chiave|Pagine|Natura|
|---|---|---|---|---|---|
|**1**|**Introduzione e contesto**|Inquadra il problema e posiziona il _tuo_ contributo dentro VulcAIn|Dominio didattico CTF/B2R; cos'è un workflow agentico e un agente LLM (livello funzionale); il problema: garantire conformità e auto-riparazione delle macchine generate; obiettivi e struttura della tesi|5–7|Discorsivo|
|**2**|**Architettura e scelte di design**|Che hai _progettato_ un sistema, con decisioni motivate — non solo scritto codice|Pipeline VulcAIn (Mind→Forge→Deploy→Test⇄Healing) e dove sta il tuo lavoro; separazione a 3 ruoli (Planner→Executor→Evaluator) e il _perché_ (no context bleeding / no cheating); il loop LangGraph del White-Box; rimozione del Diagnostician per il Goal Drift → RCA post-mortem nell'Evaluator; ruolo di Planner ed Evaluator|8–10|Presente (sistema esistente)|
|**3**|**Gli agenti operativi: esecuzione e riparazione**|Come il sistema _agisce_ nel concreto, il cuore tecnico e più originale|**Executor** in dettaglio: Auditor Mode, tool-use via MCP/Terminal Gateway, budget dinamico, gestione evidenze. **Self-healing**: Antigravity CLI headless; asimmetria di contesto (report = indizio, non specifica); _valorizzato_ → Minima Riparazione + Fedeltà all'Intento + No-Leak (riparare ≠ far passare il test su un artefatto didattico); _citati brevemente_ → snapshot/diff, chat stateless, ri-risoluzione IP, storico healing. **Panoramica modelli** (breve, a priori): triade + modello dell'Healer, gestione context window, ipotesi local-vs-cloud|8–11|Presente (design + implementazione)|
|**4**|**Valutazione sperimentale**|Che il sistema _funziona davvero e quanto_ — il contributo scientifico|Metodologia di benchmark; assi e metriche (conformità/RCA, qualità dell'healing, efficienza di contesto, confronto modelli); macchine di test; risultati; **confronto empirico modelli** (local vs cloud, Qwen 3.8 vs altri) che conferma/smentisce le ipotesi del cap. 3; discussione|7–10|Passato (esperimenti condotti)|
|**5**|**Conclusioni e sviluppi futuri**|Tira le somme e apre|Sintesi del contributo; limiti; sviluppi futuri: modulo **black-box**, usi oltre il testing di macchine vulnerabili; considerazioni finali|3–4|Chiusura|

**Filo narrativo che comunica al professore:** problema → _come l'ho progettato_ → _come agisce nel concreto_ → _quanto funziona davvero_ → _dove può andare_.

Due note che puoi tenere a mente (non necessariamente in tabella per lui):

- I cap. 2–3 descrivono un sistema **già esistente** (scrivi con sicurezza, al presente); il cap. 4 descrive lavoro **ancora da produrre** post-call. È la distinzione "software finito ≠ tesi finita" di prima.
- La regola anti-duplicazione modelli: cap. 3 zero numeri, cap. 4 zero ri-descrizioni.

Vuoi che la salvi da qualche parte (es. un file `struttura_tesi.md` accanto a `call pasquale.md`), o la lasciamo qui per ora e la rifiniamo ancora a voce?

