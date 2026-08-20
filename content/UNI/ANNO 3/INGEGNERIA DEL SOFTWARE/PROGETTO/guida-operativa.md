# Guida operativa al progetto di Ingegneria del Software — MyAma

## A cosa serve questa guida

Con `idea.md` abbiamo chiarito **che cosa vogliamo progettare**.

Con `guida-progetto.md` abbiamo chiarito **qual è il percorso generale che porta dall'idea alla specifica software**.

Questa guida fa il passo successivo:

> spiegare come svolgere concretamente quel percorso, nell'ordine più sensato, costruendo progressivamente il documento di specifica di MyAma.

Non è una seconda dispensa di teoria. Quando serve un concetto come Use Case, Activity Diagram, Sequence Diagram o Class Diagram, la teoria del corso rimane il riferimento per capire formalmente che cos'è e come si rappresenta.

Qui interessa soprattutto capire:

- da quale materiale partire;
- quale parte del documento stiamo costruendo;
- cosa fare concretamente;
- quali decisioni prendere;
- cosa deve essere pronto prima di andare avanti;
- come usare ciò che abbiamo appena prodotto nella fase successiva.

La struttura segue soprattutto quella che compare con grande regolarità nei progetti di riferimento:

```text
Introduzione / Problem Statement
↓
Glossario
↓
User Requirements Definition
↓
Use Case
↓
System Requirements
↓
Activity Diagram
↓
Sequence Diagram
↓
Class Diagram Unrefined
↓
Class Diagram Refined
↓
Design Pattern
```

Questa è soprattutto una struttura di **costruzione e presentazione della specifica**. Il lavoro reale non sarà sempre perfettamente lineare: alcuni artefatti, soprattutto Sequence Diagram e Class Diagram, dovranno essere corretti più volte.

---

# Prima di iniziare: preparare un unico spazio di lavoro

Prima di dividere il progetto in sezioni conviene evitare che ogni membro del gruppo inizi a produrre file con nomi, termini e convenzioni diverse.

Il primo passo pratico è quindi creare una struttura di lavoro molto semplice.

Possiamo avere, ad esempio:

```text
PROGETTOISW/
│
├── idea.md
├── guida-progetto.md
├── guida-operativa.md
│
├── lavoro/
│   ├── decisioni.md
│   ├── glossario.md
│   ├── requisiti.md
│   └── tracciabilita.md
│
├── specifica/
│   └── specifica.md
│
└── visual-paradigm/
    └── MyAma.vpp
```

Non è importante usare esattamente questi nomi. È importante che esista **una fonte condivisa e riconoscibile**.

Prima di lavorare in parallelo bisogna inoltre decidere alcune convenzioni minime:

- useremo `Cliente` o `Cittadino`?
- useremo `Sede AMA` o `Centro di Raccolta`?
- come numeriamo i requisiti?
- come numeriamo i Use Case?
- come chiamiamo i diagrammi?
- come organizziamo i sorgenti Visual Paradigm?

Dai materiali di un progetto precedente sappiamo che non è necessario lavorare per forza con un solo `.vpp`. È possibile organizzare i sorgenti in più file separati, ad esempio per attore/area o per tipo di modello.

Una struttura possibile, puramente indicativa, potrebbe essere:

```text
CLIENTE.vpp
AUTISTA.vpp
OPERATORE-SEDE.vpp
GESTIONE.vpp

CLASSE-UNREFINED.vpp
CLASSE-REFINED.vpp
DESIGN-PATTERNS.vpp
```

La struttura definitiva va scelta in base agli attori e ai diagrammi che emergeranno davvero in MyAma.

Una convenzione semplice potrebbe essere:

```text
UC-CLI-01  → Use Case Cliente
UC-AUT-01  → Use Case Autista
UC-OPS-01  → Use Case Operatore di Sede

RF-01       → Requisito Funzionale
RNF-01      → Requisito Non Funzionale
RD-01       → Requisito di Dominio
```

Non serve organizzare tutto perfettamente il primo giorno. Serve soltanto evitare che cinque persone producano cinque versioni incompatibili dello stesso progetto.

---

# 1. Scrivere l'Introduzione e il Problem Statement

## Da dove partiamo

Partiamo principalmente da:

- `idea.md`;
- vecchio progetto MyAma di Basi di Dati;
- decisioni prese insieme sul perimetro del nuovo progetto.

Il materiale precedente contiene molte funzionalità, ma non dobbiamo copiarle automaticamente tutte.

Questa fase serve proprio a decidere **quale MyAma vogliamo specificare ora**.

---

## Che cosa dobbiamo ottenere

Nel documento finale l'Introduzione deve far capire:

- che cos'è MyAma;
- quale problema affronta;
- chi sono gli utenti principali;
- quali sono i servizi centrali;
- quali aspetti rientrano nel sistema.

Non deve ancora contenere decine di requisiti dettagliati.

Il Problem Statement deve essere sufficientemente preciso da diventare il punto di riferimento per tutto il progetto, ma abbastanza generale da non anticipare l'intera specifica.

---

## Come procedere concretamente

### Step 1 — rileggere insieme `idea.md`

Prima di scrivere, tutti devono essere d'accordo sul nucleo:

- ritiro a domicilio;
- conferimento in sede;
- cittadini;
- lavoratori AMA;
- sedi;
- disponibilità;
- veicoli;
- rifiuti;
- prenotazioni.

### Step 2 — decidere lo scope iniziale

Per ogni funzionalità candidata chiediamoci:

- è centrale?
- serve a un attore importante?
- ci aiuta a costruire un dominio sufficientemente ricco?
- rende il progetto inutilmente grande?

Possiamo usare una tabella interna:

| Funzionalità | Teniamo? | Motivo |
|---|---|---|
| Prenotazione ritiro | sì | servizio centrale |
| Conferimento in sede | sì | servizio centrale |
| Gestione CAP | sì | regola di dominio importante |
| Gestione veicoli | sì | necessaria ai ritiri |
| Storico | da decidere | utile ma secondario |
| Recensioni | da decidere | non essenziale |
| Reportistica avanzata | probabilmente no all'inizio | aumenta molto lo scope |

### Step 3 — scrivere il testo

Una struttura semplice può essere:

```md
## Introduzione

### Contesto
...

### Obiettivo del sistema
...

### Utenti principali
...

### Servizi principali
...

### Perimetro
...
```

Non serve necessariamente usare questi sottotitoli nella versione finale; servono soprattutto per aiutarci a non dimenticare nulla.

---

## Esempio MyAma

Una prima forma potrebbe essere:

> MyAma è una piattaforma dedicata alla gestione delle prenotazioni per lo smaltimento di rifiuti ingombranti. Il sistema consente ai cittadini di richiedere un ritiro a domicilio oppure prenotare il conferimento presso una sede AMA. La gestione della richiesta deve tenere conto della zona servita, delle disponibilità e, nel caso del ritiro, delle risorse operative necessarie come lavoratori e veicoli.

Questa frase non è ancora sufficiente da sola, ma fa capire il livello di dettaglio da cui partire.

---

## Prima di andare avanti controlliamo

- [ ] tutti i membri descrivono MyAma nello stesso modo;
- [ ] abbiamo deciso il nucleo del sistema;
- [ ] non abbiamo introdotto funzionalità estranee;
- [ ] il testo non entra ancora nel design;
- [ ] gli attori principali iniziano a essere riconoscibili.

A questo punto abbiamo delimitato **il sistema**.

Ora dobbiamo stabilire con precisione **il vocabolario con cui lo descriviamo**.

---

# 2. Costruire il Glossario

Il Glossario compare molto presto nei progetti di riferimento perché, appena iniziamo a parlare di utenti, requisiti e diagrammi, una terminologia incoerente diventa rapidamente un problema.

Per esempio:

```text
Cittadino
Cliente
Utente
```

potrebbero essere tre parole diverse per la stessa persona oppure tre concetti differenti.

Se non lo decidiamo adesso, il problema si propagherà nei Use Case, nei requisiti e nel Class Diagram.

---

## Cosa fare concretamente

Apriamo `glossario.md` oppure direttamente la sezione Glossario della specifica.

Per ogni termine importante scriviamo:

| Termine | Significato nel progetto |
|---|---|
| Cliente | cittadino che utilizza MyAma per prenotare un servizio |
| Ritiro a domicilio | servizio in cui AMA preleva il rifiuto presso l'indirizzo indicato |
| Conferimento | consegna del rifiuto da parte del Cliente presso una sede |
| Prenotazione | richiesta registrata relativa a un ritiro o conferimento |
| Sede AMA | struttura presso cui... |

Il Glossario non va completato una volta per tutte.

Da questo momento diventa un **documento vivo**.

Quando durante il progetto compare un termine importante, chiediamoci:

> è già definito?

Se no, lo aggiungiamo.

---

## Regola pratica

Se due persone del gruppo usano parole diverse per lo stesso concetto, la decisione va presa nel Glossario **prima** di continuare a produrre diagrammi.

---

## Prima di andare avanti controlliamo

- [ ] termini principali definiti;
- [ ] niente sinonimi ambigui;
- [ ] nomi degli attori coerenti;
- [ ] nomenclatura condivisa.

Ora abbiamo il dominio e il vocabolario.

Il passo successivo è capire **chi utilizza il sistema e cosa vuole ottenere**.

---

# 3. Definire gli attori

Nei progetti dei compagni la User Requirements Definition viene organizzata principalmente **per attore**.

Questo rende la scelta degli attori una decisione importante, perché condizionerà l'intera sezione successiva.

---

## Come individuare un attore

Per ogni persona o sistema candidato chiediamoci:

1. è esterno a MyAma?
2. interagisce direttamente con il sistema?
3. vuole ottenere qualcosa tramite il sistema?
4. riceve informazioni o avvia operazioni?

Nel nostro dominio emergono almeno:

- Cliente;
- Autista AMA;
- Operatore di sede.

Potrebbe emergere anche:

- Responsabile / Gestore operativo AMA.

Questo ruolo va però definito in base alle funzionalità che decidiamo realmente di mantenere.

---

## Attenzione: attore non significa classe

`Cliente` può essere sia attore sia, in seguito, una classe del dominio.

