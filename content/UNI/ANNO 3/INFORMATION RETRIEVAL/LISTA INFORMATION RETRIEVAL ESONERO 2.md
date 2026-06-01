##### VALUTAZIONE DEI SISTEMI
[[IR LEZ.6]]
- soggettività utente
- collezione di documenti, insieme di query e giudizi di rilevanza
	- IR end-to-end di valutazione non componenti singole
- Processo Gold Standard
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
	- misure da sole non forniscono un ordine del recupero
- Ranked based measures
	- Rilevanza binaria
		- Precision@K
			- $Precision@K = \frac{\text{relevant nei primi K}}{K}$
		- Average Precision e Mean Average Precision
			- AP=media di tutti i Precision@K per una singola query, scorrendo tutte le posizioni
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
		- $RR = \frac{1}{K}$ dove $K$ è la posizione
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
[[LISTA INFORMATION RETRIEVAL ESONERO 2]]
- Distributional Hypothesis
- tipi di relazioni
	- sintagmatiche, parole nello stesso testo
	- paradigmatiche, scambiate nello stesso contesto significati simili
	- topiche, stesso argomento
- Word Spaces
	- rappresentare parole con spazi vettoriali
	- Matrice di co-occorrenza 
		- `lexicon → [verb:2, available:1, online:1, ...]`
		- parole come vettori sparsi
- Pointwise Mutual Information
	- misura quanto sorprende vedere x,y insieme
	- $PMI(x,y) = \log \frac{P(x,y)}{P(x)P(y)}$
- Latent semantic analysis
	- sotto
##### PROBABILISTIC RETRIEVAL
- utili per definire i contesti
- Evento binario $R_{d,q}$
	- 1 se il documento d è rilevante rispetto alla query q 
	- 0 altrimenti
- Rilevanza probabilistica di un documento con approccio non language model
	- $p(R|d,q)=_{rank}p(d|R,q)$
- Decisione per odds
	- $O(R|d,q)=\frac{p(R|d,q)}{p(\bar R|d,q)}$
	- >1 più rilevante che non =1 uguali <1 più non rilevante
- Probability Ranking Principle minimizza Error cost
- Error Cost Retrieval
	-  $C(d,q)$ Costo se $d$ è rilevante ma non viene restituito (Falso Negativo).
	* $C'(d,q)$ Costo se $d$ non è rilevante ma viene restituito (Falso Positivo).
	- $R(D(q)) = \sum_{d \in D(q)} C'(d,q)p(\bar{R}|d,q) + \sum_{d \notin D(q)} C(d,q)p(R|d,q)$
	- Se assumiamo una Loss  $C = C' = 1$, il rischio è minimo quando restituiamo i $k$ documenti con la più alta probabilità di rilevanza.
- BIM
	- semplice e binario
	- documento $v_{d}= (x_{1},\dots,x_{m})$ con $x_{i} = 1$ se $t_{i} \in d$.
	- query $v_{q} = (y_{1},\dots,y_{m})$ dove $y_{i} = 1$ se $t_{i} \in q$.
	- $O(R|v_d, v_q) = \prod_{i=1}^{M} \frac{p(x_i|R, v_q)}{p(x_i|\bar{R}, v_q)}$
		- per i termini non presenti nella query metto probabilità per R e not R a 1 così si annullano
	- parametrizzazione
		* $p_i=p(x_i=1|R,v_q)$: probabilità che il termine $t_i$ compaia in un documento rilevante per la query $q$
		* $u_i=p(x_i=1|\bar R,v_q)$
			* con giudizi di rilevanza
				* $p_i = \frac{r_i}{R}$
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
		* USATO PER TITOLI E ABSTRACT, non usa term frequency
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
	- Eliteness(termini che rappresentano a pieno quel documento e appaiono molto)
* 2-Poisson Model
	* $p(d_{t_i}=n_i|R,v_q)=p_i \cdot Poisson(n_i|\mu_i)+(1-p_i)\cdot Poisson(n_i|\bar \mu_i)$
	* sfrutta il concetto di Eliteness e distingue termini Elite da non Elite
	* \($p_i$\) è la probabilità che il documento sia elite per il termine;
	- \($\mu_i$\) è la media delle occorrenze nei documenti elite;
	- \($\bar \mu_i$\) è la media delle occorrenze nei documenti non-elite.
	- troppi parametri da dover stimare per ogni termine quindi si usa BM25 con saturazione
