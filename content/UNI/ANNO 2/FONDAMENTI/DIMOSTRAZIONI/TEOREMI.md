# LINGUAGGI DECIDIBILI E FUNZIONI
## TEOREMA 3.1
>[!lemma]  
>Un linguaggio $L \subseteq \Sigma^*$ è decidibile se e soltanto se $L$ e $L^c$ sono accettabili.

- Mi creo una macchina di Turing `T'` basata sulla macchina che decide $L$, chiamata `T`.
- Questa macchina `T'` estende gli stati di `T` invertendoli.
- Creo due macchine di Turing `T_1` e `T_2`:
  - una accetta $L$
  - l’altra accetta $L^c$
- Eseguo in alternanza le due macchine e sono certo che una delle due prima o poi accetterà, quindi $L$ è decidibile.

---

## DEFINIZIONE 3.5
Siano $\Sigma$ e $\Sigma_1$ due alfabeti finiti; una funzione (parziale)

$$
f : \Sigma^* \rightarrow \Sigma_1^*
$$

è **calcolabile** se esiste una macchina di Turing `T` di tipo **trasduttore** che, dato in input  
$x \in \Sigma^*$, termina con la stringa $f(x)$ scritta sul nastro output **se e soltanto se** $f(x)$ è definita.

---

Sia $\Sigma$ un alfabeto finito ed $L \subseteq \Sigma^*$ un linguaggio.  
La **funzione caratteristica** di $L$

$$
\chi_L : \Sigma^* \rightarrow \{0,1\}
$$

è una funzione **totale** tale che, per ogni $x \in \Sigma^*$,

$$
\chi_L(x) =
\begin{cases}
1 & \text{se } x \in L \\
0 & \text{se } x \notin L
\end{cases}
$$

---

## TEOREMA 3.2
Un linguaggio $L$ è decidibile se e soltanto se la funzione $\chi_L$ è calcolabile. assumendo che $χL​$ sia **totale**.

### Dimostrazione

Sia $L \subseteq \Sigma^*$ decidibile.  
Allora esiste una macchina di Turing riconoscitore `T`, con stato di accettazione $q_A$ e stato di rigetto $q_R$, tale che:

$$
o_T(x) =
\begin{cases}
q_A & \text{se } x \in L \\
q_R & \text{se } x \notin L
\end{cases}
$$

---

### ⇒ (verso destra)
Assumiamo che $L$ sia decidibile $\Rightarrow \chi_L$ è calcolabile.

- Se $L$ è decidibile, allora esiste una macchina di Turing riconoscitore che **termina sempre**.
- Costruiamo una macchina `T'` di tipo trasduttore che:
  - stampa `1` se `T` termina in $q_A$
  - stampa `0` se `T` termina in $q_R$
- `T'` calcola esattamente $\chi_L$.

Quindi $\chi_L$ è calcolabile.

---

### ⇐ (verso sinistra)
Assumiamo che $\chi_L$ sia calcolabile $\Rightarrow L$ è decidibile.

- Poiché $\chi_L$ è calcolabile ed è **totale**, esiste una macchina `T` che la calcola.
- Costruiamo una macchina `T'` che:
  - accetta se `T` restituisce `1`
  - rigetta se `T` restituisce `0`
- `T'` termina su ogni input.

Quindi `T'` decide $L$.

---

Conclusione:

$$
L \text{ è decidibile } \iff \chi_L \text{ è calcolabile}
$$

---

Una funzione è **calcolabile** se e solo se è **totale** ed esiste una macchina di Turing che la calcola e termina su ogni input.

---

## TEOREMA 3.3
>[!lemma]  
>Se la funzione $f : \Sigma^* \rightarrow \Sigma_1^*$ è **totale e calcolabile**, allora il linguaggio
>
>$$
>L_f = \Sigma^* \times \Sigma_1^*
>$$
>
>è decidibile.

Dato che $f$ è totale e calcolabile, esiste un trasduttore che per ogni $x \in \Sigma^*$ calcola $f(x)$.

A partire da questa macchina `T` (a un nastro) ne costruiamo un’altra a due nastri `T'` tale che:
- su $N_1$ è scritto l’input $\langle x, y \rangle$
- su $N_2$ viene eseguita la computazione `T(x)` e viene scritto $f(x) = z$
  - se $z = y$ allora `T'` accetta
  - se $z \neq y$ allora `T'` rigetta

Poiché $f(x)$ è totale, `T(x)` termina sempre.

**TERMINA SU OGNI INPUT ⇒ $L_f$ è decidibile.**

---




## TEOREMA 3.4
>[!lemma]  
>Sia $f : \Sigma^* \rightarrow \Sigma_1^*$ una funzione calcolabile parziale.  
>Se il linguaggio
>
>$$
>L_f = \Sigma^* \times \Sigma_1^*
>$$
>
>è decidibile, allora $f$ è calcolabile.

Dato che $L_f$ è decidibile, esiste un riconoscitore `T` tale che per ogni  
$x \in \Sigma^*$ e $y \in \Sigma_1^*$:

$$
o_T(x,y) =
\begin{cases}
q_A & \text{se } y = f(x) \\
q_R & \text{altrimenti}
\end{cases}
$$

Senza perdita di generalità assumiamo che `T` utilizzi un solo nastro.

Costruiamo `T'`, trasduttore a **4 nastri**, che con input $x \in \Sigma^*$:

