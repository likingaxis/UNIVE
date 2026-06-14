### RETTE
###### parallele, incidenti, sghembe
Metti a sistema l'uguaglianza delle due eq. <u>parametriche</u> (se hai gli stessi parametri ricorda di cambiarli in una delle due)
- SE LA SOLUZIONE IMPOSSIBILE allora possono essere
	- **parallele** → se i vettori direttori sono proporzionali
		- $v_{1} = kv_{2}$ -> metti a sistema e trovi il valore di `k`
			- se hai soluzione sono parallele
	- **sghembe** → se i vettori direttori non sono proporzionali (sistema impossibile)
- SE HAI UNA SOLA SOLUZIONE 
	- **incidenti** 
- SE HAI INFINITE SOLUZIONI
	- **coincidenti

###### complanari
complanarità di due rette
- **parallele** → sono complanari;
- **incidenti** → sono complanari;
- **sghembe** → non sono complanari;
- **coincidenti** → sono complanari.

###### retta ortogonale rispetto a r1 e r2 incidenti nel punto P
- prendi i vettori direttori delle rete (nelle parametriche)
- costruisci il piano parallelo a r1 e r2 e passante per P
	- P + vettori direttori
- fai cartesiana del piano
	- prendi i coefficienti della cartesiana e rappresento il <u>vettore normale</u>
- la retta ortogonale è rappresentata da ***P + t(vettore normale)***

###### equazione parametrica dati due punti
- devo scrivere $P_{0} + t \cdot v$
- Il vettore direttore `v` è dato dalla differenza dei due punti dati $v = P_{1} - P_{0}$
	- Una volta trovato il direttore scrivi il sistema sostituendo i valori che hai

###### punto appartenente a piano o retta
- sostituisci nella <u>cartesiana</u> il punto e vedi se da un risultato coerente

###### equazione retta passante per P e ortogonale a $\pi$
- metti come origine P e come direttore il normale del piano (coefficienti cartesiana piano)

###### retta r interseca piano $\pi$
- metti a sistema le equazioni di `r` e di $\pi$ (a quanto pare puoi fare come ti pare)
- trovi il valore di `t` e sostituisci alle varie `x`, `y` e `z`
	- i valori risultanti sono il punto (se è impossibile non interseca)

###### CRAMER
![[Pasted image 20260614184511.png|375]]

###### Rouche-capelli
- Scrivi matrice **estesa** 
- Trova il rango con Gauss
- Confronta: `rango A` e `rango A|b`
	- ranghi diversi → **incompatibile**
	- ranghi uguali = n → **unica**
	- ranghi uguali < n → **infinite

###### sottospazio
- le soluzioni di un sistema lineare formano un sottospazio vettoriale se e solo se il sistema è omogeneo
	- svolgi il sistema lineare
	- definisci per quali `k` il sistema è omogeneo
		- ti calcoli i vettori per tutti i `k`
		- Esplicitare `S`:
			- `S = {insieme dei vettori}`
			![[Screenshot_2026-06-14-18-50-10-19_45415775811cea13943236d9369df411.jpg|495]]

### VETTORI
###### base di $V=span\{v_{1}, v_{2}, v_{3}\}$
- insieme minimo dei vettori che genera lo spazio
	- metti vettori in colonne
	- fai gauss -> scegli i pivot -> vettori corrispondendi a colonne
###### trova una base con spazio maggiore
- aggiungi alla base trovata prima i vettori canonici linearmente indipendenti

###### $v_{1} \  e \ v_{2}$ linearmente indipendenti
- metti come colonne di gauss
	- se r(A) = max -> indipendenti
- se $det(A) \neq 0 \rightarrow r(A) = max$  

### APPLICAZIONI LINEARI
###### verifica se un'app è lineare
È lineare se e solo se
- prendi un vettore `v` e verifica <u>OMOGENEITÀ</u> -> $t(\lambda v) = \lambda T(v)$
- prendi due vettori `v1` e `v2` e verifica <u>ADDITIVITÀ</u> -> $f(u+v)=f(u)+f(v)$

