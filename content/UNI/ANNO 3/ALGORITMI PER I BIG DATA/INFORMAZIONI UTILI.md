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
### RANDOMIZED ALGORITHMS
#### CHERNOFF BOUNDS
è un teorema
Disuguaglianze probabilistiche che forniscono **limiti esponenziali** sulla probabilità che la somma di variabili aleatorie indipendenti si discosti dal valore atteso.
Siano:
- $X_1, \dots, X_n$​ variabili aleatorie indipendenti (tipicamente Bernoulli)
- $X =\sum_i X_i$
- $\mu = \mathbb{E}[X]$
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
### FINDING SIMILAR ITEMS IN LARGE DATA SETS
#### HASHING
#### Funzione hash completamente casuale

Sia

$$
h: U \to [0,n)
$$

dove `[0,n)` indica gli `n` slot possibili:

$$
[0,n)=\{0,1,\dots,n-1\}
$$

Una funzione hash completamente casuale manda ogni elemento di `U` in uno slot scelto:

- uniformemente
- indipendentemente dagli altri elementi

Quindi, dati elementi distinti

$$
x_1,\dots,x_u \in U
$$

e valori

$$
y_1,\dots,y_u \in [0,n)
$$

vale:

$$
Pr[h(x_1)=y_1 \land \dots \land h(x_u)=y_u]
=
\frac{1}{n^u}
$$

Significa che ogni possibile assegnamento degli elementi agli slot ha la stessa probabilità.

Esempio: se ho `u` elementi e `n` slot, ogni elemento ha probabilità `1/n` di finire in uno slot specifico.  
Poiché le scelte sono indipendenti:

$$
\frac{1}{n} \cdot \frac{1}{n} \cdots \frac{1}{n}
=
\frac{1}{n^u}
$$
#### Famiglia k-indipendente

Una famiglia di funzioni hash `\mathcal H` è detta **k-indipendente** se, scegliendo casualmente una funzione

$$
h \in_u \mathcal H
$$

per ogni scelta di `k` elementi distinti

$$
x_1,\dots,x_k
$$

e per ogni scelta di valori

$$
y_1,\dots,y_k \in [0,n)
$$

vale:

$$
Pr[h(x_1)=y_1 \land \dots \land h(x_k)=y_k]
=
\frac{1}{n^k}
$$

Intuitivamente vuol dire che, se osserviamo al massimo `k` elementi alla volta, i loro valori hash si comportano come se fossero scelti casualmente e indipendentemente.

Quindi:

- `1`-indipendenza: ogni `h(x)` è uniforme
- `2`-indipendenza: ogni coppia `h(x_1), h(x_2)` è indipendente
- `k`-indipendenza: ogni gruppo di `k` valori è indipendente
- completa casualità: tutti gli elementi dell'universo sono indipendenti
#### Famiglia k-indipendente

Una famiglia di funzioni hash `\mathcal H` è detta **k-indipendente** se, scegliendo casualmente una funzione

$$
h \in_u \mathcal H
$$

per ogni scelta di `k` elementi distinti

$$
x_1,\dots,x_k
$$

e per ogni scelta di valori

$$
y_1,\dots,y_k \in [0,n)
$$

vale:

$$
Pr[h(x_1)=y_1 \land \dots \land h(x_k)=y_k]
=
\frac{1}{n^k}
$$

Intuitivamente vuol dire che, se osserviamo al massimo `k` elementi alla volta, i loro valori hash si comportano come se fossero scelti casualmente e indipendentemente.

Quindi:

- `1`-indipendenza: ogni `h(x)` è uniforme
- `2`-indipendenza: ogni coppia `h(x_1), h(x_2)` è indipendente
- `k`-indipendenza: ogni gruppo di `k` valori è indipendente
- completa casualità: tutti gli elementi dell'universo sono indipendenti
#### Significato di tupla uniforme

Dire che

$$
(h(x_1),\dots,h(x_k))
$$

è uniforme in

$$
[0,n)^k
$$

significa che tutte le possibili combinazioni di valori hanno la stessa probabilità.

Poiché ogni `h(x_i)` può assumere `n` valori, la k-tupla può assumere:

$$
n^k
$$

combinazioni possibili.

Quindi ogni combinazione ha probabilità:

$$
\frac{1}{n^k}
$$
#### 2-indipendenza implica universalità

Una famiglia di funzioni hash `\mathcal H` è **universale** se, per ogni coppia di elementi distinti `x_1 \ne x_2`, vale:

$$
Pr[h(x_1)=h(x_2)] \le \frac{1}{n}
$$

dove `n` è il numero di slot.

