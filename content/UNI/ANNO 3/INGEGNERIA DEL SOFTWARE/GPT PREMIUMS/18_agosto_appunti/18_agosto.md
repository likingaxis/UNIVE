# Object-Oriented Design e architetture software

Nel giorno precedente abbiamo introdotto la **progettazione software** come passaggio dal dominio del problema al dominio della soluzione: la specifica descrive **cosa** deve fare il sistema, mentre il progetto stabilisce **come** organizzarlo per realizzare quei requisiti.

Nel caso di un approccio Object Oriented, questa fase prende il nome di **OOD — Object-Oriented Design** e riutilizza quanto costruito durante l'OOA, aggiungendo progressivamente i dettagli necessari per arrivare all'implementazione.

L'OOD è quindi collegato direttamente all'OOA:

- **OOA** → modella il problema e descrive il sistema dal punto di vista dei requisiti;
- **OOD** → trasforma e raffina quei modelli per definire la soluzione software.

L'OOD è un processo **iterativo e incrementale** e viene diviso in due sottofasi principali:

- **Progettazione Preliminare**, detta anche *Architectural Design* o *System Design*:
  - definisce l'organizzazione complessiva del software;
  - individua le componenti principali;
  - stabilisce le relazioni tra esse;
  - sceglie quindi l'**architettura di sistema**;
- **Progettazione Dettagliata**, detta anche *Object Design*:
  - entra all'interno delle componenti individuate;
  - definisce classi, strutture dati, algoritmi e dettagli necessari all'implementazione.

La progressione è quindi:

**OOA → OOD preliminare → architettura del sistema → OOD dettagliata**

In questa giornata ci concentriamo soprattutto sulla parte preliminare: prima di definire nei dettagli ogni classe, bisogna decidere **come organizzare l'intero sistema**.

# Architettura di sistema

L'**architettura di sistema** descrive:

- quali sono le componenti principali del software;
- come sono organizzate;
- quali relazioni esistono tra esse;
- come collaborano durante l'esecuzione.

Non coincide quindi con la progettazione dettagliata di una singola classe o di un singolo modulo. È una descrizione ad alto livello della struttura complessiva della soluzione.

Negli appunti viene mostrata un'evoluzione da architetture più **centralizzate** ad architetture sempre più **distribuite**.

Prima di vedere i singoli modelli bisogna quindi chiarire la distinzione:

- **architettura centralizzata** → l'esecuzione del software è concentrata principalmente su un singolo nodo;
- **architettura distribuita** → l'esecuzione viene suddivisa tra più nodi collegati tramite una rete.

Questa distinzione riguarda **dove viene eseguita l'elaborazione**, non semplicemente il fatto che più computer siano fisicamente collegati.

## Architetture centralizzate

Le prime architetture presentate sono centralizzate perché il lavoro applicativo viene svolto su un unico nodo principale.

### Mainframe-based Architecture

Un **mainframe** è un elaboratore centrale molto potente che esegue le applicazioni e supporta più utenti.

- i terminali collegati vengono usati principalmente per input/output;
- i terminali non eseguono autonomamente la logica applicativa;
- l'elaborazione rimane concentrata sul mainframe.

Gli appunti ricordano che questo modello continua a essere utilizzato in alcuni domini critici, come quello bancario.

### File Sharing Architecture

Nel modello **File Sharing** più PC sono collegati in rete e possono condividere file, ma l'esecuzione di una determinata applicazione rimane localizzata su un singolo nodo.

Il fatto che i dati possano essere condivisi in rete, quindi, **non rende automaticamente distribuita l'elaborazione**.

Finora l'elaborazione è rimasta concentrata. Per ottenere una vera architettura distribuita bisogna invece permettere a più nodi di partecipare all'esecuzione dello stesso sistema.

# Architetture distribuite

Un **sistema software distribuito** suddivide l'elaborazione tra più nodi di esecuzione indipendenti collegati da una rete, che può essere locale o geografica.

Per l'utente questa distribuzione dovrebbe essere il più possibile **trasparente**: usare una risorsa remota dovrebbe apparire simile all'uso di una risorsa locale.

La distribuzione porta diversi vantaggi:

