# Resoconto Corso: Algoritmi e Strutture Dati 2 (Algoritmi 2)

- **Anno:** 2° Anno Triennale
- **Area:** Algoritmica Avanzata, Ottimizzazione Combinatoria e Teoria della Complessità (INF/01)
- **Docente di Riferimento (da appunti):** Prof. L. Gualà / Documenti didattici del corso

---

## Obiettivi del corso in sintesi

Il corso approfondisce i paradigmi avanzati di progettazione algoritmica per problemi combinatori complessi, l'analisi fine della complessità computazionale ammortizzata e approssimata, e i fondamenti della teoria dell'intrattabilità computazionale. L'insegnamento si concentra sulle tecniche di progettazione Greedy avanzata, Programmazione Dinamica (lineare, bidimensionale e con ottimizzazioni di spazio), Reti di Flusso con teoremi di dualità, Algoritmi di Approssimazione per problemi NP-difficili e Teoria della NP-completezza tramite riduzioni polinomiali formali.

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### 1. Paradigma Greedy Avanzato e Minimum Spanning Tree (MST)
- **Problemi di Scheduling:**
  - **Interval Scheduling:** selezione del massimo insieme di intervalli reciprocamente compatibili; algoritmo greedy ordinato per tempo di fine crescente (*earliest finish time*); dimostrazione formale di ottimalità tramite tecnica dello scambio (*exchange argument*); complessità $O(n\log n)$.
  - **Interval Partitioning:** assegnazione di tutte le attività al minor numero possibile di aule/risorse; nozione fondamentale di profondità (*depth*) come lower bound; algoritmo greedy guidato dal tempo di inizio con coda con priorità per le aule disponibili; complessità $O(n\log n)$.
- **Minimum Spanning Tree (MST - Albero Ricoprente Minimo):**
  - **Proprietà di Taglio (Cut Property):** per ogni taglio del grafo, l'arco di costo minimo che attraversa il taglio appartiene a qualsiasi MST (se strettamente minimo, appartiene a tutti gli MST).
  - **Proprietà del Ciclo (Cycle Property):** per ogni ciclo semplice nel grafo, l'arco di costo strettamente massimo nel ciclo non appartiene ad alcun MST.
  - **Unicità del MST:** teorema di unicità se tutti i pesi degli archi sono distinti; non-unicità in presenza di pesi ripetuti.
  - **Confronto MST vs Shortest Path Tree (SPT):** incompatibilità concettuale e costruzione di controesempi con grafi a pesi positivi o unitari.
  - **Algoritmo di Kruskal:** ordinamento crescente degli archi e inclusione incrementale con rilevamento dei cicli tramite Union-Find; costo $O(m\log n)$.
  - **Algoritmo di Prim:** crescita incrementale a partire da una radice usando la Cut Property e code con priorità; costo $O(m + n\log n)$.
  - **Algoritmo Reverse-Delete:** eliminazione incrementale degli archi più costosi che appartengono a cicli (Cycle Property).
- **Problema del Clustering con Spacing Massimo:**
  - Partizione di $n$ oggetti in $k$ cluster non vuoti per massimizzare la distanza minima inter-cluster.
  - Equivalenza all'algoritmo di Kruskal interrotto quando rimangono esattamente $k$ componenti connesse (eliminazione dei $k-1$ archi più costosi).

### 2. Strutture Dati per Insiemi Disgiunti (Union-Find)
- **Interfaccia astratta:** operazioni `MakeSet(x)`, `Find(x)`, `Union(A, B)`.
- **Implementazione QuickFind:** foresta di alberi di altezza 1 (puntatori diretti alla radice); `Find` in $O(1)$, `Union` ingenua in $O(n)$.
  - Euristica di bilanciamento *Union-by-Size*: aggiornamento dei puntatori dell'insieme più piccolo; costo ammortizzato su sequenze di operazioni ridotto a $O(\log n)$.
- **Implementazione QuickUnion:** alberi di altezza arbitraria con puntatori al padre; `Union` in $O(1)$, costo di `Find` proporzionale all'altezza.
  - Euristica *Union-by-Rank*: unione della radice di rango minore a quella di rango maggiore; altezza massima dell'albero limitata logaritmicamente a $O(\log n)$.
  - Euristica *Path Compression (Compressione del cammino):* appiattimento dei nodi attraversati durante la `Find` collegandoli direttamente alla radice.