1. scrive $i = 0$ sul primo nastro
2. enumera tutte le stringhe $y \in \Sigma_1^*$ con $|y| = i$ simulando `T(x,y)`

   <font color="#4f81bd">a)</font> scrive la prima `y` non ancora testata su $N_2$  
   <font color="#548dd4">b)</font> simula `T(x,y)` prendendo solo le y con quella i su $N_3$  
   - se `T(x,y)` termina in $q_A$, scrive `y` su $N_4$ 
   - altrimenti continua (incrementando `i` se necessario)

>[!example]- Schema
>- N1: contatore `i`
>- N2: stringa `y`
>- N3: simulazione `T(x,y)`
>- N4: output

Dato che `T` è decidibile, il passo <font color="#548dd4">b)</font> termina sempre.

>[!danger]  
>`T(x,y)` dice solo se quella `y` è la tua $f(x)$.  
>Se **nessuna** `y` è uguale a $f(x)$, `T'` **non termina**.

Quindi $f$ è **calcolabile (parziale)** ma **non totale**.

---

## TEOREMA 3.5
>[!lemma]  
>Per ogni programma scritto in **PASCALMINIMO** esiste un trasduttore `T` che scrive sul nastro di output lo stesso valore fornito dal programma.

---

## TEOREMA 3.6
>[!lemma]  
>Per ogni macchina di Turing deterministica `T` di tipo riconoscitore esiste un programma in **PASCALMINIMO** che, per ogni stringa `x`, se `T(x)` termina nello stato finale  
>$q_F \in \{q_A, q_R\}$  
>allora il programma con input `x` restituisce $q_F$.

# DISPENSA 5

## TEOREMA 5.1
>[!lemma]  
>Sia $\Sigma$ un alfabeto finito. Allora l’insieme $\Sigma^*$, costituito da tutte le parole di lunghezza finita su $\Sigma$, è numerabile.

Poiché $\Sigma$ è finito (es. $|\Sigma| = n$), è possibile fissare una codifica binaria (es.  
$c : \Sigma \rightarrow \{0,1\}^{\lceil \log(n) \rceil}$) che associa a ogni simbolo di $\Sigma$ una parola binaria di lunghezza fissa.

Ogni parola $p \in \Sigma^*$, essendo una sequenza finita di simboli di $\Sigma$, può essere codificata concatenando i codici binari dei suoi simboli. La stringa binaria così ottenuta identifica univocamente la parola di partenza.

Poiché l’insieme delle stringhe binarie finite è numerabile, segue che anche l’insieme delle parole su $\Sigma$ è numerabile.

Pertanto, $\Sigma^*$ è numerabile.

---

## TEOREMA 5.2
>[!lemma]  
>L'insieme $T$ delle macchine di Turing definite sull'alfabeto `{0,1}` e dotate di un singolo nastro (più eventuale nastro di output) è numerabile.

L'idea è prendere una macchina di Turing, codificare in binario il suo insieme degli stati (l'alfabeto già è in binario) e poi rappresentare il tutto tramite una parola $\beta_T \in \Sigma^*$ con  
$\Sigma = \{0,1,\oplus,\otimes,-,f,s,d\}$.

La parola è così descritta:

![[Pasted image 20260108183917.png]]

Dato che per due macchine di Turing diverse abbiamo:
- o insieme degli stati diversi
- o insieme delle quintuple diverse
- o entrambi

allora

