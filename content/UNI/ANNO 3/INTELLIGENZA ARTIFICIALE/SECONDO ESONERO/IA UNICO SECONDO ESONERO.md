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

>[!bug] 	diversi problemi sulle conoscenze
>    - eccezioni, tipo il pinguino è un uccello che non vola
>    - conflitti di ereditarietà
>    - ambiguità di categorie
>    - mondo incompleto
>    - impossibilità della macchina nell'esplorare le seguenti cose
#### Ora che abbiamo definito la nostra conoscenza, non abbiamo ancora definito un modo per utilizzarla, sfruttarla e migliorarla
Ora come ci ragiono sopra?
# Sistemi di categorizzazione e ragionamento

##### *Le reti semantiche* 
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
##### *Le Logiche Descrittive (Description Logics) (DL)*
Le Description Logics sono linguaggi formali che forniscono
una semantica rigorosa alle strutture concettuali
come categorie, classificazione ed ereditarietà.
- le logiche descrittive dicono _cosa significa esattamente_ quella rappresentazione.
Esse permettono di:
- definire concetti in modo formale,
- verificare la coerenza di una ontologia,
- effettuare inferenze corrette e automatiche,
- superare i limiti informali delle reti semantiche.


### DOVE METTO LA CONOSCENZA APPRESA?
# KB e KG
Una **Knowledge Base (KB)** è:
> un **insieme strutturato** di conoscenze utilizzabile da un sistema per inferire, interpretare o decidere.

Può contenere:
- fatti,
- concetti,
- relazioni,
- (in alcuni casi) regole di inferenza.
Una **Knowledge Graph (KG)** è:
> **un grafo di entità collegate da relazioni semantiche**, tipicamente espresso tramite triple  
> _(head, relation, tail)_.

Vengono usati ad esempio anche dai modelli di ML(Machine Learning)


### COME GESTISCO LE ECCEZIONI?
- tipo prima avevo detto della roba del pinguino che è un uccello ma non vola
- si usa una struttura nuova
#### I frame
I **frame** sono strutture mentali e strutture dati usate per rappresentare conoscenza “di senso comune”.
- Quando affrontiamo una **situazione nuova**, la mente richiama uno **stereotipo** (frame) già noto e lo **adatta** al caso specifico.  
 perché non si limita a rappresentare il significato delle frasi in termini di predicati, ma introduce strutture concettuali (frame) che modellano situazioni tipiche del mondo reale, permettendo inferenza, disambiguazione e collegamento con la conoscenza.
 - Gli slot **IS** e **IS-A** permettono di costruire una tassonomia di frame (come classi e sottoclassi).
### Un livello di INTERAZIONE con la conoscenza

# NLP
Un **sistema di Natural Language Processing (NLP)** è:

> **un sistema artificiale che riceve in input espressioni in linguaggio naturale e costruisce una o più rappresentazioni interne, sintattiche e/o semantiche, al fine di interpretare, utilizzare o trasformare il contenuto linguistico.**

In particolare, un sistema NLP:
- prende in input **stringhe di testo**;
- produce come output **una rappresentazione strutturata del significato**,  
    ovvero una forma interna su cui il sistema può eseguire elaborazioni, inferenze o decisioni.
Pertanto, l’obiettivo dell’NLP non è la semplice manipolazione del testo, ma la **costruzione di rappresentazioni del significato utilizzabili computazionalmente**.
###### Principali difficoltà affrontate dai sistemi NLP
I sistemi NLP devono confrontarsi con caratteristiche intrinseche del linguaggio naturale, che rendono complessa la sua elaborazione automatica.
##### Variabilità linguistica
- **Uno stesso concetto** può essere espresso tramite **frasi diverse**  
    (es. _“Il cane morde”_, _“Il cane ha morso”_).
- **Una stessa parola** può assumere **ruoli o significati diversi** a seconda del contesto  
    (es. _“banca”_).
##### Ambiguità
Il linguaggio naturale presenta diversi livelli di ambiguità:
- **Ambiguità lessicale**: una parola può avere più significati.
- **Ambiguità sintattica**: una frase può ammettere più strutture grammaticali.
- **Ambiguità semantica**: una frase può avere più interpretazioni di significato.
- **Ambiguità pragmatica**: il significato dipende dal contesto e dall’intenzione comunicativa.
👉 Un sistema NLP efficace deve **gestire e ridurre l’ambiguità a tutti questi livelli**, integrando informazione linguistica e conoscenza del mondo.