- **Analisi di Complessità Ammortizzata:**
  - Combinazione di *Union-by-Rank* e *Path Compression*: limite ammortizzato $O(m \cdot \alpha(n))$ su $m$ operazioni, dove $\alpha(n)$ è la funzione inversa di Ackermann a crescita estremamente lenta (praticamente costante $\le 4$ per ogni dimensione fisica).
  - Costruzione di sequenze testimoni per i bound asintotici.

### 3. Programmazione Dinamica (Dynamic Programming)
- **Principi Fondamentali:** suddivisione in sottoproblemi sovrapposti, proprietà di sottostruttura ottima, tabella di memorizzazione (tabulation bottom-up) vs ricorsione con memoization (top-down), procedura di traceback per ricostruire la configurazione ottima.
- **Independent Set di Peso Massimo su Cammino:**
  - Definizione sottoproblema: $OPT[j]$ come massimo peso sui primi $j$ vertici.
  - Equazione di Bellman: $OPT[j] = \max(OPT[j-1], w_j + OPT[j-2])$, tempo $O(n)$ e spazio $O(n)$ (ottimizzabile a $O(1)$).
- **Weighted Interval Scheduling:**
  - Ordinamento degli intervalli per finish time e calcolo del predecessore non sovrapposto $p(j)$ tramite ricerca binaria.
  - Ricorrenza: $OPT[j] = \max(OPT[j-1], w_j + OPT[p(j)])$, tempo $O(n\log n)$.
- **Longest Increasing Subsequence (LIS):**
  - Sottoproblema: lunghezza della più lunga sottosequenza crescente che termina esattamente con l'elemento $j$-esimo.
  - Ricorrenza quadratica con tempo $O(n^2)$.
- **Segmented Least Squares:**
  - Trade-off tra accuratezza della retta di regressione (errore quadratico residuo $E$) e parsimonia del modello ($c \cdot L$, penalità per segmento).
  - Ricorrenza: $OPT[j] = \min_{1 \le i \le j}(e_{ij} + c + OPT[i-1])$, complessità $O(n^2)$ con precalcolo delle somme.
- **Knapsack Problem (Problema dello Zaino 0/1):**
  - Definizione dello stato bidimensionale $OPT[i, w]$ su oggetti disponibili $1 \dots i$ e capacità residua $w \le W$.
  - Ricorrenza: $OPT[i, w] = \max(OPT[i-1, w], v_i + OPT[i-1, w - w_i])$.
  - Complessità pseudo-polinomiale $O(n \cdot W)$ in tempo e spazio; ricostruzione delle decisioni tramite traceback.
- **Sequence Alignment & Edit Distance:**
  - Penalità di gap ($\delta$) e penalità di mismatch ($\alpha_{pq}$).
  - Ricorrenza bidimensionale classica in tempo $O(mn)$ e spazio $O(mn)$.
  - **Algoritmo di Hirschberg:** combinazione di divide-et-impera e programmazione dinamica bidirezionale (forward da $(0,0)$ e backward da $(m,n)$) per individuare la cella di taglio a metà stringa; riduzione dello spazio a lineare $O(m+n)$ preservando il tempo $O(mn)$.
- **Cammini Minimi con Pesi Arbitrari/Negativi:**
  - Fallimento di Dijkstra in presenza di pesi negativi e concetto di ciclo a costo negativo assorbente.
  - Sottoproblema limitato per numero di archi: $OPT[i, v]$ = costo minimo da $v$ a $t$ con al più $i$ archi.
  - **Algoritmo di Bellman-Ford-Moore:** aggiornamento su $n-1$ passate con costo $O(nm)$ e spazio $O(n)$ mantenendo distanze e successori; rilevamento di cicli negativi all'iterazione $n$-esima.

### 4. Reti di Flusso e Teorema Max-Flow / Min-Cut
- **Definizioni e Modello di Rete:**
  - Grafo diretto $G=(V, E)$ con sorgente $s$, pozzo $t$ e capacità $c(e) \ge 0$.
  - Definizione di $st$-flusso: vincolo di capacità ($0 \le f(e) \le c(e)$) e vincolo di conservazione del flusso nei nodi intermedi ($\sum_{e \text{ in}} f(e) = \sum_{e \text{ out}} f(e)$).
  - Valore del flusso $\text{val}(f)$ uscente dalla sorgente $s$.
