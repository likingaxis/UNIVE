# Resoconto Corso: Logica e Reti Logiche

- **Anno:** 1° Anno Triennale
- **Area:** Logica Matematica, Sistemi Formali, Reti Logiche ed Elettronica Digitale
- **Riferimenti Didattici:** Appunti del corso (Parte 1: Logica Matematica; Parte 2: Reti Logiche e Circuiti Digitali)

---

## Obiettivi del Corso in Sintesi
Il corso offre una formazione integrata sul ragionamento formale e sulla progettazione circuitale digitale. Nella prima parte sviluppa gli strumenti della logica matematica (calcolo proposizionale e predicativo del primo ordine, soddisfacibilità e metodo di dimostrazione per refutazione mediante tableaux semantici). Nella seconda parte affronta la transizione verso il livello fisico-circuitale: codifica dei dati, aritmetica binaria e floating point, algebra di Boole, minimizzazione ottimale con mappe di Karnaugh e sintesi di circuiti combinatori e sequenziali sincroni (latch, flip-flop e macchine a stati finiti).

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### PARTE 1: Logica Matematica e Sistemi Formali

#### Modulo 1: Teoria degli Insiemi, Induzione e Logica Proposizionale
- **Fondamenti Insiemistici e Cardinalità:**
  - Concetto di insieme, cardinalità, insiemi finiti e infiniti numerabili ($\mathbb{N}, \mathbb{Z}, \mathbb{Q}$).
  - Non numerabilità del continuo ($\mathbb{R}$) e l'**argomento diagonale di Cantor**; gerarchia dei transfiniti.
