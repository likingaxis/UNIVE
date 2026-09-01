# Progettazione dettagliata OOD, Deployment e introduzione ai Design Pattern

Nel blocco precedente abbiamo visto la progettazione a un livello ancora abbastanza ampio: architetture distribuite, componenti, servizi e meccanismi con cui questi elementi comunicano. Questa visione stabilisce **quali parti principali compongono il sistema e come sono organizzate**, ma non descrive ancora con sufficiente precisione come ciascuna parte dovrà essere realizzata.

È qui che entra in gioco la **progettazione dettagliata Object Oriented (Detailed OOD)**. Il suo obiettivo è raffinare ciò che era stato individuato durante l’OOA e nella progettazione preliminare, fino a ottenere elementi abbastanza precisi da guidare l’implementazione.

Il passaggio logico è quindi:

**OOA → individua gli oggetti e le responsabilità del dominio**  
**progettazione preliminare → organizza il sistema in componenti e architetture**  
**progettazione dettagliata OOD → specifica come collaborano e come sono strutturati internamente gli elementi da implementare**

# Progettazione dettagliata OOD

Nell’OOA avevamo già individuato classi, casi d’uso e interazioni. Nel Detailed OOD questi elementi vengono raffinati concentrandosi soprattutto sulla **collaborazione tra oggetti necessaria per realizzare i servizi del sistema**.

Una collaborazione può essere osservata da due punti di vista complementari:

- **comportamentale** → descrive come gli oggetti collaborano durante l’esecuzione, quindi quali messaggi si scambiano e in quale ordine;
- **strutturale** → descrive quali elementi partecipano alla collaborazione e come sono collegati tra loro.

Per questo motivo la progettazione dettagliata non sostituisce i diagrammi già studiati: li utilizza a un livello di dettaglio maggiore e li integra con nuovi costrutti di UML 2.

## Distribuire correttamente le responsabilità

Quando si definisce una collaborazione non basta che il comportamento finale sia corretto. È importante anche stabilire **quale oggetto debba assumersi ciascuna responsabilità**.

Nel modello BCE le responsabilità sono separate tra:

- **Boundary** → gestiscono l’interazione con l’esterno e inoltrano le richieste;
- **Control** → contengono la logica di controllo dell’applicazione;
- **Entity** → mantengono le informazioni del dominio.

Se una classe Entity inizia anche a decidere il flusso dell’applicazione, si mescolano responsabilità appartenenti a strati differenti. Il materiale mostra quindi come la logica di controllo vada isolata in apposite classi Control.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/19_agosto_appunti/19_agosto_appunti/assets/p106-fig-110.png|600]]

Il vantaggio non è soltanto concettuale. Se cambia la politica con cui viene gestita una determinata operazione, la modifica rimane concentrata nella classe di controllo invece di essere dispersa tra classi che hanno anche altre responsabilità.

Questo ragionamento si collega direttamente al **coupling** già studiato: si cerca di limitare le dipendenze non necessarie tra elementi appartenenti a strati diversi.

## Legge di Demeter

Una regola usata per contenere queste dipendenze è la **Legge di Demeter**, riassunta dall’idea *don’t talk to strangers*: un oggetto dovrebbe comunicare soltanto con oggetti che conosce direttamente.

Secondo la formulazione riportata negli appunti, un metodo può inviare messaggi a:

- l’oggetto stesso;
- oggetti ricevuti come parametri;
- oggetti presenti tra gli attributi dell’oggetto;
- oggetti creati dal metodo;
- oggetti raggiungibili tramite variabili globali.

L’obiettivo è evitare catene di conoscenza troppo profonde tra oggetti. Meno dettagli un oggetto deve conoscere della struttura interna degli altri, più semplice diventa modificare il sistema senza propagare cambiamenti inutili.

Finora abbiamo chiarito **chi deve fare cosa**. Rimane però da descrivere con maggiore precisione **come è fatto internamente un elemento di progettazione complesso**. UML 2 introduce per questo il concetto di **Structured Class**.

# UML Structured Class

In UML 1 una classe veniva rappresentata soprattutto come un insieme di dati e operazioni. UML 2 mantiene la normale notazione della classe, ma permette di mostrarne anche la **struttura interna**.

Una **Structured Class** è una classe che contiene elementi interni, chiamati **roles** o **parts**, che partecipano alla realizzazione del suo comportamento.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/19_agosto_appunti/19_agosto_appunti/assets/p107-fig-111.png|650]]

L’idea è quella di considerare la classe come una **black box**:

- dall’esterno espone servizi tramite la propria interfaccia;
- all’interno può essere composta da altre parti che collaborano per realizzare quei servizi;
- i dettagli interni rimangono nascosti agli utilizzatori della classe.

