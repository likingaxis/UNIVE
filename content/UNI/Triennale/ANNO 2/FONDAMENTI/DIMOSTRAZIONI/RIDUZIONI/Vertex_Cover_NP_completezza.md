### Teorema (enunciato)

**VERTEX COVER (VC)** è NP-completo.

**Formalizzazione del problema (tripla)**  
Un’istanza è una coppia grafo-soglia:

$$
I_{VC} = \{\langle G=(V,E),k\rangle : G \text{ grafo non orientato},\ k \in \mathbb{N}^+\}.
$$

Le **soluzioni possibili** sono sottoinsiemi di vertici:

$$
S_{VC}(G,k) = \{V' \subseteq V\}.
$$

Il **predicato** di accettazione richiede che $V'$ copra tutti gli archi e sia “piccolo”:

$$
\pi_{VC}(G,k,S_{VC}) = \exists V' \subseteq V : |V'| \le k \ \land \ \forall (u,v) \in E, [u \in V' \ \lor \ v \in V'].
$$

Interpretazione: $I_{VC}$ descrive *cosa mi viene dato* (grafo + limite $k$);  
$S_{VC}$ descrive *cosa posso scegliere* (un insieme di vertici);  
$\pi_{VC}$ descrive *quando la scelta è valida* (copre tutti gli archi e rispetta $|V'| \le k$).

**(1) $VC \in NP$.**  
Un certificato è $V' \subseteq V$; verificare $|V'| \le k$ e che ogni arco abbia almeno un estremo in $V'$ è polinomiale (nel testo: $O(|E||V|)$).

---

### Idea della dimostrazione

Per provare NP-completezza si riduce **3SAT** a **VC** costruendo, da una formula 3-CNF $\varphi$, un grafo $G$ che “simula” scelte di verità e soddisfacibilità tramite **gadget**:

* **gadget-variabile**: per ogni $x_i$ un arco $(u_i, \neg u_i)$, costringendo a scegliere almeno uno dei due (interpretabile come assegnare vero/falso);
* **gadget-clausola**: per ogni clausola un triangolo, che richiede almeno 2 vertici per coprirne gli archi;
* archi di collegamento tra vertici di clausola e il nodo del letterale corrispondente, per imporre coerenza tra “clausola soddisfatta” e scelta nei gadget-variabile.

Si pone poi

$$
k = n + 2m
$$

(dove $n$ = numero di variabili, $m$ = numero di clausole) e si mostra:

$$
\varphi \text{ soddisfacibile } \Longleftrightarrow G \text{ ammette un vertex cover di taglia } \le n + 2m.
$$

---

### Dimostrazione

**Riduzione ($f : I_{3SAT} \to I_{VC}$).**  
Sia $\varphi$ in 3-CNF su $X = \{x_1,\dots,x_n\}$ con $\varphi = \{c_1,\dots,c_m\}$ e  
$c_j = \ell_{j1} \vee \ell_{j2} \vee \ell_{j3}$. Costruiamo $G = (V,E)$ così:

1. **Per ogni variabile $x_i$**: aggiungi due nodi $u_i, \neg u_i$ e l’arco $(u_i, \neg u_i)$ (gadget-variabile).
2. **Per ogni clausola $c_j$**: aggiungi tre nodi $v_{j1}, v_{j2}, v_{j3}$ e gli archi del triangolo $(v_{j1},v_{j2}), (v_{j2},v_{j3}), (v_{j3},v_{j1})$ (gadget-clausola).
3. **Collegamenti letterali**: per ogni letterale $\ell_{ji}$ collega $v_{ji}$ al nodo che rappresenta quel letterale:
   - se $\ell_{ji} = x_h$ aggiungi $(v_{ji}, u_h)$;
   - se $\ell_{ji} = \neg x_h$ aggiungi $(v_{ji}, \neg u_h)$.
4. Poni **$k = n + 2m$**.  
   La costruzione è polinomiale (nel testo: $O(nm)$).

**Osservazione chiave (taglia minima).**  
Ogni vertex cover di $G$ ha cardinalità almeno $n + 2m$: serve almeno 1 vertice per ciascun arco $(u_i, \neg u_i)$ (quindi almeno $n$) e almeno 2 vertici per ciascun triangolo di clausola (quindi almeno $2m$).  
Dunque “$\le n + 2m$” equivale a “$= n + 2m$” e implica: esattamente 1 nodo per gadget-variabile ed esattamente 2 nodi per gadget-clausola.

---

#### (⇒) Se esiste un vertex cover $V'$ con $|V'| = n + 2m$, allora $\varphi$ è soddisfacibile.

Poiché $V'$ usa **esattamente un** nodo per ogni coppia $(u_h, \neg u_h)$, definiamo un’assegnazione $a$ ponendo:

$$
a(x_h) = \text{vero} \Longleftrightarrow u_h \in V'.
$$

Consideriamo una clausola $c_j$. Nel triangolo $C_j$ stanno **esattamente due** nodi in $V'$, quindi **uno** tra $v_{j1}, v_{j2}, v_{j3}$ resta fuori.  
Il nodo fuori implica che l’arco di collegamento incidente su quel $v_{ji}$ non è coperto dal lato clausola; siccome $V'$ è un vertex cover, quell’arco deve essere coperto dal lato variabile, cioè dal nodo-letterale adiacente (uno tra $u_h$ o $\neg u_h$). Chiamiamo tale nodo $y_j$.  
⚠️ **Attenzione**:  
Questo **NON** è una nuova variabile!  
È solo un nome per:
- $u_h$ **oppure**
- $\neg u_h$
a seconda del letterale della clausola.
Per come abbiamo definito $a$, il fatto che $y_j \in V'$ corrisponde a rendere vero il letterale associato in $c_j$. Quindi ogni clausola ha almeno un letterale vero, e dunque $a \models \varphi$.
- l’assegnazione $a$ **soddisfa** la formula $\varphi$.

---

#### (⇐) Se $\varphi$ è soddisfacibile, allora esiste un vertex cover $V'$ con $|V'| = n + 2m$.

Sia $a$ un’assegnazione che soddisfa $\varphi$. Costruiamo:

* $V'_X$: per ogni variabile $x_i$, scegli $u_i$ se $a(x_i) = \text{vero}$, altrimenti scegli $\neg u_i$. (Così copriamo ogni arco $(u_i, \neg u_i)$ con 1 nodo.)
* Per ogni clausola $c_j$, scegli un nodo $y_j \in \{v_{j1}, v_{j2}, v_{j3}\}$ corrispondente a un letterale vero sotto $a$ (esiste perché $a \models \varphi$). Poi metti nel cover gli altri due nodi del triangolo:

$$
V'_j = \{v_{j1}, v_{j2}, v_{j3}\} \setminus \{y_j\}.
$$

Infine poni:

$$
V' = V'_X \cup \bigcup_{j=1}^m V'_j.
$$

Allora $|V'| = n + 2m$. Gli archi interni ai triangoli sono coperti da $V'_j$ (2 nodi bastano).  
Gli archi di collegamento dai nodi di clausola al nodo-letterale sono coperti perché: se il nodo di clausola è tra i due scelti, l’arco è coperto dal lato clausola; se è $y_j$ (non scelto), allora il suo letterale è vero e quindi il corrispondente nodo nel gadget-variabile è in $V'_X$, coprendo l’arco.  
Ne segue che $V'$ è un vertex cover.

---

**Conclusione.**  
Abbiamo costruito una riduzione polinomiale $(3SAT \le_p VC)$ e già sappiamo $(VC \in NP)$; quindi **VC è NP-completo**.
