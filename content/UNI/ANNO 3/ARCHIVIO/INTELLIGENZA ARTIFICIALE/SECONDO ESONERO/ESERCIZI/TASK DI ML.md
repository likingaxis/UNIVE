#### Esercizio MLP problema di rilevanza 
Introduzione al problema
Il problema descritto può essere formulato come un **problema di apprendimento supervisionato**, in cui un agente deve decidere se un documento $d$ è **rilevante** oppure **non rilevante** rispetto a una query $q$.
Formalmente, dato un insieme di documenti candidati $C$, l’obiettivo è individuare il sottoinsieme $R \subseteq C$ dei documenti rilevanti.  
Il problema viene quindi modellato come una **classificazione binaria**, in cui a ogni coppia $(q, d)$ viene associata un’etichetta:
$$y \in \{R,\ \neg R\}$$

Osservazioni e feature

Ogni esempio di training è una **coppia query–documento** $(q, d)$ associata a un’etichetta di rilevanza.
Le **feature** sono proprietà osservabili che descrivono l’input e consentono al modello di operare.  
In questo contesto, query e documenti testuali vengono trasformati in **rappresentazioni numeriche vettoriali** (embedding), che catturano il loro contenuto semantico.

Una feature è quindi una **variabile numerica** che descrive la relazione tra $q$ e $d$, ad esempio tramite la loro rappresentazione in uno spazio continuo.
Task di apprendimento
Il task è una **classificazione supervisionata binaria**, in cui si vuole apprendere una funzione ipotesi:
$h(d, q) \in \{R,\ \neg R\}$
che approssima la funzione target ignota di rilevanza e sia in grado di generalizzare a nuove query.
Modello: Multi-Layer Perceptron (MLP)
Un **Multi-Layer Perceptron (MLP)** è una rete neurale feedforward composta da:
- uno strato di input,
- uno o più **strati nascosti**,
- uno strato di output.
Ogni neurone calcola una combinazione lineare degli input seguita da una **funzione di attivazione non lineare**, che aumenta l’espressività del modello.
Nel caso considerato:
- l’input del modello è la rappresentazione vettoriale della coppia $(q, d)$
- l’output è uno score o una probabilità associata alla classe $R$.
Lo strato nascosto consente di modellare **relazioni non lineari** tra query e documenti, non catturabili da modelli lineari.

Funzione di loss e addestramento

La **loss function** è una funzione che misura l’errore del modello su un singolo esempio, confrontando l’output predetto con l’etichetta reale.  
Essa quantifica quanto il modello sta sbagliando ed è l’obiettivo dell’ottimizzazione.

L’addestramento della rete avviene tramite:
- **forward propagation**, in cui si calcola l’output,
	- La **forward propagation** è la fase in cui la rete neurale riceve un input (ad esempio il vettore che rappresenta un testo) e lo propaga in avanti attraverso i vari strati della rete.
	- In ciascun neurone viene calcolata una combinazione lineare degli input, seguita dall’applicazione di una **funzione di attivazione non lineare**.  
	- Il risultato finale è l’output del modello, che rappresenta una stima della classe (ad esempio la probabilità dei diversi sentiment).
- **backpropagation**, che calcola il contributo di ciascun peso all’errore,
	- La **backpropagation** è l’algoritmo che consente di calcolare **come ciascun peso della rete ha contribuito all’errore** commesso dal modello.
	- Partendo dalla loss calcolata sull’output, l’errore viene propagato **all’indietro** dalla uscita verso gli strati precedenti.  
Per ogni peso viene calcolata la **derivata parziale della loss**, che indica quanto una piccola variazione di quel peso influenzerebbe l’errore.
- **gradient descent**, che aggiorna i pesi minimizzando la loss.
	- Il **gradient descent** è un algoritmo di ottimizzazione che utilizza i gradienti calcolati tramite backpropagation per **aggiornare i pesi della rete**.
	- Ogni peso viene modificato nella direzione opposta al gradiente, cioè nella direzione che **riduce maggiormente la loss**, con un passo controllato dal **learning rate**.  
	- Ripetendo questo processo su molti esempi di training, la loss tende a diminuire e il modello migliora le proprie prestazioni.

Comportamento della funzione h su un esempio

