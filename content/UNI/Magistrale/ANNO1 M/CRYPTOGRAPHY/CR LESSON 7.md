# Lesson 7 — Pseudorandom Functions and CPA-Secure Encryption

In [[CR LESSON 6|lesson 6]], we used a pseudorandom generator (PRG) to overcome Shannon's key-length barrier in symmetric-key encryption: Alice and Bob share a short secret key $k$ and encrypt a longer message via $\operatorname{Enc}(k,m) = G(k) \oplus m$. That PRG-OTP construction achieves one-time computational security, **but it breaks completely if the key is reused**. This lecture removes the one-time restriction in two steps: first introducing **pseudorandom functions (PRFs)**, and then using them to define, construct, and prove **CPA-secure encryption** for polynomially many messages under a single short key.

## Why PRGs are not enough

Suppose Alice and Bob reuse the same key $k$ in PRG-OTP to encrypt two messages $m_1$ and $m_2$. Because $G$ is deterministic, both encryptions apply the exact same pad $G(k)$:

$$
c_1 = G(k) \oplus m_1, \qquad c_2 = G(k) \oplus m_2.
$$

An adversary observing both ciphertexts immediately cancels the pad by XORing them together:

$$
c_1 \oplus c_2 = \bigl(G(k) \oplus m_1\bigr) \oplus \bigl(G(k) \oplus m_2\bigr) = m_1 \oplus m_2.
$$

Learning $m_1 \oplus m_2$ already leaks how the plaintexts relate (for example, revealing when $m_1 = m_2$). Worse, if the adversary knows or chooses $m_1$—as in a chosen-plaintext attack—it recovers $m_2 = (c_1 \oplus c_2) \oplus m_1$ in full.

Our objective is therefore an encryption scheme in which Alice and Bob share **one short secret key** once and can securely encrypt **many messages** with it. Notice an essential distinction in roles: just as a PRG is not an encryption scheme by itself, a PRF is not an encryption scheme either—both are cryptographic **building blocks** used to construct encryption.

## What is a pseudorandom function?

A PRG takes a single short seed $k$ and expands it once into one longer pseudorandom string $G(k)$. By contrast, a **pseudorandom function (PRF)** takes **two inputs**: a secret key $k$ (chosen once and kept fixed by Alice and Bob) and an ordinary data input $x$, producing an output $F_k(x)$. Fixing $k$ once lets the parties evaluate a deterministic function on **many different inputs** $x_1, x_2, x_3, \dots$ without changing the key.

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

where $\lambda$ is the security parameter, $k \in \{0,1\}^{\lambda}$ is the $\lambda$-bit secret key, and $n = n(\lambda)$ is the input and output block length in bits. For every key $k$, $F_k : \{0,1\}^n \to \{0,1\}^n$ is a **deterministic, polynomial-time computable** function, so evaluating $F(k, x) = F_k(x)$ twice on the same $(k, x)$ always returns the exact same $n$-bit string.

Three structural points from the lecture clarify the syntax:

- **Fixing $k$ does not yet produce an output.** Sampling $k \gets U_\lambda$ only selects which function $F_k \in \mathcal{F}$ is active; an output is produced only when $F_k$ is evaluated on an input $x \in \{0,1\}^n$.
- **$F_k$ need not be injective or collision-free.** Distinct inputs $x_1 \neq x_2$ may map to the same output under $F_k$; a PRF is a general function, not necessarily a bijection (permutation). Nor does syntax forbid two distinct keys from inducing the same function—unpredictability comes from the security definition below.
- **Length parameters.** Taking both input and output lengths equal to $n$ is a convenient simplification; in general a PRF can map $\{0,1\}^n \to \{0,1\}^m$ for $m \neq n$. Likewise, syntax does not force $n > \lambda$ (the definition still parses even for $n = 1$), though encryption applications choose $n$ large enough that $2^{-n}$ is negligible (e.g., $n \ge \lambda$, or $128$/$256$-bit blocks in practice) so nonces do not collide.

## PRF security: real vs. ideal games

To define what it means for $F_k$ to look "pseudorandom," consider first an unattainable **ideal mental experiment**. Suppose Alice and Bob could meet and agree on a gigantic lookup table specifying a function $R : \{0,1\}^n \to \{0,1\}^n$ picked **uniformly at random** from $\mathcal{R}(n,n)$, the set of *all* functions from $\{0,1\}^n$ to $\{0,1\}^n$.

> [!note] "Random function" still means deterministic
> Calling $R$ a *uniformly random function* means that **which table $R \in \mathcal{R}(n,n)$ is picked at setup** is uniformly random—not that $R$ flips fresh coins on every call. Once $R$ is chosen, $R$ is completely deterministic: if $R(0011) = 1010$ on the first query, querying $R(0011)$ again must still return $1010$.