- **condivisione di dati e risorse** tra nodi;
- **openness** → possibilità di integrare risorse e piattaforme eterogenee;
- **concurrency** → più elementi possono essere eseguiti contemporaneamente;
- **scalability** → è possibile aumentare le risorse aggiungendo nodi;
- **load balancing** → il carico può essere distribuito tra più macchine;
- **fault tolerance** → un nodo di backup può sostituire un nodo guasto;
- **trasparenza** → l'utente non deve necessariamente conoscere la posizione reale delle risorse.

La distribuzione introduce però anche difficoltà:

- qualità del servizio e prestazioni dipendono anche dalla rete;
- l'interoperabilità tra piattaforme differenti è più complessa;
- aumenta il problema della sicurezza perché dati e operazioni attraversano più nodi.

Queste difficoltà fanno emergere una nuova necessità: **come permettere a processi eseguiti su macchine diverse di comunicare senza costringere ogni applicazione a gestire direttamente tutti i dettagli della rete?**

Da questa necessità nasce il ruolo del **middleware**.

# Middleware

Il **middleware** è uno strato software che fornisce servizi di comunicazione e connettività alle applicazioni distribuite.

Si colloca concettualmente tra:

- applicazioni;
- sistema operativo e infrastruttura di rete.

Il suo compito è nascondere parte della complessità della comunicazione remota.

Per esempio, con una **RPC — Remote Procedure Call**, un processo può richiedere l'esecuzione di una procedura su un altro nodo. L'applicazione non deve gestire direttamente tutti i dettagli necessari per:

- inviare la richiesta;
- raggiungere il nodo remoto;
- eseguire l'operazione;
- ricevere il risultato.

Gli appunti citano, tra gli esempi di middleware:

- RPC;
- MOM;
- ORB.

Il middleware non è quindi una specifica architettura applicativa: è una **tecnologia di supporto** che rende praticabili molte architetture distribuite.

Una volta chiarito come i nodi possono comunicare, possiamo vedere come distribuire concretamente i ruoli dell'applicazione. Il primo modello fondamentale è il **Client/Server**.

# Architettura Client/Server

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

Il client non deve quindi conoscere tutta la logica interna necessaria per produrre il risultato: il server **nasconde la complessità del servizio**, contribuendo alla trasparenza del sistema distribuito.

## Application Layers

Per capire come distribuire le responsabilità tra client e server, gli appunti dividono l'applicazione in tre **layer logici**.

Questa suddivisione riprende la logica BCE già vista nell'OOA:

- **Presentation Layer** → corrisponde alla Boundary:
  - gestisce la presentazione;
  - interagisce con l'utente;
- **Application Processing Layer** → corrisponde al Control:
  - contiene la logica applicativa;
  - coordina l'esecuzione delle operazioni;
- **Data Management Layer** → corrisponde alla Entity:
  - gestisce dati e accesso alle informazioni.

La domanda architetturale diventa quindi: **su quali nodi devono essere collocati questi tre layer?**

## Two-Tier Architecture

Una **Two-Tier Architecture** utilizza due livelli fisici principali: client e server.

Esistono due configurazioni estreme.

### Thin Client

Nel modello **Thin Client**:

- client → Presentation Layer;
- server → Application Processing + Data Management.

Il client è leggero, ma il server concentra una quantità maggiore di lavoro.

### Fat Client

Nel modello **Fat Client**:

- client → Presentation + Application Processing;
- server → Data Management.

Il client svolge quindi una parte maggiore dell'elaborazione.

Thin e Fat Client sono estremi: esistono configurazioni intermedie in cui l'Application Processing viene diviso tra client e server.

## Three-Tier e N-Tier

La Two-Tier separa client e server, ma può diventare poco flessibile quando la logica applicativa cresce.

La **Three-Tier Architecture** introduce quindi un livello intermedio specifico:

- client → Presentation;
- application server → Application Processing;
- backend server → Data Management.

Il server intermedio:

- riceve richieste dal client;
- esegue la logica applicativa;
- si comporta a sua volta come client verso il server dei dati.

La **N-Tier Architecture** estende ulteriormente questa idea introducendo altri livelli specializzati, per esempio server dedicati all'autenticazione.

