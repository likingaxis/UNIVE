# Resoconto Corso: Probabilità e Statistica per l'Informatica

- **Anno:** 2° Anno Triennale
- **Area:** Matematico-Probabilistica / Informatica Teorica (MAT/06 - INF/01)
- **Crediti/Collocazione:** Insegnamento fondamentale per l'analisi probabilistica degli algoritmi e la gestione dell'incertezza computazionale

---

## Obiettivi del Corso in Sintesi

Il corso fornisce le basi matematiche e concettuali della teoria della probabilità e dell'inferenza statistica discreta, ponendo una specifica enfasi sulle applicazioni computazionali e algoritmiche. Lo studente apprende a:
1. **Modellare l'incertezza:** formalizzare problemi computazionali reali attraverso spazi probabilistici, variabili aleatorie e distribuzioni discrete.
2. **Progettare e analizzare algoritmi randomizzati:** sfruttare la casualità controllata come risorsa computazionale per ridurre drasticamente la complessità temporale o spaziale (algoritmi Monte Carlo e Las Vegas).
3. **Padroneggiare l'aspettativa e i bound probabilistici:** calcolare valori attesi, varianze e utilizzare la linearità dell'aspettativa e le disuguaglianze di union bound e Jensen per analizzare le prestazioni medie e le probabilità di errore.
4. **Applicare l'inferenza Bayesiana:** comprendere i fondamenti probabilistici dell'apprendimento automatico attraverso il classificatore Naive Bayes.

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### 1. Fondamenti di Probabilità e Algoritmi Randomizzati
- **La casualità come risorsa computazionale:**
  - Differenza tra algoritmi deterministici e probabilistici.
  - Controllo del trade-off tra efficienza e certezza del risultato (errore controllabile).
- **Test di identità polinomiale (Polynomial Identity Testing - PIT):**
  - Verifica probabilistica dell'uguaglianza tra polinomi complessi $F(x) = G(x)$ senza doverli sviluppare in forma canonica.
  - Principio di Schwartz-Zippel: per polinomi non identici di grado $d$, la valutazione su un punto casuale scelto in un insieme $S$ genera errore con probabilità al più $d/|S|$.
  - Abbattimento esponenziale dell'errore di falso positivo mediante ripetizioni di test indipendenti: $\Pr(\text{errore dopo } k \text{ prove}) \le (1/|S|)^k$.
- **Formalizzazione assiomatica dello spazio di probabilità (Assiomi di Kolmogorov):**
  - Spazio campionario $\Omega$: insieme di tutti i possibili esiti elementari.
  - Eventi come sottoinsiemi di $\Omega$ e loro algebra (unione, intersezione, complementare).
  - Funzione di probabilità $\Pr$: non negatività ($0 \le \Pr(E) \le 1$), normalizzazione ($\Pr(\Omega) = 1$), additività per eventi disgiunti ($\Pr(E_1 \cup E_2) = \Pr(E_1) + \Pr(E_2)$).
  - Regola generale della somma per eventi compatibili: $\Pr(E_1 \cup E_2) = \Pr(E_1) + \Pr(E_2) - \Pr(E_1 \cap E_2)$.
- **Disuguaglianza di Boole (Union Bound):**
  - Principio fondamentale: $\Pr(\bigcup_{i=1}^n E_i) \le \sum_{i=1}^n \Pr(E_i)$.
  - Utilizzo pratico come limite superiore (upper bound) per la probabilità che fallisca almeno uno tra più componenti o vincoli algoritmici, indipendentemente dalle loro correlazioni.
- **Verifica probabilistica della moltiplicazione di matrici (Algoritmo di Freivalds):**
  - Problema: verificare se $A \times B = C$ per matrici $n \times n$ senza eseguire il costoso prodotto completo ($O(n^3)$ con algoritmo standard).
  - Strategia Monte Carlo: moltiplicazione a cascata con vettore colonna casuale $r \in \{0, 1\}^n$, verificando se $A(Br) = Cr$.
  - Riduzione della complessità computazionale da $O(n^3)$ a $O(n^2)$.
  - Analisi dell'errore unilaterale: se $AB = C$, il test è sempre verificato; se $AB \neq C$, la probabilità di fallimento (vettore nullo $Dr = 0$ con $D = AB - C \neq 0$) è $\le 1/2$.
  - Amplificazione del successo con $k$ esecuzioni indipendenti: $\Pr(\text{errore}) \le (1/2)^k$.

### 2. Probabilità Condizionata, Indipendenza e Machine Learning Bayesiano
- **Probabilità condizionata:**
  - Definizione: $\Pr(E \mid F) = \frac{\Pr(E \cap F)}{\Pr(F)}$ con $\Pr(F) > 0$.
  - Riformulazione dello spazio campionario ristretto alla conoscenza a priori dell'evento $F$.