In a uniformly random table $R$, every distinct input $x$ is assigned an independent, uniform $n$-bit output. A family $\mathcal{F}$ is a secure PRF if, when $k \gets U_\lambda$ is hidden, no efficient adversary querying $F_k(\cdot)$ at inputs of its choice can distinguish it from querying that ideal random function $R(\cdot)$.

![[CR_L7_prf_games.svg|800]]

For any probabilistic polynomial-time (PPT) adversary $\mathcal{A}$, define two interactive games with a challenger $\mathcal{C}$:

- **$\operatorname{Game}^{\mathrm{real}}_{\mathcal{F},\mathcal{A}}(\lambda)$ (Real game):** $\mathcal{C}$ samples a secret key $k \gets U_\lambda$. Whenever $\mathcal{A}$ queries $x \in \{0,1\}^n$, $\mathcal{C}$ computes and returns $y = F_k(x)$.
- **$\operatorname{Game}^{\mathrm{ideal}}_{\mathcal{F},\mathcal{A}}(\lambda)$ (Ideal game):** $\mathcal{C}$ samples a function $R \gets \mathcal{R}(n,n)$ uniformly from all maps $\{0,1\}^n \to \{0,1\}^n$. Whenever $\mathcal{A}$ queries $x \in \{0,1\}^n$, $\mathcal{C}$ returns $y = R(x)$.

In both games, $\mathcal{A}$ may issue polynomially many **adaptive** queries (choosing each next $x$ after seeing earlier replies) before outputting a guess bit $b' \in \{0,1\}$, which is the output of the game.

**Definition (PRF security).** The efficiently computable family $\mathcal{F}$ is a **pseudorandom function** if for every PPT adversary $\mathcal{A}$,

$$
\boxed{\operatorname{Game}^{\mathrm{real}}_{\mathcal{F},\mathcal{A}}(\lambda) \approx_c \operatorname{Game}^{\mathrm{ideal}}_{\mathcal{F},\mathcal{A}}(\lambda)},
$$

that is, writing $\mathcal{A}^{F_k}$ and $\mathcal{A}^R$ for black-box oracle access to $F_k$ or $R$,

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

where the probabilities include the sampling of $k$ or $R$ and any internal coins of $\mathcal{A}$.

Two details from class clarify the notation:
1. **Why do $\mathcal{F}$ and $\lambda$ appear in $\operatorname{Game}^{\mathrm{ideal}}_{\mathcal{F},\mathcal{A}}(\lambda)$?** Even though the ideal game does not run $F_k$, $\lambda$ and $\mathcal{F}$ fix the input/output length $n = n(\lambda)$ defining $\mathcal{R}(n,n)$.
2. **Why is no explicit query bound $q$ written in the definition?** Because $\mathcal{A}$ is PPT, its running time—and hence its query count—is automatically bounded by $\operatorname{poly}(\lambda)$. *(Concrete-security statements track $(T, q, \varepsilon)$-security explicitly; the asymptotic definition avoids carrying those extra parameters.)*

## Truly random functions and lazy sampling

How many functions belong to $\mathcal{R}(n,n)$? There are $2^n$ possible $n$-bit inputs, and each input can map independently to any of $2^n$ possible $n$-bit outputs, giving

$$
\boxed{\left|\mathcal{R}(n,n)\right| = \left(2^n\right)^{2^n} = 2^{n \cdot 2^n}}.
$$

Explicitly writing down a single table $R \in \mathcal{R}(n,n)$ takes $n \cdot 2^n$ bits—exponential space, impossible for Alice and Bob to store or share. Instead, they share a $\lambda$-bit key $k$ and evaluate $F_k(x)$ efficiently.

### Doesn't the ideal game require exponential time?

Slide 2 remarks that the formal ideal challenger $\mathcal{C}$ takes **exponential time** (it is unbounded) because sampling $R \gets \mathcal{R}(n,n)$ upfront materializes $2^n$ entries.

Against any PPT adversary $\mathcal{A}$, however, an equivalent polynomial-time simulator $\mathcal{C}'$ can reproduce the exact same oracle behavior via **lazy sampling**. Since $\mathcal{A}$ makes at most $q(\lambda) = \operatorname{poly}(\lambda)$ queries, $\mathcal{C}'$ maintains an initially empty lookup table $T = \emptyset$ and answers each query $x \in \{0,1\}^n$ as follows:

- If $(x, y) \in T$ already exists, return $y$ (preserving determinism on repeated queries).
- Otherwise, sample $y \gets U_n$ uniformly and independently, store $(x, y)$ in $T$, and return $y$.

![[CR_L7_lazy_sampling.svg|800]]

