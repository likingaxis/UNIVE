# 15 agosto - Requisiti e Requirements Engineering

# Dai bisogni al documento dei requisiti

Nel ciclo di vita abbiamo visto che lo sviluppo del software parte dai **requisiti** e dalla loro successiva **specifica**. Prima di progettare o scrivere codice bisogna infatti capire con sufficiente precisione **che cosa deve fare il sistema e quali vincoli deve rispettare**.

Questa attività è meno banale di quanto sembri. Il cliente o l'utente conosce il problema che vuole risolvere, ma non necessariamente sa descrivere in modo completo e non ambiguo il software da costruire. Inoltre:

- persone diverse possono avere esigenze diverse;
- alcune esigenze possono essere implicite;
- alcuni requisiti possono entrare in conflitto;
- i requisiti possono cambiare durante il progetto;
- una stessa esigenza può essere descritta a diversi livelli di dettaglio.

Per questo non basta raccogliere una lista di richieste: serve un processo sistematico che permetta di **identificare, analizzare, documentare, controllare e gestire i requisiti**. Questo processo prende il nome di **Requirements Engineering** e verrà approfondito dopo aver chiarito che cosa sia un requisito.

---

# Requisiti Software

Un **requisito software** descrive una capacità, un servizio o un vincolo che il sistema deve soddisfare.

Nel materiale del corso vengono richiamati tre significati complementari del termine *requirement*:

- una **condizione o capacità necessaria all'utente** per risolvere un problema o raggiungere un obiettivo;
- una **condizione o capacità che il sistema deve possedere** per rispettare un contratto, uno standard, una specifica o un altro vincolo imposto;
- la **rappresentazione documentata** di una delle condizioni o capacità precedenti.

Qui per **condizione o capacità** si intende, in modo concreto, qualcosa che deve essere vero o che il sistema deve essere in grado di fare.

Esempi:

- capacità: il sistema deve permettere all'utente di cercare un documento;
- condizione: il tempo di risposta deve essere inferiore a una certa soglia;
- vincolo: i documenti prodotti devono rispettare uno standard imposto dal cliente.

Un requisito non coincide quindi necessariamente con una funzione del programma: può descrivere anche **prestazioni, sicurezza, standard, modalità di sviluppo o vincoli esterni**.

## Due dimensioni diverse per classificare i requisiti

Un punto importante è non confondere due classificazioni differenti.

Ogni requisito può essere osservato secondo almeno due dimensioni:

- **livello di astrazione** → quanto il requisito è generale o dettagliato;
- **categoria** → che tipo di informazione esprime.

Queste due dimensioni sono indipendenti. Per esempio, un requisito può essere contemporaneamente:

- un **requisito utente** per livello di astrazione;
- un **requisito funzionale** per categoria.

Oppure può essere:

- un **requisito di sistema**;
- **non funzionale**.

Prima vediamo il livello di astrazione, poi la categoria.

---

## Classificazione per livello di astrazione

### Requisiti Utente - Requirement Definition

I **requisiti utente** descrivono ad alto livello i servizi e i vincoli del sistema.

Sono pensati per essere comprensibili anche a persone che non devono conoscere i dettagli tecnici dell'implementazione, quindi vengono normalmente espressi mediante:

- linguaggio naturale;
- eventuali diagrammi;
- descrizioni orientate ai bisogni dell'utente.

L'obiettivo è esprimere **cosa serve**, senza entrare ancora nel dettaglio tecnico di come il sistema dovrà essere costruito.

Esempio:

> Il sistema deve fornire un mezzo per rappresentare e visualizzare file esterni generati da altri tool.

Questa frase identifica una necessità generale, ma lascia ancora aperte molte domande: quali tipi di file? come vengono identificati? quale programma li apre? come sono rappresentati nell'interfaccia?

### Requisiti di Sistema - Specification

I **requisiti di sistema** descrivono gli stessi servizi e vincoli a un livello molto più dettagliato.

Devono essere abbastanza precisi da diventare una base concreta per le successive attività di progettazione e sviluppo.

Riprendendo l'esempio precedente, il requisito utente può essere raffinato in più requisiti di sistema:

- l'utente deve poter definire il tipo dei file esterni;
- a ogni tipo deve essere associato il tool che lo ha generato;
- ogni tipo deve essere rappresentato da un'icona;
- l'utente deve poter definire l'icona;
- selezionando l'icona deve poter essere avviato il tool adatto a visualizzare il file.

Il passaggio **requisito utente → requisiti di sistema** è quindi un passaggio da una necessità generale a una descrizione più precisa e strutturata.

### Perché servono entrambi

I due livelli hanno destinatari diversi.

I requisiti utente vengono letti soprattutto da:

- manager del cliente;
- utenti finali;
- ingegneri del cliente;
- manager del contractor;
- system architect.

I requisiti di sistema interessano invece soprattutto:

- utenti tecnici del sistema;
- ingegneri del cliente;
- software developer;
- system architect.

Il documento dei requisiti deve quindi riuscire a parlare sia a chi vuole capire **che cosa riceverà**, sia a chi deve capire **che cosa dovrà costruire**.

Nel corso viene inoltre citata, per alcuni sistemi critici, una **Software Specification** ancora più dettagliata, eventualmente basata su linguaggi formali. L'idea importante è sempre la stessa: aumentando il dettaglio diminuisce l'astrazione e aumenta la precisione richiesta.

---

## Classificazione per categoria

Dopo il livello di astrazione, possiamo classificare i requisiti in base a **che cosa descrivono**.

Le due categorie principali sono:

- **requisiti funzionali**;
- **requisiti non funzionali**.

A queste si affiancano i **requisiti di dominio**, che non costituiscono una categoria completamente separata: possono essere funzionali o non funzionali, ma derivano direttamente dal dominio applicativo.

### Requisiti Funzionali

I **requisiti funzionali** descrivono i servizi che il sistema deve offrire e il comportamento che deve assumere in presenza di determinati input o situazioni.

In altre parole rispondono soprattutto alla domanda:

**Che cosa deve fare il sistema?**

Esempi:

- il sistema deve permettere di visualizzare un documento;
- il sistema deve registrare un ordine;
- il sistema deve permettere di ricercare un cliente;
- il sistema deve calcolare il totale di una fattura.

Un requisito funzionale può essere espresso sia ad alto livello sia in modo molto dettagliato: **funzionale** indica la categoria del requisito, non il suo livello di astrazione.

### Requisiti Non Funzionali

I **requisiti non funzionali**, detti anche *extrafunzionali*, descrivono proprietà, qualità o vincoli che il sistema o il processo di sviluppo devono rispettare.

Non dicono semplicemente quale funzione deve esistere, ma possono stabilire **come deve comportarsi il sistema**, con quali caratteristiche o sotto quali vincoli.

Nel corso vengono ricondotti a tre grandi sorgenti:

- **prodotto**:
  - efficienza;
  - affidabilità;
  - usabilità;
  - portabilità;
  - sicurezza;
- **organizzazione/processo**:
  - standard da rispettare;
  - tool CASE obbligatori;
  - linguaggi o metodi di sviluppo imposti;
- **vincoli esterni**:
  - interoperabilità;
  - legislazione;
  - privacy;
  - vincoli etici o regolamentari.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/15_agosto_appunti/assets/p027-fig-028.png|700]]

Il diagramma mostra proprio questa idea: i requisiti non funzionali non formano un unico blocco omogeneo, ma comprendono vincoli provenienti dal prodotto, dall'organizzazione e dall'ambiente esterno.

Esempi:

- "Il tempo di risposta deve essere inferiore a 10 secondi" → requisito di prestazione;
- "I documenti di progetto devono rispettare lo standard ABC" → vincolo sul processo/prodotto;
- "Il sistema non deve mostrare agli operatori dati personali non autorizzati" → requisito relativo a privacy e sicurezza.

### Requisiti di Dominio

Un **requisito di dominio** deriva dalle regole e dalle caratteristiche specifiche dell'ambiente applicativo in cui il software verrà utilizzato.

Il **dominio applicativo** è il settore reale nel quale opera il sistema: per esempio sanità, banca, trasporti, università, contabilità o telecomunicazioni.

Un requisito di dominio può essere:

- funzionale, se impone una particolare funzione;
- non funzionale, se impone un vincolo o una proprietà.

Esempio:

> I documenti di rendiconto contabile, secondo la normativa ABC, devono essere stampati alla ricezione e cancellati immediatamente.

La richiesta nasce dal dominio contabile e dalla relativa normativa; allo stesso tempo impone un comportamento specifico al sistema.

---

# Quando un requisito è scritto male

Una volta individuati i requisiti, non basta averli messi per iscritto. Devono essere formulati in modo tale da poter guidare davvero lo sviluppo.

Nel corso vengono evidenziati quattro problemi fondamentali:

- **ambiguità**;
- **incompletezza**;
- **inconsistenza**;
- **mancanza di verificabilità**.

## Ambiguità

Un requisito è **ambiguo** quando può essere interpretato in più modi ragionevoli.

Esempio:

> Il sistema deve fornire un visualizzatore appropriato.

"Appropriato" non stabilisce un comportamento preciso:

- per il cliente potrebbe significare aprire ogni formato con il relativo programma specifico;
- per lo sviluppatore potrebbe significare mostrare genericamente il contenuto del file.

Entrambe le interpretazioni sono compatibili con la frase, quindi il requisito non guida in modo univoco lo sviluppo.

Anche espressioni apparentemente precise possono essere ambigue se manca il contesto. Per esempio una scadenza espressa con data e ora potrebbe essere problematica se non viene specificato il fuso orario quando il sistema opera in paesi diversi.

## Incompletezza

Un insieme di requisiti è **incompleto** quando non descrive tutte le caratteristiche necessarie del sistema.

Il problema è frequente perché il cliente può:

- dare per scontate alcune esigenze;
- non conoscere ancora tutte le situazioni operative;
- scoprire nuove necessità soltanto vedendo il sistema in uso.

È uno dei motivi per cui tecniche come prototipazione, scenari e casi d'uso possono aiutare l'elicitation dei requisiti.

## Inconsistenza

Due requisiti sono **inconsistenti** quando impongono condizioni incompatibili tra loro.

Esempio:

- requisito A: ogni form deve contenere al massimo 5 campi editabili;
- requisito B: la form anagrafica deve permettere di inserire nome, cognome, data di nascita, telefono, fax e altri dati obbligatori.

Se il secondo requisito richiede più di cinque campi, non è possibile soddisfare contemporaneamente entrambi senza modificare la specifica.

## Verificabilità

Un requisito è **verificabile** quando possiamo stabilire in modo oggettivo se il prodotto lo soddisfa oppure no.

Frasi come:

> Il sistema deve essere veloce.

oppure:

> Il sistema deve essere facile da usare.

sono difficili da verificare perché non definiscono una misura osservabile.

È preferibile associare una proprietà a una metrica, per esempio:

- tempo massimo di risposta;
- numero massimo di errori;
- *training time* necessario a un nuovo utente;
- quantità di istruzioni dipendenti da una specifica piattaforma per valutare la portabilità.

Il punto non è che ogni proprietà sia semplice da misurare, ma che un requisito dovrebbe essere formulato in modo tale da consentire una verifica concreta del suo rispetto.

---

# Come vengono scritti i requisiti

La forma con cui esprimiamo un requisito dipende soprattutto dal livello di precisione necessario.

Per i requisiti utente si privilegia normalmente il **linguaggio naturale**, perché deve essere comprensibile anche a chi non possiede competenze tecniche specialistiche.

Per ridurre i problemi del linguaggio naturale si seguono alcune regole:

- usare un formato standard;
- numerare i requisiti in modo univoco;
- usare terminologia coerente;
- evitare formulazioni vaghe;
- distinguere requisiti obbligatori da desiderabili;
- evidenziare le parti fondamentali;
- collegare ogni requisito alle motivazioni e ai requisiti più dettagliati che lo raffinano.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/15_agosto_appunti/assets/p028-fig-029.png|600]]

L'esempio nell'immagine mostra un requisito utente strutturato. Oltre alla frase principale compaiono informazioni come:

- descrizione;
- **rationale**, cioè il motivo per cui il requisito esiste;
- riferimento alla specifica più dettagliata corrispondente.

Questa struttura è utile perché il requisito non rimane una frase isolata: viene inserito in una rete di informazioni che permette di capirne origine e conseguenze.

## Dai requisiti utente ai requisiti di sistema

Quando si passa ai requisiti di sistema aumenta la precisione richiesta. Il linguaggio naturale può ancora essere utilizzato, ma diventa più strutturato.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/15_agosto_appunti/assets/p029-fig-030.png|700]]

L'esempio mostra una specifica nella quale non viene descritta soltanto la funzione in modo generico. Vengono indicati, tra le altre cose:

- descrizione della funzione;
- input;
- output;
- sorgente dei dati;
- destinazione;
- precondizioni;
- postcondizioni;
- eventuali effetti collaterali;
- collegamento al requisito utente da cui deriva.

### Precondizione e postcondizione

Una **precondizione** è una condizione che deve essere vera prima di eseguire una funzione.

Una **postcondizione** è una condizione che deve risultare vera dopo l'esecuzione corretta della funzione.

Queste informazioni sono importanti perché specificano il comportamento atteso senza dover ancora descrivere l'algoritmo usato per implementarlo.

## PDL - Program Design Language

Per rendere una specifica ancora più precisa si può usare un linguaggio simile a uno pseudocodice, indicato negli appunti come **PDL**.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/15_agosto_appunti/assets/p030-fig-031.png|650]]

Il vantaggio è ridurre l'ambiguità rispetto al linguaggio naturale.

Il rischio, però, è anticipare decisioni che appartengono alla progettazione. In questa fase vogliamo ancora dire **cosa deve fare il sistema**, non imporre prematuramente **come deve essere implementato**.

Per questo il PDL è particolarmente utile quando viene usato per descrivere **interfacce e comportamento osservabile**, mantenendosi lontano dai dettagli algoritmici non ancora necessari.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/15_agosto_appunti/assets/p030-fig-032.png|600]]

La specifica di interfaccia nell'immagine rende bene il confine: vengono dichiarate le operazioni disponibili e i relativi parametri, senza descrivere l'algoritmo interno che le realizzerà.

---

# Documento di Analisi dei Requisiti

Le informazioni prodotte durante la definizione e la specifica dei requisiti non devono rimanere disperse. Vengono organizzate nel **Documento di Analisi dei Requisiti**, chiamato negli appunti anche **Documento di Specifica**.

Il documento descrive principalmente il **dominio del problema**, cioè ciò che il sistema deve soddisfare, e non il **dominio della soluzione**, cioè le decisioni progettuali su come realizzarlo.

Questa distinzione è fondamentale:

- **requisiti e specifica** → cosa deve essere ottenuto;
- **progettazione** → come costruire una soluzione che lo ottenga.

Il documento non serve soltanto all'inizio del progetto. Diventa un riferimento anche per:

- progettazione;
- sviluppo;
- testing;
- manutenzione;
- gestione delle modifiche.

Tra i soggetti che possono contribuire o utilizzarlo troviamo:

- cliente;
- manager;
- system engineer;
- system test engineer;
- maintenance engineer.

## Tracciabilità

Poiché i requisiti possono cambiare, è importante mantenere **relazioni di tracciabilità**.

La tracciabilità permette di sapere, per esempio:

- da quale esigenza nasce un requisito di sistema;
- quali componenti di progetto dipendono da quel requisito;
- quali test verificano quel requisito;
- quali altri requisiti potrebbero essere coinvolti da una modifica.

In questo modo, quando un requisito cambia, è possibile effettuare una **impact analysis**, cioè valutare quali parti del progetto potrebbero dover essere modificate.

## Struttura del documento

Negli appunti viene utilizzato come riferimento il template storico **IEEE 830-1998**, articolato in sezioni come:

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

L'idea da conservare non è imparare il template come una lista arbitraria, ma capire che un documento di requisiti deve raccogliere in modo **strutturato, versionabile e tracciabile** ciò che il sistema dovrà soddisfare.

---

# Requirements Engineering

Finora abbiamo visto **che cosa sono i requisiti e come possono essere documentati**. Rimane il problema più ampio: come arriviamo a requisiti sufficientemente corretti e come li manteniamo validi mentre il progetto evolve?

