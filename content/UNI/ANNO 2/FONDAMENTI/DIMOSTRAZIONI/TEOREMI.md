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
Un linguaggio $L$ è decidibile se e soltanto se la funzione $\chi_L$ è calcolabile.

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
>Sia $f : \Sigma^* \rightarrow \Sigma_1^*$ una funzione.  
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
   <font color="#548dd4">b)</font> simula `T(x,y)` su $N_3$  
   - se `T(x,y)` termina in $q_A$, scrive `y` su $N_4`
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

# HALTING PRONBLEM E RIDUZIONI

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
## Teorema 5.4 — Versione da esame
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

Sia $L_1$ un linguaggio **non decidibile** e sia $L_2$ un secondo linguaggio tale che $L_1 \le_m L_2$; allora $L_2$ non è decidibile.

Indichiamo con $f_{1,2}$ la funzione che riduce $L_1$ ad $L_2$. Se $L_2$ fosse decidibile, allora potremmo decidere se $x \in L_1$ nel modo seguente:
1. calcoliamo $f_{1,2}(x)$
2. decidiamo se $f_{1,2}(x) \in L_2$

Poiché $x \in L_1$ se e soltanto se $f_{1,2}(x) \in L_2$, l’esito della decisione su $f_{1,2}(x)$ risponderebbe anche al quesito  
**“$x \in L_1$?”**

# GRAMMATICHE
