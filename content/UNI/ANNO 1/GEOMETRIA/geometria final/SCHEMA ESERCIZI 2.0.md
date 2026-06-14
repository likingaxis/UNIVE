### RETTE
###### Rette parallele o incidenti e complanari
Metti a sistema l'uguaglianza delle due eq. parametriche (se hai gli stessi parametri ricorda di cambiarli in una delle due con `q` e `d`)
- SE LA SOLUZIONE IMPOSSIBILE allora possono essere
	- **parallele** → se i vettori direttori sono proporzionali
		- $v_{1} = kv_{2}$ -> metti a sistema e trovi il valore di `k`
			- se hai soluzione uguale per tutti sono parallele
	- **sghembe** → se i vettori direttori non sono proporzionali (sistema impossibile)
- SE HAI UNA SOLA SOLUZIONE 
	- **incidenti** 
- SE HAI INFINITE SOLUZIONI
	- **coincidenti**
- complanarità di due rette
	- **parallele** → sono complanari
	- **incidenti** → sono complanari
	- **sghembe** → non sono complanari
	- **coincidenti** → sono complanari
###### Retta ortogonale rispetto a r1 e r2
- trovi i vettori direttori delle rette
- costruisci il piano con i due vettori direttori
	- ti fai la cartesiana
	- prendi i coefficienti della cartesiana e rappresentano il vettore normale
- la retta ortogonale è passante per punto incidente e vettori direttori come il vettore normale del piano
###### retta di 2 punti
Sappiamo che una retta è formata da $P_{0} + t \cdot v$
Il vettore direttore `v` è dato dalla differente dei due punti dati $v = P_{1} - P_{0}$
Una volta trovato il direttore scrivi il sistema sostituendo i valori che hai

###### Punto appartiene a piano o retta
- Sostituisci alla cartesiana il punto e vedi se da un risultato corretto
###### Eq retta passante per un punto e ortogonale a un piano
- metti come origine il punto e come vettori direttori il normale del piano ovvero i coefficienti della cartesiana
###### Retta r interseca il piano
- sostituisci i valori della parametrica nella cartesiana del piano
- trovi il valore di t
- sostituisci t alla parametrica della retta, se ha soluzione in un punto allora interseca
- metti a sistema le 2 cartesiane
###### Cramer
![[Screenshot 2026-02-05 103810.png|284]]

###### Rouche-capelli
- Scrivi matrice **estesa**
- Trova il rango con Gauss
- Confronta: `rango A` e `rango A|b`
    - ranghi diversi → **incompatibile**
        - ranghi uguali = n → **unica**
        - ranghi uguali < n → **infinite

### VETTORI E MATRICI
###### Trovare per quali valori di k insieme S è un sottospazio
- svolgi il sistema lineare
- definisci per quali k il sistema è omogeneo
	- ti calcoli i vettori per tutti i k
- S= insieme con quei vettori 
###### Trovare base di V=span di vettori
- metti i vettori in colonna
	- calcoli il rango
	- i pivot colonna sono i vettori dell'insieme base
###### Vettori linearmente indipendenti
- metti i vettori in colonna
	- applichi Gauss
	- se rango=max sono linearmente indipendenti
- rango max=min(righe, colonne)
- det diverso 0 rango max quindi lin ind
###### Trovare una base con spazio maggiore
- aggiungi vettori canonici a quelli originali
- poi scrivi la base come insieme di quei vettori
#### APPLICAZIONI LINEARI
###### Verificare se una applicazione è lineare
un sistema e lineare se e solo se è queste due cose
- verifichiamo omogeneità
	- prendi un vettore e verifichi questo
	- $T(\lambda u)=\lambda T(u)$
- verifichiamo additività
	- prendi due vettori e verifichi questo
	- $f(u+v)=f(u)+f(v)$
