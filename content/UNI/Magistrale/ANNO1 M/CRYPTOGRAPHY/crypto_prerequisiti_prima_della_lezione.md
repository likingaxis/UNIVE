# Cryptography — Ripasso dei prerequisiti prima della prima lezione

Questo file NON riassume la prima lezione.

Serve solo a rinfrescare i concetti matematici e informatici che è utile avere già chiari **prima** di seguire una prima lezione di crittografia teorica.

---

# 1. Insiemi

## Appartenenza

Se `x` appartiene a un insieme `A`:

\[
x \in A
\]

Se non appartiene:

\[
x \notin A
\]

Esempio:

\[
3 \in \{1,2,3,4\}
\]

---

## Cardinalità

La cardinalità di un insieme è il numero dei suoi elementi.

Se:

\[
A = \{a,b,c\}
\]

allora:

\[
|A| = 3
\]

Questa notazione compare continuamente in crittografia.

---

## Prodotto cartesiano

Se abbiamo due insiemi `A` e `B`:

\[
A \times B
\]

è l'insieme di tutte le coppie:

\[
(a,b)
\]

con:

\[
a \in A,\qquad b \in B
\]

---

# 2. Funzioni

Una funzione:

\[
f:A \rightarrow B
\]

associa a ogni elemento di `A` un elemento di `B`.

Terminologia:

- `A` = dominio
- `B` = codominio
- `f(x)` = valore prodotto dalla funzione sull'input `x`

Esempio:

\[
f(x)=x^2
\]

---

## Funzione inversa

Se una funzione è invertibile, possiamo avere:

\[
f^{-1}(f(x))=x
\]

Non serve approfondire molto: basta ricordare l'idea di una trasformazione che può essere "annullata" da un'altra trasformazione.

---

# 3. Bit

Un bit può essere:

\[
0
\]

oppure:

\[
1
\]

Una sequenza di bit può essere, per esempio:

```text
101101
```

---

## Stringhe di bit

La notazione:

\[
\{0,1\}^n
\]

significa:

> insieme di tutte le stringhe di bit di lunghezza `n`.

Esempio:

\[
\{0,1\}^2
=
\{00,01,10,11\}
\]

Quindi:

\[
|\{0,1\}^n| = 2^n
\]

Questa relazione è molto importante.

---

# 4. XOR

Lo XOR è un'operazione tra bit.

Si indica con:

\[
\oplus
\]

Tabella:

| a | b | a XOR b |
|---|---|---------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Proprietà da ricordare:

\[
a \oplus 0 = a
\]

\[
a \oplus a = 0
\]

\[
a \oplus b = b \oplus a
\]

\[
(a \oplus b)\oplus c
=
a\oplus(b\oplus c)
\]

e soprattutto:

\[
(a\oplus b)\oplus b=a
\]

---

# 5. Potenze di 2

È utile essere veloci con:

\[
2^1=2
\]

\[
2^2=4
\]

\[
2^3=8
\]

\[
2^4=16
\]

\[
2^8=256
\]

\[
2^{10}=1024
\]

Se una stringa ha `n` bit, esistono:

\[
2^n
\]

possibili stringhe diverse.

Esempio:

una stringa di 8 bit può assumere:

\[
2^8=256
\]

valori diversi.

---

# 6. Logaritmo in base 2

Non serve fare esercizi complicati.

Ricorda soltanto che:

\[
\log_2(2^n)=n
\]

Esempio:

\[
\log_2(256)=8
\]

perché:

\[
256=2^8
\]

In informatica e crittografia la base 2 compare continuamente.

---

# 7. Probabilità di base

Questa è probabilmente la parte matematica più importante da avere fresca.

---

## Evento

Se `A` è un evento:

\[
Pr[A]
\]

indica la probabilità che `A` accada.

La probabilità è sempre compresa tra:

\[
0 \leq Pr[A] \leq 1
\]

---

## Evento complementare

Se `A` è un evento:

\[
Pr[\neg A]=1-Pr[A]
\]

---

# 8. Variabili casuali

