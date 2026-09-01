# 📑 INDICE GENERALE DEFINITIVO: `IS UNICO SHORT`

### 🏛️ MODULO 1: Fondamenti, Economia e Affidabilità del Software

- **1.1 Definizione di Ingegneria del Software & Natura del Prodotto SW**
    - Definizione formale (IEEE / Fritz Bauer) e distinzione tra _Prodotto_, _Artefatto_ e _Sistema Software_.
    - Differenza fondamentale tra deterioramento HW (curva a vasca da bagno _bathtub_) e invecchiamento SW (degrado dovuto a modifiche continue).
    - Ruoli: _Cliente, Sviluppatore, Utente finale_.
- **1.2 La Complessità del Software & Legge di Brooks**
    - Problemi **Essenziali** del software (_Complessità, Conformità, Modificabilità, Invisibilità_) vs Problemi **Accidentali** (_linguaggi, tool, IDE_).
    - Il principio _"No Silver Bullet"_.
- **1.3 Ciclo di Vita del Software & Costi di Manutenzione**
    - I 3 Stadi del ciclo di vita: _Sviluppo (le 6 fasi), Manutenzione, Dismissione_.
    - I **4 Tipi di Manutenzione**: _Correttiva_ (~60% dei costi totali), _Adattiva_, _Perfettiva_, _Preventiva_.
    - **Regola 10-90**: Significato del _Core del software_ (il 90% del tempo di esecuzione è speso nel 10% delle istruzioni).
    - Impatto esponenziale dei costi delle modifiche lungo le fasi del ciclo di vita.
- **1.4 Affidabilità, Disponibilità e Sistemi Critici**
    - Catena dell'errore: **Errore umano** →→ **Difetto (Defect / Bug)** →→ **Guasto (Failure)**.
    - Concetto di **Profilo Operativo (_Operational Profile_)** e perché l'affidabilità dipende dall'utente.
    - Metriche e Formule: MTBFMTBF (_Mean Time Between Failures_), MTTRMTTR (_Mean Time To Repair_), Tasso di guasto λλ.
    - **Formula della Disponibilità (_Availability_)**: Availability=MTBFMTBF+MTTRAvailability=MTBF+MTTRMTBF​
    - Definizione di **Software Critico** (_Safety-critical_ vs _Mission-critical_) e specifica dei requisiti di affidabilità come requisiti non funzionali.

---

### 🔄 MODULO 2: Modelli di Ciclo di Vita e Processi Software

- **2.1 Tassonomia dei Modelli di Ciclo di Vita Tradizionali**
    - _Build & Fix:_ natura non ingegneristica, limiti e contesti d'uso.
    - _Modello Waterfall (a Cascata):_ approccio sequenziale con verifica a fine fase; pregi, difetti, applicabilità (requisiti stabili e ben noti).
    - _Modello con Rapid Prototyping:_ prototipo gettabile (_throwaway prototype_) per chiarire requisiti ambigui; vantaggi e rischi.
    - _Modello a Sviluppo Incrementale:_ rilasci successivi parziali ma funzionanti; **Incrementale con Overall Architecture** vs **senza Overall Architecture** (rischio di degrado architetturale).
- **2.2 Modello a Spirale di Boehm & Risk Management**
    - Struttura a 4 quadranti per ciclo: _1. Determinazione obiettivi/alternative/vincoli, 2. Valutazione alternative e analisi rischi, 3. Sviluppo e verifica, 4. Pianificazione ciclo successivo_.
    - **Processo di Risk Management (5 Fasi):**
        1. _Identificazione dei rischi_ (tecnici, gestionali, operativi, esterni, di qualità).
        2. _Valutazione dei rischi:_ Matrice 3×33×3 Probabilità / Impatto.
        3. _Prioritizzazione:_ Principio di Pareto (80/20) e Diagramma a lisca di pesce (Ishikawa).
        4. _Pianificazione della mitigazione (Le 4 Strategie):_ **Evitare**, **Ridurre**, **Trasferire**, **Accettare**.
        5. _Monitoraggio continuo e revisione_.
