## Lezione 1 — Introduzione alla calcolabilità

**Argomenti**

- Alfabeti, parole, parola vuota, concatenazione, inversa, complemento.
    
- Problema vs istanza; esempi (SOMMA, AREA).
    
- Procedimento “automatico” e operazione elementare (somma in colonna, memoria finita).
    

**Teoremi**

- Nessun teorema formale (impostazione).
    

**Studia sulle dispense**

- Nessun richiamo tassativo (introduzione).
    

---

## Lezione 2 — Macchine di Turing (definizione formale)

**Argomenti**

- MT a un nastro: Σ, Q, q₀, QF, P (quintuple) e semantica di esecuzione/terminazione.
    
- MT a k nastri: forma generale della quintupla con letture/scritture/movimenti multipli.
    
- Esempio T_parità e prime computazioni.
    

**Teoremi**

- Definizioni e osservazioni (nessun enunciato numerato in slide).
    

**Studia sulle dispense**

- “Definizione 1.3 a pag. 9 della dispensa 1” per la MT a un nastro.
    

---

## Lezione 3 — Esercizi su MT + simulazione “a scatola chiusa”

**Argomenti**

- Progettazione di MT:
    
    1. Palindromia (varianti pari/dispari/totale).
        
    2. Somma di k interi “in riga”.
        
    3. Riconoscere parole della forma `xx`.
        
- Concetto introduttivo di simulazione “black-box”.
    

**Teoremi**

- Nessun enunciato formale (tecniche costruttive).
    

**Studia sulle dispense**

- Rinvii operativi alla dispensa 1 §1.6 per la somma in riga (vedi anche fine Lez.2).
    

---

## Lezione 4 — Modelli di MT ed equivalenza

**Argomenti**

- Varianti di modello: multi-nastro (testine indipendenti/solidali), un nastro, alfabeti ricchi vs binario.
    
- Simulazione k-nastri → 1-nastro (tecnica “a colonne”).
    
- Riduzione alfabeto ricco → binario via codifica a k=⌈log₂|Σ|⌉ e simulazione.
    

**Teoremi**

- Equivalenza costruttiva dei modelli (dimostrazioni per simulazione).
    

**Studia sulle dispense**

- Dispensa 2: §2.4 (modelli), §2.4.2 (k→1 nastri), §2.5 (alfabeto ricco→binario).
    

---

## Lezione 5 — Non determinismo (NDTM vs DTM)

**Argomenti**

- Funzione di transizione parziale, differenze DTM/NDTM, “grado di non determinismo”.
    
- Tecnica della “coda di rondine” (esplorazione a profondità crescente).
    

**Teoremi**

- Equivalenza NDTM→DTM (simulazione sistematica; “studiate il Teorema!”).
    

**Studia sulle dispense**

- Teorema di simulazione in dispensa 2 (come richiamato a lezione).
    

---

## Lezione 6 — La Macchina Universale U

**Argomenti**

- “Macchine come parole”: ρ_T/β_T che codificano stati, simboli, mosse.
    
- U che, dato (p_T, x), simula T(x) (architettura a più nastri).
    
- Codifica binaria di Q (b_Q) e gestione dei confronti a blocchi di k bit.
    

**Teoremi**

- Esistenza costruttiva di U (per codifica + simulazione).
    

**Studia sulle dispense**

- Dispensa 2: pag. 11–13 (specifiche/codifica), §2.6 (descrizione completa di U — “studiate!”).
    

---

## Lezione 7 — Macchine, linguaggi, funzioni

**Argomenti**

- Decidere un linguaggio L ⊆ Σ*, accettabilità vs decidibilità; funzioni calcolabili (trasduttori).
    

**Teoremi**

- χ_L calcolabile ⇔ L decidibile; collegamenti tra funzioni totali e decidibilità (serie di teoremi nel cap. 3).
    

**Studia sulle dispense**

- Dispensa 3 §3.1 (definizioni formali e dimostrazioni richieste).
    

---

## Lezione 8 — Indecidibilità (Cantor) e set-up per Halting

**Argomenti**

- Cardinalità: naturali vs reali; idea di diagonalizzazione.
    
- Conteggio: MT numerabili ⇒ esistono linguaggi non decidibili.
    

**Teoremi**

- Esistenza di problemi irrisolvibili (schema via cardinalità/diagonale).
    

