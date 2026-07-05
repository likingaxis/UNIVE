#### Verifying polynomial Identities
- P(x) Q(x)
- H(x)=P(x)-Q(x)
- se H(x)=0 uguali ma potrei avere falso positivo
- se H(x)!=0 sono sicuro che siano diversi
- se il polinomio H(x) è non nullo ha <=d radici che lo annullano
	- falso positivo
- pseudocodice basta che calcoli solo che prende come x un valore tra 0 e 100d
- costo O(d) tempo e O(1) spazio
- $P(r)\neq Q(r)$ quanto è $PR [H(r)=0]$ fai d/100d 
- esegui t volte per migliorarlo
#### Verifying Matrix Multiplication
- AB = C? con matrici n$\times$n
- Scegliamo `u.a.r` un vettore binario $\{0,1\}^n$
- PSEUDO -> Eseguiamo
    - Ar
        - B(Ar)
        - Cr
        - Verifichiamo se B(Ar) = Cr
- B(Ar) = Cr -> r(AB - C) = 0 (AB - C -> dick)
- $Pr[r x dick = 0]$ $\leq$ $\frac{1}{2}$
- Spazio = O(n) -> se ho le matrici in input
- Tempo = O($n^{2}$)
- Ripeto $k$ volte per abbassare la prob. di errore
#### Quick Sort Randomizzato
- Data una lista di n elementi
- restituire una versione ordinata di essa
	- scelgo u.a.r un pivot ovvero un elemento della lista
	- creo 2 liste lx e dx e eseguo quick sort su di esse
	- return `lx+elemento+dx`
- analisi dei costi
- assumiamo che la lista sia già ordinata
- creo una variabile aleatoria $X_{ij}$ che vale 1 se avviene un confronto tra $x_i$ e $x_j$
- calcolo la expectation della sommatoria di tutti gli elementi della aleatoria con $i<j$ sono due sommatorie una che va da i=1 a n e quella dentro che va da j=i+1 a n la probabilità di $X_{ij}=2/j-i+1$ metto k=j-i+1 e la sommatoria viene k=2 a n armonica che vale il log di n
- poi la sommatoria fuori moltiplica per n quindi esce che la expectation è n log n
- quindi ci aspettiamo di fare n log n
#### Min Cut Algorithm
- G(V,E)
- trovare C tale che G(V,E\C) è disconnesso
- l'algoritmo prende un arco u.a.r n-2 volte e lo contrae
- il risultato è un grafo con 2 nodi e un numero di archi quegli archi sono un cut
- quanto è probabile che il cut sia il min cut
- poniamo C come min cut con dimensione k
- probabilità che l'arco preso sia di C=k/m
- probabilità che non sia quello =1-k/m
- definiamo due eventi Ei Fi
	- Ei evento che dice nella i esima iterazione non ho preso un arco di C
	- Fi dice con i iterazioni non ho mai preso un arco di C
- probabilità per il caso base
	- F1 e E1 sono uguali
	- mi trovo un lower bound di m ponendo 2m>=kn
	- grado del grafo è maggiore uguale di kn
	- trovo m>=kn/2
- prendo la probabilità di F1 e E1 e sostituisco m 1-k/m con m cambiato e metto >= $1-(\frac{k}{\frac{kn}2})$
- calcolo probabilità condizionata $E_i|F_{i-1}$ e la metto maggiore uguale alla stessa probabilità per F1 e E1 solo che al posto di n metto n-i+1
- la probabilità per Fn-2 è maggiore uguale della produttoria di quello visto prima solo che diventa una produttoria nota con 2/n(n-1)
- quindi probabilità di prendere un arco di questi è 1-2/n(n-1)
- Tempo $O(n^2)$
- Spazio $O(n+m)$
#### Content Resolution
- PROBLEMA
    - `n` processi e risorsa condivisa (se x >= 2 processi accedono -> collisione)
    - a ogni `t` -> p[accesso]=1/n
    - quanto è probabile che dopo `t` istanti esista almeno un processo che non abbia acceduto?
