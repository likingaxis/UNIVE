## Teorema (3-SAT $\le_p$ 3-COLORABILITÀ)

### Problema 3-COL (3-COLORABILITÀ): formalizzazione

Una **3-colorazione** di un grafo non orientato $G=(V,E)$ è una funzione

$$
\chi : V \to \{1,2,3\}
$$

tale che nodi adiacenti abbiano colori diversi.

Formalizziamo

$$
3\text{-}COL = (I_{3\text{-}COL}, S_{3\text{-}COL}, \pi_{3\text{-}COL})
$$

come caso particolare di **COL** (dove in generale i colori sono $k$).

---

### Insieme delle istanze

$$
I_{3\text{-}COL} = \{ \langle G=(V,E) \rangle : G \text{ è un grafo non orientato} \}.
$$

(È il caso $k=3$ di $I_{COL} = \{ \langle G,k \rangle : \dots \}$.)

---

### Insieme dei certificati / soluzioni

$$
S_{3\text{-}COL}(G) = \{ \chi : V \to \{1,2,3\} \}.
$$

(Caso $k=3$ di $S_{COL}(G,k) = \{ \chi : V \to \{1,\dots,k\} \}$.)

---

### Predicato di verifica

$$
\pi_{3\text{-}COL}(G,\chi) = [\forall (u,v) \in E : \chi(u) \neq \chi(v)].
$$

(Caso $k=3$ di $\pi_{COL}(G,k,\chi) = \exists \chi : \forall (u,v) \in E, \chi(u) \neq \chi(v)$.)

---

### Enunciato

Esiste una trasformazione polinomiale che, data una formula $f$ in **3-CNF** (istanza di **3-SAT**), costruisce un grafo $G_f$ tale che

$$
f \text{ è soddisfacibile } \Longleftrightarrow G_f \text{ è 3-colorabile}.
$$

Quindi

$$
3\text{-}SAT \le_p 3\text{-}COL.
$$

---

### Idea della dimostrazione

Si costruisce un grafo $G_f$ con tre nodi speciali $R, T, F$ che forzano tre colori distinti e permettono di interpretare due colori come **vero/falso** (il terzo colore è “riservato”).

Poi:

- per ogni variabile $x_i$ si inseriscono due nodi $u_i$ e $v_i$ che rappresentano $x_i$ e $\neg x_i$, imponendo che abbiano colori diversi;
- per ogni clausola
  $$
  c_j = \ell_{j1} \vee \ell_{j2} \vee \ell_{j3}
  $$
  si aggiunge un **gadget** collegato ai nodi dei letterali, progettato in modo che una 3-colorazione esista se e solo se **almeno un letterale della clausola** prende il colore di $T$ (cioè “vero”).