$$
\beta_T \neq \beta_{T'}
$$

e questo vale $\forall T, T' \in T$ con $T \neq T'$.

E per il Teorema 5.1, sono numerabili.

Una volta trovata questa codifica, possiamo trasformare questa parola $\beta_T$ in un numero $\in \mathbb{N}$:

---

## TEOREMA 5.3
Se $\Sigma$ è un alfabeto finito, allora l’insieme $L_\Sigma$ non è numerabile.

---

## COROLLARIO 5.1
Esiste un linguaggio non accettabile.

# HALTING PROBLEM E RIDUZIONI

---

## Definizione $L_H$

$$
L_H = \{ (i,x) \in \mathbb{N} \times \mathbb{N} \mid
i \in \{0,\dots,7\}^* \land
i \text{ codifica una MT } T_i \land
T_i(x) \text{ termina} \}
$$


## TEOREMA 5.4
$L_H$ è un linguaggio accettabile.
### Idea della dimostrazione
Dobbiamo mostrare che esiste una macchina di Turing $T$ tale che
$$
(i,x) \in L_H \iff T(i,x) \text{ accetta}.
$$

### Costruzione della macchina
Si costruisce una macchina $T$ come **modifica della macchina universale** $U$.

- Input: $(i,x)$ con $i \in \mathbb{N}$ e $x \in \{0,1\}^*$.
- $T$ verifica che $i$:
  - contenga solo cifre da `0` a `7`;
  - inizi con la cifra `2`.
  Se il controllo fallisce, **rigetta**.
- Altrimenti:
  - elimina la cifra iniziale `2`;
  - traduce $i$ nell’alfabeto di lavoro di $U$;
  - simula $U(i,x)$.
### Comportamento
- Se $U(i,x)$ **termina** (sia in accettazione che in rigetto), allora $T(i,x)$ **accetta**.
- Se $i$ non codifica una macchina di Turing, oppure $T_i(x)$ non termina, allora $U(i,x)$ non termina e quindi $T(i,x)$ non accetta.
### Correttezza
- Se $(i,x) \in L_H$, allora $T_i(x)$ termina ⇒ $U(i,x)$ termina ⇒ $T(i,x)$ accetta.
- Se $T(i,x)$ accetta, allora $U(i,x)$ termina ⇒ $i$ codifica una MT e $T_i(x)$ termina ⇒ $(i,x) \in L_H$.
### Conclusione
Esiste una macchina di Turing che accetta esattamente $L_H$, quindi
$$
L_H \text{ è accettabile}.
$$

---

## TEOREMA 5.5
Il linguaggio $L_H$ non è decidibile.
### Idea della dimostrazione
La dimostrazione è **per assurdo**.

### Assunzione
Supponiamo che $L_H$ sia decidibile.  
Allora esiste una macchina di Turing $T$ tale che, per ogni $(i,x) \in \mathbb{N}\times\mathbb{N}$,

$$
T(i,x)=
\begin{cases}
q_A & \text{se } (i,x)\in L_H \\
q_R & \text{se } (i,x)\notin L_H
\end{cases}
$$

### Costruzione di $T'$
Complementiamo gli stati di accettazione e rigetto di $T$, ottenendo una macchina $T'$ tale che:

$$
T'(i,x)=
\begin{cases}
q_R & \text{se } (i,x)\in L_H \\
q_A & \text{se } (i,x)\notin L_H
\end{cases}
$$

Quindi $T'$ decide il complemento di $L_H$.

### Costruzione di $T^*$
Costruiamo una macchina $T^*$ che opera su un singolo input $i \in \mathbb{N}$:
- $T^*(i)$ simula $T'(i,i)$;
- se $T'(i,i)$ **accetta**, allora $T^*(i)$ accetta;
- se $T'(i,i)$ **rigetta**, allora $T^*(i)$ **non termina**.

Quindi:

$$
T^*(i)=
\begin{cases}
q_A & \text{se } T'(i,i) \text{ accetta} \\
\text{non termina} & \text{se } T'(i,i) \text{ rigetta}
\end{cases}
$$

### Argomento diagonale
Poiché l’insieme delle macchine di Turing è numerabile, esiste $k \in \mathbb{N}$ tale che:

$$
T^* = T_k
$$

Consideriamo ora la computazione $T_k(k)$.

- Se $T_k(k)$ **accetta**, allora $T'(k,k)$ accetta, quindi $(k,k)\notin L_H$, e per definizione $T_k(k)$ **non termina** → contraddizione.
- Se $T_k(k)$ **non termina**, allora $T'(k,k)$ rigetta, quindi $(k,k)\in L_H$, e per definizione $T_k(k)$ **termina** → contraddizione.

### Conclusione
Entrambi i casi portano a una contraddizione.  
Quindi la macchina che decide $L_H$ **non può esistere**.

$$
\boxed{L_H \text{ non è decidibile}}
$$

---

## TEOREMA 5.6
Un linguaggio $L \subseteq \{0,1\}^*$ è decidibile se e soltanto se $L$ è accettabile e $L^c$ è accettabile.

**Dimostrazione (doppia implicazione)**
- **Verso destra**  
  Creo una macchina $T'$ che ha stati invertiti:
  - la mia macchina $T'$ accetta $L^c$
  - $T$ accetta $L$

- **Verso sinistra**  
  Ho due macchine:
  - $T_1$ accetta $L$
  - $T_2$ accetta $L^c$

  Creo $T$ che simula entrambe in maniera alternata:
  - se $T_1$ accetta allora $T$ accetta
  - se $T_1$ rigetta allora $T$ rigetta
  - se $T_2$ accetta allora $T$ rigetta
  - se $T_2$ rigetta allora $T$ accetta

  Quindi $T$ decide $L$.

---
## COROLLARIO 5.2

>[!tip] Un linguaggio $L \subseteq \{0,1\}^{*}$ è decidibile se e solo se $L^{C}$ è decidibile


## DEFINIZIONE 5.3
Siano $L_1 \subseteq \{0,1\}^*$ e $L_2 \subseteq \{0,1\}^*$ due linguaggi; diciamo che $L_1$ è *(many to one)* riducibile ad $L_2$ se esiste una funzione totale e calcolabile

$$
f : \{0,1\}^* \rightarrow \{0,1\}^*
$$

tale che

$$
\forall x \in \{0,1\}^* \;\; [\, x \in L_1 \iff f(x) \in L_2 \,]
$$

Se $L_1$ è riducibile ad $L_2$ scriviamo:

$$
L_1 \le_m L_2
$$

---

La relazione $\le_m$ gode delle proprietà **riflessiva** e **transitiva**, ossia:

- $\forall L \subseteq \{0,1\}^* : L \le_m L$ *(proprietà riflessiva)*
- $\forall L_1, L_2, L_3 \subseteq \{0,1\}^*$:  
  $L_1 \le_m L_2 \land L_2 \le_m L_3 \Rightarrow L_1 \le_m L_3$ *(proprietà transitiva)*

---
#### RIDUZIONI UTILI
Sia $L_1$ un linguaggio **non decidibile** e sia $L_2$ un secondo linguaggio tale che $L_1 \le_m L_2$; allora $L_2$ non è decidibile.

Indichiamo con $f_{1,2}$ la funzione che riduce $L_1$ ad $L_2$. Se $L_2$ fosse decidibile, allora potremmo decidere se $x \in L_1$ nel modo seguente:
1. calcoliamo $f_{1,2}(x)$
2. decidiamo se $f_{1,2}(x) \in L_2$

Poiché $x \in L_1$ se e soltanto se $f_{1,2}(x) \in L_2$, l’esito della decisione su $f_{1,2}(x)$ risponderebbe anche al quesito  
**“$x \in L_1$?”**

# GRAMMATICHE

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
	- $∣β∣ \leq∣α∣$
- G2
	- **(context-free)**, che generano i linguaggi context-free possiedono solo produzioni la cui parte sinistra consiste solamente di un carattere non terminale
		- $A→α(A∈VN​)$
		- PDA
- G3
	- **(grammatiche regolari)**, dispongono solo di produzioni la cui parte sinistra consiste di un singolo carattere non terminale e la cui parte destra consiste di un singolo simbolo terminale
		- posso avere in una sola grammatica un solo pattern
	- **1 non terminale a sinistra**
		- **a destra**:
		    - **1 terminale**
		    - **oppure** 1 terminale + 1 non terminale
		    - **mai di più**

- Teoremi
	- TEOREMA G.1
		- sia G una grammatica di tipo t > 0 e sia G’ la grammatica ottenuta
		- aggiungendo a G un nuovo non terminale S’ che sarà l’assioma in G’ ´ inserendo la produzione S’ → 𝜀  inserendo la produzione S’ → S. 
		- Allora, L(G’) = L(G) ∪ {𝜀}
	- TEOREMA G.2
		- data una grammatica G di tipo t>1 allora aggiungendo 𝜀 produzioni a G' riusciamo a ottenere L(G')= L(G) ∪ {𝜀}
	- TEOREMA G.3
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
- questo lemma serve per dimostrare che un determinato linguaggio non è context free, stabilisce una condizione *necessaria* 
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


