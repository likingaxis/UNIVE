# Pianificazione e introduzione alla progettazione

Finora abbiamo definito **cosa** deve fare il software e abbiamo costruito modelli che descrivono il sistema dal punto di vista dei dati, del comportamento e della dinamica.

A questo punto, però, sapere cosa costruire non basta. Prima di passare alla progettazione vera e propria bisogna organizzare il lavoro necessario per realizzarlo:

- chi svolgerà le attività;
- quanto lavoro sarà necessario;
- quanto tempo richiederà;
- quanto costerà;
- in quale ordine dovranno essere svolti i task;
- come controllare che il progetto stia procedendo secondo il piano.

Da questa esigenza nasce la **Software Project Management**, cioè la gestione del progetto software. La **pianificazione** è una delle sue attività fondamentali.

# Software Project Management e pianificazione

La **Software Project Management** comprende la pianificazione, il monitoraggio e il controllo delle persone, delle attività e delle risorse coinvolte nello sviluppo del software.

La pianificazione non consiste quindi soltanto nello stabilire una data di consegna. Deve costruire un quadro realistico dell'intero lavoro da svolgere.

La gestione di un progetto software viene ricondotta alle cosiddette **quattro P**:

- **People**:
  - riguarda le persone coinvolte nel progetto;
  - comprende organizzazione dei team, responsabilità e comunicazione;
- **Product**:
  - riguarda il prodotto da costruire;
  - bisogna comprenderne obiettivi, funzioni, dati e caratteristiche;
- **Process**:
  - definisce il quadro generale secondo cui verrà sviluppato il prodotto;
  - stabilisce quindi il modello e le attività del processo software;
- **Project**:
  - riguarda l'organizzazione concreta del lavoro;
  - comprende task, persone, tempi, costi e controllo dell'avanzamento.

Le quattro P sono collegate: non è possibile stimare correttamente tempi e costi senza conoscere il prodotto, il processo scelto e le persone che dovranno svolgere il lavoro.

## Organizzazione delle persone

Prima di parlare di stime e scheduling bisogna chiarire un problema: **aggiungere persone a un progetto non significa automaticamente ridurne la durata**.

Il lavoro software richiede comunicazione, coordinamento e condivisione di decisioni. Se il numero di persone aumenta, aumentano anche le interazioni necessarie tra loro.

Un'attività stimata in un anno-persona, quindi, non può essere automaticamente trasformata in quattro persone che lavorano tre mesi:

- alcuni task non sono perfettamente divisibili;
- le persone devono coordinarsi;
- parte del tempo viene spesa per comunicare;
- chi entra in un progetto già avviato deve prima comprenderne il contesto.

### Legge di Brooks

La **Legge di Brooks** evidenzia proprio questo problema:

> aggiungere personale a un progetto software già in ritardo può farlo ritardare ulteriormente.

Il nuovo personale richiede infatti:

- formazione;
- trasferimento di conoscenza;
- nuove comunicazioni;
- ulteriore coordinamento con il team esistente.

Questa osservazione spiega perché l'organizzazione del team è parte integrante della pianificazione e non una semplice scelta amministrativa.

## Due modelli estremi di organizzazione del team

Storicamente vengono presentati due approcci opposti. Servono soprattutto a capire il trade-off tra **collaborazione orizzontale** e **controllo gerarchico**.

### Team democratico

Il modello **democratico**, o orizzontale, si basa sull'idea di *egoless programming*:

- il codice viene considerato prodotto del team;
- non viene associato rigidamente al singolo programmatore;
- la ricerca dei difetti dovrebbe quindi essere percepita come miglioramento del prodotto e non come critica personale.

Vantaggi:

- favorisce il confronto;
- facilita la ricerca collettiva degli errori;
- può essere efficace quando il problema richiede collaborazione e creatività.

Limiti:

- non può essere imposto facilmente;
- richiede una cultura di gruppo adatta;
- può creare difficoltà quando ruoli ed esperienza sono molto differenti.

### Team con Chief Programmer

All'estremo opposto troviamo l'approccio gerarchico basato sul **Chief Programmer**.

L'idea è ridurre la complessità delle comunicazioni:

- ogni partecipante ha un ruolo specializzato;
- gli sviluppatori comunicano principalmente con il capo programmatore;
- il Chief Programmer coordina le attività ed è responsabile del risultato.

![[assets/p068-fig-070.png|600]]

