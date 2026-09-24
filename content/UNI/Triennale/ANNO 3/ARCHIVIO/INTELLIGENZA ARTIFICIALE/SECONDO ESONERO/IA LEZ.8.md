## la logica del primo ordine
La logica del primo ordine permette di descrivere un mondo tramite **oggetti**, **proprietà**, **relazioni** e **funzioni**.  
Prima si definisce la **concettualizzazione**, cioè di quali elementi vogliamo parlare; questi formano il **dominio del discorso** (finito o infinito).
- **Funzioni:** associano oggetti ad altri oggetti (es. `Madre(Pietro)`).
- **Proprietà (predicati unari):** descrivono caratteristiche di un oggetto (es. `Simpatica(x)`).
- **Relazioni (predicati n-ari):** collegano più oggetti (es. `Amico(Pietro, Paolo)`).
La FOL consente di rappresentare strutture più ricche rispetto alla logica proposizionale, permettendo inferenze più complesse.

#### Esempio del mondo dei blocchi
![[Pasted image 20251126195647.png]]
- Il **dominio** 
	- è l’insieme degli oggetti del mondo:
		- **{a, b, c, d, e}**  
- Funzioni 
	- servono a **ricavare un oggetto da un altro oggetto**.
		- La funzione data è:
			- **Hat(x) = blocco che sta sopra x**
- Relazioni
	- servono a descrivere **come stanno tra loro gli oggetti**.
		- **On(x, y)**
			- Significa “x è sopra y”.
		- **Clear(x)**
			- I blocchi che **non hanno nulla sopra**
		 - **Table(x)**
			- I blocchi che poggiano **direttamente sul tavolo**:
		- **Block(x)**
			- L’insieme di tutti i blocchi del mondo:  
				- → **Block = {a, b, c, d, e}**
- Le concettualizzazioni possibili sono infinite: un aspetto importante è il livello di astrazione giusto per gli scopi della rappresentazione.
### Simboli e interpretazioni
![[Pasted image 20251126200116.png]]
>[!hint]- differenze tra Predicato, Funzione, Relazione
> - **Funzione:** prende uno o più oggetti e restituisce **un oggetto**.  
>     Es.: `Madre(x)` → la madre di x.
> - **Predicato (proprietà):** prende un oggetto e restituisce **vero/falso**.  
>     Es.: `Rosso(x)`.
> - **Relazione:** predicato con arità ≥ 2; collega più oggetti e restituisce **vero/falso**.  
>     Es.: `Amico(x, y)`.

