# Riassunto geometrico utile per SVD e LSI

### 1. Autovettori e autovalori
Un autovettore è una direzione speciale di una matrice.
Se:
$$Sv = \lambda v$$
allora:
- $v$ è un autovettore;
- $\lambda$ è il suo autovalore.
Geometricamente significa che la matrice $S$, applicata a $v$, non cambia la direzione del vettore, ma lo scala soltanto.
Quindi:
- se $\lambda = 3$, il vettore viene allungato di 3;
- se $\lambda = 1$, resta lungo uguale;
- se $\lambda = 0$, quella componente viene annullata;
- se $\lambda$ è piccolo, quella direzione contribuisce poco.
Idea da ricordare per LSI:
le direzioni con valori grandi sono importanti; quelle con valori piccoli possono rappresentare dettagli deboli o rumore.

### 2. Scrivere un vettore come combinazione di autovettori
Un vettore qualsiasi può essere scritto come combinazione di autovettori, ad esempio:
$$x = 2v_1 + 4v_2 + 6v_3$$
Se gli autovalori associati sono:
3, 2, 0
allora applicare la matrice diventa semplice:
$$Sx = 2 \cdot 3v_1 + 4 \cdot 2v_2 + 6 \cdot 0v_3$$
Quindi la componente lungo $v_3$ sparisce.

Da ricordare:

una matrice può essere capita guardando come agisce sulle sue direzioni principali.

### 3. Matrici simmetriche

Una matrice è simmetrica se:

$$S = S^T$$

cioè se è uguale alla sua trasposta.

Attenzione: non vuol dire che i valori sulla diagonale devono essere tutti uguali.

Vuol dire che la matrice è “specchiata” rispetto alla diagonale principale.

Esempio simmetrico:

$$\begin{pmatrix} 1 & 5 \\ 5 & 2 \end{pmatrix}$$

Esempio non simmetrico:

$$\begin{pmatrix} 1 & 5 \\ 3 & 2 \end{pmatrix}$$

Perché sono importanti?

Perché le matrici simmetriche hanno proprietà molto comode:

- autovalori reali;
    
- autovettori ortogonali se associati ad autovalori distinti;
    
- decomposizione più pulita.
    

### 4. Ortogonalità

Due vettori sono ortogonali se il loro prodotto scalare è zero:

$$v_1 \cdot v_2 = 0$$

Geometricamente significa che sono perpendicolari.

Per noi è importante perché direzioni ortogonali sono direzioni indipendenti, cioè non sovrapposte.

Idea da ricordare:

nella riduzione dimensionale vogliamo trovare assi puliti, indipendenti e ordinabili per importanza.

### 5. Matrici positive semidefinite

Una matrice positiva semidefinita ha autovalori:

$$\lambda \geq 0$$

Quindi gli autovalori possono essere zero o positivi, ma non negativi.

Questa cosa sarà utile perché nella SVD compariranno matrici come:

$$AA^T$$

e

$$A^TA$$

che sono simmetriche e positive semidefinite.

Quindi avranno:

- autovalori non negativi;
    
- autovettori ortogonali;
    
- una buona interpretazione geometrica.
    

### 6. Decomposizione agli autovalori

Se una matrice quadrata $S$ ha abbastanza autovettori indipendenti, può essere scritta come:

$$S = U \Lambda U^{-1}$$

Dove:

- $U$ contiene gli autovettori come colonne;
    
- $\Lambda$ contiene gli autovalori sulla diagonale;
    
- $U^{-1}$ serve per tornare al sistema originale.
    

Interpretazione:

- cambio sistema di riferimento;
    
- scalo ogni direzione principale;
    
- torno al sistema iniziale.
    

Il cuore è $\Lambda$, perché è diagonale: ogni componente viene scalata separatamente, senza mescolarsi con le altre.

### 7. Caso simmetrico: decomposizione più bella

Se $S$ è simmetrica, la decomposizione diventa:

$$S = Q \Lambda Q^T$$

Questo perché $Q$ è una matrice ortogonale, quindi:

$$Q^{-1} = Q^T$$

In pratica, invece di calcolare l’inversa, basta fare la trasposta.

Da ricordare:

nel caso simmetrico gli autovettori formano una base ortogonale e normalizzata, quindi la decomposizione è molto più pulita.

### 8. Normalizzare un vettore

Normalizzare un vettore significa dividerlo per la sua lunghezza, così otteniamo un vettore di lunghezza 1.

La lunghezza è:

$$\|v\| = \sqrt{v_1^2 + v_2^2 + \dots + v_n^2}$$

Esempio:

$$v = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$$

ha lunghezza:

$$\sqrt{2}$$

quindi il vettore normalizzato è:

$$\begin{pmatrix} \frac{1}{\sqrt{2}} \\ \frac{1}{\sqrt{2}} \end{pmatrix}$$

Normalizzare non cambia la direzione, cambia solo la lunghezza.

### 9. Il problema per l’Information Retrieval

Fin qui abbiamo parlato soprattutto di matrici quadrate.

Ma nel Vector Space Model e nella LSI usiamo una matrice termine-documento:

$$A \in \mathbb{R}^{m \times n}$$

dove:

- le righe sono i termini;
    
- le colonne sono i documenti;
    
- ogni cella rappresenta il peso di un termine in un documento, ad esempio frequenza, TF-IDF o altro peso.
    

Questa matrice di solito è rettangolare, non quadrata.

Quindi non posso applicare direttamente la decomposizione agli autovalori vista prima.

Da qui nasce il bisogno della SVD.