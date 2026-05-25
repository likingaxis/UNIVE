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
[[LABORATORIO 3]]
#### LANGUAGE MODEL PER RANKING DI INFORMATION RETRIEVAL
Domanda da fare al prof, se un sistema di IR per stessa query potrebbe restituire risultati differenti se ad esempio si usa un modello di retrieval come language model, o sbaglio? se si è possibile avere difficoltà nella valutazione del sistema?
#### OTTIMIZZAZIONE DEI SISTEMI DI RANKING
#### RELEVANCE FEEDBACK E QUERY EXPANSION
#### LATENT SEMANTIC INDEXING
[[UNI/ANNO 3/INFORMATION RETRIEVAL/LABORATORI/LABORATORIO 4|LABORATORIO 4]]
#### QUERY GLOBALI NEL RELEVANCE FEEDBACK E QUERY EXPANSION


