# Resoconto Corso: Programmazione 1 (Fondamenti di Programmazione)

- **Anno:** 1° Anno Triennale
- **Area:** Informatica di Base, Algoritmi, Strutture Dati Elementari e Linguaggi di Programmazione
- **Riferimenti Didattici:** Appunti delle lezioni (Moduli Python Cap 1–8, Moduli C Cap 9–15), Prove d'Esame e Pre-test

---

## Obiettivi del Corso in Sintesi
Il corso fornisce le competenze fondamentali per la progettazione algoritmica, lo sviluppo software strutturato e la comprensione dei meccanismi di allocazione e gestione della memoria. Il percorso didattico si articola su due linguaggi complementari: **Python**, utilizzato per apprendere i costrutti del controllo di flusso ad alto livello, il paradigma divide-et-impera, la ricorsione, l'analisi di complessità computazionale asintotica e la gestione di collezioni dati native; e il **C**, impiegato per acquisire padronanza a basso livello su tipi di dato statici, architettura dei puntatori, ciclo di vita della memoria dinamica (heap e stack) e implementazione manuale di strutture dati fondamentali quali liste collegate e tabelle hash.

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### PARTE 1: Algoritmica, Complessità e Programmazione ad Alto Livello in Python

#### Modulo 1: Fondamenti del Linguaggio, Tipi Primitivi e Flusso di Esecuzione
- **Modello di Esecuzione di Python:** Linguaggio interpretato, tipizzazione dinamica e forte, ciclo read-eval-print (REPL).
- **Tipi di Dato Primitivi:** Numeri interi (`int`), a virgola mobile (`float`), booleani (`bool`), stringhe di testo (`str`).
- **Input / Output Standard:** Acquisizione dell'input da tastiera tramite `input()`, conversione esplicita di tipo (casting), formattazione con `print()`.
- **Strutture di Controllo:** Costrutti decisionali `if-elif-else`, costrutto iterativo determinato `for` supportato dalla funzione `range()`, costrutto iterativo indefinito `while`, istruzioni di salto `break` e `continue`.
- **Introduzione alla Complessità Computazionale:** Misurazione del costo temporale e spaziale in funzione della dimensione dell'input ($n$); notazione asintotica Big-O ($O(1), O(n), O(n^2)$).

#### Modulo 2: Sequenze, Metodi delle Stringhe e Funzioni
- **Manipolazione Avanzata delle Stringhe:** Immutabilità delle sequenze di caratteri, indicizzazione posizionale e indicizzazione negativa, slicing con passo (`[start:stop:step]`).
- **Metodi delle Stringhe:** Suddivisione e unione (`split`, `join`), pulizia (`strip`), ricerca e sostituzione (`find`, `replace`, `count`), trasformazioni di case (`upper`, `lower`).
- **Modularità con le Funzioni:**
  - Sintassi di definizione con `def` e passaggio dei parametri.
  - Parametri posizionali, parametri opzionali con valore di default, argomenti per parola chiave (keyword arguments).
  - Restituzione dei valori mediante l'istruzione `return` (inclusa la restituzione di tuple multiple).
  - Scope e visibilità delle variabili: ambito locale, ambito globale, utilizzo della direttiva `global`.

#### Modulo 3: Modello di Memoria a Oggetti, Mutabilità e Aliasing
- **Rappresentazione degli Oggetti in Memoria:** Variabili come riferimenti (puntatori opachi) a locazioni nell'heap.
- **Tipi Mutabili vs Tipi Immutabili:**
  - Tipi immutabili: numeri, stringhe, tuple (ogni modifica crea un nuovo oggetto).
  - Tipi mutabili: liste, dizionari, insiemi (modifiche in-place sullo stato interno).
