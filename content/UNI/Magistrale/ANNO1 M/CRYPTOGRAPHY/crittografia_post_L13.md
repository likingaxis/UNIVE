# Cryptography — Part V: Post-Lecture-13 Material [Provisional — Bianco 2025/26]

> **Scope:** Covers §4.7 (Strengthened MD, ICM, ROM), Bianco §4.8 Solved Exercises, and Chapters 5–9 (Number Theory, PKE/RSA/Signatures, Sigma-Protocols/Fiat–Shamir, Post-Quantum/Lattices, IBE). **Not yet verified against 2026/27 Lectures 14+.**

---

# Part V — Post-Lecture-13 Material and Bianco Chapter 4 Solved Exercises [Provisional — Bianco 2025/26]

> **Provenance:** Sourced from Simone Bianco's 2025/26 notes (*Cryptography.pdf*, Ch. 4.7–9) and Katz–Lindell (cross-checked with Laurenti's notes where noted). **Not yet verified against Prof. Venturi's 2026/27 slides or transcripts.**

---

## 1. End of §4.7 — Variable-Input-Length CRHs, Davies–Meyer, ICM, and ROM

*(Continues directly from Lecture 13, which established collision resistance of the plain Merkle–Damgård transform for fixed-input-length (FIL) messages $x \in (\{0,1\}^n)^d$.)*

### 1.1 Why Plain Merkle–Damgård Fails for Variable-Input-Length (VIL) Inputs

