Certo. Ti scrivo il blocco completo da aggiungere agli appunti: **Teorema 3.8 + significato + dimostrazione della parte sulle successioni di vettori**, in stile “script da orale”, con le spiegazioni già incorporate.

---

# Teorema 3.8 — Equivalenza delle norme vettoriali

Siamo nella parte dedicata alle **norme vettoriali**. L’idea è introdurre un modo per misurare la “grandezza” di un vettore e quindi anche la distanza tra due vettori. Per esempio, se abbiamo una soluzione esatta (x) di un sistema lineare e due approssimazioni (y) e (z), per decidere quale approssimazione è migliore dobbiamo confrontare le distanze

[  
|x-y|,  
\qquad  
|x-z|.  
]

Per fare questo serve una norma vettoriale. Nei tuoi appunti viene prima richiamata la definizione di norma vettoriale, poi le norme (1), (2) e (\infty), e infine si arriva al Teorema 3.8 sull’equivalenza delle norme.

---

## Definizione di norma vettoriale

Una funzione

[  
|\cdot|:\mathbb{C}^n\to\mathbb{R}  
]

si dice **norma vettoriale** se soddisfa tre proprietà.

La prima è la **positività**:

[  
|x|\geq 0  
\qquad \forall x\in\mathbb{C}^n  
]

e

[  
|x|=0 \iff x=0.  
]

Questa proprietà dice che la lunghezza di un vettore non può essere negativa e che l’unico vettore di lunghezza nulla è il vettore nullo.

La seconda proprietà è l’**omogeneità**:

[  
|\alpha x|=|\alpha||x|  
\qquad  
\forall \alpha\in\mathbb{C},\ \forall x\in\mathbb{C}^n.  
]

Questa dice che, se moltiplico un vettore per uno scalare (\alpha), allora la sua norma viene moltiplicata per il modulo di (\alpha).

La terza proprietà è la **disuguaglianza triangolare**:

[  
|x+y|\leq |x|+|y|  
\qquad  
\forall x,y\in\mathbb{C}^n.  
]

Questa dice che la lunghezza della somma di due vettori non supera la somma delle loro lunghezze.

Data una norma, la distanza tra due vettori (x,y\in\mathbb{C}^n) si definisce come

[  
|x-y|.  
]

---

## Le norme principali

Dato

[  
x=  
\begin{pmatrix}  
x_1\  
x_2\  
\vdots\  
x_n  
\end{pmatrix}  
\in\mathbb{C}^n,  
]

le tre norme più importanti sono:

[  
|x|_1=|x_1|+|x_2|+\cdots+|x_n|,  
]

[  
|x|_2=  
\sqrt{|x_1|^2+|x_2|^2+\cdots+|x_n|^2},  
]

[  
|x|_\infty=  
\max{|x_1|,|x_2|,\ldots,|x_n|}.  
]

La norma (1) somma i moduli delle componenti, la norma (2) è la norma euclidea, mentre la norma infinito prende la componente più grande in modulo.

---

# Enunciato del Teorema 3.8

Il Teorema 3.8 afferma che **tutte le norme vettoriali in (\mathbb{C}^n) sono equivalenti**.

Più precisamente, se

[  
|\cdot|'  
]

e

[  
|\cdot|''  
]

sono due norme vettoriali qualunque su (\mathbb{C}^n), allora esistono due costanti positive

[  
\alpha,\beta>0  
]

tali che

[  
\alpha|x|''\leq |x|'\leq \beta|x|''  
\qquad \forall x\in\mathbb{C}^n.  
]

Le costanti (\alpha) e (\beta) sono indipendenti da (x). Possono dipendere dalle due norme considerate e dalla dimensione (n), ma non dal vettore specifico.

---

## Significato del teorema

Dire che due norme sono equivalenti significa che ciascuna delle due può essere controllata dall’altra, a meno di moltiplicare per costanti positive.

Quindi due norme diverse possono dare valori numerici diversi, ma in dimensione finita non possono comportarsi in modo completamente diverso.

Il messaggio importante è:

[  
\boxed{  
\text{in } \mathbb{C}^n \text{ tutte le norme descrivono lo stesso concetto di convergenza.}  
}  
]

