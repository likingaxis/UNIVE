# Teorema 4.1 — Condizione necessaria e sufficiente di convergenza

## Contesto

Siamo nella parte sui **metodi iterativi per la risoluzione di sistemi lineari**.

Partiamo da un sistema lineare

[  
Ax=b,  
]

dove

[  
A\in\mathbb{C}^{n\times n}  
]

è invertibile e

[  
b\in\mathbb{C}^n.  
]

Poiché (A) è invertibile, il sistema ha un’unica soluzione, che indichiamo con

[  
x=A^{-1}b.  
]

L’obiettivo è costruire una successione di vettori

[  
x^{(0)},x^{(1)},x^{(2)},\ldots  
]

che, partendo da un vettore iniziale scelto dall’utente, converga alla soluzione esatta (x). Nelle dispense si considerano metodi iterativi stazionari della forma

[  
x^{(0)}\in\mathbb{C}^n \text{ dato},  
]

[  
x^{(k+1)}=Px^{(k)}+q,  
\qquad k=0,1,2,\ldots  
]

dove (P\in\mathbb{C}^{n\times n}) è una matrice fissata, detta **matrice d’iterazione**, e (q\in\mathbb{C}^n) è un vettore fissato.

---

# Definizioni preliminari

## Consistenza

Il metodo iterativo

[  
x^{(k+1)}=Px^{(k)}+q  
]

si dice **consistente** con il sistema

[  
Ax=b  
]

se la soluzione esatta (x) del sistema soddisfa l’equazione

[  
x=Px+q.  
]

Quindi la consistenza significa che la soluzione vera del sistema è un **punto fisso** dell’iterazione.

Infatti, se fossimo già arrivati alla soluzione (x), applicando il metodo avremmo

[  
Px+q=x,  
]

cioè il metodo non ci sposterebbe più.

Questa definizione è importante perché, se il metodo non fosse consistente, anche se la successione convergesse, potrebbe convergere a un vettore diverso dalla soluzione del sistema.

---

## Convergenza del metodo

Il metodo iterativo si dice **convergente** se, per ogni scelta del vettore iniziale

[  
x^{(0)}\in\mathbb{C}^n,  
]

la successione generata dal metodo converge alla soluzione (x) del sistema:

[  
x^{(k)}\to x.  
]

Nelle dispense la convergenza di vettori è intesa **componente per componente**. Quindi significa che, se

# [  
x^{(k)}

\begin{pmatrix}  
x_1^{(k)}\  
\vdots\  
x_n^{(k)}  
\end{pmatrix},  
\qquad  
x=  
\begin{pmatrix}  
x_1\  
\vdots\  
x_n  
\end{pmatrix},  
]

allora

[  
x_i^{(k)}\to x_i  
\qquad  
\forall i=1,\dots,n.  
]

---

# Enunciato del Teorema 4.1

Supponiamo che il metodo iterativo

[  
x^{(k+1)}=Px^{(k)}+q  
]

sia consistente con il sistema

[  
Ax=b.  
]

Allora il metodo è convergente se e solo se

[  
\rho(P)<1.  
]

Cioè:

[  
\boxed{  
\text{il metodo converge}  
\iff  
\rho(P)<1.  
}  
]

Qui

[  
\rho(P)  
]

è il **raggio spettrale** della matrice (P), cioè

[  
\rho(P)=\max{|\lambda|:\lambda \text{ è autovalore di }P}.  
]

Quindi il teorema dice che la convergenza del metodo dipende dagli autovalori della matrice d’iterazione (P). Più precisamente, il metodo converge se e solo se tutti gli autovalori di (P) hanno modulo strettamente minore di (1). Le dispense enunciano proprio il Teorema 4.1 come condizione necessaria e sufficiente di convergenza.

---

# Dimostrazione della direzione dimostrata nelle dispense

Le dispense dimostrano soltanto la direzione:

