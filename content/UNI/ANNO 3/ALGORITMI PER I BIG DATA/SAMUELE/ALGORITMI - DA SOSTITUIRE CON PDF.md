# MITZ-UPFAL CH01
## Verifica moltiplicazioni tra matrici
### 1. Problema
- voglio verificare se una moltiplicazione tra matrici è corretta
- **input**: tre matrici ( A, B, C ) di dimensione $n \times n$ 
- **output**: dire se $A \cdot B = C$ 
- **contesto**:
    - moltiplicare costa $O(n^3)$
    - voglio verificare più velocemente (big data → meno tempo)

### 2. Parametri
- `n`: dimensione delle matrici

(non c’è ε esplicito, ma c’è probabilità di errore tipo ≤ 1/2)

### 3. Idea / come funziona
**intuizione:**  
invece di controllare tutta la matrice, controllo una “proiezione” casuale

**passi:**
1. genero un vettore random $r \in \{0,1\}^n$
2. calcolo:
    - `Br`
    - `A(Br)`
    - `Cr`
3. confronto:
    - se `A(Br) = Cr` → probabilmente corretto
    - se diversi → sicuramente sbagliato

**strutture usate:**
- vettore random
- moltiplicazioni matrice-vettore

👉 costo molto più basso: niente matrice × matrice

### 4. Analisi
#### tempo
- moltiplicazione matrice-vettore: $O(n^2)$
- totale: $O(n^2)$
    👉 molto meglio di $O(n^3)$
#### spazio
- $O(n^2)$ per le matrici
- $O(n)$ per il vettore
#### accuratezza
- se $AB = C$ → sempre corretto
- se $AB \neq C$ → può sbagliare
![[Pasted image 20260323145631.png]]
##### errore
- probabilità errore ≤ 1/2 (per un test)
##### probabilità
- ripetendo k volte → errore ≤ $(1/2)^k$
👉 quindi diventa affidabile velocemente

>[!tip] Frase da esame
>Controllo la correttezza della moltiplicazione usando un vettore random, riducendo il costo da $O(n^3)$ a $O(n^2)$ con errore probabilistico controllato.


---

## Min-Cut
### 1. Problema
- voglio trovare un **min-cut** di un grafo non orientato
- **input**: un grafo $G=(V,E)$ con (n) vertici
- **output**: un taglio di cardinalità minima, cioè il più piccolo insieme di archi la cui rimozione disconnette il grafo
- **contesto**: il problema serve, per esempio, in affidabilità di rete e clustering; l’algoritmo è randomizzato e non sempre restituisce il min-cut al primo tentativo

### 2. Parametri
- $n = |V|$: numero di vertici
- $m = |E|$: numero di archi
- $k$: dimensione del min-cut
- algoritmo randomizzato con **errore a una sola faccia**: se trova un taglio, quello è sempre un taglio valido, ma potrebbe non essere il minimo

### 3. Idea / come funziona
**Intuizione:**  
se non contraggo mai un arco che appartiene a un min-cut fissato (C), allora alla fine quel taglio sopravvive fino agli ultimi 2 nodi e lo ritrovo correttamente. Il punto è quindi evitare, durante le contrazioni, gli archi del min-cut.

**Passi principali:**
1. scelgo uniformemente a caso un arco tra quelli rimasti
2. lo **contraggo**: unisco i suoi due estremi in un solo super-nodo
3. elimino i self-loop, ma tengo eventuali archi paralleli
4. ripeto finché restano solo 2 vertici
5. restituisco gli archi tra questi 2 vertici: quello è il cut trovato

**Strutture usate:**
- grafo con contrazioni successive
- super-nodi
- archi paralleli ammessi, self-loop eliminati

### 4. Analisi
**Tempo**
- una singola esecuzione fa `n-2` contrazioni
    - **una run**: (n-2) passi di contrazione
    - il costo totale dipende da come rappresenti il grafo

**Spazio**
- devo mantenere il grafo corrente durante le contrazioni
- quindi spazio dell’ordine della rappresentazione del grafo

**Accuratezza**
- se durante tutta l’esecuzione non viene mai contratto un arco del min-cut (C), allora l’algoritmo restituisce proprio (C)

**Errore**
- la probabilità che una singola esecuzione trovi un min-cut è almeno  $$
    \frac{2}{n(n-1)}  
    $$  
- quindi la probabilità di errore in una sola run è al più  $$  
    1 - \frac{2}{n(n-1)}  
    $$

**Probabilità**
- ripetendo l’algoritmo circa  $$
    n(n-1)\ln n  
    $$
    volte e prendendo il taglio più piccolo trovato, la probabilità di fallire diventa molto piccola, al più circa $1/n^2$    

>[!tip] Frase finale da appunti
L’algoritmo di min-cut contrae archi scelti uniformemente a caso fino a lasciare 2 super-nodi. È corretto se non contrae mai un arco del min-cut. Una singola esecuzione ha probabilità di successo almeno $2/[n(n-1)]$, quindi va ripetuto più volte per avere alta affidabilità.


---

# MITZ-UPFAL CH02
## Randomized QuickSort ($Q\_S$) 
A differenza della versione classica, il **Randomized QuickSort** effettua una scelta randomica interna per garantire l'efficienza indipendentemente dall'input.

**Procedura:**
1. **Input:** Un insieme $S$.
2. **Scelta del Pivot:** Si sceglie un elemento $y$ in modo **uniforme e casuale** da $S$.
3. **Partizionamento:** 
   - $S_1 = \{x \in S - \{y\} \mid x \leq y\}$
   - $S_2 = \{x \in S - \{y\} \mid x > y\}$
4. **Ricorsione:** Si applica $Q\_S$ a $S_1$ e $S_2$ finché gli insiemi non sono vuoti o unitari.
5. Vengono ritornate le liste $$Q_{S}(S_{1}), y, Q_{S}(S_{2})$$
> [!tip] Osservazione
> È un algoritmo di tipo **Las Vegas**: l'output è sempre corretto (l'array sarà sempre ordinato), ma il tempo di esecuzione è una variabile aleatoria.

## Analisi del Tempo Atteso (Dimostrazione)
![[Pasted image 20260330110412.png]]

