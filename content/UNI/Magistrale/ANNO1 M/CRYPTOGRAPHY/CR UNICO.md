## First model of a cryptographic scheme
Alice and Bob share a secret key $k$.
Alice uses this key to encrypt her message, and Bob uses the same key to recover it.
We have two important properties:
- **Correctness:** Bob must recover exactly the message that Alice has sent.
- **Confidentiality:** Eve should not learn information about the plaintext from the ciphertext.

![[CR_UNICO_ske_model.svg|640]]

## Formal definition of an encryption scheme
It has two algorithms:
$$\operatorname{Enc}: \mathcal{K}\times\mathcal{M} \rightarrow \mathcal{C}$$
$$\operatorname{Dec}: \mathcal{K}\times\mathcal{C} \rightarrow \mathcal{M}$$
where $\mathcal{K}$ is the key space, $\mathcal{M}$ is the message space, and $\mathcal{C}$ is the ciphertext space:
$$\boxed{\forall k\in\mathcal K,\ \forall m\in\mathcal M: \operatorname{Dec}(k,\operatorname{Enc}(k,m))=m}$$

### Contextualizing perfect secrecy
The ciphertext should not give information about the message to Eve, so if Alice sends `YES` or `NO` (as an example), the probability should remain the same before and after seeing the ciphertext.

**Formalizing perfect secrecy:** we introduce three random variables:
- $M$: the plaintext message
- $K$: the secret key, sampled uniformly and independently of $M$
- $C = \operatorname{Enc}(K,M)$: the ciphertext

The definition is:
$$\boxed{\Pr[M=m\mid C=c]=\Pr[M=m]}$$
This equality must hold for every distribution of $M$, every possible message $m\in\mathcal{M}$, and every ciphertext $c\in\mathcal{C}$ such that $\Pr[C=c]>0$.

#### Equivalent ciphertext distribution
This is used to express Shannon's definition using encryption-algorithm terms.
If an encryption scheme is perfectly secret, the distribution of its ciphertexts must not reveal which plaintext was encrypted.
The probability that a message $m$ outputs a ciphertext $c$ should be the same as for any other message, because we do not want any hint from it:
$$\boxed{\begin{aligned} \forall m_0,m_1\in\mathcal M,\ \forall c\in\mathcal C:\\ \Pr_K[\operatorname{Enc}(K,m_0)=c] = \Pr_K[\operatorname{Enc}(K,m_1)=c] \end{aligned}}$$

$P_0$ is the probability that the encryption of the plaintext $0$, given a random key from the set $\mathcal{K}$, outputs a ciphertext $0$; instead, $P_1$ is the same probability but with plaintext $1$ and ciphertext $0$.
What I notice is that if $\operatorname{Enc}(k,m)=m$ for all $k\in\mathcal{K}$ and all $m\in\mathcal{M}$, we can say that the probabilities are respectively $1$ for the first one (because $K$ does not affect the encryption algorithm) and $0$ for $P_1$ (because if we input plaintext $1$, we always get $1$ and not $0$).
The two probabilities are different, so perfect secrecy is not respected, because we want the probability distributions to be the same.

### Theorem 1.1: Equivalence of Perfect Secrecy
**Theorem statement.** Let $\Pi = (\operatorname{Enc},\operatorname{Dec})$ be a secret-key encryption scheme defined over finite key, message, and ciphertext spaces $(\mathcal{K},\mathcal{M},\mathcal{C})$. Let:
- $M$ be a random variable over $\mathcal{M}$, with an arbitrary probability distribution
- $K$ be uniformly distributed over $\mathcal{K}$, independently of $M$
- $C = \operatorname{Enc}(K,M)$ be the ciphertext random variable

