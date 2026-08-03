### Teoremi di convergenza per Jacobi e Gauss-Seidel

##### Teorema 4.3

Supponiamo che $A\in\mathbb{C}^{n\times n}$ soddisfi almeno una delle seguenti condizioni:

- $A$ è a diagonale dominante per righe e irriducibile;
- $A$ è a diagonale dominante in senso stretto per righe;
- $A$ è a diagonale dominante per colonne e irriducibile;
- $A$ è a diagonale dominante in senso stretto per colonne.

Allora i metodi di Jacobi e Gauss-Seidel per risolvere un sistema lineare di matrice $A$ sono convergenti.

###### Osservazione

Se $A\in\mathbb{C}^{n\times n}$ soddisfa almeno una delle quattro condizioni del teorema, allora:

- $A$ è invertibile per il Teorema 3.7;
- gli elementi diagonali di $A$ sono diversi da $0$.

Infatti, se per assurdo ci fosse un elemento diagonale nullo, ad esempio

$$
a_{ii}=0
$$

allora, nel caso di dominanza diagonale per righe, avremmo

$$
0=|a_{ii}|\geq \sum_{\substack{j=1\\j\neq i}}^n |a_{ij}|
$$

quindi necessariamente

$$
a_{ij}=0 \qquad \forall j\neq i
$$

cioè tutta la riga $i$-esima sarebbe nulla. Questo è impossibile se $A$ è invertibile.

Analogamente, nel caso di dominanza per colonne, se $a_{jj}=0$, allora tutta la colonna $j$-esima sarebbe nulla, quindi $A$ non potrebbe essere invertibile.

Conclusione: se $A$ soddisfa almeno una delle quattro condizioni del Teorema 4.3, allora i metodi di Jacobi e Gauss-Seidel sono applicabili, perché richiedono che gli elementi diagonali di $A$ siano non nulli.

##### Dimostrazione del Teorema 4.3

Dimostriamo il risultato per il metodo di Gauss-Seidel sotto l’ipotesi che $A$ sia a diagonale dominante per righe e irriducibile.

Gli altri casi si dimostrano in modo analogo.

Dobbiamo dimostrare che

$$
\rho(G)<1
$$

dove

$$
G=I-E^{-1}A
$$

è la matrice di iterazione di Gauss-Seidel, con $E$ parte triangolare inferiore di $A$ inclusa la diagonale.

Per l’osservazione smart, gli autovalori di $G$ sono le soluzioni dell’equazione

$$
\det(\lambda E + A - E)=0
$$

cioè le radici del polinomio

$$
\det(\lambda E + A - E)
$$

Vediamo la matrice nel caso $n=4$.

Se

$$
E=
\begin{pmatrix}
a_{11} & 0 & 0 & 0\\
a_{21} & a_{22} & 0 & 0\\
a_{31} & a_{32} & a_{33} & 0\\
a_{41} & a_{42} & a_{43} & a_{44}
\end{pmatrix}
$$

allora

$$
\lambda E+A-E=
\begin{pmatrix}
\lambda a_{11} & a_{12} & a_{13} & a_{14}\\
\lambda a_{21} & \lambda a_{22} & a_{23} & a_{24}\\
\lambda a_{31} & \lambda a_{32} & \lambda a_{33} & a_{34}\\
\lambda a_{41} & \lambda a_{42} & \lambda a_{43} & \lambda a_{44}
\end{pmatrix}
$$

cioè gli elementi sulla parte triangolare inferiore, diagonale inclusa, vengono moltiplicati per $\lambda$, mentre gli elementi strettamente sopra la diagonale restano invariati.

Vogliamo dimostrare che tutte le radici di questo polinomio hanno modulo minore di $1$.

Equivalentemente, mostriamo che nessun numero

$$
\lambda\in\mathbb{C}
$$

con

$$
|\lambda|\geq 1
$$

può essere radice del polinomio.

Sia quindi $\lambda\in\mathbb{C}$ tale che

$$
|\lambda|\geq 1
$$

Consideriamo la matrice

$$
\lambda E+A-E
$$

Vogliamo dimostrare che questa matrice è invertibile. Per farlo mostriamo che è a diagonale dominante per righe e irriducibile, esattamente come $A$.

Prima osservazione: $\lambda E+A-E$ è irriducibile come $A$.

Infatti, siccome

$$
|\lambda|\geq 1
$$

abbiamo $\lambda\neq 0$, quindi moltiplicare certi elementi di $A$ per $\lambda$ non cambia il fatto che siano nulli o non nulli.

Gli zeri della matrice $\lambda E+A-E$ stanno nelle stesse posizioni degli zeri di $A$.

Quindi le due matrici hanno lo stesso grafo associato.