L'obiettivo è dimostrare che il numero atteso di confronti $E[T]$ è $O(n \log n)$.
### A. Definizione delle Variabili Indicatore (Riferimento Teorico: Bernoulliane)
Per analizzare il tempo, ci concentriamo sul numero di **confronti**. 
Siano $s_1, s_2, \dots, s_n$ gli elementi di $S$ in ordine crescente.
Definiamo una variabile aleatoria indicatore $X_{i,j}$:
- $X_{i,j} = 1$ se $s_i$ viene confrontato con $s_j$.
- $X_{i,j} = 0$ altrimenti.

Il numero totale di confronti è $T = \sum_{i=1}^n \sum_{j>i} X_{i,j}$. Per la **linearità del valore atteso**, avremo:
$$E[T] = \sum_{i=1}^n \sum_{j>i} E[X_{i,j}] = \sum_{i=1}^n \sum_{j>i} \Pr(X_{i,j} = 1)$$
>[!tip] Le due sommatorie
>Le due sommatorie servono a **scorrere sistematicamente tutte le coppie distinte** di elementi $(s_i, s_j)$ dell'insieme. La prima fissa l'elemento $i$, la seconda scorre tutti gli elementi $j$ successivi ad $i$. In questo modo sommiamo la probabilità di confronto di ogni singola coppia possibile per ottenere il numero totale di confronti attesi.


### B. Probabilità di confronto
Quando vengono confrontati due elementi $s_i$ e $s_j$?
- Due elementi vengono confrontati **solo se** uno dei due viene scelto come pivot mentre fanno ancora parte dello stesso sotto-problema.
	- Se viene scelto come pivot un elemento $s_k$ tale che $i < k < j$ prima di $s_i$ o $s_j$, i due finirebbero in sotto-problemi diversi e **non verrebbero mai più confrontati**.
- **Logica:** Consideriamo l'insieme di elementi $\{s_i, s_{i+1}, \dots, s_j\}$. La dimensione di questo set è $j - i + 1$ Il confronto tra $s_i$ e $s_j$ avviene se e solo se il primo pivot scelto tra questi è o $s_i$ o $s_j$.

Dato che la scelta del pivot è uniforme, la probabilità che uno di questi due sia scelto per primo è:
$$\Pr(X_{i,j} = 1) = \frac{2}{j - i + 1}$$


### C. Calcolo Finale (Riferimento Teorico: Serie Armonica)
Sostituendo la probabilità nella sommatoria:
$$E[T] = \sum_{i=1}^n \sum_{j=i+1}^n \frac{2}{j - i + 1}$$
Cambiando l'indice della sommatoria ($k = j - i + 1$):
$$E[T] \leq \sum_{i=1}^n \sum_{k=1}^n \frac{2}{k} = 2n \sum_{k=1}^n \frac{1}{k}$$
Poiché $\sum_{k=1}^n \frac{1}{k}$ è la **Serie Armonica ($H_n$)** che approssima $\ln n$:
$$E[T] = 2n H_n = O(n \log n)$$


## QuickSort Deterministico ($DQ\_S$)
Nella versione deterministica, il pivot non è scelto a caso ma è, ad esempio, sempre il **primo elemento** dell'insieme.
- **Problema:** Se l'input è già ordinato (o quasi ordinato), il tempo di esecuzione degrada a $O(n^2)$ perché il partizionamento è sbilanciato.

### Analisi Probabilistica del QuickSort Deterministico 
Sebbene l'algoritmo sia deterministico, possiamo farne un'**analisi probabilistica** assumendo che l'input sia "buono".

>[!lemma] **Teorema** 
>Se l'input è una **permutazione casuale** uniforme degli elementi, allora il tempo atteso di $DQ\_S$ è $O(n \log n)$.

### Differenza Fondamentale (Domanda d'esame!):
- **Randomized Algorithm ($Q\_S$):** L'algoritmo usa una sorgente interna di casualità. Le ottime prestazioni valgono per **qualsiasi** input (non esistono "bad input", solo "bad choices" del pivot molto improbabili).
- **Probabilistic Analysis of Deterministic Algorithm ($DQ\_S$):** L'algoritmo è fisso. Le ottime prestazioni valgono solo se assumiamo che la distribuzione dell'**input** sia casuale. Se l'input è strutturato male, l'algoritmo fallisce sistematicamente.

>[!tip] Riassunto Classificazione
>- **Monte Carlo:** Può produrre un risultato errato (con bassa probabilità). Il tempo di esecuzione è spesso fisso.
>- **Las Vegas:** Produce **sempre** il risultato corretto. Il tempo di esecuzione è la variabile aleatoria (es. QuickSort probabilistico).


---

# MITZ-UPFAL CH-03
## Algoritmo per il Calcolo della Mediana
### Il Problema
La **mediana** di un insieme $X$ di $n$ elementi è l'elemento in posizione $\lceil n/2 \rceil$ una volta ordinato l'insieme.

**Approccio Deterministico:** Ordinare l'intero set costa $O(n \log n)$. 
- Esiste un algoritmo deterministico $O(n)$ (il *Median-of-Medians*), ma è estremamente complesso e ha costanti molto alte, rendendolo poco pratico per i Big Data.

**Approccio Randomizzato:** L'obiettivo è trovare la mediana con un tempo di calcolo **lineare** $O(n)$ e un'alta probabilità di successo, usando solo una piccola porzione dei dati.

### Randomized Median Algorithm
L'idea è creare un "piccolo" sotto-insieme $C$ (candidati) che contenga con certezza la mediana e che sia abbastanza piccolo da essere ordinato velocemente.
#### Step dell'algoritmo:
1. **Campionamento:** Si estraggono $s = n^{3/4}$ elementi da $S$ in modo casuale (con reinserimento) e si mettono in un multi-set $R$.
2. **Ordinamento del campione:** Si ordina $R$. Essendo $|R| = n^{3/4}$, il costo è $O(n^{3/4} \log n)$, che è **sub-lineare** rispetto a $n$.
3. **Scelta dei Pivot ($d$ e $u$):** Si scelgono due elementi da $R$ che facciano da pivots per delimitare la mediana:
    - $d$ (down): l'elemento in posizione $(\frac{1}{2} n^{3/4} - \sqrt{n})$ in $R$.
    - $u$ (up): l'elemento in posizione $(\frac{1}{2} n^{3/4} + \sqrt{n})$ in $R$.
