###### why we need PRFs
regards the previous lecture pseudorandom generator(PRG)
where c=G(k) xor m
Alice and Bob share a short key k the PRG expands it into a larger one with a pseudorandom string G(k) which is used as a one-time pad

its a one time pad so we cannot safely reuse the same pad for multiple encryptions
why?

the objective is to construct an encryption scheme where Alice and Bob share one short key but can securely encrypt many messages
A PRG takes a seed and produces a one longer pseudorandom string
instead a PRF takes a key and an additional input:
F_k(x) after fixing k we can evaluate F_k on many different inputs x. 
>[!info] Formal definition of a PRF
>is a family of efficiently computable functions
>F={formula here}

is deterministic once we fixed a key
The crucial difference is that we can evaluate the same keyed function on many different inputs without changing the key


###### Two experiments to define PRF security
we have an adversary that has a goal to distinguish a real PRF from a truly random function
the challenger answer the adversary query and set up the ideal or the real game
![[Pasted image 20261116134742.jpg]]
in the real game the challenger chooses a random secret key k and answers queries using Fk(x)
in the ideal game the challenger chooses a uniformly random function R from all functions mapping n-bit strings to n-bit strings and answers with R(x)
also this random function is also deterministic
the family F is a PRF if every probabilistic polynomial-time adversary has only a neglegible distinguishing advantage:
|Pr[A^Fk(1^lambda)=1]- ... continue the formula
![[Pasted image 20261116140003.png]]
##### Truly random function better explaination
|R(n,n)|=(2^n)^2n    a truly random function is chosen uniformly from this set in general with n-bit inputs and outputs
this set is enormous and Alice and Bob should agree to use it
instead we can use PRF to share only a short key and independently calculate Fk(x)

###### Doesn't the ideal game require exponential time?
in the ideal game, the challenger theoretically samples an entire random function
we don't actually need the whole table
the adversary can make only a polynomially many queries and use lazy sampling technique

How the ideal challenger works
Initially, the challenger has an empty table.
When the adversary queries a new input x , the challenger samples a uniformly random output y and stores (x,y) .
If the adversary queries the same x again, the challenger returns the stored value.
This produces exactly the same observable behavior as a uniformly sampled random function, without constructing the entire function.

with an outbound adversary we have no prf secured against this computational unbounds The intuition is that a PRF's possible
PRF functions are restricted by its key space. for a lambda bit key there are at most 2^lambda different keyed functions
An unrestricted adversary can enumerate all keys and compare their outputs with the oracle's behavior. 
PRF relies on computational limitations so we can write that
Game real F,A(lambda) circa c Game ideal F,A (lambda)
computational indistinguishability

###### Doubts to integrate before explaining CPA
## Why do we need PRFs?

In the previous lecture, we studied **Pseudorandom Generators (PRGs)** and their application to secret-key encryption.

A PRG is a deterministic algorithm that takes a short seed (k) and expands it into a longer pseudorandom bit string (G(k)).

We constructed an encryption scheme using:

[ \operatorname{Enc}_k(m)=G(k)\oplus m ]

Alice and Bob share a short secret key (k). The PRG generates a longer pseudorandom string, which is used as a pad to encrypt the message.

**Important:** The PRG itself is not an encryption scheme. We construct encryption using the output of the PRG.

### The problem: reusing the same pad

This construction provides one-time security, but it is insecure when the same key is used to encrypt multiple messages.

Suppose Alice encrypts two messages using the same key:

[ c_1=G(k)\oplus m_1 ]

[ c_2=G(k)\oplus m_2 ]

An adversary who observes both ciphertexts can calculate:

[ c_1\oplus c_2=m_1\oplus m_2 ]

The pseudorandom pad disappears, revealing information about the relationship between the plaintexts.

If the adversary knows one plaintext, they can recover the other.

**Our objective:** Construct an encryption scheme in which Alice and Bob share one short secret key but can securely encrypt multiple messages.

To achieve this, the professor introduces a new cryptographic building block: **Pseudorandom Functions (PRFs)**.

## What is a PRF?

Unlike a PRG, which takes only a seed, a PRF takes two inputs:

[ F(k,x)=F_k(x) ]

- (k): The secret key.
- (x): The input to the function.
- (F_k(x)): The output of the function selected by (k).

