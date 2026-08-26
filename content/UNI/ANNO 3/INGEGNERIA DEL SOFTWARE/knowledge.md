# KNOWLEDGE BASE: INGEGNERIA DEL SOFTWARE (ISW)
> **Target:** LLM Context Injection / Memory Preservation for fast, deep, high-precision assistance.
> **Corso:** Ingegneria del Software (Anno 3, Laurea Triennale in Ingegneria Informatica, UniRoma2).
> **Obiettivo Operativo:** Supportare la redazione di `IS UNICO SHORT.md`, generare risposte pronte per l'orale, mantenere consistenza concettuale e massima densità informativa.

---

## 🧭 1. DOMAIN METADATA & STILE DELL'ESAME ORALE

### Profilo Docente & Dinamica dell'Interrogazione
1. **Struttura a Macro-Argomento:** L'orale parte sempre da una domanda aperta su un tema ampio (*"Parlami del modello a spirale"*, *"Come si calcola la complessità ciclomativa?"*, *"Cosa sono i Component Framework?"*).
2. **Discesa nel Dettaglio Tecnico:** Dalla macro-definizione, il docente scende verticalmente su formule matematiche, variabili, passaggi algoritmici, regole di scatto o notazioni UML.
3. **Confronti e Trade-off:** Richiesta sistematica di differenze (*Class Adapter vs Object Adapter*, *Black-Box vs White-Box*, *Include vs Extend*, *Waterfall vs Spirale*, *LOC vs FP*, *Con vs Senza Overall Architecture*).
4. **Collegamento al Progetto d'Esame:** Richiesta di contestualizzare le nozioni teoriche sulle scelte fatte nel progetto (es. esempi di requisiti non funzionali, diagrammi dei casi d'uso, gestione eccezioni).

### Regole di Generazione per l'Assistente AI
- **Densità Massima:** Niente riempitivi, frasi di circostanza o discorsi generici.
- **Formule in KaTeX:** Esplicitare sempre tutte le variabili e il loro dominio.
- **Struttura Standard della Risposta:**
  1. *Definizione Formale & Scopo Architetturale* (1-2 righe).
  2. *Struttura / Componenti / Meccanismi Interni*.
  3. *Formule / Regole / Diagrammi*.
  4. *Confronti, Trade-off & Applicabilità*.
- **Scope Delimitation:** 
  - **In-Scope:** I 9 Moduli Core (vedi sotto).
  - **Out-of-Scope (Non includere nei riassunti short):** *17-M&S Intro* e *18-BP simulation* (argomenti seminariali/fuori esame orale); frammenti di codice implementativo Java/C++ prolissi (bastano le firme e i pattern dei partecipanti).

---

## 📐 2. FORMULARIO E SCHEMI MATEMATICI CRUCIALI

### 1. Legge Quadratica del Costo & Giustificazione della Modularità
$$C = a \cdot S^2$$
- $C$ = costo/sforzo di sviluppo; $S$ = dimensione/complessità del software (LOC); $a$ = costante di produttività.
- **Dimostrazione del Vantaggio Modulare:** Scomponendo un monolite di taglia $S$ in due moduli indipendenti di taglia $S/2$:
  $$C_{\text{scomposto}} = a \left(\frac{S}{2}\right)^2 + a \left(\frac{S}{2}\right)^2 = \frac{a S^2}{4} + \frac{a S^2}{4} = \frac{a S^2}{2} = \frac{1}{2} C_{\text{monolitico}}$$
  *(La modularizzazione dimezza formalmente i costi di sviluppo)*.
- **Repliche:** costo marginale di copia nullo ($C \approx 0$).

### 2. Disponibilità del Software (Availability)
$$\text{Availability} = \frac{\text{MTBF}}{\text{MTBF} + \text{MTTR}}$$
- **MTBF (Mean Time Between Failures):** Tempo medio tra due guasti consecutivi.
- **MTTR (Mean Time To Repair):** Tempo medio necessario per ripristinare il sistema.
- **Catena dell'Anomalia:** $\text{Errore umano} \to \text{Difetto (Defect/Bug statico)} \to \text{Guasto (Failure dinamico a runtime)}$.

