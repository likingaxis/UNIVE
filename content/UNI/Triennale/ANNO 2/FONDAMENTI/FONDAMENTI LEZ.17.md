## $G2 \ e \ G1$ sono con una inclusione propria o impropria?
per rispondere a questa domanda intanto precisiamo cosa significa inclusione propria o impropria, giusto per ripassare
- impropria $\subseteq$
	- ho due insiemi che sono uno contenuto nell'altro ma possono essere anche uguali
	- $A=\{1,2\}$ e $B=\{1,2\}$ allora $A⊆B$
- propria $\subset$ 
	- semplicemente sono uno contenuto nell'altra ma non sono uguali
	- $A=\{1\}$ e $B=\{1,2\}$  $A\subset B$ 

Quindi ora continuiamo con la domanda
$G2 \subseteq G1$?
oppure
$G2\subset G1$?

Sicuramente sappiamo che
$$G_{2} \subset G_{1}$$
ora bisogna solo capire se è propria o meno 

## Per risolverlo ci aiuta il Pumping lemma

>[!lemma] Pumping Lemma
>Per ogni linguaggio $L \in G_{2}$ esiste una costante (che dipende esclusivamente dal linguaggio L), definita come $p_{L} > 0$ (di tipo intero) tale che per ogni parola $z \in L$ se $|z| \ge p_{L}$ allora esistono 5 parole
>- `u`
>- `v`
>- `w`
>- `x`
>- `y`
>tali che
>1. `z = u v w x y` (ossia z puoi scriverlo come concatenazione delle cinque parole)
>2. `|v w x|` $\le p_{L}$
>3. `|v x|` $\ge 1$ ($v$ e $x$ NON POSSONO ESSERE ENTRAMBE VUOTE)
>4. $u \ v^{h} \ w \ x^{h} \ y$ è in L per ogni h ≥ 0.
>
>variano v e x perché le altre sono prese come parti fisse della parola

>[!tip]- Perché $P_L$ esiste? 
>![[Pasted image 20250412095720.png]]
##### Da qui viene usato il teorema di ***Bar-Hillel***
Definisce che i 4 punti visti prima sono sufficienti per formare un linguaggio context-free
- ma non lo rendono obbligatorio
- possono esistere linguaggi con quei 4 punti ma non essere comunque context-free
- perciò lo sfrutteremo al contrario per dimostrare quando un linguaggio non è context-free
### Applicazioni del lemma
$L= \{a^{n} b^{n} c^{n} : n > 0\} \in G_{1}$
Dimostriamo che NON APPARTIENE A G2

Se  $L \in G_{2}$ allora esiste un $P_{L} > 0$ per cui valgono le condizioni del lemma.
Posso ora scrivere $$z = a^{P_{L}} \ b^{P_{L}} \ c^{P_{L}} \in L$$che va bene, perché ha lo stesso esatto numero di `a, b, c`.

Proviamo ad applicare il teorema
Sappiamo che la lunghezza della sottostringa `|v w x|` deve essere lunga **AL MASSIMO** $p_{L}$
	Quindi non può attraversare tutte e tre le zone (`a, b e c`)
Questo vuol dire che la sottostringa `v w x` può rispettare SOLO UNA di queste condizioni
- sta tutta dentro `a`
- sta tutta dentro `b`
- sta tutta dentro `c`
- ha ALMENO un carattere di `a` (e di conseguenza nessuna `c`)
- ha ALMENO un carattere di `c` (e di conseguenza nessuna `a`)

Questo quindi vuol dire che se applico il lemma non potrò mai rispettare la condizione iniziale posta dal linguaggio e quindi ***L NON È CONTEXT-FREE***
**non è context-free** proprio perché serve **tenere traccia contemporaneamente** di **tre blocchi legati tra loro**:
- quanti a
- quanti b
- quanti c
e **tutti e tre** devono essere **uguali**.

