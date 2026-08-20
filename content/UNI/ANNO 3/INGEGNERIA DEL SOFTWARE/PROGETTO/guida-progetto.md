# Guida al progetto di Ingegneria del Software — MyAma

## Perché esiste questa guida

Abbiamo già un'idea di progetto: **MyAma**, una piattaforma che permette ai cittadini di organizzare il ritiro a domicilio o il conferimento presso una sede AMA di rifiuti ingombranti.

Sapere che cosa vogliamo progettare, però, non significa ancora sapere **come si costruisce un progetto di Ingegneria del Software**.

Il compito che dobbiamo svolgere non consiste principalmente nel programmare MyAma. Prima di arrivare all'implementazione dobbiamo costruire una **specifica software**, cioè una descrizione precisa e coerente del sistema che vogliamo realizzare:

- chi lo utilizza;
- quali servizi deve offrire;
- quali vincoli deve rispettare;
- come si comporta nei diversi scenari;
- quali oggetti e classi sono necessari per rappresentarlo;
- come questi oggetti collaborano tra loro;
- come il modello può essere migliorato attraverso opportuni Design Pattern.

Questa guida serve quindi a capire il **filo logico generale del progetto**.

Non vuole sostituire la teoria del corso e non vuole ancora spiegare nel dettaglio come disegnare ogni diagramma. Quello sarà il compito della successiva `guida-operativa.md`.

Qui vogliamo arrivare a una cosa più semplice ma fondamentale:

> capire che cosa stiamo costruendo, perché ogni passaggio serve e come un risultato porta naturalmente al successivo.

---

# Dall'idea alla specifica

Il punto di partenza è `idea.md`.

Lì abbiamo definito, a grandi linee, MyAma: cittadini, lavoratori AMA, sedi, veicoli, prenotazioni, ritiro a domicilio e conferimento in sede.

Quella descrizione è sufficiente per spiegare il progetto a una persona, ma non è ancora abbastanza precisa per progettare un sistema software.

Dire, ad esempio:

> "Il cittadino può prenotare un ritiro a domicilio."

lascia aperte moltissime domande:

- Chi è esattamente il cittadino per il sistema?
- Deve essere registrato?
- Quali informazioni deve fornire?
- Come viene scelta la data?
- Cosa succede se il CAP non è servito?
- Come viene stabilito se un veicolo è disponibile?
- Il cittadino può annullare?
- Chi gestisce il ritiro?
- Quale stato assume la prenotazione dopo il completamento?

Il progetto serve proprio a trasformare progressivamente una frase generale come questa in un modello sufficientemente preciso da poter essere compreso e, in seguito, implementato.

Possiamo quindi vedere tutto il lavoro come una progressiva riduzione dell'ambiguità:

```text
idea generale
↓
dominio e Problem Statement
↓
utenti e loro obiettivi
↓
Use Case
↓
requisiti più precisi
↓
modelli del comportamento
↓
interazioni tra gli oggetti
↓
struttura delle classi
↓
raffinamento progettuale
↓
Design Pattern
↓
specifica finale coerente
```

Questa è la logica complessiva del progetto.

---

# 1. Partiamo dal dominio e dal Problem Statement

La prima cosa da fare non è aprire Visual Paradigm.

Prima dobbiamo essere sicuri di sapere **quale problema vogliamo descrivere**.

Per MyAma il dominio generale è già noto: gestione della prenotazione e dell'organizzazione del ritiro o del conferimento di rifiuti ingombranti.

Dobbiamo però delimitare il sistema.

Per esempio, possiamo decidere che il nucleo del progetto comprenda:

- prenotazione del ritiro a domicilio;
- prenotazione del conferimento in sede;
- gestione delle informazioni sul rifiuto;
- verifica della zona servita;
- gestione di sedi, lavoratori e veicoli;
- gestione dello stato della prenotazione.

Altre funzionalità, come notifiche, recensioni, reportistica o autenticazione tramite SPID, possono essere valutate successivamente.

Questa delimitazione viene riassunta nel **Problem Statement**.

Il Problem Statement è importante perché diventa il riferimento iniziale di tutto ciò che verrà dopo.

Se nel Problem Statement decidiamo che MyAma deve gestire soltanto ritiro e conferimento, non avrebbe senso trovare improvvisamente più avanti un Use Case relativo alla vendita di contenitori per rifiuti.