### Esempio di NLP Wordnet senza frame
**WordNet** è una **grande risorsa lessicale** organizzata come una **rete semantica**.
- è un dizionario “intelligente” per i computer.
- viene sfruttato dalle NLP ma con le limitazioni espresse sopra
##### Frame semantics, una cosa sfruttata dai sistemi NLP
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
- Senza frame semantics, l’NLP rappresenta il significato principalmente come predicati e argomenti, ma fatica a modellare il contesto concettuale e le situazioni del mondo reale.
- la frame semantics è composta dalle FrameNet, essa viene sfruttata proprio dagli NLP
**FrameNet** è una **risorsa linguistica basata sulla teoria della frame semantics**.
- il significato delle parole viene interpretato in relazione al **frame concettuale** che esse attivano;
- ogni frame rappresenta una **situazione tipica del mondo reale**;
- le parole riempiono specifici **ruoli semantici (frame elements)** all’interno del frame.
FrameNet consente una **rappresentazione semantica più ricca**, utile per **disambiguazione, inferenza e comprensione del linguaggio**.

>[!info] I sistemi NLP a livello lessicale utilizzano tipicamente risorse come WordNet; quando è necessaria una rappresentazione semantica basata su eventi e ruoli, vengono invece impiegate risorse come FrameNet.



## IL MACHINE LEARNING
- tutto ciò che abbiamo visto fino ad ora ha un grande limite
❌ **la conoscenza va scritta a mano**  
❌ **non scala**  
❌ **è fragile**  
❌ **il mondo è troppo complesso**
##### IL ML è **apprendimento di funzioni dai dati**.
Il ML fa:
> **classificazione senza ontologia esplicita**

>[!quote] **Un agente impara da esperienza E rispetto a una classe di compiti T e una misura di prestazione P, se la sua prestazione nei compiti in T, misurata tramite P, migliora con l’esperienza E.**

- E – Esperienza (_Experience_)
È **la fonte dei dati** da cui il sistema apprende.

### Progettare un sistema di Machine Learning
##### 1️⃣ Scegliere e rappresentare la _training experience_
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
##### 2️⃣ Scegliere la funzione target h (il modello)
È **la funzione che vogliamo imparare**.
Formalmente:
- h : input → output
Esempi:
- `board → mossa`
- `stato → azione ottimale`
h rappresenta la relazione (ignota) tra input e output che il sistema cerca di approssimare a partire dall’esperienza.

##### 3️⃣ Scegliere la rappresentazione della funzione h
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
##### 4️⃣ Scegliere l’algoritmo di apprendimento
È il **meccanismo che modifica h usando E**.
Esempi:
- discesa del gradiente
- aggiornamento dei pesi
- backpropagation
- metodi evolutivi
👉 L’algoritmo **non è la conoscenza**,  
è **il processo che la costruisce**.

## Tipi di apprendimento
- **Apprendimento Supervisionato**: il modello impara da esempi etichettati (input + output corretto) per apprendere una funzione che generalizza a nuovi dati.
	- offre dei dettagli in più oltre a un semplice (hai fallito/hai fatto bene)
- **Apprendimento Unsupervised**: il modello analizza dati non etichettati per scoprire strutture nascoste, pattern o raggruppamenti (es. clustering).
- **Weakly Supervised Learning**: il modello apprende da etichette incomplete, imprecise o rumorose, compensando la scarsa qualità dell’informazione supervisionata.
- **Reinforcement Learning**: un agente impara tramite interazione con un ambiente, scegliendo azioni e ricevendo ricompense o penalità per massimizzare una ricompensa cumulativa.

##### Una volta definito il tipo di apprendimento, è necessario specificare la natura dell’output che il sistema deve apprendere.
##### i problemi di apprendimento supervisionato Regressione e classificazione
- **classificazione** → categoria discreta
	- cioè una **funzione di scoring** che associa a ogni email:
	- un numero reale (es. 0.93)
	- poi a questa funzione associ un valore che è 1 o 0
- **regressione** → valore continuo
	- non ci sono classificazione il valore della funzione è l'output effettivo

