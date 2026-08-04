# Teorema 3.7 — Invertibilità delle matrici a diagonale dominante

## Contesto

Questo teorema si trova nella parte sulle **matrici a diagonale dominante** e usa i teoremi di Gershgorin, in particolare il **terzo teorema di Gershgorin forte**.

L’obiettivo è dimostrare che, sotto certe ipotesi di dominanza diagonale, una matrice

[  
A\in \mathbb{C}^{n\times n}  
]

è **invertibile**.

Ricordo subito il collegamento fondamentale:

[  
A \text{ è invertibile}  
\iff  
0 \text{ non è un autovalore di } A.  
]

Quindi, per dimostrare che (A) è invertibile, basta dimostrare che (0) non può essere un suo autovalore.

Il teorema nelle dispense afferma che (A) è invertibile se soddisfa almeno una tra quattro condizioni: dominanza diagonale per righe con irriducibilità, dominanza stretta per righe, dominanza per colonne con irriducibilità, oppure dominanza stretta per colonne. La dimostrazione riportata nelle dispense viene fatta per il primo caso; gli altri tre casi sono lasciati come esercizio.

---

# Enunciato

Supponiamo che la matrice

[  
A\in\mathbb{C}^{n\times n}  
]

soddisfi almeno una delle seguenti condizioni:

1. (A) è a diagonale dominante per righe e irriducibile;
    
2. (A) è a diagonale dominante in senso stretto per righe;
    
3. (A) è a diagonale dominante per colonne e irriducibile;
    
4. (A) è a diagonale dominante in senso stretto per colonne.
    

Allora

[  
A \text{ è invertibile}.  
]

---

# Definizioni da ricordare durante l’orale

Dire che (A) è **a diagonale dominante per righe** significa che, per ogni riga (i),

[  
|a_{ii}|\geq \sum_{\substack{j=1\j\neq i}}^n |a_{ij}|,  
]

e inoltre esiste almeno una riga (k) per cui la disuguaglianza è stretta:

[  
|a_{kk}|> \sum_{\substack{j=1\j\neq k}}^n |a_{kj}|.  
]

Quindi l’elemento diagonale domina la somma degli elementi fuori diagonale della stessa riga.

Dire che (A) è **a diagonale dominante in senso stretto per righe** significa invece che la disuguaglianza stretta vale per ogni riga:

[  
|a_{ii}|> \sum_{\substack{j=1\j\neq i}}^n |a_{ij}|  
\qquad \forall i=1,\dots,n.  
]

La versione per colonne è analoga, ma si lavora colonna per colonna:

[  
|a_{jj}|\geq \sum_{\substack{i=1\i\neq j}}^n |a_{ij}|.  
]

Dire che (A) è **irriducibile** significa che il grafo associato ad (A) è fortemente connesso. Il grafo associato ad (A) ha nodi (1,\dots,n) e contiene una freccia

[  
i\to j  
]

se e solo se

[  
a_{ij}\neq 0.  
]

Fortemente connesso significa che da ogni nodo posso raggiungere ogni altro nodo seguendo le frecce.

---

# Dimostrazione del caso 1

Supponiamo che (A) sia a diagonale dominante per righe e irriducibile.

Vogliamo dimostrare che

[  
A \text{ è invertibile}.  
]

Come detto, è equivalente dimostrare che

[  
0 \text{ non è autovalore di } A.  
]

Per farlo useremo il **terzo teorema di Gershgorin forte**. Questo teorema dice che, se (A) è irriducibile, allora i punti che stanno sul bordo dei cerchi di Gershgorin a cui appartengono, ma non stanno sul bordo di tutti i cerchi, non possono essere autovalori.

Quindi vogliamo verificare che il punto (0) soddisfa proprio questa situazione.

Per ogni riga (i), il cerchio di Gershgorin è

[  
K_i=\mathcal{C}(a_{ii},r_i),  
]

dove

[  
r_i=\sum_{\substack{j=1\j\neq i}}^n |a_{ij}|.  
]

Qui (a_{ii}) è il centro del cerchio e (r_i) è il raggio.

Poiché (A) è a diagonale dominante per righe, per ogni (i) vale

[  
|a_{ii}|\geq r_i.  
]

Ora interpretiamo geometricamente questa disuguaglianza. La quantità

[  
|a_{ii}|  
]

è la distanza tra il centro del cerchio (K_i), cioè (a_{ii}), e il punto (0). Infatti

