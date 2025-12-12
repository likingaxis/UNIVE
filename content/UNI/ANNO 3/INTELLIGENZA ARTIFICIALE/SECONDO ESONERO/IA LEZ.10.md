- skip da 74 a 81 del rumeno?
## Definizione standard di Machine Learning

>[!quote] **Un agente impara da esperienza E rispetto a una classe di compiti T e una misura di prestazione P, se la sua prestazione nei compiti in T, misurata tramite P, migliora con l’esperienza E.**

- E – Esperienza (_Experience_)
È **la fonte dei dati** da cui il sistema apprende.
### Progettare un sistema di Machine Learning
- descrive **le scelte fondamentali** che un progettista deve fare
### 1️⃣ Scegliere e rappresentare la _training experience_
Decidere:
- **che tipo di esperienza usare**
- **in che forma fornirla al sistema**
Esempi:
- mosse “migliori” fatte da esperti
- partite complete
- stati del gioco con valutazione
- interazioni casuali
⚠️ L’esperienza **non è sempre supervisionata**:
- può essere corretta
- rumorosa
- parziale
- generata dal sistema stesso
### 2️⃣ Scegliere la funzione target h
È **la funzione che vogliamo imparare**.
Formalmente:
- h : input → output
Esempi:
- `board → mossa`
- `stato → azione ottimale`
👉 h rappresenta **la conoscenza che manca** all’agente.
### 3️⃣ Scegliere la rappresentazione della funzione h
Qui **non stai ancora imparando**, stai decidendo:
> _come_ la funzione può essere espressa
Esempi:
- funzione lineare con pesi
- albero decisionale
- rete neurale
- insieme di regole
⚠️ Questo è un **vincolo forte**:
- se la rappresentazione è troppo semplice → non può imparare bene
- se è troppo complessa → rischia overfitting
### 4️⃣ Scegliere l’algoritmo di apprendimento
È il **meccanismo che modifica h usando E**.
Esempi:
- discesa del gradiente
- aggiornamento dei pesi
- backpropagation
- metodi evolutivi
👉 L’algoritmo **non è la conoscenza**,  
è **il processo che la costruisce**.
## Inductive Learning (Apprendimento induttivo)
L’**apprendimento induttivo** è il modello più semplice (e fondamentale) di Machine Learning:
**Imparare una funzione generale a partire da esempi specifici.**
“Induttivo” perché:
- si passa da **casi particolari**
- a una **regola generale**
#### Funzione target f
- **f** è la **funzione target** (decision function)
- rappresenta **la soluzione ideale**, sconosciuta
⚠️ f **non è accessibile direttamente**, altrimenti non servirebbe imparare.
#### Esempi di apprendimento
Un **esempio** è una coppia:
$(x, f(x))$
dove:
- `x` = input (stato del mondo)
- `f(x)` = output corretto (decisione ideale)
#### Training set
Il **training set** è:
- un insieme finito di esempi
- estratti (in modo più o meno rappresentativo) dal mondo reale
Formalmente:
$D = \{(x_1, f(x_1)), (x_2, f(x_2)), \dots\}$
👉 Il training set è **tutto ciò che il sistema conosce di f**.
#### L’obiettivo dell’apprendimento induttivo
#### Ipotesi h
- **h** è un’ipotesi
- una funzione _candidata_ che tenta di approssimare f
Problema di apprendimento:
> **Trovare un’ipotesi h tale che h ≈ f, usando solo il training set.**
Esempio:
- `h(x)` = mossa suggerita dal sistema nello stato x
⚠️ h non deve solo copiare gli esempi:  
deve **generalizzare**.
- h ≈ f e non h = f
- f è definita su **tutti** i possibili stati
- il training set copre **solo una piccola parte**
#### Metodo vero e proprio di apprendimento
- Costruisci (o modifica) h in modo che concordi con f sugli esempi osservati
#### Consistenza
Un’ipotesi **h è consistente** rispetto al training set se:
$\forall x \in D,\quad h(x) = f(x)$
cioè:
- h dà la **stessa risposta corretta**
- per **tutti** gli esempi osservati
>[!attention] consistenza ≠ apprendimento corretto
>Un’ipotesi può:
>- essere **consistente**
>- ma **generalizzare male**
Esempio classico:
>- una curva che passa esattamente per tutti i punti
>- ma oscilla in modo assurdo fuori dai dati
>👉 Questo introduce il problema della **generalizzazione**.
>**Generalizzare** significa:
> comportarsi correttamente **su input mai visti prima**,  
> non solo su quelli presenti nel training set.

