# Analisi Orientata agli Oggetti (OOA) e UML

Nella parte precedente abbiamo visto che una **specifica semi-formale** descrive il sistema tramite modelli, ciascuno concentrato su un diverso punto di vista:

- **modello dei dati** → struttura statica delle informazioni;
- **modello comportamentale** → funzionalità offerte dal sistema e collaborazione tra gli oggetti;
- **modello dinamico** → evoluzione dello stato del sistema o dei suoi oggetti.

Finora abbiamo visto soprattutto l'approccio dell'**analisi strutturata**, con strumenti come ERD e DFD. Ora passiamo all'altro grande approccio previsto dal corso: l'**Object Oriented Analysis (OOA)**.

---

# Object Oriented Analysis - OOA

L'**Object Oriented Analysis (OOA)** è la fase di analisi in cui il sistema viene descritto secondo il paradigma orientato agli oggetti.

L'obiettivo resta quello tipico della fase di analisi:

- stabilire **COSA** deve fare il prodotto software;
- descriverlo in modo corretto, completo e consistente;
- non decidere ancora **COME** verrà implementato.

Il COME sarà affrontato nella fase successiva, detta **Object Oriented Design (OOD)**.

Quindi:

- **OOA** → analizza il problema e costruisce la specifica orientata agli oggetti;
- **OOD** → progetta la soluzione concreta che realizzerà quella specifica.

## Cosa entra e cosa esce dall'OOA

Un metodo di OOA lavora a partire dai requisiti già individuati.

- **Input** → requisiti utente e informazioni raccolte durante la Requirements Engineering.
- **Output** → un insieme di modelli del sistema che costituiscono la specifica software.

Questi modelli devono rappresentare tre aspetti complementari dello stesso sistema:

1. **struttura dei dati** → quali oggetti esistono e come sono collegati;
2. **comportamento** → quali servizi devono essere offerti e come gli oggetti collaborano;
3. **dinamica** → come alcuni oggetti cambiano stato durante l'esecuzione.

Non si tratta quindi di tre sistemi diversi, ma di **tre viste dello stesso sistema**.

## OOA non è un processo sequenziale

La costruzione dei modelli non avviene una volta per tutte e in rigida sequenza.

L'OOA è:

- **iterativa** → i modelli vengono raffinati progressivamente;
- **incrementale** → a ogni iterazione vengono aggiunti nuovi dettagli;
- **parallela** → i modelli si influenzano a vicenda.

Per esempio:

- dal modello dei dati identifichiamo classi e associazioni;
- dal modello comportamentale scopriamo quali operazioni devono offrire quelle classi;
- analizzando le interazioni possono emergere nuove classi non individuate all'inizio.

Quindi non dobbiamo immaginare il lavoro come:

`modello dei dati -> finito -> modello comportamentale -> finito -> modello dinamico`

ma come un ciclo di raffinamenti in cui i modelli vengono continuamente aggiornati.

---

# Dai metodi OOA a UML

Prima di UML esistevano diversi metodi Object Oriented, ciascuno con proprie tecniche e notazioni.

Tra quelli richiamati nel corso:

- **Objectory** → fortemente basato sugli scenari e sui Use Case;
- **OMT - Object Modeling Technique** → focalizzato soprattutto sull'analisi OOA;
- **Booch** → orientato maggiormente alla progettazione OOD.

Il problema era che metodi differenti usavano simboli e notazioni differenti per rappresentare concetti simili.

Da questa esigenza nasce **UML - Unified Modeling Language**.

## Che cos'è UML

**UML è un linguaggio standard di modellazione visuale per sistemi orientati agli oggetti.**

È importante distinguere bene tre concetti:

- **metodo** → dice come organizzare e svolgere il lavoro di analisi/progettazione;
- **processo** → stabilisce attività e ordine con cui vengono eseguite;
- **linguaggio di modellazione** → fornisce simboli e regole per rappresentare i modelli.

UML appartiene alla terza categoria.

Quindi:

> **UML non è un metodo di OOA e non è un processo software. È il linguaggio con cui rappresentiamo graficamente i modelli.**

Il corso considera nove formalismi UML fondamentali:

- **Use Case Diagram** → scenari di utilizzo e interazione con gli attori;
- **Class Diagram** → classi, attributi, operazioni e relazioni;
- **State Diagram** → stati e transizioni di un oggetto;
- **Activity Diagram** → flussi di attività;
- **Sequence Diagram** → messaggi tra oggetti ordinati temporalmente;
- **Collaboration Diagram** → interazioni tra oggetti mettendo in evidenza le loro relazioni;
- **Object Diagram** → istanze concrete di classi e relazioni tra esse;
- **Component Diagram** → struttura e dipendenze dei componenti software;
- **Deployment Diagram** → distribuzione del software sui nodi di esecuzione.