[  
|a_{ii}|=|a_{ii}-0|.  
]

Quindi

[  
|a_{ii}|\geq r_i  
]

significa che la distanza del punto (0) dal centro (a_{ii}) è maggiore o uguale al raggio.

Questo vuol dire che (0) non può stare all’interno del cerchio (K_i). Può succedere solo una di queste due cose:

[  
0 \notin K_i  
]

oppure

[  
0\in \partial K_i.  
]

Cioè (0) sta fuori dal cerchio oppure sta sul bordo.

Dunque, se (0) appartiene a un cerchio di Gershgorin (K_i), allora deve stare per forza sul bordo di (K_i). Questo verifica la prima condizione del terzo teorema di Gershgorin forte:

[  
0 \text{ sta sul bordo dei cerchi a cui appartiene}.  
]

Adesso usiamo la parte “non stretta ma con almeno una stretta” della dominanza diagonale. Poiché (A) è a diagonale dominante, esiste almeno un indice (k) tale che

[  
|a_{kk}|>r_k.  
]

Questa disuguaglianza significa che la distanza di (0) dal centro (a_{kk}) è strettamente maggiore del raggio del cerchio (K_k). Quindi (0) sta proprio fuori da (K_k):

[  
0\notin K_k.  
]

In particolare, (0) non sta sul bordo di (K_k). Quindi (0) non sta sul bordo di tutti i cerchi di Gershgorin.

Abbiamo verificato che:

[  
0 \text{ sta sul bordo dei cerchi a cui appartiene}  
]

ma

[  
0 \text{ non sta sul bordo di tutti i cerchi}.  
]

Inoltre, (A) è irriducibile per ipotesi.

Sono quindi soddisfatte le ipotesi del terzo teorema di Gershgorin forte. Di conseguenza,

[  
0 \text{ non è autovalore di } A.  
]

Poiché una matrice quadrata è invertibile se e solo se (0) non è un suo autovalore, concludiamo che

[  
A \text{ è invertibile}.  
]

[  
\square  
]

---

# Dimostrazione del caso 2

Supponiamo ora che (A) sia a diagonale dominante in senso stretto per righe.

Quindi, per ogni (i=1,\dots,n),

[  
|a_{ii}|>  
\sum_{\substack{j=1\j\neq i}}^n |a_{ij}|.  
]

Poniamo ancora

[  
r_i=\sum_{\substack{j=1\j\neq i}}^n |a_{ij}|.  
]

Allora

[  
|a_{ii}|>r_i  
\qquad \forall i.  
]

Geometricamente, (K_i=\mathcal{C}(a_{ii},r_i)) è il cerchio di Gershgorin di centro (a_{ii}) e raggio (r_i). La quantità (|a_{ii}|) è la distanza di (0) dal centro del cerchio.

La disuguaglianza

[  
|a_{ii}|>r_i  
]

dice che (0) è più lontano dal centro rispetto al raggio. Quindi (0) sta fuori da ogni cerchio di Gershgorin:

[  
0\notin K_i  
\qquad \forall i.  
]

Perciò

[  
0\notin K_1\cup\cdots\cup K_n.  
]

Ora uso il **primo teorema di Gershgorin**, che dice che tutti gli autovalori di (A) stanno nell’unione dei cerchi di Gershgorin:

[  
\sigma(A)\subseteq K_1\cup\cdots\cup K_n.  
]

Ma (0) non appartiene a questa unione, quindi (0) non può essere un autovalore di (A).

Dunque

[  
A \text{ è invertibile}.  
]

[  
\square  
]

Notiamo che in questo caso non serve l’irriducibilità, perché la dominanza stretta esclude direttamente (0) da tutti i cerchi.

---

# Dimostrazione del caso 3

Supponiamo che (A) sia a diagonale dominante per colonne e irriducibile.

Dire che (A) è a diagonale dominante per colonne significa che, per ogni colonna (j),

[  
|a_{jj}|\geq \sum_{\substack{i=1\i\neq j}}^n |a_{ij}|,  
]

e che almeno per una colonna la disuguaglianza è stretta.

Ora osserviamo che le colonne di (A) diventano le righe di (A^T). Quindi dire che (A) è a diagonale dominante per colonne equivale a dire che

[  
A^T  
]

è a diagonale dominante per righe.