4. **Filtraggio:** Si confrontano tutti gli elementi di $S$ con $d$ e $u$ per trovare l'insieme $C = \{x \in S : d \leq x \leq u\}$. Durante questo passaggio si contano anche quanti elementi sono più piccoli di $d$ ($\ell_d$) e quanti più grandi di $u$ ($\ell_u$).
	- se $\ell_{d} > \frac n 2$ oppure $\ell_{u} > \frac n 2$ -> FALLISCI
		- se più della metà degli elementi sono più piccoli di `d` o più grandi di `u` vuol dire che `C` è troppo piccolo e la mediana sta fuori 
5. **Verifica e Output:** L'algoritmo fallisce se la mediana non è in $C$ (già visto prima) o se $C$ è troppo grande. Altrimenti, si ordina $C$ e si estrae la mediana.
	- per ordinarlo dobbiamo avere $|C| \le 4n^{\frac 3 4}$ 

![[Pasted image 20260331164617.png]]

### Intuizioni
![[Pasted image 20260331171614.png]]

### Condizioni di Fallimento
Sia $Y_{1}$ il numero di campioni sotto la mediana.
Sia $Y_{2}$ il numero di campioni sopra la mediana.

L'algoritmo fallisce se accade uno dei seguenti eventi:
- **$E_1$:** Ci sono troppi pochi campioni piccoli in $R$ ($Y_1 < \frac{1}{2} n^{3/4} - \sqrt{n}$), il che porta $R$ a essere troppo spostato a `sx`
- **$E_2$:** Ci sono troppi pochi campioni grandi in $R$,  il che porta $R$ a essere troppo spostato a `dx`
- **$E_3$:** L'insieme dei candidati $C$ è troppo grande ($|C| > 4n^{3/4}$), rendendo l'ordinamento finale troppo costoso.

## Analisi Probabilistica
Per dimostrare che l'algoritmo funziona "quasi sempre", usiamo la **Disuguaglianza di Chebyshev**.

### Analisi di $E_1$ (per $E_{2}$ è identica) (Varianza e Chebyshev):
- Ogni estrazione in $R$ è una **Bernoulliana** con $p=1/2$ (metà elementi sono $\leq$ mediana).
- $Y_1$ segue quindi una **Binomiale** con $n^{3/4}$ prove.
- **Valore Atteso:** $E[Y_1] = \frac{1}{2} n^{3/4}$.
- **Varianza:** $Var[Y_1] = n^{3/4} \cdot \frac{1}{2} \cdot \frac{1}{2} = \frac{1}{4} n^{3/4}$.

Applichiamo **Chebyshev** per vedere quanto è probabile che $Y_1$ si allontani dalla media di un fattore $\sqrt{n}$ (che è la distanza fissata per il pivot $d$):
$$\Pr(E_1) \leq \Pr(|Y_1 - E[Y_1]| \geq \sqrt{n}) \leq \frac{Var[Y_1]}{(\sqrt{n})^2} = \frac{\frac{1}{4} n^{3/4}}{n} = \frac{1}{4} n^{-1/4}$$

Lo stesso vale per $Pr(E_{2})$.


### Analisi di $E_{3}$
L'evento $E_3$ si verifica se l'insieme dei candidati $C$ è troppo grande ($|C| > 4n^{3/4}$). Se $C$ è troppo grande, l'ordinamento finale non sarebbe più efficiente. 

**Logica della dimostrazione:**
Perché $|C|$ sia maggiore di $4n^{3/4}$, deve accadere che i pivot $d$ e $u$ siano finiti "troppo lontano" dalla mediana reale. In particolare, definiamo due sotto-eventi:
1.  **$\mathcal{E}_{3,1}$**: Almeno $2n^{3/4}$ elementi di $C$ sono più grandi della mediana (ovvero $u$ è troppo a destra).
2.  **$\mathcal{E}_{3,2}$**: Almeno $2n^{3/4}$ elementi di $C$ sono più piccoli della mediana (ovvero $d$ è troppo a sinistra).

Se $|C| > 4n^{3/4}$, allora almeno uno di questi due eventi deve essersi verificato.

La probabilità che si verifichi $\mathcal{E}_{3,1}$ (vale lo stesso per $\mathcal{E}_{3,2}$) è $$\Pr(\mathcal{E}_{3,1}) \leq \frac{Var[X]}{(\sqrt{n})^2} = \frac{\frac{1}{4}n^{3/4}}{n} = \frac{1}{4}n^{-1/4}$$
Quindi $$Pr(E_{3}) \le \frac 1 2 n^{-1/4}$$

### Conclusione:
- Sommando le probabilità di fallimento (Union Bound), si dimostra che la probabilità di successo è:$$P(Successo) \geq 1 - \frac{1}{n^{1/4}}$$
- **Risultato:** L'algoritmo trova la mediana in tempo **$O(n)$** con probabilità che tende a $1$ per $n$ molto grande (**With High Probability**).


---

# Cont Resolution Andy
## Load Balancing
*Riferimento: PDF pag. 19 + Slide 14-17*

**Problema:** Un sistema in cui `m` job arrivano in uno stream e necessitano di essere processati su `n` processori identici. Vogliamo trovare un'assegnazione che bilanci il lavoro dei processori in modo equo. 
* **Caso Deterministico:** Round-Robin (carico max $\lceil m/n \rceil$). Richiede un controller centrale.
	* il R.R. prevede che tutti i job siano già conosciuti (in un caso di big data è impossibile)
	* load atteso di ogni processore $$E[X_{i}] = \sum_{i = 1}^{m} \frac 1 n = \frac m n$$(ogni job ha una probabilità $\frac 1 n$ di finire sul processore `i`)
* **Caso Randomizzato:** Ogni job sceglie un processore $i \in \{1, \dots, n\}$ uniformemente a caso          
  ($p=1/n$).
	* Quanta probabilità ha un processore di avere "troppi jobs"?

