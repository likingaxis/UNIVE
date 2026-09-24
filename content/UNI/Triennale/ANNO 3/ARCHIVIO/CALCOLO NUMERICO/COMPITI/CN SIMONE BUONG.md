
## Pagina 1

**SIMONE BUONGIORNO**  
**0342309**

Cerchiato in rosso: **1**

---

### ESERCIZIO 1:

Utilizzo il teorema sull’errore dell’interpolazione polinomiale.

Prendiamo l’intervallo più stretto contenente tutti i nodi, ovvero

[  
[2.25,\ 3.8025]  
]

in questo intervallo sappiamo che la funzione

[  
\sqrt{x}  
]

è derivabile infinite volte e le derivate sono continue quindi

[  
\sqrt{x} \in C^\infty[2.25,\ 3.8025].  
]

Quindi considerando ciò, il teorema applicabile.

Abbiamo dunque:

[  
\forall x \in [2.25,\ 3.8025]  
]

[  
\exists \text{ un punto } \xi=\xi(x)\in(a,b)  
]

# [  
|f(x)-P(x)|

\left|  
\frac{f^{(n+1)}(\xi)}{(n+1)!}  
(x-x_0)\cdots(x-x_n)  
\right|  
]

Nel nostro caso abbiamo:

[  
\forall x \in [2.25,\ 3.8025]:  
]

# [  
|\sqrt{x}-P(x)|

\left|  
\frac{f^{(10)}(\xi)}{10!}  
(x-x_0)(x-x_1)\cdots(x-x_9)  
\right|  
]

Calcoliamo la derivata decima di

[  
\sqrt{x}=f(x):  
]

# [  
f'(x)=\frac{1}{2}x^{\frac{1}{2}-1}

\frac{1}{2}x^{-\frac{1}{2}}  
]

# [  
f''(x)=  
\left(\frac{1}{2}\right)  
\left(-\frac{1}{2}\right)  
x^{-\frac{1}{2}-1}

-\frac{1}{4}x^{-\frac{3}{2}}  
]

