## Can we invent a different perfectly secret encryption algorithm with shorter keys?

So far, we have studied OTP, where $\operatorname{Enc}(k,m)=k\oplus m$ and the key is as long as the message: $|k|=|m|$.

Can a different perfectly secret encryption scheme use shorter keys? **Shannon's theorem** answers this question:

$$
\boxed{|\mathcal K|\geq|\mathcal M|}
$$

For any perfectly secret Secret-Key Encryption scheme, the number of possible keys must be at least the number of possible messages.

Here, $|\mathcal K|$ and $|\mathcal M|$ are the **numbers of possible keys and messages**, rather than the bit lengths of individual keys and messages.

> [!example]- For example, if Alice can send any 3-bit message:
>
> $$
> \mathcal M=\{0,1\}^3
> $$
>
> There are eight possible messages:
>
> $$
> |\mathcal M|=2^3=8
> $$
>
> Shannon's theorem tells us:
>
> $$
> |\mathcal K|\geq 8
> $$
>
> Therefore, if our keys are fixed-length binary strings, we need at least 3 bits to represent eight distinct keys.
>
> More generally, for an $\ell$-bit message space, the key needs at least $\ell$ bits in this fixed-length binary setting.

Shannon's theorem explains why a perfectly secret encryption scheme must have at least as many possible keys as possible plaintexts.

Suppose we have four possible plaintexts, $m_1,m_2,m_3,m_4$, and three possible keys, $k_1,k_2,k_3$.

Eve intercepts a ciphertext $c$ with $\Pr[C=c]>0$.

Since decryption is deterministic, decrypting the same ciphertext with the same key always produces the same plaintext.

Therefore, if Eve tries decrypting $c$ using every possible key, she can obtain at most three different plaintexts.

Because there are four possible plaintexts, at least one plaintext cannot be obtained by decrypting $c$ with any possible key.

Let's call that plaintext $m_4$.

Assuming Alice selects messages uniformly:

$$
\Pr[M=m_4]=\frac14
$$

However, after observing $c$, Eve knows that $m_4$ is impossible:

$$
\Pr[M=m_4\mid C=c]=0
$$

This violates the definition of Perfect Secrecy:

$$
\Pr[M=m\mid C=c]=\Pr[M=m]
$$

Because:

$$
0\neq\frac14
$$

Thus, the encryption scheme cannot achieve Perfect Secrecy.

The important insight is that Eve doesn't need to recover the original plaintext to break Perfect Secrecy. Eliminating even one previously possible plaintext already reveals information.

![[CR_L2_shannon.svg|640]]

### Formal proof of Shannon's theorem

**Step 1: Assume the opposite of what we want to prove.**

Suppose a perfectly secret SKE exists with

$$
|\mathcal K|<|\mathcal M|
$$

Fix a uniform message distribution and a ciphertext $c$ with $\Pr[C=c]>0$.

**Step 2: Define the set of possible decryptions.**

$$
\mathcal M'= \{\operatorname{Dec}(k,c):k\in\mathcal K\}
$$

This notation means: take the ciphertext $c$, decrypt it using every possible key, and collect all the resulting plaintexts.

Because each key produces only one decryption result:

$$
|\mathcal M'|\leq|\mathcal K|
$$

And because we assumed $|\mathcal K|<|\mathcal M|$:

$$
|\mathcal M'|<|\mathcal M|
$$

**Step 3: Find a missing plaintext.**

There must be at least one message:

$$
m\in\mathcal M\setminus\mathcal M'
$$

In other words, a message belonging to the message space but not to the set of possible decryptions of $c$.

By correctness, that message could not have produced $c$.

Therefore:

$$
\Pr[M=m\mid C=c]=0
$$

But because $M$ is uniformly distributed:

$$
\Pr[M=m]=\frac{1}{|\mathcal M|}>0
$$

This contradicts Perfect Secrecy.

Hence:

$$
\boxed{|\mathcal K|\geq|\mathcal M|}
$$

## Game-Based Perfect Secrecy

So far, we have defined Perfect Secrecy using probabilities:

$$
\Pr[M=m\mid C=c]=\Pr[M=m]
$$

The professor now introduces an alternative way to describe the same security property: a game between an adversary and a challenger.

A security game is a mathematical experiment describing what an attacker can observe, which actions they can perform and what it means to distinguish two situations.

There are two participants:

- The **challenger** simulates the encryption system and knows the secret key.
- The **adversary $\mathcal A$** attempts to distinguish which plaintext was encrypted.

The adversary may have unlimited computational power because we are still studying perfect secrecy.

