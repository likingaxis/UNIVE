# MITZ-UPFAL CH01
## Verifica identità polinomiale
Due approcci
- Deterministico -> trasformo `H(x)` nella sua forma canonica e verifico se sia uguale a `G(x)`
- Randomizzato -> scelgo randomicamente un intero `r` (variabile aleatoria) da un range di valori possibili
	- calcolo `H(r)` e `G(r)` e verifico
### Teorema 
![[Pasted image 20260323112055.png]]

Questo significa che 
- se l'istanza è corretta (sono simili) allora l'algoritmo darà sempre la risposta corretta
- se l'istanza non è corretta (sono diversi) l'algoritmo PUÒ dare delle soluzioni sbagliate nel caso in cui scegliamo una delle `d` radici
	- questo perché se sono diversi ma prendo una radice, allora entrambi daranno come risultato `0`

## SPAZIO DELLE PROBABILITÀ
Ha tre componenti
- uno spazio dei campioni $\Omega$ -> insieme di tutti i possibili risultati 
- un insieme di insiemi `F`  che rappresenta gli eventi -> ogni insieme è un sottoinsieme di $\Omega$
- una funzione di probabilità $Pr: F \rightarrow R$ 
	- $F = 2^{\Omega}$ 

### FUNZIONE DI PROBABILITÀ
La funzione di probabilità deve rispettare le seguenti condizioni
1. Per ogni evento **E**, la probabilità di tale evento deve essere compresa tra 0 e 1 $$0 \le Pr(E) \le 1$$
2. La probabilità dello spazio dei campioni deve essere esattamente 1 $$Pr(\Omega) = 1$$
3. Per ogni sequenza finita di coppia di eventi mutualmente distinti $E_{1}, E_{2}, E_{3}, ...$ -> la probabilità dell'unione di tutti gli eventi è uguale alla somma delle probabilità degli eventi 
	![[Pasted image 20260323112808.png]]
	The probability of an event is the sum of the probabilities of its simple events.


## Eventi 
Due eventi `E` e `F` sono indipendenti se e solo se la probabilità della loro intersezione è uguale al prodotto delle loro probabilità.
![[Pasted image 20260323113419.png]]

Più in generale
![[Pasted image 20260323113432.png]]

## Probabilità condizionata
La probabilità condizionata che un evento `E` capiti sapendo che un evento `F` è già accaduto è data dall'intersezione delle loro probabilità fratto la probabilità di `F`
![[Pasted image 20260323113609.png]]

![[Pasted image 20260323113621.png]]


## INDIPENDENZA
![[Pasted image 20260323113644.png]]

## TEOREMA (legge della probabilità totale)
![[Pasted image 20260323113719.png]]![[Pasted image 20260323113727.png]]

## LEGGE DI BAYES
![[Pasted image 20260323113757.png]]

>[!tip]- Utili
>![[Pasted image 20260323113813.png]]![[Pasted image 20260323113822.png]]![[Pasted image 20260323113829.png]]

##### ESEMPIO UTILE
![[Pasted image 20260323120526.png]]
![[Pasted image 20260323120532.png]]

>[!tip] L'idea qui è che grazie al teorema di Bayes. ogni test positivo aumento la fiducia nella correttezza di ciò che stiamo ipotizzando


---

# MITZ-UPFAL CH02
## Variabili Aleatorie (R.V.)
Una **variabile aleatoria $X$** su uno spazio campionario $\Omega$ è una funzione a valori reali definita sugli esiti dello spazio: $X: \Omega \to \mathbb{R}$.
- **R.V. Discreta:** assume solo un numero finito o numerabile di valori.

## Indipendenza
Due variabili aleatorie $X$ e $Y$ si dicono **indipendenti** se e solo se per ogni coppia di valori $x, y$:
$$\Pr((X = x) \cap (Y = y)) = \Pr(X = x) \cdot \Pr(Y = y)$$
*Nota:* Sapere che è avvenuto $X$ non fornisce alcuna informazione sulla probabilità di $Y$.
- **Mutua Indipendenza:** Un insieme di variabili $X_1, X_2, \dots, X_k$ è mutuamente indipendente se per ogni sottoinsieme di indici $I \subseteq [1, k]$, la probabilità della loro intersezione è pari alla produttoria delle singole probabilità: $\Pr(\bigcap_{i \in I} X_i = x_i) = \prod_{i \in I} \Pr(X_i = x_i)$.

![[Pasted image 20260330104207.png]]

## Valore Atteso e Mediana
### Valore Atteso (Expectation)
Il valore atteso $E[X]$ di una variabile aleatoria discreta $X$ è la **media ponderata** di tutti i possibili valori che $X$ può assumere, pesati con la loro probabilità:
$$E[X] = \sum_{i} i \cdot \Pr(X = i)$$
- Esiste (è finito) solo se la serie $\sum_{i} |i| \Pr(X = i)$ converge.
- Rappresenta il "baricentro" della distribuzione.

### Mediana vs Media
- **Media (Valore Atteso):** Misura del valore medio/atteso (es. nel lancio di un dado è $3.5$).
- **Mediana ($m$):** È il valore che divide a metà la distribuzione. Formalmente, un valore $m$ tale che:$$\Pr(X < m) \leq 1/2 \quad \text{e} \quad \Pr(X > m) < 1/2$$
*Differenza chiave:* La media è influenzata dai valori estremi (outlier), la mediana è una misura di posizione più robusta.

## Linearità del Valore Atteso 
È una delle proprietà più potenti nell'analisi degli algoritmi probabilistici. 
>[!lemma] **Teorema** 
>Per **qualsiasi** coppia di variabili aleatorie $X$ e $Y$ (anche se dipendenti!):
$$E[X + Y] = E[X] + E[Y]$$
- **Estensione:** Vale anche per costanti $E[cX] = cE[X]$.
- **Importanza pratica:** Permette di calcolare il valore atteso di somme complesse spezzandole in componenti più semplici (es. somma di lanci di dadi o indicatori di successo).

## Distribuzioni Notevoli
### Variabile Aleatoria Bernoulliana (Indicator Variable)
Modella un esperimento con due soli esiti: "Successo" ($1$) o "Insuccesso" ($0$).
- $Y = 1$ con probabilità $p$; $Y = 0$ con probabilità $1-p$.
- **Valore Atteso:** $E[Y] = p$.
*Nota:* In informatica è spesso usata come **variabile indicatore** per segnalare se un evento si è verificato.

### Distribuzione Binomiale
Rappresenta il numero di successi in $n$ prove indipendenti (Bernoulliane) con probabilità $p$.
- **Formula:** $\Pr(X = j) = \binom{n}{j} p^j (1 - p)^{n-j}$.
	- $\binom{n}{j}$ -> modi diversi per ottenere `j` su `n` prove
	- $p^{j}$ -> successi
	- $(1-p)^{n-j}$ -> fallimenti
- **Valore Atteso:** $E[X] = np$.
*Dimostrazione rapida:* Grazie alla linearità del valore atteso, essendo $X$ la somma di $n$ Bernoulliane indipendenti $X_i$, allora $E[X] = \sum_{i=1}^n E[X_i] = \sum p = np$.

### Distribuzione Geometrica
Descrive il numero di tentativi indipendenti necessari per ottenere il **primo successo**.
- **Formula:** $\Pr(X = n) = (1 - p)^{n-1} p$    (ovvero $n-1$ fallimenti seguiti da un successo).
	- moltiplichiamo perché sono indipendenti
- **Valore Atteso:** $E[X] = \frac{1}{p}$.
- **Memoryless Property (Assenza di memoria):** Sapere che i primi $k$ tentativi sono falliti non cambia la probabilità del numero di tentativi rimanenti. È come se il processo ripartisse da zero:$$\Pr(X = n+k \mid X > k) = \Pr(X = n)$$
## 6. Coupon Collector's Problem
Un problema classico per stimare il tempo di completamento di una collezione (o la saturazione di una tabella hash).
- **Problema:** Ci sono $n$ tipi di coupon. Quante scatole devo comprare per averli tutti almeno una volta?
- **Modellazione:** Sia $X$ il numero totale di scatole e $X_i$ il numero di scatole comprate per trovare l' $i$-esimo coupon nuovo (mentre ne avevamo già $i-1$).
- $X_i$ segue una **distribuzione geometrica** con probabilità di successo $p_i = \frac{n - (i-1)}{n}$.
- Il valore atteso per ogni fase è $E[X_i] = \frac{1}{p_i} = \frac{n}{n-i+1}$.
- **Risultato Finale:** Per linearità, il tempo atteso totale è:$$E[X] = \sum_{i=1}^n E[X_i] = n \sum_{i=1}^n \frac{1}{i}$$
  Poiché $\sum \frac{1}{i}$ è la serie armonica che approssima $\ln n$, il valore atteso è circa **$n \ln n + \Theta(n)$**.

![[Pasted image 20260330104800.png]]


>[!tip] *Suggerimento per l'orale:* 
>Ricorda bene che la **linearità del valore atteso** non richiede l'indipendenza: è una domanda tipica dei professori per trabocchetto!


---


# MITZ-UPFAL CH-03
## Disuguaglianza di Markov
È lo strumento più semplice per porre un limite superiore (upper bound) alla probabilità che una variabile aleatoria superi una certa soglia.
>[!lemma] Teorema 
>Per ogni variabile aleatoria **non negativa** $X$ e per ogni $a > 0$:$$\Pr(X \geq a) \leq \frac{E[X]}{a} \ \ \ \ \frac{\rightarrow \text{valor medio}}{\rightarrow \text{soglia}}$$
* **Caratteristiche:**
    * Non richiede l'indipendenza.
    * È un "bound" debole perché usa solo il valore atteso (poca informazione).
    * è utile se il risultato è $< 1$, ossia se `a` è molto grande
* **Esempio (Coin Flips):** Qual è la probabilità di ottenere più di $3N/4$ teste in $N$ lanci?
    *   $E[X] = N/2$. Applicando Markov: $\Pr(X \geq 3N/4) \leq \frac{N/2}{3N/4} = \frac{2}{3}$.
    *   *Nota:* Questo limite è molto pessimistico, la probabilità reale è molto più bassa.
![[Pasted image 20260331154817.png]]


## Varianza e Deviazione Standard 
Mentre il valore atteso indica il "centro", la **varianza** misura quanto i valori sono dispersi attorno ad esso.
* **Definizione:** $Var[X] = E[(X - E[X])^2] = E[X^2] - (E[X])^2$.
* **Deviazione Standard ($\sigma$):** $\sigma(X) = \sqrt{Var[X]}$. Ha la stessa unità di misura di $X$.
*   **Intuizione grafica:**
    ![[Pasted image 20260331154927.png|550]]


## Disuguaglianza di Chebyshev 
È più potente di Markov perché sfrutta la varianza per limitare la deviazione in entrambe le direzioni (troppo grande o troppo piccolo).
>[!lemma] Teorema 
>Per ogni variabile aleatoria $X$: $$\Pr(|X - E[X]| \geq a) \leq \frac{Var[X]}{a^2}$$
* **Logica:** La probabilità che la r.v. $X$ si discosti dal suo valore medio per un fattore additivo $a$ è limitata dal rapporto tra varianza e $a^2$.
>[!tip]- Dimostrazione (usando Markov)
>![[Pasted image 20260331155703.png]]


>[!lemma] Teorema
>Per ogni variabile aleatoria $$Pr(|X - E[X]| \ge a\sigma[X]) \le \frac 1 {a^{2}}$$



>[!lemma] Teorema dell'Indipendenza 
>Se $X$ e $Y$ sono **indipendenti**:
>    1.  $E[XY] = E[X] \cdot E[Y]$
>    2.  $Var[X + Y] = Var[X] + Var[Y]$ (La varianza della somma è la somma delle varianze).