- **2.3 Modelli Concorrenti, Corporate e ad Oggetti**
    - Modello _Object-Oriented a Fontana_ (fasi sovrapposte e iteratività) e _Concurrent Engineering_.
    - **Modello Microsoft (_Synchronize-and-Stabilize_):** Daily build, test continui in parallelo allo sviluppo, ciclo a 3 fasi (_Planning, Development in 3-4 milestone, Stabilization_).
    - Modello Netscape (approccio open source e rilascio rapido).
- **2.4 Metodologie Agili & Framework Scrum**
    - I 4 Valori cardine del Manifesto Agile.
    - **Framework Scrum:**
        - _Ruoli:_ Product Owner, Scrum Master, Development Team.
        - _Eventi:_ Sprint (1-4 settimane), Sprint Planning, Daily Scrum (15 min), Sprint Review, Sprint Retrospective.
        - _Artefatti:_ Product Backlog, Sprint Backlog, Incremento potenzialmente rilasciabile.
        - _User Stories:_ Concetto di base, stima e tracciamento dello sprint.
- **2.5 Maturità del Processo: Capability Maturity Model (CMM)**
    - Misura della maturità dell'organizzazione software; I **5 Livelli CMM**:
        1. _Initial_ (ad-hoc, caotico).
        2. _Repeatable / Managed_ (controllo di base su costi e tempi).
        3. _Defined_ (processi standardizzati e documentati a livello aziendale).
        4. _Quantitatively Managed_ (misurazione quantitativa e controllo statistico).
        5. _Optimizing_ (miglioramento continuo e innovazione).
    - Concetto di **KPA (_Key Process Areas_)**.
    - Certificazione dei processi e dei produttori software: Standard ISO 9001, ISO/IEC 12207, CMMI, Certificazioni professionali (CSDP, ISTQB).

---

### 📋 MODULO 3: Ingegneria dei Requisiti & Tecniche di Specifica

- **3.1 Tassonomia e Classificazione dei Requisiti**
    - Definizione di Requisito Software; Requisiti **Utente** (linguaggio naturale) vs Requisiti di **Sistema** (documento formale/strutturato SRS).
    - Classificazione: Requisiti **Funzionali** vs **Non Funzionali** (di prodotto, di processo, esterni) vs Requisiti di **Dominio**. Esempi pratici.
    - Requisiti _Stabili_ vs _Volatili_; Tecniche di specifica informale e il PDL (_Program Design Language_).
- **3.2 Il Processo di Ingegneria dei Requisiti**
    - Le **5 Attività Fondamentali del Processo:**
        1. **Studio di Fattibilità:** valutazione economica, tecnica e organizzativa.
        2. **Identificazione e Analisi (_Elicitation & Analysis_):** interviste, scenari, casi d'uso, negoziazione dei conflitti.
        3. **Specifica dei Requisiti:** redazione del documento SRS (_Software Requirements Specification_).
        4. **Convalida dei Requisiti (_Validation_):** I **5 Controlli di Convalida**:
            - _Validità_ (rispecchia le reali esigenze?).
            - _Consistenza_ (assenza di contraddizioni interne).
            - _Completezza_ (tutte le funzioni e vincoli inclusi).
            - _Realizzabilità_ (fattibile con budget, tempo e tecnologia a disposizione).
            - _Verificabilità_ (esiste un test oggettivo per dimostrarne il soddisfacimento?).
        5. **Gestione dei Requisiti (_Management_):** tracciabilità, controllo delle modifiche e requisiti volatili.
- **3.3 Tecniche di Specifica Semi-formali**
    - **ERD (_Entity-Relationship Diagram_):** Entità, Attributi, Relazioni e Molteplicità.
    - **DFD (_Data Flow Diagram_):** Processi (bolle), Flussi dati (frecce), Data Store (barre parallele), Entità Esterne (rettangoli); Livelli DFD (Context diagram, DFD 1, DFD 2).
    - **SSA (_Structured System Analysis_):** I **9 step** di decomposizione funzionale top-down (_stepwise refinement_).
