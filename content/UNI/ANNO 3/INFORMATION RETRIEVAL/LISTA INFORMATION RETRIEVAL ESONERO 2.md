Una **matrice densa** è una matrice in cui **la maggior parte delle celle contiene valori diversi da 0**.
Una **matrice sparsa**, invece, è una matrice in cui **la maggior parte delle celle vale 0**.
##### VALUTAZIONE DEI SISTEMI
- soggettività utente
- collezione di documenti, insieme di query e giudizi di rilevanza
	- IR end-to-end di valutazione non componenti singole
- Processo Gold Standard ground truth
	- costruisce il dataset
		- 1. query rappresentative
		- 2. documenti candidati da IR base, alta recall
		- 3. annotazione umana rilevante/non rilevante
- precision recall F-measure error rate
	- $P = \frac{TP}{TP + FP}$
	- $R = \frac{TP}{TP + FN}$
	- $accuracy = \frac{TP + TN}{TP + FP + FN + TN}$
	- $error = 1 - accuracy$
	- $F1 = \frac{2PR}{P + R}$
	- misure da sole non forniscono un ordine del recupero sono globali
- Ranked based measures
	- Rilevanza binaria
		- Precision@K
			- $Precision@K = \frac{\text{relevant nei primi K}}{K}$
		- Average Precision e Mean Average Precision
			- AP=media di tutti i Precision@K per una singola query, scorrendo solo tutte le posizioni dove un documento è rilevante
			- $MAP = \frac{1}{|Q|} \sum_{q \in Q} AP(q)$ per più query
	- Più livelli di rilevanza
		- Discount Cumulative Gain
			- Gain $r_i$ del singolo documento
			- Discount $\frac{1}{\log_2(i)}$ valore in base alla posizione
			- $CG = r_1+r_2+..r_n$ di un range di documenti
			- $DCG_p = rel_1 + \sum_{i=2}^{p} \frac{rel_i}{\log_2 i}$
			- difficile da confrontare con query diverse
		- Normalized Discount Cumulative Gain
			- confronto con ranking ideale
			- $NDCG = \frac{DCG}{IDCG}$
- Not Ranking based measures
	- Reciprocal Rank
		- $RR = \frac{1}{K}$ dove $K$ è la posizione del primo documento rilevante
	- Mean Reciprocal Rank(MRR)
		- $MRR = \frac{1}{|Q|} \sum_{q \in Q} \frac{1}{rank_q}$
- User Behavior
	- Click Position Bias 
	- Pairwise valuation
		- Doc A vs Doc B
	- ranking interleaved
		- merge tra 2 ranking alternati
	- A/B Testing
		- divido utenti in 2 gruppi
##### DISTRIBUTIONAL LEXICAL SEMANTICS
- Distributional Hypothesis
	- parole con significati simili tendono ad apparire in contesti simili
- tipi di relazioni
	- sintagmatiche, parole nello stesso testo window based
	- paradigmatiche, scambiate nello stesso contesto ottenendo significati simili
	- topiche, stesso argomento
- Word Spaces
	- rappresentare parole con spazi vettoriali
	- Matrice di co-occorrenza 
		- `lexicon → [verb:2, available:1, online:1, ...]`
		- parole come vettori sparsi con tanti zeri
- Pointwise Mutual Information
	- misura quanto sorprende vedere x,y insieme
	- $PMI(x,y) = \log \frac{P(x,y)}{P(x)P(y)}$
- Latent semantic analysis
	- idea alla base che prevede rappresentazione in uno spazio latente che indirettamente costruiscono relazioni topiche tra documenti o termini
	- es: uso di LSI con SVD
##### PROBABILISTIC RETRIEVAL
- utili per definire i contesti in cui il termine si trova e definire se quel determinato termine si trovi più in documenti rilevanti o non rilevanti
- Evento binario $R_{d,q}$
	- 1 se il documento d è rilevante rispetto alla query q 
	- 0 altrimenti
