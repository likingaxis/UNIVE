# Correzioni e punti da ricordare per l’esame di Information Retrieval

## 1. Pipeline generale di un sistema IR

Un sistema di Information Retrieval ha l’obiettivo di recuperare, da una collezione di documenti, quelli più rilevanti rispetto all’information need dell’utente, espresso tramite una query.

La pipeline si divide in una fase offline e una fase online.

Nella fase offline il sistema lavora prima dell’arrivo della query. I documenti vengono preprocessati tramite tokenizzazione, normalizzazione, rimozione di stopword ed eventualmente stemming. Successivamente si costruisce una struttura dati efficiente, tipicamente l’indice inverso. L’indice inverso associa ogni termine del vocabolario alla posting list dei documenti in cui compare. Nelle posting list possono essere salvati docID, term frequency, posizioni e altre informazioni utili allo scoring.

Sempre nella fase offline si calcolano statistiche della collezione, come document frequency, collection frequency, lunghezza dei documenti, lunghezza media della collezione e term frequency.

Nella fase online arriva la query dell’utente. Anche la query viene preprocessata in modo coerente con i documenti. Per ogni termine della query si accede alla relativa posting list e si costruisce l’insieme dei documenti candidati.

Una correzione importante è che l’insieme dei candidati contiene documenti, non termini. Non bisogna dire che “inserisco i termini della query nell’insieme dei candidati”, ma che “uso i termini della query per recuperare dalle posting list i documenti candidati”.

L’indice inverso serve proprio a evitare di scorrere tutti i documenti della collezione. Quindi è meglio non dire che, nella fase online, “scorro tutti i documenti e tutti i termini”. La frase corretta è: accedo alle posting list dei termini della query e recupero direttamente i documenti che possono ricevere uno score.

Dopo aver ottenuto i candidati, si applica una funzione di scoring, come TF-IDF/cosine, BM25, Language Model, LSI o un modello ibrido. I documenti vengono ordinati per score decrescente e si restituiscono i primi K risultati.

Per efficienza si può usare un min-heap di dimensione K. Il min-heap non elimina lo scoring, ma evita di ordinare completamente tutti i documenti: mantiene in memoria solo i migliori K documenti visti finora.

Dopo il ranking si possono introdurre relevance feedback, pseudo relevance feedback o query expansion. Separatamente, il sistema può essere valutato su un gold standard con metriche come Precision@K, MAP o nDCG, e queste metriche possono essere usate per fare tuning dei parametri.

Frase da esame:

Un sistema IR ha una fase offline, in cui preprocessa i documenti, costruisce l’indice inverso e calcola statistiche della collezione, e una fase online, in cui preprocessa la query, recupera documenti candidati tramite le posting list, calcola uno score di ranking e restituisce i top-K risultati.

---

## 2. Vector Space Model, TF-IDF e cosine similarity

Nel Vector Space Model documenti e query sono rappresentati come vettori nello spazio dei termini. Ogni dimensione corrisponde a un termine del vocabolario, mentre il valore della dimensione rappresenta il peso del termine in quel documento o nella query.

È più corretto dire che documenti e query sono vettori nello spazio dei termini, non che “documenti, termini e query sono tutti vettori”, almeno nella spiegazione base del VSM. I termini sono le dimensioni dello spazio.

Un peso classico è TF-IDF:

$$  
w_{t,d}=tf_{t,d}\cdot idf_t  
$$

La TF misura quanto un termine compare nel documento. L’IDF misura quanto quel termine è raro e quindi discriminativo nella collezione. Termini molto frequenti in tanti documenti hanno IDF basso, mentre termini rari hanno IDF alto.

Per confrontare query e documenti si usa spesso la cosine similarity:

$$  
\cos(q,d)=\frac{q\cdot d}{|q||d|}  
$$

La cosine similarity misura l’angolo tra i vettori, quindi confronta la direzione più che la lunghezza assoluta. Se due vettori sono ortogonali, la similarità è bassa o nulla. Se hanno direzione simile, la similarità è alta.