Da qui nasce la **Requirements Engineering**, cioè il processo sistematico con cui i requisiti vengono studiati lungo il ciclo di vita.

Nel materiale del corso il processo viene organizzato in cinque grandi attività:

1. **Studio di Fattibilità**;
2. **Identificazione e Analisi dei Requisiti**;
3. **Specifica dei Requisiti**;
4. **Convalida dei Requisiti**;
5. **Gestione dei Requisiti**.

Queste attività vengono presentate in quest'ordine per comprenderne il ruolo, ma nella pratica i requisiti vengono raffinati e modificati più volte durante il progetto.

## 1. Studio di Fattibilità

Lo **studio di fattibilità** avviene prima di investire seriamente nello sviluppo.

La domanda è:

**Ha senso realizzare questo sistema?**

Non si limita quindi a chiedere se il software sia teoricamente programmabile. Si valuta se il progetto sia praticabile rispetto a fattori come:

- tecnologie disponibili;
- costi;
- tempi;
- risorse;
- obiettivi dell'organizzazione;
- possibilità di soddisfare le necessità degli utenti.

Le informazioni possono essere raccolte tramite colloqui con:

- client manager;
- software engineer esperti del dominio;
- esperti tecnologici;
- utenti finali.

L'output è un **report di fattibilità** che supporta la decisione di procedere o meno con il progetto.

## 2. Identificazione e Analisi dei Requisiti

Se il progetto è considerato fattibile, bisogna capire che cosa serve realmente agli interessati.

Qui compare il concetto di **stakeholder**.

Uno **stakeholder** è una persona, un gruppo o un'organizzazione che ha un interesse nel sistema o può essere influenzato dal suo funzionamento.

Non coincide necessariamente con l'utente finale. Possono essere stakeholder, per esempio:

- cliente;
- utenti;
- manager;
- personale di manutenzione;
- amministratori;
- soggetti che devono rispettare normative o procedure legate al sistema.

L'identificazione e analisi dei requisiti comprende diversi compiti collegati tra loro.

### Comprensione del dominio

Prima di interpretare correttamente le esigenze, l'analista deve capire il **dominio applicativo**.

Se deve sviluppare software per un ufficio postale, non può analizzare correttamente i requisiti senza comprendere almeno i processi postali coinvolti.

### Raccolta dei requisiti - Requirements Elicitation

La **requirements elicitation** è l'attività con cui si fanno emergere le esigenze degli stakeholder.

Il termine *elicitation* è importante: spesso i requisiti non sono già pronti e scritti da qualche parte. Devono essere fatti emergere tramite interazione, osservazione e analisi.

### Classificazione

I requisiti raccolti vengono organizzati in gruppi coerenti, per esempio:

- gestione dei dati;
- interfaccia;
- sicurezza;
- amministrazione;
- prestazioni.

La classificazione rende più semplice analizzarli e individuare relazioni o conflitti.

### Risoluzione dei conflitti

Stakeholder diversi possono chiedere cose incompatibili.

L'analisi deve quindi individuare le contraddizioni e arrivare a una formulazione coerente del sistema da realizzare.

### Assegnazione delle priorità

Non tutti i requisiti hanno la stessa importanza.

La priorità è particolarmente rilevante in approcci incrementali, nei quali i requisiti più importanti possono essere implementati nelle prime build.

### Verifica dei requisiti

I requisiti raccolti vengono controllati per individuare problemi come:

- incompletezza;
- inconsistenza;
- ambiguità;
- difficoltà di verifica.

### Tecniche di identificazione

Per far emergere i requisiti si possono utilizzare diverse tecniche.

#### Prototipazione

Si costruisce un prototipo che permette agli utenti di interagire con una rappresentazione anticipata del sistema e di chiarire esigenze che a parole erano difficili da esprimere.

#### Casi d'uso e scenari

Si descrivono situazioni concrete di utilizzo del sistema: chi lo usa, con quale obiettivo e quali interazioni avvengono.

Questo aiuta a trasformare bisogni generici in comportamenti osservabili.

#### Etnografia

L'analista osserva direttamente il lavoro degli utenti e dell'organizzazione nel contesto reale.

È utile quando alcune attività sono talmente abituali per gli utenti da non essere esplicitate durante un'intervista.

## 3. Specifica dei Requisiti

La **specifica** trasforma quanto emerso dall'elicitation e dall'analisi in una rappresentazione sufficientemente precisa da guidare le fasi successive.

Le tecniche possono essere disposte su un continuum di formalità:

- **informali** → soprattutto linguaggio naturale;
- **semi-formali** → modelli e notazioni grafiche con regole definite;
- **formali** → notazioni matematiche con semantica rigorosa.

Più avanti vedremo Petri Net, FSM e Z come esempi di specifiche formali, ed ERD/DFD come esempi di modellazione semi-formale.

## 4. Convalida dei Requisiti

La **convalida dei requisiti** cerca di capire se i requisiti descritti rappresentano davvero ciò che gli stakeholder necessitano e se sono utilizzabili come base affidabile per lo sviluppo.

È importante individuare gli errori qui perché un requisito sbagliato può propagarsi nel progetto e nel codice, rendendo molto più costosa la correzione successiva.

I controlli riguardano aspetti come:

- **validità** → i requisiti corrispondono alle reali necessità?
- **consistenza** → sono compatibili tra loro?
- **completezza** → manca qualcosa di necessario?
- **realizzabilità** → possono essere implementati con le risorse e tecnologie disponibili?
- **verificabilità** → possiamo dimostrare se sono stati soddisfatti?

### Tecniche di convalida

#### Revisioni informali