Una variabile casuale `X` può assumere diversi valori secondo una certa distribuzione.

La scrittura:

\[
Pr[X=x]
\]

significa:

> probabilità che la variabile casuale `X` assuma il valore `x`.

Esempio: dado equilibrato.

\[
Pr[X=3]=\frac16
\]

---

# 9. Distribuzione uniforme

Una distribuzione è uniforme quando tutti i valori possibili hanno la stessa probabilità.

Se:

\[
S=\{a,b,c,d\}
\]

e scegliamo un elemento uniformemente:

\[
Pr[X=a]=Pr[X=b]=Pr[X=c]=Pr[X=d]=\frac14
\]

In generale, se:

\[
X
\]

è uniforme su un insieme finito `S`, allora:

\[
Pr[X=x]=\frac{1}{|S|}
\]

per ogni:

\[
x\in S
\]

---

# 10. Probabilità congiunta

La scrittura:

\[
Pr[A\cap B]
\]

significa:

> probabilità che avvengano sia `A` sia `B`.

Può anche comparire come:

\[
Pr[X=x \land Y=y]
\]

---

# 11. Probabilità condizionata

Formula:

\[
Pr[A\mid B]
=
\frac{Pr[A\cap B]}{Pr[B]}
\]

Da leggere:

> probabilità di `A` sapendo che `B` è avvenuto.

Esempio intuitivo:

- `A`: una carta è un re
- `B`: sappiamo che la carta è una figura

La probabilità di `A` cambia dopo aver conosciuto `B`.

Questa idea sarà molto importante nel corso.

---

# 12. Indipendenza

Due eventi `A` e `B` sono indipendenti quando sapere che uno è accaduto non dà informazione sull'altro.

Una definizione equivalente è:

\[
Pr[A\cap B]
=
Pr[A]Pr[B]
\]

oppure:

\[
Pr[A\mid B]
=
Pr[A]
\]

quando la probabilità condizionata è definita.

---

# 13. Somma delle probabilità

Per eventi incompatibili:

\[
Pr[A\cup B]
=
Pr[A]+Pr[B]
\]

Se non sono necessariamente incompatibili:

\[
Pr[A\cup B]
=
Pr[A]+Pr[B]-Pr[A\cap B]
\]

---

# 14. Notazione con sommatorie

È utile riconoscere:

\[
\sum_{x\in S} f(x)
\]

che significa:

> somma `f(x)` per tutti gli elementi `x` dell'insieme `S`.

Esempio:

\[
\sum_{i=1}^{3} i
=
1+2+3
=
6
\]

---

# 15. Notazione "per ogni" ed "esiste"

## Per ogni

\[
\forall x
\]

significa:

> per ogni `x`

Esempio:

\[
\forall x\in A
\]

= per ogni elemento `x` appartenente ad `A`.

---

## Esiste

\[
\exists x
\]

significa:

> esiste almeno un `x`

---

# 16. Implicazione

\[
A \Rightarrow B
\]

significa:

> se `A` è vero, allora `B` è vero.

---

# 17. Se e solo se

\[
A \iff B
\]

significa:

> `A` è vero se e solo se `B` è vero.

Quindi valgono entrambe le implicazioni:

\[
A\Rightarrow B
\]

e:

\[
B\Rightarrow A
\]

---

# 18. Modulo — solo intuizione

È utile ricordare cosa significa:

\[
a \bmod n
\]

cioè il resto della divisione di `a` per `n`.

Esempio:

\[
17\bmod 5=2
\]

perché:

\[
17=3\cdot5+2
\]

Non serve approfondire ancora aritmetica modulare avanzata.

---

# 19. Algoritmo: idea di base

Un algoritmo è una procedura che:

1. riceve un input;
2. esegue una serie di operazioni;
3. produce un output.

In forma astratta:

\[
y=A(x)
\]

significa:

> l'algoritmo `A`, dato l'input `x`, produce `y`.

---

# 20. Algoritmi randomizzati

Un algoritmo può usare casualità interna.

Quindi, con lo stesso input, potrebbe produrre output diversi in esecuzioni diverse.