- Rilevanza probabilistica di un documento con approccio non language model
	- $p(R|d,q)=_{rank}p(d|R,q)$
	- probabilità che la variabile di rilevanza R sia vera, dato il documento d e la query q
- Probability Ranking Principle 
	- ranking ottimale si basa sull'ordinamento decrescente delle probabilità 
	- ci sia costo di errore uniforme
	- con probabilità dei documenti rilevanti indipendenti
- Error Cost Retrieval
	- giustifica il PRP calcolando il rischio atteso
	-  $C(d,q)$ Costo se $d$ è rilevante ma non viene restituito (Falso Negativo).
	* $C'(d,q)$ Costo se $d$ non è rilevante ma viene restituito (Falso Positivo).
	- $R(D(q)) = \sum_{d \in D(q)} C'(d,q)p(\bar{R}|d,q) + \sum_{d \notin D(q)} C(d,q)p(R|d,q)$
	- Se assumiamo una Loss  $C = C' = 1$, il rischio è minimo quando restituiamo i $k$ documenti con la più alta probabilità di rilevanza.
- BIM
	- semplice e binario
	- documento $v_{d}= (x_{1},\dots,x_{m})$ con $x_{i} = 1$ se $t_{i} \in d$.
	- query $v_{q} = (y_{1},\dots,y_{m})$ dove $y_{i} = 1$ se $t_{i} \in q$.
	- rappresentare un documento data la query
	- $O(R|v_d,v_q)=\frac{p(R|v_d,v_q)}{p(\bar R|v_d,v_q)}$
		- >1 più rilevante che non =1 uguali <1 più non rilevante
		- per i termini non presenti nella query metto probabilità per R e not R a 1 così si annullano
	- parametrizzazione per stimare le probabilità effettive
		* $p_i=p(x_i=1|R,v_q)$: probabilità che il termine $t_i$ compaia in un documento rilevante per la query $q$
		* $u_i=p(x_i=1|\bar R,v_q)$
			* con giudizi di rilevanza
				* $p_i = \frac{r_i}{R}$
				* $r_i$ numero di documenti rilevanti per il termine $i$ 
				* $u_i = \frac{df_i - r_i}{N - R}$
			* senza giudizi di rilevanza
				* $p_i = 0.5$
				* $u_i \approx \frac{df_i}{N}$
		* contributo di un termine della query con log odds ratio
			* $c_i = \log \frac{p_i(1-u_i)}{u_i(1-p_i)}$
			* >0 più documenti rilevanti =0 non si distinguono rilevanti da non rilevanti <0 il termine è più in documenti non rilevanti
		* retrieval status value, punteggio finale del singolo documento
		* con giudizi di rilevanza 
			* $RSV_d = \sum_{i:x_i=y_i=1} c_i$
		* senza giudizi di rilevanza e $p_i=0.5$
			* $RSV_d \approx \sum_{i:x_i=y_i=1} \log \frac{N}{df_i}$
		* USATO PER TITOLI E ABSTRACT, non usa term frequency o inverse document frequency direttamente
		* però senza giudizi di rilevanza indirettamente otteniamo un tipo di IDF
* modelli con term frequency
* Poisson Model
	* $d_{t_i}=n_i$
	* $Poisson(x|\lambda)=\frac{e^{-\lambda}\lambda^x}{x!}$ distribuzione che indica quanto è raro un evento
		* \($x$\) è il numero di occorrenze osservate;
		- \($\lambda$\) è il numero medio atteso di occorrenze.
	* $\lambda \approx \frac{CF_{t_j}}{N}$
	* $RSV_d=\sum_{t_i:y_i=1} n_i \log \frac{\rho_i}{\gamma_i}$
		- \($n_i$\) è il numero di occorrenze del termine \($t_i$\) nel documento;
		- \($\rho_i$\) è la frequenza media attesa nei documenti rilevanti;
		- \($\gamma_i$\) è la frequenza media attesa nella collezione generale.
		- linearità del contributo di un termine
