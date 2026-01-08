
- definizione grammatiche
![[Pasted image 20260108152232.png]]
- Chomsky
![[Pasted image 20260108152400.png|300]]

$G3⊂G2⊂G1⊆G0$

- G0
	- qualunque grammatica formale è una grammatica di tipo 0
	- α→β
- G1
	- **(context-sensitive)**, che generano i linguaggi context-sensitive hanno soltanto produzioni in cui la lunghezza della parte destra è maggiore o uguale alla lunghezza della parte sinistra
	- $∣β∣≥∣α∣$
- G2
	- **(context-free)**, che generano i linguaggi context-free possiedono solo produzioni la cui parte sinistra consiste solamente di un carattere non terminale
		- $A→α(A∈VN​)$
		- PDA
- G3
	- **(grammatiche regolari)**, dispongono solo di produzioni la cui parte sinistra consiste di un singolo carattere non terminale e la cui parte destra consiste di un singolo simbolo terminale
		- $A \rightarrow aB$ 
- Teoremi
	- TEOREMA G1
		- sia G una grammatica di tipo t > 0 e sia G’ la grammatica ottenuta
		- aggiungendo a G un nuovo non terminale S’ che sarà l’assioma in G’ ´ inserendo la produzione S’ → 𝜀  inserendo la produzione S’ → S. 
		- Allora, L(G’) = L(G) ∪ {𝜀}
	- TEOREMA G2
		- data una grammatica G di tipo t>1 allora aggiungendo 𝜀 produzioni a G' riusciamo a ottenere L(G')= L(G) ∪ {𝜀}
	- TEOREMA G3
		- Per ogni grammatica $G$ di tipo 0 esiste una grammatica $G′$ di tipo 1,  
		- ottenuta aggiungendo opportune ε-produzioni, tale che:
			- $L(G) = L(G')$
	- TEOREMA G.4
		- per ogni linguaggio accettabile L esiste una grammatica (di tipo 0) G tale che L = L(G)
	- TEOREMA G.5
		- per ogni grammatica G esiste una macchina di Turing che accetta L(G)


- MACCHINE DI TURING, PDA, AUTOMI A STATI FINITI, CHIUSURA
- PUMPING LEMMA, SEPARATORI, 


