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