Questa struttura può essere gerarchica: una parte interna può essere a sua volta una Structured Class. In questo modo un sistema complesso può essere descritto progressivamente, passando da blocchi di alto livello a elementi sempre più dettagliati.

## Parts, Roles, Connectors e Ports

Gli elementi fondamentali usati nella struttura interna sono:

- **Part** → rappresenta una parte appartenente alla struttura della classe;
- **Role** → rappresenta il ruolo svolto da un elemento nella collaborazione;
- **Connector** → collega le parti o i ruoli e indica i percorsi attraverso cui possono comunicare;
- **Port** → rappresenta un punto di interazione tra la classe e ciò che si trova all’esterno.

Le interazioni avvengono tramite messaggi, mantenendo quindi una netta separazione tra l’interfaccia visibile e l’implementazione interna.

Questa caratteristica rende le Structured Class utili anche dal punto di vista organizzativo: una parte può essere progettata e implementata in modo relativamente indipendente, purché venga rispettata l’interfaccia concordata.

# Class Diagram e Composite Structure Diagram

A questo punto è importante distinguere due diagrammi che possono sembrare simili.

Il **Class Diagram** descrive principalmente le classi e le relazioni tra esse. Il **Composite Structure Diagram**, invece, entra **all’interno di una classe strutturata** e mostra le parti concrete che collaborano per realizzarne il comportamento.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/19_agosto_appunti/19_agosto_appunti/assets/p108-fig-112.png|750]]

La differenza non è quindi semplicemente grafica:

- con il Class Diagram ragioniamo sulle relazioni tra tipi e classi;
- con il Composite Structure Diagram osserviamo la struttura interna di un particolare elemento di progettazione.

Questo secondo punto di vista diventa particolarmente utile nei sistemi di grandi dimensioni, perché permette di rappresentare il software in maniera gerarchica senza esporre contemporaneamente tutti i dettagli.

Finora, però, siamo ancora nel **modello logico della soluzione**. Per arrivare al software realmente eseguibile manca un’informazione fondamentale: **su quali risorse hardware e software verranno eseguiti questi elementi?**

Da questa necessità nasce il **Deployment Modeling**.

# Dalla struttura logica alla piattaforma di esecuzione

La configurazione della piattaforma descrive come le funzionalità hardware e software vengono distribuite sui nodi su cui il sistema sarà eseguito.

Il passaggio viene affrontato in due momenti:

1. si rappresenta la piattaforma di esecuzione tramite il **Deployment Diagram**;
2. si stabilisce come gli elementi software vengono allocati sui nodi della piattaforma.

In questo modo la progettazione collega ciò che abbiamo modellato come software alla struttura fisica sulla quale quel software dovrà funzionare.

# Deployment Diagram

Il **Deployment Diagram** rappresenta la configurazione della piattaforma di esecuzione e le connessioni tra le risorse coinvolte.

L’elemento centrale è il **Node**.

Un nodo rappresenta una risorsa computazionale utilizzata durante l’esecuzione del sistema. Negli appunti vengono distinti principalmente:

- **Device** → risorsa fisica con capacità di elaborazione;
- **Execution Environment** → ambiente o piattaforma di esecuzione ospitata su una risorsa computazionale.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/19_agosto_appunti/19_agosto_appunti/assets/p109-fig-113.png|400]]

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/19_agosto_appunti/19_agosto_appunti/assets/p109-fig-114.png|450]]

I nodi sono collegati attraverso **Connector**, che rappresentano i meccanismi di comunicazione tra le risorse. Le connessioni possono essere ulteriormente caratterizzate, per esempio attraverso molteplicità.

La distinzione è quindi semplice ma importante:

- il **Node** dice *dove* può avvenire l’esecuzione;
- il **Connector** dice *come* i nodi possono comunicare.

# Process-to-Node Allocation

Una volta definita la piattaforma, bisogna decidere **quali processi debbano essere eseguiti su quali nodi**. Questa attività prende il nome di **Process-to-Node Allocation**.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/19_agosto_appunti/19_agosto_appunti/assets/p110-fig-115.png|600]]

L’allocazione non viene scelta casualmente. Occorre considerare diversi vincoli e obiettivi:

- distribuire il carico evitando colli di bottiglia;
- ridurre i tempi di risposta;
- aumentare il throughput;
- ridurre il traffico di rete, collocando possibilmente vicini i processi che comunicano spesso;
- rispettare le capacità dei nodi, come CPU, RAM e spazio disponibile;
- considerare la larghezza di banda delle connessioni;
- considerare l’availability di hardware e collegamenti;
- prevedere eventuali esigenze di rerouting in caso di guasti.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/19_agosto_appunti/19_agosto_appunti/assets/p110-fig-116.png|600]]