**Studia sulle dispense**

- Dispensa 5 §§5.1–5.2 (costruzione dei linguaggi non decidibili); richiami a dispensa 2 pag. 11–13 per le codifiche.
    

---

## Lezione 9 — Halting Problem e riduzioni

**Argomenti**

- Halting Problem: $LH = \{(i,x): T_i(x)\ \text{termina}\}$; LH accettabile ma non decidibile.
    
- Dimostrazione per assurdo (costruzione T, T’, T’’, T*; diagonalizzazione).
    
- Riduzioni many-to-one: definizione e uso in entrambe le direzioni (decidibilità/accettabilità e loro negazioni).
    
- Esempio LH ≼ LH₀ (restrizione a input 0) con costruzione f(i,x)=k(i,x).
    

**Teoremi**

- Teorema 5.5: LH non decidibile; proprietà standard delle riduzioni (se L₁ ≼ L₂ e L₁ non decidibile ⇒ L₂ non decidibile, ecc.).
    

**Studia sulle dispense**

- Dispensa 5: definizione generale di riduzione e l’esempio “pag. 7” richiamato e modificato nelle slide.
    

---

## Lezione 10 — Modelli di calcolo e Tesi di Church-Turing

**Argomenti**

- Panoramica: tutti i modelli “ragionevoli” sono Turing-equivalenti.
    
- Tesi di Church-Turing (non dimostrabile; ampia accettazione).
    
- Modello “PascalMinimo” come esempio di linguaggio Turing-equivalente.
    

**Teoremi**

- Teorema 3.5: da programma PascalMinimo a MT trasduttore equivalente (idea di prova e schema costruttivo, inclusi array/indici).
    
- Teorema 3.6: da MT a programma PascalMinimo (idea di prova).
    

**Studia sulle dispense**

- Dispensa 3 §3.3 (panorama sui modelli) e, da pag. 7, enunciati e idee di dimostrazione dei Teoremi 3.5–3.6.


---


# Lezione 11 — _Da Turing a Pascal_ (modelli di calcolo)

- **Obiettivo**: dimostrare il _teorema inverso_ del Teorema 3.5.
    
- **Teoremi**
    
    - **Teorema 3.6**: per ogni MdT deterministica (riconoscitore, 1-nastro) esiste un programma in **PascalMinimo** ATA_TAT​ con lo stesso comportamento su ogni input xxx.
        
- **Costruzione chiave**
    
    - Progettare un **programma UUU** in PascalMinimo che **simula la MdT Universale** usando array $Q_1, S_1, S_2, Q_2, M$ per le quintuple e un array $N$ per il nastro (anche con indici negativi).
        
    - **Algoritmo della MdT universale** (schema e **Tabella 3.3**).
        
    - **Simulazione di una MdT non deterministica** in PascalMinimo tramite esplorazione a profondità limitata con aumento progressivo iii (**Tabella 3.4**).
        
- **Da vedere sulla dispensa**
    
    - _Dispensa 3_: **ultime 3 righe p.9**, **p.11**, **Tab. 3.3 p.12** per l’algoritmo della Universale; **§3.4** per la simulazione della MdT non deterministica.
        

---

# Lezione 12 — _Grammatiche_ (modelli generativi)

- **Concetti base**
    
    - Definizione di **Grammatica** $G=\langle V_T,V_N,P,S\rangle$. Derivazione diretta $\Rightarrow$, derivazione $Rightarrow^{*}$, **forme di frase**, **linguaggio generato** $L(G)=\{y\in V_T^*: S \Rightarrow^* y\}$
        
    - Notazioni: uso di **|** per alternative; **ε** (parola vuota); **$\Lambda$** (linguaggio vuoto).
        
- **Esempi d’aula**
    
    - Grammatica che genera $\{a^n b^n\}$: idea di prova in due passi (derivabilità di $a^n b^n$; _solo_ parole di quella forma).
        
- **Da vedere sulla dispensa**
    
    - _Dispensa 3_ §3.1–3.3: contesto e passaggio da riconoscitori a generativi.
        

---

Lezione 13 — _La gerarchia di Chomsky_

