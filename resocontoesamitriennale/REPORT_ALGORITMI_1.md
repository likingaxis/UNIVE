# Resoconto Corso: Algoritmi e Strutture Dati 1 (Algoritmi 1)

- **Anno:** 2° Anno Triennale
- **Area:** Informatica Teorica e Metodologica / Algoritmica Fondamentale (INF/01)
- **Docente di Riferimento (da appunti):** Prof. L. Gualà

---

## Obiettivi del corso in sintesi

Il corso fornisce gli strumenti concettuali, matematici e metodologici per la progettazione, l'analisi formale di correttezza e la valutazione dell'efficienza computazionale degli algoritmi e delle strutture dati fondamentali. Vengono introdotti il modello di calcolo teorico, la notazione asintotica e i paradigmi algoritmici classici (come il divide-et-impera), con particolare attenzione alle strutture dati ad albero, alle code con priorità e agli algoritmi fondamentali sui grafi.

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### 1. Modello di Calcolo e Analisi Asintotica
- **Modello di calcolo RAM a costi uniformi:** memoria ad accesso casuale, costo unitario per istruzione elementare e parola di memoria.
- **Notazioni asintotiche formali (simboli di Landau):**
  - Definizioni matematiche di $O$, $\Omega$, $\Theta$, $o$, $\omega$.
  - Relazioni di inclusione ($o \subset O$, $\omega \subset \Omega$) e confronto tramite calcolo dei limiti $\lim_{n \to \infty} f(n)/g(n)$.
  - Scala fondamentale dei tassi di crescita: $1 \ll \log\log n \ll \log n \ll \sqrt{n} \ll n \ll n\log n \ll n^2 \ll n^k \ll a^n \ll n! \ll n^n$.