- Per un dato termine, un documento può essere elite se il termine è contentful in quel documento, oppure non-elite se il termine è contentless
* 2-Poisson Model
	* $p(d_{t_i}=n_i|R,v_q)=p_i \cdot Poisson(n_i|\mu_i)+(1-p_i)\cdot Poisson(n_i|\bar \mu_i)$
	* sfrutta il concetto di Eliteness e distingue termini Elite da non Elite
	* \($p_i$\) è la probabilità che il documento sia elite per il termine;
	- \($\mu_i$\) è la media delle occorrenze nei documenti elite;
	- \($\bar \mu_i$\) è la media delle occorrenze nei documenti non-elite.
	- troppi parametri da dover stimare per ogni termine quindi si usa BM25 con saturazione 
* Modello Okapi BM25
	* modello usato tutt'oggi ad esempio con Lucene, considerato come uno dei più efficaci
	* difetti: problemi di sinonimia ed è di tipo bagofwords risolvi sinonimia con kNN facendo versione ibrida
	* saturazione e peso IDF
	* $L_{d} = \sum_{t} tf_{td}$
	* $L_{ave} = \frac 1 {|D|} \sum\limits_{d \in D}L_{d}$
	* BM25 con saturazione e bilanciamento
		* $RSV_d = \sum_{t \in q}  IDF(t) \cdot \frac{(k_1 + 1)tf_{td}}{k_1  B + tf_{td}}$
		* IDF che può essere
			* $log(1 + (N - df[t] + 0.5) / (df[t] + 0.5))$
			* oppure $\log \left( \frac{N}{df_t} \right)$
		* $B = (1-b)+b\frac{|d|}{avgdl}$
		* $b\approx 0,75$ 
			* fattore di normalizzazione b della lunghezza dei documenti
		* k1 basso= saturazione rapida
		* k1 alto= saturazione lenta
		* k1 di solito tra $1.2$ e $2$
			* limita superiormente la term frequency dopo una certa crescita rapida o lenta a seconda del valore di k
		* b=1 normalizzazione totale 0 altrimenti
		* utilizzato su Lucene, software di information retrieval
	* cosine similarity ritorna un valore compreso tra 0 e 1 se usata con TF-IDF mentre BM25 uno score numerico che va a infinito
	* cosine similarity usa TF senza saturazione e normalizza con vettori mentre qui con lunghezze vere e proprie
	* saturare la term frequency della query usando $k_3$
		* $\frac{(k_3+1)tf_{tq}}{k_3 + tf_{tq}}$

```scss
BM25(D,q,k1,b,top_k):
1. preprocessing
   for d in D:
	   preprocessing(d) e creo un vocabolario dei termini V
2. calcolo statistiche utili
   N=|D|
   avg_len=$L_{ave} = \frac 1 {|D|} \sum\limits_{d \in D}L_{d}$
   tf[t,d]= term frequency di t in d
   df[t]=document frequency di t in C
   idf[t]= log(N/df[t])
3. costruisco un inverted index con posting list e term frequency e altre informazioni aggiuntive
4. query processing 
   applico preprocessing alla query senza togliere le ripetizioni quindi calcolo 
	   tf(t,q)
5. estraggo i candidati
   for t in q and t in V:
	   for d in posting(t)
		  cand.add(d)
6. calcolo score con BM25
   for d in C
	   score[d]=0
	   for t in Q:
			if tf[t,d]=0 continue
			else
			B=(1-b)+b*len(d)/avg_len
			score[d]=score[d]+IDF[t]*((k1+1)*tf[t,d])/tf[t,d]+k1*B)
7. estraggo i top-k documenti dalla lista, potrei usare una struttura ad heap nel codice per migliorarlo e ridurre i costi e potrei aggiungere una query reformulation con pseudo relevance feedback(per semplicità userei quella ma solo se so che il sistema già restituisce risultati buoni altrimenti rischierei query drift)
8. ipotetico benchmark con gold standard e NDCG O PRECISION@K
```