Il vantaggio principale è la riduzione dei canali di comunicazione. Il limite è che il ruolo centrale richiede una persona molto competente sia dal punto di vista tecnico sia da quello gestionale.

Per questo il modello viene successivamente evoluto separando due responsabilità:

- **Team Leader** → aspetti tecnici;
- **Team Manager** → aspetti gestionali.

Questa separazione risolve il problema di concentrare troppe responsabilità in una sola persona, ma ne crea un altro: leader tecnico e manager devono comunque coordinarsi.

Si introducono quindi:

- aree di responsabilità condivise;
- livelli superiori di coordinamento;
- canali di comunicazione tra team;
- forme di *decision making* più decentralizzate.

![[assets/p069-fig-071.png|700]]

Il punto importante non è memorizzare un unico modello organizzativo “corretto”, ma capire che **la struttura del team influenza comunicazione, coordinamento e quindi tempi e costi del progetto**.

# Che cosa deve stabilire una pianificazione

Chiarito il ruolo delle persone, possiamo tornare alla pianificazione vera e propria.

Una pianificazione completa deve affrontare cinque aspetti principali:

- **Scoping**:
  - capire il problema;
  - stabilire il lavoro effettivamente compreso nel progetto;
- **Stime**:
  - prevedere dimensione, effort, durata e costi;
- **Rischi**:
  - identificare e gestire le situazioni che possono compromettere il progetto;
- **Schedule**:
  - distribuire i task nel tempo;
  - assegnare risorse e persone;
- **Strategia di controllo**:
  - stabilire come verificare durante lo sviluppo se il progetto sta seguendo il piano.

Il Risk Management è già stato approfondito. Qui ci concentriamo soprattutto su **stime** e **pianificazione temporale**.

# Stime nei progetti software

Una **stima** cerca di prevedere prima dello sviluppo una quantità che conosceremo con precisione soltanto più avanti.

Le grandezze principali sono:

- **dimensione** del software;
- **effort** necessario;
- **durata** dello sviluppo;
- **costo**.

## Effort

L'**effort** rappresenta la quantità complessiva di lavoro necessaria per svolgere un'attività o sviluppare il prodotto.

Non coincide con la durata.

Per esempio:

- 1 persona che lavora per 10 mesi → 10 mesi-persona di effort;
- 2 persone che lavorano per 5 mesi → ancora 10 mesi-persona di effort.

Questo non significa però che i due progetti avranno necessariamente la stessa durata reale, perché il lavoro non è sempre perfettamente parallelizzabile e bisogna considerare il coordinamento tra persone.

Nelle tecniche successive l'effort viene spesso espresso in **Man-Months (MM)**, cioè mesi-persona.

## Perché stimare è difficile

La difficoltà nasce da un problema circolare:

1. per stimare effort e costi serve spesso conoscere la dimensione del software;
2. la dimensione reale del software sarà nota soltanto quando il software sarà stato effettivamente realizzato;
3. la stima, però, serve proprio **prima** di arrivare alla codifica.

Per ridurre l'incertezza vengono usate diverse tecniche.

## Principali famiglie di tecniche

Gli appunti distinguono tre approcci principali:

1. **analogia con progetti simili già completati**;
2. **tecniche di scomposizione**, con approccio *bottom-up*;
3. **modelli algoritmici empirici**.

Questi approcci non risolvono completamente l'incertezza: cercano di renderla controllabile usando dati storici, suddivisione del problema e relazioni quantitative.

# Stime per analogia

Il principio è semplice:

- si confronta il nuovo progetto con progetti già completati;
- si cercano caratteristiche simili;
- si utilizzano i dati storici per costruire la nuova stima.

L'analogia è particolarmente utile quando l'organizzazione dispone di dati affidabili su:

- dimensione;
- produttività;
- effort;
- costo;
- tecnologie utilizzate.

Il limite è evidente: se il nuovo progetto differisce molto dai precedenti, il confronto diventa meno affidabile.

# Tecniche di scomposizione

Quando il progetto è troppo grande per essere stimato come un unico blocco, si applica un principio di **divide et impera**:

1. si divide il prodotto o il lavoro in parti più piccole;
2. si stima ogni parte;
3. si combinano le stime ottenute.

Il principio è *bottom-up*: si parte dai componenti per arrivare alla stima complessiva.

Una tecnica mostrata negli appunti utilizza per ciascun componente:

- **Estimated LOC** → righe di codice stimate;
- **LOC/pm** → produttività, cioè quante linee di codice vengono prodotte mediamente in un mese-persona;
- **$/LOC** → costo medio per linea di codice.

![[assets/p070-fig-072.png|700]]

A partire da questi valori si possono ricavare:

- **Effort**:

\[
Effort = \frac{Estimated\ LOC}{LOC/pm}
\]

- **Cost**:

\[
Cost = Estimated\ LOC \times \$/LOC
\]

La tecnica è semplice, ma mette in evidenza il vero problema: **bisogna stimare le LOC prima che il codice esista**.

Inoltre la stessa funzionalità può richiedere quantità di codice molto diverse in linguaggi differenti.

Da questa limitazione nasce l'esigenza di una misura meno dipendente dal linguaggio di programmazione: i **Function Point**.

# Lines of Code e Function Point

## Lines of Code

Le **LOC — Lines of Code** misurano la dimensione del software attraverso il numero di linee di codice.

Sono una misura molto concreta, ma presentano due problemi fondamentali nelle fasi iniziali:

- il codice non esiste ancora e quindi le LOC devono essere stimate;
- la quantità di codice necessaria dipende dal linguaggio utilizzato.

Le LOC sono quindi utili quando si dispone di dati storici affidabili, ma sono meno naturali quando siamo ancora vicini alla fase di specifica.

## Perché nascono i Function Point

A questo punto sappiamo già qualcosa che le LOC non sfruttano direttamente: **la specifica descrive le funzionalità che il sistema dovrà offrire**.

I **Function Point (FP)** cercano quindi di misurare la dimensione funzionale del software a partire da ciò che il sistema deve fare, prima che venga implementato.

Il vantaggio concettuale è importante:

**specifica → funzionalità richieste → Function Point → stima dimensionale**

anziché:

**specifica → tentativo di immaginare il codice futuro → LOC stimate**

# Function Point

I **Function Point** rappresentano una misura ponderata della quantità di funzionalità fornita dal software.

Il conteggio presentato negli appunti procede in due fasi:

1. calcolo del conteggio funzionale non aggiustato;
2. correzione del valore considerando la complessità tecnica.

Negli appunti il primo valore viene indicato come **UFC — Unadjusted Function Point Count**.

La relazione complessiva è:

\[
FP = UFC \times TCF
\]

dove:

- **UFC** considera la funzionalità;
- **TCF — Technical Complexity Factor** corregge il valore tenendo conto della difficoltà tecnica.

## I cinque elementi di conteggio

Per calcolare UFC bisogna osservare il sistema attraverso il suo **boundary**, cioè il confine che separa il software dal mondo esterno.

![[assets/p071-fig-073.png|600]]

Gli elementi vengono divisi in due gruppi.

### Dati

- **ILF — Internal Logical Files**
  - gruppi logici di dati mantenuti dal sistema;
  - rappresentano informazioni che il software gestisce internamente;

- **EIF — External Interface Files**
  - gruppi logici di dati utilizzati dal sistema ma condivisi o gestiti attraverso altre applicazioni.

Qui il termine *file* non deve essere interpretato necessariamente come un singolo file fisico del filesystem. Indica un **gruppo logico di informazioni correlate**.

### Interazioni con l'esterno

- **EI — External Input**
  - dati che entrano nel software;
  - possono modificare lo stato dei dati gestiti dal sistema;

- **EO — External Output**
  - dati o informazioni prodotti dal software e inviati verso l'esterno;

- **EQ — External Inquiry**
  - interazione input/output;
  - l'input genera una risposta immediata;
  - non modifica lo stato degli ILF.

Questi cinque elementi servono a descrivere **quanta funzionalità attraversa il confine del sistema e quante informazioni il sistema deve gestire**.

## Dalla quantità alla complessità funzionale

Contare semplicemente gli elementi non basta: un ILF semplice non pesa necessariamente quanto un ILF complesso.

Per ciascun elemento si determina quindi una classe di complessità e si applica il peso previsto dalla tecnica.

![[assets/p073-fig-075.png|600]]

La somma dei valori ponderati produce il conteggio non aggiustato **UFC**.

Finora abbiamo però misurato soltanto **la complessità funzionale**. Non abbiamo ancora considerato quanto il prodotto sia tecnicamente difficile da realizzare.

Da qui entra in gioco il TCF.

## Technical Complexity Factor

