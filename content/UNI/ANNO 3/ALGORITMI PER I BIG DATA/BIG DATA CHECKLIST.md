# Checklist Big Data — Argomenti del PDF

## 1. Richiami di probabilità

### Probabilità di base
- [ ] Spazio di campionamento, eventi e funzione di probabilità
- [ ] Complemento, inclusione-esclusione e union bound
- [ ] Probabilità condizionata
- [ ] Indipendenza tra eventi
- [ ] Teorema delle probabilità totali
- [ ] Teorema di Bayes
- [ ] Definizione di evento con alta probabilità

### Variabili aleatorie
- [ ] Variabile aleatoria discreta
- [ ] Valore atteso
- [ ] Linearità del valore atteso
- [ ] Valore atteso condizionato
- [ ] Varianza e deviazione standard
- [ ] Variabili indipendenti e `k-wise` indipendenti

### Distribuzioni
- [ ] Variabile Bernoulliana
- [ ] Processo di Bernoulli
- [ ] Distribuzione binomiale
- [ ] Valore atteso e varianza della binomiale
- [ ] Distribuzione geometrica
- [ ] Proprietà memoryless
- [ ] Valore atteso e varianza della geometrica

### Disuguaglianze e teoremi probabilistici
- [ ] Teorema: `Var[aX] = a^2 Var[X]`
- [ ] Disuguaglianza di Markov
- [ ] Disuguaglianza di Chebyshev
- [ ] Varianza della media campionaria
- [ ] Legge debole dei grandi numeri
- [ ] Chernoff bound sopra la media
- [ ] Chernoff bound sotto la media
- [ ] Confronto tra Chebyshev e Chernoff

### Coupon Collector
- [ ] Modellazione tramite variabili geometriche
- [ ] Calcolo del valore atteso
- [ ] Calcolo della varianza
- [ ] Bound con Markov
- [ ] Bound con Chebyshev
- [ ] Probabilità di completare la collezione dopo `O(n log n)` passi

---

## 2. Algoritmi probabilistici

### Verifica di identità polinomiali
- [ ] Problema: verificare se `f(x) ≡ g(x)`
- [ ] Algoritmo deterministico
- [ ] Algoritmo probabilistico tramite valutazione casuale
- [ ] Definizione di `h(x) = f(x) - g(x)`
- [ ] Errore come scelta casuale di una radice di `h`
- [ ] Amplificazione tramite ripetizioni indipendenti
- [ ] Risultato importante: probabilità di errore ridotta a `(1/100)^k`

### Verifica della moltiplicazione matriciale
- [ ] Problema: verificare se `AB = C`
- [ ] Algoritmo deterministico
- [ ] Algoritmo probabilistico di Freivalds
- [ ] Uso del vettore casuale `r`
- [ ] Analisi con `D = AB - C`
- [ ] One-sided error
- [ ] Aumento della confidenza tramite ripetizioni
- [ ] Teorema importante: se `AB ≠ C`, allora `Pr[ABr = Cr] ≤ 1/2`

### Min-Cut
- [ ] Definizione di cut e min-cut
- [ ] Algoritmo probabilistico basato su contrazioni
- [ ] Self-loop e archi paralleli
- [ ] Analisi dell’evento “non contrarre archi del min-cut”
- [ ] Prodotto telescopico della probabilità di successo
- [ ] Amplificazione tramite più esecuzioni
- [ ] Lemma: la contrazione non riduce la grandezza del min-cut
- [ ] Lemma: se non si contrae un arco del min-cut, il cut resta preservato
- [ ] Teorema importante: probabilità di successo almeno `2/(n(n-1))`

### QuickSort probabilistico
- [ ] QuickSort deterministico
- [ ] QuickSort randomizzato
- [ ] Scelta casuale del pivot
- [ ] Variabili indicatrici per il numero di confronti
- [ ] Calcolo del valore atteso dei confronti
- [ ] Risultato importante: complessità attesa `O(n log n)`
- [ ] Differenza tra input casuale e algoritmo randomizzato

