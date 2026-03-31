### CH01
##### SPAZIO PROBABILISTICO
Uno spazio probabilistico è una tripla $(Ω, F, Pr)$ dove:  
- $Ω$ = insieme di tutti i possibili esiti (sample space)  
- $F$ = insieme degli eventi (sottoinsiemi di Ω)  
- $Pr$ = funzione che assegna una probabilità a ogni evento  
##### FUNZIONE PROBABILISTICA
Una funzione $Pr : F → ℝ$ che assegna probabilità agli eventi e soddisfa:
- $0 ≤ Pr(E) ≤ 1$
- $Pr(Ω) = 1$
- additività: unione per eventi disgiunti, $Pr(⋃ Ei) = Σ Pr(Ei)$
##### EVENTI INDIPENDENTI
Due eventi E e F sono indipendenti se:
- $Pr(E ∩ F) = Pr(E) · Pr(F)$
Più in generale, $E_1, ..., E_k$ sono indipendenti se:
- per ogni sottoinsieme I: $Pr(⋂ Ei) = ∏ Pr(Ei)$
##### PROBABILITÀ CONDIZIONATA
La probabilità di $E$ dato che $F$ è avvenuto è:
- $Pr(E | F) = Pr(E ∩ F) / Pr(F)$, con $Pr(F) > 0$
→ intuizione: restringo lo spazio dei casi possibili a F
##### Theorem (Bayes’ Law)
- La legge di Bayes permette di calcolare una probabilità condizionata difficile $Pr(E | B)$ 
	- invertendola in una più facile $Pr(B | E)$, usando le probabilità a priori.
- quanto è probabile che sia accaduto $E_j$ dato che abbiamo osservato $B$
```scss
so: Pr(B | E) → facile (causa → effetto)  
voglio: Pr(E | B) → difficile (effetto → causa)
```
Sia ${E_1, ..., E_n}$ una partizione dello spazio (eventi disgiunti che coprono $Ω$), allora:
- $Pr(E_j | B) = [Pr(B | E_j) · Pr(E_j)] / Σi Pr(B | E_i) · Pr(E_i)$
→ intuizione: aggiorna la probabilità di una causa dopo aver osservato un effetto
##### COIN FLIP
![[Pasted image 20260323120525.png|400]]

### CH02
##### RANDOM VARIABLE DEFINIZIONE
**Random Variable**  
Una variabile aleatoria è una funzione che associa a ogni esito dello spazio campionario un numero reale:
$$X:Ω→R$$
##### RANDOM VARIABLE INDIPENDENTI
Due variabili aleatorie 
$$X, Y$$ sono indipendenti se la probabilità congiunta è il prodotto delle probabilità:
$$\Pr(X = x \land Y = y) = \Pr(X = x)\cdot \Pr(Y = y)$$
- La mediana $m$ di una variabile aleatoria $X$ è un valore tale che:
$$Pr(X<m)≤\frac{1}{2} ​\ e \ Pr(X>m)<\frac{1}{2}​$$
##### EXPECTATION
Il valore atteso di una variabile aleatoria discreta $X$ è la media pesata dei suoi valori:
$$E[X] = \sum_{i} i \cdot \Pr(X = i)$$
- linearità
$$E[X+Y]=E[X]+E[Y]$$
##### BERNOULLI RANDOM VARIABLE
**Bernoulli Random Variable**  
Una variabile aleatoria Bernoulliana assume solo due valori:

$Y = \begin{cases} 1 & \text{se successo} \\ 0 & \text{altrimenti} \end{cases}$
##### Binomial Random Variable
Una variabile aleatoria binomiale $X \sim B(n,p)$ conta il numero di successi in $n$ prove indipendenti con probabilità $p$:
$\Pr(X = j) = \binom{n}{j}\  p^j\  (1 - p)^{n-j}$

LA SUA EXPECTATION È
$$E[X]=np$$
##### DISTRIBUZIONE GEOMETRICA
**Distribuzione Geometrica**  
Una variabile aleatoria geometrica $X$ (parametro $p$) rappresenta il numero di tentativi fino al primo successo:
$\Pr(X = n) = (1 - p)^{n-1}\  p$
- memoryless property
$$Pr(X=n+k∣X>k)=Pr(X=n)$$
##### Coupon Collector’s Problem
**Coupon Collector’s Problem**  
Dato un insieme di $n$ coupon diversi, sia $X$ il numero di tentativi necessari per ottenerli tutti.  
Si può scrivere come somma di variabili geometriche:
$$X = \sum_{i=1}^{n} X_i$$
dove $X_i$ è il numero di tentativi per ottenere un nuovo coupon quando ne hai già $i-1$.
**Expectation**
$$E[X] = n \cdot H_n = n \ln n + \Theta(n)$$
_(intuizione)_  
→ all’inizio è facile trovare coupon nuovi, ma gli ultimi sono sempre più rari → cresce come $n \log n$
### CH03
##### MARKOV INEQUALITY
**MARKOV INEQUALITY**
- Sia $X \ge 0$ una variabile aleatoria.
- Fornisce un **upper bound** sulla probabilità che $X$ sia grande.
	- $\Pr[X \ge a] \le \frac{\mathbb{E}[X]}{a}$ per $a > 0$.
- Utile quando conosci solo il valore atteso.
##### VARIANZA
- Misura quanto una variabile aleatoria si discosta dal valore atteso.
- $\mathrm{Var}(X) = \mathbb{E}[(X - \mathbb{E}[X])^2]$
- Formula equivalente: $\mathrm{Var}(X) = \mathbb{E}[X^2] - (\mathbb{E}[X])^2$
**(proprietà utili)**
- $\mathrm{Var}(aX) = a^2 \mathrm{Var}(X)$
-  $\mathrm{Var}(X + Y) = \mathrm{Var}(X) + \mathrm{Var}(Y) + 2\mathrm{Cov}(X,Y)$
- Se $X, Y$ indipendenti: 
	- $\mathrm{Var}(X + Y) = \mathrm{Var}(X) + \mathrm{Var}(Y)$
