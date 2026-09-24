# Resoconto Corso: Information Retrieval

- **Anno:** 3° Anno Triennale
- **Area:** Ingegneria Informatica / Sistemi di Elaborazione delle Informazioni e Data Retrieval (ING-INF/05)
- **Riferimenti e Testi:** C. D. Manning, P. Raghavan & H. Schütze (*Introduction to Information Retrieval* - Cambridge University Press), appunti e formulari delle lezioni, quaderni di laboratorio Python/Colab.

---

## Obiettivi del Corso in Sintesi

Il corso analizza l'architettura logica, le strutture dati algoritmiche, i modelli probabilistici e le tecniche di valutazione alla base dei moderni motori di ricerca e sistemi di information retrieval su larga scala. Vengono approfondite la costruzione e compressione ad alte prestazioni dell'indice invertito, le tecniche di correzione ortografica probabilistica con canali rumorosi, i modelli di ranking avanzati (Vector Space Model, BM25, Language Models per IR), l'ottimizzazione safe e non-safe del query processing (WAND, pruning), l'espansione semantica delle query (Rocchio, LSI tramite SVD) e l'analisi della topologia dei collegamenti web (PageRank e HITS).

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### 1. Fondamenti di Information Retrieval e Inverted Index
- **Architettura del sistema di ricerca:**
  - Information need, query utente, collezione di documenti (*corpus*), motore di ricerca, ranked list restituita.
  - Nozione di rilevanza (binaria e graduata); misure di efficacia di base: Precision ($TP / (TP + FP)$) e Recall ($TP / (TP + FN)$).
  - Notazione densa vs sparsa; limiti della matrice di incidenza termini-documenti.
- **Pipeline di indicizzazione e tokenizzazione:**
  - Token stream, normalizzazione del testo, case folding, rimozione della punteggiatura e filtraggio stop words.
  - Moduli linguistici: Stemming (algoritmo di Porter) vs Lemmatizzazione morfosintattica.
- **Struttura dell'Inverted Index:**
  - Dizionario dei termini (*lexicon*), frequenza documentale ($df_t$) e Posting Lists ordinate per identificatore di documento (`docID`).
  - Risoluzione di query booleane (AND, OR, NOT) tramite algoritmo di merge/intersezione a due puntatori in tempo lineare rispetto alla somma delle lunghezze delle posting ($O(L_1 + L_2)$).
  - Ottimizzazione dell'ordine di valutazione delle clausole booleane in base alle frequenze documentali ($df$).
  - Positional Indexing e Biword Indexing per il supporto efficiente di phrase queries e proximity queries (clausole `NEAR / k`).

---

### 2. Costruzione dell'Indice, Indicizzazione Distribuita e Dinamica
- **Modelli di indicizzazione su larga scala (Disk-Based Indexing):**
  - Vincoli di memoria centrale e latenza di accesso al disco (caso studio su collezione Reuters RCV1).
  - **BSBI (Blocked Sort-Based Indexing):** suddivisione della collezione in blocchi, parsing in memoria, ordinamento su disco e multi-way external merge sort ($O(T \log(T/B))$).
  - **SPIMI (Single-Pass In-Memory Indexing):** accumulazione dinamica diretta dei termini e delle posting list in memoria fino a saturazione del buffer, scrittura ordinata del blocco e merge finale ($\Theta(T)$).
- **Indicizzazione Distribuita:**
  - Architettura Master-Worker per cluster distribuiti; metriche di affidabilità, availability e SLA.
  - Strategie di partizionamento dell'indice: *Term-Partitioned Index* (partizionamento globale per termine) vs *Document-Partitioned Index* (partizionamento per documento / locale).
  - Paradigma **MapReduce** per l'indicizzazione: split dei documenti e tokenizzazione nella fase Map, shuffle/sorting per termine, inversione e merge delle posting list nella fase Reduce.
- **Dynamic Indexing (Gestione degli indici dinamici):**
  - Architettura Main Index statico + Auxiliary Index in memoria centrale, gestione delle cancellazioni tramite vettore di bit di invalidazione.
  - Strategie di merge: merge periodico elementare vs **Logarithmic Merge** (serie di indici di dimensione esponenziale $I_0, I_1, \dots, I_k$ con costo ammortizzato ridotto a $O(T \log(T/n))$).
  - Gestione di indici cronologici multipli (es. feed social e flussi real-time).

