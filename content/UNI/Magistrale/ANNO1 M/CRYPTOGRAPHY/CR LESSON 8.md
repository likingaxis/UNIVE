# Lesson 8: Constructing PRFs from PRGs (The GGM Construction)

In [[CR LESSON 7|lesson 7]], we introduced pseudorandom functions (PRFs) and used them to build a CPA-secure symmetric encryption scheme capable of encrypting polynomially many messages under a single short key. As the professor notes at the start of this lecture, two practical limitations of that encryption scheme still remain for later lessons: handling variable-length messages that exceed the block length of a fixed PRF, and defending against active adversaries that modify ciphertexts. Before addressing those questions, however, we must resolve a foundational question left open in lesson 7: **how do we construct a secure PRF in the first place?**

## Motivation: how can we build a secure PRF?

Depending on whether our goal is theoretical generality or real-world deployment, there are three main routes to obtaining a PRF.

First, from a purely theoretical standpoint, a secure PRF can be constructed starting from **any one-way function (OWF)**. Because we already saw in [[CR LESSON 5|lesson 5]] and [[CR LESSON 6|lesson 6]] that one-way functions imply pseudorandom generators (PRGs), it suffices to show how to build a secure PRF starting from **any secure PRG**. That PRG-to-PRF transformation is the main subject of this lecture. Second, one can build provably secure and more efficient PRFs from specific algebraic assumptions such as factoring, discrete logarithms, or lattice problems. Third, in real-world engineering, practitioners rely on standardized block ciphers such as **AES**, which are heuristic designs engineered to behave like pseudorandom permutations (and therefore provide invertible PRFs when the block size matches).

### Why a PRG cannot be used directly as a PRF

At first glance, both primitives stretch a short $\lambda$-bit secret into pseudorandom outputs, so one might wonder why a PRG $G$ is not already a PRF. The difference lies in the interface exposed to the adversary.

![[CR_L8_prg_vs_prf.svg|800]]

A pseudorandom generator $G : \{0,1\}^{\lambda} \to \{0,1\}^{2\lambda}$ takes a single uniformly random seed $s \gets U_\lambda$ and expands it once into a fixed $2\lambda$-bit string $G(s)$. By contrast, a pseudorandom function family $\mathcal{F} = \{F_k : \{0,1\}^n \to \{0,1\}^\lambda\}_{k \in \{0,1\}^\lambda}$ separates the fixed secret key $k \gets U_\lambda$ from the data input $x \in \{0,1\}^n$. An efficient adversary can adaptively choose many different inputs $x_1, x_2, \dots$ while the secret key $k$ stays fixed, and the oracle must remain deterministic (querying the same input $x$ twice must return the exact same output $F_k(x)$) while still looking indistinguishable from a uniformly random function $R \gets \mathcal{R}(n, \lambda)$.

We cannot simply define $F_k(x) = G(x)$ by ignoring the key: the algorithm $G$ is public, so an adversary could evaluate $G(x)$ on its own and immediately distinguish the oracle from a random function. Instead, we need a construction where the algorithm $G$ is public, the secret key $k$ remains hidden inside the evaluation, the adversary can freely query arbitrary $n$-bit inputs $x$, and the resulting outputs are computationally indistinguishable from those of a truly random table.

## The Goldreich, Goldwasser, and Micali (GGM) construction

The **GGM construction** (due to Goldreich, Goldwasser, and Micali) builds a PRF for $n$-bit inputs starting from any length-doubling PRG

$$
\boxed{G : \{0,1\}^{\lambda} \to \{0,1\}^{2\lambda}}.
$$

When we evaluate $G$ on a $\lambda$-bit seed $k$, we obtain a $2\lambda$-bit output string. We split this output into two equal halves of length $\lambda$ each:

$$
\boxed{G(k) = G_0(k) \parallel G_1(k)}, \qquad G_0, G_1 : \{0,1\}^{\lambda} \to \{0,1\}^{\lambda},
$$

where $G_0(k)$ returns the first $\lambda$ bits of $G(k)$ and $G_1(k)$ returns the last $\lambda$ bits of $G(k)$.

![[CR_L8_prg_split.svg|740]]

For example, when $\lambda = 128$, $G(k)$ is $256$ bits long, $G_0(k)$ is its first $128$ bits, and $G_1(k)$ is its last $128$ bits. Because both $G_0(k)$ and $G_1(k)$ have the exact same bit length $\lambda$ as the original key $k$, either half can serve as the seed for a subsequent invocation of $G$.

### Binary-tree evaluation and formal definition

This length-preserving split lets us organize all possible evaluations as a complete binary tree of depth $n$ rooted at the secret key $k \in \{0,1\}^\lambda$. Each node in the tree holds a $\lambda$-bit string. Starting from the root $k$, we read the bits of the input $x = x_1 x_2 \dots x_n \in \{0,1\}^n$ one by one from $x_1$ to $x_n$: when $x_i = 0$ we take the left branch by applying $G_0$, and when $x_i = 1$ we take the right branch by applying $G_1$.

