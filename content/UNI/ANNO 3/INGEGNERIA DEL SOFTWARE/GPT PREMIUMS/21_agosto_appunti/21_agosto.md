# Qualità del software, SQA e Testing

Con le metriche abbiamo visto **come misurare alcune proprietà della struttura del software**. Questo, però, non basta ancora a dire se il prodotto è complessivamente di buona qualità.

La qualità riguarda infatti più aspetti contemporaneamente: correttezza, affidabilità, facilità di modifica, usabilità, portabilità e così via. Per questo il problema finale non è trovare una singola misura, ma capire **quali caratteristiche osservare, come valutarle e come controllare durante lo sviluppo che prodotto e processo rispettino gli standard stabiliti**.

Da qui si collegano tre blocchi:

- **Quality Model** → definisce quali aspetti concorrono alla qualità;
- **Software Quality Assurance (SQA)** → controlla sistematicamente che processo e prodotto rispettino standard e procedure;
- **Verification, Validation e Testing** → controllano concretamente gli artefatti e il comportamento del software.

# Qualità del software

La **qualità del software** è il grado con cui il software possiede una combinazione di attributi desiderabili.

Non esiste quindi una proprietà unica chiamata “qualità”: il giudizio dipende da quali caratteristiche stiamo osservando.

Gli appunti distinguono quattro punti di vista:

- **trascendentale** → qualità come eccellenza intrinseca del prodotto;
- **utente** → quanto il software permette all'utente di raggiungere i propri obiettivi;
- **prodotto** → qualità delle caratteristiche del software, come correttezza e affidabilità;
- **organizzazione** → benefici per l'organizzazione, ad esempio costi, profitti ed efficacia.

Per l'Ingegneria del Software interessa soprattutto trasformare caratteristiche che potrebbero sembrare soggettive in **valutazioni quanto più possibile oggettive e misurabili**.

Da questa esigenza nasce il modello di qualità di McCall.

# Quality Model di McCall

Il modello di **McCall** considera la qualità come combinazione di più fattori e li mette in relazione con le attività svolte sul prodotto durante il suo ciclo di vita.

Il **Quality Triangle** distingue tre famiglie di attività:

- **Operation** → uso effettivo del prodotto;
- **Revision** → modifica e manutenzione del prodotto;
- **Transition** → adattamento o trasferimento del prodotto verso nuovi contesti e utilizzi.

![[assets/p146-fig-167.png|500]]

Il punto del triangolo non è soltanto classificare le attività. Serve a mostrare che **la qualità continua a essere rilevante dopo il rilascio**: il software viene utilizzato, corretto, modificato, adattato e può infine essere sostituito o riutilizzato in nuovi contesti.

## Indici di qualità

McCall associa alle tre famiglie di attività **12 indici di qualità**.

### Operation

Descrivono la qualità mentre il prodotto viene utilizzato:

- **Correttezza** → grado con cui il prodotto soddisfa specifiche e obiettivi dell'utente;
- **Affidabilità** → grado con cui esegue le funzioni con la precisione richiesta;
- **Efficienza** → quantità di risorse di calcolo necessarie;
- **Integrità** → protezione da accessi esterni indesiderati;
- **Usabilità** → impegno richiesto all'utente per utilizzare il prodotto.

### Revision

Descrivono quanto facilmente il prodotto può essere controllato e modificato:

- **Manutenibilità** → impegno richiesto per individuare e correggere difetti;
- **Testabilità** → impegno necessario per verificare il comportamento del prodotto;
- **Flessibilità** → impegno richiesto per modificarlo.

### Transition

Descrivono la capacità del software di adattarsi a nuovi utilizzi:

- **Portabilità** → impegno necessario per trasferirlo in un altro ambiente operativo;
- **Riusabilità** → possibilità di riutilizzare il prodotto o sue parti;
- **Interoperabilità** → capacità di interagire con altri prodotti;
- **Evolubilità** → effort richiesto per adeguarlo a nuovi requisiti.

Questi indici dicono **quali dimensioni della qualità vogliamo valutare**. Per misurarli servono però proprietà più concrete: gli attributi.

