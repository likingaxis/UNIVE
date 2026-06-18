#### Evidenza dell’errore
Come fare a sapere se $h \approx f$? 
- Usiamo teoremi della teoria dell'apprendimento computazionale/statistico. 
- Proviamo h su un nuovo test set di esempi. 
	- Curva di apprendimento = % di correttezza su test set in funzione della grandezza del training set.
![[Pasted image 20251218102842.png]]
#### Apprendibilità
 **L’apprendibilità di un problema di apprendimento dipende dal tipo di performance che è possibile ottenere**, cioè se il problema è **realizzabile** o **non realizzabile**.
 ![[Pasted image 20251218104049.png]]
#### Performance realizzabili
##### Definizione
Un problema è **realizzabile** quando:
- esiste almeno un’ipotesi nello **spazio delle ipotesi**
- che rappresenta correttamente la **funzione target**
In altre parole:
> il modello _può_ teoricamente imparare perfettamente il problema.
- Con abbastanza dati → il modello converge alla soluzione corretta
- L’errore tende a **zero**
#### Performance non realizzabili
##### Definizione
Un problema è **non realizzabile** quando:
- **non esiste** alcuna ipotesi nello spazio delle ipotesi
- in grado di rappresentare correttamente la funzione target
##### Cause principali della non-realizzabilità
1. **Mancanza di attributi rilevanti**
    - le informazioni disponibili non sono sufficienti
2. **Limitazioni dello spazio delle ipotesi**
    - funzioni **poco espressive**
    - modello troppo semplice rispetto al problema

- Aggiungere dati **non basta**
- Serve:
    - cambiare modello
    - o aggiungere attributi informativi

#### Espressività ridondante
##### Definizione
L’**espressività ridondante** si ha quando:
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

| Tipo di problema | Limite massimo | Con più dati |
| ---------------- | -------------- | ------------ |
| Realizzabile     | 100%           | Converge     |
| Non realizzabile | < 100%         | Si ferma     |
| Ridondante       | ~100%          | Molto lento  |

![[Pasted image 20251218120703.png]]
##### 1️⃣ Preparazione dei dati
- **Input data**
- **Data cleansing** → rimozione errori/rumore
- **Feature extraction** → trasformazione dei dati in attributi utilizzabili
##### 2️⃣ Annotazione
- **Manual annotation**: assegnazione delle etichette corrette
- Produce dati **annotati** per l’apprendimento supervisionato
##### 3️⃣ Suddivisione dei dati
- **Training set** → per addestrare il modello
- **Validation set** → per tuning e scelta del modello
- **Test set** → per valutazione finale (mai visto prima)
##### 4️⃣ Learning process
- Il **learning algorithm** usa il training set
- Produce uno o più **classifier**
- Valutazione sul **validation set** (model validation)
##### 5️⃣ Selezione del modello
- Si sceglie il **miglior classificatore** in base alle metriche
- (precision, recall, F1, ecc.)
##### 6️⃣ Testing finale
- Il modello scelto viene applicato ai **test data**
- Si misura la **performance reale** (generalizzazione)
### Classifier Evaluation: Confusion Matrix 
- Strumento utilizzato per valutare le prestazioni di un classificatore in un problema di apprendimento, serve a: 
	- Visualizzare come un modello classifica dei dati in diverse categorie 
	- Aiuta a identificare dove il modello sbaglia
![[Pasted image 20251218104411.png]]
#### Single Class Metrics
- si seleziona una certa classe C e si analizza se ogni istanza appartiene o meno a quella classe
![[Pasted image 20251218104641.png]]
La precisione non è una metrica adatta per le attività con classi sbilanciate.

👉 **Recall ti dice:**
> *quanti elementi della classe C il classificatore ha riconosciuto come positivi*

👉 **Precision ti dice:**
> *quanti degli elementi classificati come positivi sono effettivamente corretti (cioè appartengono davvero alla classe C)*

### Class-based evaluation
![[Pasted image 20251218111106.png]]

👉 **Si valuta una classe alla volta** (classe C)  
e si risponde alla domanda:
> _Il classificatore ha deciso correttamente se un’istanza appartiene o no a questa classe?_

- Cerchio **Category examples** → tutti i **Members** (classe C reale)
- Cerchio **Classified examples** → tutto ciò che il modello ha predetto come C
- **Intersezione** → **TP** (Members correttamente classificati)

Quindi:
- **Members** = istanze che **appartengono davvero** alla classe C
- **Not Members** = istanze che **non appartengono** alla classe C
- **Classified** = il modello dice “sì, è C”
- **Rejected** = il modello dice “no, non è C”

Abbiamo un trade-off tra la precisione e il recall.
![[Pasted image 20251218111335.png]]
Siano: 
- $a_i$ corretti ($TP_i)$,
- $b_i$ gli errori $(FP_i)$
- $c_i$ le istanze della $classe_i$ che non vengono rilevati ($FN_i$).
![[Pasted image 20251218112145.png]]