Il limite principale del VSM con TF-IDF è che resta un modello lessicale: funziona bene quando query e documento condividono termini, ma può fallire con sinonimia o mismatch lessicale.

BM25 può essere visto come un modello lessicale più robusto perché mantiene l’idea di TF e IDF, ma introduce due meccanismi importanti: saturazione della term frequency e normalizzazione per lunghezza del documento.

Frase da esame:

TF-IDF/cosine rappresenta query e documenti come vettori sparsi nello spazio dei termini e li confronta tramite l’angolo tra i vettori. BM25 mantiene l’idea di peso lessicale dei termini, ma gestisce meglio ripetizioni e lunghezza dei documenti tramite $k_1$ e $b$.

---

## 3. PRP, BIM e IDF probabilistico

Il Probability Ranking Principle afferma che, sotto certe assunzioni, l’ordinamento ottimale dei documenti è quello decrescente rispetto alla probabilità di rilevanza:

$$  
P(R|d,q)  
$$

dove $R$ indica che il documento è rilevante rispetto alla query.

L’error cost of retrieval non indica la rilevanza del documento. Serve invece a giustificare che, se i costi degli errori sono uniformi, ordinare per probabilità di rilevanza minimizza il rischio atteso.

Il Binary Independence Model è un modello probabilistico binario. Documenti e query sono rappresentati come vettori binari: per ogni termine si ha 1 se il termine è presente e 0 se è assente.

La rilevanza è del documento rispetto alla query, non del documento rispetto a un singolo termine. I termini sono segnali usati per stimare la rilevanza.

Nel BIM si definiscono:

$$  
p_i=P(x_i=1|R,q)  
$$

$$  
u_i=P(x_i=1|\bar R,q)  
$$

dove $p_i$ è la probabilità che il termine $i$ compaia nei documenti rilevanti, mentre $u_i$ è la probabilità che compaia nei documenti non rilevanti.

Il contributo del termine è:

$$  
c_i=\log\frac{p_i(1-u_i)}{u_i(1-p_i)}  
$$

Lo score del documento, o Retrieval Status Value, è:

$$  
RSV_d=\sum_{i:x_i=y_i=1}c_i  
$$

La somma considera i termini presenti sia nel documento sia nella query.

Senza giudizi di rilevanza, spesso si approssima:

$$  
p_i\approx 0.5  
$$

$$  
u_i\approx \frac{df_i}{N}  
$$

e si ottiene un peso simile all’IDF:

$$  
\log\frac{N}{df_i}  
$$

Il punto chiave è che nel BIM l’IDF emerge da una logica probabilistica: un termine raro nella collezione è più utile per distinguere i documenti rilevanti dai non rilevanti.

Errore da evitare: non dire che $p_i$ e $u_i$ sono parametri del documento. Sono parametri associati al termine $i$.

Frase da esame:

Nel BIM la presenza dei termini è binaria e lo score deriva da un log-odds ratio tra probabilità di comparsa nei documenti rilevanti e non rilevanti. Senza feedback, il peso probabilistico del termine diventa simile a un IDF.

---

## 4. Poisson, 2-Poisson ed eliteness

Il limite principale del BIM è che non usa la term frequency. Un termine che compare una volta e un termine che compare molte volte sono trattati allo stesso modo.

Per superare questo limite si introducono modelli che usano i conteggi dei termini. Il modello di Poisson modella il numero di occorrenze di un termine in un documento, dato un certo tasso medio atteso.

Uno score possibile è:

$$  
RSV_d=\sum_{t_i:y_i=1} n_i \log \frac{\rho_i}{\gamma_i}  
$$

dove $n_i$ è la frequenza del termine nel documento, $\rho_i$ è la frequenza media attesa nei documenti rilevanti e $\gamma_i$ è la frequenza media attesa nella collezione o nei documenti non rilevanti.

Il problema è che il contributo cresce linearmente con $n_i$. Quindi più il termine viene ripetuto, più lo score cresce. Questo può essere problematico perché ripetere molte volte un termine non dovrebbe aumentare indefinitamente la rilevanza.

Il modello 2-Poisson introduce il concetto di eliteness. Per un dato termine, un documento può essere elite se quel termine è davvero rappresentativo del documento, oppure non-elite se il termine non è centrale.

