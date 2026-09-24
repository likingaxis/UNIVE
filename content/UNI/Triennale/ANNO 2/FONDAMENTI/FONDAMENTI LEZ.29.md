- pagine
- 1-10
- 14-21
- 24
- 28
- 32-36


## 1. Studio basato sui **linguaggi**

Nella formulazione “classica” della teoria della complessità:

- un **linguaggio** L⊆Σ∗L \subseteq \Sigma^*L⊆Σ∗ è un insieme di stringhe;
    
- una **macchina di Turing** accetta o rifiuta una stringa;
    
- una **classe di complessità** (come P, NP, coNP) è definita come un insieme di linguaggi.
    

Ad esempio:

- **NP** è definita come la classe dei **linguaggi accettati in tempo polinomiale da una macchina di Turing non deterministica**
    
    D09ClasseNP
    
    .
    

Questa impostazione è:

- molto **formale** e matematica;
    
- naturale quando si studiano modelli di calcolo e proprietà astratte delle classi.
    

---

## 2. Studio basato sui **problemi**

Nella pratica, però, non pensiamo in termini di stringhe astratte, ma di **problemi computazionali**, ad esempio:

- “esiste un’assegnazione che soddisfa la formula?”
    
- “esiste un vertex cover di dimensione ≤ k?”
    

Un **problema decisionale** è tipicamente descritto come:

- un insieme di **istanze**;
    
- una risposta **sì/no** per ciascuna istanza.
    

Il collegamento con i linguaggi è il seguente:

- a ogni problema decisionale Γ si può associare un linguaggio  
    LΓ={x∣x eˋ un’istanza sıˋ di Γ}L_\Gamma = \{x \mid x \text{ è un’istanza sì di } \Gamma\}LΓ​={x∣x eˋ un’istanza sıˋ di Γ};
    
- studiare Γ o studiare LΓL_\GammaLΓ​ è **formalmente equivalente**.
    

Quindi:

> parlare di problemi o di linguaggi **non cambia il contenuto teorico**, ma cambia il punto di vista.









Cook Levin solo teorema senza dimostrazione

Problemi di colorabilita
Solo cosa fa senza riduzione


Problemi NP-intermedi: il teorema di Ladner
Solo sapere cosa sono
## Dati e variabili

### Input

- `N[1..n]` contiene la stringa di input x1x2…xnx_1x_2\ldots x_nx1​x2​…xn​
    
- quindi `N[i] = x_i`
    

### Costanti

- `P` è l’insieme delle **quintuple** della macchina di Turing:
    
    ⟨qi1,si1,si2,qi2,mi⟩\langle q_{i1}, s_{i1}, s_{i2}, q_{i2}, m_i\rangle⟨qi1​,si1​,si2​,qi2​,mi​⟩
    
    Significano:  
    se sono nello **stato** qi1q_{i1}qi1​ e leggo il simbolo si1s_{i1}si1​, allora:
    
    - scrivo si2s_{i2}si2​,
        
    - passo allo stato qi2q_{i2}qi2​,
        
    - muovo la testina di mim_imi​ (tipicamente −1,0,+1-1, 0, +1−1,0,+1)
        

---

## Variabili principali nel codice

- `q`: stato corrente (parte da `q0`)
    
- `t`: posizione della testina sul nastro (indice nell’array `N`)
    
- `primaCella`, `ultimaCella`: tengono traccia dell’intervallo del nastro “effettivamente usato”
    
    - servono perché il nastro di una MT è (idealmente) infinito, ma qui usiamo un array che si allarga man mano.
        
- `Ψ` (Psi): insieme delle quintuple **applicabili** nello stato corrente (dipende da `q` e dal simbolo letto `N[t]`)
    
- `✷`: simbolo blank (cella vuota)
    

---

## Inizializzazione (righe 1–4)

1. `q ← q0;`  
    Stato iniziale.
    
2. `t ← 1;`  
    Testina sulla prima cella dell’input.
    
3. `primaCella ← t;`  
    La prima cella usata è quella corrente.
    
4. `ultimaCella ← n;`  
    L’ultima cella usata inizialmente è l’ultima dell’input.
    

---

## Ciclo principale (riga 5)

5. `while (q ≠ qA ∧ q ≠ qR) do begin`
    

Finché non sei in uno stato finale:

- `qA` = accettazione
    
- `qR` = rigetto
    

continui ad eseguire passi di computazione.

---

## Costruzione delle mosse possibili (riga 6)

6. `Ψ ← { ⟨qi1, si1, si2, qi2, mi⟩ ∈ P : qi1 = q ∧ si1 = N[t] };`
    

Qui stai calcolando **tutte** le quintuple che:

- partono dallo stato corrente `q`
    
- e sono compatibili col simbolo attualmente letto `N[t]`
    

Quindi `Ψ` è l’insieme delle “mosse possibili adesso”.

---

## Il non determinismo vero e proprio (righe 7–12)

7. `if (Ψ ≠ ∅) then begin`
    
8. `scegli ⟨qi1, si1, si2, qi2, mi⟩ ∈ Ψ;`
    

Questa è la riga chiave: **scegli** significa:

- la macchina non deterministica può “prendere” una delle mosse possibili
    
- e se esiste una sequenza di scelte che porta ad accettazione, la NT “accetta”
    

9. `N[t] ← si2;`  
    Scrivi il simbolo nuovo sulla cella corrente.
    
10. `q ← qi2;`  
    Aggiorni lo stato.
    
11. `t ← t + mi;`  
    Muovi la testina (sinistra/destra/fermo).
    
12. `end`
    

🔎 Nota: se `Ψ` ha più elementi, ci sono più rami nell’albero di computazione.

---

## Gestione dell’estensione del nastro (righe 13–20)

Dato che `t` può andare oltre i limiti già “noti”, il codice aggiorna l’intervallo usato e mette blank nelle nuove celle.

### Se vai a sinistra oltre la prima cella usata

13. `if (t < primaCella) then begin`
    
14. `primaCella ← t;`
    
15. `N[t] ← ✷;`
    
16. `end`
    

### Se vai a destra oltre l’ultima cella usata

17. `if (t > ultimaCella) then begin`
    
18. `ultimaCella ← t;`
    
19. `N[t] ← ✷;`
    
20. `end`
    

In pratica: “se la testina esce dall’area già inizializzata, crea la cella e mettila blank”.

---

## Fine ciclo e output (righe 21–22)

21. `end` (fine while)
    
22. `Output: q.`
    

Quindi alla fine restituisce lo stato:

- se esci perché `q = qA` → accetta
    
- se esci perché `q = qR` → rigetta
    

---

## Due osservazioni importanti (per capire bene NP)

### 1) Perché si parla di linguaggi “accettati” e non “decisi”

Perché in una NT, se l’input **non** è nel linguaggio:

- non esiste alcun ramo che porta a `qA`,
    
- ma alcuni rami possono anche “girare” o comportarsi in modo non significativo.  
    Il concetto fondamentale è: **accetta se esiste un ramo accettante**.
    

### 2) Dove si vede che il grado di non determinismo è costante

Perché `Ψ ⊆ P` e `P` è fisso:

- quindi ∣Ψ∣|Ψ|∣Ψ∣ varia, ma è sempre ≤ ∣P∣|P|∣P∣, che è una costante della macchina.