## CH01
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

#### ALGORITMI
### Verifying Polynomial Identities
*PROBLEMA*
- Dati due polinomi $P(x)$ e $Q(x)$, voglio verificare se sono identici $(P ≡ Q)$.  
- Confrontare i coefficienti direttamente può essere costoso, quindi cerco un metodo più veloce.
*IDEA CHIAVE*  
- Considero il polinomio $H(x) = P(x) - Q(x)$.  
- Se $P ≡ Q$ allora $H(x) ≡ 0$.  
- Se $P ≠ Q$ allora $H(x)$ è un polinomio non nullo di grado $≤ d$.  
- Un polinomio non nullo di grado d può avere al massimo d radici.
	- valori per cui il polinomio vale 0
- Quindi se scelgo un punto casuale, è molto improbabile che sia proprio una radice.
*PARAMETRI*  
- $d$ = grado massimo dei polinomi  
- $S$ = insieme da cui estraggo il valore casuale  
- $r ∈ S$ scelto uniformemente
*ALGORITMO*  
1. Costruisco implicitamente $H(x) = P(x) - Q(x)$  
2. Scelgo un valore $r ∈ S$ uniformemente a caso  
3. Calcolo $P(r)$ e $Q(r)$ (equivalente a calcolare $H(r)$)  
4. Se $P(r) = Q(r)$ → restituisco "uguali"  
   altrimenti → "diversi"
*ANALISI*  
- Se $P ≡ Q$ → algoritmo sempre corretto  
- Se $P ≠ Q$:  
  $H(x)$ ha al massimo d radici  
  quindi al massimo d valori di $r$ per cui $P(r) = Q(r)$  
  ⇒ $Pr[errore] ≤ d / |S|$

**NATURA RANDOMIZZATA**  
L’algoritmo usa una scelta casuale $r ∈ S$.  
La correttezza non è deterministica, ma probabilistica.
*CORRETTEZZA*  
- Se $P ≡ Q$:  
  allora $P(r) = Q(r)$ per ogni $r$  
  ⇒ algoritmo sempre corretto  
- Se $P ≠ Q:$  
  allora $H(x) = P(x) - Q(x)$ è un polinomio non nullo
*ANALISI PROBABILISTICA*  
$H(x)$ ha grado $≤ d$ ⇒ può avere al massimo d radici  
Se scelgo $r ∈ S$ uniformemente:  
$Pr[H(r) = 0] ≤ d / |S|$  
⇒ $Pr[errore] ≤ d / |S|$

*TIPO DI ERRORE*  
- possibile errore: $P ≠ Q$ ma algoritmo dice "uguali"  
  (false positive)  
- impossibile errore: dire "diversi" quando sono uguali
*RIDUZIONE DELL'ERRORE*  
Ripeto l’algoritmo $k$ volte con valori indipendenti:  
$Pr[errore totale] ≤ (d / |S|)^k$  
⇒ errore decresce esponenzialmente
### Verifying Matrix Multiplication
*PROBLEMA*  
Date tre matrici $A, B, C (n × n)$, verificare se:  
$AB = C$  
senza calcolare esplicitamente il prodotto $AB$ (che costa $O(n³)$)
*IDEA CHIAVE*  
Invece di confrontare direttamente $AB$ e $C$, confronto:  
$ABr$ e $Cr$  
dove r è un vettore casuale.  
Se $AB ≠ C$, allora $(AB - C )r ≠ 0$ con alta probabilità.
*PARAMETRI*  
- $n$ = dimensione delle matrici  
- $r$ = vettore casuale di dimensione n  
	- $r_i ∈ \{0,1\}$ scelti indipendentemente  
- probabilità di errore
*ALGORITMO*  
1. Genera un vettore casuale $r ∈ \{0,1\}^n$  
2. Calcola $Br$  
3. Calcola $A(Br)$  
4. Calcola $Cr$  
5. Confronta:  
   - se $A(Br) = Cr$ → restituisci "uguali"  
   - altrimenti → "diversi"
*ANALISI*  
Costo:  
- $Br → O(n²)$  
- $A(Br) → O(n²)$  
- $Cr → O(n²)$   
⇒ totale $O(n²)$ (molto meglio di $O(n³)$)

*ANALISI PROBABILISTICA*  
Se $AB = C$ → algoritmo sempre corretto  
Se $AB ≠ C$:
sia $D = AB - C ≠ 0$  
⇒ $Pr[Dr = 0] ≤ 1/2$  
⇒ probabilità di errore ≤ 1/2
*TIPO DI ERRORE*  
- possibile: dire "uguali" quando non lo sono  
- impossibile: dire "diversi" quando sono uguali
*RIDUZIONE ERRORE*  
Ripetendo $k$ volte:  
$Pr[errore] ≤ (1/2)^k$  
⇒ errore esponenzialmente piccolo
### Min-Cut Algorithm
*PROBLEMA*
Dato un grafo non orientato $G = (V, E)$,  
trovare il taglio minimo (min-cut), cioè il minimo numero di archi  
la cui rimozione disconnette il grafo.
*IDEA CHIAVE*  
Contraggo archi casualmente fino a ottenere solo 2 nodi.  
Se durante il processo NON contraggo archi del min-cut,  
allora il taglio finale sarà proprio il min-cut.
👉 NON lo capisci in una singola esecuzione
👉 lo capisci così:
- ripeti l’algoritmo tante volte
- tieni il **taglio più piccolo trovato**
*PARAMETRI*  
- $n$ = numero di nodi  
- scelta casuale di archi  
- probabilità di successo (dipende da n)
“Contraggo un arco” significa:
Prendi un arco $(u,v)$ e:
1. **unisci i due nodi u e v in un unico nodo**
2. tutti gli archi che prima andavano a u o v ora vanno al nuovo nodo
3. **elimini i self-loop** (archi che collegano il nodo a sé stesso)

*ALGORITMO*  
1. Finché ci sono più di 2 nodi:  
   - scegli un arco (u, v) a caso  
   - contrai u e v in un unico nodo  
   - rimuovi eventuali self-loop  

2. Quando restano 2 nodi:  
   - gli archi tra loro = taglio trovato
*ANALISI*  
Costo:  
- ogni contrazione riduce i nodi  
- totale ≈ O(n²) (implementazione base)

*ANALISI PROBABILISTICA*  
Fisso un min-cut C di taglia k.
Se l’algoritmo non contrae mai archi di C, allora restituisce C.
Poiché C è un min-cut, ogni vertice ha grado almeno k.
Quindi, con t nodi rimasti, ci sono almeno $kt/2$ archi.

Quando restano t nodi, la probabilità di evitare C in quel passo è almeno:
$1 - k/(kt/2) = 1 - 2/t.$

Moltiplicando per t = n, n-1, ..., 3:
Pr(successo) ≥ (1-2/n)(1-2/(n-1))...(1-2/3)
= (n-2)/n · (n-3)/(n-1) · ... · 1/3
= 2 / (n(n-1)).
*TIPO DI ERRORE*  
- possibile: non trovare il min-cut  
- impossibile: trovare un taglio più piccolo del minimo
*RIDUZIONE ERRORE*  
Ripetendo l’algoritmo molte volte:  
- probabilità di successo aumenta  
- dopo $O(n² log n)$ iterazioni → alta probabilità di successo

## CH02
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

#### ALGORITMI

#### Random quick sort
 _PROBLEMA_
Dato un array $A$ di $n$ elementi, voglio ordinarlo in ordine crescente

_IDEA CHIAVE_
- Uso lo schema divide-et-impera di Quicksort:  
	- scelgo un pivot e partiziono l’array
- La differenza: il pivot è scelto **uniformemente a caso**.
👉 Questo evita input “avversari” che causano partizioni sempre sbilanciate.
- L’analisi non si basa su casi specifici, ma su una **media sulle scelte random**.
👉 idea tecnica (fondamentale):  
analizzo il numero di confronti tra coppie di elementi.
 _PARAMETRI_
- $n$ = numero di elementi
- scelta casuale del pivot uniforme
- tutte le scelte sono indipendenti
- costo misurato in numero di confronti
 _ALGORITMO_
1. Se $n ≤ 1$ → ritorna array
2. Scegli un pivot $x$ uniformemente a caso
3. Partiziona $A$ in:
    - $L = \{ elementi < x \}$
    - $E = \{ elementi = x \}$
    - $G = \{ elementi > x \}$
4. Ricorsivamente:
    - ordina $L$
    - ordina $G$
5. Restituisci: $L + E + G$
 _ANALISI_
Costo dipende da come si dividono i sotto-problemi:
- caso peggiore:
$T(n) = T(n-1) + O(n) \Rightarrow O(n^2)$
- caso atteso:
$E[T(n)] = O(n \log n)$
_ANALISI PROBABILISTICA_ 
Ordiniamo gli elementi:
$x_1 < x_2 < \dots < x_n$
Definiamo per capire qual è la probabilità che $x_i$​ e $x_j$ vengano confrontati? :
$$X_{i,j} = \begin{cases} 1 & \text{se } x_i \text{ e } x_j \text{ vengono confrontati} \\ 0 & \text{altrimenti} \end{cases}$$
Allora:
$$T(n) = \sum_{i < j} X_{i,j}$$
Per linearità dell’aspettativa:
$$E[T(n)] = \sum_{i < j} E[X_{i,j}]$$
Ora il punto chiave:
Due elementi $x_i, x_j$​ vengono confrontati **solo se** uno dei due viene scelto come pivot **prima** di qualsiasi elemento tra loro.
- e quindi appartengono ancora entrambi allo stesso sotto-problema che va da $i$ a $j$
	- $x_i​,x_{i+1}​,…,x_j​$
Quindi:
$$Pr(X_{i,j} = 1) = \frac{2}{j - i + 1}$$
ogni elemento ha probabilità $\frac{1}{j-i+1}$ ma visto che ne vogliamo che i e j vengano confrontanti tra loro o 2 scelte, o scelgo $x_i$ come pivot o scelgo $x_j$ e quindi diventa 2/...
Sommiamo per vedere il numero di confronti totali:
$$E[T(n)] = \sum_{i<j} \frac{2}{j-i+1}$$
- risolviamo la seguente sommatoria effettuando un cambio di variabile per $k=j-i$
- invece di sommare su $(i,j)$, sommiamo:
	- prima su $k$
	- poi su tutti gli $i$ possibili
$$E[T(n)] = \sum_{k=1}^{n-1} \sum_{i=1}^{n-k} \frac{2}{k+1}$$
- $\frac{2}{k+1}$ non dipende da i quindi possiamo portarlo fuori
$$E[T(n)] = \sum_{k=1}^{n-1} (n-k)\frac{2}{k+1}$$

Separiamo:
$$E[T(n)] \leq 2n \sum_{k=1}^{n-1} \frac{1}{k+1}$$
(perché $n-k ≤ n$)

Questa è la serie armonica

 $H_n= \sum_{h=1}^{n} \frac{1}{h}$
 
👉 quindi:

$\sum_{h=2}^{n} \frac{1}{h} = H_{n - 1}$

$\sum_{k=1}^{n-1} \frac{1}{k+1} = H_n = O(\log n)$
Questo porta a:
$$E[T(n)] = O(n \log n)$$

 _NATURA RANDOMIZZATA_
La randomizzazione è nella scelta del pivot.
L’algoritmo non ha errore → la randomizzazione influenza solo il tempo.
_CORRETTEZZA_
- L’algoritmo è sempre corretto (come Quicksort)
- produce sempre un array ordinato
_TIPO DI ERRORE_
❌ nessun errore

>[!info]-  esempio
> `A = [7, 2, 5, 1, 9]`
>  1. Scelta pivot
> Deterministico → ad esempio **primo elemento**
> `pivot = 7`
> 2. Partizionamento (QUESTA È LA PARTE CHIAVE)
> Riorganizzo l’array in modo che:
> `[ elementi < 7 | 7 | elementi > 7 ]`
> Esempio:
> `[2, 5, 1, 7, 9]`
> 👉 Ora il pivot è **nella sua posizione definitiva**
>  3. Ricorsione
> Applico lo stesso algoritmo a:
> `[2,5,1]    e    [9]`

## CH03
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


#### ALGORITMI
##### RANDOMIZED MEDIAN ALGORITHM 
 *PROBLEMA*
- Input: insieme $S$ di $n = 2k+1$ elementi distinti totalmente ordinati
	- (elementi sono **confrontabili**)
- Output: mediana, cioè il $(k+1)$-esimo elemento in ordine crescente
- Approcci classici:
    - sorting: $O(n \log n)$
    - algoritmo deterministico lineare: esiste ma è complesso
 *IDEA CHIAVE*
- Campiono un sottoinsieme casuale $R \subseteq S$
- Uso $R$ per stimare un **intervallo $[d,u]$** che:
    - contiene la mediana con alta probabilità
    - è abbastanza piccolo
- Poi lavoro solo sugli elementi tra $d$ e $u$
**Intuizione**
- I campioni sono “uniformemente distribuiti” nell’ordine totale
- Quindi:
    - circa metà dei campioni è sotto la mediana
    - circa metà sopra
- Questo permette di costruire un intervallo stretto attorno alla mediana
*PARAMETRI*
- $n$: numero elementi
- $S$: insieme originale (NON ordinato)
- $R$: campione casuale estratto da $S$ con $n^{3/4}$: dimensione campione
- $C$: sottoinsieme filtrato tra $d$ e $u$
- offset: $\sqrt{n}$​
- soglia finale:$|C| \le 4n^{3/4}$
 *ALGORITMO*
1. Estrai $s = n^{3/4}$ elementi da $S$ con ripetizione, uniformemente a caso
2. Ordina $R$
3. Definisci:
    - $d=$ elemento in posizione $\frac{1}{2}n^{3/4} - \sqrt{n}$
    - $u=$ elemento in posizione $\frac{1}{2}n^{3/4} + \sqrt{n}$
    - $\sqrt(n)$ è il giusto compromesso per avere un buon insieme di elementi da cui attingere
    - Il campione $R$ viene ordinato e si scelgono due elementi $d$ e $u$ che si trovano a distanza $\sqrt{n}$​ dalla posizione centrale del campione.  
	- Con alta probabilità, la mediana dell’insieme originale $S$ cade tra $d$ e $u$.
4. Costruisci:
    $C = \{x \in S : d \le x \le u\}$
    e calcola:
    $\ell_d = |\{x \in S : x < d\}|,\quad \ell_u = |\{x \in S : x > u\}|$
5. Se $\ell_d > n/2$ oppure $\ell_u > n/2$ → FAIL
6. Se $|C| \le 4n^{3/4}$ allora ordina $C$, altrimenti FAIL poiché ho un set di numeri troppo grande
7. Output:
    $\left(\left\lfloor \frac{n}{2} \right\rfloor - \ell_d + 1\right)\text{-esimo elemento di } C$

*ANALISI*
**Costo computazionale**
- sampling: $O(n^{3/4})$
- sorting R: $O(n^{3/4}\log n)$
- scanning $S$: $O(n)$
- sorting $C$: $O(n^{3/4}\log n)$
➡ totale:
- $O(n)$
**Osservazione chiave**
- Il costo è lineare **se non fallisce**

![[Pasted image 20260331193831.png]]

*ANALISI PROBABILISTICA*

Definiamo:
- $Y_1$: numero di campioni sotto la mediana
- $Y_2$​: numero sopra la mediana
Ogni campione:
- è sotto la mediana con probabilità $1/2$
- indipendente

➡ quindi:

$Y_1 = \sum_{i=1}^{n^{3/4}} X_i,\quad X_i \sim Bernoulli(1/2)$

*VALORI ATTESI*
 Per studiare $Y_1$​, definiamo per ogni campione estratto:
$X_i = \begin{cases} 1 & \text{se l’i-esimo campione è } \le m \\ 0 & \text{altrimenti} \end{cases}$
dove $m$ è la mediana vera di $S$
$E[Y_1] = \frac{1}{2}n^{3/4}$
$Var[Y_1] = \frac{1}{4}n^{3/4}$
*EVENTI DI FALLIMENTO*
L’algoritmo fallisce se succede uno tra:
- $E_1: Y_1 < \frac{1}{2}n^{3/4} - \sqrt{n}$
	- $E1​:$ nel campione ci sono troppo pochi elementi sotto la mediana, quindi il marcatore $d$ viene scelto troppo in alto.
- $E_2: Y_2 < \frac{1}{2}n^{3/4} - \sqrt{n}$
	- $E2​:$ nel campione ci sono troppo pochi elementi sopra la mediana, quindi il marcatore $u$ viene scelto troppo in basso.
