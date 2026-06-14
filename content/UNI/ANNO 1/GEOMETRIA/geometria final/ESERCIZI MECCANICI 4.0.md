## 0. Prefiltro: cose da sapere al volo

### Definizioni fondamentali

**Sottospazio**  
Un sottoinsieme `W` di uno spazio vettoriale `V` e' sottospazio se:

- contiene il vettore nullo;
- se `u, v in W`, allora `u + v in W`;
- se `lambda in R` e `u in W`, allora `lambda u in W`.

**Combinazione lineare**  
`alpha_1 v_1 + ... + alpha_k v_k`

**Span**  
`Span(v_1,...,v_k)` e' l'insieme di tutte le combinazioni lineari dei vettori.

**Indipendenza lineare**  
I vettori `v_1,...,v_k` sono linearmente indipendenti se:

`alpha_1 v_1 + ... + alpha_k v_k = 0`

ha solo la soluzione banale:

`alpha_1 = ... = alpha_k = 0`.

**Base**  
Un insieme di vettori e' una base se:

1. genera tutto lo spazio;
2. e' linearmente indipendente.

**Dimensione**  
La dimensione e' il numero di vettori di una base.

---

## 1. Sistemi lineari e Rouché-Capelli

Un sistema lineare si scrive:

`Ax = b`

- `A` = matrice dei coefficienti;
- `x` = vettore delle incognite;
- `b` = termini noti.

### Sistema omogeneo

Un sistema e' omogeneo se:

`Ax = 0`

cioe' i termini noti sono tutti zero.

### Compatibilita'

Un sistema e' compatibile se ha almeno una soluzione.

### Rouché-Capelli

Sia `(A|b)` la matrice completa.

- Se `rg(A) != rg(A|b)`: nessuna soluzione.
- Se `rg(A) = rg(A|b) = n`: una sola soluzione.
- Se `rg(A) = rg(A|b) < n`: infinite soluzioni.

Dove `n` e' il numero di incognite.

### Metodo meccanico

1. Scrivi la matrice completa `(A|b)`.
2. Fai Gauss.
3. Calcola `rg(A)` e `rg(A|b)`.
4. Applica Rouché-Capelli.
5. Se serve, risolvi il sistema con variabili libere.

---

## 2. Gauss, rango e pivot

### Pivot

Un pivot e' il primo elemento non nullo utile in una riga dopo la riduzione.

### Rango

Il rango di una matrice e' il numero di pivot dopo la riduzione a scala.

### Matrice a scala

Una matrice e' a scala se i pivot scendendo di riga si spostano verso destra e sotto ogni pivot ci sono zeri.

### Operazioni lecite di riga

- Scambiare due righe.
- Moltiplicare una riga per uno scalare non nullo.
- Sommare a una riga un multiplo di un'altra riga.
## 3. Indipendenza / dipendenza lineare

### Obiettivo
Capire se `v_1,...,v_k` sono indipendenti o dipendenti.
### Metodo 1: sistema omogeneo
1. Imposta:
   `a_1 v_1 + ... + a_k v_k = 0`
2. Ottieni un sistema nelle incognite `a_1,...,a_k`.
3. Risolvi con Gauss.
4. Conclusione:
   - solo soluzione banale -> indipendenti;
   - esiste soluzione non banale -> dipendenti.
### Metodo 2: rango

1. Metti i vettori come colonne di una matrice `A`.
2. Fai Gauss.
3. Se `rg(A) = numero di vettori`, sono indipendenti.
4. Se `rg(A) < numero di vettori`, sono dipendenti.

### Errori rapidi da ricordare

- Se c'e' il vettore nullo, sono dipendenti.
- Se due vettori sono uguali, sono dipendenti.
- Se due vettori sono multipli, sono dipendenti.
- In `R^n`, piu' di `n` vettori sono sempre dipendenti.

---

## 4. Vettore come combinazione lineare / appartenenza allo span

### Domanda tipica

`v appartiene a Span(v_1,...,v_k)?`

### Metodo

1. Imposta:

   `v = a_1 v_1 + ... + a_k v_k`

2. Ottieni un sistema non omogeneo.
3. Risolvi con Gauss.
4. Conclusione:
   - sistema compatibile -> si', `v` appartiene allo span;
   - sistema incompatibile -> no.

Se trovi i coefficienti `a_i`, puoi scrivere esplicitamente la combinazione lineare.

---

## 5. Span, base e dimensione

### Trovare una base di uno span

Dato:

`V = Span(v_1,...,v_k)`

