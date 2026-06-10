#### Probabilistic Retrieval
Fare recupero di documenti con un approccio probabilistico stimando la probabilità che un documento sia rilevante per una certa query
$$p(R|d,q)$$
dove $R$ è
$R = \text{“il documento } d \text{ è rilevante rispetto alla query } q\text{”}$
Possiamo rappresentarlo con una variabile binaria:  
$$R_{d,q} =  
\begin{cases}  
1 & \text{se } d \text{ è rilevante per } q \\  
0 & \text{se } d \text{ non è rilevante per } q  
\end{cases}  $$
##### Odds di rilevanza
per confrontare la rilevanza e la non rilevanza di un documento rispetto a una query usiamo gli Odds
$$O(R|d,q)=\frac{p(R|d,q)}{p(\bar R|d,q)}$$
- \($O(R|d,q)>1$\): il documento è più probabilmente rilevante
- \($O(R|d,q)=1$\): rilevanza e non rilevanza sono bilanciate
- \($O(R|d,q)<1$\): il documento è più probabilmente non rilevante
#### PRP: Probability Ranking Principle
se conoscessimo la probabilità di rilevanza di ogni documento rispetto alla query afferma che in assenza di ulteriori informazioni il ranking ottimale si basa sull'ordinamento dei documenti in ordine decrescente di rilevanza
assumendo che
- la rilevanza di un documento è indipendente da quella degli altri
- gli errori hanno costo uniforme
questo principio viene giustificato da **Error cost of retrieval**
- il calcolo del rischio atteso dato dai falsi positivi e i falsi negativi è composto dalla seguente formula
Il rischio atteso è:
$$R(D(q)) =
\sum_{d \in D(q)} C'(d,q)p(\bar R|d,q)
+
\sum_{d \notin D(q)} C(d,q)p(R|d,q)$$
- $C'(d,q)$ è il costo di restituire un documento non rilevante;
- $C(d,q)$ è il costo di non restituire un documento rilevante.
#### Binary Independence Model, BIM
Uno dei modelli più semplici per il retrieval ma è di tipo binario e la presenza di un termine è totalmente indipendente dalla presenza degli altri
L'idea alla base del BIM vede la rappresentazione di query e documenti come vettori binari dove ogni componente indica la presenza o assenza di quel determinato termine
per rappresentare sia query che documenti quindi abbiamo nel caso del documento
$$v_{d}=(x_1,\dots,x_M)$$
$$x_i =
\begin{cases}
1 & \text{se il termine } t_i \text{ compare nel documento} \\
0 & \text{se il termine } t_i \text{ non compare nel documento}
\end{cases}$$
sfruttiamo gli Odds citati in precedenza per rappresentare il rapporto di un documento data la query della rilevanza o della non rilevanza
$$O(R|v_d,v_q)=\frac{p(R|v_d,v_q)}{p(\bar R|v_d,v_q)}$$
visto che non possiamo sfruttare term frequency o altro per definire quanto è tipico che un termine appaia in un documento o una query usiamo due parametri
$$p_i=p(x_i=1|R,v_q)$$

