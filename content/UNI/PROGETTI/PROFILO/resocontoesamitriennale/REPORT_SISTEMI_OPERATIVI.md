# Resoconto Corso: Sistemi Operativi

- **Anno:** 2° Anno Triennale
- **Area:** Sistemi di Elaborazione delle Informazioni / Architettura dei Sistemi Software di Base (ING-INF/05 - INF/01)
- **Crediti/Collocazione:** Insegnamento cardine per comprendere il funzionamento interno dei sistemi operativi, la gestione delle risorse di calcolo e la programmazione concorrente di sistema in ambiente Unix/Linux

---

## Obiettivi del Corso in Sintesi

Il corso fornisce una visione completa e dettagliata dei principi teorici, dell'architettura e delle soluzioni implementative alla base dei moderni sistemi operativi (in particolare GNU/Linux e Unix-like). Lo studente acquisisce competenze su:
1. **Comprendere il duplice ruolo del sistema operativo:** gestore efficiente e protetto delle risorse hardware (CPU, memoria, storage, periferiche I/O) e macchina virtuale/astratta estesa per i programmi applicativi.
2. **Padroneggiare la gestione dei processi e dei thread:** comprendere il ciclo di vita dei processi, i cambi di contesto, i meccanismi di scheduling con e senza prelazione, e la gestione della gerarchia di esecuzione.
3. **Progettare ed implementare software concorrente corretto:** analizzare le condizioni di corsa (race conditions), risolvere la mutua esclusione e la sincronizzazione di processi e thread tramite primitive di sistema (pipe, segnali, semafori POSIX, pthread mutex e condition variables).
4. **Approfondire l'architettura della memoria virtuale:** studiare la paginazione, la segmentazione, il Translation Lookaside Buffer (TLB), la gestione del page fault e gli algoritmi di sostituzione delle pagine.
5. **Analizzare l'organizzazione del File System e dell'I/O:** comprendere la struttura interna degli inode, del Virtual File System (VFS), le politiche di allocazione, i link fisici e simbolici, l'architettura dei controller I/O, il DMA e le matrici RAID.
6. **Sviluppare applicazioni in C di livello sistema e script Bash:** scrivere codice C conforme agli standard POSIX per la gestione di pipeline, segnali e thread, e utilizzare la shell Linux per l'amministrazione e l'automazione.

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### 1. Architettura Hardware, Concetti Fondamentali e Struttura del Sistema Operativo
- **Definizione e funzioni del Sistema Operativo (SO):**
  - Il SO come gestore di risorse: multiplexing temporale (condivisione nel tempo, es. CPU) e multiplexing spaziale (ripartizione nello spazio, es. RAM e disco).
  - Il SO come macchina estesa (Extended Machine): astrazione dell'hardware complesso attraverso primitive pulite e controllate.
  - Classificazione dei sistemi operativi: Mainframe, Server, Personal Computer, Sistemi Mobile/Tablet, Sistemi Real-Time (Hard e Soft), Sistemi Embedded e IoT.
- **Supporto Hardware e Modalità di Esecuzione:**
  - CPU e registri principali: Program Counter (PC), Stack Pointer (SP), Program Status Word (PSW).
  - Dual Mode Operation: separazione fondamentale tra Modalità Utente (User Mode, istruzioni non privilegiate) e Modalità Kernel/Supervisore (Kernel Mode, accesso diretto a registri di controllo e istruzioni I/O).
  - Gerarchia delle memorie: registri interni CPU, memorie Cache L1/L2/L3 (SRAM), Memoria Principale (DRAM), memorie di massa non volatili (SSD, HDD). Principi di località spaziale e temporale.
  - Controller dei dispositivi e interfacciamento tramite bus (PCIe, Northbridge, Southbridge).
- **Chiamate di Sistema (Syscall):**
  - Meccanismo di invocazione: transizione controllata da User Mode a Kernel Mode generata tramite istruzione di trap software (software interrupt).
  - Passaggio parametri: memorizzazione nei registri del processore o su stack; decodifica tramite tabella dei vettori delle chiamate di sistema (`sys_call_table`).
  - Separazione architetturale tra librerie standard di sistema (`libc`, `unistd.h`, `syscall.h`) e le routine interne del kernel. Tracciamento del percorso di una syscall (es. `read()` o `write()`).
- **Gestione delle Interruzioni ed Eccezioni:**
  - Differenze formali:
    - **Interrupt (hardware asincrono):** generato da periferiche esterne (es. tastiera, completamento I/O del disco, timer clock).
    - **Trap (software sincrono):** istruzione generata deliberatamente dal programma in esecuzione (syscall).
    - **Fault (eccezione recuperabile):** errore generato dall'istruzione corrente che il SO può sanare per poi rieseguirla (es. Page Fault).
    - **Abort (errore non recuperabile):** errore hardware fatale o violazione di protezione insanabile che causa la terminazione del processo (es. Segment Fault, `SIGSEGV`).
  - Interrupt Vector Table (IVT): tabella dei puntatori alle Routine di Servizio dell'Interruzione (ISR - Interrupt Service Routine).
  - Ciclo di gestione dell'interrupt: sospensione del processo corrente, salvataggio automatico dello stato/contesto nei registri/stack del kernel, esecuzione dell'handler, ripristino del contesto o invocazione dello scheduler.