#### LANGUAGE MODEL PER RANKING DI INFORMATION RETRIEVAL
- andiamo a definire la stima basandola su quanto è probabile che la query sia stata generata dal modello generativo di un determinato linguaggio
- $p(q \mid M_d)$
	- modello generativo unigram e bag of words
- $𝑀_𝑑 = {𝑝(𝑡 ∣ 𝑀_𝑑) ∶ 𝑡 ∈ 𝑉 }$
- modello multinomiale con query likelihood
	- misuriamo quanto bene il modello del documento spiega la query osservata
	- $p(q \mid M_d)  \propto  \prod_{t:tf_{t,q}>0}  p(t \mid M_d)^{tf_{t,q}}$
	- considera più volte l'apparizione di un certo termine per term frequency grazie al modello multinomiale
- Maximum likelihood Estimation per stimare la probabilità che un termine sia spiegato da $M_d$
	- $\hat{p}(t_i \mid M_d) = \frac{tf_{t_i,d}}{|d|}$
- Smoothing metodi
	- Laplace add-1
		- $p_{Lap}(t \mid d) = \frac{tf_{t,d} + 1}{|d| + |V|}$
		- altera troppo le probabilità
	- collection language model
		- aggiunge un modello linguistico dell'intera collezione 
		- $p(t \mid M_c) = \frac{cf_t}{T}$
	- Jelinek-Mercer
		- $p_{JM}(t \mid d) = \lambda \frac{tf_{t,d}}{|d|} + (1-\lambda)\frac{cf_t}{T}$
		- Se $λ$ è alto, diamo più peso al documento
		- Se $λ$ è basso, diamo più peso alla collezione
			- iper-parametro
		- tutti i documenti hanno stesso parametro
	- Dirichlet 
		- $p_{Dir}(t|d)= \frac{tf_{t,d}+\mu p(t|M_c)} {|d|+\mu}$
		- che poi diventa
			- $p_{Dir}(t \mid d) = \lambda_d p(t \mid \hat{M}_d) + (1-\lambda_d)p(t \mid \hat{M}_c)$
		- con
			- $\lambda_d = \frac{|d|}{|d|+\mu}$
		- $\mu$ controlla quanto peso dare alla probabilità di background del collection language model
		- se $\mu$ aumenta, aumenta il peso della collezione
		- se $\mu$ diminuisce, aumenta il peso del documento
		- $\mu$ è un iper-parametro positivo, scelto/tarato tramite benchmark
- log likelihood con Dirichlet e operazioni algebriche varie otteniamo
	- definita poi una query andiamo a fare
	- $\log p_{Dir}(q \mid d) = \sum_{k=1}^{n} \log p_{Dir}(w_k \mid d)$
	- il log serve per evitare underflow numerico e trasformare i prodotti in somme
	- produce score negativi poichè la probabilità è compresa tra 0 e 1 quindi cerco il valore più vicino allo 0 negativo
- BM25 VS Language Models
	- BM25 maggior controllo dei fenomeni con i parametri k1 e b e idf esplicita
	- Language model hanno idf non esplicita ma con il collection language model si ottiene un risultato simile
		- poco controllo solo con $\mu$ che regola lo smoothing verso la collezione
```scss
1. preprocessing
   for d in D:
	   preprocessing(d) e creo un vocabolario dei termini V
2. calcolo statistiche utili
   N=|D|
   tf[t,d]= term frequency di t in d
   cf[t]= somma di tutte le term frequency di quel termine per tutti i documenti
   coll_length=dimensione per token della collezione
3. costruisco un inverted index con posting list e term frequency e altre informazioni aggiuntive
4. definisco il collection language model
   for t in V:
	   p(t|C)=cf[t]/coll_length
5. calcolo dirichlet 
   for t in V:
	   for d in posting(t)
			  p(t|d)=(tf[t,d]+mu p(t|C))/(len(d)+mu)
6. query processing 
   applico preprocessing alla query senza togliere le ripetizioni quindi calcolo 
	   tf(t,q)
7. estraggo i candidati
   for t in q and t in V:
	   for d in posting(t)
		  cand.add(d)
8. calcolo lo score con query likelihood e sfruttando dirichlet calcolato 
   score(d,q)=\sum_{k=1}^{n} tf[t,q] *\log p_{Dir}(w_k \mid d) 
9. estraggo i top-k documenti dalla lista, potrei usare una struttura ad heap nel codice per migliorarlo e ridurre i costi e potrei aggiungere una query reformulation con pseudo relevance feedback(per semplicità userei quella ma solo se so che il sistema già restituisce risultati buoni altrimenti rischierei query drift)
10. ipotetico benchmark con gold standard e NDCG O PRECISION@K
```