- **3.4 Tecniche di Specifica Formali: Reti di Petri (Petri Net)**
    - Definizione formale della tupla G=(P,T,A,w,M0)G=(P,T,A,w,M0​).
    - Componenti: **Posti PP** (cerchi = condizioni/risorse), **Transizioni TT** (barre/rettangoli = eventi), **Archi AA** orientati con peso ww, **Token** (puntini = marcatura/stato corrente MM).
    - **Regola di Scatto (_Firing Rule_):**
        - _Abilitazione:_ una transizione tt è abilitata sse ∀p∈input(t),M(p)≥w(p,t)∀p∈input(t),M(p)≥w(p,t).
        - _Scatto:_ consuma w(p,t)w(p,t) token dai posti di input e genera w(t,p)w(t,p) token nei posti di output.
    - Proprietà essenziali delle Reti di Petri: _Non determinismo_, _Liveness_ (assenza di deadlock), _Boundedness / Safety_, _Reachability_ (albero delle marcature).
    - Cenni ad altri formalismi: Finite State Machines (FSM) e Linguaggio Z.

---

### 🧩 MODULO 4: Analisi e Progettazione Orientata agli Oggetti (OOA/OOD) & UML

- **4.1 Principi OOA, Transizione OOA →→ OOD & Pattern BCE**
    - Filosofia Object-Oriented e il passaggio graduale **OOA →→ OOD**:
        - _OOA (Analisi):_ focalizzata sul dominio del problema e sui requisiti (_cosa fare_).
        - _OOD Preliminare / Architetturale:_ definizione della struttura ad alto livello e dei sottosistemi.
        - _OOD Dettagliato:_ specifica di algoritmi, strutture dati e interfacce concrete (_come fare_).
    - Il pattern architetturale **BCE**:
        - _Boundary Classes:_ interfaccia verso utenti e sistemi esterni.
        - _Control Classes:_ logica applicativa, coordinamento e controllo dei casi d'uso.
        - _Entity Classes:_ modellazione dei dati persistenti e logica di dominio.
- **4.2 Modello Strutturale dei Dati: Class Diagram**
    - I **5 Approcci per l'identificazione delle Classi Entity**: _1. Noun Phrase Approach, 2. Common Class Patterns, 3. Use Case Driven, 4. CRC Cards, 5. Approccio Misto_.
    - Criteri per stabilire quando un concetto è una classe o un semplice attributo.
    - Specifica delle classi: Attributi (visibilità `+,-,#,~`, tipi, valori di default, derived attributes `/attr`), Operazioni (firma e parametri).
    - Relazioni tra classi: Associazioni, Molteplicità (`0..1`, `1..*`, `*`), Ruoli, Dipendenze.
    - **Relazioni di Contenimento:**
        - **Aggregazione** (relazione _has-a_ debole, parte condivisibile, ciclo di vita indipendente, rombo vuoto ⋄⋄).
        - **Composizione** (relazione _is-part-of_ forte, parte esclusiva, ciclo di vita coincidente, rombo pieno ⧫⧫).
    - **Generalizzazione ed Ereditarietà:** Relazione _is-a_, classi astratte, polimorfismo, sostituibilità.
    - Object Diagram: rappresentazione di istanze a runtime.
- **4.3 Organizzazione Modulare: Package Diagram**
    - Concetto di **Package** come meccanismo di raggruppamento logico di elementi UML.
    - Relazioni tra Package:
        - **Dipendenza (_Dependency / `<<use>>`_):** modifiche a un package possono impattare il package dipendente.
        - **Generalizzazione tra Package:** ereditarietà di interfacce e strutture a livello di package.
        - Relazioni di importazione/accesso (`<<import>>`, `<<access>>`).