Il Client/Server distribuisce quindi le responsabilità in base a ruoli applicativi. Con il paradigma Object Oriented, però, si può spingere oltre questa idea: **anche il singolo oggetto può richiedere o offrire servizi**.

Da qui nasce l'architettura a oggetti distribuiti.

# Architettura a Oggetti Distribuiti

In un sistema Object Oriented distribuito:

- un oggetto svolge il ruolo di **client** quando invoca un metodo;
- un oggetto svolge il ruolo di **server** quando esegue il metodo richiesto.

L'obiettivo è rendere l'invocazione di un metodo remoto il più possibile simile all'invocazione di un metodo locale.

Per farlo viene utilizzato un middleware specifico chiamato **ORB — Object Request Broker**.

L'ORB agisce come intermediario:

**oggetto richiedente → ORB → oggetto che offre il metodo**

Viene per questo descritto anche come una sorta di **software bus**.

Anche qui ritorna il principio di Information Hiding:

- viene definita un'interfaccia astratta dei servizi forniti dal bus;
- l'implementazione concreta rimane separata.

Gli appunti citano **CORBA** come standard pubblicato dall'OMG per specificare l'interfaccia dei servizi di un ORB.

Il problema emerso era l'interoperabilità tra implementazioni ORB differenti. Una versione successiva di CORBA introdusse quindi **IIOP**, protocollo usato per permettere l'interazione tra ORB eterogenei.

L'architettura a oggetti distribuiti continua a ragionare soprattutto in termini di oggetti. Il passo successivo consiste nel rendere riutilizzabili unità software più grandi e più astratte: le **componenti**.

# Component-Based Architecture

L'approccio **Component Based** costruisce il software assemblando componenti preconfezionati che realizzano determinate funzionalità.

Una **componente software** è un'unità astratta caratterizzata da una separazione netta tra:

- **interfaccia** → ciò che la componente offre;
- **implementazione** → come realizza internamente il servizio.

Il riuso è quindi di tipo **black box**: per utilizzare una componente non è necessario conoscerne l'implementazione interna; è sufficiente sapere quale interfaccia realizza.

Le proprietà centrali sono:

- **incapsulamento** di strutture software;
- **variabilità** → una componente può essere implementata o configurata in modi differenti;
- **adattabilità** → componenti differenti possono essere assemblati tramite interfacce e scambio di messaggi.

## Oggetto e componente: relazione e differenze

Oggetti e componenti non sono sinonimi. Entrambi nascondono dettagli interni, ma operano a granularità diversa.

- **Oggetto**:
  - possiede identità, stato e comportamento;
  - ha una granularità più specifica;
  - incapsula servizi;
- **Componente**:
  - è un'unità software usata per costruire sistemi;
  - può avere granularità molto variabile, dal singolo oggetto fino a una parte molto ampia dell'applicazione;
  - viene usata principalmente attraverso la propria interfaccia.

## Component Framework

Un **Component Framework** fornisce una base riutilizzabile per costruire applicazioni appartenenti a uno stesso dominio.

Può includere:

- una libreria di componenti;
- una struttura architetturale generica;
- requisiti comuni al dominio applicativo.

Il flusso è:

1. si considerano i requisiti specifici della nuova applicazione;
2. si confrontano con quelli generici coperti dal framework;
3. si riusano i componenti già disponibili;
4. si implementano soltanto quelli mancanti;
5. i nuovi componenti possono arricchire il framework per utilizzi futuri.

![[assets/p091-fig-090.png|500]]

## Componenti in UML

Negli appunti viene evidenziata anche un'evoluzione tra UML 1 e UML 2.

- in **UML 1** la componente era trattata soprattutto come un'entità fisica di implementazione;
- in **UML 2** la componente esiste già a livello di progetto ed è descritta attraverso l'interfaccia che realizza.

Una componente viene rappresentata come un elemento con stereotipo `<<component>>` che realizza una determinata interfaccia.

![[assets/p091-fig-091.png|500]]

Il passaggio da componenti a SOA nasce da una nuova esigenza: **non solo riusare componenti all'interno di un sistema, ma rendere funzionalità autonome disponibili in rete, anche su piattaforme differenti e potenzialmente fornite da organizzazioni differenti**.

# Service-Oriented Architecture — SOA

Una **SOA — Service-Oriented Architecture** è un'architettura software distribuita composta da **servizi autonomi**.

