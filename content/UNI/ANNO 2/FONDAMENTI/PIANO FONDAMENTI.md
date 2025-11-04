Certamente! Ecco una lista completa e strutturata di tutti gli argomenti trattati nelle lezioni, pensata per guidarti nello studio per l'esame. Ho incluso ogni dettaglio, evidenziando le parti da approfondire sulle dispense e usando emoji per rendere la lettura più chiara e piacevole.

---

### 🏛️ **Parte 1: Grammatiche, Linguaggi Regolari e Automi**

Questa sezione introduce le fondamenta della teoria, partendo dalle grammatiche più semplici e dai modelli di calcolo corrispondenti.

#### **Lezione 19: Grammatiche Regolari** 📜
*   **Introduzione ai Linguaggi di Programmazione**:
    *   I linguaggi di programmazione sono "grosso modo" linguaggi di tipo 2 (context-free).
    *   Le componenti *lessicali* (nomi di variabili, parole chiave) sono descritte da grammatiche di tipo 3 (regolari).
    *   L'analisi lessicale si basa su grammatiche di tipo 3.
*   **Grammatiche di Tipo 3 (Regolari)**:
    *   Definizione formale: produzioni della forma `A → a` o `A → aB`.
    *   I linguaggi generati sono detti **linguaggi regolari**.
    *   Esempio di grammatica e linguaggio generato: `L(G) = {a^h b^k : h ≥ 1 ∧ k ≥ 2}`.
*   **Pumping Lemma per i Linguaggi Regolari** ⛽:
    *   Enunciato: una proprietà (condizione necessaria) soddisfatta da tutti i linguaggi regolari.
    *   Utilizzo "al negativo": si usa per dimostrare che un linguaggio **non** è regolare.
    *   Esempio di dimostrazione: il linguaggio `L = {a^n b^n : n ≥ 1}` non è regolare.
*   **Automi a Stati Finiti (ASF)** 🤖:
    *   Modello di calcolo che decide i linguaggi regolari.
    *   Relazione con le Macchine di Turing (strettamente meno potenti).
    *   **Automa a Stati Finiti Deterministico (ASFD)**:
        *   Definizione formale: quintupla `⟨Σ, Q, q0, QF, δ⟩`.
        *   Funzione di transizione `δ`, tabella di transizione e diagramma degli stati.
        *   Computazione: configurazione `(q, x)`, transizione `⊢`, funzione estesa `δ*`.
        *   Concetti di **accettazione** e **rigetto**.
        *   Esempio di costruzione di un ASFD per il linguaggio `L = {a^n b : n ≥ 0}`.
*   **Equivalenza tra Modelli**:
    *   **Macchina di Turing vs ASFD**: come tradurre un ASFD in una MdT equivalente.
    *   👑 **Equivalenza Fondamentale**: La classe dei linguaggi regolari coincide con la classe dei linguaggi decisi da ASFD.
        *   **Dimostrazione in 4 Passi**:
            1.  `PASSO 1`: Da ASFD a Grammatica Regolare (Teorema G.14).
            2.  `PASSO 2`: Introduzione degli **Automi a Stati Finiti Non Deterministici (ASFND)**.
            3.  `PASSO 3`: Da Grammatica Regolare a ASFND (Teorema G.15).
            4.  `PASSO 4`: Da ASFND a ASFD (Costruzione dei sottoinsiemi - Teorema G.16).
*   **Proprietà dei Linguaggi Regolari**:
    *   **Proprietà di chiusura**: Unione, Complemento, Intersezione.
*   **Espressioni Regolari**:
    *   Definizione, sintassi e linguaggio associato.
    *   👑 **Teorema G.18**: Un linguaggio è generato da una grammatica di tipo 3 se e solo se è definito da un'espressione regolare.
*   **Gerarchia di Chomsky (Riepilogo)**: `G3 ⊂ G2 ⊂ G1 ⊂ G0`.

---

### 🥞 **Parte 2: Grammatiche Context-Free e Automi a Pila**

Qui si sale di livello nella gerarchia di Chomsky, esplorando grammatiche più potenti e la loro connessione con gli automi a pila.