Durante l'OOA ci concentreremo soprattutto sui diagrammi che servono a descrivere:

- dati;
- comportamento;
- dinamica.

Component e Deployment Diagram saranno più importanti nella progettazione.

---

# Modello dei Dati: Class Diagram

Nel paradigma Object Oriented, il sistema viene pensato come un insieme di **oggetti che collaborano**.

Prima di capire come collaborano, dobbiamo quindi capire:

- quali tipi di oggetti devono esistere;
- quali informazioni devono contenere;
- quali relazioni li collegano.

Questo è il compito del **modello dei dati**, costruito principalmente tramite il **Class Diagram**.

## Classe e oggetto

Una **classe** descrive un insieme di oggetti dello stesso tipo, specificando le caratteristiche comuni che possiedono.

Un **oggetto** è una singola istanza concreta di una classe.

Esempio:

- `Student` → classe;
- uno specifico studente registrato nel sistema → oggetto della classe `Student`.

Nel Class Diagram una classe può contenere:

- **nome**;
- **attributi**;
- **operazioni**.

### Attributi

Gli **attributi** rappresentano le informazioni che descrivono lo stato di un oggetto.

Per esempio, una classe `Student` potrebbe avere attributi come:

- `student_number`;
- `surname`;
- `name`.

### Operazioni

Le **operazioni** rappresentano i servizi che gli oggetti della classe mettono a disposizione.

Durante le prime iterazioni dell'OOA, però, non conosciamo ancora tutte le operazioni: molte verranno ricavate più avanti dal modello comportamentale e dai messaggi scambiati tra gli oggetti.

Quindi la costruzione del Class Diagram procede progressivamente:

1. identificazione delle classi;
2. identificazione degli attributi;
3. identificazione delle associazioni;
4. successivamente, aggiunta delle operazioni.

---

# Quali tipi di classi cerchiamo

Durante l'analisi il corso distingue tre categorie di classi, che diventeranno particolarmente importanti nell'approccio BCE:

- **Entity classes** → rappresentano informazioni e concetti rilevanti del dominio;
- **Boundary classes** → gestiscono l'interazione tra sistema e attori;
- **Control classes** → gestiscono la logica e coordinano l'esecuzione degli scenari.

Nelle prime iterazioni del modello dei dati si parte soprattutto dalle **Entity classes**, perché dobbiamo prima capire quali informazioni il sistema deve rappresentare.

Le Boundary e Control classes emergono più chiaramente quando analizzeremo il comportamento del sistema.

---

# Identificazione delle Entity Classes

Individuare le classi non significa trasformare automaticamente ogni sostantivo dei requisiti in una classe.

L'obiettivo è trovare i concetti del dominio che il software deve effettivamente rappresentare tramite oggetti.

Il corso presenta diversi approcci. Non sono fasi obbligatorie da eseguire sempre tutte: sono **strategie alternative o combinabili** per arrivare all'identificazione delle classi.

## Noun Phrase Approach

Si parte dal testo dei requisiti e si individuano le **frasi nominali**, in particolare i sostantivi.

Ogni sostantivo viene inizialmente trattato come **classe candidata**.

Successivamente le candidate vengono classificate in:

- **Relevant** → il concetto deve essere rappresentato come classe;
- **Irrelevant** → non è rilevante per il dominio software;
- **Fuzzy** → non ci sono ancora informazioni sufficienti per decidere.

Il punto importante è che il metodo non termina con l'individuazione dei sostantivi: serve sempre una valutazione dell'analista.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p044-fig-043.png|500]]

L'esempio dell'università mostra proprio questo passaggio: termini come `Course` o `Degree` possono diventare classi rilevanti, mentre concetti generici come `number` non lo diventano automaticamente.

## Common Class Patterns

Questo approccio non parte direttamente dai requisiti, ma da categorie ricorrenti nel dominio, per esempio:

- Concepts;
- Events;
- Organizations;
- People;
- Places.

L'analista usa la conoscenza del dominio per cercare concetti appartenenti a queste categorie.

È utile per non dipendere esclusivamente dal testo dei requisiti, ma è meno sistematico e può introdurre ambiguità.

## Use Case Driven

Le classi vengono cercate partendo dagli scenari descritti nei **Use Case**.

In particolare, nel metodo presentato nel corso:

- gli attori individuati nei Use Case diventano automaticamente candidate Entity classes;
- il testo che descrive il caso d'uso viene poi analizzato per trovare altre classi.

Questo metodo funziona bene se i Use Case rappresentano in modo sufficientemente completo gli scenari del sistema.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p046-fig-046.png|500]]

Nell'esempio del telemarketing, gli attori `Telemarketer` e `Supporter` diventano quindi classi rilevanti per il modello dei dati.

## CRC - Class Responsibility Collaborators

Il metodo **CRC** utilizza apposite card su cui vengono indicati:

- nome della classe;
- responsabilità della classe;
- classi con cui deve collaborare.

È particolarmente utile quando esiste già una prima idea delle classi e si vuole verificare se le responsabilità e le collaborazioni sono sensate.

## Mixed Approach

Nella pratica è possibile combinare più tecniche.

Un possibile schema indicato dal corso è:

1. prima identificazione tramite Common Class Patterns;
2. aggiunta di altre classi tramite Noun Phrase e Use Case Driven;
3. verifica delle responsabilità con CRC.

Il vantaggio è che nessuna singola tecnica deve sostenere da sola tutto il lavoro di identificazione.

---

# Quando un concetto merita di diventare una classe

Una candidata non dovrebbe essere mantenuta come Entity class solo perché compare nei requisiti.

Le linee guida del corso richiedono che una classe:

- abbia uno **specifico scopo** nel dominio;
- sia normalmente destinata a generare più istanze;
- possieda più informazioni significative, quindi un insieme di attributi;
- abbia senso come concetto autonomo e non come semplice attributo di un'altra classe;
- possa mettere a disposizione operazioni, anche se inizialmente non sono ancora state identificate.

Uno dei dubbi più comuni è infatti:

> Questo concetto deve diventare una classe oppure basta rappresentarlo come attributo?

La risposta dipende dalla quantità di informazione e dal ruolo che quel concetto deve avere nel sistema.

Se un dato ha solo un valore semplice, può bastare un attributo. Se invece possiede una propria struttura, più proprietà e relazioni con altri oggetti, diventa più naturale modellarlo come classe.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p045-fig-044.png|500]]

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p045-fig-045.png|500]]

Gli esempi Video Store e Contact Management mostrano proprio candidati che inizialmente vengono lasciati come **Fuzzy**, perché non è ancora chiaro se rappresentarli come classe autonoma oppure come attributo.

---

# Specifica delle classi

Una volta identificate le classi, bisogna descriverle in modo coerente.

## Nomi

I nomi delle classi devono:

- essere significativi;
- essere al singolare;
- seguire una convenzione coerente;
- permettere di distinguere chiaramente classi e attributi.

Negli esempi del corso vengono usati nomi di classe in stile `CamelCase`.

Gli attributi adottano invece una convenzione differente, per esempio `snake_case`.

La convenzione precisa è meno importante del principio: **deve essere coerente in tutto il modello**.

## Identificazione degli attributi

Gli attributi vengono aggiunti quando rappresentano informazioni necessarie a descrivere lo stato degli oggetti.

Durante le iterazioni successive i requisiti possono far emergere nuovi attributi oppure mostrare che un concetto inizialmente pensato come attributo deve diventare una classe.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p047-fig-047.png|550]]

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p047-fig-048.png|550]]

L'esempio universitario mostra questo raffinamento: nuove informazioni fanno evolvere il Class Diagram e alcuni concetti inizialmente incerti vengono promossi a vere classi.

## Alcune annotazioni UML sugli attributi

Nel materiale compaiono anche annotazioni usate per esprimere proprietà particolari:

- `<<PK>>` → Primary Key;
- `<<CK>>` → Candidate Key;
- `/attributo` → **derived attribute**, valore calcolato invece di essere memorizzato direttamente;
- `$ attributo` → attributo con **class/static scope**, condiviso dalle istanze della classe.

Gli stereotipi `<<...>>` sono un meccanismo con cui UML può essere esteso per rappresentare informazioni specifiche di un dominio o di un profilo.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p048-fig-049.png|550]]

---

# Associazioni tra classi

Dopo aver identificato classi e attributi, dobbiamo rappresentare **come gli oggetti possono essere collegati tra loro**.

Una **associazione** è una relazione strutturale tra classi che indica che oggetti delle due classi possono essere collegati.

Un indizio importante è la presenza di un attributo il cui tipo non è un tipo elementare ma un'altra classe: in quel caso quell'informazione rappresenta concettualmente un legame tra oggetti.

Per rendere un'associazione comprensibile bisogna specificare almeno:

- nome;
- molteplicità alle estremità;
- quando utile, role name.

## Molteplicità

La **molteplicità** indica quante istanze di una classe possono essere collegate a una singola istanza dell'altra.

Esempi:

- `1` → esattamente una;
- `0..1` → zero oppure una;
- `1..*` → almeno una;
- `0..*` oppure `*` → zero o più.

Va letta sempre rispetto all'estremità opposta.

Esempio concettuale:

- se vicino a `Organization` compare `1`, significa che un determinato `Contact` è collegato a una sola organizzazione;
- se vicino a `Contact` compare `1..*`, significa che una certa organizzazione può essere collegata a uno o più contatti.

## Role Name

Il **role name** descrive il ruolo che gli oggetti assumono nell'associazione.