- **Architetture del Kernel:**
  - Kernel Monolitico: tutti i servizi (scheduling, memoria, file system, driver) risiedono in un unico grande spazio di indirizzamento in kernel mode (es. Linux); alte prestazioni ma minore isolamento dei guasti.
  - Microkernel: solo i meccanismi essenziali (IPC minimale, scheduling di base, gestione interrupt) risiedono in kernel mode; gli altri servizi girano come processi server in user mode (es. MINIX, Mach, QNX); alta affidabilità ed estendibilità al prezzo di overhead da IPC.
  - Virtualizzazione e Container: Hypervisor di Tipo 1 (Bare-Metal) e di Tipo 2 (Hosted); containerizzazione a livello SO (namespace e cgroups di Linux) per isolamento leggero senza emulazione hardware.

### 2. Processi, Thread e Scheduling della CPU
- **Il Modello del Processo:**
  - Definizione di processo: istanza di un programma in esecuzione, comprensivo di contatori, registri e variabili.
  - Layout dello spazio di indirizzamento di un processo in memoria:
    - Segmento Testo (Text): codice macchina eseguibile (sola lettura e condiviso).
    - Segmento Dati Inizializzati (Data): variabili globali e statiche inizializzate.
    - Segmento BSS: variabili globali e statiche non inizializzate (azzerate dal SO).
    - Heap: allocazione dinamica di memoria (`malloc`, `free`), con crescita verso gli indirizzi alti.
    - Stack: variabili locali, parametri di funzione, record di attivazione e indirizzi di ritorno, con crescita verso gli indirizzi bassi.
  - **Process Control Block (PCB):** struttura dati del kernel contenente PID, UID, GID, stato del processo, registri della CPU salvati, contabilità temporale, puntatori alle tabelle di paginazione, descrittori dei file aperti.
  - Ciclo di vita e transizioni di stato: New, Ready (pronto in coda), Running (in esecuzione su CPU), Blocked/Waiting (in attesa di evento o I/O), Terminated.
- **Gestione dei Processi in Unix/Linux:**
  - Creazione con `fork()`: clonazione del processo genitore; ritorno del PID del figlio al padre e di 0 al figlio; ottimizzazione tramite tecnica Copy-On-Write (COW) che evita la duplicazione immediata delle pagine fisiche.
  - Sostituzione dell'immagine con famiglia `exec` (`execv`, `execvp`, `execl`, ecc.): caricamento di un nuovo eseguibile sovrascrivendo spazio testo, dati, stack e heap.
  - Sincronizzazione con `wait()` e `waitpid()`: attesa della terminazione dei processi figli e lettura del codice di ritorno tramite macro `WIFEXITED(status)` e `WEXITSTATUS(status)`.
  - Anomalie nei processi: processi Zombie (figli terminati il cui stato non è stato letto dal padre tramite `wait`) e processi Orfani (padre terminato prima del figlio; riassegnazione automatica al processo `init` / `systemd`).
- **Segnali Unix (Signals):**
  - Meccanismo di notifica asincrona di eventi software e hardware a livello utente.
  - Segnali notevoli: `SIGINT` (Ctrl+C), `SIGTERM` (terminazione gentile), `SIGKILL` (terminazione forzata non intercettabile), `SIGSEGV` (violazione di memoria), `SIGALRM` (timer scaduto), `SIGCHLD` (notifica al padre della terminazione di un figlio).
  - Gestione con le primitive `signal()` e `sigaction()`: associazione di Signal Handler dedicati, mascheratura dei segnali, impostazione del comportamento predefinito o ignoramento (`SIG_IGN`).
  - Timer software con la chiamata di sistema `alarm(seconds)`.
- **I Thread (Processi Leggeri / LWP):**
  - Motivazione: creazione e cambio di contesto molto più rapidi rispetto ai processi; parallelismo a grana fine all'interno della stessa applicazione.
  - Risorse condivise tra thread dello stesso processo: spazio di indirizzamento comune, variabili globali/heap, tabella dei file descriptor aperti, permessi e segnali.
  - Risorse private del singolo thread: Thread ID (TID), registri della CPU (incluso PC), Stack privato per le chiamate di funzione e variabili locali.
  - Modelli di implementazione:
    - User-Level Threads (ULT): gestiti da librerie in spazio utente senza che il kernel ne conosca l'esistenza; cambio di contesto ultraveloce, ma se un thread si blocca su una syscall di I/O, l'intero processo si blocca e non c'è parallelismo multicore reale.
    - Kernel-Level Threads (KLT): gestiti e schedulati direttamente dal kernel; sfruttamento nativo dei processori multiprocessore/multicore, con leggero overhead per i context switch gestiti via kernel mode.
    - Modello ibrido (M:N).