- **Casi di complessità:** complessità nel caso peggiore (worst-case), caso migliore (best-case) e caso medio (average-case).
- **Concetto di algoritmo ottimo:** coincidenza asintotica tra upper bound (complessità dell'algoritmo) e lower bound inerente al problema.

### 2. Equazioni di Ricorrenza
- **Descrizione dei costi di algoritmi ricorsivi** tramite relazioni di ricorrenza $T(n)$.
- **Metodo del Teorema Master:** formulazione generale per $T(n) = aT(n/b) + f(n)$:
  - Caso 1: dominanza dei sottoproblemi ($f(n) = O(n^{\log_b a - \epsilon}) \implies T(n) = \Theta(n^{\log_b a})$).
  - Caso 2: bilanciamento perfetto ($f(n) = \Theta(n^{\log_b a}) \implies T(n) = \Theta(n^{\log_b a}\log n)$).
  - Caso 3: dominanza del lavoro extra con condizione di regolarità ($f(n) = \Omega(n^{\log_b a + \epsilon}) \implies T(n) = \Theta(f(n))$).
- **Metodo dell'iterazione / srotolamento:** espansione ripetuta fino al raggiungimento del caso base e chiusura delle sommatorie notevoli.
- **Albero della ricorsione:** interpretazione grafica dei costi per livello per alberi 1-ari e $b$-ari.
- **Metodo del cambio di variabile:** gestione di ricorrenze speciali (es. $T(n) = T(\sqrt{n}) + 1$ ponendo $m = \log n$).

### 3. Algoritmi di Ordinamento Basati su Confronti
- **Algoritmi quadratici ($O(n^2)$):**
  - Selection Sort: selezione iterativa del minimo e posizionamento.
  - Insertion Sort: inserimento ordinato di ciascun elemento verso sinistra (adattivo, efficiente su liste quasi ordinate).
  - Bubble Sort: scambio iterativo di coppie adiacenti invertite.
- **Algoritmi ottimi ($O(n\log n)$):**
  - Merge Sort: paradigma divide-et-impera, split a metà, merge lineare con array ausiliario, stabilità.
  - QuickSort: scelta del perno (pivot), partizionamento in-place (schema di Partition), costo pessimo $O(n^2)$, costo medio $\Theta(n\log n)$.
  - QuickSort Randomizzato: eliminazione del caso pessimo dovuto all'ordine iniziale dei dati, tempo atteso $O(n\log n)$ su ogni input.
- **Teorema del Lower Bound:**
  - Modello basato su albero delle decisioni per confronti ternari.
  - Dimostrazione che qualsiasi algoritmo di ordinamento basato su confronti richiede $\Omega(n\log n)$ confronti nel caso peggiore (uso della formula di Stirling per approssimare $\log_2(n!)$).

### 4. Ordinamento in Tempo Lineare (Algoritmi Non Comparativi)
- **Integer Sort (Counting Sort):** ordinamento basato su array di conteggio per interi compresi in un intervallo $[1, k]$, tempo $O(n+k)$ e spazio ausiliario $O(k)$.
- **Bucket Sort:** partizione in contenitori (bucket), ordinamento stabile delle liste collegate, costo $O(n+k)$.
- **Radix Sort:** ordinamento per cifre successive (dalla meno significativa LSB alla più significativa MSB) tramite algoritmo stabile intermedio.
  - Costo $O((n+b)\log_b(\text{val}_{\max}))$; ottimizzazione ponendo la base $b = n$, che garantisce complessità lineare $O(n)$ se i valori sono limitati polinomialmente ($k = O(n^c)$).

### 5. Strutture Dati Elementari e Alberi
- **Strutture dati lineari:** Array statici/dinamici, Liste collegate semplici e doppiamente concatenate.
- **Pile (Stack):** politica LIFO (Last-In First-Out), operazioni primitive `push`, `pop`, `top` in $O(1)$.
- **Code (Queue):** politica FIFO (First-In First-Out), operazioni primitive `enqueue`, `dequeue` in $O(1)$.
- **Alberi Generali e Binari:** definizioni formali (radice, nodi interni, foglie, cammini, profondità, altezza).
  - Dimostrazione: un albero con $k$ foglie ha altezza $h \ge \lfloor\log_2 k\rfloor$.
  - Algoritmi di visita: visita in ampiezza (BFS con coda) e visite in profondità (DFS anticipata, simmetrica, posticipata con pila/ricorsione).

### 6. Code con Priorità e Heap
- **Tipo di dato Coda con Priorità:** operazioni di inserimento, estrazione del minimo/massimo, modifica priorità (`decreaseKey` / `increaseKey`).
- **Heap Binario (Max-Heap / Min-Heap):**
  - Definizione di albero quasi perfetto rappresentato compattamente in un array (relazioni genitore-figli tramite indici $2i$ e $2i+1$).
  - Operazioni: `FixHeap` (ripristino della proprietà di heap scendendo verso il basso, $O(\log n)$), inserimento con risalita ($O(\log n)$).
  - Procedura `Heapify` (costruzione dell'heap bottom-up): dimostrazione della complessità lineare $\sum_{h=0}^{\log n} \frac{n}{2^h} h = O(n)$.
  - Heap Sort: costruzione dell'heap e rimozioni ripetute del massimo, costo garantito $O(n\log n)$ in-place.
- **d-Heap:** estensione ad alberi $d$-ari per bilanciare i costi tra risalita ($O(\log_d n)$) e discesa ($O(d\log_d n)$).
- **Heap Binomiali:**
  - Foresta di alberi binomiali $B_k$, proprietà strutturali ($2^k$ nodi, grado della radice $k$, coefficienti binomiali per livello).
  - Operazione fondamentale di Merge (unione di due heap binomiali) in tempo $O(\log n)$ tramite addizione binaria.
  - Inserimento in $O(\log n)$ (costo ammortizzato $O(1)$) e cancellazione del minimo in $O(\log n)$.
- **Cenni a Heap di Fibonacci:** supporto all'operazione `decreaseKey` in tempo ammortizzato $O(1)$.

### 7. Alberi Binari di Ricerca (BST) e Alberi AVL
- **Alberi Binari di Ricerca (BST):**
  - Proprietà di ordinamento simmetrico: tutte le chiavi nel sottoalbero sinistro sono minori della radice, tutte quelle a destra maggiori.
  - Operazioni: Ricerca, Minimo, Massimo, Predecessore, Successore, Inserimento e Cancellazione (tramite sostituzione col successore).
  - Limite dei BST sbilanciati: complessità pari all'altezza $O(h)$, che degenera a $O(n)$ in casi peggiori (inserimento di elementi già ordinati).
- **Alberi AVL (Adelson-Velsky e Landis):**
  - Condizione di bilanciamento: per ogni nodo, le altezze dei sottoalberi differiscono al più di 1 ($\beta(v) \in \{-1, 0, 1\}$).
  - Teorema dell'altezza logaritmica: $h \le 1.44\log_2(n+2)$, dimostrato tramite la sequenza di Fibonacci per alberi AVL minimali.
  - Ribilanciamento post inserimento/cancellazione tramite rotazioni:
    - Rotazioni semplici: Sinistra-Sinistra (SS) e Destra-Destra (DD).
    - Rotazioni doppie: Sinistra-Destra (SD) e Destra-Sinistra (DS).
  - Tutte le operazioni di dizionario garantite in tempo $O(\log n)$.

### 8. Teoria dei Grafi e Algoritmi di Visita
- **Definizioni e rappresentazioni in memoria:**
  - Grafi diretti e non diretti, grado dei nodi, cammini, cicli, connessione.
  - Matrice di adiacenza: memoria $\Theta(n^2)$, test adiacenza $O(1)$, iterazione vicini $\Theta(n)$.
  - Liste di adiacenza: memoria $\Theta(n+m)$, iterazione vicini ottima proporzionale al grado del nodo $\Theta(\text{deg}(v))$.
- **Visita in Ampiezza (BFS):**
  - Gestione dei nodi scoperti tramite coda FIFO, marcatura stati (bianco, grigio, nero).
  - Proprietà dei cammini minimi: la BFS calcola le distanze minime (in termini di numero di archi) da una singola sorgente in tempo $O(n+m)$.
  - Costruzione del BFS Tree / Shortest Path Tree (SPT non pesato).
- **Visita in Profondità (DFS):**
  - Esplorazione ricorsiva e gestione del clock temporale per registrare tempi di scoperta (`d[v]`) e tempi di fine visita (`f[v]`).
  - Classificazione degli archi durante la visita:
    - Archi dell'albero (tree edges).
    - Archi all'indietro (back edges) verso antenati nel DFS tree (rivelatori di cicli).
    - Archi in avanti (forward edges) verso discendenti non immediati.
    - Archi di attraversamento (cross edges) tra rami disgiunti.
- **DAG (Directed Acyclic Graphs) e Ordinamento Topologico:**
  - Teorema: un grafo diretto è un DAG se e solo se una visita DFS non produce archi all'indietro.
  - Ordinamento topologico: ordinamento dei vertici secondo l'ordine decrescente dei tempi di fine visita (`f[v]`) in tempo $O(n+m)$.
- **Componenti Fortemente Connesse (CFC / SCC):**
  - Definizione di equivalenza di mutua raggiungibilità su grafi orientati.
  - Componente sorgente e componente pozzo nel grafo delle componenti.
  - Algoritmo basato su DFS e grafo inverso/trasposto $G^T$: prima DFS su $G$ per calcolare i tempi di fine visita, seconda DFS su $G^T$ ordinata per post-numeri decrescenti. Tempo totale $O(n+m)$.

### 9. Cammini Minimi da Singola Sorgente (Dijkstra)
- **Definizione formale:** cammino di costo minimo su grafi con pesi positivi o nulli sugli archi ($w(u,v) \ge 0$).
- **Algoritmo di Dijkstra:**
  - Strategia greedy basata sull'espansione della frontiera e stima superiore delle distanze $d[v]$.
  - Operazione di rilassamento degli archi (`relax`).
  - Correttezza dell'algoritmo dimostrata tramite tecnica "cut and paste".
  - Complessità a seconda della coda con priorità usata:
    - Con array: $O(n^2)$ (ottimale per grafi densi $m \approx n^2$).
    - Con Heap binario: $O((n+m)\log n)$ (ottimale per grafi sparsi $m \ll n^2$).
    - Con Heap di Fibonacci: $O(m + n\log n)$.

---

## Linguaggi, Strumenti e Tecnologie

- **Formalismo:** Pseudocodice formale strutturato (convenzione CLRS / standard accademico).
- **Modelli Matematici:** Notazione asintotica pura, formule di ricorrenza, sommatorie telescopiche, albero di decisione, teoria dei grafi.
- **Linguaggi di riferimento per gli algoritmi:** Implementazioni concettuali applicabili in C, C++ e Java.

---

## Tipologia Esercizi e Prove d'Esame

La prova d'esame si articola in uno scritto strutturato e in un colloquio orale teorico:
1. **Esercizio 1.A – Relazioni Asintotiche:**
   - Determinazione della veridicità o falsità di uguaglianze e inclusioni asintotiche contenenti logaritmi, potenze ed esponenziali con relative dimostrazioni tramite calcolo dei limiti.
2. **Esercizio 1.B – Risoluzione di Equazioni di Ricorrenza:**
   - Calcolo della complessità asintotica tramite Teorema Master, srotolamento iterativo, o cambi di variabile su ricorrenze a radice quadrata.
3. **Quesiti a Risposta Multipla / Sintetica:**
   - Individuazione della complessità esatta per compiti mirati (es. costruzione di heap binomiale, unione di due heap di dimensioni diverse $n$ ed $n^2$, ordinamento di vettori a chiavi ristrette, ricerca di predecessori in AVL).
4. **Esercizi di Progettazione Algoritmica:**
   - Formulazione di un algoritmo ad-hoc per risolvere un problema applicativo nel minor tempo asintotico possibile.
   - Struttura vincolante della risposta d'esame: (1) **Idea generale** ad alto livello, (2) **Pseudocodice dettagliato**, (3) **Dimostrazione formale di correttezza**, (4) **Analisi rigorosa della complessità** temporale e spaziale.
5. **Colloquio Orale:**
   - Dimostrazione formale dei teoremi chiave (Lower Bound per ordinamenti comparativi con Stirling, correttezza di Dijkstra con cut & paste, altezza minima degli AVL, proprietà della DFS e rilevamento cicli nei DAG).
