# Modulo 1
14 agosto - Fondamenti e modelli di processo
### Definizione di Ingegneria del Software
L'ingegneria del Software è la disciplina che applica principi, metodi e pratiche dell'ingegneria alla realizzazione del software.
Un prodotto Software non deve essere visto come semplice codice scritto da un programmatore ma come il risultato di un processo organizzato che comprende analisi, progettazione, costruzione, verifica, manutenzione e gestione.

Questo nasce da una esigenza dovuta dal dover realizzare prodotti industriali, ovvero prodotti che non vengono sviluppati da singole persone
invece con più persone, software che deve essere manutenuto rispettare costi è necessario avere un approccio ingegneristico
altrimenti lo sviluppo potrebbe incappare in
- cost overrun
	- costo reale supera quello previsto
- time overrun
	- il progetto richiede più tempo del previsto

l'obiettivo quindi dell'ingegneria del Software è risolvere il problema della software crisis, dove la difficoltà nel produrre software di grandi dimensioni aumentava

##### Cosa si intende per Prodotto software
Un prodotto software racchiude il codice e la documentazione associata al prodotto
##### Cosa si intende per artefatto
Un artefatto software è un prodotto intermedio generato durante il processo di sviluppo
non deve per forza essere codice eseguibile può anche essere

- documento dei requisiti, una specifica oppure uno schema
##### Cosa si intende per sistema software
Un sistema software è un insieme organizzato di prodotti o componenti software che cooperano per raggiungere un determinato obiettivo
- un singolo programma può essere un prodotto software;
- un sistema software può comprendere più programmi, componenti, servizi, dati e documentazione che collaborano tra loro.
##### Cosa si intende per Cliente, sviluppatore e utente
- Cliente: chi richiede il prodotto
- Sviluppatore: chi lo realizza
- Utente: chi lo utilizza

quando cliente=sviluppatore si dice Software interno
quando cliente != sviluppatore si dice Software a contratto
### Ciclo di vita di un software
il ciclo di vita del software è l'intervallo di tempo che va dalla nascita dell'esigenza di realizzare il prodotto fino alla sua dismissione
Viene suddivisa in 3 grandi **stadi**
##### Sviluppo
si suddivide a sua volta in 6 fasi principali
- Requisiti
	- si stabilisce che cosa deve fornire il software
	- necessità del cliente, servizi richiesti e vincoli da rispettare
- Specifica
	- riscrittura dei requisiti in modo migliore(ci sarà un capitolo apposito)
- Pianificazione
	- si stabilisce come organizzare il progetto in termini gestionali
	- tempi, risorse, costi ecc...
- Progettazione
	- si decide come costruire il sistema
- Codifica
	- effettivo codice sorgente del progetto
- Integrazione
	- Le parti realizzate separatamente vengono combinate per formare il prodotto completo
##### Manutenzione
Dopo il rilascio del software avviene la manutenzione
- tutte le modifiche effettuate sul prodotto durante il periodo in cui esso viene utilizzato
	- può essere la parte maggiore dei costi
###### Diversi tipi di manutenzione
- Correttiva
	- eliminazione di difetti che potrebbero produrre comportamenti errati
- Adattiva
	- adattare il software a cambiamenti dell'ambiente come un nuovo hardware su cui deve girare
- Perfettiva o Evolutiva
	- estensione o miglioramento del prodotto come aggiungere una nuova funzionalità
- Preventiva
	- migliorare il software per renderlo più semplice da manutenere
##### Dismissione
Momento in cui il prodotto viene ritirato definitivamente dall'uso ad esempio dovuto ad obsolescenza

### Verifica e Validazione
Ad accompagnare l'intero ciclo sviluppo del prodotto vi sono attività di Verification&Validation 
- Verification
	- controlla che ciò che viene prodotto in una fase sia coretto rispetto a ciò che quella fase aveva ricevuto in input
	- **“Are we building the product right?”**
- Validation
	- controlla che il prodotto realizzato soddisfi realmente le necessità dell'utente
	- **“Are we building the right product?”**

Un software può quindi essere:
- corretto rispetto alla specifica
- ma non valido rispetto alle esigenze reali dell’utente
#### Testing
Si sottopone il software a controlli per individuare problemi e verificare il suo comportamento
viene fatto durante l'intero sviluppo

