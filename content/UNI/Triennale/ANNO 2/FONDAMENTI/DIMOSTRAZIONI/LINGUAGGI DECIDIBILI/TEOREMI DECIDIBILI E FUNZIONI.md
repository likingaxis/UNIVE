## TEOREMA 3.1
>[!lemma]  
>Un linguaggio $L \subseteq \Sigma^*$ è decidibile se e soltanto se $L$ e $L^c$ sono accettabili.

- verso dx Mi creo una macchina di Turing `T'` basata sulla macchina che decide $L$, chiamata `T`.
- Questa macchina `T'` estende gli stati di `T` invertendoli.
	- quindi posso dire che T e T' non accettano mai insieme
	- uno accetta $L$ l'altro accetta $L^c$ 
- verso sx Creo due macchine di Turing `T_1` e `T_2`:
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