È importante dire che eliteness, contentful e contentless sono concetti relativi a un termine in un documento, non proprietà assolute del documento.

L’idea intuitiva è che, oltre una certa frequenza, un documento è già elite per quel termine, quindi ulteriori ripetizioni devono pesare sempre meno. Questo anticipa la saturazione della term frequency in BM25.

Il 2-Poisson è teoricamente interessante, ma richiede troppi parametri da stimare. BM25 è una soluzione pratica: usa IDF, term frequency, saturazione e normalizzazione per lunghezza.

Frase da esame:

Il 2-Poisson introduce l’idea che, per un termine, esistano documenti elite e non-elite. BM25 rende pratica questa intuizione usando una funzione di saturazione della term frequency.

---

## 5. BM25

BM25 è un modello di ranking probabilistico pratico. È nato dalla tradizione del probabilistic retrieval e può essere visto come una soluzione operativa rispetto a modelli teorici più complessi come il 2-Poisson.

BM25 non restituisce una probabilità normalizzata tra 0 e 1. Restituisce uno score di ranking, cioè un Retrieval Status Value.

Una forma comune della formula è:

$$  
BM25(d,q)=  
\sum_{t\in q}  
IDF(t)  
\cdot  
\frac{tf_{t,d}(k_1+1)}  
{tf_{t,d}+k_1\left(1-b+b\frac{|d|}{avgdl}\right)}  
$$

dove:

- $tf_{t,d}$ è la frequenza del termine $t$ nel documento $d$;
    
- $IDF(t)$ misura quanto il termine è raro e discriminativo;
    
- $|d|$ è la lunghezza del documento;
    
- $avgdl$ è la lunghezza media dei documenti nella collezione;
    
- $k_1$ controlla la saturazione della term frequency;
    
- $b$ controlla la normalizzazione per lunghezza.
    

L’IDF dà più peso ai termini rari e meno peso ai termini frequenti. Non elimina i termini frequenti: ne riduce semplicemente il contributo.

Il parametro $k_1$ controlla quanto velocemente satura la term frequency. Se un termine compare più volte, il suo contributo aumenta, ma non indefinitamente.

Il parametro $b$ controlla la normalizzazione per lunghezza. Se $b=0$, non c’è normalizzazione per lunghezza. Se $b=1$, la normalizzazione è piena. Un valore tipico è circa 0.75.

Rispetto a TF-IDF/cosine, BM25 gestisce in modo più esplicito la frequenza del termine e la lunghezza del documento. TF-IDF/cosine usa una normalizzazione geometrica, mentre BM25 ha parametri interpretabili per controllare saturazione e lunghezza.

La term frequency della query non compare di solito nella formula BM25 standard. Può comparire in una versione estesa con il parametro $k_3$:

$$  
\frac{tf_{t,q}(k_3+1)}{tf_{t,q}+k_3}  
$$

Tuttavia, nelle query brevi spesso si ignora questo fattore, perché i termini della query compaiono quasi sempre una sola volta.

Frase da esame:

BM25 è probabilistico come origine teorica, ma operativo come funzione di scoring lessicale. Somma i contributi dei termini della query usando IDF, term frequency saturata e normalizzazione per lunghezza.

---

## 6. Language Model per IR e smoothing

Nei Language Model per IR ogni documento viene visto come un modello generativo $M_d$. L’idea è stimare quanto è probabile che il modello del documento generi la query:

$$  
P(q|M_d)  
$$

Si usa un modello unigram bag-of-words, quindi si assume che la query sia generata come prodotto delle probabilità dei suoi termini:

$$  
P(q|M_d)=\prod_{t\in q}P(t|M_d)  
$$

Se si considerano le frequenze nella query:

$$  
P(q|M_d)\propto \prod_{t:tf_{t,q}>0}P(t|M_d)^{tf_{t,q}}  
$$

La stima Maximum Likelihood è:

$$  
\hat{P}(t|M_d)=\frac{tf_{t,d}}{|d|}  
$$