We have three statements that are equivalent:
- **(i) Perfect secrecy (Shannon's definition):** for every distribution of $M$, every message $m\in\mathcal{M}$, and every ciphertext $c\in\mathcal{C}$ such that $\Pr[C=c]>0$:
$$\boxed{\Pr[M=m\mid C=c]=\Pr[M=m]}$$
- **(ii) Statistical independence of plaintext and ciphertext:** for every distribution of $M$, the random variables $M$ and $C$ are statistically independent:
$$\boxed{\Pr[M=m,C=c] = \Pr[M=m]\Pr[C=c]}$$
for every $m\in\mathcal M$ and $c\in\mathcal C$.
- **(iii) Identical ciphertext distributions:** for every pair of messages $m_0,m_1\in\mathcal{M}$ and every ciphertext $c\in\mathcal{C}$:
$$\boxed{\begin{aligned} \forall m_0,m_1\in\mathcal M,\ \forall c\in\mathcal C:\\ \Pr_K[\operatorname{Enc}(K,m_0)=c] = \Pr_K[\operatorname{Enc}(K,m_1)=c] \end{aligned}}$$

![[CR_UNICO_perfect_secrecy_eq.svg|640]]

#### Part 1: Prove $(i) \implies (ii)$
By the definition of perfect secrecy, for $\Pr[C=c]>0$ we know that:
$$\Pr[M=m\mid C=c]=\Pr[M=m]$$
We apply conditional probability (using `,` instead of intersection):
$$\Pr[M=m\mid C=c] = \frac{\Pr[M=m,C=c]}{\Pr[C=c]}$$
Substituting perfect secrecy:
$$\frac{\Pr[M=m,C=c]}{\Pr[C=c]} = \Pr[M=m]$$
Multiplying both sides by $\Pr[C=c]$:
$$\boxed{\Pr[M=m,C=c] = \Pr[M=m]\Pr[C=c]}$$
If $\Pr[C=c]=0$, because $\{M=m,C=c\}$ is contained in $\{C=c\}$, both sides have the same probability (equal to $0$).
$$\boxed{(i)\implies(ii)}\qquad\square$$

#### Part 2: Prove $(ii) \implies (iii)$
**Assumption:** $M$ and $C$ are statistically independent for every distribution of $M$.

We want to prove that encrypting any two plaintexts produces identical ciphertext distributions. Fix arbitrary messages $m_0,m_1\in\mathcal{M}$ and a ciphertext $c\in\mathcal{C}$. If $m_0=m_1$, the equality is immediate.

$M$ and $C$ are independent by assumption:
$$\Pr[C=c\mid M=m_0]=\Pr[C=c]$$
and we know that $C=\operatorname{Enc}(K,M)$. Therefore:
$$\Pr[C=c\mid M=m_0]=\Pr[\operatorname{Enc}(K,M)=c\mid M=m_0]$$
The key remains uniformly distributed because $K$ and $M$ are independent, and conditioning on $M=m_0$ fixes the plaintext:
$$\Pr[C=c\mid M=m_0] = \Pr_K[\operatorname{Enc}(K,m_0)=c]$$
Applying the same argument to $m_1$:
$$\Pr_K[\operatorname{Enc}(K,m_1)=c]=\Pr[C=c]$$
Consequently:
$$\boxed{\Pr_K[\operatorname{Enc}(K,m_0)=c] = \Pr_K[\operatorname{Enc}(K,m_1)=c]}$$
Since $m_0,m_1$, and $c$ were arbitrary, the condition holds for all plaintext pairs and ciphertexts.
$$\boxed{(ii)\implies(iii)}\qquad\square$$

#### Part 3: Prove $(iii) \implies (i)$
Every pair of plaintexts induces identical ciphertext distributions. We prove Shannon's secrecy definition by assuming that:
$$\boxed{\Pr_K[\operatorname{Enc}(K,m_0)=c] = \Pr_K[\operatorname{Enc}(K,m_1)=c]}$$
Fix an arbitrary distribution of $M$, a message $m\in\mathcal{M}$, and a ciphertext $c\in\mathcal{C}$ such that $\Pr[C=c]>0$.

By assumption (iii), we know there exists a probability $p_c$ which depends only on $c$ such that:
$$\forall m'\in\mathcal M: \Pr_K[\operatorname{Enc}(K,m')=c]=p_c$$
Since $K$ and $M$ are independent, for every message $m'$ with positive prior probability:
$$\Pr[C=c\mid M=m']=p_c$$

**Step 1.** We apply the law of total probability:
$$\Pr[C=c] = \sum_{\substack{m'\in\mathcal M\\\Pr[M=m']>0}} \Pr[C=c\mid M=m']\Pr[M=m']$$
Then we can substitute the common probability $p_c$:
$$\Pr[C=c] = \sum_{\substack{m'\in\mathcal M\\\Pr[M=m']>0}} p_c\Pr[M=m']$$
Since $p_c$ does not depend on $m'$, we can factor it out, and we also know that the sum of probabilities is $1$. Therefore:
$$\boxed{\Pr[C=c]=p_c}$$

**Step 2.** Applying Bayes' theorem: assuming $\Pr[M=m]>0$, by Bayes' theorem:
$$\Pr[M=m\mid C=c] = \frac{\Pr[C=c\mid M=m]\Pr[M=m]}{\Pr[C=c]}$$
We know that $\Pr[C=c\mid M=m]=p_c$ and $\Pr[C=c]=p_c$. Substituting:
$$\begin{aligned} \Pr[M=m\mid C=c] &=\frac{p_c\Pr[M=m]}{p_c}\\[5pt] &=\Pr[M=m] \end{aligned}$$

**Step 3.** We now just need to handle the zero-probability message case. If $\Pr[M=m]=0$, then $\Pr[M=m,C=c]=0$, so:
$$\Pr[M=m\mid C=c]=0=\Pr[M=m]$$
Thus, the equality holds in this case as well:
$$\boxed{\Pr[M=m\mid C=c]=\Pr[M=m]}$$
This is Shannon's definition of perfect secrecy.
$$\boxed{(iii)\implies(i)}\qquad\square$$

$$(i)\implies(ii),\qquad (ii)\implies(iii),\qquad (iii)\implies(i)$$
$$\boxed{\text{Theorem 1.1 is proved.}\quad\blacksquare}$$

### One-Time Pad
We want not only to define perfect secrecy, but also to build an encryption scheme. The One-Time Pad (OTP) has the objective of being both correct and perfectly secret.

![[CR_UNICO_otp_xor.svg|540]]

The encryption algorithm works with:
$$\operatorname{Enc}(k,m)=k\oplus m$$
and decryption is:
$$\operatorname{Dec}(k,c)=k\oplus c$$

#### Correctness proof
For a fixed message length $\ell$, the OTP uses:
$$\mathcal{K} = \mathcal{M} = \mathcal{C} = \{0,1\}^{\ell}$$
We want to prove that:
$$\boxed{\forall k\in\mathcal K,\ \forall m\in\mathcal M: \operatorname{Dec}(k,\operatorname{Enc}(k,m))=m}$$
We know that $\operatorname{Enc}(k,m)=k\oplus m$ and $\operatorname{Dec}(k,c)=k\oplus c$, so substituting gives:
$$\operatorname{Dec}(k,\operatorname{Enc}(k,m)) = k\oplus(k\oplus m)$$

> [!tip]- XOR properties
> ![[CR_UNICO_xor_properties.svg|540]]

Let $\Pi=(\operatorname{Enc},\operatorname{Dec})$ be the One-Time Pad scheme over $\{0,1\}^{\ell}$.
For every $k,m\in\{0,1\}^{\ell}$, we have:
$$\begin{aligned} \operatorname{Dec}(k,\operatorname{Enc}(k,m)) &= k\oplus(k\oplus m)\\ &= (k\oplus k)\oplus m\\ &= 0^\ell\oplus m\\ &= m \end{aligned}$$
The second equality follows from associativity, the third from the self-inverse property, and the fourth from the identity property of XOR.
Since the equality holds for arbitrary $k$ and $m$, the One-Time Pad satisfies correctness. $\square$

#### OTP perfect secrecy proof strategy
Because we know that perfect secrecy can also be demonstrated using statement **(iii)** of Theorem 1.1:
$$\forall m_0,m_1\in\mathcal M,\ \forall c\in\mathcal C: \qquad \Pr_K[\operatorname{Enc}(K,m_0)=c] = \Pr_K[\operatorname{Enc}(K,m_1)=c]$$
in the One-Time Pad we have $C = K \oplus M$, where $K$ is chosen uniformly at random from $\{0,1\}^{\ell}$, independently of $M$.

Let $m_0,m_1\in\{0,1\}^{\ell}$ be arbitrary plaintexts and let $c\in\{0,1\}^{\ell}$ be an arbitrary ciphertext.
For each plaintext $m_i$, the equation $K\oplus m_i=c$ holds exactly when $K=c\oplus m_i$.
Since $K$ is uniformly distributed over $\{0,1\}^{\ell}$, we obtain:
$$\begin{aligned} \Pr_K[\operatorname{Enc}(K,m_0)=c] &= \Pr_K[K=c\oplus m_0]\\ &= 2^{-\ell} \end{aligned}$$
Similarly:
$$\begin{aligned} \Pr_K[\operatorname{Enc}(K,m_1)=c] &= \Pr_K[K=c\oplus m_1]\\ &= 2^{-\ell} \end{aligned}$$
Therefore:
$$\boxed{\Pr_K[\operatorname{Enc}(K,m_0)=c] = \Pr_K[\operatorname{Enc}(K,m_1)=c]}$$
Since the equality holds for every $m_0,m_1,c$, Theorem 1.1 ($(iii) \implies (i)$) implies that the OTP provides perfect secrecy, assuming a uniformly random key independent of the plaintext and used for a single encryption. $\blacksquare$

#### Limitations of the One-Time Pad
Even though OTP achieves perfect secrecy, it has two practical limitations:
1. **The key must be as long as the message:** $|k| = |m| = \ell$, because encryption applies XOR bit by bit.
2. **Why can't we reuse an OTP key?** Suppose Alice encrypts two messages $m_1, m_2 \in \{0,1\}^{\ell}$ with the same key $k$, generating two ciphertexts:
$$c_1 = k\oplus m_1, \qquad c_2 = k\oplus m_2$$
Eve intercepts both ciphertexts and computes their XOR:
$$c_1\oplus c_2 = (k\oplus m_1)\oplus(k\oplus m_2) = (k\oplus k)\oplus(m_1\oplus m_2)$$
$$\boxed{c_1\oplus c_2 = m_1\oplus m_2}$$
This does not necessarily reveal either plaintext individually; however, it reveals $m_1 \oplus m_2$, a relationship between the two plaintexts that should have remained secret.

![[CR_UNICO_otp_security.svg|640]]

### Theorem 2.1: Shannon's Key-Length Lower Bound
Every perfectly secret secret-key encryption scheme must satisfy **Shannon's key-length bound**, which proves that the key space cannot be smaller than the message space:
$$\boxed{|\mathcal{K}| \ge |\mathcal{M}|}$$

> [!example]- Concrete intuition: why fewer keys than messages breaks secrecy
> Suppose there are $8$ possible plaintexts and only $4$ possible secret keys. Given a ciphertext $c$, Eve can try decrypting $c$ with every possible key, obtaining at most $4$ candidate plaintexts. While she may not recover the unique plaintext, observing $c$ cuts the set of possible messages from $8$ down to at most $4$, which leaks information that she did not have before seeing $c$.

#### Proof of Theorem 2.1
Assume for contradiction that $|\mathcal{K}| < |\mathcal{M}|$.
Fix the **uniform distribution over $\mathcal{M}$** (so $\Pr[M=m] = \frac{1}{|\mathcal{M}|} > 0$ for every $m\in\mathcal{M}$), and fix any ciphertext $c\in\mathcal{C}$ that can occur, i.e. $\Pr[C=c] > 0$.

![[CR_UNICO_shannon_bound.svg|640]]

**Step 1 — Cardinality argument on reachable plaintexts.**
Define the set of plaintexts obtained by decrypting $c$ under every key in $\mathcal{K}$:
$$\boxed{\mathcal{M}_c = \{\operatorname{Dec}(k,c) \mid k\in\mathcal{K}\}}$$
For this fixed $c$, every key $k\in\mathcal{K}$ produces exactly one plaintext $\operatorname{Dec}(k,c)$, and different keys may map to the same plaintext.
Therefore, the number of distinct plaintexts in $\mathcal{M}_c$ cannot exceed the number of keys:
$$\boxed{|\mathcal{M}_c| \le |\mathcal{K}| < |\mathcal{M}|}$$
Since $|\mathcal{M}_c| < |\mathcal{M}|$, there exists at least one message $m^* \in \mathcal{M} \setminus \mathcal{M}_c$.
By definition of $\mathcal{M}_c$, no key decrypts $c$ to $m^*$:
$$\forall k\in\mathcal{K},\quad \operatorname{Dec}(k,c) \neq m^*$$

**Step 2 — Show that $m^*$ can never encrypt to $c$.**
Suppose temporarily for contradiction that there exists a key $k^* \in \mathcal{K}$ such that $\operatorname{Enc}(k^*, m^*) = c$.
By the correctness of the encryption scheme:
$$\operatorname{Dec}(k^*, \operatorname{Enc}(k^*, m^*)) = m^*$$
Substituting our temporary assumption $\operatorname{Enc}(k^*, m^*) = c$ gives $\operatorname{Dec}(k^*, c) = m^*$.
However, Step 1 established that $\operatorname{Dec}(k,c) \neq m^*$ for every $k\in\mathcal{K}$:
$$\underbrace{\operatorname{Dec}(k^*,c) \neq m^*}_{\text{Step 1}} \qquad\text{and}\qquad \underbrace{\operatorname{Dec}(k^*,c) = m^*}_{\text{Temporary assumption + correctness}}$$
Both cannot hold, so the temporary assumption is false.
Thus, no key encrypts $m^*$ to $c$:
$$\boxed{\forall k\in\mathcal{K},\quad \operatorname{Enc}(k, m^*) \neq c}$$

**Step 3 — Contradiction with perfect secrecy.**
Because no key produces ciphertext $c$ from $m^*$, the posterior probability is $\Pr[M=m^*\mid C=c] = 0$.
Under the uniform distribution on $\mathcal{M}$, however, the prior probability is $\Pr[M=m^*] = \frac{1}{|\mathcal{M}|} > 0$:
$$\underbrace{\Pr[M=m^*\mid C=c]}_{0} \neq \underbrace{\Pr[M=m^*]}_{\frac{1}{|\mathcal{M}|} > 0}$$
This contradicts Shannon's definition of perfect secrecy, which requires $\Pr[M=m\mid C=c]=\Pr[M=m]$ for every message distribution, every $m\in\mathcal{M}$, and every $c\in\mathcal{C}$ with $\Pr[C=c]>0$.
Hence the assumption $|\mathcal{K}| < |\mathcal{M}|$ is false, proving Shannon's theorem:
$$\boxed{|\mathcal{K}| \ge |\mathcal{M}|}\qquad\blacksquare$$

> [!summary]- My logical roadmap of the proof
> 1. We want to prove $|\mathcal{K}| \ge |\mathcal{M}|$ for any perfectly secret scheme by contradiction, assuming $|\mathcal{K}| < |\mathcal{M}|$ and fixing a uniform distribution over $\mathcal{M}$ and a valid ciphertext $c$ ($\Pr[C=c]>0$).
> 2. Decrypting $c$ under all keys defines the subset $\mathcal{M}_c = \{\operatorname{Dec}(k,c) \mid k\in\mathcal{K}\} \subseteq \mathcal{M}$.
> 3. Since each key yields one plaintext (possibly with collisions), $|\mathcal{M}_c| \le |\mathcal{K}| < |\mathcal{M}|$.
> 4. Hence some $m^* \in \mathcal{M} \setminus \mathcal{M}_c$ satisfies $\operatorname{Dec}(k,c) \neq m^*$ for every $k\in\mathcal{K}$.
> 5. Assuming $\operatorname{Enc}(k^*,m^*)=c$ for some $k^*$ and applying correctness would force $\operatorname{Dec}(k^*,c)=m^*$, contradicting step 4; thus $\operatorname{Enc}(k,m^*) \neq c$ for all $k\in\mathcal{K}$.
> 6. Therefore $\Pr[M=m^*\mid C=c] = 0$, whereas $\Pr[M=m^*] = \frac{1}{|\mathcal{M}|} > 0$, contradicting perfect secrecy and forcing $|\mathcal{K}| \ge |\mathcal{M}|$.

### Game-Based Perfect Secrecy
In modern cryptography, instead of only measuring what an adversary learns about a message after seeing a ciphertext, we often frame security as an **indistinguishability game (experiment)** $\operatorname{GAME}_{\mathcal{A}}(b, m_0, m_1)$ between a Challenger $\mathcal{C}$ and an Adversary $\mathcal{A}$:
- For any fixed pair of messages $m_0, m_1 \in \mathcal{M}$ and challenge bit $b \in \{0,1\}$, we compare two worlds:
  - **Game 0 ($b=0$):** the challenger samples $K \gets \mathcal{K}$ uniformly and sends $c = \operatorname{Enc}(K, m_0)$ to $\mathcal{A}$.
  - **Game 1 ($b=1$):** the challenger samples $K \gets \mathcal{K}$ uniformly and sends $c = \operatorname{Enc}(K, m_1)$ to $\mathcal{A}$.
- After receiving $c$, the adversary $\mathcal{A}$ outputs a guess bit $b' \in \{0,1\}$.

![[CR_UNICO_game_perfect_secrecy.svg|640]]

An encryption scheme $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ satisfies **game-based perfect secrecy** if for every adversary $\mathcal{A}$ and every pair of messages $m_0, m_1 \in \mathcal{M}$, the adversary's **distinguishing advantage** between Game 0 and Game 1 is zero:
$$\boxed{\operatorname{Adv}_{\mathcal{A}} = \left| \Pr[\mathcal{A}(\operatorname{Enc}(K, m_1)) = 1] - \Pr[\mathcal{A}(\operatorname{Enc}(K, m_0)) = 1] \right| = 0}$$
Equivalently, the output distributions $\operatorname{GAME}_{\mathcal{A}}(0, m_0, m_1)$ and $\operatorname{GAME}_{\mathcal{A}}(1, m_0, m_1)$ are identical.
If the advantage is zero, $\mathcal{A}$ cannot distinguish which of $m_0$ or $m_1$ was encrypted.

> [!example]- Concrete intuition: building a distinguisher when distributions differ
> Suppose there exists a ciphertext $c^*$ such that $\Pr[\operatorname{Enc}(K, m_0) = c^*] = 0.2$ while $\Pr[\operatorname{Enc}(K, m_1) = c^*] = 0.7$, violating Theorem 1.1(iii).
> An adversary $\mathcal{A}$ that already knows $c^*$ can simply define:
> $$\mathcal{A}(c) = \begin{cases} 1 & \text{if } c = c^* \\ 0 & \text{if } c \neq c^* \end{cases}$$
> Then $\mathcal{A}$ outputs $1$ with probability $0.2$ in Game 0 and $0.7$ in Game 1, achieving a non-zero distinguishing advantage of $|0.7 - 0.2| = 0.5 > 0$.

#### Theorem 2.2: Equivalence of Shannon and Game-Based Perfect Secrecy
We prove a biconditional equivalence using **Theorem 1.1(iii)** (identical ciphertext distributions) as the bridge:
$$\boxed{\text{Shannon Perfect Secrecy} \iff \text{Theorem 1.1(iii)} \iff \text{Game-Based Perfect Secrecy}}$$

#### Part 1: Shannon Perfect Secrecy $\implies$ Game-Based Perfect Secrecy
Assume Shannon perfect secrecy holds.
By Theorem 1.1(iii), for every pair $m_0, m_1 \in \mathcal{M}$ and every $c \in \mathcal{C}$:
$$\Pr_K[\operatorname{Enc}(K, m_0) = c] = \Pr_K[\operatorname{Enc}(K, m_1) = c]$$
This means the ciphertext distributions $\operatorname{Enc}(K, m_0)$ and $\operatorname{Enc}(K, m_1)$ in Game 0 and Game 1 are **identical** ($\operatorname{Enc}(K, m_0) \equiv \operatorname{Enc}(K, m_1)$).
Because any adversary $\mathcal{A}$ runs the same algorithm on identically distributed inputs in both games, its output distributions are also identical:
$$P_0 := \Pr[\mathcal{A}(\operatorname{Enc}(K, m_0)) = 1] = \Pr[\mathcal{A}(\operatorname{Enc}(K, m_1)) = 1] =: P_1$$
Consequently, the distinguishing advantage is zero for every adversary $\mathcal{A}$:
$$\boxed{\operatorname{Adv}_{\mathcal{A}} = |P_1 - P_0| = 0}$$
Hence the scheme satisfies game-based perfect secrecy. $\square$

#### Part 2: Game-Based Perfect Secrecy $\implies$ Shannon Perfect Secrecy
We prove the contrapositive.
Suppose Shannon perfect secrecy fails, so Theorem 1.1(iii) does not hold.
Then there exist messages $m_0, m_1 \in \mathcal{M}$ and a ciphertext $c^* \in \mathcal{C}$ such that:
$$\Pr_K[\operatorname{Enc}(K, m_0) = c^*] \neq \Pr_K[\operatorname{Enc}(K, m_1) = c^*]$$
Construct the indicator adversary $\mathcal{A}$ that tests whether the received ciphertext equals $c^*$:
$$\mathcal{A}(c) = \begin{cases} 1 & \text{if } c = c^* \\ 0 & \text{if } c \neq c^* \end{cases}$$
Its probability of outputting $1$ in Game $b$ is precisely $\Pr_K[\operatorname{Enc}(K, m_b) = c^*]$, so its distinguishing advantage is:
$$\operatorname{Adv}_{\mathcal{A}} = \left| \Pr_K[\operatorname{Enc}(K, m_1) = c^*] - \Pr_K[\operatorname{Enc}(K, m_0) = c^*] \right| > 0$$
This contradicts game-based perfect secrecy, which requires $\operatorname{Adv}_{\mathcal{A}} = 0$ for every adversary.
Therefore, game-based perfect secrecy implies Theorem 1.1(iii), and hence Shannon perfect secrecy. $\blacksquare$

## Message Authentication Codes (MACs)
We have already seen the One-Time Pad and perfect secrecy.
Neither of them ensures **integrity** (protection against modifications by Eve); they only provide **confidentiality** (Eve cannot decipher the message).
To achieve integrity, we need a **Message Authentication Code (MAC)**.
The MAC construction we study here is deterministic.

A MAC works using a tag computed from a secret key shared between Alice and Bob.
Notice that both the message $m$ and the tag $\tau$ are sent **in the clear** (publicly), because here we care only about integrity, not confidentiality.
Formally, a MAC is defined by a tagging algorithm:
$$\boxed{\operatorname{Tag}: \mathcal{K} \times \mathcal{M} \rightarrow \mathcal{T}}$$
Alice computes $\tau = \operatorname{Tag}(k, m)$ and sends $(m, \tau)$.
Bob receives $(m', \tau')$, recomputes $\operatorname{Tag}(k, m')$, and accepts if and only if $\operatorname{Tag}(k, m') = \tau'$.
They carry primes ($'$) because Eve may have altered them on the channel.

![[CR_UNICO_mac_model.svg|640]]

### Forgery attack on an OTP-based MAC
Suppose we try to build a MAC using the One-Time Pad operation:
$$\operatorname{Tag}(k, m) = k \oplus m$$
Then an adversary $\mathcal{A}$ can forge a valid tag after seeing a single message-tag pair $(m, \tau)$:
1. $\mathcal{A}$ obtains a valid pair $(m, \tau)$, where $\tau = k \oplus m$, and recovers the secret key:
$$k = \tau \oplus m$$
2. $\mathcal{A}$ chooses any new message $m' \neq m$ and computes its valid tag:
$$\tau' = k \oplus m'$$
Thus $\mathcal{A}$ produces a valid forgery $(m', \tau')$ with $\Pr[\mathcal{A} \text{ wins}] = 1$.
Does this mean MACs in general are insecure?
No: it only means the One-Time Pad is not a valid construction for a MAC.

### One-time $\varepsilon$-statistical MAC security
Regarding forgery, no deterministic MAC can be completely unforgeable ($\varepsilon = 0$).
There is always at least a small probability that Eve guesses a valid tag $\tau'$ such that $\tau' = \operatorname{Tag}(k, m')$.
Therefore, we cannot require $\varepsilon = 0$; instead, we use a small error parameter $\varepsilon$ to define **one-time $\varepsilon$-statistical security**.

Formally, consider a deterministic MAC $\operatorname{Tag}: \mathcal{K} \times \mathcal{M} \rightarrow \mathcal{T}$ where $K$ is uniformly distributed over $\mathcal{K}$.
The MAC is **one-time $\varepsilon$-statistically secure** if, for every pair of distinct messages $m, m' \in \mathcal{M}$ ($m \neq m'$) and every pair of tags $\tau, \tau' \in \mathcal{T}$ for which the conditioning event has positive probability:
$$\boxed{\Pr_K\left[ \underbrace{\operatorname{Tag}(K,m')=\tau'}_{\text{successful forgery}} \;\middle|\; \underbrace{\operatorname{Tag}(K,m)=\tau}_{\text{known information}} \right]\leq\varepsilon}$$
This conditional probability asks: given that Eve already knows $\operatorname{Tag}(K, m) = \tau$, what is the probability that $\tau'$ is a valid tag for $m'$?
Eve attempts to produce a valid tag $\tau'$ for a new message $m' \neq m$.
She does not necessarily try to recover the secret key; however, because she does not know which secret key $K$ was sampled by the challenger, her success probability depends on the remaining uncertainty about $K$.

### Expressing MAC security as a game
![[CR_UNICO_mac_game.svg|640]]

Equivalently, a MAC construction is **one-time $\varepsilon$-statistically secure** if, for **every computationally unbounded** adversary $\mathcal{A}$:
$$\boxed{\Pr[\mathcal{A}\text{ wins}]\leq\varepsilon}$$
where $\mathcal{A}$ wins if it outputs $(m', \tau')$ such that $m' \neq m$ and $\operatorname{Tag}(k, m') = \tau'$.

### Pairwise-independent hash families
After defining MAC security formally, we want to construct a MAC that achieves the optimal security bound:
$$\varepsilon=\frac{1}{|\mathcal T|}$$

Let $\mathcal{H} = \{h_k : \mathcal{M} \rightarrow \mathcal{T}\}_{k\in\mathcal{K}}$ be a family of deterministic hash functions indexed by a key $k \in \mathcal{K}$.
We say that $\mathcal{H}$ is **pairwise independent** if, for every pair of distinct messages $m, m' \in \mathcal{M}$ ($m \neq m'$) and every pair of tags $\tau, \tau' \in \mathcal{T}$:
$$\boxed{\Pr_{K\gets\mathcal K}\big[h_K(m)=\tau \land h_K(m')=\tau'\big] = \frac{1}{|\mathcal T|^2}}$$
where $K$ is sampled uniformly at random over $\mathcal{K}$ and each $h_k$ is deterministic.
This suggests defining the MAC simply as $\operatorname{Tag}(k, m) = h_k(m)$.

> [!info]- Another way to view pairwise independence with conditional probability
> $$\Pr_K[h_K(m')=\tau'\mid h_K(m)=\tau] = \Pr_K[h_K(m')=\tau'] = \frac{1}{|\mathcal T|}$$

#### Theorem 2.3: Pairwise independence $\implies$ one-time MAC security
Define $\operatorname{Tag}(k, m) = h_k(m)$, where $\mathcal{H} = \{h_k : \mathcal{M} \rightarrow \mathcal{T}\}_{k\in\mathcal{K}}$ is pairwise independent:
$$\Pr_K\big[h_K(m)=\tau \land h_K(m')=\tau'\big] = \frac{1}{|\mathcal T|^2}$$
We want to prove the conditional forgery bound for every distinct $m, m' \in \mathcal{M}$ and every $\tau, \tau' \in \mathcal{T}$:
$$\Pr_K\big[h_K(m')=\tau' \mid h_K(m)=\tau\big] \le \frac{1}{|\mathcal T|}$$

**Proof.**
Apply the definition of conditional probability:
$$\Pr_K\big[h_K(m')=\tau' \mid h_K(m)=\tau\big] = \frac{\Pr_K\big[h_K(m')=\tau' \land h_K(m)=\tau\big]}{\Pr_K\big[h_K(m)=\tau\big]}$$
For the numerator, pairwise independence directly gives:
$$\Pr_K\big[h_K(m')=\tau' \land h_K(m)=\tau\big] = \frac{1}{|\mathcal T|^2}$$
For the denominator, fix $m$ and $\tau$ and marginalize (sum) over all possible outputs $\tau' \in \mathcal{T}$ of $h_K(m')$ on the distinct message $m' \neq m$:
$$\Pr_K\big[h_K(m)=\tau\big] = \sum_{\tau'\in\mathcal T} \Pr_K\big[h_K(m)=\tau \land h_K(m')=\tau'\big] = \sum_{\tau'\in\mathcal T} \frac{1}{|\mathcal T|^2} = |\mathcal T|\cdot\frac{1}{|\mathcal T|^2} = \frac{1}{|\mathcal T|}$$
Since $\frac{1}{|\mathcal{T}|} > 0$, the conditioning event has positive probability.
Substituting numerator and denominator yields:
$$\begin{aligned} \Pr_K\big[h_K(m')=\tau'\mid h_K(m)=\tau\big] &= \frac{\Pr_K\big[h_K(m')=\tau'\land h_K(m)=\tau\big]}{\Pr_K\big[h_K(m)=\tau\big]}\\[6pt] &= \frac{1/|\mathcal T|^2}{1/|\mathcal T|}\\[6pt] &= \frac{1}{|\mathcal T|} \end{aligned}$$
Therefore, a pairwise-independent hash family defines a one-time statistically secure MAC with the optimal bound:
$$\boxed{\varepsilon=\frac{1}{|\mathcal T|}}\qquad\square$$
Visually, in the joint distribution table over all pairs $(\tau,\tau') \in \mathcal T^2$, conditioning fixes a single row $\tau$ (whose sum equals the marginal $1/|\mathcal T|$) and selects one cell $1/|\mathcal T|^2$ inside it:
![[CR_UNICO_marginalization_grid.svg|640]]

### Affine hashing
We have not yet defined a concrete hash family.
An example is **affine hashing** over $\mathbb{Z}_p$, where $p$ is a public prime number:
$$\begin{aligned} \mathcal M &= \mathbb Z_p\\ \mathcal T &= \mathbb Z_p\\ \mathcal K &= \mathbb Z_p^2 \end{aligned}$$
The secret key belongs to $\mathbb{Z}_p^2$ because it is a pair:
$$k = (a, b)$$
and the hash function is defined as:
$$\boxed{h_{a,b}(m) = (am + b) \bmod p}$$
where $a$ and $b$ are sampled independently and uniformly from $\mathbb{Z}_p$.

> [!example]- Concrete intuition: key uncertainty after observing one tag ($p=5$)
> Knowing one message-tag pair $(m,\tau)$ gives $am + b \equiv \tau \pmod p$, i.e. $b \equiv \tau - am \pmod p$, so every choice of $a$ fixes a unique $b$.
> For $p=5$, $m=2$, and $\tau=3$, Eve knows $2a+b\equiv 3\pmod 5$:
>
> | Possible $a$ | Corresponding $b$ | Candidate key $(a,b)$ |
> | --- | --- | --- |
> | $0$ | $3$ | $(0,3)$ |
> | $1$ | $1$ | $(1,1)$ |
> | $2$ | $4$ | $(2,4)$ |
> | $3$ | $2$ | $(3,2)$ |
> | $4$ | $0$ | $(4,0)$ |
>
> Out of $p^2=25$ keys, one observed tag leaves $p=5$ equally likely candidates (matching our conditional-probability analysis of uncertainty about the key).

> [!info]- Key uncertainty vs. tag uncertainty after observing one tag ($25 \to 5$ vs. $5 \to 5$)
> Although observing $(m, \tau)$ rules out $20$ of the $25$ keys in $\mathbb{Z}_5^2$, the remaining $5$ candidate keys still map bijectively onto all $5$ possible tags in $\mathcal{T} = \mathbb{Z}_5$ for any fresh message $m' \neq m$.
> Therefore, Eve's probability of guessing the **key** rises from $1/25$ to $1/5$, while her probability of guessing the **new tag** remains unchanged at $1/5$:
>
> | Quantity ($p=5$) | Before observing $\tau$ | After observing $\tau$ |
> | --- | --- | --- |
> | Possible keys | $25$ | $5$ |
> | Possible tags for $m'$ | $5$ | $5$ |
> | Probability of guessing the key | $1/25$ | $1/5$ |
> | Probability of guessing the tag | $1/5$ | $1/5$ |
>
> ![[CR_UNICO_key_vs_tag_uncertainty.svg|640]]
>
> In terms of pairwise independence, observing $\tau = h_K(m)$ does not change the conditional distribution of $h_K(m')$:
> $$\underbrace{\Pr_K[h_K(m')=\tau'\mid h_K(m)=\tau]}_{\text{After observing }(m,\tau)} = \underbrace{\Pr_K[h_K(m')=\tau']}_{\text{Before observing }(m,\tau)} = \frac{1}{|\mathcal T|}$$

#### Lemma 2.1: Affine hashing is pairwise independent
We want to prove that the affine hash family is pairwise independent.
Assume:
$$h_{a,b}(m) = (am + b) \bmod p$$
where $p$ is prime and $(a,b)$ is sampled uniformly from $\mathbb{Z}_p^2$.
We must prove that for every pair of distinct messages $m \neq m'$ in $\mathbb{Z}_p$ and every pair of tags $\tau, \tau' \in \mathbb{Z}_p$:
$$\Pr_{a,b}\big[h_{a,b}(m)=\tau \land h_{a,b}(m')=\tau'\big] = \frac{1}{|\mathcal T|^2}$$

**Proof.**
We start by considering both equations simultaneously:
$$\begin{cases} am + b \equiv \tau \pmod p\\ am' + b \equiv \tau' \pmod p \end{cases}$$
To isolate $a$, subtract the second equation from the first:
$$(am + b) - (am' + b) \equiv \tau - \tau' \pmod p$$
Simplifying gives:
$$\boxed{a(m - m') \equiv \tau - \tau' \pmod p}$$
Since $m \neq m'$ in $\mathbb{Z}_p$, we have $m - m' \not\equiv 0 \pmod p$.
Because $p$ is prime, every nonzero element in $\mathbb{Z}_p$ has a unique multiplicative inverse modulo $p$, so we can solve uniquely for $a$:
$$\boxed{a \equiv (\tau - \tau')(m - m')^{-1} \pmod p}$$
Substituting $a$ into the first equation uniquely fixes $b$ as well:
$$\boxed{b \equiv \tau - am \pmod p}$$
Thus, for any fixed distinct messages $m, m'$ and tags $\tau, \tau'$, the system has **exactly one** solution $(a,b) \in \mathbb{Z}_p^2$.
Since the key space is $\mathcal{K} = \mathbb{Z}_p^2$, its size is:
$$|\mathcal K| = p^2$$
All keys are ***equally likely*** (uniformly distributed), so:
$$\begin{aligned} \Pr_{a,b}\big[h_{a,b}(m)=\tau \land h_{a,b}(m')=\tau'\big] &= \frac{\text{Number of satisfying keys}}{\text{Total number of keys}}\\[6pt] &= \frac{1}{p^2}\\[6pt] &= \frac{1}{|\mathcal T|^2} \end{aligned}$$
Therefore, the affine hash family is pairwise independent. $\square$

To conclude that the resulting MAC $\operatorname{Tag}((a,b), m) = h_{a,b}(m)$ is one-time statistically secure, we apply **Theorem 2.3**, giving the optimal bound:
$$\boxed{\varepsilon = \frac{1}{|\mathcal T|} = \frac{1}{p}}\qquad\blacksquare$$

#### Failure of two-time security of affine hashing
Suppose an adversary $\mathcal{A}$ observes two valid message-tag pairs $(m_1,\tau_1)$ and $(m_2,\tau_2)$ under the same key $(a,b)$, where $m_1 \neq m_2$.
Using the same reasoning as in the proof of Lemma 2.1, $\mathcal{A}$ subtracts the second equation from the first to eliminate $b$:
$$a(m_1 - m_2) \equiv \tau_1 - \tau_2 \pmod p$$
Since $p$ is prime and $m_1 - m_2 \not\equiv 0 \pmod p$, the multiplicative inverse of $m_1 - m_2$ modulo $p$ exists.
Therefore, $\mathcal{A}$ recovers $a$:
$$a \equiv (\tau_1 - \tau_2)(m_1 - m_2)^{-1} \pmod p$$
Substituting $a$ back into the first equation lets $\mathcal{A}$ recover $b$:
$$b \equiv \tau_1 - am_1 \pmod p$$
$\mathcal{A}$ now knows the entire secret key $(a,b)$, chooses any fresh message $m_3 \notin \{m_1, m_2\}$, and computes a valid forgery tag:
$$\tau_3 = (am_3 + b) \bmod p$$
Since the forged tag is always valid:
$$\boxed{\Pr[\mathcal A\text{ wins}] = 1}$$
Therefore, affine hashing is **not** two-time $\varepsilon$-statistically secure for any $\varepsilon < 1$. $\square$

![[CR_UNICO_affine_1_vs_2_tags.svg|640]]

### Two-time statistically secure MAC: quadratic hashing
To prevent Eve from recovering the secret key after observing two tags, we increase the number of secret key components from $2$ to $3$.
Moving from $2$ to $3$ coefficients changes the evaluation from a linear polynomial to a **quadratic polynomial**.

![[CR_UNICO_affine_vs_quadratic.svg|640]]

Let $p$ be a public prime number with $p \ge 3$, and define:
$$\begin{aligned} \mathcal M &= \mathbb Z_p\\ \mathcal T &= \mathbb Z_p\\ \mathcal K &= \mathbb Z_p^3 \end{aligned}$$
The secret key is a triple sampled uniformly from $\mathbb{Z}_p^3$:
$$k = (a, b, c)$$
and the quadratic hash / tagging function is:
$$\boxed{h_{a,b,c}(m) = (am^2 + bm + c) \bmod p}$$

![[CR_UNICO_two_time_mac_game.svg|640]]

#### Quadratic hashing is two-time $1/p$-statistically secure
We prove two-time $\frac{1}{p}$-statistical security of $\operatorname{Tag}((a,b,c), m) = h_{a,b,c}(m)$ in two steps:
- first showing **3-wise independence**,
- then bounding the conditional forgery probability after two queries.

**Step 1 — 3-wise independence.**
For any pairwise distinct $m_1, m_2, m_3 \in \mathbb{Z}_p$ and any $\tau_1, \tau_2, \tau_3 \in \mathbb{Z}_p$, the equations $h_{a,b,c}(m_i) \equiv \tau_i \pmod p$ form a linear system in $(a, b, c) \in \mathbb{Z}_p^3$:
$$\begin{pmatrix} m_1^2 & m_1 & 1 \\ m_2^2 & m_2 & 1 \\ m_3^2 & m_3 & 1 \end{pmatrix} \begin{pmatrix} a \\ b \\ c \end{pmatrix} \equiv \begin{pmatrix} \tau_1 \\ \tau_2 \\ \tau_3 \end{pmatrix} \pmod p$$
Its matrix is Vandermonde (with decreasing columns $m_i^2, m_i, 1$, swapping columns $1$ and $3$ of the standard $1, m_i, m_i^2$ form and flipping only the sign):
$$\det = (m_1 - m_2)(m_1 - m_3)(m_2 - m_3) \not\equiv 0 \pmod p$$
Because $m_1, m_2, m_3$ are distinct and $p$ is prime, $\det$ is invertible in $\mathbb{Z}_p$, so **exactly one** key $(a,b,c) \in \mathbb{Z}_p^3$ solves the system.
Since $|\mathcal{K}| = p^3$ and all keys are ***equally likely***:
$$\Pr_{a,b,c}\big[h_{a,b,c}(m_1)=\tau_1 \land h_{a,b,c}(m_2)=\tau_2 \land h_{a,b,c}(m_3)=\tau_3\big] = \frac{1}{p^3} = \frac{1}{|\mathcal T|^3}$$

**Step 2 — Conditional forgery bound.**
Let $m_1 \neq m_2$ be the queried messages with tags $\tau_1, \tau_2 \in \mathbb{Z}_p$, and let $m_3 \notin \{m_1, m_2\}$ (which exists since $p \ge 3$) have candidate tag $\tau_3 \in \mathbb{Z}_p$.
By definition of conditional probability:
$$\Pr_{a,b,c}\big[h_{a,b,c}(m_3)=\tau_3 \mid h_{a,b,c}(m_1)=\tau_1 \land h_{a,b,c}(m_2)=\tau_2\big] = \frac{\Pr_{a,b,c}\big[h_{a,b,c}(m_1)=\tau_1 \land h_{a,b,c}(m_2)=\tau_2 \land h_{a,b,c}(m_3)=\tau_3\big]}{\Pr_{a,b,c}\big[h_{a,b,c}(m_1)=\tau_1 \land h_{a,b,c}(m_2)=\tau_2\big]}$$
From Step 1, the numerator is $\frac{1}{p^3}$.
We find the denominator by marginalizing over all $|\mathcal{T}| = p$ tags $\tau_3$ at $m_3$:
$$\Pr_{a,b,c}\big[h_{a,b,c}(m_1)=\tau_1 \land h_{a,b,c}(m_2)=\tau_2\big] = \sum_{\tau_3\in\mathcal T} \Pr_{a,b,c}\big[h_{a,b,c}(m_1)=\tau_1 \land h_{a,b,c}(m_2)=\tau_2 \land h_{a,b,c}(m_3)=\tau_3\big] = p \cdot \frac{1}{p^3} = \frac{1}{p^2}$$
Since $\frac{1}{p^2} > 0$, substituting both back yields:
$$\Pr_{a,b,c}\big[h_{a,b,c}(m_3)=\tau_3 \mid h_{a,b,c}(m_1)=\tau_1 \land h_{a,b,c}(m_2)=\tau_2\big] = \frac{1/p^3}{1/p^2} = \frac{1}{p}$$
Thus quadratic hashing achieves two-time statistical security:
$$\boxed{\varepsilon = \frac{1}{p}}\qquad\blacksquare$$

### $t$-wise independence and $t$-time MACs
We can generalize the same idea from $t=1$ (affine) and $t=2$ (quadratic) to any integer $t \ge 1$.
Let $p$ be a prime number with $p > t$.
Define the key space as:
$$\mathcal K = \mathbb Z_p^{t+1}$$
and sample the secret key uniformly:
$$k = (a_0, a_1, \ldots, a_t)$$
The tagging algorithm evaluates a degree-$t$ polynomial modulo $p$:
$$\boxed{\operatorname{Tag}(k,m) = \left(\sum_{i=0}^{t} a_i m^i\right)\bmod p}$$
Because any $t+1$ distinct inputs and tags uniquely fix a polynomial of degree at most $t$ over $\mathbb{Z}_p$, this family is **$(t+1)$-wise independent** and achieves $t$-time $\frac{1}{p}$-statistical security.

#### Theorem 2.4: $t$-Time Statistical MAC Key-Length Bound
The ***downside*** is that key length grows linearly with $t$, so unconditional security cannot support an unbounded number of messages with one short fixed key.
For any $t$-time $2^{-\lambda}$-statistically secure MAC (with integer $\lambda \ge 1$) over a message space with at least $t+1$ distinct messages:
$$\boxed{\log_2|\mathcal K| \ge (t+1)\lambda}$$
Our degree-$t$ polynomial MAC matches this scaling, since $|\mathcal K| = p^{t+1}$ gives:
$$\log_2|\mathcal K| = (t+1)\log_2 p$$

## Randomness Extraction
So far, we have always assumed that secret keys are sampled uniformly at random, such as $K \gets U_n$ (the uniform distribution over $\{0,1\}^n$) in an $n$-bit One-Time Pad.
How does a computer actually obtain this randomness?
Because a computer is deterministic, it must harvest randomness from physical sources such as thermal noise.
The problem is that these physical sources are imperfect and may produce bits that are:
- **Biased:** some values are more likely than others.
- **Correlated:** the value of one bit may depend on another.
- **Partially predictable:** some information may be known to an adversary.

In practice, randomness generation follows a multi-stage pipeline:
1. **Extract (current focus):** convert an imperfect physical source $X$ into short, nearly uniform random bits using information-theoretic techniques.
2. **Expand (later lectures, via PRGs):** stretch that short seed deterministically into a long pseudorandom stream under computational assumptions.
3. **Refresh (omitted in this course):** periodically mix fresh physical entropy into the state so future outputs stay unpredictable.

![[CR_UNICO_randomness_pipeline.svg|640]]

> [!example]- Why a biased key breaks OTP perfect secrecy
> Consider the $1$-bit One-Time Pad $\operatorname{Enc}(k, m) = k \oplus m$ over $\mathcal{K} = \mathcal{M} = \mathcal{C} = \{0,1\}$, where $K$ is biased:
> $$\Pr[K=0] = 0.8, \qquad \Pr[K=1] = 0.2$$
> By Theorem 1.1(iii), perfect secrecy requires $\Pr_K[\operatorname{Enc}(K, m_0) = c] = \Pr_K[\operatorname{Enc}(K, m_1) = c]$ for all $m_0, m_1 \in \mathcal{M}$ and $c \in \mathcal{C}$.
> Choosing $m_0 = 0$, $m_1 = 1$, and $c = 0$ gives:
> $$\begin{aligned} \Pr_K[\operatorname{Enc}(K,0)=0] &= \Pr[K=0] = 0.8\\ \Pr_K[\operatorname{Enc}(K,1)=0] &= \Pr[K=1] = 0.2 \end{aligned}$$
> Since $0.8 \neq 0.2$, ciphertext $0$ leaks information about which plaintext was encrypted, so perfect secrecy fails. $\square$

### Von Neumann Extractor
The Von Neumann extractor transforms independent outputs from a biased source into uniformly random bits.
Suppose we have a biased coin $B \in \{0,1\}$ such that:
$$\Pr[B=0]=p, \qquad \Pr[B=1]=1-p$$
where the bias $p$ is unknown, with $0 < p < 1$.
We sample pairs of **independent, identically distributed** tosses $(B_1, B_2)$ from $B$:
- discard $(0,0)$ and $(1,1)$ (and draw a fresh pair until a bit is produced),
- output $Y = 1$ on $(0,1)$,
- output $Y = 0$ on $(1,0)$.

![[CR_UNICO_von_neumann_extractor.svg|640]]

#### Why the output is uniform
Because $B_1$ and $B_2$ are independent, the probability of a pair factors into the product of the individual toss probabilities:
$$\begin{aligned} \Pr[(B_1,B_2)=(0,1)] &= p(1-p)\\ \Pr[(B_1,B_2)=(1,0)] &= (1-p)p \end{aligned}$$
Let $E$ be the event that a pair is accepted:
$$E = \{B_1 \neq B_2\}$$
Since $(0,1)$ and $(1,0)$ are disjoint and $0 < p < 1$:
$$\Pr[E] = 2p(1-p) > 0$$
Using conditional probability, the accepted output bit $Y$ is uniform:
$$\Pr[Y=1 \mid E] = \frac{\Pr[(B_1,B_2)=(0,1)]}{\Pr[E]} = \frac{p(1-p)}{2p(1-p)} = \frac{1}{2}$$
Similarly:
$$\Pr[Y=0 \mid E] = \frac{\Pr[(B_1,B_2)=(1,0)]}{\Pr[E]} = \frac{(1-p)p}{2p(1-p)} = \frac{1}{2}$$

**Why independence is essential.**
Independence is what allows us to multiply the individual toss probabilities.
Without independence, we cannot generally guarantee that:
$$\Pr[B_1=0, B_2=1] = p(1-p)$$
or that $(0,1)$ and $(1,0)$ remain equally likely, so the Von Neumann extractor cannot handle correlated sources.

### Min-Entropy
Min-entropy measures how unpredictable a discrete source $X$ is in the worst case.
Let $X$ be a discrete random variable; its **min-entropy** is defined in general as:
$$\boxed{H_\infty(X) = -\log_2\left(\max_x \Pr[X=x]\right)}$$
Equivalently, in lower-bound form:
$$H_\infty(X) \ge k \iff \max_x \Pr[X=x] \le 2^{-k}$$
Intuitively, we track the single most probable outcome.
The probability $p_{\text{guess}}$ that an adversary guesses $X$ in one attempt (by choosing its most probable value) satisfies:
$$p_{\text{guess}} = \max_x \Pr[X=x]$$
Inverting $-\log_2$ gives this guessing probability directly in terms of min-entropy:
$$\boxed{\max_x \Pr[X=x] = p_{\text{guess}} = 2^{-H_\infty(X)}}$$

> [!important]- Concrete example ($128$-bit string): $H_\infty(X) = 32$ does not mean $32$ random bits and $96$ fixed bits
> Having min-entropy $H_\infty(X) = 32$ bits (guessing probability $p_{\text{guess}} = 2^{-32}$) on a $128$-bit string does **not** mean that $32$ individual bits are chosen uniformly while the remaining $96$ bits are deterministically fixed constants.
> The value $2^{-32}$ is the probability of guessing the **entire** $128$-bit string in one attempt, not the probability of guessing only $32$ bit positions.
> For example, if $R \gets \{0,1\}^{32}$ is repeated four times ($X = R \parallel R \parallel R \parallel R$), guessing all $128$ bits requires guessing only $R$ ($p_{\text{guess}} = 2^{-32}$), yet no single bit position is fixed to a constant.
> ![[CR_UNICO_min_entropy_spread.svg|580]]

#### Theorem 3.1: Impossibility of universal deterministic extractors
**General statement (arbitrary $n \ge 1$).**
Suppose an imperfect source $X \in \{0,1\}^n$ has min-entropy satisfying:
$$H_\infty(X) \ge n - 1$$

> [!hint]- Intuition: at least $n-1$ bits of worst-case unpredictability
> Even though $X$ is an $n$-bit string retaining at least $n-1$ bits of min-entropy, no fixed deterministic rule can guarantee one uniform output bit for every such source.

We want to prove that there does **not** exist a universal deterministic function:
$$\operatorname{Ext} : \{0,1\}^n \rightarrow \{0,1\}$$
that outputs **one perfectly uniform bit** for every source $X$ with $H_\infty(X) \ge n - 1$.

**General proof (arbitrary $n \ge 1$).**
Fix an arbitrary deterministic function $\operatorname{Ext} : \{0,1\}^n \to \{0,1\}$.
Let $A_0 = \operatorname{Ext}^{-1}(0)$ and $A_1 = \operatorname{Ext}^{-1}(1)$ be the preimages of $0$ and $1$.
Because $A_0$ and $A_1$ partition $\{0,1\}^n$:
$$|A_0| + |A_1| = 2^n$$
Applying the **pigeonhole principle** ensures that for some bit $b \in \{0,1\}$, the **larger** preimage $A_b$ contains at least half of all $n$-bit strings:
$$|A_b| \ge \frac{2^n}{2} = 2^{n-1}$$
This pigeonhole lower bound $|A_b| \ge 2^{n-1}$ is specifically why we can guarantee $H_\infty(X_{\text{bad}}) \ge n - 1$ when we construct our counterexample on $A_b$ below.

> [!question]- Why we cannot choose the smaller preimage instead
> The pigeonhole principle only guarantees $|A_b| \ge 2^{n-1}$ for the **larger** preimage $A_b$; whenever $|A_0| \neq |A_1|$, the smaller preimage has size $|A_{1-b}| < 2^{n-1}$, so a uniform source over it violates the hypothesis $H_\infty(X_{\text{bad}}) \ge n - 1$.
> For example, when $n = 3$ (where Theorem 3.1 requires $H_\infty(X_{\text{bad}}) \ge 3 - 1 = 2$), the smaller preimage $A_1$ has size $|A_1| = 3$.
> Making $X_{\text{bad}}$ uniform on $A_1$ gives probability $\frac{1}{3}$ on each string in $A_1$ and min-entropy:
> $$H_\infty(X_{\text{bad}}) = -\log_2\left(\frac{1}{3}\right) = \log_2 3 < 2$$
> so it fails Property 1 and is not a valid counterexample source.

> [!example] Concrete example ($n = 3$): preimage partition
> Any $\operatorname{Ext} : \{0,1\}^3 \to \{0,1\}$ splits the $8$ input strings into $A_0$ and $A_1$; here $b = 0$ gives the larger preimage ($|A_0| = 5 \ge 2^{3-1} = 4$), while $|A_1| = 3$:
> ![[CR_UNICO_ext_preimage_partition.svg|520]]

To show that $\operatorname{Ext}$ fails on at least one valid source, we construct a tailored source $X_{\text{bad}}$ satisfying two properties:
- **Property 1 (high input min-entropy):** $H_\infty(X_{\text{bad}}) \ge n - 1$,
- **Property 2 (completely predictable output):** $\operatorname{Ext}(X_{\text{bad}}) = b$ with probability $1$.

To force $\operatorname{Ext}$ to always output $b$, define $X_{\text{bad}}$ to be uniformly distributed over the larger preimage $A_b$:
$$\Pr[X_{\text{bad}}=x] = \begin{cases} \frac{1}{|A_b|} & x \in A_b \\[4pt] 0 & x \notin A_b \end{cases}$$

> [!example] Concrete example ($n = 3$): $X_{\text{bad}} \sim U(A_0)$
> Putting all probability mass uniformly on $A_0$ ($\frac{1}{5}$ on each string in $A_0$, $0$ on $A_1$) forces $\operatorname{Ext}(X_{\text{bad}}) = 0$ with probability $1$:
> ![[CR_UNICO_ext_xbad_distribution.svg|540]]

**1. Verify Property 1 (min-entropy bound, general $n$).**
Computing $H_\infty(X_{\text{bad}})$ using $|A_b| \ge 2^{n-1}$ gives:
$$\begin{aligned} H_\infty(X_{\text{bad}}) &= -\log_2\left(\max_x \Pr[X_{\text{bad}}=x]\right) \\ &= -\log_2\left(\frac{1}{|A_b|}\right) \\ &= \log_2|A_b| \\ &\ge \log_2(2^{n-1}) = n - 1 \end{aligned}$$
Thus $X_{\text{bad}}$ satisfies Property 1 ($H_\infty(X_{\text{bad}}) \ge n - 1$).

**2. Verify Property 2 (output probability contradiction, general $n$).**
By definition of $A_b = \operatorname{Ext}^{-1}(b)$:
$$\forall x \in A_b:\ \operatorname{Ext}(x) = b$$
Because $X_{\text{bad}}$ takes values exclusively in $A_b$:
$$\Pr[\operatorname{Ext}(X_{\text{bad}}) = b] = 1$$
However, extracting a perfectly uniform bit requires:
$$\Pr[\operatorname{Ext}(X_{\text{bad}}) = b] = \frac{1}{2}$$
Since $1 \neq \frac{1}{2}$, the candidate deterministic extractor fails on $X_{\text{bad}}$ even though $H_\infty(X_{\text{bad}}) \ge n - 1$. $\blacksquare$

