 # Procedura per costruire il polinomio interpolante
### Calcolare i valori della funzione
Per ogni nodo si calcola: $y_i=f(x_i)$ (se già lo hai skippa)
- Quindi si ottengono i punti: $(x_0,y_0),\ (x_1,y_1),\ \ldots,\ (x_n,y_n)$
### Costruire il polinomio interpolante
Si usa la formula: $p(x)=\sum_{j=0}^{n} y_jL_j(x)$
- Con $L_j(x)=\prod_{\substack{k=0\\k\neq j}}^n\frac{x-x_k}{x_j-x_k}$
    - Questa è la **forma di Lagrange**.
Scritta per esteso: $p(x)=y_0L_0(x)+y_1L_1(x)+\cdots+y_nL_n(x)$
### Scrivi forma canonica
Si sostituiscono i nodi $x_0,x_1,\ldots,x_n$ e i valori $y_0,y_1,\ldots,y_{n}$
Poi si calcolano tutti i denominatori: $x_j-x_k$

Si sviluppano i prodotti presenti nei vari polinomi di Lagrange.

Il risultato finale avrà una forma del tipo:
$$
p(x)=a_0+a_1x+a_2x^2+\cdots+a_nx^n
$$
Questa è la **forma canonica** del polinomio.
### Procedura per stimare l’errore di interpolazione
Dopo aver costruito il polinomio interpolante $p(x)$, l’errore è:
$$  
E(x)=f(x)-p(x)  
$$
Nei nodi l’errore è nullo, perché:
$$  
p(x_i)=f(x_i)  
$$
quindi:
$$  
f(x_i)-p(x_i)=0.  
$$
##### Formula del resto
Se ci sono $n+1$ nodi, allora $p$ ha grado al massimo $n$.
Se $f\in C^{n+1}[a,b]$, allora:
$$  
f(x)-p(x)=  
\frac{f^{(n+1)}(\xi)}{(n+1)!}  
\prod_{i=0}^n(x-x_i)  
$$
dove $\xi\in(a,b)$.
Il prodotto
$$  
\pi(x)=\prod_{i=0}^n(x-x_i)  
$$
si chiama **polinomio nodale**.
#### Stima dell’errore
Poiché $\xi$ non è noto, si usa un maggiorante:
$$  
M_{n+1}=\max_{x\in[a,b]}|f^{(n+1)}(x)|.  
$$
Allora:
$$  
|f(x)-p(x)|  
\le  
\frac{M_{n+1}}{(n+1)!}  
|\pi(x)|.  
$$
Cioè:
$$  
|f(x)-p(x)|  
\le  
\frac{M_{n+1}}{(n+1)!}  
\left|\prod_{i=0}^n(x-x_i)\right|.  
$$
#### Se il punto $t$ è fissato
Si sostituisce direttamente $t$:
$$  
|f(t)-p(t)|  
\le  
\frac{M_{n+1}}{(n+1)!}  
\prod_{i=0}^n|t-x_i|.  
$$
#### Se serve una stima per ogni $x\in[a,b]$
Bisogna stimare:
$$  
|\pi(x)|=  
|x-x_0|\cdots|x-x_n|.  
$$
#### Stima semplice
Si maggiora ogni fattore separatamente.
Se:
$$  
|x-x_i|\le d_i,  
$$
allora:
$$  
|\pi(x)|\le d_0d_1\cdots d_n.  
$$
Quindi:
$$  
|f(x)-p(x)|  
\le  
\frac{M_{n+1}}{(n+1)!}  
d_0d_1\cdots d_n.  
$$
#### Stima più precisa
Si calcola direttamente:
$$  
\max_{x\in[a,b]}|\pi(x)|.  
$$
Per farlo si studia il polinomio nodale:
$$  
\pi(x)=\prod_{i=0}^n(x-x_i)  
$$
controllando estremi e punti critici.
#### Schema rapido
1. Conta i nodi: se sono $n+1$, serve $f^{(n+1)}$.
2. Scrivi il polinomio nodale:
$$  
\pi(x)=\prod_{i=0}^n(x-x_i).  
$$
3. Trova:
$$  
M_{n+1}=\max |f^{(n+1)}|.  
$$
4. Applica:
$$  
|f(x)-p(x)|  
\le  
\frac{M_{n+1}}{(n+1)!}|\pi(x)|.  
$$
5. Se il punto è fissato, sostituiscilo direttamente.
6. Se serve una stima globale, maggiora $|\pi(x)|$.