Il problema è che, se un termine della query non compare nel documento, la probabilità diventa zero e tutta la query likelihood si annulla. Per questo serve lo smoothing.

Con Dirichlet smoothing:

$$  
P_{Dir}(t|d)=  
\frac{tf_{t,d}+\mu P(t|C)}  
{|d|+\mu}  
$$

dove $P(t|C)$ è la probabilità del termine nella collezione e $\mu$ controlla il peso della collezione.

Se $\mu$ è alto, il documento viene smussato molto verso il modello della collezione. Se $\mu$ è basso, ci si fida di più del documento. Nei documenti corti lo smoothing pesa di più, perché $|d|$ è piccolo rispetto a $\mu$.

In pratica si usa spesso la log-likelihood:

$$  
\log P(q|M_d)=  
\sum_{t\in q}tf_{t,q}\log P(t|d)  
$$

Il prodotto diventa una somma, più stabile numericamente.

Rispetto a BM25, il Language Model non ha un IDF esplicito, ma $P(t|C)$ produce un effetto simile: i termini rari nella collezione possono dare un contributo maggiore.

Errore da evitare: la produttoria o sommatoria è sui termini della query, non sui termini del documento.

Frase da esame:

Nei Language Model non chiedo direttamente quanto un documento sia rilevante, ma quanto è probabile che il modello generativo del documento produca la query osservata. Lo smoothing evita probabilità zero e combina documento e collezione.

---

## 7. Confronto BIM, BM25 e Language Model

BIM, BM25 e Language Model appartengono tutti alla famiglia probabilistica, ma hanno prospettive diverse.

Il BIM è binario: considera solo presenza o assenza dei termini. È utile per introdurre il log-odds e l’IDF probabilistico, ma non usa la term frequency.

BM25 supera questo limite introducendo la term frequency, ma in modo saturato. Usa anche normalizzazione per lunghezza e IDF. Lo score BM25 non è una probabilità, ma un valore di ranking.

Il Language Model usa una prospettiva generativa: ogni documento è un modello che può generare la query. Si calcola $P(q|M_d)$, spesso in log-likelihood, e si usa smoothing per evitare probabilità zero.

Errore da evitare: non dire che BM25 è “somma di logaritmi” come il Language Model. BM25 è una somma di contributi pesati dei termini; il Language Model usa la somma dei log delle probabilità.

Frase da esame:

BM25 e Language Model sono entrambi probabilistici, ma BM25 è una funzione discriminativa di scoring lessicale, mentre il Language Model stima la probabilità che il documento generi la query.

---

## 8. Valutazione dei sistemi IR

Per valutare un sistema IR serve un gold standard, cioè un insieme di query con giudizi di rilevanza, detti qrels.

Precision e recall misurano aspetti diversi.

La precision misura quanti documenti recuperati sono rilevanti:

$$  
Precision=\frac{rilevanti\ recuperati}{documenti\ recuperati}  
$$

La recall misura quanti documenti rilevanti totali sono stati recuperati:

$$  
Recall=\frac{rilevanti\ recuperati}{rilevanti\ totali}  
$$

Precision@K guarda solo i primi K risultati:

$$  
Precision@K=\frac{rilevanti\ nei\ primi\ K}{K}  
$$

È importante perché spesso l’utente guarda solo i primi risultati.

Average Precision considera la precisione nei punti in cui compare un documento rilevante. MAP è la media dell’Average Precision su più query.

Errore da evitare: AP non è la media della precisione in tutti i punti del ranking, ma solo nelle posizioni in cui si trova un documento rilevante.

DCG e nDCG si usano quando i giudizi di rilevanza sono graduati. DCG dà più peso ai documenti rilevanti che compaiono in alto nel ranking. nDCG normalizza il DCG rispetto al ranking ideale, così il valore è confrontabile tra query diverse.

MRR considera la posizione del primo documento rilevante ed è utile quando interessa trovare rapidamente una risposta corretta.

Frase da esame:

Precision@K valuta la qualità dei primi risultati, MAP valuta l’intero ranking binario mediando sulle query, mentre nDCG è adatto a giudizi di rilevanza graduati e premia i documenti rilevanti posizionati in alto.

