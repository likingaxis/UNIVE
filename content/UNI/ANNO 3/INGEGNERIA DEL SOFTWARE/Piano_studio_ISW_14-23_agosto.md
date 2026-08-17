# Piano di studio - Ingegneria del Software
## Obiettivo: chiudere tutta la teoria entro il 21 agosto e usare 22-23 agosto per ripasso

> [!important]
> **Fonte principale:** `ISW.md` / PDF da 166 pagine.
>
> **Fonte di supporto:** `IS_andrea.md` / PDF da 90 pagine.
>
> Non studiare i due documenti in sequenza come se fossero 256 pagine diverse: hanno una forte sovrapposizione.  
> Usa **ISW** per lo studio vero e proprio e **Andrea** per chiarire, sintetizzare e ripassare.

## Strategia generale

- **14-21 agosto:** teoria nuova.
- **22 agosto:** primo ripasso completo e recupero dei punti deboli.
- **23 agosto:** ripetizione orale, domande e consolidamento; idealmente **zero teoria nuova**.
- Ogni giorno:
  - 15-20 min di richiamo di ciò che hai studiato il giorno prima;
  - studio del blocco nuovo;
  - 30-45 min finali di ripetizione **senza guardare gli appunti**;
  - segnare i dubbi con `?` invece di perdere troppo tempo sul singolo punto.

> [!tip]
> Il criterio per dire "ho studiato un argomento" non è averlo letto, ma riuscire a spiegarlo a voce in 2-5 minuti seguendo un filo logico.

---

# 14 agosto - Fondamenti e modelli di processo

## Fonte principale

**ISW: pagine PDF 1-24**

Argomenti:

- introduzione all'Ingegneria del Software;
- ciclo di vita;
- aspetti accidentali ed essenziali;
- affidabilità e disponibilità;
- processo software;
- manutenzione;
- Build & Fix;
- Waterfall;
- Rapid Prototyping;
- sviluppo incrementale;
- modello a spirale;
- Risk Management;
- modello Object Oriented / concorrente / metodi formali;
- Microsoft Synchronize-and-Stabilize;
- Netscape;
- Agile;
- Scrum;
- User Stories;
- CMM.

### Andrea da usare se qualcosa non è chiaro

**Pagine 3-17.**

In Andrea gli stessi argomenti sono generalmente più sintetici e possono essere usati come seconda spiegazione.

## Priorità

### Da sapere bene

- differenza tra processo software e ciclo di vita;
- fasi del ciclo di vita;
- verifica vs validazione;
- manutenzione correttiva, adattativa, perfettiva, preventiva;
- Waterfall: logica, vantaggi, limiti;
- Rapid Prototyping e throw-away prototype;
- Incrementale con/senza Overall Architecture;
- Spirale e ruolo della Risk Analysis;
- fasi del Risk Management;
- Agile Manifesto;
- Scrum: ruoli, eventi, artefatti;
- User Story;
- 5 livelli CMM.

### Da non incastrarsi a memorizzare oggi

- esempi molto specifici;
- dettagli storici secondari;
- grafici parola per parola.

## Checklist 14 agosto

- [ ] Studio ISW pp. 1-6: introduzione, affidabilità, processo software
- [ ] Studio ISW pp. 7-13: prototipo, incrementale, spirale
- [ ] Studio ISW pp. 13-16: Risk Management
- [ ] Studio ISW pp. 16-21: modelli organizzativi, Microsoft, Netscape
- [ ] Studio ISW pp. 21-24: Agile, Scrum, CMM
- [ ] So spiegare Waterfall vs Incrementale senza guardare
- [ ] So spiegare il modello a spirale partendo dalla Risk Analysis
- [ ] So elencare le 4 fasi del Risk Management
- [ ] So distinguere ruoli/eventi/artefatti Scrum
- [ ] So elencare e spiegare i 5 livelli CMM
- [ ] Ripetizione finale a voce di almeno 30 minuti
- [ ] Segno i dubbi rimasti da recuperare domani

---

# 15 agosto - Requisiti e Requirements Engineering

## Fonte principale

**ISW: pagine PDF 25-40**

Argomenti:

- requisiti software;
- requisiti utente e requisiti di sistema;
- requisiti funzionali, non funzionali e di dominio;
- problemi di ambiguità, incompletezza, inconsistenza e verificabilità;
- documento di specifica;
- Requirements Engineering;
- studio di fattibilità;
- identificazione, analisi, specifica, convalida e gestione dei requisiti;
- requisiti stabili e volatili;
- specifiche informali, semi-formali e formali;
- Petri Net;
- firing;
- FSM;
- linguaggio Z;
- modelli semi-formali;
- ERD e DFD;
- SSA.

