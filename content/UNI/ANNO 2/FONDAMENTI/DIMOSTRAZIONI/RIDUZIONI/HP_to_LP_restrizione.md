## Teorema (riduzione polinomiale $HP \le_p LP$)

## Formalizzazione dei problemi

### Problema $LP$ (LONG PATH)

Il problema è formalizzato dalla tripla

$$
LP = (I_{LP}, S_{LP}, \pi_{LP})
$$

con

$$
I_{LP} =
\{ \langle G=(V,E), u, v, k \rangle :
G \text{ grafo non orientato} \land
u,v \in V \land k \in \mathbb{N} \}.
$$

$$
S_{LP}(G,u,v,k) =
\{ p = \langle v_0,\dots,v_h \rangle :
(\forall i=0,\dots,h \; v_i \in V) \land
v_0=u \land v_h=v \}.
$$

$$
\pi_{LP}(G,u,v,k,S_{LP}) =
\exists p = \langle v_0,\dots,v_h \rangle \in S_{LP}(G,u,v,k) :
\begin{cases}
\forall i=0,\dots,h-1 \; (v_i,v_{i+1}) \in E, \\
h \ge k.
\end{cases}
$$

---

## Enunciato

Le istanze di $HP$ sono un sottoinsieme delle istanze di $LP$; precisamente,

$$
\langle G,u,v \rangle \in HP
\iff
\langle G,u,v,n-1 \rangle \in LP,
$$

dove $n = |V|$. Quindi

$$
HP \le_p LP.
$$

---

## Idea della dimostrazione

Un percorso hamiltoniano da $u$ a $v$ attraversa tutti i $n$ nodi del grafo,
quindi ha lunghezza (numero di archi) $n-1$.
Basta quindi considerare la stessa istanza $\langle G,u,v \rangle$
come istanza di $LP$ ponendo $k=n-1$:
$HP$ è una restrizione di $LP$.

---

## Dimostrazione

Sia

$$
\langle G=(V,E), u, v \rangle
$$

un’istanza di $HP$ e sia $n=|V|$.
Definiamo la trasformazione

$$
f(\langle G,u,v \rangle) = \langle G,u,v,n-1 \rangle.
$$

È evidente che $f$ è calcolabile in tempo polinomiale
(aggiunge solo il parametro $k=n-1$).

---

### $(\Rightarrow)$

Se $\langle G,u,v \rangle \in HP$, allora esiste
$\psi \in S_{HP}(G,u,v)$ che induce una sequenza di $n$ nodi
da $u$ a $v$ con archi tra consecutivi.
Considerando la stessa sequenza come

$$
p = \langle v_0,\dots,v_{n-1} \rangle,
$$

si ha $p \in S_{LP}(G,u,v,n-1)$ e, per definizione di $\pi_{LP}$,
vale $h=n-1 \ge n-1$ e tutti gli archi $(v_i,v_{i+1}) \in E$.
Dunque

$$
\langle G,u,v,n-1 \rangle \in LP.
$$

---

### $(\Leftarrow)$

Se $\langle G,u,v,n-1 \rangle \in LP$, allora esiste

$$
p = \langle v_0,\dots,v_h \rangle
$$

con $v_0=u$, $v_h=v$, archi tra consecutivi e $h \ge n-1$.
Da $h \ge n-1$ segue che $p$ contiene almeno $n$ posizioni;
in particolare esiste una sequenza di $n$ nodi consecutivi
che connette $u$ a $v$ tramite archi di $E$.
Ne segue l’esistenza di un ordinamento
$\psi$ conforme alla definizione di $\pi_{HP}$,
e quindi

$$
\langle G,u,v \rangle \in HP.
$$

---

## Conclusione

La funzione $f$ è una riduzione polinomiale e quindi

$$
HP \le_p LP.
$$
