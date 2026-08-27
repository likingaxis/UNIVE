# 📑 INDICE GENERALE DEFINITIVO: `IS UNICO SHORT`

### 🏛️ MODULO 1: Fondamenti, Economia e Affidabilità del Software
* **1.1 Definizione di Ingegneria del Software & Natura del Prodotto SW**
  * Definizione formale (IEEE / Fritz Bauer) e distinzione tra *Prodotto*, *Artefatto* e *Sistema Software*.
  * Differenza fondamentale tra deterioramento HW (curva a vasca da bagno *bathtub*) e invecchiamento SW (degrado dovuto a modifiche continue).
  * Ruoli: *Cliente, Sviluppatore, Utente finale*.
* **1.2 La Complessità del Software & Legge di Brooks**
  * Problemi **Essenziali** del software (*Complessità, Conformità, Modificabilità, Invisibilità*) vs Problemi **Accidentali** (*linguaggi, tool, IDE*).
  * Il principio *"No Silver Bullet"*.
* **1.3 Ciclo di Vita del Software & Costi di Manutenzione**
  * I 3 Stadi del ciclo di vita: *Sviluppo (le 6 fasi), Manutenzione, Dismissione*.
  * I **4 Tipi di Manutenzione**: *Correttiva* (~60% dei costi totali), *Adattiva*, *Perfettiva*, *Preventiva*.
  * **Regola 10-90**: Significato del *Core del software* (il 90% del tempo di esecuzione è speso nel 10% delle istruzioni).
  * Impatto esponenziale dei costi delle modifiche lungo le fasi del ciclo di vita.
* **1.4 Affidabilità, Disponibilità e Sistemi Critici**
  * Catena dell'errore: **Errore umano** $\to$ **Difetto (Defect / Bug)** $\to$ **Guasto (Failure)**.
  * Concetto di **Profilo Operativo (*Operational Profile*)** e perché l'affidabilità dipende dall'utente.
  * Metriche e Formule: $\text{MTBF}$ (*Mean Time Between Failures*), $\text{MTTR}$ (*Mean Time To Repair*), Tasso di guasto $\lambda$.
  * **Formula della Disponibilità (*Availability*)**:
    $$\text{Availability} = \frac{\text{MTBF}}{\text{MTBF} + \text{MTTR}}$$
  * Definizione di **Software Critico** (*Safety-critical* vs *Mission-critical*) e specifica dei requisiti di affidabilità come requisiti non funzionali.

---

### 🔄 MODULO 2: Modelli di Ciclo di Vita e Processi Software
* **2.1 Tassonomia dei Modelli di Ciclo di Vita Tradizionali**
  * *Build & Fix:* natura non ingegneristica, limiti e contesti d'uso.
  * *Modello Waterfall (a Cascata):* approccio sequenziale con verifica a fine fase; pregi, difetti, applicabilità (requisiti stabili e ben noti).
  * *Modello con Rapid Prototyping:* prototipo gettabile (*throwaway prototype*) per chiarire requisiti ambigui; vantaggi e rischi.
  * *Modello a Sviluppo Incrementale:* rilasci successivi parziali ma funzionanti; **Incrementale con Overall Architecture** vs **senza Overall Architecture** (e rischio di degrado architetturale).
* **2.2 Modello a Spirale di Boehm & Risk Management**
  * Struttura a 4 quadranti per ciclo: *1. Determinazione obiettivi/alternative/vincoli, 2. Valutazione alternative e analisi rischi, 3. Sviluppo e verifica, 4. Pianificazione ciclo successivo*.
  * **Processo di Risk Management (4 Fasi):**
    1. *Identificazione dei rischi* (tecnici, gestionali, operativi, esterni, di qualità).
    2. *Valutazione dei rischi:* Matrice $3 \times 3$ Probabilità / Impatto.
    3. *Prioritizzazione:* Principio di Pareto (80/20) e Diagramma a lisca di pesce (Ishikawa).
    4. *Pianificazione della mitigazione (Le 4 Strategie):* **Evitare**, **Ridurre**, **Trasferire**, **Accettare**.
    5. *Monitoraggio continuo e revisione*.