### Calcolo probabilistico della mediana
- [ ] Problema della mediana
- [ ] Campionamento casuale `R`
- [ ] Scelta degli elementi `d` e `u`
- [ ] Costruzione dell’insieme candidato `C`
- [ ] Condizioni di fallimento
- [ ] Eventi di fallimento `E1`, `E2`, `E3`
- [ ] Analisi tramite Chebyshev
- [ ] Risultato importante: probabilità di fallimento al più `1/n^{1/4}`
- [ ] Risultato importante: probabilità di successo almeno `1 - 1/n^{1/4}`

---

## 3. Altri algoritmi probabilistici

### Contention Resolution
- [ ] Modello con processi concorrenti e database condiviso
- [ ] Protocollo randomizzato con probabilità `p = 1/n`
- [ ] Evento di successo `S_{i,t}`
- [ ] Analisi della probabilità di successo di un singolo processo
- [ ] Analisi del fallimento dopo più tentativi
- [ ] Union bound su tutti i processi
- [ ] Teorema importante: `Pr[S_{i,t}] ≈ 1/(en)`
- [ ] Teorema importante: dopo `O(n log n)` tentativi tutti i processi riescono con alta probabilità

### Load Balancing
- [ ] Modello balls into bins: job assegnati casualmente a processori
- [ ] Confronto con Round-Robin deterministico
- [ ] Variabili aleatorie per il carico di un processore
- [ ] Applicazione dei Chernoff bounds
- [ ] Massimo carico nel caso randomizzato
- [ ] Risultato importante: massimo carico `Θ(log n / log log n)`
- [ ] Teorema con `m = 16n log n`
- [ ] Risultato importante: con alta probabilità ogni processore ha carico tra metà e doppio del carico medio

---

## 4. Hashing

### Concetti generali
- [ ] Funzione hash `h : U → [0,n)`
- [ ] Proprietà desiderate: uniformità, velocità, poco spazio
- [ ] Famiglie di funzioni hash
- [ ] Hash uniforme
- [ ] Famiglie `k`-indipendenti
- [ ] Famiglie completamente uniformi

### Hashing universale
- [ ] Definizione di famiglia hash universale
- [ ] Probabilità di collisione
- [ ] Variabili indicatrici per collisioni
- [ ] Analisi del numero atteso di elementi nello stesso bucket
- [ ] Teorema importante: 2-indipendenza implica universalità
- [ ] Teorema importante: con hashing universale il numero atteso di collisioni è piccolo
- [ ] Risultato importante: tempo atteso `O(1)` per operazione con tabella di dimensione adeguata

### Famiglie hash universali
- [ ] Famiglia universale basata su prodotto scalare modulo primo
- [ ] Dimostrazione di universalità tramite campo modulo primo
- [ ] Famiglia `h_{a,b}(x) = ax + b mod p`
- [ ] Interpretazione come polinomio di grado 1
- [ ] Teorema importante: la famiglia `h_{a,b}` è 2-indipendente e universale

### Perfect Hashing
- [ ] Definizione di funzione hash perfetta
- [ ] Iniettività su un insieme fissato
- [ ] Uso dello union bound per controllare le collisioni
- [ ] Teorema importante: se `M` è abbastanza grande, una funzione universale è perfetta con alta probabilità

### Dizionario e tabelle hash
- [ ] Problema del dizionario
- [ ] Operazioni: `create`, `insert`, `delete`, `lookup`
- [ ] Limite degli array indicizzati sull’universo
- [ ] Tabelle hash con liste di trabocco
- [ ] Hashing deterministico statico
- [ ] Hashing universale dinamico
- [ ] Tecnica doubling/halving
- [ ] Rehashing
- [ ] Risultato importante: inserimento e cancellazione in `O(1)` ammortizzato

---

## 5. Problemi di Big Data