### ASFD 
![[Screenshot_2026-01-13-13-09-52-41_45415775811cea13943236d9369df411.jpg]]
## TEOREMA G.14

>[!lemma] Per ogni ASFD >$$A = \langle \Sigma, Q, q_{0}, Q_{F}, \delta \rangle$$ esiste una grammatica $$G_{A} = \langle V_{T}, V_{N}, P, S \rangle$$tale che $$L(A) = L(G_{A})$$

#### MISURA DI COMPLESSITÀ
è una funzione che associa ad ogni macchina di Turing un valore numerico che corrisponde al costo

#### ASSIOMI DI BLOOM
- una funzione è considerata valida dagli assiomi di Bloom:
	- una funzione $f$ è definita **solo per le computazioni che terminano**; intuitivamente, se una computazione $T(x)$non termina, **non ha senso attribuirle un costo finito**;
	- la funzione $f$ deve essere **calcolabile**: deve cioè esistere una macchina di Turing $M$ che, ricevuti in input una macchina di Turing $T$ e una parola $x$, **calcoli il valore $f(T,x)$** ogniqualvolta tale valore sia definito, ossia **ogniqualvolta la computazione $T(x)$ termini**; intuitivamente, questo significa che il costo di una computazione terminante deve poter essere **determinato in modo effettivo**.

##### Dimostrazione
- per definizione per ogni macchina T deterministica e per ogni $x\in  \Sigma^*$
	- dtime e dspace sono definite solo se T(x) termina
- per dimostrare che f è calcolabile modifichiamo la macchina universale aggiungendo un nastro, una volta che la macchina universale U termina una istruzione prima di passare alla successiva scrive sul nastro N5(un nuovo nastro) un 1 e poi sposta la testina di quel nastro a destra
	- avremo in 1 ario la codifica di dtime alla fine dell'esecuzione di U modificata
	- quindi dtime è calcolabile
### dtime dspace ntime nspace 
- dtime(T, x) = numero di istruzioni eseguite da T (x)
- dspace(T, x) = numero di celle utilizzate da T (x)
- ntime(NT, x) = minimo numero di istruzioni eseguite da una computazione deterministica accettante di NT (x)
- ntime(NT, x) = massimo numero di istruzioni eseguite da una computazione deterministica rigettante di NT (x)
- nspace(NT, x) = minimo numero di celle utilizzate da una computazione deterministica accettante di NT (x).


>[!tip] Teorema 6.1
> 
> Sia T una macchina di Turing deterministica, definita su un alfabeto Σ (non contenente il simbolo $\square$  ) e un insieme degli stati Q, e sia x ∈ $Σ^∗$ tale che T(x) termina. Allora
> $$dspace(T,x)\leq dtime(T,x)\leq {dspace(T,x)} *|Q| *(|\Sigma| +1)^{dspace(T,x)}$$
> stessa cosa anche per ntime e nspace uguale

La prof definisce il termine dopo $\le$ come **il numero di stati globali** possibili di `T` nel caso in cui non più di `dspace(T,x)` celle del nastro vengano utilizzate dalla computazione `T(x)`
Se andiamo a punti 
1) $\text{dspace(T,x)} \le \text{dtime(T,x)}$ -> perché se la macchina utilizza `dspace(T, x)` celle di memoria allora le ha dovute quantomeno leggere 
2) $\text{dtime(T,x)} \le \text{dspace(T,x)} \cdot |Q| \cdot (|\Sigma| + 1)^{\text{dspace(T,x)}}$ -> il tempo impiegato non può mai essere maggiore rispetto AL NUMERO MASSIMO DI STATI GLOBALI Perché se lo fosse, vuol dire che siamo entrati in un loop (e quindi la macchina non termina, COSA CHE NON PUÒ ACCADERE PER GLI ASSIOMI.) 
![[Pasted image 20250423205449.png]]
- per non determinismo uguale

