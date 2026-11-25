
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
All keys are equally likely, so:
$$\begin{aligned} \Pr_{a,b}\big[h_{a,b}(m)=\tau \land h_{a,b}(m')=\tau'\big] &= \frac{\text{Number of satisfying keys}}{\text{Total number of keys}}\\[6pt] &= \frac{1}{p^2}\\[6pt] &= \frac{1}{|\mathcal T|^2} \end{aligned}$$
Therefore, the affine hash family is pairwise independent. $\square$

To conclude that the resulting MAC $\operatorname{Tag}((a,b), m) = h_{a,b}(m)$ is one-time statistically secure, we apply **Theorem 2.3**, giving the optimal bound:
$$\boxed{\varepsilon = \frac{1}{|\mathcal T|} = \frac{1}{p}}\qquad\blacksquare$$