- **Il Fenomeno dell'Aliasing:** Condivisione dello stesso riferimento in memoria da parte di più variabili e insorgenza di effetti collaterali (side effects).
- **Identità ed Eguaglianza:** Operatore di uguaglianza per valore (`==`) vs operatore di identità fisica (`is`); ispezione dell'indirizzo con `id()` e verifica del tipo con `type()`.
- **Tecniche di Copia:** Copie superficiali (**Shallow Copy** tramite slicing `[:]` o `list.copy()`) vs copie ricorsive complete (**Deep Copy** tramite modulo di libreria `copy.deepcopy()`).

#### Modulo 4: Algoritmi di Ordinamento Elementari e Iterabili Avanzati
- **Algoritmo Bubble Sort:** Principio del confronto ed eventuale scambio tra elementi adiacenti; iterazioni ripetute; ottimizzazione con flag booleano per arresto anticipato in caso di vettore già ordinato; analisi analitica del costo quadratico $O(n^2)$ nel caso peggiore e medio.
- **Funzioni Built-in per Iterabili:**
  - Funzione `zip()` per l'iterazione sincronizzata in parallelo su sequenze distinte.
  - Funzione `enumerate()` per scorrere sequenze ottenendo simultaneamente indice progressivo e valore.

#### Modulo 5: Ordinamento Avanzato, Programmazione Funzionale e Ricorsione
- **Algoritmi di Ordinamento Integrati:** Confronto tra il metodo in-place `list.sort()` e la funzione che restituisce una nuova lista ordinata `sorted()`.
- **Funzioni Anonime e Funzioni di Ordine Superiore:** Definizione di espressioni compatte `lambda`; personalizzazione dei criteri di ordinamento mediante il parametro `key` per ordinamenti multi-criterio.
- **Paradigma della Ricorsione:**
  - Principi di induzione applicati alla programmazione: identificazione rigorosa del caso base di arresto e formulazione del passo ricorsivo.
  - Meccanismo di call stack: allocazione sequenziale dei frame di attivazione, rientro dalla ricorsione e rischio di eccedenza della profondità massima (`RecursionError`).

#### Modulo 6: Paradigma Divide-et-Impera e Algoritmi su Sequenze
- **Algoritmo Merge Sort:**
  - Strategia divide-et-impera: suddivisione ricorsiva della sequenza a metà fino al caso banale di lunghezza unitaria.
  - Procedura di fusione (merge) ordinata con costo lineare $O(n)$.
  - Dimostrazione della complessità temporale ottima e stabile $O(n \log n)$ in tutti i casi; analisi del costo spaziale ausiliario $O(n)$.
- **Algoritmi di Ricerca:**
  - **Ricerca Lineare:** Ispezione esaustiva di sequenze non ordinate con costo $O(n)$.
  - **Ricerca Binaria (Dicotomica):** Algoritmo su collezioni ordinate con dimezzamento dello spazio di ricerca ad ogni iterazione, con costo logaritmico $O(\log n)$.

#### Modulo 7: Strutture Dati Associative, Insiemi, Codifica e I/O su File
- **Dizionari (`dict`):**
  - Struttura associativa basata su tabelle hash; vincolo di univocità ed immutabilità/hashability per le chiavi.
  - Metodi operativi: `keys()`, `values()`, `items()`, `get()`, `update()`, `pop()`.
  - Analisi delle prestazioni: tempo medio di accesso, inserimento ed eliminazione $O(1)$; degradazione teorica a $O(n)$ nel caso peggiore con collisioni sistematiche.
- **Insiemi (`set`):** Collezioni non ordinate di elementi unici; operazioni matematiche di unione, intersezione, differenza e verifica di appartenenza in tempo medio $O(1)$.
- **Codifica dei Caratteri:** Funzioni di conversione `ord()` (da carattere a codice numerico ASCII/Unicode) e `chr()` (da valore intero al carattere corrispondente).
- **Persistenza dei Dati e File I/O:**
  - Apertura dei file mediante funzione `open()` e costrutto contestuale sicuro `with` (gestione automatica del rilascio del descrittore).
  - Modalità di accesso: lettura (`'r'`), scrittura con troncamento (`'w'`), append (`'a'`).
  - Metodi di lettura: `read()`, `readline()`, `readlines()`; scrittura con `write()`.

