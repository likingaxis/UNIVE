# Resoconto Corso: Architettura dei Sistemi di Elaborazione

- **Anno:** 1° Anno Triennale
- **Area:** Sistemi di Elaborazione, Architettura Hardware e Sistemi Operativi
- **Docenti / Riferimenti Bibliografici:** A.S. Tanenbaum (Architettura dei Calcolatori & I Moderni Sistemi Operativi), Dispense del corso

---

## Obiettivi del Corso in Sintesi
Il corso fornisce una visione verticale e multilivello dell'organizzazione interna di un calcolatore elettronico, partendo dal livello logico digitale (porte e circuiti), passando attraverso la microarchitettura e l'Instruction Set Architecture (ISA), fino alla programmazione a basso livello in linguaggio assemblativo (ARM) e ai fondamenti di gestione delle risorse da parte dei moderni sistemi operativi (gestione processi, memoria virtuale e sottosistemi di I/O).

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### Modulo 1: Fondamenti dei Calcolatori, Macchine a Livelli ed Evoluzione Storica
- **Dominio analogico vs digitale:** Quantizzazione, discretizzazione e codifica dell'informazione, unità metriche di calcolo (KB/KiB, MB/MiB, ns, MHz).
- **Visione a livelli di macchine virtuali (Tanenbaum):**
  - Livello 0: Livello logico digitale
  - Livello 1: Livello di microarchitettura
  - Livello 2: Livello dell'architettura del set di istruzioni (ISA)
  - Livello 3: Livello del sistema operativo
  - Livello 4: Livello del linguaggio assemblativo
  - Livello 5: Livello dei linguaggi ad alto livello
- **Architettura di von Neumann vs architettura Harvard:** Unità centrale di elaborazione (CPU), memoria principale, bus di sistema e periferiche di I/O; il collo di bottiglia di von Neumann.
- **Pietre miliari dell'evoluzione architetturale:** Dalla prima generazione a valvole termoioniche ai transistor e circuiti integrati; evoluzione delle CPU (famiglia Intel x86 dal 8086 al Pentium 4 e Core i7, UltraSPARC III, microcontrollore Intel 8051).

### Modulo 2: Livello Logico Digitale e Circuiti
- **Algebra booleana:** Variabili, operatori fondamentali (NOT, AND, OR), forme algebriche, teoremi di De Morgan, porte logiche elementari e universali (NAND, NOR).
- **Circuiti combinatori:**
  - Multiplexer (MUX) e Demultiplexer (DEMUX)
  - Decoder e comparatori
  - Programmable Logic Arrays (PLA)
  - Unità logico-aritmetica (ALU), Shifter e Sommatori (Half Adder, Full Adder, Ripple-Carry Adder).
- **Circuiti sequenziali ed elementi di memoria:**
  - Latch SR, Latch D (trasparenza al livello di clock)
  - Flip-Flop di tipo D, SR, JK, T (edge-triggered, fronti di salita/discesa)
  - Clock di sistema, registri, banchi di registri (register file)
  - Memorie a semiconduttore: RAM volatili (SRAM statiche vs DRAM dinamiche con cicli di refresh) e memorie non volatili (ROM, PROM, EPROM, EEPROM, Flash).

### Modulo 3: Microarchitettura e Percorso Dati (Datapath)
- **Modello di esecuzione della microarchitettura:**
  - Il Datapath (percorso dati): registri interni, bus di comunicazione (Bus A, Bus B, Bus C), ALU e shifter.
  - Temporizzazione del ciclo di microistruzione e registri di latch.
- **Microarchitettura Mic-1 ed interprete IJVM (Integer Java Virtual Machine):**
  - Formato della microistruzione: campi di controllo ALU, selezione registri, controllo bus, indirizzamento del Control Store (Micro-PC).
  - Modello della memoria basato su stack (operazioni PUSH, POP, IADD, ISUB, IF_ICMPEQ, ecc.).
  - Ciclo di decodifica e interpretazione delle istruzioni ISA tramite microprogramma.

### Modulo 4: Macroarchitettura (Livello ISA) e CPU
- **Organizzazione interna della CPU:** Datapath, Unità di Controllo (CU), Registri speciali (PC, IR, SP, PSW/Flags).
- **Ciclo di istruzione:** Fasi di Fetch, Decode, Operand Fetch, Execute, Writeback; interrupt check.
- **Filosofie di progettazione:** CISC (Complex Instruction Set Computer) vs RISC (Reduced Instruction Set Computer); principi di semplicità, istruzioni a lunghezza fissa e load/store architecture.
- **Parallelismo a livello di istruzione (ILP):** Pipelining a stadi, hazard di pipeline (strutturali, sui dati RAW/WAR/WAW, sul controllo/salti), tecniche di branch prediction e architetture superscalari con esecuzione fuori ordine.
- **Formati di istruzione e indirizzamenti:** Immediato, diretto, a registro, indiretto a registro, indicizzato, relativo al Program Counter (PC).

