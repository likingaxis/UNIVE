# Resoconto Corso: Intelligenza Artificiale

- **Anno:** 3° Anno Triennale
- **Area:** Ingegneria Informatica / Sistemi di Elaborazione delle Informazioni e Intelligenza Artificiale (ING-INF/05)
- **Docente e Riferimenti:** Prof. Roberto Basili (SAG - Semantic Analytics Group, Università di Roma Tor Vergata), S. Russell & P. Norvig (*Artificial Intelligence: A Modern Approach* - Pearson), materiale didattico ufficiale, formulari ed eserciziari d'esonero.

---

## Obiettivi del Corso in Sintesi

Il corso offre una trattazione organica, formale e rigorosa dell'Intelligenza Artificiale, integrando armoniosamente il paradigma simbolico/dichiarativo con il paradigma sub-simbolico, statistico e induttivo. Vengono presentati i fondamenti teorici degli agenti razionali autonomi, gli algoritmi di ricerca euristica nello spazio degli stati, le metodologie di ottimizzazione locale, il ragionamento logico deduttivo (logica proposizionale e del primo ordine con metodo di risoluzione), le strutture di rappresentazione della conoscenza e semantica lessicale (ontologie, logiche descrittive, frame, WordNet), l'elaborazione del linguaggio naturale (NLP) e l'apprendimento automatico supervisionato (classificatori lineari, alberi di decisione con information gain, reti neurali multistrato MLP, backpropagation, gradient descent e metriche di generalizzazione).

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### 1. Fondamenti dell'IA e Paradigma degli Agenti Intelligenti
- **Approcci storici e concettuali all'Intelligenza Artificiale:**
  - *Agire Umanamente:* il Test di Turing classico (comunicazione testuale cieca) e il Test di Turing Totale (integrazione di percezione visiva e manipolazione robotica).
  - *Pensare Umanamente:* la modellazione cognitiva, introspezione e scienze cognitive computazionali.
  - *Pensare Razionalmente:* formalizzazione delle "leggi del pensiero" (sillogismi e logica formale).
  - *Agire Razionalmente:* il paradigma unificante dell'**Agente Razionale**.
- **Definizione e ciclo operativo dell'Agente:**
  - Definizione: entità che percepisce l'ambiente tramite sensori e agisce su di esso mediante attuatori.
  - Percezioni (*Percepts*), sequenza percettiva, funzione agente astratta ($f: P^* \to A$) e programma agente su architettura fisica ($\text{agente} = \text{architettura} + \text{programma}$).
  - Il ciclo operativo in 4 fasi: *Percepire $\to$ Decidere $\to$ Agire $\to$ Aggiornare lo stato*.
  - **Nozione formale di Razionalità:** massimizzazione del valore atteso della misura di prestazione a fronte della storia percettiva e della conoscenza pregressa. Distinzione netta tra *Razionalità* (ottimizzazione dell'esito atteso) e *Onniscienza* (conoscenza certa dell'esito futuro effettivo); autonomia e raccolta attiva di informazioni (*information gathering*).
- **Caratterizzazione del Task Environment (Modello PEAS):**
  - Definizione rigorosa di **P**erformance, **E**nvironment, **A**ctuators, **S**ensors (esempi classici: agente tassista autonomo, aspirapolvere, diagnosi medica).
