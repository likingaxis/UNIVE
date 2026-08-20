Sì: allora la divisione va fatta **seguendo davvero `guida-operativa.md` e `divisione-compiti.md`**, non con una scansione generica.

La logica corretta dei file è questa: prima si chiudono dominio, Problem Statement, Glossario, attori, Use Case e requisiti; poi si passa alla parte OOA/UML; infine si consolidano Class Diagram, Design Pattern e revisione finale. Inoltre il lavoro può essere distribuito su **più `.vpp` separati per attore/area**, facendo poi review e riallineamento logico comune, senza obbligo di fondere tutto in un unico file.  

## Giorno 1 — Dominio, Problem Statement, Glossario, Attori

Questo giorno coincide sostanzialmente con la parte che avete già iniziato.

### Gruppo 1

* Introduzione al dominio MyAma
* problema affrontato
* identificazione degli attori
* obiettivi dei diversi attori

### Gruppo 2

* funzionalità principali
* funzionalità secondarie/candidate
* definizione dello **scope**
* definizione di cosa resta **fuori scope**

Questa stessa divisione era già stata fissata nei materiali: Gruppo 1 sulla parte narrativa del Problem Statement, Gruppo 2 sul perimetro funzionale. 

Poi:

**Gruppo 1 + Gruppo 2 insieme**

* confronto dei due testi;
* approvazione degli attori;
* approvazione dello scope;
* sistemazione del Glossario;
* controllo terminologico.

Il gate della guida è semplice: tutti devono avere **la stessa idea di cosa sia MyAma**, quali servizi offra e quale sia il confine del sistema. 

### Fine Giorno 1

Dovete avere:

* Problem Statement;
* Introduzione;
* attori definitivi;
* obiettivi degli attori;
* funzionalità;
* scope / out of scope;
* Glossario iniziale.

---

# Giorno 2 — Use Case + documentazione Use Case + Requirements

Qui partirei subito dal lavoro per attori, perché è proprio la struttura che permette di parallelizzare meglio il progetto.

La guida stabilisce che dai Problem Statement/attori si passa agli **Use Case**, e dalle schede Use Case si ricavano poi requisiti, Activity e Sequence Diagram. 

### Gruppo 1

Area **Cliente/Cittadino**:

* Use Case del Cliente;
* Use Case Diagram;
* documentazione testuale dei principali Use Case;
* primi requisiti associati.

Per esempio:

* registrazione/accesso;
* prenotazione ritiro;
* prenotazione conferimento;
* consultazione prenotazioni;
* eventuale annullamento;
* storico;
* valutazione.

Non significa che tutti questi siano necessariamente definitivi: vanno mantenuti solo quelli coerenti con lo scope approvato.

### Gruppo 2

Area **personale AMA**:

* Autista;
* Operatore di sede;
* area gestionale/amministrativa.

Per ciascuno:

* Use Case;
* Use Case Diagram;
* documentazione testuale;
* primi requisiti associati.

### Poi insieme

Review di tutti gli Use Case:

* niente duplicazioni;
* nomi coerenti;
* ogni Use Case ha un attore;
* ogni Use Case rappresenta un vero obiettivo;
* scenari principali e alternativi coerenti.

La revisione dell'insieme degli Use Case è esplicitamente una delle attività che la guida assegna a **tutto il gruppo**. 

Successivamente completate:

* System Requirements;
* requisiti funzionali;
* requisiti non funzionali;
* requisiti di dominio;
* verificabilità/misurabilità.

### Fine Giorno 2

Dovete avere praticamente chiusa tutta la parte:

```text
Problem Statement
↓
Glossario
↓
Attori
↓
Use Case
↓
Schede Use Case
↓
System Requirements
↓
Verificabilità
```

---

# Giorno 3 — Activity Diagram + Sequence Diagram + bozza Class Diagram

Questo è il primo giorno pesante di Visual Paradigm.

Qui sfrutterei esattamente l'organizzazione prevista dalla nuova `divisione-compiti.md`: **file `.vpp` separati per attore/area**. 

Per esempio:

```text
CLIENTE.vpp
AUTISTA.vpp
OPERATORE-SEDE.vpp
GESTIONE.vpp
```

## Gruppo 1

Lavora soprattutto sull'area **Cliente**:

* Activity Diagram;
* Sequence Diagram;
* individuazione degli oggetti coinvolti;
* operazioni che emergono dalle interazioni.

## Gruppo 2

Lavora sulle aree AMA:

* Autista;
* Operatore di sede;
* Gestione/amministrazione.

Produce:

* Activity Diagram;
* Sequence Diagram;
* oggetti coinvolti;
* operazioni.

L'organizzazione materiale in `.vpp` separati **non cambia l'ordine logico del progetto**: Activity e Sequence servono progressivamente a maturare il modello e possono far emergere nuove classi e operazioni. 

Nel frattempo si costruisce anche una **bozza interna del Class Diagram**.

Non confondetela con l'Unrefined finale:

```text
bozza Class Diagram
        ↕
Sequence Diagram
        ↕
nuove classi / operazioni
```

La bozza è uno strumento di lavoro; sarà poi consolidata nel Class Diagram Unrefined.

### Review serale comune

Alla fine del giorno:

* confrontate tutti i `.vpp`;
* controllate se due gruppi hanno creato la stessa classe con nomi diversi;
* allineate operazioni;
* allineate Entity/Boundary/Control se utilizzate;
* raccogliete tutte le classi candidate.

Non serve necessariamente fare un "merge fisico" dei file: i documenti aggiornati parlano esplicitamente di **review + integrazione logica + riallineamento**. 

---

# Giorno 4 — Class Diagram Unrefined + Design Pattern + Refined

Questo è il giorno dedicato ai modelli trasversali.

A questo punto le divisioni per attore diventano meno utili, perché il Class Diagram deve rappresentare **l'intero sistema**.

## Prima parte — Unrefined Class Diagram

Tutto il gruppo deve convergere su:

```text
CLASSE-UNREFINED.vpp
```

Si consolidano:

* classi;
* attributi;
* operazioni emerse dai Sequence;
* associazioni;
* molteplicità;
* generalizzazioni;
* aggregazioni/composizioni quando necessarie;
* responsabilità.

La guida considera la revisione del Class Diagram uno dei checkpoint collettivi più importanti. 

Prima dei pattern deve infatti esistere un **Class Diagram abbastanza stabile**. 

## Seconda parte — Design Pattern

Qui i due gruppi possono tornare temporaneamente a dividersi.

### Gruppo 1

Analizza una parte del modello e cerca:

* problemi progettuali;
* un possibile Design Pattern;
* motivazione;
* classi coinvolte.

### Gruppo 2

Fa la stessa cosa su un'altra area.

L'importante è non fare:

> "Dobbiamo usare Strategy, troviamo un posto dove metterlo."

La guida prescrive il contrario:

```text
problema reale
↓
pattern candidato
↓
applicazione
```



### Poi insieme

Scelta definitiva di **almeno 2 Design Pattern**.

La scelta dei pattern è esplicitamente una **decisione collettiva**. 

Applicazione dei pattern e costruzione:

```text
DESIGN-PATTERNS.vpp
CLASSE-REFINED.vpp
```

Il Refined deve mostrare in modo comprensibile il risultato delle decisioni progettuali e dei pattern applicati. 

### Fine Giorno 4

Dovete avere:

* Class Diagram Unrefined;
* almeno 2 Design Pattern scelti e motivati;
* applicazione dei pattern;
* Class Diagram Refined;
* eventuali Sequence aggiornati.

---

# Giorno 5 — Review completa + relazione + consegna

Qui **non dividerei più il progetto rigidamente tra Gruppo 1 e Gruppo 2**.

La revisione finale, secondo la guida, è responsabilità di **tutto il gruppo**. 

Controllate la catena completa:

```text
Problem Statement
↕
Use Case
↕
Requirements
↕
Activity / Sequence
↕
Class Diagram
↕
Design Pattern
```

Nessun artefatto deve descrivere una versione diversa di MyAma. 

## Prima parte della giornata — revisione tecnica

Controllate:

* attori coerenti;
* termini coerenti con il Glossario;
* tutti i principali requisiti coperti;
* Use Case coerenti con i requisiti;
* Sequence coerenti con gli Use Case;
* oggetti dei Sequence presenti nel Class Diagram;
* messaggi dei Sequence compatibili con le operazioni;
* nessuna classe duplicata;
* Unrefined coerente;
* pattern sensati;
* Refined coerente.

## Seconda parte — relazione

Qui potete dividervi nuovamente.

### Gruppo 1

Sistema:

* Introduzione;
* Glossario;
* User Requirements;
* Use Case;
* System Requirements;
* verificabilità.

### Gruppo 2

Sistema:

* Activity;
* Sequence;
* Class Diagram;
* Unrefined;
* Design Pattern;
* Refined.

### Tutti insieme alla fine

* uniformazione stile;
* numerazione;
* indice;
* riferimenti alle figure;
* controllo immagini;
* revisione PDF.

Infine preparate l'archivio ordinato dei sorgenti Visual Paradigm. La versione aggiornata dei file specifica che non è necessario consegnare un singolo `.vpp`: può essere un **insieme coerente e ordinato di sorgenti**. 

---

## Quindi la divisione definitiva nei 5 giorni sarebbe

| Giorno | Gruppo 1                                  | Gruppo 2                         | Insieme                                          |
| ------ | ----------------------------------------- | -------------------------------- | ------------------------------------------------ |
| **1**  | Introduzione, problema, attori, obiettivi | Funzionalità, scope/out of scope | Problem Statement + Glossario + approvazione     |
| **2**  | Use Case Cliente + requisiti              | Use Case AMA + requisiti         | Review UC + System Requirements + verificabilità |
| **3**  | Activity/Sequence Cliente                 | Activity/Sequence AMA            | Bozza Class Diagram + riallineamento             |
| **4**  | Analisi problema/pattern 1                | Analisi problema/pattern 2       | Unrefined + scelta pattern + Refined             |
| **5**  | Revisione parte requisiti                 | Revisione parte UML/design       | Review completa + PDF + `.vpp`                   |

Questa è molto più aderente ai vostri due documenti rispetto alla divisione che ti avevo dato prima, soprattutto perché rispetta la logica **per attore nelle fasi parallelizzabili** e poi fa convergere tutti sui modelli trasversali come Class Diagram e Design Pattern.