### 3. Function Point Analysis (FPA - Stima Dimensione)
$$\text{FP} = \text{UFC} \times \text{TCF}$$
- **UFC (Unadjusted Function Points):** Somma pesata di 5 componenti:
  - *Dati:* **ILF** (Internal Logical Files), **EIF** (External Interface Files).
  - *Transazioni:* **EI** (External Inputs), **EO** (External Outputs), **EQ** (External Inquiries).
- **TCF (Technical Complexity Factor):** Calcolato su 14 fattori $F_j \in [0, 5]$:
  $$\text{TCF} = 0.65 + 0.01 \cdot \sum_{j=1}^{14} F_j \quad \Longrightarrow \quad \text{TCF} \in [0.65, 1.35] \quad (\pm 35\%)$$
- **Backfiring:** Conversione empirica $\text{LOC} = \text{FP} \times \text{Gearing Ratio}(\text{Linguaggio})$.

### 4. Modello Algoritmico COCOMO (Boehm)
- **Livelli:** *Basic*, *Intermediate*, *Advanced*.
- **Modalità di Sviluppo:** *Organic* (piccolo, esperto), *Semi-detached* (medio), *Embedded* (critico, vincolato).
- **Formule:**
  $$\text{Effort}_{\text{nom}} = a \cdot (\text{KLOC})^b \quad [\text{Person-Months / Uomo-Mesi}]$$
  $$\text{Effort} = \text{Effort}_{\text{nom}} \cdot \prod_{i=1}^{15} c_i \quad (c_i = \text{Cost Drivers})$$
  $$\text{Time} = c \cdot (\text{Effort})^d \quad [\text{Mesi}]$$

### 5. Riuso Interno di Yin & Winchester (Structure Chart)
$$r(G) = e - n + 1$$
- $e$ = numero di archi (invocazioni tra moduli); $n$ = numero di nodi (moduli).
- Struttura modulare $S = \{N, R\}$. *Tree Impurity* misura lo scostamento da un albero puro (radice unica, nodi con un solo padre).

### 6. Information Flow di Henry & Kafura
$$\text{IF}(M) = \text{Length}(M) \times (\text{Fan-In}(M) \times \text{Fan-Out}(M))^2$$
- **Fan-In:** Numero di moduli chiamanti o flussi dati in ingresso a $M$.
- **Fan-Out:** Numero di moduli chiamati o flussi dati in uscita da $M$.
- **Length(M):** Dimensione del modulo (es. LOC o istruzioni).

### 7. Complessità di McCabe sui Control Flowgraph (CFG)
- **Complessità Ciclomatica $v(G)$:** (Numero di cammini linearmente indipendenti):
  $$v(G) = e - n + 2p = \text{Regioni del Grafo Planare} = \pi + 1$$
  - $e$ = archi; $n$ = nodi; $p$ = componenti connesse (solitamente $p=1$); $\pi$ = nodi predicativi (biforcazioni binarie).
- **Complessità Essenziale $ev(G)$:**
  $$ev(G) = v(G) - m$$
  - $m$ = numero di sottografi strutturati ($D_0, D_1, D_2, D_3$) collassati.
  *Teorema:* $ev(G) = 1 \iff$ il programma è perfettamente **D-strutturato** (privo di salti anomali / spaghetti code).

### 8. Canali di Comunicazione del Team (Legge di Brooks)
$$C = \frac{n(n-1)}{2}$$
- Enunciato: *"Aggiungere sviluppatori a un progetto in ritardo lo rende ancora più in ritardo"* a causa dell'overhead di training e della crescita quadratica dei canali di comunicazione.

---

## 🏛️ 3. MAPPA COMPLETA DEI 9 MODULI DEL CORSO

### MODULO 1: Fondamenti, Economia e Affidabilità
- **Brooks No Silver Bullet (1986):** Problemi **Essenziali** (*Complessità, Conformità, Cambiabilità/Malleabilità, Invisibilità*) vs Problemi **Accidentali** (*linguaggi, IDE, strumenti*).
- **Aspetti Economici:** Legge $C = a S^2$, vantaggio matematico della modularità, repliche a costo marginale nullo.
- **Ciclo di Vita:** 3 Stadi (*Sviluppo [6 fasi: Requisiti, Specifica, Pianificazione, Progetto, Codifica, Integrazione], Manutenzione, Dismissione*).
- **Manutenzione:** *Correttiva* (~60% costi totali del ciclo di vita), *Adattiva*, *Perfettiva*, *Preventiva*.
- **Regola 10-90:** Il 90% del tempo di CPU è consumato dal 10% del codice (*core*).
- **Affidabilità & Disponibilità:** *Operational Profile*, formula di $\text{Availability}$, *Software Critico* (Safety-critical vs Mission-critical).

