# Lesson 4 — Computational Security and One-Way Functions

The lecture opens by proving the auxiliary collision-probability lemma used in the Leftover Hash Lemma. That proof is included at the end of [[CR LESSON 3#Proof of the auxiliary collision-probability lemma|lesson 3]] to keep the argument together.

## Introduction to Computational Security

So far, we have studied **information-theoretic security**: guarantees that hold even against adversaries with unlimited computational resources. These guarantees come with practical limitations.

![[CR_L4_statistical_limits.svg|800]]

The professor's goal is to obtain cryptographic systems that are both provably secure and efficient. To overcome these limitations, we change the model and introduce computational assumptions.

### Two assumptions for computational security

1. **The adversary is computationally bounded.** We model it as a probabilistic polynomial-time Turing machine (**PPT**). For example, a running time of $O(n^3)$ is polynomial in the input length $n$.
2. **Some computational problems are hard.** Limiting the adversary's running time is not enough: we need problems that efficient algorithms cannot solve with sufficient success.

### Computational Hardness

Two complexity classes help explain this distinction:

- **P — Polynomial Time:** decision problems solvable by a deterministic polynomial-time Turing machine.
- **NP — Nondeterministic Polynomial Time:** decision problems whose proposed solutions can be verified in polynomial time.

P concerns efficiently **finding an answer**, while NP concerns efficiently **checking a proposed solution**. These classes overlap: every problem in P is also in NP. We do not know whether every NP problem can be solved in polynomial time, so we do not know whether $P=NP$.

Ideally, we would base cryptography on $P\ne NP$: some problems with efficiently verifiable solutions would then lack efficient algorithms. However, this assumption alone does not currently give us the cryptographic guarantees we need, so we use more specific hardness assumptions.

## Security Reductions

For a suitable scheme $\Pi$, we would like to prove a statement such as

$$
\boxed{\text{Factoring is hard}\implies\Pi\text{ is secure}}.
$$

The proof shows that an efficient attack against $\Pi$ would give an efficient factoring algorithm. We construct a **reduction** $\mathcal B$ that uses an adversary $\mathcal A$ as a subroutine:

1. Assume an efficient adversary $\mathcal A$ breaks $\Pi$.
2. Construct $\mathcal B$ using $\mathcal A$ to solve factoring.
3. Show that $\mathcal B$ is efficient and succeeds with sufficient probability.
4. This contradicts the assumption that factoring is hard.

Therefore, under the factoring assumption, the efficient adversary cannot exist. The reduction proves the scheme's security **under the assumption**; it does not prove that the scheme is insecure.

![[CR_L4_security_reduction.svg|497]]

The reduction must be established mathematically for the specific scheme. Breaking an arbitrary encryption scheme is not automatically equivalent to factoring.

Factoring is only one possible assumption. Other families involve discrete logarithms, lattices and decoding random codes. Using different foundations avoids relying on a single mathematical problem for all cryptography.

## One-Way Functions (OWFs)

The professor calls one-way functions the “mother of all these assumptions.” Rather than committing to one particular problem, they capture a general property useful in cryptography.

A one-way function $f$ has two essential properties:

- **Easy to compute:** given $x$, we can efficiently evaluate $f(x)$.
- **Hard to invert on average:** given $y=f(x)$ for a uniformly sampled input $x$, an efficient adversary finds an $x'$ with $f(x')=y$ only with negligible probability.

![[CR_L4_one_way_function.svg|760]]

We formalize inversion through a security game.

### The One-Way Function Security Game

The **challenger** $\mathcal C$ creates the challenge; the **adversary** $\mathcal A$ attempts to invert the function.

![[CR_L4_owf_game.svg|760]]

The game works as follows:

1. The challenger samples $x$ uniformly from the input domain $\mathcal X_\lambda$.
2. It computes $y=f_\lambda(x)$ and gives $y$ to the adversary.
3. The adversary outputs a candidate preimage $x'$.
4. It wins if $x'\in\mathcal X_\lambda$ and $f_\lambda(x')=y$.

