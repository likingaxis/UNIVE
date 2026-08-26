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

![[GPT PREMIUMS/14_agosto_appunti/assets/p006-fig-005.png|315]]

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

![[GPT PREMIUMS/14_agosto_appunti/assets/p003-fig-001.png|371]]

Nel grafico hardware si riconoscono tre zone concettuali:

- una fase iniziale con frequenza di guasto elevata, detta spesso **mortalità infantile**;
- una fase relativamente stabile;
- una fase finale in cui l'usura fa aumentare i guasti.

![[GPT PREMIUMS/14_agosto_appunti/assets/p003-fig-002.png|520]]

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

![[GPT PREMIUMS/14_agosto_appunti/assets/p005-fig-003.png|480]]

Il problema è che nel Build & Fix le modifiche non sono inserite in una struttura progettuale controllata comportando un prodotto difficile da comprendere e mantenere
### Modello Waterfall
Di tipo sequenziale e funziona a cascata dove ogni fase consegue la successiva
molto più disciplinato di Build & Fix poiché obbliga la documentazione capire il problema progettare e verificare i vari output delle fasi


![[GPT PREMIUMS/14_agosto_appunti/assets/p005-fig-004.png|520]]

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

![[GPT PREMIUMS/14_agosto_appunti/assets/p007-fig-006.png|520]]


Cosa si intende per prototipo?
è una realizzazione rapida e semplificata di alcune parti del prodotto, costruita principalmente per comprendere meglio ciò che l'utente desidera
Il prototipo permette di svolgere due attività fondamentali:
- **Requirements Elicitation**: far emergere requisiti che l'utente non aveva espresso chiaramente;
- **Requirements Validation**: verificare che ciò che abbiamo capito corrisponda davvero alle esigenze dell'utente.
Per realizzare un singolo prototipo si seguono i seguenti step

![[GPT PREMIUMS/14_agosto_appunti/assets/p007-fig-007.png|520]]

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

![[GPT PREMIUMS/14_agosto_appunti/assets/p008-fig-008.png|520]]

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
![[GPT PREMIUMS/14_agosto_appunti/assets/p008-fig-009.png|520]]
#### Modello incrementale con Overall Architecture
- versione più conservativa
- si realizza una progettazione architetturale complessiva del prodotto
- l'architettura software descrive le principali componenti del sistema e le relazioni tra esse
dopo aver definito questa struttura si procede con varie build incrementali sulle singole componenti

così già sappiamo dei dettagli importanti sulle componenti riducendo problemi di integrazione tra esse
![[GPT PREMIUMS/14_agosto_appunti/assets/p009-fig-010.png|520]]
#### Incrementale senza Overall Architecture
- in questa variante invece si parte direttamente dai requisiti con maggiore priorità
ogni build viene sviluppata quasi come un progetto indipendente
il vantaggio è maggiore velocità iniziale ma poi si rischia una maggior complessità ad ogni build successiva soprattutto per integrazione delle componenti software

![[GPT PREMIUMS/14_agosto_appunti/assets/p010-fig-011.png|650]]

###### Problema del modello incrementale
Suddividere il prodotto in molti incrementi ha effetti opposti sui costi
- con più build una modifica interessa una porzione più piccola del prodotto
- ma prevede integrazioni da dover fare

possiamo vedere nel grafico sotto due tendenze:
- costo delle build/modifiche che diminuisce aumentando il numero di incrementi
- costo di integrazione che aumenta quando ci sono build numerose
la loro somma genera una regione di ***costo minimo***
![[GPT PREMIUMS/14_agosto_appunti/assets/p010-fig-012.png|520]]
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

![[GPT PREMIUMS/14_agosto_appunti/assets/p011-fig-013.png|520]]

>[!info]- è possibile modificare il sistema Waterfall aggiungendo una parte di Risk analysis
>
>
>![[GPT PREMIUMS/14_agosto_appunti/assets/p012-fig-014.png|500]]


#### Modello a spirale di Boehm
![[GPT PREMIUMS/14_agosto_appunti/assets/p013-fig-015.png|650]]

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
![[GPT PREMIUMS/14_agosto_appunti/assets/p016-fig-021.png|313]]

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
![[GPT PREMIUMS/14_agosto_appunti/assets/p019-fig-023.png|500]]
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
![[GPT PREMIUMS/14_agosto_appunti/assets/p022-fig-025.png|520]]
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

# Verso il Requirements Engineering
Nel ciclo di vita abbiamo visto che lo sviluppo del software parte dai requisiti e dalla loro successiva specifica.
Prima di progettare o scrivere codice bisogna capire con precisione cosa deve fare il sistema e quali vincoli ha
questa cosa non è affatto banale ed è necessario un processo sistematico che permetta di identificare, analizzare, documentare, controllare e gestire i requisiti
Questo processo è proprio Requirements Engineering dove per Requisiti Software si intende:
### Requisiti Software
Descrive una condizione o capacità necessaria all'utente per risolvere un problema o raggiungere un obiettivo
Per condizione o capacità si intende qualcosa che deve essere vero o che il sistema deve essere in grado di fare

Esempi:
- capacità: il sistema deve permettere all'utente di cercare un documento
- condizione: il tempo di risposta deve essere inferiore a una certa soglia
- vincolo: i documenti prodotti devono rispettare uno standard imposto dal cliente

quindi non deve essere per forza una funzione ma anche una descrizione differente
#### astrazione e categoria
I requisiti si possono osservare su due dimensioni differenti:
- livello di astrazione 
	- quanto il requisito è generale o dettagliato 
		- requisito utente o requisito di sistema
- categoria 
	- che tipo di informazione esprime
		- funzionale o non funzionale

Queste due dimensioni sono indipendenti tra loro
##### Astrazione
Per la dimensione sul livello di astrazione si possono spiegare i requisiti utente o di sistema
- Requisiti utente
	- descrivono ad alto livello i servizi e i vincoli del sistema
	- pensati per essere comprensibile a persone che non devono conoscere dettagli tecnici con linguaggio naturale e diagrammi
	- utile per esprimere cosa serve senza entrare nel dettaglio tecnico
- Requisiti di sistema
	- descrivono servizi e vincoli a un livello molto più dettagliato
	- devono essere abbastanza precisi da diventare una base concreta per le successive attività di progettazione e sviluppo
	- il requisito utente può essere suddiviso in tanti requisiti di sistema più avanzati
Sono entrambi utili perchè hanno due destinatari diversi 
##### Categoria
Per una dimensione per categoria andiamo a definire cosa descrive un determinato requisito
- funzionale
	- descrivono i servizi che il sistema deve offrire e il comportamento che deve assumere in presenza di determinati input o situazioni risponde alla domanda
	- **Che cosa deve fare il sistema?**
- non funzionale
	- descrivono proprietà qualità o vincoli che il sistema o il processo di sviluppo devono rispettare
	- non definiscono quale funzione deve esistere ma possono stabilire come deve comportarsi il sistema
	- descrivono cose relative al
		- prodotto
			- performance e sicurezza
		- organizzazione/processo
			- standard aziendali da rispettare e linguaggi imposti
		- vincoli esterni
			- tipo leggi e privacy
##### Dominio
Poi ci sono i requisiti di dominio che sono sempre una categoria ma non completamente separata 
- Un requisito di dominio dipende dal dominio applicativo in cui il software verrà utilizzato
	- dominio applicativo ovvero il settore reale nel quale opera il sistema
- un requisito di dominio può essere 
	- funzionale, se l'ambiente impone una particolare funzione
	- non funzionale, se l'ambiente impone un vincolo o una proprietà
##### Requisiti scritti male
I requisiti devono essere scritti bene altrimenti si può incorrere in
- Ambiguità
	- quando può essere interpretato in modi più ragionevoli
- Incompletezza
	- quando non descrive tutte le caratteristiche necessarie del sistema
- Inconsistenza
	- quando ci sono due requisiti che impongono condizioni incompatibili
- Mancanza di verificabilità
	- quando non possiamo stabilire in modo oggettivo se il prodotto lo soddisfa oppure no
		- "il sistema deve essere facile da usare"(totalmente non verificabile con un requisito così)
	- meglio associare una proprietà a una metrica ad esempio il tempo massimo di risposta il numero massimo di errori training time per un nuovo utente a prendere familiarità ecc...
##### Il PDL
quando si parla di requisito si intende un singolo dettaglio o descrizione
l'insieme di requisiti forma una specifica
Per rendere una specifica più precisa si può usare un linguaggio simile a uno pseudocodice come PDL

![[GPT PREMIUMS/15_agosto_appunti/assets/p030-fig-031.png|650]]

Il vantaggio è ridurre l'ambiguità rispetto al linguaggio naturale.
l'ideale è utilizzarlo non per cose troppo interne ma per interfacce o simili altrimenti si rischia di dire
- come si deve implementare quel requisito invece l'obiettivo è dire
- cosa deve fare il sistema
#### Cosa si intende per Specifica
Documento di specifica o documento di analisi dei requisiti è la raccolta in un documento di tutti i requisiti raccolti per un certo dominio del problema
- non descrive quindi il problema della soluzione ovvero cosa bisogna fare ma solo quali sono i problemi
	- poi per risolvere il dominio della soluzione si attuano delle progettazioni avanzate
I requisiti devono essere facili da tracciare soprattutto se ci sono delle relazioni tra più di questi
così se un requisito cambia possiamo valutare quali parti del progetto vanno modificate

Lo standard usato come template per fare un documento di specifica è **IEEE 830-1998** così strutturato:
- **Preface**:
	- lettori previsti;
	- cronologia delle versioni;
	- modifiche principali;
- **Introduction**:
	- scopo;
	- descrizione generale del sistema;
	- relazioni con altri sistemi;
- **Glossary**:
	- termini tecnici e definizioni;
- **User Requirements Definition**:
	- requisiti utente funzionali e non funzionali;
- **System Architecture**:
	- visione di alto livello dei componenti;
- **System Requirements**:
	- requisiti di sistema dettagliati;
- **System Models**:
	- modelli che descrivono il sistema e le relazioni con l'ambiente;
- **System Evolution**:
	- ipotesi sull'evoluzione futura;
- **Appendices**:
	- informazioni specifiche dell'applicazione;
- **Index**.
## Requirements Engineering
Dopo aver visto cosa sono i requisiti e come possono essere documentati come possiamo raggiungere ad un punto dove i requisiti sono effettivamente corretti e come li manteniamo validi durante le evoluzioni del progetto?
A tal proposito nasce la Requirements Engineering
- come vengono studiati i requisiti lungo il ciclo di vita del Software

Il processo viene suddiviso in 5 grandi attività

- ***Studio di fattibilità***
	- avviene prima di investire seriamente nello sviluppo valutando costi tempi risorse risponde alla domanda
	- **Ha senso realizzare questo sistema?**
	- si ha quindi in output un report di fattibilità dopo svariati colloqui tra i membri che mettono mano al progetto
- ***Identificazione e analisi dei requisiti***
	- Se il progetto è considerato fattibile bisogna capire che cosa serve agli interessati(stakeholder)
	- gli stakeholder non sono per forza l'utente finale ma persone gruppi o organizzazioni che hanno un interesse nel sistema 
	- Step per identificare e analizzare i requisiti
		- Dominio applicativo ->prima di interpretare le esigenze degli interessati si deve capire il dominio applicativo poi si fa
		- Requirements elicitation -> attività con cui si fanno emergere le esigenze degli stakeholder(Raccolta dei requisiti)
		- Classificazione -> organizzare in gruppi i requisiti
		- Risoluzione dei conflitti -> creare compatibilità tra stakeholder diversi che magari hanno idee differenti
		- Assegnare priorità tra i requisiti
		- Verificare i requisiti -> vengono individuati problemi di inconsistenza ambiguità ecc...
	- Tecniche di identificazione dei requisiti
		- far vedere un prototipo agli utenti
		- descrivere situazioni concrete di utilizzo
		- etnografia, analisi del lavoro degli utenti nel contesto reale per capire come sono abituati ora
- ***Specifica dei requisiti***
	- trasforma quanto emerso dalla elicitation e analisi in una rappresentazione abbastanza precisa per guidare le fasi successive
	- una specifica può essere
		- informale -> linguaggio naturale
		- semi formale -> modelli e notazioni grafiche con regole
		- formale -> notazioni matematiche con semantica rigorosa
- ***Convalida dei Requisiti***
	- cerca di capire se i requisiti descritti rappresentano ciò che gli stakeholder necessitano e se sono utilizzabili come base affidabile per lo sviluppo
	- convalida mediante le seguenti tecniche:
		- informali -> altre persone esaminano i requisiti e cercano problemi
		- formali -> si fanno walkthrough(esamina passo passo del documento) e ispezioni(esamina ma più rigorosa)
		- prototipazione -> il prototipo permette di verificare con gli utenti se quanto specificato corrisponde alle loro esigenze
		- Generazione dei test case -> si cerca di capire se i requisiti sono vaghi o incompleti
		- analisi automatizzata sulla consistenza -> utilizzo di tool per vedere la consistenza
- ***Gestione dei Requisiti***
	- I requisiti non restano necessariamente fermi dopo l'approvazione del documento quindi si svolge una attività dove i requisiti vengono cambiati in base alle esigenze durante il ciclo di vita del progetto

##### Requisiti stabili e volatili
in base alla probabilità di cambiamento abbiamo requisiti che possono essere stabili o volatili
i requisiti volatili si distinguono in
- mutabili -> cambiano per modifiche dell'ambiente
- emergenti -> emergono quando aumenta la comprensione del sistema e delle esigenze
- consequenziali -> nascono come conseguenza dell'introduzione stessa del nuovo sistema
- di compatibilità -> cambiano per mantenere compatibilità con altri sistemi
#### Esempi di specifiche formali
Come detto in precedenza le specifiche si dividono in informali semi formali e formali

avere specifiche formali comporta maggior preparazione del personale e maggior costo ma con una maggior precisione e analisi automatica dovuta all'uso di modelli matematici con sintassi e semantiche rigorose


##### Esempio 1 Petri Net
Modello matematico e grafico utile per descrivere sistemi in cui possono verificarsi più attività concorrenti e in cui serve rappresentare condizioni di sincronizzazione
- sistema: ciò di cui vogliamo descrivere il comportamento
- situazione: determinato istante in cui si trova il sistema
- evento o azione: qualcosa che può accadere e che porta il sistema da una situazione a un'altra

La petri net serve per rappresentare quali eventi possono accadere in una certa situazione e come questi eventi modificano la situazione del sistema
Di base utilizza tre elementi grafici
- Place
	- sono dei cerchi rappresentano le condizioni o una posizione logica significativa del sistema
- Transition
	- è una barra rappresenta un evento o un'azione che può modificare la situazione del sistema descrive il cambiamento
- Arc
	- rappresentati da frecce orientate collegano place e transition
	- indicano quali place forniscono le condizioni necessarie a una transition
	- quali place ricevono token dopo l'esecuzione della transition

![[GPT PREMIUMS/15_agosto_appunti/assets/p033-fig-033.png|650]]


- token
	- marcatore inserito all'interno di un place indica che nella situazione corrente la condizione o risorsa rappresentata da quel place è disponibile nella quantità indicata
- marcatura 
	- la distribuzione dei token nei vari place in un certo istante
	- una transition si dice abilitata se la marcatura corrente soddisfa le condizioni necessarie perchè possa essere eseguita
- firing
	- è l'esecuzione effettiva di una transition abilitata

**transition enabled → firing → modifica dei token → nuova marcatura → nuovo stato rappresentato**

![[GPT PREMIUMS/15_agosto_appunti/assets/p034-fig-034.png|650]]

Negli esempi del corso si parte da una marcatura iniziale e si provano differenti transition abilitate. Se più transition sono abilitate contemporaneamente, possono esistere più possibili evoluzioni della rete
- l'inhibitor arc esprime una condizione negativa
	- usato quando una transition deve poter scattare solo in assenza di token in un determinato place
	- controlla la presenza di un token per inibire il firing della transition

sono utili per rappresentare concorrenza sincronizzazione dipendenze

il problema è che non vengono specificate delle durate esplicite per una transition per cui ci sono due estensioni che permettono miglioramenti
- GSPN
- CPN

##### Esempio 2 Finite State Machine
rappresentano il comportamento di un sistema mediante un insieme finito di stati e di transizioni di stati
rispetto alla Petri Net lo stato viene rappresentato diversamente
- sulla petri net lo stato è implicito nella marcatura cioè nella distribuzione dei token
- nella FSM lo stato è rappresentato come primitiva del modello infatti

Una FSM contiene quindi:

- **stati** → situazioni discrete in cui il sistema può trovarsi;
- **transizioni** → passaggi da uno stato a un altro;
- **eventi/input** → ciò che provoca o abilita il passaggio;
- uno **stato iniziale**;
- eventualmente uno o più **stati finali**.

##### Esempio 3 Linguaggio Z
Linguaggio di specifica formale pensato specificatamente per descrivere sistemi mediante notazione matematica
viene usato uno schema che raggruppa
- un **nome**;
- **dichiarazioni** di variabili e relativi tipi;
- **predicati**, cioè proprietà e vincoli che devono valere sulle variabili.
In questo modo uno schema può essere usato per descrivere sia:

- lo **stato** del sistema;
- le **operazioni** che modificano quello stato.

![[GPT PREMIUMS/15_agosto_appunti/assets/p036-fig-036.png|650]]

Nell'esempio dei pulsanti dell'ascensore vengono definiti insiemi di pulsanti e vincoli tra questi insiemi. La parte dichiarativa dice **quali elementi esistono e di che tipo sono**; la parte dei predicati dice **quali relazioni devono essere vere**.

#### Specifiche semi formali e modelli del sistema
l'idea è rappresentare specifiche semi formali più economiche e un compromesso tra un linguaggio matematico e naturale mediante l'uso di modelli
un modello del sistema è una rappresentazione astratta che mette in evidenza alcuni aspetti del sistema e ne trascura altri
un modello di sistema non rappresenta una intera specifica ma viene divisa in 3 punti complementari che rappresentano diversi punti di vista
- modello dei dati
	- descrive aspetti statici e strutturali dei dati
- modello comportamentale
	- descrive le funzioni e i servizi del sistema come i dati vengono elaborati o come gli attori interagiscono con le funzionalità
- modello dinamico
	- descrive l'evoluzione del sistema nel tempo ad esempio con State Diagram nell'approccio UML
#### ERD e DFD 
sono due tecniche di specifica semi formale ma rappresentano due aspetti differenti
ERD struttura dei dati e relazioni tra entità
DFD flusso dei dati attraverso i processi del sistema
##### ERD Entity Relationship Diagram
rappresenta le entità rilevanti e le relazioni esistenti tra esse
![[GPT PREMIUMS/15_agosto_appunti/assets/p038-fig-038.png|300]]
- entità -> oggetti o concetti di cui interessa memorizzare informazioni
- attributi -> proprietà delle entità
- relazioni -> collegamenti logici tra entità

quindi si ha una vista statica dei dati
##### DFD Data Flow Diagram
Descrive come i dati entrano nel sistema vengono elaborati memorizzati e inviati ad altre destinazioni
- **source/destination of data** → entità esterne da cui arrivano o verso cui vanno i dati;
- **data flow** → flussi di dati, rappresentati da frecce;
- **process** → funzione che trasforma i dati;
- **data store** → archivio in cui i dati vengono memorizzati.

non rappresenta l'ordine temporale delle operazioni
può essere inizialmente molto generale ma poi si può raffinare con più processi
![[GPT PREMIUMS/15_agosto_appunti/assets/p038-fig-039.png|224]]
### SSA Structured System Analysis 
SSA è una tecnica di analisi che porta alla costruzione di una specifica semi-formale, usando modelli come DFD e altre rappresentazioni strutturate.

la SSA procede per **step-wise refinement**, passando da una descrizione generale del sistema a una specifica sempre più dettagliata.

SSA può essere descritto da 9 step principali
1. **Costruire il DFD**
    - identificare sorgenti, destinazioni, flussi, processi e Data Store;
    - raffinare progressivamente il DFD.
2. **Decidere cosa automatizzare**
    - scegliere quali attività automatizzare;
    - valutare costi e benefici;
    - decidere tra:
        - online processing;
        - batch processing.
3. **Raffinare i Data Flow**
    - specificare la struttura interna dei dati;
    - scomporre flussi generici nei singoli campi che li compongono.
4. **Definire la logica dei processi**
    - descrivere come ogni processo trasforma input in output;
    - eventualmente usare Decision Tree.
5. **Definire i Data Store**
    - specificare:
        - dati contenuti;
        - struttura;
        - campi;
        - modalità di accesso.
6. **Definire le risorse fisiche**
    - specificare:
        - organizzazione dei file;
        - memorizzazione;
        - accesso ai dati;
        - struttura fisica dei record.
7. **Specificare Input e Output**
    - definire:
        - schermate di input;
        - layout;
        - report;
        - formati di output.
8. **Determinare il dimensionamento**
    - stimare:
        - quantità di dati;
        - numero di record;
        - dimensioni dei file
        - frequenza delle elaborazioni.
9. **Determinare i requisiti hardware**
    - definire:
        - capacità di memorizzazione;
        - backup;
        - terminali;
        - dispositivi di output;
        - hardware necessario.
# OOA e OOD
Si parla sempre di specifica semi formale e di modelli che descrivono questa specifica

Quando sviluppiamo un software seguendo il paradigma orientato agli oggetti dividiamo il lavoro in due fasi concettuali principali:
- Object Oriented Analysis (OOA): definisce COSA il prodotto software deve fare
- Object Oriented design (OOD): definisce COME il prodotto software lo deve fare

In questa prima parte daremo un focus sulla OOA
- un metodo OOA ha il seguente paradigma input e output
	- in Input si hanno requisiti utente e informazioni raccolte durante la Requirements Engineering
	- in output si fornisce un insieme di modelli del sistema che costituiscono la specifica software


i modelli utilizzati per fare OOA devono dare tre viste dello stesso sistema
- punto di vista della struttura dati -> quali oggetti esistono e come sono collegati
- punto di vista comportamentale -> quali servizi devono essere offerti e come gli oggetti collaborano
- punto di vista dinamico -> come alcuni oggetti cambiano durante l'esecuzione

- si vuole precisare inoltre che la costruzione di questi modelli non avviene in modo sequenziale e rigido bensì segue la prassi
	- iterativa dove i modelli vengono raffinati progressivamente
	- incrementale dove a ogni iterazione vengono aggiunti nuovi dettagli
	- parallela dove i modelli si influenzano a vicenda

## UML (Unified Modelling Language)
Prima di UML esistevano diversi metodi Object Oriented, ciascuno con proprie tecniche e notazioni.
Il problema era che metodi differenti usavano simboli e notazioni differenti per rappresentare concetti simili.
Da questa esigenza nasce **UML - Unified Modeling Language**.

un linguaggio standard di modellazione visuale per sistemi orientati agli oggetti
ci tengo a precisare che UML è un linguaggio con cui rappresentiamo graficamente il sistema seguendo nove formalismi fondamentali

- Diagrammi Strutturali (Modello dei Dati e Architettura)
	- Class Diagram
		- rappresenta le classi i loro attributi le operazioni e le associazioni che le legano
	- Object Diagram
		- mostra una istantanea del sistema in un dato momento rappresentando specifici oggetti come (istanze delle classi) e i loro legami
	- Component Diagram
		- evidenzia struttura e dipendenze fisiche tra le varie componenti software
	- Deployment Diagram
		- mostra l'architettura fisica come i nodi di elaborazione (PC, Server) e come i componenti software sono installati su di essi
- Diagrammi Comportamentali e Dinamici
	- Use Case Diagram
		- descrivono cosa fa il sistema dal punto di vista dell'utente mostrano le modalità(i casi d'uso) con cui gli utenti (attori) interagiscono con il sistema
	- State Diagram
		- mostrano la vita di un singolo oggetto illustrando tutti i suoi stati possibili e come transita da uno all'altro in risposta di eventi
	- Activity Diagram
		- simili a diagrammi di flusso usati per modellare sequenze di azioni (work-flow)
	- Sequence Diagram
		- diagrammi di interazione che mostrano lo scambio di messaggi tra oggetti nel tempo per realizzare un caso d'uso
	- Collaboration Diagram
		- diagrammi di interazione equivalenti ai sequence diagram ma si focalizzano sulle relazioni strutturali tra gli oggetti che comunicano anziché sul tempo
### Modello dei Dati con il Class Diagram
Il software nel paradigma Object Oriented è visto come un insieme di oggetti classificati che collaborano tra loro.
ma prima di capire come lo fanno bisogna definire quali oggetti devono esistere cosa devono contenere e che relazioni hanno tra di loro
Per questo è necessario il modello dei dati costruito tramite il Class Diagram

per Classe si intende un insieme di oggetti dello stesso tipo specificano le caratteristiche comuni che possiedono
un oggetto invece è una singola istanza concreta dela classe
Nel Class Diagram una classe può contenere:
- **nome**
	- il nome della classe
- **attributi**
	- le informazioni che descrivono lo stato di un oggetto come `student_name` di una classe `student`
- **operazioni**
	- i servizi che gli oggetti della classe mettono a disposizione
	- non si conoscono tutte subito quindi verranno aggiunge in seguito

Quindi la costruzione del Class Diagram procede progressivamente:
1. identificazione delle classi
2. identificazione degli attributi
3. identificazione delle associazioni
4. successivamente, aggiunta delle operazioni

inizialmente si identificano le Entity Classes le entità del dominio base come studente fattura ecc
poi si aggiungono le Control Classes che gestiscono la logica
poi si aggiungono le Boundary Classes che gestiscono le interazioni
#### Identificazione delle Entity Classes
Per individuare le classi non basta trasformare ogni sostantivo dei requisiti in una classe
bisogna trovare concetti di dominio che il software deve rappresentare tramite oggetti

ci sono diversi approcci per farlo ma sono tutti combinabili o alternative
##### Noun Phase Approach
Si parte dal testo dei requisiti e si individuano le frasi nominali in particolare i sostantivi
Ogni sostantivo viene inizialmente trattato come classe candidata
Successivamente le candidate vengono classificate in rilevanti non rilevanti o fuzzy(non si sa se sceglierle)
![[GPT PREMIUMS/16_agosto_appunti/assets/p044-fig-043.png|500]]

L'esempio dell'università mostra proprio questo passaggio: termini come `Course` o `Degree` possono diventare classi rilevanti, mentre concetti generici come `number` non lo diventano automaticamente.

##### Common Class Patterns Approach
Questo approccio non inizia subito con la ricerca nei requisiti ma da categorie ricorrenti nel dominio ad esempio
- Events
- Organizations
- People
poi l'analista prende queste categorie e ne ricerca le classi può introdurre ambiguità ma non si basa solo sui requisiti
##### Use Case Driven
Le classi vengono cercate a partire dagli scenari descritti negli Use Case
- gli attori individuati nei Use Case diventano automaticamente candidate Entity classes
- il testo che descrive il caso d'uso viene poi analizzato per trovare altre classi


![[GPT PREMIUMS/16_agosto_appunti/assets/p046-fig-046.png|500]]

Nell'esempio del telemarketing, gli attori `Telemarketer` e `Supporter` diventano quindi classi rilevanti per il modello dei dati

##### CRC - Class Responsibility Collaborators
il metodo CRC utilizza apposite card su cui vengono indicati 
- il nome della classe
- responsabilità della classe
- classi con cui deve collaborare

È particolarmente utile quando esiste già una prima idea delle classi e si vuole verificare se le responsabilità e le collaborazioni sono sensate.

##### Approccio mixed
Nella pratica è possibile combinare più tecniche.
ad esempio
1. prima identificazione tramite Common Class Patterns;
2. aggiunta di altre classi tramite Noun Phrase e Use Case Driven;
3. verifica delle responsabilità con CRC.

Il vantaggio è che nessuna singola tecnica deve sostenere da sola tutto il lavoro di identificazione.

#### Quando un concetto merita di diventare una classe
Una classe candidata diventa una classe effettiva quando

1. Deve avere uno **statement of purpose** chiaro: devi saper spiegare in una frase a cosa serve.
2. Deve avere **più istanze** (oggetti). Se prevedi che ne esista solo una (singleton), solitamente non è una buona entity class.
3. Deve avere un **insieme di attributi**. Se ha un solo attributo, probabilmente dovrebbe essere modellata come attributo di un'altra classe, non come classe a sé stante.
4. Deve fornire **servizi/operazioni** (anche se all'inizio non li scrivi nel diagramma, devono essere deducibili dal suo scopo).
#### Specifica delle classi
una volta identificate le classi bisogna descriverle in modo coerente
Nomi
- **Nomi di classe:** Devono essere significativi nel dominio applicativo. È fondamentale adottare una convenzione standard:
	- si usa il nome singolare, e se ci sono parole multiple si uniscono mettendo l'iniziale di ciascuna parola in maiuscolo (es. `PostalAddress`).
- **Attributi:** All'inizio dell'analisi (OOA), ci concentriamo solo sugli attributi che definiscono stati di reale interesse per il sistema. 
	- Anche qui serve una convenzione: si scrivono in minuscolo e le parole si separano con l'underscore (es. `street_name`).
- **Operazioni:** Come accennato nella parte precedente, l'aggiunta delle operazioni (i metodi della classe) viene ritardata. 
	- Si aspetta di avere a disposizione il _modello comportamentale_, perché è da lì (es. dai sequence diagram) che capiremo quali azioni la classe deve effettivamente compiere.

![[GPT PREMIUMS/16_agosto_appunti/assets/p047-fig-048.png|550]]

L'esempio universitario mostra questo raffinamento: nuove informazioni fanno evolvere il Class Diagram e alcuni concetti inizialmente incerti vengono promossi a vere classi.
in questo esempio qua sopra si può notare come vengono espresse alcune proprietà
- `<<PK>>` → Primary Key;
- `<<CK>>` → Candidate Key;
- `/attributo` → **derived attribute**, valore calcolato invece di essere memorizzato direttamente;
- `$ attributo` → attributo con **class/static scope**, condiviso dalle istanze della classe.

Gli stereotipi `<<...>>` sono un meccanismo con cui UML può essere esteso per rappresentare informazioni specifiche di un dominio o di un profilo.

#### Associazioni tra classi
dobbiamo rappresentare come gli oggetti possono essere collegati tra loro
una associazione è una relazione strutturale tra classi

Un indizio importante è la presenza di un attributo il cui tipo non è un tipo elementare ma un'altra classe: in quel caso quell'informazione rappresenta concettualmente un legame tra oggetti
- nome 
	- della relazione
- molteplicità alle estremità
	- indica quante istanze di una classe possono essere collegate a una singola istanza dell'altra
		- `1` → esattamente una;
		- `0..1` → zero oppure una;
		- `1..*` → almeno una;
		- `0..*` oppure `*` → zero o più.
- quando utile, role name
	- descrive il ruolo che gli oggetti assumono nell'associazione

L'immagine mostra un modello in cui associazioni, molteplicità e role name vengono progressivamente specificati.
![[GPT PREMIUMS/16_agosto_appunti/assets/p051-fig-052.png|650]]

è importante in una relazione evitare associazioni ternarie dove una relazione coinvolge tre classi
- bisogna trasformarla in una rete di associazioni binarie

##### Relazioni di tipo Aggregation e Composition
Alcune associazioni esprimono una relazione whole-part
- servono a dire che un oggetto è formato da altri oggetti
- si distingue un oggetto **whole** (“il tutto”) e uno o più oggetti **part** (“le parti”);
	- esempio:
	    - `Auto` = whole;
	    - `Motore`, `Ruota`, `Sedile` = parti/componenti dell’auto.
UML distingue due forme principali di relazioni di questo tipo
- **Aggregation** 
	- rappresentata con un rombo vuoto dalla parte del contenitore descrive una relazione debole
	- la parte può esistere anche indipendentemente dal tutto
	- tratta i casi di Has e Member
- **Composition** 
	- rappresentata con un rombo pieno dalla parte del contenitore
	- se il tutto viene eliminato, anche la parte perde senso/esistenza nel modello
	- tratta i casi di Owns e Exclusive Owns
![[GPT PREMIUMS/16_agosto_appunti/assets/p053-fig-054.png|550]]

L'esempio universitario mette a confronto i due casi: la carriera accademica può essere modellata come parte fortemente legata allo studente, mentre altre relazioni richiedono un legame meno forte.
##### Generalizzazione ed Ereditarietà 
un altro tipo di relazione è la generalizzazione
Si usa quando una classe più specifica rappresenta un caso particolare di una classe più generale.
- classe generale → **superclasse**
- classe specializzata → **sottoclasse**

La sottoclasse eredita attributi e operazioni definiti nella superclasse e può aggiungerne di propri
In UML si disegna con una linea continua che termina con una **freccia vuota** che punta verso la superclasse.

Due concetti teorici fondamentali:
- **Sostituibilità:** Un oggetto di una sottoclasse deve poter essere inserito ovunque il sistema si aspetti un oggetto della superclasse, senza far crollare nulla. 
	- Esempio: se una funzione richiede un oggetto di tipo "Frutta", passargli un oggetto di tipo "Mela" (sottoclasse di Frutta) è perfettamente legale e il programma funzionerà.
- **Polimorfismo:** La stessa operazione (metodo) definita nella superclasse può avere implementazioni (algoritmi) completamente differenti nelle sottoclassi.
#### Object Diagram
Dopo aver modellato le classi, può essere utile vedere un esempio concreto di oggetti realmente esistenti in un determinato momento

L'**Object Diagram** rappresenta:
- istanze di classi
- valori o stato di oggetti specifici
- collegamenti tra quelle istanze
![[GPT PREMIUMS/16_agosto_appunti/assets/p055-fig-055.png|393]]

L'immagine mostra oggetti specifici dello scenario universitario e rende concrete relazioni che nel Class Diagram erano espresse a livello di classe.
### Modello comportamentale
Il Class Diagram ci dice quali oggetti possono esistere e come sono collegati ma non basta per spiegare come il sistema offre i propri servizi
Un software Object Oriented funziona perché gli oggetti collaborano tra di loro
Questa collaborazione avviene attraverso lo scambio di **messaggi**, cioè richieste con cui un oggetto chiede a un altro di eseguire una determinata operazione
Per capire quali funzionalità deve offrire il sistema e come vengono realizzate dagli oggetti, passiamo quindi al **modello comportamentale**

Il primo e più importante diagramma in questa fase è lo **Use Case Diagram**. In fase di OOA, si concentra su **COSA** il sistema deve fare creando scenari di funzionamento
Il corso usa principalmente:

- **Use Case Diagram** → quali scenari e servizi sono disponibili;
- **Activity Diagram** → quale flusso di attività realizza uno scenario;
- **Sequence Diagram** → come collaborano gli oggetti e in quale ordine temporale;
- **Collaboration Diagram** → come collaborano gli oggetti mettendo in evidenza le loro relazioni.

ogni livello aggiunge informazioni che possono ritornare a modificare il Class Diagram
#### Use Case Diagram
Un **Use Case** descrive uno scenario completo in cui un attore utilizza il sistema per ottenere un risultato significativo

**Caratteristiche di un Caso d'Uso:**
- Rappresenta una funzionalità completa e visibile dall'esterno (include il flusso principale, ma anche le alternative e le eccezioni).
- È originato da un **Attore** (un utente umano, un device esterno, o un altro sistema).
- Produce sempre un risultato _significativo_ e di valore per l'attore che lo ha attivato.
- È ortogonale: in teoria, ogni caso d'uso viene eseguito in modo indipendente dagli altri.

**Le Relazioni nello Use Case Diagram:**
- **Associazione:** La linea semplice che collega l'omino (l'Attore) all'ovale (il Caso d'Uso).
- **`<<include>>`:** Un caso d'uso "A" include un caso d'uso "B". 
	- Significa che "B" è _obbligatorio e necessario_ per completare "A".
		- _Esempio: Il caso d'uso "Preleva Contanti" include sempre "Verifica PIN"._
