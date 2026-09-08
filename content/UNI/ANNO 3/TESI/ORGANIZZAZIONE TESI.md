
1. fatto
2. fatto
3. domani


### 1. Testing di tutto il grafo (Negative vs Golden Path)
* **Dove siamo ora:** Abbiamo convalidato empiricamente il ramo di **Negative Testing** (`FASE_1 [PASS]` $\rightarrow$ `FASE_2 [FAIL]` $\rightarrow$ `Evaluator [RCA + Ticket]`). Questo ramo dimostra che l'Auditor non bara ed è fondamentale.
* **Cosa manca per "tutto il grafo":** Il **Golden Path completo** (cioè una run in cui tutti gli step da 1 a 10 vanno a buon fine fino alla root shell e al flag finale, terminando con `Orchestrator [COMPLETED]` $\rightarrow$ `Evaluator [CONFORME]`).
* **Come affrontarlo:** 
  - Se allineiamo l'Attack Plan alla realtà della macchina (l'Opzione A descritta dal report, dove `FASE_2` verifica il link `orari.php` anziché cercare la chat inesistente), possiamo finalmente vedere l'Executor scendere in profondità: LFI $\rightarrow$ estrazione credenziali $\rightarrow$ SSH login $\rightarrow$ privilege escalation via sudo nano $\rightarrow$ flag root.
  - **Valore per la tesi:** Mostrare alla commissione **entrambi i percorsi**: la macchina quando ha un difetto (si ferma e produce il ticket) e la macchina corretta (esegue tutti gli exploit previsti dalla didattica).

---

### 2 & 3. Semplificare il codice, studiarlo e "fare propri i commenti"
Questa è **la scelta più intelligente in assoluto** per la discussione di laurea:
* **Perché è cruciale:** Quando il codice viene generato o assistito da LLM (Claude, GPT, ecc.), si accumula spesso *boilerplate difensivo*, funzioni ridondanti e commenti generici. Se in sede di laurea un professore ti chiede: *"Perché a riga 185 c'è questo dizionario?"* oppure *"Come gestisci la concorrenza dello state?"*, devi saper rispondere in un decimo di secondo.
* **La tecnica di "cancellare i commenti e riscriverli tuoi":**
  - È un esercizio cognitivo potentissimo: per commentare una riga con parole tue devi averla capita al 100%.
  - Ti permette di fare **refactoring spontaneo**: mentre rileggi, ti accorgerai subito di parti che si possono scrivere in 3 righe invece di 10.
  - Rende lo stile del codice omogeneo e conforme a quello che scriverai nei capitoli della tesi.

---

### 4. Creare una lista solida di errori (Negative Testing Matrix)
* **Cosa significa scientificamente:** Per dimostrare che VulcaTest funziona, non basta dire *"rileva gli errori"*, serve una **Ground Truth Matrix**:
  | ID Test | Componente | Difetto Iniettato | Comportamento Atteso | Comportamento Reale | RCA Corretta? |
  | :--- | :--- | :--- | :--- | :--- | :---: |
  | `NT-NET-01` | Rete/Docker | Porta 80 chiusa | FASE_1 FAIL | FASE_1 FAIL | ✅ NETWORK_FAILURE |
  | `NT-WEB-02` | Web/Nginx | 502 Bad Gateway | FASE_2 FAIL | FASE_2 FAIL | ✅ CONFIG_DEFECT |
  | `NT-AUTH-01` | SSH | Password errata in config | FASE_4 FAIL | FASE_4 FAIL | ✅ AUTH_DEFECT |
  | `NT-PRIV-01` | OS/Sudoers | Sudoers mancante per nano | FASE_8 FAIL | FASE_8 FAIL | ✅ PRIV_DEFECT |
* **Perché farlo:** Nel capitolo dei risultati sperimentali della tesi, una tabella del genere con **Precision, Recall e F1-Score della RCA** lascia la commissione a bocca aperta.

---

### 5. Lavorare sulle metriche (I KPI di Tesi)
Abbiamo già un ottimo punto di partenza in `run_summary.json`. Vale la pena formalizzare 3 categorie di metriche:
1. **Metriche di Efficacia Didattica:**
   - *Step Completion Rate (SCR)*: $\frac{\text{Step Superati}}{\text{Step Totali}} \times 100$.
   - *RCA Accuracy*: Il modello locale ha isolato il file giusto e la causa giusta?
