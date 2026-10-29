# VulcaTest — Copione per la simulazione

## BLOCCO 1 — Contesto e problema

**Tempo obiettivo: 4:15–4:30**

### 1. Presentazione

- Saluto, nome e titolo della tesi.
- Passaggio diretto alla definizione dei Cyber Range.

### 2. Cyber Range

- **Ambienti informatici controllati** che riproducono scenari di cybersecurity.
- Permettono esercitazioni pratiche in condizioni di sicurezza.
- Tre caratteristiche sulla slide: **isolamento, realismo e finalità didattiche**.

**Non approfondire ogni caratteristica separatamente.**

### 3. Macchine Boot-to-Root

- Una tipologia di esercitazione è rappresentata dalle macchine Boot-to-Root.
- Sono macchine con **vulnerabilità intenzionali** che il partecipante deve individuare e sfruttare.
- Obiettivo finale: **ottenere i privilegi di root**.
- Macchine realizzate da progettisti e affrontate dai partecipanti.

### 4. Intended Path

- Il progettista non definisce soltanto l'obiettivo finale, ma anche il **percorso didattico previsto**.
- Il percorso è formato da step, ciascuno con determinati obiettivi formativi.
- Questo percorso prende il nome di _Intended Path_.

### 5. Realizzazione di una macchina Boot-to-Root

- Quattro fasi: **progettazione, sviluppo, distribuzione e testing**.
- Il processo richiede tempo e competenze.

### 6. VulcAIn

- Progetto preesistente del **CNIT NAM LAB**.
- **Workflow agentico** che automatizza progettazione, sviluppo e distribuzione.
- Parte da una descrizione fornita dal progettista e genera la macchina vulnerabile.

### 7. Esempio Pizzeria

- Macchina generata personalmente utilizzando VulcAIn.
- Il prompt richiedeva un'interfaccia web con una **chat di assistenza**.
- La chat era necessaria per il percorso didattico.

### 8. Il difetto di Pizzeria

- La macchina era stata generata e risultava accessibile.
- L'interfaccia web, però, **non presentava la chat richiesta**.
- Questa mancanza comprometteva l'Intended Path previsto.

### 9. Il problema e VulcaTest

- Rimangono necessarie **verifica manuale e correzione manuale**.
- Il ciclo si ripete finché la macchina non è conforme.
- **Da qui nasce VulcaTest: automatizzare queste ultime due fasi.**

---

## BLOCCO 2 — LLM, harness e scelte progettuali

**Tempo obiettivo: 2:15**

### Due problemi per automatizzare la verifica

- Serve qualcosa che **interpreti gli output della macchina** e decida come proseguire.
- Serve anche qualcosa che **interagisca con la macchina**, eseguendo comandi e raccogliendo risultati.

### LLM e harness

- Gli LLM permettono di interpretare il testo e decidere le operazioni successive.
- Da soli, però, generano testo: per agire sull'ambiente servono strumenti esterni.
- L'harness fornisce proprio gli **strumenti e il codice** necessari all'interazione.

### Harness general-purpose e specializzato

- Esistono **harness general-purpose**, come Codex e Claude Code, progettati per attività molto diverse.
- Questa flessibilità è utile nel problem solving.
- **Nel nostro caso, però, non vogliamo semplicemente risolvere la challenge, ma verificare uno specifico percorso didattico.**
- Affidare questo vincolo soltanto alle istruzioni del modello può lasciare spazio a deviazioni.
- Ho quindi sviluppato un **harness specializzato** che introduce controlli direttamente nel codice.

**Messaggio centrale:** l'agente deve poter scegliere come eseguire uno step, ma non decidere liberamente quali step saltare o quando avanzare.

### Nuova slide — Modello locale

- Per il testing ho scelto un **modello locale**: **Qwen 3.8 27B**.
- Questa scelta permette un maggiore controllo sulla configurazione del modello, comprese le restrizioni operative.
- Permette inoltre di eseguire la verifica su un **computer domestico**, senza dipendere da un servizio cloud per l'inferenza.

**Non approfondire hardware e prestazioni: torneranno nella slide sui tempi.**

---

## BLOCCO 3 — Architettura e implementazione

**Tempo obiettivo: 3:30–4:00**

### Architettura generale

- VulcaTest comprende **Planner, Executor, Final Evaluator e nodo di healing**.
- Planner: prepara il percorso.
- Executor: esegue gli step sulla macchina.
- Final Evaluator: analizza gli esiti.
- Healing: tenta di correggere i difetti.
- L'Orchestrator coordina il processo.

**Non spiegare subito il funzionamento interno: le slide successive servono proprio a questo.**

### Planner

- Parte dai documenti della challenge.
- Un LLM genera l'**Attack Plan in Markdown**.
- Il parser lo trasforma in **oggetti TestStep**.
- Ogni TestStep contiene tre elementi:
    - **Obiettivo da raggiungere**.
    - **Tool consentiti**.
    - **Checklist delle condizioni da verificare**.

### Executor e Orchestrator

- L'Executor contiene un agente LLM che segue il **ciclo ReAct**.
- **Ragiona → Agisce → Osserva**, ripetendo il ciclo per completare lo step.
- La sua autonomia è limitata dal codice:
    - **Numero massimo di turni**.
    - **Tool disponibili per lo step**.
- L'Orchestrator invia **un TestStep alla volta** e governa l'avanzamento.
- L'Executor restituisce **esito, checklist ed evidenze**.

**Messaggio centrale:** l'LLM decide come svolgere lo step; il codice controlla l'avanzamento del piano.

### Bridge e Terminal Gateway