È utile anche dal punto di vista implementativo, perché può corrispondere al nome del riferimento con cui un oggetto mantiene il collegamento verso l'altro.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p051-fig-052.png|650]]

L'immagine mostra un modello in cui associazioni, molteplicità e role name vengono progressivamente specificati.

## Associazioni ternarie e binarie

Quando una relazione coinvolge tre classi può essere rappresentata come associazione ternaria, ma il corso suggerisce spesso di trasformarla in una rete di associazioni binarie.

Questo può semplificare il modello, anche se eliminare collegamenti ridondanti può rendere alcuni accessi meno efficienti.

Quindi bisogna distinguere:

- **ridondanza concettuale** → un collegamento può essere ricavato transitivamente;
- **efficienza pratica** → mantenere direttamente un collegamento può evitare passaggi intermedi.

---

# Relazioni di contenimento: Aggregation e Composition

Non tutte le associazioni descrivono un semplice collegamento. Alcune esprimono una relazione **whole-part**, cioè contenitore-contenuto.

UML distingue due forme principali, con forza diversa:

- **Aggregation** → contenimento debole;
- **Composition** → contenimento forte.

Prima di distinguerle, il punto comune è questo:

> un oggetto rappresenta il "tutto" e altri oggetti rappresentano le sue "parti".

## Aggregation

L'**Aggregation** è rappresentata con un rombo vuoto dalla parte del contenitore.

Descrive una relazione debole:

- il contenitore mantiene un riferimento alla parte;
- la parte può continuare a esistere indipendentemente dal contenitore;
- cancellare il contenitore non implica necessariamente cancellare la parte.

Nel linguaggio usato dal corso, corrisponde ai casi di contenimento più deboli come **Has** e **Member**.

Dal punto di vista implementativo assomiglia quindi a una normale associazione basata su riferimento.

## Composition

La **Composition** è rappresentata con un rombo pieno dalla parte del contenitore.

È una relazione più forte:

- esiste una dipendenza di vita tra contenitore e contenuto;
- se l'oggetto contenitore viene eliminato, anche le sue parti vengono eliminate;
- il legame esprime quindi una vera appartenenza strutturale.

Il corso la collega ai significati più forti di **Owns** ed **ExclusiveOwns**.

La differenza fondamentale da ricordare è quindi:

- **Aggregation** → la parte può vivere anche senza il contenitore;
- **Composition** → la parte dipende dal contenitore per la propria esistenza nel modello.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p053-fig-054.png|550]]

L'esempio universitario mette a confronto i due casi: la carriera accademica può essere modellata come parte fortemente legata allo studente, mentre altre relazioni richiedono un legame meno forte.

---

# Generalizzazione ed Ereditarietà

Un'altra relazione diversa dalla normale associazione è la **Generalizzazione**.

Si usa quando una classe più specifica rappresenta un caso particolare di una classe più generale.

- classe generale → **superclasse**;
- classe specializzata → **sottoclasse**.

La freccia punta dalla sottoclasse verso la superclasse.

La sottoclasse eredita attributi e operazioni definiti nella superclasse e può aggiungerne di propri.

## Sostituibilità

Il principio di **sostituibilità** indica che un oggetto della sottoclasse può essere usato dove è richiesto un oggetto della superclasse.

Questo funziona perché la sottoclasse possiede almeno le caratteristiche previste dalla superclasse.

Il contrario non è necessariamente valido: un oggetto della superclasse non possiede per forza le caratteristiche aggiuntive della sottoclasse.

## Polimorfismo

Il **polimorfismo** permette a una stessa operazione di avere comportamenti differenti nelle sottoclassi.

Una sottoclasse può quindi ridefinire un'operazione ereditata in modo coerente con il proprio comportamento specifico.

## Classi astratte

Negli esempi del corso alcune classi sono mostrate in corsivo perché sono **abstract classes**.

Una classe astratta:

- raccoglie caratteristiche comuni;
- serve come livello generale della gerarchia;
- non viene usata direttamente per creare oggetti concreti.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p048-fig-049.png|550]]

Nel Video Store, classi generali permettono di raccogliere caratteristiche comuni dei diversi supporti, evitando di duplicare attributi e associazioni nelle classi concrete.

---

# Object Diagram

Dopo aver modellato le classi, può essere utile vedere un esempio concreto di oggetti realmente esistenti in un determinato momento.

L'**Object Diagram** rappresenta:

- istanze di classi;
- valori o stato di oggetti specifici;
- collegamenti tra quelle istanze.

Quindi:

- **Class Diagram** → descrive la struttura generale valida per tutte le istanze;
- **Object Diagram** → mostra una configurazione concreta di oggetti.

Può essere usato per:

- chiarire relazioni complesse tra classi;
- mostrare come gli oggetti sono collegati in uno scenario specifico;
- illustrare una configurazione del sistema in un dato istante.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p055-fig-055.png|500]]