## Analisi dei Coin Flips con Chebyshev
Riprendendo l'esempio di $N$ lanci di moneta (Bernoulli trial):
* Per una singola moneta (Bernoulli $p=1/2$): $E[X_i] = 1/2$ e $Var[X_i] = p(1-p) = 1/4$.
* Per $N$ lanci indipendenti (Binomiale): $E[X] = N/2$ e $Var[X] = N/4$.
* **Bound di Chebyshev:** La probabilità di avere $X \geq 3N/4$ (ovvero una deviazione $\geq N/4$ dalla media) è: $$\Pr(|X - N/2| \geq N/4) \leq \frac{N/4}{(N/4)^2} = \frac{4}{N}$$
* **Conclusione:** Rispetto al $2/3$ di Markov, il limite di Chebyshev ($4/N$) è **significativamente migliore** perché diminuisce all'aumentare di $N$.

![[Pasted image 20260331160407.png]]


## Distribuzioni e Varianze Notevoli 

### Variabile Binomiale ($B(n, p)$)
*   Somma di $n$ prove di Bernoulli indipendenti.
![[Pasted image 20260331160509.png]]

### Variabile Geometrica (Primo successo al tentativo $n$)
- **Definizione:** una variabile aleatoria geometrica `X` con un parametro `p` è data da $$Pr(X=n) = (1-p)^{n-1}p$$con `n = 1, 2,...` 
* **Valore Atteso:** $E[X] = 1/p$.
* **Varianza:** $Var[X] = \frac{1-p}{p^2}$.
* **Memoryless Property:** Il processo "dimentica" i fallimenti passati. $\Pr(X = n+k | X > k) = \Pr(X = n)$.

## 6. Coupon Collector's Problem: Bound Avanzati
Abbiamo già visto che il tempo atteso è $E[X] = nH_n \approx n \ln n$. 

>[!question] Come varia questo tempo?
* **Con Markov:** $\Pr(X \geq 2nH_n) \leq 1/2$. (Poco utile).
* **Con Chebyshev:** Si dimostra che $Var[X] \leq \frac{\pi^2 n^2}{6}$. 
	* Applicando Chebyshev, la probabilità di deviazione decresce come $O(\frac 1 {\ln^2 n})$. (Molto meglio)
* **Direct Bound & Union Bound:**
    * **Union Bound:** La probabilità che si verifichi almeno uno tra più eventi è $\leq$ alla somma delle singole probabilità: $$\Pr(\cup A_i) \leq \sum \Pr(A_i)$$
    ![[Pasted image 20260331161401.png]]![[Pasted image 20260331161452.png]]
    * Per l'**Union Bound**, la probabilità che *almeno un* coupon manchi è $\leq n \cdot e^{-(n \ln n + cn)/n} = e^{-c}$.
    *   Se scegliamo $c = \ln n$ (ovvero $t = 2n \ln n$), la probabilità di fallimento è solo $\frac 1 n$.
	    ![[Pasted image 20260331161606.png]]

## Legge dei Grandi Numeri
Spiega perché campionare più volte un fenomeno ci dà una stima precisa.
* **Vantaggio dei campioni multipli:** Se prendiamo la media di $n$ variabili indipendenti $\bar{X} = \frac{1}{n}\sum X_i$, la varianza della media è: $$Var[\bar{X}] = \frac{1}{n^2} \sum Var[X_i] = \frac{Var[X]}{n}$$    *La varianza diminuisce linearmente col numero di campioni!*
* **Legge Debole dei Grandi Numeri:** Al crescere del numero di campioni $n$, la media campionaria $\bar{X}_n$ converge quasi certamente al valore atteso reale $E[X]$. $$\lim_{n \to \infty} \Pr(|\bar{X}_n - E[X]| \leq \epsilon) = 1$$*In Big Data, questo giustifica l'uso del campionamento (sampling) per approssimare proprietà di dataset enormi.*


---


# 4. Cont Resolution Andy
## Chernoff Bounds (Sopra la media)
I Chernoff Bounds sono strumenti fondamentali per limitare la coda di una distribuzione. Rispetto alla disuguaglianza di Chebyshev, offrono un bound molto più "stretto" (esponenziale invece che polinomiale).

### Teorema (Above Mean)
Siano $X_1, \dots, X_n$ variabili aleatorie **indipendenti** binarie ($0,1$). 
Sia $X = \sum X_i$ e $\mu \geq E[X]$. 
Per ogni $\delta > 0$:
$$\Pr[X > (1 + \delta)\mu] < \left( \frac{e^\delta}{(1 + \delta)^{(1 + \delta)}} \right)^\mu$$

#### Confronto importante
Un confronto fondamentale:
* **Chebyshev:** La distribuzione ha "code spesse", permettendo deviazioni grandi con probabilità relativamente alta.
* **Chernoff:** La distribuzione è **molto concentrata** attorno alla media. Le "code" decrescono esponenzialmente. Questo significa che grandi deviazioni sono quasi impossibili.
![[Pasted image 20260420103341.png]]
* **Confronto pratico:** Se applichiamo Chernoff a una variabile binomiale $X \sim B(n, 1/2)$ con $\delta = 1/4$:
    * Con Chebyshev otteniamo un bound di $\frac{n}{4}$.
    * Con Chernoff otteniamo $\beta^{n/2}$ (dove $\beta < 1$). Al crescere di $n$, la probabilità di errore crolla a zero velocemente.
![[Pasted image 20260420103507.png]]

## Contention Resolution in Sistemi Distribuiti
**Problema:** $n$ processi ($P_1, \dots, P_n$) competono per l'accesso a una risorsa condivisa. Se $\geq 2$ processi accedono contemporaneamente, avviene una collisione e tutti rimangono bloccati.
**Vincolo:** I processi sono **anonimi** e **non possono comunicare** tra loro (Symmetry-breaking paradigm).

### Il Protocollo (Randomizzato)
Ogni processo richiede l'accesso a ogni istante $t$ con probabilità $p = 1/n$.

### Analisi del Successo
Sia $S_{i,t}$ l'evento "il processo $i$ riesce ad accedere al tempo $t$".
$$\Pr[S_{i,t}] = p(1-p)^{n-1} = \frac{1}{n} \left(1 - \frac{1}{n}\right)^{n-1}$$
* **Dalle Slide:** Per $n \to \infty$, il termine $(1 - 1/n)^{n-1}$ converge a $1/e$. 
* Quindi: $\frac{1}{en} \leq \Pr[S_{i,t}] \leq \frac{1}{2n}$.

>[!tip] **N.B. 1:** Gli eventi $S(i_1, t)$ e $S(i_2, t)$ (due processi diversi nello stesso istante) **NON sono indipendenti**. Se uno ha successo, l'altro deve aver fallito.

>[!tip] **N.B. 2:** Gli eventi $\bigcap_{j=1}^t \bar{S}(i, j)$ (lo stesso processo in istanti diversi) **SONO indipendenti**.

### Risultati Fondamentali
1. **Fallimento del singolo:** La probabilità che il processo $i$ fallisca per $t = \lceil en \rceil$ round è $\leq 1/e$. Se scegliamo $t = \lceil en \rceil \cdot c \ln n$, la probabilità di fallimento scende a $1/n^c$. ![[Pasted image 20260420105729.png]]
2. **Successo Globale (Union Bound):** Vogliamo che **tutti** i processi abbiano successo. Usando l'Union Bound, se impostiamo $t = 2e \cdot n \ln n$, la probabilità che esista ancora un processo che non ha ottenuto la risorsa è $\leq 1/n$ (questo si chiama *claim versione negativa*).
    *   **Conclusione:** Con altissima probabilità ($1 - 1/n$), tutti finiscono entro $O(n \log n)$ round.
![[Pasted image 20260420105934.png]]

