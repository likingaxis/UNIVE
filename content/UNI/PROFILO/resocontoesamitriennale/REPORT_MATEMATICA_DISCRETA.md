# Resoconto Corso: Matematica Discreta

- **Anno:** 1° Anno Triennale
- **Area:** Matematica Discreta, Calcolo Combinatorio, Algebra e Teoria dei Numeri
- **Riferimenti Didattici:** Appunti del corso, schemi operativi d'esame (OPA, Grafi, RSA, Combinatoria)

---

## Obiettivi del Corso in Sintesi
Il corso fornisce le basi matematiche discrete indispensabili per l'informatica. L'obiettivo è formare lo studente all'astrazione algebrica e all'applicazione rigorosa di strumenti discreti: dall'aritmetica modulare e teoria dei numeri alla crittografia a chiave pubblica, dall'analisi combinatoria ed enumerativa alle successioni per ricorrenza, fino alla teoria dei grafi e alle strutture di relazioni binarie per la modellazione algoritmica.

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### Modulo 1: Aritmetica Modulare, Teoria dei Numeri ed Equazioni Diofantee (OPA 1 & 2)
- **Divisibilità e Massimo Comune Divisore:**
  - Definizione formale di divisibilità tra interi e numeri primi.
  - Algoritmo di Euclide delle divisioni successive per il calcolo di $\gcd(a, b)$.
- **Identità di Bézout ed Algoritmo Euclideo Esteso:**
  - Esistenza di interi $x, y$ tali che $ax + by = \gcd(a, b)$.
  - Procedura di risalita all'indietro per il calcolo esplicito dei coefficienti di Bézout.
- **Equazioni Diofantee Lineari ($ax + by = n$):**
  - Condizione necessaria e sufficiente di risolubilità: $\gcd(a, b) \mid n$.
  - Calcolo della soluzione particolare a partire dai coefficienti di Bézout: $x_0 = x \cdot (n / \gcd(a,b))$, $y_0 = y \cdot (n / \gcd(a,b))$.
  - Rappresentazione parametrica dell'infinità di soluzioni intere: $x = x_0 + k \cdot \frac{b}{\gcd(a,b)}$, $y = y_0 - k \cdot \frac{a}{\gcd(a,b)}$ con $k \in \mathbb{Z}$.
- **Aritmetica Modulare e Classi di Resto:**
  - Relazione di congruenza modulo $m$ ($a \equiv b \pmod m$) e struttura algebrica dell'anello $\mathbb{Z}_m$.
  - Inversa moltiplicativa modulare $[a]_m^{-1}$: condizione di esistenza $\gcd(a, m) = 1$.
  - Calcolo dell'inversa tramite Bézout ($ax + my = 1 \implies [a]_m^{-1} = [x]_m$) e gestione dei coefficienti negativi tramite riduzione $[x + m]_m$.
- **Teoremi Fondamentali della Teoria dei Numeri:**
  - Funzione Toziente di Eulero $\phi(n)$ e sue formule di calcolo per prodotti di primi.
  - Teorema di Eulero e Piccolo Teorema di Fermat per la semplificazione di potenze elevate modulo $m$.

### Modulo 2: Ricorrenze Lineari e Formule Chiuse (OPA 3)
- **Successioni definite per ricorrenza:** Concetto di relazione di ricorrenza discreta lineare a coefficienti costanti.
- **Metodo del Polinomio Caratteristico:**
  - Derivazione dell'equazione caratteristica associata alla ricorrenza omogenea.
  - Trattamento delle radici reali distinte: soluzione generale come combinazione lineare $a_n = c_1 \cdot \lambda_1^n + c_2 \cdot \lambda_2^n$.
  - Trattamento delle radici con molteplicità algebrica $k > 1$: introduzione di fattori polinomiali $n^j \lambda^n$.
- **Soluzione con Condizioni Iniziali:**
  - Impostazione del sistema lineare determinato sui coefficienti $c_1, c_2, \dots$ tramite i valori di partenza ($a_0, a_1, \dots$).
  - Derivazione della forma chiusa esplicita non ricorsiva.

### Modulo 3: Calcolo Combinatorio ed Enumerazione
- **Principi Fondamentali del Calcolo Combinatorio:**
  - Regola della somma (insiemi disgiunti) e regola del prodotto (scelte sequenziali indipendenti).
- **Strutture di Conteggio Elementari:**
  - Permutazioni semplici ($n!$) e con ripetizione (anagrammi con lettere ripetute: $\frac{n!}{n_1! n_2! \dots n_k!}$).
  - Disposizioni semplici $D(n, k) = \frac{n!}{(n-k)!}$ e disposizioni con ripetizione $D'(n, k) = n^k$.
  - Combinazioni semplici $\binom{n}{k} = \frac{n!}{k!(n-k)!}$: simmetria, formula di Tartaglia-Pascal, identità binomiali.
  - Teorema del Binomio di Newton e coefficienti multinomiali.
