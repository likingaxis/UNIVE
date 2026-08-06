
## 1. Verifying Polynomial Identities

### Problema

Dati due polinomi $P(x)$ e $Q(x)$, vogliamo verificare se:

$P(x)=Q(x)$

per ogni valore di $x$, senza confrontare esplicitamente tutti i coefficienti.

Definiamo:

$H(x)=P(x)-Q(x)$

Allora:

$P(x)=Q(x) \iff H(x)=0$

cioè $P$ e $Q$ sono identici se e solo se $H$ è il polinomio nullo.

### Idea randomizzata

Invece di controllare tutto il polinomio, scegliamo un valore casuale $r$ e verifichiamo se:

$P(r)=Q(r)$

equivalentemente:

$H(r)=0$

Ci sono due casi:

1. Se $P(r)\neq Q(r)$, allora siamo sicuri che $P$ e $Q$ sono diversi.
2. Se $P(r)=Q(r)$, allora probabilmente sono uguali, ma potrebbe esserci un falso positivo.

Il falso positivo si verifica quando:

$H(x)\neq 0$

ma per il valore casuale scelto vale comunque:

$H(r)=0$

### Proprietà fondamentale

Se $H(x)$ è un polinomio non nullo di grado al massimo $d$, allora $H$ può avere al massimo $d$ radici.

Quindi, se scegliamo $r$ uniformemente a caso da un insieme $S$, vale:

$\Pr[H(r)=0]\leq \frac{d}{|S|}$

Se scegliamo:

$S=\{0,1,\dots,100d-1\}$

allora:

$|S|=100d$

e quindi:

$\Pr[\text{falso positivo}] = \Pr[H(r)=0 \mid H\neq 0] \leq \frac{d}{100d} = \frac{1}{100}$

### Pseudocodice

```text
Input: due polinomi P e Q di grado al massimo d

1. Scegli r uniformemente a caso in {0, ..., 100d - 1}
2. Calcola P(r)
3. Calcola Q(r)
4. Se P(r) != Q(r):
       return "diversi"
   Altrimenti:
       return "uguali con alta probabilità"
```

### Riduzione della probabilità di errore

Ripetendo il test $t$ volte in modo indipendente, la probabilità di falso positivo diventa:

$\left(\frac{1}{100}\right)^t$

Quindi l’errore diminuisce esponenzialmente nel numero di ripetizioni.

### Costo

Se i polinomi hanno grado $d$, il costo per valutare $P(r)$ e $Q(r)$ è:

$O(d)$

Lo spazio usato è:

$O(1)$

se si leggono i coefficienti in input senza memorizzare strutture aggiuntive.

---

## 2. Verifying Matrix Multiplication

### Problema

Date tre matrici quadrate $A,B,C \in \mathbb{R}^{n\times n}$, vogliamo verificare se:

$AB=C$

Calcolare direttamente $AB$ costa:

$O(n^3)$

L’idea è usare un algoritmo randomizzato che verifica l’uguaglianza in tempo:

$O(n^2)$

### Idea

Scegliamo un vettore casuale:

$r \in \{0,1\}^n$

uniformemente a caso.

Invece di controllare direttamente:

$AB=C$

controlliamo se:

$ABr=Cr$

Per evitare di calcolare prima $AB$, eseguiamo:

$A(Br)$

oppure, a seconda della convenzione usata nelle slide, si può verificare:

$B(Ar)=Cr$

L’importante è mantenere coerente l’ordine della moltiplicazione con la forma che si vuole verificare.

Per $AB=C$, la forma standard è:

$A(Br)=Cr$

### Correttezza

Definiamo:

$D=AB-C$

Vogliamo verificare se:

$D=0$

L’algoritmo controlla se:

$Dr=0$

Se $AB=C$, allora $D=0$, quindi:

$Dr=0$

per ogni vettore $r$. In questo caso l’algoritmo non sbaglia mai.

Se invece $AB\neq C$, allora:

$D\neq 0$

e può comunque accadere che:

$Dr=0$

per il vettore casuale scelto. Questo è il caso di falso positivo.

Si può dimostrare che, se $D\neq 0$, allora:

$\Pr[Dr=0]\leq \frac{1}{2}$

Quindi:

$\Pr[\text{errore}]\leq \frac{1}{2}$

### Pseudocodice

```text
Input: matrici A, B, C di dimensione n x n

1. Scegli r uniformemente a caso in {0,1}^n
2. Calcola v = B r
3. Calcola w = A v
4. Calcola z = C r
5. Se w == z:
       return "AB = C con alta probabilità"
   Altrimenti:
       return "AB != C"
```

### Ripetizione

Ripetendo l’algoritmo $k$ volte indipendentemente, la probabilità di errore diventa:

$\left(\frac{1}{2}\right)^k$

### Costo

Ogni moltiplicazione matrice-vettore costa:

$O(n^2)$

L’algoritmo esegue tre moltiplicazioni matrice-vettore, quindi il costo resta:

$O(n^2)$

Lo spazio aggiuntivo è:

$O(n)$

per mantenere i vettori intermedi.

---

## 3. Quick Sort Randomizzato

### Problema

Data una lista di $n$ elementi, vogliamo restituire la lista ordinata.

### Idea

L’algoritmo sceglie un pivot uniformemente a caso tra gli elementi della lista.

Poi divide gli elementi in due sotto-liste:

* $L_x$: elementi minori del pivot;
* $R_x$: elementi maggiori del pivot.

Successivamente ordina ricorsivamente le due liste.

### Pseudocodice

```text
RandomizedQuickSort(S):

1. Se |S| <= 1:
       return S

2. Scegli un pivot x uniformemente a caso da S

3. L = elementi di S minori di x
4. R = elementi di S maggiori di x

5. return RandomizedQuickSort(L) + [x] + RandomizedQuickSort(R)
```

### Analisi del numero atteso di confronti

Assumiamo che gli elementi siano distinti e già ordinati concettualmente come:

$x_1 < x_2 < \dots < x_n$

Definiamo la variabile aleatoria:

$X_{ij}= \begin{cases} 1 & \text{se } x_i \text{ e } x_j \text{ vengono confrontati} \\ 0 & \text{altrimenti} \end{cases}$

Il numero totale di confronti è:

$X=\sum_{i=1}^{n}\sum_{j=i+1}^{n}X_{ij}$

Per linearità dell’aspettazione:

$\mathbb{E}[X] = \sum_{i=1}^{n}\sum_{j=i+1}^{n} \mathbb{E}[X_{ij}]$

Poiché $X_{ij}$ è una variabile indicatrice:

$\mathbb{E}[X_{ij}] = \Pr[X_{ij}=1]$

Gli elementi $x_i$ e $x_j$ vengono confrontati se il primo pivot scelto nell’intervallo:

$\{x_i,x_{i+1},\dots,x_j\}$

è proprio $x_i$ oppure $x_j$.

L’intervallo contiene:

$j-i+1$

elementi. Quindi:

$\Pr[X_{ij}=1] = \frac{2}{j-i+1}$

Pertanto:

$\mathbb{E}[X] = \sum_{i=1}^{n}\sum_{j=i+1}^{n} \frac{2}{j-i+1}$

Ponendo:

$k=j-i+1$

si ottiene una somma armonica:

$\mathbb{E}[X] = O(n\log n)$

Quindi Quick Sort randomizzato esegue in media:

$O(n\log n)$

confronti.

---

## 4. Min Cut Algorithm — Algoritmo di Karger

### Problema

Dato un grafo non orientato:

$G=(V,E)$

vogliamo trovare un insieme di archi $C\subseteq E$ tale che rimuovendo $C$ il grafo diventi disconnesso.

Formalmente, $C$ è un cut se:

$G=(V,E\setminus C)$

è disconnesso.

Il problema del min cut consiste nel trovare un cut di cardinalità minima.

### Idea dell’algoritmo

L’algoritmo di Karger è randomizzato.

Finché il grafo ha più di due vertici:

1. sceglie un arco uniformemente a caso;
2. contrae quell’arco;
3. elimina eventuali self-loop.

Dopo $n-2$ contrazioni, rimangono due super-nodi. Gli archi tra questi due super-nodi formano un cut.

### Pseudocodice

```text
Input: grafo G=(V,E)

1. Finché |V| > 2:
       scegli un arco e ∈ E uniformemente a caso
       contrai e
       elimina i self-loop

2. Restituisci gli archi tra i due super-nodi rimasti
```

### Analisi della probabilità di successo

Sia $C$ un min cut fissato, con:

$|C|=k$

L’algoritmo restituisce proprio questo min cut se durante le contrazioni non sceglie mai un arco appartenente a $C$.

Alla prima iterazione, la probabilità di scegliere un arco di $C$ è:

$\frac{k}{m}$

dove $m=|E|$.

Quindi la probabilità di non scegliere un arco di $C$ è:

$1-\frac{k}{m}$

Poiché $C$ è un min cut di dimensione $k$, ogni vertice ha grado almeno $k$. Infatti, se un vertice avesse grado minore di $k$, isolandolo otterremmo un cut più piccolo.

Quindi la somma dei gradi è almeno:

$kn$

Poiché:

$\sum_{v\in V}\deg(v)=2m$

otteniamo:

$2m\geq kn$

e quindi:

$m\geq \frac{kn}{2}$

Allora:

$1-\frac{k}{m} \geq 1-\frac{k}{kn/2} = 1-\frac{2}{n} = \frac{n-2}{n}$

Alla $i$-esima iterazione, se finora non abbiamo contratto archi del min cut, il grafo ha:

$n-i+1$

vertici. Con lo stesso ragionamento:

$\Pr[E_i \mid F_{i-1}] \geq 1-\frac{2}{n-i+1} = \frac{n-i-1}{n-i+1}$

dove:

* $E_i$ è l’evento “alla $i$-esima iterazione non scelgo un arco di $C$”;
* $F_i$ è l’evento “nelle prime $i$ iterazioni non ho mai scelto archi di $C$”.

La probabilità di successo è:

$\Pr[F_{n-2}] = \prod_{i=1}^{n-2} \Pr[E_i \mid F_{i-1}]$

e si ottiene:

$\Pr[\text{successo}] \geq \frac{2}{n(n-1)}$

Quindi la probabilità di trovare un min cut specifico è almeno:

$\frac{2}{n(n-1)}$

### Amplificazione

Ripetendo l’algoritmo molte volte indipendentemente e prendendo il cut più piccolo trovato, la probabilità di successo aumenta.

### Costo

Una singola esecuzione può essere implementata in:

$O(n^2)$

Lo spazio richiesto è:

$O(n+m)$

---

## 5. Contention Resolution

### Problema

Abbiamo:

* $n$ processi;
* una risorsa condivisa;
* se due o più processi accedono nello stesso istante, avviene una collisione;
* ogni processo, a ogni istante $t$, tenta di accedere con probabilità:

$\frac{1}{n}$

Vogliamo stimare quanto tempo serve affinché tutti i processi riescano ad accedere almeno una volta senza collisione.

### Variabile aleatoria

Definiamo:

$S_{i,t}= \begin{cases} 1 & \text{se il processo } i \text{ accede con successo all’istante } t \\ 0 & \text{altrimenti} \end{cases}$

Il processo $i$ accede con successo se:

1. $i$ decide di accedere;
2. tutti gli altri $n-1$ processi non accedono.

Quindi:

$\Pr[S_{i,t}=1] = \frac{1}{n} \left(1-\frac{1}{n}\right)^{n-1}$

Per $n$ grande:

$\left(1-\frac{1}{n}\right)^{n-1} \approx \frac{1}{e}$

quindi:

$\Pr[S_{i,t}=1] \approx \frac{1}{en}$

### Probabilità di fallimento per un processo

La probabilità che il processo $i$ non acceda con successo in un certo istante è circa:

$1-\frac{1}{en}$

Dopo $t$ istanti, la probabilità che il processo $i$ non abbia mai avuto successo è:

$\Pr[F_{i,t}] = \left(1-\frac{1}{en}\right)^t$

### Union Bound

Vogliamo la probabilità che esista almeno un processo che non abbia ancora avuto successo.

Usiamo l’union bound:

$\Pr\left[\bigcup_{i=1}^{n}F_{i,t}\right] \leq \sum_{i=1}^{n}\Pr[F_{i,t}]$

Quindi:

$\Pr\left[\bigcup_{i=1}^{n}F_{i,t}\right] \leq n\left(1-\frac{1}{en}\right)^t$

Usando l’approssimazione:

$1-x \leq e^{-x}$

otteniamo:

$n\left(1-\frac{1}{en}\right)^t \leq n e^{-t/(en)}$

Per rendere questa probabilità piccola, serve scegliere $t$ dell’ordine di:

$t = O(n\log n)$

---

## 6. Load Balancing

### Problema

Abbiamo:

* $n$ processori o macchine;
* $m$ processi o job;
* ogni job viene assegnato uniformemente a caso a una macchina.

Vogliamo capire quanto può diventare grande il carico massimo di una macchina.

Il carico medio è:

$\frac{m}{n}$

Nel caso spesso analizzato:

$m=n$

quindi il carico medio è:

$1$

### Pseudocodice

```text
Input: n macchine, m job

1. Inizializza load[j] = 0 per ogni macchina j
2. Per ogni job i = 1,...,m:
       scegli una macchina j uniformemente a caso in {1,...,n}
       load[j] = load[j] + 1

3. Restituisci max_j load[j]
```

### Analisi

Definiamo:

$Y_{i,j}= \begin{cases} 1 & \text{se il job } i \text{ viene assegnato alla macchina } j \\ 0 & \text{altrimenti} \end{cases}$

Per ogni job $i$ e macchina $j$:

$\Pr[Y_{i,j}=1]=\frac{1}{n}$

Il carico della macchina $j$ è:

$X_j=\sum_{i=1}^{m}Y_{i,j}$

Quindi:

$\mathbb{E}[X_j] = \sum_{i=1}^{m}\mathbb{E}[Y_{i,j}] = \sum_{i=1}^{m}\frac{1}{n} = \frac{m}{n}$

Nel caso $m=n$:

$\mathbb{E}[X_j]=1$

### Uso del Chernoff Bound

Vogliamo stimare:

$\Pr[X_j>c]$