$$
\boxed{\operatorname{Win}\iff x'\in\mathcal X_\lambda
\ \land\ f_\lambda(x')=f_\lambda(x)}.
$$

The adversary does not need to recover the original $x$: **any valid preimage** is sufficient. The subscript $\lambda$ makes explicit that the function family and domains depend on the security parameter. We give the adversary $1^\lambda$, the unary encoding of that parameter, as well as the output $y$.

For every PPT adversary $\mathcal A$, security requires

$$
\Pr[\operatorname{Game}^{\mathrm{OWF}}_{\mathcal A,f}(\lambda)=1]
\leq\operatorname{negl}(\lambda).
$$

| Symbol | Meaning |
| --- | --- |
| $f_\lambda$ | Deterministic, efficiently computable function at parameter $\lambda$ |
| $\mathcal A$ | PPT adversary |
| $\lambda$ | Security parameter |
| $\operatorname{Game}=1$ | The adversary finds a valid preimage |
| $\operatorname{negl}(\lambda)$ | A negligible function of $\lambda$ |

We cannot require success probability to be exactly zero: even random guessing can sometimes find a valid preimage. We therefore need a precise meaning of “small.”

### Negligible probability

The security parameter $\lambda$ controls a construction's security level. Instead of declaring one fixed probability small, we study how the attacker's success changes as $\lambda$ grows.

For example, suppose an attack succeeds with probability

$$
\Pr[\operatorname{Win}]=0.01.
$$

Although 1% may seem small, after 1,000 independent repetitions the probability of at least one success is

$$
1-(1-0.01)^{1000}\approx99.996\%.
$$

We want a success bound that remains small after polynomially many attempts. A nonnegative function $\varepsilon(\lambda)$ is **negligible** if it eventually becomes smaller than the inverse of every polynomial:

$$
\boxed{\forall c>0,\ \exists\lambda_0:\quad
\forall\lambda\geq\lambda_0,\quad
\varepsilon(\lambda)<\frac1{\lambda^c}}.
$$

**Example A.** The function

$$
\varepsilon(\lambda)=2^{-\lambda}
$$

is negligible: exponential growth in the denominator eventually outpaces every polynomial.

**Example B.** The function

$$
\varepsilon(\lambda)=\frac1{\lambda^2}
$$

is not negligible, even though it approaches zero. It never becomes smaller than $1/\lambda^3$ for $\lambda>1$, whereas the definition must hold for every positive constant $c$.

Negligible functions have two useful closure properties. If $\varepsilon_1$ and $\varepsilon_2$ are negligible, their sum is another negligible function:

$$
\boxed{\varepsilon_1(\lambda)+\varepsilon_2(\lambda)
=\operatorname{negl}(\lambda)}.
$$

Multiplying by a polynomial also preserves negligibility:

$$
\boxed{\operatorname{poly}(\lambda)\cdot\operatorname{negl}(\lambda)
=\operatorname{negl}(\lambda)}.
$$

Thus, polynomially many attempts do not automatically turn a negligible success probability into a significant one. This is why asymptotic security uses negligible functions rather than a fixed “small” probability.

We can now state the OWF requirement more precisely: $f_\lambda$ is efficiently computable, and for every PPT adversary $\mathcal A$,

$$
\boxed{
\Pr_{\substack{x\xleftarrow{\$}\mathcal X_\lambda\\
x'\gets\mathcal A(1^\lambda,f_\lambda(x))}}
\left[x'\in\mathcal X_\lambda\ \land\ f_\lambda(x')=f_\lambda(x)\right]
\leq\operatorname{negl}(\lambda)
}.
$$

The probability is over the uniform input and the adversary's randomness. The requirement concerns random inputs, rather than asserting that every individual output is hard to invert.

The professor mentions several families of candidate problems:

| Mathematical problem | Basic intuition |
| --- | --- |
| Factoring | Multiplying primes is easy; recovering their factors appears hard. |
| Discrete logarithm | Modular exponentiation is efficient; reversing it appears hard. |
| Lattice-based problems | Certain geometric problems in high-dimensional lattices are believed to be hard. |
| Decoding random codes | Recovering a valid codeword or error pattern can be computationally difficult. |

## Two worlds

The professor contrasts **Minicrypt**, centered on one-way functions and symmetric cryptography, with **Cryptomania**, where public-key encryption and key exchange are also possible.

The existence of OWFs provides a foundation for efficient secret-key encryption, MACs and pseudorandom generators. Arbitrary OWFs are not known to be sufficient for public-key encryption or key exchange; known constructions use additional computational structure or assumptions. The professor briefly mentions trapdoor functions in this context, leaving their study for later.

## Sources

- [Lecture-4 slides, 2026/27](Assets/SLIDES/crypto_lecture04_2627.pdf): pp. 1–3 complete the auxiliary-lemma proof, included in [[CR LESSON 3#Proof of the auxiliary collision-probability lemma|lesson 3]]; pp. 3–6 introduce computational security and reductions; pp. 7–10 cover OWFs, negligible functions and the two computational worlds.
- [Lecture-4 transcript](<Assets/TRANSCRIPTION/CR LESSON 4 Transcripted.md>): supplementary reference for explanations and the lecture boundary; transcription errors remain possible.

The limitations, OWF and security-game SVGs are Codex redrawings of this draft's table and figures. The reduction SVG preserves the supplied diagram's layout. The replaced screenshot remains in `Assets/CRPIC/Pasted image 20261110174858.png`.
