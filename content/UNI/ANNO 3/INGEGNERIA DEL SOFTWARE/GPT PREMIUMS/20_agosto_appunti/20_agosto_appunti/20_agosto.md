# Design Pattern e metriche di struttura

Nel progetto software abbiamo già visto come scomporre il sistema in componenti, ridurre il coupling, aumentare la coesione e nascondere i dettagli interni. Rimane però un problema pratico: **molte difficoltà di progettazione si ripresentano in sistemi diversi**.

Se ogni volta le affrontassimo da zero, rischieremmo di produrre soluzioni più complesse del necessario. Da questa esigenza nascono i **Design Pattern**: soluzioni progettuali generali a problemi ricorrenti.

Un Design Pattern non è codice pronto da copiare. Descrive invece:

- il **problema** che si presenta;
- l'idea generale della **soluzione**;
- i principali **ruoli** coinvolti;
- le relazioni tra tali ruoli;
- le conseguenze dell'adozione della soluzione.

I pattern studiati si dividono in tre famiglie, in base al tipo di problema affrontato:

- **creazionali** → riguardano la creazione degli oggetti;
- **strutturali** → riguardano il modo in cui classi e oggetti vengono composti;
- **comportamentali** → riguardano la distribuzione del comportamento e la collaborazione tra oggetti.

Questa classificazione permette di capire subito **che tipo di problema sta cercando di risolvere un pattern**, prima di entrare nei dettagli dei singoli casi.

# Pattern creazionali

I pattern creazionali servono quando il problema non è semplicemente *creare un oggetto*, ma **evitare che il client dipenda troppo dalle classi concrete da istanziare**.

In questo corso vengono considerati soprattutto **Abstract Factory** e **Factory Method**. Entrambi separano la logica di creazione dal codice che usa gli oggetti, ma lo fanno a livelli differenti.

## Abstract Factory

L'**Abstract Factory** fornisce un'interfaccia per creare **famiglie di oggetti correlati** senza specificarne direttamente le classi concrete.

Il problema tipico nasce quando un'applicazione deve funzionare con più famiglie compatibili di prodotti. Il client dovrebbe poter cambiare famiglia senza essere riscritto.

![[assets/p069-fig-032.png|650]]

I ruoli principali sono:

- **AbstractFactory** → dichiara le operazioni per creare i prodotti;
- **ConcreteFactory** → crea una specifica famiglia di prodotti concreti;
- **AbstractProduct** → definisce l'interfaccia comune di un tipo di prodotto;
- **ConcreteProduct** → implementa concretamente quel prodotto;
- **Client** → usa factory e prodotti attraverso le loro interfacce astratte.

Il vantaggio principale è che il client rimane indipendente dalle classi concrete. Cambiare un'intera famiglia di prodotti richiede principalmente di cambiare la factory utilizzata.

Il limite è che l'interfaccia della factory definisce quali tipi di prodotto appartengono alla famiglia: **aggiungere un nuovo tipo di prodotto può richiedere modifiche all'interfaccia della factory e alle factory concrete**.

## Factory Method

Il **Factory Method** affronta un problema simile, ma non crea una famiglia completa. Definisce invece un metodo per creare un prodotto e lascia alle **sottoclassi** la scelta della classe concreta da istanziare.

![[assets/p069-fig-033.png|650]]

I ruoli principali sono:

- **Product** → interfaccia comune degli oggetti prodotti;
- **ConcreteProduct** → implementazione concreta;
- **Creator** → dichiara il Factory Method;
- **ConcreteCreator** → ridefinisce il Factory Method e decide quale ConcreteProduct creare.

È utile quando una classe conosce il tipo generale di oggetto di cui ha bisogno, ma **non può o non vuole fissarne in anticipo la classe concreta**.

### Abstract Factory vs Factory Method

La relazione tra i due è più importante dei dettagli implementativi:

- **Abstract Factory** → crea **famiglie di prodotti correlati** mediante un oggetto factory;
- **Factory Method** → delega alle **sottoclassi** la creazione di uno specifico prodotto.

Quindi entrambi riducono la dipendenza dalle classi concrete, ma l'Abstract Factory lavora sul concetto di *famiglia*, mentre il Factory Method sul concetto di *operazione di creazione ridefinibile*.

# Pattern strutturali

Una volta creati gli oggetti, bisogna decidere **come farli collaborare e comporre senza introdurre dipendenze inutili**. I pattern strutturali affrontano proprio questo livello del progetto.

