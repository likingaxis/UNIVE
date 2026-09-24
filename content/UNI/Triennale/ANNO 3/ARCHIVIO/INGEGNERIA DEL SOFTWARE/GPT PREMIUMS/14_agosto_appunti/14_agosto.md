# 14 agosto - Fondamenti e modelli di processo

## Ingegneria del Software: perché nasce

L'**Ingegneria del Software** (*Software Engineering*) è la disciplina che applica principi, metodi e pratiche dell'ingegneria alla realizzazione del software. L'idea di fondo è che un prodotto software non debba essere visto come semplice codice scritto da un programmatore, ma come il risultato di un **processo organizzato** che comprende analisi, progettazione, costruzione, verifica, manutenzione e gestione.

Questa esigenza nasce quando il software smette di essere composto prevalentemente da piccoli programmi sviluppati da singole persone e diventa un vero **prodotto industriale**:

- aumenta la dimensione dei sistemi;
- aumenta il numero di persone coinvolte;
- aumenta il numero di componenti che devono collaborare;
- il software deve essere mantenuto per anni;
- il prodotto deve rispettare tempi, costi e requisiti concordati;
- eventuali guasti possono avere conseguenze economiche o, nei sistemi critici, anche conseguenze sulla sicurezza.

Senza un approccio ingegneristico lo sviluppo può degenerare in una successione di modifiche non pianificate, con:

- **cost overrun**: il costo reale supera quello previsto;
- **time overrun**: il progetto richiede più tempo del previsto;
- qualità insufficiente;
- difficoltà di manutenzione;
- scarsa capacità di prevedere e controllare il progetto.

Il termine *Software Engineering* viene tradizionalmente collegato alla conferenza NATO del 1968, organizzata nel contesto di quella che veniva definita **software crisis**: la difficoltà crescente di produrre software di grandi dimensioni in modo affidabile, prevedibile e sostenibile.

L'obiettivo dell'Ingegneria del Software non è quindi semplicemente **scrivere codice che funziona**, ma sviluppare e mantenere un prodotto software attraverso un processo controllabile e ripetibile.

---

## Che cos'è un prodotto software

Un **prodotto software** non coincide soltanto con il programma eseguibile.

Nel corso viene considerato come l'insieme di:

- **codice**;
- **documentazione** associata al prodotto.

Durante lo sviluppo vengono inoltre prodotti numerosi elementi intermedi.

### Artefatto

Un **artefatto software** è un prodotto intermedio generato durante il processo di sviluppo.

Esempi:

- documento dei requisiti;
- specifica;
- modello UML;
- documento di progetto;
- codice sorgente;
- piano di test.

Il termine *artefatto* è utile perché permette di parlare in modo generale di tutto ciò che viene prodotto durante una fase del processo, anche quando non è ancora codice eseguibile.

### Sistema software

Un **sistema software** è un insieme organizzato di prodotti o componenti software che cooperano per raggiungere un determinato obiettivo.

Quindi:

- un singolo programma può essere un prodotto software;
- un sistema software può comprendere più programmi, componenti, servizi, dati e documentazione che collaborano tra loro.

### Cliente, sviluppatore e utente

È importante distinguere tre ruoli:

- **Cliente**: soggetto o organizzazione che richiede e finanzia il prodotto;
- **Sviluppatore**: soggetto o organizzazione che realizza il prodotto;
- **Utente**: soggetto che utilizza il prodotto.

Questi ruoli possono coincidere, ma non necessariamente.

Si parla di:

- **software interno** quando cliente e sviluppatore appartengono alla stessa organizzazione;
- **software a contratto** quando cliente e sviluppatore sono soggetti differenti e lo sviluppo è regolato da un contratto.

Questa distinzione diventerà importante quando si parlerà dei modelli di processo: alcuni modelli si adattano meglio a software commissionato da un cliente, altri a prodotti sviluppati autonomamente da un'azienda per il mercato.

---

# Il ciclo di vita del software

Il **ciclo di vita del software** è l'intervallo di tempo che va dalla nascita dell'esigenza di realizzare un prodotto software fino alla sua definitiva dismissione.

Non riguarda quindi soltanto il periodo nel quale il codice viene scritto. Comprende tutto ciò che accade prima, durante e dopo la realizzazione.

Nel corso viene suddiviso in tre grandi **stadi**:

1. **Sviluppo**;
2. **Manutenzione**;
3. **Dismissione**.

## Stadio di sviluppo

Lo sviluppo comprende sei fasi fondamentali.

### 1. Requisiti

Si stabilisce **che cosa deve fornire il software**.

Si raccolgono quindi:

- bisogni del cliente;
- bisogni degli utenti;
- servizi richiesti;
- vincoli che il sistema dovrà rispettare.

In questa fase non si decide ancora nel dettaglio come implementare il prodotto.

### 2. Specifica

I requisiti iniziali vengono analizzati e descritti con maggiore precisione.

La specifica cerca di trasformare esigenze spesso espresse in modo informale in una descrizione abbastanza precisa da poter guidare le fasi successive.

### 3. Pianificazione

Si stabilisce come organizzare il progetto dal punto di vista gestionale:

- tempi;
- risorse;
- persone;
- costi;
- attività;
- rischi;
- scadenze.

### 4. Progettazione

Si passa dal **cosa** al **come**.

Si decide come costruire il sistema, ad esempio:

- quali componenti avrà;
- come saranno organizzati;
- come comunicheranno;
- quali strutture dati saranno utilizzate;
- quali responsabilità saranno assegnate alle diverse parti.

Nel corso si distingue tra:

- progettazione **preliminare o architetturale**;
- progettazione **dettagliata**.

### 5. Codifica

Il progetto viene tradotto in codice sorgente.

### 6. Integrazione

Le parti realizzate separatamente vengono combinate fino a formare il prodotto completo.

---

## Manutenzione

Dopo il rilascio il software entra nella fase operativa, ma questo non significa che il lavoro sia terminato.

La **manutenzione** comprende tutte le modifiche effettuate sul prodotto durante il periodo in cui viene utilizzato.

Nel materiale del corso viene sottolineato che la manutenzione può rappresentare una quota molto elevata del costo complessivo del ciclo di vita.

### Tipi di manutenzione

#### Manutenzione correttiva

Serve a eliminare difetti che hanno prodotto, o potrebbero produrre, comportamenti errati.

Esempio: viene scoperto che una funzione calcola male un totale in una particolare situazione; il codice viene corretto.

#### Manutenzione adattativa

Serve ad adattare il software a cambiamenti dell'ambiente in cui deve funzionare.

Esempi:

- nuovo sistema operativo;
- nuovo hardware;
- nuova versione di un database;
- modifica di un sistema esterno con cui il software deve comunicare.

Il software non viene modificato perché il requisito originale era sbagliato, ma perché è cambiato il **contesto operativo**.

#### Manutenzione perfettiva o evolutiva

Serve a estendere o migliorare il prodotto.

Esempi:

- aggiungere una nuova funzione;
- migliorare una funzione esistente;
- soddisfare nuovi bisogni degli utenti.

È una forma di manutenzione molto importante perché il software tende a evolvere insieme all'organizzazione e agli utenti che lo utilizzano.

#### Manutenzione preventiva / Software Reengineering