>[!tip] Teorema 6.2
> 
> Sia $f : \mathbb{N} \to \mathbb{N}$ una funzione **totale e calcolabile**.
> 
> 1. Se $L \subseteq \Sigma^*$ è accettato da una macchina di Turing **non deterministica** $NT$ tale che, per ogni $x \in L$ $ntime(NT, x) \le f(|x|)$ allora $L$ è **decidibile**.
> 2. Se $L \subseteq \Sigma^*$è accettato da una macchina di Turing **non deterministica** $NT$ tale che, per ogni $x \in L$ $nspace(NT, x) \le f(|x|)$ allora $L$ è **decidibile**.


1. **Poiché $f$ è totale e calcolabile**, esiste un trasduttore $T_f$​ che, dato $|x|$(in unario), calcola $f(|x|)$ e lo scrive (in unario).
2. Costruisco una nuova MT (deterministica) $NT'$ che, su input $x$:
    - calcola $f(|x|)$ e lo memorizza come **contatore**;
    - **simula $NT(x)$** ma solo per **al più $f(∣x∣)$ passi** (decrementando il contatore a ogni passo simulato).
3. Se durante la simulazione $NT$ **accetta** o **rigetta** entro quei passi, $NT′$termina nello stesso esito.
4. Se scadono i $f(∣x∣)$passi senza terminare, $NT′$ **rigetta**.
5. Quindi **ogni computazione termina** (per costruzione)
👉 Conclude: $NT^′$ **decide** per deduzione $L$, quindi $L$ è  **decidibile**.
- non possiamo concludere che sia decidibile con certezza
### Classi di complessità
Una **classe di complessità** è definita a partire da una funzione **totale e calcolabile**  
$f : \mathbb{N} \to \mathbb{N}$, detta **funzione limite della classe**. 
Essa rappresenta l’insieme dei linguaggi **decidibili o accettabili** da una macchina di Turing, **deterministica o non deterministica**, la cui computazione utilizza una quantità di risorse (tempo o spazio) **limitata superiormente da $f$**.
![[Pasted image 20260110153051.png]]
![[Pasted image 20260110153110.png]]


**ogni linguaggio** che posso risolvere con le risorse di $C1$
posso risolverlo **anche** con le risorse di $C2$

>[!tip] Teorema 6.8
> Sia $f:\mathbb{N}\to\mathbb{N}$ una funzione **totale calcolabile**. Allora:
> $\mathrm{DTIME}[f(n)] \subseteq \mathrm{NTIME}[f(n)] \qquad\text{e}\qquad \mathrm{DSPACE}[f(n)] \subseteq \mathrm{NSPACE}[f(n)]$

È sufficiente osservare che ogni macchina di Turing **deterministica** $T$ può essere vista come una macchina di Turing **non deterministica** $NT$ con **grado di non determinismo pari a 1**, cioè con un’unica scelta possibile in ogni configurazione.

>[!tip] Teorema 6.9
> Sia $f : \mathbb{N} \to \mathbb{N}$ una funzione **totale e calcolabile**. Allora valgono le inclusioni:
> $\mathrm{DTIME}[f(n)] \subseteq \mathrm{DSPACE}[f(n)] \qquad\text{e}\qquad \mathrm{NTIME}[f(n)] \subseteq \mathrm{NSPACE}[f(n)]$

- relazione corretta:
    $dspace \le dtime$
- prendo **un linguaggio in DTIME**
- **la stessa macchina** lo decide in DSPACE
- quindi:
    $\boxed{\mathrm{DTIME} \subseteq \mathrm{DSPACE}}$

>[!tip] Teorema 6.10
> 
> $f:\mathbb{N}\to\mathbb{N}$
> $\mathrm{DSPACE}[f(n)] \subseteq \mathrm{DTIME}\!\bigl(2^{O(f(n))}\bigr) \qquad\text{e}\qquad \mathrm{NSPACE}[f(n)] \subseteq \mathrm{NTIME}\!\bigl(2^{O(f(n))}\bigr)$

![[Pasted image 20260110171110.png]]

>[!tip] Teorema 6.11
> 
> $f:\mathbb{N}\to\mathbb{N}$
> Il teorema afferma che, per **macchine deterministiche**:
> $\mathrm{DTIME}[f(n)] = \mathrm{coDTIME}[f(n)] \qquad\text{e}\qquad \mathrm{DSPACE}[f(n)] = \mathrm{coDSPACE}[f(n)]$

- invertire gli stati di accettazione e rigetto non cambia le risorse

>[!tip] Teorema 6.12
>![[Pasted image 20260110173244.png]]
- Sia $L \subseteq \Sigma^*$  tale che
    $L \in \mathrm{DTIME}[f(n)]$
- Per definizione, esiste una MT deterministica $T$ che decide $L$ e tale che:
    $dtime(T,x) \in O(f(|x|))$
- Poiché per ipotesi $f(n) \le g(n)$ definitivamente, vale:
    $O(f(|x|)) \subseteq O(g(|x|))$