### Analisi con Chernoff
* **$i \in \{1, \dots, n\}$**: indica i processori.
* **$j \in \{1, \dots, n\}$**: indica i job.
* **$Y_{ij}$**: Variabile aleatoria binaria (indicatrice).
    *   $Y_{ij} = 1$ se il job $j$ viene assegnato al processore $i$.
    *   $Y_{ij} = 0$ altrimenti.
* **$X_i$**: Variabile aleatoria che conta il numero totale di job assegnati al processore $i$.
    * $X_i = \sum_{j=1}^n Y_{ij}$
    * le variabili $X_{i}$ sono correlate -> se un processore ha `n` job gli altri ne hanno `0`

Il valore atteso di carico per ogni processore è: $$\mu = E[X_i] = \sum_{j=1}^n E[Y_{ij}] = n \cdot \frac{1}{n} = 1$$
* Vogliamo calcolare la probabilità che un processore superi una certa soglia di carico $c$. Usiamo Chernoff con $\delta = c - 1$ (così che $(1+\delta)\mu = c \cdot 1 = c$).

#### Applicazione del Chernoff Bound
Usando la formula semplificata del Bound di Chernoff:
$$\Pr[X_i > c] < \frac{e^{c-1}}{c^c}$$

#### Scelta Strategica di $c$
Per dare un valore asintotico a questa probabilità, definiamo una funzione $\gamma(n)$ tale che:
$$\gamma(n)^{\gamma(n)} = n$$
Scegliamo come soglia di carico $c = e \cdot \gamma(n)$.

**Sviluppo matematico della probabilità di errore:**
1.  $\Pr[X_i > c] < \frac{e^{c-1}}{c^c}$
2.  Notiamo che $e^{c-1} < e^c$, quindi: $\Pr[X_i > c] < \left( \frac{e}{c} \right)^c$
3.  Sostituendo $c = e \cdot \gamma(n)$:
    $$\left( \frac{e}{e \cdot \gamma(n)} \right)^{e \cdot \gamma(n)} = \left( \frac{1}{\gamma(n)} \right)^{e \cdot \gamma(n)}$$
4.  Poiché $e \approx 2.718 > 2$, possiamo scrivere:
    $$\left( \frac{1}{\gamma(n)} \right)^{e \cdot \gamma(n)} < \left( \frac{1}{\gamma(n)} \right)^{2\gamma(n)} = \left( \frac{1}{\gamma(n)^{\gamma(n)}} \right)^2$$
5.  Dalla definizione $\gamma(n)^{\gamma(n)} = n$, otteniamo:
    $$\Pr[X_i > c] < \left( \frac{1}{n} \right)^2 = \frac{1}{n^2}$$


#### Scenario A: $m = n$ (Stesso numero di job e processori)
Usando Chernoff e scegliendo opportunamente i parametri, si dimostra che con alta probabilità nessun processore riceve più di:
$$e \cdot \gamma(n) = \Theta\left(\frac{\log n}{\log \log n}\right) \text{ jobs.}$$





---

### Analisi Dettagliata: Load Balancing ($m=n$)

L'obiettivo è dimostrare quanto è "equo" il bilanciamento casuale dei job quando abbiamo $n$ job e $n$ processori.

#### 1. Definizione delle Variabili


#### 2. Osservazioni Fondamentali (Note in Rosso/Blu)
È essenziale distinguere tra la dipendenza dei processori e l'indipendenza dei job:
*   **Correlazione tra processori ($X_i$):** Le variabili $X_i$ sono **correlate**. Se un processore riceve tutti gli $n$ job, gli altri ne avranno necessariamente 0.
*   **Indipendenza dei job ($Y_{ij}$):** Per un **singolo processore $i$ fissato**, le variabili $Y_{i,1}, Y_{i,2}, \dots, Y_{i,n}$ sono **indipendenti**. Infatti, la scelta di dove finisce il job 1 non influenza minimamente la scelta del job 2. Questa indipendenza ci permette di usare i **Chernoff Bounds**.

#### 3. Valore Atteso e Parametri
*   La probabilità che un job finisca su un determinato processore è $P[Y_{ij}=1] = 1/n$.
*   


#### 6. Conclusione: Union Bound e Risultato Finale
Abbiamo trovato la probabilità che **un solo** processore superi il carico $c$. Per sapere cosa succede all'intero sistema, usiamo l'**Union Bound**:
$$\Pr[\exists i : X_i > c] \leq \sum_{i=1}^n \Pr[X_i > c] \leq n \cdot \frac{1}{n^2} = \frac{1}{n}$$

**Risultato finale:**
Con probabilità molto alta ($1 - 1/n$), nessun processore riceve più di $c$ job, dove:
$$c = \Theta \left( \frac{\log n}{\log \log n} \right)$$

*   **Bonus Fact (Tightness):** Il bound è stretto. Con alta probabilità, esisterà effettivamente almeno un processore che riceve $\Theta \left( \frac{\log n}{\log \log n} \right)$ job. Non è solo un limite superiore, è ciò che accade realmente nel caso peggiore.


---

# 5. 
## ALGORITMI
### Algoritmo: Doubling/Halving Technique

^268207

Serve per gestire dinamicamente la dimensione della tabella hash.
Il problema è che S cambia nel tempo.

Quindi vogliamo mantenere spazio: $O(|S|)$

Parametri:
- n = numero di elementi attualmente nella tabella, cioè n = |S|;
- N = dimensione virtuale della tabella;
- m = dimensione reale della tabella, scelta come primo tra N e 2N.

Idea:
- se la tabella diventa troppo piena, raddoppiamo;
- se diventa troppo vuota, dimezziamo;
- ogni volta facciamo re-hash di tutti gli elementi.

Pseudocodice:
```c
// In caso di espansione
if n > N then
    N <- 2N
    scegli un nuovo numero primo m tale che m ~ Θ(n)
    re-hash di tutti gli elementi in O(n)

// In caso di contrazione
if n < N/4 then
    N <- N/2
    scegli un nuovo numero primo m tale che m ~ Θ(n)
    re-hash di tutti gli elementi in O(n)
```

Si ottiene tempo $O(1)$ ammortizzato per eliminazione e inserimento, poiché il re-hashing avviene solo quando la dimensione raddoppia.

