# Resoconto Corso: Calcolo Numerico

- **Anno:** 3° Anno Triennale
- **Area:** Matematica Applicata / Analisi Numerica e Algebra Lineare Computazionale (MAT/08)
- **Riferimenti e Testi:** Appunti integrali delle lezioni, quaderni teorici d'esame orale, compendi di teoremi e dimostrazioni, tracce di compiti d'esame risolti.

---

## Obiettivi del Corso in Sintesi

Il corso fornisce le basi matematiche, analitiche e algoritmiche dei metodi numerici fondamentali per il calcolo scientifico e l'ingegneria dell'informazione. Vengono indagati il problema dell'approssimazione di dati e funzioni mediante polinomi algebrici, le tecniche di quadratura e integrazione numerica, le proprietà spettrali delle matrici numeriche con teoremi di localizzazione degli autovalori, la teoria delle norme vettoriali e matriciali, e la formulazione e convergenza dei metodi iterativi stazionari per la risoluzione di sistemi di equazioni lineari ad alte dimensioni.

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### 1. Interpolazione Polinomiale
- **Formulazione del problema di interpolazione algebrica:**
  - Posizionamento del problema su $n+1$ nodi distinti $x_0, x_1, \dots, x_n \in [a, b]$ e valori associati $y_0, y_1, \dots, y_n$.
  - Scelta dello spazio vettoriale dei polinomi di grado al più $n$ ($\mathbb{R}_n[x]$).
  - **Teorema 1.1 (Esistenza e Unicità dell'interpolante):** dimostrazione con determinante di Vandermonde e dimostrazione costruttiva mediante base canonica e base di Lagrange.
- **Forme di rappresentazione dell'interpolante:**
  - **Forma canonica:** $p(x) = \sum_{j=0}^n a_j x^j$ e risoluzione del sistema lineare associato.
  - **Forma di Lagrange:** polinomi elementari di Lagrange $L_i(x) = \prod_{j \ne i} \frac{x - x_j}{x_i - x_j}$ e proprietà di ortonormalità discreta $L_i(x_j) = \delta_{ij}$.
  - **Forma di Newton:** base polinomiale a supporto incrementale $(1, (x-x_0), (x-x_0)(x-x_1), \dots)$.
  - **Teorema 1.3 (Rappresentazione di Newton):** definizione formale dei coefficienti tramite differenze divise $f[x_0, \dots, x_k]$.
  - Tabella delle differenze divise e proprietà ricorsiva ($f[x_0, \dots, x_k] = \frac{f[x_1, \dots, x_k] - f[x_0, \dots, x_{k-1}]}{x_k - x_0}$).
  - Aggiunta di nodi di interpolazione: invarianza dei coefficienti precedenti e costo incrementale $O(n)$.
- **Analisi dell'errore (Resto dell'interpolazione):**
  - **Teorema 1.2 (Formula dell'errore):** se $f \in C^{n+1}[a, b]$, allora $\forall x \in [a, b]$ esiste $\xi \in (a, b)$ tale che $E(x) = f(x) - p(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod_{i=0}^n (x - x_i)$.
  - Dimostrazione rigorosa mediante funzione ausiliaria e applicazione ripetuta del Teorema di Rolle.
  - Stima a priori e maggiorazione globale del modulo dell'errore: $|f(x) - p(x)| \le \frac{\max_{\xi \in [a,b]} |f^{(n+1)}(\xi)|}{(n+1)!} \max_{x \in [a,b]} \prod |x - x_i|$.
- **Complessità ed algoritmi di valutazione:**
  - Valutazione in un punto con schema di Horner generalizzato per la forma di Newton ($O(n)$ moltiplicazioni).
  - Fenomeno di Runge ed instabilità su nodi equispaziati per gradi elevati.

---

### 2. Integrazione Numerica (Quadratura)
- **Formulazione dell'integrazione numerica:**
  - Approssimazione di integrali definiti $I(f) = \int_a^b f(x)\,dx$ tramite formule di quadratura interpolatorie.
- **Formula dei Trapezi (Semplice e Composita):**
  - Formula semplice: $I(f) \approx \frac{b - a}{2} (f(a) + f(b))$.
  - Formula composita su $m$ sotto-intervalli di ampiezza $h = \frac{b-a}{m}$.
- **Analisi teorica dell'errore dei trapezi:**
  - **Lemma 2.1:** integrale della funzione peso d'errore $(x-a)(x-b)$ e segno costante sull'intervallo.
  - **Teorema 2.1 (Errore della formula dei trapezi):** se $f \in C^2[a, b]$, allora il resto vale $R(f) = -\frac{(b-a)^3}{12} f''(\xi)$ con $\xi \in (a, b)$ per la formula semplice, e $R_m(f) = -\frac{b-a}{12} h^2 f''(\eta)$ per la composita (ordine di convergenza 2 rispetto a $h$).
  - Dimostrazione formale tramite integrazione dell'errore di interpolazione e teorema della media integrale.
- **Tecniche di Estrapolazione:**
  - Metodo di estrapolazione di Richardson (accelerazione di convergenza combinando passi di discretizzazione $h$ e $h/2$).

---

### 3. Matrici Numeriche, Spettro e Teoremi di Gershgorin
- **Richiami e proprietà algebrico-spettrali:**
  - Traccia, determinante, polinomio caratteristico e autovalori $\lambda_i(A)$.
  - **Raggio spettrale:** $\rho(A) = \max_i |\lambda_i(A)|$.
  - Matrici normali, simmetriche e coniugate trasposte (Hermitiane: $A^* = A$). Autovalori reali per matrici hermitiane.
- **Matrici Definite Positive (HDP):**
  - Definizione: $x^* A x > 0$ per ogni vettore non nullo $x \in \mathbb{C}^n \setminus \{0\}$.
  - Decomposizione hermitiana/anti-hermitiana di matrici non hermitiane: $\operatorname{Re}(A) = \frac{A + A^*}{2}$, $\operatorname{Im}(A) = \frac{A - A^*}{2i}$.
  - Criterio di positività: $A$ è definita positiva $\iff \operatorname{Re}(A)$ è hermitiana definita positiva.
  - Proprietà fondamentali: elementi diagonali strettamente positivi ($a_{ii} = e_i^* A e_i > 0$), autovalori reali e strettamente positivi, invertibilità garantita.
  - **Teorema 3.1 (Sottomatrici principali di testa / Criterio di Sylvester):** una matrice hermitiana è definita positiva se e solo se i determinanti di tutte le sue sottomatrici principali di testa sono strettamente positivi.
  - **Teorema 3.2 (Autovalori di polinomi di matrici):** se $\lambda$ è autovalore di $A$, allora $p(\lambda)$ è autovalore della matrice $p(A)$.
- **Localizzazione degli Autovalori (Teoremi di Gershgorin):**
  - Definizione dei cerchi di Gershgorin per riga: $K_i = \{z \in \mathbb{C} : |z - a_{ii}| \le \sum_{j \ne i} |a_{ij}|\}$.
  - Definizione dei cerchi di Gershgorin per colonna: $H_j = \{z \in \mathbb{C} : |z - a_{jj}| \le \sum_{i \ne j} |a_{ij}|\}$.
  - **Teorema 3.3 (Primo Teorema di Gershgorin):** tutti gli autovalori di $A$ appartengono all'unione dei cerchi di riga $\bigcup K_i$ e all'unione dei cerchi di colonna $\bigcup H_j$, quindi alla loro intersezione.
  - **Teorema 3.4 (Secondo Teorema di Gershgorin):** se l'unione di $k$ cerchi è disgiunta dai restanti $n-k$ cerchi, tale unione contiene esattamente $k$ autovalori (contati con la loro molteplicità algebrica).
  - **Grafi e Irriducibilità:** grafo orientato associato alla matrice $G(A)$; definizione di matrice irriducibile (grafo fortemente connesso / esistenza di cammino orientato tra ogni coppia di nodi).
  - **Teorema 3.5 e 3.6 (Terzo Teorema di Gershgorin, forma forte e debole):** per matrici irriducibili, se un autovalore si trova sulla frontiera dell'unione di tutti i cerchi, esso deve trovarsi sulla frontiera di *tutti* i cerchi. Di conseguenza, se un punto appartiene al bordo di un solo cerchio (o non di tutti), esso non può essere autovalore.
  - **Teorema 3.7 (Invertibilità per dominanza diagonale ed irriducibilità):** condizioni sufficienti per l'invertibilità di $A$ (dominanza diagonale stretta per righe o colonne, oppure dominanza diagonale debole con almeno una disuguaglianza stretta ed irriducibilità).

---

### 4. Norme Vettoriali e Matriciali
- **Norme Vettoriali:**
  - Assiomi di norma (positività, omogeneità assoluta, disuguaglianza triangolare).
  - Norme $p$: norma 1 ($\|x\|_1 = \sum |x_i|$), norma euclidea 2 ($\|x\|_2 = \sqrt{\sum |x_i|^2}$), norma infinito ($\|x\|_\infty = \max |x_i|$).
  - **Teorema 3.8 (Equivalenza delle norme in spazi a dimensione finita):** esistenza di costanti positive $c_1, c_2$ tali che $c_1 \|x\|_a \le \|x\|_b \le c_2 \|x\|_a$. Invarianza topologica della convergenza di successioni di vettori rispetto alla scelta della norma.
- **Norme Matriciali e Norme Indotte:**
  - Definizione di norma matriciale sub-moltiplicativa ($\|AB\| \le \|A\| \|B\|$).
  - Norme matriciali naturali (indotte da norme vettoriali): $\|A\| = \sup_{x \ne 0} \frac{\|Ax\|}{\|x\|}$.
  - **Teorema 3.9 (Proprietà delle norme indotte):** $\|I\| = 1$, compatibilità vettore-matrice $\|Ax\| \le \|A\| \|x\|$, e delimitazione inferiore con il raggio spettrale: $\rho(A) \le \|A\|$ per qualsiasi norma indotta.
  - **Teorema 3.10 (Formule esplicite di calcolo):**
    - Norma 1: massimo della somma delle colonne ($\|A\|_1 = \max_j \sum_i |a_{ij}|$).
    - Norma infinito: massimo della somma delle righe ($\|A\|_\infty = \max_i \sum_j |a_{ij}|$).
    - Norma 2 (spettrale): radice del massimo autovalore di $A^* A$ ($\|A\|_2 = \sqrt{\rho(A^* A)}$; se $A$ è hermitiana, $\|A\|_2 = \rho(A)$).
  - **Teorema 3.11 (Equivalenza tra norme matriciali).**
  - **Teorema 3.12 (Convergenza delle potenze di matrici):** la successione $A^k \to 0$ per $k \to \infty$ se e solo se il raggio spettrale è strettamente minore di uno: $\rho(A) < 1$.

---

### 5. Metodi Iterativi per Sistemi Lineari
- **Generalità sui metodi iterativi stazionari:**
  - Risoluzione del sistema $Ax = b$ con schema $x^{(k+1)} = B x^{(k)} + c$.
  - Concetti di consistenza e convergenza indipendente dal punto di innesco $x^{(0)}$.
  - **Teorema 4.1 (Condizione Necessaria e Sufficiente di Convergenza):** il metodo iterativo converge per ogni scelta del vettore iniziale $x^{(0)}$ se e solo se $\rho(B) < 1$.
  - Condizioni sufficienti (Corollario 4.1: $\|B\| < 1$ per una qualche norma indotta) e necessarie (Corollario 4.2: $|\operatorname{tr}(B)| < n$ e $|\det(B)| < 1$).
  - Velocità asintotica di convergenza ($R_\infty(B) = -\ln \rho(B)$) e criteri di arresto basati sul residuo relativo $\|b - Ax^{(k)}\| / \|b\| < \epsilon$.
- **Costruzione dei metodi mediante Decomposizione (Matrix Splitting):**
  - Decomposizione $A = M - N$ con $M$ non singolare ed economicamente invertibile: $x^{(k+1)} = M^{-1} N x^{(k)} + M^{-1} b$.
  - Matrice di iterazione $B = M^{-1} N = I - M^{-1} A$.
  - **Teorema 4.2:** convergenza garantita $\iff \rho(I - M^{-1}A) < 1$.
  - Decomposizione standard: $A = D - E - F$, con $D$ diagonale, $-E$ triangolare inferiore stretta, $-F$ triangolare superiore stretta.
- **Metodo di Jacobi:**
  - Scelta: $M = D$, $N = E + F$.
  - Matrice di iterazione: $J = D^{-1}(E + F) = I - D^{-1}A$.
  - Schema per componenti: $x_i^{(k+1)} = \frac{1}{a_{ii}} \left(b_i - \sum_{j \ne i} a_{ij} x_j^{(k)}\right)$.
- **Metodo di Gauss-Seidel:**
  - Scelta: $M = D - E$, $N = F$.
  - Matrice di iterazione: $G = (D - E)^{-1}F = I - (D - E)^{-1}A$.
  - Schema per componenti (utilizzo immediato delle componenti già aggiornate al passo corrente): $x_i^{(k+1)} = \frac{1}{a_{ii}} \left(b_i - \sum_{j < i} a_{ij} x_j^{(k+1)} - \sum_{j > i} a_{ij} x_j^{(k)}\right)$.
- **Teoremi di convergenza di Jacobi e Gauss-Seidel:**
  - "Osservazione Smart" per il calcolo degli autovalori della matrice di iterazione di Gauss-Seidel: $\det(\lambda(D - E) - F) = 0$ oppure $\det(\lambda E + A - E) = 0$.
  - **Teorema 4.3 (Convergenza per dominanza diagonale):** se $A$ è a diagonale dominante stretta per righe o colonne (o debolmente dominante, irriducibile e con almeno una riga stretta), sia Jacobi sia Gauss-Seidel convergono.
  - **Teorema 4.4 (Convergenza di Gauss-Seidel per matrici HDP):** se la matrice $A \in \mathbb{C}^{n \times n}$ è Hermitiana Definita Positiva, allora il metodo di Gauss-Seidel converge incondizionatamente ($\rho(G) < 1$).
  - Dimostrazione rigorosa del Teorema 4.4: scomposizione di $A - G^* A G$ e verifica che $(1 - |\lambda|^2) y^* A y > 0 \implies |\lambda| < 1$.

---

## Linguaggi, Strumenti e Tecnologie
- **Ambiente Numerico di Riferimento:** MATLAB / GNU Octave (rappresentazione IEEE 754 in virgola mobile a doppia precisione, algebra vettoriale e matriciale, calcolo di norme e autovalori).
- **Algoritmi Implementati:**
  - Differenze divise e valutazione di polinomi con Horner.
  - Formule di quadratura composte (Trapezi).
  - Algoritmi risolutivi iterativi di Jacobi e Gauss-Seidel con criterio d'arresto sul residuo.

---

## Tipologia Esercizi e Prove d'Esame
- **Esercizi Analitico-Applicativi della Prova Scritta:**
  1. **Interpolazione polinomiale e maggiorazione dell'errore:** assegnati nodi e una funzione $f(x)$ (es. $\sqrt{x}$, $\log(x)$, trigonometriche), calcolo della derivata $(n+1)$-esima, individuazione dell'intervallo d'interpolazione, studio del massimo della derivata su $[a, b]$ e maggiorazione del polinomio nodale $\prod (x-x_i)$ per delimitare l'errore commesso.
  2. **Costruzione e manipolazione di polinomi interpolatori:** calcolo del polinomio in forma di Lagrange o di Newton (tramite tabella delle differenze divise) e conversione algebrica nella forma canonica monomia.
  3. **Localizzazione spettrale con i Cerchi di Gershgorin:** tracciamento dei cerchi per riga e per colonna nel piano complesso per matrici parametriche $3 \times 3$; studio della connessione del grafo associato per verificare l'irriducibilità; deduzione di intervalli di parametri (es. $\alpha$) tali che lo zero sia escluso dallo spettro, garantendo l'invertibilità di $\alpha I + A$.
  4. **Studio di matrici definite positive e convergenza iterativa:** verifica della positività di matrici parametriche hermitiane o complesse (calcolo di $\operatorname{Re}(A) = \frac{A+A^*}{2}$ e determinanti delle sottomatrici principali di testa); calcolo del raggio spettrale della matrice di iterazione di Gauss-Seidel o Jacobi tramite $\det(\lambda E + A - E) = 0$; risoluzione di disequazioni algebriche per determinare l'intervallo esatto di convergenza del metodo.
- **Interrogazione Teorica della Prova Orale:**
  - Esposizione rigorosa con dimostrazione alla lavagna dei teoremi cardine (dimostrazione di unicità dell'interpolante Teorema 1.1, formula dell'errore Teorema 1.2, errore trapezi Teorema 2.1, proprietà delle norme indotte Teorema 3.9, condizione necessaria e sufficiente di convergenza Teorema 4.1, convergenza di Gauss-Seidel per matrici HDP Teorema 4.4).