### I termini
Un termine è un’espressione logica che si riferisce a un oggetto. 
Un termine può essere: Termine ⇒ Costante | Variabile | Funzione (Termine, …) 
(un numero di termini pari alla arità della funzione 
esempi di termini ben formati:
![[Pasted image 20251126200956.png]]

### Formule
Ci sono 2 tipi di formule
- Formula-atomica ⇒ True | False | Termine = Termine | Predicato (Termine, …) 
- Formula-complessa ⇒ Formula-atomica | Formula Connettivo Formula | Quantificatore Variabile Formula | not-Formula | (Formula) 
![[Pasted image 20251126201314.png|400]]

### Quantificatori
![[Pasted image 20251126201440.png]]
- **Ordine dei quantificatori**
	- È fondamentale:
		- `∀x ∃y Ama(x,y)` → _tutti amano qualcuno_
		- `∃x ∀y Ama(x,y)` → _esiste qualcuno amato da tutti_
 - **Variabili libere e legate**
	- Una variabile è **legata** se appare dentro l’ambito di un quantificatore.
	- È **libera** se non è legata da alcun quantificatore.
		- Esempi:
			- `Mela(x) ⇒ Rossa(x)` → x **libera**
			- `∀x (Mela(x) ⇒ Rossa(x))` → x **legata**
			- `Mela(x) ⇒ ∃x Rossa(x)` → la prima x è **libera**, la seconda **legata**.
		- **Formula chiusa e formula ground**
			- **Chiusa:** nessuna variabile libera.
			- **Aperta:** contiene variabili libere.
			- **Ground:** nessuna variabile (solo costanti/termini completamente istanziati).
### Precedenza operatori
`= > ¬ > ∧ > ∨ > ⇒, ⇔ > ∃,∀.`
### Semantica dichiarativa
Definisce come il linguaggio logico “aggancia” il mondo.  
Stabilisce una corrispondenza tra:
- **termini ↔ oggetti del dominio**
- **formule chiuse ↔ valori di verità**
![[Pasted image 20251126202055.png]]
### Interpretazione (I)
Una interpretazione assegna significato ai simboli del linguaggio:
- **Costanti → elementi del dominio**  
    (es. `Pietro` ↦ una persona reale)
- **Funzioni → funzioni da Dⁿ a D**  
    (es. `Madre(x)` ↦ funzione che restituisce un oggetto del dominio)
- **Predicati → insiemi di n-uple di D**  
    (es. `Fratello(x,y)` ↦ insieme delle coppie “(x è fratello di y)” vere nel mondo)
Interpretazione = collegamento preciso tra linguaggio e concettualizzazione.
### Semantica composizionale
Il significato di una formula complessa deriva dal significato delle sue parti:
- `Sorella(Madre(Pietro))`  
    → si valuta prima `Madre(Pietro)`, poi `Sorella(…)`.
### Quantificatore universale (∀) – Semantica
- `∀x A(x)` è **vera** se A(x) è vero per _ogni_ elemento del dominio.
- In dominio finito = grande **∧**:  
    `∀x Mortale(x)` ↦ `Mortale(Gino) ∧ Mortale(Pippo) ∧ …`
- Si usa quasi sempre con `⇒`:  
    `∀x Persona(x) ⇒ Mortale(x)`
### Quantificatore esistenziale (∃) – Semantica
- `∃x A(x)` è **vera** se esiste _almeno un_ elemento per cui A(x) è vera.
- In dominio finito = grande **∨**:  
    `∃x Persona(x)` ↦ `Persona(Gino) ∨ Persona(Pippo) ∨ …`
- Si usa tipicamente con `∧`:  
    `∃x (Persona(x) ∧ Speciale(x))`
### Relazione tra ∀ ed ∃ (leggi di De Morgan per i quantificatori)
- `∀x ¬P(x) ≡ ¬∃x P(x)`
- `¬∀x P(x) ≡ ∃x ¬P(x)`
- `∀x P(x) ≡ ¬∃x ¬P(x)`
- `¬∀x ¬P(x) ≡ ∃x P(x)`
(sono perfettamente simmetriche)
Connettivi (richiamo):
- `¬(P ∧ Q) ≡ (¬P ∨ ¬Q)`
- `¬(P ∨ Q) ≡ (¬P ∧ ¬Q)`
- `P ∧ Q ≡ ¬(¬P ∨ ¬Q)`
- `P ∨ Q ≡ ¬(¬P ∧ ¬Q)`
### Usare la logica del primo ordine
- Le **variabili** denotano solo **oggetti** del dominio.
- Non possono denotare: predicati, funzioni o formule.
- Funzioni e predicati possono appartenere al dominio come oggetti, ma **non** possono essere usati _come_ simboli di funzione/predicato.
### Tell e Ask (asserzioni e query)
**Tell(KB, …)**
Aggiunge formule alla base di conoscenza.  
Esempi:
- `Tell(KB, Re(Giovanni))`
- `Tell(KB, Persona(Riccardo))`
- `Tell(KB, ∀x (Re(x) ⇒ Persona(x)))`
**Ask(KB, …)**
Interroga la base di conoscenza.  
Esempio:
- `Ask(KB, Re(Giovanni))`  
    → Risposta possibile: `{x/Giovanni}`, `{x/Riccardo}` (legami che soddisfano la query).

### Inferenza FOL vs proposizionale
- La FOL può essere ridotta (parzialmente) a inferenza proposizionale.
- Serve per eliminare i quantificatori tramite istanziazione.
### Regole di inferenza sui quantificatori

### Istanziazione universale (∀-eliminazione)
Serve per **togliere il quantificatore ∀**.
Regola:
Da: `∀x A(x)`  
ricavi: `A(g)` per **qualsiasi termine ground** g (costante o funzione senza variabili).
Esempio:
`∀x King(x) ∧ Greedy(x) ⇒ Evil(x)`
Puoi scegliere qualsiasi g:
- g = John → `King(John) ∧ Greedy(John) ⇒ Evil(John)`
- g = Father(John) → `King(Father(John)) ∧ Greedy(Father(John)) ⇒ Evil(Father(John))`
Serve per creare **istanze concrete** della regola generale.
### Istanziazione esistenziale (∃-eliminazione)
Serve per **togliere il quantificatore ∃**, ma devi introdurre nuovi simboli di Skolem.
##### Caso 1: non dipende da ∀
Usi **una costante nuova k**:
`∃x Padre(x, G)`  
→ `Padre(k, G)`
(“esiste qualcuno che è padre di G”: lo chiamiamo semplicemente k)
##### Caso 2: dipende da una variabile ∀
Usi una **funzione di Skolem p(x)**:
`∀x ∃y Padre(y, x)`  
→ `∀x Padre(p(x), x)`
perché **l’esistenza di y dipende da x**.  
Quindi y = qualche funzione di x (p(x)), non una costante fissa.

### Proposizionalizzazione
Procedura:
1. Istanziare le formule ∀ con tutte le costanti note.
2. Sostituire ∃ con costanti/funzioni di Skolem.
3. Ottenuto ciò, la KB diventa proposizionale.
**Problema:**  
se ci sono funzioni → numero di istanze potenzialmente **infinito**  
(es. `John`, `Padre(John)`, `Padre(Padre(John))`, …)
### Teorema di Herbrand
Serve a gestire il problema dell’infinito numero di istanze generabili.
Se `KB |= A`, allora esiste una dimostrazione che usa **solo un sottoinsieme finito** delle istanze generate.
Procedura incrementale:
1. istanze con costanti
2. poi un livello di annidamento
3. poi due livelli …
Se `KB ⊭ A`, il processo **non termina** → inferenza FOL è **semidecidibile**.
Quindi:
- Anche se le istanze possibili sono infinite…
- …ne basta **un sottoinsieme finito** per provare A.
### Clausole e forma a clausole
- Una **clausola** è un insieme di **letterali**, interpretati come una disgiunzione.  
    Esempio: `{¬P, Q, R}` ≡ `¬P ∨ Q ∨ R`.
- Una **KB in FOL** = insieme di clausole.
### Forma normale implicativa (intuitiva):
È un **modo standard di scrivere le clausole** della logica del primo ordine.
La forma è:
`P₁ ∧ … ∧ Pk ⇒ Q₁ ∨ … ∨ Qn`
Interpretazione:
- a sinistra (**premesse**) ci sono **predicati veri tutti insieme**
- a destra (**conclusioni**) ci sono **uno o più predicati veri**
Esempi:
- `Umano(x) ∧ Mortale(x) ⇒ VaInParadiso(x)`
- `Padre(x,y) ∧ Ricco(x) ⇒ Ricco(y)`
Caso particolare: **un solo letterale positivo**
`P₁ ∧ … ∧ Pk ⇒ Q`
- Questa è la **forma tipica delle regole** (“se … allora …”) 
### Unificazione
L’**unificazione** è l’operazione che stabilisce se **due espressioni del linguaggio FOL** 
possono essere rese **identiche** applicando una **sostituzione alle variabili**.
In pratica:
- confronta due strutture logiche
- cerca di “farle combaciare”
- assegnando valori (termini) alle variabili
Se esiste almeno una sostituzione che rende le due espressioni uguali →  
le espressioni sono **unificabili**.
Se no → risultato = **FAIL**.
Esempio semplice:  
`P(x, A)` e `P(B, A)`  
→ unificazione possibile: `{x/B}`.
### Sostituzione
Una **sostituzione** σ è un insieme finito di coppie:
`{ variabile / termine }`
dove:
- a sinistra c’è **sempre una variabile**
- a destra un **termine** (costante, variabile o funzione)
- ogni variabile compare una sola volta nella sostituzione
Esempi:
1. `{x/A, y/f(x3), z/B}`  
    significa che in qualunque espressione:
    - x diventa A
    - y diventa f(x3)
    - z diventa B
2. `{x/g(y), y/z, z/f(x)}`  
    è una sostituzione più complessa con funzioni.
**Nota importante:**  
Le sostituzioni si applicano **simultaneamente**, non una alla volta.
### Espressioni unificabili
Due espressioni sono unificabili se **esiste una sostituzione** che le rende uguali.
Esempio:
`P(A, y, z)`  
`P(x, B, z)`
Possibile sostituzione:
τ = `{x/A, y/B, z/C}`
τ è un **unificatore**, ma non l’unico.

### MGU – Most General Unifier
È l’unificatore **più generale possibile**, cioè quello che:
- usa la **minima quantità di sostituzioni**
- permette di derivare tutte le altre sostituzioni più specifiche
l'MGU è fondamentale perché:
- è **unico** (a meno di rinominare variabili)
- è ciò che usa l’algoritmo di **risoluzione** per effettuare un’inferenza
Esempio:
Per unificare:
`P(x, B)`  
`P(A, y)`

MGU = `{x/A, y/B}`  
(se invece specificassi anche altre sostituzioni non necessarie, sarebbero versioni più specifiche).

Se hai due sostituzioni σ e τ, la loro composizione στ significa:
- applicare prima τ
- poi applicare σ al risultato
- e unire il tutto in una nuova sostituzione
### ALGORITMO DI UNIFICAZIONE
L’obiettivo è ottenere l’**MGU** (unificatore più generale) o **FAIL**.

1️⃣ Scomposizione
Se hanno lo **stesso simbolo di funzione** e **stessa arità**:
$f(s_1,\dots,s_n) = f(t_1,\dots,t_n)$
→ genera le equazioni elementari:
$s_1=t_1,\dots,s_n=t_n$

2️⃣ Incompatibilità strutturale → FAIL
Se:
- simboli di funzione diversi:  
    `f(...) = g(...)`
- arità diverse
- **due costanti diverse**
→ **FAIL**

3️⃣ Identità
$x = x$
→ elimina l’equazione.

4️⃣ Normalizzazione
$t = x \quad \Rightarrow \quad x = t$
(Metti la variabile a sinistra.)
5️⃣ Sostituzione valida
Se:
$x = t \quad \text{e x NON compare in t}$
→ accetta la sostituzione `{x/t}`  
→ applicala a **tutte** le altre equazioni.
Questo costruisce progressivamente l’MGU.

6️⃣ Occur-check → FAIL
Se:
$x = t \quad \text{e x compare in t}$
→ **FAIL** (evita ricorsione infinita: es. `x = f(x)`).
Ecco una **spiegazione chiara, ordinata e compatta** del testo che hai riportato, così puoi davvero capirlo e usarlo per l’esame.
### RISOLUZIONE NELLA LOGICA DEL PRIMO ORDINE
La risoluzione nella FOL è una regola inferenziale che funziona sulle **clausole** (CNF). 
Serve per derivare nuove clausole eliminando una coppia di **letterali complementari** unificabili.

1️⃣ Prima cosa: portare tutto in Forma Normale Congiuntiva (CNF)
Per applicare la risoluzione bisogna che tutte le formule della KB siano:
- senza implicazioni
- negazioni solo davanti ai predicati
- senza quantificatori esistenziali (skolemizzazione)
- con quantificatori universali implicitamente rimossi
- espresse come congiunzione di disgiunzioni di letterali → **clausole**
Solo a questo punto la risoluzione è applicabile.

2️⃣ Regola di risoluzione (FOL)
Date due clausole:
- Φ che contiene un letterale **A**
- Ψ che contiene **¬B**
Se **A e B sono unificabili** con il loro **MGU γ**, allora il risolvente è:
$((\Phi \setminus {A}) \cup (\Psi \setminus {\neg B}))\gamma$
In parole semplici:
1. Elimini A e ¬B (sono complementari).
2. Unisci il resto delle due clausole.
3. Applichi l’unificatore MGU a tutto.
4. Ottieni una nuova clausola.
Se la nuova clausola è `{ }` → contraddizione → fine della prova.
- In logica **due letterali sono complementari** quando:
- 👉 **uno è la negazione dell’altro**, cioè hanno **lo stesso predicato** e **stessi argomenti**, ma **uno è positivo e l’altro è negativo**.

3️⃣ Clausole che si possono “semplificare”: Fattori
A volte una clausola contiene **più letterali unificabili tra loro**, ad esempio:
- `{P(x), P(y), Q(z)}`
Qui `P(x)` e `P(y)` sono unificabili.
La clausola **fattore** è quella semplificata:
- fattore di `{P(x), P(y), Q(z)}` → `{P(x), Q(z)}`
Il metodo di risoluzione deve applicarsi **ai fattori**, non alle clausole originali non semplificate.
Questo evita duplicazioni inutili e produce dimostrazioni corrette.

4️⃣ Correttezza della risoluzione
La risoluzione è **corretta**, cioè tutto ciò che deriva è semanticamente valido.
$T \vdash_{\text{RES}} A \quad \Rightarrow \quad T \models A$
Quindi non produce mai falsi positivi.

5️⃣ Incompletezza della deduzione diretta
La risoluzione **non è completa** se usata solo “in avanti” per derivare A da T:
$T \models A \quad \text{ma può accadere che} \quad T \not\vdash_{\text{RES}} A$
Cioè: A è una vera conseguenza logica, ma la risoluzione non lo trova.
(La causa: serve una strategia più robusta.)

6️⃣ Teorema di refutazione — La soluzione per la completezza
Il teorema dice:
$T \models A  \quad \text{sse} \quad  T \cup {\neg A} \ \text{è insoddisfacibile}$
cioè:
👉 Per dimostrare A, dimostra che T ∪ {¬A} porta a contraddizione.
E poiché la risoluzione è completa **per la refutazione**, abbiamo:
- Se T ∪ {¬A} è insoddisfacibile  
    → la risoluzione garantisce che produrrà la clausola vuota `{ }`.

7️⃣ Metodo completo: Risoluzione per refutazione
Procedura:
1. Prendi T (KB).
2. Aggiungi **¬A** (la negazione di ciò che vuoi provare).
3. Converti tutto in clausole (CNF).
4. Applica la risoluzione finché:
    - **ottieni `{ }`** → A è vero
    - oppure la procedura continua per sempre → A non è conseguenza di T
