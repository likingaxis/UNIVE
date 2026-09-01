# Ripasso mirato ISW — punti deboli emersi nella ripetizione dei 9 moduli

> Obiettivo: usare questo file come base per il ripasso del 31 agosto.
> Priorità: prima i punti **rossi**, poi i **gialli**. I verdi non vanno ristudiati da zero.
> Criteri:
> - 🔴 = blocco, inversione concettuale o necessità di leggere parecchio
> - 🟡 = concetto ricordato solo in parte / dopo suggerimento / con qualche confusione
> - 🟢 = risposta autonoma buona, da richiamare solo velocemente

## Modulo 1 — Fondamenti, ciclo di vita, affidabilità

### 🔴 / 🟡 da rivedere
- 🟡 **Problemi essenziali vs accidentali**
  - Hai invertito inizialmente i due concetti.
  - Essenziali = intrinseci al software.
  - Accidentali = legati a strumenti/metodi e riducibili con strumenti migliori.
  - Quattro essenziali: **Complessità, Conformità, Cambiabilità, Invisibilità**.
- 🟡 **Formula del costo**
  - `C = aS²`
  - `a` non è numero di membri del team né effort: è una costante legata al contesto/produttività.
  - Se S raddoppia, C quadruplica.
- 🟡 **Costo del prodotto vs costo di produzione**
  - Costo del prodotto = sviluppo.
  - Costo di produzione/copertura di copie = molto basso nel software.
- 🟡 **Motivo dell’aumento del costo delle modifiche tardive**
  - Una modifica tardiva impatta specifica, design, codice, test, documentazione, integrazione.
- 🟡 **Software critico**
  - Safety-critical = rischio per sicurezza/vite.
  - Mission-critical = blocco di attività essenziali/missione.
- 🟡 **Reliability requirement**
  - È un requisito non funzionale.
  - Va espresso in modo misurabile: availability, MTBF, failure rate, ecc.
- 🟡 **Error → Defect → Failure**
  - Error = errore umano.
  - Defect = anomalia nel prodotto.
  - Failure = comportamento osservabile errato quando il difetto viene attivato.
- 🟡 **Reliability vs Availability**
  - Reliability = probabilità di funzionare correttamente per un intervallo di tempo.
  - Availability = probabilità/percentuale di essere disponibile.
  - `Availability = MTBF / (MTBF + MTTR)`.

### 🟢 abbastanza solidi
- Ciclo di vita: sviluppo → manutenzione → dismissione.
- 6 fasi sviluppo: requisiti → specifica → pianificazione → progettazione → codifica → integrazione.
- Regola 10-90.
- Operational Profile.
- Durata del prodotto software.
- Manutenzione correttiva / perfettiva / preventiva.

## Modulo 2 — Modelli di ciclo di vita, Agile, Scrum, CMM, rischi

### 🔴 / 🟡 da rivedere
- 🟡 **Waterfall**: verifica a fine fase; limite chiave = rigidità e cambiamenti dei requisiti.
- 🟡 **Rapid Prototyping**: nel corso soprattutto throw-away per chiarire/validare requisiti.
- 🟡 **Incrementale senza Overall Architecture**: non significa senza requisiti; manca l’architettura globale.
- 🟡 **Spiral / Boehm**: risk-driven; può portare a fermare il progetto; adatto ad alto rischio/interno; meno adatto a contratto.
- 🟡 **Microsoft Synchronize-and-Stabilize**: Milestone ≠ Stabilization.
- 🟡 **Scrum**: Product Backlog → Sprint Planning → Sprint Backlog → Daily Scrum → Sprint Review → Sprint Retrospective → Increment.
- 🟡 **CMM**
  - 1 Initial
  - 2 Repeatable = pratiche base PM
  - 3 Defined = standardizzato/documentato
  - 4 Managed = misurazione quantitativa
  - 5 Optimizing = miglioramento continuo / defect prevention
  - KPA: 18 complessive, dal livello 2 in poi.
- 🟡 **Risk Management**
  - Project / Product / Business.
  - Identification → Analysis → Planning → Monitoring.
  - Avoidance / Minimization / Contingency.

### 🟢 abbastanza solidi
- Build & Fix.
- Agile vs tradizionali.
- Valori base del Manifesto Agile.
- Team Scrum.

## Modulo 3 — Requirements Engineering, specifiche, Petri Net

### 🔴 / 🟡 da rivedere
- 🔴 **Requirements Engineering — sequenza attività**
  - **Feasibility Study → Elicitation & Analysis → Specification → Validation → Requirements Management**