Inoltre, se (A) è irriducibile, allora anche (A^T) è irriducibile. L’idea è che trasporre la matrice inverte il verso delle frecce nel grafo: se nel grafo di (A) c’è un cammino che collega tutti i nodi, nel grafo di (A^T) c’è lo stesso cammino percorso al contrario. Le dispense richiamano proprio il fatto che (A) è irriducibile se e solo se (A^T) è irriducibile nell’Esercizio 3.8.

Quindi (A^T) è a diagonale dominante per righe e irriducibile.

Per il caso 1, applicato alla matrice (A^T), otteniamo che

[  
A^T \text{ è invertibile}.  
]

Ora, una matrice è invertibile se e solo se il suo determinante è diverso da zero. Inoltre

[  
\det(A^T)=\det(A).  
]

Poiché (A^T) è invertibile,

[  
\det(A^T)\neq 0.  
]

Quindi

[  
\det(A)\neq 0.  
]

Pertanto

[  
A \text{ è invertibile}.  
]

[  
\square  
]

---

# Dimostrazione del caso 4

Supponiamo infine che (A) sia a diagonale dominante in senso stretto per colonne.

Questo significa che, per ogni colonna (j),

[  
|a_{jj}|>  
\sum_{\substack{i=1\i\neq j}}^n |a_{ij}|.  
]

Passando alla trasposta, le colonne di (A) diventano le righe di (A^T). Quindi (A^T) è a diagonale dominante in senso stretto per righe.

Per il caso 2, applicato alla matrice (A^T), segue che

[  
A^T \text{ è invertibile}.  
]

Allora

[  
\det(A^T)\neq 0.  
]

Ma

[  
\det(A^T)=\det(A),  
]

quindi

[  
\det(A)\neq 0.  
]

Dunque

[  
A \text{ è invertibile}.  
]

[  
\square  
]

---

# Osservazione importante: perché serve il terzo teorema forte?

Nel caso 1 non basta sempre usare il terzo teorema di Gershgorin debole.

Il motivo è che il teorema debole guarda solo i punti che stanno sul bordo dell’unione dei cerchi. Invece, nella dimostrazione del caso 1, noi dobbiamo escludere (0) anche in situazioni in cui (0) non sta sul bordo esterno dell’unione, ma sta comunque sul bordo dei cerchi a cui appartiene.

Questa è esattamente la differenza tra versione forte e versione debole:

[  
\text{versione debole: guarda il bordo dell’unione dei cerchi;}  
]

[  
\text{versione forte: guarda il bordo dei cerchi a cui il punto appartiene.}  
]

Le dispense osservano esplicitamente che, nella dimostrazione del Teorema 3.7, serve la versione forte del terzo teorema di Gershgorin, perché quella debole non basta; viene dato un esempio di matrice a diagonale dominante e irriducibile per cui non si riuscirebbe a dimostrare l’invertibilità usando solo la versione debole.

Quindi, frase da orale:

> “Nel caso di dominanza diagonale non stretta e irriducibilità, uso il terzo teorema di Gershgorin forte perché devo escludere (0) anche se (0) non è necessariamente sul bordo esterno dell’unione dei cerchi. La dominanza diagonale mi dice che, se (0) appartiene a un cerchio, allora sta sul bordo; la disuguaglianza stretta almeno in una riga mi dice che (0) non sta sul bordo di tutti i cerchi; l’irriducibilità mi permette di applicare Gershgorin forte. Quindi (0) non è autovalore e (A) è invertibile.”

---

# Conclusione finale da orale

Il Teorema 3.7 fornisce condizioni sufficienti per l’invertibilità di una matrice. L’idea centrale è usare Gershgorin per escludere che (0) sia autovalore.

Nel caso di dominanza stretta, (0) è fuori da tutti i cerchi di Gershgorin, quindi non può essere autovalore per il primo teorema di Gershgorin.

Nel caso di dominanza non stretta, (0) potrebbe stare sul bordo di alcuni cerchi. Per escluderlo serve l’irriducibilità e il terzo teorema di Gershgorin forte. In questo modo si dimostra che (0) non può essere autovalore.

Nei casi per colonne si passa alla trasposta, perché la dominanza per colonne di (A) diventa dominanza per righe di (A^T), e poi si usa il fatto che

[  
\det(A^T)=\det(A).  
]

Quindi, in tutti e quattro i casi,

[  
0\notin \sigma(A),  
]

e pertanto

[  
A \text{ è invertibile}.  
]

