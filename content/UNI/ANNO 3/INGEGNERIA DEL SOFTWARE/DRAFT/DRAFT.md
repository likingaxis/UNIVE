### Specifiche Formali con Petri Net

600  
Le **Petri Net** sono un formalismo utilizzato per esprimere specifiche formali.

Nella notazione presentata compaiono elementi come:

- _Place_ (posto);
    
- _Transition_.  
    600
    

### Marked Petri Net

Il materiale introduce anche le **Marked Petri Net**.

Nella rappresentazione compare il _Token_.

L'evoluzione della marcatura viene mostrata attraverso il _firing_ delle transizioni:

- dopo il _firing_ della transizione `t1`;
    
- dopo il _firing_ della transizione `t2`.  
    600  
    600  
    600
    

### Petri Net con Inhibitor Arc

Negli esempi di Petri Net compare anche un elemento chiamato _Inhibitor arc_.  
600

### Specifiche Formali con Finite State Machine

Le **FSM** (_Finite State Machine_) sono un altro formalismo utilizzato per le specifiche formali.

Nell'esempio mostrato compaiono elementi denominati:

- _State_;
    
- _Input_.  
    600
    

### Specifiche Formali con Linguaggio Z

Il **linguaggio Z** viene utilizzato per esprimere specifiche formali.

Una specifica in Z consiste in un insieme di **schemi Z**.

Ogni schema segue un formato specifico.

#### Linguaggio Z — Specifica di Stato

Il materiale presenta un esempio di specifica di stato in linguaggio Z.

Nell'esempio viene identificato un _Abstract Initial State_ e compare la seguente specifica:

`Button_init := [Button_State’ | pushed’ = ∅]`  
600

#### Linguaggio Z — Specifica di Operazione

Il materiale presenta anche un esempio di **specifica di operazione** in linguaggio Z.  
600

Quali formalismi vengono utilizzati per le specifiche formali?

la risposta

Nel materiale vengono presentate le **Petri Net**, le **FSM** (_Finite State Machine_) e il **linguaggio Z** come formalismi utilizzabili per esprimere specifiche formali.

Cosa caratterizza una Marked Petri Net nel materiale presentato?

la risposta

Nelle **Marked Petri Net** compare il _Token_ e l'evoluzione della marcatura viene mostrata attraverso il _firing_ delle transizioni, ad esempio `t1` e `t2`.

Come è strutturata una specifica in linguaggio Z?

la risposta

Una specifica in **linguaggio Z** consiste in un insieme di schemi. Il materiale mostra esempi sia di specifica di stato sia di specifica di operazione.

## Specifiche Semi-formali

### Specifiche Semi-formali e Modelli del Sistema

Un **modello del sistema** è una rappresentazione astratta del sistema che facilita la comprensione:

- delle sue proprietà;
    
- delle sue caratteristiche di funzionamento;
    
- prima che il sistema venga effettivamente costruito.
    

L'uso dei modelli software viene formalizzato all'interno di metodi di analisi e specifica dei requisiti basati su tecniche **semi-formali**.

I metodi di analisi dei requisiti software possono essere:

- **metodi di analisi strutturata**
    
    - detti anche procedurali;
        
- **metodi di analisi orientata agli oggetti**.
    

Per descrivere completamente un sistema non basta un solo modello: servono più rappresentazioni che mostrino il sistema da punti di vista differenti:

- informazioni;
    
- funzioni;
    
- comportamento dinamico.  
    600
    

### Tipi di Modelli del Sistema

Per una specifica semi-formale si utilizzano tre tipi principali di modelli.

#### Modello dei dati

Il **modello dei dati** rappresenta gli aspetti statici e strutturali relativi ai dati, cioè i _data requirements_.

Può essere rappresentato mediante:

- **ERD** (_Entity Relationship Diagram_)
    
    - non UML;
        
- _class diagram_
    
    - UML.
        

#### Modello comportamentale

Il **modello comportamentale** rappresenta gli aspetti funzionali del sistema, cioè i _functional requirements_.

Può utilizzare:

- **DFD** (_Data Flow Diagram_)
    
    - non UML;
        
