# Teorema 3.3 — Primo teorema di Gershgorin

Siamo nella parte della teoria dedicata alla **localizzazione degli autovalori**. L’idea è questa: data una matrice (A\in \mathbb{C}^{n\times n}), spesso calcolare esplicitamente gli autovalori è difficile; i teoremi di Gershgorin permettono però di individuare delle regioni del piano complesso in cui gli autovalori devono necessariamente trovarsi. Nel caso del primo teorema di Gershgorin, queste regioni sono l’unione dei cerchi di Gershgorin della matrice (A). Le dispense enunciano infatti che gli autovalori di una matrice (A\in\mathbb{C}^{n\times n}) stanno tutti nell’unione dei cerchi di Gershgorin di (A).

---

## Script da orale

Considero una matrice

[  
A=(a_{ij})_{i,j=1}^n\in \mathbb{C}^{n\times n}.  
]

Qui (\mathbb{C}^{n\times n}) indica l’insieme delle matrici quadrate di ordine (n) con elementi complessi. Quindi (A) ha (n) righe e (n) colonne, e il suo elemento in posizione ((i,j)) è indicato con (a_{ij}).

Prima di enunciare il teorema, ricordo la definizione di **cerchio di Gershgorin**. Dato un numero complesso (z_0\in\mathbb{C}) e un raggio (r\ge 0), indico con

[  
\mathcal{C}(z_0,r)={z\in\mathbb{C}: |z-z_0|\le r}  
]

il cerchio chiuso del piano complesso di centro (z_0) e raggio (r). Dire (|z-z_0|\le r) significa dire che la distanza tra (z) e (z_0) è minore o uguale a (r).

Per ogni riga (i=1,\dots,n), il cerchio di Gershgorin per riga associato ad (A) è

# [  
K_i

\mathcal{C}\left(a_{ii},\sum_{\substack{j=1\j\neq i}}^n |a_{ij}|\right).  
]

Quindi il centro del cerchio (K_i) è l’elemento diagonale (a_{ii}), mentre il raggio è la somma dei moduli degli elementi della riga (i)-esima escluso l’elemento diagonale.

In altre parole, se guardo la riga (i)-esima,

[  
a_{i1},a_{i2},\dots,a_{ii},\dots,a_{in},  
]

prendo come centro (a_{ii}), e come raggio

[  
|a_{i1}|+\dots+|a_{i,i-1}|+|a_{i,i+1}|+\dots+|a_{in}|.  
]

Quando si parla semplicemente di cerchi di Gershgorin, senza specificare altro, si intendono questi cerchi per riga.

---

## Enunciato

Il **primo teorema di Gershgorin** afferma che tutti gli autovalori di (A) appartengono all’unione dei cerchi di Gershgorin di (A), cioè

[  
\sigma(A)\subseteq K_1\cup K_2\cup\dots\cup K_n.  
]

Qui (\sigma(A)) indica lo spettro di (A), cioè l’insieme degli autovalori di (A).

Equivalentemente, se (\lambda) è un autovalore di (A), allora esiste almeno un indice (i\in{1,\dots,n}) tale che

[  
|\lambda-a_{ii}|  
\le  
\sum_{\substack{j=1\j\neq i}}^n |a_{ij}|.  
]

Questa disuguaglianza significa esattamente che (\lambda\in K_i).

---

## Dimostrazione

Sia (\lambda) un autovalore generico di (A). Voglio dimostrare che (\lambda) appartiene ad almeno uno dei cerchi di Gershgorin.

Poiché (\lambda) è un autovalore, per definizione esiste un vettore non nullo

[  
u=(u_1,\dots,u_n)^T\in\mathbb{C}^n,\qquad u\neq 0,  
]

tale che

[  
Au=\lambda u.  
]

Il vettore (u) si chiama autovettore associato a (\lambda). È importante che (u\neq 0), perché il vettore nullo soddisferebbe sempre (A0=\lambda 0), ma non dà nessuna informazione sugli autovalori.

Ora scrivo l’equazione

[  
Au=\lambda u  
]

componente per componente. La componente (i)-esima del prodotto (Au) è

[  
(Au)_i=\sum_{j=1}^n a_{ij}u_j.  
]