## Adapter

L'**Adapter** permette di riutilizzare una classe esistente quando la sua interfaccia è incompatibile con quella richiesta dal client.

Il problema è quindi di compatibilità, non di funzionalità: la classe esistente svolge già il lavoro necessario, ma il client non sa utilizzarla nel formato in cui si presenta.

![[assets/p070-fig-034.png|650]]

I partecipanti sono:

- **Client** → usa l'interfaccia attesa;
- **Target** → interfaccia richiesta dal client;
- **Adaptee** → classe esistente da riutilizzare;
- **Adapter** → traduce le richieste del Target nell'interfaccia dell'Adaptee.

L'Adapter introduce quindi un **ponte tra due interfacce incompatibili**, evitando di modificare direttamente la classe già esistente.

## Composite

Il **Composite** serve quando bisogna rappresentare una struttura gerarchica composta da elementi semplici e gruppi di elementi, ma il client dovrebbe poterli trattare **allo stesso modo**.

![[assets/p071-fig-035.png|650]]

I ruoli fondamentali sono:

- **Component** → interfaccia comune;
- **Leaf** → elemento semplice senza figli;
- **Composite** → elemento composto che contiene altri Component;
- **Client** → opera sull'interfaccia Component senza dover distinguere continuamente Leaf e Composite.

L'idea centrale è quindi:

> **oggetti singoli e composizioni di oggetti condividono la stessa interfaccia.**

Questo permette di costruire strutture ad albero e di manipolarle in maniera uniforme.

## Decorator

Il **Decorator** permette di aggiungere dinamicamente nuove responsabilità a un oggetto **senza modificarne la classe di base** e senza creare una grande gerarchia di sottoclassi.

![[assets/p071-fig-036.png|600]]

I ruoli principali sono:

- **Component** → interfaccia comune;
- **ConcreteComponent** → oggetto base da estendere;
- **Decorator** → mantiene un riferimento a un Component e ne condivide l'interfaccia;
- **ConcreteDecorator** → aggiunge una specifica responsabilità.

Il decoratore *avvolge* l'oggetto originale: dall'esterno continua a essere visto come un Component, ma il suo comportamento può essere arricchito.

### Composite vs Decorator

I due pattern possono apparire simili perché entrambi usano la composizione di oggetti, ma risolvono problemi diversi:

- **Composite** → costruire **gerarchie parte-tutto** e trattare in modo uniforme elementi semplici e composti;
- **Decorator** → **aggiungere funzionalità** a un oggetto in modo dinamico.

Anche rispetto all'Adapter la differenza è netta:

- **Adapter** cambia il modo in cui un oggetto viene visto dal client, adattandone l'interfaccia;
- **Decorator** mantiene l'interfaccia e ne estende il comportamento.

# Pattern comportamentali

I pattern comportamentali entrano in gioco quando la struttura degli oggetti è già definita, ma bisogna organizzare **come si distribuisce il comportamento e come gli oggetti comunicano tra loro**.

## Observer

L'**Observer** definisce una dipendenza **uno-a-molti** tra oggetti: quando cambia lo stato di un oggetto, gli altri oggetti interessati vengono notificati automaticamente.

![[assets/p072-fig-037.jpeg|600]]

I ruoli principali sono:

- **Subject** → mantiene l'elenco degli observer e fornisce operazioni per registrarli o rimuoverli;
- **ConcreteSubject** → contiene lo stato osservato;
- **Observer** → definisce l'interfaccia di aggiornamento;
- **ConcreteObserver** → reagisce alle notifiche del Subject.

La sequenza logica è:

1. un Observer si registra presso il Subject;
2. lo stato del Subject cambia;
3. il Subject notifica gli Observer registrati;
4. ogni Observer aggiorna il proprio stato o comportamento.

Il punto importante è che il Subject non deve conoscere i dettagli concreti degli osservatori: conosce solo l'interfaccia Observer. Questo mantiene relativamente basso il coupling tra le due parti.

## Template Method

Il **Template Method** definisce nella superclasse la **struttura generale di un algoritmo**, lasciando alle sottoclassi l'implementazione di alcuni passaggi.

![[assets/p073-fig-038.png|600]]

Il pattern separa quindi:

- una parte **invariante** dell'algoritmo, definita una volta nella classe astratta;
- alcuni passi **variabili**, che vengono ridefiniti nelle sottoclassi.

