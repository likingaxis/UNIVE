In the past, cryptography followed a trial-and-error approach:

- Design a cipher.
- Try to break it.

Modern cryptography aims for **provable security**. We want to:

- Define mathematically what it means for a system to be secure.
- State the assumptions of our model explicitly.
- Prove that the system satisfies the security definition under those assumptions.

## Confidentiality and integrity

**Confidentiality:** Alice sends a message $m$ to Bob. An eavesdropper, Eve, may observe the ciphertext but should learn no additional information about the plaintext.

![[CR_L1_confidentiality.svg|640]]

> [!question] My initial intuition
> Eve receives only the ciphertext rather than the original message. Is that enough to guarantee confidentiality? The security definition below makes this intuition precise.

**Integrity:** Eve tries to change the message from $m$ to $m'$, with $m'\ne m$. Bob must detect the alteration rather than accept the modified message as authentic.

![[CR_L1_integrity.svg|640]]

## Secret-Key Encryption

Secret-Key Encryption (SKE), also called symmetric encryption, is a model for encryption in which Alice and Bob share the same secret key $k$.

![[CR_L1_ske.svg|627]]

Alice uses this key to encrypt the message, and Bob uses the same key to decrypt the ciphertext.

The model uses three sets:

- $\mathcal K$: the **key space**, containing all possible keys.
- $\mathcal M$: the **message space**, containing all possible plaintexts.
- $\mathcal C$: the **ciphertext space**, containing all possible ciphertexts.

Our encryption scheme consists of two algorithms:

$$
\Pi=(\operatorname{Enc},\operatorname{Dec}).
$$

The encryption algorithm has the form

$$
\operatorname{Enc}:\mathcal K\times\mathcal M\to\mathcal C.
$$

It takes a key from the key space and a message from the message space, then produces a ciphertext in $\mathcal C$.

An example using XOR:

![[CR_L1_xor_example.svg|640]]

The decryption algorithm performs the reverse operation:

$$
\operatorname{Dec}:\mathcal K\times\mathcal C\to\mathcal M.
$$

### Correctness

The first requirement is **correctness**: Bob must recover exactly the message Alice sent.

$$
\forall k\in\mathcal K,\ \forall m\in\mathcal M:\qquad
\operatorname{Dec}(k,\operatorname{Enc}(k,m))=m.
$$

Correctness alone does not establish security.

### Perfect Secrecy

Informally, Shannon's definition says that an encryption scheme achieves perfect secrecy if observing the ciphertext gives an adversary no additional information about the plaintext.

To formalize this, recall the posterior probability

$$
\Pr[M=m\mid C=c].
$$

This is the probability that the original message was $m$, given that Eve observed ciphertext $c$.

### Perfect Secrecy(formal) Shannon definition

Let:

- $\mathcal M$ be the set of possible messages.
- $M$ be a random variable with any probability distribution over $\mathcal M$.
- $K$ be a uniformly random key over $\mathcal K$, independent of $M$.
- $C=\operatorname{Enc}(K,M)$ be the resulting ciphertext random variable.

The scheme $\Pi$ is **perfectly secret** if, for every distribution of $M$, every $m\in\mathcal M$ and every $c\in\mathcal C$ with $\Pr[C=c]>0$,

$$
\Pr[M=m\mid C=c]=\Pr[M=m].
$$

Eve's probability for a particular plaintext remains the same after she observes the ciphertext. The condition $\Pr[C=c]>0$ is necessary because conditioning on an event with probability zero is undefined.

### Unconditional vs Computational Security

> A cryptographic scheme is unconditionally secure if its security does not depend on limitations in the adversary's computational power.

Consider two attackers:

- **Eve A** has a normal computer and limited computational resources.
- **Eve B** has unlimited computational power, memory and time.

If a scheme achieves unconditional security, Eve B does not gain an advantage merely from having more computational resources. Perfect secrecy is the specific mathematical definition of unconditional confidentiality studied here.

![[Pasted image 20261105105833.png|335]]

## The equivalence theorem of perfect secrecy

We already know Shannon's definition, but how can we prove that a particular encryption scheme satisfies perfect secrecy?