- **Conteggio Avanzato e Modelli Discreti:**
  - Combinazioni con ripetizione (multinsiemi): assegnazione di oggetti indistinguibili a contenitori distinguibili.
  - Metodo delle "stelle e barre" (stars and bars): formula $\binom{n+k-1}{k}$.
  - Composizioni di interi e composizioni deboli (soluzioni intere non-negative a $x_1 + x_2 + \dots + x_k = n$).
- **Principio di Inclusione-Esclusione (PIE):**
  - Calcolo della cardinalità dell'unione di 2, 3 o $n$ insiemi non disgiunti.
  - Applicazione al conteggio di sequenze o configurazioni soggette a vincoli multipli di esclusione.

### Modulo 4: Sommatorie, Serie Finite e Stime Asintotiche
- **Manipolazione Algebrica delle Somme:**
  - Proprietà di linearità, traslazione degli indici e telescopia.
- **Somme Notevoli:**
  - Somme polinomiali di potenze (somma dei primi $n$ naturali, somme di quadrati e cubi).
  - Somma geometrica finita $\sum_{k=0}^{n-1} q^k = \frac{1-q^n}{1-q}$ (con $q \neq 1$).
  - Somme doppie: inversione dell'ordine di sommatoria per domini rettangolari e triangolari.
  - Manipolazione di produttorie e fattoriali.
- **Notazioni Asintotiche e Tassi di Crescita:**
  - Definizioni formali di $O, \Omega, \Theta, o, \omega$ per funzioni a valori discreti.
  - Stima dell'ordine asintotico di somme tramite approssimazione con integrali e confronto asintotico.

### Modulo 5: Crittografia a Chiave Pubblica (Crittosistema RSA)
- **Principi della Crittografia Asimmetrica:**
  - Coppie di chiavi asimmetriche: chiave pubblica per la cifratura, chiave privata per la decifratura.
  - Ruoli e protocolli di comunicazione sicura tra due entità (A e B).
- **Generazione delle Chiavi RSA:**
  - Selezione di due numeri primi distinti $p$ e $q$.
  - Calcolo del modulo pubblico $n = p \cdot q$.
  - Calcolo del toziente $\phi(n) = (p-1)(q-1)$.
  - Scelta dell'esponente pubblico $e$ tale che $1 < e < \phi(n)$ e $\gcd(e, \phi(n)) = 1$.
  - Calcolo dell'esponente privato $d$ come inversa moltiplicativa: $d \equiv e^{-1} \pmod{\phi(n)}$ tramite Bézout ($e \cdot d + k \cdot \phi(n) = 1$).
- **Operazioni di Cifratura e Decifratura:**
  - Cifratura del messaggio chiaro $m$: $c = m^e \pmod n$.
  - Decifratura del crittogramma $c$: $m = c^d \pmod n$.
  - Dimostrazione di correttezza basata sul Teorema di Eulero-Fermat ($m^{e \cdot d} \equiv m^{1 + k\phi(n)} \equiv m \pmod n$).
  - Riduzione modulare e tecniche computazionali di esponenziazione veloce (metodo dei quadrati ripetuti).

### Modulo 6: Insiemistica, Relazioni e Funzioni
- **Insiemi e Operazioni:** Unione, intersezione, differenza, complemento, prodotto cartesiano, insieme delle parti $\mathcal{P}(A)$ e cardinalità.
- **Relazioni Binarie e loro Proprietà:**
  - Riflessività, antiriflessività, simmetria, antisimmetria, transitività.
  - Relazioni di Equivalenza: definizione, classi di equivalenza $[x]$, partizione dell'insieme di supporto e insieme quoziente $A/\sim$.
  - Relazioni d'Ordine: ordini parziali (insiemi parzialmente ordinati - posetti) e ordini totali; elementi minimali, massimali, minimo e massimo.
- **Funzioni e Applicazioni:**
  - Definizioni di funzione, dominio, codominio e insieme immagine.
  - Proprietà: iniettività, suriettività, biiettività (corrispondenza biunivoca).
  - Composizione di funzioni ($g \circ f$), funzione identità e invertibilità ($f^{-1}$ esiste se e solo se $f$ è biiettiva).
  - Gruppo simmetrico $S_n$: permutazioni, notazione a cicli disgiunti, composizione e parità.

### Modulo 7: Teoria dei Grafi e Reti
- **Fondamenti di Teoria dei Grafi:**
  - Definizione formale di grafo non orientato e orientato $G = (V, E)$.
  - Gradi dei vertici $deg(v)$, vertici isolati e pendenti; Lemma delle strette di mano: $\sum_{v \in V} deg(v) = 2|E|$.
  - Cammini, circuiti, connessione e componenti connesse; grafi regolari e grafi completi $K_n$.
