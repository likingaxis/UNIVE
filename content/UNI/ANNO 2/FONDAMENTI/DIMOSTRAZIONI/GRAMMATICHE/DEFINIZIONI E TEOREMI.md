
- definizione grammatiche
![[Pasted image 20260108152232.png]]
- Chomsky
![[Pasted image 20260108152400.png|300]]

$G3 ⊂ G2 ⊂ G1 ⊆ \mathscr{D} ⊂ G0 = \mathscr{A}$

- G0
	- qualunque grammatica formale è una grammatica di tipo 0
	- α→β
- G1
	- **(context-sensitive)**, che generano i linguaggi context-sensitive hanno soltanto produzioni in cui la lunghezza della parte destra è maggiore o uguale alla lunghezza della parte sinistra
	- $∣α∣ \leq∣β∣$
- G2
	- **(context-free)**, che generano i linguaggi context-free possiedono solo produzioni la cui parte sinistra consiste solamente di un carattere non terminale
		- $A→α(A∈VN​)$
		- PDA
- G3
	- **(grammatiche regolari)**, dispongono solo di produzioni la cui parte sinistra consiste di un singolo carattere non terminale e la cui parte destra consiste di un singolo simbolo terminale
		- posso avere in una sola grammatica un solo pattern
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
	- TEOREMA G.6
		- per ogni grammatica di tipo 1 G esiste una macchina di Turing che decide L(G)

- MACCHINE DI TURING, PDA, AUTOMI A STATI FINITI, CHIUSURA
- PUMPING LEMMA, SEPARATORI, 

#### MACCHINA DI TURING NTG1
- Decide linguaggi generati dalle grammatiche di tipo 1
- 5 nastri
![[Pasted image 20260109112646.png]]
- se la parola sul secondo nastro coincide con il primo nastro allora *accetta*
- se la parola generata non ha più produzioni **rigetta**
- se la parola generata supera la dimensione di x **rigetta** perché non può mai diminuire 
- se il quarto nastro è più piccolo del quinto nastro **rigetta**
##### Perché decide
- NTG1 decide L(G), per vederlo vediamo un caso in cui rigetta
- sia x una parola in input che non appartiene a L(G), e y un certo passo della produzione
	- NTG1 prima o poi rigetterà per i seguenti motivi
		- o y ha solo caratteri terminali e $y \ne x$ 
		- o y è più grande di x 
		- se y ha ancora caratteri non terminali
		- avrò una crescita di y e rientrerò possibilmente in 1 o 2 
			- oppure ho superato le produzioni possibili 
	- possiamo vedere che NTG1 terminerà sempre
### PUMPING LEMMA
- questo lemma serve per dimostrare che un determinato linguaggio non è context free, stabilisce una condizione necessaria 
- sia L un linguaggio context free di tipo 2 allora esiste un intero $p_L>0$ t.c per ogni parola $z\in L$ se $|z|\geq p_L$ allora esistono
	- 5 parole $u,v,w,x,y$ t.c
- $z=uvwxy$ z si esprime come concentrazione di queste 5 parole
- $|vwx|\leq p_L$ 
- $|vx|\geq 1$ almeno una delle due deve non essere vuota
- $uv^hwx^hy$ è in $L$ per qualsiasi $h\geq0$ 


Unione di linguaggi context-free: se L1 e L2 sono due linguaggi context-free allora L = L1 ∪ L2 è context-free

Intersezione di linguaggi context-free: se L1 e L2 sono due linguaggi context-free non è detto che L = L1 ∩ L2 sia context-free

### CHIUSURE
chiusura: Applicando quell’operazione a linguaggi della classe, **il risultato appartiene ancora alla stessa classe**.
- TEOREMA G.7: l’insieme dei linguaggi context-free è chiusa rispetto all’unione
- TEOREMA G.8: l’insieme dei linguaggi context-free non è chiusa rispetto all’intersezione
- TEOREMA G.9: l’insieme dei linguaggi context-free non è chiusa rispetto al complemento

### PDA
- I linguaggi context-free sono decidibili perché sono un sottoinsieme dei linguaggi di tipo 1; tuttavia, gli automi a pila non sono decisori in generale, ma accettano esattamente la classe dei linguaggi context-free.

- TEOREMA G.10: per ogni linguaggio L, esiste un PDA M che accetta L per pila vuota se e soltanto se esiste un PDA M’ che accetta L per stato finale

- TEOREMA G.11: un linguaggio L è context-free se e soltanto se esiste un PDA M che accetta L
## PDA
Modello strettamente meno potente di una mdT, che accetta i linguaggi di tipo 2 
- perché $G_{2} \subset G_{1}$
### Componenti minime di un PDA
Un **PDA** usa **2 nastri**
- definita attraverso una settupla
- $〈 𝚺 , 𝚪 , Z_0 , Q , Q_F , q_0 , 𝛅 〉$
	- 𝚺 alfabeto del linguaggio L
	- 𝚪 alfabeto del secondo nastro
	- Z_0 simbolo di inizio del secondo nastro
	- $Q , Q_F$ stati
	- $q_0$ stato iniziale
	- 𝛅 funzione di transizione