Questo deriva dalla regola di prodotto matrice-vettore: la componente (i)-esima si ottiene facendo il prodotto della riga (i)-esima di (A) con il vettore (u).

Invece, la componente (i)-esima del vettore (\lambda u) è

[  
(\lambda u)_i=\lambda u_i.  
]

Quindi, dall’uguaglianza (Au=\lambda u), ottengo

[  
\sum_{j=1}^n a_{ij}u_j=\lambda u_i  
\qquad  
\text{per ogni } i=1,\dots,n.  
]

A questo punto scelgo un indice (i_0\in{1,\dots,n}) tale che (u_{i_0}) sia una componente di modulo massimo, cioè

[  
|u_{i_0}|=\max{|u_1|,\dots,|u_n|}.  
]

Questa scelta è possibile perché ho un numero finito di componenti. Inoltre, poiché (u\neq 0), almeno una componente di (u) è diversa da zero; quindi il massimo dei moduli è strettamente positivo:

[  
|u_{i_0}|>0.  
]

Questa osservazione sarà importante alla fine, perché mi permetterà di dividere per (|u_{i_0}|).

Considero ora l’equazione componente per componente corrispondente proprio all’indice (i_0):

[  
\sum_{j=1}^n a_{i_0j}u_j=\lambda u_{i_0}.  
]

Separiamo nella somma il termine diagonale, cioè quello con (j=i_0):

# [  
a_{i_0i_0}u_{i_0}  
+  
\sum_{\substack{j=1\j\neq i_0}}^n a_{i_0j}u_j

\lambda u_{i_0}.  
]

Porto il termine diagonale dall’altra parte:

# [  
\sum_{\substack{j=1\j\neq i_0}}^n a_{i_0j}u_j

\lambda u_{i_0}-a_{i_0i_0}u_{i_0}.  
]

Raccolgo (u_{i_0}) a destra:

# [  
\sum_{\substack{j=1\j\neq i_0}}^n a_{i_0j}u_j

(\lambda-a_{i_0i_0})u_{i_0}.  
]

Equivalentemente,

# [  
(\lambda-a_{i_0i_0})u_{i_0}

\sum_{\substack{j=1\j\neq i_0}}^n a_{i_0j}u_j.  
]

Ora prendo il modulo di entrambi i membri:

# [  
|(\lambda-a_{i_0i_0})u_{i_0}|

\left|  
\sum_{\substack{j=1\j\neq i_0}}^n a_{i_0j}u_j  
\right|.  
]

Nel membro sinistro uso la proprietà moltiplicativa del modulo, cioè

[  
|zw|=|z|,|w|.  
]

Quindi

# [  
|(\lambda-a_{i_0i_0})u_{i_0}|

|\lambda-a_{i_0i_0}|,|u_{i_0}|.  
]

Pertanto

# [  
|\lambda-a_{i_0i_0}|,|u_{i_0}|

\left|  
\sum_{\substack{j=1\j\neq i_0}}^n a_{i_0j}u_j  
\right|.  
]

A questo punto uso la disuguaglianza triangolare. La disuguaglianza triangolare dice che il modulo di una somma è minore o uguale alla somma dei moduli:

[  
|z_1+\dots+z_m|  
\le  
|z_1|+\dots+|z_m|.  
]

Applicandola alla somma che compare a destra ottengo

[  
\left|  
\sum_{\substack{j=1\j\neq i_0}}^n a_{i_0j}u_j  
\right|  
\le  
\sum_{\substack{j=1\j\neq i_0}}^n |a_{i_0j}u_j|.  
]

Uso di nuovo la proprietà moltiplicativa del modulo:

[  
|a_{i_0j}u_j|=|a_{i_0j}|,|u_j|.  
]

Quindi

[  
|\lambda-a_{i_0i_0}|,|u_{i_0}|  
\le  
\sum_{\substack{j=1\j\neq i_0}}^n |a_{i_0j}|,|u_j|.  
]

Ora entra in gioco la scelta di (i_0). Poiché (u_{i_0}) è una componente di modulo massimo, per ogni (j) vale

[  
|u_j|\le |u_{i_0}|.  
]

Allora posso maggiorare ogni (|u_j|) con (|u_{i_0}|):