- Quindi la **stessa macchina $T$** decide $L$ anche in tempo $O(g(∣x∣))$.
- Ne segue: $L \in \mathrm{DTIME}[g(n)]$
>[!tip] Teorema 6.13
>![[Pasted image 20250425125730.png]]
#### time constructible 
**Definizione 6.1**
Una funzione totale calcolabile $f : \mathbb{N} \to \mathbb{N}$ è _time-constructible_ se esiste una macchina di Turing $T$ di tipo trasduttore che, preso in input un intero $n$ espresso in notazione unaria (ossia come sequenza di $n$ simboli `1`), scrive sul nastro di output il valore $f(n)$ in unario e impiega  $dtime(T,n) \in O(f(n))$, cioè lo stesso ordine di tempo del risultato $f(n)$.

**Definizione 6.2**
Una funzione totale calcolabile $f : \mathbb{N} \to \mathbb{N}$ è _space-constructible_ se esiste una macchina di Turing $T$ di tipo trasduttore che, preso in input il valore $n$ espresso in notazione unaria, scrive sul nastro di output il valore $f(n)$ in unario e  $dspace(T,n) \in O(f(n))$.

![[Pasted image 20260110175952.png]]

![[Pasted image 20260110183219.png]]

Qui usiamo lo stesso ragionamento del teorema 6.2
Abbiamo una macchina NT che accetta L, tale che $$ntime(NT, x) \le c \cdot f(|x|)$$con f time constructible,
Costruisco NT' a 3 nastri, che decide L
  1) Input su $N{1}$
  2) scrive |x| su $N{2}$
  3) calcola $c \cdot f(n)$ e la scrive su $N{3}$
  4) Invoca $NT(x)$ per simulare tutte le computazioni non deterministiche
      1) ogni volta che un ramo esegue un passo, NT' controlla se su $N{3}$ ci sono ancora degli 1 se non ci sono RIGETTA
5) Se una computazione accetta -> ACCETTA
6) Se tutte le computazioni rigettano -> RIGETTA,

>[!question] Quanto tempo usa NT’?
>- Per calcolare $f(∣x∣)$ (in unario): serve $O(f(∣x∣))$ tempo, perché $f$ è <font color="#f79646">time-constructible</font>.
>- Per simulare tutte le computazioni entro $c \cdot f(|x|)$ passi: $O(f(∣x∣))$
>
> Totale: $O(f(∣x∣))$

![[Pasted image 20260110183558.png]]
Se un linguaggio è accettato da una MT non deterministica in tempo $f(n)$ (con $f$ time-constructible), allora lo stesso linguaggio è decidibile da una MT deterministica in tempo esponenziale in $f(n)$:
- Parto da $L \in NTIME[f(n)]$: esiste una $NT$ che accetta $L$ e una costante $h$ tale che, se $x \in L$, allora qualche ramo accetta entro $h f(|x|)$ passi.
- Chiamo $k$ il grado di non determinismo (numero massimo di scelte per passo), che è una costante.
- Costruisco una MT deterministica $T$ che, su input $x$, calcola $h f(|x|)$ (possibile perché $f$ è time-constructible) e lo usa come limite.
- $T$ enumera e simula uno per uno tutti i rami deterministici di $NT(x)$ lunghi al massimo $h f(|x|)$
	- se trova un ramo che accetta, allora $T$ accetta
	- se nessun ramo accetta entro il limite, $T$ rigetta
	- Costo: i rami possibili sono al più
		- $k^{h f(|x|)} = 2^{O(f(|x|))}$
	- e simulare ciascun ramo costa $O(f(|x|))$. Quindi:
		- $dtime(T,x) \in O(f(|x|) \cdot k^{h f(|x|)}) \subseteq 2^{O(f(|x|))}.$
	- Conclusione:
		- $L \in DTIME(2^{O(f(n))})$
### P,NP,PSPACE,NPSPACE,EXPTIME,NEXPTIME
### Classi di complessità

- **$P = \bigcup_{k \in \mathbb{N}} \mathrm{DTIME}(n^k)$**  
    è la classe dei linguaggi decidibili in **tempo deterministico polinomiale**.
    
- **$NP = \bigcup_{k \in \mathbb{N}} \mathrm{NTIME}(n^k)$**  
    è la classe dei linguaggi accettabili in **tempo non deterministico polinomiale**.
    
- **$PSPACE = \bigcup_{k \in \mathbb{N}} \mathrm{DSPACE}(n^k)$**  
    è la classe dei linguaggi decidibili in **spazio deterministico polinomiale**.
    
- **$NPSPACE = \bigcup_{k \in \mathbb{N}} \mathrm{NSPACE}(n^k)$**  
    è la classe dei linguaggi accettabili in **spazio non deterministico polinomiale**.
    
- **$EXPTIME = \bigcup_{k \in \mathbb{N}} \mathrm{DTIME}(2^{n^k})$**  
    è la classe dei linguaggi decidibili in **tempo deterministico esponenziale**,  
    dove l’esponente che descrive la funzione limite è un **polinomio**.
    
- **$NEXPTIME = \bigcup_{k \in \mathbb{N}} \mathrm{NTIME}(2^{n^k})$**  
    è la classe dei linguaggi accettabili in **tempo non deterministico esponenziale**,  
    dove l’esponente che descrive la funzione limite è un **polinomio**.
##### Osservazioni
- Tutte queste classi sono **time constructible**; quindi, per il **Teorema 6.16**,  
    le corrispondenti classi **non deterministiche sono decidibili**.