### Andrea di supporto

**Pagine 18-25.**

## Priorità

### Da sapere molto bene

- requisito utente vs requisito di sistema;
- requisito funzionale vs non funzionale;
- documento di specifica;
- fasi della Requirements Engineering;
- convalida dei requisiti;
- gestione delle modifiche e tracciabilità;
- specifiche informali vs semi-formali vs formali;
- elementi di una Petri Net;
- transizione abilitata e **firing**;
- differenza concettuale Petri Net / FSM / Z;
- 3 modelli del sistema: dati, comportamentale, dinamico.

### SSA

Capire la logica dello **step-wise refinement** e avere un'idea dei 9 step. Non spendere metà giornata a memorizzare ogni dettaglio degli esempi.

## Checklist 15 agosto

- [ ] Ripasso 15-20 min degli argomenti del 14
- [ ] Studio ISW pp. 25-31: requisiti + documento di specifica
- [ ] Studio ISW pp. 31-33: Requirements Engineering
- [ ] Studio ISW pp. 33-37: Petri Net, FSM, Z
- [ ] Studio ISW pp. 37-40: modelli semi-formali, ERD, DFD, SSA
- [ ] So distinguere requisiti utente e requisiti di sistema
- [ ] So distinguere funzionali, non funzionali e di dominio
- [ ] So spiegare tutte le fasi della Requirements Engineering nell'ordine
- [ ] So spiegare cosa significa una transizione abilitata
- [ ] So spiegare il firing senza leggere
- [ ] So dire perché si usano specifiche formali e qual è il loro costo
- [ ] So distinguere modello dei dati, comportamentale e dinamico
- [ ] Ripetizione finale a voce
- [ ] Dubbi marcati con `?`

---

# 16 agosto - OOA e UML

## Fonte principale

**ISW: pagine PDF 41-67**

> [!warning]
> Questo blocco sembra enorme, ma contiene moltissimi casi di studio ed esempi. Negli appunti stessi varie sezioni sono indicate come **"ES: saltare"**. Non devi studiare allo stesso livello ogni pagina.

Argomenti fondamentali:

- Object Oriented Analysis;
- UML;
- Class Diagram;
- entity, boundary e control classes;
- identificazione delle classi;
- Noun Phrase;
- Common Class Patterns;
- Use Case Driven;
- CRC;
- Mixed Approach;
- attributi e associazioni;
- molteplicità e role name;
- Aggregation e Composition;
- Generalizzazione;
- Object Diagram;
- modello comportamentale;
- Use Case Diagram;
- `include`, `extend`, generalizzazione;
- Activity Diagram;
- Sequence e Collaboration Diagram;
- interfaccia pubblica di classe;
- operazioni CRUD;
- modello dinamico / State Diagram;
- package;
- stratificazione;
- BCE.

### Pagine da trattare principalmente come esempi

- pp. 43-52: casi University / Video Store / Contact Management / Telemarketing;
- pp. 53-61: esempi di associazioni, Use Case e Activity Diagram.

Non ignorarli completamente: guarda i diagrammi e assicurati di capire **come applicano la teoria**, ma non memorizzare ogni classe o requisito.

### Andrea di supporto

**Pagine 26-39.**

## Checklist 16 agosto

- [ ] Ripasso rapido requisiti e Petri Net
- [ ] Studio ISW pp. 41-43: OOA, UML, identificazione classi
- [ ] Scorro gli esempi pp. 43-52 capendo il metodo, senza memorizzarli
- [ ] Studio bene associazioni, molteplicità, role name
- [ ] So distinguere Aggregation e Composition
- [ ] So spiegare Generalizzazione, sostituibilità e polimorfismo
- [ ] Studio Use Case Diagram
- [ ] So spiegare `include` vs `extend`
- [ ] Studio Activity Diagram e fork/join vs branch/merge
- [ ] Studio Sequence vs Collaboration Diagram
- [ ] So spiegare come dai messaggi del Sequence Diagram ricavo le operazioni delle classi
- [ ] Studio State Diagram
- [ ] Studio Package + BCE
- [ ] So spiegare perché Boundary non comunica direttamente con Entity
- [ ] Ripetizione OOA completa senza appunti
- [ ] Dubbi marcati con `?`

