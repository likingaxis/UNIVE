FILE CON COPIA INCOLLA DOMANDE CHE CI HA FATTO CHAT NEL CORSO DEGLI STUDI

## **Checkpoint 1 — OTP correctness**

INDEPENDENT RECALL · QUESTION 1 OF 3

Consider the One-Time Pad encryption scheme:

\[ \begin{aligned} M=K=C&=\{0,1\}^{n}\\ \operatorname{Enc}_k(m)&=m\oplus k\\ \operatorname{Dec}_k(c)&=c\oplus k \end{aligned} \]

**Your task:** Prove that the One-Time Pad satisfies the correctness property.

I want you to:

1. State what _correctness_ formally means for an encryption scheme.
    
2. Apply that definition to OTP and derive the result.
    
3. Explain which mathematical property makes your proof work.
    

Write your proof in English, as you would during the exam. Try to reconstruct it independently, without checking your previous notes.

**Your turn.** I'll review your proof before we move to the perfect-secrecy checkpoint.
## **Checkpoint 1 — OTP Correctness**

Concept understood

Proof needs minor refinements

### **Answer 1 — Formal definition of correctness**

Your intuition is correct: Bob should recover exactly the message Alice encrypted.

However, you've described the encryption and decryption algorithms separately without explicitly stating the mathematical correctness condition.

**Exam-ready version:**

> Let \(\Pi=(\operatorname{Enc},\operatorname{Dec})\) be a secret-key encryption scheme over the key space \(\mathcal K\), message space \(\mathcal M\), and ciphertext space \(\mathcal C\).
> 
> The scheme satisfies correctness if, for every key \(k\in\mathcal K\) and every message \(m\in\mathcal M\), decrypting the encryption of \(m\) with the same key returns \(m\).

Formally:

\[ \boxed{\forall k\in\mathcal K,\ \forall m\in\mathcal M: \operatorname{Dec}_k(\operatorname{Enc}_k(m))=m} \]

Notice that correctness refers specifically to decrypting a ciphertext produced by the encryption algorithm, not an arbitrary ciphertext.

### **Answer 2 — Applying correctness to OTP**

Your reasoning is correct! You just need to write the intermediate steps more precisely.

\[ \begin{aligned} \operatorname{Dec}_k(\operatorname{Enc}_k(m)) &=\operatorname{Dec}_k(m\oplus k)\\ &=(m\oplus k)\oplus k\\ &=m\oplus(k\oplus k)\\ &=m\oplus 0^n\\ &=m \end{aligned} \]

The important detail is that we have proved the equation for **every possible message and key**, not merely for one example.

### **Answer 3 — Which XOR properties are used?**

You remembered the most important property, but not its name.

**Three XOR properties used in the proof**

|Property|Formula|
|---|---|
|Self-inverse|\(a\oplus a=0^n\)|
|Associativity|\((a\oplus b)\oplus c=a\oplus(b\oplus c)\)|
|Identity element|\(a\oplus0^n=a\)|

Your statement that XORing a bit string with itself produces zero is correct. This property is called the **self-inverse property**.

A better English sentence would be:

> The proof relies on the associativity and self-inverse properties of XOR. XORing a bit string with itself produces the all-zero string, which is the identity element for XOR.

One small correction: write _"The property states that..."_ rather than _"The property stays that..."_.




## **Checkpoint 2 — OTP Perfect Secrecy**

INDEPENDENT RECALL · QUESTION 2 OF 3

We know that OTP uses:

\[ \operatorname{Enc}_k(m)=m\oplus k \]

where \(k\) is sampled uniformly from \(\{0,1\}^n\).

**Your task:** Prove that OTP satisfies perfect secrecy using Theorem 1.1, specifically the characterization involving ciphertext distributions.

Try to reconstruct the proof independently.

I want to see whether you remember:

- What equality we must establish.
    
- How the uniform distribution of the key is used.
    
- Why this proves perfect secrecy for any pair of messages.
    

Write your proof in English. You can use mathematical notation, and you don't need to worry about making your English perfect.

**Your turn.** I won't give hints unless you need them.

## **Checkpoint 2 — OTP Perfect Secrecy**

Correct strategy

Proof incomplete

### **1. What you got right**

Your definition of perfect secrecy is correct in substance:

\[ \Pr[M=m\mid C=c]=\Pr[M=m] \]

Remember that we require this for every message distribution, every \(m\), and every ciphertext \(c\) with \(\Pr[C=c]>0\).

