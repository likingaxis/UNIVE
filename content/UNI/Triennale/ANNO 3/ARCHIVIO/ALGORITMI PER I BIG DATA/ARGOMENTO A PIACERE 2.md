Sì. Prima cosa: **non è vero che non ricordi nulla**. È normale la sera prima: il cervello ha tutto “sparso”, ma appena inizi con il filo logico torna. Ti serve solo una scaletta fissa da seguire.

Ti lascio un **puntuario da leggere a colpo d’occhio** per Count-Min Sketch.

---

# Count-Min Sketch — scaletta orale

## 1. Problema

Ho uno stream:

$I=x_1,\dots,x_m$

con elementi presi da un universo:

$x_i\in[n]$

Voglio stimare la frequenza di un elemento $y$:

$f(y)=|\{i:x_i=y\}|$

cioè quante volte $y$ compare nello stream.

Il problema è che lo stream può essere molto grande, quindi non voglio salvare tutto né mantenere un contatore esatto per ogni elemento dell’universo.

---

## 2. Idea dello sketch

Uso una struttura compatta, cioè uno **sketch**.

Uno sketch è una rappresentazione piccola dello stream che:

* usa poca memoria;
* si aggiorna online quando arriva un elemento;
* permette di rispondere a query con errore controllato.

Nel Count-Min Sketch lo sketch è una matrice di contatori:

$M\in\mathbb{N}^{t\times s}$

dove:

$t=\text{numero di righe}$

$s=\text{numero di colonne/bucket per riga}$

Ogni riga ha una funzione hash indipendente:

$h_j:[n]\to[s]$

Le colonne $s$ sono i **bucket**, cioè le celle in cui gli elementi vengono mandati dalla funzione hash. Le slide definiscono proprio una matrice $M\in\mathbb{N}^{t\times s}$, con una funzione hash universale per ogni riga. 

---

## 3. Hash universale

Le funzioni hash sono universali.

Significa che per due elementi diversi $x\neq y$:

$\Pr[h_j(x)=h_j(y)]\le \frac1s$

Quindi la probabilità che due elementi diversi finiscano nello stesso bucket è bassa.

Questa cosa serve per limitare le collisioni.

---

## 4. Update

Quando arriva un elemento $x$, aggiorno una cella per ogni riga:

$M(j,h_j(x))=M(j,h_j(x))+1$

per ogni:

$j=1,\dots,t$

Quindi ogni elemento dello stream aggiorna $t$ contatori, uno per riga.

---

## 5. Query

Per stimare la frequenza di $y$, guardo i contatori:

$M(j,h_j(y))$

per tutte le righe $j=1,\dots,t$, e restituisco il minimo:

$F(y)=\min_{j=1,\dots,t}M(j,h_j(y))$

Prendo il minimo perché ogni contatore può solo **sovrastimare**, mai sottostimare.

---

## 6. Perché non sottostima mai?

Ogni volta che $y$ appare nello stream, sicuramente incrementa:

$M(j,h_j(y))$

per ogni riga $j$.

Quindi ogni contatore contiene almeno le vere occorrenze di $y$:

$M(j,h_j(y))\ge f(y)$

Il problema sono solo le collisioni: se un altro elemento $x\neq y$ finisce nello stesso bucket di $y$, allora incrementa lo stesso contatore.

Quindi il Count-Min Sketch può sovrastimare, ma non sottostimare. Questo è esattamente il primo fatto evidenziato nelle slide: il contatore viene incrementato ogni volta che arriva $y$, quindi $M(j,h_j(y))\ge f(y)$. 

---

# Analisi probabilistica

## 7. Fisso una riga e un elemento

Fisso:

$y$

e fisso una riga:

$j$

Definisco:

$S=\{x\in[n]: f(x)>0\}$

cioè l’insieme degli elementi distinti che appaiono nello stream.

Definisco la variabile indicatrice:

$\mathbf{1}(j,x,y)= \begin{cases} 1 & \text{se } h_j(x)=h_j(y)\\ 0 & \text{altrimenti} \end{cases}$

Questa variabile vale $1$ se $x$ collide con $y$ nella riga $j$.

---

## 8. Scrivo il contatore

Il contatore di $y$ nella riga $j$ è:

$M(j,h_j(y)) = f(y) + \sum_{x\in S,\ x\neq y}f(x)\mathbf{1}(j,x,y)$

Significato:

$f(y)$

sono le vere occorrenze di $y$.

La sommatoria è il **rumore da collisioni**.

Se $x\neq y$ collide con $y$, allora tutte le sue $f(x)$ occorrenze finiscono nello stesso contatore.

