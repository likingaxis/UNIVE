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
### FINDING SIMILAR ITEMS IN LARGE DATA SETS
#### HASHING
##### DEFINIZIONE
Una funzione hash `e una funzione $h : U \to [0, n)$, informalmente $h$ `e utilizzata per “randomizzare” i dati:  1. $h(x)$ dovrebbe essere piu` casuale possibile. Idealmente dovrebbe mappare in modo pi`u uniforme possibile 2. $h(x)$ dovrebbe essere veloce da calcolare. Idealmente proporzionale al tempo di accesso a $x$ 3. $h$ dovrebbe occupare poco spazio in memoria. Idealmente $O(1)$ parole di memoria
###### FAMIGLIA DI FUNZIONI HASH
Una famiglia di funzioni hash $H$ e` un sottoinsieme di funzioni $h : U \to [0, n)$, nell’inieme di tutte le funzioni hash $H \subseteq [0, n)^U$ .
###### FUNZIONE HASH UNIFORME
Una funzione hash $h$ da un universo $U = \{x_0, \dots , x_u\}$ ($u = |U|$). $H$ `e detta uniforme se per ogni $y_1, \dots , y_u \in [0, n)$ si ha che $Pr [h(x_1), \dots , h(x_u) = y_1, \dots , y_u] = \frac{1}{n^u}$
se ho $u$ elementi e $n$ slot, ogni elemento ha probabilità $1/n$ di finire in uno slot specifico.  
###### FAMIGLIA H K-INDIPENDENTE
se e solo se per una scelta uniforme di $h \in H$ si ha  1. Per ogni $x \in U$ , $h(x)$ `e una variabile aleatoria uniforme in $[0, n)$ 2. Le variabili aleatorie $h(x_1), h(x_2), \dots , h(x_u)$ sono $k$-indipendenti o in modo equivalente $Pr \left[ \bigwedge_{i=1}^k h(x_i) = y_i \right] = \frac{1}{n^k}$ per ogni scelta di $x_1, \dots , x_k \in [1, u]$ $y_1, \dots , y_k \in [0, n)$. O anche la $k$-tupla $(h(x_1), \dots , h(x_k))$ e` uniforme in $[0, n)^k$. Per $k = n$ la famiglia di funzioni hash `e detta completamente uniforme.
significa che tutte le possibili combinazioni di valori hanno la stessa probabilità.
- $1$-indipendenza: ogni $h(x)$ è uniforme
- $2$-indipendenza: ogni coppia $h(x_1), h(x_2)$ è indipendente
- $k$-indipendenza: ogni gruppo di $k$ valori è indipendente
- completa casualità: tutti gli elementi dell'universo sono indipendenti
#### HASHING UNIVERSALE
Una famiglia di funzioni hash $H$ e` detta universale se scegliendo $h \in_u H$ $h : U \to [0, n)$ dati $\forall x_1 \neq x_2 \in U$ $Pr[h(x_1) = h(x_2)] \leq \frac{1}{n}$ in pratica la probabilit`a di collisione di due elementi di $U$ . Si nota che questa probabilit`a `e quella che ci si aspetta per una funzione hash che dia un risultato veramente totalmente casuale

###### 2-indipendenza implica universalità
$Pr[h(x_1) = h(x_2)] = \sum_{y \in U} Pr[h(x_1) = h(x_2) \land h(x_2) = y] = \sum_{y \in U} Pr[h(x_1) = y \land h(x_2) = y] = \sum_{y \in U} \frac{1}{n^2} = \frac{1}{n}$

la sommatoria è con $y$ che appartiene a $[0,n)$
In breve: la 2-indipendenza è più forte dell’universalità. La 2-indipendenza dice che due valori hash si comportano come due scelte casuali indipendenti; l’universalità richiede solo che la probabilità di collisione sia al massimo $1/n$.
###### EXPECTATION di una famiglia universale
Sia $H$ una famiglia di funzioni hash universali, $S \subseteq U$ un insieme di $k$ elementi. Sia $u \in S$. Si sceglie in modo uniforme una funzione $h$ da $H$, e sia $X$ la variabile aleatoria che conta il numero di elementi di $S$ mappati nello stesso elemento $h(u)$ allora $E[X] \leq 1 + \frac{k}{n}$.  Dimostrazione. Sia $u$ fissato, per ogni $s \in S$, si definisce la variabile aleatoria $X_s$ associata $X_s = \begin{cases} 1 & \text{se } h(s) = h(u) \\ 0 & \text{altrimenti} \end{cases}$ $X = \sum_{s \in S} X_s$  Per cui si ha $E[X] = \sum_{s \in S} E[X_s] = \sum_{s \in S} Pr[h(s) = h(u)] = 1 + \sum_{s \in S-\{u\}} Pr[h(s) = h(u)]$ (Per universalit`a) $\leq 1 + \frac{k}{n}$.  Nota: per $k = \Theta(n)$ si ha $O(1)$ tempo per operazione.
Separiamo il caso $s=u$. Poiché $h(u)=h(u)$ è sempre vero:

$Pr[h(u)=h(u)] = 1$