Cioè, se una successione di vettori converge rispetto a una norma, allora converge rispetto a tutte le altre norme.

---

# Esempio: equivalenza tra norma (1) e norma (\infty)

Verifichiamo che la norma (1) e la norma infinito sono equivalenti.

Per ogni

[  
x\in\mathbb{C}^n  
]

vale

[  
|x|_\infty\leq |x|_1\leq n|x|_\infty.  
]

Vediamo perché.

Per definizione,

[  
|x|_\infty=\max{|x_1|,\dots,|x_n|}.  
]

Quindi (|x|_\infty) è il massimo tra i moduli delle componenti di (x).

La prima disuguaglianza è

[  
|x|_\infty\leq |x|_1.  
]

Questa è vera perché il massimo dei moduli delle componenti è certamente minore o uguale alla somma di tutti i moduli:

[  
\max{|x_1|,\dots,|x_n|}  
\leq  
|x_1|+\dots+|x_n|.  
]

La seconda disuguaglianza è

[  
|x|_1\leq n|x|_\infty.  
]

Questa è vera perché ogni componente soddisfa

[  
|x_i|\leq |x|_\infty  
\qquad \forall i=1,\dots,n.  
]

Quindi

[  
|x_1|+\cdots+|x_n|  
\leq  
|x|_\infty+\cdots+|x|_\infty.  
]

A destra ho (|x|_\infty) sommato (n) volte, quindi

# [  
|x|_1

|x_1|+\cdots+|x_n|  
\leq  
n|x|_\infty.  
]

Pertanto

[  
|x|_\infty\leq |x|_1\leq n|x|_\infty.  
]

Questa è proprio una relazione di equivalenza tra le due norme.

Se considero

[  
|x|'=|x|_1  
]

e

[  
|x|''=|x|_\infty,  
]

allora posso scrivere

[  
1\cdot |x|_\infty\leq |x|_1\leq n|x|_\infty.  
]

Quindi in questo caso posso prendere

[  
\alpha=1,  
\qquad  
\beta=n.  
]

Se invece voglio mettere al centro la norma infinito, posso partire dalla stessa catena

[  
|x|_\infty\leq |x|_1\leq n|x|_\infty.  
]

Dalla seconda disuguaglianza ottengo

[  
\frac{1}{n}|x|_1\leq |x|_\infty.  
]

Inoltre dalla prima ho

[  
|x|_\infty\leq |x|_1.  
]

Quindi

[  
\frac{1}{n}|x|_1\leq |x|_\infty\leq |x|_1.  
]

Se considero

[  
|x|'=|x|_\infty,  
\qquad  
|x|''=|x|_1,  
]

allora posso prendere

[  
\alpha=\frac{1}{n},  
\qquad  
\beta=1.  
]

Questo spiega perché le costanti cambiano quando invertiamo l’ordine delle due norme.

---

# Successioni di vettori

Una successione di vettori

[  
x^{(0)},x^{(1)},x^{(2)},\dots  
]

in (\mathbb{C}^n) si dice **convergente al vettore (x\in\mathbb{C}^n) rispetto alla norma (|\cdot|)** se

[  
|x^{(k)}-x|\to 0  
\qquad \text{per } k\to+\infty.  
]

Cioè la distanza tra (x^{(k)}) e (x), misurata con quella norma, tende a zero.

---

# Conseguenza del Teorema 3.8 sulla convergenza

Poiché tutte le norme vettoriali in (\mathbb{C}^n) sono equivalenti, se una successione di vettori converge rispetto a una norma, allora converge rispetto a tutte le norme.

Dimostriamolo.

Supponiamo che

[  
x^{(k)}\to x  
]

rispetto alla norma (|\cdot|). Per definizione questo significa che

[  
|x^{(k)}-x|\to 0.  
]

Sia ora

[  
|\cdot|'  
]

un’altra norma vettoriale su (\mathbb{C}^n). Vogliamo dimostrare che

[  
x^{(k)}\to x  
]

anche rispetto a questa seconda norma, cioè vogliamo dimostrare che

[  
|x^{(k)}-x|'\to 0.  
]