---

# 17 agosto - Pianificazione + introduzione alla progettazione

## Fonte principale

**ISW: pagine PDF 68-87**

Argomenti:

- organizzazione dei team;
- legge di Brooks;
- pianificazione;
- stime;
- LOC;
- Function Point;
- COCOMO;
- pianificazione temporale;
- scheduling;
- SPMP;
- introduzione alla progettazione;
- principi di progettazione;
- modularità;
- coesione;
- coupling;
- Information Hiding;
- riusabilità.

### Andrea di supporto

- **Pagine 41-45:** pianificazione e stime.
- **Pagine 53-55:** principi di progettazione.

## Priorità

Function Point e COCOMO richiedono più attenzione rispetto a semplice lettura: devi capire **cosa misurano, perché vengono usati e qual è il flusso del calcolo**.

Per coesione/coupling non limitarti a imparare che "alto/basso è meglio": devi riconoscere la logica delle diverse forme.

## Checklist 17 agosto

- [ ] Ripasso 20 min OOA/UML
- [ ] Studio team e legge di Brooks
- [ ] Studio tecniche di stima
- [ ] Studio Function Point
- [ ] So spiegare FP vs LOC
- [ ] Studio COCOMO
- [ ] Studio pianificazione temporale e scheduling
- [ ] Studio struttura/ruolo SPMP
- [ ] Studio principi di progettazione
- [ ] Studio modularità
- [ ] Studio coesione
- [ ] Studio coupling
- [ ] Studio Information Hiding
- [ ] Studio riusabilità
- [ ] Ripeto a voce Function Point e COCOMO senza appunti
- [ ] Ripeto a voce coesione vs coupling
- [ ] Dubbi marcati con `?`

---

# 18 agosto - OOD e architetture software

## Fonte principale

**ISW: pagine PDF 88-104**

Argomenti:

- OOD;
- progettazione preliminare e dettagliata;
- architetture centralizzate;
- architetture distribuite;
- middleware;
- Client-Server;
- distribuzione a livelli;
- Distributed Objects;
- Component Based;
- SOA;
- Broker Patterns;
- Service Registration / Discovery;
- Web Services;
- XML;
- SOAP;
- REST;
- Transaction Patterns;
- Compound Transaction;
- Long Living Transaction;
- Negotiation Pattern;
- Service Interface Design;
- Service Coordination.

### Andrea di supporto

**Pagine 56-64.**

## Checklist 18 agosto

- [ ] Ripasso stime + progettazione del giorno precedente
- [ ] So distinguere progettazione preliminare e dettagliata
- [ ] Studio architetture centralizzate
- [ ] Studio architetture distribuite
- [ ] So spiegare il ruolo del middleware
- [ ] Studio Client-Server e architetture a livelli
- [ ] Studio Distributed Objects
- [ ] Studio Component Based
- [ ] Studio SOA
- [ ] Studio Broker / Service Registration / Service Discovery
- [ ] So spiegare SOAP e REST a livello concettuale
- [ ] Studio Transaction Patterns
- [ ] Studio Service Interface Design e Service Coordination
- [ ] Creo una mini-mappa: Centralizzate -> Distribuite -> Componenti -> SOA
- [ ] Ripetizione finale
- [ ] Dubbi marcati con `?`

---

# 19 agosto - OOD dettagliato, deployment e introduzione ai Design Pattern

## Fonte principale

**ISW: pagine PDF 105-120**

Argomenti:

- progettazione dettagliata OOD;
- interfacce;
- Structured Class;
- Composite Structure Diagram;
- Deployment Diagram;
- nodi;
- artefatti;
- Process-to-Node Allocation;
- relazioni tra componenti;
- introduzione ai Design Pattern;
- classificazione dei pattern;
- concetto di framework.

### Andrea di supporto

**Pagine 65-68.**

## Checklist 19 agosto

- [ ] Ripasso 20 min architetture
- [ ] Studio progettazione dettagliata OOD
- [ ] Studio Structured Class
- [ ] So distinguere Class Diagram e Composite Structure Diagram
- [ ] Studio Deployment Diagram
- [ ] So spiegare nodo, artefatto e deployment
- [ ] Studio Process-to-Node Allocation
- [ ] Studio componenti e interfacce
- [ ] Studio concetto di Design Pattern
- [ ] So distinguere pattern creazionali, strutturali e comportamentali
- [ ] Studio concetto di Framework
- [ ] Ripetizione finale
- [ ] Dubbi marcati con `?`

