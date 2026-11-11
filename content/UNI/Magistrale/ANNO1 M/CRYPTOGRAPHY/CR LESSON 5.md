# Lesson 5 — Pseudorandom Generators and Hard-Core Bits

## PSEUDORANDOMNESS

**Pseudorandomness** means that an efficient adversary cannot distinguish a pseudorandom output from a uniform random string except with negligible advantage. Imagine an adversary $\mathcal A$ that receives a string $z$ generated in one of two worlds:

- **World 0:** $z=G(s)$, where $s\gets U_\lambda$ is a uniformly random seed.
- **World 1:** $z\gets U_{\lambda+\ell}$, a uniform random string of the same length as $G(s)$.

The adversary tries to determine which world produced $z$. If $G$ is a secure pseudorandom generator (PRG), no probabilistic polynomial-time (PPT) adversary has non-negligible distinguishing advantage. Here, advantage measures the difference between the probabilities of outputting $1$ in the two worlds, as defined below.

![[Pasted image 20261111104741.png]]

> [!info]- Recap of a negligible function
> A nonnegative function $\mu$ is negligible if, for every positive polynomial $p$, there is a sufficiently large $\lambda_0$ such that $\mu(\lambda)<1/p(\lambda)$ for every $\lambda\geq\lambda_0$. It approaches zero faster than the inverse of any polynomial.
>
> Among $1/\lambda$, $1/\lambda^2$ and $2^{-\lambda}$, only $2^{-\lambda}$ is negligible. The plot illustrates their decay; negligibility is an asymptotic property, not something established by a finite plot.
> ![[Pasted image 20261111105152.png]]

### Computational indistinguishability

Consider two ensembles of random variables,

$$
X=\{X_\lambda\}_{\lambda\in\mathbb N},
\qquad Y=\{Y_\lambda\}_{\lambda\in\mathbb N}.
$$

The ensembles are **indexed by** the security parameter $\lambda$: for each parameter value, $X_\lambda$ and $Y_\lambda$ describe the distributions being compared. This is what the parameter notation means; it does not say that their sampled values are numerically bounded by $\lambda$.

We say that $X$ and $Y$ are computationally indistinguishable, written $X\approx_c Y$, if, for every PPT adversary $\mathcal A$,

$$
\boxed{\left|\Pr[\mathcal A(X_\lambda)=1]
-\Pr[\mathcal A(Y_\lambda)=1]\right|
\leq\operatorname{negl}(\lambda)}.
$$

The negligible bound may depend on the adversary, and the condition holds for sufficiently large $\lambda$. In $\Pr[\mathcal A(X_\lambda)=1]$, we sample a string according to $X_\lambda$, give it to $\mathcal A$, and measure the probability that $\mathcal A$ outputs $1$. The probability includes the randomness of the sample and of the adversary.

> [!example]- Example of distinguishability
> If $\Pr[\mathcal A(X_\lambda)=1]=0.80$ and $\Pr[\mathcal A(Y_\lambda)=1]=0.30$, the distinguishing advantage is $|0.80-0.30|=0.50$. These numbers illustrate advantage at a fixed parameter value.

> [!example] Game example of the professor
> In $\operatorname{GAME}(\lambda,0)$, the challenger samples $z\gets X_\lambda$; in $\operatorname{GAME}(\lambda,1)$, it samples $z\gets Y_\lambda$. The adversary receives $z$ and outputs a bit $b'$.
>
> ![[CR_L5_indistinguishability_game.svg|700]]
>
> Redrawing of the supplied game illustration; see lecture-5 slides, PDF p. 2.

For a guessing interpretation, let $b=0$ denote the $X_\lambda$ world and $b=1$ the $Y_\lambda$ world. The adversary wins when $b'=b$. Thus, outputting $1$ means guessing World 1; it does not necessarily mean winning.

### Claryfing 1 in advantages

The definition measures how differently the adversary behaves in the two worlds, rather than directly measuring its probability of guessing correctly. If the adversary always outputs $1$, then

$$
\Pr[\mathcal A(X_\lambda)=1]=1,
\qquad \Pr[\mathcal A(Y_\lambda)=1]=1,
$$

so its distinguishing advantage is $|1-1|=0$. With equally likely worlds, this strategy guesses correctly half the time but learns nothing from its sample.

## Formal definition of a PRG(Pseudorandom Generators)

A pseudorandom generator is a deterministic, polynomial-time computable function

