# Lesson 7 — Pseudorandom Functions and CPA-Secure Encryption

In [[CR LESSON 6|lesson 6]], we used a pseudorandom generator (PRG) to overcome Shannon's key-length barrier in symmetric-key encryption: Alice and Bob share a short secret key $k$ and encrypt a longer message via $\operatorname{Enc}(k,m) = G(k) \oplus m$. That PRG-OTP construction achieves one-time computational security, **but it still breaks completely if the key is reused**. This lecture resolves the key-reuse barrier in two steps: first introducing **pseudorandom functions (PRFs)**, and then using them to define and construct **CPA-secure encryption** for many messages under a single short key.

## Why PRGs are not enough

Suppose Alice and Bob reuse the same key $k$ in PRG-OTP to encrypt two messages $m_1$ and $m_2$. Because $G$ is deterministic, both encryptions apply the exact same pad $G(k)$:

$$
c_1 = G(k) \oplus m_1, \qquad c_2 = G(k) \oplus m_2.
$$

An adversary observing both ciphertexts immediately eliminates the pad by XORing them together:

$$
c_1 \oplus c_2 = \bigl(G(k) \oplus m_1\bigr) \oplus \bigl(G(k) \oplus m_2\bigr) = m_1 \oplus m_2.
$$

Learning $m_1 \oplus m_2$ already leaks information about how the plaintexts relate (for instance, revealing when $m_1 = m_2$). Worse, if the adversary knows or chooses $m_1$—as in a chosen-plaintext attack—it recovers $m_2 = (c_1 \oplus c_2) \oplus m_1$ in full.

Our goal is therefore to build an encryption scheme in which Alice and Bob share **one short secret key** and can securely encrypt **many messages** with it (with no one-time restriction). Notice an essential role distinction: just as a PRG is not an encryption scheme by itself, a PRF is not an encryption scheme either—both are cryptographic **building blocks** used to construct encryption.

## What is a pseudorandom function?

A PRG takes a single short seed $k$ and expands it once into one longer pseudorandom string $G(k)$. By contrast, a **pseudorandom function (PRF)** takes **two inputs**: a secret key $k$ (chosen once and kept fixed by Alice and Bob) and an ordinary data input $x$, producing an output $F_k(x)$. Once $k$ is fixed, the same short key lets the parties evaluate a deterministic function on **many different inputs** $x_1, x_2, x_3, \dots$ without changing the key.

| Property | Pseudorandom Generator (PRG) | Pseudorandom Function (PRF) |
| --- | --- | --- |
| Inputs | One short uniform seed $k$ | Secret key $k$ plus an input $x$ |
| Output behavior | Expands $k$ into one longer string $G(k)$ | Evaluates $F_k(x)$ on many chosen inputs $x$ |
| Determinism | Deterministic in $k$ | Deterministic in $(k, x)$ |
| Use in encryption | Supplies one fixed pad $G(k)$ (one-time) | Can supply fresh pads $F_k(x)$ across different inputs $x$ |

### Formal syntax

A PRF is a **family of efficiently computable functions**

$$
\boxed{\mathcal{F} = \left\{ F_k : \{0,1\}^n \to \{0,1\}^n \right\}_{k \in \{0,1\}^{\lambda}}},
$$

where:
- $\lambda$ is the security parameter, and $k \in \{0,1\}^{\lambda}$ is the $\lambda$-bit secret key;
- $n = n(\lambda)$ is the block length of inputs and outputs in bits;
- For every key $k$, $F_k : \{0,1\}^n \to \{0,1\}^n$ is a **deterministic, polynomial-time computable** function, meaning that evaluating $F(k, x) = F_k(x)$ twice on the same $(k, x)$ always returns the exact same $n$-bit string.

Several structural clarifications from lecture prevent common misunderstandings:

- **Fixing the key does not yet produce an output.** Selecting $k \gets U_\lambda$ only picks which function $F_k \in \mathcal{F}$ is active; an output appears only when $F_k$ is evaluated on a concrete input $x \in \{0,1\}^n$.
- **$F_k$ need not be injective or collision-free.** Distinct inputs $x_1 \neq x_2$ can produce the same output under $F_k$; a PRF is an arbitrary deterministic function, not necessarily a bijection (unlike a permutation). Nor does syntax forbid two distinct keys $k_1 \neq k_2$ from inducing the same function—all unpredictability requirements come from the security game below.
- **Length parameters.** Setting both input and output lengths to $n$ is a convenient simplification; in general a PRF can map $\{0,1\}^n \to \{0,1\}^m$ for $m \neq n$. Likewise, syntax does not force $n > \lambda$ (the definition still parses even for $n = 1$), though encryption applications choose $n \ge \lambda$ (or standard block sizes such as $128$ or $256$ bits in practice) so inputs are large enough for messages and non-repeating nonces.

## PRF security: real vs. ideal games

To define what it means for $F_k$ to look "pseudorandom," consider first an unattainable **ideal mental experiment**. Suppose Alice and Bob could meet and agree on a gigantic lookup table specifying a function $R : \{0,1\}^n \to \{0,1\}^n$ chosen **uniformly at random** from $\mathcal{R}(n,n)$, the set of *all* functions from $\{0,1\}^n$ to $\{0,1\}^n$.

> [!note] "Random function" still means deterministic
> Calling $R$ a *uniformly random function* means that **which table $R \in \mathcal{R}(n,n)$ is picked at setup** is uniformly random—not that $R$ flips fresh coins every time it is called. Once $R$ is chosen, $R$ is completely deterministic: if $R(0011) = 1010$ on the first query, querying $R(0011)$ again must still return $1010$.

With a uniformly random table $R$, every distinct input $x$ maps to an independent, uniformly random $n$-bit string. A function family $\mathcal{F}$ is a secure PRF if, when $k \gets U_\lambda$ is hidden, no efficient adversary querying $F_k(\cdot)$ at inputs of its choice can tell it apart from querying that ideal random function $R(\cdot)$.

![[CR_L7_prf_games.svg|800]]

For any probabilistic polynomial-time (PPT) adversary $\mathcal{A}$, define two interactive experiments with a challenger $\mathcal{C}$:

- **$\operatorname{Game}^{\mathrm{real}}_{\mathcal{F},\mathcal{A}}(\lambda)$ (Real game):** $\mathcal{C}$ samples a uniform secret key $k \gets U_\lambda$. Whenever $\mathcal{A}$ queries an input $x \in \{0,1\}^n$, $\mathcal{C}$ computes and returns $y = F_k(x)$.
- **$\operatorname{Game}^{\mathrm{ideal}}_{\mathcal{F},\mathcal{A}}(\lambda)$ (Ideal game):** $\mathcal{C}$ samples a function $R \gets \mathcal{R}(n,n)$ uniformly among all maps $\{0,1\}^n \to \{0,1\}^n$. Whenever $\mathcal{A}$ queries $x \in \{0,1\}^n$, $\mathcal{C}$ returns $y = R(x)$.

In both games, $\mathcal{A}$ may issue polynomially many **adaptive** queries (choosing each next $x$ after observing earlier replies) before outputting a single guess bit $b' \in \{0,1\}$, which is the output of the game.

**Definition (PRF security).** The efficiently computable family $\mathcal{F}$ is a **pseudorandom function** if for every PPT adversary $\mathcal{A}$,

$$
\boxed{\operatorname{Game}^{\mathrm{real}}_{\mathcal{F},\mathcal{A}}(\lambda) \approx_c \operatorname{Game}^{\mathrm{ideal}}_{\mathcal{F},\mathcal{A}}(\lambda)},
$$

meaning that

$$
\left|
\Pr\!\left[\operatorname{Game}^{\mathrm{real}}_{\mathcal{F},\mathcal{A}}(\lambda) = 1\right]
-
\Pr\!\left[\operatorname{Game}^{\mathrm{ideal}}_{\mathcal{F},\mathcal{A}}(\lambda) = 1\right]
\right|
=
\left|
\Pr_{k \gets U_\lambda}\!\left[\mathcal{A}^{F_k}(1^\lambda) = 1\right]
-
\Pr_{R \gets \mathcal{R}(n,n)}\!\left[\mathcal{A}^{R}(1^\lambda) = 1\right]
\right|
\leq \operatorname{negl}(\lambda),
$$

