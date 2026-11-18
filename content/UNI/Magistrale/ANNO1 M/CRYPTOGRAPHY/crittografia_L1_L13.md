# Cryptography — Unified Study Compendium (Sapienza 2026/27 + Full Syllabus)

> **Purpose:** Self-contained single-file Markdown + LaTeX reference for interactive exam prep with ChatGPT (Prof. Daniele Venturi, Sapienza University of Rome, A.Y. 2026/27).
> - **Parts I–IV (Lectures 1–13):** Verified against **2026/27** slides (`L1–9, 11–13`), transcripts (`L3–10, 12–13`; no local transcript for `L1, L2, L11`; no separate slide PDF for `L10`), and course notes; supersedes prior years on notation/conventions.
> - **Part V (Post-L13, §4.7 end–Ch. 9):** `[Provisional — Bianco 2025/26 + Katz–Lindell]`, repaired for mathematical typos, pending 2026/27 Lectures 14+.

---

## ⚠️ Exam Scope, Omitted Proofs, Exercises & Professor Advice (Lectures 1–13)

> **Transcript Note:** Venturi rarely says *"omitted"* verbatim; he marks skipped proofs/topics via *"I'm not going to prove this"*, *"proof is hard / we will not do it"*, *"leave as exercise / homework"*, or *"fill the dots"*. No local audio transcript exists for Lectures 1, 2, or 11 (L11 checked across all 23 slide pages).

### A. Omitted, Sketched, and Deferred Proofs (Lectures 1–13)

| Lecture | Topic / Theorem | Classroom Status (Transcript / Slides) |
| :--- | :--- | :--- |
| **L3 (L2 ref)** | Matrix $\det(A) \neq 0 \bmod p$ & $\operatorname{SD}(X;Y)$ = max advantage | **Not proved** (*"simple observation"* / standard linear algebra) |
| **L3** | **Thm. 2.4:** $t$-time MAC key size $\ge (t+1)\lambda$ | **Stated without proof** (*"combinatorial argument like Shannon... not so important"*) |
| **L3–L4** | Step-3 PRNG `Refresh` (`/dev/random`/`Fortuna`) & multi-source extractors | **Skipped** (*"not going to cover... a little bit more involved"*) |
| **L4** | Formal Turing-machine tapes & formal $P, NP$ definitions | **Intuition only** (*"not going to define formally"*; concrete $(T,\varepsilon)$ also avoided) |
| **L5 / L6 / L13** | **Thm. 5.1:** General $\text{OWF} \implies \text{PRG}$ (non-permutation Step 2) | **Proof omitted** (*"proof is hard... not practical... we will not do it"*); forward security of PRGs also skipped. **Step 1 (Hybrid Stretch Amp.)** & **OWP route** covered in full |
| **L6** | **Goldreich–Levin Property 2:** $\langle x,r \rangle$ hard-core for $f(x)\parallel r$ | **Proof omitted** (*"will not prove it here... a bit complicated"*); ideal all-$r$ intuition only. (**Property 1**, $g$ OWF, proved in full) |
| **L7** | **PRF-OTP Lemma 1** 10-line probability equations & PKE-from-PRF barrier | Chalk equations skipped (*"maybe ten lines... same as PRG-OTP"*, proved here); black-box PKE from PRF stated impossible |
| **L8** | **GGM Claim 8.1** ($\mathrm{Game}_0 \approx_c \mathrm{Game}_1$) | **Sketched briefly** (*"exercise for the minute"*; full proof here) |
| **L9** | **4-Round Feistel Strong PRP** & **CBC/CFB/OFB** CPA proofs | 4-round SPRP **not covered** (only 2-rd Core Lemma & 3-rd PRP proved); CBC/CFB/OFB CPA proofs **omitted** (*"similar... slightly more challenging"*). **Only CTR** proved in full |
| **L10** | **CTR Step 1** ($G_b \approx_c H_b$ direct PRF reduction) | Skipped as basic (*"simple exercise... advise you to try"*; full proof here) |
| **L11** *(slides)* | Raw **CBC-MAC** FIL UF-CMA & **E-CBC-MAC** VIL PRF/MAC | Slide 22: FIL marked **`EXERCISE`**; VIL E-CBC-MAC stated as **`FACT`** without proof |
| **L12** | **$\text{CPA} + \text{AUTH} \implies \text{CCA}$** formal write-up | Slides sketch direct split; transcript recommends 2-reduction $H_\bot$ proof & leaves full write-up as practice (*"fill the dots"*) |
| **L12–L13** | Homomorphic Enc., TLS 1.2 MtE proof, key agility, rand. MACs, SHA-3 Sponge, Step-1 Compression internals | **Context only / out of depth** (*"not studying in a deep manner / not going to study"*) |
| **L13** | **Merkle Tree** inclusion protocol & CR proof; **VIL Strengthened MD** | Inclusion protocol skipped; Merkle CR omitted (*"same proof"* as MD); VIL MD deferred to **L14** |

### B. Classroom Exercises & Homework Ledger

- **L2–L5:** $\varepsilon=0$ MAC impossibility (`L2`); $H_\infty(X)\ge k \implies \operatorname{Col}(X)\le 2^{-k}$ (`L3`); $\operatorname{negl}(\lambda)$ closures (`L4`); triangle ineq. for $\approx_c$ (`L5`); no universal hard-core `f_bad` (`L5->6`). *(All proved here.)*
- **L7:** No unbounded-secure PRF. *(Solved in §7.3.)*
- **L10 (Mid-Course Checkpoint):** Ex. 1 (uniform ciphertexts vs. perfect secrecy); **Ex. 2a** ($n \to 2n$ PRG is OWF, **exam difficulty**); **Ex. 2b `[Tougher Homework]`** ($n \to n+1$ PRG is OWF); Ex. 3 (4 PRF candidates); **Ex. 4 `[Homework]`** (no SKE is unbounded CPA-secure). *(All solved in full.)*
- **L11 (`Slides 5, 22`):** $0 \parallel F_K(m)$ UF-CMA not PRF (`Slide 5`, solved); raw CBC-MAC FIL UF-CMA (`Slide 22 EXERCISE`).
- **L12 (`Slides 6, 13`):** PRF-OTP fails CCA (`Slide 6`, solved); **Break MtE in general** (`Slide 13 & Transcript`, solved).

### C. Prof. Venturi's Exam Calibration, Traps & Strategy Tips

> ### 🎯 KEY EXAM ADVISORIES (Lectures 3, 6, 8, 10, 12)
> 1. **Proof Style Arc (`L3`):** Early LHL combinatorics are dense, whereas **"later in the course the proofs will be much more intuitive."**
> 2. **Two Exercise Types (`L6`):** *(i) Prove secure* (reduction/hybrid) or *(ii) break / disprove in general*. For universal claims (*"for every OWF/PRF"*), build `f_bad`/`F_bad` **on top of an assumed secure primitive** (`L6`, `L10`).
> 3. **Hybrid "Rule of Thumb" (`L8`):** *"If an experiment uses the security of a primitive many times, do a hybrid [argument]"*—tracking **where seed independence** lets $\mathcal{B}$ simulate unused slots. Notice zero-loss **"perfect reductions"** (`L6`) vs. $1/2$ or $1/q$ losses.
> 4. **Direct Exam Difficulty Benchmark (`L10`):** Ex. 2a ($n \to 2n$) is **"the same degree we might expect at exams"**; Ex. 2b ($n \to n+1$) is **"a bit tougher"** (*"at exams, [exercises are] a little bit easier"*). Exam statements will also specify domains/lengths **"more explicitly"**.
> 5. **PRF Proof Traps (`L10` Ex. 3):** Don't fall for single-query uniformity (**Trap 1**: C1 $G'(k)\oplus x$). Before reducing, check if the attacker chooses the primitive's key (**clear advice** to refute C2 $F_x(k)$ with `F_bad`). And **"writing a reduction doesn't mean it is correct"**—verify **domain separation** so internal queries don't collide (C3 vs. C4).
> 6. **Two Hypotheses $\implies$ Two Reductions (`L12`):** For $\text{CPA}+\text{AUTH}\implies\text{CCA}$, *"if I would have to prove this very formally, I would **not** do this reduction directly... make **two reductions**"* via $H_\bot$. Either two-world `Game(...,0/1)` or coin-flip `b <- {0,1}` notation is fine (`L7`).

---

### Table of Contents & Notation Quick Reference

- **Part I (L1–4):** §1 SKE & Perfect Secrecy | §2 Shannon Bound & Unconditional MACs | §3 Extractors & LHL | §4 Computational Security & OWFs
- **Part II (L5–8):** L5 PRGs & Hybrid Argument | L6 Goldreich–Levin & PRG-OTP | L7 PRFs & CPA | L8 GGM (PRF from PRG)
- **Part III (L9–10):** L9 PRPs, 3-Round Luby–Rackoff, Modes & CTR | L10 Mid-Course Exercises & Homework Solutions
- **Part IV (L11–13):** §1 Comp. MACs & CBC-MAC | §2 AE (`CPA+AUTH=>CCA`), E&M, MtE, EtM | §3 EtM Proof & CRHs up to Fixed-Length MD
- **Part V (`[Provisional — Bianco 2025/26]`):** §1 VIL MD, ICM, ROM | §2 Ch. 4 Ex. (4.2–4.6) | §3 Ch. 5 Number Theory | §4 Ch. 6 PKE, RSA, Signatures | §5 Ch. 7 $\Sigma$-Protocols & Fiat–Shamir | §6 Ch. 8 Lattices & PQC | §7 Ch. 9 IBE

| Symbol | Meaning |
| :--- | :--- |
| $\lambda$, $1^\lambda$ | Security parameter (unary input to PPT algorithms) |
| $U_n$, $x \gets X$ | Uniform over $\{0,1\}^n$; $x$ sampled from $X$ (or uniform from set) |
| $\operatorname{negl}(\lambda)$ | Negligible: $< \lambda^{-c}$ for every $c>0$ and large enough $\lambda$ |
| $X \approx_c Y$, $X \approx_s Y$, $X \equiv Y$ | Computational indistinguishability, $\operatorname{SD}(X;Y)\le\operatorname{negl}(\lambda)$, identical distributions |
| $\mathcal{R}(n,m)$, $\mathcal{P}(n,n)$ | All functions $\{0,1\}^n\to\{0,1\}^m$; all permutations on $\{0,1\}^n$ |
| `AUTH`/`INT`, `Weak` vs. `Strong UF-CMA` | Ciphertext integrity; fresh message ($m^*\notin Q$) vs. fresh pair ($(m^*,\tau^*)\notin Q_{\text{pairs}}$) |

---

# Part I — Information-Theoretic Foundations and the Transition to Computational Security (Lectures 1–4)

Modern cryptography replaces ad hoc cipher design with **provable security**, which requires three components: a precise mathematical definition of security, an explicit statement of the assumptions, and a mathematical proof that the construction meets the definition under those assumptions.

---

## 1. Secret-Key Encryption and Perfect Secrecy (Lecture 1)

### 1.1 Communication Goals and Kerckhoffs's Principle

Alice and Bob communicate over a channel observed or tampered with by an adversary, Eve, giving rise to two baseline security goals:

| Security goal | Adversarial threat | Required guarantee |
| --- | --- | --- |
| **Confidentiality** | Eve passively eavesdrops on ciphertext $c$ | Eve learns nothing new about plaintext $m$ beyond her prior knowledge |
| **Integrity** | Eve intercepts $m$ (or $(m,\tau)$) and injects $m' \neq m$ | Bob detects tampering and rejects the forged message |

In **Secret-Key Encryption (SKE)** (symmetric encryption), Alice and Bob share a secret key $k$ chosen uniformly at random in advance. By **Kerckhoffs's principle**, the encryption and decryption algorithms are completely public; security relies *exclusively* on the secrecy of $k$, since a short key is far easier to protect and rotate than an entire algorithm.

```text
Alice (m in M, k <- K) --[Enc(k, m) = c]--> (Eve observes c) --> Bob (knows k, Dec(k, c) = m)
```

An SKE scheme $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ (or $(\operatorname{Gen}, \operatorname{Enc}, \operatorname{Dec})$ where $\operatorname{Gen}$ samples $K \gets \mathcal{K}$ uniformly) is defined over finite sets—key space $\mathcal{K}$, message space $\mathcal{M}$, and ciphertext space $\mathcal{C}$—by deterministic algorithms

$$
\operatorname{Enc} : \mathcal{K} \times \mathcal{M} \to \mathcal{C}, \qquad \operatorname{Dec} : \mathcal{K} \times \mathcal{C} \to \mathcal{M}.
$$

> **Definition 1.1 (Correctness of SKE).** An SKE scheme $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ over $(\mathcal{K}, \mathcal{M}, \mathcal{C})$ is **correct** if
>
> $$
> \forall k \in \mathcal{K},\ \forall m \in \mathcal{M}:\qquad \operatorname{Dec}(k, \operatorname{Enc}(k, m)) = m.
> $$

Correctness ensures functionality, not security: the identity map $\operatorname{Enc}(k, m) = m$ with $\operatorname{Dec}(k, c) = c$ is correct yet provides zero confidentiality.

### 1.2 Unconditional Security and Shannon's Perfect Secrecy

A scheme is **unconditionally (information-theoretically) secure** if its security holds even against an adversary with unlimited computational power, time, and memory (as opposed to computationally bounded adversaries in Lecture 4). Shannon formalized unconditional confidentiality as **perfect secrecy**: observing a ciphertext $c$ leaves Eve's distribution over plaintexts identical to her prior distribution.

> **Definition 1.2 (Perfect Secrecy — Shannon).** Let $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ be an SKE scheme over $(\mathcal{K}, \mathcal{M}, \mathcal{C})$. Let $M$ be a random variable over $\mathcal{M}$ with an arbitrary prior distribution, let $K$ be uniformly distributed over $\mathcal{K}$ independently of $M$, and let $C = \operatorname{Enc}(K, M)$. We say that $\Pi$ is **perfectly secret** if for **every** probability distribution of $M$, every $m \in \mathcal{M}$, and every $c \in \mathcal{C}$ with $\Pr[C = c] > 0$,
>
> $$
> \Pr[M = m \mid C = c] = \Pr[M = m].
> $$

The condition $\Pr[C = c] > 0$ avoids conditioning on a zero-probability event. Even if Eve's prior is skewed (e.g., $\Pr[M = \text{"YES"}] = 0.8$), perfect secrecy guarantees her posterior belief after seeing $c$ remains $0.8$.

### 1.3 The Equivalence Theorem of Perfect Secrecy

Verifying Definition 1.2 over all prior distributions of $M$ is cumbersome. The next theorem provides two equivalent characterizations, the third of which depends only on the uniform key $K$.