`Prenotazione`, invece, può essere una classe ma non è un attore.

`GestionePrenotazione` può diventare un elemento interno al software ma non è un attore.

Quindi non dobbiamo chiedere:

> questa cosa esiste nel sistema?

Dobbiamo chiedere:

> questa cosa interagisce con MyAma dall'esterno?

---

## Cosa produrre

Una piccola tabella interna:

| Attore | Obiettivo generale |
|---|---|
| Cliente | organizzare lo smaltimento del proprio rifiuto |
| Autista | gestire i ritiri assegnati |
| Operatore di sede | gestire i conferimenti previsti |
| Gestore | organizzare risorse e configurazioni, se incluso |

Questa tabella non deve necessariamente finire nella relazione esattamente così.

Serve per preparare la fase successiva.

Ora che sappiamo **chi** usa MyAma, possiamo finalmente chiedere:

> che cosa vuole fare ciascun attore?

---

# 4. Costruire i Use Case

Questa è una delle parti più importanti della specifica.

Nei progetti di riferimento la User Requirements Definition viene normalmente organizzata in questo modo:

```text
Use Case Attore A
    ↓
    Diagramma
    ↓
    Documentazione

Use Case Attore B
    ↓
    Diagramma
    ↓
    Documentazione
```

Per MyAma possiamo utilizzare la stessa logica.

---

## Step 1 — partire dagli obiettivi, non dai click

Prendiamo il Cliente.

Chiediamoci:

> cosa vuole ottenere usando MyAma?

Possibili risposte:

- registrarsi/accedere;
- prenotare un ritiro a domicilio;
- prenotare un conferimento;
- vedere le prenotazioni;
- annullare una prenotazione;
- eventualmente modificare una prenotazione;
- eventualmente lasciare una valutazione.

Non dobbiamo ancora decidere che tutte queste funzionalità saranno presenti.

---

## Step 2 — verificare la granularità

Un Use Case deve descrivere un obiettivo completo.

Quindi:

```text
Prenota ritiro a domicilio
```

ha senso.

Invece:

```text
Inserisci CAP
Seleziona data
Premi Conferma
```

sono normalmente passaggi dello stesso Use Case.

---

## Step 3 — creare il Use Case Diagram

Quando abbiamo stabilito l'elenco per un attore, lo riportiamo in Visual Paradigm.

Per esempio:

```text
Cliente
├── Prenota ritiro a domicilio
├── Prenota conferimento in sede
├── Visualizza prenotazioni
└── Annulla prenotazione
```

Il diagramma deve essere leggibile.

Non dobbiamo aggiungere `include`, `extend` o generalizzazioni solo per renderlo più sofisticato.

Le relazioni vanno usate quando descrivono realmente la struttura dei casi d'uso.

---

# 5. Documentare ogni Use Case

Il diagramma da solo non basta.

Nei progetti di riferimento troviamo una scheda testuale molto stabile, con elementi come:

- descrizione/passi;
- attori;
- precondizioni;
- scenario principale;
- scenari alternativi;
- post-condizioni.

Conviene quindi adottare una struttura comune per tutto il gruppo.

---

## Template consigliato

```md
### UC-CLI-01 — Prenota ritiro a domicilio

**Attori**
- Cliente

**Precondizioni**
- ...

**Descrizione / Passi**
1. ...
2. ...
3. ...

**Scenario principale**
...

**Scenari alternativi**
- ...

**Post-condizioni**
- ...
```

Tutti devono usare lo stesso template.

---

## Esempio ragionato

Prendiamo:

```text
UC-CLI-01 — Prenota ritiro a domicilio
```

Prima chiediamoci cosa deve essere vero.

Possibile precondizione:

- Cliente autenticato.

Poi costruiamo lo scenario normale:

1. il Cliente sceglie il ritiro;
2. inserisce le informazioni necessarie sul rifiuto;
3. indica l'indirizzo;
4. il sistema verifica la zona;
5. mostra le disponibilità;
6. il Cliente sceglie una disponibilità;
7. conferma;
8. il sistema registra la prenotazione.

Poi chiediamoci:

> dove può deviare il flusso?

Per esempio:

- CAP non servito;
- nessuna disponibilità;
- richiesta non valida;
- Cliente annulla prima della conferma.

Non dobbiamo inventare casi alternativi solo per riempire il documento. Devono derivare dalle regole del dominio.

---

## Lavorare prima in piccolo

Prima di dividere decine di Use Case tra persone diverse conviene farne **uno o due insieme**.

Lo scopo è stabilire:

- livello di dettaglio;
- stile;
- nomenclatura;
- cosa consideriamo precondizione;
- quanto dettagliamo gli scenari alternativi.

Solo dopo questa prova conviene parallelizzare.

---

## Prima di andare avanti controlliamo

Per ogni Use Case:

- [ ] descrive un obiettivo dell'attore;
- [ ] ha un nome chiaro;
- [ ] usa termini del Glossario;
- [ ] precondizioni sensate;
- [ ] scenario principale completo;
- [ ] alternative importanti presenti;
- [ ] post-condizione coerente.

A questo punto sappiamo **come gli utenti utilizzano MyAma**.