Siccome $A$ è irriducibile, il grafo di $A$ è fortemente connesso, e quindi anche il grafo di $\lambda E+A-E$ è fortemente connesso.

Dunque $\lambda E+A-E$ è irriducibile.

Seconda osservazione: $\lambda E+A-E$ è a diagonale dominante per righe.

Fissiamo una riga $i$.

L’elemento diagonale della riga $i$ è

$$
\lambda a_{ii}
$$

quindi il suo modulo è

$$
|\lambda a_{ii}|=|\lambda||a_{ii}|
$$

Gli elementi fuori diagonale della riga $i$ sono:

- quelli con $j<i$, cioè sotto la diagonale, moltiplicati per $\lambda$;
- quelli con $j>i$, cioè sopra la diagonale, lasciati invariati.

Quindi la somma dei moduli degli elementi fuori diagonale della riga $i$ della matrice $\lambda E+A-E$ è

$$
\sum_{j=1}^{i-1}|\lambda a_{ij}|+\sum_{j=i+1}^n |a_{ij}|
$$

cioè

$$
|\lambda|\sum_{j=1}^{i-1}|a_{ij}|+\sum_{j=i+1}^n |a_{ij}|
$$

Ora, siccome $A$ è a diagonale dominante per righe,

$$
|a_{ii}|
\geq
\sum_{j=1}^{i-1}|a_{ij}|+\sum_{j=i+1}^n |a_{ij}|
$$

moltiplichiamo per $|\lambda|$:

$$
|\lambda||a_{ii}|
\geq
|\lambda|\sum_{j=1}^{i-1}|a_{ij}|
+
|\lambda|\sum_{j=i+1}^n |a_{ij}|
$$

siccome

$$
|\lambda|\geq 1
$$

abbiamo

$$
|\lambda|\sum_{j=i+1}^n |a_{ij}|
\geq
\sum_{j=i+1}^n |a_{ij}|
$$

quindi

$$
|\lambda||a_{ii}|
\geq
|\lambda|\sum_{j=1}^{i-1}|a_{ij}|
+
\sum_{j=i+1}^n |a_{ij}|
$$

cioè

$$
|\lambda a_{ii}|
\geq
\sum_{j=1}^{i-1}|\lambda a_{ij}|
+
\sum_{j=i+1}^n |a_{ij}|
$$

Questa è esattamente la dominanza diagonale per righe della matrice $\lambda E+A-E$.

Rimane da verificare che esiste almeno una riga in cui la disuguaglianza è stretta.

Poiché $A$ è a diagonale dominante per righe, nella definizione usata dal prof esiste almeno una riga $k$ tale che

$$
|a_{kk}|>
\sum_{\substack{j=1\\j\neq k}}^n |a_{kj}|
$$

Ripetendo il ragionamento precedente sulla riga $k$, otteniamo una disuguaglianza stretta anche per $\lambda E+A-E$:

$$
|\lambda a_{kk}|
>
\sum_{j=1}^{k-1}|\lambda a_{kj}|
+
\sum_{j=k+1}^n |a_{kj}|
$$

Quindi $\lambda E+A-E$ è a diagonale dominante per righe e irriducibile.

Per il Teorema 3.7, $\lambda E+A-E$ è invertibile.

Allora

$$
\det(\lambda E+A-E)\neq 0
$$

quindi $\lambda$ non è una radice del polinomio.

Abbiamo dimostrato che nessun $\lambda$ con $|\lambda|\geq 1$ è radice del polinomio.

Conclusione: tutte le radici hanno modulo minore di $1$.

Ma queste radici sono gli autovalori di $G$.

Quindi tutti gli autovalori di $G$ hanno modulo minore di $1$, e dunque

$$
\rho(G)<1
$$

Perciò il metodo di Gauss-Seidel è convergente.

$$
\square
$$

Per il metodo di Jacobi, il ragionamento è analogo, ma si usa

$$
J=I-D^{-1}A
$$

e l’equazione smart diventa

$$
\det(\lambda D + A-D)=0
$$

Se $|\lambda|\geq 1$, la matrice $\lambda D+A-D$ conserva la dominanza diagonale e l’irriducibilità, quindi è invertibile per il Teorema 3.7. Dunque nessun $\lambda$ con $|\lambda|\geq 1$ può essere autovalore di $J$, e quindi

$$
\rho(J)<1
$$

I casi per colonne si fanno allo stesso modo, usando la dominanza per colonne nella matrice $\lambda E+A-E$ oppure $\lambda D+A-D$.

I casi in senso stretto sono più semplici, perché basta il primo teorema di Gershgorin: se la dominanza è stretta, lo $0$ sta fuori da tutti i cerchi, quindi la matrice è invertibile senza dover usare l’irriducibilità.

##### Teorema 4.4

Sia