### Classi complementari

$$
\mathrm{coP} = \{\, L \subseteq \Sigma^* \mid \Sigma \text{ è un alfabeto finito e } L^c \in P \,\}
$$

$$
\mathrm{coNP} = \{\, L \subseteq \Sigma^* \mid \Sigma \text{ è un alfabeto finito e } L^c \in NP \,\}
$$

#### Classe di funzioni 
$$
\mathrm{FP}
=
\bigcup_{k \in \mathbb{N}}
\left\{
f : \Sigma_1^* \to \Sigma_2^*
:\;
\exists \text{ una macchina di Turing deterministica } T \text{ che calcola } f
\ \text{e}\
\forall x \in \Sigma_1^*
\bigl[
\mathrm{dtime}(T,x) \in O(n^k)
\bigr]
\right\}.
$$


#### Relazioni tra classi di complessità
$P ⊆ NP$ e $PSPACE ⊆ NPSPACE$ (6.2)
$P ⊆ PSPACE$ e $NP ⊆ NPSPACE$ (6.3)
$PSPACE ⊆ EXPTIME$ e $NPSPACE ⊆ NEXPTIME$ (6.4)
$NP ⊆ EXPTIME$ (6.5)
$coP = P$ 

## RIDUZIONI TRA CLASSI DI COMPLESSITÀ
- date due classi C e C' possiamo dire che esse sono distinte se troviamo un linguaggio L che le separa quindi che appartiene a una ma non all'altra
	- data una riduzione che soddisfa un predicato $\pi$ abbiamo che $L1\preceq_\pi L2$
	- le riduzioni ci serviranno per definire una cosa particolare con le C completezze
##### Definizione 6.3:
Sia $\mathcal{C}$ una classe di complessità di linguaggi e sia $\preceq_\pi$ una generica $\pi$-riduzione.
Un linguaggio $L \subseteq \Sigma^*$ è $\mathcal{C}$-completo rispetto alla $\pi$-riducibilità se:
a) $L \in \mathcal{C}$ e
b) per ogni $L' \in \mathcal{C}$ vale $L' \preceq_\pi L$.
- un linguaggio che è C completo ci serve per separare le classi di complessità e definire se un linguaggio appartiene o meno a una certa classe C chiusa

##### Definizione 6.4:
Una classe di complessità $\mathcal{C}$ è chiusa rispetto a una generica $\pi$-riduzione se,
per ogni coppia di linguaggi $L_1$ e $L_2$ tali che
$L_1 \preceq_\pi L_2$ e $L_2 \in \mathcal{C}$, si ha garantito che $L_1 \in \mathcal{C}$.

>[!lemma] Teorema 6.18 >$$\text{P} \subset \text{EXPTIME}$$ 
>

>[!lemma] Teorema 6.19 >$$\text{PSPACE} = \text{NPSPACE}$$
##### Teorema 6.20:

Siano $\mathcal{C}$ e $\mathcal{C}'$ due classi di complessità tali che
$\mathcal{C}' \subseteq \mathcal{C}$
- Se $\mathcal{C}'$ è chiusa rispetto a una $\pi$-riduzione
- allora, per ogni linguaggio $L$ che sia $\mathcal{C}$-completo rispetto a tale $\pi$-riduzione, vale che
	- $L \in \mathcal{C}' \ \text{se e solo se} \ \mathcal{C} = \mathcal{C}'$

Banalmente, se $\mathcal{C} = \mathcal{C}'$ allora $L \in \mathcal{C}'$.
- Viceversa, supponiamo che $L \in \mathcal{C}'$. Poiché $L$ è $\mathcal{C}$-completo rispetto alla $\pi$-riducibilità, allora, per ogni linguaggio $L' \in \mathcal{C}$, vale che
	- $L' \preceq_\pi L$
- Poiché $\mathcal{C}'$ è chiusa rispetto alla $\pi$-riduzione, questo implica che, per ogni $L' \in \mathcal{C}$, risulta
	- $L' \in \mathcal{C}'$
		- Quindi $\mathcal{C} = \mathcal{C}'$.
![[Pasted image 20260111153027.png]]

## TEOREMA 6.21
>[!lemma] La classe `P` è chiusa rispetto alla riducibilità polinomiale.
###### DIMOSTRAZIONE
Siano $L_{1} \subseteq \Sigma_{1}^{*}$ e $L_{2} \subseteq \Sigma_{2}^{*}$ due linguaggi tali che $$L_{1} \le L_{2} \ \ \ e \ \ \ L_{2}\in P$$Indichiamo con $f: \Sigma_{1} \rightarrow \Sigma_{2}$ la funzione in **FP** che riduce $L_{1}$ a $L_{2}$ e siano 
- $T_{f}$ la macchina di turing (trasduttore) che calcola `f` in tempo polinomiale
	- ha 2 nastri e su $N_{2}$ scrive l'output
- $T_{2}$ la macchina deterministica (riconoscitore) che decide $L_{2}$ in tempo polinomiale
	- ha un nastro

