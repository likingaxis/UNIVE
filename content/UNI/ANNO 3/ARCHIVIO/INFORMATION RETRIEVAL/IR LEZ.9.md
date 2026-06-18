#### Language Model per ranking di information retrieval
Un altro approccio al ranking probabilistico è quello di sfruttare modelli generativi per i singoli documenti $M_d$ e stimare quanto è probabile che una determinata query $q$ è stata generata da quel determinato modello
$$p(q \mid M_d)$$
##### Struttura del modello generativo
il modello generativo è di tipo *unigram* quindi le probabilità di un termine è indipendente dagli altri e presenta l'approccio **bag of words**, dove non conta l'ordine delle parole ma solo e soltanto la loro frequenza
$$𝑀_𝑑 = {𝑝(𝑡 ∣ 𝑀_𝑑) ∶ 𝑡 ∈ 𝑉 }$$
###### La query likelihood
È una misura che serve per capire quanto un language model di un documento riesce a generare la query, assumendo indipendenza probabilistica tra i termini della query si fa il prodotto delle probabilità
- mediante modello probabilistico di tipo multinomiale possiamo considerare quante volte appare un termine nella query come un valore aggiunto da tenere in considerazione sfruttando la term frequency di q
$$p(q \mid M_d)  \propto  \prod_{t:tf_{t,q}>0}  p(t \mid M_d)^{tf_{t,q}}$$
###### Maximum likelihood Estimation
per stimare la probabilità che un termine sia spiegato da un certo modello del documento si attua la Maximum likelihood estimation
$$\hat{p}(t_i \mid M_d) = \frac{tf_{t_i,d}}{|d|}$$
- dato da quante volte appare il termine $i$ nel documento $d$ fratto la dimensione del documento
###### Smoothing
Lo smoothing cerca di risolvere un problema fondamentale, se abbiamo una probabilità indipendente essa azzererà il prodotto delle precedenti, per questo dobbiamo applicare dei metodi di smoothing
###### SOL.1 **Laplace smoothing / add-1 smoothing**
si vuole applicare smoothing di LaPlace con add-1
ma può alterare le probabilità
$$p_{Lap}(t \mid d) = \frac{tf_{t,d} + 1}{|d| + |V|}$$
###### SOL.2 **collection language model**
si vuole aggiungere un altro modello linguistico dell'intera collezione di documenti $M_c$ 
serve come distribuzione di background per assegnare ad esempio probabilità non nulla nei termini assenti nel documento
- non viene usata da sola ma si aggiunge alle SOL.3 e 4 che vedremo
$$p(t \mid M_c) = \frac{cf_t}{T}$$
###### SOL.3 **Jelinek-Mercer smoothing**
sfrutta il modello del documento e il modello della collezione e con un iperparametro $\lambda$ definisce come bilanciare i due
$$p_{JM}(t \mid d) = \lambda \frac{tf_{t,d}}{|d|} + (1-\lambda)\frac{cf_t}{T}$$
- Se $λ$ è alto, diamo più peso al documento, favorisce documenti che contengono più termini della query
- Se $λ$ è basso, diamo più peso alla collezione, favorisce query lunghe o verbose dove non conta la totale copertura dei termini
Il limite di questo metodo è che usa lo stesso parametro $\lambda$ per tutti i documenti
###### SOL.4 **DIRICHLET SMOOTHING**
in Dirichlet la quantità varia a seconda della lunghezza del documento mediante $\lambda_d$ 
$$\lambda_d = \frac{|d|}{|d|+\mu}$$
e sia $\mu$ definita come un conteggio virtuale che si moltiplica alla probabilità del termine con il modello della collezione
infatti senza semplificazioni avremmo $$\mu p(t \mid M_c)$$
- $\mu$ controlla quanto peso dare alla collezione e viene definito tramite benchmark
ea, però devi saper dire la formula compatta:

$$p_{Dir}(t|d)= \frac{tf_{t,d}+\mu p(t|M_c)} {|d|+\mu}$$

Questa è la formula più importante.
dopo varie semplificazioni abbiamo come formula finale
$$p_{Dir}(t \mid d) = \lambda_d p(t \mid \hat{M}_d) + (1-\lambda_d)p(t \mid \hat{M}_c)$$

se il documento è *corto* avremmo $\lambda_d$ basso e quindi possiamo prendere più score dal modello della collezione
se il documento è *lungo* allora avremo $\lambda_d$ alto e quindi possiamo prendere più score dal modello del documento
*APPLICAZIONE ALLA QUERY di Dirichlet*
dal prodotto si passa alla somma mediante passaggio al logaritmo con uso della log-likelihood dove il logaritmo con dentro una moltiplicazione è uguale alla somma dei logaritmi
- andiamo a calcolare la probabilità con Dirichlet smoothing dei singoli termini della query che sono $w_k$
$$\log p_{Dir}(q \mid d) = \sum_{k=1}^{n} \log p_{Dir}(w_k \mid d)$$
- il log serve per evitare underflow numerico e trasformare i prodotti in somme
- produce score negativi quindi cerco il valore più vicino allo 0 negativo
###### CONFRONTO TRA BM25 E LANGUAGE MODELS
con i language model lo score più alto potrebbe essere negativo dovuto al fatto che utilizziamo il logaritmo e tra 0 e 1 il logaritmo vale valori negativi
cerchiamo un valore vicino allo 0 comunque
invece con BM25 otteniamo sempre valori positivi

- i language model hanno idf non esplicita ma tramite la collection frequency otteniamo un risultato simile, invece BM25 la ha in modo esplicito
- con BM25 riusciamo ad avere più controllo dei fenomeni grazie ai parametri di saturazione e di normalizzazione $k_1$ e $B$