Il Deployment Diagram ci ha quindi mostrato la piattaforma, mentre la Process-to-Node Allocation decide **come utilizzare concretamente quella piattaforma**.

Rimane ora da chiarire che cosa viene effettivamente distribuito sui nodi. Qui entra in gioco il concetto di **Artifact**.

# Artifact e Deployment

Un **Artifact** rappresenta un’entità software fisica che può essere distribuita su un nodo.

Gli esempi riportati nel materiale comprendono:

- file;
- eseguibili;
- tabelle di database;
- pagine Web;
- documenti e altri prodotti fisici della realizzazione software.

Il **Deployment** è l’attività con cui questi artifact vengono assegnati ai nodi della piattaforma.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/19_agosto_appunti/19_agosto_appunti/assets/p111-fig-117.png|600]]

È importante non confondere quindi tre livelli:

- **elemento del modello** → ciò che viene progettato;
- **artifact** → elemento fisico che implementa ciò che è stato progettato;
- **node** → risorsa su cui l’artifact viene distribuito o eseguito.

## Manifestation

La relazione di **Manifestation** collega un elemento del modello all’artifact che lo implementa.

Per esempio, una classe progettata può essere realizzata attraverso uno o più file sorgente e, dopo la compilazione, attraverso un file eseguibile. Gli artifact sono quindi la concretizzazione fisica degli elementi definiti nel modello.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/19_agosto_appunti/19_agosto_appunti/assets/p111-fig-118.png|500]]

## Deployment Specification

Il modello può essere ulteriormente arricchito con una **Deployment Specification**, cioè una specifica che contiene parametri utili al deployment di un artifact.

Può indicare informazioni relative, per esempio, a:

- modalità di esecuzione;
- collocazione;
- priorità o altri parametri necessari all’ambiente di esecuzione.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/19_agosto_appunti/19_agosto_appunti/assets/p112-fig-119.png|500]]

Questa informazione è utile soprattutto quando il deployment deve essere descritto in modo sufficientemente preciso da poter essere supportato anche da strumenti automatici.

# Componenti e interfacce

La progettazione dettagliata non si limita a stabilire dove il software sarà eseguito. Prima che una componente possa essere implementata o riutilizzata, deve essere definito chiaramente **come gli altri elementi possono interagire con essa**.

Questo riprende un principio già incontrato più volte: **separare interfaccia e implementazione**.

Per ogni componente occorre quindi distinguere:

- **interfaccia** → quali servizi mette a disposizione o richiede;
- **implementazione** → come quei servizi vengono effettivamente realizzati.

UML rappresenta le interfacce fornite e richieste attraverso porte e apposite notazioni grafiche.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/19_agosto_appunti/19_agosto_appunti/assets/p117-fig-126.png|550]]

Una **provided interface** descrive una funzionalità che il componente mette a disposizione degli altri; una **required interface** descrive invece una funzionalità di cui il componente ha bisogno.

Questa distinzione permette di progettare componenti che possono essere collegati sulla base di contratti espliciti, riducendo la dipendenza dai dettagli interni.

## Progettare l’interfaccia

Definire un’interfaccia significa specificare le operazioni accessibili dall’esterno e, per ciascuna operazione, i relativi parametri di input e output.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/19_agosto_appunti/19_agosto_appunti/assets/p118-fig-127.png|600]]

Il componente può quindi essere trattato dall’esterno come una black box: chi lo usa deve conoscere **cosa offre**, non necessariamente **come lo implementa**.

Quando più componenti vengono collegati, le required interface di uno devono trovare corrispondenza nelle provided interface messe a disposizione dagli altri componenti.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/19_agosto_appunti/19_agosto_appunti/assets/p119-fig-128.png|750]]

Questo porta direttamente alla riusabilità: se esiste già un componente che offre l’interfaccia necessaria, può essere integrato nel sistema; se non esiste, lo si implementa e potrà eventualmente essere riutilizzato in futuro.

Finora abbiamo visto come rendere riutilizzabili **componenti concreti**. Ma durante la progettazione ricorrono anche problemi più astratti: modi di creare oggetti, organizzare strutture o distribuire responsabilità che compaiono in molti sistemi diversi.

Per evitare di reinventare ogni volta una soluzione già nota, vengono introdotti i **Design Pattern**.

# Design Pattern

Un **Design Pattern** descrive una soluzione progettuale riutilizzabile per un problema che ricorre frequentemente durante la progettazione software.

Non è codice pronto da copiare e non rappresenta una soluzione specifica per un singolo progetto. È piuttosto uno **schema di soluzione** che indica quali elementi utilizzare, quali responsabilità assegnare e come farli collaborare.

