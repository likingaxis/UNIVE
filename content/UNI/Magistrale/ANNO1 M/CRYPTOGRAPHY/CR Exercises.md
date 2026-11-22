## Exercise: Uniform Ciphertexts vs. Perfect Secrecy
![[Pasted image 20261122164544.png|640]]

Consider a symmetric-key encryption scheme $\Pi = (\operatorname{Gen}, \operatorname{Enc}, \operatorname{Dec})$ over finite spaces $(\mathcal{K}, \mathcal{M}, \mathcal{C})$.
Let $M$ be a random variable over the message space $\mathcal{M}$, and let $C = \operatorname{Enc}(K, M)$, where the secret key $K$ is sampled uniformly over $\mathcal{K}$ and independently of $M$.

**Prove or refute:** an encryption scheme $\Pi$ is perfectly secret if and only if, for every probability distribution of $M$, its ciphertexts are uniformly distributed over $\mathcal{C}$:
$$\boxed{\text{Perfect Secrecy} \iff \forall M,\ \forall c_0,c_1\in\mathcal C:\ \Pr[C=c_0]=\Pr[C=c_1]}$$

**Verdict:** the statement is **false** (refuted).
To establish an equivalence (`if and only if`), both implications must hold; to refute it, showing that one implication fails is sufficient.

![[CR_EX_uniform_vs_ps.svg|640]]

### Distinguishing the two properties
Before proving or refuting each direction, notice that the two conditions compare different probabilities:
- **Perfect secrecy (Theorem 1.1(iii)):** compares the probability of obtaining the **same ciphertext $c$ from two different plaintexts $m_0, m_1$**:
$$\forall m_0,m_1\in\mathcal M,\ \forall c\in\mathcal C:\qquad \boxed{\Pr_K[\operatorname{Enc}(K,m_0)=c] = \Pr_K[\operatorname{Enc}(K,m_1)=c]}$$
- **Uniform ciphertext distribution:** compares the probabilities of obtaining **two different ciphertexts $c_0, c_1$ under the same message distribution $M$**:
$$\forall c_0,c_1\in\mathcal C:\qquad \boxed{\Pr[C=c_0]=\Pr[C=c_1]}$$

### Part 1: Uniform ciphertexts for every $M$ $\implies$ Perfect secrecy (True)
**Claim:**
$$\boxed{\text{Uniform ciphertexts for every }M \implies \text{Perfect secrecy}}$$

**Proof.**
Assume that the ciphertext distribution is uniform over $\mathcal{C}$ for every probability distribution of $M$.
Since $\mathcal{C}$ is finite, this means:
$$\forall M,\ \forall c\in\mathcal C:\quad \Pr[C=c]=\frac{1}{|\mathcal C|}$$
We prove perfect secrecy using **Theorem 1.1(iii)**.

**Step 1 — Point-mass distribution on $m_0$.**
Choose an arbitrary message $m_0\in\mathcal{M}$ and consider the degenerate distribution concentrated on $m_0$:
$$\Pr[M=m_0]=1$$
In this case, the encryption algorithm always encrypts $m_0$, so $C = \operatorname{Enc}(K, m_0)$.
Because uniformity is assumed to hold for **every** message distribution, it also holds for this one:
$$\boxed{\Pr_K[\operatorname{Enc}(K,m_0)=c] = \frac{1}{|\mathcal C|}}$$
for every $c\in\mathcal{C}$.

**Step 2 — Point-mass distribution on $m_1$.**
Now choose any other message $m_1\in\mathcal{M}$ and consider $\Pr[M=m_1]=1$.
Applying the same uniformity assumption gives:
$$\boxed{\Pr_K[\operatorname{Enc}(K,m_1)=c] = \frac{1}{|\mathcal C|}}$$
for every $c\in\mathcal{C}$.

**Step 3 — Compare the two probabilities.**
From Steps 1 and 2:
$$\begin{aligned} \Pr_K[\operatorname{Enc}(K,m_0)=c] &= \frac{1}{|\mathcal C|}\\ &= \Pr_K[\operatorname{Enc}(K,m_1)=c] \end{aligned}$$
Since $m_0, m_1$, and $c$ were arbitrary, this matches **Theorem 1.1(iii)**.
Therefore:
$$\boxed{\text{Uniform ciphertexts for every }M \implies \text{Perfect secrecy}}\qquad\square$$

> [!tip]- Key logical idea
> The hypothesis holds for **every** distribution of $M$.
> We exploit that universal quantifier by choosing two point-mass distributions concentrated on $m_0$ and $m_1$: both must induce the exact same uniform ciphertext distribution over $\mathcal{C}$.

### Part 2: Perfect secrecy $\nRightarrow$ Uniform ciphertexts (Counterexample)
We now test the reverse direction:
$$\boxed{\text{Perfect secrecy} \stackrel{?}{\implies} \text{Uniform ciphertexts}}$$
To disprove this implication, we construct a valid encryption scheme $\Pi' = (\operatorname{Enc}', \operatorname{Dec}')$ that satisfies three requirements:
1. It satisfies **correctness**.
2. It satisfies **perfect secrecy**.
3. Its ciphertexts are **not** uniformly distributed over its ciphertext space $\mathcal{C}'$.

