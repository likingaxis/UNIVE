# MODULO 1
## Introduzione ISW
- **Definizione di Ingegneria del software**
	- è la disciplina che applica principi, metodi e pratiche dell'ingegneria alla realizzazione del software per risolvere problemi di cost overrun e time overrun
- **Prodotto Software**= codice+ documentazione associata
- **Artefatto**= prodotto intermedio generato durante il processo di sviluppo(non solo codice)
- **Sistema Software**= insieme organizzato di prodotti o componenti software che lavorano insieme

- **Cliente**: chi richiede il prodotto
- **Sviluppatore**: chi lo realizza
- **Utente**: chi lo utilizza
- quando **cliente=sviluppatore** si dice Software interno
- quando **cliente != sviluppatore** si dice Software a contratto
#### Affidabilità hardware e software
Si vuole distinguere la differenza tra le due affidabilità che manifestano guasti di tipo differente:
- Hardware
	- si guasta fisicamente per usura rottura o deterioramento
		- dopo una sostituzione riprende una condizione simile a prima
- Software
	- si guasta sulla base di difetti già presenti o introdotti con nuove modifiche
	- non si consuma fisicamente

Guasto Hardware si può vedere dal grafico come ci sia mortalità infantile per difetti grossi, poi si stabilizza poi si guasta per usura

![[GPT PREMIUMS/14_agosto_appunti/assets/p003-fig-001.png|254]]

Guasto Software invece si nota come ad ogni modifica aumenta la possibilità di avere guasti ma poi scende, non segue la curva ideale

![[GPT PREMIUMS/14_agosto_appunti/assets/p003-fig-002.png|255]]
#### Le problematiche del Software
Ci sono alcuni problemi legati alla produzione del software ma si dividono principalmente in:
- ***Accidentali***
	- difficoltà dovute agli strumenti usati per sviluppare il software
- ***Essenziali***
	- non dipendono dagli strumenti usati sono caratteristiche intrinseche
	- **Complessità**
		- diviso in troppe componenti che interagiscono o troppe righe di codice fatte male
	- **Conformità**
		- dovuto ad una scarsa adattabilità con protocolli già presenti o con hardware già presente
	- **Cambiabilità**
		- software che va modificato di frequente ma con scarsa progettazione=problemi
	- **Invisibilità**
		- problematiche nel ragionare su un software invisibile, non è un edificio
#### Aspetti economici
il costo del software può essere descritto da
$$C = aS^2$$
dove:
- *C*=costo
- *S*=dimensione del sistema espressa in linee di codice(LOC) o complessità
- *a*=costante legata alla produttività del team
la dimensione di un sistema se raddoppiata fa quadruplicare il costo
#### Il Ciclo di Vita del Software
Intervallo di tempo che va dalla nascita dell'esigenza di realizzarlo fino alla sua dismissione si divide in 3 stadi:
##### Sviluppo
Fase di effettivo sviluppo del software si descrive meglio con 6 fasi:
- **Requisiti**
	- si stabilisce cosa deve fornire il software rispetto alle necessità del cliente, vincoli ecc...
- **Specifica**
	- si riscrivono i requisiti in modo migliore
- **Pianificazione**
	- Come organizzare il progetto
- **Progettazione**
	- Definire propriamente il progetto
- **Codifica**
	- scrittura del codice
- **Integrazione**
	- si combinano tutte le parti realizzate per formare il prodotto completo

più tardi viene individuato un errore o viene richiesta una modifica, **maggiore sarà il costo necessario per intervenire**
dopo il rilascio, a costare circa **60-100 volte di più**

##### Manutenzione
Dopo lo sviluppo si modificano parti del prodotto durante il periodo in cui viene utilizzato, comporta gran parte dei costi
La manutenzione si divide in 4 tipologie:
- **Correttiva**
	- elimina difetti che potrebbero creare comportamenti errati
- **Adattiva**
	- modifiche per l'ambiente, es: hardware diverso
- **Perfettiva**
	- aggiungere nuove funzionalità
- **Preventiva**
	- migliorare la possibilità di manutenere il software
##### Dismissione
momento in cui il prodotto viene ritirato e non più utilizzato per diverse ragioni

***Regola 10-90***
- in software grandi si dice che
	- il **90% del tempo** è **dedicato** al **10% delle istruzioni** disponibili(parte detta come nucleo)
- l'importanza di un difetto dipende quindi dalla sua localizzazione
#### Affidabilità, Disponibilità e Sistemi Critici
Per **affidabilità** intendiamo la **probabilità** che quel prodotto software **funzioni** in un certo **intervallo di tempo** detto **mission time** seguendo certe **condizioni di utilizzo**

Si definisce quella che è la *catena dell'errore*:
- ***Errore Umano***
	- tipo sviluppatore che scrive una cosa in modo sbagliato
- ***Difetto***
	- anomalia che rimane nel prodotto dopo un errore umano
- ***Guasto***
	- comportamento scorretto che avviene se presente un difetto

Seguendo la regola 10-90, se un difetto si trova al di fuori del nucleo (in codice poco o mai eseguito), esso rimane un **difetto latente** e il guasto potrebbe non manifestarsi.

Per **Profilo Operativo** si intende **l'insieme** delle **funzioni usate** e della **frequenza** con cui vengono forniti gli **input**
- ogni profilo operativo è diverso e **mostra affidabilità differenti**

Per **Disponibilità** si intende la **percentuale di tempo** in cui il software è **utilizzabile** ed operativo calcolata come
$$\text{Availability} = \frac{\text{MTBF}}{\text{MTBF} + \text{MTTR}}$$
dove:
- **MTBF** (*Mean Time Between Failures*): tempo medio tra un guasto e il successivo
- **MTTR** (*Mean Time To Repair*): tempo medio necessario per riparare e ripristinare il sistema

Per **Software Critico** si intende un Software che se fallisce causa
- *Safety-Critical*: rischio per vite umane(es: dispositivi medici)
- *Mission-Critical*: blocco delle attività o del business(es: sistemi bancari)

***MODULO  2***

## Modelli di Ciclo di Vita e Processi Software
Modelli che descrivono come organizzare le attività dello sviluppo software
### Modelli tradizionali
#### Build & Fix
Non è proprio un modello infatti è senza un processo strutturato ha le seguenti componenti:
- **Build first Version**: si costruisce rapidamente
- **Modify until client is satisfied**: si fa in loop
- **Operations mode**: fase effettiva di operazione si nota una freccia di manutenzione per migliorare il tutto
- **Retirement**: ritiro del prodotto

***Pro***: rapidità iniziale
*Contro*: 0 scalabilità, troppi costi di manutenzione

![[GPT PREMIUMS/14_agosto_appunti/assets/p005-fig-003.png|360]]
#### Modello Waterfall
Modello di tipo sequenziale e più disciplinato del Build & Fix vede le seguenti componenti:
- **Requirements phase e verifica**: vengono definiti i requisiti
- **Specification phase e verifica**: viene fatto il documento di specifica che migliora il requirements
- **Design phase e verifica**: viene fatta una progettazione del design strutturale del sistema software
- **Implementation phase**: si scrive l'effettivo codice e si testa
- **Integration phase**: si fa il merge delle componenti fatte in implementation phase e si testano
- **Operations mode**: attività di effettivo utilizzo del sistema con eventuali cambi dei requisiti o aggiornamenti di alcune fasi precedenti
- **Retirement**

***Pro***: sequenziale e semplice
***Contro***: Se si fa un fix per una fase troppo indietro i costi aumentano di molto

![[GPT PREMIUMS/14_agosto_appunti/assets/p005-fig-004.png|368]]
#### Modello con Rapid Prototyping
Correggi:
**Rapid Prototyping = concetto generale**  
→ può essere **Throw-away** oppure **Evolutionary**.


Modello che utilizza dei **Prototipi** durante la fase di sviluppo
molto simile al modello waterfall ma nella fase di requisiti vengono creati questi prototipi che permettono:
- **Requirements Elicitation**: emergono requisiti in più dall'utente
- **Requirements Validation**: si consolida ciò che vuole davvero l'utente rispetto a ciò che avevamo capito

Si dividono in 2 tipologie:
- Throw-away: il prototipo viene ogni volta gettato
- Evolutionary: il prototipo viene usato come base di partenza

***Pro***: con i prototipi si capiscono meglio i requisiti
*Contro*: il cliente può avere una falsa percezione visto che poi manca tutta la parte strutturale dietro

![[GPT PREMIUMS/14_agosto_appunti/assets/p007-fig-006.png|364]]


### Modelli basati su iterazione dei processi
Modelli che trattano lo sviluppo come una ripetizione controllata di alcune attività su parti piccole del progetto per creare versioni sempre più complete e precise
Due modelli importanti:
#### Modello a Sviluppo Incrementale
sviluppo composto da build, ogni build aggiunge una parte delle funzionalità fino ad arrivare al sistema completo
- outline description: descrizione generale del prodotto
- concurrent activities che in modo parallelo portano a delle differenti versioni come quelle a destra passando da build in build
![[GPT PREMIUMS/14_agosto_appunti/assets/p008-fig-009.png|412]]

