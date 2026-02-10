# TIPOLOGIA 1 — INDIPENDENZA / DIPENDENZA LINEARE
### OBIETTIVO
Capire se un insieme di vettori è:
- linearmente indipendente
- oppure dipendente

### SCHEMA UNICO (quello giusto)
1. Scrivi la combinazione lineare:
    ```
    a1 v1 + a2 v2 + ... + ak vk = 0
    ```
	
2. Traduci in **sistema omogeneo** 
	- mettiamo a sistema le varie `a`
3. Risolvi il sistema trovando il rango (**Gauss**, sostituzione, ecc.)
4. Conclusione:
    - se hai rango = dimensione matrice -> indipendenti
    - se hai rango < dimensione matrice -> dipendenti

---

# TIPOLOGIA 2 — VETTORE COME COMBINAZIONE LINEARE DI ALTRI
(es: “è combinazione di v1, v2, v3?”)
### SCHEMA MECCANICO
1. Imposta:
    ```
    v = a1 v1 + a2 v2 + ... + ak vk
    ```
    dove
    - `v` è il vettore che vuoi dimostrare sia combinazione degli altri vettori
    - i vari `v_i` sono i vettori che vuoi combinare
2. Mettiamo a sistema **non omogeneo**
    
3. Risolvi il sistema (FAI GAUSS SAMUELE)
    
4. Conclusione:
    - sistema compatibile (soluzione sensata) → **sì**
    - incompatibile (impossibile) → **no**

#### RICHIESTA AGGIUNTIVA: esprimere la combinazione lineare nella forma più generale possibile
- Devi semplicemente scrivere 
```
v = (VALORE DI a1) * v1 + (VALORE DI a2) * v2 + ... + (VALORE DI aN) * vNhelp 
```

#### RICHIESTA PARTICOLARE MA CHE È LA TIPOLOGIA 2 FATTA E FINITA
- Determinare per quali valori di $t \in R$ si abbia $$v_{4} \in SPAN(v_{1}, ..., v_{n})$$
	- SE HAI `m` VETTORI DIPENDENTI NELLO SPAN NE CONTI SOLO UNO 


---

# TIPOLOGIA 3 — SPAN, DIMENSIONE, BASE 
### OBIETTIVO
- trovare dim(Span)
- estrarre una base da un insieme dato

### SCHEMA
1. SE TI DA LO SPAN -> scrivi il sistema con le combinazioni lineari
2. Metti gli `n` vettori **in colonna** (se ti sono già stati dati li scegli da lì, altrimenti li inventi)
3. Fai Gauss -> trova il rango
4. Il **numero di pivot (rango) = dimensione base**
5. I vettori **corrispondenti ai pivot** (INDIPENDENTI) formano la base


---
# TIPOLOGIA 4 — COMPLETARE (estendere) UNA BASE
### SCHEMA
1. Parti dalla base trovata
2. Aggiungi `m` vettori canonici per arrivare alla dimensione dello spazio 

Scrittura finale:
```
BV = { VECCHIA BASE, vettori canonici}
```

---

# TIPOLOGIA 5 — SISTEMI LINEARI (anche con parametro)

### SCHEMA GENERALE
1. Scrivi matrice **estesa** (completa)
2. Trova il rango con Gauss
3. Confronta:
    - rango A
    - rango A|b

Conclusioni:
- ranghi diversi → **incompatibile**
- ranghi uguali = n → **unica**
- ranghi uguali < n → **infinite**

>[!tip] CON IL PARAMETRO DEVI TROVARE TUTTI I CASI IN CUI IL PARAMETRO FA 0 E CALCOLI IL RANGO DOPO LA SOSTITUZIONE.
>Se poi ti chiede di trovare le soluzioni con i parametri compatibili metti a sistema e ricavi le varie `x` `y` e `z`


---

# TIPOLOGIA 6 — DETERMINANTE / INVERTIBILITÀ / INVERSA

## DETERMINANTE CASI SPECIALI
- Se hai una matrice quadrata e triangolare/diagonale -> **il determinante è dato dal prodotto degli elementi della diagonale**
- Se hai una matrice quadrate e le due sottomatrici in alto a destra e in basso a sinistra sono nulla -> **il determinante è dato dal prodotto dei determinanti delle altre due sottomatrici**
- $det(A \cdot B) = det(A) \cdot det(B)$ (BINET)