1. Metti i vettori come colonne di una matrice.
2. Riduci a scala.
3. Trova le colonne pivot.
4. Prendi le colonne pivot della matrice originale.
5. Quelle colonne formano una base dello span.
6. Il numero di colonne pivot e' la dimensione.

### Attenzione

Per l'immagine e per lo span si prendono le colonne originali corrispondenti ai pivot, non le colonne della matrice ridotta.

### Completare una base

Se hai vettori indipendenti in `R^n` e vuoi completarli a base:

1. Parti dai vettori dati.
2. Aggiungi vettori canonici `e_1,...,e_n` uno alla volta.
3. Ogni volta controlla che il rango aumenti.
4. Quando hai `n` vettori indipendenti, hai una base di `R^n`.

---

## 6. Applicazioni lineari

### Definizione

Una funzione `T: V -> W` e' lineare se:

`T(u + v) = T(u) + T(v)`

`T(lambda u) = lambda T(u)`

Equivalentemente:

`T(alpha u + beta v) = alpha T(u) + beta T(v)`

### Matrice associata

Se `T: R^n -> R^m`, la matrice associata rispetto alle basi canoniche si costruisce mettendo in colonna:

`T(e_1), T(e_2), ..., T(e_n)`

Quindi:

`A = [T(e_1) T(e_2) ... T(e_n)]`

### Composizione

Se `f` ha matrice `A` e `g` ha matrice `B`, allora:

`f o g` corrisponde ad `A B`.

Attenzione all'ordine: prima si applica `g`, poi `f`.

---

## 7. Ker, Im, rango

Sia `T = L_A: R^n -> R^m`.

### Nucleo / Ker

`ker(T) = {x in R^n : Ax = 0}`

Metodo:

1. Risolvi `Ax = 0`.
2. Scrivi la soluzione in forma parametrica.
3. I vettori dei parametri formano una base del Ker.
4. La dimensione del Ker e' il numero di parametri liberi.

### Immagine

`Im(T) = Span(colonne di A)`

Metodo:

1. Considera le colonne di `A`.
2. Riduci `A` a scala.
3. Trova le colonne pivot.
4. Prendi le colonne originali corrispondenti ai pivot.
5. Quelle sono una base di `Im(T)`.
6. `dim(Im(T)) = rg(A)`.

### Rango-nullita'

`dim(ker T) + dim(Im T) = dim(dominio)`

Per `A` con `n` colonne:

`dim(ker A) + rg(A) = n`

### Errore importante

`ker(T)` non e' mai vuoto: contiene sempre almeno il vettore nullo.

- Iniettiva: `ker(T) = {0}`.
- Non scrivere mai: `ker(T) = insieme vuoto`.

---

## 8. Iniettivita', suriettivita', invertibilita'

Sia `A in M_{m,n}` e `L_A: R^n -> R^m`.

### Iniettiva

`L_A` e' iniettiva se vettori diversi del dominio hanno immagini diverse.

Criteri:

`L_A iniettiva <=> ker(A) = {0}`

`L_A iniettiva <=> rg(A) = n`

cioe' rango uguale al numero di colonne.

### Suriettiva

`L_A` e' suriettiva se raggiunge tutto il codominio `R^m`.

Criteri:

`L_A suriettiva <=> Im(A) = R^m`

`L_A suriettiva <=> rg(A) = m`

cioe' rango uguale al numero di righe.

### Invertibile

Una matrice e' invertibile solo se e' quadrata.

Per `A in M_{n,n}`, sono equivalenti:

- `A` invertibile;
- `det(A) != 0`;
- `rg(A) = n`;
- colonne linearmente indipendenti;
- righe linearmente indipendenti;
- `ker(A) = {0}`;
- `Ax = 0` ha solo soluzione nulla;
- per ogni `b`, `Ax = b` ha unica soluzione;
- `L_A` e' iniettiva e suriettiva.

---

## 9. Determinanti e inversa

### Determinante 2x2

Per:

`A = [[a,b],[c,d]]`

`det(A) = ad - bc`