Because a uniform $R \gets \mathcal{R}(n,n)$ assigns independent uniform outputs to distinct inputs, caching answers on demand produces the **exact same joint distribution** as sampling the entire table upfront while storing at most $q(\lambda)$ entries in polynomial time.

## Exercise: no PRF against unbounded adversaries

Slide 3 poses the exercise: **show that no family $\mathcal{F}$ is a PRF against computationally unbounded adversaries.** The lecture gives the key-enumeration intuition; below is the counting proof.

Under standard parameters where the function space exceeds the key space—specifically whenever $n \cdot 2^n \ge \lambda + 1$ (for instance, $n = \lambda$ or any growing block length $n = \omega(\log \lambda)$)—there are at most $2^\lambda$ functions in $\mathcal{F}$, compared to $2^{n \cdot 2^n}$ functions in $\mathcal{R}(n,n)$.

![[CR_L7_prf_unbounded_attack.svg|800]]

An unbounded distinguisher $\mathcal{A}$ breaks any such family $\mathcal{F}$ by searching all keys:

1. Fix $t = \lceil (\lambda + 1) / n \rceil$ distinct inputs $x_1, \dots, x_t \in \{0,1\}^n$. *(Because $n \cdot 2^n \ge \lambda + 1$, we have $(\lambda + 1)/n \le 2^n$, so $t \le 2^n$ distinct inputs exist, and $tn \ge \lambda + 1$.)*
2. Query the oracle $\mathcal{O}$ on $x_1, \dots, x_t$ to obtain $(y_1, \dots, y_t)$.
3. Enumerate all $2^\lambda$ keys $k \in \{0,1\}^\lambda$ and output $1$ if and only if some key $k$ satisfies $F_k(x_j) = y_j$ for every $j \in \{1, \dots, t\}$.

Comparing the two games:

- **In $\operatorname{Game}^{\mathrm{real}}$:** the oracle is $F_{k^*}$ for some true key $k^* \in \{0,1\}^\lambda$, so the search always finds a match and $\Pr_{k \gets U_\lambda}[\mathcal{A}^{F_k}(1^\lambda) = 1] = 1$.
- **In $\operatorname{Game}^{\mathrm{ideal}}$:** since $x_1, \dots, x_t$ are distinct, $\bigl(R(x_1), \dots, R(x_t)\bigr)$ is uniform over $(\{0,1\}^n)^t$, which has size $2^{tn} \ge 2^{\lambda + 1}$. Each key $k$ matches at most one tuple, so at most $2^\lambda$ tuples make $\mathcal{A}$ output $1$, giving
  $$\Pr_{R \gets \mathcal{R}(n,n)}\!\left[\mathcal{A}^{R}(1^\lambda) = 1\right] \leq \frac{2^\lambda}{2^{tn}} \leq \frac{2^\lambda}{2^{\lambda+1}} = \frac{1}{2}.$$

Thus $\mathcal{A}$'s distinguishing advantage is at least $1 - \frac{1}{2} = \frac{1}{2}$, which is non-negligible. *(Note the parameter condition: if $n$ were a tiny constant such as $n = 1$ while $\lambda$ grew, $|\mathcal{R}(1,1)| = 4 < 2^\lambda$ and keys could cover all maps; for every standard parameterization with $n \cdot 2^n > \lambda$, PRF security is strictly computational.)*

## How do we build PRFs?

Slide 3 summarizes where PRFs come from in practice and in theory:

- **In practice (AES, DES, block ciphers):** Real-world systems instantiate PRFs with standardized block ciphers such as **AES** or Triple-**DES**. **Nobody knows how to prove that AES is a PRF**; its security is a heuristic conjecture that has resisted cryptanalysis for roughly 25 years. AES was standardized around 2000, before provable reductions became a standard requirement, and prioritizes hardware/software speed.
  - *Crucial distinction:* even though AES is called a *block cipher*, **AES by itself is not an encryption scheme**—using it directly on messages is completely insecure. Instead, practitioners model AES as a PRF (in fact, a stronger invertible *pseudorandom permutation*) and build secure encryption on top of it.
- **In theory:**
  - **From arbitrary OWFs:** One-way functions suffice in principle to construct PRFs (the lecture previews building a PRF from a PRG—the GGM construction—which is clean once a PRG exists, whereas building a PRG from an arbitrary OWF is what makes the general OWF route impractical).
  - **From public-key assumptions:** Under algebraic assumptions such as **factoring, discrete logarithms, or lattices**, one can build provably secure, practical PRFs, though they remain slower than AES—which is why AES dominates symmetric encryption. *(Conversely, the professor notes that public-key cryptography cannot be built from PRFs alone.)*

Crucially, **how the PRF is built is the only difference between theory and practice**: once we assume a PRF exists, the CPA-secure encryption scheme and its security proof below work identically.

## CPA security: defining multi-message encryption