Ora dobbiamo trasformare gli scenari in requisiti più precisi del sistema.

---

# 6. Scrivere i System Requirements

Nei tre progetti di riferimento troviamo sistematicamente la divisione:

```text
System Requirements
├── Requisiti Funzionali
├── Requisiti Non Funzionali
└── Requisiti di Dominio
```

Questa è una struttura molto utile anche per MyAma.

---

# 6.1 Requisiti Funzionali

I requisiti funzionali descrivono **cosa deve fare il sistema**.

Il modo più sicuro per trovarli è partire dai Use Case già scritti.

---

## Come derivarli

Prendiamo:

```text
UC-CLI-01 — Prenota ritiro a domicilio
```

Dallo scenario possiamo estrarre:

```text
Cliente inserisce dati del rifiuto
→ il sistema deve acquisire questi dati.

Sistema verifica la zona
→ il sistema deve verificare che il CAP sia servito.

Sistema mostra disponibilità
→ il sistema deve determinare e mostrare disponibilità compatibili.

Sistema registra prenotazione
→ il sistema deve creare e memorizzare la prenotazione.
```

Da qui:

```text
RF-01
Il sistema deve consentire al Cliente di inserire
le informazioni richieste sul rifiuto.

RF-02
Il sistema deve verificare che l'indirizzo indicato
appartenga a una zona servita.

RF-03
Il sistema deve mostrare le disponibilità compatibili
con la richiesta.

RF-04
Il sistema deve registrare la prenotazione confermata.
```

Questo passaggio è fondamentale:

> i requisiti non vengono inventati separatamente dai Use Case.

Devono emergere da ciò che abbiamo già stabilito.

---

# 6.2 Requisiti Non Funzionali

Ora chiediamoci non solo **cosa fa** MyAma, ma **con quali caratteristiche o vincoli di qualità** deve farlo.

Possibili categorie studiate nel corso includono:

- performance;
- affidabilità;
- usabilità;
- sicurezza;
- disponibilità.

Non dobbiamo però riempire il progetto di requisiti non funzionali generici.

Scrivere:

> Il sistema deve essere sicuro.

serve a poco.

Meglio un requisito che stabilisca un comportamento controllabile.

Le soglie quantitative vanno scelte solo quando possiamo motivarle.

---

# 6.3 Requisiti di Dominio

Questi derivano dalle regole specifiche di MyAma.

Per esempio:

```text
una sede serve determinati CAP;
un veicolo ha una capacità;
un lavoratore ha un ruolo;
un ritiro deve essere assegnato a risorse compatibili;
una prenotazione può essere annullata solo in determinate condizioni.
```

Possiamo quindi formalizzare requisiti come:

```text
RD-01
Una richiesta di ritiro può essere gestita solo
se il relativo CAP è coperto dal servizio.
```

Il vantaggio di separare questi requisiti è che rende evidente **quali vincoli derivano dal dominio** e non semplicemente da una scelta di interfaccia.

---

# 7. Gestire la verificabilità dei requisiti

Il professore richiede esplicitamente di descrivere gli aspetti relativi alla verificabilità.

Quindi questa parte non deve essere lasciata implicita.

I benchmark non adottano tutti un capitolo autonomo con lo stesso formato. Per questo la scelta più chiara per noi potrebbe essere associare un criterio di verifica direttamente ai requisiti.

---

## Formato semplice

| ID | Requisito | Criterio di verifica |
|---|---|---|

Esempio:

| ID | Requisito | Criterio di verifica |
|---|---|---|
| RF-04 | Il sistema deve registrare una prenotazione confermata | dopo una conferma valida deve esistere una prenotazione attiva associata al Cliente |

---

## Due casi diversi

### Requisito funzionale

Di solito verifichiamo:

```text
condizione iniziale
↓
azione
↓
risultato osservabile
```

### Requisito non funzionale

Spesso servono:

```text
metrica
+
soglia
+
condizioni di misura
```

Non tutto deve quindi diventare una percentuale o un numero.

---

## Prima di andare avanti controlliamo

- [ ] ogni requisito ha un ID;
- [ ] sappiamo da quale Use Case/regola deriva;
- [ ] requisiti funzionali separati dai non funzionali;
- [ ] regole di dominio esplicite;
- [ ] requisiti importanti verificabili;
- [ ] niente formulazioni vaghe non controllabili.

A questo punto sappiamo **cosa deve fare MyAma** e abbiamo una base abbastanza stabile per modellarlo.

---

# 8. Costruire gli Activity Diagram

Nei benchmark gli Activity Diagram costituiscono la prima grande sezione dei modelli UML dopo i requisiti.

Non dobbiamo però interpretarli come l'obbligo di produrre un Activity Diagram per ogni singolo Use Case.

La domanda pratica è:

> quali scenari hanno un flusso abbastanza significativo da beneficiare di una rappresentazione grafica?

---

## Come partire dalla scheda Use Case

Prendiamo lo scenario:

```text
1. Cliente inserisce dati.
2. Sistema verifica CAP.
3. Se il CAP è servito mostra disponibilità.
4. Cliente sceglie.
5. Sistema registra.
```

Possiamo trasformarlo in:

