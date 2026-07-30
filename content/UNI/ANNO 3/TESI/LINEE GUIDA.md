Basandomi sui tre documenti che abbiamo analizzato (`README.pdf`, `TECHNICAL_ONBOARDING.pdf`, `VulcAIn.pdf`), il perimetro della tua tesi è molto chiaro. Il tuo obiettivo principale è **creare VulcaTest**, ovvero trasformare l'attuale sistema lineare in un sistema "Self-Healing" (che si auto-ripara).

Ecco la lista puntata ben definita di **esattamente ciò che dovrai implementare (scrivere in codice)**, divisa tra "Core" (il cuore della tesi) e "Avanzati" (i next steps per far brillare il progetto).

### 🔴 CORE (L'implementazione obbligatoria per la tesi)

**1. Il Motore del Workflow (LangGraph / Python)**

- Abbandonare l'interfaccia chat di Antigravity e creare un'applicazione Python indipendente.
- Implementare un grafo (con LangGraph o simili) che gestisca il "While-loop agentico", ovvero il ciclo infinito: _Deploy -> Test -> Analisi -> Riparazione -> Deploy_, impostando un limite massimo (es. max 5 cicli) per evitare loop infiniti.

**2. Il Parser degli Errori di Ansible**

- Scrivere uno script Python che lancia il playbook `setup_machine.yml` (tramite VulcaShip).
- Se l'esecuzione fallisce, scrivere una logica (Regex o pre-processing) per estrarre _solo_ le righe rilevanti dell'errore (il "rosso" di Ansible), filtrando il rumore di fondo prima di inviare il log all'LLM.

**3. L'Integrazione degli Strumenti di Attacco (MCP Pentest)**

- Configurare una Sandbox per il pentester (installare e far comunicare il tuo script Python con `Kali-MCP` o `Hexstrike`).
- Insegnare al tuo agente LLM come chiamare questi tool (es. `nmap`, `curl`, exploit) usando lo standard Model Context Protocol.

**4. L'Agente Pentester (Test "Intended Way")**

- Scrivere la logica per cui il tuo agente AI legge autonomamente il file `writeup.md` generato al passo precedente.
- Fare in modo che l'agente esegua letteralmente i comandi scritti nel writeup contro l'IP della macchina virtuale per verificare che la macchina sia effettivamente vulnerabile come progettato.

**5. L'Agente Riparatore (Il Self-Healing IaC)**

- Se il pentest fallisce (es. Nmap non trova la porta 80 aperta), creare un prompt di sistema che passi questa prova di fallimento a un secondo agente (il Costruttore).
- L'agente Costruttore dovrà analizzare il fallimento logico, correggere materialmente il file `setup_machine.yml` sovrascrivendolo, e segnalare al workflow di ricominciare dal punto 2.

---

### 🔵 AVANZATI / NEXT STEPS (Per alzare il voto e l'innovazione)

Se riesci a completare la parte Core, questi sono gli step aggiuntivi menzionati nei documenti che darebbero un grandissimo valore al progetto:

**6. QA Automatica (Validazione Web)**

- Creare script automatici (senza LLM, ma con tool come Selenium o Playwright) che simulino un utente web reale per validare che l'interfaccia dei siti generati funzioni correttamente (es. login form, chat).

**7. Screenshot Automatici (Autogen Screenshots)**

- Modificare il flusso di generazione del `writeup.md` in modo che, mentre l'agente fa il pentest con successo (punto 4), catturi degli screenshot reali del terminale o del browser e li inserisca nel documento finale Markdown.

**8. Il "Bug Bounty Mode" (Test Unintended Way)**

- Creare una modalità in cui l'agente pentester ignora volutamente il `writeup.md` e usa la sua "creatività" e i tool MCP per cercare falle _non previste_ nel sistema. Questo trasforma il tuo tool accademico in un prodotto potenzialmente vendibile alle aziende per fare auditing.

**9. Web GUI Composer**

- Sviluppare un'interfaccia grafica web (es. con React o Vue) dove il docente può "trascinare" i blocchi di vulnerabilità per generare la macchina visivamente, che poi comunica via API (usando la tua API Key del modello AI) con il backend Python che hai scritto.

Questa è la roadmap esatta del tuo lavoro di tesi. Ti consiglio di partire a testa bassa sul punto **1** e **3**, perché appena riesci a far comunicare Python con l'LLM e a fargli lanciare un banale `nmap` tramite MCP, avrai sbloccato il 50% delle difficoltà tecniche del progetto!