Data una nuova query $q$, il modello valuta ogni documento $d \in C$ producendo una stima di rilevanza.  
La funzione $h(d,q)$ assegna il documento alla classe $R$ se lo score supera una certa soglia, oppure lo classifica come non rilevante.
I documenti classificati come rilevanti vengono restituiti come risposta alla query.
Valutazione delle prestazioni
La **valutazione** serve a stimare la capacità del modello di generalizzare su dati non visti.
Poiché i documenti rilevanti sono spesso pochi rispetto a quelli non rilevanti, l’**accuracy** da sola non è sufficiente.  
Si utilizzano quindi metriche per singola classe, definite a partire dalla confusion matrix:
- **Precision**:
$$\text{Precision} = \frac{TP}{TP + FP}$$
misura la correttezza delle predizioni positive.
- **Recall**:
$$\text{Recall} = \frac{TP}{TP + FN}$$
misura la capacità di recuperare i documenti rilevanti.
- **F1-score**:
$$F1 = \frac{2 \cdot \text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}$$
Conclusione

L’approccio basato su MLP consente di apprendere una funzione di rilevanza flessibile e non lineare, capace di combinare informazioni semantiche tra query e documenti.  
Grazie all’uso di rappresentazioni vettoriali e all’ottimizzazione della loss, il modello è in grado di generalizzare a nuove query e migliorare la qualità dei documenti restituiti.


#### Sentyment analysis
Introduzione al problema
Il problema della **Sentiment Analysis** consiste nel determinare automaticamente il **sentimento espresso** in un testo, ad esempio positivo, negativo o neutro.
Dal punto di vista del Machine Learning, il problema può essere formulato come un **task di apprendimento supervisionato**, in cui a ogni testo viene associata un’etichetta di classe che rappresenta il sentiment.

Osservazioni e feature

Ogni esempio di training è costituito da una **frase o documento testuale** xxx e dalla relativa etichetta di sentiment $y$.
Poiché i modelli di Machine Learning operano su dati numerici, il testo viene trasformato in una **rappresentazione vettoriale** (feature vector).  
Le **feature** sono proprietà osservabili che descrivono l’input in forma numerica e consentono al modello di operare.
Esempi di feature includono:
- rappresentazioni bag-of-words o TF-IDF,
- embedding distribuiti che catturano il significato semantico del testo.

Task di apprendimento

Il problema è modellato come una **classificazione supervisionata**, in cui si vuole apprendere una funzione ipotesi:
$$h(x) \in \{\text{positivo},\ \text{negativo},\ \text{neutrale}\}$$
che approssima la funzione target ignota del sentiment ed è in grado di generalizzare a testi non visti.
Modello: Multi-Layer Perceptron (MLP)
Un **Multi-Layer Perceptron (MLP)** è una rete neurale feedforward composta da più strati di neuroni, ciascuno seguito da una **funzione di attivazione non lineare**.
Nel caso della sentiment analysis:
- l’input della rete è il vettore di feature che rappresenta il testo,
- l’output è una distribuzione di probabilità sulle classi di sentiment.
L’utilizzo di uno o più **strati nascosti** consente al modello di apprendere relazioni non lineari tra le feature linguistiche e il sentiment espresso.

Funzione di loss e addestramento

La **loss function** misura l’errore del modello confrontando l’output predetto con l’etichetta reale per un singolo esempio.
L’addestramento avviene tramite:
- **forward propagation** per calcolare l’output,
- **backpropagation** per calcolare i gradienti,
- **gradient descent** per aggiornare i pesi e minimizzare la loss.
Comportamento della funzione h su un esempio
Dato un nuovo testo $x$, il modello produce una stima di probabilità per ciascuna classe di sentiment.  
La funzione $h(x)$ assegna al testo la classe con probabilità massima, fornendo così la predizione del sentiment.
Valutazione delle prestazioni
La valutazione serve a misurare la capacità del modello di generalizzare su dati non visti.
Le prestazioni possono essere misurate tramite:
- **accuracy**, quando le classi sono bilanciate,
- **precision, recall e F1-score** per valutare il comportamento su ciascuna classe.
In particolare, l’F1-score è utile perché penalizza forti sbilanciamenti tra precision e recall.
Conclusione
L’approccio basato su MLP consente di apprendere automaticamente una funzione di classificazione del sentiment a partire da testi etichettati.  
Grazie all’uso di rappresentazioni vettoriali e di funzioni di attivazione non lineari, il modello è in grado di catturare pattern linguistici complessi e generalizzare a nuovi testi.