###### NUCLEO, IMMAGINE E DIMENSIONE
- prendi matrice (se è un'app lineare prendi i coefficienti e forma matrice <u>ASSOCIATA ALLE BASI CANONICHE</u>)
- IMMAGINE
	- gauss -> pivot -> rango
		- $dim(Im) = r(A)$
		- $\mathrm{Im(A)} =span\{$ vettori ORIGINALI associati ai pivot $\}$  
- NUCLEO
	- $dim(ker(A)) = n - r(a)$
	- $ker(A) =$ sistema (post gauss) e trovi la `t` e i corrispondenti vettori
		- $ker(A) = span\{\text{vettori trovati}\}$

###### verifica se $v \in \mathrm{Im}$
- risolvi il sistema mettendo $A \times (x, y, z) = v$
	- se trovi soluzioni -> compatibile

###### INIETTIVA, SURIETTIVA, BIUNIVOCA
- Se è QUADRATA
$$\boxed{ A \text{ invertibile} \Longleftrightarrow \det(A)\neq 0 \Longleftrightarrow \operatorname{rg}(A)=n \Longleftrightarrow \ker(A)=\{0\}  }$$
$$\boxed{\Longleftrightarrow L_A \text{ iniettiva} \Longleftrightarrow L_A \text{ suriettiva}}$$
- se è RETTANGOLARE
	- suriettiva -> $r(A) =$ numero righe
	- iniettiva -> $r(A) =$ numero colonne

###### Composto tra funzioni $f \ o \ g$ 
- $f \ o \ g \Rightarrow f(g(x)) \Rightarrow f(x) \cdot g(x)$

###### $f = L_A$ invertibile (isomorfismo)
Vale che $f \ \text{invertibile} \iff A \ \text{invertibile}$
- se $\det(A) \neq 0$ -> invertibile
- $\det(AB) = \det(A) \cdot \det(B)$

###### dati `v` e `w` trova parametrica e cartesiana di $f(span\{v, w\})$
- $f(span\{v,w\}) = span\{f(v), f(w)\}$
	- trova A della funzione
		- fai $Av$ e poi $Aw$ e metti i risultati al posto di $f(v)$ e $f(w)$
- PARAMETRICA -> $(x,y,z) = t(Av) + s(Aw)$
- CARTESIANA -> te la ricavi da parametrica

###### parametrica e cartesiana di $\mathrm{Im(\phi)} \cap \{EQUAZIONE\}$
- metti a sistema cartesiana di $\mathrm{Im}(\phi)$ e poi EQUAZIONE

### DETERMINANTE E MATRICE INVERSA
Se la matrice è quadrata
- calcola determinante finché non trovi un determinante $\neq 0$
	- se $\det(A) = 0$ -> rango $\leq max-1$
	- se $det(A) \neq 0$ -> rango $= max$ 

Inversa -> solo se $\det(A) \neq 0$
- Calcolo la matrice dei cofattori (CAMBIA SEGNO AI DISPARI):
    - per ogni elemento elimino la sua riga e la sua colonna;
    - calcolo il determinante della sottomatrice rimasta;
- Faccio la trasposta della matrice dei cofattori:
    - le righe diventano colonne;
    - le colonne diventano righe.
- Divido tutto per $det(A)$ (puoi metterlo anche fuori dalla matrice).

- $A \times A^{-1} = I$  

### AUTOVALORI, AUTOVETTORI, AUTOSPAZI
###### AUTOVALORI
calcoli il polinomio caratteristico $p_{A}(\lambda) = det(A − λI)$
- `λ` sono gli autovalori -> in base a quante volte compaiono abbiamo una `ma`
###### AUTOVETTORE
Per ogni `λ` fai il sistema $(A − λI)x = 0$ -> sostituisci `λ` e fai sistema ``
###### AUTOSPAZIO
Insieme di tutti gli autovettori associati a un autovalore -> $E_{\lambda} = span\{VETTORI\}$
- `mg` -> numero di vettori dell'autospazio

###### DIAGONALIZZAZIONE
- SE $\sum m_{a} = \sum m_g$ -> diagonalizzabile 
	- sapendo che $m_{g} \le m_{a}$ per ogni autovalore
	- sapendo che $\sum m_{a} = n$
    
###### MATRICE DIAGONALIZZANTE `P`
- prendi gli autovettori degli autospazi e mettili in colonna

###### MATRICE DIAGONALE
$$D = P^{-1} \times A \times P$$
- in sostanza prendi gli autovalori, mettili in diagonale e il resto a 0
	- DEVI METTERLI IN ORDINE RISPETTO AGLI AUTOVETTORI CHE HAI MESSO IN `P`