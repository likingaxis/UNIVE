# Resoconto Corso: Ingegneria del Software

- **Anno:** 3° Anno Triennale
- **Area:** Ingegneria Informatica / Metodologie, Tecnologie e Gestione del Software (ING-INF/05)
- **Riferimenti e Testi:** I. Sommerville (*Software Engineering*), R. S. Pressman (*Principi di Ingegneria del Software*), E. Gamma, R. Helm, R. Johnson, J. Vlissides (*Design Patterns: Elements of Reusable Object-Oriented Software* - GoF), standard IEEE (IEEE 830, IEEE 1058, IEEE 1061), materiale e compendi didattici d'esame.

---

## Obiettivi del Corso in Sintesi

Il corso trasmette i principi teorici, metodologici, ingegneristici, economici e organizzativi necessari per pianificare, progettare, gestire, sviluppare, verificare e manutenere sistemi software industriali complessi e affidabili. Vengono sviscerati i modelli di ciclo di vita tradizionali ed agili (Scrum, CMM), l'ingegneria e la convalida dei requisiti con linguaggi semi-formali e formali (Reti di Petri), la progettazione orientata agli oggetti con lo standard UML e il pattern BCE, le tecniche quantitative di stima del progetto software (Function Points, COCOMO, PERT/CPM), l'architettura dei sistemi distribuiti e orientati ai servizi (ORB/CORBA, Component-Based, SOA, REST, transazioni 2PC), i Design Pattern del GoF, la misurazione formale della complessità e della struttura (McCabe, Henry & Kafura) e la disciplina del software testing con le relative garanzie di qualità (SQA, Black/White-Box, BPMN).

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### 1. Fondamenti, Economia e Affidabilità del Software
- **Natura del software e ingegneria:**
  - Definizioni formali di Ingegneria del Software (IEEE, Bauer); distinzione tra Prodotto, Artefatto e Sistema software.
  - Curva di guasto dell'Hardware (*bathtub curve*) vs Invecchiamento del Software (*software aging* dovuto a degrado entropico da modifiche continue).
  - Ruoli nel progetto: Cliente (*Customer*), Sviluppatore (*Developer*), Utente finale (*End User*).
- **Complessità del software e Legge di Brooks:**
  - Problemi **Essenziali** del software (*Complessità, Conformità, Modificabilità, Invisibilità*) vs Problemi **Accidentali** (*linguaggi, IDE, strumenti di compilazione*). Principio del *"No Silver Bullet"*.
