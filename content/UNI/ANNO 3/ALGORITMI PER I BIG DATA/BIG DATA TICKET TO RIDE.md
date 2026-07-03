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