* Modello Okapi BM25
	* saturazione e peso IDF
	* $L_{d} = \sum_{t} tf_{td}$
	* $L_{ave} = \frac 1 {|D|} \sum\limits_{d \in D}L_{d}$
	* BM25 con saturazione e bilanciamento
		* $RSV_d = \sum_{t \in q} \log \left( \frac{N}{df_t} \right) \cdot \frac{(k_1 + 1)tf_{td}}{k_1 \left( (1 - b) + b \frac{L_d}{L_{ave}} \right) + tf_{td}}$
		* $b\approx 0,75$ 
			* fattore di normalizzazione b della lunghezza dei documenti
		* k1 basso= saturazione rapida
		* k1 alto= saturazione lenta
		* k1 di solito tra $1.2$ e $2$
			* limita superiormente la term frequency dopo una certa crescita rapida o lenta a seconda del valore di k
		* utilizzato su Lucene, software di information retrieval
	* cosine similarity ritorna un valore compreso tra 0 e 1 mentre BM25 uno score numerico che va a infinito
	* cosine similarity usa TF senza saturazione e normalizza con vettori mentre qui con lunghezze vere e proprie

[[LABORATORIO 3]]
#### LANGUAGE MODEL PER RANKING DI INFORMATION RETRIEVAL
- andiamo a definire la stima basandola su quanto è probabile che la query sia stata generata dal modello generativo di un determinato linguaggio
- $p(q \mid M_d)$
- modello generativo unigram e bag of words
- $𝑀_𝑑 = {𝑝(𝑡 ∣ 𝑀_𝑑) ∶ 𝑡 ∈ 𝑉 }$
- modello multinomiale con query likelihood
	- misuriamo quanto bene il modello del documento spiega la query osservata
	- $p(q \mid M_d)  \propto  \prod_{t:tf_{t,q}>0}  p(t \mid M_d)^{tf_{t,q}}$
	- considera più volte l'apparizione di un certo termine per term frequency
- Maximum likelihood Estimation per stimare la probabilità
	- $\hat{p}(t_i \mid M_d) = \frac{tf_{t_i,d}}{|d|}$
- Smoothing metodi
	- Laplace add-1
		- $p_{Lap}(t \mid d) = \frac{tf_{t,d} + 1}{|d| + |V|}$
		- altera troppo le probabilità
	- collection language model
		- $p(t \mid M_c) = \frac{cf_t}{T}$
	- Jelinek-Mercer
		- $p_{JM}(t \mid d) = \lambda \frac{tf_{t,d}}{|d|} + (1-\lambda)\frac{cf_t}{T}$
		- Se $λ$ è alto, diamo più peso al documento
		- Se $λ$ è basso, diamo più peso alla collezione
			- iper-parametro
		- tutti i documenti hanno stesso parametro
	- Dirichlet 
		- $p_{Dir}(t \mid d) = \lambda_d p(t \mid \hat{M}_d) + (1-\lambda_d)p(t \mid \hat{M}_c)$
		- con
			- $\lambda_d = \frac{|d|}{|d|+\mu}$
		- $\mu$ controlla quanto smoothing viene applicato
		- se $\mu$ aumenta, aumenta il peso della collezione
		- se $\mu$ diminuisce, aumenta il peso del documento
		- $\mu$ è un iper-parametro positivo, scelto/tarato tramite benchmark
- log likelihood con Dirichlet e operazioni algebriche varie otteniamo
	- $\log p_{Dir}(t \mid d) = \log \frac{\mu p(t \mid C)} {|d|+\mu} + \log \left( 1+ \frac{tf_{t,d}} {\mu p(t \mid C)} \right)$
	- definita poi una query andiamo a fare
	- $\log p_{Dir}(q \mid d) = \sum_{k=1}^{n} \log p_{Dir}(w_k \mid d)$
- cerco lo score più piccolo
- BM25 VS Language Models
	- BM25 maggior controllo dei fenomeni e idf esplicita
	- Language model hanno idf non esplicita ma con la collection frequency si ottiene un risultato simile

[[LABORATORIO 3]]
#### OTTIMIZZAZIONE DEI SISTEMI DI RANKING
- ranking safe non safe
- Heap
	- costruzione $O(J)$
	- estrazione primi $K$    $O(KlogJ)$
	- aiuta nella scelta dei migliori $K$ ma il ranking devo farlo comunque per tutti i documenti
- **pruning** 
- $K < |A| \ll N$
	- A insieme di contender
	- dopo aver trovato A si calcola il ranking
- Index Elimination
	- high idf query terms only
		- elimina certamente le stopword
	- docs containing a lot of query terms
		- considero solo i documenti che sono presenti in un certo numero di posting list dei termini della query
- Champion lists
	- migliori $r$ documenti costruita a index time
- Static Quality Scores, per ranking più preciso
	- aggiungiamo autorevolezza
	- $g(d)$
	- $\text{net-score}(q,d) = g(d) + \text{cosine}(q,d)$
	- global champion list per ridurre documenti in fase di ranking
		- $g(d) + tf\text{-}idf_{t,d}$
- Cluster Pruning
	- $\sqrt{N}$ leader con circa $\sqrt{N}$ followers
	- $O(\sqrt{N})$ cosine similarity 
	- non safe ma molto veloce