where $\mathcal{A}^{F_k}$ and $\mathcal{A}^R$ denote $\mathcal{A}$ given black-box oracle access to $F_k$ or $R$, and the probabilities are taken over the sampling of $k$ or $R$ and any internal random coins of $\mathcal{A}$.

Two details raised in class help read this definition accurately:
1. **Why do $\mathcal{F}$ and $\lambda$ appear in $\operatorname{Game}^{\mathrm{ideal}}_{\mathcal{F},\mathcal{A}}(\lambda)$?** The ideal game never evaluates $F_k$, yet $\lambda$ and $\mathcal{F}$ still parameterize it because they fix the domain and codomain length $n = n(\lambda)$ defining $\mathcal{R}(n,n)$.
2. **Why is no query bound $q$ written explicitly?** Because $\mathcal{A}$ is a PPT algorithm, its running time—and hence the number of oracle queries it can make—is automatically bounded by $\operatorname{poly}(\lambda)$. *(In concrete-security proofs one tracks $(T, q, \varepsilon)$-PRFs explicitly for running time $T$, $q$ queries, and advantage $\varepsilon$; the asymptotic definition avoids carrying those extra parameters.)*

## Truly random functions and lazy sampling

How large is the set $\mathcal{R}(n,n)$ of all functions mapping $\{0,1\}^n \to \{0,1\}^n$? There are $2^n$ possible inputs, and each input can independently be assigned any of $2^n$ possible outputs. Counting all such tables gives

$$
\boxed{\left|\mathcal{R}(n,n)\right| = \left(2^n\right)^{2^n} = 2^{n \cdot 2^n}}.
$$

Representing even a single function $R \in \mathcal{R}(n,n)$ explicitly requires writing $2^n$ rows of $n$ bits each—$n \cdot 2^n$ bits in total. That is why Alice and Bob could never share $R$ in reality: instead of sharing an exponential-sized table, they share a $\lambda$-bit key $k$ and compute $F_k(x)$ on demand.

### Doesn't the ideal game require exponential time?

On slide 2, the professor explicitly notes that the ideal challenger $\mathcal{C}$ as written takes **exponential time** (it is computationally unbounded) because literally sampling $R \gets \mathcal{R}(n,n)$ writes down $2^n$ entries.

Fortunately, that does not break the asymptotic game framework. Because $\mathcal{A}$ is PPT, it can query at most $q(\lambda) = \operatorname{poly}(\lambda)$ inputs—an exponentially tiny fraction of the $2^n$ entries. An equivalent polynomial-time simulator $\mathcal{C}'$ can therefore reproduce the ideal oracle using **lazy sampling**:

1. Initialize an empty lookup table $T = \emptyset$.
2. When $\mathcal{A}$ queries $x \in \{0,1\}^n$:
   - If a pair $(x, y)$ is already stored in $T$, return $y$ (preserving determinism on repeated queries).
   - Otherwise, sample $y \gets U_n$ uniformly and independently, store $(x, y)$ in $T$, and return $y$.

![[CR_L7_lazy_sampling.svg|800]]

Because a uniformly chosen $R \gets \mathcal{R}(n,n)$ assigns independent uniform outputs to distinct inputs, answering fresh queries with independent uniform strings and caching past answers produces the **exact same joint distribution** of responses as sampling the entire table upfront, while storing at most $q(\lambda)$ pairs and running in polynomial time.

## Exercise: no PRF against unbounded adversaries

Slide 3 poses the following exercise: **show that no family $\mathcal{F}$ can be a secure PRF against computationally unbounded adversaries.** The lecture gives the key-enumeration intuition; below is the counting argument written out cleanly.

Under standard parameters where the function space is larger than the key space—specifically whenever $n \cdot 2^n \ge \lambda + 1$ (for example, $n = \lambda$ or any growing block length $n = \omega(\log \lambda)$)—the family $\mathcal{F}$ contains at most $2^\lambda$ distinct functions (one per key $k \in \{0,1\}^\lambda$), whereas $\mathcal{R}(n,n)$ contains $2^{n \cdot 2^n}$ functions.

![[CR_L7_prf_unbounded_attack.svg|800]]

An unbounded distinguisher $\mathcal{A}$ exploits this gap by brute-forcing the key space:

1. Fix $t = \lceil (\lambda + 1) / n \rceil$ distinct inputs $x_1, \dots, x_t \in \{0,1\}^n$. *(Because $n \cdot 2^n \ge \lambda + 1$, we have $(\lambda + 1)/n \le 2^n$, so $t \le 2^n$ distinct inputs always exist; moreover $tn \ge \lambda + 1$.)*
2. Query the oracle $\mathcal{O}$ on $x_1, \dots, x_t$ to obtain $(y_1, \dots, y_t)$.
3. Using unbounded computation, enumerate all $2^\lambda$ keys $k \in \{0,1\}^\lambda$. Output $1$ if there exists at least one key $k$ such that $F_k(x_j) = y_j$ for every $j \in \{1, \dots, t\}$; otherwise output $0$.

Now compare $\mathcal{A}$'s acceptance probability in the two games:

- **In $\operatorname{Game}^{\mathrm{real}}$:** the oracle is $F_{k^*}$ for some true secret key $k^* \in \{0,1\}^\lambda$, so the exhaustive search is guaranteed to find a matching key. Therefore,
  $$
  \Pr_{k \gets U_\lambda}\!\left[\mathcal{A}^{F_k}(1^\lambda) = 1\right] = 1.
  $$
- **In $\operatorname{Game}^{\mathrm{ideal}}$:** because $x_1, \dots, x_t$ are distinct, the vector $\bigl(R(x_1), \dots, R(x_t)\bigr)$ is uniformly distributed over $(\{0,1\}^n)^t$, which contains $2^{tn} \ge 2^{\lambda + 1}$ possible output tuples. Each key $k \in \{0,1\}^\lambda$ produces at most one tuple $\bigl(F_k(x_1), \dots, F_k(x_t)\bigr)$, so at most $2^\lambda$ tuples cause $\mathcal{A}$ to output $1$. Hence,
  $$
  \Pr_{R \gets \mathcal{R}(n,n)}\!\left[\mathcal{A}^{R}(1^\lambda) = 1\right] \leq \frac{2^\lambda}{2^{tn}} \leq \frac{2^\lambda}{2^{\lambda+1}} = \frac{1}{2}.
  $$

Combining both bounds gives a distinguishing advantage of at least

$$
\left|
\Pr\!\left[\mathcal{A}^{F_k}(1^\lambda) = 1\right]
-
\Pr\!\left[\mathcal{A}^{R}(1^\lambda) = 1\right]
\right|
\geq 1 - \frac{1}{2} = \frac{1}{2},
$$

which is non-negligible. *(Note the parameter condition: if $n$ were kept as a tiny constant such as $n = 1$ while $\lambda$ grows, $|\mathcal{R}(1,1)| = 4$ would be smaller than $2^\lambda$ and a key family could cover all maps; for every standard parameterization with $n \cdot 2^n > \lambda$, PRF security is strictly computational.)*

## How do we build PRFs?

Before applying PRFs to multi-message encryption, slide 3 summarizes where PRFs come from in practice and in theory:

- **In practice (AES, DES, block ciphers):** Real-world systems instantiate PRFs with standardized block ciphers such as **AES** or Triple-**DES**. **Nobody knows how to prove that AES is a PRF**—its security is a heuristic conjecture that has resisted cryptanalysis for roughly 25 years. As noted in lecture, AES was standardized around 2000, before provable security became a standard design requirement (unlike modern post-quantum or messaging competitions), and its structure trades provable reductions for extreme software and hardware speed.
  - *Crucial distinction:* even though AES is called a *block cipher*, **AES by itself is not an encryption scheme**; applying it naively to plaintexts is completely insecure. Rather, practitioners model AES as a PRF (in fact, a stronger *pseudorandom permutation* because a block cipher must be invertible for decryption), and then build secure encryption schemes on top of it.
- **In theory:**
  - **From arbitrary OWFs:** One-way functions suffice in principle to build PRFs (the lecture previews constructing a PRF from any PRG—the GGM construction—which is fairly clean once a PRG is given, whereas building the underlying PRG from an arbitrary OWF makes this route impractical).
  - **From public-key assumptions:** Under structured algebraic assumptions such as **factoring, discrete logarithms, or lattices**, one can build provably secure PRFs that are genuinely practical and polynomial-time implementable—yet still significantly slower than AES, which is why AES remains standard in symmetric cryptography. *(Conversely, the professor notes that public-key cryptography cannot be built from PRFs alone.)*