#### FAMIGLIE HASH UNIVERSALI ESEMPI
##### ESEMPIO 1
Si sceglie un numero primo $m > n$, `e noto che esiste $m$ tale che $\forall n \ n \leq m \leq 2n$, successivamente si identifica ogni elemento $x \in U$ come un intero in base $m$, di $r$ cifre $x = (x_1, x_2, \dots , x_r)$. Per una $a = (a_1, a_2, \dots , a_n) \in U$, $a_i \in [m]$ fissata si definisce $h_a(x) = \left( \sum_{i=1}^r a_i x_i \right) \bmod m$ (4) Per cui si definisce la famiglia di funzioni hash universale $\bar{H}$ $\bar{H} = \{h_a : a \in U\}$  Per $|U| = n$, $r$ deve essere $\log_m(n)$ poich ́e $m^r \geq n$. Ne risulta che per scegliere una funzione hash in modo uniforme $h \in_u \bar{H}$ `e sufficiente scegliere $a \in_u U$ .
$r$ rappresenta il numero di cifre necessarie per rappresentare un elemento $x$ dell'universo $U$ quando viene scritto in base $m$
###### UNIVERSALITÀ DI $\bar H$ 
Dimostrazione. Sia $x = (x_1, x_2 \dots , x_r)$ e $y = (y_1, y_2 \dots , y_r) \in U$ tale che $x \neq y$.  Si deve dimostrare $Pr[h(x) = h(y)] \leq \frac{1}{n}$ (universalit`a). Poich ́e $x \neq y$ esiste $y$ t.c. $x_j \neq y_j$. $h_a(x) = h_a(y)$ se e  solo se $\underbrace{a_j (y_j - x_j)}_{z} = \underbrace{\sum_{i \neq j} a_i(x_i - y_i)}_{\alpha} \bmod m$

Una collisione avviene quando il calcolo per $x$ dà lo stesso risultato del calcolo per $y$:

$\sum_{i=1}^r a_i x_i = \sum_{i=1}^r a_i y_i \pmod m$
2. Isolare l'indice $j$

Vogliamo separare la componente $j$ (quella dove sappiamo che $x_j \neq y_j$) da tutto il resto della sommatoria:

$a_j x_j + \sum_{i \neq j} a_i x_i = a_j y_j + \sum_{i \neq j} a_i y_i \pmod m$
Si assume $a \in_u U$ , quindi si assume $a_i$ fissato $\forall i \neq j$. Per $m$ primo $\mathbb{Z}_m$ `e un campo, per cui, per $z \neq 0$ esiste un’unica inversa moltiplicativa $z^{-1}$ tale che $z \cdot z^{-1} = 1 \bmod m$  $a_j \cdot z \cdot z^{-1} = \alpha \cdot z^{-1} \bmod m$  $a_j = \alpha \cdot z^{-1} \bmod m$ (soluzione unica)  $Pr[a_j \equiv_m \alpha z^{-1}] \leq \frac{1}{m}$
$\mathbb{Z}_m$ rappresenta l'insieme dei resti della divisione intera per $m$, ovvero l'insieme $\{0, 1, 2, \dots, m-1\}$.
In matematica "normale" (quella dei numeri reali), se hai l'equazione $5x = 10$, per trovare $x$ dividi per $5$. Dividere per $5$ è lo stesso che moltiplicare per $1/5$. Quel $1/5$ è l'inversa di $5$.Nel mondo del calcolo modulare (quello con il $\pmod m$), non esiste la divisione classica. Per "eliminare" un numero, devi usare la sua inversa moltiplicativa ($z^{-1}$).Definizione: L'inversa di $z$ è quel numero che, moltiplicato per $z$, dà come risultato 1 nel mondo modulare ($z \cdot z^{-1} \equiv 1 \pmod m$).Condizione: Questa inversa esiste ed è unica solo se $m$ è un numero primo (motivo per cui si sceglie $m$ primo nell'esempio).
Serve perché, se $m$ è primo, $\mathbb{Z}_m$ è un campo.
Un campo è un insieme in cui puoi eseguire le quattro operazioni fondamentali (addizione, sottrazione, moltiplicazione e divisione) con le stesse regole a cui sei abituato per i numeri reali.