#### **Lezione 18: Automi a Pila e Ambiguità**
*   **Grammatiche di tipo 2 (Context-Free)**:
    *   **Automi a Pila (PDA)**: il modello di calcolo per i linguaggi context-free.
    *   Equivalenza tra accettazione per pila vuota e per stato finale (Teorema G.10).
    *   👑 **Teorema G.11**: Un linguaggio è context-free se e solo se è accettato da un PDA.
    *   Esempio di PDA per riconoscere parole palindrome (`L_PPAL`).
    *   **PDA Deterministici vs Non Deterministici**: I PDA non deterministici sono **strettamente più potenti** (Teorema G.12).
*   **Alberi Sintattici e Ambiguità** 🌳:
    *   Rappresentazione grafica di una derivazione.
    *   **Grammatica Ambigua**: una parola può avere più alberi sintattici distinti.
    *   Problema dell'interpretazione semantica (es: `3+3*3`).
    *   👑 **Teorema G.13**: Decidere se una grammatica G di tipo 2 è ambigua è un problema **indecidibile**.

---

### ⚙️ **Parte 3: Teoria della Complessità Computazionale**

Questa è la parte più corposa del corso. Si analizza non solo *se* un problema si può risolvere, ma *quante risorse* (tempo e spazio) richiede.

#### **Introduzione: La Torre di Hanoi** 🗼
*   Un esempio pratico per introdurre la differenza tra crescita polinomiale e crescita esponenziale.
*   Concetto intuitivo di problema **trattabile** (risolvibile in tempo "ragionevole") vs **intrattabile**.

#### **Lezione 11: Misure di Complessità** ⏱️
*   Definizione di **misura di complessità** `c(T,x)`.
*   📚 **Assiomi di Blum**: le due proprietà fondamentali che una misura di complessità deve soddisfare (vedi dispensa 6, par. 6.1).
*   **Misure Deterministiche**:
    *   `dtime(T,x)`: numero di istruzioni (tempo).
    *   `dspace(T,x)`: numero di celle di memoria (spazio).
    *   📚 Dimostrazione della loro calcolabilità (approfondire il funzionamento della Macchina Universale).
*   **Misure Non Deterministiche**:
    *   `ntime(NT,x)` e `nspace(NT,x)`.
    *   Definizione basata sul minimo per le computazioni accettanti e sul massimo per quelle che rigettano.
*   **Relazioni tra Spazio e Tempo**:
    *   `dspace(T,x) ≤ dtime(T,x)`.
    *   `dtime(T,x) ≤ O(|x|k)`.
    *   📚 La dimostrazione del caso non deterministico non è da studiare, ma è consigliata per una comprensione più profonda.

#### **Lezione 22 e 23: Classi di Complessità e Funzioni Costruttibili** 📂
*   📚 **Teoremi di Accelerazione e Compressione Lineare**: Dato un algoritmo, ne esiste sempre uno più veloce/parsimonioso di un fattore costante. Le dimostrazioni non sono da studiare.
*   **Definizione delle Classi di Complessità**:
    *   `DTIME[f(n)]`, `DSPACE[f(n)]`.
    *   `NTIME[f(n)]`, `NSPACE[f(n)]`.
    *   **Classi Complemento**: `coDTIME`, `coNP`, ecc.
*   **Funzioni Time/Space-Constructible**:
    *   Funzioni "ben educate" che possono essere calcolate in tempo/spazio proporzionale al loro valore. Servono a evitare i paradossi del Gap Theorem.
*   **Teoremi di Gerarchia (Spaziale e Temporale)**:
    *   📚 Se si concede più risorsa (tempo/spazio) in modo "significativo", si possono risolvere più problemi. (Teoremi 6.14 e 6.15).
*   **Classi di Complessità Fondamentali**:
    *   **P**: Tempo deterministico polinomiale.
    *   **NP**: Tempo non deterministico polinomiale.
    *   **PSPACE**: Spazio deterministico polinomiale.
    *   **NPSPACE**: Spazio non deterministico polinomiale.
    *   **EXPTIME**: Tempo deterministico esponenziale.