- 🟡 **Requirements Specification**: fase del RE che formalizza/organizza i requisiti nel documento di specifica.
- 🟡 **User vs System Requirements**: user = alto livello; system = più dettagliati e precisi.
- 🟡 **Requirements Validation**: validità, consistenza, completezza, fattibilità, verificabilità.
- 🟡 **Functional / Non-functional**: servizi/comportamenti vs proprietà/vincoli.
- 🟡 **Stable / Volatile**: Mutable / Emergent / Consequential / Compatibility.
- 🟡 **PDL**.
- 🔴 **Petri Net — proprietà**
  - Non determinism = più transizioni abilitate, scelta non necessariamente unica.
  - Liveness = niente deadlock permanente.
  - Boundedness = esiste un limite massimo ai token nei place.
  - Reachability = marcatura raggiungibile da M0.
- 🟡 **Petri Net — firing rule**: ogni input place deve avere almeno tanti token quanto il peso dell’arco.
- 🟡 **FSM**: stato esplicito; nelle Petri lo stato è implicito nella marcatura.

### 🟢 abbastanza solidi
- ERD, DFD, SSA, Z, uso delle specifiche formali nei software critici.

## Modulo 4 — OOA/OOD e UML

### 🔴 / 🟡 da rivedere
- 🟡 **OOA vs OOD**: OOA = COSA; OOD = COME.
- 🟡 **Principi OO**: Information Hiding, Abstraction, Inheritance, Polymorphism.
- 🔴 **Include / Extend**
  - `A <<include>> B` = A include obbligatoriamente B.
  - `A <<extend>> B` = A estende opzionalmente B.
- 🟡 **Composition vs Aggregation**: rombo pieno = dipendenza di vita; rombo vuoto = parte indipendente.
- 🟡 **State Diagram**: stato dello stesso oggetto.
- 🟡 **Object Diagram**: snapshot runtime di istanze e link.
- 🟡 **BCE**: Boundary / Control / Entity; Entity = classi di dominio/dati persistenti.
- 🟡 **Identificazione Entity Class**: Noun Phrase / Common Class Patterns / CRC / Mixed.

### 🟢 abbastanza solidi
- UML, Class, Activity, Sequence, Collaboration/Communication, Package.

## Modulo 5 — Project Management, stime, COCOMO, PERT/Gantt

### 🔴 / 🟡 da rivedere
- 🟡 **4P**: People / Product / Process / Project.
- 🟡 **Team models**: Democratic/Egoless vs Chief Programmer.
- 🟡 **Tre approcci di stima**: Analogia / Decomposizione / Empirico-algoritmico.
- 🟡 **LOC**: Effort = LOC / produttività; Cost = LOC × costo per LOC.
- 🟡 **Function Point**: ILF / EIF / EI / EO / EQ; UFC; TCF; FP = UFC × TCF; backfiring.
- 🔴 **COCOMO**
  - KLOC; Basic / Intermediate / Advanced; Organic / Semi-detached / Embedded.
  - `Effort_nom = a × KLOC^b`
  - Cost drivers → C
  - `Effort = Effort_nom × C`
  - `Time = c × Effort^d`
  - Sequenza: **KLOC → Effort nominale → Cost Drivers → Effort → Time → Cost**.
- 🔴 **PERT — Critical Path**
  - **Cammino di durata totale massima**.
  - Determina la **durata minima possibile dell’intero progetto**.
  - Punto invertito più volte: altissima priorità.
- 🟡 **SPMP**: Software Project Management Plan.

### 🟢 abbastanza solidi
- Legge di Brooks, effort in man-months, Gantt.

## Modulo 6 — Progettazione e architetture

### 🔴 / 🟡 da rivedere
- 🔴 **Principi di progettazione**
  - Specifica → documento di progetto → dominio della soluzione.
  - Stepwise Refinement, Abstraction, Decomposition, Modularity, Information Hiding, Reuse.
  - Alta coesione / basso coupling.
- 🟡 **Coesione**: attività interne correlate e orientate a uno scopo ben definito.
- 🟡 **OOD preliminare**: architettura generale e macro-componenti.
- 🟡 **Architetture centralizzate**: Mainframe / File-Sharing.
- 🟡 **Client/Server**: Presentation / Application Processing / Data Management; 2-tier / 3-tier / N-tier.
- 🟡 **Distributed Objects**
  - client object → Client Stub → ORB → Server Skeleton → remote object.
  - Stub = marshalling; Skeleton = unmarshalling.
- 🟡 **Component Framework**: libreria componenti + architetture generiche + requisiti generici del dominio.
- 🟡 **SOA**: Provider / Consumer / Broker; Forwarding / Handle; Discovery.
- 🟡 **Web Services**: UDDI = discovery, WSDL = descrizione, SOAP = messaggi XML, REST = resources + URI + HTTP + stateless.
- 🟡 **ACID**: Atomicity / Consistency / Isolation / Durability.

### Saltati volutamente
- 2PC, Compound, Long-Living, Negotiation.

## Modulo 7 — OOD dettagliato, Structured Class, Design Pattern