We could calculate the conditional probabilities directly, but this is not always convenient.

We use an equivalence theorem: the following three properties are equivalent, with (i) and (ii) required for every distribution of the message random variable $M$.

**(i) Perfect secrecy**

$$
\Pr[M=m\mid C=c]=\Pr[M=m]
$$

Observing the ciphertext doesn't change the probability of the plaintext.

**(ii) Independence of $M$ and $C$**

$$
I(M;C)=0
$$

The plaintext and ciphertext are statistically independent.

**(iii) Equal ciphertext probabilities**

$$
\Pr[\operatorname{Enc}(K,m)=c] =\Pr[\operatorname{Enc}(K,m')=c]
$$

For any two fixed plaintexts, the probability of producing a given ciphertext is the same, with the probability taken over the random key.
Let's understand what each statement actually means.

### Statement (i): Perfect Secrecy

If Eve believes Alice sends "YES" with a probability of 80%, intercepting a ciphertext must not change that probability.

$$
\Pr[M=\text{YES}\mid C=c]=0.8
$$

### Statement (ii): M and C are independent

This statement describes the same security property from a statistical perspective.

Recall that two random variables $X$ and $Y$ are independent when:

$$
\Pr[X=x,Y=y]=\Pr[X=x]\Pr[Y=y]
$$

Applied to cryptography:

$$
\boxed{\Pr[M=m,C=c]=\Pr[M=m]\Pr[C=c]}
$$

This means that learning which ciphertext was produced doesn't provide information about which message was encrypted.

The professor also writes:

$$
I(M;C)=0
$$

Here, $I(M;C)$ is called mutual information.

Mutual information measures how much information two random variables share.

If it is zero, they are statistically independent.

### Statement (iii): Equal ciphertext probabilities

This is the statement we will use to prove OTP security.

$$
\boxed{ \Pr[\operatorname{Enc}(K,m)=c] = \Pr[\operatorname{Enc}(K,m')=c] }
$$

Let's interpret it carefully.

Imagine we fix two different messages:

$$
m=0,\qquad m'=1
$$

And choose a particular ciphertext:

$$
c=1
$$

The theorem says that the probability of encrypting $m=0$ into $c=1$ must equal the probability of encrypting $m'=1$ into $c=1$.

But where does the randomness come from?

From the secret key $K$, which is selected uniformly at random.

For example, let's consider the encryption operation:

$$
\operatorname{Enc}(k,m)=k\oplus m
$$

Here, $\oplus$ is XOR, which we'll use for the One-Time Pad.

| Secret key $k$ | Message $m$ | Ciphertext $c=k\oplus m$ |
| --- | --- | --- |
| 0 | 0 | 0 |
| 1 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 1 | 0 |

Assume the key is uniformly random:

$$
\Pr[K=0]=\Pr[K=1]=\frac12
$$

Now fix the ciphertext $c=1$.

For $m=0$:

$$
\Pr[\operatorname{Enc}(K,0)=1]=\frac12
$$

For $m'=1$:

$$
\Pr[\operatorname{Enc}(K,1)=1]=\frac12
$$

Both plaintexts have the same probability of producing that ciphertext.

This also holds for ciphertext $c=0$.

Therefore, this one-bit encryption scheme satisfies statement (iii).

And because the three statements are equivalent, it also satisfies Perfect Secrecy.

The main advantage is that we don't always need to work directly with conditional probabilities to prove security.

We can instead show that:

$$
\forall m,m'\in\mathcal M,\ \forall c\in\mathcal C:
$$

$$
\Pr[\operatorname{Enc}(K,m)=c] = \Pr[\operatorname{Enc}(K,m')=c]
$$

If this property holds, then Perfect Secrecy follows from the theorem.

## One time Pad

The One-Time Pad (OTP) is the first concrete symmetric encryption scheme studied in this lecture. It operates on binary strings using a uniformly random secret key and the XOR operation.

> [!question] How does XOR work?
> XOR outputs $1$ when the two input bits differ, and $0$ when they are equal.
>
> ![[CR_L1_xor_table.svg|340]]

We define the three spaces as follows:

$$
\mathcal K=\mathcal M=\mathcal C=\{0,1\}^{\ell}
$$

The notation $\{0,1\}^{\ell}$ represents the set of all binary strings of length $\ell$.

For example, with $\ell=2$:

$$
\{0,1\}^2=\{00,01,10,11\}
$$

The encryption and decryption algorithms are

$$
\operatorname{Enc}(k,m)=k\oplus m,
\qquad
\operatorname{Dec}(k,c)=k\oplus c.
$$

The secret key $K$ is selected uniformly at random, independently of the plaintext.

Encryption and decryption use the same XOR operation.

### Proving correctness

We want to show that $\operatorname{Dec}(k,\operatorname{Enc}(k,m))=m$.

**Step 1: Substitute the encryption algorithm.**

$$
\operatorname{Dec}(k,\operatorname{Enc}(k,m))
=\operatorname{Dec}(k,k\oplus m).
$$

**Step 2: Apply the decryption algorithm.**

$$
\operatorname{Dec}(k,k\oplus m)=k\oplus(k\oplus m).
$$

**Step 3: Use associativity of XOR.**

$$
k\oplus(k\oplus m)=(k\oplus k)\oplus m=0^\ell\oplus m=m.
$$

Here, $k\oplus k=0^\ell$ is the all-zero string of length $\ell$, and XOR with that string leaves $m$ unchanged. Therefore,

$$
\boxed{\operatorname{Dec}(k,\operatorname{Enc}(k,m))=m.}
$$

### Proving perfect secrecy

We use statement (iii) of the equivalence theorem.
Recall that statement (iii) requires:

$$
\Pr[\operatorname{Enc}(K,m)=c] = \Pr[\operatorname{Enc}(K,m')=c]
$$

For every pair of messages $m,m'$ and every ciphertext $c$.

**Step 1: Fix a message and a ciphertext.**

Choose any $m\in\mathcal M$ and $c\in\mathcal C$. We want to calculate $\Pr[\operatorname{Enc}(K,m)=c]$: $K$ is random, while $m$ and $c$ are fixed.

**Step 2: Substitute the OTP encryption algorithm.**

Since $\operatorname{Enc}(K,m)=K\oplus m$:

$$
\Pr[K\oplus m=c]
$$

**Step 3: Isolate the random key.**

By the properties of XOR, $K\oplus m=c$ is equivalent to $K=c\oplus m$. Hence,

$$
\Pr[K\oplus m=c]=\Pr[K=c\oplus m].
$$

**Step 4: Use the uniform distribution of $K$.**

The key space contains $2^\ell$ possible keys, all equally likely.

Therefore, the probability of selecting any particular key is:

$$
\Pr[K=k]=\frac{1}{2^\ell}
$$

Consequently:

$$
\boxed{\Pr[\operatorname{Enc}(K,m)=c]=2^{-\ell}}
$$

Now consider any other plaintext $m'$.

By the same reasoning:

$$
\boxed{\Pr[\operatorname{Enc}(K,m')=c]=2^{-\ell}}
$$

Both probabilities are equal.

Thus:

$$
\Pr[\operatorname{Enc}(K,m)=c] = \Pr[\operatorname{Enc}(K,m')=c]
$$

This proves statement (iii).

And because of the Equivalence Theorem:

$$
\boxed{\text{OTP achieves Perfect Secrecy.}}
$$

### Limitations

OTP has two important limitations:

1. **The key must be as long as the message:** $|k|=|m|=\ell$. Encrypting 1 Gb requires a 1 Gb key.
2. **The key must be used only once.**

Suppose Alice encrypts two messages with the same secret key:

$$
c_1=k\oplus m_1,\qquad c_2=k\oplus m_2.
$$

Eve can intercept both ciphertexts and calculate $c_1\oplus c_2$. Substituting the encryption equations:

$$
c_1\oplus c_2=(k\oplus m_1)\oplus(k\oplus m_2)
$$

Rearranging the terms:

$$
c_1\oplus c_2=(k\oplus k)\oplus(m_1\oplus m_2)
$$

Since the two copies of the key cancel each other:

$$
\boxed{c_1\oplus c_2=m_1\oplus m_2}
$$

Eve has discovered a relationship between the original messages without knowing the secret key.

This doesn't necessarily reveal both plaintexts immediately, but it leaks information and can make recovering them much easier.

It also means that the Perfect Secrecy guarantee for a single properly encrypted message cannot simply be extended to multiple messages encrypted with the same OTP key.

That is why it's called the One-Time Pad.

## Proof of the Equivalence Theorem

Why are the three definitions mathematically equivalent? We prove the three implications below.

> [!info] Recall of the theorem
> ![[Pasted image 20261105115840.png]]

![[CR_L1_equivalence.svg|640]]

### First implication: (i) $\Rightarrow$ (ii)

We assume perfect secrecy:

$$
\Pr[M=m\mid C=c]=\Pr[M=m].
$$

We want to prove that $M$ and $C$ are statistically independent.

#### Step 1: Recall conditional probability

From probability theory:

$$
\Pr[A\mid B]=\frac{\Pr[A\cap B]}{\Pr[B]}
$$

In our case, when $\Pr[C=c]>0$:

$$
\Pr[M=m\mid C=c] = \frac{\Pr[M=m,C=c]}{\Pr[C=c]}
$$

The numerator is the probability that both events occur: Alice sends $m$ and the resulting ciphertext is $c$.

#### Step 2 — Apply Perfect Secrecy

By our assumption:

$$
\Pr[M=m] = \frac{\Pr[M=m,C=c]}{\Pr[C=c]}
$$

Multiply both sides by $\Pr[C=c]$:

$$
\boxed{ \Pr[M=m]\Pr[C=c]=\Pr[M=m,C=c] }
$$

But this is exactly the definition of independence!

If $\Pr[C=c]=0$, the equality also holds, because both sides are zero.
Therefore:

$$
\boxed{\text{Perfect Secrecy}\implies M\perp C}
$$

The symbol $\perp$ means statistically independent.

Intuition: If observing the ciphertext doesn't change the probability of the plaintext, then knowing the ciphertext cannot provide statistical information about the plaintext.

### Second implication: (ii) $\Rightarrow$ (iii)

We assume that $M\perp C$ and want to prove that

$$
\Pr[\operatorname{Enc}(K,m)=c]
=\Pr[\operatorname{Enc}(K,m')=c].
$$

> [!warning] Proof detail to review
> The conditional probability $\Pr[C=c\mid M=m]$ below is defined only when $\Pr[M=m]>0$, and similarly for $m'$. Check with the tutor how the hypothesis that (ii) holds for every message distribution lets us justify the argument for arbitrary messages. The original proof steps are retained below.

#### Step 1 — Start from encryption

Consider:

$$
\Pr[\operatorname{Enc}(K,m)=c]
$$

Remember that $m$ is a fixed plaintext, while $K$ is random.

We can rewrite this probability as:

$$
\Pr[C=c\mid M=m]
$$

Why?

Because $C=\operatorname{Enc}(K,M)$.

If we condition on $M=m$, the encryption algorithm receives the fixed message $m$. The randomness still comes from $K$, since the key was generated independently of the message.

Therefore:

$$
\Pr[\operatorname{Enc}(K,m)=c] = \Pr[C=c\mid M=m]
$$

#### Step 2 — Use statistical independence

By hypothesis (ii), $M$ and $C$ are independent.

Consequently:

$$
\Pr[C=c\mid M=m]=\Pr[C=c]
$$

Combining the equations:

$$
\boxed{ \Pr[\operatorname{Enc}(K,m)=c]=\Pr[C=c] }
$$

#### Step 3 — Repeat for another plaintext

Now consider a different plaintext $m'$.

By exactly the same reasoning:

$$
\Pr[\operatorname{Enc}(K,m')=c]=\Pr[C=c]
$$

Therefore, both probabilities are equal to the same value:

$$
\boxed{ \Pr[\operatorname{Enc}(K,m)=c] = \Pr[\operatorname{Enc}(K,m')=c] }
$$

We've proven statement (iii).

We haven't proved that the two messages produce the same ciphertext using the same fixed key.

Instead, we proved that when the key is randomly selected, the probability of producing any particular ciphertext does not depend on which plaintext was chosen.

This is exactly the property we used to prove OTP security.

### Third implication: (iii) $\Rightarrow$ (i)

We assume that, for every $m,m'\in\mathcal M$ and every $c\in\mathcal C$,

$$
\Pr[\operatorname{Enc}(K,m)=c]
=\Pr[\operatorname{Enc}(K,m')=c].
$$

We want to prove:

$$
\Pr[M=m\mid C=c]=\Pr[M=m]
$$

The professor first proves an intermediate result:

$$
\boxed{\Pr[C=c\mid M=m]=\Pr[C=c]}
$$

Then he uses Bayes' theorem to obtain Perfect Secrecy.

#### Step 1 — Calculate the probability of ciphertext c

Consider:

$$
\Pr[C=c]
$$

This is the probability that the encryption algorithm produces ciphertext $c$, considering all possible plaintexts.

How do we calculate it?

By adding the contributions of every possible plaintext.

This is called the Law of Total Probability:

$$
\Pr[C=c] = \sum_{m'\in\mathcal M} \Pr[C=c\mid M=m']\Pr[M=m']
$$

> [!example]- Example
> For example, if our only messages are `0` and `1`:
>
> $$
> \begin{aligned}
> \Pr[C=c]={}& \Pr[C=c\mid M=0]\Pr[M=0]\\
> &+\Pr[C=c\mid M=1]\Pr[M=1]
> \end{aligned}
> $$

#### Step 2 — Replace ciphertext generation with encryption

We know that:

$$
C=\operatorname{Enc}(K,M)
$$

Therefore:

$$
\Pr[C=c\mid M=m'] = \Pr[\operatorname{Enc}(K,m')=c]
$$

Substituting:

$$
\Pr[C=c] = \sum_{m'\in\mathcal M} \Pr[\operatorname{Enc}(K,m')=c]\Pr[M=m']
$$

#### Step 3 — Apply hypothesis (iii)

Here comes the key reasoning.

Hypothesis (iii) tells us that the probability of producing $c$ is the same for every plaintext.

Therefore, we can replace $m'$ with any fixed message $m$:

$$
\Pr[C=c] = \sum_{m'\in\mathcal M} \Pr[\operatorname{Enc}(K,m)=c]\Pr[M=m']
$$

Notice that:

$$
\Pr[\operatorname{Enc}(K,m)=c]
$$

doesn't depend on $m'$, so we can move it outside the summation:

$$
\Pr[C=c] = \Pr[\operatorname{Enc}(K,m)=c] \sum_{m'\in\mathcal M}\Pr[M=m']
$$

But the probabilities of all possible messages must sum to 1:

$$
\sum_{m'\in\mathcal M}\Pr[M=m']=1
$$

So:

$$
\Pr[C=c] = \Pr[\operatorname{Enc}(K,m)=c]
$$

And because the latter equals $\Pr[C=c\mid M=m]$ when that conditional probability is defined, we have:

$$
\boxed{\Pr[C=c]=\Pr[C=c\mid M=m]}
$$

We have established the intermediate result.

#### Step 4 — Apply Bayes' theorem

We now want to prove Perfect Secrecy.

Bayes' theorem tells us:

$$
\Pr[M=m\mid C=c] = \frac{ \Pr[C=c\mid M=m]\Pr[M=m] }{ \Pr[C=c] }
$$

We just proved that:

$$
\Pr[C=c\mid M=m]=\Pr[C=c]
$$

Substitute this into Bayes' theorem:

$$
\Pr[M=m\mid C=c] = \frac{ \Pr[C=c]\Pr[M=m] }{ \Pr[C=c] }
$$

For $\Pr[C=c]>0$, the terms cancel:

$$
\boxed{ \Pr[M=m\mid C=c]=\Pr[M=m] }
$$

For messages with zero prior probability, both sides are also zero.

This is exactly Shannon's definition of perfect secrecy.

We have proved (iii) ⇒ (i).
