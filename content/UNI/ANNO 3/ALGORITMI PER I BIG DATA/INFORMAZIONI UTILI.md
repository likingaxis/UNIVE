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
##### DEFINIZIONE
Una funzione hash `e una funzione h : U → [0, n), informalmente h `e utilizzata per “randomizzare” i dati:  1. h(x) dovrebbe essere piu` casuale possibile. Idealmente dovrebbe mappare in modo pi`u uniforme possibile 2. h(x) dovrebbe essere veloce da calcolare. Idealmente proporzionale al tempo di accesso a x 3. h dovrebbe occupare poco spazio in memoria. Idealmente O(1) parole di memoria
###### FAMIGLIA DI FUNZIONI HASH
Una famiglia di funzioni hash H e` un sottoinsieme di funzioni h : U → [0, n), nell’inieme di tutte le funzioni hash H ⊆ [0, n)U .
###### FUNZIONE HASH UNIFORME
Una funzione hash h da un universo U = {x0, . . . , xu} (u = |U |) . H `e detta uniforme se per ogni y1, . . . , yu ∈ [0, n) si ha che  Pr [h(x1), . . . , h(hu) = y1, . . . , yu] = 1  nu
se ho `u` elementi e `n` slot, ogni elemento ha probabilità `1/n` di finire in uno slot specifico.  
###### FAMIGLIA H K-INDIPENDENTE
se e solo se per una scelta uniforme di h ∈ H si ha  1. Per ogni x ∈ U , h(x) `e una variabile aleatoria uniforme in [0, n) 2. Le variabili aleatorie h(1), h(2), . . . , h(u) sono k-indipendenti o in modo equivalente  Pr  "k \  i=1  h(xi) = yi  #  =1  nk  per ogni scelta di x1, . . . , xk ∈ [1, u] y1, . . . , yk ∈ [0, n). O anche la k-tupla (h(x1), . . . , h(xk)) e` uniforme in [0, n)k. Per k = n la famiglia di funzioni hash `e detta completamente uniforme.
significa che tutte le possibili combinazioni di valori hanno la stessa probabilità.
- `1`-indipendenza: ogni `h(x)` è uniforme
- `2`-indipendenza: ogni coppia `h(x_1), h(x_2)` è indipendente
- `k`-indipendenza: ogni gruppo di `k` valori è indipendente
- completa casualità: tutti gli elementi dell'universo sono indipendenti
#### HASHING UNIVERSALE
Una famiglia di funzioni hash H e` detta universale se scegliendo h ∈u H h : U → [0, n) dati ∀x1 ̸= x2 ∈ U  Pr[h(x1) = h(x2)] ≤ 1  n  in pratica la probabilit`a di collisione di due elementi di U . Si nota che questa probabilit`a `e quella che ci si aspetta per una funzione hash che dia un risultato veramente totalmente casuale

###### 2-indipendenza implica universalità
Pr[h(x1) = h(x2)] =  X  y∈U  Pr[h(x1) = h(x2) ∧ h(x2) = y] =  X  y∈U  Pr[h(x1) = y ∧ h(x2) = y] =  X  y∈U  1  n2 = 1  n

la sommatoria è con y che appartiene a $[0,n)$
In breve: la 2-indipendenza è più forte dell’universalità. La 2-indipendenza dice che due valori hash si comportano come due scelte casuali indipendenti; l’universalità richiede solo che la probabilità di collisione sia al massimo `1/n`.
###### EXPECTATION di una famiglia universale
Sia H una famiglia di funzioni hash universali, S ⊆ U un insieme di k elementi. Sia u ∈ S. Si sceglie in modo uniforme una funzione h da H, e sia X la variabile aleatoria che conta il numero di elementi di S mappati nello stesso elemento h(u) allora  E[X] ≤ 1 + k  n.  Dimostrazione. Sia u fissato, per ogni s ∈ S, si definisce la variabile aleatoria Xs associata  Xs =  (  1 se h(s) = h(u) 0 altrimenti X =  X  s∈S  Xs  Per cui si ha  E[X] =  X  s∈S  E[Xs] =  X  s∈S  Pr[h(s) = h(u)] =1+  X  s∈S−{u}  Pr[h(s) = h(u)]  (Per universalit`a) ≤ 1 + k  n.  Nota: per k = Θ(n) si ha O(1) tempo per operazione.
Separiamo il caso `s=u`. Poiché `h(u)=h(u)` è sempre vero:

$$
Pr[h(u)=h(u)] = 1
$$
#### FAMIGLIE HASH UNIVERSALI ESEMPI
##### ESEMPIO 1
Si sceglie un numero primo m > n, `e noto che esiste m tale che ∀n n ≤ m ≤ 2n, successivamente si identifica ogni elemento x ∈ U come un intero in base m, di r cifre x = (x1, x2, . . . , xr). Per una a = (a1, a2, . . . , an) ∈ U, ai ∈ [m] fissata si definisce  ha(x) =  "r X  i=1  aixi  #  mod m (4) Per cui si definisce la famiglia di funzioni hash universale H ̄  H ̄ = {ha : a ∈ U }  Per |U | = n, r deve essere logm(n) poich ́e mr ≥ n. Ne risulta che per scegliere una funzione hash in modo uniforme  h ∈u H ̄ `e sufficiente scegliere a ∈u U .
$r$ rappresenta il numero di cifre necessarie per rappresentare un elemento $x$ dell'universo $U$ quando viene scritto in base $m$
###### UNIVERSALITÀ DI $\bar H$ 
Dimostrazione. Sia x = (x1, x2 . . . , xr) e y = (y1, y2 . . . , yr) ∈ U tale che x ̸= y.  Si deve dimostrare Pr[h(x) = h(y)] ≤ 1  n (universalit`a). Poich ́e x ̸= y esiste y t.c. xj ̸= yj. ha(x) = ha(y) se e  solo se  aj (yj − xj )  | {z }  z  =  X  i̸=j  ai(xi − yi)  | {z }  α  mod m  

Una collisione avviene quando il calcolo per $x$ dà lo stesso risultato del calcolo per $y$:

$$\sum_{i=1}^r a_i x_i = \sum_{i=1}^r a_i y_i \pmod m$$
2. Isolare l'indice $j$

Vogliamo separare la componente $j$ (quella dove sappiamo che $x_j \neq y_j$) da tutto il resto della sommatoria:

$$a_j x_j + \sum_{i \neq j} a_i x_i = a_j y_j + \sum_{i \neq j} a_i y_i \pmod m$$
Si assume a ∈u U , quindi si assume ai fissato ∀i ̸= j. Per m primo Zm `e un campo, per cui, per z ̸= 0 esiste un’unica inversa moltiplicativa z−1 tale che z · z−1 = 1 mod m  aj · z · z−1 = α · z−1 mod m  aj = α · z−1 mod m (soluzione unica)  Pr[aj ≡m αz−1] ≤ 1  m
$\mathbb{Z}_m$ rappresenta l'insieme dei resti della divisione intera per $m$, ovvero l'insieme $\{0, 1, 2, \dots, m-1\}$.
In matematica "normale" (quella dei numeri reali), se hai l'equazione $5x = 10$, per trovare $x$ dividi per $5$. Dividere per $5$ è lo stesso che moltiplicare per $1/5$. Quel $1/5$ è l'inversa di $5$.Nel mondo del calcolo modulare (quello con il $\pmod m$), non esiste la divisione classica. Per "eliminare" un numero, devi usare la sua inversa moltiplicativa ($z^{-1}$).Definizione: L'inversa di $z$ è quel numero che, moltiplicato per $z$, dà come risultato 1 nel mondo modulare ($z \cdot z^{-1} \equiv 1 \pmod m$).Condizione: Questa inversa esiste ed è unica solo se $m$ è un numero primo (motivo per cui si sceglie $m$ primo nell'esempio).
Serve perché, se `m` è primo, `Z_m` è un campo.
Un campo è un insieme in cui puoi eseguire le quattro operazioni fondamentali (addizione, sottrazione, moltiplicazione e divisione) con le stesse regole a cui sei abituato per i numeri reali.