### MODULO 2: Modelli di Processo e Ciclo di Vita
- **Modelli Tradizionali:**
  - *Build & Fix:* non ingegneristico, sviluppo $\to$ modifiche fino a soddisfazione $\to$ *Operations mode* (produzione) con feedback $\to$ *Retirement*.
  - *Waterfall:* sequenziale rigido; blocchi: *Requirements* $\to$ *Specification* $\to$ *Design phase* (Architetturale + Dettagliato con `Verify`) $\to$ *Implementation* (con `Test` unitario) $\to$ *Integration phase* (Integration/System test con `Test`) $\to$ *Operations mode*.
  - *Rapid Prototyping:* prototipo gettabile (*throwaway prototype*) per chiarire requisiti ambigui.
- **Modello a Sviluppo Incrementale:**
  - *Concurrent activities:* *Specification, Development e Validation* avvengono in parallelo su build diversi.
  - **Incrementale con Overall Architecture:** si progetta l'architettura globale a monte (moduli, interfacce, DB); ogni build sviluppa un incremento. Pro: integrazione solida, no spaghetti code, parallelismo sicuro; Contro: overhead iniziale.
  - **Incrementale senza Overall Architecture:** si parte subito dai requisiti prioritari. Pro: rapido all'inizio; Contro: grave rischio di incompatibilità architetturali e costi crescenti.
  - *Curva dei Costi:* costo delle build decresce con più incrementi, costo di integrazione cresce $\to$ regione di costo minimo.
- **Modello a Spirale di Boehm:** 4 quadranti per iterazione (*Obiettivi/Vincoli $\to$ Analisi Rischi $\to$ Sviluppo/Verifica $\to$ Pianificazione*).
- **Risk Management (4 Fasi):** Identificazione $\to$ Valutazione (Matrice $3 \times 3$) $\to$ Mitigazione (**Evitare, Ridurre, Trasferire, Accettare**) $\to$ Monitoraggio continuo.
- **Corporate & Agili:** Modello Microsoft (*Synchronize-and-Stabilize*, daily build, 3 fasi: planning, development in milestone, stabilization); *Scrum* (Ruoli: PO, SM, Dev; Eventi: Sprint, Planning, Daily, Review, Retro; Artefatti: Backlog, Increment; User Stories INVEST); *CMM* (5 livelli: Initial $\to$ Repeatable $\to$ Defined $\to$ Managed $\to$ Optimizing + KPA).

### MODULO 3: Requisiti & Specifiche (Semi-formali e Formali)
- **Requisiti:** *Utente* (linguaggio naturale) vs *Sistema* (SRS); *Funzionali* vs *Non Funzionali* (prodotto/affidabilità/prestazioni, processo, esterni) vs *Dominio*. Esempio principe non funzionale: specifica di affidabilità quantitativa ($\text{Availability} \ge 99.95\%$).
- **Semi-formali:** ERD, DFD (livelli 0, 1, 2), **SSA (Structured System Analysis in 9 step)**.
- **Reti di Petri (Petri Net):** $G = (P, T, A, w, M_0)$. Cerchi = Posti; Barre = Transizioni; Puntini = Token. Regola di scatto (abilitazione e consumo/generazione token). Proprietà: *Non determinismo, Liveness (no deadlock), Boundedness/Safety, Reachability*.

### MODULO 4: Analisi Orientata agli Oggetti (OOA) & UML
- **Pattern BCE:** *Boundary* (interfaccia/attori), *Control* (coordinamento logica), *Entity* (dati persistenti).
- **Class Diagram:** 5 Metodi identificazione classi (*Noun Phrase, Common Patterns, Use Case Driven, CRC, Misto*). Associazioni, Molteplicità, **Aggregazione** (debole $\diamond$) vs **Composizione** (forte $\blacklozenge$), Generalizzazione (*is-a*, Liskov).
- **Modello Dinamico:**
  - *Use Case:* `<<include>>` (obbligatorio, riuso) vs `<<extend>>` (opzionale con extension point).
  - *Sequence vs Collaboration Diagram:* Equivalenza semantica; Sequence = asse temporale verticale; Collaboration = topologia/relazioni con messaggi numerati.
  - *State Diagram:* Stati, Transizioni `Evento [Guardia] / Azione`, `entry/do/exit`. Activity Diagram (fork/join, swimlanes).