cioè la probabilità che una macchina riceva più di $c$ job.

Usiamo il Chernoff bound:

$\Pr[X>(1+\delta)\mu] < \left( \frac{e^\delta}{(1+\delta)^{1+\delta}} \right)^\mu$

dove:

$\mu=\mathbb{E}[X]$

Nel nostro caso:

$\mu=1$

e poniamo:

$c=(1+\delta)\mu$

quindi:

$c=1+\delta$

Il bound diventa:

$\Pr[X_j>c] \leq \frac{e^{c-1}}{c^c}$

Spesso si semplifica ulteriormente, ottenendo un bound del tipo:

$\Pr[X_j>c] \leq \left(\frac{e}{c}\right)^c$

### Scelta di $c$

Si introduce una funzione $\gamma(n)$ tale che:

$\gamma(n)^{\gamma(n)}=n$

Questa funzione cresce circa come:

$\gamma(n)\approx \frac{\log n}{\log\log n}$

Ponendo:

$c=e\gamma(n)$

si ottiene:

$\Pr[X_j>c]\leq \frac{1}{n^2}$

### Union Bound su tutte le macchine

La probabilità che esista almeno una macchina con più di $c$ job è:

$\Pr[\exists j : X_j>c] \leq \sum_{j=1}^{n}\Pr[X_j>c]$

Poiché ogni macchina ha probabilità al massimo:

$\frac{1}{n^2}$

otteniamo:

$\Pr[\exists j : X_j>c] \leq n\cdot \frac{1}{n^2} = \frac{1}{n}$

Quindi con probabilità almeno:

$1-\frac{1}{n}$

nessuna macchina riceve più di:

$O\left(\frac{\log n}{\log\log n}\right)$

job.

---

## 7. Randomized Median Algorithm

### Problema

Data una lista non ordinata $S$ di $n$ elementi, vogliamo trovare la mediana senza ordinare tutta la lista.

La mediana è l’elemento di rango:

$\left\lceil \frac{n}{2}\right\rceil$

### Idea

Invece di ordinare tutto $S$, scegliamo un campione casuale $R$ di dimensione:

$|R|=n^{3/4}$

Ordiniamo solo il campione e usiamo due elementi del campione per delimitare una regione in cui, con alta probabilità, si trova la vera mediana.

### Algoritmo

1. Scegli un sottoinsieme $R$ di $n^{3/4}$ elementi uniformemente a caso da $S$.
2. Ordina $R$.
3. Scegli due elementi:

$d = R\left[n^{3/4}/2-\sqrt{n}\right]$

$u = R\left[n^{3/4}/2+\sqrt{n}\right]$

L’idea è che $d$ stia poco sotto la mediana e $u$ poco sopra.

4. Calcola:

$l_d = |\{x\in S : x<d\}|$

$l_u = |\{x\in S : x>u\}|$

5. Se:

$l_d>\frac{n}{2}$

oppure:

$l_u>\frac{n}{2}$

allora l’algoritmo fallisce.

6. Costruisci:

$C=\{x\in S : d\leq x\leq u\}$

7. Se:

$|C|>4n^{3/4}$

allora l’algoritmo fallisce.

8. Ordina $C$.

9. Restituisci l’elemento di $C$ in posizione:

$\frac{n}{2}-l_d+1$

### Pseudocodice

```text
Input: insieme S di n elementi

1. Scegli R ⊆ S con |R| = n^(3/4)
2. Ordina R

3. d = elemento di R in posizione n^(3/4)/2 - sqrt(n)
4. u = elemento di R in posizione n^(3/4)/2 + sqrt(n)

5. Calcola l_d = numero di elementi di S minori di d
6. Calcola l_u = numero di elementi di S maggiori di u

7. Se l_d > n/2 oppure l_u > n/2:
       FAIL

8. C = {x ∈ S : d <= x <= u}

9. Se |C| > 4n^(3/4):
       FAIL

10. Ordina C

11. Restituisci l’elemento in posizione n/2 - l_d + 1
```

### Analisi

Definiamo:

$Y_1 = \text{numero di elementi del campione } R \text{ minori della mediana}$

$Y_2 = \text{numero di elementi del campione } R \text{ maggiori della mediana}$

Per ogni elemento campionato, la probabilità di essere sotto la mediana è circa:

$\frac{1}{2}$

Quindi:

$\mathbb{E}[Y_1] = n^{3/4}\cdot \frac{1}{2} = \frac{n^{3/4}}{2}$

Analogamente:

$\mathbb{E}[Y_2] = \frac{n^{3/4}}{2}$

Gli eventi di fallimento principali sono:

$E_1 = \{Y_1 < \frac{n^{3/4}}{2}-\sqrt{n}\}$

$E_2 = \{Y_2 < \frac{n^{3/4}}{2}-\sqrt{n}\}$

$E_3 = \{|C|>4n^{3/4}\}$

Per $E_1$ ed $E_2$ si usa la disuguaglianza di Chebyshev:

$\Pr[|X-\mathbb{E}[X]|\geq a] \leq \frac{\operatorname{Var}[X]}{a^2}$

Definiamo una variabile indicatrice:

$X_i= \begin{cases} 1 & \text{se l’elemento campionato } i \text{ è minore della mediana} \\ 0 & \text{altrimenti} \end{cases}$

Allora:

$Y_1=\sum_{i=1}^{n^{3/4}}X_i$

con:

$\mathbb{E}[X_i]=\frac{1}{2}$

e:

$\operatorname{Var}(X_i) = \frac{1}{2}\left(1-\frac{1}{2}\right) = \frac{1}{4}$

Quindi:

$\operatorname{Var}(Y_1) = \sum_i \operatorname{Var}(X_i) = \frac{n^{3/4}}{4}$

Applicando Chebyshev con:

$a=\sqrt{n}$

otteniamo:

$\Pr[E_1] \leq \frac{n^{3/4}/4}{n} = \frac{1}{4n^{1/4}}$

Analogamente:

$\Pr[E_2] \leq \frac{1}{4n^{1/4}}$

Per il terzo evento si ottiene un bound del tipo:

$\Pr[E_3]\leq \frac{1}{2n^{1/4}}$

Applicando union bound:

$\Pr[E_1\cup E_2\cup E_3] \leq \Pr[E_1]+\Pr[E_2]+\Pr[E_3]$

quindi:

$\Pr[\text{fallimento}] \leq \frac{1}{4n^{1/4}} + \frac{1}{4n^{1/4}} + \frac{1}{2n^{1/4}} = \frac{1}{n^{1/4}}$

Quindi l’algoritmo ha probabilità di successo almeno:

$1-\frac{1}{n^{1/4}}$

### Costo

Il campione ha dimensione:

$n^{3/4}$

Ordinarlo costa:

$O(n^{3/4}\log n)$

La scansione di $S$ per calcolare $l_d,l_u$ e costruire $C$ costa:

$O(n)$

Ordinare $C$, che con alta probabilità ha dimensione al massimo $4n^{3/4}$, costa:

$O(n^{3/4}\log n)$

Quindi il costo complessivo è:

$O(n+n^{3/4}\log n) = O(n)$

Lo spazio è:

$O(n^{3/4})$

