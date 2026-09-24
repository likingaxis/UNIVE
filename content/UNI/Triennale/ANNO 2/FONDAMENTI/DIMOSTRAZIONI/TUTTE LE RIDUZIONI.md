## Teorema (NP-completezza di 3SAT)

**Problema 3SAT (formalizzazione come tripla $\langle I,S,\pi\rangle$).**

* **Insieme delle istanze**

$$
I_{3SAT} = \{ f : \{vero,falso\}^n \to \{vero,falso\} \ \text{tale che } f \text{ è in forma 3-CNF} \}.
$$

Cioè: $f$ è una formula in **forma congiuntiva normale** in cui ogni clausola ha **esattamente 3 letterali**.

* **Insieme delle soluzioni possibili (certificati)**

$$
S_{3SAT}(f) = \{(b_1,\dots,b_n) \in \{vero,falso\}^n\},
$$

cioè tutte le assegnazioni di verità alle variabili.

* **Predicato di accettazione**

$$
\pi_{3SAT}(f,S_{3SAT}) \equiv \exists (b_1,\dots,b_n) \in S_{3SAT}(f) : f(b_1,\dots,b_n) = vero,
$$

ossia esiste un’assegnazione che rende vera la formula (sostituendo $(x_i \mapsto b_i)$ e $(\neg x_i \mapsto \neg b_i)$).

**Teorema.** $(3SAT)$ è **NP-completo**.

---

## Idea della dimostrazione