Il modello a Sviluppo Incrementale in realtà si divide in 2 tipologie:
##### Con Overall Architecture
Si ha una fase iniziale dove si fanno normalmente requirements specifiche architectural design ecc...
- e poi si fanno i vari incrementi
***Pro***: Si definiscono in fase preliminare la maggior parte dei dettagli riducendo problemi di integrazione
*Contro*: Lentezza e Rigidità

![[GPT PREMIUMS/14_agosto_appunti/assets/p009-fig-010.png|332]]
##### Senza Overall Architecture
Si parte con lo sviluppo delle Build senza una fase di progettazione architetturale precedente
***Pro***: Molto immediato
*Contro*: Rischio di avere difficoltà nella fase di integrazione delle build e nel rispettare i requisiti richiesti dal cliente

![[GPT PREMIUMS/14_agosto_appunti/assets/p010-fig-011.png|650]]

###### Problema del modello incrementale dei costi
- con più incrementi diminuisce il costo delle singole build
- ma aumenta il costo di integrazione quando ci sono tante build
la loro somma genera una regione di ***costo minimo***
![[GPT PREMIUMS/14_agosto_appunti/assets/p010-fig-012.png|520]]
#### Modello a spirale
Modello di tipo sempre iterativo ma che aggiunge una parte di *Risk Management* si rappresenta con una spirale
- **più ti allontani** dal centro *più aumentano i costi*
- **Customer communication**: ti confronti con il cliente
- **Planning**: organizzi le attività
- **Risk Analysis**: identificazione e valutazione dei rischi
- **Engineering**: progettazione specifica ecc
- **Construction & Release**: costruzione del sistema e rilascio
- **Customer Evaluation**: valutazione del risultato 

prima di investire ulteriormente si vedono i rischi

![[GPT PREMIUMS/14_agosto_appunti/assets/p011-fig-013.png|378]]

Poi c'è una versione di Boehm che aggiunge cose come prototipi, simulazioni, benchmark ecc...
![[GPT PREMIUMS/14_agosto_appunti/assets/p013-fig-015.png|469]]

##### Parentesi sul Risk Management
Nei modelli a spirale come abbiamo visto si introduce quella componente sulla gestione dei rischi
###### Tipologie di rischio
- *Project Risk*: influenza il progetto
- *Product Risk*: influenza il prodotto in termini qualitativi o simili
- *Business Risk*: influenza l'organizzazione che sviluppa il prodotto software
###### Processo di Risk Management
Per gestire un rischio viene descritto un processo fatto da 4 attività:
- **Identificazione del rischio**: fare una lista dei rischi
- **Analisi del rischio**: valutare la probabilità di occorrenza e la sua gravità
	- esistenza dei top risks
- **Planning**
	- si attuano strategie per gestire un rischio ne conosciamo 3:
		- *Avoidance*: ridurre la probabilità che si verifichi
		- *Minimization*: ridurre l'impatto se si verifica
		- *Contingency Plan*: piano alternativo se si verifica il rischio
- **Monitoring**: analizzare nuovamente nuovi rischi e modificare la lista di analisi

### Modelli a Oggetti, Concorrenti e Corporate
#### Modelli Object Oriented
Con i seguenti modelli si lavora sempre con classi e oggetti indipendentemente dalla fase di sviluppo senza descrivere tutte le varie componenti si può notare come ci sia
- **Concorrenza**: più attività nello stesso periodo di tempo
- **Iterazione**: fasi ripetute per migliorarne il risultato
- **non obbligo** di usare linguaggi di programmazione ad oggetti

Si vede dal basso verso l'alto come una fontana, poi quando sali influenzi le parti sotto
![[GPT PREMIUMS/14_agosto_appunti/assets/p016-fig-021.png|313]]

#### Modelli concorrenti
Si usano **modelli tradizionali** ma si **dividono parti collegate tra loro** dello sviluppo usando **software di comunicazione** tra team così da **ridurre** il **tempo** necessario
#### Modelli corporate
Fare un sistema software per il mercato non è come farlo per un cliente che te lo commissiona
per questo esistono modelli differenti come
##### Modello Microsoft - Synchronize and Stabilize
- Piccoli team di sviluppatori lavorano a **daily build**
	- se si presenta un problema di integrazione che rompe le build precedenti si risolve
- appena si raggiunge un **punto significativo** **(milestone)** viene prodotta una versione stabile e completa del sistema software
se vogliamo vederlo in fasi abbiamo:
- **planning**
- **development**
- **stabilization**
sono abbastanza esplicite

##### Modello Netscape
Organizzazione che adottava un modello **simile** a quello **Synchronize and Stabilize** ma per **prodotti internet**
- *meno tester*
- *meno planning*
- *documentazione all'osso*

veniva con delle riunioni definita la ***product vision*** e da lì venivano sviluppati i sistemi software
### Metodi Agile
I metodi Agile nascono come reazione a processi pesanti e rigidi ponendo un processo di realizzazione Software leggero ma organizzato, iterativo e basato su feedback frequenti
#### Quattro valori del manifesto Agile
- **priorità agli individui e alle interazioni che hanno** e in secondo piano gli strumenti utilizzati e i processi
- **Software funzionante > documentazione esaustiva**
- **Collaborare con il cliente** più che essere legati da un *contratto definito in principio*
- **Reagire ai cambiamenti** più che seguire il piano ciecamente

Esistono inoltre ***12 principi Agile*** che sviluppano ancora meglio idee del tipo:
- **consegna frequente di software funzionante**
- **collaborazione continua**
- **team motivati**
- **semplicità**
#### Modello e framework Scrum
il Modello ***Scrum*** si basa sulla filosofia Agile ed è generalizzato in queste fasi:
- cicli brevi chiamati **Sprint** (2-4 settimane)
	- a inizio Sprint si fa il **planning** producendo il **Product Backlog** e lo **Sprint backlog**
		- il product backlog **contiene** le **informazioni sul prodotto**, come **migliorie** ecc da fare
		- si sceglie una **parte del backlog** da **implementare** e si fa uno sprint su quella parte definendo così lo **sprint backlog**
	- ogni giorno avviene il **Daily Scrum**, riunione per sincronizzare il lavoro e identificare ostacoli
- alla fine dello Sprint si fa la **Sprint Review** dove si aggiorna il product backlog e si produce un incremento

il framework è la parte strutturale del procedimento con le varie componenti come:
- **Scrum Master**: aiuta il gruppo a comprendere e applicare l'approccio Scrum (non è il capo)
- **Development Team**: gruppo che svolge il lavoro tecnico
- **Product Owner**: gestisce product backlog, priorità e esigenze del prodotto

![[GPT PREMIUMS/14_agosto_appunti/assets/p022-fig-025.png|477]]

#### User Story per metodologie Agile
Per descrivere bene i bisogni di un utente e da cui derivare delle specifiche del progetto come il product backlog per Scrum si utilizzano le User Story
`As a <role>, I want <goal> so that <benefit>`
più User Stories= Epic

### Maturità del processo software
Valutare quanto un'organizzazione sia in grado di sviluppare software  in modo sistematico
#### Modello CMM - Capability Maturity Model
Modello che descrive la maturità del processo software di un'organizzazione
il modello è organizzato in 5 livelli:
- 1. **Initial**
	- processo ad hoc(improvvisato)
	- presenza di heroes che la carryano
- 2. **Repeatable**
	- pratiche di base di project management come pianificazione e monitoring
- 3. **Defined**
	- processo documentato e standardizzato
- 4. **Managed**
	- non segue solo procedure ma raccoglie dati per misure quantitative per capire se sta funzionando
- 5. **Optimizing**
	- Utilizza tutto ciò che misura per migliorare il processo andando a fare Defect Prevention(prevenzione di difetti)

Il CMM è un modello additivo se stai al 5 devi aver rispettato i precedenti livelli
![[Pasted image 20260826171330.png|418]]

##### KPA (Key Process Areas)
una *KPA* rappresenta una area specifica del processo di realizzazione software
- un **certo livello** **CMM** deve **rispettare** determinate **KPA**
in totale *sono 18* e lavorano su aspetti come:
- **obiettivi**
- **responsabilità**
- **risorse**
- **attività da svolgere**
- **modalità di monitoraggio**
- **modalità di verifica**
***MODULO 3***
## Requisiti
Descrivono una condizione o capacità necessaria all'utente per risolvere un problema o raggiungere un obiettivo.
I requisiti si osservano su:
#### 2 livelli di astrazione
- **Requisiti utente**:
	- requisiti ad alto livello che descrivono servizi e vincoli del sistema
	- linguaggio naturale
- **Requisiti di sistema**:
	- descrivono servizi e vincoli in modo preciso e utile per chi deve progettare e sviluppare
#### 3 categorie
Una serie di requisiti possono essere
- **Funzionali**
	- descrivono i servizi che offre il sistema e il comportamento che deve assumere
- **Non funzionale**
	- descrivono proprietà qualità o vincoli che il sistema o il processo di sviluppo deve rispettare
- **Dominio**
	- definisce i vincoli che porta il settore applicativo su cui si sta facendo il sistema
	- possono essere sia funzionali che non