```text
inizio
↓
inserimento dati
↓
verifica CAP
↓
[CAP servito?]
├── no → comunicazione indisponibilità → fine
└── sì
    ↓
    mostra disponibilità
    ↓
    scelta
    ↓
    registrazione
    ↓
    fine
```

Quindi, in generale:

```text
passo dello scenario
→ azione

condizione
→ decisione

scenario alternativo
→ ramo alternativo

inizio/fine
→ nodi iniziale/finale
```

---

## Come scegliere quali Activity fare

Conviene privilegiare:

- scenari con più decisioni;
- scenari con alternative;
- processi importanti;
- processi che coinvolgono più fasi operative.

Per MyAma probabilmente avranno senso almeno:

- prenotazione ritiro;
- prenotazione conferimento;
- gestione di un ritiro assegnato;
- gestione di un conferimento in sede.

La quantità definitiva va scelta in base al modello.

---

## Prima di andare avanti controlliamo

- [ ] ogni Activity deriva da un processo già descritto;
- [ ] non introduce funzionalità nuove;
- [ ] le condizioni corrispondono agli scenari;
- [ ] il flusso è leggibile.

Ora sappiamo rappresentare bene **il flusso delle attività**.

Ma non sappiamo ancora con precisione **quali oggetti costituiscono il sistema e come collaborano**.

---

# 9. Preparare il primo modello delle classi

Prima di costruire i Sequence Diagram conviene avere almeno una prima idea delle classi del dominio.

Questa prima bozza è uno strumento di lavoro.

Non dobbiamo preoccuparci subito di produrre il Class Diagram perfetto.

---

## Come trovare le classi candidate

Partiamo da:

- Problem Statement;
- Glossario;
- Use Case;
- requisiti.

Evidenziamo i concetti importanti.

Per MyAma potrebbero emergere:

```text
Cliente
Prenotazione
Rifiuto
TipologiaRifiuto
Sede
Veicolo
Lavoratore
Autista
OperatoreSede
```

Poi li analizziamo.

Per ogni candidato chiediamoci:

- rappresenta un concetto importante?
- esistono più istanze?
- deve mantenere informazioni?
- ha responsabilità?
- è veramente una classe oppure è un attributo?

---

## Esempio classe vs attributo

```text
Veicolo
→ classe: esistono più veicoli, ciascuno con proprie informazioni.

capacitàMassima
→ attributo di Veicolo.

pesoStimato
→ probabilmente attributo del rifiuto/prenotazione, non classe autonoma.
```

---

## Non copiare il database

Il precedente progetto di Basi di Dati è una fonte preziosa per capire il dominio.

Ma:

> tabella del database ≠ automaticamente classe dell'OOA.

L'obiettivo ora non è ricostruire lo schema relazionale.

Dobbiamo modellare responsabilità e concetti del software.

---

## Prima bozza del Class Diagram

In Visual Paradigm possiamo creare una prima versione con:

- classi candidate;
- attributi principali;
- relazioni evidenti;
- molteplicità preliminari.

Non serve ancora riempirla di operazioni.

Le operazioni emergeranno soprattutto analizzando le interazioni.

---

# 10. Usare BCE per organizzare le responsabilità

Quando passiamo dai concetti statici alle interazioni può essere utile usare l'approccio BCE:

```text
Boundary
→ interazione con attori/sistemi esterni

Control
→ coordinamento dello scenario

Entity
→ informazioni significative del dominio
```

In modo puramente didattico:

```text
Cliente
↓
PrenotazioneBoundary
↓
GestionePrenotazioneControl
↓
Prenotazione / Sede / Rifiuto
```

Non dobbiamo copiare questi nomi alla lettera.

Servono a capire una cosa importante:

> non tutta la logica deve finire nelle Entity e non tutto deve essere gestito dall'interfaccia.

La struttura effettiva emergerà dai nostri scenari.

---

# 11. Costruire i Sequence Diagram

Questa è una delle fasi più utili per far maturare il modello.

Il Sequence Diagram prende uno scenario e mostra:

> quali oggetti collaborano, in quale ordine e attraverso quali messaggi.

---

## Procedimento pratico

### Step 1 — scegliere un Use Case importante

Per esempio:

```text
UC-CLI-01 — Prenota ritiro a domicilio
```

### Step 2 — usare lo scenario principale come traccia

Ogni passo dello scenario deve essere realizzato da qualche oggetto.

### Step 3 — individuare i partecipanti

Possiamo avere:

- attore;
- Boundary;
- Control;
- Entity.

### Step 4 — assegnare le responsabilità

Esempio concettuale:

```text
Cliente
→ richiede prenotazione

Boundary
→ raccoglie i dati

Control
→ coordina la procedura

Entity
→ forniscono/modificano le informazioni necessarie
```

### Step 5 — disegnare i messaggi

Se compare un messaggio:

```text
verificaZona()
```

dobbiamo decidere:

> chi possiede questa responsabilità?

Se compare:

```text
creaPrenotazione()
```

stessa domanda.

---

# 12. Usare i Sequence per correggere le classi

Questo passaggio non deve essere saltato.

Il Sequence Diagram non è un'immagine da fare e poi dimenticare.