$$
\boxed{G:\{0,1\}^{\lambda}\rightarrow\{0,1\}^{\lambda+\ell}},
$$

where $\ell=\ell(\lambda)>0$ is the stretch. A secure PRG satisfies two properties:

1. **Expansion:** $|G(s)|=\lambda+\ell>\lambda$.
2. **Pseudorandomness:** $G(U_\lambda)\approx_c U_{\lambda+\ell}$.

Thus, a uniform seed of only $\lambda$ bits produces a longer string that is computationally indistinguishable from a uniform string of $\lambda+\ell$ bits. In the earlier notation, $X_\lambda=G(U_\lambda)$ and $Y_\lambda=U_{\lambda+\ell}$.

![[CR_L5_prg_worlds.svg|750]]

For every PPT adversary $\mathcal A$, security requires

$$
\left|\Pr[\mathcal A(G(U_\lambda))=1]
-\Pr[\mathcal A(U_{\lambda+\ell})=1]\right|
\leq\operatorname{negl}(\lambda).
$$

## Exercise to understand better this concept
No pseudorandom generator is secure against computationally unbounded adversaries, not even if it stretches the input by only one bit.
Consider:

$$
G:\{0,1\}^{\lambda}\rightarrow\{0,1\}^{\lambda+1}
$$

We have two possible worlds:

- World 0: $z=G(s)$, where $s\gets U_\lambda$.

- World 1: $z\gets U_{\lambda+1}$.

Notice that $G$ takes a $\lambda$-bit seed and generates a $(\lambda+1)$-bit output.
How many possible inputs and outputs are there?
The number of possible output strings is twice the number of possible seeds.

![[CR_L5_seed_output_spaces.svg|750]]

Consequently, there must be some strings of length $\lambda+1$ that $G$ can never generate.

This observation is fundamental to the professor's proof.

Given $z\in\{0,1\}^{\lambda+1}$, the adversary performs the following:

1. Enumerate all $2^\lambda$ possible seeds.

2. Compute $G(s)$ for each seed.

3. If any $G(s)=z$, output $1$.

4. Otherwise, output $0$.

Mathematically:

$$
\mathcal A(z)= \begin{cases} 1 & \text{if }\exists s:G(s)=z\\ 0 & \text{otherwise} \end{cases}
$$

World 0: $z=G(s)$, where $s\gets U_\lambda$.

Since $z$ was generated by $G$, the adversary is guaranteed to find at least one matching seed.

Therefore:

$$
\boxed{\Pr[\mathcal A(G(U_\lambda))=1]=1}
$$

World 1: $z\gets U_{\lambda+1}$.

There are $2^{\lambda+1}$ possible strings, but $G$ can produce at most $2^\lambda$ distinct outputs.

Therefore:

$$
\boxed{\Pr[\mathcal A(U_{\lambda+1})=1]\leq\frac12}
$$

Notice the inequality: different seeds might produce the same output, so the number of distinct outputs could be even smaller.

In this exercise, output $1$ means “the string is in the image of $G$,” rather than “World 1.” A generated sample always passes the test. A uniform sample passes with probability at most $1/2$; if it fails, the adversary knows that it came from the uniform world.

Using the definition of distinguishing advantage:

$$
\begin{aligned} \operatorname{Adv}_{\mathcal A}(\lambda) &=\left|\Pr[\mathcal A(G(U_\lambda))=1]\right.\\ &\qquad\left.-\Pr[\mathcal A(U_{\lambda+1})=1]\right|\\[4pt] &\geq 1-\frac12\\ &=\boxed{\frac12} \end{aligned}
$$

An advantage of at least $1/2$ is non-negligible. However, this attack enumerates all $2^\lambda$ seeds, so it does not run in polynomial time. It rules out security against computationally unbounded adversaries while remaining compatible with security against PPT adversaries. The same counting argument applies to any positive stretch.

## How to construct a PRG
Remember the concept of a One-Way Function (OWF) from the previous lessons.

A one-way function $f$ has two fundamental properties:

1. Easy to compute: Given $x$, we can compute $f(x)$ in polynomial time.

2. Hard to invert: Given $f(x)$, where $x$ was sampled uniformly, no PPT adversary can recover any valid preimage except with negligible probability.

The professor introduces the following theorem.

Theorem — OWFs imply PRGs

If one-way functions exist, then secure pseudorandom generators with polynomial stretch also exist.