Perché **$\mathbb{Z}_m$** sia un campo, deve garantire che per ogni elemento diverso da zero esista un modo per "dividere", ovvero deve esistere l'**inversa moltiplicativa**.
Questo significa che ogni elemento non nullo ha inverso moltiplicativo modulo `m`.
Senza `m` primo, questo inverso potrebbe non esistere, quindi la dimostrazione non funzionerebbe.
##### ESEMPIO 2
Si mostra ora una famiglia di funzioni hash 2-indipendenti sia p ≥ n un numero primo, siano a, b ∈ Zp definite come nell’esempio precedente, si definisce la funzione hash ha,b  ha,b(x) = [ax + b mod p] mod m  in pratica la funzione hash `e definita come un polinomio scelto uniformemente in Zp di grado 1. Si definisce la famiglia Hˆ  Hˆ = {ha,b | a, b ∈ Zp}
###### 2 indipendenza e universalità
dimostrazione per assurdo
Sia X = (ax + b) mod p e Y = (ay + b) mod p per x ̸= y. Poich ́e a ̸= 0 e p > n allora X ̸= Y .
ha,b(x) = ha,b(y) ⇐⇒ X = Y mod m  1. X e Y sono distribuite in modo uniforme su Zp, poiche ́ a, b sono, a loro volta, distribuite in modo uniforme e  h `e lineare iniettiva. Dimostrazione.  ax + b ≡p ay + b ⇐⇒ a(x − y) ≡p 0 (5)  =⇒ (x − y) ≡p 0 ⇐⇒ x = y (6) Il passaggio (6) `e giustificato poich ́e x, y < p − 1
testo specifica che $x, y < p - 1$. Questo è fondamentale perché:Se sia $x$ che $y$ sono numeri piccoli (minori del modulo $p$), la loro differenza $(x - y)$ è anch'essa "piccola".L'unico multiplo di $p$ che può stare in quell'intervallo ristretto è lo zero.Quindi, se l'unico modo per avere $(x - y) \equiv_p 0$ è che la differenza sia esattamente $0$, allora deve essere per forza $x = y$.
otteniamo un assurdo perchè avevamo detto che erano diversi x e y
X e Y sono quasi indipendenti tra loro, Pr[X = i ∧ Y = j] = 1  (p−1)p
Dimostrazione. 
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
(  ax + b ≡p i ay + b ≡p j (7)  Esiste un unica soluzione per (a, b) ∈ Zp2, poich ́e il rango `e 2. Siano f, g soluzioni uniche del sistema lineare  Pr [(ax + b) ≡p i ∧ (ay + b) ≡p j] = P r[a = f (x, y, i, j) ∧ b = g(x, y, i, j)]  = Pr[a = f (x, y, i, j)] · Pr[b = g(x, y, i, j)] Per cui  Pr [Y = j | X = i] = Pr[X = i ∧ Y = j]  Pr[X = i] =1  p−1
Per una i fissata in Zp ci sono al massimo p  m − 1 ≤ (p−1)  m valori per Y tale che Y = i mod m, ovvero tutti gli  interi ∈ Zp per cui la distanza da i e` un multiplo di m. Da 2 Pr[Y = j | X = i] = 1  p−1 per l’union bound si ottiene  Pr[Y = i mod m | X = i] ≤ p−1  m  1  p−1 = 1  m . Hˆ `e universale.
Quindi per ogni coppia compatibile `(i,j)` esiste una sola coppia `(a,b)`.
Dato che:
- `a` ha `p-1` scelte possibili, perché `a \in Z_p^*`
- `b` ha `p` scelte possibili
il numero totale di coppie `(a,b)` è:
$$
(p-1)p
$$
Quindi:
Dato che abbiamo dimostrato che esiste **una sola** coppia specifica $(a, b)$ in grado di soddisfare il sistema per certi $i$ e $j$, la probabilità di "beccare" proprio quella coppia è:
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