---

### 3. Compressione dell'Indice (Index Compression)
- **Le leggi empiriche della linguistica computazionale:**
  - **Legge di Heaps:** crescita asintotica sublineare del vocabolario ($M = k T^b$, con $b \approx 0.5$ e $30 \le k \le 100$).
  - **Legge di Zipf:** distribuzione a legge di potenza delle frequenze dei termini nella collezione ($cf_i \propto 1/i$).
- **Compressione del Dizionario (Termini):**
  - Rappresentazione naive a record a lunghezza fissa (28 byte per termine) e sprechi di memoria.
  - *Dictionary-as-a-String:* memorizzazione dei termini concatenati in una stringa continua con puntatori a offset.
  - Compressione a blocchi di dimensione $k$ (un puntatore ogni $k$ termini con memorizzazione della lunghezza dei singoli termini).
  - *Front Coding:* compressione dei prefissi comuni in liste di termini alfabeticamente contigue.
- **Compressione delle Posting List (Gap Encoding & Codifiche Numeriche):**
  - Memorizzazione delle differenze incrementali tra ID di documento successivi ($d\text{-gaps}$).
  - **Codifica Unaria:** rappresentazione di $n$ con $n-1$ uni seguiti da uno zero (ottimale per distribuzioni $2^{-n}$).
  - **Gamma Code di Elias ($\gamma$-code):** scomposizione del gap in offset binario privo del bit più significativo e lunghezza dell'offset codificata in unario ($2\lfloor \log_2 G \rfloor + 1$ bit). Proprietà priva di parametri (*parameter-free*) e prefissa.
  - **Variable Byte (VB) Encoding:** segmentazione del numero in byte da 7 bit di payload con 1 continuation bit (altissima efficienza computazionale in decodifica).
  - **Simple9 Encoding:** impacchettamento di interi in parole fisse a 32 bit (4 bit di codice selettore e 28 bit di dati partizionati in 1, 2, 3, 4, 7, 9, 14, 28 interi).

---

### 4. Tolleranza agli Errori e Correzione Ortografica
- **Ricerche per corrispondenza parziale (Wildcard Queries):**
  - **Permuterm Index:** memorizzazione di tutte le permutazioni cicliche della parola con simbolo di terminazione speciale `$` (mappatura di query `*X`, `X*`, `X*Y` in ricerche B-tree per prefisso).
  - Indici a $k$-grammi sui caratteri e fase di post-filtering per l'eliminazione dei falsi positivi.
- **Correzione Ortografica Probabilistica:**
  - Tassonomia degli errori: non-word spelling error vs real-word spelling error.
  - Distanza di modifica di Damerau-Levenshtein (operazioni di inserimento, cancellazione, sostituzione, trasposizione).
  - **Noisy Channel Model (Modello Bayesiano del Canale Rumoroso):**
    - Formulazione: $\hat{w} = \arg\max_{w \in V} P(w \mid x) = \arg\max_{w \in V} P(x \mid w) P(w)$.
    - Prior Probability $P(w)$: frequenza relativa unigramma del termine corretto nel corpus ($C(w) / T$).
    - Channel Model Probability $P(x \mid w)$: stima delle probabilità di errore tramite Confusion Matrices (del, ins, sub, trans) e smoothing di Laplace per eventi rari.
  - **Context-Sensitive Spelling Correction:**
    - Modelli a bigrammi per la probabilità della frase: $P(w_1 \dots w_n) = \prod P(w_i \mid w_{i-1})$.
    - Interpolazione lineare unigramma-bigramma con smoothing: $P(w_i \mid w_{i-1}) = (1 - \lambda) P_{bi}(w_i \mid w_{i-1}) + \lambda P_{uni}(w_i)$.
    - Modelli di Markov Nascosti (HMM) su trellis e decodifica di Viterbi per sequenze di parole errate; approccio semplificato di Peter Norvig.

---

