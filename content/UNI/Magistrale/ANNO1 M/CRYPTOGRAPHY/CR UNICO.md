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
We know that $\operatorname{Enc}(k,m)=k\oplus m$ and $\operatorname{Dec}(k,c)=k\oplus c$, so substituting gives $\operatorname{Dec}(k,\operatorname{Enc}(k,m)) = k\oplus(k\oplus m)$.

> [!tip]- XOR properties
> ![[CR_UNICO_xor_properties.svg|540]]

Let $\Pi=(\operatorname{Enc},\operatorname{Dec})$ be the One-Time Pad scheme over $\{0,1\}^{\ell}$. For every $k,m\in\{0,1\}^{\ell}$, we have:
$$\begin{aligned} \operatorname{Dec}(k,\operatorname{Enc}(k,m)) &= k\oplus(k\oplus m)\\ &= (k\oplus k)\oplus m\\ &= 0^\ell\oplus m\\ &= m \end{aligned}$$
The second equality follows from associativity, the third from the self-inverse property, and the fourth from the identity property of XOR. Since the equality holds for arbitrary $k$ and $m$, the One-Time Pad satisfies correctness. $\square$

#### OTP perfect secrecy proof strategy
Because we know that perfect secrecy can also be demonstrated using statement **(iii)** of Theorem 1.1:
$$\forall m_0,m_1\in\mathcal M,\ \forall c\in\mathcal C: \qquad \Pr_K[\operatorname{Enc}(K,m_0)=c] = \Pr_K[\operatorname{Enc}(K,m_1)=c]$$
in the One-Time Pad we have $C = K \oplus M$, where $K$ is chosen uniformly at random from $\{0,1\}^{\ell}$, independently of $M$.

Let $m_0,m_1\in\{0,1\}^{\ell}$ be arbitrary plaintexts and let $c\in\{0,1\}^{\ell}$ be an arbitrary ciphertext. For each plaintext $m_i$, the equation $K\oplus m_i=c$ holds exactly when $K=c\oplus m_i$. Since $K$ is uniformly distributed over $\{0,1\}^{\ell}$, we obtain:
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