You also correctly chose Theorem 1.1, property (iii), to prove OTP secrecy.

### **2. An important correction**

You wrote:

\[ \forall m_0,m_1\in\mathcal M,\ k\in\mathcal K,\ c\in\mathcal C \]

There is one mistake: **we do not fix a particular key** \(k\).

Instead, we consider a _random variable_ \(K\), sampled uniformly from the key space.

The correct statement is:

\[ \boxed{ \begin{gathered} \forall m_0,m_1\in\mathcal M,\ \forall c\in\mathcal C:\\ \Pr_K[\operatorname{Enc}_K(m_0)=c]\\ =\Pr_K[\operatorname{Enc}_K(m_1)=c] \end{gathered} } \]

This distinction is essential because perfect secrecy concerns the distribution of ciphertexts when the encryption key is randomly sampled.

### **3. Your missing step — Hint 1**

You wrote:

> "...we have to prove it using the fact that k gives a unique encryption with a specify m..."

A more precise sentence is:

> For any fixed message \(m\) and ciphertext \(c\), there is exactly one key \(k\) such that encrypting \(m\) with \(k\) produces \(c\).

That's the right observation.

Now consider:

\[ m\oplus k=c \]

We know that \(m,c,k\in\{0,1\}^n\).

**Your next task has only two parts:**

1. Rearrange the equation \(m\oplus k=c\) to isolate \(k\). What XOR property allows you to do this?
    
2. Since \(K\) is uniformly distributed over \(\{0,1\}^n\), what is the probability of sampling that particular key?
    

Don't worry about completing the entire proof yet. Answer these two questions, and then we'll connect your result to Theorem 1.1.
## **Checkpoint 2 — OTP Perfect Secrecy**

Proof completed

Minor notation corrections

### **1. Mathematical evaluation**

Your reasoning is correct:

- You selected the correct characterization of perfect secrecy from Theorem 1.1.
    
- You showed that every fixed message–ciphertext pair determines exactly one key.
    
- You correctly used the uniform distribution of \(K\) to obtain probability \(2^{-n}\).
    
- You concluded that the probability is identical for both messages.
    

There is just one formal detail to fix.

You wrote:

> For every \(k\in\mathcal K\) sampled uniformly at random.

Instead, write:

> Let \(K\) be uniformly distributed over \(\mathcal K=\{0,1\}^n\).

We quantify over messages and ciphertexts, while the probability is taken over the random key \(K\).

### **2. Your proof — Exam-ready English**

Here is your reasoning rewritten in mathematical English, preserving your original approach.

> **Proof.** We want to prove that the One-Time Pad satisfies perfect secrecy using Theorem 1.1 (iii).
> 
> For every pair of messages \(m_0,m_1\in\mathcal M\) and every ciphertext \(c\in\mathcal C\), we must establish that:

\[ \Pr_K[\operatorname{Enc}_K(m_0)=c] = \Pr_K[\operatorname{Enc}_K(m_1)=c]. \]

> For any fixed message \(m\) and ciphertext \(c\), there exists exactly one key \(k\) such that \(m\oplus k=c\).
> 
> Indeed, using the properties of XOR:

\[ \begin{aligned} m\oplus k &= c\\ m\oplus m\oplus k &= m\oplus c\\ k &= m\oplus c. \end{aligned} \]

> Since \(K\) is uniformly distributed over \(\{0,1\}^n\), the probability of sampling this particular key is \(2^{-n}\).
> 
> Therefore, for every message \(m\) and ciphertext \(c\):

\[ \Pr_K[\operatorname{Enc}_K(m)=c]=2^{-n}. \]

> In particular:

\[ \boxed{ \Pr_K[\operatorname{Enc}_K(m_0)=c] = 2^{-n} = \Pr_K[\operatorname{Enc}_K(m_1)=c] } \]

> Hence, by Theorem 1.1 (iii), the One-Time Pad satisfies perfect secrecy. \(\square\)

### **3. English corrections**

|Your expression|Better English|
|---|---|
|"we can have"|"we obtain"|
|"there is exactly one key k"|Correct as written|
|"enc m with k gives c"|"encrypting m with k produces c"|
|"we have \(2^{-n}\) prob of get that exact k"|"the probability of sampling that particular key is \(2^{-n}\)"|
|"the same goes for \(m_1\)"|"the same argument applies to \(m_1\)"|

