### **Modulo 1: Concetti Fondamentali della Calcolabilità** 🧠

Questo modulo introduce le idee alla base della teoria della calcolabilità, definendo cosa intendiamo per "problema" e "soluzione automatica".

#### **1.1. Problemi, Istanze e Soluzioni**

- **Problema vs. Istanza**: Capire la distinzione fondamentale.
    
    - **Problema**: Descrizione generale di un insieme di dati e una richiesta (es: "PROBLEMA SOMMA: dati due numeri n e k, calcolare n+k").
        
    - **Istanza**: Un insieme specifico di valori per i dati di un problema (es: "Quanto fa 5+2?").
        
- **Trovare una Soluzione**:
    
    - **Istanze Positive**: Istanze che hanno una soluzione.
        
    - **Istanze Negative**: Istanze che non ammettono soluzione (es: calcolare √-4 nei numeri reali). ⚠️ **Concetto importante che ritorna spesso!**
        

#### **1.2. Risolvere un Problema: L'Idea di Algoritmo**

- **Metodo/Procedimento**: Una sequenza di azioni per trovare la soluzione di qualunque istanza positiva e riconoscere quelle negative.
    
- **Azione Elementare**: Un'azione "semplice", eseguibile con facilità.
    
- **L'Istruzione Elementare secondo Turing**: Per svincolare la definizione di "procedimento" dall'esecutore, Turing ha identificato le caratteristiche di un'istruzione elementare:
    
    1. Scelta da un insieme finito di istruzioni.
        
    2. Scelta da un insieme finito di azioni possibili.
        
    3. Eseguibile con una quantità di memoria limitata e costante, indipendente dalla dimensione dell'input.
        
- **Esempio Pratico: La Somma in Colonna**
    
    - Perché "calcola n+k" non è un'istruzione elementare (richiederebbe una memoria infinita per memorizzare tutte le possibili somme).
        
    - Il procedimento della somma in colonna, invece, usa un numero costante di istruzioni (circa 222) e memoria limitata (le due cifre e il riporto) per sommare numeri di qualunque grandezza.
        
    - **Proprietà del procedimento**: È una sequenza di istruzioni "se condizione allora azione", non ambiguo, e può essere eseguito da un **automa**.
        

---

### **Modulo 2: La Macchina di Turing (MdT)** ⚙️

Questo modulo formalizza il concetto di "automa" introdotto nel primo modulo, definendo il modello di calcolo centrale del corso.

#### **2.1. Definizione Formale della Macchina di Turing**

- **Definizione a Nastro Singolo**:
    
    - Unità di controllo, stati interni (Q), nastro infinito, testina di lettura/scrittura.
        
    - **Quintupla**: ⟨stato_corrente, simbolo_letto, simbolo_scritto, nuovo_stato, movimento⟩.
        
- **Funzionamento**:
    
    - La macchina cerca una quintupla che corrisponda allo stato corrente e al simbolo letto.
        
    - Se la trova, esegue le tre azioni specificate.
        
    - Se non la trova, la computazione termina.
        
- **Definizione Formale**: Una MdT è una quintupla **⟨Σ, Q, q₀, QF, P⟩** dove P è l'insieme delle quintuple (una funzione parziale).
    
- **Macchine a k-nastri**: Estensione del modello con k nastri e k testine.
    

#### **2.2. Formalismi della Computazione**

- **Stato Globale (Configurazione)**: Una "fotografia" della macchina in un dato istante. Rappresenta il contenuto del nastro, la posizione della testina e lo stato interno (es: ...a q₁ b c...).
    
- **Transizione**: Il passaggio da uno stato globale a un altro tramite l'esecuzione di una quintupla.
    
- **Computazione**: Una sequenza di stati globali, a partire da quello iniziale, fino a quando la macchina termina.
    

#### **2.3. Tipi di Macchine di Turing e Modelli**

