# Resoconto Corso: Linguaggi e Metodologie di Programmazione (Linguaggi di Programmazione)

- **Anno:** 2° Anno Triennale
- **Area:** Metodologie di Programmazione, Ingegneria del Software e Linguaggi di Programmazione (INF/01)
- **Riferimento Docente/Materiali:** Materiali didattici, compendi per orale Java, guide ed esercizi SWI-Prolog

---

## Obiettivi del corso in sintesi

Il corso esplora in modo approfondito i paradigmi di programmazione moderni, focalizzandosi sul **Paradigma Orientato agli Oggetti (OOP)** attraverso il linguaggio **Java** e sul **Paradigma Dichiarativo / Logico** attraverso il linguaggio **Prolog**. L'insegnamento mira a far comprendere le basi metodologiche, semantiche ed architetturali che sottendono l'esecuzione del codice: dalla Java Virtual Machine (JVM), gestione della memoria, tipizzazione forte, programmazione generica e reflection in Java, fino all'unificazione simbolica, alberi di risoluzione SLD, controllo del backtracking tramite cut (`!`) e grammatiche a clausole definite (DCG) in Prolog.

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### PARTE I: PROGRAMMAZIONE AD OGGETTI E LINGUAGGIO JAVA

### 1. Principi Fondamentali della Programmazione ad Oggetti (OOP)
- **Evoluzione dei Paradigmi e Teorema di Böhm-Jacopini:**
  - Teorema di Böhm-Jacopini: sufficienza delle sole tre strutture di controllo (sequenza, selezione condizionale, iterazione) per implementare qualsiasi algoritmo calcolabile; superamento dello spaghetti code e condanna dell'istruzione `goto` (parola chiave riservata ma inutilizzabile in Java).
  - Passaggio dalla programmazione procedurale alla scomposizione in oggetti autonomi dotati di stato e comportamento.
- **I Quattro Pilastri della OOP:**
  1. **Incapsulamento e Information Hiding:**
     - Raggruppamento di dati e operazioni all'interno della medesima unità logica (classe).
     - Occultamento dei dettagli implementativi interni e protezione dello stato dell'oggetto.
     - Modificatori di visibilità: `private` (solo classe stessa), default/package-private (visibile nel medesimo package), `protected` (visibile nel package e nelle sottoclassi anche esterne), `public` (accesso universale).
     - Metodi di accesso (*getters*) e di mutazione (*setters*).
  2. **Astrazione:**
     - Separazione concettuale tra *cosa* un componente fa e *come* lo realizza internamente.
     - Definizione di modelli semplificati tramite classi astratte e interfacce per ridurre la complessità computazionale e cognitiva.
  3. **Ereditarietà:**
     - Riutilizzo del codice e modellazione di gerarchie concettuali "is-a" tramite estensione (`extends`).
     - In Java l'ereditarietà di classe è rigorosamente singola, con radice universale nella classe `java.lang.Object`.
  4. **Polimorfismo:**
     - Capacità di trattare istanze di classi differenti in modo uniforme attraverso un tipo comune.
     - **Polimorfismo statico (a tempo di compilazione):** *Overloading* (sovraccarico di metodi con medesimo nome ma differente segnatura per numero o tipo di parametri).
     - **Polimorfismo dinamico (a runtime):** *Overriding* (riscrittura del comportamento di un metodo ereditato dalla superclasse) implementato tramite *dynamic dispatch* / *late binding*.

### 2. Architettura della Java Virtual Machine (JVM) e Modello di Memoria
- **Ciclo di Vita del Codice Java:**
  - Codice sorgente (`.java`) compilato dal compilatore `javac` in bytecode intermedio indipendente dall'hardware (`.class`).
  - Esecuzione da parte della JVM: caricamento tramite ClassLoader, verifica della sicurezza del bytecode, interpretazione in tempo reale e compilazione dinamica JIT (Just-In-Time) in linguaggio macchina nativo.
- **Gestione della Memoria a Runtime:**
  - **Call Stack (Stack delle chiamate):** allocazione dei frame di esecuzione per ogni metodo invocato; memorizzazione delle variabili locali e dei riferimenti a oggetti; gestione LIFO automatica e veloce.
  - **Heap Memory:** area di memorizzazione dinamica condivisa in cui risiedono fisicamente tutti gli oggetti e gli array istanziati tramite operatore `new`.
- **Garbage Collection:**
  - Monitoraggio automatico del ciclo di vita degli oggetti nell'Heap.
  - Individuazione degli oggetti non più raggiungibili (privi di catene di riferimenti attivi a partire dal *root set* dello stack) e rilascio automatico della memoria senza disallocazione manuale.