Costo:
- ogni re-hash costa $O(n)$;
- però avviene solo quando la dimensione cambia molto;
- quindi insert e delete costano $O(1)$ ammortizzato.


### L'Algoritmo "Doc-Pair Check" e il Parametro $t$

^05ddb5

L'algoritmo descrive come un computer calcola effettivamente la somiglianza tra due documenti ($C_1, C_2$). 
![[Pasted image 20260504165737.png]]
* **Il parametro $t$:** È il numero di permutazioni che scegliamo (es. 100 o 500). Viene chiamato "parametro di confidenza" perché più è alto, più la nostra stima sarà precisa.
* **Il calcolo:** L'algoritmo non fa altro che contare quante volte $h_{\pi_j}(C_1)$ è uguale a $h_{\pi_j}(C_2)$ e dividere il risultato per $t$. 
* **Il Corollario 5.1.1:** Dice semplicemente che, se potessimo fare infinite permutazioni ($t \to \infty$), la nostra stima ($Sign\text{-}Sim$) diventerebbe identica alla verità ($J.Sim$). Nella realtà non usiamo l'infinito, ma un valore di $t$ sufficiente a far "concentrare" il risultato attorno al valore vero, riducendo l'errore.

##### Analisi della Complessità Spaziale: Perché $\Theta(\log m)$?
Questa è una parte molto tecnica. 
Si chiede: quanto spazio occupa ogni singolo valore nella nostra Signature Matrix?
*  Abbiamo $m$ righe (shingle) nella matrice originale.
*  Ogni valore MinHash è un **indice** di una di queste righe (ad esempio, "il minimo è la riga numero 45.000").
	*  servono $\log_2(m)$ bit. 
*   **Conclusione:** Lo spazio totale per un documento non dipende più da quanti "1" ha (quanti shingle ha), ma solo da quante permutazioni ($t$) abbiamo scelto. Questo rende tutto incredibilmente compresso.

##### Generazione di Permutazioni "Fasulle" (Hash Functions)
Questa è la parte più pratica di tutte. Creare una vera permutazione casuale di un milione di righe è lentissimo. Un computer non "rimescola" davvero le righe.
*   **Il trucco:** Invece di una permutazione $\pi$, si usa una **funzione hash** casuale del tipo $h(x) = (ax + b) \pmod m$. 
*   Queste funzioni "simulano" lo spostamento delle righe in modo matematico e istantaneo. 
*   Il testo dice che "le collisioni vengono ignorate": significa che se due righe diverse finiscono per avere lo stesso valore hash, il sistema lo accetta comunque perché succede così raramente che non rovina la statistica finale.


### Algoritmo di calcolo della matrice delle firme

^4a5dc4

![[Pasted image 20260504170429.png]]
Invece di rimescolare le righe (che sarebbe lentissimo), l'algoritmo fa questo:
1. Crea la matrice delle firme `SIG` e riempila tutta con il valore **infinito** ($\infty$).
2. Legge la matrice originale $M$ riga per riga ($j = 1 \dots m$).
3. Per ogni riga $j$, guarda tutti i documenti ($C$). Se il documento $C$ ha un **1** in quella riga:
    * Calcola il valore hash di quella riga per tutte le $t$ funzioni hash ($f_1(j), f_2(j), \dots$).
	    * Se il valore hash appena calcolato è **più piccolo** di quello che avevi già salvato nella matrice `SIG`, allora sostituiscilo.

Alla fine della scansione, avrai salvato per ogni documento e per ogni funzione hash il valore più piccolo incontrato.

**Perché è efficiente?** Perché non devi mai caricare in memoria l'intera matrice o rimescolarla. Leggi una riga, aggiorni i minimi e passi alla riga successiva.

##### Analisi della Complessità: $\Theta(mN)$
L'algoritmo è molto veloce nel **generare** le firme:
*   $m$ = numero di shingle (righe).
*   $N$ = numero di documenti (colonne).
*   Complessità = $m \times N$. È un costo lineare rispetto alla dimensione della matrice originale.


---


### 5.3. L'Algoritmo di Karp-Rabin su Stream (Rolling Hash)

^0f50a7

![[Pasted image 20260511105839.png|900]]
L'algoritmo mostra come calcolare l'hash di Rabin per una stringa $x = <x_0, x_1, \dots, x_{n-1}>$ in modo efficiente.
* **Inizializzazione:** Si parte da un valore nullo $K_{qz}(\epsilon) = 0$.
* **Iterazione:** Per ogni carattere $x_j$ della stringa, l'hash viene aggiornato con la formula: $$(K_{qz}(<x_0, x_1, \dots, x_{j-1}>)z + x_j) \bmod q$$
* **Logica:** Questo è il metodo di Horner per valutare un polinomio. Ad ogni passo, "spostiamo" a sinistra quanto calcolato finora (moltiplicando per la base $z$) e aggiungiamo l'ultimo carattere. Lo spazio occupato dal risultato è solo $O(\log q)$.

#### Probabilità di Errore e Compressione
Il **Corollario 5.3.5** stabilisce quanto deve essere grande il nostro numero primo $q$ per poter evitare al minimo l'errore
* Se scegliamo $q$ tale che $n^{c+1} \leq q \leq 2n^{c+1}$, allora per ogni coppia di stringhe diverse ($x \neq y$), la probabilità che abbiano lo stesso hash (collisione) è: $$\text{Pr}[K_{qz}(x) = K_{qz}(y) \bmod q] \le \frac{1}{n^c}$$
* **Il vantaggio:** Grazie a questo, passiamo da una dimensione di $O(n)$ (memorizzare tutta la stringa) a uno **sketch** di dimensione **$O(\log n)$**. Abbiamo compresso l'informazione in modo massiccio mantenendo l'errore sotto controllo.

#### Il Rolling Hash: Pattern Matching su Stream
Il problema pratico è: ho un pattern $y$ e voglio sapere quante volte appare nello stream $x$. Supponiamo di aver già calcolato l'hash della finestra attuale dello stream $<x_{i-n+1}, \dots, x_i>$. Quando arriva il nuovo elemento $x_{i+1}$, dobbiamo aggiornare lo sketch "facendo scorrere" la finestra.