*   **Relazioni tra Classi**:
    *   `P ⊆ NP ⊆ PSPACE`.
    *   `PSPACE = NPSPACE` (👑 **Teorema di Savitch** - la dimostrazione non è in programma ma è importante conoscerne l'enunciato).
    *   `PSPACE ⊆ EXPTIME`.
    *   `P ⊂ EXPTIME` (👑 **Teorema di Gerarchia Temporale** - contenimento stretto).

#### **Lezione 26 e 27: Problemi e Codifiche** 🧩
*   Come formalizzare un "problema del mondo reale" in un linguaggio formale.
*   **Problemi Decisionali**: la loro struttura e formalizzazione.
*   **Codifica delle Istanze**:
    *   La scelta della codifica influenza la complessità.
    *   **Codifiche Ragionevoli**: due codifiche sono polinomialmente correlate. L'assunzione è che si usino sempre codifiche ragionevoli.
    *   **Assunzione Chiave**: si assume che il linguaggio delle istanze valide di un problema sia decidibile in tempo polinomiale (`χ(I_Γ) ∈ P`).

#### **Lezione 28 e 29: La Classe NP e la sua Caratterizzazione** ✨
*   **L'importanza di NP**: contiene migliaia di problemi pratici e importanti per cui non si conosce un algoritmo efficiente.
*   **Il "Genio"**: un modello intuitivo per capire il non determinismo.
*   👑 **Teorema 9.1: Caratterizzazione Alternativa di NP**:
    *   Un problema è in NP se e solo se una sua soluzione ("certificato") può essere **verificata** in tempo polinomiale da un algoritmo deterministico.
    *   Concetti chiave: **certificato** (o "dimostrazione") e **verificatore**.
    *   **ATTENZIONE**: La verifica del certificato deve essere polinomiale! (Esempio di errore: 2QBF).

#### **Lezione 24, 30-34: NP-Completezza, Riduzioni e Problemi** 🤯
*   **Riducibilità Polinomiale (≤p)**:
    *   Strumento per confrontare la difficoltà relativa dei problemi. `L1 ≤p L2` significa che `L1` non è "più difficile" di `L2`.
*   **Problemi NP-Completi (NPC)**:
    *   Sono i problemi "più difficili" in NP.
    *   Definizione: un problema `L` è NP-completo se `L ∈ NP` e ogni altro problema in NP si riduce a `L`.
*   👑 **Teorema di Cook-Levin**:
    *   Il problema della soddisfacibilità booleana (**SAT**) è NP-completo.
    *   È il "capostipite" dei problemi NP-completi.
*   **La Congettura P vs NP**:
    *   La domanda più importante dell'informatica: `P = NP` o `P ≠ NP`?
    *   Se `P ≠ NP`, allora nessun problema NP-completo può essere risolto in tempo polinomiale.
*   **Come dimostrare che un problema è NP-completo**:
    1.  Dimostrare che appartiene a NP.
    2.  Ridurre un problema già noto come NP-completo ad esso.
*   **Catena di Riduzioni Principali**:
    *   `SAT` ➡️ `3SAT`
    *   `3SAT` ➡️ `Vertex Cover (VC)`
    *   `VC` ➡️ `Independent Set (IS)` ➡️ `Clique (CL)`
    *   `VC` ➡️ `Dominating Set (DS)`
    *   `Hamiltonian Cycle (HC)` ➡️ `Hamiltonian Path (HP)` ➡️ `Long Path (LP)`
    *   `HC` ➡️ `Travelling Salesman Problem (TSP)`
    *   `3SAT` ➡️ `3-Colorability (3-COL)` ➡️ `k-COL` ➡️ `COL`
*   **Il Ruolo delle Costanti**:
    *   Fissare un parametro di un problema può renderlo più facile.
    *   `k-COL` è in P per k≤2, ma NP-completo per k≥3.
    *   `k-SAT` è in P per k=2, ma NP-completo per k≥3.
    *   `h-VC` (Vertex Cover di dimensione `h` costante) è in P.
*   **La Struttura di NP**:
    *   Se `P ≠ NP`, la classe NP contiene tre tipi di problemi: P, NP-completi e **NP-intermedi**.
    *   👑 **Teorema di Ladner**: Se `P ≠ NP`, allora esistono problemi NP-intermedi.
*   **Classi coNP e coNP-Completezza**:
    *   La classe dei problemi il cui complemento è in NP.
    *   Relazione: `P ⊆ NP ∩ coNP`.
    *   `L` è NP-completo ⇔ il suo complemento `L^c` è coNP-completo.
    *   Esempi e esercizi sui problemi `VC ∧ 3-COL`, `¬VC ∨ ¬3-COL`, etc.

---

In bocca al lupo per l'esame! 🚀