### 1. Primo nastro (input)
- contiene l’input `x`
- è **di sola lettura**
- la testina:
    - può restare ferma
    - o muoversi **solo a destra**
### 2. Secondo nastro (la pila)
- inizialmente contiene solo `Z₀` (simbolo di fondo)
- segue politica **LIFO**
- si può:
    - leggere il simbolo in cima
    - cancellarlo (pop)
    - scrivere una parola `γ ∈ Γ*` (push)
- la testina è sempre sulla **cima della pila**
### Stato del PDA
Lo stato è una **tripla**:
```
(q, x, γ)
```
- `q` stato interno
- `x` parte di input ancora da leggere
- `γ` contenuto della pila
### Funzione di transizione (forma essenziale)
```
δ : Q × (Σ ∪ {ε}) × Γ → P(Q × Γ*)
```
Vuol dire:
- guarda:
    - lo stato `q`
    - il simbolo di input (oppure `ε`)
    - il simbolo in cima alla pila
- sceglie **non deterministicamente**:
    - un nuovo stato
    - cosa scrivere sulla pila

>[!tip]- Mossa del PDA (idea chiave)
Da uno stato:
>```
(q₁, a x, Z β)
>```
può andare a:
>
>```
(q₂, x, γ β)
>```
>
>se:
>- legge `a` **oppure** `ε`
>- rimuove `Z` dalla pila
>- scrive `γ` sulla pila (anche `ε`)
>- entra nello stato `q₂`

####  le ε-regole
La parola vuota **ε** può comparire in **due posti diversi** nella definizione della funzione di transizione:
$\delta : Q \times (\Sigma \cup \{\varepsilon\}) \times \Gamma \to \mathcal{P}(Q \times \Gamma^*)$
- si **legge** il simbolo `a` dall’input
- si **rimuove** il simbolo `Z` dalla cima della pila
- **non si scrive nulla** al suo posto

| ε dove compare                         | Significato                            |
| -------------------------------------- | -------------------------------------- |
| a destra della freccia                 | consumo il valore quindi faccio il pop |
| nell’**argomento** della funzione a sx | non consumo input (ε-mossa)            |
- se **hai** $\epsilon$ regole  allora significa che posso effettuare operazioni all'infinito
	- leggo epsilon ma non faccio nulla
- se **non ho** $\epsilon$ regole il linguaggio termina sempre
	- ogni transizione consuma **un simbolo di input**
- il PDA quindi non è un decisore in linea generale 

## 🔹 Accettazione per **stato finale**
Una parola $x$ è accettata se:
$\langle q_0, x, Z_0 \rangle \;\vdash^*\; \langle q_F, \varepsilon, \gamma \rangle$
con:
- $q_F \in Q_F$
- $\gamma \in \Gamma^*$
📌 Conta solo:
- input consumato
- stato finale raggiunto
## 🔹 Accettazione per **pila vuota**
Una parola $x$ è accettata se:
$\langle q_0, x, Z_0 \rangle \;\vdash^*\; \langle q, \varepsilon, \varepsilon \rangle$
con:
- input finito
- pila completamente vuota
- **lo stato non importa**
## 🔑 Nomi dei linguaggi
- **L(𝓜)** → linguaggio accettato per **stato finale**
- **N(𝓜)** → linguaggio accettato per **pila vuota**

- TEOREMA G.12: 
	- l’insieme dei linguaggi accettati da automi a pila deterministici è un sottoinsieme proprio dei linguaggi context-free
		- i PDA sono non deterministici ma se uso solo transizioni det allora lo sono

- TEOREMA G.13: sia LA l’insieme delle grammatiche di tipo 2 ambigue  
	- il linguaggio LA è non decidibile
## Grammatiche di tipo 3

Anche qui si utilizza il Pumping lemma per dimostrare se un linguaggio NON è di tipo 3 (quindi non è regolare). Scrivo solo i punti che si differenziano

1. `z = u v w`
2. `|u v|` $\le p_{L}$
3. `|v|` $\ge 1$
4. $u v^{h} w$ è in `L` per ogni $h \ge 0$

CONDIZIONE NECESSARIA MA NON SUFFICIENTE.

## TEOREMA $G_{14}$

>[!lemma] Per ogni ASFD >$$A = \langle \Sigma, Q, q_{0}, Q_{F}, \delta \rangle$$ esiste una grammatica $$G_{A} = \langle V_{T}, V_{N}, P, S \rangle$$tale che $$L(A) = L(G_{A})$$

