# Teorema 3.12 — Convergenza delle potenze di una matrice

## Contesto

Il Teorema 3.12 è uno dei risultati più importanti da portare avanti nei **metodi iterativi**.

L’idea è questa: nei metodi iterativi compaiono spesso successioni di matrici del tipo

[  
A^0,\ A^1,\ A^2,\ \dots,\ A^k,\dots  
]

oppure, nella parte successiva, successioni del tipo

[  
P^k,  
]

dove (P) è la matrice di iterazione del metodo. Infatti, nel Teorema 4.1 delle dispense, quando si studia l’errore

[  
e^{(k)}=x^{(k)}-x,  
]

si arriva alla formula

[  
e^{(k)}=P^k e^{(0)}.  
]

A quel punto, per dimostrare che l’errore tende a zero, serve sapere quando

[  
P^k\to O,  
]

dove (O) è la matrice nulla. Le dispense usano proprio il Teorema 3.12 per dire che, se (\rho(P)<1), allora (P^k\to O).

---

# Enunciato

Sia

[  
A\in\mathbb{C}^{n\times n}.  
]

Allora

[  
\boxed{  
A^k\to O  
\quad \Longleftrightarrow \quad  
\rho(A)<1.  
}  
]

Dove:

[  
A^k  
]

è la potenza (k)-esima della matrice (A);

[  
O  
]

è la matrice nulla;

[  
\rho(A)  
]

è il **raggio spettrale** di (A), cioè

[  
\rho(A)=\max{|\lambda|:\lambda \text{ è autovalore di }A}.  
]

Quindi il teorema dice:

> Le potenze (A^k) tendono alla matrice nulla se e solo se tutti gli autovalori di (A) hanno modulo strettamente minore di (1).

In altre parole:

[  
A^k\to O  
]

succede precisamente quando ogni autovalore (\lambda_i) di (A) soddisfa

[  
|\lambda_i|<1.  
]

---

# Significato intuitivo

Il teorema è l’analogo matriciale del fatto che, per un numero reale o complesso (\lambda),

[  
\lambda^k\to 0  
\quad \Longleftrightarrow \quad  
|\lambda|<1.  
]

Per le matrici, però, non basta guardare un singolo numero: bisogna guardare tutti gli autovalori. Il numero che riassume questa informazione è il raggio spettrale:

[  
\rho(A)=\max_i|\lambda_i|.  
]

Quindi:

[  
\rho(A)<1  
]

significa che anche l’autovalore più grande in modulo sta dentro il disco unitario. Di conseguenza, tutti gli autovalori hanno modulo minore di (1), e le loro potenze tendono a zero.

---

# Dimostrazione nel caso diagonalizzabile

Facciamo prima la dimostrazione nel caso più semplice, cioè quando (A) è diagonalizzabile.

Supponiamo quindi che (A) sia diagonalizzabile. Questo significa che esistono una matrice invertibile (X) e una matrice diagonale (D) tali che

[  
A=XDX^{-1}.  
]

La matrice (D) contiene gli autovalori di (A) sulla diagonale:

[  
D=  
\begin{pmatrix}  
\lambda_1 & 0 & \cdots & 0\  
0 & \lambda_2 & \cdots & 0\  
\vdots & \vdots & \ddots & \vdots\  
0 & 0 & \cdots & \lambda_n  
\end{pmatrix}.  
]

Qui (X) è la matrice che ha come colonne gli autovettori di (A). La matrice (X) è invertibile perché, nel caso diagonalizzabile, questi autovettori formano una base di (\mathbb{C}^n).

Ora calcoliamo le potenze di (A). Poiché

[  
A=XDX^{-1},  
]

si ha

[  
A^2=(XDX^{-1})(XDX^{-1}).  
]

Nel prodotto centrale compare

[  
X^{-1}X=I,  
]

quindi

[  
A^2=XDID X^{-1}=XD^2X^{-1}.  
]

Ripetendo lo stesso ragionamento, otteniamo

[  
A^k=XD^kX^{-1}.  
]