## INVERSA
1. Calcola det(A)
2. Se det ≠ 0:
    - A invertibile
    - puoi calcolare A⁻¹
    
3. Se det = 0:
    - A non invertibile

4. INVERTIBILITÀ
	- PUOI FARLA 
		- CON LE MATRICI AGGIUNTE, includendo l'elemento di parità e poi fai fratto il determinante
		- CON LA MATRICE IDENTITÀ -> metti `[A | I]`, fai in modo che diventi `[I | A]` e `A` sarà inversa

#### Calcolare il polinomio caratteristico
$$det(𝐴−𝜆𝐼)=0$$


⚠️ Nota:  
su **Z₅** devi ridurre tutto mod 5 E NON PUOI USARFE FRAZIONI MENTRE FAI GAUSS.

---

# TIPOLOGIA 7 — KER / IM (applicazioni lineari o matrici)

### SCHEMA
**Nucleo** (o KER)
1. dim(KER) = n - dim(IM) 
	
2. Risolvi Ax = 0
	- prendi la matrice e la metti a sistema con le varie `x` `y` e `z`
```
{ a x + b y + c z = 0
```

2. Base = soluzioni parametriche del sistema sostituire con i valori 


**Immagine**
- Metti i vettori in colonna nella matrice
- dim(IM) = rango
- IM = prendi le colonne dei PIVOT e le metti in un insieme

Formula sempre valida:
```
dim Ker + dim Im = n
```


---

# TIPOLOGIA 8 — AUTOVALORI / AUTOSPAZI / DIAGONALIZZAZIONE
#### AUTOVALORI
1. calcoli il `det(A − λI)`
2. Potresti usare raccoglimenti parziali o usi la formula risolutiva
3. I risultati di `λ` sono gli autovalori -> in base a quante volte compaiono abbiamo una `ma`

#### AUTOSPAZIO
1. EQUAZIONI DEGLI AUTOSPAZI -> per ogni λ fai il sistema (A − λI)x = 0

#### AUTOVETTORE
È un vettore non nullo che appartiene all'autospazio trovato sostituendo dei valori all'equazione parametrica dell'autospazio.

##### BASE DI UN AUTOSPAZIO (composta da autovettori)
- Prendi l'eq cartesiana dello autospazio -> trasformi in parametrica e trovi i valori del vettore (i coeff. dei parametri) 