La formula del **Rolling Hash** è:
$$K_{qz}(<x_{i-n+2}, \dots, x_{i+1}>) = ((K_{qz}(<x_{i-n+1}, \dots, x_i>) - x_{i-n+1} \cdot z^{n-1})z + x_{i+1}) \bmod q$$

**Cosa succede matematicamente?**
1.  **Sottrazione:** Si toglie il contributo del carattere più vecchio ($x_{i-n+1} \cdot z^{n-1}$).
2.  **Shift:** Si moltiplica per $z$ per spostare tutti i caratteri rimasti di una posizione a sinistra.
3.  **Aggiunta:** Si somma il nuovo carattere arrivato ($x_{i+1}$).


#### Analisi delle Prestazioni
##### Lemma 5.3.6: Complessità Spaziale
Nonostante lo sketch sia piccolo, l'algoritmo occupa uno spazio di **$\Theta(n)$**.
*   **Perché?** Per applicare la formula del Rolling Hash, dobbiamo sapere quale carattere "togliere" (il valore di $x_{i-n+1}$). Di conseguenza, siamo costretti a mantenere in memoria un buffer degli ultimi $n$ elementi dello stream per poterli eliminare al momento giusto.

##### Lemma 5.3.7: Complessità Temporale
Il numero di operazioni per ogni nuovo elemento ricevuto è **$O(1)$**.
* L'aggiornamento dello sketch richiede un numero costante di operazioni matematiche. L'unica operazione potenzialmente lenta sarebbe il calcolo di $z^{n-1}$, ma basta pre-calcolarlo una volta sola all'inizio.

#### Oltre il limite: L'algoritmo di Porat-Porat
Questo algoritmo permette un miglioramento teorico importante perché riesce a risolvere il problema del pattern matching occupando solo spazio **$O(\log n)$**, superando il limite del buffer di lunghezza $n$ richiesto da Karp-Rabin.


---


### 5.5 Problemi di campionamento

^d3cca1
#### 5.5.1 Problema 1: Campione a porzione fissa (L'approccio "banale")
Immaginiamo uno stream $U$ composto da query di motori di ricerca. 
Ogni elemento è una tupla: `(ID utente, query, tempo)`.
Lo scopo principale è quello di trovare un campione $S ⊆ U$ che per un utente medio `u` e una query `q`, approssimi bene la frazione di occorrenze `q` in `U` fatte da `u`.

**Algorithm 6: L'algoritmo banale**
![[Pasted image 20260511112748.png]]
L'idea più semplice è campionare le singole tuple:
*   Per ogni tupla che arriva, scegliamo un numero a caso da 0 a 9.
*   Se esce 0, salviamo la tupla nel campione $S$ (stiamo prendendo il 10% dei dati).
*   Alla fine, calcoliamo la statistica su $S$ per approssimare quella di $U$.

##### Analisi della Procedura: Perché l'algoritmo banale fallisce?
Supponiamo che lo stream $U$ sia composto da:
*   $m$ utenti che fanno una query differente una sola volta.
*   $d$ utenti che fanno una query differente due volte.
*   Totale elementi nello stream: $U = m + 2d$.

**Obiettivo Reale:** La frazione reale di utenti che hanno fatto due occorrenze è:
$$\text{Frazione Reale} = \frac{d}{m+d}$$

##### Cosa succede nel campione $S$?
Dato che campioniamo ogni tupla con probabilità $1/10$, analizziamo cosa finisce in $S$ per i $d$ utenti (quelli con 2 query):
1.  **Entrambe le query in S:** La probabilità è $\frac{1}{10} \times \frac{1}{10} = \frac{1}{100}$. Solo questi utenti appariranno nel campione come "utenti che hanno fatto 2 query".
2.  **Esattamente una query in S:** La probabilità è $(\frac{1}{10} \times \frac{9}{10}) + (\frac{9}{10} \times \frac{1}{10}) = \frac{18}{100}$. Questi utenti appariranno erroneamente nel campione come "utenti che hanno fatto 1 sola query".

##### Calcolo dei Valori Attesi in $S$:
*   **Utenti da 1 query ($m$):** Ne restano $\frac{m}{10}$.
*   **Utenti da 2 query ($d$):**
    *   Quelli che appaiono con 2 query: $\frac{d}{100}$.
    *   Quelli che appaiono con 1 query: $\frac{18d}{100}$.

Quindi, il numero totale di utenti distinti che "vediamo" nel campione $S$ è:
$$\mathbb{E}[\text{Elementi distinti in } S] = \frac{m}{10} + \frac{d}{100} + \frac{18d}{100}$$

##### Conclusione dell'approssimazione:
L'algoritmo calcolerà la frazione basandosi su ciò che vede in $S$:
$$\text{Stima di } S = \frac{\frac{d}{100}}{\frac{m}{10} + \frac{d}{100} + \frac{18d}{100}} = \frac{d}{10m + 19d}$$

##### Risultato Finale:
Confrontando la **Frazione Reale** $\frac{d}{m+d}$ con la **Stima** $\frac{d}{10m + 19d}$, notiamo una differenza enorme. Se ad esempio $m=0$, la frazione reale sarebbe 1 (tutti fanno 2 query), ma il nostro algoritmo stimerebbe $1/19 \approx 0.05$.

**Perché questo approccio non è funzionante?**
L'errore sta nel campionare le **tuple** (le singole righe) invece di campionare gli **utenti**. Campionando le tuple, "rompiamo" le relazioni tra le occorrenze dello stesso utente, perdendo la capacità di contare correttamente le ripetizioni.


#### La Soluzione: Campionamento degli Utenti 
L'idea fondamentale è spostare la scelta casuale dalla "singola azione" all'**"identità dell'utente"**. 
![[Pasted image 20260511115941.png]]
**Il Meccanismo:**
1.  Si sceglie una funzione di hash $h$ che mappa gli ID utente in 10 bucket (da 0 a 9).
2.  **Regola d'oro:** Se l'hash di un ID utente finisce nel bucket scelto (es. bucket 1), allora **tutte** le query associate a quell'ID vengono salvate nel campione $S$. Se l'hash finisce in un altro bucket, l'utente viene scartato completamente.
3.  **Risultato:** In $S$ avremo circa il 10% degli utenti, ma di quegli utenti avremo la **storia completa**.