Perché **$\mathbb{Z}_m$** sia un campo, deve garantire che per ogni elemento diverso da zero esista un modo per "dividere", ovvero deve esistere l'**inversa moltiplicativa**.
Questo significa che ogni elemento non nullo ha inverso moltiplicativo modulo $m$.
Senza $m$ primo, questo inverso potrebbe non esistere, quindi la dimostrazione non funzionerebbe.
##### ESEMPIO 2
Si mostra ora una famiglia di funzioni hash 2-indipendenti sia $p \geq n$ un numero primo, siano $a, b \in \mathbb{Z}_p$ definite come nell’esempio precedente, si definisce la funzione hash $h_{a,b}$  $h_{a,b}(x) = [(ax + b) \bmod p] \bmod m$  in pratica la funzione hash `e definita come un polinomio scelto uniformemente in $\mathbb{Z}_p$ di grado 1. Si definisce la famiglia $\hat{H}$  $\hat{H} = \{h_{a,b} \mid a, b \in \mathbb{Z}_p\}$
###### 2 indipendenza e universalità
dimostrazione per assurdo
Sia $X = (ax + b) \bmod p$ e $Y = (ay + b) \bmod p$ per $x \neq y$. Poich ́e $a \neq 0$ e $p > n$ allora $X \neq Y$.
$h_{a,b}(x) = h_{a,b}(y) \iff X = Y \bmod m$  1. $X$ e $Y$ sono distribuite in modo uniforme su $\mathbb{Z}_p$, poiche ́ $a, b$ sono, a loro volta, distribuite in modo uniforme e $h$ `e lineare iniettiva. Dimostrazione.  $ax + b \equiv_p ay + b \iff a(x - y) \equiv_p 0$ (5)  $\implies (x - y) \equiv_p 0 \iff x = y$ (6) Il passaggio (6) `e giustificato poich ́e $x, y < p - 1$
testo specifica che $x, y < p - 1$. Questo è fondamentale perché:Se sia $x$ che $y$ sono numeri piccoli (minori del modulo $p$), la loro differenza $(x - y)$ è anch'essa "piccola".L'unico multiplo di $p$ che può stare in quell'intervallo ristretto è lo zero.Quindi, se l'unico modo per avere $(x - y) \equiv_p 0$ è che la differenza sia esattamente $0$, allora deve essere per forza $x = y$.
otteniamo un assurdo perchè avevamo detto che erano diversi $x$ e $y$
$X$ e $Y$ sono quasi indipendenti tra loro, $Pr[X = i \land Y = j] = \frac{1}{(p-1)p}$
Dimostrazione. 
cioè la probabilità che:
$X=(ax+b)\bmod p=i$
e:
$Y=(ay+b)\bmod p=j$
Questo equivale al sistema:
$\begin{cases} ax+b\equiv i \pmod p\\ ay+b\equiv j \pmod p \end{cases}$
$\begin{cases} ax + b \equiv_p i \\ ay + b \equiv_p j \end{cases}$ (7)  Esiste un unica soluzione per $(a, b) \in \mathbb{Z}_p^2$, poich ́e il rango `e 2. Siano $f, g$ soluzioni uniche del sistema lineare $Pr [(ax + b) \equiv_p i \land (ay + b) \equiv_p j] = Pr[a = f(x, y, i, j) \land b = g(x, y, i, j)] = Pr[a = f(x, y, i, j)] \cdot Pr[b = g(x, y, i, j)]$ Per cui $Pr [Y = j \mid X = i] = \frac{Pr[X = i \land Y = j]}{Pr[X = i]} = \frac{1}{p-1}$
Per una $i$ fissata in $\mathbb{Z}_p$ ci sono al massimo $\frac{p}{m} - 1 \leq \frac{p-1}{m}$ valori per $Y$ tale che $Y = i \bmod m$, ovvero tutti gli  interi $\in \mathbb{Z}_p$ per cui la distanza da $i$ e` un multiplo di $m$. Da 2 $Pr[Y = j \mid X = i] = \frac{1}{p-1}$ per l’union bound si ottiene $Pr[Y = i \bmod m \mid X = i] \leq \frac{p-1}{m} \frac{1}{p-1} = \frac{1}{m}$ . $\hat{H}$ `e universale.
Quindi per ogni coppia compatibile $(i,j)$ esiste una sola coppia $(a,b)$.
Dato che:
- $a$ ha $p-1$ scelte possibili, perché $a \in \mathbb{Z}_p^*$
- $b$ ha $p$ scelte possibili
il numero totale di coppie $(a,b)$ è:
$(p-1)p$
Quindi:
Dato che abbiamo dimostrato che esiste **una sola** coppia specifica $(a, b)$ in grado di soddisfare il sistema per certi $i$ e $j$, la probabilità di "beccare" proprio quella coppia è:
$Pr[X=i \land Y=j]=\frac{1}{(p-1)p}$
Inoltre $X$ è uniforme su $\mathbb{Z}_p$, quindi:
$Pr[X=i]=\frac{1}{p}$
Per probabilità condizionata:
$Pr[Y=j\mid X=i] = \frac{Pr[X=i\land Y=j]}{Pr[X=i]} = \frac{\frac{1}{(p-1)p}}{\frac{1}{p}} = \frac{1}{p-1}$

#### PERFECT RANDOMIZED HASHING
Parliamo ora di funzioni hash perfette ovvero una funzione hash senza collisioni  Definizione 4.3.1 (funzione hash perfetta). Una funzione hash $h : [1, n] \to [0, M]$ `e detta perfetta su un insieme $A \subseteq [1, n]$ se e solo se per ogni $x_1 \neq x_2 \in A$ si ha $h(x_1) \neq h(x_2)$, quindi `e iniettiva su $A$. In generale cerchiamo una funzione che abbia tale propriet`a con alta probabilit`a.
Se una famiglia $H$ di funzioni $h : [1, n] \to [0, M)$ `e universale e $M \geq n^{c+2}$ per una costante $c$ arbitrariamente grande allora $h \in_u H$ `e perfetta su ogni insieme $A \subseteq [1, n]$ con alta probabilit`a.
Per universalità, per ogni coppia distinta $x_1 \ne x_2$:
$Pr[h(x_1)=h(x_2)]\le \frac{1}{M}$
Consideriamo un insieme $A \subseteq [1,n]$. Poiché $|A|\le n$, il numero di coppie distinte in $A$ è al massimo:
$|A|^2\le n^2$
Una collisione su $A$ avviene se esiste almeno una coppia distinta che collide.
Usando lo Union Bound:
$Pr[\text{almeno una collisione}] \le \sum_{x_1\ne x_2}Pr[h(x_1)=h(x_2)]$
Ogni termine è al massimo $1/M$ e ci sono al massimo $n^2$ coppie, quindi:
$Pr[\text{almeno una collisione}] \le n^2\cdot \frac{1}{M} = \frac{n^2}{M}$
Se:
$M\ge n^{c+2}$
allora:
$\frac{n^2}{M} \le \frac{n^2}{n^{c+2}} = n^{-c}$
Quindi:
$Pr[\text{almeno una collisione}]\le n^{-c}$
e quindi:
$Pr[\text{nessuna collisione}] \ge 1-n^{-c}$
Dunque $h$ è perfetta su $A$ con alta probabilità.
#### PROBLEMA DEL DIZIONARIO
##### DEFINIZIONE
Il dizionario `e un tipo di dati, dato un universo $U$ di elementi possibili, mantiene un sottoinsieme arbitrario $S \subseteq U$ tale che operazioni come intersezione, unione, e ricerca in $S$ siano efficienti, queste operazioni sono rappresentate come:  • create() inizializza un dizionario vuoto • insert($u$) aggiunge un elemento $u \in U$ a $S$ • delete($u$) rimuove un elemento $u$ da $S$ • lookup($u$) risponde alla domanda $s \in S$? La sfida principale riguarda la grandezza dell’universo $U$ che pu`o essere estremamente grande, per cui definire un array di dimensione $|U|$ non `e ragionevole, si cerca una soluzione proporzionale al sottoinsieme $n := |S|$. Una soluzione deterministica `e implementata con gli alberi AVL con $O(n)$ spazio e $O(\log n)$ tempo per operazione.  Si presenta una soluzione probabilistica con $O(n)$ spazio e $O(1)$ tempo atteso per operazione, a tale scopo si presenta il concetto di tabelle hash.
###### TABELLE HASH CON O SENZA LISTA DI TRABOCCO
Viene creato un array $H$ di grandezza $m \approx n$, quindi $H = [m]$. Si ha una collisione quando $h(u) = h(v)$ per $u \neq v$, mediamente per il paradosso del compleanno una collisione `e attesa ogni $\sqrt{n}$ inserimenti.  Per ogni posizione $i$ dell’array $H[i]$ contiene delle linked list che contengono tutti gli elementi che collidono, solitamente chiamate liste di trabocco.
Le operazioni sono implementate come segue, viene calcolato il valore di $h(u)$, successivamente l’operazione viene eseguita scandendo $H(h(u))$. `E quindi necessario utilizzare una funzione hash $h$ che distribuisca gli elementi di $S$ in modo uniforme
E possibile utilizzare la tecnica dell’ hashing deterministico, in cui ogni elemento $u \in U$ e` rappresentato come intero, scegliendo un primo $p$, tale che $m \leq p \leq 2m$ allora $h$ `e definito come $h(u) = u \bmod p$ funziona bene per applicazioni statiche in cui $S$ non varia.
Per applicazioni in cui $S$ varia si fa uso delle funzioni hash universali, di cui sono state precedentemente descritte le propriet`a ed esempi. Si ricordando le variabili $n$ rappresentate il numero di elementi di $S$, $N = |U|$, $m$ numero primo compreso $N \leq m \leq 2N$. Si fa uso della tecnica di doubling-halving
// In caso di espansione if $n > N$ then $N \leftarrow 2N$ scegli un nuovo numero primo $m$ tale che $m \sim \Theta(n)$ re-hash di tutti gli elementi in $O(n)$  // In caso di contrazione if $n < N/4$ then $N \leftarrow N/2$ scegli un nuovo numero primo $m$ tale c