### Modulo 5: Gerarchia delle Memorie e Codici di Controllo Errore
- **La piramide gerarchica della memoria:** Trade-off tempo di accesso, capacità e costo (Registri -> Cache L1/L2/L3 -> Memoria Principale -> Memoria Secondaria).
- **Organizzazione della memoria primaria:** Indirizzamento al byte, parole di memoria, allineamento, ordinamento dei byte (Big-Endian vs Little-Endian).
- **Memorie Cache:** Principi di località spaziale e temporale; politiche di mappatura (direct mapped, fully associative, set-associative); politiche di scrittura (write-through vs write-back) e rimpiazzo linee (LRU, FIFO, Random).
- **Rilevamento e correzione degli errori:**
  - Bit di parità pari/dispari.
  - Distanza di Hamming.
  - **Hamming Code:** Calcolo dei bit di parità ridondanti, sindrome di errore, correzione di errori singoli (SEC - Single Error Correcting) e rilevamento errori doppi (DED).

### Modulo 6: Input/Output, Bus e Memorie Secondarie
- **Architettura e tipologie di bus:**
  - Bus sincroni (pilotati da clock comune) vs asincroni (protocolli di handshake)
  - Ampiezza dati e indirizzi, arbitraggio del bus (centralizzato con daisy chain o decentralizzato)
  - Esempi standard: ISA, PCI, PCI Express (PCIe a commutazione di pacchetto seriale punto-punto), USB.
- **Tecniche di trasferimento I/O:**
  - I/O programmato (Polling)
  - I/O pilotato da interrupt (Interrupt-driven, controllori vettorizzati di interrupt)
  - Direct Memory Access (DMA): canali DMA, modalità burst vs cycle stealing.
  - Mappatura degli spazi: Memory-Mapped I/O vs Isolated I/O (porte dedicate).
- **Memorie secondarie di massa:** Dischi magnetici (cilindri, tracce, settori, tempo di seek, latenza rotazionale, transfer rate), interfacce SCSI/IDE/SATA, configurazioni RAID (RAID 0 striping, RAID 1 mirroring, RAID 5 con parità distribuita), supporti a stato solido (SSD basati su celle NAND Flash).

### Modulo 7: Architettura e Programmazione Assembly ARM (ARM7)
- **Modello di programmazione ARM a 32 bit:**
  - Set di registri generali da `R0` a `R12`.
  - Registri speciali: `R13` (Stack Pointer - SP), `R14` (Link Register - LR), `R15` (Program Counter - PC).
  - Registro di stato CPSR (Current Program Status Register) e flag condizionali: `Z` (Zero), `N` (Negative), `C` (Carry), `V` (Overflow).
- **Esecuzione condizionale:** Suffissi condizionali su ogni istruzione (`EQ`, `NE`, `CS/HS`, `CC/LO`, `MI`, `PL`, `VS`, `VC`, `HI`, `LS`, `GE`, `LT`, `GT`, `LE`).
- **Barrel Shifter integrato:** Shift e rotazioni inline nell'operando (`LSL`, `LSR`, `ASR`, `ROR`).
- **Set di istruzioni operative:**
  - Spostamento dati e aritmetica: `MOV`, `MVN`, `ADD`, `SUB`, `RSB`, `MUL`.
  - Istruzioni logiche e di test: `AND`, `ORR`, `EOR`, `BIC`, `CMP`, `TST`, `TEQ`.
  - Accesso alla memoria: `LDR` (load) e `STR` (store) con modalità di indirizzamento offset immediato, registro, pre-indicizzato e post-indicizzato.
  - Controllo di flusso: Salti incondizionati (`B`), salti condizionali (`BGT`, `BLE`, `BEQ`, `BNE`), salti a subroutine (`BL` - Branch with Link) e ritorno via `BX LR` o ripristino di PC.
- **Struttura del codice sorgente:** Sezione `.data` (direttiva `.word` per array e costanti) e sezione di codice con punto di ingresso `.global _start`.