oppure $O(n)$ se si mantiene esplicitamente anche l’insieme $C$ in modo non ottimizzato.

---

## 8. Hashing

## 8.1 Funzioni Hash

Una funzione hash è una funzione:

$h:U\to [m]$

dove:

* $U$ è l’universo degli elementi possibili;
* $[m]=\{0,1,\dots,m-1\}$ è l’insieme dei bucket.

La funzione hash associa ogni elemento dell’universo a un bucket.

---

## 8.2 Funzione Hash Uniforme

Una funzione hash ideale si dice uniforme se ogni elemento viene mappato in modo uniforme sui bucket.

Per ogni $x\in U$ e ogni $y\in[m]$:

$\Pr[h(x)=y]=\frac{1}{m}$

Una forma più forte è la piena casualità, cioè per ogni insieme di elementi distinti $x_1,\dots,x_k$ e valori $y_1,\dots,y_k$:

$\Pr[h(x_1)=y_1,\dots,h(x_k)=y_k] = \frac{1}{m^k}$

---

## 8.3 Famiglia Hash Universale

Una famiglia di funzioni hash $\mathcal{H}$ è un insieme di funzioni:

$h:U\to[m]$

La famiglia $\mathcal{H}$ si dice universale se, per ogni coppia di elementi distinti $x_1,x_2\in U$, scegliendo $h$ uniformemente a caso da $\mathcal{H}$, vale:

$\Pr_{h\in\mathcal{H}}[h(x_1)=h(x_2)] \leq \frac{1}{m}$

Questa proprietà limita la probabilità di collisione.

---

## 8.4 2-indipendenza implica universalità

Una famiglia hash è 2-indipendente se per ogni coppia di elementi distinti $x_1,x_2$ e per ogni coppia di valori $y_1,y_2\in[m]$:

$\Pr[h(x_1)=y_1 \wedge h(x_2)=y_2] = \frac{1}{m^2}$

Vogliamo dimostrare che una famiglia 2-indipendente è universale.

Infatti:

$\Pr[h(x_1)=h(x_2)] = \sum_{y\in[m]} \Pr[h(x_1)=y \wedge h(x_2)=y]$

Per 2-indipendenza:

$\Pr[h(x_1)=y \wedge h(x_2)=y] = \frac{1}{m^2}$

Quindi:

$\Pr[h(x_1)=h(x_2)] = \sum_{y\in[m]}\frac{1}{m^2} = m\cdot \frac{1}{m^2} = \frac{1}{m}$

Perciò la famiglia è universale.

---

## 8.5 Esempio di famiglia hash universale

Sia $p$ un numero primo.

Rappresentiamo ogni elemento $x\in U$ come un vettore:

$x=(x_0,x_1,\dots,x_r)$

con cifre in base $p$.

Scegliamo un vettore casuale:

$a=(a_0,a_1,\dots,a_r)$

dove ogni $a_j$ è scelto uniformemente in $[p]$.

Definiamo:

$h_a(x) = \left(\sum_{j=0}^{r}a_jx_j\right)\bmod p$

Vogliamo mostrare che questa famiglia è universale.

Prendiamo due elementi distinti:

$x\neq y$

Allora esiste almeno un indice $i$ tale che:

$x_i\neq y_i$

Consideriamo l’evento di collisione:

$h_a(x)=h_a(y)$

cioè:

$\sum_{j=0}^{r}a_jx_j \equiv \sum_{j=0}^{r}a_jy_j \pmod p$

Portando tutto a sinistra:

$\sum_{j=0}^{r}a_j(x_j-y_j) \equiv 0 \pmod p$

Separiamo il termine $i$:

$a_i(x_i-y_i) \equiv -\sum_{j\neq i}a_j(x_j-y_j) \pmod p$

Poiché $x_i-y_i\neq 0$ e $p$ è primo, $x_i-y_i$ ha inverso moltiplicativo modulo $p$. Quindi, fissati tutti gli altri coefficienti $a_j$ con $j\neq i$, esiste un solo valore di $a_i$ che causa collisione.

Poiché $a_i$ è scelto uniformemente in $[p]$:

$\Pr[h_a(x)=h_a(y)] \leq \frac{1}{p}$

Quindi la famiglia è universale.

---

## 8.6 Perfect Hashing

### Idea

Nel perfect hashing vogliamo memorizzare un sottoinsieme statico:

$S\subseteq U$

senza collisioni.

Vogliamo scegliere una funzione hash:

$h:U\to[m]$

tale che per ogni coppia $x,y\in S$, con $x\neq y$:

$h(x)\neq h(y)$

In altre parole, $h$ è perfetta su $S$.

### Osservazione

Se $h$ viene scelta da una famiglia hash universale, la probabilità di collisione tra due elementi distinti è bassa:

$\Pr[h(x)=h(y)]\leq \frac{1}{m}$

Usando union bound su tutte le coppie di elementi di $S$, si può controllare la probabilità che esista almeno una collisione.

---

## 8.7 Dizionario

Un dizionario è una struttura dati che mantiene un sottoinsieme dinamico:

$S\subseteq U$

e supporta le operazioni:

* `create()`;
* `insert(u)`;
* `delete(u)`;
* `lookup(u)`.

Una soluzione classica è usare una tabella hash.

---

## 8.8 Tabelle Hash

Si sceglie una funzione:

$h:U\to[m]$

e si mantiene un array di dimensione $m$.

Ogni elemento $x\in S$ viene inserito nella posizione:

$h(x)$

Se più elementi finiscono nello stesso bucket, si usa una lista di trabocco, cioè una lista collegata associata a quel bucket.

### Doubling e Halving

Per mantenere efficiente la struttura, si aggiorna la dimensione della tabella quando il numero di elementi cambia troppo.

Sia:

* $n$: numero attuale di elementi;
* $N$: capacità stimata della tabella.

```text
Se n > N:
    N = 2N
    scegli una nuova dimensione m
    scegli una nuova funzione hash
    reinserisci tutti gli elementi

Se n < N/4:
    N = N/2
    scegli una nuova dimensione m
    scegli una nuova funzione hash
    reinserisci tutti gli elementi
```

Il rehashing costa molto quando avviene, ma usando l’analisi ammortizzata il costo medio per operazione rimane efficiente.

---

# 9. Document Similarity

## 9.1 Problema

Dato un insieme di documenti, vogliamo calcolare quanto due documenti siano simili.

Il confronto diretto tra tutte le coppie può costare troppo:

$O(N^2)$

dove $N$ è il numero di documenti.

---

## 9.2 Jaccard Similarity

Rappresentiamo ogni documento come un insieme di elementi, ad esempio un insieme di shingles.

Dati due documenti $D_1$ e $D_2$, la similarità di Jaccard è:

$J(D_1,D_2) = \frac{|D_1\cap D_2|}{|D_1\cup D_2|}$

Questa misura è compresa tra 0 e 1:

* vale 0 se i documenti non condividono nulla;
* vale 1 se i documenti sono identici.

---

## 9.3 Shingling

Un $k$-shingle è una sequenza di $k$ token consecutivi di un documento.

I token possono essere:

* caratteri;
* parole;
* gruppi di parole.

Ogni documento viene trasformato nell’insieme dei suoi $k$-shingles.

