#### MISURA DI COMPLESSITÀ
è una funzione che associa ad ogni macchina di Turing un valore numerico che corrisponde al costo

#### ASSIOMI DI BLOOM
- una funzione è considerata valida dagli assiomi di Blum:
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

>[!tip] Teorema 6.2
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
Se $coNP \neq NP$, allora $P 6 \neq NP$
- dimostrazione in realtà questa è la seconda congettura e non si sanno risposte effettive

### Teorema 6.24
La classe $coNP$ è chiusa rispetto alla riducibilità polinomiale.
- dimostrazione come 6.22
- se so che $L\in NP \iff L^c \in NP$ 
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
