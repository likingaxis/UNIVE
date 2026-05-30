##### VALUTAZIONE DEI SISTEMI
[[IR LEZ.6]]
- Processo Gold Standard
- precision recall F-measure error rate
	- $P = \frac{TP}{TP + FP}$
	- $R = \frac{TP}{TP + FN}$
	- $accuracy = \frac{TP + TN}{TP + FP + FN + TN}$
	- $error = 1 - accuracy$
	- $F1 = \frac{2PR}{P + R}$
- Ranked based measures
	- Rilevanza binaria
		- Precision@K
			- $Precision@K = \frac{\text{relevant nei primi K}}{K}$
		- Average Precision e Mean Average Precision
			- AP=media di tutti i Precision@K per una singola query
			- $MAP = \frac{1}{|Q|} \sum_{q \in Q} AP(q)$ per più query
	- Più livelli di rilevanza
		- Discount Cumulative Gain
			- Gain $r_i$ 
			- Discount $\frac{1}{\log_2(i)}$
			- $CG = r_1+r_2+..r_n$
			- $DCG_p = rel_1 + \sum_{i=2}^{p} \frac{rel_i}{\log_2 i}$
		- Normalized Discount Cumulative Gain
			- confronto con ranking ideale
			- $NDCG = \frac{DCG}{IDCG}$
- Not Ranking based measures
	- Reciprocal Rank
		- $RR = \frac{1}{K}$
	- Mean Reciprocal Rank(MRR)
		- $MRR = \frac{1}{|Q|} \sum_{q \in Q} \frac{1}{rank_q}$
- User Behavior
	- Click Position Bias
	- Pairwise valuation
	- ranking interleaved
	- A/B Testing
##### DISTRIBUTIONAL LEXICAL SEMANTICS
[[LISTA INFORMATION RETRIEVAL ESONERO 2]]
- Distributional Hypothesis
- tipi di relazione
	- sintagmattiche
	- paradigmatiche
	- topiche
- Word Spaces
	- Matrice di co-occorrenza 
		- `lexicon → [verb:2, available:1, online:1, ...]`
- Pointwise Mutual Information
	- $P(x)P(y)PMI(x,y) = \log \frac{P(x,y)}{P(x)P(y)}$
- Latent semantic analysis
	- sotto
##### PROBABILISTIC RETRIEVAL
- Evento binario $R_{d,q}$
	- 1 se il documento d è rilevante rispetto alla query q 0 altrimenti
- Rilevanza probabilistica di un documento
	- $p(R|d,q)=\sum_{u \in U} p(R|d,q,u)p(u)$
	- $p(R|d,q)=\frac{p(d|R,q)p(R|q)}{p(d|q)}$
- Decisione per odds
	- $O(R|d,q)=\frac{p(R|d,q)}{p(\bar R|d,q)}$
	- >1 più rilevante che non =1 uguali <1 più non rilevante
- Probability Ranking Principle minimizza Error cost
- Error Cost Retrieval
	-  $C(d,q)$ Costo se $d$ è rilevante ma non viene restituito (Falso Negativo).
	* $C'(d,q)$ Costo se $d$ non è rilevante ma viene restituito (Falso Positivo).
	- $R(D(q)) = \sum_{d \in D(q)} C'(d,q)p(\bar{R}|d,q) + \sum_{d \notin D(q)} C(d,q)p(R|d,q)$
- BIM
	- documento $v_{d}= (x_{1},\dots,x_{m})$ con $x_{i} = 1$ se $t_{i} \in d$.
	- query $v_{q} = (y_{1},\dots,y_{m})$ dove $y_{i} = 1$ se $t_{i} \in q$.
	- $O(R|v_d, v_q) = \prod_{i=1}^{M} \frac{p(x_i|R, v_q)}{p(x_i|\bar{R}, v_q)}$
		- per i termini non presenti nella query metto probabilità per R e not R a 1 così si annullano
	- parametrizzazione
		* $p_{t} = p(x_{t}=1|R,v_{q})$ : probabilità che il termine $t_i$ compaia in un documento rilevante per la query $q$
			* con giudizi di rilevanza
				* $p_i = \frac{r_i}{R}$
				* $u_i = \frac{df_i - r_i}{N - R}$
			* senza giudizi di rilevanza
				* $p_i = 0.5$
				* $u_i \approx \frac{df_i}{N}$
		* $u_{t} = p(x_{t} = 1| \bar{R},v_{q})$ : probabilità che il termine $t_i$ compaia in un documento non rilevante per la query $q$
		* $c_i = \log \frac{p_i(1-u_i)}{u_i(1-p_i)}$
		* con giudizi di rilevanza 
			* $RSV_d = \sum_{i:x_i=y_i=1} c_i$
		* senza giudizi di rilevanza e pi=0.5
			* $RSV_d \approx \sum_{i:x_i=y_i=1} \log \frac{N}{df_i}$
		* USATO PER TITOLI E ABSTRACT
* Poisson Model
	* $d_{t_i}=n_i$
	* $Poisson(x|\lambda)=\frac{e^{-\lambda}\lambda^x}{x!}$
	* $\lambda \approx \frac{CF_j}{N}$
	* $RSV_d=\sum_{t_i:y_i=1} n_i \log \frac{\rho_i}{\gamma_i}$
* 2-Poisson Model
	* $p(d_{t_i}=n_i|R,v_q)=p_i \cdot Poisson(n_i|\mu_i)+(1-p_i)\cdot Poisson(n_i|\bar \mu_i)$