I servizi possono:

- essere eseguiti su nodi differenti;
- essere implementati con tecnologie e linguaggi differenti;
- essere forniti da provider differenti;
- essere individuati e utilizzati da più consumer.

Ogni servizio possiede una **descrizione** che specifica le informazioni necessarie per poterlo trovare e utilizzare.

I due ruoli principali ricordano Client/Server:

- **Service Provider** → mette a disposizione il servizio;
- **Service Consumer / Requester** → cerca e utilizza il servizio.

La differenza importante è che in SOA provider e consumer devono rimanere **debolmente accoppiati**: il consumer non dovrebbe dipendere dai dettagli interni o dalla collocazione concreta del provider.

## Principi della SOA

Prima di introdurre broker e Web Services conviene chiarire quali proprietà cerca di ottenere la SOA.

- **Loose Coupling** → ridurre le dipendenze tra servizi;
- **Service Contract** → provider e consumer interagiscono secondo una descrizione condivisa del servizio;
- **Autonomy** → il servizio deve essere il più possibile indipendente dagli altri;
- **Abstraction** → il consumer deve conoscere solo le informazioni necessarie all'utilizzo;
- **Reusability** → lo stesso servizio può essere usato in più applicazioni;
- **Composability** → più servizi possono essere combinati per costruire funzionalità più complesse;
- **Statelessness** → ridurre la dipendenza da stato mantenuto tra interazioni successive;
- **Discoverability** → un servizio deve poter essere trovato e identificato da chi ne ha bisogno.

L'ultimo principio crea però un problema pratico: **come può un consumer trovare un provider che non conosce già?**

Per risolverlo viene introdotta una terza entità: il **Service Broker**.

# Broker e scoperta dei servizi

Il **Service Broker** è un intermediario tra provider e consumer.

La relazione generale diventa:

**Service Provider ↔ Broker ↔ Service Consumer**

Il broker mantiene un registro delle informazioni sui servizi disponibili.

Perché ciò sia possibile, prima il provider deve comunicare al broker l'esistenza del proprio servizio. Solo dopo il consumer potrà trovarlo.

Questa progressione genera diversi **Broker Patterns**, ciascuno con uno scopo specifico.

## Service Registration Pattern

Il **Service Registration Pattern** è il passaggio iniziale.

1. il provider invia al broker le informazioni sul servizio;
2. comunica nome, descrizione e posizione/interfaccia di rete;
3. il broker registra il servizio;
4. il provider riceve conferma dell'avvenuta registrazione.

![[assets/p093-fig-092.png|400]]

La registrazione rende concretamente possibile la **Discoverability**.

Una volta registrato il servizio, il consumer può utilizzarlo. Il broker può però partecipare all'interazione in modi differenti.

## Broker Forwarding e Broker Handle

Questi due pattern rispondono allo stesso problema: il consumer conosce il servizio che vuole usare ma deve raggiungerlo.

### Broker Forwarding Pattern

Nel **Broker Forwarding** il broker rimane coinvolto in ogni richiesta:

1. il consumer invia la richiesta al broker;
2. il broker individua il provider;
3. inoltra la richiesta al provider;
4. riceve la risposta;
5. la inoltra al consumer.

![[assets/p094-fig-093.png|500]]

Vantaggio principale:

- migliore **Location Transparency**, perché eventuali cambiamenti della posizione del provider vengono gestiti dal broker.

Svantaggio:

- ogni interazione passa attraverso il broker;
- aumenta il numero di messaggi.

### Broker Handle Pattern

Nel **Broker Handle** il broker interviene soltanto nella fase iniziale:

1. il consumer chiede al broker dove si trova il servizio;
2. il broker restituisce un riferimento, o **service handle**;
3. consumer e provider comunicano poi direttamente.

![[assets/p094-fig-094.png|500]]

Vantaggio:

- meno messaggi;
- maggiore efficienza nella comunicazione successiva.

Limite:

- se cambia la posizione del servizio, la Location Transparency è meno forte rispetto al Forwarding.

Finora il consumer conosceva **quale specifico servizio** voleva utilizzare. Può però verificarsi una situazione diversa: conosce soltanto **il tipo di servizio necessario**.