### Introduzione ai problemi Big Data
- [x] Punti ad alta dimensione
- [x] Funzione di distanza
- [x] Soglia di similarità
- [x] Problema del confronto quadratico
- [x] Obiettivo: ridurre dimensionalità e numero di confronti

### Document Similarity
- [x] Problema dei documenti simili
- [x] Applicazioni: pagine duplicate, notizie simili
- [x] Jaccard Similarity
- [x] Jaccard Distance
- [x] Pipeline generale:
  - [x] Shingling
  - [x] MinHashing
  - [x] Locality Sensitive Hashing
  - [x] Coppie candidate

### Shingling
- [x] Definizione di `k`-shingle
- [x] Token come caratteri o parole
- [x] Rappresentazione di un documento come insieme
- [x] Rappresentazione tramite vettore binario sparso
- [x] Intersezione e unione tra insiemi di shingle
- [x] Interpretazione probabilistica della Jaccard Similarity

### MinHashing
- [x] Obiettivo: trasformare grandi insiemi in firme piccole
- [x] MinHash come minimo indice dopo permutazione
- [x] Signature Matrix
- [x] Similarità tra firme
- [x] Uso di più permutazioni/hash indipendenti
- [x] Sostituzione pratica delle permutazioni con funzioni hash casuali
- [x] Algoritmo per costruire la matrice delle firme
- [x] Corollario importante: `Sign-Sim → Jaccard Similarity` per numero di hash crescente
- [x] Teorema importante: `Pr[hπ(C1) = hπ(C2)] = Jaccard Similarity(C1,C2)`

### Locality Sensitive Hashing
- [x] Obiettivo: evitare il confronto di tutte le coppie
- [x] Coppie candidate
- [x] Hash delle colonne della Signature Matrix
- [x] Divisione in bande
- [x] Parametri `b`, `r`, `t = br`
- [x] Criterio: due documenti sono candidati se coincidono in almeno una banda
- [x] Falsi positivi e falsi negativi
- [x] Scelta dei parametri in base alla soglia `s`
- [x] Formula importante: `Pr[candidata] = 1 - (1 - x^r)^b`
- [x] Risultato importante: LSH approssima un comportamento a soglia

---

## 5.2–5.5 Data Stream e campionamento

### Data Stream
- [x] Definizione di stream
- [x] Stream troppo grandi per essere mantenuti in memoria
- [x] Sketch
- [x] Parametri di valutazione:
  - [x] memoria
  - [x] tempo per elemento
  - [x] probabilità di correttezza
  - [x] fattore di approssimazione
- [x] Proprietà di aggiornabilità dello sketch

### Pattern Matching su stream
- [x] Problema del pattern matching
- [x] Funzione hash di Rabin
- [x] Rabin sketch
- [x] Aggiornamento per concatenazione di caratteri
- [x] Aggiornamento per concatenazione di stringhe
- [x] Rolling hash
- [x] Complessità spaziale e temporale
- [x] Lemma importante: per stringhe diverse, probabilità di collisione ≤ `n/q`
- [x] Corollario importante: scegliendo `q` grande, errore ≤ `1/n^c`

### Proprietà degli algoritmi su stream
- [ ] Campionamento proporzionale alla dimensione dello stream
- [ ] Campione di dimensione fissata
- [ ] Proprietà dinamica del campione

### Campionamento a porzione fissa
- [ ] Scenario: query dei motori di ricerca
- [ ] Campionamento ingenuo delle tuple
- [ ] Problema delle query duplicate
- [ ] Campionamento degli utenti
- [ ] Campionamento tramite chiave
- [ ] Soglia dinamica per controllare la dimensione del campione

### Reservoir Sampling
- [ ] Obiettivo: mantenere `s` elementi da stream arbitrariamente lungo
- [ ] Inserimento del nuovo elemento con probabilità `s/n`
- [ ] Rimozione uniforme dal reservoir
- [ ] Dimostrazione per induzione
- [ ] Teorema importante: dopo `n` passi ogni elemento ha la stessa probabilità di essere nel campione