[[LABORATORIO 3]]
#### OTTIMIZZAZIONE DEI SISTEMI DI RANKING
- si vuole ottimizzare la fase di calcolo della rilevanza dei documenti e la fase di ordinamento e selezione dei documenti
- ranking safe non safe
- Heap
	- costruzione $O(J)$
	- estrazione primi $K$    $O(KlogJ)$
	- aiuta nella scelta dei migliori $K$ ma il ranking devo farlo comunque per tutti i documenti
- **pruning** 
- ha come obiettivo quello di eliminare preventivamente i documenti che ipoteticamente non sono destinati alla top $K$
- $K < |A| \ll N$
	- A insieme di contender
	- dopo aver trovato A si calcola il ranking
- Index Elimination
	- high idf query terms only
		- elimina i termini della query che hanno idf basso
		- elimina certamente le stopword
	- docs containing a lot of query terms
		- considero solo i documenti che sono presenti in un certo numero di posting list dei termini della query es: 3 su 4
		- soft AND
- Champion lists
	- migliori $r$ documenti costruita a index time per ogni termine $t$ 
- Static Quality Scores, per ranking più preciso
	- aggiungiamo autorevolezza
	- $g(d)$
	- $\text{net-score}(q,d) = g(d) + \text{cosine}(q,d)$
	- global champion list per ridurre documenti in fase di ranking
		- creo liste di documenti autorevoli per ogni termine
		- $g(d) + tf\text{-}idf_{t,d}$
- Cluster Pruning
	- $\sqrt{N}$ leader e circa $\sqrt{N}$ followers
	- cerco il leader più vicino alla query nello spazio vettoriale oppure random sampling scegliendo casualmente quali leader prendere
	- il random sampling andrà a prendere più leader dove ci sono più documenti
	- calcolo poi ad esempio $O(\sqrt{N})$ cosine similarity 
	- non safe ma molto veloce
- Tiered Indexes, non restringe insieme di contender A
	- divide in tier i documenti
	- posso dividere i documenti dei termini in tier con $g(d)$
- impact ordered posting
	- sfrutta weighted term frequency per capire quali sono promettenti
	- ordino posting list per $wf_{t,d} = 1 + \log(tf_{t,d})$
	- early termination
		- solo i primi $r$ documenti o in base a una certa soglia del peso
		- non safe
		- term at a time
	- ordino e elimino per idf
	- cerco di mantenere comunque buona recall
	- compromesso su quanto pruning fare
- Scoring Wand
	- ordino crescente per docID ad ogni iterazione
	- finger locale
	- $UB_t = \max score_t(d)$  globale
	- threshold globale
	- pivoting globale
	- è safe perchè analizza la massima somma possibile degli score
	- riduce costo computazionale del 90% ed è ottima
#### RELEVANCE FEEDBACK E QUERY EXPANSION
- si vuole migliorare la recall poiché la query originale potrebbe presentare
	- synonymy, ovvero termini simili nei documenti non vengono presi perchè diversi