>[!info]- esempi
>#### Classificazione
>![[Pasted image 20260127123442.png]]
>#### Regressione
>![[Pasted image 20260127123430.png]]
### ESEMPIO DI UN MODELLO teorico DI APPRENDIMENTO
#### Inductive Learning (Apprendimento induttivo)
L’apprendimento induttivo consiste nel costruire un’ipotesi generale a partire da un insieme finito di esempi, con l’obiettivo di approssimare una funzione target sconosciuta e generalizzare correttamente a nuovi casi.
composto da:
- Funzione target f
- **f** è la **funzione target** (decision function)
- rappresenta **la soluzione ideale**, sconosciuta
	- ⚠️ f **non è accessibile direttamente**, altrimenti non servirebbe imparare.
- Esempi di apprendimento
	- Un **esempio** è una coppia:
	- $(x, f(x))$
		- dove:
			- `x` = input (stato del mondo)
			- `f(x)` = output corretto (decisione ideale)
- Training set
	- Il **training set** è:
		- un insieme finito di esempi
		- estratti (in modo più o meno rappresentativo) dal mondo reale
		- Formalmente:
		- $D = \{(x_1, f(x_1)), (x_2, f(x_2)), \dots\}$
		- 👉 Il training set è **tutto ciò che il sistema conosce di f**.
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
###### Consistenza
Un’ipotesi **h è consistente** rispetto al training set se:
$\forall x \in D,\quad h(x) = f(x)$
cioè:
- h dà la **stessa risposta corretta**
- per **tutti** gli esempi osservati
- non significa però che è tutto rose e fiori ad esempio
👉 **l’ipotesi è perfettamente consistente sui dati di training**  
👉 **ma si comporta male su input che non appartengono al training set**

- Un modello di apprendimento generalizza bene quando produce predizioni corrette anche su istanze non appartenenti al training set, cioè su dati mai osservati durante l’addestramento.
#### Rasoio di Occam
Nel contesto dell’apprendimento induttivo, il Rasoio di Occam afferma che, tra tutte le ipotesi coerenti con i dati di training, è preferibile quella più semplice, poiché ha maggiore probabilità di generalizzare correttamente a nuovi esempi.
![[Pasted image 20251212164416.png|400]]

### Inductive System 
L'Inductive System è il modo concreto in cui un sistema realizza l’apprendimento induttivo
- Input
	- Il sistema riceve:
	- **Training examples** → esempi (x, f(x))
	- **New instance** → un nuovo input mai visto
##### Cosa fa il sistema
- Ottiene il modello H attraverso il machine learning
	- scegli una **classe di ipotesi** H  
	    - (es. linee, alberi, reti neurali…)
		- usi i dati per **scegliere una h ∈ H**
		- ⚠️ Nota importante:
> H **non è la singola ipotesi**,  
> H è **lo spazio delle ipotesi possibili**
- Utilizzo del modello
	- una volta scelta h
	- la applichi a una nuova istanza
- Output:
	- classificazione
	- oppure “don’t know”
Nel sistema induttivo:
- **H è nascosto**
- **le assunzioni non sono dichiarate**
- sembra che il sistema “impari dai dati”
-  l'utente vede solo input-> output
- Per **assunzioni** si intendono **tutte le ipotesi a priori** che il sistema fa **prima di vedere i dati** e che **non sono deducibili dal training set**
![[Pasted image 20251212174948.png]]

IL SISTEMA INDUTTIVO DUNQUE NON È ESPLICITO 
- abbiamo quindi...
### Deductive System
L’apprendimento induttivo può essere **reinterpretato in termini logici** riscrivendo lo stesso processo sotto forma di **ragionamento deduttivo**, rendendo esplicite le assunzioni che nel sistema induttivo restano implicite.
Oltre a:
- un insieme di **training examples** della forma $(x, f(x))$,
- una **nuova istanza** da classificare,
il sistema deduttivo introduce una **assunzione a priori** fondamentale:
> **Assertion: la funzione target appartiene allo spazio delle ipotesi**

Formalmente:
$f \in H$
Questa assunzione afferma che:

> _la funzione target sconosciuta che si intende apprendere è rappresentabile all’interno dello spazio delle ipotesi H._

⚠️ Tale affermazione **non è deducibile dai dati osservati**,  
ma costituisce una **assunzione esplicita** sul problema di apprendimento.

- foto:
	- usa un **theorem prover** (deduzione logica)
	- verifica:
	    - quali ipotesi in H sono compatibili con gli esempi
	    - cosa segue logicamente per il nuovo caso
![[Pasted image 20251212173211.png]]
### INDUCTIVE BIAS
L’inductive bias è l’insieme delle assunzioni a priori che un sistema di apprendimento utilizza per generalizzare oltre gli esempi osservati.

