##### TEORIA
###### Vettori e regola del parallelogramma
Un vettore può essere visto come un segmento orientato oppure come una colonna di coordinate.
La somma di due vettori si calcola componente per componente.
Geometricamente, la somma di due vettori si rappresenta con la **regola del parallelogramma**: dati due vettori applicati nello stesso punto, la loro somma è la diagonale del parallelogramma costruito sui due vettori.
Il prodotto di un vettore per uno scalare modifica lunghezza e verso:
- se $\lambda>0$, stesso verso;
- se $\lambda<0$, verso opposto;
- se $\lambda=0$, vettore nullo.
###### Prodotto matrice-vettore
Se:
$$A\in M_{m,n}(\mathbb R), \qquad x\in \mathbb R^n$$
allora:
$$Ax\in \mathbb R^m$$
Il prodotto matrice-vettore si fa riga per colonna.
Interpretazione importante:
$$Ax$$
è una combinazione lineare delle colonne di $A$, con coefficienti dati dalle componenti di $x$.
###### Prodotto tra matrici
Se:
$$A\in M_{m,n}(\mathbb R), \qquad B\in M_{n,p}(\mathbb R)$$
allora il prodotto $AB$ è definito e:
$$AB\in M_{m,p}(\mathbb R)$$
Il prodotto si fa riga per colonna.
In generale:
$$AB\neq BA$$
e a volte $BA$ può anche non essere definito.
###### Sottospazio vettoriale
Un sottoinsieme $W\subseteq V$ è un sottospazio vettoriale se:
- contiene il vettore nullo;
- è chiuso rispetto alla somma;
- è chiuso rispetto al prodotto per scalare.
In formula:
$$u,v\in W \Rightarrow u+v\in W$$
$$\lambda\in\mathbb R,\ v\in W \Rightarrow \lambda v\in W$$
Una retta o un piano sono sottospazi solo se passano per l’origine.
###### Span
Lo span di alcuni vettori è l’insieme di tutte le loro combinazioni lineari:
$$\operatorname{Span}(v_1,\dots,v_k)={\alpha_1v_1+\dots+\alpha_kv_k:\alpha_i\in\mathbb R}$$

Lo span è sempre un sottospazio vettoriale.
###### Base
Una base di uno spazio vettoriale $V$ è un insieme di vettori che:
- genera $V$;
- è linearmente indipendente.
Quindi:
$$B={v_1,\dots,v_n}$$
è una base di $V$ se:
$$V=\operatorname{Span}(v_1,\dots,v_n)$$
e i vettori sono linearmente indipendenti.
###### Dimensione
La dimensione di uno spazio vettoriale è il numero di vettori di una sua base.
$$\dim \mathbb R^n=n$$
La dimensione dello spazio nullo è:
$$\dim{0}=0$$
La base dello spazio nullo ${0}$ è l’insieme vuoto.
###### Sistema lineare e sistema omogeneo
Un sistema lineare si scrive:
$$Ax=b$$
dove:
- $A$ è la matrice dei coefficienti;
- $x$ è il vettore delle incognite;
- $b$ è il vettore dei termini noti.
Un sistema è compatibile se ammette almeno una soluzione.
Un sistema è omogeneo se:
$$Ax=0$$
Ogni sistema omogeneo ha sempre almeno la soluzione nulla.
###### Nucleo e immagine come sottospazi
Se $T:V\to W$ è lineare, allora:
$$\ker T\subseteq V$$
è un sottospazio del dominio.
Inoltre:
$$\operatorname{Im}T\subseteq W$$
è un sottospazio del codominio.
Il nucleo contiene sempre il vettore nullo, quindi non è mai vuoto.
###### Teorema rango-nullità
Per una applicazione lineare:
$$T:V\to W$$
vale:
$$\dim V=\dim(\ker T)+\dim(\operatorname{Im}T)$$
Nel caso matriciale, se:
$$A\in M_{m,n}$$
allora:
$$n=\dim(\ker A)+\operatorname{rg}(A)$$
dove $n$ è il numero di colonne, cioè la dimensione del dominio.
###### Determinante: proprietà teoriche utili
Il determinante è definito solo per matrici quadrate.
Se una riga o una colonna è nulla, allora:
$$\det A=0$$
Se due righe o due colonne sono uguali o proporzionali, allora:
$$\det A=0$$
Scambiare due righe cambia il segno del determinante.
Moltiplicare una riga per $\lambda$ moltiplica il determinante per $\lambda$.
Aggiungere a una riga un multiplo di un’altra riga non cambia il determinante.
Vale:
$$\det(A^T)=\det(A)$$
$$\det(AB)=\det(A)\det(B)$$
###### Forma cartesiana del piano
La forma cartesiana di un piano è:
$$ax+by+cz+d=0$$
Il vettore:
$$(a,b,c)$$
è normale al piano.
###### Autospazio: precisazione teorica
L’autospazio associato a un autovalore $\lambda$ è:
$$E_\lambda=\ker(A-\lambda I)$$
L’autospazio contiene anche il vettore nullo.
Il vettore nullo però non è un autovettore.
Quindi gli autovettori sono i vettori non nulli dell’autospazio.
###### Diagonalizzabilità: definizione teorica
Una matrice quadrata $A$ è diagonalizzabile se esiste una base formata da autovettori di $A$.

Equivalentemente, $A$ è diagonalizzabile se si riescono a trovare $n$ autovettori linearmente indipendenti.

Se $A$ è diagonalizzabile, allora è simile a una matrice diagonale:

$$D=P^{-1}AP$$

dove $P$ contiene gli autovettori in colonna e $D$ contiene gli autovalori sulla diagonale.
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
$$A\in M_{m,n}$$
e quindi:
$$L_A:\mathbb R^n\to\mathbb R^m$$
allora:
$$L_A \text{ iniettiva} \iff \operatorname{rg}(A)=n$$
cioè rango uguale al numero di colonne.
Invece:
$$L_A \text{ suriettiva} \iff \operatorname{rg}(A)=m$$
cioè rango uguale al numero di righe.
###### composto tra funzioni
- $f \ o \ g \Rightarrow f(g(x)) \Rightarrow f(x) \cdot g(x)$
###### LA invertibile?
- se $\det(A) \neq 0$ -> invertibile
- $det(A*B)=det(A)*det(B)$
Vale che $f \ \text{invertibile} \iff A \  \text{invertibile}$
- isomorfismo=inversa
###### f(span(v1,v2))
- $f(span\{v,w\}) = span\{f(v), f(w)\}$
	- trova A della funzione
		- fai $Av$ e poi $Aw$ e metti i risultati al posto di $f(v)$ e $f(w)$
- PARAMETRICA -> $(x,y,z) = t(Av) + s(Aw)$
- CARTESIANA -> te la ricavi da parametrica
### DETERMINANTE E INVERSA 
- se la matrice è quadrata
	- se $\det(A) = 0$ -> rango $\leq max-1$
	- se $det(A) \neq 0$ -> rango $= max$ 
	- per trovare il rango prendi una sottomatrice e trova $det(A) \neq 0$
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

