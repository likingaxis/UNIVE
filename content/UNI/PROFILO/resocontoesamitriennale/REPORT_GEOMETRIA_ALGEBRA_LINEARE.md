# Resoconto Corso: Geometria e Algebra Lineare

- **Anno:** 1° Anno Triennale
- **Area:** Matematica di Base, Algebra Lineare e Geometria Analitica nello Spazio
- **Riferimenti Didattici:** Testo di riferimento (Carrara), Esercizi Meccanici e Temi d'Esame (Appelli di Giugno, Luglio, Settembre)

---

## Obiettivi del Corso in Sintesi
Il corso introduce i fondamenti teorici e gli strumenti computazionali dell'algebra lineare e della geometria analitica affine ed euclidea nello spazio tridimensionale ($\mathbb{R}^3$). L'obiettivo primario è sviluppare padronanza operativa nella risoluzione e discussione di sistemi lineari, nella manipolazione di matrici, nello studio degli spazi vettoriali e delle trasformazioni lineari, nonché nell'analisi spettrale di matrici ed endomorfismi (autovalori, autovettori e diagonalizzazione) e nella classificazione geometrica di rette e piani.

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### Modulo 0: Geometria Affine nello Spazio Tridimensionale ($\mathbb{R}^3$)
- **Vettori Geometrici e Spazio Affine:**
  - Distinzione concettuale tra punto (posizione) e vettore applicato (segmento orientato dotato di modulo, direzione e verso).
  - Equipollenza tra vettori applicati e definizione delle classi di equivalenza dei vettori liberi.
  - Operazioni vettoriali elementari: somma (regola del parallelogramma), prodotto per scalare, prodotto vettoriale ($u \times v$) e vettore ortogonale/normale.
- **Rappresentazione della Retta nello Spazio:**
  - Equazione vettoriale e parametrica della retta: forma punto-direzione ($P(t) = P_0 + t \cdot \vec{v}$).
  - Equazioni cartesiane della retta come intersezione di due piani non paralleli.
  - Algoritmo di conversione tra forma parametrica e forma cartesiana e determinazione del vettore direttore.
- **Rappresentazione del Piano nello Spazio:**
  - Equazione parametrica del piano: passaggio per un punto e due vettori di giacitura linearmente indipendenti ($P(s, t) = P_0 + s \cdot \vec{v}_1 + t \cdot \vec{v}_2$).
  - Equazione cartesiana del piano ($ax + by + cz + d = 0$) e interpretazione geometrica del vettore normale $\vec{n} = (a, b, c)$ ottenuto tramite prodotto vettoriale $\vec{v}_1 \times \vec{v}_2$.
  - Piano passante per tre punti non allineati e condizioni di appartenenza punto-piano.
- **Posizioni Reciproche nello Spazio:**
  - **Relazione tra due rette:** Rette complanari (parallele distinte, coincidenti, incidenti in un unico punto) vs rette sghembe (non complanari, nessuna intersezione e direzioni non proporzionali). Schema di classificazione tramite uguaglianza parametrica e rango della matrice di giacitura.
  - **Relazione tra retta e piano:** Retta incidente (un punto), retta parallela al piano (nessuna intersezione), retta contenuta nel piano (infinite intersezioni).
  - **Relazione tra due piani:** Piani coincidenti, piani paralleli, piani incidenti lungo una retta (risoluzione del sistema cartesiano con variabile libera).

### Modulo 1: Spazi Vettoriali, Sottospazi, Basi e Dimensione
- **Struttura di Spazio Vettoriale:**
  - Definizione assiomatica su un campo ($\mathbb{R}$, cenni a campi finiti come $\mathbb{Z}_5$).
  - Proprietà delle operazioni di somma tra vettori e prodotto per scalare.
- **Sottospazi Vettoriali:**
  - Definizione e test di sottospazio: presenza del vettore nullo ($\vec{0}$), chiusura rispetto alla somma e al prodotto scalare.
  - Intersezione e somma di sottospazi; somma diretta ($V = U \oplus W$).