- **Regola della moltiplicazione (Chain Rule):**
  - Calcolo congiunto: $\Pr(E \cap F) = \Pr(F) \cdot \Pr(E \mid F) = \Pr(E) \cdot \Pr(F \mid E)$.
  - Estensione per sequenze di $n$ eventi (campionamento con e senza reinserimento).
- **Indipendenza stocastica:**
  - Definizione: $E$ e $F$ sono indipendenti se $\Pr(E \cap F) = \Pr(E) \cdot \Pr(F)$, ovvero $\Pr(E \mid F) = \Pr(E)$.
  - Differenza cruciale tra eventi disgiunti (mutuamente esclusivi, fortemente dipendenti) ed eventi indipendenti.
- **Teorema della Probabilità Totale e Teorema di Bayes:**
  - Scomposizione di un evento su una partizione disgiunta ed esaustiva dello spazio campionario.
  - Formulazione di Bayes: calcolo della probabilità a posteriori data la probabilità a priori e le verosimiglianze:
    $$\Pr(C \mid x) = \frac{\Pr(C) \cdot \Pr(x \mid C)}{\Pr(x)}$$
- **Classificatore Naive Bayes (Filtro Antispam e Text Mining):**
  - Modello a decisione Maximum A Posteriori (MAP) per assegnazione di classi (es. spam vs non spam).
  - Assunzione "Naive": indipendenza condizionale delle caratteristiche (parole / feature) data la classe:
    $$\Pr(x_1, x_2, \dots, x_n \mid C) = \prod_{i=1}^n \Pr(x_i \mid C)$$
  - Relazione di proporzionalità $\Pr(C \mid x) \propto \Pr(C) \prod_i \Pr(x_i \mid C)$ eliminando la costante marginale $\Pr(x)$.

### 3. Variabili Casuali Discrete e Aspettativa
- **Definizione formale di Variabile Casuale Discreta:**
  - Funzione misurabile $X: \Omega \to \mathbb{R}$ che mappa eventi elementari in valori numerici reali.
  - Funzione di massa di probabilità (PMF): $p(x) = \Pr(X = x)$.
  - Distinzione concettuale tra evento (booleano), probabilità (scalare in $[0, 1]$) e variabile casuale (valore numerico estraibile).
- **Valore Atteso (Aspettativa Matematica):**
  - Media pesata teorica dei valori assumibili: $E[X] = \sum_x x \cdot \Pr(X = x)$.
  - Interpretazione frequenzista: baricentro della distribuzione e limite delle medie empiriche per infinite prove.
- **Famiglie e vettori di variabili casuali:**
  - Notazione con indici per processi stocastici e serie di esperimenti ($X_1, X_2, \dots, X_n$).
  - Somme di variabili casuali: $S_n = \sum_{i=1}^n X_i$.
- **Linearità dell'aspettativa:**
  - Proprietà fondamentale: $E[X + Y] = E[X] + E[Y]$ e $E[c X] = c E[X]$.
  - **Validità incondizionata:** la linearità vale SEMPRE, anche se le variabili aleatorie non sono tra loro indipendenti.
  - Applicazione con variabili indicatrici (Bernoulli) per calcolare valori attesi di problemi combinatori complessi.
- **Divergenza dell'aspettativa:**
  - Distribuzioni a coda pesante (es. Paradosso di San Pietroburgo, variabili con valori esponenziali $2^i$ e probabilità $2^{-i}$).
  - Casi di serie non convergenti: $E[X] = \infty$.
- **Disuguaglianza di Jensen:**
  - Proprietà per funzioni convesse $f$: $E[f(X)] \ge f(E[X])$.
  - Implicazioni pratiche: $E[X^2] \ge (E[X])^2$, con uguaglianza stretta solo se $X$ è una costante deterministica.

### 4. Distribuzioni Notevoli, Varianza e Aspettativa Condizionata
- **Variabile Aleatoria di Bernoulli:**
  - Esperimento a due soli esiti (successo = 1, insuccesso = 0) con parametro $p \in [0, 1]$.
  - Media: $E[X] = p$.
  - Varianza: $\operatorname{Var}(X) = p(1 - p)$, massima per $p = 0.5$ (massima incertezza entropica).