Anche se i Sequence sono conservati in `.vpp` separati, ogni diagramma deve essere confrontato con il Class Diagram comune.

Se emerge:

```text
oggetto nuovo
→ possibile nuova classe.

messaggio nuovo
→ possibile nuova operazione.

responsabilità sbagliata
→ riassegnazione.

classe inutilizzata
→ rivalutazione.
```

Per questo il lavoro reale è iterativo:

```text
bozza Class Diagram
        ↓
Sequence
        ↓
nuove informazioni
        ↓
correzione Class Diagram
        ↓
nuovo Sequence / revisione
```

Solo dopo questa iterazione ha senso parlare di un modello Unrefined sufficientemente stabile.

---

# 13. Consolidare il Class Diagram Unrefined

Nei benchmark compare sistematicamente un **Class Diagram Unrefined**.

Per noi può rappresentare la prima versione ufficiale e consolidata del modello ottenuto dall'analisi.

È del tutto sensato conservarlo in un file dedicato, ad esempio:

```text
CLASSE-UNREFINED.vpp
```

separato dai `.vpp` organizzati per attore o area.

A questo punto dobbiamo controllare:

- classi;
- attributi principali;
- associazioni;
- molteplicità;
- generalizzazioni;
- aggregazioni/composizioni solo quando semanticamente corrette;
- operazioni emerse dai Sequence.

---

## Domanda principale

Per ogni Use Case importante:

> il nostro modello contiene gli oggetti e le responsabilità necessarie per realizzarlo?

Se la risposta è no, il diagramma non è ancora sufficientemente consolidato.

---

# 14. Passare dal modello Unrefined al Refined

I progetti dei compagni mostrano sistematicamente entrambe le versioni.

Anche il modello Refined può essere conservato in un sorgente dedicato, ad esempio:

```text
CLASSE-REFINED.vpp
```

Questo rende più chiara anche la distinzione tra i due livelli del modello.

Non conviene però trattare il Refined come:

> "copiamo il diagramma precedente e aggiungiamo dettagli a caso".

Il raffinamento deve essere guidato da ciò che abbiamo imparato durante l'analisi.

Possiamo approfondire, quando pertinente:

- attributi;
- tipi;
- operazioni;
- parametri;
- visibilità;
- responsabilità;
- classi Boundary/Control;
- relazioni.

Il significato concreto della distinzione Unrefined/Refined va mantenuto coerente con il metodo insegnato nel corso e con ciò che emergerà dalla nostra modellazione.

Quello che importa operativamente è:

```text
Unrefined
→ modello iniziale consolidato

Refined
→ modello reso più preciso attraverso le informazioni
   emerse durante l'analisi e il raffinamento
```

---

# 15. Fermarsi e fare una review prima dei Design Pattern

Prima di pensare ai pattern conviene fare un vero checkpoint.

Il professore chiede di applicare almeno due Design Pattern **al Class Diagram ottenuto in fase di specifica**.

Quindi dobbiamo prima avere un diagramma che regga da solo.

Controlliamo:

- [ ] i Use Case principali sono coperti;
- [ ] Sequence e Class Diagram concordano;
- [ ] nomi coerenti;
- [ ] operazioni motivate;
- [ ] relazioni coerenti;
- [ ] niente pattern già inseriti artificialmente.

Solo ora ha senso chiedersi:

> quali problemi progettuali emergono dal nostro modello?

---

# 16. Individuare i problemi di design

Non partiamo dai pattern.

Partiamo dal modello.

Cerchiamo problemi come:

- una classe conosce troppe classi concrete;
- un comportamento cambia in molti punti;
- ci sono troppi `if` per scegliere tra comportamenti diversi;
- diversi oggetti devono essere informati di un cambiamento;
- la creazione di oggetti è complessa;
- uno stato influenza molte operazioni sparse.

Scriviamo una piccola lista:

| Problema | Dove compare | Perché è un problema |
|---|---|---|

Solo dopo confrontiamo questi problemi con i Design Pattern studiati a lezione.

---

# 17. Scegliere almeno due Design Pattern

Per ogni pattern la relazione dovrebbe spiegare almeno:

1. quale problema abbiamo individuato;
2. perché il pattern è appropriato;
3. quali classi MyAma assumono i ruoli del pattern;
4. come cambia il Class Diagram;
5. quali altri diagrammi devono essere ricontrollati.

Anche i modelli relativi ai pattern possono essere raccolti in un file dedicato, ad esempio:

```text
DESIGN-PATTERNS.vpp
```

come già avviene in un progetto precedente di riferimento.

---

## Struttura pratica

```md
## Pattern: Nome

### Problema individuato
...

### Perché questo pattern
...

### Applicazione a MyAma
...

### Classi coinvolte
...

### Modifiche al modello
...
```

---

## Attenzione ai pattern candidati già immaginati

Nel vecchio materiale sono state ipotizzate possibilità come:

- Observer;
- Strategy;
- Factory Method;
- State.

Per ora devono restare **candidati**.

Se il modello finale non presenta un problema realmente adatto a uno di questi pattern, non dobbiamo forzarlo.

---

# 18. Aggiornare il modello dopo i Pattern

