#### Coin Flip
- **Esempio (Coin Flips):** Qual è la probabilità di ottenere più di $3N/4$ teste in $N$ lanci?
    
    - $E[X] = N/2$. Applicando Markov: $\Pr(X \geq 3N/4) \leq \frac{N/2}{3N/4} = \frac{2}{3}$.
        
        - _Nota:_ Questo limite è molto pessimistico, la probabilità reale è molto più bassa.
Riprendendo l'esempio di $N$ lanci di moneta (Bernoulli trial):
- Per una singola moneta (Bernoulli $p=1/2$): $E[X_i] = 1/2$ e $Var[X_i] = p(1-p) = 1/4$.
- Per $N$ lanci indipendenti (Binomiale): $E[X] = N/2$ e $Var[X] = N/4$.
- **Bound di Chebyshev:** La probabilità di avere $X \geq 3N/4$ (ovvero una deviazione $\geq N/4$ dalla media) è: $$\Pr(|X - N/2| \geq N/4) \leq \frac{N/4}{(N/4)^2} = \frac{4}{N}$$
- **Conclusione:** Rispetto al $2/3$ di Markov, il limite di Chebyshev ($4/N$) è **significativamente migliore** perché diminuisce all'aumentare di $N$.
#### Coupon Collector
##### Problema
- $n$ coupon di tipologia differente distribuiti in delle scatole
- Calcolare quante scatole è necessario aprire per ottenere almeno un coupon di ogni tipo
##### Parametri
- $X$ la variabile aleatoria che conta il numero di scatole aperte per avere ogni tipo
- $X_i$ la variabile aleatoria del numero di scatole aperte quando si hanno $i-1$ coupon di diverso tipo
$$X= \sum_{i=1}^n X_i$$ dove $X_i$ rappresenta il numero di tentativi fino al primo successo quindi una variabile geometrica
$$p_i=1-\frac{i-1}{n}$$
- il complementare della probabilità di aver pescato un coupon che già avevi
quindi, poi si moltiplica per $n/n$ $$\mathbb{E} [X_i]=\frac{1}{p_i}=\frac{n}{n-i+1}$$
$$\mathbb{E}[X]=\mathbb{E}[\sum_{i=1}^n X_i]$$
porti fuori la sommatoria e porti fuori anche n al numeratore, è una serie armonica e quindi diventa uguale a
$$n \sum_{i=1}^n \frac{1}{n}=n \ log \ n+\Theta(n)$$
si vuole sfruttare la Markov inequality per definire un bound 
$$Pr[X \geq 2\ \mathbb{E}[X]]$$
$\Pr[X \ge a] \le \frac{\mathbb{E}[X]}{a}$ per $a > 0$.

$$Pr[X \geq \ 2n \ log\ n] \leq \frac{1}{2}$$
- si vuole ora avere un bound migliore sfruttando la CHEBYSHEV INEQUALITY
- per farlo dobbiamo prima trovare la varianza
$X_i$ è una variabile geometrica quindi la sua varianza è 
$$\operatorname{Var}(X_i) = \frac{1-p_i}{p_i^2}$$
poniamo la varianza $\leq \frac{1}{p^2}$ a sua volta $\leq (\frac{n}{n-i+1})^2$ 
per cui la $Var(X)$ è uguale alla varianza della sommatoria della varianza di $X_i$ 
$$Var[X] \leq \sum_{i=1}^n (\frac{n}{n-i+1})^2$$
la seguente sommatoria diventa $$n^2 \sum_{j=1}^n \frac{1}{j^2}$$
che sappiamo essere noto valga $$\frac{\pi^2}{6}$$
quindi $$Var[X] \leq \frac{n^2\pi^2}{6}$$
ora che conosciamo la varianza di X possiamo fare la Chebyshev inequality
$\Pr(|X - \mathbb{E}[X]| \ge k) \le \frac{\mathrm{Var}(X)}{k^2}$

quindi $$Pr[|X\ - \ n \ log \ n \geq n \ log \ n|] \leq \frac{\frac{n^2 \pi^2}{6}}{(nlogn)^2}$$
quindi $O(\frac{1}{log^2 n })$ 

quindi si vuole mostrare la probabilità di non ottenere l'i-esimo coupon dopo $n \ log \ n +cn$ passi è
$$(1-\frac{1}{n})^{n\ (log \ n +c)} \le e^{-(log \ n +c)}=\frac{1}{e^cn}$$
uso il bound della Chebyshev

dopo $2n \ log n$ passi abbiamo probabilità < $1/n$
