Voglio essere interrogato sugli argomenti 

- **9.1 Modelli di Qualità del Software & SQA**
    - **Quality Model di McCall (Triangolo della Qualità):**
        - _Product Operation:_ Correttezza, Affidabilità, Efficienza, Integrità, Usabilità.
        - _Product Revision:_ Manutenibilità, Flessibilità, Testabilità.
        - _Product Transition:_ Portabilità, Riusabilità, Interoperabilità.
        - Distribuzione delle attività lungo l'asse temporale del ciclo di vita.
    - **Standard IEEE 1061 (_Software Quality Metrics Methodology_):** Struttura gerarchica a 4 livelli (_Obiettivi →→ Fattori →→ Subfattori →→ Metriche_).
    - **SQA (_Software Quality Assurance_):** Obiettivi, ruoli, auditing formale e piani di qualità.
- **9.2 Il Processo di Testing: Le 8 Attività Fondamentali**
    - Definizione di Boehm: **Verifica** (_"Stiamo costruendo il prodotto nel modo giusto?"_) vs **Validazione** (_"Stiamo costruendo il prodotto giusto?"_).
    - **Validation Testing** (dimostrare la conformità) vs **Defect Testing** (provocare intenzionalmente guasti per scovare bug).
    - **Le 8 Attività della Fase di Testing (Domanda d'esame):**
        1. **Pianificazione dei test:** definizione di obiettivi, risorse, criteri di stop e piano di test.
        2. **Progettazione dei casi di test (_Test Case Design_):** identificazione delle condizioni di test e scelta dei dati di input/output attesi.
        3. **Preparazione dell'ambiente di test:** allestimento di hardware, software, configurazioni, database di test, stub e driver.
        4. **Esecuzione dei test:** esecuzione manuale o automatica dei casi di test sulle build.
        5. **Analisi e confronto dei risultati:** comparazione tra output atteso e output reale ottenuto per rilevare anomalie/fallimenti.
        6. **Segnalazione anomalie e Correzione (_Retesting_):** log dei bug per gli sviluppatori e riesecuzione del test dopo il fix.
        7. **Test di Regressione (_Regression Testing_):** riesecuzione selettiva dei test precedenti per verificare che le modifiche non abbiano introdotto nuovi bug in parti già funzionanti.
        8. **Valutazione dei criteri di uscita e Report finale:** verifica della copertura e redazione del documento di riepilogo con metriche di qualità.
- **9.3 Strategie, Tecniche e Livelli di Testing**
    - **Politiche di Black-Box Testing (Funzionale):**
        - _Equivalence Partitioning:_ partizioni valide e non valide del dominio di input.
        - _Boundary Value Analysis:_ test sui valori limite (min,min+1,max−1,maxmin,min+1,max−1,max).
        - **Scenario-Based Testing:** test basato su scenari d'uso reali dell'utente e percorsi attraverso i casi d'uso.
        - **Acceptance Testing / UAT:** collaudo finale per software su commissione/a contratto.
    - **Politiche di White-Box Testing (Strutturale):**
        - Criteri di copertura: _Statement Coverage_, _Branch Coverage_, **Path Testing** (copertura dei cammini indipendenti guidata da v(G)v(G) di McCabe).
    - **Tecniche Speciali di Testing:**
        - **Statistical Testing:** test basato sul _Profilo Operativo_ per stimare quantitativamente l'affidabilità (MTBFMTBF) e il tasso di guasto del software in condizioni reali.
        - **Object Class Testing (OO Testing):** test completo di tutte le operazioni associate a un oggetto, verifica dello stato dell'oggetto e transizioni di stato; sfide legate a incapsulamento, polimorfismo ed ereditarietà; _Cluster Testing_.
    - **Livelli di Testing:**
        - _Unit Testing_, _Integration Testing_ (**Top-Down con Stubs** vs **Bottom-Up con Drivers**), _Interface Testing_, _System Testing_, _Stress Testing_.
- **9.4 Business Process Management (BPM) & Notazione BPMN**
    - Definizione di Processo di Business e obiettivi del BPM.
    - Ciclo di vita BPM (_Identification, Discovery, Analysis, Redesign, Implementation, Monitoring_).
    - **Elementi Grafici Fondamentali di BPMN:**
        - _Eventi (Cerchi):_ Start Event, Intermediate Event, End Event.
        - _Attività / Task (Rettangoli arrotondati):_ Unità di lavoro atomiche.
        - _Gateway (Rombi):_ **Exclusive Gateway (XOR, ××)**, **Parallel Gateway (AND, ++)**, **Inclusive Gateway (OR, ∘∘)**.
        - _Flussi:_ Sequence Flow (linea continua), Message Flow (linea tratteggiata tra pool).
        - _Swimlanes:_ **Pool** (processi/attori indipendenti) e **Lane** (ruoli interni a una pool).
In base all’indice delle fonti, dimmi quali fonti devo selezionare e quali deselezionare per evitare domande sugli argomenti successivi