---

# 20 agosto - Design Pattern + metriche di struttura

## Fonte principale

**ISW: pagine PDF 121-145**

Pattern trattati:

- Abstract Factory;
- Factory Method;
- Adapter;
- Composite;
- Decorator;
- Observer;
- Template Method;
- Strategy.

Poi:

- metriche di struttura;
- misure intermodulari e intramodulari;
- Structure Chart;
- morfologia;
- Tree Impurity;
- Internal Reuse;
- Information Flow;
- Flowgraph;
- misurazione gerarchica;
- complessità ciclomatica.

### Andrea di supporto

- **Pagine 69-75:** Design Pattern.
- **Pagine 76-82:** metriche di struttura e complessità.

> [!important]
> Per i Design Pattern non serve imparare a memoria ogni riga degli esempi di codice. Devi riuscire a dire:
>
> 1. quale problema risolve;
> 2. qual è l'idea della soluzione;
> 3. quali sono i ruoli/classi principali;
> 4. perché è meglio della soluzione ingenua.

### ISW pp. 128-136

Sono soprattutto esempi applicativi dei pattern: usali per verificare di aver capito, non come materiale da memorizzare parola per parola.

## Checklist 20 agosto

- [ ] Ripasso deployment + classificazione pattern
- [ ] Abstract Factory
- [ ] Factory Method
- [ ] Adapter
- [ ] Composite
- [ ] Decorator
- [ ] Observer
- [ ] Template Method
- [ ] Strategy
- [ ] So classificare ogni pattern per tipo
- [ ] So spiegare differenza Abstract Factory vs Factory Method
- [ ] So spiegare Composite vs Decorator
- [ ] So spiegare Observer senza diagramma
- [ ] Studio misure intermodulari/intramodulari
- [ ] Studio Structure Chart
- [ ] Studio morfologia / Tree Impurity / Internal Reuse
- [ ] Studio Information Flow
- [ ] Studio Flowgraph
- [ ] Studio complessità ciclomatica
- [ ] Ripetizione finale
- [ ] Dubbi marcati con `?`

---

# 21 agosto - Qualità, SQA e Testing + chiusura teoria

## Fonte principale

**ISW: pagine PDF 146-166**

Argomenti:

- qualità del software;
- Quality Model di McCall;
- Quality Triangle;
- indici e attributi di qualità;
- Checklist Method;
- Software Quality Assurance;
- verifica e validazione;
- inspection;
- testing;
- Validation Testing;
- Defect Testing;
- Statistical Testing;
- Component Testing;
- Black Box Testing;
- equivalence partitioning / test guidelines;
- White Box / Structural Testing;
- Path Testing;
- complessità ciclomatica applicata al testing;
- Integration Testing;
- Interface Testing;
- Stress Testing;
- testing OO;
- BPMN e materiale conclusivo presente nelle ultime pagine.

### Andrea di supporto

**Pagine 83-90.**

## Priorità

Questa giornata è importante: **testing e qualità sono argomenti molto interrogabili** e collegano molte parti studiate in precedenza.

## Checklist 21 agosto

- [ ] Ripasso 20 min metriche + complessità ciclomatica
- [ ] Studio definizione di qualità del software
- [ ] Studio Quality Triangle / McCall
- [ ] So distinguere Operation, Revision e Transition
- [ ] Studio attributi di qualità
- [ ] Studio Checklist Method
- [ ] Studio SQA
- [ ] Ripasso verifica vs validazione
- [ ] Studio inspections
- [ ] Studio Validation / Defect / Statistical Testing
- [ ] Studio Component Testing
- [ ] Studio Black Box Testing
- [ ] Studio equivalence partitioning
- [ ] Studio White Box / Structural Testing
- [ ] Studio Path Testing
- [ ] So collegare Path Testing e complessità ciclomatica
- [ ] Studio Integration Testing
- [ ] Studio Interface Testing
- [ ] Studio Stress Testing e OO Testing
- [ ] Scorro e comprendo il materiale conclusivo pp. 159-166
- [ ] **TEORIA NUOVA COMPLETATA**
- [ ] Elenco finale dei punti deboli da affrontare il 22

---

# 22 agosto - Ripasso completo

Oggi **non seguire linearmente ISW da pagina 1 a 166**.

Usa principalmente **Andrea**, perché è più corto, e torna su ISW solo nei punti in cui hai dubbi o dove Andrea è troppo sintetico.