- $E_3: |C| > 4n^{3/4}$
	- $E3​:$ l’intervallo $[d,u]$ risulta troppo grande, quindi l’insieme $C$
	- contiene troppi elementi e non può essere gestito in tempo lineare.

BOUND DI $E_1$

Usiamo Chebyshev:
$Pr(|Y_1 - E[Y_1]| \ge \sqrt{n}) \le \frac{Var[Y_1]}{n}$
Sostituisco:
$\frac{Var[Y_1]}{n} = \frac{n^{3/4}/4}{n} = \frac{1}{4}n^{-1/4}$
➡ quindi:
- $Pr(E_1) \le \frac{1}{4}n^{-1/4}$
Per simmetria:
- $Pr(E_2) \le \frac{1}{4}n^{-1/4}$
Unione:
- $Pr(E_1 \cup E_2) \le \frac{1}{2}n^{-1/4}$

L'evento $E_3$ si verifica se l'insieme dei candidati $C$ è troppo grande ($|C| > 4n^{3/4}$). Se $C$ è troppo grande, l'ordinamento finale non sarebbe più efficiente. **Logica della dimostrazione:** Perché $|C|$ sia maggiore di $4n^{3/4}$, deve accadere che i pivot $d$ e $u$ siano finiti "troppo lontano" dalla mediana reale. In particolare, definiamo due sotto-eventi:
1. **$\mathcal{E}_{3,1}$**: 
2. Almeno $2n^{3/4}$ elementi di $C$ sono più grandi della mediana (ovvero $u$ è troppo a destra).
**$\mathcal{E}_{3,2}$**: Almeno $2n^{3/4}$ elementi di $C$ sono più piccoli della mediana (ovvero $d$ è troppo a sinistra). Se $|C| > 4n^{3/4}$, allora almeno uno di questi due eventi deve essersi verificato. La probabilità che si verifichi $\mathcal{E}_{3,1}$ (vale lo stesso per $\mathcal{E}_{3,2}$) è 
$$\Pr(\mathcal{E}_{3,1}) \leq \frac{Var[X]}{(\sqrt{n})^2} = \frac{\frac{1}{4}n^{3/4}}{n} = \frac{1}{4}n^{-1/4}$$
*PROBABILITÀ FINALE*
- $Pr(\text{fallimento}) \le Pr(E_1)+Pr(E_2)+Pr(E_3) \le n^{-1/4}$

- $Pr(\text{successo}) \ge 1 - n^{-1/4}$

*CORRETTEZZA*
- Se l’algoritmo non fallisce:
    - la mediana è sicuramente in $C$
    - la posizione corretta viene calcolata esattamente
- Quindi:
    - **risultato corretto quando non fallisce**
*TIPO DI ERRORE*
- possibile:
    - restituisce FAIL
- impossibile:
    - restituire una mediana sbagliata
*RIDUZIONE DELL’ERRORE*
- Ripeto l’algoritmo indipendentemente
- probabilità fallimento dopo $t$ tentativi:
- $(n^{-1/4})^t = n^{-t/4}$
➡ decresce esponenzialmente
#### RANDOMIZED ALGORITHMS
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

#### ALGORITMI
##### CONTENTION RESOLUTION IN A DISTRIBUTED SYSTEM
PROBLEMA*
- Hai $n$ processi $P_1, \dots, P_n$
- tutti vogliono accedere a **una risorsa condivisa** database
⚠️ Regola critica:
- se **2 o più processi accedono insieme → collisione → nessuno passa**
- i processi **non possono comunicare tra loro**

*IDEA CHIAVE*
 Questo è fondamentale: niente coordinazione → serve rompere la simmetria
determinismo = ❌
Se tutti fanno la stessa cosa:
- o entrano tutti → collisione
- o nessuno entra → stallo
*STRATEGIA PROBABILISTICA*
Ogni processo, ad ogni tempo $t$:
- prova ad accedere con probabilità
$p = \frac{1}{n}$

Si definisce $S(i,t)$ l’evento in cui il processo i-esimo riesce ad accedere al database al tempo $t$.
Un processo $i$ ha successo se:
1. lui prova (probabilità $p$)
2. tutti gli altri NON provano (probabilità $(1-p)^{n-1}$)

*ANALISI*
Teorema 3.1
Quindi:
$Pr[S(i,t)] = p \cdot (1-p)^{n-1}$
$Pr[S(i,t)] = \frac{1}{n} \left(1 - \frac{1}{n}\right)^{n-1}$
il termine
$\left(1 - \frac{1}{n}\right)^{n-1}$
sta tra:
$\frac{1}{e} \quad \text{e} \quad \frac{1}{2}$
poiché la funzione è decrescente, a infinito diventa $1/e$ per il limite notevole
come valore massimo si ha $1/2$ 
La probabilità di successo quindi
$\frac{1}{e \cdot n} \le Pr[S(i,t)] \le \frac{1}{2n}$
- ogni round ha **probabilità ≈ $1/n$** di far passare un processo
Se ripeti il processo:
- probabilità che un processo **NON riesca mai** dopo $t$ round:
$(1 - \frac{1}{en})^t$
Dal Teorema 3.1, in ogni round il processo $i$ ha probabilità di successo almeno
$\frac{1}{en}$.
Quindi in un round la probabilità di fallire è al più
$1-\frac{1}{en}$
*TEOREMA 3.2*
Teorema 3.2. La probabilità che l'evento $i$-esimo fallisca ad accedere al database in $en$ tentativi $\le \frac{1}{e}$. Dopo $en(c \log n)$ tentativi, la probabilità $\le \frac{1}{n^c}$
*Dimostrazione.* Sia $F_{i,t}$ l'evento in cui il processo $i$ fallisce fallisce nell'accesso al database nei round $1, \dots, t$. Poiché i tentativi sono indipendenti tra di loro, si ha che
$\Pr[F_{i,t}] \le \left( 1 - \frac{1}{en} \right)^t$
Per cui scegliendo $t = \lceil en \rceil$ si ha
$\Pr[F_{i,t}] \le \left( 1 - \frac{1}{en} \right)^{\lceil en \rceil} \le \left( 1 - \frac{1}{en} \right)^{en} \le \frac{1}{e}$
Scegliendo $t = \lceil en \rceil \cdot \lceil c \log n \rceil$ si ha
$\Pr[F_{i,t}] \le \left( \frac{1}{e} \right)^{c \log n} = \frac{1}{n^c}$

*PROBABILITÀ GLOBALE DI SUCCESSO*
Dati questi teoremi come base, è possibile definire la probabilità per cui tutti i processi abbiano successo in $2e n \log n$ tentativi $\Pr[\text{Successo}] \ge 1 - \frac{1}{n}$

*Dimostrazione.* Sia $F_t$ l'evento in cui almeno uno degli $n$ processi fallisce nell'accesso nei tentativi $1, \dots, t$
$\Pr[F_t] = \Pr \left[ \bigcup_{i=1}^n F_{i,t} \right] \le$
(Per union bound 1.1) $\le \sum_{i=1}^n \Pr[F_{i,t}] \le n \left(1 - \frac{1}{en}\right)^t$

Inoltre per $t = 2e n \log n$ tentativi ($c = 2$), per il teorema precedente
$\Pr[F_{i,t}] \le n \cdot \left( \frac{1}{e} \right)^{2 \log n} = \frac{1}{n^2}$

Concludendo
$\Pr[F_t] \le n \cdot \frac{1}{n^2} = \frac{1}{n}$
Ricorda: Union bound è la probabilità dell'unione che diventa una sommatoria degli eventi
##### LOAD BALANCING
*PROBLEMA*
- Abbiamo un sistema in cui $m$ lavori arrivano in uno stream e devono essere processati immediatamente.
- Sono disponibili $n$ processori identici.
- Bisogna assegnare ogni job a un processore cercando di bilanciare il carico.
- **Caso Centralizzato**: Si userebbe *round-robin*, ottenendo un carico di $\lceil m/n \rceil$.
- **Caso Decentralizzato**: Non c’è coordinazione $\rightarrow$ ogni job sceglie un processore **uniformemente a caso**.
*IDEA CHIAVE*
- La randomizzazione sostituisce il coordinamento esplicito.
- **Domanda**: Qual è il carico massimo ($MaxLoad$) di un singolo processore?
- Ci aspettiamo che, anche senza coordinazione, nessun processore sia "troppo" carico.
*PARAMETRI*
- $m = n$ (caso critico analizzato)
- $X_i$: carico del processore $i$-esimo.
- $Y_{ij}$: variabile indicatrice (1 se il job $j$ va al processore $i$, 0 altrimenti).
- $\mu = E[X_i] = 1$ (carico medio).
*ALGORITMO*
1. Per ogni job $j = 1 \dots n$:
2. Scegli $i \in \{1, \dots, n\}$ a caso.
3. Assegna job $j$ a $i$.
4. Costo: $O(n)$ totale.
*ANALISI PROBABILISTICA (Chernoff Bound)*
Vogliamo stimare la probabilità che un processore superi una soglia $c$.
Dalla formula di Chernoff:
$Pr[X_i > c] < \frac{e^{c-1}}{c^c} < \left( \frac{e}{c} \right)^c$

**Scelta strategica di $c$:**
Poniamo $c = e \cdot \gamma(n)$
dove $\gamma(n)$ è definita dalla relazione $\gamma(n)^{\gamma(n)} = n$.
*Nota:* Asintoticamente $\gamma(n) \approx \frac{\ln n}{\ln \ln n}$.
*DIMOSTRAZIONE (Sviluppo algebrico)*
Sostituiamo $c = e \cdot \gamma$ nel bound:
$Pr[X_i > c] \le \left( \frac{e}{e\gamma} \right)^{e\gamma} = \left( \frac{1}{\gamma} \right)^{e\gamma}$

**Passaggio ai logaritmi:**
Usiamo l'identità $a^b = e^{b \ln a}$:
$(1/\gamma)^{e\gamma} = \left( e^{\ln(1/\gamma)} \right)^{e\gamma} = e^{e\gamma \cdot \ln(1/\gamma)} = e^{-e\gamma \ln(\gamma)}$ **(I)**

**Analisi dell'esponente:**
Sostituendo $\gamma(n) \approx \frac{\ln n}{\ln \ln n}$:
$e \cdot \left( \frac{\ln n}{\ln \ln n} \right) \cdot \ln \left( \frac{\ln n}{\ln \ln n} \right) = e \cdot \frac{\ln n}{\ln \ln n} \cdot [ \ln \ln n - \ln \ln \ln n ]$

Semplificando il termine $\ln \ln n$ al numeratore e denominatore:
$\approx e \cdot [ \ln n - \ln \ln \ln n ]$

**Riscrittura finale:**
Per $\gamma \ge 2$, si dimostra che:
$(I) \le e^{-\frac{e \gamma}{2} \ln n} \implies (I) \le \frac{1}{n^2}$
*UNION BOUND E CONCLUSIONE*
Per ottenere il risultato su **tutti** i processori simultaneamente, usiamo l'Union Bound:
$Pr[\exists i : X_i > c] \le \sum_{i=1}^{n} Pr[X_i > c]$
$Pr[MaxLoad > c] \le n \cdot \frac{1}{n^2} = \frac{1}{n}$
**Risultato finale:**
Con probabilità almeno $1 - \frac{1}{n}$, il carico massimo è:
$MaxLoad = O(e \cdot \gamma(n)) = \Theta\left( \frac{\ln n}{\ln \ln n} \right)$
*CORRETTEZZA E ERRORE*
- **Correttezza**: Sempre corretto (tutti i lavori vengono assegnati).
- **Tipo di Errore**: Errore di "performance" (bilanciamento povero/evento raro).
- **Evento Raro**: Con probabilità $1/n$ il carico massimo supera la soglia teorica.
*ESTENSIONE: MANY JOBS ($m = 16n \ln n$)*
Se il numero di lavori aumenta molto rispetto ai processori:
- Carico medio: $\mu = 16 \ln n$
- Usando Chernoff standard, la probabilità che un processore devii dalla media crolla:
  $Pr[X_i > 2\mu] \le e^{-\mu/3} \approx n^{-5}$
- **Conclusione**: Con alta probabilità, ogni processore ha un carico tra $[\frac{1}{2}\mu, 2\mu]$
- Più lavori ci sono, più il sistema appare "bilanciato" in proporzione.

### FINDING SIMILAR ITEMS IN LARGE DATA SETS
## HASHING

### Hash Function

Una funzione hash è una funzione

h : U -> [0,n)

dove:

U è l’universo degli elementi possibili;

[0,n) = {0,1,...,n-1} è l’insieme degli slot, o bucket, in cui gli elementi vengono mappati;

n è il numero di possibili valori hash, cioè il numero di slot di arrivo.

L’idea è che U può essere molto grande, mentre [0,n) è molto più piccolo e gestibile. La funzione hash prende un elemento x appartenente all’universo U e lo trasforma in un valore h(x) compreso tra 0 e n-1.

Informalmente, una funzione hash viene usata per “randomizzare” i dati. Questo significa che, anche se gli elementi dell’universo possono avere una struttura particolare, dopo l’applicazione della funzione hash vogliamo che siano distribuiti sugli slot in modo il più possibile uniforme.

Le proprietà desiderate di una buona funzione hash sono tre.

Prima proprietà: h(x) dovrebbe essere il più casuale possibile.

Questo non significa necessariamente che h sia davvero una funzione completamente casuale, perché una funzione completamente casuale su un universo enorme sarebbe troppo costosa da memorizzare. Significa però che, dal punto di vista probabilistico, i valori h(x) dovrebbero comportarsi come se fossero ben distribuiti negli n slot disponibili.

Seconda proprietà: h(x) dovrebbe essere veloce da calcolare.

In un algoritmo, una funzione hash viene spesso valutata molte volte. Per esempio, in una tabella hash, ogni operazione di lookup, insert o delete richiede il calcolo di h(x). Se calcolare h(x) fosse costoso, perderemmo il vantaggio dell’hashing. Idealmente, il tempo per calcolare h(x) dovrebbe essere proporzionale al tempo necessario per leggere o accedere all’elemento x.

Terza proprietà: h dovrebbe occupare poco spazio.

Una funzione davvero casuale h : U -> [0,n) dovrebbe specificare, per ogni elemento x in U, il valore h(x). Se U è enorme, questo richiederebbe troppo spazio. Per questo motivo, invece di usare funzioni completamente casuali, si usano famiglie di funzioni hash descritte da pochi parametri. Idealmente, una funzione hash dovrebbe richiedere O(1) parole di memoria, oppure comunque uno spazio molto piccolo rispetto alla dimensione di U.

Il problema centrale dell’hashing è quindi questo: vogliamo funzioni che si comportino “abbastanza casualmente”, ma che siano allo stesso tempo efficienti da calcolare e compatte da memorizzare.

### Family of Hash Functions

Una famiglia di funzioni hash H è un insieme di funzioni hash aventi tutte lo stesso dominio e codominio.

Formalmente, se consideriamo funzioni hash del tipo

h : U -> [0,n)

allora una famiglia di funzioni hash è un sottoinsieme dell’insieme di tutte le possibili funzioni da U a [0,n):

H ⊆ [0,n)^U

La notazione [0,n)^U indica l’insieme di tutte le funzioni che mappano ogni elemento di U in un valore di [0,n). Quindi H non è una singola funzione, ma un insieme di funzioni possibili.

Quando si usa una famiglia hash in un algoritmo randomizzato, di solito l’algoritmo sceglie una funzione h in modo uniforme casuale dalla famiglia H. Questa scelta si indica con:

h ∈u H

cioè: h è scelta uniformemente a caso tra tutte le funzioni appartenenti alla famiglia H.

Questo punto è importante. La probabilità non è sul singolo elemento x, ma sulla scelta della funzione h. Una volta scelta h, il valore h(x) è determinato. Tuttavia, prima di sapere quale funzione è stata scelta, h(x) può essere visto come una variabile aleatoria.

In altre parole, fissato un elemento x ∈ U, se scegliamo h ∈u H, allora h(x) è una variabile aleatoria che assume valori in [0,n).

Esempio intuitivo.

Supponiamo che U sia l’insieme degli ID utenti, e che [0,n) siano n bucket. Una famiglia hash H contiene tante possibili regole per assegnare utenti ai bucket. L’algoritmo sceglie casualmente una di queste regole. Una volta scelta la regola, ogni utente viene sempre mandato nello stesso bucket; però la scelta iniziale della regola è casuale.

Questa distinzione serve perché molte garanzie probabilistiche dell’hashing sono espresse nella forma:

scegliendo h ∈u H, qual è la probabilità che due elementi collidano?

oppure:

scegliendo h ∈u H, qual è la probabilità che h(x) assuma un certo valore y?