#### Stabili vs Volatili
- **Stabili**
	- è poco probabile che vengano cambiati una volta definiti
- **Volatili**
	- alta probabilità di cambiare nel tempo
	- 4 categorie:
		- **Mutabili**: causa cambiamento dell'ambiente operativo
		- **Emergenti**: emergono dopo che il cliente sa di cosa ha bisogno
		- **Consequenziali**: nascono come effetto dopo aver introdotto il nuovo software
		- **Compatibilità**: quando cambiano i sistemi esterni utilizzati
### Requirements Engineering
Processo di costruzione dei requisiti si divide in 5 grandi attività
- ***Studio di fattibilità***
	- Valuta costi, benefici e risorse
- ***Identificazione e analisi dei requisiti***
	- si capiscono i bisogni degli stakeholder e vengono risolti conflitti
	- stakeholder(persone o gruppi che hanno un interesse nel sistema di qualsiasi tipo)
- ***Specifica dei requisiti***
	- creazione di documenti più precisi di tipo informale, semi-formale o formale
- ***Convalida dei Requisiti***
	- verifica sulla completezza del documento e sulla consistenza
- ***Gestione dei Requisiti***
	- controllo e tracciamento delle modifiche sui requisiti durante il ciclo di vita del sistema software
#### Tecniche di Specifica dei Requisiti
Formalizzano i requisiti per evitare ambiguità prima della progettazione effettiva. Si dividono in 3 livelli
##### Specifiche Informali
Linguaggio stile Java in combinazione con parole del linguaggio naturale
- non scrivi codice vero e proprio ma togli qualche ambiguità mettendo if else ecc
![[GPT PREMIUMS/15_agosto_appunti/assets/p030-fig-031.png|390]]

##### Specifiche Semi-Formali
Specifiche che vengono rappresentate con **modelli grafici**
quando vengono definite possono dare **3 punti di vista differenti**
- sul **modello dei dati**
	- requisiti **relativi ai dati** e alla loro organizzazione
- sul modello **comportamentale**
	- come il **sistema interagisce** **con** gli **utenti** e come diverse **parti** del **sistema** **interagiscono** **tra** di **loro**
- sul **modello dinamico**
	- come il **sistema** **cambia** **stato** e **comportamento** nel **tempo**
###### Modello ERD (Entity Relationship Diagram)
- Modella la struttura concettuale dei dati: **Entità** (rettangoli), **Attributi** (ovali), **Relazioni** (rombi) e cardinalità (`1:1`, `1:N`, `N:M`).
![[GPT PREMIUMS/15_agosto_appunti/assets/p038-fig-039.png|140]]
###### Modello (DFD Data Flow Diagram)
- **Modella** il **cambiamento** dei **dati**
- si organizza il tutto a più livelli di raffinamento, dove all'inzio si ha un modello molto superficiale e man mano diventa sempre più approfondito

- doppio quadrato= **sorgente di dati**
- freccia= il **flusso dei dati**
- quadrato arrotondato= **processo** che **lavora i dati**
- rettangolo aperto= **memoria** che **salva** i **dati**(archivio)
immagina questo come primo raffinamento poi diventa sempre più complesso e pieno di passaggi e figure
![[Pasted image 20260319124621.png|291]]

###### SSA (Structured System Analysis)
Modello di decomposizione **top-down** ovvero scompone in 9 step il problema e ne costruisce un documento di specifica sempre più dettagliato partendo dal modello DFD
- viene detto **step-wise refinement**
##### Specifiche formali
Usano formalismi a base matematica molto rigorosi, utili per sviluppo di sistemi critici
###### Modello Petri Net
Modello matematico usato per rappresentare sistemi concorrenti, distribuiti e asincroni
è una tupla $G = (P, T, A, w, M_0)$
dove 
- Posti $P \ (cerchi)$: rappresentano condizioni, stati o risorse disponibili
- Transizioni $T \ (barre)$: eventi o azioni che modificano lo stato del sistema
- Archi orientati $A$: collegano posti a transizioni oppure viceversa ma non posto posto o transizione transizione(bipartito)
	- possono essere pesati $w$
- Token (puntini dentro i posti): rappresentano lo stato del sistema in quel momento, quante risorse ci sono in quel posto lo stato definito con $M$ 
- $M_0$ è lo stato iniziale la fotografia di come sono disposti i token a tempo 0 e possono variare
- Regole di Scatto(Firing Rule)
	- per permettere il passaggio dei token da un posto all'altro vi è questa regola di Firing che si divide in 2 fasi
	- Abilitazione (si consente il passaggio della transizione), una transizione è abilitata se, per ogni place di input, ci sono **almeno tanti token quanto richiesto dal peso dell’arco**.
	- Scatto(trasferimento effettivo dei token) si tolgono i token dal posto di inizio e si generano al posto di arrivo 
![[GPT PREMIUMS/15_agosto_appunti/assets/p033-fig-033.png|413]]
- **Proprietà delle Reti di Petri:**
	- **Non Determinismo:** più transizioni portano a una scelta di tipo deterministico se si abilita il Firing
	- **Liveness (Vitalità):** non ci sono situazioni di stallo
	- **Boundedness / Safety:** ciascun posto ha un limite di token che può avere
	- **Reachability (Raggiungibilità):** capacità di determinare se una certa configurazione di stato (marcatura $M$) può essere raggiunta a partire dallo stato iniziale $M_0$.

**FSM - Finite State Machines** basate su stati e transizioni con input/output

**Linguaggio Z** basato su teoria degli insiemi e logica dei predicati

MODULO  4

## Analisi Orientata agli Oggetti (OOA)
L'OOA(Object Oriented Analysis) rappresenta una fase di specifica semi-formale dei requisiti seguendo il paradigma a oggetti.
- bisogni informali diventano modelli strutturati e non ambigui
definisce COSA deve fare il prodotto software
#### Meccanismi OO(Object Oriented)
- **incapsulamento**: avere nella stessa classe attributi e metodi
- **information hiding**: dettagli implementativi interni non per forza visibili dall'utilizzatore
- **astrazione**: separare dettagli implementativi e caratteristiche essenziali
- **condivisione**: Ereditarietà che permette il riuso di attributi e Polimorfismo che consente di usare interfacce uguali ma con metodi interni differenti
#### Principi Operativi dei metodi OOA
- **costruzione in parallelo**: la fase di specifica dove si fanno i vari diagrammi avviene in parallelo e non in modo sequenziale, ogni diagramma arricchisce l'altro (tipo use case sequence diagram ecc)
- **Stepwise Refinement**: si fanno iterazioni per raffinare i dettagli di ogni modello
- **Riduzione della complessità**: lavorando con classi e layer si hanno meno comunicazioni tra le componenti
### UML (Unified Modelling Language)
Prima di UML esistevano diversi metodi di rappresentazione Object Oriented, era troppo confusionario quindi si fece un modelling language uniforme

essendo specifiche semi- formali non basta un solo diagramma ne vengono fatti diversi per mostrare il sistema software sotto più aspetti divisi in:
- **Diagrammi Strutturali**:
	- si rappresentano i dati e la loro architettura
- **Diagrammi Comportamentali e Dinamici**:
	- si rappresenta il modo in cui il sistema si relaziona con l'utente e il modo in cui le componenti interne comunicano tra loro
	- per quelli dinamici i cambiamenti di stato nel tempo del sistema
vedremo a breve diversi diagrammi ognuno che fa parte di una di queste categorie
##### BCE(Boundary Control Entity)
Per descrivere le classi si utilizzano questi 3 pattern qui:
- ***Boundary***: Classi di interfaccia verso gli utenti
- ***Control***: Classi di logica e di coordinamento con controlli dei casi d'uso
- ***Entity***: Classi di modellazione dei dati persistenti
#### Class Diagram
fa parte dei diagrammi strutturali descrive le entity classes della BCE
contengono:
- nomi, attributi, operazioni
##### Relazioni tra classi
Per mettere in relazione delle classi si può fare:
- Associazione:
	- linea con molteplicità `1..1` `1..*` `*..*` ecc
	- `Docente 1 ----------- * Corso`
- Aggregazione:
	- rombo vuoto tra due classi indica una relazione ma debole
		- la parte senza rombo può esistere anche senza la componente con il rombo
		- `Squadra ◇--- Calciatore`
- Composizione:
	- rombo pieno indica un rapporto di esistenza
		- se elimini la componente con il rombo si eliminano anche le parti
		- `Edificio ◆--- Stanza`
- Generalizzazione:
	- freccia con triangolo vuoto indica una relazione di ereditarietà tra classi
	- `Studente ---▷ Persona`
- Dipendenza:
	- freccia tratteggiata serve per definire quando una classe usa un'altra
	- `Ordine - - -> Pagamento`