- **Tassonomia delle proprietà degli ambienti operativi:**
  - *Completamente Osservabile vs Parzialmente Osservabile* (o inosservabile).
  - *Agente Singolo vs Multi-Agente* (cooperativo vs competitivo/avversariale).
  - *Deterministico vs Stocastico vs Non Deterministico*.
  - *Episodico vs Sequenziale* (impatto a lungo termine delle azioni correnti).
  - *Statico vs Dinamico vs Semi-dinamico* (invarianza dell'ambiente o della misura di prestazione durante la deliberazione).
  - *Discreto vs Continuo* (granularità di stati, tempo, percezioni e comandi attuatori).
  - *Noto (Known) vs Ignoto (Unknown)* (conoscenza a priori delle regole di transizione del mondo).
- **Struttura e tipologie di Programmi Agente:**
  - *Agenti Reattivi Semplici:* regole dirette condizione-azione (`if-then`), assenza di memoria, vulnerabilità ai cicli in ambienti parziali.
  - *Agenti Reattivi Basati su Modello:* mantenimento di uno stato interno tramite modello di transizione del mondo e modello sensoriale.
  - *Agenti Basati su Obiettivi (Goal-Based):* integrazione di scopi espliciti; pianificazione e ricerca nel futuro.
  - *Agenti Basati sull'Utilità (Utility-Based):* funzione di utilità scalare per la quantificazione della preferenza e la gestione di trade-off probabilistici.
  - *Agenti Capaci di Apprendere:* architettura a 4 componenti (Learning Element, Performance Element, Critic, Problem Generator).
- **Rappresentazioni dello stato del mondo:** Atomica, Fattorizzata, Strutturata.

---

### 2. Risoluzione di Problemi tramite Ricerca nello Spazio degli Stati
- **Formulazione formale del problema di ricerca:**
  - Componenti: Insieme degli stati $S$, Stato iniziale $s_0$, Insieme delle azioni $Actions(s)$, Modello di transizione $Result(s, a)$, Test di obiettivo $GoalTest(s)$, Costo del cammino $c(s, a, s')$.
  - Concetto di **Astrazione** (rimozione selettiva di dettagli irrilevanti per garantire la computabilità).
- **Alberi di Ricerca e Criteri di Valutazione:**
  - Nodi di ricerca (stato, puntatore al padre, azione generatrice, costo cumulato $g(n)$, profondità). Frontiera (o lista aperta) ed esplorati (lista chiusa).
  - Le 4 metriche di valutazione degli algoritmi: **Completezza**, **Ottimalità**, **Complessità Temporale**, **Complessità Spaziale** (in funzione del branching factor $b$, profondità ottima $d$ e profondità massima $m$).
- **Strategie di Ricerca Non Informata (Cieca):**
  - **Ricerca in Ampiezza (BFS):** espansione per livelli (coda FIFO); completa ed ottimale per costi unitari; complessità temporale e spaziale esponenziale $O(b^d)$.
  - **Ricerca a Costo Uniforme (UCS / Dijkstra):** coda con priorità ordinata per costo $g(n)$; completa ed ottimale per qualsiasi costo positivo ($c \ge \epsilon > 0$).
  - **Ricerca in Profondità (DFS):** espansione del nodo più profondo (coda LIFO / stack); memoria lineare $O(bm)$, non ottimale, incompleta su spazi infiniti o con cicli.
  - **Ricerca a Profondità Limitata (DLS)** con cutoff predeterminato.
  - **Ricerca ad Approfondimento Iterativo (IDS):** esecuzioni progressive di DFS con limite di profondità crescente; unisce la memoria lineare di DFS ($O(bd)$) con la completezza e l'ottimalità di BFS ($O(b^d)$).
  - **Ricerca Bidirezionale:** ricerca simultanea in avanti dall'origine e all'indietro dal goal; arresto all'intersezione delle frontiere ($O(b^{d/2})$).

---

### 3. Ricerca Informata (Euristica) e Ottimizzazione
- **Euristiche e Algoritmo A\*:**
  - Funzione euristica $h(n)$: stima del costo residuo da $n$ al goal più vicino.
  - *Greedy Best-First Search:* selezione guidata da $f(n) = h(n)$; veloce ma non completa e non ottimale.
  - **Algoritmo A\*:** valutazione combinata $f(n) = g(n) + h(n)$ (costo effettivo accumulato + stima euristica rimanente).
  - **Proprietà delle Euristiche:**
    - **Ammissibilità:** l'euristica non sovrastima mai il costo effettivo per raggiungere l'obiettivo ($0 \le h(n) \le h^*(n)$). L'ammissibilità garantisce l'ottimalità di A\* nella ricerca su alberi.
    - **Consistenza (o Monotonicità):** per ogni nodo $n$ e successore $n'$ generato dall'azione $a$, vale la disuguaglianza triangolare $h(n) \le c(n, a, n') + h(n')$. La consistenza implica l'ammissibilità e garantisce l'ottimalità di A\* nella ricerca su grafi senza riaprire nodi chiusi.
  - Generazione di euristiche: rilassamento dei vincoli del problema (es. Manhattan Distance e Misplaced Tiles nel gioco dell'8), database di pattern disgiunti.
- **Varianti di Ricerca Euristica a Memoria Limitata:**
  - IDA\* (Iterative Deepening A\* basato su soglie di $f(n)$), RBFS (Recursive Best-First Search in spazio lineare), SMA\* (Simplified Memory-Bounded A\* con pruning selettivo dei nodi peggiori a buffer pieno).
- **Ricerca Locale e Ottimizzazione:**
  - Ottimizzazione di funzioni obiettivo su panorami di stati (*State Space Landscape*).
  - **Hill Climbing (Scalata della Collina):** approccio greedy locale; trappole classiche: massimi locali, plateau/creste; varianti: random restart, stocastico.
  - **Simulated Annealing (Tempra Simulata):** analogia termodinamica; ammette mosse peggiorative con probabilità legata al decremento di energia e alla temperatura decrescente $P = e^{\Delta E / T}$; convergenza teorica all'ottimo globale con raffreddamento sufficientemente lento.
  - Local Beam Search (mantenimento parallelo di $k$ stati) e Algoritmi Genetici.
- **Ricerca in Ambienti Complessi:**
  - Alberi di ricerca AND-OR e pianificazione condizionale in ambienti non deterministici.
  - Ricerca nello spazio degli stati-credenza (*belief states*) in ambienti parzialmente osservabili.
  - Ricerca online: alternanza real-time tra computazione e azione in ambienti sconosciuti; algoritmo LRTA\* (Learning Real-Time A\*) con aggiornamento euristico basato sull'esperienza.

---

### 4. Agenti Logici e Ragionamento Simbolico
- **Agenti basati sulla Conoscenza:**
  - Ruolo della Knowledge Base (KB); primitive `Tell` (inserimento asserzioni) e `Ask` (interrogazione deduttiva); livello di conoscenza vs livello implementativo; approccio dichiarativo vs procedurale.
- **Logica Proposizionale:**
  - Sintassi: simboli proposizionali atomici ($P, Q, R$), connettivi booleani ($\neg, \land, \lor, \implies, \iff$).
  - Semantica formale: assegnazione di verità nei modelli $M(\alpha)$. Validità (tautologie), soddisfacibilità, insoddisfacibilità (contraddizioni).
  - Concetto formale di **Entailment (Conseguenza Logica):** $\alpha \models \beta \iff M(\alpha) \subseteq M(\beta)$ (la conclusione $\beta$ è vera in tutti i modelli in cui è vera la premessa $\alpha$).
  - Teorema di deduzione: $\alpha \models \beta \iff (\alpha \implies \beta)$ è valida.
- **Metodi di Inferenza e Dimostrazione Automatica di Teoremi:**
  - Regole di inferenza corrette: Modus Ponens, eliminazione dell'AND, risoluzione unitaria.
  - **Dimostrazione per Risoluzione e Refutazione:**
    - Conversione di formule arbitrarie in **Forma Normale Congiuntiva (CNF):** congiunzione di clausole disgiuntive. Passaggi algebrici: eliminazione di $\iff$ e $\implies$, de-morganizzazione (propagazione negazioni verso l'interno), distribuzione di $\lor$ su $\land$.
    - Regola di risoluzione proposizionale: date clausole $(A \lor l)$ e $(B \lor \neg l)$, si deduce il risolvente $(A \lor B)$.
    - Dimostrazione per refutazione: per verificare se $KB \models \alpha$, si aggiunge $\neg \alpha$ a $KB$ in forma CNF e si applica iterativamente la risoluzione cercando di derivare la clausola vuota $\square$ (contraddizione). Completezza e correttezza della risoluzione proposizionale.
- **Logica del Primo Ordine (FOL):**
  - Maggiore espressività: oggetti, costanti, predicati relazionali, funzioni, variabili e quantificatori ($\forall, \exists$).
  - Inferenza in FOL: unificazione mediante *Most General Unifier* (MGU), Skolemizzazione per l'eliminazione dei quantificatori esistenziali, risoluzione generale al primo ordine.

---

### 5. Rappresentazione della Conoscenza e Semantica del Linguaggio
- **Ingegneria della Conoscenza e Ontologie:**
  - Definizione formale di Ontologia: specificazione esplicita e condivisibile di una concettualizzazione concettuale di un dominio.
  - Tassonomie di classi/categorie, relazioni tassonomiche (`IS-A`, inclusione tra insiemi), relazioni non tassonomiche, proprietà e assiomi di vincolo. Ontologie superiori (*Upper Ontologies*).
- **Reti Semantiche e Frame:**
  - **Reti Semantiche:** grafi orientati in cui i nodi rappresentano concetti/istanze e gli archi relazioni semantiche (`IS-A`, `inst-of`, `has-part`); propagazione delle proprietà per ereditarietà lungo la gerarchia; criticità e limiti: assenza di semantica formale rigorosa, eccezioni e cancellazione di attributi, conflitto delle eredità (problema del diamante di Nixon).
  - **Sistemi a Frame (Minsky):** organizzazione in strutture prototipiche per situazioni convenzionali; campi slot-filler, vincoli di tipo, valori di default, attivazione di procedure accessorie (*demons / procedural attachment*).
- **Logiche Descrittive (DL) e Web Semantico:**
  - Linguaggi formali di concetti e ruoli; architettura a due componenti: **TBox** (conoscenza terminologica, definizioni di concetti complessi tramite costruttori) e **ABox** (conoscenza asserzionale su individui specifici).
  - Servizi di inferenza deduttiva: controllo di consistenza, sussunzione (*subsumption*) e classificazione automatica. Fondamento teorico degli standard OWL e RDF.
- **Semantica Linguistica, Risorse Lessicali e NLP:**
  - **Frame Semantics (Fillmore):** teoria secondo cui il significato delle unità lessicali evoca frame concettuali strutturati attorno a ruoli semantici correlati; risorsa computazionale **FrameNet**.
  - **WordNet:** database lessicale per l'elaborazione del linguaggio naturale; organizzazione attorno a insiemi di sinonimi (**Synset**); relazioni semantiche tra synset: iperonimia/iponimia (gerarchia concettuale), olonimia/meronimia (relazione parte-tutto), antonimia.
  - **Knowledge Graphs:** rappresentazione di fatti e relazioni del mondo reale come insiemi di triple $\langle \text{soggetto}, \text{predicato}, \text{oggetto} \rangle$.
  - **Natural Language Processing (NLP):** sfide e livelli di ambiguità (lessicale, sintattica, semantica, pragmatica); pipeline classica di analisi linguistica: segmentazione/tokenizzazione $\to$ Part-of-Speech Tagging $\to$ Analisi sintattica (alberi di derivazione) $\to$ Analisi semantica (composizionalità, logica predicativa) $\to$ Pragmatica e contesto discorsivo.

---

### 6. Apprendimento Automatico Supervisionato e Modelli Fondamentali
- **Paradigma del Machine Learning (ML):**
  - Definizione formale di apprendimento induttivo: miglioramento delle prestazioni $P$ sul compito $T$ all'aumentare dell'esperienza $E$.
  - Tassonomia: Apprendimento Supervisionato, Non Supervisionato (clustering, riduzione dimensionalità), per Rinforzo (*Reinforcement Learning*).
  - Compiti supervisionati: **Classificazione** (etichette di classe discrete) vs **Regressione** (valori numerici continui).
  - Formalizzazione matematica: apprendimento di una funzione ipotesi $h(x) \in \mathcal{H}$ che approssima la funzione target sconosciuta $f(x)$ a partire da un dataset finito di addestramento $\mathcal{D} = \{(x_i, y_i)\}_{i=1}^N$.
  - Compromesso tra Bias e Varianza (*Bias-Variance Trade-off*) e principio del Rasoio di Occam (preferenza per modelli a minor complessità a parità di aderenza empirica).
- **Classificatori Lineari e Perceptron:**
  - Modello lineare: combinazione pesata delle feature $h_w(x) = w \cdot x + b = \sum w_j x_j + b$.
  - Frontiera di decisione iperpianare ($w \cdot x + b = 0$).
  - **Percettrone di Rosenblatt:** neurone artificiale con funzione di attivazione a gradino (*step function*).
  - Algoritmo di aggiornamento dei pesi guidato dall'errore: $w \leftarrow w + \eta (y - \hat{y}) x$.
  - Teorema di convergenza del percettrone: garanzia di convergenza in un numero finito di passi se e solo se i dati sono linearmente separabili. Limite insormontabile della separabilità lineare (dimostrazione di Minsky & Papert sul problema dello XOR).
- **Alberi Decisionali (Decision Trees - Algoritmo ID3 / C4.5):**
  - Modello non parametrico interpretabile basato su regole decisionali annidate (*if-then-else*).
  - **Entropia di Shannon** del dataset $S$:
    $$H(S) = - \sum_{i=1}^c p_i \log_2 p_i$$
    (misura quantitativa di disordine e incertezza informativa; $H=0$ per nodo puro, $H=1$ per distribuzione binaria uniforme).
  - **Remainder (Entropia Residua)** a seguito dello split sull'attributo candidato $A$:
    $$\text{Remainder}(S, A) = \sum_{v \in \text{Valori}(A)} \frac{|S_v|}{|S|} H(S_v)$$
  - **Information Gain (Guadagno Informativo):**
    $$IG(S, A) = H(S) - \text{Remainder}(S, A)$$
  - Algoritmo top-down greedy (TDIDT): calcolo di $IG$ per ogni attributo disponibile, selezione della radice come $A^* = \arg\max_A IG(S, A)$, partizione ricorsiva dei sottoinsiemi fino a soddisfare i criteri di arresto (purezza della classe, esaurimento degli attributi o profondità massima).

---

### 7. Reti Neurali Artificiali (MLP) e Deep Learning
- **Multilayer Perceptron (MLP):**
  - Superamento del vincolo di separabilità lineare componendo strati di neuroni con funzioni di attivazione non lineari continue e differenziabili (Sigmoide logistica $\sigma(z) = \frac{1}{1 + e^{-z}}$, Tangente Iperbolica $\tanh(z)$, Rettificatore lineare ReLU $\max(0, z)$).
  - Architettura feedforward a strati: Input Layer $\to$ Hidden Layers $\to$ Output Layer.
  - Teorema di Approssimazione Universale di Cybenko: una rete neurale feedforward con almeno uno strato nascosto non lineare può approssimare qualsiasi funzione continua su compatti a meno di un errore arbitrario $\epsilon$.
- **Funzioni di Loss (Costo):**
  - Per compiti di regressione: Errore Quadratico Medio / Scarto quadratico ($MSE = \frac{1}{2} (y - \hat{y})^2$).
  - Per compiti di classificazione binaria o multiclasse: Cross-Entropy Loss / Log-Loss ($-\sum y_i \log \hat{y}_i$).
- **Algoritmo di Addestramento delle Reti Neurali:**
  - **Forward Propagation:** calcolo delle combinazioni lineari dei pesi $z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)}$ e applicazione della funzione di attivazione $a^{(l)} = \sigma(z^{(l)})$ procedendo dagli ingressi all'uscita.
  - **Backpropagation:** propagazione retrograda dell'errore calcolato sull'output verso gli strati interni mediante applicazione ricorsiva della regola della catena (*chain rule*); determinazione esatta dei gradienti delle perdite rispetto a tutti i pesi e bias della rete ($\frac{\partial \mathcal{L}}{\partial W_{ij}^{(l)}}$).
  - **Gradient Descent e Varianti Stocastiche (SGD / Adam):** aggiornamento dei parametri muovendosi in direzione opposta al gradiente della loss:
    $$W \leftarrow W - \eta \nabla_W \mathcal{L}$$
    (dove $\eta > 0$ è il learning rate).
- **Prospettiva del Deep Learning:**
  - Apprendimento automatico gerarchico delle rappresentazioni (*feature representation learning*) dagli strati più bassi (basso livello) a quelli più alti (concettuali/semantici); architetture Encoder-Decoder e vettori densi di embedding per parole e documenti.

---

### 8. Metodologia di Valutazione e Validazione dei Modelli di Apprendimento
- **Partizionamento dei dati e controllo del fitting:**
  - Divisione del dataset in Training Set (addestramento parametri), Validation Set (selezione iperparametri, regolarizzazione), Test Set (stima non polarizzata delle prestazioni); validazione incrociata ($K$-Fold Cross-Validation).
  - **Overfitting (Sovradattamento):** memorizzazione del rumore del training set, bassissimo errore di training ma pessima capacità di generalizzazione sui dati di test; tecniche di contrasto: regolarizzazione $L_1/L_2$ (pesatura della complessità dei pesi), Dropout, potatura (*pruning*) degli alberi decisionali, arresto anticipato (*Early Stopping*).
  - **Underfitting (Sottodattamento):** scarsa capacità espressiva del modello rispetto alla complessità intrinseca della funzione target.
- **Metriche di Valutazione della Classificazione:**
  - **Matrice di Confusione:** Veri Positivi ($TP$), Falsi Positivi ($FP$), Veri Negativi ($TN$), Falsi Negativi ($FN$).
  - **Accuracy:** $(TP + TN) / (TP + TN + FP + FN)$ (poco indicativa in classi fortemente sbilanciate).
  - **Precision:** $TP / (TP + FP)$ (affidabilità delle predizioni positive).
  - **Recall:** $TP / (TP + FN)$ (capacità di intercettare tutti gli esempi positivi reali).
  - **$F_1$-score:** media armonica tra Precision e Recall ($F_1 = 2 \frac{P \cdot R}{P + R}$).
  - Strategie di aggregazione multiclasse: **Macro-averaging** (media aritmetica semplice delle metriche di ciascuna classe, dà uguale peso a classi rare e frequenti) vs **Micro-averaging** (aggregazione cumulativa di tutti i $TP, FP, FN$ globali prima del calcolo della metrica, dominata dalle classi a frequenza maggiore).

---

## Linguaggi, Strumenti e Tecnologie
- **Linguaggi e Ambienti:** Python (ecosistema scientifico per IA e Machine Learning).
- **Librerie di Riferimento:**
  - NumPy e SciPy (computazione vettoriale, matriciale e funzioni di algebra lineare).
  - Scikit-Learn (implementazione di algoritmi di ricerca euristica, classificatori lineari, Perceptron, alberi di decisione `DecisionTreeClassifier`, calcolo di Information Gain, matrici di confusione e metriche di valutazione).
  - PyTorch (modellazione formale di reti feedforward MLP, calcolo automatico dei gradienti con `autograd`, ottimizzatori SGD/Adam, loss MSE e CrossEntropy).
  - NLTK e SpaCy (pipeline NLP, tokenizzazione, annotazione sintattica, interfaccia di consultazione di WordNet).
- **Sistemi di Logica e Ontologie:** Prolog (programmazione logica e risoluzione per refutazione), Protégé / standard W3C OWL e RDF (modellazione ontologica e reasoning deduttivo).

---

## Tipologia Esercizi e Prove d'Esame
- **Esercizi del Primo Esonero (Agenti, Ricerca e Logica):**
  1. **Modellazione PEAS e analisi dell'ambiente:** definizione formale dei componenti PEAS per un agente autonomo assegnato (es. aspirapolvere, agente navigatore, gatto-topo) e classificazione motivata delle 7 proprietà dell'ambiente operativo.
  2. **Tracciamento di algoritmi di ricerca:** esecuzione manuale passo-passo della frontiera e dell'ordine di estrazione/espansione dei nodi per BFS, DFS, UCS, Greedy ed algoritmo A\* su grafi con costi e valori euristici espliciti, con verifica della consistenza e dell'ammissibilità dell'euristica.
  3. **Risoluzione Logica per Refutazione:** formalizzazione in logica proposizionale o del primo ordine (FOL) di un problema deduttivo, conversione sistematica delle formule nella KB e del goal negato in forma a clausole CNF, applicazione di passi di risoluzione e unificazione fino alla derivazione della clausola vuota.
- **Esercizi del Secondo Esonero (ML, NLP e Reti Neurali):**
  1. **Costruzione di Alberi Decisionali (ID3):** dato un dataset tabellare con attributi binari/categorici, calcolo numerico esplicito dell'entropia iniziale $H(S)$, calcolo del Remainder e dell'Information Gain $IG(S, A_i)$ per ciascun attributo candidato, selezione motivata del nodo radice e iterazione ricorsiva fino alla determinazione di foglie pure.
  2. **Modellazione formale di un MLP per task di Regressione o Classificazione:**
     - Definizione del task supervisionato (es. approssimazione della funzione non lineare $y = \sin(x) + 3$, sentiment analysis su tweet, ranking di rilevanza query-documento).
     - Formulazione dello spazio delle feature, dell'architettura della rete neurale (strato di input, strato nascosto con non-linearità, strato di output).
     - Scelta e scrittura matematica della Loss Function (MSE per regressione o Cross-Entropy per classificazione).
     - Spiegazione analitica dei passaggi di Forward Propagation, Backpropagation (regola della catena per i gradienti) e aggiornamento dei pesi tramite Gradient Descent.
  3. **Valutazione e Metriche di Classificazione:** data una tabella di predizioni o una matrice di confusione multiclasse sbilanciata, calcolo puntuale di Precision, Recall, $F_1$-score per ciascuna classe, e calcolo di Macro-$F_1$ e Micro-$F_1$ con discussione critica dell'impatto dello sbilanciamento dei dati.