### 5. Modelli di Ranking: Spazio Vettoriale, Probabilistici e Okapi BM25
- **Vector Space Model (VSM):**
  - Limiti del modello booleano (*feast or famine*, nessuna graduatoria di rilevanza).
  - Modello Bag of Words e pesatura **TF-IDF**:
    - Log-frequency weighting della term frequency: $w_{t,d} = 1 + \log(tf_{t,d})$ se $tf > 0$, altrimenti $0$.
    - Inverse Document Frequency: $idf_t = \log(N / df_t)$.
    - Peso combinato $tf\text{-}idf_{t,d} = (1 + \log tf_{t,d}) \cdot \log(N / df_t)$.
  - Rappresentazione dei documenti e delle query come vettori sparsi nello spazio $|V|$-dimensionale.
  - Calcolo del ranking tramite **Cosine Similarity** con normalizzazione euclidea delle lunghezze: $\cos(\vec{q}, \vec{d}) = \frac{\vec{q} \cdot \vec{d}}{\|\vec{q}\|_2 \|\vec{d}\|_2}$.
- **Modelli Probabilistici Classici:**
  - Probability Ranking Principle (PRP) e minimizzazione del costo del rischio atteso (Error Cost Retrieval).
  - **BIM (Binary Independence Model):** rappresentazione binaria dei termini, odds ratio di rilevanza, parametrizzazione $p_i$ e $u_i$ con e senza giudizi di rilevanza, stima del *Retrieval Status Value* (RSV).
  - Modelli di Poisson e modello 2-Poisson basato sulla nozione di *Eliteness* (documenti rilevanti per contenuto vs menzione casuale).