### Performance Measurements
#### Break even point
Il BEP è la stima interpolata del valore per la quale Recall = Precision
👉 Una **stima interpolata** è:
> **un valore non osservato direttamente, ma ricavato stimandolo tra due valori osservati**.
![[Pasted image 20251218112235.png]]
#### Testing sui dati
Per ottenere una **stima affidabile**, i **test data devono essere istanze NON usate nel training**.
###### Perché l’errore sul training non basta
- l’errore sul training **non predice** la performance futura
- i dati nuovi **non sono identici** a quelli di addestramento
###### Overfitting
**Overfitting** = adattamento troppo preciso ai dati di training  
→ ottimi risultati sul training  
→ **scarse prestazioni su nuovi dati**
###### Cosa vogliamo valutare
Vogliamo misurare:
- **accuratezza delle predizioni**
- **capacità di generalizzazione**
❌ non la capacità di memorizzare i dati

### F-measure
Media armonica di Precisione e Recall.
![[Pasted image 20251218112459.png]]
- penalizza valori molto sbilanciati
- se **precision** o **recall** è bassa → **F1 è bassa**
- F1 è alta **solo se entrambe sono alte**
👉 Ogni classe ha il **suo F1-score**
##### MEDIA MACRO
- calcola la metrica **separatamente per ogni classe**
- poi fa una **media aritmetica semplice**
- tratta tutte le classi allo stesso modo

- tutte le classi sono ugualmente importanti
- vuoi valutare le performance anche sulle classi rare
![[Pasted image 20251218112533.png]]

##### MEDIA MICRO
- **aggrega** TP, FP e FN di tutte le classi
- poi calcola precision, recall e F1 **globali**
- le classi **più frequenti pesano di più**

- l’obiettivo è la performance globale
- gli errori sulle classi frequenti sono più rilevanti
![[Pasted image 20251218112542.png]]
![[Pasted image 20251218113505.png]]
![[Pasted image 20251218113517.png]]

### Valutazione di un modello di Machine Learning

#### Model evaluation / Model validation
Per fare questi passaggi serve un numero sufficiente di dati
##### Step 1 – Dataset splitting
![[Pasted image 20251218115039.png]]
Il dataset viene **suddiviso** in due parti:
- **Training set**
- **Testing set**
##### Step 2 – Learning phase (addestramento)
![[Pasted image 20251218115024.png]]
- Il **training set** viene dato in input
	- all’**algoritmo di apprendimento**
		- che costruisce un **modello** (ipotesi, classificatore)
##### Step 3 – Testing the model
![[Pasted image 20251218115052.png]]
- Il **testing set** viene dato al modello
	- il modello **produce predizioni**
		- le predizioni vengono confrontate con:
		    - le **etichette reali** (oracle)
- Da questo confronto otteniamo:
	- confusion matrix
	- precision, recall, F1
	- accuracy, ecc.
### N-Fold Cross Validation
La **N-Fold Cross Validation** è una tecnica di valutazione usata quando:
- i dati sono **pochi**
- si vuole ottenere una **stima più affidabile** delle prestazioni di un modello
![[Pasted image 20251218115327.png]]
1. Il dataset viene suddiviso in **n sottoinsiemi (fold)** di **uguale dimensione**
2. Per ogni iterazione:
    - **1 fold** viene usato come **test set**
    - i restanti **n − 1 fold** come **training set**
3. Il processo viene ripetuto **n volte**
4. Le metriche ottenute in ciascun round vengono **mediate**
👉 Il risultato finale è:
- una stima **più stabile**
- meno dipendente da una singola suddivisione dei dati

>[!attention] La maggior parte degli algoritmi ML dipende da alcuni parametri, la configurazione migliore dovrà essere scelta dopo una corretta fase di tuning
##### Fase di tuning (validation)
1. Si definisce un insieme di **configurazioni candidate**
2. Ogni configurazione viene:
    - addestrata
    - valutata su un **validation (o tuning) set**
3. Si sceglie la configurazione con le prestazioni migliori
📌 Importante:
- il **validation set è distinto dal test set**
- il **test set** deve essere usato **solo alla fine**
### Cross valuation and the hold out
![[Pasted image 20251218121153.png]]
## Hold-out
### Cos’è
- Il dataset viene **diviso una sola volta** in:
    - **Training set**
    - **Test set** (o validation)
### Caratteristiche
- semplice e veloce
- risultato **dipende molto** da come avviene lo split
- poco affidabile con **pochi dati**
📌 Tipico: 70% training – 30% test
## Hold-out nella Cross-Validation

Nel secondo schema:
- un **fold viene tenuto completamente da parte (held-out)**
	- **non partecipa** al training né alla cross-validation
	- viene usato **solo alla fine** per la valutazione finale
👉 Serve a:
- evitare ottimismo nella stima
- avere un **test set veramente indipendente**