Il **TCF** tiene conto di fattori tecnici che possono rendere il sistema più o meno difficile da sviluppare.

Gli appunti considerano **14 Degree of Influence**. Per ciascun fattore viene assegnato un valore da:

- `0` → influenza irrilevante;
- `5` → influenza essenziale.

Tra gli esempi citati:

- necessità di backup e recovery;
- data communication;
- distributed data processing;
- requisiti prestazionali;
- online data entry;
- facilità d'uso;
- riusabilità;
- facilità di installazione;
- facilità di modifica.

Il fattore complessivo viene calcolato attraverso la formula riportata negli appunti:

![[assets/p074-fig-076.png|450]]

Il TCF non sostituisce il conteggio funzionale: lo **aggiusta** in base alla difficoltà tecnica.

Per questo il processo completo è:

**specifica → 5 elementi di conteggio → pesatura → UFC → fattori tecnici → TCF → FP**

# Da Function Point a LOC: Backfiring

I Function Point risolvono il problema di misurare il software senza conoscere ancora il codice. Rimane però un'altra difficoltà: diversi modelli di stima utilizzano come input le **LOC**.

Serve quindi un ponte tra le due misure.

Il **Backfiring** utilizza tabelle empiriche che associano a ciascun linguaggio un numero indicativo di LOC per Function Point.

![[assets/p074-fig-077.png|450]]

Il passaggio diventa:

**Function Point → scelta del linguaggio → LOC/FP → LOC stimate**

Questa conversione non rende FP e LOC la stessa misura:

- FP misura la dimensione dal punto di vista della funzionalità;
- LOC misura la dimensione del codice;
- il backfiring permette di passare empiricamente dall'una all'altra quando un modello richiede LOC.

Una volta ottenuta una stima dimensionale in LOC, possiamo usarla come input per un modello algoritmico. Negli appunti il modello principale è **COCOMO**.

# COCOMO

**COCOMO — COnstructive COst MOdel** è un modello algoritmico empirico utilizzato per stimare l'effort di sviluppo.

Il principio generale è:

**dimensione stimata → modello matematico → effort → durata e costo**

## Le tre versioni presentate

Gli appunti distinguono:

- **Basic**:
  - usato per stime iniziali;

- **Intermediate**:
  - utilizzato quando il sistema è stato suddiviso in sottosistemi;

- **Advanced**:
  - utilizzato quando sono stati identificati più in dettaglio moduli e relazioni interne ai sottosistemi.

Questa è una classificazione interna a COCOMO: non sono tre tecniche indipendenti, ma tre livelli di dettaglio dello stesso approccio.

## Modi di sviluppo

La stima dipende anche dalla difficoltà del progetto. Gli appunti distinguono tre modi:

- **Organic**
  - prodotti relativamente piccoli;

- **Semidetached**
  - prodotti di dimensione e difficoltà intermedie;

- **Embedded**
  - prodotti più complessi e con vincoli maggiori.

Quindi, prima di applicare la formula, bisogna stabilire:

1. quale versione del modello si sta utilizzando;
2. quale modo di sviluppo rappresenta il progetto;
3. quante KLOC sono previste.

## KLOC

**KLOC** significa *Kilo Lines of Code*, cioè migliaia di linee di codice.

Esempio:

- `20 KLOC` = circa `20 000 LOC`.

COCOMO utilizza la dimensione in KLOC per calcolare l'effort.

## Effort nominale

La forma generale presentata negli appunti è:

\[
Effort_{nominale} = a \times (KLOC)^b
\]

I coefficienti `a` e `b` dipendono dal modello e dal modo di sviluppo.

L'effort viene detto **nominale** perché considera la dimensione, ma non ha ancora incorporato tutte le caratteristiche specifiche del progetto.

Per esempio, negli appunti per il caso *Intermediate Organic* viene riportato:

\[
Effort_{nominale} = 3.2 \times (KLOC)^{1.05}
\]

con risultato espresso in **Man-Months**.

## Cost Drivers

Due progetti con la stessa quantità di codice possono richiedere effort molto diversi.

Per esempio possono cambiare:

- affidabilità richiesta;
- piattaforma;
- esperienza del personale;
- strumenti disponibili;
- vincoli del progetto.

Per questo l'effort nominale viene corretto attraverso i **Cost Drivers**.

![[assets/p076-fig-078.png|600]]

