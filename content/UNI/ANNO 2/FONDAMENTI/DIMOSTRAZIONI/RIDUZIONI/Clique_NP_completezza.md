## Teorema (NP-completezza di **CLIQUE** via riduzione da **INDEPENDENT SET**)

### Enunciato (con formalizzazione del problema)

**CLIQUE (CL)**: dato un grafo non orientato $G=(V,E)$ e un intero $k \in \mathbb{N}$, decidere se esiste una *clique* di cardinalità almeno $k$.

Formalmente, il problema è descritto dalla tripla:

* **Insieme delle istanze**

$$
I_{CL} = \{\langle G=(V,E),k\rangle : G \text{ grafo non orientato},\ k \in \mathbb{N} \}.
$$

* **Insieme delle soluzioni possibili (certificati)**

$$
S_{CL}(G,k) = \{ C \subseteq V \}.
$$

* **Predicato**

$$
\pi_{CL}(G,k,S_{CL}(G,k)) \equiv \exists C \in S_{CL}(G,k) : |C| \ge k \ \wedge \ \forall u,v \in C \;[(u,v) \in E].
$$

Inoltre $(CL \in NP)$ (verifica polinomiale del certificato $C$).

**Teorema:** $(CL)$ è **NP-completo**.

---

### Idea della dimostrazione

Riduciamo **INDEPENDENT SET (IS)** a **CLIQUE** usando il **grafo complemento**: in un grafo, un insieme di vertici è indipendente se e solo se, nel complemento, gli stessi vertici formano una clique. Quindi “indipendenza in $G$” $\Longleftrightarrow$ “completezza in $G^c$”.

---

### Dimostrazione

1. **Costruzione della riduzione.**  
   Dato $\langle G=(V,E),k\rangle$ istanza di $(IS)$, costruiamo il **grafo complemento**

$$
G^c = (V,E^c) \quad \text{dove} \quad (u,v) \in E^c \iff (u,v) \notin E
$$

(per ogni coppia $u,v \in V$).  
Definiamo la funzione di riduzione:

$$
f(G,k) = \langle G^c, k \rangle.
$$

2. **Correttezza ($\Leftrightarrow$).**  
   Per definizione di complemento, un sottoinsieme $U \subseteq V$ è **indipendente in $G$** se e solo se **ogni coppia** di nodi in $U$ *non* è collegata in $G$, cioè *è* collegata in $G^c$; dunque

$$
U \text{ è independent set in } G \iff U \text{ è clique in } G^c.
$$

Ne segue:

$$
G \text{ contiene un independent set } I \text{ con } |I| \ge k
\iff
G^c \text{ contiene una clique } C \text{ con } |C| \ge k,
$$

quindi

$$
\langle G,k \rangle \in IS \iff f(G,k) \in CL.
$$

3. **Complessità.**  
   La costruzione di $G^c$ (stesso $V$, archi complementari) e quindi di $f(G,k)$ richiede tempo polinomiale (nel testo: lineare rispetto alla lunghezza dell’istanza).

4. **Conclusione.**  
   Poiché $(IS)$ è NP-completo (dal paragrafo precedente) e $(IS \le_p CL)$ tramite $f$, e inoltre $(CL \in NP)$, allora $(CL)$ è **NP-completo**.