**Verifica e validazione descrivono cosa vogliamo controllare; il testing è uno degli strumenti con cui effettuiamo questi controlli.**

![[assets/p006-fig-005.png|315]]

Il diagramma evidenzia proprio questa differenza: la verifica mette in relazione le fasi vicine del processo, mentre la validazione collega il prodotto sviluppato agli obiettivi dell'utente

### Problemi accidentali ed essenziali del software
Si possono distinguere quelli che sono dei problemi legati alla produzione del software
- Problemi accidentali
	- Difficoltà che emergono dagli strumenti e le tecnologie con cui il software viene sviluppato
	- ridotte dall'evoluzione organizzativa e tecnologica
- Problemi essenziali
	- caratteristiche intrinseche del software che non scompaiono grazie a computer più veloci o linguaggi migliori
	- un problema essenziale può derivare dalle seguenti difficoltà
	- Complessità
		- non significa per forza + righe di codice
		- Un sistema software può essere diviso in più componenti, una parte può essere complessa se queste componenti interagiscono tra loro molte volte
	- Conformità
		- Il software deve adattarsi ad un ambiente con hardware, sistemi operativi o protocolli già definiti
	- Cambiabilità
		- Il software viene modificato frequentemente su richiesta e questo può essere un problema se non vi è una progettazione buona alla base
	- Invisibilità
		- problema nel ragionare su sistemi complessi poiché invisibili, un software non è visibile come un edificio
### Aspetti economici del software
- il costo del software può essere descritto dalla seguente espressione
`C = aS^2`
con:
- `C` = costo;
- `S` = dimensione;
- `a` = costante.
questo ci serve per dire che:
- raddoppiare la dimensione di un sistema non significa raddoppiare lo sforzo

ricordiamo che una volta creata una copia creare una copia aggiuntiva ha un costo marginale rispetto al costo di sviluppo, soprattutto se il software è digitale
### Affidabilità di un software
Per affidabilità si intende la fiducia che possiamo riporre nel corretto funzionamento del prodotto
in modo formale invece
>[!quote] la probabilità che il software funzioni correttamente durante un determinato intervallo di tempo detto *mission time* nelle condizioni d'uso considerate

si distinguono quindi 3 concetti
- Errore
	- azione umana sbagliata
	- ad esempio uno sviluppatore scrive una cosa in modo sbagliato
- Difetto
	- anomalia che rimane nel prodotto come conseguenza dell'errore
- Guasto
	- comportamento scorretto del prodotto dovuta ad un difetto
	- 
Un punto fondamentale è che **un difetto non produce necessariamente sempre un guasto**.

Se la parte di codice contenente il difetto non viene mai eseguita in una certa modalità d'uso, quel difetto rimane latente.
infatti un difetto si può definire latente
- un difetto presente nel software che non ha ancora provocato un comportamento osservabile errato
infatti il numero di difetti non determina l'affidabilità percepita
supponiamo che due difetti siano presenti nel sistema
- il primo si trova in una funzione usata centinaia di volte al giorno
- il secondo in una funzione utilizzata una volta all'anno
eliminare il primo avrà più impatto
da qui nasce la regola
###### 10-90
in programmi di notevoli dimensioni il 90% del tempo di esecuzione totale è dedicato all'esecuzione del 10% delle istruzioni detta nucleo del programma
Di conseguenza, l'effetto di un difetto dipende anche dalla sua **localizzazione**

Per capire il modo in cui un prodotto viene usato si descrive il Profilo operativo che comprende
- quali funzioni vengono utilizzate e con quel frequenza, quali input vengono forniti ecc...
Utenti differenti possono avere profili operativi differenti per questo lo stesso prodotto può mostrare un'affidabilità diversa in base al contesto
# Affidabilità hardware e software
Si vuole distinguere la differenza tra le due, entrambi possono manifestare guasti ma con cause diverse
- Hardware
	- oggetto fisico che può deteriorarsi dovuto a
		- usura, rottura o deterioramento
	- dopo la sua sostituzione può tornare a una condizione simile alla precedente
	- l'obiettivo è quindi mantenere la frequenza di guasto il più possibile stabile
- Software
	- non si consuma fisicamente 
	- i guasti derivano da difetti già presenti oppure introdotti durante delle modifiche
	- possiamo correggere un software eliminando il difetto
	- ma possiamo per sbaglio metterne un'altro