- **Trasduttori**: Macchine che calcolano una funzione e scrivono il risultato su un nastro di output. Hanno un solo stato finale qF.
    
- **Riconoscitori**: Macchine che calcolano funzioni booleane (sì/no). Non hanno nastro di output e terminano in uno di due stati finali:
    
    - qA (stato di accettazione)
        
    - qR (stato di rigetto)
        
- **Modelli di MdT**:
    
    - Testine indipendenti vs. Testine solidali.
        
    - Alfabeto ricco vs. Alfabeto binario.
        
    - **Equivalenza dei modelli**: Il punto cruciale è che tutti questi modelli sono **equivalenti**. Possiamo simulare una macchina "ricca" (tanti nastri, tanti simboli) con una macchina "povera" (un nastro, alfabeto binario).
        
    - **Simulazione "a scatola aperta"**: La tecnica usata per dimostrare l'equivalenza, trasformando una quintupla di un modello in un insieme di quintuple di un altro. **(Vedi dispense per i dettagli tecnici, es. pag. 6-8 dispensa 2)**.
        

#### **2.4. Esercizi di Progettazione di MdT (Lezione 3)**

- **Riconoscitore di Palindromi (TPAL)**: Esercizio fondamentale per capire come usare gli stati per memorizzare informazioni e come gestire il nastro.
    
- **Parola Doppia (xx)**: Esercizio classico che richiede di marcare e confrontare parti del nastro.
    
- **Somma di k interi**: Esercizio che introduce la **simulazione "a scatola chiusa"**, ovvero l'uso di una MdT già esistente come "sub-routine".
    

---

### **Modulo 3: Macchine Non Deterministiche e la Tesi di Church-Turing** 🌐

Questo modulo esplora un'estensione del modello di base e discute i limiti teorici della calcolabilità.

#### **3.1. Non Determinismo**

- **Definizione**: Una MdT è non deterministica (MNT) se, per una data coppia (stato, simbolo), esistono **più quintuple** applicabili.
    
- **Due Visioni Equivalenti**:
    
    1. **Macchina Parallela**: La macchina si "sdoppia" ed esplora tutti i percorsi computazionali contemporaneamente (albero di computazione).
        
    2. **Genio della Lampada**: Un "genio" sceglie sempre la mossa "giusta" per arrivare a una soluzione.
        
- **Accettazione e Rigetto in una MNT**:
    
    - **Accetta** un input se **almeno un** ramo della computazione termina in qA.
        
    - **Rigetta** un input se **tutti** i rami della computazione terminano in qR.
        
    - ⚠️ Una MNT può non terminare se anche un solo ramo va in loop.
        
- **Equivalenza con il Determinismo**: Teorema fondamentale: per ogni MNT esiste una MdT deterministica che la simula. La simulazione avviene tramite la tecnica della **"coda di rondine con ripetizioni"**, che esplora l'albero di computazione livello per livello per evitare di rimanere intrappolata in un ramo infinito. **(Studiare il Teorema 2.1, pag. 5-6 dispensa 2)**.
    

#### **3.2. La Macchina di Turing Universale (MTU)**

- **Concetto**: Una MdT è una descrizione (una parola). Possiamo quindi dare questa descrizione in input a un'altra MdT.
    
- **Definizione**: La MTU, indicata con U, è una macchina di Turing che prende in input:
    
    1. La descrizione di una qualsiasi MdT T (codificata come una parola pT).
        
    2. Un input x per T.  
        ... e simula la computazione T(x).
        
- **Funzionamento**: Utilizza più nastri per memorizzare la descrizione di T, l'input x, lo stato corrente di T, ecc. **(Studiare il paragrafo 2.6 della dispensa)**.
    

#### **3.3. La Tesi di Church-Turing**

- **Affermazione**: "Qualunque problema risolvibile da un algoritmo (nel senso intuitivo del termine) è risolvibile da una Macchina di Turing".
    