The key idea is that **the same secret key can be used to evaluate the function on many different inputs**.

For example, keeping (k) fixed:

[ F_k(x_1)=y_1 ]

[ F_k(x_2)=y_2 ]

[ F_k(x_3)=y_3 ]

Different inputs can produce different pseudorandom-looking outputs. However, distinct inputs are not guaranteed to have distinct outputs.

A PRF is deterministic:

[ F_k(x)=F_k(x) ]

Whenever we use the same key and the same input, we obtain the same output.

**Important:** A PRF is not an encryption scheme. It is a cryptographic primitive that we can use to construct an encryption scheme.

### Formal definition

A PRF is a family of efficiently computable functions:

[ \mathcal F= \left{ F_k:{0,1}^n\rightarrow{0,1}^n \right}_{k\in{0,1}^{\lambda}} ]

Where:

- (\mathcal F): The family of functions.
- (k): A secret key of length (\lambda).
- (F_k): The particular function selected by fixing (k).
- (n): The input and output length in bits.
- (\lambda): The security parameter.

For each choice of (k), we obtain a deterministic function (F_k).

The function must also satisfy a pseudorandomness security property.

## PRF security: Real and ideal games

The professor defines PRF security using two experiments involving an adversary and a challenger.

### The participants

**Adversary (\mathcal A)**

The adversary is a probabilistic polynomial-time (PPT) algorithm whose objective is to distinguish a PRF from a uniformly random function.

It can choose inputs, query the challenger, observe outputs, and finally output a guess.

**Challenger (\mathcal C)**

The challenger sets up the experiment and answers the adversary's queries according to the rules of either the real or ideal game.

### Real game

1. The challenger randomly chooses a secret key:
    
    [ k\gets U_\lambda ]
    
2. The adversary chooses an input (x\in{0,1}^n).
    
3. The challenger replies:
    
    [ y=F_k(x) ]
    
4. The adversary may repeat this process polynomially many times.
    

### Ideal game

1. The challenger chooses a uniformly random function:
    
    [ R\gets\mathcal R(n,n) ]
    
2. The adversary chooses an input (x\in{0,1}^n).
    
3. The challenger replies:
    
    [ y=R(x) ]
    
4. The adversary may repeat this process polynomially many times.
    

The interface is identical in both games. The adversary does not know which function the challenger is using.

### What does it mean for a PRF to be secure?

A function family (\mathcal F) is a secure PRF if every PPT adversary has negligible distinguishing advantage between the two games.

Formally:

## [ \left| \Pr[\mathcal A^{F_k}(1^\lambda)=1]

\Pr[\mathcal A^R(1^\lambda)=1] \right| \leq\operatorname{negl}(\lambda) ]

Here, (\mathcal A^{F_k}) and (\mathcal A^R) indicate that the adversary has oracle access to the corresponding function.

The probabilities include the random choices of the key or function and the adversary's randomness.

We can write:

[ \operatorname{Game}^{real}_{\mathcal F,\mathcal A}(\lambda) \approx_c \operatorname{Game}^{ideal}_{\mathcal F,\mathcal A}(\lambda) ]

The symbol (\approx_c) denotes **computational indistinguishability**.

This does not mean that the functions are mathematically identical. It means that no efficient adversary can distinguish them with non-negligible advantage.

## Truly random functions

A truly random function (R) is selected uniformly from the set of all functions mapping (n)-bit inputs to (n)-bit outputs.

Importantly, **a random function is still deterministic once selected**.

For example:

[ R(0011)=1010 ]

If the adversary queries (R(0011)) again, the output must still be (1010).

### How many random functions exist?

For an (n)-bit input, there are (2^n) possible inputs.

Each input can be mapped to any of the (2^n) possible outputs.

Therefore:

[ \boxed{ |\mathcal R(n,n)|=(2^n)^{2^n} } ]

This is a doubly exponential number of possible functions.

Representing one arbitrary random function as a complete input-output table would require (n2^n) bits.

The professor uses this hypothetical random table as an ideal model.

In practice, Alice and Bob would not share such an enormous table. Instead, they can share a short secret key (k) and evaluate (F_k(x)) efficiently.