> **L’inductive bias è l’insieme delle assunzioni a priori che un sistema di Machine Learning utilizza per selezionare un’ipotesi tra le molte compatibili con i dati di training, consentendo la generalizzazione a nuovi esempi.**
> _Tali assunzioni non sono deducibili dai dati e sono incorporate nella scelta dello spazio delle ipotesi, nella rappresentazione del modello e nell’algoritmo di apprendimento._
> _Nel sistema induttivo il bias è implicito, mentre nella reinterpretazione deduttiva è reso esplicito tramite l’assunzione $f \in H$._
- **bias troppo forte** → underfitting
- **bias troppo debole** → overfitting
### Decision Trees
una **struttura ad albero** che rappresenta una sequenza di decisioni basate sui valori degli attributi, al fine di determinare una classe (o un valore numerico).
- È la **struttura finale**
- Un oggetto statico
- Serve per:
    - classificare
    - predire
👉 È il **risultato**
Nodo interno     → test su un attributo
Arco             → risultato del test
Foglia           → output finale
![[Pasted image 20251212174342.png]]
### Decision tree learning
Il **Decision Tree Learning** è un **processo di apprendimento induttivo supervisionato** che, a partire da esempi etichettati, **costruisce automaticamente un albero di decisione** per approssimare una funzione target sconosciuta e generalizzare a nuove istanze.
Il decision tree learning costruisce in modo incrementale e greedy un’ipotesi $h$ appartenente allo spazio delle ipotesi degli alberi di decisione.  
A ogni passo seleziona una scelta locale che restringe lo spazio delle ipotesi ai soli alberi compatibili con le decisioni già prese.  
Un nodo interno di un decision tree rappresenta un test su un attributo, i cui esiti, rappresentati dagli archi, corrispondono a una partizione del dominio dell’attributo.  
Il processo prosegue ricorsivamente fino al raggiungimento di un nodo foglia, che rappresenta l’output finale dell’ipotesi.

ricorda:
- h deve essere rappresentabile come **un albero di decisione**
- ogni **nodo interno** rappresenta un **test su un attributo**
- ogni **arco** rappresenta l’esito del test, consente di fare uno splitting decisionale 
- ogni **foglia** rappresenta una decisione finale (classe o valore).
- Lo **spazio delle istanze $X$** è l’insieme astratto di tutti gli oggetti descrivibili tramite gli attributi.
- Lo **spazio delle ipotesi $H$** è l’insieme di **tutti i possibili alberi di decisione** costruibili sugli attributi disponibili:
$$H = \{\, h \mid h \text{ è un albero di decisione sugli attributi disponibili} \,\}$$
La dimensione dello spazio delle ipotesi influisce sul comportamento del modello:
- **spazio delle ipotesi grande**  
    → minor bias, maggior rischio di overfitting (alta varianza);
- **spazio delle ipotesi piccolo**  
    → maggior bias, migliore stabilità (bassa varianza).

![[Pasted image 20251212174321.png]]

### Codice del DTL
![[Pasted image 20251212180010.png]]

### Criterio locale utilizzato nel DTL per splittare
**quale test inserire nel nodo**, cioè **quale attributo (e quale partizione del suo dominio)** usare per separare gli esempi.
Nel Decision Tree Learning vogliamo:
> scegliere l’attributo che **riduce di più l’incertezza** sulla classe

Nel decision tree learning, la scelta dello split in un nodo è guidata da un criterio locale che misura la qualità della partizione. Tale criterio è basato sull’entropia degli esempi e sull’Information Gain, che quantifica la riduzione di incertezza ottenuta applicando uno specifico split.

##### Entropia (Information Content)
Nel **Decision Tree Learning**, l’**entropia** è una misura dell’**incertezza** (o impurità) di un insieme di esempi rispetto alla **classe target**.
In particolare, l’entropia indica **quanto è difficile prevedere la classe di un’istanza** osservando solo l’insieme di esempi corrente.
La **classe di un’istanza** è:
> il **valore dell’output (variabile target)** associato a quell’istanza, cioè il risultato che il modello deve predire.

Formalmente:
$f(x) = y$
- $x$ → istanza (descritta dagli attributi) 
- $y$ → **classe**

- entropia minima(0)
	- se l’insieme contiene **solo esempi della stessa classe**
	- quindi qualsiasi f(x) porta alla stessa y, non ho split che portano a grandi cambiamenti
	- Se l’insieme di esempi contiene solo istanze della stessa classe, l’entropia è nulla; in questo caso non è necessario effettuare ulteriori split e il nodo viene trasformato in una foglia che assegna direttamente la classe.