$$
\boxed{\text{OWFs exist}\implies\text{PRGs exist}}
$$

More precisely, for any polynomially bounded stretch $\ell(\lambda)$, we can construct a secure PRG:

$$
G:\{0,1\}^{\lambda}\rightarrow \{0,1\}^{\lambda+\ell(\lambda)}
$$

Being difficult to invert does not automatically mean a function's output looks random.

A one-way function might produce outputs with recognizable patterns, but still be computationally difficult to invert.

For example, if $f$ is a one-way function, consider:

$$
f'(x)=0\parallel f(x)
$$

This function remains one-way, but its output always starts with $0$, whereas a uniform string starts with $0$ only half the time. This gives an efficient distinguishing test.

The professor's theorem is not saying:

> Every one-way function is already a secure PRG.

Instead, it says:

> Starting from any one-way function, it is theoretically possible to construct a secure PRG.

### Theorem proof

The full proof is beyond this lecture. We focus on two ingredients: stretch amplification and hard-core bits.

### Ingredient 1 Stretch amplification

> If we already have a secure PRG that generates only one additional bit, can we use it to generate polynomially many additional bits?

Assume we already have a secure PRG:

$$
G:\{0,1\}^{\lambda}\rightarrow\{0,1\}^{\lambda+1}
$$

It receives a $\lambda$-bit seed and produces $\lambda+1$ bits.

We divide its output into two parts:

$$
\boxed{G(s_0)=(s_1,b_1)}
$$

where:

- $s_1$ contains $\lambda$ bits.
- $b_1$ contains just $1$ bit.

We reuse $s_1$ as the input to $G$ in the next iteration.

![[CR_L5_stretch_amplification.svg|700]]

We start with:

$$
s_0\gets U_\lambda
$$

Then:

$$
\begin{aligned} G(s_0)&=(s_1,b_1)\\ G(s_1)&=(s_2,b_2)\\ G(s_2)&=(s_3,b_3)\\ &\vdots\\ G(s_{\ell-1})&=(s_\ell,b_\ell) \end{aligned}
$$

At each step, we obtain one new output bit $b_i$, while keeping a $\lambda$-bit state $s_i$ for the next iteration.
After $\ell$ iterations, we output:

$$
\boxed{ G^\ell(s_0)=(b_1,b_2,\ldots,b_\ell,s_\ell) }
$$
This defines a new generator:

$$
\boxed{ G^\ell:\{0,1\}^{\lambda}\rightarrow \{0,1\}^{\lambda+\ell} }
$$
Since our goal is to produce $\lambda+\ell$ bits, we only need one state of length $\lambda$ and the $\ell$ additional bits generated during the iterations.

$$
\underbrace{(b_1,b_2,\ldots,b_\ell)}_{\ell\text{ bits}} \parallel \underbrace{s_\ell}_{\lambda\text{ bits}}
$$

Therefore:

$$
\boxed{|G^\ell(s_0)|=\lambda+\ell}
$$
We reveal only the final state, not all intermediate states.

Remember:

$$
G(s_i)=(s_{i+1},b_{i+1})
$$

If an adversary receives $s_i$, $s_{i+1}$, and $b_{i+1}$, it can simply compute $G(s_i)$ and check whether the relationship holds.

### is it secure?

We have constructed $G^\ell$ by repeatedly applying $G$, but expansion alone does not prove security. We must show

$$
G^\ell(U_\lambda)\approx_c U_{\lambda+\ell}
$$

using the assumption $G(U_\lambda)\approx_c U_{\lambda+1}$.

#### 1. Proof strategy: Reduction and contradiction

Suppose a PPT adversary $\mathcal A$ distinguishes $G^\ell(U_\lambda)$ from $U_{\lambda+\ell}$ with non-negligible advantage. We must construct a PPT adversary $\mathcal B$ that uses $\mathcal A$ to distinguish $G(U_\lambda)$ from $U_{\lambda+1}$. Such a construction would contradict the assumed security of $G$.

We assume $\mathcal A$ exists for the contradiction; we must explicitly construct $\mathcal B$ and prove that it works.

#### 2. Understanding the two adversaries