Ora si analizzano due grafici uno del guasto hardware e uno software

![[assets/p003-fig-001.png|371]]

Nel grafico hardware si riconoscono tre zone concettuali:

- una fase iniziale con frequenza di guasto elevata, detta spesso **mortalità infantile**;
- una fase relativamente stabile;
- una fase finale in cui l'usura fa aumentare i guasti.

![[assets/p003-fig-002.png|520]]

Nel software l'andamento è differente:
- le correzioni dovrebbero far diminuire la frequenza di guasto ma in realtà
- ogni modifica può introdurre nuovi difetti e causare temporanei aumenti della frequenza di guasto

concetto di **software rejuvenation**: in alcuni sistemi a lunga esecuzione si può periodicamente riportare il sistema in uno stato operativo più pulito o stabile per contrastare fenomeni di degradazione dovuti all'interazione con l'ambiente di esecuzione
### Disponibilità
La disponibilità indica la percentuale di tempo durante la quale il sistema risulta effettivamente utilizzabile

Disponibilità e Affidabilità sono collegate ma esprimono due cose diverse
infatti la disponibilità dipende dalla frequenza dei guasti e dal tempo necessario per ripristinare il servizio
invece affidabilità vede la frequenza dei guasti ma non per forza il tempo necessario per risolverli
## Dal ciclo di vita al processo software
Il ciclo di vita del software come detto in precedenza descrive le grandi fasi attraversate dal prodotto, dalla nascita fino alla dismissione

per realizzare il software concretamente bisogna stabilire quali attività svolgere in quale ordine e con quali modalità
Questo prende il nome di processo software
- l'insieme organizzato delle attività necessarie per sviluppare, mantenere e gestire un prodotto software rispettando
	- tempi, costi, requisiti e qualità attesa
Per attività invece si intende
- un insieme organizzato di operazioni svolte per ottenere un risultato
	- riceve un input, svolge un lavoro e produce uno o più output come artefatti
	- raccogliere i requisiti
	- scrivere codice
	- eseguire testing

## Modello di ciclo di vita
Descrive come organizzare le attività dello sviluppo software
ad esempio:
- quali attività vengono svolte
- in quale ordine
- quali attività possono sovrapporsi
- quando vengono prodotte versioni utilizzabili del software
- quando coinvolgere il cliente

Non esiste un modello universalmente migliore. La scelta dipende da fattori quali:

- stabilità dei requisiti
- dimensione del progetto
- criticità del sistema
- esperienza dell'organizzazione
- necessità del cliente
- livello di rischio
### Modello Build & Fix
Il **Build & Fix** rappresenta sostanzialmente l'assenza di un processo strutturato
L'idea è:
1. si costruisce rapidamente una prima versione;
2. la si mostra o consegna;
3. la si modifica in base ai problemi e alle richieste;
4. si continua a correggerla finché il cliente non è soddisfatto.

![[assets/p005-fig-003.png|480]]

Il problema è che nel Build & Fix le modifiche non sono inserite in una struttura progettuale controllata comportando un prodotto difficile da comprendere e mantenere
### Modello Waterfall
Di tipo sequenziale e funziona a cascata dove ogni fase consegue la successiva
molto più disciplinato di Build & Fix poiché obbliga la documentazione capire il problema progettare e verificare i vari output delle fasi


![[assets/p005-fig-004.png|520]]

- requisiti;
- specifica;
- progettazione;
- implementazione;
- integrazione;
- modalità operativa;
- dismissione.
il problema che si ha con il waterfall è che non è detto che ci sia sempre questa rigidità, le fasi possono cambiare e si può avere ad esempio una modifica dei requisiti
Se si scopre un problema molto tardi, tornare indietro può essere costoso perché le fasi successive sono già state costruite sulla base delle decisioni precedenti
infatti si ha un feedback dall'utente in estremo ritardo
### Modello con Rapid Prototyping Model
nasce per affrontare un problema della fase dei requisiti:
cliente e sviluppatore utilizzano le stesse parole ma immaginano cose differenti
utilizzare un prototipo permette all'utente di provare una rappresentazione preliminare del sistema e dare un feedback

![[assets/p007-fig-006.png|520]]