[  
\sum_{\substack{j=1\j\neq i_0}}^n |a_{i_0j}|,|u_j|  
\le  
\sum_{\substack{j=1\j\neq i_0}}^n |a_{i_0j}|,|u_{i_0}|.  
]

Poiché (|u_{i_0}|) non dipende dall’indice (j), lo porto fuori dalla somma:

# [  
\sum_{\substack{j=1\j\neq i_0}}^n |a_{i_0j}|,|u_{i_0}|

|u_{i_0}|  
\sum_{\substack{j=1\j\neq i_0}}^n |a_{i_0j}|.  
]

Quindi abbiamo ottenuto

[  
|\lambda-a_{i_0i_0}|,|u_{i_0}|  
\le  
|u_{i_0}|  
\sum_{\substack{j=1\j\neq i_0}}^n |a_{i_0j}|.  
]

Siccome (|u_{i_0}|>0), posso dividere entrambi i membri per (|u_{i_0}|), ottenendo

[  
|\lambda-a_{i_0i_0}|  
\le  
\sum_{\substack{j=1\j\neq i_0}}^n |a_{i_0j}|.  
]

Ma questa disuguaglianza dice precisamente che (\lambda) appartiene al cerchio di Gershgorin

# [  
K_{i_0}

\mathcal{C}\left(a_{i_0i_0},  
\sum_{\substack{j=1\j\neq i_0}}^n |a_{i_0j}|  
\right).  
]

Infatti, per definizione, un punto (z\in\mathbb{C}) appartiene a questo cerchio se la sua distanza dal centro (a_{i_0i_0}) è minore o uguale al raggio, cioè se

[  
|z-a_{i_0i_0}|  
\le  
\sum_{\substack{j=1\j\neq i_0}}^n |a_{i_0j}|.  
]

Nel nostro caso (z=\lambda), quindi

[  
\lambda\in K_{i_0}.  
]

Abbiamo dimostrato che un autovalore generico (\lambda) appartiene ad almeno uno dei cerchi di Gershgorin. Poiché (\lambda) era arbitrario, tutti gli autovalori di (A) appartengono all’unione

[  
K_1\cup K_2\cup\dots\cup K_n.  
]

Questo conclude la dimostrazione.

---

## Conclusione da orale

In conclusione, il primo teorema di Gershgorin permette di localizzare tutti gli autovalori di una matrice (A) nell’unione dei cerchi costruiti a partire dalle righe della matrice. Ogni cerchio ha centro nell’elemento diagonale (a_{ii}) e raggio uguale alla somma dei moduli degli elementi non diagonali della stessa riga.

La parte fondamentale della dimostrazione è scegliere una componente dell’autovettore di modulo massimo. Questa scelta permette di controllare tutte le altre componenti dell’autovettore e di ottenere la disuguaglianza

[  
|\lambda-a_{ii}|  
\le  
\sum_{\substack{j=1\j\neq i}}^n |a_{ij}|,  
]

che è esattamente la condizione geometrica per dire che (\lambda) appartiene al cerchio di Gershgorin (K_i).

# Teorema 3.5 — Terzo teorema di Gershgorin, versione forte

Siamo ancora nella sezione sulla **localizzazione degli autovalori**. Prima abbiamo visto che il primo teorema di Gershgorin dice dove possono stare gli autovalori: essi appartengono all’unione dei cerchi di Gershgorin. Il terzo teorema, invece, ha un ruolo diverso: serve a **escludere alcuni punti** dai possibili autovalori. Per questo nelle dispense viene detto che è un teorema “esclusivo”.

## Script da orale

Considero una matrice

[  
A\in\mathbb{C}^{n\times n}.  
]

Dire che (A\in\mathbb{C}^{n\times n}) significa che (A) è una matrice quadrata di ordine (n), cioè con (n) righe e (n) colonne, e con elementi complessi.

Suppongo che (A) sia **irriducibile**. Con matrice irriducibile intendo che il grafo associato alla matrice è fortemente connesso. Il grafo associato ad (A=(a_{ij})) ha come nodi gli indici

[  
1,\dots,n,  
]

e contiene una freccia

[  
i\to j  
]

se e solo se

