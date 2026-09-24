# Resoconto Corso: Ricerca Operativa

- **Anno:** 2° Anno Triennale
- **Area:** Ottimizzazione Matematica e Modellazione Decisionale (MAT/09)
- **Crediti/Collocazione:** Insegnamento fondamentale per lo studio della programmazione lineare continua e intera, la teoria della dualità e gli algoritmi di ottimizzazione esatta

---

## Obiettivi del Corso in Sintesi

Il corso fornisce gli strumenti matematici, algoritmici e computazionali per modellare e risolvere problemi decisionali complessi mediante la Programmazione Lineare (PL) e la Programmazione Lineare Intera (PLI). Lo studente acquisisce competenze approfondite su:
1. **Modellazione matematica formale:** tradurre requisiti operativi, logistici ed economici in funzioni obiettivo e sistemi di vincoli lineari.
2. **Geometria e algebra della programmazione lineare:** comprendere la struttura geometrica dei poliedri, i vertici della regione ammissibile e la loro corrispondenza algebrica biunivoca con le Soluzioni di Base Ammissibili (SBA).
3. **Teoria della Dualità e condizioni di ottimalità:** padroneggiare la trasformazione primale-duale, i teoremi di dualità debole e forte, e le condizioni di complementarietà (scarti complementari) per la certificazione dell'ottimalità.
4. **Algoritmi di risoluzione esatta:** eseguire passo-passo l'algoritmo del Simplesso primale (tableau), il Simplesso a due fasi per basi iniziali non ammissibili, e il Simplesso primale-duale.
5. **Strumenti software di ottimizzazione:** formulare modelli astratti e istanze dati tramite linguaggi di modellazione dedicati (AMPL) e interfacciarsi con solutori professionali (CPLEX, Gurobi, GLPK).

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### 1. Modellazione Matematica e Geometria della Programmazione Lineare
- **Formulazione del Problema di Programmazione Lineare (PL):**
  - Componenti del modello: variabili decisionali ($x_1, x_2, \dots, x_n$), funzione obiettivo lineare (minimizzazione o massimizzazione), vincoli lineari di disuguaglianza ($\le, \ge$) e di uguaglianza ($=$).
  - Vincoli di segno: variabili non negative ($x_j \ge 0$), non positive ($x_j \le 0$) o libere ($x_j \in \mathbb{R}$).
- **Forma Canonica e Forma Standard:**
  - Definizione della Forma Standard:
    $$\min c^T x \quad \text{sotto i vincoli} \quad Ax = b, \quad x \ge 0$$
  - Tecniche sistematiche di conversione in forma standard:
    - Trasformazione di massimizzazione in minimizzazione: $\max z \iff \min -z$.
    - Introduzione di variabili di scarto (slack, non negative con segno positivo) per vincoli $\le$.
    - Introduzione di variabili di surplus (non negative con segno negativo) per vincoli $\ge$.
    - Gestione delle variabili libere in segno $x_j$: sostituzione con la differenza di due variabili non negative $x_j = x_j^+ - x_j^-$ con $x_j^+, x_j^- \ge 0$.
    - Trattamento dei termini noti negativi ($b_i < 0$): moltiplicazione dell'equazione per $-1$.
- **Geometria della Programmazione Lineare:**
  - Definizioni topologiche: insiemi convessi, iperpiani di supporto ($a^T x = \beta$), semispazi chiusi ($a^T x \le \beta$).
  - Poliedri: intersezione finita di semispazi chiusi $P = \{x \in \mathbb{R}^n \mid Ax \le b\}$.
  - Politopi: poliedri convessi limitati (compattezza).
  - Vertici, punti estremi e direzioni di recessione (raggi estremi del cono recessivo).
  - **Teorema Fondamentale della Programmazione Lineare:** se un problema di PL ammette una regione ammissibile non vuota e funzione obiettivo limitata superiormente/inferiormente, allora esiste sempre almeno un vertice del poliedro che è soluzione ottima.