- DIMOSTRAZIONE
    - $S_{i,t} = \{1 \ \text{se i accede nell'istante t} \ ; \ 0 \ \text{altrimenti}$
    - $Pr[S_{i,t}] = \frac{1}{n} \cdot \left( 1-\frac{1}{n} \right)^{n-1}$
        - per n->$\infty$ -> $\frac{1}{n} \cdot \frac{1}{e}$
    - $Pr[fallimento]\geq 1- \frac{1}{en}$
    - Dopo `t` istanti (per singolo processo) -> $Pr[fallimento] \leq Pr[F_{i,t}]=\left( 1-\frac{1}{en} \right)^{t}$
    - Per `n` processi -> UNION BOUND -> $Pr[\cup F_{i,t}]=\sum_{i=1}^{n}(1-\frac{1}{en})^t$
#### Load Balancing
problema
- n processori
- m processi
- vogliamo associare un processo a una macchina facendo si che ci sia un buon bilanciamento
- carico di un processore <=m/n
pseudocodice
```scss
-input n processori e m processi
lista vuota di carico per ogni processore
for all processi
	scegli u.a.r un processore 
	load[processore]++
	return max load[i]
```
analisi
sia $Y_i,j$ variabile aleatoria uguale a 1 se il processo i viene assegnato alla macchina j
$X_j$= numero di processi nella macchina j

probabilità di $Y_i,j$ è 1/n
se processori=processi
$expectation[X_j]$ è = sommatoria per j fissato ma i no risulta uguale a $n*1/n=1$

si vuole usare il chernoff bound per stimare che la variabile Xj superi una certa soglia di processi
$Pr[X_j>c]$
Chernoff bound $Pr[X>(1+\delta)\mu]< (\frac{e^\delta}{(1+\delta)^{1+\delta}})^\mu$
applicando la formula abbiamo una cosa che poniamo < ad $(e/c^c)^c$ 
poniamo $c=(1+\delta) \mu$ con mu uguale alla expectation di Xj a 1
successivamente sostituiamo i valori poniamo $\gamma(n)$ t.c $x^x=n$ 
quindi $\gamma(n)^{\gamma(n)}=n$ 
poniamo $c=e*\gamma(n)$
dopo sostituzioni varie poniamo un altro bound a $<1/n^2$
alla fine calcoliamo la probabilità che nessun processore riceva più di c job
prima calcoliamo la cosa facendo l'unione di tutte le macchine di $X_j$ e poi mettiamo 1- questo risultato per avere ciò di cui avevamo bisogno

#### Randomized Median Algorithm
problema
- Lista S di n elementi non ordinata
- si vuole trovare il mediano n/2 parte intera superiore senza ordinare tutto S
- S grande
idea e pseudocodice
- prendiamo un sottoinsieme R di $n^{3/4}$ elementi scelti `u.a.r`
- prendo d e u come $n^{3/4}-\sqrt{n}$ e u come  $n^{3/4}+\sqrt{n}$
- prendo ld e lu come numero di elementi in S che sono minori come valori e maggiori di d e u
- se ld o lu>$n/2$ fail
- C= tutti gli elementi di S compresi tra d e u
- se |C|>$4n^{3/4}$ fail
- ordina C prendi l'elemento in posizione $n/2$-ld+1
analisi
Y_1 è il numero di elementi in R che sono sotto la mediana di S
Y_2 è il numero di elementi in R che sono sopra la mediana di S

Eventi di fallimento
$E1=Y_1<n^{3/4}-\sqrt{n}$
$E2=Y_1<n^{3/4}-\sqrt{n}$
$E3=|C|>4n^{3/4}$
per trovare E1 usiamo la Chebyshev inequality
$Pr[|X-\mathbb{E}[X]|>=a]<=\frac{Var[X]}{a^2}$
$Pr[Y_1<n^{3/4}-\sqrt{n}]$

definisco $X_i$ variabile aleatoria come $=1$ se l'elemento $x_i<mediana$

$Y_1$=sommatoria di i che va da 1 a $n^{3/4}$ di $X_i$ 

$E[Y_1]=$ expectation sommatoria di i che va da 1 a $n^{3/4}$ di $X_i$ 

la probabilità di $X_i=\frac{\frac{n}{2}}{n}=1/2$
quindi poi ti calcoli la sommatoria per $Y_1$

per la varianza di $Y_1$ te la calcoli come la sommatoria della varianza di $X_i$
$VAR[X_i]=E[X_i^2]+(E[X_i])^2$
poi nella formula mettiamo tutti i pezzi
- prendi la formula della probabilità ti porti a sx $n^{3/4}$ cambi il segno della radice e poi metti il modulo, ti risulterà avere proprio una Chebyshev da applicare 
- applicala e hai fatto
E2 uguale a E1
$Pr[E3]<=n^{\frac{-1}{4}}/2$ 

union bound su questi eventi per stimare probabilità di errore

costi
tempo: $n^{3/4} log n$
spazio: $O(n)$

#### Document Similarity
Dato un insieme U di documenti si vuole calcolare la similarità tra tutti loro
usiamo una funzione di confronto Jaccard similarity intersezione di documenti D1 D2 fratto cardinalità unione
Jaccard similarity=probabilità di unione condizionata a intersezione
###### Shingling
siano i token l'alfabeto dei caratteri usati dai documenti
un k shingle è una sequenza di k token nel documento
ogni documento ha una sequenza di k shingle
creo una matrice con tutti i possibili k-shingle $|U_t|^k$
la matrice M sarà con le righe i k shingle e con le colonne i documenti
è di tipo binario {0,1}
matrice davvero troppo grande applichiamo min hashing
###### Min hashing
Costruisco una matrice delle firme che approssima la matrice degli Shingle
utilizzo t funzioni hash ognuna definita come
data una pi greco permutazione
$h_{\pi}(D)=min\{\ i\in \ m:M_{\pi{(i)D}}=1\}$
la probabilità che avvenga una collisione tra 2 documenti è uguale alla jaccard similarity dei due
utilizziamo t funzioni hash e calcoliamo la signature similarity di due documenti come
$$Sign-Sim(D1,D2)=\frac{|\{i=1,...,t:h_{\pi i}(D1)=h_{\pi i}(D2)\}|}{t}$$
$t->\infty->signsim->jsim$ 
*Doc pair check*
tempo O(t) spazio O(1)
```scss
input: D1,D2,t
inizializza Sign-sim(D1,D2) a 0
for i=1,...,t 
	if h_t(D1)=h_t(D2):
		Sign-sim(D1,D2)++
return Sign-sim(D1,D2)/t
```

*Matrix Signature construction*
$O(m*n)$ tempo $O(n)$ spazio
```
input: matrice M e t funzioni hash
Signature matrice txN inizializzata a infinito
for riga i della matrice M
	for colonna j della matrice M
		if(M(i)(j)==1)
			for t 
			if(h_t(i)<sig(t)(j))
				aggiorna sig
return sig
```

###### Local Sensitive Hashing
risolve il problema relativo a un eccessivo numero di confronti per ogni documento
porterebbe un costo $O(N^2)$
l'idea è di stimare preventivamente se conviene o meno confrontare due documenti
viene suddivisa la signature matrix in b bande e r righe t.c $t=b*r$

viene effettuata una funzione di hashing per ogni banda e questa viene messa in una certa entratura con bucket
se due documenti sono uguali per almeno una banda allora vale la pena confrontarli
- se $h(b(C_{1})) = h(b(C_{2}))$ -> buone possibilità di similarità
- $Pr[\text{firme coincidono in una r}] = J-sim = x$
- $Pr[\text{tutte le righe coincidono}] = x^r$
- $Pr[\text{nessuna riga coincide/una banda non coincide}] = 1-x^{r}$
- $Pr[\text{nessuna delle b bande coincide}] = (1-x^{r})^{b}$
- $Pr[\text{ALMENO una banda coincide / SUCCESSO}] = 1- (1-x^{r})^{b}$
- FALSI NEGATIVI -> devo controllare sulla matrice delle firme (O($n^{2}$)) -> diminuisco aumentando `b` 
#### Pattern Matching

##### Karp Rabin
#### Sampling dello stream
problema
Sia S uno stream di n elementi x1,...xn dove ogni elemento è una tupla composta da idutente query e tempo di arrivo della query
si vogliono effettuare calcoli statistici su queste query come ad esempio contare il numero di occorrenze della query q
analizzare tutto lo stream risulta eccessivamente costoso, si vuole trovare un sottoinsieme di S detto campione
questo campione può essere fatto con 2 approcci diversi
- dimensione proporzionale allo stream, es: 1/10 della dimensione dello stream
- dimensione fissa s dove s<|S|
###### Algoritmo banale
pseudocodice
```scss
input:stream,k
C campione vuoto
for tupla t in stream
	scegli un bucket uniformemente a caso tra k bucket
	se il bucket è 0
		salva t in C
per una certa query q
restituisci count[q] in C
```
analisi
l'algoritmo non prende molto bene gli elementi in modo distinto
si vuole stimare
$\mathbb{E}[elementi distinti \in S]$ 
per farlo poniamo un problema più semplice da definire
date m query distinte e d query distinte
gli utenti ne hanno fatte m query e 2d query 
si vuole trovare d/m+d ovvero la frazione delle d query distinte
la expectation è data dalla somma delle expectation
Allora:

$$\mathbb{E}[X] = \mathbb{E}[X_{\text{singole}}] + \mathbb{E}[X_{\text{doppie viste una volta}}] + \mathbb{E}[X_{\text{doppie viste due volte}}]$$
quindi sarebbe m/10+d/100+18d/100

quindi il nostro campione avrebbe
$$\frac{\frac{d}{100}} {\frac{m}{10}+\frac{19d}{100}}$$
che se lo svolgiamo esce una roba che fa una stima molto più grande rispetto a d/m+d
###### User sample algorithm
pseudocodice
```scss
input:stream, lista utenti, k
C lista vuota
sia h:U->[k]
for u in listautenti:
	se h(u)==1
		metti tutte le query delle tuple di u in C
esegui statistiche su C
```
analisi
si vuole calcolare la expectation sulla dimensione di S
$\mathbb{E}[|S|]$
sia Xi variabile aleatoria che vale 1 se l'utente i finisce nel bucket 1
sia Yi il numero di query distinte che ha fatto l'utente j
$\mathbb{E}[|S|]=\sum_{i=1}^{u}\mathbb{E}[X_i]\ Y_i$ 
Y_i non lo mettiamo perchè è fissato su base della stream
alla fine abbiamo 1/k la probabilità che u venga scelto moltiplicato per la sommatoria di Yi ovvero la dimensione dello stream
quindi alla fine abbiamo |U|/k
dove U è l'universo ovvero il numero di elementi distinti della stream
#### Reservoir sampling
problema
dato uno stream di n elementi x1,...xn 
si vuole fare un sample costante dove la dimensione del campione è <=k
pseudocodice
```scss
input: stream,k
sia F lista vuota di dimensione fissa k
for i in stream
	scegli u.a.r se mettere i in F
		se true controlla |F|=k allora
			togli un elemento con prob 1/k
			e metti i
return F
```
analisi
si vuole dimostrare che l'insieme F contiene gli elementi dello stream con stessa probabilità uniforme k/n
induzione
caso base
n=k
probabilità k/k=1
ipotesi al caso n+1 un nuovo elemento quindi
la probabilità che un elemento in F rimane è
probabilità che viene scelto il nuovo elemento moltiplicata per la probabilità che uno viene eliminato ma non è quello
più probabilità che il nuovo elemento non viene preso 
$$Pr[X \text{ rimane}] = 1-\frac{k}{n+1} + \frac{k}{n+1}\cdot 1-\frac{1}{k}$$
#### Sliding Window
dato uno stream S di elementi x1,...,xm si vuole mantenere una finestra grande N degli elementi più recenti
##### Counting Bits
problema 
dato uno stream S x1,..., xm t.c xi appartiene a 0 o 1 relativo a sliding window, dove noi vogliamo contare il numero di 1 nei k bit della finestra N dove $k<N$
$$\#1(S,N,k)$$
###### exp bucket
dato lo stream S suddivido in bucket gli elementi che arrivano con dimensione $2^j$
quando arriva un nuovo elemento n creo un bucket di dimensione 1, se ne esiste già uno faccio il merge dei due provocando un merge a cascata
se un bucket B esce dalla window lo elimino
un bucket contiene la sua dimensione e il numero di 1 che contiene
restituisco la somma dei bucket

analisi
l'algoritmo potrebbe dare una stima sbagliata sul numero di 1 dello stream dovuto a causa del bucket più vecchio, quest'ultimo potrebbe contenere tutti i bit a 1 al di fuori della finestra k ma comunque li conteremmo tutti
###### DGIM
suddivido in bucket lo stream
la dimensione dei bucket rappresenta il numero di uno
esso è espresso con potenze di 2
ho la certezza che il bucket più vecchio abbia come ultimo bit un 1 quindi la stima è con almeno un bit a 1
di conseguenza possiamo dire che da una stima migliore rispetto a exp bucket
il bucket più vecchio viene preso fratto 2
#### Algoritmi sulle stream
##### Sampling Algorithm
Problema
Dato uno stream di n elementi xi appartenenti a interi dato un elemento y trovare f(y)={i:1...n:xi=y}

Idea e soluzione
Questo algoritmo sfrutta un sampling a dimensione fissa k t.c $k<n$

```scss
Pseudocodice
Input:stream, k
F insieme vuoto di dimensione fissa k
scelgo k posizioni casuali dello stream
inserisco quelle k posizioni in F
query(y):
calcolo frequenza di y
return m/k*F(y)
```
problema possiamo avere sia sovrastima e sottostima di f(y)

$$\mathbb{E}[X]=\sum_x x \cdot \Pr[X=x]$$
##### Count Min-Sketch
### Filtri sulle Stream
dato uno stream X x1,...,xn t.c xi=<key1,...,keyn>
fornito un insieme S di chiavi ottime sottoinsieme di U dove U_k è l'insieme dei valori delle chiavi distinte di key1
accettare o meno una chiave di un elemento che arriva dalla stream
###### First Cut
questo algoritmo si basa su una funzione hash $h:U_k->[m]$
```scss
input:S insieme di chiavi ottime
h:Uk->[m]
sia B lista inizializzata a 0 di m elementi
for i in S
	calcola h(S[i])
	B[h(S[i])]=1

fase di query(x)
arriva un nuovo elemento
if (B(h(x_k1))==1)
	accetta x
```
analisi
$Pr[falso positivo]=(1-(1-1/m)^n)$

###### Bloom filter
problema uguale al precedente
soluzione e idea
utilizzare t funzioni hash indipendenti invece di 1
```scss
input:S insieme di chiavi ottime, t
B lista inizializzata a 0 di m elementi
scegli t funzioni hash indipendenti da una famiglia di funzioni hash
for i in S
	for j=1...t
		B[h_j(i)]=1

fase di query(x)
arriva x
for j=1...t
	if(B[h_j(x)]==1 per tutte le j)
		return accetta
```
analisi
$Pr[falsopositivo]=(1-(1-1/m)^{nt})^t$

###### Flajolet Martin
problema
dato uno stream S di n elementi x1,...,xn
contare il numero di elementi distinti di S
sia U l'universo di elementi distinti di dimensione N
idea
utilizzare una funzione hash $h:U->\{0,1\}^s$
dove s>=log_2(N)
sia r(x) funzione che restituisce la posizione del primo 1 partendo da destra
mantenere in memoria lo sketch del R=max(r(x)) visto finora
restituire $2^R$
analisi
con probabilità molto bassa $1/2^R$ abbiamo una codifica con tanti zeri a destra e un 1 in posizione lontana
se eseguiamo tante volte un hash con output diverso quindi vediamo tanti elementi distinti aumenta questa probabilità e quindi potenzialmente abbiamo visto $2^R$ elementi distinti
###### AMS
problema
dato uno stream di elementi x1,...,xm dato 
mi=numero di volte in cui appare l'elemento xi nello stream
sia U l'universo degli elementi distinti di dimensione N
sia definito il momento k esimo come
sommatoria  $\sum_{i=1}^{|U|}m_i^k$
i momenti 
F0: numero di elementi distinti
F1: dimensione dello stream
F2: surprise number, utile per indicare la distribuzione delle frequenze degli elementi distinti
- basso se elementi con frequenza ben distribuita
- alto se elementi con frequenza mal distribuita
Algoritmo per il calcolo dei momenti
si vuole avere un sottoinsieme dei momenti di dimensione k
dove si prende un elemento in una posizione casuale dallo stream, successivamente si conta il numero di volte in cui appare quell'elemento nei passi successivi della stream fino alla fine
f(x) è una funzione di stima dei momenti date le occorrenze di quel singolo elemento a destra definita come
$$f(x)=L(2*c-1)$$
dove c è il numero di volte in cui appare l'elemento a destra degli elementi
L è la dimensione dello stream
```scss
input: stream di dimensione L,k
momenti=0
for i=1,...,k
	contatore=0
	scegli uniformemente a caso dallo stream una posizione
	contatore=calcola le occorrenze fino a L di quell'elemento
	momenti+=L(2*contatore-1)
return momenti/k
```
