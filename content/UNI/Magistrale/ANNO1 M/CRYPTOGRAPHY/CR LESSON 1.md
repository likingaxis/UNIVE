- Contains 3 parts
	- each 1 exercise + 1 theory question
- focuses on provable security:
	- modern approach to crypto
- assumptions definition:
	- k
##### Cryptography in details
Alice <-> Bob

- property 1: confidentiality
	- Alice sends a message to Bob but Eve listen to it
	- Alice -m-> Bob
- property 2: integrity
	-  Alice sends a message to Bob but Eve intercept it and change it $m'\neq m$ 

in the real life we want both properties in action

## Secret key cryptography
##### Unconditional Security (both properties)
Treatment due to Claude Shannon
prove security without assumptions
- what we mean when we say prove?
cryptography primitive is encryption
this primitive allows confidentiality
Alice and bob share a key $k\in K$ 
with an Encryption and Dec 
$$\pi={Enc,Dec}$$
Assumption: $k \in K$ is uniformly random and unknown to Eve
- kerckhoff principle

Enc: K x M -> C
Dec: K x C -> U
Correctness: forall k in K and forall m in U
Dec (k,enc(k,m))=m


Shannon gives us a definition of symmetric encryption and ... (49:00)
- the adversary doesnt matter
##### Definition(Perfect Secrecy):
Let M be any distribution on $\mathbb{M}$ (probability distribution) and $K$ the uniform distribution on $\mathbb{K}$
then C=Enc (K,M) is a distribution (C is the Cypher)
we say that $\pi=(Enc,Dec)$ is perfectly secret if forall M and forall m in $\mathbb{M}$ and forall c in C
Pr[M=m] (priory probability that adversary know what the message sent by alice is)
so this probability is equal to probability posterior that $Pr[M=m|C=c]$
all this before assumptions (1:00:00)
###### Perfect Secrecy have an algorithm but at a high price
> Thm. The following are equivalent:
> (i) Perfect secrecy
> (nn) M,C are independent (I(M,C)=0)
> (nnn) forall m, m' in mathbb M forall c in C
> Pr[Enc(K,m)=c]=Pr[Enc(K,m')=c]
> if you look at c, then every m in M has the same probability
> probability taken over K u.a.r.

chiedi a davide la cosa degli esercizi

Let's first apply the theorem
##### One-Time Pad
K,M,C={0,1}^l
Enc=(k,m)= k xor m
Dec=(k,c)=k xor c= k xor(k xor m)=m
Corollary one time pad is perfectly secrecy

Proof. for any m in M, c in C
left side arrow
Pr[ Emc(k,m)=c]=Pr[K xor m=c]=Pr[K=c xor m]= 2^-l

for m' in M
Pr[Enc(K,m')=c]=2^-l 
so the proof ends $\square$

###### Limitations:
1) length of k same as length of m
2) the key can only be used once
	- because in the shannon definition there is only a Cypher
	- For OTP: C1=k xor m1 C2=k xor m2
	- c1 xor x2=m1 xor m2
		- we can denotate something new so no perfect secrecy

Shannon definition is too strong
Proof of thm
(n)=> (nn)
Pr[M=m]= Pr[M=m|C=c]=Pr[M=m a C=c]/Pr[C=c] =>
=> Pr[M=m a C=c]= Pr[M=m] Pr[C=c]
(nn)=>(nnn)
Pr[Enc(K,m)=c]=Pr[Enc(K,M)=c|M=m]=Pr[C=c|M=m] ) now we use property 2 =
= Pr[C=c]
By the same steps:
Pr[Enc(K,m')=c]=Pr[C=c]

(iii)=>(n)
we will first show that Pr[C=c|M=m]=Pr[C=c]
Pr[C=c]=sum m' Pr[C=c and M=m']=sum m'[C=c|M=m'] Pr[M=m'] (Bayes rule)
= sum m' Pr [Enc(K,M)=c|M=m']Pr[M=m']=
= sum m' Pr[Enc(K,m')=c]Pr[M=m']
that means i can switch every prime for any m
= sum m' Pr [Enc (K,m)=c] Pr[M=m']
by property 3
Pr[Enc(K,m)=c]sum m' Pr[M=m'] but is equal to 1
Pr[Enc(K,M)=c|M=m]=Pr[C=c|M=m]

So Pr[C=c]= Pr[C=c|M=m]

By Bayes:
Pr[M=m|C=c] Pr[C=c]=
Pr[M=m and C=c]=
Pr[C=c|M=m] Pr [M=m]
=> Pr[M=m]=Pr[M=m|C=c]Pr[C=c/Pr[C=c|M=m]
but we know that this is equal to Pr[C=c] so we can simplify
$$\square$$