#### PROBLEMI DI BIG DATA
In questa sezione si parla di problemi per cui la dimensione dei dati `e eccessiva, ad esempio si potrebbe essere interessati a valutare uno dei seguenti problemi  1. Pagine con una grande porzione di parole simili 2. Clienti con acquisti simili 3. Immagini con elementi simili  Esempio 3. Input: punti ad alte dimensioni x1, x2, . . . , xN     141 021 010    =⇒ 1 4 1 0 2 1 0 1 0 ∈ {0, 1, . . . , c}h.  per h molto grande Si introduce una funzione di distanza d(x1, x2) che quantifichi quanto i due dati sono vicini. Un’applicazione comune consiste nel trovare tutte le coppie di dati in un insieme di dati che sono “abbastanza” vicini (rispetto a una soglia s) per cui d(x1, x2) ≤ s.  Una soluzione deterministica banale richiede tempo O(N 2 · h) con N numero di punti e h dimensione dei dati. Banalmente si calcola la distanza per ogni coppia possibile n  2 = O(n2).  `E possibile trovare coppie di dati simili in tempo O(N · h′) con h′ << h, come spiegato di seguito.
#### JACCARD SIMILARITY
Dato un grande insieme di documenti U ∗ grande N ≈ 109, si vogliono trovare i documenti simili. Le applicazioni possibili riguardano la ricerca di siti web duplicati e la ricerca di notizie simili.  Il problema descritto presenta diverse sfide  • molti pezzi piccoli di un documento possono essere in ordine diverso • il numero di documenti (N ) `e troppo elevato per confrontare tutte le coppie • i documenti possono essere talmente grandi (h) da non poter essere mantenuti in memoria  `E inoltre necessario definire una funzione di distanza adeguata, a tale scopo si fa uso della Jaccard Similarity definita su due insiemi C1, C2 come segue  Jaccard similarity(C1, C2) = |C1 ∩ C2|  |C1 ∪ C2|  Si definisce anche un’altra misura Jaccard Distance d(C1, C2) = 1 − J. Sim(C1, C2). Resta ora da definire come applicare la Jaccard Similarity a due documenti (stringhe di lunghezza finita).  Si definiscono i punti chiave della risoluzione del problema 1. Input: Un universo U enorme di documenti 2. Shingling: conversione dei documenti in grandi insiemi 3. Min-Hashing: conversione di grandi insiemi in piccole firme mantenendo la J. Sim 4. Local-Sensitive-Hashing: Individuare le firme che potrebbero essere simili 5. Output: coppie di documenti candidati Restano ora da definire nel dettaglio le tecniche descritte

#### 3 ESSENTIAL
2. Shingling: Convert Docs to (large) Sets 3. Min-Hashing: Convert large Sets to short Signatures, while preserving J. Similarity 4. Locality-Sensitive Hashing: Focus on pairs of Signatures likely to be from J.similar Docs (overcome the Θ(N^2) barrier!!)

#### SHINGLING