In the FIL setting, any two distinct inputs $x, x' \in \{0,1\}^{dn}$ share the same block count $d$, so tracing backward from $H_s(x) = H_s(x')$ locates a last block $i \in [d]$ where $(x_i, y_{i-1}) \neq (x'_i, y'_{i-1})$ collides under $h_s$. Once messages can have different lengths ($d \neq d'$), the chains are no longer aligned from a common starting block. Because collision resistance of $\mathcal{H} = \{h_s : \{0,1\}^{2n} \to \{0,1\}^n\}_{s \in \{0,1\}^\lambda}$ does not prevent a fixed point such as $h_s(0^{2n}) = 0^n$, prepending $0^n$ blocks keeps the chaining state stuck at $y_0 = 0^n$, yielding trivial cross-length collisions:
$$H_s(x) = H_s(0^n \| x) = H_s(0^{2n} \| x) = \cdots.$$

### 1.2 The Strengthened Merkle–Damgård Transform

To prevent collisions across different lengths, we make the block sequence **suffix-free** (no message representation is a suffix of another) by appending a final compression call taking an $n$-bit encoding of the block count $d$.

#### Definition 4.19 (Strengthened Merkle–Damgård Transform)

Let $\mathcal{H} = \{h_s : \{0,1\}^{2n} \to \{0,1\}^n\}_{s \in \{0,1\}^\lambda}$ be a compression-function family. The **strengthened Merkle–Damgård transform** $\mathcal{H}^*_{\mathrm{MD}} = \{H^*_s : \{0,1\}^* \to \{0,1\}^n\}_{s \in \{0,1\}^\lambda}$ on an input partitioned into $d$ blocks $x = (x_1, \dots, x_d)$ with $x_i \in \{0,1\}^n$ and $1 \le d < 2^n$ operates as:
1. Initialize $y_0 = 0^n$.
2. For each $i \in [d]$, compute $y_i = h_s(x_i \| y_{i-1})$.
3. Output $y = h_s(\langle d \rangle \| y_d)$, where $\langle d \rangle \in \{0,1\}^n$ is an injective $n$-bit binary encoding of $d$.

*(For arbitrary bitstrings $m \in \{0,1\}^*$, injective bit-padding such as $10^*$ aligns $m$ to $n$-bit blocks with $|m|$ encoded in the final block; restricting $d < 2^n$ is harmless since $n \ge 128$.)*

#### Theorem 4.9 (Collision Resistance of Strengthened Merkle–Damgård)

If $\mathcal{H} = \{h_s : \{0,1\}^{2n} \to \{0,1\}^n\}_{s \in \{0,1\}^\lambda}$ is collision-resistant, then $\mathcal{H}^*_{\mathrm{MD}}$ is collision-resistant for variable-input-length (VIL) messages (up to $2^n - 1$ blocks).

**Proof.** Given $s \in_R \{0,1\}^\lambda$, suppose a PPT adversary $\mathcal{A}(s)$ outputs distinct $x = (x_1, \dots, x_d)$ and $x' = (x'_1, \dots, x'_{d'})$ ($x \neq x'$) with $H^*_s(x) = H^*_s(x')$, and let $y_0, \dots, y_d$ and $y'_0, \dots, y'_{d'}$ be their intermediate chaining values.
- **Case 1 ($d \neq d'$):** Since $\langle \cdot \rangle$ is injective, $\langle d \rangle \neq \langle d' \rangle$, so $\langle d \rangle \| y_d \neq \langle d' \rangle \| y'_{d'}$ while
  $$h_s(\langle d \rangle \| y_d) = H^*_s(x) = H^*_s(x') = h_s(\langle d' \rangle \| y'_{d'}),$$
  directly yielding a collision for $h_s$.
- **Case 2 ($d = d'$):**
  - If $y_d \neq y'_d$, then $\langle d \rangle \| y_d \neq \langle d \rangle \| y'_d$, so the final call again yields an immediate collision for $h_s$.
  - If $y_d = y'_d$, then the inner plain $d$-block Merkle–Damgård evaluations agree on distinct $d$-block inputs; by the FIL Merkle–Damgård reduction (Proposition 4.4 / Lecture 13), scanning backward locates the largest $i \in [d]$ with $(x_i, y_{i-1}) \neq (x'_i, y'_{i-1})$ and $y_i = y'_i$, yielding a collision $(x_i \| y_{i-1},\; x'_i \| y'_{i-1})$ for $h_s$.

In all cases our reduction extracts a collision for $h_s$ with the same probability that $\mathcal{A}$ succeeds, contradicting the collision resistance of $\mathcal{H}$. $\blacksquare$

### 1.3 Merkle Trees

Instead of chaining linearly, a **Merkle tree** arranges evaluations of $h_s : \{0,1\}^{2n} \to \{0,1\}^n$ in a binary tree: leaves hold message blocks $x_1, \dots, x_d$ (e.g., $d = 2^D$ at depth $D$), and each internal node computes $h_s(\text{left} \| \text{right})$ up to a single $n$-bit root digest. Tracing downward from a root collision to the first node whose two children differ preserves collision resistance (for fixed depth or length-encoded trees), while enabling parallel evaluation across levels and compact $O(\log d)$-sized inclusion proofs (used e.g. in blockchain commitments).

### 1.4 Practical Compression Functions, Davies–Meyer, and the Ideal Cipher Model (ICM)

Real-world hashes (MD5, SHA-1, SHA-2) follow strengthened Merkle–Damgård using fast heuristic compression functions rather than algebraic number-theoretic or lattice constructions. A standard block-cipher-based design is the **Davies–Meyer construction**:
$$h(x_1, x_2) = E_{x_1}(x_2) \oplus x_2,$$
where the message block $x_1$ serves as the key and the chaining value $x_2$ serves as both plaintext and feed-forward mask (preventing trivial inversion even when an attacker picks $x_1$). Crucially, Davies–Meyer *cannot* be proven collision-resistant solely from assuming $E$ is a PRP: modifying $E$ at two points so $E'_{0^n}(0^n) = 0^n$ and $E'_{1^n}(1^n) = 1^n$ preserves PRP security yet produces $h(0^n, 0^n) = 0^n = h(1^n, 1^n)$. Instead, Davies–Meyer is proven collision-resistant in the **Ideal Cipher Model (ICM)**, where $E_K(\cdot)$ is modeled as an independent truly random permutation for each key $K$, accessible solely via forward ($E_K$) and inverse ($E_K^{-1}$) oracle queries.

### 1.5 Hash-Based MACs and the Random Oracle Model (ROM)

Consider the **secret-prefix MAC** $\mathrm{Tag}(K, m) = H(K \| m)$. If $H$ is modeled as a public random oracle, then $H(K \| m)$ is a secure PRF and hence a UFCMA-secure MAC (without querying $K \| m$, the output is uniform and independent of prior tags). However, if $H$ is instantiated via Merkle–Damgård, $\mathrm{Tag}(K, m) = H(K \| m)$ fails to a **length-extension attack**: given $\tau = H(K \| m)$ and $|K \| m|$, an adversary continues the compression chain from state $\tau$ on an extra block $m'$ to forge a valid tag for $m \| \mathrm{pad} \| m'$ without knowing $K$. **HMAC** defeats length-extension via nested double-hashing with inner and outer padded keys:
$$\mathrm{HMAC}(K, m) = H\big((K \oplus \mathrm{opad}) \| H((K \oplus \mathrm{ipad}) \| m)\big).$$

#### Assumption 4.1 (Random Oracle Model — ROM)

In the **Random Oracle Model (ROM)**, a hash function $H : \{0,1\}^* \to \{0,1\}^n$ (or $\{0,1\}^{\ell(n)} \to \{0,1\}^n$) is sampled uniformly at random from all functions with that domain and codomain, and all parties (honest algorithms and adversaries) evaluate $H$ exclusively through oracle queries.

*(Caveat: Davies–Meyer ICM collision resistance—query bound $O(q^2/2^n)$ in Laurenti Theorem 24—and the full security proof of HMAC are stated without proof here.)*

---

## 2. Bianco Chapter 4 Solved Exercises (§4.8) [Provisional — Bianco 2025/26]

### Problem 4.1 *(Cross-Referenced to Part III, Lecture 10)*

The PRF counterexample $F'_K(m) = F_K(0 \parallel m) \parallel F_K(m \parallel 1)$ is covered in **Part III — Lecture 10, Exercise 3 (Candidate 3)**.

### Problem 4.2

Let $F = \{F_K : \{0,1\}^n \to \{0,1\}^n\}_{K \in \{0,1\}^\lambda}$ be a PRF and $G : \{0,1\}^n \to \{0,1\}^{n+1}$ be a PRG, with a single shared key $K \in_R \{0,1\}^\lambda$ fixed at setup. Prove or disprove whether each SKE scheme is CPA-secure:
- **A.** $\Pi_a$: on $m \in \{0,1\}^{n+1}$, sample $r \in_R \{0,1\}^n$ and output $(r, G(r) \oplus m)$.
- **B.** $\Pi_b$: on $m \in \{0,1\}^n$, output $F_K(0^n) \oplus m$.
- **C.** $\Pi_c$: on $m \| \bar{m} \in \{0,1\}^{2n}$ ($m, \bar{m} \in \{0,1\}^n$), sample $r \in_R \{0,1\}^n$ and output $(r, F_K(r) \oplus m, F_K(r+1) \oplus \bar{m})$ (addition mod $2^n$).

**Solution.**
- **A ($\Pi_a$ is not CPA-secure):** $\Pi_a$ does not use $K$ and is not even one-time secure. Given challenge $c^* = (r^*, w^*)$ for distinct $m_0^* \neq m_1^*$, $\mathcal{A}$ computes $G(r^*) \oplus w^* = m_b^*$ locally and outputs $0$ iff $w^* = G(r^*) \oplus m_0^*$, winning with advantage $1$.
- **B ($\Pi_b$ is not CPA-secure):** $\Pi_b$ is deterministic. $\mathcal{A}$ queries one message $m \in \{0,1\}^n$ to get $c = F_K(0^n) \oplus m$, recovers the fixed pad $\gamma = c \oplus m = F_K(0^n)$, submits distinct $m_0^* \neq m_1^*$, and outputs $0$ iff $c^* = m_0^* \oplus \gamma$, winning with advantage $1$.
- **C ($\Pi_c$ is CPA-secure):** $\Pi_c$ is CTR mode using PRF $F$ on fixed 2-block messages ($d = 2$). By Theorem 4.2 (Lecture 10), replacing $F_K$ with a random function $R \in_R R(n \to n)$ yields an indistinguishable hybrid, and across $q = \mathrm{poly}(\lambda)$ queries the challenge counter window $\{r^*, r^*+1\}$ overlaps any query window $\{r^{(i)}, r^{(i)}+1\}$ with probability at most $3q/2^n = \mathrm{negl}(\lambda)$. $\blacksquare$

### Problem 4.3

Let $\Pi = (\mathrm{Enc}, \mathrm{Dec})$ be an SKE scheme with $\mathcal{K} = \{0,1\}^\lambda \subseteq \mathcal{M}$. Formally define **circular security** (CPA-security given $\mathrm{Enc}(K, K)$ upfront), and prove or disprove: *CPA-security implies circular security.*

**Solution.**
- **Formal definition:** Define $\mathrm{Game}^{\mathrm{CIRC}}_{\Pi, \mathcal{A}}(\lambda, b)$ identically to $\mathrm{Game}^{\mathrm{CPA}}_{\Pi, \mathcal{A}}(\lambda, b)$ except that after sampling $K \in_R \mathcal{K}$, the challenger immediately computes $c_0 \leftarrow \mathrm{Enc}(K, K)$ and sends $c_0$ to $\mathcal{A}$ before any oracle queries. $\Pi$ is **circularly secure** if $\mathrm{Game}^{\mathrm{CIRC}}_{\Pi, \mathcal{A}}(\lambda, 0) \approx_c \mathrm{Game}^{\mathrm{CIRC}}_{\Pi, \mathcal{A}}(\lambda, 1)$ for all PPT $\mathcal{A}$.
- **Disproof ($\mathrm{CPA} \not\implies \mathrm{CIRC}$):** Let $\Pi' = (\mathrm{Enc}', \mathrm{Dec}')$ be any CPA-secure SKE scheme over $\mathcal{K} = \{0,1\}^\lambda \subseteq \mathcal{M}$. Define $\Pi = (\mathrm{Enc}, \mathrm{Dec})$ with a 1-bit tag:
  $$\mathrm{Enc}(K, m) = \begin{cases} 0 \| K & \text{if } m = K, \\ 1 \| \mathrm{Enc}'(K, m) & \text{if } m \neq K, \end{cases} \qquad \mathrm{Dec}(K, b \| c) = \begin{cases} c & \text{if } b = 0, \\ \mathrm{Dec}'(K, c) & \text{if } b = 1. \end{cases}$$
  Correctness holds unconditionally.
  1. **Not circularly secure:** In $\mathrm{Game}^{\mathrm{CIRC}}$, $\mathcal{A}$ receives $c_0 = \mathrm{Enc}(K, K) = 0 \| K$, reads $K$, submits distinct $m_0^* \neq m_1^*$, and decrypts $c^*$ with $K$ to win with probability $1$.
  2. **Still CPA-secure:** For any PPT $\mathcal{A}$ making $q = \mathrm{poly}(\lambda)$ encryption queries $m_1, \dots, m_q$ and challenge $(m_0^*, m_1^*)$, compare $\mathrm{Game}^{\mathrm{CPA}}_{\Pi, \mathcal{A}}(\lambda, b)$ with a modified game $\widetilde{G}_b$ answering every query (including the challenge) with $1 \| \mathrm{Enc}'(K, m)$. Let $B$ be the bad event that $K \in \{m_1, \dots, m_q, m_0^*, m_1^*\}$.
     - Conditioned on $\neg B$, $\mathrm{Game}^{\mathrm{CPA}}_{\Pi, \mathcal{A}}(\lambda, b)$ and $\widetilde{G}_b$ are identical, so the distinguishing advantage between them is at most $\Pr[B]$.
     - Moreover, $\Pr[B] \le \mathrm{negl}(\lambda)$ by CPA-security of $\Pi'$: up to the first query hitting $K$, $\mathcal{A}$'s view uses only $\mathrm{Enc}'(K, \cdot)$-ciphertexts; if $\Pr[B]$ were non-negligible, a PPT reduction against $\Pi'$ could simulate $\widetilde{G}_b$, guess a random index among the $q+2$ queried messages as a candidate key $K'$, and test $K'$ on a fresh $\Pi'$-challenge of $(0^\lambda, 1^\lambda)$ to break $\Pi'$.
     - Finally, $\widetilde{G}_0 \approx_c \widetilde{G}_1$ follows directly by reducing to the CPA-security of $\Pi'$ (prepending `1` to each ciphertext). Thus $\mathrm{Game}^{\mathrm{CPA}}_{\Pi, \mathcal{A}}(\lambda, 0) \approx_c \widetilde{G}_0 \approx_c \widetilde{G}_1 \approx_c \mathrm{Game}^{\mathrm{CPA}}_{\Pi, \mathcal{A}}(\lambda, 1)$. $\blacksquare$

### Problem 4.4

Given a PRP $P : \mathcal{K} \times X \to X$ and an efficiently decidable subset $X' \subseteq X$, construct $P' : \mathcal{K} \times X' \to X'$ by **cycle-walking**:
1. Set $y = P(K, x)$.
2. While $y \notin X'$, set $y = P(K, y)$.
3. Output $y$. (Inversion applies $P^{-1}(K, \cdot)$ repeatedly until landing in $X'$.)

Let $t = |X| / |X'|$.
1. Compute the expected number of evaluations of $P$ needed to evaluate $P'(K, x)$ under a random permutation, and state when $P'$ is efficient.
2. Using induction on $|X| - |X'|$, prove that if $P$ is a PRP on $X$ (with $t = \mathrm{poly}(\log |X|)$), then $P'$ is a PRP on $X'$.

**Solution.**
- **Part 1 (Expected evaluations and efficiency):** Replace $P(K, \cdot)$ with a uniformly random permutation $\pi \in_R \mathrm{Perm}(X)$ of size $N = |X|$, with $M = |X'|$ and $t = N/M$. Let $I$ be the number of steps from a fixed $x \in X'$ until the walk first lands in $X'$. For $0 \le k \le N - M$, $I > k$ holds iff $\pi(x), \pi^2(x), \dots, \pi^k(x)$ all lie in $X \setminus X'$. Because $\pi$ is a bijection and $x \in X'$, these $k$ values are distinct and never hit $x$. Sampling without replacement gives
  $$\Pr[I > k] = \prod_{j=1}^k \frac{N - M - j + 1}{N - j + 1} = \frac{\binom{N-M}{k}}{\binom{N}{k}} = \frac{\binom{N-k}{M}}{\binom{N}{M}}.$$
  Summing via the hockey-stick identity gives the exact expectation
  $$\mathbb{E}[I] = \sum_{k=0}^{N-M} \Pr[I > k] = \frac{1}{\binom{N}{M}} \sum_{k=0}^{N-M} \binom{N-k}{M} = \frac{\binom{N+1}{M+1}}{\binom{N}{M}} = \frac{|X| + 1}{|X'| + 1} \le t.$$
  Since $P_K \approx_c \pi$, $P'_K$ is efficient (expected polynomial time, exceeding $k = \omega(t \log |X|)$ steps with negligible probability $\le (1 - 1/t)^k$) whenever $t \le \mathrm{poly}(n)$ for $n = \log_2 |X|$.
- **Part 2 (Proof that $P'$ is a PRP on $X'$):** Because $|X| - |X'|$ may be exponential, separate the computational reduction from the exact combinatorial induction:
  1. *Computational step ($P'_K \approx_c \pi'$):* Let $\pi \in_R \mathrm{Perm}(X)$ and let $\pi'$ be the cycle-walking permutation induced by $\pi$ on $X'$. Given a PPT distinguisher $D'$ between $P'_K$ and $\pi'$ making $q = \mathrm{poly}(n)$ queries, a PPT distinguisher $D$ for $P_K$ vs. $\pi$ simulates each query of $D'$ by iterating its oracle $\mathcal{O} \in \{P_K, \pi\}$ up to $L = n \lceil t \rceil$ steps (aborting and outputting $0$ if $X'$ is not reached within $L$ steps). Under $\pi$, each query exceeds $L$ steps w.p. $\le (1 - 1/t)^L \le e^{-n}$, so $D$ aborts in the $\pi$-world w.p. $\le q e^{-n} = \mathrm{negl}(n)$ (and if $P_K$ aborted non-negligibly, the abort event itself would distinguish $P_K$ from $\pi$). Hence $D$ preserves $D'$'s advantage up to negligible error, proving $P'_K \approx_c \pi'$.
  2. *Exact distribution by induction on $|X| - |X'|$:* We show $\pi'$ is uniformly distributed over $\mathrm{Perm}(X')$. Base case $|X| - |X'| = 0$ ($X' = X$) is immediate. For $|X| - |X'| > 0$, pick $\hat{x} \in X \setminus X'$ and set $\hat{X} = X' \cup \{\hat{x}\}$. By the inductive hypothesis, the induced permutation $\hat{\pi}$ on $\hat{X}$ is uniform over $\mathrm{Perm}(\hat{X})$. For every $x \in X'$, cycle-walking yields $\pi'(x) = \hat{\pi}(x)$ if $\hat{\pi}(x) \neq \hat{x}$, and $\pi'(x) = \hat{\pi}(\hat{x})$ if $\hat{\pi}(x) = \hat{x}$. Fix any target $\sigma \in \mathrm{Perm}(X')$. Which $\hat{\pi} \in \mathrm{Perm}(\hat{X})$ induce $\sigma$?
     - Either $\hat{\pi}(\hat{x}) = \hat{x}$ and $\hat{\pi}|_{X'} = \sigma$ ($1$ choice),
     - Or there is a unique $a \in X'$ such that $\hat{\pi}(a) = \hat{x}$, $\hat{\pi}(\hat{x}) = \sigma(a)$, and $\hat{\pi}(z) = \sigma(z)$ for all $z \in X' \setminus \{a\}$ ($|X'|$ choices).
     Every $\sigma \in \mathrm{Perm}(X')$ thus has exactly $1 + |X'| = |\hat{X}|$ preimages $\hat{\pi} \in \mathrm{Perm}(\hat{X})$, so $\pi'$ is uniformly distributed over $\mathrm{Perm}(X')$. $\blacksquare$

### Problem 4.5

In $\mathrm{Game}^{\$\mathrm{CPA}}_{\Pi, \mathcal{A}}(\lambda, b)$ over ciphertext space $\mathcal{C}$, each encryption query $m_i$ ($i \in [q]$) returns $\mathrm{Enc}(K, m_i)$ if $b=0$ and $c_i \in_R \mathcal{C}$ if $b=1$. Prove or disprove: *CPA-security is equivalent to $\$\mathrm{CPA}$-security.*

**Solution.** **Not equivalent.** ($\$\mathrm{CPA} \implies \mathrm{CPA}$ because ciphertexts are indistinguishable from uniform strings independent of the plaintext, whereas $\mathrm{CPA} \not\implies \$\mathrm{CPA}$.) Let $\Pi' = (\mathrm{Enc}', \mathrm{Dec}')$ be any CPA-secure SKE over $\mathcal{C}'$. Define $\Pi$ over $\mathcal{C} = \{0,1\} \times \mathcal{C}'$ by
$$\mathrm{Enc}(K, m) = 0 \| \mathrm{Enc}'(K, m), \qquad \mathrm{Dec}(K, c_0 \| c_1) = \begin{cases} \mathrm{Dec}'(K, c_1) & \text{if } c_0 = 0, \\ \perp & \text{if } c_0 = 1. \end{cases}$$
- **$\Pi$ is CPA-secure:** Any CPA adversary $\mathcal{A}$ against $\Pi$ is simulated exactly by a reduction against $\Pi'$ that forwards every encryption query $m_i$ and challenge $(m_0^*, m_1^*)$ to $\Pi'$'s challenger and prepends `0` to every returned ciphertext.
- **$\Pi$ is not $\$\mathrm{CPA}$-secure:** A PPT adversary makes one encryption query $m_1$, receives $c_1 = b_1 \| \tilde{c}_1$, and outputs $b_1$. When $b = 0$, $b_1 = 0$ always ($\Pr[\mathcal{A} = 1 \mid b = 0] = 0$); when $b = 1$, $b_1 = 1$ w.p. $1/2$ ($\Pr[\mathcal{A} = 1 \mid b = 1] = 1/2$), yielding advantage $1/2$. $\blacksquare$

### Problem 4.6

Formally define **semantic security for random messages (SSRM)**, where the challenger chooses $m_0, m_1 \in_R \mathcal{M}$.
1. Assuming $\mathcal{M} = \{0,1\}^\ell$, build an ordinary one-time secure SKE $\Pi^*$ (same $\mathcal{K}, \mathcal{M}$) from any SSRM-secure $\Pi$.
2. Assuming $|\mathcal{M}| = 2^\ell$ is super-polynomial in $\lambda$, construct an SSRM-secure SKE that is not one-time secure.

**Solution.**
- **Definition (SSRM):** In $\mathrm{Game}^{\mathrm{SSRM}}_{\Pi, \mathcal{A}}(\lambda, b)$, the challenger samples $K \in_R \mathcal{K}$ and independent $m_0^*, m_1^* \in_R \mathcal{M}$, computes $c^* \leftarrow \mathrm{Enc}(K, m_b^*)$, and sends $(m_0^*, m_1^*, c^*)$ to $\mathcal{A}$, who outputs $b' \in \{0,1\}$. $\Pi$ is **SSRM-secure** if $\mathrm{Game}^{\mathrm{SSRM}}_{\Pi, \mathcal{A}}(\lambda, 0) \approx_c \mathrm{Game}^{\mathrm{SSRM}}_{\Pi, \mathcal{A}}(\lambda, 1)$ for all PPT $\mathcal{A}$.
- **Part 1 (One-time security from SSRM):** Define $\Pi^*$ over $\mathcal{M} = \{0,1\}^\ell$ by
  $$\mathrm{Enc}^*(K, m) = \big(\mathrm{Enc}(K, r),\; m \oplus r\big) \;\;(r \in_R \{0,1\}^\ell), \qquad \mathrm{Dec}^*(K, (c_0, c_1)) = c_1 \oplus \mathrm{Dec}(K, c_0).$$
  Let $\mathrm{Hyb}(\lambda)$ be the game returning $(\mathrm{Enc}(K, r), u)$ for independent $r, u \in_R \{0,1\}^\ell$ (independent of $\beta$). Fix $\beta \in \{0,1\}$; given a distinguisher $\mathcal{A}^*$ between $\mathrm{Game}^{\text{1-time}}_{\Pi^*, \mathcal{A}^*}(\lambda, \beta)$ and $\mathrm{Hyb}(\lambda)$, an SSRM adversary $\mathcal{B}_\beta$ against $\Pi$:
  1. Receives $(r_0, r_1, c^*)$ from $\Pi$'s SSRM challenger (with $c^* \leftarrow \mathrm{Enc}(K, r_b)$).
  2. Runs $\mathcal{A}^*$ to obtain $(m_0^*, m_1^*)$, sends $(c^*, m_\beta^* \oplus r_0)$ to $\mathcal{A}^*$, and outputs $\mathcal{A}^*$'s guess.
  When $b = 0$ ($c^* \leftarrow \mathrm{Enc}(K, r_0)$), $(c^*, m_\beta^* \oplus r_0)$ has the exact distribution of $\mathrm{Game}^{\text{1-time}}_{\Pi^*, \mathcal{A}^*}(\lambda, \beta)$; when $b = 1$ ($c^* \leftarrow \mathrm{Enc}(K, r_1)$), $r_0$ is independent of $(K, r_1, c^*, m_0^*, m_1^*)$, so $m_\beta^* \oplus r_0$ is uniform and independent, matching $\mathrm{Hyb}(\lambda)$ identically. By SSRM of $\Pi$ for $\beta = 0, 1$, $\mathrm{Game}^{\text{1-time}}_{\Pi^*, \mathcal{A}^*}(\lambda, 0) \approx_c \mathrm{Hyb}(\lambda) \approx_c \mathrm{Game}^{\text{1-time}}_{\Pi^*, \mathcal{A}^*}(\lambda, 1)$.
- **Part 2 (SSRM $\not\implies$ ordinary one-time security):** Assume $2^{-\ell} = \mathrm{negl}(\lambda)$, and let $\Pi' = (\mathrm{Enc}', \mathrm{Dec}')$ be any one-time secure (hence SSRM-secure) SKE over $\mathcal{K}, \mathcal{M} = \{0,1\}^\ell$. Define
  $$\mathrm{Enc}(K, m) = \begin{cases} 0 \| K & \text{if } m = 0^\ell, \\ 1 \| \mathrm{Enc}'(K, m) & \text{otherwise}, \end{cases} \qquad \mathrm{Dec}(K, b \| c) = \begin{cases} 0^\ell & \text{if } b = 0, \\ \mathrm{Dec}'(K, c) & \text{if } b = 1. \end{cases}$$
  - *Not one-time secure:* Choosing $m_0^* = 0^\ell \neq m_1^*$ distinguishes $b=0$ from $b=1$ with advantage $1$ via the leading bit.
  - *SSRM-secure:* The bad event $E = \{m_0^* = 0^\ell \lor m_1^* = 0^\ell\}$ has $\Pr[E] \le 2/2^\ell = \mathrm{negl}(\lambda)$. Conditioned on $\neg E$, the ciphertext is $1 \| \mathrm{Enc}'(K, m_b^*)$, which is indistinguishable between $b=0$ and $b=1$ by one-time security of $\Pi'$. $\blacksquare$

---

## 3. Chapter 5 — Number Theory in Cryptography [Provisional — Bianco 2025/26]

### 5.1 Brush-Up on Number Theory

Recall the three basic algebraic structures over $\mathbb{Z}_n = \{0, \dots, n-1\}$ ($n \ge 1$):
- **Group $(G, \circ)$:** closed, associative binary operation with identity and inverses for every element (e.g., $(\mathbb{Z}_n, +)$ and $(\mathbb{Z}_n^*, \cdot)$, whereas $(\mathbb{Z}_n, \cdot)$ is not a group when $n > 1$ since non-coprime elements like $0$ lack inverses).
- **Ring $(R, +, \cdot)$:** $(R, +)$ is an abelian group, and $\cdot$ is associative, has identity $1$, and distributes over $+$ (e.g., $(\mathbb{Z}_n, +, \cdot)$).
- **Field $(\mathbb{F}, +, \cdot)$:** commutative ring where $(\mathbb{F} \setminus \{0\}, \cdot)$ is also an abelian group (e.g., $\mathbb{Z}_p$ for prime $p \in \mathbb{P}$).

We write $a \equiv b \pmod n$ when $n \mid (a - b)$, and $a \bmod n \in \{0, \dots, n-1\}$ for the remainder. Let $\mathbb{Z}_n^* = \{a \in \mathbb{Z}_n \mid \exists b \in \mathbb{Z}_n,\; ab \equiv 1 \pmod n\}$.

#### Proposition 5.1 (Characterization of $\mathbb{Z}_n^*$)

For every $a \in \mathbb{Z}_n$ ($n \ge 2$), $a \in \mathbb{Z}_n^*$ iff $\gcd(a, n) = 1$.

**Proof.** Let $d = \gcd(a, n)$. If $ab \equiv 1 \pmod n$, then $ab - kn = 1$ for some $k \in \mathbb{Z}$, so $d \mid 1 \implies d = 1$. Conversely, if $d = 1$, Bézout's identity yields $k_1, k_2 \in \mathbb{Z}$ with $k_1 a + k_2 n = 1$, so $(k_1 \bmod n) \in \mathbb{Z}_n$ is $a^{-1} \bmod n$. $\blacksquare$

Hence $|\mathbb{Z}_n^*| = \varphi(n)$ (**Euler's totient function**), with $\varphi(p) = p - 1$ for prime $p$ and $\varphi(pq) = (p-1)(q-1)$ for distinct primes $p, q$ (via CRT: $\mathbb{Z}_{pq}^* \cong \mathbb{Z}_p^* \times \mathbb{Z}_q^*$).

#### Lemma 5.1 & Algorithm 5.1 (Euclidean Algorithm and Modular Inversion)

**Lemma 5.1:** For integers $a \ge b > 0$, $\gcd(a, b) = \gcd(b, a \bmod b)$ (writing $a = qb + x$ shows that common divisors of $a, b$ are identical to common divisors of $b, x$).

**Algorithm 5.1 (Euclidean Algorithm):** Given $0 < a \le b$, set $r_0 := b, r_1 := a, i := 1$; while $r_i \neq 0$, compute $r_{i-1} = r_i q_i + r_{i+1}$ with $r_{i+1} = r_{i-1} \bmod r_i$ and increment $i$; return $r_{i-1}$. Because $r_{i+2} < r_i / 2$, termination takes $O(|a| + |b|)$ divisions (bit-complexity $O((|a|+|b|)^2)$).

*Example $(14, 10)$ & Extended Euclidean Algorithm:*
1. $14 = 10 \cdot 1 + 4$ ($q_1 = 1, r_2 = 4$); $10 = 4 \cdot 2 + 2$ ($q_2 = 2, r_3 = 2$); $4 = 2 \cdot 2 + 0$ ($r_4 = 0 \implies \gcd = 2$).
2. Back-substituting: $2 = r_1 - 2r_2 = r_1 - 2(r_0 - r_1) = (-2)\cdot 14 + 3\cdot 10 = -28 + 30$.
When $\gcd(a, n) = 1$, back-substitution on $(a, n)$ yields $ka + hn = 1$, giving $a^{-1} \equiv k \bmod n$.

#### Modular Exponentiation (Square-and-Multiply)

For $a \in \mathbb{Z}_n$ and $b = \sum_{i=0}^t b_i 2^i$ ($t = \lfloor \log_2 b \rfloor$), repeated squaring computes $a^b \equiv \prod_{i=0}^t (a^{2^i})^{b_i} \pmod n$ using $t$ squarings and at most $t$ multiplications ($\le 2t$ modular multiplications), running in $\mathrm{poly}(|b|, |n|)$ time.

#### Prime Generation and Primality Testing

By the **Prime Number Theorem**, $\pi(x) \sim x / \ln x$ and $\pi(x) \ge \frac{x}{3\log_2 x}$ for large $x$. Thus a uniform integer in $[1, 2^\lambda - 1]$ (or $[2^{\lambda-1}, 2^\lambda - 1]$) is prime w.p. $\ge \frac{1}{3\lambda}$; testing $3\lambda^2$ independent candidates fails w.p. $\le (1 - \frac{1}{3\lambda})^{3\lambda^2} \le e^{-\lambda} = \mathrm{negl}(\lambda)$.
- **Fermat's Little Theorem:** For prime $p$ and $a \not\equiv 0 \pmod p$, $a^{p-1} \equiv 1 \pmod p$.
- **Euler's Theorem:** For $n \ge 1$ and $a \in \mathbb{Z}_n^*$, $a^{\varphi(n)} \equiv 1 \pmod n$, hence $a^b \equiv a^{b \bmod \varphi(n)} \pmod n$.

The naive Fermat test ($a^{n-1} \stackrel{?}{\equiv} 1 \pmod n$) is fooled by **Fermat liars** and **Carmichael numbers** (e.g., $561 = 3 \cdot 11 \cdot 17$), composite $n$ passing for every $a \in \mathbb{Z}_n^*$. Instead, **Miller–Rabin (1980)** writes $n - 1 = 2^s u$ ($u$ odd) and tests square roots of $1 \pmod n$ across $t$ random bases in PPT (rejecting every composite w.p. $\ge 3/4$ per round, error $\le 4^{-t}$), while **AKS (2002)** decides primality deterministically in polynomial time via $(X+a)^n \equiv X^n + a \pmod{X^r - 1, n}$.

---

### 5.2 The DL, CDH, and DDH Assumptions

Let $\mathrm{GroupGen}(1^\lambda)$ be a PPT algorithm outputting $(G, g, q)$ where $G = \langle g \rangle$ is a cyclic group of order $q$ ($|q| \ge \lambda$, typically prime) with efficient group operations and uniform sampling in $\mathbb{Z}_q$.

- **Assumption 5.1 (Discrete Logarithm — DL):** For all PPT $\mathcal{A}$,
  $$\Pr\big[\mathcal{A}(1^\lambda, G, g, q, g^x) = x \;:\; (G, g, q) \leftarrow \mathrm{GroupGen}(1^\lambda),\; x \in_R \mathbb{Z}_q\big] \le \mathrm{negl}(\lambda).$$
  *(For $G = \mathbb{Z}_p^*$, $q = p-1$ and $x \in_R \mathbb{Z}_{p-1}$. DL immediately makes $f(x) = g^x$ a OWF.)*
- **Algorithm 5.2 (Diffie–Hellman Key Exchange):** Given public $(G, g, q) \leftarrow \mathrm{GroupGen}(1^\lambda)$, Alice samples $x \in_R \mathbb{Z}_q$ and sends $X = g^x$; Bob samples $y \in_R \mathbb{Z}_q$ and sends $Y = g^y$; both derive the shared key $K = Y^x = X^y = g^{xy}$.
- **Assumption 5.2 (Computational Diffie–Hellman — CDH):** For all PPT $\mathcal{A}$,
  $$\Pr\big[\mathcal{A}(1^\lambda, G, g, q, g^x, g^y) = g^{xy} \;:\; (G, g, q) \leftarrow \mathrm{GroupGen}(1^\lambda),\; x, y \in_R \mathbb{Z}_q\big] \le \mathrm{negl}(\lambda).$$
- **Assumption 5.3 (Decisional Diffie–Hellman — DDH):** For $(G, g, q) \leftarrow \mathrm{GroupGen}(1^\lambda)$ and $x, y, z \in_R \mathbb{Z}_q$,
  $$\big\{(G, g, q, g^x, g^y, g^{xy})\big\} \approx_c \big\{(G, g, q, g^x, g^y, g^z)\big\}.$$

**Hierarchy:** $\mathrm{DDH} \implies \mathrm{CDH} \implies \mathrm{DL} \implies \mathrm{OWF}$. (Solving DL recovers $x$ and computes $(g^y)^x = g^{xy}$; solving CDH lets one test $Z \stackrel{?}{=} g^{xy}$. Neither converse holds in general.)

#### Proposition 5.2 (DDH Does Not Hold in $\mathbb{Z}_p^*$)

For odd primes $p > 2$, DDH fails in $G = \mathbb{Z}_p^* = \langle g \rangle$.

**Proof.** Define the quadratic-residue subgroup $\mathrm{QR}_p = \{y \in \mathbb{Z}_p^* \mid \exists k \in \mathbb{Z},\; y \equiv g^{2k} \pmod p\}$. By **Euler's Criterion**, $y \in \mathrm{QR}_p \iff y^{(p-1)/2} \equiv 1 \pmod p$: if $y \equiv g^{2k}$ then $(g^{2k})^{(p-1)/2} \equiv 1$, whereas if $y \equiv g^{2k'+1}$ then $(g^{2k'+1})^{(p-1)/2} \equiv g^{(p-1)/2} \equiv -1 \not\equiv 1 \pmod p$ (since $o(g) = p-1$). A PPT distinguisher $\mathcal{A}(p, g, X, Y, Z)$ outputs $1$ iff $Z^{(p-1)/2} \equiv 1 \pmod p$:
- For $Z = g^z$ ($z \in_R \mathbb{Z}_{p-1}$), $z$ is even w.p. $1/2$, so $\Pr[\mathcal{A} = 1] = 1/2$.
- For $Z = g^{xy}$ ($x, y \in_R \mathbb{Z}_{p-1}$), $xy$ is even iff $x$ or $y$ is even, so $\Pr[\mathcal{A} = 1] = 1 - \frac{1}{2}\cdot\frac{1}{2} = \frac{3}{4}$.
Hence $\mathcal{A}$ distinguishes with advantage $1/4$ (or $1/2$ by checking compatibility of $X^{(p-1)/2}, Y^{(p-1)/2}, Z^{(p-1)/2}$). $\blacksquare$

**DDH-friendly groups:** (1) $\mathrm{QR}_p$ for a **safe prime** $p = 2q + 1$ ($q$ Sophie Germain prime), which has prime order $q$ and eliminates nontrivial subgroups; (2) prime-order elliptic curve groups $y^2 \equiv x^3 + ax + b \pmod p$ (with point at infinity $\mathcal{O}$). Note that unauthenticated DH remains vulnerable to active **Man-in-the-Middle** attacks (Eve intercepts $X, Y$ and substitutes $X' = g^{x'}, Y' = g^{y'}$ to share $K_{AE} = g^{xy'}$ and $K_{EB} = g^{x'y}$), requiring MACs or digital signatures + PKI.

---

### 5.3 Building Cryptographic Tools Through Number Theory

While $\mathrm{OWF} \to \mathrm{PRG} \to \mathrm{PRF} \to \mathrm{PRP}$ cannot yield CRHs in a black-box manner (Impagliazzo–Rudich separation), DDH/DL yield all of them algebraically: $\mathrm{DDH} \implies \mathrm{CDH} \implies \mathrm{DL} \implies \mathrm{CRH}$.

1. **Direct PRG from DDH:** Define $G_{G,g,q} : \mathbb{Z}_q^2 \to G^3$ by $G_{G,g,q}(x, y) = (g^x, g^y, g^{xy})$, and polynomial-stretch $G^t_{G,g,q} : \mathbb{Z}_q^{t+1} \to G^{2t+1}$ by $(g^x, g^{y_1}, g^{xy_1}, \dots, g^{y_t}, g^{xy_t})$. Under DDH (with uniform bit-encoding of $G$), this is pseudorandom.
2. **Direct PRF from DDH (Naor–Reingold):** Mirroring the GGM tree algebraically with key $\vec{a} = (a_0, a_1, \dots, a_n) \in_R \mathbb{Z}_q^{n+1}$, define $F_{\vec{a}} : \{0,1\}^n \to G$ by
   $$F_{\vec{a}}(x_1, \dots, x_n) = g^{a_0 \prod_{i=1}^n a_i^{x_i}}.$$
   Starting from $g^{a_0}$ at the root, level $i$ maps state $h \in G$ to $(h, h^{a_i})$ depending on bit $x_i$. Under **DDH**, $((g^{b_1}, g^{a_i b_1}), \dots, (g^{b_t}, g^{a_i b_t}))$ is indistinguishable from uniform pairs in $G^2$, so level-wise induction proves $F_{\vec{a}}$ is a PRF. *(This relies strictly on DDH, not DL: in pairing groups where DDH is easy, $\hat{e}(F_{\vec{a}}(00), F_{\vec{a}}(11)) = \hat{e}(F_{\vec{a}}(01), F_{\vec{a}}(10))$ breaks pseudorandomness.)*
3. **Direct CRH from DL:** For prime-order $(G, g, q)$ and public seed $(g_1, g_2) \in_R G^2$, define $H_{g_1, g_2} : \mathbb{Z}_q^2 \to G$ by $H_{g_1, g_2}(x_1, x_2) = g_1^{x_1} g_2^{x_2}$.

**Theorem (CRH from DL):** Under the DL assumption for prime-order $(G, g, q)$, $\{H_{g_1, g_2}\}$ is collision-resistant.

**Proof.** Suppose $\mathcal{A}_{\mathrm{CRH}}$ finds a collision w.p. $\varepsilon(\lambda)$. Given DL challenge $(G, g, q, y = g^\alpha)$, $\mathcal{A}_{\mathrm{DL}}$ samples $i \in_R \{1,2\}$ and $b \in_R \mathbb{Z}_q$, sets $g_i = y$ and $g_j = g^b$ ($j \neq i$), and runs $\mathcal{A}_{\mathrm{CRH}}(g_1, g_2)$ to obtain $(x_1, x_2), (x'_1, x'_2)$. Since $y$ and $g^b$ are uniform in $G$, $(g_1, g_2) \sim U_{G^2}$ is independent of $i$. Whenever $\mathcal{A}_{\mathrm{CRH}}$ outputs a valid collision $(x_1, x_2) \neq (x'_1, x'_2)$, at least one coordinate differs mod $q$, so $x_i \not\equiv x'_i \pmod q$ holds w.p. $\ge 1/2$. Since $q$ is prime, $(x_i - x'_i)^{-1} \bmod q$ exists and
$$g_1^{x_1} g_2^{x_2} = g_1^{x'_1} g_2^{x'_2} \implies y^{x_i - x'_i} = g^{b(x'_j - x_j)} \implies \alpha = b(x'_j - x_j)(x_i - x'_i)^{-1} \bmod q,$$
solving DL w.p. $\ge \frac{1}{2}\varepsilon(\lambda)$. $\blacksquare$

---

### 5.4 Solved Exercises (Bianco Ch. 5) [Provisional — Bianco 2025/26]

#### Problem 5.1

Let $G = \langle g \rangle$ have prime order $q$, and $n = \mathrm{poly}(\lambda)$. For $g_1, \dots, g_n \in_R G$, prove that $H_{g_1, \dots, g_n} : \mathbb{Z}_q^n \to G$ defined by $H_{g_1, \dots, g_n}(x_1, \dots, x_n) = \prod_{k=1}^n g_k^{x_k}$ is collision-resistant under the DL assumption for $G$.

**Proof.** Suppose $\mathcal{A}_{\mathrm{CRH}}$ finds a collision w.p. $\ge \lambda^{-c}$. Build a PPT DL solver $\mathcal{A}_{\mathrm{DL}}(G, g, q, y = g^\alpha)$:
1. Sample $i \in_R [n]$ and set $g_i = y$; for each $j \in [n] \setminus \{i\}$, sample $r_j \in_R \mathbb{Z}_q$ and set $g_j = g^{r_j}$.
2. Run $\mathcal{A}_{\mathrm{CRH}}(g_1, \dots, g_n)$ to obtain $(x_1, \dots, x_n)$ and $(x'_1, \dots, x'_n)$.
3. If $(x_1, \dots, x_n) \neq (x'_1, \dots, x'_n)$, $H(x_1, \dots, x_n) = H(x'_1, \dots, x'_n)$, and $x_i \not\equiv x'_i \pmod q$, output
   $$\alpha' = (x_i - x'_i)^{-1} \sum_{\substack{j=1 \\ j \neq i}}^n r_j(x'_j - x_j) \pmod q;$$
   otherwise abort.

Because $(g_1, \dots, g_n) \sim U_{G^n}$ is independent of $i$, whenever $\mathcal{A}_{\mathrm{CRH}}$ returns a valid collision we have $x_i \not\equiv x'_i \pmod q$ w.p. $\ge 1/n$. Since $q$ is prime, $(x_i - x'_i)^{-1} \bmod q$ exists and
$$y^{x_i - x'_i} = \prod_{j \neq i} g_j^{x'_j - x_j} = g^{\sum_{j \neq i} r_j(x'_j - x_j)} \implies \alpha' = \log_g y,$$
so $\mathcal{A}_{\mathrm{DL}}$ succeeds w.p. $\ge \frac{1}{n\lambda^c}$, contradicting the DL assumption (since $n = \mathrm{poly}(\lambda)$). $\blacksquare$

---

## 4. Chapter 6 — Public-Key Encryption and Digital Signatures [Provisional — Bianco 2025/26]

### 6.1 The Asymmetric-Key Paradigm

Unlike symmetric-key encryption, **Public-Key Encryption (PKE)** separates keys into a public encryption key $pk$ and a secret decryption key $sk$.

#### Definition 6.1 (Public-Key Encryption Scheme)

A **PKE scheme** is a tuple of PPT algorithms $\Pi = (\mathrm{KGen}, \mathrm{Enc}, \mathrm{Dec})$:
- $\mathrm{KGen}(1^\lambda) \to (pk, sk) \in \mathcal{K}_{\mathrm{pub}} \times \mathcal{K}_{\mathrm{sec}}$,
- $\mathrm{Enc}(pk, m) \to c \in \mathcal{C}$ (randomized), for $m \in \mathcal{M}$,
- $\mathrm{Dec}(sk, c) \to m \in \mathcal{M} \cup \{\perp\}$,

satisfying **correctness**: $\Pr[\mathrm{Dec}(sk, \mathrm{Enc}(pk, m)) = m] = 1$ (or $\ge 1 - \mathrm{negl}(\lambda)$) for all $(pk, sk) \leftarrow \mathrm{KGen}(1^\lambda)$ and $m \in \mathcal{M}$.

#### CPA and CCA Security for PKE

Because $pk$ is given to $\mathcal{A}$ upfront, $\mathcal{A}$ can compute $\mathrm{Enc}(pk, \cdot)$ locally, so an encryption oracle is unnecessary and $\mathrm{Enc}$ **must** be randomized (deterministic PKE fails CPA immediately by encrypting $m_0^*, m_1^*$ directly).
- **$\mathrm{Game}^{\mathrm{CPA}}_{\Pi, \mathcal{A}}(\lambda, b)$:**
  1. Challenger samples $(pk, sk) \leftarrow \mathrm{KGen}(1^\lambda)$ and sends $pk$ to $\mathcal{A}$.
  2. $\mathcal{A}$ chooses $m_0^*, m_1^* \in \mathcal{M}$ ($|m_0^*| = |m_1^*|$); challenger replies with $c^* \leftarrow \mathrm{Enc}(pk, m_b^*)$.
  3. $\mathcal{A}$ outputs $b' \in \{0,1\}$.
  $\Pi$ is **CPA-secure** if $\mathrm{Game}^{\mathrm{CPA}}_{\Pi, \mathcal{A}}(\lambda, 0) \approx_c \mathrm{Game}^{\mathrm{CPA}}_{\Pi, \mathcal{A}}(\lambda, 1)$ for all PPT $\mathcal{A}$.
- **$\mathrm{Game}^{\mathrm{CCA}}_{\Pi, \mathcal{A}}(\lambda, b)$ (adaptive CCA-2):** Same as CPA, except $\mathcal{A}$ may submit up to $\mathrm{poly}(\lambda)$ decryption queries $\tilde{c}_i \in \mathcal{C}$ both before sending $(m_0^*, m_1^*)$ and after receiving $c^*$ (subject to $\tilde{c}_i \neq c^*$ post-challenge), receiving $\mathrm{Dec}(sk, \tilde{c}_i)$. $\Pi$ is **CCA-secure** if $\mathrm{Game}^{\mathrm{CCA}}_{\Pi, \mathcal{A}}(\lambda, 0) \approx_c \mathrm{Game}^{\mathrm{CCA}}_{\Pi, \mathcal{A}}(\lambda, 1)$ for all PPT $\mathcal{A}$.

#### Algorithm 6.1 & Theorem 6.1 (ElGamal PKE and CPA-Security)

Given $(G, g, q) \leftarrow \mathrm{GroupGen}(1^\lambda)$, **ElGamal PKE** over $\mathcal{M} = G$ is:
- $\mathrm{KGen}(1^\lambda)$: sample $(G, g, q) \leftarrow \mathrm{GroupGen}(1^\lambda)$ and $x \in_R \mathbb{Z}_q$; set $pk = (G, g, q, h = g^x)$ and $sk = x$.
- $\mathrm{Enc}(pk, m)$: sample $r \in_R \mathbb{Z}_q$ and output $c = (c_1, c_2) = (g^r,\; h^r \cdot m)$.
- $\mathrm{Dec}(sk, (c_1, c_2))$: output $c_2 \cdot c_1^{-x}$ (correct since $g^{xr} m / (g^r)^x = m$).

**Theorem 6.1:** If the DDH assumption holds for $\mathrm{GroupGen}$, then $\Pi_{\mathrm{ElGamal}}$ is CPA-secure.

**Proof.** Fix $b \in \{0,1\}$, let $G(\lambda, b) = \mathrm{Game}^{\mathrm{CPA}}_{\Pi_{\mathrm{ElGamal}}, \mathcal{A}}(\lambda, b)$, and define hybrid $H(\lambda, b)$ identical to $G(\lambda, b)$ except the challenge ciphertext is $(g^r, g^z \cdot m_b^*)$ for independent $z \in_R \mathbb{Z}_q$.
1. *$G(\lambda, b) \approx_c H(\lambda, b)$:* Construct a PPT DDH distinguisher $\mathcal{A}'(G, g, q, X, Y, Z)$:
   - Forward $pk = (G, g, q, X)$ to $\mathcal{A}$.
   - On challenge $(m_0^*, m_1^*)$, return $c^* = (Y, Z \cdot m_b^*)$, and output $\mathcal{A}$'s guess $b'$.
   If $Z = g^{xy}$ ($X = g^x, Y = g^y$), $c^* = (g^y, X^y \cdot m_b^*)$ simulates $G(\lambda, b)$; if $Z = g^z$, $c^* = (g^y, g^z \cdot m_b^*)$ simulates $H(\lambda, b)$. By DDH, $G(\lambda, b) \approx_c H(\lambda, b)$.
2. *$H(\lambda, 0) \equiv H(\lambda, 1)$:* Because $z \in_R \mathbb{Z}_q$ is independent of $(g, X, Y)$, $g^z \cdot m_b^*$ is uniform in $G$ and independent of $m_b^*$, hence of $b$.
By transitivity, $G(\lambda, 0) \approx_c H(\lambda, 0) \equiv H(\lambda, 1) \approx_c G(\lambda, 1)$. $\blacksquare$

**CCA-2 insecurity of ElGamal:** Multiplicative malleability breaks CCA-2: after receiving $c^* = (c_1^*, c_2^*)$, picking any $m' \in G \setminus \{1\}$ yields $\tilde{c} = (c_1^*, c_2^* \cdot m') \neq c^*$, whose decryption $m_b^* \cdot m'$ immediately distinguishes $m_0^*$ from $m_1^*$ with probability $1$.

---

### 6.2 RSA Encryption and Trapdoor Permutations

#### Assumption 6.1 (FACTORING) & Algorithm 6.2 (Textbook RSA)

Let $\mathrm{GenModulus}(1^\lambda)$ sample two independent random $\lambda$-bit primes $p, q \in \mathbb{P}$ and output $n = pq$. The **FACTORING assumption** states that for every PPT $\mathcal{A}$,
$$\Pr\big[\mathcal{A}(1^\lambda, n) = (p', q') \text{ with } p', q' > 1,\; p'q' = n \;:\; n \leftarrow \mathrm{GenModulus}(1^\lambda)\big] \le \mathrm{negl}(\lambda).$$

**Textbook RSA PKE** over $\mathcal{M} = \mathcal{C} = \mathbb{Z}_n$ (or $\mathbb{Z}_n^*$):
- $\mathrm{KGen}(1^\lambda)$: sample distinct $\lambda$-bit primes $p, q$, set $n = pq$ and $\varphi(n) = (p-1)(q-1)$, pick $e$ with $\gcd(e, \varphi(n)) = 1$, compute $d = e^{-1} \bmod \varphi(n)$, and output $pk = (n, e)$, $sk = (n, d)$.
- $\mathrm{Enc}(pk, m) = m^e \bmod n$, $\mathrm{Dec}(sk, c) = c^d \bmod n$.
Since $ed = 1 + k\varphi(n)$, Euler's theorem gives $(m^e)^d \equiv m \cdot (m^{\varphi(n)})^k \equiv m \pmod n$ for all $m \in \mathbb{Z}_n^*$ (and all $m \in \mathbb{Z}_n$ via CRT). Textbook RSA is deterministic and therefore **not CPA-secure**; simple randomized padding $\bar{m} = m \| r$ requires $|r| = \omega(\log \lambda)$ to resist brute-forcing $r$ and still lacks a multi-bit CPA proof under RSA alone.

#### Definition 6.2 (Trapdoor Permutation — TDP) & Assumption 6.2 (RSA)

A **TDP** is a triple of PPT algorithms $(\mathrm{KGen}, f, f^{-1})$ where:
1. $\mathrm{KGen}(1^\lambda) \to (pk, sk)$ defines an efficiently sampleable domain $X_{pk}$;
2. $f(pk, \cdot) : X_{pk} \to X_{pk}$ is an efficiently computable permutation;
3. **Trapdoor invertibility:** $f^{-1}(sk, f(pk, x)) = x$ is efficiently computable using $sk$ for all $x \in X_{pk}$;
4. **One-wayness:** Given only $pk$, no PPT adversary inverts $f(pk, x)$ for $x \in_R X_{pk}$ with more than negligible probability.

The **RSA assumption** states that $f_{\mathrm{RSA}}((n, e), x) = x^e \bmod n$ over $X_{pk} = \mathbb{Z}_n^*$ is a TDP. Clearly $\mathrm{RSA} \implies \mathrm{FACTORING}$ (factoring $n$ reveals $\varphi(n)$ and $d = e^{-1} \bmod \varphi(n)$).

#### Theorem 6.2 (CPA-Secure PKE from any TDP)

Let $(\mathrm{KGen}, f, f^{-1})$ be a TDP with hard-core predicate $h(pk, \cdot) : X_{pk} \to \{0,1\}$ (which exists after Goldreich–Levin, and directly for RSA via the LSB). For 1-bit messages $m \in \{0,1\}$,
$$\mathrm{Enc}(pk, m) = \big(f(pk, r),\; h(pk, r) \oplus m\big) \;\;(r \in_R X_{pk}), \qquad \mathrm{Dec}\big(sk, (c_0, c_1)\big) = c_1 \oplus h\big(pk, f^{-1}(sk, c_0)\big)$$
is CPA-secure *(proved in Problem 6.1)*. Encrypting an $\ell$-bit message bit-by-bit using independent $r_1, \dots, r_\ell \in_R X_{pk}$ extends this to any $\ell = \mathrm{poly}(\lambda)$ via an $\ell$-step hybrid.

#### Algorithm 6.3 & Theorem 6.3 (RSA-OAEP)

To achieve CCA-2 security (PKCS #1 v2.0), Bellare–Rogaway **Optimal Asymmetric Encryption Padding (OAEP)** wraps $m$ in a 2-round Feistel padding with redundancy $0^{\lambda_1}$: fix RSA keys $(n, e), (n, d)$, parameters $\lambda_0, \lambda_1$ with $\ell + \lambda_0 + \lambda_1 < |n|$, and hashes $H : \{0,1\}^{\lambda_0} \to \{0,1\}^{\ell + \lambda_1}$, $H' : \{0,1\}^{\ell + \lambda_1} \to \{0,1\}^{\lambda_0}$.
- $\mathrm{Enc}(pk, m)$ ($m \in \{0,1\}^\ell$): sample $r \in_R \{0,1\}^{\lambda_0}$, set $s = (m \| 0^{\lambda_1}) \oplus H(r)$ and $t = r \oplus H'(s)$, interpret $s \| t \in \mathbb{Z}_n^*$ (resampling on negligible failure), and output $c = (s \| t)^e \bmod n$.
- $\mathrm{Dec}(sk, c)$: compute $s \| t = c^d \bmod n$, $r = t \oplus H'(s)$, and $m' = s \oplus H(r)$; if $m'$ ends in $0^{\lambda_1}$, output its first $\ell$ bits, else output $\perp$.

**Theorem 6.3:** RSA-OAEP is CCA-2 secure under the RSA assumption in the ROM (modeling $H, H'$ as independent random oracles). *(Caveat: proof omitted; note this holds specifically for RSA via partial-domain one-wayness—Fujisaki–Okamoto–Pointcheval–Stern—rather than generic black-box TDP one-wayness.)*

---

### 6.3 Digital Signatures

#### Definition 6.3 & $\mathrm{Game}^{\mathrm{UFCMA}}$

A **digital signature (DS) scheme** $\Pi = (\mathrm{KGen}, \mathrm{Sign}, \mathrm{Vrfy})$ generates $(pk, sk) \leftarrow \mathrm{KGen}(1^\lambda)$, signs $\sigma \leftarrow \mathrm{Sign}(sk, m)$, and verifies $\mathrm{Vrfy}(pk, m, \sigma) \in \{0,1\}$, satisfying correctness $\Pr[\mathrm{Vrfy}(pk, m, \mathrm{Sign}(sk, m)) = 1] = 1$ (or $\ge 1 - \mathrm{negl}(\lambda)$). *(In a PKI, Certificate Authorities sign `(identity, pk)` bindings to defeat MitM attacks on public keys.)*

In $\mathrm{Game}^{\mathrm{UFCMA}}_{\Pi, \mathcal{A}}(\lambda)$:
1. Challenger sends $pk$ from $(pk, sk) \leftarrow \mathrm{KGen}(1^\lambda)$ to $\mathcal{A}$.
2. $\mathcal{A}$ adaptively queries $q = \mathrm{poly}(\lambda)$ messages $m_i$ to receive $\sigma_i \leftarrow \mathrm{Sign}(sk, m_i)$.
3. $\mathcal{A}$ outputs $(m^*, \sigma^*)$ and wins iff $\mathrm{Vrfy}(pk, m^*, \sigma^*) = 1$ and $m^* \notin \{m_1, \dots, m_q\}$.
$\Pi$ is **UFCMA-secure** if $\Pr[\mathrm{Game}^{\mathrm{UFCMA}}_{\Pi, \mathcal{A}}(\lambda) = 1] \le \mathrm{negl}(\lambda)$ for all PPT $\mathcal{A}$.

#### Algorithm 6.4 (Textbook RSA DS) & Forgeries

With RSA keys $((n, e), (n, d))$, $\mathrm{Sign}(sk, m) = m^d \bmod n$ and $\mathrm{Vrfy}(pk, m, \sigma) = 1[\sigma^e \equiv m \pmod n]$. It is **not UFCMA-secure**:
1. *Multiplicative 2-query forgery:* Query $m_1, m_2 \in \mathbb{Z}_n^* \setminus \{1\}$ (with $m_1 m_2 \notin \{m_1, m_2\}$) to get $\sigma_1, \sigma_2$; then $(m_1 m_2 \bmod n,\; \sigma_1 \sigma_2 \bmod n)$ verifies since $(\sigma_1 \sigma_2)^e \equiv m_1 m_2 \pmod n$.
2. *No-message forgery:* Pick any $\sigma^* \in \mathbb{Z}_n$ and output $((\sigma^*)^e \bmod n,\; \sigma^*)$.

#### Algorithm 6.5 & Theorem 6.4 (Full-Domain Hash — FDH)

Given a TDP $(\mathrm{KGen}, f, f^{-1})$ with domain $X_{pk}$ and hash $H : \mathcal{M} \to X_{pk}$, **FDH** sets $\mathrm{Sign}(sk, m) = f^{-1}(sk, H(m))$ and $\mathrm{Vrfy}(pk, m, \sigma) = 1[f(pk, \sigma) = H(m)]$.

**Theorem 6.4:** If $(\mathrm{KGen}, f, f^{-1})$ is a TDP and $H$ is modeled as a random oracle onto $X_{pk}$, then $\Pi_{\mathrm{FDH}}$ is UFCMA-secure in the ROM.

**Proof.** Suppose a PPT adversary $\mathcal{A}_H$ breaks UFCMA w.p. $\varepsilon(\lambda) \ge \lambda^{-c}$. W.l.o.g., assume $\mathcal{A}_H$ never repeats RO queries, queries $H(m_i)$ before $\mathrm{Sign}(m_i)$, and queries $H(m^*)$ before outputting $(m^*, \sigma^*)$ (making at most $q = \mathrm{poly}(\lambda)$ distinct RO queries). Build a PPT TDP inverter $\mathcal{A}(pk, y = f(pk, x))$:
1. Forward $pk$ to $\mathcal{A}_H$, sample $j \in_R [q]$, initialize table $T$ and counter $t = 0$.
2. *RO query $m$:* If $(m, \cdot, y_m) \in T$, return $y_m$. Otherwise increment $t \leftarrow t + 1$:
   - If $t = j$, store $(m, \perp, y) \in T$ and return $y$.
   - If $t \neq j$, sample $x_t \in_R X_{pk}$, compute $y_t = f(pk, x_t)$, store $(m, x_t, y_t) \in T$, and return $y_t$.
3. *Sign query $m$:* Look up $(m, x_m, y_m) \in T$. If $x_m = \perp$ (the $j$-th RO query), **abort**; otherwise return $\sigma = x_m$.
4. *Forgery $(m^*, \sigma^*)$:* If $m^*$ was the $j$-th RO query and $\mathrm{Vrfy}(pk, m^*, \sigma^*) = 1$, output $\sigma^*$; else abort.

Because $f(pk, \cdot)$ is a permutation on $X_{pk}$, every simulated RO answer is uniform and independent in $X_{pk}$, so $\mathcal{A}_H$'s view before any abort is independent of $j$. Let $i^* \in [q]$ be the RO index of $m^*$. Whenever $j = i^*$ (w.p. $1/q$), freshness of $m^*$ prevents $\mathcal{A}_H$ from querying $\mathrm{Sign}(m^*)$ in a winning run, so $\mathcal{A}$ never aborts and $f(pk, \sigma^*) = y \implies \sigma^* = x$. Thus $\Pr[\mathcal{A} \text{ inverts } y] \ge \frac{1}{q}\varepsilon(\lambda) \ge \frac{1}{q\lambda^c}$, contradicting TDP one-wayness. $\blacksquare$

---

### 6.4 Solved Exercises (Bianco Ch. 6) [Provisional — Bianco 2025/26]

#### Problem 6.1

Prove Theorem 6.2 (1-bit CPA-secure PKE from a TDP $(\mathrm{KGen}, f, f^{-1})$ and hard-core predicate $h$).

**Proof.** Suppose $\mathcal{A}_{\mathrm{CPA}}$ breaks CPA-security with advantage $\Pr[\mathcal{A}_{\mathrm{CPA}}(pk, \mathrm{Enc}(pk, m_1^*)) = 1] - \Pr[\mathcal{A}_{\mathrm{CPA}}(pk, \mathrm{Enc}(pk, m_0^*)) = 1] \ge \lambda^{-c}$. Build a PPT predictor $\mathcal{A}_{\mathrm{HCP}}(pk, y = f(pk, x))$ ($x \in_R X_{pk}$):
1. Forward $pk$ to $\mathcal{A}_{\mathrm{CPA}}$ and receive challenge bits $(m_0^*, m_1^*) \in \{0,1\}^2$.
2. Sample $b^\# \in_R \{0,1\}$, send $(y, b^\#)$ to $\mathcal{A}_{\mathrm{CPA}}$ to obtain $b' \in \{0,1\}$, and output $b^\# \oplus m_{b'}^*$.

Analysis by cases on $(m_0^*, m_1^*)$:
- If $m_0^* = m_1^* = m$, $\mathcal{A}_{\mathrm{CPA}}$ has advantage $0$ and $\mathcal{A}_{\mathrm{HCP}}$ outputs $b^\# \oplus m$, matching $h(pk, x)$ w.p. $1/2$.
- If $m_0^* \neq m_1^*$, there is a unique $\beta \in \{0,1\}$ with $b^\# = h(pk, x) \oplus m_\beta^*$. Since $b^\# \in_R \{0,1\}$ is independent of $(pk, x, m_0^*, m_1^*)$, $\beta \sim U_1$ independently and $(y, b^\#)$ is distributed identically to $\mathrm{Enc}(pk, m_\beta^*)$. Moreover, $b^\# \oplus m_{b'}^* = h(pk, x) \oplus m_\beta^* \oplus m_{b'}^*$ equals $h(pk, x)$ iff $b' = \beta$, yielding conditioned success probability $\frac{1}{2} + \frac{1}{2}(\Pr[b'=1 \mid \beta=1] - \Pr[b'=1 \mid \beta=0])$.

Averaging over $(m_0^*, m_1^*)$ gives $\Pr[\mathcal{A}_{\mathrm{HCP}}(pk, y) = h(pk, x)] \ge \frac{1}{2} + \frac{1}{2\lambda^c}$, contradicting that $h$ is hard-core. *(Equivalently, by $(pk, f(pk, r), h(pk, r)) \approx_c (pk, f(pk, r), U_1)$, $h(pk, r) \oplus m_b^*$ is indistinguishable from uniform $U_1 \oplus m_b^*$.)* $\blacksquare$

#### Problem 6.2

Given a DS scheme $\Pi = (\mathrm{KGen}, \mathrm{Sign}, \mathrm{Vrfy})$ over $\mathcal{M} = \{0,1\}^n$ ($n \ge \lambda$), define $\Pi'$ with
$$\mathrm{Sign}'(sk, m) = \big(r,\; \mathrm{Sign}(sk, m \oplus r),\; \mathrm{Sign}(sk, r)\big) \;\;(r \in_R \{0,1\}^n),$$
$$\mathrm{Vrfy}'(pk, m, (r, \sigma_0, \sigma_1)) = \mathrm{Vrfy}(pk, m \oplus r, \sigma_0) \land \mathrm{Vrfy}(pk, r, \sigma_1).$$
Prove or disprove: *$\Pi'$ is UFCMA-secure assuming $\Pi$ is UFCMA-secure.*

**Solution.** **False.** Construct a PPT UFCMA adversary $\mathcal{A}$ against $\Pi'$:
1. Receive $pk$; query $\mathrm{Sign}'(sk, m_1)$ on $m_1 = 0^n$ to get $(r_1, \sigma_0^{(1)}, \sigma_1^{(1)})$, where $\sigma_1^{(1)} = \mathrm{Sign}(sk, r_1)$.
2. Query $\mathrm{Sign}'(sk, m_2)$ on $m_2 = m_1 \oplus r_1$ to get $(r_2, \sigma_0^{(2)}, \sigma_1^{(2)})$, where $\sigma_0^{(2)} = \mathrm{Sign}(sk, (m_1 \oplus r_1) \oplus r_2)$.
3. Output forgery $\big(m^* = m_1 \oplus r_2,\; (r_1, \sigma_0^{(2)}, \sigma_1^{(1)})\big)$.

Verification passes since $(m_1 \oplus r_2) \oplus r_1 = m_2 \oplus r_2$ (signed by $\sigma_0^{(2)}$) and $r_1$ is signed by $\sigma_1^{(1)}$. Freshness $m^* \notin \{m_1, m_2\}$ holds whenever $r_2 \notin \{0^n, r_1\}$ (w.p. $1 - 2^{1-n}$, or $\mathcal{A}$ re-queries $m_2$). $\blacksquare$

#### Problem 6.3

A DS scheme $\Pi$ satisfies **strong binding** if no PPT adversary outputs $(pk, m, pk', m', \sigma)$ with $(pk, m) \neq (pk', m')$ and $\mathrm{Vrfy}(pk, m, \sigma) = \mathrm{Vrfy}(pk', m', \sigma) = 1$ with non-negligible probability. Combine any CRH $\mathcal{H}$ and any UFCMA-secure DS $\Pi'$ into a DS scheme satisfying both UFCMA and strong binding.

**Solution.** Sample a shared public CRS seed $s \in_R \{0,1\}^\lambda$ for a VIL CRH $H_s : \{0,1\}^* \to \{0,1\}^n$ (using an injective pairing $\langle pk, m \rangle$). Define $\Pi_H$:
- $\mathrm{KGen}(1^\lambda)$: run $(pk', sk') \leftarrow \mathrm{KGen}'(1^\lambda)$, output $pk = pk'$, $sk = (pk', sk')$.
- $\mathrm{Sign}(sk, m)$: set $h = H_s(\langle pk, m \rangle)$, compute $\sigma' \leftarrow \mathrm{Sign}'(sk', h)$, output $\sigma = (h, \sigma')$.
- $\mathrm{Vrfy}(pk, m, (h, \sigma'))$: output $1$ iff $h = H_s(\langle pk, m \rangle)$ and $\mathrm{Vrfy}'(pk, h, \sigma') = 1$.

1. **UFCMA-security:** For any PPT $\mathcal{A}$ making queries $m_1, \dots, m_q$ and forging $(m^*, (h^*, \sigma^*))$ ($m^* \notin \{m_1, \dots, m_q\}$), let $E_{\mathrm{col}}$ be the event that $H_s(\langle pk, m^* \rangle) = H_s(\langle pk, m_i \rangle)$ for some $i \in [q]$. Because $m^* \neq m_i$ and $\langle \cdot, \cdot \rangle$ is injective, $E_{\mathrm{col}}$ produces a collision on $H_s$ (with $(pk, sk)$ sampled by the reduction), so $\Pr[E_{\mathrm{col}}] \le \mathrm{negl}(\lambda)$ by CRH of $\mathcal{H}$. Conditioned on $\neg E_{\mathrm{col}}$, $h^*$ is fresh for $\Pi'$ and $(h^*, \sigma^*)$ breaks UFCMA of $\Pi'$.
2. **Strong binding:** Any winning tuple $(pk, m, pk', m', (h, \sigma'))$ with $(pk, m) \neq (pk', m')$ forces $H_s(\langle pk, m \rangle) = h = H_s(\langle pk', m' \rangle)$ on distinct inputs $\langle pk, m \rangle \neq \langle pk', m' \rangle$, directly breaking collision resistance of $\mathcal{H}$. $\blacksquare$

#### Problem 6.4

1. Define **anonymous PKE** $\mathrm{Game}^{\mathrm{ANON}}_{\Pi, \mathcal{A}}(\lambda, t, j)$ for $t \ge 2$ receivers (given $(pk_0, \dots, pk_{t-1})$, $\mathcal{A}$ chooses $m^*$ and receives $\mathrm{Enc}(pk_j, m^*)$), and show $t = 2$ suffices for any $t = \mathrm{poly}(\lambda)$.
2. Show ElGamal PKE (sharing $(G, g, q)$) is anonymous under DDH.
3. Show RSA PKE is *not* anonymous.

**Solution.**
1. **Model & $t = 2$ sufficiency:** $\Pi$ is anonymous if $\mathrm{Game}^{\mathrm{ANON}}(\lambda, 2, 0) \approx_c \mathrm{Game}^{\mathrm{ANON}}(\lambda, 2, 1)$. For any $t = \mathrm{poly}(\lambda)$ and $j \neq j' \in \{0, \dots, t-1\}$, a reduction from $\mathrm{Game}^{\mathrm{ANON}}(\lambda, 2, b)$ places $(pk_0^*, pk_1^*)$ in positions $j, j'$, generates the other $t - 2$ key pairs locally via $\mathrm{KGen}(1^\lambda)$, and forwards $m^*, c^*$, proving $\mathrm{Game}^{\mathrm{ANON}}(\lambda, t, j) \approx_c \mathrm{Game}^{\mathrm{ANON}}(\lambda, t, j')$.
2. **ElGamal is anonymous:** Introduce three games: $H_0 = \mathrm{Game}^{\mathrm{ANON}}(\lambda, 2, 0)$, $H_1$ (honest $pk_0, pk_1$ with challenge $(g^r, g^z \cdot m^*)$ for independent $r, z \in_R \mathbb{Z}_q$), and $H_2 = \mathrm{Game}^{\mathrm{ANON}}(\lambda, 2, 1)$. To show $H_0 \approx_c H_1$, a PPT DDH distinguisher $\mathcal{A}_{\mathrm{DDH}}(G, g, q, X, Y, Z)$ sets $pk_0 = X$, samples $x_1 \in_R \mathbb{Z}_q$ to set $pk_1 = g^{x_1}$, sends $(pk_0, pk_1)$ to $\mathcal{A}$, and answers $m^*$ with $c^* = (Y, Z \cdot m^*)$. When $Z = g^{xy}$, $c^* = (g^y, pk_0^y \cdot m^*)$ simulates $H_0$; when $Z = g^z$, it simulates $H_1$. Symmetrically, setting $pk_1 = X$ proves $H_1 \approx_c H_2$, so $H_0 \approx_c H_2$.
3. **RSA is not anonymous:** Given $pk_0 = (n_0, e_0)$ and $pk_1 = (n_1, e_1)$:
   - For Textbook RSA, send $m^* = 2$ (or random $m^*$ until $2^{e_0} \bmod n_0 \neq 2^{e_1} \bmod n_1$) and check $c^* \stackrel{?}{=} (m^*)^{e_0} \bmod n_0$ (advantage $1$).
   - Even for randomized RSA with ciphertexts roughly uniform over $\mathbb{Z}_{n_b}$ (w.l.o.g. $n_0 < n_1$), output $1$ iff $c^* \ge n_0$. For $b = 0$, $c^* < n_0$ always ($\Pr = 0$); for $b = 1$, $\Pr[c^* \ge n_0] = \frac{n_1 - n_0}{n_1} = 1 - \frac{n_0}{n_1}$, whose expectation over primes sampled uniformly in $[2^{\lambda-1}, 2^\lambda - 1]$ is a positive constant $\Omega(1)$. $\blacksquare$

#### Problem 6.5

In **CCA-1** (non-adaptive CCA), decryption queries are allowed only *before* receiving $c^*$. Prove or disprove:
1. $\mathrm{CPA} \implies \mathrm{CCA\text{-}1}$.
2. $\mathrm{CCA\text{-}1} \implies \mathrm{CPA}$.
3. $\mathrm{CCA\text{-}1} \implies \mathrm{CCA\text{-}2}$.

**Solution.**
1. **False ($\mathrm{CPA} \not\implies \mathrm{CCA\text{-}1}$):** Given any CPA-secure PKE $\Pi$, define $\mathrm{Enc}'(pk, m) = 1 \| \mathrm{Enc}(pk, m)$ and $\mathrm{Dec}'(sk, b \| c) = sk$ if $b = 0$ else $\mathrm{Dec}(sk, c)$. $\Pi'$ remains CPA-secure (prepending `1` to $c^*$), whereas a CCA-1 adversary queries $\mathrm{Dec}'(sk, 0 \| 0^\lambda)$ before the challenge to learn $sk$ and decrypt $c^*$ w.p. $1$.
2. **True ($\mathrm{CCA\text{-}1} \implies \mathrm{CPA}$):** Every CPA adversary is a CCA-1 adversary making $0$ decryption queries.
3. **False ($\mathrm{CCA\text{-}1} \not\implies \mathrm{CCA\text{-}2}$):** Given any CCA-1-secure PKE $\Pi$, define $\mathrm{Enc}'(pk, m) = 0 \| \mathrm{Enc}(pk, m)$ and $\mathrm{Dec}'(sk, b \| c) = \mathrm{Dec}(sk, c)$ for $b \in \{0,1\}$. Pre-challenge queries are simulated identically by stripping the leading bit $b$ (so $\Pi'$ is CCA-1-secure), while post-challenge an adversary flips the first bit of $c^* = 0 \| \hat{c}^*$ to $c' = 1 \| \hat{c}^* \neq c^*$ and queries $\mathrm{Dec}'(sk, c') = m_b^*$, winning w.p. $1$. *(Alternatively, Cramer–Shoup lite separates CCA-1 from CCA-2 under DDH.)* $\blacksquare$

---

## 5. Chapter 7 — Identification Schemes, $\Sigma$-Protocols, and Fiat–Shamir [Provisional — Bianco 2025/26]

### 7.1 Identification Schemes, $\Sigma$-Protocols, and Zero-Knowledge

In an **identification scheme (IDS)**, a prover $P$ proves knowledge of $sk$ matching $pk$ to a verifier $V$ without revealing $sk$. Let $P(pk, sk) \rightleftarrows V(pk)$ denote an interactive execution producing transcript $\tau$ and verifier decision $\mathrm{out}_V(P(pk, sk) \rightleftarrows V(pk)) \in \{0,1\}$.

#### Definition 7.1 & 7.2 (Identification Scheme and Passive Security)

An **IDS** $\Pi = (\mathrm{KGen}, P, V)$ is a triple of PPT algorithms where $\mathrm{KGen}(1^\lambda) \to (pk, sk)$ and $P, V$ satisfy **perfect correctness**: $\Pr[\mathrm{out}_V(P(pk, sk) \rightleftarrows V(pk)) = 1] = 1$.

In the **passive impersonation game** $\mathrm{Game}^{\mathrm{ID}}_{\Pi, \mathcal{A}}(\lambda)$ for a two-stage PPT adversary $\mathcal{A} = (\mathcal{A}_1, \mathcal{A}_2)$:
1. Challenger generates $(pk, sk) \leftarrow \mathrm{KGen}(1^\lambda)$ and sends $pk$ to $\mathcal{A}_1$.
2. $\mathcal{A}_1$ receives $q = \mathrm{poly}(\lambda)$ independent honest transcripts $\tau_1, \dots, \tau_q \leftarrow (P(pk, sk) \rightleftarrows V(pk))$ and outputs state $s$.
3. $\mathcal{A}_2(s, pk)$ interacts live with an honest verifier $V(pk)$, winning (output $1$) iff $\mathrm{out}_V(\mathcal{A}_2(s, pk) \rightleftarrows V(pk)) = 1$.

$\Pi$ is **passively secure** if $\Pr[\mathrm{Game}^{\mathrm{ID}}_{\Pi, \mathcal{A}}(\lambda) = 1] \le \mathrm{negl}(\lambda)$ for all PPT $\mathcal{A}$.

#### Definition 7.3 ($\Sigma$-Protocol)

A $\Sigma$-protocol $\Sigma = (\mathrm{KGen}, P, V)$ is an IDS with $P = (P_1, P_2)$ and $V = (V_1, V_2)$ satisfying:
1. **Three-move public-coin interaction:**
   - *Commitment:* $(\alpha, \mathrm{st}) \leftarrow P_1(pk, sk)$; $P$ sends $\alpha$ to $V$.
   - *Challenge:* $V_1(pk, \alpha)$ samples $\beta \in_R B_{\lambda, pk}$ from a super-polynomial challenge space $|B_{\lambda, pk}| = 2^{\omega(\log \lambda)}$ and sends $\beta$ to $P$.
   - *Response:* $\gamma \leftarrow P_2(pk, sk, \alpha, \beta, \mathrm{st})$; $P$ sends $\gamma$ to $V$.
   - *Decision:* $V$ deterministically outputs $V_2(pk, \alpha, \beta, \gamma) \in \{0,1\}$.
2. **Non-triviality:** For all $(pk, sk) \leftarrow \mathrm{KGen}(1^\lambda)$ and every fixed string $\hat{\alpha}$, $\Pr[\alpha = \hat{\alpha} : (\alpha, \mathrm{st}) \leftarrow P_1(pk, sk)] \le \mathrm{negl}(\lambda)$.

#### Algorithm 7.1 (Schnorr's $\Sigma$-Protocol)

Let $\mathrm{GroupGen}(1^\lambda)$ output $(G, g, q)$ of **prime** order $q$ ($|q| \ge \lambda$).
- $\mathrm{KGen}(1^\lambda)$: sample $x \in_R \mathbb{Z}_q$; set $pk = (G, g, q, y = g^x)$ and $sk = x$ (challenge space $B_{\lambda, pk} = \mathbb{Z}_q$).
- **Interaction:**
  1. $P_1(pk, sk)$: sample $a \in_R \mathbb{Z}_q$, send $\alpha = g^a \in G$ (with $\mathrm{st} = a$).
  2. $V_1(pk, \alpha)$: sample and send $\beta \in_R \mathbb{Z}_q$.
  3. $P_2(pk, sk, \alpha, \beta, a)$: compute and send $\gamma = \beta x + a \bmod q$.
  4. $V_2(pk, \alpha, \beta, \gamma)$: output $1$ iff $\alpha \in G$, $\gamma \in \mathbb{Z}_q$, and $g^\gamma = \alpha \cdot y^\beta$.

Correctness holds since $g^{(\beta x + a)\bmod q} = g^a (g^x)^\beta = \alpha y^\beta$; non-triviality holds since $\alpha = g^a \sim U_G$ gives $\Pr[\alpha = \hat{\alpha}] = 1/q \le 2^{-\lambda+1}$.

#### Definition 7.4 & Proposition 7.1 (Honest-Verifier Zero-Knowledge — HVZK)

An IDS $\Pi$ satisfies **HVZK** if there exists a PPT simulator $\mathrm{Sim}$ such that
$$\big\{(pk, sk) \leftarrow \mathrm{KGen}(1^\lambda) : \big(pk, sk, \mathrm{Sim}(pk)\big)\big\} \approx_c \big\{(pk, sk) \leftarrow \mathrm{KGen}(1^\lambda) : \big(pk, sk, (P(pk, sk) \rightleftarrows V(pk))\big)\big\}.$$

**Proposition 7.1:** Schnorr's $\Sigma$-protocol satisfies (perfect) HVZK.

**Proof.** Define $\mathrm{Sim}(pk)$: sample $\beta', \gamma' \in_R \mathbb{Z}_q$, set $\alpha' = g^{\gamma'} y^{-\beta'}$, and output $(\alpha', \beta', \gamma')$. In $\mathrm{Sim}(pk)$, $(\beta', \gamma') \sim U_{\mathbb{Z}_q^2}$ and $\alpha'$ is the unique group element satisfying $g^{\gamma'} = \alpha' y^{\beta'}$. In a real execution, $a, \beta \in_R \mathbb{Z}_q$ are independent, so conditioned on any $\beta \in \mathbb{Z}_q$, $\gamma = (\beta x + a) \bmod q$ is uniform in $\mathbb{Z}_q$; thus $(\beta, \gamma) \sim U_{\mathbb{Z}_q^2}$ and $\alpha = g^a = g^{\gamma - \beta x} = g^\gamma y^{-\beta}$ satisfies the exact same equation. Hence real and simulated transcripts are identically distributed. $\blacksquare$

#### Definition 7.5 & Proposition 7.2 (Special Soundness — SS)

In $\mathrm{Game}^{\mathrm{SS}}_{\Sigma, \mathcal{A}}(\lambda)$, $\mathcal{A}(pk)$ outputs $(\alpha, \beta, \gamma, \beta', \gamma')$ and wins iff $\beta \neq \beta'$ and $V_2(pk, \alpha, \beta, \gamma) = V_2(pk, \alpha, \beta', \gamma') = 1$. $\Sigma$ satisfies **(computational) special soundness** if $\Pr[\mathrm{Game}^{\mathrm{SS}}_{\Sigma, \mathcal{A}}(\lambda) = 1] \le \mathrm{negl}(\lambda)$ for all PPT $\mathcal{A}$.

**Proposition 7.2:** Under the DL assumption for prime-order $\mathrm{GroupGen}$, Schnorr's $\Sigma$-protocol satisfies special soundness.

**Proof.** Given DL challenge $(G, g, q, y)$, a PPT solver $\mathcal{A}'$ runs $\mathcal{A}(G, g, q, y)$ to get $(\alpha, \beta, \gamma, \beta', \gamma')$. Whenever $\mathcal{A}$ wins, $g^\gamma = \alpha y^\beta$ and $g^{\gamma'} = \alpha y^{\beta'}$ with $\beta \not\equiv \beta' \pmod q$. Dividing gives $g^{\gamma - \gamma'} = y^{\beta - \beta'}$. Since $q$ is prime, $(\beta - \beta')^{-1} \bmod q$ exists, so $\mathcal{A}'$ computes and outputs $x' = (\gamma - \gamma')(\beta - \beta')^{-1} \bmod q = \log_g y$ with the same non-negligible probability as $\mathcal{A}$. $\blacksquare$

#### Theorem 7.1 (HVZK + Special Soundness $\implies$ Passive Security)

Let $\Sigma = (\mathrm{KGen}, P, V)$ be a $\Sigma$-protocol ($|B_{\lambda, pk}| = 2^{\omega(\log \lambda)}$). If $\Sigma$ satisfies HVZK and special soundness, then $\Sigma$ is passively secure.

**Proof.** Let $\mathcal{A} = (\mathcal{A}_1, \mathcal{A}_2)$ make $q = \mathrm{poly}(\lambda)$ transcript queries in $G_0(\lambda) = \mathrm{Game}^{\mathrm{ID}}_{\Sigma, \mathcal{A}}(\lambda)$, and let $G_1(\lambda)$ replace all $q$ transcripts with $\mathrm{Sim}(pk)$.
1. *Claim 1 ($|\Pr[G_0(\lambda)=1] - \Pr[G_1(\lambda)=1]| \le \mathrm{negl}(\lambda)$):* Define hybrids $H_0, \dots, H_q$ where $H_i$ answers the first $i$ queries with $\mathrm{Sim}(pk)$ and the remaining $q - i$ with $P(pk, sk) \rightleftarrows V(pk)$ ($H_0 \equiv G_0$, $H_q \equiv G_1$). A single PPT HVZK distinguisher $\mathcal{A}'$ on input $(pk, sk, \tau)$ samples $I \in_R \{0, \dots, q-1\}$, answers queries $j \le I$ with $\mathrm{Sim}(pk)$, query $j = I+1$ with $\tau$, and queries $j > I+1$ with $P(pk, sk) \rightleftarrows V(pk)$ (using $sk$), then simulates $\mathcal{A}_2(s, pk) \rightleftarrows V(pk)$ and outputs $V$'s decision bit. By telescoping over $I$, $\mathcal{A}'$'s HVZK advantage equals $|\Pr[G_0(\lambda)=1] - \Pr[G_1(\lambda)=1]| / q(\lambda)$, which must be negligible.
2. *Claim 2 ($\Pr[G_1(\lambda) = 1] \le \mathrm{negl}(\lambda)$):* Suppose $\mathcal{B} = (\mathcal{B}_1, \mathcal{B}_2)$ wins $G_1(\lambda)$ w.p. $\varepsilon(\lambda) \ge \lambda^{-c}$. Build a PPT adversary $\mathcal{B}'(pk)$ against $\mathrm{Game}^{\mathrm{SS}}_{\Sigma, \mathcal{B}'}(\lambda)$ by **rewinding**:
   - Sample $\tau_1, \dots, \tau_q \leftarrow \mathrm{Sim}(pk)$ and random coins $\rho = (\rho_1, \rho_2)$, compute $s = \mathcal{B}_1(pk, \tau_1, \dots, \tau_q; \rho_1)$, run $\mathcal{B}_2(s, pk; \rho_2)$ to obtain $\alpha^*$, and save state $Z = (pk, s, \alpha^*, \rho_2)$.
   - Run $\mathcal{B}_2$ from $Z$ on $\beta_0^* \in_R B_{\lambda, pk}$ to get $\gamma_0^*$; **rewind** $\mathcal{B}_2$ to $Z$, feed fresh independent $\beta_1^* \in_R B_{\lambda, pk}$ to get $\gamma_1^*$, and output $(\alpha^*, \beta_0^*, \gamma_0^*, \beta_1^*, \gamma_1^*)$.

   For each state $z$, let $\delta_z = \Pr_\beta[V_2(pk, \alpha^*, \beta, \gamma) = 1 \mid Z = z]$, so $\mathbb{E}[\delta_Z] = \varepsilon(\lambda) \ge \lambda^{-c}$. Conditioned on $Z = z$, independent challenges $\beta_0^*, \beta_1^*$ both accept w.p. $\delta_z^2$, giving overall joint acceptance probability $\mathbb{E}[\delta_Z^2]$. Let $G = \{\beta_0^* \neq \beta_1^*\}$, so $\Pr[\neg G] = |B_{\lambda, pk}|^{-1} = 2^{-\omega(\log \lambda)}$. By $\Pr[A \land G] \ge \Pr[A] - \Pr[\neg G]$ and Jensen's inequality ($\mathbb{E}[\delta_Z^2] \ge \mathbb{E}[\delta_Z]^2$),
   $$\Pr\big[\mathrm{Game}^{\mathrm{SS}}_{\Sigma, \mathcal{B}'}(\lambda) = 1\big] \ge \mathbb{E}[\delta_Z^2] - \frac{1}{|B_{\lambda, pk}|} \ge \big(\mathbb{E}[\delta_Z]\big)^2 - 2^{-\omega(\log \lambda)} \ge \frac{1}{\lambda^{2c}} - \mathrm{negl}(\lambda),$$
   contradicting special soundness. Combining Claims 1 and 2 yields $\Pr[G_0(\lambda) = 1] \le \mathrm{negl}(\lambda)$. $\blacksquare$

**Corollary 7.1:** Under DL for prime-order $\mathrm{GroupGen}$, Schnorr's $\Sigma$-protocol is passively secure.

---

### 7.2 The Fiat–Shamir Transform

#### Definition 7.6 & Theorem 7.2 (Fiat–Shamir Signatures)

Given a $\Sigma$-protocol $\Sigma = (\mathrm{KGen}, P, V)$ with challenge space $B_{\lambda, pk}$ and hash $H : \{0,1\}^* \to B_{\lambda, pk}$, the **Fiat–Shamir signature scheme** $\Pi_{\Sigma, H} = (\mathrm{KGen}, \mathrm{Sign}, \mathrm{Vrfy})$ uses $\Sigma.\mathrm{KGen}$, signs $m$ via $(\alpha, \mathrm{st}) \leftarrow P_1(pk, sk)$, $\beta = H(\alpha, m)$, $\gamma \leftarrow P_2(pk, sk, \alpha, \beta, \mathrm{st})$, $\sigma = (\alpha, \gamma)$, and verifies via $V_2(pk, \alpha, H(\alpha, m), \gamma)$.

**Theorem 7.2:** If $\Sigma$ is a non-trivial, passively secure $\Sigma$-protocol and $H$ is modeled as a random oracle onto $B_{\lambda, pk}$, then $\Pi_{\Sigma, H}$ is UFCMA-secure in the ROM.

**Proof.** Suppose a PPT adversary $\mathcal{A}_H$ breaks UFCMA w.p. $\varepsilon(\lambda)$ using at most $q_h = \mathrm{poly}(\lambda)$ distinct RO queries (w.l.o.g. including $H(\alpha^*, m^*)$ before outputting $(m^*, (\alpha^*, \gamma^*))$) and $q_s = \mathrm{poly}(\lambda)$ signing queries. Build $\mathcal{A} = (\mathcal{A}_1, \mathcal{A}_2)$ breaking $\mathrm{Game}^{\mathrm{ID}}_{\Sigma, \mathcal{A}}(\lambda)$:
1. *Setup:* $\mathcal{A}_1(pk)$ pre-fetches $q_s$ honest transcripts $\tau_1, \dots, \tau_{q_s}$ ($\tau_k = (\alpha_k, \beta_k, \gamma_k)$), samples $j \in_R [q_h]$, initializes RO table $T$ and fresh-RO counter $t = 0$, and sends $pk$ to $\mathcal{A}_H$.
2. *RO query $(\tilde{\alpha}, \tilde{m})$:* If already in $T$, return $T[(\tilde{\alpha}, \tilde{m})]$. Otherwise set $t \leftarrow t + 1$:
   - If $t = j$: $\mathcal{A}_1$ transitions to $\mathcal{A}_2$, sends $\tilde{\alpha}$ as its first message to $V(pk)$, receives $V$'s challenge $\beta^\# \in_R B_{\lambda, pk}$, sets $T[(\tilde{\alpha}, \tilde{m})] := \beta^\#$, and returns $\beta^\#$.
   - If $t \neq j$: sample $\beta \in_R B_{\lambda, pk}$, set $T[(\tilde{\alpha}, \tilde{m})] := \beta$, and return $\beta$.
3. *Sign query $m'_k$ ($k \in [q_s]$):* Using $\tau_k = (\alpha_k, \beta_k, \gamma_k)$, if $(\alpha_k, m'_k)$ already appears in $T$, **abort**; otherwise program $T[(\alpha_k, m'_k)] := \beta_k$ and return $(\alpha_k, \gamma_k)$.
4. *Forgery $(m^*, (\alpha^*, \gamma^*))$:* If $(\alpha^*, m^*)$ was the $j$-th fresh RO query and $V_2(pk, \alpha^*, \beta^\#, \gamma^*) = 1$, $\mathcal{A}_2$ sends $\gamma^*$ to $V(pk)$; otherwise abort.

By **non-triviality** of $\Sigma$, each fresh $\alpha_k$ collides with any of the $\le q_h$ prior entries in $T$ w.p. $\le \mathrm{negl}(\lambda)$, so $\Pr[\text{abort}] \le q_s q_h \cdot \mathrm{negl}(\lambda) = \mathrm{negl}(\lambda)$. Conditioned on not aborting, every RO output and signature matches the real ROM game identically, keeping $\mathcal{A}_H$'s view independent of $j$. Whenever $\mathcal{A}_H$ outputs a fresh valid forgery $(m^*, (\alpha^*, \gamma^*))$, $m^*$ was never queried to $\mathrm{Sign}$, so $(\alpha^*, m^*)$ could not have been programmed in Step 3 and must be some fresh RO query $i^* \in [q_h]$. When $j = i^*$ (w.p. $1/q_h$), $\mathcal{A}$ wins $\mathrm{Game}^{\mathrm{ID}}_{\Sigma, \mathcal{A}}(\lambda)$, giving
$$\Pr\big[\mathrm{Game}^{\mathrm{ID}}_{\Sigma, \mathcal{A}}(\lambda) = 1\big] \ge \frac{1}{q_h}\big(\varepsilon(\lambda) - \Pr[\text{abort}]\big),$$
contradicting passive security of $\Sigma$. $\blacksquare$

**Corollary 7.2:** Fiat–Shamir applied to Schnorr's $\Sigma$-protocol is a UFCMA-secure DS scheme in the ROM under the DL assumption (for prime-order $\mathrm{GroupGen}$).

*(Caveat: Active security of IDSs and alternative $\Sigma$-protocols such as Okamoto's protocol are omitted here.)*

---

## 6. Chapter 8 — Post-Quantum Cryptography and Lattices [Provisional — Bianco 2025/26]

### 8.1 Lattices and Post-Quantum Hardness

All classical number-theoretic assumptions from Chapters 5–6 (Factoring, RSA, DL, CDH, DDH) break against **Quantum Turing Machines (QTMs)** via **Shor's algorithm**. **Post-Quantum Cryptography (PQC)** (standardized by NIST since 2017) seeks schemes executable on classical computers yet conjectured hard against quantum attackers, prominently via **lattices**.

#### Definition 8.1 (Lattice and Worst-Case Lattice Problems)

Given $n$ linearly independent basis vectors $b_1, \dots, b_n \in \mathbb{R}^n$ as columns of a full-rank matrix $B \in \mathbb{R}^{n \times n}$, the **lattice** $L(B)$ is the discrete additive subgroup $L(B) = \{Bz \mid z \in \mathbb{Z}^n\}$. Any **unimodular matrix** $U \in \mathbb{Z}^{n \times n}$ ($\det(U) = \pm 1$) yields an equivalent basis $L(BU) = L(B)$. The **$i$-th successive minimum** $\lambda_i(L)$ is the smallest $r > 0$ such that $L$ contains $i$ linearly independent vectors of Euclidean norm $\le r$; in particular, $\lambda_1(L) = \min_{v \in L \setminus \{\vec{0}\}} \|v\|_2$.

Three worst-case lattice problems (parameterized by approximation factor $\gamma(n) \ge 1$) are conjectured quantum-hard:
- **Shortest Vector Problem ($\mathrm{SVP}_\gamma$):** Given basis $B$, find $v \in L(B) \setminus \{\vec{0}\}$ with $\|v\|_2 \le \gamma(n)\lambda_1(L(B))$.
- **Shortest Independent Vectors Problem ($\mathrm{SIVP}_\gamma$):** Given $B$, find $n$ linearly independent vectors $v_1, \dots, v_n \in L(B) \setminus \{\vec{0}\}$ with $\|v_i\|_2 \le \gamma(n)\lambda_n(L(B))$.
- **Gap Shortest Vector Problem ($\mathrm{GapSVP}_\gamma$):** Given $B$, decide the promise problem whether $\lambda_1(L(B)) \le 1$ or $\lambda_1(L(B)) > \gamma(n)$.

#### The Shortest Integer Solution (SIS) Problem

**$\mathrm{SIS}_{n, q, \beta, m}$:** Given $A \in_R \mathbb{Z}_q^{n \times m}$, find $z \in \mathbb{Z}^m \setminus \{\vec{0}\}$ such that $Az \equiv \vec{0} \pmod q$ and $\|z\|_2 \le \beta$.
- We require $\beta < q$ (otherwise $(q, 0, \dots, 0)^T$ is trivial, and without a norm bound Gaussian elimination solves $Az \equiv \vec{0}$).
- Whenever $m > n \log_2 q$ and $\beta \ge \sqrt{m}$, $2^m > q^n$ ensures by pigeonhole that two distinct $x \neq x' \in \{0,1\}^m$ satisfy $Ax \equiv Ax' \pmod q$, so $z = x - x' \in \{-1, 0, 1\}^m \setminus \{\vec{0}\}$ solves SIS.
- **CRH from SIS:** Restricting $h_A(x) = Ax \bmod q$ to binary vectors $h_A : \{0,1\}^m \to \mathbb{Z}_q^n$ yields a **post-quantum CRH** under $\mathrm{SIS}_{n, q, \sqrt{m}, m}$ (which reduces from worst-case $\mathrm{SIVP}_\gamma$ / $\mathrm{GapSVP}_\gamma$).

---

### 8.2 Building Cryptographic Tools Through Lattices

#### Learning With Errors (LWE)

Fix $(n, q, \chi, m)$ where $\chi$ is an error distribution over $\mathbb{Z}$ concentrated on small magnitudes ($\Pr[|e| > \alpha q : e \leftarrow \chi] \le \mathrm{negl}(\lambda)$ for $\alpha \ll 1$). For secret $\vec{s} \in \mathbb{Z}_q^n$, the **LWE distribution** $A_{\vec{s}, \chi}$ samples $\vec{a} \in_R \mathbb{Z}_q^n$ and $e \leftarrow \chi$ and outputs $(\vec{a}, \langle \vec{s}, \vec{a} \rangle + e \bmod q)$. In matrix form over $m$ samples (columns of $A \in_R \mathbb{Z}_q^{n \times m}$), $\vec{b}^T = \vec{s}^T A + \vec{e}^T \pmod q$ ($\vec{e} \leftarrow \chi^m$).
- **Search-LWE:** Recover $\vec{s}$ from $(A, \vec{b})$ (trivial via Gaussian elimination when $\vec{e} = \vec{0}$, conjectured quantum-hard with noise).
- **Assumption 8.1 (Decisional-LWE):** For $\vec{s} \in_R \mathbb{Z}_q^n$, $(A_{\vec{s}, \chi})^m \approx_c U\big((\mathbb{Z}_q^n \times \mathbb{Z}_q)^m\big)$, i.e., $(A, \vec{s}^T A + \vec{e}^T \bmod q)$ is computationally indistinguishable from uniform over $\mathbb{Z}_q^{n \times m} \times \mathbb{Z}_q^m$. (Hard from worst-case $\mathrm{GapSVP}_\gamma$ via Regev's quantum reduction and Peikert's classical variant.)

#### Algorithm 8.1 & Theorem 8.1 (Regev's PKE Scheme)

Let $m \ge (n+1)\log_2 q + \omega(\log \lambda)$. For 1-bit messages $\mu \in \{0,1\}$:
- $\mathrm{KGen}(1^\lambda)$: sample $\vec{s} \in_R \mathbb{Z}_q^n$, $A \in_R \mathbb{Z}_q^{n \times m}$, and $\vec{e} \leftarrow \chi^m$; set $\vec{b}^T = \vec{s}^T A + \vec{e}^T \bmod q$; output
  $$pk = \hat{A} = \begin{bmatrix} A \\ \vec{b}^T \end{bmatrix} \in \mathbb{Z}_q^{(n+1)\times m}, \qquad sk = \vec{s} \in \mathbb{Z}_q^n.$$
- $\mathrm{Enc}(pk, \mu)$: sample $\vec{r} \in_R \{0,1\}^m$ and output $\vec{c} = \hat{A}\vec{r} + \begin{bmatrix} \vec{0} \\ \mu \lfloor q/2 \rfloor \end{bmatrix} \bmod q \in \mathbb{Z}_q^{n+1}$.
- $\mathrm{Dec}(sk, \vec{c})$: compute $v = \begin{bmatrix} -\vec{s}^T & 1 \end{bmatrix}\vec{c} \bmod q$ represented in $(-\lfloor q/2 \rfloor, \lfloor q/2 \rfloor]$; output $1$ if $|v| > q/4$ (closer to $\lfloor q/2 \rfloor$ than to $0$), else $0$.

**Correctness:** Since $[-\vec{s}^T, 1]\hat{A} = -\vec{s}^T A + \vec{b}^T \equiv \vec{e}^T \pmod q$, we obtain $v \equiv \langle \vec{e}, \vec{r} \rangle + \mu \lfloor q/2 \rfloor \pmod q$. Whenever $|\langle \vec{e}, \vec{r} \rangle| < \lfloor q/2 \rfloor / 2$ (holding w.p. $1 - \mathrm{negl}(\lambda)$ for $\alpha \ll 1/\sqrt{m}$), $\mathrm{Dec}$ recovers $\mu$. Multi-bit messages $\mu \in \{0,1\}^\ell$ are encrypted bit-by-bit.

**Theorem 8.1:** Under Decisional-LWE (with $m \ge (n+1)\log_2 q + \omega(\log \lambda)$), Regev's PKE is CPA-secure.

**Proof (sketch).**
1. *Hybrid 1:* By Assumption 8.1, $\hat{A}$ is computationally indistinguishable from a uniform matrix $M \in_R \mathbb{Z}_q^{(n+1)\times m}$.
2. *Hybrid 2:* Over $M \in_R \mathbb{Z}_q^{(n+1)\times m}$, $h_M(\vec{r}) = M\vec{r} \bmod q$ ($\{0,1\}^m \to \mathbb{Z}_q^{n+1}$) is universal (for $\vec{r} \neq \vec{r}'$, some coordinate differs by $\pm 1$, giving $\Pr_M[M(\vec{r} - \vec{r}') \equiv \vec{0}] = q^{-(n+1)}$). Since $\vec{r} \in_R \{0,1\}^m$ has min-entropy $m \ge (n+1)\log_2 q + \omega(\log \lambda)$, the Leftover Hash Lemma implies $(M, M\vec{r} \bmod q)$ is statistically $\mathrm{negl}(\lambda)$-close to $(M, \vec{v})$ for $\vec{v} \in_R \mathbb{Z}_q^{n+1}$, hiding $\mu_b^*$ statistically. $\blacksquare$

#### Post-Quantum Signatures: Lyubashevsky's $\Sigma$-Protocol and Rejection Sampling

Fix $A \in_R \mathbb{Z}_q^{n \times m}$ ($m \ge 2n\log_2 q$), $sk = \vec{x} \in_R \{0,1\}^m$, and $pk = (A, \vec{u} = A\vec{x} \bmod q)$.
- *Attempt 1 ($\vec{y} \in_R \mathbb{Z}_q^m, \beta \in_R \mathbb{Z}_q, \vec{\gamma} = \beta\vec{x} + \vec{y} \bmod q$):* HVZK holds ($\vec{\alpha} = A\vec{\gamma} - \beta\vec{u} \bmod q$), but soundness fails because Gaussian elimination solves $A\vec{\gamma} \equiv \vec{\alpha} + \beta\vec{u} \pmod q$ without knowing a short secret (and dividing $\vec{\gamma} - \vec{\gamma}'$ by $(\beta - \beta')^{-1} \bmod q$ destroys shortness).
- *Attempt 2 ($\vec{y} \in_R \{0,1\}^m, \beta \in_R \{0,1\}, \vec{\gamma} = \beta\vec{x} + \vec{y} \in \mathbb{Z}^m$ with $\|\vec{\gamma}\|_\infty \le 2$):* Special soundness holds ($\vec{\gamma}_1 - \vec{\gamma}_0$ is a short preimage), but HVZK fails because when $\beta = 1$, $\gamma_i = 0 \implies x_i = 0$ and $\gamma_i = 2 \implies x_i = 1$, leaking secret bits.

**Algorithm 8.2 (Lyubashevsky's $\Sigma$-Protocol with Rejection Sampling):**
1. $P_1(pk, sk)$: sample $\vec{y} \in_R \{0, \dots, 5m - 1\}^m$ and send $\vec{\alpha} = A\vec{y} \bmod q$.
2. $V_1(pk, \vec{\alpha})$: sample and send $\beta \in_R \{0,1\}$.
3. $P_2(pk, sk, \vec{\alpha}, \beta, \vec{y})$: compute $\vec{\gamma} = \beta\vec{x} + \vec{y} \in \mathbb{Z}^m$. **Rejection check:** if $\vec{\gamma} \notin \{1, \dots, 5m - 2\}^m$ (i.e., any $\gamma_i \in \{0, 5m-1, 5m\}$), **ABORT** and restart; otherwise send $\vec{\gamma}$.
4. $V_2(pk, \vec{\alpha}, \beta, \vec{\gamma})$: output $1$ iff $A\vec{\gamma} \equiv \vec{\alpha} + \beta\vec{u} \pmod q$ and $\vec{\gamma} \in \{1, \dots, 5m - 2\}^m$.

For every $\vec{x} \in \{0,1\}^m$ and $\beta \in \{0,1\}$, each coordinate survives w.p. $1 - \frac{2}{5m}$, so a round succeeds without aborting w.p.
$$\left(1 - \frac{2}{5m}\right)^m \approx e^{-2/5} \approx 0.6703$$
($O(1)$ expected tries; $128$ repetitions amplify soundness error from $1/2$ to $2^{-128}$).

**Proposition 8.1 & Corollary 8.1:** Lyubashevsky's protocol satisfies (perfect) HVZK (conditioned on not aborting, $\vec{\gamma}$ is uniform on $\{1, \dots, 5m-2\}^m$ independent of $\vec{x}, \beta$, so $\mathrm{Sim}(pk)$ samples $\beta \in_R \{0,1\}$, $\vec{\gamma} \in_R \{1, \dots, 5m-2\}^m$, and sets $\vec{\alpha} = A\vec{\gamma} - \beta\vec{u} \bmod q$) and special soundness under SIS (accepting $(\vec{\alpha}, 0, \vec{\gamma}_0)$ and $(\vec{\alpha}, 1, \vec{\gamma}_1)$ yield short $\vec{x}' = \vec{\gamma}_1 - \vec{\gamma}_0$ with $\|\vec{x}'\|_\infty \le 5m - 3$ and $A\vec{x}' \equiv \vec{u} \pmod q$, so $\vec{x}' - \vec{x}$ solves SIS whenever $\vec{x}' \neq \vec{x}$). Applying Fiat–Shamir with aborts yields a UFCMA-secure post-quantum signature scheme in the ROM.

#### Lattice Trapdoors and the Gadget Matrix $G$

For **hash-and-sign** signatures ($A\vec{x} \equiv H(\mu) \pmod q$ with short $\vec{x}$), define the **gadget vector** $\vec{g} = [1, 2, \dots, 2^{\ell-1}]^T \in \mathbb{Z}_q^\ell$ ($\ell = \lceil \log_2 q \rceil$):
- *Easy SIS:* Any $u \in \mathbb{Z}_q$ with binary expansion $u = \sum_{i=1}^\ell b_i 2^{i-1}$ ($b_i \in \{0,1\}$) has short preimage $\vec{x} = (b_1, \dots, b_\ell)^T \in \{0,1\}^\ell$ satisfying $\langle \vec{g}, \vec{x} \rangle \equiv u \pmod q$.
- *Easy LWE ($q = 2^\ell$):* Given $b_i \equiv s \cdot 2^{i-1} + e_i \pmod{2^\ell}$ ($|e_i| < q/4$) for $s = \sum_{j=1}^\ell s_j 2^{j-1}$ ($s_1$ LSB, $s_\ell$ MSB), multiplying by $2^{\ell-1}$ annihilates $j \ge 2$ mod $2^\ell$, leaving $b_\ell \equiv s_1 \cdot \frac{q}{2} + e_\ell \pmod q$. Rounding recovers the LSB $s_1$, subtracting $s_1 2^{\ell-2}$ from $b_{\ell-1}$ next isolates $s_2$, and iterating recovers $s$ from LSB to MSB.

Extending $\vec{g}^T$ via $G = I_n \otimes \vec{g}^T \in \mathbb{Z}_q^{n \times n\ell}$:
$$G = \begin{bmatrix}
1 & 2 & \cdots & 2^{\ell-1} & 0 & \cdots & 0 & \cdots & 0 \\
0 & 0 & \cdots & 0 & 1 & \cdots & 2^{\ell-1} & \cdots & 0 \\
\vdots & & & & & \ddots & & & \vdots \\
0 & 0 & \cdots & 0 & 0 & \cdots & 0 & \cdots & 2^{\ell-1}
\end{bmatrix}.$$
For any invertible $H \in \mathbb{Z}_q^{n \times n}$, $(HG)\vec{z} \equiv \vec{u} \pmod q$ reduces to $G\vec{z} \equiv H^{-1}\vec{u} \pmod q$, solvable coordinate-wise in $\{0,1\}^{n\ell}$. Thus a **short** matrix $R \in \mathbb{Z}^{m \times n\ell}$ satisfying $AR \equiv HG \pmod q$ acts as a **lattice trapdoor** for $A$: setting $\vec{x} = R\vec{z}$ yields a short vector with $A\vec{x} = AR\vec{z} \equiv HG\vec{z} \equiv \vec{u} \pmod q$.

*(Caveat: Algorithms for sampling $(A, R)$ together—e.g. Micciancio–Peikert—and Gaussian perturbation so $\vec{x}$ does not leak $R$ are omitted here.)*

---

## 7. Chapter 9 — Identity-Based Encryption [Provisional — Bianco 2025/26]

### 9.1 Encryption with a Central Authority

**Identity-Based Encryption (IBE)** eliminates public-key certificates by letting any arbitrary string $\mathrm{ID} \in \mathcal{ID}$ (such as an email address) serve directly as a user's public key, backed by a central Private Key Generator (PKG) holding a master secret $msk$ (trading PKI overhead for **key escrow**).

#### Definition 9.1 (IBE Scheme) and Security Notions

An **IBE scheme** $\Pi = (\mathrm{Setup}, \mathrm{KGen}, \mathrm{Enc}, \mathrm{Dec})$ consists of four PPT algorithms:
- $\mathrm{Setup}(1^\lambda) \to (mpk, msk)$: outputs master public and secret keys;
- $\mathrm{KGen}(msk, \mathrm{ID}) \to d_{\mathrm{ID}}$: derives a secret key for $\mathrm{ID} \in \mathcal{ID}$;
- $\mathrm{Enc}(mpk, \mathrm{ID}, m) \to c$: encrypts $m \in \mathcal{M}$ under $(mpk, \mathrm{ID})$;
- $\mathrm{Dec}(d_{\mathrm{ID}}, c) \to m$: decrypts $c$ with $d_{\mathrm{ID}}$;

satisfying **correctness**: $\Pr[\mathrm{Dec}(d_{\mathrm{ID}}, \mathrm{Enc}(mpk, \mathrm{ID}, m)) = m] = 1$ (or $\ge 1 - \mathrm{negl}(\lambda)$).

- **$\mathrm{Game}^{\mathrm{ID\text{-}CPA}}_{\Pi, \mathcal{A}}(\lambda, b)$:**
  1. Challenger sends $mpk$ from $(mpk, msk) \leftarrow \mathrm{Setup}(1^\lambda)$ to $\mathcal{A}$.
  2. $\mathcal{A}$ adaptively queries identities $\mathrm{ID}_i$ and receives $d_{\mathrm{ID}_i} \leftarrow \mathrm{KGen}(msk, \mathrm{ID}_i)$.
  3. $\mathcal{A}$ outputs $(\mathrm{ID}^*, m_0^*, m_1^*)$ ($|m_0^*| = |m_1^*|$, $\mathrm{ID}^*$ unqueried) and receives $c^* \leftarrow \mathrm{Enc}(mpk, \mathrm{ID}^*, m_b^*)$.
  4. $\mathcal{A}$ queries further identities $\mathrm{ID}'_i \neq \mathrm{ID}^*$ and outputs $b' \in \{0,1\}$.
  $\Pi$ is **ID-CPA secure** if $\mathrm{Game}^{\mathrm{ID\text{-}CPA}}(\lambda, 0) \approx_c \mathrm{Game}^{\mathrm{ID\text{-}CPA}}(\lambda, 1)$ for all PPT $\mathcal{A}$.
- **Selective ID-CPA ($\mathrm{Sel\text{-}ID\text{-}CPA}$):** Weaker variant where $\mathcal{A}$ must commit to $\mathrm{ID}^*$ *before* receiving $mpk$.

#### Definition 9.2 & Assumption 9.1 (Bilinear Groups and DBDH)

$\mathrm{BilinGen}(1^\lambda)$ outputs a **bilinear group** $(G, G_T, q, g, \hat{e})$ where $G = \langle g \rangle$ and $G_T$ are cyclic groups of prime order $q$, and $\hat{e} : G \times G \to G_T$ is efficiently computable, **bilinear** ($\forall u, v \in G,\; \forall a, b \in \mathbb{Z}_q,\; \hat{e}(u^a, v^b) = \hat{e}(u, v)^{ab}$), and **non-degenerate** ($\hat{e}(g, g) \neq 1_{G_T}$). Note that **DDH fails in $G$** because $\hat{e}(g, Z) \stackrel{?}{=} \hat{e}(X, Y)$ tests $Z \stackrel{?}{=} g^{xy}$; instead we use:

**Assumption 9.1 (DBDH):** For $(G, G_T, q, g, \hat{e}) \leftarrow \mathrm{BilinGen}(1^\lambda)$, $a, b, c \in_R \mathbb{Z}_q$, and $T \in_R G_T$,
$$\big(G, G_T, q, g, \hat{e},\; g^a, g^b, g^c,\; \hat{e}(g, g)^{abc}\big) \approx_c \big(G, G_T, q, g, \hat{e},\; g^a, g^b, g^c,\; T\big).$$

#### Algorithm 9.1 & Theorem 9.1 (Boneh–Boyen $\mathrm{BB}_1$ IBE Scheme)

*(Note: This standard-model scheme is Boneh–Boyen $\mathrm{BB}_1$, 2004, achieving Sel-ID-CPA without a random oracle—distinct from Boneh–Franklin, 2001, which uses a random oracle for adaptive ID-CPA.)*

Over $\mathcal{ID} = \mathbb{Z}_q$ and $\mathcal{M} = G_T$:
- $\mathrm{Setup}(1^\lambda)$: run $(G, G_T, q, g, \hat{e}) \leftarrow \mathrm{BilinGen}(1^\lambda)$, sample $\alpha \in_R \mathbb{Z}_q$ and $g_2, h \in_R G$, set $g_1 = g^\alpha$, and output $mpk = (G, G_T, q, g, \hat{e}, g_1, g_2, h)$ and $msk = g_2^\alpha$. Define $F(\mathrm{ID}) = g_1^{\mathrm{ID}} \cdot h$.
- $\mathrm{KGen}(msk, \mathrm{ID})$: sample $r \in_R \mathbb{Z}_q$ and output $d_{\mathrm{ID}} = (d_0, d_1) = \big(msk \cdot F(\mathrm{ID})^r,\; g^r\big)$.
- $\mathrm{Enc}(mpk, \mathrm{ID}, m)$: sample $\gamma \in_R \mathbb{Z}_q$ and output $c = (u, v, w) = \big(\hat{e}(g_1, g_2)^\gamma \cdot m,\; g^\gamma,\; F(\mathrm{ID})^\gamma\big)$.
- $\mathrm{Dec}\big((d_0, d_1), (u, v, w)\big)$: output $\dfrac{u \cdot \hat{e}(d_1, w)}{\hat{e}(v, d_0)}$.

**Correctness:**
$$\frac{u \cdot \hat{e}(d_1, w)}{\hat{e}(v, d_0)}
= \frac{\hat{e}(g^\alpha, g_2)^\gamma \cdot m \cdot \hat{e}(g^r, F(\mathrm{ID})^\gamma)}{\hat{e}(g^\gamma, g_2^\alpha F(\mathrm{ID})^r)}
= \frac{\hat{e}(g, g_2)^{\alpha\gamma} \cdot m \cdot \hat{e}(g, F(\mathrm{ID}))^{r\gamma}}{\hat{e}(g, g_2)^{\alpha\gamma} \cdot \hat{e}(g, F(\mathrm{ID}))^{r\gamma}} = m.$$

**Theorem 9.1:** Under the DBDH assumption, $\mathrm{BB}_1$ (Algorithm 9.1) is Selective-ID-CPA secure.

**Proof.** Fix $b \in \{0,1\}$, let $G(\lambda, b) = \mathrm{Game}^{\mathrm{Sel\text{-}ID\text{-}CPA}}_{\Pi, \mathcal{A}}(\lambda, b)$, and define hybrid $H(\lambda)$ identical to $G(\lambda, b)$ except that $u$ in $c^*$ is uniform in $G_T$ (independent of $b$). Construct a PPT DBDH distinguisher $\mathcal{A}'(G, G_T, q, g, \hat{e}, X = g^\alpha, Y = g^\beta, Z = g^\gamma, T)$:
1. Receive $\mathrm{ID}^* \in \mathbb{Z}_q$ from $\mathcal{A}$.
2. Sample $a \in_R \mathbb{Z}_q$, set $g_1 = X$, $g_2 = Y$, and $h = X^{-\mathrm{ID}^*} g^a$ (so $F(\mathrm{ID}) = X^{\mathrm{ID} - \mathrm{ID}^*} g^a$ and $F(\mathrm{ID}^*) = g^a$), and send $mpk$.
3. Answer each key-extraction query $\mathrm{ID}_i \neq \mathrm{ID}^*$ by sampling $r_i \in_R \mathbb{Z}_q$ and returning
   $$d_0^{(i)} = Y^{-a/(\mathrm{ID}_i - \mathrm{ID}^*)} \cdot F(\mathrm{ID}_i)^{r_i}, \qquad d_1^{(i)} = g^{r_i} \cdot Y^{-1/(\mathrm{ID}_i - \mathrm{ID}^*)}$$
   (well-defined since $q$ is prime and $\mathrm{ID}_i \neq \mathrm{ID}^*$).
4. On challenge $(m_0^*, m_1^*)$, return $c^* = (T \cdot m_b^*,\; Z,\; Z^a)$; answer further queries $\mathrm{ID}'_i \neq \mathrm{ID}^*$ via Step 3; output $\mathcal{A}$'s guess $b'$.

*Verification:* (i) $mpk$ has independent uniform $(g_1, g_2, h)$. (ii) Defining $\tilde{r}_i = r_i - \frac{\beta}{\mathrm{ID}_i - \mathrm{ID}^*} \bmod q$ (uniform in $\mathbb{Z}_q$) yields $d_1^{(i)} = g^{\tilde{r}_i}$ and
$$
\begin{aligned}
d_0^{(i)}
&= g^{-a\beta / (\mathrm{ID}_i - \mathrm{ID}^*)} \cdot \big(X^{\mathrm{ID}_i - \mathrm{ID}^*} g^a\big)^{r_i} \\
&= g^{\alpha\beta} \cdot g^{-\alpha\beta - a\beta / (\mathrm{ID}_i - \mathrm{ID}^*)} \cdot \big(X^{\mathrm{ID}_i - \mathrm{ID}^*} g^a\big)^{r_i} \\
&= g_2^\alpha \cdot \big(g^{\alpha(\mathrm{ID}_i - \mathrm{ID}^*) + a}\big)^{-\beta/(\mathrm{ID}_i - \mathrm{ID}^*)} \cdot F(\mathrm{ID}_i)^{r_i} = msk \cdot F(\mathrm{ID}_i)^{\tilde{r}_i},
\end{aligned}
$$
matching real extraction keys identically. (iii) When $T = \hat{e}(g,g)^{\alpha\beta\gamma}$, $c^* = (\hat{e}(g_1, g_2)^\gamma m_b^*, g^\gamma, F(\mathrm{ID}^*)^\gamma)$ matches $G(\lambda, b)$; when $T \sim U_{G_T}$, $u = T \cdot m_b^*$ is uniform in $G_T$ independent of $m_b^*$, matching $H(\lambda)$. By DBDH, $G(\lambda, 0) \approx_c H(\lambda) \approx_c G(\lambda, 1)$. $\blacksquare$

---

### 9.2 Applications of IBE Schemes

#### Canetti–Halevi–Katz (CHK) Transform: CCA-2 PKE from Selective-ID-CPA IBE

Combining a Selective-ID-CPA IBE $\Pi$ and a **(1-time) strongly UFCMA-secure** signature scheme $\Pi' = (\mathrm{KGen}', \mathrm{Sign}', \mathrm{Vrfy}')$ (with $vk \in \mathcal{ID}$) produces a CCA-2 PKE scheme $\Pi''$:
- $\mathrm{KGen}''(1^\lambda)$: run $(mpk, msk) \leftarrow \mathrm{Setup}(1^\lambda)$, output $ek = mpk$, $dk = msk$.
- $\mathrm{Enc}''(ek, m)$: generate $(vk, sk) \leftarrow \mathrm{KGen}'(1^\lambda)$, encrypt $c \leftarrow \mathrm{Enc}(ek, vk, m)$ under identity $vk$, sign $\sigma \leftarrow \mathrm{Sign}'(sk, c)$, and output $(c, vk, \sigma)$.
- $\mathrm{Dec}''(dk, (c, vk, \sigma))$: if $\mathrm{Vrfy}'(vk, c, \sigma) = 0$, return $\perp$; otherwise derive $d_{vk} \leftarrow \mathrm{KGen}(msk, vk)$ and output $\mathrm{Dec}(d_{vk}, c)$.

**Theorem 9.2 (CHK):** If $\Pi$ is Selective-ID-CPA secure and $\Pi'$ is strongly (1-time) UFCMA-secure, then $\Pi''$ is CCA-2 secure. *(Proof omitted; sketch: the reduction samples $(vk^*, sk^*)$ upfront, commits to $\mathrm{ID}^* = vk^*$, answers decryption queries with $vk \neq vk^*$ via IBE extraction queries, and rejects forged queries with $vk = vk^*$ via strong unforgeability—ordinary UFCMA would fail if an adversary could produce a second valid signature $\tilde{\sigma} \neq \sigma^*$ on $(vk^*, c^*)$.)*

#### Complexity Leveraging

**Theorem 9.3:** Any $(t, q, \varepsilon)$-Selective-ID-CPA IBE is $(t, q, N\varepsilon)$-ID-CPA secure for $N = |\mathcal{ID}|$ (by guessing $\mathrm{ID}^* \in_R \mathcal{ID}$ before seeing $mpk$, proving equivalence when $|\mathcal{ID}| = \mathrm{poly}(\lambda)$ and incurring an exponential factor-$N$ loss otherwise).

#### Naor's Transform: Digital Signatures from IBE

In $\mathrm{Game}^{\mathrm{OW\text{-}ID\text{-}CPA}}_{\Pi, \mathcal{A}}(\lambda)$ (One-Way ID-CPA): $\mathcal{A}(mpk)$ adaptively queries extractions $\mathrm{ID}_i$, submits an unqueried $\mathrm{ID}^*$, receives $c^* \leftarrow \mathrm{Enc}(mpk, \mathrm{ID}^*, \mu^*)$ for $\mu^* \in_R \mathcal{M}$, queries further $\mathrm{ID}'_i \neq \mathrm{ID}^*$, and wins iff it outputs $\mu' = \mu^*$.

**Proposition 9.1:** If $\Pi$ is ID-CPA secure and $1/|\mathcal{M}| = \mathrm{negl}(\lambda)$, then $\Pi$ is OW-ID-CPA secure. *(By ID-CPA, $\mathrm{Enc}(mpk, \mathrm{ID}^*, \mu^*)$ is indistinguishable from $\mathrm{Enc}(mpk, \mathrm{ID}^*, \mu_0)$ for fixed $\mu_0$ independent of $\mu^* \in_R \mathcal{M}$, which can be guessed w.p. $\le 1/|\mathcal{M}|$.)*

**Naor's Transform:** Given OW-ID-CPA IBE $\Pi$, define DS $\Pi^*$ over $\mathcal{M}^* = \mathcal{ID}$:
- $\mathrm{KGen}^*(1^\lambda)$: run $(mpk, msk) \leftarrow \mathrm{Setup}(1^\lambda)$, set $vk = mpk, sk = msk$.
- $\mathrm{Sign}^*(sk, m)$: output $\sigma = d_m \leftarrow \mathrm{KGen}(msk, m)$.
- $\mathrm{Vrfy}^*(vk, m, \sigma)$: sample $\mu \in_R \mathcal{M}$ and $c \leftarrow \mathrm{Enc}(mpk, m, \mu)$; output $1$ iff $\mathrm{Dec}(\sigma, c) = \mu$.

**Theorem 9.4:** If $\Pi$ is OW-ID-CPA secure (with correctness $\ge 1 - \mathrm{negl}(\lambda)$), then $\Pi^*$ is UFCMA-secure. *(Proof sketch: a reduction forwards signing queries $m_i$ to the OW-ID-CPA extraction oracle, submits its fresh forgery message $m^*$ as $\mathrm{ID}^*$, and outputs $\mathrm{Dec}(\sigma^*, c^*)$, recovering $\mu^*$ whenever $\mathrm{Vrfy}^*$ accepts.)*

*(Caveat: Full proofs of Theorems 9.2–9.4 and Proposition 9.1 are omitted in Bianco's text and sketched concisely above.)*