- **Tagli $st$ ($st$-cuts):**
  - Partizione dei nodi in $(A, B)$ con $s \in A$ e $t \in B$. Capacità del taglio $\text{cap}(A, B) = \sum_{u \in A, v \in B} c(u, v)$.
  - Lemma del Flusso Netto e Teorema della Dualità Debole: per ogni flusso $f$ e ogni taglio $(A, B)$, vale $\text{val}(f) \le \text{cap}(A, B)$.
- **Rete Residua ($G_f$) e Cammini Aumentanti:**
  - Costruzione di $G_f$ con archi in avanti (capacità residua $c(e) - f(e)$) e archi all'indietro (capacità residua $f(e)$ per consentire la cancellazione del flusso).
  - Cammino aumentante come cammino semplice da $s$ a $t$ in $G_f$; capacità di collo di bottiglia (*bottleneck capacity*).
- **Algoritmi per il Flusso Massimo:**
  - **Metodo di Ford-Fulkerson:** aumento iterativo del flusso lungo cammini aumentanti. Terminazione con capacità intere e costo pseudo-polinomiale $O(m \cdot |f^*|)$; divergenza o mancata terminazione con capacità irrazionali.
  - **Algoritmo di Edmonds-Karp:** scelta sistematica del cammino aumentante con minor numero di archi tramite visita in ampiezza (BFS); complessità fortemente polinomiale $O(VE^2)$.
  - **Algoritmo con Capacity Scaling ($\Delta$-scaling):** restrizione della ricerca ai cammini con bottleneck $\ge \Delta$, dimezzando iterativamente $\Delta$; complessità $O(m^2\log C)$.
- **Teorema Fondamentale Max-Flow / Min-Cut:**
  - Equivalenza tra: (1) $f$ è un flusso massimo, (2) non esistono cammini aumentanti in $G_f$, (3) $\text{val}(f) = \text{cap}(A, B)$ per un opportuno taglio.
  - Algoritmo di estrazione del Min-Cut in tempo $O(m)$ identificando $A$ come l'insieme dei nodi raggiungibili da $s$ nella rete residua finale $G_f$.

### 5. Algoritmi di Approssimazione per Problemi NP-Hard
- **Formalizzazione teorica:** nozione di $\alpha$-approssimazione in tempo polinomiale. Vincoli di approssimazione per minimizzazione ($\text{cost}(x) \le \alpha \cdot OPT$) e massimizzazione ($\text{val}(x) \ge \alpha \cdot OPT$).
- **Load Balancing (Scheduling su $m$ Macchine Identiche):**
  - Minimizzazione del *makespan* $L = \max_i L[i]$ per $n$ lavori con tempi $t_j$.
  - Formulazione dei due lower bound indipendenti: $OPT \ge \frac{1}{m}\sum t_j$ (carico medio) e $OPT \ge \max_j t_j$ (lavoro più lungo).
  - Algoritmo *List Scheduling* (greedy su macchina meno carica): dimostrazione rigorosa del fattore $2$-approssimato.
  - Algoritmo *LPT (Longest Processing Time):* pre-ordinamento decrescente dei tempi dei job; miglioramento del fattore di approssimazione a $4/3$.
- **Problema dei $k$-Centri ($k$-Center Problem):**
  - Scelta di $k$ centri per minimizzare il raggio massimo di copertura $r(C) = \max_s \text{dist}(s, C)$ nel rispetto della disuguaglianza triangolare.
  - Algoritmo greedy del punto più lontano (*farthest-first traversal*).
  - Dimostrazione del fattore $2$-approssimato per assurdo tramite costruzione di $k$ sfere disgiunte di raggio $r(C)/2$.