Altre persone esaminano i requisiti e cercano problemi, senza un processo particolarmente rigido.

#### Revisioni formali

Sono attività più strutturate.

Tra quelle citate nel corso:

- **Walkthrough**:
  - il documento viene esaminato passo per passo;
  - i partecipanti discutono il contenuto per individuare errori;
- **Inspection**:
  - processo più rigoroso;
  - ruoli e procedure definiti;
  - maggiore costo organizzativo, ma anche maggiore sistematicità.

#### Prototipazione

Il prototipo permette di verificare con gli utenti se quanto specificato corrisponde alle loro esigenze.

#### Generazione dei Test Case

Provare a derivare casi di test dai requisiti è un modo efficace per evidenziare requisiti vaghi o incompleti.

Se non riusciamo a stabilire quale comportamento dovrebbe essere osservato per verificare un requisito, il problema potrebbe essere nella formulazione del requisito stesso.

#### Analisi automatizzata di consistenza

Quando i requisiti sono espressi mediante notazioni formali, alcuni controlli possono essere supportati automaticamente da tool.

## 5. Gestione dei Requisiti

I requisiti non restano necessariamente fermi dopo l'approvazione del documento.

Possono cambiare perché:

- cambia l'ambiente;
- gli stakeholder comprendono meglio il problema;
- l'introduzione del sistema modifica il modo di lavorare;
- cambiano altri sistemi con cui il software deve essere compatibile.

La **Requirements Management** è quindi l'attività con cui vengono identificati e controllati i cambiamenti dei requisiti durante il ciclo di vita.

### Requisiti stabili e volatili

In base alla probabilità di cambiamento distinguiamo:

- **requisiti stabili** → hanno bassa probabilità di modifica;
- **requisiti volatili** → hanno maggiore probabilità di cambiare.

I requisiti volatili vengono ulteriormente distinti in:

- **mutabili** → cambiano per modifiche dell'ambiente operativo;
- **emergenti** → emergono quando aumenta la comprensione del sistema e delle esigenze;
- **consequenziali** → nascono come conseguenza dell'introduzione stessa del nuovo sistema;
- **di compatibilità** → cambiano per mantenere compatibilità con altri sistemi o processi aziendali.

### Come si gestisce una modifica

La gestione richiede almeno:

- identificazione univoca dei requisiti;
- valutazione della modifica;
- analisi di costi e impatto;
- decisione sull'accettazione;
- aggiornamento del documento;
- mantenimento dei collegamenti di tracciabilità.

Tool CASE dedicati alla Requirements Engineering possono aiutare a mantenere requisiti, versioni e collegamenti. Negli appunti viene citato **IBM DOORS** come esempio storico e molto diffuso di questo tipo di strumento.

---

# Dalla specifica naturale alle specifiche formali

Il linguaggio naturale è semplice da usare e comprensibile, ma porta con sé il rischio di ambiguità.

Per sistemi ordinari questo compromesso può essere accettabile, soprattutto se il linguaggio naturale viene accompagnato da modelli e revisioni. Per sistemi in cui un errore può avere conseguenze molto gravi, può invece essere utile una specifica più rigorosa.

Da qui nasce la distinzione:

- **specifiche informali** → linguaggio naturale;
- **specifiche semi-formali** → modelli e diagrammi con sintassi definita;
- **specifiche formali** → modelli matematici con sintassi e semantica rigorose.

L'aumento di formalità comporta due effetti opposti:

- maggiore precisione e possibilità di analisi automatica;
- maggiore costo e necessità di personale competente.

Per questo le specifiche formali vengono utilizzate soprattutto quando il beneficio giustifica l'effort aggiuntivo, per esempio in parti critiche di un sistema.

---

# Specifiche Formali

Una **specifica formale** descrive proprietà o comportamento del sistema mediante una notazione matematica definita in modo rigoroso.

Nel corso vengono presentati tre esempi, che non rappresentano la stessa cosa nello stesso modo:

- **Petri Net** → particolarmente adatte a rappresentare concorrenza, sincronizzazione e possibili evoluzioni del sistema;
- **Finite State Machine** → rappresentano direttamente gli stati del sistema e le transizioni tra essi;
- **linguaggio Z** → usa schemi matematici per descrivere stato e operazioni.

Questa classificazione va tenuta presente prima di studiare i singoli formalismi: sono strumenti diversi che condividono l'obiettivo di rendere la specifica precisa e analizzabile.

## Petri Net

Le **Petri Net** sono un modello matematico e grafico utile per descrivere sistemi in cui possono verificarsi più attività concorrenti e in cui è importante rappresentare condizioni di sincronizzazione.

Prima di introdurre i simboli bisogna chiarire che cosa stiamo modellando.

### Sistema, stato ed evento nel contesto di una Petri Net

Per **sistema** intendiamo ciò di cui vogliamo descrivere il comportamento: può essere un programma, una parte di software, un protocollo o un insieme di processi che interagiscono.

In ogni istante il sistema si trova in una determinata **situazione**, cioè possiede certe condizioni e risorse disponibili. Nella Petri Net questa situazione viene rappresentata dalla distribuzione dei token nella rete.

Un **evento o azione** è qualcosa che può accadere e che porta il sistema da una situazione a un'altra.

Esempi concettuali:

- una risorsa diventa disponibile;
- arriva un messaggio;
- viene premuto un pulsante;
- termina un'elaborazione;
- due processi raggiungono un punto di sincronizzazione.

La Petri Net serve a rappresentare **quali eventi possono accadere in una certa situazione e come questi eventi modificano la situazione del sistema**.

### Primitive della rete