#### Modulo 8: Gestione delle Eccezioni e Robustezza del Codice
- **Classificazione degli Errori:** Errori sintattici, semantici e runtime exceptions.
- **Costrutto di Gestione:** Blocchi protetti `try`, clausole di cattura specifica `except` (`ValueError`, `IndexError`, `KeyError`, `ZeroDivisionError`, `FileNotFoundError`), blocco `else` per esecuzione senza anomalie e blocco `finally` per operazioni di cleanup obbligatorie.
- **Sollevamento Eccezioni:** Uso della parola chiave `raise` per validazione di precondizioni.

---

### PARTE 2: Programmazione di Basso Livello e Strutture Dati in Linguaggio C

#### Modulo 9: Architettura del C, Compilazione e Differenze Strutturali da Python
- **Confronto Fondamentale C vs Python:** Linguaggio compilato ad alte prestazioni e tipizzazione statica contro linguaggio interpretato ad alto livello e tipizzazione dinamica.
- **Fasi del Ciclo di Compilazione:**
  - Preprocessore: direttive `#include`, macro `#define`.
  - Compilatore (es. `gcc`): generazione di codice oggetto assembly binario (`.o`).
  - Linker: risoluzione dei simboli esterni e creazione dell'eseguibile finale.
- **Tipi di Dato Primitivi e Dimensioni:** `char`, `int`, `float`, `double`, qualificatori `short`, `long`, `signed`, `unsigned`.
- **Operatori Aritmetici, Logici e Bitwise:** Operazioni a livello di singoli bit (`&`, `|`, `^`, `~`, `<<`, `>>`).
- **Input / Output Formattato:**
  - Utilizzo di `printf` e `scanf` con specificatori di formato (`%d`, `%f`, `%c`, `%s`, `%p`).
  - Elaborazione di stringhe in memoria con `sscanf` (conteggio delle letture avvenute con successo) e `sprintf`.

#### Modulo 10: Modello di Memoria, Puntatori e Vettori Statici
- **Organizzazione della Memoria di un Processo C:** Segmento Text (istruzioni macchina), Segmento Data/BSS (variabili globali e statiche), Stack (record di attivazione delle funzioni, variabili locali) e Heap (memoria dinamica gestita dal programmatore).
- **Teoria e Sintassi dei Puntatori:**
  - Definizione di variabile puntatore (`tipo *p`).
  - Operatore di indirizzo (`&`) e operatore di dereferenziazione/indirezione (`*`).
  - Il puntatore nullo (`NULL`) e controllo di validità.
- **Aritmetica dei Puntatori:**
  - Incremento e decremento (`p++`, `p--`): avanzamento in memoria proporzionale alla dimensione del tipo puntato (`sizeof(tipo)`).
  - Confronto tra indirizzi (`p1 < p2`), calcolo della distanza tra puntatori.
- **Array Monodimensionali:** Allocazione contigua sullo stack; decadimento dell'array a puntatore al primo elemento; equivalenza algebrica tra `a[i]` e `*(a + i)`.

#### Modulo 11: Funzioni, Passaggio dei Parametri, Strutture (`struct`) e `typedef`
- **Progettazione Modulare in C:** Dichiarazione dei prototipi negli header e implementazione delle funzioni.
- **Meccanismi di Passaggio dei Parametri:**
  - Passaggio per valore (copia locale del parametro).
  - Simulazione del passaggio per riferimento tramite il passaggio dell'indirizzo (puntatore) della variabile da modificare.
- **Tipi di Dato Composti (`struct`):**
  - Definizione di strutture eterogenee.
  - Accesso ai campi tramite operatore punto (`.`) su variabili dirette.
  - Accesso ai campi tramite operatore freccia (`->`) su puntatori a struttura (`p->campo` $\equiv$ `(*p).campo`).