- ad hoc retrieval, niente feedback
- metodi locali 
	- relevance feedback
		- aggiunge termini alla query originale basandosi sul feedback dell'utente del primo risultato restituito
		- query reformulation
			- prendo due assunzioni
				- la query iniziale è abbastanza vicina all'information need, altrimenti query drift
				- i documenti rilevanti sono abbastanza coerenti tra loro, cioè formano un gruppo riconoscibile nello spazio vettoriale
	- centroide
		- funzionano solo con vector space model
		- rappresenta il vettore medio di un insieme di documenti
		- $\vec{\mu}(D) = \frac{1}{|D|} \sum_{d \in D} \vec{v}(d)$
	- query ottima
		- assumiamo di conoscere $C_r$ e $C_{nr}$
		- $C_r$: l’insieme di **tutti** i documenti rilevanti nella collezione
		- $C_{nr}$​: l’insieme di **tutti** i documenti non rilevanti nella collezione
		- con cosine similarity avremmo
		- $\vec{q}_{opt} = \frac{1}{|C_r|} \sum_{\vec{d}_j \in C_r} \vec{d}_j - \frac{1}{|C_{nr}|} \sum_{\vec{d}_j \in C_{nr}} \vec{d}_j$
		- centroide dei documenti rilevanti - quelli non rilevanti
		- non conosciamo in anticipo i rilevanti e i non rilevanti della collezione
	- rocchio algorithm
		- approssima la query ottima su base dei feedback dell'utente
		- $\vec{q}_m = \alpha \vec{q}_0 + \beta \frac{1}{|D_r|} \sum_{\vec{d}_j \in D_r} \vec{d}_j - \gamma \frac{1}{|D_{nr}|} \sum_{\vec{d}_j \in D_{nr}} \vec{d}$
		- $\alpha$: quanto peso dare alla query iniziale
		- $\beta$: quanto peso dare ai documenti rilevanti per l'utente
		- $\gamma$: quanto peso dare ai documenti non rilevanti per l'utente
		- si basa sul giudizio dell'utente
		- $\alpha = 1, \qquad \beta = 0.75, \qquad \gamma = 0.15$
	- pseudo-relevance feedback
		- assumo i primi $k$ documenti come rilevanti e applico relevance feedback su di essi
		- query drift
- metodi globali
	- non si basa su una serie di documenti già recuperati
	- Global query expansion
	- migliora recall riduce precision
	- manual thesaurus 
	- automatic thesaurus
	- SVD e LSI utili per query expansion con uno spazio latente posso avere co occorrenze topiche
#### LATENT SEMANTIC INDEXING
[[UNI/ANNO 3/INFORMATION RETRIEVAL/LABORATORI/LABORATORIO 4|LABORATORIO 4]]
- A è una matrice mxn termini documento
- SVD(Singular Value Decomposition)
	- tecnica che ci permette di fattorizzare la matrice in
	- $A = U \Sigma V^T$
	- $U$ righe($m \times m$), $\Sigma$ valori singolari($m \times n$), $V^T$ colonne($n \times n$)
	- matrice di low rank approximation di solito k è 100-1000
		- $A_k = U_k\Sigma_k V_k^T$
		- riduce il rango delle matrici rispettivamente diventeranno
		- $m \times k$ poi  $k \times k$ poi  $k \times n$
		- $A_k = \sum_{i=1}^{k} \sigma_i u_i v_i^T$
	- norma di Frobenius
		- differenza tra matrice originale e matrice low rank
		- dimostra che l'approssimazione low rank è la migliore possibile
		- $∥A−Ak​∥_F​$
	- SVD tecnica di decomposizione con minimo errore possibile
- LSI
	- tecnica che sfrutta SVD per rappresentare termini e documenti
	- spazio semantico latente con dimensionalità ridotta grazie alle approssimazioni
		- $A = (U\Sigma^{1/2})(\Sigma^{1/2}V^T)$
	- documenti e termini
		- $T_k=U_k\Sigma_k^{1/2}$
		- $D_k=\Sigma_k^{1/2}V_k^T$
	- query dentro LSI(folding-in)
		- $q_k=q^T U_k\Sigma_k^{-1}$
	- query expansion
		- LSI aiuta soprattutto con la **sinonimia**, perché termini diversi ma usati in contesti simili vengono proiettati vicino nello spazio latente
	- sinonimia
	- polisemia
	- no boolean query
	- formula di energia
		- $\frac{\sum_{i=1}^{k}\sigma_i^2}{\sum_i \sigma_i^2}$
	- ranking si può fare ad esempio con cosine similarity nello spazio latente
