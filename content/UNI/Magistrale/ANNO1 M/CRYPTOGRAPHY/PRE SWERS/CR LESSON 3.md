# Lesson 3 — Pairwise Independence and Randomness Extraction

## Recall: pairwise independent hash functions

Alice wants to send a message $m$ to Bob with an authentication tag $\tau$.
The tag is computed using a secret key $k$:

$$
\tau=\operatorname{Tag}_k(m)
$$

An adversary may observe a valid message–tag pair, but should not be able to produce a valid tag for a different message, except with a small probability.
The professor's first objective is to construct a family of hash functions with a mathematical property called pairwise independence.

### The construction of a family

Let $p$ be a large public prime number.

We define:

$$
\boxed{h_{a,b}(m)=(a\cdot m+b)\bmod p}
$$

where:

- $m\in\mathbb Z_p$ is the message.

- $a,b\in\mathbb Z_p$ are chosen independently and uniformly at random.

- $k=(a,b)$ is the secret key.

- $h_{a,b}(m)\in\mathbb Z_p$ is the tag.

Therefore:

$$
\mathcal M=\mathcal T=\mathbb Z_p \qquad \mathcal K=\mathbb Z_p^2
$$

Pairwise independence means that, for every two distinct messages $m\neq m'$, and any two possible tags $\tau,\tau'$, we require:

$$
\boxed{ \Pr_{a,b}\left[ h_{a,b}(m)=\tau \;\land\; h_{a,b}(m')=\tau' \right] =\frac{1}{p^2} }
$$

### Proof that the affine hash family is pairwise independent

Fix $m,m'\in\mathbb Z_p$ with $m\ne m'$, and tags $\tau,\tau'\in\mathbb Z_p$. The only randomness comes from the choice of $a$ and $b$.
We start with:

$$
\Pr_{a,b}\left[ h_{a,b}(m)=\tau \land h_{a,b}(m')=\tau' \right]
$$

Using the definition:

$$
h_{a,b}(m)=am+b\pmod p
$$

Substituting this into the joint event gives:

$$
=\Pr_{a,b}\left[ \begin{array}{l} am+b\equiv\tau\pmod p\\ \land\\ am'+b\equiv\tau'\pmod p \end{array} \right]
$$

Both equations must hold, so we can write the event as a system:

$$
\begin{cases} am+b=\tau\\ am'+b=\tau' \end{cases} \qquad\text{in }\mathbb Z_p
$$

We can rewrite this system in matrix form:

$$
\Pr_{a,b}\left[ \underbrace{ \begin{pmatrix} m&1\\ m'&1 \end{pmatrix}}_{A} \begin{pmatrix} a\\b \end{pmatrix} = \begin{pmatrix} \tau\\\tau' \end{pmatrix} \right]
$$

We have:

$$
A\begin{pmatrix}a\\b\end{pmatrix} = \begin{pmatrix}\tau\\\tau'\end{pmatrix}
$$

We would like to multiply both sides by $A^{-1}$:

$$
\begin{pmatrix}a\\b\end{pmatrix} = A^{-1} \begin{pmatrix}\tau\\\tau'\end{pmatrix}
$$

However, we can only do this if the inverse matrix exists.

That is why the professor checks the determinant.

Our matrix is:

$$
A= \begin{pmatrix} m&1\\ m'&1 \end{pmatrix}
$$

The determinant is $\det(A)=m-m'$. Since $m\ne m'$ in $\mathbb Z_p$:

$$
m-m'\not\equiv0\pmod p
$$

And because $p$ is prime, every nonzero element of $\mathbb Z_p$ has a multiplicative inverse.

Consequently:

$$
\boxed{A^{-1}\text{ exists in }\mathbb Z_p}
$$

Since $A$ is invertible:

$$
\boxed{ \Pr_{a,b}\left[ \begin{pmatrix}a\\b\end{pmatrix} = \begin{pmatrix} m&1\\m'&1 \end{pmatrix}^{-1} \begin{pmatrix}\tau\\\tau'\end{pmatrix} \right] }
$$

The right-hand side is a fixed vector, which we call $(a_0,b_0)$. It is the unique solution of the system for the fixed messages and tags.

We choose $a$ and $b$ independently and uniformly at random:

$$
a\xleftarrow{\$}\mathbb Z_p \qquad b\xleftarrow{\$}\mathbb Z_p
$$

Therefore, for any fixed $a_0,b_0$:

$$
\Pr[a=a_0]=\frac1p
$$

$$
\Pr[b=b_0]=\frac1p
$$

By independence:

$$
\Pr[(a,b)=(a_0,b_0)] = \frac1p\cdot\frac1p
$$

So:

$$
\boxed{\Pr[(a,b)=(a_0,b_0)]=\frac1{p^2}}
$$

We have proved:

$$
\boxed{ \Pr_{a,b}\left[ h_{a,b}(m)=\tau\land h_{a,b}(m')=\tau' \right]=\frac1{p^2} }
$$

for every $m\neq m'$ and every $\tau,\tau'$.

Therefore:

$$
\boxed{\mathcal H\text{ is pairwise independent.}\quad\square}
$$

## Theorem: pairwise independence implies one-time MAC security

Every pairwise independent hash family

$$
\mathcal H=\{h_k:\mathcal M\to\mathcal T\}_{k\in\mathcal K}
$$

defines a one-time $\varepsilon$-statistically secure MAC, where:

$$
\boxed{\varepsilon=\frac{1}{|\mathcal T|}}
$$

For any fixed new message and candidate tag, the probability of a correct guess is:

$$
\frac{1}{|\mathcal T|}
$$

This remains true even after observing one valid message–tag pair.

### Express the property as a probability and calculate it

Fix distinct messages $m,m'$ and tags $\tau,\tau'$:

$$
\boxed{ \Pr_K[h_K(m')=\tau'\mid h_K(m)=\tau] }
$$

What is the probability that the adversary's new tag is correct, given that the previous tag is known?

We apply the conditional-probability formula:

$$
\Pr[A\mid B]=\frac{\Pr[A\land B]}{\Pr[B]}
$$

where:

$$
A=\{h_K(m')=\tau'\},\qquad B=\{h_K(m)=\tau\}
$$

Substituting these events gives:

$$
\Pr_K[h_K(m')=\tau'\mid h_K(m)=\tau]
$$

$$
= \frac{ \Pr_K[h_K(m')=\tau'\land h_K(m)=\tau] }{ \Pr_K[h_K(m)=\tau] }
$$

By pairwise independence, the numerator is $1/|\mathcal T|^2$. For the affine construction above, $|\mathcal T|=p$, so this is $1/p^2$.

The denominator is the probability that a uniformly selected key produces the specific tag $\tau$ for message $m$.

Pairwise independence gives:

$$
\Pr_K[h_K(m)=\tau\land h_K(m')=\tau'] =\frac{1}{|\mathcal T|^2}
$$

for every possible $\tau'$. To obtain the marginal probability of the first event, sum over all possible values of the second tag. These events are disjoint and cover every possible second output:

$$
\Pr_K[h_K(m)=\tau] = \sum_{\tau'\in\mathcal T} \frac{1}{|\mathcal T|^2}
$$

Since there are $|\mathcal T|$ possible tags:

$$
=\frac{|\mathcal T|}{|\mathcal T|^2}
$$

$$
\boxed{ \Pr_K[h_K(m)=\tau]=\frac{1}{|\mathcal T|} }
$$

Substituting the numerator and denominator into the conditional probability:

$$
\Pr_K[h_K(m')=\tau'\mid h_K(m)=\tau] = \frac{1/|\mathcal T|^2}{1/|\mathcal T|}
$$

$$
\boxed{\Pr_K[h_K(m')=\tau'\mid h_K(m)=\tau]=\frac{1}{|\mathcal T|}}
$$

Therefore, the MAC is one-time statistically secure with:

$$
\boxed{\varepsilon=\frac{1}{|\mathcal T|}\qquad\square}
$$

This proof shows that observing one valid message–tag pair reveals no information about the tag of a different message.
Before observing a valid tag, the adversary's probability of correctly guessing a tag for a particular message is:

$$
\Pr[h_K(m')=\tau']=\frac{1}{|\mathcal T|}
$$

After observing one valid pair, the probability remains:

$$
\Pr[h_K(m')=\tau'\mid h_K(m)=\tau] =\frac{1}{|\mathcal T|}
$$

### Why does this construction not ensure two-time security?

We proved that if an adversary observes only one valid message–tag pair, they cannot forge a tag for a different message with probability greater than:

$$
\varepsilon=\frac1p
$$

However, the professor now asks:

What happens if the adversary observes two valid message–tag pairs instead of one?
Suppose Alice authenticates two distinct messages using the same secret key.

The adversary observes:

$$
(m_1,\tau_1) \qquad (m_2,\tau_2)
$$

where:

$$
m_1\neq m_2
$$

Since both tags were generated using the same key $(a,b)$:

$$
\tau_1=h_{a,b}(m_1)
$$

$$
\tau_2=h_{a,b}(m_2)
$$

Substituting the definition of our hash function:

$$
\boxed{ \begin{cases} am_1+b\equiv\tau_1\pmod p\\ am_2+b\equiv\tau_2\pmod p \end{cases} }
$$

Notice that the adversary now knows everything in these equations except $a$ and $b$.

As in the previous proof, the matrix is invertible because the messages are distinct. Solving gives:

$$
\boxed{ \begin{pmatrix}a\\b\end{pmatrix} = \begin{pmatrix} m_1&1\\ m_2&1 \end{pmatrix}^{-1} \begin{pmatrix} \tau_1\\\tau_2 \end{pmatrix} }
$$

This time, the adversary knows both tags and can calculate the key directly.

Suppose the adversary chooses a third message:

$$
m_3\neq m_1,m_2
$$

Since they have recovered $a$ and $b$, they can compute:

$$
\tau_3=am_3+b\pmod p
$$

This is exactly the tag that Alice would generate. Consequently, the adversary can forge valid tags for arbitrary new messages in the message space.

The probability of a successful forgery is now:

$$
\boxed{\Pr[\text{Successful forgery}]=1}
$$

### Can we improve the construction to fix this problem?

The professor proposes using a three-wise independent hash family instead of a pairwise independent one.

The intuition is that we could introduce another unknown coefficient:

$$
h_{a,b,c}(m)=am^2+bm+c\pmod p
$$

This polynomial is an illustrative expansion of the professor's three-coefficient idea.

Now our key is:

$$
K=(a,b,c)\in\mathbb Z_p^3
$$

But there's a problem.

Our secret key has become longer!

Previously:

$$
K\in\mathbb Z_p^2
$$

Now:

$$
K\in\mathbb Z_p^3
$$

If we continue this approach, authenticating more messages requires more coefficients and therefore more key material.

This illustrates a general limitation stated by the professor: a $t$-time, $2^{-\lambda}$-statistically secure MAC requires a key length of at least

$$
\boxed{(t+1)\lambda\text{ bits}}
$$

Here:

- $t$ is the number of valid message–tag pairs the adversary may observe.

- $\lambda$ is the security parameter.

- $2^{-\lambda}$ is the desired upper bound on forgery probability.

The important conclusion is that the required key length grows linearly with the number of authenticated messages.

This motivates the transition to computational security, which will allow practical MAC constructions with short, reusable keys.

## Randomness Extraction

So far, we have assumed that cryptographic keys are sampled uniformly at random, for example:

$$
K\xleftarrow{\$}\mathcal K
$$

How can we obtain this high-quality randomness from real-world sources?

Computers are deterministic machines. Given the same initial state and inputs, a deterministic computation produces the same output. However, real systems can observe unpredictable physical phenomena, such as:

- Thermal noise in electronic components.

- Timing variations in system events.

- Unpredictable user interactions, such as keyboard or mouse activity.

These can provide some randomness, but their outputs are not necessarily uniformly distributed.

For instance, some values may occur more frequently than others.

These are called **imperfect sources of randomness**. Can we transform their outputs into something close to uniformly random bits?

### Process behind real-world randomness generation

The professor describes three components.

**1. Extraction.** Start with an imperfect random source $X$ and extract approximately uniform bits from it. This operation is called randomness extraction.

**2. Expansion.** Once we have extracted a short sequence of approximately uniform bits, can we use it to generate a longer sequence?

The professor explains that a deterministic algorithm cannot create additional true randomness beyond what is contained in its input.

However, using computational cryptography, we can generate pseudorandom bits.

These bits are not statistically equivalent to truly uniform random bits, but they can be indistinguishable from random bits to computationally bounded adversaries.

**3. Refresh.** Incorporate fresh randomness into the internal state.

Without any additional randomness, the adversary might be able to predict future outputs.

For this reason, real-world systems can incorporate fresh randomness into their internal state.

### Randomness Extraction in a formal way

Suppose we have a random variable:

$$
X\in\{0,1\}^n
$$

Here, $X$ represents our imperfect source of randomness.

We would like to design a deterministic function:

$$
\operatorname{Ext}:\{0,1\}^n\rightarrow\{0,1\}^{\ell}
$$

such that:

$$
\boxed{\operatorname{Ext}(X)\text{ is uniformly distributed}}
$$

What does this mean?

We want the output of $\operatorname{Ext}$ to behave like a uniformly random $\ell$-bit string, even though the original source is imperfect.

Without assumptions on the source, a simple counterexample shows that this is impossible:

> [!example] Suppose our source is constant:
>
> $$
> X=0^n
> $$
>
> Meaning that the source always produces the same string of $n$ zeros.
>
> Therefore:
>
> $$
> \Pr[X=0^n]=1
> $$
>
> Because $\operatorname{Ext}$ is deterministic, applying it to the same input must always produce the same output:
>
> $$
> \operatorname{Ext}(0^n)=c
> $$
>
> for some fixed string $c$.
>
> Consequently:
>
> $$
> \Pr[\operatorname{Ext}(X)=c]=1
> $$
>
> The output is constant, not uniformly random (for $\ell\geq1$).
>
> Conclusion: We cannot extract randomness from a completely predictable source.

How can we mathematically measure the amount of unpredictability contained in a source?

### Min-entropy

For a discrete random variable $X$, its min-entropy is:

$$
\boxed{ H_\infty(X)=-\log_2\left(\max_x\Pr[X=x]\right) }
$$

For each possible value $x$, consider the probability $\Pr[X=x]$. Taking the maximum identifies the most likely outcome: the best single guess for the entire source value. The negative base-2 logarithm expresses this worst-case unpredictability in bits.

Smaller maximum probability → larger min-entropy → greater unpredictability.

> [!example]- Three examples of min-entropy
>
> **Constant source.** If $X=0^n$ with probability $1$, then $p_{\max}=1$ and
>
> $$
> H_\infty(X)=-\log_2(1)=0.
> $$
>
> There is no unpredictability.
>
> **Uniform source.** If $X\sim U_n$, all $2^n$ strings have probability $2^{-n}$, so
>
> $$
> H_\infty(X)=-\log_2(2^{-n})=n.
> $$
>
> This is the maximum possible min-entropy for an $n$-bit source.
>
> **Imperfect source.** Suppose the first bit is always $0$ and the remaining $n-1$ bits are independent and uniform. There are $2^{n-1}$ equally likely outputs, so
>
> $$
> H_\infty(X)=-\log_2(2^{-(n-1)})=n-1.
> $$
>
> For $n=4$, these are $0000,0001,0010,0011,0100,0101,0110,0111$. In this particular example, we can extract the random bits simply by discarding the first bit. Real-world sources need not have such a convenient structure.
>

### Assumption of entropy

Now we reach the mathematical condition used throughout the rest of the lecture.

The professor assumes that we know:

$$
\boxed{H_\infty(X)\geq k}
$$

for some $k<n$.

Let's transform this expression step by step.

Starting with:

$$
-\log_2(p_{\max})\geq k
$$

Multiply both sides by $-1$, reversing the inequality:

$$
\log_2(p_{\max})\leq-k
$$

Exponentiate both sides with base 2:

$$
p_{\max}\leq2^{-k}
$$

Therefore:

$$
\boxed{ H_\infty(X)\geq k \iff \max_x\Pr[X=x]\leq2^{-k} }
$$

## Theorem: Impossibility of deterministic randomness extraction

If a source contains a lot of unpredictability, can we always extract uniformly random bits from it using a deterministic function?
There is no deterministic extractor

$$
\operatorname{Ext}:\{0,1\}^n\rightarrow\{0,1\}
$$

that outputs a uniformly random bit for every source $X$ satisfying:

$$
\boxed{H_\infty(X)\geq n-1}
$$

Remember that the maximum possible min-entropy for an $n$-bit source is $n$.
And we are asking for only one uniform bit.

The theorem does not say that deterministic extraction is impossible for every particular source.

For example, if the first bit of $X$ is always zero and all remaining bits are uniform, we can extract randomness simply by discarding the first bit.

The theorem concerns a universal guarantee:

No single deterministic extractor works for every possible distribution having sufficiently high min-entropy.

Take any deterministic function $\operatorname{Ext}:\{0,1\}^n\to\{0,1\}$. We prove the claim by constructing a counterexample:

$$
\forall\operatorname{Ext},\quad \exists X_{\mathrm{bad}}
$$

such that:

$$
H_\infty(X_{\mathrm{bad}})\geq n-1
$$

but:

$$
\operatorname{Ext}(X_{\mathrm{bad}})
$$

is not uniformly distributed.

> [!info]- What does a min-entropy bound tell us?
>
> If $H_\infty(X)=n$ for an $n$-bit source, then $X$ is uniform over all $2^n$ strings: its bits are independent and uniform.
>
> By contrast, $H_\infty(X)\geq n-1$ only guarantees $\max_x\Pr[X=x]\leq2^{-(n-1)}$. It does not identify one predictable bit: min-entropy concerns the best guess for the **entire string**.
>
> For example, let $X$ be uniform over $\{000,011,101,110\}$. Each string has probability $1/4$, so $H_\infty(X)=2=n-1$. Every individual bit is uniform, but the bits are dependent: the third is determined by the first two.

The extractor outputs one bit, so each input maps to either $0$ or $1$. For example, if $n=3$, there are $2^3=8$ possible input strings:

![[CR_L3_deterministic_preimages.svg|616]]

We can define the preimage of zero:

$$
\operatorname{Ext}^{-1}(0) = \{x:\operatorname{Ext}(x)=0\}
$$

And similarly:

$$
\operatorname{Ext}^{-1}(1) = \{x:\operatorname{Ext}(x)=1\}
$$

For the example above:

$$
\operatorname{Ext}^{-1}(0) =\{000,001,010,011,100\}
$$

$$
\operatorname{Ext}^{-1}(1) =\{101,110,111\}
$$

Therefore:

$$
|\operatorname{Ext}^{-1}(0)|=5
$$

$$
|\operatorname{Ext}^{-1}(1)|=3
$$

Choose the output with the largest preimage:

$$
\boxed{ b\in\{0,1\}\text{ such that } b\text{ maximizes }|\operatorname{Ext}^{-1}(b)| }
$$

In our example, $b=0$.

There are $2^n$ possible inputs, and every input belongs to exactly one of the two preimages.

Therefore:

$$
|\operatorname{Ext}^{-1}(0)| + |\operatorname{Ext}^{-1}(1)| =2^n
$$

Since $b$ is chosen to maximize the preimage size:

$$
|\operatorname{Ext}^{-1}(b)| \geq\frac{2^n}{2}
$$

Simplifying:

$$
\boxed{ |\operatorname{Ext}^{-1}(b)|\geq2^{n-1} }
$$

This is an application of the pigeonhole principle.

The professor uses this fact to construct the bad source.

**Construct the bad source.** Define the random variable:

$$
\boxed{ X_{\mathrm{bad}}\sim U(\operatorname{Ext}^{-1}(b)) }
$$

$X_{\mathrm{bad}}$ is uniformly distributed over the preimage of $b$.
In our example, where $b=0$:

$$
X_{\mathrm{bad}}\in \{000,001,010,011,100\}
$$

Each of these five inputs is equally likely:

$$
\Pr[X_{\mathrm{bad}}=x]=\frac15
$$

for every $x$ in that set.

All other inputs have probability zero.

Now calculate the min-entropy of $X_{\mathrm{bad}}$.

Recall the definition:

$$
H_\infty(X) = -\log_2\left(\max_x\Pr[X=x]\right)
$$

We know that $X_{\mathrm{bad}}$ is uniform over:

$$
\operatorname{Ext}^{-1}(b)
$$

Therefore, for every element in this preimage:

$$
\Pr[X_{\mathrm{bad}}=x] = \frac{1}{|\operatorname{Ext}^{-1}(b)|}
$$

Consequently:

$$
\max_x\Pr[X_{\mathrm{bad}}=x] = \frac{1}{|\operatorname{Ext}^{-1}(b)|}
$$

Substituting into the min-entropy definition:

$$
H_\infty(X_{\mathrm{bad}}) = -\log_2\left( \frac{1}{|\operatorname{Ext}^{-1}(b)|} \right)
$$

Using the identity:

$$
-\log_2(1/a)=\log_2(a)
$$

We obtain:

$$
H_\infty(X_{\mathrm{bad}}) = \log_2|\operatorname{Ext}^{-1}(b)|
$$

From the preimage-size bound above:

$$
|\operatorname{Ext}^{-1}(b)|\geq2^{n-1}
$$

Therefore:

$$
H_\infty(X_{\mathrm{bad}}) \geq\log_2(2^{n-1})
$$

Since:

$$
\log_2(2^{n-1})=n-1
$$

We conclude:

$$
\boxed{ H_\infty(X_{\mathrm{bad}})\geq n-1 }
$$

The constructed source satisfies the theorem's min-entropy assumption.

Remember how we constructed $X_{\mathrm{bad}}$.

It is uniformly distributed over:

$$
\operatorname{Ext}^{-1}(b)
$$

By the definition of a preimage, every element $x$ in that set satisfies:

$$
\operatorname{Ext}(x)=b
$$

Therefore, regardless of which value $X_{\mathrm{bad}}$ produces:

$$
\boxed{ \operatorname{Ext}(X_{\mathrm{bad}})=b }
$$

with probability one.

In mathematical notation:

$$
\Pr[\operatorname{Ext}(X_{\mathrm{bad}})=b]=1
$$

The extractor's output is constant!

But a uniformly random bit should satisfy:

$$
\Pr[U_1=0]=\Pr[U_1=1]=\frac12
$$

Our output instead satisfies:

$$
\Pr[\operatorname{Ext}(X_{\mathrm{bad}})=b]=1
$$

So:

$$
\operatorname{Ext}(X_{\mathrm{bad}}) \not\equiv U_1
$$

The output is not uniformly distributed.

We started with an arbitrary deterministic extractor:

$$
\operatorname{Ext}:\{0,1\}^n\to\{0,1\}
$$

We constructed a source $X_{\mathrm{bad}}$ such that:

$$
\underbrace{H_\infty(X_{\mathrm{bad}})\geq n-1}_{\text{High min-entropy}}
$$

But:

$$
\underbrace{\operatorname{Ext}(X_{\mathrm{bad}})=b}_{\text{Constant output}}
$$

Therefore, the extractor fails for at least one source satisfying the required min-entropy condition.

Since we started with any deterministic extractor, this proves that no deterministic extractor can work for all such sources.

$$
\boxed{\text{Theorem proved.}\quad\square}
$$

The problem is that we can construct the source distribution based on the extractor, concentrating all its probability on inputs that produce the same output.

This is why the professor emphasizes the order:

$$
\forall\operatorname{Ext},\quad\exists X_{\mathrm{bad}}
$$

The bad source can depend on the extractor.

> [!example]- A simple example of the proof
>
> For example, suppose:
>
> $$
> \operatorname{Ext}(x)=\text{first bit of }x
> $$
>
> This function works perfectly if the first bit of $X$ is uniformly random.
>
> But suppose our source generates only strings whose first bit is zero, while all other bits are uniformly random.
>
> Then:
>
> $$
> H_\infty(X)=n-1
> $$
>
> Yet:
>
> $$
> \operatorname{Ext}(X)=0
> $$
>
> Always!
>
> The extractor works for some distributions but fails for others.

## Overcoming the impossibility result

We proved that no deterministic function

$$
\operatorname{Ext}:\{0,1\}^n\rightarrow\{0,1\}
$$

can extract a uniformly random bit from every source satisfying:

$$
H_\infty(X)\geq n-1
$$

Why?

Because for any fixed extractor, we can construct a source $X_{\mathrm{bad}}$ that has high min-entropy but always produces the same output.

How can we change our approach to make randomness extraction possible?

### Approach 1: Multiple independent sources

Instead of having only one imperfect random source $X$, suppose we have two:

$$
X_1,\quad X_2
$$

Both contain some unpredictability, and we assume they are independent.

This additional assumption can make extraction possible. The professor calls these constructions two-source extractors.

He mentions this approach but doesn't study it in detail.

### Approach 2: Cryptographic tools

We could use cryptographic hash functions or other constructions, making strong assumptions about their behavior.

This approach can be practical, but it may require idealized assumptions that are not guaranteed by the basic information-theoretic model.

The professor discusses the trade-off between theoretical guarantees and practical implementations.

### Approach 3: Seeded randomness extraction

This is the approach we're going to study.

Instead of using one fixed extractor, we introduce a family of extractors, selected using a random seed.

The professor chooses this approach because it leads to the important Leftover Hash Lemma, which we will prove later in the lecture.

## Seeded Randomness Extraction

Previously, we had a deterministic extractor:

$$
\operatorname{Ext}(x)
$$

The problem was that, once the extractor was fixed, we could construct a bad source specifically for that function.

The professor proposes changing the construction.

Instead of having one extractor, we have a family of functions:

$$
\operatorname{Ext}(s,x)
$$

where:

- $x$ is the input from our imperfect random source.

- $s$ is a random seed that selects which function to use.

Formally:

$$
\boxed{ \operatorname{Ext}: \underbrace{\{0,1\}^d}_{\text{Seed}} \times \underbrace{\{0,1\}^n}_{\text{Source}} \rightarrow \underbrace{\{0,1\}^{\ell}}_{\text{Output}} }
$$

Let's understand each parameter.

|Parameter|Meaning|
|---|---|
|$d$|Number of seed bits|
|$n$|Number of input bits|
|$\ell$|Number of extracted output bits|
|$k$|Minimum min-entropy required from the source|

The seed is sampled uniformly:

$$
S\xleftarrow{\$}\{0,1\}^d
$$

It must also be independent of the source $X$.

Each seed selects a particular function.

For example:

$$
s=00\Rightarrow\operatorname{Ext}(00,x)
$$

$$
s=01\Rightarrow\operatorname{Ext}(01,x)
$$

And so on.

Here's the important intuition:

Previously, the source could be constructed to defeat our one fixed extractor.

Now, if the source is fixed independently of the random seed, it cannot be tailored to the particular extractor that will be selected.

This is how we avoid the previous impossibility argument.

However, merely introducing a seed is not sufficient. We still need a mathematical guarantee that the resulting family works.

![[CR_L3_seeded_family.svg|546]]

But now we're assuming:

$$
S\sim U_d
$$

In other words, we're introducing randomness to extract randomness!

Isn't that circular?

The professor explains why this can still be useful.

### Property 1 — The seed should be short

The seed acts as a catalyst: it helps extract randomness from the imperfect source without supplying all the extracted bits.

Ideally, the output can be longer than the seed:

$$
\ell>d
$$

This is a goal, not a requirement of the formal definition.

### Property 2 — The seed must be public, and the output must remain approximately uniform

Suppose we define:

$$
\operatorname{Ext}(s,x)=s
$$

This ignores $x$ and returns the seed. If $S$ is uniform, so is the output, but nothing has been extracted from $X$.

To rule out this trivial construction, we require the output to remain approximately uniform even when the adversary knows the seed.

If:

$$
\operatorname{Ext}(s,x)=s
$$

and the adversary knows $s$, the output is fully predictable, so this construction fails the security definition.

### Property 3 — The seed is reusable

The professor explains that a public seed can be reused with multiple suitable sources.

The source must remain independent of the seed: a source constructed after learning it to defeat the selected function is outside the standard guarantee.

> [!warning] Review point: seed reuse
> The definition below guarantees extraction for one source independent of the uniform seed. It does not by itself establish that outputs from several extractions with the same seed are jointly close to independent uniform strings. That claim needs additional assumptions on the sources and a separate argument.

### Formal definition of a seeded extractor

We have:

$$
\operatorname{Ext}:\{0,1\}^d\times\{0,1\}^n \rightarrow\{0,1\}^{\ell}
$$

To define a $(k,\varepsilon)$-seeded extractor, take any source $X$ such that:

$$
H_\infty(X)\geq k
$$

We also sample a uniform seed, independently of $X$:

$$
S\sim U_d
$$

Our extracted output is:

$$
\operatorname{Ext}(S,X)
$$

Ideally, we would like it to be uniformly distributed over $\ell$-bit strings:

$$
\operatorname{Ext}(S,X)\equiv U_\ell
$$

Uniform output alone is insufficient: it could simply equal the seed. To capture that the seed is public, consider the joint distribution:

$$
(S,\operatorname{Ext}(S,X))
$$

We want this to behave like:

$$
(S,U_\ell)
$$

where $U_\ell$ is uniform and independent of $S$.

The output should resemble fresh uniform bits even after the adversary sees the seed.

Notice that:

$$
(S,U_\ell)\equiv U_{d+\ell}
$$

because independent uniform strings concatenate to a uniform string. We allow a small statistical error $\varepsilon$ instead of requiring exact equality.

The formal definition becomes:

$$
\boxed{ (S,\operatorname{Ext}(S,X)) \approx_\varepsilon (S,U_\ell) \equiv U_{d+\ell} }
$$

This must hold for every source $X$ satisfying $H_\infty(X)\geq k$, with a fresh uniform seed independent of $X$.

The symbol:

$$
\approx_\varepsilon
$$

means statistical distance at most $\varepsilon$. This is commonly called a **strong seeded extractor**.

### Statistical distance

For random variables $X$ and $Y$ over the same finite domain, statistical distance is:

$$
\boxed{ \operatorname{SD}(X,Y)= \frac12\sum_z \left|\Pr[X=z]-\Pr[Y=z]\right| }
$$

More generally:

$$
X\approx_\varepsilon Y \iff \operatorname{SD}(X,Y)\leq\varepsilon
$$

## The Leftover Hash Lemma (LHL)

We want:

$$
\boxed{ (S,\operatorname{Ext}(S,X)) \approx_\varepsilon (S,U_\ell) }
$$

Pairwise independent hash functions, already used for one-time MACs, also provide this construction.

Let:

$$
\mathcal H= \left\{ h_s:\{0,1\}^n\to\{0,1\}^{\ell} \right\}_{s\in\{0,1\}^d}
$$

be a family of pairwise independent hash functions.

The seed $s$ selects a function from the family. Define:

$$
\boxed{\operatorname{Ext}(s,x)=h_s(x)}
$$

The theorem states that this construction is a $(k,\varepsilon)$-seeded extractor provided that:

$$
\boxed{ k\geq\ell+2\log_2\left(\frac1\varepsilon\right)-2 }
$$

- $k$: Minimum min-entropy of our source.

- $\ell$: Number of random bits we want to extract.

- $\varepsilon$: Maximum allowed statistical distance from uniform.

Rearranging the condition:

$$
\ell\leq k-2\log_2\left(\frac1\varepsilon\right)+2
$$

The margin between the source's min-entropy and the output length is the **min-entropy gap**. To bound statistical distance, the professor first introduces collision probability.

### Auxiliary lemma: collision probability

The professor defines the collision probability of a random variable $Y$ over a finite set $\mathcal Y$:

$$
\boxed{ \operatorname{Col}(Y)= \sum_{y\in\mathcal Y}\Pr[Y=y]^2 }
$$

To interpret the squares, consider two independent samples:

$$
Y,\quad Y'
$$

where $Y'$ is an independent copy of $Y$.

For any particular value $y$:

$$
\Pr[Y=y\land Y'=y]=\Pr[Y=y]^2
$$

because the samples are independent.

Summing over all possible common values gives:

$$
\Pr[Y=Y'] = \sum_{y\in\mathcal Y}\Pr[Y=y]^2
$$

Therefore:

$$
\boxed{\operatorname{Col}(Y)=\Pr[Y=Y']}
$$

Thus, collision probability measures how often two independent samples match. For $Y$ over $\mathcal Y$, the auxiliary lemma applies if:

$$
\boxed{ \operatorname{Col}(Y) \leq\frac1{|\mathcal Y|}(1+4\varepsilon^2) }
$$

then:

$$
\boxed{ \operatorname{SD}(Y,U_{\mathcal Y})\leq\varepsilon }
$$

Here, $U_{\mathcal Y}$ is the uniform distribution over $\mathcal Y$.

Collision probability sufficiently close to the uniform value implies statistical closeness to uniform.

The professor postpones this lemma's proof to the next lecture and assumes it to prove the LHL.

### Proof of the Leftover Hash Lemma

#### Define $Y$

The professor sets:

$$
\boxed{Y=(S,h_S(X))}
$$

where:

$$
S\sim U_d
$$

and $S$ is independent of $X$.

The strong seeded-extractor definition requires:

$$
(S,h_S(X))\approx_\varepsilon U_{d+\ell}
$$

Our goal is therefore exactly:

$$
\operatorname{SD}(Y,U_{d+\ell})\leq\varepsilon
$$

By the auxiliary lemma, it suffices to bound $\operatorname{Col}(Y)$.

#### Introduce an independent copy $Y'$

The professor writes:

$$
Y'=(S',h_{S'}(X'))
$$

Here:

- $S'$ is an independent, uniformly distributed $d$-bit seed.

- $X'$ is an independent copy of $X$.

- All four random variables are sampled with the appropriate independence assumptions.

By the definition of collision probability:

$$
\boxed{ \operatorname{Col}(Y)=\Pr[Y=Y'] }
$$

Now substitute the definitions of $Y$ and $Y'$:

$$
= \Pr[ (S,h_S(X))=(S',h_{S'}(X')) ]
$$

Equality of both components gives:

$$
\boxed{ =\Pr[ S=S' \land h_S(X)=h_{S'}(X') ] }
$$

#### Use the condition $S=S'$

Inside the event, we require:

$$
S=S'
$$

We can therefore replace $S'$ with $S$ inside the event:

$$
\Pr[ S=S' \land h_S(X)=h_{S'}(X') ]
$$

becomes:

$$
\boxed{ \Pr[ S=S' \land h_S(X)=h_S(X') ] }
$$

Both inputs now use the same hash function, allowing us to apply pairwise independence when they are distinct.

#### Separate the probability involving the seeds

We want to calculate:

$$
\Pr[ S=S' \land h_S(X)=h_S(X') ]
$$

Using conditional probability:

$$
= \Pr[S=S'] \cdot \Pr[h_S(X)=h_S(X')\mid S=S']
$$

Since $S$ and $S'$ are independent and uniformly distributed:

$$
\Pr[S=S']=2^{-d}
$$

For each value of $S$, the probability that $S'$ matches is $1/2^d$.

Conditioning on $S=S'$ leaves $S$ uniform and independent of $X,X'$, so the remaining conditional probability equals:

$$
\Pr[h_S(X)=h_S(X')]
$$

We obtain:

$$
\boxed{ \operatorname{Col}(Y) = 2^{-d}\Pr[h_S(X)=h_S(X')] }
$$

This uses conditional probability and seed uniformity, rather than assuming independence of the events.

#### Divide into two cases

Consider:

$$
\Pr[h_S(X)=h_S(X')]
$$

Split into two cases:

1. $X=X'$

2. $X\neq X'$

These cases are disjoint and exhaustive, so:

$$
\begin{aligned} \Pr[h_S(X)=h_S(X')] ={}& \Pr[h_S(X)=h_S(X')\land X=X']\\ &+\Pr[h_S(X)=h_S(X')\land X\neq X'] \end{aligned}
$$

**Case A — $X=X'$.**

If the two inputs are identical, the hash outputs are automatically identical:

$$
X=X'\implies h_S(X)=h_S(X')
$$

Therefore:

$$
\Pr[h_S(X)=h_S(X')\land X=X'] = \Pr[X=X']
$$

**Case B — $X\neq X'$.**

For distinct fixed inputs $x,x'$, pairwise independence gives:

$$
\Pr_S[h_S(x)=h_S(x')]=2^{-\ell}
$$

The outputs are independent and uniform over $2^\ell$ values, so they match with probability $2^{-\ell}$.

Thus:

$$
\Pr[h_S(X)=h_S(X')\land X\neq X'] = 2^{-\ell}\Pr[X\neq X']
$$

Combining the cases:

$$
\boxed{ \Pr[h_S(X)=h_S(X')] = \Pr[X=X'] + 2^{-\ell}\Pr[X\neq X'] }
$$

#### Use the min-entropy assumption

Remember that:

$$
H_\infty(X)\geq k
$$

which means:

$$
\max_x\Pr[X=x]\leq2^{-k}
$$

We need to bound:

$$
\Pr[X=X']
$$

Because $X$ and $X'$ are independent copies:

$$
\Pr[X=X'] = \sum_x\Pr[X=x]^2
$$

We can rewrite each squared probability as:

$$
\Pr[X=x]^2 = \Pr[X=x]\cdot\Pr[X=x]
$$

Since every $\Pr[X=x]\leq2^{-k}$:

$$
\Pr[X=X'] \leq \sum_x\Pr[X=x]\cdot2^{-k}
$$

Factor out the constant:

$$
= 2^{-k}\sum_x\Pr[X=x]
$$

But the probabilities of all possible outcomes sum to 1:

$$
\sum_x\Pr[X=x]=1
$$

Therefore:

$$
\boxed{\Pr[X=X']\leq2^{-k}}
$$

For the second term, use:

$$
\Pr[X\neq X']\leq1
$$

So:

$$
\Pr[h_S(X)=h_S(X')] \leq 2^{-k}+2^{-\ell}
$$

Returning to the expression obtained after separating the seeds:

$$
\boxed{ \operatorname{Col}(Y) \leq2^{-d}(2^{-k}+2^{-\ell}) }
$$

#### Rewrite the expression

Our result is:

$$
\operatorname{Col}(Y) \leq2^{-d}(2^{-k}+2^{-\ell})
$$

The professor rewrites it by factoring out $2^{-\ell}$:

$$
2^{-k}+2^{-\ell} = 2^{-\ell}(2^{\ell-k}+1)
$$

Therefore:

$$
\operatorname{Col}(Y) \leq 2^{-d}\cdot2^{-\ell}(2^{\ell-k}+1)
$$

Using the exponent rule:

$$
2^{-d}\cdot2^{-\ell}=2^{-(d+\ell)}
$$

We obtain:

$$
\boxed{ \operatorname{Col}(Y) \leq \frac1{2^{d+\ell}}(1+2^{\ell-k}) }
$$

This form is useful because:

$$
Y=(S,h_S(X))
$$

takes values in:

$$
\mathcal Y=\{0,1\}^{d+\ell}
$$

So:

$$
|\mathcal Y|=2^{d+\ell}
$$

And our bound becomes:

$$
\boxed{ \operatorname{Col}(Y) \leq \frac1{|\mathcal Y|}(1+2^{\ell-k}) }
$$

#### Apply the theorem's entropy condition

Recall the assumption of the Leftover Hash Lemma:

$$
k\geq\ell+2\log_2(1/\varepsilon)-2
$$

Rearrange it:

$$
\ell-k\leq2-2\log_2(1/\varepsilon)
$$

Exponentiate with base 2:

$$
2^{\ell-k} \leq 2^{2-2\log_2(1/\varepsilon)}
$$

Split the exponent:

$$
= 2^2\cdot2^{-2\log_2(1/\varepsilon)}
$$

Since:

$$
2^{-\log_2(1/\varepsilon)}=\varepsilon
$$

we obtain:

$$
\boxed{2^{\ell-k}\leq4\varepsilon^2}
$$

Now substitute this into our collision probability bound:

$$
\operatorname{Col}(Y) \leq \frac1{|\mathcal Y|}(1+2^{\ell-k})
$$

Therefore:

$$
\boxed{ \operatorname{Col}(Y) \leq \frac1{|\mathcal Y|}(1+4\varepsilon^2) }
$$

This is the auxiliary lemma's required condition.

#### Apply the auxiliary lemma and conclude

The auxiliary lemma states that:

$$
\operatorname{Col}(Y) \leq \frac1{|\mathcal Y|}(1+4\varepsilon^2)
$$

implies:

$$
\operatorname{SD}(Y,U_{\mathcal Y})\leq\varepsilon
$$

Since:

$$
Y=(S,h_S(X))
$$

and:

$$
U_{\mathcal Y}=U_{d+\ell}
$$

we obtain:

$$
\boxed{ \operatorname{SD}\left( (S,h_S(X)),U_{d+\ell} \right)\leq\varepsilon }
$$

Equivalently:

$$
\boxed{ (S,\operatorname{Ext}(S,X)) \approx_\varepsilon (S,U_\ell) }
$$

This proves the strong $(k,\varepsilon)$-seeded extractor guarantee, assuming the auxiliary collision-probability lemma.

$$
\boxed{\square}
$$

### Proof of the auxiliary collision-probability lemma

The professor proves this lemma at the start of lesson 4 (slides, pp. 1–3); it is included here to complete the LHL argument. Let $Y$ be a random variable over a finite set $\mathcal Y$, and let $U$ be uniform over the same set. Assuming

$$
\operatorname{Col}(Y)\leq\frac{1+4\varepsilon^2}{|\mathcal Y|},
$$

we want to prove

$$
\boxed{\operatorname{SD}(Y,U)\leq\varepsilon}.
$$

Start from the definition of statistical distance:

$$
\operatorname{SD}(Y,U)=\frac12\sum_{y\in\mathcal Y}\left|\Pr[Y=y]-\frac1{|\mathcal Y|}\right|.
$$

Define the deviation from uniform and its sign:

$$
q_y=\Pr[Y=y]-\frac1{|\mathcal Y|},
\qquad
s_y=\begin{cases}
+1 & q_y\geq0,\\
-1 & q_y<0.
\end{cases}
$$

Since $|q_y|=q_ys_y$,

$$
\operatorname{SD}(Y,U)=\frac12\sum_{y\in\mathcal Y}q_ys_y.
$$

#### Apply Cauchy–Schwarz

Interpret the sum as the inner product of the vectors

$$
\vec q=(q_y)_{y\in\mathcal Y},\qquad
\vec s=(s_y)_{y\in\mathcal Y}.
$$

Cauchy–Schwarz gives

$$
\operatorname{SD}(Y,U)
\leq\frac12\sqrt{\langle\vec q,\vec q\rangle\langle\vec s,\vec s\rangle}.
$$

Every $s_y$ is either $+1$ or $-1$, so $s_y^2=1$ and

$$
\langle\vec s,\vec s\rangle=|\mathcal Y|.
$$

Therefore,

$$
\boxed{\operatorname{SD}(Y,U)\leq
\frac12\sqrt{|\mathcal Y|\sum_{y\in\mathcal Y}q_y^2}}.
$$

This replaces the absolute-value expression with a sum of squared deviations, which we can relate to collision probability.

#### Use collision probability

Expanding the squares gives

$$
\begin{aligned}
\sum_yq_y^2
&=\sum_y\left(\Pr[Y=y]-\frac1{|\mathcal Y|}\right)^2\\
&=\sum_y\Pr[Y=y]^2
 +\frac1{|\mathcal Y|}-\frac2{|\mathcal Y|}\\
&=\operatorname{Col}(Y)-\frac1{|\mathcal Y|}.
\end{aligned}
$$

Here we used $\sum_y\Pr[Y=y]=1$. By the assumed collision bound,

$$
\sum_yq_y^2\leq\frac{4\varepsilon^2}{|\mathcal Y|}.
$$

Substituting into the Cauchy–Schwarz bound completes the proof:

$$
\operatorname{SD}(Y,U)
\leq\frac12\sqrt{|\mathcal Y|\cdot\frac{4\varepsilon^2}{|\mathcal Y|}}
=\boxed{\varepsilon}.\qquad\square
$$

## Sources

- [Local lecture-3 slides, 2026/27](<Assets/SLIDES/crypto_lecture03_2627 (1).pdf>): affine hashing and one-time MACs, pp. 1–4; randomness and min-entropy, pp. 5–8; deterministic-extraction impossibility, pp. 8–10; seeded extraction, pp. 11–13; statistical distance and the Leftover Hash Lemma, pp. 14–19.
- [Local lecture-4 slides](Assets/SLIDES/crypto_lecture04_2627.pdf), pp. 1–3: proof of the auxiliary collision-probability lemma.
- [Local lecture-3 transcript](<Assets/TRANSCRIPTION/CR LESSON 3 Transcripted.md>): supplementary reference for the professor's explanations; automatic transcription contains repetitions and errors.

The LHL proof uses the auxiliary collision-probability lemma; its proof, presented at the start of lesson 4, is included above.