## Attributi di qualità

Gli appunti riportano dieci attributi utilizzabili per costruire gli indici:

- **Complessità** → livello di comprensibilità del software;
- **Accuratezza** → precisione dei risultati;
- **Completezza** → grado con cui le funzionalità richieste sono state implementate;
- **Consistenza** → uniformità degli approcci di progettazione adottati;
- **Error Tolerance** → capacità di continuare a funzionare in presenza di malfunzionamenti;
- **Tracciabilità** → possibilità di mettere in relazione prodotti diversi dello sviluppo, ad esempio requisito e codice;
- **Espandibilità** → possibilità di estendere storage e funzionalità;
- **Generalità** → ampiezza dei possibili contesti di utilizzo;
- **Modularità** → indipendenza tra moduli;
- **Auto-documentation** → capacità del software di supportare l'utente attraverso informazioni e help.

Un attributo può contribuire a più indici e può avere un impatto:

- **positivo** → un valore maggiore migliora l'indice;
- **negativo** → un valore maggiore lo peggiora.

Il modello segue quindi questa logica:

**qualità complessiva → indici di qualità → attributi → metriche concrete**

È qui che si ricollegano le metriche studiate in precedenza: per esempio la modularità può essere valutata usando informazioni su **cohesion, coupling, morfologia e information flow**.

![[assets/p148-fig-168.png|550]]

# Checklist Method

Gli attributi non sono sempre misurabili direttamente con una formula. Per rendere più sistematica la valutazione viene introdotto il **Checklist Method**.

Una checklist contiene una serie di domande relative a un attributo. Alle risposte vengono associati valori che permettono di ottenere un punteggio complessivo.

In generale:

1. si sceglie la checklist relativa all'attributo da valutare;
2. il team analizza la documentazione e risponde alle domande;
3. le risposte vengono trasformate in punteggi;
4. i punteggi determinano il valore dell'attributo;
5. più attributi vengono combinati per ottenere il valore dell'indice di qualità.

Le domande possono anche essere indicate come:

- **Non Applicabili** → non devono contribuire al calcolo;
- **Non Valutabili** → non è possibile valutarle con le informazioni disponibili.

La valutazione non viene affidata a una sola persona. Gli appunti prevedono un **Checklist Evaluation Team** composto da persone con ruoli e competenze differenti.

Ogni membro esamina inizialmente il materiale in modo indipendente. Successivamente, attraverso **Walkthrough** o **Inspection**, il team confronta le risposte e cerca di arrivare a una valutazione condivisa.

![[assets/p152-fig-177.png|550]]

Il Checklist Method è quindi uno strumento per valutare la qualità. Ma il progetto ha bisogno di qualcosa di più generale: un'attività che controlli in modo continuativo **come il software viene prodotto e se vengono rispettate le regole definite dall'organizzazione**.

Da qui nasce la Software Quality Assurance.

# Software Quality Assurance — SQA

La **Software Quality Assurance (SQA)** è un approccio pianificato e sistematico per assicurare che **processo software e prodotto software** siano conformi agli standard, ai processi e alle procedure stabilite.

Il suo obiettivo non è “scrivere il software al posto degli sviluppatori”, ma **controllare che il lavoro venga svolto correttamente e che eventuali deviazioni vengano individuate in tempo**.

Il team SQA controlla, tra le altre cose, che:

- venga adottata una metodologia di sviluppo appropriata;
- vengano seguiti standard e procedure;
- siano effettuate review adeguate;
- sia prodotta documentazione utile alla manutenzione;
- sia garantita la tracciabilità dei prodotti;
- venga svolto il testing previsto;
- deviazioni e problemi vengano segnalati al management.

La SQA richiede personale, tempo ed effort e quindi ha un costo. Per essere introdotta efficacemente deve essere sostenuta dal management attraverso un **SQA Plan**, nel quale vengono stabiliti gli standard e le attività di controllo da applicare.

## Standard e procedure

Nel contesto SQA è utile distinguere:

- **standard** → definiscono **che cosa** dovrebbe essere fatto o rispettato;
- **procedure** → descrivono **come** svolgere concretamente determinate attività.