---

## 9. Valore atteso del rumore

Calcolo:

$\mathbb{E}[M(j,h_j(y))] = f(y) + \sum_{x\in S,\ x\neq y}f(x)\mathbb{E}[\mathbf{1}(j,x,y)]$

Poiché $\mathbf{1}(j,x,y)$ è una variabile indicatrice:

$\mathbb{E}[\mathbf{1}(j,x,y)] = \Pr[h_j(x)=h_j(y)] \le \frac1s$

Quindi:

$\mathbb{E}[M(j,h_j(y))] \le f(y) + \sum_{x\in S,\ x\neq y}f(x)\frac1s$

Siccome:

$\sum_{x\in S}f(x)=m$

allora:

$\sum_{x\in S,\ x\neq y}f(x)\le m$

quindi:

$\mathbb{E}[M(j,h_j(y))] \le f(y)+\frac ms$

---

## 10. Errore atteso

Sottraggo $f(y)$:

$\mathbb{E}[M(j,h_j(y))-f(y)] \le \frac ms$

Quindi il rumore atteso della singola riga è al più:

$\frac ms$

Frase da dire bene:

> Per una singola riga, l’errore atteso dovuto alle collisioni è al più $m/s$.

---

## 11. Markov

Definisco il rumore:

$X=M(j,h_j(y))-f(y)$

È una variabile aleatoria non negativa.

So che:

$\mathbb{E}[X]\le \frac ms$

Voglio stimare la probabilità che il rumore sia almeno il doppio del suo valore atteso massimo:

$\Pr\left[X\ge \frac{2m}{s}\right]$

Per Markov:

$\Pr[X\ge a]\le \frac{\mathbb{E}[X]}{a}$

Scelgo:

$a=\frac{2m}{s}$

quindi:

$\Pr\left[X\ge \frac{2m}{s}\right] \le \frac{m/s}{2m/s} = \frac12$

Cioè:

$\Pr\left[M(j,h_j(y))\ge f(y)+\frac{2m}{s}\right]\le \frac12$

Le slide fanno proprio questo passaggio: prima ottengono l’errore atteso al più $m/s$, poi applicano Markov e ottengono probabilità al più $1/2$. 

---

## 12. Scelta di s

Ora voglio scrivere l’errore nella forma standard:

$\varepsilon m$

Allora impongo:

$\frac{2m}{s}=\varepsilon m$

semplifico $m$:

$\frac2s=\varepsilon$

quindi:

$s=\frac2\varepsilon$

Con questa scelta:

$\Pr[M(j,h_j(y))\ge f(y)+\varepsilon m]\le \frac12$

Questa vale per **una singola riga**.

Frase da orale:

> Scegliendo $s=2/\varepsilon$, la probabilità che una singola riga sovrastimi $f(y)$ di più di $\varepsilon m$ è al più $1/2$.

---

## 13. Perché uso t righe?

Una riga può essere cattiva con probabilità al più $1/2$.

Però lo stimatore finale è il minimo:

$F(y)=\min_{j=1,\dots,t}M(j,h_j(y))$

Quindi $F(y)$ supera la soglia solo se **tutte le righe** superano la soglia.

Definisco l’evento cattivo:

$E_j=\{M(j,h_j(y))\ge f(y)+\varepsilon m\}$

So che:

$\Pr(E_j)\le \frac12$

Allora:

$\Pr[F(y)\ge f(y)+\varepsilon m] = \Pr(E_1\cap E_2\cap\dots\cap E_t)$

Poiché le funzioni hash delle righe sono indipendenti:

$\Pr(E_1\cap\dots\cap E_t) \le \left(\frac12\right)^t$

Quindi:

$\Pr[F(y)\ge f(y)+\varepsilon m] \le \left(\frac12\right)^t$

Frase chiave:

> Il minimo è cattivo solo se tutte le righe sono cattive.

---

## 14. Scelta di t

Voglio che la probabilità di fallimento sia al più:

$\delta$

Quindi impongo:

$\left(\frac12\right)^t\le \delta$

cioè:

$2^{-t}\le \delta$

quindi:

$t\ge \log_2\frac1\delta$

Le slide concludono proprio che, fissando $s=2/\varepsilon$ e $t\ge \log(1/\delta)$, si ottiene la garanzia probabilistica finale. 

---

## 15. Garanzia finale

Con:

$s=\frac2\varepsilon$

e:

$t\ge \log_2\frac1\delta$

abbiamo:

$\Pr[f(y)\le F(y)\le f(y)+\varepsilon m]\ge 1-\delta$