- **Natura**: È una **tesi**, non un teorema. Non può essere dimostrata matematicamente ma è universalmente accettata.
    
- **Equivalenza dei Modelli di Calcolo**: Tutti i modelli di calcolo "ragionevoli" proposti finora (es. Lambda Calcolo, **PascalMinimo**) si sono dimostrati essere **Turing-equivalenti**.
    
    - **PascalMinimo ↔ MdT**: La dimostrazione (Teoremi 3.5 e 3.6) è un esempio chiave di come si prova l'equivalenza tra modelli. Mostra come simulare un programma con una MdT e viceversa. **(Studiare attentamente sulle dispense)**.
        

---

### **Modulo 4: Decidibilità e Linguaggi** 🚦

Questo modulo applica la teoria delle MdT per classificare i problemi in base alla loro difficoltà computazionale.

#### **4.1. Linguaggi Decidibili e Accettabili**

- **Linguaggio**: Un insieme di parole su un dato alfabeto (L ⊆ Σ*).
    
- **Linguaggio Decidibile (o Ricorsivo)**: Esiste una MdT che **termina su ogni input**, accettando le parole del linguaggio e rigettando quelle che non ne fanno parte.
    
- **Linguaggio Accettabile (o Ricorsivamente Enumerabile / Semi-decidibile)**: Esiste una MdT che:
    
    - Accetta (e termina) per ogni parola del linguaggio.
        
    - Rigetta (terminando) o **non termina** (va in loop) per le parole che non sono nel linguaggio.
        
- **Relazione**: Ogni linguaggio decidibile è anche accettabile.
    
- **Teorema Chiave (Teorema 3.1)** ⭐: Un linguaggio L è **decidibile** se e solo se sia L che il suo complemento Lᶜ sono **accettabili**.
    

#### **4.2. Il Problema della Fermata (Halting Problem)**

- **Definizione del linguaggio LH**: LH = { (i, x) | Tᵢ(x) termina }, dove i è la codifica della macchina Tᵢ.
    
- **Proprietà di LH**:
    
    - LH è **accettabile**. Si può costruire una macchina (una variante della MTU) che simula Tᵢ(x) e accetta se la simulazione termina.
        
    - LH è **NON decidibile (Teorema 5.5)**. Questa è una delle dimostrazioni più importanti del corso.
        
- **Dimostrazione per Assurdo dell'Indecidibilità di LH**:
    
    1. **Ipotesi**: Supponiamo che LH sia decidibile, quindi esiste una MdT T che lo decide.
        
    2. **Costruzione di T***: Da T si costruisce una macchina T* che prende in input i e fa l'opposto di T(i, i) (se T(i, i) accetta, T* non termina; se T(i, i) non accetta, T* accetta).
        
    3. **La Contraddizione**: Sia k la codifica di T*. Cosa fa T*(k)?
        
        - T*(k) accetta ↔ T(k, k) non accetta ↔ k non è in LH ↔ Tk(k) non termina ↔ T*(k) non termina. (Contraddizione!)
            
        - T*(k) non termina ↔ T(k, k) accetta ↔ k è in LH ↔ Tk(k) termina ↔ T*(k) termina. (Contraddizione!)
            
    4. **Conclusione**: L'ipotesi iniziale è falsa, quindi LH non è decidibile.
        

#### **4.3. Riduzioni (Many-to-one)**

- **Definizione**: Un linguaggio L₁ è riducibile a L₂ (L₁ ≤ L₂) se esiste una funzione **totale e calcolabile** f tale che x ∈ L₁ ↔ f(x) ∈ L₂.
    
- **Utilità delle Riduzioni**:
    
    - Per provare che un linguaggio L_nuovo è **decidibile/accettabile**: L_nuovo ≤ L_noto_decidibile/accettabile.
        
    - Per provare che un linguaggio L_nuovo è **NON decidibile/accettabile**: L_noto_indecidibile/non_accettabile ≤ L_nuovo.
        