Gli appunti considerano 15 fattori suddivisi in gruppi relativi a:

- **Product**;
- **Platform**;
- **Personnel**;
- **Project**.

A ciascun fattore viene associato un rating.

Il valore nominale è `1`:

- un valore maggiore di `1` aumenta l'effort;
- un valore minore di `1` lo riduce.

Il fattore complessivo `C` deriva dal prodotto dei singoli cost driver:

\[
C = \prod_i C_i
\]

e quindi:

\[
Effort = Effort_{nominale} \times C
\]

![[assets/p077-fig-079.png|700]]

Questa struttura è concettualmente simile a quanto visto nei Function Point:

- prima si calcola un valore di base;
- poi lo si aggiusta considerando caratteristiche ulteriori del progetto.

# Dall'effort alla durata

L'effort ci dice **quanto lavoro complessivo** è necessario. Non ci dice ancora **quanto tempo di calendario** durerà il progetto.

COCOMO permette quindi di stimare anche la durata attraverso una relazione del tipo:

\[
Time = c \times Effort^d
\]

dove `c` e `d` dipendono dal modo di sviluppo.

La distinzione è importante:

- **Effort** → quantità di lavoro;
- **Time** → durata temporale dello sviluppo.

Non possiamo dividere semplicemente l'effort per il numero di persone, proprio per i problemi di dipendenze e coordinamento già visti con la Legge di Brooks.

# Dall'effort al costo

Una volta stimato l'effort, il costo può essere calcolato considerando **come quell'effort viene distribuito tra fasi e persone**.

Gli appunti dividono il lavoro post-specifica in:

- progettazione preliminare;
- progettazione di dettaglio, codifica e testing;
- integrazione.

L'effort complessivo viene ripartito tra queste attività. Successivamente si considera il costo delle persone coinvolte.

Il costo di una persona per mese non coincide semplicemente con il suo stipendio: rappresenta il costo complessivo sostenuto dall'organizzazione per utilizzarne il lavoro.

In forma concettuale:

\[
Costo\ totale = \sum (Effort_{ruolo} \times Costo\ per\ MM_{ruolo})
\]

A questo punto abbiamo una stima di dimensione, effort, durata e costo. Manca però ancora una cosa: **disporre concretamente le attività nel tempo rispettando le loro dipendenze**.

Da questa necessità nasce la pianificazione temporale.

# Pianificazione temporale

La **pianificazione temporale** organizza i task del progetto nel tempo.

Non si può semplicemente assegnare una data a ciascun task, perché i task non sono tutti indipendenti. Alcuni possono iniziare soltanto dopo che altri sono terminati.

La pianificazione deve quindi considerare:

- **Ripartizione**
  - scomporre processo e prodotto in task di dimensione gestibile;

- **Interdipendenza**
  - identificare quali task dipendono da altri;

- **Allocazione delle risorse**
  - assegnare persone ed effort;
  - stabilire date di inizio e fine;

- **Responsabilità**
  - definire chi è responsabile di ogni task;

- **Risultati previsti**
  - chiarire quale output deve essere prodotto;

- **Punti di controllo**
  - introdurre milestone in cui verificare lo stato del progetto.

Due strumenti complementari aiutano a rappresentare questa pianificazione: **PERT** e **Gantt**.

# PERT

Il **PERT — Program Evaluation and Review Technique** rappresenta i task e le loro dipendenze come una rete.

Negli appunti:

- i nodi rappresentano i task;
- gli archi rappresentano i vincoli di precedenza.

![[assets/p078-fig-080.png|600]]

Il diagramma permette di capire:

- quali attività possono procedere in parallelo;
- quali devono attendere il completamento di altre;
- quali sequenze determinano la durata complessiva.

## Cammino critico

Il **cammino critico** è la sequenza di task che determina la durata minima possibile del progetto.

Se un task sul cammino critico accumula ritardo, il ritardo si riflette direttamente sulla durata complessiva del progetto.

Quindi PERT risponde bene alla domanda:

> **quali dipendenze tra task condizionano la durata del progetto?**

Non rende però altrettanto immediato capire **in quali date di calendario** si svolgono le singole attività.

Per questo viene affiancato dal diagramma di Gantt.

# Diagramma di Gantt

Il **Gantt** rappresenta le attività su una scala temporale calendariale.

Permette di vedere:

- quando inizia un task;
- quando termina;
- quanto dura;
- quali attività si sovrappongono.