Poiché $T_{f}$ e $T_{2}$ operano in tempo polinomiale, esistono $h, k \in N$ tali che, per ogni $x \in \Sigma_{1}^{*}$ e per ogni $y \in \Sigma_{2}^{*}$, $$dtime(T_{f}) \le |x|^{h} \ \ \ e \ \ \ dtime(T_{2}, y) \le |y|^{k}$$
Creiamo ora una nuova macchina $T_{1}$ che simula $T_{f}$ e $T_{2}$ e che decide $L_{1}$.
$T_{1}$ dispone di due nastri
- su $N_{1}$ è scritto l'input $x \in \Sigma_{1}$
$T_{1}$ opera in due fasi
1) Simula $T_{f}(x)$ e scrive l'output ($f(x))$ su $N_{2}$
2) Simula $T_{2}(f(x))$ su $N_{2}$
	- SE $T_{2}(f(x))$ ACCETTA -> $T_{1}(x)$ ACCETTA
	- SE $T_{2}(f(x))$ RIGETTA -> $T_{1}(x)$ RIGETTA

Dato che $f$ è una riduzione da $L_{1}$ a $L_{2}$, allora $$f(x) \in L_{2} \iff x \in L_{1}$$e visto che $T_{1}$ termina su ogni input (perché $T_2$ termina sempre) -> $T_{1}$ DECIDE il linguaggio.

###### COSTO
- $T_{f}(x)$ richiede $dtime(T_{f}, x) \le |x|^{h}$ passi
- $T_{2}(x)$ richiede $dtime(T_{2}, f(x)) \le |f(x)^{k}|$
- QUINDI $$dtime(T_{1}, x) \le |x|^{h} + |f(x)|^{k}$$
Dato che $dtime(T_{f}, x) \le |x|^{h}$e $T_{f}$ deve almeno scrivere il suo output $f(x)$, allora $$|f(x)| \le |x|^{h}$$e quindi $$dtime(T_{1}, x) \le |x|^{h} + |f(x)|^{k} \le |x|^{h} + (|x|^{h})^{k} = |x|^{h} + |x|^{hk}$$e poiché `h` e `k` sono costanti, questo prova che $$L_{1} \in P$$
##### Teorema 6.22
- sono chiusi anche NP, NEXPTIME,EXPTIME e spazio
Se dovessi riscrivere la dimostrazione del Teorema 6.21 per il Teorema 6.22, devi:
1. Sostituire “macchina deterministica” con:
    - non deterministica (per NP, NEXPTIME)
2. Sostituire il bound:
    - da polinomiale
    - a polinomiale / spazio polinomiale / esponenziale
3. Rifare **l’ultimo conto delle risorse** (tempo o spazio)
4. Lasciare **immutata**:
    - la costruzione
    - l’argomento sulla lunghezza di $f(x)$
#### Corollario 6.4
![[Pasted image 20260111164357.png]]

### Teorema 6.23
Se $coNP \neq NP$, allora $P  \neq NP$
- dimostrazione in realtà questa è la seconda congettura e non si sanno risposte effettive

### Teorema 6.24
La classe $coNP$ è chiusa rispetto alla riducibilità polinomiale.
- dimostrazione come 6.22
- se so che $L\in coNP \iff L^c \in NP$ 
	- riporto tutto a NP e poi svolgo come 6.22

### Teorema 6.25
Un linguaggio L è NP-completo se e soltanto se $L^c$ è coNP-completo

Siano $L_{1} \preceq L_{2}$ e sia $L_{2} \in coNP$.
Complementiamo $L_{1}$ e $L_{2}$ (così che sicuramente $L_{2} \in NP$) e utilizziamo la stessa dimostrazione per `NP`.
###### DIMOSTRAZIONE
(=>)
1) Passo 1 -- appartenenza
	- (L) è NP-completo ⇒ ($L \in NP$)
	- quindi ($L^c \in coNP$)

2) Passo 2 -- difficoltà (completezza)
	Prendi **un qualunque** linguaggio ($L' \in coNP$).  
	Allora:
	- ($L'^c \in NP$)
	
	Poiché (L) è NP-completo: $$L'^c \le_p L$$cioè esiste una funzione polinomiale (f) tale che:  $$  
x \in L'^c \iff f(x) \in L  
$$
	Ora complementi entrambi i lati:  $$  
x \in L' \iff f(x) \in L^c  
$$
	Quindi:  
$$  
L' \preceq_p L^c  
$$
Vale per ogni ($L' \in coNP$).  
Conclusione:
- ($L^c$) è **coNP-completo**.

(=>) È IDENTICA

#### Teorema 6.26:
Se esiste un linguaggio $L$ NP-completo tale che $L ∈ NP ∩ coNP$, allora $NP=coNP$

Supponiamo che esista un linguaggio $L$ NP-completo con $L \in NP \cap coNP$

Poiché $L \in coNP$, il suo complemento $L^c$ appartiene a $NP$. Inoltre, dal Teorema 6.25, essendo L NP-completo, segue che $L^C$ è **coNP-completo**. Pertanto, per ogni linguaggio $L' \in coNP$, vale $L' \preceq_p L^c$. 
Poiché NP è chiusa rispetto alle riduzioni polinomiali e $L^c \in NP$, segue che $L' \in NP$.
Dunque:
- $coNP \subseteq NP$
Per l’inclusione opposta, poiché $L$ è NP-completo, 
- per ogni $L'' \in NP$ vale $L'' \preceq_p L$ Essendo $L \in coNP$ e 
- poiché $coNP$è chiusa rispetto alle riduzioni polinomiali, segue che $L'' \in coNP$ Quindi:
- $NP \subseteq coNP$
Le due inclusioni implicano:
- $NP=coNP$

[[TUTTE LE RIDUZIONI DA FARE]]
