#### Equivalenza logica
Due formule sono **equivalenti logicamente** se esprimono la stessa verità in ogni modello:
A≡B  ⟺  (A⊨B) e (B⊨A)A ≡ B \iff (A ⊨ B) \text{ e } (B ⊨ A)A≡B⟺(A⊨B) e (B⊨A)
Esempi:
- $A∧B≡B∧A$ (commutatività)
    
- $¬(A∧B)≡¬A∨¬B$ (De Morgan)
    
- $¬(A∨B)≡¬A∧¬B$ (De Morgan)
##### Validità e Soddisfacibilità

- Una formula $A$ è **valida** se è **vera in tutte le interpretazioni** (tautologia).
- È **soddisfacibile** se esiste **almeno un modello** che la rende vera.
- È **insoddisfacibile** se non esiste alcun modello che la renda vera.
    > $A$ è valida ⟺ $¬A$ è insoddisfacibile.
##### Inferenza nella logica proposizionale
- Il **model checking** è un metodo di **inferenza diretta** nella logica proposizionale per verificare se una formula (o una conclusione) è **conseguenza logica** di una base di conoscenza.
	- $KB ⊨ α$ 
- **Algoritmi di soddisfacibilità (SAT):**
    $KB ⊨ α \iff (KB ∧ ¬α) \text{ è insoddisfacibile}$ 
    → cioè, **α è conseguenza logica** di KB se non può esistere un modello dove KB è vera e α è falsa.


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