Because **PRF security and encryption security are different notions**, having a PRF does not automatically give a secure encryption scheme; we first need a security definition for encrypting multiple messages under the same secret key.

In [[CR LESSON 6|lesson 6]], the one-time security game gave $\mathcal{A}$ only a single ciphertext $c^*$. In a **Chosen-Plaintext Attack (CPA)**, $\mathcal{A}$ is stronger: it can adaptively choose arbitrary plaintexts $m$ and obtain their encryptions under the *same* secret key $k$, both before and after receiving the challenge ciphertext $c^*$.

### The CPA security game

![[CR_L7_cpa_game.svg|800]]

For a symmetric-key encryption scheme $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ and a fixed hidden bit $b \in \{0,1\}$, the experiment $\operatorname{Game}^{\mathrm{cpa}}_{\Pi,\mathcal{A}}(\lambda, b)$ runs in four steps:

1. **Setup:** Challenger $\mathcal{C}$ samples a uniform secret key $k \gets \mathcal{K}$.
2. **Phase 1 (encryption queries):** $\mathcal{A}$ adaptively submits plaintexts $m \in \mathcal{M}$ and receives $c \gets \operatorname{Enc}_k(m)$, repeating polynomially many times.
3. **Challenge:** $\mathcal{A}$ submits two equal-length messages $m_0^*, m_1^* \in \mathcal{M}$ ($|m_0^*| = |m_1^*|$); $\mathcal{C}$ computes $c^* \gets \operatorname{Enc}_k(m_b^*)$ and returns $c^*$ to $\mathcal{A}$.
4. **Phase 2 (more encryption queries):** $\mathcal{A}$ may issue additional polynomially many encryption queries $m \in \mathcal{M}$ under the same key $k$, and finally outputs a guess bit $b' \in \{0,1\}$.

**Definition (CPA security).** The scheme $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ is **CPA-secure** if for every PPT adversary $\mathcal{A}$,

$$
\boxed{\operatorname{Game}^{\mathrm{cpa}}_{\Pi,\mathcal{A}}(\lambda, 0) \approx_c \operatorname{Game}^{\mathrm{cpa}}_{\Pi,\mathcal{A}}(\lambda, 1)}.
$$

In words, even with adaptive encryption-oracle access under the same key $k$, no efficient adversary can distinguish an encryption of $m_0^*$ from an encryption of $m_1^*$ with non-negligible advantage.

### Why encryption must be randomized

Every encryption scheme seen through lesson 6 was deterministic: for fixed $k$ and $m$, $\operatorname{Enc}_k(m)$ always produced the same ciphertext $c$. **No deterministic encryption scheme can be CPA-secure**:

1. In Phase 1, $\mathcal{A}$ queries $m_0^*$ and receives $c_0 = \operatorname{Enc}_k(m_0^*)$.
2. In the Challenge phase, $\mathcal{A}$ submits $m_0^*$ and a distinct equal-length message $m_1^* \neq m_0^*$, receiving $c^*$.
3. $\mathcal{A}$ outputs $0$ if $c^* = c_0$, and $1$ otherwise.

By correctness of deterministic encryption ($\operatorname{Enc}_k(m_0^*) \neq \operatorname{Enc}_k(m_1^*)$ whenever $m_0^* \neq m_1^*$, since decryption must recover the plaintext uniquely), this attack wins with probability $1$. Forbidding $\mathcal{A}$ from querying $m_0^*$ or $m_1^*$ would be artificial, because in practice Alice must be able to encrypt the same message twice safely.

The remedy is **randomized encryption**:

$$
\boxed{c \gets \operatorname{Enc}_k(m) \equiv c = \operatorname{Enc}_k(m; r)}, \qquad r \gets \mathcal{R},
$$

where fresh randomness $r$ is sampled uniformly from a sufficiently large randomness space $\mathcal{R}$ on every call. Encrypting the same message twice then produces different ciphertexts with overwhelming probability. Decryption $\operatorname{Dec}_k(\cdot)$ usually remains deterministic, using auxiliary information carried in the ciphertext together with $k$, and correctness requires $\operatorname{Dec}_k(\operatorname{Enc}_k(m; r)) = m$. Crucially, randomization is **necessary** for CPA security, not automatically **sufficient**—we still need a concrete construction and proof.

## Constructing CPA-secure encryption from any PRF

Let $\mathcal{F} = \{F_k : \{0,1\}^n \to \{0,1\}^n\}_{k \in \{0,1\}^\lambda}$ be a PRF family. To encrypt a message $m \in \{0,1\}^n$ under key $k \gets U_\lambda$, define $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ by:

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