![[assets/p079-fig-081.png|700]]

PERT e Gantt descrivono quindi due aspetti complementari:

- **PERT** → dipendenze e cammino critico;
- **Gantt** → distribuzione calendariale delle attività.

Usati insieme forniscono una visione più completa della pianificazione.

# SPMP — Software Project Management Plan

Team, stime, Risk Management, PERT e Gantt non sono attività isolate. Devono essere raccolti in una gestione coerente del progetto.

Il documento guida è lo **SPMP — Software Project Management Plan**.

![[assets/p080-fig-082.png|700]]

Lo SPMP formalizza il piano secondo cui il progetto verrà organizzato e controllato.

In termini generali raccoglie le informazioni necessarie per descrivere:

- organizzazione del progetto;
- risorse;
- attività;
- stime;
- schedule;
- gestione dei rischi;
- modalità di monitoraggio e controllo.

Con lo SPMP si chiude quindi il problema della **pianificazione del lavoro**.

Finora abbiamo stabilito:

- cosa deve fare il sistema → specifica;
- come organizzare il progetto → pianificazione.

Rimane ora da decidere **come strutturare tecnicamente la soluzione software**.

Da qui inizia la fase di **Progettazione**.

# Progettazione Software

La **Progettazione** è la fase in cui si passa dal dominio del problema al dominio della soluzione.

La specifica ci diceva **cosa** il sistema deve fare.

La progettazione decide **come** costruire il sistema affinché quelle specifiche possano essere realizzate.

L'input principale è il **Documento di Specifica**.

L'output è il **Documento di Progetto**.

La progettazione viene divisa in due livelli:

- **Progetto Architetturale o Preliminare**
  - individua le componenti principali del sistema;
  - stabilisce come il prodotto viene suddiviso;

- **Progetto Dettagliato**
  - entra all'interno delle singole componenti;
  - definisce strutture dati, algoritmi e dettagli necessari all'implementazione.

La distinzione segue quindi una progressione naturale:

**sistema complessivo → componenti → dettagli interni delle componenti**

Prima di vedere tecniche specifiche di OOD e architetture, bisogna chiarire alcuni principi generali che guidano una buona progettazione.

# Astrazione e Stepwise Refinement

Progettare un sistema complesso tutto in una volta sarebbe poco gestibile.

La strategia utilizzata è alternare due idee complementari:

- **Astrazione** → ignorare temporaneamente i dettagli;
- **Stepwise Refinement** → aggiungere progressivamente i dettagli necessari.

## Astrazione

L'**Astrazione** permette di concentrarsi sugli aspetti rilevanti di un elemento senza dover conoscere immediatamente tutti i dettagli della sua implementazione.

Per esempio, possiamo utilizzare un'operazione sapendo:

- cosa riceve;
- cosa produce;
- quale servizio offre;

senza conoscere ancora le istruzioni interne che la realizzano.

Gli appunti distinguono principalmente:

- **astrazione procedurale**
  - si considera un'operazione attraverso il servizio che offre;
  - non è necessario conoscere la sua implementazione interna;

- **astrazione dei dati**
  - si lavora con una struttura dati attraverso le operazioni che mette a disposizione;
  - la rappresentazione interna può rimanere nascosta.

## Stepwise Refinement

Lo **Stepwise Refinement** procede nella direzione opposta ma complementare:

1. si parte da una descrizione ad alto livello;
2. si sceglie una parte;
3. si aggiungono dettagli;
4. il processo viene ripetuto finché si raggiunge il livello necessario per l'implementazione.

Quindi:

- l'astrazione permette di **salire** di livello e ignorare dettagli;
- il refinement permette di **scendere** progressivamente nei dettagli.

Questa logica porta direttamente a un altro principio fondamentale: invece di trattare il software come un unico blocco, possiamo suddividerlo in parti più piccole.

# Modularità e decomposizione modulare

La **decomposizione modulare** consiste nel suddividere il sistema in componenti più piccoli chiamati **moduli**.

Lo scopo non è semplicemente creare molti pezzi, ma ridurre la complessità rendendo possibile ragionare su una parte del sistema alla volta.

Un **modulo software** è un'unità che può contenere:

- istruzioni;
- logica di elaborazione;
- strutture dati.

Può inoltre:

- essere compilato separatamente;
- essere memorizzato in una libreria;
- essere incluso in un programma;
- essere identificato tramite nome e parametri;
- utilizzare altri moduli.