- **4.4 Modello Dinamico e Comportamentale in UML**
    - **Use Case Diagram:** Attori primari e secondari, Casi d'uso, Confine del sistema;
        - Relazione **`<<include>>`** (inclusione obbligatoria, riuso, freccia verso il caso incluso).
        - Relazione **`<<extend>>`** (estensione opzionale, condizione/extension point, freccia verso il caso base).
        - Attivazione dei casi d'uso (_chi attiva chi_).
    - **Sequence Diagram vs Collaboration Diagram:**
        - Equivalenza semantica e interscambiabilità.
        - _Sequence Diagram:_ enfasi sull'ordine temporale dei messaggi (linee di vita, activation bar, messaggi sincroni/asincroni).
        - _Collaboration Diagram:_ enfasi sulla topologia e sulle relazioni strutturali tra oggetti (messaggi numerati progressivamente).
    - **State Diagram (Statechart di Harel):** Stati, Transizioni con sintassi `Evento [Guardia] / Azione`, Attività interne (`entry`, `do`, `exit`), Stati compositi e ortogonali.
    - **Activity Diagram:** Modellazione dei flussi procedurali, Azioni, Nodi di decisione/merge, Fork/Join per parallelismo, Swimlanes per ruoli e responsabilità.

---

### 📊 MODULO 5: Software Project Management, Pianificazione e Stime

- **5.1 Organizzazione del Team & Legge di Brooks**
    - **Legge di Brooks:** _"Aggiungere personale a un progetto in ritardo lo rende ancora più in ritardo"_; Crescita quadratica dei canali di comunicazione: C=n(n−1)2C=2n(n−1)​
    - Modelli di team: _Chief Programmer Team_ (centralizzato, alta gerarchia) vs _Team Democratico_ (decentralizzato, decisioni collegiali).
- **5.2 Tecniche di Stima Dimensionale del Software (Size Estimation)**
    - **LOC (Lines of Code / KLOC):** Vantaggi, limiti e dipendenza dal linguaggio.
    - **Function Point Analysis (FPA):**
        1. Calcolo **UFC (_Unadjusted Function Points_)**: 2 componenti dati (_ILF, EIF_) + 3 componenti transazionali (_EI, EO, EQ_), ciascuno pesato per complessità.
        2. Calcolo **TCF (_Technical Complexity Factor_)**: 14 fattori generali di sistema Fj∈[0,5]Fj​∈[0,5]: TCF=0.65+0.01⋅∑j=114Fj(range [0.65,1.35], variazione ±35%)TCF=0.65+0.01⋅∑j=114​Fj​(range [0.65,1.35], variazione ±35%)
        3. Formula finale: FP=UFC×TCFFP=UFC×TCF
    - Cenni sulla conversione FP ↔↔ LOC.
- **5.3 Stima di Sforzo e Durata: Modello COCOMO di Boehm**
    - I 3 Livelli di dettaglio: _Basic_, _Intermediate_, _Advanced_.
    - Le 3 Modalità di sviluppo: _Organic_ (piccolo, esperto), _Semi-detached_ (medio), _Embedded_ (critico, hardware vincolato).
    - **Formule di COCOMO:**
        - _Effort Nominale:_ Effortnom=a⋅(KLOC)b[Person-Months]Effortnom​=a⋅(KLOC)b[Person-Months]
        - _Effort Effettivo (con i 15 Cost Drivers cici​):_ Effort=Effortnom⋅∏i=115ciEffort=Effortnom​⋅∏i=115​ci​
        - _Durata / Tempo di consegna:_ Time=c⋅(Effort)d[Mesi]Time=c⋅(Effort)d[Mesi]
- **5.4 Pianificazione Temporale & Documento SPMP**
    - Reti **PERT / CPM:** Calcolo dei tempi al più presto (ES,EFES,EF) e al più tardi (LS,LFLS,LF); Identificazione del **Cammino Critico (_Critical Path_)** con slittamento nullo (Float=LS−ES=0Float=LS−ES=0).
    - Diagramma di **Gantt:** Cronoprogramma a barre temporali e Milestone.
    - Struttura del documento **SPMP (_Software Project Management Plan_)** secondo standard IEEE 1058.

---

### 🏗️ MODULO 6: Progettazione Architetturale & Sistemi Distribuiti (OOD)

- **6.1 Principi Fondamentali di Progettazione**
    - Astrazione, Stepwise Refinement, Modularità.
    - **Information Hiding di Parnas:** Incapsulamento delle scelte implementative instabili dietro interfacce stabili.
    - **I 7 Livelli di Coesione Modulare (dal peggiore al migliore):**
        1. _Coincidenziale_ →→ 2. _Logica_ →→ 3. _Temporale_ →→ 4. _Procedurale_ →→ 5. _Comunicazionale_ →→ 6. _Sequenziale_ →→ 7. **Funzionale (Ottimale)**.
    - **I 5 Livelli di Accoppiamento / Coupling (dal peggiore al migliore):**
        1. _Content Coupling_ →→ 2. _Common Coupling_ →→ 3. _Control Coupling_ →→ 4. _Stamp Coupling_ →→ 5. **Data Coupling (Ottimale)**.
