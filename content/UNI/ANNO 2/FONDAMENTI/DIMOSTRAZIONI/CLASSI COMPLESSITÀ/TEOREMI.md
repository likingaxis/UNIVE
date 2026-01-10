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
Definizione 6.1: Una funzione totale calcolabile f : N → N `e time-constructible se esiste una macchina di Turing T
di tipo trasduttore che, preso in input un intero n espresso in notazione unaria (ossia, come sequenza di n ‘1’), scrive
sul nastro output il valore f (n) in unario e impiega  dtime(T, n) ∈ O( f (n)), lo stesso tempo del risultato f(n) .

Definizione 6.2: Una funzione totale calcolabile f : N → N `e space-constructible se esiste una macchina di Turing T
di tipo trasduttore che, preso in input il valore n espresso in notazione unaria, scrive sul nastro output il valore f (n) in
unario e dspace(T, n) ∈ O( f (n)).

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
		- $L \in DTIME(2^{O(f(n))}).$