Al contrario, se diciamo che il sistema deve coordinare le disponibilità dei veicoli per i ritiri, questa esigenza dovrà poi comparire in qualche forma nei requisiti e nei modelli.

Il Problem Statement serve quindi a stabilire:

> **qual è il sistema di cui stiamo parlando?**

Quando abbiamo una risposta condivisa a questa domanda possiamo iniziare ad analizzare chi utilizza il sistema.

---

# 2. Dal problema agli utenti del sistema

Una volta definito il dominio, dobbiamo capire **chi interagisce con MyAma**.

Nel nostro caso emergono naturalmente diversi ruoli:

- Cliente / Cittadino;
- Autista AMA;
- Operatore di sede;
- eventuale figura di gestione operativa AMA.

Non basta però fare un elenco di persone.

Per ogni attore dobbiamo iniziare a chiederci:

> che cosa vuole ottenere attraverso MyAma?

Il Cliente, per esempio, non utilizza il sistema perché è interessato alle classi o al database. Vuole raggiungere obiettivi concreti:

- prenotare un ritiro;
- prenotare un conferimento;
- vedere le proprie prenotazioni;
- eventualmente annullare una prenotazione;
- conoscere le opzioni disponibili.

L'Autista ha obiettivi diversi:

- vedere i ritiri assegnati;
- conoscere le informazioni necessarie;
- registrare l'esito del ritiro.

L'Operatore di sede, invece, deve gestire le prenotazioni relative ai conferimenti.

Questa analisi ci porta naturalmente al concetto che nei progetti dei compagni occupa gran parte della sezione dei **User Requirements**: i **Use Case**.

---

# 3. I Use Case trasformano gli obiettivi in scenari

A questo punto sappiamo chi utilizza il sistema e quali obiettivi generali ha.

Quello che ancora ci manca è una descrizione più chiara di **come questi obiettivi vengono raggiunti attraverso il sistema**.

Per questo costruiamo i Use Case.

Un Use Case non rappresenta un singolo click o una singola schermata. Rappresenta un obiettivo significativo dell'attore.

Per esempio:

```text
Cliente
→ Prenota ritiro a domicilio
```

è un Use Case sensato.

Al contrario:

```text
Cliente
→ Inserisce CAP
→ Seleziona data
→ Preme conferma
```

non rappresenta tre obiettivi separati: sono passaggi interni dello stesso obiettivo.

Nei progetti di riferimento i Use Case vengono normalmente organizzati per attore e accompagnati da:

- diagramma;
- descrizione testuale;
- attori coinvolti;
- precondizioni;
- scenario principale;
- scenari alternativi;
- post-condizioni.

Questo è importante perché il diagramma da solo dice molto poco.

Vedere un'ellisse chiamata `Prenota ritiro` ci dice che quella funzionalità esiste, ma non ci spiega cosa succede se il CAP non è servito, se non ci sono disponibilità o se il cittadino annulla.

La descrizione testuale rende quindi l'interazione sufficientemente chiara da poter essere analizzata.

Per MyAma potremmo arrivare, per esempio, a uno scenario di questo tipo:

```text
Il Cliente sceglie il ritiro a domicilio.
↓
Indica le informazioni sul rifiuto e l'indirizzo.
↓
Il sistema verifica la zona.
↓
Mostra le disponibilità compatibili.
↓
Il Cliente sceglie una disponibilità.
↓
La prenotazione viene registrata.
```

A questo punto abbiamo fatto un grande passo avanti: non abbiamo più soltanto un'idea generale, ma iniziamo a descrivere **come il sistema viene utilizzato**.

Tuttavia non abbiamo ancora una specifica completa.

---

# 4. Dai Use Case ai requisiti del sistema

I Use Case sono molto utili perché descrivono gli obiettivi degli attori e i principali scenari.

Ma raccontano il sistema soprattutto dal punto di vista dell'interazione.

Ora dobbiamo trasformare ciò che abbiamo scoperto in affermazioni più precise su **ciò che il software deve garantire**.

Da qui nascono i **System Requirements**.

Prendiamo ancora il caso del ritiro.

Dal Use Case:

```text
Prenota ritiro a domicilio
```

potrebbero emergere capacità come:

- acquisire le informazioni sul rifiuto;
- verificare che il CAP sia servito;
- mostrare le disponibilità compatibili;
- registrare la prenotazione.

Queste capacità possono diventare requisiti veri e propri:

```text
Il sistema deve consentire al Cliente di indicare le informazioni necessarie sul rifiuto.

Il sistema deve verificare che l'indirizzo indicato appartenga a una zona servita.

Il sistema deve mostrare le disponibilità compatibili con la richiesta.

Il sistema deve registrare la prenotazione confermata.
```

Nei progetti dei compagni questi requisiti vengono normalmente distinti in tre gruppi:

- **requisiti funzionali** — cosa deve fare il sistema;
- **requisiti non funzionali** — qualità o vincoli del servizio, come prestazioni o affidabilità;
- **requisiti di dominio** — regole imposte dal contesto in cui MyAma opera.

Questa distinzione ci permette di passare da una descrizione narrativa a una specifica molto più controllabile.

---

# 5. Un requisito deve anche poter essere verificato

Scrivere un requisito non basta.

Se scriviamo:

> "MyAma deve essere veloce."

abbiamo espresso un desiderio, ma non sappiamo realmente quando considerarlo soddisfatto.

Il professore richiede esplicitamente di descrivere gli aspetti legati alla **verificabilità dei requisiti**.

Il principio è semplice:

> un requisito deve essere formulato in modo che sia possibile stabilire se il sistema lo soddisfa oppure no.

Per un requisito funzionale questo può significare osservare il risultato.

Per esempio:

```text
Requisito:
Il sistema deve consentire di annullare una prenotazione quando l'annullamento è consentito.

Verifica:
partendo da una prenotazione annullabile, dopo l'operazione
la prenotazione deve risultare annullata e non più attiva.
```

Per un requisito non funzionale possono invece servire metriche o soglie.

Questa fase è importante perché ci obbliga a correggere requisiti troppo vaghi prima di iniziare a modellare il sistema.

Quando arriviamo qui, possiamo dire di sapere abbastanza bene **che cosa deve fare MyAma**.

Ora nasce una nuova domanda:

> come rappresentiamo in modo più preciso il comportamento e la struttura del sistema?

Da qui inizia la parte di OOA.

---

# 6. Dalla descrizione testuale ai modelli OOA

Fino a questo punto abbiamo lavorato soprattutto con testo e Use Case.

Abbiamo definito:

- problema;
- attori;
- obiettivi;
- scenari;
- requisiti;
- vincoli.

Queste informazioni sono fondamentali, ma un sistema software complesso è difficile da comprendere soltanto attraverso pagine di testo.

La **Object Oriented Analysis (OOA)** ci permette di costruire diversi modelli, ognuno dei quali risponde a una domanda diversa.

Non dobbiamo pensare ai diagrammi come a disegni indipendenti da produrre perché "il progetto li richiede".

Ogni modello serve a chiarire un aspetto che quello precedente non rendeva sufficientemente visibile.

Nei progetti dei compagni troviamo in modo molto ricorrente:

```text
Activity Diagram
↓
Sequence Diagram
↓
Class Diagram Unrefined
↓
Class Diagram Refined
```

Questa sequenza descrive **come matura il modello**, non obbliga però a conservare tutti i diagrammi nello stesso progetto Visual Paradigm.

Un progetto precedente di riferimento, per esempio, organizza i sorgenti in più file `.vpp` separati, tra cui file dedicati ad attori o aree (`CLIENTE.vpp`, `UTENTE.vpp`, `SERVIZIO.vpp`, `AMMINISTRAZIONE.vpp`) e file dedicati ai modelli trasversali (`CLASSE UNREFINED.vpp`, `CLASSE REFINED.vpp`, `DESIGNPATTERNS.vpp`).

Quindi dobbiamo distinguere due aspetti:

```text
ordine logico del progetto
→ come un modello nasce e viene raffinato

organizzazione dei file .vpp
→ come il gruppo decide di distribuire materialmente i diagrammi
```

La prima cosa è importante per capire il progetto; la seconda è una scelta operativa, che verrà trattata nella `guida-operativa.md` e nella `divisione-compiti.md`.

Il valore della sequenza si capisce meglio se guardiamo che cosa aggiunge ogni passaggio.

---

# 7. Activity Diagram: rendere visibile il flusso