### Uniform Hashing

La nozione di uniformità formalizza l’idea che una funzione hash distribuisca gli elementi in modo perfettamente casuale sugli slot.

Sia U = {x1, x2, ..., xu} un universo di u elementi, con u = |U|. Consideriamo una famiglia H di funzioni hash h : U -> [0,n). Dire che H è uniforme, nel senso completamente casuale, significa che scegliendo h ∈u H, ogni possibile assegnamento degli elementi di U agli slot di [0,n) è equiprobabile.

Formalmente, per ogni scelta di valori

y1, y2, ..., yu ∈ [0,n)

deve valere:

Pr[h(x1)=y1, h(x2)=y2, ..., h(xu)=yu] = 1 / n^u

Il significato è il seguente.

Abbiamo u elementi dell’universo. Ogni elemento può essere mandato in uno degli n slot. Il numero totale di possibili assegnamenti è n^u, perché per ciascuno dei u elementi ci sono n scelte possibili. Se la funzione hash fosse completamente casuale, ciascuno di questi n^u assegnamenti avrebbe la stessa probabilità, cioè 1/n^u.

Questa definizione implica due cose:

per ogni singolo elemento x, h(x) è uniforme in [0,n);

per elementi diversi, i valori hash si comportano come scelte indipendenti.

Quindi, se H è completamente uniforme, allora per ogni x ∈ U e per ogni y ∈ [0,n):

Pr[h(x)=y] = 1/n

Inoltre, per due elementi distinti x1 ≠ x2 e due valori y1,y2 ∈ [0,n):

Pr[h(x1)=y1 e h(x2)=y2] = 1/n^2

Questa è la situazione ideale: ogni elemento è distribuito uniformemente e indipendentemente dagli altri.

Tuttavia, questa nozione è troppo forte per essere implementata in modo efficiente quando U è grande. Una funzione completamente casuale richiederebbe di memorizzare il valore h(x) per ogni x ∈ U. Per questo motivo, nella pratica si cercano famiglie hash più piccole, che non siano completamente casuali, ma che garantiscano comunque alcune proprietà probabilistiche sufficienti.

Questa esigenza porta alle famiglie k-indipendenti e alle famiglie universali.

### k-Independent Hash Families

La k-indipendenza è una versione più debole e più gestibile dell’uniformità completa.

L’idea è questa: invece di pretendere che tutti i valori hash degli elementi dell’universo siano indipendenti tra loro, richiediamo che lo siano solo gruppi di al massimo k elementi.

Sia H una famiglia di funzioni hash h : U -> [0,n). Diciamo che H è k-indipendente se, scegliendo h ∈u H, valgono le seguenti proprietà.

Prima proprietà: per ogni x ∈ U, h(x) è uniforme in [0,n).

Cioè, per ogni y ∈ [0,n):

Pr[h(x)=y] = 1/n

Seconda proprietà: per ogni scelta di k elementi distinti x1, x2, ..., xk ∈ U, le variabili aleatorie

h(x1), h(x2), ..., h(xk)

sono indipendenti e uniformi in [0,n).

In modo equivalente, per ogni scelta di k elementi distinti x1, ..., xk ∈ U e per ogni scelta di valori y1, ..., yk ∈ [0,n), vale:

Pr[h(x1)=y1 ∧ h(x2)=y2 ∧ ... ∧ h(xk)=yk] = 1 / n^k

Questa formula dice che la k-tupla

(h(x1), h(x2), ..., h(xk))

è distribuita uniformemente in [0,n)^k.

Il numero totale di possibili k-tuple di valori hash è n^k, perché ciascuno dei k elementi può assumere n valori. Se la famiglia è k-indipendente, ciascuna di queste n^k combinazioni ha probabilità esattamente 1/n^k.

Casi particolari.

1-indipendenza.

Una famiglia è 1-indipendente se per ogni elemento x ∈ U, h(x) è uniforme in [0,n). Questo garantisce solo che ogni singolo elemento venga distribuito bene sugli slot. Non dice nulla su come si comportano due elementi insieme.

2-indipendenza.

Una famiglia è 2-indipendente se per ogni coppia di elementi distinti x1 ≠ x2, i valori h(x1) e h(x2) sono indipendenti e uniformi. Formalmente:

Pr[h(x1)=y1 ∧ h(x2)=y2] = 1/n^2

Questa proprietà è molto importante perché permette di controllare le collisioni tra coppie di elementi. Infatti, se due valori hash si comportano come due scelte casuali indipendenti in [0,n), allora la probabilità che coincidano sarà circa 1/n.

k-indipendenza.

Una famiglia è k-indipendente se ogni gruppo di k elementi distinti ha valori hash indipendenti e uniformi. Questo è più forte della 2-indipendenza, ma più debole della completa casualità.

Indipendenza completa.

Se la proprietà vale per tutti gli elementi dell’universo, cioè se possiamo prendere k = |U|, allora la famiglia si comporta come una famiglia completamente uniforme. In questo caso, tutti i valori hash degli elementi di U sono mutualmente indipendenti.

Interpretazione da esame.

La k-indipendenza serve a bilanciare due esigenze opposte.

Da un lato, vorremmo funzioni hash completamente casuali, perché danno le migliori garanzie probabilistiche.

Dall’altro lato, non possiamo permetterci di memorizzare una funzione completamente casuale su un universo enorme.

Le famiglie k-indipendenti sono un compromesso: non garantiscono casualità totale, ma garantiscono casualità sufficiente su ogni sottoinsieme di k elementi. In molte analisi probabilistiche, specialmente quelle basate su collisioni tra coppie, è sufficiente avere 2-indipendenza.

In sintesi: una famiglia k-indipendente è una famiglia di funzioni hash in cui, se scegliamo casualmente una funzione h, allora i valori hash di qualunque k elementi distinti si comportano come k estrazioni indipendenti e uniformi dagli n slot.
## HASHING

### Universal Hashing

Dopo aver introdotto l’idea di k-indipendenza, passiamo a una nozione più debole ma molto importante: l’hashing universale.

La k-indipendenza richiede che i valori hash di k elementi distinti si comportino come variabili aleatorie indipendenti e uniformi. Questa è una proprietà forte. L’universalità, invece, richiede soltanto di controllare la probabilità di collisione tra due elementi distinti.

Ricordiamo che una collisione avviene quando due elementi diversi dell’universo vengono mappati nello stesso slot.

Siano x1, x2 ∈ U con x1 ≠ x2. Si ha collisione se:

h(x1) = h(x2)

Una famiglia di funzioni hash H, con funzioni h : U -> [0,n), è detta universale se, scegliendo h uniformemente a caso da H, per ogni coppia di elementi distinti x1, x2 ∈ U vale:

Pr[h(x1) = h(x2)] ≤ 1/n

dove n è il numero di slot di arrivo della funzione hash.

Questa definizione va letta con attenzione. La probabilità è presa rispetto alla scelta casuale della funzione h ∈u H. Gli elementi x1 e x2 sono fissati, mentre la funzione hash è scelta a caso dalla famiglia H.

L’idea è la seguente: se avessimo una funzione hash veramente casuale, allora h(x1) sarebbe distribuito uniformemente in [0,n), e anche h(x2) sarebbe distribuito uniformemente. Fissato il valore h(x1), la probabilità che h(x2) cada esattamente nello stesso slot sarebbe 1/n.

Quindi il valore 1/n rappresenta la probabilità di collisione che ci aspettiamo nel caso ideale di hashing completamente casuale.

Una famiglia universale garantisce che, per ogni coppia di elementi distinti, la probabilità di collisione sia al massimo quella ideale.

È importante notare che l’universalità non dice che tutti i valori hash sono indipendenti tra loro. Dice solo che ogni coppia di elementi distinti collide con probabilità al più 1/n.

Quindi:

la completa uniformità è una proprietà molto forte;

la k-indipendenza è una proprietà intermedia;

l’universalità è una proprietà più debole, ma spesso sufficiente per analizzare collisioni e tabelle hash.

Interpretazione da esame.

Una famiglia hash universale è una famiglia di funzioni hash in cui nessuna coppia distinta di elementi ha una probabilità di collisione troppo alta. Questo permette di usare funzioni hash compatte e calcolabili efficientemente, mantenendo però un comportamento simile a quello di una funzione casuale per quanto riguarda le collisioni tra coppie.

### 2-Independence Implies Universality

Vediamo ora un risultato fondamentale: se una famiglia di funzioni hash è 2-indipendente, allora è anche universale.

Questo risultato è intuitivo: la 2-indipendenza dice che, per ogni coppia di elementi distinti, i due valori hash si comportano come due scelte indipendenti e uniformi in [0,n). Se due valori sono scelti indipendentemente e uniformemente tra n slot, allora la probabilità che coincidano è 1/n.

Teorema.

Sia H una famiglia di funzioni hash h : U -> [0,n). Se H è 2-indipendente, allora H è universale.

In altre parole, per ogni x1, x2 ∈ U con x1 ≠ x2, vale:

Pr[h(x1) = h(x2)] = 1/n

e quindi, in particolare:

Pr[h(x1) = h(x2)] ≤ 1/n

Dimostrazione.

Fissiamo due elementi distinti x1, x2 ∈ U.

Vogliamo calcolare:

Pr[h(x1) = h(x2)]

L’evento “h(x1) = h(x2)” può essere scomposto considerando tutti i possibili valori hash y ∈ [0,n). I due elementi collidono se esiste uno slot y tale che entrambi vengono mappati in y.

Quindi:

Pr[h(x1) = h(x2)]  
= Σ_{y ∈ [0,n)} Pr[h(x1) = y ∧ h(x2) = y]

A questo punto usiamo la 2-indipendenza.

Poiché H è 2-indipendente, per ogni coppia di elementi distinti x1, x2 e per ogni coppia di valori y1, y2 ∈ [0,n), vale:

Pr[h(x1) = y1 ∧ h(x2) = y2] = 1/n^2

Nel nostro caso stiamo ponendo y1 = y e y2 = y. Quindi, per ogni y ∈ [0,n):

Pr[h(x1) = y ∧ h(x2) = y] = 1/n^2

Sostituendo nella sommatoria:

Pr[h(x1) = h(x2)]  
= Σ_{y ∈ [0,n)} 1/n^2

Poiché gli slot possibili sono n, la sommatoria contiene n termini. Quindi:

Σ_{y ∈ [0,n)} 1/n^2 = n · 1/n^2 = 1/n

Otteniamo:

Pr[h(x1) = h(x2)] = 1/n

Dunque H è universale.

Spiegazione del passaggio centrale.

La parte più importante è capire perché sommiamo su y ∈ [0,n). La variabile y non rappresenta un elemento dell’universo U, ma uno slot, cioè un possibile valore hash. Poiché h(x1) e h(x2) appartengono a [0,n), anche il valore comune della collisione deve appartenere a [0,n).

Quindi l’evento di collisione viene diviso in n casi disgiunti:

entrambi finiscono nello slot 0;

entrambi finiscono nello slot 1;

entrambi finiscono nello slot 2;

...

entrambi finiscono nello slot n-1.

Questi eventi sono disgiunti, perché due valori hash non possono essere contemporaneamente uguali a due slot diversi. Per questo possiamo sommare le probabilità.

Interpretazione.

La 2-indipendenza è più forte dell’universalità. L’universalità richiede solo un limite superiore alla probabilità di collisione. La 2-indipendenza, invece, richiede che i due valori hash siano distribuiti come due variabili indipendenti e uniformi. Da questa proprietà segue automaticamente che la probabilità di collisione è 1/n.

Quindi:

2-indipendenza => universalità

ma non necessariamente il contrario. Una famiglia può essere universale senza essere 2-indipendente.

### Expected Number of Collisions

Una delle ragioni principali per cui l’hashing universale è utile è che permette di controllare il numero atteso di collisioni.

Consideriamo una tabella hash con n slot e un insieme S ⊆ U di elementi da memorizzare. Sia |S| = k. Fissiamo un elemento u ∈ S e vogliamo stimare quanti elementi di S finiscono nello stesso slot di u.

In altre parole, vogliamo capire quanto è lunga, in media, la lista di trabocco associata allo slot h(u).

Teorema.

Sia H una famiglia di funzioni hash universali, con funzioni h : U -> [0,n). Sia S ⊆ U un insieme di k elementi, e sia u ∈ S un elemento fissato.

Si sceglie h ∈u H.

Sia X la variabile aleatoria che conta il numero di elementi s ∈ S tali che:

h(s) = h(u)

Allora:

E[X] ≤ 1 + k/n

Più precisamente, se separiamo u dagli altri elementi, si può scrivere anche:

E[X] ≤ 1 + (k-1)/n

e quindi certamente:

E[X] ≤ 1 + k/n

Dimostrazione.

Fissiamo u ∈ S.

Per ogni elemento s ∈ S, definiamo una variabile aleatoria indicatrice Xs nel modo seguente:

Xs = 1 se h(s) = h(u)

Xs = 0 altrimenti

Quindi Xs indica se l’elemento s collide con u, cioè se s viene mandato nello stesso slot di u.

La variabile X che conta il numero totale di elementi di S mappati nello stesso slot di u è:

X = Σ_{s ∈ S} Xs

Infatti, per ogni s ∈ S, Xs contribuisce 1 se s è nello stesso bucket di u, e contribuisce 0 altrimenti. Sommando tutte queste variabili indicatrici, otteniamo il numero totale di elementi nel bucket di h(u), contando anche u stesso.

Ora calcoliamo il valore atteso di X.

Per linearità del valore atteso:

E[X] = E[Σ_{s ∈ S} Xs] = Σ_{s ∈ S} E[Xs]

Poiché Xs è una variabile indicatrice, il suo valore atteso coincide con la probabilità che valga 1:

E[Xs] = Pr[Xs = 1] = Pr[h(s) = h(u)]

Quindi:

E[X] = Σ_{s ∈ S} Pr[h(s) = h(u)]

A questo punto separiamo il caso s = u dal caso s ≠ u.

Se s = u, allora:

Pr[h(u) = h(u)] = 1

perché ogni elemento ha sempre lo stesso valore hash di sé stesso.

Quindi:

E[X] = 1 + Σ_{s ∈ S, s ≠ u} Pr[h(s) = h(u)]

Ora usiamo l’universalità della famiglia H.

Per ogni s ≠ u, poiché H è universale, vale:

Pr[h(s) = h(u)] ≤ 1/n

Dato che ci sono k-1 elementi s ∈ S diversi da u, otteniamo:

Σ_{s ∈ S, s ≠ u} Pr[h(s) = h(u)] ≤ (k-1) · 1/n

Quindi:

E[X] ≤ 1 + (k-1)/n

e, semplificando con un bound leggermente più largo:

E[X] ≤ 1 + k/n

Questo conclude la dimostrazione.

Spiegazione.

Il termine 1 compare perché stiamo contando anche l’elemento u stesso. Infatti u è sempre nel bucket h(u), quindi contribuisce sempre 1 al conteggio.

Il termine k/n rappresenta invece il contributo atteso delle collisioni con gli altri elementi dell’insieme S. Ogni altro elemento ha probabilità al più 1/n di collidere con u. Sommando questo contributo su circa k elementi, otteniamo un valore atteso dell’ordine di k/n.

Conseguenza per le tabelle hash.

Supponiamo di avere una tabella hash con n slot e di memorizzare k elementi, con k = Θ(n). Cioè il numero di elementi è proporzionale al numero di slot.

Allora:

k/n = Θ(1)

e quindi:

E[X] ≤ 1 + Θ(1) = O(1)

Questo significa che la lunghezza attesa della lista di trabocco del bucket di un elemento fissato è costante.

Di conseguenza, se usiamo hashing universale e liste di trabocco, operazioni come lookup, insert e delete hanno tempo atteso O(1), assumendo che il calcolo della funzione hash costi O(1).

Interpretazione da esame.

L’hashing universale non garantisce che non ci siano collisioni. Le collisioni possono esistere. Tuttavia garantisce che, in media, nessun elemento abbia troppi altri elementi che collidono con lui, purché il numero di slot sia proporzionale al numero di elementi inseriti.

Questo è il motivo per cui le tabelle hash con funzioni universali e liste di trabocco hanno tempo atteso costante per operazione.
## EXAMPLES OF UNIVERSAL HASH FAMILIES

### Example 1: Dot Product Modulo Prime

Dopo aver definito le famiglie hash universali, vogliamo costruire un esempio concreto di famiglia universale.

L’obiettivo è definire una famiglia di funzioni hash H tale che, scegliendo una funzione h in modo uniforme dalla famiglia, la probabilità di collisione tra due elementi distinti sia piccola.