#### DIAGONALIZZAZIONE
1. Calcoli `mg` (dimensione dell'autospazio) -> per ogni autospazio calcoli `n - rango matrice`
    
2. SE $\sum m_{a} = \sum m_g$ -> diagonalizzabile 
	- sapendo che $m_{g} \le m_{a}$ per ogni autovalore
	- sapendo che $\sum m_{a} = n$
    


---

# TIPOLOGIA 9 — GEOMETRIA (rette e piani)

### RETTA
Parametriche:
```
x = x0 + at
y = y0 + bt
(z = z0 + ct)
```

Cartesiane:
```
ax + by + cz + d = 0 
```
- trova **normale**
    
- scrivi ax + by + cz + d = 0
    

### RELAZIONE TRA DUE RETTE (o due piani)
Metti a sistema l'uguaglianza delle due eq. parametriche (se hai gli stessi parametri ricorda di cambiarli in una delle due con `q` e `d`)
- SE LA SOLUZIONE IMPOSSIBILE allora possono essere
	- **parallele** → se i vettori direttori sono proporzionali
		- $v_{1} = kv_{2}$ -> metti a sistema e trovi il valore di `k`
			- se hai soluzione sono parallele
	- **sghembe** → se i vettori direttori non sono proporzionali (sistema impossibile)

- SE HAI UNA SOLA SOLUZIONE 
	- **incidenti** 

- SE HAI INFINITE SOLUZIONI
	- **coincidenti**

>[!tip] TROVARE VETTORE NORMALE DI UN PIANO
>- Il vettore direttore di una retta corrisponde ai coefficienti dei parametri 
>- Sappiamo che un piano è formato da due parametri -> ti crei un vettore per il primo parametro e un vettore per il secondo parametro
>	- applichi poi il prodotto tra vettori $$u×v=(u2​ \cdot v3​−u3 \cdot ​v2​,u3 \cdot​ v1​−u1 \cdot ​v3​,u1 \cdot ​v2​−u2 \cdot ​v1​)$$
>	- da questo vettore trovi i coefficienti di `x` `y` e `z`, li metti nell'equazione $ax + by +cz +d$
>	- sostituisci poi ad `x` `y` `z` i termini noti della parametrica (il punto) e trovi `d` -> RISCRIVI LA CARTESIANA CON il valore di `d` (`x`, `y` e `z` senza il valore sostituito)
>
>- con il prodotto tra vettori otteniamo un qualcosa utile per l'equazione CARTESIANA, per la parametrica servono 
>		- un punto $P_{0}$
>		- 2 vettori direttori 



## INTERSEZIONE
#### RETTE $r_{1} \cap r_{2}$
- Metti a sistema le due cartesiane delle rette (SE HAI LE PARAMETRICHE TRASFORMI IN CARTESIANE)

#### PIANI $\pi_{1} \cap \pi_{2}$
- Dobbiamo ricondurci ad avere due cartesiane 
	- SE ABBIAMO DELLE PARAMETRICE FACCIAMO QUELLO SCRITTO NEL RIQUADRO BLU PER TROVARE LE CARTESIANE DEI PIANI
- Metti a sistema le due equazioni cartesiane (una sotto l'altra)
	
- Se ti chiede di fare la parametrica del nuovo sistema
	- non hai variabili libere -> si intersecano in un punto
	- esce una sola variabile libera -> l'intersezione è una retta
	- ti escono più variabili libere -> l'intersezione è un piano
	- ti esce impossibile -> NON SI INTERSECANO

#### RETTA E PIANO $r \cap \pi$
- DETERMINARE LA CARTESIANA del piano (la cosa blu sopra)
- sostituisci i parametri della retta all'equazione cartesiana del piano e metti `= 0`
	- trovi i valori dei parametri del sistema
		- `t = PUNTO` -> intersecano in un punto
		- `t = variabile libera` -> INTERSEZIONE È UNA RETTA (e sono complanari)
		- `t` impossibile -> non intersecano

#### Trovare l'eq cartesiana di una retta parallela a un'altra e che passa per un punto dato
- Prendi il vettore direttore dell'altra retta
-  Scrivi l'equazione parametrica con $P_{0}$ = al punto dato e poi usa il vettore direttore dell'altra retta.

#### Trovare l'eq di una retta `l` passante per un punto e parallela a `pi1` intr `p2` 
- Trovi la cartesiana di $\pi_{1} \cap \pi_{2}$ 
- Dalla cartesiana scrivi la parametrica
- Dalla parametrica hai il vettore 
- Prendi il vettore trovato e scrivi la parametrica utilizzando anche il punto dato.


#### Trovare eq param. `pi greco` parallelo alle rette `r1` e `r2` passante per il punto `p0`
- Prendi i vettori direttori delle rette `r1` e `r2`
- La parametrica del piano parte dal punto dato (`p0`) e i coefficienti dei parametri sono rispettivamente i coefficienti dei vettori direttori delle rette (uno per `t` e uno per `s`)


>[!danger] DA VEDERE "perpendicolare" 



## COMPLANARITÀ
Due rette sono complanari se si trovano nello stesso piano.
- Prendi l'equazione CARTESIANA di una retta $r_{1}$ che è data (se siamo in $R^{3}$) dall'intersezione delle rette cartesiane dei piani.
- SCEGLI UNA DELLE DUE EQUAZIONI (la più facile)
- Prendi l'equazione PARAMETRICA della retta $r_{2}$ e sostituisci alle varie `x` `y` e `z` della cartesiana scelta e verifichi se esiste la soluzione.
- SE ESISTE -> complanari


## EQUAZIONI PARAMETRICE DI UNA RETTA DATI DUE PUNTI
Sappiamo che una retta è formata da $$P_{0} + t \cdot v$$
Il vettore direttore `v` è dato dalla differente dei due punti dati $$v = P_{1} - P_{0}$$
Una volta trovato il direttore scrivi il sistema sostituendo i valori che hai.