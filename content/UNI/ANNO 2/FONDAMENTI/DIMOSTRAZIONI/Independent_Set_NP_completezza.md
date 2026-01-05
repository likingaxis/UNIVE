## Teorema (enunciato)

**Problema INDEPENDENT SET (IS)** (formalizzazione come tripla $\langle I,S,\pi\rangle$).

* **Insieme delle istanze**

$$
I_{IS} = \{\langle G=(V,E),k\rangle : G \text{ grafo non orientato},\ k \in \mathbb{N}\}.
$$

(Input: un grafo e una soglia $k$).

* **Insieme delle soluzioni possibili (certificati)**

$$
S_{IS}(G,k) = \{ I \subseteq V \}.
$$

(Candidato: un sottoinsieme di vertici).

* **Predicato di accettazione**

$$
\pi_{IS}(G,k,S_{IS}) \equiv \exists I \subseteq V : |I| \ge k \ \land \ \forall u,v \in I, [(u,v) \notin E].
$$

(Validità: $I$ è grande almeno $k$ ed è **indipendente**, cioè non contiene estremi di uno stesso arco).

**Teorema.** $(IS)$ è **NP-completo** (in particolare, $(VC \le_p IS)$).

---

## Idea della dimostrazione

1. $(IS \in NP)$: un certificato è $I \subseteq V$ e si verifica in tempo polinomiale che $|I| \ge k$ e che non esistono archi tra coppie di vertici in $I$.

2. Per la completezza si usa l’equivalenza fondamentale:

$$
V' \subseteq V \text{ è un vertex cover } \Longleftrightarrow V \setminus V' \text{ è un insieme indipendente}.
$$

Quindi da un’istanza $\langle G,k\rangle$ di $(VC)$ basta passare a $\langle G, |V|-k \rangle$ di $(IS)$:  
“coprire tutti gli archi con $\le k$ vertici” è lo stesso che “lasciare fuori $\ge |V|-k$ vertici senza archi tra loro”.

---

## Dimostrazione

### 1) $(IS \in NP)$

Dato un certificato $I \subseteq V$, si controlla $|I| \ge k$ e che per ogni coppia $u,v \in I$ valga $(u,v) \notin E$ in tempo polinomiale (nel testo: $O(|E||V|^2)$). Quindi $(IS \in NP)$


### 2) Riduzione polinomiale $(VC \le_p IS)$

Consideriamo un grafo non orientato $G=(V,E)$ e un sottoinsieme $V' \subseteq V$. Mostriamo prima l’equivalenza chiave:

* (**Se**) $V'$ è un vertex cover, allora nessun arco può avere **entrambi** gli estremi in $V \setminus V'$; dunque per ogni $u,v \in V \setminus V'$ si ha $(u,v) \notin E$, cioè $V \setminus V'$ è indipendente.
* (**Solo se**) Se $V \setminus V'$ è indipendente, allora non esiste alcun arco con entrambi gli estremi fuori da $V'$; quindi per ogni $(u,v) \in E$ deve valere $u \in V'$ oppure $v \in V'$, cioè $V'$ è un vertex cover.

A questo punto definiamo la funzione di riduzione:

$$
f(\langle G=(V,E),k \rangle) = \langle G=(V,E), |V|-k \rangle.
$$

**Correttezza.**

$$
\langle G,k \rangle \in VC
\Longleftrightarrow
\exists V' \subseteq V : |V'| \le k \text{ e } V' \text{ vertex cover}
$$

$$
\Longleftrightarrow
\exists I = V \setminus V' : |I| = |V| - |V'| \ge |V| - k \text{ e } I \text{ indipendente}
$$

$$
\Longleftrightarrow
f(\langle G,k \rangle) = \langle G, |V|-k \rangle \in IS.
$$

L’algoritmo $f$ è chiaramente polinomiale (non modifica $G$, calcola solo $|V|-k$).

### 3) Conclusione

Abbiamo $(VC \le_p IS)$ e $(IS \in NP)$; poiché $(VC)$ è NP-completo, segue che **$(IS)$ è NP-completo**.
