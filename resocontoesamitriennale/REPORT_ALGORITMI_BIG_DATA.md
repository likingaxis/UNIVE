# Resoconto Corso: Algoritmi per i Big Data

- **Anno:** 3° Anno Triennale
- **Area:** Informatica Teorica / Algoritmica Avanzata e Data Science (INF/01)
- **Riferimenti e Testi:** M. Mitzenmacher & E. Upfal (*Probability and Computing*), J. Kleinberg & É. Tardos (*Algorithm Design*), J. Leskovec, A. Rajaraman & J. D. Ullman (*Mining of Massive Datasets - MMDS*), dispense e note didattiche.

---

## Obiettivi del Corso in Sintesi

Il corso affronta le fondamenta teoriche, matematiche e algoritmiche necessarie per elaborare e interrogare moli enormi di dati (*Big Data*) in contesti in cui le risorse di memoria centrale e tempo di calcolo sono rigorosamente sublineari rispetto alla dimensione dell'input. Vengono approfonditi il paradigma della randomizzazione, le disuguaglianze di concentrazione probabilistica, le strutture dati compatte basate su hashing universale, i modelli di ricerca di elementi simili in spazi ad alta dimensionalità e i vincoli stringenti dello *Streaming Model* (passaggio singolo su flussi infiniti di dati con memoria limitata).

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### 1. Fondamenti di Probabilità e Disuguaglianze di Concentrazione
- **Richiami essenziali di probabilità discreta:**
  - Spazio campionario, eventi, variabili aleatorie discrete, valore atteso (linearità dell'aspettativa), varianza, covarianza e deviazione standard.
  - Indipendenza di eventi e variabili aleatorie (mutua indipendenza vs $k$-indipendenza a coppie).
  - Problema del *Coin Flip* e del collezionista di figurine (*Coupon Collector Problem*): calcolo del tempo d'attesa atteso $\Theta(n \ln n)$ e varianza associata.
- **Teoremi e disuguaglianze di concentrazione:**
  - **Union Bound (Disuguaglianza di Boole):** limite superiore alla probabilità dell'unione di eventi arbitrari.
  - **Disuguaglianza di Markov:** vincolo superiore sulla coda di distribuzione per variabili aleatorie non-negative ($P(X \ge a) \le \frac{E[X]}{a}$).
  - **Disuguaglianza di Chebyshev:** concentrazione attorno al valor medio sfruttando la varianza ($P(|X - \mu| \ge k\sigma) \le \frac{1}{k^2}$).
  - **Chernoff Bounds:** delimitazioni esponenziali strette sulle code di somme di variabili aleatorie binarie indipendenti (code inferiori e superiori, formulazioni additive e moltiplicative).

---

### 2. Algoritmi Randomizzati Classici (Teoria e Applicazioni)
- **Verifica probabilistica di proprietà (Monte Carlo):**
  - **Verifica di identità polinomiali:** Lemma di Schwartz-Zippel, test randomizzato di equivalenza identica a zero con errore controllato e amplificazione del successo.
  - **Verifica del prodotto matriciale (Algoritmo di Freivalds):** test $AB = C$ mediante vettore casuale $r \in \{0,1\}^n$ in tempo $O(n^2)$ anziché $O(n^3)$ con probabilità di errore $\le 1/2$, riducibile a $\le (1/2)^k$ con $k$ iterazioni indipendenti.
- **Algoritmi randomizzati su grafi e selezione:**
  - **Algoritmo di Karger (Min-Cut):** contrazione ricorsiva uniforme di archi casuali per determinare il taglio minimo globale; calcolo della probabilità di successo per singola iterazione ($\ge \frac{2}{n(n-1)}$), analisi di amplificazione con $O(n^2 \ln n)$ ripetizioni per successo con alta probabilità (w.h.p.).
  - **Randomized QuickSort:** scelta pivot casuale, indipendenza dei confronti, dimostrazione del tempo d'esecuzione atteso $O(n \log n)$ nel caso peggiore.
  - **Randomized QuickSelect / Median:** selezione del $k$-esimo elemento e della mediana in tempo atteso lineare $O(n)$.
- **Algoritmi per sistemi distribuiti e concorrenza:**
  - **Contention Resolution:** risoluzione probabilistica delle collisioni su canale di trasmissione condiviso (protocolli tipo Slotted ALOHA/Backoff), probabilità di successo per slot, tempo d'attesa per trasmissione di tutti i nodi.
  - **Load Balancing (Balls into Bins):** distribuzione uniforme di $n$ palline in $n$ contenitori, carico massimo atteso $O(\frac{\ln n}{\ln \ln n})$, paradigma della doppia scelta (*Power of Two Choices*) che abbatte esponenzialmente il carico massimo a $O(\ln \ln n)$.

---

### 3. Hashing Avanzato e Dizionari Compatti
- **Famiglie di funzioni hash:**
  - Limiti del paradigma dell'hash uniforme perfetto (*Simple Uniform Hashing Assumption*).
  - **Universal Hashing:** definizione formale di famiglia universale a 2-indipendenza ($P_{h \in \mathcal{H}}(h(x) = h(y)) \le \frac{1}{m}$ per $x \ne y$).
  - Costruzione algebrica di famiglie hash universali tramite aritmetica modulare in campi finiti $\mathbb{Z}_p$ ($h_{a,b}(x) = ((ax + b) \bmod p) \bmod m$).
- **Strutture dati hash perfette e dinamiche:**
  - **Perfect Hashing (FKS - Fredman, Komlós, Szemerédi):** hashing perfetto statico a due livelli, assenza assoluta di collisioni nel secondo livello con dimensione totale dello spazio limitata linearmente a $O(n)$, tempo di query $O(1)$ worst-case.
  - **Problema del dizionario e ridimensionamento dinamico:** Doubling/Halving technique per tabelle hash dinamiche con costo ammortizzato $O(1)$.

---

### 4. Similarity Search & High-Dimensional Data (Mining di Item Simili)
- **Rappresentazione di insiemi e similarità:**
  - Indice di similarità di Jaccard: $J(A, B) = \frac{|A \cap B|}{|A \cup B|}$.
  - **$k$-Shingling:** conversione di documenti testuali in insiemi di $k$-grammi (scelta ottima di $k$ in base alla lunghezza dei testi) e mappatura tramite token hashing.
- **MinHashing (Locality Sensitive Hashing per Jaccard):**
  - Matrice caratteristica sparsa (shingles $\times$ documenti).
  - Permutazioni casuali di righe e definizione della firma MinHash ($h_\pi(C)$ come indice della prima riga con bit a 1).
  - Teorema fondamentale di MinHash: $P(h_\pi(A) = h_\pi(B)) = J(A, B)$.
  - **Matrice delle Firme (Signature Matrix):** algoritmo pratico di calcolo efficiente delle firme mediante funzioni hash indipendenti senza permute fisiche della matrice.
- **Locality-Sensitive Hashing (LSH):**
  - Obiettivo: evitare il costo $O(N^2)$ dei confronti esaustivi tra tutte le coppie di documenti.
  - **Banding Technique:** divisione della matrice delle firme in $b$ bande da $r$ righe ($n = b \cdot r$).
  - Collisione in almeno una banda e mappatura in bucket hash.
  - Curva a S di probabilità: $P(\text{candidato}) = 1 - (1 - s^r)^b$.
  - Analisi del trade-off tra Falsi Positivi e Falsi Negativi mediante regolazione della soglia di similarità $t \approx (1/b)^{1/r}$.

---

### 5. Algoritmi per Data Stream (Streaming Model)
- **Il modello di calcolo Streaming:**
  - Flusso continuo e potenzialmente illimitato di dati in ingresso ($x_1, x_2, \dots$), arrivo a velocità elevata, impossibilità di memorizzare l'intero stream.
  - Vincolo di memoria di lavoro sublineare $o(N)$ (spesso $O(\text{polylog}(N))$ o $O(1)$) e tempo di elaborazione per elemento $O(1)$.
- **Pattern Matching su stream:**
  - Algoritmo di Karp-Rabin su stream: rolling hash tramite aritmetica modulare per riconoscimento di sottostringhe in tempo reale.
- **Campionamento di Stream (Sampling):**
  - **Campionamento a frazione fissa ($s$ proporzionale):** campionamento indipendente per elemento e problema del campionamento aggregato per utente (*User Sampling* tramite hash deterministico sull'ID utente).
  - **Reservoir Sampling (Algoritmo di Vitter):** mantenimento di un campione casuale uniforme di taglia fissa $k$ su uno stream di lunghezza sconosciuta $N$; inserimento dell'$i$-esimo elemento con probabilità $k/i$ e sostituzione casuale nel serbatoio; dimostrazione formale per induzione della probabilità uniforme $k/N$ per ogni elemento.
- **Sliding Window Model e Counting Bits:**
  - Problema del conteggio del numero di bit a 1 negli ultimi $N$ elementi del flusso.
  - Limite teorico: per conteggio esatto occorrono $\Omega(N)$ bit di memoria.
  - **Algoritmo DGIM (Datar-Gionis-Indyk-Motwani):**
    - Memorizzazione compatta tramite *bucket esponenziali* di taglia potenze di 2 ($1, 2, 4, 8, \dots$).
    - Invariante di DGIM: per ogni taglia esistono al più 2 bucket (versione base) o $k$ bucket (versione $\epsilon$-approssimata).
    - Timestamp del bit più recente per ogni bucket ($O(\log N)$ bit per bucket).
    - Aggiornamento all'arrivo di bit 0 (aggiornamento timestamp) e bit 1 (creazione bucket di taglia 1 e cascata di merge di bucket di ugual taglia).
    - Risposta a query di conteggio con somma delle taglie dei bucket interni alla finestra e metà della taglia del bucket più vecchio.
    - Dimostrazione dell'errore relativo massimo: errore $\le \frac{1}{2}$ (o $\le \epsilon$) con occupazione di memoria rigorosamente $O(\log^2 N)$ bit.

---

### 6. Filtri, Sketch e Calcolo dei Momenti su Stream
- **Filtri di Bloom:**
  - Struttura: array di $m$ bit e $k$ funzioni hash indipendenti.
  - Operazioni di inserimento e verifica di appartenenza (membership test).
  - Proprietà: assenza assoluta di Falsi Negativi (*one-sided error*), presenza controllata di Falsi Positivi.
  - Analisi matematica: probabilità di falso positivo $P_{FP} \approx (1 - e^{-kn/m})^k$.
  - Dimensionamento ottimale: numero ottimo di funzioni hash $k = \frac{m}{n} \ln 2$, dimensione dell'array per falso positivo desiderato $\epsilon$.
- **Count-Min Sketch:**
  - Struttura: matrice di contatori $d \times w$ associata a $d$ funzioni hash indipendenti 2-universali.
  - Tracciamento delle frequenze di elementi (*Heavy Hitters* e frequenze puntuali) in stream additivi.
  - Operazione di update: incremento di un contatore per riga.
  - Query: stima puntuale come $\hat{a}_i = \min_{j=1..d} C[j, h_j(i)]$.
  - Garanzia d'errore unidirezionale: $\hat{a}_i \ge a_i$ e $\hat{a}_i \le a_i + \epsilon \|a\|_1$ con probabilità $\ge 1 - \delta$, scegliendo $w = \lceil e/\epsilon \rceil$ e $d = \lceil \ln(1/\delta) \rceil$. Dimostrazione basata sulla linearità del valore atteso e disuguaglianza di Markov.
- **Stima del numero di elementi distinti (Cardinality Estimation):**
  - **Algoritmo di Flajolet-Martin:** hashing uniforme dei valori, estrazione della posizione del bit meno significativo a 1 (*trailing zeros* $\rho(h(x))$), stima $2^R$, mitigazione della varianza con hashing multiplo e calcolo di medie/mediane di bucket.
- **Calcolo dei Momenti di Frequenza (Algoritmo AMS - Alon-Matias-Szegedy):**
  - Definizione del $k$-esimo momento: $F_k = \sum_{i} m_i^k$ ($F_0$ elementi distinti, $F_1$ lunghezza stream, $F_2$ momento secondo / *surprise index*).
  - Algoritmo AMS per la stima non polarizzata (*unbiased estimator*) di $F_2$: selezione casuale di elementi sentinella, calcolo della stima, amplificazione mediante medie e mediane per garantire precisione $\epsilon$ con confidenza $1 - \delta$.

---

## Linguaggi, Strumenti e Tecnologie
- **Modelli Matematici e Algoritmici:** Probabilistic Analysis, Disuguaglianze di Concentrazione (Markov, Chebyshev, Chernoff), Randomization paradigms (Monte Carlo vs Las Vegas).
- **Linguaggi e Ambienti:** Python (implementazione prototipale di sketch, simulazioni Monte Carlo, validazione empirica dei bounds teorici).
- **Librerie di Riferimento:** NumPy, SciPy (generazione di distribuzioni e analisi di varianza/code).

---

## Tipologia Esercizi e Prove d'Esame
- **Esposizione Orale Formale dell'Argomento a Piacere:**
  - Presentazione analitica e rigorosa di un algoritmo cardine su stream o randomizzato (es. DGIM con dimostrazione della limitazione dell'errore relativo e invarianti di merge, oppure Count-Min Sketch con analisi formale dell'errore tramite disuguaglianza di Markov).
- **Dimostrazioni Teoriche alla Lavagna/Foglio:**
  - Dimostrazione del bound sul tempo atteso di Randomized QuickSort o Karger Min-Cut.
  - Dimostrazione dell'indipendenza e probabilità di selezione in Reservoir Sampling ($k/N$).
  - Derivazione della formula di probabilità di falso positivo nei Filtri di Bloom e calcolo della derivata per determinare il valore ottimale di $k$.
  - Analisi del trade-off delle bande in Locality-Sensitive Hashing (calcolo della curva ad S e identificazione della soglia di similarità $t$).
- **Esercizi Analitici e Numerici:**
  - Tracciamento manuale passo-passo della struttura dati DGIM su una sequenza binaria di bit in arrivo con operazioni di fusione (merge) dei bucket.
  - Dimensionamento formale di Filtri di Bloom o Count-Min Sketch specificando parametri $\epsilon$, $\delta$, numero di elementi previsti $n$ e calcolo della memoria totale richiesta in bit.