La notazione può variare, ma l'idea importante è:

```text
input + randomness -> output
```

Questa distinzione è molto importante in crittografia.

---

# 21. Complessità computazionale — intuizione minima

Non serve ripassare tutta la teoria della complessità.

È però utile ricordare cosa significa parlare di:

- tempo di esecuzione;
- dimensione dell'input;
- algoritmo efficiente;
- crescita polinomiale.

Esempi:

\[
O(n)
\]

\[
O(n^2)
\]

\[
O(n^3)
\]

contro quantità esponenziali come:

\[
O(2^n)
\]

Idea intuitiva:

> un problema può essere matematicamente risolvibile ma computazionalmente troppo costoso da risolvere per input grandi.

Questa distinzione diventerà centrale nella crittografia moderna.

---

# 22. Concetto di informazione

Non serve teoria dell'informazione formale.

Tieni però chiara questa distinzione:

```text
dato osservato
      ↓
nuova informazione ottenuta
```

Se osservare qualcosa cambia ciò che puoi dedurre su una variabile sconosciuta, quell'osservazione ti ha dato informazione.

Questo modo di ragionare è molto utile quando si parla di sicurezza.

---

# 23. Attori e comunicazione

Prima della lezione basta avere familiarità con uno scenario astratto:

```text
sender  ---- messaggio ----> receiver
              |
              |
          osservatore
```

L'obiettivo della crittografia è studiare come proteggere determinate proprietà della comunicazione anche in presenza di un avversario.

Non serve conoscere ancora i diversi modelli di sicurezza.

---

# 24. Parole inglesi utili

Il corso sarà probabilmente pieno di questi termini.

| English | Italiano |
|---|---|
| message | messaggio |
| sender | mittente |
| receiver | destinatario |
| adversary | avversario |
| attacker | attaccante |
| key | chiave |
| random | casuale |
| uniformly random | uniformemente casuale |
| probability | probabilità |
| event | evento |
| independent | indipendente |
| bit string | stringa di bit |
| length | lunghezza |
| set | insieme |
| cardinality | cardinalità |
| input | ingresso |
| output | uscita |
| algorithm | algoritmo |
| efficient | efficiente |
| security | sicurezza |

---

# 25. Cose che NON serve studiare prima della prima lezione

Non perdere tempo adesso su:

- RSA
- Diffie-Hellman
- AES
- elliptic curves
- finite fields
- gruppi
- anelli
- teoria dei numeri avanzata
- primalità
- discrete logarithm
- digital signatures
- hash functions
- blockchain

Arriveranno eventualmente dopo.

---

# Checklist finale

Prima di entrare in aula dovresti riuscire a dire senza pensarci troppo:

- [ ] So cosa significa \(x\in A\)
- [ ] So cosa significa \(|A|\)
- [ ] So leggere \(f:A\rightarrow B\)
- [ ] So cosa significa \(\{0,1\}^n\)
- [ ] So che ci sono \(2^n\) stringhe di `n` bit
- [ ] So fare XOR tra due bit/stringhe
- [ ] So leggere \(Pr[X=x]\)
- [ ] So cos'è una distribuzione uniforme
- [ ] So cos'è una probabilità condizionata
- [ ] So cosa significa indipendenza
- [ ] So leggere \(\forall\), \(\exists\), \(\Rightarrow\), \(\iff\)
- [ ] Ricordo cosa significa `mod`
- [ ] So distinguere algoritmo deterministico e randomizzato
- [ ] Ho un'idea intuitiva di cosa significhi "algoritmo efficiente"

---

# Ripasso ultra-rapido da 10 minuti

Se hai pochissimo tempo, concentrati solo su questi punti:

1. \(\{0,1\}^n\) e \(2^n\)
2. XOR
3. probabilità condizionata
4. indipendenza
5. distribuzione uniforme
6. insiemi, funzioni e cardinalità
7. notazione \(\forall,\exists,\Rightarrow,\iff\)
8. differenza tra algoritmo deterministico e randomizzato

Questi sono i prerequisiti più utili da avere freschi prima di iniziare.
