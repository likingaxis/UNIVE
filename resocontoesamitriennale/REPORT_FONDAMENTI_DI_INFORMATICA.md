# Resoconto Corso: Fondamenti di Informatica (Calcolabilità, Linguaggi Formali e Complessità)

- **Anno:** 2° Anno Triennale
- **Area:** Informatica Teorica, Teoria della Calcolabilità e Complessità Computazionale (INF/01)
- **Riferimento Docente/Materiali:** Materiali didattici, dispense del corso, compendi di teoremi e riduzioni

---

## Obiettivi del corso in sintesi

Il corso stabilisce i fondamenti logici e matematici dell'informatica teorica attraverso tre pilastri interconnessi: la **Teoria della Calcolabilità** (definizione formale di algoritmo, potenza dei modelli computazionali e limiti assoluti del calcolo automatico), la **Teoria dei Linguaggi Formali e degli Automi** (la classificazione della gerarchia di Chomsky, grammatiche generative, automi a stati finiti e automi a pila), e la **Teoria della Complessità Computazionale** (assiomatizzazione delle risorse di tempo e spazio, teoremi di gerarchia, classi di complessità strutturali come P, NP, PSPACE, EXPTIME, e teoria delle riduzioni e della completezza).

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### 1. Concetti Fondamentali della Calcolabilità ed Epistemologia dell'Algoritmo
- **Problemi, Istanze e Soluzioni:**
  - Definizione matematica di problema come relazione tra input e output.
  - Distinzione rigorosa tra problema generale ed istanza specifica.
  - Istanze positive (che ammettono soluzione o risposta affermativa) e istanze negative.
- **Definizione di Procedimento Effettivo e Istruzione Elementare:**
  - Concetto intuitivo di algoritmo come sequenza finita e non ambigua di istruzioni.
  - **I criteri di Alan Turing per l'istruzione elementare:**
    1. Scelta da un insieme finito di istruzioni possibili.
    2. Scelta da un insieme finito di azioni elementari.
    3. Esecuzione con una quantità di memoria locale limitata e costante, rigidamente indipendente dalla dimensione dell'input (esemplificato dal confronto tra "somma generica" e l'algoritmo di "somma in colonna").
- **Formalizzazione del concetto di Automa:** transizione deterministica di stato su eventi discreti.

### 2. La Macchina di Turing (MdT) e Modelli Computazionali
- **Definizione Formale della Macchina di Turing a Nastro Singolo:**
  - Quintupla fondamentale $\langle \Sigma, Q, q_0, Q_F, P \rangle$: alfabeto di nastro con simbolo speciale blank ($\sqcup$), insieme finito di stati interni, stato iniziale, stati finali e programma $P$ (insieme di quintuple $\langle q_i, s_j, s_k, q_l, M \rangle$).
  - Nastro infinito, testina di lettura/scrittura con movimenti a sinistra ($L$), destra ($R$) o fermo ($S$).
- **Formalismo della Computazione:**
  - Stato globale o configurazione istantanea ($\alpha \, q_i \, \beta$).
  - Relazione di transizione tra configurazioni ($\vdash$) e chiusura riflessiva e transitiva ($\vdash^*$).
  - Computazioni convergenti (terminazione) e divergenti (loop infinito).
- **Tipologie di Macchine di Turing:**
  - **Trasduttori:** calcolo di funzioni (parziali o totali) $f: \Sigma^* \to \Sigma^*$ con output scritto sul nastro e singolo stato finale $q_F$.
  - **Riconoscitori:** decisione di linguaggi formali $L \subseteq \Sigma^*$ privi di nastro di output, con terminazione in stato di accettazione ($q_A$) o di rigetto ($q_R$).
- **Estensioni e Varianti del Modello:**
  - Macchine a $k$-nastri con $k$ testine indipendenti; nastri bidirezionali; nastri a più tracce; alfabeti ricchi vs alfabeti binari $\{0, 1\}$.
  - **Teorema di Equivalenza:** tutti i modelli estesi sono Turing-equivalenti alla MdT standard a nastro singolo; simulazione "a scatola aperta" (trasformazione combinatoria delle quintuple) e "a scatola chiusa" (composizione modulare di sottoroutine).
- **Esercizi di Progettazione di MdT:**
  - Riconoscimento di linguaggi non regolari (es. palindromi $L_{\text{pal}}$, parole duplicate $ww$).
  - Operazioni aritmetiche unarie e binarie (somma, moltiplicazione, decremento).