L'immagine mostra oggetti specifici dello scenario universitario e rende concrete relazioni che nel Class Diagram erano espresse a livello di classe.

---

# Dal Modello dei Dati al Modello Comportamentale

Il Class Diagram ci dice **quali oggetti possono esistere e come sono strutturalmente collegati**, ma non basta per spiegare come il sistema offre i propri servizi.

Un software Object Oriented funziona perché gli oggetti **collaborano**.

Questa collaborazione avviene attraverso lo scambio di **messaggi**, cioè richieste con cui un oggetto chiede a un altro di eseguire una determinata operazione.

Per capire quali funzionalità deve offrire il sistema e come vengono realizzate dagli oggetti, passiamo quindi al **modello comportamentale**.

Il corso usa principalmente:

- **Use Case Diagram** → quali scenari e servizi sono disponibili;
- **Activity Diagram** → quale flusso di attività realizza uno scenario;
- **Sequence Diagram** → come collaborano gli oggetti e in quale ordine temporale;
- **Collaboration Diagram** → come collaborano gli oggetti mettendo in evidenza le loro relazioni.

Anche qui i diagrammi non sono indipendenti: ogni livello aggiunge informazioni che possono ritornare a modificare il Class Diagram.

---

# Use Case Diagram

Un **Use Case** descrive uno scenario completo in cui un attore utilizza il sistema per ottenere un risultato significativo.

Prima di vedere le relazioni grafiche è importante capire cosa deve rappresentare un vero caso d'uso.

Un Use Case deve descrivere una funzionalità:

- **completa** → rappresenta uno scenario con un risultato compiuto, non un frammento casuale;
- **visibile dall'esterno** → deve avere significato per un attore;
- **originata da un attore** → deve esserci almeno un attore che avvia lo scenario;
- **significativa** → deve produrre un risultato utile per almeno un attore;
- **sufficientemente indipendente** dagli altri casi d'uso da rappresentare uno scenario riconoscibile.

## Attore

Un **attore** è un'entità esterna che interagisce con il sistema.

Non deve essere necessariamente una persona: può essere anche un altro sistema o dispositivo.

Un attore può:

- **attivare** un caso d'uso;
- essere semplicemente **coinvolto** durante la sua esecuzione.

Per questo nel diagramma la direzione della relazione può aiutare a distinguere chi avvia l'interazione da chi viene coinvolto.

## Relazioni tra Use Case

Oltre alle associazioni tra attori e casi d'uso, UML permette di esprimere relazioni tra casi d'uso.

Le due più importanti sono **include** ed **extend**.

### `<<include>>`

Se `A <<include>> B`, allora per completare A è necessario eseguire anche B.

B rappresenta quindi un comportamento **obbligatorio** all'interno di A.

Schema concettuale:

`A -> deve eseguire B`

### `<<extend>>`

Se `A <<extend>> B`, allora durante B può verificarsi una situazione in cui viene eseguito anche A, ma non è obbligatorio.

A rappresenta quindi un comportamento **opzionale o condizionale** che estende B.

Schema concettuale:

`B -> in certe condizioni può essere esteso da A`

La differenza fondamentale è:

- **include** → comportamento necessario;
- **extend** → comportamento eventuale.

## Generalizzazione tra attori

Anche gli attori possono essere organizzati tramite generalizzazione.

Un attore più specifico:

- eredita le possibilità di interazione dell'attore più generale;
- può avere inoltre casi d'uso propri.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p056-fig-056.png|550]]

Nell'esempio universitario si vedono sia `include` sia `extend`: il diagramma mostra quindi non solo quali servizi esistono, ma anche quali scenari sono obbligatoriamente collegati e quali si attivano soltanto in certi casi.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p057-fig-057.png|550]]

L'esempio Contact Management mostra invece bene la generalizzazione tra attori con responsabilità differenti.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p058-fig-058.png|500]]

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p058-fig-059.png|650]]

Gli esempi Video Store e Telemarketing evidenziano anche un punto importante: un attore può essere un dispositivo e un diagramma deve rendere chiaro quali attori attivano realmente ciascun caso d'uso.

---

# Il Use Case Diagram non basta da solo

Il diagramma individua **quali scenari esistono**, ma non descrive in dettaglio cosa accade durante l'esecuzione di ciascuno.

Per completare la specifica di un Use Case il corso presenta due possibilità:

- descrizione **informale** in linguaggio naturale;
- descrizione più strutturata tramite **Activity Diagram**.

## Descrizione informale di un Use Case

Una scheda può contenere:

- **Brief Description** → cosa fa il caso d'uso;
- **Actors** → attori coinvolti;
- **Preconditions** → condizioni che devono essere vere prima dell'esecuzione;
- **Main Flow** → sequenza principale delle attività;
- **Alternative Flows** → percorsi alternativi;
- **Postconditions** → condizioni che devono essere vere al termine.