Il modello di Inductive Learning fa **assunzioni forti**:
1️⃣ Si ignora la conoscenza di base
- niente regole pregresse esplicite
- niente modelli del mondo
- solo esempi
2️⃣ Si assume che i dati siano disponibili
- etichettati
- affidabili
- rappresentativi
👉 Questo lo rende:
- **teoricamente chiaro**
- ma **poco realistico** per ambienti complessi
### Rasoio di Occam
- Tra tutte le ipotesi coerenti con i dati, si preferisce la più semplice.
![[Pasted image 20251212164416.png]]

- Inductive System e Deductive System
    - Differenza tra i due:
        - producono lo stesso output sul nuovo esempio
        - la differenza non è nel risultato, ma nel modo in cui viene giustificato
    - Sistema induttivo:
        - riceve esempi di training
        - seleziona (implicitamente) un’ipotesi h da uno spazio di ipotesi H
        - il bias induttivo è nascosto nell’algoritmo e nella scelta di H
        - dà l’impressione che il sistema “apprenda dai dati”
    - Sistema deduttivo:
        - riceve gli stessi esempi di training
        - esplicita l’assunzione che la funzione target f (sconosciuta) appartenga allo spazio H
        - usa deduzione logica per determinare l’output sul nuovo esempio
        - rende esplicite le assunzioni che nel sistema induttivo sono implicite
### Inductive System
come funziona il learning nella pratica
#### Input
Il sistema riceve:
- **Training examples** → esempi (x, f(x))
- **New instance** → un nuovo input mai visto
##### Cosa fa il sistema
##### 1️⃣ “Acquire the model (H) through Machine Learning”
Qui succedono due cose _implicite_:
- scegli una **classe di ipotesi** H  
    (es. linee, alberi, reti neurali…)
- usi i dati per **scegliere una h ∈ H**
⚠️ Nota importante:
> H **non è la singola ipotesi**,  
> H è **lo spazio delle ipotesi possibili**
##### 2️⃣ “Using the model, or Hypothesis Space, H”
- una volta scelta h
- la applichi a una nuova istanza
Output:
- classificazione
- oppure “don’t know”
##### IMPORTANTE
Nel sistema induttivo:
- **H è nascosto**
- **le assunzioni non sono dichiarate**
- sembra che il sistema “impari dai dati”
👉 Ma questo è solo **il punto di vista operativo**
![[Pasted image 20251212174948.png]]

### Equivalente Deductive System
come può essere reinterpretato logicamente
- stesso processo viene **riscritto in forma logica**.
##### Input aggiuntivo fondamentale
Oltre a:
- training examples
- new instance
compare una nuova assunzione:
-   “Assertion: _H contains the target concept_”
Questa è la frase **più importante di tutto lo schema**.
Stai dicendo al sistema:
> “La vera funzione f che vogliamo imparare  
> **appartiene allo spazio delle ipotesi H**.”

Formalmente:
$f \in H$
⚠️ Questa NON è dedotta dai dati.  
⚠️ Questa è un’**assunzione a priori**.
#### Cosa fa ora il sistema
Non “impara”, ma:
- usa un **theorem prover** (deduzione logica)
- verifica:
    - quali ipotesi in H sono compatibili con gli esempi
    - cosa segue logicamente per il nuovo caso