### Triangolare superiore/inferiore
Se `A` e' triangolare superiore o inferiore:
`det(A) = prodotto degli elementi diagonali`
### Proprieta' utili
- Scambiare due righe cambia il segno del determinante.
- Moltiplicare una riga per `lambda` moltiplica il determinante per `lambda`.
- Sommare a una riga un multiplo di un'altra riga non cambia il determinante.
- `det(A^T) = det(A)`.
- `det(AB) = det(A) det(B)`.
### Inversa con Gauss
Per trovare `A^{-1}`:
1. Scrivi `(A | I)`.
2. Fai Gauss fino ad arrivare a `(I | B)`.
3. Allora `B = A^{-1}`.
4. Se non riesci a ottenere `I`, la matrice non e' invertibile.
### Regola rapida
Se `det(A) = 0`, allora `A` non e' invertibile.
Se `det(A) != 0`, allora `A` e' invertibile.
## 10. Geometria: rette e piani
### Retta passante per un punto e con vettore direttore
Dato un punto `P0 = (x0,y0,z0)` e un vettore direttore `v = (a,b,c)`:
`r: P = P0 + t v`
Parametriche:
`x = x0 + at`
`y = y0 + bt`
`z = z0 + ct`
### Retta passante per due punti
Dati `P1` e `P2`, il vettore direttore e':
`v = P2 - P1`
Quindi:
`r: P = P1 + t(P2 - P1)`
### Piano passante per un punto e parallelo a due vettori
Dato `P0` e due vettori non paralleli `u, v`:
`pi: P = P0 + s u + t v`
### Piano passante per tre punti
Dati `A, B, C`:
`u = B - A`
`v = C - A`
Se `u` e `v` non sono paralleli:
`pi: P = A + s(B-A) + t(C-A)`
### Piano in forma cartesiana
Forma:
`ax + by + cz + d = 0`
Il vettore normale e':
`n = (a,b,c)`
Se hai due vettori direttori del piano `u` e `v`, un normale si trova con:
`n = u x v`
Poi sostituisci un punto del piano per trovare `d`.
### Intersezione retta-piano
1. Scrivi la retta in parametrica.
2. Sostituisci `x(t), y(t), z(t)` nell'equazione del piano.
3. Risolvi per `t`.
4. Casi:
   - trovi un valore di `t` -> intersezione in un punto;
   - identita' -> la retta giace nel piano;
   - impossibile -> nessuna intersezione.
### Intersezione piano-piano
Metti a sistema le due equazioni cartesiane.
- Se hai una variabile libera -> intersezione e' una retta.
- Se il sistema e' impossibile -> piani paralleli distinti.
- Se le equazioni sono proporzionali -> piani coincidenti.
### Rette nello spazio
Date due rette:
- se i vettori direttori sono multipli -> parallele o coincidenti;
- se non sono multipli e si intersecano -> incidenti;
- se non sono multipli e non si intersecano -> sghembe.
Le rette sghembe non sono complanari.
## 11. Autovalori, autovettori, autospazi
Sia `A in M_{n,n}`.
### Autovalore e autovettore
`lambda` e' autovalore se esiste `v != 0` tale che:
`A v = lambda v`
Il vettore `v` e' un autovettore associato a `lambda`.
### Polinomio caratteristico
`p_A(lambda) = det(A - lambda I)`
Gli autovalori si trovano risolvendo:
`det(A - lambda I) = 0`
### Autospazio
`E_lambda = ker(A - lambda I)`
Metodo:
1. Prendi un autovalore `lambda`.
2. Risolvi `(A - lambda I)x = 0`.
3. Le soluzioni formano l'autospazio.
4. Una base dell'autospazio si ottiene dai vettori dei parametri.
### Errore importante
- L'autovettore non puo' essere il vettore nullo.
- L'autospazio contiene anche il vettore nullo.
### Molteplicita'
- Molteplicita' algebrica `ma(lambda)`: quante volte `lambda` compare come radice del polinomio caratteristico.
- Molteplicita' geometrica `mg(lambda)`: dimensione dell'autospazio `E_lambda`.
Sempre:
`mg(lambda) <= ma(lambda)`
## 12. Diagonalizzazione
### Definizione operativa
Una matrice `A in M_{n,n}` e' diagonalizzabile se esiste una base di `R^n` composta da autovettori di `A`.
Equivalente negli esercizi:
`A` e' diagonalizzabile se riesci a trovare `n` autovettori linearmente indipendenti.
### Metodo
1. Calcola il polinomio caratteristico.
2. Trova gli autovalori.
3. Per ogni autovalore, trova l'autospazio.
4. Trova una base per ogni autospazio.
5. Somma le dimensioni degli autospazi.
6. Se la somma e' `n`, la matrice e' diagonalizzabile.
7. Metti gli autovettori come colonne di `P`.
8. Metti gli autovalori corrispondenti sulla diagonale di `D`.
### Formula
`D = P^{-1} A P`
oppure:
`A = P D P^{-1}`
### Attenzione all'ordine
Se:
`P = [v_1 v_2 ... v_n]`
con:
`A v_i = lambda_i v_i`
allora:
`D = diag(lambda_1,...,lambda_n)`
Gli autovalori in `D` devono stare nello stesso ordine degli autovettori in `P`.
## 13. Tipologie meccaniche da esercizio
### Tipo A - Verificare se una funzione e' lineare
1. Controlla `T(u+v)=T(u)+T(v)`.
2. Controlla `T(lambda u)=lambda T(u)`.
3. Se una delle due fallisce, non e' lineare.
4. Se ci sono termini quadratici, prodotti tra variabili, costanti aggiunte, spesso non e' lineare.
Esempi non lineari:
- `T(x,y) = (x^2,y)`;
- `T(x,y) = (x+1,y)`;
- `T(x,y) = (xy,y)`.
### Tipo B - Trovare matrice associata
1. Calcola `T(e_1),...,T(e_n)`.
2. Metti questi vettori in colonna.
3. Quella e' la matrice associata rispetto alle basi canoniche.
### Tipo C - Trovare Ker e Im
Ker:
1. Risolvi `Ax=0`.
2. Parametrizza.
3. Estrai base e dimensione.
Im:
4. Prendi le colonne di `A`.
5. Fai Gauss.
6. Prendi colonne pivot originali.
7. Base e dimensione.
### Tipo D - Stabilire iniettiva / suriettiva
Per `A in M_{m,n}`:
- iniettiva se `rg(A)=n`;
- suriettiva se `rg(A)=m`;
- invertibile se e' quadrata e `rg(A)=n`, oppure `det(A)!=0`.
### Tipo E - Verificare se `v in Im(A)`
1. Risolvi `Ax = v`.
2. Se compatibile, `v in Im(A)`.
3. Se incompatibile, `v notin Im(A)`.
### Tipo F - Calcolare `f(Span(v,w))`
`f(Span(v,w)) = Span(f(v), f(w))`
Metodo:
1. Calcola `f(v)` e `f(w)`.
2. Scrivi lo span delle immagini.
3. Se serve, trova una base eliminando dipendenze.
### Tipo G - Trovare autovalori e autospazi
1. Scrivi `A - lambda I`.
2. Calcola `det(A - lambda I)`.
3. Risolvi il polinomio.
4. Per ogni autovalore, risolvi `(A-lambda I)x=0`.
5. Estrai base dell'autospazio.
### Tipo H - Diagonalizzare