#### Step 1 — Counterexample intuition
Start from the One-Time Pad (OTP), $\operatorname{Enc}(k,m) = k \oplus m$, which we already know is perfectly secret.
Our goal is to break uniformity over the ciphertext space without leaking any information about $m$.

> [!warning]- Why simply remapping a ciphertext fails
> A tempting first idea is to replace one ciphertext value, such as $0^n$, with $1^n$ while leaving all other ciphertexts unchanged.
> However, for a fixed key $k$, both $m=k$ and $m'=k\oplus 1^n$ would then encrypt to $1^n$, making unique decryption impossible and violating correctness.

Instead of colliding two ciphertexts, we **extend the ciphertext space by appending a fixed bit** `0`.
This preserves all original ciphertext bits (keeping decryption intact) while making half of the extended ciphertext space unreachable.

#### Step 2 — Define the modified OTP
Let $n \ge 1$ and define:
$$\mathcal M = \{0,1\}^n, \qquad \mathcal K = \{0,1\}^n, \qquad \mathcal C' = \{0,1\}^{n+1}$$
The secret key is sampled uniformly as $K \gets U_n$.
Define encryption and decryption (where $\parallel$ denotes concatenation) as:
$$\boxed{\operatorname{Enc}'(k,m) = (k\oplus m)\parallel 0}$$
$$\boxed{\operatorname{Dec}'(k, x\parallel b) = k\oplus x} \qquad (x\in\{0,1\}^n,\ b\in\{0,1\})$$
Every ciphertext consists of the standard OTP ciphertext followed by a fixed `0` bit, and decryption discards the trailing bit $b$ before applying OTP decryption to $x$.

#### Step 3 — Prove correctness
For every $m\in\mathcal{M}$ and $k\in\mathcal{K}$:
$$\begin{aligned} \operatorname{Dec}'(k, \operatorname{Enc}'(k,m)) &= \operatorname{Dec}'(k, (k\oplus m)\parallel 0)\\ &= k\oplus (k\oplus m)\\ &= (k\oplus k)\oplus m\\ &= 0^n\oplus m = m \end{aligned}$$
Because appending `0` discards no message information, $\Pi'$ satisfies **correctness**. $\square$

#### Step 4 — Prove perfect secrecy
We verify **Theorem 1.1(iii)** for arbitrary messages $m_0,m_1\in\mathcal{M}$ and arbitrary ciphertext $c'\in\mathcal{C}'=\{0,1\}^{n+1}$.
Every $(n+1)$-bit ciphertext $c'$ falls into one of two cases:

- **Case A ($c' = x\parallel 0$ for some $x\in\{0,1\}^n$):** for any fixed message $m\in\mathcal{M}$,
$$\begin{aligned} \Pr_K[\operatorname{Enc}'(K,m) = x\parallel 0] &= \Pr_K[K\oplus m = x]\\ &= \Pr_K[K = x\oplus m]\\ &= 2^{-n} \end{aligned}$$
since $K$ is uniformly distributed over $\{0,1\}^n$ and $x\oplus m$ is a unique key.
- **Case B ($c' = x\parallel 1$ for some $x\in\{0,1\}^n$):** since $\operatorname{Enc}'$ always appends `0`, no key can ever output $x\parallel 1$:
$$\Pr_K[\operatorname{Enc}'(K,m) = x\parallel 1] = 0$$

Combining both cases, for every $m\in\mathcal{M}$ and $c'\in\mathcal{C}'$:
$$\Pr_K[\operatorname{Enc}'(K,m)=c'] = \begin{cases} 2^{-n} & \text{if } c'=x\parallel 0 \\ 0 & \text{if } c'=x\parallel 1 \end{cases}$$
In both cases, the probability does not depend on $m$.
Consequently, for all $m_0, m_1\in\mathcal{M}$ and all $c'\in\mathcal{C}'$:
$$\boxed{\Pr_K[\operatorname{Enc}'(K,m_0)=c'] = \Pr_K[\operatorname{Enc}'(K,m_1)=c']}$$
By **Theorem 1.1(iii)**, $\Pi'$ is **perfectly secret**. $\square$

#### Step 5 — Disprove uniformity
Choose any $x\in\{0,1\}^n$ and compare the two ciphertexts $c_0 = x\parallel 0$ and $c_1 = x\parallel 1$ in $\mathcal{C}'=\{0,1\}^{n+1}$.
For **any** distribution of $M$, the law of total probability gives:
$$\Pr[C=c_0] = \sum_{m\in\mathcal{M}} \Pr_K[\operatorname{Enc}'(K,m)=x\parallel 0]\Pr[M=m] = 2^{-n}\sum_{m\in\mathcal{M}}\Pr[M=m] = 2^{-n}$$
whereas $\Pr[C=c_1] = 0$ because no encryption can end in `1`.
Therefore:
$$\boxed{\Pr[C=c_0] = 2^{-n} \neq 0 = \Pr[C=c_1]}$$
Thus $\Pi'$ is a correct, perfectly secret scheme whose ciphertext distribution is not uniform over $\mathcal{C}'$.
Hence the equivalence is refuted:
$$\boxed{\text{Perfect secrecy} \nRightarrow \text{Uniform ciphertexts}}\qquad\blacksquare$$
