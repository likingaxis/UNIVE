>[!tip]- BREVE RECAP
>- Il **Machine Learning** serve a imparare regole dai dati, non a scriverle a mano.
  >  
>- Si parte da **dati di esempio**: input → output corretto.
>    
>- Un **modello** è una funzione con parametri da stimare.
>
>
>- L’apprendimento è il processo che trova i parametri migliori.
>    
>- Tre tipi principali:
>    
>    - **Supervised**: Il modello impara da esempi già corretti, confrontando l’output previsto con quello reale.
>        
>    - **Unsupervised**: Il modello analizza i dati senza risposte note e cerca strutture o gruppi nascosti.
>        
>    - **Reinforcement**: Un agente impara agendo in un ambiente, ricevendo premi o penalità in base alle azioni.
>        
>
>
>- Pipeline tipica:
>    
>    1. Raccolta dati
>        
>    2. Preprocessing
>        
>    3. Scelta modello
>        
>    4. Training
>        
>    5. Valutazione
>        
>- Si separano i dati in:
>    
>    - **Training set**
>        
>    - **Test set** (mai visto durante il training)
>        
>- Obiettivo: **generalizzare**, non memorizzare.
>    
>- Problemi tipici:
>    
>    - **Overfitting**: modello troppo complesso.
>        
>    - **Underfitting**: modello troppo semplice.
>        
>- Serve una **misura di errore** per capire se il modello sta migliorando.
>
>
>- Metodi di ML: classi di funzioni
>	- approcci discriminativi -> sono lineari
>	- approcci probabilistici -> stimano delle probabilità attraverso il training set (usano l'inversione Bayesiana)


## Tipi di apprendimento
- **Apprendimento Supervisionato**: il modello impara da esempi etichettati (input + output corretto) per apprendere una funzione che generalizza a nuovi dati.
	- offre dei dettagli in più oltre a un semplice (hai fallito/hai fatto bene)
- **Apprendimento Unsupervised**: il modello analizza dati non etichettati per scoprire strutture nascoste, pattern o raggruppamenti (es. clustering).
- **Weakly Supervised Learning**: il modello apprende da etichette incomplete, imprecise o rumorose, compensando la scarsa qualità dell’informazione supervisionata.
- **Reinforcement Learning**: un agente impara tramite interazione con un ambiente, scegliendo azioni e ricevendo ricompense o penalità per massimizzare una ricompensa cumulativa.

- $C_1$​ = **rosso**
- $C_2$ = **verde**
Il problema del Machine Learning supervisionato è, dato un input xxx, assegnargli l’etichetta di classe corretta $C_k$​.

- 2 approcci differenti
### Approcci discriminativi
- **Idea**: imparano **direttamente la frontiera di decisione** tra le classi.
	- frontiera di decisione: è l’insieme dei punti per cui il modello **cambia decisione**.
Impara **direttamente la mappa**:
x  ⟶  C
- **Durante il training**:
	- aggiustano $W$ e $b$
- **finché la retta separa al meglio i punti delle due classi**
- **Caso lineare**: la decisione è una retta (o iperpiano)
    $h(x) = \text{sign}(W \cdot x + b)$
- $W$: pesi (importanza delle feature) e oltretutto l'orientamento della retta
- $b$: bias per prendere decisioni non centrate nell'origine, consente uno spostamento parallelo
### Approcci probabilistici
- **Idea**: stimano la **probabilità di una classe dato l’input**, $p(C_k \mid x)$
- **Metodo**: usano un **modello generativo** e l’**inversione di Bayes**:$$p(C_k \mid x) = \frac{p(x \mid C_k)\, p(C_k)}{p(x)}$$
- **Significato**: modellano come i dati sono generati all’interno di ciascuna classe.
- **Obiettivo**: classificare scegliendo la classe con probabilità a posteriori massima.
👉 In breve:

- **Discriminativi** = imparano _dove passa il confine_.
- **Probabilistici** = imparano _come sono fatti i dati_ e poi decidono.
![[Pasted image 20260105110754.png]]

###### PICCOLA PRECISAZIONE
- **Generativo**(tipo probabilistico): _impara come nascono i dati → può generarne di nuovi_
- **Discriminativo**: _impara solo come separarli → non può generarne_

### Encoder e Decoder per il ML
![[Pasted image 20260105113943.png]]

Questa slide spiega **come le parole vengono trasformate in numeri e poi ricostruite**, usando una **rete neurale encoder–decoder**.


![[Pasted image 20260105114043.png]]

Questa slide mostra **il risultato finale** di quel processo.
 Cosa vedi
Ogni nodo è:
- una **parola**
- rappresentata come **un punto in uno spazio vettoriale**
Le distanze **non sono casuali**.
# Reti neurali
## Linear Classification
Un modello di classificazione lineare calcola: (stima)$$\hat y = w^T x + b$$dove
- L’input `x` è un vettore di feature.
- I pesi (`w`) e il bias (`b`) sono i parametri da imparare.
- T cosa é?
In pratica:
- il modello cerca una **retta** (in 2D) o un **iperpiano** (in dimensioni più alte)
- che separi i dati o li approssimi nel modo migliore possibile.

Durante il training:
- si definisce una **funzione di errore**
- si scelgono i pesi che la minimizzano
- l’errore diminuisce finché si arriva a un minimo.

Il modello è semplice, veloce, ma con capacità limitata.
![[Pasted image 20260105114805.png]]

##### Limiti della classificazione lineare
- Funziona bene solo se i dati sono **linearmente separabili**.
- Se la relazione tra le variabili è non lineare, la retta non basta.
Altri problemi:
- il vincolo di linearità è rigido
- con dati rumorosi o sovrapposti il confine è poco affidabile
- pochi parametri → poca espressività

Hard,data separability,lack of expressivness
#### Esempio di classificazione lineare
![[Pasted image 20260105115540.png]]
![[Pasted image 20260105115620.png]]

#### Tentare di minimizzare l'errore
Modellare gli errori
L’idea è sempre questa:
1. **Scegli un modello**
    - una funzione con dei parametri
    - qui: $h_w(x) = w_1 x + w_0$​
    
2. **Decidi cosa vuol dire “sbagliare”**
    - definisci una funzione di errore (**loss**)
    - qui: errore quadratico  
        $(y - h_w(x))^2$
    
3. **Sommi l’errore su tutti i dati**
    - ottieni una loss totale
    - misura quanto il modello è “brutto” in generale
    
4. **Vuoi il modello che sbaglia meno**
    - quindi cerchi i parametri che **minimizzano la loss**
    
5. **Per migliorare i parametri**
    - guardi come cambia l’errore quando cambi un peso
    - cioè fai le **derivate**
    
6. **Aggiorni i parametri nella direzione giusta**
    - se una scelta aumenta l’errore → vai dall’altra parte
    - questo è il principio del **gradient descent**

>[!tip] SCHEMA PRINCIPALE
>Modello -> Loss -> Derivate -> Aggiornamento


BATCH LEARNING N LEARNING DA AGGIUNGERE


## Perceptron

Il Perceptron è il primo modello di rete neurale introdotto da Rosenblatt nel 1958.
- È un classificatore lineare che imita il comportamento di un neurone biologico.

>[!tip] Idea chiave
>Somma gli input, li pesa, aggiunge un bias e decide.

![[Pasted image 20260105122709.png]]
#### Funzionamento (a parole)
- Ogni input $x_{i}$ entra nel neurone, con un proprio peso $\theta_{i}$ 
- Si fa la somma pesata
- si aggiunge un bias `b`
- il risultato passa in una funzione $g(\cdot)$ 

Formula $$h(x) = g\left(\sum_i \theta_i x_i + b\right)$$
#### Cosa fa il Perceptron
- Divide lo spazio degli input con una **retta / iperpiano**
- Da un lato classe 1, dall’altro classe 0
- La decisione è netta (on/off)

Di solito: $$g(z) =  
\begin{cases}  
1 & z \ge 0 \\  
0 & z < 0  
\end{cases}  $$
#### Apprendimento
- Parte con pesi iniziali casuali.
- Guarda un esempio alla volta.
- Se sbaglia, corregge i pesi.
- Se indovina, va avanti.

#### Limite fondamentale
- Il Perceptron è **lineare**.
- Può risolvere solo problemi linearmente separabili.
- Non può risolvere problemi tipo **XOR**.


## Rappresentazione e Apprendimento
![[Pasted image 20260105115639.png]]

Una rete neurale profonda impara automaticamente rappresentazioni sempre più astratte: dai pixel, ai bordi, alle parti, fino all’oggetto.

## Networks and Information Flow
![[Pasted image 20260105115652.png]]
Miglioramento del percettrone
Una rete neurale non è altro che una grande funzione composta, fatta da tante somme pesate e non linearità collegate in catena.

## Learning multiple components
![[Pasted image 20260105120036.png]]

Il deep learning elimina la progettazione manuale delle feature, perché il modello le impara da solo a più livelli di astrazione.

 
## Come aggiungere nuovi layer
Cosa succede quando si passa da:
- da un singolo modello lineare
- a una **rete neurale con più layer**

Il concetto chiave è: **composizione di funzioni**.

### Punto di partenza: modello semplice
Il modello semplice era il **Perceptron** e la sua funzione $$h(x) = g\left(\sum_i \theta_i x_i + b\right)$$
### Aggiungere strati
Quando si parla di "aggiungere strati" si intende usare **più funzioni**, una dopo l'altra.

Ogni layer:
- prende l’output del layer precedente
- lo trasforma

Quindi il modello diventa: $$h(x) = g^{(2)}(g^{(1)}(x))$$In generale:
- $g^{(1)}, g^{(2)}, \dots, g^{(k)}$
- una catena di trasformazioni.

### Feedforward structure
“Feedforward” vuol dire:
- l’informazione va solo in avanti
- da input → hidden layer → output
- nessun ciclo

Ogni layer:
- ha i suoi pesi $W^{(i)}$
- e il suo bias $b^{(i)}$

### Hidden layer
Un **hidden layer** è uno strato intermedio (non un input né un output).
La formula è $$h^{(1)}(x)=g^{(1)}(W^{(1)}x+b^{(1)})$$
>[!question] Perché servono più layer?
>Più layer + non linearità →
>
>- funzioni complesse
>    
>- confini non lineari
>    
>- maggiore espressività

# SGD