##### Come identificare le classi entity per fare il Class Diagram
1. **Noun Phrase (Analisi grammaticale):** estrarre i **sostantivi** dal testo dei requisiti (i sostantivi diventano *classi/attributi*, i verbi diventano *operazioni/associazioni*)
2. **Common Patterns (Categorie di Dominio):** cercare categorie ricorrenti (ruoli di persone, luoghi fisici, dispositivi, transazioni/eventi)
3. **Use Case Driven:** analizzare ciascun Caso d'Uso per identificare quali oggetti partecipano allo scenario
4. **CRC Cards (*Class-Responsibility-Collaborator*):** schede che elencano per ogni classe il suo *Nome*, le sue *Responsabilità* e i *Collaboratori* (altre classi con cui interagisce)
5. **Approccio Misto:** combinazione sistematica dei metodi precedenti (quello usato nella realtà)
#### Use Case Diagram
fa parte dei diagrammi comportamentali, si descrivono gli scenari di caso d'uso di attori composto da:
- Attori che interagiscono con il sistema
- Casi d'uso i servizi effettivi
Questi due elementi si mettono in relazione mediante:
- `Associazioni`: linea che collega omino e ovale
- `<<include>>`: quando un caso d'uso per essere completato esegue **obbligatoriamente** un altro caso d'uso (riuso)
	- la freccia parte dal caso base e **punta verso quello incluso** (il base dipende dall'incluso)
	- `(Preleva Contanti) . - - <<include>> - - > (Autentica PIN)`
- `<<extend>>`: quando un caso d'uso aggiunge un comportamento **opzionale** a un altro caso d'uso (solo se si verifica una certa condizione / extension point)
	- la freccia parte dal comportamento opzionale e **punta verso il caso base** (il caso opzionale estende il base)
	- `(Richiedi Ricevuta Cartacea) . - - <<extend>> - - > (Preleva Contanti)`
- Generalizzazione: quando un attore (o caso d'uso) specializzato eredita le capacità di un altro più generale
	- `[Amministratore] ---------▷ [Utente Registrato]`

![[GPT PREMIUMS/16_agosto_appunti/assets/p057-fig-057.png|346]]


#### Activity Diagram
Usato per descrivere come si sviluppa il flusso di un singolo Use Case (prevalentemente dal lato interno del sistema)
I suoi elementi sono:
- **Nodo iniziale:** pallino nero pieno (`●`) che indica l'avvio del flusso
- **Attività (Azione):** rettangolo con angoli arrotondati contenente l'azione da compiere
- **Transizioni:** frecce orientate che collegano i nodi indicando il passaggio da un'attività alla successiva
- **Nodo finale:** cerchio con dentro un punto nero ( `◎`)
- **Decision Node (Branch) & Guard Condition:** 
	- è un **rombo** ($\diamondsuit$) da cui escono più frecce alternative
	- su ogni freccia c'è la **Guard Condition (Guardia)** scritta tra quadre `[condizione]` (es. `[saldo >= totale]` vs `[saldo < totale]`)
- **Merge Node:** 
	- è sempre un **rombo** ($\diamondsuit$) che riceve più percorsi alternativi in ingresso e ne fa uscire uno solo per ricongiungere i rami
- **Fork (Barra di sincronizzazione):** 
	- **barra nera piena** con 1 freccia in ingresso e più frecce in uscita $\to$ avvia attività in parallelo/concorrenza
- **Join (Barra di sincronizzazione):** 
	- **barra nera piena** con più frecce in ingresso e 1 sola in uscita $\to$ attende che **tutte** le attività parallele siano completate prima di proseguire
![[GPT PREMIUMS/16_agosto_appunti/assets/p060-fig-060.png|374]]

#### Sequence Diagram
Diagrammi sempre di tipo comportamentale
descrivono lo scambio di messaggi tra oggetti del sistema software
gli elementi sono:
- **Lifeline:** ogni oggetto è in alto e ognuno ha una linea tratteggiata che scende in verticale e che indica il tempo che passa
- **Activation box:** sulla lifeline appaiono questi rettangoli stretti e lunghi 
	- descrivono che in quel momento è attiva una azione
- **Messaggi:** frecce che indicano lo scambio dei messaggi tra i vari lifeline in quel determinato tempo, messaggi come:
	- **call()**: il mittente invia un messaggio **(sincrono)** e si blocca in attesa di risposta (freccia con punta piena)
		- `--------►`
	- **signal()**: il mittente invia un messaggio ma può fare altro nel frattempo **(asincrono)** (freccia con punta aperta a spina)
		- `-------->`
	- **flat()**: messaggio ancora non definito
		- `-------->`
	- **reply**: risposta al messaggio con linea tratteggiata
		- `< - - - - `

#### Collaboration Diagram
Si usa in fase OOD principalmente
è senza linea del tempo
- per il resto ci sono messaggi tra oggetti come un sequence
#### State Diagram
Diagramma che descrive la parte dinamica delle specifiche semi-formali con elementi come:
- **Stato**: descrive lo stato di un oggetto
- **Transizione**: passaggio di stato di un oggetto rispetto ad un evento o azione che avviene

![[GPT PREMIUMS/16_agosto_appunti/assets/p065-fig-065.png|257]]
#### Package (Diagramma dei Package)
- **Cos'è:** Meccanismo per raggruppare elementi correlati (classi, use case) graficamente rappresentato come una cartella con linguetta.
- **Scopi:** 
  1. *Gestione complessità* (organizza grandi progetti in sottosistemi).
  2. *Namespace* (evita conflitti di nomi, es. `Package::Classe`).
  3. *Controllo visibilità* (espone solo le classi pubbliche nascondendo quelle interne).
- **Dipendenza ($-->$):** il Package A dipende dal Package B se le sue classi usano elementi di B (base per l'architettura a livelli/Layer).

![[GPT PREMIUMS/16_agosto_appunti/assets/p066-fig-067.png|400]]

MODULO  5
## Software Project Management
Consiste nella gestione del progetto software con una forte pianificazione.
Si può ricondurre alle ***quattro P*** che sono tutte collegate tra loro:
- **People**
	- organizzare i team e le loro responsabilità
- **Product**
	- comprendere obiettivi, funzioni, dati e caratteristiche del prodotto software prima di realizzarlo
- **Process**
	- stabilisce il modo in cui verrà sviluppato il prodotto con modello e attività del processo di sviluppo software
- **Project**
	- organizzazione effettiva con task, tempi e costi
### Organizzazione del team
Alla base della logica dietro l'organizzazione del team vi è una legge
#### Legge di Brooks
> aggiungere personale a un progetto software già in ritardo può farlo ritardare ulteriormente.

Questo avviene per diversi motivi:
- le nuove persone vanno formate
- non tutti i compiti si possono parallelizzare **(indivisibilità)**
- La comunicazione tra le persone può aumentare a dismisura comportando maggiore possibilità di incorrere in errori o incomprensioni **(Overhead di interazione)**

con questa formula sotto si può notare come il numero di canali di comunicazione $C$ è quadratico
$$C = \frac{n(n-1)}{2}$$
#### Due modelli di organizzazione del team
Ora si vedono due modelli estremi, di solito si adattano delle vie di mezzo


##### Team Democratico
**Senza un capo**, le decisioni vengono prese a **maggioranza**
- **egoless programming**, programmare con l'obiettivo di migliorarsi e il codice appartiene a tutti
***Pro***: Alta motivazione, utile per problemi complessi o innovativi
**Contro**: canali di comunicazione eccessivi

##### Team con Chief programmer
Di tipo gerarchico dove ogni partecipante ha un suo ruolo e ognuno di loro comunica con uno chief programmer
***Pro***: canale di comunicazione ridotto
***Contro***: sovraccarico del capo
![[GPT PREMIUMS/17_agosto_appunti/assets/p068-fig-070.png|385]]

Poi vi è anche una versione dove si divide il tutto in 2 team per evitare il Contro
- **team Leader** per gli aspetti **tecnici**
- **team Manager** per quelli **gestionali**
### Stime nei progetti software
Ci sono diverse grandezze che possiamo stimare per capire cosa ci aspetta nelle fasi successive dello sviluppo software:
- *dimensione del software*
- *effort necessario* spesso espressa in Man-Months ovvero $persone\ nel \ team\  \times \ \ mesi$
- *durata dello sviluppo*
- *costo*

si calcolano con 3 approcci principali:
- **antologia**: ci si basa su progetti passati, se sono simili ha senso sennò no
- **scomposizione**
- **modelli algoritmici empirici**

analizziamo meglio gli ultimi 2
##### Scomposizione
###### Usando LOC
Utile per progetti grandi, si scompone, si calcolano le stime e poi si combinano
Si possono ad esempio calcolare:
- **Effort**
$$Effort=\frac{Estimated \ LOC}{LOC/pm}$$
- **Cost**
$$Cost=Estimated \ LOC \times \$/ LOC$$
Dove: 
- Estimated LOC: Linee di codice stimate
- LOC/pm: Linee di codice prodotte in un Man-Month
- $/LOC: costo medio per linea di codice

![[GPT PREMIUMS/17_agosto_appunti/assets/p070-fig-072.png|380]]

Problema: troppo dipendente dal linguaggio usato
###### Function Point
si da una misura effettuata in 2 passaggi
- ***UFC***
	- conteggio funzionale non aggiustato
- ***TCF***
	- correzione del valore con complessità tecniche
Per poi fare
$$FP = UFC \times TCF$$

***UFC***
valutiamo le seguenti misure
- **Dati**
	- *ILF*: dati gestiti internamente
	- *EIF*: dati esterni gestiti da altre app ma condivise con il sistema software
- **Interazioni con l'esterno**
	- *EI(External Input)*: input che entrano nel software
	- *EO(External Output)*: dati che escono dal software
	- *EQ(External Query)*: input che genera un output senza modificare archivi

![[GPT PREMIUMS/17_agosto_appunti/assets/p071-fig-073.png|320]]

Si fa una somma dei valori ponderati producendo così UFC

***TCF***
si aggiungono 14 gradi di influenza con un valore da 0 a 5(irrilevante-essenziale)
e poi si calcola tutto così
![[GPT PREMIUMS/17_agosto_appunti/assets/p074-fig-076.png|202]]

poi si calcola infine la formula scritta sopra ovvero la moltiplicazione tra UFC E TCF

###### Backfiring
Problema: modelli possono usare LOC ma noi abbiamo usato FP
- si usa una tabella per fare il passaggio da una parte all'altra
- utile per fare calcoli con modelli algoritmici empirici
$$\text{LOC} = \text{FP} \times \text{Gearing Ratio}$$
![[GPT PREMIUMS/17_agosto_appunti/assets/p074-fig-077.png|235]]
#### modelli algoritmici empirici
Abbiamo visto solo un tipo:
###### COCOMO - COnstructive COst mOdel
Utile per stimare l'effort di sviluppo, poi si possono derivare durate e costi
Si dividono prima 3 livelli di precisione che si vogliono ottenere
- **Basic**: Stime grezze e iniziali
- **Intermediate**: Più preciso, si scompone il sistema in sotto-sistemi
- **Advanced**: il più dettagliato, si divide il sistema in singoli moduli

Si basa anche sul **modello del prodotto** 3 esempi:
Organic->Semidetached->Embedded

Dopo aver definito queste 2 cose si stimano le KLOC previste
- Kilo Lines of Code  `20 KLOC` $\approx$ `20 000 LOC`

si calcola con 2 livelli di precisione diversi:
- **Nominale**:
	- calcolo senza troppe caratteristiche
	- $Effort_{nominale} = a \times (KLOC)^b$
	- risultato in Man-Months
	- a e b dipendono dalle cose scelte prima (livelli di precisione e modello del prodotto)
- **Cost Drivers**
	- si corregge quello nominale tenendo conto di cambiamenti
	- si da un punteggio a questi **15 fattori** e poi si fa il loro prodotto
	- $C = \prod_i C_i$ 
	- e poi $Effort = Effort_{nominale} \times C$

Dopo aver trovato l'effort si deriva
$$Time = c \times Effort^d$$
- dove c e d sono in base al modo di sviluppo

oppure anche
$$Costo\ totale = \sum (Effort_{ruolo} \times Costo\ per\ MM_{ruolo})$$
- costo per Man-Months
### La pianificazione temporale
Si organizzano i task del progetto nel tempo, non sono per forza indipendenti
Si rappresenta con 2 strumenti complementari
#### PERT - Program Evaluation and Review Technique
rappresenta i task e le loro dipendenze con un grafo
- **nodi**=task
- **archi**=vincoli di precedenza
si nota *come cammino* *critico* quel cammino di task che fa durare meno tempo lo sviluppo

![[GPT PREMIUMS/17_agosto_appunti/assets/p078-fig-080.png|600]]
#### Diagramma di Gantt
Utile per capire le effettive scalette temporali sul calendario

![[CORSETTI/Immagini/Pasted image 20260421100613.png|408]]


### Documento SPMP - Software Project Management Plan
Si prendono stime, pianificazione temporale, organizzazione del team e rischi e si mettono in un documento che certifica il contratto operativo del progetto
- ovvero il contratto che mette nero su bianco ogni cosa possibile per chi lavora sul progetto
MODULO  6
# MODULO 2
## Progettazione Software
si vuole **passare** dal **documento** di **specifica** al **documento di progetto**
- dove si fanno effettivamente le cose(**dominio della soluzione**)

Alla base di questa fase della progettazione vi sono 6 principi fondamentali:
- **Stepwise refinement**: man mano si creano iterazioni sempre migliori del documento di progetto
- **Astrazione**: consente di concentrarsi su determinati aspetti e escluderne altri si divide in:
	- procedurale, si da un focus ai servizi che offre
	- dei dati, si lavora con dei dati ma senza sapere la loro rappresentazione interna
- **Decomposizione modulare**: si **suddivide** un **problema** in **sotto** **problemi** più piccoli e isolati, genera lo structure chart(artefatto prodotto dove si vede una gerarchia dei moduli con nodi e archi)
	- *Dimostrazione dell'Effort*:
	- Dati due problemi $p_1$ e $p_2$, sia $C$ la complessità ed $E$ lo sforzo (effort):
	- Se $C(p_1) > C(p_2) \implies E(p_1) > E(p_2)$ *(più complesso = più sforzo)*
	- Sapendo che la complessità è super-additiva: $C(p_1 + p_2) > C(p_1) + C(p_2)$
	- Allora: $E(p_1 + p_2) > E(p_1) + E(p_2)$ *(dividere conviene sempre)*
- **modularità**: suddivisione del sistema software in moduli proprio al livello architetturale
	- per giudicare la qualità di una suddivisione del sistema software si valutano criteri di
		- *cohesion*: quanto le attività contenute nello stesso modulo siano correlate tra loro(7 livelli di grado dal peggiore al migliore)
			- coesione alta significa che i moduli hanno un loro scopo e si possono comprendere e modificare facilmente
		- *coupling*: grado di dipendenza tra moduli differenti (5 livelli dal peggiore al migliore)
			- un coupling alto significa dover conoscere bene gli altri moduli, e le modifiche su uno rischiano di romperne altri
	- una scomposizione è ben fatta se si ha ***massima*** ***coesione*** e ***minimo*** ***coupling***

![[GPT PREMIUMS/17_agosto_appunti/assets/p082-fig-084.png|377]]
- **information hiding**: ogni modulo deve rendere visibile solo ciò che gli altri moduli devono conoscere nascondendo altri dettagli implementativi
- **riusabilità**: utilizzare un nuovo prodotto su elementi già sviluppati
	- avviene su diversi livelli crescenti
		- **moduli software**: riuso di singole funzioni o classi
		- **application framework**: riuso di una struttura portante
		- **design pattern**: riuso di schemi e relazioni tra classi
		- **architettura software**: riuso dell'intera architettura
![[GPT PREMIUMS/17_agosto_appunti/assets/p087-fig-089.png|331]]

### OOD - Object Oriented Design (preliminare)
Vi è una **logica** che riporta quella di **requirements engineering** per gli OOA ma la porta per la **progettazione software** con **OOD**, un processo iterativo e incrementale che si divide in 2 sottofasi:
- **preliminare**
- **dettagliato**
come prima cosa che viene analizzata nella fase di OOD per capire COME deve fare il sistema e non più COSA deve fare il sistema vi è la sua architettura
#### Architetture di sistema
si descrive come devono essere messe le componenti del sistema e come devono collaborare si dividono in
##### Centralizzate
il sistema software gira su un solo nodo di calcolo(tipo un solo PC)
- **Mainframe-based Architecture**
	- un *unico elaboratore* che esegue il *software* e gestisce i *dati*
	- gli *utenti* comunicano con questo calcolatore mediante *terminale*
- **File-sharing**
	- *File condivisi tra pc* ma che fanno calcoli a sè
	- i *pc non comunicano* tra di loro e non condividono risorse di calcolo
##### Distribuite
si suddivide l'elaborazione tra *più* *nodi* porta diversi 
- vantaggi come:
	- *scalabilità*, *load balancing*, trasparenza, concorrenza
- svantaggi come:
	- *latenza della rete*, *sicurezza*, gestire *differenza tra dispositivi* diversi usati in rete
prevedono l'uso di **middleware**, **strato** di software che fornisce **servizi** di comunicazione e **connettività** alle applicazioni distribuite si **mette tra**:
- **applicazioni**
- **sistema operativo e infrastruttura di rete**
##### Client/Server
Si divide l'architettura del sistema software in:
- **Client**:
	- si interfaccia con l'utente
- **Server**:
	- risponde al client e processa i servizi

Il sistema software viene diviso in 3 layer concettuali per capire bene come strutturare il tutto seguendo i concetti BCE:
- **Presentation Layer**: Boundary con l'utente
- **Application Processing Layer**: Control, gestisce la logica applicativa e operazioni
- **Data Management Layer**: Entity, gestisce dati e informazioni


diverse tipologie di Client/Server
***Two-Tier Architecture***
- usa solo client e server e si concettualizza in 2 tipi di gestione del carico:
	- **Thin Client**: dove il client gestisce solo la parte del Presentation Layer e tutto il resto lo fa il server
	- **Fat Client**: il server gestisce la parte dei dati e il resto avviene sul client
***3-Tier e N-Tier***
è come Thin Client ma aggiunge un nuovo server detto 
- **application server** che si occupa di processare i dati che richiede al
- **backend server** che ha solo i dati
N-Tier per aggiungere altri server come uno di autenticazione

##### Architettura a Oggetti Distribuiti & ORB (Object Request Broker)
- **Ruolo simmetrico**: non vi è più distinzione rigida tra client e server, ogni oggetto può agire come entrambi
- **Trasparenza**: invocare un metodo su un oggetto remoto è identico all'invocazione locale (`obj.metodo()`)
- **ORB (Object Request Broker)**: middleware basato su un *Software Bus*:
	- *Bus astratto*: specifica l'interfaccia dei servizi di comunicazione (es. standard **CORBA**)
	- *Implementazione del bus*: realizzazione concreta per hardware/SO specifici
- **Meccanismo di funzionamento (Stub & Skeleton)**:
	- **Client Stub**: proxy locale lato client che esegue il **Marshalling** (impacchetta la chiamata e i parametri in un flusso di byte da spedire sulla rete)
	- **Server Skeleton**: riceve i byte dall'ORB lato server, esegue l'**Unmarshalling** (spacchetta i parametri) e invoca il metodo sull'oggetto reale
- **IDL (Interface Definition Language)**: linguaggio neutro per definire le interfacce indipendentemente dal linguaggio di programmazione (poi compilato per generare Stub e Skeleton in Java, C++, ecc.)
##### Component-Based
**Impacchetta** il software mediante **componenti preconfezionate** che hanno una separazione netta tra *interfaccia e implementazione*
infatti vi è il concetto di **black box** (sufficiente sapere l'interfaccia esterna)
vengono utilizzati **Component Framework** per fornire le basi per costruire applicazioni che fanno parte di uno stesso dominio
![[GPT PREMIUMS/18_agosto_appunti/assets/p091-fig-090.png|390]]

##### SOA(Service Oriented Architecture) e Web Services
Architettura di tipo distribuito che è composta da servizi autonomi
Sviluppare applicazioni sfruttando questi servizi autonomi che possono essere scritti in qualsiasi linguaggio di programmazione, ognuno possiede una sua descrizione per poterlo utilizzare
- **Service Provider**: mette a disposizione il servizio
- **Service Consumer**: utilizza il servizio
	- può diventare a sua volta un **Service Provider** esponendo un nuovo **Servizio Composto (_Composite Service_)** a livello più alto

Per trovare i servizi un consumer si interfaccia con un Service Broker
**Service Provider ↔ Broker ↔ Service Consumer**

Questa comunicazione vede pattern complementari di comunicazione
***Service Registration Pattern*** (pattern di registrazione del servizio)
- Il broker ha le varie informazioni sui servizi e comunicano come in foto
![[GPT PREMIUMS/18_agosto_appunti/assets/p093-fig-092.png|202]]
***Broker Forwarding e Broker Handle*** (pattern di invocazione del servizio)
- pattern che descrivono come il consumer si interfaccia con il broker
- nel primo il broker fa da intermediario tra service e consumer
![[GPT PREMIUMS/18_agosto_appunti/assets/p094-fig-093.png|346]]

- nel secondo possiamo vedere come il broker dica solo la posizione del servizio e poi il consumer deve parlare con il servizio(meno trasparenza)
![[GPT PREMIUMS/18_agosto_appunti/assets/p094-fig-094.png|275]]
***Service Discovery Pattern*** (pattern di ricerca del servizio)
- il consumer chiede al broker una tipologia di servizio non specifica e si mette in contatto con quel servizio
![[GPT PREMIUMS/18_agosto_appunti/assets/p095-fig-095.png|330]]

######  Web services
è un determinato **servizio SOA** che utilizza protocolli di internet
un servizio che segue il modello SOAP/WDSL ed è composto da 3 problemi distinti
- **Come registrare e scoprire il servizio** con ***UDDI***(Universal Description, Discovery and Integration)
	- puoi pubblicare un servizio, ricercare servizi ecc...

![[GPT PREMIUMS/18_agosto_appunti/assets/p096-fig-096.png|244]]
- **Come descrivere il servizio** con ***WSDL***(Web Services Description Language)
	- permette di far vedere le operazioni possibili, quali input/output sono previsti, dove si trova ecc
![[GPT PREMIUMS/18_agosto_appunti/assets/p097-fig-099.png|296]]
- **Come scambiare messaggi con questi servizi** con ***SOAP*** (Simple Object Access Protocol)
	- protocollo che usa XML e protocollo HTTP

Un altro stile architetturale di Web Services sono quelli con il sistema REST
1. **Client-Server**: Stile di interazione "pull" (il client richiede, il server fornisce).
2. **Stateless (Senza stato)**: _Fondamentale_. Il server non memorizza alcun contesto (stato) del client tra una richiesta e l'altra. Ogni richiesta HTTP contiene tutte le informazioni necessarie per essere compresa dal server.
3. **Uniform Interface (Interfaccia Uniforme)**: Si usano esclusivamente i verbi standard del protocollo HTTP per eseguire le operazioni CRUD (Create, Read, Update, Delete).
4. **Named Resources (Risorse Nominate)**: Ogni risorsa è identificata univocamente da una URL/URI (es. `http://api.miosito.com/utenti/123`).
5. **Interconnected resource representations**: Le risorse sono collegate tramite link, permettendo al client di navigare da uno stato all'altro dell'applicazione (Hypermedia).
consente operazioni come GET, POST, PUT e DELETE
![[GPT PREMIUMS/18_agosto_appunti/assets/p098-fig-100.png|265]]
##### Pattern per transazioni distribuite
Non sono un'architettura a sé, ma **pattern di sicurezza/coordinamento** applicati all'interno di architetture distribuite (SOA e Client/Server) per garantire la consistenza dei dati su più server/DB indipendenti.

Una **transazione** è una richiesta che raggruppa due o più operazioni in una singola unità logica e deve rispettare le proprietà **ACID**:
- **Atomicity**: "tutto o niente" (se fallisce una parte, si annulla tutto con un *rollback*)
- **Consistency**: il sistema passa da uno stato valido a un altro stato valido
- **Isolation**: transazioni concorrenti non interferiscono tra loro
- **Durability**: dopo il *commit*, le modifiche sono permanenti

###### Coordinamento dei Servizi:
Un'applicazione SOA può utilizzare più servizi contemporaneamente bisogna stabilire chi controlla l'ordine e le interazioni tra i servizi quindi vi è:
- **Orchestrazione**: un coordinatore centrale (**orchestratore**) controlla e dirige l'ordine di esecuzione di tutti i servizi
- **Coreografia**: nessun coordinatore centrale; i servizi collaborano e si scambiano messaggi direttamente in modo decentralizzato

MODULO  7
### OOD - Object Oriented Design (Di dettaglio)
l'OOD dettagliato definisce la struttura interna delle classi prima della codifica, si rappresentano le cose sempre con diagrammi UML ma con un focus sui dettagli implementativi e di codice
Ogni use case che era definito nella parte delle OOA è definito ora come delle classi che collaborano tra loro, collaborazione che hanno 2 parti:
- **Comportamentale** (dinamica): Spiega come gli elementi comunicano nel tempo mediante Communication Diagram o Sequence Diagram
- **Strutturale**(statica): rappresenta la struttura vera e propria aggiungendo dettagli al Class Diagram
#### Principi di buon Design
##### Legge di Demetra
*Afferma* che un **oggetto** deve **comunicare** **solo** con i suoi **vicini** **immediati** e **non** con **estranei**, deve **limitare** le sue **dipendenze** agli **oggetti** con cui ha una **relazione** **diretta** per migliorare la **manutenibilità** e la **flessibilità** di **codice**
Per ridurre l'inter-layer coupling (accoppiamento tra livelli diversi delle componenti) e usare soprattutto intra-layer coupling (accoppiamento tra oggetti dello stesso livello)
###### Piccola parentesi sugli UML structured Class
non sono direttamente collegati con i principi di buon design ma in UML abbiamo visto le **class diagram standard**, che descrivono le classi fuori
poi ci sono le **structured class** che invece approfondiscono cosa vi è dentro
da fuori però vengono ancora viste come delle **black box** e solo gli **ingegneri** vedono al suo interno, gli elementi principali sono:
- **Part**: **componente**/oggetto **interno** appartenente alla **classe**
- **Port**: punto di **interazione** con **l'esterno** (espone/richiede **interfacce**)
- **Connector**: linea di **comunicazione interna** che *collega* le **parti** tra loro **o** alle **porte**
- **Role**: *ruolo* ricoperto da un *elemento* nella *collaborazione*
![[assets/p107-fig-111.png|383]]

ricordiamo quindi che class diagram e structure diagram sono diversi
![[assets/p108-fig-112.png|452]]
###### Deployment Diagram
Modella l'architettura fisica e il rilascio (*deployment*) del software a runtime:
- **Nodi (cubi 3D)**: dispositivi hardware fisici o ambienti di esecuzione (es. *Server Web, Database Server, Smartphone*).
- **Artefatti (`<<artifact>>`)**: i file eseguibili/binari concreti che vengono installati sui nodi (es. `app.jar`, `database.sql`, `setup.exe`).
##### Design Pattern
Servono per **risolvere** **problemi** **ricorrenti** nelle **fasi** di **progettazione** permettendo **riutilizzo** di **strutture** già collaudate.
Si classificano su **due** **dimensioni** **indipendenti**
***Purpose***
- Descrive il tipo di problema progettuale che affronta il pattern e sono:
	- Problemi **Creazionali**: Facilitare la creazione di oggetti
	- Problemi **Strutturali**: Consentono la creazione di strutture più flessibili riprendendo concetti di ereditarietà e polimorfismo
	- Problemi **Comportamentali**: Gestiscono gli algoritmi e i comportamenti che possono avere gli oggetti
***Scope***
- Specifica se il pattern si applica a classi o oggetti
	- **Class Scope**: relazioni tra classi e sottoclassi riprendendo i concetti di ereditarietà
	- **Object Scope**: relazioni tra oggetti

Iniziamo descrivendo i Pattern di tipo creazionale:
###### Factory Method (creazionale)
Di tipo Creazionale e Class Scope sfruttando ereditarietà
Consente di non specificare per forza quale oggetto creare
- altrimenti una classe sarebbe obbligata a creare un determinato oggetto che è istanza di una determinata classe, così invece dipende dalla classe che lo estende
Soluzione:

1. **`Creator`** dichiara il metodo di creazione (`factoryMethod()`) con tipo di ritorno astratto `Product`, **senza sapere né decidere quale oggetto concreto verrà creato**.
2. **`ConcreteCreator`** (la sottoclasse) fa l'override del metodo ed **è l'unica che sa e decide quale classe concreta istanziare (`new ConcreteProduct()`)**.
![[assets/p069-fig-033.png|508]]
###### Abstract Factory (creazionale)
Di tipo Creazionale e Object Scope
Permette di creare oggetti tra loro correlati come delle famiglie senza specificare le loro classi effettive ma che li rende perfettamente compatibili
Soluzione:
- `AbstractFactory`: interfaccia che dichiara i metodi di creazione dei prodotti possibili
- `ConcreteFactory`: crea una determinata famiglia di oggetti a partire dalla abstract
- `AbstractProduct`: definisce una interfaccia comune per un tipo di prodotto
- `ConcreteProduct`:le effettive classi prodotte da quella factory concreta
- `Client`: usa Abstract factory e Abstract Product senza conoscere le concrete
![[assets/p069-fig-033.png|388]]

passiamo ora ai pattern strutturali:

###### Adapter (strutturale)
Di tipo strutturale e sia Object che Class Scope
Consente di riutilizzare una interfaccia di una classe per farla usare da altre classi che in realtà sono incompatibili con quella interfaccia
Soluzione:
- `Target`: interfaccia che vuole usare il client
- `Client`: colui che usa Target
- `Adaptee`:classe esistente che si vuole riutilizzare ma incompatibile per il client
- `Adapter`: fa da intermediario tra Adaptee e il Target convertendo le richieste
nelle foto si nota come può essere sia Class che Object
- Class: Adapter eredita tra target e adaptee
- Object: eredita da target e contiene una istanza di Adaptee
![[assets/p070-fig-034.png|650]]

###### Composite (strutturale)
Di tipo Strutturale e Object Scope
Consente di comporre gli oggetti in strutture ad albero gerarchiche consentendo di trattare sia con le singole foglie che con i gruppi che si possono generare
**Trattare gli elementi singoli (foglie) e le composizioni di elementi (cartelle/rami) ESATTAMENTE ALLO STESSO MODO, facendogli condividere la stessa interfaccia comune `Component`**
Soluzione:
- `Component`: interfaccia comune per gli elementi dell'albero sia foglie che elementi
- `Leaf`: oggetti terminali che implementano operazioni di base
- `Composite`: elemento contenitore che ha una lista di Component figli implementa l'operazione base in modo ricorsivo(quello della leaf)
- `Client`: interagisce con Component

![[assets/p071-fig-035.png|469]]
###### Decorator (strutturale)
Di tipo Strutturale e Object Scope
Aggiunge nuove funzionalità a un oggetto a runtime
Soluzione:
- `Component`: interfaccia comune per l'oggetto base e i decorator
- `ConcreteComponent`: l'oggetto effettivo a cui vogliamo aggiungere funzionalità
- `Decorator`: implementa l'interfaccia component e contiene un riferimento a un oggetto Component interno
- `ConreteDecorator`: aggiunge le proprie funzionalità specifiche 
![[assets/p071-fig-036.png|452]]


passiamo ora ai pattern comportamentali
###### Observer (comportamentale)
Di tipo Comportamentale e Object Scope
Consente di definire una dipendenza 1 a N tra subject e observer dove se un oggetto cambia stato tutti gli oggetti dipendenti vengono aggiornati e notificati
Soluzione:
- `Subject`: classe base che contiene l'elenco degli observer e una lista delle operazioni per gestirli
- `Observer`: interfaccia comune per tutti gli observer e contiene il metodo di aggiornamento
- `ConcreteSubject`: oggetto effettivo che invoca i metodi e fa le cose e chiama notify e aggiorna ciascun observer
- `ConcreteObserver`: riceve le notifiche e implementa update
![[assets/p072-fig-037.jpeg|360]]

###### Template Method (comportamentale)
Di tipo comportamentale e Class Scope
Consente di definire lo scheletro di un algoritmo delegando alle sottoclassi la definizione dei singoli passi che possono variare
Soluzione:
- `AbstractClass`:contiene il template con i passi fissi da fare
- `ConcreteClass`: sottoclasse effettiva che implementa i singoli metodi
![[assets/p073-fig-038.png|378]]
###### Strategy (comportamentale)
Di tipo comportamentale e Object Scope
Consente di definire una famiglia di algoritmi che si possono intercambiare tra di loro mettendoli in una classe separata
Soluzione:
- `Strategy`: interfaccia comune degli algoritmi
- `ConcreteStrategy`: le classi effettive che implementano quel determinato algoritmo
- `Client`: utilizza una strategy
![[assets/p074-fig-039.png|416]]

non è soltanto una libreria, ma uno **scheletro riutilizzabile dell’applicazione**, tipicamente basato su classi astratte e sulle loro relazioni; consente riuso sia di design sia di codice. I Design Pattern possono essere usati come “mattoni” per costruire framework.

MODULO  8
## Metriche del Software e Misura della Complessità
Servono **misure** *quantitative* e *oggettive* per valutare la *complessità*, l'*affidabilità* e la *manutenibilità* del **progetto**.
Le misure utilizzate si dividono in 2 grandi categorie:
- **intermodulari**: valutano le relazioni e le chiamate tra i moduli
- **intramodulari**: valutano i moduli singolarmente

### Structure Chart(intermodulare)
l'architettura dei moduli può essere rappresentata mediante un grafo
$$S = \{N,R\}$$
dove:
- `N` sono i moduli come nodi
- `R` sono le relazioni tra i nodi e sono gli archi
Viene utilizzato per misurare 4 attributi diversi di tipo qualitativo:
- **coesione**: quanto un modulo svolge un compito specifico
- **coupling**: il grado di dipendenza tra i moduli
- **morfologia**: la forma complessiva del grafo(architettura)
- **information flow**: quanti dati entrano ed escono dai moduli
Si vogliono ora approfondire in particolare
#### Morfologia
l'architettura viene valutata attraverso
- **Size**: numero di nodi e archi
- **Depth**: distanza massima dalla radice ai livelli più profondi
- **Width**: massimo numero di nodi in uno stesso livello
- **Edge-to-Node Ratio**: rapporto tra archi e nodi

Da questi attributi si usano 2 metriche:
##### Internal Reuse
misura il grado di riutilizzo dei moduli
$$r(G) = e - n + 1$$
se $r(G)=0$ è un albero puro 
se $r(G)>0$ ci sono moduli riutilizzati

##### tree impurity
misura quanto il grafo si discosta da un albero perfetto
$$m(G)=\frac{2(e−n+1)}{(n−1)(n−2)}​$$

se $m(G)=0$ è un albero perfetto puro
se $m(G)=1$ grafo è completamente connesso(disordine)

#### Information Flow
Serve per definire quanto flusso passa tra i moduli intermodulare(relazioni tra moduli)
- **fan-in** → quantità di flussi che arrivano al modulo
- **fan-out** → quantità di flussi che partono dal modulo
$$IF(M_i) = [fan\text{-}in(M_i) \times fan\text{-}out(M_i)]^2$$
![[assets/p078-fig-040.jpeg|299]]

#### FlowGraph
rappresenta flusso di entrata e uscita interna nelle componenti dei moduli intramodulare

$$FG = \{N,E\}$$

- i **nodi** rappresentano blocchi o istruzioni del programma;
- gli **archi** rappresentano i possibili passaggi del controllo da un nodo all'altro.
![[assets/p079-fig-041.png|364]]

##### Complessità ciclomatica di McCabe
usata con i flowgraph misura Il numero di **cammini di codice indipendenti** (quanti `if` e rami logici ci sono).
Data dalla formula basata sui flowgraph 
$$v(F) = e - n + 2$$
- un valore basso implica pochi percorsi alternativi un valore alto più percorsi quindi più difficoltà di comprensione
- **Soglia di rischio**: se $v(F) > 10$ il modulo è troppo complesso e va rifattorizzato/spezzato
- Serve per il **Path Testing** (indica il numero minimo di test case necessari per coprire tutti i percorsi indipendenti)

Poi esiste un trucchetto per misurare senza fare il flowgraph, basta vedere il numero di condizioni $d$ che appaiono nel codice e fare:
$$v(F) = 1 + d$$
(tipo 5 if è d=5)

##### Complessità Essenziale di McCabe
Misura il grado di **non-strutturazione** (presenza di spaghetti code o salti anomali).
Si calcola collassando iterativamente i sottografi strutturati ($D_0, D_1, D_2, D_3$) in un unico nodo:
$$ev(F) = v(F) - m$$
- dove $m$ è il numero di sottografi strutturati collassati
- **Teorema**: $ev(F) = 1 \iff$ il programma è perfettamente **D-strutturato** (pulito, senza salti anomali)

MODULO  9
## Qualità del software, SQA e Testing
La qualità del software è la **conformità** del **prodotto** a quelli che sono i **requisiti** **funzionali** e **prestazionali** esplicitamente **dichiarati**, insieme anche agli **standard** di **sviluppo** **stabiliti**.
Ci sono **diversi** **modelli** che esplorano la qualità del software in modi diversi
#### Quality Model di McCall
**Valuta** la qualità del prodotto sotto **3** **aspetti** ognuna con **diversi** **indici** di **qualità**
- **Product Operation**
	- si valuta il prodotto rispetto all'uso quotidiano
- **Product Revision**
	- quanto il prodotto può essere controllato e modificato
- **Product Transition**
	- capacità di adattarsi a nuovi ambienti
ognuno di questi 12 fattori viene calcolato a loro volta basandosi su 10 attributi che attraverso il Checklist Method viene valutato come positivo o negativo

![[assets/p148-fig-168.png|298]]

questa checklist non viene fatta solo da una persona ma da un team di evaluation variegato
attraverso Walkthrough o inspection il team si confronta per arrivare a una valutazione condivisa
![[assets/p152-fig-177.png|346]]
#### Software Quality Assurance — SQA
**Utilizzato** per capire in modo **sistematico** se **prodotto** software e **processo** di sviluppo software siano **conformi** agli **standard**
Queste **verifiche** vengono fatte da un **team** a se (comporta dei *costi*)
- *Team SQA*: si assicura che la **documentazione** sia **completa**, i test pianificati vengano svolti ecc...
- *SQA Plan*: **piano** confermato dal **management** per definire le **verifiche** da **applicare** al **progetto**
- **standard** e *procedure*: rispettivamente **cosa** dovrebbe essere fatto e *come* va fatto
#### Verification, Validation e Testing
Si vuole innanzitutto definire la differenza tra *Verifica e Validazione*(V&V)
- **Verifica**: controlla se il prodotto viene costruito correttamente rispetto agli artefatti e alle specifiche di riferimento
	- "stiamo costruendo il prodotto in modo giusto?"
- **Validazione**: controlla se il software soddisfa le reali esigenze dell'utente finale
	- "stiamo costruendo il prodotto giusto?"

poi si può anche definire ispezione e testing
- **Ispezione**: controlli statici che analizzano gli artefatti senza eseguire il codice
- **Testing**: controllo dinamico dove viene eseguito effettivamente il software

Il documento che pianifica le attività di testing è il **Test Plan**

poi si possono definire anche validation testing e defect testing:
- il *validation testing*(applicazione pratica): cerca di vedere se **soddisfa** i **requisiti** **utente** e *non fallisce*
- il *defect*: invece cerca *intenzionalmente* di *rompere* il *software* per trovare *bug*
##### 4 passi della fase di testing
- **Progettazione dei casi di test**: definiscono scenari e output attesi
- **Preparazione dei casi di test**: scelta degli input effettivi da fare
- **Esecuzione del programma**
- **confronto dei risultati**: predizione vs risultato ottenuto

##### 3 livelli di testing
1. **Component Testing**, testing di unità e *moduli separatamente*
2. **Integration Testing**, testing su *relazioni* tra *componenti* prima in piccolo poi in grande
3. **User Testing**, test *finale* con *dati* *reali* dei *clienti* per decidere se il software è *pronto* per il *rilascio*

##### Politiche di Testing
*Impossibile* *provare* *tutti* gli *input* possibili quindi si devono trovare delle *soluzioni*

Si distingue tra
- **Test Case**: include gli **input** + le **Test Predictions (gli output attesi corretti)** previsti dalla specifica
- **Test Data**: sono **solo gli input** forniti al software

###### Black Box e White Box
e il tester può vedere il sistema software come:
- **Black Box Testing**
	- il Tester conosce solo specifica, fornisce input e legge output
	- si usa equivalent partitioning per dividere gli input e gli output in classi di equivalenza
	- principio simile usato nelle testing guidelines provando su array e liste ma trattandole come black box
- **White Box Testing**
	- il tester conosce il codice, non deve testarlo tutto ma coprire una determinata % di codice `Testing Coverage`

###### Path Testing
Usato nel **White Box Testing** vi è il Path Testing
- usando i flowgraph si realizzano use Case che li attraversano
- visto che è impossibile testare tutto si cercando percorsi indipendenti(che creano un nuovo arco)
- si sfrutta la complessità ciclomatica per trovare percorsi linearmente indipendenti
![[assets/p157-fig-178.png|469]]

###### Integration Testing
Riunisce singoli test e li combina per vedere se funzionano insieme
organizzato in:
- Top-Down
	- parti dalle interfacce e scendi giù
- Bottom-Up
	- parti dai moduli di base e sali fino alle interfacce, per partire da sotto si usano test drivers, programmi che simulano il chiamante
###### Stress Testing
- Sovraccaricare il sistema fino al raggiungimento di prestazioni inaccettabili
###### Object Oriented Testing
- si fanno test di oggetti, metodi, classi
	- l'ereditarietà crea complicanze poiché un tester deve anche verificare le singole sottoclassi che ereditano metodi e altro
###### Cluster Testing
- Testing su un gruppo di oggetti vede tre approcci
	- Use-Case: testing basate dagli use case
	- Thread Testing: testing al cluster rispetto a una sequenza specifica di eventi
	- Object Interaction Testing: testing sui messaggi scambiati tra utenti
## Processi Aziendali: BPM e BPMN

### BP(Business Process), BPM e Workflow
- **BP**: definisce un insieme di attività correlate e coordinate per produrre valore per il cliente
- Workflow: parte aziendale che è automatizzata da software
- **BPM(Business Process Management)**: disciplina che applica metodologie di gestione e tecnologie per ottimizzare, modellare e analizzare i processi sia umani che non
- **Ciclo di Vita BPM (6 Fasi a spirale)**:
- Identificazione: si identificano i processi dell'azienda disponibili ->
- ->Modellazione (As-Is): intervista ai lavoratori e come lavorano oggi   -> 
- Analisi: si analizza il modello BPMN creato per scovare problemi -> 
- Riprogettazione (To-Be): si sistema il modello creato  -> 
- Implementazione: si trasforma il modello in qualcosa di utilizzato -> 
- Monitoraggio: si raccolgono log per capire come procede ->
![[Pasted image 20260829095359.png|365]]
### Notazione BPMN (Business Process Model and Notation — Standard OMG)
Notazione standard per rappresentare i processi aziendali(vedi sopra ciclo di vita viene usato BPMN) i suoi elementi di base sono:
- **Start Event** `○`: punto di inizio
- **End Event** `●`: punto di conclusione
- **Task**`(Rettangoli arrotondati)`: attività singola atomica
- **Sequence Flow**`──>`: indica ordine di esecuzione delle attività

poi ci sono i Gateway che definiscono le parti decisionali del processo
- **Exclusive Gateway**`(con la xor X)`: indica un unico percorso decisionale
- **Parallel Gateway**`(AND con il +)`: attiva più percorsi in parallelo
- **Inclusive Gateway**`(OR con ○)`: attiva uno o più percorsi contemporaneamente
sono di tipo **Event based**, appena si verifica una condizione si eseguono

![[Pasted image 20260829101432.png|408]]

chi svolge le attività è definito con:
- **Pool**: rappresenta una organizzazione o un partecipante
- **Lane**: rappresentano specifici ruoli di una pool

i **message flow** i messaggi scambiati tra i partecipanti

- **Orchestrazione**: processo interno controllato da un **singolo coordinatore centrale** (il motore di workflow all'interno di una Pool).
![[Pasted image 20260829101248.png]]
- **Coreografia**: interazione decentralizzata tra **più partecipanti/organizzazioni** senza un regista unico, coordinati solo dallo scambio di messaggi.
![[Pasted image 20260829101349.png]]
qui il pool è patient e receptionist la lane non si vede


MODULO  9 FINO A QUI