Se `\mathcal H` è **2-indipendente**, allora per ogni coppia di elementi distinti `x_1,x_2` e per ogni coppia di slot `y_1,y_2` vale:

$$
Pr[h(x_1)=y_1 \land h(x_2)=y_2]=\frac{1}{n^2}
$$

Per calcolare la probabilità di collisione, sommiamo tutti i casi in cui entrambi finiscono nello stesso slot:

$$
Pr[h(x_1)=h(x_2)]
=
\sum_{y\in[0,n)}
Pr[h(x_1)=y \land h(x_2)=y]
$$

La sommatoria è su `y ∈ [0,n)`, non su `y ∈ U`, perché `y` rappresenta uno slot della tabella.

Per 2-indipendenza, ogni termine vale:

$$
Pr[h(x_1)=y \land h(x_2)=y]=\frac{1}{n^2}
$$

Dato che gli slot sono `n`:

$$
Pr[h(x_1)=h(x_2)]
=
\sum_{y\in[0,n)}\frac{1}{n^2}
=
n\cdot\frac{1}{n^2}
=
\frac{1}{n}
$$

Quindi la famiglia è universale.

In breve: la 2-indipendenza è più forte dell’universalità. La 2-indipendenza dice che due valori hash si comportano come due scelte casuali indipendenti; l’universalità richiede solo che la probabilità di collisione sia al massimo `1/n`.

#### Lunghezza attesa del bucket

Sia `S ⊆ U` un insieme di `k` elementi e sia `u ∈ S`. Definiamo `X` come il numero di elementi di `S` che finiscono nello stesso slot di `u`, cioè nel bucket `h(u)`.

Per ogni `s ∈ S`, definiamo la variabile indicatrice:

$$
X_s=
\begin{cases}
1 & \text{se } h(s)=h(u)\\
0 & \text{altrimenti}
\end{cases}
$$

Quindi:

$$
X=\sum_{s\in S}X_s
$$

cioè `X` conta quanti elementi collidono con `u`, incluso `u` stesso.

Per linearità del valore atteso:

$$
E[X]
=
\sum_{s\in S}E[X_s]
=
\sum_{s\in S}Pr[h(s)=h(u)]
$$

Separiamo il caso `s=u`. Poiché `h(u)=h(u)` è sempre vero:

$$
Pr[h(u)=h(u)] = 1
$$

quindi:

$$
E[X]
=
1+\sum_{s\in S-\{u\}}Pr[h(s)=h(u)]
$$

Per ogni `s \ne u`, usando l’universalità:

$$
Pr[h(s)=h(u)]\le \frac{1}{n}
$$

Allora:

$$
E[X]
\le
1+\sum_{s\in S-\{u\}}\frac{1}{n}
=
1+\frac{k-1}{n}
\le
1+\frac{k}{n}
$$

Quindi:

$$
E[X]\le 1+\frac{k}{n}
$$

Il termine `1` compare perché nel bucket di `u` c’è sempre almeno `u` stesso.

Se il numero di slot è proporzionale al numero di elementi, cioè:

$$
n=\Theta(k)
$$

allora:

$$
\frac{k}{n}=O(1)
$$

e quindi:

$$
E[X]=O(1)
$$

Con hashing universale e chaining, la lunghezza attesa del bucket è costante, quindi ricerca, inserimento e cancellazione hanno tempo atteso `O(1)`.
#### Esempio 1: prodotto scalare modulo primo

Sia `m` primo. Rappresentiamo ogni elemento `x ∈ U` come vettore:

$$
x=(x_1,\dots,x_r)
$$

e scegliamo casualmente un vettore:

$$
a=(a_1,\dots,a_r)\in [m]^r
$$

Definiamo:

$$
h_a(x)=\left(\sum_{i=1}^{r}a_i x_i\right)\bmod m
$$

Vogliamo dimostrare che la famiglia è universale, cioè per ogni `x \ne y`:

$$
Pr[h_a(x)=h_a(y)]\le \frac{1}{m}
$$

Poiché `x \ne y`, esiste almeno una coordinata `j` tale che:

$$
x_j \ne y_j
$$

La collisione avviene quando:

$$
h_a(x)=h_a(y)
$$

cioè:

$$
\sum_{i=1}^{r}a_i x_i \equiv \sum_{i=1}^{r}a_i y_i \pmod m
$$

Portando tutto da un lato e isolando la coordinata `j`:

$$
a_j(y_j-x_j)\equiv \sum_{i\ne j}a_i(x_i-y_i) \pmod m
$$

Ora fissiamo tutti gli `a_i` con `i \ne j`. Il membro destro diventa un valore fissato, che chiamiamo `\alpha`:

$$
a_j(y_j-x_j)\equiv \alpha \pmod m
$$

Poniamo:

$$
z=y_j-x_j
$$

Dato che `x_j \ne y_j`, allora `z \ne 0`. Siccome `m` è primo, `Z_m` è un campo, quindi ogni elemento non nullo ha inverso. Esiste quindi `z^{-1}` e possiamo scrivere:

$$
a_j \equiv \alpha z^{-1} \pmod m
$$

Quindi esiste un solo valore di `a_j` che causa collisione. Siccome `a_j` è scelto uniformemente tra `m` valori:

$$
Pr[h_a(x)=h_a(y)]\le \frac{1}{m}
$$

Dunque la famiglia è universale.

Idea chiave: fissati tutti i coefficienti tranne uno, c’è un solo valore dell’ultimo coefficiente che può causare collisione.

#### Perché serve che `m` sia primo?

Serve perché, se `m` è primo, `Z_m` è un campo.

Questo significa che ogni elemento non nullo ha inverso moltiplicativo modulo `m`.

Nel passaggio:

$$
a_j(y_j-x_j)\equiv \alpha \pmod m
$$

sappiamo che:

$$
y_j-x_j \ne 0
$$

quindi possiamo dividere modulo `m`, cioè moltiplicare per l’inverso:

$$
a_j \equiv \alpha (y_j-x_j)^{-1} \pmod m
$$

Senza `m` primo, questo inverso potrebbe non esistere, quindi la dimostrazione non funzionerebbe.
#### Esempio 2: famiglia affine modulo primo

Sia `p` primo, con:

$$
p\ge |U|
$$

Rappresentiamo gli elementi di `U` come elementi di `Z_p`.

Scegliamo:

$$
a\in Z_p^*, \qquad b\in Z_p
$$

dove:

$$
Z_p^*=Z_p\setminus\{0\}
$$

Definiamo:

$$
h_{a,b}(x)=((ax+b)\bmod p)\bmod m
$$

Prima si lavora modulo `p`, dove esiste una struttura di campo; poi si riduce modulo `m`, cioè nel numero di slot della tabella.

Poniamo:

$$
X=(ax+b)\bmod p
$$

$$
Y=(ay+b)\bmod p
$$

Se `x \ne y`, allora `X \ne Y`. Infatti, se fossero uguali:

$$
ax+b\equiv ay+b \pmod p
$$

allora:

$$
a(x-y)\equiv 0 \pmod p
$$

Poiché `a \ne 0` e `p` è primo, `a` ha inverso modulo `p`, quindi:

$$
x-y\equiv 0 \pmod p
$$

cioè:

$$
x=y
$$

contraddizione. Quindi per `x \ne y` si ha necessariamente `X \ne Y`.

