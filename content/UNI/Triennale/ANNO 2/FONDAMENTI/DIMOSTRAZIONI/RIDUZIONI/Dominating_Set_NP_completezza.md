## Teorema (enunciato)

**Problema DOMINATING SET (DS)** è **NP-completo**.

### Formalizzazione del problema (tripla $\langle I,S,\pi \rangle$)

#### Insieme delle istanze

$$
I_{DS} = \{\langle G=(V,E),k\rangle : G \text{ grafo non orientato},\ k \in \mathbb{N}^+ \}.
$$

(Input: un grafo e una soglia $k$.)

#### Insieme delle soluzioni possibili (certificati)

$$
S_{DS}(G,k) = \{ D \subseteq V \}.
$$

(Candidato: un sottoinsieme di vertici.)

#### Predicato di accettazione

$$
\pi_{DS}(G,k,S_{DS}) \equiv \exists D \subseteq V : |D| \le k \ \land \ \forall u \in V \setminus D \ \exists v \in D : (u,v) \in E.
$$

(Validità: ogni vertice non scelto è adiacente a qualche vertice scelto.)

---

### Appartenenza a NP

Un certificato $D$ si verifica in tempo polinomiale controllando $|D| \le k$ e, per ogni $u \in V \setminus D$, l’esistenza di un vicino in $D$.  
Quindi $(DS \in NP)$.

---

## Idea della dimostrazione

Si dimostra la NP-completezza riducendo **VERTEX COVER (VC)** a **DOMINATING SET (DS)**.

Data un’istanza $\langle G=(V,E),k \rangle$ di $(VC)$, si costruisce un grafo $H$ aggiungendo un nodo per ogni arco di $G$ e collegandolo ai suoi estremi. L’idea è che:

- un vertex cover di $G$ domina tutti i nuovi nodi (che rappresentano archi);
- viceversa, un dominating set di $H$ può essere trasformato in uno che usa solo vertici “originali”, i quali allora formano un vertex cover di $G$.

La soglia resta $k$.

---

## Dimostrazione

### Riduzione $f : VC \le_p DS$

Sia $\langle G=(V,E),k \rangle$ un’istanza di **VERTEX COVER**.  
Senza perdita di generalità, assumiamo che $G$ non abbia nodi isolati (gli isolati non influiscono sull’esistenza di un vertex cover).

Costruiamo il grafo $H=(W,F)$ come segue.

#### Vertici

$$
W = V \cup X, \quad \text{dove } X = \{ x_e : e \in E \}.
$$

Cioè, per ogni arco $e$ di $G$ aggiungiamo un nuovo vertice $x_e$.

#### Archi

$$
F = E \cup \{ (u,x_e),(v,x_e) : e=(u,v) \in E \}.
$$

Ogni nuovo vertice $x_e$ è adiacente esattamente ai due estremi dell’arco $e$.

#### Soglia

$$
k' = k.
$$

La costruzione è chiaramente polinomiale.

---

### Correttezza della riduzione

#### $(\Rightarrow)$

Se $G$ ha un vertex cover $V' \subseteq V$ con $|V'| \le k$, allora $H$ ha un dominating set di cardinalità $\le k$.

Poniamo $D = V'$. Mostriamo che $D$ domina $H$.

- Se $u \in V \setminus D$, poiché $G$ non ha nodi isolati, esiste un arco $(u,v) \in E$. Essendo $V'$ un vertex cover, $v \in V' = D$, quindi $u$ è dominato.
- Se $x_e \in X$ con $e=(u,v)$, allora almeno uno tra $u$ o $v$ appartiene a $V'$; dunque $x_e$ è adiacente a un nodo in $D$.

Quindi $D$ è un dominating set di $H$ e $|D| \le k$.

---

#### $(\Leftarrow)$

Se $H$ ha un dominating set $D$ con $|D| \le k$, allora $G$ ha un vertex cover di cardinalità $\le k$.

Osserviamo che, se $D$ contiene un nodo $x_e \in X$ (con $e=(u,v)$), allora possiamo sostituirlo con $u$ oppure con $v$:

$$
D' = (D \setminus \{x_e\}) \cup \{u\}
$$

Il nuovo insieme domina ancora $H$ e non aumenta la cardinalità.  
Iterando, otteniamo senza perdita di generalità un dominating set $D \subseteq V$.

Mostriamo ora che $D$ è un vertex cover di $G$.  
Sia $e=(u,v) \in E$. Il nodo $x_e$ deve essere dominato da $D$; ma $x_e$ è adiacente solo a $u$ e $v$.  
Dunque $u \in D$ oppure $v \in D$. Questo vale per ogni arco $e$, quindi $D$ copre tutti gli archi di $G$.

---

## Conclusione

Abbiamo costruito una riduzione polinomiale $VC \le_p DS$ e visto che $(DS \in NP)$.  
Poiché $(VC)$ è NP-completo, segue che **DOMINATING SET è NP-completo**.