La matrice (D^k) è ancora diagonale, e sulla diagonale contiene le potenze degli autovalori:

[  
D^k=  
\begin{pmatrix}  
\lambda_1^k & 0 & \cdots & 0\  
0 & \lambda_2^k & \cdots & 0\  
\vdots & \vdots & \ddots & \vdots\  
0 & 0 & \cdots & \lambda_n^k  
\end{pmatrix}.  
]

A questo punto prendiamo una norma matriciale, per esempio la norma infinito. Essendo una norma, vale sempre la positività:

[  
0\leq |A^k|_\infty.  
]

Inoltre,

# [  
|A^k|_\infty

|XD^kX^{-1}|_\infty.  
]

Usiamo ora la **submoltiplicatività** della norma matriciale indotta, cioè

[  
|BC|\leq |B||C|.  
]

Applicata al prodotto di tre matrici, questa proprietà dà

[  
|XD^kX^{-1}|_\infty  
\leq  
|X|_\infty|D^k|_\infty|X^{-1}|_\infty.  
]

Quindi

[  
0\leq |A^k|_\infty  
\leq  
|X|_\infty|D^k|_\infty|X^{-1}|_\infty.  
]

Ora calcoliamo

[  
|D^k|_\infty.  
]

La norma infinito di una matrice è il massimo delle somme dei moduli lungo le righe:

# [  
|M|_\infty

\max_i \sum_{j=1}^n |m_{ij}|.  
]

Nel caso di (D^k), però, la matrice è diagonale. Quindi in ogni riga c’è un solo elemento eventualmente diverso da zero, cioè (\lambda_i^k). Perciò la somma dei moduli nella riga (i)-esima è

[  
|\lambda_i^k|.  
]

Dunque

# [  
|D^k|_\infty

\max_i |\lambda_i^k|.  
]

Ora usiamo la proprietà del modulo complesso:

[  
|\lambda_i^k|=|\lambda_i|^k.  
]

Questa vale perché

[  
\lambda_i^k=\lambda_i\lambda_i\cdots \lambda_i  
]

e il modulo di un prodotto è il prodotto dei moduli.

Quindi

# [  
|D^k|_\infty

\max_i |\lambda_i|^k.  
]

Poiché

[  
\rho(A)=\max_i|\lambda_i|,  
]

otteniamo

# [  
\max_i|\lambda_i|^k

# \left(\max_i|\lambda_i|\right)^k

\rho(A)^k.  
]

Quindi

[  
|D^k|_\infty=\rho(A)^k.  
]

Sostituendo nella stima precedente:

[  
0\leq |A^k|_\infty  
\leq  
|X|_\infty|X^{-1}|_\infty \rho(A)^k.  
]

Ora, se

[  
\rho(A)<1,  
]

allora

[  
\rho(A)^k\to 0.  
]

Le quantità

[  
|X|_\infty  
]

e

[  
|X^{-1}|_\infty  
]

sono costanti positive, indipendenti da (k). Quindi

[  
|X|_\infty|X^{-1}|_\infty \rho(A)^k\to 0.  
]

Abbiamo allora

[  
0\leq |A^k|_\infty  
\leq  
|X|_\infty|X^{-1}|_\infty \rho(A)^k  
\to 0.  
]

Per il teorema del confronto, detto anche teorema dei carabinieri, otteniamo

[  
|A^k|_\infty\to 0.  
]

Questo significa che

[  
A^k\to O.  
]

Quindi abbiamo dimostrato, nel caso diagonalizzabile, che

[  
\rho(A)<1  
\quad \Longrightarrow \quad  
A^k\to O.  
]

---

# Perché la disuguaglianza è vera

Il passaggio

[  
0\leq |A^k|_\infty  
\leq  
|X|_\infty |X^{-1}|_\infty \rho(A)^k  
]

usa tre idee:

la prima è la **positività della norma**:

[  
|A^k|_\infty\geq 0;  
]

la seconda è la **submoltiplicatività**:

[  
|XD^kX^{-1}|_\infty  
\leq  
|X|_\infty|D^k|_\infty|X^{-1}|_\infty;  
]