| | Adversary $\mathcal A$ | Adversary $\mathcal B$ |
| --- | --- | --- |
| Goal | Break $G^\ell$ | Break $G$ |
| Input length | $\lambda+\ell$ bits | $\lambda+1$ bits |
| Distinguishes | $G^\ell(U_\lambda)$ vs. $U_{\lambda+\ell}$ | $G(U_\lambda)$ vs. $U_{\lambda+1}$ |
| Role | Assumed to exist | Must be constructed using $\mathcal A$ |

#### 3. The problem with the direct reduction

The challenger gives $\mathcal B$ a single string $z$, sampled either from $G(U_\lambda)$ or from $U_{\lambda+1}$. For $\ell>1$, this string is shorter than the input expected by $\mathcal A$. As the professor puts it, the adversaries “speak different languages.”

Appending arbitrary bits would fix the length but would not ensure that the resulting sample follows a distribution $\mathcal A$ can distinguish. Moreover, $G^\ell$ invokes $G$ several times, whereas $\mathcal B$ receives only one challenge involving $G$.

#### 4. How will we solve this?

The **hybrid argument** introduces distributions $H_0,\ldots,H_\ell$, where $H_0\equiv G^\ell(U_\lambda)$ and $H_\ell\equiv U_{\lambda+\ell}$. Each transition replaces one invocation of $G$ with uniform randomness. This lets the reduction embed its single challenge in one transition, then combine the transitions to compare the endpoints.

![[Pasted image 20261111115528.png]]

### Hybrid Argument

#### 1. Goal and intuition

Here, $\equiv$ denotes identical distributions. To connect the endpoint hybrids, we prove

$$
H_0\approx_c H_1\approx_c\cdots\approx_c H_\ell.
$$

**Why does this work?** By the triangle inequality, for any PPT adversary $\mathcal A$, defining $p_i=\Pr[\mathcal A(H_i)=1]$:

$$
|p_0-p_\ell|  
\leq  
\sum_{i=0}^{\ell-1}|p_i-p_{i+1}|  
$$

For this construction, the reductions must give a negligible bound that applies across the polynomially many transitions. The triangle inequality then makes the endpoint advantage negligible.

> [!warning] Formal detail to review
> A separate negligible bound for each fixed index is not by itself enough when $\ell=\ell(\lambda)$ grows. The argument needs a bound that holds uniformly over the transitions, or a reduction choosing the transition at random. The lecture presents the adjacent-hybrid reduction; revisit this quantifier detail when reconstructing the proof.

Therefore:

$$
\boxed{H_0\approx_c H_\ell}  
$$

#### 2. Constructing the hybrids

Consider $\ell=3$.

Our original construction starts with $s_0\gets U_\lambda$ and repeatedly computes:

$$
\begin{aligned}  
G(s_0)&=(s_1,b_1)\\
G(s_1)&=(s_2,b_2)\\
G(s_2)&=(s_3,b_3)
\end{aligned}  
$$

The output is $(b_1,b_2,b_3,s_3)$.

The professor's idea is to **gradually replace each invocation of $G$ with uniform randomness**.

![[Pasted image 20261111121314.png]]

|Hybrid|Construction|
|---|---|
|$H_0$|Sample $s_0$ uniformly and apply $G$ three times|
|$H_1$|Sample $(s_1,b_1)$ uniformly, then apply $G$ twice|
|$H_2$|Sample $b_1,b_2,s_2$ uniformly and independently, then apply $G$ once|
|$H_3$|Sample $b_1,b_2,b_3,s_3$ uniformly and independently|

Every hybrid outputs $(b_1,b_2,b_3,s_3)$, but generates these values differently.

Thus:

$$
H_0\equiv G^3(U_\lambda)  
\qquad  
H_3\equiv U_{\lambda+3}  
$$

**Why can we skip previous states?**

For example, in $H_2$, we sample $s_2$ directly from $U_\lambda$. Therefore, we no longer need to compute $s_0$ or $s_1$. We simply continue the construction from $s_2$.

This is how we gradually eliminate the invocations of $G$ until the entire output is uniform.

#### 3. General definition of $H_i$

For any $0\leq i\leq\ell$, we define $H_i$ as follows.

1. Sample $b_1,\ldots,b_i$ independently and uniformly from $\{0,1\}$.

2. Sample $s_i\gets U_\lambda$, independently of those bits.

3. Starting from $s_i$, apply $G$ another $\ell-i$ times:

    $$
    (b_{i+1},\ldots,b_\ell,s_\ell)=G^{\ell-i}(s_i)  
    $$

    When $i=\ell$, there are no further calls to $G$; $G^0(s_\ell)=s_\ell$.