- _use case diagram_
    
    - UML;
        
- _activity diagram_
    
    - UML;
        
- _interaction diagram_
    
    - UML.
        

#### Modello dinamico

Il **modello dinamico** rappresenta:

- gli aspetti di controllo del sistema;
    
- il modo in cui le funzioni del modello comportamentale modificano i dati introdotti nel modello dei dati.
    

Può essere espresso mediante:

- _state diagram_
    
    - UML.SPECIFICHE FORMALI CON PETRI NET
        
        600
        
        Le reti di Petri sono un modello matematico e grafico utilizzato per descrivere sistemi concorrenti*. Sono costituite da i seguenti elementi principali:
        
        - **Posti:** I posti rappresentano le condizioni o gli stati in cui può trovarsi un sistema. Possono contenere un certo numero di "gettoni" che rappresentano risorse, oggetti o stato.
            
        - **Transizioni:** Le transizioni rappresentano gli eventi o le azioni che possono verificarsi all'interno del sistema. Per attivare una transizione, i posti devono contenere abbastanza gettoni per soddisfare i "pre-requisiti" di attivazione della transizione.
            
        - **Archi:** Gli archi collegano i posti alle transizioni e viceversa. Gli archi indicano il flusso dei gettoni tra posti e transizioni, determinando quale condizione deve essere soddisfatta per attivare una transizione. Le reti di Petri possono essere rappresentate graficamente attraverso diagrammi in cui i posti sono rappresentati da cerchi, le transizioni da rettangoli e gli archi da frecce. _I sistemi concorrenti, anche noti come sistemi paralleli, sono sistemi informatici o reali in cui diverse attività, processi o entità vengono eseguiti simultaneamente o in parallelo. Questi sistemi gestiscono più attività contemporaneamente, consentendo loro di condividere risorse, lavorare insieme o agire indipendentemente._ Le specifiche formali con le reti di Petri implicano l'utilizzo delle reti di Petri come strumento per descrivere e definire in modo preciso il comportamento di un sistema. Questo approccio consente di rappresentare il funzionamento del sistema in modo dettagliato e accurato, fornendo una base per l'analisi, la verifica e la simulazione delle proprietà del sistema stesso. Marked Petri Net: Una Marked Petri Net (rete di Petri marcata) è un tipo di rete di Petri che incorpora il concetto di "marcature". Le marcature rappresentano l'assegnazione di "gettoni" (di solito rappresentati come punti) ai posti all'interno della rete di Petri. Questi gettoni indicano la presenza di risorse, dati o lo stato del sistema in un determinato momento. In una Marked Petri Net:
            
        
        450
        
        - **Posti:** Rappresentano condizioni, stati o posizioni nel sistema. Ogni posto può contenere un certo numero di gettoni (marcature), che simboleggiano risorse o oggetti.
            
        - **Transizioni:** Rappresentano eventi, azioni o processi che possono verificarsi nel sistema. Le transizioni vengono attivate quando hanno il numero necessario di gettoni nei posti di input.
            
        - **Archetti:** Collegano posti a transizioni e transizioni a posti. Indicano il flusso dei gettoni e stabiliscono le condizioni necessarie affinché una transizione possa scattare.
            
        
        - **Marcature:** Una marcatura è una distribuzione specifica di gettoni tra i posti nella Rete di Petri. Rappresenta lo stato attuale del sistema. Le marcature cambiano quando le transizioni vengono attivate, i gettoni vengono consumati e ne vengono creati di nuovi. Le Marked Petri Nets sono utili per comprendere la concorrenza, l'allocazione di risorse, la sincronizzazione e i potenziali punti critici nei sistemi. Sono particolarmente utili quando si vuole studiare come i gettoni si spostano attraverso una rete di posti e transizioni e come il sistema reagisce a diverse sequenze di eventi.
            
        
        ## SPECIFICHE FORMALI CON FINITE STATE MACHINE (FSM)
        
        Le Finite State Machine (FSM), o Macchine a Stati Finiti, sono un modello matematico utilizzato per rappresentare il comportamento di sistemi che possono trovarsi in uno dei diversi stati finiti. In questo contesto, le FSM possono essere utilizzate per esprimere specifiche formali dei requisiti in modo preciso. Nel contesto delle specifiche formali, una FSM può essere utilizzata per rappresentare il comportamento di un sistema attraverso gli stati che può assumere e le transizioni tra di essi. Ogni stato rappresenta una condizione specifica del sistema, mentre le transizioni rappresentano gli eventi o le azioni che causano il passaggio da uno stato all'altro. Le FSM possono essere utilizzate per specificare sequenze di azioni, condizioni di errore e comportamenti del sistema in modo dettagliato.
        
        ## SPECIFICHE FORMALI CON LINGUAGGIO Z
        
        450
        
        Il linguaggio Z è un linguaggio formale basato sulla logica dei predicati del primo ordine e utilizzato per la specifica formale dei requisiti e il design di sistemi software. Il linguaggio Z è noto per la sua capacità di esprimere specifiche in modo preciso e non ambiguo, consentendo la rappresentazione formale di proprietà del sistema. È ampiamente utilizzato nell'ingegneria del software per specificare i requisiti dei sistemi, modellare il loro comportamento e verificare le proprietà desiderate. Le specifiche formali con il linguaggio Z sono un modo per descrivere in modo preciso e rigoroso i requisiti e il comportamento di un sistema utilizzando la notazione matematica del linguaggio Z. Queste specifiche consentono di eliminare ambiguità, fraintendimenti e interpretazioni erronee durante lo sviluppo e la verifica dei sistemi.
        
        ## SPECIFICHE SEMI-FORMALI: MODELLI DEL SISTEMA
        
        Le specifiche semi-formali rappresentano un approccio intermedio tra le specifiche informali e quelle completamente formali. Queste specifiche utilizzano modelli astratti per descrivere le proprietà e il comportamento di un sistema software in un modo più strutturato rispetto alle specifiche informali, ma meno rigoroso delle specifiche completamente formali. I modelli del sistema vengono utilizzati per rappresentare diverse prospettive e aspetti del sistema stesso. Un modello del sistema è una rappresentazione astratta del sistema software che si intende sviluppare. Questo modello cattura le caratteristiche essenziali del sistema, come le sue funzioni, il comportamento e le interazioni con l'ambiente. L'uso di modelli dei sistemi software è formalizzato all'interno di metodi di analisi dei requisiti (specifica) del software che fanno uso di tecniche semi-formali. Esistono diversi approcci per analizzare i requisiti del software. Alcuni sono orientati alle procedure (analisi strutturata), mentre altri si basano sull'orientamento agli oggetti (analisi orientata agli oggetti). Per ottenere una comprensione completa di un sistema, è spesso necessario creare diversi modelli che rappresentano il sistema da diversi punti di vista. Questi possono includere la rappresentazione delle informazioni, delle funzioni e del comportamento dinamico. Tipi di Modelli del Sistema: Per descrivere la specifica semi-formale di un sistema software si usano 3 tipi di modelli:
        
        - **Modello dei Dati:** Questo modello rappresenta gli aspetti statici e strutturali dei dati all'interno del sistema. Include entità, attributi, relazioni e strutture dati. I modelli dei dati sono utilizzati per definire i requisiti relativi ai dati e alla loro organizzazione.
            
        - **Esempi:** Entity-Relationship Diagrams (ERD), Class Diagrams (UML).
            
        - **Modello Comportamentale:** Questo modello rappresenta gli aspetti funzionali e comportamentali del sistema, descrivendo come il sistema interagisce con gli utenti e come le diverse parti del sistema interagiscono tra loro.
            
        - **Esempi:** Data Flow Diagrams (DFD), Use Case Diagrams, Activity Diagrams, Interaction Diagrams (UML).
            
        - **Modello Dinamico:** Questo modello rappresenta gli aspetti dinamici del sistema, cioè come il sistema cambia e reagisce alle varie condizioni e eventi. È utilizzato per descrivere lo stato e il comportamento del sistema nel tempo.
            
        - **Esempi:** State Diagrams (UML).