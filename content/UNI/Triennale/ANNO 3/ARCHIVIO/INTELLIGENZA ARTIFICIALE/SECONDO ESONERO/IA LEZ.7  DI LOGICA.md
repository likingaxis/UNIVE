#### Equivalenza logica
Due formule sono **equivalenti logicamente** se esprimono la stessa verità in ogni modello:
$$A ≡ B \iff (A ⊨ B) \text{ e } (B ⊨ A)$$
Esempi:
- $A∧B≡B∧A$ (commutatività)
    
- $¬(A∧B)≡¬A∨¬B$ (De Morgan)
    
- $¬(A∨B)≡¬A∧¬B$ (De Morgan)
### CNF e DNF
- CNF è un *and* di *or*
$(clausola1​) ∧ (clausola2​) ∧ (clausola3​) ∧ ⋯$
- DNF è un *or* di *and*
$(clausola1​) ∨ (clausola2​) ∨ (clausola3​) ∨ ⋯$
##### Validità e Soddisfacibilità

- Una formula $A$ è **valida** se è **vera in tutte le interpretazioni** (tautologia).
- È **soddisfacibile** se esiste **almeno un modello** che la rende vera.
- È **insoddisfacibile** se non esiste alcun modello che la renda vera.
    > $A$ è valida ⟺ $¬A$ è insoddisfacibile.
##### Inferenza nella logica proposizionale 
- L’**inferenza** è **il processo di derivare nuove informazioni a partire da quelle già note**, seguendo regole logiche.
- L’inferenza è un processo **sintattico**, cioè opera _sull’espressione delle formule_, non sul loro significato. si scrive come:
$$KB ⊢ A$$
- (“A si può derivare sintatticamente dalla KB usando le regole di inferenza”)
###### ✔️ Ricapitoliamo chiaramente:
###### ✅ **1. Correttezza (soundness)**
- Se **KB ⊢ A** allora **KB ⊨ A**  
- → tutto ciò che derivo è _davvero_ vero.  
- 👉 **Questo è sempre possibile**: basta scegliere regole valide.
###### ⚠️ **2. Completezza (completeness)**
- Se **KB ⊨ A** allora **KB ⊢ A**  
- → tutto ciò che è logicamente conseguenza deve essere derivabile.
- 👉 **Questo NON è sempre possibile**  
- (in particolare nella logica del primo ordine).
#### METODI PER ESEGUIRE IL PROCESSO DI INFERENZA
- Le regole di deduzione naturale
	- sono schemi deduttivi che permettono di _derivare nuove formule_ a partire da formule già presenti nella KB.
	- un esempio è il **Modus Ponens** o anche detto eliminazione dell'implicazione
![[Pasted image 20251116151756.png]]

- Il **model checking** è un metodo di **inferenza diretta** nella logica proposizionale per verificare se una formula (o una conclusione) è **conseguenza logica** di una base di conoscenza.
	- $KB ⊨ α$ 
- **Algoritmi di soddisfacibilità (SAT):**
	- È il problema di decidere se una **formula logica proposizionale** può essere resa **vera** assegnando opportunamente valori di verità alle sue variabili.
    - $KB ⊨ α \iff (KB ∧ ¬α) \text{ è insoddisfacibile}$ 
	    - → cioè, **α è conseguenza logica** di KB se non può esistere un modello dove KB è vera e α è falsa.
- **Regole di risoluzione** 
	- iterare la regola di risoluzione è la **chiusura per risoluzione**
	- **convertire tutte le formule della KB** (base di conoscenza) _e_ **la negazione della query** in **Forma Normale Congiuntiva**(CNF)
		- poi le risolvo una per volta
	- **è una _derivazione_**, cioè una **nuova clausola ottenuta**
	- processo ottimo solo se si applica la refutazione e 
- $KB∪{¬α}$ è insoddisfacibile
	- abbiamo un insieme vuoto {}, quindi non è mai vera e non esiste una interpretazione in cui è vera
![[Pasted image 20251116160247.png|400]]

![[Pasted image 20251112153428.png]]
![[Pasted image 20251112153518.png]]

### Logica Proposizionale (PROP)
### Sintassi
- Simboli proposizionali: P, Q, R…
- Connettivi logici: ¬ (not), ∧ (and), ∨ (or), ⇒ (implica), ⇔ (equivalenza).
- Precedenza: ¬ > ∧ > ∨ > ⇒ > ⇔.
Esempi di formule:
- P ∧ Q
- ¬R ⇒ (P ∨ Q) 

### Formula ben formata
- una formula ben formata è una formula che rispetta la semantica della logica
### Semantica
- Ogni **modello** assegna True/False a ciascun simbolo.
- Le regole di verità:
    - ¬P è vera sse P è falsa.
    - P ∧ Q è vera sse entrambi sono veri.
    - P ⇒ Q è falsa solo se P è vera e Q è falsa.
    - True è sempre vera, False sempre falsa.
→ Possiamo usare **tabelle di verità** per calcolare il valore logico delle formule.
# 🔹 Logica dei Predicati del Primo Ordine (FOL)
La FOL estende la logica proposizionale introducendo:
- **Oggetti**, **relazioni**, **funzioni**, **quantificatori** (∀, ∃).  
    Esempio:
    - ∀x Uomo(x) ⇒ Mortale(x)
    - Uomo(Socrate)
    - ⇒ Mortale(Socrate)
# 🔹 Vantaggi della rappresentazione logica

|Vantaggio|Descrizione|
|---|---|
|**Modularità**|La conoscenza può essere riutilizzata per altri compiti.|
|**Raffinabilità**|È possibile aggiungere nuove regole o credenze.|
|**Manutenibilità**|Cambiare un fatto richiede modifiche locali.|
|**Trasparenza epistemologica**|Il sistema può spiegare perché conclude qualcosa.|