Da questa esigenza nasce il Service Discovery Pattern.

## Service Discovery Pattern

Il **Service Discovery Pattern** viene paragonato alle *pagine gialle*.

1. il consumer chiede al broker una certa **tipologia di servizio**;
2. il broker cerca nel registro;
3. restituisce una lista dei servizi compatibili;
4. il consumer sceglie quale utilizzare;
5. da quel momento può proseguire con una delle modalità di interazione viste prima.

![[assets/p095-fig-095.png|500]]

La scelta tra più servizi equivalenti può basarsi anche su caratteristiche ulteriori, per esempio la **QoS — Quality of Service**.

Il broker risolve quindi il problema logico della scoperta. Resta però un altro problema: **provider e consumer possono essere realizzati con tecnologie differenti; serve quindi un insieme di standard comuni per descrivere il servizio e scambiare messaggi**.

Qui entrano in gioco i **Web Services**.

# Web Services: UDDI, WSDL e SOAP

Un **Web Service** è un servizio accessibile attraverso protocolli standard Internet e descritto tramite standard che permettono l'interazione tra applicazioni differenti.

Nel materiale del corso la tecnologia dei Web Services viene collegata a tre problemi distinti:

- **come registrare e scoprire il servizio** → UDDI;
- **come descrivere il servizio** → WSDL;
- **come scambiare i messaggi** → SOAP.

Questa relazione va tenuta chiara: UDDI, WSDL e SOAP non sono tre sinonimi, ma svolgono ruoli diversi nella stessa infrastruttura.

## XML come formato comune

**XML — Extensible Markup Language** viene usato come formato strutturato per rappresentare dati e messaggi in modo indipendente dalla piattaforma.

Nel modello presentato negli appunti, XML costituisce quindi la base comune su cui si appoggiano diversi standard dei Web Services.

## SOAP

**SOAP — Simple Object Access Protocol** è il protocollo usato per lo scambio di informazioni tra consumer e provider.

Il messaggio SOAP è basato su XML e può essere trasportato attraverso protocolli Internet, tipicamente HTTP.

Negli appunti SOAP viene descritto attraverso tre elementi:

- una **envelope** che definisce la struttura del messaggio;
- regole per codificare i dati scambiati;
- un modo per rappresentare richieste e risposte relative alle operazioni remote.

SOAP risponde quindi alla domanda: **come invio concretamente una richiesta o una risposta a un Web Service?**

## WSDL

**WSDL — Web Services Description Language** descrive il servizio e fornisce al consumer le informazioni necessarie per utilizzarlo.

La descrizione specifica, in particolare:

- quali operazioni sono disponibili;
- quali messaggi di input/output sono previsti;
- dove si trova il servizio;
- come deve essere invocato.

WSDL svolge quindi un ruolo analogo all'interfaccia pubblica di una classe: descrive **come usare il servizio senza esporne l'implementazione interna**.

![[assets/p097-fig-099.png|500]]

## UDDI

**UDDI — Universal Description, Discovery and Integration** realizza il concetto di registro dei Web Services.

Permette quindi di:

- pubblicare un servizio;
- registrare la sua descrizione;
- ricercare servizi disponibili;
- ottenere le informazioni necessarie per raggiungerli.

Il flusso complessivo diventa:

1. il provider registra il servizio;
2. il broker/registry conserva le informazioni;
3. il consumer effettua una ricerca;
4. riceve il riferimento al documento WSDL;
5. legge come invocare il servizio;
6. invia la richiesta SOAP al provider;
7. riceve la risposta SOAP.

![[assets/p096-fig-096.png|500]]

Finora abbiamo visto un approccio orientato a **servizi e messaggi**. REST propone una prospettiva differente: organizzare l'interazione di rete attorno alle **risorse**.

# REST

**REST — Representational State Transfer** viene presentato nel corso come uno **stile architetturale** per sistemi distribuiti basati sul Web.

La differenza fondamentale rispetto al modello SOAP/WSDL non è semplicemente il formato dei messaggi.

REST mette al centro le **risorse**:

- una risorsa è un'entità identificabile messa a disposizione in rete;
- ogni risorsa è identificata tramite un URL/URI;
- il client interagisce con le risorse usando un'interfaccia uniforme basata su HTTP.

