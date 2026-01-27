### Rappresentare la conoscenza 
- una macchina di per sé visualizza esclusivamente Stringhe
	- la parola gatto è solo una sequenza di 0 e 1
	- da qui nasce la rappresentazione della conoscenza attraverso categorie
		- tipo: animale -> gatto
	- da qui nascono le ontologie
#### Ontologie
> **una specifica formale e condivisa di come un dominio è strutturato**

In pratica:
- **quali tipi di cose esistono**
- **come sono collegate**
- **quali proprietà hanno**
- **quali relazioni sono valide**

![[Pasted image 20251203171007.png]]

da qui deriva poi
L’**ingegneria ontologica** è la disciplina che si occupa di:
- progettare modelli formali di conoscenza,
- definire concetti e relazioni di un dominio,
- strutturare questa conoscenza in modo da renderla **comprensibile, riutilizzabile e computabile** da sistemi artificiali.
##### Ridurre la conoscenza
- per ridurre la conoscenza da scrivere sono state utilizzate diverse strategie
	- Categorie
		- insiemi di oggetti con proprietà in comune
	- Classificazione
		- appartenenza di un oggetto a una certa categoria
	- Ereditarietà
		- le proprietà hanno una gerarchia da rispettare e che ereditano
#### Problematiche 
- il ragionamento non è così banale da svolgere e automatico
	- eccezioni, tipo il pinguino è un uccello che non vola
	- conflitti di ereditarietà
	- ambiguità di categorie
	- mondo incompleto
	- impossibilità della macchina nell'esplorare le seguenti cose
##### Soluzioni alle seguenti problematiche 
##### Le reti semantiche
un grafo di concetti collegati da relazioni semantiche
- sono **visive**, intuitive, utili per rappresentare e navigare la conoscenza.
- Sono **grafi**: 
- nodi → concetti (Cane, Animale, Coda)
- archi → relazioni (è-un, ha-parte, vive-in)
- Permettono di **visualizzare** una base di conoscenza.
- Usano relazioni come **IS-A** (sottoclasse) per trasmettere proprietà tramite **ereditarietà**.
- Consentono inferenze semplici ed efficienti del tipo:  
    “Se _canarino_ è un _uccello_ e gli uccelli volano, allora un canarino vola.”
- ➜ Sono nate per modellare il **ragionamento valido**, prima in matematica, poi nel senso comune. 
- È un’ontologia **disegnata come grafo**
🔴 Le reti semantiche:
- sono **intuitive**
- sono **visuali**
- ma… **non hanno semantica formale rigorosa**
#### I frame
- rappresentazioni strutturate di concetti in forma di attributi e oggetti
- Quando affrontiamo una **situazione nuova**, la mente richiama uno **stereotipo** (frame) già noto e lo **adatta** al caso specifico.  
- → È un modo per interpretare il mondo senza ripartire da zero ogni volta.
I frame introducono:
- **slot** (attributi)
- **valori di default**
- **ereditarietà strutturata**
Esempio:
- Mammifero → numero-zampe = 4 (default)
- Umano → numero-zampe = 2 (override)
Questo risolve:
- eccezioni
- specializzazioni
- conoscenza incompleta
### LE NLP
NLP = **Natural Language Processing**  
ma NON significa “analizzare testo”.
Significa:
> **permettere a una macchina di interpretare, generare e usare il linguaggio umano in modo funzionale**

Cioè:
- capire cosa viene detto
- collegarlo a conoscenza
- agire o rispondere in modo coerente
##### Difficoltà che deve affrontare NLP
##### Variabilità
- stesso concetto → frasi diverse  
    (“Il cane morde”, “Il cane ha morso”)
- stessa parola → ruoli diversi  
    (“banca”)
##### Ambiguità
- **lessicale** (parola)
- **sintattica** (struttura)
- **semantica** (significato)
- **pragmatica** (intenzione)
👉 NLP deve gestire _tutti e quattro i livelli_.
##### Come si affronta il problema: la scomposizione
Il processo di comprensione linguistica viene diviso in **fasi**:
1. **Analisi lessicale**
    - token
    - categorie grammaticali (POS)
2. **Analisi sintattica**
    - struttura della frase
    - albero di derivazione
3. **Analisi semantica**
    - significato
    - predicati e argomenti
4. **Analisi pragmatica**
    - contesto
    - intenzione
👉 Ogni fase riduce l’ambiguità.
##### Frame semantics, una aggiunta utile agli NLP
>[!info]- NLP senza frame semantics
>
> ## Cosa fa l’NLP _senza_ frame semantics
> Esempio:
> “Luca ha comprato un libro da Anna per 10 euro”
> Con NLP classico ottieni qualcosa tipo:
> `comprare(Luca, libro, Anna, 10)`
> Questo ti dice:
> - c’è un verbo
> - ci sono argomenti
> ❌ Ma **non sai**:
> - che questa è una transazione economica
> - che Anna ora ha i soldi
> - che Luca ora possiede il libro
> - che “vendere” e “comprare” descrivono _la stessa situazione_

La frame semantics estende l’NLP perché non si limita a rappresentare il significato delle frasi in termini di predicati, ma introduce strutture concettuali (frame) che modellano situazioni tipiche del mondo reale, permettendo inferenza, disambiguazione e collegamento con la conoscenza.

- Senza frame semantics, l’NLP rappresenta il significato principalmente come predicati e argomenti, ma fatica a modellare il contesto concettuale e le situazioni del mondo reale.

### IL MACHINE LEARNING
Fino ad ora abbiamo visto:
- ontologie
- reti semantiche
- frame
- NLP simbolico
Tutto questo ha un grosso limite:
❌ **la conoscenza va scritta a mano**  
❌ **non scala**  
❌ **è fragile**  
❌ **il mondo è troppo complesso**

##### IL ML è **apprendimento di funzioni dai dati**.
Il ML fa:
> **classificazione senza ontologia esplicita**

### Tipi di apprendimento 
Riguarda **che informazioni hai durante l’addestramento**.
##### Supervised
- dati + etichette
- classificazione / regressione
##### Unsupervised
- solo dati
- clustering, strutture latenti

### Compito del Machine Learning
Nel Machine Learning **non impari regole**,  
impari una **funzione matematica** che approssima una relazione ignota.
##### Regressione vs classificazione
- **classificazione** → categoria discreta
	- cioè una **funzione di scoring** che associa a ogni email:
	- un numero reale (es. 0.93)
	- poi a questa funzione associ un valore che è 1 o 0
- **regressione** → valore continuo
	- non ci sono classificazione il valore della funzione è l'output effettivo


>[!info]- esempi
>#### Regressione
>![[Pasted image 20260127123430.png]]
>#### Classificazione
>![[Pasted image 20260127123442.png]]

### Un modello di ML si può misurare contando

- accuratezza
- errore
- perdita
### i classificatori lineari(modelli)

Un classificatore lineare è un modello che assegna una classe a un’istanza valutando il segno di una combinazione lineare delle sue caratteristiche, definendo una frontiera di decisione iperpianare nello spazio degli input.

Il **percettrone** è:
- il classificatore lineare per eccellenza
- un neurone artificiale
👉 ponte diretto verso le reti neurali.


#### Alberi decisionali

## Ciclo di sviluppo del ML 
1. formulazione problema
2. raccolta dati
3. addestramento
4. valutazione
5. deployment
6. monitoraggio


## Cross-validation
Serve per:
- stimare generalizzazione
- evitare overfitting