>[!tip] CONCLUSIONE FINALE
>E quindi $G_{2} \subset G_{1}$ (non uguale)

>[!question]- perché le grammatiche context-free possono gestire una sola dipendenza per volta?
>![[Pasted image 20250413161421.png]]
>![[Pasted image 20250413161443.png]]


### Unione e Intersezione di due linguaggi context-free
Siano $L^{1}, L^{2} \in G_{2}$
###### UNIONE
>[!question] Possiamo dire che 
>$$L^{1} \cup L^{2} \in G_{2}$$

>[!example] Risposta: SI
>![[Pasted image 20250413161734.png]]
>semplicemente genera una grammatica con l'unione dei vari stati non terminali e terminali e le varie produzioni ecc...

###### INTERSEZIONE
>[!question] Possiamo dire che 
> $$L^{1} \cap L^{2} \in G_{2}$$


>[!example] Risposta: NON È DETTO
>![[Pasted image 20250413162543.png]]


 
### proprietà che si ritrovano sui 3 teoremi
Queste due proprietà sono riassunte nei seguenti teoremi
>[!lemma] TEOREMA G.7
> L’insieme dei linguaggi context-free **è chiusa rispetto all’unione**.
> 
> Nel senso che, se sono nell'insieme dei linguaggi context-free e eseguo l'unione, rimango in questo insieme.

>[!lemma] TEOREMA G.8
>L’insieme dei linguaggi context-free **non è chiusa rispetto all’intersezione**

>[!lemma] TEOREMA G.9
>L’insieme dei linguaggi context-free **non è chiusa rispetto al complemento**




# PDA
visto che $G_2 \subset G_1$ e che $G_1 \subset Decidibili$ allora anche $G_2$ lo è

Possiamo ora mostrare che, i linguaggi context-free sono decisi da un modello di calcolo *STRETTAMENTE MENO POTENTE* della MACCHINA DI Turing: ***L'automa a pila*** (PDA, PushDown Automata)
	*strettamente meno potente*: ossia, ogni PDA può essere simulato da una macchina di Turing, ma non viceversa