Esempi di risorse citati negli appunti:

- pagina HTML;
- documento XML;
- servizio Web;
- altra entità esposta sulla piattaforma Web.

## Principi principali di REST

- **Client/Server** → il client richiede e il server mette a disposizione le risorse;
- **Stateless** → il server non conserva il contesto del client tra richieste successive;
- **Cache** → alcune risposte possono essere memorizzate per migliorare l'efficienza;
- **Uniform Interface** → le risorse vengono manipolate attraverso operazioni HTTP standard;
- **Resource Identification** → ogni risorsa è identificata da un URL/URI;
- **rappresentazioni collegate** → le rappresentazioni delle risorse possono rimandare ad altre risorse tramite URL.

## RESTful API e operazioni HTTP

Negli appunti le RESTful API vengono collegate alle operazioni fondamentali:

- `GET` → leggere una risorsa o una collezione;
- `POST` → aggiungere un nuovo elemento a una collezione;
- `PUT` → aggiornare un elemento identificato;
- `DELETE` → eliminare un elemento identificato.

![[assets/p098-fig-100.png|400]]

![[assets/p098-fig-101.png|500]]

A questo punto sappiamo come i servizi possono essere trovati e invocati. Rimane però un problema quando **una singola funzione logica richiede più operazioni o addirittura più servizi**: cosa succede se alcune operazioni riescono e altre falliscono?

Da questa necessità nasce il tema delle **transazioni**.

# Software Architectural Transaction Patterns

Una **transazione** è una richiesta che comprende due o più operazioni che, insieme, realizzano una singola funzione logica.

L'idea di base è che tali operazioni debbano essere gestite come una singola unità coerente.

## Proprietà ACID

Le proprietà principali vengono raccolte nell'acronimo **ACID**:

- **Atomicity**:
  - la transazione viene considerata indivisibile;
  - o viene completata interamente (*commit*) oppure viene annullata (*rollback*);
- **Consistency**:
  - al termine della transazione il sistema deve trovarsi in uno stato consistente;
- **Isolation**:
  - una transazione non deve essere compromessa dalle altre transazioni eseguite contemporaneamente;
- **Durability**:
  - dopo il commit, gli effetti della transazione devono rimanere permanenti anche in presenza di guasti successivi.

Queste proprietà descrivono l'obiettivo generale. I pattern successivi mostrano invece **come organizzare transazioni con caratteristiche differenti**.

## Two-Phase Commit

Quando una singola transazione coinvolge più servizi, bisogna coordinarli affinché tutti confermino oppure tutti annullino l'operazione.

Il **Two-Phase Commit Protocol** introduce quindi un coordinatore centrale.

### Fase 1 — Prepare

1. il coordinatore invia ai servizi la richiesta di prepararsi al commit;
2. i servizi bloccano le risorse necessarie;
3. eseguono le operazioni previste;
4. se sono pronti, inviano `readyToCommit`;
5. se anche un solo partecipante non è pronto, la transazione viene abortita.

![[assets/p099-fig-102.png|500]]

### Fase 2 — Commit

Se tutti i servizi sono pronti:

1. il coordinatore invia `commit`;
2. ciascun servizio conferma definitivamente le modifiche;
3. vengono liberati i lock;
4. la transazione termina.

![[assets/p100-fig-103.png|500]]

Questo pattern è adatto quando vogliamo preservare una forte atomicità globale. Non tutte le operazioni complesse, però, devono essere trattate come un blocco unico.

## Compound Transaction Pattern

Una **Compound Transaction** divide una transazione complessa in più sottotransazioni.

La differenza rispetto a una transazione completamente atomica è che può essere possibile conservare le sottotransazioni già concluse con successo e annullare soltanto quelle fallite.

Quindi:

- transazione piatta → fallimento di una parte può richiedere rollback dell'intera transazione;
- compound transaction → la struttura in sottotransazioni permette maggiore flessibilità e rollback parziali.

![[assets/p101-fig-104.png|500]]

Il pattern è utile quando le parti della funzione complessiva sono sufficientemente indipendenti da poter essere gestite separatamente.

## Long-Living Transaction Pattern

Alcune transazioni non possono essere completate rapidamente perché includono un **human in the loop**, cioè una decisione umana durante l'esecuzione.

