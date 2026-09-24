
###### Vettori e regola del parallelogramma
Un vettore può essere visto come un segmento orientato oppure come una colonna di coordinate.
La somma di due vettori si calcola componente per componente.
Geometricamente, la somma di due vettori si rappresenta con la **regola del parallelogramma**: dati due vettori applicati nello stesso punto, la loro somma è la diagonale del parallelogramma costruito sui due vettori.
Il prodotto di un vettore per uno scalare modifica lunghezza e verso:
- se $\lambda>0$, stesso verso;
- se $\lambda<0$, verso opposto;
- se $\lambda=0$, vettore nullo.
###### Prodotto matrice-vettore
Se:
$$A\in M_{m,n}(\mathbb R), \qquad x\in \mathbb R^n$$
allora:
$$Ax\in \mathbb R^m$$
Il prodotto matrice-vettore si fa riga per colonna.
Interpretazione importante:
$$Ax$$
è una combinazione lineare delle colonne di $A$, con coefficienti dati dalle componenti di $x$.
###### Prodotto tra matrici
Se:
$$A\in M_{m,n}(\mathbb R), \qquad B\in M_{n,p}(\mathbb R)$$
allora il prodotto $AB$ è definito e:
$$AB\in M_{m,p}(\mathbb R)$$
Il prodotto si fa riga per colonna.
In generale:
$$AB\neq BA$$
e a volte $BA$ può anche non essere definito.
###### Sottospazio vettoriale
Un sottoinsieme $W\subseteq V$ è un sottospazio vettoriale se:
- contiene il vettore nullo;
- è chiuso rispetto alla somma;
- è chiuso rispetto al prodotto per scalare.
In formula:
$$u,v\in W \Rightarrow u+v\in W$$
$$\lambda\in\mathbb R,\ v\in W \Rightarrow \lambda v\in W$$
Una retta o un piano sono sottospazi solo se passano per l’origine.
###### Span
Lo span di alcuni vettori è l’insieme di tutte le loro combinazioni lineari:
$$\operatorname{Span}(v_1,\dots,v_k)={\alpha_1v_1+\dots+\alpha_kv_k:\alpha_i\in\mathbb R}$$

Lo span è sempre un sottospazio vettoriale.
###### Base
Una base di uno spazio vettoriale $V$ è un insieme di vettori che:
- genera $V$;
- è linearmente indipendente.
Quindi:
$$B={v_1,\dots,v_n}$$
è una base di $V$ se:
$$V=\operatorname{Span}(v_1,\dots,v_n)$$
e i vettori sono linearmente indipendenti.
###### Dimensione
La dimensione di uno spazio vettoriale è il numero di vettori di una sua base.
$$\dim \mathbb R^n=n$$
La dimensione dello spazio nullo è:
$$\dim{0}=0$$
La base dello spazio nullo ${0}$ è l’insieme vuoto.
###### Sistema lineare e sistema omogeneo
Un sistema lineare si scrive:
$$Ax=b$$
dove:
- $A$ è la matrice dei coefficienti;
- $x$ è il vettore delle incognite;
- $b$ è il vettore dei termini noti.
Un sistema è compatibile se ammette almeno una soluzione.
Un sistema è omogeneo se:
$$Ax=0$$
Ogni sistema omogeneo ha sempre almeno la soluzione nulla.
###### Nucleo e immagine come sottospazi
Se $T:V\to W$ è lineare, allora:
$$\ker T\subseteq V$$
è un sottospazio del dominio.
Inoltre:
$$\operatorname{Im}T\subseteq W$$
è un sottospazio del codominio.
Il nucleo contiene sempre il vettore nullo, quindi non è mai vuoto.
###### Teorema rango-nullità
Per una applicazione lineare:
$$T:V\to W$$
vale:
$$\dim V=\dim(\ker T)+\dim(\operatorname{Im}T)$$
Nel caso matriciale, se:
$$A\in M_{m,n}$$
allora:
$$n=\dim(\ker A)+\operatorname{rg}(A)$$
dove $n$ è il numero di colonne, cioè la dimensione del dominio.
###### Determinante: proprietà teoriche utili
Il determinante è definito solo per matrici quadrate.
Se una riga o una colonna è nulla, allora:
$$\det A=0$$
Se due righe o due colonne sono uguali o proporzionali, allora:
$$\det A=0$$
Scambiare due righe cambia il segno del determinante.
Moltiplicare una riga per $\lambda$ moltiplica il determinante per $\lambda$.
Aggiungere a una riga un multiplo di un’altra riga non cambia il determinante.
Vale:
$$\det(A^T)=\det(A)$$
$$\det(AB)=\det(A)\det(B)$$
###### Forma cartesiana del piano
La forma cartesiana di un piano è:
$$ax+by+cz+d=0$$
Il vettore:
$$(a,b,c)$$
è normale al piano.
###### Autospazio: precisazione teorica
L’autospazio associato a un autovalore $\lambda$ è:
$$E_\lambda=\ker(A-\lambda I)$$
L’autospazio contiene anche il vettore nullo.
Il vettore nullo però non è un autovettore.
Quindi gli autovettori sono i vettori non nulli dell’autospazio.
###### Diagonalizzabilità: definizione teorica
Una matrice quadrata $A$ è diagonalizzabile se esiste una base formata da autovettori di $A$.

Equivalentemente, $A$ è diagonalizzabile se si riescono a trovare $n$ autovettori linearmente indipendenti.

Se $A$ è diagonalizzabile, allora è simile a una matrice diagonale:

$$D=P^{-1}AP$$

dove $P$ contiene gli autovettori in colonna e $D$ contiene gli autovalori sulla diagonale.