#### Come é strutturata?
Informalmente, un PDA consiste di
- un testone che decide
- due nastri SEMI INFINITI
	- $N_{1}$ = input (che utilizza l'ALFABETO $\Sigma$)
		questo è un **nastro di sola lettura** e la testina ad esso associata può muoversi **A DESTRA** o **RESTARE FERMA** (mai a sinistra) - in particolare, quando si arriva al $\square$ tutto a dx la testina rimane ferma
	
	- $N_{2}$ (che utilizza l'ALFABETO $\Gamma$(si legge gamma))
		questo nastro è chiamato PILA perché funziona letteralmente come le pile (LIFO).
		Ad inizio computazione verrà scritto sul nastro un carattere speciale di $\Gamma$, ossia $Z_{0}$
	
	I nastri, in qualsiasi momento, possono contenere sia una stringa vuota che non.

##### DEFINIZIONE 
La PDA è una **settupla** così composta$$<\Sigma, \ \Gamma, \ Q, \ q_{0}, \ Q_{F}, \ Z_{0}, \ \delta>$$Quindi
- due alfabeti ($\Sigma$ e $\Gamma$)
	Sono insiemi DIFFERENTI e quindi deve valere la regola $$\Sigma \ \cap \ \Gamma = \varnothing$$
- un insieme degli stati ($Q$)
- uno stato iniziale ($q_{0}$)
- un insieme di stati finali ($Q_{F}$)
- un simbolo iniziale che va scritto SOLO sul secondo nastro ($Z_{0}$)
- delle *funzioni di transizione* $\delta$ (che hanno lo stesso ruolo delle quintuple in una Macchina di Turing), definite come $$\delta: Q \times (\Sigma \ \cup \ \{\epsilon\}) \times \Gamma \ \rightarrow P{(Q \ \times \ (\Gamma^{+} \ \cup \{\epsilon\}))}$$
quindi prima della freccia abbiamo un input definito da:
cioè la funzione prende in input:

1. uno stato attuale q∈Q
    
2. **un simbolo dell’input** a∈Σ, oppure ε se vogliamo **muoverci senza leggere input**

3. **un simbolo dalla pila** X∈Γ
in output:
**un insieme di possibili coppie** (q′,γ)
- $q′∈Q$ **nuovo stato**
- $γ∈Γ^∗\cup \{ε\}$ **nuovo contenuto da mettere sulla pila**, che può anche essere vuoto

	dove $P$ è l'insieme delle parti e vuol dire $2^{QUALCOSA}$
	si intende l'insieme di tutti i sottoinsiemi di qualcosa con quel $2^x$

Osserviamo che, <font color="#b2a2c7">poiché l’azione da compiere deve essere scelta in un insieme</font>, quel che stiamo definendo è un **PDA non deterministico**

##### STATO (globale, ma non si dice) DI UN PDA
lo stato è la "fotografia" di un modello di calcolo che ci permette di capire tutto di quella determinata situazione
È una **tripla**$$<q, \ x, \ \gamma>$$dove
- $q \in Q$ e quindi specifica lo stato interno in cui si trova PDA
- $x \in \Sigma^{*}$ e quindi indica il contenuto del primo nastro
- $\gamma \in \Gamma^{*}$ e quindi indica il contenuto del secondo nastro

Nota come non è necessario specificare la posizione delle testine perché 
- la testina sul primo nastro è sempre posizionata sul carattere più a sinistra 
- la testina sul secondo nastro è sempre posizionata sul carattere più a destra (è una pila, quindi LIFO)

##### Esempio di transizione
Siano
- $a ∈ Σ$, 
- $Z ∈ Γ$ 
- $𝛾 ∈ Γ^{*}$ 
- $q_{1}, q_{2} ∈ Q$

Supponiamo che lo stato attuale del PDA sia questo $$(ax, \ \beta Z, \ q_{1})$$
- `ax` = input: il carattere su cui è posizionata la testina è `a` e il resto della parola è `x`
- `βZ` = pila: in cima alla pila c'è `Z`, sotto i restanti simboli sono `β`
-  `q₁` = stato attuale


Ora, il PDA sceglie una transizione del tipo $$(q_{2}, \ \gamma) \in \delta(q_{1}, \ a, \ Z)$$ossia: "_se sono nello stato `q₁` e leggo `a` (su N1) e `Z` (su N2), allora vado nello stato `q₂` e sostituisco `Z` con `γ` (che può anche essere vuoto)_."

Nel pratico, succede questo
- la testina sul primo nastro viene spostata di una posizione a destra dopo aver cancellato il carattere letto
- il carattere `Z` sulla pila viene cancellato e, se `𝛾 ≠ 𝜀` sulla pila viene scritta (un carattere per cella) la parola `𝛾` e la testina si posiziona sul carattere più a destra sul nastro pila
- PDA entra nello stato `q₂`

💡 Risultato finale:
Dopo la transizione, lo stato del PDA diventa: $$(x, \ \beta \ \gamma, \ q_2)$$
cioè:
- rimane da leggere `x` nell’input
- La pila ora è `βγ`
- Sei nello stato `q₂`

>[!example] La scelta però poteva anche essere questa
>$$(q_{2}, \ \gamma) \in \delta(q_{1}, \ \epsilon, \ Z)$$
>Questo perché magari l'input era una parola vuota.
>
>Qui semplicemente, da prima, cambia che
>- la testina sul primo nastro rimane ferma
>- il nuovo stato dell'automa è $(a \ x, \ 𝛽 \ 𝛾, \ q_{2})$

![[Pasted image 20250413170024.png]]
Da un determinato **input** (configurazione), possiamo avere **diversi output** (transizioni possibili)
###### ESEMPIO CON FOTO
![[Pasted image 20250413170355.png]]
qui in questa foto mi sa che c'è un errore perché anche nella scritta blu dovrebbe esserci solo B

>[!tip] OSSERVAZIONI
>La parola vuota `𝜀` ha un diverso significato a seconda se sia usata come <u>ARGOMENTO DELLA FUNZIONE DI TRANSIZIONE</u> oppure come <u>RISULTATO DELLA SUA APPLICAZIONE</u>.
>
>1. Quando `𝜀` compare come RISULTATO DELL'APPLICAZIONE DI `𝛿`, tipo $$(q_{2} ,𝜺) ∈ 𝛿(q_{1}, a, Z)$$vuol dire che il simbolo in cima alla pila viene **letteralmente cancellato** (e la testina si sposta a sx).
>
>2. Quando `𝜀` compare come ARGOMENTO DI `𝛿`, ad esempio $$𝜹(q_{1}, 𝜺, Z) = \{ ... \}$$ implica che qualunque transizione all'interno dell'insieme può essere eseguita ogni volta che il carattere `Z` si trova in cima alla pila, *INDIPENDENTEMENTE DA COSA VIENE LETTO SU N1* (e la testina su N1 rimane ferma).
>Le transizioni di tipo $𝜹(q_{1}, 𝜺, Z) = \{ ... \}$ sono dette $\epsilon-regole$
>
>ATTENZIONE: **NON ESISTONO TRANSIZIONI DELLA FORMA** $$𝛿(q_{1},\ \square, \ Z) = \{ ... \}$$ossia quando leggo blank su N1.
>E quindi, se `𝛿` non contiene $\epsilon-regole$ ->  la computazione termina una volta finito l'input
>Se ci sono, può andare avanti in modo indefinito.

Data l'ultima osservazione si dice che un linguaggio è **ACCETTATO** da un automa a pila, non è mai deciso.

### Due tipologie di accettazione
##### 1. Accettazione per stato finale
Una parola `x` **è accettata** se esiste una sequenza di transizioni che porta: $$\langle q_0, x, Z_0 \rangle \rightarrow^* \langle q_F, \varepsilon, \gamma \rangle$$
dove:    
- $q_{F} \in Q_{F}$​: uno **stato finale**
- $\varepsilon$: l’input è stato consumato
- $\gamma \in \Gamma^*$: **non importa cosa resta sulla pila**     

✅ Basta arrivare in uno stato finale, dopo aver letto tutta la parola, **indipendentemente dal contenuto della pila**.
📘 Il linguaggio accettato in questa modalità si indica con:$$L(\mathcal{M})$$
##### 2. Accettazione per pila vuota
Una parola `x` **è accettata** se esiste una sequenza di transizioni che porta: $$\langle q_0, x, Z_0 \rangle \rightarrow^* \langle q_F, \varepsilon, \varepsilon \rangle$$dove:
- $q \in Q$: **qualsiasi stato**, non necessariamente finale
- La pila è completamente vuota

✅ Qui l’importante è **svuotare completamente la pila**, dopo aver letto tutta la parola, **indipendentemente dallo stato finale**.

📕 Quando un linguaggio è **accettato da un PDA per pila vuota**, si indica con:$$N(\mathcal{M})$$

Queste due modalità son equivalenti e infatti vale il teorema
>[!lemma] TEOREMA G.10
>Per ogni linguaggio L, esiste un PDA M che accetta L per pila vuota se e soltanto se esiste un PDA M’ che accetta L per stato finale

Come conseguenza del precedente teorema, possiamo parlare di <font color="#b2a2c7">insieme dei linguaggi accettati da automi a pila</font> indipendentemente dalla modalità di accettazione.

Infine, il prossimo teorema mostra che tale insieme coincide con l’insieme dei  linguaggi context-free
>[!lemma] TEOREMA G.11
>Uun linguaggio L è context-free  se e soltanto se esiste un PDA M che accetta L.