Se l’alfabeto dei token è $U_t$, allora il numero di possibili $k$-shingles è:

$|U_t|^k$

Si può costruire una matrice binaria $M$:

* righe: possibili $k$-shingles;
* colonne: documenti;
* $M[i,j]=1$ se il documento $j$ contiene lo shingle $i$.

Questa matrice è molto grande, quindi si usa il min hashing.

---

## 9.4 Min Hashing

L’obiettivo del min hashing è costruire una matrice delle firme che approssima la matrice degli shingles.

Data una permutazione $\pi$ delle righe della matrice $M$, definiamo:

$h_{\pi}(D) = \min\{i : M_{\pi(i),D}=1\}$

cioè il primo shingle del documento $D$ incontrato secondo l’ordine dato dalla permutazione $\pi$.

### Proprietà fondamentale

Per due documenti $D_1$ e $D_2$:

$\Pr[h_{\pi}(D_1)=h_{\pi}(D_2)] = J(D_1,D_2)$

Quindi la probabilità che due documenti abbiano lo stesso valore min-hash è uguale alla loro similarità di Jaccard.

### Signature Similarity

Usiamo $t$ funzioni hash/permutazioni.

La signature similarity è:

$\text{Sign-Sim}(D_1,D_2) = \frac{|\{i\in\{1,\dots,t\}: h_i(D_1)=h_i(D_2)\}|}{t}$

Per $t$ grande:

$\text{Sign-Sim}(D_1,D_2) \approx J(D_1,D_2)$

---

## 9.5 Doc Pair Check

### Pseudocodice

```text
Input: documenti D1, D2, numero di hash t

1. count = 0

2. Per i = 1,...,t:
       se h_i(D1) == h_i(D2):
           count = count + 1

3. return count / t
```

### Costo

Tempo:

$O(t)$

Spazio:

$O(1)$

---

## 9.6 Costruzione della Signature Matrix

### Pseudocodice

```text
Input: matrice M, t funzioni hash

1. Inizializza Sig[t][N] = infinito

2. Per ogni riga i della matrice M:
       Per ogni documento j:
           Se M[i][j] == 1:
               Per ogni funzione hash k:
                   Se h_k(i) < Sig[k][j]:
                       Sig[k][j] = h_k(i)

3. return Sig
```

### Costo

Se $M$ ha $m$ righe e $N$ colonne, il costo è:

$O(mNt)$

In alcune slide questo viene indicato come:

$O(mN)$

se $t$ viene considerato costante.

Lo spazio per la signature matrix è:

$O(tN)$

---

## 9.7 Locality Sensitive Hashing

### Problema

Confrontare tutte le coppie di documenti costa:

$O(N^2)$

LSH serve a ridurre il numero di confronti, selezionando solo coppie candidate.

### Idea

Dividiamo la signature matrix in:

* $b$ bande;
* $r$ righe per banda.

Quindi:

$t=b\cdot r$

Per ogni banda, applichiamo una funzione hash alla porzione di firma del documento relativa a quella banda.

Se due documenti finiscono nello stesso bucket per almeno una banda, allora vengono considerati candidati simili.

### Probabilità

Sia:

$x=J(D_1,D_2)$

la similarità tra due documenti.

La probabilità che una singola riga della firma coincida è:

$x$

La probabilità che tutte le $r$ righe di una banda coincidano è:

$x^r$

La probabilità che una banda non coincida è:

$1-x^r$

La probabilità che nessuna delle $b$ bande coincida è:

$(1-x^r)^b$

Quindi la probabilità che almeno una banda coincida è:

$1-(1-x^r)^b$

Questa è la probabilità che la coppia venga selezionata come candidata.

### Falsi negativi e falsi positivi

* Falso positivo: due documenti vengono considerati candidati, ma non sono davvero simili.
* Falso negativo: due documenti sono simili, ma non vengono considerati candidati.

Aumentando $b$, si riducono i falsi negativi.

Aumentando $r$, si riducono i falsi positivi.

---

# 10. Pattern Matching — Karp-Rabin

## Problema

Dato:

* un testo $T$ di lunghezza $n$;
* un pattern $P$ di lunghezza $m$;

vogliamo trovare tutte le occorrenze di $P$ in $T$.

Il controllo banale confronta $P$ con ogni sottostringa di $T$ lunga $m$, con costo:

$O(nm)$

## Idea

Karp-Rabin usa hashing.

Invece di confrontare direttamente il pattern con ogni sottostringa, confronta i valori hash.

Se:

$h(P)\neq h(T[i:i+m-1])$

allora sicuramente non c’è match.

Se invece:

$h(P)=h(T[i:i+m-1])$

allora probabilmente c’è match, ma potrebbe esserci una collisione.

## Hash polinomiale

Supponiamo che i caratteri siano numeri e scegliamo una base $b$ e un modulo primo $q$.

Per una stringa:

$S=s_0s_1\dots s_{m-1}$

definiamo:

$h(S) = \left(\sum_{j=0}^{m-1}s_j b^{m-1-j}\right) \bmod q$

## Rolling Hash

Il vantaggio è che possiamo aggiornare l’hash della finestra in tempo $O(1)$.

Se conosciamo l’hash della finestra:

$T[i:i+m-1]$

possiamo calcolare l’hash della finestra successiva:

$T[i+1:i+m]$

rimuovendo il contributo del primo carattere, moltiplicando per $b$, e aggiungendo il nuovo carattere.

Formula generale:

$h_{i+1} = \left(b(h_i - T[i]\cdot b^{m-1}) + T[i+m]\right) \bmod q$

## Pseudocodice

```text
Input: testo T di lunghezza n, pattern P di lunghezza m

1. Calcola hp = h(P)
2. Calcola h0 = h(T[0:m-1])

3. Per i = 0,...,n-m:
       Se hi == hp:
           confronta eventualmente P con T[i:i+m-1]
           se sono uguali:
               segnala occorrenza in posizione i

       Aggiorna hi al rolling hash della finestra successiva
```

## Correttezza

Se due stringhe sono uguali, allora hanno sicuramente lo stesso hash.

Se due stringhe hanno hash diversi, allora sono sicuramente diverse.

Se due stringhe hanno lo stesso hash, possono essere:

* uguali;
* diverse ma in collisione.

Quindi l’algoritmo può avere falsi positivi, ma non falsi negativi se si fa il controllo finale carattere per carattere.

## Costo

Il calcolo iniziale costa:

$O(m)$

Ogni aggiornamento rolling hash costa:

$O(1)$

Quindi il costo atteso è:

$O(n+m)$

Se si verificano molte collisioni e si confronta carattere per carattere, il caso pessimo può arrivare a:

$O(nm)$

ma con una buona funzione hash e un modulo adeguato il comportamento atteso è lineare.

---

# 11. Sampling dello Stream

## Problema

Sia $S$ uno stream di $n$ elementi:

$x_1,x_2,\dots,x_n$

dove ogni elemento può essere una tupla del tipo:

$(\text{idUtente}, \text{query}, \text{tempo})$

Vogliamo calcolare statistiche sulle query, ad esempio quante volte compare una query $q$, senza analizzare o memorizzare tutto lo stream.

L’idea è costruire un campione dello stream.