#### PERFECT RANDOMIZED HASHING
Parliamo ora di funzioni hash perfette ovvero una funzione hash senza collisioni  Definizione 4.3.1 (funzione hash perfetta). Una funzione hash h : [1, n] → [0, M ] `e detta perfetta su un insieme A ⊆ [1, n] se e solo se per ogni x1 ̸= x2 ∈ A si ha h(x1) ̸= h(x2), quindi `e iniettiva su A. In generale cerchiamo una funzione che abbia tale propriet`a con alta probabilit`a.
Se una famiglia H di funzioni h : [1, n] → [0, M ) `e universale e M ≥ nc+2 per una costante c arbitrariamente grande allora h ∈u H `e perfetta su ogni insieme A ≤ [1, n] con alta probabilit`a.
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
#### PROBLEMA DEL DIZIONARIO
##### DEFINIZIONE
Il dizionario `e un tipo di dati, dato un universo U di elementi possibili, mantiene un sottoinsieme arbitrario S ⊆ U tale che operazioni come intersezione, unione, e ricerca in S siano efficienti, queste operazioni sono rappresentate come:  • create() inizializza un dizionario vuoto • insert(u) aggiunge un elemento u ∈ U a S • delete(u) rimuove un elemento u da S • lookup(u) risponde alla domanda s ∈ S? La sfida principale riguarda la grandezza dell’universo U che pu`o essere estremamente grande, per cui definire un array di dimensione |U | non `e ragionevole, si cerca una soluzione proporzionale al sottoinsieme n := |S|. Una soluzione deterministica `e implementata con gli alberi AVL con O(n) spazio e O(log n) tempo per operazione.  Si presenta una soluzione probabilistica con O(n) spazio e O(1) tempo atteso per operazione, a tale scopo si presenta il concetto di tabelle hash.
###### TABELLE HASH CON O SENZA LISTA DI TRABOCCO
Viene creato un array H di grandezza m ≈ n, quindi H = [m]. Si ha una collisione quando h(u) = h(v) per u ̸= v, mediamente per il paradosso del compleanno una collisione `e attesa ogni √n inserimenti.  Per ogni posizione i dell’array H[i] contiene delle linked list che contengono tutti gli elementi che collidono, solitamente chiamate liste di trabocco.
Le operazioni sono implementate come segue, viene calcolato il valore di h(u), successivamente l’operazione viene eseguita scandendo H(h(u)). `E quindi necessario utilizzare una funzione hash h che distribuisca gli elementi di S in modo uniforme
E possibile utilizzare la tecnica dell’ hashing deterministico, in cui ogni elemento u ∈ U e` rappresentato come intero, scegliendo un primo p, tale che m ≤ p ≤ 2m allora h `e definito come  h(u) = u mod p  funziona bene per applicazioni statiche in cui S non varia.
Per applicazioni in cui S varia si fa uso delle funzioni hash universali, di cui sono state precedentemente descritte le propriet`a ed esempi. Si ricordando le variabili n rappresentate il numero di elementi di S, N = |U |, m numero primo compreso N ≤ m ≤ 2N . Si fa uso della tecnica di doubling-halving
// In caso di espansione if n > N then  N ← 2N  scegli un nuovo numero primo m tale che m ∼ Θ(n) re-hash di tutti gli elementi in O(n)  // In caso di contrazione if n < N/4 then  N ← N/2  scegli un nuovo numero primo m tale c

#### DESCRIZIONE DEL PROBLEMA
#### JACCARD SIMILARITY
#### 3 ESSENTIAL
#### SHINGLING
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
#### MIN HASHING
#### TEOREMA MIN HASHING PROPERTY 
#### MIN HASHING SIGNATURES