1. Trova autovalori.
2. Trova basi degli autospazi.
3. Se hai `n` autovettori indipendenti, diagonalizzabile.
4. `P` = autovettori in colonna.
5. `D` = autovalori corrispondenti in diagonale.
## 14. Errori da non fare

1. Non scrivere `ker = insieme vuoto`: il Ker contiene sempre lo zero.
2. Per l'immagine, non prendere le colonne della matrice ridotta: prendi le colonne originali corrispondenti ai pivot.
3. Non confondere righe e colonne:
   - iniettiva -> rango = numero colonne;
   - suriettiva -> rango = numero righe.
4. Una matrice non quadrata non ha inversa bilatera.
5. L'autovettore non puo' essere zero.
6. L'autospazio contiene anche zero.
7. `P` contiene autovettori, `D` contiene autovalori.
8. Gli autovalori in `D` devono corrispondere all'ordine degli autovettori in `P`.
9. Per verificare `v in Im(A)`, risolvi `Ax=v`.
10. Per trovare il Ker, risolvi sempre `Ax=0`.
11. Per dire che un insieme e' base, devi avere generazione e indipendenza.
12. In `R^n`, se hai `n` vettori indipendenti, hai una base.
13. In `R^n`, se hai piu' di `n` vettori, sono dipendenti.
14. Nel prodotto di matrici l'ordine conta: in generale `AB != BA`.
15. Cramer si usa solo se `det(A) != 0`.
## 15. Mini-priorita' per il nuovo prof
Priorita' altissima:
1. Gauss, rango, pivot.
2. Sistemi e Rouché-Capelli.
3. Base, span, indipendenza.
4. Ker, Im, rango-nullita'.
5. Iniettiva, suriettiva, invertibile.
6. Determinanti e inversa.
7. Rette, piani, intersezioni base.
8. Autovalori, autospazi, diagonalizzazione.
Priorita' media:
9. Formula di Grassmann.
10. Teorema degli orlati.
11. Cramer.
12. Geometria avanzata con perpendicolarita' e complanarita'.