Serve a modificare il software per renderlo più facile da mantenere in futuro.

Non è necessariamente provocata da un guasto immediato. Si interviene perché la struttura attuale del prodotto rende difficili future modifiche.

Esempi:

- riorganizzare codice molto complesso;
- ricostruire documentazione ormai obsoleta;
- migliorare la struttura interna senza modificare il comportamento esterno.

---

## Dismissione

La **dismissione** è il momento in cui il prodotto viene ritirato definitivamente dall'uso.

Può avvenire, per esempio, perché:

- è diventato obsoleto;
- non è più economicamente conveniente mantenerlo;
- è stato sostituito da un nuovo sistema;
- non è più compatibile con l'ambiente operativo.

---

Durante il ciclo di vita non basta produrre artefatti: bisogna anche controllare continuamente che ciò che viene prodotto sia corretto e che il prodotto finale soddisfi davvero le esigenze dell’utente.  
Per questo, accanto alle fasi di sviluppo, si svolgono attività di **Verification & Validation (V&V)**.

La **verifica** controlla che ogni prodotto intermedio sia coerente con ciò che doveva essere realizzato in quella fase.  
La **validazione** controlla invece che il prodotto soddisfi realmente i bisogni dell’utente.

Il **testing** è uno degli strumenti principali usati nelle attività di V&V, soprattutto quando il software può essere eseguito. Non è quindi una fase isolata del ciclo di vita, ma un’attività trasversale che accompagna lo sviluppo.
### Verification, Validation e Testing

Durante il ciclo di vita del software, ogni fase produce qualcosa:

- requisiti;
- specifiche;
- documenti di progetto;
- codice;
- componenti integrati;
- prodotto finale.

Non basta però produrre questi artefatti: bisogna anche controllare che siano corretti.

Per questo, durante lo sviluppo vengono svolte attività di **Verification & Validation (V&V)**.

#### Verification

La **Verification** controlla che ciò che viene prodotto in una fase sia corretto rispetto a ciò che quella fase aveva ricevuto in input.

In altre parole:

**“Are we building the product right?”**

Esempio:

- dai requisiti viene prodotta una specifica;
- la verifica controlla che la specifica rappresenti correttamente i requisiti;
- dal progetto viene prodotto il codice;
- la verifica controlla che il codice sia coerente con il progetto.

La verifica può essere effettuata anche su artefatti non eseguibili, tramite:

- revisioni;
- ispezioni;
- analisi documentale;
- analisi statica.

#### Validation

La **Validation** controlla invece che il prodotto realizzato soddisfi realmente le necessità dell’utente.

In altre parole:

**“Are we building the right product?”**

Un software può quindi essere:

- corretto rispetto alla specifica;
- ma non valido rispetto alle esigenze reali dell’utente.

Questo può accadere, ad esempio, se la specifica iniziale era incompleta o non rappresentava correttamente ciò che l’utente voleva.

#### Testing

Il **testing** consiste nel sottoporre il software a controlli per individuare problemi e verificare il suo comportamento.

Non viene considerato semplicemente come una fase isolata dopo la codifica, perché i controlli devono accompagnare l’intero sviluppo. Gli appunti infatti sottolineano che il testing è trasversale alle varie fasi del ciclo di vita.

Quando il software è eseguibile, il testing può essere svolto in modo dinamico, cioè:

- si esegue il software;
- si forniscono determinati input;
- si osservano gli output;
- si confronta il comportamento ottenuto con quello atteso.

In questo senso, il testing dinamico è particolarmente importante per la **validazione**.

La frase chiave che userei per collegare tutto è questa:

**Verifica e validazione descrivono cosa vogliamo controllare; il testing è uno degli strumenti con cui effettuiamo questi controlli.**

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p006-fig-005.png|550]]

Il diagramma evidenzia proprio questa differenza: la verifica mette in relazione le fasi vicine del processo, mentre la validazione collega il prodotto sviluppato agli obiettivi dell'utente.

---

# Problemi accidentali ed essenziali del software

Una distinzione importante riguarda le difficoltà legate alla produzione del software.

## Problemi accidentali

Sono difficoltà legate agli strumenti, alle tecnologie o alle modalità con cui il software viene sviluppato. In linea di principio possono essere ridotte grazie all'evoluzione tecnologica e organizzativa.

Negli appunti vengono richiamati, tra gli altri, problemi relativi a:

- tecnologie disponibili;
- competenze del team;
- manutenzione;
- specifica e progettazione;
- organizzazione del lavoro di gruppo.

L'idea fondamentale è che non appartengono inevitabilmente alla natura stessa del software: migliori strumenti, processi e competenze possono attenuarli.

## Problemi essenziali

Sono invece caratteristiche intrinseche del software che non scompaiono semplicemente grazie a computer più veloci o linguaggi migliori.

### Complessità

Un sistema software può possedere moltissime parti e moltissime combinazioni possibili tra i loro stati.

La complessità non dipende soltanto dal numero di righe di codice: nasce soprattutto dalle **interazioni** tra le parti del sistema.

Più componenti possono interagire, maggiore è il numero di situazioni che devono essere comprese, progettate e controllate.

### Conformità

Il software deve adattarsi a un ambiente che spesso esiste già.

Può dover rispettare:

- sistemi hardware;
- sistemi operativi;
- protocolli;
- regole aziendali;
- standard;
- normative;
- altri software.

Quindi non possiamo progettare il software ignorando il contesto: spesso è il software a doversi **conformare** all'ambiente, non viceversa.

### Cambiabilità

Il software viene modificato frequentemente.

È relativamente facile chiedere una modifica a un programma rispetto, per esempio, alla modifica strutturale di un oggetto fisico già prodotto. Proprio perché il cambiamento è possibile, gli utenti e le organizzazioni tendono a richiederlo continuamente.

La cambiabilità rende fondamentale la manutenzione e spiega perché una buona progettazione deve facilitare l'evoluzione futura.

### Invisibilità

Il software non possiede una struttura geometrica naturale visibile come un edificio o una macchina.

Possiamo rappresentarlo mediante diagrammi e modelli, ma questi sono **rappresentazioni** create da noi. Il sistema software in sé non possiede una forma fisica che permetta di comprenderne immediatamente la struttura.

Questa invisibilità rende più difficile ragionare su sistemi molto complessi.

---

# Aspetti economici del software

Gli appunti sottolineano alcune caratteristiche peculiari dei costi del software.

## Costo e dimensione

Nel modello semplificato riportato nel corso il costo viene descritto come crescente più che linearmente con la dimensione del prodotto, fino a usare l'espressione:

`C = aS^2`

con:

- `C` = costo;
- `S` = dimensione;
- `a` = costante.

Il messaggio importante non è tanto la formula come legge universale, ma il fatto che **raddoppiare la dimensione di un sistema non significa semplicemente raddoppiare lo sforzo**: aumentando la dimensione aumentano anche le interazioni e la complessità da gestire.

## Costo delle repliche

Una volta prodotto il software, creare una copia aggiuntiva ha un costo marginale molto basso rispetto al costo iniziale di sviluppo.

Il costo principale sta quindi nella **progettazione e produzione dell'originale**, non nella duplicazione del prodotto digitale.

---