$$
A\in\mathbb{C}^{n\times n}
$$

HDP, cioè hermitiana definita positiva.

Allora il metodo di Gauss-Seidel per risolvere un sistema lineare di matrice $A$ è convergente.

###### Osservazione

Se $A\in\mathbb{C}^{n\times n}$ è HDP, allora:

- $A$ è invertibile, perché i suoi autovalori sono reali e positivi, quindi $0$ non è autovalore di $A$;
- gli elementi diagonali di $A$ sono positivi, infatti

$$
a_{ii}=e_i^*Ae_i>0
$$

dove $e_i$ è l’$i$-esimo vettore della base canonica.

Ricorda: autovalori ed elementi diagonali sono due cose diverse.

Il fatto che $A$ sia HDP implica sia positività degli autovalori sia positività degli elementi diagonali, ma sono due proprietà diverse.

##### Dimostrazione del Teorema 4.4

Dobbiamo dimostrare che

$$
\rho(G)<1
$$

dove

$$
G=I-E^{-1}A
$$

è la matrice di iterazione di Gauss-Seidel.

La dimostrazione si divide in due parti.

###### Parte 1

Dimostriamo che

$$
A-G^*AG
$$

è HDP.

Prima dimostriamo che è hermitiana.

Siccome $A$ è hermitiana, abbiamo

$$
A^*=A
$$

Calcoliamo la trasposta coniugata:

$$
(A-G^*AG)^*
=
A^*-(G^*AG)^*
$$

usando la proprietà

$$
(XY)^*=Y^*X^*
$$

otteniamo

$$
(G^*AG)^*=G^*A^*G
$$

perché

$$
(G^*)^*=G
$$

e poi l’ordine si ricompone nello stesso modo.

Siccome $A^*=A$, segue

$$
(G^*AG)^*=G^*AG
$$

quindi

$$
(A-G^*AG)^*=A-G^*AG
$$

dunque $A-G^*AG$ è hermitiana.

Ora dimostriamo che è definita positiva.

Poniamo

$$
F=E^{-1}A
$$

Allora

$$
G=I-E^{-1}A=I-F
$$

Osserviamo che $F$ è invertibile perché è prodotto di matrici invertibili:

$$
F=E^{-1}A
$$

infatti $E$ è invertibile perché ha diagonale positiva, e $A$ è invertibile perché è HDP.

Inoltre

$$
F^{-1}=A^{-1}E
$$

Infatti

$$
F^{-1}=(E^{-1}A)^{-1}=A^{-1}E
$$

Usiamo anche la notazione

$$
F^{-*}=(F^{-1})^*=(F^*)^{-1}
$$

Questa notazione ha senso perché

$$
(F^{-1})^*
$$

è proprio l’inversa di $F^*$.

Infatti

$$
(F^{-1})^*F^*=(FF^{-1})^*=I^*=I
$$

e

$$
F^*(F^{-1})^*=(F^{-1}F)^*=I^*=I
$$

Ora sviluppiamo

$$
A-G^*AG
$$

siccome

$$
G=I-F
$$

abbiamo

$$
A-G^*AG=A-(I-F)^*A(I-F)
$$

cioè

$$
A-G^*AG=A-(I-F^*)A(I-F)
$$

sviluppiamo il prodotto:

$$
(I-F^*)A(I-F)=A-AF-F^*A+F^*AF
$$

quindi

$$
A-G^*AG=A-\left(A-AF-F^*A+F^*AF\right)
$$

da cui

$$
A-G^*AG=AF+F^*A-F^*AF
$$

Adesso vogliamo riscrivere questa espressione raccogliendo $F^*$ a sinistra e $F$ a destra:

$$
AF+F^*A-F^*AF
=
F^*(F^{-*}A+AF^{-1}-A)F
$$

Verifichiamo i tre termini:

$$
F^*F^{-*}AF=AF
$$

perché

$$
F^*F^{-*}=I
$$

poi

$$
F^*AF^{-1}F=F^*A
$$

e infine resta

$$
-F^*AF
$$

Quindi

$$
A-G^*AG
=
F^*(F^{-*}A+AF^{-1}-A)F
$$

Ora calcoliamo i due termini dentro la parentesi.

Siccome

$$
F^{-1}=A^{-1}E
$$

abbiamo

$$
AF^{-1}=A(A^{-1}E)=E
$$

Inoltre

$$
F^{-*}A=(F^{-1})^*A
$$

ma

$$
F^{-1}=A^{-1}E
$$

quindi

$$
(F^{-1})^*=(A^{-1}E)^*=E^*(A^{-1})^*
$$

siccome $A$ è hermitiana, anche $A^{-1}$ è hermitiana, quindi

$$
(A^{-1})^*=A^{-1}
$$

perciò

$$
(F^{-1})^*=E^*A^{-1}
$$