- **Principio di Induzione Matematica:**
  - Induzione semplice (base dell'induzione e passo induttivo per $\forall n \ge 0$).
  - Induzione forte/completa e induzione strutturale su formule e alberi di derivazione.
- **Sintassi della Logica Proposizionale:**
  - Alfabeto proposizionale: variabili proposizionali ($P, Q, R, \dots$) e connettivi logici di base ($\neg, \land, \lor, \to, \leftrightarrow$).
  - Definizione induttiva delle Formule Ben Formate (FBF) e albero sintattico.
- **Semantica Proposizionale:**
  - Valutazioni booleane di verità ($v: \mathcal{P} \to \{0, 1\}$) e funzioni di verità dei connettivi.
  - Metodo delle **tabelle di verità** per determinare il valore di verità globale.
  - Classificazione semantica delle formule: **tautologie** (sempre vere), **contraddizioni** (sempre false), **contingenze** (falsificabili e soddisfacibili).
  - Equivalenze logiche notevoli: leggi di De Morgan, involuzione della negazione, distributività, idempotenza, assorbimento e riscrittura dell'implicazione ($A \to B \equiv \neg A \lor B$).

#### Modulo 2: Soddisfacibilità, Conseguenza Logica e Tableaux Semantici
- **Concetti Semantici Fondamentali:**
  - Soddisfacibilità (esistenza di almeno un modello) e problema SAT.
  - Validità logica ($\vDash \phi$) e relazione di conseguenza logica ($\Gamma \vDash \phi$).
  - Teorema di deduzione semantica: $\Gamma \cup \{\phi\} \vDash \psi \iff \Gamma \vDash (\phi \to \psi)$.
- **Metodo dei Tableaux Semantici Proposizionali:**
  - Procedura di refutazione per albero di derivazione: per dimostrare $\Gamma \vDash \phi$, si verifica l'insoddisfacibilità di $\Gamma \cup \{\neg \phi\}$.
  - Regole di espansione:
    - **Regole $\alpha$ (congiuntive / lineari):** aggiunta deterministica di formule sullo stesso ramo (es. $\phi \land \psi \implies \phi, \psi$).
    - **Regole $\beta$ (disgiuntive / di ramificazione):** biforcazione del ramo in due alternative (es. $\phi \lor \psi \implies \phi \mid \psi$).
  - Condizione di chiusura del ramo: presenza contemporanea di un letterale e della sua negazione atomica ($P$ e $\neg P$).
  - Albero chiuso (contraddizione trovata, formula dimostrata) vs albero aperto (fornisce un contromodello esplicito).

#### Modulo 3: Sistemi Assiomatici e Teoria della Dimostrazione
- **Sistemi Formali di Derivazione:**
  - Concetto di assioma, regole di inferenza (Modus Ponens) e derivabilità sintattica ($\Gamma \vdash \phi$).
  - Panoramica comparativa dei sistemi deduttivi: sistemi assiomatici alla Hilbert, Calcolo dei Sequenti di Gentzen, Deduzione Naturale.
- **Proprietà Metamatematiche dei Calcoli Logici:**
  - **Teorema di Correttezza (Soundness):** Tutto ciò che è sintatticamente dimostrabile è semanticamente valido ($\Gamma \vdash \phi \implies \Gamma \vDash \phi$).
  - **Teorema di Completezza (Completeness):** Tutto ciò che è semanticamente valido è sintatticamente dimostrabile ($\Gamma \vDash \phi \implies \Gamma \vdash \phi$).

#### Modulo 4: Logica del Primo Ordine (Calcolo dei Predicati)
- **Sintassi del Primo Ordine:**
  - Alfabeto: variabili individuali ($x, y, z$), costanti ($c$), simboli di funzione $f(x)$ e simboli di predicato/relazione $P(x, y)$.
  - Quantificatore universale ($\forall$) e quantificatore esistenziale ($\exists$).
  - Nozione di termine, atomo e formula ben formata del prim'ordine.
  - Variabili libere e variabili vincolate (scope dei quantificatori), formule chiuse (enunciati/sentenze).
- **Semantica del Primo Ordine:**
  - Strutture di interpretazione $\mathcal{M} = (D, \mathcal{I})$: dominio non vuoto $D$, interpretazione delle costanti, funzioni e relazioni.
  - Assegnamento di variabili e soddisfazione di una formula in un modello ($\mathcal{M}, \sigma \vDash \phi$).
- **Tableaux Semantici per il Primo Ordine:**
  - Regole $\gamma$ (universali): $\forall x \, \phi(x) \implies \phi(t)$ per qualsiasi termine $t$ già presente.
  - Regole $\delta$ (esistenziali): $\exists x \, \phi(x) \implies \phi(c)$ con introduzione obbligatoria di un nuovo parametro/costante fresca (Skolemizzazione).
- **Teoremi Cardine e Limiti della Computazione:**
  - Teorema di Compattezza della logica del primo ordine.
  - Cenni ai Teoremi di Incompletezza di Gödel e indecidibilità della logica al prim'ordine (Teorema di Church-Turing).

---

### PARTE 2: Reti Logiche e Circuiti Digitali

#### Modulo 5: Sistemi di Numerazione e Rappresentazione dei Dati
- **Sistemi di Numerazione Posizionali:**
  - Basi binaria (base 2), ottale (base 8), decimale (base 10) ed esadecimale (base 16).
  - Algoritmi di conversione tra basi intere e frazionarie: metodo delle divisioni successive e moltiplicazioni successive; conversione diretta per raggruppamento bit ($2^3$ e $2^4$).
- **Rappresentazione dei Numeri Interi con Segno:**
  - Modulo e segno: limiti e doppio zero ($+0$ e $-0$).
  - Complemento a uno.
  - **Complemento a due (C2):**
    - Rappresentazione asimmetrica su $N$ bit (intervallo $[-2^{N-1}, 2^{N-1}-1]$).
    - Regola di inversione di segno: complementazione bit a bit e addizione di $1$.
    - Estensione del segno per allineamento a parole di dimensione superiore.
    - Addizione e sottrazione in complemento a due; regola di rilevamento del **trabocco (overflow)**: confronto tra i riporti entrante e uscente dal bit di segno ($C_{in} \neq C_{out}$).
- **Rappresentazione dei Numeri in Virgola Mobile (Standard IEEE 754):**
  - Formato a singola precisione (32 bit: 1 bit segno, 8 bit esponente polarizzato con bias $+127$, 23 bit frazione/mantissa).
  - Formato a doppia precisione (64 bit: 1 bit segno, 11 bit esponente con bias $+1023$, 52 bit frazione).
  - Forma normalizzata con bit nascosto implicito ($1.m$).
  - Configurazioni speciali: rappresentazione dello Zero, valori infiniti ($+\infty, -\infty$), valori non numerici (NaN) e numeri denormalizzati per underflow graduale.

#### Modulo 6: Algebra Booleana e Minimizzazione con Mappe di Karnaugh
- **Algebra di Boole e Porte Logiche:**
  - Operatori e assiomi di Boole; porte logiche elementari AND, OR, NOT, XOR, XNOR.
  - Universalità delle porte logiche funzionalmente complete NAND e NOR.
- **Forme Canoniche:**
  - Mintermini ($m_i$) e forma canonica Somma di Prodotti (SP / SOP).
  - Maxtermini ($M_i$) e forma canonica Prodotto di Somme (PS / POS).
- **Codici Ciclici e Codice Gray:**
  - Proprietà del codice Gray: distanza di Hamming unitaria tra configurazioni consecutive.
  - Conversione da binario puro a Gray e viceversa.
- **Mappe di Karnaugh (K-Maps):**
  - Rappresentazione tabellare a 2, 3 e 4 variabili basata sull'ordinamento Gray degli assi.
  - Raggruppamento di celle adiacenti adiacenti contenenti '1' in potenze di 2 ($1, 2, 4, 8, 16$).
  - Individuazione di implicanti, implicanti primi e implicanti primi essenziali per la minimizzazione SP e PS.
  - Gestione delle condizioni di indifferenza (**don't care**, indicate con $X$ o $d$).

#### Modulo 7: Circuiti Combinatori Standard
- **Circuiti Aritmetici:**
  - **Half Adder:** addizione di 2 bit ($S = A \oplus B$, $C = A \cdot B$).
  - **Full Adder:** addizione di 3 bit con riporto in ingresso ($C_{in}$).
  - **Ripple Carry Adder:** concatenazione di $N$ stadi Full Adder e ritardo di propagazione del riporto.
  - Circuiti sottrattori e additori/sottrattori configurabili tramite XOR e complemento a due.
- **Componenti Logici di Commutazione e Instradamento:**
  - **Multiplexer (MUX):** selezione di uno tra $2^n$ canali di ingresso su un'unica uscita tramite $n$ linee di controllo.
  - **Demultiplexer (DEMUX):** instradamento di un singolo ingresso su una tra $2^n$ uscite.
  - **Decoder:** attivazione di una tra $2^n$ uscite in base a un codice di ingresso a $n$ bit, con linea di abilitazione (Enable).
  - **Encoder ed Encoder con Priorità (Priority Encoder):** generazione del codice binario corrispondente all'ingresso attivo a più alta priorità.
  - Comparatori binari di uguaglianza e magnitudo.

#### Modulo 8: Circuiti Sequenziali ed Elementi di Memoria
- **Concetto di Circuito Sequenziale:** Dipendenza dell'uscita non solo dagli ingressi attuali ma dalla storia passata del circuito (stato interno memorizzato).
- **Elementi Bistabili Asincroni (Latch):**
  - **Latch SR:** struttura con porte NOR incrociate o NAND incrociate; tabelle di verità, stati stabili di Set e Reset, stato proibito/indeterminato ($S=R=1$ per NOR).
  - **Latch D Trasparente:** controllo di livello tramite ingresso di clock/enable; eliminazione dello stato proibito.
- **Elementi Bistabili Sincroni (Flip-Flop):**
  - Meccanismo di campionamento impulsivo (Edge-Triggered) sul fronte di salita o di discesa del clock.
  - **Flip-Flop D:** memorizzazione del dato al fronte di clock ($Q_{next} = D$).
  - **Flip-Flop JK:** comportamento universale (Set, Reset, Hold e Toggle per $J=K=1$).
  - **Flip-Flop T:** inversione periodica dello stato ad ogni impulso di clock.
  - Segnali ausiliari asincroni: Preset e Clear prioritari indipendenti dal clock.
  - Registri di memorizzazione a $N$ bit e contatori binari asincroni (ripple) e sincroni.

#### Modulo 9: Macchine a Stati Finiti (FSM)
- **Modelli Computazionali di FSM Sincrona:**
  - Definizione formale: tupla $(I, O, S, s_0, \delta, \lambda)$ con alfabeti di ingresso/uscita, stati, transizione di stato ($\delta: S \times I \to S$) e funzione di uscita ($\lambda$).
- **Confronto tra Modello di Moore e Modello di Mealy:**
  - **Macchina di Moore:** L'uscita dipende esclusivamente dallo stato presente ($O = \lambda(S)$). Uscite stabili e sincronizzate col clock.
  - **Macchina di Mealy:** L'uscita dipende sia dallo stato presente sia dagli ingressi attuali ($O = \lambda(S, I)$). Reazione immediata agli ingressi nello stesso ciclo di clock.
- **Procedura di Progettazione e Sintesi di una FSM:**
  1. Specifica comportamentale e tracciamento del **diagramma delle transizioni di stato** (State Diagram).
  2. Costruzione della **tabella degli stati** (State Table con stato presente, ingressi, stato prossimo, uscite).
  3. Codifica binaria degli stati (es. codifica minima con $\lceil \log_2 N \rceil$ flip-flop o codifica One-Hot).
  4. Scelta dei flip-flop di memoria (tipicamente Flip-Flop D o JK).
  5. Derivazione delle equazioni di stato prossimo e di uscita mediante minimizzazione con Mappe di Karnaugh.
  6. Disegno dello schema logico finale composto dalla rete combinatoria di stato prossimo, banco flip-flop e rete combinatoria delle uscite.

---

## Linguaggi, Strumenti e Tecnologie
- **Notazione Logica Formale:** Calcolo proposizionale e dei predicati, alberi di tableaux semantici.
- **Mappe di Karnaugh e Algebra di Boole:** Metodologia standard per la semplificazione e minimizzazione manuale di reti combinatorie.
- **Schemi Elettrici Digitali e Simbologia IEEE/ANSI:** Porte logiche, blocchi combinatori (MUX, Decoder, ALU) e registri sequenziali.

---

## Tipologia Esercizi e Prove d'Esame
1. **Esercizi di Logica Proposizionale:**
   - Verifica di equivalenze logiche e tautologie tramite tabelle di verità complete e manipolazione assiomatica.
2. **Esercizi con Tableaux Semantici:**
   - Dimostrazione per refutazione di validità logica o soddisfacibilità di formule proposizionali e del primo ordine (gestione delle regole $\alpha, \beta, \gamma, \delta$, corretta introduzione di costanti fresche e chiusura di tutti i rami).
3. **Esercizi di Rappresentazione Numerica e Aritmetica:**
   - Esecuzione di conversioni di base (decimale ad esadecimale e binario con parte frazionaria).
   - Somme e sottrazioni algebriche in complemento a due su $N$ bit, con verifica analitica del trabocco (overflow).
   - Codifica di numeri reali nel formato standard IEEE 754 a singola precisione (calcolo di segno, esponente biased ed estrazione dei bit di mantissa) e decodifica inversa.
4. **Esercizi di Minimizzazione con Mappe di Karnaugh:**
   - Data una funzione logica espressa come lista di mintermini/maxtermini con condizioni di indifferenza, posizionamento su mappa a 4 variabili, raggruppamento ottimale ed estrazione della forma minima SP o PS.
5. **Esercizi di Sintesi di Reti Combinatorie:**
   - Realizzazione di una funzione logica arbitraria utilizzando esclusivamente porte NAND/NOR o mediante un multiplexer opportunamente configurato e decoder.
6. **Esercizi di Sintesi di Macchine a Stati Finiti (FSM):**
   - Progettazione completa da specifica testuale (es. rilevatore di sequenze di bit sovrapposte o non sovrapposte, controllore sequenziale): disegno del grafo di Moore o Mealy, compilazione della tabella di transizione, codifica degli stati, minimizzazione delle equazioni per i Flip-Flop di tipo D e tracciamento del circuito finale.