- entropia massima
	- se l’insieme contiene esempi **equamente distribuiti tra le classi**
	- poiché la previsione della classe è completamente incerta
- valore intermedio
	- se l'insieme è sbilanciato 

È importante notare che l’entropia **non misura quanta informazione è presente**, ma **quanta incertezza** rimane sulla classe target.
Nel contesto del decision tree learning, l’entropia viene utilizzata per valutare la qualità di uno split:
>[!info]- formula entropia per esercizi
>![[Pasted image 20260128112043.png]]

### REMAINDER
> **quanta incertezza sulla classe rimane dopo aver suddiviso gli esempi usando un certo attributo**.

In altre parole, il remainder quantifica **quanto “impuri” sono i sottoinsiemi** generati da uno split, tenendo conto **della loro dimensione**.
Quando scegli un attributo $A$ in un nodo:
- il training set $E$ viene suddiviso in più sottoinsiemi
- ciascun sottoinsieme corrisponde a un **esito dello split**
- il remainder misura l’**entropia complessiva dopo lo split**
👉 È l’**incertezza residua**.

![[Pasted image 20260128112528.png]]
#### Information Gain
Nel **Decision Tree Learning**, l’**Information Gain (IG)** misura:

> **quanto l’utilizzo di un attributo $A$ riduce l’incertezza sulla classe target**.
In altre parole, l’Information Gain quantifica **il beneficio informativo** ottenuto effettuando uno split sugli esempi tramite l’attributo $A$.

- **IG alto**
    - lo split separa bene le classi
    - i sottoinsiemi risultanti sono più “puri”
    - attributo **molto informativo**
- **IG basso**
    - lo split riduce poco l’incertezza
    - attributo **poco utile**
- **IG = 0**
    - il remainder coincide con l’entropia iniziale
    - lo split **non cambia nulla**
    - l’attributo non fornisce informazione sulla classe
👉 Per questo motivo, nel decision tree learning:
> **si sceglie l’attributo che massimizza l’Information Gain**.

>[!info]- formula da esame
>![[Pasted image 20260128112802.png]]

Entropia(E)        → incertezza prima
Remainder(E, A)    → incertezza dopo
Information Gain   → quanto ho guadagnato

>[!info] quando applichi il **decision tree learning**,  l’**albero risultante è il modello**,  e **quel modello implementa l’ipotesi $h$**.
#### Come facciamo a valutare se il mio albero è valido?
- ovviamente il mio albero è valido se $h \approx f$
Come fare a sapere se $h \approx f$? 
- Usiamo teoremi della teoria dell'apprendimento computazionale/statistico. 
- Proviamo h su un nuovo test set di esempi. 
	- Curva di apprendimento = % di correttezza su test set in funzione della grandezza del training set.
![[Pasted image 20251218102842.png]]

#### Il mio modello può imparare a risolvere un certo problema?
#### Apprendibilità
 **L’apprendibilità di un problema di apprendimento dipende dal tipo di performance che è possibile ottenere**, cioè se il problema è **realizzabile** o **non realizzabile**.
 ![[Pasted image 20251218104049.png]]

#### Performance realizzabili o irrealizzabili o ridondanti
Un problema è **realizzabile** se:
$\exists \; h \in H \;\; \text{tale che} \;\; h(x) = f(x) \;\; \forall x \in X$
cioè:
- la funzione target $f$
- **appartiene allo spazio delle ipotesi $H$**
👉 In parole semplici:
> il modello **è abbastanza espressivo** da rappresentare perfettamente il problema.

- con abbastanza dati
- e un algoritmo corretto
- l’ipotesi appresa $h$ **può convergere a $f$**
- l’errore di generalizzazione tende a **0**
vedi grafico sopra

Un problema è **non realizzabile** se:
$\forall h \in H,\;\; h \neq f$
cioè:
- **nessuna ipotesi** nello spazio delle ipotesi
	- può rappresentare correttamente la funzione target
> Se il problema è non realizzabile, **aggiungere dati non basta**.

Perché:
- stai cercando $f$
- in uno spazio dove $f$ **non esiste**
Serve:
- cambiare modello (ampliare $H$)
- oppure cambiare rappresentazione (nuovi attributi)