# [  
f'''(x)=  
\left(-\frac{1}{4}\right)  
\left(-\frac{3}{2}\right)  
x^{-\frac{3}{2}-1}

\frac{3}{8}x^{-\frac{5}{2}}  
]

# [  
f^{(4)}(x)=  
\left(\frac{3}{8}\right)  
\left(-\frac{5}{2}\right)  
x^{-\frac{5}{2}-1}

-\frac{15}{16}x^{-\frac{7}{2}}  
]

# [  
f^{(5)}(x)=  
\left(-\frac{15}{16}\right)  
\left(-\frac{7}{2}\right)  
x^{-\frac{7}{2}-1}

\frac{105}{32}x^{-\frac{9}{2}}  
]

# [  
f^{(6)}(x)=  
\left(\frac{105}{32}\right)  
\left(-\frac{9}{2}\right)  
x^{-\frac{9}{2}-1}

-\frac{945}{64}x^{-\frac{11}{2}}  
]

---

## Pagina 2

Cerchiato in rosso: **2**

# [  
f^{(7)}(x)=  
\left(-\frac{945}{64}\right)  
\left(-\frac{11}{2}\right)  
x^{-\frac{11}{2}-1}

\frac{10395}{128}x^{-\frac{13}{2}}  
]

# [  
f^{(8)}(x)=  
\left(\frac{10395}{128}\right)  
\left(-\frac{13}{2}\right)  
x^{-\frac{13}{2}-1}

-\frac{135135}{256}x^{-\frac{15}{2}}  
]

# [  
f^{(9)}(x)=  
\left(-\frac{135135}{256}\right)  
\left(-\frac{15}{2}\right)  
x^{-\frac{15}{2}-1}

\frac{2027025}{512}x^{-\frac{17}{2}}  
]

# [  
f^{(10)}(x)=  
\left(\frac{2027025}{512}\right)  
\left(-\frac{17}{2}\right)  
x^{-\frac{17}{2}-1}

-\frac{34459425}{1024}x^{-\frac{19}{2}}  
]

Quindi otteniamo che:

[  
\forall x \in [2.25,\ 3.8025]:  
]

# [  
|f^{(10)}(x)|

\left|  
-\frac{34459425}{1024}  
x^{-\frac{19}{2}}  
\right|  
\leq  
\frac{34459425}{1024}  
(2.25)^{-\frac{19}{2}}  
]

# [

\frac{34459425}{1024}  
\cdot  
\frac{2^{19}}{3^{19}}  
]

# [

# \frac{34459425}{2^{10}}  
\cdot  
\frac{2^{19}}{3^{19}}

\frac{34459425}{1}  
\cdot  
\frac{2^9}{3^{19}}  
]

[  
\approx 15.18  
]

Riquadro laterale:

Sappiamo che

# [  
2.25=\frac{225}{100}=\frac{9}{4}

\left(\frac{3}{2}\right)^2  
]

quindi

# [  
\left[  
\left(\frac{3}{2}\right)^2  
\right]^{-\frac{19}{2}}

\left(\frac{3}{2}\right)^{-19}  
]

# [

\left(\frac{2}{3}\right)^{19}  
]

Dunque:

[  
\text{con } \xi \in [2.25,\ 3.8025]  
]

# [  
|\sqrt{3}-P(3)|

\left|  
\frac{f^{(10)}(\xi)}{10!}  
(3-2.25)(3-2.4025)(3-2.56)(3-2.7225)(3-2.89)(3-3.0625)(3-3.24)  
\right.  
]

# [  
\left.  
(3-3.4225)(3-3.61)(3-3.8025)  
\right|

]

# [

\left|  
\frac{f^{(10)}(\xi)}{10!}  
\right|  
|3-2.25||3-2.4025||3-2.56||3-2.7225||3-2.89||3-3.0625||3-3.24|  
]

[  
\cdot  
|3-3.4225||3-3.61||3-3.8025|  
]

[  
\leq  
\frac{15.18}{10!}  
\cdot  
(0.75)\cdot(0.5975)\cdot(0.44)\cdot(0.2775)\cdot(0.11)\cdot(0.0625)\cdot(0.24)  
]

# [  
\cdot  
(0.4225)\cdot(0.61)\cdot(0.8025)

7.81\cdot 10^{-11}  
]

Quindi l’errore che si ottiene è

[  
\leq 7.81\cdot 10^{-11}  
]

---

## Pagina 3

Cerchiato in rosso: **3**

### ESERCIZIO 2

Calcolo il polinomio (P_n(x)) partendo dalla forma di Lagrange e poi sviluppando i calcoli lo porto in forma canonica:

[  
x_0=0,\quad x_1=1,\quad x_2=2  
]

[  
f(x_0)= -1\log_2(1)=0  
]

[  
f(x_1)=(1-1)\log_2(2)=0  
]

[  
f(x_2)=(2-1)\log_2(3)=\log_2(3)  
]

Dunque la forma di Lagrange sarà:
$$
[  
P_1(x)

f(x_0)  
\frac{(x-x_1)(x-x_2)}  
{(x_0-x_1)(x_0-x_2)}  
+  
f(x_1)  
\frac{(x-x_0)(x-x_2)}  
{(x_1-x_0)(x_1-x_2)}  
+  
f(x_2)  
\frac{(x-x_0)(x-x_1)}  
{(x_2-x_0)(x_2-x_1)}

]$$

# [

\log_2 3  
\frac{x(x-1)}  
{2(2-1)}  
]

Sviluppando i calcoli otteniamo la forma canonica:

# [  
P_1(x)

# \log_2 3  
\frac{x(x-1)}{2}

# \frac{\log_2 3}{2}(x^2-x)

## \frac{\log_2 3}{2}x^2

\frac{\log_2 3}{2}x  
]

Calcolo ora (P_2(x)) con lo stesso metodo, quindi trovo prima la forma di Lagrange e poi sviluppo i calcoli per trovare la canonica.

[  
x_2=2,\quad x_3=3  
]

[  
f(x_2)=\log_2 3  
]

[  
f(x_3)=2\log_2 4=4  
]

Dunque la forma di Lagrange sarà:

# [  
P_2(x)

# f(x_2)  
\frac{x-x_3}{x_2-x_3}  
+  
f(x_3)  
\frac{x-x_2}{x_3-x_2}

]

# [

\log_2 3  
\frac{x-3}{-1}  
+  
4\frac{x-2}{1}  
]

---

## Pagina 4

Cerchiato in rosso: **4**

Sviluppando i calcoli otteniamo la forma canonica:

# [  
P_2(x)

# \log_2 3  
\frac{x-3}{-1}  
+  
4\frac{x-2}{1}

## -\log_2 3 , x  
+  
3\log_2 3  
+  
4x

# 8

]

# [

## (4-\log_2 3)x  
+  
3\log_2 3

8  
]

Quindi (g(x)) è definita come:

## [  
g(x)=  
\begin{cases}  
\frac{\log_2 3}{2}x^2

## \frac{\log_2 3}{2}x,  
& \text{se } 0\leq x<2  
\[8pt]  
(4-\log_2 3)x  
+  
3\log_2 3

8,  
& \text{se } 2\leq x\leq 3  
\end{cases}  
]

---

### b)

Poiché la funzione (g(x)) è definita a tratti dobbiamo stimare l’errore separatamente nei due intervalli ([0,2]) e ([2,3]) e poi prendere il valore massimo.

Sappiamo che

[  
g(x)\in C^\infty[0,2]  
]

in quanto (g(x)) in ([0,2]) corrisponde a (P_1(x)), che è un polinomio e tutti i polinomi sono di classe (C^\infty).

La stessa considerazione vale per ([2,3]), ovvero

[  
g(x)\in C^\infty[2,3]  
]

in quanto in ([2,3]) (g(x)) corrisponde a (P_2(x)), che è un polinomio e in quanto tale è (C^\infty).

Quindi possiamo applicare il teorema dell’errore sull’interpolazione polinomiale.

Procedo applicandolo prima in ([0,2]) e successivamente in ([2,3]):

[  
\forall x\in[0,2[  
\quad  
\exists \xi=\xi(x)\in(0,2):  
]

# [  
|f(x)-P_1(x)|

\left|  
\frac{f^{(3)}(\xi)}{3!}  
(x-x_0)(x-x_1)(x-x_2)  
\right|  
]

Calcoliamo quindi la derivata terza di (f(x)).

Possiamo riscrivere (f(x)) come:

[  
\frac{1}{\log 2}  
\left[  
(x-1)\log(x+1)  
\right]  
]

allora:

# [  
f'(x)

\frac{1}{\log 2}  
\left[  
1\cdot \log(x+1)  
+  
(x-1)\frac{1}{x+1}  
\right]  
]

## Pagina 5

In alto:

**Simone Buongiorno**  
**0342309**

Cerchiato in rosso: **5**

---

# [  
f''(x)

\frac{1}{\log 2}  
\left[  
\frac{1}{x+1}  
+  
\frac{1\cdot(x+1)-(x-1)\cdot 1}{(x+1)^2}  
\right]  
]

# [

\frac{1}{\log 2}  
\left[  
\frac{1}{x+1}  
+  
\frac{2}{(x+1)^2}  
\right]  
]

# [

\frac{1}{\log 2}  
\frac{x+3}{(x+1)^2}  
]

---

# [  
f'''(x)