## Giro 1 - Modulo 1

### Andrea pp. 3-17

- processo;
- modelli;
- Agile;
- Scrum;
- CMM.

### Andrea pp. 18-39

- requisiti;
- Requirements Engineering;
- specifiche;
- Petri Net / FSM / Z;
- OOA;
- UML;
- modelli dati/comportamentale/dinamico.

### Andrea pp. 41-45

- pianificazione;
- Function Point;
- COCOMO;
- SPMP.

## Giro 2 - Modulo 2

### Andrea pp. 53-66

- progettazione;
- OOD;
- architetture;
- SOA;
- deployment.

### Andrea pp. 67-75

- Design Pattern.

### Andrea pp. 76-90

- metriche;
- qualità;
- SQA;
- testing.

## Metodo del 22

Per ogni macroargomento:

1. chiudi gli appunti;
2. prova a spiegarlo;
3. apri Andrea e controlla cosa hai dimenticato;
4. se qualcosa continua a non essere chiaro, torna alla relativa sezione di ISW;
5. segnalo come:
   - `🟢` so spiegarlo bene;
   - `🟡` lo conosco ma sono incerto;
   - `🔴` non riesco a spiegarlo.

Alla sera devi aver eliminato tutti i `🔴`.

## Checklist 22 agosto

- [ ] Ripasso modelli di processo
- [ ] Ripasso Agile / Scrum / CMM
- [ ] Ripasso Requirements Engineering
- [ ] Ripasso specifiche formali e Petri Net
- [ ] Ripasso OOA / UML
- [ ] Ripasso pianificazione / FP / COCOMO
- [ ] Ripasso principi di progettazione
- [ ] Ripasso architetture e SOA
- [ ] Ripasso Design Pattern
- [ ] Ripasso metriche di struttura
- [ ] Ripasso qualità / McCall / SQA
- [ ] Ripasso testing
- [ ] Tutti gli argomenti sono almeno `🟡`
- [ ] Nessun argomento fondamentale è ancora `🔴`
- [ ] Recupero dei dubbi direttamente da ISW

---

# 23 agosto - Simulazione orale e consolidamento

> [!important]
> Il 23 non dovrebbe essere un giorno di studio massivo. Deve servire a rendere **recuperabile a voce** quello che hai già studiato.

## Blocco 1 - Domande senza appunti

Prova a rispondere a voce a domande come:

- Cos'è l'Ingegneria del Software e perché nasce?
- Qual è la differenza tra verifica e validazione?
- Waterfall vs Incrementale?
- Perché il modello a spirale è risk-driven?
- Quali sono le fasi del Risk Management?
- Cos'è Scrum?
- Cos'è una User Story?
- Quali sono i livelli CMM?
- Requisiti utente vs requisiti di sistema?
- Funzionali vs non funzionali?
- Quali sono le fasi della Requirements Engineering?
- Cos'è il firing in una Petri Net?
- OOA vs OOD?
- Quali sono i tre modelli del sistema?
- Aggregation vs Composition?
- `include` vs `extend`?
- Sequence Diagram vs Activity Diagram?
- Boundary / Control / Entity?
- Cosa dice la legge di Brooks?
- Function Point vs LOC?
- Cos'è COCOMO?
- Coesione vs coupling?
- Cos'è l'Information Hiding?
- Architettura centralizzata vs distribuita?
- Cos'è SOA?
- Cos'è un Broker?
- SOAP vs REST?
- Cos'è un Design Pattern?
- Abstract Factory vs Factory Method?
- Composite vs Decorator?
- Observer?
- Cos'è la complessità ciclomatica?
- Cos'è la qualità del software?
- Come funziona il modello di McCall?
- Verifica statica vs testing dinamico?
- Black Box vs White Box?
- Cos'è il Path Testing?
- Come funziona l'Integration Testing?

## Blocco 2 - Recupero mirato

Apri gli appunti **solo** per le domande sulle quali ti blocchi.

## Blocco 3 - Ultimo giro

Ripeti ad alta voce le macroaree nell'ordine:

**Processo → Requisiti → OOA → Pianificazione → Progetto/OOD → Pattern → Metriche → Qualità → Testing**

L'obiettivo è riuscire a vedere il corso come **un unico processo**, non come cento definizioni scollegate.

## Checklist 23 agosto