Ci sono due approcci:

1. campione di dimensione proporzionale allo stream, per esempio $1/10$ dello stream;
2. campione di dimensione fissa $s$, con $s<|S|$.

---

## 11.1 Algoritmo banale

### Idea

Ogni tupla viene scelta indipendentemente con probabilità:

$\frac{1}{k}$

Per esempio, con $k=10$, prendiamo circa un decimo dello stream.

### Pseudocodice

```text
Input: stream S, parametro k

1. C = campione vuoto

2. Per ogni tupla t nello stream:
       scegli un bucket uniformemente a caso tra {0,...,k-1}
       se il bucket scelto è 0:
           inserisci t in C

3. Esegui le statistiche su C
```

### Problema

Questo algoritmo campiona tuple, non utenti o query distinte.

Se una query compare due volte nello stream, ha più probabilità di essere campionata rispetto a una query che compare una volta sola.

Quindi può introdurre distorsioni quando vogliamo stimare il numero di query distinte.

### Esempio

Supponiamo di avere:

* $m$ query che compaiono una sola volta;
* $d$ query che compaiono due volte.

Il numero reale di query distinte è:

$m+d$

La frazione reale delle query doppie è:

$\frac{d}{m+d}$

Con campionamento $1/10$:

* una query singola viene vista con probabilità:

$\frac{1}{10}$

* una query doppia viene vista due volte con probabilità:

$\frac{1}{100}$

* una query doppia viene vista esattamente una volta con probabilità:

$2\cdot \frac{1}{10}\cdot \frac{9}{10} = \frac{18}{100}$

Quindi il numero atteso di query distinte osservate nel campione è:

$\frac{m}{10} + \frac{18d}{100} + \frac{d}{100} = \frac{m}{10} + \frac{19d}{100}$

Le query doppie osservate due volte sono attese:

$\frac{d}{100}$

Quindi la stima nel campione della frazione di query doppie sarebbe:

$\frac{d/100}{m/10+19d/100}$

che può essere molto diversa dalla frazione reale:

$\frac{d}{m+d}$

---

## 11.2 User Sample Algorithm

### Idea

Invece di campionare tuple, campioniamo utenti.

Se un utente viene scelto, prendiamo tutte le sue query.

Questo evita di spezzare il comportamento di un utente.

### Pseudocodice

```text
Input: stream S, insieme utenti U, parametro k

1. Scegli una funzione hash h: U -> [k]
2. C = campione vuoto

3. Per ogni tupla t=(u, query, tempo) nello stream:
       se h(u) == 1:
           inserisci t in C

4. Esegui statistiche su C
```

### Analisi

Sia:

$X_i= \begin{cases} 1 & \text{se l’utente } i \text{ viene campionato} \\ 0 & \text{altrimenti} \end{cases}$

Allora:

$\Pr[X_i=1]=\frac{1}{k}$

Sia $Y_i$ il numero di tuple/query generate dall’utente $i$.

La dimensione del campione è:

$|C|=\sum_{i}X_iY_i$

Per linearità dell’aspettazione:

$\mathbb{E}[|C|] = \sum_i \mathbb{E}[X_iY_i]$

Poiché $Y_i$ è fissato dallo stream:

$\mathbb{E}[X_iY_i] = Y_i\mathbb{E}[X_i] = \frac{Y_i}{k}$

Quindi:

$\mathbb{E}[|C|] = \frac{1}{k}\sum_iY_i = \frac{|S|}{k}$

dove $|S|$ è la dimensione dello stream.

---

# 12. Reservoir Sampling

## Problema

Dato uno stream:

$x_1,x_2,\dots,x_n$

di lunghezza non nota a priori, vogliamo mantenere un campione uniforme di dimensione fissa $k$.

Alla fine, ogni elemento dello stream deve avere probabilità:

$\frac{k}{n}$

di appartenere al campione.

## Pseudocodice

```text
Input: stream S, dimensione campione k

1. Inserisci i primi k elementi nel reservoir R

2. Per i = k+1, k+2, ...:
       scegli j uniformemente a caso in {1,...,i}
       se j <= k:
           sostituisci R[j] con x_i

3. return R
```

## Analisi

Vogliamo dimostrare che dopo aver processato $n$ elementi, ogni elemento è nel reservoir con probabilità:

$\frac{k}{n}$

### Caso base

Per $n=k$, tutti gli elementi sono nel reservoir:

$\Pr[x_i\in R]=1=\frac{k}{k}$

### Passo induttivo

Supponiamo che dopo $n$ elementi ogni elemento sia nel reservoir con probabilità:

$\frac{k}{n}$

Arriva l’elemento $x_{n+1}$.

Il nuovo elemento entra nel reservoir con probabilità:

$\frac{k}{n+1}$

Consideriamo un vecchio elemento $x_i$.

Per rimanere nel reservoir deve:

1. essere già presente prima dell’arrivo di $x_{n+1}$;
2. non essere eliminato.

Per ipotesi induttiva:

$\Pr[x_i\in R]=\frac{k}{n}$

La probabilità che il nuovo elemento entri è:

$\frac{k}{n+1}$

Se entra, elimina uno dei $k$ elementi uniformemente a caso. Quindi la probabilità che elimini proprio $x_i$ è:

$\frac{1}{k}$

La probabilità che $x_i$ venga eliminato è:

$\frac{k}{n+1}\cdot \frac{1}{k} = \frac{1}{n+1}$

Quindi la probabilità che $x_i$ sopravviva è:

$1-\frac{1}{n+1} = \frac{n}{n+1}$

Pertanto:

$\Pr[x_i\in R \text{ dopo } n+1] = \frac{k}{n}\cdot \frac{n}{n+1} = \frac{k}{n+1}$

Quindi la proprietà è dimostrata.

---

# 13. Sliding Window

## Problema generale

Dato uno stream:

$S=x_1,x_2,\dots,x_m$

vogliamo mantenere statistiche solo sugli ultimi $N$ elementi, cioè sulla sliding window.

Nel caso del counting bits, lo stream è binario:

$x_i\in\{0,1\}$

e vogliamo stimare il numero di bit uguali a 1 negli ultimi $k$ elementi della finestra, con:

$k\leq N$

Indichiamo questo valore con:

$\#1(S,N,k)$

---

## 13.1 Exponential Buckets

### Idea

Dividiamo lo stream in bucket di dimensione potenza di 2:

$1,2,4,8,\dots$

Quando arriva un nuovo elemento, creiamo un bucket di dimensione 1.

Se ci sono troppi bucket della stessa dimensione, li fondiamo in un bucket più grande, causando eventualmente merge a cascata.

Ogni bucket mantiene:

* la sua dimensione;
* il timestamp del suo elemento più recente o più vecchio;
* il numero di 1 contenuti.

Quando un bucket esce completamente dalla finestra, viene eliminato.

### Stima

Per contare gli 1 negli ultimi $k$ elementi, sommiamo i contributi dei bucket che intersecano la finestra.

### Errore

L’errore principale viene dal bucket più vecchio che interseca parzialmente la finestra.

Quel bucket potrebbe contenere elementi fuori dalla finestra che però vengono contati.

Quindi la stima può essere una sovrastima.

---

## 13.2 DGIM