- $p_i$ è la probabilità che il termine ($t_i$ compaia in un documento rilevante
$$u_i=p(x_i=1|\bar R,v_q)$$
- $u_i$è la probabilità che il termine $t_i$ compaia in un documento non rilevante
se $p_i \gg u_i$ allora il termine compare in documenti rilevanti più dei non rilevanti

Dopo le semplificazioni del BIM, il contributo di un termine della query presente nel documento è dato dal **log odds ratio**:

$$c_i=\log \frac{p_i(1-u_i)}{u_i(1-p_i)}$$
Questo valore è il peso probabilistico del termine.
- \($c_i>0$\): il termine è più tipico dei documenti rilevanti;
- \($c_i=0$\): il termine non distingue rilevanti e non rilevanti;
- \($c_i<0$\): il termine è più tipico dei documenti non rilevanti.
Quindi \($c_i$\) misura quanto un termine aiuta a distinguere documenti rilevanti da documenti non rilevanti.
$p_i$ e $u_i$ rispettivamente con feedback di rilevanza o senza valgono:

$$p_i=\frac{r_i}{R}$$
$$u_i=\frac{df_i-r_i}{N-R}$$
con
- \($N$\): numero totale di documenti nella collezione;
- \($R$\): numero di documenti rilevanti;
- \($r_i$\): numero di documenti rilevanti che contengono il termine \($t_i$\);
- \($df_i$\): numero totale di documenti che contengono \($t_i$\).
senza conoscere $r_i$ e $R$ allora approssimiamo questi calcoli assumendo che i documenti rilevanti siano decisamente inferiori della collezione totale
quindi
$u_i \approx \frac{df_i}{N}$
$p_i=0.5$
##### Retrieval Status Value, RSV
con feedback di rilevanza quindi poi si giunge a un retrieval status value di
$$RSV_d=\sum_{i:x_i=y_i=1} c_i$$
dove $x_i$ sono i termini del doc e $y_i$ sono i termini della query
senza feedback di rilevanza abbiamo invece
$$RSV_d \approx \sum_{i:x_i=y_i=1} \log \frac{N}{df_i}$$
###### BIM vs Vector Space Model
* BIM È USATO PER TITOLI E ABSTRACT, non usa term frequency o inverse document frequency e usa una rilevanza strettamente binaria

#### Modelli con Term frequency
Introduciamo quindi la **Term Frequency**
Il documento viene rappresentato come vettore di conteggi:
$(d_{t_1}, \dots, d_{t_n})$
dove \($d_{t_i}=n_i$\) indica quante volte il termine \($t_i$\) compare nel documento.
##### Modello con Distribuzione di Poisson
per modellare probabilisticamente il numero di occorrenze di un termine in un documento usiamo la distribuzione di Poisson
La probabilità di osservare \($x$\) occorrenze di un termine, dato un numero medio atteso ($\lambda$), è:
$Poisson(x|\lambda)=\frac{e^{-\lambda}\lambda^x}{x!}$

- \($x$\) è il numero di occorrenze osservate
- \($\lambda$\) è il numero medio atteso di occorrenze
dove $\lambda$ può essere stimata come collection frequency fratto numero totale di documenti
$$\lambda \approx \frac{CF_j}{N}$$
###### Retrieval Status Value, RSV nel modello di poisson
$$RSV_d=\sum_{t_i:y_i=1} n_i \log \frac{\rho_i}{\gamma_i}$$

- \($n_i$\) è il numero di occorrenze del termine \($t_i$\) nel documento;
- \($\rho_i$\) è la frequenza media attesa nei documenti rilevanti;
- \($\gamma_i$\) è la frequenza media attesa nella collezione generale.
presenta però un problema di linearità del contributo dei termini

##### Modello 2-Poisson
prende e sfrutta i concetti alla base del modello semplice di Poisson ma aggiunge il concetto di eliteness
per ogni termine i documenti possono essere di 2 tipi
- Elite, il termine qui appare molto spesso ed è detto contentful
- Non-Elite, il termine qui appare raramente o mai ed è detto contentless
si applicano quindi 2 Poisson una per le probabilità di eliteness e una per le probabilità di non eliteness
La probabilità di osservare \($n_i$\) occorrenze diventa una combinazione pesata di due Poisson:
$$p(d_{t_i}=n_i|R,v_q)
=
p_i \cdot Poisson(n_i|\mu_i)
+
(1-p_i)\cdot Poisson(n_i|\bar \mu_i)$$
- \($p_i$\) è la probabilità che il documento sia elite per il termine;
- \($\mu_i$\) è la media delle occorrenze nei documenti elite;
- \($\bar \mu_i$\) è la media delle occorrenze nei documenti non-elite.
il problema è che ci sono troppi parametri da dover stimare per ogni termine e quindi si preferisce un modello che ora spiegheremo
##### Modello Okapi BM25
Modello probabilistico utilizzato tutt'oggi ad esempio su Lucene, software di information retrieval, utilizza la term frequency e la inverse document frequency
- è considerato uno dei modelli di ranking più efficaci
per ogni documento si calcola la sua lunghezza
$L_{d} = \sum_{t} tf_{td}$
per tutta la collezione si calcola la media della lunghezza
$L_{ave} = \frac 1 {|D|} \sum\limits_{d \in D}L_{d}$
Poi si definisce un fattore di normalizzazione B
$B = (1 - b) + b \frac{L_d}{L_{ave}} \quad \text{con } 0 \leq b \leq 1$
Il parametro **$b$** regola l'intensità della normalizzazione per definire quanto deve effettivamente contare la lunghezza di un documento o se questa deve essere penalizzata da una normalizzazione
La normalizzazione per lunghezza serve a ridurre la disparità tra documenti lunghi e documenti corti:
*   **$b = 1$**: Normalizzazione totale (penalizza pesantemente la lunghezza)
*   **$b = 0$**: Nessuna normalizzazione
di solito si mette a  **$b \approx 0.75$** 
##### Retrieval status Value
$$RSV_d = \sum_{t \in q} \log \left( \frac{N}{df_t} \right) \cdot \frac{(k_1 + 1)tf_{td}}{k_1  B + tf_{td}}$$
questa formula vede a sinistra l'uso della inverse document frequency e a destra la term frequency è moltiplicata per una certa TF saturation
infatti $k_1$ è un parametro di tuning definito per controllare la scala della saturazione della Term frequency
limita superiormente la term frequency dopo una certa crescita rapida o lenta a seconda del valore di k
* k1 basso= saturazione rapida, uno stesso termine nel documento ha valenza davvero bassa dopo poche ripetizioni
* k1 alto= saturazione lenta, uno stesso termine continua a dare un buon contributo dopo parecchie ripetizioni
* k1 di solito tra $1.2$ e $2$
N.B è possibile sfruttare la saturazione delle term frequency anche per le query usando $k_3$ dove ad esempio anche nella query si ripetono dei termini più volte
$$\frac{(k_3+1)tf_{tq}}{k_3 + tf_{tq}}$$
![[Pasted image 20260502154640.png]]
###### COSINE SIMILARITY VS BM25 
- la cosine similarity usa la normalizzazione geometrica con i vettori mentre invece BM25 usa una normalizzazione più esplicita calcolando proprio la lunghezza dei documenti e la media della lunghezza della collezione
- BM25 usa la saturazione molto utile per dare un controllo maggiore al ranking che vogliamo e anche sfruttando il fattore di normalizzazione b
- cosine similarity ritorna un valore compreso tra 0 e 1 mentre BM25 uno score numerico potenzialmente che può andare a infinito