Applicare un pattern significa modificare la struttura.

Quindi dobbiamo ricontrollare:

- Class Diagram;
- operazioni;
- Sequence interessati;
- nomenclatura;
- responsabilità.

La relazione può presentare il risultato nel modo più coerente con il template che sceglieremo, ma internamente dobbiamo considerare il modello **iterativo**.

Non pensiamo quindi:

```text
Refined
↓
pattern
↓
fine
```

ma:

```text
modello di specifica
↓
problema
↓
pattern
↓
modifica
↓
nuovo controllo di coerenza
```

---

# 19. Fare la revisione trasversale finale

Questa è una fase vera del progetto, non solo una rilettura grammaticale.

Dobbiamo percorrere la specifica dall'inizio alla fine.

---

## Controllo 1 — Problem Statement → Use Case

Ogni funzionalità importante introdotta nel Problem Statement ha una rappresentazione successiva?

Ci sono Use Case che sembrano comparsi dal nulla?

---

## Controllo 2 — Use Case → Requirements

Ogni comportamento significativo è supportato da requisiti?

Ci sono requisiti che nessun attore/scenario giustifica?

---

## Controllo 3 — Requirements → Activity

I flussi modellati rispettano le regole definite?

---

## Controllo 4 — Use Case/Requirements → Sequence

I Sequence descrivono veramente gli scenari previsti?

---

## Controllo 5 — Sequence → Class Diagram

Ogni oggetto del Sequence ha una classe coerente?

Ogni messaggio importante corrisponde a una responsabilità sensata?

---

## Controllo 6 — Pattern → modello finale

I pattern sono realmente visibili?

Hanno modificato classi o relazioni in modo coerente?

---

# 20. Mantenere una matrice di tracciabilità semplice

Per facilitare questa review possiamo mantenere internamente una tabella:

| Use Case | RF | RD | Activity | Sequence | Classi |
|---|---|---|---|---|---|
| UC-CLI-01 | RF-01, RF-02... | RD-01 | ACT-CLI-01 | SEQ-CLI-01 | Cliente, Prenotazione... |

Non è necessario trasformarla automaticamente in un capitolo della relazione.

Serve soprattutto a noi per vedere rapidamente eventuali buchi.

---

# 21. Come deve apparire il documento finale

Seguendo la struttura ricorrente dei progetti di riferimento, possiamo immaginare una specifica di questo tipo:

```text
1. Introduzione
   - Problem Statement

2. Glossario

3. User Requirements Definition
   3.1 Cliente
       - Use Case Diagram
       - Documentazione
   3.2 Autista
       - Use Case Diagram
       - Documentazione
   3.3 Operatore di Sede
       - Use Case Diagram
       - Documentazione
   3.x eventuali altri attori

4. System Requirements
   4.1 Requisiti Funzionali
   4.2 Requisiti Non Funzionali
   4.3 Requisiti di Dominio
   4.4 Verificabilità / criteri associati

5. System Models / OOA
   5.1 Activity Diagrams
   5.2 Sequence Diagrams
   5.3 Class Diagram Unrefined
   5.4 Class Diagram Refined

6. Design Pattern
   6.1 Pattern 1
   6.2 Pattern 2
   ...
```

Questo è un riferimento operativo molto forte, non una trascrizione letterale delle istruzioni del professore.

---

# 22. Cosa fare in Visual Paradigm e cosa scrivere nel documento

Una distinzione pratica utile:

| Parte | Dove lavoriamo principalmente |
|---|---|
| Problem Statement | documento |
| Glossario | documento |
| Use Case Diagram | Visual Paradigm |
| schede Use Case | documento |
| Requirements | documento |
| verificabilità | documento |
| Activity Diagram | Visual Paradigm |
| Sequence Diagram | Visual Paradigm |
| Class Diagram | Visual Paradigm |
| spiegazione Design Pattern | documento |
| diagrammi Pattern | Visual Paradigm |

Ogni diagramma inserito nel documento deve corrispondere a una versione aggiornata in uno dei sorgenti `.vpp` consegnati.

Non è quindi necessario che tutti i diagrammi siano contenuti nello stesso file.

---

# 22.1 Come organizzare concretamente i file `.vpp`

Alla luce dei progetti di riferimento, conviene distinguere tra:

```text
file per attore / area
→ contengono diagrammi relativi a quel blocco

file trasversali
→ contengono modelli comuni all'intero sistema
```

Un'organizzazione possibile per MyAma potrebbe essere:

```text
CLIENTE.vpp
AUTISTA.vpp
OPERATORE-SEDE.vpp
GESTIONE.vpp

CLASSE-UNREFINED.vpp
CLASSE-REFINED.vpp
DESIGN-PATTERNS.vpp
```

Non è una struttura obbligatoria.

Serve soltanto a mostrare un principio pratico:

> se due gruppi possono lavorare su diagrammi indipendenti, non c'è motivo di costringerli a modificare contemporaneamente lo stesso file Visual Paradigm.

Il vero punto di convergenza non è necessariamente un singolo `.vpp`, ma la **coerenza del modello complessivo**.

Quindi il "merge" va inteso soprattutto come:

- review comune;
- allineamento delle decisioni;
- aggiornamento dei modelli trasversali;
- controllo che tutti i sorgenti descrivano lo stesso MyAma.

# 23. Quando possiamo lavorare in parallelo

Questa guida non assegna ancora i compiti, perché la divisione verrà costruita separatamente.

Però possiamo già capire **quali momenti si prestano alla parallelizzazione**.

## Poco parallelizzabili all'inizio

Conviene decidere insieme:

- scope;
- attori;
- nomenclatura;
- struttura generale dei Use Case;
- convenzioni.

Se sbagliamo qui, tutti i lavori successivi divergono.

---

## Molto parallelizzabili dopo aver fissato le convenzioni

Possiamo dividere:

- documentazione di Use Case diversi;
- Activity Diagram relativi a scenari diversi;
- Sequence Diagram relativi a scenari diversi.

Ma dopo ogni blocco serve una review comune.

Quando il lavoro è diviso per attore o area, può essere utile che ogni coppia lavori sul proprio `.vpp`, mantenendo però convenzioni comuni.

---

## Poco parallelizzabile il Class Diagram

Il Class Diagram concentra informazioni provenienti da tutto il progetto.

Può essere preparato da alcune persone, ma conviene che sia revisionato dall'intero gruppo.

---

## Parallelizzabili i Design Pattern

Una volta individuati insieme i problemi, due sottogruppi possono studiare/applicare pattern diversi.

Poi però il modello deve essere riunito e revisionato.

Queste osservazioni saranno la base della futura `divisione-compiti.md`.

---

# 24. Ordine operativo consigliato

Se dovessimo trasformare tutta la guida in una lista di lavoro, avremmo:

```text
STEP 1
Rileggere idea.md e fissare lo scope.

STEP 2
Scrivere Problem Statement.

STEP 3
Inizializzare Glossario.

STEP 4
Definire attori.

STEP 5
Elencare Use Case per attore.

STEP 6
Fare 1-2 Use Case insieme per stabilire lo standard.

STEP 7
Completare diagrammi e schede Use Case.

STEP 8
Derivare requisiti funzionali.

STEP 9
Aggiungere non funzionali e di dominio.

STEP 10
Associare criteri di verificabilità.

STEP 11
Costruire Activity Diagram significativi.

STEP 12
Individuare classi candidate.

STEP 13
Preparare una bozza del Class Diagram.

STEP 14
Costruire Sequence Diagram.

STEP 15
Usare i Sequence per correggere il Class Diagram.

STEP 16
Consolidare Unrefined.

STEP 17
Raffinare il modello e produrre Refined.

STEP 18
Review del modello di specifica.

STEP 19
Individuare problemi di design.

STEP 20
Scegliere almeno 2 Design Pattern.

STEP 21
Applicare i pattern.

STEP 22
Aggiornare i modelli coinvolti.

STEP 23
Revisione completa di tracciabilità e coerenza.

STEP 24
Impaginare la specifica e controllare tutti i sorgenti Visual Paradigm.

STEP 25
Preparare documento finale + archivio ordinato dei sorgenti `.vpp`.
```

Questa lista non sostituisce le spiegazioni precedenti: serve come riferimento rapido quando inizieremo effettivamente a lavorare.

---

# 25. Il principio da non perdere durante il progetto

Il rischio maggiore è che, lavorando in più persone, ogni sezione venga trattata come un esercizio indipendente.

Dobbiamo invece mantenere sempre questa catena:

```text
Problem Statement
↓
definisce il sistema

Use Case
↓
descrivono gli obiettivi degli attori

Requirements
↓
specificano ciò che il sistema deve garantire

Activity
↓
rendono espliciti i flussi

Sequence
↓
mostrano le collaborazioni

Class Diagram
↓
consolida struttura e responsabilità

Design Pattern
↓
risolvono problemi reali del modello
```

Ogni volta che aggiungiamo qualcosa dobbiamo poter rispondere:

> da dove deriva?

e:

> quale parte successiva utilizzerà questa informazione?

Se non sappiamo rispondere, probabilmente stiamo aggiungendo un elemento scollegato.

---

# 26. Cosa viene dopo questa guida

Questa guida definisce **il lavoro da svolgere**.

Il prossimo documento, `divisione-compiti.md`, deve prendere precisamente questi step e trasformarli in un'organizzazione semplice per cinque persone.

Non divideremo quindi il progetto in modo arbitrario.

Per ogni blocco chiederemo:

```text
Serve una decisione comune?
→ tutti insieme.

Si può dividere per attore/scenario?
→ coppie o 2 + 2 + 1.

Il risultato converge in un unico modello?
→ merge e review comune.

Due problemi sono indipendenti?
→ gruppi separati in parallelo.
```

La divisione dei compiti nascerà quindi direttamente da questa guida operativa.

In questo modo avremo finalmente una catena coerente:

```text
idea.md
→ capiamo cosa stiamo progettando

guida-progetto.md
→ capiamo il percorso generale

guida-operativa.md
→ sappiamo come svolgerlo concretamente

divisione-compiti.md
→ decidiamo come svolgerlo in cinque

template-specifica.md
→ fissiamo la forma finale del documento
```