- **Algoritmi di Scheduling della CPU:**
  - Obiettivi dello scheduler: equità, throughput, minimizzazione del tempo di turnaround (tempo totale da sottomissione a fine), minimizzazione del tempo di attesa e tempo di risposta, massimizzazione dell'utilizzo della CPU.
  - Distinzione tra processi CPU-bound (eseguono lunghi calcoli) e I/O-bound (effettuano frequenti accessi I/O e richiedono brevi burst di CPU).
  - Classificazione:
    - **Senza prelazione (Non-Preemptive):** il processo rilascia la CPU solo volontariamente (terminazione o blocco su I/O).
    - **Con prelazione (Preemptive):** il sistema operativo può interrompere forzatamente un processo in esecuzione allo scadere del quanto di tempo o all'arrivo di un processo a priorità più alta.
  - Algoritmi per sistemi Batch:
    - **FCFS (First-Come, First-Served):** semplice coda FIFO; problema del Convoy Effect (processi corti bloccati dietro a processi CPU-bound lunghi).
    - **SJF (Shortest Job First):** seleziona il processo con il burst di CPU più breve; matematicamente ottimo per minimizzare il tempo medio di attesa; richiede la stima a priori dei tempi di burst.
    - **SRTN (Shortest Remaining Time Next):** versione con prelazione di SJF; se arriva un nuovo processo con tempo residuo inferiore a quello corrente, viene effettuato il cambio di contesto.
  - Algoritmi per sistemi Interattivi:
    - **Round Robin (RR):** a ciascun processo pronto viene assegnato un quanto di tempo di CPU ($q$); al termine del quanto il processo subisce prelazione e torna in fondo alla coda; criticità nella scelta di $q$ (se troppo piccolo $\to$ degrado da continui context switch; se troppo grande $\to$ degenera in FCFS con scarsa reattività).
    - **Scheduling a Priorità (Priority Scheduling):** assegnazione di priorità numeriche ai processi; rischio di **Starvation** (inedia dei processi a bassa priorità); contromisura dell'**Aging** (incremento progressivo della priorità col passare del tempo di attesa).
    - **Multi-Level Feedback Queue (MLFQ):** code multiple con quanti di tempo crescenti e priorità decrescenti; i processi I/O-bound rimangono nelle code ad alta priorità, mentre i processi CPU-bound scendono verso code a quanto lungo.
    - Guaranteed Scheduling, Lottery Scheduling (assegnazione casuale ponderata da biglietti di lotteria) e Fair-Share Scheduling (garanzia di quote di calcolo eque tra utenti diversi).
  - Sistemi Real-Time: Hard Real-Time (il rispetto delle scadenze / deadline è imperativo assoluto) vs Soft Real-Time (il mancato rispetto degrada il servizio ma non è fatale); algoritmi Rate Monotonic (priorità statica inversamente proporzionale al periodo) ed Earliest Deadline First (EDF, priorità dinamica alla scadenza più vicina).

### 3. Concorrenza, Sincronizzazione e Comunicazione Interprocesso (IPC)
- **Comunicazione tra Processi (IPC):**
  - **Pipe Anonime (UNIX Pipes):**
    - Canali unidirezionali a flusso di byte in memoria RAM gestiti tramite file descriptor con la chiamata `pipe(int fd[2])` (`fd[0]` per lettura, `fd[1]` per scrittura).
    - Comunicazione limitata a processi con antenato comune (creati via `fork`).
    - Chiusura corretta dei descrittori non utilizzati: fondamentale per permettere la ricezione dell'End-Of-File (`EOF` quando tutti i canali di scrittura sono chiusi) e la generazione di `SIGPIPE` in caso di scrittura su pipe senza lettori.
    - Redirezione dello standard input/output e concatenazione di comandi con `dup()` e `dup2(oldfd, newfd)` (meccanismo interno per pipeline shell come `ls | grep txt`).
  - Pipe con nome (FIFO): create nel file system con `mkfifo()`, consentono la comunicazione bidirezionale/indipendente tra processi privi di parentela.
- **Problemi Fondamentali della Concorrenza:**
  - **Corsa Critica (Race Condition):** situazione in cui il risultato finale dell'esecuzione dipende dall'ordine temporale imprevedibile con cui i thread/processi interleavano l'accesso a dati condivisi.
  - **Regione Critica (Critical Section):** porzione di codice in cui si accede a risorse o memorie condivise.
  - I 4 requisiti per garantire la corretta sincronizzazione:
    1. **Mutua Esclusione (Mutual Exclusion):** due processi non possono trovarsi contemporaneamente all'interno della rispettiva regione critica.
    2. **Progresso (No Deadlock):** nessun processo al di fuori della regione critica può impedire ad altri processi di entrare.
    3. **Attesa Limitata (Bounded Waiting / No Starvation):** nessun processo deve attendere indefinitamente l'accesso alla regione critica.
    4. **Nessun assunto sulla velocità:** la soluzione non deve dipendere dal numero di CPU o dalla velocità relativa dei processi.