Nota: è meglio scrivere `0 \le x,y < p`, non `x,y < p-1`.
#### Quasi indipendenza
Vogliamo calcolare:
$$
Pr[X=i \land Y=j]
$$
cioè la probabilità che:
$$
X=(ax+b)\bmod p=i
$$
e:
$$
Y=(ay+b)\bmod p=j
$$
Questo equivale al sistema:
$$
\begin{cases}
ax+b\equiv i \pmod p\\
ay+b\equiv j \pmod p
\end{cases}
$$
Sottraendo le due equazioni:
$$
a(x-y)\equiv i-j \pmod p
$$
Poiché `x \ne y`, allora `x-y \ne 0`, quindi ha inverso modulo `p`.
Allora:
$$
a\equiv (i-j)(x-y)^{-1}\pmod p
$$
Una volta trovato `a`, anche `b` è determinato:
$$
b\equiv i-ax \pmod p
$$
Quindi per ogni coppia compatibile `(i,j)` esiste una sola coppia `(a,b)`.
Dato che:
- `a` ha `p-1` scelte possibili, perché `a \in Z_p^*`
- `b` ha `p` scelte possibili
il numero totale di coppie `(a,b)` è:
$$
(p-1)p
$$
Quindi:
$$
Pr[X=i \land Y=j]=\frac{1}{(p-1)p}
$$
Inoltre `X` è uniforme su `Z_p`, quindi:
$$
Pr[X=i]=\frac{1}{p}
$$
Per probabilità condizionata:
$$
Pr[Y=j\mid X=i]
=
\frac{Pr[X=i\land Y=j]}{Pr[X=i]}
=
\frac{\frac{1}{(p-1)p}}{\frac{1}{p}}
=
\frac{1}{p-1}
$$
Quindi, fissato `X=i`, il valore `Y` è uniforme tra i `p-1` valori diversi da `i`.
Questa non è vera 2-indipendenza, perché per `x \ne y` non può accadere `X=Y`. Infatti:
$$
Pr[X=i \land Y=i]=0
$$
mentre in una famiglia 2-indipendente vera dovrebbe essere:
$$
\frac{1}{p^2}
$$
Per questo è più corretto dire che questa famiglia è quasi 2-indipendente, ma comunque sufficiente per ottenere universalità.
#### Perfect hashing semplice
Una funzione hash `h` è **perfetta su un insieme A** se non produce collisioni tra gli elementi di `A`.
Formalmente, per ogni coppia distinta:
$$
x_1 \ne x_2 \in A
$$
deve valere:
$$
h(x_1)\ne h(x_2)
$$
Quindi `h` deve essere iniettiva solo su `A`, non su tutto l’universo.
#### Teorema
Sia `\mathcal H` una famiglia universale di funzioni:
$$
h:[1,n]\to [0,M)
$$
dove `M` è il numero di slot di arrivo.
Se:
$$
M\ge n^{c+2}
$$
allora, scegliendo casualmente:
$$
h\in_u \mathcal H
$$
la funzione `h` è perfetta su ogni insieme `A ⊆ [1,n]` con probabilità almeno:
$$
1-n^{-c}
$$
Idea: se la tabella è molto grande, la probabilità che esista anche solo una collisione diventa molto piccola.
#### Dimostrazione
Per universalità, per ogni coppia distinta `x_1 \ne x_2`:
$$
Pr[h(x_1)=h(x_2)]\le \frac{1}{M}
$$
Consideriamo un insieme `A ⊆ [1,n]`. Poiché `|A|≤n`, il numero di coppie distinte in `A` è al massimo:
$$
|A|^2\le n^2
$$
Una collisione su `A` avviene se esiste almeno una coppia distinta che collide.
Usando lo Union Bound:
$$
Pr[\text{almeno una collisione}]
\le
\sum_{x_1\ne x_2}Pr[h(x_1)=h(x_2)]
$$
Ogni termine è al massimo `1/M` e ci sono al massimo `n^2` coppie, quindi:
$$
Pr[\text{almeno una collisione}]
\le
n^2\cdot \frac{1}{M}
=
\frac{n^2}{M}
$$
Se:
$$
M\ge n^{c+2}
$$
allora:
$$
\frac{n^2}{M}
\le
\frac{n^2}{n^{c+2}}
=
n^{-c}
$$
Quindi:
$$
Pr[\text{almeno una collisione}]\le n^{-c}
$$
e quindi:
$$
Pr[\text{nessuna collisione}]
\ge
1-n^{-c}
$$
Dunque `h` è perfetta su `A` con alta probabilità.
#### Osservazione
Questo è perfect hashing ottenuto “sprecando spazio”.
Infatti richiede:
$$
M\ge n^{c+2}
$$
cioè una tabella molto più grande del numero di elementi.
Esempio:
- se `c=1`, allora `M≥n^3`
- se `c=2`, allora `M≥n^4`
Quindi non è ancora il perfect hashing ottimale.
Il perfect hashing statico a due livelli serve proprio a ottenere:
$$
O(1)
$$
tempo worst-case per la ricerca e:
$$
O(n)
$$
spazio totale.
- Una funzione è perfetta su `A` se non crea collisioni tra gli elementi di `A`.
- Con hashing universale, ogni coppia collide con probabilità al massimo `1/M`.
- Le coppie possibili sono al massimo `n^2`.
- Per Union Bound:
$$
Pr[\text{collisione}]\le \frac{n^2}{M}
$$
- Se `M≥n^{c+2}`, allora:
$$
Pr[\text{collisione}]\le n^{-c}
$$
quindi:
$$
Pr[\text{nessuna collisione}]\ge 1-n^{-c}
$$
- Funziona, ma usa troppo spazio; il perfect hashing a due livelli serve per arrivare a spazio `O(n)`.
#### Hashing universale 
- SLIDE 10
#### FAMIGLIE HASH UNIVERSALI
#### PERFECT RANDOMIZED HASHING

#### DESCRIZIONE DEL PROBLEMA
#### JACCARD SIMILARITY
#### 3 ESSENTIAL
#### SHINGLING
#### SIMILARITY FOR SHINGLES
#### WORKING HYPOTESIS
#### MIN HASHING
#### ENCODINGH SETS AS BINARY VECTORS
#### FINDING SIMILAR COLUMNS
#### MIN HASHING
#### TEOREMA MIN HASHING PROPERTY 
#### MIN HASHING SIGNATURES
