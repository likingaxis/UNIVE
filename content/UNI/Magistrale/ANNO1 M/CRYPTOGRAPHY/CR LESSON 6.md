# Lesson 6 — Goldreich–Levin and One-Time Symmetric Encryption

In [[CR LESSON 5|lesson 5]], we saw two ingredients for building pseudorandom generators (PRGs): stretch amplification turns a one-bit-stretch PRG into a polynomial-stretch PRG, and a one-way permutation (OWP) paired with a hard-core predicate gives a one-bit-stretch PRG. That left two natural questions, which this lecture answers:

1. **Where do hard-core predicates come from?** Can one fixed predicate work for every one-way function (OWF), or do we need to transform the function first (the Goldreich–Levin theorem)?
2. **How do PRGs help with encryption?** Can a PRG overcome Shannon's key-length barrier in symmetric-key encryption, and how do we define and prove computational security for the resulting scheme?

Throughout this note, $n$ denotes the input or key length (playing the role of the security parameter $\lambda$, which appears explicitly in game notation), and $\parallel$ denotes string concatenation.

## Can a single predicate be hard-core for every OWF?

Recall from [[CR LESSON 5#Definition of a hard-core predicate|lesson 5]] that an efficiently computable predicate $h:\{0,1\}^n \to \{0,1\}$ is **hard-core** for a function $f$ if, given $f(x)$ for a uniform $x \gets U_n$, no probabilistic polynomial-time (PPT) adversary can predict $h(x)$ with probability non-negligibly better than $1/2$.

A tempting conjecture is that one simple predicate—such as the first input bit $h(x)=x_1$ or the parity of all bits—might be hard-core for *every* one-way function. **The answer is no.** For every candidate efficiently computable predicate $h$, we can build a one-way function $f_{\mathrm{bad}}$ that exposes $h(x)$ in its output while remaining hard to invert.

### Counterexample construction

Because we do not know how to prove the existence of one-way functions from scratch, we build $f_{\mathrm{bad}}$ starting from an assumed OWF $f:\{0,1\}^n \to \{0,1\}^n$. Given any efficiently computable predicate $h:\{0,1\}^n \to \{0,1\}$, define

$$
\boxed{f_{\mathrm{bad}}(x) = f(x) \parallel h(x)}.
$$

For example, if $f(x) = 10110$ and $h(x) = 1$, then $f_{\mathrm{bad}}(x) = 101101$.

Two properties must hold for $f_{\mathrm{bad}}$ to refute a universal predicate:

1. **$h$ is not hard-core for $f_{\mathrm{bad}}$.** Given $f_{\mathrm{bad}}(x) = f(x) \parallel h(x)$, an efficient predictor simply reads the last bit of the output and obtains $h(x)$ with probability $1$, which exceeds $1/2 + \operatorname{negl}(n)$.
Recall the hard-core security requirement:

\[ \Pr[\mathcal A(f(x))=h(x)] \leq \frac12+\operatorname{negl}(n) \]

This says that an efficient adversary shouldn't predict \(h(x)\) significantly better than random guessing.

But for our constructed function, the adversary can simply read the last bit:

\[ \boxed{ \Pr[\mathcal A(f_{\mathrm{bad}}(x))=h(x)]=1 } \]
2. **$f_{\mathrm{bad}}$ is still a one-way function.** Revealing one efficiently computable bit $h(x)$ alongside $f(x)$ does not let an efficient adversary recover a full preimage $x'$, as proved below.

>[!info]- negligible parenthesis for better understanding of the next theorem
> 
> For a one-way function \(f\), we require that every PPT adversary \(\mathcal A\) has a negligible probability of successfully inverting \(f\).
> 
> We can write:
> 
> \[ \boxed{\Pr[\mathcal A\text{ wins}]\leq\operatorname{negl}(n)} \]
> 
> A negligible function eventually becomes smaller than \(1/p(n)\) for every positive polynomial \(p(n)\).
> 
> Now, if we assume that \(f_{\mathrm{bad}}\) is not one-way, we're saying that some PPT adversary \(\mathcal A\) has a non-negligible success probability.
> 
> That means:
> 
> \[ \boxed{\Pr[\mathcal A\text{ wins}]=\varepsilon(n)} \]
> 
> with
> 
> \[ \boxed{\varepsilon(n)\geq\frac{1}{p(n)}} \]
> 
> for some polynomial \(p(n)\), for infinitely many \(n\).
> 
> Notice the direction of the inequality!

### Theorem — $f_{\mathrm{bad}}$ remains one-way

**Assumption:** $f:\{0,1\}^n \to \{0,1\}^n$ is a one-way function, and $h:\{0,1\}^n \to \{0,1\}$ is efficiently computable.

**Conclusion to prove:** $f_{\mathrm{bad}}(x) = f(x) \parallel h(x)$ is a one-way function.

**Proof of one-wayness of $f_{\mathrm{bad}}$ begins here.** Suppose, for contradiction, that $f_{\mathrm{bad}}$ is *not* one-way. Then there exists a PPT adversary $\mathcal A$ that wins the one-wayness game $\operatorname{Game}^{\mathrm{OWF}}_{f_{\mathrm{bad}},\mathcal A}(\lambda)$ with non-negligible probability $\varepsilon(n) \geq 1/\operatorname{poly}(n)$ (infinitely often). We construct a PPT reduction $\mathcal B$ that uses $\mathcal A$ as a subroutine to invert $f$ with non-negligible probability, contradicting the assumption that $f$ is one-way.

| | Adversary $\mathcal A$ | Reduction $\mathcal B$ |
| --- | --- | --- |
| Goal | Invert $f_{\mathrm{bad}}$ | Invert $f$ |
| Input received | $y \parallel \tilde b$ (simulated $f_{\mathrm{bad}}(x)$) | $y = f(x)$ for unknown $x \gets U_n$ |
| Role in the proof | Assumed to exist for contradiction | Constructed PPT inverter using $\mathcal A$ |

![[CR_L6_universal_predicate_reduction.svg|760]]

Given a challenge $y = f(x)$ from the OWF challenger $\mathcal C$ (where $x \gets U_n$ is hidden from $\mathcal B$), $\mathcal B$ cannot in general compute $h(x)$ directly from $y$. Instead, $\mathcal B$ proceeds as follows:

1. Sample a uniformly random bit $\tilde b \gets U_1$, independently of $x$ and $y$.
2. Form the simulated challenge $y \parallel \tilde b$ and send it to $\mathcal A$.
3. Receive a candidate preimage $x'$ from $\mathcal A$ and forward $x'$ to $\mathcal C$ as $\mathcal B$'s answer.

To analyze $\mathcal B$'s success probability, consider the event $\tilde b = h(x)$. Since $\tilde b$ is a fair coin flip independent of $x$, we have $\Pr[\tilde b = h(x)] = 1/2$. Conditioned on $\tilde b = h(x)$:

- $x$ is still uniformly distributed on $\{0,1\}^n$, and
- $\mathcal A$'s input is $(y \parallel \tilde b )= (f(x) \parallel h(x)) = (f_{\mathrm{bad}}(x))$, which has the **exact** distribution of a real $\operatorname{Game}^{\mathrm{OWF}}_{f_{\mathrm{bad}}}$ challenge.

Therefore, conditioned on $\tilde b = h(x)$, $\mathcal A$ returns a valid preimage $x'$ satisfying $f_{\mathrm{bad}}(x') = y \parallel \tilde b$ with probability $\varepsilon(n)$. Whenever this happens,

$$
f(x') \parallel h(x') = y \parallel \tilde b,
$$

so comparing the first $n$ bits guarantees $f(x') = y$, meaning $x'$ is also a valid preimage of $y$ under $f$. (We make no claim about what $\mathcal A$ outputs when $\tilde b \neq h(x)$ (the case 2), so we simply lower-bound $\mathcal B$'s probability by keeping only the good case $\tilde b = h(x)$.) Thus,

$$
\begin{aligned}
\Pr[\mathcal B\text{ wins}]
&\geq \Pr[\tilde b = h(x) \land \mathcal A\text{ wins}] \\
&= \Pr[\tilde b = h(x)] \cdot \Pr[\mathcal A\text{ wins} \mid \tilde b = h(x)] \\
&= \frac{1}{2}\varepsilon(n).
\end{aligned}
$$

Because $\varepsilon(n)$ is non-negligible, $\frac{1}{2}\varepsilon(n)$ is also non-negligible. Moreover, $\mathcal B$ runs in polynomial time because it only flips one coin and runs the PPT adversary $\mathcal A$ once. This contradicts the one-wayness of $f$. Hence $f_{\mathrm{bad}}$ is one-way, while $h$ is not hard-core for it. **End of proof.**

This rules out a universal hard-core predicate that works for every unmodified OWF. Notice that $f_{\mathrm{bad}}$ expands the output length by one bit relative to $f$; the general takeaway is that a hard-core predicate must be tailored to the function—or obtained by transforming the function first.
Two incompatible conclusions about the same adversary \(\mathcal B\)

Because \(f\) is one-way:

\[ \Pr[\mathcal B\text{ inverts }f] \leq\operatorname{negl}(n) \]

Because we assumed \(f_{\mathrm{bad}}\) is not one-way:

\[ \Pr[\mathcal B\text{ inverts }f] \geq\frac12\varepsilon(n) \]

A success probability cannot simultaneously be negligible and non-negligible.
## The Goldreich–Levin theorem

Since a single predicate cannot work for every unmodified OWF $f$, the next best thing is to transform any OWF $f$ into a related OWF $g$ that *does* have a known, explicit hard-core predicate $h$. That is precisely what the Goldreich–Levin theorem provides.

### Theorem statement

Let $f:\{0,1\}^n \to \{0,1\}^n$ be a one-way function. Define the padded function $g$ and the inner-product predicate $h$ on $2n$-bit inputs $(x,r) \in \{0,1\}^n \times \{0,1\}^n$ by

$$
\boxed{
\begin{aligned}
g:\{0,1\}^{2n} &\longrightarrow \{0,1\}^{2n},
& g(x,r) &= f(x) \parallel r, \\
h:\{0,1\}^{2n} &\longrightarrow \{0,1\},
& h(x,r) &= \langle x,r \rangle = \sum_{i=1}^{n} x_i r_i \bmod 2 = \bigoplus_{i=1}^{n} x_i r_i.
\end{aligned}
}
$$

Here $x = (x_1,\dots,x_n)$ and $r = (r_1,\dots,r_n)$ are $n$-bit strings, and $\langle x,r\rangle$ is their binary inner product modulo $2$. The Goldreich–Levin theorem states two properties:

1. **$g$ is a one-way function.**
2. **$h$ is a hard-core predicate for $g$.**

Intuitively, each bit $r_i = 1$ selects the bit $x_i$ to include in the XOR sum, while bits with $r_i = 0$ are ignored. Thus, for a uniformly random $r$, $f(x)$ may leak partial information about $x$, yet it still hides the parity (XOR) of a random subset of the bits of $x$.


> [!example]- Example: Computing the Goldreich–Levin predicate
> Let $n = 4$, $x = 1011$, and $r = 1101$. Then
> $$
> g(x,r) = f(1011) \parallel 1101,
> \qquad
> h(x,r) = (1\cdot 1) \oplus (0\cdot 1) \oplus (1\cdot 0) \oplus (1\cdot 1) = 1 \oplus 0 \oplus 0 \oplus 1 = 0.
> $$
> The string $r$ appears in the clear inside $g(x,r)$, whereas $x$ is hidden behind $f(x)$.

### Proof of property 1 ($g$ is one-way)

**Assumption:** $f:\{0,1\}^n \to \{0,1\}^n$ is a one-way function.

**Conclusion to prove:** $g(x,r) = f(x) \parallel r$ is a one-way function.

**Proof of property 1 begins here.** Suppose, for contradiction, that there exists a PPT adversary $\mathcal A$ that inverts $g$ with non-negligible probability $\varepsilon(n)$. We construct a PPT reduction $\mathcal B$ that uses $\mathcal A$ to invert $f$.

|                 | Adversary $\mathcal A$                | Reduction $\mathcal B$               |
| --------------- | ------------------------------------- | ------------------------------------ |
| Goal            | Invert $g(x,r) = f(x) \parallel r$    | Invert $f(x)$                        |
| Input received  | $y \parallel r$                       | $y = f(x)$ for unknown $x \gets U_n$ |
| Output returned | Candidate $(x', r') \in \{0,1\}^{2n}$ | Candidate $x' \in \{0,1\}^n$         |

![[CR_L6_gl_one_wayness_reduction.svg|760]]

Given a challenge $y = f(x)$ from the OWF challenger $\mathcal C$ (where $x \gets U_n$ is unknown to $\mathcal B$), $\mathcal B$ works as follows:

1. Sample $r \gets U_n$ uniformly and independently of $x$ and $y$.
2. Send $y \parallel r$ to $\mathcal A$.
3. When $\mathcal A$ outputs a pair $(x', r') \in \{0,1\}^n \times \{0,1\}^n$, $\mathcal B$ outputs $x'$ to $\mathcal C$ (optionally checking first that $f(x') \parallel r' = y \parallel r$).

Why is this simulation exact? In the real one-wayness game for $g$, the challenger samples $(x,r) \gets U_{2n}$, which is equivalent to sampling $x \gets U_n$ and $r \gets U_n$ independently, and hands $g(x,r) = f(x) \parallel r$ to $\mathcal A$. Because $\mathcal B$ receives $y = f(x)$ for $x \gets U_n$ and samples $r \gets U_n$ independently, the string $y \parallel r$ given to $\mathcal A$ has the **exact** distribution of a real $g$-challenge.

Contrast this with the $f_{\mathrm{bad}}$ reduction: there, the appended bit $h(x)$ depended on the hidden input $x$, forcing $\mathcal B$ to guess $\tilde b$ and lose a factor of $1/2$. Here, $r$ is completely independent of $x$, so $\mathcal B$ does not need to guess anything—there is **no factor of $1/2$ or $2^{-n}$ loss**.
Constructing a genuine challenge

Since \(r\) is sampled independently and uniformly, the string \(y\parallel r\) has exactly the same distribution as a genuine \(g(x,r)\) challenge.

Therefore:

\[ \boxed{\Pr[\text{correct simulation}]=1} \]

Unlike the \(f_{\mathrm{bad}}\) proof, we don't need to guess a specific unknown bit.
Whenever $\mathcal A$ returns a valid preimage $(x', r')$ for $y \parallel r$, we have

$$
g(x', r') = f(x') \parallel r' = y \parallel r,
$$

and matching the first $n$ bits yields $f(x') = y$. As before, $x'$ need not equal the original $x$; any valid preimage suffices. Hence

$$
\Pr[\mathcal B\text{ wins}] \geq \Pr[\mathcal A\text{ wins}] = \varepsilon(n)
$$

(with equality if $\mathcal B$ verifies $g(x',r') = y \parallel r$ before outputting $x'$). Since $\mathcal B$ is PPT and $\varepsilon(n)$ is non-negligible, this contradicts the one-wayness of $f$. Therefore $g$ is one-way. **End of proof of property 1.**

### Property 2 ($h$ is hard-core for $g$): intuition only

**Proof status: the full proof of property 2 is omitted in this lecture.** Proving that $h(x,r) = \langle x,r \rangle$ is hard-core for $g(x,r) = f(x) \parallel r$ against any PPT adversary that succeeds slightly above $1/2$ is substantially harder, so the professor explains only the core intuition.

**Idealized intuition.** Suppose we had a much stronger, *perfect* adversary $\mathcal A$ that, given $g(x,r) = f(x) \parallel r$, **always** computes $h(x,r) = \langle x,r\rangle$ (with probability $1$) **for every choice of $r$**. Then an inverter $\mathcal B$, given $y = f(x)$, could recover $x$ bit by bit by querying $\mathcal A$ on the $n$ standard basis vectors $e_1, \dots, e_n \in \{0,1\}^n$ (where $e_i$ has $1$ in position $i$ and $0$ everywhere else).

For $n = 4$, querying the four basis vectors yields

$$
\begin{aligned}
h(x, e_1) &= \langle x, 1000 \rangle = x_1, & h(x, e_2) &= \langle x, 0100 \rangle = x_2, \\
h(x, e_3) &= \langle x, 0010 \rangle = x_3, & h(x, e_4) &= \langle x, 0001 \rangle = x_4.
\end{aligned}
$$

In general, $n$ queries recover $x = (x_1,\dots,x_n)$, inverting $f(x)$ in polynomial time and contradicting the one-wayness of $f$.

**Why this is intuition, not the actual proof.** A real adversary breaking the hard-core property is **not** required to succeed with probability $1$ or on fixed vectors like $e_i$. It only needs to predict $h(x,r)$ with probability $\frac{1}{2} + \frac{1}{\operatorname{poly}(n)}$ averaged over a **uniformly random** choice of $r \gets U_n$. Such an adversary could always fail on the basis vectors $e_1, \dots, e_n$ while still succeeding on random $r$. The real Goldreich–Levin proof must query $\mathcal A$ on carefully correlated inputs whose marginal distribution remains uniform, then reconstruct $x$ from noisy answers—which is beyond the scope of this course.

**Connecting back to PRGs.** Notice the chain we now have: starting from a one-way permutation $f$, $g(x,r) = f(x)\parallel r$ is also a OWP with explicit hard-core predicate $h(x,r) = \langle x,r\rangle$. By [[CR LESSON 5#Theorem 3 — A one-bit-stretch PRG from an OWP|Theorem 3]] and [[CR LESSON 5#Ingredient 1: stretch amplification|Theorem 2]] of lesson 5, this gives PRGs of arbitrary polynomial stretch (and, with additional techniques beyond our scope, general OWFs imply PRGs as well). We now put PRGs to work in encryption.

## Applying PRGs to symmetric encryption: PRG-OTP

In [[CR LESSON 1|lesson 1]] and [[CR LESSON 2|lesson 2]], we saw that the One-Time Pad (OTP), $\operatorname{Enc}(k,m) = k \oplus m$, achieves **perfect secrecy**, meaning not even a computationally unbounded adversary learns anything about the plaintext. However, Shannon's impossibility theorem imposes a severe price: any perfectly secret scheme must satisfy $|\mathcal K| \geq |\mathcal M|$, so the uniform key $k$ must be at least as long as the message $m$.

Can we **beat Shannon's bound** by moving from information-theoretic secrecy to **computational security**? Yes: we replace the truly random $2n$-bit pad with the output of a PRG applied to a shorter $n$-bit key.

### The PRG-OTP construction

Let $G:\{0,1\}^n \to \{0,1\}^{2n}$ be a secure PRG. Sample a uniform secret key $k \gets U_n$. For messages and ciphertexts $m, c \in \{0,1\}^{2n}$, define $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ by

$$
\boxed{\operatorname{Enc}(k, m) = G(k) \oplus m},
\qquad
\boxed{\operatorname{Dec}(k, c) = G(k) \oplus c}.
$$

**Correctness** follows immediately because XOR cancels the regenerated pad(recovering message):

$$
\operatorname{Dec}(k, \operatorname{Enc}(k,m)) = G(k) \oplus (G(k) \oplus m) = m.
$$

![[CR_L6_prg_otp.svg|780]]

*(Remark from class Q&A: by stretch amplification from [[CR LESSON 5|lesson 5]], $G$ can expand $n$ bits to $n + \ell(n)$ bits for any known polynomial stretch $\ell(n)$, so the parties do not even need to know the exact message length in advance when exchanging $k$—only an upper bound—and can generate as many pseudorandom pad bits as needed.)*

### Properties and limitations

Although PRG-OTP uses a key strictly shorter than the message ($|k| = n < 2n = |m|$), two important limits remain:

1. **It is not perfectly secure.** An $n$-bit key can generate at most $2^n$ distinct pads out of $2^{2n}$ possible strings, violating Shannon's $|\mathcal K| \geq |\mathcal M|$ condition. A computationally unbounded adversary can test all $2^n$ keys just as in lesson 5's counting attack. Note that determinism of $\operatorname{Enc}$ is not what prevents perfect secrecy—ordinary OTP is also deterministic—rather, the shorter key space is.
2. **It is still strictly one-time.** Because $\operatorname{Enc}$ is deterministic, encrypting two messages $m_1, m_2$ with the same key $k$ reuses the same pad $G(k)$:

$$
\begin{aligned}
c_1 &= G(k) \oplus m_1, \\
c_2 &= G(k) \oplus m_2, \\
c_1 \oplus c_2 &= (G(k) \oplus m_1) \oplus (G(k) \oplus m_2) = m_1 \oplus m_2.
\end{aligned}
$$

An eavesdropper immediately learns $m_1 \oplus m_2$, just as in standard OTP key reuse. Thus PRG-OTP solves the key-length problem, not the key-reuse problem; it is a warm-up toward multi-message security in the next lecture.

(this table is not written well is strange)

| Property               | Standard OTP                             | PRG-OTP                                            |      |     |               |     |     |     |     |                            |
| ---------------------- | ---------------------------------------- | -------------------------------------------------- | ---- | --- | ------------- | --- | --- | --- | --- | -------------------------- |
| Pad used               | Truly uniform $k \gets U_{2n}$           | Pseudorandom $G(k)$ with $k \gets U_n$             |      |     |               |     |     |     |     |                            |
| Key length vs. message | $                                        | k                                                  | \geq | m   | $ ($2n$ bits) | $   | k   | <   | m   | $ ($n$ bits vs. $2n$ bits) |
| Key reuse              | Insecure (leaks $m_1 \oplus m_2$)        | Insecure (leaks $m_1 \oplus m_2$)                  |      |     |               |     |     |     |     |                            |
| Security achieved      | Perfect secrecy (unbounded $\mathcal A$) | One-time computational security (PPT $\mathcal A$) |      |     |               |     |     |     |     |                            |

## One-time computational security for SKE(Symmetric-Key Encryption)

To prove that PRG-OTP is secure, we first need a formal definition of security against PPT adversaries. Recall from lesson 2 that **perfect secrecy** can be expressed as an equivalence of distributions: for every pair of equal-length messages $m_0, m_1 \in \mathcal M$,

$$
\operatorname{Enc}(K, m_0) \equiv \operatorname{Enc}(K, m_1),
$$

so not even a computationally unbounded adversary can distinguish an encryption of $m_0$ from an encryption of $m_1$.

In the computational setting, we make two natural changes: we restrict the adversary $\mathcal A$ to **PPT**, and we relax identical distributions ($\equiv$) to **computational indistinguishability** ($\approx_c$).

### Formal definition

Let $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ be a symmetric-key encryption scheme with key space $\mathcal K$ (with uniform key sampling $k \gets \mathcal K$) and message space $\mathcal M$. For each fixed challenge bit $b \in \{0,1\}$, define the experiment $\operatorname{Game}^{\mathrm{one\text{-}time}}_{\Pi,\mathcal A}(\lambda, b)$:

1. The PPT adversary $\mathcal A$ chooses two equal-length messages $m_0, m_1 \in \mathcal M$ and sends them to the challenger $\mathcal C$.
2. The challenger samples a fresh key $k \gets \mathcal K$, computes the ciphertext $c = \operatorname{Enc}(k, m_b)$, and sends $c$ to $\mathcal A$.
3. The adversary outputs a bit $b' \in \{0,1\}$, which is the output of the game.

![[CR_L6_one_time_worlds.svg|780]]

**Definition.** $\Pi$ is **one-time computationally secure** if for every PPT adversary $\mathcal A$,

$$
\boxed{
\operatorname{Game}^{\mathrm{one\text{-}time}}_{\Pi,\mathcal A}(\lambda, 0)
\approx_c
\operatorname{Game}^{\mathrm{one\text{-}time}}_{\Pi,\mathcal A}(\lambda, 1)
},
$$

that is,

$$
\left|
\Pr\!\left[\operatorname{Game}^{\mathrm{one\text{-}time}}_{\Pi,\mathcal A}(\lambda, 0) = 1\right]
-
\Pr\!\left[\operatorname{Game}^{\mathrm{one\text{-}time}}_{\Pi,\mathcal A}(\lambda, 1) = 1\right]
\right|
\leq \operatorname{negl}(\lambda).
$$

Here the probabilities are over the uniform choice of $k$, any randomness of $\operatorname{Enc}$ (if randomized), and the internal coins of $\mathcal A$. Notice that $b$ is fixed outside the experiment and is hidden from $\mathcal A$. *(An equivalent formulation lets $\mathcal C$ sample $b \gets U_1$ inside a single game and requires $\left|\Pr[b' = b] - \frac{1}{2}\right| \leq \operatorname{negl}(\lambda)$; both formulations define the same security notion.)*

As with all computational definitions, the negligible bound is **asymptotic** in $\lambda$. Seeing outputs like $0.5001$ and $0.5002$ at one fixed $\lambda$ gives a difference of $0.0001$, which does not tell us whether the scheme is secure or broken—what matters is that the gap decays faster than $1/\operatorname{poly}(\lambda)$ as $\lambda$ grows. A constant nonzero advantage (such as $0.0001$ for all $\lambda$) is not negligible.

### Sanity checks: why weaker security goals are insufficient

Why use an indistinguishability game instead of simpler properties like "hard to recover the key" or "hard to recover the message"? The professor checks three natural properties against our definition:

1. **Hardness of computing the key $k$ is implied, but not sufficient.**
   - *Implied:* If an adversary could recover $k$ from $c$, it could decrypt $c$, check whether $\operatorname{Dec}(k,c)$ equals $m_0$ or $m_1$, and win the game.
   - *Not sufficient:* Consider the broken scheme $\operatorname{Enc}(k, m) = m$. Here the ciphertext reveals *nothing* about $k$, so recovering $k$ is impossible—yet the scheme leaks the entire plaintext $m$!
2. **Hardness of computing the full message $m$ is implied, but not sufficient.**
   - *Implied:* If an adversary could compute $m_b$ from $c$, it could tell $m_0$ from $m_1$.
   - *Not sufficient:* A secure scheme must hide **every bit and every partial property** of $m$, not just the full string. If a scheme leaked only the first bit of $m$, a PPT adversary could choose
     $$
     m_0 = 0000, \qquad m_1 = 1000
     $$
     and distinguish $\operatorname{Enc}(k, m_0)$ from $\operatorname{Enc}(k, m_1)$ with probability $1$. Because $\mathcal A$ is free to choose *any* pair $(m_0, m_1)$, our definition guarantees that no efficiently computable partial information about $m$ is leaked.
3. **Why the definition is strictly one-time.** In the game, $\mathcal A$ receives only a **single** ciphertext encrypted under $k$. Nothing in this definition requires security when two or more ciphertexts are encrypted under the same key.

## Security proof of PRG-OTP

We now prove that PRG-OTP satisfies our new computational definition.

### Theorem — One-time security of PRG-OTP

**Assumption:** $G:\{0,1\}^n \to \{0,1\}^{2n}$ is a secure PRG, meaning $G(U_n) \approx_c U_{2n}$.

**Conclusion to prove:** The PRG-OTP scheme $\Pi = (\operatorname{Enc}, \operatorname{Dec})$ defined by $\operatorname{Enc}(k,m) = G(k) \oplus m$ is one-time computationally secure.

**Proof begins here.** Let $\mathcal A$ be any PPT adversary in the one-time security game. To keep notation compact, write

$$
G_0 \equiv \operatorname{Game}^{\mathrm{one\text{-}time}}_{\Pi,\mathcal A}(\lambda, 0),
\qquad
G_1 \equiv \operatorname{Game}^{\mathrm{one\text{-}time}}_{\Pi,\mathcal A}(\lambda, 1),
$$

where $G_0$ and $G_1$ denote *games* (distinguished by subscripts from the generator $G$). Our goal is to prove $G_0 \approx_c G_1$.

**Proof route (Game Hopping).** Rather than trying to jump directly from $G_0$ (encrypting $m_0$ with a PRG pad) to $G_1$ (encrypting $m_1$ with a PRG pad), we introduce two intermediate **hybrid games** $H_0$ and $H_1$ that replace the pseudorandom pad $G(k)$ with a truly uniform $2n$-bit pad $z \gets U_{2n}$. This produces a three-step chain:

$$
G_0 \approx_c H_0 \equiv H_1 \approx_c G_1.
$$

### Step 1 — Construct the hybrid games and show $H_0 \equiv H_1$

For each fixed $b \in \{0,1\}$, compare the real game $G_b$ and the hybrid game $H_b$:

$$
\begin{aligned}
G_b:&\quad \text{sample } k \gets U_n, \quad \text{compute } c = G(k) \oplus m_b, \\
H_b:&\quad \text{sample } z \gets U_{2n}, \quad \text{compute } c = z \oplus m_b.
\end{aligned}
$$

Everything else in the interaction with $\mathcal A$ (receiving $m_0, m_1$, sending $c$, and outputting $b'$) is identical.

![[CR_L6_real_and_hybrid.svg|780]]

In $H_b$, the pad $z \gets U_{2n}$ is truly uniform and independent of $m_0, m_1$, which means $H_b$ is simply the **standard One-Time Pad** applied to $m_b$. By the **perfect secrecy of OTP**, both $z \oplus m_0$ and $z \oplus m_1$ are uniformly distributed on $\{0,1\}^{2n}$, regardless of which $m_0, m_1$ the adversary chose. Therefore, $\mathcal A$'s view—and hence its output distribution—is **identical** in $H_0$ and $H_1$:

$$
\boxed{H_0 \equiv H_1},
\qquad\text{so}\qquad
\Pr[H_0 = 1] - \Pr[H_1 = 1] = 0.
$$

Notice that $\equiv$ here is exact equality of distributions (zero distinguishing advantage, even for an unbounded adversary), not merely computational indistinguishability.

### Step 2 — Prove $G_b \approx_c H_b$ for each fixed $b \in \{0,1\}$

It remains to bridge the two outer hops: $G_0 \approx_c H_0$ and $H_1 \approx_c G_1$. Fix either $b \in \{0,1\}$ and suppose, for contradiction, that a PPT adversary $\mathcal A$ distinguishes $G_b$ from $H_b$ with non-negligible advantage:

$$
\varepsilon(\lambda) = \left|\Pr[\mathcal A \text{ outputs } 1 \text{ in } G_b] - \Pr[\mathcal A \text{ outputs } 1 \text{ in } H_b]\right|.
$$

We construct a PPT distinguisher $\mathcal B$ that breaks the PRG security of $G$.

| | Adversary $\mathcal A$ | Reduction $\mathcal B$ |
| --- | --- | --- |
| Goal | Distinguish $G_b$ from $H_b$ | Distinguish $G(U_n)$ from $U_{2n}$ |
| Input received | Ciphertext $c = \mathrm{pad} \oplus m_b$ | PRG challenge $z \in \{0,1\}^{2n}$ |
| Role in the proof | Assumed distinguisher for fixed $b$ | Constructed PPT distinguisher using $\mathcal A$ |

![[CR_L6_prg_otp_reduction.svg|780]]

The PRG challenger $\mathcal C$ gives $\mathcal B$ a single $2n$-bit string $z$, sampled either as $z = G(k)$ for $k \gets U_n$, or as $z \gets U_{2n}$. $\mathcal B$ does not know which world produced $z$, and executes:

1. Start $\mathcal A$ (`"START"`) and receive its chosen messages $m_0, m_1 \in \{0,1\}^{2n}$.
2. Using the fixed bit $b$ and its challenge $z$ as the pad, compute $c = z \oplus m_b$.
3. Send $c$ to $\mathcal A$, receive $\mathcal A$'s output bit $b'$, and output $b'$ to $\mathcal C$.

**Why this is a perfect reduction:** $\mathcal B$ uses its challenge $z$ directly in the exact position where $G_b$ and $H_b$ differ:

- **If $z = G(k)$ with $k \gets U_n$:** then $c = G(k) \oplus m_b$, so $\mathcal A$ receives the **exact** ciphertext distribution of $G_b$. Because $\mathcal B$ outputs $\mathcal A$'s bit $b'$ unchanged,
  $$
  \Pr_{k \gets U_n}[\mathcal B(G(k)) = 1] = \Pr[\mathcal A \text{ outputs } 1 \text{ in } G_b].
  $$
- **If $z \gets U_{2n}$:** then $c = z \oplus m_b$, so $\mathcal A$ receives the **exact** ciphertext distribution of $H_b$, giving
  $$
  \Pr_{z \gets U_{2n}}[\mathcal B(z) = 1] = \Pr[\mathcal A \text{ outputs } 1 \text{ in } H_b].
  $$

Subtracting these two equalities and taking absolute values shows that $\mathcal B$ achieves the exact same advantage as $\mathcal A$, with zero loss:

$$
\operatorname{Adv}^{G}_{\mathcal B}(\lambda)
= \left|\Pr_{k \gets U_n}[\mathcal B(G(k)) = 1] - \Pr_{z \gets U_{2n}}[\mathcal B(z) = 1]\right|
= \left|\Pr[\mathcal A \text{ outputs } 1 \text{ in } G_b] - \Pr[\mathcal A \text{ outputs } 1 \text{ in } H_b]\right|
= \varepsilon(\lambda).
$$

Furthermore, $\mathcal B$ is PPT because it runs $\mathcal A$ once and performs a single $2n$-bit XOR. Since $\varepsilon(\lambda)$ is non-negligible, $\mathcal B$ breaks the PRG security of $G$—a contradiction. Therefore, $G_b \approx_c H_b$ for both $b = 0$ and $b = 1$, meaning there exist negligible functions $\operatorname{negl}_0(\lambda)$ and $\operatorname{negl}_1(\lambda)$ bounding the gaps $| \Pr[G_0 = 1] - \Pr[H_0 = 1] |$ and $| \Pr[H_1 = 1] - \Pr[G_1 = 1] |$.

### Step 3 — Combine the hops via the triangle inequality

Putting the three hops together gives

$$
\underbrace{G_0 \approx_c H_0}_{\text{PRG security}}
\;\underbrace{\equiv}_{\text{OTP perfect secrecy}}\;
\underbrace{H_1 \approx_c G_1}_{\text{PRG security}}.
$$

![[CR_L6_game_hopping.svg|820]]

Writing out the probability difference between $G_0$ and $G_1$ and applying the triangle inequality yields

$$
\begin{aligned}
\left|\Pr[G_0 = 1] - \Pr[G_1 = 1]\right|
&= \Big|\Pr[G_0 = 1] - \Pr[H_0 = 1] + \underbrace{\Pr[H_0 = 1] - \Pr[H_1 = 1]}_{= 0\text{ because }H_0 \equiv H_1} + \Pr[H_1 = 1] - \Pr[G_1 = 1]\Big| \\
&\leq \left|\Pr[G_0 = 1] - \Pr[H_0 = 1]\right| + \left|\Pr[H_1 = 1] - \Pr[G_1 = 1]\right| \\
&\leq \operatorname{negl}_0(\lambda) + \operatorname{negl}_1(\lambda)
= \operatorname{negl}(\lambda),
\end{aligned}
$$

because the sum of two negligible functions is negligible. Hence $G_0 \approx_c G_1$, proving that PRG-OTP is one-time computationally secure. **End of proof.**

### Where this leaves us

Starting from any OWF (or OWP + Goldreich–Levin), we obtained PRGs and used them to encrypt a message longer than the secret key with one-time computational security. However, deterministic encryption with a single pad still fails if the key is reused. Overcoming this one-time restriction—to encrypt many messages of arbitrary length under a single short key—requires a stronger primitive introduced in the next lecture: **pseudorandom functions (PRFs)**, modeled in practice by block ciphers such as AES.

## Sources

- [Local lecture-6 slides](Assets/SLIDES/crypto_lecture06_2627.pdf), PDF pp. 1–2: universal-predicate counterexample ($f_{\mathrm{bad}}$) and Goldreich–Levin theorem statement; p. 3: basis-vector intuition and PRG-OTP construction; pp. 4–6: one-time limitation, one-time computational security definition and sanity checks; pp. 6–8: game-hopping proof and perfect reduction $\mathcal B$.
- [Lecture-6 transcript](<Assets/TRANSCRIPTION/CR LESSON 6 Transcripted.md>): supporting classroom explanations and student Q&A (stretch-length question, single-call guessing vs. two calls in $f_{\mathrm{bad}}$), with automatic-transcription errors. Ends after the PRG-OTP security proof, announcing PRFs and AES for the next lecture.