Il valore del pattern nasce proprio dalla riusabilità del **design**:

- evita di affrontare da zero problemi già studiati;
- fornisce soluzioni progettuali consolidate;
- crea un linguaggio comune tra progettisti;
- può rendere più semplice la manutenzione del software.

L’uso di un pattern non garantisce automaticamente una buona progettazione e non risolve qualunque problema. Deve essere scelto soltanto quando il problema affrontato corrisponde realmente a quello per cui il pattern è stato definito.

# Come si classificano i Design Pattern

Prima di studiare i singoli pattern bisogna capire **secondo quali criteri vengono organizzati**. La classificazione utilizzata nel materiale considera due dimensioni indipendenti: **Purpose** e **Scope**.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/19_agosto_appunti/19_agosto_appunti/assets/p067-fig-031.png|750]]

## Classificazione per Purpose

Il **Purpose** descrive il tipo di problema progettuale affrontato dal pattern.

Si distinguono tre famiglie:

- **Creational** → riguardano il processo di creazione degli oggetti;
- **Structural** → riguardano il modo in cui classi e oggetti vengono composti per formare strutture più ampie;
- **Behavioral** → riguardano responsabilità, comportamento e modalità di interazione tra gli elementi del sistema.

Queste tre categorie non indicano pattern specifici, ma il **tipo di obiettivo** che il pattern cerca di raggiungere.

## Classificazione per Scope

Lo **Scope** indica invece su quali elementi agisce principalmente il pattern.

Si distinguono:

- **Class scope** → riguarda relazioni tra classi e sottoclassi; tali relazioni sono prevalentemente statiche e legate all’ereditarietà;
- **Object scope** → riguarda relazioni tra oggetti, che possono essere configurate più dinamicamente durante l’esecuzione.

Ogni pattern può quindi essere descritto combinando le due dimensioni. Per esempio, non basta dire che un pattern è “strutturale”: bisogna anche capire se la soluzione agisce principalmente a livello di classi oppure di oggetti.

# Come viene descritto un Design Pattern

Per poter confrontare pattern diversi viene usata una struttura descrittiva comune. Nel materiale vengono indicati i seguenti elementi:

- **Nome e classificazione** → identifica il pattern e la sua posizione rispetto a Purpose e Scope;
- **Motivazione** → spiega quale problema ha portato alla nascita del pattern;
- **Applicabilità** → chiarisce in quali situazioni ha senso utilizzarlo;
- **Struttura** → mostra la configurazione astratta della soluzione;
- **Partecipanti** → identifica classi e oggetti coinvolti e le loro responsabilità;
- **Conseguenze** → descrive vantaggi, svantaggi e compromessi introdotti;
- **Implementazione** → raccoglie indicazioni utili per realizzare concretamente il pattern;
- **Codice di esempio** → mostra una possibile implementazione;
- **Usi conosciuti** → riporta applicazioni reali del pattern;
- **Pattern correlati** → collega il pattern ad altre soluzioni che possono essere alternative o complementari.

Questa struttura è importante perché nei prossimi pattern non dovremo imparare una sequenza di definizioni isolate. Per ciascuno dovremo seguire sempre lo stesso ragionamento:

**problema → idea della soluzione → struttura e partecipanti → quando usarlo → conseguenze**.

# Framework e Design Pattern

Prima di passare ai singoli pattern è utile distinguere i Design Pattern dai **Framework**, perché entrambi riguardano il riuso ma a livelli differenti.

Un **Framework** è un design riutilizzabile che costituisce lo scheletro di un sistema o di una sua parte. Non è quindi una semplice raccolta di funzioni: stabilisce una struttura entro cui lo sviluppatore costruisce la propria applicazione.

Nel materiale il framework è descritto attraverso un insieme di **classi astratte** e delle loro relazioni. Lo sviluppatore personalizza questa struttura implementando le classi o le interfacce previste dal framework.

I vantaggi principali sono due:

- **riuso del design** → si riutilizza una struttura progettuale già definita;
- **riuso del codice** → parte dell’implementazione è già disponibile nel framework.

Il rapporto con i Design Pattern può essere visto così:

- un **Design Pattern** descrive una soluzione astratta a un problema progettuale ricorrente;
- un **Framework** fornisce una struttura riutilizzabile più ampia, composta da classi e relazioni concrete da specializzare;
- i Design Pattern possono essere utilizzati come **mattoni progettuali** nella costruzione di un framework.

Con questa distinzione abbiamo preparato il terreno per i pattern specifici. Da qui in avanti non dovremo più chiederci soltanto *che cos’è un pattern*, ma quale problema risolve ciascuna soluzione e perché la sua struttura è utile rispetto a un approccio più diretto.