**Definition (GGM PRF family).** Let $G : \{0,1\}^\lambda \to \{0,1\}^{2\lambda}$ be a length-doubling PRG, where $G(s) = G_0(s) \parallel G_1(s)$ with $|G_0(s)| = |G_1(s)| = \lambda$. For any polynomial input length $n = n(\lambda)$ and any key $k \in \{0,1\}^\lambda$, define $F_k : \{0,1\}^n \to \{0,1\}^\lambda$ on input $x = x_1 x_2 \dots x_n \in \{0,1\}^n$ by composing the half-generators along the path of $x$:

$$
\boxed{F_k(x) = G_{x_n}\!\left(G_{x_{n-1}}\!\left(\cdots G_{x_2}\!\left(G_{x_1}(k)\right)\cdots\right)\right)}.
$$

To see this concretely for $n = 2$ (as on Slide 2), the four $2$-bit inputs correspond to the four leaves at depth $2$:

$$
\begin{aligned}
F_k(00) &= G_0(G_0(k)), & F_k(01) &= G_1(G_0(k)), \\
F_k(10) &= G_0(G_1(k)), & F_k(11) &= G_1(G_1(k)).
\end{aligned}
$$

To evaluate $F_k(01)$, we start at the root $k$, follow the left branch $G_0$ for the first bit $x_1 = 0$ to obtain the depth-$1$ node $G_0(k)$, and then follow the right branch $G_1$ for the second bit $x_2 = 1$ to obtain the leaf $G_1(G_0(k))$.

![[CR_L8_ggm_tree.svg|800]]

**Why GGM is efficient.** The full binary tree of depth $n$ has $2^n$ leaves (for $n = 128$, that is $2^{128}$ leaves, representing the entire truth table of $F_k$). Crucially, the evaluator **never constructs or stores the full tree**. Given a specific input $x \in \{0,1\}^n$, computing $F_k(x)$ only follows the single root-to-leaf path dictated by $x_1, \dots, x_n$, which requires exactly $n$ sequential evaluations of the polynomial-time generator $G$. Since $n = \operatorname{poly}(\lambda)$, evaluating $F_k(x)$ runs in polynomial time.

## Security of GGM: intuition and the exponential-hybrid obstacle

### Theorem (Security of the GGM construction)

**Assumption:** $G : \{0,1\}^\lambda \to \{0,1\}^{2\lambda}$ is a secure PRG.

**Conclusion to prove:** For any polynomially bounded input length $n = n(\lambda) = \operatorname{poly}(\lambda)$, the GGM family

$$
\boxed{\mathcal{F} = \left\{ F_k : \{0,1\}^n \to \{0,1\}^\lambda \right\}_{k \in \{0,1\}^\lambda}}
$$

is a secure PRF.