Funzioni e classi sono esempi di elementi che possono svolgere il ruolo di modulo.

## Che cosa significa modularità

La **modularità** indica il grado con cui il software è organizzato in componenti discrete tali che una modifica a un componente abbia un impatto limitato sugli altri.

La decomposizione deve quindi puntare a creare moduli **quanto più indipendenti possibile**.

Il motivo è pratico:

- un modulo indipendente è più facile da comprendere;
- una modifica locale ha meno effetti sul resto del sistema;
- il testing è più gestibile;
- aumenta la possibilità di riutilizzo.

Il risultato della decomposizione costituisce l'**architettura dei moduli**.

![[assets/p082-fig-083.png|450]]

Ma come possiamo capire se abbiamo suddiviso bene il sistema?

Servono due criteri complementari:

- **coesione** interna ai moduli;
- **coupling** tra moduli.

# Coesione e Coupling

Una buona decomposizione mira a:

- **massimizzare la coesione**;
- **minimizzare il coupling**.

Questi due concetti osservano il sistema da direzioni differenti:

- **Cohesion** → guarda *dentro* il modulo;
- **Coupling** → guarda *tra* moduli diversi.

![[assets/p082-fig-084.png|600]]

Non basta quindi creare tanti moduli. Bisogna creare moduli che abbiano responsabilità interne coerenti e che dipendano il meno possibile dagli altri.

# Coesione

La **coesione** misura quanto le attività contenute nello stesso modulo siano correlate tra loro.

Un modulo ad alta coesione:

- ha uno scopo chiaro;
- raggruppa attività strettamente connesse;
- è più facile da comprendere e modificare.

Un modulo a bassa coesione contiene invece attività che avrebbero pochi motivi per stare insieme.

Gli appunti presentano sette livelli, dal peggiore al migliore.

## 1. Coincidental Cohesion

Gli elementi sono raggruppati senza una relazione significativa.

Esempio concettuale:

- stampare una riga;
- modificare una stringa;
- aggiornare un valore numerico.

Le operazioni condividono il modulo, ma non una responsabilità comune.

## 2. Logical Cohesion

Le operazioni appartengono alla stessa categoria generale, ma a ogni invocazione ne viene selezionata soltanto una.

Il modulo contiene quindi diverse attività logicamente simili, controllate dal chiamante.

![[assets/p083-fig-085.png|550]]

## 3. Temporal Cohesion

Gli elementi sono raggruppati perché devono essere eseguiti nello stesso momento.

Esempi tipici negli appunti sono operazioni di inizializzazione o apertura di più risorse.

Il legame è temporale, non funzionale.

## 4. Procedural Cohesion

Le attività sono collegate perché devono essere eseguite secondo una determinata sequenza.

Il rapporto è quindi più forte rispetto alla semplice coincidenza temporale.

## 5. Communicational Cohesion

Le attività:

- fanno parte di una sequenza correlata;
- operano inoltre sulla stessa struttura dati.

## 6. Informational Cohesion

Il modulo contiene più operazioni indipendenti, ciascuna con il proprio ingresso e uscita, ma tutte lavorano sulla stessa struttura dati.

È particolarmente vicina alla logica di una classe:

- esiste uno stato/dato comune;
- più operazioni lavorano su quello stato.

![[assets/p083-fig-086.png|550]]

## 7. Functional Cohesion

Tutti gli elementi del modulo collaborano alla realizzazione di **una sola funzione ben definita**.

È il livello più forte della scala presentata.

Gli appunti collegano:

- **Functional Cohesion** alla programmazione strutturata;
- **Informational Cohesion** al paradigma Object Oriented.

![[assets/p084-fig-087.png|700]]

Una volta valutata la qualità interna di ciascun modulo, dobbiamo guardare l'altro lato della decomposizione: **quanto i moduli dipendono tra loro**.

# Coupling

Il **coupling** misura il grado di dipendenza tra moduli differenti.

L'obiettivo è **minimizzarlo**.

Un coupling elevato significa che:

- un modulo conosce molti dettagli di un altro;
- una modifica può propagarsi facilmente;
- comprendere un modulo richiede conoscere anche altri moduli.

Un coupling basso significa invece che i moduli comunicano attraverso interfacce limitate e ben definite.

Gli appunti presentano cinque livelli, dal peggiore al migliore.

## 1. Content Coupling

È il livello peggiore.