Cosa si intende per prototipo?
è una realizzazione rapida e semplificata di alcune parti del prodotto, costruita principalmente per comprendere meglio ciò che l'utente desidera
Il prototipo permette di svolgere due attività fondamentali:
- **Requirements Elicitation**: far emergere requisiti che l'utente non aveva espresso chiaramente;
- **Requirements Validation**: verificare che ciò che abbiamo capito corrisponda davvero alle esigenze dell'utente.
Per realizzare un singolo prototipo si seguono i seguenti step

![[assets/p007-fig-007.png|520]]

La realizzazione di un prototipo completo invece vede il seguente ciclo
- definizione di obiettivi o requisiti iniziali
- sviluppo rapido del prototipo
- valutazione dell'utente
- identificazione di problemi o nuovi requisiti
- modifica del prototipo
- ciclo fino a quando i requisiti risultano chiari
 
 Il prototipo deve essere Throw-away(usa e getta)
 - viene utilizzato come strumento per comprendere i requisiti e poi abbandonato
- questo perchè il prototipo viene costruito privilegiando la rapidità non necessariamente rispettando standard qualitativi sull'architettura, l'efficienza la sicurezza ecc...

![[assets/p008-fig-008.png|520]]

Un'interfaccia che sembra pronta dopo pochi giorni può inoltre creare nel cliente una falsa percezione quando invece tutta la parte dietro deve ancora essere realizzata

## Modelli basati su iterazione dei processi
Come detto in precedenza i limiti del Waterfall portano a una idea più generale che li risolve
- trattare lo sviluppo come una ripetizione di alcune attività su parti più piccole del progetto
Questo viene indicato come process iteration dove
- per iterazione si intende una ripetizione controllata di una sequenza di attività con lo scopo di produrre una versione più completa o più precisa del prodotto

Due modelli importanti basati sull'iterazione sono:
- sviluppo incrementale 
- sviluppo a spirale

### Modello a Sviluppo Incrementale
Il prodotto viene costruito e consegnato attraverso una successione di incrementi chiamati build
- build ovvero una versione del prodotto che contiene una parte delle funzionalità previste
- ogni build aggiunge progressivamente funzionalità fino ad arrivare al sistema completo

il vantaggio di farlo a incrementi è che non bisogna aspettare la fine dell'intero progetto per ottenere qualcosa di utilizzabile permettendo 
- feedback frequenti del cliente 
- individuazione di errori nei requisiti
- sviluppo parallelo da parte di più team

Il processo a sviluppo incrementale può partire da una outline description(descrizione generale del prodotto)
e poi si prendono le parti da sviluppare progressivamente
![[assets/p008-fig-009.png|520]]
#### Modello incrementale con Overall Architecture
- versione più conservativa
- si realizza una progettazione architetturale complessiva del prodotto
- l'architettura software descrive le principali componenti del sistema e le relazioni tra esse
dopo aver definito questa struttura si procede con varie build incrementali sulle singole componenti

così già sappiamo dei dettagli importanti sulle componenti riducendo problemi di integrazione tra esse
![[assets/p009-fig-010.png|520]]
#### Incrementale senza Overall Architecture
- in questa variante invece si parte direttamente dai requisiti con maggiore priorità
ogni build viene sviluppata quasi come un progetto indipendente
il vantaggio è maggiore velocità iniziale ma poi si rischia una maggior complessità ad ogni build successiva soprattutto per integrazione delle componenti software

![[assets/p010-fig-011.png|650]]

###### Problema del modello incrementale
Suddividere il prodotto in molti incrementi ha effetti opposti sui costi
- con più build una modifica interessa una porzione più piccola del prodotto
- ma prevede integrazioni da dover fare

possiamo vedere nel grafico sotto due tendenze:
- costo delle build/modifiche che diminuisce aumentando il numero di incrementi
- costo di integrazione che aumenta quando ci sono build numerose
la loro somma genera una regione di ***costo minimo***
![[assets/p010-fig-012.png|520]]
### Modello a spirale
- modello iterativo che introduce come elemento centrale la gestione del rischio
ad ogni giro della spirale si fa una iterazione del progetto

distanziarsi dal centro della spirale aumentano i costi accumulati
in una iterazione viene fatto:
- Customer communication - confronto con il cliente
- Planning- pianificazione delle attività
- Risk Analysis - identificazione e valutazione dei rischi
- Engineering - attività tecniche di specifica e progettazione
- Construction & Release - costruzione a rilascio
- Customer Evaluation - valutazione del risultato da parte del cliente