[  
a_{ij}\neq 0.  
]

Dire che questo grafo è fortemente connesso significa che da ogni nodo posso raggiungere ogni altro nodo seguendo le frecce del grafo.

A questo punto considero i cerchi di Gershgorin della matrice (A). Per ogni riga (i), il cerchio di Gershgorin è

[  
K_i=  
\mathcal{C}\left(a_{ii},\sum_{\substack{j=1\j\neq i}}^n |a_{ij}|\right).  
]

Quindi il centro è l’elemento diagonale (a_{ii}), mentre il raggio è la somma dei moduli degli elementi della riga (i)-esima escluso l’elemento diagonale.

Il **terzo teorema di Gershgorin forte** afferma che:

> Se (A\in\mathbb{C}^{n\times n}) è irriducibile, allora i punti che stanno sul bordo dei cerchi di Gershgorin a cui appartengono, ma non stanno sul bordo di tutti i cerchi, non sono autovalori di (A).

Quindi, preso un punto (z\in\mathbb{C}), il teorema dice che (z) non può essere autovalore se valgono queste due condizioni:

[  
z \text{ sta sul bordo dei cerchi a cui appartiene}  
]

ma

[  
z \text{ non sta sul bordo di tutti i cerchi}.  
]

La frase “sta sul bordo dei cerchi a cui appartiene” significa questo: se (z) appartiene, per esempio, ai cerchi (K_1) e (K_2), allora deve stare sul bordo di (K_1) e sul bordo di (K_2). Non deve stare all’interno di uno di questi cerchi.

Invece la frase “non sta sul bordo di tutti i cerchi” significa che esiste almeno un cerchio di Gershgorin (K_m) tale che (z) non sta sul bordo di (K_m). Può succedere che (z) non appartenga proprio a (K_m), oppure che stia dentro (K_m), ma non sul suo bordo. In entrambi i casi, (z) non sta sul bordo di tutti i cerchi.

Quindi il teorema forte non dice che tutti i punti di bordo sono esclusi. Dice una cosa più precisa:

[  
\boxed{  
\text{sono esclusi i punti che stanno sul bordo dei cerchi a cui appartengono, ma non sul bordo di tutti i cerchi.}  
}  
]

Per esempio, nelle dispense si dice che, in una certa configurazione di cerchi, il punto (0) sta sul bordo dei quattro cerchi grandi a cui appartiene, ma non sta sul bordo del cerchio piccolo; quindi, se la matrice è irriducibile, (0) non può essere autovalore.

Questa osservazione è molto importante perché, se riesco a dimostrare che (0) non è autovalore, allora posso concludere che (A) è invertibile. Infatti una matrice quadrata è invertibile se e solo se (0) non è un suo autovalore.

## Conclusione da orale

In conclusione, il terzo teorema di Gershgorin forte serve a escludere certi punti dai possibili autovalori quando la matrice è irriducibile. A differenza del primo teorema, che dice dove gli autovalori possono stare, il terzo teorema dice dove sicuramente non possono stare. In particolare, un punto che sta sul bordo dei cerchi a cui appartiene, ma non sul bordo di tutti i cerchi, non può essere un autovalore.

---

# Teorema 3.6 — Terzo teorema di Gershgorin, versione debole

La versione debole è una conseguenza più semplice della versione forte. È detta “debole” perché considera solo i punti che stanno sul **bordo dell’unione** dei cerchi di Gershgorin, mentre la versione forte può escludere anche punti che sono interni all’unione complessiva, purché stiano sul bordo dei cerchi a cui appartengono. Le dispense presentano infatti il Teorema 3.6 come una versione più debole ma più semplice del terzo teorema.

## Script da orale

Suppongo ancora che

[  
A\in\mathbb{C}^{n\times n}  
]

sia una matrice irriducibile.

Indico con

[  
K_1,\dots,K_n  
]

i cerchi di Gershgorin di (A). Considero ora l’unione di tutti questi cerchi:

[  
K_1\cup K_2\cup\dots\cup K_n.  
]

Indico con (B) il bordo di questa unione:

[  
B=\partial(K_1\cup K_2\cup\dots\cup K_n).  
]