e dunque

$$
F^{-*}A=E^*A^{-1}A=E^*
$$

Quindi

$$
F^{-*}A+AF^{-1}-A=E^*+E-A
$$

Ora ricordiamo che $E$ è la parte triangolare inferiore di $A$ inclusa la diagonale.

Poiché $A$ è hermitiana, la parte triangolare superiore di $A$ è la trasposta coniugata della parte triangolare inferiore.

Quindi

$$
E+E^*=A+D
$$

dove $D$ è la parte diagonale di $A$:

$$
D=
\begin{pmatrix}
a_{11} & 0 & \cdots & 0\\
0 & a_{22} & \cdots & 0\\
\vdots & \vdots & & \vdots\\
0 & 0 & \cdots & a_{nn}
\end{pmatrix}
$$

Infatti, fuori dalla diagonale, $E+E^*$ ricostruisce $A$, mentre sulla diagonale conta due volte gli elementi diagonali. Per questo

$$
E+E^*=A+D
$$

e quindi

$$
E^*+E-A=D
$$

Allora

$$
A-G^*AG=F^*DF
$$

Abbiamo scoperto quindi che

$$
A-G^*AG=F^*DF
$$

Ora dimostriamo la positività.

Per ogni

$$
y\in\mathbb{C}^n\setminus\{0\}
$$

abbiamo

$$
y^*(A-G^*AG)y
=
y^*F^*DFy
$$

poniamo

$$
u=Fy
$$

Allora

$$
y^*F^*DFy=(Fy)^*D(Fy)=u^*Du
$$

Siccome $F$ è invertibile e $y\neq 0$, allora

$$
u=Fy\neq 0
$$

Ora

$$
u^*Du
=
\sum_{i=1}^n a_{ii}|u_i|^2
$$

siccome $A$ è HDP, gli elementi diagonali sono positivi:

$$
a_{ii}>0
$$

per ogni $i=1,\ldots,n$.

Inoltre $u\neq 0$, quindi almeno una componente $u_i$ è diversa da zero.

Dunque

$$
\sum_{i=1}^n a_{ii}|u_i|^2>0
$$

quindi

$$
y^*(A-G^*AG)y>0
$$

per ogni $y\neq 0$.

Abbiamo quindi dimostrato che

$$
A-G^*AG
$$

è hermitiana definita positiva.

###### Parte 2

Dimostriamo ora che il metodo è convergente, cioè che

$$
\rho(G)<1
$$

Sia $\lambda$ un autovalore di $G$.

Vogliamo mostrare che

$$
|\lambda|<1
$$

Prendiamo un autovettore

$$
y\neq 0
$$

di $G$ associato a $\lambda$, quindi

$$
Gy=\lambda y
$$

Siccome dalla Parte 1 sappiamo che

$$
A-G^*AG
$$

è HDP, allora

$$
y^*(A-G^*AG)y>0
$$

Sviluppiamo:

$$
y^*(A-G^*AG)y
=
y^*Ay-y^*G^*AGy
$$

ma

$$
y^*G^*=(Gy)^*$$
quindi

$$
y^*G^*AGy=(Gy)^*A(Gy)
$$

Siccome

$$
Gy=\lambda y
$$

abbiamo

$$
(Gy)^*A(Gy)
=
(\lambda y)^*A(\lambda y)
$$

Ora

$$
(\lambda y)^*=\overline{\lambda}y^*
$$

quindi

$$
(\lambda y)^*A(\lambda y)
=
\overline{\lambda}y^*A(\lambda y)
$$

portiamo fuori anche $\lambda$:

$$
=
\overline{\lambda}\lambda y^*Ay
$$

cioè

$$
=
|\lambda|^2y^*Ay
$$

Quindi

$$
y^*(A-G^*AG)y
=
y^*Ay-|\lambda|^2y^*Ay
$$

cioè

$$
y^*(A-G^*AG)y
=
(1-|\lambda|^2)y^*Ay
$$

Ora sappiamo due cose:

- dalla Parte 1,

$$
y^*(A-G^*AG)y>0
$$

- siccome $A$ è HDP e $y\neq 0$,

$$
y^*Ay>0
$$

Quindi

$$
(1-|\lambda|^2)y^*Ay>0
$$

ma

$$
y^*Ay>0
$$

perciò deve essere

$$
1-|\lambda|^2>0
$$

cioè

$$
|\lambda|^2<1
$$

e dunque

$$
|\lambda|<1
$$

Abbiamo dimostrato che ogni autovalore $\lambda$ di $G$ ha modulo minore di $1$.

Quindi

$$
\rho(G)<1
$$

Per il teorema generale di convergenza dei metodi iterativi, il metodo di Gauss-Seidel è convergente.

$$
\square
$$