* **2.3 Modelli Concorrenti, Corporate e ad Oggetti**
  * Modello *Object-Oriented a Fontana* (fasi sovrapposte e iteratività) e *Concurrent Engineering*.
  * **Modello Microsoft (*Synchronize-and-Stabilize*):** Daily build, test continui in parallelo allo sviluppo, ciclo a 3 fasi (*Planning, Development in 3-4 milestone, Stabilization*).
  * Modello Netscape (approccio open source e rilascio rapido).
* **2.4 Metodologie Agili & Framework Scrum**
  * I 4 Valori cardine del Manifesto Agile.
  * **Framework Scrum:**
    * *Ruoli:* Product Owner, Scrum Master, Development Team.
    * *Eventi:* Sprint (1-4 settimane), Sprint Planning, Daily Scrum (15 min), Sprint Review, Sprint Retrospective.
    * *Artefatti:* Product Backlog, Sprint Backlog, Incremento potenzialmente rilasciabile.
    * *User Stories:* Struttura standard, Criteri INVEST, Story Points e Planning Poker, Burndown Chart.
* **2.5 Maturità del Processo: Capability Maturity Model (CMM)**
  * Misura della maturità dell'organizzazione software; I **5 Livelli CMM**:
    1. *Initial* (ad-hoc, caotico).
    2. *Repeatable / Managed* (controllo di base su costi e tempi).
    3. *Defined* (processi standardizzati e documentati a livello aziendale).
    4. *Quantitatively Managed* (misurazione quantitativa e controllo statistico).
    5. *Optimizing* (miglioramento continuo e innovazione).
  * Concetto di **KPA (*Key Process Areas*)**.
  * Certificazione dei processi e dei produttori software: Standard ISO 9001, ISO/IEC 12207, CMMI, Certificazioni professionali (CSDP, ISTQB).
26
---
27
### 📋 MODULO 3: Ingegneria dei Requisiti & Tecniche di Specifica
* **3.1 Tassonomia e Ingegneria dei Requisiti**
  * Definizione di Requisito Software; Requisiti **Utente** (linguaggio naturale) vs Requisiti di **Sistema** (documento formale/strutturato SRS).
  * Classificazione: Requisiti **Funzionali** vs **Non Funzionali** (di prodotto, di processo, esterni) vs Requisiti di **Dominio**. Esempi pratici.
  * Requisiti *Stabili* vs *Volatili*; Tecniche di specifica informale e il PDL (*Program Design Language*).
* **3.2 Tecniche di Specifica Semi-formali**
  * **ERD (*Entity-Relationship Diagram*):** Entità, Attributi, Relazioni e Molteplicità.
  * **DFD (*Data Flow Diagram*):** Processi (bolle), Flussi dati (frecce), Data Store (barre parallele), Entità Esterne (rettangoli); Livelli DFD (Context diagram, DFD 1, DFD 2).
  * **SSA (*Structured System Analysis*):** I **9 step** di decomposizione funzionale top-down (*stepwise refinement*).
* **3.3 Tecniche di Specifica Formali: Reti di Petri (Petri Net)**
  * Definizione formale della tupla $G = (P, T, A, w, M_0)$.
  * Componenti: **Posti $P$** (cerchi = condizioni/risorse), **Transizioni $T$** (barre/rettangoli = eventi), **Archi $A$** orientati con peso $w$, **Token** (puntini = marcatura/stato corrente $M$).
  * **Regola di Scatto (*Firing Rule*):**
    * *Abilitazione:* una transizione $t$ è abilitata sse $\forall p \in \text{input}(t), M(p) \ge w(p,t)$.
    * *Scatto:* consuma $w(p,t)$ token dai posti di input e genera $w(t,p)$ token nei posti di output.
  * Proprietà delle Reti di Petri: *Non determinismo*, *Liveness* (assenza di deadlock), *Boundedness / Safety* (capacità finita dei posti), *Reachability* (albero delle marcature raggiungibili).
  * Cenni ad altri formalismi: Finite State Machines (FSM) e Linguaggio Z (schemi basati su insiemi e logica del primo ordine).
---

### 🧩 MODULO 4: Analisi Orientata agli Oggetti (OOA) & UML
* **4.1 Principi OOA & Architettura BCE**
  * Filosofia di analisi OO; Il pattern **BCE**:
    * *Boundary Classes:* interfaccia verso utenti e sistemi esterni.
    * *Control Classes:* logica di coordinamento e controllo dei casi d'uso.
    * *Entity Classes:* modellazione dei dati persistenti e logica di business.