- **Contenuti**
    
    - **Tipi 0–1–2–3**: definizioni e **inclusioni** ($G_3 \subseteq G_2 \subseteq G_1 \subseteq G_0$).
        
    - **Regole ammissibili** per:
        
        - **Tipo 1 (context-sensitive)**: RHS con lunghezza ≥ LHS (niente regole che accorciano).
            
        - **Tipo 2 (context-free)**: produzioni ($A\to \alpha$).
            
        - **Tipo 3 (regolari)**: ($A\to a$) o ($A\to aB$) (o variante sinistra, ma non entrambe).
            
    - **Parola vuota e ε-produzioni**
        
        - **Teorema G1**: per grammatiche di tipo (t>0), aggiungendo **nuovo assioma (S')** con $S'\to \varepsilon \mid S$ si ottiene $L(G')=L(G)\cup{\varepsilon}$.
            
        - **Teorema G2** (solo per tipi 2–3): aggiungere ε-produzioni non cambia il linguaggio se non per $\varepsilon$.
            
        - **Teorema G3**: per ogni **tipo 0** esiste **tipo 1 + ε-produzioni** equivalente per il linguaggio.
            
    - **Esempio 4 (fondamentale)**: progettare una grammatica per ${xx : x\in{a,b}^+}$; da **studiare bene** (continua in Lezione 14).
        
- **Da vedere sulla dispensa**
    
    - Esercizi di **classificazione** e progetto di grammatica “pari numero di 1” (fine file).
        

---

# Lezione 14 — _Da MdT a Grammatica_ (costruzioni)

- **Prosecuzione Esempio 4**: dimostrazione che la grammatica data genera **esattamente** ( {xx}) (struttura della derivazione prima/poi $S\to X$, ruoli di U_# e U_$.
    
- **Messaggio chiave**: tecniche costruttive e argomentazioni sull’equivalenza generazione-proprietà desiderata.
    
- **Da vedere sulla dispensa**
    
    - Riprendere lo schema completo dell’esempio e le sue varianti.
        

---

# Lezione 15 — _Da Grammatica a MdT_

- **Obiettivo**: dall’altra direzione rispetto alla Lezione 14.
    
- **Teoremi**
    
    - **Teorema G.5**: per **ogni** grammatica (G) esiste una **MdT non deterministica** (N_T) che **accetta** (L(G)). (Descrizione tramite MdT a **due nastri** che prova applicazioni di produzioni e accetta quando la parola del 2° nastro coincide con l’input).
        
- **Conclusione**: _linguaggi accettabili_ = _linguaggi generabili_ da grammatiche di **tipo 0** (Tesi di Church-Turing soddisfatta dal modello grammatiche tipo 0).
    
- **Da vedere sulla dispensa**
    
    - Dettagli della costruzione della MdT a più nastri che simula le produzioni.
        

---

# Lezione 16 — _Grammatiche di tipo 1_

- **Risultati**
    
    - **Teorema G.6**: per ogni grammatica di **tipo 1** esiste una **MdT** che **decide** (L(G)) ⇒ i linguaggi di tipo 1 ⊆ **decidibili** (ricorsivi).
        
    - **Quadro d’insieme**: $G_3 \subseteq G_2 \subseteq G_1 \subseteq D \subset G_0 = A$ (decidibili (D), accettabili (A)).
        
- **Esempi**
    - Grammatiche context-free come sottoinsieme proprio dei tipo 1; esempi costruttivi $a^n b^n c^m$, ecc. (idee nelle slide).
        
- **Da vedere sulla dispensa**
    
    - Dimostrazione “a scatola aperta” per riduzioni/modellazioni. (richiami collegati alle lezioni precedenti).
        

---

# Lezione 17 — _Grammatiche Context-Free_ (tipo 2)

- **Chiusure**
    
    - **TEO G.7**: chiusura per **unione**. **TEO G.8**: **non** chiusura per **intersezione**. **TEO G.9**: **non** chiusura per **complemento**.
        
- **Verso gli automi a pila (PDA)**
    
    - Anticipo del risultato: i CFL sono decisi da **PDA** (dettagli in Lezione 18).
        
- **Da vedere sulla dispensa**
    
    - Esempi classici $L_{a=b,c}), (L_{a,b=c}$ e loro intersezione $L_{a=b=c}\notin$ CFL.
        

---

# Lezione 18 — _Automi a pila e MdT; alberi sintattici e ambiguità_

- **PDA e CFL**
    
    - **TEO G.10**: equivalenza **pila vuota** ↔ **stato finale** per l’accettazione con PDA.
        
    - **TEO G.11**: **L è context-free ⇔ esiste un PDA che accetta L**.
        
    - Esempio di PDA per **palindromi di lunghezza pari** su ({a,b}).
        
- **Alberi sintattici e ambiguità**
    
    - Esempi di **alberi multipli** per la stessa parola (p.es. (3+3*3)) e impatto semantico.
        
    - **TEO G.13**: **indecidibilità** dell’ambiguità per grammatiche di tipo 2 (il linguaggio (L_A) “delle grammatiche ambigue” **non è decidibile**).
        
- **Da vedere sulla dispensa**
    
    - Tratti applicativi su linguaggi di programmazione e parsing (parte finale).
        

---

# Lezione 19 — _Grammatiche Regolari_ (tipo 3)

- **Contenuti**
    
    - Ruolo **lessicale** nei linguaggi di programmazione (analizzatore lessicale).
        
    - Definizione di **grammatiche regolari** ed esempi (forme $A\to a \mid aB$).
        
    - **Pumping Lemma per regolari**: proprietà necessaria per tutti i linguaggi regolari (usato per **non-regolarità**).
        
- **Da vedere sulla dispensa**
    
    - Esercizi di applicazione del pumping lemma (segnalati in chiusura di sezione).
        

---

# Lezione 20 — _Grammatiche regolari → Automi a stati finiti; Espressioni regolari; Intro a Complessità_

- **Equivalenze fondamentali sui regolari**
    
    - **Passo 1–4** della dimostrazione che **grammatiche regolari**  $\leftrightarrow$  **ASF deterministici** (via **ASF non deterministici** e **subset construction**).
        
    - **TEO G.17**: _linguaggi regolari_ = _linguaggi decisi da ASF deterministici_.
        
- **Chiusure dei regolari**
    
    - **Unione, complemento, intersezione** (via De Morgan e complementazione di DFA).
        
- **Espressioni regolari**
    
    - Sintassi $\{+, \cdot, * , \emptyset\}$, esempi ed esercizi.
        
    - **TEO G.18**: _regolari_ ⇔ _linguaggi definiti da **espressioni regolari**_.
        
- **Bridge a Complessità**
    
    - Motivazione (Torre di Hanoi, crescita esponenziale vs polinomiale) come teaser alla parte successiva del corso.
        
- **Da vedere sulla dispensa**
    
    - Esercizi su ER e proprietà di chiusura; figure sull’**NFA→DFA** (subset construction).
        


Perfetto. Ecco l’elenco in **Markdown** dei contenuti da studiare per le **Lezioni 21–34**, divisi per PDF, con i **teoremi citati** e le note “**Studiare sulle dispense**” quando la slide lo indica.

---

# Lezione 21 — Misure di complessità

- **Argomenti**
    
    - Definizione di _misura di complessità_ c(T, x). Assiomi di Blum (dominio solo su computazioni che terminano; c calcolabile).
        
    - Misure deterministiche: dtime(T, x) = numero di istruzioni; dspace(T, x) = celle utilizzate. Calcolabilità tramite variante della macchina universale.
        
- **Teoremi citati**
    
    - Verifica che dtime e dspace soddisfano gli assiomi di Blum (dimostrazione costruttiva via macchina universale con contatore).
        
- **Studiare sulle dispense**
    
    - **Dispensa 6, §6.1**: definizioni e proprietà generali delle misure di complessità.
        

---

# Lezione 22 — Classi di complessità (fondamenti)

- **Argomenti**
    
    - Funzioni _time-constructible_ e _space-constructible_: input in unario, output in unario, costo proporzionale al valore. Esempi: polinomi, 2^n, n^n.
        
    - Gap Theorem (enunciato) e motivazione delle funzioni “regolari”.
        
    - Teoremi di gerarchia temporale e spaziale (enunciati, idea).
        
- **Teoremi citati**
    
    - **Teorema 6.13 (Gap Theorem):** esiste f totale calcolabile con DTIME[2^{f(n)}] ⊆ DTIME[f(n)].
        
    - **Teorema 6.14 (Gerarchia spaziale)** e **6.15 (Gerarchia temporale)**: separazione con funzioni costruttibili.
        
- **Studiare sulle dispense**
    
    - **Dispensa 6**: definizioni formali di time-/space-constructibility e appendice con esercizi.
        

---

# Lezione 23 — Funzioni costruttibili e classi specifiche

- **Argomenti**
    
    - Chiusura dei “punti aperti”: decidibilità non deterministica in tempo/spazio O(f(n)) quando f è costruttibile.
        
    - Simulazione deterministica dell’NT in tempo 2^{O(f(n))}.
        
    - Definizioni standard: **P, NP, PSPACE, NPSPACE, EXPTIME, NEXPTIME**.
        
- **Teoremi citati**
    
    - **Teorema 6.16:** se L ∈ NTIME[f(n)] con f time-constructible, allora L è decidibile in tempo non deterministico O(f(n)); analogo per spazio.
        
    - **Teorema 6.17:** NTIME[f(n)] ⊆ DTIME[2^{O(f(n))}] (simulazione deterministica).
        
- **Studiare sulle dispense**
    
    - **Dispensa 6, §6.6**: definizioni delle classi e inclusioni note.
        

---

# Lezione 24 — Riducibilità polinomiale

- **Argomenti**
    
    - 𝜋-riduzioni e specializzazione alle **riduzioni polinomiali (≼)**; chiusure di classi rispetto a ≼.
        
    - Ruolo delle riduzioni “in positivo” (per mostrare L ∈ P) e “in negativo” (probabile non appartenenza a P).
        
    - Definizione e ruolo dei **linguaggi NP-completi**; motivazione legata a P vs NP.
        
- **Teoremi citati**
    
    - **Teorema 6.21 (Dispensa 6):** P è chiusa rispetto a ≼; estensioni analoghe per EXPTIME, NP, NEXPTIME, PSPACE.
        
    - **Corollario 6.4:** se P ≠ NP allora ogni linguaggio NP-completo non è in P.
        
- **Studiare sulle dispense**
    
    - **Dispensa 6**: formalismi delle riduzioni e proprietà di chiusura.
        

---

# Lezione 25 — Classi complemento (coP, coNP, …)

- **Argomenti**
    
    - Definizioni: **coP, coNP, coEXPTIME, coPSPACE**, ecc.; per deterministiche DTIME[f] = coDTIME[f], DSPACE[f] = coDSPACE[f].
        
    - Relazioni e congetture: **P ?= NP**, **coNP ?= NP**.
        
    - Struttura di **coNP** e coNP-completezza.
        
- **Teoremi citati**
    
    - **Teorema 6.23:** se P = NP allora NP = coNP.
        
    - **Teorema 6.24:** coNP chiusa rispetto a ≼ (dimostrazione analoga lasciata per esercizio).
        
    - **Teorema 6.25:** L è NP-completo ⇔ L^c è coNP-completo.
        
    - **Teorema 6.26:** se esiste L NP-completo in coNP, allora NP = coNP.
        
- **Studiare sulle dispense**
    
    - Riferimenti alla **Dispensa 6** per i teoremi 6.21–6.26.
        

---

# Lezione 26 — Problemi e codifiche

- **Argomenti**
    
    - Dalla teoria dei linguaggi ai **problemi decisionali**: tripla ⟨I, S(·), π⟩; definire istanze, spazio delle soluzioni, vincoli, risposta.
        
    - Trasferire un problema in un linguaggio via una **codifica ragionevole** χ e costruzione di L_Γ(χ).
        
- **Teoremi/definizioni chiave**
    
    - Definizione formale di L_Γ(χ) e partizione Σ* in parole che codificano istanze sì/no e non-istanze.
        
- **Studiare sulle dispense**
    
    - **Dispensa 7, §7.1**: esempi e formalizzazione dei problemi.
        

---

# Lezione 27 — Complessità di problemi

- **Argomenti**
    
    - Collegamento **problema ↔ linguaggio**: partizione di I_Γ e definizione di Y_Γ, N_Γ, non-istanze; decisione su L_Γ(χ).
        
    - Impatto della codifica sulla classe di complessità (presupposto: codifiche ragionevoli).
        
- **Studiare sulle dispense**
    
    - **Dispensa 7, §7.5**: passaggio da problemi a linguaggi e ragionamento di complessità su L_Γ.
        

---

# Lezione 28 — La classe NP (panoramica)

- **Argomenti**
    
    - Motivazione pratica di NP; differenza tra “trovare algoritmo in P” e “dimostrare NP-appartenenza”.
        
    - Uso “in positivo” delle riduzioni per P (cenno a 2COL) e avvio allo studio strutturale di NP.
        
- **Studiare sulle dispense**
    
    - **Dispensa 8** per tecniche su P (algoritmi) e **Dispensa 9** per struttura di NP.
        

---

# Lezione 29 — Caratterizzazione di NP

- **Argomenti**
    
    - Condizioni sufficienti per NP tramite forma del predicato π(x, S(x)) = “∃ y in S(x) : η(x, y)” con verifica in tempo polinomiale.
        
    - **Teorema 9.1 (caratterizzazione con certificati)**: L ∈ NP ⇔ ∃ T deterministica e costanti h, k tali che x ∈ L se e solo se esiste certificato y_x con |y_x| ≤ |x|^k verificabile in tempo O(|x|^h).
        
    - Equivalenza “NT polinomiale” ↔ “certificati polinomiali verificabili”.
        
- **Teoremi citati**
    
    - **Teorema 9.1** (dimostrazione con FASE 1 scelta certificato e FASE 2 verifica in O(|x|^h)).
        
- **Studiare sulle dispense**
    
    - **Dispensa 9**: sezione su _verificatori e certificati_.
        

---

# Lezione 30 — Teorema di Cook–Levin

- **Argomenti**
    
    - **SAT** in CNF/3CNF; strategia generale: ridurre un generico Γ ∈ NP a SAT codificando la computazione NT_Γ.
        
    - Costruzione dell’espressione booleana E(x); costo polinomiale della trasformazione.
        
- **Teoremi citati**
    
    - **Cook–Levin:** SAT è **NP-completo** (riduzione polinomiale da qualunque L_Γ ∈ NP).
        
- **Studiare sulle dispense**
    
    - **Dispensa 9**: dimostrazione classica (la lezione segue una variante rispetto alla dispensa).
        

---

# Lezione 31 — NP-completezza (struttura e metodo)

- **Argomenti**
    
    - Implicazioni pratiche del Cook–Levin: se avessi TSAT polinomiale, potrei decidere ogni Γ ∈ NP in polinomiale (schema FASE 1/FASE 2).
        
    - Introduzione al **Teorema 9.3** (schema generale di prove di NP-completezza via riduzioni da problema noto NP-completo).
        
    - Nota su **problemi NP-intermedi** (se esistono, non dimostrabili senza risolvere P vs NP).
        
- **Studiare sulle dispense**
    
    - **Dispensa 9**: sezione sulle riduzioni tra problemi decisionali e chiusura di P rispetto a ≤.
        

---

# Lezione 32 — Prove di NP-completezza (I)

- **Argomenti**
    
    - Catena classica di riduzioni da **3SAT** a **Vertex Cover (VC)**, poi a **Independent Set**, **Clique**, **Dominating Set**.
        
    - Tecnica dei **gadget** (variabili/clausole; P2 e C3, ecc.).
        
- **Teoremi/risultati operativi**
    
    - Dimostrazione che **3SAT ≼ VC** e conseguente NP-completezza di VC; analoghe per IS, Clique, Dominating Set.
        
- **Studiare sulle dispense**
    
    - **Dispensa 9**: capitolo con esempi completi di riduzioni e costruzione dei gadget.
        

---

# Lezione 33 — Prove di NP-completezza (II)

- **Argomenti**
    
    - Riduzioni da **Hamiltonian Cycle** a **Hamiltonian Path**, **Long Path**, **TSP**; da **3-Colorability** a **k-Colorability** (k costante) e **Colorability**.
        
    - Uso “a scatola nera” di NP-completezze già note tramite il Teorema 9.3.
        
- **Studiare sulle dispense**
    
    - **Dispensa 9**: sezione su problemi su grafi e colorazioni.
        

---

# Lezione 34 — Il ruolo delle costanti, oltre NP e coNP-completezza

- **Argomenti**
    
    - Esempi che combinano VC con 2-COL o 3-COL, attenzione alla forma del predicato (∃ non basta a garantire NP).
        
    - Esempio: **not-VC** è **coNP-completo** perché il complemento coincide con VC (NP-completo).
        
    - Riduzione **VC ≼ min-2SAT** e riflessione sul ruolo dei parametri/costanti nelle istanze.
        
- **Studiare sulle dispense**
    
    - **Dispensa 9**: problemi composti, coNP-completezza via complementazione di NP-complete.
        
 