Questa struttura permette di passare da un'ellisse nel diagramma a una descrizione concreta dello scenario.

---

# Activity Diagram

Quando vogliamo rappresentare graficamente il flusso di attività di uno scenario possiamo usare l'**Activity Diagram**.

Nel contesto dell'OOA viene usato soprattutto per descrivere **come si sviluppa il flusso di un singolo Use Case**.

I suoi elementi principali sono:

- **nodo iniziale** → punto di inizio del flusso;
- **attività** → azione o passo che deve essere svolto;
- **transizioni** → passaggio da un'attività alla successiva;
- **nodo finale** → conclusione del flusso;
- **guard condition** → condizione che stabilisce quando una transizione può essere percorsa;
- **branch/merge** → gestione di flussi alternativi;
- **fork/join** → gestione di flussi concorrenti.

## Branch e Merge

Il **branch** introduce un'alternativa:

- da un punto partono più possibili percorsi;
- la condizione di guardia determina quale viene seguito.

Il **merge** riunisce flussi alternativi:

- non aspetta che arrivino tutti;
- basta che arrivi il percorso effettivamente seguito.

## Fork e Join

Il **fork** crea flussi concorrenti:

- da un unico flusso ne partono più di uno;
- le attività possono procedere in parallelo.

La **join** sincronizza flussi concorrenti:

- aspetta che siano stati completati tutti i flussi richiesti;
- solo dopo permette di proseguire.

Questa differenza è fondamentale:

- **merge** → riunisce alternative;
- **join** → sincronizza attività parallele.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p060-fig-060.png|650]]

L'esempio del noleggio video mostra branch, cicli, fork e join all'interno dello stesso scenario.

Nel materiale viene poi criticata una prima versione del diagramma perché alcune condizioni e sincronizzazioni non sono corrette. Questo è utile per capire che un Activity Diagram non serve solo a "disegnare frecce": deve rappresentare senza ambiguità il flusso reale.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p061-fig-061.png|450]]

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p061-fig-062.png|450]]

Le versioni corrette mostrano meglio dove servono decisioni, merge e sincronizzazioni.

---

# Dalle attività alle interazioni tra oggetti

L'Activity Diagram ci dice **quali attività devono essere svolte**.

Ma in un sistema Object Oriented quelle attività vengono realizzate da oggetti che collaborano.

Dobbiamo quindi fare un ulteriore passo:

`Use Case -> flusso di attività -> oggetti che si scambiano messaggi`

Da qui nascono i **Diagrammi di Interazione**.

I due diagrammi considerati dal corso sono:

- **Sequence Diagram**;
- **Collaboration Diagram**.

Rappresentano sostanzialmente le stesse interazioni, ma enfatizzano aspetti diversi.

---

# Sequence Diagram

Il **Sequence Diagram** rappresenta gli oggetti coinvolti in uno scenario e i messaggi che si scambiano, mettendo in evidenza **l'ordine temporale** delle interazioni.

## Oggetti

Ogni partecipante viene rappresentato indicando:

- nome dell'oggetto;
- classe da cui è stato creato.

## Lifeline

Da ogni oggetto parte una **lifeline**, cioè la linea che rappresenta la sua presenza durante lo svolgimento dell'interazione.

La posizione verticale esprime la sequenza degli eventi: i messaggi più in alto avvengono prima di quelli più in basso.

## Activation Box

L'**activation box** indica un intervallo in cui l'oggetto è attivo nell'esecuzione di una richiesta.

La sua dimensione grafica non deve essere interpretata come una misura quantitativa del tempo di esecuzione: il Sequence Diagram stabilisce soprattutto l'**ordine** delle interazioni.

## Messaggi

Gli oggetti comunicano tramite messaggi.

Il corso distingue:

- **Call** → comunicazione sincrona: il mittente invia una richiesta e attende la risposta prima di proseguire;
- **Signal** → comunicazione asincrona: il mittente invia il messaggio e può continuare l'esecuzione;
- **Flat** → forma usata quando, durante la specifica, non è ancora stato deciso il tipo preciso di interazione.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p062-fig-063.png|600]]

Il diagramma rende quindi visibile non solo chi comunica con chi, ma soprattutto **in quale ordine**.

---

# Collaboration Diagram

Il **Collaboration Diagram** descrive anch'esso la comunicazione tra oggetti.

La differenza principale rispetto al Sequence Diagram è il punto di vista:

- **Sequence Diagram** → enfatizza l'ordine temporale dei messaggi;
- **Collaboration Diagram** → enfatizza le relazioni esistenti tra gli oggetti che collaborano.

I due diagrammi hanno quindi una semantica molto vicina e possono rappresentare la stessa interazione con organizzazioni grafiche differenti.

---

# Come il modello comportamentale completa il Class Diagram