```scss
LSI_RANKING(D,q,k,top_k):
1. costruisco una matrice A=mxn termini documenti
2. chiamo la funzione SVD(A) che mi restituisce U,Σ,V^T
3. applico una approssimazione di low rank prendendo k
   U_k=prime k colonne di U
   Σ_k=primi k valori di Σ
   V_k^T=primi k valori di V^T
   lista_documenti=Σ_k*V_k^T
4. preprocessing della query
   preprocessing(q)
   q_v= vettore con le tf-idf della query
   q_k=q^T*U_k*Σ_k^-1 effettuo folding in della query
   for dj in lista_documenti
	   scorej= qk*dj/||qk||*||dj||
5. estraggo i top-k documenti dalla lista, potrei usare una struttura ad heap nel codice per migliorarlo e ridurre i costi
   
```
#### LINK ANALYSIS
- andiamo a fare un recupero non solo basato sui contenuti testuali dei documenti ma anche in base ai collegamenti tra di essi
- Good/Bad/Unknowns
	- definisce la reputazione di un nodo
	- se un nodo buono punta a un nodo cattivo allora potrebbe diventare cattivo
	- se un nodo buono punta a un nodo sconosciuto questo diventa buono o cattivo nel caso sia puntato da un nodo cattivo
- Hyperlink con Anchor text
	- hyperlink sono composti da Anchor text li sfrutto per dare informazioni aggiuntive a documenti o pagine
	- il peso con cui viene messo questo anchor text può dipendere dall'autorevolezza delle pagine
- Web come un grafo diretto
	- hyperlink 
	- `url -> outlinks`
	- `url <- inlinks`
- Liste di adiacenza 
	- ogni `url` è un intero, e ha una lista degli `outlink` e `inlinks`
	- 64 bit per ogni hyperlink
- `Boldi and Vigna`
	- 7 URL
	- la lista successiva di URL si scrive come differenza della precedente
	- Gap Encoding e gamma code
	- $1+2\lfloor logx \rfloor$ occupazione media
- Page Ranking
	- non si limita a contare e basta gli inlink e outlink
	- Globale
		- algoritmo random surfer
			- 4 link uscenti da una pagina avremmo $\frac{1}{4}$
			- teleporting per risolvere dead-end e loop
			- calcolo del visit rate
				- catene di Markov come processo che vede una matrice di transizione con le varie probabilità di visitare un elemento seguito da un altro
				- $\sum_{j=1}^{n} P_{ij}= 1$ ogni riga
				- $x_{\text{next}} = xP$
			- ergodicità della catena di markov
				- grazie al teleporting possiamo dire con certezza che dopo un certo numero di iterazioni abbiamo visitato tutte le pagine e il valore della catena di markov non cambia
				- $a = aP$ $a$ è autovettore associato all'autovalore 1 rappresenta il non cambiamento della distribuzione probabilistica
	- Locale
		- HITS
			- *root set* pagine recuperate da una query
			- *base set* si calcolano hub score e authority score dal root set
			- hub e authority
				- $h(x) \leftarrow \sum_{x \to y} a(y)$
				- $a(x) \leftarrow \sum_{y \to x} h(y)$
			- uso matrici di adiacenza per capire se HITS converge a una soluzione stabile
				- $A_{ij}=1$ se i ha un link verso j 0 altrimenti
				- quindi h e a sono definiti come
				- $h=Aa$
				- $a = A^Th$
			- sono uno legato alla formula dell'altra quindi dopo diverse iterazioni avrò una buona stima che converge
			- di solito circa 5
			- $a = A^T A a$
			- $h = AA^Th$
		- topic drift cambiando topic
###### SISTEMI IBRIDI
norma dello score
	$score_{norm}(d)= \frac{score(d)-min}{max-min}$
$hybrid(d)= BM25_{norm}(d)^\alpha \cdot kNN_{norm}(d)^{1-\alpha}$