[  
\rho(P)<1  
\Longrightarrow  
\text{il metodo è convergente}.  
]

Quindi supponiamo che

[  
\rho(P)<1.  
]

Dobbiamo dimostrare che, qualunque sia il vettore iniziale (x^{(0)}), la successione

[  
x^{(0)},x^{(1)},x^{(2)},\ldots  
]

converge alla soluzione esatta (x).

Poiché il metodo è consistente, la soluzione esatta (x) soddisfa

[  
x=Px+q.  
]

Questa è l’equazione del punto fisso: significa che, se inserisco la soluzione esatta nel metodo iterativo, essa rimane invariata.

D’altra parte, per definizione del metodo iterativo, per ogni (k=0,1,2,\ldots) vale

[  
x^{(k+1)}=Px^{(k)}+q.  
]

Adesso vogliamo confrontare l’iterato (x^{(k)}) con la soluzione esatta (x). Per farlo introduciamo l’errore al passo (k):

[  
e^{(k)}=x^{(k)}-x.  
]

Questa quantità misura quanto l’iterato (x^{(k)}) dista dalla soluzione esatta (x).

Ora sottraiamo membro a membro le due equazioni:

[  
x^{(k+1)}=Px^{(k)}+q  
]

e

[  
x=Px+q.  
]

Otteniamo

# [  
x^{(k+1)}-x

Px^{(k)}+q-(Px+q).  
]

A destra il termine (q) si cancella:

# [  
x^{(k+1)}-x

Px^{(k)}-Px.  
]

Raccogliamo (P):

# [  
x^{(k+1)}-x

P(x^{(k)}-x).  
]

Usando la definizione di errore,

[  
e^{(k)}=x^{(k)}-x,  
]

otteniamo

[  
e^{(k+1)}=Pe^{(k)}.  
]

Questa è l’**equazione dell’errore**. È il passaggio centrale della dimostrazione: ci dice che l’errore al passo successivo si ottiene moltiplicando l’errore precedente per la matrice d’iterazione (P). Le dispense ottengono esattamente questa relazione sottraendo l’equazione del metodo e quella della consistenza.

---

# Sviluppo per ricorrenza

Dalla relazione

[  
e^{(k+1)}=Pe^{(k)}  
]

possiamo sviluppare gli errori successivi.

Per (k=0):

[  
e^{(1)}=Pe^{(0)}.  
]

Per (k=1):

[  
e^{(2)}=Pe^{(1)}.  
]

Ma

[  
e^{(1)}=Pe^{(0)},  
]

quindi

[  
e^{(2)}=P(Pe^{(0)})=P^2e^{(0)}.  
]

Per (k=2):

[  
e^{(3)}=Pe^{(2)}=P(P^2e^{(0)})=P^3e^{(0)}.  
]

Continuando così, otteniamo

[  
e^{(k)}=P^k e^{(0)}  
\qquad  
\forall k=0,1,2,\ldots  
]

Questa formula è vera anche per (k=0), perché

[  
P^0=I.  
]

Infatti, la potenza zero di una matrice quadrata è la matrice identità, così come per i numeri vale (a^0=1). Nel caso delle matrici, l’elemento neutro della moltiplicazione è (I), perché

[  
Iv=v  
]

per ogni vettore (v). Quindi

[  
P^0e^{(0)}=Ie^{(0)}=e^{(0)}.  
]

Perciò la formula

[  
e^{(k)}=P^ke^{(0)}  
]

è corretta anche per (k=0). Questo era proprio il dubbio che avevi: il motivo è che “zero iterazioni” significa che non abbiamo ancora modificato l’errore iniziale.

---

# Uso del Teorema 3.12

Ora entra in gioco il Teorema 3.12.

Il Teorema 3.12 dice che, per una matrice quadrata (P),

[  
P^k\to O  
\iff  
\rho(P)<1.  
]

Noi stiamo assumendo proprio che

[  
\rho(P)<1.  
]