\frac{1}{\log 2}  
\left[  
\frac{1\cdot(x+1)^2-(x+3)\cdot 2(x+1)}  
{(x+1)^4}  
\right]  
]

# [

\frac{1}{\log 2}  
\frac{(x+1)\left[(x+1)-2(x+3)\right]}  
{(x+1)^4}  
]

# [

\frac{1}{\log 2}  
\frac{x+1-2x-6}{(x+1)^3}  
]

# [

-\frac{1}{\log 2}  
\frac{x+5}{(x+1)^3}  
]

---

Quindi otteniamo che

[  
\forall x \in [0,2]  
]

# [  
|f'''(x)|

# \left|  
-\frac{1}{\log 2}  
\frac{x+5}{(x+1)^3}  
\right|  
\leq  
\frac{1}{\log 2}  
\cdot  
\frac{7}{1}

\frac{7}{\log 2}  
]

---

Quindi

[  
\forall x \in [0,2]  
]

# [  
|f(x)-P_1(x)|

\left|  
\frac{f'''(\xi)}{3!}  
(x-x_0)(x-x_1)(x-x_2)  
\right|  
]

# [

\frac{|f'''(\xi)|}{6}  
|x||x-1||x-2|  
\leq  
]

# [  
\leq  
\frac{7}{\log 2}  
\cdot  
\frac{1}{6}  
\cdot  
2\cdot 1\cdot 2

6.7325768  
]

Nota: sotto (\log 2) c’è una piccola cancellatura/sbarratura.

---

Svolgiamo lo stesso procedimento per l’intervallo ([2,3]):

[  
\forall x \in [2,3]  
\quad  
\exists \xi=\xi(x)\in [2,3]:  
]

# [  
|f(x)-P_2(x)|

\left|  
\frac{f''(\xi)}{2!}  
(x-x_2)(x-x_3)  
\right|  
]

---

La derivata seconda di (f(x)) l’abbiamo già calcolata quindi possiamo solo trovarne una maggiorazione, perciò abbiamo:

[  
\forall x \in [2,3]:  
]

# [  
|f''(x)|

# \left|  
\frac{1}{\log 2}  
\frac{x+3}{(x+1)^2}  
\right|  
\leq  
\frac{1}{\log 2}  
\cdot  
\frac{6}{9}

\frac{6}{9\log 2}  
]

In basso a sinistra compaiono due piccole parole/parziali cancellate:  
**quindi** / **[simbolo o parola non leggibile]**

---

## Pagina 6

Cerchiato in rosso: **6**

---

Quindi

[  
\forall x \in [2,3] \text{ si ha:}  
]

# [  
|f(x)-P_2(x)|

\left|  
\frac{f''(\xi)}{2}  
(x-x_2)(x-x_3)  
\right|  
]

Nel foglio è presente anche una parte cancellata dopo (\frac{|f''(\xi)|}{2}), poi rimane visibile:

# [

\frac{|f''(\xi)|}{2}  
|x-2||x-3|  
\leq  
]

# [  
\leq  
\frac{6}{9\log 2}  
\cdot  
\frac{1}{2}  
\cdot  
1\cdot 1

1.1073093  
]

---

Poiché

[  
6.7325768 > 1.1073093  
]

possiamo dire che

[  
\forall x\in[0,3]  
]

[  
|f(x)-g(x)| \leq 6.7325768  
]

La formula finale è sottolineata.

---

## ESERCIZIO 3

È disegnata la matrice:

[  
A=  
\begin{bmatrix}  
4 & \frac{2}{3} & -\frac{1}{2}  
\[4pt]  
-1 & 0 & \frac{1}{3}  
\[4pt]  
\frac{2}{3} & \frac{1}{3} & -4  
\end{bmatrix}  
]

---

### (a)

Per localizzare gli autovalori di (A) nel modo più preciso possibile usiamo i teoremi di Gershgorin considerando sia i cerchi per riga

[  
K_1,K_2,K_3  
]

e sia quelli per colonna

[  
H_1,H_2,H_3  
]

individuando con

[  
C(z_0,r)  
]

il cerchio nel piano complesso di centro (z_0) e raggio (r):

---

[  
K_1=(4,1)  
]

[  
K_2=\left(0,\frac{4}{3}\right)  
]

[  
K_3=(-4,1)  
]

---

[  
H_1=\left(4,\frac{5}{3}\right)  
]

[  
H_2=\left(0,\frac{5}{6}\right)  
]

[  
H_3=\left(-4,\frac{5}{6}\right)  
]

A destra di queste formule c’è una piccola cancellatura/scarabocchio.

---

Nella parte bassa della pagina c’è un disegno del piano complesso con tre gruppi di cerchi:

1. A sinistra, intorno al punto circa (-4), ci sono due cerchi concentrici/semiconcentrici etichettati:
    
    - (K_3)
        
    - (H_3)
        
2. Al centro, intorno a (0), ci sono due cerchi etichettati:
    
    - (K_2)
        
    - (H_2)
        
3. A destra, intorno a (4), ci sono due cerchi etichettati:
    
    - (K_1)
        
    - (H_1)
        

Sono segnati gli assi cartesiani: asse reale orizzontale e asse immaginario verticale.

---

## Pagina 7

Cerchiato in rosso: **7**

---

In base al primo teorema di Gershgorin, gli autovalori di (A) si trovano in

# [  
(K_1\cup K_2\cup K_3)  
\cap  
(H_1\cup H_2\cup H_3)

K_1\cup H_2\cup H_3  
]

---

In base al secondo teorema di Gershgorin applicato ai cerchi per riga, un autovalore di (A) sta in (K_1), uno in (K_2) e uno in (K_3), poiché i cerchi sono tutti disgiunti.

In base al secondo teorema di Gershgorin applicato ai cerchi per colonna, un autovalore di (A) sta in (H_1), uno in (H_2) e uno in (H_3), poiché i cerchi sono tutti disgiunti.

Unendo le informazioni ottenute sappiamo che un autovalore di (A) si trova in (K_1), uno in (H_2) e uno in (H_3).

---

Disegno ora il grafo della matrice (A):

Al centro della pagina è presente un piccolo grafo orientato con tre nodi:

[  
1,\quad 2,\quad 3  
]

Sono visibili frecce tra i nodi. Il disegno mostra un ciclo che collega i nodi, in particolare il ciclo:

[  
1 \to 2 \to 3 \to 1  
]

Il presente grafo contiene il ciclo

[  
1\to 2\to 3\to 1  
]

che tocca tutti i nodi, quindi (A) è irriducibile.

---

Poiché (A) è irriducibile possiamo applicare il terzo teorema di Gershgorin.

Quindi, applicando prima ai cerchi per riga, concludiamo che nessun punto del bordo di

[  
K_1\cup K_2\cup K_3  
]

può essere autovalore di (A).

Applicando ai cerchi per colonna concludiamo che nessun punto del bordo di

[  
H_1\cup H_2\cup H_3  
]

può essere autovalore di (A).

Nessun punto del bordo di

[  
K_1\cup K_2\cup K_3  
]

sta sul bordo di tutti i singoli cerchi; e nessun punto del bordo

[  
H_1\cup H_2\cup H_3  
]

sta sul bordo di tutti i singoli cerchi per colonna.

Concludiamo che nessun punto del bordo dell’insieme

[  
K_1\cup H_2\cup H_3  
]

può essere autovalore di (A).

---

Segue una parte completamente cancellata/scarabocchiata su due righe. Non è leggibile con affidabilità.

---

Quindi possiamo garantire che (A) contiene autovalori reali poiché la matrice (A) contiene un elemento immaginario, anche se il polinomio caratteristico di (A) avrà coefficienti complessi.

Nota: questa frase è trascritta come appare, ma è concettualmente poco chiara e potrebbe contenere parole scritte male. La parte leggibile è:  
“possiamo garantire che A contiene autovalori reali poiché la matrice A contiene un elemento immaginario anche se il pol. caratteristico di A avrà coefficienti complessi”.

---

## Pagina 8

Cerchiato in rosso: **8**

---

### (b)

In base al punto (a), (P(A)) coincide con l’autovalore massimo di (A).

Segue una parte lunga cancellata con righe diagonali, parzialmente leggibile. Le parole visibili sembrano dire:

“Poiché (K_1) e (H_1) sono … dall’origine … massimo …”

Poi si legge parzialmente:

“se (K_1) quindi sia di larghezza … in (K_1), allora dal bordo possiamo dire:”

Le formule parzialmente visibili nella zona cancellata sembrano contenere:

[  
P(A)=\lambda_1  
]

e una disuguaglianza del tipo:

[  
\lambda_1 \in (3,5)  
]

ma questa parte è molto coperta dagli scarabocchi, quindi non è possibile garantirla al 100%.

---

È poiché (K_1) e (H_2) sono equidistanti dall’origine, ma (H_3) ha raggio minore di (K_1), possiamo dire che:

Il punto più vicino a (0) in (H_2) è

[  
-\frac{5}{6}  
]

e il punto più lontano è

[  
+\frac{5}{6}  
]

mentre il punto più vicino a (0) in (K_1) è (3) e il punto più lontano è (5).

Allora poiché

[  
\left|-\frac{5}{6}\right| > |3|  
]

e

[  
\left|-\frac{5}{6}\right| < |5|  
]

Allora

[  
\frac{5}{6} < P(A) < 5  
]

Nota: nella riga originale si vede una disuguaglianza simile, ma il confronto (\left|-\frac{5}{6}\right|>|3|) appare scritto così nel foglio, anche se matematicamente non è corretto. Lo sto riportando fedelmente.

---

### (c)

Nella matrice

[  
\alpha I + A  
]

con

[  
\alpha \geq \frac{5}{6}  
]

gli unici cerchi che cambiano sono (K_2) e (H_2), che vengono traslati a destra di (\alpha), quindi al centro di

[  
\frac{5}{6}  
]

Segue una parte cancellata, poi si legge:

“perché (H_2) si troviamo…”

La frase completa, per quanto leggibile, è:

Poiché (H_2) si trasliamo di (\frac{5}{6}), (H_2) sul bordo lo (0), e poiché il grafo di

[  
\alpha I + A  
]

contiene sempre il ciclo

[  
1\to 2\to 3\to 1  
]

allora (A) è irriducibile.

Allora possiamo escludere il bordo di (H_2), inoltre le considerazioni sul fatto [resto poco leggibile] rimangono uguali, in quanto il raggio resta invariato e quindi sul secondo [probabilmente “teorema”] possiamo capire che in questo caso non ci interessa.

Perciò noi possiamo escludere il bordo di (H_2) che contiene lo (0).

Possiamo affermare che (0) non è autovalore di

[  
\alpha I + A  
]

quindi

[  
\alpha I + A  
]

è invertibile.

Attenzione: nel caso in cui

[  
\alpha > \frac{5}{6}  
]

allora lo (0) non compare in nessuno dei punti di

[  
K_1\cup H_2\cup H_3  
]

quindi possiamo escluderlo a priori.

Perciò

[  
\alpha I + A  
]

è invertibile

[  
\forall \alpha \geq \frac{5}{6}  
]

## Pagina 9

In alto:

**Simone Buongiorno**  
**0342309**

Cerchiato in rosso: **9**

---

## Esercizio 4

Sia

[  
\alpha \in \mathbb{R}  
]

e si consideri la matrice

[  
A =  
\begin{bmatrix}  
2 & 0 & -1 \  
1 & 1 & -2 \  
i & \alpha & 1  
\end{bmatrix}  
]

---

### (a)

Poiché (A) non è hermitiana sappiamo per un teorema che (A) è definita positiva se

[  
\operatorname{Re}(A)  
]

è definita positiva con

# [  
\operatorname{Re}(A)

\frac{A+A^*}{2}  
]

Inoltre sappiamo che

[  
\operatorname{Re}(A)  
]

è hermitiana.

Calcolo (\operatorname{Re}(A)):

# [  
\operatorname{Re}(A)

\frac{  
\begin{bmatrix}  
2 & 0 & -1 \  
1 & 1 & -2 \  
i & \alpha & 1  
\end{bmatrix}  
+  
\begin{bmatrix}  
2 & 1 & -i \  
0 & 1 & \alpha \  
i & -2 & 1  
\end{bmatrix}  
}{2}  
]

Nel foglio a destra è anche scritto un passaggio intermedio:

# [

# \frac{1}{2}  
\begin{bmatrix}  
4 & 1 & -2i \  
1 & 2 & \alpha-2 \  
2i & \alpha-2 & 2  
\end{bmatrix}

]

Da cui:

# [

# \begin{bmatrix}  
2 & \frac{1}{2} & -i \  
\frac{1}{2} & 1 & \frac{\alpha-2}{2} \  
i & \frac{\alpha-2}{2} & 1  
\end{bmatrix}

\operatorname{Re}(A)  
]

---

Per un teo sappiamo che una matrice hermitiana è definita positiva se e solo se il det delle sue principali sottomatrici di testa è (>0).

Inoltre lo possiamo applicare su (\operatorname{Re}(A)) in quanto hermitiana.

Quindi calcoliamo i seguenti determinanti:

[  
|2| = 2 > 0  
]

# [  
\left|  
\begin{matrix}  
2 & \frac{1}{2} \  
\frac{1}{2} & 1  
\end{matrix}  
\right|

# 2-\frac{1}{4}

\frac{7}{4}

> 0  
> ]

---

## Pagina 10

Cerchiato in rosso: **10**

---

# [  
\left|  
\begin{matrix}  
2 & \frac{1}{2} & -i \  
\frac{1}{2} & 1 & \frac{\alpha-2}{2} \  
i & \frac{\alpha-2}{2} & 1  
\end{matrix}  
\right|

]

Sviluppo del determinante lungo la prima riga:

# [

## 2  
\left|  
\begin{matrix}  
1 & \frac{\alpha-2}{2} \  
\frac{\alpha-2}{2} & 1  
\end{matrix}  
\right|

## \frac{1}{2}  
\left|  
\begin{matrix}  
\frac{1}{2} & \frac{\alpha-2}{2} \  
i & 1  
\end{matrix}  
\right|

# i  
\left|  
\begin{matrix}  
\frac{1}{2} & 1 \  
i & \frac{\alpha-2}{2}  
\end{matrix}  
\right|

]

# [

## 2  
\left(  
1-  
\left(  
\frac{\alpha-2}{2}  
\right)  
\left(  
\frac{\alpha-2}{2}  
\right)  
\right)

## \frac{1}{2}  
\left(  
\frac{1}{2}

## \frac{\alpha-2}{2}i  
\right)

## i  
\left(  
\frac{1}{2}  
\frac{\alpha-2}{2}

# i  
\right)

]

Nella riga successiva c’è un piccolo scarabocchio/cancellatura dopo un termine, ma il passaggio visibile è:

# [

## 2

## \frac{(\alpha-2)^2}{2}

## \frac{1}{4}  
+  
\frac{(\alpha-2)i}{4}

## \frac{(\alpha-2)i}{4}  
+  
\cancel{[,\text{termine cancellato},]}

# 1

]

I termini immaginari si cancellano. Il risultato scritto è:

# [

-\frac{(\alpha-2)^2}{2}  
+  
\frac{3}{4}  
]

---

Vediamo quando è maggiore di (0):

[  
-\frac{(\alpha-2)^2}{2}  
+  
\frac{3}{4}

> 0  
> ]

[  
-(\alpha-2)^2

-\frac{3}{2}  
]

[  
(\alpha-2)^2  
<  
\frac{3}{2}  
]

[  
-\sqrt{\frac{3}{2}}  
<  
\alpha-2  
<  
\sqrt{\frac{3}{2}}  
]

[  
2-\sqrt{\frac{3}{2}}  
<  
\alpha  
<  
2+\sqrt{\frac{3}{2}}  
]

Nel riquadro a destra è scritto:

# [  
\frac{\sqrt{3}}{\sqrt{2}}

# \frac{\sqrt{2}}{\sqrt{2}}  
\cdot  
\frac{\sqrt{3}}{\sqrt{2}}

\frac{\sqrt{6}}{2}  
]

Quindi:

[  
A \text{ è definita positiva }  
\Longleftrightarrow  
2-\frac{\sqrt{6}}{2}  
<  
\alpha  
<  
2+\frac{\sqrt{6}}{2}  
]

---

### (b)

Applico l’oss smart per trovare il raggio spettrale della matrice d’iterazione del metodo di Gauss-Seidel che chiamerò (G).

Dunque calcolo

[  
\lambda \in A-E =  
\begin{bmatrix}  
2\lambda & 0 & -1 \  
\lambda & \lambda & -2 \  
i\lambda & \alpha\lambda & \lambda  
\end{bmatrix}  
]

Nota: la scrittura originale sembra essere (\lambda E + A - E), o simile. La parte leggibile è la matrice riportata sopra.

Ora per trovare gli autovalori di (G) devo vedere per

[  
\det(\lambda E + A - E)=0  
]

---

## Pagina 11

Cerchiato in rosso: **11**

---

Quindi

# [  
\det(\lambda E + A - E)

\left|  
\begin{matrix}  
2\lambda & 0 & -1 \  
\lambda & \lambda & -2 \  
i\lambda & \alpha\lambda & \lambda  
\end{matrix}  
\right|  
]

Sviluppando il determinante:

# [

## 2\lambda  
\left|  
\begin{matrix}  
\lambda & -2 \  
\alpha\lambda & \lambda  
\end{matrix}  
\right|

# 1  
\left|  
\begin{matrix}  
\lambda & \lambda \  
i\lambda & \alpha\lambda  
\end{matrix}  
\right|

]

# [

## 2\lambda  
\left(  
\lambda^2  
+  
2\alpha\lambda  
\right)

## i  
\left(  
\alpha\lambda^2

# \lambda^2 i  
\right)

]

Qui il foglio continua con:

# [

## 2\lambda^3  
+  
4\alpha\lambda^2

# i\alpha\lambda^2  
+  
i^2\lambda^2

]

# [

## 2\lambda^3  
+  
4\alpha\lambda^2

## i\alpha\lambda^2

# \lambda^2

]

# [

## \lambda^2  
\left(  
2\lambda  
+  
4\alpha

## i\alpha

# 1  
\right)

]

C’è una piccola cancellatura dopo l’uguale, ma il risultato è leggibile.

---

[  
\lambda_{1,2}=0  
]

[  
\lambda_3=  
\frac{1-4\alpha+i\alpha}{2}  
]

---

Perciò

# [  
\rho(G)

\left|  
\frac{1-4\alpha+i\alpha}{2}  
\right|  
]

---

Sappiamo che il metodo di Gauss-Seidel converge se e solo se

[  
\rho(G)<1  
]

Dunque:

[  
\left|  
\frac{1-4\alpha+i\alpha}{2}  
\right|  
<1  
]

[  
\Longleftrightarrow  
\left|  
\frac{1-4\alpha+i\alpha}{2}  
\right|^2  
<1  
]

Nel riquadro a destra:

# [  
|z|^2

\left(  
\sqrt{x^2+y^2}  
\right)^2  
]

---

Quindi:

[  
1-8\alpha+\alpha^2+16\alpha^2<4  
]

[  
17\alpha^2-8\alpha-3<0  
]

Formula risolutiva:

# [  
\alpha_{1,2}

\frac{  
8\pm\sqrt{64-4(17)(-3)}  
}{34}  
]

# [

\frac{  
8\pm\sqrt{64+204}  
}{34}  
]

# [

\frac{  
8\pm\sqrt{268}  
}{34}  
]

# [

\frac{  
8\pm 2\sqrt{67}  
}{34}  
]

# [

\frac{  
4\pm\sqrt{67}  
}{17}  
]

---

È disegnato anche uno schema del segno della parabola, con radici:

[  
\frac{4-\sqrt{67}}{17}  
]

e

[  
\frac{4+\sqrt{67}}{17}  
]

Il tratto centrale è indicato come quello in cui la disequazione è verificata.

---

Quindi:

[  
\text{Gauss-Seidel converge}  
\quad \Longleftrightarrow \quad  
\forall  
\frac{4-\sqrt{67}}{17}  
<  
\alpha  
<  
\frac{4+\sqrt{67}}{17}  
]

Più precisamente, la riga finale scritta è:

[  
\text{Dunque Gauss-Seidel converge }  
\forall  
\frac{4-\sqrt{67}}{17}  
<  
\alpha  
<  
\frac{4+\sqrt{67}}{17}  
]