---

## 9. Precision-recall e interpolazione

Il grafico precision-recall non ha $K$ sugli assi, ma i suoi punti sono generati facendo variare $K$ lungo il ranking.

Per ogni valore di $K$, si calcolano:

$$  
Precision@K  
$$

$$  
Recall@K  
$$

Ogni $K$ genera quindi un punto:

$$  
(Recall@K, Precision@K)  
$$

Nel grafico si vedono solo precision e recall, ma dietro ogni punto c’è un certo valore di $K$.

La curva può essere irregolare, perché la precision può salire o scendere a seconda che il prossimo documento sia rilevante o non rilevante.

La precisione interpolata a un livello di recall $r$ si definisce come:

$$  
P_{interp}(r)=\max_{r'\ge r}P(r')  
$$

Questo significa che, per un certo livello di recall $r$, si prende la massima precisione ottenuta per qualunque livello di recall maggiore o uguale a $r$.

Non bisogna prendere la precisione massima globale, e non bisogna prendere solo i punti esattamente con recall $r$. Bisogna guardare tutti i punti da $r$ in poi.

Frase da esame:

La curva precision-recall nasce facendo variare K nel ranking. L’interpolazione associa a ogni livello di recall la massima precisione ottenuta da quel livello di recall in avanti, cioè $P_{interp}(r)=\max_{r'\ge r}P(r')$.

---

## 10. Relevance feedback, Rocchio e query expansion

Il relevance feedback serve a migliorare la query usando informazioni sui documenti rilevanti e non rilevanti.

Nel Vector Space Model, Rocchio modifica il vettore della query avvicinandolo al centroide dei documenti rilevanti e allontanandolo dai documenti non rilevanti:

$$  
q_m=  
\alpha q_0+  
\beta \frac{1}{|D_r|}\sum_{d_j\in D_r}d_j -
\gamma \frac{1}{|D_{nr}|}\sum_{d_j\in D_{nr}}d_j  
$$

dove $q_0$ è la query originale, $D_r$ sono i documenti rilevanti e $D_{nr}$ quelli non rilevanti.

Il pseudo relevance feedback assume che i primi documenti restituiti siano rilevanti e li usa per espandere o modificare la query. Il rischio principale è il query drift: se i primi risultati non sono davvero rilevanti, la query si sposta nella direzione sbagliata.

La query expansion globale usa risorse come thesauri o statistiche della collezione per aggiungere termini correlati. Non è sempre migliore: può migliorare recall, ma può anche introdurre rumore.

Le due assunzioni importanti del relevance feedback sono:

1. la query iniziale deve essere abbastanza vicina al bisogno informativo;
    
2. i documenti rilevanti devono avere una certa coerenza lessicale o tematica.
    

Frase da esame:

Rocchio modifica la query nello spazio vettoriale avvicinandola ai documenti rilevanti e allontanandola dai non rilevanti. Il pseudo relevance feedback automatizza questo processo, ma rischia query drift.

---

## 11. LSI, SVD e folding-in

LSI parte da una matrice termine-documento:

$$  
A\in \mathbb{R}^{m\times n}  
$$

dove le righe rappresentano i termini e le colonne rappresentano i documenti. I valori possono essere pesi TF-IDF.

La SVD fattorizza la matrice:

$$  
A=U\Sigma V^T  
$$

dove:

- $U$ descrive lo spazio dei termini;
    
- $\Sigma$ contiene i valori singolari;
    
- $V^T$ descrive lo spazio dei documenti.
    

I valori singolari sono sulla diagonale di $\Sigma$, ordinati in modo decrescente. I più grandi catturano le componenti più importanti della matrice.

Con la low-rank approximation si tengono solo i primi $k$ valori singolari:

$$  
A_k=U_k\Sigma_kV_k^T  
$$

Non bisogna dire che la low-rank usa solo $\Sigma$. Usa $U_k$, $\Sigma_k$ e $V_k^T$.

LSI riduce rumore e dimensionalità, cercando uno spazio latente in cui termini e documenti semanticamente correlati risultano vicini anche se non condividono esattamente le stesse parole.