Una descrizione testuale di un Use Case può contenere:

- passi;
- condizioni;
- alternative;
- eccezioni.

Quando il flusso diventa articolato, leggerlo soltanto in forma testuale può essere scomodo.

L'**Activity Diagram** rende visivamente esplicito il processo.

Per esempio, il nostro ritiro potrebbe avere un flusso concettuale simile:

```text
inserimento informazioni
↓
verifica CAP
↓
CAP servito?
├─ no → richiesta non proseguibile
└─ sì
   ↓
   ricerca disponibilità
   ↓
   scelta
   ↓
   conferma
```

Il diagramma non aggiunge necessariamente nuove funzionalità.

Piuttosto ci aiuta a controllare se il flusso che abbiamo descritto nei Use Case è coerente.

Quando abbiamo chiarito **quali attività avvengono e in quale ordine**, resta però una domanda ancora più importante:

> quali oggetti del sistema collaborano per realizzare queste attività?

Per rispondere iniziamo ad avvicinarci al modello delle classi e ai Sequence Diagram.

---

# 8. Dalle informazioni del dominio alle prime classi

Durante tutto il lavoro precedente sono comparsi continuamente concetti come:

- Cliente;
- Prenotazione;
- Rifiuto;
- Sede;
- Veicolo;
- Lavoratore;
- Autista.

Questi concetti sono candidati naturali per il modello a oggetti.

Questo non significa che ogni sostantivo diventi automaticamente una classe.

Per esempio:

- `Veicolo` può essere una classe;
- `peso` probabilmente è un attributo;
- `CAP` potrebbe essere modellato in modi diversi a seconda delle necessità del sistema.

L'analisi delle classi serve a iniziare a costruire una rappresentazione statica del dominio:

> quali oggetti esistono e quali relazioni hanno?

Possiamo quindi preparare un primo modello provvisorio.

Ma questo modello non dovrebbe essere costruito isolatamente.

Sapere che esistono `Cliente` e `Prenotazione`, infatti, non ci dice ancora bene **chi deve fare cosa** quando viene eseguito un Use Case.

Per questo entrano in gioco i Sequence Diagram.

---

# 9. Sequence Diagram: capire le collaborazioni

L'Activity Diagram ci ha mostrato il flusso.

Il modello delle classi ci ha mostrato i concetti principali.

Il **Sequence Diagram** mette insieme queste informazioni e prova a rispondere a:

> durante uno scenario concreto, quali oggetti interagiscono e quali messaggi si scambiano?

Torniamo ancora al nostro esempio.

Il Cliente vuole prenotare un ritiro.

In modo puramente concettuale potremmo avere un'interazione tra:

```text
Cliente
↓
interfaccia del sistema
↓
oggetto che coordina la prenotazione
↓
oggetti del dominio
```

Durante questa analisi possono emergere operazioni come:

- verificare una zona;
- cercare disponibilità;
- creare una prenotazione;
- aggiornare lo stato.

E qui avviene una cosa molto importante:

> il Sequence Diagram può mostrarci che il Class Diagram iniziale è incompleto o sbagliato.

Se durante lo scenario scopriamo che serve un oggetto che non avevamo previsto, dobbiamo aggiornare il modello.

Se un oggetto riceve troppe responsabilità, potremmo doverle distribuire.

Se emerge un'operazione, dovremo capire a quale classe appartiene.

Per questo Sequence Diagram e Class Diagram non sono due esercizi completamente separati.

Il lavoro reale è più simile a:

```text
prima ipotesi delle classi
        ↕
Sequence Diagram
        ↕
correzione delle responsabilità
        ↕
raffinamento del Class Diagram
```

Questa iterazione ci porta progressivamente verso un modello più stabile.

---

# 10. Class Diagram Unrefined e Refined

Nei tre progetti di riferimento compare la distinzione tra:

- **Class Diagram Unrefined**;
- **Class Diagram Refined**.

Il significato generale è quello di mostrare due livelli successivi di maturazione del modello.

L'Unrefined rappresenta una versione più vicina al risultato dell'analisi iniziale.

Il Refined rappresenta un modello successivamente approfondito e reso più preciso.

Tra i due possono essere raffinati, a seconda del modello:

- attributi;
- operazioni;
- responsabilità;
- relazioni;
- parametri;
- visibilità;
- elementi Boundary, Control ed Entity.