- **Algebra delle Soluzioni di Base e Vertici:**
  - Partizione della matrice dei vincoli $A$ ($m \times n$ con rango massimo $m$): $A = [B \mid N]$, dove $B$ è una sottomatrice quadrata $m \times m$ non singolare (la **Base**) e $N$ è la sottomatrice delle colonne non di base ($m \times (n-m)$).
  - Vettore delle variabili: partizionato in variabili di base $x_B$ e variabili fuori base $x_N$.
  - Definizione di **Soluzione di Base (SB):** ponendo le variabili fuori base a zero ($x_N = 0$), le variabili di base sono determinate univocamente dal sistema:
    $$x_B = B^{-1}b$$
  - **Soluzione di Base Ammissibile (SBA):** soluzione di base in cui tutte le variabili di base soddisfano i vincoli di non negatività ($x_B \ge 0$).
  - **Teorema di equivalenza:** una soluzione $x$ è un vertice della regione ammissibile $P = \{x \mid Ax = b, x \ge 0\}$ se e solo se è una Soluzione di Base Ammissibile.
  - Basi Degeneri: soluzioni di base in cui almeno una variabile di base assume valore nullo ($x_{B,i} = 0$).

### 2. Teoria della Dualità nella Programmazione Lineare
- **Definizione e Costruzione del Problema Duale:**
  - Associazione di una variabile duale $y_i$ a ciascun vincolo primale $i$, e di un vincolo duale $j$ a ciascuna variabile primale $x_j$.
  - Trasposizione della matrice dei coefficienti tecnologici ($A \to A^T$), inversione di ruolo tra vettore dei costi $c$ e vettore dei termini noti $b$.
  - **Regole di conversione sistematica Primale-Duale:**
    | Problema Primale (Minimo) | Problema Duale (Massimo) |
    | :--- | :--- |
    | $i$-esimo vincolo con $\ge$ | $i$-esima variabile duale $y_i \ge 0$ |
    | $i$-esimo vincolo con $\le$ | $i$-esima variabile duale $y_i \le 0$ |
    | $i$-esimo vincolo con $=$ | $i$-esima variabile duale $y_i \in \mathbb{R}$ (libera) |
    | $j$-esima variabile $x_j \ge 0$ | $j$-esimo vincolo duale con $\le$ |
    | $j$-esima variabile $x_j \le 0$ | $j$-esimo vincolo duale con $\ge$ |
    | $j$-esima variabile $x_j \in \mathbb{R}$ (libera) | $j$-esimo vincolo duale con $=$ |
- **Teorema della Dualità Debole:**
  - Per ogni soluzione ammissibile $x$ del primale ($\min c^T x$) e ogni soluzione ammissibile $y$ del duale ($\max b^T y$), vale:
    $$c^T x \ge b^T y$$
  - Corollario di limitatezza: ogni soluzione duale ammissibile fornisce un lower bound per il primale.
  - Corollario di ottimalità: se per una coppia di soluzioni ammissibili $(x^*, y^*)$ si verifica l'uguaglianza $c^T x^* = b^T y^*$, allora $x^*$ è ottima per il primale e $y^*$ è ottima per il duale.
  - Corollario di illimitatezza: se il primale è illimitato inferiormente ($z \to -\infty$), il duale è inammissibile; se il duale è illimitato superiormente ($w \to +\infty$), il primale è inammissibile.
- **Teorema della Dualità Forte:**
  - Se uno tra il problema primale e il problema duale ammette una soluzione ottima finita, allora anche l'altro ammette una soluzione ottima finita e i due valori ottimi coincidono:
    $$c^T x^* = b^T y^*$$
- **Condizioni di Complementarietà (Teorema degli Scarti Complementari):**
  - Condizione necessaria e sufficiente affinché $x$ ammissibile al primale e $y$ ammissibile al duale siano soluzioni ottime:
    $$\begin{cases}
    x_j \cdot (A^T y - c)_j = 0 & \forall j = 1, \dots, n \\
    y_i \cdot (Ax - b)_i = 0 & \forall i = 1, \dots, m
    \end{cases}$$
  - Significato algebrico e geometrico:
    - Se una variabile primale è strettamente positiva ($x_j > 0$), il vincolo duale corrispondente deve essere saturato all'uguaglianza ($A_j^T y = c_j$).
    - Se un vincolo duale è disattivo / a disuguaglianza stretta, la corrispondente variabile primale deve essere nulla ($x_j = 0$).
    - Se un vincolo primale presenta scarto non nullo ($Ax - b \neq 0$), la relativa variabile duale (prezzo ombra) deve essere nulla ($y_i = 0$).
  - Applicazione pratica: certificazione dell'ottimalità di vettori candidati senza dover eseguire il simplesso da zero, impostando e risolvendo il sistema lineare delle condizioni attive.