- **Definizione di Tipi Utente con `typedef`:** Creazione di alias per strutture e tipi complessi.

#### Modulo 12: Gestione Dinamica della Memoria
- **Allocazione nell'Heap con la Libreria `<stdlib.h>`:**
  - Funzione `malloc(size)`: allocazione di un blocco contiguo di memoria non inizializzata; conversione esplicita o implicita del puntatore `void*`.
  - Funzione `calloc(n, size)`: allocazione e azzeramento di tutti i byte.
  - Operatore `sizeof`: calcolo deterministico a compile-time delle dimensioni dei tipi in byte.
- **Rilascio della Memoria:**
  - Funzione `free(ptr)`: restituzione del blocco all'allocatore di sistema.
- **Patologie della Gestione Manuale della Memoria:**
  - **Memory Leak:** Memoria allocata e non rilasciata, con conseguente esaurimento delle risorse.
  - **Dangling Pointer:** Utilizzo di puntatori a celle di memoria già deallocate.
  - **Double Free:** Errore per doppia liberazione del medesimo puntatore.
  - **Segmentation Fault e Buffer Overflow:** Accesso a zone di memoria non valide o fuori dai limiti allocati.

#### Modulo 13: Rilocazione Dinamica e Manipolazione delle Stringhe in C
- **Ridimensionamento Dinamico con `realloc`:** Estensione o contrazione di un blocco heap preesistente; gestione dell'eventuale copia trasparente in una nuova area di memoria e liberazione automatica del blocco vecchio.
- **Rappresentazione delle Stringhe nel C:** Vettori di caratteri terminati dal byte nullo speciale `'\0'`.
- **Libreria Standard `<string.h>`:**
  - `strlen`: calcolo della lunghezza effettiva della stringa escluso il terminatore nullo.
  - `strcpy` e `strncpy`: copia di sequenze di caratteri con attenzione al terminatore.
  - `strcmp` e `strncmp`: confronto lessicografico di stringhe.
  - `strcat`: concatenazione di stringhe.

#### Modulo 14: Strutture Dati Dinamiche: Liste Concatenate Semplici e Doppie
- **Definizione Ricorsiva del Nodo:** Struttura contenente il campo dati informativo e uno o più puntatori autoreferenziali a nodi omologhi (`succ`, `prec`).
- **Liste Concatenate Semplici e Doppiamente Collegate:**
  - Inizializzazione di una lista vuota (`NULL`).
  - **Inserimento in testa (`insert0`):** Allocazione del nodo tramite `malloc`, assegnamento del valore, collegamento del puntatore al vecchio inizio lista, aggiornamento del puntatore di testa; costo temporale $O(1)$.
  - **Inserimento in posizione intermedia/coda (`insert1`):** Navigazione della lista e corretta riconfigurazione bidirezionale dei puntatori adiacenti (`succ` e `prec`).
  - **Cancellazione di un nodo (`elimina0`):** Rimozione del nodo di testa o intermedio, riallineamento dei riferimenti e deallocazione della memoria con `free()`.
  - **Ricerca ed Attraversamento (`lista_cerca`, `mostrastruct`):** Scorrimento sequenziale mediante ciclo `while` o `for` con costo proporzionale alla posizione $O(p)$ o alla lunghezza $O(n)$.
  - Deallocazione iterativa o ricorsiva completa di tutti i nodi di una lista per prevenire leak.

#### Modulo 15: Tabelle Hash e Implementazione di Dizionari in C
- **Architettura del Dizionario in C:**
  - Struttura coppia chiave-valore (`d_item`: chiave stringa `char *k`, valore numerico `float v`).
  - Struttura nodo della lista di collisione (`struct nodo`).
  - Struttura contenitore `dict`: array dinamico di puntatori a liste (`nodo **a`), dimensione del vettore di hash $m$ e contatore totale elementi inseriti $n$.