The key takeaway connects both worlds: **how** the PRF is built is the only difference between theory and practice. Once we assume we have a PRF—whether conjectured via AES or proved from theoretical assumptions—the construction of a CPA-secure encryption scheme and its security proof work identically.

## CPA security: defining multi-message encryption

We now want to use a PRF to build a symmetric-key encryption scheme $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ that lets Alice and Bob share one short secret key and encrypt many messages securely. First, we must define what security means in this multi-message setting, because **PRF security and encryption security are different concepts**: a PRF provides pseudorandom function evaluations on inputs $x$, whereas an encryption scheme must hide plaintexts across repeated encryptions under the same key $k$.

In [[CR LESSON 6|lesson 6]], the one-time security game gave the adversary $\mathcal{A}$ only a single challenge ciphertext $c^*$. In a **Chosen-Plaintext Attack (CPA)**, $\mathcal{A}$ is strictly stronger: it can adaptively choose arbitrary plaintext messages $m$, request their encryptions under the *same* secret key $k$ both before and after seeing the challenge ciphertext $c^*$, and still tries to distinguish which of two chosen equal-length challenge messages $m_0^*, m_1^*$ was encrypted.

### The CPA security game

![[CR_L7_cpa_game.svg|800]]

For a symmetric-key encryption scheme $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ and fixed challenge bit $b \in \{0,1\}$ hidden from $\mathcal{A}$, the experiment $\operatorname{Game}^{\mathrm{cpa}}_{\Pi,\mathcal{A}}(\lambda, b)$ runs as follows:

1. **Setup:** Challenger $\mathcal{C}$ samples a secret key $k \gets \mathcal{K}$ uniformly.
2. **Phase 1 (encryption queries):** $\mathcal{A}$ adaptively sends plaintexts $m \in \mathcal{M}$ and receives $c \gets \operatorname{Enc}_k(m)$, repeating polynomially many times.
3. **Challenge:** $\mathcal{A}$ submits two equal-length messages $m_0^*, m_1^* \in \mathcal{M}$ ($|m_0^*| = |m_1^*|$); $\mathcal{C}$ computes $c^* \gets \operatorname{Enc}_k(m_b^*)$ and returns $c^*$ to $\mathcal{A}$.
4. **Phase 2 (more encryption queries):** $\mathcal{A}$ may issue additional polynomially many encryption queries $m \in \mathcal{M}$ under the same key $k$, then outputs a guess bit $b' \in \{0,1\}$.

**Definition (CPA security).** The scheme $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ is **CPA-secure** if for every PPT adversary $\mathcal{A}$,

$$
\boxed{\operatorname{Game}^{\mathrm{cpa}}_{\Pi,\mathcal{A}}(\lambda, 0) \approx_c \operatorname{Game}^{\mathrm{cpa}}_{\Pi,\mathcal{A}}(\lambda, 1)},
$$

meaning that no efficient adversary can distinguish an encryption of $m_0^*$ from an encryption of $m_1^*$ with non-negligible advantage, even with adaptive oracle access to $\operatorname{Enc}_k(\cdot)$.

### Why encryption must be randomized

Every encryption algorithm we studied through lesson 6 was deterministic: for a fixed key $k$ and message $m$, $\operatorname{Enc}_k(m)$ always produced the same ciphertext $c$. **No deterministic encryption scheme can be CPA-secure**, as a simple attack shows:

1. In Phase 1, $\mathcal{A}$ queries the encryption oracle on $m_0^*$ and receives $c_0 = \operatorname{Enc}_k(m_0^*)$.
2. In the Challenge phase, $\mathcal{A}$ submits $m_0^*$ and a distinct message $m_1^* \neq m_0^*$ of the same length, receiving $c^*$.
3. $\mathcal{A}$ checks whether $c^* = c_0$: if equal, it outputs $0$; otherwise it outputs $1$.