Facciamo uso della tecnica di Shingling per convertire i documenti in insiemi. Un k-shingle per un documento `e una sequenza di k token che appaiono in un documento. I token possono generalmente essere definiti come: caratteri o parole, si fa uso di Ut per rappresentare l’insieme di tutti i possibili token.  Esempio 4. Si assumano i token come caratteri dell’alfabeto. Sia k = 2  Per i documenti D1 = abcab, D2 = ccadf , gli insiemi di 2-shingle corrispondenti sono  S(D1) = {ab, bc, ca} S(D1) = {cc, ca, ad, df }  Ogni documento D ∈ U pu`o quindi essere rappresentato come l’ insieme dei suoi k-shingle C = S(D). In modo piu` pratico ogni documento `e rappresentato come C = S(D) un vettore binario avente ogni possibile elemento dell’insieme U k. Codificando gli insiemi come vettori binari e` possibile definire l’intersezione come bitwise and e l’unione come bitwise or.E` facile notare che questi vettori sono molto grandi, ma conservano i dati in modo sparso.  `E inoltre facile rappresentare la J. Sim con un’interpretazione probabilistica  J. Sim(C1, C2) = C1 ∩ C2  C1 ∪ C2  = Pr[C1 ∩ C2|C1 ∪ C2].  Concludendo i k-shingle permettono di rappresentare il contenuto dei documenti attraverso degli elementi di un insieme. Questa tecnica permette inoltre di trovare documenti simili anche per testi che appaiono in ordine diverso.  L’insieme di tutti i dati gestiti `e visibile come una matrice M ∈ 0, 1N×m con N numero di documenti e m = |U |k shingles possibili. Si presenta un esempio di seguito  Si passa ora alla tecnica del Min-hashing che permette di rendere i grandi insiemi di k-shingles in piccole firme mantenendo la misura di similarit`
dove C(D)C(D)C(D) contiene i **kkk-shingle** presenti nel documento. Subito dopo dicono che, in modo pratico, ogni documento può essere rappresentato come un **vettore binario** avente una posizione per ogni possibile elemento di UkU^kUk, cioè per ogni possibile sequenza di kkk token.

Quindi sì:

C(D)∈{0,1}∣U∣kC(D) \in \{0,1\}^{|U|^k}C(D)∈{0,1}∣U∣k

dove:

- UUU è l’insieme dei possibili token;
- UkU^kUk è l’insieme di tutti i possibili kkk-shingle;
- ∣U∣k|U|^k∣U∣k è il numero totale di possibili kkk-shingle;
- ogni coordinata del vettore indica se quel certo shingle compare o no nel documento.

In pratica:

C(D)[s]={1se lo shingle s compare in D0altrimentiC(D)[s] = \begin{cases} 1 & \text{se lo shingle } s \text{ compare in } D \\ 0 & \text{altrimenti} \end{cases}C(D)[s]={10​se lo shingle s compare in Daltrimenti​

Esempio: se i token sono caratteri e k=2k=2k=2, allora possibili shingle sono tipo:

aa,ab,ac,…,ba,bb,bc,…aa, ab, ac, \dots, ba, bb, bc, \dotsaa,ab,ac,…,ba,bb,bc,…

Per il documento:

D=abcabD = abcabD=abcab

gli shingle di lunghezza 222 sono:

ab,bc,ca,abab, bc, ca, abab,bc,ca,ab

come insieme diventano:

C(D)={ab,bc,ca}C(D)=\{ab,bc,ca\}C(D)={ab,bc,ca}

Quindi nel vettore binario metti 111 nelle posizioni corrispondenti ad ababab, bcbcbc, cacaca, e 000 per tutti gli altri shingle possibili.



#### SIMILARITY FOR SHINGLES
#### WORKING HYPOTESIS
#### MIN HASHING
La matrice al centro **non contiene tutti i possibili documenti**: contiene i documenti che stai confrontando. Le **colonne** sono i documenti, per esempio D1,D2,D3,D4D_1, D_2, D_3, D_4D1​,D2​,D3​,D4​. Le **righe** sono invece i possibili k-shingle dell’universo considerato, cioè tutti gli shingle che possono comparire almeno nei documenti del dataset, o teoricamente nell’universo UUU.

Quindi una cella vale:

Input[r,c]=1Input[r,c] = 1Input[r,c]=1

se il documento DcD_cDc​ contiene lo shingle associato alla riga rrr. Vale invece:

Input[r,c]=0Input[r,c] = 0Input[r,c]=0

se quel documento non contiene quello shingle.
La matrice a sinistra non è proprio “la matrice originale indicata con permutazioni”, ma è un insieme di **permutazioni delle righe**. Ogni colonna π1,π2,π3\pi_1, \pi_2, \pi_3π1​,π2​,π3​ rappresenta un diverso riordinamento possibile delle righe. Per esempio, sotto π1\pi_1π1​, la riga 5 potrebbe essere visitata per prima, la riga 1 per seconda, la riga 2 per terza, ecc.

Poi, per ogni documento e per ogni permutazione, fai questa cosa:

> guardi le righe nell’ordine dato dalla permutazione e trovi la prima riga in cui quel documento ha valore 1.
#### ENCODINGH SETS AS BINARY VECTORS


#### FINDING SIMILAR COLUMNS

#### SHINGLING
5.1.1 Shingling  Facciamo uso della tecnica di Shingling per convertire i documenti in insiemi. Un k-shingle per un documento `e una sequenza di k token che appaiono in un documento. I token possono generalmente essere definiti come: caratteri o parole, si fa uso di Ut per rappresentare l’insieme di tutti i possibili token.  Esempio 4. Si assumano i token come caratteri dell’alfabeto. Sia k = 2  Per i documenti D1 = abcab, D2 = ccadf , gli insiemi di 2-shingle corrispondenti sono  S(D1) = {ab, bc, ca} S(D1) = {cc, ca, ad, df }  Ogni documento D ∈ U pu`o quindi essere rappresentato come l’ insieme dei suoi k-shingle C = S(D). In modo piu` pratico ogni documento `e rappresentato come C = S(D) un vettore binario avente ogni possibile elemento dell’insieme U k. Codificando gli insiemi come vettori binari e` possibile definire l’intersezione come bitwise and e l’unione come bitwise or.E` facile notare che questi vettori sono molto grandi, ma conservano i dati in modo sparso.  `E inoltre facile rappresentare la J. Sim con un’interpretazione probabilistica  J. Sim(C1, C2) = C1 ∩ C2  C1 ∪ C2  = Pr[C1 ∩ C2|C1 ∪ C2].  Concludendo i k-shingle permettono di rappresentare il contenuto dei documenti attraverso degli elementi di un insieme. Questa tecnica permette inoltre di trovare documenti simili anche per testi che appaiono in ordine diverso.  L’insieme di tutti i dati gestiti `e visibile come una matrice M ∈ 0, 1N×m con N numero di documenti e m = |U |k shingles possibili. Si presenta un esempio di seguito  Si passa ora alla tecnica del Min-hashing che permette di rendere i grandi insiemi di k-shingles in piccole firme mantenendo la misura di similarit`
#### MIN HASHING
Si presenta un esempio per mostrare perch ́e il min-hashing `e necessario  Esempio 5. Sia N = 106 il numero di documenti, per cui si hanno 106 k-shingles, e si ottengono (106)2  2 = 5 · 1011 confronti.  La tecnica precedente permette solo una rappresentazione robusta dei documenti, con il min-hashing si cerca un modo per trovare documenti simili tramite delle piccole firme.  La difficolt`a consiste nel definire una buona firma che conservi la similarit`a tra due insiemi. Per cui si cerca una funzione hash, da applicare agli insiemi shingle (colonne della matrice M vista in precedenza). La funzione hash cercata deve avere le seguenti propriet`a  1. h(C) deve essere abbastanza piccolo da poter essere mantenuto in memoria 2. J. Sim(C1, C2) deve essere “vicino” all’equivalenza delle hash. (se J. Sim(C1, C2) e` alto, con alta probabilit`a  h(C1) = h(C2), viceversa se il valore di J. Sim(C1, C2) e` basso, con alta probabilit`a h(C1) ̸= h(C2)).  A livello pratico si “mandano” i documenti in bucket, due documenti simili devono finire nello stesso bucket. Ovviamente la funzione hash cercata deve dipendere in qualche modo dalla misura di distanza, non tutte li funzioni hash funzionano su tutte le misure di distanza.  25
La funzione hash della Jaccard Similarity `e chiamata Min-Hashing. Per ogni documento D (colonna C della matrice caratteristica M ), per una funzione di permutazione π si definisce la funzione Min Hashing(C)π = indice della prima riga nella quale C ha valore 1, chiamato min(π(C)). Per π permutazione qualsiasi.  Un problema da presentare e` quello della generazione di una permutazione π qualsiasi, non `e un compito computazionalmente facile, nella pratica si fa uso di funzioni hash casuali, che permettono di approssimare il comportamento di una permutazione casuale.  Si definisce nel dettaglio un esempio. Sia M la matrice caratteristica del dataset, Π una permutazione scelta casualmente. Sia m il numero di righe (k-shingles) di M . Per una colonna C di M si definisce la funzione MinHash hπ(C) nel seguente modo  hπ(C) = min{i ∈ [m] : Cπ[i] = 1} = min(π(C)).  243 324 717 632 166 571 455  π1 π2 π3  1010 1001 0101 0101 0101 1010 1010  D1 D2 D3 D4  2121 2141 1212 Matrice SIG(π, C)  D1 D2 D3 D4  M inHash  Logica MinHashing: min{π(r) | Input[r, c] = 1} Esempio 1: D1 ha 1 in riga 1 → π1(1) = 2. Firma = 2. Esempio 2: D3 ha 1 in riga 1 → π2(1) = 4. Firma = 4.  1 2 3 4 5 6 7  π1 π2 π3  Figura 3: Processo di generazione della Signature Matrix tramite Minhashing.  Nella in figura 3 il documento D1 ha i valori ‘1’ per gli shingle {1, 2, 3, 4}, applicando le diverse permutazioni si ottiene  π1(D1) = {2, 3, 5, 4} min = 2 π2(D1) = {4, 2, 5, 4} min = 2 π3(D1) = {3, 4, 1, 5} min = 1  Il MinHashing ha una complessit`a spaziale hπ(C) = Θ(log m) con |C| = |U |k = m  26
Si presenta una dimostrazione formale della propriet`a di preservazione della similarit`a del MinHash
#### TEOREMA MIN HASHING PROPERTY 
Teorema 5.1. Siano C1, C2 fissati sia scelta una permutazione Π in modo uniforme allora  Pr[hπ(C1) = hπ(C2)] = J. Sim(C1, C2)  Dimostrazione. Sia X un documento y ∈ X `e uno dei suoi shingle allora Pr[π(y) min π(X)] = 1  |X| poich ́e `e equiprobabile per qualsiasi riga di essere l’indice del minimo Sia y tale che π(y) = min(π(C1 ∩ C2)) π `e uniforme casuale  allora  π(y) = min(π(C1)) se y ∈ C1 π(y) = min(π(C2)) se y ∈ C2  La probabilit`a che entrambi siano veri `e  Pr[min(π(C1)  | {z }  h(C1 )  = min(π(C2))  | {z }  h(C2 )  )] = |C1 ∩ C2|  |C1 ∪ C2|  Ovvero proprio la J. Sim(C1, C2)

#### MIN HASHING SIGNATURES
Da questo teorema si pu`o sfruttare la concentrazione del valore atteso per aumentare la confidenza. Usando MinHash mutualmente indipendenti SIG(C) = ⟨hπ1 (C), hπ2 (C), . . . , hπt (C)⟩ Date queste premesse, si definisce la misura di similarit`a sulle firme descritte  Definizione 5.1.1 (Similarit`a tra firme). Sign-Sim(C1, C2) `e la funzione di similarit`a tra due vettori SIG(C1) e SIG(C2), dei due vettori firma Sign(C1) e Sign(C2) dove  Sign-Sim(C1, C2) = frazione delle firme MinHash in cui coincidono. In modo piu` formale `e possibile definire una variabile aleatoria Z che assume i seguenti valori  Z=  (  1 se min(π(C1)) = min(π(C2)) 0 altrimenti la Sign-Sim(C1, C2) e` equivalente a Pr[Z = 1] dal teorema precedente. Qui di seguito si riporta un esempio di come il MinHashing conservi la similarit`a  Esempio 6. Siano π1, π2, π3 tre permutazioni casuali, e M la matrice in input come nella figura 3  D1 D2 D3 D4 D1 4/4 D2 0/7 3/3  D3 3/4 0/6 3/3 D4 1/7 3/4 0/4 4/4  D1 D2 D3 D4 D1 1.00 D2 0.00 1.00 D3 0.75 0.00 1.00 D4 0.14 0.75 0.00 1.00  Tabella 1: Matrice di Similarit`a di Jaccard tra i documenti  D1 D2 D3 D4 D1 3/3 D2 0/3 3/3  D3 2/3 0/3 3/3 D4 0/3 3/3 0/3 3/3  D1 D2 D3 D4 D1 1.00 D2 0.00 1.00 D3 0.66 0.00 1.00 D4 0.00 1.00 0.00 1.00  Tabella 2: Matrice di Similarit`a di Jaccard tra le firme dei documenti  27 Di seguito `e riportato il codice che calcola la similarit`a tra le firme di due documenti  Algorithm 3: Doc-Pair Check Input: Colonne C1, C2 ∈ {0, 1}h; Parametro di confidenza t for j = 1 to t do  Scegli uniformemente a caso una permutazione πj ∈u Πm Calcola gli hash hπj (C1) e hπj (C2)  return Sign-Sim(C1, C2) = |{j:hπj (C1)=hπj (C2)}|  t  Si nota che J. Sim(C1, C2) ̸= Sign-Sim(C1, C2), ma per il teorema principale del MinHashing J. Sim(C1, C2) = Eπ [Sign-Sim(C1, C2)] si ottiene il corollario:  Corollario 5.1.1. Sign-Sim(C1, C2) −→ J. Sim(C1, C2) per t → ∞.  Inoltre le t funzioni hash sono mutualmente indipendenti, per cui si ha la concentrazione uguale a |Sign-Sim(C1, C2)− J. Sim(C1, C2)|.  Analisi complessit`a spaziale del MinHashing  Si scelgano t = 100 funzioni permutazioni casuali delle m righe, Sig(i, C) e` l’indice della prima riga contenente ‘1’ nella colonna C, permutata con l’i-esima permutazione. Sig(i, C) `e un indice, per cui occupa Θ(log(|C|)) = Θ(log(m)) spazio.  Generazione di permutazioni casuali  `E ora importante notare che le funzioni di MinHash hπ(C) fanno uso di tante permutazioni casuali sull’insieme U k(m = |U |k), generare permutazioni e` un problema computazionalmente impegnativo, per cui le permutazioni vengono sostituite da t funzioni hash casuali h : [m] → [m], la probabilit`a di collisione e` bassa, le collisioni vengono ignorate.  Di seguito l’algoritmo efficiente per il calcolo della matrice delle firme come in figura 3, l’algoritmo fa uso di funzioni hash casuali per risolvere il problema della generazione di permutazioni  Algorithm 4: Calcolo della matrice delle firme Input: Matrice M con m righe e N colonne; t funzioni hash f1, . . . , ft for ogni colonna C = 1 . . . N do  for ogni funzione hash i = 1 . . . t do  SIG(i, C) ← ∞  for ogni riga j = 1 . . . m della matrice originale M do  for ogni colonna C = 1 . . . N do  if M (j, C) = 1 then  for ogni funzione hash i = 1 . . . t do  Calcola l’ i-esima hash della riga j: fi(j) if fi(j) < SIG(i, C) then  Aggiorna SIG(i, C) ← fi(j)  Analisi della complessit`a  L’algoritmo esegue Θ(mN ) iterazioni, ogni iterazione richiede t calcoli hash fi(i) se la condizione M (j, C) `e verificata.  Tutte le tecniche impiegate fin’ora non hanno permesso di superare la barriera nel numero di confronti in T heta(n2) per determinare le coppie di documenti simili, si presenta quindi la seguente tecnica

#### DATA STREAM
In molti ambiti di data mining non tutti i dati sono disponibili interamente in memoria. Il controllo della stream `e importante quando il flusso di dati e` controllato esternamente, come ad esempio query per i motori di ricerca. Si pu`o pensare al dataset come infinito e non stazionario (la distribuzione varia nel tempo). Gli elementi in input entrano in modo veloce: il sistema non pu`o memorizzare l’intero stream S, solo piccoli sketch di possono essere mantenuti e aggiornati.  Un Data Stream `e una sequenza x1, x2, . . . , xm di elementi, si ricevono tali elementi uno per volta, da x1 a xm. Tipicamente m `e troppo grande e non tutti gli elementi nella Stream possono essere memorizzati. Lo scopo degli algoritmi sulle stream `e quello di calcolare delle statistiche utili utilizzando meno memoria possibile, un algoritmo sulle stream `e valutato secondo i seguenti parametri di uno sketch H(S):  1. Memoria utilizzata 2. Ritardo per elemento, ovvero il tempo impiegato per operare quando un nuovo elemento viene ricevuto 3. Probabilit`a di restituire la soluzione corretta o una buona approssimazione 4. Tasso di approssimazione  Gli sketch devono inoltre essere facili da aggiornare per nuovi valori della Stream f (xa) = F (f (x), f (a)). I problemi piu` comuni di Data Stream includono, filtraggio, conteggio di occorrenze, stima dei momenti, individuare i k elementi piu` frequenti.


#### PATTERN MATCHING karp rabin
Si presenta il problema del pattern matching. Sia Σ un alfabeto, data una stringa y = y1y2 . . . yn ∈ Σn, e una Stream S ∈ Σm con n < m, determinare il numero di volte che y appare in S, considerando m e possibilmente anche n molto grandi.  Per risolvere il problema del Pattern Matching `e necessario uno sketch per l’identit`a tra stringhe, tra cui la funzione hash di Rabin  Definizione 5.3.1 (Funzione hash di Rabin). Sia q un numero primo tale che q > |Σ| e z ∈u [0, q) Sia x[1, n] ∈ Σn una stringa di lunghezza n. La funzione hash di Rabin `e definita  Kqz(x) =  n  X  i=1  x[i] · zn−i  !  mod q Ovvero Kqz `e un polinomio in Fq valutato in z con coefficienti i caratteri di x.  Si definisce ora lo sketch di Rabin  Definizione 5.3.2 (Sketch di Rabin). Si definisce il Rabin sketch la coppia  f (x) = (Kqz(x), z|x| mod q) f (x) fa uso di O(log q) bit, facendo uso di q = nO(1) O(log n) bit di spazio.  Lemma 5.3.1 (Concatenazione di caratteri). Kqz(x) e` facile da aggiornare. Si supponga di avere Kqz(x) e un carattere c, `e facile calcolare Kqz(x · c):  Kqz(x · c) = (Kqz(x) · z + c) mod q  La lunghezza di x · c `e |x| + 1 e z|x|+1 mod q = (z|x| mod q) · z mod q.  Lemma 5.3.2 (Concatenazione di stringhe). Si supponga di avere Kqz(x) e una stringa y, `e facile calcolare Kqz(x·y):  Kqz(x · y) = (Kqz(x) · z|y| + Kqz(y)) mod q  La lunghezza di x · y `e |x| + |y| e z|x|+|y| mod q = (z|x| mod q) · (z|y| mod q).  32 Inoltre un’altra propriet`a dello sketch: se x ̸= y allora Kqz(x) ̸= Kqz(y) con alta probabilit`a.  Lemma 5.3.3. Siano x, y due stringhe tali che x ̸= y con max(|x|, |y|) = n allora  Pr[Kqz(x) = Kqz(y)] ≤ n  q  Dimostrazione.  Pr[Kqz(x) = Kqz(y)] = Pr[Kqz(x) − Kqz(y)  | {z }  ≡q 0]  Kqz(x) − Kqz(y) `e a sua volta un polinomio in Fq, sia x − y la stringa tale che (x − y)[i] = x[i] − y[i] mod q (si aggiungano dei leading zeros alla stringa piu` corta).  `E facile notare che Kqz(x) − Kqz(y) mod q = Kqz(x − y) per x ̸= y, Kqz(x − y) `e un polinomio di grado ≤ n su Fq, per cui le radici sono al massimo n, gli elementi di Fq sono q, quindi si ottiene la probabilit`a di prendere una radice e` ≤ n  q.  Nel seguente codice si mostra la costruzione del polinomio per una data stringa x = x1, . . . , xn  Algorithm 5: Algoritmo di KarpRabin Input: q numero primo; z ∈u Fq; x =< x0, x1, . . . , xn−1 >∈ [s]n stringa  Kqz(ε) = 0  for j = 1 to n do  (Kqz(< x0, x1, . . . , xj−1 >)z + xj) mod q  L’algoritmo con input (q, z, x) richiede spazio O(log q), mentre il procedimento per la costruzione del polinomio di x e y concatenate richiede spazio O(log q + log(|y|) log q).  Corollario 5.3.1 (probabilit`a di errore). Sia q un primo, tale che nc+1 ≤ q ≤ 2nc+1 per qualche c > 0 allora per ogni x ̸= y,  Pr [Kqz(x) = Kqz(y) mod q] ≤ 1  nc  La dimensione dello sketch `e O(log n) contro O(n) iniziale.  Ritornando al problema del pattern matching, si ricorda il problema: data una stringa y contare quante volte appare nel Data Stream con alfabeto Σ = [s], la Stream e` una stringa x < x1, x2, . . . , xm >∈ Σm e y =< y1, y2, . . . , xm >∈ Σn.  Si suppone di aver letto i caratteri dalla Stream < x1, x2, . . . , xi > con i ≥ n, quindi sono stati gi`a calcolati gli sketch Kqz(< xn−i+1, . . . , xi >) e Kqz(y), se i due valori sono identici si aggiorna la variabile che conta il numero di occorrenze. Quando un nuovo elemento della Stream viene ricevuto xi+1 si calcola il nuovo sketch  Kqz(< xi−n+2, . . . , xi+1 >) = (Kzq(< xi−n+1, . . . , xi >) − xi−n+1 · zn−1)z + xi+1) mod q  in modo piu` pratico, viene tolto l’elemento meno recente xi−n+1 e viene inserito il nuovo elemento xi+1.  Si procede ripetendo con i aumentato di 1.  Analisi delle prestazioni  Lemma 5.3.4 (Complessit`a spaziale). Per una Stream lunga m, un pattern lungo n lo spazio occupato dall’algoritmo `e Θ(n), `e facile da verificare vedendo che e` necessario mantenere gli ultimi n elementi della Stream per toglierli al momento giusto.  Lemma 5.3.5 (Complessit`a temporale). Il numero di operazioni per elemento `e O(1), aggiornare lo sketch richiede un numero costante di operazioni, `e sufficiente pre-calcolare zn−1 mod q.  Un migliore algoritmo `e quello di Porat-Porat che occupa O(log n) spazio.




