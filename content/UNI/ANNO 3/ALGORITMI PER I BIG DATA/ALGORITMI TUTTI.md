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
_ANALISI PROBABILISTICA_ ⭐
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
- 14
