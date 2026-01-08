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
>L'insieme $\mathscr{T}$ delle macchine di Turing definite sull'alfabeto `{0,1}` e dotate di un singolo nastro (più eventuale nastro di output) è numerabile.

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

Una volta trovata questa codifica, possiamo trasformare questa parola $\beta_T$ in un numero $\in \mathbb{N}$ in notazione decimale:

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