I ruoli principali sono:

- **AbstractClass** → contiene il Template Method e dichiara le operazioni che possono essere ridefinite;
- **ConcreteClass** → implementa i passi specifici.

Il vantaggio è evitare di duplicare la struttura generale dell'algoritmo in più classi.

## Strategy

Lo **Strategy** serve quando esistono più algoritmi alternativi per svolgere la stessa operazione e vogliamo poterli sostituire senza modificare il client.

![[assets/p074-fig-039.png|650]]

I ruoli principali sono:

- **Strategy** → interfaccia comune degli algoritmi;
- **ConcreteStrategy** → implementazioni alternative;
- **Client** → utilizza una Strategy senza dipendere direttamente dai dettagli dell'algoritmo scelto.

L'idea è quindi **incapsulare ogni algoritmo in un oggetto separato** e renderli intercambiabili.

### Template Method vs Strategy

Entrambi permettono di variare un algoritmo, ma lo fanno in maniera diversa:

- **Template Method** → usa l'ereditarietà: la struttura dell'algoritmo è nella superclasse e alcuni passi sono ridefiniti dalle sottoclassi;
- **Strategy** → usa la composizione: l'intero comportamento variabile viene incapsulato in oggetti intercambiabili.

Con Strategy il client può cambiare comportamento scegliendo una diversa strategia; con Template Method la variazione è legata alla sottoclasse utilizzata.

# Dalla progettazione alle metriche

I Design Pattern ci danno soluzioni qualitative per organizzare meglio il progetto. A questo punto nasce però un'altra esigenza: **valutare quantitativamente la struttura ottenuta**.

Le **metriche software** servono proprio a trasformare alcune caratteristiche del progetto o del codice in valori misurabili. In questa parte del corso l'attenzione è sulle **metriche di struttura**.

Le misure vengono distinte in due grandi categorie:

- **intermodulari** → misurano relazioni e dipendenze **tra moduli**;
- **intramodulari** → misurano caratteristiche **interne al singolo modulo**.

La distinzione segue le due fasi di progetto già viste:

- progettazione preliminare → interessa soprattutto la struttura complessiva e quindi le relazioni tra moduli;
- progettazione dettagliata/implementazione → interessa maggiormente la struttura interna dei singoli moduli.

# Structure Chart

L'architettura dei moduli può essere rappresentata mediante una **Structure Chart**, cioè un grafo:

\[
S = \{N,R\}
\]

in cui:

- `N` è l'insieme dei nodi, ciascuno corrispondente a un modulo;
- `R` è l'insieme delle relazioni tra i moduli, per esempio chiamate o flussi di dati.

Questa rappresentazione permette di osservare quantitativamente alcune proprietà della modularità.

Gli attributi principali considerati sono:

- **coesione** → quanto un modulo svolge un compito ben definito;
- **coupling** → quanto i moduli dipendono gli uni dagli altri;
- **morfologia** → forma complessiva dell'architettura;
- **Information Flow** → quantità e direzione delle informazioni scambiate tra moduli.

Coesione e coupling sono già stati studiati qualitativamente. Qui ci concentriamo soprattutto su morfologia e Information Flow.

# Morfologia dell'architettura

La **morfologia** descrive la forma complessiva della Structure Chart.

Viene osservata attraverso:

- **Size** → numero di nodi e archi;
- **Depth** → distanza massima dalla radice ai livelli più profondi;
- **Width** → massimo numero di nodi presenti allo stesso livello;
- **Edge-to-Node Ratio** → rapporto tra archi e nodi, utile per valutare quanto il grafo sia densamente connesso.

In generale una struttura molto interconnessa è più difficile da comprendere e modificare. Per questo viene introdotta una misura più specifica: la **Tree Impurity**.

## Tree Impurity

La **Tree Impurity** misura quanto la Structure Chart si discosta dalla forma di un albero.

Un albero rappresenta una struttura relativamente semplice: tra i moduli esistono pochi collegamenti e non compaiono molte dipendenze incrociate.

Il valore `m(G)` varia tra `0` e `1`:

- `m(G) = 0` → il grafo è un albero;
- valori crescenti → il grafo si allontana dalla struttura ad albero;
- valori elevati → maggiore presenza di collegamenti aggiuntivi e quindi maggiore complessità strutturale.

Perciò, secondo questa misura, **un valore più basso è preferibile**.

## Internal Reuse