- **Meccanismi e Primitive di Sincronizzazione:**
  - Soluzioni software: Alternanza stretta (viola il progresso per processi a velocità diverse), Algoritmo di Peterson per 2 processi (uso combinato delle variabili `turn` e array booleano `flag`).
  - Soluzioni hardware: istruzioni atomiche del set di istruzioni CPU (Test-and-Set `TSL`, Exchange `XCHG`, Compare-and-Swap `CAS`); Spinlock e problematica del Busy Waiting (spreco di cicli CPU in attesa attiva).
  - **Semafori (Dijkstra):**
    - Variabile intera protetta accessibile unicamente tramite due operazioni atomiche:
      - `down()` / `wait()` / `P()`: decrementa il valore; se il valore risultante è $< 0$, il processo chiamante viene sospeso e inserito nella coda di blocco associata al semaforo.
      - `up()` / `signal()` / `V()`: incrementa il valore; se ci sono processi bloccati, ne risveglia uno e lo sposta nella coda di Ready.
    - Tipologie: Semaforo Binario (valori 0 e 1, equivalente a un Mutex) e Semaforo Contatore (gestione di pool di risorse con molteplicità finita).
    - Primitive POSIX: `sem_init()`, `sem_wait()`, `sem_post()`, `sem_destroy()`, `sem_open()`.
  - **Pthread Mutex e Variabili di Condizione:**
    - Mutex: `pthread_mutex_t`, primitive `pthread_mutex_init()`, `pthread_mutex_lock()`, `pthread_mutex_trylock()`, `pthread_mutex_unlock()`, `pthread_mutex_destroy()`.
    - Condition Variables: `pthread_cond_t`, consentono la sospensione atomica con rilascio contestuale del lock tramite `pthread_cond_wait(&cond, &mutex)`, e il risveglio mirato con `pthread_cond_signal()` o globale con `pthread_cond_broadcast()`.
  - **Monitor:**
    - Meccanismo di astrazione ad alto livello (costrutto di linguaggio, es. Java `synchronized`); mutua esclusione automatica sulle procedure del monitor.
- **Problemi Classici di Concorrenza:**
  - **Produttore-Consumatore (Bounded Buffer Problem):** coordinamento dell'accesso concorrente a un buffer di dimensione finita $N$ con due semafori contatori (`empty` inizializzato a $N$, `full` inizializzato a 0) e un mutex binario a protezione della sezione critica di scrittura/lettura.
  - **Lettori e Scrittori:** accesso condiviso concorrente per lettori multipli e accesso in mutua esclusione per gli scrittori; gestione delle priorità per evitare l'inedia degli scrittori (Writer Starvation) o dei lettori (Reader Starvation).
  - **Cena dei Filosofi:** allocazione circolare di risorse e strategie per prevenire lo stallo circolare (Deadlock).
- **Problemi Avanzati:**
  - **Inversione di Priorità (Priority Inversion):** scenario in cui un processo a priorità alta attende una risorsa lockata da un processo a priorità bassa, il quale viene continuamente prelazionato da processi a priorità media; soluzione tramite protocollo di **Ereditarietà della Priorità (Priority Inheritance)** (caso storico del software del Mars Pathfinder).
  - Barriere di sincronizzazione (`pthread_barrier_t`) e paradigmi Read-Copy-Update (RCU).