Questa è una delle connessioni più importanti dell'intera OOA.

All'inizio del modello dei dati abbiamo identificato soprattutto:

- classi;
- attributi;
- associazioni.

Non avevamo ancora abbastanza informazioni per decidere tutte le operazioni.

Il Sequence Diagram ci permette di ricavarle.

Se un oggetto riceve un messaggio che gli chiede di eseguire una certa funzione, allora la classe di quell'oggetto deve mettere a disposizione l'operazione corrispondente.

Quindi:

`messaggio ricevuto dall'oggetto -> operazione richiesta alla sua classe`

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p063-fig-064.png|700]]

Nell'esempio universitario, se un oggetto `Student` riceve un messaggio come `areYouValid()`, allora la classe `Student` deve offrire quell'operazione.

Questo mostra concretamente perché i modelli vengono costruiti in parallelo:

- il Class Diagram fornisce gli oggetti al Sequence Diagram;
- il Sequence Diagram restituisce nuove operazioni da aggiungere al Class Diagram.

Durante questa analisi possono emergere anche classi nuove, per esempio classi di interfaccia che inizialmente non erano state considerate tra le Entity classes.

---

# Interfaccia pubblica di una classe

Una classe non dovrebbe permettere agli altri oggetti di modificare liberamente il proprio stato interno.

Il principio di **Information Hiding** prevede che i dettagli interni vengano nascosti e che l'accesso avvenga attraverso operazioni controllate.

L'**interfaccia pubblica della classe** è quindi l'insieme delle operazioni che la classe mette a disposizione degli altri oggetti.

## Accessor Methods
Per leggere o modificare gli attributi si usano spesso metodi di accesso:
- **getter** → restituisce il valore di un attributo;
- **setter** → modifica il valore di un attributo.

Questo permette alla classe di controllare come viene letto o aggiornato il proprio stato.

## Cosa specifichiamo in OOA

In OOA ci interessa ancora il **COSA**, non il COME.

Per ogni operazione definiamo quindi soprattutto la **signature**:

- nome;
- parametri;
- eventuale valore di ritorno.

L'algoritmo interno verrà progettato successivamente in OOD.

## Instance Scope e Class Scope

Un'operazione può avere:

- **Instance Scope** → agisce su una specifica istanza;
- **Class Scope / static** → appartiene alla classe e può operare su informazioni condivise.

## CRUD

Oltre alle operazioni che emergono dalle interazioni, il corso richiama le operazioni fondamentali **CRUD**:

- **Create** → creare un oggetto;
- **Read** → leggere informazioni;
- **Update** → aggiornare lo stato;
- **Delete** → eliminare l'oggetto e gestire le conseguenze dell'eliminazione.

Queste operazioni rappresentano il nucleo delle manipolazioni fondamentali sugli oggetti persistenti.

---

# Modello Dinamico: State Diagram

A questo punto abbiamo:

- struttura degli oggetti → modello dei dati;
- servizi e collaborazioni → modello comportamentale.

Per alcuni oggetti serve anche descrivere **come il loro stato cambia nel tempo**.

Da qui nasce il **modello dinamico**, rappresentato tramite State Diagram.

Non è necessario costruirlo con lo stesso livello di dettaglio per ogni classe.

È particolarmente utile quando il comportamento dipende fortemente dallo stato corrente, per esempio:

- classi di controllo;
- software real-time;
- applicazioni scientifiche;
- oggetti con un ciclo di vita significativo.

## Stato

Lo **stato** di un oggetto rappresenta una condizione significativa in cui l'oggetto può trovarsi e che influenza il suo comportamento.

## Transizione

Una **transizione** rappresenta il passaggio da uno stato a un altro.

Nel corso una transizione può essere descritta tramite:

- **evento** → ciò che provoca il tentativo di cambiamento;
- **condizione** → vincolo che deve essere vero affinché il passaggio avvenga;
- **azione** → attività eseguita in conseguenza della transizione.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p065-fig-065.png|450]]

Il diagramma distingue inoltre uno stato iniziale e uno stato finale.

## Esempio MovieTitle

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p065-fig-066.png|650]]

L'esempio del Video Store mostra come uno stesso oggetto `MovieTitle` possa passare tra stati come:

- Available;
- Not In Stock;
- Ordered;
- In Stock;
- Reserved.

Le transizioni dipendono da eventi come noleggio, restituzione, ordine o rifornimento.

Il punto non è memorizzare ogni freccia dell'esempio, ma capire la logica:

> il comportamento possibile dell'oggetto dipende dal suo stato corrente e dagli eventi che si verificano.

---

# Gestire la complessità dei modelli OOA

Quando il sistema cresce, aumenta anche il numero di classi e di associazioni.

Se tutte le classi potessero comunicare liberamente con tutte le altre, il modello diventerebbe rapidamente difficile da comprendere e mantenere.