Un modulo accede direttamente al contenuto interno di un altro modulo, per esempio:

- modificandone istruzioni;
- accedendo ai suoi dati locali;
- entrando direttamente nel suo flusso di controllo.

La dipendenza è molto forte perché il primo modulo conosce dettagli che dovrebbero appartenere esclusivamente al secondo.

## 2. Common Coupling

Più moduli accedono alla stessa struttura dati condivisa in lettura e scrittura.

L'esempio classico è l'uso di dati globali modificabili.

Il problema è che una modifica effettuata da un modulo può influenzare implicitamente gli altri.

## 3. Control Coupling

Un modulo influenza esplicitamente il comportamento di un altro attraverso informazioni di controllo.

Il messaggio non trasporta soltanto dati: dice anche al modulo ricevente **quale comportamento eseguire**.

## 4. Stamp Coupling

I moduli si scambiano una struttura dati complessa, ma il ricevente utilizza soltanto una parte delle informazioni ricevute.

La dipendenza è maggiore del necessario perché l'interfaccia espone dati che non servono realmente.

## 5. Data Coupling

È il livello migliore della scala presentata.

I moduli comunicano passando esclusivamente i dati necessari attraverso un'interfaccia definita.

Il modulo chiamante e quello chiamato non devono conoscere dettagli implementativi reciproci.

![[assets/p085-fig-088.png|600]]

I fattori che aumentano il coupling comprendono:

- quantità di dati condivisi;
- numero di riferimenti verso altri moduli;
- complessità delle interfacce;
- grado di controllo esercitato su altri moduli.

Il principio generale diventa quindi:

**moduli internamente coerenti + dipendenze esterne ridotte = struttura più manutenibile**

Questa idea conduce naturalmente all'**Information Hiding**.

# Information Hiding

Anche con un basso coupling, un modulo può esporre più dettagli del necessario.

L'**Information Hiding** stabilisce che ogni modulo dovrebbe rendere visibile all'esterno **solo ciò che gli altri moduli devono conoscere**, nascondendo i dettagli implementativi non necessari.

In pratica si separano:

- **interfaccia pubblica** → ciò che gli altri possono utilizzare;
- **implementazione interna** → come il modulo realizza realmente il servizio.

Il vantaggio emerge soprattutto quando il software cambia.

Se l'implementazione interna viene modificata ma l'interfaccia rimane stabile:

- gli altri moduli non devono essere modificati;
- il testing delle parti non coinvolte si riduce;
- la manutenzione diventa più semplice.

Nel paradigma Object Oriented questo principio viene supportato attraverso meccanismi come:

- attributi non direttamente accessibili;
- qualificatori di accesso;
- getter e setter;
- metodi pubblici che rappresentano l'interfaccia della classe.

Information Hiding completa quindi il ragionamento iniziato con la modularità:

**decomporre il sistema → creare moduli coesi → ridurre le dipendenze → nascondere i dettagli interni**

Una struttura di questo tipo facilita anche l'ultimo principio considerato in questa parte: la **riusabilità**.

# Riusabilità

La **riusabilità** consiste nell'utilizzare in un nuovo prodotto elementi già sviluppati in precedenza.

Il riuso non riguarda soltanto porzioni di codice. Negli appunti il concetto viene esteso anche a:

- moduli software;
- parti di progetto;
- documentazione;
- test data;
- stime di tempi e costi.

I principali vantaggi sono:

- riduzione dei tempi di sviluppo;
- riduzione dei costi;
- maggiore affidabilità quando vengono riutilizzati componenti già convalidati.

Nella fase di progettazione il riuso può avvenire a diversi livelli:

- **moduli software**;
- **Application Framework**;
- **Design Pattern**;
- **architetture software**.

![[assets/p087-fig-089.png|600]]

Questa progressione è importante:

- riusare un modulo significa riutilizzare una parte concreta dell'implementazione;
- riusare un framework significa riutilizzare una struttura applicativa;
- riusare un Design Pattern significa riutilizzare una soluzione progettuale ricorrente;
- riusare un'architettura significa riutilizzare una struttura complessiva del sistema.

Con questi principi abbiamo definito **come deve essere strutturata una buona soluzione software a livello generale**.

Il passo successivo sarà entrare nella progettazione Object Oriented e nelle diverse **architetture software**, cioè vedere concretamente come organizzare le componenti individuate durante la progettazione preliminare.