- 2 pda asfd
- iniziamo dspace dtime ecc
- classe P
- classe NP
- la codifica di sat e' da studiare.
- fine
### Dimostrazione che $L_{a=b=c}$ non è context-free

### Linguaggio

$$
L_{a=b=c} = \{ a^n b^n c^n \mid n \ge 1 \}
$$

##### Ipotesi

Supponiamo per assurdo che $L_{a=b=c}$ sia **context-free**.

Allora deve soddisfare il **pumping lemma per i linguaggi context-free**.

Esiste quindi una costante $p_L > 0$ tale che per ogni parola $z \in L_{a=b=c}$ con
$|z| \ge p_L$ si ha:

$$
z = u v w x y
$$

con:

- $|vwx| \le p_L$
- $|vx| \ge 1$
- $u v^h w x^h y \in L_{a=b=c}$ per ogni $h \ge 0$
##### Scelta della parola

Sia:

$$
z = a^{p_L} b^{p_L} c^{p_L}
$$

Allora $|z| = 3p_L$ e $z \in L_{a=b=c}$.
##### Osservazione chiave

Poiché $|vwx| \le p_L$:
- $vwx$ non può contenere contemporaneamente `a`, `b` e `c`
- può al massimo contenere due simboli distinti
###### Pumping

Scegliamo $h = 0$:

$$
uwy
$$

In questa parola almeno uno tra `a`, `b`, `c` compare meno di $p_L$ volte,
mentre almeno uno degli altri compare ancora $p_L$ volte.
I conteggi non sono più uguali.
##### Contraddizione

$$
uwy \notin L_{a=b=c}
$$

Contraddizione con il pumping lemma.

##### Conclusione

$$
\boxed{L_{a=b=c} \text{ non è context-free}}
$$
Ne segue che:

$$
G_3 \subset G_2
$$

### Linguaggio Dimostrazione che $L_{a=b}$ non è regolare

$$
L_{a=b} = \{ a^n b^n \mid n \ge 1 \}
$$

##### Ipotesi
Supponiamo per assurdo che $L_{a=b}$ sia **regolare**.
Allora deve soddisfare il **pumping lemma per i linguaggi regolari**.
Esiste quindi una costante $p_L > 0$ tale che, per ogni $z \in L_{a=b}$ con $|z| \ge p_L$,
si può scrivere:
$$
z = u v w
$$
con:

- $|uv| \le p_L$
- $|v| \ge 1$
- $u v^h w \in L_{a=b}$ per ogni $h \ge 0$
##### Scelta della parola
Sia:

$$
z = a^m b^m \in L_{a=b}
$$

con $m > p_L$.
#### Struttura di $u,v,w$
Poiché $|uv| \le p_L$ e le prime $p_L$ lettere di $z$ sono tutte `a`,
segue che:
- $u$ contiene solo `a`
- $v$ contiene solo `a`
Possiamo quindi scrivere:
- $u = a^r$
- $v = a^k$ con $k > 0$
- $w = a^{m-r-k} b^m$
#### Pumping
Scegliamo $h = 0$:

$$
uw = a^{m-k} b^m
$$
#### Contraddizione
Nella parola $uw$:
- il numero di `a` è $m-k$
- il numero di `b` è $m$
Poiché $k > 0$, i due numeri non coincidono.
Quindi:
$$
uw \notin L_{a=b}
$$
Contraddizione con il pumping lemma.
#### Conclusione
$$
\boxed{L_{a=b} \text{ non è regolare}}
$$
Inoltre:

$$
G_3 \subset G_2
$$
## PDA per pila vuota o per stato di accettazione
### Esempio 1: PDA che accetta per pila vuota

Costruiamo un PDA $$〈 {a,b}, \ {Z_{0}, A, B}, \ Z_{0} , \ {q_{0} , q_{1} } , \ \varnothing, \ q_{0} , \ δ 〉$$che riconosce **PER PILA VUOTA** (lo riconosci dal simbolo $\varnothing$) il linguaggio $L_{PPAL}$ delle parole palindrome pari sull'alfabeto ${a,b}$
![[Pasted image 20260109183027.png]]
### Esempio 2: PDA che accetta per stato finale

Ora, costruiamo un PDA $$〈 {a,b}, \ {Z_{0}, A, B}, \ Z_{0} , \ {q_{0} , q_{1}, q_{2} } , \ {q_{2}}, \ q_{0} , \ δ 〉$$che riconosce **PER STATO FINALE** ($q_{2}$) il linguaggio $L_{PPAL}$ delle parole palindrome pari sull'alfabeto ${a,b}$ Qui la costruzione è identica a prima, con alcune cosa modificate
![[Pasted image 20260109183035.png]]