* **4.2 Modello Strutturale dei Dati: Class Diagram**
  * I **5 Approcci per l'identificazione delle Classi Entity**: *1. Noun Phrase Approach, 2. Common Class Patterns, 3. Use Case Driven, 4. CRC Cards (Class-Responsibility-Collaborator), 5. Approccio Misto*.
  * Criteri per stabilire quando un concetto merita di essere una classe o un semplice attributo.
  * Specifica delle classi: Attributi (visibilità `+,-,#,~`, tipi, valori di default, derived attributes `/attr`), Operazioni (firma e parametri).
  * Relazioni tra classi: Associazioni, Molteplicità (`0..1`, `1..*`, `*`), Ruoli, Dipendenze.
  * **Relazioni di Contenimento:**
    * **Aggregazione** (relazione *has-a* debole, parte condivisibile, ciclo di vita indipendente, rombo vuoto $\diamond$).
    * **Composizione** (relazione *is-part-of* forte, parte esclusiva, ciclo di vita coincidente, rombo pieno $\blacklozenge$).
  * **Generalizzazione ed Ereditarietà:** Relazione *is-a*, classi astratte, polimorfismo, principio di sostituibilità di Liskov (LSP).
  * Object Diagram: rappresentazione di istanze a runtime.
* **4.3 Modello Dinamico e Comportamentale in UML**
  * **Use Case Diagram:** Attori primari e secondari, Casi d'uso, Confine del sistema;
    * Relazione **`<<include>>`** (inclusione obbligatoria, riuso, freccia verso il caso incluso).
    * Relazione **`<<extend>>`** (estensione opzionale, condizione/extension point, freccia verso il caso base).
    * Specificare l'attivazione dei casi d'uso da parte dell'utente (*chi attiva chi*).
  * **Sequence Diagram vs Collaboration Diagram:**
    * Equivalenza semantica e interscambiabilità.
    * *Sequence Diagram:* enfasi sull'ordine temporale dei messaggi (linee di vita, activation bar, messaggi sincroni/asincroni).
    * *Collaboration Diagram:* enfasi sulla topologia e sulle relazioni strutturali tra oggetti (messaggi numerati progressivamente).
  * **State Diagram (Statechart di Harel):** Stati, Transizioni con sintassi `Evento [Guardia] / Azione`, Attività interne (`entry`, `do`, `exit`), Stati compositi e ortogonali.
  * **Activity Diagram:** Modellazione dei flussi procedurali, Azioni, Nodi di decisione/merge, Fork/Join per parallelismo, Swimlanes per ruoli e responsabilità.

---

### 📊 MODULO 5: Software Project Management, Pianificazione e Stime
* **5.1 Organizzazione del Team & Legge di Brooks**
  * **Legge di Brooks:** *"Aggiungere personale a un progetto in ritardo lo rende ancora più in ritardo"*; Crescita quadratica dei canali di comunicazione:
    $$C = \frac{n(n-1)}{2}$$
  * Modelli di team: *Chief Programmer Team* (centralizzato, alta gerarchia) vs *Team Democratico* (decentralizzato, decisioni collegiali, alta innovazione ma alto overhead).
* **5.2 Tecniche di Stima Dimensionale del Software (Size Estimation)**
  * **LOC (Lines of Code / KLOC):** Vantaggi, limiti e dipendenza dal linguaggio.
  * **Function Point Analysis (FPA):**
    1. Calcolo **UFC (*Unadjusted Function Points*)**: 2 componenti dati (*ILF, EIF*) + 3 componenti transazionali (*EI, EO, EQ*), ciascuno pesato per complessità (bassa, media, alta).
    2. Calcolo **TCF (*Technical Complexity Factor*)**: 14 fattori generali di sistema $F_j \in [0, 5]$:
       $$\text{TCF} = 0.65 + 0.01 \cdot \sum_{j=1}^{14} F_j \quad (\text{range } [0.65, 1.35], \text{ variazione } \pm 35\%)$$
    3. Formula finale:
       $$\text{FP} = \text{UFC} \times \text{TCF}$$
  * **Backfiring:** Conversione empirica tra FP e LOC tramite fattori di gearing per linguaggio.