- **6.2 Tassonomia delle Architetture Centralizzate e Client/Server**
    - Architetture Centralizzate: _Mainframe-based_ e _File-sharing_.
    - Architetture Client/Server: 2-Tier (_Fat Client_ vs _Thin Client_), 3-Tier e N-Tier (separazione Presentation Layer, Business Logic Layer, Data Layer).
- **6.3 Architettura a Oggetti Distribuiti & ORB/CORBA**
    - Concetto di Oggetto Distribuito (ruolo simmetrico client/server).
    - **Object Request Broker (ORB):** Middleware per la trasparenza di locazione e di implementazione.
    - Meccanismi: Marshalling / Unmarshalling, Client Stub e Server Skeleton.
    - Standard CORBA e linguaggio IDL (_Interface Definition Language_).
- **6.4 Component-Based Architecture & Component Framework**
    - **Differenza Oggetto vs Componente:** Oggetti = entità runtime a grana fine basate su codice; Componenti = unità autonome a grana grossa, distribuibili e componibili a tempo di build/configurazione.
    - Proprietà: Riutilizzo _Black-Box_, Interfacce esplicite **Provided** (−∘−∘) e **Required** (−⊂−⊂).
    - **Component Framework:** Ruolo come infrastruttura generica per l'assemblaggio, coordinamento e fornitura di servizi di sistema ai componenti.
- **6.5 Architetture Service-Oriented (SOA) & Web Services**
    - Principi SOA: Disaccoppiamento, interoperabilità, riusabilità dei servizi.
    - Stack Web Services: **SOAP** (protocollo XML su HTTP), **WSDL** (interfaccia XML del servizio), **UDDI** (registro/directory dei servizi).
    - Architettura **REST (_Representational State Transfer_):** Risorse con URI, stateless, verbi HTTP standard (_GET, POST, PUT, DELETE_), formati JSON/XML.
- **6.6 Pattern per Transazioni Distribuite**
    - Proprietà ACID; Protocollo **Two-Phase Commit (2PC)**: Fase 1 _Prepare_ (raccolta voti), Fase 2 _Commit/Abort_ globale.
    - _Compound Transaction Pattern_, _Long-Living Transaction Pattern_, _Negotiation Pattern_.

---

### 🎨 MODULO 7: OOD di Dettaglio & I Design Pattern GoF

- **7.1 Regole di Buon Design & Diagrammi di Dettaglio**
    - **Legge di Demetra (_Principle of Least Knowledge_):** Limitare l'invocazione di metodi solo a oggetti strettamente collegati (evitare concatenazioni `a.getB().getC().doIt()`).
    - Deployment Diagram (Nodi, Dispositivi, Artefatti di esecuzione).
- **7.2 Classificazione dei Design Pattern GoF**
    - Definizione di Design Pattern e ruolo dei Framework.
    - Classificazione bidimensionale: Per **Scopo** (_Creazionali, Strutturali, Comportamentali_) ×× Per **Raggio d'azione** (_Basati su Classi [ereditarietà statica] vs Basati su Oggetti [composizione/delega dinamica]_).