In particolare, vogliamo ottenere una garanzia del tipo:

per ogni x diverso da y, Pr[h(x) = h(y)] <= 1/m

dove m è il numero di possibili valori hash.

L’idea dell’esempio è rappresentare ogni elemento dell’universo come un vettore di cifre e poi calcolare una combinazione lineare casuale delle sue componenti modulo un numero primo.

Si sceglie un numero primo m. La scelta di m primo è fondamentale perché lavoreremo modulo m, cioè nell’insieme Z_m. Quando m è primo, Z_m è un campo: questo significa che ogni elemento non nullo di Z_m ammette inversa moltiplicativa.

Questa proprietà sarà essenziale nella dimostrazione di universalità.

Ogni elemento x dell’universo U viene rappresentato come una sequenza di r cifre in base m:

x = (x1, x2, ..., xr)

dove ogni xi appartiene a [m], cioè xi ∈ {0,1,...,m-1}.

Il parametro r indica il numero di cifre necessarie per rappresentare gli elementi dell’universo nella base m. Se l’universo contiene |U| elementi, allora bisogna scegliere r tale che:

m^r >= |U|

perché con r cifre in base m possiamo rappresentare m^r possibili elementi.

Ora scegliamo un vettore di coefficienti:

a = (a1, a2, ..., ar)

dove ogni ai appartiene a [m].

Il vettore a è scelto uniformemente a caso. In altre parole, scegliere una funzione hash della famiglia equivale a scegliere casualmente i coefficienti a1, ..., ar.

Definiamo quindi la funzione hash associata al vettore a:

h_a(x) = (Σ_{i=1}^r a_i x_i) mod m

cioè:

h_a(x) = (a1x1 + a2x2 + ... + arxr) mod m

Questa funzione prende il vettore x, calcola il prodotto scalare tra a e x, e poi riduce il risultato modulo m.

La famiglia di funzioni hash è:

H_bar = {h_a : a ∈ [m]^r}

Cioè H_bar contiene tutte le funzioni ottenibili scegliendo un vettore a di r coefficienti modulo m.

Scegliere h ∈u H_bar significa scegliere a ∈u [m]^r.

Quindi la casualità della funzione hash deriva dalla scelta casuale del vettore a.

Interpretazione.

Questa costruzione può essere vista come una versione modulare del prodotto scalare. Ogni funzione hash corrisponde a una diversa scelta casuale del vettore a. Due elementi x e y collidono se il loro prodotto scalare con a dà lo stesso risultato modulo m.

Il punto della dimostrazione sarà mostrare che, fissati due elementi distinti x e y, ci sono pochi vettori a che causano collisione. Più precisamente, fissati tutti i coefficienti tranne uno, esiste al massimo un valore del coefficiente rimanente che produce collisione.

Da questo seguirà che la probabilità di collisione è al più 1/m.

### Universality of H_bar

Teorema.

La famiglia H_bar definita da:

h_a(x) = (Σ_{i=1}^r a_i x_i) mod m

è una famiglia hash universale.

Più precisamente, per ogni coppia di elementi distinti x,y ∈ U, vale:

Pr[h_a(x) = h_a(y)] <= 1/m

dove la probabilità è presa rispetto alla scelta uniforme di a ∈ [m]^r.

Dimostrazione.

Siano:

x = (x1, x2, ..., xr)

e

y = (y1, y2, ..., yr)

due elementi distinti dell’universo U.

Poiché x e y sono distinti, allora non possono avere tutte le componenti uguali. Quindi esiste almeno un indice j tale che:

x_j ≠ y_j

Questo indice j sarà usato per isolare un coefficiente casuale, cioè a_j.

Vogliamo calcolare la probabilità che x e y collidano, cioè:

Pr[h_a(x) = h_a(y)]

La collisione avviene se:

h_a(x) = h_a(y)

Per definizione di h_a, questo significa:

(Σ_{i=1}^r a_i x_i) mod m = (Σ_{i=1}^r a_i y_i) mod m

Equivalentemente:

Σ_{i=1}^r a_i x_i ≡ Σ_{i=1}^r a_i y_i mod m

Portiamo tutti i termini da una parte o, in modo equivalente, isoliamo il termine relativo all’indice j.

Scriviamo separatamente il contributo dell’indice j:

a_j x_j + Σ_{i≠j} a_i x_i ≡ a_j y_j + Σ_{i≠j} a_i y_i mod m

Spostiamo il termine con a_j da un lato e tutti gli altri termini dall’altro:

a_j(y_j - x_j) ≡ Σ_{i≠j} a_i(x_i - y_i) mod m

A questo punto introduciamo due abbreviazioni:

z = y_j - x_j

e

α = Σ_{i≠j} a_i(x_i - y_i)

La condizione di collisione diventa:

a_j z ≡ α mod m

Ora osserviamo il punto cruciale.

Poiché x_j ≠ y_j, allora:

z = y_j - x_j ≠ 0 mod m

Infatti x_j e y_j sono due cifre distinte in [m], quindi la loro differenza non è congrua a zero modulo m.

Poiché m è primo, Z_m è un campo. Quindi ogni elemento non nullo di Z_m ha un’inversa moltiplicativa. In particolare, z ha un’inversa z^{-1} tale che:

z · z^{-1} ≡ 1 mod m

Moltiplichiamo entrambi i lati dell’equazione:

a_j z ≡ α mod m

per z^{-1}:

a_j z z^{-1} ≡ α z^{-1} mod m

Poiché z z^{-1} ≡ 1 mod m, otteniamo:

a_j ≡ α z^{-1} mod m

Questa equazione determina un unico valore possibile di a_j modulo m.

Ora ragioniamo probabilisticamente.

La funzione h_a viene scelta scegliendo uniformemente il vettore a = (a1,...,ar). Supponiamo di fissare tutti i coefficienti a_i con i ≠ j.

Una volta fissati questi coefficienti, il valore α è fissato.

A quel punto, affinché ci sia collisione tra x e y, il coefficiente a_j deve assumere esattamente il valore:

a_j ≡ α z^{-1} mod m

Ma a_j è scelto uniformemente tra m possibili valori:

0,1,...,m-1

Quindi la probabilità che a_j sia proprio quell’unico valore è:

1/m

Pertanto:

Pr[h_a(x) = h_a(y)] <= 1/m

Questo vale per ogni coppia x ≠ y. Quindi H_bar è universale.

Spiegazione del ruolo di Z_m.

Il passaggio più delicato della dimostrazione è la “divisione” per z.

Nel calcolo modulare non si divide nel senso usuale. Per eliminare z dall’equazione:

a_j z ≡ α mod m

bisogna moltiplicare per l’inversa moltiplicativa di z.

L’inversa moltiplicativa di z è un elemento z^{-1} tale che:

z · z^{-1} ≡ 1 mod m

Questa inversa esiste per ogni z ≠ 0 solo perché m è primo. Quando m è primo, Z_m è un campo, e in un campo ogni elemento non nullo è invertibile.

Senza questa proprietà, non potremmo concludere che esiste un unico valore di a_j che causa collisione.

Interpretazione da esame.

Per dimostrare che H_bar è universale, fissiamo due elementi distinti x e y. Poiché sono distinti, differiscono in almeno una coordinata j. La condizione di collisione h_a(x)=h_a(y) può essere riscritta come un’equazione lineare nel coefficiente casuale a_j.

Fissati tutti gli altri coefficienti, questa equazione ha una sola soluzione per a_j, perché stiamo lavorando modulo un primo m e quindi possiamo invertire il coefficiente non nullo y_j - x_j.

Siccome a_j è scelto uniformemente tra m valori, la probabilità di scegliere proprio l’unico valore che causa collisione è 1/m.

Quindi la famiglia è universale.

In sintesi.

La famiglia H_bar è universale perché, per ogni coppia di elementi distinti x e y, la collisione può avvenire solo per una scelta specifica di un coefficiente casuale. Poiché quel coefficiente è uniforme su m valori, la probabilità di collisione è al massimo 1/m.

## EXAMPLES OF UNIVERSAL HASH FAMILIES

### Example 2: Linear Hashing

Il secondo esempio di famiglia hash usa funzioni lineari modulo un numero primo.

L’idea è scegliere casualmente una funzione lineare del tipo:

ax + b

e poi calcolarla modulo un primo p. Successivamente, se vogliamo ottenere valori in un insieme più piccolo di slot, applichiamo anche una riduzione modulo m.

Sia p un numero primo sufficientemente grande. In particolare, assumiamo che p sia maggiore della dimensione dell’universo degli elementi che vogliamo hashare, in modo che ogni elemento x dell’universo possa essere visto come un elemento di Z_p.

Siano:

a ∈ Z_p^*

b ∈ Z_p

dove Z_p è l’insieme dei resti modulo p, mentre Z_p^* indica gli elementi non nulli di Z_p.

Quindi:

a può assumere p-1 valori possibili;

b può assumere p valori possibili.

La scelta di a diverso da 0 è importante perché vogliamo che la funzione lineare sia invertibile rispetto a x. Se a fosse uguale a 0, la funzione ax+b diventerebbe costante uguale a b, e quindi tutti gli elementi colliderebbero.

Definiamo prima il valore intermedio:

g_{a,b}(x) = (ax + b) mod p

Questa funzione mappa gli elementi in Z_p.

Se invece vogliamo ottenere una funzione hash con valori in [0,m), definiamo:

h_{a,b}(x) = [(ax + b) mod p] mod m

Quindi la funzione è composta da due passaggi:

prima si calcola ax+b modulo p;

poi si riduce il risultato modulo m.

La famiglia di funzioni è:

H_hat = {h_{a,b} : a ∈ Z_p^*, b ∈ Z_p}

o, se si considera la funzione intermedia in Z_p:

G = {g_{a,b} : a ∈ Z_p^*, b ∈ Z_p}

Questa costruzione può essere interpretata come una famiglia di polinomi casuali di grado 1 su Z_p.

Interpretazione.

Ogni funzione della famiglia è determinata dalla scelta casuale di due parametri:

a, che determina la “pendenza” della funzione lineare;

b, che determina lo “shift” o intercetta.

La casualità della funzione hash deriva quindi dalla scelta uniforme della coppia (a,b).

L’obiettivo è mostrare che questa famiglia distribuisce bene gli elementi e controlla le collisioni.

Per farlo si considerano due elementi distinti x e y e si studiano i valori:

X = (ax + b) mod p

Y = (ay + b) mod p

dove la probabilità è presa rispetto alla scelta casuale di a e b.

### 2-Independence and Universality

Teorema.

La famiglia delle funzioni lineari modulo p, definita da:

g_{a,b}(x) = (ax+b) mod p

con a ∈ Z_p^* e b ∈ Z_p scelti uniformemente, ha un comportamento pairwise indipendente sui valori in Z_p.

Inoltre, la famiglia:

h_{a,b}(x) = [(ax+b) mod p] mod m

è universale rispetto agli slot [0,m), cioè per ogni x ≠ y vale:

Pr[h_{a,b}(x) = h_{a,b}(y)] <= 1/m

L’idea della dimostrazione è questa:

prima si mostra che i valori intermedi X e Y sono ben distribuiti in Z_p;

poi si mostra che, fissato X, il valore Y è distribuito quasi uniformemente tra gli altri valori di Z_p;

infine si usa questa distribuzione per limitare la probabilità che X e Y diventino uguali dopo la riduzione modulo m.

Dimostrazione.

Siano x,y due elementi distinti, con x ≠ y.

Definiamo:

X = (ax+b) mod p

Y = (ay+b) mod p

Vogliamo studiare la probabilità che i due elementi collidano.

Prima osservazione: se x ≠ y, allora X ≠ Y.

Infatti:

X = Y

significa:

ax + b ≡ ay + b mod p

Sottraendo b da entrambi i lati:

ax ≡ ay mod p

Portando tutto da una parte:

a(x-y) ≡ 0 mod p

Poiché a ≠ 0 e p è primo, a ha inversa moltiplicativa in Z_p. Quindi possiamo moltiplicare per a^{-1} e ottenere:

x-y ≡ 0 mod p

cioè:

x ≡ y mod p

Ma gli elementi x e y sono distinti e sono rappresentati come valori minori di p. Quindi x ≡ y mod p implica x = y, contro l’ipotesi.

Dunque, per x ≠ y, si ha:

X ≠ Y

Questa osservazione dice che, prima della riduzione modulo m, due elementi distinti non vengono mai mandati nello stesso valore di Z_p dalla stessa funzione g_{a,b}, purché a ≠ 0.

Seconda osservazione: per ogni valore fissato i ∈ Z_p, la variabile X è uniforme in Z_p.

Infatti, fissato a, al variare uniforme di b, il valore:

X = ax + b mod p

assume tutti i valori di Z_p con la stessa probabilità.

Per ogni i ∈ Z_p, l’equazione:

ax + b ≡ i mod p

determina un unico valore di b:

b ≡ i - ax mod p

Poiché b è scelto uniformemente in Z_p, la probabilità che b assuma questo valore è:

1/p

Quindi:

Pr[X = i] = 1/p

Questo mostra che X è uniforme in Z_p. Lo stesso ragionamento vale anche per Y.

Terza osservazione: per x ≠ y, fissati due valori i,j ∈ Z_p con i ≠ j, esiste un’unica coppia (a,b) che soddisfa:

ax + b ≡ i mod p

ay + b ≡ j mod p

Vediamo perché.

Consideriamo il sistema:

ax + b ≡ i mod p

ay + b ≡ j mod p

Sottraendo la seconda equazione dalla prima:

a(x-y) ≡ i-j mod p

Poiché x ≠ y, abbiamo x-y ≠ 0 mod p. Siccome p è primo, x-y ha inversa moltiplicativa modulo p. Quindi a è determinato in modo unico:

a ≡ (i-j)(x-y)^{-1} mod p

Una volta determinato a, anche b è determinato in modo unico dalla prima equazione:

b ≡ i - ax mod p

Quindi, fissati x,y,i,j con x ≠ y e i ≠ j, esiste una sola coppia (a,b) che produce X=i e Y=j.

Poiché a può assumere p-1 valori e b può assumere p valori, il numero totale di possibili coppie (a,b) è:

(p-1)p

Dato che una sola coppia produce simultaneamente X=i e Y=j, si ottiene:

Pr[X=i ∧ Y=j] = 1 / ((p-1)p)

per i ≠ j.

Se invece i = j, la probabilità è 0, perché abbiamo già osservato che per x ≠ y non può accadere X = Y.

Da questo segue:

Pr[Y=j | X=i] = Pr[X=i ∧ Y=j] / Pr[X=i]

Poiché:

Pr[X=i] = 1/p

allora, per j ≠ i:

Pr[Y=j | X=i]  
= (1 / ((p-1)p)) / (1/p)  
= 1/(p-1)

Quindi, fissato X=i, il valore Y è distribuito uniformemente sui p-1 valori di Z_p diversi da i.

Questo è il senso della “quasi-indipendenza” negli appunti: Y non può essere uguale a X, quindi non è uniforme su tutti i p valori di Z_p, ma è uniforme sui p-1 valori rimanenti.

Passiamo ora alla funzione finale:

h_{a,b}(x) = X mod m

h_{a,b}(y) = Y mod m

Vogliamo mostrare che:

Pr[h_{a,b}(x) = h_{a,b}(y)] <= 1/m

La collisione dopo la riduzione modulo m avviene se:

X mod m = Y mod m

Fissiamo X=i. Vogliamo stimare la probabilità che:

Y ≡ i mod m

Dato X=i, sappiamo che Y è uniforme sui p-1 valori diversi da i.

Quanti valori j ∈ Z_p, con j ≠ i, soddisfano:

j ≡ i mod m ?

Sono i valori che hanno lo stesso resto di i modulo m. Tra i p elementi di Z_p, il numero di valori congruenti a i modulo m è circa p/m. Escludendo il valore i stesso, il numero di valori possibili è al massimo:

(p-1)/m

Quindi, usando lo union bound sui possibili valori j che hanno lo stesso resto modulo m di i:

Pr[Y ≡ i mod m | X=i]  
<= ((p-1)/m) · (1/(p-1))

Semplificando:

Pr[Y ≡ i mod m | X=i] <= 1/m

Poiché questo vale per ogni valore fissato i di X, concludiamo che:

Pr[h_{a,b}(x) = h_{a,b}(y)] <= 1/m

Quindi la famiglia H_hat è universale.

Spiegazione del passaggio finale.

Il punto non è che X e Y siano uguali in Z_p. Anzi, per x ≠ y sappiamo che X ≠ Y.

La collisione può avvenire solo dopo la riduzione modulo m.