* **5.3 Stima di Sforzo e Durata: Modello COCOMO di Boehm**
  * I 3 Livelli di dettaglio: *Basic*, *Intermediate*, *Advanced*.
  * Le 3 Modalità di sviluppo: *Organic* (piccolo, esperto), *Semi-detached* (medio), *Embedded* (critico, hardware vincolato).
  * **Formule di COCOMO:**
    * *Effort Nominale:* $\text{Effort}_{\text{nom}} = a \cdot (\text{KLOC})^b \quad [\text{Person-Months}]$
    * *Effort Effettivo (con i 15 Cost Drivers $c_i$):* $\text{Effort} = \text{Effort}_{\text{nom}} \cdot \prod_{i=1}^{15} c_i$
    * *Durata / Tempo di consegna:* $\text{Time} = c \cdot (\text{Effort})^d \quad [\text{Mesi}]$
* **5.4 Pianificazione Temporale & Documento SPMP**
  * Reti **PERT / CPM:** Calcolo dei tempi al più presto ($ES, EF$) e al più tardi ($LS, LF$); Identificazione del **Cammino Critico (*Critical Path*)** con slittamento nullo ($\text{Float} = LS - ES = 0$).
  * Diagramma di **Gantt:** Cronoprogramma a barre temporali e Milestone.
  * Struttura del documento **SPMP (*Software Project Management Plan*)** secondo standard IEEE 1058.
27
---
28
### 🏗️ MODULO 6: Progettazione Architetturale & Sistemi Distribuiti (OOD)
* **6.1 Principi Fondamentali di Progettazione**
  * Astrazione, Stepwise Refinement, Modularità.
  * **Information Hiding di Parnas:** Incapsulamento delle scelte implementative instabili dietro interfacce stabili.
  * **I 7 Livelli di Coesione Modulare (dal peggiore al migliore):**
    1. *Coincidenziale* $\to$ 2. *Logica* $\to$ 3. *Temporale* $\to$ 4. *Procedurale* $\to$ 5. *Comunicazionale* $\to$ 6. *Sequenziale* $\to$ 7. **Funzionale (Ottimale)**.
  * **I 5 Livelli di Accoppiamento / Coupling (dal peggiore al migliore):**
    1. *Content Coupling* $\to$ 2. *Common Coupling* $\to$ 3. *Control Coupling* $\to$ 4. *Stamp Coupling* $\to$ 5. **Data Coupling (Ottimale)**.
* **6.2 Tassonomia delle Architetture Centralizzate e Client/Server**
  * Architetture Centralizzate: *Mainframe-based* e *File-sharing*.
  * Architetture Client/Server: 2-Tier (*Fat Client* vs *Thin Client*), 3-Tier e N-Tier (separazione Presentation Layer, Business Logic Layer, Data Layer).
* **6.3 Architettura a Oggetti Distribuiti & ORB/CORBA**
  * Concetto di Oggetto Distribuito (ruolo simmetrico client/server).
  * **Object Request Broker (ORB):** Middleware per la trasparenza di locazione e di implementazione.
  * Meccanismi: Marshalling / Unmarshalling, Client Stub e Server Skeleton.
  * Standard CORBA e linguaggio IDL (*Interface Definition Language*).
* **6.4 Component-Based Architecture & Component Framework**
  * **Differenza Oggetto vs Componente:** Oggetti = entità runtime a grana fine basate su codice; Componenti = unità autonome a grana grossa, distribuibili e componibili a tempo di build/configurazione.
  * Proprietà: Riutilizzo *Black-Box*, Interfacce esplicite **Provided** ($-\circ$) e **Required** ($-\subset$).
  * **Component Framework:** Ruolo come infrastruttura generica per l'assemblaggio, coordinamento e fornitura di servizi di sistema ai componenti.
* **6.5 Architetture Service-Oriented (SOA) & Web Services**
  * Principi SOA: Disaccoppiamento, interoperabilità, orientamento ai servizi riusabili.
  * Stack Web Services: **SOAP** (protocollo XML su HTTP), **WSDL** (interfaccia XML del servizio), **UDDI** (registro/directory dei servizi).
  * Architettura **REST (*Representational State Transfer*):** Risorse con URI, stateless, verbi HTTP standard (*GET, POST, PUT, DELETE*), formati JSON/XML.
* **6.6 Pattern per Transazioni Distribuite**
  * Proprietà ACID; Protocollo **Two-Phase Commit (2PC)**: Fase 1 *Prepare* (raccolta voti), Fase 2 *Commit/Abort* globale.
  * *Compound Transaction Pattern*, *Long-Living Transaction Pattern*, *Negotiation Pattern*.