L'**Internal Reuse** misura il riuso dei moduli **all'interno dello stesso prodotto software**.

La misura riportata negli appunti è:

\[
r(G) = e - n + 1
\]

con:

- `e` = numero di archi;
- `n` = numero di nodi.

Il punto da ricordare non è soltanto la formula: un modulo riutilizzato internamente crea più relazioni nell'architettura e quindi aumenta anche l'interdipendenza tra le parti.

La misura ha però limiti importanti:

- non considera quante volte una stessa relazione viene effettivamente utilizzata;
- non considera la dimensione dei moduli coinvolti.

Perciò non basta da sola per descrivere la complessità dell'architettura.

# Information Flow

La morfologia osserva **la forma delle connessioni**. Non dice ancora quanto un modulo sia effettivamente coinvolto nello scambio di informazioni.

L'**Information Flow** completa quindi l'analisi misurando il flusso di informazioni tra un modulo e il resto del sistema.

I due concetti fondamentali sono:

- **fan-in** → quantità di flussi che arrivano al modulo;
- **fan-out** → quantità di flussi che partono dal modulo.

![[assets/p078-fig-040.jpeg|500]]

In modo intuitivo:

- fan-in elevato → molti elementi del sistema dipendono da informazioni che arrivano al modulo o che esso fornisce;
- fan-out elevato → il modulo interagisce o influenza molti altri elementi;
- entrambi elevati → il modulo occupa una posizione molto centrale e può diventare un punto critico dell'architettura.

La metrica di Henry-Kafura riportata negli appunti è:

\[
IF(M_i) = [fan\text{-}in(M_i) \times fan\text{-}out(M_i)]^2
\]

Un valore alto segnala un modulo fortemente connesso all'ambiente circostante e quindi potenzialmente più complesso da comprendere, modificare e testare.

# Dalla struttura dei moduli alla struttura del codice

Finora abbiamo osservato soprattutto l'architettura e le dipendenze tra moduli. Per misurare la complessità **interna** di un modulo dobbiamo invece rappresentare il suo flusso di controllo.

Da questa necessità nasce il **Flowgraph**.

# Flowgraph

Il **Flowgraph**, o grafo di flusso, rappresenta il flusso di controllo di un programma mediante un grafo diretto:

\[
FG = \{N,E\}
\]

in cui:

- i **nodi** rappresentano blocchi o istruzioni del programma;
- gli **archi** rappresentano i possibili passaggi del controllo da un nodo all'altro.

![[assets/p079-fig-041.png|600]]

Il flowgraph permette di rappresentare strutture come:

- sequenze;
- selezioni;
- iterazioni;
- chiamate a procedure o funzioni;
- ricorsione;
- concorrenza.

I nodi che introducono una scelta nel flusso sono particolarmente importanti perché generano percorsi alternativi.

Una volta rappresentato il programma come grafo, possiamo finalmente quantificare **quanti percorsi indipendenti** contiene. È questo il problema affrontato dalla complessità ciclomatica.

# Complessità ciclomatica

La **Cyclomatic Complexity di McCabe** misura la complessità del flusso di controllo di un programma attraverso il suo flowgraph.

Per un flowgraph con:

- `e` archi;
- `n` nodi;

la formula è:

\[
v(F) = e - n + 2
\]

Un modo equivalente, nelle condizioni considerate negli appunti, è:

\[
v(F) = 1 + d
\]

in cui `d` è il numero di **nodi predicato**, cioè punti decisionali che producono più possibili flussi in uscita.

La complessità ciclomatica rappresenta il **numero di percorsi linearmente indipendenti** del flowgraph.

Quindi:

- valore basso → pochi percorsi alternativi;
- valore alto → più decisioni e percorsi;
- più percorsi → maggiore difficoltà di comprensione, manutenzione e testing.

Questo collegamento sarà importante nella parte successiva del corso: nel **Path Testing**, infatti, il numero di percorsi indipendenti da considerare è collegato proprio alla complessità ciclomatica.

## Limiti della metrica

La complessità ciclomatica fornisce una misura quantitativa utile, ma non esaurisce il concetto di complessità software:

- è particolarmente adatta al livello del singolo componente;
- programmi con lo stesso valore possono richiedere effort molto diverso;
- per calcolarla bisogna conoscere abbastanza bene il design dettagliato o il codice.

Il suo valore principale è quindi fornire una misura oggettiva della **complessità del controllo**, non una misura assoluta di tutta la complessità del software.