### MODULO 5: Software Project Management, Pianificazione e Stime
- **Organizzazione Team:** Legge di Brooks ($C = n(n-1)/2$), *Chief Programmer Team* vs *Team Democratico*.
- **Stime:** LOC vs Function Point (UFC + 14 TCF); Backfiring; COCOMO (Basic, Intermediate, Advanced; Organic, Semi-detached, Embedded).
- **Pianificazione:** Reti PERT/CPM (Cammino Critico con $\text{Float} = 0$), Diagramma di Gantt, Documento SPMP (IEEE 1058).

### MODULO 6: Progettazione Architetturale & Sistemi Distribuiti (OOD)
- **Principi:** Information Hiding (Parnas). **Coesione (7 livelli):** Coincidenziale $\to$ Logica $\to$ Temporale $\to$ Procedurale $\to$ Comunicazionale $\to$ Sequenziale $\to$ **Funzionale**. **Coupling (5 livelli):** Content $\to$ Common $\to$ Control $\to$ Stamp $\to$ **Data**.
- **Architetture:** Centralizzate (Mainframe, File sharing); Client/Server (2-tier, 3-tier, N-tier).
- **Oggetti Distribuiti & ORB/CORBA:** Trasparenza di locazione/implementazione, Marshalling/Unmarshalling, Stub/Skeleton, IDL.
- **Component Framework:** Oggetti (runtime, grana fine) vs Componenti (statici, modulari, black-box); Interfacce *Provided* ($-\circ$) e *Required* ($-\subset$). Framework come infrastruttura di supporto.
- **SOA & Web Services:** SOAP (XML su HTTP), WSDL (interfaccia), UDDI (registro), REST (stateless, URI, verbi HTTP).
- **Transazioni:** ACID, **Two-Phase Commit (2PC)**: Fase 1 *Prepare* + Fase 2 *Commit/Abort*. Pattern: Compound, Long-Living.

### MODULO 7: OOD di Dettaglio & I Design Pattern GoF
- **Regole:** Legge di Demetra (*Principle of Least Knowledge*).
- **Classificazione GoF:** Scopo (*Creazionali, Strutturali, Comportamentali*) $\times$ Raggio d'azione (*Classi vs Oggetti*).
- **I Fondamentali 8 Pattern:**
  1. **Abstract Factory** (Creaz./Ogg.): Famiglie di oggetti coerenti senza esporre classi concrete.
  2. **Factory Method** (Creaz./Classi): Interfaccia di creazione delegando alle sottoclassi cosa istanziare.
  3. **Adapter** (Strutt.): Converte interfacce incompatibili. **Class Adapter** (ereditarietà multipla, statico) vs **Object Adapter** (composizione, dinamico, più classi).
  4. **Composite** (Strutt./Ogg.): Albero gerarchico parte-tutto, trattamento uniforme di foglia e nodo (`Component`).
  5. **Decorator** (Strutt./Ogg.): Aggiunta dinamica di responsabilità (alternativa al subclassing).
  6. **Observer** (Comport./Ogg.): Publish-Subscribe 1-a-molti, notifica automatica al cambio di stato.
  7. **Template Method** (Comport./Classi): Scheletro invariante di algoritmo con passi variabili nelle sottoclassi.
  8. **Strategy** (Comport./Ogg.): Famiglia di algoritmi intercambiabili a runtime tramite interfaccia comune.

### MODULO 8: Metriche del Software & Misura della Complessità
- **Structure Chart:** Grafo $S = \{N, R\}$; *Tree Impurity*; Riuso di Yin & Winchester: $r(G) = e - n + 1$.
- **Information Flow (Henry & Kafura):** $\text{IF}(M) = \text{Length}(M) \times (\text{Fan-In} \times \text{Fan-Out})^2$.
- **Flowgraph & McCabe:** Complessità Ciclomatica $v(G) = e - n + 2p = \pi + 1 = \text{Regioni}$; Complessità Essenziale $ev(G) = v(G) - m$ ($ev(G)=1 \iff$ D-strutturato).