### 6. Teoria della Complessità Computazionale e Riduzioni Polinomiali
- **Classi di Complessità Decisionali:**
  - **P:** problemi risolvibili in tempo polinomiale deterministico.
  - **NP:** problemi verificabili in tempo polinomiale tramite un certificatore efficiente $B(s, t)$ per istanze positive.
  - **co-NP:** classe dei linguaggi il cui complemento appartiene a NP.
  - **EXP:** problemi risolvibili in tempo esponenziale deterministico; relazioni note: $P \subseteq NP \subseteq EXP$ e certezza della separazione stretta $P \subset EXP$.
- **Riduzione Polinomiale di Karp ($X \le_P Y$):**
  - Definizione: algoritmo a costo polinomiale che trasforma ogni istanza di $X$ in un'istanza di $Y$ preservando la risposta (sì/no).
  - Proprietà di conservazione: se $Y \in P \implies X \in P$; se $X \notin P \implies Y \notin P$.
  - Transitività delle riduzioni polinomiali.
- **NP-Completezza e Riduzioni Canoniche:**
  - Teorema di Cook-Levin e soddisfacibilità booleana (SAT / 3-SAT).
  - **3-SAT $\le_P$ Independent Set (IS):** costruzione del grafo con gadget a triangolo per ogni clausola di 3 letterali e archi tra letterali in conflitto logico ($x_i$ e $\neg x_i$); richiesta di un IS di cardinalità pari al numero di clausole $k = |\Phi|$.
  - **Independent Set $\equiv_P$ Vertex Cover (VC):** dimostrazione della dualità fondamentale: $S \subseteq V$ è un insieme indipendente di taglia $k$ se e solo se il complemento $V \setminus S$ è un vertice cover di taglia $n - k$.
  - **Vertex Cover $\le_P$ Set Cover (SC):** modellazione degli archi del grafo come universo degli elementi $U = E$ e dei vertici come insiemi $S_v$ contenenti gli archi incidenti.

---

## Linguaggi, Strumenti e Tecnologie

- **Formalismo di Progettazione:** Modelli di programmazione matematica, grafi orientati/pesati, equazioni alle ricorrenze di Bellman, matrici e tabelle di stato per programmazione dinamica.
- **Strumenti Analitici:** Grafi residui per reti di flusso, alberi di decisione, gadget combinatori per riduzioni polinomiali.
- **Linguaggi di Riferimento:** Pseudocodice avanzato e implementazioni algoritmiche standard (C++, Java, Python).

---

## Tipologia Esercizi e Prove d'Esame

La verifica d'esame è divisa in uno scritto approfondito e una prova orale:
1. **Esercizio 1 dello Scritto (MST, Union-Find e Flussi):**
   - Risoluzione analitica su Minimum Spanning Tree: applicazione della *cut property* o *cycle property*, determinazione di alberi ottimi su grafi con pesi speciali (es. insiemi $\{1, 2\}$ o pesi duplicati), verifica e controesempi su differenze MST vs SPT.
   - Analisi di strutture Union-Find: tracciamento di sequenze di unioni/find con *union-by-rank* e *path compression*, calcolo dell'altezza degli alberi e complessità ammortizzata.
   - Reti di Flusso: calcolo del flusso massimo tramite Ford-Fulkerson o Edmonds-Karp, tracciamento completo della rete residua $G_f$, individuazione dei cammini aumentanti con bottleneck e determinazione esatta del taglio minimo ($st$-min cut).
2. **Esercizio 2 dello Scritto (Programmazione Dinamica, Approssimazione e NP-Completezza):**
   - Progettazione di algoritmi con Programmazione Dinamica: definizione formale del sottoproblema, equazione ricorsiva di Bellman, condizioni base, complessità temporale/spaziale e procedura di recupero della soluzione ottima (traceback).
   - Analisi di Algoritmi Greedy e di Approssimazione: calcolo del rapporto di approssimazione con lower bound (es. Load Balancing o $k$-centri).
   - Dimostrazione di NP-completezza: definizione del certificato polinomiale per appartenenza a NP e dimostrazione della riduzione polinomiale partendo da un problema NP-completo noto (tramite gadget grafici o insiemistici).
3. **Prova Orale:**
   - Dimostrazioni formali complete dei teoremi centrali (Teorema Max-Flow Min-Cut, correttezza di Prim/Kruskal con schema di scambio, ottimalità di Hirschberg nello spazio lineare, bound di 2-approssimazione, equivalenza formale tra classi di complessità).