Il problema è che, durante l'attesa:

- le risorse possono cambiare;
- altri utenti possono effettuare operazioni concorrenti;
- non è realistico mantenere indefinitamente una normale transazione atomica aperta.

Il **Long-Living Transaction Pattern** divide quindi il processo in più sottotransazioni separate da periodi di attesa.

Prima di completare l'operazione può essere necessario effettuare un **recheck** delle condizioni precedentemente osservate.

![[assets/p102-fig-105.png|500]]

Finora le richieste erano determinate in modo abbastanza preciso. In altri casi il client può invece esprimere una richiesta **negoziabile** e accettare soluzioni alternative.

Da qui nasce il Negotiation Pattern.

# Negotiation Pattern

Il **Negotiation Pattern**, chiamato anche **Agent-Based Negotiation**, introduce agenti software che agiscono per conto delle parti coinvolte.

I ruoli sono:

- **Client Agent**:
  - agisce per conto del cliente;
  - esprime richieste o proposte;
- **Service Agent**:
  - agisce per conto del servizio;
  - cerca soluzioni e formula offerte.

La distinzione fondamentale è tra:

- **proposta** → negoziabile;
- **richiesta** → non negoziabile e più vincolante.

Il Client Agent può:

- proporre un servizio;
- richiedere formalmente un servizio;
- rifiutare un'offerta.

Il Service Agent può:

- formulare un'offerta;
- rifiutare una proposta o richiesta;
- accettarla.

![[assets/p103-fig-106.png|650]]

I Transaction Pattern hanno mostrato come coordinare operazioni che coinvolgono più servizi. Per costruire realmente un'applicazione SOA rimangono però due problemi di progettazione:

1. **quali operazioni deve esporre ogni servizio?**
2. **come devono essere coordinati più servizi durante l'esecuzione?**

Questi due problemi portano rispettivamente a **Service Interface Design** e **Service Coordination**.

# Service Interface Design

Un servizio deve essere utilizzabile dall'esterno attraverso un'interfaccia ben definita.

La progettazione dell'interfaccia segue una logica simile a quella già vista per le classi:

1. si considera la struttura del servizio;
2. si modellano le interazioni dinamiche tra client e servizio;
3. si osservano i messaggi inviati al servizio;
4. da questi messaggi si ricavano:
   - nome delle operazioni;
   - parametri di input;
   - parametri di output.

L'obiettivo è mantenere separati:

- **interno del servizio**;
- **contratto/interfaccia visibile ai consumer**.

Il principio è quindi ancora quello dell'Information Hiding: il consumer deve conoscere **come usare il servizio**, non come è implementato internamente.

# Service Coordination

Un'applicazione SOA può utilizzare più servizi contemporaneamente. Non basta quindi progettare correttamente le singole interfacce: bisogna stabilire **chi controlla l'ordine e le interazioni tra i servizi**.

Gli appunti distinguono due forme principali di coordinamento.

## Orchestrazione

Nell'**orchestrazione** esiste un elemento centralizzato, l'**orchestratore**, che controlla il flusso delle attività.

- stabilisce quali servizi devono essere invocati;
- definisce la sequenza;
- coordina le interazioni.

È concettualmente simile alla presenza del coordinatore nel Two-Phase Commit: il controllo è concentrato in un punto.

## Coreografia

Nella **coreografia** non esiste un unico coordinatore centrale.

- ogni servizio conosce le interazioni che deve effettuare;
- i servizi collaborano direttamente;
- il controllo è distribuito.

Quindi la relazione fondamentale è:

- **Orchestrazione** → coordinamento centralizzato;
- **Coreografia** → coordinamento distribuito.

Nelle SOA reali i due approcci possono essere combinati, e gli stessi pattern di transazione possono essere usati come meccanismi di coordinamento.

Con questo abbiamo completato il passaggio dalla scelta dell'architettura complessiva alla definizione di **come componenti e servizi comunicano, vengono scoperti e vengono coordinati**.

Il passo successivo sarà tornare alla seconda sottofase dell'OOD, la **Progettazione Dettagliata**, per raffinare le collaborazioni tra oggetti e tradurre l'architettura in strutture progettuali più concrete.