### 3. Non Determinismo, Macchina Universale e Tesi di Church-Turing
- **Macchine di Turing Non Deterministiche (MNT):**
  - Transizioni multiple possibili per la medesima coppia (stato corrente, simbolo letto); albero delle computazioni ramificato.
  - Condizioni di terminazione:
    - **Accettazione:** esiste *almeno un cammino* di calcolo nell'albero che termina nello stato di accettazione $q_A$.
    - **Rigetto:** *tutti i cammini* di calcolo terminano nello stato di rigetto $q_R$.
  - **Teorema di Equivalenza Deterministica:** ogni MNT è simulabile da una MdT deterministica.
    - Tecnica della "coda di rondine con ripetizioni" (visita in ampiezza BFS dei livelli dell'albero di computazione per non cadere in rami di computazione infiniti).
- **La Macchina di Turing Universale (MTU $U$):**
  - Concetto di programma memorizzato come dato: codifica biunivoca di una MdT qualsiasi $T$ in una stringa/parola $p_T$.
  - Funzionamento della MTU: riceve in ingresso la coppia $\langle p_T, x \rangle$ e simula passo-passo la computazione di $T$ su $x$.
- **La Tesi di Church-Turing:**
  - Enunciato: qualsiasi funzione calcolabile tramite un procedimento algoritmico intuitivo è calcolabile da una Macchina di Turing.
  - Natura di congettura/tesi fondamentale non suscettibile di dimostrazione formale ma universalmente corroborata dall'equivalenza di tutti i formalismi proposti (Lambda Calcolo, Macchine a Registri, Sistemi di Post, funzioni ricorsive di Kleene).
  - **Modello PascalMinimo:** studio di un linguaggio imperativo essenziale e dimostrazione costruttiva della sua Turing-equivalenza (simulazione reciproca di interpreti).

### 4. Decidibilità, Linguaggi e Limiti Assoluti del Calcolo
- **Classificazione dei Linguaggi Formali:**
  - **Linguaggio Decidibile (o Ricorsivo):** esiste una MdT che termina *sempre* su ogni input, accettando le parole di $L$ e rigettando quelle esterne.
  - **Linguaggio Accettabile (o Ricorsivamente Enumerabile / Semidecidibile):** esiste una MdT che termina accettando se $x \in L$, mentre se $x \notin L$ termina rigettando oppure diverge non terminando mai.
  - **Teorema Fondamentale di Decidibilità (Teorema 3.1):** un linguaggio $L$ è decidibile se e solo se sia $L$ che il suo complemento $L^c$ sono accettabili.
- **Teoria della Numerabilità (Cantor) e Limite del Calcolo:**
  - Numerabilità dell'insieme delle parole $\Sigma^*$ e dell'insieme di tutte le Macchine di Turing descrivibili.
  - Non numerabilità dell'insieme di tutti i linguaggi $\mathcal{P}(\Sigma^*)$ (metodo diagonale di Cantor).
  - Corollario: esistenza ontologica di un'infinità non numerabile di linguaggi non accettabili (problemi intrinsecamente non risolvibili).
- **Il Problema dell'Arresto (Halting Problem):**
  - Linguaggio dell'arresto: $L_H = \{ \langle i, x \rangle \mid T_i(x) \text{ converge} \}$.
  - Dimostrazione che $L_H$ è accettabile (tramite simulazione con la MTU).
  - **Dimostrazione per Assurdo dell'Indecidibilità di $L_H$:** costruzione della macchina diagonale $T^*$ che inverte l'esito della decisione su se stessa provocando un paradosso logico insolubile.
  - Corollario: il linguaggio complemento $L_H^c$ non è neppure accettabile.
- **Tecnica delle Riduzioni Many-to-One ($L_1 \le L_2$):**
  - Funzione totale e calcolabile $f$ tale che $x \in L_1 \iff f(x) \in L_2$.
  - Trasferimento di proprietà: se $L_2$ è decidibile $\implies L_1$ è decidibile; se $L_1$ è indecidibile $\implies L_2$ è indecidibile.
  - Esempi cardine di riduzione dall'Halting Problem: indecidibilità di $L_{H0} = \{ i \mid T_i(0) \text{ termina} \}$, del problema della totalità e del problema del linguaggio vuoto.

### 5. Grammatiche Generative e la Gerarchia di Chomsky
- **Definizione Formale di Grammatica:** quadrupla $G = \langle V_T, V_N, P, S \rangle$ con simboli terminali, non-terminali, produzioni di riscrittura $\alpha \to \beta$ e assioma iniziale $S$. Derivazione sequenziale $\Rightarrow^*$ e linguaggio generato $L(G)$.
- **I Quattro Livelli della Gerarchia di Chomsky:**
  - **Tipo 0 (Senza Restrizioni):** produzioni arbitrarie $\alpha \to \beta$; equivalenza con i linguaggi accettabili (Turing-riconoscibili). Dimostrazione di simulazione reciproca tra MdT e grammatiche Tipo 0.
  - **Tipo 1 (Context-Sensitive / Dipendenti dal Contesto):** produzioni non accorcianti $|\alpha| \le |\beta|$ (con eventuale inclusione controllata della parola vuota $\epsilon$ solo dall'assioma); equivalenza con gli Automi Linearmente Limitati (LBA) e i linguaggi decidibili.
  - **Tipo 2 (Context-Free / Libere dal Contesto):** produzioni con un singolo non-terminale a sinistra $A \to \alpha$; alberi di derivazione sintattica.
  - **Tipo 3 (Regolari / Lineari):** produzioni $A \to aB$ o $A \to a$; equivalenza formale con gli Automi a Stati Finiti Deterministici (ASFD) e Non Deterministici (ASFND).
- **Linguaggi Context-Free (CFL) e Automi a Pila (PDA):**
  - **Pumping Lemma per CFL (Lemma di Bar-Hillel):** condizione necessaria per l'appartenenza a CFL basata sul partizionamento $uvxyz$ con vincoli $|vxy| \le p$ e $|vy| \ge 1$; uso metodologico per dimostrare che linguaggi come $\{ a^n b^n c^n \mid n \ge 1 \}$ o $\{ w w \mid w \in \{a,b\}^* \}$ non sono context-free.
  - Proprietà di chiusura: i CFL sono chiusi per unione, concatenazione e stella di Kleene; **non** sono chiusi per intersezione e complemento.
  - **Automi a Pila (Pushdown Automata - PDA):**
    - Unità di controllo a stati finiti, testina di sola lettura e memoria infinita a pila (LIFO).
    - Ruolo essenziale del non determinismo.
    - Equivalenza tra accettazione per stato finale e accettazione per pila vuota.
    - Teorema di equivalenza: un linguaggio è context-free se e solo se è accettato da un PDA.
  - Sottofamiglia dei linguaggi deterministici liberi dal contesto (DCFL tramite DPDA), inclusione stretta nei CFL e indecidibilità dell'ambiguità inerente delle grammatiche CF.

### 6. Teoria della Complessità Computazionale e Misure di Blum
- **Assiomi di Misura della Complessità di Blum:**
  - Formalizzazione astratta delle risorse: la funzione di costo $\Phi_i(x)$ è definita se e solo se $T_i(x)$ termina, e la relazione $\Phi_i(x) \le c$ è decidibile.
- **Misure Concrete e Classi di Tempo e Spazio:**
  - Misure deterministiche e non deterministiche: $dtime(x)$, $ntime(x)$, $dspace(x)$, $nspace(x)$.
  - Definizione delle classi limite: $\text{DTIME}(f(n))$, $\text{NTIME}(f(n))$, $\text{DSPACE}(f(n))$, $\text{NSPACE}(f(n))$.
- **Relazioni Strutturali tra Tempo e Spazio:**
  - $\text{DTIME}(f(n)) \subseteq \text{NTIME}(f(n))$ e $\text{DSPACE}(f(n)) \subseteq \text{NSPACE}(f(n))$.
  - $\text{DTIME}(f(n)) \subseteq \text{DSPACE}(f(n))$ (lo spazio utilizzato non può eccedere il numero di passi).
  - $\text{NTIME}(f(n)) \subseteq \text{DSPACE}(f(n))$ (simulazione esaustiva con riciclo di memoria).
  - Limite sul numero di configurazioni globali distinte: $\text{NSPACE}(f(n)) \subseteq \text{DTIME}(c^{f(n)})$.
- **Funzioni Constructible e Teoremi di Gerarchia:**
  - Funzioni time-constructible e space-constructible (calcolabili entro i limiti di risorsa specificati).
  - **Teorema della Gerarchia Temporale (Time Hierarchy Theorem):** $\text{DTIME}(f(n)) \subsetneq \text{DTIME}(f(n)\log f(n))$.
  - **Teorema della Gerarchia Spaziale (Space Hierarchy Theorem):** $\text{DSPACE}(f(n)) \subsetneq \text{DSPACE}(f(n))$.
  - **Gap Theorem di Borodin:** esistenza di lacune arbitrarie di complessità in assenza di proprietà di constructibility.
  - **Teorema di Savitch:** ogni computazione non deterministica in spazio $f(n)$ è simulabile deterministicamente in spazio quadratico:
    $$\text{NSPACE}(f(n)) \subseteq \text{DSPACE}((f(n))^2)$$
    Corollario epocale sullo spazio polinomiale: $\text{PSPACE} = \text{NPSPACE}$.

### 7. Classi Strutturali di Complessità e NP-Completezza
- **Tassonomia delle Grandi Classi di Complessità:**
  - $\text{P} = \bigcup_{k \ge 1} \text{DTIME}(n^k)$.
  - $\text{NP} = \bigcup_{k \ge 1} \text{NTIME}(n^k)$.
  - $\text{PSPACE} = \bigcup_{k \ge 1} \text{DSPACE}(n^k) = \text{NPSPACE}$.
  - $\text{EXPTIME} = \bigcup_{k \ge 1} \text{DTIME}(2^{n^k})$.
  - $\text{NEXPTIME} = \bigcup_{k \ge 1} \text{NTIME}(2^{n^k})$.
  - Inclusione globale: $\text{P} \subseteq \text{NP} \subseteq \text{PSPACE} \subseteq \text{EXPTIME} \subseteq \text{NEXPTIME}$, con separazione dimostrata $\text{P} \subsetneq \text{EXPTIME}$.
- **La Classe co-NP e Relazioni di Complementazione:**
  - Teoremi sulle classi complementari: se $\text{P} = \text{NP} \implies \text{NP} = \text{co-NP}$. Se esiste un problema NP-completo appartenente a co-NP, allora $\text{NP} = \text{co-NP}$.
- **Riduzioni Polinomiali e Completezza:**
  - Chiusura di P, NP, EXPTIME rispetto a riduzioni polinomiali many-to-one.
  - Catene di riduzioni formali studiate nel corso:
    - $\text{3-SAT} \le_P \text{SAT}$.
    - $\text{3-SAT} \le_P \text{Vertex Cover}$.
    - $\text{Vertex Cover} \le_P \text{Independent Set} \le_P \text{Clique}$.
    - $\text{Dominating Set} \le_P \text{Vertex Cover}$.
    - $\text{3-SAT} \le_P \text{3-Colorabilità}$.
    - $\text{Vertex Cover} \le_P \text{Ciclo Hamiltoniano} \le_P \text{Percorso Hamiltoniano} \le_P \text{Commesso Viaggiatore (TSP)}$.

---

## Linguaggi, Strumenti e Tecnologie

- **Modelli di Calcolo:** Macchine di Turing deterministiche/non-deterministiche a singoli e multipli nastri, Macchina di Turing Universale.
- **Formalismi Grammaticali e Automi:** Notazione BNF, grammatiche generatrici di tipo 0, 1, 2 e 3, Automi a Stati Finiti (DFA/NFA), Automi a Pila (PDA deterministici e non deterministici).
- **Linguaggi di Programmazione Astratti:** PascalMinimo (macchina a registri / modello imperativo ridotto all'osso per prove di Turing-equivalenza).

---

## Tipologia Esercizi e Prove d'Esame

La prova d'esame si compone di una prova scritta rigorosa e di un colloquio orale teorico:
1. **Esercizi di Progettazione di Macchine di Turing:**
   - Definizione dell'alfabeto, degli stati interni e stesura dell'insieme formale delle quintuple per riconoscere linguaggi o calcolare funzioni aritmetico-stringa su nastro.
2. **Dimostrazioni di Calcolabilità e Indecidibilità:**
   - Dimostrazione che specifici linguaggi sono decidibili, accettabili o non accettabili tramite riduzioni formali $L_1 \le L_2$ a partire dal problema della fermata ($L_H$).
3. **Esercizi su Grammatiche, Automi e Linguaggi Formali:**
   - Costruzione di grammatiche regolari o context-free per linguaggi strutturati.
   - Definizione della tabella di transizione di un Automa a Pila (PDA) per un linguaggio dato.
   - Dimostrazione formale di non-appartenenza ai CFL tramite applicazione del Pumping Lemma (gestione dei casi di sovrapposizione della fattorizzazione $uvxyz$).
4. **Analisi e Dimostrazioni di Complessità Computazionale:**
   - Risoluzione di quesiti teorici sulle relazioni tra classi (DTIME, NTIME, DSPACE, NSPACE).
   - Dimostrazione di riduzioni polinomiali di Karp per problemi di decisione.
   - Verifica di appartenenza a NP tramite definizione esplicita del certificato e dell'algoritmo di verifica polinomiale.
5. **Colloquio Orale:**
   - Interrogazione approfondita sui teoremi e relative dimostrazioni (indecidibilità dell'Halting Problem per diagonalizzazione, equivalenza MNT e MdT con tecnica della coda di rondine, Teorema di Savitch con dimostrazione ad albero ricorsivo, Assiomi di Blum, Teorema 3.1 sulla decidibilità del complemento, e relazioni di completezza).