- **Combinazioni Lineari e Generatori:**
  - Concetto di combinazione lineare: $v = \sum \alpha_i v_i$.
  - Sottospazio generato ($\operatorname{Span}(v_1, \dots, v_k)$) e proprietà di minimalità.
  - Verifica dell'appartenenza di un vettore a uno Span ($v \in \operatorname{Span}(v_1, \dots, v_k)$) tramite sistema non omogeneo.
- **Indipendenza Lineare:**
  - Definizione di vettori linearmente indipendenti (combinazione lineare nulla solo se tutti gli scalari sono nulli) vs dipendenti.
  - Criterio pratico basato sul rango della matrice dei vettori posti in colonna.
- **Basi e Dimensione:**
  - Concetto di base come insieme ordinato di generatori linearmente indipendenti.
  - Unicità della rappresentazione delle coordinate di un vettore rispetto a una base fissata.
  - Dimensione di uno spazio vettoriale finitamente generato.
  - **Estrazione di una base:** Selezione dei vettori indipendenti associati alle colonne pivot dopo riduzione a scala di Gauss.
  - **Completamento di una base (Teorema del completamento):** Estensione di un insieme libero a una base dello spazio aggiungendo opportuni vettori della base canonica.

### Modulo 2: Calcolo Matriciale, Eliminazione di Gauss e Rango
- **Algebra delle Matrici:**
  - Operazioni: addizione, moltiplicazione per scalare, trasposta ($A^T$), proprietà di simmetria e antisimmetria.
  - Prodotto righe per colonne: definizione, proprietà associativa e distributiva, non-commutatività ed esistenza di divisori dello zero.