### Modulo 8: Architetture per il Calcolo Parallelo
- **Tassonomia di Flynn:** Sistemi SISD, SIMD (vettoriali e GPU), MISD, MIMD.
- **Multiprocessori (Shared Memory):** Architetture UMA (Uniform Memory Access, SMP su bus condiviso) e NUMA (Non-Uniform Memory Access); problematiche di coerenza delle cache (protocolli Snooping e Directory-based).
- **Multicomputer (Distributed Memory):** Sistemi a memoria distribuita, topologie di rete di interconnessione (ipercubo, mesh, toro), modello a passaggio di messaggi (Message Passing).
- **Virtualizzazione:** Hypervisor bare-metal (Tipo 1) vs hosted (Tipo 2), supporto hardware alla virtualizzazione.

### Modulo 9: Introduzione ai Sistemi Operativi (Modulo Esonero)
- **Concetto di Processo e Thread:** Struttura del processo in memoria, Process Control Block (PCB), transizioni di stato e Context Switch.
- **Algoritmi di Scheduling della CPU:**
  - Sistemi Batch: First-Come First-Served (FCFS), Shortest Job First (SJF), Shortest Remaining Time Next (SRTN).
  - Sistemi Interattivi: Round Robin (RR con quanto di tempo), Priority Scheduling, Lottery Scheduling, Shortest Process Next (SPN).
  - Sistemi Real-Time: Soft e Hard Real-Time, schedulabilità periodica.
- **Gestione della memoria fisica e allocazione dinamica:** Mappe di bit (Bitmap), liste concatenate di blocchi liberi; strategie di allocazione First Fit, Next Fit, Best Fit, Worst Fit; frammentazione interna ed esterna.
- **Memoria Virtuale e Paging:** Pagine virtuali, frame di pagina, Page Table, TLB, Page Fault.
- **Algoritmi di rimpiazzo delle pagine:**
  - Algoritmo Ottimo (OPT / Belady)
  - FIFO e anomalia di Belady
  - Second Chance e Algoritmo dell'Orologio (Clock)
  - Least Recently Used (LRU), Not Recently Used (NRU con bit R/M), Not Frequently Used (NFU), Aging (invecchiamento tramite shift register)
  - Working Set e WSClock.
- **Gestione dell'I/O su disco:** Algoritmi di accodamento delle richieste della testina: FCFS, Shortest Seek First (SSF), Algoritmo dell'Ascensore (SCAN / LOOK).

---

## Linguaggi, Strumenti e Tecnologie
- **Linguaggio Assemblativo ARM (ARM7 / ARMv4T):** Scrittura di programmi completi a basso livello con gestione di loop, array, salti condizionali e manipolazione dei registri.
- **Microcodice e IJVM (Mic-1):** Comprensione dei cicli di controllo hardware a microistruzioni.
- **Simulatori Architetturali:** Esecutori/debugger per il tracciamento del banco registri, flag CPSR e memoria (es. VisUAL, QEMU, GDB-multiarch).

---

## Tipologia Esercizi e Prove d'Esame
1. **Esercizi di Programmazione ARM:**
   - Scambio valori tra registri senza variabili ausiliarie.
   - Implementazione di operazioni aritmetiche complesse senza istruzioni dedicate (es. moltiplicazione o potenza intera tramite cicli additivi, divisione intera tramite sottrazioni ripetute).
   - Scansione, filtraggio e calcolo della somma/media degli elementi di un array in memoria (`.word`).
   - Implementazione di costrutti strutturati (if-then-else complessi, cicli while/for) con corretto uso di `CMP` e flag (`BGT`, `BLE`, `BNE`, ecc.).
2. **Esercizi sui Codici di Correzione Errori:**
   - Applicazione del codice di Hamming su parole di dati: calcolo delle posizioni delle parità (potenze di 2), determinazione dei bit di ridondanza, verifica della sindrome e correzione del singolo bit errato.
3. **Esercizi di Scheduling CPU:**
   - Tracciamento di diagrammi di Gantt e calcolo del tempo medio di attesa (Waiting Time) e di completamento (Turnaround Time) per carichi misti sotto FCFS, SJF, SRTN e Round Robin con vari quanti temporali.
4. **Esercizi di Gestione della Memoria e Paging:**
   - Simulazione del comportamento della memoria virtuale data una sequenza di riferimenti a pagine di memoria: conteggio dei Page Fault sotto algoritmi FIFO, LRU, Ottimo, Clock e Second Chance.
   - Allocazione di blocchi di memoria su liste libere mediante First Fit, Best Fit e Worst Fit.
5. **Esercizi di Scheduling su Disco:**
   - Calcolo del percorso totale della testina (spostamento in cilindri/tracce) a partire da una sequenza di richieste per algoritmi FCFS, SSTF e SCAN (Ascensore).