4. Output:

    $$
    \boxed{H_i=(b_1,\ldots,b_\ell,s_\ell)}  
    $$

Every hybrid produces exactly $\lambda+\ell$ output bits.

#### 4. Why are consecutive hybrids indistinguishable?

Consider $H_i$ and $H_{i+1}$.

The important difference is how we obtain $(s_{i+1},b_{i+1})$.

**In $H_i$:**

$$
(s_{i+1},b_{i+1})=G(s_i),  
\qquad s_i\gets U_\lambda  
$$

**In $H_{i+1}$:**

$$
(s_{i+1},b_{i+1})\gets U_{\lambda+1}  
$$

In both experiments, the first $i$ output bits are uniform, and the remaining steps are computed using the same procedure.

The only change is therefore replacing:

$$
\boxed{G(U_\lambda)\quad\text{with}\quad U_{\lambda+1}}  
$$

This is exactly the security property we assumed for the original generator:

$$
G(U_\lambda)\approx_c U_{\lambda+1}  
$$

**Important:** This assumption does not mean the two distributions are identical. It means that no PPT adversary can distinguish them with non-negligible advantage.

We will formally show, through a reduction, that this implies:

$$
H_i\approx_c H_{i+1}  
$$

for every consecutive pair.

Once this is proved, the triangle inequality gives:

$$
\boxed{G^\ell(U_\lambda)\approx_c U_{\lambda+\ell}}  
$$

### Proving the Hybrid Argument

We first prove $H_0\approx_c H_1$ by constructing an explicit reduction.

For simplicity, let's use $\ell=3$.

In $H_0$:

$$
\begin{aligned} s_0&\gets U_\lambda\\ (s_1,b_1)&=G(s_0)\\ (s_2,b_2)&=G(s_1)\\ (s_3,b_3)&=G(s_2) \end{aligned}
$$

In $H_1$:

$$
\begin{aligned} (s_1,b_1)&\gets U_{\lambda+1}\\ (s_2,b_2)&=G(s_1)\\ (s_3,b_3)&=G(s_2) \end{aligned}
$$

Both output:

$$
(b_1,b_2,b_3,s_3)
$$

The difference is how the pair $(s_1,b_1)$ is generated.

Suppose that there exists a PPT adversary $\mathcal A$ such that:

$$
\boxed{ \left| \Pr[\mathcal A(H_0)=1] - \Pr[\mathcal A(H_1)=1] \right| }
$$

is non-negligible.
This means $\mathcal A$ can distinguish $H_0$ from $H_1$.
Our hypothetical adversary $\mathcal A$ now distinguishes two consecutive hybrids. It is not necessarily the same adversary we initially imagined distinguishing $H_0$ from $H_\ell$.
Our goal is to show that the existence of this $\mathcal A$ would contradict the security of the original generator $G$.
**Constructing adversary $\mathcal B$.**

We want to build a PPT adversary $\mathcal B$ that breaks $G$ using $\mathcal A$.

Remember that $\mathcal B$ receives a challenge:

$$
z\in\{0,1\}^{\lambda+1}
$$

It comes from one of two possible distributions:

$$
z\gets G(U_\lambda)
$$

or:

$$
z\gets U_{\lambda+1}
$$

$\mathcal B$ doesn't know which one.

Why don't we use $z$ to generate the first state and output bit of our hybrid construction?

![[CR_L5_first_hybrid_reduction.svg|700]]

$\mathcal B$ receives $z$ from the challenger.

It divides $z$ into:

$$
\boxed{z=(s_1,b_1)}
$$

where $s_1$ contains $\lambda$ bits and $b_1$ contains one bit.
Now $\mathcal B$ has $s_1$.

It can simply run $G$ twice:

$$
\begin{aligned} (s_2,b_2)&=G(s_1)\\ (s_3,b_3)&=G(s_2) \end{aligned}
$$

$\mathcal B$ does not need to recover the original seed $s_0$: it only evaluates the efficient function $G$ on $s_1$ and then $s_2$. It constructs

$$
z'=(b_1,b_2,b_3,s_3)
$$

This string contains $\lambda+3$ bits, exactly what $\mathcal A$ expects.

Then:

$$
\boxed{\mathcal B(z)=\mathcal A(z')}
$$
In other words, $\mathcal B$ simply returns whatever bit $\mathcal A$ outputs.
**Why does this construction work?**

There are two possibilities for the challenge $z$.

Case 1 — The challenger gives B an output of G

$$
z\gets G(U_\lambda)
$$

This means that $(s_1,b_1)$ was obtained by applying $G$ to a uniformly random seed.

Then $\mathcal B$ continues applying $G$ to obtain the remaining bits.

This reproduces exactly the distribution $H_0$.

$z\sim G(U_\lambda)\implies z'\sim H_0$

Case 2 — The challenger gives B a uniform string

$$
z\gets U_{\lambda+1}
$$

Now $(s_1,b_1)$ is uniformly random.

Then $\mathcal B$ applies $G$ to $s_1$ to generate the remaining bits.

This reproduces exactly the distribution $H_1$.

$z\sim U_{\lambda+1}\implies z'\sim H_1$
The same algorithm $\mathcal B$ generates an input distributed exactly as $H_0$ or $H_1$, depending on its challenge, without knowing which world the challenger selected. This perfect simulation gives

$$
\Pr[\mathcal B(G(U_\lambda))=1] = \Pr[\mathcal A(H_0)=1]
$$

and:

$$
\Pr[\mathcal B(U_{\lambda+1})=1] = \Pr[\mathcal A(H_1)=1]
$$

Therefore:

$$
\boxed{ \operatorname{Adv}_{\mathcal B}^{G}(\lambda) = \operatorname{Adv}_{\mathcal A}^{H_0,H_1}(\lambda) }
$$

$\mathcal B$ inherits the non-negligible advantage of $\mathcal A$. It is also PPT because it runs $\mathcal A$ and performs only polynomially many additional computations. This contradicts the assumed security of $G$.

Therefore:

$$
\boxed{H_0\approx_c H_1}
$$
The same reduction applies to every consecutive pair. Recall that $H_i$ samples $b_1,\ldots,b_i$ and $s_i$ uniformly and independently, runs $G$ another $\ell-i$ times, and outputs $(b_1,\ldots,b_\ell,s_\ell)$.

We want to prove:

$$
\boxed{H_i\approx_c H_{i+1}}
$$

As before, we use a proof by contradiction.

Assume there exists a PPT adversary $\mathcal A$ capable of distinguishing $H_i$ from $H_{i+1}$ with non-negligible advantage.

We will construct an adversary $\mathcal B$ that breaks the original generator $G$.
$\mathcal B$ receives a challenge:

$$
z\in\{0,1\}^{\lambda+1}
$$

The challenge is sampled either from $G(U_\lambda)$ or from $U_{\lambda+1}$.

Here's the procedure:

![[Pasted image 20261111124422.png]]

As in the previous proof, consider the two possible worlds.

Case 1 — The challenger gives $z\gets G(U_\lambda)$

Then $(s_{i+1},b_{i+1})$ is generated by applying $G$ to a uniformly random seed.

This matches the construction of $H_i$.

Therefore:

$$
z'\sim H_i
$$

Case 2 — The challenger gives $z\gets U_{\lambda+1}$

Now $(s_{i+1},b_{i+1})$ is sampled uniformly.

This matches the construction of $H_{i+1}$.

Therefore:

$$
z'\sim H_{i+1}
$$

In both cases, $\mathcal B$ perfectly simulates the distribution that $\mathcal A$ expects.
$$
\boxed{ \operatorname{Adv}_{\mathcal B}^{G} = \operatorname{Adv}_{\mathcal A}^{H_i,H_{i+1}} }
$$
If $\mathcal A$ had non-negligible distinguishing advantage, then $\mathcal B$ would too.

But $G$ is assumed secure, so this is a contradiction.

Thus, the consecutive hybrids are computationally indistinguishable.
$\mathcal B$ delegates the distinguishing decision to $\mathcal A$; its role is to construct the correct input distribution. We have established:

$$
H_0\approx_c H_1\approx_c\cdots\approx_c H_\ell
$$

By the hybrid argument and the triangle inequality, because $\ell(\lambda)$ is polynomially bounded, the total distinguishing advantage remains negligible.

Therefore:

$$
H_0\approx_c H_\ell
$$

Substituting the definitions:

$$
\boxed{ G^\ell(U_\lambda)\approx_c U_{\lambda+\ell} }
$$

Thus, stretch amplification preserves pseudorandomness.

This completes the first main ingredient of the professor's theorem on slide 4.

## Hard-Core Bits

> [!warning] Review before lesson 6
> I need to study this final part more carefully before starting lesson 6.

To construct the original one-bit-stretch PRG, we return to one-way functions.

Suppose:

$$
f:\{0,1\}^{n}\rightarrow\{0,1\}^{n}
$$

is a one-way function.

This means:

- Given $x$, computing $f(x)$ is easy.

- Given $f(x)$, recovering a valid preimage is computationally hard.

The professor asks whether the hardness of finding a valid preimage also means that each input bit is hard to predict. Not necessarily: imagine an input consisting of two parts,

$$
x=(b,t)
$$

where $b$ is a single bit and $t$ is a longer binary string.

Suppose $g$ is a one-way function, and we construct:

$$
f(b,t)=(b,g(t))
$$

![[Pasted image 20261111125011.png]]

Even though $f$ is still one-way when $g$ is one-way, an adversary receiving $f(x)$ can easily recover $b$: it's simply the first bit of the output.

Finding a valid preimage of $g(t)$ remains hard, but the adversary does not need to invert the function to learn $b$.

A function can therefore be hard to invert while revealing some information about its input. To identify a bit that remains hidden, the professor introduces a function

$$
\boxed{h:\{0,1\}^{n}\rightarrow\{0,1\}}
$$

This function takes an entire input $x$ and outputs a single bit $h(x)$.

We call $h$ a hard-core predicate for $f$ when:

- Computing $h(x)$ from $x$ is efficient.

- Given only $f(x)$, no PPT adversary can predict $h(x)$ with probability significantly better than $1/2$, when $x$ is sampled uniformly.

Formally, for every PPT adversary $\mathcal A$:

$$
\boxed{ \Pr_{x\gets U_n} [\mathcal A(f(x))=h(x)] \leq \frac12+\operatorname{negl}(n) }
$$

We use $n$ here as the security parameter, following the professor's notation. The professor gives an equivalent distributional formulation: the left-hand pair uses one shared sample $x\gets U_n$, while the comparison bit $u\gets U_1$ on the right is independent of $x$:

$$
\boxed{ (f(x),h(x))_{x\gets U_n} \approx_c (f(x),u)_{x\gets U_n,\,u\gets U_1} }
$$

This means that an adversary receiving $f(x)$ alongside another bit cannot efficiently determine whether that bit is:

- The real hard-core bit $h(x)$.

- An independent uniformly random bit.

Notice the connection with the PRGs we studied earlier: we're again comparing two distributions using computational indistinguishability.

We'll use this property shortly to construct a one-bit-stretch PRG from a one-way permutation.
A one-way permutation (OWP) is a one-way function that is also a bijection over its domain.

Consider:

$$
f:\{0,1\}^{n}\rightarrow\{0,1\}^{n}
$$

Being a permutation means that every $n$-bit output has exactly one corresponding $n$-bit input.

Consequently, if we uniformly sample $s$:

$$
s\gets U_n
$$

then:

$$
\boxed{f(U_n)\equiv U_n}
$$

A permutation simply rearranges the elements of a set. Therefore, applying a permutation to a uniformly random input produces a uniformly random output.

Notice that $f$ can still be computationally hard to invert, even though its output distribution is uniform.
Now assume that:

- $f$ is a one-way permutation.

- $h$ is a hard-core predicate for $f$.

The professor defines:

$$
\boxed{G(s)=f(s)\parallel h(s)}
$$

where $s\gets U_n$.

![[Pasted image 20261111125200.png]]

This satisfies the expansion requirement:

$$
G:\{0,1\}^{n}\rightarrow\{0,1\}^{n+1}
$$

**Why is $G$ secure?** The reasoning on PDF p. 13 uses the hard-core property followed by the permutation property.

Remember the definition of a hard-core bit:

$$
(f(x),h(x))_{x\gets U_n} \approx_c (f(x),u)_{x\gets U_n,\,u\gets U_1}
$$

The rightmost bit can be replaced by an independent uniform bit without any PPT adversary noticing a non-negligible difference.

Now, because $f$ is a permutation:

$$
f(U_n)\equiv U_n
$$

Therefore:

$$
(f(x),u)_{x\gets U_n,\,u\gets U_1}\equiv(U_n,U_1)
$$

And since the two uniform values are independent:

$$
(U_n,U_1)\equiv U_{n+1}
$$

Putting these statements together:

$$
\boxed{ \underbrace{(f(x),h(x))_{x\gets U_n}}_{G(U_n)} \approx_c \underbrace{(f(x),u)_{x\gets U_n,\,u\gets U_1}}_{\text{Hard-core property}} \equiv \underbrace{U_{n+1}}_{\text{Uniform}} }
$$

Hence:

$$
\boxed{G(U_n)\approx_c U_{n+1}}
$$

This gives a secure one-bit-stretch PRG.

**What if $f$ is only a one-way function?**

If $f$ is a one-way function but not a permutation, we cannot necessarily write:

$$
f(U_n)\equiv U_n
$$

For example, some outputs might occur more frequently than others, or some outputs might never occur.

Therefore, the simple construction

$$
G(s)=f(s)\parallel h(s)
$$

does not necessarily produce pseudorandom output.

The professor emphasizes that the general result still holds:

The existence of any one-way function is sufficient to construct a secure PRG.

However, the general construction requires additional techniques, and the complete proof is not developed in this lecture.

The professor then asks whether we can choose one fixed efficient predicate $h$ that is hard-core for every OWF. The following examples explain why the answer is no.

**Why can’t $h$ be universal?** Suppose we propose:

$$
h(x)=x_1
$$

where $x_1$ is the first bit of $x$.

We would like $h$ to be hard-core for every OWF.

However, recall our earlier example:

$$
f(b,t)=(b,g(t))
$$

where $g$ is a one-way function.

The function $f$ is still one-way because finding a valid preimage requires inverting $g$, but it explicitly reveals $b$.

Therefore, if:

$$
h(b,t)=b
$$

an adversary receiving $f(b,t)$ can recover $h(b,t)$ immediately.

$$
\Pr[\mathcal A(f(x))=h(x)]=1
$$

So $h$ is not hard-core for this particular OWF.

You might now ask: what if we choose a different $h$?

The professor's point is that whatever fixed efficient predicate we choose, we can construct a one-way function that reveals its value.

**The general idea.** Suppose we have a candidate predicate $h$ and an arbitrary one-way function $g$.

Consider the following illustrative construction:

$$
\boxed{f_{\mathrm{bad}}(x)=(g(x),h(x))}
$$

![[Pasted image 20261111125344.png]]

This function remains one-way if $g$ is one-way and $h$ is an efficiently computable single-bit predicate.

Why? Because an inverter for $f_{\mathrm{bad}}$ could be used to invert $g$: given $g(x)$, we could guess the missing bit $h(x)$ with probability $1/2$ and run that inverter.

But an adversary trying to predict $h(x)$ from $f_{\mathrm{bad}}(x)$ has a trivial strategy: read the last bit.

Therefore:

$$
\Pr[\mathcal A(f_{\mathrm{bad}}(x))=h(x)]=1
$$

So $h$ is not hard-core for $f_{\mathrm{bad}}$.

This is an illustrative construction explaining the professor's argument; its output is one bit longer than that of $g$. The lecture doesn't develop the full length-preserving construction.

It tells us that the choice of a hard-core predicate generally needs to depend on the one-way function being considered.

The professor also mentions a deeper theoretical result: arbitrary one-way functions can be transformed into constructions with hard-core predicates, using additional techniques.

One famous result is the Goldreich–Levin theorem, which constructs a hard-core predicate using an additional random string. The professor doesn't prove it in this lecture, so we won't go into that proof.

The important distinction is that the existence of such constructions doesn't imply that one fixed predicate works for every OWF.

## Sources

- [Lecture-5 slides, 2026/27](Assets/SLIDES/crypto_lecture05_2627.pdf): PDF pp. 1–3, indistinguishability/PRGs and the unbounded attack; pp. 4–11, stretch amplification and hybrids; pp. 12–14, hard-core bits and one-way permutations.
- [Lecture-5 transcript](<Assets/TRANSCRIPTION/CR LESSON 5 Transcripted.md>): secondary support for the reduction explanation and lecture boundary; contains transcription errors.
- [The Joy of Cryptography, §4.3.1](https://joyofcryptography.com/comp/): supplementary reference for the marked quantifier detail in polynomial-length hybrid arguments; this is separate from the professor's lecture.
- The game, PRG-world and counting diagrams redraw the supplied illustrations; the stretch and first-hybrid diagrams are converted from the supplied inline SVGs. Original screenshot files are retained.