Un problema con **espressività ridondante** si ha quando:
- si utilizzano **molti attributi**
- ma **irrilevanti o rumorosi**
⚠️ Attenzione:
- il modello è molto espressivo
- ma l’informazione utile è “nascosta nel rumore”
##### Effetto sull’apprendimento
- apprendimento **più lento**
- servono molti più esempi
- maggiore rischio di **overfitting**
- e maggiore instabilità

- PER TUTTI QUESTI VEDI LA FOTO ALL'INIZIO

![[Pasted image 20251218120703.png]]
 1️⃣ Preparazione dei dati
- **Input data**
- **Data cleansing** → rimozione errori/rumore
- **Feature extraction** → trasformazione dei dati in attributi utilizzabili
2️⃣ Annotazione
- **Manual annotation**: assegnazione delle etichette corrette
- Produce dati **annotati** per l’apprendimento supervisionato
3️⃣ Suddivisione dei dati
- **Training set** → per addestrare il modello
- **Validation set** → per tuning e scelta del modello
- **Test set** → per valutazione finale (mai visto prima)
4️⃣ Learning process
- Il **learning algorithm** usa il training set
- Produce uno o più **classifier**
- Valutazione sul **validation set** (model validation)
5️⃣ Selezione del modello
- Si sceglie il **miglior classificatore** in base alle metriche
- (precision, recall, F1, ecc.)
6️⃣ Testing finale
- Il modello scelto viene applicato ai **test data**
- Si misura la **performance reale** (generalizzazione)

#### misura delle Performance in modo pratico
## Confusion Matrix (Classifier Evaluation)

La **confusion matrix** è una tabella che riassume le predizioni di un classificatore confrontandole con le etichette reali, permettendo di distinguere tra classificazioni corrette ed errori.

Per una classe CCC:

||Classe reale = C|Classe reale ≠ C|
|---|---|---|
|Predetto = C|**TP**|**FP**|
|Predetto ≠ C|**FN**|**TN**|

Dove:

- **TP (True Positive)**: istanze di CCC correttamente classificate come CCC
    
- **FP (False Positive)**: istanze non CCC classificate come CCC
    
- **FN (False Negative)**: istanze di CCC classificate come non CCC
    
- **TN (True Negative)**: istanze non CCC classificate come non CCC
    

---

## Single-Class / Class-Based Evaluation

La **class-based evaluation** valuta le prestazioni del classificatore **una classe alla volta**, trattando il problema come una classificazione binaria:

- **classe C** vs **non C**
    

Si risponde alla domanda:

> _Il classificatore ha deciso correttamente se un’istanza appartiene alla classe C?_

---

## Precision

La **precisione** misura la correttezza delle predizioni positive.

Precision(C)=TPTP+FP\boxed{ Precision(C) = \frac{TP}{TP + FP} }Precision(C)=TP+FPTP​​

Indica:

> la proporzione di istanze classificate come CCC che appartengono realmente a CCC.

---

## Recall

Il **recall** misura la capacità del classificatore di riconoscere le istanze della classe.

Recall(C)=TPTP+FN\boxed{ Recall(C) = \frac{TP}{TP + FN} }Recall(C)=TP+FNTP​​

Indica:

> la proporzione di istanze della classe CCC che sono state correttamente riconosciute.

---

## Trade-off Precision / Recall

Precision e Recall sono spesso in **trade-off**:

- aumentando la precisione può diminuire il recall
    
- aumentando il recall può diminuire la precisione
    

Non esiste un valore ottimale universale: dipende dal contesto applicativo.

---

## Notazione compatta (come nei lucidi)

Per una classe iii:

- ai=TPia_i = TP_iai​=TPi​ (corretti)
    
- bi=FPib_i = FP_ibi​=FPi​ (falsi positivi)
    
- ci=FNic_i = FN_ici​=FNi​ (falsi negativi)
    

Le metriche diventano:

Precisioni=aiai+bi\boxed{ Precision_i = \frac{a_i}{a_i + b_i} }Precisioni​=ai​+bi​ai​​​ Recalli=aiai+ci\boxed{ Recall_i = \frac{a_i}{a_i + c_i} }Recalli​=ai​+ci​ai​​​

---

## Frase finale da esame (opzionale ma perfetta)

> «Le metriche di precisione e recall, derivate dalla confusion matrix, consentono di valutare le prestazioni di un classificatore su una singola classe, evidenziando il compromesso tra correttezza delle predizioni positive e capacità di riconoscere tutte le istanze della classe.»