- **Esempio Chiave**: Dimostrazione che LHO = {i | Tᵢ(0) termina} non è decidibile tramite la riduzione **LH ≤ LHO**. **(Studiare attentamente questo esempio sulle dispense)**.
    

---

### **Modulo 5: Grammatiche Formali e la Gerarchia di Chomsky** 📜

Questo modulo introduce un modello di calcolo alternativo (generativo) e lo mette in relazione con le macchine di Turing.

#### **5.1. Grammatiche Generative**

- **Definizione**: Una grammatica è una quadrupla **G = ⟨VT, VN, P, S⟩**.
    
    - VT: Alfabeto di terminali.
        
    - VN: Alfabeto di non-terminali.
        
    - P: Insieme delle produzioni (regole di riscrittura).
        
    - S: Assioma (simbolo di partenza).
        
- **Derivazione (⇒)**: Applicazione di una regola di produzione.
    
- **Linguaggio Generato (L(G))**: L'insieme di tutte le parole di terminali derivabili dall'assioma S.
    

#### **5.2. La Gerarchia di Chomsky**

- **Tipo 0 (Senza Restrizioni)**:
    
    - Qualsiasi produzione α → β.
        
    - **Equivalenza**: Generano esattamente i linguaggi **accettabili** (Turing-riconoscibili).
        
        - **TM → Grammatica (Teorema G.4)**: Si costruisce una grammatica che simula la computazione di una MdT.
            
        - **Grammatica → TM (Teorema G.5)**: Si costruisce una MNT che genera non deterministicamente tutte le parole della grammatica e le confronta con l'input.
            
- **Tipo 1 (Context-Sensitive)**:
    
    - Produzioni non accorcianti (|α| ≤ |β|).
        
    - **Equivalenza**: Generano i linguaggi **decidibili**. La proprietà non-accorciante limita lo spazio di ricerca e permette a una MdT di terminare sempre.
        
- **Tipo 2 (Context-Free)**:
    
    - Produzioni della forma A → α (singolo non-terminale a sinistra).
        
    - **Equivalenza**: Generano i linguaggi riconosciuti dagli **Automi a Pila (PDA)**.
        
- **Tipo 3 (Regolari)**:
    
    - Produzioni della forma A → aB o A → a.
        
    - **Equivalenza**: Generano i linguaggi riconosciuti dagli **Automi a Stati Finiti**.
        

#### **5.3. Grammatiche Context-Free (Approfondimento)**

- **Relazione G1 vs G2**: La classe G2 è un sottoinsieme proprio di G1 (G2 ⊂ G1).
    
- **Pumping Lemma per Linguaggi Context-Free (Lemma di Bar-Hillel)**:
    
    - Strumento per dimostrare che un linguaggio **NON** è context-free.
        
    - È una condizione necessaria, ma non sufficiente.
        
    - **Esempio Fondamentale**: Dimostrazione che **{aⁿbⁿcⁿ | n ≥ 1} non è context-free**.
        
- **Proprietà di Chiusura**:
    
    - **CHIUSE** rispetto a: Unione, Concatenazione.
        
    - **NON CHIUSE** rispetto a: **Intersezione** e **Complemento**. (Il controesempio per l'intersezione usa proprio {aⁿbⁿcⁿ}).
        
- **Automi a Pila (PDA - Pushdown Automata)**:
    
    - Il modello a riconoscitore per i linguaggi context-free.
        
    - Struttura: Unità di controllo, nastro di input (sola lettura), e una **pila (stack)**.
        
    - Il **non determinismo** è fondamentale per i PDA.
        
    - **Modalità di Accettazione**: Per stato finale o per pila vuota (sono equivalenti - Teorema G.10).
        
    - **Teorema G.11**: Un linguaggio è context-free **se e solo se** è accettato da un PDA.