Il folding-in serve a proiettare una nuova query nello spazio latente senza rifare la SVD. Se la query è rappresentata come vettore colonna:

$$  
q_k=\Sigma_k^{-1}U_k^Tq  
$$

Se invece la query è rappresentata come vettore riga:

$$  
q_k=q^TU_k\Sigma_k^{-1}  
$$

Dopo il folding-in si confronta la query con i documenti nello spazio latente, spesso tramite cosine similarity.

Errore da evitare: non dire che LSI è syntax-based. LSI è un metodo latente basato su co-occorrenze e riduzione dimensionale.

Frase da esame:

LSI usa la SVD per approssimare la matrice termine-documento con una matrice low-rank, ottenendo uno spazio latente che cattura associazioni semantiche e riduce il rumore lessicale.

---

## 12. Efficienza, top-K, heap e WAND

Il problema dell’efficienza nasce perché, in grandi collezioni, calcolare lo score completo per tutti i documenti può essere troppo costoso.

Un min-heap di dimensione K consente di mantenere i migliori K documenti trovati finora. La soglia corrente è lo score del peggior documento nel heap, cioè il minimo tra i top-K attuali.

Safe pruning significa che l’algoritmo restituisce la stessa top-K che si otterrebbe calcolando lo score completo su tutti i documenti. Non significa che la top-K sia “sicuramente rilevante per l’utente”, ma solo che è corretta rispetto alla funzione di scoring.

WAND non è una funzione di scoring e non sostituisce BM25. WAND usa una funzione di scoring, per esempio BM25, e cerca di evitare di calcolare lo score completo di documenti che non possono entrare nella top-K.

Per ogni termine si calcola un upper bound:

$$  
UB_t=\max_d score_t(d)  
$$

cioè il massimo contributo che quel termine può dare allo score di qualunque documento.

Per una query si considerano gli upper bound dei termini della query. Se anche sommando i massimi contributi possibili un documento non può superare la soglia corrente, allora quel documento può essere saltato. Se invece può superarla, si calcola lo score effettivo con BM25.

Errore da evitare: non dire “al posto di BM25 uso WAND”. La frase corretta è: “uso WAND per ottimizzare il calcolo della top-K BM25”.

Frase da esame:

WAND è una tecnica di pruning safe che usa upper bound dei contributi dei termini per evitare scoring inutili. Non cambia il modello di ranking, ma rende più efficiente il calcolo della top-K.

---

## 13. Link analysis: PageRank e HITS

La link analysis usa la struttura dei link tra pagine come segnale di importanza.

PageRank è un metodo globale e query-independent. Modella un random surfer che segue link tra pagine, ma con una certa probabilità effettua teleporting verso una pagina casuale. Il teleporting evita problemi come sink e componenti isolate.

PageRank può essere interpretato come una distribuzione stazionaria di una catena di Markov. Una pagina è importante se riceve link da pagine a loro volta importanti.

HITS è invece un metodo locale e query-dependent. Parte da una query, costruisce un root set di pagine recuperate testualmente, poi espande il root set in un base set aggiungendo pagine linkate e pagine che linkano quelle del root set.

In HITS ogni pagina ha due score:

- authority score;
    
- hub score.
    

Una buona authority è puntata da buoni hub. Un buon hub punta a buone authority.

Le formule sono:

$$  
a=L^Th  
$$

$$  
h=La  
$$

dove $L$ è la matrice dei link.

Errore da evitare: non chiamare HITS “PageRank locale”. Sono due metodi diversi. Inoltre, ogni pagina ha sia hub score sia authority score, anche se poi può essere forte più in uno dei due ruoli.

Frase da esame:

PageRank misura globalmente l’importanza di una pagina tramite il random surfer, mentre HITS è query-dependent e distingue tra pagine authority e pagine hub all’interno di un base set.

---

## 14. Distributional semantics e PMI

La Distributional Hypothesis afferma che parole che compaiono in contesti simili tendono ad avere significati simili.