By correctness of deterministic encryption ($\operatorname{Enc}_k(m_0^*) \neq \operatorname{Enc}_k(m_1^*)$ whenever $m_0^* \neq m_1^*$, since decryption must recover the plaintext uniquely), this attack succeeds with probability $1$. Forbidding $\mathcal{A}$ from querying $m_0^*$ or $m_1^*$ would be an artificial restriction—in real communication Alice must be able to encrypt the same message twice safely.

The solution is to make encryption **randomized**:

$$
\boxed{c \gets \operatorname{Enc}_k(m) \equiv c = \operatorname{Enc}_k(m; r)}, \qquad r \gets \mathcal{R},
$$

where $r$ is fresh randomness sampled uniformly from a sufficiently large randomness space $\mathcal{R}$ for every encryption call. Encrypting the same message twice now yields different ciphertexts with overwhelming probability. Decryption $\operatorname{Dec}_k(\cdot)$ usually remains deterministic, using auxiliary information placed in the ciphertext (as we will see with $r$ below) together with $k$, and correctness requires $\operatorname{Dec}_k(\operatorname{Enc}_k(m; r)) = m$. Importantly, randomization is **necessary** for CPA security, not automatically **sufficient**—we still need a concrete construction and a security proof.

## Constructing CPA-secure encryption from any PRF

Let $\mathcal{F} = \{F_k : \{0,1\}^n \to \{0,1\}^n\}_{k \in \{0,1\}^\lambda}$ be a PRF family. To encrypt a message $m \in \{0,1\}^n$ using secret key $k \gets U_\lambda$, define $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ by:

$$
\boxed{\operatorname{Enc}_k(m) = (c_1, c_2) = \bigl(r,\, F_k(r) \oplus m\bigr)} \quad (r \gets U_n),
\qquad
\boxed{\operatorname{Dec}_k(c_1, c_2) = F_k(c_1) \oplus c_2}.
$$

| Element | Role in the construction |
| --- | --- |
| $k \gets U_\lambda$ | Short secret key shared between Alice and Bob |
| $r \gets U_n$ | Fresh uniform input to the PRF, sampled per encryption |
| $F_k(r)$ | Pseudorandom $n$-bit pad masking the plaintext |
| $m \in \{0,1\}^n$ | Plaintext message |
| $(r, F_k(r) \oplus m)$ | Complete ciphertext $(c_1, c_2)$ |

Why is it safe to send $c_1 = r$ in the clear? Bob needs $r$ in order to recompute the same pad $F_k(r)$ during decryption, whereas an adversary without $k$ cannot evaluate $F_k(r)$, and PRF security relies on hiding the key $k$ rather than hiding the evaluation point $r$. Correctness holds for every $k$, $m$, and $r$ because the two evaluations of $F_k(r)$ cancel under XOR:

$$
\operatorname{Dec}_k\bigl(r,\, F_k(r) \oplus m\bigr) = F_k(r) \oplus \bigl(F_k(r) \oplus m\bigr) = m.
$$

Notice also that decryption evaluates $F_k$ only in the **forward** direction—it never requires inverting $F_k$, which is why any PRF (even a non-invertible one) works here.

## Security proof of the PRF-based scheme (in progress)

### Theorem — CPA security from any PRF

**Assumption:** $\mathcal{F} = \{F_k : \{0,1\}^n \to \{0,1\}^n\}_{k \in \{0,1\}^\lambda}$ is a secure PRF family, with $n = n(\lambda)$ large enough that $2^{-n}$ is negligible (e.g., $n$ polynomial in $\lambda$).

**Conclusion to prove:** The encryption scheme $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ defined above is CPA-secure.

### Proof setup and hybrid games

Let $\mathcal{A}$ be any PPT adversary in the CPA security game, and abbreviate the real game for bit $b \in \{0,1\}$ by

$$
G(\lambda, b) \equiv \operatorname{Game}^{\mathrm{cpa}}_{\Pi, \mathcal{A}}(\lambda, b).
$$

Our goal is to show $G(\lambda, 0) \approx_c G(\lambda, 1)$.

**Central idea:** We know that a secure PRF $F_k$ is computationally indistinguishable from a truly random function $R \gets \mathcal{R}(n, n)$. We therefore introduce a **hybrid game $H(\lambda, b)$** that runs the exact same CPA experiment as $G(\lambda, b)$, except that the challenger samples $R \gets \mathcal{R}(n, n)$ at setup and computes every pad as $R(r)$ instead of $F_k(r)$.