- **`<<extend>>`:** Un caso d'uso "B" estende "A". 
- Significa che "B" aggiunge un comportamento ad "A", ma è _opzionale_. 
	- L'attivazione di "B" non è necessaria per far funzionare "A" con successo. 
		- _Esempio: "Prenota Volo" può essere esteso da "Aggiungi Assicurazione di Viaggio"._
- **Generalizzazione:** Come per le classi, un caso d'uso "padre" può avere casi d'uso "figli" più specifici, o un Attore generico (es. Utente) può essere specializzato (es. Amministratore).

La differenza fondamentale è:
- **include** → comportamento necessario
- **extend** → comportamento eventuale

![[GPT PREMIUMS/16_agosto_appunti/assets/p056-fig-056.png|401]]

Nell'esempio universitario si vedono sia `include` sia `extend`: il diagramma mostra quindi non solo quali servizi esistono, ma anche quali scenari sono obbligatoriamente collegati e quali si attivano soltanto in certi casi.
![[GPT PREMIUMS/16_agosto_appunti/assets/p057-fig-057.png|401]]

L'esempio Contact Management mostra invece bene la generalizzazione tra attori con responsabilità differenti.
La **generalizzazione** è nelle frecce con **triangolo vuoto** tra gli attori
- ogni `Customer Services Employee` è anche un `Employee`
- ogni `Customer Services Manager` è anche un `Customer Services Employee`, e quindi indirettamente anche un `Employee`

Il diagramma individua **quali scenari esistono**, ma non descrive in dettaglio cosa accade durante l'esecuzione di ciascuno per farlo si possono fare due cose
- descrizione **informale** in linguaggio naturale
- descrizione più strutturata tramite **Activity Diagram**
#### Activity Diagram
Nel contesto dell'OOA viene usato soprattutto per descrivere **come si sviluppa il flusso di un singolo Use Case**
i suoi elementi sono
- **nodo iniziale** → punto di inizio del flusso;
- **attività** → azione o passo che deve essere svolto;
- **transizioni** → passaggio da un'attività alla successiva;
- **nodo finale** → conclusione del flusso;
- **guard condition** → condizione che stabilisce quando una transizione può essere percorsa;
- **branch/merge** → gestione di flussi alternativi;
- **fork/join** → gestione di flussi concorrenti.

Il **branch** introduce un'alternativa:
- da un punto partono più possibili percorsi
- la condizione di guardia determina quale viene seguito
Il **merge** riunisce flussi alternativi:
- non aspetta che arrivino tutti
- basta che arrivi il percorso effettivamente seguito

Il **fork** crea flussi concorrenti:
- da un unico flusso ne partono più di uno;
- le attività possono procedere in parallelo.
La **join** sincronizza flussi concorrenti:
- aspetta che siano stati completati tutti i flussi richiesti;
- solo dopo permette di proseguire.

Questa differenza è fondamentale:
- **merge** → riunisce alternative;
- **join** → sincronizza attività parallele.

![[GPT PREMIUMS/16_agosto_appunti/assets/p060-fig-060.png|425]]

L'esempio del noleggio video mostra branch, cicli, fork e join all'interno dello stesso scenario.
L'Activity Diagram ci dice **quali attività devono essere svolte**
Ma dobbiamo aggiungere come collaborano tra loro gli oggetti che si scambiano messaggi tra loro
ci sono due diagrammi per rappresentare ciò:
- **Sequence Diagram**
- **Collaboration Diagram**