### 3. Struttura del Linguaggio Java e Meccanismi ad Oggetti
- **Sistema dei Tipi:**
  - Tipi primitivi memorizzati per valore (`byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`).
  - Tipi di riferimento (*reference types*) che puntano a locazioni nell'heap (classi, interfacce, array).
  - Tipi wrapper (`Integer`, `Double`, ecc.) e meccanismi di *autoboxing* e *unboxing*.
- **Classe `java.lang.String`:**
  - Immutabilità delle stringhe e gestione dello *String Pool* in memoria.
  - Distinzione fondamentale tra confronto per riferimento (`==`) e confronto per contenuto semantico (`.equals()`).
  - Metodi fondamentali: `length()`, `charAt()`, `substring()`, `split()`, `indexOf()`, ecc.
- **Metodi Fondamentali della Classe `Object`:**
  - `toString()`: rappresentazione testuale dell'oggetto.
  - `equals(Object obj)` e contratto con `hashCode()` (oggetti uguali secondo `equals` devono produrre il medesimo hash code).
- **Elementi di Sintassi Avanzata:**
  - Parola chiave `static`: campi e metodi appartenenti alla classe e non alle singole istanze; caricamento unico all'inizializzazione della classe.
  - Parola chiave `final`: costanti non modificabili, metodi non sovrascrivibili e classi non estendibili.
  - Parola chiave `this`: riferimento all'istanza corrente, risoluzione dello *shadowing* di variabili locali su campi d'istanza e concatenazione di costruttori (`this(...)`).
  - Parola chiave `super`: invocazione di metodi della superclasse e richiamo del costruttore genitore (`super(...)`).
  - Parametri a lunghezza variabile (Varargs: `Type...`).
- **Classi Astratte e Interfacce:**
  - Classi astratte (`abstract class`): contengono sia metodi concreti che metodi astratti (privi di corpo, terminati con `;`); non possono essere istanziate direttamente.
  - Interfacce (`interface`): contratti formali puri composti da dichiarazioni di metodi pubblici; supporto all'ereditarietà multipla di tipo (`implements A, B`); introduzione di metodi `default` e `static` in Java moderno.