# Affidabilità del software

## Che cosa significa affidabilità

L'**affidabilità** (*software reliability*) può essere intesa informalmente come la fiducia che possiamo riporre nel corretto funzionamento del prodotto.

In modo più preciso, viene definita come la probabilità che il software funzioni correttamente durante un determinato intervallo di tempo, detto **mission time**, nelle condizioni d'uso considerate.

Per capire questa definizione dobbiamo distinguere tre concetti.

## Errore, difetto e guasto

### Errore

Un **errore** è un'azione umana sbagliata.

Esempio: uno sviluppatore interpreta male una condizione e scrive una formula sbagliata.

### Difetto - defect/fault

Il **difetto** è l'anomalia che rimane nel prodotto come conseguenza dell'errore.

Esempio: la formula errata presente nel codice.

### Guasto - failure

Il **guasto** è il comportamento scorretto osservabile durante l'esecuzione del sistema.

La catena concettuale è quindi:

**errore umano -> introduzione di un difetto -> in certe condizioni il difetto viene attivato -> si manifesta un guasto**.

Un punto fondamentale è che **un difetto non produce necessariamente sempre un guasto**.

Se la parte di codice contenente il difetto non viene mai eseguita in una certa modalità d'uso, quel difetto rimane latente.

---

## Difetti latenti e profilo operativo

Un **difetto latente** è un difetto presente nel software che non ha ancora provocato un comportamento osservabile errato.

Per questo motivo il semplice numero di difetti presenti non determina direttamente l'affidabilità percepita.

Supponiamo che due difetti siano presenti nel sistema:

- il primo si trova in una funzione usata centinaia di volte al giorno;
- il secondo in una funzione utilizzata una volta all'anno.

Eliminare il primo avrà probabilmente un impatto molto maggiore sull'affidabilità osservata.

Negli appunti questa idea viene collegata alla **regola 10-90**: una piccola porzione delle istruzioni di un programma può assorbire gran parte del tempo di esecuzione complessivo.

La parte usata più frequentemente viene indicata come **core** o nucleo del programma.

Di conseguenza, l'effetto di un difetto dipende anche dalla sua **localizzazione**.

## Profilo operativo

Il **profilo operativo** descrive il modo in cui un prodotto viene effettivamente utilizzato.

Comprende, per esempio:

- quali funzioni vengono utilizzate;
- con quale frequenza;
- quali input vengono forniti;
- in quali condizioni viene eseguito il sistema.

Utenti differenti possono avere profili operativi differenti. Per questo lo stesso prodotto può mostrare un'affidabilità osservata diversa in contesti diversi.

---

# Affidabilità hardware e software

Software e hardware possono entrambi manifestare guasti, ma la causa dei guasti è diversa.

## Hardware

L'hardware è un oggetto fisico e può deteriorarsi.

I guasti possono essere dovuti a:

- usura;
- rottura;
- deterioramento dei componenti.

Dopo la sostituzione di un componente danneggiato, il sistema può tornare a una condizione simile a quella precedente.

L'obiettivo è quindi mantenere la frequenza di guasto il più possibile **stabile** durante la vita utile.

## Software

Il software, invece, non si consuma fisicamente.

Se lo stesso programma viene eseguito nelle stesse condizioni, non diventa progressivamente più fragile soltanto perché è stato eseguito molte volte.

I guasti software derivano principalmente da difetti già presenti oppure introdotti durante modifiche successive.

Quando correggiamo il software:

- possiamo eliminare un difetto;
- ma possiamo anche introdurne accidentalmente un altro.

Per questo, dopo una modifica, l'affidabilità può aumentare ma non è garantito che aumenti sempre.

L'obiettivo è una **crescita dell'affidabilità**, cioè una progressiva riduzione della frequenza dei guasti attraverso correzioni e miglioramenti.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p003-fig-001.png|520]]

Nel grafico hardware si riconoscono tre zone concettuali:

- una fase iniziale con frequenza di guasto elevata, detta spesso **mortalità infantile**;
- una fase relativamente stabile;
- una fase finale in cui l'usura fa aumentare i guasti.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p003-fig-002.png|520]]

Nel software l'andamento è differente: idealmente le correzioni dovrebbero far diminuire progressivamente la frequenza di guasto. Nella pratica, ogni modifica può introdurre nuovi difetti e causare temporanei aumenti della frequenza di guasto.

Gli appunti richiamano anche il concetto di **software rejuvenation**: in alcuni sistemi a lunga esecuzione si può periodicamente riportare il sistema in uno stato operativo più pulito o stabile per contrastare fenomeni di degradazione dovuti all'interazione con l'ambiente di esecuzione.

---

# Disponibilità

L'**availability** indica la percentuale di tempo durante la quale il sistema risulta effettivamente utilizzabile.

Affidabilità e disponibilità sono collegate ma non sono la stessa cosa.

Un sistema può guastarsi relativamente spesso ma tornare operativo molto rapidamente; oppure può guastarsi raramente ma richiedere moltissimo tempo per essere ripristinato.

La disponibilità dipende quindi almeno da due aspetti:

- frequenza dei guasti;
- tempo necessario per ripristinare il servizio.

È particolarmente importante nei sistemi in cui l'indisponibilità può provocare:

- perdite economiche;
- interruzione di servizi essenziali;
- problemi di sicurezza.

---

Il **ciclo di vita del software** descrive le grandi fasi attraversate dal prodotto, dalla nascita fino alla dismissione.

Per realizzare concretamente il software, però, bisogna stabilire **quali attività svolgere, in quale ordine e con quali modalità**. 
Questo insieme organizzato prende il nome di **processo software**.
Un **processo software** è l'insieme organizzato delle attività necessarie per sviluppare, mantenere e gestire un prodotto software, cercando di rispettare:

- tempi;
- costi;
- requisiti;
- qualità attesa.

All'interno di un processo software, una **attività** è un insieme organizzato di operazioni svolte per ottenere un determinato risultato.

Per esempio:

- raccogliere e analizzare i requisiti;
- progettare il sistema;
- scrivere il codice;
- verificare quanto prodotto;
- integrare i componenti.

Quindi il rapporto diventa chiaro:

**ciclo di vita** → ci dice _quali grandi fas_
# Dal ciclo di vita al processo software

## Che cos'è un'attività

Nel contesto del processo software, una **attività** è un insieme organizzato di operazioni svolte per ottenere un determinato risultato.

Esempi:

- raccogliere i requisiti;
- progettare l'architettura;
- scrivere codice;
- eseguire test;
- pianificare tempi e risorse.

Un'attività riceve normalmente degli **input**, svolge un lavoro e produce uno o più **output**, spesso sotto forma di artefatti.

Esempio:

- input: requisiti;
- attività: progettazione;
- output: documento o modello di progetto.

## Processo software

Il **processo software** è l'insieme organizzato delle attività necessarie per sviluppare, consegnare e mantenere un prodotto software rispettando gli obiettivi di:

- qualità;
- costo;
- tempo.

Quindi:

- il **ciclo di vita** descrive l'intera esistenza del prodotto;
- il **processo software** descrive le attività attraverso cui il prodotto viene sviluppato e gestito;
- il **modello di ciclo di vita** stabilisce come queste attività vengono organizzate e ordinate.