1. $(3SAT \in NP)$ perché è solo una restrizione di $(SAT)$ (le istanze di $(3SAT)$ sono un sottoinsieme di quelle di $(SAT)$).
2. Per la NP-completezza, si costruisce una **riduzione polinomiale** $(SAT \le_p 3SAT)$: data una formula CNF $(f = \{c_1,\dots,c_m\})$, si trasforma ogni clausola $(c_j)$ in un insieme $(C_j)$ di clausole **a 3 letterali**, in modo che $(c_j)$ sia soddisfacibile **se e solo se** lo è l’intero $(C_j)$ (sulla stessa assegnazione, estesa alle nuove variabili). Poi si pone $(f' = \bigcup_{j=1}^m C_j)$, che è 3-CNF, e vale:

$$
f \in SAT \iff f' \in 3SAT.
$$

---

## Dimostrazione

### 1) $(3SAT \in NP)$

Osservato che $(I_{3SAT} \subseteq I_{SAT})$, e sapendo che $(SAT \in NP)$, segue immediatamente $(3SAT \in NP)$.

### 2) Riduzione $(SAT \le_p 3SAT)$

Sia $(f \in I_{SAT})$ una formula CNF sulle variabili $(X = \{x_1,\dots,x_n\})$, vista come insieme di clausole

$$
f = \{c_1,\dots,c_m\}.
$$

Costruiamo $(f')$ trasformando ogni clausola $(c_j)$ in un insieme $(C_j)$ di clausole a 3 letterali tale che:

$$
(\exists a \ \text{che soddisfa } c_j) \Longleftrightarrow (\exists a' \ \text{estensione di } a \ \text{che soddisfa tutte le clausole in } C_j).
$$

Poi definiamo:

$$
f' = \bigcup_{j=1}^m C_j,
$$

che è 3-CNF.

Ora descriviamo $(C_j)$ in base al numero di letterali in $(c_j)$.

#### Caso A: $(c_j)$ ha 1 letterale, $(c_j = \ell)$

Introduciamo due nuove variabili $(Y_j = \{y_{j1},y_{j2}\})$ e poniamo:

$$
C_j = \{(\ell \vee y_{j1} \vee y_{j2}), (\ell \vee \neg y_{j1} \vee y_{j2}), (\ell \vee y_{j1} \vee \neg y_{j2}), (\ell \vee \neg y_{j1} \vee \neg y_{j2})\}.
$$

Allora tutte le clausole in $(C_j)$ sono soddisfatte **se e solo se** $(\ell)$ è vero.

#### Caso B: $(c_j)$ ha 2 letterali, $(c_j = \ell_1 \vee \ell_2)$

Introduciamo una nuova variabile $(Y_j = \{y_j\})$ e poniamo:

$$
C_j = \{(\ell_1 \vee \ell_2 \vee y_j), (\ell_1 \vee \ell_2 \vee \neg y_j)\}.
$$

Le due clausole sono soddisfatte **se e solo se** $(\ell_1)$ oppure $(\ell_2)$ è vero.

#### Caso C: $(c_j)$ ha 3 letterali, $(c_j = \ell_1 \vee \ell_2 \vee \ell_3)$

È già in 3-CNF, dunque:

$$
C_j = \{c_j\}.
$$

#### Caso D: $(c_j)$ ha $(k \ge 4)$ letterali, $(c_j = \ell_1 \vee \ell_2 \vee \cdots \vee \ell_k)$

Introduciamo nuove variabili $(Y_j = \{y_{j1},\dots,y_{j,k-3}\})$ e spezzettiamo la clausola in una catena:

$$
C_j = \{(\ell_1 \vee \ell_2 \vee y_{j1}), (\neg y_{j1} \vee \ell_3 \vee y_{j2}), \dots, (\neg y_{j,k-3} \vee \ell_{k-1} \vee \ell_k)\}.
$$

### 3) Correttezza della trasformazione e complessità

Per costruzione, un’assegnazione soddisfa $(f)$ **se e solo se** (estesa alle nuove variabili) soddisfa $(f')$. Quindi:

$$
f \in SAT \iff f' \in 3SAT.
$$

Inoltre, la costruzione di ciascun $(C_j)$ richiede tempo **lineare** nel numero di letterali di $(c_j)$, e complessivamente $(f')$ si costruisce in tempo proporzionale a $mn$ e in tempo $O(|f|^2)$ che è polinomiale
### 4) Conclusione

Abbiamo una riduzione polinomiale $(SAT \le_p 3SAT)$; poiché $(3SAT \in NP)$, segue che $(3SAT)$ è **NP-completo**.

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
## Teorema (riduzione polinomiale $HC \le_p HP$ e NP-completezza di $HP$)

---

### Problema $HP$ (PERCORSO HAMILTONIANO)

#### Istanze

$$
I_{HP} =
\{ \langle G=(V,E),u,v \rangle :
G \text{ grafo non orientato } \land u,v \in V \}.
$$

#### Soluzioni

$$
S_{HP}(G,u,v) =
\{ \psi : V \to \{1,\dots,|V|\} :
\psi(1)=u \land \psi(n)=v \}.
$$

(Ordinamenti con estremi fissati.)

#### Predicato

$$
\pi_{HP}(G,u,v,S_{HP}(G,u,v)) =
\exists \psi \in S_{HP}(G,u,v) :
\forall 1 \le i < n,
(\psi^{-1}(i),\psi^{-1}(i+1)) \in E.
$$

---

### Enunciato

Esiste una funzione $f \in FP$ tale che, per ogni
$\langle G \rangle \in I_{HC}$,

$$
\langle G \rangle \in HC
\iff
f(\langle G \rangle)=\langle G',x,y \rangle \in HP.
$$

Quindi

$$
HC \le_p HP
$$

e, poiché $HP \in NP$, segue che $HP$ è **NP-completo**.

---

## Idea della dimostrazione

Dato un grafo $G$ (istanza di $HC$), “rompiamo” un possibile ciclo hamiltoniano
trasformandolo in un percorso hamiltoniano in un grafo $G'$ ottenuto aggiungendo
due nuovi nodi $x$ e $y$.

- Il nodo $x$ è collegato a un solo nodo $u \in V$, costringendo $u$ a essere
  l’inizio del percorso;
- il nodo $y$ è collegato esattamente ai vicini di $u$, così l’ultimo nodo del
  percorso deve essere un vicino di $u$, permettendo di richiudere il percorso
  in un ciclo in $G$.

---

## Dimostrazione

Sia $\langle G=(V,E) \rangle$ un’istanza di $HC$.
Senza perdita di generalità, assumiamo $G$ connesso.

### Costruzione della riduzione $f$

Fissiamo un nodo $u \in V$ e introduciamo due nuovi nodi $x,y \notin V$.
Definiamo l’istanza di $HP$ come

$$
\langle G'=(V',E'),x,y \rangle,
$$

dove

$$
V' = V \cup \{x,y\}, \qquad
E' = E \cup E_x \cup E_y,
$$

con

$$
E_x = \{(x,u)\}, \qquad
E_y = \{(y,v) : v \in V \land (u,v) \in E\}.
$$

In altre parole, $x$ è adiacente solo a $u$ e $y$ è adiacente a tutti e soli i
vicini di $u$ in $G$.
La costruzione è chiaramente polinomiale.

---

### $(\Rightarrow)$

Supponiamo che $G$ contenga un ciclo hamiltoniano
$\psi=(v_1,\dots,v_n)$ con $n=|V|$.
Possiamo assumere $u=v_1$ riordinando ciclicamente $\psi$.

Nel ciclo, $v_n$ è adiacente a $u$, quindi $(u,v_n) \in E$ e per definizione
$(y,v_n) \in E_y \subseteq E'$.
Inoltre $(x,u) \in E'$.

Allora la sequenza

$$
(x, v_1=u, v_2, \dots, v_n, y)
$$

è un percorso hamiltoniano in $G'$ da $x$ a $y$.

---

### $(\Leftarrow)$

Supponiamo che $G'$ contenga un percorso hamiltoniano

$$
\psi=(x,v_1,\dots,v_n,y)
$$

con $n=|V|$.
Poiché $u$ è l’unico vicino di $x$ in $G'$, deve essere $v_1=u$.
Inoltre $(v_n,y) \in E'$ implica $(u,v_n) \in E$.

Quindi

$$
(u=v_1, v_2, \dots, v_n)
$$

è un ciclo hamiltoniano in $G$.

---

## Conclusione

Abbiamo mostrato

$$
\langle G \rangle \in HC
\iff
\langle G',x,y \rangle \in HP,
$$

con $f$ calcolabile in tempo polinomiale.

Costruire $V' = V \cup \{x,y\}$
Copiare $E$ in $E′$
“$f$ aggiunge 2 vertici e al più $\deg(u)+1$ archi, 
quindi si calcola in tempo $O(∣V∣+∣E∣)$ (polinomiale).

- **Costo:** $O(∣E∣)$ (se copi la lista degli archi; se riusi per riferimento, $O(1)$ e poi appendi gli extra).

Dunque

$$
HC \le_p HP
$$

e **$HP$ è NP-completo**.
## Teorema (riduzione polinomiale $HC \le_p TSP$)

## Formalizzazione dei problemi

### Problema $TSP$ (COMMESSO VIAGGIATORE, versione decisionale)

Il problema è formalizzato dalla tripla

$$
TSP = (I_{TSP}, S_{TSP}, \pi_{TSP}).
$$

#### Istanze

$$
I_{TSP} =
\{ \langle G=(V,E), w, k \rangle :
G \text{ grafo completo non orientato} \land
w : E \to \mathbb{R}^+ \land
k \in \mathbb{R}^+
\}.
$$

(Qui $w$ assegna un peso a ogni arco e $k$ è la soglia di costo.)

---

#### Certificati

$$
S_{TSP}(G,w,k) = \{ E_0 \subseteq E \}.
$$

(Il certificato è un sottoinsieme di archi.)

---

#### Predicato

$$
\pi_{TSP}(G,w,k,S_{TSP}) =
\exists E_0 \in S_{TSP}(G,w,k):
\begin{cases}
|E_0| = |V|, \\
\forall v \in V\ \exists u,z \in V :
(u,v) \in E_0 \land (v,z) \in E_0, \\
\sum_{e \in E_0} w(e) \le k.
\end{cases}
$$

(Cioè $E_0$ seleziona un ciclo hamiltoniano e il suo peso totale è $\le k$.)

---

## Enunciato

Esiste una trasformazione polinomiale $f$ tale che, per ogni istanza $\langle G \rangle$ di $HC$,

$$
\langle G \rangle \in HC
\iff
f(\langle G \rangle) \in TSP.
$$

Quindi

$$
HC \le_p TSP.
$$

---

## Idea della dimostrazione

Dato $G=(V,E)$, costruiamo un grafo completo

$$
\hat{G} = (V, \hat{E})
$$

sugli stessi nodi e definiamo i pesi come segue:

- peso $1$ sugli archi che esistono già in $G$;
- peso $2n$ sugli archi aggiunti (non presenti in $G$), dove $n=|V|$.

Poniamo $k=n$. Allora:

- se $G$ ha un ciclo hamiltoniano, in $\hat{G}$ esiste un ciclo di costo esattamente $n$ usando solo archi “buoni”;
- se $G$ non ha un ciclo hamiltoniano, ogni ciclo hamiltoniano in $\hat{G}$ deve usare almeno un arco “cattivo”, e quindi il costo totale supera $n$.

---

## Dimostrazione

Sia $\langle G=(V,E) \rangle$ un’istanza di $HC$ e sia $n=|V|$.
Definiamo:

$$
f(\langle G \rangle) = \langle \hat{G}=(V,\hat{E}), w, n \rangle,
$$

dove

$$
\hat{E} = \{(u,v) : u,v \in V,\ u \neq v\}
$$

(grafo completo) e, per ogni $(u,v) \in \hat{E}$,

$$
w(u,v) =
\begin{cases}
1 & \text{se } (u,v) \in E, \\
2n & \text{se } (u,v) \in \hat{E} \setminus E.
\end{cases}
$$

La costruzione è polinomiale in $|G|$.

---

### $(\Rightarrow)$

Se $G$ contiene un ciclo hamiltoniano, lo stesso insieme di archi $E_0$ è un certificato valido anche in $\hat{G}$.
Tutti gli archi di $E_0$ appartengono a $E$, quindi hanno peso $1$.
Poiché $|E_0|=n$, si ha

$$
\sum_{e \in E_0} w(e) = n \le n,
$$

e dunque

$$
\langle \hat{G}, w, n \rangle \in TSP.
$$

---

### $(\Leftarrow)$

Se $G$ non contiene cicli hamiltoniani, allora qualunque sottoinsieme
$E_0 \subseteq \hat{E}$ che soddisfa i vincoli strutturali di $\pi_{TSP}$
deve contenere almeno un arco in $\hat{E} \setminus E$, che ha peso $2n$.
Gli altri $n-1$ archi hanno peso almeno $1$, quindi

$$
\sum_{e \in E_0} w(e) \ge 2n + (n-1) > n.
$$

Ne segue che

$$
\langle \hat{G}, w, n \rangle \notin TSP.
$$

---

## Conclusione

Abbiamo mostrato che

$$
\langle G \rangle \in HC
\iff
f(\langle G \rangle) \in TSP,
$$

e quindi

$$
HC \le_p TSP.
$$
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
## Teorema (enunciato)

Nel testo, la riduzione usata è:

$$
\textbf{VERTEX COVER} \le_p \textbf{CICLO HAMILTONIANO (HC)},
$$

cioè si associa in tempo polinomiale a ogni istanza $\langle G,k\rangle$ di **VC** un grafo $G'$ tale che

$$
\langle G,k\rangle \in VC \Longleftrightarrow G' \in HC,
$$

e questo serve a provare che **HC è NP-completo**.

> Nota: nella pagina indicata non compare “$(HC \le VC)$” ma “$(VC \le HC)$”. Io qui sto riportando **solo** l’enunciato/formalizzazione presenti lì.

---

## Formalizzazione (tripla) di **CICLO HAMILTONIANO (HC)**

Il problema **HC** (“esiste un ciclo che visita tutti i vertici esattamente una volta?”) è formalizzato come tripla $\langle I,S,\pi\rangle$ così:

### Insieme delle istanze

$$
I_{HC} = \{\langle G = (V,E) \rangle :\ G \text{ è un grafo non orientato}\}.
$$

(Input: un grafo.)

### Insieme delle soluzioni possibili (certificati)

$$
S_{HC}(G) = \{\psi : V \to \{1,\dots,|V|\}\},
$$

cioè l’insieme degli **ordinamenti** dei nodi di $V$.

### Predicato

Posto $n = |V|$,

$$
\pi_{HC}(G,S_{HC}(G)) \equiv \exists \psi \in S_{HC}(G):\
\Big(\forall\, 1 \le i < n\, [ (\psi^{-1}(i), \psi^{-1}(i+1)) \in E ]\Big) \land (\psi^{-1}(n), \psi^{-1}(1)) \in E.
$$

Interpretazione: l’ordinamento $\psi$ descrive un ciclo che collega consecutivi e chiude sull’inizio, quindi è un **ciclo hamiltoniano**.

(Osservazione standard: il certificato è la sequenza $\langle v_1,\dots,v_n\rangle$ e la verifica è polinomiale, quindi $HC \in NP$.)

---

## Idea della dimostrazione (solo idea, senza dimostrazione)

Per provare la NP-completezza di **HC**, il testo costruisce una riduzione **da VC a HC**, cioè trasforma $\langle G,k\rangle$ in un grafo $G'$ tale che $G$ ha un vertex cover di taglia $k$ **se e solo se** $G'$ contiene un ciclo hamiltoniano.

*(Dimostrazione: omessa come richiesto.)*
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