- L'Executor interagisce con la macchina mediante chiamate ai tool.
- Un Bridge collega l'Executor ai server che forniscono questi strumenti.
- **HexStrike** offre strumenti senza sessioni persistenti.
- Ho sviluppato un **Terminal Gateway** per aggiungere **sessioni shell persistenti**.
- L'architettura permette di integrare ulteriori strumenti in futuro.

### Final Evaluator

- Riceve gli esiti e le evidenze raccolte durante la verifica.
- Produce un **report** che interpreta i risultati.
- In caso di fallimento, genera anche un **ticket** contenente un'ipotesi sulla causa del problema.
- Il **ticket** servirà al nodo di healing.

**Attenzione:** il Final Evaluator interpreta gli esiti, ma non modifica il risultato determinato dal processo di verifica.

---

## BLOCCO 4 — Healing

**Tempo obiettivo: 1:45–2:00**

### Nodo di healing

- Riceve il **ticket** e il **report** della verifica.
- Utilizza **Google Antigravity** per analizzare e modificare i sorgenti.
- Ho implementato un controller che introduce controlli esterni:
    - **Limite al numero di tentativi**.
    - **Tracciamento delle modifiche**.
    - Controlli sul **perimetro dei file autorizzati**.
- Dopo una correzione proposta, la macchina viene **ricostruita e ritestata**.

### Testing e healing: obiettivi differenti

- Il testing deve essere **agnostico rispetto all'implementazione**.
- Deve interagire con la macchina attraverso i **servizi esposti**, come farebbe un partecipante.
- L'healing, invece, deve **conoscere l'implementazione** per analizzare e correggere sorgenti e configurazioni.
- **Per questo nel testing ho scelto un harness specializzato, mentre nell'healing è utile la maggiore flessibilità operativa di un harness general-purpose.**

### Pizzeria dopo la correzione

- Riprendiamo l'esempio iniziale.
- Dopo verifica e correzione, la **chat di assistenza** risulta presente.
- È un esempio concreto del ciclo di VulcaTest.

---

## BLOCCO 5 — Metodologia sperimentale

**Tempo obiettivo: 2:15–2:30**

### Tre domande per la valutazione

- Quanto funziona bene il Planner?
- Quanto funziona bene la verifica?
- Quanto funziona bene la correzione?

A ciascuna domanda corrisponde un esperimento.

### Golden Machine

- Le macchine generate sono state analizzate e corrette manualmente.
- Sono state ottenute **otto Golden Machine**.
- Si tratta di macchine di riferimento il cui Intended Path è stato verificato.

### Perturbazioni

- Sulle Golden Machine sono stati introdotti difetti controllati.
- In totale, **15 perturbazioni**.
- Tre categorie:
    - **P1:** rimozione di risorse necessarie.
    - **P2:** alterazione di valori o configurazioni.
    - **P3:** introduzione di scorciatoie non previste.

### Tre esperimenti

- **E1:** viene generato un nuovo Attack Plan, per studiare il comportamento del Planner.
- **E2:** si utilizza un Attack Plan fisso, per valutare la capacità di segnalare difetti.
- **E3:** si attiva l'healing, per valutare le correzioni prodotte.

---

## BLOCCO 6 — Risultati sperimentali

**Tempo obiettivo: 2:45–3:00**

### E1 — Planner

- **24 esecuzioni complessive**.
- **20 completate: 83,3%**.
- Ma **22 piani su 24** erano coerenti con il percorso previsto.
- Quindi non tutti gli arresti dipendono da un errore del Planner.

### E2 — Verifica dei difetti

- Confrontiamo esecuzioni perturbate e Golden Machine.
- Consideriamo una segnalazione quando viene emesso un **ticket**.
- Delle **40 esecuzioni perturbate, 38** sono state segnalate.
- Sulle **24 esecuzioni Golden** si è verificato **un solo falso allarme**.

**Recall — 95%:** quante esecuzioni perturbate vengono effettivamente segnalate.

**Precision — 97,4%:** quante segnalazioni riguardano effettivamente esecuzioni perturbate.

**F1-score — 96,2%:** sintetizza precision e recall.

**Attenzione:** misuriamo l'emissione del ticket, non la correttezza della diagnosi contenuta nel ticket.

### E3 — Healing

- **36 sessioni di healing**, con **un tentativo ciascuna**.
- **35 correzioni valide: 97,2%**.
- In **33 casi** anche il retest completo è terminato correttamente.
- Una correzione valida non garantisce necessariamente che l'intero retest venga completato.

### Tempi e hardware

- Un ciclo completo, comprensivo di verifica, healing e retest, richiede mediamente **circa 35 minuti**.
- La verifica è stata eseguita usando **Qwen 3.8 27B** in locale, su hardware consumer.
- Velocità di generazione di **circa 40 token al secondo**.
- La fase di healing utilizza invece Antigravity, un servizio esterno.

---

## BLOCCO 7 — Conclusioni e sviluppi futuri

**Tempo obiettivo: 1:15–1:30**

### Contributo

- VulcaTest estende VulcAIn con capacità di verifica e correzione.
- Riduce le attività manuali necessarie per controllare e mantenere le macchine vulnerabili.
- I risultati sperimentali sono promettenti, pur con limiti da approfondire.

### Perturbazioni P3

- Le scorciatoie sono state introdotte per esplorare una capacità trasversale del framework.
- Sono state segnalate **4 esecuzioni su 20**.
- Il motivo è che VulcaTest segue il percorso previsto: le scorciatoie devono essere esplicitate nel piano per poter essere verificate sistematicamente.

### Sviluppi futuri

- **Testing esplorativo**, per cercare percorsi alternativi non previsti.
- **Pipeline end-to-end** tra VulcAIn e VulcaTest, con un'interfaccia grafica per l'operatore.

### Chiusura

- Ringraziamento alla commissione.
- Disponibilità a rispondere alle domande.
