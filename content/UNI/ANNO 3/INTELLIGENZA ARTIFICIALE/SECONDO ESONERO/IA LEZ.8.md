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
# **Usare la logica del primo ordine**

- Le **variabili** denotano solo **oggetti** del dominio.
    
- Non possono denotare: predicati, funzioni o formule.
    
- Funzioni e predicati possono appartenere al dominio come oggetti, ma **non** possono essere usati _come_ simboli di funzione/predicato.
    

---

# **Tell e Ask (asserzioni e query)**

### **Tell(KB, …)**

Aggiunge formule alla base di conoscenza.  
Esempi:

- `Tell(KB, Re(Giovanni))`
    
- `Tell(KB, Persona(Riccardo))`
    
- `Tell(KB, ∀x (Re(x) ⇒ Persona(x)))`
    

### **Ask(KB, …)**

Interroga la base di conoscenza.  
Esempio:

- `Ask(KB, Re(Giovanni))`  
    → Risposta possibile: `{x/Giovanni}`, `{x/Riccardo}` (legami che soddisfano la query).