Non dobbiamo però pensare che esista necessariamente un momento preciso in cui "finisce l'Unrefined" e poi, senza più tornare indietro, "inizia il Refined".

Come abbiamo visto, il modello viene corretto progressivamente anche grazie ai Sequence Diagram.

La cosa importante è che alla fine la struttura delle classi sia coerente con ciò che abbiamo stabilito nei requisiti e negli scenari.

Arrivati qui abbiamo quindi un **Class Diagram ottenuto dalla specifica**.

Ed è proprio su questo modello che il professore chiede di applicare i Design Pattern.

---

# 11. I Design Pattern arrivano dopo il problema

Questo passaggio è importante perché è facile affrontarlo nel modo sbagliato.

Non dobbiamo partire dicendo:

> "Mettiamo Observer e Strategy perché sono pattern che conosciamo."

Il ragionamento corretto è l'opposto.

Prima costruiamo il modello di MyAma.

Poi lo osserviamo e cerchiamo problemi progettuali reali.

Per esempio potremmo scoprire che:

- diversi oggetti devono reagire a un cambiamento di stato;
- la creazione di alcuni oggetti dipende troppo da classi concrete;
- esistono diversi comportamenti intercambiabili;
- una classe accumula troppe responsabilità.

Solo a quel punto valutiamo quale Design Pattern studiato a lezione rappresenta una buona soluzione.

I progetti dei compagni seguono proprio questo tipo di ragionamento: il pattern viene accompagnato dalla spiegazione del problema che vuole risolvere e dalle modifiche che produce sul modello.

Per MyAma abbiamo già alcune idee possibili, come notifiche, gestione degli stati o diverse strategie operative, ma per ora devono restare **candidati**.

La scelta vera avverrà quando avremo davanti il Class Diagram.

Il professore richiede l'applicazione di almeno due Design Pattern al Class Diagram ottenuto durante la specifica.

Quindi il risultato finale non deve essere:

```text
modello
+
due pattern aggiunti come decorazione
```

ma:

```text
modello
↓
problema progettuale
↓
pattern appropriato
↓
modello migliorato
```

---

# 12. Alla fine tutto deve raccontare lo stesso MyAma

Quando arriviamo ai Design Pattern potremmo avere l'impressione che il progetto sia finito.

In realtà manca ancora una fase fondamentale: la **revisione complessiva**.

Abbiamo costruito molti artefatti diversi:

- Problem Statement;
- Glossario;
- attori;
- Use Case;
- requisiti;
- criteri di verificabilità;
- Activity Diagram;
- Sequence Diagram;
- Class Diagram;
- Design Pattern.

Il rischio è che, lavorando su questi elementi in momenti diversi e magari dividendoli tra persone diverse, inizino a descrivere versioni leggermente differenti del sistema.

Per esempio:

- un Use Case parla di annullamento della prenotazione ma nei requisiti non compare;
- un Sequence Diagram utilizza una classe eliminata successivamente;
- il Class Diagram contiene un'operazione che nessuno scenario utilizza;
- il Glossario chiama `Cliente` ciò che un altro documento chiama `Cittadino`;
- un Pattern introduce nuove classi senza aggiornare il resto del modello.

La revisione finale serve quindi a controllare la catena completa:

```text
Problem Statement
↓
User Requirements / Use Case
↓
System Requirements
↓
Activity
↓
Sequence
↓
Class Diagram
↓
Design Pattern
```

Ogni passaggio deve essere coerente con quello precedente.

Questo è anche il motivo per cui, nel lavoro di gruppo, non sarà sufficiente dividere i capitoli e unirli alla fine.

Alcune attività potranno essere parallelizzate, ma saranno necessari momenti di revisione comune.

La `divisione-compiti.md` verrà costruita proprio partendo da queste dipendenze.

---

# 13. Che cosa contiene quindi la specifica finale?

A grandi linee, osservando le richieste del professore e la struttura ricorrente dei progetti di esempio, possiamo aspettarci un documento organizzato intorno a blocchi come:

```text
Introduzione / Problem Statement
↓
Glossario
↓
User Requirements Definition
    ↓
    Use Case per attore
    ↓
    documentazione degli scenari
↓
System Requirements
    ↓
    funzionali
    ↓
    non funzionali
    ↓
    di dominio
    ↓
    verificabilità
↓
modelli OOA
    ↓
    Activity Diagram
    ↓
    Sequence Diagram
    ↓
    Class Diagram Unrefined
    ↓
    Class Diagram Refined
↓
Appendice Design Pattern
```

Questo schema serve per capire **che cosa produrremo**, non va interpretato come una sequenza completamente rigida di lavoro.

La successiva `guida-operativa.md` entrerà proprio qui nel dettaglio e spiegherà:

- da quale materiale partire in ogni sezione;
- che cosa fare concretamente;
- quale strumento utilizzare;
- come costruire i diagrammi;
- come organizzare i sorgenti Visual Paradigm, anche in più `.vpp` quando questo facilita il lavoro parallelo;
- che cosa controllare;
- quando una fase può essere considerata sufficientemente stabile.

---

# 14. Il percorso completo in una sola lettura

Se dobbiamo ricordare una sola cosa di questa guida, è il seguente ragionamento.

Partiamo da **MyAma come idea**.

Sappiamo che vogliamo organizzare il ritiro e il conferimento dei rifiuti ingombranti, ma questa idea è ancora troppo generica.

Per prima cosa delimitiamo il dominio e scriviamo il **Problem Statement**.

Una volta capito il problema, individuiamo **chi utilizza il sistema** e quali obiettivi vuole raggiungere.

Questi obiettivi diventano **Use Case**, che descriviamo anche attraverso scenari.

Gli scenari ci permettono di capire con maggiore precisione ciò che il sistema deve offrire, quindi ricaviamo i **System Requirements**.

I requisiti devono essere chiari e **verificabili**, altrimenti non possiamo sapere se sono realmente soddisfatti.

Quando sappiamo abbastanza bene **cosa** deve fare il sistema, iniziamo a costruire i modelli OOA.

Gli **Activity Diagram** ci aiutano a comprendere i flussi.

L'analisi del dominio ci porta alle prime **classi candidate**.

I **Sequence Diagram** mostrano come gli oggetti devono collaborare e ci costringono a correggere e arricchire il modello statico.

Questa iterazione porta al **Class Diagram**, progressivamente raffinato.

Solo quando il modello è abbastanza maturo iniziamo a cercare **problemi di design**.

Per almeno due di questi problemi scegliamo Design Pattern adeguati e li applichiamo al Class Diagram.

Infine controlliamo che tutti gli artefatti descrivano lo stesso sistema.

In forma compatta:

```text
IDEA MYAMA
↓
Cosa vogliamo progettare?

PROBLEM STATEMENT
↓
Qual è esattamente il problema e il perimetro?

ATTORI + USER REQUIREMENTS
↓
Chi usa il sistema e cosa vuole ottenere?

USE CASE
↓
Come raggiunge questi obiettivi?

SYSTEM REQUIREMENTS
↓
Che cosa deve garantire precisamente il software?

VERIFICABILITÀ
↓
Come sappiamo se i requisiti sono soddisfatti?

ACTIVITY DIAGRAM
↓
Come si sviluppano i processi?

CLASSI CANDIDATE
↓
Quali oggetti rappresentano il dominio?

SEQUENCE DIAGRAM
↓
Come collaborano gli oggetti negli scenari?

CLASS DIAGRAM
↓
Come è strutturato il sistema?

RAFFINAMENTO
↓
Come rendiamo il modello più preciso e coerente?

DESIGN PATTERN
↓
Come risolviamo problemi progettuali reali?

REVISIONE
↓
Tutti gli artefatti raccontano lo stesso MyAma?

SPECIFICA FINALE
```

---

# Dove siamo adesso

Con `idea.md` abbiamo risposto a:

> **Che cosa stiamo progettando?**

Con questa `guida-progetto.md` rispondiamo a:

> **Qual è il percorso che trasforma quell'idea in una specifica software?**

Il documento successivo, `guida-operativa.md`, dovrà rispondere invece a:

> **Ora che abbiamo capito il percorso, come eseguiamo concretamente ogni singolo passaggio?**

Da quella guida potremo infine ricavare una `divisione-compiti.md` realmente sensata per cinque persone, decidendo quali attività richiedono il lavoro di tutto il gruppo e quali possono essere suddivise senza perdere coerenza.