### 3. L'Algoritmo del Simplesso (Primal Simplex)
- **Principio dell'Algoritmo:**
  - Visita iterativa di vertici adiacenti del poliedro ammissibile lungo spigoli che migliorano strettamente (o lasciano invariata, in caso di degenerazione) la funzione obiettivo.
- **Tableau del Simplesso:**
  - Disposizione tabellare standard per l'aggiornamento simultaneo delle equazioni dei vincoli e dei costi ridotti:
    | Base | $x_B$ | $x_N$ | Termini Noti ($b$) |
    | :---: | :---: | :---: | :---: |
    | $-z$ | $0$ | $\bar{c}_N^T = c_N^T - c_B^T B^{-1} N$ | $-z_0 = -c_B^T B^{-1} b$ |
    | $x_B$ | $I$ | $B^{-1}N$ | $\bar{b} = B^{-1}b$ |
- **Criterio di Ottimalità (Costi Ridotti):**
  - Per problemi di minimo: se tutti i costi ridotti $\bar{c}_j \ge 0$, la base corrente è ottima.
  - Per problemi di massimo: se tutti i costi ridotti $\bar{c}_j \le 0$, la base corrente è ottima.
- **Scelta della Colonna Pivot (Variabile Entrante):**
  - Regola classica di Dantzig: si sceglie la variabile non di base $x_h$ con il costo ridotto più negativo (per un problema di minimo): $h = \arg\min \{ \bar{c}_j \mid \bar{c}_j < 0 \}$.
  - Prevenzione del ciclo infinito su basi degeneri: Regola di Bland (scelta dell'indice più piccolo tra quelli candidati).
- **Scelta della Riga Pivot (Test del Rapporto Minimo / Variabile Uscente):**
  - Individuazione della massima ampiezza del passo mantenendo la non negatività delle variabili di base:
    $$\theta = \min_{i: \bar{a}_{ih} > 0} \left\{ \frac{\bar{b}_i}{\bar{a}_{ih}} \right\}$$
  - La variabile associata alla riga che realizza il minimo esce dalla base.
  - Test di illimitatezza: se tutti i coefficienti della colonna pivot sono minori o uguali a zero ($\bar{a}_{ih} \le 0 \ \forall i$), la funzione obiettivo è illimitata lungo la direzione considerata ($z \to -\infty$).
- **Operazione di Pivot di Gauss-Jordan:**
  - Normalizzazione della riga pivot dividendo tutti i coefficienti per l'elemento pivot $\bar{a}_{kh}$.
  - Eliminazione gaussiana su tutte le altre righe (compresa la riga dei costi ridotti $-z$) per ricreare la colonna identità canonica.

### 4. Varianti Avanzate del Simplesso
- **Algoritmo del Simplesso a Due Fasi (Two-Phase Simplex):**
  - Motivazione: assenza di una base ammissibile evidente (ad esempio presenza di vincoli con $\ge$ o $=$ con termini noti positivi che generano slack con coefficiente $-1$ non ammissibili nell'origine).
  - **Fase 1 (Ricerca della SBA iniziale):**
    - Aggiunta di una variabile artificiale non negativa $a_i \ge 0$ a ciascun vincolo privo di variabile di base canonica.
    - Definizione del problema ausiliario di Fase 1 con funzione obiettivo artificiale:
      $$\min W = \sum_{i} a_i$$
    - Riscrittura della riga dei costi ridotti di $W$ eliminando i coefficienti delle variabili artificiali mediante combinazione lineare con i vincoli.
    - Risoluzione con il Simplesso ordinario.
    - Analisi del risultato della Fase 1:
      - Se $W^* > 0$: il problema originario è **inammissibile** (regione ammissibile vuota, non è possibile azzerare le variabili artificiali).
      - Se $W^* = 0$: è stata identificata una Soluzione di Base Ammissibile per il problema originario.
  - **Transizione alla Fase 2:**
    - Rimozione delle colonne corrispondenti alle variabili artificiali.
    - Ripristino della funzione obiettivo originaria $z = c^T x$.
    - Ricalcolo della riga dei costi ridotti $\bar{c}$ per la base ammissibile identificata.
  - **Fase 2 (Ricerca della Soluzione Ottima):**
    - Esecuzione del Simplesso standard a partire dalla SBA fino al raggiungimento del criterio di arresto (ottimo o illimitatezza).
- **Algoritmo del Simplesso Primale-Duale:**
  - Strategia risolutiva: avanzamento partendo da una soluzione duale ammissibile $y$ (anche non ottima).
  - Individuazione del sottoinsieme dei vincoli duali attivi all'uguaglianza ($A_j^T y = c_j$).
  - Formulazione del **Primale Ristretto (Restricted Primal):**
    - Vengono poste a zero tutte le variabili primali $x_j$ i cui corrispondenti vincoli duali non sono attivi ($x_j = 0$).
    - Vengono aggiunte variabili artificiali $a_i$ ai vincoli primali, con funzione obiettivo $\min \xi = \sum a_i$.
    - Tableau del primale ristretto e risoluzione via simplesso.
  - Esito del primale ristretto:
    - Se $\xi^* = 0$: la soluzione $y$ era già ottima per il duale e la soluzione trovata è la soluzione ottima primale.
    - Se $\xi^* > 0$: la soluzione duale $y$ non è ottima; dal tableau finale del primale ristretto (o dal suo duale) si ricava un vettore di direzione $\pi$ (costituito dai moltiplicatori delle variabili artificiali rimaste a sinistra nel tableau).
  - Aggiornamento della soluzione duale: $y^{k+1} = y^k + \theta \pi$.
  - Determinazione del passo $\theta > 0$ mediante grafico dei segni e test del rapporto massimo consentito per mantenere l'ammissibilità sui vincoli duali non attivi:
    $$\theta = \min_{j: A_j^T \pi > 0} \left\{ \frac{c_j - A_j^T y}{A_j^T \pi} \right\}$$
  - Ricalcolo del primale ristretto sulla nuova base duale e iterazione fino a convergenza.

### 5. Linguaggi di Modellazione e Solutori (AMPL e Solver)
- **Separazione concettuale nella modellazione al calcolatore:**
  - Modello astratto (`.mod`): definizione di insiemi, parametri, variabili decisionali, vincoli e funzione obiettivo in forma parametrica e scalabile.
  - Istanza dati (`.dat`): assegnazione dei valori numerici specifici per matrici, vettori di domanda, costi e capacità.
  - Script di comando (`.run`): direttive di caricamento (`model`, `data`), selezione del solutore (`option solver`), risoluzione (`solve`) e visualizzazione dei risultati (`display`).
- **Linguaggio di Modellazione AMPL (A Mathematical Programming Language):**
  - Dichiarazione di insiemi: `set NODI;`, `set ARCHI within {NODI, NODI};`.
  - Parametri e matrici: `param costo {ARCHI} >= 0;`, `param capacita {ARCHI};`.
  - Variabili decisionali e vincoli di dominio: `var x {ARCHI} >= 0;`, variabili binarie `binary`, variabili intere `integer`.
  - Funzione obiettivo: `minimize CostoTotale: sum {(i,j) in ARCHI} costo[i,j] * x[i,j];`.
  - Vincoli con quantificatori: `subject to Bilanciamento {i in NODI}: sum {(i,j) in ARCHI} x[i,j] - sum {(j,i) in ARCHI} x[j,i] = domanda[i];`.
- **Interazione con Solutori Esterni:**
  - Utilizzo di solver state-of-the-art: **CPLEX**, **Gurobi**, **GLPK** (`glpsol`), **CBC**.
  - Interpretazione dei file di output e variabili di sistema: valore di ottimo della funzione obiettivo, valori delle variabili (`x`), costi ridotti (`x.rc`), moltiplicatori di Lagrange / prezzi ombra dei vincoli (`vincolo.dual`), scarti (`vincolo.slack`).

---

## Linguaggi, Strumenti e Tecnologie

- **Linguaggio di Modellazione:** **AMPL** (A Mathematical Programming Language).
- **Solutori Matematici (Solver):** **CPLEX**, **Gurobi Optimizer**, **GLPK (GNU Linear Programming Kit)**, **CBC (Coin-or branch and cut)**.
- **Metodi Computazionali:** Algebra lineare esatta in frazioni per la compilazione dei Tableau, eliminazione gaussiana di Gauss-Jordan per le operazioni di pivot.

---

## Tipologia Esercizi e Prove d'Esame

La prova d'esame e le sessioni di esercitazione verificano la padronanza analitica attraverso esercizi quantitativi rigorosi (da svolgere con calcolo frazionario esatto) e problemi di modellazione:
1. **Verifica di Soluzione di Base Ammissibile (SBA):**
   - Dato un vettore $x$, verificare se è ammissibile per il problema di PL.
   - Conversione in forma standard e calcolo dei valori delle variabili di slack/surplus.
   - Determinazione del numero di componenti non nulle e confronto con il rango $m$ della matrice dei vincoli; verifica dell'indipendenza lineare delle colonne associate alle variabili positive per confermare la natura di vertice / SBA.
2. **Determinazione di Vertici con Variabili Strettamente Positive:**
   - Ricerca di un vertice del poliedro avente prefissate variabili strettamente positive ($x_1 > 0, x_2 > 0$) e le rimanenti a zero.
   - Isolamento del sistema lineare quadrato sulle colonne scelte, risoluzione e verifica del soddisfacimento di tutti i vincoli di segno e di disuguaglianza.
3. **Analisi di Esistenza di Basi Ottime e Dualità:**
   - Determinare se può esistere una soluzione ottima avente una determinata variabile $x_k$ in base o con determinate variabili strettamente positive.
   - Costruzione del problema duale associato, applicazione delle condizioni di complementarietà e analisi di compatibilità del sistema duale risultante (rilevamento di eventuali contraddizioni sui segni delle variabili duali $y$).
4. **Applicazione degli Scarti Complementari:**
   - Dato un vettore ammissibile $x^*$, impostare il sistema delle condizioni di complementarietà primale-duale $x_j (A^T y - c)_j = 0$ e $y_i (Ax - b)_i = 0$.
   - Risolvere per le variabili duali $y_i$, verificare l'ammissibilità del vettore $y$ ottenuto rispetto ai vincoli del problema duale e accertare l'uguaglianza dei valori delle rispettive funzioni obiettivo ($c^T x^* = b^T y^*$).
5. **Algoritmo del Simplesso Manuale:**
   - Compilazione del Tableau iniziale in forma standard.
   - Individuazione della colonna pivot (costo ridotto minimo negativo per min), applicazione del test del rapporto minimo per la riga pivot, esecuzione delle operazioni di riga con frazioni esatte.
   - Lettura della soluzione ottima finale, delle variabili di base e del valore ottimo di funzione obiettivo.
6. **Algoritmo del Simplesso a Due Fasi:**
   - Riconoscimento dell'impossibilità di usare l'origine come base ammissibile iniziale.
   - Formulazione della Fase 1 con variabili artificiali $a_i$ e obiettivo ausiliario $\min W = \sum a_i$.
   - Risoluzione della Fase 1, verifica dell'ammissibilità ($W^* = 0$), transizione alla Fase 2 ripristinando i costi originali e completamento dell'ottimizzazione.
7. **Algoritmo del Simplesso Primale-Duale:**
   - Risoluzione passo-passo a partire da un vettore duale iniziale $y^0$ ammissibile.
   - Tableau del primale ristretto con variabili artificiali, estrazione della direzione $\pi$, calcolo del passo ottimo $\Theta$ mediante grafico delle intersezioni dei segni e aggiornamento della base duale $y^1 = y^0 + \Theta \pi$.
8. **Modellazione e Risoluzione in AMPL:**
   - Stesura del modello astratto concettuale `.mod` (insiemi, parametri, variabili, vincoli e obiettivo) per problemi di pianificazione della produzione, trasporto, miscelazione o flusso su rete.
   - Redazione del file dati `.dat` e script `.run` per la risoluzione tramite solutore (GLPK/CPLEX) e interpretazione delle variabili duali fornite dal report di output.