prima di investire ulteriormente si analizzano i rischi per progetti insostenibili non si prosegue nella progettazione

![[assets/p011-fig-013.png|520]]

>[!info]- è possibile modificare il sistema Waterfall aggiungendo una parte di Risk analysis
>
>
>![[assets/p012-fig-014.png|500]]


#### Modello a spirale di Boehm
![[assets/p013-fig-015.png|650]]

Nella rappresentazione classica di Boehm, il rischio rimane il principio che guida la scelta delle attività da svolgere in ogni iterazione
possono essere utilizzati:
- prototipi
	- con una funzione diversa del Rapid Prototyping
		- Il prototipo lì serviva per comprendere e validare i requisiti dell'utente
		- qui invece viene costruito per ridurre un rischio specifico
			- es:(se non sappiamo la velocità di una certa tecnologia possiamo costruire un prototipo solo per misurarne le prestazioni)
- simulazioni
- benchmark
- test esplorativi

Da qui nasce una parentesi che va ad approfondire tutto il concetto di Gestione dei rischi
### Risk Management
Il rischio è la possibilità che si verifichi un evento o una circostanza avversa con conseguenze negative sul progetto, sul prodotto o sull'organizzazione
un rischio deve essere valutato su una base probabilistica e di impatto
un evento molto grave ma estremamente improbabile e un evento moderato ma molto probabile devono essere valutati in modo differente
#### Tipologie di rischio
- Project Risk
	- rischi sul progetto portando effetti di costo tempi personale ecc...
	- es: una persona brava nel team abbandona l'organizzazione
- Product Risk
	- Influenza il prodotto finale con effetti sulla qualità le prestazioni la sicurezza ecc...
- Business Risk
	- influenza l'organizzazione che sta sviluppando il software
	- es: prodotto perfetto ma il mercato cambia, quindi il prodotto non vende
#### Processo di Risk Management
Il processo di gestione dei rischi viene descritto da 4 attività principali:
- identificazione
	- individuare i problemi con una lista dei possibili rischi
- analisi
	- per ogni rischio si valuta la probabilità di occorrenza e la gravità dell'effetto dando una priorità su queste basi con presenza dei top risks(rischi prioritari)
- planning
	- per rischi importanti si decide come reagire attraverso tre strategie fondamentali:
		- Avoidance
			- ridurre la probabilità che il rischio si verifichi
		- Minimisation
			- ridurre l'impatto se il rischio si verifica
		- Contingency Plan
			- predisporre un piano alternativo da applicare se il problema si manifesta
- monitoring
	- i rischi non vengono analizzati una sola volta durante il progetto bisogna controllare cambiamenti sui rischi andando a monitorarli come:
		- se la probabilità di un rischio è cambiata
		- se il suo impatto è cambiato
		- se sono comparsi nuovi rischi

Quindi il Risk Management è un processo **continuo**, non una lista compilata all'inizio e poi dimenticata.

### Modello Object Oriented detto anche a fontana
Tornando ai modelli di progettazione vi è un modello con un approccio orientato agli oggetti con analisi dei requisiti e progettazione object oriented

il linguaggio di programmazione finale utilizzato non deve essere object oriented

vedendo il grafico sotto si nota come alcune fasi sono sovrapposte parzialmente questo evidenzia l'idea di fare progetti con:
- Concorrenza
	- più attività possono essere svolte nello stesso periodo
- Iterazione
	- una fase viene ripetuta per migliorarne il risultato con iterazioni intra-fase(attività interne alla stessa fase) e inter-fase(una fase successiva può portare a una revisione delle precedenti)
![[assets/p016-fig-021.png|313]]

### Ingegneria simultanea o concorrente
L'ingegneria Concorrente cerca di ridurre tempi e costi facendo coesistere attività che in un modello strettamente sequenziale sarebbero svolte una dopo l'altra ma senza caos
dove i due team che lavorano contemporaneamente su due parti collegate devono avere 
- strumenti di condivisione 
- gestione di versioni
- comunicazione frequente
- coordinamento
- project management efficace
se questo viene fatto bene si ha una riduzione del tempo complessivo