- [ ] Prima simulazione orale senza appunti
- [ ] Segno tutte le domande in cui mi blocco
- [ ] Recupero solo quei punti
- [ ] Seconda simulazione orale
- [ ] So collegare un argomento al successivo
- [ ] Ripasso definizioni che richiedono precisione
- [ ] Ripasso confronti importanti
- [ ] Ripasso formule/metriche indispensabili
- [ ] Ultimo giro sui `🟡`
- [ ] Nessuna teoria nuova salvo emergenze

---

# Regola per usare i due appunti

## ISW - fonte principale

Usalo quando:

- studi un argomento per la prima volta;
- vuoi capire il ragionamento;
- servono esempi;
- non capisci il perché di una definizione;
- vuoi vedere i diagrammi nel contesto originale.

## Andrea - fonte di supporto

Usalo quando:

- hai già studiato l'argomento;
- vuoi una seconda formulazione;
- ISW è troppo dispersivo;
- devi ripassare velocemente;
- vuoi verificare se ricordi i punti essenziali.

## Da evitare

- leggere 166 pagine di ISW e poi ricominciare da pagina 1 di Andrea;
- evidenziare tutto;
- imparare a memoria tutti i casi di studio;
- passare un'ora su un singolo esempio segnato come `saltare`;
- rimandare la ripetizione orale al 22.

---

# Tracker generale

## Processo e modelli

- [ ] Fondamenti ISW
- [ ] Affidabilità / disponibilità
- [ ] Ciclo di vita
- [ ] Waterfall
- [ ] Prototyping
- [ ] Incrementale
- [ ] Spirale
- [ ] Risk Management
- [ ] Modelli organizzativi
- [ ] Agile
- [ ] Scrum
- [ ] CMM

## Requisiti

- [ ] Requisiti utente / sistema
- [ ] Funzionali / non funzionali / dominio
- [ ] Documento di specifica
- [ ] Requirements Engineering
- [ ] Convalida
- [ ] Gestione
- [ ] Specifiche formali
- [ ] Petri Net
- [ ] FSM
- [ ] Z
- [ ] ERD / DFD / SSA

## OOA / UML

- [ ] OOA
- [ ] Class Diagram
- [ ] Identificazione classi
- [ ] Associazioni
- [ ] Aggregation / Composition
- [ ] Generalizzazione
- [ ] Use Case Diagram
- [ ] Activity Diagram
- [ ] Sequence / Collaboration
- [ ] State Diagram
- [ ] Package
- [ ] BCE

## Pianificazione

- [ ] Team / Brooks
- [ ] Stime
- [ ] LOC
- [ ] Function Point
- [ ] COCOMO
- [ ] Scheduling
- [ ] SPMP

## Progettazione

- [ ] Principi di design
- [ ] Modularità
- [ ] Coesione
- [ ] Coupling
- [ ] Information Hiding
- [ ] Riusabilità
- [ ] OOD
- [ ] Architetture
- [ ] Middleware
- [ ] Client-Server
- [ ] Component Based
- [ ] SOA
- [ ] Broker
- [ ] SOAP / REST
- [ ] Transaction Patterns
- [ ] Deployment

## Design Pattern

- [ ] Abstract Factory
- [ ] Factory Method
- [ ] Adapter
- [ ] Composite
- [ ] Decorator
- [ ] Observer
- [ ] Template Method
- [ ] Strategy

## Metriche, qualità e testing

- [ ] Metriche di struttura
- [ ] Morfologia
- [ ] Information Flow
- [ ] Flowgraph
- [ ] Complessità ciclomatica
- [ ] Qualità del software
- [ ] McCall
- [ ] Checklist Method
- [ ] SQA
- [ ] Inspections
- [ ] Validation / Defect / Statistical Testing
- [ ] Black Box
- [ ] Equivalence Partitioning
- [ ] White Box
- [ ] Path Testing
- [ ] Integration Testing
- [ ] Interface Testing
- [ ] Stress Testing
- [ ] OO Testing

---

# Obiettivo temporale

- **21 agosto sera:** tutta la teoria vista almeno una volta e ripetuta.
- **22 agosto sera:** nessun argomento fondamentale `🔴`.
- **23 agosto:** trasformare conoscenza passiva in risposta orale fluida.

> [!tip]
> Se un giorno rimani indietro, **non spostare automaticamente tutto di un giorno**. Prima elimina o riduci gli esempi indicati come secondari e usa Andrea per recuperare più velocemente. Proteggi il 22 come giornata di ripasso.
