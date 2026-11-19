## First model of a cryptographic scheme
Alice and Bob share a secret key $k$. Alice uses this key to encrypt her message, and Bob uses the same key to recover it. We have two important properties:
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
This is used to express Shannon's definition using encryption-algorithm terms. If an encryption scheme is perfectly secret, the distribution of its ciphertexts must not reveal which plaintext was encrypted. The probability that a message $m$ outputs a ciphertext $c$ should be the same as for any other message, because we do not want any hint from it:
$$\boxed{\begin{aligned} \forall m_0,m_1\in\mathcal M,\ \forall c\in\mathcal C:\\ \Pr_K[\operatorname{Enc}(K,m_0)=c] = \Pr_K[\operatorname{Enc}(K,m_1)=c] \end{aligned}}$$

$P_0$ is the probability that the encryption of the plaintext $0$, given a random key from the set $\mathcal{K}$, outputs a ciphertext $0$; instead, $P_1$ is the same probability but with plaintext $1$ and ciphertext $0$. What I notice is that if $\operatorname{Enc}(k,m)=m$ for all $k\in\mathcal{K}$ and all $m\in\mathcal{M}$, we can say that the probabilities are respectively $1$ for the first one (because $K$ does not affect the encryption algorithm) and $0$ for $P_1$ (because if we input plaintext $1$, we always get $1$ and not $0$). The two probabilities are different, so perfect secrecy is not respected, because we want the probability distributions to be the same.

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