### Idea

DGIM è un algoritmo per stimare il numero di 1 negli ultimi $N$ bit usando spazio logaritmico.

I bucket non rappresentano il numero totale di bit, ma il numero di 1.

Ogni bucket ha dimensione:

$2^j$

e contiene esattamente $2^j$ bit uguali a 1.

Per ogni dimensione, si mantengono al massimo due bucket.

### Aggiornamento

Quando arriva un bit:

* se è 0, non si crea nessun nuovo bucket;
* se è 1, si crea un bucket di dimensione 1;
* se ci sono tre bucket della stessa dimensione, si fondono i due più vecchi in un bucket di dimensione doppia.

I bucket troppo vecchi vengono eliminati.

### Query

Per stimare il numero di 1 negli ultimi $k$ bit:

1. si sommano completamente tutti i bucket contenuti nella finestra;
2. del bucket più vecchio che interseca parzialmente la finestra si conta solo metà.

Quindi, se il bucket più vecchio ha dimensione $b$, si aggiunge:

$\frac{b}{2}$

### Errore

L’errore è dovuto solo al bucket più vecchio parzialmente incluso.

Poiché di quel bucket contiamo metà, l’errore è al massimo:

$\frac{b}{2}$

DGIM fornisce quindi una stima più controllata rispetto agli exponential buckets più semplici.

---

# 14. Algoritmi sulle Stream

## 14.1 Sampling Algorithm per frequenze

### Problema

Dato uno stream:

$x_1,x_2,\dots,x_m$

e un elemento $y$, vogliamo stimare la frequenza:

$f(y)=|\{i : x_i=y\}|$

senza mantenere un contatore per ogni elemento dell’universo.

### Idea

Manteniamo un campione casuale $F$ di dimensione $k$, con:

$k<m$

Contiamo quante volte $y$ compare nel campione:

$F(y)$

e stimiamo:

$\widetilde{f}(y) = \frac{m}{k}F(y)$

### Pseudocodice

```text
Input: stream S di lunghezza m, parametro k

1. Scegli k posizioni uniformemente a caso dallo stream
2. Inserisci gli elementi in quelle posizioni nel campione F

Query(y):
3. Conta F(y), cioè quante volte y compare nel campione
4. return (m/k) F(y)
```

### Analisi

Per ogni occorrenza di $y$, la probabilità di essere campionata è:

$\frac{k}{m}$

Quindi:

$\mathbb{E}[F(y)] = f(y)\frac{k}{m}$

La stima è:

$\widetilde{f}(y) = \frac{m}{k}F(y)$

e quindi:

$\mathbb{E}[\widetilde{f}(y)] = \frac{m}{k}\mathbb{E}[F(y)] = \frac{m}{k}\cdot f(y)\frac{k}{m} = f(y)$

Quindi lo stimatore è unbiased.

Può però produrre sia sovrastime sia sottostime.

---

## 14.2 Count-Min Sketch

### Problema

Dato uno stream:

$x_1,x_2,\dots,x_m$

con elementi presi da un universo $[n]$, vogliamo stimare la frequenza di un elemento $y$:

$f(y)=|\{i:x_i=y\}|$

usando poco spazio.

### Struttura dati

Count-Min Sketch mantiene una matrice:

$CM \in \mathbb{N}^{t\times s}$

dove:

* $t$ è il numero di righe;
* $s$ è il numero di colonne;
* ogni riga ha una funzione hash indipendente:

$h_j:[n]\to[s]$

per $j=1,\dots,t$.

### Aggiornamento

Quando arriva un elemento $x$, per ogni riga $j$:

$CM[j,h_j(x)] = CM[j,h_j(x)] + 1$

### Query

Per stimare la frequenza di $y$, calcoliamo:

$\widetilde{f}(y) = \min_{j=1,\dots,t} CM[j,h_j(y)]$

### Perché si prende il minimo?

Ogni cella contiene:

$CM[j,h_j(y)] = f(y)+\text{rumore}$

dove il rumore è dovuto agli altri elementi che collidono con $y$ nella stessa cella.

Il rumore è sempre non negativo, quindi:

$CM[j,h_j(y)]\geq f(y)$

e dunque:

$\widetilde{f}(y)\geq f(y)$

Count-Min Sketch non sottostima mai.

### Errore atteso su una riga

Per una riga fissata $j$, il rumore è:

$X_j = \sum_{x\neq y} f(x)\cdot I[h_j(x)=h_j(y)]$

dove $I[\cdot]$ è una variabile indicatrice.

Poiché:

$\Pr[h_j(x)=h_j(y)] = \frac{1}{s}$

abbiamo:

$\mathbb{E}[X_j] = \sum_{x\neq y} f(x)\frac{1}{s} \leq \frac{m}{s}$

Per Markov:

$\Pr[X_j\geq 2m/s] \leq \frac{1}{2}$

Se scegliamo:

$s=\frac{2}{\varepsilon}$

allora:

$\frac{2m}{s} = \varepsilon m$

quindi:

$\Pr[CM[j,h_j(y)]\geq f(y)+\varepsilon m] \leq \frac{1}{2}$

### Amplificazione con $t$ righe

La stima finale sbaglia di più di $\varepsilon m$ solo se tutte le $t$ righe hanno troppo rumore.

Poiché le righe sono indipendenti:

$\Pr[\widetilde{f}(y)\geq f(y)+\varepsilon m] \leq \left(\frac{1}{2}\right)^t$

Per avere probabilità di fallimento al massimo $\delta$, scegliamo:

$t=\log_2\frac{1}{\delta}$

### Garanzia finale

Con probabilità almeno:

$1-\delta$

vale:

$f(y)\leq \widetilde{f}(y)\leq f(y)+\varepsilon m$

### Spazio

La matrice ha dimensione:

$t\cdot s$

con:

$s=\frac{2}{\varepsilon}$

e:

$t=\log_2\frac{1}{\delta}$

quindi lo spazio è:

$O\left(\frac{1}{\varepsilon}\log\frac{1}{\delta}\right)$

---

# 15. Filtri sulle Stream

## Problema

Dato uno stream di elementi:

$X=x_1,x_2,\dots,x_n$

dove ogni elemento ha una chiave, vogliamo decidere rapidamente se accettare o scartare un elemento in base alla sua chiave.

Abbiamo un insieme $S$ di chiavi buone:

$S\subseteq U$

dove $U$ è l’universo delle chiavi.

Vogliamo accettare un elemento se la sua chiave appartiene a $S$.

---

## 15.1 First Cut

### Idea

Usiamo un array binario $B$ di dimensione $m$, inizializzato a zero, e una funzione hash:

$h:U\to[m]$

Per ogni chiave buona $s\in S$, poniamo:

$B[h(s)]=1$

Quando arriva una chiave $x$, accettiamo se:

$B[h(x)]=1$

### Pseudocodice

```text
Input: insieme S di chiavi buone, funzione h: U -> [m]

1. Inizializza B[0,...,m-1] = 0

2. Per ogni s ∈ S:
       B[h(s)] = 1

Query(x):
3. Se B[h(x)] == 1:
       return "accetta"
   Altrimenti:
       return "rifiuta"
```

### Falsi positivi