* Modello BM25
	* saturazione e peso IDF
	* $RSV_d = \sum_{t \in q} \frac{(k_1 + 1)tf_{td}}{k_1 + tf_{td}} \log \frac{N}{df_t}$
		* k1 basso= saturazione rapida
		* k1 alto= saturazione lenta
	* BM25 con saturazione e bilanciamento
		* $RSV_d = \sum_{t \in q} \log \left( \frac{N}{df_t} \right) \cdot \frac{(k_1 + 1)tf_{td}}{k_1 \left( (1 - b) + b \frac{L_d}{L_{ave}} \right) + tf_{td}}$
[[LABORATORIO 3]]
#### LANGUAGE MODEL PER RANKING DI INFORMATION RETRIEVAL
- $p(q \mid M_d)$
- $𝑀_𝑑 = {𝑝(𝑡 ∣ 𝑀_𝑑) ∶ 𝑡 ∈ 𝑉 }$
	- Unigram con bag of words
- modello multinomiale
	- $p(q \mid M_d)  \propto  \prod_{t:tf_{t,q}>0}  p(t \mid M_d)^{tf_{t,q}}$
- Maximum likelihood Estimation
	- $\hat{p}(t_i \mid M_d) = \frac{tf_{t_i,d}}{|d|}$
- Smoothing metodi
	- Laplace add-1
		- $p_{Lap}(t \mid d) = \frac{tf_{t,d} + 1}{|d| + |V|}$
	- collection language model
		- $p(t \mid M_c) = \frac{cf_t}{T}$
	- Jelinek-Mercer
		- $p_{JM}(t \mid d) = \lambda \frac{tf_{t,d}}{|d|} + (1-\lambda)\frac{cf_t}{T}$
	- Dirichlet 
		- $p_{Dir}(t \mid d) = \lambda_d p(t \mid \hat{M}_d) + (1-\lambda_d)p(t \mid \hat{M}_c)$
		- con
			- $\lambda_d = \frac{|d|}{|d|+\mu}$
- log likelihood con Dirichlet e operazioni algebriche varie otteniamo
	- $\log p_{Dir}(t \mid d) = \log \frac{\mu p(t \mid C)} {|d|+\mu} + \log \left( 1+ \frac{tf_{t,d}} {\mu p(t \mid C)} \right)$
- cerco lo score più piccolo

[[LABORATORIO 3]]
#### OTTIMIZZAZIONE DEI SISTEMI DI RANKING
- ranking safe non safe
- Heap
	- $O(logJ)$
- $K < |A| \ll NK$
- Index Elimination
	- high idf query terms only
	- docs containing a lot of query terms
- Champion lists
- Static Quality Scores
	- $g(d)$
	- $\text{net-score}(q,d) = g(d) + \text{cosine}(q,d)$
	- $g(d) + tf\text{-}idf_{t,d}$
- Cluster Pruning
	- $O(\sqrt{N})$
- Tiered Indexes
- impact ordered posting
	- $wf_{t,d} = 1 + \log(tf_{t,d})$
	- early termination
	- ordino per idf
		- recall
- Scoring Wand
	- finger
	- $UB_t = \max score_t(d)$
	- threshold
#### RELEVANCE FEEDBACK E QUERY EXPANSION
- $Precision = \frac{\# \text{documenti rilevanti recuperati}}{\# \text{documenti recuperati}}$
- $Recall = \frac{\# \text{documenti rilevanti recuperati}}{\# \text{documenti rilevanti}}$
- $F_1 = \frac{2PR}{P + R}$
- synonymy
- metodi locali
	- relevance feedback
	- centroide
		- $\vec{\mu}(D) = \frac{1}{|D|} \sum_{d \in D} \vec{v}(d)$
	- query ottima
		- $\vec{q}_{opt} = \frac{1}{|C_r|} \sum_{\vec{d}_j \in C_r} \vec{d}_j - \frac{1}{|C_{nr}|} \sum_{\vec{d}_j \in C_{nr}} \vec{d}_j$
	- rocchio algorithm
		- $\vec{q}_m = \alpha \vec{q}_0 + \beta \frac{1}{|D_r|} \sum_{\vec{d}_j \in D_r} \vec{d}_j - \gamma \frac{1}{|D_{nr}|} \sum_{\vec{d}_j \in D_{nr}} \vec{d}$
	- pseudo-relevance feedback
		- query drift
- metodi globali
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
- LSI
	- spazio semantico latente
		- $A = (U\Sigma^{1/2})(\Sigma^{1/2}V^T)$
	- documenti e termini
		- $T_k=U_k\Sigma_k^{1/2}$
		- $D_k=\Sigma_k^{1/2}V_k^T$
	- query dentro LSI(folding-in)
		- $q_k = \Sigma_k^{-1} U_k^T$ 
	- sinonimia
	- polisemia
	- no boolean query
	- formula di energia
		- $\frac{\sum_{i=1}^{k}\sigma_i^2}{\sum_i \sigma_i^2}$
	- Frobenius
		- $∥A−Ak​∥_F​$
#### LINK ANALYSIS
- Good/Bad/Unknowns
- Anchor text
- Connectivity Servers
	- url -> outlinks
	- url -> inlinks
- Boldi and Vigna
	- 64 bit
	- 7 URL
	- Gap Encoding e gamma code
- Page Ranking
	- Globale
		- random surfer
			- $\frac{1}{4}$
			- $\sum_{j=1}^{n} P_{ij}= 1$
			- $x_{\text{next}} = xP^i$
	- Locale
		- HITS
			- *root set*
			- *base set*
			- hub e authority
				- $h(x) \leftarrow \sum_{x \to y} a(y)$
				- $a(x) \leftarrow \sum_{y \to x} h(y)$
			- $a = A^T A a$
			- $h = AA^Th$
		- topic drift