#### Sequence Diagram
È il più usato in fase di OOA. 
Descrive lo scambio di messaggi tra gli oggetti seguendo un rigoroso **ordine temporale** (dall'alto verso il basso).
- **Lifeline (Linea di vita):** Ogni oggetto è rappresentato in alto, con una linea tratteggiata verticale che scende verso il basso, a indicare il tempo che passa.
- **Activation Box:** Sulla lifeline compare un rettangolino verticale stretto e lungo quando l'oggetto è "attivo", cioè sta eseguendo un'operazione.
- **Messaggi:** Le frecce orizzontali tra le lifeline rappresentano i messaggi (che derivano dalle azioni dell'Activity Diagram). 
	- Ogni messaggio inviato a un oggetto diventa automaticamente un metodo della classe di quell'oggetto
	- Call il mittente invia una richiesta e attende una risposta prima di proseguire (sincrona)
	- Signal il mittente invia il messaggio e può continuare l'esecuzione (asincrona)
	- Flat quando ancora non è definita l'interazione

Il diagramma rende quindi visibile non solo chi comunica con chi, ma soprattutto **in quale ordine**.

![[CORSETTI/Immagini/Pasted image 20260420190701.png|525]]
#### Collaboration Diagram
Più usato in fase di OOD.
Invece di avere la linea del tempo, mostra gli oggetti disposti nello spazio e collegati dalle relazioni strutturali che esistono tra loro.
I messaggi viaggiano su questi collegamenti e sono numerati (1, 1.1, 1.2, 2...) per far capire in che ordine avvengono
#### Interfaccia pubblica di una classe
Una classe non dovrebbe permettere agli altri oggetti di modificare liberamente il proprio stato interno.
Il principio di **Information Hiding** prevede che i dettagli interni vengano nascosti e che l'accesso avvenga attraverso operazioni controllate.
L'**interfaccia pubblica della classe** è quindi l'insieme delle operazioni che la classe mette a disposizione degli altri oggetti

mediante Accessor Methods
- **getter** → restituisce il valore di un attributo;
- **setter** → modifica il valore di un attributo.

Per ogni operazione definiamo quindi soprattutto la **signature**:
- nome;
- parametri;
- eventuale valore di ritorno.
L'algoritmo interno verrà progettato successivamente in OOD

Un'operazione può avere:
- **Instance scope:** Il metodo agisce su un oggetto specifico (es. `MarioRossi.calcolaMedia()`).
- **Class / Static scope:** Il metodo appartiene alla classe in generale, non a un singolo oggetto. 
	- In UML si indica mettendo un `$` davanti al nome (es. `$trovaStudente()`).


_Suggerimento Pratico:_ Oltre ai Sequence Diagram, per trovare le operazioni le classi devono rispettare il **criterio CRUD**. Ogni entità importante deve avere metodi per:
- **C**reate (creare una nuova istanza)
- **R**ead (leggere il suo stato)
- **U**pdate (aggiornarne i dati)
- **D**elete (eliminarla)
#### State Diagram
abbiamo definito
- struttura degli oggetti → modello dei dati
- servizi e collaborazioni → modello comportamentale
Per descrivere come il loro stato cambia nel tempo per alcuni oggetti ad esempio per software real-time abbiamo
**Stato**
- Lo stato di un oggetto rappresenta una condizione in cui l'oggetto si trova e influisce sul suo comportamento
**Transizione**
- Una **transizione** rappresenta il passaggio da uno stato a un altro
- descritta con evento condizione e azione

![[GPT PREMIUMS/16_agosto_appunti/assets/p065-fig-065.png|450]]
#### Gestire la complessità dei modelli OOA
Quando si progetta un sistema software reale, il Class Diagram diventa rapidamente un groviglio incomprensibile
Se tutte le classi potessero comunicare liberamente con tutte le altre, il modello diventerebbe rapidamente difficile da comprendere e mantenere
Per questo si introduce un principio di **stratificazione**
Si organizzano gli elementi in gruppi e si limitano le comunicazioni
- elementi dello stesso strato possono collaborare
- gli strati comunicano secondo regole definite
- si evitano collegamenti arbitrari tra ogni parte del sistema

così diventa tutto più gestibile
![[GPT PREMIUMS/16_agosto_appunti/assets/p066-fig-067.png|500]]

Per raggruppare fisicamente e logicamente queste classi, UML usa i **Package** (raffigurati come delle cartelline).
- I package possono essere annidati l'uno dentro l'altro
- Una classe appartiene a un solo package
- La comunicazione tra package diversi è strettamente controllata tramite le regole di visibilità (private, protected, public) delle classi al loro interno
- _Nota tecnica:_ Non esiste un vero e proprio "Package Diagram" ufficiale in UML, ma i package si disegnano direttamente all'interno dei Class Diagram o degli Use Case Diagram. Tra i package si possono definire relazioni di dipendenza (se modifico il Package A, potrei rompere il Package B).
#### Approccio BCE
Per organizzare le classi si classificano in tre categorie
- Boundary
	- Contiene le classi che si interfacciano con l'attore (l'utente o un sistema esterno). Queste classi prendono i dati dal sistema e li presentano all'utente (es. una pagina Web, una maschera di inserimento dati, un menu).
- Control
	- È il "cervello" operativo. Le classi di controllo intercettano gli input in arrivo dalle Boundary, applicano le regole di business e coordinano l'esecuzione dei casi d'uso. Dicono alle entità cosa fare.
- Entity
	- Contiene le entity classes vere e proprie che abbiamo visto all'inizio (il Modello dei Dati). Corrispondono alle strutture dati salvate nel database (es. `Studente`, `Corso`, `Fattura`).

**Il flusso tipico è questo:** 
L'Utente interagisce con una _Boundary_ -> 
La Boundary passa il comando al _Control_ -> 
Il Control applica la logica e legge/scrive i dati sulle _Entity_. 
Questo isola i dati dall'interfaccia utente, rendendo il software manutenibile e scalabile
`Actor <-> Boundary <-> Control <-> Entity`

# Casi di studio
## Caso di Studio A: University Enrolment (Sistema di Iscrizione Universitaria)

Questo sistema deve gestire le iscrizioni di studenti a corsi di laurea (Undergraduate e Postgraduate), verificando propedeuticità, conflitti di orario e limiti di posti.
### A.1 - Identificazione delle Classi (Approccio Noun Phrase)

Partendo dai requisiti testuali (es. "Ogni corso di laurea ha corsi obbligatori ed elettivi"), si estraggono i sostantivi.
- **Classi Rilevanti confermate:** `Course` (Corso), `Degree` (Corso di Laurea), `Student` (Studente), `CourseOffering` (L'erogazione di un corso in un dato semestre).
- **Classi Fuzzy (Da rivedere):** `CompulsoryCourse` ed `ElectiveCourse` vengono per ora messe in sospeso, così come `StudyProgram`.
### A.2 - Specifica degli Attributi

Analizzando regole più specifiche (es. vincoli sui posti disponibili e approvazioni), le classi prendono forma.
- Vengono assegnati gli attributi con i rispettivi tipi di dato. Ad esempio, `Course` riceve `course_code` (marcato come `<<PK>>`, Primary Key) e `credit_points`. `CourseOffering` riceve `year`, `semester` ed `enrolment_quota`.

![[CORSETTI/Immagini/Pasted image 20260420185048.png|466]]
### A.3 - Aggiunta delle Aggregazioni

Il sistema richiede di mantenere uno storico accademico (`AcademicRecord`) e di sapere quale docente è responsabile di un corso (`AcademicInCharge`).
- Si crea una **composizione** (rombo pieno, legame vitale) tra `Student` e `AcademicRecord`: lo storico non ha senso di esistere senza lo studente.
- Si crea un'**aggregazione** (rombo vuoto) tra `Course` e `CourseOffering`: il corso logico "contiene" le sue edizioni annuali.

![[CORSETTI/Immagini/Pasted image 20260420185527.png|441]]
### A.5 - Use Case Diagram (Casi d'Uso)

Si mappano gli attori e le loro azioni.
- L'attore `Student` può "Fornire i risultati degli esami".
- L'attore `Student Office` può "Fornire le istruzioni di iscrizione" (che **estende** `<<extend>>` il caso d'uso precedente, essendo un'azione opzionale).
- L'inserimento del piano di studi (`Enter Program of Study`) **include** sempre `<<include>>` la sua validazione (`Validate Program of Study`).

![[CORSETTI/Immagini/Pasted image 20260420185827.png|471]]
### A.6 e A.7 - Sequence Diagram e Identificazione Operazioni

Per capire come inserire un piano di studi, si modella l'interazione.
- L'interfaccia invia il messaggio asincrono `add(std, crs, sem)` al sistema.
- Si verificano i requisiti tramite chiamate sincrone come `areYouValid()` (inviata allo Studente) e `areYouOpen()` (inviata all'Offerta Formativa).
- **Risultato (A.7):** Grazie a questi messaggi, nel Class Diagram compaiono finalmente i metodi! La classe `Course` riceve l'operazione `areYouOpen()`, e `CourseOffering` riceve `areYouOpen()` e `addStudent()`.

![[CORSETTI/Immagini/Pasted image 20260420190733.png|452]]


## Software Project Management
prima di realizzare effettivamente il lavoro e sapere cosa bisogna fare è necessaria una parte che organizza il lavoro necessario per realizzarlo da questo nasce la Software Project Management ovvero la gestione del progetto software dove la pianificazione è una delle sue attività fondamentali

Comprende la pianificazione, il monitoraggio e il controllo delle persone, delle attività e delle risorse coinvolte nello sviluppo del software
la gestione di un progetto software viene ricondotta alle quattro P:
- People
	- organizzazione dei team responsabilità e comunicazione
- Product
	- comprendere obiettivi, funzioni, dati e caratteristiche
- Process
	- stabilisce il quadro generale secondo cui verrà sviluppato il prodotto definendo il modello e le attività del processo software
- Project
	- organizzazione concreta del lavoro comprende task, persone, tempi e costi

Le quattro P sono collegate: non è possibile stimare correttamente tempi e costi senza conoscere il prodotto, il processo scelto e le persone che dovranno svolgere il lavoro
### Organizzazione delle persone
Non è detto che aggiungere persone a un progetto equivalga a ridurne la sua durata
Il lavoro software richiede comunicazione, coordinamento e condivisione di decisioni. Se il numero di persone aumenta, aumentano anche le interazioni necessarie tra loro
##### La legge di Brooks
a tal proposito la seguente legge attesta che
> aggiungere personale a un progetto software già in ritardo può farlo ritardare ulteriormente.

Perché succede questo? Per i seguenti motivi:
1. **Indivisibilità:** Non tutti i compiti possono essere parallelizzati (se un modulo dipende da un altro, devi aspettare che sia finito).
2. **Overhead di interazione:** 4 persone devono parlarsi continuamente per integrare il loro lavoro. Aumentano i canali di comunicazione, aumentando la probabilità di incomprensioni ed errori.
#### Due modelli di organizzazione del team
Vengono presentati due approcci opposti utili per capire il trade-off tra collaborazione orizzontale e controllo gerarchico
Team democratico
- il modello democratico o orizzontale prevede alla base una idea di programmazione senza ego
	- il codice è prodotto del team e la ricerca dei difetti non è una critica personale ma un modo per migliorarsi
	- favorisce il confronto e la correzione degli errori ma può essere difficile da adattare e imporre
Team con Chief Programmer
- approccio gerarchico che riduce la complessità delle comunicazioni
- ogni partecipante ha un suo ruolo specializzato e gli sviluppatori comunicano con un capo sviluppatore
	- riduzione dei canali di comunicazione ma richiede persone estremamente competenti
![[GPT PREMIUMS/17_agosto_appunti/assets/p068-fig-070.png|385]]
date le limitazioni viene poi evoluto il modello con una divisione delle responsabilità tra due team
- team Leader per gli aspetti tecnici
- team Manager per gli aspetti gestionali

Si introducono quindi:
- aree di responsabilità condivise;
- livelli superiori di coordinamento;
- canali di comunicazione tra team;
- forme di *decision making* più decentralizzate.
![[GPT PREMIUMS/17_agosto_appunti/assets/p069-fig-071.png|700]]
Il punto importante non è memorizzare un unico modello organizzativo “corretto”, ma capire che **la struttura del team influenza comunicazione, coordinamento e quindi tempi e costi del progetto**.

### Che cosa deve stabilire una pianificazione
L'**obiettivo** della pianificazione è avere un quadro di riferimento per controllare l'avanzamento dei lavori e rispettare costi, tempi e qualità. Si articola in 5 componenti fondamentali:
1. **Scoping:** Comprendere a fondo il problema e tracciare i confini di ciò che va (e non va) sviluppato.
2. **Stime:** Prevedere quanto tempo, costo ed _effort_ (sforzo umano) servirà.
3. **Rischi:** Analizzare preventivamente cosa potrebbe andare storto e come gestirlo.
4. **Schedule:** Allocare le risorse nel tempo e fissare i traguardi (milestone).
5. **Control strategy:** Stabilire come gestire i cambiamenti dei requisiti (e ci saranno sempre) e il controllo qualità.

Il Risk Management è già stato approfondito. Qui ci concentriamo soprattutto su **stime** e **pianificazione temporale**
### Stime nei progetti software
Una stima cerca di prevedere prima dello sviluppo una quantità che conosceremo con precisione più avanti
le grandezze che si possono stimare sono
- *dimensione del software*
- *effort necessario*
	- quantità complessiva di lavoro necessaria per svolgere un'attivita o sviluppare il prodotto spesso espresso in Man-Months per definire quante persone e quanti mesi di lavoro
		- (10 mesi di lavoro di 1 persona è diverso da 10 mesi divisi in 2 persone)
- *durata dello sviluppo*
- *costo*
le stime si vedono in 3 approcci principali
- ***per analogia***
- ***tecniche di scomposizione***
- ***modelli algoritmici empirici***

#### Per antologia
- si confronta un nuovo progetto con progetti già fatti e si cercano caratteristiche in comune
- se il nuovo progetto differisce allora diventa meno affidabile la stima sulle grandezze definite sopra
#### tecniche di scomposizione
- quando il progetto è troppo grande si applica un principio di divide et impera per calcolare delle sue stime
	- si divide in parti più piccole
	- si stima ogni parte
	- si combinano le stime
Il principio è *bottom-up*: si parte dai componenti per arrivare alla stima complessiva.
Una tecnica mostrata negli appunti utilizza per ciascun componente:
- **Estimated LOC** → righe di codice stimate;
- **LOC/pm** → produttività, cioè quante linee di codice vengono prodotte mediamente in un mese-persona;
- **$/LOC** → costo medio per linea di codice.
calcolando così
- **Effort**:

$$Effort = \frac{Estimated\ LOC}{LOC/pm}$$
- **Cost**:
$$Cost = Estimated\ LOC \times \$/LOC$$

![[GPT PREMIUMS/17_agosto_appunti/assets/p070-fig-072.png|443]]

problema: 
bisogna stimare le LOC prima che il codice esista e inoltre dipende dal linguaggio di programmazione usato

per questo viene usata una misura meno dipendente dal linguaggio usato

##### Function Point
cercano di misurare in modo pesato la dimensione funzionale del software a partire da ciò che il sistema deve fare attraverso le specifiche, che descrivono le funzionalità che il sistema dovrà offrire

il conteggio avviene per 2 fasi:
- calcolo del conteggio funzionale non aggiustato
- correzione del valore considerando la complessità tecnica
$$FP = UFC \times TCF$$
- **UFC** considera la funzionalità;
- **TCF — Technical Complexity Factor** corregge il valore tenendo conto della difficoltà tecnica.

Per calcolare UFC vediamo il suo boundary ovvero il confine che separa il software dal mondo esterno considerando come
***Dati***
- *ILF*- Internal Logical Files
	- le informazioni che il software gestisce internamente
- *EIF*- External Interface Files
	- gruppi logici di dati utilizzati dal sistema ma condivisi o gestiti attraverso altre applicazioni
ricordando che file non è un singolo file nel file system ma Indica un **gruppo logico di informazioni correlate**

***Interazioni con l'esterno***
- EI- External Input
	- dati di input che entrano nel software
- EO- External Output
	- dati che escono dal software
- EQ- External Inquiry
	- un input che genera immediatamente un output senza modificare archivi interni
![[GPT PREMIUMS/17_agosto_appunti/assets/p071-fig-073.png|600]]

non è sufficiente contarli per ciascuno bisogna determinare una classe di complessità e si applica il peso previsto dalla tecnica

![[GPT PREMIUMS/17_agosto_appunti/assets/p073-fig-075.png|373]]
La somma dei valori ponderati produce il conteggio non aggiustato **UFC**.
Finora abbiamo però misurato soltanto **la complessità funzionale**
Non abbiamo ancora considerato quanto il prodotto sia tecnicamente difficile da realizzare
Il **TCF** tiene conto di fattori tecnici che possono rendere il sistema più o meno difficile da sviluppare.
Gli appunti considerano **14 Degree of Influence**. Per ciascun fattore viene assegnato un valore da:
- `0` → influenza irrilevante;
- `5` → influenza essenziale.

Il fattore complessivo viene calcolato attraverso la formula riportata negli appunti:
![[GPT PREMIUMS/17_agosto_appunti/assets/p074-fig-076.png|285]]
Il TCF non sostituisce il conteggio funzionale: lo **aggiusta** in base alla difficoltà tecnica.

##### Un ponte tra Functional Point e LOC il Backfiring
Rimane però un'altra difficoltà: diversi modelli di stima utilizzano come input le **LOC**

Il **Backfiring** utilizza tabelle empiriche che associano a ciascun linguaggio un numero indicativo di LOC per Function Point
Questa conversione non rende FP e LOC la stessa misura:

- FP misura la dimensione dal punto di vista della funzionalità;
- LOC misura la dimensione del codice;
- il backfiring permette di passare empiricamente dall'una all'altra quando un modello richiede LOC.
![[GPT PREMIUMS/17_agosto_appunti/assets/p074-fig-077.png|280]]


Una volta ottenuta una stima dimensionale in LOC, possiamo usarla come input per un modello algoritmico. Negli appunti il modello principale è **COCOMO**

#### modelli algoritmici empirici
dopo aver definito le tecniche di scomposizione si usano algoritmi complessi per stimare effort
##### Algoritmo COCOMO - COnstructive COst mOdel
è un modello algoritmico empirico utilizzato per stimare l'effort di sviluppo
dal quale poi si deriveranno a cascata la durata temporale del progetto e i costi di sviluppo

Il COCOMO non è un modello unico, ma si divide in 3 livelli di precisione crescente:
1. **Basic:** Usato per stime iniziali e molto grezze.
2. **Intermediate:** Più preciso, si applica dopo aver scomposto il sistema in sotto-sistemi.
3. **Advanced:** Il più dettagliato, si usa quando il sistema è già stato diviso in singoli moduli.

La stima dipende anche dai modi di sviluppo
- **Organic**
	- prodotti piccoli
- **Semidetached**
	- prodotti di dimensione e difficoltà intermedie
- **Embedded**
	- prodotti complessi e con vincoli maggiori

Quindi, prima di applicare la formula, bisogna stabilire:

1. quale versione del modello si sta utilizzando;
2. quale modo di sviluppo rappresenta il progetto;
3. quante KLOC sono previste.
dove per KLOC si intende una misura espressa come Kilo Lines of Code 
- `20 KLOC` = circa `20 000 LOC`.

l'effort si calcola a 2 livelli di precisione
- ***Nominale***
	- considera la dimensione ma non ha ancora tutte le caratteristiche specifiche del progetto
	- si calcola con la formula $Effort_{nominale} = a \times (KLOC)^b$
	- dove a e b sono il modello e il modo di sviluppo
	- con risultato espresso in **Man-Months**
- ***Cost Drivers***
	- si corregge quello nominale tenendo conto di cose che possono cambiare anche se si ha la stessa quantità di codice
	- si considerano 15 fattori suddivisi in gruppi relativi a:
		- **Product**
		- **Platform**
		- **Personnel**
		- **Project**
	- ciascun fattore ha un punteggio e poi si calcola il fattore complessivo come prodotto dei singoli cost driver
		- $C = \prod_i C_i$ e poi
		- $Effort = Effort_{nominale} \times C$

da questo deriviamo quindi l'effort che ci dice quanto lavoro complessivo abbiamo ma non ci dice ancora quanto tempo di calendario durerà il progetto

COCOMO permette quindi di stimare anche la durata attraverso una relazione del tipo:
$$Time = c \times Effort^d$$
dove `c` e `d` dipendono dal modo di sviluppo.

inoltre poi si può anche calcolare il costo basandosi su 
$$Costo\ totale = \sum (Effort_{ruolo} \times Costo\ per\ MM_{ruolo})$$
Manca però ancora una cosa: **disporre concretamente le attività nel tempo rispettando le loro dipendenze**
#### Pianificazione temporale
La **pianificazione temporale** organizza i task del progetto nel tempo
i task non sono tutti indipendenti alcuni possono iniziare soltanto dopo che altri sono terminati
la pianificazione deve considerare
- **Ripartizione:** Dividere il problema grande in task piccoli (tecnica "Divide et Impera").
- **Interdipendenza:** Capire cosa va fatto _prima_ di qualcos'altro (es. non posso testare il login se non ho creato il database).
- **Allocazione:** Assegnare persone, sforzo e date di inizio/fine ai task.
- **Responsabilità definite:** Individuazione delle responsabilità assegnate a ciascun task.
- **Risultati previsti:** Definizione dei risultati prodotti al termine di ogni task.
- **Milestone:** Fissare punti di controllo intermedi per verificare la qualità.

Due strumenti complementari aiutano a rappresentare questa pianificazione: **PERT** e **Gantt**.

##### PERT - Program Evaluation and Review Technique
rappresenta i task e le loro dipendenze come una rete

- i nodi rappresentano i task;
- gli archi rappresentano i vincoli di precedenza.

permette di capire quali attività possono procedere in parallelo e quali devono attendere il completamento di altre

Il **cammino critico** è la sequenza di task che determina la durata minima possibile del progetto.

Quindi PERT risponde bene alla domanda:

> **quali dipendenze tra task condizionano la durata del progetto?**
![[GPT PREMIUMS/17_agosto_appunti/assets/p078-fig-080.png|600]]

Non rende però altrettanto immediato capire **in quali date di calendario** si svolgono le singole attività.
Per questo viene affiancato dal diagramma di Gantt.

##### Diagramma di Gantt

Il **Gantt** rappresenta le attività su una scala temporale calendariale.

Permette di vedere:
- quando inizia un task;
- quando termina;
- quanto dura;
- quali attività si sovrappongono.

![[CORSETTI/Immagini/Pasted image 20260421100613.png]]

### Documento SPMP - Software Project Management Plan

Tutte queste stime, i diagrammi di Gantt, l'organizzazione del team e i calcoli dei rischi, dove finiscono? Finiscono nel **Software Project Management Plan (SPMP)**. È il documento ufficiale che certifica il contratto operativo del progetto, coprendo: Scoping, Stime, Rischi, Schedule e Strategie di controllo.

Un SPMP ben fatto (secondo la logica IEEE) è composto da queste anime:
1. **Overview (Panoramica):** Qual è lo scopo del software, quali sono gli obiettivi, i vincoli (es. hardware limitato) e i "deliverable" (cosa consegneremo fisicamente al cliente: codice, manuali, ecc.).
2. **Project Organization (Organizzazione):** Chi fa cosa. Interfacce interne (come comunicano i team) ed esterne (come comunichiamo col cliente), ruoli e responsabilità.
3. **Managerial Process Plans (Piano Manageriale):** È il cuore gestionale. Contiene il piano di stima (COCOMO), il piano di assunzione del personale (Staffing), l'allocazione del budget e delle scadenze (Gantt), e il fondamentale piano di **gestione dei rischi**.
4. **Technical Process Plans (Piano Tecnico):** Quali metodi, modelli di ciclo di vita (es. Waterfall, Agile), strumenti (IDE, framework) e infrastrutture fisiche useremo.
5. **Supporting Process Plans (Piani di Supporto):** Include processi vitali che accompagnano lo sviluppo, come il **Configuration Management** (chi autorizza le modifiche al codice e come si gestiscono le versioni tramite Git/SVN), la Quality Assurance (QA) e i piani di Verifica e Validazione (Testing).
## Progettazione Software
dopo aver visto la pianificazione ora passiamo alla fase in cui si passa dal dominio del problema al dominio della soluzione

L'input principale è il **Documento di Specifica**
L'output è il **Documento di Progetto**

La progettazione viene divisa in 2 livelli principali
- Progetto architetturale o preliminare
	- individua le componenti principali del sistema
		- stabilisce come il prodotto viene suddiviso
- Progetto Dettagliato
	- entra all'interno delle singole componenti
	- definisce strutture dati, algoritmi e dettagli necessari all'implementazione

Prima di vedere tecniche specifiche di OOD e architetture, bisogna chiarire alcuni principi generali che guidano una buona progettazione

Per affrontare la fase di progetto in modo ingegneristico e non improvvisato, ci affidiamo a sei principi fondamentali:
- **Stepwise refinement (Raffinamento per passi successivi):** Utilizzato anche nella fase di analisi dei requisiti.
- **Astrazione:** Anch'esso impiegato nell'analisi dei requisiti.
- **Decomposizione modulare** 
- **Modularità** 
- **Information hiding (Occultamento delle informazioni)**
- **Riusabilità**

### Astrazione e Stepwise Refinement
**Astrazione** significa concentrarsi esclusivamente sugli aspetti essenziali di una certa entità (un oggetto, un modulo), ignorando deliberatamente i dettagli secondari o implementativi.
utilizziamo un'operazione sapendo:
- cosa riceve
- cosa produce
- quale servizio offre
si distinguono principalmente:
- astrazione procedurale
	- si considera un'operazione attraverso il servizio che offre
- astrazione dei dati
	- si lavora con una struttura dati attraverso le operazioni che mette a disposizione ma con una rappresentazione interna nascosta

Lo **Stepwise Refinement** procede in modo complementare
1. si parte da una descrizione ad alto livello;
2. si sceglie una parte;
3. si aggiungono dettagli;
4. il processo viene ripetuto finché si raggiunge il livello necessario per l'implementazione.

- l'astrazione permette di **salire** di livello e ignorare dettagli
- il refinement permette di **scendere** progressivamente nei dettagli

invece di trattare il software come un unico blocco, possiamo suddividerlo in parti più piccole
### Modularità e decomposizione modulare
La decomposizione modulare consiste nel suddividere il sistema in componenti più piccoli chiamati moduli
ridurre la complessità rendendo possibile ragionare su una parte del sistema alla volta

un modulo software è un'unità che contiene 
- istruzioni 
- logica di elaborazione 
- strutture dati 
che può inoltre 
- essere compilato da solo 
- essere incluso in un programma
- utilizzare altri moduli

Funzioni e classi sono esempi di elementi che possono svolgere il ruolo di modulo.

La **modularità** indica il grado con cui il software è organizzato in componenti discrete tali che una modifica a un componente abbia un impatto limitato sugli altri.

La decomposizione deve quindi puntare a creare moduli **quanto più indipendenti possibile**
così facendo:
- un modulo indipendente è più facile da comprendere
- una modifica locale ha meno effetti sul resto del sistema
- il testing è più gestibile
- aumenta la possibilità di riutilizzo

La suddivisione in moduli di un sistema software (**decomposizione modulare**) produce una mappa chiamata **structure chart** (architettura dei moduli), che descrive la struttura gerarchica dei moduli, come interagiscono tra loro e come i dati fluiscono attraverso di essi.

> [!NOTE] Dimostrazione della decomposizione
> Dati due problemi $p1$ e $p2$, $C$ la complessità ed $E$ lo sforzo (effort). 
> Se $C(p1) > C(p2) \Rightarrow E(p1) > E(p2)$ (più complesso = più sforzo). 
> Si afferma che la complessità del problema intero è maggiore della somma delle singole complessità: $C(p1+p2) > C(p1) + C(p2)$. 
> Di conseguenza: $E(p1+p2) > E(p1) + E(p2)$. 
> Questo dimostra che risolvere due problemi piccoli separatamente costa meno fatica che risolvere il problema intero in un colpo solo.
> 
![[GPT PREMIUMS/17_agosto_appunti/assets/p082-fig-083.png|450]]

Ma come possiamo capire se abbiamo suddiviso bene il sistema?
Servono due criteri complementari:
- **coesione** interna ai moduli
- **coupling** tra moduli

#### Coesione e Coupling
La **coesione** misura quanto le attività contenute nello stesso modulo siano correlate tra loro.
un modulo ad alta coesione
- ha uno scopo chiaro
- raggruppa attività strettamente connesse
- è più facile da comprendere e modificare

Si presentano sette livelli, dal peggiore al migliore
1. **Coincidental (Casuale - Livello 1, Pessima):** Nessuna relazione concettuale tra gli elementi del modulo. Sono stati messi lì per caso o per pigrizia.
    - _Esempio:_ Un modulo che stampa la riga successiva, inverte i caratteri di una stringa, aggiunge 7 a un parametro ed esegue una conversione int-double. Un vero "cestino" del codice.
2. **Logical (Logica - Livello 2):** Gli elementi svolgono funzioni che rientrano nella stessa categoria logica generale, ed è il modulo chiamante che passa un flag per decidere quale pezzo di codice eseguire.
    - _Esempio:_ Un "Super-modulo di Input/Output" che contiene il codice per leggere da disco, scrivere su nastro, stampare a video, ecc.. Fa troppe cose, anche se concettualmente simili.
3. **Temporal (Temporale - Livello 3):** Le operazioni sono raggruppate perché devono essere eseguite nello stesso lasso di tempo, non perché abbiano un legame logico forte.
    - _Esempio:_ Un modulo di inizializzazione generica che apre il file master, apre il file transazioni, apre le code di stampa, inizializza le tabelle, legge i primi record, ecc. all'avvio del programma.
4. **Procedural (Procedurale - Livello 4):** Gli elementi sono raggruppati perché fanno parte di una specifica sequenza predefinita di esecuzione.
    - _Esempio:_ Leggere il numero di serie di una parte dal database, e subito dopo usare quel numero per aggiornare il file di manutenzione. (Ottimale per il paradigma procedurale classico ).
5. **Communicational (Comunicazionale - Livello 5):** Come la procedurale, ma con in più il fatto che i passi operano sulla _stessa struttura dati_ in ingresso o in uscita.
    - _Esempio 1:_ Aggiornare il Record_A nel DB e poi scrivere lo stesso Record_A nel file di traiettoria.
    - _Esempio 2:_ Calcolare una nuova traiettoria e poi inviarla alla stampante.
6. **Informational (Informazionale - Livello 6):** Più operazioni indipendenti, ciascuna con il proprio punto di ingresso/uscita (entry/exit point), che manipolano e condividono la _stessa struttura dati_ nascosta.
    - _Esempio:_ Definizione della tabella "sales_region". Sotto ci sono punti di accesso indipendenti per "Inizializza tabella", "Aggiorna tabella" e "Stampa tabella". (Ottimale per il paradigma Object-Oriented ).
7. **Functional (Funzionale - Livello 7, Eccellente):** Tutti gli elementi del modulo contribuiscono ad una, e una sola, funzione ben definita.
    - _Esempio in uno Structure Chart:_ Un modulo root "Calcola le temperature medie di vari siti" chiama dei sottomoduli. Sottomoduli funzionali sono "Leggi sito, orario e temperatura", "Crea nuovo record temperatura", "Salva record temperatura".

- **Functional Cohesion** alla programmazione strutturata;
- **Informational Cohesion** al paradigma Object Oriented.

Il **coupling** misura il grado di dipendenza tra moduli differenti.
con l'obiettivo di minimizzarlo

Un coupling elevato significa che:
- un modulo conosce molti dettagli di un altro
- una modifica può propagarsi facilmente
- comprendere un modulo richiede conoscere anche altri moduli

Si presentano cinque livelli, dal peggiore al migliore
1. **Content (di Contenuto - Livello 1, Pessimo):** Un modulo entra a gamba tesa nell'implementazione dell'altro. Modifica il contenuto di un altro modulo, legge le sue variabili locali tramite spostamenti in memoria (offset), o effettua salti (branch) verso label interne dell'altro modulo. È disastroso.
2. **Common (Comune - Livello 2):** Due o più moduli accedono a variabili globali in memoria.
    - _Esempio:_ Due moduli `cca` e `ccb` modificano e leggono una `global variable`. Un ciclo del tipo `while(global_variable == 0)` dipende totalmente da chi altro nel sistema la tocca.
      ![[CORSETTI/Immagini/Pasted image 20260422175604.png|452]]
      
3. **Control (di Controllo - Livello 3):** Un modulo passa un "flag di controllo" ad un altro modulo per pilotarne esplicitamente l'esecuzione interna.
    - _Esempio:_ Il Modulo P chiama Q per fargli fare una cosa. Q ritorna un flag (es. "task non completato") imponendo a P di compiere un'azione specifica di conseguenza (es. "stampa messaggio di errore"). P e Q sono intimamente legati dalla logica di controllo.~~~~~~~~
4. **Stamp (di Struttura - Livello 4):** Si passa un'intera e complessa struttura dati (come un record enorme o un oggetto complesso) tra due moduli, ma il modulo ricevente ne usa solo una minuscola parte. Crea dipendenze artificiali su dati non necessari.
5. **Data (di Dati - Livello 5, Ottimale):** Due moduli comunicano passandosi argomenti semplici o strutture dati ma utilizzandone rigorosamente _tutti_ gli elementi. È l'accoppiamento più pulito: si passa solo il necessario, senza retroscena nascosti o passaggi inutili.



Una scomposizione è ben fatta se, e solo se, permette di ottenere:
1. **Massima Coesione (Cohesion) interna ai moduli**
2. **Minimo Accoppiamento (Coupling) tra i moduli**
Questi due concetti osservano il sistema da direzioni differenti:
- **Cohesion** → guarda *dentro* il modulo;
- **Coupling** → guarda *tra* moduli diversi.
![[GPT PREMIUMS/17_agosto_appunti/assets/p082-fig-084.png|600]]



Anche con un basso coupling, un modulo può esporre più dettagli del necessario.

L'**Information Hiding** stabilisce che ogni modulo dovrebbe rendere visibile all'esterno **solo ciò che gli altri moduli devono conoscere**, nascondendo i dettagli implementativi non necessari.
In pratica si separano:
- **interfaccia pubblica** → ciò che gli altri possono utilizzare;
- **implementazione interna** → come il modulo realizza realmente il servizio.


La **riusabilità** consiste nell'utilizzare in un nuovo prodotto elementi già sviluppati in precedenza.
Il riuso non riguarda soltanto porzioni di codice. Negli appunti il concetto viene esteso anche a:
- moduli software;
- parti di progetto;
- documentazione;
- test data;
- stime di tempi e costi.
I principali vantaggi sono:

- riduzione dei tempi di sviluppo;
- riduzione dei costi;
- maggiore affidabilità quando vengono riutilizzati componenti già convalidati.

Nella fase di progettazione il riuso può avvenire a diversi livelli:
- **moduli software**;
- **Application Framework**;
- **Design Pattern**;
- **architetture software**.

![[GPT PREMIUMS/17_agosto_appunti/assets/p087-fig-089.png|600]]

Con questi principi abbiamo definito **come deve essere strutturata una buona soluzione software a livello generale**.

Il passo successivo sarà entrare nella progettazione Object Oriented e nelle diverse **architetture software**, cioè vedere concretamente come organizzare le componenti individuate durante la progettazione preliminare.

## OOD - Object Oriented Design
la specifica descrive cosa deve fare il sistema mentre il progetto stabilisce come organizzarlo per realizzare quei requisiti
Questa fase prende il nome di OOD e riutilizza quanto costruito durante l'OOA aggiungendo i dettagli necessari per arrivare all'implementazione
L'OOD è quindi collegato direttamente all'OOA:

- **OOA** → modella il problema e descrive il sistema dal punto di vista dei requisiti
- **OOD** → trasforma e raffina quei modelli per definire la soluzione software

L'OOD è un processo **iterativo e incrementale** e viene diviso in due sottofasi principali:

- **Progettazione Preliminare**, detta anche *Architectural Design* o *System Design*:
  - definisce l'organizzazione complessiva del software;
  - individua le componenti principali;
  - stabilisce le relazioni tra esse;
  - sceglie quindi l'**architettura di sistema**;
- **Progettazione Dettagliata**, detta anche *Object Design*:
  - entra all'interno delle componenti individuate;
  - definisce classi, strutture dati, algoritmi e dettagli necessari all'implementazione.

quindi si ha **OOA → OOD preliminare → architettura del sistema → OOD dettagliata**

ci concentriamo principalmente sulla parte preliminare prima di definire nei dettagli ogni classe bisogna decidere come oranizzare l'intero sistema
### Architettura di sistema
L'**architettura di sistema** descrive:
- quali sono le componenti principali del software
- come sono organizzate
- quali relazioni esistono tra esse
- come collaborano durante l'esecuzione
 È una descrizione ad alto livello della struttura complessiva della soluzione
 
 Negli appunti viene mostrata un'evoluzione da architetture più **centralizzate** ad architetture sempre più **distribuite**
#### Architetture centralizzate
Le prime architetture presentate sono centralizzate perché il lavoro applicativo viene svolto su un unico nodo principale
##### Mainframe-based Architecture
Un mainframe è un elaboratore centrale molto potente che esegue le applicazioni e supporta più utenti
##### File Sharing Architecture
Nel modello **File Sharing** più PC sono collegati in rete e possono condividere file, ma l'esecuzione di una determinata applicazione rimane localizzata su un singolo nodo.
Il fatto che i dati possano essere condivisi in rete, quindi, **non rende automaticamente distribuita l'elaborazione**.

Finora l'elaborazione è rimasta concentrata. Per ottenere una vera architettura distribuita bisogna invece permettere a più nodi di partecipare all'esecuzione dello stesso sistema.
#### Architetture distribuite
Un **sistema software distribuito** suddivide l'elaborazione tra più nodi di esecuzione indipendenti collegati da una rete, che può essere locale o geografica.
Avere questa distribuzione deve risultare trasparente, usare una risorsa remota deve sembrare quasi come se sia locale
La distribuzione porta diversi vantaggi:
- **condivisione di dati e risorse** tra nodi
- **openness** → possibilità di integrare risorse e piattaforme eterogenee
- **concurrency** → più elementi possono essere eseguiti contemporaneamente
- **scalability** → è possibile aumentare le risorse aggiungendo nodi
- **load balancing** → il carico può essere distribuito tra più macchine
- **fault tolerance** → un nodo di backup può sostituire un nodo guasto
- **trasparenza** → l'utente non deve necessariamente conoscere la posizione reale delle risorse

La distribuzione introduce però anche difficoltà:
- qualità del servizio e prestazioni dipendono anche dalla rete
- l'interoperabilità tra piattaforme differenti è più complessa
- aumenta il problema della sicurezza perché dati e operazioni attraversano più nodi


Queste difficoltà fanno emergere una necessità:
Come posso permettere a processi eseguiti su macchine diverse a comunicare senza costringere ogni applicazione a gestire tutti i dettagli della rete?
con i middleware
##### Middleware
Il **middleware** è uno strato software che fornisce servizi di comunicazione e connettività alle applicazioni distribuite.
Si colloca concettualmente tra:

- applicazioni
- sistema operativo e infrastruttura di rete

nasconde parte della complessità della comunicazione remota
Per esempio, con una **RPC — Remote Procedure Call**, un processo può richiedere l'esecuzione di una procedura su un altro nodo. L'applicazione non deve gestire direttamente tutti i dettagli necessari per:
- inviare la richiesta;
- raggiungere il nodo remoto;
- eseguire l'operazione;
- ricevere il risultato.

Il middleware non è quindi una specifica architettura applicativa: è una **tecnologia di supporto** che rende praticabili molte architetture distribuite.

##### Architettura Client/Server
L'architettura **Client/Server** divide i processi in base al ruolo che svolgono durante l'interazione.

- **Client**:
  - interagisce con l'utente;
  - raccoglie una richiesta;
  - la invia a un server;
  - riceve e presenta la risposta;
- **Server**:
  - attende richieste provenienti dai client;
  - esegue il servizio richiesto;
  - restituisce il risultato;
  - può a sua volta rivolgersi ad altri server.

Un processo può anche svolgere entrambi i ruoli in interazioni differenti.

Per capire bene come distribuire le responsabilità tra client e server si divide l'applicazione in **tre layer logici**

Questa suddivisione riprende la logica BCE già vista nell'OOA:
- **Presentation Layer** → corrisponde alla Boundary:
  - gestisce la presentazione;
  - interagisce con l'utente;
- **Application Processing Layer** → corrisponde al Control:
  - contiene la logica applicativa;
  - coordina l'esecuzione delle operazioni;
- **Data Management Layer** → corrisponde alla Entity:
  - gestisce dati e accesso alle informazioni.
**su quali nodi devono essere collocati questi tre layer?**

***Two-Tier Architecture***
Una Two-Tier Architecture utilizza due livelli fisici principali: client e server
Esistono due configurazioni estreme della seguente architettura
**Thin Client**
- client → Presentation Layer;
- server → Application Processing + Data Management.
Il client è leggero, ma il server concentra una quantità maggiore di lavoro.

**Fat Client**
- client → Presentation + Application Processing;
- server → Data Management.
Il client svolge quindi una parte maggiore dell'elaborazione.

Thin e Fat Client sono estremi: esistono configurazioni intermedie in cui l'Application Processing viene diviso tra client e server

***3-Tier e N-Tier***
La Two-Tier separa client e server, ma può diventare poco flessibile quando la logica applicativa cresce
La **3-Tier Architecture** introduce quindi un livello intermedio specifico:
- client → Presentation
- application server → Application Processing
	- si comporta da client verso il server dati facendo da intermediario
- backend server → Data Management

La **N-Tier Architecture** estende ulteriormente questa idea introducendo altri livelli specializzati, per esempio server dedicati all'autenticazione

Queste architetture non sono basate a oggetti ognuno ha una responsabilità ma si può avere un singolo oggetto che può richiedere o offrire servizi da qui nasce una nuova architettura
##### Architettura a Oggetti Distribuiti
In questo paradigma, scompare la rigida distinzione tra client e server. Ogni oggetto distribuito può agire sia da client sia da server
La comunicazione remota è resa invisibile e trasparente grazie a un middleware basato sul concetto di **Software Bus** (spesso chiamato **Object Request Broker**). Questo bus si divide in:
- **Bus astratto**: Specifica l'interfaccia che fornisce i servizi di comunicazione e scambio dati.
- **Implementazione del bus**: È la realizzazione pratica del bus astratto per una specifica piattaforma hardware/software (garantendo la separazione tra interfaccia e implementazione).

L'architettura a oggetti distribuiti continua a ragionare soprattutto in termini di oggetti. Il passo successivo consiste nel rendere riutilizzabili unità software più grandi e più astratte: le **componenti**

##### Component-Based Architecture
L'approccio **Component Based** costruisce il software assemblando componenti preconfezionati che realizzano determinate funzionalità

Una **componente software** è un'unità astratta caratterizzata da una separazione netta tra:
- **interfaccia** → ciò che la componente offre
- **implementazione** → come realizza internamente il servizio

Il riuso è quindi di tipo **black box**: per utilizzare una componente non è necessario conoscerne l'implementazione interna; è sufficiente sapere quale interfaccia realizza

Le proprietà centrali sono:
- **incapsulamento** di strutture software
- **variabilità** → una componente può essere implementata o configurata in modi differenti
- **adattabilità** → componenti differenti possono essere assemblati tramite interfacce e scambio di messaggi

La differenza principale tra oggetti e componenti è che:
- un **oggetto** è un’entità concreta del modello OO, con **identità, stato e comportamento**;
- un **componente** è invece un’**unità software più astratta e riusabile**, usata come blocco di costruzione del sistema e utilizzata principalmente attraverso la sua **interfaccia**


Un **Component Framework** fornisce una base riutilizzabile per costruire applicazioni appartenenti a uno stesso dominio.

Può includere:
- una libreria di componenti
- una struttura architetturale generica
- requisiti comuni al dominio applicativo

1. si considerano i requisiti specifici della nuova applicazione;
2. si confrontano con quelli generici coperti dal framework;
3. si riusano i componenti già disponibili;
4. si implementano soltanto quelli mancanti;
5. i nuovi componenti possono arricchire il framework per utilizzi futuri.

![[GPT PREMIUMS/18_agosto_appunti/assets/p091-fig-090.png|500]]


Viene evidenziata anche un'evoluzione tra UML 1 e UML 2.

- in **UML 1** la componente era trattata soprattutto come un'entità fisica di implementazione
- in **UML 2** la componente esiste già a livello di progetto ed è descritta attraverso l'interfaccia che realizza

Una componente viene rappresentata come un elemento con stereotipo `<<component>>` che realizza una determinata interfaccia.

![[GPT PREMIUMS/18_agosto_appunti/assets/p091-fig-091.png|383]]

##### SOA - Service-Oriented Architecture

Una Service Oriented Architecture (SOA) è un'architettura distribuita composta da molteplici **servizi autonomi**. L'obiettivo di SOA è sviluppare applicazioni componendo servizi distribuiti, i quali possono essere eseguiti su piattaforme diverse e scritti in linguaggi di programmazione differenti.

Ogni servizio possiede una **descrizione** che specifica le informazioni necessarie per poterlo trovare e utilizzare.

I due ruoli principali ricordano Client/Server:
- **Service Provider** → mette a disposizione il servizio
- **Service Consumer / Requester** → cerca e utilizza il servizio

***Principi della SOA***

I servizi in SOA sono pensati per essere componenti autonomi e riutilizzabili. I principi fondamentali sono:
- **Loose coupling (Accoppiamento debole)**: Le dipendenze tra i servizi sono ridotte al minimo indispensabile.
- **Autonomy (Autonomia)**.
- **Abstraction (Astrazione)**.
- **Reusability (Riutilizzabilità)**.
- **Composability (Componibilità)**.
- **Statelessness (Assenza di stato)**: I servizi generalmente non mantengono memoria delle interazioni passate, rendendoli più scalabili.
- **Discoverability (Rintracciabilità)**: I servizi possono essere "scoperti" dinamicamente dai client.

L'ultimo principio crea però un problema pratico: **come può un consumer trovare un provider che non conosce già?**

Per risolverlo viene introdotta una terza entità: il **Service Broker**.

Il ***Service Broker*** è un intermediario tra provider e consumer.
La relazione generale diventa:
**Service Provider ↔ Broker ↔ Service Consumer**
Il broker mantiene un registro delle informazioni sui servizi disponibili.

Il provider deve comunicare al broker l'esistenza del servizio

Per gestire questa comunicazione intermediata, esistono diversi **Broker Patterns**:

***Service Registration Pattern***
1. il provider invia al broker le informazioni sul servizio;
2. comunica nome, descrizione e posizione/interfaccia di rete;
3. il broker registra il servizio;
4. il provider riceve conferma dell'avvenuta registrazione.

![[GPT PREMIUMS/18_agosto_appunti/assets/p093-fig-092.png|265]]

La registrazione rende concretamente possibile la **Discoverability**.

Una volta registrato il servizio, il consumer può utilizzarlo. Il broker può però partecipare all'interazione in modi differenti.

***Broker Forwarding e Broker Handle***
Questi due pattern rispondono allo stesso problema: il consumer conosce il servizio che vuole usare ma deve raggiungerlo.

*Broker Forwarding Pattern*
Nel **Broker Forwarding** il broker rimane coinvolto in ogni richiesta:

1. il consumer invia la richiesta al broker;
2. il broker individua il provider;
3. inoltra la richiesta al provider;
4. riceve la risposta;
5. la inoltra al consumer.

![[GPT PREMIUMS/18_agosto_appunti/assets/p094-fig-093.png|346]]


- migliore **Location Transparency**, perché eventuali cambiamenti della posizione del provider vengono gestiti dal broker ma ogni interazione passa attraverso il broker aumentando gli scambi

*Broker Handle Pattern*

Nel **Broker Handle** il broker interviene soltanto nella fase iniziale:

1. il consumer chiede al broker dove si trova il servizio;
2. il broker restituisce un riferimento, o **service handle**;
3. consumer e provider comunicano poi direttamente.

![[GPT PREMIUMS/18_agosto_appunti/assets/p094-fig-094.png|275]]

- se cambia la posizione del servizio, la Location Transparency è meno forte rispetto al Forwarding.


Finora il consumer conosceva **quale specifico servizio** voleva utilizzare. Può però verificarsi una situazione diversa: conosce soltanto **il tipo di servizio necessario**.

*Service Discovery Pattern*

Il **Service Discovery Pattern** viene paragonato alle *pagine gialle*.

1. il consumer chiede al broker una certa **tipologia di servizio**;
2. il broker cerca nel registro;
3. restituisce una lista dei servizi compatibili;
4. il consumer sceglie quale utilizzare;
5. da quel momento può proseguire con una delle modalità di interazione viste prima.

![[GPT PREMIUMS/18_agosto_appunti/assets/p095-fig-095.png|330]]

I provider e consumer possono essere realizzati con tecnologie diverse quindi serve uno standard di comunicazione per scambiare messaggi

*Web Services*

Un **Web Service** è un servizio accessibile attraverso protocolli standard Internet e descritto tramite standard che permettono l'interazione tra applicazioni differenti.

con il ***modello SOAP/WDSL***
la tecnologia dei Web Services viene collegata a tre problemi distinti:
- **come registrare e scoprire il servizio** → UDDI
- **come descrivere il servizio** → WSDL
- **come scambiare i messaggi** → SOAP

**XML — Extensible Markup Language** viene usato come formato strutturato per rappresentare dati e messaggi in modo indipendente dalla piattaforma.

**SOAP — Simple Object Access Protocol** è il protocollo usato per lo scambio di informazioni tra consumer e provider.
- Il messaggio SOAP è basato su XML e può essere trasportato attraverso protocolli Internet, tipicamente HTTP.
- viene descritto attraverso tre elementi
	- una **envelope** che definisce la struttura del messaggio
	- regole per codificare i dati scambiati
	- un modo per rappresentare richieste e risposte relative alle operazioni remote


**WSDL — Web Services Description Language** descrive il servizio e fornisce al consumer le informazioni necessarie per utilizzarlo
La descrizione specifica, in particolare:
- quali operazioni sono disponibili
- quali messaggi di input/output sono previsti
- dove si trova il servizio
- come deve essere invocato

WSDL svolge quindi un ruolo analogo all'interfaccia pubblica di una classe: descrive **come usare il servizio senza esporne l'implementazione interna**

![[GPT PREMIUMS/18_agosto_appunti/assets/p097-fig-099.png|347]]


**UDDI — Universal Description, Discovery and Integration** realizza il concetto di registro dei Web Services.

Permette quindi di:
- pubblicare un servizio
- registrare la sua descrizione
- ricercare servizi disponibili
- ottenere le informazioni necessarie per raggiungerli

Il flusso complessivo diventa:
1. il provider registra il servizio;
2. il broker/registry conserva le informazioni;
3. il consumer effettua una ricerca;
4. riceve il riferimento al documento WSDL;
5. legge come invocare il servizio;
6. invia la richiesta SOAP al provider;
7. riceve la risposta SOAP.

![[GPT PREMIUMS/18_agosto_appunti/assets/p096-fig-096.png|320]]

con il modello ***REST***

**REST — Representational State Transfer** viene presentato nel corso come uno **stile architetturale** per sistemi distribuiti basati sul Web.


REST mette al centro le **risorse**:

- una risorsa è un'entità identificabile messa a disposizione in rete;
- ogni risorsa è identificata tramite un URL/URI;
- il client interagisce con le risorse usando un'interfaccia uniforme basata su HTTP.

REST ha i seguenti principi

**REST** si basa su alcuni principi rigidi:
1. **Client-Server**: Stile di interazione "pull" (il client richiede, il server fornisce).
2. **Stateless (Senza stato)**: _Fondamentale_. Il server non memorizza alcun contesto (stato) del client tra una richiesta e l'altra. Ogni richiesta HTTP contiene tutte le informazioni necessarie per essere compresa dal server.
3. **Uniform Interface (Interfaccia Uniforme)**: Si usano esclusivamente i verbi standard del protocollo HTTP per eseguire le operazioni CRUD (Create, Read, Update, Delete).
4. **Named Resources (Risorse Nominate)**: Ogni risorsa è identificata univocamente da una URL/URI (es. `http://api.miosito.com/utenti/123`).
5. **Interconnected resource representations**: Le risorse sono collegate tramite link, permettendo al client di navigare da uno stato all'altro dell'applicazione (Hypermedia).

Negli appunti le **RESTful API** vengono collegate alle operazioni fondamentali:
- `GET` → leggere una risorsa o una collezione;
- `POST` → aggiungere un nuovo elemento a una collezione;
- `PUT` → aggiornare un elemento identificato;
- `DELETE` → eliminare un elemento identificato.
![[GPT PREMIUMS/18_agosto_appunti/assets/p098-fig-100.png|265]]

![[GPT PREMIUMS/18_agosto_appunti/assets/p098-fig-101.png|277]]

quando **una singola funzione logica richiede più operazioni o addirittura più servizi**: cosa succede se alcune operazioni riescono e altre falliscono?
##### Software Architectural Transaction Patterns
Una **transazione** è una richiesta che comprende due o più operazioni che, insieme, realizzano una singola funzione logica, non fanno pare solo della parte web services ma in generale delle architetture distribuite


Le proprietà principali vengono raccolte nell'acronimo **ACID**:

- **Atomicity**:
  - la transazione viene considerata indivisibile;
  - o viene completata interamente (*commit*) oppure viene annullata (*rollback*)
- **Consistency**:
  - al termine della transazione il sistema deve trovarsi in uno stato consistente
- **Isolation**:
  - una transazione non deve essere compromessa dalle altre transazioni eseguite contemporaneamente
- **Durability**:
  - dopo il commit, gli effetti della transazione devono rimanere permanenti anche in presenza di guasti successivi

Queste proprietà descrivono l'obiettivo generale. I pattern successivi mostrano invece **come organizzare transazioni con caratteristiche differenti**

***Two-Phase Commit Protocol (Protocollo a due fasi)***

Se devo trasferire 100€ dal _Servizio Banca A_ al _Servizio Banca B_, ho un problema: i due database sono su computer diversi. Come garantisco l'atomicità? Utilizzando il pattern **Two-Phase Commit**. C'è un intermediario chiamato _CommitCoordinator_.
- **Fase 1 (Prepare):** Il Coordinator chiede a Banca A (debito) e Banca B (credito) di prepararsi. Entrambe le banche _bloccano_ (Lock) le risorse necessarie (i due conti correnti), simulano l'operazione e rispondono "Sono pronto a committare" (Ready To Commit).
- **Fase 2 (Commit o Rollback):** Se _entrambe_ le banche hanno risposto di essere pronte, il Coordinator ordina il "Commit" definitivo. I dati vengono scritti e i database sbloccati (Unlock). Se anche una sola banca dice "Non posso farlo" o non risponde, il Coordinator ordina un "Rollback" generale e nulla viene modificato.

Le transazioni piatte (flat) tipo "tutto-o-niente" vanno bene per un bonifico, ma in scenari complessi servono pattern più evoluti:
***Compound Transaction Pattern***
Una **Compound Transaction** divide una transazione complessa in più sottotransazioni.

La differenza rispetto a una transazione completamente atomica è che può essere possibile conservare le sottotransazioni già concluse con successo e annullare soltanto quelle fallite.
- _Esempio:_ Un'agenzia di viaggi prenota per te il volo, l'hotel e l'auto a noleggio. Se l'auto a noleggio non è disponibile, non vuoi che il sistema ti cancelli automaticamente in blocco (rollback) anche il volo verso le Maldive! Il pattern permette "rollback parziali" e modifiche modulari.

![[CORSETTI/Immagini/Pasted image 20260424172132.png|322]]
***Long-Living Transaction Pattern***

Alcune transazioni non possono essere completate rapidamente perché includono un **human in the loop**, cioè una decisione umana durante l'esecuzione

Il problema è che, durante l'attesa:
- le risorse possono cambiare;
- altri utenti possono effettuare operazioni concorrenti;
- non è realistico mantenere indefinitamente una normale transazione atomica aperta.

Il **Long-Living Transaction Pattern** divide quindi il processo in più sottotransazioni separate da periodi di attesa

Prima di completare l'operazione può essere necessario effettuare un **recheck** delle condizioni precedentemente osservate

In altri casi il client può invece esprimere una richiesta **negoziabile** e accettare soluzioni alternative


***Negotiation Pattern***
Il **Negotiation Pattern**, chiamato anche **Agent-Based Negotiation**, introduce agenti software che agiscono per conto delle parti coinvolte.

- **Client Agent**:
  - agisce per conto del cliente
  - esprime richieste o proposte
- **Service Agent**:
  - agisce per conto del servizio
  - cerca soluzioni e formula offerte

Per costruire realmente un'applicazione SOA rimangono però due problemi di progettazione:

1. **quali operazioni deve esporre ogni servizio?**
2. **come devono essere coordinati più servizi durante l'esecuzione?**
##### Service Interface Design
Un servizio deve essere utilizzabile dall'esterno attraverso un'interfaccia ben definita.
L'obiettivo è mantenere separati:
- **interno del servizio**
- **contratto/interfaccia visibile ai consumer**

Il principio è quindi ancora quello dell'Information Hiding: il consumer deve conoscere **come usare il servizio**, non come è implementato internamente
##### Service Coordination
Un'applicazione SOA può utilizzare più servizi contemporaneamente. Non basta quindi progettare correttamente le singole interfacce: bisogna stabilire **chi controlla l'ordine e le interazioni tra i servizi**.

Gli appunti distinguono due forme principali di coordinamento.

***Orchestrazione***
Nell'**orchestrazione** esiste un elemento centralizzato, l'**orchestratore**, che controlla il flusso delle attività.
***Coreografia***
Nella **coreografia** non esiste un unico coordinatore centrale
- ogni servizio conosce le interazioni che deve effettuare
- i servizi collaborano direttamente
- il controllo è distribuito

## OOD - Object Oriented Design DETTAGLIATA 
Se l'OOD Preliminare definisce l'architettura generale (i server, i nodi, i framework), l'**OOD Dettagliato** è il momento in cui si progetta il codice. L'obiettivo è prendere i modelli dell'Analisi (OOA) – che descrivevano il _dominio del problema_ – e trasformarli in modelli del _dominio della soluzione_.
Se l'OOA era guidata dai Casi d'Uso (Use Cases), l'OOD Dettagliato è guidato dalle **Collaborazioni**. Un singolo caso d'uso viene ora realizzato da un insieme di classi che collaborano tra loro. Una collaborazione ha sempre due facce:
1. **Parte comportamentale (Dinamica):** Spiega _come_ gli elementi comunicano nel tempo. Si modella usando i _Communication Diagram_ o i _Sequence Diagram_.
2. **Parte strutturale (Statica):** Rappresenta la struttura vera e propria, aggiungendo dettagli implementativi al Class Diagram, trasformandolo spesso in un _Composite Structure Diagram_.

#### Legge di Demetra
Riprendiamo il concetto di BCE
Vediamo un problema classico di OOD: come gestiamo il controllo delle operazioni tra gli oggetti? Nelle slide viene fatto l'esempio dell'iscrizione di uno studente (`Student`) a un corso (`CourseOffering`) tramite una schermata (`EnrolmentWindow`). Bisogna prima controllare i prerequisiti del corso e poi verificare che lo studente li abbia soddisfatti.

Chi gestisce questa logica? Le slide mostrano 4 soluzioni, ognuna con un diverso livello di **Coupling** (accoppiamento):
1. **Soluzione 1 & 2:** Demandano il controllo alle classi entità (o il Corso o lo Studente guidano l'operazione). _Svantaggio:_ Sporcano le classi dati con logiche applicative.
2. **Soluzione 3 ("God" class):** L'oggetto della schermata (`EnrolmentWindow`) gestisce tutto. _Svantaggio:_ Crea un "oggetto Dio" onnisciente, legando fortemente l'interfaccia utente alla logica di business.
3. **Soluzione 4 (L'Approccio BCE - Boundary-Control-Entity):** Questa è la soluzione corretta. Si inserisce un oggetto intermedio, un controllore (es. `EnrolmentPolicy`). La schermata (Boundary) dice al Control cosa l'utente vuole fare. Il Control interroga il Corso (Entity) per i prerequisiti, poi interroga lo Studente (Entity) per il libretto, valuta la logica, e infine esegue l'iscrizione.


L'approccio BCE ci insegna che l'**Intra-layer coupling** (accoppiamento tra oggetti dello stesso strato) è accettabile, ma l'**Inter-layer coupling** (tra strati diversi) deve essere ridotto al minimo. Per scrivere codice poco accoppiato, usiamo la **Legge di Demetra (Law of Demeter)**.
un oggetto dovrebbe comunicare solo con i suoi vicini immediati e non "parlare agli estranei". Ciò significa che un oggetto dovrebbe limitare le sue dipendenze agli oggetti con cui ha una relazione diretta, come il proprio oggetto stesso, gli oggetti passati come argomenti al metodo, gli oggetti a cui fa riferimento tramite i suoi attributi, gli oggetti creati dal metodo o gli oggetti a cui fa riferimento tramite una variabile globale. La Legge di Demeter mira a migliorare la manutenibilità e la flessibilità del codice, riducendo la dipendenza tra le classi e favorendo una struttura più modulare e comprensibile.
### UML Structured Class
In UML avanzato, per nascondere i dettagli di implementazione, si usano le **Structured Classes** (Classi Strutturate) e i **Composite Structure Diagram** (Diagrammi di Struttura Composita).

Una **Structured Class** è una classe che contiene elementi interni, chiamati **roles** o **parts**, che partecipano alla realizzazione del suo comportamento.

L’idea è quella di considerare la classe come una **black box**:

- dall’esterno espone servizi tramite la propria interfaccia
- all’interno può essere composta da altre parti che collaborano per realizzare quei servizi
- i dettagli interni rimangono nascosti agli utilizzatori della classe

Gli elementi fondamentali usati nella struttura interna sono:

- **Part** → rappresenta una parte appartenente alla struttura della classe;
- **Role** → rappresenta il ruolo svolto da un elemento nella collaborazione;
- **Connector** → collega le parti o i ruoli e indica i percorsi attraverso cui possono comunicare;
- **Port** → rappresenta un punto di interazione tra la classe e ciò che si trova all’esterno.
Le interazioni avvengono tramite messaggi, mantenendo quindi una netta separazione tra l’interfaccia visibile e l’implementazione interna.
![[assets/p107-fig-111.png|383]]

#### Class Diagram e Composite Structure Diagram

A questo punto è importante distinguere due diagrammi che possono sembrare simili.

Il **Class Diagram** descrive principalmente le classi e le relazioni tra esse. Il **Composite Structure Diagram**, invece, entra **all’interno di una classe strutturata** e mostra le parti concrete che collaborano per realizzarne il comportamento.

![[assets/p108-fig-112.png|750]]

- con il Class Diagram ragioniamo sulle relazioni tra tipi e classi
- con il Composite Structure Diagram osserviamo la struttura interna di un particolare elemento di progettazione

**su quali risorse hardware e software verranno eseguiti questi elementi?**

Da questa necessità nasce il **Deployment Modeling**

La configurazione della piattaforma descrive come le funzionalità hardware e software vengono distribuite sui nodi su cui il sistema sarà eseguito.

Il passaggio viene affrontato in due momenti:
1. si rappresenta la piattaforma di esecuzione tramite il **Deployment Diagram**
2. si stabilisce come gli elementi software vengono allocati sui nodi della piattaforma
In questo modo la progettazione collega ciò che abbiamo modellato come software alla struttura fisica sulla quale quel software dovrà funzionare
#### Deployment Diagram
Il **Deployment Diagram** rappresenta la configurazione della piattaforma di esecuzione e le connessioni tra le risorse coinvolte

- **Artifacts (Artefatti):** Sono i file fisici veri e propri (es. `StudentApplication.exe`, file di configurazione, file HTML, tabelle del DB).
- **Manifestation (Manifestazione):** È la relazione che spiega come un elemento logico del modello (es. la classe `MainStudentForm`) si _manifesta_ fisicamente in un artefatto (es. il file sorgente `MainStudentForm.src`).
- **Node (Nodo):** È una risorsa computazionale a runtime. Si divide in:
    - _Processor:_ Ha capacità di calcolo ed esegue il software (es. un Server, un PC). Può contenere _Execution Environments_.
    - _Device:_ Una risorsa hardware spesso controllata da un processore (es. una stampante, un lettore di codici a barre).
- **Connector:** Nei diagrammi di deployment, i connettori non sono più riferimenti software, ma connessioni fisiche o protocolli di rete (es. cavo Ethernet, RS-232, HTTP su TCP/IP)
- **Deployment:** L'azione di mappare e assegnare un Artefatto su un Nodo specifico

![[p066-fig-030.png|171]]


Una volta definita la piattaforma, bisogna decidere **quali processi debbano essere eseguiti su quali nodi**. Questa attività prende il nome di **Process-to-Node Allocation**.

![[assets/p110-fig-115.png|424]]

**separare interfaccia e implementazione**.
Per ogni componente occorre quindi distinguere:
- **interfaccia** → quali servizi mette a disposizione o richiede;
- **implementazione** → come quei servizi vengono effettivamente realizzati.

UML rappresenta le interfacce fornite e richieste attraverso porte e apposite notazioni grafiche.

![[assets/p117-fig-126.png|550]]

Una **provided interface** descrive una funzionalità che il componente mette a disposizione degli altri; una **required interface** descrive invece una funzionalità di cui il componente ha bisogno.


Definire un’interfaccia significa specificare le operazioni accessibili dall’esterno e, per ciascuna operazione, i relativi parametri di input e output.


Finora abbiamo visto come rendere riutilizzabili **componenti concreti**. Ma durante la progettazione ricorrono anche problemi più astratti: modi di creare oggetti, organizzare strutture o distribuire responsabilità che compaiono in molti sistemi diversi.

Per evitare di reinventare ogni volta una soluzione già nota, vengono introdotti i **Design Pattern**.

## Design Pattern
Nella progettazione Object-Oriented non basta individuare classi e oggetti: bisogna anche stabilire come crearli, organizzarli e farli collaborare in modo corretto e riusabile. Poiché molti di questi problemi ricorrono in progetti diversi, vengono introdotti i Design Pattern come soluzioni progettuali riutilizzabili.
uno **schema di soluzione** che indica quali elementi utilizzare, quali responsabilità assegnare e come farli collaborare
Il valore del pattern nasce proprio dalla riusabilità del **design**:

- evita di affrontare da zero problemi già studiati
- fornisce soluzioni progettuali consolidate
- crea un linguaggio comune tra progettisti
- può rendere più semplice la manutenzione del software


Prima di studiare i singoli pattern bisogna capire **secondo quali criteri vengono organizzati**. La classificazione utilizzata considera due dimensioni indipendenti: **Purpose** e **Scope**

***Purpose***
Il **Purpose** descrive il tipo di problema progettuale affrontato dal pattern.
- **Creazionali**: i pattern di questo tipo sono relativi alle operazioni di creazione di oggetti.
- **Strutturali**: sono utilizzati per definire la struttura del sistema in termini della composizione di classi ed oggetti. Si basano sui concetti OO di ereditarietà e polimorfismo.
- **Comportamentali**: permettono di modellare il comportamento del sistema definendo le responsabilità delle sue componenti e definendo le modalità di interazione.
***Scope***
Lo **Scope** indica invece su quali elementi agisce principalmente il pattern

Si distinguono:
- **Class scope** → riguarda relazioni tra classi e sottoclassi; tali relazioni sono prevalentemente statiche e legate all’ereditarietà
- **Object scope** → riguarda relazioni tra oggetti, che possono essere configurate più dinamicamente durante l’esecuzione

Per poter confrontare pattern diversi viene usata una struttura descrittiva comune. Nel materiale vengono indicati i seguenti elementi:

- **Nome e classificazione** → identifica il pattern e la sua posizione rispetto a Purpose e Scope
- **Motivazione** → spiega quale problema ha portato alla nascita del pattern
- **Applicabilità** → chiarisce in quali situazioni ha senso utilizzarlo
- **Struttura** → mostra la configurazione astratta della soluzione
- **Partecipanti** → identifica classi e oggetti coinvolti e le loro responsabilità
- **Conseguenze** → descrive vantaggi, svantaggi e compromessi introdotti
- **Implementazione** → raccoglie indicazioni utili per realizzare concretamente il pattern
- **Codice di esempio** → mostra una possibile implementazione
- **Usi conosciuti** → riporta applicazioni reali del pattern
- **Pattern correlati** → collega il pattern ad altre soluzioni che possono essere alternative o complementari
###  Framework e Design Pattern

Prima di passare ai singoli pattern è utile distinguere i Design Pattern dai **Framework**
perché entrambi riguardano il riuso ma a livelli differenti.

Un **Framework** è un design riutilizzabile che costituisce lo scheletro di un sistema o di una sua parte. Non è quindi una semplice raccolta di funzioni: stabilisce una struttura entro cui lo sviluppatore costruisce la propria applicazione.
- un **Design Pattern** descrive una soluzione astratta a un problema progettuale ricorrente;
- un **Framework** fornisce una struttura riutilizzabile più ampia, composta da classi e relazioni concrete da specializzare;

- i Design Pattern possono essere utilizzati come **mattoni progettuali** nella costruzione di un framework.
#### Pattern creazionali
I pattern creazionali servono quando il problema non è semplicemente *creare un oggetto*, ma **evitare che il client dipenda troppo dalle classi concrete da istanziare**.

**Abstract Factory** e **Factory Method**
Entrambi separano la logica di creazione dal codice che usa gli oggetti, ma lo fanno a livelli differenti

L'**Abstract Factory** fornisce un'interfaccia per creare **famiglie di oggetti correlati** senza specificarne direttamente le classi concrete
Il problema tipico nasce quando un'applicazione deve funzionare con più famiglie compatibili di prodotti. Il client dovrebbe poter cambiare famiglia senza essere riscritto.

![[assets/p069-fig-032.png|536]]

I ruoli principali sono:

- **AbstractFactory** → dichiara le operazioni per creare i prodotti;
- **ConcreteFactory** → crea una specifica famiglia di prodotti concreti;
- **AbstractProduct** → definisce l'interfaccia comune di un tipo di prodotto;
- **ConcreteProduct** → implementa concretamente quel prodotto;
- **Client** → usa factory e prodotti attraverso le loro interfacce astratte.

Il vantaggio principale è che il client rimane indipendente dalle classi concrete. Cambiare un'intera famiglia di prodotti richiede principalmente di cambiare la factory utilizzata.
 **aggiungere un nuovo tipo di prodotto può richiedere modifiche all'interfaccia della factory e alle factory concrete**.

Il **Factory Method** affronta un problema simile, ma non crea una famiglia completa. Definisce invece un metodo per creare un prodotto e lascia alle **sottoclassi** la scelta della classe concreta da istanziare.

![[assets/p069-fig-033.png|650]]

I ruoli principali sono:
- **Product** → interfaccia comune degli oggetti prodotti;
- **ConcreteProduct** → implementazione concreta;
- **Creator** → dichiara il Factory Method;
- **ConcreteCreator** → ridefinisce il Factory Method e decide quale ConcreteProduct creare.
È utile quando una classe conosce il tipo generale di oggetto di cui ha bisogno, ma **non può o non vuole fissarne in anticipo la classe concreta**.

#### Pattern strutturali
Una volta creati gli oggetti, bisogna decidere **come farli collaborare e comporre senza introdurre dipendenze inutili**. I pattern strutturali affrontano proprio questo livello del progetto.

L'**Adapter** permette di riutilizzare una classe esistente quando la sua interfaccia è incompatibile con quella richiesta dal client.
Il problema è quindi di compatibilità, non di funzionalità: la classe esistente svolge già il lavoro necessario, ma il client non sa utilizzarla nel formato in cui si presenta.

![[assets/p070-fig-034.png|650]]

I partecipanti sono:
- **Client** → usa l'interfaccia attesa;
- **Target** → interfaccia richiesta dal client;
- **Adaptee** → classe esistente da riutilizzare;
- **Adapter** → traduce le richieste del Target nell'interfaccia dell'Adaptee.
L'Adapter introduce quindi un **ponte tra due interfacce incompatibili**, evitando di modificare direttamente la classe già esistente.

Il **Composite** serve quando bisogna rappresentare una struttura gerarchica composta da elementi semplici e gruppi di elementi, ma il client dovrebbe poterli trattare **allo stesso modo**.

![[assets/p071-fig-035.png|469]]

I ruoli fondamentali sono:

- **Component** → interfaccia comune;
- **Leaf** → elemento semplice senza figli;
- **Composite** → elemento composto che contiene altri Component;
- **Client** → opera sull'interfaccia Component senza dover distinguere continuamente Leaf e Composite.
L'idea centrale è quindi:
> **oggetti singoli e composizioni di oggetti condividono la stessa interfaccia.**


Questo permette di costruire strutture ad albero e di manipolarle in maniera uniforme.

Il **Decorator** permette di aggiungere dinamicamente nuove responsabilità a un oggetto **senza modificarne la classe di base** e senza creare una grande gerarchia di sottoclassi.
![[assets/p071-fig-036.png|452]]

I ruoli principali sono:
- **Component** → interfaccia comune;
- **ConcreteComponent** → oggetto base da estendere;
- **Decorator** → mantiene un riferimento a un Component e ne condivide l'interfaccia;
- **ConcreteDecorator** → aggiunge una specifica responsabilità.

Il decoratore *avvolge* l'oggetto originale: dall'esterno continua a essere visto come un Component, ma il suo comportamento può essere arricchito.

#### Pattern comportamentali
I pattern comportamentali entrano in gioco quando la struttura degli oggetti è già definita, ma bisogna organizzare **come si distribuisce il comportamento e come gli oggetti comunicano tra loro**.

L'**Observer** definisce una dipendenza **uno-a-molti** tra oggetti: quando cambia lo stato di un oggetto, gli altri oggetti interessati vengono notificati automaticamente.

![[assets/p072-fig-037.jpeg|360]]

I ruoli principali sono:
- **Subject** → mantiene l'elenco degli observer e fornisce operazioni per registrarli o rimuoverli
- **ConcreteSubject** → contiene lo stato osservato
- **Observer** → definisce l'interfaccia di aggiornamento
- **ConcreteObserver** → reagisce alle notifiche del Subject

La sequenza logica è:
1. un Observer si registra presso il Subject
2. lo stato del Subject cambia
3. il Subject notifica gli Observer registrati
4. ogni Observer aggiorna il proprio stato o comportamento


Il **Template Method** definisce nella superclasse la **struttura generale di un algoritmo**, lasciando alle sottoclassi l'implementazione di alcuni passaggi.

![[assets/p073-fig-038.png|600]]

Il pattern separa quindi:
- una parte **invariante** dell'algoritmo, definita una volta nella classe astratta;
- alcuni passi **variabili**, che vengono ridefiniti nelle sottoclassi.

I ruoli principali sono:
- **AbstractClass** → contiene il Template Method e dichiara le operazioni che possono essere ridefinite;
- **ConcreteClass** → implementa i passi specifici.
Il vantaggio è evitare di duplicare la struttura generale dell'algoritmo in più classi.

Lo **Strategy** serve quando esistono più algoritmi alternativi per svolgere la stessa operazione e vogliamo poterli sostituire senza modificare il client.
![[assets/p074-fig-039.png|434]]

I ruoli principali sono:
- **Strategy** → interfaccia comune degli algoritmi;
- **ConcreteStrategy** → implementazioni alternative;
- **Client** → utilizza una Strategy senza dipendere direttamente dai dettagli dell'algoritmo scelto.

L'idea è quindi **incapsulare ogni algoritmo in un oggetto separato** e renderli intercambiabili.

## Metriche Software
Le **metriche software** servono proprio a trasformare alcune caratteristiche del progetto o del codice in valori misurabili. In questa parte del corso l'attenzione è sulle **metriche di struttura**.

Le misure vengono distinte in due grandi categorie:

- **intermodulari** → misurano relazioni e dipendenze **tra moduli**
- **intramodulari** → misurano caratteristiche **interne al singolo modulo**

### Structure Chart

L'architettura dei moduli può essere rappresentata mediante una **Structure Chart**, cioè un grafo:
$$S = \{N,R\}$$
- `N` è l'insieme dei nodi, ciascuno corrispondente a un modulo;
- `R` è l'insieme delle relazioni tra i moduli, per esempio chiamate o flussi di dati.

Gli attributi principali considerati sono:

- **coesione** → quanto un modulo svolge un compito ben definito;
- **coupling** → quanto i moduli dipendono gli uni dagli altri;
- **morfologia** → forma complessiva dell'architettura;
- **Information Flow** → quantità e direzione delle informazioni scambiate tra moduli.

#### MORFOLOGIA
La **morfologia** descrive la forma complessiva della Structure Chart.
Viene osservata attraverso:
- **Size** → numero di nodi e archi
- **Depth** → distanza massima dalla radice ai livelli più profondi
- **Width** → massimo numero di nodi presenti allo stesso livello
- **Edge-to-Node Ratio** → rapporto tra archi e nodi, utile per valutare quanto il grafo sia densamente connesso

In generale una struttura molto interconnessa è più difficile da comprendere e modificare. Per questo viene introdotta una misura più specifica: la **Tree Impurity**
##### Tree Impurity
La **Tree Impurity** misura quanto la Structure Chart si discosta dalla forma di un albero

Un albero rappresenta una struttura relativamente semplice: tra i moduli esistono pochi collegamenti e non compaiono molte dipendenze incrociate.

Il valore `m(G)` varia tra `0` e `1`:

- `m(G) = 0` → il grafo è un albero;
- valori crescenti → il grafo si allontana dalla struttura ad albero
- valori elevati → maggiore presenza di collegamenti aggiuntivi e quindi maggiore complessità strutturale
##### Internal Reuse
L'**Internal Reuse** misura il riuso dei moduli **all'interno dello stesso prodotto software**.
$$r(G) = e - n + 1$$

- `e` = numero di archi;
- `n` = numero di nodi.
Il punto da ricordare non è soltanto la formula: un modulo riutilizzato internamente crea più relazioni nell'architettura e quindi aumenta anche l'interdipendenza tra le parti
- non considera quante volte una stessa relazione viene effettivamente utilizzata;
- non considera la dimensione dei moduli coinvolti.
#### Information Flow
La morfologia osserva **la forma delle connessioni**. Non dice ancora quanto un modulo sia effettivamente coinvolto nello scambio di informazioni

L'**Information Flow** completa quindi l'analisi misurando il flusso di informazioni tra un modulo e il resto del sistema

I due concetti fondamentali sono:

- **fan-in** → quantità di flussi che arrivano al modulo
- **fan-out** → quantità di flussi che partono dal modulo

- fan-in elevato → molti elementi del sistema dipendono da informazioni che arrivano al modulo o che esso fornisce;
- fan-out elevato → il modulo interagisce o influenza molti altri elementi;
- entrambi elevati → il modulo occupa una posizione molto centrale e può diventare un punto critico dell'architettura.

![[assets/p078-fig-040.jpeg|299]]

$$IF(M_i) = [fan\text{-}in(M_i) \times fan\text{-}out(M_i)]^2$$
Un valore alto segnala un modulo fortemente connesso all'ambiente circostante e quindi potenzialmente più complesso da comprendere, modificare e testare

#### FlowGraph

Finora abbiamo osservato soprattutto l'architettura e le dipendenze tra moduli. Per misurare la complessità **interna** di un modulo dobbiamo invece rappresentare il suo flusso di controllo.

Da questa necessità nasce il **Flowgraph**.

Il **Flowgraph**, o grafo di flusso, rappresenta il flusso di controllo di un programma mediante un grafo diretto:
$$FG = \{N,E\}$$

- i **nodi** rappresentano blocchi o istruzioni del programma;
- gli **archi** rappresentano i possibili passaggi del controllo da un nodo all'altro.


- sequenze;
- selezioni;
- iterazioni;
- chiamate a procedure o funzioni;
- ricorsione;
- concorrenza.

![[assets/p079-fig-041.png|600]]

##### Complessità ciclomatica

La **Cyclomatic Complexity di McCabe** misura la complessità del flusso di controllo di un programma attraverso il suo flowgraph.
- `e` archi;
- `n` nodi;

la formula è:

Può essere calcolata in due modi:
1. **Basata sul Flowgraph (Grafo)**: Data la formula $v(F) = e - n + 2$.
    - $e$ = numero di archi (edges)
    - $n$ = numero di nodi (nodes)
2. **Basata sul Codice (Logica Rapida)**: Esiste una scorciatoia utilissima: $v(F) = 1 + d$
    - $d$ = numero di **nodi predicato** (i punti di decisione come `if`, `while`, `for`)


La complessità ciclomatica rappresenta il **numero di percorsi linearmente indipendenti** del flowgraph.
- valore basso → pochi percorsi alternativi;
- valore alto → più decisioni e percorsi;
- più percorsi → maggiore difficoltà di comprensione, manutenzione e testing.


La complessità ciclomatica fornisce una misura quantitativa utile, ma non esaurisce il concetto di complessità software:

- è particolarmente adatta al livello del singolo componente;
- programmi con lo stesso valore possono richiedere effort molto diverso;
- per calcolarla bisogna conoscere abbastanza bene il design dettagliato o il codice.
## Qualità del software, SQA e Testing
Con le metriche abbiamo visto **come misurare alcune proprietà della struttura del software**. Questo, però, non basta ancora a dire se il prodotto è complessivamente di buona qualità.
 tre blocchi:
- **Quality Model** → definisce quali aspetti concorrono alla qualità
- **Software Quality Assurance (SQA)** → controlla sistematicamente che processo e prodotto rispettino standard e procedure
- **Verification, Validation e Testing** → controllano concretamente gli artefatti e il comportamento del software
### Qualità del software
La **qualità del software** è il grado con cui il software possiede una combinazione di attributi desiderabili


Non esiste quindi una proprietà unica chiamata “qualità”: il giudizio dipende da quali caratteristiche stiamo osservando.
quattro punti di vista:
- **trascendentale** → qualità come eccellenza intrinseca del prodotto
- **utente** → quanto il software permette all'utente di raggiungere i propri obiettivi
- **prodotto** → qualità delle caratteristiche del software, come correttezza e affidabilità
- **organizzazione** → benefici per l'organizzazione, ad esempio costi, profitti ed efficacia

Per l'Ingegneria del Software interessa soprattutto trasformare caratteristiche che potrebbero sembrare soggettive in **valutazioni quanto più possibile oggettive e misurabili**

#### Quality Model di McCall
Il modello di **McCall** considera la qualità come combinazione di più fattori e li mette in relazione con le attività svolte sul prodotto durante il suo ciclo di vita.
Il **Quality Triangle** distingue tre famiglie di attività:

- **Operation** → uso effettivo del prodotto
- **Revision** → modifica e manutenzione del prodotto
- **Transition** → adattamento o trasferimento del prodotto verso nuovi contesti e utilizzi

![[assets/p146-fig-167.png|330]]

Il punto del triangolo non è soltanto classificare le attività. Serve a mostrare che **la qualità continua a essere rilevante dopo il rilascio**


McCall associa alle tre famiglie di attività **12 indici di qualità**

##### Operation
Descrivono la qualità mentre il prodotto viene utilizzato:
- **Correttezza** → grado con cui il prodotto soddisfa specifiche e obiettivi dell'utente
- **Affidabilità** → grado con cui esegue le funzioni con la precisione richiesta
- **Efficienza** → quantità di risorse di calcolo necessarie
- **Integrità** → protezione da accessi esterni indesiderati
- **Usabilità** → impegno richiesto all'utente per utilizzare il prodotto
##### Revision
Descrivono quanto facilmente il prodotto può essere controllato e modificato:
- **Manutenibilità** → impegno richiesto per individuare e correggere difetti
- **Testabilità** → impegno necessario per verificare il comportamento del prodotto
- **Flessibilità** → impegno richiesto per modificarlo
##### Transition
Descrivono la capacità del software di adattarsi a nuovi utilizzi:
- **Portabilità** → impegno necessario per trasferirlo in un altro ambiente operativo
- **Riusabilità** → possibilità di riutilizzare il prodotto o sue parti
- **Interoperabilità** → capacità di interagire con altri prodotti
- **Evolubilità** → effort richiesto per adeguarlo a nuovi requisiti


Si riportano dieci ***attributi*** utilizzabili per costruire gli indici:

- **Complessità** → livello di comprensibilità del software;
- **Accuratezza** → precisione dei risultati
- **Completezza** → grado con cui le funzionalità richieste sono state implementate
- **Consistenza** → uniformità degli approcci di progettazione adottati
- **Error Tolerance** → capacità di continuare a funzionare in presenza di malfunzionamenti
- **Tracciabilità** → possibilità di mettere in relazione prodotti diversi dello sviluppo, ad esempio requisito e codice
- **Espandibilità** → possibilità di estendere storage e funzionalità
- **Generalità** → ampiezza dei possibili contesti di utilizzo
- **Modularità** → indipendenza tra moduli
- **Auto-documentation** → capacità del software di supportare l'utente attraverso informazioni e help

Un attributo può contribuire a più indici e può avere un impatto:

- **positivo** → un valore maggiore migliora l'indice
- **negativo** → un valore maggiore lo peggiora

![[assets/p148-fig-168.png|486]]

Gli attributi non sono sempre misurabili direttamente con una formula. Per rendere più sistematica la valutazione viene introdotto il **Checklist Method**.

Una checklist contiene una serie di domande relative a un attributo. Alle risposte vengono associati valori che permettono di ottenere un punteggio complessivo.

Le domande possono anche essere indicate come:

- **Non Applicabili** → non devono contribuire al calcolo
- **Non Valutabili** → non è possibile valutarle con le informazioni disponibili

La valutazione non viene affidata a una sola persona ma vi è un **Checklist Evaluation Team** composto da persone con ruoli e competenze differenti.

Ogni membro esamina inizialmente il materiale in modo indipendente. Successivamente, attraverso **Walkthrough** o **Inspection**, il team confronta le risposte e cerca di arrivare a una valutazione condivisa.

![[assets/p152-fig-177.png|396]]

l progetto ha bisogno di qualcosa di più generale: un'attività che controlli in modo continuativo **come il software viene prodotto e se vengono rispettate le regole definite dall'organizzazione**.

Da qui nasce la Software Quality Assurance
### Software Quality Assurance — SQA
La **Software Quality Assurance (SQA)** è un approccio pianificato e sistematico per assicurare che **processo software e prodotto software** siano conformi agli standard, ai processi e alle procedure stabilite.

Il suo obiettivo non è “scrivere il software al posto degli sviluppatori”, ma **controllare che il lavoro venga svolto correttamente e che eventuali deviazioni vengano individuate in tempo**.

Il team SQA controlla, tra le altre cose, che:

- venga adottata una metodologia di sviluppo appropriata
- vengano seguiti standard e procedure
- siano effettuate review adeguate
- sia prodotta documentazione utile alla manutenzione
- sia garantita la tracciabilità dei prodotti
- venga svolto il testing previsto
- deviazioni e problemi vengano segnalati al management

La SQA richiede personale, tempo ed effort e quindi ha un costo. Per essere introdotta efficacemente deve essere sostenuta dal management attraverso un **SQA Plan**, nel quale vengono stabiliti gli standard e le attività di controllo da applicare.

In SQA si distinguono
- **standard** → definiscono **che cosa** dovrebbe essere fatto o rispettato;
- **procedure** → descrivono **come** svolgere concretamente determinate attività.
### Verification, Validation e Testing.
Finora abbiamo visto come definire e assicurare la qualità a livello generale. Per verificare concretamente gli artefatti prodotti durante lo sviluppo servono le attività di **Verification & Validation (V&V)**.

- **Verification** e **Validation** descrivono **che cosa vogliamo controllare**
- **Inspection** e **Testing** sono strumenti con cui possiamo effettuare questi controlli

La **Verification** controlla se il prodotto viene costruito correttamente rispetto agli artefatti e alle specifiche di riferimento

La **Validation** controlla se il prodotto costruito soddisfa realmente le esigenze dell'utente

Le **Software Inspections** sono controlli statici: si analizzano artefatti senza eseguire il software

Il **Software Testing** è invece dinamico: si esegue il software o un suo componente e se ne osserva il comportamento

Il documento che pianifica le attività di testing è il **Test Plan**


Il testing non ha sempre lo stesso obiettivo. Gli appunti distinguono soprattutto tre forme.

#### Validation Testing
Il **Validation Testing** cerca di dimostrare che il software soddisfa i requisiti dell'utente.
È particolarmente naturale nelle fasi finali, quando esiste una versione eseguibile del prodotto da confrontare con i requisiti e con i criteri di accettazione.

Un validation test ha successo quando il sistema **si comporta come previsto**.
#### Defect Testing
Il **Defect Testing** ha l'obiettivo opposto: cerca di scoprire difetti latenti.

Qui un test ha successo quando **fa emergere un comportamento errato**, perché ha permesso di individuare un problema che dovrà essere corretto.

Il Defect Testing viene applicato prima ai singoli elementi e poi alle loro interazioni.

si divide in due testing

Il **Component Testing** riguarda unità e moduli considerati separatamente.

È normalmente svolto dallo sviluppatore del componente e serve a verificare che l'unità funzioni correttamente in isolamento.

L'**Integration Testing** verifica gruppi di componenti collegati tra loro fino ad arrivare a sottosistemi e sistema completo.

Lo **User Testing**, invece, non appartiene al Defect Testing: serve a verificare dal punto di vista dell'utente che il sistema faccia ciò che è atteso e rientra quindi nella logica della validazione.

#### Statistical Testing

Lo **Statistical Testing** cerca di riprodurre statisticamente il modo in cui il software verrà utilizzato nella realtà.

È particolarmente utile per valutare requisiti di **affidabilità**, perché non è realistico osservare il software per anni per sapere direttamente quanto spesso fallirà.

Si costruisce quindi un **Operational Profile**, cioè una rappresentazione della frequenza con cui i diversi tipi di utenti producono determinati input. I risultati dei test vengono poi usati per stimare l'affidabilità.
**costoso**


#### Politiche di Testing

Un testing esaustivo richiederebbe di provare tutte le combinazioni di input, condizioni e percorsi possibili. Per software non banali questo è impraticabile.

Di conseguenza il problema reale diventa:

> **come scegliere un insieme limitato di test che abbia comunque una buona probabilità di trovare difetti?**


- **Test Case** → specifica l'input da fornire e l'output atteso se il sistema si comporta correttamente
- **Test Data** → dati concreti utilizzati per esercitare il software e cercare di far emergere difetti

##### Black Box Testing
Nel **Black Box Testing**, o **Functional Testing**, il tester considera il software come una scatola nera:
- conosce la specifica;
- fornisce input;
- osserva gli output;
I Test Case derivano quindi principalmente dalla **specifica del sistema**

Dato che non possiamo provare tutti gli input, l'**Equivalence Partitioning** divide gli input e gli output in **classi di equivalenza**.

Una classe raccoglie valori per i quali ci si aspetta un comportamento simile del programma.

Le **Testing Guidelines** applicano lo stesso principio a strutture come liste e array, suggerendo di provare casi significativi come:

- sequenza vuota;
- sequenza con un solo elemento;
- sequenze di dimensioni differenti;
- accesso al primo, all'ultimo e a un elemento intermedio
##### White Box testing

Il Black Box parte dalla specifica ma non ci dice quanto codice interno sia stato realmente esercitato.

Per osservare anche questo aspetto serve il **White Box Testing**, chiamato anche **Structural Testing**.

Qui il tester conosce la struttura interna del programma e costruisce i Test Case a partire dal **codice**.

L'obiettivo non è necessariamente percorrere ogni combinazione possibile, ma ottenere una determinata **Testing Coverage**, cioè la percentuale di istruzioni o parti della struttura che vengono effettivamente attraversate dai test.

##### Path Testing e complessità ciclomatica

Lo **Structural Testing** porta naturalmente al problema dei percorsi di esecuzione.

Il **Path Testing** usa il flowgraph del programma per individuare percorsi significativi e progettare Test Case che li attraversino.

Il testing di tutti i percorsi possibili è generalmente impraticabile, soprattutto in presenza di cicli. Si cercano quindi **percorsi indipendenti**, cioè percorsi che introducono almeno un nuovo arco rispetto a quelli già considerati.

Qui si ricollega la **complessità ciclomatica** studiata con le metriche:

> il numero di percorsi linearmente indipendenti del flowgraph corrisponde alla complessità ciclomatica.

Quindi la complessità ciclomatica non serve soltanto a descrivere la complessità strutturale del codice: può anche indicare **quanti percorsi indipendenti devono essere considerati per costruire un insieme di test di base**.

![[assets/p157-fig-178.png|469]]


#### Integration Testing

Quando i singoli componenti sono stati testati, bisogna controllare che funzionino correttamente **quando vengono combinati**.

L'Integration Testing può essere organizzato in modo incrementale secondo due strategie principali.
##### Top-down
Si parte dalle componenti di livello più alto e si integrano progressivamente quelle inferiori.

Se una componente di basso livello non è ancora disponibile viene sostituita da uno **stub**, cioè un elemento semplificato che ne imita l'interfaccia e parte del comportamento.
##### Bottom-up
Si parte dalle componenti di livello più basso e le si integra progressivamente fino a costruire il sistema completo.

Per esercitare componenti che non hanno ancora i moduli superiori che le chiameranno si usano **test driver**, cioè programmi che simulano il chiamante.

##### Interface Testing

L'Integration Testing controlla le relazioni tra componenti. Una parte particolarmente delicata è la loro **interfaccia**.

- passaggio di **parametri**;
- accesso a **memoria condivisa**;
- **interfaccia procedurale**;
- scambio di **messaggi**.

Il punto da ricordare è che l'Interface Testing non entra necessariamente nella struttura interna del componente: verifica soprattutto che **il contratto di comunicazione tra componenti venga utilizzato correttamente**.

#### Stress Testing
Lo **Stress Testing** incrementa progressivamente il carico sul sistema fino a quando le prestazioni diventano inaccettabili.
#### Object Oriented Testing
Nei sistemi Object Oriented l'unità fondamentale non è una semplice funzione isolata, ma una **classe** che incapsula stato e operazioni e i cui oggetti interagiscono tramite messaggi.

Per questo il testing procede per livelli:

1. **metodi** individuali;
2. **oggetto/classe** nel suo complesso;
3. **cluster di oggetti** che collaborano;
4. **sistema Object Oriented** completo.

L'**ereditarietà** complica il testing perché un comportamento ereditato può dover essere verificato anche nelle sottoclassi che lo utilizzano o lo specializzano.
#### Cluster Testing
Quando si passa dall'oggetto singolo alle interazioni tra oggetti si parla di **Cluster Testing**.
tre approcci:

- **Use-case / Scenario Testing** → deriva i test dalle interazioni descritte dai casi d'uso;
- **Thread Testing** → verifica la risposta del sistema a una specifica sequenza di eventi;
- **Object Interaction Testing** → controlla una sequenza di messaggi scambiati tra oggetti.

## BPM e BPMN
Con il testing termina il blocco dedicato alla qualità del prodotto software. Le ultime pagine degli appunti introducono invece un tema più ampio: la rappresentazione dei **processi aziendali**.

Un **Business Process (BP)** è un insieme di attività logicamente correlate e coordinate per raggiungere un obiettivo aziendale e produrre un risultato di valore per un cliente del processo.

Quando un processo aziendale viene automatizzato, in tutto o in parte, da un sistema software si parla di **Workflow**.
Le organizzazioni devono quindi poter:

- identificare i propri processi;
- rappresentarli;
- analizzarli;
- migliorarli;
- monitorarne l'esecuzione.

Questa è la logica del **Business Process Management (BPM)**.


**BPMN — Business Process Model and Notation** è una notazione standard per rappresentare graficamente i processi aziendali.

I suoi elementi di base sono:

- **Start Event** → punto di inizio;
- **End Event** → punto di conclusione;
- **Task** → attività atomica;
- **Sequence Flow** → ordine delle attività;
- **Gateway** → controlla diramazioni e ricongiungimenti del flusso.

I gateway principali sono:

- **Exclusive Gateway (XOR)** → viene scelto un solo percorso alternativo;
- **Parallel Gateway (AND)** → più percorsi vengono eseguiti in parallelo;
- **Inclusive Gateway (OR)** → possono essere attivati uno o più percorsi in funzione delle condizioni.

Per rappresentare chi svolge le attività si usano:

- **Pool** → partecipanti o organizzazioni indipendenti;
- **Lane** → ruoli o unità organizzative interne a uno stesso partecipante.

I **Message Flow** rappresentano invece i messaggi scambiati tra partecipanti distinti.

BPMN distingue inoltre:

- **Orchestrazione** → processo interno controllato da una singola organizzazione;
- **Collaborazione** → interazione tra più partecipanti tramite messaggi;
- **Coreografia** → descrizione delle interazioni tra partecipanti senza porre un unico processo centrale al comando.