Non ci sono falsi negativi: se $x\in S$, allora sicuramente:

$B[h(x)]=1$

Può però esserci un falso positivo: $x\notin S$, ma collide con qualche elemento di $S$.

La probabilità che una certa cella resti 0 dopo aver inserito $n=|S|$ elementi è:

$\left(1-\frac{1}{m}\right)^n$

Quindi la probabilità che sia 1 è:

$1-\left(1-\frac{1}{m}\right)^n$

Per una chiave $x\notin S$, la probabilità di falso positivo è:

$\Pr[\text{falso positivo}] = 1-\left(1-\frac{1}{m}\right)^n$

---

## 15.2 Bloom Filter

### Idea

Il Bloom filter migliora il First Cut usando $t$ funzioni hash indipendenti:

$h_1,\dots,h_t$

e un array binario $B$ di dimensione $m$.

Per ogni elemento $s\in S$, mettiamo a 1 tutte le celle:

$B[h_1(s)],B[h_2(s)],\dots,B[h_t(s)]$

Una query $x$ viene accettata solo se tutte le posizioni sono uguali a 1.

### Pseudocodice

```text
Input: insieme S, t funzioni hash h1,...,ht

1. Inizializza B[0,...,m-1] = 0

2. Per ogni s ∈ S:
       Per j = 1,...,t:
           B[h_j(s)] = 1

Query(x):
3. Per j = 1,...,t:
       Se B[h_j(x)] == 0:
           return "rifiuta"

4. return "accetta"
```

### Analisi

Dopo aver inserito $n$ elementi con $t$ hash ciascuno, sono stati fatti $nt$ inserimenti nell’array.

La probabilità che una cella resti 0 è:

$\left(1-\frac{1}{m}\right)^{nt}$

La probabilità che una cella sia 1 è:

$1-\left(1-\frac{1}{m}\right)^{nt}$

Per avere un falso positivo, tutte le $t$ celle controllate devono essere 1. Quindi:

$\Pr[\text{falso positivo}] = \left(1-\left(1-\frac{1}{m}\right)^{nt}\right)^t$

Non ci sono falsi negativi, ma possono esserci falsi positivi.

---

# 16. Flajolet-Martin

## Problema

Dato uno stream:

$S=x_1,x_2,\dots,x_n$

vogliamo stimare il numero di elementi distinti, cioè:

$F_0 = |\{x : x \text{ compare nello stream}\}|$

senza memorizzare tutti gli elementi distinti.

## Idea

Usiamo una funzione hash:

$h:U\to\{0,1\}^s$

dove:

$s\geq \log_2 |U|$

Per ogni elemento $x$, calcoliamo $h(x)$.

Definiamo:

$r(x)=\text{numero di zeri finali nella rappresentazione binaria di } h(x)$

equivalentemente, la posizione del primo 1 partendo da destra.

Manteniamo:

$R=\max_x r(x)$

cioè il massimo numero di zeri finali visto finora.

La stima del numero di distinti è:

$\widetilde{F_0}=2^R$

## Intuizione

La probabilità che un hash finisca con almeno $R$ zeri è:

$\frac{1}{2^R}$

Se nello stream ho visto molti elementi distinti, aumenta la probabilità di osservare almeno un elemento con tanti zeri finali.

Quindi, se il massimo numero di zeri finali osservato è $R$, è plausibile che il numero di distinti sia dell’ordine di:

$2^R$

## Nota

Una singola esecuzione ha varianza alta.

Per migliorare la stima, si eseguono più copie indipendenti con funzioni hash diverse e si combinano i risultati, ad esempio usando medie o mediane.

---

## 17. AMS — Metodo per i Momenti

## Problema

Dato uno stream:

$x_1,x_2,\dots,x_L$

sia $m_i$ il numero di volte in cui l’elemento $i$ compare nello stream.

Il momento di ordine $k$ è:

$F_k=\sum_i m_i^k$

I momenti principali sono:

* $F_0$: numero di elementi distinti;
* $F_1$: lunghezza dello stream;
* $F_2$: surprise number.

Il secondo momento è:

$F_2=\sum_i m_i^2$

È utile per capire quanto le frequenze siano concentrate.

* Se gli elementi hanno frequenze simili, $F_2$ è più basso.
* Se pochi elementi compaiono tantissime volte, $F_2$ è alto.

## Idea AMS per $F_2$

Scegliamo una posizione casuale $t$ nello stream:

$t\in_u \{1,\dots,L\}$

Sia:

$x_t$

l’elemento in quella posizione.

Definiamo:

$c = |\{j\geq t : x_j=x_t\}|$

cioè il numero di occorrenze di $x_t$ dalla posizione $t$ fino alla fine dello stream.

Lo stimatore è:

$X=L(2c-1)$

## Perché funziona

Se un elemento $a$ compare $m_a$ volte nello stream, e scegliamo una delle sue occorrenze, il valore di $c$ può essere:

$1,2,\dots,m_a$

A seconda di quale occorrenza viene scelta.

Il contributo medio relativo a quell’elemento permette di stimare:

$m_a^2$

Infatti:

$\sum_{c=1}^{m_a}(2c-1)=m_a^2$

Quindi, scegliendo una posizione casuale nello stream e moltiplicando per $L$, lo stimatore risulta unbiased:

$\mathbb{E}[X]=F_2$

## Pseudocodice

```text
Input: stream di lunghezza L, numero di stimatori k

1. totale = 0

2. Per i = 1,...,k:
       scegli una posizione t uniformemente a caso in {1,...,L}
       sia a = x_t
       conta c = numero di occorrenze di a da t fino alla fine
       totale = totale + L(2c-1)

3. return totale / k
```

## Ripetizione

Usando più stimatori indipendenti e facendo la media, si riduce la varianza.

In pratica si mantengono più variabili AMS in parallelo.

---

## 18. Riepilogo rapido

## Algoritmi Monte Carlo

Sono algoritmi che possono sbagliare, ma hanno tempo controllato.

Esempi:

* verifica identità polinomiali;
* verifica prodotto matriciale;
* Count-Min Sketch;
* Bloom filter;
* Karger Min Cut.

## Algoritmi Las Vegas

Sono algoritmi che non sbagliano mai, ma il tempo può essere randomizzato.

Esempio classico:

* Quick Sort randomizzato, se visto come algoritmo che restituisce sempre l’output corretto ma con tempo atteso $O(n\log n)$.

## Tecniche ricorrenti

Le tecniche probabilistiche più usate sono:

1. linearità dell’aspettazione:

$\mathbb{E}\left[\sum_i X_i\right] = \sum_i\mathbb{E}[X_i]$

2. variabili indicatrici:

$X_i\in\{0,1\}$

3. union bound:

$\Pr\left[\bigcup_i E_i\right] \leq \sum_i\Pr[E_i]$

4. Markov:

$\Pr[X\geq a] \leq \frac{\mathbb{E}[X]}{a}$

5. Chebyshev:

$\Pr[|X-\mathbb{E}[X]|\geq a] \leq \frac{\operatorname{Var}(X)}{a^2}$

6. Chernoff:

$\Pr[X>(1+\delta)\mu] < \left( \frac{e^\delta}{(1+\delta)^{1+\delta}} \right)^\mu$