*(Notation remark: on Slides 1, 3, and 6–12, the professor's handwriting writes $n(\lambda)$ with a cursive letter that resembles $m$; the transcript confirms that the input bit-length parameter is $n = n(\lambda) = \operatorname{poly}(\lambda)$.)*

### Intuition and why a naive hybrid argument over the whole tree fails

Why should $\mathcal{F}$ behave like a uniformly random function? Since the root key $k \gets U_\lambda$ is uniformly random, the PRG security of $G$ guarantees that the two depth-$1$ children are computationally indistinguishable from two independent uniform $\lambda$-bit strings:

$$
\bigl(G_0(k),\, G_1(k)\bigr) \approx_c (U_\lambda, U_\lambda).
$$

Once the depth-$1$ nodes are replaced by independent uniform strings, applying $G$ to each of them produces four depth-$2$ nodes that are again computationally indistinguishable from four independent uniform $\lambda$-bit strings. Repeating this replacement level by level down to depth $n$ would replace all $2^n$ leaves with independent uniform $\lambda$-bit strings, which is the exact truth table of a uniformly random function $R \gets \mathcal{R}(n, \lambda)$.

Turning this intuition directly into a proof over the full tree, however, hits a fundamental obstacle. Recall how a standard hybrid argument bridges a distribution $H_0$ to a distribution $H_t$ through $t(\lambda)$ intermediate steps:

$$
H_0 \to H_1 \to \cdots \to H_t.
$$

If each adjacent pair $H_{i-1}$ and $H_i$ is indistinguishable up to some negligible advantage $\varepsilon(\lambda)$, the triangle inequality bounds the total distinguishing advantage between the endpoints by

$$
\boxed{\operatorname{Adv}_{H_0, H_t}(\mathcal{A}) \leq t(\lambda) \cdot \varepsilon(\lambda)}.
$$

Whether this product remains negligible depends entirely on how many hybrids $t(\lambda)$ we sum over:

| Number of hybrids $t(\lambda)$ | Triangle-inequality bound $t(\lambda) \cdot \varepsilon(\lambda)$ | Security conclusion |
| --- | --- | --- |
| Polynomial, e.g., $t(\lambda) = \lambda^2$ | $\operatorname{poly}(\lambda) \cdot \operatorname{negl}(\lambda) = \operatorname{negl}(\lambda)$ | Valid proof: total advantage remains negligible |
| Exponential, e.g., $t(\lambda) = 2^n = 2^\lambda$ | $2^\lambda \cdot \operatorname{negl}(\lambda)$ is not necessarily negligible | Proof breaks: sum of $2^n$ negligible terms can be $\ge 1$ |

For instance, if $\varepsilon(\lambda) = 2^{-\lambda}$ (which is negligible) and we replace all $t(\lambda) = 2^\lambda$ nodes of the tree one by one, the upper bound $2^\lambda \cdot 2^{-\lambda} = 1$ becomes vacuous.

**How the actual proof overcomes this obstacle.** A PPT adversary $\mathcal{A}$ cannot inspect all $2^n$ leaves of the tree; it can make at most $q(\lambda) = \operatorname{poly}(\lambda)$ queries, exploring at most $q(\lambda)$ paths of length $n(\lambda)$. To avoid an exponential number of hybrids, the professor organizes the proof in two parts: first proving a general **Multiple-PRG Lemma** for polynomially many independent seeds, and then proving the GGM Theorem by **induction on the input length $n(\lambda) = \operatorname{poly}(\lambda)$**, which requires only $n(\lambda)$ levels of reasoning and at most $q(\lambda)$ active seeds at the bottom level.

## Helper lemma: running a PRG on polynomially many independent seeds

Standard PRG security states that a *single* evaluation $G(k)$ on a uniform seed $k \gets U_\lambda$ is computationally indistinguishable from a uniform string $U_{2\lambda}$:

$$
G(U_\lambda) \approx_c U_{2\lambda}.
$$

In the GGM proof, however, an adversary querying several inputs will trigger evaluations of $G$ on *multiple* independent random seeds $k_1, k_2, \dots, k_t \gets U_\lambda$. The following lemma shows that observing polynomially many such PRG outputs simultaneously is still computationally indistinguishable from observing $t$ independent uniform $2\lambda$-bit strings.

### Lemma (Multiple-PRG indistinguishability)

**Assumption:** $G : \{0,1\}^\lambda \to \{0,1\}^{2\lambda}$ is a secure PRG.

**Conclusion to prove:** For every polynomial $t = t(\lambda) = \operatorname{poly}(\lambda)$,

$$
\boxed{\bigl(G(k_1),\, G(k_2),\, \dots,\, G(k_t)\bigr) \approx_c \bigl(U_{2\lambda},\, U_{2\lambda},\, \dots,\, U_{2\lambda}\bigr)},
$$

where $k_1, \dots, k_t \gets U_\lambda$ are sampled independently and uniformly, and the $t$ copies of $U_{2\lambda}$ on the right-hand side are independent uniform distributions over $\{0,1\}^{2\lambda}$.

### Proof of the Multiple-PRG Lemma

**Proof begins here.** Why can we not prove this directly in one step without hybrids? Suppose an adversary $\mathcal{A}$ distinguishes the $t$-tuple $\bigl(G(k_1), \dots, G(k_t)\bigr)$ from $\bigl(U_{2\lambda}, \dots, U_{2\lambda}\bigr)$. A reduction $\mathcal{B}$ attacking the single-sample PRG security of $G$ receives only **one** challenge string $z \in \{0,1\}^{2\lambda}$ from its challenger $\mathcal{C}$, so $\mathcal{B}$ cannot simultaneously populate all $t$ positions with that single unknown challenge while matching both endpoint distributions.

Instead, we define $t + 1$ hybrid distributions $H_0, H_1, \dots, H_t$ that replace the PRG outputs with independent uniform strings **one position at a time**. For $t = 3$, the four hybrids are:

![[CR_L8_multi_prg_hybrids.svg|780]]

In general, for each index $i \in \{0, 1, \dots, t\}$, define $H_i$ by placing independent uniform strings $U_{2\lambda}$ in the first $i$ coordinates and independent PRG outputs in the remaining $t - i$ coordinates:

$$
\boxed{H_i \equiv \bigl(\underbrace{U_{2\lambda},\, \dots,\, U_{2\lambda}}_{i\text{ independent copies}},\, G(k_{i+1}),\, \dots,\, G(k_t)\bigr)}, \qquad k_{i+1}, \dots, k_t \gets U_\lambda.
$$

By construction, $H_0 \equiv \bigl(G(k_1), \dots, G(k_t)\bigr)$ is the all-pseudorandom tuple, $H_t \equiv \bigl(U_{2\lambda}, \dots, U_{2\lambda}\bigr)$ is the all-uniform tuple, and any two consecutive hybrids $H_{i-1}$ and $H_i$ differ exclusively in coordinate $i$ (which is $G(k_i)$ in $H_{i-1}$ and $U_{2\lambda}$ in $H_i$).

#### Reduction for a single transition ($H_0 \approx_c H_1$, and general $H_{i-1} \approx_c H_i$)

Let us first show that $H_0 \approx_c H_1$ (the exact same argument applies to any adjacent pair $H_{i-1} \approx_c H_i$). Suppose, for contradiction, that a PPT adversary $\mathcal{A}$ distinguishes $H_0$ from $H_1$ with advantage $\operatorname{Adv}_{H_0, H_1}(\mathcal{A}) = \varepsilon(\lambda)$. We construct a PPT reduction $\mathcal{B}$ that uses $\mathcal{A}$ to break the PRG security of $G$ against the PRG challenger $\mathcal{C}$.

| | Hybrid Distinguisher $\mathcal{A}$ | PRG Reduction $\mathcal{B}$ |
| --- | --- | --- |
| Goal | Distinguish $H_0$ from $H_1$ (or $H_{i-1}$ from $H_i$) | Distinguish $z_1 = G(k_1)$ from $z_1 \gets U_{2\lambda}$ |
| Input received | A $t$-tuple of $2\lambda$-bit strings | A single challenge string $z_1 \in \{0,1\}^{2\lambda}$ from $\mathcal{C}$ |
| Output | Decision bit $b' \in \{0,1\}$ | Forwards $b'$ directly to $\mathcal{C}$ |

![[CR_L8_multi_prg_reduction.svg|800]]

The reduction $\mathcal{B}$ executes four steps:

1. **Receive the PRG challenge:** $\mathcal{B}$ receives a single string $z_1 \in \{0,1\}^{2\lambda}$ from the PRG challenger $\mathcal{C}$, where either $z_1 = G(k_1)$ for $k_1 \gets U_\lambda$ or $z_1 \gets U_{2\lambda}$.
2. **Generate the remaining coordinates using independence:** Because the seeds $k_1, k_2, \dots, k_t$ in the lemma are independent, $\mathcal{B}$ does not need to know anything about $k_1$ in order to sample $k_2, \dots, k_t \gets U_\lambda$ independently on its own and compute $G(k_2), \dots, G(k_t)$ using the public description of $G$. *(For a general transition $H_{i-1} \approx_c H_i$, $\mathcal{B}$ samples $i - 1$ independent uniform strings $u_1, \dots, u_{i-1} \gets U_{2\lambda}$ for the coordinates before $z_i$, and samples $k_{i+1}, \dots, k_t \gets U_\lambda$ to compute $G(k_{i+1}), \dots, G(k_t)$ for the coordinates after $z_i$.)*
3. **Assemble and send the tuple:** $\mathcal{B}$ hands the $t$-tuple
   $$
   \boxed{\bigl(z_1,\, G(k_2),\, \dots,\, G(k_t)\bigr)}
   $$
   to $\mathcal{A}$.
4. **Forward the decision:** When $\mathcal{A}$ outputs its bit $b' \in \{0,1\}$, $\mathcal{B}$ outputs the exact same $b'$ to $\mathcal{C}$.

Let us check the distribution of the tuple that $\mathcal{A}$ receives in the two challenger worlds:

| Challenger $\mathcal{C}$'s choice | Tuple received by $\mathcal{A}$ | Simulated hybrid |
| --- | --- | --- |
| $z_1 = G(k_1)$ with $k_1 \gets U_\lambda$ | $\bigl(G(k_1), G(k_2), \dots, G(k_t)\bigr)$ | Exact distribution of $H_0$ (or $H_{i-1}$) |
| $z_1 \gets U_{2\lambda}$ | $\bigl(U_{2\lambda}, G(k_2), \dots, G(k_t)\bigr)$ | Exact distribution of $H_1$ (or $H_i$) |

Because the simulation is exact in both cases and $\mathcal{B}$ returns $\mathcal{A}$'s output bit $b'$ unchanged, $\mathcal{B}$'s PRG distinguishing advantage equals $\operatorname{Adv}_{H_0, H_1}(\mathcal{A})$. By the assumed PRG security of $G$, this advantage must be bounded by a negligible function $\varepsilon(\lambda)$, so $H_0 \approx_c H_1$ (and more generally $H_{i-1} \approx_c H_i$ for every $i \in \{1, \dots, t\}$).

#### Combining all $t$ transitions via the triangle inequality

Applying the triangle inequality across the chain $H_0 \approx_c H_1 \approx_c \cdots \approx_c H_t$ bounds $\mathcal{A}$'s distinguishing advantage between the endpoints $H_0$ and $H_t$:

$$
\begin{aligned}
\operatorname{Adv}_{H_0, H_t}(\mathcal{A})
&= \left|\Pr[\mathcal{A}(H_0) = 1] - \Pr[\mathcal{A}(H_t) = 1]\right| \\
&\leq \sum_{i=1}^{t} \operatorname{Adv}_{H_{i-1}, H_i}(\mathcal{A}) \\
&\leq t(\lambda) \cdot \varepsilon(\lambda).
\end{aligned}
$$

Because $t(\lambda) = \operatorname{poly}(\lambda)$ is a polynomial and $\varepsilon(\lambda)$ is negligible, their product $t(\lambda) \cdot \varepsilon(\lambda)$ is still negligible. Therefore $H_0 \approx_c H_t$, which establishes

$$
\boxed{\bigl(G(k_1),\, \dots,\, G(k_t)\bigr) \approx_c \bigl(U_{2\lambda},\, \dots,\, U_{2\lambda}\bigr)}.
$$

**End of the Multiple-PRG Lemma proof.**

## Proof of the GGM Theorem by induction on input length

Equipped with the Multiple-PRG Lemma, we now prove that the GGM construction $\mathcal{F} = \{F_k : \{0,1\}^n \to \{0,1\}^\lambda\}$ is a secure PRF for any polynomial input length $n = n(\lambda) = \operatorname{poly}(\lambda)$.

### Recursive formulation of GGM

**Proof of the GGM Theorem begins here.** We proceed by induction on the input length $n$. Notice first that the tree definition of GGM has a natural recursive structure: evaluating $F_k$ on an $n$-bit input is equivalent to evaluating the $(n-1)$-bit GGM function $F'_k : \{0,1\}^{n-1} \to \{0,1\}^\lambda$ to reach an internal node at depth $n - 1$, and then applying one final step $G_0$ or $G_1$ according to the last bit.

For example, if $F'_k(10) = G_0(G_1(k))$ is the depth-$2$ evaluation on the prefix $y = 10$, then evaluating $F_k$ on the $3$-bit input $101$ simply applies $G_1$ (for the final bit $x = 1$) to $F'_k(10)$:

$$
F_k(101) = G_1\!\bigl(\underbrace{G_0(G_1(k))}_{F'_k(10)}\bigr) = G_1\!\bigl(F'_k(10)\bigr).
$$

![[CR_L8_ggm_recursive_step.svg|780]]

Following Slide 6, we write any $n$-bit query as a pair $(x, y)$ where $x \in \{0,1\}$ is the single bit selecting the final branch $G_x$ and $y \in \{0,1\}^{n-1}$ is the $(n-1)$-bit prefix passed to $F'_k$:

$$
\boxed{F_k(x, y) = G_x\!\bigl(F'_k(y)\bigr)}, \qquad x \in \{0,1\},\quad y \in \{0,1\}^{n-1}.
$$

### Base case ($n = 1$)

When the input has length $n = 1$, there are only two possible inputs, $0$ and $1$, and their outputs are the two halves of $G(k)$:

$$
F_k(0) = G_0(k), \qquad F_k(1) = G_1(k).
$$

Because $k \gets U_\lambda$ and $G$ is a secure PRG, we have

$$
\bigl(F_k(0),\, F_k(1)\bigr) = \bigl(G_0(k),\, G_1(k)\bigr) \approx_c (U_\lambda, U_\lambda).
$$

As shown on Slide 7, the entire two-row truth table of $F_k$ on $\{0,1\}^1$ is computationally indistinguishable from two independent uniform $\lambda$-bit strings, which is the exact truth table of a uniformly random function $R \gets \mathcal{R}(1, \lambda)$. Hence $F_k$ is a secure PRF for $n = 1$.

### Inductive step ($n - 1 \implies n$)

**Inductive hypothesis:** Assume that $F' = \{F'_k : \{0,1\}^{n-1} \to \{0,1\}^\lambda\}$ is a secure PRF on inputs of length $n - 1$.

**Goal of the inductive step:** Prove that $F = \{F_k : \{0,1\}^n \to \{0,1\}^\lambda\}$ defined by $F_k(x, y) = G_x(F'_k(y))$ is a secure PRF on inputs of length $n$.

#### Defining the three games ($\mathrm{Game}_0$, $\mathrm{Game}_1$, $\mathrm{Game}_2$)

To bridge the real $n$-bit PRF game for $F_k$ to the ideal $n$-bit random-function game for $R \gets \mathcal{R}(n, \lambda)$, the professor defines three interactive experiments (colored blue, yellow, and green on Slides 8–9) in which a PPT adversary $\mathcal{A}$ adaptively queries pairs $(x, y) \in \{0,1\} \times \{0,1\}^{n-1}$:

1. **$\mathrm{Game}_0(\lambda)$ (Blue, Real $n$-bit GGM):** The challenger samples $k \gets U_\lambda$ and answers each query $(x, y)$ with
   $$
   F_k(x, y) = G_x\!\bigl(F'_k(y)\bigr).
   $$
2. **$\mathrm{Game}_1(\lambda)$ (Yellow, Hybrid game):** The challenger samples a uniformly random function $R' \gets \mathcal{R}(n - 1, \lambda)$ on $(n - 1)$-bit inputs and answers each query $(x, y)$ with
   $$
   H(x, y) = G_x\!\bigl(R'(y)\bigr).
   $$
3. **$\mathrm{Game}_2(\lambda)$ (Green, Ideal $n$-bit random function):** The challenger samples a uniformly random function $R \gets \mathcal{R}(n, \lambda)$ on $n$-bit inputs and answers each query $(x, y)$ with
   $$
   R(x, y).
   $$

We prove $\mathrm{Game}_0(\lambda) \approx_c \mathrm{Game}_2(\lambda)$ in two hops:

$$
\boxed{\mathrm{Game}_0(\lambda) \;\underbrace{\approx_c}_{\text{Inductive Hypothesis}}\; \mathrm{Game}_1(\lambda) \;\underbrace{\approx_c}_{\text{Multiple-PRG Lemma}}\; \mathrm{Game}_2(\lambda)}.
$$

#### First hop: $\mathrm{Game}_0(\lambda) \approx_c \mathrm{Game}_1(\lambda)$ (by the inductive hypothesis)

**Claim 1:** $\mathrm{Game}_0(\lambda) \approx_c \mathrm{Game}_1(\lambda)$.

Comparing the oracle responses $G_x(F'_k(y))$ in $\mathrm{Game}_0(\lambda)$ and $G_x(R'(y))$ in $\mathrm{Game}_1(\lambda)$, the only difference is whether the internal $(n-1)$-bit seed is produced by $F'_k(y)$ or by $R'(y)$. Even so, as the professor emphasizes in class, we must still write a formal reduction because the adversary sees $G_x(\cdot)$ applied to that internal value rather than the internal value directly.

Suppose, for contradiction, that a PPT adversary $\mathcal{A}$ distinguishes $\mathrm{Game}_0(\lambda)$ from $\mathrm{Game}_1(\lambda)$ with non-negligible advantage. We construct a PPT reduction $\mathcal{B}$ that breaks the $(n-1)$-bit PRF security of $F'$ against a PRF challenger $\mathcal{C}$ whose oracle is either $F'_k$ (with $k \gets U_\lambda$) or $R' \gets \mathcal{R}(n - 1, \lambda)$.

| | Adversary $\mathcal{A}$ | Reduction $\mathcal{B}$ |
| --- | --- | --- |
| Goal | Distinguish $\mathrm{Game}_0(\lambda)$ from $\mathrm{Game}_1(\lambda)$ | Distinguish oracle $F'_k$ from oracle $R' \gets \mathcal{R}(n-1, \lambda)$ |
| Queries | Adaptive $n$-bit queries $(x, y) \in \{0,1\} \times \{0,1\}^{n-1}$ | Forwards $(n-1)$-bit prefix $y$ to $\mathcal{C}$, receives $w \in \{0,1\}^\lambda$ |
| Output | Guess bit $b' \in \{0,1\}$ | Forwards $b'$ directly to $\mathcal{C}$ |

![[CR_L8_game0_game1_reduction.svg|800]]

For every query $(x, y) \in \{0,1\} \times \{0,1\}^{n-1}$ made by $\mathcal{A}$, the reduction $\mathcal{B}$ proceeds as follows:

1. $\mathcal{B}$ strips off the single bit $x$ and forwards only the $(n-1)$-bit prefix $y$ to its challenger $\mathcal{C}$.
2. $\mathcal{C}$ responds with $w \in \{0,1\}^\lambda$, where either $w = F'_k(y)$ or $w = R'(y)$.
3. Since $G$ and $x$ are known to $\mathcal{B}$, $\mathcal{B}$ computes the $\lambda$-bit half $G_x(w)$ and returns $G_x(w)$ to $\mathcal{A}$.
4. After $\mathcal{A}$ finishes querying and outputs a decision bit $b' \in \{0,1\}$, $\mathcal{B}$ outputs the exact same $b'$ to $\mathcal{C}$.

**Why this reduction is perfect:** If $\mathcal{C}$'s oracle is $F'_k$, then $w = F'_k(y)$ on every query, so $\mathcal{A}$ receives $G_x(F'_k(y))$ and its view is identical to $\mathrm{Game}_0(\lambda)$. If $\mathcal{C}$'s oracle is $R'$, then $w = R'(y)$ on every query, so $\mathcal{A}$ receives $G_x(R'(y))$ and its view is identical to $\mathrm{Game}_1(\lambda)$. Thus $\mathcal{B}$ achieves the exact same distinguishing advantage against $F'$ as $\mathcal{A}$ achieves between $\mathrm{Game}_0(\lambda)$ and $\mathrm{Game}_1(\lambda)$. By our inductive hypothesis that $F'$ is a secure PRF on $(n-1)$-bit inputs, this advantage must be negligible:

$$
\boxed{\mathrm{Game}_0(\lambda) \approx_c \mathrm{Game}_1(\lambda)}.
$$

#### Second hop: $\mathrm{Game}_1(\lambda) \approx_c \mathrm{Game}_2(\lambda)$ (by the Multiple-PRG Lemma)

**Claim 2:** $\mathrm{Game}_1(\lambda) \approx_c \mathrm{Game}_2(\lambda)$.

In $\mathrm{Game}_1(\lambda)$ (the yellow experiment), the oracle returns $H(x, y) = G_x(R'(y))$. Notice what happens as $\mathcal{A}$ queries different $(n-1)$-bit prefixes $y$: because $R' \gets \mathcal{R}(n - 1, \lambda)$ is a uniformly random function, each distinct $y$ assigns an independent uniform $\lambda$-bit seed $R'(y) \gets U_\lambda$ to $G$. If $\mathcal{A}$ makes at most $q(\lambda) = \operatorname{poly}(\lambda)$ queries overall, then at most $q(\lambda)$ distinct prefixes $y$ are ever queried, so at most $q(\lambda)$ independent seeds are ever fed into $G$.

This allows us to reduce directly to the **Multiple-PRG Lemma** with parameter

$$
t(\lambda) = q(\lambda) = \operatorname{poly}(\lambda),
$$

avoiding having to repeat a hybrid argument inside the inductive step.

Suppose, for contradiction, that a PPT adversary $\mathcal{A}$ (making at most $q = q(\lambda)$ queries) distinguishes $\mathrm{Game}_1(\lambda)$ from $\mathrm{Game}_2(\lambda)$ with non-negligible advantage. Without loss of generality, assume $\mathcal{A}$ never repeats the exact same full query $(x, y)$ twice (if it did, $\mathcal{B}$ would simply repeat its previous answer). We build a PPT reduction $\mathcal{B}$ against the Multiple-PRG Lemma challenger $\mathcal{C}$ for $t = q$.

| | Adversary $\mathcal{A}$ | Reduction $\mathcal{B}$ |
| --- | --- | --- |
| Goal | Distinguish $\mathrm{Game}_1(\lambda)$ from $\mathrm{Game}_2(\lambda)$ | Distinguish $\bigl(G(k_1),\dots,G(k_q)\bigr)$ from $\bigl(U_{2\lambda},\dots,U_{2\lambda}\bigr)$ |
| Interaction | Makes up to $q$ adaptive queries $(x, y)$ | Receives $\bigl(z_1, \dots, z_q\bigr)$ all at once from $\mathcal{C}$ at setup |
| Output | Guess bit $b' \in \{0,1\}$ | Forwards $b'$ directly to $\mathcal{C}$ |

![[CR_L8_game1_game2_reduction.svg|800]]

**Step 1 (Receiving and splitting the $q$ challenge strings upfront).** At the very beginning of the reduction (with no further interaction with $\mathcal{C}$ during the queries), $\mathcal{B}$ receives $q$ strings of length $2\lambda$ from $\mathcal{C}$:

$$
z_1, z_2, \dots, z_q \in \{0,1\}^{2\lambda},
$$

which are either $q$ independent PRG outputs $z_i = G(k_i)$ (for $k_1, \dots, k_q \gets U_\lambda$) or $q$ independent uniform strings $z_i \gets U_{2\lambda}$. Following Slide 11, $\mathcal{B}$ splits each $2\lambda$-bit string $z_i$ into its first $\lambda$ bits and last $\lambda$ bits:

$$
\boxed{z_i = \bigl(z_i^0,\, z_i^1\bigr) \in \{0,1\}^\lambda \times \{0,1\}^\lambda}.
$$

*(Note: when $\mathcal{A}$ queries $(x, y)$, $\mathcal{B}$ must return only $\lambda$ bits, namely $z_i^x$, never the full $2\lambda$-bit string $z_i$.)*

**Step 2 (Answering $\mathcal{A}$'s queries while preserving seed consistency on $y$).** Let us trace how $\mathcal{B}$ answers the first query and subsequent queries (Slides 11–12):

1. **First query $(x_1, y_1)$:** Think of the prefix $y_1$ as fixing the first seed $R'(y_1)$. $\mathcal{B}$ associates $y_1$ with the first challenge block $z_1$ and replies with the $\lambda$-bit half selected by $x_1$:
   $$
   \text{reply with } z_1^{x_1} \quad (\text{that is, } z_1^0 \text{ if } x_1 = 0,\text{ or } z_1^1 \text{ if } x_1 = 1).
   $$
2. **Second query $(x_2, y_2)$ when $y_2 \neq y_1$ (a new prefix $y$):** In $\mathrm{Game}_1(\lambda)$, a new input $y_2 \neq y_1$ to the random function $R'$ produces a fresh, independent uniform seed $R'(y_2) \gets U_\lambda$. Therefore, $\mathcal{B}$ associates $y_2$ with the next unused challenge block $z_2$ and replies with
   $$
   z_2^{x_2}.
   $$
3. **Second query $(x_2, y_2)$ when $y_2 = y_1$ (a repeated prefix $y$ with $x_2 \neq x_1$):** Why can $\mathcal{B}$ **not** use a fresh block $z_2$ or $z_3$ here? Because in $\mathrm{Game}_1(\lambda)$ (the yellow experiment), the two queries $(x_1, y_1)$ and $(x_2, y_1)$ evaluate
   $$
   G_{x_1}\!\bigl(R'(y_1)\bigr) \qquad \text{and} \qquad G_{x_2}\!\bigl(R'(y_1)\bigr),
   $$
   which both use the **exact same seed** $R'(y_1)$! They are the left and right halves of a *single* PRG invocation on seed $R'(y_1)$. To simulate $\mathrm{Game}_1(\lambda)$ faithfully, $\mathcal{B}$ must reuse the block $z_1$ already associated with $y_1$ and reply with the other half:
   $$
   z_1^{x_2}.
   $$
4. **General rule for any query $(x, y)$:** Whenever $\mathcal{A}$ queries $(x, y)$, $\mathcal{B}$ checks whether the prefix $y$ has appeared in an earlier query. If $y$ is new, $\mathcal{B}$ associates $y$ with the next unused challenge string $z_i$ (since $\mathcal{A}$ makes at most $q$ queries, $q$ strings always suffice). If $y$ appeared before, $\mathcal{B}$ retrieves the index $i$ already associated with $y$. In either case, $\mathcal{B}$ returns $z_i^x$.

**Step 3 (Why the simulation is exact in both worlds).** Compare the two challenger distributions:

| Challenger $\mathcal{C}$'s distribution | What $z_i = (z_i^0, z_i^1)$ represents | Resulting oracle distribution seen by $\mathcal{A}$ |
| --- | --- | --- |
| **Case A:** $z_i = G(k_i)$ with independent $k_i \gets U_\lambda$ | $z_i^0 = G_0(k_i)$ and $z_i^1 = G_1(k_i)$ for a fresh uniform seed $k_i$ per distinct $y$ | Since assigning a fresh $k_i \gets U_\lambda$ to each distinct $y$ is identical to $R'(y) \gets \mathcal{R}(n-1, \lambda)$, returning $z_i^x = G_x(k_i) = G_x(R'(y))$ **perfectly simulates $\mathrm{Game}_1(\lambda)$** |
| **Case B:** $z_i \gets U_{2\lambda}$ independently | $z_i^0 \gets U_\lambda$ and $z_i^1 \gets U_\lambda$ are two independent uniform $\lambda$-bit strings | Every distinct pair $(x, y)$ receives a fresh, independent uniform $\lambda$-bit string (even when $y_2 = y_1$ and $x_2 \neq x_1$, because $z_1^0$ and $z_1^1$ are independent halves of $U_{2\lambda}$), **perfectly simulating $\mathrm{Game}_2(\lambda)$** |

When $\mathcal{A}$ outputs $b'$, $\mathcal{B}$ outputs $b'$ to $\mathcal{C}$ and achieves the exact same distinguishing advantage. If $\mathcal{A}$ could distinguish $\mathrm{Game}_1(\lambda)$ from $\mathrm{Game}_2(\lambda)$ with non-negligible advantage, $\mathcal{B}$ would violate the Multiple-PRG Lemma. Hence:

$$
\boxed{\mathrm{Game}_1(\lambda) \approx_c \mathrm{Game}_2(\lambda)}.
$$

### Final step: completing the induction and the GGM proof

Combining Claim 1 and Claim 2 by transitivity of computational indistinguishability (via the triangle inequality) gives

$$
\mathrm{Game}_0(\lambda) \approx_c \mathrm{Game}_1(\lambda) \approx_c \mathrm{Game}_2(\lambda) \implies \boxed{\mathrm{Game}_0(\lambda) \approx_c \mathrm{Game}_2(\lambda)}.
$$

Because $\mathrm{Game}_0(\lambda)$ is the real PRF experiment for the $n$-bit GGM construction $F_k$ and $\mathrm{Game}_2(\lambda)$ is the ideal experiment with a uniformly random function $R \gets \mathcal{R}(n, \lambda)$, this proves that $F = \{F_k : \{0,1\}^n \to \{0,1\}^\lambda\}$ is a secure PRF. By mathematical induction on $n$, the GGM construction is a secure PRF for any polynomial input length $n(\lambda) = \operatorname{poly}(\lambda)$ (with overall security loss scaling polynomially in $n(\lambda)$ and $q(\lambda)$). **End of the GGM Theorem proof.**

## Sources

1. [Local lecture-8 slides](Assets/SLIDES/crypto_lecture08_2627.pdf), PDF pp. 1–12: PRF construction approaches and GGM setup $G(k) = (G_0(k), G_1(k))$ (pp. 1–2); depth-$2$ binary tree example $F_k(01)$ and general formula (pp. 2–3); GGM Theorem statement, intuition, and exponential-hybrid obstacle (pp. 3–4); Multiple-PRG Lemma statement, hybrids $H_0, \dots, H_t$, and reduction $\mathcal{B}$ (pp. 4–6); inductive GGM proof, recursive formulation $F_k(x,y) = G_x(F'_k(y))$, base case $n = 1$, three games $\mathrm{Game}_0, \mathrm{Game}_1, \mathrm{Game}_2$, Reduction 1 ($\mathrm{Game}_0 \approx_c \mathrm{Game}_1$), and Reduction 2 ($\mathrm{Game}_1 \approx_c \mathrm{Game}_2$) with new-$y$ vs. repeated-$y$ analysis (pp. 6–12).
2. [Lecture-8 transcript](<Assets/TRANSCRIPTION/CR LESSON 8 Transcripted.md>): classroom explanations of the remaining encryption limitations (variable-length messages and active adversaries), why $n$ PRG evaluations avoid materializing the $2^n$-leaf tree, why single-challenge PRG security requires hybrids in the Multiple-PRG Lemma, why $t(\lambda) = q(\lambda)$ suffices, and why repeating $y_2 = y_1$ with $x_2 \neq x_1$ must reuse the same block $z_1$ rather than $z_3$; contains automatic-transcription noise.
3. [Friend's note](<Assets/APPUNTI_DAVIDE/lez. 8.md>), consulted only as secondary context for notation.
4. Diagrams `CR_L8_prg_vs_prf.svg`, `CR_L8_prg_split.svg`, `CR_L8_ggm_tree.svg`, `CR_L8_multi_prg_hybrids.svg`, `CR_L8_multi_prg_reduction.svg`, `CR_L8_ggm_recursive_step.svg`, `CR_L8_game0_game1_reduction.svg`, and `CR_L8_game1_game2_reduction.svg` in `Assets/CRPIC/` redraw the supplied screenshot (`Pasted image 20261118095930.png`, preserved on disk in `Assets/CRPIC/`), convert and fix the five inline data-URL SVGs (including correcting the highlighted tree path to $F_k(01) = G_1(G_0(k))$), and illustrate the final reduction on Slides 10–12.