The PRF security guarantee ensures that, for efficient adversaries, these two ways of answering queries are computationally indistinguishable.

## Doesn't the ideal game require exponential time?

In the ideal game, the challenger theoretically samples an entire random function.

However, constructing the complete table is unnecessary.

The adversary can make only polynomially many queries.

Therefore, the challenger can use **lazy sampling**.

### Lazy sampling

1. Initially, the challenger maintains an empty table.
2. When the adversary queries a new input (x), the challenger samples a uniformly random output (y).
3. It stores the pair ((x,y)).
4. If the same input is queried again, the challenger returns the previously stored output.

This produces exactly the same observable behavior as a uniformly chosen random function.

The challenger only needs to store the inputs actually queried by the adversary, making the simulation efficient for polynomially many queries.

## Why are computational restrictions important?

The PRF security definition considers only PPT adversaries.

The professor gives the exercise that, in the standard setting, PRFs are not secure against computationally unbounded adversaries.

The intuition is based on the number of possible functions.

With a (\lambda)-bit key, there are at most:

[ 2^\lambda ]

different keyed functions in the PRF family.

In contrast, there are:

[ (2^n)^{2^n} ]

possible functions from (n)-bit strings to (n)-bit strings.

In the standard parameter setting, the PRF family represents only a tiny fraction of all possible functions.

An unbounded adversary can enumerate all possible keys and compare the corresponding functions against the oracle's behavior.

With sufficiently many queries, it can distinguish the keyed family from a uniformly random function with significant advantage.

Therefore, PRF security relies on computational limitations.

|PRG|PRF|
|---|---|
|\(G(k)\)|\(F_k(x)\)|
|Expands a short seed into a longer pseudorandom string|Evaluates a keyed function on an input|
|Deterministic|Deterministic|
|Not itself encryption|Not itself encryption|

Both are cryptographic building blocks, not complete encryption schemes.
---

## From PRFs to CPA security

Now that we have introduced PRFs, we want to use them to construct an encryption scheme that supports multiple messages under the same secret key.

However, **PRF security and encryption security are different concepts**.

- A PRF provides pseudorandom-looking function evaluations.
- An encryption scheme provides encryption and decryption algorithms.
- CPA security defines what it means for an encryption scheme to remain secure against chosen-plaintext attacks.

A PRF does not automatically provide CPA-secure encryption.

In the next part of the lecture, the professor will use a PRF to construct a randomized encryption scheme and prove its CPA security.

## CPA security: Motivation

Until now, our previous encryption construction was secure only for a single message.

We now want Alice and Bob to encrypt many messages using the same short secret key without revealing information about the plaintexts.

A **Chosen Plaintext Attack (CPA)** is an attack scenario in which the adversary can:

- Choose arbitrary plaintext messages.
- Ask the challenger to encrypt those messages using a secret key.
- Observe the resulting ciphertexts.

All encryption queries use the same secret key.

The adversary's objective is to distinguish which of two chosen challenge messages was encrypted, even after observing other encryptions.

This motivates the formal CPA security game introduced in slides 4–5.


##### CPA Security
We have introduced a PRF, which can generate pseudorandom-looking outputs from a shared key and different inputs.

But how can we use this tool to build secure encryption?

Before constructing an encryption scheme, the professor needs to define what secure encryption for multiple messages actually means.

This brings us to CPA security.
CPA stands for Chosen Plaintext Attack
The idea is that the adversary is more powerful than in the previous one-time encryption game it can request encryption of arbitrary messages using the same secret key
then it tries to distinguish which of two chosen messages has been encrypted
###### The CPA security game
(make an svg of this and delete the image)
![[Pasted image 20261116221423.png]]
The encryption scheme is CPA-secure if the adversary cannot distinguish the two experiments with non-negligible advantage:

\[ \boxed{ \operatorname{Game}^{cpa}_{\Pi,\mathcal A}(\lambda,0) \approx_c \operatorname{Game}^{cpa}_{\Pi,\mathcal A}(\lambda,1) } \]

Suppose our encryption algorithm is deterministic:

\[ \operatorname{Enc}_k(m)=c \]

This means encrypting the same message twice with the same key always gives the same ciphertext.

The adversary can exploit this.

Example attack