### MODULO 9: Qualità del Software, SQA, Testing e BPM
- **Qualità:** **Modello McCall (Triangolo):** *Product Operation* (uso quotidiano), *Product Revision* (manutenzione correttiva), *Product Transition* (evoluzione/riuso). Standard **IEEE 1061** (Obiettivi $\to$ Fattori $\to$ Subfattori $\to$ Metriche). SQA e auditing.
- **Testing:** Verifica (*"costruiamo bene il prodotto?"*) vs Validazione (*"costruiamo il prodotto giusto?"*); Validation Testing vs Defect Testing.
- **Black-Box:** *Equivalence Partitioning* (classi valide/non valide), *Boundary Value Analysis*, *Acceptance Testing (UAT)* per contratti.
- **White-Box:** Statement, Branch, **Path Testing** (guidato da $v(G)$ di McCabe).
- **Livelli:** Unit, Integration (*Top-down con stubs* vs *Bottom-up con drivers*), Interface, Stress, Object-Oriented (*Cluster Testing*).
- **BPM & BPMN:** Processi di business; BPMN: Eventi (cerchi), Task (rettangoli), Gateway XOR/AND/OR (rombi), Pool e Lane.

---

## ⚡ 4. CONFRONTI CRUCIALI RICORRENTI AGLI ESAMI

| Argomento A | Argomento B | Differenza Chiave da Esporre all'Orale |
| :--- | :--- | :--- |
| **Incr. con Overall Arch.** | **Incr. senza Overall Arch.** | Con OA: progettazione architettura globale a monte $\to$ integrazione solida, no degrado architetturale, ma overhead iniziale. Senza OA: partenza immediata sul primo build $\to$ grave rischio di incompatibilità e complessità esponenziale nei build successivi. |
| **Top-Down Integration** | **Bottom-Up Integration** | Top-Down parte dai moduli di alto livello e usa **Stubs** (moduli fantoccio) per simulare quelli inferiori mancanti; Bottom-Up parte dai moduli foglia e usa **Drivers** (moduli chiamanti) per testare i componenti base. |
| **Class Adapter** | **Object Adapter** | Class Adapter usa ereditarietà multipla (statico, vincolato a 1 sola classe); Object Adapter usa composizione/delega (dinamico, adatta una classe e tutte le sue sottoclassi). |
| **Abstract Factory** | **Factory Method** | Factory Method crea *un singolo prodotto* delegando a un metodo virtuale nelle sottoclassi; Abstract Factory crea *famiglie intere di prodotti correlati* tramite un oggetto factory separato. |
| **`<<include>>`** | **`<<extend>>`** | `<<include>>` è obbligatorio e incondizionato (la freccia punta all'incluso); `<<extend>>` è opzionale, si attiva solo su extension point/condizione (la freccia punta al caso base). |
| **Sequence Diagram** | **Collaboration Diagram** | Entrambi descrivono interazioni tra oggetti: Sequence modella l'ordine cronologico (tempo verticale); Collaboration modella la topologia dei collegamenti strutturali con messaggi numerati. |
| **Aggregazione** | **Composizione** | Aggregazione ($\diamond$) è una relazione parte-tutto debole con cicli di vita indipendenti (la parte può esistere senza il tutto); Composizione ($\blacklozenge$) è forte con ciclo di vita coincidente (se muore il tutto, muoiono le parti). |
| **Black-Box Testing** | **White-Box Testing** | Black-Box ignora il codice e deriva i test dalle specifiche funzionali (cosa fa); White-Box analizza la struttura del codice e garantisce copertura dei cammini (come lo fa). |
| **Verifica** | **Validazione** | Verifica = conformità alle specifiche di fase (*"Stiamo costruendo il software nel modo corretto?"*); Validazione = rispondenza ai bisogni reali dell'utente (*"Stiamo costruendo il software corretto?"*). |
| **Oggetto** | **Componente** | Oggetto = entità runtime a grana fine definita da classi; Componente = unità autonoma di deploy e composizione a grana grossa con interfacce Provided/Required esplicite. |