Notice that your English is already sufficiently clear to communicate your mathematical ideas. The main improvement is using more precise terminology.



## **heckpoint 3 — OTP Key Reuse**

INDEPENDENT RECALL · QUESTION 3 OF 3

Consider two messages \(m_0,m_1\in\{0,1\}^n\) encrypted using the **same OTP key** \(k\):

\[ \begin{aligned} c_0 &= m_0\oplus k\\ c_1 &= m_1\oplus k \end{aligned} \]

An adversary intercepts both ciphertexts \(c_0\) and \(c_1\), but does not know \(k\).

**Your task:**

Explain what the adversary learns by computing

\[ c_0\oplus c_1. \]

Show the mathematical derivation and explain **why this creates a confidentiality problem even though the key remains secret**.

Try to answer without looking at the previous proof.

Once we've checked this, we'll close the OTP recall checkpoint and move to **Shannon's Key-Length Lower Bound**, as specified in our W0 roadmap.


## **Checkpoint 3 — OTP Key Reuse**

Passed independently

### **1. Mathematical feedback**

You initially wrote:

\[ m_0\oplus k=m_1\oplus k \]

This equality is **not generally true**. It would imply \(m_0=m_1\).

Instead, start from the XOR of the two ciphertexts, as you correctly did in your second answer:

\[ \begin{aligned} c_0\oplus c_1 &=(m_0\oplus k)\oplus(m_1\oplus k)\\ &=m_0\oplus m_1\oplus(k\oplus k)\\ &=m_0\oplus m_1. \end{aligned} \]

You used two properties correctly:

- **Associativity and commutativity:** allow us to rearrange the XOR terms.
    
- **Self-inverse property:** \(k\oplus k=0^n\).
    

Your observation about known plaintext is also correct. If the adversary knows \(m_0\), they can recover \(m_1\):

\[ m_1=c_0\oplus c_1\oplus m_0 \]

### **2. One conceptual distinction**

You wrote:

> The perfect secrecy says that seeing the ciphertext wont gives to us information about the message but in this case we can have some.

Your intuition is right, but the distinction is important:

**OTP is perfectly secret for one encryption with a fresh, uniformly random key.** Reusing that key for multiple messages violates the one-time assumption and leaks a relationship between the plaintexts.

Even when neither message is known, revealing \(m_0\oplus m_1\) is a confidentiality problem because it exposes information about the two messages jointly.




1. we want to assume shannon length theorem |K|>|M| if we want perfect secrecy
2. proving this by contradiction saying that |K|<|M|
3. if |K|<|M| this means that fixing a c in C gives to us a subset of M with all the plaintext decrypted by this c called Mc:{for all k in K : Dec(k,c)}
4. we have that |Mc|<=|K| because with a single key we can decrypt a single message, but with more keys we can decrypt the same message, so at most we can have K different messages
5. |Mc|<=|K|<|M| so |Mc|<|M| and we can conclude that exist an m* in M\Mc so for all k in K and a fixed m* and c we have Dec(k,c)!=m*
6. now we have to estabilish a proof for the encryption part starting with saying that forall k in K and fixed c in C and fixed m* in M\Mc we have that Enc(k,m*)!=c we make a proof by contradiction saying that Enc(k,m*)=c using correctness property we notice that Dec(k,Enc(k,m*))=m* but we know that Dec(k,c)!=m* this contradict the proof and we can say that Enc(k,m*)!=c
7. with the shennon perfect secrecy we know this Pr[M=m|C=c]=Pr[M=m] such that Pr[C=c]>0 once we notice that fixing a c and a m* we can say that the first probability is 0 the second is 1/|M| this make a contradiction so e can say that for perfect secrecy|K|>=|M|

Suppose that |K| < |M|. Having $M_{c} = {Dec(k,c) : \ k \in K}$ this means that $|M_{c}| \le |K| < |M|$ and so there exist a m* whose $\notin M_{c}$. So Dec(k,c) != m* -> Enc(k,m) != c (by correctness) (&). So we violate $[Pr[M=m* |C=c] = Pr[M=m_]$ because

- $Pr[M=m

_] = \frac{1}{|M|}$

- $Pr[M=m* | C = c] = \frac{Pr[C=c | M=m_] \cdot Pr[M=m_]}{Pr[C=c]}$
    
    - the first one on the numerator is = 0 (by (&))
    

So that means that $|K| \ge |M|$