- Tiered Indexes, non restringe insieme di contender A
	- divide in tier i documenti
	- posso dividere i documenti dei termini in tier con $g(d)$
- impact ordered posting
	- sfrutta weighted term frequency per capire quali sono promettenti
	- $wf_{t,d} = 1 + \log(tf_{t,d})$
	- early termination
		- solo i primi $r$ documenti ordinati per weighted term frequency o in base a una certa soglia del peso
		- non safe
	- ordino e elimino per idf
	- cerco di mantenere comunque buona recall
	- compromesso su quanto pruning fare
- Scoring Wand
	- ordino crescente per docID
	- finger locale
	- $UB_t = \max score_t(d)$ 
	- threshold globale
	- pivoting globale
	- è safe perchè analizza la massima somma possibile degli score
	- riduce costo computazionale del 90% ed è ottima
#### RELEVANCE FEEDBACK E QUERY EXPANSION
- $Precision = \frac{\# \text{documenti rilevanti recuperati}}{\# \text{documenti recuperati}}$
- $Recall = \frac{\# \text{documenti rilevanti recuperati}}{\# \text{documenti rilevanti}}$
- $F_1 = \frac{2PR}{P + R}$
- non sono sufficienti causa
	- synonymy
- ad hoc retrieval, niente feedback
- metodi locali 
	- relevance feedback
		- query reformulation
	- centroide
		- funzionano solo con vector space model
		- vettore medio di un insieme di documenti
		- $\vec{\mu}(D) = \frac{1}{|D|} \sum_{d \in D} \vec{v}(d)$
	- query ottima
		- assumiamo di conoscere $C_r$ e $C_{nr}$
		- con cosine similarity avremmo
		- $\vec{q}_{opt} = \frac{1}{|C_r|} \sum_{\vec{d}_j \in C_r} \vec{d}_j - \frac{1}{|C_{nr}|} \sum_{\vec{d}_j \in C_{nr}} \vec{d}_j$
		- centroide dei documenti rilevanti - quelli non rilevanti
	- rocchio algorithm
		- $\vec{q}_m = \alpha \vec{q}_0 + \beta \frac{1}{|D_r|} \sum_{\vec{d}_j \in D_r} \vec{d}_j - \gamma \frac{1}{|D_{nr}|} \sum_{\vec{d}_j \in D_{nr}} \vec{d}$
		- $\alpha$: quanto peso dare alla query iniziale
		- $\beta$: quanto peso dare ai documenti rilevanti
		- $\gamma$: quanto peso dare ai documenti non rilevanti
		- si basa sul giudizio dell'utente
	- pseudo-relevance feedback
		- assumo i primi $k$ documenti come rilevanti e applico relevance su di essi
		- query drift
- metodi globali
	- non si basa su una serie di documenti già recuperati
	- Global query expansion
	- migliora recall riduce precision
	- manual thesaurus 
	- automatic thesaurus
	- SVD e LSI utili per query expansion
#### LATENT SEMANTIC INDEXING
[[UNI/ANNO 3/INFORMATION RETRIEVAL/LABORATORI/LABORATORIO 4|LABORATORIO 4]]
- SVD(Singular Value Decomposition)
	- matrice di low rank di solito k è 100-1000
	- $A_k = U \, \mathrm{diag}(\sigma_1, \dots, \sigma_k, 0, \dots, 0)V^T$
	- $A_k = \sum_{i=1}^{k} \sigma_i u_i v_i^T$
	- $U$ righe, $\sigma$ valori singolari, $V$ colonne se trasposta
	- Frobenius
		- $∥A−Ak​∥_F​$
	- SVD tecnica di decomposizione con minimo errore possibile
- LSI
	- tecnica che sfrutta SVD per rappresentare termini e documenti
	- spazio semantico latente
		- $A = (U\Sigma^{1/2})(\Sigma^{1/2}V^T)$
	- documenti e termini
		- $T_k=U_k\Sigma_k^{1/2}$
		- $D_k=\Sigma_k^{1/2}V_k^T$
	- query dentro LSI(folding-in)
		- $q_k = \Sigma_k^{-1} U_k^T$ 
	- query expansion
		- LSI aiuta soprattutto con la **sinonimia**, perché termini diversi ma usati in contesti simili vengono proiettati vicino nello spazio latente
	- sinonimia
	- polisemia
	- no boolean query
	- formula di energia
		- $\frac{\sum_{i=1}^{k}\sigma_i^2}{\sum_i \sigma_i^2}$
	- ranking si può fare ad esempio con cosine similarity nello spazio latente
#### LINK ANALYSIS
- Good/Bad/Unknowns
- Hyperlink con Anchor text
- Connectivity Servers
	- url -> outlinks
	- url -> inlinks
- Liste di adiacenza 
	- ogni url è un intero, e ha una lista degli outlink e inlinks
	- 64 bit per ogni hyperlink
- Boldi and Vigna
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
				- $x_{\text{next}} = xP^i$
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