- **Classi Annidate (Nested Classes):**
  - Inner classes (classi interne non statiche con legame implicito all'istanza esterna).
  - Static nested classes (classi statiche annidate che non accedono ai membri d'istanza della classe esterna).
  - Local classes (dichiarate all'interno del corpo di un metodo).
  - Anonymous classes (classi anonime create al volo per implementazioni ad-hoc di interfacce).

### 4. Robustezza del Software, Generics, Collezioni e Reflection
- **Gestione delle Eccezioni:**
  - Gerarchia: classe base `Throwable`, suddivisa in `Error` (condizioni critiche irreversibili di sistema) e `Exception` (anomalie applicative gestibili).
  - **Checked Exceptions:** sottoclassi di `Exception` (escluse quelle runtime) controllate dal compilatore; obbligo di gestione tramite blocco `try-catch` o propagazione tramite clausola `throws`.
  - **Unchecked Exceptions:** sottoclassi di `RuntimeException` (es. `NullPointerException`, `IndexOutOfBoundsException`, `ArithmeticException`), legate a errori logici di programmazione.
  - Blocco `try-catch-finally` e rilascio garantito delle risorse; lancio manuale con `throw`.
- **Programmazione Generica (Generics):**
  - Parametrizzazione di classi, interfacce e metodi rispetto ai tipi (`ClassName<T>`); garanzia di *type-safety* a tempo di compilazione ed eliminazione dei cast espliciti.
  - Bounded type parameters (`<T extends Number>`).
  - Wildcards (`?`, `? extends T` per covarianza, `? super T` per controvarianza - principio PECS).
  - **Type Erasure:** meccanismo di compatibilità retroattiva per cui i parametri di tipo vengono rimossi e sostituiti con i loro bound (o `Object`) durante la compilazione nel bytecode.
  - Notazione con operatore Diamond (`<>`).
- **Java Collections Framework:**
  - Architettura delle interfacce: radice `Collection<E>`.
    - `List<E>`: collezioni ordinate con duplicati (`ArrayList` ad accesso indicizzato rapido, `LinkedList` a nodi concatenati).
    - `Set<E>`: collezioni di elementi unici (`HashSet` basato su tabella hash $O(1)$, `TreeSet` basato su albero rosso-nero ordinato $O(\log n)$).
    - `Queue<E>` / `Deque<E>`: strutture FIFO e a doppia estremità (`ArrayDeque`, `LinkedList`).
    - `Map<K, V>`: associazione chiave-valore non facente parte della gerarchia Collection (`HashMap`, `TreeMap`, `LinkedHashMap`).
  - Meccanismi di iterazione: interfaccia `Iterable<E>`, `Iterator<E>` con metodi `hasNext()`, `next()`, `remove()`, e ciclo `for-each`.
- **Annotazioni e Reflection:**
  - Annotazioni standard: `@Override`, `@Deprecated`, `@SuppressWarnings`.
  - Meta-annotazioni: `@Retention` (politiche di visibilità: `SOURCE`, `CLASS`, `RUNTIME`), `@Target` (ambiti di applicazione: classi, metodi, campi), `@Repeatable`.
  - Reflection API (`java.lang.Class`, `java.lang.reflect`): ispezione a runtime della struttura di classi e oggetti, lettura di annotazioni, invocazione dinamica di metodi e istanziazione riflessiva.
- **Design Patterns di Base:**
  - Pattern Creazionale **Factory Method**: incapsulamento e disaccoppiamento della logica di istanziazione degli oggetti tramite interfaccia comune e metodo statico generatore.

---

### PARTE II: PROGRAMMAZIONE LOGICA E LINGUAGGIO PROLOG

### 5. Fondamenti del Paradigma Dichiarativo e Logica di Horn
- **Principi della Programmazione Logica:**
  - Separazione tra logica del dominio e strategia di controllo (*Algorithm = Logic + Control* di Kowalski).
  - Il programmatore definisce le relazioni e i fatti veri nel dominio; il motore di inferenza si occupa di trovare le dimostrazioni e le soluzioni soddisfacenti.
- **Sintassi e Tipi di Termini in Prolog:**
  - **Termini Costanti:** atomi (nomi simbolici che iniziano con lettera minuscola, es. `mario`, `sole`) e numeri (interi e floating-point).
  - **Variabili:** iniziano con lettera maiuscola o carattere underscore (`_`); la variabile singola `_` rappresenta la variabile anonima (don't care).
  - **Termini Composti (Strutture):** funtore seguito da argomenti racchiusi tra parentesi `funtore(arg1, ..., argN)`; il numero di argomenti definisce l'arità del termine.
- **Clausole di Horn Definite:**
  - **Fatti:** asserzioni incondizionate di verità nel dominio (es. `genitore(tom, bob).`).
  - **Regole:** proposizioni condizionali con testa e corpo: `Testa :- Corpo.` (la testa è vera se tutti i predicati nel corpo separati da virgola `,` sono contemporaneamente veri).
  - **Query / Goal:** domande poste alla base di conoscenza tramite l'interprete (`?- predicato(X).`).

### 6. Meccanismi di Esecuzione: Unificazione, Risoluzione SLD e Backtracking
- **Algoritmo di Unificazione:**
  - Processo formale che confronta due termini e calcola, se esiste, il loro unificatore più generale (MGU - Most General Unifier) legando opportunamente le variabili libere.
  - Mancanza di default dell'*occurs check* per ragioni di efficienza (gestione termini ciclici).
- **Risoluzione SLD e Albero di Derivazione:**
  - Risoluzione lineare per clausole definite guidata dalla query.
  - Ricerca esaustiva nello spazio delle soluzioni tramite esplorazione in profondità (DFS) dell'albero di computazione logico.
- **Backtracking:**
  - Meccanismo automatico: quando un ramo di risoluzione fallisce, il motore Prolog esegue un'operazione di *redo*, risale all'ultimo punto di scelta (*choice point*), annulla i legami di variabile effettuati e prova la clausola successiva.
- **Controllo del Backtracking ed Extralogica:**
  - **Operatore Cut (`!`):** predicato speciale che ha sempre successo e "taglia" tutti i rami di scelta alternativi aperti dall'inizio della valutazione della regola corrente.
  - **Negation as Failure (NAF):** implementazione della negazione tramite la combinazione di taglio e fallimento (`not(P) :- P, !, fail. not(_).`).
  - Predicato `fail`: forza il fallimento immediato per scatenare il backtracking.

### 7. Strutture Dati, Manipolazione Liste e Operazioni di Secondo Ordine
- **Gestione delle Liste in Prolog:**
  - Lista vuota `[]` e costruttore testa-coda `[Testa | Coda]`.
  - Predicati ricorsivi fondamentali: appartenenza (`member/2`), concatenazione (`append/3`), lunghezza (`length/2`), inversione (`reverse/2`), ricerca ed estrazione (`select/3`, ricerca per indice).
  - Conversione da e verso stringhe di codici ASCII (`string_codes/2`).
- **Base di Conoscenza Dinamica e Metaprogrammazione:**
  - Modifica a runtime di regole e fatti memorizzati: predicati `asserta/1` (inserimento in testa), `assertz/1` (inserimento in coda), `retract/1` e `retractall/1` (rimozione).
  - Operatore `univ` (`=..`): scomposizione e composizione dinamica di termini in liste `Termine =.. [Funtore | Argomenti]`.
  - Definizione di nuovi operatori personalizzati con priorità e associatività (`op(Priorita, Tipo, Nome)`).
- **Predicati di Raccolta e Secondo Ordine (Raggruppamenti):**
  - **`findall(Template, Goal, Lista)`:** raccoglie tutte le istanziazioni del Template generate dal soddisfacimento del Goal in una lista (mantiene ordine e duplicati, non fallisce mai producendo `[]`).
  - **`bagof(Template, Goal, Lista)`:** come findall, ma raggruppa le soluzioni per diverse istanziazioni delle variabili libere presenti nel Goal.
  - **`setof(Template, Goal, Lista)`:** come bagof, ma restituisce una lista rigorosamente ordinata e priva di duplicati.

### 8. Definite Clause Grammars (DCG) e Algoritmi su Grafi
- **Grammatiche a Clausole Definite (DCG):**
  - Notazione con operatore a freccia `-->` per definire grammatiche formali libere dal contesto direttamente eseguibili.
  - Traduzione trasparente della notazione DCG in clausole Prolog ordinarie dotate di due argomenti aggiuntivi che rappresentano le liste delle differenze (*difference lists*).
  - Applicazioni studiate: parsing sintattico di frasi in linguaggio naturale (es. pattern soggetto-verbo-oggetto in italiano), estrazione di relazioni e asserzione automatica di fatti logici.
- **Risoluzione di Problemi su Grafi in Prolog:**
  - Rappresentazione degli archi (`edge/2`).
  - Ricerca di cammini (`path/2`).
  - Implementazione di visite DFS (`solve/2`, `solve_no_cycles/3` con accumulatore dei nodi visitati per prevenire loop infiniti su grafi ciclici).
  - Implementazione di visite in ampiezza (BFS) tramite gestione esplicita della coda di percorsi.

---

## Linguaggi, Strumenti e Tecnologie

- **Linguaggi di Programmazione:**
  - **Java:** versione 8+ (sintassi OOP, generici, collection framework, reflection, annotazioni).
  - **Prolog:** sintassi ISO standard ed estensioni SWI-Prolog.
- **Strumenti di Sviluppo ed Interpreti:**
  - JDK (Java Development Kit), IDE Java (IntelliJ IDEA, Eclipse, VS Code).
  - Interprete SWI-Prolog (`swipl`), console interattiva, strumenti di trace (`trace/0`, `spy/1`).

---

## Tipologia Esercizi e Prove d'Esame

La prova d'esame valuta le competenze teoriche e pratiche su entrambi i linguaggi del corso:
1. **Prova Pratica di Programmazione Java:**
   - Progettazione e codifica di una gerarchia di classi completa con interfacce, costruttori concatenati, metodi polimorfi e uso di classi astratte.
   - Utilizzo del Java Collections Framework (`List`, `Set`, `Map`) con generics e wildcards vincolate.
   - Gestione delle eccezioni tramite gerarchie di eccezioni personalizzate e blocchi di recupero sicuri.
   - Implementazione di design pattern classici (in particolare il Factory Method per la creazione polimorfa di oggetti disaccoppiati).
2. **Prova Pratica di Programmazione Prolog:**
   - **Manipolazione di liste e codifica/decodifica messaggi:** scrittura di predicati ausiliari per manipolare stringhe e codici numerici (es. inversione delle parole, scambio del primo e ultimo carattere di ogni termine, inversione globale con predicati worker).
   - **Algoritmi su grafi:** formulazione di predicati per la ricerca di cammini semplici, rilevamento di cicli e visite di connettività.
   - **Regole DCG ed estrazione di conoscenza:** parsing di costrutti frasali in linguaggio naturale (es. "X si nutre di Y", "il cibo di X è la Y") e asserzione dinamica di fatti nella base di conoscenza con `assertz`.
3. **Colloquio Orale Teorico:**
   - **Domande su Java:** architettura della JVM, ciclo del bytecode, funzionamento della Garbage Collection, principio di sostituzione di Liskov, contratti `equals`/`hashCode`, type erasure nei Generics, reflection e visibilità delle annotazioni con `@Retention`.
   - **Domande su Prolog:** modello formale dell'unificazione, albero di ricerca SLD, semantica dell'operatore di taglio `!` e negazione per fallimento (NAF), differenze operative tra `findall`, `bagof` e `setof`, e traduzione interna delle regole DCG.