Quindi possiamo concludere che

[  
P^k\to O,  
]

dove (O) è la matrice nulla.

Poiché

[  
e^{(k)}=P^ke^{(0)},  
]

e poiché

[  
P^k\to O,  
]

abbiamo

[  
P^ke^{(0)}\to Oe^{(0)}=0.  
]

Quindi

[  
e^{(k)}\to 0.  
]

Ricordando che

[  
e^{(k)}=x^{(k)}-x,  
]

otteniamo

[  
x^{(k)}-x\to 0.  
]

Questo significa precisamente che

[  
x^{(k)}\to x.  
]

Dunque la successione prodotta dal metodo converge alla soluzione esatta del sistema.

Siccome il ragionamento non ha usato nessuna proprietà particolare di (x^{(0)}), la convergenza vale per ogni scelta del vettore iniziale. Quindi il metodo è convergente.

[  
\square  
]

---

# Perché da (P^k\to O) segue (P^ke^{(0)}\to 0)?

Questo passaggio può sembrare veloce, ma l’idea è semplice.

Se

[  
P^k\to O,  
]

allora ogni elemento della matrice (P^k) tende a zero. Scrivendo la prima componente di

[  
e^{(k)}=P^ke^{(0)},  
]

si ha

# [  
e_1^{(k)}

(P^k)_{11}e_1^{(0)}  
+  
(P^k)_{12}e_2^{(0)}  
+  
\cdots  
+  
(P^k)_{1n}e_n^{(0)}.  
]

Ogni coefficiente

[  
(P^k)_{1j}  
]

tende a zero, mentre le componenti

[  
e_j^{(0)}  
]

sono numeri fissati, perché l’errore iniziale è fissato.

Quindi ogni termine della somma tende a zero, e dunque anche la somma tende a zero:

[  
e_1^{(k)}\to 0.  
]

Lo stesso ragionamento vale per tutte le componenti, quindi

[  
e^{(k)}\to 0.  
]

Le dispense riportano proprio questa giustificazione in nota, spiegando che ogni componente di (e^{(k)}) è una combinazione degli elementi di (P^k), che tendono a zero.

---

# Significato del teorema

Il Teorema 4.1 dice che la convergenza del metodo iterativo non dipende direttamente da (q), ma dalla matrice d’iterazione (P).

Infatti (q) serve a posizionare il punto fisso, cioè la soluzione (x), mentre (P) governa l’evoluzione dell’errore:

[  
e^{(k+1)}=Pe^{(k)}.  
]

Quindi il comportamento dell’errore è determinato dalle potenze di (P):

[  
e^{(k)}=P^ke^{(0)}.  
]

Se

[  
\rho(P)<1,  
]

allora

[  
P^k\to O,  
]

e quindi qualunque errore iniziale viene mandato a zero:

[  
e^{(k)}\to 0.  
]

Se invece

[  
\rho(P)\geq 1,  
]

il metodo non è convergente, perché le potenze di (P) non tendono alla matrice nulla nel senso richiesto dal Teorema 3.12.

---

# Frase da orale

> “Il Teorema 4.1 afferma che, se il metodo iterativo stazionario (x^{(k+1)}=Px^{(k)}+q) è consistente con il sistema (Ax=b), allora esso converge se e solo se (\rho(P)<1). La consistenza garantisce che la soluzione esatta (x) soddisfi (x=Px+q). Sottraendo questa relazione dall’equazione iterativa otteniamo l’equazione dell’errore (e^{(k+1)}=Pe^{(k)}). Sviluppando per ricorrenza si ha (e^{(k)}=P^ke^{(0)}), formula valida anche per (k=0) perché (P^0=I). Se (\rho(P)<1), per il Teorema 3.12 segue che (P^k\to O), quindi (e^{(k)}\to 0) e dunque (x^{(k)}\to x). Perciò il metodo converge per ogni scelta del vettore iniziale.”