Quindi:

* non sottostima mai;
* con probabilità almeno $1-\delta$, non sovrastima di più di $\varepsilon m$.

Questa è la frase più importante di tutto l’algoritmo.

---

# Costi

## 16. Spazio

La matrice ha:

$t\cdot s$

celle.

Quindi:

$O(t\cdot s)$

Sostituisco:

$t=O\left(\log\frac1\delta\right)$

$s=O\left(\frac1\varepsilon\right)$

Ottengo:

$O\left(\frac1\varepsilon\log\frac1\delta\right)$

---

## 17. Tempo di update

Per ogni elemento $x$, aggiorno una cella per ogni riga.

Quindi:

$O(t)$

cioè:

$O\left(\log\frac1\delta\right)$

---

## 18. Tempo di query

Per una query $y$, guardo $t$ contatori e prendo il minimo.

Quindi:

$O(t)$

cioè:

$O\left(\log\frac1\delta\right)$

---

# Versione super breve da ripetere domani

> Il Count-Min Sketch serve a stimare la frequenza $f(y)$ di un elemento $y$ in uno stream $x_1,\dots,x_m$, usando poca memoria.
> Lo sketch è una matrice $M\in\mathbb{N}^{t\times s}$, dove $t$ è il numero di righe, cioè il numero di funzioni hash indipendenti, e $s$ è il numero di colonne, cioè il numero di bucket per riga.
> Ogni funzione hash $h_j:[n]\to[s]$ manda un elemento in una colonna della riga $j$.
> Quando arriva un elemento $x$, aggiorno:
> $M(j,h_j(x))=M(j,h_j(x))+1$
> per ogni riga $j$.
> Per rispondere a una query $y$, restituisco:
> $F(y)=\min_{j=1,\dots,t}M(j,h_j(y)).$
> Prendo il minimo perché i contatori possono solo sovrastimare, mai sottostimare:
> $M(j,h_j(y))\ge f(y).$
> L’errore è causato dalle collisioni con elementi diversi da $y$.
> Fissata una riga, il rumore atteso è al più:
> $\frac ms.$
> Applicando Markov:
> $\Pr\left[M(j,h_j(y))-f(y)\ge \frac{2m}{s}\right]\le \frac12.$
> Scelgo:
> $s=\frac2\varepsilon$
> così:
> $\Pr[M(j,h_j(y))\ge f(y)+\varepsilon m]\le \frac12.$
> Poiché lo stimatore prende il minimo su $t$ righe indipendenti, il minimo è cattivo solo se tutte le righe sono cattive:
> $\Pr[F(y)\ge f(y)+\varepsilon m]\le \left(\frac12\right)^t.$
> Impongo:
> $\left(\frac12\right)^t\le \delta$
> quindi:
> $t\ge \log_2\frac1\delta.$
> Alla fine:
> $\Pr[f(y)\le F(y)\le f(y)+\varepsilon m]\ge 1-\delta.$
> Lo spazio è:
> $O\left(\frac1\varepsilon\log\frac1\delta\right)$
> e update e query costano:
> $O\left(\log\frac1\delta\right).$

---

# Frasi da non sbagliare

Non dire:

> $F(y)\ge F(y)+\varepsilon m$

Devi dire:

$F(y)\ge f(y)+\varepsilon m$

Non dire:

> $2m/s$ è la sovrastima dell’errore di due volte

Meglio:

> $2m/s$ è il doppio del bound sull’errore atteso della singola riga.

Non dire:

> la probabilità che non ci sia rumore

Meglio:

> la probabilità che il rumore sia entro la soglia $\varepsilon m$.

Non dire:

> una collisione in tutte le righe

Meglio:

> il rumore supera la soglia in tutte le righe.

Perché possono esserci collisioni, ma magari il rumore resta comunque piccolo.

---

Ora leggilo due volte, poi dormi. Domani non devi ricordare ogni parola: devi ricordare il **filo**:

$\text{problema} \rightarrow \text{matrice} \rightarrow \text{update/query} \rightarrow \text{non sottostima} \rightarrow \text{rumore} \rightarrow \mathbb{E}[X]\le m/s \rightarrow \text{Markov} \rightarrow s=2/\varepsilon \rightarrow t=\log(1/\delta) \rightarrow \text{garanzia e costi}$

Voglio esprimere la soglia di errore come $\varepsilon m$, cioè come una frazione della lunghezza dello stream. Per questo scelgo $s$ in modo che $\frac{2m}{s} = \varepsilon m$, da cui $s=2/\varepsilon$.