##### CHEBYSHEV INEQUALITY
- Vale per qualsiasi variabile aleatoria con varianza finita.
- Fornisce un **bound sulla deviazione dalla media**.
- Chebyshev ti dice **quanto è improbabile che $X$ sia lontana dalla media**.
- X è distante almeno k dalla media
- $\Pr(|X - \mathbb{E}[X]| \ge k) \le \frac{\mathrm{Var}(X)}{k^2}$
	- Se **varianza piccola** → valori concentrati → probabilità di deviazioni grandi è bassa
	- Se **k grande** → stai chiedendo deviazioni enormi → probabilità ancora più piccola
##### VARIABILI INDIPENDENTI
- Due variabili $X, Y$ sono indipendenti se il valore di una **non influenza** l’altra.
- Formalmente: $\Pr(X, Y) = \Pr(X)\Pr(Y)$
- Per eventi: $\Pr(A \cap B) = \Pr(A)\Pr(B)$
- Conseguenza: $\mathbb{E}[XY] = \mathbb{E}[X]\mathbb{E}[Y]$
- Per la varianza: se indipendenti → $\mathrm{Var}(X+Y) = \mathrm{Var}(X) + \mathrm{Var}(Y)$
##### BACK TO COIN FLIPS
- Considero $n$ lanci di moneta **indipendenti**.
- Ogni lancio è una variabile $X_i$:
    - $X_i = 1$ se esce testa
    - $X_i = 0$ se esce croce
- La somma $X = \sum X_i$ conta **quante teste ottengo in totale**.
- Valore atteso:
    - $\mathbb{E}[X] = np$ → numero medio di teste
    - Se moneta equa: $\mathbb{E}[X] = n/2$
- si vuole utilizzare il seguente problema per applicare delle regole spiegate precedentemente
**Obiettivo:**
- Stimare $\Pr(X \ge 3N/4)$
 1. Definizione variabili
- $X_i = 1$ se testa, 0 altrimenti
- $X = \sum_{i=1}^{N} X_i$
 1. Proprietà dei singoli $X_i$ (moneta equa)
	- $\mathbb{E}[X_i] = 1/2$
	- $\mathrm{Var}(X_i) = 1/4$
 2. Media e varianza di $X$
	- $\mathbb{E}[X] = N \cdot 1/2 = N/2$
	- $\mathrm{Var}(X) = N \cdot 1/4 = N/4$
 3. Riscrittura evento
$$\Pr(X \ge 3N/4)=$$
$$3N/4 - N/2 = N/4$$
$$\Rightarrow \Pr(X \ge 3N/4) \le \Pr(|X - \mathbb{E}[X]| \ge N/4)$$
 4. Applicazione Chebyshev
$$\Pr(|X - \mathbb{E}[X]| \ge N/4) \le \frac{\mathrm{Var}(X)}{(N/4)^2}$$
 5. Sostituzione
$$\frac{N/4}{N^2/16} = \frac{4}{N}$$
 6. Conclusione
$$\Pr(X \ge 3N/4) \le \frac{4}{N}$$
##### Bernoulli Trial
- $X = 1$ con prob. $p$
- $X = 0$ con prob. $1-p$
- $E[X]=p$
- $Var(X)=p(1−p)$
##### DISTRIBUZIONE GEOMETRICA DI UNA RANDOM VARIABLE
descrive matematicamente una situazione reale
- Modella il numero di prove fino al **primo successo**.
	- Prove indipendenti con probabilità di successo $p$.
- Supporto: $1,2,3,…$
	- $\Pr(X = k) = (1-p)^{k-1} p$
- memoryless **property**
- “Il passato non conta”
$\Pr(X > s+t \mid X > s) = \Pr(X > t)$
	- Significa: se non hai ancora avuto successo dopo s prove, è come **ripartire da zero**
- varianza di una geometrica 
	- $E[X]=\frac{1}{p}$
	- $Var(X)=\frac{1−p}{p^2}​$
##### back to coupon collector
- Problema:
    - Ho $n$ tipi di coupon
    - Ad ogni prova ne ottengo uno **uniforme a caso**
    - Voglio sapere **quanto tempo serve per collezionarli tutti**
🔹 Idea chiave
- Divido il processo in fasi:
    - tempo per passare da $k$ coupon a $k+1$
🔹 Variabili
- $X=$ tempo totale
	- $X = X_0 + X_1 + \dots + X_{n-1}$
- $X_k =$ tempo per trovare un nuovo coupon quando ne ho già $k$
🔹 Distribuzione di $X_k$
- Probabilità di nuovo coupon:
$$p_k = \frac{n-k}{n}$$
- Quindi:
$$X_k \sim \text{Geometrica}(p_k)$$
🔹 Valore atteso
$$\mathbb{E}[X_k] = \frac{1}{p_k} = \frac{n}{n-k}$$
🔹 Somma totale
$$\mathbb{E}[X] = \sum_{k=0}^{n-1} \frac{n}{n-k} = n \sum_{i=1}^{n} \frac{1}{i}$$
🔹 Risultato finale
$$\mathbb{E}[X] = n H_n \approx n \log n$$

$Pr(X≥2E[X])?$
Applica direttamente **Markov**:
$Pr(X \ge 2nH_n)\le \frac{1}{2}$

**raffinamento (miglioramento) della stima** del Coupon Collector.
![[Pasted image 20260331170422.png|500]]