### Modelli basati su metodi formali
Un'altra famiglia di approcci utilizza specifiche formali descrizioni espresse con linguaggi dotati di una base matematica precisa cercando di ridurre le ambiguità
Questi approcci sono particolarmente importanti nei **sistemi critici**, nei quali un comportamento errato può avere conseguenze molto gravi
comportando però costi elevati dovuti a richieste di competenze specialistiche più tempo nella fase di specifica ecc...
### Modelli corporate
Molti modelli classici vengono descritti pensando a un software a contratto dove esiste un cliente che commissiona e poi fornisce feedback e requisiti
un;azienda che sviluppa un prodotto per il mercato si trova in una situazione differente dove
- non esiste un singolo cliente per i requisiti
- bisogna anticipare i bisogni del mercato
- la data di rilascio può avere grande importanza commerciale

vi sono due esempi di modelli
#### Modello Microsoft- Synchronize and Stabilize
Il seguente modello combina caratteristiche:
- iterative
- incrementali
- concorrenti
consente a piccoli gruppi di lavorare in autonomia ma sincronizzando continuamente il loro lavoro
- Gli sviluppatori in piccoli team lavorano quotidianamente a delle daily build(versioni del prodotte costruite integrando il codice sviluppato fino a quel momento)
- se una modifica rompe la build il problema viene individuato quasi immediatamente perchè si lavora su daily build

Periodicamente il progetto se raggiunge un punto significativo di avanzamento raggiunge una milestone
dove viene prodotta una versione stabile e completa
##### Ciclo di sviluppo microsoft
- planning
	- si costruisce una product vision ovvero una descrizione degli obiettivi generali del prodotto
- development
	- il progetto viene suddiviso in sottoprogetti associati a milestone
	- Si progettano implementano e correggono le funzionalità
- stabilization
	- prima del rilascio commerciale viene eseguita una fase specifica di stabilizzazione
	- dove si fa testing interno come alpha testing
	- beta testing
	- correzione dei difetti
![[assets/p019-fig-023.png|500]]
#### Modello Netscape
Organizzazione che adottava un modello simile ma per prodotti internet
- meno tester
- meno pianificazione
- documentazione incompleta

La product vision nasceva tramite riunioni di pianificazione avanzata nelle quali venivano considerate le opportunità di mercato
successivamente
- veniva definita una specifica funzionale
- venivano allocate risorse
- lo sviluppo veniva controllato con meeting periodici
- venivano prodotte alpha e beta
- la versione definitiva veniva indicata con RTM - Release to Manufacturing

L'esempio viene utilizzato soprattutto per sottolineare l'importanza di prendere decisioni basandosi su dati e processi di controllo, non soltanto sull'esperienza individuale
### Modelli con approccio Agile
I metodi Agile nascono come reazione a processi eccessivamente pesanti e rigidi
con un processo di realizzazione Software leggero ma intenzionalmente organizzato, iterativo e basato su feedback frequente 
#### Quattro valori del manifesto Agile
- Individui e interazioni più che processi e strumenti
	- Processi e strumenti sono utili ma non sostituiscono una buona comunicazione e collaborazione
- Software funzionante più che documentazione esaustiva
	- meno documentazioni(non zero) più disponibilità di software funzionante
- Collaborazione con il cliente più che negoziazione contrattuale
	- instaurare con il cliente una collaborazione continua adattando il prodotto a nuove necessità e informazioni senza essere legati da un contratto pregresso
- Rispondere al cambiamento più che seguire un piano
	- reagire a cambiamenti reali nei requisiti o nel contesto

Esistono inoltre 12 principi Agile che sviluppano ancora meglio idee del tipo:
- consegna frequente di software funzionante
- collaborazione continua
- team motivati 
- semplicità
#### Modello Scrum
uno dei framework più noti utilizzati nell'ambito Agile
Un framework è una struttura generale di lavoro che definisce ruoli eventi artefatti e regole fondamentali lasciando al team libertà su molte decisioni tecniche e concrete
Scrum organizza il lavoro in cicli brevi chiamati Sprint
- intervallo di lavoro a durata limitata nel quale il team cerca di produrre un nuovo incremento del prodotto
	- circa 2-4 settimane cercando di ridurre il tempo tra decisione -> sviluppo -> risultato funzionante -> feedback
	- ogni giorno avviene il Daily Scrum un incontro che aiuta il gruppo a sincronizzare il lavoro e a identificare rapidamente ostacoli e problemi
	- alla fine dello sprint il risultato viene mostrato e discusso con le persone interessante facendo uno sprint review e aggiornando eventualmente il product backlog(vedi sotto)
	- poi si fa uno sprint retrospective dove il team rivede il modo in cui ha lavorato riflettendo su cosa ha funzionato bene e quali problemi sono emersi
	- uno sprint non si prolunga ciò che non viene fatto si rimanda allo sprint successivo