## Load balancing
Vedere [[ALGORITMI - DA SOSTITUIRE CON PDF#^210441|Load Balancing]] 

---


# 4. Hashing

### 4.1 Famiglia k-indipendente
**Famiglia k-indipendente:** Una famiglia di funzioni hash dove la scelta di $h$ rende i valori $h(x_1), \dots, h(x_k)$ variabili aleatorie indipendenti e uniformi.

### 4.2 Hashing universale
>[!tip] *Nota Bene: In questi appunti, $n$ è definito come il numero di slot di arrivo della funzione hash.*

Una famiglia di funzioni hash $\mathcal{H}$ è detta universale se scegliendo $h \in_u \mathcal{H}$, $h : U \to [0, n)$, dati $\forall x_1 \neq x_2 \in U$
$$\Pr[h(x_1) = h(x_2)] \le \frac{1}{n}$$
Si nota che questa probabilità è quella che ci si aspetta per una funzione hash che dia un risultato *veramente* casuale.

>[!lemma] **Teorema 4.1** (2-indipendenza implica universalità).
Il teorema afferma che se una famiglia di funzioni hash è **2-indipendente**, allora è automaticamente anche **universale**.

Per capire la dimostrazione, dobbiamo ricordare che
- **Famiglia 2-indipendente:** Per ogni coppia di elementi $x_{1}$. $x_{2}$ e ogni coppia di slot $y_{1}$, $y_{2}$, la probabilità che $h(x_{1}) = y_{1}$ e la probabilità che $h(x_{2}) = y_{2}$ è esattamente $\frac 1 n \cdot \frac 1 n = \frac 1 {n^{2}}$.****

Quindi
$$\Pr[h(x_1) = h(x_2)] = \sum_{y \in [0,n)} \Pr[h(x_1) = h(x_2) \land h(x_2) = y]$$
$$= \sum_{y \in [0,n)} \Pr[h(x_1) = y \land h(x_2) = y]$$
$$= \sum_{y \in [0,n)} \frac{1}{n^2} = \frac{1}{n}$$
>[!tip] Dato che dobbiamo sommare il valore $\frac 1 {n^{2}}$ per tutti i possibili slot `y` e questi slot sono in totale `n` (da `0` a `n-1`), allora abbiamo $$n \cdot \frac 1 {n^{2}} = \frac 1 n$$


>[!lemma] **Teorema 4.2.** 
>Sia $\mathcal{H}$ una famiglia di funzioni hash universali e sia $S \subseteq U$ un insieme di $k$ elementi. 
>Sia $u \in S$. Si sceglie in modo uniforme una funzione $h$ da $\mathcal{H}$, e sia $X$ la variabile aleatoria che conta il numero di elementi di $S$ mappati nello stesso elemento $h(u)$ allora
$$E[X] \le 1 + \frac{k}{n}.$$

*Dimostrazione.* Sia $u$ fissato, per ogni $s \in S$, si definisce la variabile aleatoria $X_s$ associata
$$X_s = \begin{cases} 1 & \text{se } h(s) = h(u) \\ 0 & \text{altrimenti} \end{cases} \quad X = \sum_{s \in S} X_s$$
Per cui si ha
$$E[X] = \sum_{s \in S} E[X_s] = \sum_{s \in S} \Pr[h(s) = h(u)]$$
$$= 1 + \sum_{s \in S \setminus \{u\}} \Pr[h(s) = h(u)]$$
(Per universalità) $\le 1 + \frac{k}{n}$.

*Nota: per $m = \Theta(n)$ si ha $O(1)$ tempo per operazione.* $\square$

### 4.3 Esempi famiglie hash universali

#### 4.3.1 Esempio 1
L'obiettivo di questo metodo è mappare un elemento $x$ (che può essere molto grande) in uno degli $n$ slot disponibili, usando un numero primo $m$ come "base".
##### 1. La Preparazione 
* **Il numero primo $m$**: Si sceglie un numero primo $m$ tale che sia più grande del numero di slot $n$ ($m > n$). Per i teoremi sui numeri primi, ne esiste sempre uno compreso tra $n$ e $2n$.
* **Rappresentazione di $x$**: Ogni elemento dell'universo $U$ viene "spezzato" in $r$ cifre, come se fosse scritto in base $m$. Quindi $x$ diventa un vettore $(x_1, x_2, \dots, x_r)$, dove ogni cifra è compresa tra $0$ e $m-1$.
* **La chiave $a$**: Per definire una specifica funzione hash dalla famiglia, scegliamo a caso un vettore $a = (a_1, a_2, \dots, a_r)$. Questo vettore funge da "chiave" della funzione.

##### 2. La Funzione Hash
La funzione moltiplica ogni "cifra" di $x$ per la corrispondente "cifra" della chiave $a$ e somma tutto, calcolando poi il resto della divisione per $m$:
$$h_a(x) = \left( \sum_{i=1}^r a_i x_i \right) \pmod m$$
*(In termini matematici, è il prodotto scalare tra il vettore $a$ e il vettore $x$ nel campo $\mathbb{Z}_m$)*.

>[!lemma] **Teorema 4.3 (Universalità).** 
>La famiglia $\bar{\mathcal{H}}$ è una famiglia universale.

*Dimostrazione*: Vogliamo dimostrare che se prendiamo due elementi diversi $x$ e $y$, la probabilità che abbiano lo stesso hash è molto bassa ($\le 1/m$).

**Il passaggio logico fondamentale:**
1. **Individuare la differenza**: Se $x \neq y$, deve esistere almeno una posizione $j$ in cui le loro cifre sono diverse ($x_j \neq y_j$).
2. **L'equazione della collisione**: C'è una collisione se $h_a(x) = h_a(y)$. Sviluppando i calcoli e isolando il termine "differente" $j$, otteniamo:
    $$a_j(y_j - x_j) = \sum_{i \neq j} a_i(x_i - y_i) \pmod m$$
3. **L'importanza del numero primo**: Poiché $m$ è primo, l'espressione $(y_j - x_j)$ ha un'**inversa moltiplicativa** (chiamata $z^{-1}$). Questo significa che possiamo moltiplicare (e quindi dividere) per quel termine.
4. **Soluzione unica**: Per ogni possibile scelta di tutte le altre componenti di $a$ ($a_i$ con $i \neq j$), esiste **una e una sola** scelta della componente $a_j$ che soddisfa l'equazione e causa la collisione: $$a_j = a \cdot z^{-1} \pmod m$$
5. **Calcolo della probabilità**: Poiché $a_j$ è scelto a caso tra $m$ valori possibili, la probabilità che colpisca proprio l'unico valore che crea la collisione è esattamente **$1/m$**. $$\Pr[a_j \equiv_m \alpha z^{-1}] \le \frac{1}{m}.$$
#### 4.3.2 Esempio 2
Mentre il primo esempio usava i vettori, questo esempio usa un **polinomio di primo grado** (una retta: $ax + b$) per distribuire i dati.

#### 1. La Struttura della Funzione
La funzione è definita come:
$$h_{a,b}(x) = [(ax + b) \pmod p] \pmod m$$

* **$p$ (Numero Primo):** Si sceglie un numero primo molto grande $p \ge n$.
* **$a, b \in \mathcal{Z}_p$ (Le Chiavi):** Sono due numeri scelti casualmente tra $0$ e $p-1$ (con $a \neq 0$). Rappresentano i coefficienti della nostra "retta" e sono definite come nell'esempio precedente.
* **$m$ (Gli Slot):** È il numero di posizioni nella nostra tabella hash.
* **Il doppio "Modulo":** 
    1. $\pmod p$  proietta il risultato nel campo finito $\mathbb{Z}_p$​, e garantisce l'universalità della famiglia di funzioni hash.
    2. $\pmod m$  converte il valore ottenuto nell'intervallo degli indici validi della tabella hash, cioè $\{0,\ldots,m-1\}$.

#### 2. Perché è "2-indipendente"? 
Questa famiglia è 2-indipendente perché, scelti due elementi diversi $x$ e $y$, i loro risultati prima dell'ultimo modulo ($X$ e $Y$) sono distribuiti in modo quasi totalmente indipendente.

**I passaggi chiave della dimostrazione:**
1. **Iniettività:** se $x \neq y$, allora necessariamente $ax + b \neq ay + b \pmod p$. Questo perché l'equazione $a(x-y) \equiv 0 \pmod p$ non può avere soluzioni se $a \neq 0$ e $x, y < p$. Quindi, non ci sono collisioni "immediate" nel primo passaggio.
2. **Sistema di equazioni:** Se vogliamo che $x$ finisca in $i$ e $y$ finisca in $j$, dobbiamo risolvere: $$\begin{cases} ax + b \equiv i \pmod p \\ ay + b \equiv j \pmod p \end{cases}$$
    Questo è un sistema di due equazioni con due incognite ($a$ e $b$). Poiché $p$ è primo, esiste **sempre una e una sola coppia** di $(a, b)$ che soddisfa questa condizione.
3. **Probabilità:** Dato che esiste una sola coppia $(a, b)$ su tutte le $p(p-1)$ combinazioni possibili, la probabilità che $x$ e $y$ colpiscano esattamente quei due bersagli è: $Pr[X = i \land Y = j] = \frac{1}{p(p-1)}$.

#### 3. Come si arriva all'Universalità?
Per dimostrare che la funzione è universale, dobbiamo vedere cosa succede quando applichiamo l'ultimo modulo ($\pmod m$ ).
* Sappiamo che $X$ e $Y$ (i risultati dopo il primo modulo) sono diversi.
* Quanti valori di $Y$ collidono con $X$ quando facciamo $\pmod m$? Ci sono al massimo $\lceil p/m \rceil$ valori che hanno lo stesso resto.
* La probabilità finale di collisione è: $$\Pr[Y \equiv X \pmod m] \le \frac{1}{m}$$

### 4.4 Perfect hashing
Parliamo ora di funzioni hash *perfette* ovvero una funzione hash senza collisioni.

**Definizione 4.3.1** (funzione hash perfetta). Una funzione hash $h : [1, n] \to [0, M]$ è detta perfetta su un insieme $A \subseteq [1, n]$ se e solo se per ogni $x_1 \neq x_2 \in A$ si ha $h(x_1) \neq h(x_2)$, quindi è iniettiva su $A$. In generale cerchiamo una funzione che abbia tale proprietà con alta probabilità.


>[!lemma] **Teorema 4.5.** 
>Se una famiglia $\mathcal{H}$ di funzioni $h : [1, n] \to [0, M)$ è universale e $M \ge n^{c+2}$ per una costante $c$ arbitrariamente grande allora $h \in_u \mathcal{H}$ è perfetta su ogni insieme $A \le [1, n]$ con alta probabilità.

*Dimostrazione.* 
Universalità significa che $\Pr[h(x_1) = h(x_2)] \le \frac{1}{M}$ per $x_1 \neq x_2$, ci sono al massimo $|A|^2 \le n^2$ coppie di elementi distinti in $A$, dallo union bound la probabilità di avere almeno una collisione è al massimo $\frac{n^2}{M}$, scegliendo $M = n^{c+2}$ si ha una collisione con probabilità $\le n^{-c}$, ovvero la funzione è perfetta con alta probabilità $(1 - n^{-c})$. 


### 4.5 Il problema del dizionario
Il problema del dizionario è spesso presentato come l'esempio pratico per mostrare l'efficacia delle funzioni hash.

Il dizionario è un tipo di dati che, dato un universo $U$ di elementi possibili, mantiene un sottoinsieme arbitrario $S \subseteq U$ tale che operazioni come intersezione, unione, e ricerca in $S$ siano efficienti.
Queste operazioni sono rappresentate come:
*   `create()` inizializza un dizionario vuoto
*   `insert(u)` aggiunge un elemento $u \in U$ a $S$
*   `delete(u)` rimuove un elemento $u$ da $S$
*   `lookup(u)` risponde alla domanda $s \in S$?

La sfida principale riguarda la grandezza dell’universo $U$ che può essere estremamente grande, per cui definire un array di dimensione $|U|$ non è ragionevole.

Si cerca una soluzione proporzionale al sottoinsieme $n := |S|$. 
- Una **soluzione deterministica** è implementata con gli alberi **AVL** con $O(n)$ spazio e $O(\log n)$ tempo per operazione.
- Si presenta una **soluzione probabilistica** con $O(n)$ spazio e $O(1)$ tempo atteso per operazione, a tale scopo si presenta il concetto di tabelle hash.

#### 4.5.1 Tabelle hash
Viene creato un array $H$ di grandezza $m \approx n$, quindi $H = [m]$. Si ha una collisione quando $h(u) = h(v)$ per $u \neq v$.
Mediamente, per il paradosso del compleanno, una collisione è attesa ogni $\sqrt{n}$ inserimenti.

Per ogni posizione $i$ dell’array $H[i]$ contiene delle *linked list* che contengono tutti gli elementi che collidono, solitamente chiamate *liste di trabocco*.

![[Pasted image 20260503122740.png]]

Le operazioni sono implementate come segue
- viene calcolato il valore di $h(u)$, 
- successivamente l’operazione viene eseguita scandendo $H(h(u))$. 
- È quindi necessario utilizzare una funzione hash $h$ che distribuisca gli elementi di $S$ in modo uniforme.

È possibile utilizzare la tecnica dell’*hashing deterministico*, in cui ogni elemento $u \in U$ è rappresentato come intero, scegliendo un primo $p$, tale che $m \le p \le 2m$ allora $h$ è definito come
$$h(u) = u \pmod p$$
funziona bene per applicazioni statiche in cui $S$ non varia.

Per applicazioni in cui $S$ varia si fa uso delle funzioni hash universali, di cui sono state precedentemente descritte le proprietà ed esempi. 
Si ricordano 
- la variabile $n$ rappresentante il numero di elementi di $S$, 
- $N = |U|$, 
- $m$ numero primo compreso $N \le m \le 2N$. 
Si fa uso della tecnica di *[[ALGORITMI - DA SOSTITUIRE CON PDF#^268207|Double/Halving Tecnique]]*.


---

## 5. Problemi di BigData 
In questa sezione si parla di problemi per cui la dimensione dei dati è eccessiva, ad esempio si potrebbe essere interessati a valutare uno dei seguenti problemi:
1. Pagine con una grande porzione di parole simili
2. Clienti con acquisti simili
3. Immagini con elementi simili

**Esempio 3.** Input: punti ad alte dimensioni $x_1, x_2, \dots, x_N$
$$\begin{bmatrix} 1 & 4 & 1 \\ 0 & 2 & 1 \\ 0 & 1 & 0 \end{bmatrix} \implies [1 \ 4 \ 1 \ 0 \ 2 \ 1 \ 0 \ 1 \ 0] \in \{0, 1, \dots, c\}^h.$$
per $h$ molto grande.

Si introduce una funzione di distanza $d(x_1, x_2)$ che quantifichi quanto i due dati sono *vicini*. Un’applicazione comune consiste nel trovare tutte le coppie di dati in un insieme di dati che sono "abbastanza" vicini (rispetto a una soglia $s$) per cui $d(x_1, x_2) \le s$.

Una soluzione deterministica banale richiede tempo $O(N^2 \cdot h)$ con $N$ numero di punti e $h$ dimensione dei dati. Banalmente si calcola la distanza per ogni coppia possibile $\binom{n}{2} = O(n^2)$.
È possibile trovare coppie di dati simili in tempo $O(N \cdot h')$ con $h' \ll h$, come spiegato di seguito.

### 5.1 Document Similarity
Dato un grande insieme di documenti $U^*$ di dimensione $N \approx 10^9$, si vogliono trovare i documenti simili. Le applicazioni possibili riguardano la ricerca di siti web duplicati e la ricerca di notizie simili.

Il problema descritto presenta diverse sfide:
* molti pezzi piccoli di un documento possono essere in ordine diverso
* il numero di documenti ($N$) è troppo elevato per confrontare tutte le coppie
* i documenti possono essere talmente grandi ($h$) da non poter essere mantenuti in memoria

È inoltre necessario definire una funzione di distanza adeguata, a tale scopo si fa uso della *Jaccard Similarity* definita su due insiemi $C_1, C_2$ come segue
$$\text{Jaccard similarity}(C_1, C_2) = \frac{|C_1 \cap C_2|}{|C_1 \cup C_2|}$$
Si definisce anche un'altra misura *Jaccard Distance* $d(C_1, C_2) = 1 - \text{J. Sim}(C_1, C_2)$. Resta ora da definire come applicare la Jaccard Similarity a due documenti (stringhe di lunghezza finita).

Si definiscono i punti chiave della risoluzione del problema:
1. Input: Un universo $U$ enorme di documenti
2. **Shingling**: conversione dei documenti in *grandi insiemi*
3. **Min-Hashing**: conversione di grandi insiemi in *piccole firme* mantenendo la J. Sim
4. **Local-Sensitive-Hashing**: Individuare le firme che potrebbero essere simili
5. Output: coppie di documenti candidati

Restano ora da definire nel dettaglio le tecniche descritte.

#### 5.1.1 Shingling
Facciamo uso della tecnica di *Shingling* per convertire i documenti in insiemi. Un *$k$-shingle* per un documento è una sequenza di $k$ token che appaiono in un documento. 
I token possono generalmente essere definiti come: 
- caratteri 
- o parole
si fa uso di $U_t$ per rappresentare l’insieme di tutti i possibili *token*.

>[!example] **Esempio 4.** 
>Si assumano i token come caratteri dell’alfabeto. Sia $k = 2$.
Per i documenti $D_1 = abcab, D_2 = ccadf$, gli insiemi di 2-shingle corrispondenti sono
$$S(D_1) = \{ab, bc, ca\} \quad S(D_2) = \{cc, ca, ad, df\}$$

Ogni documento $D \in U$ può quindi essere rappresentato come l’insieme dei suoi $k$-shingle $$C = S(D)$$In modo più pratico ogni documento è rappresentato come un vettore binario avente ogni possibile elemento dell’insieme $U^k$. 
Codificando gli insiemi come vettori binari è possibile definire l’intersezione come *bitwise and* e l’unione come *bitwise or*. 
È facile notare che questi **vettori sono molto grandi**, ma conservano i dati in modo **sparso**.
![[Pasted image 20260504121845.png]]

Possiamo sfruttare la Jaccard Similarity
![[Pasted image 20260504122024.png]]

È inoltre facile rappresentare la J. Sim con un’interpretazione probabilistica
$$\text{J. Sim}(C_1, C_2) = \frac{C_1 \cap C_2}{C_1 \cup C_2} = \Pr[C_1 \cap C_2 \mid C_1 \cup C_2].$$$$= \frac {Pr[C_{1} \cap C_{2}]} {Pr[C_{1} \cup C_{2}]}$$
![[Pasted image 20260504122549.png]]
È uniforme -> tutti gli elementi hanno la stessa probabilità di essere scelti

###### Utilità per ordine di parole
Questa tecnica permette inoltre di trovare documenti simili anche per testi che appaiono in ordine diverso -> avendo dei sottoinsiemi di caratteri (shingles) possiamo considerare anche l'ordine.

L’insieme di tutti i dati gestiti è visibile come una matrice $M \in \{0, 1\}^{N \times m}$ con $N$ numero di documenti e $m = |U|^k$ shingles possibili. 


#### 5.1.2 Min-hashing
Il punto di partenza è l'inefficienza computazionale. Dopo aver trasformato i documenti in insiemi di *shingle*, il calcolo della similarità di Jaccard per ogni possibile coppia di documenti diventa proibitivo quando si lavora con milioni di file ($N^2$ confronti). 

Per risolvere questo problema dobbiamo comprimere i doc originali in **firme (signatures)** di dimensione fissa e ridotta, che però conservino la "memoria" della similarità originale.

##### La Matrice Caratteristica
Per visualizzare il processo, si immagina una **matrice caratteristica** dove le righe rappresentano tutti i possibili shingle e le colonne rappresentano i documenti. Una cella vale 1 se lo shingle è presente nel documento, 0 altrimenti.
![[Pasted image 20260504161300.png]]


##### Definizione Formale del Min-Hash
Il Min-Hashing è la tecnica specifica che permette di approssimare la Jaccard Similarity. 

Data una permutazione casuale $\pi$ delle righe della matrice, definiamo la funzione Min-Hash $h_\pi(C)$ come l'indice della **prima riga** (secondo l'ordine imposto da $\pi$) in cui il documento $C$ presenta il valore 1. Matematicamente, questo si esprime come:
$$h_\pi(C) = \min\{\pi(r) \mid C[r] = 1\}$$
In termini intuitivi, la permutazione agisce come un "punteggio di priorità" assegnato agli shingle; il Min-Hash cattura semplicemente lo shingle con la priorità più alta tra quelli posseduti dal documento. Poiché generare permutazioni fisiche di milioni di righe è costoso, nella pratica si utilizzano funzioni hash casuali per simulare questo comportamento.

##### La Proprietà di Preservazione della Similarità
Il cuore teorico del metodo è il **Teorema della Preservazione della Similarità**, il quale stabilisce che la probabilità che due documenti producano lo stesso valore di Min-Hash è identica alla loro similarità di Jaccard:
$$Pr[h_\pi(C_1) = h_\pi(C_2)] = J.Sim(C_1, C_2)$$
La dimostrazione considera l’unione delle righe in cui almeno uno dei due documenti ha valore 1.  
Applicando una permutazione casuale $\pi$, l’elemento con valore minimo secondo $\pi$ è ugualmente probabile tra tutti gli elementi dell’unione.  
I due documenti avranno lo stesso valore di MinHash se e solo se questo elemento minimo appartiene anche alla loro intersezione.

Ci sono poi tre tipi di righe nell'unione:
1.  **Tipo A (Intersezione):** Entrambi i documenti hanno 1.
2.  **Tipo B:** Solo il documento $C_1$ ha 1.
3.  **Tipo C:** Solo il documento $C_2$ ha 1.

**Quando è che $min(\pi(C_1)) = min(\pi(C_2))$?**
Succede solo se la prima riga che incontriamo scorrendo la permutazione (quella che ha il valore minimo) è di **Tipo A**.

**Qual è la probabilità di pescare una riga di Tipo A come prima riga dell'unione?**
È il numero di righe di tipo A diviso il numero totale di righe (A+B+C).
*   Numero di righe di Tipo A = $|C_1 \cap C_2|$ (Intersezione)
*   Numero totale di righe (A+B+C) = $|C_1 \cup C_2|$ (Unione)

Quindi la probabilità è:
$$\frac{|C_1 \cap C_2|}{|C_1 \cup C_2|}$$
Che è, per definizione, la **Jaccard Similarity**.

##### Dalla Funzione Hash alla Signature Matrix (SIG)
Una singola funzione Min-Hash fornisce una stima troppo grezza (il risultato è solo "uguale" o "diverso"). Per ottenere una precisione statistica, si utilizzano più funzioni Min-Hash indipendenti $$h_{\pi_1}, h_{\pi_2}, \dots, h_{\pi_k}$$ciascuna basata su una permutazione diversa.
![[Pasted image 20260504164232.png]]
Per ogni documento, l'insieme di questi valori forma un vettore chiamato **firma**. Tutte le firme vengono raccolte nella **Signature Matrix (SIG)**. Se la matrice originale aveva milioni di righe (shingle), la matrice SIG ne avrà solo $k$ (solitamente tra 100 e 500). Lo spazio occupato è ora logaritmico rispetto alla dimensione originale del dataset, permettendo di gestire i dati interamente in memoria RAM.

##### Stima della Similarità tramite Firme (Sign-Sim)
Una volta ottenuta la matrice SIG, il confronto tra documenti avviene direttamente tra i vettori firma. 
Definiamo la **Sign-Sim** come <u>la frazione di componenti della firma in cui i due documenti coincidono</u>. 
Dal punto di vista statistico, stiamo trattando ogni riga della firma come una variabile aleatoria 
$$\mathcal{Z} = \begin{cases} 1 \ se \ min(\pi(C_{1})) = min(\pi(C_{2})) \\ 0 \ altrimenti \end{cases}$$
La media di queste variabili su un numero elevato di prove (permutazioni) convergerà, per la legge dei grandi numeri, al valore reale della similarità di Jaccard.

Qui viene riportato un esempio in cui si confronta il valore ottenuto dalla Jaccard (ottimo) e quello ottenuto con il Min-Hashing
![[Pasted image 20260504164707.png]]
- la tabella 1 va vista dalla matrice originale (con 7 elementi)
- la tabella 2 va vista dalla matrice delle firme (con 3 elementi)
È un buon risultato.

Vedere algoritmi [[ALGORITMI - DA SOSTITUIRE CON PDF#^05ddb5|Doc-Pair Check]] e [[ALGORITMI - DA SOSTITUIRE CON PDF#^4a5dc4|Calcolo della matrice delle firme]]

>[!problem] ATTENZIONE: Tutte le tecniche impiegate finora non hanno permesso di superare la barriera nel numero di confronti in $\Theta(n^2)$

Per questo viene presentata la seguente tecnica:

#### 5.1.3 Local Sensitive Hashing: superare la barriera quadratica
Nonostante il Min-Hashing risolva il problema della dimensione dei dati (trasformando documenti giganti in firme compatte), esso non risolve il problema del **numero di confronti**. Se possediamo $N$ documenti, determinare tutte le coppie simili richiederebbe comunque un numero di confronti pari a $\Theta(N^2)$. 

La tecnica **LSH** nasce per superare questa barriera, fungendo da filtro probabilistico: l'obiettivo è identificare rapidamente solo le **coppie candidate**, ovvero quelle la cui similarità è sufficientemente alta da giustificare un confronto dettagliato, scartando a priori tutte le altre.

##### 1. Definizione di Coppia Candidata
L'algoritmo si basa sulla possibilità di definire una funzione $f(x, y)$ in grado di selezionare i potenziali match.

**Definizione 5.1.2:** Siano $X$ e $Y$ due colonne della matrice delle firme $SIG(*, *)$. Esse sono definite **candidate** se le loro firme MinHash sono identiche per almeno una frazione $s$ delle loro righe:
$$\frac{|\{i \in [t] \mid SIG(i, X) = SIG(i, Y)\}|}{t} \geq s$$
Dove $s$ (compreso tra 0 e 1) è il valore di similarità target. Grazie al corollario del Min-Hashing, sappiamo che questa frazione tra firme conserva e stima fedelmente la similarità di Jaccard tra i documenti originali.

##### 2. Il Meccanismo delle Bande (Banding)
Per implementare questo filtro in modo efficiente, la matrice delle firme viene partizionata. Supponendo di avere una firma di lunghezza $t$, la dividiamo in **$b$ bande**, dove ogni banda è composta da **$r$ righe** ($t = b \cdot r$).

Per ogni banda, viene calcolato un hash della porzione di colonna corrispondente. I documenti che presentano la stessa porzione di firma in una determinata banda collideranno nello stesso **bucket**.
*   **Criterio di selezione:** Due documenti diventano una "coppia candidata" se finiscono nello stesso bucket per **almeno una** delle $b$ bande.
*   **Logica del filtro:** Se due documenti sono molto simili, è estremamente probabile che almeno una delle loro $b$ bande sia identica. Se sono molto diversi, la probabilità che anche una sola banda coincida perfettamente è quasi nulla.

>[!tip] Caso ottimo
>![[Pasted image 20260511102556.png]]

##### 3. Analisi Matematica: La Funzione a "S" (S-Curve)
L'efficacia di LSH è descritta dalla probabilità che una coppia con similarità reale $s$ venga selezionata come candidata. La probabilità segue questa progressione logica:
1.  Probabilità che le firme coincidano in una specifica riga: $s$
2.  Probabilità che tutti gli elementi di una banda ($r$ righe) siano identici: $s^r$
3.  Probabilità che almeno un elemento nella banda sia diverso: $1 - s^r$
4.  Probabilità che nessuna delle $b$ bande sia identica: $(1 - s^r)^b$
5.  **Probabilità di successo (esistenza di almeno una banda identica):** 
$$P(\text{collisione}) = 1 - (1 - s^r)^b$$

Questa formula genera una **S-Curve**. Se impostassimo $r=1$ (bande da una sola riga), la probabilità sarebbe lineare e il filtro sarebbe inefficiente. Aumentando $r$, la curva diventa ripida, creando una netta separazione tra documenti simili e non simili.
![[Pasted image 20260511101905.png]]

##### 4. Analisi dei Casi e Soglie di Confidenza
Consideriamo l'esempio di una matrice con $t=100$ righe, divisa in $b=20$ bande e $r=5$ righe, con l'obiettivo di trovare documenti con similarità $\geq 0.8$.
* **Caso 1 (Documenti Simili):** Se $J.Sim(C_1, C_2) = 0.8$, la probabilità che i documenti non abbiano nessuna banda in comune è $(1 - 0.8^5)^{20} \approx 0.00035$. Ciò significa che il **99.965%** delle coppie corrette verrà individuato.
* **Caso 2 (Documenti Dissimili):** Se $J.Sim(C_1, C_2) = 0.3$, la probabilità che diventino accidentalmente candidati è $1 - (1 - 0.3^5)^{20} \approx 0.0474$. Avremo quindi solo il **4.74%** di falsi positivi.

Il punto di flesso della curva (la soglia teorica) è approssimato dalla formula $k \approx (1/b)^{1/r}$. In questo esempio, $k = (1/20)^{1/5} \approx 0.55$. I documenti sopra questa soglia tendono a collidere (vengono mantenuti), quelli sotto tendono a essere scartati.
![[Pasted image 20260511101948.png]]

##### 5. Ottimizzazione: Falsi Positivi e Falsi Negativi
Il bilanciamento dei parametri $b$ ed $r$ determina l'errore dell'algoritmo:
*   **Falsi Positivi (Area Verde):** Coppie con similarità inferiore alla soglia $s$ che finiscono comunque nello stesso bucket. Esse non danneggiano la precisione finale (perché verranno scartate nel controllo successivo), ma aumentano il carico computazionale.
*   **Falsi Negativi (Area Blu):** Coppie con similarità superiore a $s$ che non collidono in nessuna banda. Questo è l'errore più critico, poiché il sistema "perde" documenti effettivamente simili.
![[Pasted image 20260511101957.png]]
Aumentando $b$ si riducono i falsi negativi (si "pesca" di più), mentre aumentando $r$ si riducono i falsi positivi (si è più selettivi). L'obiettivo del progettista è configurare $b$ ed $r$ affinché la soglia $k$ sia il più vicino possibile alla similarità desiderata, minimizzando entrambe le aree di errore.


### 5.2 Data Stream: L'Era dei Dati Infiniti
#### 5.2.1. Definizione e Contesto
In molti scenari moderni (come i motori di ricerca o l'analisi del traffico di rete), i dati non sono disponibili interamente in memoria. 
Si parla di **Data Stream**: una sequenza $x_1, x_2, \dots, x_m$ di elementi che arrivano uno alla volta.
* **Caratteristiche:** Il dataset è considerato infinito, non stazionario (cambia nel tempo) e arriva a una velocità tale che il sistema non può memorizzare tutto.
* **La Soluzione: Lo Sketch.** Poiché non possiamo salvare lo stream, dobbiamo mantenere dei "riassunti" compatti chiamati **sketch** ($H(S)$).

#### 5.2.2. Parametri di Valutazione di uno Sketch
Un algoritmo su stream viene valutato in base a quattro criteri:
1. **Memoria utilizzata:** Deve essere minima (molto più piccola dello stream).
2. **Ritardo (Latency):** Il tempo necessario per aggiornare lo sketch all'arrivo di ogni nuovo elemento.
3. **Probabilità di correttezza:** Essendo basati su hash, questi algoritmi possono sbagliare (collisioni), ma l'errore deve essere controllato.
4. **Tasso di approssimazione:** Quanto la soluzione stimata è vicina a quella reale.


### 5.3 Pattern Matching: Ricerca su Stream
#### 5.3.1. Il Problema
Data una stringa "target" $y$ di lunghezza $n$ (il pattern) e uno stream $S$ di lunghezza $m$ (molto grande), vogliamo contare quante volte $y$ appare in $S$. Il problema principale è che non vogliamo memorizzare l'intero stream per fare il confronto.

#### 5.3.2. La Funzione Hash di Rabin (Definizione 5.3.1)
Per confrontare le stringhe velocemente, usiamo lo **Sketch di Rabin**. La funzione trasforma una stringa in un numero (polinomio):
$$K_{qz}(x) = \left( \sum_{i=1}^{n} x[i] \cdot z^{n-i} \right) \bmod q$$
* **Logica:** La stringa viene vista come un polinomio in cui i caratteri sono i coefficienti e $z$ è la base. Il tutto viene calcolato in modulo di un numero primo $q$.
* **Vantaggio:** Invece di confrontare $n$ caratteri uno per uno, confrontiamo solo due numeri (gli hash).

#### 5.3.3. Proprietà Fondamentali: Concatenazione e Aggiornamento
Lo sketch di Rabin è "omomorfico", ovvero è facile da aggiornare senza ricalcolare tutto:
*   **Aggiunta di un carattere (Lemma 5.3.1):** Se aggiungo un carattere $c$ alla fine di una stringa $x$, il nuovo hash è: $$K_{qz}(x \cdot c) = (K_{qz}(x) \cdot z + c) \bmod q$$
*   **Concatenazione di stringhe (Lemma 5.3.2):** Se unisco due stringhe $x$ e $y$: $$K_{qz}(x \cdot y) = (K_{qz}(x) \cdot z^{|y|} + K_{qz}(y)) \bmod q$$

#### LEMMA 5.3.4. Probabilità di Errore (Collisioni)
Se abbiamo due stringhe $x$ e $y$ tali che $x \neq y$, e la lunghezza massima tra le due è $n$, allora la probabilità che i loro hash di Rabin coincidano è molto bassa:
$$\text{Pr}[K_{qz}(x) = K_{qz}(y)] \le \frac{n}{q}$$
Dove $n$ è la lunghezza della stringa e $q$ è il numero primo usato come modulo.

##### 1. La Strategia della Dimostrazione
Per dimostrare questo limite, trasformiamo un problema di "uguaglianza" in un problema di "radici di un polinomio". 
Dire che due hash sono uguali equivale a dire che la loro differenza è zero nel campo modulo $q$:
$$\text{Pr}[K_{qz}(x) = K_{qz}(y)] = \text{Pr}[K_{qz}(x) - K_{qz}(y) \equiv_q 0]$$

##### 2. Costruzione del Polinomio Differenza
Poiché l'hash di Rabin è essenzialmente un polinomio, la differenza tra due hash è essa stessa un hash di una nuova stringa fittizia, che chiamiamo $x - y$. I caratteri di questa stringa sono definiti dalla differenza posizione per posizione dei caratteri originali:
$$(x - y)[i] = x[i] - y[i] \pmod q$$
*(Nota: se una stringa è più corta, aggiungiamo dei "leading zeros" per pareggiare le lunghezze).*

A questo punto, possiamo scrivere che la differenza degli hash corrisponde all'hash della differenza:
$$K_{qz}(x) - K_{qz}(y) \pmod q = K_{qz}(x - y)$$

##### 3. Conclusione Algebrica
Poiché abbiamo stabilito che $x \neq y$, la stringa $x - y$ non è vuota e contiene almeno un valore diverso da zero. Di conseguenza, $K_{qz}(x - y)$ è un **polinomio di grado $\le n$** definito sul campo finito $\mathbb{F}_q$.
Dall'algebra sappiamo un fatto fondamentale: **un polinomio di grado $n$ può avere al massimo $n$ radici**.
Dato che il valore $z$ della nostra funzione hash viene scelto casualmente tra tutti i $q$ elementi disponibili nel campo $\mathbb{F}_q$, la probabilità di "pescare" proprio una di quelle $n$ radici che causano la collisione è:
$$\le \frac{n}{q}$$
Vedere [[ALGORITMI - DA SOSTITUIRE CON PDF#^0f50a7|Algoritmo di Karp-Rabin]]


### 5.4 Proprietà degli algoritmi su Stream: Il Campionamento
Dato che non è possibile memorizzare l'intero stream, dobbiamo selezionare un sottoinsieme di elementi (*sample*). 
Esistono due strategie principali:
1. **Campionamento Proporzionale:** Si mantiene una frazione fissa degli elementi (es. il 10% di tutto ciò che passa).
2. **Campionamento a Grandezza Fissata:** Si decide di mantenere in memoria sempre e solo $s$ elementi, indipendentemente da quanto diventa grande lo stream.

**La proprietà fondamentale: Dinamicità.** Per essere corretto, un algoritmo di campionamento deve garantire che, in ogni istante $k$, ogni elemento visto fino a quel momento abbia la **stessa probabilità** di trovarsi nel campione.

Vedere [[ALGORITMI - DA SOSTITUIRE CON PDF#^d3cca1|Algoritmi per il campionamento]]


---

# Algoritmi sulle stream
Presentiamo ora diversi algoritmi che operano sulle stream

## 6.1 Stima delle frequenze
### Problema
Abbiamo uno stream di `m` elementi: `x_1, x_2, ..., x_m`, dove ogni elemento appartiene a `[n]`.

Per ogni elemento `y ∈ [n]` vogliamo stimare la sua frequenza nello stream, cioè quante volte `y` compare.

La frequenza reale di `y` è:
$$  
f(y)=|{i:x_i=y}|  
$$

Il problema è che, in uno stream, non vogliamo memorizzare tutti gli `m` elementi.

L'obiettivo è quindi stimare `f(y)` usando poca memoria.


### 6.1.1 Sampling Algorithm `S-ALG`
L'idea del sampling è prendere solo alcuni elementi dello stream e usarli per stimare la frequenza reale.

Assumiamo inizialmente che `m` sia noto.
Se `m` non è noto, si può usare **Reservoir Sampling** per ottenere comunque un campione di dimensione fissa.

#### Passaggi dell'algoritmo
L'algoritmo `S-ALG` funziona così:
1. sceglie `q` indici casuali $j_1, j_2, ..., j_q ∈ [m]$, scelti indipendentemente e uniformemente a caso;
    
2. durante lo streaming, salva solo gli elementi in quelle posizioni: $x_{j_1}, x_{j_2}, ..., x_{j_q}$;
	- questi elementi salvati formano lo **sketch**;
    
3. per stimare la frequenza di `y`, conta quante volte `y` appare nel campione e scala il risultato.

Lo **stimatore restituito** è:$$  
F(y)=\frac{m}{q}\sum_{k=1}^{q}1(x_{j_k}=y)  
$$dove:$$  
\text{aleatoria bernulliana} \leftarrow 1(x_{j_k}=y)=  
\begin{cases}  
1 & \text{se } x_{j_k}=y \\ 
0 & \text{altrimenti}  
\end{cases}  
$$
>[!lemma] Lemma 1
Per ogni `y` e per ogni variabile casuale $x_{j_k}$ vale:$$  
\mathbb{E}[\mathbf{1}(x_{j_k}=y)] = \frac{f(y)}{m}  
$$
- L'indice $j_k$ viene scelto uniformemente tra tutte le posizioni dello stream.
- Ogni posizione ha probabilità `1/m` di essere scelta.
- Dato che `y` compare nello stream esattamente `f(y)` volte, la probabilità che il campione scelto sia uguale a `y` è:$$  
\frac{f(y)}{m}  
$$

Ora, per il lemma 1, sommiamo su tutti i `q` campioni:$$  
\mathbb{E}\left[\sum_{k=1}^{q}\mathbf{1}(x_{j_k}=y)\right]
q\cdot \frac{f(y)}{m} \ \ \ =$$$$  
= \mathbb{E}\left[\sum_{k=1}^{q}\mathbf{1}(x_{j_k}=y)\right]

\frac{q}{m}f(y)  
$$
Questa formula dice che, in media, nel campione vediamo una frazione `q/m` delle occorrenze totali di `y`.


>[!lemma] Lemma 2 
`F(y)` è uno ***stimatore unbiased***, ossia in media restituisce il valore corretto.
>- Non significa che ogni singola stima sia perfetta, ma che l'errore medio è nullo.

Lo stimatore è:$$  
F(y)=\frac{m}{q}\sum_{k=1}^{q}\mathbf{1}(x_{j_k}=y)  $$Vogliamo calcolare il suo valore atteso `E[F(y)]`.

Sostituiamo la definizione:$$  
\mathbb{E}[F(y)] = 
\mathbb{E}\left[  
\frac{m}{q}\sum_{k=1}^{q}\mathbf{1}(x_{j_k}=y)  
\right]  
$$
Portiamo fuori la costante: $$\frac{m}{q}  
\mathbb{E}\left[  
\sum_{k=1}^{q}\mathbf{1}(x_{j_k}=y)  
\right]  
$$
Usando il risultato precedente: $$\frac{m}{q}\cdot \frac{q}{m} \cdot f(y)$$
Quindi: $$\mathbb{E}[F(y)] = f(y)$$
Questo conferma che `F(y)` è uno stimatore **unbiased**.


##### Errore dello stimatore
Vogliamo controllare la probabilità che la stima sia troppo lontana dal valore reale.

Studiamo: $$\Pr[|F(y)-f(y)|>\varepsilon m]$$dove:
- `ε` controlla l'errore massimo ammesso;

Usando la definizione di `F(y)`: $F(y)=\frac{m}{q}\sum_{k=1}^{q}\mathbf{1}(x_{j_k}=y)$, si può riscrivere:
$$  
\Pr[|F(y)-f(y)|>\varepsilon m]
=
\Pr\left[  
\left|  
\sum_{k=1}^{q}\mathbf{1}(x_{j_k}=y)
-
\mathbb{E}\left[  
\sum_{k=1}^{q}\mathbf{1}(x_{j_k}=y)  
\right]  
\right|
>
\varepsilon q  
\right]  
$$

Quindi il problema diventa controllare quanto la somma degli indicatori si allontana dal suo valore atteso.

Per questo si usa il **Chernoff Bound**, da cui otteniamo: 
$$  
\Pr\left[  
\left|  
\sum_{k=1}^{q}\mathbf{1}(x_{j_k}=y)
-
\mathbb{E}\left[  
\sum_{k=1}^{q}\mathbf{1}(x_{j_k}=y)  
\right]  
\right|
>
\varepsilon q  
\right]   
$$
$$
\substack{\text{Per il}\\ \text{Chernoff Bound}}
< 2\exp\left(-\frac{(\varepsilon q)^2}{2q}\right)
= 2\exp\left(-\frac{\varepsilon^2 q}{2}\right)
$$

Vogliamo che questa probabilità sia $<$ `δ`.
Quindi imponiamo: $$2\exp\left(-\frac{\varepsilon^2 q}{2}\right)<\delta$$Da questa condizione basta scegliere: $$q>\varepsilon^{-2}\log\left(\frac{2}{\delta}\right)$$
Così la probabilità di errore è al massimo `δ`.


>[!lemma] Teorema 
Dati un errore di approssimazione `ε`; un parametro di confidenza `δ`; su uno stream di `m` elementi; e per ogni elemento qualunque `y`;
>
>l'algoritmo `S-ALG` restituisce uno stimatore unbiased `F(y)` tale che:
>
>$$  
>|F(y)-f(y)|<\varepsilon m  
>$$
>
>con probabilità almeno: $1-\delta$  
>
>La complessità in spazio e tempo è:
>$$  
>O\left(\varepsilon^{-2}\log\left(\frac{2}{\delta}\right)\right)  
>$$
>
>perché l'algoritmo salva `q` campioni e $q>\varepsilon^{-2}\log\left(\frac{2}{\delta}\right)$

###### Osservazione: errore a due lati
Il Sampling Algorithm può sia sovrastimare sia sottostimare la frequenza reale. 
Per questo si dice che è uno stimatore con **errore a due lati**.

Il problema è che se un elemento `y` compare poche volte, può anche non comparire mai nel campione.
In quel caso l'algoritmo potrebbe sottostimare molto la sua frequenza.

Per migliorare questo aspetto si passa poi a tecniche come **Count-Min Sketch**.



### 6.1.2 Algoritmo Count-Min Sketch
Il **Count-Min Sketch** è un metodo per stimare le frequenze degli elementi in uno stream che usa meno spazio rispetto al sampling.

A differenza del sampling ha anche un errore di tipo **one-sided**: può sovrastimare la frequenza reale, ma non la sottostima mai.

#### Struttura dello sketch
Il Count-Min Sketch usa una matrice `M` di contatori, inizializzata tutta a `0`: $$M \in \mathbb{N}^{t \times s}$$I parametri `t` e `s` controllano:
- `s`: il numero di colonne, legato all'errore;
- `t`: il numero di righe, legato alla probabilità di successo.

A ogni riga `j` è associata una funzione hash universale: $$h_j:[n]\rightarrow[s] \ \ \ \  \ \ \text{per } j = 1, \dots, t$$

Quindi ogni elemento `x` dello stream viene mandato, in ogni riga, in una posizione della matrice tramite $h_j(x)$.


#### Inserimento di un elemento
Quando arriva un elemento `x` nello stream, per ogni riga $j=1,\dots,t$ si aggiorna il contatore corrispondente: $$M(j,h_j(x))=M(j,h_j(x))+1$$
Quindi l'elemento `x` viene contato in `t` celle diverse, una per ogni funzione hash.


#### Stima della frequenza
Per stimare la frequenza di un elemento `y`, guardiamo i contatori nelle posizioni in cui `y` viene mappato dalle varie funzioni hash.

La stima è: $$\tilde{f}_y=\min{M(j,h_j(y)):j=1,\dots,t}$$Si prende il minimo perché ogni contatore può contenere non solo le occorrenze di `y`, ma anche quelle di altri elementi che sono finiti nella stessa cella per collisione.

###### Perché non sottostima mai?
Ogni volta che `y` appare nello stream, il contatore $M(j,h_j(y))$ viene incrementato in ogni riga.
Quindi, per ogni `j`, vale: $$M(j,h_j(y))\geq f_y$$
Di conseguenza anche il minimo tra questi valori non può essere minore di $f_y$: $$\tilde{f}_y\geq f_y$$
Quindi Count-Min Sketch non dà mai una sottostima.
L'errore può solo andare verso l'alto, perché nei contatori di `y` possono finire anche elementi diversi da `y`.

#### Effetto delle collisioni
Se un elemento `z` diverso da `y` finisce nella stessa cella di `y`, cioè: $$h_j(z)=h_j(y)$$
allora il contatore `M(j,h_j(y))` contiene anche le occorrenze di `z`.

In quel caso il contatore può diventare: $$M(j,h_j(y))=f_y+f_z$$
Più in generale, il contatore contiene:
- le occorrenze vere di `y`;
- più le occorrenze degli elementi che collidono con `y`.

Per questo lo stimatore può sovrastimare.

#### Variabile indicatrice di collisione
Per studiare l'errore, si definisce la variabile indicatrice: $$I(j,x,y)=  
\begin{cases}  
1 & \text{se } h_j(x)=h_j(y) \\  
0 & \text{altrimenti}  
\end{cases}$$
Sia $S={x_1,\dots,x_m}$ l'insieme degli elementi distinti nello stream.
Il valore del contatore di `y` nella riga `j` può essere visto come: $$M(j,h_j(y))=f_y+\sum_{x\in S,\ x\neq y} f_x I(j,x,y)$$
- La prima parte è la frequenza reale di `y`.
- La seconda parte è il rumore dovuto agli elementi diversi da `y` che collidono con `y`.
###### Valore atteso del contatore $M(j,h_j(y))$
$$\mathbb{E}[M(j,h_j(y))]=f_y+\mathbb{E}\left[\sum_{x\in S,\ x\neq y} f_x I(j,x,y)\right]$$
Portando il valore atteso dentro la somma: $$\mathbb{E}[M(j,h_j(y))]=f_y+\sum_{x\in S,\ x\neq y} f_x\mathbb{E}[I(j,x,y)]$$Poiché $h_j$ è una funzione hash universale, la probabilità di collisione tra `x` e `y` è al massimo: $$\Pr[h_j(x)=h_j(y)]\leq\frac{1}{s}$$Quindi: $$\mathbb{E}[I(j,x,y)]\leq\frac{1}{s}$$
Allora: $$\mathbb{E}[M(j,h_j(y))]\leq f_y+\sum_{x\in S,\ x\neq y} f_x\frac{1}{s}$$
Poiché la somma delle frequenze di tutti gli elementi è `m`, vale: $$\sum_{x\in S} f_x=m$$Quindi: $$\sum_{x\in S,\ x\neq y} f_x\leq m$$
Otteniamo: $$\mathbb{E}[M(j,h_j(y))]\leq f_y+\frac{m}{s}$$

Quindi l'errore atteso del contatore rispetto a $f_y$ è al massimo: $$\mathbb{E}[M(j,h_j(y))-f_y]\leq\frac{m}{s}$$

###### Uso della disuguaglianza di Markov
Vogliamo limitare la probabilità che il contatore superi troppo la frequenza reale $f_y$.

Dalla disuguaglianza di Markov: $$\Pr\left[M(j,h_j(y))-f_y\geq\frac{2m}{s}\right]\leq\frac{1}{2}$$

Ora vogliamo che l'errore massimo sia `εm`, quindi imponiamo che $$\frac{2m}{s}=\varepsilon m \implies_{\text{da cui }} \ \ s = \frac{2}{\varepsilon}$$
Quindi, scegliendo $s=\frac{2}{ε}$, per ogni riga `j` otteniamo: $$\Pr[M(j,h_j(y))\geq f_y+\varepsilon m]\leq\frac{1}{2}$$Questo significa che una singola riga può sbagliare con probabilità al massimo `1/2`.


>[!question] Qual è la probabilità che lo stimatore $\tilde{f}_y>f_y+\varepsilon m$?
> Per far sì che si verifichi, deve succedere che **tutte** le righe abbiano un contatore maggiore di $f_y+εm$.
> - Se anche una sola riga ha un valore buono, il minimo prende quella riga e la stima resta buona.
>
>Poiché le funzioni hash $h_j$ sono scelte indipendentemente, la probabilità che tutte le `t` righe sbaglino è: $$\Pr[\tilde{f}_y>f_y+\varepsilon m]\leq\left(\frac{1}{2}\right)^t$$
>Vogliamo che questa probabilità sia al massimo `δ`.
Quindi imponiamo: $$\left(\frac{1}{2}\right)^t\leq\delta$$
Risolvendo rispetto a `t`, basta scegliere: $$t=\left\lceil\log_2\left(\frac{1}{\delta}\right)\right\rceil$$

Quindi scegliendo: $s=\frac{2}{\varepsilon}$ e $t=\left\lceil\log_2\left(\frac{1}{\delta}\right)\right\rceil$ lo stimatore soddisfa: $$f_y\leq\tilde{f}_y\leq f_y+\varepsilon m$$
con probabilità almeno $1-\delta$.
Quindi Count-Min Sketch fornisce una stima che non sottostima mai `f_y` e che, con alta probabilità, non la sovrastima di più di `εm`.

#### Complessità
###### SPAZIO
La matrice ha `t` righe e `s` colonne, quindi lo spazio è: $$O(t\cdot s) \implies O\left(\frac{\log(1/\delta)}{\varepsilon}\right)$$
- Sostituendo i valori di `t` e `s` trovati in precedenza
###### TEMPO
Il tempo di aggiornamento per ogni elemento è: $$O(t)=O(\log(1/\delta))$$perché per ogni elemento bisogna aggiornare un contatore in ciascuna delle `t` righe.



## 6.2 Filtro delle stream
Ora consideriamo il problema del **filtro su stream**.

Ogni elemento dello stream è una tupla $x = <k_1, ..., k_l>$.
In input abbiamo un insieme `S` di valori “buoni” per una certa chiave `k`.
L'obiettivo è decidere se un nuovo elemento dello stream deve essere accettato oppure scartato, controllando se il valore della sua chiave appartiene a `S`.

>[!example]- Esempio pratico per capire
>- `x= <id_utente, IP, pagina_visitata, timestamp>`
>- `k = 2` -> `x_k = x_2 = IP`
>- `S = {IP autorizzati}`
>Quindi quando arriva un nuovo elemento, prendiamo il suo IP e verifichiamo se appartiene a `S`.,

Una soluzione banale sarebbe 
- salvare tutto `S` in una tabella hash `T`.
- poi per ogni elemento `x` si calcola il valore della chiave `k(x)` e si controlla se è presente in `T`.
Il problema è che `S` può essere troppo grande per essere mantenuto interamente in memoria.

### 6.2.1 Algoritmo First-Cut
- Sia `U` l'insieme di tutti i possibili valori per la chiave `k`.
- Sia `S` l'insieme dei valori “buoni” della chiave `k`.

L'algoritmo lavora in due fasi:
1. costruzione del filtro;
2. controllo degli elementi dello stream.

#### Fase 1: costruzione del filtro
Creiamo un array di bit `B[1,n]` di lunghezza `n` (che scegliamo noi), inizializzato tutto a `0`.
- Scegliamo una funzione hash: $h:U\rightarrow[n]$
- Per ogni elemento `s ∈ S`, calcoliamo il suo hash `h(s)`.
- Poi impostiamo a `1` la posizione corrispondente nell'array: $B[h(s)] = 1$
	- Quindi `B` diventa una rappresentazione compatta dell'insieme `S`.
Non salviamo direttamente tutti gli elementi di `S`, ma solo le posizioni in cui finiscono tramite hash.

#### Fase 2: controllo di un elemento dello stream
Sia $x = <x_1, ..., x_l>$ un nuovo elemento dello stream.
- Calcoliamo il valore della chiave scelta, cioè $x_k$.
- Poi calcoliamo: $h(x_k)$
- A questo punto controlliamo il bit corrispondente:
	- se $B[h(x_k)] = 1$, allora l'elemento `x` viene accettato;
	- se $B[h(x_k)] = 0$, allora l'elemento `x` viene scartato.


##### One-sided error: Falsi positivi e falsi negativi
Questo metodo può produrre **falsi positivi**, ma non produce mai **falsi negativi**.

*NESSUN FALSO NEGATIVO*
- Se un elemento ha chiave $x_k ∈ S$, allora durante la fase di costruzione abbiamo sicuramente impostato: $B[h(x_k)] = 1$
	- Quindi quando l'elemento arriva nello stream, viene accettato.
- In altre parole: se un elemento è davvero buono, il filtro non lo scarta.

*POSSIBILI FALSI POSITIVI*
- Un falso positivo avviene quando $x_k ∉ S$, ma collide con un elemento buono `s ∈ S`, cioè $$h(x_k)=h(s)$$
	- In questo caso $B[h(x_k)] = 1$ e il filtro accetta `x` per errore.

>[!tip] Quindi l'errore è **one-sided**: non ci sono falsi negativi ma possono esserci falsi positivi.

###### Analisi dei falsi positivi
Vogliamo stimare la probabilità di falso positivo.
- Sia `|S| = m`, cioè ci sono `m` valori buoni.
- Sia `|B| = n`, cioè l'array ha `n` bucket.

Per qualche elemento $u \in U$ la probabilità di finire in una posizione di B già inizializzata a `1` è esattamente la frazione di `ERR` di *bucket* in `B`.

Per stimare `ERR` usiamo l'esperimento *balls into bins*.
- I bucket sono le posizioni dell'array `B`, quindi `0, ..., n-1`.
- Le palline sono gli elementi di `S`.
- Ogni elemento `s ∈ S` viene mandato nel bucket `h(s)`.
Ogni pallina finisce in un bucket con probabilità `1/n`.

Vogliamo sapere qual è la probabilità che un bucket riceva almeno una pallina.
Fissiamo un bucket e otteniamo
La probabilità che una singola pallina non finisca in quel bucket è: $$
\Pr[ERR]
=
1-
\underbrace{
\left(
\underbrace{1-\frac{1}{n}}_{\substack{\text{una pallina non finisce}\\ \text{nel bucket fissato}}}
\right)^m
}_{\substack{\text{nessuna delle } m \text{ palline}\\ \text{finisce nel bucket fissato}}}
\approx
\underbrace{1-e^{-m/n}}_{\text{approssimazione esponenziale}}
$$
###### Caso `m` molto più piccolo di `n`
Se $m \ll n$, allora si può usare l'approssimazione: $$1-e^{-m/n}\approx \frac{m}{n}$$
Quindi, quando l'array `B` è molto più grande dell'insieme `S`, la probabilità di falso positivo è circa: $$\frac{m}{n}$$


### 6.2.2 Filtri di Bloom
Il **Filtro di Bloom** è un miglioramento del First-Cut, in cui vengono utilizzare `k` funzioni hash indipendenti: $$h_1, h_2, ..., h_k$$
L'idea è ridurre la probabilità di falsi positivi usando più posizioni dell'array `B`.

#### Setup
- Sia `S` l'insieme dei valori buoni, con `|S| = m`.
- Sia `B` un array di bit, con `|B| = n`.
	- Quindi `B` ha `n` bucket.
- Ogni funzione hash manda un elemento in una posizione dell'array `B`.

#### Fase di inizializzazione
All'inizio l'array `B` viene inizializzato tutto a `0`: `B = [0, ..., 0]`

Poi, per ogni elemento `s ∈ S`, si calcolano tutte le `k` funzioni hash: $$h_1(s), h_2(s), ..., h_k(s)$$
Per ogni valore ottenuto, si imposta a `1` la posizione corrispondente:
$$  
B[h_i(s)] = 1 \ \ \ \  \text{per ogni } i = 1, \dots, k
$$


#### Fase di controllo
Quando arriva un nuovo elemento dello stream con chiave `x`, calcoliamo: $$h_1(x), h_2(x), ..., h_k(x)$$
Poi controlliamo i bit corrispondenti.
L'elemento `x` viene accettato se ***tutte le posizioni sono uguali a `1`***:
$$  
B[h_i(x)] = 1 \quad \text{per ogni } i=1,\dots,k  
$$
Se anche una sola posizione vale `0`, allora `x` viene scartato.

>[!tip] N.B.: anche il Bloom Filter può avere falsi positivi (ma mai falsi negativi).

###### Analisi del numero di bit a `1`
Durante l'inizializzazione, ogni elemento `s ∈ S` viene inserito usando `k` funzioni hash.
Dato che `|S| = m`, il numero totale di tentativi di inserimento è: $k · m$
Questi `k · m` tentativi vengono distribuiti su `n` bucket.

Usando l'analisi balls into bins, la frazione di bucket impostati a `1` è circa:
$$  
1-e^{-\frac{k m}{n}} \approx \underbrace{\frac{km}{n}}_{\text{con } k \cdot m \ll n}
$$

###### Probabilità di falso positivo
Un elemento `x ∉ S` viene accettato solo se tutte le sue `k` posizioni hash sono già a `1`.
La probabilità che una singola posizione sia a `1` è circa: $1-e^{-\frac{k m}{n}}$
Poiché le `k` funzioni hash sono indipendenti, la probabilità che tutte le `k` posizioni siano a `1` è:
$$  
\mathbb{Pr}[\text{falso positivo}] =  \left(1-e^{-\frac{k m}{n}}\right)^k  
$$

È necessario determinate un valore di `k` ottimale, in cui la funzione è minima
Dall'analisi matematica si ottiene $$k=\frac{n}{m}\log(2)$$



## 6.3 Conteggio degli elementi distinti
Il problema consiste nello stimare quanti elementi distinti sono comparsi finora in uno stream.
- Gli elementi dello stream sono scelti da un universo `U` di dimensione `N`.
- Indichiamo con `d` il numero reale di elementi distinti visti nello stream.

Una soluzione banale sarebbe mantenere una tabella hash con tutti gli elementi già visti.
Quando arriva un nuovo elemento, controlliamo se è già presente e eventualmente incrementiamo il contatore.
Il problema è che questa soluzione può richiedere troppo spazio, perché nel caso peggiore bisogna memorizzare tutti gli elementi distinti.

Per usare meno memoria si usa l’algoritmo di **Flajolet-Martin**.

### Idea dell’algoritmo Flajolet-Martin
L’algoritmo sceglie una funzione hash `h` che mappa ogni elemento dell’universo in una stringa binaria.

La funzione hash è: $$h:[N]\rightarrow\{0,1\}^{s} \qquad \text{con } s\geq \log_2(N)$$
- Per ogni elemento `a` dello stream, calcoliamo `h(a)`.
- Poi guardiamo la posizione del primo `1` contando da destra.
	- Indichiamo questa quantità con `r(a)`.

Esempio intuitivo:
- se `h(a)` termina con `1`, allora `r(a)=0`;
- se `h(a)` termina con `10`, allora `r(a)=1`;
- se `h(a)` termina con `100`, allora `r(a)=2`.
In pratica `r(a)` misura quanti zeri finali ci sono prima del primo `1`.

#### Sketch mantenuto
L’algoritmo non salva tutti gli elementi distinti ma mantiene solo il massimo valore di `r(a)` visto finora. 
Lo sketch è: $$R=\max\{r(a)\}$$dove il massimo è preso su tutti gli elementi distinti visti nello stream.

Alla fine, il numero di elementi distinti viene stimato con: $2^R$
- L’idea è che vedere un valore grande di `r(a)` è raro; quindi se nello stream compare un hash con molti zeri finali, probabilmente abbiamo visto molti elementi distinti.

###### Perché le ripetizioni non cambiano lo sketch
Una proprietà utile è che le occorrenze ripetute dello stesso elemento non modificano la stima.

Se lo stesso elemento `a` appare più volte, il valore `h(a)` è sempre lo stesso.
- Quindi anche `r(a)` è sempre lo stesso.
Di conseguenza, ripetere un elemento già visto non cambia `R`.

Questo è coerente con il problema: vogliamo contare gli elementi distinti, non il numero totale di occorrenze.

>[!tip] Combinazione di sketch
Lo sketch `R` è facile da combinare.
Se abbiamo più stream separati, con sketch `R_1, R_2, ..., R_k`, lo sketch dello stream unito si ottiene prendendo il massimo: $$R=\max(R_1,R_2,\dots,R_k)$$
Questo funziona perché `R` rappresenta il massimo valore di `r(a)` visto.
Unendo più stream, basta tenere il massimo tra i massimi.


#### Probabilità legata a `r(a)`
Assumiamo che `h` si comporti come una funzione hash casuale.
Per un elemento `a`, la probabilità che `r(a)` sia almeno `r` è: $$\Pr[r(a)\geq r]=\left(\frac{1}{2}\right)^r$$
Questo perché avere `r(a) ≥ r` significa che l’hash termina con almeno `r` zeri.
- Ogni bit ha probabilità `1/2`, quindi avere `r` zeri finali ha probabilità $1/2^r$.

#### Variabile casuale `X_r`
Definiamo la variabile casuale $X_r$ così: $$X_r=  
\begin{cases}  
1 & \text{se esiste un elemento } a \text{ tale che } r(a)\geq r \\  
0 & \text{altrimenti}  
\end{cases}$$Quindi $X_r = 1$ significa che almeno un elemento distinto ha prodotto un hash con almeno `r` zeri finali.

Se `d` è il vero numero di elementi distinti visti, allora: $$\Pr[X_r=1]=1-\left(1-\frac{1}{2^r}\right)^d$$
Infatti:
- $1/2^r$ è la probabilità che un singolo elemento abbia `r(a) ≥ r`;
- $1 - 1/2^r$ è la probabilità che un singolo elemento non abbia `r(a) ≥ r`;
- elevando a `d`, otteniamo la probabilità che nessuno dei `d` elementi distinti abbia `r(a) ≥ r`;
- facendo `1 - ...`, otteniamo la probabilità che almeno uno lo abbia.

Quindi vale anche: $$\Pr[X_r=0]=\left(1-\frac{1}{2^r}\right)^d$$
#### Errori
##### Errore verso l’alto
Come abbiamo visto prima, la stima restituita è $2^R$.
La stima è troppo grande se: $$2^{R}>2^{c} \cdot d \ \ \implies \ R >  \log(d) + c$$Quindi: $$\Pr[2^R>2^c d]=\Pr[R>\log d+c]$$
- Se `R > log(d) + c`, allora esiste almeno un elemento con `r(a) ≥ log(d) + c`.

Quindi: $$\Pr[R>\log d+c]=\Pr[X_{\log d+c}=1]$$Usando un bound semplice: $$\Pr[X_{\log d+c}=1]\leq \frac{d}{2^{\log d+c}}=2^{-c}$$
Quindi: $$\Pr[2^R>2^c d]\leq 2^{-c}$$Questo dice che la probabilità di sovrastimare troppo diminuisce esponenzialmente in `c`.

##### Errore verso il basso
La stima è troppo piccola se `R` è molto più piccolo di `log(d)`.
In modo intuitivo, questo succede se nessuno dei `d` elementi distinti produce un hash con abbastanza zeri finali.

Il bound usato nell’analisi è di tipo esponenziale: $$\Pr[m < 2^{c} \cdot d] = Pr[X_{\log(d) + c}] \  \leq e^{-2^{c-1}}$$Quindi anche la probabilità di sottostima forte diminuisce rapidamente al crescere di `c`.

>[!example] Per `c = 2`, si ottiene una approssimazione costante con probabilità almeno `2/3`.

#### Spazio occupato
L’algoritmo deve memorizzare solo il valore `R`.
Dato che `R` è al massimo dell’ordine di $log_2(N)$, servono pochi bit (ordine logaritmico) per salvarlo.
Lo spazio occupato è: $$O(\log\log d)$$

>[!danger] Problema del valore atteso
Un problema dell’algoritmo base è che $\mathbb{E}[2^{R}]$ è potenzialmente infinito.
La probabilità si dimezza passando da `R` a `R+1`, ma il valore della stima raddoppia.
Per questo si usano più funzioni hash indipendenti, ognuna che produce uno sketch diverso: `R_1, R_2, ..., R_k`.
Poi gli sketch vengono combinati in modo più stabile.
Una tecnica è:
>1. dividere gli sketch in piccoli gruppi;
>2. calcolare la mediana in ogni gruppo;
>3. calcolare la media delle mediane ottenute.
>Questo serve a ridurre la varianza e rendere la stima più affidabile.



### 6.4 Calcolo dei momenti
Sia `I` uno stream composto da elementi scelti da un insieme `A`.
Indichiamo con `N` la dimensione dell’insieme `A`: `|A| = N`.
Per ogni elemento `i ∈ A`, indichiamo con $m_i$ il numero di volte in cui `i` appare nello stream `I`.

Il **momento k-esimo** dello stream è definito come: $$\sum_{i\in A} m_i^k$$
- **MOMENTO `0`**: corrisponde al numero di elementi distinti nello stream.
	- Infatti, considerando $m_{i}^{0}$, ogni elemento che appare almeno una volta contribuisce con `1`.
	
- **MOMENTO `1`**: corrisponde alla cardinalità dello stream, cioè alla sua lunghezza totale.
	- Infatti: $$\sum_{i\in A} m_i = |I|$$sono incluse anche le ripetizioni
	
- **MOMENTO `2`**, chiamato **surprise number**.
	- È definito come: $$S=\sum_{i\in A} m_i^2$$
	- Questo valore misura quanto la distribuzione degli elementi nello stream è sbilanciata.
		- Se gli elementi hanno frequenze simili, il valore di `S` è più basso.
		- Se invece pochi elementi compaiono moltissime volte, il valore di `S` diventa più alto.

#### Metodo AMS
Per stimare i momenti su stream si usa il metodo **AMS**, il quale funziona per tutti i momenti e fornisce una stima **unbiased**.

Ci concentriamo sul secondo momento, cioè sul surprise number: $$S=\sum_{i\in A}m_i^2$$
L’algoritmo prende e aggiorna un campione di variabili casuali indipendenti: $X_1, X_2, ..., X_k$
Per ogni variabile `X`, vengono mantenuti due valori:
- `X.el` -> indica un elemento `i` dello stream.
	- Più precisamente, sarà l’elemento che compare in una certa posizione casuale dello stream.
- `X.val` -> indica il conteggio delle occorrenze future di quell’elemento.
	- ossia dalla posizione scelta fino alla fine dello stream.

>[!tip] Come impostare `X.el` e `X.val`
Consideriamo uno stream `I` di lunghezza `L`.
>
>***`X.el`***: L’algoritmo sceglie un timestamp casuale `t`, uniformemente in `[1,L]` e poi guarda l’elemento dello stream in quella posizione. $$\text{Se } \ i=I[t] \implies X.el = i$$
>
>***`X.val`***: Indichiamo con `c` il numero di occorrenze dell’elemento `i` nella sotto-stream che parte da `t` e arriva fino alla fine.
Quindi `c` conta quante volte `i` appare in $I[t], I[t+1], ..., I[L]$ e si imposta: $$X.val=c$$

###### Stima del secondo momento
Per una singola variabile casuale `X`, l’algoritmo restituisce la stima: $$f(X)=L\cdot(2c-1)$$
dove:
- `L` è la lunghezza dello stream;
- `c = X.val`;

###### Uso di più variabili casuali
In pratica l’algoritmo non usa una sola variabile `X`, ma più variabili: $$X_1, X_2, ..., X_k$$Ognuna produce una stima $f(X_j)$.

La stima finale è la media delle stime ottenute: $$S=\frac{1}{k}\sum_{j=1}^{k}f(X_j)$$e in questo modo la stima è più stabile.

### Analisi del metodo AMS
Consideriamo una variabile casuale `X` definita come nell’algoritmo AMS.

Abbiamo:
- `t`: timestamp scelto uniformemente a caso nello stream;
- `i`: elemento scelto, cioè `i = I[t]`;
- `c`: numero di occorrenze di `i` nella sotto-stream `I[t,...,L]`;
- `L`: lunghezza dello stream.

La stima prodotta da una singola variabile `X` è: $$f(X)=L(2c-1)$$Vogliamo mostrare che questa stima è **unbiased**, cioè che il suo valore atteso coincide con il secondo momento.

#### Valore atteso della stima
Poiché il timestamp `t` viene scelto uniformemente tra le `L` posizioni dello stream, ogni posizione ha probabilità `1/L` di essere scelta.

Quindi: $$\mathbb{E}[L(2c-1)] = \sum_{i=1}^{L} L(2c(i)-1)\frac{1}{L}$$
Semplificando `L` con `1/L`, otteniamo: $$\mathbb{E}[L(2c-1)] = \sum_{i=1}^{L}(2c(i)-1)$$

Ora dobbiamo capire quanto vale questa somma.
Fissiamo un elemento `a ∈ A` e supponiamo che `a` compaia $m_a$ volte nello stream.
Indichiamo le sue posizioni con: $j_1, j_2, ..., j_{m_a}$
1. Se scegliamo il timestamp nella prima occorrenza di `a`, allora da lì fino alla fine vediamo ancora tutte le $m_a$ occorrenze di `a`. Quindi: $$c(j_1)=m_a$$
2. Se scegliamo il timestamp nella seconda occorrenza di `a`, allora da lì fino alla fine vediamo `m_a-1` occorrenze. Quindi: $$c(j_2)=m_a-1$$
3. Continuando così arriviamo a: $$c(j_{m_a})=1$$
Il contributo dell’elemento `a` alla somma è: $$\sum_{z=1}^{m_a}(2z-1)$$
Questa è la somma dei primi $m_a$ numeri dispari.
Andando per livelli abbiamo
- $\sum_{z=1}^{n}(z) = \frac{n(n+1)}{2}$
- $\sum_{z=1}^{n}(2z) = {n(n+1)}$
- $\sum_{z=1}^{n}(2z-1) = n^{2} + n - n = n^{2}$

Allora: $$\sum_{z=1}^{m_a}(2z-1)=m_a^2$$
Quindi ogni elemento `a` contribuisce con il quadrato della sua frequenza.

Quindi $$\mathbb{E}[L(2c-1)] \ = \ \sum_{t=1}^{L}(2c(t)-1) \ = \ \sum_{a\in A}m_{a^{2}} \ = \ S$$Perciò $$\mathbb{E}[f(X)] = S$$
###### Momenti di ordine maggiore
Il metodo AMS può essere generalizzato anche a momenti di ordine maggiore.
- Per il terzo momento, la stima usa una forma del tipo: $$L(3c^2-3c+1)$$
L’idea generale è che, scegliendo un timestamp casuale e contando le occorrenze future `c`, si costruisce una funzione di `c` il cui valore atteso restituisce il momento desiderato.
- Per il momento di ordine `k`, la stima ha forma generale collegata a: $$c^k-(c-1)^k$$

---

## Clustering e Community Detection
Il **clustering** ha l’obiettivo di dividere un insieme di oggetti in gruppi, detti **cluster**, in modo che gli oggetti nello stesso gruppo siano simili tra loro.

### Definizione del problema di clustering
Abbiamo un insieme `U` di `n` oggetti: $p_1, p_2, ..., p_n$
Per ogni coppia di oggetti $p_i, p_j$ è definita una funzione distanza: $$distance(p_i, p_j)$$Questa distanza misura quanto due oggetti sono diversi.

Proprietà della funzione distanza
![[Pasted image 20260628184838.png]]


Una soluzione possibile è una **k-partizione** di `U`, cioè una divisione di `U` in `k` cluster, la quale deve rispettare due proprietà:
- i cluster non si sovrappongono;
- l’unione di tutti i cluster restituisce l’intero insieme `U`.

>[!tip] Spesso però il valore di `k` non è noto in anticipo e viene scelto in modo empirico.

### Spacing tra cluster
Dato un clustering, lo **spacing** tra due cluster è la *distanza minima tra una coppia di punti appartenenti ai due cluster*.

L’obiettivo è ottenere cluster ben separati, per questo vogliamo ***massimizzare il minimo spacing tra cluster***.

### Formulazione come problema di ottimizzazione
Un problema di ottimizzazione è definito da:
- insieme delle istanze;
- insieme delle soluzioni ammissibili;
- costo di una soluzione;
- obiettivo: massimizzare o minimizzare il costo.

Nel nostro caso:
- l’istanza è data dagli oggetti, dalla funzione distanza e dal valore `k`;
- le soluzioni ammissibili sono tutte le possibili k-partizioni;
	- è molto grande, serve un algoritmo efficiente
- il costo è il minimo spacing tra coppie di cluster;
- l’obiettivo è massimizzare questo minimo spacing.

### Trasformazione in grafo completo pesato
Il problema può essere visto come un problema su grafi.
Costruiamo un grafo completo pesato:
- ogni oggetto diventa un nodo;
- ogni coppia di nodi è collegata da un arco;
- il peso dell’arco è la distanza tra i due oggetti.

#### Algoritmo basato su MST
Un modo per risolvere il problema è usare il **Minimum Spanning Tree**.

L’idea è:
1. costruire il grafo completo pesato;
2. calcolare un MST del grafo (albero che tocca tutti i nodi la cui somma degli archi è minima);
3. ordinare gli archi dell’MST in ordine decrescente di peso;
4. rimuovere i `k-1` archi più pesanti;
5. le componenti connesse rimanenti sono i `k` cluster.
###### Intuizione sulla correttezza
Il teorema afferma che la k-partition ottenuta rimuovendo i `k-1` archi più pesanti dell’MST è un clustering di spacing massimo.
- L’intuizione è che, se esistesse un clustering migliore, dovrebbe separare due punti che nell’MST sono collegati da archi più leggeri rispetto a quelli rimossi.
	- Ma questo produrrebbe uno spacing minore, quindi non sarebbe migliore.


## Community Detection
Nella **community detection** non sempre abbiamo una metrica precisa tra gli oggetti.
Inoltre, un nodo può anche appartenere a più comunità.

Quindi il problema è più flessibile rispetto al clustering classico.
L’obiettivo è trovare gruppi di nodi che rappresentano comunità nella rete.


Nelle reti sociali, un concetto importante è la **edge betweenness**.
- La betweenness di un arco misura quanto quell’arco è importante per collegare parti diverse della rete.
	- È definita come il numero di cammini minimi che passano su quell’arco.

Un arco con alta betweenness spesso collega due comunità diverse.
- Quindi rimuovere archi con alta betweenness può aiutare a separare le comunità.

### Algoritmo di Girvan-Newman
L’algoritmo di **Girvan-Newman** usa la edge betweenness per trovare comunità.

Funziona così:
1. calcola la edge betweenness di ogni arco;
2. elimina l’arco con betweenness maggiore;
3. ricalcola la edge betweenness nel grafo modificato;
4. elimina di nuovo l’arco con valore massimo;
5. ripete il processo.

Ogni rimozione può separare il grafo in componenti più piccole.

Il risultato può essere rappresentato come una struttura gerarchica, cioè un albero di cluster a diversi livelli.
![[Pasted image 20260628184902.png]]