la terza è che, essendo (D^k) diagonale,

[  
|D^k|_\infty=\rho(A)^k.  
]

---

# Dimostrazione dell’implicazione opposta

Ora dimostriamo l’altra direzione:

[  
A^k\to O  
\quad \Longrightarrow \quad  
\rho(A)<1.  
]

Supponiamo quindi che

[  
A^k\to O.  
]

Vogliamo dimostrare che tutti gli autovalori di (A) hanno modulo strettamente minore di (1).

Sia (\lambda) un autovalore qualunque di (A), e sia

[  
x\neq 0  
]

un autovettore associato. Per definizione:

[  
Ax=\lambda x.  
]

Allora, applicando (A) più volte, otteniamo

[  
A^k x=\lambda^k x.  
]

Questo si può dimostrare per ricorrenza:

per (k=1) è vero perché

[  
Ax=\lambda x.  
]

Se è vero per (k), allora

[  
A^{k+1}x=A(A^k x)=A(\lambda^k x)=\lambda^k Ax=\lambda^k\lambda x=\lambda^{k+1}x.  
]

Poiché

[  
A^k\to O,  
]

allora

[  
A^k x\to Ox=0.  
]

Ma

[  
A^k x=\lambda^k x.  
]

Quindi

[  
\lambda^k x\to 0.  
]

Siccome (x\neq 0), questo può succedere solo se

[  
\lambda^k\to 0.  
]

Per un numero complesso (\lambda),

[  
\lambda^k\to 0  
\quad \Longleftrightarrow \quad  
|\lambda|<1.  
]

Quindi ogni autovalore (\lambda) di (A) soddisfa

[  
|\lambda|<1.  
]

Pertanto anche il massimo dei moduli degli autovalori è minore di (1):

[  
\rho(A)<1.  
]

Abbiamo quindi dimostrato anche

[  
A^k\to O  
\quad \Longrightarrow \quad  
\rho(A)<1.  
]

---

# Nota sul caso generale

La dimostrazione completa del caso

[  
\rho(A)<1 \Longrightarrow A^k\to O  
]

per matrici non diagonalizzabili richiede di usare la forma di Jordan oppure un argomento equivalente. L’idea però resta la stessa: anche quando (A) non è diagonalizzabile, le potenze (A^k) sono governate dagli autovalori. Se tutti gli autovalori hanno modulo minore di (1), allora le potenze tendono alla matrice nulla.

Nei tuoi passaggi precedenti, la dimostrazione che stavi studiando usa chiaramente il caso diagonalizzabile, perché introduce

[  
A=XDX^{-1}.  
]

Quindi lo script sopra è perfettamente allineato con quella parte.

---

# Collegamento con il Teorema 4.1

Il Teorema 3.12 viene usato subito dopo nei metodi iterativi. Nel Teorema 4.1, infatti, dalle equazioni del metodo si ottiene

[  
e^{(k)}=P^k e^{(0)}.  
]

Se

[  
\rho(P)<1,  
]

allora per il Teorema 3.12

[  
P^k\to O.  
]

Quindi

[  
e^{(k)}=P^k e^{(0)}\to 0,  
]

e quindi

[  
x^{(k)}\to x.  
]

Questo è il motivo per cui nei metodi iterativi il criterio fondamentale di convergenza è

[  
\rho(P)<1.  
]

---

# Frase finale da orale

> “Il Teorema 3.12 afferma che, per una matrice (A\in\mathbb{C}^{n\times n}), le potenze (A^k) convergono alla matrice nulla se e solo se il raggio spettrale di (A) è strettamente minore di (1). Il significato è che la convergenza delle potenze della matrice è determinata dagli autovalori: se tutti gli autovalori hanno modulo minore di (1), allora le loro potenze tendono a zero e quindi anche (A^k) tende a (O). Questo risultato è fondamentale nei metodi iterativi, perché permette di passare dalla condizione (\rho(P)<1) alla convergenza dell’errore (e^{(k)}=P^k e^{(0)}).”