#### VALUTAZIONE DEI SISTEMI
[[IR LEZ.6]]
- Gold Standard
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
#### DISTRIBUTIONAL LEXICAL SEMANTICS
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
#### PROBABILISTIC RETRIEVAL
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
* 
[[LABORATORIO 3]]
#### LANGUAGE MODEL PER RANKING DI INFORMATION RETRIEVAL
Domanda da fare al prof, se un sistema di IR per stessa query potrebbe restituire risultati differenti se ad esempio si usa un modello di retrieval come language model, o sbaglio? se si è possibile avere difficoltà nella valutazione del sistema?
#### OTTIMIZZAZIONE DEI SISTEMI DI RANKING
#### RELEVANCE FEEDBACK E QUERY EXPANSION
#### LATENT SEMANTIC INDEXING
[[UNI/ANNO 3/INFORMATION RETRIEVAL/LABORATORI/LABORATORIO 4|LABORATORIO 4]]
#### QUERY GLOBALI NEL RELEVANCE FEEDBACK E QUERY EXPANSION


