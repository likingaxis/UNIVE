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
