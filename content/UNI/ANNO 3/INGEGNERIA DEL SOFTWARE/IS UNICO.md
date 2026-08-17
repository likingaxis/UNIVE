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

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p006-fig-005.png|315]]

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

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p003-fig-001.png|371]]

Nel grafico hardware si riconoscono tre zone concettuali:

- una fase iniziale con frequenza di guasto elevata, detta spesso **mortalità infantile**;
- una fase relativamente stabile;
- una fase finale in cui l'usura fa aumentare i guasti.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p003-fig-002.png|520]]

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

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p005-fig-003.png|480]]

Il problema è che nel Build & Fix le modifiche non sono inserite in una struttura progettuale controllata comportando un prodotto difficile da comprendere e mantenere
### Modello Waterfall
Di tipo sequenziale e funziona a cascata dove ogni fase consegue la successiva
molto più disciplinato di Build & Fix poiché obbliga la documentazione capire il problema progettare e verificare i vari output delle fasi


![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p005-fig-004.png|520]]

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

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p007-fig-006.png|520]]


Cosa si intende per prototipo?
è una realizzazione rapida e semplificata di alcune parti del prodotto, costruita principalmente per comprendere meglio ciò che l'utente desidera
Il prototipo permette di svolgere due attività fondamentali:
- **Requirements Elicitation**: far emergere requisiti che l'utente non aveva espresso chiaramente;
- **Requirements Validation**: verificare che ciò che abbiamo capito corrisponda davvero alle esigenze dell'utente.
Per realizzare un singolo prototipo si seguono i seguenti step

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p007-fig-007.png|520]]

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

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p008-fig-008.png|520]]

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
![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p008-fig-009.png|520]]
#### Modello incrementale con Overall Architecture
- versione più conservativa
- si realizza una progettazione architetturale complessiva del prodotto
- l'architettura software descrive le principali componenti del sistema e le relazioni tra esse
dopo aver definito questa struttura si procede con varie build incrementali sulle singole componenti

così già sappiamo dei dettagli importanti sulle componenti riducendo problemi di integrazione tra esse
![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p009-fig-010.png|520]]
#### Incrementale senza Overall Architecture
- in questa variante invece si parte direttamente dai requisiti con maggiore priorità
ogni build viene sviluppata quasi come un progetto indipendente
il vantaggio è maggiore velocità iniziale ma poi si rischia una maggior complessità ad ogni build successiva soprattutto per integrazione delle componenti software

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p010-fig-011.png|650]]

###### Problema del modello incrementale
Suddividere il prodotto in molti incrementi ha effetti opposti sui costi
- con più build una modifica interessa una porzione più piccola del prodotto
- ma prevede integrazioni da dover fare

possiamo vedere nel grafico sotto due tendenze:
- costo delle build/modifiche che diminuisce aumentando il numero di incrementi
- costo di integrazione che aumenta quando ci sono build numerose
la loro somma genera una regione di ***costo minimo***
![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p010-fig-012.png|520]]
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

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p011-fig-013.png|520]]

>[!info]- è possibile modificare il sistema Waterfall aggiungendo una parte di Risk analysis
>
>
>![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p012-fig-014.png|500]]


#### Modello a spirale di Boehm
![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p013-fig-015.png|650]]

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
![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p016-fig-021.png|313]]

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
![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p019-fig-023.png|500]]
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
![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/14_agosto_appunti/assets/p022-fig-025.png|520]]
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

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/15_agosto_appunti/assets/p030-fig-031.png|650]]

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

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/15_agosto_appunti/assets/p033-fig-033.png|650]]


- token
	- marcatore inserito all'interno di un place indica che nella situazione corrente la condizione o risorsa rappresentata da quel place è disponibile nella quantità indicata
- marcatura 
	- la distribuzione dei token nei vari place in un certo istante
	- una transition si dice abilitata se la marcatura corrente soddisfa le condizioni necessarie perchè possa essere eseguita
- firing
	- è l'esecuzione effettiva di una transition abilitata

**transition enabled → firing → modifica dei token → nuova marcatura → nuovo stato rappresentato**

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/15_agosto_appunti/assets/p034-fig-034.png|650]]

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

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/15_agosto_appunti/assets/p036-fig-036.png|650]]

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
![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/15_agosto_appunti/assets/p038-fig-038.png|300]]
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
![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE GOLD/GPT PREMIUMS/15_agosto_appunti/assets/p038-fig-039.png|224]]
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