- **7.3 Gli 8 Design Pattern Fondamentali del Corso:**
    1. **Abstract Factory** _(Creazionale su Oggetti):_ Creazione di famiglie di oggetti correlati o dipendenti senza specificare le classi concrete.
    2. **Factory Method** _(Creazionale su Classi):_ Interfaccia di creazione di un oggetto che delega alle sottoclassi la scelta della classe concreta da istanziare.
    3. **Adapter** _(Strutturale su Classi e su Oggetti):_ Convertire l'interfaccia di una classe in un'altra attesa dal client;
        - **Class Adapter:** usa ereditarietà multipla; è statico e rigido.
        - **Object Adapter:** usa composizione/delega; è dinamico, flessibile e adatta un'intera gerarchia.
    4. **Composite** _(Strutturale su Oggetti):_ Strutture ad albero gerarchiche parte-tutto; trattamento uniforme di oggetti singoli (`Leaf`) e compositi (`Composite`) tramite l'interfaccia `Component`.
    5. **Decorator** _(Strutturale su Oggetti):_ Aggiunta dinamica e trasparente di responsabilità aggiuntive a un oggetto a runtime (alternativa flessibile al subclassing).
    6. **Observer** _(Comportamentale su Oggetti):_ Dipendenza 1-a-molti (Publish-Subscribe); notifica automatica a tutti gli osservatori registrati quando cambia lo stato del soggetto.
    7. **Template Method** _(Comportamentale su Classi):_ Scheletro invariante di un algoritmo nella classe base, con singoli passi variabili ridefiniti nelle sottoclassi concrete.
    8. **Strategy** _(Comportamentale su Oggetti):_ Famiglia di algoritmi incapsulati in classi separate, resi intercambiabili a runtime tramite polimorfismo.

---

### 📐 MODULO 8: Metriche del Software & Misura della Complessità

- **8.1 Metriche di Struttura Modulare (Structure Chart)**
    - Rappresentazione ad albero/grafo S={N,R}S={N,R}.
    - **Tree Impurity:** Deviazione della struttura da un albero puro (presenza di nodi condivisi o cicli).
    - **Misura del Riuso Interno di Yin & Winchester:** r(G)=e−n+1(e=archi/chiamate,n=nodi/moduli)r(G)=e−n+1(e=archi/chiamate,n=nodi/moduli)
- **8.2 Metriche di Information Flow (Henry & Kafura)**
    - Definizione di **Fan-In** (moduli chiamanti / flussi dati in ingresso) e **Fan-Out** (moduli chiamati / flussi dati in uscita).
    - **Formula di Complessità Modulare di Henry & Kafura:** IF(M)=Length(M)×(Fan-In(M)×Fan-Out(M))2IF(M)=Length(M)×(Fan-In(M)×Fan-Out(M))2
    - Interpretazione ingegneristica di Fan-In e Fan-Out elevati.
- **8.3 Misure su Control Flowgraph (CFG) & Programmazione Strutturata**
    - Modellazione del flusso di controllo: Nodi sequenziali, Nodi predicativi, Archi di controllo.
    - Costrutti strutturati di base: Sequenza, Selezione, Iterazione.
    - **Flowgraph Primi:** Grafi non ulteriormente decomponibili tramite sequenza o nesting.
    - **D-Structuredness:** Programmi generabili esclusivamente componendo costrutti strutturati (D0,D1,D2,D3D0​,D1​,D2​,D3​).
- **8.4 Complessità di McCabe (Ciclomatica ed Essenziale)**
    - **Complessità Ciclomatica v(G)v(G) di McCabe:** Numero di cammini linearmente indipendenti nel programma (limite superiore ai casi di test). I 3 metodi di calcolo equivalenti:
        1. v(G)=e−n+2p(e=archi,n=nodi,p=componenti connesse, tipicamente 1)v(G)=e−n+2p(e=archi,n=nodi,p=componenti connesse, tipicamente 1)
            
        2. v(G)=Numero di Regioni delimitate dal grafo planarev(G)=Numero di Regioni delimitate dal grafo planare
            
        3. v(G)=π+1(π=numero di nodi predicativi)v(G)=π+1(π=numero di nodi predicativi)
            
    - **Complessità Essenziale ev(G)ev(G):** Misura del grado di non-strutturazione del flusso di controllo, ottenuta collassando i sottografi strutturati DiDi​: ev(G)=v(G)−m(m=sottografi strutturati eliminati)ev(G)=v(G)−m(m=sottografi strutturati eliminati) _Proprietà fondamentale:_ ev(G)=1⟺ev(G)=1⟺ il programma è perfettamente D-strutturato (privo di salti anomali / spaghetti code).

---

### 🧪 MODULO 9: Qualità del Software, SQA, Testing e Processi Aziendali (BPM)

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