###### Nucleo Immagine e dimensioni
- se è una applicazione lineare rendila matrice prendendo i coefficienti associata alle basi canoniche
- per trovare l'immagine fai gauss
	- i vettori originali dei pivot sono vettori dell'insieme immagine con span
	- dim Immagine= rango
- dimensione nucleo=colonne-rango
- il ker lo trovi svolgendo il sistema della matrice  post gauss
	- trovi il vettore con i vari parametri corrispondenti 
	- sarà poi insieme con span
###### Vettore appartiene a immagine?
- svolgi il sistema ponendo
- $A*(x,y,z)=v$
	- se il sistema è compatibile allora il vettore appartiene all'immagine
###### INIETTIVA SURIETTIVA INVERTIBILE
se la matrice è quadrata vale
$$\boxed{ A \text{ invertibile} \Longleftrightarrow \det(A)\neq 0 \Longleftrightarrow \operatorname{rg}(A)=n \Longleftrightarrow \ker(A)=\{0\}  }$$
$$\boxed{\Longleftrightarrow L_A \text{ iniettiva} \Longleftrightarrow L_A \text{ suriettiva}}$$
se la matrice è rettangolare
- suriettiva
	- Dim(IMMAGINE)=numero colonne
- iniettiva
	- Ker=dim 0
###### composto tra funzioni
- f composto g diventa il prodotto delle matrici f e g
- g composto f allora era prodotto tra g e f
###### LA invertibile?
- se il determinante è diverso da 0 è invertibile
- $det(A*B)=det(A)*det(B)$
Vale che $f \ \text{invertibile} \iff A \  \text{invertibile}$
- isomorfismo=inversa
###### f(span(v1,v2))
- trova A della funzione
- fai $A*v1$ e $v2$ 
- f(span(v1,v2))= span insieme dei vettori risultato
- trova la cartesiana dei due vettori come parametri
- e scrivi f(span(v,2))= insieme (x,y,z) in Reali: cartesiana=0 chiudi insieme
### DETERMINANTE E INVERSA 
- se la matrice è quadrata
	- det=0 rango <= max-1
	- det!=0 rango=max
	- per trovare il rango prendi una sottomatrice e trova det!=0
- Inversa -> solo se $\det(A) \neq 0$
- Calcolo la matrice dei cofattori (CAMBIA SEGNO AI DISPARI):
    - per ogni elemento elimino la sua riga e la sua colonna;
        - calcolo il determinante della sottomatrice rimasta;
- Faccio la trasposta della matrice dei cofattori:
    - le righe diventano colonne;
        - le colonne diventano righe.
- Divido tutto per $det(A)$ (puoi metterlo anche fuori dalla matrice).

- $A \times A^{-1} = I$

### AUTOVALORI AUTOVETTORI AUTOSPAZI
- AUTOVALORI
    - calcoli il polinomio caratteristico $p_{A}(\lambda) = det(A − λI)$
        - `λ` sono gli autovalori -> in base a quante volte compaiono abbiamo una `ma`
- AUTOVETTORE
    - per ogni `λ` fai il sistema $(A − λI)x = 0$ -> sostituisci `λ` e fai sistema ``
- AUTOSPAZIO
    - insieme di tutti gli autovettori associati a un autovalore -> $E_{\lambda} = span{VETTORI}$
    - `mg` numero di vettori del singolo autospazio 
###### DIAGONALIZZAZIONE
per ogni lambda
SE tutti i lambda $\sum m_{a} = \sum m_g$ -> diagonalizzabile 
- sapendo che $m_{g} \le m_{a}$ per ogni autovalore
- sapendo che $\sum m_{a} = n$

###### MATRICE DIAGONALE D e P
P è la matrice diagonalizzante
- prendi gli autovettori degli autospazi e li metti in colonna
D è la matrice diagonale
- Una matrice diagonalizzata di $A$ è una matrice diagonale simile ad $A$, i cui elementi diagonali sono gli autovalori di $A$.
$D=P^{-1} \times A \times P$