- **Distribuzione Binomiale:**
  - Modello per il conteggio del numero di successi in $n$ prove indipendenti e identicamente distribuite (prove bernoulliane ripetute).
  - PMF combinatoria: $\Pr(X = k) = \binom{n}{k} p^k (1 - p)^{n - k}$.
  - Interpretazione analitica dei termini: probabilità della sequenza specifica pesata per il coefficiente binomiale delle permutazioni.
  - Valore atteso calcolato per linearità: $E[X] = \sum_{i=1}^n E[X_i] = n p$.
  - Varianza: $\operatorname{Var}(X) = n p (1 - p)$, deviazione standard $\sigma = \sqrt{n p (1 - p)}$.
  - Deviazione attorno al valore medio ed effetto della legge dei grandi numeri all'aumentare di $n$.
- **Aspettativa Condizionata e Legge delle Aspettative Totali:**
  - Valore atteso condizionato ad un evento: $E[X \mid A] = \sum_x x \cdot \Pr(X = x \mid A)$.
  - Legge di scomposizione / Torre delle aspettative: $E[X] = \sum_i E[X \mid A_i] \cdot \Pr(A_i)$.
  - Applicazione algoritmica: calcolo del tempo medio atteso di esecuzione di procedure su casi di input partizionati (istanze facili vs istanze degeneri/difficili).
- **Distribuzione Geometrica:**
  - Modello del tempo di attesa / numero di tentativi indipendenti necessari per ottenere il **primo successo**.
  - PMF: $\Pr(X = k) = (1 - p)^{k - 1} p$, per $k \in \{1, 2, 3, \dots\}$.
  - Valore atteso: $E[X] = \frac{1}{p}$ (es. se la probabilità di successo è $0.1$, servono in media 10 tentativi).
  - Varianza: $\operatorname{Var}(X) = \frac{1 - p}{p^2}$.
  - Assenza di memoria (Memoryless property) e applicazioni: ritrasmissione pacchetti su canali rumorosi, algoritmi di backoff esponenziale, risoluzione delle contese e hashing probabilistico.

---

## Linguaggi, Strumenti e Tecnologie

Sebbene il corso sia orientato ai principi formali e matematici della probabilità per l'informatica, gli strumenti concettuali e pratici di riferimento includono:
- **Calcolo Simbolico e Matematico:** Manipolazione analitica di sommatorie, calcolo combinatorio, prodotti matriciali e convergenza di serie.
- **Progettazione di Algoritmi Randomizzati:** Paradigma Monte Carlo (algoritmi veloci con piccolo errore controllabile) e Las Vegas (risultato sempre corretto, tempo di esecuzione casuale).
- **Generatori di Numeri Pseudo-Casuali (PRNG):** Campionamento uniforme e simulazione computazionale di variabili casuali con differenti distribuzioni discrete.
- **Machine Learning Probabilistico:** Modelli generativi di classificazione, vettorizzazione bag-of-words e stima di massima verosimiglianza per classificatori Naive Bayes.

---

## Tipologia Esercizi e Prove d'Esame

La verifica dell'apprendimento e gli esercizi tipici del programma comprendono:
1. **Analisi di Algoritmi Probabilistici:**
   - Calcolo della complessità e della probabilità di fallimento dell'algoritmo di Freivalds su matrici di dimensione arbitraria.
   - Determinazione del numero minimo di iterazioni $k$ necessarie a garantire che la probabilità di errore sia inferiore ad una soglia assegnata $\epsilon$ (es. $\epsilon \le 10^{-6}$).
   - Verifica di identità polinomiali con il metodo Schwartz-Zippel.
2. **Calcolo Combinatorio e Probabilità Condizionata:**
   - Risoluzione di problemi di estrazione con e senza rimpiazzo da mazzi, urne e sequenze di bit.
   - Applicazione del Teorema di Bayes a scenari reali (affidabilità di test diagnostici, rilevamento anomalie di rete).
   - Classificazione manuale di messaggi testuali con il metodo Naive Bayes dati i dizionari di frequenza a priori e condizionati.
3. **Calcolo di Valore Atteso e Varianza:**
   - Applicazione della linearità dell'aspettativa a problemi di contesa, posizionamento in hash table e collisioni (Birthday Paradox).
   - Dimostrazione di limiti e disuguaglianze utilizzando la disuguaglianza di Jensen per funzioni convesse.
   - Calcolo del tempo medio atteso di algoritmi tramite la legge delle aspettative totali su partizioni di scenari.
4. **Problemi sulle Distribuzioni Notevoli:**
   - Esercizi su variabili Binomiali: calcolo esatto della probabilità di $k$ successi su $n$ trasmissioni, stima di media e varianza.
   - Esercizi su variabili Geometriche: calcolo del numero medio di ritrasmissioni di un pacchetto di rete prima della ricezione corretta su un canale con tasso di perdita $1-p$.