Questa distinzione evita un'ambiguità frequente: le fasi esistono in molti progetti, ma **non devono necessariamente essere svolte nello stesso ordine o una sola volta**. È proprio il modello di ciclo di vita a stabilire la struttura delle attività.

---

# Modelli di ciclo di vita

Un **modello di ciclo di vita** descrive come organizzare le attività dello sviluppo software.

Può stabilire:

- quali attività vengono svolte;
- in quale ordine;
- quali attività possono sovrapporsi;
- quando è possibile tornare a una fase precedente;
- quando viene coinvolto il cliente;
- quando vengono prodotte versioni utilizzabili del software.

Non esiste un modello universalmente migliore. La scelta dipende da fattori quali:

- stabilità dei requisiti;
- dimensione del progetto;
- criticità del sistema;
- esperienza dell'organizzazione;
- necessità del cliente;
- livello di rischio.

---

# Build & Fix

Il **Build & Fix** rappresenta sostanzialmente l'assenza di un processo strutturato.

L'idea è:

1. si costruisce rapidamente una prima versione;
2. la si mostra o consegna;
3. la si modifica in base ai problemi e alle richieste;
4. si continua a correggerla finché il cliente non è soddisfatto.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p005-fig-003.png|480]]

Il problema non è il fatto di modificare il software. La modifica è normale e inevitabile.

Il problema è che nel Build & Fix le modifiche non sono inserite in una struttura progettuale controllata.

Mancano, o sono molto deboli:

- analisi iniziale;
- pianificazione;
- specifica;
- architettura;
- controllo sistematico delle modifiche.

Il risultato può diventare un prodotto sempre più difficile da comprendere e mantenere.

I modelli di ciclo di vita nascono proprio per sostituire questo comportamento ad hoc con un processo più disciplinato.

---

# Modello Waterfall

Il **Waterfall Model** è uno dei modelli storicamente più importanti.

La sua caratteristica fondamentale è la **sequenzialità**.

Le attività vengono organizzate come una cascata: l'output di una fase diventa l'input della successiva e si procede dopo aver completato e verificato la fase corrente.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p005-fig-004.png|520]]

Nel diagramma si riconoscono le principali fasi:

- requisiti;
- specifica;
- progettazione;
- implementazione;
- integrazione;
- modalità operativa;
- dismissione.

## Perché il Waterfall è importante

Il Waterfall introduce disciplina rispetto al Build & Fix.

Invece di iniziare immediatamente a programmare, obbliga a:

- capire il problema;
- documentare ciò che deve essere realizzato;
- progettare prima di implementare;
- verificare gli output delle diverse fasi.

Questo rende il processo più controllabile.

## Il problema della rigidità

Il limite fondamentale è l'assunzione che una fase possa essere sostanzialmente completata prima di iniziare la successiva.

Nella realtà i requisiti possono cambiare per molte ragioni:

- il cliente comprende meglio il problema;
- cambia il mercato;
- cambia una normativa;
- emergono nuovi vincoli tecnici;
- durante la progettazione ci si accorge che un requisito è ambiguo o irrealizzabile.

Se si scopre un problema molto tardi, tornare indietro può essere costoso perché le fasi successive sono già state costruite sulla base delle decisioni precedenti.

Un secondo limite è il **feedback tardivo dell'utente**: se l'utente vede un prodotto realmente utilizzabile soltanto alla fine, eventuali incomprensioni possono emergere molto tardi.

Per questo i modelli successivi cercano di conservare il rigore del Waterfall riducendone la rigidità.

---

# Rapid Prototyping Model

Il **Rapid Prototyping Model** nasce soprattutto per affrontare un problema della fase dei requisiti: spesso cliente e sviluppatore utilizzano le stesse parole ma immaginano cose differenti.

Descrivere un'interfaccia soltanto a parole può essere ambiguo. Un prototipo permette invece all'utente di **provare concretamente una rappresentazione preliminare del sistema**.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p007-fig-006.png|520]]

## Che cos'è un prototipo

Un **prototipo** è una realizzazione rapida e semplificata di alcune parti del prodotto, costruita principalmente per comprendere meglio ciò che l'utente desidera.

Nel materiale del corso l'attenzione è soprattutto sull'interfaccia e sull'interazione con l'utente.

Il prototipo permette di svolgere due attività fondamentali:

- **Requirements Elicitation**: far emergere requisiti che l'utente non aveva espresso chiaramente;
- **Requirements Validation**: verificare che ciò che abbiamo capito corrisponda davvero alle esigenze dell'utente.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p007-fig-007.png|520]]

## Ciclo del prototipo

Il meccanismo è iterativo:

1. si definiscono obiettivi o requisiti iniziali;
2. si sviluppa rapidamente il prototipo;
3. l'utente lo valuta;
4. vengono identificati problemi o nuovi requisiti;
5. il prototipo viene modificato;
6. il ciclo continua finché i requisiti risultano sufficientemente chiari.

## Throw-away prototype

Nel modello descritto nel corso il prototipo dovrebbe essere principalmente **usa e getta** (*throw-away*).

Questo significa che il prototipo viene utilizzato come strumento per comprendere i requisiti e poi abbandonato. Il prodotto reale viene sviluppato successivamente con un processo più rigoroso.

Perché non trasformarlo direttamente nel prodotto finale?

Perché il prototipo viene costruito privilegiando la **rapidità**, non necessariamente:

- qualità dell'architettura;
- manutenibilità;
- efficienza;
- sicurezza;
- completezza;
- robustezza.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p008-fig-008.png|520]]

Un'interfaccia che sembra pronta dopo pochi giorni può inoltre creare nel cliente una falsa percezione: può sembrare che il prodotto sia quasi completo, mentre la parte più difficile - logica, architettura, integrazione, prestazioni, sicurezza - deve ancora essere realizzata.

---

# Process Iteration

I limiti del Waterfall portano a un'idea più generale: invece di trattare lo sviluppo come un'unica sequenza monolitica di grandi fasi, possiamo **ripetere alcune attività più volte** su parti più piccole del prodotto.

Questa idea viene indicata come **process iteration**.

Una **iterazione** è una ripetizione controllata di una sequenza di attività con lo scopo di produrre una versione più completa o più precisa del prodotto.

Due modelli importanti basati sull'iterazione sono:

- sviluppo **incrementale**;
- sviluppo **a spirale**.

---

# Sviluppo Incrementale

Nel **modello incrementale** il prodotto viene costruito e consegnato attraverso una successione di **incrementi**, spesso chiamati **build**.

Una **build** è una versione del prodotto che contiene una parte delle funzionalità previste.

La prima build può essere molto limitata. Le build successive aggiungono progressivamente funzionalità fino ad arrivare al sistema completo.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p008-fig-009.png|520]]

## Perché usare incrementi

Il vantaggio principale è che non dobbiamo aspettare la fine dell'intero progetto per ottenere qualcosa di utilizzabile.

Questo permette:

- feedback frequente del cliente;
- individuazione precoce di errori nei requisiti;
- modifica più semplice di parti limitate del prodotto;
- sviluppo parallelo da parte di più team;
- consegna anticipata delle funzioni più importanti.

## Outline description

Il processo può partire da una **outline description**, cioè una descrizione generale dell'intero prodotto.