Una Petri Net di base utilizza tre elementi grafici fondamentali.

#### Place

Un **place**, rappresentato da un cerchio, rappresenta una **condizione** o una posizione logica significativa del sistema.

Una condizione non è necessariamente una variabile booleana del programma. È un fatto del modello che ci interessa sapere se sia attivo o disponibile.

Esempi:

- "risorsa disponibile";
- "messaggio ricevuto";
- "ascensore al piano terra";
- "processo pronto".

#### Transition

Una **transition**, rappresentata da una barra, rappresenta un evento o un'azione che può modificare la situazione del sistema.

La transition non descrive semplicemente uno stato: rappresenta **il cambiamento**.

#### Arc

Gli **arc**, rappresentati da frecce orientate, collegano:

- place → transition;
- transition → place.

Non collegano direttamente due place o due transition nella Petri Net di base.

Gli archi indicano:

- quali place forniscono le condizioni necessarie a una transition;
- quali place ricevono token dopo l'esecuzione della transition.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/15_agosto_appunti/assets/p033-fig-033.png|650]]

Nella figura si vedono place, transition e archi. I pallini neri presenti nei place introducono il concetto successivo: i **token**.

### Token e Marking

Un **token** è un marcatore inserito all'interno di un place.

La sua presenza indica che, nella situazione corrente, la condizione o risorsa rappresentata da quel place è disponibile nella quantità indicata.

Un place può contenere anche più token.

La **marcatura** (*marking*) della rete è semplicemente la distribuzione dei token nei vari place in un determinato istante.

Quindi:

**token nei place → marcatura corrente → situazione/stato corrente rappresentato dalla rete**

Se abbiamo quattro place `p1`, `p2`, `p3`, `p4`, una marcatura può essere rappresentata come un vettore:

`M = (1, 2, 0, 1)`

che significa:

- `p1` contiene 1 token;
- `p2` contiene 2 token;
- `p3` contiene 0 token;
- `p4` contiene 1 token.

### Quando una transition è enabled

Una transition è **enabled**, cioè abilitata, quando la marcatura corrente soddisfa le condizioni necessarie perché possa essere eseguita.

Nel modello semplice usato nel corso, ciò significa che i place collegati in ingresso dispongono dei token richiesti dagli archi.

Attenzione alla distinzione:

- **enabled** → la transition *può* scattare;
- **firing** → la transition *scatta effettivamente*.

Essere abilitata non significa quindi che una transition sia già stata eseguita.

### Firing

Il **firing** è l'esecuzione effettiva di una transition abilitata.

Quando avviene il firing:

1. vengono consumati i token richiesti dai place di input;
2. vengono prodotti token nei place di output secondo gli archi presenti;
3. cambia la distribuzione dei token;
4. cambia quindi la marcatura della rete;
5. la rete rappresenta una nuova situazione del sistema.

La catena concettuale è:

**transition enabled → firing → modifica dei token → nuova marcatura → nuovo stato rappresentato**

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/15_agosto_appunti/assets/p034-fig-034.png|650]]

Negli esempi del corso si parte da una marcatura iniziale e si provano differenti transition abilitate. Se più transition sono abilitate contemporaneamente, possono esistere più possibili evoluzioni della rete. Analizzarle serve proprio a verificare se alcune sequenze portino a comportamenti indesiderati.

### Marking iniziale, intermedio e finale

- **marking iniziale** → distribuzione dei token da cui parte l'analisi;
- **marking intermedio** → distribuzione ottenuta dopo uno o più firing;
- **marking finale** → situazione in cui si conclude l'esecuzione considerata, per esempio perché non ci sono più transition abilitate o perché è stato raggiunto uno stato finale previsto dal modello.

### Inhibitor Arc

Ora che il firing è stato definito, possiamo introdurre l'**inhibitor arc**.

Un inhibitor arc esprime una condizione negativa: viene usato quando una transition deve poter scattare **solo in assenza di token in un determinato place**.

Quindi non serve a "far scorrere" token come un arco normale. Serve a controllare se la presenza di un token debba **inibire**, cioè impedire, il firing della transition.

Nel caso mostrato negli appunti per l'ascensore, questo meccanismo permette, per esempio, di evitare di aggiungere ripetutamente lo stesso evento quando una condizione è già attiva.

### Perché le Petri Net sono utili

Le Petri Net permettono di rappresentare esplicitamente:

- concorrenza;
- sincronizzazione;
- disponibilità di risorse;
- dipendenze tra eventi;
- evoluzioni alternative del sistema.

Il loro obiettivo non è semplicemente disegnare un flusso, ma consentire di analizzare le possibili evoluzioni della rete e verificare proprietà del comportamento.

### Limiti e varianti

Nella Petri Net di base una transition rappresenta un evento privo di durata esplicita. Questo limita la capacità di modellare direttamente aspetti temporali o prestazionali.

Negli appunti vengono citate alcune estensioni:

- **GSPN - Generalized Stochastic Petri Net**:
  - associa informazioni temporali/stocastiche alle transition;
  - permette di studiare anche aspetti prestazionali;
- **CPN - Colored Petri Net**:
  - associa informazioni o "colori" ai token;
  - permette di distinguere classi diverse di token senza replicare inutilmente parti della rete.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/15_agosto_appunti/assets/p035-fig-035.png|700]]

La parte superiore della pagina introduce anche il formalismo successivo: le **Finite State Machine**.

---

## Finite State Machine - FSM

Le **Finite State Machine** rappresentano il comportamento di un sistema mediante un insieme finito di **stati** e di **transizioni tra stati**.