Sending $c_1 = r$ in the clear is safe: Bob needs $r$ to recompute $F_k(r)$ when decrypting, whereas an adversary without $k$ cannot evaluate $F_k(r)$, and PRF security relies on keeping $k$ secret—not on hiding $r$. Correctness holds for every $k$, $m$, and $r$ because the pad cancels:

$$
\operatorname{Dec}_k\bigl(r,\, F_k(r) \oplus m\bigr) = F_k(r) \oplus \bigl(F_k(r) \oplus m\bigr) = m.
$$

Notice also that decryption evaluates $F_k$ only in the **forward** direction—it never requires inverting $F_k$, so any PRF (even a non-invertible one) works here.

## Security proof of the PRF-based scheme

### Theorem — CPA security from any PRF

**Assumption:** $\mathcal{F} = \{F_k : \{0,1\}^n \to \{0,1\}^n\}_{k \in \{0,1\}^\lambda}$ is a secure PRF family, with $n = n(\lambda)$ large enough that $2^{-n}$ is negligible (e.g., $n = \operatorname{poly}(\lambda)$ such as $n = \lambda$).

**Conclusion to prove:** The encryption scheme $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ defined above is CPA-secure.

### Proof setup and hybrid games

Let $\mathcal{A}$ be any PPT adversary in the CPA security game, and write

$$
G(\lambda, b) \equiv \operatorname{Game}^{\mathrm{cpa}}_{\Pi, \mathcal{A}}(\lambda, b) \qquad (b \in \{0,1\}).
$$

Our goal is to prove $G(\lambda, 0) \approx_c G(\lambda, 1)$.

**Proof route (Game Hopping).** Because a secure PRF $F_k$ is computationally indistinguishable from a truly random function $R \gets \mathcal{R}(n, n)$, we introduce a **hybrid game $H(\lambda, b)$** that executes the exact same CPA experiment as $G(\lambda, b)$, except that the challenger samples $R \gets \mathcal{R}(n, n)$ at setup and uses $R(r)$ in place of $F_k(r)$ for every query and for the challenge.

![[CR_L7_cpa_games_g_and_h.svg|800]]

In $H(\lambda, b)$, replacing $F_k$ with $R$ turns the challenge pad $R(r^*)$ into a fresh, uniform one-time pad—*provided* $r^*$ does not collide with the randomness sampled in any encryption query. Bridging $G(\lambda, 0)$ to $G(\lambda, 1)$ through $H(\lambda, 0)$ and $H(\lambda, 1)$ reduces the theorem to two lemmas:

![[CR_L7_cpa_game_hopping.svg|820]]

$$
\boxed{G(\lambda, 0) \approx_c H(\lambda, 0) \approx_s H(\lambda, 1) \approx_c G(\lambda, 1)}.
$$

### Lemma 1 — Computational indistinguishability ($G(\lambda, b) \approx_c H(\lambda, b)$)

**Claim:** For every fixed $b \in \{0,1\}$, $G(\lambda, b) \approx_c H(\lambda, b)$.

**Proof begins here.** Fix either $b \in \{0,1\}$ (the exact same argument works for $b = 0$ and $b = 1$) and suppose, for contradiction, that there exists a PPT adversary $\mathcal{A}$ distinguishing $G(\lambda, b)$ from $H(\lambda, b)$ with non-negligible advantage:

$$
\varepsilon(\lambda) = \left|\Pr\!\left[G(\lambda, b) = 1\right] - \Pr\!\left[H(\lambda, b) = 1\right]\right|.
$$

We construct a PPT reduction $\mathcal{B}$ that uses $\mathcal{A}$ as a subroutine to break the PRF security of $\mathcal{F}$, contradicting our assumption.

| | CPA Adversary $\mathcal{A}$ | Reduction $\mathcal{B}$ |
| --- | --- | --- |
| Goal | Distinguish $G(\lambda, b)$ from $H(\lambda, b)$ | Distinguish $\mathcal{O} = F_k$ from $\mathcal{O} = R$ |
| Oracle / queries | Sends $m$ (queries) and $(m_0^*, m_1^*)$ (challenge) | Queries $\mathcal{C}$ on $r \gets U_n$, receives $z = \mathcal{O}(r)$ |
| Output | Guess bit $b' \in \{0,1\}$ | Forwards $b'$ directly to $\mathcal{C}$ |
| Role in proof | Assumed distinguisher for contradiction | Constructed PPT PRF distinguisher |

![[CR_L7_lemma1_reduction.svg|820]]

The PRF challenger $\mathcal{C}$ runs either $\operatorname{Game}^{\mathrm{real}}_{\mathcal{F},\mathcal{B}}(\lambda)$ ($\mathcal{O} = F_k$ with $k \gets U_\lambda$) or $\operatorname{Game}^{\mathrm{ideal}}_{\mathcal{F},\mathcal{B}}(\lambda)$ ($\mathcal{O} = R$ with $R \gets \mathcal{R}(n,n)$). Without knowing $k$ or which world $\mathcal{C}$ chose, $\mathcal{B}$ simulates the CPA challenger for $\mathcal{A}$ as follows:

1. **Start:** $\mathcal{B}$ invokes $\mathcal{A}$ (`"START"`).
2. **Encryption queries (Phase 1 and Phase 2):** Whenever $\mathcal{A}$ sends a plaintext $m \in \{0,1\}^n$, $\mathcal{B}$ samples a fresh $r \gets U_n$, sends $r$—**not** $m$—to its PRF challenger $\mathcal{C}$ to receive $z = \mathcal{O}(r)$, forms $c = (r,\, z \oplus m)$, and returns $c$ to $\mathcal{A}$.
3. **Challenge:** When $\mathcal{A}$ sends equal-length messages $(m_0^*, m_1^*)$, $\mathcal{B}$ samples $r^* \gets U_n$, sends $r^*$ to $\mathcal{C}$ to receive $z^* = \mathcal{O}(r^*)$, forms $c^* = (r^*,\, z^* \oplus m_b^*)$ using the fixed bit $b$, and sends $c^*$ to $\mathcal{A}$.
4. **Output:** After any remaining Phase 2 queries, $\mathcal{A}$ outputs a bit $b' \in \{0,1\}$, and $\mathcal{B}$ outputs the exact same $b'$ to $\mathcal{C}$.

*(Notice the difference between query phases and the challenge: in Phases 1 and 2, $\mathcal{A}$ sends a single message $m$; only in the Challenge phase does $\mathcal{A}$ send the pair $(m_0^*, m_1^*)$.)*

**Why the simulation is exact in both worlds:**

- **If $\mathcal{C}$ is in $\operatorname{Game}^{\mathrm{real}}$ ($\mathcal{O} = F_k$):** every query reply is $(r,\, F_k(r) \oplus m)$ and the challenge is $(r^*,\, F_k(r^*) \oplus m_b^*)$, so $\mathcal{A}$'s view is distributed **identically** to $G(\lambda, b)$—even if an $r$ repeats, because $F_k$ is deterministic. Since $\mathcal{B}$ forwards $b'$ unchanged,
  $$
  \Pr_{k \gets U_\lambda}\!\left[\mathcal{B}^{F_k}(1^\lambda) = 1\right] = \Pr\!\left[G(\lambda, b) = 1\right].
  $$
- **If $\mathcal{C}$ is in $\operatorname{Game}^{\mathrm{ideal}}$ ($\mathcal{O} = R$):** every query reply is $(r,\, R(r) \oplus m)$ and the challenge is $(r^*,\, R(r^*) \oplus m_b^*)$, so $\mathcal{A}$'s view is distributed **identically** to $H(\lambda, b)$—again even if an $r$ repeats, because $R$ is deterministic. Therefore,
  $$
  \Pr_{R \gets \mathcal{R}(n,n)}\!\left[\mathcal{B}^{R}(1^\lambda) = 1\right] = \Pr\!\left[H(\lambda, b) = 1\right].
  $$

Subtracting these two equalities shows that $\mathcal{B}$ achieves the **exact same** distinguishing advantage as $\mathcal{A}$, with zero loss (a *perfect reduction*):

$$
\left|\Pr\!\left[\mathcal{B}^{F_k}(1^\lambda) = 1\right] - \Pr\!\left[\mathcal{B}^{R}(1^\lambda) = 1\right]\right|
= \left|\Pr\!\left[G(\lambda, b) = 1\right] - \Pr\!\left[H(\lambda, b) = 1\right]\right|
= \varepsilon(\lambda).
$$

Because $\mathcal{A}$ runs in polynomial time (making polynomially many queries) and $\mathcal{B}$ performs only one $U_n$ sample, one oracle query, and one $n$-bit XOR per query, $\mathcal{B}$ is PPT. Since $\varepsilon(\lambda)$ is non-negligible, $\mathcal{B}$ breaks the PRF security of $\mathcal{F}$—a contradiction. Hence $G(\lambda, b) \approx_c H(\lambda, b)$ for both $b \in \{0,1\}$. **End of Lemma 1 proof.**

*(Note: Lemma 1 alone does not prove CPA security; it proves only that replacing $F_k$ with a truly random function $R$ is undetectable to any PPT adversary. Comparing $b = 0$ against $b = 1$ happens next inside the ideal-function games $H(\lambda, 0)$ and $H(\lambda, 1)$.)*

### Lemma 2 — Statistical indistinguishability ($H(\lambda, 0) \approx_s H(\lambda, 1)$)

**Goal:** Prove that

$$
\boxed{H(\lambda, 0) \approx_s H(\lambda, 1)}
$$