- **Ciclo di vita ed economia della manutenzione:**
  - I 3 macro-stadi: Sviluppo (fasi: requisiti, specifica, pianificazione, progettazione, codifica, integrazione), Manutenzione, Dismissione.
  - I **4 tipi di manutenzione:** Correttiva (riparazione di difetti latenti, ~60% dei costi di ciclo di vita), Adattiva (cambiamenti nell'ambiente HW/OS), Perfettiva (nuove funzionalità o ottimizzazioni richieste), Preventiva (re-engineering e refactoring).
  - *Regola 10-90:* il 90% del tempo di calcolo è speso nel 10% del codice (*core* del software).
  - Andamento esponenziale del costo di correzione dei difetti all'avanzare delle fasi del ciclo di vita.
- **Affidabilità e disponibilità nei sistemi critici:**
  - Catena causale del malfunzionamento: **Errore umano** $\to$ **Difetto (Defect / Bug)** nel prodotto $\to$ **Guasto (Failure)** rilevabile a runtime.
  - Concetto di **Profilo Operativo (Operational Profile)** e dipendenza contestuale dell'affidabilità.
  - Metriche: *MTBF* (*Mean Time Between Failures*), *MTTR* (*Mean Time To Repair*), Tasso di guasto $\lambda$.
  - Formula della **Disponibilità (Availability):** $A = \frac{MTBF}{MTBF + MTTR}$.
  - Sistemi *Safety-critical* (rischio per l'incolumità umana) vs *Mission-critical* (rischio di interruzione di obiettivi vitali del business).

---

### 2. Modelli di Ciclo di Vita e Processi Software
- **Modelli tradizionali e incrementali:**
  - *Build & Fix:* approccio non ingegneristico e limiti.
  - *Modello a Cascata (Waterfall):* sequenzialità rigida con verifica a fine fase; rigidità di fronte alla volatilità dei requisiti.
  - *Rapid Prototyping:* prototipo "usa e getta" (*throwaway prototype*) per chiarire e validare requisiti ambigui.
  - *Sviluppo Incrementale:* rilasci funzionali progressivi; approccio con *Overall Architecture* vs senza Overall Architecture (degrado architetturale).
- **Modello a Spirale di Boehm e Gestione dei Rischi:**
  - Ciclo a spirale in 4 quadranti: 1. Definizione obiettivi/alternative/vincoli; 2. Valutazione alternative e analisi dei rischi; 3. Sviluppo e verifica del prodotto parziale; 4. Pianificazione della fase successiva.
  - **Risk Management (5 Fasi):** Identificazione dei rischi $\to$ Valutazione (matrice $3 \times 3$ probabilità/impatto) $\to$ Prioritizzazione (Pareto 80/20, Ishikawa) $\to$ Pianificazione delle 4 strategie di mitigazione (**Evitare**, **Ridurre**, **Trasferire**, **Accettare**) $\to$ Monitoraggio continuo.
- **Modelli concorrenti e corporate:**
  - Modello a fontana ad oggetti e Concurrent Engineering.
  - **Modello Microsoft (Synchronize-and-Stabilize):** Daily build, smoke test continui, ciclo a 3 fasi (Planning, Milestone Development, Stabilization).
- **Metodologie Agili e Framework Scrum:**
  - I 4 Valori del Manifesto Agile (individui e interazioni, software funzionante, collaborazione col cliente, risposta al cambiamento).
  - **Framework Scrum:** Ruoli (*Product Owner*, *Scrum Master*, *Development Team*); Eventi (*Sprint*, *Sprint Planning*, *Daily Scrum*, *Sprint Review*, *Sprint Retrospective*); Artefatti (*Product Backlog*, *Sprint Backlog*, *Incremento potenzialmente rilasciabile*); User Stories.
- **Maturità del processo: CMM (Capability Maturity Model):**
  - I 5 Livelli di maturità: 1. *Initial* (caotico), 2. *Repeatable / Managed* (controllo di tempi e costi base), 3. *Defined* (processi standardizzati a livello aziendale), 4. *Quantitatively Managed* (controllo statistico del processo), 5. *Optimizing* (miglioramento continuo). Key Process Areas (KPA); Standard ISO 9001, ISO/IEC 12207.

---

### 3. Ingegneria dei Requisiti e Tecniche di Specifica
- **Tassonomia dei requisiti:**
  - Requisiti Utente (linguaggio naturale) vs Requisiti di Sistema (specifica tecnica formale SRS - Software Requirements Specification).
  - Requisiti Funzionali vs Requisiti Non Funzionali (di prodotto, di processo, esterni) vs Requisiti di Dominio. Requisiti stabili vs volatili.
- **Il Processo di Ingegneria dei Requisiti (5 Attività):**
  1. *Studio di fattibilità:* economica, tecnica, organizzativa.
  2. *Elicitazione e analisi:* interviste, casi d'uso, scenari, negoziazione.
  3. *Specifica:* stesura del documento SRS standard IEEE 830.
  4. *Convalida (I 5 controlli):* Validità, Consistenza, Completezza, Realizzabilità, Verificabilità.
  5. *Gestione dei requisiti:* tracciabilità matriciale e gestione del change control.
- **Tecniche di specifica semi-formali:**
  - **ERD (Entity-Relationship Diagram):** Entità, attributi, relazioni, molteplicità.
  - **DFD (Data Flow Diagram):** Processi (bolle), Flussi dati (frecce), Data Store (archivi), Entità Esterne (sorgenti/destinazioni); Livelli gerarchici (Context Diagram di livello 0, DFD 1, DFD 2).
  - **SSA (Structured Systems Analysis):** Metodologia top-down a 9 step per la decomposizione funzionale.
- **Tecniche formali: Reti di Petri (Petri Nets):**
  - Definizione matematica formale della tupla: $G = (P, T, A, w, M_0)$.
  - Elementi grafici: Posti $P$ (cerchi, stati/condizioni/risorse), Transizioni $T$ (barre, eventi), Archi orientati $A$ con peso $w$, Token (marcatura $M$).
  - **Regola di Scatto (Firing Rule):** abilitazione ($M(p) \ge w(p, t) \ \forall p \in \text{in}(t)$) e scatto (consumo token da posti di input, generazione in posti di output).
  - Proprietà analitiche: non-determinismo, concorrenza, Liveness (assenza di deadlock), Boundedness/Safety (capacità finita dei posti), Reachability (albero delle marcature). Cenni a FSM e linguaggio Z.

---

### 4. Analisi e Progettazione OO (OOA/OOD) & Modellazione UML
- **Principi OOA/OOD e Pattern architetturale BCE:**
  - Distinzione tra OOA (*Cosa fa il sistema*, focalizzata sul dominio del problema) e OOD (*Come lo realizza*, strutturazione architetturale e di dettaglio).
  - **Pattern BCE (Boundary-Control-Entity):**
    - *Boundary Classes:* interfacce verso l'utente umano o altri sistemi esterni.
    - *Control Classes:* coordinamento, orchestrazione e logica di esecuzione dei casi d'uso.
    - *Entity Classes:* modellazione dei dati persistenti e della logica di dominio.
- **Diagrammi Strutturali UML:**
  - **Class Diagram:** approcci per l'identificazione delle classi Entity (Noun Phrase, Common Class Patterns, Use Case Driven, CRC Cards); distinzione tra attributo e classe; visibilità (`+`, `-`, `#`, `~`), attributi derivati (`/attr`), firme dei metodi.
  - Relazioni: Associazioni con ruoli e molteplicità, Dipendenze, Generalizzazione/Ereditarietà con polimorfismo e classi astratte.
  - Relazioni di contenimento: **Aggregazione** (relazione *has-a* debole, ciclo di vita indipendente, rombo vuoto $\diamond$) vs **Composizione** (relazione *is-part-of* forte, ciclo di vita coincidente, rombo pieno $\blacklozenge$).
  - **Package Diagram:** raggruppamento modulare, relazioni di dipendenza (`<<use>>`), ereditarietà tra package e importazione.
- **Diagrammi Comportamentali e di Interazione UML:**
  - **Use Case Diagram:** attori primari e secondari, casi d'uso, relazioni `<<include>>` (inclusione obbligatoria, freccia verso il caso incluso) ed `<<extend>>` (estensione condizionale, freccia verso il caso base).
  - **Sequence Diagram vs Collaboration/Communication Diagram:** equivalenza semantica; enfasi temporale (linee di vita, activation bar, chiamate sincrone/asincrone) vs enfasi topologica (messaggi numerati lungo i collegamenti tra oggetti).
  - **State Diagram (Statechart di Harel):** stati, super-stati ortogonali, transizioni `Evento [Guardia] / Azione`, azioni interne `entry`, `do`, `exit`.
  - **Activity Diagram:** flussi procedurali, nodi di decisione/merge, fork e join per il parallelismo, swimlanes per le responsabilità.

---

### 5. Software Project Management, Pianificazione e Stime
- **Organizzazione del team e Legge di Brooks:**
  - Team centralizzato (*Chief Programmer Team*) vs Team decentralizzato (*Team Democratico*).
  - **Legge di Brooks:** *"Aggiungere personale a un progetto in ritardo lo rende ancora più in ritardo"*; crescita quadratica dei canali di comunicazione: $C = \frac{n(n-1)}{2}$.
- **Tecniche di Stima Dimensionale del Software (Size Estimation):**
  - Metrica LOC/KLOC: limiti, sensibilità al linguaggio di programmazione.
  - **Function Point Analysis (FPA):**
    1. Calcolo degli *UFC* (*Unadjusted Function Points*): identificazione e pesatura per complessità di 2 componenti dati (*ILF, EIF*) e 3 componenti transazionali (*EI, EO, EQ*).
    2. Calcolo del *TCF* (*Technical Complexity Factor*): valutazione di 14 fattori generali di sistema $F_j \in [0, 5]$:
       $$TCF = 0.65 + 0.01 \sum_{j=1}^{14} F_j \quad (\text{range } [0.65, 1.35])$$
    3. Stima finale: $FP = UFC \times TCF$.
- **Stima dello Sforzo e della Durata: Modello COCOMO di Boehm:**
  - Livelli: Basic, Intermediate, Advanced. Modalità di progetto: *Organic* (team ristretto, compiti noti), *Semi-detached* (complessità media), *Embedded* (vincoli hardware rigidi, safety-critical).
  - Formule analitiche:
    - Sforzo nominale: $\text{Effort}_{nom} = a \cdot (\text{KLOC})^b$ [Persone-Mese].
    - Sforzo effettivo (con 15 fattori di costo moltiplicativi $c_i$): $\text{Effort} = \text{Effort}_{nom} \cdot \prod_{i=1}^{15} c_i$.
    - Durata di sviluppo: $\text{Time} = c \cdot (\text{Effort})^d$ [Mesi].
- **Pianificazione Temporale e Documento SPMP:**
  - Tecniche reticolari **PERT / CPM:** calcolo dei tempi al più presto ($ES, EF$) e al più tardi ($LS, LF$), calcolo dello slittamento (*Float* $= LS - ES$), determinazione del **Cammino Critico (Critical Path)** con slittamento nullo.
  - Diagramma di **Gantt:** barre temporali, dipendenze tra task e milestone.
  - Struttura del piano di gestione software **SPMP** secondo lo standard IEEE 1058.

---

### 6. Progettazione Architetturale e Sistemi Distribuiti
- **Principi di progettazione:**
  - Astrazione, Decomposizione modulare, Information Hiding di David Parnas (nascondere dettagli implementativi volatili dietro interfacce stabili).
  - **I 7 Livelli di Coesione Modulare (dal peggiore al migliore):** Coincidenziale $\to$ Logica $\to$ Temporale $\to$ Procedurale $\to$ Comunicazionale $\to$ Sequenziale $\to$ **Funzionale (Ottimale)**.
  - **I 5 Livelli di Accoppiamento/Coupling (dal peggiore al migliore):** Content $\to$ Common (globale) $\to$ Control $\to$ Stamp (strutture dati) $\to$ **Data (Ottimale, solo tipi elementari)**.
- **Tassonomia architetturale centralizzata e distribuita:**
  - Centralizzata: Mainframe-based e File-sharing.
  - Client/Server: 2-Tier (Fat Client con logica applicativa sul client vs Thin Client con logica sul server), 3-Tier e N-Tier (separazione Presentation Layer, Application/Business Logic Layer, Data Access/Persistence Layer).
- **Architetture a Oggetti Distribuiti e Componenti:**
  - Middleware **ORB (Object Request Broker)** e standard CORBA: trasparenza di locazione, linguaggio IDL (*Interface Definition Language*), generazione di *Client Stub* e *Server Skeleton*, serializzazione/marshalling.
  - **Component-Based Software Engineering (CBSE):** differenza ontologica tra Oggetto (grana fine, runtime) e Componente (grana grossa, unità autonoma di rilascio black-box); interfacce *Provided* ($- \circ$) e *Required* ($- \subset$); infrastruttura del *Component Framework*.
- **Architetture a Servizi (SOA), Web Services e Transazioni:**
  - Principi SOA (disaccoppiamento, interoperabilità).
  - Stack Web Services SOAP (messaggi XML, protocollo SOAP, contratti WSDL, registry UDDI).
  - Architettura **REST (Representational State Transfer):** risorse identificate da URI, interazione stateless, metodi HTTP standard (GET, POST, PUT, DELETE), formati JSON/XML.
  - Transazioni distribuite e protocollo **Two-Phase Commit (2PC):** Fase 1 *Prepare* (raccolta dei voti dei partecipanti), Fase 2 *Commit/Abort* globale; compound transactions e pattern di negoziazione.

---

### 7. OOD di Dettaglio & I Design Pattern GoF
- **Regole di design di dettaglio:**
  - **Legge di Demetra (Principio della Minima Conoscenza):** un metodo deve invocare solo metodi di oggetti appartenenti a parametri, campi propri, oggetti creati internamente o variabili globali (evitare concatenazioni di chiamate `a.getB().getC().doWork()`).
  - Deployment Diagram UML (nodi di esecuzione, canali di comunicazione, artefatti distribuiti).
- **Tassonomia dei Design Pattern GoF:**
  - Classificazione per **Scopo** (Creazionali, Strutturali, Comportamentali) $\times$ **Raggio d'azione** (su Classi [ereditarietà statica] vs su Oggetti [composizione e delega dinamica]).
- **Gli 8 Pattern Fondamentali del Corso:**
  1. **Abstract Factory** (*Creazionale su Oggetti*): crea famiglie di oggetti correlati o dipendenti senza esplicitare le classi concrete.
  2. **Factory Method** (*Creazionale su Classi*): definisce un'interfaccia per la creazione di un oggetto, ma lascia alle sottoclassi la decisione su quale classe istanziare.
  3. **Adapter** (*Strutturale su Classi e su Oggetti*): converte l'interfaccia di una classe in un'altra interfaccia attesa dal client (Class Adapter con ereditarietà multipla vs Object Adapter con delega/composizione).
  4. **Composite** (*Strutturale su Oggetti*): compone oggetti in strutture ad albero parte-tutto; consente ai client di trattare in modo omogeneo oggetti singoli (`Leaf`) e contenitori compositi (`Composite`) tramite l'interfaccia astratta `Component`.
  5. **Decorator** (*Strutturale su Oggetti*): aggiunge dinamicamente e in modo trasparente nuove funzionalità e responsabilità a un singolo oggetto a runtime senza modificare la gerarchia delle classi.
  6. **Observer** (*Comportamentale su Oggetti*): definisce una dipendenza 1-a-molti (meccanismo Publish-Subscribe) in modo che quando un oggetto `Subject` cambia stato, tutti i suoi osservatori registrati vengono notificati e aggiornati automaticamente.
  7. **Template Method** (*Comportamentale su Classi*): definisce lo scheletro invariante di un algoritmo in un metodo di una classe base, rimandando la definizione di specifici passaggi alle sottoclassi concrete tramite metodi astratti/hook.
  8. **Strategy** (*Comportamentale su Oggetti*): definisce una famiglia di algoritmi intercambiabili, incapsula ciascuno di essi in una classe separata e li rende intercambiabili a runtime tramite polimorfismo.

---

### 8. Metriche del Software e Misura della Complessità
- **Metriche di struttura modulare (Structure Chart):**
  - Rappresentazione del software come grafo orientato di moduli e chiamate $S = (N, R)$.
  - Concetto di *Tree Impurity* (misura di quanto il grafo si allontana da una struttura ad albero puro).
  - Formula del **Riuso Interno di Yin & Winchester:** $r(G) = e - n + 1$ (dove $e$ è il numero di chiamate/archi e $n$ è il numero di moduli/nodi).
- **Metriche di Information Flow (Henry & Kafura):**
  - Definizione di **Fan-In** (numero di moduli che chiamano il modulo $M$ / flussi dati in ingresso) e **Fan-Out** (numero di moduli chiamati da $M$ / flussi dati in uscita).
  - Formula della complessità modulare:
    $$IF(M) = \text{Length}(M) \times (\text{Fan-In}(M) \times \text{Fan-Out}(M))^2$$
  - Interpretazione: moduli ad alto Fan-In e Fan-Out rappresentano colli di bottiglia critici per difettosità e manutenzione.
- **Control Flowgraph (CFG) e Programmazione Strutturata:**
  - Modellazione del flusso di controllo: nodi sequenza, nodi predicato (decisione), nodi di giunzione.
  - Concetto di *D-Structuredness* (programmi costruiti unicamente componendo costrutti strutturati $D_0, D_1, D_2, D_3$: sequenza, if-then-else, do-while, while-do) e grafi primi.
- **Complessità di McCabe (Ciclomatica ed Essenziale):**
  - **Complessità Ciclomatica $v(G)$ di McCabe:** numero di cammini linearmente indipendenti nella base dei cammini del programma; limite superiore al numero minimo di test case necessari per la copertura dei rami. Calcolabile in 3 modi equivalenti:
    1. $v(G) = e - n + 2p$ (con $p=1$ componente connessa);
    2. $v(G) = \text{Numero di Regioni delimitate dal grafo planare}$;
    3. $v(G) = \pi + 1$ (dove $\pi$ è il numero di nodi predicativi con due uscite).
  - **Complessità Essenziale $ev(G)$:** grado di non strutturazione del programma, ottenuta collassando ricorsivamente i sottografi strutturati $D_i$:
    $$ev(G) = v(G) - m \quad (\text{dove } m \text{ è il numero di sottografi strutturati eliminati})$$
  - Teorema fondamentale: $ev(G) = 1 \iff$ il programma è perfettamente D-strutturato (privo di salti anomali / *spaghetti code*).

---

### 9. Qualità del Software, SQA, Testing e Processi Aziendali (BPM)
- **Modelli di qualità del software e SQA:**
  - **Triangolo della Qualità di McCall:** 3 prospettive con fattori di qualità associati:
    - *Product Operation:* Correttezza, Affidabilità, Efficienza, Integrità, Usabilità.
    - *Product Revision:* Manutenibilità, Flessibilità, Testabilità.
    - *Product Transition:* Portabilità, Riusabilità, Interoperabilità.
  - Metodologia gerarchica dello standard **IEEE 1061** (Obiettivi $\to$ Fattori $\to$ Subfattori $\to$ Metriche). Software Quality Assurance (SQA).
- **Il Processo di Testing: Le 8 Attività Fondamentali:**
  - Verifica (Boehm: *"Stiamo costruendo il prodotto nel modo giusto?"*, conformità alla specifica) vs Validazione (*"Stiamo costruendo il prodotto giusto?"*, conformità alle reali esigenze dell'utente).
  - *Validation Testing* vs *Defect Testing*.
  - **Le 8 attività sequenziali del processo di test:**
    1. *Pianificazione dei test:* definizione di obiettivi, risorse, piano di test e criteri di completamento (*stop criteria*).
    2. *Progettazione dei casi di test (Test Case Design):* identificazione delle condizioni di test e generazione dei dati di input con gli output attesi.
    3. *Preparazione dell'ambiente di test:* allestimento di piattaforme, banche dati di prova, stub e driver.
    4. *Esecuzione dei test:* esecuzione manuale o automatica delle suite di test.
    5. *Analisi e confronto dei risultati:* confronto sistematico tra comportamento effettivo riscontrato e comportamento atteso.
    6. *Segnalazione anomalie e Correzione (Retesting):* apertura del bug report, fix da parte degli sviluppatori e riesecuzione del caso di test.
    7. *Test di Regressione (Regression Testing):* riesecuzione selettiva dei test preesistenti per garantire che il fix non abbia introdotto anomalie secondarie in funzionalità già collaudate.
    8. *Valutazione dei criteri di uscita e Redazione del Report Finale:* misurazione della copertura e documentazione formale delle metriche di qualità.
- **Strategie e Livelli di Testing:**
  - **Black-Box Testing (Funzionale):**
    - *Equivalence Partitioning:* partizionamento del dominio in classi di equivalenza valide e non valide.
    - *Boundary Value Analysis:* verifica dei valori limite (minimo, appena sopra il minimo, nominale, appena sotto il massimo, massimo).
    - *Scenario-Based Testing* e *Acceptance Testing / UAT* (collaudo finale a contratto).
  - **White-Box Testing (Strutturale):** Statement Coverage, Branch Coverage, Path Testing guidato dai cammini indipendenti di McCabe ($v(G)$).
  - **Tecniche Speciali:** *Statistical Testing* (generazione di casi di test basata sul Profilo Operativo per stimare MTBF e failure rate), *Object Class Testing* (test delle operazioni, verifica degli stati interni e transizioni di una classe, cluster testing).
  - **Livelli di Testing:** Unit Testing $\to$ Integration Testing (strategia *Top-Down* con uso di Stubs vs strategia *Bottom-Up* con uso di Drivers) $\to$ System Testing $\to$ Stress/Performance Testing.
- **Business Process Management (BPM) e Notazione BPMN:**
  - Modellazione dei processi aziendali; ciclo BPM (Identification, Discovery, Analysis, Redesign, Implementation, Monitoring).
  - Elementi di base BPMN: Eventi (inizio, intermedio, fine), Attività/Task atomici, Gateway decisionali (**XOR** esclusivo $\times$, **AND** parallelo $+$, **OR** inclusivo $\circ$), Flussi sequenziali e flussi di messaggio, Swimlanes (**Pool** per organizzazioni/processi indipendenti e **Lane** per ruoli/reparti interni).

---

## Linguaggi, Strumenti e Tecnologie
- **Linguaggi di Modellazione e Specifica:** UML 2.x (Use Case, Class, Package, Sequence, Collaboration, Statechart, Activity, Component, Deployment), BPMN 2.0, Reti di Petri, DFD, ERD.
- **Linguaggi di Sviluppo:** Java / C++ / C# (applicazioni OO, implementazione dei design pattern, test unitari).
- **Strumenti di Project Management e Modellazione:** Visual Paradigm, Enterprise Architect, Draw.io, GanttProject, Jira/Trello per gestione sprint Scrum.
- **Testing & Continuous Integration:** JUnit, Selenium, Git per version control e tracciamento build (*daily build*).

---

## Tipologia Esercizi e Prove d'Esame
- **Progetto di Gruppo Software (Relazione Tecnica d'Esame):**
  - Redazione del documento formale SRS (Requisiti Funzionali e Non Funzionali).
  - Progettazione strutturale e comportamentale con diagrammi UML (Casi d'Uso con include/extend, Class Diagram BCE con molteplicità e associazioni corrette, Sequence Diagram, State Diagram).
  - Dimensionamento economico e pianificazione: stima FPA (UFC, TCF e FP), stima COCOMO (Effort e Time), reticolo PERT/CPM con individuazione del cammino critico, Diagramma di Gantt e piano SPMP.
  - Strategia di testing: matrice di tracciabilità requisiti-test, progettazione casi di test funzionali (Equivalence Partitioning e Boundary Values) e test di integrazione.
- **Prova Orale Formale:**
  - Domande teoriche e applicative sui 9 moduli: Legge di Brooks e canali di comunicazione, formula della disponibilità, differenze tra modelli di ciclo di vita (Spirale vs Scrum vs Waterfall), scatto di una Rete di Petri su configurazioni arbitrarie, disegno e applicazione corretta degli 8 Design Pattern GoF, calcolo della complessità ciclomatica $v(G)$ ed essenziale $ev(G)$ su un frammento di codice con disegno del CFG, spiegazione analitica delle 8 attività della fase di testing e disegno di diagrammi BPMN con corretta semantica di gateway e swimlane.