### 4. Gestione della Memoria e Memoria Virtuale
- **Astrazione e Gestione della Memoria:**
  - Passaggio dall'indirizzamento fisico assoluto (sistemi monoprogrammati e partizioni statiche) al partizionamento dinamico con registri Base e Limite per la rilocazione a runtime.
  - Frammentazione interna (spazio inutilizzato all'interno di un blocco allocato di dimensione fissa) ed esterna (spazio libero globale sufficiente ma suddiviso in piccoli blocchi non contigui).
  - Algoritmi di allocazione dinamica dei blocchi liberi:
    - Tecniche di tracciamento: Bitmap (vettore di bit per unità di allocazione) e Liste Collegate di blocchi liberi/occupati.
    - Strategie di ricerca: **First Fit** (primo blocco libero sufficiente, rapido), **Next Fit** (ricerca circolare dal punto di arresto precedente), **Best Fit** (ricerca del blocco con dimensione più vicina alla richiesta, genera frammentazione esterna minima ma piccoli frammenti residui inutilizzabili), **Worst Fit** (blocco più grande disponibile), **Quick Fit** (liste separate per le dimensioni più comuni).
  - Gestione della memoria del kernel: **Buddy Allocator** (divisione e fusione di blocchi con potenze di due) e **Slab Allocator** (pre-allocazione di cache di oggetti kernel di dimensione identica per eliminare overhead di inizializzazione).
- **Paginazione (Paging) e Memoria Virtuale:**
  - Concetto di Memoria Virtuale: separazione logica tra lo spazio di indirizzamento visto dal programma (pagine virtuali) e la memoria fisica effettivamente installata (frame fisici o pagine fisiche). Consente l'esecuzione di programmi più grandi della RAM fisica.
  - Funzionamento della **MMU (Memory Management Unit):** hardware dedicato alla mappatura trasparente da indirizzi logici virtuali a indirizzi fisici.
  - Scomposizione dell'indirizzo virtuale: Numero di Pagina Virtuale (VPN - Virtual Page Number) e Offset intra-pagina ($D$). Con pagine da $4\text{ KB}$ ($2^{12}$ byte), gli ultimi 12 bit rappresentano l'offset.
  - **Tabella delle Pagine (Page Table):**
    - Tabella indicizzata per VPN contenente le Page Table Entry (PTE).
    - Campi di una PTE: Present/Absent bit (validità/presenza in RAM), Numero del Frame Fisico (PFN), Bit di Protezione (Read/Write/Execute), Modified/Dirty bit (segnala modifiche da riscrivere su disco in swap), Referenced bit (accesso recente in lettura/scrittura), Caching Disabled bit.
  - **Translation Lookaside Buffer (TLB):**
    - Memoria cache associativa integrata nella MMU per memorizzare le traduzioni VPN $\to$ PFN più recenti.
    - Flusso: se VPN è in TLB $\to$ **TLB Hit** (traduzione in un solo ciclo di clock); se non presente $\to$ **TLB Miss** $\to$ accesso alla Page Table in RAM (**Page Table Walk**) e aggiornamento del TLB.
  - Paginazione Multilivello:
    - Necessaria per gestire spazi di indirizzamento a 32 e 64 bit senza creare tabelle monolitiche gigantesche (es. x86_64 a 4 livelli: PML4, PDPT, PD, PT).
- **Meccanismo e Gestione del Page Fault (Sequenza in 10 Passi):**
  1. La CPU tenta l'accesso a un indirizzo virtuale la cui PTE ha il bit *Present = 0*.
  2. La MMU rileva l'assenza e genera una trap hardware di **Page Fault** verso il kernel.
  3. Il SO salva i registri del processore e il contesto del processo interrotto.
  4. Il kernel determina l'indirizzo virtuale che ha causato il fault (es. registro `CR2` su x86).
  5. Il SO verifica la legittimità dell'indirizzo consultando le strutture di memoria del PCB; se l'accesso è illegittimo genera un segnale di violazione di memoria (`SIGSEGV`), altrimenti procede.
  6. Il SO cerca un frame fisico libero; se non è disponibile, invoca l'**algoritmo di sostituzione delle pagine** per selezionare una pagina "vittima".
  7. Se la pagina vittima ha il bit *Dirty = 1*, il suo contenuto viene scaricato su disco nell'area di Swap; la relativa PTE viene marcata come assente.
  8. Il SO avvia un'operazione di I/O su disco per caricare la pagina richiesta nel frame fisico designato; il processo viene posto nello stato di *Blocked*.
  9. Al completamento del caricamento (segnalato da un interrupt di I/O del disco), la PTE della nuova pagina viene aggiornata con il PFN e il bit *Present = 1*.
  10. I registri del processo vengono ripristinati e la CPU riesegue l'istruzione esatta che aveva generato il Page Fault, che questa volta genera un TLB miss seguito da risoluzione immediata.
- **Algoritmi di Sostituzione delle Pagine (Page Replacement):**
  - **Algoritmo Ottimale (OPT / Belady):** sostituisce la pagina che non verrà usata per il periodo di tempo più lungo nel futuro; teorico e non implementabile (richiede conoscenza del futuro), usato come benchmark di riferimento ideale.
  - **NRU (Not Recently Used):** sfrutta i bit $R$ (Referenced) e $M$ (Modified); classifica le pagine in 4 classi: Classe 0 ($R=0, M=0$), Classe 1 ($R=0, M=1$), Classe 2 ($R=1, M=0$), Classe 3 ($R=1, M=1$); seleziona una pagina casuale dalla classe non vuota di indice più basso; il bit $R$ viene azzerato periodicamente dal timer clock.
  - **FIFO (First-In, First-Out):** sostituisce la pagina caricata da più tempo; soffre dell'**Anomalia di Belady** (il tasso di page fault può aumentare all'aumentare dei frame fisici assegnati).
  - **Second Chance (Seconda Opportunità):** variante di FIFO che ispeziona il bit $R$; se $R=0$ la pagina viene sostituita; se $R=1$, il bit viene azzerato, la pagina viene rimessa in coda come se fosse appena arrivata e si esamina la successiva.
  - **Clock Algorithm (Algoritmo dell'Orologio):** implementazione efficiente di Second Chance mediante lista circolare e puntatore mobile a lancetta.
  - **LRU (Least Recently Used):** sostituisce la pagina non utilizzata da più tempo basandosi sulla località temporale; richiede supporto hardware (contatore temporale a 64 bit per ogni accesso o matrice di bit $n \times n$).
  - **NFU con Aging (Not Frequently Used con Invecchiamento):** contatore software a scorrimento di bit (shift register a 8 bit verso destra) per approssimare LRU a basso costo.
  - **Working Set e WSClock:** modelli basati sul principio che un processo per lavorare efficientemente deve avere in memoria il proprio insieme di lavoro $W(k, t)$ delle pagine usate nelle ultime $k$ istruzioni, prevenendo il trashing.
- **Thrashing e Politiche di Memoria:**
  - **Thrashing:** collasso delle prestazioni del sistema che si verifica quando la somma dei working set di tutti i processi supera la memoria fisica disponibile; il sistema passa la quasi totalità del tempo a fare I/O di swap tra disco e RAM con utilizzo CPU prossimo allo zero.
  - Tecniche di mitigazione: algoritmo di frequenza di page fault (PFF - Page Fault Frequency), sospensione temporanea di processi mediante swapping a due livelli.
  - Allocazione locale (i frame della vittima sono scelti tra quelli assegnati al processo stesso) vs globale (vittima scelta tra tutti i processi di sistema).
  - Paging Daemon (`kswapd`), Transparent Huge Pages (pagine da $2\text{ MB}$ o $1\text{ GB}$ per abbattere i miss di TLB su grandi basi di dati).
- **Segmentazione della Memoria:**
  - Indirizzamento logico bidimensionale: coppia `(Segmento, Offset)`.
  - Differenze con la Paginazione: la paginazione è trasparente al programmatore, a blocchi fissi ed elimina la frammentazione esterna; la segmentazione riflette la struttura logica del programma (moduli, funzioni, stack, array), a blocchi di dimensione variabile, facilita la condivisione e protezione, ma introduce frammentazione esterna.
  - Sistemi combinati: Segmentazione con Paginazione (MULTICS, x86).

### 5. Sistemi di Memorizzazione, File System e Sottosistema di I/O
- **Astrazione di File e Struttura delle Directory:**
  - Definizione di file: spazio logico di indirizzamento lineare di byte persistente su memoria non volatile.
  - Tipologie di file: file regolari (testo o binario), directory, file speciali a caratteri (es. terminali, console), file speciali a blocchi (dischi), pipe/FIFO, link simbolici, socket di rete.
  - Struttura del file binario eseguibile: formato ELF (Executable and Linkable Format) con header, tabella delle sezioni e punti di ingresso.
  - Attributi e metadati: dimensione, timestamp (accesso, modifica, cambio stato inode), proprietario (UID), gruppo (GID), permessi di accesso (rwx).
  - Organizzazione delle directory: struttura ad albero gerarchica con percorsi assoluti (dalla radice `/`) e relativi (dalla directory corrente `.`).
- **Implementazione e Allocazione dei File:**
  - **Allocazione Contigua:** blocchi consecutivi su disco; ottima velocità sequenziale, ma grave frammentazione esterna e difficoltà nell'espansione del file.
  - **Allocazione con Lista Concatenata:** ciascun blocco contiene il puntatore al successivo; nessuna frammentazione esterna, ma accesso casuale (`seek`) lentissimo e spreco di byte dati per i puntatori.
  - **FAT (File Allocation Table):** i puntatori di concatenamento dei blocchi sono estratti e memorizzati in una tabella centralizzata caricata in memoria RAM; miglioramento dell'accesso casuale, ma scalabilità limitata su dischi di grandi dimensioni.
  - **I-node (Index-Node dei sistemi Unix/Linux):**
    - Struttura dati fissa contenente tutti i metadati del file (tranne il nome) e i puntatori ai blocchi dati:
      - 12 puntatori diretti a blocchi dati (accesso immediato per file piccoli fino a 48 KB).
      - 1 puntatore indiretto singolo (punta a un blocco di puntatori, es. $1024$ blocchi addizionali).
      - 1 puntatore indiretto doppio (punta a un blocco che punta a blocchi di puntatori).
      - 1 puntatore indiretto triplo (consente di indirizzare file nell'ordine dei Terabyte).
- **Link nel File System:**
  - **Hard Link (`ln source dest`):** creazione di una nuova voce di directory che punta allo *stesso inode* fisico del file originale; condivisione di metadati e dati; incremento del reference counter nell'inode; eliminazione del file solo quando il reference counter scende a zero; limitazione: non può attraversare file system differenti e non è consentito sulle directory per prevenire cicli.
  - **Soft / Symbolic Link (`ln -s source dest`):** file speciale con un proprio inode autonomo il cui payload contiene semplicemente la stringa del percorso del file target; può attraversare mount point e file system diversi; se il file target viene cancellato, il link simbolico diventa interrotto (dangling/broken link).
- **File System Moderni, VFS e Affidabilità:**
  - Struttura di EXT2: partizione divisa in Block Group, ciascuno contenente Superblock (parametri globali del file system), Descrittori di Gruppo, Bitmap dei Blocchi Dati, Bitmap degli Inode, Tabella degli Inode, e Blocchi Dati effettivi.
  - **Journaling (EXT3, EXT4, NTFS):** registrazione preventiva delle transazioni di metadati e dati in un'area dedicata di log circolare (journal) prima della scrittura sul disco; garantisce il ripristino istantaneo della coerenza strutturale dopo crash o interruzioni di corrente senza richiedere la scansione esaustiva con `fsck`. Modalità: *journal* (dati e metadati), *ordered* (metadati nel journal, dati su disco prima del commit, predefinita), *writeback*.
  - **Virtual File System (VFS):** layer di astrazione ad oggetti orientato nel kernel che consente ad applicazioni generiche di accedere a file system differenti (Ext4, NTFS, FAT32, NFS, procfs, sysfs) tramite le stesse chiamate di sistema standard (`open`, `read`, `write`); quattro strutture cardine: **Superblock** (file system montato), **Inode** (singolo file), **Dentry** (corrispondenza tra nome e inode per la navigazione d'albero), **File** (istanza di file aperto da un processo).
  - Caching su disco: Buffer Cache e Page Cache per accelerare letture/scritture; scrittura differita (delayed write) e sincronizzazione forzata tramite `sync()` e `fsync()`.
- **Architettura di Hardware e Software di I/O:**
  - Dispositivi a Blocchi (trasferimento in blocchi indirizzabili indipendenti, es. dischi) vs Dispositivi a Caratteri (flusso continuo di byte senza indirizzamento o posizionamento, es. porte seriali, mouse, tastiere).
  - Modalità di indirizzamento porte di I/O:
    - **Port-Mapped I/O:** istruzioni macchina separate (`in`, `out` in x86) su uno spazio di indirizzi di I/O dedicato.
    - **Memory-Mapped I/O:** registri di controllo delle periferiche mappati direttamente all'interno dello spazio degli indirizzi di memoria fisica ordinario; manipolabili tramite normali istruzioni di load/store.
  - Meccanismi di trasferimento dati:
    - Polling / Busy Waiting: la CPU interroga ciclicamente lo status register del controller; semplice ma blocca la CPU.
    - Interrupt-Driven I/O: la CPU avvia l'operazione e continua altri compiti; il controller solleva un interrupt a completamento.
    - **DMA (Direct Memory Access):** chip/controller dedicato che gestisce autonomamente il trasferimento di blocchi di byte tra dispositivo e memoria RAM principale senza il passaggio attraverso la CPU; riduce i carichi di lavoro della CPU limitandone l'intervento all'avvio e all'interrupt di fine trasferimento. Modalità operative: Burst Mode, Cycle Stealing, Fly-By.
- **Sistemi di Dischi e Matrici RAID:**
  - Obiettivi: incremento di prestazioni tramite parallelismo e tolleranza ai guasti tramite ridondanza.
  - Livelli RAID standard:
    - **RAID 0 (Striping):** divisione dei dati a blocchi su più dischi; throughput raddoppiato/moltiplicato, nessuna ridondanza (il guasto di un disco compromette tutti i dati).
    - **RAID 1 (Mirroring):** copia esatta dei dati su due dischi; eccellente affidabilità, dimezzamento della capacità utile.
    - **RAID 5 (Striping con Parità Distribuita):** suddivisione a blocchi su almeno 3 dischi con parità calcolata tramite XOR distribuita a rotazione su tutti i dischi; tollera il guasto di 1 disco; capacità utile $(N-1)$.
    - **RAID 6:** doppia parità distribuita su almeno 4 dischi; tollera il guasto contemporaneo di 2 dischi; capacità utile $(N-2)$.
    - **RAID 10 (1+0):** stripe di mirror; unisce la velocità dello striping alla sicurezza del mirroring.
- **Sequenza di Boot del Sistema Operativo:**
  - BIOS Legacy: esecuzione firmware da ROM, Power-On Self Test (POST), lettura del Master Boot Record (MBR, primo settore da 512 byte sul disco contenente tabella delle partizioni a 4 voci e codice di bootstrap iniziale), avvio del bootloader (es. GRUB). Limite storico di 2 TB.
  - UEFI (Unified Extensible Firmware Interface): sostituzione moderna del BIOS; supporto a dischi oltre 2 TB tramite tabelle di partizionamento **GPT (GUID Partition Table)**; partizione dedicata ESP (EFI System Partition formattata FAT32); supporto a Secure Boot (verifica di firma crittografica del bootloader e del kernel).

### 6. Amministrazione di Sistema e Scripting Bash
- **Navigazione e gestione del File System da Terminale:**
  - Gerarchia standard FHS (Filesystem Hierarchy Standard): `/bin`, `/sbin`, `/etc` (configurazioni), `/dev` (file di dispositivo), `/proc` e `/sys` (pseudo-filesystem kernel), `/var` (log e dati variabili), `/tmp`, `/home`, `/root`.
  - Comandi fondamentali: `pwd`, `cd`, `ls` (`-l`, `-a`, `-h`), `cp`, `mv`, `rm` (`-r`, `-f`), `mkdir -p`, `touch`, `file`.
  - Visualizzazione e concatenazione: `cat`, `tac`, `head -n`, `tail` (`-n`, `-f` per monitoraggio log in tempo reale), `less`.
- **Gestione dei Permessi e Proprietà:**
  - Notazione simbolica (`rwxrwxrwx`) e notazione ottale (Read = 4, Write = 2, Execute = 1).
  - Comando `chmod` (es. `chmod 755 file`, `chmod u+x script.sh`) e modifica proprietario/gruppo con `chown user:group file`.
  - Bit speciali:
    - **SUID (Set-User-ID, 4000):** esecuzione del binario con i privilegi del proprietario del file (es. `/usr/bin/passwd`).
    - **SGID (Set-Group-ID, 2000):** esecuzione con privilegi del gruppo; se applicato a una cartella, i nuovi file ereditano il gruppo genitore.
    - **Sticky Bit (1000):** se applicato a cartelle condivise (es. `/tmp`), solo il proprietario del file può cancellarlo o rinominarlo.
- **Filtri di Testo e Ricerca:**
  - Ricerca per attributi e nomi: `find /path -name "*.c" -type f -perm 777`.
  - Elaborazione e filtri a pipeline:
    - `grep` (`-i`, `-r`, `-n`, `-v`, `-E` per espressioni regolari estese).
    - `awk` (estrazione e riformattazione campi, es. `awk '{print $1, $3}'`).
    - `sed` (stream editor per sostituzione testo, es. `sed 's/vecchio/nuovo/g'`).
    - `sort`, `uniq -c` (conteggio duplicati consecutivi), `wc` (`-l`, `-w`, `-c`), `cut -d',' -f1`.
- **Controllo e Gestione dei Processi:**
  - Monitoraggio: `ps aux`, `ps -ef`, `top`, `htop`.
  - Segnali e chiusura: `kill -9 PID` (`SIGKILL`), `kill -15 PID` (`SIGTERM`), `killall nome_processo`.
  - Controllo dei Job: esecuzione in background con `&`, sospensione con `Ctrl+Z`, visualizzazione con `jobs`, ripresa con `bg %1` e `fg %1`.
  - Persistenza da disconnessione terminale: `nohup ./script.sh > output.log 2>&1 &` e multiplexer di terminale (`screen`, `tmux`).
- **Gestione Dischi e Dispositivi:**
  - Ispezione blocchi e partizioni: `lsblk`, `fdisk -l`, `blkid`.
  - Spazio occupato e disponibile: `df -h` (file system montati), `du -sh cartella/` (peso effettivo directory).
  - Montaggio e smontaggio: `mount /dev/sdb1 /mnt/disco`, `umount /mnt/disco`.
  - Compressione e archiviazione: `tar -czvf archivio.tar.gz cartella/` (creazione compresso gzip), `tar -xzvf archivio.tar.gz` (estrazione), `zip` e `unzip`.

---

## Linguaggi, Strumenti e Tecnologie

- **Linguaggio di Programmazione di Sistema:** **C (C99/C11)** con estensioni GNU/POSIX.
- **Librerie di Sistema e Header POSIX:**
  - Chiamate a processi e gestione I/O: `<unistd.h>`, `<sys/types.h>`, `<sys/wait.h>`, `<fcntl.h>`, `<sys/stat.h>`, `<dirent.h>`.
  - Segnali: `<signal.h>`.
  - Thread e Concorrenza POSIX: `<pthread.h>`.
  - Semafori: `<semaphore.h>`.
  - Allocazione memoria e utility: `<stdlib.h>`, `<stdio.h>`, `<string.h>`, `<errno.h>`, `<time.h>`.
- **Toolchain di Sviluppo, Compilazione e Debugging:**
  - Compilatore: `gcc` (flag di compilazione: `-Wall -Wextra -pthread -g -std=c99`).
  - Debugger: `gdb` (ispezione stack, breakpoint, analisi crash e segnali).
  - Analisi dinamica della memoria e concorrenza: `valgrind --tool=memcheck` (rilevamento memory leak) e `valgrind --tool=helgrind` / `drd` (rilevamento data race nei thread).
- **Ambiente Shell e Scripting:**
  - Shell: GNU **Bash** su ambiente GNU/Linux (Debian, Ubuntu, CentOS).

---

## Tipologia Esercizi e Prove d'Esame

L'esame richiede la padronanza sia teorica che operativa attraverso problemi di programmazione in C e quesiti aperti di architettura del sistema operativo:
1. **Programmazione di Sistema in C con Processi e Pipe:**
   - Creazione di processi con `fork()` in topologie specifiche (padre con due figli, catene di processi, pipeline).
   - Configurazione di canali unidirezionali con `pipe(fd)`: chiusura obbligatoria dei descrittori non usati per prevenire deadlock da blocco su lettura.
   - Sincronizzazione tramite `wait()` o `waitpid()` con decodifica del codice di uscita dei figli (`WIFEXITED`, `WEXITSTATUS`).
   - Gestione asincrona dei segnali con `signal()` o `sigaction()`: installazione di handler personalizzati (es. intercettazione di `SIGINT` visualizzando avvisi senza interrompere l'esecuzione, temporizzazioni cicliche con `SIGALRM` e `alarm()`).
   - Esempi tipici di tracce d'esame:
     - Due processi figli leggono numeri casuali o porzioni distinte di un file di testo e li trasmettono via pipe al padre, il quale effettua elaborazioni (somma, moltiplicazione per costanti, conteggio occorrenze, calcolo massimi e minimi) e termina l'esecuzione al raggiungimento di soglie prefissate.
     - Calcolo parallelo di matrici (ciascun figlio computa una colonna specifica della matrice risultante e la invia al padre per la composizione finale).
2. **Programmazione Concorrente Multithread con Mutex e Semafori POSIX:**
   - Creazione di pool di thread con `pthread_create()` e sincronizzazione di terminazione con `pthread_join()`.
   - Mutua esclusione su risorse e buffer condivisi tramite `pthread_mutex_lock()` e `pthread_mutex_unlock()`.
   - Implementazione del pattern Produttore-Consumatore su buffer circolare di $N$ elementi mediante semafori anonimi POSIX (`sem_t`, `sem_wait()`, `sem_post()`).
   - Implementazione di problemi con vincoli di alternanza o precedenza tra thread (es. thread pari e thread dispari che scrivono su posizioni alternate di un array comune con attese casuali).
   - Implementazione del problema dei Lettori-Scrittori (scrittore unico con 5 lettori concorrenti su buffer condiviso).
3. **Quesiti Teorici e Domande Aperte d'Esame:**
   - Trattazione esaustiva della **Memoria Virtuale**: ruolo e benefici per la sicurezza e l'estensione della RAM fisica, architettura della MMU, impatto sulle prestazioni generali del calcolatore.
   - Definizione formale di **Page Fault** e descrizione passo-passo dell'intero ciclo di gestione da parte del kernel e dell'hardware (dalla trap iniziale al ripristino dell'istruzione).
   - Calcolo e simulazione manuale di algoritmi di scheduling (FCFS, SJF, Round Robin, SRTN) su insiemi di processi con tempi di arrivo e burst noti, determinando tempo medio di attesa e di turnaround.
   - Simulazione degli algoritmi di Page Replacement (FIFO, LRU, Clock, Second Chance) su stringhe di riferimento di pagine con assegnazione di frame fisici limitati.
   - Spiegazione delle differenze e implicazioni pratiche tra Processi e Thread, e tra Thread a Livello Utente (ULT) e Thread a Livello Kernel (KLT).
   - Architettura dell'I-node Unix e calcolo della dimensione massima teorica di un file gestibile in base al numero di blocchi diretti, indiretti singoli, doppi e tripli.