##### Analisi Matematica (Perché questo funziona?)
Vengono introdotte delle variabili per dimostrare la correttezza statistica:
* $X_{s}(v, q)$: il numero reale di volte che l'utente $v$ ha fatto la query $q$ nello stream intero.
* $C_j$: una variabile "indicatrice" che vale **1** se l'utente $j$ viene campionato (probabilità $1/10$) e **0** altrimenti.
* $x_{j}$: la variabile che conta il numero di elementi dell'utente `j` in `U`

**Il Valore Atteso:**
La dimensione attesa del campione $S$ è:
$$\mathbb{E}[|S|] = \sum x_j \cdot \text{Pr}[C_j = 1] = \frac{1}{10} \cdot \sum x_j = \frac{|U|}{10}$$
Questo significa che il campione $S$ è effettivamente una miniatura fedele dello stream $U$. 
Poiché non abbiamo "spezzato" gli utenti a metà, la media delle occorrenze calcolata su $S$ sarà un'approssimazione corretta della media reale in $U$. 

*Nota:* la **varianza** può essere grande. Se siamo sfortunati e campioniamo pochi utenti che però fanno tantissime query, il campione potrebbe essere poco rappresentativo.


#### Soluzione Generale per lo Stream Dinamico
Cosa succede se lo stream è infinito e la nostra memoria si riempie? Non possiamo continuare a tenere il 10% di tutto per sempre. Viene proposto un metodo per gestire la **porzione variabile**:
1. **Hash e Buckets:** Si esegue l'hash della "chiave" (es. ID utente) in un numero molto grande di bucket $b$.
2. **Soglia di ingresso ($t$):** Si imposta una soglia iniziale $t$. Solo gli elementi il cui hash è $\leq t$ entrano nel campione $S$.
3. **Adattamento Dinamico:**
    * Mentre lo stream scorre, $S$ cresce.
    * Quando $S$ diventa troppo grande per la memoria, si **riduce la soglia $t$**.
    * Tutti gli elementi già presenti in $S$ il cui hash è ora maggiore della nuova soglia vengono **eliminati immediatamente**.
4. Si continua così, abbassando la soglia ogni volta che la memoria è piena.


#### 5.5.2 Raservoir Sampling
Questo metodo consiste nel salvare in `S` i primi `s` elementi e, quando arriva un elemento `n-esimo`, per $n \ge s$ 
1. sceglie con probabilità $\frac s n$ se inserire il nuovo elemento in S
2. se l'elemento è scelto per l'inserimento, deve essere scelto un elemento $x \in_{u} S$ da rimuovere con probabilità $\frac 1 s$

>[!lemma] TEOREMA 5.2. Per ogni $s \ge 1$ e per ogni tempo $n \ge s$ l'algoritmo ha la seguente proprietà:
>Dopo `n` passi, `S` contiene ognuno degli `n` elementi con la stessa probabilità.

*Dimostrazione*
- ***CASO BASE:*** dopo aver visto `n = s` elementi, `S` ha tutti gli elementi con probabilità $\frac s s = 1$ 
- ***CASO INDUTTIVO:*** assumendo che al passo `n` ogni elemento appartenga con probabilità $\frac s n$, dopo l'elemento `n + 1` la proprietà è mantenuta, ovvero $\frac s {n + 1}$.
	- Per ogni "vecchio" elemento già in `S`, la probabilità che l'algoritmo lo mantenga è $$\underbrace{\left(1-\frac{s}{n+1}\right)}_{\text{Elemento } n+1 \text{ scartato}}
+
\underbrace{\left(\frac{s}{n+1}\right)}_{\text{Elemento } n+1 \text{ inserito}}
\cdot
\underbrace{\left(\frac{s-1}{s}\right)}_{\text{Non viene rimosso } x}
=
\frac{n}{n+1}$$

#### 5.5.4 Sliding window
La **sliding window** è un modello in cui l’algoritmo considera solo gli ultimi `N` elementi arrivati nello stream. Quando arriva un nuovo elemento, questo entra nella finestra, mentre l’elemento più vecchio viene eliminato. 
La finestra quindi “scorre” nel tempo, mantenendo sempre una dimensione fissa.

#### 5.5.5 Counting Bits
Sia `I` una Stream di bit infinita, con una finestra di lunghezza `N`.
Si vuole calcolare il valore della funzione $\#1(I,N,k)$, che rappresenta il numero di '*1*' negli ultimi `k` bit (con $k \le N$).

>[!lemma] TEOREMA 5.3. Per una Stream con distribuzione arbitraria, la funzione $\#1(I, N, k)$ richiede spazio $\ge N$.

*Dimostrazione*
Si supponga sia possibile usare la rappresentazione $R(N, k)$, con $|R(N,k)| \le N-1$ (ossia usiamo un bit in meno).
Allora devono esistere due bit nella finestra `w` che hanno la stessa rappresentazione in $R(N,k)$
- perché se ho `3` bit allora ho $2^{3} = 8$ possibili rappresentazioni, ma se scelgo di usare solo `2` bit ne ho $2^{2} = 4$ -> allora avrò una metà delle rappresentazioni identica all'altra (a coppie)

Assumiamo per qualche `k` $$x = \dots 1 \ x_{k-1} x_{k-2}\dots x_{1}$$$$z = \dots 0 \ x_{k-1} x_{k-2}\dots x_{1}$$
Sono due finestre che hai `k-1` bit identici ma `x` ha un bit a 1 in più.
Tuttavia, se la rappresentazione compresa associa a `x` e `z` lo stesso stato interno, ossia $$R(x) = R(z)$$allora l'algoritmo non è in grado di distinguere le due finestre e questo porta a una contraddizione, perché la risposta corretta deve essere diversa. 

Quindi una rappresentazione che usa meno di `N` bit non può garantire il conteggio esatto degli `1` per ogni possibile finestra.
 
#### 5.5.6 DGIM
Nel caso in cui una finestra `N` non possa essere salvata in memoria è necessario fornire un'**approssimazione per il valore della funzione** $\#1(I,N,k)$ e la si ottiene tramite **DGIM**.