1. The adversary requests the encryption of \(m_0\), receiving \(c_0\).
    
2. It submits two different challenge messages \(m_0\) and \(m_1\).
    
3. The challenger returns the challenge ciphertext \(c^*\).
    
4. The adversary compares \(c^*\) with \(c_0\).
    

If they are equal, the challenge encrypted \(m_0\). Otherwise, it encrypted \(m_1\).

For correct deterministic encryption, this attack succeeds with probability 1.

The professor's solution is to introduce randomness:

\[ \boxed{ c=\operatorname{Enc}_k(m;r) } \]

Here \(r\) is fresh randomness sampled for each encryption.

The encryption of the same message can now produce different ciphertexts.

Importantly, randomized encryption isn't automatically CPA-secure. We still need to construct and prove a secure scheme.

###### Use PRF but with fresh randomness
\[ \boxed{ \operatorname{Enc}_k(m)=(r,F_k(r)\oplus m) } \]
where \(r\gets U_n\) is freshly sampled for each encryption and \(m\) is an \(n\)-bit message.

|Element|Purpose|
|---|---|
|\(k\)|Secret key shared between Alice and Bob|
|\(r\)|Fresh random input for the PRF|
|\(F_k(r)\)|Pseudorandom pad|
|\(m\)|Message to encrypt|
|\((r,F_k(r)\oplus m)\)|Complete ciphertext|

Notice that \(r\) is public in this construction. It is included in the ciphertext so Bob can recompute the same pad using his secret key.

Decryption is:

\[ \operatorname{Dec}_k(r,c_2)=F_k(r)\oplus c_2 \]

Because XORing twice with the same pad cancels it, Bob recovers \(m\).

###### Theorem: Proving CPA Security 
we want to prove that the CPA game works with the previous one algorithm

Assuming \(\mathcal F\) is a secure PRF family, the encryption scheme \(\Pi=(\operatorname{Enc},\operatorname{Dec})\) defined above is CPA-secure (with a sufficiently large random-input space).
we want to show:

\[ \boxed{G(\lambda,0)\approx_c G(\lambda,1)} \]

Here, \(G(\lambda,b)\) is our CPA game, where the challenge encrypts \(m_b^*\).

The idea is replacing the PRF with a random function
This is the central idea of the proof.

We already know that a secure PRF is computationally indistinguishable from a truly random function.

So the professor asks:

What happens if we temporarily replace \(F_k\) with a truly random function \(R\)?
We introduce two kinds of experiments.
(make an svg of this two game one in the left explained and one in the right)
Game G

Original encryption

\[ c=(r,F_k(r)\oplus m) \]

Uses our PRF \(F_k\).

Game H

Hypothetical encryption

\[ c=(r,R(r)\oplus m) \]

Uses a truly random function \(R\).

Notice that everything else remains the same.

The adversary can still request encryptions before and after the challenge. The challenger still samples a fresh \(r\) for every encryption.

The only difference is whether we compute \(F_k(r)\) or \(R(r)\).

If \(r\) has never been used before, \(R(r)\) is a fresh uniformly random bit string, independent of previous outputs.

Therefore:

\[ c_2=R(r)\oplus m \]

behaves exactly like a one-time pad with a fresh random pad.

And we already know that a one-time pad provides perfect secrecy when the pad is uniformly random and used only once.

The professor divides the proof into two lemmas.
![[Pasted image 20261116231243.png]]
This gives us:

\[ \boxed{ G(\lambda,0) \approx_c H(\lambda,0) \approx_s H(\lambda,1) \approx_c G(\lambda,1) } \]

Let's understand the two lemmas.

Lemma 1 — Computational indistinguishability

\[ G(\lambda,b)\approx_c H(\lambda,b) \]

We use PRF security to prove that replacing \(F_k\) with \(R\) cannot be detected by an efficient adversary.

Lemma 2 — Statistical indistinguishability

\[ H(\lambda,0)\approx_s H(\lambda,1) \]

We prove that the ideal experiments are statistically close because a fresh random pad hides the challenge message, except when a random-input collision occurs.
Here, \(\approx_s\) means the games are statistically indistinguishable: even an adversary with unlimited computational power cannot distinguish them with more than negligible advantage, provided the number of encryption queries is polynomially bounded.