Qui (B) rappresenta il bordo esterno della figura complessiva ottenuta unendo tutti i cerchi. È importante distinguere tra:

[  
\partial K_1,\dots,\partial K_n  
]

cioè i bordi dei singoli cerchi, e

[  
\partial(K_1\cup\dots\cup K_n),  
]

cioè il bordo dell’unione complessiva.

Questi due insiemi non sono la stessa cosa. Se due cerchi si sovrappongono, una parte del bordo di un singolo cerchio può finire all’interno dell’altro cerchio. Quella parte è ancora bordo del singolo cerchio, ma non è più bordo esterno dell’unione.

Il **terzo teorema di Gershgorin debole** afferma che:

> Se (A\in\mathbb{C}^{n\times n}) è irriducibile e (B) è il bordo dell’unione dei cerchi di Gershgorin, allora i punti di (B) che non stanno sul bordo di tutti i cerchi non sono autovalori di (A).

Quindi, preso un punto

[  
z\in B,  
]

se (z) non sta sul bordo di tutti i cerchi di Gershgorin, allora (z) non può essere un autovalore.

---

## Dimostrazione del Teorema 3.6

Dimostriamo la versione debole usando la versione forte.

Sia

[  
z\in B,  
]

dove (B) è il bordo dell’unione dei cerchi di Gershgorin.

Poiché (z) sta sul bordo dell’unione dei cerchi, allora (z) deve stare sul bordo dei cerchi a cui appartiene. Infatti, se (z) fosse interno a uno dei cerchi a cui appartiene, allora non sarebbe un punto del bordo dell’unione, ma sarebbe un punto interno alla figura complessiva.

Quindi ogni punto di (B) soddisfa automaticamente la prima condizione del teorema forte:

[  
z \text{ sta sul bordo dei cerchi a cui appartiene}.  
]

Adesso supponiamo anche che (z) non stia sul bordo di tutti i cerchi.

Allora (z) soddisfa anche la seconda condizione del teorema forte:

[  
z \text{ non sta sul bordo di tutti i cerchi}.  
]

Dunque (z) soddisfa le ipotesi del terzo teorema di Gershgorin forte. Siccome (A) è irriducibile, il teorema forte ci permette di concludere che (z) non è un autovalore di (A).

Quindi ogni punto del bordo dell’unione dei cerchi che non sta sul bordo di tutti i cerchi va escluso dall’insieme dei possibili autovalori. Questo dimostra il Teorema 3.6. Le dispense riassumono proprio questo passaggio dicendo che ogni punto di (B) sta per forza sul bordo dei cerchi a cui appartiene, e quindi, se non sta sul bordo di tutti i cerchi, soddisfa le ipotesi del terzo teorema di Gershgorin.

---

# Differenza tra 3.5 e 3.6

La differenza fondamentale è questa:

[  
\boxed{  
\text{il Teorema 3.5 guarda i bordi dei singoli cerchi}  
}  
]

mentre

[  
\boxed{  
\text{il Teorema 3.6 guarda solo il bordo dell’unione dei cerchi.}  
}  
]

Il Teorema 3.5 è più forte perché può escludere anche punti che non stanno sul bordo esterno dell’unione, ma che stanno comunque sul bordo dei cerchi a cui appartengono.

Il Teorema 3.6 è più debole perché considera solo i punti del bordo esterno dell’unione.

Questo è il motivo per cui nell’esempio del quadrifoglio delle dispense il punto (0) si può escludere con il teorema forte, ma non con quello debole: (0) sta sul bordo dei cerchi grandi a cui appartiene e non sul bordo del cerchio piccolo, quindi soddisfa il teorema forte; però (0) non sta sul bordo dell’unione dei cerchi, bensì all’interno dell’unione, quindi il teorema debole non può essere usato.

## Frase finale da orale

> “Il Teorema 3.5, cioè la versione forte, esclude i punti che stanno sul bordo dei cerchi a cui appartengono ma non sul bordo di tutti i cerchi. Il Teorema 3.6, cioè la versione debole, applica questa idea solo ai punti del bordo dell’unione dei cerchi. Per questo è più debole: perché lavora solo sul bordo esterno della figura complessiva, mentre il teorema forte può escludere anche punti interni all’unione.”
