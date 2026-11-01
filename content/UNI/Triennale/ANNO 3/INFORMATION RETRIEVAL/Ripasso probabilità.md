#### Ripassino probabilità
Il modello si basa sulla Teoria della Probabilità (Regola della Catena, Partizione, Teorema di Bayes).
###### Regola della Catena
Indica che la probabilità che due eventi A e B avvengano contemporaneamente è il prodotto della probabilità di uno per la probabilità dell'altro dato il primo.
$P(A,B) = P(A \cap B) = P(A|B)P(B) = P(B|A)P(A)$.
###### Regola del Complemento
Indica la probabilità che un evento NON avvenga
$p(\bar A) = 1 − p(A)$
###### Regola della Partizione 
Se un evento B può essere diviso in un insieme esaustivo di sotto casi disgiunti (che non si sovrappongono), la probabilità di B è la somma delle probabilità dei singoli sotto casi.
* $P(B) = P(A,B) + P(\bar A, B)$.
###### Teorema di Bayes
Ci permette di aggiornare la nostra conoscenza su un evento alla luce di nuove prove (evidenza).
$$
p(A|B) = \frac{p(B|A) p(A)}{p(B)}
$$
* **priori**: $P(A)$ = la stima iniziale della probabilità di A prima di vedere l'evidenza B
* **posteriori**: $P(A|B)$ = la probabilità aggiornata dopo aver visto l'evidenza.
* **ossia**: posso trovare la probabilità a posteriori di $A$ usando quella a priori.

Il denominatore p(B) può essere espanso tramite la regola della partizione: $$p(B) = \sum_{X \in \{A, \bar{A}\}} p(B|X) \cdot p(X)$$ *Questo è il cuore del sistema. Vogliamo calcolare la probabilità che un documento sia rilevante (A) data la query/evidenza (B).*