Se abbiamo capito male un requisito, è meglio scoprirlo dopo poche settimane che dopo un anno
Ruoli presenti
- product owner
	- gestisce le priorità e rappresenta le esigenze del prodotto
	- responsabile del product backlog, insieme ordinato del lavoro desiderato per il prodotto
- scrum master
	- aiuta il gruppo a comprendere e applicare lo scrum correttamente, non deve essere pensato come un capo che assegna i compiti ma facilita il tutto rimuovendo ostacoli organizzativi e supportando il team e il product owner
- development team
	- gruppo che svolge concretamente il lavoro tecnico necessario realizzando incrementi con progettazione codifica testing e integrazione

- il product backlog contiene il lavoro che potrebbe essere necessario per evolvere il prodotto con funzionalità miglioramenti correzioni requisiti ecc...
	- da una parte di esso si fa il planning di uno sprint per capire su quale parte del backlog fare uno sprint facendo così si ha uno sprint backlog

- per Definition of Done si riferisce a tutti quei criteri per cui un lavoro possa essere considerato completo
![[assets/p022-fig-025.png|520]]
### User Story
Per descrivere il bisogno dal punto di vista dell'utente si può utilizzare questo formato non prendendolo come una vera e propria specifica ma come una cosa compatta che può far discutere i bisogni dell'utente
`As a <role>, I want <goal> so that <benefit>`
cioè:
- **role** -> chi ha il bisogno;
- **goal** -> cosa vuole ottenere;
- **benefit** -> perché quella funzione produce valore.
Esempio:
`As a student, I want to see my exam results so that I can monitor my academic progress.`

Una storia troppo grande per essere affrontata direttamente può essere chiamata **Epic** e successivamente suddivisa in User Stories più piccole.
possono essere usate nei product backlog per Scrum
### Dal prodotto al processo dell'organizzazione
Dopo aver discusso come organizzare lo sviluppo di un singolo prodotto come possiamo valutare quanto un'organizzazione sia capace di sviluppare software in modo sistematico e controllato?
Per questo nasce un modello detto CMM che valuta la maturità del processo di organizzazione al di là di quanto sono bravi i singoli programmatori o le tecnologie usate
#### Modello CMM- Capability Maturity Model
modello per descrivere la maturità del processo software di un'organizzazione
la maturità indica quanto il processo sia:
- definito
- ripetibile
- controllato
- misurabile
- migliorabile
il modello è organizzato in 5 livelli
- 1. Initial
	- il processo è ad hoc dove il successo dipende da persone fortemente competenti detti heroes questo rende
		- cose instabili
		- risultati difficili da prevedere
		- modalità di lavoro fortemente dipendente dalle persone
- 2. Repeatable
	- vengono introdotte pratiche fondamentali di project management come 
		- pianficare
		- monitorare
		- controllare aspetti fondamentali del progetto
	- ciò rende le cose parzialmente riproducibili poiché documentate
- 3. Defined
	- il processo diventa documentato, standardizzato e integrato a livello organizzativo
- 4. Managed
	- l progetto viene gestito anche attraverso misure quantitative non limitandosi a seguire procedure ma a raccogliere dati e capire come il processo sta funzionando
- 5. Optimizing
	- l'organizzazione utilizza ciò che misura per migliorare continuamente il processo andando a fare Defect Prevention(analizzare cause che producono i difetti)

Il CMM è un modello additivo, un'organizzazione che raggiunge un livello elevato deve aver soddisfatto le capacità richieste dai livelli precedenti
##### KPA
Nel CMM classico i livelli sono associati a Key Process Areas (KPA)
aree di processo considerate fondamentali per raggiungere un determinato livello di maturità
Una KPA specifica aspetti come:
- obiettivi;
- responsabilità;
- risorse;
- attività da svolgere;
- modalità di monitoraggio;
- modalità di verifica.
Negli appunti vengono richiamate complessivamente **18 KPA** nel modello classico.

 il livello di maturità viene valutato osservando **come l'organizzazione lavora concretamente**, non soltanto la qualità apparente di un singolo programma prodotto
 