### 🔴 / 🟡 da rivedere
- 🟡 **OOD dettagliato**: raffina struttura interna di classi/componenti e collaborazioni prima della codifica.
- 🟡 **Legge di Demetra**: comunica con vicini diretti; riduce coupling.
- 🟡 **Structured Class**: Part / Port / Connector / Role.
- 🔴 **Scope Design Pattern**
  - Factory Method = Creational / **Class**
  - Abstract Factory = Creational / **Object**
  - Adapter = Structural / **Class + Object**
  - Composite = Structural / **Object**
  - Decorator = Structural / **Object**
  - Observer = Behavioral / **Object**
  - Template Method = Behavioral / **Class**
  - Strategy = Behavioral / **Object**
- 🟡 **Adapter**: Class Adapter = inheritance; Object Adapter = composition/delegation.
- 🟡 **Factory Method**: sottoclassi decidono il Concrete Product.
- 🟡 **Abstract Factory**: famiglie di prodotti correlati/compatibili.
- 🟡 **Decorator**: funzionalità dinamiche a runtime.
- 🟡 **Observer**: Subject → notify; Observer → update; 1:N.
- 🟡 **Template Method vs Strategy**.
- 🟡 **Deployment Diagram**: Node / Artifact / Process-to-Node Allocation.

### 🟢 abbastanza solidi
- Composite, concetto generale dei pattern, Purpose.

## Modulo 8 — Metriche software

### 🔴 / 🟡 da rivedere
- 🟡 Intermodulari vs intramodulari.
- 🟡 Structure Chart: coesione / coupling / morfologia / information flow.
- 🟡 Morfologia: Size / Depth / Width / Edge-to-Node Ratio.
- 🟡 Internal Reuse: `r(G) = e - n + 1`.
- 🟡 Tree Impurity.
- 🟡 Information Flow: `IF(M) = [fan-in × fan-out]²`.
- 🔴 **Flow Graph** = **control flow interno** al modulo, non flussi di dati.
- 🟡 Cyclomatic Complexity: `V(G) = E - N + 2` oppure `D + 1`.
- 🔴 **Essential Complexity**: `ev(G) = 1` = programma perfettamente strutturato.

## Modulo 9 — Qualità, testing, BPM/BPMN

### 🔴 / 🟡 da rivedere
- 🟡 **Definizione di qualità**: hai dovuto leggere.
- 🔴 **McCall**: hai dovuto leggere parecchio.
  - Product Operation / Product Revision / Product Transition.
  - 12 fattori complessivi / 10 attributi / Checklist Method + Evaluation Team.
- 🔴 **SQA**: hai dovuto leggere parecchio.
  - Conformità di processo e prodotto a standard/procedure.
  - Team SQA / SQA Plan.
- 🔴 **Verification vs Validation**
  - Verification = **Are we building the product right?**
  - Validation = **Are we building the right product?**
- 🟡 Inspection = statico; Testing = dinamico.
- 🟡 4 attività del testing: design → prepare → execute → compare.
- 🟡 Acceptance Testing per software a contratto.
- 🟡 Component / Integration / User Testing.
- 🟡 Black Box vs White Box.
- 🟡 Top-down = **Stub** / Bottom-up = **Driver**.
- 🟡 Cluster Testing: Use Case / Thread / Object Interaction.
- 🔴 **BPM vs BPMN**
  - BPM = Business Process Management.
  - BPMN = Business Process Model and Notation.
- 🟡 Ciclo BPM: Identificazione → As-Is → Analisi → To-Be → Implementazione → Monitoraggio.
- 🟡 BPMN: Start / End / Task / Sequence Flow / Gateway XOR-AND-OR / Pool / Lane / Orchestration / Choreography.

# Priorità assoluta per il ripasso finale

## 🔴 Top 15
1. Verification vs Validation.
2. PERT: Critical Path = durata massima → durata minima del progetto.
3. Requirements Engineering: 5 attività in ordine.
4. Petri Net: non determinism / liveness / boundedness / reachability.
5. Include vs Extend.
6. COCOMO: sequenza e formule principali.
7. Principi di progettazione del Modulo 6.
8. McCall.
9. SQA.
10. Scope dei Design Pattern.
11. Flow Graph = control flow interno.
12. Essential Complexity: ev=1 = strutturato.
13. BPM vs BPMN.
14. Component Framework.
15. Top-down = Stub / Bottom-up = Driver.

# Metodo di utilizzo

Per ogni punto rosso/giallo:

1. Leggi **solo il titolo**.
2. Prova a rispondere senza appunti per 30–90 secondi.
3. Se ti blocchi, leggi il minimo indispensabile.
4. Chiudi gli appunti.
5. Ripeti immediatamente la risposta.
6. Dopo 30–60 minuti, riprova lo stesso punto una seconda volta.

Non ristudiare da zero i punti verdi.