Le relazioni sintagmatiche riguardano parole che compaiono insieme nello stesso contesto locale, per esempio in una finestra di parole. Le relazioni paradigmatiche riguardano parole che possono comparire in contesti simili e quindi possono essere sostituibili. Le relazioni topiche riguardano parole associate allo stesso argomento.

Si può costruire una matrice di co-occorrenza, dove righe e colonne rappresentano parole o contesti, e i valori indicano quante volte una parola compare con un’altra parola o in un certo contesto.

La PMI, Pointwise Mutual Information, misura quanto due eventi co-occorrono più di quanto ci si aspetterebbe se fossero indipendenti:

$$  
PMI(x,y)=\log\frac{P(x,y)}{P(x)P(y)}  
$$

Se PMI è positiva, $x$ e $y$ compaiono insieme più spesso del previsto. Se è circa zero, sono quasi indipendenti. Se è negativa, compaiono insieme meno del previsto.

Un limite della PMI è che può sovrastimare coppie rare.

Frase da esame:

La PMI misura l’associazione tra due parole confrontando la loro probabilità congiunta con quella attesa sotto indipendenza. È utile per costruire spazi distribuzionali, ma può dare valori troppo alti a coppie rare.

---

## 15. Dense retrieval, kNN e hybrid retrieval

Nel dense retrieval query e documenti sono rappresentati come embedding densi. Una funzione di embedding $E(\cdot)$ trasforma testo in vettori:

$$  
\vec q=E(q)  
$$

$$  
\vec d_i=E(d_i)  
$$

La similarità tra query e documento può essere calcolata con cosine similarity:

$$  
sim_{dense}(q,d_i)=  
\frac{\vec q\cdot \vec d_i}  
{|\vec q||\vec d_i|}  
$$

Il kNN restituisce i $k$ documenti più vicini alla query nello spazio degli embedding:

$$  
TopK(q)=\operatorname{arg\,topK}_{d_i\in D}sim_{dense}(q,d_i)  
$$

Il dense retrieval è utile perché può catturare similarità semantica anche senza overlap lessicale. Per esempio, una query con “aircraft speed” può essere vicina a un documento con “plane velocity”.

Un sistema ibrido combina BM25 e dense retrieval. Poiché BM25 e cosine similarity hanno scale diverse, prima bisogna normalizzare gli score, per esempio con min-max normalization:

$$  
BM25_{norm}(d)=  
\frac{BM25(d)-BM25_{min}}  
{BM25_{max}-BM25_{min}}  
$$

$$  
sim_{norm}(d)=  
\frac{sim_{dense}(d)-sim_{min}}  
{sim_{max}-sim_{min}}  
$$

Poi si può usare una somma pesata:

$$  
score_{hybrid}(q,d)=  
\alpha BM25_{norm}(q,d)+(1-\alpha)sim_{norm}(q,d)  
$$

dove $\alpha$ controlla il peso del matching lessicale rispetto a quello semantico.

Errore da evitare: non dire che kNN è Rocchio. Entrambi usano vettori, ma Rocchio modifica la query usando feedback, mentre kNN cerca i documenti più vicini alla query nello spazio degli embedding.

Frase da esame:

BM25 cattura il matching lessicale esatto, mentre il dense retrieval cattura similarità semantica. Un sistema ibrido normalizza e combina i due score per sfruttare entrambi i segnali.

---

## 16. Valutazione, miglioramento ed efficienza: distinzione fondamentale

All’esame bisogna distinguere tre piani:

1. valutazione;
    
2. miglioramento del ranking;
    
3. ottimizzazione dell’efficienza.
    

La valutazione misura la qualità del sistema usando metriche come Precision@K, Recall, MAP e nDCG.

Il miglioramento del ranking riguarda tecniche che possono cambiare la qualità dei risultati, come tuning di $k_1$ e $b$, query expansion, relevance feedback, pseudo relevance feedback, LSI, dense retrieval o hybrid retrieval.

L’efficienza riguarda tecniche che rendono più veloce il calcolo, come heap, pruning e WAND.

Errore importante da evitare: non dire che MAP o nDCG migliorano il ranking. Le metriche valutano il ranking. Possono essere usate per fare tuning, ma non sono loro direttamente a migliorare i risultati.