Esempio: se m=10, allora 7 e 17 sono diversi come numeri, ma hanno lo stesso resto modulo 10. Quindi possono collidere dopo la riduzione modulo m.

La dimostrazione controlla proprio questa possibilità: fissato X=i, il valore Y è distribuito uniformemente tra i p-1 valori diversi da i. Tra questi, solo una frazione circa 1/m ha lo stesso resto di i modulo m. Quindi la probabilità di collisione finale è al più 1/m.

Interpretazione da esame.

Questa famiglia hash si costruisce scegliendo casualmente una funzione lineare modulo un primo p:

g_{a,b}(x) = ax+b mod p

con a diverso da 0.

Il fatto che p sia primo garantisce che Z_p sia un campo, quindi possiamo usare inverse moltiplicative e risolvere in modo unico le equazioni lineari modulo p.

Per due elementi distinti x e y, i valori intermedi:

X = ax+b mod p

Y = ay+b mod p

sono distribuiti in modo molto regolare: X è uniforme, e fissato X=i, Y è uniforme sui p-1 valori diversi da i. Questo permette di controllare quante possibilità portano a collisione dopo la riduzione modulo m.

Alla fine si ottiene:

Pr[h_{a,b}(x)=h_{a,b}(y)] <= 1/m

quindi la famiglia è universale.

In sintesi.

La famiglia lineare modulo p è utile perché è semplice da descrivere, efficiente da calcolare e possiede buone garanzie probabilistiche. La scelta casuale di a e b rende i valori hash ben distribuiti; il fatto che p sia primo permette di risolvere univocamente le equazioni modulari; la riduzione modulo m mantiene la probabilità di collisione sotto controllo.

## PERFECT RANDOMIZED HASHING

### Perfect Hash Function

Dopo aver studiato le famiglie hash universali, introduciamo il concetto di funzione hash perfetta.

Finora abbiamo accettato la possibilità di avere collisioni. Una collisione avviene quando due elementi distinti vengono mappati nello stesso valore hash:

h(x1) = h(x2), con x1 diverso da x2.

Nelle tabelle hash con liste di trabocco, le collisioni vengono gestite salvando nello stesso bucket più elementi. Tuttavia, in alcuni contesti vorremmo evitare del tutto le collisioni, almeno su un insieme specifico di elementi.

Questa idea porta alla definizione di funzione hash perfetta.

Definizione.

Sia A un sottoinsieme di [1,n]. Una funzione hash

h : [1,n] -> [0,M)

si dice perfetta su A se e solo se per ogni coppia di elementi distinti x1, x2 appartenenti ad A vale:

x1 diverso da x2 implica h(x1) diverso da h(x2).

Equivalentemente:

per ogni x1, x2 in A, se x1 diverso da x2, allora h(x1) non è uguale a h(x2).

Quindi h è perfetta su A se non produce collisioni tra gli elementi di A.

In termini matematici, dire che h è perfetta su A significa dire che h è iniettiva quando viene ristretta all’insieme A.

Attenzione: h non deve essere necessariamente perfetta su tutto l’universo [1,n]. Deve esserlo solo sull’insieme A che ci interessa.

Questo è un punto importante. Se l’universo è enorme, pretendere una funzione senza collisioni su tutto l’universo può essere troppo costoso o impossibile se il codominio è più piccolo del dominio. Invece, in molte applicazioni ci interessa memorizzare solo un sottoinsieme A degli elementi possibili. Allora possiamo cercare una funzione hash che sia perfetta su A.

Interpretazione.

Una funzione hash perfetta su A assegna a ogni elemento di A uno slot diverso. Quindi, se vogliamo memorizzare gli elementi di A in una tabella hash, non abbiamo bisogno di liste di trabocco: ogni bucket contiene al massimo un elemento.

Questo permette lookup molto efficienti, perché se vogliamo cercare un elemento x, calcoliamo h(x) e controlliamo direttamente quello slot.

Tuttavia, trovare deterministicamente una funzione perfetta può essere difficile. Per questo si usa spesso un approccio randomizzato: si sceglie casualmente una funzione da una famiglia universale e si dimostra che, con alta probabilità, questa funzione è perfetta sull’insieme A.

### Perfect Hashing with High Probability

Vogliamo ora dimostrare che, se scegliamo una funzione hash da una famiglia universale e il numero di slot M è abbastanza grande, allora la funzione scelta è perfetta con alta probabilità.

Teorema.

Sia H una famiglia universale di funzioni hash:

h : [1,n] -> [0,M)

e sia A un sottoinsieme di [1,n].

Se:

M >= n^{c+2}

per una costante c > 0, allora scegliendo h uniformemente a caso da H, la funzione h è perfetta su A con alta probabilità.

Più precisamente:

Pr[h è perfetta su A] >= 1 - n^{-c}

Dimostrazione.

Vogliamo calcolare la probabilità che h non sia perfetta su A.

La funzione h non è perfetta su A se esiste almeno una coppia di elementi distinti x1, x2 appartenenti ad A tale che:

h(x1) = h(x2)

Quindi l’evento negativo è:

esiste una collisione tra due elementi distinti di A.

Per ogni coppia distinta x1, x2 in A, definiamo l’evento:

E_{x1,x2} = “h(x1) = h(x2)”

Poiché H è una famiglia universale, per ogni coppia x1 diverso da x2 vale:

Pr[h(x1) = h(x2)] <= 1/M

cioè:

Pr[E_{x1,x2}] <= 1/M

Ora dobbiamo stimare la probabilità che esista almeno una collisione su A.

L’evento “esiste almeno una collisione” è l’unione di tutti gli eventi E_{x1,x2} sulle coppie distinte di elementi di A:

Pr[esiste almeno una collisione]  
= Pr[unione degli eventi E_{x1,x2}]

Non sappiamo se questi eventi siano indipendenti. Però non ci serve l’indipendenza, perché possiamo usare lo union bound.

Per lo union bound:

Pr[esiste almeno una collisione]  
<= somma su tutte le coppie distinte x1,x2 in A di Pr[E_{x1,x2}]

Ogni termine della somma è al massimo 1/M. Resta quindi da stimare quante coppie distinte ci sono in A.

Se |A| è la cardinalità di A, il numero esatto di coppie non ordinate distinte è:

|A|(|A|-1)/2.

Per semplicità, possiamo usare il bound più largo:

numero di coppie <= |A|^2.

Poiché A è un sottoinsieme di [1,n], vale:

|A| <= n

e quindi:

|A|^2 <= n^2.

Allora:

Pr[esiste almeno una collisione]  
<= |A|^2 · 1/M  
<= n^2/M.

A questo punto usiamo l’ipotesi sul numero di slot:

M >= n^{c+2}.

Quindi:

n^2/M <= n^2 / n^{c+2} = n^{-c}.

Otteniamo:

Pr[esiste almeno una collisione] <= n^{-c}.

Ma l’evento “h è perfetta su A” è il complementare dell’evento “esiste almeno una collisione su A”.

Quindi:

Pr[h è perfetta su A]  
= 1 - Pr[esiste almeno una collisione]

> = 1 - n^{-c}.

Dunque h è perfetta su A con alta probabilità.

Spiegazione del ruolo dello union bound.

Il punto chiave della dimostrazione è che vogliamo evitare tutte le collisioni contemporaneamente.

Per una singola coppia x1, x2, l’universalità ci dice che la probabilità di collisione è piccola:

al massimo 1/M.

Però A contiene molte coppie. Anche se ogni coppia collide con probabilità piccola, potrebbe esserci comunque qualche collisione da qualche parte.

Lo union bound permette di dire:

la probabilità che almeno una coppia collida è al massimo la somma delle probabilità di collisione di tutte le coppie.

Quindi il ragionamento è:

ogni coppia collide con probabilità al più 1/M;

le coppie sono al massimo n^2;

la probabilità totale di avere almeno una collisione è al massimo n^2/M;

scegliendo M abbastanza grande, cioè M >= n^{c+2}, questa probabilità diventa al massimo n^{-c}.

Interpretazione da esame.

Il perfect hashing randomizzato si basa su un’idea semplice: invece di costruire direttamente una funzione perfetta, scegliamo una funzione casuale da una famiglia universale e facciamo in modo che lo spazio dei bucket sia abbastanza grande.

Poiché la famiglia è universale, ogni singola coppia di elementi distinti collide con probabilità al più 1/M. Siccome ci sono al massimo n^2 coppie, per union bound la probabilità che ci sia almeno una collisione è al massimo n^2/M. Se scegliamo M >= n^{c+2}, questa probabilità diventa al massimo n^{-c}. Quindi, con probabilità almeno 1 - n^{-c}, non esiste nessuna collisione su A, e la funzione è perfetta.

In sintesi.

Una funzione hash perfetta su A è una funzione senza collisioni sugli elementi di A.

Se H è universale e il numero di slot M è sufficientemente grande, allora una funzione scelta uniformemente da H è perfetta su A con alta probabilità.

Il risultato deriva da tre ingredienti:

universalità: ogni coppia collide con probabilità al più 1/M;

numero di coppie: ci sono al massimo n^2 coppie;

union bound: la probabilità di almeno una collisione è al massimo n^2/M.

Scegliendo M >= n^{c+2}, otteniamo probabilità di fallimento al massimo n^{-c}.

## DICTIONARY PROBLEM

### Dictionary Definition

Il problema del dizionario è una delle applicazioni principali delle funzioni hash.

Dato un universo U di elementi possibili, vogliamo mantenere dinamicamente un sottoinsieme S ⊆ U.

L’universo U può essere molto grande. Per esempio, U potrebbe essere l’insieme di tutti i possibili ID, tutte le possibili stringhe, tutte le possibili chiavi, ecc. Tuttavia, in un certo momento, gli elementi effettivamente memorizzati sono solo quelli contenuti nel sottoinsieme S.

Indichiamo con:

n = |S|

il numero di elementi effettivamente presenti nel dizionario.

Un dizionario deve supportare efficientemente operazioni del tipo:

create(): inizializza un dizionario vuoto;

insert(u): inserisce l’elemento u ∈ U nel sottoinsieme S;

delete(u): rimuove l’elemento u da S;

lookup(u): verifica se u appartiene a S.

In altre parole, il dizionario deve mantenere un insieme dinamico S e deve permettere di chiedere rapidamente se un elemento appartiene a S.

La difficoltà principale nasce dal fatto che l’universo U può essere enorme.

Una soluzione banale sarebbe creare un array indicizzato direttamente dagli elementi di U. In questo caso, per ogni elemento u ∈ U avremmo una posizione dell’array che dice se u appartiene o no a S.

Questa soluzione avrebbe tempo O(1) per lookup, insert e delete, ma richiederebbe spazio O(|U|).

Il problema è che |U| può essere molto più grande di n = |S|. Quindi usare spazio proporzionale a |U| non è accettabile.

Vogliamo invece una struttura dati con spazio proporzionale al numero di elementi effettivamente memorizzati, cioè O(n).

Una soluzione deterministica classica è usare alberi bilanciati, come gli alberi AVL. Con questa soluzione si ottiene:

spazio O(n);

tempo O(log n) per operazione.

L’hashing permette invece una soluzione probabilistica con:

spazio O(n);

tempo atteso O(1) per operazione.

La parola “atteso” è importante: il tempo non è garantito sempre nel caso peggiore, perché possono esserci collisioni, ma il numero atteso di elementi da controllare rimane costante se la funzione hash è scelta bene.

### Hash Tables with Overflow Lists

La struttura hash classica usa un array H di dimensione m, dove m è scelto proporzionalmente al numero di elementi da memorizzare.

Di solito si sceglie:

m ≈ n

oppure più formalmente:

m = Θ(n)

L’array è:

H = [0,1,...,m-1]

Ogni posizione dell’array è chiamata slot o bucket.

Una funzione hash:

h : U -> [0,m)

assegna a ogni elemento u ∈ U uno slot h(u) della tabella.

Quando vogliamo inserire u, calcoliamo h(u) e memorizziamo u nella posizione H[h(u)].

Il problema è che due elementi distinti possono avere lo stesso valore hash.

Si ha una collisione quando:

h(u) = h(v), con u diverso da v.

Poiché il numero di possibili elementi dell’universo è molto più grande del numero di slot, le collisioni non possono essere escluse in generale.

Un modo standard per gestire le collisioni è usare liste di trabocco.

In questo schema, ogni posizione H[i] dell’array non contiene un singolo elemento, ma una lista collegata contenente tutti gli elementi che sono stati mappati nello slot i.

Quindi:

H[i] contiene tutti gli elementi u ∈ S tali che h(u)=i.

Se due elementi collidono, vengono semplicemente messi nella stessa lista.

Le operazioni funzionano così.

Per lookup(u):

si calcola i = h(u);

si scandisce la lista H[i];

se u viene trovato, si risponde che u ∈ S;

altrimenti si risponde che u ∉ S.

Per insert(u):

si calcola i = h(u);

si inserisce u nella lista H[i], eventualmente dopo aver controllato che non sia già presente.

Per delete(u):

si calcola i = h(u);

si cerca u nella lista H[i];

se u è presente, lo si rimuove.

Quindi il costo di ogni operazione dipende dalla lunghezza della lista H[h(u)].

Se la funzione hash distribuisce bene gli elementi di S sui bucket e se m = Θ(n), allora la lunghezza attesa di una lista è O(1).

Questo è esattamente il punto in cui entra in gioco il teorema sul numero atteso di collisioni.

Abbiamo dimostrato che, se H è una famiglia hash universale, S contiene k elementi e u ∈ S è fissato, allora il numero atteso di elementi che finiscono nello stesso bucket di u è:

E[X] <= 1 + k/m

dove m è il numero di slot.

Se scegliamo m = Θ(k), allora:

k/m = Θ(1)

e quindi:

E[X] = O(1).

Dunque, in media, per cercare un elemento dobbiamo scandire solo un numero costante di elementi nella lista di trabocco.

Conclusione:

con hashing universale e liste di trabocco, se il numero di slot è proporzionale al numero di elementi, le operazioni lookup, insert e delete hanno tempo atteso O(1).

### Static Hashing

Nel caso statico, l’insieme S degli elementi da memorizzare non cambia, oppure cambia raramente.

In questo contesto, si può usare anche una funzione hash deterministica semplice.

Per esempio, se ogni elemento u ∈ U è rappresentato come un intero, si può scegliere un numero primo p e definire:

h(u) = u mod p.

L’idea è che il modulo p distribuisca gli elementi sui possibili resti.

Questa tecnica può funzionare bene in situazioni statiche, quando l’insieme degli elementi è noto o non varia nel tempo.

Tuttavia, se S varia dinamicamente, una funzione deterministica fissata può comportarsi male. In particolare, un insieme di input sfavorevole potrebbe generare molte collisioni.

Per questo motivo, nelle applicazioni dinamiche è preferibile usare famiglie hash universali.

Scegliendo h ∈u H da una famiglia universale, otteniamo garanzie probabilistiche sulle collisioni indipendenti dalla struttura specifica degli elementi.

In pratica, la casualità viene spostata nella scelta della funzione hash.

### Dynamic Hashing and Rehashing

Quando l’insieme S cambia nel tempo, anche il numero n = |S| cambia.

Se il numero di elementi cresce molto ma la tabella rimane della stessa dimensione, le liste di trabocco diventano lunghe e le operazioni non sono più efficienti.

Se invece il numero di elementi diminuisce molto ma la tabella rimane grande, sprechiamo memoria.

Quindi dobbiamo adattare dinamicamente la dimensione della tabella hash.

L’idea è mantenere la dimensione della tabella proporzionale al numero di elementi correnti.

Se n cresce troppo, aumentiamo la dimensione della tabella.

Se n diminuisce troppo, riduciamo la dimensione della tabella.

Quando cambiamo la dimensione della tabella, però, non basta cambiare il valore m. Bisogna anche ricalcolare la posizione di tutti gli elementi già presenti, perché la funzione hash dipende dal numero di slot.

Questa operazione si chiama rehashing.

Rehashing significa:

scegliere una nuova dimensione della tabella;

scegliere eventualmente una nuova funzione hash;

reinserire tutti gli elementi nella nuova tabella calcolando i nuovi valori hash.

Il costo di un rehashing è O(n), perché bisogna spostare tutti gli elementi presenti.

Tuttavia, il rehashing non avviene a ogni operazione. Avviene solo quando la tabella diventa troppo piena o troppo vuota.

Per questo motivo il costo può essere ammortizzato sulle operazioni precedenti.

### Doubling/Halving Technique

La tecnica standard per gestire la dimensione dinamica della tabella è chiamata doubling/halving.

Si mantiene una grandezza N che rappresenta la capacità corrente o una stima della dimensione corretta della tabella.