Sia $B = \lceil \frac 1 \epsilon \rceil$, i bit della Stream vengono raggruppati in gruppi $G_{1}, G_{2}, \dots, G_{t}$ che devono soddisfare le seguenti condizioni
1. ogni $G_{i}$ inizia e finisce con il bit `1`
2. tra due gruppi adiacenti ci sono solamente `0`, per cui la stream è formata dalla forma $$0^{m_{0}}G_{0}, 0^{m_{1}}G_{1}, \dots, 0^{m_{t}}G_{t}$$
3. ogni gruppo $G_{i}$ contiene $2^k$ bit a `1`
4. Per ogni $i ≤ t$, se $G_{i}$ contiene $2^{k}$ bit `1` allora $G_{i+1}$ contiene $2^k$ o $2^{k−1}$ bit `1`  
5. Per ogni k (ad eccezione per la più grande), il numero $Z_{k}$ di gruppi contenenti $2^{k}$ bit `1` soddisfa $B ≤ Z_{k} ≤ B + 1$ (i gruppi devono essere adiacenti).
	- nel senso che non ci possono essere troppi gruppi "uguali"

Nell'esempio che vedi sotto, la testa della Stream è l'elemento più recente.
Per ogni `k` ci sono almeno `B = 1` gruppi che contengono $2^{k}$ bit `1` e AL MASSIMO `B + 1` gruppi con $2^k$ bit `1`.
![[Pasted image 20260625170309.png]]

Per aggiornare i gruppi quando nuovi elementi vengono ricevuti si segue questa logica
- se il bit è `0` -> non si fa nulla
- se il bit è `1` 
	- viene creato un nuovo gruppo con solo il nuovo bit 
	- se ci sono `B + 2` gruppi contenenti $2^{0}$ bit `1`, vengono uniti
		- così ora ci sono `B` gruppi con $2^{0}$ bit `1` (l'ultimo creato) e viene creato un nuovo gruppo con $2^{1}$ bit `1`
	- viene ripetuto il processo finché non ci sono AL MASSIMO `B + 1` gruppi con $2^{i}$ bit `1`

Ogni singolo aggiornamento richiede tempo $O(\log(m))$ facendo uso della doppia lista collegata.

###### Rappresentazione della Stream: LISTA
Sia `L` una lista globale $$L = l_{q} \leftrightarrow l_{q-1} \leftrightarrow \dots l_{1}$$in cui l'elemento $l_{i}$, contiene tutti i gruppi con $2^{i}$ bit `1`, è a sua volta una doppia lista collegata $$l_{i} = G_{j_{1}} \leftrightarrow \dots \leftrightarrow G_{j_{s}}$$in cui, appunto, $G_{j_{1}} \leftrightarrow \dots \leftrightarrow G_{j_{s}}$ sono tutti i gruppi contenenti $2^{i}$ bit `1`.

###### Rappresentazione dei gruppi: COPPIA
Ogni gruppo è una coppia $(sx, dx)$ che rappresenta l'inizio e la fine del gruppo (tipo nella foto sopra $G_{1}(4)$ sarebbe rappresentato come $(sx = 2, dx=9)$)

###### Cosa viene salvato in ogni lista
- testa 
- coda
- numero di bit contenuti
- numero di bit `1` contenuti nei gruppi

###### Costo operazioni
Trovare i gruppi più a sinistra dato un $l_{i}$, unirli e spostare un gruppo in $l_{i+1}$ richiede tempo $O(1)$.
Un aggiornamento, nel caso peggiore, richiede tempo $$O(q) = O(\log(m))$$Più precisamente un aggiornamento, in media, richiede costo $$O(1)^{*} \ \ \text{ammortizzato}$$***Dimostrazione***
Si supponga che un aggiornamento aumenti $Z_{k}$ di un'unità, questo vuol dire che prima dell'aggiornamento $Z_{k'} = B + 1$ PER OGNI $k' \le k$.
In turno questa configurazione richiede $2^{k}-1$ aggiornamenti precedenti, che aggiunti al nuovo aggiornamento fa $2^{k}$ aggiornamenti totali.

Un aggiornamento ogni $2^{k}$ costa $O(k)$, ma è molto raro che avvenga (gli aggiornamenti da 1 a 2 son rari ma da 32 a 64 no).
Quindi il costo ammortizzato è $$\sum_{k=1}^{\infty} \frac k {2^{k}} = O(1)$$

###### Errore di DGIM
DGIM non conta esattamente gli `1` ma conta i gruppi che intersecano la finestra.
![[Pasted image 20260625182951.png]]

Chiamiamo con $d$ il numero reale di `1` contenuti nella finestra richiesta.
DGIM invece restituisce $\tilde{d}$, ossia **LA SOMMA DEGLI `1` CONTENUTI NEI GRUPPI CHE INTERSECANO LA FINESTRA**
- se un gruppo interseca la finestra anche solo con una parte (vedi foto sopra), DGIM **TENDE A CONTARLO *TUTTO***

Quindi DGIM può sovrastimare, e per questo vale $$d \le \tilde{d}$$e l'errore massimo (quello della foto) è circa $2^{k}$.

Tuttavia errore "in media" è abbastanza controllato, ossia non è troppo più grande rispetto a $d$.
Infatti sappiamo che per ogni dimensione più piccola ci sono almeno `B` gruppi e se il gruppo più vecchio che interseca la finestra contiene $2^{k}$ `1`, allora nella parte più recente della finestra ci sono anche gruppi più piccoli $$2^{k-1}, 2^{k-2}, \dots, 2^{0}$$e per ciascuna dimensione ce ne sono almeno `B`.

Quindi il numero reale di `1` presenti nella finestra è almeno: $$d≥B⋅2^{k−1}+B⋅2^{k−2}+⋯+B⋅2^{0}$$ossia $$d≥B \cdot \sum_{i=0}^{k-1} ​2^i$$che è pari a $$d \ge B(2^{k}-1)$$E grazie alla scelta $B = \lceil \frac 1 \epsilon \rceil$ si ottiene che l'errore relativo è al massimo proporzionale a $\epsilon$.
Quindi $$\tilde{d} \le d(1+\epsilon)$$e $$d \le \tilde{d} \le d(1+\epsilon)$$