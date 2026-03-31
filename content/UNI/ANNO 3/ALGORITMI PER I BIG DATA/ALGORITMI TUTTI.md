### CH01
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
### CH02
### Random quick sort
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
### CH03
#### RANDOMIZED MEDIAN ALGORITHM 
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
PROBABILITÀ FINALE
- $Pr(\text{fallimento}) \le Pr(E_1)+Pr(E_2)+Pr(E_3) \le n^{-1/4}$

- $Pr(\text{successo}) \ge 1 - n^{-1/4}$

CORRETTEZZA
- Se l’algoritmo non fallisce:
    - la mediana è sicuramente in $C$
    - la posizione corretta viene calcolata esattamente
- Quindi:
    - **risultato corretto quando non fallisce**
TIPO DI ERRORE
- possibile:
    - restituisce FAIL
- impossibile:
    - restituire una mediana sbagliata
RIDUZIONE DELL’ERRORE
- Ripeto l’algoritmo indipendentemente
- probabilità fallimento dopo $t$ tentativi:
- $(n^{-1/4})^t = n^{-t/4}$
➡ decresce esponenzialmente