2. **Metriche di Efficienza Operativa:**
   - *Turn Consumption Ratio*: Quanti turni ha consumato l'Executor rispetto al budget (es. 2/6 in FASE_1 vs 6/6 in FASE_2).
   - *Network Time vs LLM Time*: Nel nostro run di prima, su 81s totali, solo 7.65s erano di rete; i restanti ~74s erano inferenza locale e model-switch. Questo è un dato di benchmark preziosissimo.
3. **Metriche Economico/Infrastrutturali:**
   - Costo a run (€ 0.00 con la pipeline full local).
   - VRAM occupancy e switch latency (~10s).

---

### 6. Il Bivio: Self-Healing o Black-Box?
Qui la risposta strategica è netta: **SELF-HEALING (a mani basse).**

* **Perché il Self-Healing vince:**
  1. **Chiude il cerchio (Closed Feedback Loop):** È il cuore del titolo della tua tesi. Se ti fermi al report, VulcaTest è "solo" uno scanner avanzato. Se il report/ticket viene ingerito per auto-riparare il playbook Ansible o il file sorgente e re-innescare il test fino al `[PASS]`, hai creato un **sistema autonomo a feedback chiuso**.
  2. **È deterministico e misurabile:** Puoi calcolare la metrica accademica regina: il **MTTR (Mean Time To Repair)** e il tasso di successo dell'autoriparazione.
* **Perché rimandare il Black-Box:**
  - Il Black-Box (agente che fa pentest "cieco" cercando scorciatoie) è stocastico, molto rumoroso, consuma una quantità enorme di token e spesso si perde se il container ha problemi di base.
  - Può essere trattato come **"Estensione / Lavoro Futuro"** o come un capitolo secondario se avanza tempo.

---

### 7. Trasformare in Python la parte di generazione delle macchine (VulcaForge)?
Attenzione qui a distinguere due livelli per non finire in un pozzo senza fondo di tempo:

* **COSA NON RIFARE:** **Non riscrivere Ansible in Python**. Ansible è lo standard industriale per configurare Linux, utenti, permessi e pacchetti. Riscrivere comandi di provisioning in script Python puri sarebbe una regressione tecnica e una perdita di mesi di lavoro.
* **COSA HA MOLTO SENSO PORTARE IN PYTHON:**
  - **L'Orchestratore di VulcaForge (The Generator Engine):** Se la parte che legge i manifesti YAML, seleziona i moduli dal registry, renderizza i template Jinja2 e avvia `docker compose build` è composta da script bash frammentati, riscrivere **quello strato di orchestrazione** in una classe Python pulita (es. `VulcaForgeEngine`) con Pydantic e subprocess ha un valore immenso.
  - In questo modo, l'agente di **Self-Healing** potrà fare semplicemente:
    ```python
    engine = VulcaForgeEngine(challenge_dir)
    engine.apply_patch(healing_ticket)
    engine.rebuild_and_deploy()
    vulcatest.run()
    ```
  - Questo renderebbe l'integrazione tra VulcaForge e VulcaTest un'unica suite Python elegante e coesa.

---

### Sintesi: L'Ordine di Lavoro Ideale Consigliato

Se dovessimo ordinare questi passaggi in modo che ogni step abiliti il successivo senza farti sprecare tempo:

1. **Studio & Pulizia Codice (Punti 2 e 3):** Rileggi `vulcatest/white-box`, togli il codice superfluo, riscrivi i commenti con parole tue per cementare la padronanza.
2. **Golden Path Test (Punto 1):** Allinea la FASE_2 (o correggi il target) per vedere l'intera catena di 10 step arrivare a `root` e `[CONFORME]`.
3. **Formalizzazione Metriche & Matrice Errori (Punti 4 e 5):** Definisci i test di rottura controllata per avere i dati sperimentali.
4. **Self-Healing Loop (Punti 6 e 7):** Crea il ponte tra `healing_ticket.json` e la riparazione del template in VulcaForge.
5. **Black-Box:** Solo se rimane tempo prima della scrittura finale della tesi.