Quando il numero di elementi n supera N, la tabella è considerata troppo piena. Allora si esegue un’espansione:

N <- 2N

si sceglie una nuova dimensione m = Θ(n), spesso un numero primo adatto;

si sceglie una nuova funzione hash;

si reinseriscono tutti gli elementi nella nuova tabella.

Questa operazione costa O(n), perché bisogna fare rehash di tutti gli elementi.

Quando invece il numero di elementi diventa troppo piccolo, ad esempio:

n < N/4

la tabella è considerata troppo vuota. Allora si esegue una contrazione:

N <- N/2

si sceglie una nuova dimensione m = Θ(n);

si sceglie una nuova funzione hash;

si reinseriscono tutti gli elementi.

Anche questa operazione costa O(n).

Lo schema è quindi:

in caso di espansione:

se n > N:

N <- 2N;

scegli una nuova tabella di dimensione Θ(n);

scegli una nuova funzione hash;

rehash di tutti gli elementi.

in caso di contrazione:

se n < N/4:

N <- N/2;

scegli una nuova tabella di dimensione Θ(n);

scegli una nuova funzione hash;

rehash di tutti gli elementi.

### Amortized Cost

Anche se un rehash costa O(n), non avviene frequentemente.

Per esempio, dopo un’espansione, la dimensione N viene raddoppiata. Prima che sia necessaria una nuova espansione, devono essere inseriti molti nuovi elementi.

Quindi il costo O(n) del rehashing può essere distribuito sulle molte operazioni di inserimento che lo hanno reso necessario.

Lo stesso ragionamento vale per la contrazione: si contrae solo quando il numero di elementi scende sotto una frazione della capacità, quindi non si contrae dopo ogni delete.

Per questo motivo, insert e delete hanno costo ammortizzato O(1), oltre al costo atteso O(1) dovuto alla lunghezza attesa delle liste di trabocco.

La parola “ammortizzato” significa che una singola operazione può costare molto, per esempio quando causa un rehashing, ma su una lunga sequenza di operazioni il costo medio per operazione resta costante.

### Final Interpretation

Il problema del dizionario mostra perché l’hashing è utile.

Vogliamo mantenere un insieme dinamico S contenuto in un universo enorme U, ma non vogliamo pagare spazio O(|U|). Vogliamo invece spazio proporzionale a |S|.

Le tabelle hash risolvono questo problema creando un array di dimensione m = Θ(n), dove n = |S|, e usando una funzione hash per mappare gli elementi dell’universo nei bucket della tabella.

Le collisioni vengono gestite con liste di trabocco.

Se la funzione hash è scelta da una famiglia universale, allora il numero atteso di elementi in collisione con un elemento fissato è O(1), purché m = Θ(n). Questo implica tempo atteso O(1) per lookup, insert e delete.

Se S cambia nel tempo, si usa la tecnica di doubling/halving per mantenere la tabella della giusta dimensione. Il rehashing costa O(n), ma avviene raramente, quindi il costo ammortizzato resta O(1).

In sintesi.

Il dizionario con hashing universale ottiene:

spazio O(n);

tempo atteso O(1) per lookup, insert e delete;

tempo ammortizzato O(1) per inserimenti e cancellazioni quando si considera anche il ridimensionamento dinamico della tabella.

Questa è una soluzione probabilistica più efficiente, in media, rispetto agli alberi bilanciati, che garantiscono O(log n) tempo per operazione.

## FINDING SIMILAR ITEMS IN LARGE DATA SETS

### Problem Setup

Nei problemi di Big Data si lavora con insiemi di dati molto grandi, sia per numero di oggetti sia per dimensione di ciascun oggetto.

Esempi tipici sono:

pagine web con grandi porzioni di testo simile;

clienti con comportamenti di acquisto simili;

immagini con caratteristiche simili;

documenti che condividono parti rilevanti di contenuto.

In tutti questi casi, l’obiettivo generale è trovare coppie di oggetti “simili” all’interno di un insieme molto grande di dati.

Supponiamo di avere N oggetti:

x1, x2, ..., xN

e supponiamo che ciascun oggetto sia rappresentato da un vettore ad alta dimensione h.

Per esempio, un’immagine, una pagina web o un documento possono essere rappresentati come un vettore molto lungo di feature. Quindi possiamo pensare che:

xi ∈ {0,1,...,c}^h

dove h è molto grande.

Per confrontare due oggetti xi e xj, introduciamo una funzione di distanza:

d(xi,xj)

che misura quanto i due oggetti sono lontani o vicini.

Più la distanza è piccola, più gli oggetti sono simili.

Un problema tipico è:

trovare tutte le coppie (xi,xj) tali che d(xi,xj) <= s

dove s è una soglia fissata.

La soluzione deterministica banale consiste nel confrontare tutte le coppie di oggetti.

Il numero di coppie è dell’ordine di:

N^2

e ogni confronto costa O(h), perché bisogna leggere o confrontare vettori di dimensione h.

Quindi il costo complessivo della soluzione banale è:

O(N^2 · h)

Questo è impraticabile quando N è molto grande.

Per esempio, se N è dell’ordine di milioni o miliardi di documenti, il numero di coppie da confrontare diventa enorme.

L’obiettivo degli algoritmi che vedremo è ridurre drasticamente il numero di confronti, cercando di considerare solo le coppie che hanno una buona probabilità di essere simili.

L’idea generale è:

non confrontare direttamente tutti gli oggetti originali;

trasformare ogni oggetto in una rappresentazione più piccola;

usare tecniche hash per individuare coppie candidate;

confrontare in modo più preciso solo le coppie candidate.

Questa è la logica che porterà a Shingling, MinHashing e Locality Sensitive Hashing.

### Document Similarity

Un caso centrale di questo problema è la Document Similarity.

Dato un grande insieme di documenti, vogliamo trovare documenti simili tra loro.

Le applicazioni tipiche sono:

ricerca di pagine web duplicate o quasi duplicate;

individuazione di articoli di notizie simili;

rilevamento di plagio o riuso di contenuto;

raggruppamento di documenti con contenuto affine.

Il problema è difficile per tre motivi principali.

Primo: i documenti possono essere molto grandi.

Non possiamo sempre mantenere in memoria l’intero contenuto di tutti i documenti.

Secondo: il numero di documenti N può essere enorme.

Non possiamo confrontare tutte le coppie di documenti, perché avremmo un costo quadratico O(N^2).

Terzo: due documenti simili non sono necessariamente identici.

Parti del testo possono essere riordinate, possono esserci piccole modifiche, aggiunte o rimozioni. Quindi non basta verificare l’uguaglianza esatta tra stringhe.

Serve una nozione di similarità robusta.

Una misura adatta a questo scopo è la Jaccard Similarity, che però è definita su insiemi. Per applicarla ai documenti, dovremo prima trasformare ogni documento in un insieme.

Questa trasformazione sarà fatta con lo Shingling.

### Jaccard Similarity

La Jaccard Similarity è una misura di similarità definita tra due insiemi.

Siano C1 e C2 due insiemi.

La Jaccard Similarity tra C1 e C2 è definita come:

JSim(C1,C2) = |C1 ∩ C2| / |C1 ∪ C2|

Il numeratore |C1 ∩ C2| conta quanti elementi sono comuni ai due insiemi.

Il denominatore |C1 ∪ C2| conta quanti elementi compaiono in almeno uno dei due insiemi.

Quindi la Jaccard Similarity misura la frazione di elementi condivisi rispetto al totale degli elementi presenti nei due insiemi.

Il valore di JSim(C1,C2) è sempre compreso tra 0 e 1.

Se JSim(C1,C2)=1, allora i due insiemi sono uguali.

Infatti, se l’intersezione coincide con l’unione, significa che ogni elemento presente in uno dei due insiemi è presente anche nell’altro.

Se JSim(C1,C2)=0, allora i due insiemi sono disgiunti.

Infatti, l’intersezione è vuota, quindi non condividono alcun elemento.

Valori intermedi indicano un grado parziale di similarità.

Esempio.

Siano:

C1 = {a,b,c,d}

C2 = {c,d,e}

Allora:

C1 ∩ C2 = {c,d}

e quindi:

|C1 ∩ C2| = 2

mentre:

C1 ∪ C2 = {a,b,c,d,e}

e quindi:

|C1 ∪ C2| = 5.

Pertanto:

JSim(C1,C2) = 2/5.

Questo significa che i due insiemi condividono 2 elementi sui 5 elementi complessivamente presenti.

### Jaccard Distance

A partire dalla Jaccard Similarity possiamo definire anche una distanza.

La Jaccard Distance è:

JDist(C1,C2) = 1 - JSim(C1,C2)

Questa distanza è piccola quando gli insiemi sono simili ed è grande quando gli insiemi sono diversi.

Se i due insiemi sono uguali, allora:

JSim(C1,C2)=1

e quindi:

JDist(C1,C2)=0.

Se i due insiemi sono disgiunti, allora:

JSim(C1,C2)=0

e quindi:

JDist(C1,C2)=1.

Quindi la similarità e la distanza esprimono la stessa informazione, ma in modo opposto:

similarità alta significa distanza bassa;

similarità bassa significa distanza alta.

### Probabilistic Interpretation of Jaccard Similarity

La Jaccard Similarity ha anche un’interpretazione probabilistica molto utile.

Consideriamo l’unione C1 ∪ C2 come spazio degli elementi possibili.

Scegliamo uniformemente a caso un elemento da C1 ∪ C2.

La probabilità che l’elemento scelto appartenga anche a C1 ∩ C2 è:

Pr[elemento ∈ C1 ∩ C2 | elemento ∈ C1 ∪ C2]

Poiché stiamo scegliendo uniformemente dall’unione, questa probabilità è:

|C1 ∩ C2| / |C1 ∪ C2|

cioè esattamente:

JSim(C1,C2)

Quindi possiamo scrivere:

JSim(C1,C2) = Pr[elemento ∈ C1 ∩ C2 | elemento ∈ C1 ∪ C2]

Questa interpretazione sarà fondamentale per capire il MinHashing.

Infatti, il teorema principale del MinHashing dirà che, se scegliamo una permutazione casuale delle righe, la probabilità che due insiemi abbiano lo stesso valore MinHash è esattamente la loro Jaccard Similarity.

Quindi il MinHashing trasforma una similarità tra insiemi in una probabilità di collisione hash.

### Three Essential Steps

Il problema iniziale è trovare documenti simili senza confrontare tutte le coppie.

La strategia generale si divide in tre passaggi fondamentali.

Primo passaggio: Shingling.

Lo Shingling trasforma ogni documento in un insieme di elementi chiamati k-shingle.

In questo modo, un documento non viene più visto come una singola stringa, ma come un insieme di piccole sequenze di token.

Questo passaggio serve perché la Jaccard Similarity è definita tra insiemi, non direttamente tra stringhe.

Quindi:

documento -> insieme di k-shingle.

Secondo passaggio: MinHashing.

Gli insiemi di k-shingle possono essere enormi. Confrontarli direttamente sarebbe ancora costoso.

Il MinHashing trasforma ogni grande insieme in una firma corta, mantenendo approssimativamente la Jaccard Similarity.

Quindi:

insieme grande -> firma piccola.

La proprietà fondamentale sarà:

la probabilità che due firme coincidano in una componente è uguale alla Jaccard Similarity degli insiemi originali.

Terzo passaggio: Locality Sensitive Hashing.

Anche dopo MinHashing, se abbiamo N documenti, confrontare tutte le coppie di firme avrebbe comunque costo quadratico.

Il Locality Sensitive Hashing serve a evitare il confronto di tutte le coppie.

L’idea è mandare le firme in bucket in modo tale che documenti simili abbiano alta probabilità di finire nello stesso bucket, mentre documenti non simili abbiano bassa probabilità di finirci.

In questo modo otteniamo solo coppie candidate, cioè coppie che vale la pena verificare.

Il pipeline completo è quindi:

Documenti originali

-> Shingling

-> insiemi di k-shingle

-> MinHashing

-> firme compatte

-> Locality Sensitive Hashing

-> coppie candidate

-> verifica finale della similarità.

### Final Interpretation

La parte di Document Similarity nasce da un problema computazionale: non possiamo confrontare direttamente tutti i documenti tra loro, perché il numero di coppie è troppo grande e i documenti possono essere troppo lunghi.

La Jaccard Similarity fornisce una misura adatta per confrontare insiemi.

Lo Shingling permette di trasformare documenti in insiemi.

Il MinHashing permette di sostituire insiemi grandi con firme piccole che preservano la Jaccard Similarity.

Il Locality Sensitive Hashing permette di evitare il confronto di tutte le coppie, concentrandosi solo sulle coppie candidate.

In sintesi.

L’obiettivo non è trovare immediatamente tutte le coppie simili confrontandole una per una.

L’obiettivo è costruire una pipeline probabilistica che riduce il problema:

da confrontare oggetti enormi e numerosissimi;

a confrontare solo poche coppie candidate, rappresentate da firme compatte.
## SHINGLING

### Motivation

La Jaccard Similarity è definita tra insiemi.

Tuttavia, un documento è inizialmente una stringa, cioè una sequenza ordinata di caratteri o parole.

Per poter applicare la Jaccard Similarity ai documenti, dobbiamo quindi trasformare ogni documento in un insieme.

Questa trasformazione viene fatta tramite lo Shingling.

L’idea è rappresentare un documento non come una singola stringa, ma come l’insieme delle piccole sequenze che compaiono al suo interno.

In questo modo, due documenti che condividono molte porzioni locali di testo avranno molti elementi in comune nei rispettivi insiemi di shingle.

Questo è utile perché due documenti simili possono non essere identici: possono avere parti spostate, frasi modificate, parole aggiunte o rimosse. Lo Shingling rende la rappresentazione più robusta rispetto al confronto esatto tra stringhe.

### k-Shingles

Sia D un documento.

Un k-shingle di D è una sequenza di k token consecutivi che appare nel documento.

I token possono essere scelti in modi diversi:

possono essere caratteri;

possono essere parole;

possono essere altri elementi base, a seconda dell’applicazione.

Se i token sono caratteri, allora un k-shingle è una sottostringa di lunghezza k.

Se i token sono parole, allora un k-shingle è una sequenza di k parole consecutive.

Indichiamo con U_t l’insieme di tutti i possibili token.

Allora l’insieme di tutti i possibili k-shingle è:

U_t^k

cioè l’insieme di tutte le sequenze di lunghezza k formate da token appartenenti a U_t.

Se |U_t| è il numero di token possibili, allora il numero teorico di k-shingle possibili è:

|U_t|^k

Questo numero può essere molto grande.

Per un documento D, indichiamo con:

S(D)

l’insieme dei k-shingle che compaiono almeno una volta in D.

Quindi:

S(D) ⊆ U_t^k

La trasformazione è:

documento D -> insieme S(D) dei suoi k-shingle.

Da questo momento, possiamo confrontare due documenti D1 e D2 confrontando gli insiemi S(D1) e S(D2).

### Example

Supponiamo che i token siano caratteri e che:

k = 2.

Quindi stiamo considerando sequenze di 2 caratteri consecutivi, cioè 2-shingle.

Sia:

D1 = abcab

Gli shingle di lunghezza 2 che compaiono in D1 sono ottenuti facendo scorrere una finestra di lunghezza 2 sul documento:

ab

bc

ca

ab

Come insieme, le ripetizioni vengono eliminate. Quindi:

S(D1) = {ab, bc, ca}

Sia ora:

D2 = ccadf

Gli shingle di lunghezza 2 sono:

cc

ca

ad

df

Quindi:

S(D2) = {cc, ca, ad, df}

Osserviamo che i due documenti condividono lo shingle ca.

Quindi:

S(D1) ∩ S(D2) = {ca}

mentre:

S(D1) ∪ S(D2) = {ab, bc, ca, cc, ad, df}

Pertanto:

JSim(S(D1), S(D2)) = 1/6

Questo valore misura la similarità tra i due documenti in termini di shingle condivisi.

### Documents as Sets

Dopo lo Shingling, ogni documento D viene rappresentato come un insieme:

C = S(D)

dove C contiene tutti i k-shingle presenti in D.

Questa rappresentazione perde alcune informazioni sull’ordine globale del documento, perché un insieme non conserva l’ordine degli elementi né il numero di occorrenze.

Tuttavia conserva l’informazione su quali porzioni locali compaiono nel documento.

Questo è utile perché, se due documenti hanno molte parti simili, avranno molti k-shingle in comune.

Quindi il problema di confrontare documenti viene trasformato nel problema di confrontare insiemi.

Prima:

confrontare documenti come stringhe.

Dopo lo Shingling:

confrontare insiemi di k-shingle tramite Jaccard Similarity.

### Encoding Sets as Binary Vectors

In modo più pratico, ogni insieme di shingle può essere rappresentato come un vettore binario.

Consideriamo l’universo di tutti i possibili k-shingle:

U_t^k

Supponiamo che questo universo abbia m elementi:

m = |U_t|^k

Ogni possibile shingle corrisponde a una coordinata del vettore.

Per un documento D, definiamo il vettore binario C(D) come segue:

C(D)[s] = 1 se lo shingle s compare in D

C(D)[s] = 0 altrimenti

Quindi:

C(D) ∈ {0,1}^m

dove m è il numero di possibili k-shingle.

Interpretazione.

Se una coordinata vale 1, significa che il documento contiene lo shingle corrispondente.

Se una coordinata vale 0, significa che il documento non contiene quello shingle.

Questa rappresentazione può essere molto grande, perché m = |U_t|^k può essere enorme.

Tuttavia, nella pratica, il vettore è sparso: un documento contiene solo una piccola parte di tutti gli shingle possibili. Quindi la maggior parte delle coordinate vale 0.

### Characteristic Matrix

Se abbiamo N documenti, possiamo rappresentare l’intero dataset tramite una matrice caratteristica.

La matrice caratteristica M ha:

una colonna per ogni documento;

una riga per ogni possibile k-shingle.

Quindi possiamo pensare a:

M ∈ {0,1}^{m × N}

dove:

m è il numero di possibili k-shingle;

N è il numero di documenti.

Negli appunti di Mirco la matrice è indicata come M ∈ {0,1}^{N × m}, ma concettualmente, nella rappresentazione usata per MinHashing, è più comodo considerare le righe come shingle e le colonne come documenti. La cosa importante non è la convenzione righe/colonne, ma sapere che ogni cella indica se uno shingle compare in un documento.

Indichiamo una cella della matrice come:

M[r,c]

dove:

r è una riga, cioè uno shingle;

c è una colonna, cioè un documento.

Allora:

M[r,c] = 1 se il documento c contiene lo shingle associato alla riga r;

M[r,c] = 0 altrimenti.

Quindi ogni colonna della matrice è la rappresentazione binaria di un documento.

Ogni colonna C può essere vista come l’insieme degli shingle presenti in quel documento.

Questa rappresentazione è fondamentale per il MinHashing, perché il MinHashing verrà applicato proprio alle colonne della matrice caratteristica.

### Set Operations as Bitwise Operations

Una volta che gli insiemi sono codificati come vettori binari, le operazioni insiemistiche possono essere viste come operazioni bitwise.

Siano C1 e C2 due colonne, cioè due vettori binari che rappresentano due documenti.

L’intersezione C1 ∩ C2 corrisponde al bitwise AND tra i vettori.

Infatti, una posizione vale 1 nell’intersezione se e solo se vale 1 in entrambi i vettori.

L’unione C1 ∪ C2 corrisponde al bitwise OR tra i vettori.

Infatti, una posizione vale 1 nell’unione se e solo se vale 1 in almeno uno dei due vettori.

Quindi:

|C1 ∩ C2| = numero di posizioni in cui entrambi i vettori hanno 1;

|C1 ∪ C2| = numero di posizioni in cui almeno uno dei due vettori ha 1.

La Jaccard Similarity diventa:

JSim(C1,C2) = |C1 ∩ C2| / |C1 ∪ C2|

dove C1 e C2 sono ora colonne binarie della matrice caratteristica.

### Similarity for Shingles

La similarità tra due documenti D1 e D2 viene quindi definita come la Jaccard Similarity tra i rispettivi insiemi di shingle:

JSim(D1,D2) = JSim(S(D1), S(D2))

cioè:

JSim(D1,D2) = |S(D1) ∩ S(D2)| / |S(D1) ∪ S(D2)|

Questa formula misura la frazione di shingle condivisi dai due documenti rispetto al totale degli shingle presenti in almeno uno dei due.

Se due documenti hanno molti shingle in comune, allora la loro Jaccard Similarity sarà alta.

Se condividono pochi shingle, la similarità sarà bassa.

Lo Shingling permette quindi di trasformare il problema della similarità tra documenti nel problema della similarità tra insiemi.

### Why Shingling Is Useful

Lo Shingling è utile perché rende il confronto tra documenti più robusto del confronto esatto tra stringhe.

Se due documenti sono identici, avranno gli stessi shingle.

Se due documenti sono quasi identici, avranno molti shingle in comune.

Se due documenti condividono alcune parti, ma non tutto il contenuto, avranno una Jaccard Similarity intermedia.

Inoltre, se alcune porzioni di testo sono spostate in punti diversi del documento, gli shingle locali possono comunque essere condivisi.

Questo è il motivo per cui gli appunti sottolineano che lo Shingling permette di trovare documenti simili anche quando pezzi piccoli del documento appaiono in ordine diverso.

### Limitation

Lo Shingling risolve il problema di rappresentare documenti come insiemi, ma non risolve ancora il problema computazionale principale.

Infatti, gli insiemi di shingle possono essere molto grandi.

Anche se rappresentiamo ogni documento come una colonna binaria, confrontare tutte le coppie di colonne resta troppo costoso.

Se abbiamo N documenti, il numero di coppie è ancora dell’ordine di N^2.

Quindi lo Shingling fornisce una buona rappresentazione, ma da solo non basta per superare la barriera quadratica.

Per questo serve il MinHashing.

Il MinHashing trasformerà i grandi insiemi di shingle in firme piccole, cercando di preservare la Jaccard Similarity.

### Final Interpretation

Lo Shingling è il primo passaggio della pipeline per trovare documenti simili.

Il suo compito è trasformare un documento in un insieme.

Ogni documento D viene convertito nell’insieme S(D) dei suoi k-shingle.

Poi l’insieme S(D) può essere rappresentato come un vettore binario, cioè come una colonna della matrice caratteristica.

A questo punto la similarità tra documenti viene misurata tramite la Jaccard Similarity tra le rispettive colonne.

In sintesi.

Lo Shingling serve a passare da:

documenti come stringhe

a:

documenti come insiemi di k-shingle.

Questa trasformazione rende possibile usare la Jaccard Similarity e prepara il terreno per il MinHashing.

## MINHASHING

### Motivation

Con lo Shingling abbiamo trasformato ogni documento in un insieme di k-shingle.

Quindi ogni documento D viene rappresentato da un insieme:

S(D)

oppure, equivalentemente, da una colonna binaria C della matrice caratteristica.

A questo punto, la similarità tra due documenti può essere misurata tramite la Jaccard Similarity tra i rispettivi insiemi di shingle:

JSim(C1,C2) = |C1 ∩ C2| / |C1 ∪ C2|

Il problema è che questi insiemi possono essere molto grandi.

Se l’universo degli shingle possibili ha dimensione m, allora ogni colonna della matrice caratteristica ha lunghezza m.

Confrontare direttamente due colonne C1 e C2 significa calcolare:

il numero di righe in cui entrambe hanno 1;

il numero di righe in cui almeno una delle due ha 1.

Questo può costare O(m) per ogni coppia.

Se abbiamo N documenti, confrontare tutte le coppie richiede un numero di confronti dell’ordine di N^2.

Quindi, anche dopo lo Shingling, il problema non è risolto.

Lo Shingling ci ha dato una rappresentazione adatta alla Jaccard Similarity, ma non ancora una rappresentazione efficiente da confrontare.

Serve quindi una tecnica che trasformi ogni grande insieme di shingle in una firma piccola, mantenendo però l’informazione sulla Jaccard Similarity.

Questa tecnica è il MinHashing.

L’obiettivo del MinHashing è costruire una funzione hash sugli insiemi tale che:

se due insiemi sono molto simili, allora hanno alta probabilità di ottenere lo stesso valore hash;

se due insiemi sono poco simili, allora hanno bassa probabilità di ottenere lo stesso valore hash.

In altre parole, vogliamo una funzione hash coerente con la Jaccard Similarity.

Non tutte le funzioni hash sono adatte a tutte le misure di similarità. La funzione MinHash è specificamente costruita per preservare la Jaccard Similarity.

### MinHash Function

Consideriamo la matrice caratteristica M del dataset.

Le righe rappresentano gli shingle.

Le colonne rappresentano i documenti.

Ogni colonna C è un vettore binario che rappresenta un documento:

C[r] = 1 se il documento contiene lo shingle della riga r;

C[r] = 0 altrimenti.

Sia m il numero di righe della matrice, cioè il numero di shingle possibili o considerati.

Consideriamo ora una permutazione casuale π delle righe della matrice.

Una permutazione π cambia l’ordine con cui osserviamo le righe.

Per una colonna C, il valore MinHash h_π(C) è definito come la prima riga, secondo l’ordine dato dalla permutazione π, in cui la colonna C ha valore 1.

In modo equivalente:

h_π(C) = min{π(r) : C[r] = 1}

oppure, seguendo la notazione degli appunti:

h_π(C) = min(π(C))

Il significato è:

prendo tutti gli shingle presenti nel documento, cioè tutte le righe r tali che C[r]=1;

applico la permutazione π a queste righe;

scelgo il valore minimo.

Questo valore minimo è la firma MinHash della colonna C rispetto alla permutazione π.

Intuizione.

Ogni documento contiene un certo insieme di shingle. La permutazione casuale assegna un ordine casuale agli shingle. Il MinHash di un documento è lo shingle del documento che compare per primo in questo ordine casuale.

Quindi h_π(C) può essere pensato come:

“il primo shingle del documento secondo un ordinamento casuale degli shingle”.

### Example of MinHash

Supponiamo che una colonna C abbia valore 1 nelle righe:

{1,2,6,7}

e valore 0 nelle altre righe.

Supponiamo di avere una permutazione π tale che:

π(1)=2

π(2)=3

π(6)=5

π(7)=4

Allora i valori della permutazione sugli shingle presenti nella colonna sono:

{2,3,5,4}

Il MinHash è il minimo di questi valori:

h_π(C)=2

Quindi, rispetto a questa permutazione, la firma della colonna C è 2.

Se usiamo un’altra permutazione, potremmo ottenere un valore diverso.

Per questo motivo, nella pratica, non si usa una sola permutazione, ma più permutazioni indipendenti. Ogni permutazione produce una componente della firma del documento.

### Why MinHashing Is Useful

Il punto fondamentale del MinHashing è che la probabilità che due colonne abbiano lo stesso valore MinHash è esattamente uguale alla loro Jaccard Similarity.

Questa è la proprietà centrale.

Se C1 e C2 sono molto simili, cioè hanno molti 1 nelle stesse righe rispetto al totale delle righe in cui almeno una delle due ha 1, allora:

Pr[h_π(C1)=h_π(C2)]

sarà alta.

Se invece C1 e C2 condividono pochi shingle, allora questa probabilità sarà bassa.

Quindi il MinHashing trasforma la similarità tra insiemi in una probabilità di collisione hash.

Questo è estremamente utile perché possiamo stimare la Jaccard Similarity ripetendo il processo più volte, cioè usando più permutazioni casuali.

### Space Complexity of One MinHash Value

Un valore MinHash è un indice di riga, o un valore associato a una riga.

Se la matrice ha m righe, allora un valore MinHash può assumere m possibili valori.

Per memorizzare un indice tra 1 e m servono:

Θ(log m)

bit.

Quindi una singola componente MinHash h_π(C) occupa spazio Θ(log m).

Se usiamo t permutazioni, la firma completa avrà t componenti, quindi occuperà:

Θ(t log m)

bit per documento.

Il vantaggio è che t può essere molto più piccolo di m.

Invece di memorizzare l’intera colonna binaria lunga m, memorizziamo una firma di t valori.

## MINHASHING PROPERTY

### Theorem

Siano C1 e C2 due colonne fissate della matrice caratteristica.

Sia π una permutazione scelta uniformemente a caso tra tutte le permutazioni delle righe.

Allora:

Pr[h_π(C1) = h_π(C2)] = JSim(C1,C2)

cioè:

Pr[h_π(C1) = h_π(C2)] = |C1 ∩ C2| / |C1 ∪ C2|

La probabilità è presa rispetto alla scelta casuale della permutazione π.

### Meaning of the Theorem

Il teorema dice che il MinHashing preserva la Jaccard Similarity in senso probabilistico.

Non dice che per una singola permutazione il MinHash calcola esattamente la Jaccard Similarity.

Dice invece che, scegliendo una permutazione casuale, la probabilità che due colonne producano lo stesso valore MinHash è esattamente la loro Jaccard Similarity.

Quindi:

se JSim(C1,C2)=0.8, allora una permutazione casuale produce lo stesso MinHash con probabilità 0.8;

se JSim(C1,C2)=0.2, allora una permutazione casuale produce lo stesso MinHash con probabilità 0.2.

Questa è la base per stimare la similarità usando più permutazioni.

### Proof

Consideriamo due colonne C1 e C2.

Ogni colonna rappresenta un insieme di shingle.

Quindi possiamo pensare a C1 e C2 come insiemi:

C1 = insieme degli shingle presenti nel primo documento;

C2 = insieme degli shingle presenti nel secondo documento.

Consideriamo l’unione:

C1 ∪ C2.

Questa è l’insieme di tutti gli shingle che compaiono in almeno uno dei due documenti.

Ora scegliamo una permutazione casuale π delle righe, cioè un ordine casuale sugli shingle.

Guardiamo il primo elemento di C1 ∪ C2 secondo l’ordine dato da π.

Chiamiamo questo elemento y.

Quindi y è lo shingle di C1 ∪ C2 che appare per primo nella permutazione casuale.

Poiché π è una permutazione uniforme casuale, ogni elemento di C1 ∪ C2 ha la stessa probabilità di essere il primo.

Quindi, per ogni y ∈ C1 ∪ C2:

Pr[y è il primo elemento di C1 ∪ C2 secondo π] = 1 / |C1 ∪ C2|

Ora chiediamoci: quando accade che i MinHash coincidano?

I due valori MinHash sono:

h_π(C1) = primo elemento di C1 secondo π

h_π(C2) = primo elemento di C2 secondo π

Questi due valori coincidono se e solo se il primo elemento dell’unione C1 ∪ C2 appartiene all’intersezione C1 ∩ C2.

Vediamo perché.

Caso 1: il primo elemento y di C1 ∪ C2 appartiene a C1 ∩ C2.

Allora y appartiene sia a C1 sia a C2.

Poiché y è il primo elemento dell’unione, non esiste nessun altro elemento di C1 ∪ C2 che venga prima di y.

In particolare, non esiste nessun elemento di C1 che venga prima di y e non esiste nessun elemento di C2 che venga prima di y.

Quindi y è contemporaneamente:

il primo elemento di C1;

il primo elemento di C2.

Pertanto:

h_π(C1) = h_π(C2) = y.

Caso 2: il primo elemento y di C1 ∪ C2 non appartiene a C1 ∩ C2.

Allora y appartiene a uno solo dei due insiemi.

Supponiamo, per esempio, che y appartenga a C1 ma non a C2.

Allora y è il primo elemento di C1, quindi:

h_π(C1)=y.

Ma y non appartiene a C2, quindi il primo elemento di C2 secondo π deve essere un altro elemento, che viene dopo y nella permutazione.

Quindi:

h_π(C2) diverso da y.

Pertanto:

h_π(C1) diverso da h_π(C2).

Lo stesso ragionamento vale se y appartiene a C2 ma non a C1.

Quindi abbiamo dimostrato che:

h_π(C1) = h_π(C2)

se e solo se:

il primo elemento di C1 ∪ C2 secondo π appartiene a C1 ∩ C2.

A questo punto la probabilità cercata diventa:

Pr[h_π(C1)=h_π(C2)]  
= Pr[il primo elemento di C1 ∪ C2 appartiene a C1 ∩ C2]

Poiché ogni elemento di C1 ∪ C2 ha la stessa probabilità di essere il primo, questa probabilità è:

|C1 ∩ C2| / |C1 ∪ C2|

Quindi:

Pr[h_π(C1)=h_π(C2)] = |C1 ∩ C2| / |C1 ∪ C2|

Ma per definizione:

JSim(C1,C2) = |C1 ∩ C2| / |C1 ∪ C2|

Dunque:

Pr[h_π(C1)=h_π(C2)] = JSim(C1,C2)

Questo conclude la dimostrazione.

### Explanation of the Key Idea

Il punto centrale è che una permutazione casuale induce una scelta uniforme del “primo elemento” dell’unione.

Quando prendiamo il primo elemento di C1 ∪ C2 secondo la permutazione, questo elemento è uniforme tra tutti gli elementi dell’unione.