Se:
- tutte le ipotesi compatibili danno la stessa risposta → classifica
- altrimenti → “don’t know”
![[Pasted image 20251212173211.png]]
### INDUCTIVE BIAS, LA VERA DIFFERENZA
L’**inductive bias** è:
> l’insieme delle assunzioni che permettono di generalizzare  
> oltre i dati osservati
Nel diagramma:
- nel sistema induttivo → **implicito**
- nel sistema deduttivo → **esplicito**
### Learning Decision Trees
Problema: 
Decidere se aspettare o meno il tavolo al ristorante basandosi sui seguenti attributi:
1. Alternativa: c'è un altro ristorante vicino? 
2. Bar: c'è un bar dove aspettare? 
3. Fri/Sat: è venerdì o sabato? 
4. Fame: Sono affamato? 
5. Patrons: numero di persone nel ristorante (None, Some, Full) 
6. Prezzo: Prezzo `($,$$,$$$)`
7. Tempo: Sta piovendo? 
8. Prenotazione: È stata fatta una prenotazione? 
9. Tipo: Tipo di ristorante (French, Italian, Thai, Burger) 
10. Tempo di attesa: Quanto tempo bisogna aspettare (0-10, 10-30, 30-60, >60)
![[Pasted image 20251212174321.png]]
Una possibile rappresentazione dell’ipotesi è tramite gli alberi di decisione:
![[Pasted image 20251212174342.png]]
Gli alberi decisionali possono esprimere qualsiasi funzione degli attributi in input, esiste un albero decisionale coerente per qualsiasi training set con un cammino verso una foglia per ogni esempio (a meno che f è non deterministico in x). Si preferisce trovare alberi di decisione compatti.

>[!question]- Quanti diversi alberi di decisione distinti ci sono? 
>Se abbiamo n attributi Booleani abbiamo $2^{2^n}$ alberi di decisione distinti. 
>![[Pasted image 20251212175209.png]]

>[!question]- Quante ipotesi congiuntive possono esserci? 
>Ciascun attributo può essere positivo, negativo o non comparire, perciò abbiamo $3^n$ ipotesi congiuntive distinte. 
>![[Pasted image 20251212175753.png]]
>rappresenta **uno spazio di ipotesi completo** per un caso semplicissimo (due attributi booleani).

Spazi di ipotesi più espressivi rendono più probabile che la funzione target f
sia rappresentabile (f ∈ H), riducendo il rischio di underfitting.
Tuttavia, all’aumentare dell’espressività di H aumenta anche il numero di ipotesi
coerenti con il training set, rendendo più difficile selezionare l’ipotesi corretta
e aumentando il rischio di overfitting e di scarsa generalizzazione.

H più grande ⇒ meno bias, più varianza.
H più piccolo ⇒ più bias, meno varianza.
### Decision tree learning (DLT)
Funzione che mira a trovare un albero coerente con il training set. L’idea è di scegliere ricorsivamente l’attributo più significativo come radice del sottoalbero.
![[Pasted image 20251212180010.png]]
L’attributo da scegliere è quello che, se usato per dividere il training set, produce sottoinsiemi il più possibile “puri”, cioè contenenti esempi quasi tutti positivi o quasi tutti negativi.
![[Pasted image 20251212182433.png]]
La scelta migliore in questo caso è patrons.
#### Entropia (Information Content)
L’**entropia** misura:
> **quanto è “confuso” o “impuro” un insieme di esempi rispetto alla classe target**
- insieme **tutto positivo o tutto negativo** → entropia **bassa (0)**
- insieme **50% positivi, 50% negativi** → entropia **massima**
- insieme sbilanciato → entropia intermedia
👉 L’entropia **non misura quanta informazione c’è**,  
ma **quanta incertezza** c’è sulla classe.
![[Pasted image 20251212182827.png]]
###### Valori importanti da ricordare
- **Entropia = 0**
    - tutti positivi **o** tutti negativi
    - nessuna incertezza
- **Entropia = 1** (caso binario)
    - metà positivi, metà negativi
    - massima incertezza
Nel Decision Tree Learning vogliamo:
> scegliere l’attributo che **riduce di più l’incertezza** sulla classe
Quindi:
- misuriamo l’entropia **prima** dello split
- misuriamo l’entropia **dopo** lo split
- guardiamo **quanto diminuisce**

### Remainder
Il **remainder** dice:
> **quanta incertezza rimane dopo aver usato un certo attributo per dividere il training set**
Se dopo la divisione:
- sai già quasi sempre la risposta → remainder **basso**
- sei ancora molto incerto → remainder **alto**

Un attributo $A$ con $v$ valori distinti:
- divide il training set $E$
- in sottoinsiemi $E_1, …, E_v$
Ogni sottoinsieme ha:
- $p_i$p positivi
- $n_i$ negativi
![[Pasted image 20251212183634.png]]
#### Information Gain
> **Information Gain = quanto A riduce l’incertezza sulla classe**
- IG alto → split molto utile
- IG basso → split poco informativo
- IG = 0 → A non serve a nulla
![[Pasted image 20251212183708.png]]