---

### 🎨 MODULO 7: OOD di Dettaglio & I Design Pattern GoF
* **7.1 Regole di Buon Design & Diagrammi di Dettaglio**
  * **Legge di Demetra (*Principle of Least Knowledge*):** Limitare l'invocazione di metodi solo a oggetti strettamente collegati (evitare concatenazioni `a.getB().getC().doIt()`).
  * Composite Structure Diagram (Parti, Porte, Connettori) e Deployment Diagram (Nodi, Dispositivi, Artefatti).
* **7.2 Classificazione dei Design Pattern GoF**
  * Definizione di Design Pattern e ruolo dei Framework.
  * Classificazione bidimensionale: Per **Scopo** (*Creazionali, Strutturali, Comportamentali*) $\times$ Per **Raggio d'azione** (*Basati su Classi [ereditarietà statica] vs Basati su Oggetti [composizione/delega dinamica]*).
* **7.3 Gli 8 Design Pattern Fondamentali del Corso:**
  1. **Abstract Factory** *(Creazionale su Oggetti):* Creazione di famiglie di oggetti correlati o dipendenti senza specificare le classi concrete (es. look & feel multi-piattaforma).
  2. **Factory Method** *(Creazionale su Classi):* Interfaccia di creazione di un oggetto che delega alle sottoclassi la scelta della classe concreta da istanziare.
  3. **Adapter** *(Strutturale su Classi e su Oggetti):* Convertire l'interfaccia di una classe in un'altra attesa dal client;
     * **Class Adapter:** usa ereditarietà multipla; è statico e rigido.
     * **Object Adapter:** usa composizione/delega; è dinamico, flessibile e adatta un'intera gerarchia.
  4. **Composite** *(Strutturale su Oggetti):* Strutture ad albero gerarchiche parte-tutto; trattamento uniforme di oggetti singoli (`Leaf`) e compositi (`Composite`) tramite l'interfaccia `Component`.
  5. **Decorator** *(Strutturale su Oggetti):* Aggiunta dinamica e trasparente di responsabilità aggiuntive a un oggetto a runtime (alternativa flessibile al subclassing).
  6. **Observer** *(Comportamentale su Oggetti):* Dipendenza 1-a-molti (Publish-Subscribe); notifica automatica a tutti gli osservatori registrati quando cambia lo stato del soggetto.
  7. **Template Method** *(Comportamentale su Classi):* Scheletro invariante di un algoritmo nella classe base, con singoli passi variabili ridefiniti nelle sottoclassi concrete.
  8. **Strategy** *(Comportamentale su Oggetti):* Famiglia di algoritmi incapsulati in classi separate, resi intercambiabili a runtime tramite polimorfismo.
28
---
29
### 📐 MODULO 8: Metriche del Software & Misura della Complessità
* **8.1 Metriche di Struttura Modulare (Structure Chart)**
  * Rappresentazione ad albero/grafo $S = \{N, R\}$.
  * **Tree Impurity:** Deviazione della struttura da un albero puro (presenza di nodi condivisi o cicli).
  * **Misura del Riuso Interno di Yin & Winchester:**
    $$r(G) = e - n + 1 \quad (e = \text{archi/chiamate}, n = \text{nodi/moduli})$$
* **8.2 Metriche di Information Flow (Henry & Kafura)**
  * Definizione di **Fan-In** (moduli chiamanti / flussi dati in ingresso) e **Fan-Out** (moduli chiamati / flussi dati in uscita).
  * **Formula di Complessità Modulare di Henry & Kafura:**
    $$\text{IF}(M) = \text{Length}(M) \times (\text{Fan-In}(M) \times \text{Fan-Out}(M))^2$$
  * Interpretazione ingegneristica di Fan-In e Fan-Out elevati.
* **8.3 Misure su Control Flowgraph (CFG) & Programmazione Strutturata**
  * Modellazione del flusso di controllo: Nodi sequenziali, Nodi predicativi, Archi di controllo.
  * Costrutti strutturati di base: Sequenza, Selezione, Iterazione.
  * **Flowgraph Primi:** Grafi non ulteriormente decomponibili tramite sequenza o nesting.
  * **D-Structuredness:** Programmi generabili esclusivamente componendo costrutti strutturati ($D_0, D_1, D_2, D_3$).