Da questa visione complessiva si individuano le parti da sviluppare progressivamente.

---
L'approccio incrementale può essere organizzato in **due versioni**, a seconda che venga definita oppure no un'architettura complessiva del sistema prima di iniziare lo sviluppo delle singole build.

## Incrementale con Overall Architecture

Questa è la versione più conservativa.

Prima si realizza una progettazione architetturale complessiva del prodotto.

L'**architettura software** descrive le principali componenti del sistema e le relazioni tra esse.

Solo dopo aver definito questa struttura generale si procede in modo incrementale sulle singole componenti.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p009-fig-010.png|520]]

Il vantaggio è che, quando sviluppiamo una componente, conosciamo già:

- quali altre componenti esistono;
- con quali dovrà comunicare;
- quali interfacce dovrà rispettare.

Questo riduce i problemi di integrazione.

---

## Incrementale senza Overall Architecture

In questa variante si parte direttamente dai requisiti di maggiore priorità.

Ogni build viene sviluppata quasi come un piccolo progetto indipendente.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p010-fig-011.png|650]]

Il vantaggio è una maggiore velocità iniziale.

Il rischio è che, non avendo definito prima l'architettura complessiva, una nuova build possa risultare difficile da integrare con quelle precedenti.

In altre parole, la difficoltà non è sviluppare la singola funzione, ma scoprire troppo tardi che le parti sono state costruite in modi incompatibili.

---

## Numero di build e costo

Suddividere il prodotto in molti incrementi ha effetti opposti sui costi.

Con più build:

- una modifica interessa mediamente una porzione più piccola del prodotto;
- ma aumenta il numero di integrazioni da eseguire.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p010-fig-012.png|520]]

Il grafico mostra quindi due tendenze:

- **costo delle build/modifiche** che può diminuire aumentando il numero degli incrementi;
- **costo di integrazione** che aumenta quando le build diventano numerose.

La somma genera una regione nella quale il costo totale è minimo.

---

# Waterfall e Incrementale a confronto

Il confronto aiuta a capire perché l'approccio incrementale rappresenta un cambiamento importante.

### Waterfall

- il prodotto viene trattato nel suo insieme;
- le fasi sono fortemente sequenziali;
- il cliente vede tardi il risultato completo;
- modificare requisiti già stabiliti può essere costoso;
- un grande team può lavorare sull'intero prodotto.

### Incrementale

- il prodotto è suddiviso in build;
- alcune attività possono procedere in parallelo;
- il cliente riceve versioni intermedie;
- il feedback arriva prima;
- le modifiche possono essere circoscritte a incrementi più piccoli;
- più team possono lavorare su build differenti.

L'incrementale non significa quindi assenza di disciplina: cambia soprattutto **la granularità con cui viene sviluppato il prodotto**.

---

# Modello a Spirale

Il **modello a spirale** è anch'esso iterativo, ma introduce come elemento centrale la **gestione del rischio**.

Ogni giro della spirale rappresenta un'iterazione del progetto.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p011-fig-013.png|520]]

Nel diagramma:

- avanzando lungo la spirale passa il tempo;
- aumentando la distanza dal centro cresce l'investimento/costo accumulato;
- in ogni iterazione vengono ripetute attività analoghe.

## Attività di un'iterazione

Nel modello presentato negli appunti, ogni ciclo comprende:

1. **Customer Communication** - confronto con il cliente;
2. **Planning** - pianificazione delle attività;
3. **Risk Analysis** - identificazione e valutazione dei rischi;
4. **Engineering** - attività tecniche di specifica e progettazione;
5. **Construction & Release** - costruzione e rilascio;
6. **Customer Evaluation** - valutazione del risultato da parte del cliente.

La caratteristica decisiva è che **prima di investire ulteriormente si analizzano i rischi**.

Se un rischio rende il progetto troppo pericoloso o economicamente insostenibile, si può decidere di non proseguire.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p012-fig-014.png|500]]

Questa seconda rappresentazione evidenzia la differenza dal Waterfall: prima delle principali fasi viene inserita esplicitamente una valutazione del rischio.

---

## Modello a spirale di Boehm

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p013-fig-015.png|650]]

Nella rappresentazione classica di Boehm, il rischio rimane il principio che guida la scelta delle attività da svolgere in ogni iterazione.

Possono essere utilizzati:

- prototipi;
- simulazioni;
- benchmark;
- test esplorativi.

Qui il prototipo ha una funzione diversa rispetto al **Rapid Prototyping Model**.

Nel Rapid Prototyping il prototipo serve principalmente a comprendere e validare i requisiti dell'utente.

Nel modello a spirale un prototipo può invece essere costruito per **ridurre un rischio specifico**.

Esempio: se non sappiamo se una tecnologia sarà abbastanza veloce, possiamo costruire un prototipo soltanto per misurarne le prestazioni prima di progettare l'intero sistema attorno a quella tecnologia.

---
QUI
# Risk Management

Il **rischio** è la possibilità che si verifichi un evento o una circostanza avversa con conseguenze negative sul progetto, sul prodotto o sull'organizzazione.

È utile distinguere due aspetti:

- **probabilità** che il problema avvenga;
- **impatto** che avrebbe se avvenisse.

Un evento molto grave ma estremamente improbabile e un evento moderato ma molto probabile devono essere valutati in modo differente.

## Tipi di rischio

### Project Risk

Influenza il progetto.

Può avere effetti su:

- tempi;
- costi;
- personale;
- disponibilità delle risorse.

Esempio: un componente del team fondamentale lascia l'organizzazione.

### Product Risk

Influenza il prodotto finale.

Può compromettere:

- qualità;
- prestazioni;
- sicurezza;
- affidabilità.

### Business Risk

Influenza l'organizzazione che sta sviluppando il software.

Esempio: viene sviluppato un prodotto tecnicamente corretto ma il mercato cambia e non esiste più una domanda sufficiente.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p014-fig-016.png|650]]

---

## Processo di Risk Management

Il Risk Management viene descritto attraverso quattro attività principali.

### 1. Risk Identification

Obiettivo: individuare quali problemi potrebbero verificarsi.

Si costruisce una lista dei possibili rischi.

Categorie tipiche richiamate negli appunti:

- tecnologia;
- persone;
- organizzazione;
- strumenti;
- requisiti;
- stime.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p014-fig-017.png|520]]

### 2. Risk Analysis

Non tutti i rischi sono ugualmente importanti.

Per ciascun rischio si valuta:

- probabilità di occorrenza;
- gravità dell'effetto.

Da questa valutazione nasce una **priorità**.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p015-fig-018.png|650]]

I rischi più importanti vengono affrontati per primi. Negli appunti viene richiamata l'idea dei **top risks**, cioè un insieme ristretto di rischi prioritari sui quali concentrare l'attenzione.

### 3. Risk Planning

Per i rischi importanti si decide come reagire.

Tre strategie fondamentali:

- **Avoidance**: ridurre la probabilità che il rischio si verifichi;
- **Minimisation**: ridurre l'impatto se il rischio si verifica;
- **Contingency Plan**: predisporre un piano alternativo da applicare se il problema si manifesta.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p015-fig-019.png|520]]

Esempio:

Rischio: una persona è l'unica a conoscere una parte critica del sistema.

- avoidance: distribuire la conoscenza tra più persone;
- minimisation: documentare dettagliatamente quella parte;
- contingency: stabilire chi prenderà in carico il lavoro in caso di assenza improvvisa.

### 4. Risk Monitoring

I rischi non vengono analizzati una sola volta.

Durante il progetto bisogna controllare periodicamente:

- se la probabilità di un rischio è cambiata;
- se il suo impatto è cambiato;
- se sono comparsi nuovi rischi;
- se esistono indicatori che mostrano che un rischio sta iniziando a concretizzarsi.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p016-fig-020.png|500]]

Quindi il Risk Management è un processo **continuo**, non una lista compilata all'inizio e poi dimenticata.

---

# Modello Object Oriented o "a Fontana"

Il modello Object Oriented presentato negli appunti applica l'approccio orientato agli oggetti soprattutto a:

- analisi dei requisiti;
- progettazione.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p016-fig-021.png|500]]

Il fatto che analisi e progettazione siano object-oriented **non impone necessariamente** che il linguaggio di programmazione finale debba essere object-oriented.

La caratteristica grafica importante del modello è che le fasi sono rappresentate come parzialmente sovrapposte.

Questo comunica due idee:

## Concorrenza

Più attività possono essere svolte nello stesso periodo.

Per esempio, mentre alcuni requisiti vengono ancora raffinati, può essere già iniziata l'analisi delle parti sufficientemente stabili.

## Iterazione

Una fase può essere ripetuta per migliorare progressivamente il risultato.

Negli appunti si distinguono:

- iterazioni **intra-fase**: si ritorna su attività interne alla stessa fase;
- iterazioni **inter-fase**: informazioni provenienti da una fase successiva portano a rivedere una fase precedente.

Il modello supera quindi l'idea che ogni fase debba essere chiusa una volta per tutte prima di procedere.

---

# Ingegneria simultanea o concorrente

L'**ingegneria concorrente** cerca di ridurre tempi e costi facendo coesistere attività che in un modello strettamente sequenziale sarebbero svolte una dopo l'altra.

Concorrenza non significa caos.

Se due team lavorano contemporaneamente su parti collegate, devono avere:

- strumenti di condivisione;
- gestione delle versioni;
- comunicazione frequente;
- coordinamento;
- project management efficace.

Il vantaggio potenziale è la riduzione del tempo complessivo; il rischio è l'aumento dei problemi di coordinamento.

---

# Modelli basati su metodi formali

Un'altra famiglia di approcci utilizza **specifiche formali**, cioè descrizioni espresse con linguaggi dotati di una base matematica precisa.

L'obiettivo è ridurre l'ambiguità e permettere verifiche rigorose o automatizzate.

Questi approcci sono particolarmente importanti nei **sistemi critici**, nei quali un comportamento errato può avere conseguenze molto gravi.

Il costo è però elevato:

- richiedono competenze specialistiche;
- richiedono più tempo nella fase di specifica;
- non sempre è conveniente formalizzare ogni parte del sistema.

Gli appunti citano come esempio la **Cleanroom Software Engineering**, orientata a prevenire l'introduzione di difetti e a sviluppare software ad alta affidabilità attraverso processi rigorosi.

---

# Modelli corporate: perché compaiono

Molti modelli classici vengono descritti pensando a un **software a contratto**: esiste un cliente che commissiona un sistema e può fornire requisiti e feedback.

Un'azienda che sviluppa invece un prodotto per il mercato si trova in una situazione differente:

- non esiste un singolo cliente che stabilisce i requisiti;
- bisogna anticipare i bisogni del mercato;
- la data di rilascio può avere grande importanza commerciale;
- molte decisioni vengono prese internamente da product manager e management.

Gli appunti analizzano due esempi storici: Microsoft e Netscape.

---

# Microsoft - Synchronize and Stabilize

Il modello **Synchronize-and-Stabilize** combina caratteristiche:

- iterative;
- incrementali;
- concorrenti.

L'idea è consentire a piccoli gruppi di lavorare con una certa autonomia, ma sincronizzando continuamente il loro lavoro.

## Sincronizzazione quotidiana

Gli sviluppatori lavorano individualmente o in piccoli team sulle parti assegnate.

Entro una determinata ora il lavoro viene integrato in un **daily build**.

Un **daily build** è una versione del prodotto costruita integrando il codice sviluppato fino a quel momento.

La funzione del daily build non è soltanto produrre una nuova copia del programma: serve a scoprire rapidamente se il lavoro dei diversi team continua a essere compatibile.

Se una modifica rompe la build, il problema viene individuato quasi immediatamente invece di emergere settimane dopo.

## Stabilizzazione periodica

Periodicamente il progetto raggiunge una **milestone**, cioè un punto significativo di avanzamento nel quale viene prodotta una versione più stabile e completa.

Il progetto viene quindi portato avanti attraverso più cicli, alternando:

- sviluppo parallelo;
- sincronizzazione;
- stabilizzazione.

## Ciclo di sviluppo Microsoft

### Planning

Si costruisce una **product vision**, cioè una descrizione degli obiettivi generali del prodotto.

Successivamente:

- viene raffinata la specifica funzionale;
- vengono pianificate le attività;
- vengono creati i team;
- vengono assegnate priorità alle funzionalità.

La product vision è necessaria proprio perché non esiste un cliente unico che abbia commissionato il sistema.

### Development

Il progetto viene suddiviso in pochi sottoprogetti associati a milestone.

Si progettano, implementano e correggono le funzionalità.

Le funzioni più critiche vengono affrontate presto, così da scoprire problemi importanti quando il progetto non è ancora troppo avanzato.

### Stabilization

Prima del rilascio commerciale viene eseguita una fase specifica di stabilizzazione.

Comprende:

- testing interno, indicato come **alpha testing**;
- testing esterno con utenti o partner selezionati, indicato come **beta testing**;
- correzione dei difetti;
- preparazione della versione finale.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p019-fig-022.png|650]]

Il grafico degli appunti mostra l'andamento giornaliero di diversi indicatori legati ai bug:

- bug aperti;
- bug analizzati/risolti dal punto di vista diagnostico;
- bug effettivamente corretti.

L'aspetto importante è l'uso di misure frequenti per osservare lo stato del prodotto.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p019-fig-023.png|500]]

Il secondo diagramma mostra come la specifica continui a evolvere durante lo sviluppo, mentre il progetto viene suddiviso in cicli che terminano con milestone e versioni progressivamente più mature.

---

# Modello Netscape

Negli appunti Netscape viene presentata come un'organizzazione che adottava un modello simile per prodotti Internet, ma con una struttura più leggera e meno controllata.

Vengono evidenziati:

- meno tester rispetto agli sviluppatori;
- minore pianificazione;
- documentazione incompleta;
- maggiore dipendenza dall'esperienza dei project manager;
- minore disponibilità di dati storici per supportare le decisioni.

La **vision** nasceva tramite riunioni di pianificazione avanzata nelle quali venivano considerate le opportunità di mercato.

Successivamente:

- veniva definita una specifica funzionale;
- venivano allocate risorse;
- lo sviluppo veniva controllato con meeting periodici;
- venivano prodotte versioni alpha e beta;
- dopo stabilizzazione e debugging si arrivava alla versione definitiva, indicata come **RTM - Release to Manufacturing**.

L'esempio viene utilizzato soprattutto per sottolineare l'importanza di prendere decisioni basandosi su dati e processi di controllo, non soltanto sull'esperienza individuale.

---

# Metodi Agili

I **metodi Agile** nascono come reazione a processi percepiti come eccessivamente pesanti e rigidi.

Non significano però "sviluppare senza processo".

Questa distinzione è fondamentale:

- **Build & Fix** = modifiche ad hoc senza struttura sistematica;
- **Agile** = processo leggero ma intenzionalmente organizzato, iterativo e basato su feedback frequente.

Agile porta ancora più avanti alcune idee già presenti nell'incrementale:

- incrementi piccoli;
- consegne frequenti;
- contatto continuo con cliente e utenti;
- capacità di reagire rapidamente al cambiamento;
- forte collaborazione nel team.

## I quattro valori dell'Agile Manifesto

Il Manifesto Agile esprime quattro preferenze fondamentali.

### Individui e interazioni più che processi e strumenti

Processi e strumenti sono utili, ma non sostituiscono la capacità delle persone di comunicare, collaborare e risolvere problemi.

### Software funzionante più che documentazione esaustiva

La documentazione non viene eliminata. Il punto è che la misura concreta dei progressi deve essere soprattutto la disponibilità di software che funziona.

### Collaborazione con il cliente più che negoziazione contrattuale

Un contratto non può prevedere perfettamente ogni esigenza futura. La collaborazione continua consente di adattare il prodotto quando emergono nuove informazioni.

### Rispondere al cambiamento più che seguire un piano

Il piano rimane utile, ma non deve impedire di reagire a cambiamenti reali nei requisiti o nel contesto.

L'idea centrale del Manifesto non è che gli elementi "a destra" siano inutili, ma che quelli "a sinistra" abbiano maggiore importanza quando bisogna scegliere.

Gli appunti ricordano inoltre l'esistenza dei **12 principi Agile**, che sviluppano ulteriormente idee come:

- consegna frequente di software funzionante;
- collaborazione continua;
- team motivati e auto-organizzati;
- semplicità;
- qualità tecnica;
- miglioramento periodico del modo di lavorare.

---

# Scrum

**Scrum** è uno dei framework più noti utilizzati nell'ambito Agile.

Un **framework** è una struttura generale di lavoro che definisce ruoli, eventi, artefatti e regole fondamentali, lasciando al team libertà su molte decisioni tecniche concrete.

Scrum organizza il lavoro in cicli brevi chiamati **Sprint**.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p022-fig-025.png|520]]

## Sprint

Uno **Sprint** è un intervallo di lavoro a durata limitata nel quale il team cerca di produrre un nuovo **incremento** del prodotto.

Negli appunti viene indicata una durata tipica di circa **2-4 settimane**.

Il vantaggio di una durata breve è ridurre il tempo tra:

- decisione;
- sviluppo;
- risultato funzionante;
- feedback.

Se abbiamo capito male un requisito, è meglio scoprirlo dopo poche settimane che dopo un anno.

---

## Ruoli principali presentati nel corso

### Product Owner

Il **Product Owner** rappresenta le esigenze del prodotto e gestisce le priorità.

È responsabile del **Product Backlog**, cioè l'insieme ordinato del lavoro desiderato per il prodotto.

La priorità è importante perché non tutto può essere sviluppato contemporaneamente.

### Scrum Master

Lo **Scrum Master** aiuta il gruppo a comprendere e applicare Scrum correttamente.

Non deve essere pensato semplicemente come un capo che assegna compiti agli sviluppatori.

Il suo ruolo riguarda soprattutto:

- facilitazione;
- rimozione degli ostacoli organizzativi;
- tutela del processo Scrum;
- supporto al team e al Product Owner.

### Development Team

Negli appunti viene utilizzata la terminologia **Development Team**, riferita al gruppo che svolge concretamente il lavoro tecnico necessario a realizzare l'incremento:

- progettazione;
- codifica;
- testing;
- integrazione.

L'idea importante è che il team sia **self-organizing**, cioè capace di organizzare internamente il lavoro senza una prescrizione dettagliata dall'esterno di ogni attività tecnica.

---

## Product Backlog

Il **Product Backlog** contiene il lavoro che potrebbe essere necessario per evolvere il prodotto.

Può comprendere:

- funzionalità;
- miglioramenti;
- correzioni;
- requisiti;
- attività tecniche.

Gli elementi hanno una priorità e possono evolvere nel tempo.

Il backlog non è quindi una lista immutabile definita una volta per tutte.

---

## Sprint Planning

All'inizio dello Sprint il team decide quale lavoro affrontare.

Una parte degli elementi più importanti del Product Backlog viene selezionata per lo Sprint.

Da questa attività nasce lo **Sprint Backlog**, cioè l'insieme del lavoro scelto e necessario per raggiungere l'obiettivo dello Sprint.

---

## Development Work e Daily Scrum

Durante lo Sprint il team sviluppa l'incremento.

Gli appunti richiamano il **Daily Scrum**, un incontro quotidiano breve che aiuta il gruppo a sincronizzare il lavoro e a identificare rapidamente ostacoli e problemi.

Il valore del Daily Scrum non è produrre documentazione, ma ridurre la distanza informativa tra le persone che stanno lavorando allo stesso incremento.

---

## Sprint Review

Alla fine dello Sprint il risultato viene mostrato e discusso con le persone interessate.

Lo scopo è raccogliere feedback sul prodotto effettivamente realizzato.

Il feedback può modificare le priorità future del Product Backlog.

---

## Sprint Retrospective

La **Sprint Retrospective** riguarda soprattutto il **modo in cui il team ha lavorato**.

Il gruppo riflette su:

- cosa ha funzionato bene;
- quali problemi sono emersi;
- cosa può essere migliorato nello Sprint successivo.

Quindi:

- **Review** -> attenzione soprattutto al prodotto;
- **Retrospective** -> attenzione soprattutto al processo e alla collaborazione del team.

---

## Timeboxing

Uno **timebox** è un intervallo di tempo con durata fissata.

In Scrum non si prolunga indefinitamente uno Sprint perché alcune attività non sono state completate.

Se qualcosa non viene terminato, il lavoro residuo viene rivalutato e potrà essere pianificato successivamente.

Questo mantiene stabile il ritmo del processo e permette di ricevere feedback a intervalli regolari.

---

## Definition of Done

La **Definition of Done** stabilisce i criteri che devono essere soddisfatti affinché un lavoro possa essere considerato realmente completato.

Serve a evitare che persone diverse attribuiscano significati diversi alla parola "finito".

Per esempio, una funzionalità potrebbe essere considerata *done* soltanto quando:

- è stata implementata;
- è stata testata;
- è stata integrata;
- rispetta gli standard tecnici concordati.

La Definition of Done rende quindi trasparente il livello di qualità richiesto all'incremento.

---

# User Story

Una **User Story** è una forma breve di descrizione di un bisogno dal punto di vista dell'utente.

Il formato tipico è:

`As a <role>, I want <goal> so that <benefit>`

cioè:

- **role** -> chi ha il bisogno;
- **goal** -> cosa vuole ottenere;
- **benefit** -> perché quella funzione produce valore.

Esempio:

`As a student, I want to see my exam results so that I can monitor my academic progress.`

Una User Story non dovrebbe essere interpretata come una specifica tecnica completa. Serve a catturare il bisogno in modo compatto e comprensibile, lasciando spazio alla successiva discussione dei dettagli.

Una storia troppo grande per essere affrontata direttamente può essere chiamata **Epic** e successivamente suddivisa in User Stories più piccole.

Le User Stories possono essere gestite all'interno del Product Backlog e selezionate negli Sprint.

---

# Dal prodotto al processo dell'organizzazione

Finora abbiamo discusso come organizzare lo sviluppo di un singolo prodotto.

Resta però un'altra domanda:

**come possiamo valutare quanto un'organizzazione sia capace di sviluppare software in modo sistematico e controllato?**

Due aziende potrebbero utilizzare gli stessi linguaggi e strumenti, ma avere processi completamente differenti:

- una dipende dalle capacità eccezionali di poche persone;
- l'altra possiede procedure, misure e pratiche condivise che rendono i risultati più prevedibili.

Questa è l'idea alla base del **Capability Maturity Model**.

---

# CMM - Capability Maturity Model

Il **CMM** è un modello sviluppato dal Software Engineering Institute per descrivere la **maturità del processo software** di un'organizzazione.

La maturità indica quanto il processo sia:

- definito;
- ripetibile;
- controllato;
- misurabile;
- migliorabile.

Il modello classico è organizzato in **cinque livelli**.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p024-fig-026.png|650]]

## Livello 1 - Initial

Il processo è sostanzialmente **ad hoc**.

Il successo dipende fortemente dalle capacità individuali di persone particolarmente competenti, spesso indicate negli appunti come **heroes**.

Caratteristiche:

- processo poco stabile;
- risultati difficili da prevedere;
- modalità di lavoro fortemente dipendenti dalle persone.

Il fatto che un'organizzazione riesca talvolta a produrre ottimo software non significa che possieda un processo maturo: potrebbe aver avuto semplicemente un team eccezionale.

---

## Livello 2 - Repeatable

Vengono introdotte pratiche fondamentali di **project management**.

L'organizzazione riesce a:

- pianificare;
- monitorare;
- controllare aspetti fondamentali del progetto;
- ripetere pratiche che hanno già prodotto risultati positivi.

L'obiettivo è passare dal successo occasionale a una capacità almeno parzialmente riproducibile.

Negli appunti sono associate a questo livello aree come:

- Software Configuration Management;
- Software Quality Assurance;
- Software Subcontract Management.

---

## Livello 3 - Defined

Il processo diventa **documentato, standardizzato e integrato** a livello organizzativo.

Non esiste soltanto una buona pratica locale di un singolo team: l'organizzazione dispone di un processo definito e condiviso.

Tra gli esempi richiamati negli appunti:

- Peer Reviews;
- Training Program.

Il passaggio dal livello 2 al livello 3 può essere pensato così:

- livello 2 -> sappiamo gestire e ripetere i progetti;
- livello 3 -> possediamo un processo organizzativo esplicitamente definito.

---

## Livello 4 - Managed

Il processo viene gestito anche attraverso **misure quantitative**.

L'organizzazione non si limita a seguire procedure: raccoglie dati per capire come il processo stia realmente funzionando.

Questo permette di controllare variazioni e prestazioni sulla base di evidenze, non soltanto di impressioni.

---

## Livello 5 - Optimizing

L'organizzazione utilizza ciò che misura per **migliorare continuamente il processo**.

Non si limita quindi a controllare che il processo funzioni come previsto, ma cerca sistematicamente di renderlo migliore.

Negli appunti viene citata, tra le pratiche di livello elevato, la **Defect Prevention**: non limitarsi a trovare e correggere difetti, ma analizzare le cause che li producono per impedirne l'introduzione futura.

---

# CMM come modello additivo

Il modello è presentato nel corso come **additivo**.

Questo significa che un'organizzazione che raggiunge un livello elevato deve aver soddisfatto anche le capacità richieste dai livelli precedenti.

Non avrebbe senso, per esempio, dichiarare di ottimizzare quantitativamente un processo di livello 5 se il processo non fosse nemmeno definito e controllato ai livelli inferiori.

Il percorso logico è quindi:

**ad hoc -> ripetibile -> definito -> misurato/gestito -> migliorato continuamente**.

---

# KPA - Key Process Areas

Nel CMM classico i livelli sono associati a **Key Process Areas (KPA)**, cioè aree di processo considerate fondamentali per raggiungere un determinato livello di maturità.

Una KPA specifica aspetti come:

- obiettivi;
- responsabilità;
- risorse;
- attività da svolgere;
- modalità di monitoraggio;
- modalità di verifica.

Negli appunti vengono richiamate complessivamente **18 KPA** nel modello classico.

L'idea importante non è semplicemente memorizzare un elenco, ma comprendere che il livello di maturità viene valutato osservando **come l'organizzazione lavora concretamente**, non soltanto la qualità apparente di un singolo programma prodotto.

![[content/UNI/ANNO 3/INGEGNERIA DEL SOFTWARE/GPT PREMIUMS/14_agosto_appunti/assets/p024-fig-027.png|650]]

Il grafico conclusivo serve a rafforzare l'idea generale del CMM: aumentando la maturità del processo si cerca di ridurre il rischio e aumentare prevedibilità e qualità.

---

# Collegamento complessivo degli argomenti

L'intero blocco studiato oggi può essere visto come una sola evoluzione logica.

All'inizio il software viene trattato come semplice attività di programmazione. Crescendo dimensione e complessità dei prodotti, questo approccio non è più sufficiente.

Nasce quindi l'**Ingegneria del Software**, che cerca di controllare l'intero **ciclo di vita** del prodotto attraverso un **processo software**.

La prima risposta al caos del Build & Fix è un modello fortemente disciplinato come il **Waterfall**. Il Waterfall porta ordine, ma mostra rigidità quando requisiti e condizioni cambiano.

Per ridurre questi problemi compaiono:

- **Rapid Prototyping**, per comprendere meglio i requisiti attraverso feedback precoce;
- **Incremental Development**, per costruire il prodotto in parti successive;
- **Spiral Model**, per rendere il rischio il criterio guida delle iterazioni;
- modelli **concorrenti** e **object-oriented**, per permettere maggiore sovrapposizione e iterazione tra attività.

Nelle organizzazioni che sviluppano prodotti direttamente per il mercato compaiono processi corporate come **Synchronize-and-Stabilize**, basati su piccoli team, integrazione frequente e milestone.

L'approccio **Agile** porta ancora più avanti il principio di feedback rapido e adattamento al cambiamento, mantenendo però un'organizzazione sistematica. **Scrum** fornisce una struttura concreta basata su Sprint, backlog, ruoli ed eventi.

Infine il **CMM** sposta l'attenzione dal singolo progetto all'organizzazione: non chiede soltanto "questo software è buono?", ma **"l'organizzazione possiede un processo abbastanza maturo da produrre software di buona qualità in modo ripetibile e controllato?"**.