- **Isomorfismo di Grafi:**
  - Definizione di isomorfismo: biiezione $\phi: V_1 \to V_2$ che conserva le adiacenze.
  - Verifica di non-isomorfismo tramite invarianti: numero di vertici/archi, sequenza dei gradi, lunghezza dei cicli minimi/massimi, diametro.
- **Colorazione di Grafi:**
  - Colorazione ammissibile dei vertici: assegnamento di colori tale che vertici adiacenti abbiano colori diversi.
  - Numero cromatico $\chi(G)$: definizione e determinazione del minimo numero di colori.
  - Grafi bipartiti $K_{m,n}$: caratterizzazione (un grafo è bipartito se e solo se non contiene cicli dispari, con $\chi(G) = 2$).
  - Insiemi indipendenti e clique massime (relazione con la colorazione).
- **Accoppiamenti (Matching) e Reti:**
  - Insiemi di archi indipendenti (matching) da una partizione $A$ a una partizione $B$.
  - Condizione di Hall (Teorema del Matrimonio): condizione necessaria e sufficiente per l'esistenza di un matching completo per $A$ ($\forall S \subseteq A, |N(S)| \ge |S|$).
  - Modellazione pratica: allocazione ottimale lavoratori/lavori con vincoli di capacità e grado.
- **Pianificazione e Reti di Comunicazione:**
  - Costruzione di grafi di conflitto per problemi di orari paralleli a tempo minimo (scheduling su risorse condivise senza sovrapposizioni).

---

## Linguaggi, Strumenti e Tecnologie
- **Notazione Matematica Discreta e Rigore Formale:** Simbologia insiemistica, quantificatori, congruenze, diagrammi sagittali e matrici di adiacenza.
- **Algoritmi Fondamentali Discreti:**
  - Algoritmo euclideo esteso per la risoluzione di diofantee e calcolo dell'inversa.
  - Algoritmo di esponenziazione veloce (square-and-multiply) per cifratura RSA.
  - Algoritmi greedy e backtracking per la colorazione dei grafi.

---

## Tipologia Esercizi e Prove d'Esame
1. **Risoluzione di Equazioni Diofantee (Esercizi OPA 1):**
   - Risolvere equazioni della forma $ax + by = n$: calcolo dell'MCD, verifica di divisibilità, esecuzione dell'algoritmo di Euclide esteso, scrittura della soluzione particolare e dell'equazione diofantea generale con parametro intero $k$.
2. **Calcolo dell'Inversa Moltiplicativa Modulare (Esercizi OPA 2):**
   - Determinare l'inversa di una classe $[a]_b$ in $\mathbb{Z}_b$; gestione di classi con segni negativi tramite traslazione; applicazione dell'identità di Bézout per ricavare la classe inversa positiva minima.
3. **Risoluzione di Ricorrenze Lineari (Esercizi OPA 3):**
   - Data una sequenza definita da $a_n = c_1 a_{n-1} + c_2 a_{n-2}$ con condizioni iniziali, trovare l'equazione caratteristica, determinarne le radici e ricavare la formula chiusa per il termine generico $a_n$.
4. **Problemi di Calcolo Combinatorio:**
   - Calcolo del numero di anagrammi con ripetizione di parole; assegnamento di $k$ risorse indistinguibili a $n$ processi (stelle e barre); conteggio di insiemi o password con vincoli di presenza obbligatoria tramite principio di inclusione-esclusione.
5. **Esercizi Completi su Crittosistema RSA:**
   - Scelta/assegnazione di parametri primi $p, q$ e di un esponente pubblico $e$; calcolo di $n$ e $\phi(n)$; derivazione dell'esponente privato $d$ tramite Bézout; cifratura di un messaggio $m$ e verifica della correttezza della decifratura calcolando $c^d \pmod n$.
6. **Esercizi di Insiemistica e Relazioni:**
   - Dimostrazione se una relazione assegnata è di equivalenza (riflessiva, simmetrica, transitiva) o d'ordine; identificazione esplicita delle classi di equivalenza; verifica delle proprietà di funzioni (iniettiva, suriettiva, biunivoca) e calcolo della funzione inversa.
7. **Esercizi sulla Teoria dei Grafi e Accoppiamenti:**
   - Determinazione dell'isomorfismo o non-isomorfismo tra coppie di grafi forniti, motivando tramite invarianti strutturali.
   - Calcolo del numero cromatico $\chi(G)$ con colorazione ottimale e individuazione della clique massima associata.
   - Verifica della fattibilità di accoppiamento completo tra due insiemi di nodi (lavoratori-lavori) mediante vincoli di grado o applicazione del Teorema di Hall.
   - Modellazione di problemi di scheduling a tempo minimo (orari paralleli) tramite partizioni in grafi di conflitto.