* **8.4 Complessità di McCabe (Ciclomatica ed Essenziale)**
  * **Complessità Ciclomatica $v(G)$ di McCabe:** Numero di cammini linearmente indipendenti nel programma (limite superiore ai casi di test). I 3 metodi di calcolo equivalenti:
    1. $$v(G) = e - n + 2p \quad (e = \text{archi}, n = \text{nodi}, p = \text{componenti connesse, tipicamente } 1)$$
    2. $$v(G) = \text{Numero di Regioni delimitate dal grafo planare}$$
    3. $$v(G) = \pi + 1 \quad (\pi = \text{numero di nodi predicativi})$$
  * **Complessità Essenziale $ev(G)$:** Misura del grado di non-strutturazione del flusso di controllo, ottenuta collassando i sottografi strutturati $D_i$:
    $$ev(G) = v(G) - m \quad (m = \text{sottografi strutturati eliminati})$$
    *Proprietà fondamentale:* $ev(G) = 1 \iff$ il programma è perfettamente D-strutturato (privo di salti anomali / spaghetti code).

---

### 🧪 MODULO 9: Qualità del Software, SQA, Testing e Processi Aziendali (BPM)
* **9.1 Modelli di Qualità del Software & SQA**
  * **Quality Model di McCall (Triangolo della Qualità):**
    * *Product Operation:* Correttezza, Affidabilità, Efficienza, Integrità, Usabilità.
    * *Product Revision:* Manutenibilità, Flessibilità, Testabilità.
    * *Product Transition:* Portabilità, Riusabilità, Interoperabilità.
    * Distribuzione delle attività lungo l'asse temporale del ciclo di vita.
  * **Standard IEEE 1061 (*Software Quality Metrics Methodology*):** Struttura gerarchica a 4 livelli (*Obiettivi $\to$ Fattori $\to$ Subfattori $\to$ Metriche*).
  * **SQA (*Software Quality Assurance*):** Obiettivi, ruoli, auditing formale e piani di qualità.
* **9.2 Verifica, Validazione & Strategie di Testing**
  * Definizione di Boehm: **Verifica** (*"Stiamo costruendo il prodotto nel modo giusto?"*) vs **Validazione** (*"Stiamo costruendo il prodotto giusto?"*).
  * **Validation Testing** (dimostrare la conformità) vs **Defect Testing** (provocare intenzionalmente guasti per scovare bug latenti).
  * **Politiche di Black-Box Testing (Funzionale):**
    * *Equivalence Partitioning:* Partizioni valide e non valide del dominio di input.
    * *Boundary Value Analysis:* Test sui valori limite ($min, min+1, max-1, max$).
    * *Acceptance Testing / UAT:* Collaudo di accettazione finale per software a contratto.
  * **Politiche di White-Box Testing (Strutturale):**
    * Criteri di copertura: *Statement Coverage*, *Branch Coverage*, **Path Testing** (copertura dei cammini indipendenti guidata da $v(G)$ di McCabe).
  * **Livelli e Tipologie di Testing:**
    * *Unit Testing*, *Integration Testing* (**Top-Down con Stubs** vs **Bottom-Up con Drivers**), *Interface Testing*, *System Testing*, *Stress Testing*.
    * *Object-Oriented Testing:* Sfide dell'incapsulamento e dell'ereditarietà; *Cluster Testing*.
* **9.3 Business Process Management (BPM) & Notazione BPMN**
  * Definizione di Processo di Business e obiettivi del BPM.
  * Ciclo di vita BPM (*Identification, Discovery, Analysis, Redesign, Implementation, Monitoring*).
  * **Elementi Grafici Fondamentali di BPMN:**
    * *Eventi (Cerchi):* Start Event, Intermediate Event, End Event.
    * *Attività / Task (Rettangoli arrotondati):* Unità di lavoro atomiche.
    * *Gateway (Rombi):* **Exclusive Gateway (XOR, $\times$)**, **Parallel Gateway (AND, $+$)**, **Inclusive Gateway (OR, $\circ$)**.
    * *Flussi:* Sequence Flow (linea continua), Message Flow (linea tratteggiata tra pool).
    * *Swimlanes:* **Pool** (processi/attori indipendenti) e **Lane** (ruoli interni a una pool).
29


30 31 per ripetere tutto