I MinHash coincidono precisamente quando questo primo elemento è condiviso dai due insiemi, cioè appartiene all’intersezione.

Quindi la probabilità di collisione MinHash è:

numero di elementi favorevoli / numero di elementi possibili

cioè:

|C1 ∩ C2| / |C1 ∪ C2|

che è esattamente la Jaccard Similarity.

### Interpretation from Exam Point of View

Il MinHashing è una funzione hash per insiemi costruita in modo da preservare la Jaccard Similarity.

Per una permutazione casuale delle righe, il MinHash di una colonna è la prima riga in cui quella colonna contiene 1.

Per due colonne C1 e C2, i valori MinHash coincidono se il primo shingle, secondo la permutazione casuale, tra quelli presenti in almeno uno dei due documenti, è uno shingle presente in entrambi.

Poiché il primo elemento dell’unione è uniforme nell’unione, la probabilità che appartenga all’intersezione è:

|C1 ∩ C2| / |C1 ∪ C2|

cioè la Jaccard Similarity.

In sintesi.

Il teorema fondamentale del MinHashing è:

Pr[h_π(C1)=h_π(C2)] = JSim(C1,C2)

Questa uguaglianza permette di stimare la Jaccard Similarity tramite collisioni hash.

Se ripetiamo il processo con molte permutazioni indipendenti, la frazione di volte in cui i MinHash coincidono approssima la Jaccard Similarity.

## MINHASHING SIGNATURES

### From One MinHash to a Signature

Il teorema fondamentale del MinHashing afferma che, per una permutazione casuale π:

Pr[h_π(C1) = h_π(C2)] = JSim(C1,C2)

Questo significa che una singola permutazione fornisce un esperimento casuale: il MinHash delle due colonne coincide con probabilità pari alla loro Jaccard Similarity.

Tuttavia, una sola permutazione non basta per stimare bene la similarità.

Infatti, con una sola permutazione, il risultato possibile è solo:

coincidono;

non coincidono.

Quindi otteniamo un’informazione binaria, troppo debole per stimare accuratamente un valore reale compreso tra 0 e 1.

Per migliorare la stima, si usano più permutazioni casuali indipendenti:

π1, π2, ..., πt

Per ogni permutazione πj si calcola un valore MinHash:

h_{πj}(C)

La firma MinHash della colonna C è il vettore:

SIG(C) = <h_{π1}(C), h_{π2}(C), ..., h_{πt}(C)>

Quindi, invece di rappresentare il documento con l’intera colonna binaria lunga m, lo rappresentiamo con una firma di t valori.

Ogni componente della firma è il MinHash della colonna rispetto a una diversa permutazione.

### Signature Matrix

Se abbiamo N documenti, cioè N colonne, possiamo costruire una matrice delle firme.

La matrice delle firme, indicata con SIG, ha:

t righe, una per ogni permutazione o funzione MinHash;

N colonne, una per ogni documento.

L’elemento SIG(i,C) contiene il valore MinHash della colonna C rispetto alla i-esima permutazione:

SIG(i,C) = h_{πi}(C)

Quindi ogni colonna della matrice SIG è la firma compatta di un documento.

La matrice originale M ha dimensione m × N, dove m può essere enorme.

La matrice delle firme SIG ha dimensione t × N, con t molto più piccolo di m.

Questo è il vantaggio principale del MinHashing:

si passa da colonne molto grandi a firme molto più piccole, cercando di preservare la Jaccard Similarity.

### Signature Similarity

Date due colonne C1 e C2, consideriamo le rispettive firme:

SIG(C1) = <h_{π1}(C1), ..., h_{πt}(C1)>

SIG(C2) = <h_{π1}(C2), ..., h_{πt}(C2)>

Definiamo la similarità tra firme, indicata con:

Sign-Sim(C1,C2)

come la frazione di componenti in cui le due firme coincidono.

Formalmente:

Sign-Sim(C1,C2) =  
|{j : h_{πj}(C1) = h_{πj}(C2)}| / t

Quindi Sign-Sim(C1,C2) conta in quante permutazioni le due colonne hanno lo stesso MinHash, e divide per il numero totale di permutazioni t.

Esempio.

Se t = 100 e due firme coincidono in 73 componenti, allora:

Sign-Sim(C1,C2) = 73/100 = 0.73

Questa è una stima della Jaccard Similarity tra C1 e C2.

### Random Variable View

Per formalizzare il legame tra Sign-Sim e Jaccard Similarity, definiamo per ogni permutazione πj una variabile aleatoria indicatrice:

Zj = 1 se h_{πj}(C1) = h_{πj}(C2)

Zj = 0 altrimenti

Dal teorema principale del MinHashing sappiamo che:

Pr[Zj = 1] = JSim(C1,C2)

Poiché Zj è una variabile indicatrice:

E[Zj] = Pr[Zj = 1]

Quindi:

E[Zj] = JSim(C1,C2)

La similarità tra firme è la media di queste variabili:

Sign-Sim(C1,C2) = (Z1 + Z2 + ... + Zt) / t

Per linearità del valore atteso:

E[Sign-Sim(C1,C2)]  
= E[(Z1 + ... + Zt)/t]  
= (1/t) · Σ_{j=1}^t E[Zj]  
= (1/t) · t · JSim(C1,C2)  
= JSim(C1,C2)

Quindi Sign-Sim è uno stimatore non distorto della Jaccard Similarity.

In altre parole, in media, la similarità tra firme coincide con la similarità di Jaccard tra gli insiemi originali.

### Convergence

Le permutazioni π1, ..., πt sono scelte indipendentemente.

Quindi le variabili Z1, ..., Zt sono indipendenti, o comunque vengono trattate come tali nell’analisi.

Aumentando t, la media:

(Z1 + ... + Zt) / t

si concentra sempre di più attorno al suo valore atteso.

Poiché il valore atteso è JSim(C1,C2), otteniamo:

Sign-Sim(C1,C2) -> JSim(C1,C2) per t -> ∞

Questa è l’idea del corollario negli appunti.

Maggiore è il numero di permutazioni t, migliore è la stima della Jaccard Similarity.

Il prezzo da pagare è che firme più lunghe occupano più spazio e richiedono più tempo da calcolare.

### Space Complexity

Ogni componente della firma è un indice di riga, o un valore hash associato a una riga.

Se la matrice caratteristica ha m righe, allora un singolo valore MinHash richiede:

Θ(log m)

bit.

Una firma con t componenti richiede quindi:

Θ(t log m)

bit per documento.

Se t è molto più piccolo di m, questa rappresentazione è molto più compatta della colonna binaria originale.

## DOC-PAIR CHECK ALGORITHM

### Goal

L’algoritmo Doc-Pair Check serve a stimare la similarità tra due documenti, rappresentati da due colonne C1 e C2 della matrice caratteristica.

L’algoritmo non calcola direttamente la Jaccard Similarity esatta.

Calcola invece la similarità tra le firme MinHash, cioè:

Sign-Sim(C1,C2)

che approssima JSim(C1,C2).

### Input

L’input dell’algoritmo è:

due colonne C1, C2 ∈ {0,1}^m;

un parametro t, cioè il numero di permutazioni casuali da usare.

Il parametro t controlla la qualità della stima:

se t è piccolo, la stima può essere rumorosa;

se t è grande, la stima è più accurata, ma costa più spazio e tempo.

### Algorithm

Per j = 1, ..., t:

scegli uniformemente a caso una permutazione πj delle m righe;

calcola h_{πj}(C1);

calcola h_{πj}(C2);

controlla se h_{πj}(C1) = h_{πj}(C2).

Alla fine restituisci:

Sign-Sim(C1,C2) =  
|{j : h_{πj}(C1) = h_{πj}(C2)}| / t

Quindi l’output è la frazione di permutazioni per cui le due colonne hanno lo stesso valore MinHash.

### Output

L’output dell’algoritmo è una stima della Jaccard Similarity:

Sign-Sim(C1,C2) ≈ JSim(C1,C2)

È importante distinguere i due valori.

JSim(C1,C2) è la similarità reale tra gli insiemi di shingle.

Sign-Sim(C1,C2) è la similarità calcolata sulle firme.

In generale:

Sign-Sim(C1,C2) ≠ JSim(C1,C2)

per un valore finito di t.

Tuttavia:

E[Sign-Sim(C1,C2)] = JSim(C1,C2)

e, aumentando t, Sign-Sim(C1,C2) converge alla Jaccard Similarity.

### Interpretation

Doc-Pair Check trasforma il problema di confrontare due grandi insiemi nel problema di confrontare due firme corte.

Invece di calcolare direttamente:

|C1 ∩ C2| / |C1 ∪ C2|

su colonne lunghe m, l’algoritmo confronta t valori MinHash.

Il motivo per cui funziona è il teorema principale del MinHashing: ogni componente della firma coincide con probabilità pari alla Jaccard Similarity.

Quindi la frazione di componenti uguali è una stima naturale della similarità originale.
## SIGNATURE MATRIX ALGORITHM

### Motivation

Finora abbiamo descritto il MinHashing nel modo teorico più pulito: scegliamo una permutazione casuale π delle righe della matrice caratteristica e, per ogni colonna C, calcoliamo:

h_π(C) = min{π(r) : C[r] = 1}

Ripetendo il procedimento con t permutazioni indipendenti, otteniamo una firma:

SIG(C) = <h_{π1}(C), h_{π2}(C), ..., h_{πt}(C)>

Il problema è che generare vere permutazioni casuali delle righe può essere computazionalmente molto costoso.

Se la matrice caratteristica ha m righe, una permutazione casuale è un riordinamento di tutti gli m indici di riga. Se m è enorme, come accade nei problemi di document similarity, memorizzare e gestire molte permutazioni complete diventa poco pratico.

Per questo, nella pratica, non si usano vere permutazioni casuali, ma funzioni hash casuali che approssimano il comportamento di una permutazione casuale.

### Replacing Random Permutations with Hash Functions

Invece di scegliere t permutazioni casuali delle righe, scegliamo t funzioni hash:

f1, f2, ..., ft

dove ogni funzione hash mappa gli indici di riga in valori numerici:

fi : [m] -> [m]

L’idea è che fi(j) rappresenti la “posizione casuale” della riga j secondo la i-esima funzione hash.

Quindi, invece di calcolare il minimo valore di π_i(r) tra le righe r in cui la colonna C ha valore 1, calcoliamo il minimo valore di fi(r) tra quelle stesse righe.

Formalmente:

SIG(i,C) = min{fi(j) : M[j,C] = 1}

dove:

i indica la funzione hash usata;

C indica la colonna/documento;

j indica la riga/shingle;

M[j,C]=1 significa che il documento C contiene lo shingle j.

Quindi SIG(i,C) è il valore minimo assunto dalla funzione hash fi sulle righe in cui la colonna C ha valore 1.

Questa è l’analogia pratica del MinHashing.

Nel caso teorico:

SIG(i,C) = min{π_i(j) : M[j,C]=1}

Nel caso implementativo:

SIG(i,C) = min{f_i(j) : M[j,C]=1}

Le collisioni tra valori hash possono esistere, mentre in una permutazione vera tutti i valori sarebbero distinti. Tuttavia, se le funzioni hash sono scelte bene e lo spazio dei valori è abbastanza grande, la probabilità di collisione è bassa e viene solitamente ignorata nell’analisi pratica.

### Signature Matrix

La matrice delle firme, indicata con SIG, è una matrice di dimensione:

t × N

dove:

t è il numero di funzioni hash, cioè il numero di componenti della firma;

N è il numero di documenti, cioè il numero di colonne della matrice caratteristica M.

La colonna C della matrice SIG è la firma MinHash del documento C.

Quindi:

SIG(1,C) è il minimo valore di f1(j) sulle righe j in cui M[j,C]=1;

SIG(2,C) è il minimo valore di f2(j) sulle righe j in cui M[j,C]=1;

...

SIG(t,C) è il minimo valore di ft(j) sulle righe j in cui M[j,C]=1.

La firma completa del documento C è:

SIG(C) = <SIG(1,C), SIG(2,C), ..., SIG(t,C)>

Questa matrice è molto più piccola della matrice caratteristica originale.

La matrice originale M ha dimensione:

m × N

La matrice delle firme SIG ha dimensione:

t × N

con t molto più piccolo di m.

### Algorithm

L’algoritmo costruisce la matrice SIG scorrendo la matrice caratteristica M.

Input:

Matrice caratteristica M con m righe e N colonne;

t funzioni hash f1, ..., ft.

Output:

Matrice delle firme SIG di dimensione t × N.

L’algoritmo procede in due fasi.

Prima fase: inizializzazione.

Per ogni colonna C = 1,...,N:

per ogni funzione hash i = 1,...,t:

SIG(i,C) <- infinito

L’inizializzazione a infinito serve perché vogliamo calcolare un minimo. Ogni volta che incontriamo una riga j con M[j,C]=1, confronteremo il valore corrente SIG(i,C) con fi(j), e terremo il più piccolo.

Seconda fase: scansione della matrice M.

Per ogni riga j = 1,...,m della matrice M:

per ogni colonna C = 1,...,N:

se M[j,C] = 1, allora:

per ogni funzione hash i = 1,...,t:

calcola fi(j);

se fi(j) < SIG(i,C), allora aggiorna:

SIG(i,C) <- fi(j)

Alla fine della scansione, per ogni colonna C e per ogni funzione hash fi, SIG(i,C) contiene il minimo valore hash tra tutte le righe j in cui la colonna C ha valore 1.

Quindi la colonna C di SIG è la firma MinHash del documento C.

### Why the Algorithm Works

Fissiamo una colonna C e una funzione hash fi.

La definizione pratica di firma è:

SIG(i,C) = min{fi(j) : M[j,C]=1}

L’algoritmo inizializza SIG(i,C) a infinito e poi scorre tutte le righe j.

Ogni volta che trova una riga j tale che M[j,C]=1, calcola fi(j) e aggiorna SIG(i,C) se fi(j) è più piccolo del valore attuale.

Alla fine, l’algoritmo ha considerato esattamente tutte le righe j per cui M[j,C]=1.

Poiché ha sempre mantenuto il valore minimo incontrato, il valore finale è proprio:

min{fi(j) : M[j,C]=1}

Quindi l’algoritmo calcola correttamente tutte le componenti della firma per ogni colonna.

### Complexity Analysis

La matrice caratteristica M ha:

m righe;

N colonne.

L’algoritmo scorre tutte le coppie riga-colonna, quindi esegue una scansione di base di costo:

Θ(mN)

Per ogni cella M[j,C], controlla se il valore è 1.

Se M[j,C]=1, allora per quella cella calcola t valori hash:

f1(j), f2(j), ..., ft(j)

e aggiorna eventualmente t elementi della matrice SIG.

Quindi il costo più preciso dipende dal numero di 1 nella matrice.

Se indichiamo con nnz(M) il numero di celle uguali a 1 nella matrice M, allora il costo degli aggiornamenti hash è:

Θ(t · nnz(M))

Nel caso peggiore, se la matrice è densa, nnz(M) può essere Θ(mN), e quindi il costo diventa:

Θ(t · mN)

Nelle applicazioni di document similarity, però, la matrice caratteristica è tipicamente sparsa: ogni documento contiene solo una piccola parte di tutti gli shingle possibili. Per questo motivo, implementazioni efficienti lavorano spesso solo sulle posizioni in cui M[j,C]=1.

Lo spazio occupato dalla matrice delle firme è:

Θ(tN)

valori.

Ogni valore richiede Θ(log m) bit, perché rappresenta un valore hash o indice tra 0 e m-1.

Quindi lo spazio in bit è:

Θ(tN log m)

### Important Distinction

La matrice caratteristica M rappresenta i documenti in modo esatto, ma può essere enorme.

La matrice SIG rappresenta i documenti in modo compatto, ma probabilistico.

M conserva esattamente l’informazione su quali shingle compaiono in ogni documento.

SIG conserva una firma che permette di stimare la Jaccard Similarity.

Quindi SIG non sostituisce M come rappresentazione completa del documento; la sostituisce come rappresentazione utile per il confronto di similarità.

### Interpretation

Il Signature Matrix Algorithm è il passaggio pratico che rende utilizzabile il MinHashing su molti documenti.

In teoria, il MinHashing usa permutazioni casuali delle righe.

In pratica, si usano funzioni hash casuali sulle righe.

Per ogni documento e per ogni funzione hash, si salva il minimo valore hash tra le righe in cui il documento ha valore 1.

Il risultato è una matrice delle firme molto più piccola della matrice originale.

Questa matrice potrà poi essere usata per stimare la similarità tra documenti confrontando le firme, invece di confrontare direttamente gli insiemi di shingle.