- **Modello Okapi BM25:**
  - Superamento della crescita lineare di TF-IDF tramite funzione di saturazione sublineare.
  - Formula completa dell'RSV di BM25:
    $$RSV_d = \sum_{t \in q} IDF(t) \cdot \frac{(k_1 + 1) tf_{t,d}}{k_1 ((1 - b) + b \frac{|d|}{avgdl}) + tf_{t,d}}$$
  - Ruolo e taratura dei parametri: $k_1$ (controlla la velocità di saturazione della term frequency, tipicamente tra $1.2$ e $2.0$), $b$ (regola l'intensità della normalizzazione per lunghezza del documento rispetto alla media $avgdl$, $b \approx 0.75$).
  - Estensione con pesatura della query mediante parametro di saturazione $k_3$.

---

### 6. Language Models per Information Retrieval
- **Approccio Query Likelihood:**
  - Assunzione generativa: ogni documento $d$ possiede un proprio modello linguistico probabilistico $M_d$; il ranking corrisponde alla probabilità che $M_d$ generi i termini della query $q$: $P(q \mid M_d)$.
  - Modello multinomiale unigram: $P(q \mid M_d) = \prod_{t \in q} P(t \mid M_d)^{tf_{t,q}}$.
  - Stima a massima verosimiglianza (MLE): $\hat{P}(t \mid M_d) = \frac{tf_{t,d}}{|d|}$.
- **Problema dello Zero-Frequency e Tecniche di Smoothing:**
  - Necessità dello smoothing per assegnare probabilità non nulle a termini presenti nella query ma assenti nel documento specifico.
  - **Smoothing di Jelinek-Mercer:** interpolazione lineare globale con il modello di background dell'intera collezione $M_c$:
    $$P_{JM}(t \mid d) = \lambda \frac{tf_{t,d}}{|d|} + (1 - \lambda) \frac{cf_t}{T}$$
  - **Smoothing di Dirichlet Prior:** smoothing bayesiano che adatta il peso in funzione della lunghezza del documento:
    $$P_{Dir}(t \mid d) = \frac{tf_{t,d} + \mu \frac{cf_t}{T}}{|d| + \mu}$$
  - Calcolo computazionale tramite log-likelihood per evitare underflow e trasformare prodotti in somme. Confronto teorico ed empirico tra BM25 e Dirichlet LM.

---

### 7. Ottimizzazione del Ranking e Tecniche di Pruning
- **Strategie di accelerazione della query processing:**
  - Uso di strutture dati Min-Heap per estrarre la top-$k$ in tempo $O(N + k \log N)$.
  - Definizione di insieme dei contendenti $A$ tale che $k < |A| \ll N$.
- **Pruning Non-Safe (Euristiche di riduzione):**
  - **Index Elimination:** elaborazione delle sole posting con alto valore di IDF o selezione di documenti che contengono un numero minimo di termini della query (soft AND).
  - **Champion Lists:** memorizzazione a index-time dei migliori $r$ documenti per valore di peso locale per ciascun termine.
  - **Static Quality Scores:** integrazione a priori dell'autorevolezza del documento $g(d)$ nello score globale ($\text{score} = g(d) + \text{cos}(q, d)$).
  - **Cluster Pruning:** clustering rapido con $\sqrt{N}$ leader scelti casualmente e assegnazione dei restanti follower; ricerca mirata attorno al cluster del leader più vicino alla query.
  - **Tiered Indexes:** organizzazione dell'indice in livelli concentrici di qualità.
  - **Impact-Ordered Postings:** ordinamento delle posting per peso decrescente con terminazione anticipata (*early termination*).
- **Pruning Safe (WAND - Weak AND):**
  - Algoritmo di attraversamento dinamico a puntatori ordinati per `docID`.
  - Calcolo del limite superiore locale dello score ($UB_t$) per ogni posting list.
  - Pivoting dinamico sulla soglia corrente del $k$-esimo documento della heap: scorrimento e salto a blocchi di interi segmenti di posting che non hanno possibilità matematica di entrare nella top-$k$.

---

### 8. Relevance Feedback, Espansione delle Query e Semantica Latente (LSI)
- **Relevance Feedback e Query Reformulation:**
  - Superamento del problema di mismatch lessicale e sinonimia.
  - Metodo del centroide vettoriale; derivazione della query ideale di Rocchio su insiemi noti $C_r$ e $C_{nr}$.
  - **Algoritmo di Rocchio:** $\vec{q}_m = \alpha \vec{q}_0 + \beta \frac{1}{|D_r|} \sum_{d \in D_r} \vec{d} - \gamma \frac{1}{|D_{nr}|} \sum_{d \in D_{nr}} \vec{d}$ (pesi tipici $\alpha = 1$, $\beta = 0.75$, $\gamma = 0.15$).
  - **Pseudo-Relevance Feedback (PRF):** assunzione cieca di rilevanza sui primi $k$ documenti recuperati; mitigazione del rischio di *Query Drift*.
  - Metodi globali: Thesaurus manuali, thesaurus automatici basati su co-occorrenza e Pointwise Mutual Information ($PMI(x,y) = \log \frac{P(x,y)}{P(x)P(y)}$).
- **Latent Semantic Indexing (LSI):**
  - Decomposizione ai Valori Singolari (**SVD**): fattorizzazione della matrice termini-documenti $A_{m \times n} = U \Sigma V^T$.
  - Approssimazione a basso rango (Teorema di Eckart-Young): $A_k = U_k \Sigma_k V_k^T$ che minimizza l'errore in norma di Frobenius $\|A - A_k\|_F$.
  - Mappatura in uno spazio concettuale latente $k$-dimensionale ($k \approx 100-300$): rappresentazione dei documenti ($D_k = \Sigma_k^{1/2} V_k^T$) e dei termini ($T_k = U_k \Sigma_k^{1/2}$).
  - Operazione di **Folding-in** per proiettare nuove query nello spazio latente: $q_k = q^T U_k \Sigma_k^{-1}$.
  - Risoluzione automatica della sinonimia e attenuazione della polisemia.

---

### 9. Valutazione dei Sistemi IR e Link Analysis per il Web
- **Metodologia di valutazione scientifica:**
  - Costruzione del Gold Standard: collezione di documenti, query rappresentative e pool di giudizi umani di rilevanza.
  - Metriche su ranked list a rilevanza binaria:
    - Precision@k: percentuale di documenti rilevanti entro le prime $k$ posizioni.
    - **Average Precision (AP):** media dei valori di Precision@k calcolati in corrispondenza di ciascun documento rilevante.
    - **MAP (Mean Average Precision):** media dell'Average Precision calcolata sull'insieme di tutte le query di test.
    - **MRR (Mean Reciprocal Rank):** media dell'inverso del rango del primo documento rilevante recuperato ($1/rank_q$).
  - Metriche a rilevanza graduata:
    - Discounted Cumulative Gain ($DCG_p = rel_1 + \sum_{i=2}^p \frac{rel_i}{\log_2 i}$).
    - **NDCG (Normalized DCG):** normalizzazione rispetto al ranking teorico ideale ($NDCG = DCG / IDCG$).
  - Metodi comportamentali online: Click Position Bias, esperimenti di interleaving e A/B testing.
- **Link Analysis per il Web Graph:**
  - Topologia del Web: nodi come URL, archi come hyperlink orientati, inlink, outlink e testi ancora (*Anchor Text*).
  - Modello reputazionale (Good, Bad, Unknown nodes). Compressione del grafo web (algoritmo di Boldi-Vigna con gap encoding).
  - **Algoritmo PageRank:**
    - Modello del Random Surfer; matrici di transizione stocastiche per riga; risoluzione di trappole (*spider traps*) e vicoli ciechi (*dead ends*) mediante fattore di teletrasporto probabilistico $\alpha \approx 0.85$.
    - Condizione di ergodicità della catena di Markov e convergenza garantita alla distribuzione stazionaria: $x = x P$ (calcolo dell'autovettore sinistro associato ad autovalore 1 tramite Power Iteration).
  - **Algoritmo HITS (Hyperlink-Induced Topic Search):**
    - Punteggi duali di autorevolezza (*Authority score*) e indice di smistamento (*Hub score*).
    - Costruzione del Root Set dalla query testuale ed espansione al Base Set (inclusione di tutti i nodi collegati).
    - Iterazione mutua di aggiornamento: $a(x) \leftarrow \sum_{y \to x} h(y)$ e $h(x) \leftarrow \sum_{x \to y} a(y)$.
    - Formulazione matriciale ($a = A^T h$, $h = A a \implies a = A^T A a$, $h = A A^T h$) e convergenza spettrale.
  - Sistemi ibridi: combinazione non lineare di ranking testuale (BM25) e vettoriale (kNN su embeddings) con normalizzazione min-max degli score.

---

## Linguaggi, Strumenti e Tecnologie
- **Linguaggi e Ambienti:** Python (Google Colab / Jupyter Notebooks).
- **Librerie di Riferimento:**
  - NumPy e SciPy (algebra lineare, decomposizione SVD, manipolazione matrici sparse).
  - Scikit-Learn (dataset *20 Newsgroups*, estrazione feature testuali, metriche di similarità).
  - NLTK (tokenizzazione, normalizzazione, stopwords, stemmer di Porter).
- **Piattaforme di Information Retrieval Industriale:** Apache Lucene, Elasticsearch (ispezione delle implementazioni native di BM25, posting lists compresse e WAND).

---

## Tipologia Esercizi e Prove d'Esame
- **Esercizi Analitici e Computazionali delle Prove Scritte (Esoneri):**
  1. **Algoritmi di merge booleano e proximity:** scrittura del codice/pseudocodice di intersezione per posting semplici e posizionali (es. operatore `pos1 = pos2 - 1` o clausole `k-near`).
  2. **Compressione di posting list:** data una lista di docID, estrazione dei d-gaps e codifica esplicita bit-per-bit in formato Gamma di Elias, Variable Byte e Simple9.
  3. **Noisy Channel Spelling Correction:** data una parola errata e un vocabolario di candidati a distanza di Levenshtein 1, calcolo della probabilità a posteriori $P(w \mid x)$ combinando la frequenza della prior $P(w)$ e le frequenze delle matrici di confusione con add-1 smoothing.
  4. **Vector Space Model e similarità del coseno:** calcolo dei vettori dei pesi TF-IDF (pesatura logaritmica e log(N/df)) per query e collezione di documenti giocattolo; normalizzazione $L_2$ e ordinamento per similarità del coseno.
  5. **Calcolo degli score con BM25 e Language Model:** applicazione manuale della formula di Okapi BM25 (al variare di $k_1, b, |d|/avgdl$) e calcolo della query likelihood con smoothing di Dirichlet ($\mu$) o Jelinek-Mercer ($\lambda$).
  6. **Relevance Feedback con Rocchio:** aggiornamento del vettore della query iniziale $\vec{q}_0$ a fronte di un insieme di documenti giudicati rilevanti e non rilevanti.
  7. **Calcolo delle metriche di valutazione IR:** calcolo puntuale di Precision@k, Average Precision (AP), MAP su multiple query, MRR e calcolo di $DCG$ e $NDCG$ con giudizi di rilevanza multilivello.
  8. **Calcolo di PageRank e HITS su piccoli grafi:** impostazione della matrice di adiacenza e della matrice di transizione con teletrasporto $\alpha$; svolgimento dei primi passi di iterazione per la determinazione degli score di Hub, Authority e PageRank.