for every adversary $\mathcal{A}$—**even computationally unbounded**—that makes at most $q(\lambda) = \operatorname{poly}(\lambda)$ queries in total. Here $\approx_s$ denotes **statistical indistinguishability**, meaning that the statistical distance $\operatorname{SD}\bigl(H(\lambda, 0); H(\lambda, 1)\bigr)$ is negligible in $\lambda$. Because every PPT adversary is limited to polynomially many queries, statistical closeness immediately implies computational closeness $H(\lambda, 0) \approx_c H(\lambda, 1)$.

**Proof begins here.**

**1. Intuition (no encryption queries):** Suppose first that $\mathcal{A}$ makes no encryption queries at all. Upon receiving $(m_0^*, m_1^*)$, the challenger samples $r^* \gets U_n$ and returns $c^* = (r^*,\, R(r^*) \oplus m_b^*)$. Because $R \gets \mathcal{R}(n,n)$ is a uniformly random table that has never been evaluated on $r^*$ anywhere else, $z^* = R(r^*)$ is uniformly distributed over $\{0,1\}^n$ and independent of $r^*$ and $m_b^*$. Thus $c^*$ has the exact same distribution as $(r^*,\, z^* \oplus m_b^*)$ with $r^*, z^* \gets U_n$—a fresh **One-Time Pad**—so $H(\lambda, 0) \equiv H(\lambda, 1)$ when there are no encryption queries.

**2. Problem (encryption queries can collide with $r^*$):** Once $\mathcal{A}$ can request encryptions under $R$, a random-input collision can break the pad. For example, suppose $\mathcal{A}$ queries $m = 0^n$ (either before or after the challenge) and the challenger happens to sample the **exact same** randomness $r^*$ as in the challenge ciphertext $c^* = (r^*, c_2^*)$. Then that query returns

$$
c = \bigl(r^*,\, R(r^*) \oplus 0^n\bigr) = \bigl(r^*,\, R(r^*)\bigr).
$$

Seeing $c_1 = r^*$, $\mathcal{A}$ reads off the challenge pad $R(r^*)$, computes $c_2^* \oplus R(r^*) = m_b^*$, and distinguishes $b = 0$ from $b = 1$ with probability $1$. Note that $\mathcal{A}$ cannot *force* $r_i = r^*$, because $\mathcal{C}$ samples each $r_i$ and $r^*$ uniformly and independently; a collision occurs only by chance.

**3. The $\mathrm{BAD}$ event and conditioning on $\overline{\mathrm{BAD}}$:** Define $\mathrm{BAD}$ to be the event that the challenge randomness $r^*$ collides with the randomness $r_i$ sampled in **any** encryption query (before or after the challenge).

![[CR_L7_lemma2_bad_event.svg|800]]

Conditioned on $\overline{\mathrm{BAD}}$ (meaning $r^*$ is distinct from every encryption-query input $r_i$), the table entry $R(r^*)$ is evaluated **only once** in the entire experiment. We can therefore replace $R(r^*)$ with a uniform string $z^* \gets U_n$ independent of everything else $\mathcal{A}$ sees, turning $c_2^* = z^* \oplus m_b^*$ into an independent One-Time Pad. Consequently, conditioned on $\overline{\mathrm{BAD}}$, the two experiments are **identically distributed**:

$$
\bigl(H(\lambda, 0) \mid \overline{\mathrm{BAD}}\bigr) \equiv \bigl(H(\lambda, 1) \mid \overline{\mathrm{BAD}}\bigr).
$$

**4. Bounding $\Pr[\mathrm{BAD}]$ via the union bound:** Let $r_1, \dots, r_q$ denote all $q = q(\lambda) = \operatorname{poly}(\lambda)$ independent uniform $n$-bit strings sampled during the experiment (both the encryption queries and the challenge $r^*$). If $r^*$ collides with some query's $r_i$, then in particular some pair of distinct indices $i \neq j$ in $\{1, \dots, q\}$ collides. For any two independent uniform $n$-bit strings, the collision probability is $\Pr[r_i = r_j] = \operatorname{Col}(U_n) = 2^{-n}$. Summing over all $\binom{q}{2} = \frac{q(q-1)}{2}$ unordered pairs by the **union bound** yields:

$$
\begin{aligned}
\Pr[\mathrm{BAD}]
&\leq \Pr_{r_1,\dots,r_q \gets U_n}\!\left[\exists\, i \neq j \in \{1,\dots,q\} : r_i = r_j\right] \\
&\leq \sum_{1 \le i < j \le q} \Pr[r_i = r_j]
= \binom{q}{2} \cdot 2^{-n}.
\end{aligned}
$$