Per il Teorema 3.8, le due norme sono equivalenti. Quindi esistono due costanti positive

[  
\alpha,\beta>0  
]

tali che

[  
\alpha|y|\leq |y|'\leq \beta|y|  
\qquad \forall y\in\mathbb{C}^n.  
]

Questa disuguaglianza vale per ogni vettore (y), quindi possiamo applicarla al vettore

[  
y=x^{(k)}-x.  
]

Otteniamo

[  
\alpha|x^{(k)}-x|  
\leq  
|x^{(k)}-x|'  
\leq  
\beta|x^{(k)}-x|.  
]

Ora sappiamo che

[  
|x^{(k)}-x|\to 0.  
]

Moltiplicando per una costante positiva, il limite resta zero, quindi

[  
\alpha|x^{(k)}-x|\to 0  
]

e

[  
\beta|x^{(k)}-x|\to 0.  
]

Inoltre, essendo una norma, il termine centrale è sempre non negativo:

[  
|x^{(k)}-x|'\geq 0.  
]

Quindi possiamo anche scrivere

[  
0  
\leq  
|x^{(k)}-x|'  
\leq  
\beta|x^{(k)}-x|.  
]

Poiché il membro destro tende a zero, per il teorema del confronto, detto anche teorema dei carabinieri, otteniamo

[  
|x^{(k)}-x|'\to 0.  
]

Quindi

[  
x^{(k)}\to x  
]

anche rispetto alla norma (|\cdot|').

Abbiamo così dimostrato che la convergenza di una successione di vettori in (\mathbb{C}^n) non dipende dalla norma scelta.

---

# Convergenza componente per componente

Una successione di vettori

[  
x^{(0)},x^{(1)},x^{(2)},\dots  
]

in (\mathbb{C}^n) si dice **convergente componente per componente** al vettore

[  
x=  
\begin{pmatrix}  
x_1\  
x_2\  
\vdots\  
x_n  
\end{pmatrix}  
]

se, scrivendo

[  
x^{(k)}=  
\begin{pmatrix}  
x_1^{(k)}\  
x_2^{(k)}\  
\vdots\  
x_n^{(k)}  
\end{pmatrix},  
]

vale

[  
x_i^{(k)}\to x_i  
\qquad  
\forall i=1,\dots,n.  
]

Cioè ogni componente della successione vettoriale converge alla corrispondente componente del vettore limite.

Equivalentemente,

[  
x_i^{(k)}-x_i\to 0  
\qquad  
\forall i=1,\dots,n.  
]

Poiché abbiamo un numero finito di componenti, questa condizione equivale a dire che il massimo degli errori componenti tende a zero:

[  
\max_{i=1,\dots,n}|x_i^{(k)}-x_i|\to 0.  
]

Ma questo massimo è esattamente la norma infinito del vettore differenza:

# [  
\max_{i=1,\dots,n}|x_i^{(k)}-x_i|

|x^{(k)}-x|_\infty.  
]

Quindi

[  
x^{(k)}\to x \text{ componente per componente}  
]

è equivalente a

[  
|x^{(k)}-x|_\infty\to 0.  
]

Cioè la convergenza componente per componente coincide con la convergenza rispetto alla norma infinito.

Ma, per il Teorema 3.8, tutte le norme vettoriali in (\mathbb{C}^n) sono equivalenti. Dunque dire che

[  
x^{(k)}\to x  
]

componente per componente è lo stesso che dire che

[  
x^{(k)}\to x  
]

rispetto a una qualunque norma vettoriale.

---

# Frase conclusiva da orale

> “Il Teorema 3.8 afferma che tutte le norme vettoriali su (\mathbb{C}^n) sono equivalenti. Questo significa che, date due norme, esistono due costanti positive che permettono di stimare una norma mediante l’altra. La conseguenza fondamentale è che, in dimensione finita, la convergenza di una successione di vettori non dipende dalla norma scelta: se una successione converge rispetto a una norma, allora converge rispetto a tutte. Inoltre, la convergenza componente per componente coincide con la convergenza rispetto alla norma infinito, e quindi, per equivalenza delle norme, coincide con la convergenza rispetto a qualsiasi norma vettoriale.”