Per questo si introduce un principio di **stratificazione**.

L'idea è organizzare gli elementi in gruppi e limitare le comunicazioni:

- elementi dello stesso strato possono collaborare;
- gli strati comunicano secondo regole definite;
- si evitano collegamenti arbitrari tra ogni parte del sistema.

In questo modo la struttura diventa più gestibile.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p066-fig-067.png|500]]

La figura confronta una rete di connessioni molto fitta con una struttura stratificata più controllata.

---

# UML Package

Per raggruppare elementi correlati UML usa il concetto di **Package**.

Un Package è un contenitore logico che può includere:

- classi;
- Use Case;
- altri elementi UML.

Serve quindi a organizzare modelli grandi in unità più gestibili.

## Annidamento

I Package possono essere annidati, creando una gerarchia di organizzazione.

Questo permette di partire da gruppi generali e scendere verso sottogruppi più specifici.

## Visibilità e dipendenze

Una classe appartiene a un determinato Package, ma può avere necessità di usare elementi appartenenti ad altri Package.

Per questo si possono rappresentare relazioni tra Package, in particolare:

- **Dependency** → un Package usa o dipende da elementi di un altro;
- **Generalization** → un Package specializza un altro Package.

Le dipendenze possono rappresentare diversi tipi di accesso o uso e possono essere specificate tramite stereotipi.

Il materiale sottolinea inoltre che i Package possono essere rappresentati all'interno di diagrammi come Class Diagram e Use Case Diagram: non vengono trattati come un formalismo completamente separato dagli altri modelli.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p066-fig-068.png|550]]

---

# Approccio BCE - Boundary, Control, Entity

A questo punto abbiamo già incontrato tre tipi di classi:

- Entity;
- Boundary;
- Control.

L'approccio **BCE - Boundary Control Entity** usa proprio queste responsabilità per organizzare il sistema in strati.

La classificazione non è quindi un elenco casuale: ogni gruppo ha una funzione precisa nel flusso tra attore, logica applicativa e dati.

## Boundary

Le **Boundary classes** gestiscono il confine tra sistema e attori.

Si occupano per esempio di:

- ricevere input;
- mostrare informazioni;
- rappresentare elementi dell'interfaccia.

Non dovrebbero contenere la logica applicativa centrale.

## Control

Le **Control classes** coordinano l'esecuzione degli scenari.

Si occupano di:

- ricevere richieste provenienti dalle Boundary;
- decidere quali operazioni devono essere eseguite;
- coordinare gli oggetti Entity necessari al caso d'uso.

Sono quindi il livello che rappresenta la **logica di controllo** dell'applicazione.

## Entity

Le **Entity classes** rappresentano le informazioni fondamentali del dominio e gestiscono i dati rilevanti per il sistema.

Sono le classi da cui siamo partiti durante la costruzione del modello dei dati.

## Regola di comunicazione

La separazione BCE serve proprio a evitare dipendenze incontrollate.

Il flusso tipico è:

`Actor <-> Boundary <-> Control <-> Entity`

In particolare, nel modello presentato dal corso:

> **Boundary ed Entity non devono comunicare direttamente.**

La Boundary passa attraverso il livello Control, che coordina l'operazione.

Questo mantiene separate:

- presentazione;
- logica applicativa;
- dati.

![[UNI/ANNO 3/ARCHIVIO/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/16_agosto_appunti/assets/p066-fig-069.png|550]]

L'idea è vicina alla separazione delle responsabilità che ritroviamo anche in architetture come MVC: i nomi e le regole non coincidono perfettamente, ma il principio comune è evitare che interfaccia, logica e dati diventino un unico blocco fortemente accoppiato.

---

# Il filo completo dell'OOA

L'intera parte può essere vista come un unico processo di raffinamento, non come una serie di diagrammi indipendenti.

Si parte dai **requisiti** e si costruiscono progressivamente tre viste complementari:

- **modello dei dati**
  - identifichiamo Entity classes;
  - aggiungiamo attributi;
  - definiamo associazioni, molteplicità e relazioni speciali;
- **modello comportamentale**
  - individuiamo gli scenari con i Use Case;
  - descriviamo il flusso con Activity Diagram;
  - identifichiamo le collaborazioni con Sequence/Collaboration Diagram;
  - dai messaggi ricaviamo nuove operazioni e talvolta nuove classi;
- **modello dinamico**
  - quando necessario descriviamo stati ed evoluzione degli oggetti con State Diagram.

Quando il modello cresce, Package e BCE permettono di **organizzare la complessità e separare le responsabilità**.

Il punto centrale dell'OOA rimane però invariato:

> costruire una specifica Object Oriented sufficientemente completa da descrivere **COSA deve fare il sistema**, lasciando alla successiva fase di OOD la decisione di **COME realizzarlo**.
