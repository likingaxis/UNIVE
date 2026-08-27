### MODULO 1
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
la dimensione di un sistema se raddoppiata fa quadruplicare l'effort necessario
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



## Modelli di Ciclo di Vita e Processi Software
Modelli che descrivono come organizzare le attività dello sviluppo software
### Modelli tradizionali
#### Build & Fix
Non è proprio un modello infatti è senza un processo strutturato ha le seguenti componenti:
- **Build first Version**: si costruisce rapidamente
- **Modify until client is satisfied**: si fa in loop
- **Operations mode**: fase effettiva di operazione si nota una freccia di manutenzione per migliorare il tutto
- **Retirement**: ritiro del prodotto

***Pro***: 0 costi di manutenzione e rilascio immediato
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


Modello che utilizza dei **Prototipi Throw-away** durante la fase di sviluppo
molto simile al modello waterfall ma nella fase di requisiti vengono creati questi prototipi che permettono:
- **Requirements Elicitation**: emergono requisiti in più dall'utente
- **Requirements Validation**: si consolida ciò che vuole davvero l'utente rispetto a ciò che avevamo capito

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
- Project Risk: influenza il progetto
- Product Risk: influenza il prodotto in termini qualitativi o simili
- Business Risk: influenza l'organizzazione che sviluppa il prodotto software
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
- 1. Initial
	- processo ad hoc(improvvisato)
	- presenza di heroes che la carryano
- 2. Repeatable
	- pratiche di base di project management come pianificazione e monitoring
- 3. Defined
	- processo documentato e standardizzato
- 4. Managed
	- non segue solo procedure ma raccoglie dati per misure quantitative per capire se sta funzionando
- 5. Optimizing
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
Specifiche che vengono rappresentate con modelli grafici
quando vengono definite possono dare 3 punti di vista differenti
- sul modello dei dati
	- requisiti relativi ai dati e alla loro organizzazione
- sul modello comportamentale
	- come il sistema interagisce con gli utenti e come diverse parti del sistema interagiscono tra di loro
- sul modello dinamico
	- come il sistema cambia stato e comportamento nel tempo
###### Modello ERD (Entity Relationship Diagram)
- Modella la struttura concettuale dei dati: **Entità** (rettangoli), **Attributi** (ovali), **Relazioni** (rombi) e cardinalità (`1:1`, `1:N`, `N:M`).
![[GPT PREMIUMS/15_agosto_appunti/assets/p038-fig-039.png|140]]
###### Modello (DFD Data Flow Diagram)
- Modella il cambiamento dei dati
- si organizza il tutto a più livelli di raffinamento, dove all'inzio si ha un modello molto superficiale e man mano diventa sempre più approfondito

- doppio quadrato= sorgente di dati
- freccia= il flusso dei dati
- quadrato arrotondato= processo che lavora i dati
- rettangolo aperto= memoria che salva i dati(archivio)
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
	- Abilitazione (si consente il passaggio della transizione), si attiva se ad esempio il peso è uguale al numero dei token nel posto di arrivo
	- Scatto(trasferimento effettivo dei token) si tolgono i token dal posto di inizio e si generano al posto di arrivo 
![[GPT PREMIUMS/15_agosto_appunti/assets/p033-fig-033.png|413]]
- **Proprietà delle Reti di Petri:**
	- **Non Determinismo:** più transizioni portano a una scelta di tipo deterministico se si abilita il Firing
	- **Liveness (Vitalità):** non ci sono situazioni di stallo
	- **Boundedness / Safety:** ciascun posto ha un limite di token che può avere
	- **Reachability (Raggiungibilità):** capacità di determinare se una certa configurazione di stato (marcatura $M$) può essere raggiunta a partire dallo stato iniziale $M_0$.

**FSM - Finite State Machines** basate su stati e transizioni con input/output

**Linguaggio Z** basato su teoria degli insiemi e logica dei predicati)