> **Theorem 1.1 (Equivalence Theorem of Perfect Secrecy).** Let $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ be an SKE scheme with key $K$ distributed uniformly over $\mathcal{K}$ and independent of $M$. The following three statements are equivalent (where `(i)` and `(ii)` must hold for every distribution of $M$ over $\mathcal{M}$):
>
> - **(i) Perfect secrecy:** For every $M$, every $m \in \mathcal{M}$, and every $c \in \mathcal{C}$ with $\Pr[C = c] > 0$, $\Pr[M = m \mid C = c] = \Pr[M = m]$.
> - **(ii) Statistical independence of $M$ and $C$:** For every $M$, $M \perp C$ (equivalently, mutual information $I(M; C) = 0$): for every $m \in \mathcal{M}$ and $c \in \mathcal{C}$,
>
> $$
> \Pr[M = m, C = c] = \Pr[M = m] \cdot \Pr[C = c].
> $$
>
> - **(iii) Equal ciphertext probabilities:** For every pair $m, m' \in \mathcal{M}$ and every $c \in \mathcal{C}$,
>
> $$
> \Pr_{K \gets \mathcal{K}}[\operatorname{Enc}(K, m) = c] = \Pr_{K \gets \mathcal{K}}[\operatorname{Enc}(K, m') = c].
> $$

Two clarifications prevent common pitfalls with `(iii)`:
1. It holds over a *random* key $K$, not for a fixed key $k$ (where $\operatorname{Enc}(k, m) = \operatorname{Enc}(k, m')$ for $m \neq m'$ would violate correctness).
2. It does *not* make the posterior $\Pr[M = m \mid C = c]$ uniform over $\mathcal{M}$; the posterior still equals Alice's prior $\Pr[M = m]$.

As a quick check, for 1-bit XOR encryption $\operatorname{Enc}(k, m) = k \oplus m$ with $k, m \in \{0,1\}$ and uniform $K$, fixing $c = 1$ gives $\Pr[\operatorname{Enc}(K, 0) = 1] = \Pr[K = 1] = 1/2$ and $\Pr[\operatorname{Enc}(K, 1) = 1] = \Pr[K = 0] = 1/2$, and similarly $1/2 = 1/2$ for $c = 0$.

**Proof of Theorem 1.1.**

- **$(i) \implies (ii)$:** Fix any distribution of $M$, $m \in \mathcal{M}$, and $c \in \mathcal{C}$. If $\Pr[C = c] > 0$, then `(i)` gives $\Pr[M = m] = \Pr[M = m, C = c] / \Pr[C = c]$, so $\Pr[M = m, C = c] = \Pr[M = m]\Pr[C = c]$. If $\Pr[C = c] = 0$, then $\{M = m, C = c\} \subseteq \{C = c\}$ also has probability $0$, so both sides equal $0$. Hence $M \perp C$.
- **$(ii) \implies (iii)$:** Fix $m, m' \in \mathcal{M}$ and $c \in \mathcal{C}$ (for $m = m'$, `(iii)` is trivial). Because `(ii)` holds for *every* distribution of $M$, instantiate `(ii)` with a distribution placing strictly positive probability on both $m$ and $m'$ (e.g., uniform over $\mathcal{M}$), which makes conditioning on $M = m$ and $M = m'$ well-defined. Since $K \perp M$, conditioning $C = \operatorname{Enc}(K, M)$ on $M = m$ fixes the message input without altering the distribution of $K$:

$$
\Pr[\operatorname{Enc}(K, m) = c] = \Pr[\operatorname{Enc}(K, M) = c \mid M = m] = \Pr[C = c \mid M = m] = \Pr[C = c],
$$

where the last step uses $M \perp C$ from `(ii)`. Applying the identical argument to $m'$ gives $\Pr[\operatorname{Enc}(K, m') = c] = \Pr[C = c]$, so $\Pr[\operatorname{Enc}(K, m) = c] = \Pr[\operatorname{Enc}(K, m') = c]$.

- **$(iii) \implies (i)$:** Assume `(iii)`, and fix any distribution of $M$, $m \in \mathcal{M}$, and $c \in \mathcal{C}$ with $\Pr[C = c] > 0$. Summing over messages of positive probability by the Law of Total Probability and using $K \perp M$:

$$
\Pr[C = c]
= \sum_{m' : \Pr[M=m']>0} \Pr[\operatorname{Enc}(K, M) = c \mid M = m']\,\Pr[M = m']
= \sum_{m' : \Pr[M=m']>0} \Pr[\operatorname{Enc}(K, m') = c]\,\Pr[M = m'].
$$

By `(iii)`, $\Pr[\operatorname{Enc}(K, m') = c] = \Pr[\operatorname{Enc}(K, m) = c]$ for every $m'$, so factoring it out gives

$$
\Pr[C = c] = \Pr[\operatorname{Enc}(K, m) = c] \sum_{m' : \Pr[M=m']>0} \Pr[M = m'] = \Pr[\operatorname{Enc}(K, m) = c].
$$

If $\Pr[M = m] = 0$, then $\Pr[M = m \mid C = c] = 0 = \Pr[M = m]$. If $\Pr[M = m] > 0$, then $\Pr[C = c \mid M = m] = \Pr[\operatorname{Enc}(K, m) = c] = \Pr[C = c]$, and Bayes' theorem yields

$$
\Pr[M = m \mid C = c] = \frac{\Pr[C = c \mid M = m]\,\Pr[M = m]}{\Pr[C = c]} = \Pr[M = m]. \qquad \square
$$

### 1.4 The One-Time Pad (OTP)

For fixed length $\ell \in \mathbb{N}^+$, set $\mathcal{K} = \mathcal{M} = \mathcal{C} = \{0, 1\}^\ell$, sample $K \gets \{0,1\}^\ell$ uniformly and independently of $M$, and define

$$
\operatorname{Enc}(k, m) = k \oplus m, \qquad \operatorname{Dec}(k, c) = k \oplus c.
$$

**Correctness** holds because XOR is associative and self-inverse: $\operatorname{Dec}(k, \operatorname{Enc}(k, m)) = k \oplus (k \oplus m) = (k \oplus k) \oplus m = 0^\ell \oplus m = m$.

**Perfect secrecy** follows from Theorem 1.1`(iii)`: for any $m \in \mathcal{M}$ and $c \in \mathcal{C}$, $K \oplus m = c \iff K = c \oplus m$, which is a single fixed key in $\{0,1\}^\ell$, so $\Pr[\operatorname{Enc}(K, m) = c] = 2^{-\ell}$ independently of $m$.

However, OTP has two fundamental limitations:
1. **Key length equals message length:** $|k| = |m| = \ell$.
2. **One-time key only (two-time pad attack):** Encrypting two messages $m_1, m_2$ with the same key $k$ yields $c_1 \oplus c_2 = (k \oplus m_1) \oplus (k \oplus m_2) = m_1 \oplus m_2$, canceling $k$ and leaking the XOR of the plaintexts.

---

## 2. Shannon's Barrier, Game-Based Secrecy, and Unconditional MACs (Lecture 2)

### 2.1 Shannon's Key-Length Lower Bound

The key-length barrier of OTP is inherent to perfect secrecy itself, not a quirk of XOR.

> **Theorem 2.1 (Shannon's Key-Length Bound, 1949).** Let $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ be a non-trivial perfectly secret SKE scheme over $(\mathcal{K}, \mathcal{M}, \mathcal{C})$ (with non-empty $\mathcal{M}, \mathcal{C}$). Then
>
> $$
> |\mathcal{K}| \ge |\mathcal{M}|.
> $$

Note that $|\mathcal{K}|$ and $|\mathcal{M}|$ are set cardinalities: for $\mathcal{M} = \{0,1\}^\ell$, $|\mathcal{K}| \ge 2^\ell$, so fixed-length binary keys need at least $\ell$ bits. Intuitively, if $|\mathcal{K}| < |\mathcal{M}|$, decrypting an intercepted $c$ under every key yields at most $|\mathcal{K}|$ candidate plaintexts, immediately ruling out at least one plaintext and violating perfect secrecy.

**Proof of Theorem 2.1.** Suppose toward a contradiction that $\Pi$ is perfectly secret with $|\mathcal{K}| < |\mathcal{M}|$. Because perfect secrecy holds for every message distribution, let $M$ be **uniform** over $\mathcal{M}$ ($\Pr[M = m] = 1/|\mathcal{M}| > 0$ for all $m \in \mathcal{M}$), and fix any $c \in \mathcal{C}$ with $\Pr[C = c] > 0$ (which exists since $\sum_{c \in \mathcal{C}} \Pr[C = c] = 1$). Let

$$
\mathcal{M}' = \{ \operatorname{Dec}(k, c) : k \in \mathcal{K} \}.
$$

Because $\operatorname{Dec}(\cdot, c)$ is deterministic, $|\mathcal{M}'| \le |\mathcal{K}| < |\mathcal{M}|$, so there exists $m \in \mathcal{M} \setminus \mathcal{M}'$ with $\operatorname{Dec}(k, c) \neq m$ for all $k \in \mathcal{K}$. By correctness ($\operatorname{Dec}(k, \operatorname{Enc}(k, m)) = m$), no key $k \in \mathcal{K}$ satisfies $\operatorname{Enc}(k, m) = c$, forcing $\Pr[M = m \mid C = c] = 0 \neq 1/|\mathcal{M}| = \Pr[M = m]$, a contradiction. Thus $|\mathcal{K}| \ge |\mathcal{M}|$. $\qquad \square$

### 2.2 Game-Based Perfect Secrecy

Perfect secrecy can be reformulated as an indistinguishability game $\operatorname{Game}_{\mathcal{A}}(b, m_0, m_1)$ between a challenger $\mathcal{C}$ and an unbounded adversary $\mathcal{A}$:

```text
Adversary A (fixed m_0, m_1 in M)                  Challenger C (samples k <- K uniformly)
                                  c = Enc(k, m_b)
                            <-------------------------
outputs guess b' in {0, 1}        b' in {0, 1}
                            ------------------------->
```

> **Definition 2.1 (Game-Based Perfect Secrecy).** An SKE scheme $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ is **perfectly secret** if for every unbounded adversary $\mathcal{A}$ and every pair $m_0, m_1 \in \mathcal{M}$,
>
> $$
> \left|\Pr\bigl[b' = 1 : \operatorname{Game}_{\mathcal{A}}(1, m_0, m_1)\bigr] - \Pr\bigl[b' = 1 : \operatorname{Game}_{\mathcal{A}}(0, m_0, m_1)\bigr]\right| = 0,
> $$
>
> equivalently $\operatorname{Game}_{\mathcal{A}}(0, m_0, m_1) \equiv \operatorname{Game}_{\mathcal{A}}(1, m_0, m_1)$ or $\Pr[b' = 1 \mid b = 1] = \Pr[b' = 1 \mid b = 0]$, over $K \gets \mathcal{K}$ and $\mathcal{A}$'s randomness.

The definition requires the *difference* of probabilities to be zero, not that each probability is $0$ or $1/2$ (an adversary that always outputs $b' = 1$ yields $1 - 1 = 0$).

> **Theorem 2.2 (Equivalence of Game-Based and Shannon Perfect Secrecy).** An SKE scheme $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ satisfies Definition 1.2 if and only if it satisfies Definition 2.1.

**Proof of Theorem 2.2.** Using Theorem 1.1`(iii)`:
- **($\Rightarrow$):** If $\Pi$ has Shannon perfect secrecy, then $\Pr[\operatorname{Enc}(K, m_0) = c] = \Pr[\operatorname{Enc}(K, m_1) = c]$ for all $m_0, m_1 \in \mathcal{M}$ and $c \in \mathcal{C}$. Thus $\mathcal{A}$'s input distribution is identical in $\operatorname{Game}_{\mathcal{A}}(0, m_0, m_1)$ and $\operatorname{Game}_{\mathcal{A}}(1, m_0, m_1)$, so $\Pr[b'=1 \mid b=0] = \Pr[b'=1 \mid b=1]$.
- **($\Leftarrow$):** If $\Pi$ is not Shannon-perfectly secret, Theorem 1.1`(iii)` yields $m_0, m_1 \in \mathcal{M}$ and $c^* \in \mathcal{C}$ with $\Pr[\operatorname{Enc}(K, m_0) = c^*] \neq \Pr[\operatorname{Enc}(K, m_1) = c^*]$. The adversary $\mathcal{A}(c)$ that outputs $1$ iff $c = c^*$ achieves $\Pr[b'=1 \mid b=0] \neq \Pr[b'=1 \mid b=1]$, violating Definition 2.1. $\qquad \square$

*Remark (Lecture 10, Exercise 1 — Uniform ciphertexts vs. perfect secrecy):* Requiring that $\forall M$ over $\mathcal{M}$ and $\forall c_0, c_1 \in \mathcal{C}$, $\Pr[C = c_0] = \Pr[C = c_1]$ is **not** equivalent to perfect secrecy. The "if" direction ($\Leftarrow$) holds (taking $M$ as a point mass on $m$ yields $\Pr[\operatorname{Enc}(K,m)=c] = 1/|\mathcal{C}|$, hence Theorem 1.1`(iii)`), but the "only if" direction ($\Rightarrow$) fails: prepending a fixed `0` bit to OTP, $\operatorname{Enc}'(K, m) = 0 \parallel (K \oplus m)$ over $\mathcal{C}' = \{0,1\}^{n+1}$ with $\operatorname{Dec}'(K, b \parallel \hat{c}) = K \oplus \hat{c}$, remains perfectly secret yet has $\Pr[C' = 1 \parallel \hat{c}] = 0 \neq 2^{-n} = \Pr[C' = 0 \parallel \hat{c}]$.

### 2.3 Message Authentication Codes (MACs) and Unconditional Integrity

To protect integrity rather than confidentiality, Alice and Bob share a uniform key $k \in \mathcal{K}$ and use a deterministic tagging algorithm

$$
\operatorname{Tag} : \mathcal{K} \times \mathcal{M} \to \mathcal{T}.
$$

Alice sends $(m, \tau)$ in the clear with $\tau = \operatorname{Tag}(k, m)$; upon receiving $(m', \tau')$, Bob accepts $m'$ iff $\operatorname{Tag}(k, m') = \tau'$. Eve succeeds in a **MAC forgery** if, after observing legitimate pair(s), she outputs a fresh message $m' \neq m$ with a valid tag $\tau' = \operatorname{Tag}(k, m')$. Unlike perfect secrecy, MAC security permits a tiny forgery probability $\varepsilon$ (e.g., $2^{-80}$ or $2^{-128}$).

> **Definition 2.2 (One-Time $\varepsilon$-Statistical MAC Security).** A deterministic MAC $\operatorname{Tag} : \mathcal{K} \times \mathcal{M} \to \mathcal{T}$ is **one-time $\varepsilon$-statistically secure** if for every pair of distinct messages $m, m' \in \mathcal{M}$ ($m \neq m'$) and every $\tau, \tau' \in \mathcal{T}$ with $\Pr[\operatorname{Tag}(K, m) = \tau] > 0$,
>
> $$
> \Pr_{K \gets \mathcal{K}}\bigl[\operatorname{Tag}(K, m') = \tau' \;\big|\; \operatorname{Tag}(K, m) = \tau\bigr] \le \varepsilon.
> $$

> **Definition 2.3 ($t$-Time $\varepsilon$-Statistical MAC Security).** More generally, $\operatorname{Tag}$ is **$t$-time $\varepsilon$-statistically secure** if for all messages $m, m_1, \dots, m_t \in \mathcal{M}$ with $m \notin \{m_1, \dots, m_t\}$ and $m_i \neq m_j$ ($i \neq j$), and all $\tau, \tau_1, \dots, \tau_t \in \mathcal{T}$ such that the conditioning event has positive probability,
>
> $$
> \Pr_{K \gets \mathcal{K}}\bigl[\operatorname{Tag}(K, m) = \tau \;\big|\; \operatorname{Tag}(K, m_1) = \tau_1, \dots, \operatorname{Tag}(K, m_t) = \tau_t\bigr] \le \varepsilon.
> $$

Here *"one-time"* restricts Alice to authenticating at most one message under $k$; Eve remains computationally unbounded. Three Lecture 2 exercises illustrate the definition:

1. **$\varepsilon = 0$ is impossible ($|\mathcal{M}| \ge 2$, finite $\mathcal{T}$):** Guessing $\tau' \gets \mathcal{T}$ uniformly at random for any $m' \neq m$ matches $\operatorname{Tag}(k, m')$ with probability $1/|\mathcal{T}|$, so $\varepsilon \ge 1/|\mathcal{T}| > 0$.
2. **OTP fails as a MAC:** If $\operatorname{Tag}(k, m) = k \oplus m$, seeing $(m, \tau)$ in the clear reveals $k = \tau \oplus m$, allowing forgery on any $m'$ with probability $1$.
3. **Game-based one-time MAC forgery:** In the experiment below, one-time $\varepsilon$-statistical security requires $\Pr[\mathrm{WIN}] \le \varepsilon$ for every unbounded adversary $\mathcal{A}$ (where $m' \neq m$ excludes trivial replay):

```text
Adversary A                                        Challenger C (samples k <- K)
                     m in M
                  ------------>
                     tau = Tag(k, m)
                  <------------
                     (m', tau')
                  ------------>                    WIN iff m' != m and Tag(k, m') = tau'
```

### 2.4 Pairwise Independent Hash Families and Affine Hashing over $\mathbb{Z}_p$

A single public hash function allows anyone to forge tags, so Alice and Bob use a public **keyed hash family** $\mathcal{H} = \{h_k : \mathcal{M} \to \mathcal{T}\}_{k \in \mathcal{K}}$ indexed by a secret key $k \gets \mathcal{K}$.

> **Definition 2.4 (Pairwise Independent Hash Family).** A keyed hash family $\mathcal{H} = \{h_k : \mathcal{M} \to \mathcal{T}\}_{k \in \mathcal{K}}$ is **pairwise independent** if for every pair of distinct inputs $m, m' \in \mathcal{M}$ ($m \neq m'$) and all $\tau, \tau' \in \mathcal{T}$, over $K \gets \mathcal{K}$,
>
> $$
> \Pr_{K \gets \mathcal{K}}\bigl[h_K(m) = \tau \;\land\; h_K(m') = \tau'\bigr] = \frac{1}{|\mathcal{T}|^2}.
> $$

Note that the *same* random function $h_K$ is evaluated at $m$ and $m'$; pairwise independence requires $(h_K(m), h_K(m'))$ to be jointly uniform over $\mathcal{T} \times \mathcal{T}$.

> **Theorem 2.3 (Pairwise Independence Implies Optimal One-Time MAC Security).** If $\mathcal{H} = \{h_k : \mathcal{M} \to \mathcal{T}\}_{k \in \mathcal{K}}$ is pairwise independent, then $\operatorname{Tag}(k, m) = h_k(m)$ is a one-time $\varepsilon$-statistically secure MAC with optimal bound $\varepsilon = \frac{1}{|\mathcal{T}|}$.

**Proof of Theorem 2.3.** Fix $m \neq m'$ in $\mathcal{M}$ and $\tau, \tau' \in \mathcal{T}$. Summing the joint probability over $\tau'' \in \mathcal{T}$ gives the marginal

$$
\Pr_K[h_K(m) = \tau] = \sum_{\tau'' \in \mathcal{T}} \Pr_K\bigl[h_K(m) = \tau \;\land\; h_K(m') = \tau''\bigr] = \sum_{\tau'' \in \mathcal{T}} \frac{1}{|\mathcal{T}|^2} = \frac{1}{|\mathcal{T}|} > 0.
$$

Therefore,

$$
\Pr_K\bigl[h_K(m') = \tau' \;\big|\; h_K(m) = \tau\bigr] = \frac{\Pr_K[h_K(m') = \tau' \land h_K(m) = \tau]}{\Pr_K[h_K(m) = \tau]} = \frac{1/|\mathcal{T}|^2}{1/|\mathcal{T}|} = \frac{1}{|\mathcal{T}|}. \qquad \square
$$

#### Concrete Construction: Affine Hashing over $\mathbb{Z}_p$

Let $p$ be a large **public** prime (say $\lambda$-bit, so $1/p \approx 2^{-\lambda}$). Set $\mathcal{M} = \mathcal{T} = \mathbb{Z}_p$, $\mathcal{K} = \mathbb{Z}_p^2$, and for $k = (a, b) \in \mathbb{Z}_p^2$ define

$$
h_{a, b}(m) = (a \cdot m + b) \bmod p.
$$

> **Lemma 2.1 (Pairwise Independence of Affine Hashing over $\mathbb{Z}_p$).** For any prime $p$, the affine hash family $\mathcal{H} = \{h_{a, b} : \mathbb{Z}_p \to \mathbb{Z}_p\}_{(a, b) \in \mathbb{Z}_p^2}$ is pairwise independent.

**Proof of Lemma 2.1.** Fix distinct $m, m' \in \mathbb{Z}_p$ ($m \neq m'$) and any $\tau, \tau' \in \mathbb{Z}_p$. The joint event $h_{a,b}(m) = \tau \land h_{a,b}(m') = \tau'$ is equivalent to the linear system over $\mathbb{Z}_p$:

$$
\underbrace{\begin{pmatrix} m & 1 \\ m' & 1 \end{pmatrix}}_{A} \begin{pmatrix} a \\ b \end{pmatrix} = \begin{pmatrix} \tau \\ \tau' \end{pmatrix} \pmod p.
$$

Since $m \neq m'$ and $p$ is prime (making $\mathbb{Z}_p$ a field), $\det(A) = m - m' \not\equiv 0 \pmod p$ is invertible modulo $p$. Hence $A$ is invertible and the system has a unique solution $(a_0, b_0)^T = A^{-1}(\tau, \tau')^T \bmod p$. For independent uniform $(a, b) \gets \mathbb{Z}_p^2$,

$$
\Pr_{a, b}\bigl[h_{a, b}(m) = \tau \;\land\; h_{a, b}(m') = \tau'\bigr] = \Pr_{a, b}\bigl[(a, b) = (a_0, b_0)\bigr] = \frac{1}{p^2} = \frac{1}{|\mathcal{T}|^2}. \qquad \square
$$

Note that messages here must fit in $\mathbb{Z}_p$; longer messages require domain extension later in the course.

#### Failure of 2-Time Security and the Key-Length Lower Bound

Like OTP, affine hashing collapses if a key is used twice:

> **Solved Problem 2.3 (Affine Hashing Is Not 2-Time Secure).** Suppose an adversary observes two valid pairs $(m_1, \tau_1)$ and $(m_2, \tau_2)$ under the same key $(a, b)$ with $m_1 \neq m_2$. Subtracting the congruences gives $a(m_1 - m_2) \equiv \tau_1 - \tau_2 \pmod p$. Since $m_1 - m_2 \not\equiv 0 \pmod p$ and $p$ is prime, the adversary recovers $a \equiv (\tau_1 - \tau_2)(m_1 - m_2)^{-1} \pmod p$ and $b \equiv \tau_1 - a m_1 \pmod p$, and can then compute the exact tag $\tau_3 = (a m_3 + b) \bmod p$ for any $m_3 \notin \{m_1, m_2\}$ with conditional probability $1$, violating $2$-time $\varepsilon$-security for all $\varepsilon < 1$. $\qquad \square$

Authenticating two messages securely requires moving to a **3-wise independent** quadratic family at the cost of a larger key:

> **Solved Problem 2.4 (Constructing a 3-Wise Independent Hash Family).** Let $p$ be prime, $\mathcal{M} = \mathcal{T} = \mathbb{Z}_p$, $\mathcal{K} = \mathbb{Z}_p^3$, and $h_{a, b, c}(m) = (a m^2 + b m + c) \bmod p$. For any pairwise distinct $x_1, x_2, x_3 \in \mathbb{Z}_p$ and any $\tau_1, \tau_2, \tau_3 \in \mathbb{Z}_p$, the equations $h_{a,b,c}(x_i) = \tau_i$ form a Vandermonde system over $\mathbb{Z}_p$:
>
> $$
> \begin{pmatrix} x_1^2 & x_1 & 1 \\ x_2^2 & x_2 & 1 \\ x_3^2 & x_3 & 1 \end{pmatrix} \begin{pmatrix} a \\ b \\ c \end{pmatrix} = \begin{pmatrix} \tau_1 \\ \tau_2 \\ \tau_3 \end{pmatrix} \pmod p.
> $$
>
> Its determinant is $x_1^2(x_2 - x_3) - x_2^2(x_1 - x_3) + x_3^2(x_1 - x_2) = (x_1 - x_2)(x_1 - x_3)(x_2 - x_3) \not\equiv 0 \pmod p$, which is invertible because $p$ is prime. Hence there is a unique solution $(a_0, b_0, c_0) \in \mathbb{Z}_p^3$, giving joint probability $1/p^3 = 1/|\mathcal{T}|^3$ under uniform $(a, b, c) \gets \mathbb{Z}_p^3$. $\qquad \square$

Degree-$t$ polynomials over $\mathbb{Z}_p$ similarly yield $(t+1)$-wise independent $t$-time $1/p$-secure MACs with key length $(t+1)\log_2 p \approx (t+1)\lambda$ bits. This linear key growth is unavoidable unconditionally:

> **Theorem 2.4 ($t$-Time Statistical MAC Key-Length Bound).** *(Stated without proof in Lecture 3.)* Any $t$-time $2^{-\lambda}$-statistically secure MAC must have a key size of at least $(t + 1)\lambda$ bits.

> ### ⚠️ [PROOF OMITTED & CONTEXT — Lecture 3 Transcript]
> - **Theorem 2.4 ($(t+1)\lambda$ bound) & linear algebra prerequisite:** Venturi omits the combinatorial proof of Theorem 2.4 (focus on the takeaway: linear key growth rules out unbounded-message unconditional MACs) and uses $\det(A) \neq 0 \pmod p \implies$ invertibility without proof.
> - **L2 exercise recap:** Showing $\varepsilon = 0$ statistical security is impossible for MACs was assigned at the end of Lecture 2 (*no local L2 transcript exists*).

Together with Shannon's bound $|\mathcal{K}| \ge |\mathcal{M}|$, Theorem 2.4 shows that reusing a single short key across arbitrarily many messages is impossible under unconditional security.

---

## 3. Randomness Extraction and the Leftover Hash Lemma (Lecture 3 & Start of Lecture 4)

### 3.1 The Real-World Randomness Pipeline

Cryptographic algorithms require uniform random bits, yet physical computers are deterministic and must harvest biased, correlated entropy from physical sources (thermal noise, timing jitter, interrupts). Operating-system generators such as Linux `/dev/random` and `Fortuna` follow a three-stage pipeline:

```text
Imperfect source X ---> [1. EXTRACT] ---> short near-uniform seed
                                                 |
Fresh entropy --------> [3. REFRESH] ---> [2. EXPAND (PRG)] ---> long pseudorandom stream
```

1. **Extract:** Information-theoretically distill a biased, correlated sample from $X$ into a short near-uniform seed.
2. **Expand:** Stretch the short seed via a deterministic **pseudorandom generator (PRG)** (trading unconditional security for computational security).
3. **Refresh:** Periodically mix fresh physical entropy into the state for **forward security / post-compromise recovery**.

> ### ⚠️ [OUT OF SCOPE / PROOF STYLE NOTE — Lectures 3 & 4 Transcripts]
> - **Skipped topics:** Step 3 (periodic refresh / `/dev/random` full model) and multi-source / hash-based extractors are omitted; the course focuses on **seeded extractors** and LHL (which returns in post-quantum PKE).
> - **Omitted / self-check proofs:** Operational characterization of $\operatorname{SD}(X; Y)$ is stated without proof; $H_\infty(X) \ge k \implies \operatorname{Col}(X) \le 2^{-k}$ is flagged as a one-line exercise. Venturi notes the LHL proof is unusually math-heavy compared with later, more intuitive course proofs.

As a warm-up before correlated sources, consider independent biased coin tosses:

> **Remark 3.1 (Von Neumann Extractor).** Given independent, identically distributed tosses of a coin $B \in \{0,1\}$ with unknown bias $\Pr[B=0] = p \in (0,1)$, draw pairs $(b_1, b_2)$: discard if $b_1 = b_2$, output $1$ on $(0,1)$, and output $0$ on $(1,0)$. Because $\Pr[(0,1)] = p(1-p) = \Pr[(1,0)]$, conditioned on outputting a bit we get $\Pr[Y=0] = \Pr[Y=1] = 1/2$, while discarding $m$ consecutive pairs has probability $(1-2p(1-p))^m \to 0$. However, this fails when source bits are correlated.

### 3.2 Min-Entropy and the Impossibility of Deterministic Extraction

To handle arbitrary correlations across an $n$-bit source $X \in \{0,1\}^n$, we measure its worst-case unpredictability via **min-entropy**:

> **Definition 3.1 (Min-Entropy).** The **min-entropy** of a discrete random variable $X$ is
>
> $$
> H_\infty(X) = -\log_2\left(\max_x \Pr[X = x]\right) = \min_x \log_2\left(\frac{1}{\Pr[X = x]}\right).
> $$

Unlike Shannon entropy (an average surprise), min-entropy bounds the maximum probability of any single string $p_{\max} = \max_x \Pr[X = x]$:

$$
H_\infty(X) \ge k \iff \max_x \Pr[X = x] \le 2^{-k}.
$$

Examples: a constant source $X = 0^n$ has $H_\infty(X) = 0$; uniform $U_n$ has $H_\infty(U_n) = n$; fixing the first bit to $0$ with $n-1$ uniform remaining bits gives $H_\infty(X) = n-1$; and uniform $X$ over the even-parity set $\{000, 011, 101, 110\}$ has $H_\infty(X) = -\log_2(1/4) = 2 = n-1$ even though every individual bit is marginally uniform.

Even with nearly maximal min-entropy $H_\infty(X) \ge n-1$, no fixed deterministic extractor can produce even a single uniform bit for all such sources:

> **Theorem 3.1 (Impossibility of Universal Deterministic / Seedless Extractors).** There exists no deterministic function $\operatorname{Ext} : \{0,1\}^n \to \{0,1\}$ such that $\operatorname{Ext}(X)$ is uniformly distributed over $\{0,1\}$ for **every** source $X \in \{0,1\}^n$ with $H_\infty(X) \ge n - 1$.

**Proof of Theorem 3.1.** Fix an arbitrary deterministic function $\operatorname{Ext} : \{0,1\}^n \to \{0,1\}$. Its preimages $\operatorname{Ext}^{-1}(0)$ and $\operatorname{Ext}^{-1}(1)$ partition $\{0,1\}^n$, so $|\operatorname{Ext}^{-1}(0)| + |\operatorname{Ext}^{-1}(1)| = 2^n$. Choose $b \in \{0,1\}$ maximizing $|\operatorname{Ext}^{-1}(b)|$; by the pigeonhole principle,

$$
|\operatorname{Ext}^{-1}(b)| \ge \frac{2^n}{2} = 2^{n-1}.
$$

Let $X_{\mathrm{bad}}$ be uniform over $\operatorname{Ext}^{-1}(b)$. Then

$$
H_\infty(X_{\mathrm{bad}}) = -\log_2\left(\frac{1}{|\operatorname{Ext}^{-1}(b)|}\right) = \log_2 |\operatorname{Ext}^{-1}(b)| \ge \log_2(2^{n-1}) = n - 1,
$$

yet $\Pr[\operatorname{Ext}(X_{\mathrm{bad}}) = b] = 1$, so $\operatorname{Ext}(X_{\mathrm{bad}})$ is constant rather than uniform. $\qquad \square$

### 3.3 Seeded Extractors and Statistical Distance

To bypass Theorem 3.1 (alongside multi-source extractors or random-oracle heuristics), **seeded extraction** uses a function family indexed by a uniform random **seed** $S \sim U_d$ sampled *independently* of $X$:

$$
\operatorname{Ext} : \{0,1\}^d \times \{0,1\}^n \to \{0,1\}^\ell,
$$

where $d$ is the seed length, $n$ is the source length, $\ell$ is the output length, and $k$ is the required min-entropy $H_\infty(X) \ge k$. A good seeded extractor aims for a short catalyst ($\ell > d$), **strong** (public-seed) security so the output remains near-uniform even given $S$ (ruling out $\operatorname{Ext}(s,x)=s$), and seed reusability—subject to the caveat that reusing one seed across multiple sources requires a separate independence and hybrid argument beyond the single-source definition below.

Because exact uniformity is generally unattainable, closeness is measured by **statistical distance**:

> **Definition 3.2 (Statistical Distance and $\varepsilon$-Closeness).** For discrete random variables $X, Y$ over the same finite domain $\mathcal{Z}$, their **statistical distance** is
>
> $$
> \operatorname{SD}(X; Y) = \frac{1}{2} \sum_{z \in \mathcal{Z}} \bigl|\Pr[X = z] - \Pr[Y = z]\bigr|.
> $$
>
> We write $X \approx_\varepsilon Y$ (**$\varepsilon$-close**) if $\operatorname{SD}(X; Y) \le \varepsilon$.

The factor $\frac{1}{2}$ scales $\operatorname{SD}(X; Y)$ into $[0,1]$ ($\operatorname{SD}=0 \iff X \equiv Y$, $\operatorname{SD}=1 \iff$ disjoint supports). Operationally, $\operatorname{SD}(X; Y)$ equals the maximum distinguishing advantage of any computationally unbounded adversary $\mathcal{A}$:

$$
\operatorname{SD}(X; Y) = \max_{\mathcal{A}} \bigl|\Pr[\mathcal{A}(X) = 1] - \Pr[\mathcal{A}(Y) = 1]\bigr|,
$$

so $X \approx_\varepsilon Y$ bounds any unbounded distinguisher's guessing probability under a fair choice between $X$ and $Y$ by $\frac{1}{2} + \frac{1}{2}\varepsilon$.

> **Definition 3.3 ($(k, \varepsilon)$-Strong Seeded Extractor).** A deterministic function $\operatorname{Ext} : \{0,1\}^d \times \{0,1\}^n \to \{0,1\}^\ell$ is a **$(k, \varepsilon)$-strong seeded extractor** if for every source $X$ over $\{0,1\}^n$ with $H_\infty(X) \ge k$ and independent uniform $S \sim U_d$,
>
> $$
> \bigl(S, \operatorname{Ext}(S, X)\bigr) \approx_\varepsilon (S, U_\ell) \equiv U_{d + \ell},
> $$
>
> where $U_\ell$ is uniform over $\{0,1\}^\ell$ and independent of $S$.

Including $S$ in the tuple $(S, \operatorname{Ext}(S, X))$ enforces the *strong* (public-seed) requirement; notice that Definition 3.3 is a **seeded** extractor, not a deterministic (seedless) one.

### 3.4 The Leftover Hash Lemma (LHL) and the Collision-Probability Lemma

Any pairwise independent hash family immediately yields a strong seeded extractor.

> **Theorem 3.2 (Leftover Hash Lemma).** Let $\mathcal{H} = \{ h_s : \{0,1\}^n \to \{0,1\}^\ell \}_{s \in \{0,1\}^d}$ be a pairwise independent hash family. Then $\operatorname{Ext}(s, x) = h_s(x)$ is a $(k, \varepsilon)$-strong seeded extractor for every $k$ and $\varepsilon > 0$ satisfying
>
> $$
> k \ge \ell + 2\log_2\left(\frac{1}{\varepsilon}\right) - 2 \qquad \Longleftrightarrow \qquad \ell \le k - 2\log_2\left(\frac{1}{\varepsilon}\right) + 2.
> $$

Since $S$ is public, all extracted entropy comes from $X$; achieving error $\varepsilon$ costs an **entropy loss** of $2\log_2(1/\varepsilon) - 2$ bits (with $-2$ outside the logarithm).

The proof converts statistical distance into **collision probability**: for a random variable $Y$ over a finite set $\mathcal{Y}$ and an independent, identically distributed copy $Y'$,

$$
\operatorname{Col}(Y) = \sum_{y \in \mathcal{Y}} \Pr[Y = y]^2 = \Pr[Y = Y'].
$$

Since $\operatorname{Col}(U_{\mathcal{Y}}) = 1/|\mathcal{Y}|$, staying within a $(1 + 4\varepsilon^2)$ factor of $1/|\mathcal{Y}|$ forces $\varepsilon$-closeness to uniform:

> **Lemma 3.1 (Auxiliary Collision-Probability Lemma).** Let $Y$ be a random variable over a finite set $\mathcal{Y}$ and $U_{\mathcal{Y}}$ be uniform over $\mathcal{Y}$. If
>
> $$
> \operatorname{Col}(Y) \le \frac{1}{|\mathcal{Y}|}(1 + 4\varepsilon^2),
> $$
>
> then $\operatorname{SD}(Y; U_{\mathcal{Y}}) \le \varepsilon$.

**Proof of Theorem 3.2 (assuming Lemma 3.1).** Fix any source $X$ over $\{0,1\}^n$ with $H_\infty(X) \ge k$ and independent $S \sim U_d$. Set $Y = (S, h_S(X)) \in \mathcal{Y} = \{0,1\}^{d+\ell}$, so $|\mathcal{Y}| = 2^{d+\ell}$, and let $Y' = (S', h_{S'}(X'))$ be an independent copy with $(S, X, S', X')$ mutually independent. (Sampling $S \sim U_d$ randomly is essential; a fixed $S$ would fail by Theorem 3.1.) Then

$$
\operatorname{Col}(Y) = \Pr[Y = Y'] = \Pr\bigl[S = S' \;\land\; h_S(X) = h_{S'}(X')\bigr] = \Pr\bigl[S = S' \;\land\; h_S(X) = h_S(X')\bigr].
$$

Because $(S, S') \perp (X, X')$, conditioning on $S = S'$ leaves $S \sim U_d$ independent of $(X, X')$, and $\Pr[S = S'] = 2^{-d}$, giving

$$
\operatorname{Col}(Y) = \Pr[S = S'] \cdot \Pr\bigl[h_S(X) = h_S(X')\bigr] = 2^{-d}\Pr\bigl[h_S(X) = h_S(X')\bigr].
$$

Split $\{h_S(X) = h_S(X')\}$ into the disjoint cases $X = X'$ and $X \neq X'$:

- **Case 1 ($X = X'$):** Determinism of $h_S$ makes $h_S(X) = h_S(X')$ automatic. Since $H_\infty(X) \ge k$ implies $\max_x \Pr[X = x] \le 2^{-k}$,

$$
\Pr\bigl[h_S(X) = h_S(X') \;\land\; X = X'\bigr] = \Pr[X = X'] = \sum_{x \in \{0,1\}^n} \Pr[X = x]^2 \le 2^{-k} \sum_{x \in \{0,1\}^n} \Pr[X = x] = 2^{-k}.
$$

- **Case 2 ($X \neq X'$):** For every fixed $x \neq x'$, pairwise independence of $\mathcal{H}$ gives $\Pr_S[h_S(x) = h_S(x')] = \sum_{y \in \{0,1\}^\ell} \Pr_S[h_S(x) = y \land h_S(x') = y] = 2^\ell \cdot 2^{-2\ell} = 2^{-\ell}$. By independence of $S$ and $(X, X')$,

$$
\Pr\bigl[h_S(X) = h_S(X') \;\land\; X \neq X'\bigr] = 2^{-\ell}\Pr[X \neq X'] \le 2^{-\ell}.
$$

Combining both cases,

$$
\operatorname{Col}(Y) \le 2^{-d}\bigl(2^{-k} + 2^{-\ell}\bigr) = 2^{-(d+\ell)}\bigl(1 + 2^{\ell - k}\bigr) = \frac{1}{|\mathcal{Y}|}\bigl(1 + 2^{\ell - k}\bigr).
$$

Finally, $k \ge \ell + 2\log_2(1/\varepsilon) - 2$ rearranges to $\ell - k \le 2 - 2\log_2(1/\varepsilon)$, so $2^{\ell - k} \le 4 \cdot (2^{-\log_2(1/\varepsilon)})^2 = 4\varepsilon^2$. Thus $\operatorname{Col}(Y) \le \frac{1}{|\mathcal{Y}|}(1 + 4\varepsilon^2)$, and Lemma 3.1 concludes $\operatorname{SD}(Y; U_{\mathcal{Y}}) \le \varepsilon$. $\qquad \square$

**Proof of Lemma 3.1 (Lecture 4).** Assume $\operatorname{Col}(Y) \le \frac{1}{|\mathcal{Y}|}(1 + 4\varepsilon^2)$. Define for each $y \in \mathcal{Y}$ the deviation $q_y = \Pr[Y = y] - \frac{1}{|\mathcal{Y}|}$ and its sign $s_y = +1$ if $q_y \ge 0$, else $s_y = -1$. Viewing $\vec{q}, \vec{s} \in \mathbb{R}^{|\mathcal{Y}|}$, we have $|q_y| = q_y s_y$ and $\langle \vec{s}, \vec{s} \rangle = \sum_{y \in \mathcal{Y}} s_y^2 = |\mathcal{Y}|$. Applying Cauchy–Schwarz gives

$$
\operatorname{SD}(Y; U_{\mathcal{Y}}) = \frac{1}{2}\sum_{y \in \mathcal{Y}} q_y s_y = \frac{1}{2}\langle \vec{q}, \vec{s} \rangle \le \frac{1}{2}\sqrt{\left(\sum_{y \in \mathcal{Y}} q_y^2\right)|\mathcal{Y}|}.
$$

Expanding $\sum_{y \in \mathcal{Y}} q_y^2$ using $\sum_{y \in \mathcal{Y}} \Pr[Y = y] = 1$:

$$
\sum_{y \in \mathcal{Y}} q_y^2 = \sum_{y \in \mathcal{Y}} \Pr[Y = y]^2 + \sum_{y \in \mathcal{Y}} \frac{1}{|\mathcal{Y}|^2} - \frac{2}{|\mathcal{Y}|}\sum_{y \in \mathcal{Y}} \Pr[Y = y] = \operatorname{Col}(Y) + \frac{1}{|\mathcal{Y}|} - \frac{2}{|\mathcal{Y}|} = \operatorname{Col}(Y) - \frac{1}{|\mathcal{Y}|}.
$$

Using the hypothesis $\operatorname{Col}(Y) \le \frac{1}{|\mathcal{Y}|}(1 + 4\varepsilon^2)$ yields $\sum_{y \in \mathcal{Y}} q_y^2 \le \frac{4\varepsilon^2}{|\mathcal{Y}|}$, and therefore

$$
\operatorname{SD}(Y; U_{\mathcal{Y}}) \le \frac{1}{2}\sqrt{\frac{4\varepsilon^2}{|\mathcal{Y}|}\cdot|\mathcal{Y}|} = \frac{1}{2}\sqrt{4\varepsilon^2} = \varepsilon. \qquad \square
$$

---

## 4. Computational Security, One-Way Functions, and Impagliazzo's Worlds (Lecture 4)

### 4.1 Overcoming Information-Theoretic Barriers

Every primitive in Lectures 1–3 hits an unconditional barrier:

| Primitive | Information-theoretic limit | Practical consequence |
| --- | --- | --- |
| **SKE (Perfect secrecy)** | $|\mathcal{K}| \ge |\mathcal{M}|$ and one-time key only | Key must be at least as long as all encrypted messages combined |
| **MAC (Statistical security)** | Key length $\ge (t+1)\lambda$ bits for $t$-time $2^{-\lambda}$ security | Key grows linearly with authenticated messages |
| **Randomness extraction** | Seedless impossible; seeded extracts $\le k$ bits | Cannot expand a short seed without computational assumptions |

To reuse a single short key across arbitrarily many messages, computational cryptography introduces **two assumptions**:
1. **Computationally bounded adversaries (PPT):** Attackers are modeled as **probabilistic polynomial-time (PPT)** Turing machines—running in $O(\lambda^c) = \operatorname{poly}(\lambda)$ steps in security parameter $\lambda$ and flipping at most $\operatorname{poly}(\lambda)$ random bits (for quantum security, PPT is replaced by quantum polynomial time, **QPT**).
2. **Computationally hard problems:** Tasks must exist that are efficient to compute forward yet infeasible to invert.

> **Remark (Uniform vs. Non-Uniform PPT):** Lecture 4 uses **uniform PPT** Turing machines (a single algorithm $\mathcal{A}$ for all $\lambda$). Textbooks such as Katz–Lindell also consider **non-uniform PPT** adversaries: polynomial-size circuit families $\{C_\lambda\}_{\lambda \in \mathbb{N}}$, equivalently a PPT machine with a $\operatorname{poly}(\lambda)$-bit advice string $a_\lambda$ capturing $\lambda$-dependent precomputation.

### 4.2 Why $P \neq NP$ Is Not Enough, and How Security Reductions Work

Recall **$P$** (decision problems solvable in deterministic polynomial time) and **$NP$** (decision problems whose candidate witnesses can be verified in deterministic polynomial time, e.g., $\mathrm{FACTORING}$ or $3\text{-COLORING}$). Although the existence of One-Way Functions implies $P \neq NP$—if $P = NP$, deciding whether a prefix $p$ extends to a preimage $x' = p \parallel r \in \mathcal{X}_\lambda$ with $f_\lambda(x') = y$ lies in $NP = P$, enabling bit-by-bit inversion—the converse is not known: **$P \neq NP$ alone does not suffice for cryptography**. $P \neq NP$ guarantees only **worst-case** hardness (pathological hard instances), whereas cryptography requires **average-case** hardness together with the ability to sample hard instances alongside their solutions.

Modern cryptography therefore relies on **specific hardness assumptions** and proves statements like *"if assumption $X$ holds, then scheme $\Pi$ is secure"* via **contrappositive reductions**:
1. Assume a PPT adversary $\mathcal{A}$ breaks $\Pi$ with non-negligible success.
2. Build a PPT reduction $\mathcal{B}$ using $\mathcal{A}$ as a black-box subroutine to solve the underlying hard problem.
3. Show $\mathcal{B}$ runs in polynomial time and simulates $\mathcal{A}$'s view faithfully enough to succeed with non-negligible probability—contradicting the assumption.

A reduction proves conditional security relative to an explicit assumption; lacking a reduction does not prove a scheme insecure.

### 4.3 Concrete $(T, \varepsilon)$ Security vs. Asymptotic Security and Negligible Functions

**Concrete $(T, \varepsilon)$ security** bounds adversaries running in at most $T$ steps to success probability at most $\varepsilon$ (useful for parameter deployment, e.g., $T = 2^{80}, \varepsilon = 2^{-80}$, but cumbersome in proofs). **Asymptotic security** passes the security parameter in unary ($1^\lambda$) so $\operatorname{poly}(\lambda)$ time means polynomial in input length, and requires every PPT adversary's success probability to be **negligible** in $\lambda$.

A constant bound like $\varepsilon = 0.01$ is inadequate because a PPT adversary can repeat an independent attack polynomially many times (e.g., $1 - 0.99^{1000} \approx 99.996\%$ after $1{,}000$ trials). Thus "small" must survive polynomial amplification:

> **Definition 4.1 (Negligible Function).** A nonnegative function $\varepsilon : \mathbb{N} \to \mathbb{R}_{\ge 0}$ is **negligible** ($\varepsilon(\lambda) = \operatorname{negl}(\lambda)$) if it decays faster than the inverse of every positive polynomial:
>
> $$
> \forall c > 0,\ \exists \lambda_0 \in \mathbb{N} \text{ such that } \forall \lambda \ge \lambda_0,\qquad \varepsilon(\lambda) < \frac{1}{\lambda^c}.
> $$

For instance, $2^{-\lambda}$, $2^{-\sqrt{\lambda}}$, and $\lambda^{-\log_2 \lambda}$ are negligible, whereas $1/\lambda^2$ is **not** negligible (even though $\lim_{\lambda\to\infty} 1/\lambda^2 = 0$, taking $c = 3$ gives $1/\lambda^2 > 1/\lambda^3$ for all $\lambda > 1$). Negligible functions satisfy two essential closure properties:
1. **Closure under addition:** If $\varepsilon_1, \varepsilon_2 \in \operatorname{negl}$, then $\varepsilon_1(\lambda) + \varepsilon_2(\lambda) \in \operatorname{negl}$. *(Given $c > 0$, pick $\lambda_1, \lambda_2$ so $\varepsilon_i(\lambda) < \lambda^{-(c+1)}$; for $\lambda \ge \max(\lambda_1, \lambda_2, 2)$, $\varepsilon_1(\lambda) + \varepsilon_2(\lambda) < 2\lambda^{-(c+1)} \le \lambda^{-c}$.)*
2. **Closure under polynomial scaling:** If $\varepsilon \in \operatorname{negl}$ and $p(\lambda) = \operatorname{poly}(\lambda)$ is positive, then $p(\lambda)\varepsilon(\lambda) \in \operatorname{negl}$. *(Bound $p(\lambda) \le \lambda^d$ for large $\lambda$; choosing $\varepsilon(\lambda) < \lambda^{-(c+d)}$ yields $p(\lambda)\varepsilon(\lambda) < \lambda^{-c}$.)*

> ### 📝 [FORMALITY & EXERCISE CUES — Lecture 4 Transcript]
> - **Informal complexity notions:** Formal Turing-machine tape mechanics, formal definitions of $P$/$NP$, and concrete $(T, \varepsilon)$ step-counting in proofs are kept intuitive.
> - **Self-check exercises:** Checking negligible vs. non-negligible examples and proving the two closure properties above are left as simple exercises (both proofs included above).

### 4.4 One-Way Functions (OWFs) and Candidate Hard Problems

**One-Way Functions (OWFs)** provide the minimal abstract foundation for symmetric cryptography: easy to evaluate forward, hard to invert on average. Consider the experiment $\operatorname{Game}^{\mathrm{OWF}}_{\mathcal{A}, f}(\lambda)$ for a deterministic family $f_\lambda : \mathcal{X}_\lambda \to \mathcal{Y}_\lambda$:

```text
Adversary A                                        Challenger C (samples x <- X_lambda)
                   1^lambda, y = f_lambda(x)
                 <----------------------------
outputs x'         x' in X_lambda
                 ---------------------------->     WIN (1) iff x' in X_lambda and f_lambda(x') = f_lambda(x)
```

Two features are critical: (1) $\mathcal{A}$ wins by finding *any* valid preimage $x' \in \mathcal{X}_\lambda$ with $f_\lambda(x') = y$, not necessarily $x$ itself; and (2) $x$ is sampled from $\mathcal{X}_\lambda$ (measuring **average-case** hardness), which for candidates like factoring must be a structured distribution (random $\lambda$-bit primes $(p, q)$, since random integers are even half the time).

> **Definition 4.2 (One-Way Function).** A family of deterministic functions $f = \{f_\lambda : \mathcal{X}_\lambda \to \mathcal{Y}_\lambda\}_{\lambda \in \mathbb{N}}$ (with efficient sampling from $\mathcal{X}_\lambda$; often simply $f : \{0,1\}^\lambda \to \{0,1\}^{m(\lambda)}$) is a **one-way function (OWF)** if:
> 1. **Easy to compute:** There is a deterministic polynomial-time algorithm computing $f_\lambda(x)$ for all $\lambda \in \mathbb{N}$ and $x \in \mathcal{X}_\lambda$.
> 2. **Hard to invert on average:** For every PPT adversary $\mathcal{A}$,
>
> $$
> \Pr\bigl[\operatorname{Game}^{\mathrm{OWF}}_{\mathcal{A}, f}(\lambda) = 1\bigr] = \Pr_{\substack{x \gets \mathcal{X}_\lambda \\ x' \gets \mathcal{A}(1^\lambda, f_\lambda(x))}}\bigl[x' \in \mathcal{X}_\lambda \;\land\; f_\lambda(x') = f_\lambda(x)\bigr] \le \operatorname{negl}(\lambda).
> $$

Candidate OWFs vary in algebraic structure and quantum resilience:

| Candidate family | Forward vs. inverse | Quantum status |
| --- | --- | --- |
| **Integer factoring** | Multiplying primes $p \cdot q$ is fast; factoring $N = pq$ appears classically hard | **Broken** in QPT by **Shor's algorithm** |
| **Discrete logarithm** | Computing $g^x \bmod p$ is fast; finding $x$ from $g^x$ appears classically hard | **Broken** in QPT by **Shor's algorithm** |
| **Lattice problems** | High-dimensional lattice instances can be sampled with solutions and appear hard to invert | **Post-quantum candidate** (NIST PQ standards) |
| **Random linear codes** | Computing a syndrome/noisy codeword is fast; decoding random linear codes appears hard | **Post-quantum candidate** |

### 4.5 Impagliazzo's Five Worlds and the Gauss Intuition

Because neither $P \stackrel{?}{=} NP$ nor the existence of OWFs is proven, Impagliazzo (1995) classified **five possible computational worlds**—illustrated in Lecture 4 by modeling young Gauss as a PPT adversary whose teacher tries to pose a puzzle Gauss cannot efficiently solve:

1. **Algorithmica ($P = NP$):** Every efficiently verifiable puzzle is efficiently solvable; Gauss solves every puzzle, so OWFs and computational cryptography cannot exist.
2. **Heuristica ($P \neq NP$, $NP$ easy on average):** Contrived worst-case hard puzzles exist, but randomly sampled puzzles are easy on average; OWFs still do not exist.
3. **Pessiland ($P \neq NP$ and average-case hard $NP$ problems exist, yet no OWFs):** Average-case hard puzzles exist, yet we cannot efficiently sample hard instances together with their secret solutions to build cryptography.
4. **Minicrypt (OWFs exist, no public-key cryptography):** The teacher can sample $x$, compute $y = f(x)$, and stump Gauss. OWFs suffice for all core **symmetric cryptography** (PRGs, PRFs, CPA-secure SKE, MACs, signatures), but unstructured OWFs are not known to yield public-key encryption or key exchange.
5. **Cryptomania (OWFs and public-key cryptography exist):** Additional algebraic/geometric structure (trapdoors, factoring, discrete logs, lattices) lets the teacher establish a shared secret with the class over a public channel while eavesdropper Gauss learns nothing—enabling **public-key encryption** and **key exchange**.

---

# Part II — Pseudorandomness, Symmetric Encryption, and PRF Constructions (Lectures 5–8)

Part I established the information-theoretic limits of unconditional security: Shannon's theorem forces keys at least as long as messages, and one-time pad keys cannot be reused. Computational security restricts adversaries to **probabilistic polynomial-time (PPT)** algorithms and assumes **one-way functions (OWFs)**—efficiently computable functions $f : \{0,1\}^n \to \{0,1\}^m$ (or ensembles $\{f_\lambda\}_{\lambda \in \mathbb{N}}$) that are hard to invert on average: for every PPT adversary $\mathcal{A}$,

$$
\Pr_{\substack{x \gets U_n \\ x' \gets \mathcal{A}(1^\lambda, f(x))}}\bigl[f(x') = f(x)\bigr] \leq \operatorname{negl}(\lambda),
$$

where $U_n$ is the uniform distribution over $\{0,1\}^n$ and $\mu : \mathbb{N} \to \mathbb{R}_{\ge 0}$ is **negligible** ($\mu(\lambda) = \operatorname{negl}(\lambda)$) if for every constant $c > 0$ there exists $\lambda_0 \in \mathbb{N}$ such that $\mu(\lambda) < 1/\lambda^c$ for all $\lambda \ge \lambda_0$ (e.g., $2^{-\lambda}$ is negligible; $1/\lambda^2$ is not; negligible functions are closed under finite sums and multiplication by $\operatorname{poly}(\lambda)$). Part II develops **PRGs** and **hard-core predicates** (Lecture 5), **Goldreich–Levin** and **one-time computational encryption** (Lecture 6), **PRFs** and **CPA-secure encryption** (Lecture 7), and the **GGM construction** of PRFs from PRGs (Lecture 8).

---

## Lecture 5 — Pseudorandom Generators, the Hybrid Argument, and Hard-Core Bits

### 5.1 Computational Indistinguishability

A deterministic algorithm cannot create fresh entropy, so expanding a short seed cannot yield truly uniform bits—only bits that *look* uniform to every PPT observer. We compare **probability ensembles** $X = \{X_\lambda\}_{\lambda \in \mathbb{N}}$ and $Y = \{Y_\lambda\}_{\lambda \in \mathbb{N}}$, where $\lambda$ indexes the security level and samples from $X_\lambda$ and $Y_\lambda$ share the same representation (in particular, the same bit length).

> **Definition 5.1 (Computational Indistinguishability).** Ensembles $X = \{X_\lambda\}_{\lambda \in \mathbb{N}}$ and $Y = \{Y_\lambda\}_{\lambda \in \mathbb{N}}$ are **computationally indistinguishable**, written $X \approx_c Y$, if for every PPT adversary $\mathcal{A}$ there exists a negligible function $\operatorname{negl}(\lambda)$ such that for all sufficiently large $\lambda$,
>
> $$
> \left|\Pr\bigl[\mathcal{A}(1^\lambda, X_\lambda) = 1\bigr] - \Pr\bigl[\mathcal{A}(1^\lambda, Y_\lambda) = 1\bigr]\right| \leq \operatorname{negl}(\lambda),
> $$
>
> over $z \gets X_\lambda$ (respectively $z \gets Y_\lambda$) and $\mathcal{A}$'s coins. (We write $\mathcal{A}(X_\lambda)$ when the sample length determines $\lambda$ polynomially.)

Equivalently, in the two-world game $\operatorname{Game}(\lambda, b)$ ($b \in \{0,1\}$):

```text
  Challenger C                                     Adversary A
  ------------                                     -----------
  if b = 0: sample z <- X_lambda
  if b = 1: sample z <- Y_lambda    --- z --->
                                    <-- b' ---     outputs guess b' in {0,1}
```

Computational indistinguishability states $\{\operatorname{Game}(\lambda, 0)\}_\lambda \approx_c \{\operatorname{Game}(\lambda, 1)\}_\lambda$.

Three clarifications: (1) outputting $1$ is just a label, not "winning" (always outputting $1$ yields advantage $|1-1|=0$); (2) security is **asymptotic**—for every fixed PPT $\mathcal{A}$, the gap shrinks faster than $1/\operatorname{poly}(\lambda)$ as $\lambda \to \infty$ (a constant gap like $0.0001$ violates Definition 5.1); (3) unlike statistical distance, $X \approx_c Y$ permits large statistical distance as long as no PPT test detects it.

Two immediate closure properties follow from Definition 5.1:
- **Constant-hop transitivity:** If $X \approx_c Y$ and $Y \approx_c Z$, then $X \approx_c Z$ by the triangle inequality. (Extending to $\ell(\lambda) = \operatorname{poly}(\lambda)$ hops requires a uniform reduction, proved via the hybrid argument below.)
- **Closure under PPT maps:** If $X \approx_c Y$ and $g$ is PPT-computable, then $\{g(X_\lambda)\}_\lambda \approx_c \{g(Y_\lambda)\}_\lambda$, since any distinguisher $\mathcal{A}$ for $g$ gives $\mathcal{A}'(z) = \mathcal{A}(g(z))$ with the same advantage.

### 5.2 Formal Definition of a PRG and the Unbounded-Adversary Attack

> **Definition 5.2 (Pseudorandom Generator).** Let $\ell = \ell(\lambda) > 0$ be an efficiently computable stretch function. A deterministic polynomial-time function $G : \{0,1\}^\lambda \to \{0,1\}^{\lambda + \ell(\lambda)}$ is a **(secure) pseudorandom generator (PRG)** if:
> 1. **Expansion:** $|G(s)| = \lambda + \ell(\lambda) > \lambda$ for all $s \in \{0,1\}^\lambda$.
> 2. **Pseudorandomness:** $G(U_\lambda) \approx_c U_{\lambda + \ell(\lambda)}$, i.e., for every PPT $\mathcal{A}$,
>    $$
>    \left|\Pr_{s \gets U_\lambda}\bigl[\mathcal{A}(G(s)) = 1\bigr] - \Pr_{z \gets U_{\lambda+\ell(\lambda)}}\bigl[\mathcal{A}(z) = 1\bigr]\right| \leq \operatorname{negl}(\lambda).
>    $$

**Unbounded-adversary counting attack:** Even for minimal stretch $\ell = 1$, no PRG resists a computationally unbounded distinguisher. Because $|\operatorname{Im}(G)| \le 2^\lambda$ while $|\{0,1\}^{\lambda+\ell}| = 2^{\lambda+\ell}$, an unbounded $\mathcal{A}$ given $z \in \{0,1\}^{\lambda+\ell}$ enumerates all $2^\lambda$ seeds $s \in \{0,1\}^\lambda$ and outputs $1$ iff some $G(s) = z$. For $z \gets G(U_\lambda)$, a matching seed always exists, so $\Pr[\mathcal{A}(G(U_\lambda)) = 1] = 1$; for $z \gets U_{\lambda+\ell}$, $\Pr[\mathcal{A}(U_{\lambda+\ell}) = 1] \le 2^\lambda / 2^{\lambda+\ell} = 2^{-\ell} \le 1/2$. Thus $\mathcal{A}$'s advantage is at least $1 - 2^{-\ell} \ge 1/2$ in $\Omega(2^\lambda)$ time, showing pseudorandomness is inherently computational.

### 5.3 Constructing PRGs: Stretch Amplification and the Hybrid Argument

> **Theorem 5.1 (OWFs Imply PRGs).** If OWFs exist, then for every efficiently computable $\ell(\lambda) = \operatorname{poly}(\lambda)$ there exists a secure PRG $G : \{0,1\}^\lambda \to \{0,1\}^{\lambda+\ell(\lambda)}$.

> ### ⚠️ [PROOF OMITTED FOR GENERAL OWFs — Lectures 5, 6 & 13]
> Constructing a $1$-bit PRG from an **arbitrary OWF** (Theorem 5.1 in full) and **forward security** after state compromise are omitted. Examinable in full: (1) **Stretch Amplification** ($1$-bit $\to$ $\ell(\lambda)$-bit PRG via the Hybrid Argument below), and (2) the **OWP + Hard-Core Predicate** pipeline (§5.4 & Lecture 6).

One-wayness alone does not yield pseudorandomness: if $f$ is a OWF, then $f'(x) = 0 \parallel f(x)$ is still a OWF, yet always starts with $0$. Instead of proving Theorem 5.1 in full, we develop stretch amplification and hard-core predicates.

#### Construction for Stretch Amplification

Given a secure $1$-bit-stretch PRG $G : \{0,1\}^\lambda \to \{0,1\}^{\lambda+1}$, write $G(s_{j-1}) = (s_j, b_j)$ with $s_j \in \{0,1\}^\lambda$ and $b_j \in \{0,1\}$. For any efficiently computable polynomial stretch $\ell = \ell(\lambda) > 0$, define $G^\ell : \{0,1\}^\lambda \to \{0,1\}^{\lambda+\ell}$ on $s_0 \in \{0,1\}^\lambda$ by computing $(s_j, b_j) = G(s_{j-1})$ for $j = 1, \dots, \ell$ and outputting:

```text
  s_0 ---> [G] ---> s_1 ---> [G] ---> ... ---> s_{l-1} ---> [G] ---> s_l
            |                 |                              |
            v                 v                              v
           b_1               b_2                            b_l

  Output: G^l(s_0) = b_1 || b_2 || ... || b_l || s_l   (l + lambda bits)
```

> **State-Compromise Caveat:** Intermediate states $s_1, \dots, s_{\ell-1}$ must remain hidden (revealing $s_i$ lets an adversary check $G(s_i) = (s_{i+1}, b_{i+1})$). Moreover, outputting $s_\ell$ means $G^\ell$ offers no security after state compromise: learning any $s_i$ deterministically reveals all future bits $b_{i+1}, \dots$. Theorem 5.2 proves only that the finite output $(b_1,\dots,b_\ell, s_\ell)$ is pseudorandom.

> **Theorem 5.2 (Stretch Amplification).** If $G : \{0,1\}^\lambda \to \{0,1\}^{\lambda+1}$ is a secure PRG and $\ell(\lambda) = \operatorname{poly}(\lambda)$ is efficiently computable with $\ell(\lambda) > 0$, then $G^\ell : \{0,1\}^\lambda \to \{0,1\}^{\lambda+\ell}$ is a secure PRG, i.e., $G^\ell(U_\lambda) \approx_c U_{\lambda+\ell}$.

#### Proof of Theorem 5.2 via the Hybrid Argument

**1. Why a direct reduction fails.** Suppose a PPT adversary $\mathcal{A}$ distinguishes $G^\ell(U_\lambda)$ from $U_{\lambda+\ell}$ with non-negligible advantage $\varepsilon(\lambda) = |\Pr[\mathcal{A}(G^\ell(U_\lambda)) = 1] - \Pr[\mathcal{A}(U_{\lambda+\ell}) = 1]|$. A reduction $\mathcal{B}$ attacking $G$ receives only **one** challenge $z \in \{0,1\}^{\lambda+1}$, whereas $\mathcal{A}$ expects $\lambda+\ell$ bits from $\ell$ chained calls. We bridge the endpoints via **hybrid distributions** $H_0, H_1, \dots, H_\ell$ that replace calls to $G$ with uniform randomness one step at a time.

**2. Hybrids $H_0, \dots, H_\ell$.** For each $i \in \{0, 1, \dots, \ell\}$, sample from $H_i$ by:
1. Sampling $b_1, \dots, b_i \gets U_1$ and $s_i \gets U_\lambda$ independently.
2. Computing $(s_j, b_j) = G(s_{j-1})$ for $j = i + 1, \dots, \ell$.
3. Outputting $b_1 \parallel \dots \parallel b_\ell \parallel s_\ell$.

For $\ell = 4$, the progression runs:

| Hybrid | Uniform values sampled | Remaining $G$ calls | Distribution |
| --- | --- | --- | --- |
| $H_0$ | $s_0 \gets U_\lambda$ | $4$ from $s_0$ | $G^4(U_\lambda)$ |
| $H_1$ | $b_1 \gets U_1$, $s_1 \gets U_\lambda$ | $3$ from $s_1$ | $1$st step uniform |
| $H_2$ | $b_1, b_2 \gets U_1$, $s_2 \gets U_\lambda$ | $2$ from $s_2$ | $2$ steps uniform |
| $H_3$ | $b_1, b_2, b_3 \gets U_1$, $s_3 \gets U_\lambda$ | $1$ from $s_3$ | $3$ steps uniform |
| $H_4$ | $b_1, b_2, b_3, b_4 \gets U_1$, $s_4 \gets U_\lambda$ | $0$ calls | $U_{\lambda+4}$ |

At the endpoints, $H_0 \equiv G^\ell(U_\lambda)$ (all $\ell$ calls to $G$) and $H_\ell \equiv U_{\lambda+\ell}$ (zero calls to $G$, $\ell + \lambda$ uniform bits).

**3. Adjacent hybrids ($H_i \approx_c H_{i+1}$).** For any fixed $i \in \{0, \dots, \ell - 1\}$, $H_i$ and $H_{i+1}$ share the independent prefix $b_1, \dots, b_i \gets U_1$ and the deterministic tail $G^{\ell-i-1}(s_{i+1})$; they differ **only** in the joint pair $(s_{i+1}, b_{i+1})$, which is $G(s_i)$ ($s_i \gets U_\lambda$) in $H_i$ versus $U_{\lambda+1}$ in $H_{i+1}$. Thus any distinguisher between $H_i$ and $H_{i+1}$ directly breaks $G$ by placing its challenge $z = (s_{i+1}, b_{i+1})$ at step $i+1$.

**4. Randomized-index reduction $\mathcal{B}$.** Because $\ell(\lambda)$ grows with $\lambda$, fixed-$i$ transitivity does not suffice; a single PPT reduction $\mathcal{B}$ must pick the transition index at random:

```text
  Adversary A                     Reduction B                       Challenger C
  -----------                     -----------                       ------------
                                  sample I <- {0,...,l-1}  <-- z -- z <- G(U_lambda) or U_{lambda+1}
                                  sample b_1,...,b_i <- U_1
                                  parse z = (s_{i+1}, b_{i+1})
                                  compute (b_{i+2},...,b_l,s_l) = G^{l-i-1}(s_{i+1})
                <-- z' ---------  z' = (b_1,...,b_l, s_l)
  outputs b'    --- b' -------->  forwards b'              -- b' ->
```

Conditioned on any outcome $I = i$:
- If $z \gets G(U_\lambda)$, then $(s_{i+1}, b_{i+1}) = G(s_i)$ for implicit $s_i \gets U_\lambda$, so $z'$ has the **exact** distribution of $H_i$.
- If $z \gets U_{\lambda+1}$, then $(s_{i+1}, b_{i+1})$ is uniform over $\{0,1\}^{\lambda+1}$, so $z'$ has the **exact** distribution of $H_{i+1}$.

For example, with $\ell = 4$ and $i = 2$, $\mathcal{B}$ samples $b_1, b_2 \gets U_1$, parses $z = (s_3, b_3)$, computes $(s_4, b_4) = G(s_3)$, and passes $(b_1, b_2, b_3, b_4, s_4)$ to $\mathcal{A}$ ($H_2$ vs. $H_3$). Let $p_i = \Pr[\mathcal{A}(H_i) = 1]$. Then $\Pr[\mathcal{B}(G(U_\lambda)) = 1 \mid I = i] = p_i$ and $\Pr[\mathcal{B}(U_{\lambda+1}) = 1 \mid I = i] = p_{i+1}$. Averaging over $I \gets \{0, \dots, \ell - 1\}$, keeping signs inside the sum lets all intermediate terms cancel in a telescoping sum:

$$
\operatorname{Adv}_{\mathcal{B}}^G(\lambda)
= \left|\frac{1}{\ell}\sum_{i=0}^{\ell-1} p_i - \frac{1}{\ell}\sum_{i=0}^{\ell-1} p_{i+1}\right|
= \frac{1}{\ell}\left|\sum_{i=0}^{\ell-1} (p_i - p_{i+1})\right|
= \frac{|p_0 - p_\ell|}{\ell}
= \frac{\varepsilon(\lambda)}{\ell(\lambda)}.
$$

Since $\ell(\lambda) = \operatorname{poly}(\lambda)$, $G$ is PPT, and $\mathcal{A}$ is PPT, $\mathcal{B}$ is PPT and attains non-negligible advantage $\varepsilon(\lambda)/\ell(\lambda)$, contradicting the security of $G$. Hence $G^\ell(U_\lambda) \approx_c U_{\lambda+\ell}$. $\blacksquare$

### 5.4 Hard-Core Predicates and Building a 1-Bit-Stretch PRG from an OWP

One-wayness hides a full preimage $x$ given $f(x)$, not necessarily every bit of $x$: if $g$ is a OWF, $f(b, t) = (b, g(t))$ is still a OWF yet leaks $b$. We need a single bit of $x$ that looks unpredictable given $f(x)$.

> **Definition 5.3 (Hard-Core Predicate).** Let $f : \{0,1\}^n \to \{0,1\}^m$ be efficiently computable. A deterministic polynomial-time predicate $h : \{0,1\}^n \to \{0,1\}$ is **hard-core for $f$** if for every PPT $\mathcal{A}$,
>
> $$
> \Pr_{x \gets U_n}\bigl[\mathcal{A}(1^n, f(x)) = h(x)\bigr] \leq \frac{1}{2} + \operatorname{negl}(n),
> $$
>
> or equivalently in distributional form, $(f(x), h(x))_{x \gets U_n} \approx_c (f(x), u)_{x \gets U_n,\, u \gets U_1}$.

Equivalence holds because a predictor beating $1/2$ by $\varepsilon$ distinguishes $(f(x), h(x))$ from $(f(x), u)$ by checking equality with its second coordinate, and a distinguisher with gap $\varepsilon$ yields a predictor by testing $(f(x), u)$ for random $u$ and flipping $u$ when it guesses uniform. Note that having a hard-core predicate does *not* make $f$ one-way: $f(x_1 \parallel \dots \parallel x_n) = x_1 \parallel \dots \parallel x_{n-1}$ ignores $x_n$, so $h(x) = x_n$ is trivially hard-core, yet $y \parallel 0$ inverts $f$ with probability $1$.

A **one-way permutation (OWP)** is a bijective OWF $f : \{0,1\}^n \to \{0,1\}^n$, which preserves uniformity: $f(U_n) \equiv U_n$.

> **Theorem 5.3 (OWP + Hard-Core Predicate $\implies$ 1-Bit PRG).** If $f : \{0,1\}^n \to \{0,1\}^n$ is an OWP and $h : \{0,1\}^n \to \{0,1\}$ is hard-core for $f$, then $G(s) = f(s) \parallel h(s) : \{0,1\}^n \to \{0,1\}^{n+1}$ is a secure PRG.

*Proof.* $G$ is deterministic, polynomial-time, and stretches $n$ bits to $n+1$. For $s \gets U_n$ and independent $u \gets U_1$, the hard-core property gives $G(U_n) \equiv (f(s), h(s)) \approx_c (f(s), u)$. Since $f$ is a bijection and $u$ is independent of $s$, $(f(s), u) \equiv (U_n, U_1) \equiv U_{n+1}$, so $G(U_n) \approx_c U_{n+1}$. $\blacksquare$

**Limitation for arbitrary OWFs:** If $f$ is not a bijection, $f(U_n)$ need not be uniform (e.g., $0 \parallel g(x)$), so $f(s) \parallel h(s)$ may fail to be a PRG; extending to general OWFs requires additional hashing/extraction machinery.

---

## Lecture 6 — Goldreich–Levin and One-Time Computational Encryption

### 6.1 Impossibility of a Universal Hard-Core Predicate

> ### 🎯 [KEY EXERCISE STRATEGY ADVICE — Lecture 6]
> Course problems fall into two archetypes: (1) **prove security** (reduction, statistical, or hybrid argument), or (2) **disprove a general claim / break a construction**. For *"for every OWF $f$..."* (or *"for every PRF $F$..."*) disproofs, **build $f_{\mathrm{bad}}$ on top of an assumed secure primitive $f$** rather than constructing $f$ from scratch. Also note the contrast between zero-loss **"perfect reductions"** (e.g., PRG-OTP) and reductions losing a $1/2$ factor from guessing a $1$-bit secret like $h(x)$.

Can one fixed predicate $h$ be hard-core for *every* OWF? No: given any OWF $f$ and any efficient predicate $h$, we can leak $h(x)$ explicitly without breaking one-wayness.

> **Theorem 6.1 (No Universal Hard-Core Predicate).** Assume $f : \{0,1\}^n \to \{0,1\}^n$ is a OWF, and let $h : \{0,1\}^n \to \{0,1\}$ be any efficiently computable predicate. Define $f_{\mathrm{bad}}(x) = f(x) \parallel h(x) : \{0,1\}^n \to \{0,1\}^{n+1}$. Then $f_{\mathrm{bad}}$ is a OWF, yet $h$ is **not** hard-core for $f_{\mathrm{bad}}$.

*Proof.* Reading the last bit of $f_{\mathrm{bad}}(x)$ predicts $h(x)$ with probability $1$, so $h$ is not hard-core for $f_{\mathrm{bad}}$.

To prove $f_{\mathrm{bad}}$ is one-way, suppose a PPT inverter $\mathcal{A}$ inverts $f_{\mathrm{bad}}$ with non-negligible probability $\varepsilon(n)$. Build a PPT inverter $\mathcal{B}$ against $f$:

```text
  Inverter A                         Reduction B                       OWF Challenger C
  ----------                         -----------                       ----------------
                                     sample b~ <- U_1       <-- y --   x <- U_n, y = f(x)
                <-- y || b~ -------
  outputs x'    --- x' ----------->  forwards x'            -- x' ->   wins iff f(x') = y
```

Given $y = f(x)$, $\mathcal{B}$ cannot compute $h(x)$, so it guesses a single independent bit $\tilde{b} \gets U_1$ and sends $y \parallel \tilde{b}$ to $\mathcal{A}$. (Calling $\mathcal{A}$ twice with $0$ and $1$ is unnecessary; one random guess suffices.) Since $\tilde{b}$ is independent of $x$, $\Pr[\tilde{b} = h(x)] = 1/2$. Conditioned on $\tilde{b} = h(x)$:
- for every $x_0 \in \{0,1\}^n$, $\Pr[X = x_0 \mid \tilde{b} = h(X)] = \frac{2^{-n} \cdot (1/2)}{1/2} = 2^{-n}$, so $x$ remains uniform;
- $y \parallel \tilde{b} = f_{\mathrm{bad}}(x)$ has the **exact** distribution of a $\operatorname{Game}^{\mathrm{OWF}}_{f_{\mathrm{bad}}}$ challenge.

Thus $\mathcal{A}$ outputs $x'$ with $f(x') \parallel h(x') = y \parallel \tilde{b}$ (so $f(x') = y$) with conditional probability $\varepsilon(n)$, giving

$$
\Pr[\mathcal{B}\text{ wins}] \geq \Pr[\tilde{b} = h(x)] \cdot \Pr[\mathcal{A}\text{ wins} \mid \tilde{b} = h(x)] = \frac{1}{2}\varepsilon(n),
$$

which is non-negligible and contradicts the one-wayness of $f$. $\blacksquare$

### 6.2 The Goldreich–Levin Theorem

Padding any OWF $f$ with an independent random string $r$ yields a new OWF $g$ that *always* admits the binary inner product as an explicit hard-core predicate.

> **Theorem 6.2 (Goldreich–Levin).** Let $f : \{0,1\}^n \to \{0,1\}^n$ (more generally $\{0,1\}^n \to \{0,1\}^m$) be a OWF. Define $g : \{0,1\}^{2n} \to \{0,1\}^{2n}$ (respectively $\{0,1\}^{m+n}$) and $h : \{0,1\}^{2n} \to \{0,1\}$ on $(x, r) \in \{0,1\}^n \times \{0,1\}^n$ by
>
> $$
> g(x, r) = f(x) \parallel r, \qquad h(x, r) = \langle x, r \rangle = \sum_{i=1}^n x_i r_i \bmod 2 = \bigoplus_{i=1}^n x_i r_i.
> $$
>
> Then: (1) $g$ is a OWF, and (2) $h$ is a hard-core predicate for $g$.

For instance, if $n=4$, $x=1011$, and $r=1101$, then $h(x,r) = (1\cdot 1)\oplus(0\cdot 1)\oplus(1\cdot 0)\oplus(1\cdot 1) = 0$.

#### Proof of Property 1 ($g$ is a OWF)

Suppose a PPT adversary $\mathcal{A}$ inverts $g$ with non-negligible probability $\varepsilon(n)$. Build a PPT reduction $\mathcal{B}$ inverting $f$:

```text
  Inverter A                         Reduction B                       OWF Challenger C
  ----------                         -----------                       ----------------
                                     sample r <- U_n        <-- y --   x <- U_n, y = f(x)
                <-- y || r --------
  outputs (x',r') -- (x',r') ----->  outputs x'             -- x' ->   wins iff f(x') = y
```

Because $(x, r) \gets U_{2n}$ equals independent $x \gets U_n$ and $r \gets U_n$, $y \parallel r = f(x) \parallel r$ matches a real $g$-challenge **exactly** with probability $1$. Whenever $\mathcal{A}$ succeeds, $f(x') \parallel r' = y \parallel r$, so $f(x') = y$. Hence $\Pr[\mathcal{B}\text{ wins}] \ge \Pr[\mathcal{A}\text{ wins}] = \varepsilon(n)$, contradicting one-wayness of $f$.

**Why $r$ avoids the $1/2$ (or $2^{-n}$) factor of $f_{\mathrm{bad}}$:** In $f_{\mathrm{bad}}(x) = f(x) \parallel h(x)$, the suffix $h(x)$ depends deterministically on unknown $x$, forcing $\mathcal{B}$ to guess and lose $1/2$ (or $2^{-n}$ for an $n$-bit dependent suffix). In $g(x,r) = f(x) \parallel r$, $r$ is **independent** of $x$, so sampling $r \gets U_n$ yields a zero-loss simulation. $\blacksquare$

#### Intuition for Property 2 ($h$ is Hard-Core for $g$)

> ### ⚠️ [PROOF EXPLICITLY OMITTED — Lecture 6]
> Only Property 1 is proved in full; for Property 2, only the theorem statement, the idealized all-$r$ standard-basis intuition, and why it fails for general $\frac{1}{2} + \frac{1}{\operatorname{poly}(n)}$ adversaries are examinable.

If an idealized adversary $\mathcal{A}$ computed $\langle x, r \rangle$ with probability $1$ **for every $r \in \{0,1\}^n$**, then given $y = f(x)$ a reduction $\mathcal{B}$ could recover $x_i = \langle x, e_i \rangle$ for $i = 1, \dots, n$ by querying $\mathcal{A}$ on $y \parallel e_i$ (where $e_i$ is the $i$-th standard basis vector), inverting $f$ in $n$ calls.

**Why this is only intuition:** A real adversary only succeeds with probability $\frac{1}{2} + \frac{1}{\operatorname{poly}(n)}$ over **random** $r \gets U_n$; it could return $0$ on all $n$ basis vectors $e_1, \dots, e_n$ (a negligible $n/2^n$ fraction of $\{0,1\}^n$) while still breaking $h$ overall. The real proof extracts $x$ from noisy answers via correlated queries whose individual marginals remain uniform. Note that if $f$ is an OWP, then $g(x,r) = f(x) \parallel r$ is also an OWP on $\{0,1\}^{2n}$ with explicit hard-core predicate $\langle x, r \rangle$, yielding PRGs via Theorems 5.3 and 5.2.

### 6.3 Applying PRGs to Symmetric Encryption: PRG-OTP and One-Time Computational Security

> **Construction 6.1 (PRG-OTP).** Let $G : \{0,1\}^n \to \{0,1\}^{2n}$ (generally $\{0,1\}^\lambda \to \{0,1\}^{\lambda+\ell(\lambda)}$) be a secure PRG. For $\mathcal{K} = \{0,1\}^n$ and $\mathcal{M} = \mathcal{C} = \{0,1\}^{2n}$, define
>
> $$
> \operatorname{Enc}(k, m) = G(k) \oplus m, \qquad \operatorname{Dec}(k, c) = G(k) \oplus c.
> $$

Correctness holds for all $k, m$: $G(k) \oplus (G(k) \oplus m) = m$. (By stretch amplification, a short key suffices for any polynomial message length bound.) Two limitations remain: (1) **not perfectly secure** ($2^n$ pads $< 2^{2n}$ messages, so unbounded key enumeration breaks it; $|\mathcal{K}| < |\mathcal{M}|$, not determinism, violates Shannon's bound); (2) **strictly one-time** (deterministic encryption means $c_1 \oplus c_2 = m_1 \oplus m_2$ under key reuse).

For an SKE $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ and $b \in \{0,1\}$, define $\operatorname{Game}^{\mathrm{one\text{-}time}}_{\Pi, \mathcal{A}}(\lambda, b)$:

```text
  Adversary A                                        Challenger C
  -----------                                        ------------
  picks equal-length m_0, m_1 in M  -- m_0, m_1 -->  samples k <- K
                                    <----- c ------  computes c <- Enc(k, m_b)
  outputs guess b' in {0,1}         ----- b' ----->
```

> **Definition 6.1 (One-Time Computational Security).** An SKE $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ is **one-time computationally secure** if for every PPT adversary $\mathcal{A}$,
>
> $$
> \operatorname{Game}^{\mathrm{one\text{-}time}}_{\Pi, \mathcal{A}}(\lambda, 0) \approx_c \operatorname{Game}^{\mathrm{one\text{-}time}}_{\Pi, \mathcal{A}}(\lambda, 1),
> $$
>
> i.e., $\bigl|\Pr[\operatorname{Game}^{\mathrm{one\text{-}time}}_{\Pi, \mathcal{A}}(\lambda, 0) = 1] - \Pr[\operatorname{Game}^{\mathrm{one\text{-}time}}_{\Pi, \mathcal{A}}(\lambda, 1) = 1]\bigr| \leq \operatorname{negl}(\lambda)$.

**Equivalence with Katz–Lindell's single-game $\operatorname{PrivK}^{\mathrm{eav}}$ (and $\operatorname{PrivK}^{\mathrm{cpa}}$):** In the single-game version, $\mathcal{C}$ samples $b \gets \{0,1\}$ inside the game and requires $\Pr[b' = b] \le \frac{1}{2} + \operatorname{negl}(\lambda)$. Letting $p_b = \Pr[\operatorname{Game}(\lambda,b) = 1]$,

$$
\Pr[b' = b] = \frac{1}{2}(1 - p_0) + \frac{1}{2}p_1 = \frac{1}{2} + \frac{1}{2}(p_1 - p_0), \qquad \text{so} \qquad \left|\Pr[b'=b] - \frac{1}{2}\right| = \frac{1}{2}|p_1 - p_0|.
$$

(If $\Pr[b'=b] = \frac{1}{2} - \varepsilon$, flipping $\mathcal{A}$'s output bit gives $\frac{1}{2} + \varepsilon$.) Thus both formulations are equivalent for deterministic and randomized SKE, both one-time and CPA.

**Three sanity checks:** (1) Key-recovery hardness is implied, not sufficient ($\operatorname{Enc}(k,m)=m$ hides $k$ yet leaks $m$); (2) Full-message recovery hardness is implied, not sufficient—Definition 6.1 forbids leaking *even one bit* (otherwise $\mathcal{A}$ submits $m_0=0000, m_1=1000$); (3) Only a single ciphertext under $k$ is covered.

#### Security Proof of PRG-OTP (Game Hopping)

> **Theorem 6.3 (One-Time Security of PRG-OTP).** If $G : \{0,1\}^n \to \{0,1\}^{2n}$ (generally $\{0,1\}^\lambda \to \{0,1\}^{\lambda+\ell}$) is a secure PRG, then PRG-OTP is one-time computationally secure.

*Proof.* Fix any PPT $\mathcal{A}$ and write $G_b \equiv \operatorname{Game}^{\mathrm{one\text{-}time}}_{\Pi,\mathcal{A}}(\lambda, b)$ ($b \in \{0,1\}$). Define hybrid games $H_0, H_1$ identically to $G_0, G_1$ except the challenger replaces $G(k)$ with a uniform pad $z \gets U_{2n}$ and returns $c = z \oplus m_b$:

$$
G_0 \;\approx_c\; H_0 \;\equiv\; H_1 \;\approx_c\; G_1.
$$

- **Step 1 ($H_0 \equiv H_1$):** In $H_b$, $z \gets U_{2n}$ is independent of $m_0, m_1$, so $c = z \oplus m_b$ is the standard OTP. Both $z \oplus m_0$ and $z \oplus m_1$ are uniform on $\{0,1\}^{2n}$, hence $H_0 \equiv H_1$ and $\Pr[H_0 = 1] - \Pr[H_1 = 1] = 0$.
- **Step 2 ($G_b \approx_c H_b$ for fixed $b \in \{0,1\}$):** Suppose $\mathcal{A}$ distinguishes $G_b$ from $H_b$ with non-negligible advantage $\varepsilon(\lambda) = |\Pr[G_b=1] - \Pr[H_b=1]|$. Build a PPT distinguisher $\mathcal{B}$ against $G$:

```text
  Adversary A                     Reduction B                      PRG Challenger C
  -----------                     -----------                      ----------------
                <-- start ------                                   z <- G(U_n) or U_{2n}
  picks m_0,m_1 -- m_0,m_1 ---->  c = z (+) m_b           <-- z --
                <----- c -------
  outputs b'    ----- b' ------>  forwards b'             -- b' ->
```

This is a zero-loss **perfect reduction**: if $z = G(k)$ ($k \gets U_n$), $c = G(k) \oplus m_b$ simulates $G_b$ identically; if $z \gets U_{2n}$, $c = z \oplus m_b$ simulates $H_b$ identically. Thus $\operatorname{Adv}^G_{\mathcal{B}}(\lambda) = |\Pr[G_b=1] - \Pr[H_b=1]| = \varepsilon(\lambda)$, contradicting PRG security of $G$. Hence $|\Pr[G_b=1] - \Pr[H_b=1]| \le \operatorname{negl}_b(\lambda)$ for $b \in \{0,1\}$.
- **Step 3 (Triangle inequality):** $|\Pr[G_0=1] - \Pr[G_1=1]| \le |\Pr[G_0=1] - \Pr[H_0=1]| + 0 + |\Pr[H_1=1] - \Pr[G_1=1]| \le \operatorname{negl}_0(\lambda) + \operatorname{negl}_1(\lambda) = \operatorname{negl}(\lambda)$. $\blacksquare$

### 6.4 Solved Exercises

> **Problem 3.1.** For $m > n$, let $G : \{0,1\}^n \to \{0,1\}^m$ be a secure PRG. Prove or disprove that $G'(s) = G(s) \oplus (0^{m-n} \parallel s)$ is necessarily a secure PRG.

**Solution:** **Disproved** (for $n \ge 2$). Let $G^* : \{0,1\}^{n-1} \to \{0,1\}^{m-1}$ be a secure PRG (since $m-1 > n-1$), and define $G(s) = G^*(s_{1:n-1}) \parallel s_n$ for $s = s_{1:n-1} \parallel s_n \in \{0,1\}^n$. Because $s_{1:n-1} \gets U_{n-1}$ and $s_n \gets U_1$ are independent,

$$
G(U_n) \equiv \bigl(G^*(U_{n-1}),\, U_1\bigr) \approx_c (U_{m-1},\, U_1) \equiv U_m
$$

(any PPT distinguisher $\mathcal{A}$ against $G$ gives $\mathcal{A}'(w) = \mathcal{A}(w \parallel u)$ with $u \gets U_1$ against $G^*$ with identical advantage). For this valid PRG $G$, splitting $G^*(s_{1:n-1}) \in \{0,1\}^{m-1}$ into its first $m-n$ bits and remaining $n-1$ bits gives

$$
\begin{aligned}
G'(s) &= G(s) \oplus (0^{m-n} \parallel s_{1:n-1} \parallel s_n) \\
&= G^*(s_{1:n-1})_{1:m-n} \parallel \bigl(G^*(s_{1:n-1})_{m-n+1:m-1} \oplus s_{1:n-1}\bigr) \parallel (s_n \oplus s_n) \\
&= G^*(s_{1:n-1})_{1:m-n} \parallel \bigl(G^*(s_{1:n-1})_{m-n+1:m-1} \oplus s_{1:n-1}\bigr) \parallel 0.
\end{aligned}
$$

Thus the last bit of $G'(s)$ is always $0$. The PPT distinguisher $\mathcal{A}(z)$ outputting $1$ iff $z_m = 0$ satisfies $\Pr[\mathcal{A}(G'(U_n)) = 1] = 1$ and $\Pr[\mathcal{A}(U_m) = 1] = 1/2$, achieving advantage $1/2$. $\blacksquare$

> **Problem 3.2.** Given efficiently computable $f_1, f_2, f_3 : \{0,1\}^n \to \{0,1\}^n$ such that at least one is a OWF (unknown which), construct a OWF $f$ in a black-box manner.

**Solution:** Define $f : \{0,1\}^{3n} \to \{0,1\}^{3n}$ by $f(x_1 \parallel x_2 \parallel x_3) = f_1(x_1) \parallel f_2(x_2) \parallel f_3(x_3)$, which is $\operatorname{poly}(n)$-time computable. Fix $i \in \{1, 2, 3\}$ such that $f_i$ is a OWF. If a PPT $\mathcal{A}$ inverts $f$ with non-negligible probability $\varepsilon(n)$, construct a PPT inverter $\mathcal{B}_i$ against $f_i$:
1. Receive challenge $y = f_i(x_i)$ ($x_i \gets U_n$).
2. For both $j \in \{1, 2, 3\} \setminus \{i\}$, sample $x_j \gets U_n$ independently and set $y'_j = f_j(x_j)$; set $y'_i = y$.
3. Run $\mathcal{A}(y'_1 \parallel y'_2 \parallel y'_3)$ to get $x'_1 \parallel x'_2 \parallel x'_3$, and output $x'_i$.

Since $x_i$ and both $x_j$ are independent uniform draws from $U_n$, $y'_1 \parallel y'_2 \parallel y'_3 = f(x_1 \parallel x_2 \parallel x_3)$ is distributed **identically** to a real $f$-challenge. Whenever $\mathcal{A}$ succeeds, $f_i(x'_i) = y'_i = y$, so $\mathcal{B}_i$ inverts $f_i$ with probability $\ge \varepsilon(n)$ (non-negligible in $n$), contradicting one-wayness of $f_i$. $\blacksquare$

---

## Lecture 7 — Pseudorandom Functions and CPA-Secure Encryption

To encrypt polynomially many messages under one short key, we need a primitive generating many distinct pseudorandom pads from a fixed key $k$: a **pseudorandom function (PRF)**.

### 7.1 Syntax and Security of Pseudorandom Functions

> **Definition 7.1 (Pseudorandom Function Family).** Let $n = n(\lambda) = \operatorname{poly}(\lambda)$. An efficiently computable **function family** $\mathcal{F} = \{F_k : \{0,1\}^n \to \{0,1\}^n\}_{k \in \{0,1\}^\lambda}$ is a deterministic polynomial-time algorithm $F(k, x) = F_k(x)$ for all $k \in \{0,1\}^\lambda, x \in \{0,1\}^n$. (More generally, $F_k : \{0,1\}^n \to \{0,1\}^m$.)

Note: (1) $k \gets U_\lambda$ selects which function $F_k \in \mathcal{F}$ is active; (2) $F_k$ need not be injective, and distinct keys may yield the same function; (3) for encryption we choose $n = n(\lambda)$ large enough that $2^{-n}$ is negligible (e.g., $n \ge \lambda$).

Let $\mathcal{R}(n, n)$ be the set of **all** functions $\{0,1\}^n \to \{0,1\}^n$, of size $|\mathcal{R}(n, n)| = (2^n)^{2^n} = 2^{n \cdot 2^n}$. Choosing $R \gets \mathcal{R}(n, n)$ selects a truth table uniformly at setup; **once chosen, $R$ is deterministic** (repeating a query $x$ returns the same $R(x)$).

Define two interactive games for any PPT $\mathcal{A}^{\mathcal{O}}(1^\lambda)$:

```text
  Adversary A                        Challenger C (Real vs. Ideal)
  -----------                        -----------------------------
                                     Real:  sample k <- U_lambda, set O = F_k
                                     Ideal: sample R <- R(n, n),  set O = R
  [adaptive loop, poly(lambda) times:]
  chooses x in {0,1}^n   --- x --->
                         <-- y ----  computes y = O(x)
  outputs guess b'       --- b' -->
```

These define $\operatorname{Game}^{\mathrm{real}}_{\mathcal{F},\mathcal{A}}(\lambda)$ and $\operatorname{Game}^{\mathrm{ideal}}_{\mathcal{F},\mathcal{A}}(\lambda)$.

> **Definition 7.2 (PRF Security).** $\mathcal{F}$ is a **secure PRF** if for every PPT adversary $\mathcal{A}$, $\operatorname{Game}^{\mathrm{real}}_{\mathcal{F}, \mathcal{A}}(\lambda) \approx_c \operatorname{Game}^{\mathrm{ideal}}_{\mathcal{F}, \mathcal{A}}(\lambda)$, i.e.,
>
> $$
> \left|\Pr_{k \gets U_\lambda}\!\bigl[\mathcal{A}^{F_k}(1^\lambda) = 1\bigr] - \Pr_{R \gets \mathcal{R}(n,n)}\!\bigl[\mathcal{A}^{R}(1^\lambda) = 1\bigr]\right| \leq \operatorname{negl}(\lambda).
> $$

(No explicit query bound $q$ is needed because any PPT $\mathcal{A}$ makes at most $q(\lambda) = \operatorname{poly}(\lambda)$ queries.)

### 7.2 Lazy Sampling: Efficient Simulation of $\operatorname{Game}^{\mathrm{ideal}}$

Sampling a full table $R \gets \mathcal{R}(n, n)$ upfront takes $n \cdot 2^n$ bits. Against any $q(\lambda) = \operatorname{poly}(\lambda)$-query adversary, a **PPT simulator $\mathcal{C}'$** reproduces the exact same oracle distribution via **lazy sampling**:
1. Initialize an empty lookup table $T = \emptyset$.
2. On query $x \in \{0,1\}^n$: if $(x, y) \in T$, return $y$; otherwise sample $y \gets U_n$ independently, store $(x, y)$ in $T$, and return $y$.

Because $R \gets \mathcal{R}(n, n)$ assigns independent uniform outputs to distinct inputs, on-demand sampling gives the **exact** distribution of $R$ in polynomial time and space.

### 7.3 Exercise: No PRF Against Unbounded Adversaries

Whenever $n \cdot 2^n \ge \lambda + 1$ (including $n = \lambda$ or any $n = \omega(\log \lambda)$), no family $\mathcal{F}$ is secure against unbounded adversaries:
1. Fix $t = \lceil (\lambda + 1)/n \rceil \le 2^n$ distinct inputs $x_1, \dots, x_t \in \{0,1\}^n$ (so $tn \ge \lambda + 1$).
2. Query $\mathcal{O}$ on $x_1, \dots, x_t$ to obtain $(y_1, \dots, y_t)$.
3. Enumerate all $2^\lambda$ keys $k \in \{0,1\}^\lambda$; output $1$ iff some $k$ satisfies $F_k(x_j) = y_j$ for all $j \in \{1, \dots, t\}$.

- **Real ($\mathcal{O} = F_{k^*}$):** True key $k^*$ matches all $t$ pairs, so $\Pr[\mathcal{A}^{F_k}(1^\lambda) = 1] = 1$.
- **Ideal ($\mathcal{O} = R$):** Since $x_1, \dots, x_t$ are distinct, $(R(x_1), \dots, R(x_t))$ is uniform over $(\{0,1\}^n)^t$ of size $2^{tn} \ge 2^{\lambda+1}$, and each $k$ matches at most one tuple, so $\Pr[\mathcal{A}^R(1^\lambda) = 1] \le 2^\lambda / 2^{tn} \le 2^\lambda / 2^{\lambda+1} = 1/2$.

Hence $\mathcal{A}$ achieves advantage $\ge 1/2$. *(Only if $n \cdot 2^n \le \lambda$, e.g. constant $n=1$, could $2^\lambda$ keys cover all of $\mathcal{R}(n,n)$.)*

### 7.4 Where PRFs Come From in Practice and Theory

- **Practice:** Block ciphers like AES and 3DES are heuristically modeled as PRFs (specifically pseudorandom permutations). **AES alone is not a secure encryption scheme**—deterministic block encryption fails CPA security—so it is used as a PRF inside randomized modes.
- **Theory:** Any OWF yields a PRF via PRGs and GGM (Lecture 8), or practical algebraic assumptions (factoring, DL, lattices) yield provably secure PRFs. Public-key encryption cannot be built in a black-box way from PRFs alone. Once a PRF is assumed, the CPA-secure scheme and proof are identical in theory and practice.

> ### 📝 [LECTURE 7 PROOF, CORRECTNESS & NOTATION CUES]
> - **AES & PKE barrier:** AES as a PRF is an unproven assumption; PKE cannot be built black-box from PRFs.
> - **Perfect correctness:** All symmetric schemes until post-quantum/lattice encryption (Ch. 8) have zero decryption error.
> - **Conventions:** Two-game $\operatorname{Game}(\lambda,0/1)$ vs. single coin $b \gets \{0,1\}$ are interchangeable; Lemma 7.1 writes out the full probability equations skipped on the board in class.

### 7.5 CPA Security and Randomized Encryption

In a **Chosen-Plaintext Attack (CPA)**, $\mathcal{A}$ adaptively queries an encryption oracle $\operatorname{Enc}_k(\cdot)$ before and after its challenge. For fixed $b \in \{0,1\}$, define $\operatorname{Game}^{\mathrm{cpa}}_{\Pi,\mathcal{A}}(\lambda, b)$:

```text
  Adversary A                                        Challenger C
  -----------                                        ------------
                                                     sample k <- K
  [Phase 1 & 2: poly(lambda) adaptive queries m]
  m in M                     --- m ------------->    c <- Enc_k(m)
                             <-- c --------------
  [Challenge:]
  |m_0^*| = |m_1^*|          -- m_0^*, m_1^* --->    c^* <- Enc_k(m_b^*)
                             <-- c^* ------------
  outputs b' in {0,1}        --- b' ------------>
```

> **Definition 7.3 (CPA Security).** An SKE $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ is **CPA-secure** if for every PPT adversary $\mathcal{A}$, $\operatorname{Game}^{\mathrm{cpa}}_{\Pi,\mathcal{A}}(\lambda, 0) \approx_c \operatorname{Game}^{\mathrm{cpa}}_{\Pi,\mathcal{A}}(\lambda, 1)$ (equivalently $\Pr[b'=b] \le \frac{1}{2} + \operatorname{negl}(\lambda)$ in $\operatorname{PrivK}^{\mathrm{cpa}}$).

> **Proposition 7.1 (No Deterministic SKE is CPA-Secure).** No deterministic SKE $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ (with $|\mathcal{M}| \ge 2$ for equal-length messages) is CPA-secure.

*Proof.* $\mathcal{A}$ picks distinct equal-length $m_0^*, m_1^* \in \mathcal{M}$, queries $m_0^*$ in Phase 1 to get $c_0 = \operatorname{Enc}_k(m_0^*)$, submits $(m_0^*, m_1^*)$ as its challenge to get $c^* = \operatorname{Enc}_k(m_b^*)$, and outputs $0$ iff $c^* = c_0$. By decryption correctness, $\operatorname{Enc}_k(m_0^*) \neq \operatorname{Enc}_k(m_1^*)$, so $\mathcal{A}$ outputs $0$ with probability $1$ when $b=0$ and $0$ when $b=1$ (advantage $1$). $\blacksquare$

Hence **$\operatorname{Enc}_k$ must be randomized**: $c \gets \operatorname{Enc}_k(m) \equiv \operatorname{Enc}_k(m; r)$ for fresh $r \gets \mathcal{R}$, while $\operatorname{Dec}_k$ remains deterministic using metadata in $c$. Randomization is necessary, not sufficient (e.g., $(r, m)$ is randomized yet trivially broken).

### 7.6 PRF-OTP Construction and Full Proof of CPA Security

> **Construction 7.1 (PRF-OTP).** Let $\mathcal{F} = \{F_k : \{0,1\}^n \to \{0,1\}^n\}_{k \in \{0,1\}^\lambda}$ be a PRF family. For $\mathcal{K} = \{0,1\}^\lambda$ and $\mathcal{M} = \{0,1\}^n$, define
>
> $$
> \operatorname{Enc}_k(m) = \bigl(r,\, F_k(r) \oplus m\bigr) \quad (r \gets U_n), \qquad \operatorname{Dec}_k(c_1, c_2) = F_k(c_1) \oplus c_2.
> $$

Correctness holds for all $k, m, r$ ($F_k(r) \oplus (F_k(r) \oplus m) = m$), and decryption evaluates $F_k$ only in the forward direction (no invertibility needed).

> **Theorem 7.1 (CPA Security of PRF-OTP).** If $\mathcal{F} = \{F_k : \{0,1\}^n \to \{0,1\}^n\}_{k \in \{0,1\}^\lambda}$ is a secure PRF with $2^{-n} = \operatorname{negl}(\lambda)$ (e.g., $n \ge \lambda$), then PRF-OTP is CPA-secure.

*Proof.* Fix any PPT $\mathcal{A}$ and let $G(\lambda, b) \equiv \operatorname{Game}^{\mathrm{cpa}}_{\Pi, \mathcal{A}}(\lambda, b)$. Define hybrid game $H(\lambda, b)$ identically to $G(\lambda, b)$ except the challenger samples $R \gets \mathcal{R}(n, n)$ at setup and answers every query $m$ with $(r, R(r) \oplus m)$ ($r \gets U_n$) and the challenge with $(r^*, R(r^*) \oplus m_b^*)$ ($r^* \gets U_n$). We bridge $G(\lambda, 0)$ to $G(\lambda, 1)$ via $G(\lambda, 0) \approx_c H(\lambda, 0) \approx_s H(\lambda, 1) \approx_c G(\lambda, 1)$ using two lemmas.

#### Lemma 7.1 (Computational Indistinguishability: $G(\lambda, b) \approx_c H(\lambda, b)$)

*Proof.* Fix $b \in \{0,1\}$ and suppose a PPT $\mathcal{A}$ distinguishes $G(\lambda, b)$ from $H(\lambda, b)$ with non-negligible advantage $\varepsilon(\lambda) = |\Pr[G(\lambda, b) = 1] - \Pr[H(\lambda, b) = 1]|$. Build a PPT reduction $\mathcal{B}$ attacking $\mathcal{F}$ against $\mathcal{C}$ ($\mathcal{O} = F_k$ or $\mathcal{O} = R$, or its lazy-sampling PPT simulator):

```text
  CPA Adversary A                 Reduction B                     PRF Challenger C
  ---------------                 -----------                     ----------------
                                                                  O = F_k or O = R
  [Phase 1 & 2:] query m  -- m -> sample r <- U_n      --- r --->
                          <- c -- c = (r, z (+) m)     <-- z ---- z = O(r)
  [Challenge:] m_0^*,m_1* ------> sample r^* <- U_n    -- r^* -->
                          <- c* - c^*=(r^*,z^*(+)m_b*) <-- z^* -- z^* = O(r^*)
  outputs b'              -- b'-> forwards b'          -- b' --->
```

$\mathcal{B}$ runs in polynomial time, and simulation is **exact** in both worlds (even if nonces collide, since both $F_k$ and $R$ are deterministic): $\mathcal{O} = F_k$ reproduces $G(\lambda, b)$ identically, and $\mathcal{O} = R$ reproduces $H(\lambda, b)$ identically. Hence $\mathcal{B}$ achieves exact advantage $\varepsilon(\lambda)$ against $\mathcal{F}$, contradicting PRF security. Thus $G(\lambda, b) \approx_c H(\lambda, b)$ for $b \in \{0,1\}$. $\blacksquare$

#### Lemma 7.2 (Statistical Indistinguishability: $H(\lambda, 0) \approx_s H(\lambda, 1)$)

*Claim.* For every (even unbounded) adversary $\mathcal{A}$ making at most $q = q(\lambda) = \operatorname{poly}(\lambda)$ total queries (encryption + challenge), $\operatorname{SD}(H(\lambda, 0); H(\lambda, 1)) \le \operatorname{negl}(\lambda)$, so $H(\lambda, 0) \approx_c H(\lambda, 1)$.

*Proof.* Without encryption queries, $R(r^*)$ is uniform and independent of $r^*, m_b^*$, making $c^*$ a fresh OTP. With encryption queries, if a query $m = 0^n$ ever draws the same nonce $r = r^*$, $\mathcal{A}$ learns $R(r^*)$ and recovers $m_b^*$. Define $\mathrm{BAD}$ as the event that the challenge nonce $r^*$ equals any encryption-query nonce $r_i$.

- **Conditioned on $\overline{\mathrm{BAD}}$:** $R$ is queried at $r^*$ only once, so $R(r^*)$ is a fresh uniform $z^* \gets U_n$ independent of all other replies and $(m_0^*, m_1^*)$. Thus $c_2^* = z^* \oplus m_b^*$ is an independent OTP, giving $(H(\lambda, 0) \mid \overline{\mathrm{BAD}}) \equiv (H(\lambda, 1) \mid \overline{\mathrm{BAD}})$.
- **Bounding $\Pr[\mathrm{BAD}]$:** Across all $q$ independent uniform nonces $r_1, \dots, r_q \gets U_n$, any pair has collision probability $2^{-n}$. By a union bound over all $\binom{q}{2}$ pairs (or $(q-1)$ pairs involving $r^*$),

  $$
  \Pr[\mathrm{BAD}] \leq \Pr_{r_1, \dots, r_q \gets U_n}\!\bigl[\exists\, 1 \le i < j \le q : r_i = r_j\bigr] \leq \binom{q}{2} \cdot 2^{-n} = \operatorname{negl}(\lambda),
  $$

  since $q = \operatorname{poly}(\lambda)$ and $2^{-n} = \operatorname{negl}(\lambda)$.

Because the conditional distributions given $\overline{\mathrm{BAD}}$ are identical, $\operatorname{SD}(H(\lambda, 0); H(\lambda, 1)) \le \Pr[\mathrm{BAD}] \le \binom{q}{2} 2^{-n} = \operatorname{negl}(\lambda)$. Every PPT $\mathcal{A}$ makes $\operatorname{poly}(\lambda)$ queries and has advantage at most $\operatorname{SD}$, so $H(\lambda, 0) \approx_c H(\lambda, 1)$. $\blacksquare$

#### Combining Lemmas 7.1 and 7.2

Applying the triangle inequality along $G(\lambda,0) \approx_c H(\lambda,0) \approx_s H(\lambda,1) \approx_c G(\lambda,1)$ gives

$$
\begin{aligned}
\bigl|\Pr[G(\lambda, 0) = 1] - \Pr[G(\lambda, 1) = 1]\bigr|
&\leq \bigl|\Pr[G(\lambda, 0) = 1] - \Pr[H(\lambda, 0) = 1]\bigr| \\
&\quad + \bigl|\Pr[H(\lambda, 0) = 1] - \Pr[H(\lambda, 1) = 1]\bigr| \\
&\quad + \bigl|\Pr[H(\lambda, 1) = 1] - \Pr[G(\lambda, 1) = 1]\bigr| \\
&\leq \operatorname{negl}_0(\lambda) + \operatorname{negl}_{\mathrm{stat}}(\lambda) + \operatorname{negl}_1(\lambda) = \operatorname{negl}(\lambda).
\end{aligned}
$$

Hence $G(\lambda,0) \approx_c G(\lambda,1)$, proving PRF-OTP is CPA-secure. $\blacksquare$

---

## Lecture 8 — Constructing PRFs from PRGs (The GGM Construction)

Lecture 8 closes the loop by constructing a secure PRF from **any length-doubling PRG** $G : \{0,1\}^\lambda \to \{0,1\}^{2\lambda}$ (which exists from any OWF by Theorem 5.1). Setting $F_k(x) = G(x)$ fails because $G$ ignores $k$; instead, we weave $k$ along the path selected by $x$.

### 8.1 The Goldreich–Goldwasser–Micali (GGM) Tree Construction

Split $G(s) = G_0(s) \parallel G_1(s)$ into two $\lambda$-bit halves $G_0, G_1 : \{0,1\}^\lambda \to \{0,1\}^\lambda$, so either half can seed another call to $G$.

> **Definition 8.1 (GGM PRF Family).** Let $G : \{0,1\}^\lambda \to \{0,1\}^{2\lambda}$ be a length-doubling PRG with $G(s) = G_0(s) \parallel G_1(s)$ ($|G_0(s)| = |G_1(s)| = \lambda$). For any $n = n(\lambda) = \operatorname{poly}(\lambda)$, define $\mathcal{F} = \{F_k : \{0,1\}^n \to \{0,1\}^\lambda\}_{k \in \{0,1\}^\lambda}$ on $x = x_1 x_2 \dots x_n \in \{0,1\}^n$ by
>
> $$
> F_k(x) = G_{x_n}\!\Bigl(G_{x_{n-1}}\!\bigl(\cdots G_{x_2}(G_{x_1}(k)) \cdots\bigr)\Bigr).
> $$

For $n = 3$, the binary tree has $8$ leaves, and $F_k(011) = G_1(G_1(G_0(k)))$ traverses $x_1=0, x_2=1, x_3=1$:

```text
                       [ k ]
                     /       \
                G_0 /         \ G_1
                   v           v
            [ G_0(k) ]       [ G_1(k) ]
            /       \         /       \
       G_0 /     G_1 \   G_0 /     G_1 \
          v           v     v           v
   [G_0(G_0(k))] [G_1(G_0(k))] [G_0(G_1(k))] [G_1(G_1(k))]
     /   \         /   \\        /   \         /   \
   0/    1\      0/    1\\     0/    1\      0/    1\
  000    001    010    *011*  100    101    110    111
```

Although the conceptual tree has $2^n$ leaves, evaluating $F_k(x)$ follows only one root-to-leaf path ($n = \operatorname{poly}(\lambda)$ calls to $G$), never materializing the tree.

### 8.2 Why Naive Tree-Wide Hybridization Fails, and the Multiple-PRG Lemma

> **Theorem 8.1 (Security of GGM).** If $G : \{0,1\}^\lambda \to \{0,1\}^{2\lambda}$ is a secure PRG, then for every $n = n(\lambda) = \operatorname{poly}(\lambda)$, the GGM family $\mathcal{F} = \{F_k : \{0,1\}^n \to \{0,1\}^\lambda\}_{k \in \{0,1\}^\lambda}$ is a secure PRF.

**Why naive tree-wide hybridization fails:** Replacing internal tree nodes with uniform strings one node at a time uses $T(\lambda) = \Omega(2^n)$ hybrids, yielding an overall bound $T(\lambda)\varepsilon(\lambda) = \Omega(2^n)\varepsilon(\lambda)$ that need not be negligible (e.g., $2^\lambda \cdot 2^{-\lambda} = 1$). Because a PPT adversary makes only $q(\lambda) = \operatorname{poly}(\lambda)$ queries, we prove Theorem 8.1 via the **Multiple-PRG Lemma** and **induction on $n$** ($n(\lambda)$ levels, at most $q(\lambda)$ active seeds per level).

> **Lemma 8.1 (Multiple-PRG Indistinguishability).** Let $G : \{0,1\}^\lambda \to \{0,1\}^{2\lambda}$ be a secure PRG. For every polynomial $t = t(\lambda) = \operatorname{poly}(\lambda)$,
>
> $$
> \bigl(G(k_1),\, G(k_2),\, \dots,\, G(k_t)\bigr) \approx_c \bigl(U_{2\lambda},\, U_{2\lambda},\, \dots,\, U_{2\lambda}\bigr),
> $$
>
> where $k_1, \dots, k_t \gets U_\lambda$ are sampled **independently** and the $t$ copies of $U_{2\lambda}$ are independent.

*Proof.* Define hybrids $H_0, \dots, H_t$ by $H_i \equiv (U_{2\lambda}, \dots, U_{2\lambda}, G(k_{i+1}), \dots, G(k_t))$ with $i$ independent uniform copies of $U_{2\lambda}$ and independent $k_{i+1}, \dots, k_t \gets U_\lambda$. Then $H_0 \equiv (G(k_1),\dots,G(k_t))$, $H_t \equiv (U_{2\lambda},\dots,U_{2\lambda})$, and $H_{i-1}, H_i$ ($i \in \{1,\dots,t\}$) differ only in slot $i$.

Suppose a PPT $\mathcal{A}$ distinguishes $H_0$ from $H_t$ with non-negligible advantage $\varepsilon(\lambda) = |\Pr[\mathcal{A}(H_0)=1] - \Pr[\mathcal{A}(H_t)=1]|$. Build a PPT distinguisher $\mathcal{B}$ against $G$:

```text
  Adversary A                     Reduction B                       PRG Challenger C
  -----------                     -----------                       ----------------
                                  sample I <- {1,...,t}    <-- z -- z <- G(U_lambda) or U_{2 lambda}
                                  sample u_1,...,u_{i-1} <- U_{2 lambda}
                                  sample k_{i+1},...,k_t <- U_lambda
                <-- tuple ------  (u_1,...,u_{i-1}, z, G(k_{i+1}),...,G(k_t))
  outputs b'    --- b' -------->  forwards b'              -- b' ->
```

**Where seed independence is used:** Because $k_1, \dots, k_t$ are **independent** draws from $U_\lambda$, $\mathcal{B}$ can sample $k_{i+1}, \dots, k_t \gets U_\lambda$ and evaluate $G(k_{i+1}), \dots, G(k_t)$ without knowing the hidden seed $k_i$ inside $z$ (conditioning on distinct keys $k_i \neq k_j$ would destroy this independence!).

Conditioned on $I = i$, the tuple matches $H_{i-1}$ identically if $z \gets G(U_\lambda)$ and $H_i$ identically if $z \gets U_{2\lambda}$. Setting $p_j = \Pr[\mathcal{A}(H_j)=1]$ and averaging over $I \gets \{1,\dots,t\}$, the sum telescopes to $\operatorname{Adv}^G_{\mathcal{B}}(\lambda) = |p_0 - p_t|/t(\lambda) = \varepsilon(\lambda)/t(\lambda)$, which is non-negligible and contradicts PRG security of $G$. $\blacksquare$

> ### 🎯 [PROOF STRATEGY "RULE OF THUMB" — Lecture 8]
> 1. **When to use a Hybrid Argument:** *"If you have an experiment where you need to use the security of a primitive many times, this suggests you should do a hybrid [argument]."* Always pinpoint where **seed/key independence** lets the single-sample reduction simulate the remaining coordinates.
> 2. **Claim 8.1 below:** Treated as a quick exercise sketch in class; the full formal reduction is given in §8.3.

### 8.3 Inductive Proof of the GGM Theorem

*Proof of Theorem 8.1.* We proceed by induction on $n$ (for $n(\lambda) = \operatorname{poly}(\lambda)$). Write any $n$-bit input as $(x, y)$ where $x \in \{0,1\}$ is the **last bit** and $y \in \{0,1\}^{n-1}$ is the **prefix** ($y \parallel x$). Letting $F'_k : \{0,1\}^{n-1} \to \{0,1\}^\lambda$ be the $(n-1)$-bit GGM function,

```text
  [ k ] --(y in {0,1}^{n-1})--> [ F'_k(y) ] --(x=0 / x=1)--> G_x(F'_k(y)) = F_k(x, y)
```

$$
F_k(x, y) = G_x\bigl(F'_k(y)\bigr), \qquad x \in \{0,1\},\quad y \in \{0,1\}^{n-1}.
$$

#### Base Case ($n = 1$)

For $n = 1$, $F_k(0) = G_0(k)$ and $F_k(1) = G_1(k)$. Since $k \gets U_\lambda$ and $G$ is a secure PRG, the **joint** two-row truth table satisfies

$$
\bigl(F_k(0),\, F_k(1)\bigr) = \bigl(G_0(k),\, G_1(k)\bigr) = G(k) \approx_c U_{2\lambda} \equiv (U_\lambda,\, U_\lambda),
$$

which is the exact truth table of $R \gets \mathcal{R}(1, \lambda)$. Hence even an adversary querying both $0$ and $1$ cannot distinguish $F_k$ from $R$, so GGM is a secure PRF for $n = 1$.

#### Inductive Step ($n - 1 \implies n$)

Assume $\mathcal{F}' = \{F'_k : \{0,1\}^{n-1} \to \{0,1\}^\lambda\}_{k \in \{0,1\}^\lambda}$ is a secure PRF. Fix any PPT adversary $\mathcal{A}$ making at most $q = q(\lambda) = \operatorname{poly}(\lambda)$ queries $(x, y) \in \{0,1\} \times \{0,1\}^{n-1}$, and define three games:
1. **$\mathrm{Game}_0(\lambda)$ (Real):** Sample $k \gets U_\lambda$; answer $(x, y)$ with $F_k(x, y) = G_x(F'_k(y))$.
2. **$\mathrm{Game}_1(\lambda)$ (Hybrid):** Sample $R' \gets \mathcal{R}(n - 1, \lambda)$; answer $(x, y)$ with $H(x, y) = G_x(R'(y))$.
3. **$\mathrm{Game}_2(\lambda)$ (Ideal):** Sample $R \gets \mathcal{R}(n, \lambda)$; answer $(x, y)$ with $R(x, y)$.

#### Claim 8.1 ($\mathrm{Game}_0(\lambda) \approx_c \mathrm{Game}_1(\lambda)$, by the Inductive Hypothesis)

Suppose a PPT $\mathcal{A}$ distinguishes $\mathrm{Game}_0(\lambda)$ from $\mathrm{Game}_1(\lambda)$ with non-negligible advantage. Build a PPT reduction $\mathcal{B}$ attacking $\mathcal{F}'$ ($\mathcal{O} = F'_k$ or $\mathcal{O} = R'$):

```text
  Adversary A                     Reduction B                      PRF Challenger C (F' vs R')
  -----------                     -----------                      ---------------------------
  query (x, y)    --- (x, y) ---> strips x, sends y     --- y ---> O = F'_k or O = R'
                  <-- G_x(w) ---- computes G_x(w)       <-- w ---- w = O(y) in {0,1}^lambda
  outputs b'      --- b' -------> forwards b'           -- b' --->
```

If $\mathcal{O} = F'_k$, every reply is $G_x(F'_k(y))$ (exact $\mathrm{Game}_0$); if $\mathcal{O} = R'$, every reply is $G_x(R'(y))$ (exact $\mathrm{Game}_1$). Thus $\mathcal{B}$ breaks $\mathcal{F}'$ with $\mathcal{A}$'s exact advantage, contradicting the inductive hypothesis. $\blacksquare$

#### Claim 8.2 ($\mathrm{Game}_1(\lambda) \approx_c \mathrm{Game}_2(\lambda)$, by the Multiple-PRG Lemma)

In $\mathrm{Game}_1(\lambda)$, $R'$ assigns an independent uniform seed $R'(y) \gets U_\lambda$ to each distinct prefix $y$; across $q$ queries, at most $q$ distinct prefixes $y$ occur. Suppose a PPT $\mathcal{A}$ (making $\le q$ queries) distinguishes $\mathrm{Game}_1(\lambda)$ from $\mathrm{Game}_2(\lambda)$ with non-negligible advantage. Build a PPT reduction $\mathcal{B}$ against Lemma 8.1 with $t(\lambda) = q(\lambda)$:

```text
  Adversary A                     Reduction B                            Multi-PRG Challenger C
  -----------                     -----------                            ----------------------
                                  gets z_1,...,z_q upfront     <-- z --  (G(k_1),...,G(k_q)) or (U_{2 lambda})^q
                                  splits z_i = (z_i^0, z_i^1)
  query (x, y)    --- (x, y) ---> new y: assign next i(y)
                                  seen y: reuse existing i(y)
                  <-- z_{i(y)}^x - returns lambda-bit z_{i(y)}^x
  outputs b'      --- b' -------> forwards b'                  -- b' ->
```

$\mathcal{B}$ splits each $z_i = (z_i^0, z_i^1) \in \{0,1\}^\lambda \times \{0,1\}^\lambda$ and maintains a prefix-to-index map $i(y) \in \{1, \dots, q\}$ with counter $c = 0$:
- On query $(x, y)$, if $y$ is new, increment $c \gets c + 1$ and set $i(y) = c$ (always $c \le q$); if $y$ was seen before, reuse its stored $i(y)$ (crucial so that $(0, y)$ and $(1, y)$ share the **same** block $z_{i(y)}$, matching $G_0(R'(y))$ and $G_1(R'(y))$!). Return only the $\lambda$-bit half $z_{i(y)}^x$ (if the exact same $(x, y)$ is repeated, returning $z_{i(y)}^x$ preserves determinism).
- **Case A ($z_i = G(k_i)$, independent $k_i \gets U_\lambda$):** Assigning independent $k_{i(y)} \gets U_\lambda$ per distinct $y$ distributes identically to $R'(y)$, so $z_{i(y)}^x = G_x(k_{i(y)})$ **perfectly simulates $\mathrm{Game}_1(\lambda)$**.
- **Case B ($z_i \gets U_{2\lambda}$ independently):** Each $z_i = (z_i^0, z_i^1)$ consists of two independent uniform $\lambda$-bit strings, and distinct prefixes $y$ use distinct blocks, so every distinct $(x, y)$ receives an independent uniform $\lambda$-bit string—**perfectly simulating $\mathrm{Game}_2(\lambda)$**.

Forwarding $b'$ gives $\mathcal{B}$ the exact advantage of $\mathcal{A}$, contradicting Lemma 8.1. Hence $\mathrm{Game}_1(\lambda) \approx_c \mathrm{Game}_2(\lambda)$. $\blacksquare$

#### Completing the Induction

By Claims 8.1, 8.2, and the triangle inequality, $\mathrm{Game}_0(\lambda) \approx_c \mathrm{Game}_2(\lambda)$, so $\mathcal{F}$ is a secure PRF on $n$-bit inputs. Unfolding the $n(\lambda) = \operatorname{poly}(\lambda)$ inductive levels bounds any $q$-query PPT adversary's advantage by $n(\lambda)$ applications of Lemma 8.1 ($t = q(\lambda)$) plus the base case, giving $\operatorname{poly}(\lambda) \cdot \operatorname{negl}(\lambda) = \operatorname{negl}(\lambda)$. $\blacksquare$

---

# Part III — Block Ciphers, Modes of Operation, and Mid-Course Exercises (Lectures 9–10)

## Lecture 9: Pseudorandom Permutations, Luby–Rackoff, and Modes of Operation

In Lectures 7–8, we built PRFs from length-doubling PRGs (GGM) and a single-block CPA-secure SKE scheme $\operatorname{Enc}_k(m) = (r,\, F_k(r) \oplus m)$. Two major questions remain:
1. **Invertibility:** Practical symmetric cryptography relies on **block ciphers** (DES, AES) that are efficiently **invertible** given the key. How do we formalize invertible PRFs, and can we build one from any PRF?
2. **Domain extension (VIL messages):** How do we securely encrypt multi-block messages $m = (m_1, \dots, m_t)$ using a single fixed-block primitive $F_k : \{0,1\}^n \to \{0,1\}^n$?

Lecture 9 resolves both via **pseudorandom permutations (PRPs)**, the **Luby–Rackoff** Feistel construction, and **modes of operation** (culminating in the CTR-mode CPA proof completed in Lecture 10).

---

### 1. From PRFs to Pseudorandom Permutations (Block Ciphers)

As emphasized on Lecture 9 Slide 1 (`p-01`), a block cipher (DES, AES) is **not** by itself a secure encryption scheme: deterministic evaluation leaks plaintext equality and fails CPA security. Theoretically, block ciphers are modeled as **pseudorandom permutations (PRPs)**—PRFs with the extra guarantee of being **efficiently invertible bijections**.

#### Formal Definitions: PRP and Strong PRP

Let $\mathcal{P}(n, n)$ be the set of all permutations (bijections) $\{0,1\}^n \to \{0,1\}^n$, and $\mathcal{R}(n, n)$ the set of all functions $\{0,1\}^n \to \{0,1\}^n$. Note $|\mathcal{P}(n, n)| = (2^n)!$ and $|\mathcal{R}(n, n)| = (2^n)^{2^n}$.

**Definition (Pseudorandom Permutation — PRP).** Let $n = n(\lambda)$ be a polynomial block length. An efficiently computable family $\mathcal{P} = \{ P_k : \{0,1\}^n \to \{0,1\}^n \}_{k \in \{0,1\}^\lambda}$ is a **PRP** if:
1. **Bijection:** For every $k \in \{0,1\}^\lambda$, $P_k : \{0,1\}^n \to \{0,1\}^n$ is one-to-one and onto.
2. **Efficient forward and inverse evaluation:** Given $k \in \{0,1\}^\lambda$ and any $x, y \in \{0,1\}^n$, $P_k(x)$ and $P_k^{-1}(y)$ are computable in polynomial time, with $P_k^{-1}(P_k(x)) = x$.
3. **Indistinguishability (forward oracle):** For every PPT adversary $\mathcal{A}$, $\operatorname{Game}^{\mathrm{PRP}}_{\mathcal{P},\mathcal{A}}(\lambda, 0) \approx_c \operatorname{Game}^{\mathrm{PRP}}_{\mathcal{P},\mathcal{A}}(\lambda, 1)$—where the challenger samples $k \gets U_\lambda$ (real game, oracle $P_k(\cdot)$) or $P \gets \mathcal{P}(n, n)$ (ideal game, oracle $P(\cdot)$). Equivalently:
   $$
   \left| \Pr_{k \gets U_\lambda}\!\left[\mathcal{A}^{P_k(\cdot)}(1^\lambda) = 1\right] - \Pr_{P \gets \mathcal{P}(n,n)}\!\left[\mathcal{A}^{P(\cdot)}(1^\lambda) = 1\right] \right| \le \operatorname{negl}(\lambda).
   $$

**Definition (Strong PRP — SPRP).** An efficiently computable, efficiently invertible permutation family $\mathcal{P} = \{ P_k : \{0,1\}^n \to \{0,1\}^n \}_{k \in \{0,1\}^\lambda}$ is a **strong PRP** if for every PPT adversary $\mathcal{A}$ with oracle access to **both** forward and inverse maps, $\operatorname{Game}^{\mathrm{SPRP}}_{\mathcal{P},\mathcal{A}}(\lambda, 0) \approx_c \operatorname{Game}^{\mathrm{SPRP}}_{\mathcal{P},\mathcal{A}}(\lambda, 1)$:
$$
\left| \Pr_{k \gets U_\lambda}\!\left[\mathcal{A}^{P_k(\cdot),\, P_k^{-1}(\cdot)}(1^\lambda) = 1\right] - \Pr_{P \gets \mathcal{P}(n,n)}\!\left[\mathcal{A}^{P(\cdot),\, P^{-1}(\cdot)}(1^\lambda) = 1\right] \right| \le \operatorname{negl}(\lambda).
$$

| Primitive | Bijective? | Efficiently invertible given $k$? | Adversary's oracle(s) | Ideal object |
| --- | --- | --- | --- | --- |
| **PRF** | No | No (in general) | $F_k(\cdot)$ | $R \gets \mathcal{R}(n, n)$ |
| **PRP** | Yes | Yes ($P_k^{-1}$) | $P_k(\cdot)$ | $P \gets \mathcal{P}(n, n)$ |
| **Strong PRP** | Yes | Yes ($P_k^{-1}$) | $P_k(\cdot)$ and $P_k^{-1}(\cdot)$ | $P(\cdot), P^{-1}(\cdot)$, $P \gets \mathcal{P}(n, n)$ |

#### The PRF/PRP Switching Lemma

**Lemma (PRF/PRP Switching Lemma, `p-12`).** Let $m = m(\lambda)$ be a block length, and let $\mathcal{A}$ be any (even unbounded) adversary making at most $q = q(\lambda)$ distinct forward queries over $\{0,1\}^m$. Then
$$
\operatorname{SD}\bigl(\mathcal{A}^{R(\cdot)}(1^\lambda);\, \mathcal{A}^{P(\cdot)}(1^\lambda)\bigr) \le \binom{q}{2} \cdot 2^{-m} = \frac{q(q-1)}{2} \cdot 2^{-m} \le q^2 \cdot 2^{-m},
$$
where $R \gets \mathcal{R}(m, m)$ and $P \gets \mathcal{P}(m, m)$. When $q = \operatorname{poly}(\lambda)$ and $2^{-m} = \operatorname{negl}(\lambda)$, $R \approx_s P$.

**Proof.** WLOG $\mathcal{A}$ never repeats a query (both oracles are deterministic). Consider lazy sampling on $q$ distinct queries $z_1, \dots, z_q \in \{0,1\}^m$: $R$ samples $w_i \gets U_m$ **with replacement**, while $P$ samples $w_i$ uniformly from $\{0,1\}^m \setminus \{w_1, \dots, w_{i-1}\}$ **without replacement**. Couple both experiments by sampling $w_i \gets U_m$ at step $i$: $R$ always returns $w_i$, while $P$ returns $w_i$ unless $w_i \in \{w_1, \dots, w_{i-1}\}$ (event $\mathrm{COL}_i$), in which case $P$ resamples from unused strings. Conditioned on $\overline{\mathrm{COL}}$ (all $q$ outputs under $R$ distinct), both transcripts are identically distributed. Since $\Pr[\mathrm{COL}_i] \le (i-1)2^{-m}$, a union bound over all $\binom{q}{2}$ pairs gives
$$
\operatorname{SD}\bigl(\mathcal{A}^R;\, \mathcal{A}^P\bigr) \le \Pr[\mathrm{COL}] = \Pr\!\left[\exists\, i \neq j : R(z_i) = R(z_j)\right] \le \sum_{i=1}^q (i-1)2^{-m} = \binom{q}{2} 2^{-m} \le q^2 \cdot 2^{-m}.
$$
**End of proof.**

Thus any PRF $F_k : \{0,1\}^m \to \{0,1\}^m$ with $2^{-m} = \operatorname{negl}(\lambda)$ is already indistinguishable from a random permutation under forward-only queries; Feistel networks are needed specifically to achieve **bijectivity and efficient invertibility**.

---

### 2. Practical Block Ciphers Context: DES, 2-DES, 3-DES, and AES

Before building a theoretical PRP from a PRF, Lecture 9 (`p-04` and transcript) summarizes real-world ciphers:
- **Heuristic round functions & key schedules:** Practical ciphers use fast, unproved heuristic round functions (guided by **confusion** and **diffusion**) iterated over many rounds as a cryptanalytic safety margin, with round keys expanded from a single master key via a PRG-like **key schedule**.
- **DES:** A Feistel cipher on $64$-bit blocks with a **$56$-bit key** (16 rounds in the standard; casually illustrated as 18 rounds in lecture). Exhaustive search takes $2^{56}$ evaluations, completely practical today.
- **Double-DES (2-DES) and Meet-in-the-Middle (MitM):** $\text{2-DES}_{k_1, k_2}(m) = \operatorname{DES}_{k_2}(\operatorname{DES}_{k_1}(m))$ has a $112$-bit key, yet does **not** achieve $2^{112}$ security. Given known pairs $(m, c)$, an attacker meets at $z = \operatorname{DES}_{k_1}(m) = \operatorname{DES}_{k_2}^{-1}(c)$:
  1. Compute $z_{k_1} = \operatorname{DES}_{k_1}(m)$ for all $k_1 \in \{0,1\}^{56}$ and store $(z_{k_1}, k_1)$ in a sorted table ($2^{56}$ work, $O(2^{56})$ memory).
  2. Compute $z'_{k_2} = \operatorname{DES}_{k_2}^{-1}(c)$ for all $k_2 \in \{0,1\}^{56}$ and look up matches ($2^{56}$ work).
  3. Filter candidate pairs $(k_1, k_2)$ against 1–2 extra $(m', c')$ pairs (one $64$-bit block leaves $\approx 2^{112-64} = 2^{48}$ false positives; 2–3 pairs isolate the true key).
  Total time is $\approx 2^{57}$ evaluations instead of $2^{112}$.
- **Triple-DES (3-DES):** Three keys ($168$ bits total) force MitM to split two keys vs. one, raising work to $\approx 2^{112}$ (with $2^{56}$ memory) at $3\times$ the cost of DES.
- **AES:** A **Substitution–Permutation Network (SPN)** on **128-bit blocks** with **128-, 192-, or 256-bit keys** (10, 12, or 14 rounds). Like DES, security rests on surviving cryptanalysis rather than a reduction.

---

### 3. The Luby–Rackoff Construction (Feistel Networks)

Starting from any PRF family $\mathcal{F} = \{F_k : \{0,1\}^n \to \{0,1\}^n\}_{k \in \{0,1\}^\lambda}$, we construct a provably secure PRP over $\{0,1\}^{2n}$ via a **Feistel network** (`p-01`–`p-12`).

#### 1-Round Feistel Function and Its Distinguisher

**Definition (1-Round Feistel Function).** For $F : \{0,1\}^n \to \{0,1\}^n$, define $\psi_F : \{0,1\}^{2n} \to \{0,1\}^{2n}$ on $(x, y) \in \{0,1\}^n \times \{0,1\}^n$ by
$$
\psi_F(x, y) = \bigl(y,\; x \oplus F(y)\bigr) = (x', y').
$$

```text
  x (n bits)             y (n bits)
  |                      |
  v                      |
(+) <----- [ F ] <-------+
  \                     /
   \---(halves swap)---/
            \/
            /\
  /---------------------\
  v                      v
x' = y             y' = x (+) F(y)
```

Crucially, $\psi_F$ is **always a bijection and efficiently invertible without inverting $F$** (`p-02`):
$$
\psi_F^{-1}(x', y') = \bigl(F(x') \oplus y',\; x'\bigr), \qquad \psi_F^{-1}\!\bigl(\psi_F(x, y)\bigr) = \bigl(F(y) \oplus x \oplus F(y),\; y\bigr) = (x, y).
$$

**Why 1 round is NOT a PRP (`p-02`):** $\mathcal{A}$ queries any $(x, y)$ to get $(x', y')$ and outputs $1$ iff $x' = y$. In $\psi_{F_k}$, $x' = y$ with probability $1$; in $P \gets \mathcal{P}(2n, 2n)$, $P(x, y)$ is uniform over $\{0,1\}^{2n}$, so $\Pr[x' = y] = 2^n / 2^{2n} = 2^{-n}$. Advantage: $1 - 2^{-n}$.

#### 2-Round Feistel Network and Its Chosen-Plaintext Distinguisher

Composing two rounds (`p-03`) with $F, F' : \{0,1\}^n \to \{0,1\}^n$ gives $\psi_{F, F'}(x, y) := \psi_{F'}(\psi_F(x, y))$ (swaps cancel):
$$
\psi_{F, F'}(x, y) = \psi_{F'}\!\bigl(y,\; x \oplus F(y)\bigr) = \bigl(x \oplus F(y),\;\; y \oplus F'(x \oplus F(y))\bigr).
$$

```text
  x (n bits)                 y (n bits)
  |                          |
  v                          |
(+) <------- [ F ] <---------+   (Round 1: F on y)
  |                          |
  +--------> [ F'] -------> (+)  (Round 2: F' on x (+) F(y))
  v                          v
x (+) F(y)           y (+) F'(x (+) F(y))
```

Inversion applies $\psi_F^{-1} \circ \psi_{F'}^{-1}$.

**Why 2 rounds are STILL not a general PRP (`p-03`, `p-04`):** $\mathcal{A}$ chooses $x \neq x'$ and any $y \in \{0,1\}^n$, queries $(x, y)$ and $(x', y)$ to get $(u_1, v_1)$ and $(u_2, v_2)$, and outputs $1$ iff $u_1 \oplus u_2 = x \oplus x'$.
- Under $\psi_{F, F'}$, $F(y)$ cancels: $u_1 \oplus u_2 = (x \oplus F(y)) \oplus (x' \oplus F(y)) = x \oplus x'$ with probability $1$.
- Under $P \gets \mathcal{P}(2n, 2n)$, $P(x', y)$ is uniform over $\{0,1\}^{2n} \setminus \{(u_1, v_1)\}$. Since $x \oplus x' \neq 0^n$, none of the $2^n$ strings with left half $u_1 \oplus x \oplus x'$ equals $(u_1, v_1)$, so $\Pr[u_1 \oplus u_2 = x \oplus x'] = \frac{2^n}{2^{2n}-1}$.
Advantage: $1 - \frac{2^n}{2^{2n}-1}$.

#### 3 Rounds (Standard PRP) vs. 4 Rounds (Strong PRP)

Repeating the second half $y$ is the **only** obstruction to 2-round security (`p-04`): one initial round makes the inputs to the last two rounds $y$-unique except with negligible probability, yielding a **standard PRP** in **3 rounds** (`p-08`–`p-12`).

- **Supplementary remark (4 rounds for Strong PRP — NOT covered in Lecture 9):** With an inverse oracle, 3 rounds fail a 3-query attack: query forward on $(x_1, y), (x_2, y)$ ($x_1 \neq x_2$) to get $(L_1, R_1), (L_2, R_2)$, then query $P^{-1}(L_2, R_2 \oplus x_1 \oplus x_2)$ to get $(x'_3, y'_3)$. Unwinding Round 3 recovers $L_2$ and flips the Round-2 right half from $x_2 \oplus F_1(y)$ to $x_1 \oplus F_1(y)$, so unwinding Round 2 yields $y'_3 = L_2 \oplus F_2(x_1 \oplus F_1(y)) = y \oplus L_1 \oplus L_2$ with probability $1$ (vs. $\le \frac{2^n}{2^{2n}-2}$ for a random permutation). Adding a **4th** independent round gives a **Strong PRP**.

> ### ⚠️ [SCOPE BOUNDARY — Lecture 9 Slides & Transcript]
> - **In scope and proved in full in Lecture 9:** Both the **2-round Core Lemma ($y$-unique queries)** and the **3-round Luby–Rackoff Standard PRP Theorem** are covered and proved in full on Lecture 9 Slides `p-04`–`p-12` and in the Lecture 9 transcript.
> - **NOT covered in Lecture 9:** **4-round Feistel for Strong PRP** (and its 3-query inverse-oracle attack above) did not appear in Lecture 9's 2026/27 slides or transcript and is included strictly as supplementary context.

#### Complete Proof of the 3-Round Luby–Rackoff Theorem

Following Venturi's notation, $\psi_{f_1, f_2}(x, y) := \psi_{f_2}(\psi_{f_1}(x, y))$.

##### Core Lemma (2-Round Feistel under $y$-Unique Queries)

**Lemma (`p-04`–`p-05`).** Assume $2^{-n} = \operatorname{negl}(\lambda)$ (e.g., $n \ge \lambda$). For every **computationally unbounded** adversary $\mathcal{A}$ making at most $q = q(\lambda) = \operatorname{poly}(\lambda)$ queries $(x_1, y_1), \dots, (x_q, y_q) \in \{0,1\}^{2n}$ that are **"$y$-unique"** ($y_i \neq y_j$ for all $i \neq j$), the oracle systems
- **$S$:** $\psi_{F, F'}(x, y) = \bigl(x \oplus F(y),\; y \oplus F'(x \oplus F(y))\bigr)$ with independent $F, F' \gets \mathcal{R}(n, n)$, and
- **$R$:** $R(x, y)$ with $R \gets \mathcal{R}(2n, 2n)$

are **statistically indistinguishable** ($S \approx_s R$), with
$$
\operatorname{SD}(S; R) \le \sum_{i=1}^{q} (i - 1)\, 2^{-n} = \binom{q}{2} 2^{-n} \le q^2 \cdot 2^{-n} = \operatorname{negl}(\lambda).
$$

**Proof (`p-05`–`p-08`).** Define $q + 1$ hybrids $H_0, H_1, \dots, H_q$ ($i \in \{0, \dots, q\}$): in $H_i$, the first $i$ queries $(x_1, y_1), \dots, (x_i, y_i)$ are answered using $S$ (with $F, F' \gets \mathcal{R}(n, n)$), and the remaining $q - i$ queries $(x_{i+1}, y_{i+1}), \dots, (x_q, y_q)$ are answered using $R \gets \mathcal{R}(2n, 2n)$. Clearly $H_0 \equiv R$ and $H_q \equiv S$. Fix $i \in \{1, \dots, q\}$ and compare $H_{i-1}$ and $H_i$:
1. **Queries $1, \dots, i-1$:** Both use $S$, yielding $\bigl(x_j \oplus F(y_j),\; y_j \oplus F'(x_j \oplus F(y_j))\bigr)_{j=1}^{i-1}$.
2. **Queries $i+1, \dots, q$:** Both use $R$. By $y$-uniqueness, $(x_k, y_k) \neq (x_i, y_i)$ for all $k > i$, so $R(x_i, y_i)$ at step $i$ in $H_{i-1}$ is independent of all other queries.
3. **Query $i$:**
   - In $H_{i-1}$: $R(x_i, y_i)$ is uniform in $\{0,1\}^{2n}$ and independent of everything else—identically distributed to $(x_i \oplus r,\; y_i \oplus r')$ for independent $r, r' \gets U_n$.
   - In $H_i$: answer is $\bigl(x_i \oplus F(y_i),\; y_i \oplus F'(x_i \oplus F(y_i))\bigr)$. Since $y_i \notin \{y_1, \dots, y_{i-1}\}$ and $F$ is unused after step $i$, $F(y_i)$ is a fresh uniform $r \gets U_n$ independent of $F(y_1), \dots, F(y_{i-1})$, $F'$, and prior answers (`p-06`). Thus the $i$-th answer in $H_i$ is
     $$
     \bigl(x_i \oplus r,\;\; y_i \oplus F'(x_i \oplus r)\bigr), \qquad r \gets U_n.
     $$
4. **Collision event $\mathrm{BAD}_i$ (`p-07`):** Let $S_{i-1} = \{x_j \oplus F(y_j) : 1 \le j \le i-1\}$ be the prior inputs to $F'$, and let $\mathrm{BAD}_i$ be the event $x_i \oplus r \in S_{i-1}$:
   $$
   \exists\, j \in \{1, \dots, i-1\} \quad\text{such that}\quad x_i \oplus r = x_j \oplus F(y_j).
   $$
   Conditioned on the first $i-1$ answers and $x_i$, each $x_j \oplus F(y_j)$ is fixed while $r \gets U_n$ is uniform and independent, so $\Pr[x_i \oplus r = x_j \oplus F(y_j)] = 2^{-n}$. By a union bound,
   $$
   \Pr[\mathrm{BAD}_i] \le (i - 1) \cdot 2^{-n}.
   $$
   When $\overline{\mathrm{BAD}_i}$ holds, $x_i \oplus r$ has never been queried to $F'$ (and $F'$ is unused after step $i$), so $F'(x_i \oplus r)$ is fresh and uniform $r' \gets U_n$, matching $H_{i-1}$ identically. Hence $\operatorname{SD}(H_i;\, H_{i-1}) \le \Pr[\mathrm{BAD}_i] \le (i - 1) \cdot 2^{-n}$.

By the triangle inequality (`p-08`),
$$
\operatorname{SD}(S; R) = \operatorname{SD}(H_q; H_0) \le \sum_{i=1}^{q} \operatorname{SD}(H_i;\, H_{i-1}) \le \sum_{i=1}^{q} (i - 1) 2^{-n} = \binom{q}{2} 2^{-n} \le q^2 \cdot 2^{-n} = \operatorname{negl}(\lambda).
$$
**End of Lemma proof.**

##### Main Theorem (3-Round Luby–Rackoff Theorem)

**Theorem (Luby–Rackoff, `p-08`).** If $\mathcal{F} = \{F_k : \{0,1\}^n \to \{0,1\}^n\}_{k \in \{0,1\}^\lambda}$ is a PRF family with $2^{-n} = \operatorname{negl}(\lambda)$, then for independent keys $k_1, k_2, k_3 \gets U_\lambda$,
$$
\psi_{F_{k_3}}\!\Bigl(\psi_{F_{k_2}}\!\bigl(\psi_{F_{k_1}}(x, y)\bigr)\Bigr)
$$
is a PRP over $\{0,1\}^{2n}$.

**Proof (`p-08`–`p-12`).** Bijectivity, efficient evaluation, and efficient inversion follow immediately from composing $\psi_{F_{k_i}}$ and $\psi_{F_{k_i}}^{-1}$. For pseudorandomness, define four oracle systems over $\{0,1\}^{2n}$:
- **$T$:** $\psi_{F_{k_3}}(\psi_{F_{k_2}}(\psi_{F_{k_1}}(x, y)))$ with independent $k_1, k_2, k_3 \gets U_\lambda$.
- **$S$:** $\psi_{F, F'}(\psi_{F''}(x, y))$ with independent $F'', F, F' \gets \mathcal{R}(n, n)$ ($F''$ is Round 1; $F, F'$ are Rounds 2–3).
- **$R$:** $R \gets \mathcal{R}(2n, 2n)$.
- **$P$:** $P \gets \mathcal{P}(2n, 2n)$.

**Step 1 ($T \approx_c S$, `p-10`).** Introduce hybrids $T_0 \equiv T$, $T_1 = (F'', F_{k_2}, F_{k_3})$, $T_2 = (F'', F, F_{k_3})$, $T_3 \equiv S$. Each transition $T_{j-1} \approx_c T_j$ reduces to PRF security of $\mathcal{F}$: a PPT reduction $\mathcal{B}$ with oracle $\mathcal{O} \in \{F_k, R_{\text{prf}}\}$ simulates the other two rounds (with sampled keys or lazy-sampled random functions), uses $\mathcal{O}$ in round $j$, and forwards $\mathcal{A}$'s guess. By the triangle inequality, $T \approx_c S$.

**Step 2 ($S \approx_s R$ for $q = \operatorname{poly}(\lambda)$ queries, `p-10`–`p-12`).** Let $(x_1, y_1), \dots, (x_q, y_q) \in \{0,1\}^{2n}$ be $q$ distinct queries, and let $(x''_i, y''_i) = \psi_{F''}(x_i, y_i) = (y_i,\; x_i \oplus F''(y_i))$. Let $\mathrm{UNIQUE}$ be the event that $y''_i \neq y''_j$ for all $i \neq j$. For any $1 \le i < j \le q$:
- **Case (i): $y_i = y_j$.** Since $(x_i, y_i) \neq (x_j, y_j)$, $x_i \neq x_j$, so $y''_i = x_i \oplus F''(y_i) \neq x_j \oplus F''(y_j) = y''_j$ (collision probability $0$).
- **Case (ii): $y_i \neq y_j$.** A collision $y''_i = y''_j$ holds iff $F''(y_i) \oplus F''(y_j) = x_i \oplus x_j$. Since $F'' \gets \mathcal{R}(n, n)$ and $y_i \neq y_j$, $F''(y_i)$ and $F''(y_j)$ are independent uniform in $\{0,1\}^n$, so this occurs with probability $2^{-n}$.

By a union bound over all $\binom{q}{2}$ pairs, $\Pr[\neg\,\mathrm{UNIQUE}] \le \binom{q}{2} 2^{-n}$. Conditioned on $\mathrm{UNIQUE}$, the Core Lemma bounds the statistical distance between $\psi_{F, F'}$ and $R$ by $\binom{q}{2} 2^{-n}$. Thus
$$
\operatorname{SD}(S; R) \le \Pr[\neg\,\mathrm{UNIQUE}] + \binom{q}{2} 2^{-n} \le 2\binom{q}{2} 2^{-n} \le 2 q^2 \cdot 2^{-n} = \operatorname{negl}(\lambda),
$$
so $S \approx_s R$. *(Even for adaptive queries, wrapping the Core Lemma with an abort-on-collision check reduces to the non-adaptive bound, giving $\operatorname{SD}(S; R) \le 4\binom{q}{2} 2^{-n} = \operatorname{negl}(\lambda)$.)*

**Step 3 ($R \approx_s P$ for $q = \operatorname{poly}(\lambda)$ queries, `p-12`).** By the PRF/PRP Switching Lemma over $\{0,1\}^{2n}$, $\operatorname{SD}(R; P) \le \binom{q}{2} 2^{-2n} \le q^2 2^{-2n} = \operatorname{negl}(\lambda)$.

By transitivity ($T \approx_c S \approx_s R \approx_s P$), $T \approx_c P$. **End of proof.**

---

### 4. Modes of Operation (Domain Extension for SKE)

Given a fixed-block primitive $F_k : \{0,1\}^n \to \{0,1\}^n$, a **mode of operation** encrypts variable-input-length (VIL) padded messages $m = (m_1, \dots, m_t)$ ($m_i \in \{0,1\}^n$, $t = \operatorname{poly}(\lambda)$) (`p-13`). In the **VIL-CPA game** (`p-19`), $\mathcal{A}$ queries messages of arbitrary polynomial block lengths in Phases 1–2, and submits two **equal-length** challenge messages $m_0^*, m_1^*$ ($|m_0^*| = |m_1^*| = t^*$ blocks).

#### 1. ECB — Electronic Code Book (`p-14`)
- **Encryption / Decryption:** $c_i = F_k(m_i)$ ($c = (c_1, \dots, c_t)$); $m_i = F_k^{-1}(c_i)$ (requires a PRP).

```text
   m_1       m_2      ...    m_t
    |         |               |
    v         v               v
 [ F_k ]   [ F_k ]         [ F_k ]
    |         |               |
    v         v               v
   c_1       c_2      ...    c_t
```
- **Security ("NEVER DO THIS!"):** Deterministic, hence **not CPA-secure**: equal blocks $m_i = m_j$ produce equal $c_i = c_j$, and $\mathcal{A}$ can just query $m_0^*$ in Phase 1.

#### 2. CBC — Cipher Block Chaining (`p-15`)
- **Encryption:** Sample $r \gets U_n$, set $c_0 = r$, compute $c_i = F_k(c_{i-1} \oplus m_i)$ ($i = 1, \dots, t$), output $c = (c_0, c_1, \dots, c_t)$.
- **Decryption:** $m_i = F_k^{-1}(c_i) \oplus c_{i-1}$ ($i = 1, \dots, t$).

```text
  r <-- U_n   m_1         m_2         m_t
  |            |           |           |
  |            v           v           v
  +---------> (+)   +---> (+)   +---> (+)
  |            |    |      |    |      |
  |         [ F_k ] |   [ F_k ] |   [ F_k ]
  |            |    |      |    |      |
  |            +----+      +-...+      |
  v            v           v           v
c_0 = r       c_1         c_2   ...   c_t
```
- **Structural & security properties:**
  1. **Sequential encryption, parallelizable decryption:** Computing $c_i$ requires $c_{i-1}$ (sequential), whereas all $c_0, \dots, c_t$ are known upfront during decryption, so every $m_i = F_k^{-1}(c_i) \oplus c_{i-1}$ runs in parallel.
  2. **Requires a PRP:** Decryption evaluates $F_k^{-1}$, so a non-invertible PRF cannot be used (unlike CFB/OFB/CTR).
  3. **IV must be unpredictable (Predictable-IV Attack):** If an attacker knows the upcoming challenge IV $r^*$ in advance:
     - Query any 1-block $m_1$ in Phase 1 to get $(r_1, c_1)$ with $c_1 = F_k(r_1 \oplus m_1)$.
     - Submit challenge $m_0^* = m_1 \oplus r_1 \oplus r^*$ and $m_1^* \neq m_0^*$.
     - If $b = 0$, $c_1^* = F_k(r^* \oplus m_0^*) = F_k(r_1 \oplus m_1) = c_1$; if $b = 1$, $c_1^* \neq c_1$ since $F_k$ is a bijection. Outputting $0$ iff $c_1^* = c_1$ wins with probability $1$.

#### 3. CFB — Cipher Feedback (`p-16`)
- **Encryption / Decryption:** $r \gets U_n$, $c_0 = r$, $c_i = F_k(c_{i-1}) \oplus m_i$, and $m_i = F_k(c_{i-1}) \oplus c_i$ ($i = 1, \dots, t$). Forward-only (**PRF suffices**); encryption sequential, decryption parallelizable.

```text
  r <-- U_n
  |
  +---------> [ F_k ]   +---> [ F_k ]   +---> [ F_k ]
  |              |      |        |      |        |
  |              v      |        v      |        v
  |    m_1 ---> (+)     | m_2-> (+)     | m_t-> (+)
  |              |      |        |      |        |
  |              +------+        +-...--+        |
  v              v               v               v
c_0 = r         c_1             c_2    ...      c_t
```

#### 4. OFB — Output Feedback (`p-16`)
- **Encryption / Decryption:** $r \gets U_n$, $c_0 = q_0 = r$, keystream $q_i = F_k(q_{i-1})$, $c_i = q_i \oplus m_i$, $m_i = q_i \oplus c_i$. Forward-only (**PRF suffices**). Keystream generation is sequential in both directions, but can be **precomputed offline** before the message arrives, followed by parallel XOR.

```text
  r = q_0 <-- U_n
  |
  +---------> [ F_k ]   +---> [ F_k ]   +---> [ F_k ]
  |              |      |        |      |        |
  |        q_1 --+------+  q_2 --+------+  q_t --+
  |              v               v               v
  |    m_1 ---> (+)    m_2 ---> (+)    m_t ---> (+)
  v              v               v               v
c_0 = r         c_1             c_2    ...      c_t
```

#### 5. CTR — Counter Mode (`p-17`)
Identify $\{0,1\}^n$ with $\{0, 1, \dots, 2^n - 1\}$; let $+$ denote addition **modulo $2^n$**.
- **Encryption / Decryption:** $r \gets U_n$, $c_0 = r$, $c_i = F_k(r + i - 1 \bmod 2^n) \oplus m_i$, $m_i = F_k(c_0 + i - 1 \bmod 2^n) \oplus c_i$ ($i = 1, \dots, t$). Requires only a **PRF** and is **fully parallelizable** (plus offline precomputation once $r$ is chosen) for both encryption and decryption.

```text
  r <-- U_n     r+1       ...     r+t-1   (all + mod 2^n)
  |              |                  |
  +-----+        v                  v
  |  [ F_k ]  [ F_k ]            [ F_k ]
  |     |        |                  |
  |     v        v                  v
  | m_1(+)   m_2(+)             m_t(+)
  v     |        |                  |
c_0=r  c_1      c_2       ...      c_t
```

#### Comparison of Modes of Operation

| Mode | VIL CPA-secure? | Primitive | Enc. parallelizable? | Dec. parallelizable? | Key property |
| --- | --- | --- | --- | --- | --- |
| **ECB** | No (deterministic) | PRP (dec.) | Yes | Yes | Leaks equal blocks; never use |
| **CBC** | Yes (unpredictable IV) | **PRP** ($F_k^{-1}$) | No (sequential) | **Yes** | Fails if IV is predictable |
| **CFB** | Yes (random IV) | **PRF** | No (sequential) | Yes | Ciphertext fed into next $F_k$ |
| **OFB** | Yes (random IV) | **PRF** | Seq. keystream (offline precomp.) | Seq. keystream (offline precomp.) | Synchronous stream cipher |
| **CTR** | Yes (random IV) | **PRF** | **Yes** | **Yes** | Independent counters $r + i - 1 \bmod 2^n$ |

> ### ⚠️ [OMITTED PROOFS & BASIC EXERCISE NOTE — Lectures 9 & 10 Transcripts]
> - **CBC, CFB, and OFB proofs omitted (`Lecture 9`):** Venturi confirms that **all three modes (CBC, CFB, OFB) are VIL CPA-secure**, but **omits their formal security proofs in lecture**, stating: *"Are the previous three [CBC, CFB, OFB] secure? Yes, they are all secure. Proof for the others will be kind of very similar... similar to the one that we did already for one [block], slightly more challenging because now we have these many blocks."* **Only CTR mode** is proved in full (across Lectures 9–10).
> - **CTR Step 1 skipped as a basic exercise (`Lecture 10`):** At the start of Lecture 10, Venturi notes that he omitted writing out the Step-1 PRF reduction ($G_b \approx_c H_b$) in class, saying *"we didn't do the reduction... this would be like a simple exercise... I advise you to try to do the induction [reduction] because it's basic."* The complete Step-1 reduction is written out right below.

---

### 5. Complete CPA-Security Proof of CTR Mode (Lectures 9–10)

**Theorem (`p-18`).** If $\mathcal{F} = \{F_k : \{0,1\}^n \to \{0,1\}^n\}_{k \in \{0,1\}^\lambda}$ is a PRF family with $2^{-n} = \operatorname{negl}(\lambda)$, then CTR mode is VIL-CPA-secure.

**Proof (`p-18`–`p-22`, completed in Lecture 10).** Fix any PPT adversary $\mathcal{A}$ in the VIL-CPA game (`p-19`). For $b \in \{0,1\}$, let $G_b := \operatorname{Game}^{\mathrm{cpa}}_{\mathrm{CTR},\mathcal{A}}(\lambda, b)$:
- Encryption query $m = (m_1, \dots, m_t)$ receives $(r,\, F_k(r) \oplus m_1, \dots, F_k(r+t-1 \bmod 2^n) \oplus m_t)$ with $r \gets U_n$.
- Challenge $(m_0^*, m_1^*)$ of length $t^*$ blocks receives $(r^*,\, F_k(r^*) \oplus m_{b,1}^*, \dots, F_k(r^*+t^*-1 \bmod 2^n) \oplus m_{b,t^*}^*)$ with $r^* \gets U_n$.

Define three hybrids (`p-20`–`p-21`):
- **$H_0$ and $H_1$:** Identical to $G_0$ and $G_1$, except $F_k$ is replaced throughout by $R \gets \mathcal{R}(n, n)$.
- **$H_2$:** Identical to $H_0$ (or $H_1$) on all encryption queries (still using $R$), except the challenge ciphertext $c^* = (c_0^*, \dots, c_{t^*}^*)$ is sampled **uniformly** from $\{0,1\}^{n(t^*+1)}$, independent of $b, m_0^*, m_1^*, R$.

#### Step 1: $G_b \approx_c H_b$ for each $b \in \{0,1\}$

Fix $b \in \{0,1\}$, and suppose a PPT adversary $\mathcal{A}$ distinguishes $G_b$ from $H_b$ with advantage
$$
\varepsilon(\lambda) = \left| \Pr[\mathcal{A} \text{ outputs } 1 \text{ in } G_b] - \Pr[\mathcal{A} \text{ outputs } 1 \text{ in } H_b] \right|.
$$
Build a PPT reduction $\mathcal{B}$ against the PRF security of $\mathcal{F}$ (receiving oracle $\mathcal{O} \in \{F_k, R\}$):
1. On each Phase 1/2 encryption query $m = (m_1, \dots, m_t)$, $\mathcal{B}$ samples $r \gets U_n$, queries $\mathcal{O}$ on $r, r+1 \bmod 2^n, \dots, r+t-1 \bmod 2^n$ to get $z_1, \dots, z_t$, and returns $(r,\, z_1 \oplus m_1, \dots, z_t \oplus m_t)$.
2. On challenge $(m_0^*, m_1^*)$ of length $t^*$, $\mathcal{B}$ uses the **fixed** bit $b$: samples $r^* \gets U_n$, queries $\mathcal{O}$ on $r^*, \dots, r^*+t^*-1 \bmod 2^n$ to get $z_1^*, \dots, z_{t^*}^*$, and returns $(r^*,\, z_1^* \oplus m_{b,1}^*, \dots, z_{t^*}^* \oplus m_{b,t^*}^*)$.
3. $\mathcal{B}$ outputs $\mathcal{A}$'s final guess $b'$.

Since $\mathcal{A}$ is PPT, $q, t, t^* = \operatorname{poly}(\lambda)$, so $\mathcal{B}$ is PPT. $\mathcal{O} = F_k$ simulates $G_b$ identically and $\mathcal{O} = R$ simulates $H_b$ identically, so
$$
\left| \Pr_{k \gets U_\lambda}\!\left[\mathcal{B}^{F_k}(1^\lambda) = 1\right] - \Pr_{R \gets \mathcal{R}(n,n)}\!\left[\mathcal{B}^{R}(1^\lambda) = 1\right] \right| = \left| \Pr[G_b = 1] - \Pr[H_b = 1] \right| = \varepsilon(\lambda).
$$
By PRF security of $\mathcal{F}$, $\varepsilon(\lambda) \le \operatorname{negl}(\lambda)$, so $G_b \approx_c H_b$.

#### Step 2: $H_b \approx_s H_2$ for each $b \in \{0,1\}$ (`p-21`–`p-22` and Lecture 10)

Fix $b \in \{0,1\}$ and let $\mathcal{A}$ be unbounded with polynomially bounded queries and block lengths. Query $i \in \{1, \dots, q\}$ (start counter $r_i \gets U_n$, length $t_i$) evaluates $R$ on $S_i = \{r_i, r_i+1, \dots, r_i+t_i-1\} \pmod{2^n}$; the challenge (start counter $r^* \gets U_n$, length $t^*$) evaluates $R$ on $S^* = \{r^*, r^*+1, \dots, r^*+t^*-1\} \pmod{2^n}$. Define
$$
\mathrm{OVERLAP} \iff \exists\, i \in \{1, \dots, q\} \text{ such that } S^* \cap S_i \neq \emptyset.
$$
Whenever $\overline{\mathrm{OVERLAP}}$ holds (and $t^* < 2^n$, true for large $\lambda$ since $2^{-n} = \operatorname{negl}(\lambda)$), the $t^*$ counters in $S^*$ are pairwise distinct and disjoint from every $S_i$. Thus $R(r^*), \dots, R(r^*+t^*-1)$ are fresh, independent uniform $n$-bit pads independent of $r^*$ and all query replies, making $c^* = (r^*, R(r^*)\oplus m_{b,1}^*, \dots)$ uniform over $\{0,1\}^{n(t^*+1)}$ as in $H_2$. Therefore,
$$
\operatorname{SD}(H_b;\, H_2) \le \Pr[\mathrm{OVERLAP}].
$$

**Bounding $\Pr[\mathrm{OVERLAP}]$ (Lecture 10):** Set $Q(\lambda) = \max(q, t^*, t_1, \dots, t_q) = \operatorname{poly}(\lambda)$ (assuming $2Q(\lambda) \le 2^n$). Enlarging each span to length $Q(\lambda)$ only increases the overlap probability. For a fixed query $i$ with independent $r_i \gets U_n$, the $Q$-block spans $\{r_i, \dots, r_i+Q-1\} \pmod{2^n}$ and $\{r^*, \dots, r^*+Q-1\} \pmod{2^n}$ intersect ($\mathrm{OVERLAP}_i$) iff
$$
\mathrm{OVERLAP}_i \iff r_i \in \bigl[r^* - Q + 1,\;\; r^* + Q - 1\bigr] \pmod{2^n}
$$
(if $r_i \equiv r^* - Q + 1$, its last counter hits $r^*$; if $r_i \equiv r^* + Q - 1$, its first counter hits $r^* + Q - 1$). This interval contains $(r^* + Q - 1) - (r^* - Q + 1) + 1 = 2Q(\lambda) - 1$ residues modulo $2^n$. Since $r_i \gets U_n$ is uniform and independent of $r^*$,
$$
\Pr[\mathrm{OVERLAP}_i] \le \frac{2Q(\lambda) - 1}{2^n}.
$$
*(Using $Q(\lambda)$ uniformly is slightly loose when $t_i, t^* < Q(\lambda)$, where the exact interval size is $t_i + t^* - 1$.)* By a union bound over all $q \le Q(\lambda)$ queries,
$$
\Pr[\mathrm{OVERLAP}] \le \sum_{i=1}^{q} \Pr[\mathrm{OVERLAP}_i] \le \frac{Q(\lambda)\cdot \bigl(2Q(\lambda) - 1\bigr)}{2^n} = \operatorname{negl}(\lambda),
$$
since $Q(\lambda) = \operatorname{poly}(\lambda)$ and $2^{-n} = \operatorname{negl}(\lambda)$.

By transitivity, $G_0 \approx_c H_0 \approx_s H_2 \approx_s H_1 \approx_c G_1$, so $G_0 \approx_c G_1$. **End of proof.**

---

## Lecture 10: Mid-Course Exercises and Homework Solutions

After finishing the CTR bound, Lecture 10 covers four exercise blocks across perfect secrecy, PRG one-wayness, candidate PRFs, and unbounded CPA impossibility.

---

### Exercise 1: Uniform Ciphertexts vs. Perfect Secrecy

**Problem (Lecture 10).** Prove or refute: an SKE scheme $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ is **perfectly secret** if and only if for **every** probability distribution $M$ over $\mathcal{M}$ and **every** pair $c_0, c_1 \in \mathcal{C}$,
$$
\Pr[C = c_0] = \Pr[C = c_1], \qquad C = \operatorname{Enc}(K, M),\; K \gets U_{\mathcal{K}} \text{ independent of } M.
$$

#### Why the ($\Leftarrow$) Direction Holds
A naive classroom attempt tried to refute ($\Leftarrow$) using $\operatorname{Enc}(k, m) = m$ with $M$ uniform; that fails because the claim quantifies over **every** distribution $M$ (a point mass $\Pr[M = m_0] = 1$ gives $\Pr[C = m_0] = 1 \neq 0$). In fact, ($\Leftarrow$) is **true**: if $C \equiv U_{\mathcal{C}}$ for *every* $M$, then taking point-mass distributions at any $m_0, m_1 \in \mathcal{M}$ yields $\operatorname{Enc}(K, m_0) \equiv U_{\mathcal{C}} \equiv \operatorname{Enc}(K, m_1)$, which characterizes perfect secrecy.

#### Refutation of the ($\Rightarrow$) Direction
The full "if and only if" claim is **false** because ($\Rightarrow$) fails.

**Counterexample (Zero-Padded OTP):** Let $\mathcal{M} = \mathcal{K} = \{0,1\}^n$ and $\mathcal{C} = \{0,1\}^{n+1}$, with
$$
\operatorname{Enc}(k, m) = 0 \parallel (k \oplus m), \qquad \operatorname{Dec}(k, b \parallel c') = c' \oplus k \quad (b \in \{0,1\},\; c' \in \{0,1\}^n).
$$
1. **Correctness:** $\operatorname{Dec}(k, \operatorname{Enc}(k, m)) = (k \oplus m) \oplus k = m$.
2. **Perfect secrecy:** For any $m_0, m_1 \in \{0,1\}^n$ and $K \gets U_n$, $\operatorname{Enc}(K, m_0) \equiv 0 \parallel U_n \equiv \operatorname{Enc}(K, m_1)$. Equivalently, for any $M$, $m$, and reachable $c = 0 \parallel c'$:
   $$
   \Pr[M = m \mid C = 0 \parallel c'] = \frac{\Pr[K = c' \oplus m]\Pr[M = m]}{\sum_{m'} \Pr[K = c' \oplus m']\Pr[M = m']} = \frac{2^{-n}\Pr[M = m]}{2^{-n}\sum_{m'}\Pr[M = m']} = \Pr[M = m].
   $$
3. **Uniformity over $\mathcal{C}$ fails:** For $M \equiv U_n$ and any $y \in \{0,1\}^n$, set $c_0 = 0 \parallel y$ and $c_1 = 1 \parallel y$. Then $\Pr[C = c_0] = 2^{-n} > 0 = \Pr[C = c_1]$ (for general $M$, some $c_0 = 0 \parallel y$ has $\Pr[C = c_0] > 0 = \Pr[C = c_1]$).

*(Lecture 10 caveat: this uses unused strings in $\mathcal{C}$. Even if every string in $\mathcal{C}$ is reachable, a scheme outputting $(0, k \oplus m)$ with probability $1/3$ and $(1, k \oplus m)$ with probability $2/3$ is still perfectly secret yet non-uniform over $\mathcal{C}$.)*

---

### Exercise 2: One-Wayness of Pseudorandom Generators

> ### 🎯 [DIRECT EXAM DIFFICULTY CALIBRATION & HOMEWORK HINT — Lecture 10 Transcript]
> Comparing Exercise 2a ($n \to 2n$) and Exercise 2b ($n \to n+1$), Prof. Venturi explicitly calibrates **what level of exercise difficulty to expect on the exam**:
> - **Exercise 2a ($n \to 2n$ PRG $\implies$ OWF) = Exam Level:** Solved completely in class; Venturi states verbatim: ***"The one that we did [2a] is like [the] same degree [of difficulty as what] we might expect at exams."***
> - **Exercise 2b ($n \to n+1$ PRG $\implies$ OWF) = Tougher Assigned Homework:** Left for homework (*"difficult exercise, I leave it for you at home"*), and explicitly described as harder than typical exam problems: ***"at exams, [exercises are] a little bit easier, cannot be so difficult... the second one [2b] is a bit tougher."***
> - **Professor's explicit hint for 2b:** *"Maybe one problem with this proof is that whenever the adversary fails, you just give up and output 0... even when it fails, you should still have some probability of success [output a random coin]... split the analysis into the case where $A$ succeeds and where $A$ fails."* (Both Venturi's coin-flip analysis and a tighter direct refinement are solved in full below.)

#### Exercise 2a: PRG Stretching $n \to 2n$ Implies OWF

**Statement (Lecture 10).** Let $G : \{0,1\}^n \to \{0,1\}^{2n}$ be a PRG with $2^{-n} = \operatorname{negl}(\lambda)$. Prove that $G$ is a **OWF**.

**Proof.** $G$ is polynomial-time computable. Suppose for contradiction a PPT adversary $\mathcal{A}$ and polynomial $p(\lambda)$ satisfy (for infinitely many $\lambda$)
$$
\Pr_{x \gets U_n}\!\bigl[G(\mathcal{A}(G(x))) = G(x)\bigr] \ge \frac{1}{p(\lambda)}.
$$
Build a PPT PRG distinguisher $\mathcal{D}$: on input $y \in \{0,1\}^{2n}$, run $x' \gets \mathcal{A}(y)$ and output $1$ iff $G(x') = y$.
- **Real world ($y = G(x),\, x \gets U_n$):** $\Pr_{x \gets U_n}[\mathcal{D}(G(x)) = 1] = \Pr_{x \gets U_n}[G(\mathcal{A}(G(x))) = G(x)] \ge \frac{1}{p(\lambda)}$.
- **Ideal world ($y \gets U_{2n}$):** $\mathcal{D}(y) = 1$ implies $y \in \operatorname{Im}(G) := \{G(x) : x \in \{0,1\}^n\}$. Since $|\operatorname{Im}(G)| \le 2^n$ out of $2^{2n}$ strings,
  $$
  \Pr_{y \gets U_{2n}}\!\bigl[\mathcal{D}(y) = 1\bigr] \le \Pr_{y \gets U_{2n}}\!\bigl[y \in \operatorname{Im}(G)\bigr] = \frac{|\operatorname{Im}(G)|}{2^{2n}} \le \frac{2^n}{2^{2n}} = 2^{-n}.
  $$
Thus $\mathcal{D}$'s advantage is at least $\frac{1}{p(\lambda)} - 2^{-n}$, which is non-negligible, contradicting PRG security. **End of proof.**

#### Exercise 2b: PRG Stretching $n \to n+1$ Implies OWF `[Solved Homework following Venturi's L10 hint]`

**Statement (Lecture 10 Homework).** Let $G : \{0,1\}^n \to \{0,1\}^{n+1}$ be a PRG ($2^{-n} = \operatorname{negl}(\lambda)$). Prove that $G$ is a OWF.

**Why 2a's crude bound fails:** $|\operatorname{Im}(G)| / 2^{n+1} \le 2^n / 2^{n+1} = 1/2$, which cannot beat $1/p(\lambda)$ when $1/p(\lambda) \le 1/2$.

**Complete Proof `[following Venturi's L10 hint]`:** Suppose for contradiction a PPT $\mathcal{A}$ inverts $G$ with probability
$$
\alpha := \Pr_{x \gets U_n}\!\bigl[G(\mathcal{A}(G(x))) = G(x)\bigr] \ge \frac{1}{p(\lambda)}.
$$
Define PPT distinguisher $\mathcal{D}(y)$: run $x' \gets \mathcal{A}(y)$; if $G(x') = y$ output $1$, else output a uniform bit $u \gets U_1$. For each $y \in \{0,1\}^{n+1}$, let $s(y) := \Pr[\mathcal{A}(y) \in G^{-1}(y)]$ (over $\mathcal{A}$'s internal coins) and $w(y) := |\{x \in \{0,1\}^n : G(x) = y\}|$. Notice $s(y) = 0$ for $y \notin \operatorname{Im}(G)$, and $w(y) \ge 1$ for $y \in \operatorname{Im}(G)$. Thus $\beta := \Pr_{y \gets U_{n+1}}[G(\mathcal{A}(y)) = y]$ satisfies
$$
\begin{aligned}
\beta = \sum_{y \in \{0,1\}^{n+1}} \frac{1}{2^{n+1}}\, s(y)
&= \frac{1}{2} \sum_{y \in \operatorname{Im}(G)} \frac{1}{2^n}\, s(y) \\
&\le \frac{1}{2} \sum_{y \in \operatorname{Im}(G)} \frac{w(y)}{2^n}\, s(y)
= \frac{1}{2} \sum_{y \in \operatorname{Im}(G)} \Pr_{x \gets U_n}\!\bigl[G(x) = y\bigr]\, s(y) = \frac{\alpha}{2}.
\end{aligned}
$$
Splitting on whether $\mathcal{A}$ succeeds or fails:
- **Real world ($y = G(x)$):** $\Pr[\mathcal{D}(G(x)) = 1] = \alpha \cdot 1 + (1 - \alpha)\cdot \frac{1}{2} = \frac{1}{2} + \frac{\alpha}{2}$.
- **Ideal world ($y \gets U_{n+1}$):** $\Pr[\mathcal{D}(y) = 1] = \beta \cdot 1 + (1 - \beta)\cdot \frac{1}{2} = \frac{1}{2} + \frac{\beta}{2}$.

Using $\beta \le \alpha / 2$, $\mathcal{D}$'s distinguishing advantage is
$$
\left| \Pr_{x \gets U_n}\!\bigl[\mathcal{D}(G(x)) = 1\bigr] - \Pr_{y \gets U_{n+1}}\!\bigl[\mathcal{D}(y) = 1\bigr] \right| = \frac{\alpha - \beta}{2} \ge \frac{\alpha - \alpha/2}{2} = \frac{\alpha}{4} \ge \frac{1}{4p(\lambda)},
$$
contradicting PRG security. *(Tighter refinement: if $\mathcal{D}$ instead outputs $0$ when $\mathcal{A}$ fails—the same distinguisher as 2a—the exact bound $\beta \le \alpha/2$ immediately gives advantage $\alpha - \beta \ge \frac{\alpha}{2} \ge \frac{1}{2p(\lambda)}$.)* **End of proof.**

---

### Exercise 3: Testing Four Candidate PRF Constructions

> ### 🎯 [EXAM FORMAT, "TRAP" WARNINGS & PROOF STRATEGY — Lecture 10 Transcript]
> Prof. Venturi gives four crucial pieces of **exam and problem-solving advice** during Exercise 3:
> 1. **Exam Problem Statements Will Be Explicit (`Candidate 2`):** When a student asked whether $|k| = |x|$ in $F'_k(x) = F_x(k)$, Venturi reassured the class: ***"at the exam, the exercises will be written more explicitly"*** (input and key spaces will always be stated unambiguously).
> 2. **Watch Out for "Traps" (`Candidate 1`):** Venturi calls $F'_k(x) = G'(k) \oplus x$ a ***"trap"***: a single-query check makes $F'_k(x)$ look uniform in isolation, luring students away from testing **two distinct adaptive queries** $(x_1, x_2)$.
> 3. **Check Reduction Preconditions FIRST (`Candidate 2`):** Before writing a reduction, check what the assumed primitive's security actually guarantees: *"Before going to any reduction or attack... I need to use the security of $F$. What do I need? A uniform random secret key! In this construction, the key is $x$, and who picks $x$? The attacker!"* That structural mismatch is a ***"clear advice"*** to switch straight to constructing a counterexample `F_bad`.
> 4. **Beware Illusory Reductions (`Candidate 3`):** Regarding $F_k(0 \parallel x) \parallel F_k(x \parallel 1)$, Venturi warns: ***"the fact that you can write down a reduction doesn't mean the reduction is correct... you still need to prove that the view that you simulate is perfectly simulated."*** Without **strict domain separation** (as in Candidate 4), internal queries collide and break the simulation!

#### Candidate 1: $F'_k(x) = G'(k) \oplus x$ (from a PRG) — **NOT a PRF**
Let $G : \{0,1\}^\lambda \to \{0,1\}^{\lambda + \ell}$ ($\ell \ge 0$) be a PRG, $G'(k) \in \{0,1\}^\lambda$ its first $\lambda$ bits, and $F'_k(x) = G'(k) \oplus x$.
- **Why it is a trap:** For any *single* query $x$, $G'(k) \oplus x \approx_c U_\lambda$, but the pad $G'(k)$ is static across queries.
- **Attack:** $\mathcal{A}$ queries distinct $x_1 \neq x_2 \in \{0,1\}^\lambda$ to get $y_1, y_2$, and outputs $1$ iff $y_1 \oplus y_2 = x_1 \oplus x_2$ (or queries $x_1 = 0^\lambda$ to read $G'(k)$ and checks $y_2 = y_1 \oplus x_2$).
- **Advantage:** In the real game, $y_1 \oplus y_2 = x_1 \oplus x_2$ with probability $1$. In the ideal game ($R \gets \mathcal{R}(\lambda, \lambda)$), $\Pr[R(x_1) \oplus R(x_2) = x_1 \oplus x_2] = 2^{-\lambda}$. Advantage: $1 - 2^{-\lambda}$.

#### Candidate 2: $F'_k(x) = F_x(k)$ (Swapping Key and Input) — **NOT a PRF in General**
Let $\mathcal{F} = \{F_k : \{0,1\}^n \to \{0,1\}^n\}_{k \in \{0,1\}^n}$ be a PRF ($n = n(\lambda)$), and define $F'_k(x) = F_x(k)$. Because the adversary chooses $x$ (the key to $F$), a reduction to $\mathcal{F}$ cannot work in general.

**Counterexample (`F_bad`):** Take any secure PRF $\mathcal{F} = \{F_k\}$ and hardcode one weak key $0^n$:
$$
F^{\text{bad}}_k(z) = \begin{cases} 0^n & \text{if } k = 0^n, \\ F_k(z) & \text{otherwise.} \end{cases}
$$
1. **$\mathcal{F}_{\text{bad}}$ is still a PRF:** For $k \gets U_n$, $F^{\text{bad}}_k \equiv F_k$ whenever $k \neq 0^n$, and $\Pr[k = 0^n] = 2^{-n}$. By the triangle inequality,
   $$
   \left| \Pr[\mathcal{A}^{F^{\text{bad}}_k} = 1] - \Pr[\mathcal{A}^R = 1] \right|
   \le \left| \Pr[\mathcal{A}^{F^{\text{bad}}_k} = 1] - \Pr[\mathcal{A}^{F_k} = 1] \right| + \left| \Pr[\mathcal{A}^{F_k} = 1] - \Pr[\mathcal{A}^R = 1] \right|
   \le 2^{-n} + \operatorname{negl}(\lambda) = \operatorname{negl}(\lambda).
   $$
2. **$F'_k(x) := F^{\text{bad}}_x(k)$ fails:** $\mathcal{A}$ queries $x = 0^n$ and outputs $1$ iff $\mathcal{O}(0^n) = 0^n$. In the real game, $F'_k(0^n) = F^{\text{bad}}_{0^n}(k) = 0^n$ with probability $1$; in the ideal game, $\Pr[R(0^n) = 0^n] = 2^{-n}$. Advantage: $1 - 2^{-n}$.

#### Candidate 3: $F'_k(x) = F_k(0 \parallel x) \parallel F_k(x \parallel 1)$ — **NOT a PRF**
For $F_k : \{0,1\}^n \to \{0,1\}^n$ ($n \ge 2$), $F'_k : \{0,1\}^{n-1} \to \{0,1\}^{2n}$ has overlapping domain tags: distinct $x_1 \neq x_2$ can satisfy $x_1 \parallel 1 = 0 \parallel x_2$.
- **Attack:** Query $x_1 = 0^{n-1}$ and $x_2 = 0^{n-2} \parallel 1$ to get $\mathcal{O}(x_i) = s_i \parallel t_i$ ($s_i, t_i \in \{0,1\}^n$), and output $1$ iff $t_1 = s_2$:
  $$
  \begin{aligned}
  F'_k(x_1) &= F_k(0^n) \parallel F_k(0^{n-1} \parallel 1) &&=: s_1 \parallel t_1, \\
  F'_k(x_2) &= F_k(0^{n-1} \parallel 1) \parallel F_k(0^{n-2} \parallel 11) &&=: s_2 \parallel t_2.
  \end{aligned}
  $$
- **Advantage:** Real game gives $t_1 = F_k(0^{n-1} \parallel 1) = s_2$ with probability $1$; ideal game ($R \gets \mathcal{R}(n-1, 2n)$) gives independent uniform $n$-bit $t_1, s_2$, so $\Pr[t_1 = s_2] = 2^{-n}$. Advantage: $1 - 2^{-n}$.

#### Candidate 4: $F'_k(x) = F_k(0 \parallel x) \parallel F_k(1 \parallel x)$ — **IS a Secure PRF**
For $F_k : \{0,1\}^n \to \{0,1\}^n$, $F'_k : \{0,1\}^{n-1} \to \{0,1\}^{2n}$ enforces **strict domain separation**: $0 \parallel x \neq 1 \parallel x'$ for all $x, x' \in \{0,1\}^{n-1}$, so any $q$ distinct queries $x_1, \dots, x_q$ map to $2q$ pairwise distinct $n$-bit inputs $\{0 \parallel x_i, 1 \parallel x_i\}_{i=1}^q$.

**Proof:** Let hybrid $\mathcal{H}$ answer each query $x$ with $R(0 \parallel x) \parallel R(1 \parallel x)$ for $R \gets \mathcal{R}(n, n)$.
1. **$\operatorname{Game}^{\mathrm{real}}_{\mathcal{F}',\mathcal{A}}(\lambda) \approx_c \mathcal{H}$:** A PPT reduction $\mathcal{B}$ with PRF oracle $\mathcal{O} \in \{F_k, R\}$ answers each query $x$ with $\mathcal{O}(0 \parallel x) \parallel \mathcal{O}(1 \parallel x)$ and outputs $\mathcal{A}$'s guess, matching the real game for $\mathcal{O} = F_k$ and $\mathcal{H}$ for $\mathcal{O} = R$.
2. **$\mathcal{H} \equiv \operatorname{Game}^{\mathrm{ideal}}_{\mathcal{F}',\mathcal{A}}(\lambda)$:** Because all $2q$ inner inputs $\{0 \parallel x_i, 1 \parallel x_i\}_{i=1}^q$ are pairwise distinct, $R \gets \mathcal{R}(n, n)$ returns $2q$ independent uniform $n$-bit strings, so their pairs form $q$ independent uniform $2n$-bit strings—identically distributed to $R' \gets \mathcal{R}(n-1, 2n)$.

Combining both steps proves $\mathcal{F}'$ is a secure PRF. **End of proof.**

---

### Exercise 4: Impossibility of Unbounded CPA-Secure SKE `[Solved Homework]`

> ### 📝 [ASSIGNED HOMEWORK — Lecture 10 Transcript]
> Assigned explicitly as homework at the end of Lecture 10 (*"only the homework"*): prove that no SKE scheme, even randomized, can achieve CPA security against computationally unbounded adversaries. The full proof is provided immediately below.

**Statement (Lecture 10 Homework).** Prove that **no** SKE scheme $\Pi = (\operatorname{Gen}, \operatorname{Enc}, \operatorname{Dec})$—even if $\operatorname{Enc}$ is **randomized**—can be CPA-secure against **computationally unbounded** adversaries (assuming at least two equal-length messages $m_0^* \neq m_1^* \in \mathcal{M}$).

**Complete Proof `[Solved Homework]`:**
Since $\operatorname{Gen}(1^\lambda)$ is PPT, its output key length is bounded by some polynomial $p(\lambda)$, so $|\mathcal{K}_\lambda| \le 2^{p(\lambda)}$. Fix equal-length $m_0^* \neq m_1^* \in \mathcal{M}$ and set $t(\lambda) = 4p(\lambda) + 4\lambda$ (polynomial in $\lambda$). Build an unbounded adversary $\mathcal{A}$ (making only $t(\lambda)$ queries):
1. **Phase 1 ($t$ random encryptions):** Sample $u_1, \dots, u_t \gets \{0,1\}$ independently, query $m_{u_1}^*, \dots, m_{u_t}^*$ to the CPA oracle, and receive $c_1, \dots, c_t$.
2. **Unbounded key filtering:** Form the set of keys consistent with all $t$ pairs:
   $$
   S_{\text{good}} = \left\{ k' \in \mathcal{K}_\lambda : \operatorname{Dec}(k', c_i) = m_{u_i}^* \text{ for all } i \in \{1, \dots, t\} \right\}.
   $$
   Pick the first $k^* \in S_{\text{good}}$ (if $S_{\text{good}} = \emptyset$, output a random bit $b' \gets \{0,1\}$ and halt).
3. **Challenge & guess:** Submit $(m_0^*, m_1^*)$ to receive $c^* \gets \operatorname{Enc}(k, m_b^*)$, and compute $\hat{m} = \operatorname{Dec}(k^*, c^*)$. Output $0$ if $\hat{m} = m_0^*$, $1$ if $\hat{m} = m_1^*$, or a uniform bit $b' \gets \{0,1\}$ otherwise.

**Analysis:** Fix the true key $k \in \mathcal{K}_\lambda$. For each candidate $k' \in \mathcal{K}_\lambda$, define its **challenge misdecryption rate**
$$
\delta_k(k') := \Pr_{\substack{u \gets \{0,1\} \\ c \gets \operatorname{Enc}(k, m_u^*)}}\!\bigl[\operatorname{Dec}(k', c) \neq m_u^*\bigr].
$$
Call $k'$ **bad** if $\delta_k(k') \ge 1/4$. Since $\operatorname{Enc}$ is stateless and $(u_i, c_i)$ are i.i.d. draws from $(u, c)$, a fixed bad key $k'$ survives Step 2 with probability $(1 - \delta_k(k'))^t \le (3/4)^t$. Taking a union bound over $|\mathcal{K}_\lambda| \le 2^{p(\lambda)}$ keys and using $(3/4)^4 = 81/256 < 1/2$:
$$
\Pr\!\left[\exists\, k' \in S_{\text{good}} \text{ with } \delta_k(k') \ge \frac{1}{4}\right]
\le 2^{p(\lambda)} \left(\frac{3}{4}\right)^{4p(\lambda) + 4\lambda}
= 2^{p(\lambda)} \left(\frac{81}{256}\right)^{p(\lambda) + \lambda}
< 2^{p(\lambda)} \cdot 2^{-(p(\lambda) + \lambda)} = 2^{-\lambda}.
$$
Meanwhile, by $\Pi$'s correctness, $k \in S_{\text{good}}$ with probability at least $1 - t \cdot \operatorname{negl}(\lambda) = 1 - \operatorname{negl}(\lambda)$. Hence the event $E_{\text{good}}$ that $k^* \in S_{\text{good}}$ exists and has $\delta_k(k^*) < 1/4$ satisfies $\Pr[E_{\text{good}}] \ge 1 - \operatorname{negl}(\lambda)$.

Because $k^*$ is fixed before $b \gets \{0,1\}$ and $c^* \gets \operatorname{Enc}(k, m_b^*)$ are chosen, conditioned on $E_{\text{good}}$ the pair $(m_b^*, c^*)$ has the exact distribution in $\delta_k(k^*)$, so $\mathcal{A}$ recovers $m_b^*$ (and outputs $b' = b$) with probability at least $1 - \delta_k(k^*) > 3/4$:
$$
\Pr[b' = b] \ge \Pr[E_{\text{good}}] \cdot \Pr[b' = b \mid E_{\text{good}}] > \bigl(1 - \operatorname{negl}(\lambda)\bigr)\cdot \frac{3}{4} = \frac{3}{4} - \operatorname{negl}(\lambda).
$$
By $\Pr[b' = b] = \frac{1}{2} + \frac{1}{2}\bigl(\Pr[\mathcal{A}=1 \mid b=1] - \Pr[\mathcal{A}=1 \mid b=0]\bigr)$, $\mathcal{A}$'s CPA distinguishing advantage is at least
$$
\left| \Pr\!\left[\operatorname{Game}^{\mathrm{cpa}}_{\Pi,\mathcal{A}}(\lambda, 1) = 1\right] - \Pr\!\left[\operatorname{Game}^{\mathrm{cpa}}_{\Pi,\mathcal{A}}(\lambda, 0) = 1\right] \right| \ge 2\left(\frac{3}{4} - \frac{1}{2} - \operatorname{negl}(\lambda)\right) = \frac{1}{2} - \operatorname{negl}(\lambda),
$$
which is non-negligible. **End of proof.**

---

# Part IV — Message Authentication, Authenticated Encryption, and Collision-Resistant Hashing (Lectures 11–13)

Symmetric encryption (CTR, CBC) ensures **confidentiality** against passive CPA eavesdroppers, leaving open **computational integrity** (MACs without one-time key limits) and **chosen-ciphertext (CCA) security** against active ciphertext tampering. Resolving both leads to **collision-resistant hash functions (CRHs)** at the Minicrypt/Cryptomania boundary.

---

## 1. Computationally Secure Message Authentication Codes (Lecture 11)

> ### 📋 [NO TRANSCRIPT AVAILABLE FOR LECTURE 11 — Slide-Verified Cues Only]
> No local audio transcript exists for Lecture 11; scope and exercise labels are verified against all **23 pages of Lecture 11 slides** (`Slide 5` and `Slide 22` explicitly mark `EXERCISE` and `FACT`).

In the statistical setting (Lecture 2), unbounded adversaries forced keys to be refreshed after a bounded number $t$ of messages. Restricting adversaries to **PPT** algorithms lets a single short secret key authenticate polynomially many messages of arbitrary length.

### 1.1 Syntax, Determinism, and UF-CMA Security

A symmetric-key MAC consists of key space $\mathcal{K}$, message space $\mathcal{M}$, tag space $\mathcal{T}$ (parameterized implicitly by $\lambda$), and an efficient tagging algorithm $\mathrm{Tag} : \mathcal{K} \times \mathcal{M} \to \mathcal{T}$. When $\mathrm{Tag}$ is **deterministic**, verification is **canonical**: on input $(m, \tau)$ under key $K \in \mathcal{K}$, the verifier outputs $1$ (accept) iff $\mathrm{Tag}(K, m) = \tau$, and $0$ (reject) otherwise. More generally, a MAC is a triple $\Pi = (\mathrm{Gen}, \mathrm{Tag}, \mathrm{Vrfy})$ where $\mathrm{Gen}(1^\lambda)$ samples $K \gets \mathcal{K}$ (e.g., $\{0,1\}^\lambda$), $\mathrm{Tag}$ may be randomized, and correctness requires $\Pr[\mathrm{Vrfy}(K, m, \mathrm{Tag}(K, m)) = 1] = 1$ for all $K \in \mathcal{K}, m \in \mathcal{M}$.

**Game $\mathsf{Game}^{\mathrm{ufcma}}_{\Pi, A}(\lambda)$ (Existential Unforgeability under Chosen-Message Attack):**
1. Challenger $\mathcal{C}$ samples $K \gets \mathcal{K}$ and sets $Q = \emptyset$.
2. For $i = 1, \dots, q(\lambda)$ ($q = \mathsf{poly}(\lambda)$), $A(1^\lambda)$ adaptively queries $m_i \in \mathcal{M}$; $\mathcal{C}$ computes $\tau_i \gets \mathrm{Tag}(K, m_i)$, sets $Q \gets Q \cup \{m_i\}$, and returns $\tau_i$.
3. $A$ outputs a forgery attempt $(m^*, \tau^*) \in \mathcal{M} \times \mathcal{T}$.
4. The game outputs $1$ ($A$ wins) iff **(i) Validity:** $\mathrm{Vrfy}(K, m^*, \tau^*) = 1$ (canonically, $\mathrm{Tag}(K, m^*) = \tau^*$), and **(ii) Freshness:** $m^* \notin Q$.

```text
Adversary A                                   Challenger C (K <- K)
-----------                                   ---------------------
   |--- m_i \in M  (adaptive, q = poly) ------->|  Q <- Q U {m_i}
   |<-- tau_i <- Tag(K, m_i) -------------------|
   |--- (m*, tau*) ---------------------------->|  Output 1 iff Vrfy(K,m*,tau*) = 1 and m* \notin Q
```

**Definition 1.1 (UF-CMA Security).** A MAC $\Pi = (\mathrm{Tag}, \mathrm{Vrfy})$ is **UF-CMA secure** if for every PPT adversary $A$,
$$
\Pr\bigl[\mathsf{Game}^{\mathrm{ufcma}}_{\Pi, A}(\lambda) = 1\bigr] \le \mathsf{negl}(\lambda).
$$

Unforgeability is *existential*: $A$ wins even if $m^*$ is arbitrary garbage rather than a pre-chosen meaningful message (selective forgery), ensuring security regardless of how applications format messages.

### 1.2 Replay Attacks, Weak vs. Strong UF-CMA, and Unique Tags

Two subtleties of Definition 1.1 become critical when building authenticated encryption:

1. **No replay protection:** UF-CMA only forbids forging a tag on an *unseen* message $m^* \notin Q$. An attacker can still record a valid pair $(m_i, \tau_i)$ and replay it later; applications must prevent replays separately via sequence numbers, nonces, or timestamps inside $m$.
2. **Weak vs. Strong UF-CMA:** Definition 1.1 is **Weak UF-CMA** because freshness requires $m^* \notin Q$. **Strong UF-CMA** ($\mathsf{Game}^{\mathrm{sufcma}}_{\Pi, A}(\lambda)$) relaxes freshness to pair freshness: $A$ wins iff $\mathrm{Vrfy}(K, m^*, \tau^*) = 1$ and
$$
(m^*, \tau^*) \notin \{(m_1, \tau_1), \dots, (m_q, \tau_q)\},
$$
allowing $m^* = m_i$ with a new valid tag $\tau^* \neq \tau_i$.

Weak UF-CMA does **not** imply Strong UF-CMA. Given any deterministic UF-CMA MAC $\Pi = (\mathrm{Tag}, \mathrm{Vrfy})$, define $\Pi' = (\mathrm{Tag}', \mathrm{Vrfy}')$ by
$$
\mathrm{Tag}'(K, m) = 0 \parallel \mathrm{Tag}(K, m), \qquad \mathrm{Vrfy}'(K, m, b \parallel \tau) = \mathrm{Vrfy}(K, m, \tau)
$$
for $b \in \{0,1\}$. Any Weak UF-CMA forgery $(m^*, b^* \parallel \tau^*)$ against $\Pi'$ yields a forgery $(m^*, \tau^*)$ against $\Pi$, so $\Pi'$ is Weak UF-CMA. Yet querying a single $m_1$ gives $\tau'_1 = 0 \parallel \tau_1$, and outputting $(m_1, 1 \parallel \tau_1) \neq (m_1, \tau'_1)$ breaks Strong UF-CMA with probability $1$.

A MAC has **unique tags** if for every $K \in \mathcal{K}$ and $m \in \mathcal{M}$, at most one $\tau \in \mathcal{T}$ satisfies $\mathrm{Vrfy}(K, m, \tau) = 1$ (automatic for deterministic MACs with canonical verification). Under unique tags, $m^* = m_i$ forces $\tau^* = \tau_i$, so no fresh-tag forgery exists:
$$
\text{Unique Tags} + \text{Weak UF-CMA} \implies \text{Strong UF-CMA}.
$$
In general, Strong UF-CMA is strictly weaker than unique tags (e.g., a randomized MAC can be Strong UF-CMA without unique tags), though practical deterministic MACs satisfy unique tags automatically.

### 1.3 Constructing Fixed-Length MACs from PRFs

**Theorem 1.2 (PRF-to-MAC).** Let $\mathcal{F} = \{F_K : \{0,1\}^n \to \{0,1\}^n\}_{K \in \{0,1\}^\lambda}$ be a PRF family with $2^{-n} \le \mathsf{negl}(\lambda)$ (i.e., $n = \omega(\log \lambda)$, e.g., $n \ge \lambda$). Then $\Pi$ on $\mathcal{K} = \{0,1\}^\lambda$, $\mathcal{M} = \mathcal{T} = \{0,1\}^n$ defined by $\mathrm{Tag}(K, m) = F_K(m)$ (with canonical verification) is UF-CMA secure.

**Proof.** Fix any PPT adversary $A$ playing $\mathsf{Game}^{\mathrm{ufcma}}_{\Pi, A}(\lambda)$, and compare:
- $G(\lambda) \equiv \mathsf{Game}^{\mathrm{ufcma}}_{\Pi, A}(\lambda)$, where the oracle evaluates $F_K(\cdot)$ for $K \gets \{0,1\}^\lambda$.
- $H(\lambda)$, identical except $F_K(\cdot)$ is replaced everywhere (both for queries and for verifying $(m^*, \tau^*)$) by a truly random function $R \gets \mathcal{R}(n, n)$.

First, $G(\lambda) \approx_c H(\lambda)$. Suppose $|\Pr[G(\lambda) = 1] - \Pr[H(\lambda) = 1]| \ge 1/p(\lambda)$ for a polynomial $p$ and infinitely many $\lambda$. Build a PPT PRF distinguisher $D_{\mathrm{prf}}^{\mathcal{O}}(1^\lambda)$ (where $\mathcal{O}$ is $F_K$ or $R$):
1. Initialize $Q = \emptyset$ and run $A(1^\lambda)$.
2. On query $m \in \{0,1\}^n$, set $Q \gets Q \cup \{m\}$ and return $\mathcal{O}(m)$.
3. When $A$ outputs $(m^*, \tau^*)$, output $1$ iff $m^* \notin Q$ and $\tau^* = \mathcal{O}(m^*)$.

When $\mathcal{O} = F_K$, $D_{\mathrm{prf}}$ reproduces $G(\lambda)$; when $\mathcal{O} = R$, it reproduces $H(\lambda)$. Thus $D_{\mathrm{prf}}$ distinguishes $\mathcal{F}$ from $\mathcal{R}(n, n)$ with advantage $\ge 1/p(\lambda)$, contradicting PRF security.

Second, in $H(\lambda)$, the values $\{R(x)\}_{x \in \{0,1\}^n}$ are i.i.d. uniform over $\{0,1\}^n$. Since freshness enforces $m^* \notin Q$, even an unbounded adversary learns nothing about $R(m^*)$ from its query transcript, so $\Pr[H(\lambda) = 1] \le 2^{-n} \le \mathsf{negl}(\lambda)$. By the triangle inequality,
$$
\Pr\bigl[\mathsf{Game}^{\mathrm{ufcma}}_{\Pi, A}(\lambda) = 1\bigr] \le \Pr[H(\lambda) = 1] + \bigl|\Pr[G(\lambda) = 1] - \Pr[H(\lambda) = 1]\bigr| \le 2^{-n} + \mathsf{negl}(\lambda) = \mathsf{negl}(\lambda). \quad \square
$$

> ### 📝 [SLIDE EXERCISE — Lecture 11 Slide 5]
> **Exercise (Lecture 11, Slide 5): A UF-CMA MAC that is not a PRF.** Show that if $\mathcal{F} = \{F_K : \{0,1\}^n \to \{0,1\}^n\}$ is a PRF, then $\mathrm{Tag}(K, m) = 0 \parallel F_K(m)$ is a UF-CMA MAC, even though $\{0 \parallel F_K(\cdot)\}_K$ is not a PRF.
> - *Not a PRF:* A distinguisher $D$ queries $m = 0^n$ and outputs $1$ iff the first bit of the $(n+1)$-bit response is $0$. Under $0 \parallel F_K(\cdot)$, $D$ outputs $1$ with probability $1$; under $R \gets \mathcal{R}(n, n+1)$, the probability is $1/2$, giving advantage $1/2$.
> - *Still UF-CMA:* Any valid forgery $(m^*, b \parallel \tau^*)$ requires $b = 0$ and $\tau^* = F_K(m^*)$ with $m^* \notin Q$, yielding a UF-CMA forgery $(m^*, \tau^*)$ against Theorem 1.2.

### 1.4 Domain Extension for MACs: Why Naive Block Designs Fail

To authenticate a $d$-block message $m = (m_1, \dots, m_d) \in (\{0,1\}^n)^d$ ($N = n \cdot d$) using a fixed-length UF-CMA MAC $\mathrm{Tag}$, three naive attempts on the Lecture 11 slides fail:

1. **XOR-then-MAC:** $\tau = \mathrm{Tag}\bigl(K, \bigoplus_{i=1}^d m_i\bigr)$.
   - *Attack:* Query $m = (0^n, 1^n)$ to get $\tau$, and forge $m^* = (1^n, 0^n)$ with $\tau^* = \tau$ (commutativity gives $1^n \oplus 0^n = 0^n \oplus 1^n$). Alternatively, query $m_1 \parallel m_1$ and forge $m_2 \parallel m_2$ with the same $\tau$.
2. **Independent block-by-block tagging:** $\tau = (\tau_1, \dots, \tau_d)$ where $\tau_i = \mathrm{Tag}(K, m_i)$.
   - *Attack:* Query $(m_1, m_2)$ with $m_1 \neq m_2$ to obtain $(\tau_1, \tau_2)$, then forge $m^* = (m_2, m_1)$ with $\tau^* = (\tau_2, \tau_1)$ (and for variable lengths, truncating to $(m_1), (\tau_1)$ also forges).
3. **Index-prefixed block tagging:** $\tau = (\tau_1, \dots, \tau_d)$ where $\tau_i = \mathrm{Tag}(K, \langle i \rangle \parallel m_i)$ prevents single-message permutation, but fails a **two-query cut-and-paste attack**: query $m^{(1)} = (m_1, m_2) \mapsto (\tau_1, \tau_2)$ and $m^{(2)} = (m_3, m_4) \mapsto (\tau_3, \tau_4)$ (with $m_1 \neq m_3, m_2 \neq m_4$), then output the fresh valid forgery
$$
m^* = (m_1, m_4), \qquad \tau^* = (\tau_1, \tau_4).
$$

### 1.5 Almost Universal Hash Families and the Hash-then-PRF Paradigm

We compress $N$-bit inputs to $n$ bits via a keyed hash family $\mathcal{H} = \{h_s : \{0,1\}^N \to \{0,1\}^n\}_{s \in \mathcal{S}}$ with a **secret** seed $s$, then apply an $n$-bit PRF $F_K$:
$$
F(\mathcal{H}) \equiv \bigl\{F_K(h_s(\cdot)) : \{0,1\}^N \to \{0,1\}^n\bigr\}_{(K, s) \in \{0,1\}^\lambda \times \mathcal{S}}.
$$
Since $N > n$, collisions ($h_s(x) = h_s(x')$ for $x \neq x'$) exist by pigeonhole, but keeping $s$ secret requires only a low collision probability for any *fixed* pair $(x, x')$.

**Definition 1.3 ($\varepsilon$-Almost Universal Hash Family).** $\mathcal{H} = \{h_s : \{0,1\}^N \to \{0,1\}^n\}_{s \in \mathcal{S}}$ is **$\varepsilon$-almost universal ($\varepsilon$-AU)** if for all $x \neq x' \in \{0,1\}^N$,
$$
\Pr_{s \gets \mathcal{S}}\bigl[h_s(x) = h_s(x')\bigr] \le \varepsilon.
$$
It is **almost universal (AU)** if $\varepsilon = \mathsf{negl}(\lambda)$, and **perfectly universal (PU)** if $\varepsilon = 2^{-n}$.

Replacing $\mathcal{H}$ with a public-seed collision-resistant hash (e.g., SHA-3) would work but leaves **Minicrypt**, since CRHs are black-box separated from OWFs. By contrast, AU hash families exist **unconditionally** (Section 1.6), keeping $F(\mathcal{H})$ inside Minicrypt.

**Theorem 1.4 (PRF Composition with AU Hashing).** If $\mathcal{F} = \{F_K : \{0,1\}^n \to \{0,1\}^n\}_{K \in \{0,1\}^\lambda}$ is a PRF and $\mathcal{H} = \{h_s : \{0,1\}^N \to \{0,1\}^n\}_{s \in \mathcal{S}}$ is $\varepsilon$-AU with $\varepsilon = \mathsf{negl}(\lambda)$ ($N = n \cdot d$, $d = \mathsf{poly}(\lambda)$), then $F(\mathcal{H})$ is a PRF family over $\{0,1\}^N \to \{0,1\}^n$.

**Corollary 1.5.** Under the hypotheses of Theorem 1.4 and $2^{-n} \le \mathsf{negl}(\lambda)$, $\mathrm{Tag}((K, s), m) = F_K(h_s(m))$ is a UF-CMA MAC for length $N = n \cdot d$ (immediate from Theorem 1.2).

**Proof of Theorem 1.4.** Fix a PPT adversary $A$ making $q = \mathsf{poly}(\lambda)$ queries; WLOG $A$ never repeats a query since all oracles below are deterministic. Define three games:
- $H_0(\lambda)$: $A$ gets $F_K(h_s(x))$ for $K \gets \{0,1\}^\lambda, s \gets \mathcal{S}$.
- $H_1(\lambda)$: $A$ gets $R(h_s(x))$ for $R \gets \mathcal{R}(n, n)$ and secret $s \gets \mathcal{S}$.
- $H_2(\lambda)$: $A$ gets $R'(x)$ for $R' \gets \mathcal{R}(N, n)$.

**Step 1 ($H_0 \approx_c H_1$):** Construct a PPT distinguisher $B_{\mathrm{prf}}^{\mathcal{O}}$ against $\mathcal{F}$: $B_{\mathrm{prf}}$ samples $s \gets \mathcal{S}$, answers each query $x$ of $A$ with $\mathcal{O}(h_s(x))$, and outputs $A$'s bit. Even if $h_s(x_i) = h_s(x_j)$, $B_{\mathrm{prf}}$ returns consistent answers, matching $H_0$ when $\mathcal{O} = F_K$ and $H_1$ when $\mathcal{O} = R$. Thus $|\Pr[H_0(\lambda) = 1] - \Pr[H_1(\lambda) = 1]| \le \mathsf{negl}(\lambda)$.

**Step 2 ($H_1 \approx_s H_2$):** Because $A$ chooses queries adaptively in $H_1$ after seeing responses that depend on $s$, $x_i$ in $H_1$ is not independent of $s$—so we must define the collision event $\mathsf{BAD}$ in **$H_2$** using **lazy sampling** on a shared probability space. Sample $s \gets \mathcal{S}$ and i.i.d. uniform strings $u_1, \dots, u_q \gets \{0,1\}^n$:
- In $H_2$, the $i$-th distinct query $x_i$ always receives $y_i = u_i$ (ignoring $s$ completely).
- In $H_1$, on query $x_i$, if $h_s(x_i) = h_s(x_k)$ for some $k < i$, return $y_k$; otherwise return $y_i = u_i$ (faithfully simulating $R(h_s(\cdot))$).

Let $\mathsf{BAD}$ be the event in $H_2$ that, after all queries $x_1, \dots, x_q$ finish and $s$ is revealed, there exist $1 \le i < j \le q$ with $h_s(x_i) = h_s(x_j)$. Whenever $\overline{\mathsf{BAD}}$ holds, $H_1$ and $H_2$ return identical strings $u_1, \dots, u_q$, so by the identical-until-bad lemma,
$$
\mathrm{SD}\bigl(H_1(\lambda), H_2(\lambda)\bigr) \le \Pr_{H_2}[\mathsf{BAD}].
$$
In $H_2$, the transcript $(x_1, \dots, x_q)$ is generated **independently of $s$**. Conditioning on any fixed $(x_1, \dots, x_q)$ of distinct inputs and applying the union bound with Definition 1.3 gives
$$
\Pr_{H_2}[\mathsf{BAD}] = \Pr_{s \gets \mathcal{S}}\bigl[\exists\, 1 \le i < j \le q : h_s(x_i) = h_s(x_j)\bigr] \le \sum_{1 \le i < j \le q} \Pr_{s \gets \mathcal{S}}\bigl[h_s(x_i) = h_s(x_j)\bigr] \le \binom{q}{2}\varepsilon \le q^2\varepsilon = \mathsf{negl}(\lambda).
$$
Thus $H_0(\lambda) \approx_c H_2(\lambda)$, so $F(\mathcal{H})$ is a PRF. $\quad \square$

### 1.6 Algebraic Constructions of Universal Hash Families over Finite Fields

Work over $\mathbb{F} = \mathrm{GF}(2^n)$ ($|\mathbb{F}| = 2^n$), identifying $n$-bit blocks $(b_{n-1}, \dots, b_0) \in \{0,1\}^n$ with polynomials $\sum_{r=0}^{n-1} b_r X^r$ over $\mathbb{F}_2$ (e.g., $0101 \leftrightarrow X^2 + 1$). Addition is bitwise XOR, multiplication is modulo an irreducible degree-$n$ polynomial over $\mathbb{F}_2$, and every $\delta \in \mathbb{F} \setminus \{0\}$ has a multiplicative inverse $\delta^{-1} \in \mathbb{F}$.

#### Construction 1: Inner-Product Hash (Perfectly Universal, Long Seed)
For $m = (m_1, \dots, m_d) \in \mathbb{F}^d$ and uniform seed $s = (a_1, \dots, a_d) \gets \mathbb{F}^d$ ($n \cdot d$ bits), define
$$
h_{a_1, \dots, a_d}(m_1, \dots, m_d) = \sum_{i=1}^d a_i \cdot m_i \in \mathbb{F}.
$$

**Claim 1.6.** Construction 1 is **perfectly universal** ($\varepsilon = 2^{-n}$).

*Proof.* Fix $m \neq m' \in \mathbb{F}^d$ and set $\delta_i = m'_i - m_i$. Some $\delta_j \neq 0$; WLOG $\delta_1 \neq 0$. Then
$$
\sum_{i=1}^d a_i m_i = \sum_{i=1}^d a_i m'_i \iff a_1 = \delta_1^{-1}\left(-\sum_{i=2}^d a_i \delta_i\right).
$$
For any fixed $(a_2, \dots, a_d) \in \mathbb{F}^{d-1}$, the right-hand side is a single element of $\mathbb{F}$, so uniform independent $a_1 \gets \mathbb{F}$ hits it with probability $1/|\mathbb{F}| = 2^{-n}$. $\quad \square$

#### Construction 2: Polynomial Evaluation Hash (Almost Universal, Short Seed)
To shrink the seed to a **single field element** $s \gets \mathbb{F}$ ($n$ bits), view $m$ as coefficients of $q_m(Z) = \sum_{i=1}^d m_i Z^{i-1} \in \mathbb{F}[Z]$ and evaluate at $s$:
$$
h_s(m_1, \dots, m_d) = \sum_{i=1}^d m_i \cdot s^{i-1} = q_m(s) \in \mathbb{F}.
$$

**Claim 1.7.** Construction 2 is **$\frac{d-1}{2^n}$-almost universal** (hence AU when $d = \mathsf{poly}(\lambda)$ and $2^{-n} \le \mathsf{negl}(\lambda)$).

*Proof.* For $m \neq m' \in \mathbb{F}^d$, $h_s(m) = h_s(m') \iff q_{m - m'}(s) = \sum_{i=1}^d (m_i - m'_i) s^{i-1} = 0$. Since $m \neq m'$, $q_{m - m'}(Z)$ is a nonzero polynomial of degree at most $d - 1$ over $\mathbb{F}$, hence has at most $d - 1$ roots in $\mathbb{F}$. For uniform $s \gets \mathbb{F}$,
$$
\Pr_{s \gets \mathbb{F}}\bigl[h_s(m) = h_s(m')\bigr] \le \frac{d - 1}{2^n} \approx \frac{N}{n \cdot 2^n} = \mathsf{negl}(\lambda). \quad \square
$$

### 1.7 Real-World MAC Domain Extension: CBC-MAC and Encrypted CBC-MAC

In practice, implementations reuse a block cipher / PRF such as AES for both $\mathcal{H}$ and the outer PRF.

**Definition 1.8 (CBC-MAC).** Let $\mathcal{F} = \{F_s : \{0,1\}^n \to \{0,1\}^n\}_{s \in \{0,1\}^\lambda}$ be a PRF. On $m = (m_1, \dots, m_d) \in (\{0,1\}^n)^d$, set $\tau_0 = \mathrm{IV} = 0^n$, $\tau_i = F_s(\tau_{i-1} \oplus m_i)$ for $i = 1, \dots, d$, and output $y = h_s(m) = \tau_d$:
$$
h_s(m_1, \dots, m_d) = F_s\Bigl(m_d \oplus F_s\bigl(m_{d-1} \oplus \cdots \oplus F_s(m_2 \oplus F_s(m_1 \oplus 0^n))\cdots\bigr)\Bigr).
$$

```text
IV = 0^n ---> (+) <--- m_1     (+) <--- m_2           (+) <--- m_d
               |                ^                      ^
               v                |                      |
             [F_s] -------------+   [F_s] --- ... ---> [F_s] ---> y = h_s(m)
```

Unlike CBC *encryption* (which needs a random $\mathrm{IV}$ for CPA security), CBC-MAC **must fix $\mathrm{IV} = 0^n$** (a random or attacker-controlled $\mathrm{IV}$ lets an attacker cancel changes in $m_1$ by flipping matching $\mathrm{IV}$ bits).

> ### ⚠️ [EXERCISE & UNPROVED FACT ON LECTURE 11 SLIDE 22]
> On Lecture 11 Slide 22, positive CBC-MAC security proofs are **omitted from the slides**:
> - **Fact 1 (Computational AU):** Raw CBC-MAC $h_s$ is a *computationally* almost-universal hash family $\mathcal{H}_{\mathrm{CBC}}$ (labeled **`FACT`**).
> - **Fact 2 (Raw CBC-MAC is FIL UF-CMA):** Explicitly marked **`EXERCISE`** on Slide 22 (*prove raw CBC-MAC itself is a FIL UF-CMA MAC when all messages share a fixed block length $d$*).
> - **Fact 3 (Encrypted CBC-MAC $F(\mathcal{H}_{\mathrm{CBC}})$ is VIL UF-CMA):** Stated on Slide 22 without proof.

Thus, assuming $F$ is a PRF: (1) $\mathcal{H}_{\mathrm{CBC}}$ is computationally AU (no PPT adversary without $s$ finds collisions); (2) raw CBC-MAC $\mathrm{Tag}(s, m) = h_s(m)$ is a PRF and UF-CMA MAC for **fixed** block length $d$; and (3) raw CBC-MAC breaks completely for **Variable Input Length (VIL)** via a **length-extension forgery** (Lecture 11, Slide 23):
1. Choose any $m_1, m_2 \in \{0,1\}^n$.
2. Query $1$-block $m_1$ to get $\tau_1 = F_s(m_1)$, then query $1$-block $m_2 \oplus \tau_1$ to get $\tau_2 = F_s(m_2 \oplus \tau_1)$.
3. Output $m^* = (m_1 \parallel m_2)$ (fresh, since all queries had length $1$) and $\tau^* = \tau_2$: $h_s(m_1 \parallel m_2) = F_s(m_2 \oplus F_s(m_1)) = \tau_2$, forging with probability $1$. *(A $1$-query variant queries only $m_1 \mapsto \tau_1$ and forges $m^* = m_1 \parallel (m_1 \oplus \tau_1)$ with $\tau^* = \tau_1$.)*

**Encrypted CBC-MAC ($F(\mathcal{H}_{\mathrm{CBC}})$)** fixes VIL by adding an **independent** outer key $K \gets \{0,1\}^\lambda$:
$$
\mathrm{Tag}\bigl((K, s), m\bigr) = F_K\bigl(h_s(m)\bigr).
$$
Because the oracle returns $F_K(\tau_1)$ instead of the raw chaining state $\tau_1$, the adversary cannot form $m_2 \oplus \tau_1$. Since $\mathcal{H}_{\mathrm{CBC}}$ is computationally AU for VIL, Encrypted CBC-MAC is both a **VIL PRF** and a **VIL UF-CMA MAC**.

> **Supplementary VIL Alternatives (Not on L11 Slides):**
> - *Length-prepended single-key CBC-MAC:* Prepending $\langle |m| \rangle$ as the first block makes the message space prefix-free and secures raw single-key CBC-MAC for VIL (whereas *appending* length at the end remains vulnerable).
> - *XOR-MAC:* Samples a fresh nonce $\eta \gets \{0,1\}^n$ per tag and outputs $\tau = (\eta,\, F_K(\eta) \oplus h_s(m))$; security requires $\mathcal{H}$ to be **almost-XOR-universal (AXU)**, i.e., $\Pr_s[h_s(m) \oplus h_s(m') = a] \le \varepsilon$ for all $m \neq m'$ and $a \in \{0,1\}^n$.

---

## 2. Authenticated Encryption and CCA Security (Lecture 12)

### 2.1 Beyond Secrecy: Malleability, Secure Channels, and Real-World Attacks

CPA security alone does not prevent ciphertext tampering. In the single-block PRF-OTP scheme $\mathrm{Enc}(K, m) = (r, F_K(r) \oplus m)$ with $\mathrm{Dec}(K, (c_1, c_2)) = F_K(c_1) \oplus c_2$, **every** string in $\{0,1\}^{2n}$ decrypts to a plaintext. Flipping the last bit of $c_2$ yields $\tilde{c} = (c_1, c_2 \oplus 0^{n-1}1)$, which decrypts to $\tilde{m} = m \oplus 0^{n-1}1$ without knowing $m$ or $K$.

This is **malleability**: transforming a ciphertext $c$ for unknown $m$ into $\tilde{c}$ whose decryption $\tilde{m}$ bears a known relation to $m$ (e.g., $m \oplus 0^{n-1}1$, $m + 1$, or $2m$). Malleability breaks protocols in two classic scenarios:
1. **Digital auctions:** An attacker intercepts an encrypted bid $m$ and transforms it into an encryption of $2m$ (e.g., via textbook RSA's multiplicative malleability) or flips its MSB to outbid rivals without decrypting.
2. **Bleichenbacher's TLS attack:** Against RSA PKCS#1 v1.5 padding in early TLS, sending modified ciphertexts $\tilde{c}$ to a server and observing a **single bit** of feedback (valid padding vs. padding error) let an attacker adaptively recover the entire plaintext $m$.

*(Contrast: **Homomorphic encryption** deliberately enables controlled malleability so an untrusted cloud can map an encryption of $m$ to an encryption of $f(m)$; it is mentioned only as motivation and is not studied in depth here.)*

### 2.2 Chosen-Ciphertext Attack (CCA) Security and Why PRF-OTP Fails

Because even 1-bit decryption leakage (as in Bleichenbacher's attack) can be fatal, the standard **CCA** model conservatively grants the adversary a **full decryption oracle** on any ciphertext other than the challenge $c^*$.

**Game $\mathsf{Game}^{\mathrm{cca}}_{\Pi, A}(\lambda, b)$ (Adaptive Chosen-Ciphertext Attack):**
Let $\Pi = (\mathrm{Enc}, \mathrm{Dec})$ have ciphertext space $\mathcal{C}_{\mathrm{ctx}}$ and $b \in \{0,1\}$.
1. $\mathcal{C}$ samples $K \gets \mathcal{K}$.
2. **Phase 1:** $A(1^\lambda)$ adaptively makes polynomial encryption queries $m \mapsto \mathrm{Enc}(K, m)$ and decryption queries $\tilde{c} \mapsto \mathrm{Dec}(K, \tilde{c}) \in \mathcal{M} \cup \{\bot\}$.
3. **Challenge:** $A$ sends equal-length $(m^*_0, m^*_1)$ and receives $c^* \gets \mathrm{Enc}(K, m^*_b)$.
4. **Phase 2:** $A$ continues adaptive `Enc` and `Dec` queries, subject to **$\tilde{c} \neq c^*$** (querying $c^*$ returns $\bot$).
5. $A$ outputs a guess bit $b' \in \{0,1\}$ (the game output).

```text
Adversary A                                   Challenger C (K <- K, bit b)
-----------                                   ----------------------------
   |--- m / c~ (Enc & Dec queries, poly) ---------->|  c <- Enc(K,m) / m~ = Dec(K,c~)
   |<-- c / m~ -------------------------------------|
   |--- (m*_0, m*_1), |m*_0| = |m*_1| ------------->|  c* <- Enc(K, m*_b)
   |<-- c* -----------------------------------------|
   |--- m / c~ != c* (Enc & Dec queries, poly) ---->|  c <- Enc(K,m) / m~ = Dec(K,c~)
   |<-- c / m~ -------------------------------------|
   |--- b' \in {0,1} ------------------------------>|  Game outputs b'
```

**Definition 2.1 (CCA Security).** $\Pi = (\mathrm{Enc}, \mathrm{Dec})$ is **CCA-secure** if for every PPT adversary $A$,
$$
\mathsf{Game}^{\mathrm{cca}}_{\Pi, A}(\lambda, 0) \approx_c \mathsf{Game}^{\mathrm{cca}}_{\Pi, A}(\lambda, 1).
$$

**Exercise (Lecture 12, Slide 6): PRF-OTP is not CCA-secure.**
1. Skip Phase 1; send $m^*_0 = 0^n$, $m^*_1 = 0^{n-1}1$ and receive $c^* = (c^*_1, c^*_2) = (r^*, F_K(r^*) \oplus m^*_b)$.
2. Form $\tilde{c} = (c^*_1,\, c^*_2 \oplus 0^{n-1}1) \neq c^*$ and query $\mathrm{Dec}$ on $\tilde{c}$ to obtain $\tilde{m} = F_K(r^*) \oplus c^*_2 \oplus 0^{n-1}1 = m^*_b \oplus 0^{n-1}1$.
3. Recover $m^*_b = \tilde{m} \oplus 0^{n-1}1$ and output $b' = 0$ if $m^*_b = 0^n$, else $1$. Advantage is $1$.

### 2.3 Decomposing CCA: Secrecy (CPA) Plus Ciphertext Authenticity (AUTH / INT)

To avoid proving CCA directly, we separate **secrecy (CPA)** from **ciphertext authenticity (`AUTH`, also called integrity `INT`)**, requiring decryption to reject invalid ciphertexts:
$$
\mathrm{Dec} : \mathcal{K} \times \mathcal{C}_{\mathrm{ctx}} \to \mathcal{M} \cup \{\bot\},
$$
with correctness $\mathrm{Dec}(K, \mathrm{Enc}(K, m)) = m \neq \bot$.

**Game $\mathsf{Game}^{\mathrm{auth}}_{\Pi, A}(\lambda)$ (Ciphertext Authenticity / Integrity):**
1. $\mathcal{C}$ samples $K \gets \mathcal{K}$ and initializes $C_{\mathrm{list}} = \emptyset$.
2. For $i = 1, \dots, q(\lambda)$, $A(1^\lambda)$ adaptively queries $m_i \in \mathcal{M}$, receives $c_i \gets \mathrm{Enc}(K, m_i)$, and $\mathcal{C}$ adds $c_i$ to $C_{\mathrm{list}}$ (no decryption oracle).
3. $A$ outputs $c^* \in \mathcal{C}_{\mathrm{ctx}}$.
4. The game outputs $1$ iff **(i) Freshness:** $c^* \notin C_{\mathrm{list}}$, and **(ii) Validity:** $\mathrm{Dec}(K, c^*) \neq \bot$.

**Definition 2.2 (AUTH / INT Security).** $\Pi$ satisfies **`AUTH` (`INT`)** if for every PPT adversary $A$, $\Pr[\mathsf{Game}^{\mathrm{auth}}_{\Pi, A}(\lambda) = 1] \le \mathsf{negl}(\lambda)$. An SKE satisfying both **CPA** and **AUTH** is an **Authenticated Encryption (AE)** scheme. (PRF-OTP fails `AUTH` immediately by flipping one bit of $c_{1,2}$.)

**Theorem 2.3 ($\text{CPA} + \text{AUTH} \implies \text{CCA}$).** If $\Pi = (\mathrm{Enc}, \mathrm{Dec})$ is CPA-secure and satisfies `AUTH`, then $\Pi$ is CCA-secure.

> ### 🎯 [GOLDEN EXAM PROOF ADVICE & PRACTICE EXERCISE — Lecture 12 Transcript]
> Although Slides 9–11 sketch a single direct reduction, Venturi gives key **exam proof advice**:
> - **Split two hypotheses into two reductions:** ***"If I would have to prove this thing very formally, I would not do this reduction directly... whenever you want to prove a statement which requires two properties [such as CPA + AUTH], you better go and make two reductions"*** (via the intermediate hybrid $H_\bot$ in the full proof below).
> - **Practice prompt:** ***"I will stop the sketch here and I will let you fill the dots... I invite you to take your pen and write it down once. It's a good example."***

*Remark on the slide alternative (Direct Event-Splitting, L12 Slides 9–11):* One can also split $\Pr[A \text{ wins } \mathsf{Game}^{\mathrm{cca}}] \le \Pr[\mathsf{BAD}] + \Pr[A \text{ wins} \land \overline{\mathsf{BAD}}]$ directly, where $\mathsf{BAD}$ is the event that some fresh decryption query $\tilde{c}_j \neq c^*$ has $\mathrm{Dec}(K, \tilde{c}_j) \neq \bot$. Under $\overline{\mathsf{BAD}}$, a CPA adversary $B_{\mathrm{cpa}}$ simulates decryption by looking up recorded `Enc` pairs $(m_i, c_i)$ and returning $\bot$ on fresh queries, giving $\Pr[A \text{ wins} \land \overline{\mathsf{BAD}}] \le \frac{1}{2} + \varepsilon_{\mathrm{cpa}}(\lambda)$, while `AUTH` bounds $\Pr[\mathsf{BAD}] \le q \cdot \varepsilon_{\mathrm{auth}}(\lambda)$. Below is Venturi's cleaner two-reduction proof.

**Proof of Theorem 2.3 (Two-Reduction Game-Hopping via $H_\bot$).**
For $b \in \{0,1\}$, define $H_\bot(\lambda, b)$ identically to $\mathsf{Game}^{\mathrm{cca}}_{\Pi, A}(\lambda, b)$, except that the decryption oracle is replaced by $\mathrm{Dec}_{\bot}$, which maintains a table of prior encryption query-response pairs $(m_i, c_i)$: on query $\tilde{c}$, if $\tilde{c} = c_i$ for some recorded pair, $\mathrm{Dec}_{\bot}$ returns $m_i$; otherwise (for any fresh $\tilde{c}$), $\mathrm{Dec}_{\bot}$ returns $\bot$ (with $\tilde{c} = c^*$ still forbidden in Phase 2). By SKE correctness, distinct plaintexts cannot share a ciphertext under $K$ (except with negligible error if statistical), so table lookup matches $\mathrm{Dec}(K, c_i)$.

- **Claim 1 ($H_\bot(\lambda, 0) \approx_c H_\bot(\lambda, 1)$):** By **CPA security**. Build PPT adversary $B_{\mathrm{cpa}}$ against $\mathcal{C}_{\mathrm{cpa}}$: $B_{\mathrm{cpa}}$ forwards $A$'s `Enc` queries and challenge $(m^*_0, m^*_1)$ to $\mathcal{C}_{\mathrm{cpa}}$, records $(m_i, c_i)$, answers `Dec` queries via $\mathrm{Dec}_{\bot}$ without knowing $K$, and outputs $A$'s guess $b'$. Since $B_{\mathrm{cpa}}$ simulates $H_\bot(\lambda, b)$ identically, $\bigl|\Pr[H_\bot(\lambda, 0) = 1] - \Pr[H_\bot(\lambda, 1) = 1]\bigr| \le \mathsf{negl}(\lambda)$.
- **Claim 2 ($\mathsf{Game}^{\mathrm{cca}}_{\Pi, A}(\lambda, b) \approx_c H_\bot(\lambda, b)$ for each $b \in \{0,1\}$):** By **`AUTH`**. Fix $b \in \{0,1\}$ and suppose $A$ makes at most $q = \mathsf{poly}(\lambda)$ decryption queries. Let $\mathsf{BAD}$ be the event in $H_\bot(\lambda, b)$ that $A$ submits a fresh decryption query $\tilde{c}$ with $\mathrm{Dec}(K, \tilde{c}) \neq \bot$, and let $j_0$ be the index of the *first* such query. Prior to $j_0$, $\mathrm{Dec}$ and $\mathrm{Dec}_{\bot}$ agree on every query, so
  $$
  \bigl|\Pr[\mathsf{Game}^{\mathrm{cca}}_{\Pi, A}(\lambda, b) = 1] - \Pr[H_\bot(\lambda, b) = 1]\bigr| \le \Pr_{H_\bot(\lambda, b)}[\mathsf{BAD}].
  $$
  To bound $\Pr_{H_\bot(\lambda, b)}[\mathsf{BAD}]$, construct a PPT adversary $B_{\mathrm{auth}}$ against $\mathsf{Game}^{\mathrm{auth}}_{\Pi, B_{\mathrm{auth}}}(\lambda)$:
  1. $B_{\mathrm{auth}}$ samples $j^* \gets \{1, \dots, q\}$ uniformly at random.
  2. $B_{\mathrm{auth}}$ simulates $H_\bot(\lambda, b)$ for $A$: forwarding `Enc` queries $m_i$ (and $m^*_b$ at the challenge) to $\mathcal{C}_{\mathrm{auth}}$'s `Enc` oracle, recording $(m_i, c_i)$, and answering `Dec` queries with $\mathrm{Dec}_{\bot}$—except at the **$j^*$-th decryption query $\tilde{c}_{j^*}$**, where $B_{\mathrm{auth}}$ immediately halts $A$ and outputs $\tilde{c}_{j^*}$ as its forgery to $\mathcal{C}_{\mathrm{auth}}$ (aborting if $A$ stops early).

  Halting immediately at $j^*$ ensures that if $j^*$ is in Phase 1, $m^*_b$ was never queried to `Enc` (so $c^* \notin C_{\mathrm{list}}$), and if $j^*$ is in Phase 2, $\tilde{c}_{j^*} \neq c^*$. Thus any fresh $\tilde{c}_{j^*}$ in $H_\bot$ is strictly outside $C_{\mathrm{list}}$. Since $j^*$ is independent of $A$'s execution up to $j_0$, whenever $\mathsf{BAD}$ occurs we have $j^* = j_0$ with probability $1/q$, yielding
  $$
  \Pr\bigl[\mathsf{Game}^{\mathrm{auth}}_{\Pi, B_{\mathrm{auth}}}(\lambda) = 1\bigr] \ge \frac{1}{q}\,\Pr_{H_\bot(\lambda, b)}[\mathsf{BAD}] \implies \Pr_{H_\bot(\lambda, b)}[\mathsf{BAD}] \le q \cdot \mathsf{negl}(\lambda) = \mathsf{negl}(\lambda).
  $$

Applying the triangle inequality across Claim 2 ($b=0$), Claim 1, and Claim 2 ($b=1$) yields $\mathsf{Game}^{\mathrm{cca}}_{\Pi, A}(\lambda, 0) \approx_c \mathsf{Game}^{\mathrm{cca}}_{\Pi, A}(\lambda, 1)$. $\quad \square$

*(Converse remark: CCA trivially implies CPA, but does not strictly imply `AUTH`—a scheme could decrypt every malformed ciphertext to a fixed dummy $0^n$ instead of $\bot$ without leaking $m^*_b$.)*

### 2.4 Generic Compositions of Encryption and MAC: E&M, MtE, and EtM

Given any CPA-secure SKE $\Pi_1 = (\mathrm{Enc}_1, \mathrm{Dec}_1)$ and UF-CMA MAC $\Pi_2 = (\mathrm{Tag}, \mathrm{Vrfy})$ with independent keys $(K_1, K_2) \gets \mathcal{K}_1 \times \mathcal{K}_2$, there are three black-box combinations:

#### Option A: Encrypt-and-MAC (E&M) — Insecure in General
$$
\mathrm{Enc}'\bigl((K_1, K_2), m\bigr) = (c, \tau), \quad c \gets \mathrm{Enc}_1(K_1, m),\; \tau = \mathrm{Tag}(K_2, m).
$$
Decryption checks $\mathrm{Vrfy}(K_2, \mathrm{Dec}_1(K_1, c), \tau) = 1$ (returning $\bot$ if $\mathrm{Dec}_1$ returns $\bot$ or verification fails).

**Why E&M fails generically:** UF-CMA does not guarantee secrecy of the tag. Defining $\mathrm{Tag}'(K_2, m) = m[0] \parallel \mathrm{Tag}(K_2, m)$ (verifying both $m[0]$ and $\mathrm{Tag}$) preserves UF-CMA, yet E&M leaks $m[0]$ in the clear, breaking even **CPA** (and any deterministic MAC breaks CPA on repeated plaintexts). *(SSH uses E&M with HMAC, relying on HMAC being a PRF rather than generic UF-CMA.)*

#### Option B: MAC-then-Encrypt (MtE) — Insecure in General
$$
\mathrm{Enc}'\bigl((K_1, K_2), m\bigr) = c \gets \mathrm{Enc}_1\bigl(K_1,\, m \parallel \tau\bigr), \quad \tau = \mathrm{Tag}(K_2, m).
$$
Decryption runs $\mathrm{Dec}_1(K_1, c)$, parses $m \parallel \tau$, and returns $m$ if $\mathrm{Vrfy}(K_2, m, \tau) = 1$, else $\bot$. TLS 1.2 used MtE with bespoke CBC+HMAC proofs and suffered padding-oracle attacks; TLS 1.3 removed MtE completely.

> ### 📝 [ASSIGNED EXERCISE & OUT-OF-SCOPE PROOF — Lectures 12 & 13 Transcripts + Slide 13]
> - **TLS 1.2 bespoke MtE proof:** *Not covered* (*"they actually proved this in a complicated way... we will not bother studying this too much"*).
> - **Assigned Exercise (`Slide 13 & Lecture 12 Transcript`):** Breaking MtE in general is left as an exercise (*"Exercise: Break it! / I leave it as an exercise"*); the counterexample $\widehat{\Pi}_1$ appears below.

**Exercise (Lecture 12, Slide 13 & Transcript): Break MtE in general.**
Modify any CPA-secure $\Pi_1$ into $\widehat{\Pi}_1 = (\widehat{\mathrm{Enc}}_1, \widehat{\mathrm{Dec}}_1)$ by appending an ignored bit:
$$
\widehat{\mathrm{Enc}}_1(K_1, x) = \bigl(\mathrm{Enc}_1(K_1, x),\, 0\bigr), \qquad \widehat{\mathrm{Dec}}_1\bigl(K_1, (c_0, b)\bigr) = \mathrm{Dec}_1(K_1, c_0).
$$
$\widehat{\Pi}_1$ remains CPA-secure, yet MtE with $\widehat{\Pi}_1$ and *any* MAC $\Pi_2$ fails both `CCA` and `AUTH` with probability $1$:
1. **Breaking `CCA`:** Given challenge $c^* = (c_0, 0)$ (where $c_0 \gets \mathrm{Enc}_1(K_1, m^*_b \parallel \tau^*)$), query $\mathrm{Dec}'$ on $\tilde{c} = (c_0, 1) \neq c^*$. Since $\widehat{\mathrm{Dec}}_1(K_1, (c_0, 1)) = m^*_b \parallel \tau^*$ and $\tau^*$ still verifies, $\mathrm{Dec}'$ returns $m^*_b$.
2. **Breaking `AUTH`:** Query $m_1 \mapsto (c_0, 0)$ and output fresh $\tilde{c} = (c_0, 1)$; $\mathrm{Dec}'(K', \tilde{c}) = m_1 \neq \bot$.

Whenever $\Pi_1$ lets an attacker mutate a ciphertext without changing its plaintext, MtE breaks without ever forging a MAC tag.

#### Option C: Encrypt-then-MAC (EtM) — The Right Generic Way
$$
c \gets \mathrm{Enc}_1(K_1, m), \qquad \tau \gets \mathrm{Tag}(K_2, c), \qquad c' = (c, \tau).
$$
Tagging the *ciphertext* $c$ prevents tag leakage about $m$ and blocks ciphertext mutations (standard in **TLS 1.3**).

| Composition | Encryption Output $c'$ | CPA-Secure? | AUTH / CCA-Secure in General? | Real-World Note |
| :--- | :--- | :--- | :--- | :--- |
| **Encrypt-and-MAC (E&M)** | $(\mathrm{Enc}_1(K_1, m),\, \mathrm{Tag}(K_2, m))$ | Not always (MAC can leak $m$) | No | SSH uses HMAC (PRF) variant with bespoke analysis |
| **MAC-then-Encrypt (MtE)** | $\mathrm{Enc}_1(K_1,\, m \parallel \mathrm{Tag}(K_2, m))$ | Yes (if $\Pi_1$ is CPA) | No (fails for re-randomizable $\Pi_1$ / padding leaks) | TLS 1.2 (legacy; removed in TLS 1.3) |
| **Encrypt-then-MAC (EtM)** | $(c, \mathrm{Tag}(K_2, c))$ with $c \gets \mathrm{Enc}_1(K_1, m)$ | Yes | **Yes** (with Strong UF-CMA or unique-tag MAC) | **TLS 1.3** standard paradigm |

---

## 3. Encrypt-then-MAC Proof and Collision-Resistant Hash Functions (Lecture 13)

### 3.1 Full Security Proof of Encrypt-then-MAC

Given SKE $\Pi_1 = (\mathrm{Enc}_1, \mathrm{Dec}_1)$ over $\mathcal{K}_1$ and MAC $\Pi_2 = (\mathrm{Tag}, \mathrm{Vrfy})$ over $\mathcal{K}_2$, define **EtM** $\Pi' = (\mathrm{Enc}', \mathrm{Dec}')$ over $\mathcal{K}' = \mathcal{K}_1 \times \mathcal{K}_2$:
- **Key generation:** Sample independent $(K_1, K_2) \gets \mathcal{K}_1 \times \mathcal{K}_2$.
- **$\mathrm{Enc}'((K_1, K_2), m)$:** Compute $c \gets \mathrm{Enc}_1(K_1, m)$, $\tau \gets \mathrm{Tag}(K_2, c)$, and output $c' = (c, \tau)$.
- **$\mathrm{Dec}'((K_1, K_2), (c, \tau))$:** **Verify-then-decrypt**: if $\mathrm{Vrfy}(K_2, c, \tau) = 0$ (canonically $\mathrm{Tag}(K_2, c) \neq \tau$), output $\bot$; else output $\mathrm{Dec}_1(K_1, c)$. (Never invoking $\mathrm{Dec}_1$ on unverified ciphertexts prevents padding/decryption side channels.)

By Theorem 2.3, it suffices to prove CPA security and `AUTH`.

#### Step 1: $\Pi'$ Satisfies CPA Security

**Claim 3.1.** If $\Pi_1$ is CPA-secure, then $\Pi'$ is CPA-secure (for *any* MAC $\Pi_2$).

*Proof.* Given a PPT adversary $A'_{\mathrm{cpa}}$ against $\Pi'$, build a PPT adversary $B_1$ against $\Pi_1$'s challenger $\mathcal{C}_1$ (holding $K_1, b$):
1. $B_1$ samples an independent MAC key $K_2 \gets \mathcal{K}_2$.
2. For each encryption query $m$ (and challenge $(m^*_0, m^*_1)$) from $A'_{\mathrm{cpa}}$, $B_1$ forwards it to $\mathcal{C}_1$ to get $c$ (or $c^*$), computes $\tau \gets \mathrm{Tag}(K_2, c)$ locally, and returns $(c, \tau)$ to $A'_{\mathrm{cpa}}$.
3. $B_1$ outputs $A'_{\mathrm{cpa}}$'s guess $b'$.

Because $K_1$ and $K_2$ are independent, $B_1$ simulates $\mathsf{Game}^{\mathrm{cpa}}_{\Pi', A'_{\mathrm{cpa}}}(\lambda, b)$ identically for $b \in \{0,1\}$, preserving $A'_{\mathrm{cpa}}$'s advantage. $\quad \square$

**Key Separation ("One Key, One Primitive"):** Independent keys $(K_1, K_2)$ are essential—reusing $K_1 = K_2$ would prevent $B_1$ from computing $\mathrm{Tag}(K_1, c)$ and risks cross-primitive algebraic interactions. From a single master key $K$, derive $(K_1, K_2) = G(K)$ via a PRG/KDF.

#### Step 2: $\Pi'$ Satisfies AUTH — Why Weak UF-CMA Fails and How to Fix It

Suppose a PPT adversary $A'_{\mathrm{auth}}$ wins $\mathsf{Game}^{\mathrm{auth}}_{\Pi', A'_{\mathrm{auth}}}(\lambda)$. Attempt to build a PPT reduction $B_2$ against MAC challenger $\mathcal{C}_2$ (holding $K_2$):
1. $B_2$ samples an independent encryption key $K_1 \gets \mathcal{K}_1$.
2. On encryption query $m_i$ from $A'_{\mathrm{auth}}$, $B_2$ computes $c_i \gets \mathrm{Enc}_1(K_1, m_i)$ locally, queries $c_i$ to $\mathcal{C}_2$ for $\tau_i \gets \mathrm{Tag}(K_2, c_i)$, and returns $(c_i, \tau_i)$.
3. When $A'_{\mathrm{auth}}$ outputs $c'^* = (c^*, \tau^*)$, $B_2$ forwards $(c^*, \tau^*)$ to $\mathcal{C}_2$.

**Where Weak UF-CMA fails (Lecture 13, Slide 4):** Winning $\mathsf{Game}^{\mathrm{auth}}_{\Pi'}$ guarantees $\mathrm{Vrfy}(K_2, c^*, \tau^*) = 1$ and $(c^*, \tau^*) \notin \{(c_1, \tau_1), \dots, (c_q, \tau_q)\}$, which does **not** force $c^* \notin \{c_1, \dots, c_q\}$! $A'_{\mathrm{auth}}$ could reuse $c^* = c_i$ with a modified valid tag $\tau^* \neq \tau_i$, causing the Weak UF-CMA challenger to reject $B_2$.

Indeed, EtM with a Weak-but-not-Strong MAC is **false** in general: instantiate $\Pi_2$ with $\mathrm{Tag}'(K_2, c) = 0 \parallel \mathrm{Tag}(K_2, c)$ from Section 1.2 (where $\mathrm{Vrfy}'$ ignores the leading bit). Querying $m_1 \mapsto (c_1, 0 \parallel \tau_1)$ and outputting $c'^* = (c_1, 1 \parallel \tau_1)$ gives a fresh ciphertext accepted by $\mathrm{Dec}'$, breaking `AUTH` (and flipping the tag bit of $c^*$ in $\mathsf{Game}^{\mathrm{cca}}$ breaks `CCA`) with probability $1$.

**The Two Fixes (Lecture 13, Slides 4–5):**
1. **$\Pi_2$ is Strong UF-CMA:** $B_2$'s winning condition $(c^*, \tau^*) \notin \{(c_i, \tau_i)\}$ matches $A'_{\mathrm{auth}}$'s freshness condition verbatim.
2. **$\Pi_2$ is Weak UF-CMA with unique tags:** Unique tags plus $\mathrm{Vrfy}(K_2, c^*, \tau^*) = 1$ make $c^* = c_i \implies \tau^* = \tau_i$, contradicting $(c^*, \tau^*) \notin \{(c_i, \tau_i)\}$, so $c^* \notin \{c_i\}$ automatically holds.

Practical deterministic MACs (PRF-MAC, Encrypted CBC-MAC, HMAC) have unique tags and satisfy both.

> ### 📝 [OUT-OF-SCOPE TOPICS NOTED IN LECTURE 13 — Transcript Lines 37 & 77]
> - **Key agility (single-key reuse across Enc and MAC):** Follow **"One key, one thing"** (independent $(K_1, K_2)$ or PRG-derived subkeys); proving *key agility* is explicitly **out of scope** (*"this is not something we're going to study in this course"*).
> - **Randomized MACs:** Only deterministic MACs are studied in depth (*"can be randomized, although we're not going to study this, of course"*).

**Theorem 3.2 (Security of Encrypt-then-MAC).** If $\Pi_1$ is a CPA-secure SKE and $\Pi_2$ is either **Strong UF-CMA** or **Weak UF-CMA with unique tags**, then EtM $\Pi'$ satisfies CPA and `AUTH`, and hence by Theorem 2.3 is **CCA-secure**.

### 3.2 Taxonomy of Symmetric-Key Cryptography

Theorem 3.2 completes the symmetric-key stack in **Minicrypt** (built theoretically from any OWF, and practically from AES):
$$
\text{OWF} \xrightarrow{\text{theory}} \text{PRG} \xrightarrow{\text{GGM}} \text{PRF} \xrightarrow{\text{Feistel / practice: AES}} \text{PRP}
$$
From a PRF (plus unconditional AU hashing), we obtain **CPA-secure SKE** (CTR, CBC, CFB, OFB), **UF-CMA MACs** with unique tags (PRF-MAC, Encrypted CBC-MAC), and **CCA-secure Authenticated Encryption** (`CPA + AUTH`) via **Encrypt-then-MAC**. Protocols like **TLS 1.3** use public-key cryptography to agree on a session key and symmetric EtM thereafter.

---

### 3.3 Collision-Resistant Hash Functions: Definitions, Context, and Public Seeds

**Collision-Resistant Hash Functions (CRHs)** require **no secret key**—anyone can evaluate them publicly—and are black-box separated from OWFs, placing them at the boundary of **Cryptomania**. Theoretically they come from algebraic/lattice assumptions; practically they combine heuristic compression functions with provable domain extension.

#### Hash Functions vs. Compression Functions
A hash function maps variable-length strings to short fixed digests, $H : \{0,1\}^* \to \{0,1\}^n$ (typically $n \in \{128, 256, 512\}$, e.g., SHA-256). A **compression function** maps fixed-length inputs of size $N \gg n$ (standardly $N = 2n$) to $n$ bits: $\mathsf{cmps} : \{0,1\}^{2n} \to \{0,1\}^n$.

Both AU hashes (Lecture 11) and CRHs compress inputs, so collisions exist by pigeonhole. The distinction is **seed secrecy**: in an AU hash, $s$ is **secret** and chosen *after* $(x, x')$ are fixed; in a CRH, $s$ is **public** and given to the adversary *before* it searches for any colliding pair $(x, x')$ (an unbounded adversary can always find collisions in $\approx 2^{n/2}$ evaluations).

#### Practical Hash Functions: MD5, SHA-1, SHA-2, and SHA-3
Collisions break signatures and PKI/TLS certificates (e.g., transferring a CA signature from a benign certificate to a colliding rogue one):
- **MD5** and **SHA-1** use Merkle–Damgård with heuristic compression functions; **both are broken** with practical collision attacks.
- **SHA-2** (e.g., SHA-256 in Bitcoin) also uses Merkle–Damgård with a stronger compression function and remains unbroken.
- **SHA-3 (Keccak)** was standardized by NIST as a structural hedge against Merkle–Damgård attacks using the **sponge** paradigm (mentioned for context only; Venturi notes its proof is not covered).

#### Formal Definition and Why a Public Seed $s$ Is Necessary

**Game $\mathsf{Game}^{\mathrm{cr}}_{\mathcal{H}, A}(\lambda)$ (Collision Resistance):**
For an efficiently computable family $\mathcal{H} = \{H_s : \{0,1\}^* \to \{0,1\}^n\}_{s \in \{0,1\}^\lambda}$ (or fixed-domain $\{0,1\}^N \to \{0,1\}^n$):
1. $\mathcal{C}$ samples a **public** seed $s \gets \{0,1\}^\lambda$ and sends $s$ to $A$.
2. $A(1^\lambda, s)$ outputs $(x, x')$.
3. The game outputs $1$ iff $x \neq x'$ and $H_s(x) = H_s(x')$.

**Definition 3.3 (Collision-Resistant Hash Family).** $\mathcal{H}$ is **collision-resistant (CR)** if for every PPT adversary $A$,
$$
\Pr\bigl[\mathsf{Game}^{\mathrm{cr}}_{\mathcal{H}, A}(\lambda) = 1\bigr] \le \mathsf{negl}(\lambda).
$$

**Why a public seed $s$ is required (Lecture 13, Slide 8):** For a *single unkeyed* compressing function $H$, collisions $(x_0, x'_0)$ mathematically exist, so a constant-time PPT algorithm $A_{x_0, x'_0}$ with $(x_0, x'_0)$ **hardwired** exists and outputs a collision immediately—falsifying "$\forall$ PPT $A$, $A$ fails"! Sampling $s \gets \{0,1\}^\lambda$ *after* fixing the PPT machine $A$ reverses the **quantifier order**: a fixed poly-time algorithm $A$ can hardwire collisions for at most polynomially many of the $2^\lambda$ seeds, a negligible fraction.

### 3.4 Merkle Trees and Fixed-Length Merkle–Damgård Domain Extension

The two-step CRH blueprint first builds a CR compression function $\mathsf{cmps}_s : \{0,1\}^{2n} \to \{0,1\}^n$ (Step 1), then extends its domain while preserving CR (Step 2) via **Merkle trees** or **Merkle–Damgård**.

#### Merkle Trees (Parallelism and Logarithmic Inclusion Proofs)
Given $d$ blocks $x_1, \dots, x_d \in \{0,1\}^n$, a **Merkle tree** evaluates $\mathsf{cmps}_s$ pairwise bottom-up from the leaves to a single $n$-bit root $y = H_s(x)$:

```text
                y = H_s(x)
                    |
                [cmps_s]
               /        \
          [cmps_s]     [cmps_s]
          /     \      /     \
        x_1     x_2  x_3     x_4
```

Merkle trees provide: (1) **parallelism** across nodes at each level, and (2) **$O(\log d)$-size inclusion proofs** (e.g., Bitcoin light clients): proving $x_1$ is in the block with root $y$ requires sending only $x_1$ and its $O(\log d)$ **sibling hashes** along the root-to-leaf path (here $x_2$ and $\mathsf{cmps}_s(x_3, x_4)$). Collision resistance of $\mathsf{cmps}_s$ ensures **path binding** (no fabricated $x'_1$ can verify against $y$ without a collision along the path).

> ### ⚠️ [OMITTED & DEFERRED IN LECTURE 13 — Transcript Lines 171, 197, 203, 243–245]
> - **Formal Merkle inclusion-proof protocol:** **Out of scope** (*"I'm not going to formalize this, okay, because we are not going to study this kind of proof in this course"*).
> - **Merkle-tree CR proof:** **Omitted in lecture** because it mirrors the fixed-length MD backward-scan proof (*"we are not going to prove the security of the Merkle tree, but actually the proof is actually the same"*).
> - **Step 1 compression functions & Step 2 VIL Strengthened MD:** Only fixed-length ($d$ blocks) MD is proved in Lecture 13; **variable-input-length Strengthened Merkle–Damgård** (and the unpadded VIL MD counterexample) plus compression-function constructions are **deferred to Part V** (*"not go much into the details... mostly theoretical"*, *"I'm gonna prove in the next lecture"*).

#### The Fixed-Length Merkle–Damgård (MD) Transform
For $d$ blocks $x = (x_1, \dots, x_d) \in (\{0,1\}^n)^d$, set $y_0 = 0^n$, compute $y_i = \mathsf{cmps}_s(x_i, y_{i-1})$ for $i = 1, \dots, d$, and output $H_s(x) = y_d \in \{0,1\}^n$:

```text
0^n = y_0 ---> [cmps_s] --- y_1 ---> [cmps_s] --- ... ---> [cmps_s] ---> y_d = H_s(x)
                  ^                     ^                     ^
                 x_1                   x_2                   x_d
```

**Theorem 3.4 (Fixed-Length Merkle–Damgård Collision Resistance).** If $\{\mathsf{cmps}_s : \{0,1\}^{2n} \to \{0,1\}^n\}_{s \in \{0,1\}^\lambda}$ is CR, then for any **fixed** $d = d(\lambda) \in \mathsf{poly}(\lambda)$, $\mathcal{H}_{\mathrm{MD}} = \{H_s : \{0,1\}^{n \cdot d} \to \{0,1\}^n\}_{s \in \{0,1\}^\lambda}$ is CR.

**Proof.** Given a PPT adversary $A'$ breaking $\mathcal{H}_{\mathrm{MD}}$, build a PPT reduction $B$ against $\mathsf{cmps}$:
1. $B(1^\lambda, s)$ receives $s \gets \{0,1\}^\lambda$ from $\mathcal{C}_{\mathrm{cmps}}$ and forwards $s$ to $A'$.
2. $A'$ outputs $x = (x_1, \dots, x_d)$ and $x' = (x'_1, \dots, x'_d)$ in $(\{0,1\}^n)^d$.
3. Whenever $x \neq x'$ and $H_s(x) = H_s(x')$, $B$ computes $y_0 = y'_0 = 0^n$, $y_i = \mathsf{cmps}_s(x_i, y_{i-1})$, and $y'_i = \mathsf{cmps}_s(x'_i, y'_{i-1})$ for $1 \le i \le d$.
4. **Backward largest-index scan:** $B$ finds the **largest index $j \in \{1, \dots, d\}$** such that $(x_j, y_{j-1}) \neq (x'_j, y'_{j-1})$, and outputs $\bigl((x_j, y_{j-1}),\, (x'_j, y'_{j-1})\bigr)$ to $\mathcal{C}_{\mathrm{cmps}}$.

Verification whenever $A'$ succeeds:
- **Existence of $j$:** If $(x_i, y_{i-1}) = (x'_i, y'_{i-1})$ for all $i \in \{1, \dots, d\}$, then $x_i = x'_i$ for all $i$, contradicting $x \neq x'$. Thus such a largest $j$ exists.
- **Collision at step $j$:** Since $y_d = H_s(x) = H_s(x') = y'_d$:
  - if $j = d$, then $\mathsf{cmps}_s(x_d, y_{d-1}) = y_d = y'_d = \mathsf{cmps}_s(x'_d, y'_{d-1})$;
  - if $j < d$, maximality of $j$ forces $(x_{j+1}, y_j) = (x'_{j+1}, y'_j)$, so $y_j = y'_j$ and hence $\mathsf{cmps}_s(x_j, y_{j-1}) = y_j = y'_j = \mathsf{cmps}_s(x'_j, y'_{j-1})$.

In both cases $B$ outputs a valid collision for $\mathsf{cmps}_s$ in polynomial time with the same probability as $A'$. $\quad \square$

*(Why compare the full pair $(x_j, y_{j-1})$ rather than just $y_{j-1} \neq y'_{j-1}$? Two chains can agree on $y_{j-1} = y'_{j-1}$—always true at $y_0 = y'_0 = 0^n$—while differing on $x_j \neq x'_j$; checking the full $2n$-bit input pair handles both cases uniformly.)*

*(Note for Part V: Unpadded MD fails for variable lengths—e.g., if $\mathsf{cmps}_s(0^n, 0^n) = 0^n$, prepending $0^n$ blocks creates collisions. Part V covers **Strengthened MD** with a length-encoding final block, **Davies–Meyer** in the **Ideal Cipher Model**, and the **Random Oracle Model / HMAC**.)*

---