La SQA controlla quindi la conformità rispetto a entrambi.

# Verification, Validation e Testing

Finora abbiamo visto come definire e assicurare la qualità a livello generale. Per verificare concretamente gli artefatti prodotti durante lo sviluppo servono le attività di **Verification & Validation (V&V)**.

La relazione fondamentale è:

- **Verification** e **Validation** descrivono **che cosa vogliamo controllare**;
- **Inspection** e **Testing** sono strumenti con cui possiamo effettuare questi controlli.

## Verification

La **Verification** controlla se il prodotto viene costruito correttamente rispetto agli artefatti e alle specifiche di riferimento.

In forma sintetica:

> **Are we building the product right?**

Può riguardare anche artefatti non eseguibili, come documenti, modelli e specifiche.

## Validation

La **Validation** controlla se il prodotto costruito soddisfa realmente le esigenze dell'utente.

In forma sintetica:

> **Are we building the right product?**

Quando il software diventa eseguibile, il testing dinamico assume un ruolo particolarmente importante per la validazione.

## Inspection e Testing

Le **Software Inspections** sono controlli statici: si analizzano artefatti senza eseguire il software.

Il **Software Testing** è invece dinamico: si esegue il software o un suo componente e se ne osserva il comportamento.

Quindi:

- **Inspection** → osserva staticamente artefatti e documenti;
- **Testing** → esercita dinamicamente il software eseguibile.

Il documento che pianifica le attività di testing è il **Test Plan**.

# Obiettivi del Testing

Il testing non ha sempre lo stesso obiettivo. Gli appunti distinguono soprattutto tre forme.

## Validation Testing

Il **Validation Testing** cerca di dimostrare che il software soddisfa i requisiti dell'utente.

È particolarmente naturale nelle fasi finali, quando esiste una versione eseguibile del prodotto da confrontare con i requisiti e con i criteri di accettazione.

Un validation test ha successo quando il sistema **si comporta come previsto**.

## Defect Testing

Il **Defect Testing** ha l'obiettivo opposto: cerca di scoprire difetti latenti.

Qui un test ha successo quando **fa emergere un comportamento errato**, perché ha permesso di individuare un problema che dovrà essere corretto.

## Statistical Testing

Lo **Statistical Testing** cerca di riprodurre statisticamente il modo in cui il software verrà utilizzato nella realtà.

È particolarmente utile per valutare requisiti di **affidabilità**, perché non è realistico osservare il software per anni per sapere direttamente quanto spesso fallirà.

Si costruisce quindi un **Operational Profile**, cioè una rappresentazione della frequenza con cui i diversi tipi di utenti producono determinati input. I risultati dei test vengono poi usati per stimare l'affidabilità.

È una tecnica costosa e viene soprattutto associata a software critico, dove i requisiti di affidabilità sono molto stringenti.

# Fasi del Defect Testing

Il Defect Testing viene applicato prima ai singoli elementi e poi alle loro interazioni.

## Component Testing

Il **Component Testing** riguarda unità e moduli considerati separatamente.

È normalmente svolto dallo sviluppatore del componente e serve a verificare che l'unità funzioni correttamente in isolamento.

Ma un componente corretto da solo può comunque interagire male con gli altri. Per questo, dopo il Component Testing, serve l'Integration Testing.

## Integration Testing

L'**Integration Testing** verifica gruppi di componenti collegati tra loro fino ad arrivare a sottosistemi e sistema completo.

È normalmente affidato a un testing team indipendente e si concentra soprattutto sui problemi che emergono **dalle interazioni tra componenti**.

Lo **User Testing**, invece, non appartiene al Defect Testing: serve a verificare dal punto di vista dell'utente che il sistema faccia ciò che è atteso e rientra quindi nella logica della validazione.

# Politiche di Testing

Un testing esaustivo richiederebbe di provare tutte le combinazioni di input, condizioni e percorsi possibili. Per software non banali questo è impraticabile.

Di conseguenza il problema reale diventa:

> **come scegliere un insieme limitato di test che abbia comunque una buona probabilità di trovare difetti?**

Le politiche di testing dovrebbero essere definite dal team di V&V o dal team di testing indipendente, non dagli sviluppatori del prodotto, per mantenere maggiore obiettività.

## Test Case e Test Data

Gli appunti distinguono:

- **Test Case** → specifica l'input da fornire e l'output atteso se il sistema si comporta correttamente;
- **Test Data** → dati concreti utilizzati per esercitare il software e cercare di far emergere difetti.

I Test Case sono spesso costruiti manualmente, soprattutto quando derivano da specifiche informali. I Test Data possono invece essere generati anche automaticamente.

# Black Box Testing

Nel **Black Box Testing**, o **Functional Testing**, il tester considera il software come una scatola nera:

- conosce la specifica;
- fornisce input;
- osserva gli output;
- confronta il risultato con quello atteso;
- non usa la struttura interna del codice per progettare il test.

I Test Case derivano quindi principalmente dalla **specifica del sistema**.

Se l'output osservato è diverso da quello atteso, il test ha individuato un comportamento anomalo. Il black box mostra **che esiste un problema**, ma non necessariamente dove si trovi il difetto nel codice.

## Equivalence Partitioning

Dato che non possiamo provare tutti gli input, l'**Equivalence Partitioning** divide gli input e gli output in **classi di equivalenza**.

Una classe raccoglie valori per i quali ci si aspetta un comportamento simile del programma.

La strategia diventa:

1. identificare le partizioni significative;
2. scegliere alcuni valori rappresentativi per ogni partizione;
3. includere anche partizioni di input non validi;
4. costruire i Test Case a partire da questi valori.

Per esempio, se un requisito accetta valori in un certo intervallo, possiamo distinguere:

- valori inferiori all'intervallo;
- valori validi;
- valori superiori all'intervallo.

In questo modo pochi test rappresentativi sostituiscono un numero potenzialmente enorme di input.

Le **Testing Guidelines** applicano lo stesso principio a strutture come liste e array, suggerendo di provare casi significativi come:

- sequenza vuota;
- sequenza con un solo elemento;
- sequenze di dimensioni differenti;
- accesso al primo, all'ultimo e a un elemento intermedio.

# White Box — Structural Testing

Il Black Box parte dalla specifica ma non ci dice quanto codice interno sia stato realmente esercitato.

Per osservare anche questo aspetto serve il **White Box Testing**, chiamato anche **Structural Testing**.

Qui il tester conosce la struttura interna del programma e costruisce i Test Case a partire dal **codice**.

L'obiettivo non è necessariamente percorrere ogni combinazione possibile, ma ottenere una determinata **Testing Coverage**, cioè la percentuale di istruzioni o parti della struttura che vengono effettivamente attraversate dai test.

La relazione tra i due approcci è quindi:

- **Black Box** → “il comportamento esterno rispetta la specifica?”;
- **White Box** → “quali parti della struttura interna sono state realmente esercitate?”.

Non sono due alternative assolute: osservano il software da punti di vista differenti e possono essere usati insieme.

# Path Testing e complessità ciclomatica

Lo **Structural Testing** porta naturalmente al problema dei percorsi di esecuzione.

Il **Path Testing** usa il flowgraph del programma per individuare percorsi significativi e progettare Test Case che li attraversino.

Il testing di tutti i percorsi possibili è generalmente impraticabile, soprattutto in presenza di cicli. Si cercano quindi **percorsi indipendenti**, cioè percorsi che introducono almeno un nuovo arco rispetto a quelli già considerati.

Qui si ricollega la **complessità ciclomatica** studiata con le metriche:

> il numero di percorsi linearmente indipendenti del flowgraph corrisponde alla complessità ciclomatica.

Quindi la complessità ciclomatica non serve soltanto a descrivere la complessità strutturale del codice: può anche indicare **quanti percorsi indipendenti devono essere considerati per costruire un insieme di test di base**.

![[assets/p157-fig-178.png|600]]

Questo collegamento chiude il cerchio con le metriche del 20 agosto:

**flowgraph → complessità ciclomatica → percorsi indipendenti → Test Case strutturali**

# Integration Testing

Quando i singoli componenti sono stati testati, bisogna controllare che funzionino correttamente **quando vengono combinati**.

L'Integration Testing può essere organizzato in modo incrementale secondo due strategie principali.

## Top-down

Si parte dalle componenti di livello più alto e si integrano progressivamente quelle inferiori.

Se una componente di basso livello non è ancora disponibile viene sostituita da uno **stub**, cioè un elemento semplificato che ne imita l'interfaccia e parte del comportamento.

Vantaggi importanti:

- permette di osservare presto l'architettura generale;
- consente di costruire dimostrazioni parziali del sistema.

## Bottom-up

Si parte dalle componenti di livello più basso e le si integra progressivamente fino a costruire il sistema completo.

Per esercitare componenti che non hanno ancora i moduli superiori che le chiameranno si usano **test driver**, cioè programmi che simulano il chiamante.

Non esiste una strategia universalmente migliore: gli appunti evidenziano che possono essere combinate in funzione del sistema e della disponibilità delle componenti.

# Interface Testing

L'Integration Testing controlla le relazioni tra componenti. Una parte particolarmente delicata è la loro **interfaccia**.

L'**Interface Testing** cerca difetti causati da:

- uso scorretto dell'interfaccia;
- assunzioni errate sul comportamento del componente chiamato;
- problemi di sincronizzazione e timing.

Gli appunti distinguono quattro forme di interazione:

- passaggio di **parametri**;
- accesso a **memoria condivisa**;
- **interfaccia procedurale**;
- scambio di **messaggi**.

Il punto da ricordare è che l'Interface Testing non entra necessariamente nella struttura interna del componente: verifica soprattutto che **il contratto di comunicazione tra componenti venga utilizzato correttamente**.

Da queste prove nasce anche una tecnica specifica per capire come il sistema reagisce quando viene portato oltre il normale carico operativo.

# Stress Testing

Lo **Stress Testing** incrementa progressivamente il carico sul sistema fino a quando le prestazioni diventano inaccettabili.

Serve a osservare:

- il limite operativo del sistema;
- come degrada sotto sovraccarico;
- se il fallimento rimane controllato;
- se vengono evitati danni eccessivi a servizi e dati.

È particolarmente importante nei sistemi distribuiti, dove sovraccarichi di rete e comunicazione possono produrre forti cali di prestazioni.

# Object Oriented Testing

Nei sistemi Object Oriented l'unità fondamentale non è una semplice funzione isolata, ma una **classe** che incapsula stato e operazioni e i cui oggetti interagiscono tramite messaggi.

Per questo il testing procede per livelli:

1. **metodi** individuali;
2. **oggetto/classe** nel suo complesso;
3. **cluster di oggetti** che collaborano;
4. **sistema Object Oriented** completo.

Il testing completo di una classe deve considerare:

- operazioni disponibili;
- valori degli attributi;
- possibili stati dell'oggetto.

L'**ereditarietà** complica il testing perché un comportamento ereditato può dover essere verificato anche nelle sottoclassi che lo utilizzano o lo specializzano.

## Cluster Testing

Quando si passa dall'oggetto singolo alle interazioni tra oggetti si parla di **Cluster Testing**.

Gli appunti riportano tre approcci:

- **Use-case / Scenario Testing** → deriva i test dalle interazioni descritte dai casi d'uso;
- **Thread Testing** → verifica la risposta del sistema a una specifica sequenza di eventi;
- **Object Interaction Testing** → controlla una sequenza di messaggi scambiati tra oggetti.

Per gli scenari, il Use Case può essere affiancato da un **Sequence Diagram**, che fornisce più informazioni sull'ordine delle interazioni e aiuta a costruire i Test Case.

# BPM e BPMN — materiale conclusivo

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

## BPMN

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

Questa parte si collega a concetti già incontrati parlando di **SOA, orchestrazione e coreografia**, ma qui il punto di vista non è più soltanto l'architettura del software: è il **processo aziendale complessivo che il software deve supportare o automatizzare**.