![[CR_L7_cpa_games_g_and_h.svg|800]]

Why does switching to $R$ help? In $H(\lambda, b)$, if the challenge randomness $r^*$ has never appeared in any earlier or later encryption query, then $R(r^*)$ is a fresh uniformly random $n$-bit string independent of everything else $\mathcal{A}$ sees. Consequently, $c_2^* = R(r^*) \oplus m_b^*$ acts exactly like a **One-Time Pad** hiding $m_b^*$.

### Two-lemma proof roadmap

Bridging $G(\lambda, 0)$ to $G(\lambda, 1)$ through $H(\lambda, 0)$ and $H(\lambda, 1)$ splits the proof into two lemmas:

![[CR_L7_cpa_game_hopping.svg|820]]

$$
\boxed{G(\lambda, 0) \approx_c H(\lambda, 0) \approx_s H(\lambda, 1) \approx_c G(\lambda, 1)}.
$$

- **Lemma 1 (Computational indistinguishability):** $G(\lambda, b) \approx_c H(\lambda, b)$ for every fixed $b \in \{0,1\}$, proved by reduction to the PRF security of $\mathcal{F}$ (replacing $F_k$ with $R$ cannot be detected by any PPT adversary).
- **Lemma 2 (Statistical indistinguishability):** $H(\lambda, 0) \approx_s H(\lambda, 1)$ for any (even computationally unbounded) adversary making at most $q(\lambda) = \operatorname{poly}(\lambda)$ encryption queries. Here $\approx_s$ denotes **statistical indistinguishability** (the statistical distance between the two games is $\operatorname{negl}(\lambda)$, so even an unbounded adversary with $q = \operatorname{poly}(\lambda)$ queries has negligible advantage, bounded via the collision probability of $r^*$). Since statistical closeness implies computational closeness, combining Lemma 1 ($b=0$), Lemma 2, and Lemma 1 ($b=1$) via the triangle inequality yields $G(\lambda, 0) \approx_c G(\lambda, 1)$.

> [!todo] Remaining to complete in this lecture
> Add the proofs of **Lemma 1** (the explicit reduction $\mathcal{B}$ from $G(\lambda, b)$ vs. $H(\lambda, b)$ to PRF security) and **Lemma 2** (the $\mathrm{BAD}$ collision-event bound for $H(\lambda, 0) \approx_s H(\lambda, 1)$), corresponding to slides pp. 8–13.

## Sources

- [Local lecture-7 slides](Assets/SLIDES/crypto_lecture07_2627.pdf), PDF pp. 1–8 inspected so far: PRF motivation, syntax and security games (pp. 1–2); unbounded-adversary exercise and practical vs. theoretical PRF constructions (p. 3); CPA security definition, randomized encryption requirement, PRF-based construction, and theorem/hybrid-game setup through Lemma 1 statement (pp. 4–8). Slides pp. 8–13 cover the remaining proofs of Lemmas 1 and 2.
- [Lecture-7 transcript](<Assets/TRANSCRIPTION/CR LESSON 7 Transcripted.md>), Part 1 and opening of Part 2: classroom explanations of determinism of $R$, parameter Q&A, lazy sampling, AES/theory discussion, and CPA motivation/randomization Q&A, with automatic-transcription errors.
- [Friend's note](<Assets/APPUNTI_DAVIDE/lez. 7.md>), consulted solely as a secondary check on formulas up to the Lemma 1–2 setup.
- Diagrams `CR_L7_prf_games.svg`, `CR_L7_lazy_sampling.svg`, `CR_L7_prf_unbounded_attack.svg`, `CR_L7_cpa_game.svg`, `CR_L7_cpa_games_g_and_h.svg`, and `CR_L7_cpa_game_hopping.svg` in `Assets/CRPIC/` redraw slide figures and illustrate the hybrid/game-hopping structure; original screenshots `Pasted image 20261116134742.jpg`, `Pasted image 20261116221423.png`, and `Pasted image 20261116231243.png` are preserved on disk in `Assets/CRPIC/`.