- **Funzione Hash e Risoluzione delle Collisioni:**
  - Calcolo dell'indice bucket tramite scansione dei caratteri della chiave stringa e operazione modulo $m$ (`h(key, m)`).
  - Strategia di risoluzione delle collisioni mediante **Separate Chaining** (liste concatenate separate per ogni indice dell'array).
- **Operazioni Primitive del Tipo di Dato Astratto Dizionario:**
  - `dict_init(m)`: allocazione dinamica dell'array di liste e azzeramento dei puntatori di testa a `NULL`.
  - `dict_update(d, e)`: calcolo dell'indice hash, ricerca della chiave nella lista associata (`lista_cerca_k`); se presente aggiornamento del valore, se assente inserimento in testa alla lista e incremento del contatore $n$.
  - `dict_mostra(d)`: visualizzazione del contenuto di tutti i bucket e delle relative liste di collisione.
  - Valutazione delle prestazioni: tempo medio $O(1)$ sotto ipotesi di distribuzione uniforme delle chiavi; degradazione a $O(n)$ in presenza di cluster di collisioni o fattore di carico non bilanciato.

---

## Linguaggi, Strumenti e Tecnologie
- **Linguaggi di Programmazione:**
  - **Python 3:** Interprete standard CPython, utilizzo di strutture native e costrutti funzionali.
  - **Linguaggio C (Standard C99):** Compilazione nativa con `gcc`, header standard (`<stdio.h>`, `<stdlib.h>`, `<string.h>`).
- **Strumenti di Sviluppo e Debugging:**
  - Compilatore `gcc` (flag di ottimizzazione e warning: `-Wall -Wextra -pedantic`).
  - Debugger `GDB` e tool di analisi della memoria `Valgrind` per individuazione di invalid read/write e memory leak.

---

## Tipologia Esercizi e Prove d'Esame
1. **Quesiti a Scelta Multipla con Frammenti di Codice (Pre-test d'Esame):**
   - **Analisi di Complessità Temporale e Spaziale:** Stima del costo asintotico nel caso medio e peggiore per operazioni su dizionari / hash table ($O(1)$ vs $O(n)$), algoritmi di fusione di sequenze ordinate ($k$ liste di dimensione $n/k$), inserimento in liste collegate vs array dinamici ($O(p)$ vs $O(n)$).
   - **Tracing dell'Aritmetica dei Puntatori in C:** Predizione del comportamento di puntatori di tipo differente (`int*` vs `char*`) incrementati in memoria, confronto tra indirizzi (`c < p`).
   - **Gestione delle Stringhe e Terminatori:** Valutazione della lunghezza finale di stringhe C modificate parzialmente senza terminatore nullo `\0`.
   - **Analisi dell'I/O Formattato:** Comprensione del valore di ritorno di funzioni quali `sscanf` (numero di campi letti e assegnati con successo).
   - **Tracing di Codice con Dizionari e Liste Python:** Calcolo del valore finale di contatori ed analisi dello spazio occupato da liste memorizzate per riferimento in dizionari senza clonazione.
2. **Esercizi di Programmazione in Python:**
   - Scrittura di funzioni ricorsive su liste o alberi con formulazione esplicita del caso base.
   - Elaborazione di collezioni e dizionari: aggregazioni di dati, conteggio frequenze di caratteri o parole, ordinamenti composti tramite `sorted` e lambda key.
   - Parsing e manipolazione di file di testo mediante blocchi `with open(...)` e gestione delle eccezioni con `try-except`.
3. **Esercizi di Programmazione in C:**
   - Progettazione e manipolazione di liste collegate (semplici o doppie): scrittura di funzioni di inserimento ordinato, eliminazione di elementi con specifica proprietà, inversione di liste e deallocazione completa.
   - Gestione della memoria dinamica per matrici o vettori estendibili mediante `malloc`, `realloc` e `free`.
   - Implementazione di tabelle hash con gestione manuale delle collisioni tramite liste e puntatori a puntatori.