### Sliding Window e Counting Bits
- [ ] Modello sliding window
- [ ] Conteggio degli `1` negli ultimi `k` bit
- [ ] Lower bound: spazio almeno `N` per soluzione esatta
- [ ] Necessità di approssimazione
- [ ] Metodo DGIM
- [ ] Gruppi/bucket di potenze di due
- [ ] Aggiornamento dei gruppi
- [ ] Fusione dei gruppi
- [ ] Tempo di aggiornamento
- [ ] Analisi dell’approssimazione
- [ ] Estensione a stream di interi
- [ ] Teorema importante: DGIM fornisce una buona approssimazione usando spazio polilogaritmico

## 6. Algoritmi sulle Stream

### Stima delle frequenze
- [ ] Definizione della frequenza `f_y`
- [ ] Obiettivo: stimare la frequenza senza memorizzare tutto lo stream

### Sampling per frequenze
- [ ] Campionamento di posizioni casuali
- [ ] Variabili indicatrici
- [ ] Stimatore della frequenza
- [ ] Proprietà di unbiasedness
- [ ] Uso del Chernoff bound
- [ ] Teorema importante: errore additivo `εm` con probabilità almeno `1 - δ`
- [ ] Complessità spaziale `O(ε^{-2} log(2/δ))`

### Count-Min Sketch / Min-Sketch
- [ ] Matrice di contatori
- [ ] Funzioni hash universali per riga
- [ ] Aggiornamento dello sketch
- [ ] Query tramite minimo dei contatori
- [ ] One-sided error: mai sottostima
- [ ] Errore dovuto alle collisioni
- [ ] Analisi con Markov
- [ ] Scelta di `s` e `t`
- [ ] Teorema importante: `f_y ≤ \tilde f_y ≤ f_y + εm` con probabilità almeno `1 - δ`

### Filtri su stream
- [ ] Problema del filtraggio
- [ ] Insieme dei valori accettati
- [ ] Soluzione banale con tabella hash
- [ ] Problema di memoria

### First-Cut
- [ ] Array di bit
- [ ] Una funzione hash
- [ ] Accettazione se il bit è 1
- [ ] Falsi positivi
- [ ] Nessun falso negativo
- [ ] Analisi balls into bins
- [ ] Teorema importante: errore solo in caso di collisione

### Bloom Filters
- [ ] Uso di più funzioni hash
- [ ] Inizializzazione del filtro
- [ ] Query: tutti i bit devono essere 1
- [ ] Falsi positivi e assenza di falsi negativi
- [ ] Formula della probabilità di falso positivo
- [ ] Scelta ottimale del numero di hash
- [ ] Risultato importante: `k = (n/m) log 2`

### Conteggio degli elementi distinti
- [ ] Problema del distinct counting
- [ ] Limite dell’approccio con tabella hash
- [ ] Algoritmo Flajolet-Martin
- [ ] Posizione del primo `1` nella rappresentazione hash
- [ ] Sketch `R`
- [ ] Stima `2^R`
- [ ] Combinazione di sketch
- [ ] Problema della varianza
- [ ] Uso di più hash, mediane e medie
- [ ] Risultato importante: spazio `O(log log d)`

### Calcolo dei momenti
- [ ] Definizione del momento `k`-esimo
- [ ] Momento 0: numero di elementi distinti
- [ ] Momento 1: lunghezza dello stream
- [ ] Momento 2: numero sorpresa
- [ ] Metodo AMS
- [ ] Scelta casuale di un timestamp
- [ ] Variabile `X.el`
- [ ] Variabile `X.val`
- [ ] Stimatore per il secondo momento
- [ ] Dimostrazione che lo stimatore è unbiased
- [ ] Estensione a momenti superiori
- [ ] Combinazione dei sample tramite gruppi, medie e mediane
- [ ] Risultato importante: AMS fornisce uno stimatore unbiased dei momenti