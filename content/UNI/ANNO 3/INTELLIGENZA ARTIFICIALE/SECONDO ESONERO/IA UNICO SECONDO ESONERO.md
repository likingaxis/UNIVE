# Rappresentare la conoscenza 
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
come soluzione di queste problematiche abbiamo
# Sistemi di categorizzazione e ragionamento
- ci tengo subito a precisare che in realtà servono entrambe
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
🔴 problema delle reti semantiche:
- il significato degli archi è **informale**
- dipende da come _interpreti_ il grafo
##### Le Logiche Descrittive (Description Logics)
Le Description Logics sono linguaggi formali che forniscono
una semantica rigorosa alle strutture concettuali
come categorie, classificazione ed ereditarietà.
- le logiche descrittive dicono _cosa significa esattamente_ quella rappresentazione.
Esse permettono di:
- definire concetti in modo formale,
- verificare la coerenza di una ontologia,
- effettuare inferenze corrette e automatiche,
- superare i limiti informali delle reti semantiche.


### LE KB (Knowledge Base – Basi di Conoscenza)
Una **Knowledge Base (KB)** è:
> **un insieme strutturato di conoscenze utilizzabile da un sistema per inferire, interpretare o decidere**.

Una KB **non è legata a un unico formalismo** e **non dipende dall’NLP**, ma può essere:
- **usata** dai sistemi NLP,
- **formalizzata** tramite diversi linguaggi logici.
Una KB può essere rappresentata tramite:
- **Logica del Primo Ordine (FOL)**,
- **Description Logics (DL)**,
- **ontologie**,
- **strutture a grafo** (Knowledge Graph),
- **risorse linguistiche** (es. WordNet, FrameNet).
Può contenere:
- fatti,
- concetti,
- relazioni,
- (in alcuni casi) regole di inferenza.

- **KB (Knowledge Base)**  
    → è **l’insieme delle conoscenze** (livello concettuale).
- **KG (Knowledge Graph)**  
    → è una **rappresentazione a grafo** delle conoscenze contenute nella KB.
##### Knowledge Graph
Un **Knowledge Graph** è:
> **un grafo di entità collegate da relazioni semantiche**, tipicamente espresso tramite triple  
> _(head, relation, tail)_.
Nei modelli di **Machine Learning** e **Representation Learning**:
- entità e relazioni vengono rappresentate come **vettori** (embedding),
- il modello apprende relazioni del tipo:
`h + r ≈ t`
dove:
- `h` = vettore dell’entità di partenza,
- `r` = vettore della relazione,
- `t` = vettore dell’entità di arrivo.
👉 Questo consente di:
- **predire relazioni mancanti**,
- **completare automaticamente il grafo**,
- integrare conoscenza simbolica e apprendimento automatico.
![[Pasted image 20251203183730.png]]
![[Pasted image 20251211111519.png]]
- a sx
	- abbiamo due concetti
	- entrambi sono collegati a un concetto generale
		- attraverso una relazione $r$ 
- a dx
	- il concetto s3 è collegato al concetto generale diverso 
		- ma non attraverso la relazione $r$ bensì con un'altra relazione
		- infatti $s_3 + r ≠ α$ 
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
# Rappresentazioni semantiche avanzate
Il **Natural Language Processing (NLP)** è l’area dell’Intelligenza Artificiale che si occupa di **modellare, analizzare e generare il linguaggio naturale** al fine di consentire a un sistema artificiale di **interagire in modo efficace con l’uomo**.
In particolare, l’NLP mira a:
- **interpretare** espressioni linguistiche, ricavandone una rappresentazione sintattica e semantica;
- **collegare il linguaggio alla conoscenza**, associando le strutture linguistiche a concetti, relazioni e situazioni del mondo reale;
- **produrre risposte o azioni coerenti**, sulla base della comprensione ottenuta.
L’obiettivo non è la sola analisi formale del testo, ma la **comprensione e l’uso funzionale del linguaggio** all’interno di sistemi intelligenti.
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

I **frame** sono strutture mentali e strutture dati usate per rappresentare conoscenza “di senso comune”.
- Quando affrontiamo una **situazione nuova**, la mente richiama uno **stereotipo** (frame) già noto e lo **adatta** al caso specifico.  
 perché non si limita a rappresentare il significato delle frasi in termini di predicati, ma introduce strutture concettuali (frame) che modellano situazioni tipiche del mondo reale, permettendo inferenza, disambiguazione e collegamento con la conoscenza.
- Senza frame semantics, l’NLP rappresenta il significato principalmente come predicati e argomenti, ma fatica a modellare il contesto concettuale e le situazioni del mondo reale.
- Gli slot **IS** e **IS-A** permettono di costruire una tassonomia di frame (come classi e sottoclassi).
### Esempio di NLP Wordnet senza frame
**WordNet** è una **grande risorsa lessicale** organizzata come una **rete semantica**.
- è un dizionario “intelligente” per i computer.
### Esempio di NLP con uso di frame Framenet 
**FrameNet** è una **risorsa linguistica basata sulla teoria della frame semantics**.
- il significato delle parole viene interpretato in relazione al **frame concettuale** che esse attivano;
- ogni frame rappresenta una **situazione tipica del mondo reale**;
- le parole riempiono specifici **ruoli semantici (frame elements)** all’interno del frame.
FrameNet consente una **rappresentazione semantica più ricca**, utile per **disambiguazione, inferenza e comprensione del linguaggio**.


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