Fix two candidate messages $m_0,m_1\in\mathcal M$. A bit $b\in\{0,1\}$ determines which message is encrypted:

$$
c=\operatorname{Enc}(k,m_b).
$$

In Game 0, the challenger encrypts $m_0$; in Game 1, the challenger encrypts $m_1$. The adversary observes the resulting ciphertext and outputs a bit $b'$.

![[Pasted image 20261105162802.png]]

In both games, the adversary knows the two candidate messages but does not know which key was selected.
Can Eve distinguish Game 0 from Game 1 by examining the ciphertext?
If the encryption scheme is perfectly secret, the ciphertext should not help Eve determine whether $m_0$ or $m_1$ was encrypted.

### Formal definition

For every adversary $\mathcal A$ and every pair of messages $m_0,m_1\in\mathcal M$, the security condition is:

$$
\boxed{ \left| \Pr[b'=1:\operatorname{Game}_{\mathcal A}(1)] - \Pr[b'=1:\operatorname{Game}_{\mathcal A}(0)] \right|=0 }
$$

Let's interpret it.
The first term is the probability that the adversary outputs $1$ in Game 1; the second is the probability that it outputs $1$ in Game 0.

> [!warning] Editorial correction: zero difference
> It is the **difference between these probabilities** that must be zero. The individual probabilities need not be zero; they must be equal.

In other words:

$$
\Pr[b'=1\mid b=1]=\Pr[b'=1\mid b=0]
$$

Here the probabilities are taken over the random key and any randomness used by the adversary.

This means that Eve's output must not depend statistically on which game she is playing.

The games are indistinguishable.

## Message authenticaton Codes(MAC)

So far, we have studied **confidentiality**: how Alice can send a message to Bob without Eve learning its contents. We now introduce a second security property: **integrity**.

We'll study a new cryptographic primitive called a Message Authentication Code (MAC).
A cryptographic primitive is a fundamental cryptographic mechanism designed to provide a specific security functionality.
In our lectures, we've encountered two examples:

| Cryptographic primitive           | Main purpose                         |
| --------------------------------- | ------------------------------------ |
| SKE (Secret-Key Encryption)       | Confidentiality                      |
| MAC (Message Authentication Code) | Integrity and message authentication |

Encryption focuses on confidentiality and does not necessarily guarantee integrity.

Imagine Alice sends Bob a message:

> Transfer €100 to account A.

Eve intercepts the communication and attempts to replace it with:

> Transfer €1,000 to account B.

How can Bob determine whether the received message is authentic?

This is the problem MACs are designed to solve.

A MAC allows Bob to verify that a received message was authenticated by someone who knows the shared secret key and has not been modified without detection.

### How does a MAC work?

As with Secret-Key Encryption, Alice and Bob share a secret key:

$$
k\in\mathcal K
$$

But instead of encrypting the message, Alice computes an additional value called an authentication tag.

The professor defines a deterministic algorithm:

$$
\boxed{\operatorname{Tag}:\mathcal K\times\mathcal M\to\mathcal T}
$$

Here, $\mathcal K$ is the key space, $\mathcal M$ the message space, and $\mathcal T$ the tag space. The algorithm takes a key $k$ and a message $m$ and returns an authentication tag $\tau$.

![[CR_L2_mac_transmission.svg|618]]

Alice has a message $m$ and a secret key $k$.

She computes:

$$
\tau=\operatorname{Tag}(k,m)
$$

Alice transmits the pair:

$$
\boxed{(m,\tau)}
$$

**The message is sent in the clear.**

This means Eve can read $m$. The MAC does not encrypt the message or provide confidentiality.

Bob receives a pair $(m',\tau')$, which might have been modified during transmission.

Because Bob knows the secret key $k$, he can calculate:

$$
\tau_{\text{expected}}=\operatorname{Tag}(k,m')
$$

Then he checks:

$$
\boxed{\tau_{\text{expected}}\stackrel{?}{=}\tau'}
$$

If they match, Bob accepts the message as valid. Otherwise, he rejects it.
Imagine Eve intercepts:

$$
(m,\tau)
$$

She can read both values because they're transmitted in the clear.

Suppose she replaces the original message with:

$$
m'\neq m
$$

She now needs to produce a valid authentication tag $\tau'$ for the new message.

In other words, Eve needs:

$$
\boxed{\tau'=\operatorname{Tag}(k,m')}
$$

But there's a problem: Eve doesn't know the secret key $k$.

Notice that Eve knowing $(m,\tau)$ is part of the security scenario. The MAC must remain secure even with that information.
A deterministic algorithm always returns the same output for the same inputs.

For a MAC:

$$
\operatorname{Tag}(k,m)=\tau
$$

If we use the same $k$ and the same $m$, we always obtain the same $\tau$.

This is why Bob can independently recompute the tag and compare it with the received tag.
We have not yet defined mathematically what makes a MAC secure. If Eve changes the message and creates a valid tag for it, Bob will accept a forged message as authentic. This attack is called **MAC forgery**.

![[CR_L2_mac_forgery.svg|594]]

A secure MAC should make this attack very unlikely.
But how unlikely?
The parameter $\varepsilon$ gives an upper bound on the probability of a successful forgery.

> [!example]- For example:
>
> |Value of $\varepsilon$|Maximum forgery probability|
> |---|---|
> |$2^{-8}$|1/256 ≈ 0.39%|
> |$2^{-80}$|Approximately $8.27\times10^{-25}$|
> |$2^{-128}$|Approximately $2.94\times10^{-39}$|

The smaller $\varepsilon$ is, the stronger the guarantee.
Unlike Perfect Secrecy, which required an information-leakage measure to be exactly zero, MAC security allows a very small, nonzero probability of successful forgery.

### Formal definition

$$
\operatorname{Tag}:\mathcal K\times\mathcal M\to\mathcal T
$$

The MAC is one-time $\varepsilon$-statistically secure if, for every pair of distinct messages $m,m'$ and every pair of tags $\tau,\tau'$, with the conditioning event having positive probability:

$$
\boxed{ \Pr[ \operatorname{Tag}(K,m')=\tau' \mid \operatorname{Tag}(K,m)=\tau ]\leq\varepsilon }
$$

The key $K$ is uniformly random, and the same key is used in both $\operatorname{Tag}$ expressions.
Why is it called one-time security?

Because this definition considers Eve observing one legitimate message-tag pair generated with the secret key.

If Alice authenticates multiple messages using the same key, this particular security guarantee does not automatically apply.

### Exercises

#### Exercise 1: Why is $\varepsilon=0$ impossible?

Suppose our tag space is:

$$
\mathcal T=\{00,01,10,11\}
$$

There are four possible tags.

Eve chooses a different message $m'\neq m$ and simply guesses a tag uniformly at random.

Even without knowing anything about the key, her probability of guessing correctly is:

$$
\Pr[\text{successful forgery}] =\frac{1}{|\mathcal T|} =\frac14
$$

For any fixed secret key, exactly one of the four guesses matches the correct tag.

Therefore, even a completely random guess has a positive probability of success.

In general:

$$
\boxed{\varepsilon\geq\frac{1}{|\mathcal T|}>0}
$$

A secure MAC can make forgery extremely unlikely, but cannot make the success probability of every possible forgery attempt exactly zero when the tag space is finite and there are distinct messages to forge.

#### Exercise 2: Why is OTP insecure as a MAC?

Remember that OTP encryption is:

$$
\operatorname{Enc}(k,m)=k\oplus m
$$

It provides Perfect Secrecy when used correctly.

But what happens if we use the same operation as a MAC?

Suppose we define:

$$
\boxed{\operatorname{Tag}(k,m)=k\oplus m}
$$

At first glance, it might look reasonable.

However, Eve is given both the message $m$ and its tag $\tau$.

Therefore:

$$
\tau=k\oplus m
$$

Eve can calculate:

$$
\boxed{k=\tau\oplus m}
$$

Eve has recovered the secret key.

She can now choose any different message $m'$ and compute:

$$
\tau'=k\oplus m'
$$

This will always be a valid tag.

Therefore:

$$
\boxed{\Pr[\text{successful forgery}]=1}
$$

The MAC is completely insecure.

#### Exercise 3: The professor's alternative game

The one-time MAC forgery game proceeds as follows:

1. The challenger selects a uniformly random secret key $k$.

2. Eve chooses a message $m$.

3. The challenger returns $\tau=\operatorname{Tag}(k,m)$.

4. Eve outputs a forged pair $(m',\tau')$.

5. Eve wins if $m'\neq m$ and $\operatorname{Tag}(k,m')=\tau'$.

The security requirement is:

$$
\boxed{\forall\mathcal A,\quad\Pr[\mathrm{WIN}]\leq\varepsilon}
$$

where $\mathcal A$ represents any adversary, even one with unlimited computational resources.

> [!warning] My review priority before lesson 3
> Re-read the whole hashing section below: I did not understand it well. Revisit the definition of a keyed hash family and pairwise independence before moving on.

## Can we construct a MAC that is provably secure, even against an adversary with unlimited computational power?

The professor introduces **hash function families** as a way to construct statistically secure one-time MACs.

A hash function maps an input message to an output value in a tag space. Hash functions often have shorter outputs, but the notation below only specifies the input and output spaces:

$$
h:\mathcal M\to\mathcal T.
$$

Consider a simple illustrative mapping:

![[CR_L2_hash_mapping.svg|620]]

> [!example]- Original reference image
> ![[Pasted image 20261105170949.png]]

If everyone knows the function $h$, Eve can calculate its output for any message.

Therefore, simply computing a public hash of a message does not provide a secure MAC.

We need the selected hash function to depend on a secret key. We therefore use a **keyed hash family**:

$$
\boxed{\mathcal H=\{h_k:\mathcal M\to\mathcal T\}_{k\in\mathcal K}}
$$

Let's understand this notation.

- $\mathcal H$: a family (collection) of hash functions.
- $h_k$: a particular hash function selected by key $k$.
- $\mathcal M$: the set of possible input messages.
- $\mathcal T$: the set of possible output tags.
- $\mathcal K$: the set of possible keys.

In other words, the secret key determines which hash function Alice and Bob use.

For example, imagine four different functions:

$$
\mathcal H=\{h_{00},h_{01},h_{10},h_{11}\}
$$

If Alice and Bob select the secret key $k=10$, they use $h_{10}$.

Alice computes:

$$
\tau=h_{10}(m)
$$

Bob uses the same function to verify the received message-tag pair.

Eve knows the entire family $\mathcal H$, but she doesn't know which key was selected.

Notice how similar this is to Secret-Key Encryption: we have a publicly known algorithm and a secret key.

### Pairwise indipendency

A family $\mathcal H$ is **pairwise independent** if, for every pair of distinct messages $m\ne m'$, the two outputs

$$
h_K(m),\quad h_K(m')
$$

are jointly uniformly distributed over:

$$
\mathcal T\times\mathcal T
$$

where $K$ is selected uniformly at random.

A consequence useful for MAC security is:

$$
\boxed{ \Pr[h_K(m')=\tau'\mid h_K(m)=\tau] =\frac{1}{|\mathcal T|} }
$$

The professor states the definition in terms of the joint distribution:

For any two different messages $m,m'$ and any two tags $\tau,\tau'$, pairwise independence requires:

$$
\boxed{ \Pr[ h_K(m)=\tau\ \land\ h_K(m')=\tau' ] = \frac{1}{|\mathcal T|^2} }
$$

Why $|\mathcal T|^2$?

Because we're considering two output tags.

If the tag space contains $N$ values, there are:

$$
N\times N=N^2
$$

possible ordered pairs of tags.

**Jointly uniformly distributed** means that, for two fixed, distinct input messages, every ordered pair of output tags has exactly the same probability as the key $K$ varies uniformly.

> [!warning] Editorial clarification: what is random?
> We evaluate the **same randomly selected function $h_K$** on two distinct messages. The two outputs are random variables because $K$ is random; we are not independently choosing two hash functions.

Pairwise independence requires every pair to be equally likely.

This also implies that each individual hash output is uniformly distributed over $\mathcal T$.

### Connecting it to MAC security

Recall our one-time MAC security definition:

$$
\Pr[ \operatorname{Tag}(K,m')=\tau' \mid \operatorname{Tag}(K,m)=\tau ]\leq\varepsilon
$$

The professor suggests defining the MAC as:

$$
\boxed{\operatorname{Tag}(k,m)=h_k(m)}
$$

Now, because the hash family is pairwise independent:

$$
\begin{aligned} &\Pr[h_K(m')=\tau'\mid h_K(m)=\tau]\\[4pt] &=\frac{ \Pr[h_K(m')=\tau'\land h_K(m)=\tau] }{ \Pr[h_K(m)=\tau] } \end{aligned}
$$

The numerator equals $1/|\mathcal T|^2$, and the denominator equals $1/|\mathcal T|$.

Therefore:

$$
\Pr[h_K(m')=\tau'\mid h_K(m)=\tau]
=\frac{1/|\mathcal T|^2}{1/|\mathcal T|}.
$$

Which simplifies to:

$$
\boxed{\Pr[h_K(m')=\tau'\mid h_K(m)=\tau]=\frac{1}{|\mathcal T|}}.
$$

We have obtained exactly the security guarantee we wanted.

Thus, a pairwise independent hash family gives us a one-time statistically secure MAC with:

$$
\boxed{\varepsilon=\frac{1}{|\mathcal T|}}
$$

This is the key result connecting pairwise independence to the MAC security definition.
