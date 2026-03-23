### CH01
##### SPAZIO PROBABILISTICO
Uno spazio probabilistico è una tripla $(Ω, F, Pr)$ dove:  
- $Ω$ = insieme di tutti i possibili esiti (sample space)  
- $F$ = insieme degli eventi (sottoinsiemi di Ω)  
- $Pr$ = funzione che assegna una probabilità a ogni evento  
##### FUNZIONE PROBABILISTICA
Una funzione $Pr : F → ℝ$ che assegna probabilità agli eventi e soddisfa:
- $0 ≤ Pr(E) ≤ 1$
- $Pr(Ω) = 1$
- additività: unione per eventi disgiunti, $Pr(⋃ Ei) = Σ Pr(Ei)$
##### EVENTI INDIPENDENTI
Due eventi E e F sono indipendenti se:
- $Pr(E ∩ F) = Pr(E) · Pr(F)$
Più in generale, $E_1, ..., E_k$ sono indipendenti se:
- per ogni sottoinsieme I: $Pr(⋂ Ei) = ∏ Pr(Ei)$
##### PROBABILITÀ CONDIZIONATA
La probabilità di $E$ dato che $F$ è avvenuto è:
- $Pr(E | F) = Pr(E ∩ F) / Pr(F)$, con $Pr(F) > 0$
→ intuizione: restringo lo spazio dei casi possibili a F
##### Theorem (Bayes’ Law)
- La legge di Bayes permette di calcolare una probabilità condizionata difficile $Pr(E | B)$ 
	- invertendola in una più facile $Pr(B | E)$, usando le probabilità a priori.
- quanto è probabile che sia accaduto $E_j$ dato che abbiamo osservato $B$
```scss
so: Pr(B | E) → facile (causa → effetto)  
voglio: Pr(E | B) → difficile (effetto → causa)
```
Sia ${E_1, ..., E_n}$ una partizione dello spazio (eventi disgiunti che coprono $Ω$), allora:
- $Pr(E_j | B) = [Pr(B | E_j) · Pr(E_j)] / Σi Pr(B | E_i) · Pr(E_i)$
→ intuizione: aggiorna la probabilità di una causa dopo aver osservato un effetto

![[Pasted image 20260323120525.png|400]]

### CH02
##### RANDOM VARIABLE DEFINIZIONE
- 1
##### RANDOM VARIABLE INDIPENDENTI
- 3
##### EXPECTATION
- 5
##### proprietà varie sulle random variable
- linearità
- mediana
##### BERNOULLI RANDOM VARIABLE
- 16
##### Binomial Random Variable
17
- expectation della binomial random variable 
	- np
##### DISTRIBUZIONE GEOMETRICA
41
- memoryless property
- 42
##### Coupon Collector’s Problem
46
### CH03
##### MARKOV INEQUALITY
- 3
##### VARIANZA
- 4
	- linearità
##### CHEBYSHEV INEQUALITY
 - 6
##### VARIABILI INDIPENDENTI
##### BACK TO COIN FLIPS
- 11
##### Bernoulli Trial
##### DISTRIBUZIONE GEOMETRICA DI UNA RANDOM VARIABLE
- memoryless property
- varianza di una geometrica 
	- 35
##### back to coupon collector
- 37
##### The Advantage of Multiple Samples
- 40 e 41
##### The (Weak) Law of Large Numbers
- 42