*(Technical precision: bounding $\mathrm{BAD}$ by "any two among all $q$ sampled inputs collide" gives $\binom{q}{2} 2^{-n}$, whereas $\mathrm{BAD}$ itself only requires a collision involving $r^*$—which would give the tighter $(q-1)2^{-n}$. Counting all $\binom{q}{2}$ pairs is a valid, slightly looser upper bound, and because $q = \operatorname{poly}(\lambda)$ and $n = n(\lambda)$ makes $2^{-n}$ negligible, e.g., $n = \lambda$, the product $\operatorname{poly}(\lambda) \cdot \operatorname{negl}(\lambda)$ is still $\operatorname{negl}(\lambda)$.)*

**5. Conclusion of Lemma 2:** Because $H(\lambda, 0)$ and $H(\lambda, 1)$ behave identically whenever $\mathrm{BAD}$ does not occur, a standard probability-space bound (stated on slide 13 without its short partition proof) implies that their **statistical distance** is at most $\Pr[\mathrm{BAD}]$:

$$
\boxed{\operatorname{SD}\bigl(H(\lambda, 0);\, H(\lambda, 1)\bigr) \leq \Pr[\mathrm{BAD}] \leq \binom{q}{2} 2^{-n} = \operatorname{negl}(\lambda)}.
$$

Therefore $H(\lambda, 0) \approx_s H(\lambda, 1)$, and in particular $H(\lambda, 0) \approx_c H(\lambda, 1)$ for every PPT adversary. **End of Lemma 2 proof.**

### Final step — Combining Lemma 1 and Lemma 2

Applying the triangle inequality along the chain

$$
\underbrace{G(\lambda, 0) \approx_c H(\lambda, 0)}_{\text{Lemma 1 }(b=0)}
\;\underbrace{\approx_s}_{\text{Lemma 2}}\;
\underbrace{H(\lambda, 1) \approx_c G(\lambda, 1)}_{\text{Lemma 1 }(b=1)}
$$

gives, for every PPT adversary $\mathcal{A}$,

$$
\begin{aligned}
\left|\Pr[G(\lambda, 0) = 1] - \Pr[G(\lambda, 1) = 1]\right|
&\leq \left|\Pr[G(\lambda, 0) = 1] - \Pr[H(\lambda, 0) = 1]\right| \\
&\quad + \left|\Pr[H(\lambda, 0) = 1] - \Pr[H(\lambda, 1) = 1]\right| \\
&\quad + \left|\Pr[H(\lambda, 1) = 1] - \Pr[G(\lambda, 1) = 1]\right| \\
&\leq \operatorname{negl}_0(\lambda) + \operatorname{negl}_{\mathrm{stat}}(\lambda) + \operatorname{negl}_1(\lambda)
= \operatorname{negl}(\lambda),
\end{aligned}
$$

because a finite sum of negligible functions is negligible. Hence $G(\lambda, 0) \approx_c G(\lambda, 1)$, proving that $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ is CPA-secure. **End of proof.**

## Sources

- [Local lecture-7 slides](Assets/SLIDES/crypto_lecture07_2627.pdf), PDF pp. 1–13: PRF motivation, syntax, real vs. ideal games, and exponential-time remark (pp. 1–2); unbounded-adversary exercise and practical/theoretical PRF constructions (p. 3); CPA security definition, randomized encryption, and PRF-based SKE construction (pp. 4–6); CPA security theorem, hybrid $H(\lambda, b)$, Lemma 1 reduction, and Lemma 2 $\mathrm{BAD}$-event / union-bound proof (pp. 7–13).
- [Lecture-7 transcript](<Assets/TRANSCRIPTION/CR LESSON 7 Transcripted.md>), Parts 1 and 2: classroom explanations of determinism of $R$, parameter Q&A, lazy sampling, AES/theory discussion, CPA randomization Q&A, Lemma 1 simulation, and Lemma 2 $\mathrm{BAD}$-event intuition, with automatic-transcription errors.
- [Friend's note](<Assets/APPUNTI_DAVIDE/lez. 7.md>), consulted solely as a secondary check on notation and formulas.
- Diagrams `CR_L7_prf_games.svg`, `CR_L7_lazy_sampling.svg`, `CR_L7_prf_unbounded_attack.svg`, `CR_L7_cpa_game.svg`, `CR_L7_cpa_games_g_and_h.svg`, `CR_L7_cpa_game_hopping.svg`, `CR_L7_lemma1_reduction.svg`, and `CR_L7_lemma2_bad_event.svg` in `Assets/CRPIC/` redraw slide figures and illustrate the Lemma 1 reduction and Lemma 2 collision bound; original screenshots `Pasted image 20261116134742.jpg`, `Pasted image 20261116221423.png`, `Pasted image 20261116231243.png`, and `Pasted image 20261117110459.png` are preserved on disk in `Assets/CRPIC/`.