La differenza concettuale principale rispetto alla Petri Net è il modo in cui viene rappresentato lo stato:

- nella **Petri Net** lo stato è implicito nella marcatura, cioè nella distribuzione dei token;
- nella **FSM** lo stato viene rappresentato direttamente come una primitiva del modello.

Una FSM contiene quindi:

- **stati** → situazioni discrete in cui il sistema può trovarsi;
- **transizioni** → passaggi da uno stato a un altro;
- **eventi/input** → ciò che provoca o abilita il passaggio;
- uno **stato iniziale**;
- eventualmente uno o più **stati finali**.

Esempio concettuale per una porta:

`Chiusa --apri--> Aperta --chiudi--> Chiusa`

Qui "Chiusa" e "Aperta" sono stati, mentre `apri` e `chiudi` sono eventi che provocano la transizione.

Nel materiale del corso viene mostrato l'esempio di una cassaforte nella quale una sequenza corretta di movimenti porta allo stato di apertura, mentre sequenze errate possono portare allo stato di allarme.

Quando il numero degli stati aumenta, il diagramma può diventare molto complesso. Per questo può essere affiancato da una **Table of Next States**, che descrive quale stato viene raggiunto a partire da uno stato corrente in risposta a un determinato input.

---

## Linguaggio Z

Petri Net e FSM sono formalismi generali utilizzabili per descrivere sistemi dinamici. Il corso introduce poi **Z**, un linguaggio di specifica formale pensato specificamente per descrivere sistemi mediante notazione matematica.

La primitiva fondamentale di Z è lo **schema**.

Uno schema raggruppa:

- un **nome**;
- **dichiarazioni** di variabili e relativi tipi;
- **predicati**, cioè proprietà e vincoli che devono valere sulle variabili.

In questo modo uno schema può essere usato per descrivere sia:

- lo **stato** del sistema;
- le **operazioni** che modificano quello stato.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/15_agosto_appunti/assets/p036-fig-036.png|650]]

Nell'esempio dei pulsanti dell'ascensore vengono definiti insiemi di pulsanti e vincoli tra questi insiemi. La parte dichiarativa dice **quali elementi esistono e di che tipo sono**; la parte dei predicati dice **quali relazioni devono essere vere**.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/15_agosto_appunti/assets/p037-fig-037.png|650]]

Quando lo schema descrive un'operazione, vengono specificati anche gli input e l'effetto sullo stato.

Negli appunti:

- `?` identifica un parametro di input;
- `!` viene usato per un output;
- il nuovo valore di una variabile di stato viene distinto dal valore precedente mediante la notazione prevista dal formalismo.

L'obiettivo non è imparare in questa fase tutta la sintassi di Z, ma capire il cambio di approccio: invece di descrivere il comportamento con frasi in linguaggio naturale, si costruisce una specifica matematica con significato rigorosamente definito.

Questo riduce l'ambiguità, ma richiede maggiore effort e competenze specialistiche.

---

# Specifiche Semi-Formali e Modelli del Sistema

Le specifiche formali offrono grande precisione, ma possono essere costose. Tra il linguaggio naturale e la formalizzazione matematica completa esiste un livello intermedio: le **specifiche semi-formali**.

L'idea è rappresentare il sistema mediante **modelli**.

Un **modello del sistema** è una rappresentazione astratta che mette in evidenza alcuni aspetti del sistema e ne trascura altri non rilevanti per lo scopo del modello.

Un singolo modello non riesce normalmente a rappresentare tutto. Per questo il corso distingue tre punti di vista complementari:

1. **modello dei dati**;
2. **modello comportamentale**;
3. **modello dinamico**.

## Modello dei dati

Descrive gli aspetti **statici e strutturali** dei dati:

- quali entità o classi esistono;
- quali informazioni possiedono;
- quali relazioni le collegano.

Esempi di notazioni:

- **ERD** nei metodi strutturati;
- **Class Diagram** nell'approccio Object Oriented.

## Modello comportamentale

Descrive le **funzioni e i servizi** del sistema, cioè come i dati vengono elaborati o come gli attori interagiscono con le funzionalità.

Esempi:

- **Data Flow Diagram** nei metodi strutturati;
- Use Case, Activity e Interaction Diagram nell'approccio Object Oriented.

## Modello dinamico

Descrive l'evoluzione del sistema nel tempo in termini di:

- stati;
- eventi;
- transizioni;
- effetti delle operazioni sullo stato.

Nell'approccio UML questo ruolo viene svolto, tra gli altri, dagli **State Diagram**.

Questi tre modelli non sono tre sistemi diversi: sono **tre viste dello stesso sistema**, ciascuna orientata a un tipo di informazione differente.

Da qui il corso distingue poi due famiglie di metodi:

- **analisi strutturata/procedurale**;
- **analisi orientata agli oggetti**.

L'approccio Object Oriented e UML saranno approfonditi nella parte successiva. Per ora vediamo due notazioni storicamente centrali nell'analisi strutturata: ERD e DFD.

---

# ERD e DFD nell'analisi strutturata

ERD e DFD vengono spesso mostrati insieme, ma rappresentano due aspetti differenti.

- **ERD** → struttura dei dati e relazioni tra entità;
- **DFD** → flusso dei dati attraverso i processi del sistema.

## Entity Relationship Diagram - ERD

Un **ERD** (*Entity Relationship Diagram*) rappresenta le entità rilevanti e le relazioni esistenti tra esse.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/15_agosto_appunti/assets/p038-fig-038.png|450]]

I concetti fondamentali sono:

- **entità** → oggetti o concetti di cui interessa memorizzare informazioni;
- **attributi** → proprietà delle entità;
- **relazioni** → collegamenti logici tra entità.

L'ERD fornisce quindi soprattutto una vista **statica** dei dati.

## Data Flow Diagram - DFD

Un **DFD** (*Data Flow Diagram*) descrive invece come i dati entrano nel sistema, vengono elaborati, memorizzati e inviati verso altre destinazioni.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/15_agosto_appunti/assets/p038-fig-039.png|500]]

Nel corso vengono utilizzati quattro elementi principali:

- **source/destination of data** → entità esterne da cui arrivano o verso cui vanno i dati;
- **data flow** → flussi di dati, rappresentati da frecce;
- **process** → funzione che trasforma i dati;
- **data store** → archivio in cui i dati vengono memorizzati.

Un punto importante: il DFD **non rappresenta necessariamente l'ordine temporale delle operazioni**.

Serve a rispondere a domande come:

- da dove arriva questo dato?
- quale processo lo trasforma?
- dove viene memorizzato?
- verso quale processo o soggetto viene inviato?

### Raffinamento gerarchico

Un DFD può essere costruito a diversi livelli di astrazione.

Si può partire da una rappresentazione molto generale e poi **raffinare** un processo mostrando al suo interno processi più piccoli.

Questa idea di raffinamento progressivo è alla base del metodo SSA visto subito dopo.

---

# Structured System Analysis - SSA

La **Structured System Analysis**, indicata come **SSA**, è un metodo di analisi strutturata che guida l'analista nella costruzione della specifica mediante una sequenza di passi.

Il principio centrale è lo **step-wise refinement**: invece di tentare di descrivere immediatamente il sistema a massimo livello di dettaglio, si parte da una rappresentazione generale e la si raffina progressivamente.

Quindi:

**visione generale → dettaglio crescente → specifica completa**

Nel materiale del corso SSA viene descritto mediante **9 step**.

## Step 1 - Costruire il Data Flow Diagram

Si parte dai requisiti utente o da un eventuale prototipo per identificare:

- sorgenti dei dati;
- destinazioni;
- flussi;
- processi che trasformano i dati;
- archivi.

Il DFD viene raffinato progressivamente fino a descrivere con maggiore precisione i processi del sistema.

## Step 2 - Decidere cosa automatizzare e con quale modalità

Non ogni attività descritta nel dominio deve necessariamente essere automatizzata.

Si effettua quindi un'analisi costi-benefici e, per le attività automatizzate, si distingue tra:

- **online processing** → elaborazione effettuata in risposta all'interazione o all'arrivo dei dati;
- **batch processing** → dati accumulati e processati successivamente in gruppi.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/15_agosto_appunti/assets/p039-fig-040.png|700]]

L'esempio mostra come alcuni processi possano essere trattati online mentre altri vengano differiti e gestiti in batch.

## Step 3 - Raffinare i Data Flow

Ogni flusso di dati viene descritto in modo più preciso.

Un dato apparentemente semplice come `customer_details` può in realtà essere una struttura composta da:

- nome;
- indirizzo;
- identificativo;
- altri campi.

Il raffinamento continua finché la struttura dei dati è sufficientemente precisa per la specifica.

## Step 4 - Definire la logica dei processi

Dopo aver identificato un processo nel DFD bisogna specificarne il comportamento.

Una tecnica possibile è l'uso di un **decision tree**, che mostra quali decisioni vengono prese in base alle condizioni disponibili.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/15_agosto_appunti/assets/p039-fig-041.png|500]]

## Step 5 - Definire i Data Store

Si specifica il contenuto degli archivi:

- quali dati contengono;
- come sono strutturati;
- quali campi possono essere usati per recuperarli.

Negli appunti viene mostrato un **DIAD - Data Immediate Access Diagram** come tecnica utilizzabile per questo scopo.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/15_agosto_appunti/assets/p040-fig-042.png|500]]

L'esempio indica, tra le altre cose, quali campi consentono un accesso diretto ai record.

## Step 6 - Definire le risorse fisiche

Si dettagliano le risorse necessarie per memorizzazione e organizzazione dei dati.

Il materiale storico fa riferimento a scelte come:

- organizzazione dei file;
- supporti di memorizzazione;
- modalità di accesso;
- struttura dei record.

Molti dettagli tecnologici specifici sono oggi cambiati, ma il principio resta quello di trasformare progressivamente una specifica logica in requisiti fisici più concreti.

## Step 7 - Specificare Input e Output

Si definiscono le modalità con cui dati entrano ed escono dal sistema:

- schermate di input;
- layout;
- report;
- output da stampare;
- formati previsti.

Negli appunti questo step riflette anche i vincoli delle interfacce disponibili all'epoca in cui il metodo veniva applicato.

## Step 8 - Determinare il dimensionamento

Si stimano quantità come:

- volume degli input;
- numero di record;
- dimensioni dei file;
- frequenza dei report;
- quantità di dati da gestire.

Queste informazioni servono a capire la scala del sistema da realizzare.

## Step 9 - Determinare i requisiti hardware

Infine si traducono le esigenze individuate in requisiti relativi alle risorse fisiche:

- capacità di memorizzazione;
- backup;
- terminali;
- dispositivi di output;
- eventuale nuovo hardware necessario.

L'aspetto più importante di SSA non è memorizzare tecnologie ormai superate, ma comprendere il metodo generale: **procedere per raffinamenti successivi**, partendo dal problema e arrivando gradualmente a una specifica sempre più dettagliata e utilizzabile per la progettazione.