Altro errore da evitare: non dire che WAND migliora la qualità. WAND migliora l’efficienza mantenendo la stessa top-K rispetto alla funzione di scoring.

Frase da esame:

Precision@K, MAP e nDCG valutano il ranking; query expansion, feedback e hybrid retrieval possono migliorarlo; heap e WAND servono invece a calcolarlo in modo più efficiente.

---

## 17. Come costruire un esempio concreto all’esame

Se il professore chiede un esempio concreto, conviene seguire sempre questo schema:

1. mini-collezione;
    
2. query;
    
3. preprocessing;
    
4. statistiche o indice;
    
5. scoring;
    
6. ranking;
    
7. limite del modello;
    
8. possibile miglioramento.
    

Per BM25 si può usare una mini-collezione di tre documenti:

$$  
D_1=\text{“aircraft wing speed”}  
$$

$$  
D_2=\text{“plane velocity aerodynamics”}  
$$

$$  
D_3=\text{“medical treatment disease”}  
$$

Query:

$$  
q=\text{“aircraft speed”}  
$$

Con BM25, $D_1$ riceverà probabilmente score alto perché contiene entrambi i termini della query. $D_2$ potrebbe ricevere score basso o nullo perché non condivide esattamente i termini, anche se semanticamente è vicino.

Questo mostra il limite del matching lessicale. Un possibile miglioramento è usare dense retrieval: rappresento query e documenti come embedding e calcolo la similarità nello spazio denso. In questo modo $D_2$ può essere recuperato perché “plane” e “velocity” sono semanticamente vicini ad “aircraft” e “speed”.

Poi posso combinare BM25 e dense retrieval in un sistema ibrido.

Frase da esame:

In un esempio concreto mostro prima come il modello produce il ranking, poi evidenzio un limite e infine propongo un miglioramento, per esempio query expansion o hybrid BM25+kNN.

---

## 18. Errori ricorrenti da evitare

Non dire che l’insieme dei candidati contiene termini: contiene documenti.

Non dire che l’indice inverso è una lista di adiacenza: è una struttura che associa termini a posting list di documenti.

Non dire che WAND sostituisce BM25: WAND ottimizza lo scoring BM25.

Non dire che safe pruning garantisce documenti rilevanti per l’utente: garantisce la stessa top-K della funzione di scoring completa.

Non dire che BM25 restituisce una probabilità: restituisce uno score di ranking.

Non dire che BM25 è una somma di logaritmi: questa è più tipica dei Language Model in log-likelihood.

Non dire che il Language Model fa la produttoria sui termini del documento: la fa sui termini della query.

Non dire che le metriche migliorano il ranking: le metriche lo valutano.

Non dire che LSI è syntax-based: è un modello latente basato su SVD e co-occorrenze.

Non dire che dense retrieval è Rocchio: sono tecniche diverse.

Non dire che HITS è PageRank locale: HITS e PageRank sono metodi distinti.

Non dire che in HITS una pagina è solo hub o solo authority: ogni pagina ha entrambi gli score.

Non dire che eliteness è una proprietà assoluta del documento: è relativa a un termine.

Non dire che l’IDF elimina i termini frequenti: ne riduce il peso.

Non dire che $b=1$ significa “nessuna normalizzazione”: $b=1$ significa normalizzazione piena, $b=0$ significa nessuna normalizzazione.

---

## 19. Frase finale di sintesi del corso

Il corso mostra l’evoluzione dei sistemi di Information Retrieval: si parte dai modelli lessicali e vettoriali, come TF-IDF e cosine similarity, si passa ai modelli probabilistici come BIM, BM25 e Language Model, si introducono tecniche per migliorare il ranking come relevance feedback, LSI e dense retrieval, e tecniche per rendere efficiente il recupero come pruning e WAND. La qualità dei sistemi viene poi misurata con metriche come Precision@K, MAP e nDCG. In sintesi, un sistema IR deve bilanciare qualità del ranking, efficienza computazionale e capacità di rappresentare il bisogno informativo dell’utente.