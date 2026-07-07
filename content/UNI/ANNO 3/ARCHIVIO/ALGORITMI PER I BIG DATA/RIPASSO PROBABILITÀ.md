##### SPAZIO PROBABILISTICO
Uno spazio probabilistico è una tripla $(Ω, F, Pr)$ dove:  
- $Ω$ = insieme di tutti i possibili esiti (sample space)  
- $F$ = insieme degli eventi (sottoinsiemi di Ω)  
- $Pr$ = funzione che assegna una probabilità a ogni evento  
##### FUNZIONE PROBABILISTICA
Una funzione $Pr : F → ℝ$ che assegna probabilità agli eventi e soddisfa:
- $0 ≤ Pr(E) ≤ 1$
- $Pr(Ω) = 1$
- UNION BOUND:
	- additività: unione per eventi disgiunti, $Pr(⋃ Ei) \leq Σ Pr(Ei)$
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
#### CHERNOFF BOUNDS
è un teorema
Disuguaglianze probabilistiche che forniscono **limiti esponenziali** sulla probabilità che la somma di variabili aleatorie indipendenti si discosti dal valore atteso.
Siano:
- $X_1, \dots, X_n$​ variabili aleatorie indipendenti (tipicamente Bernoulli)
- $X =\sum_i X_i$
- $\mu = \mathbb{E}[X]$
moltiplicativa
*Upper Tail*
$\Pr[X \ge (1 + \delta)\mu] \le e^{-\frac{\delta^2 \mu}{3}} \quad (\delta > 0)$
Probabilità che $X$ sia **molto più grande della media**

- VERSIONE COMPLESSA CHE SI USA TIPO NEL LOAD BALACING
Per $X=\sum_i X_i$​, con $X_i$ indipendenti 0-1 e $\mu=\mathbb E[X]$ una forma standard è:

$\Pr[X \ge (1+\delta)\mu] \le \left(\frac{e^\delta}{(1+\delta)^{1+\delta}}\right)^\mu \qquad (\delta>0)$

Questa è la forma **più precisa**.

*Lower Tail*
$\Pr[X \le (1 - \delta)\mu] \le e^{-\frac{\delta^2 \mu}{2}} \quad (0 < \delta < 1)$
Probabilità che $X$ sia **molto più piccolo della media**

additiva
usato in sampling
$Pr[∣X−E[X]∣>soglia]$
Le slide usano questa forma del Chernoff Bound:
$$\Pr[|X-\mathbb{E}[X]|>a] < 2\exp\left(-\frac{a^2}{2q}\right)$$
Nel nostro caso la soglia è:
$$a=\varepsilon q$$


- **Markov** si usa per variabili non negative e dà un bound più debole.
- **Chebyshev** usa la varianza e dà un bound polinomiale.
- **Chernoff** è più forte perché, per somme di Bernoulliane indipendenti, dà un decadimento esponenziale:
$$e^{-\Theta(\varepsilon^2 q)}$$
Quindi aumentando $q$, la probabilità di errore decresce esponenzialmente.