- **Algoritmo di Eliminazione di Gauss:**
  - Operazioni elementari sulle righe (scambio righe, moltiplicazione per scalare non nullo, somma di un multiplo di una riga a un'altra).
  - Forma a gradini (ridotta a scala) e identificazione delle posizioni dei pivot.
- **Concetto di Rango:**
  - Definizione di rango come numero massimo di righe/colonne linearmente indipendenti (numero di pivot della matrice ridotta).
  - Proprietà: $rg(A) = rg(A^T) \le \min(m, n)$.
  - Rango e generazione del sottospazio delle colonne e delle righe.

### Modulo 3: Sistemi di Equazioni Lineari e Teorema di Rouché-Capelli
- **Rappresentazione Matriciale:**
  - Scrittura compatta $A x = b$, con matrice dei coefficienti $A$, vettore delle incognite $x$ e vettore dei termini noti $b$.
  - Matrice completa (estesa) $[A \mid b]$.
- **Teorema di Rouché-Capelli:**
  - Compatibilità del sistema: ammette soluzioni se e solo se $rg(A) = rg(A \mid b)$.
  - Struttura dello spazio delle soluzioni:
    - $rg(A) = rg(A \mid b) = n$ (con $n$ incognite): soluzione unica (sistema determinato).
    - $rg(A) = rg(A \mid b) = r < n$: infinite soluzioni dipendenti da $n - r$ parametri liberi ($\infty^{n-r}$ soluzioni, sistema indeterminato).
    - $rg(A) < rg(A \mid b)$: nessuna soluzione (sistema incompatibile).
- **Sistemi Lineari con Parametro:**
  - Riduzione a scala parametrica e individuazione dei valori critici del parametro che annullano i pivot.
  - Discussione casistica per valori ordinari e valori speciali, con calcolo esplicito delle soluzioni.
- **Sistemi Omogenei ($A x = 0$):**
  - Esistenza garantita della soluzione banale ($x = 0$).
  - L'insieme delle soluzioni forma un sottospazio vettoriale di dimensione $n - rg(A)$.

### Modulo 4: Determinante, Invertibilità e Calcolo dell'Inversa
- **Proprietà del Determinante:**
  - Definizione assiomatica, sviluppo di Laplace lungo una riga o colonna qualsiasi.
  - Determinante di matrici triangolari e diagonali (prodotto degli elementi diagonali).
  - Matrici a blocchi: prodotto dei determinanti dei blocchi diagonali in presenza di blocchi nulli.
  - Comportamento del determinante rispetto alle operazioni elementari di Gauss.
  - **Teorema di Binet:** $\det(A \cdot B) = \det(A) \cdot \det(B)$.
- **Invertibilità di Matrici Quadrate:**
  - Condizione necessaria e sufficiente di invertibilità: $A$ è invertibile $\iff \det(A) \neq 0 \iff rg(A) = n \iff Ker(A) = \{0\}$.
- **Metodi di Calcolo della Matrice Inversa ($A^{-1}$):**
  - **Algoritmo di Gauss-Jordan:** Costruzione della matrice aumentata $[A \mid I]$ e riduzione simultanea fino a ottenere $[I \mid A^{-1}]$.
  - **Formula della Matrice Aggiunta (Cofattori):** $A^{-1} = \frac{1}{\det(A)} \operatorname{agg}(A)^T$, con calcolo dei complementi algebrici.

### Modulo 5: Applicazioni Lineari, Nucleo e Immagine
- **Definizione e Proprietà di Linearità:**
  - Funzioni $T: V \to W$ tali che $T(u + v) = T(u) + T(v)$ e $T(\alpha u) = \alpha T(u)$.
  - Legame biunivoco tra applicazioni lineari e matrici rispetto a basi scelte per dominio e codominio.
- **Nucleo ($Ker(T)$):**
  - Definizione: insieme dei vettori del dominio mappati nel vettore nullo ($Ker(T) = \{v \in V \mid T(v) = 0\}$).
  - Calcolo pratico: risoluzione del sistema lineare omogeneo associato $A x = 0$.
  - Proprietà di iniettività: $T$ è iniettiva $\iff Ker(T) = \{0\} \iff \dim Ker(T) = 0$.
- **Immagine ($Im(T)$):**
  - Definizione: insieme dei vettori del codominio raggiunti dall'applicazione ($Im(T) = \{T(v) \mid v \in V\}$).
  - Calcolo pratico: spazio generato dalle colonne della matrice associata; base formata dalle colonne corrispondenti ai pivot di Gauss.
  - Proprietà di suriettività: $T$ è suriettiva $\iff Im(T) = W \iff \dim Im(T) = \dim W$.
- **Teorema Fondamentale dell'Omomorfismo (Teorema del Rango e della Nullità):**
  - Relazione cardine: $\dim Ker(T) + \dim Im(T) = \dim V$.
  - Isomorfismi lineari: applicazioni contemporaneamente iniettive e suriettive tra spazi della stessa dimensione.

### Modulo 6: Autovalori, Autovettori, Autospazi e Diagonalizzazione
- **Concetti Spettrali Fondamentali:**
  - Endomorfismo lineare $T: V \to V$ e matrice quadrata associata $A$.
  - Definizione di autovettore: vettore non nullo $v \neq 0$ tale che $A v = \lambda v$.
  - Definizione di autovalore $\lambda \in \mathbb{R}$.
  - Autospazio associato ad un autovalore: $V_\lambda = Ker(A - \lambda I)$, costituito da tutti gli autovettori relativi a $\lambda$ più il vettore nullo.
- **Polinomio Caratteristico:**
  - Equazione caratteristica: $P(\lambda) = \det(A - \lambda I) = 0$.
  - Calcolo delle radici del polinomio (autovalori).
  - **Molteplicità Algebrica ($m_a(\lambda)$):** Molteplicità della radice $\lambda$ nel polinomio caratteristico.
  - **Molteplicità Geometrica ($m_g(\lambda)$):** Dimensione dell'autospazio associato, calcolata come $m_g(\lambda) = \dim Ker(A - \lambda I) = n - rg(A - \lambda I)$.
  - Disuguaglianza spettrale fondamentale: $1 \le m_g(\lambda) \le m_a(\lambda)$.
- **Criterio di Diagonalizzabilità:**
  - Una matrice $A$ di ordine $n$ è diagonalizzabile per similitudine su $\mathbb{R}$ se e solo se:
    1. Il polinomio caratteristico ha tutte le $n$ radici reali (contate con la loro molteplicità, ossia $\sum m_a(\lambda) = n$).
    2. Per ogni autovalore, la molteplicità geometrica coincide con la molteplicità algebrica ($m_g(\lambda) = m_a(\lambda)$).
- **Costruzione della Matrice Diagonale e di Passaggio:**
  - Matrice diagonale simile $D$: matrice con gli autovalori disposti sulla diagonale principale.
  - Matrice di passaggio invertibile $P$: matrice avente come colonne i vettori che costituiscono le basi dei singoli autospazi.
  - Relazione di similitudine: $D = P^{-1} A P \iff A = P D P^{-1}$.

---

## Linguaggi, Strumenti e Tecnologie
- **Notazione Matriciale e Algebrica Formale:** Manipolazione simbolica ed esatta con calcolo frazionario e modulare ($\mathbb{Z}_5$).
- **Algoritmo di Riduzione a Scala di Gauss e Gauss-Jordan:** Metodo universale per il calcolo simultaneo di ranghi, determinanti, basi e inverse.
- **Geometria Vettoriale Tridimensionale:** Calcolo vettoriale applicato (prodotto scalare, prodotto vettoriale, equazioni cartesiane e parametriche).

---

## Tipologia Esercizi e Prove d'Esame
1. **Tipologia 1 – Dipendenza e Indipendenza Lineare:**
   - Dato un insieme di vettori numerici o parametrici, impostare la combinazione lineare nulla, costruire la matrice, calcolare il rango con Gauss e concludere se l'insieme è linearmente indipendente o dipendente.
2. **Tipologia 2 – Vettore come Combinazione Lineare di Altri:**
   - Verificare se un dato vettore appartiene allo $\operatorname{Span}(v_1, \dots, v_k)$; risoluzione del sistema non omogeneo e determinazione dell'espressione esplicita dei coefficienti.
3. **Tipologia 3 – Dimensione e Base di Sottospazi/Span:**
   - Dato un sottospazio o insieme di generatori, disporre i vettori in colonna, applicare l'eliminazione di Gauss, individuare i pivot ed estrarre la base formata dalle colonne pivot originali, stabilendo la dimensione.
4. **Tipologia 4 – Completamento a Base:**
   - Partendo da una base parziale di un sottospazio, estendere l'insieme a una base dell'intero spazio aggiungendo vettori scelti dalla base canonica in corrispondenza delle colonne prive di pivot.
5. **Tipologia 5 – Sistemi Lineari con Parametro (Rouché-Capelli):**
   - Risoluzione dell'esercizio fisso dello scritto: discussione completa del numero di soluzioni al variare del parametro reale $k$ mediante il confronto dei ranghi di $A$ e $[A \mid b]$, seguita dalla risoluzione esplicita per ciascun caso compatibile.
6. **Tipologia 6 – Determinante, Invertibilità e Calcolo di $A^{-1}$:**
   - Calcolo del determinante con sviluppo di Laplace o mosse di Gauss; discussione dell'invertibilità al variare di un parametro; calcolo dell'inversa tramite matrice aumentata $[A \mid I]$ o matrice dei cofattori.
7. **Tipologia 7 – Studio di Nucleo ($Ker$) e Immagine ($Im$):**
   - Data una matrice o un'applicazione lineare $T$, calcolare $\dim Ker(T)$ risolvendo $Ax=0$ e ricavare una sua base; calcolare $\dim Im(T)$ tramite il rango e fornire una base dalle colonne pivot; verificare il teorema di nullità e rango.
8. **Tipologia 8 – Autovalori, Autospazi e Diagonalizzazione:**
   - Calcolare il polinomio caratteristico $\det(A - \lambda I)$; trovare gli autovalori e le rispettive molteplicità algebriche; per ogni autovalore risolvere $(A - \lambda I)x = 0$ per determinare l'autospazio, una sua base e la molteplicità geometrica; verificare se la matrice è diagonalizzabile e scrivere le matrici $P$ e $D$.
9. **Tipologia 9 – Rette e Piani nello Spazio Affine:**
   - Passaggio tra forma parametrica e cartesiana di rette e piani; determinazione del vettore normale di un piano tramite prodotto vettoriale; verifica della posizione reciproca di due rette (sghembe, parallele o incidenti con calcolo del punto di intersezione); calcolo della retta intersezione di due piani.
