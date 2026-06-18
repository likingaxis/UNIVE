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
Il problema del Machine Learning supervisionato è, dato un input x, assegnargli l’etichetta di classe corretta $C_k$​.

- 2 approcci differenti
### Approcci discriminativi
- **Idea**: imparano **direttamente la frontiera di decisione** tra le classi.
	- frontiera di decisione: è l’insieme dei punti per cui il modello **cambia decisione**.
Impara **direttamente la mappa**:
- x  ⟶  C
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
#### Insieme di problemi risolti da modelli che vedremo tra poco
Nella classificazione supervisionata:
- ogni dato è descritto da un vettore di feature  
	- $x \in \mathbb{R}^d$
	- una **feature** è una **caratteristica misurabile** che descrive un dato (un esempio).
- ogni dato ha un’etichetta  
	- L’etichetta (_label_) è la risposta corretta associata a un dato.
	- $y$ nota
- l’obiettivo è assegnare la classe corretta a nuovi input mai visti
	- Secondo AIMA:
		- l’apprendimento consiste nel trovare una funzione ipotesi  
		- $h$ che approssimi la funzione target
- Differenza tra classe ed etichetta
	- classe: appartenenza di quel determinato dato durante il test
	- etichetta: reale y fornita durante il training
##### Rappresentazione dei dati
Ogni input:
- $x = (x_1, x_2, \dots, x_d)$
- Ogni esempio di training:
	- $(x^{(i)}, y^{(i)})$
- con:
	- $y \in {0,1}$ (classificazione binaria)
##### Modello lineare
- Il modello assume che le classi siano separabili da una frontiera lineare.
- La frontiera di decisione:
	- Si definisce una funzione lineare:
		- $\hat{y} = w^T x + b$
- dove:
	- $w$ = vettore dei pesi
	- $T$ = trasposta perché sono tutti vettori in riga e noi vogliamo fare riga*colonna
	- $b$ = bias, ci permette di regolare la retta sulle y
- Questa equazione rappresenta:
	- una retta (in 2D)
	- un piano (in 3D) un iperpiano (in dimensioni maggiori)
- divide lo spazio in due regioni
	- ogni punto è classificato in base al lato in cui cade

#### Funzione di decisione
- La funzione lineare produce un valore continuo. 
- Per ottenere una classe, si applica una funzione di decisione:
	- $h_w(x) = \begin{cases} 1 & \text{se } w^T x + b \ge 0 \\ 0 & \text{altrimenti} \end{cases}$
👉 Questa è la funzione ipotesi.
#### Generalizzazione
Una volta appresi $w$ e $b$:
- il modello può classificare nuovi input
- applicando sempre la stessa funzione  $h_w(x)$
- Questo è il concetto di *generalization*:
	- passare da esempi osservati a una regola valida su dati futuri.
#### Apprendimento dei parametri
- I parametri $w$ e $b$ non sono noti a priori.  
	- Vengono appresi dai dati tramite una regola di aggiornamento.
- Per ogni esempio $(x,y)$:
	- si calcola  $\hat{y} = h_w(x)$
- si confronta con $y$
	- se c’è errore, si aggiornano i pesi
#### Regola di aggiornamento 
- $w_i \leftarrow w_i + \alpha (y - h_w(x)) x_i$
	- dove:
		- $\alpha$ = learning rate
		- $y - h_w(x)$ = errore
		- $x_i$ = i-esima feature
- L’aggiornamento:
	- avviene solo in caso di errore
	- modifica la frontiera di decisione
#### Criteri di arresto
- L’apprendimento termina quando:
	- i parametri non cambiano più
	- oppure si raggiunge un numero massimo di iterazioni
##### Limiti della classificazione lineare
- Funziona bene solo se i dati sono **linearmente separabili**.
	- Se la relazione tra le variabili è non lineare, la retta non basta.
Altri problemi:
- (Hard) il vincolo di linearità è rigido
- (data separability) con dati rumorosi o sovrapposti il confine è poco affidabile
- (lack of expressiveness) pochi parametri → poca espressività

#### Esempio di classificazione lineare
![[Pasted image 20260105115540.png]]

#### Tentare di minimizzare l'errore
Modellare gli errori
L’idea è sempre questa:
1. **Scegli un modello**
    - una funzione con dei parametri
    - qui: $h_w(x) = w_1 x + w_0$​
2. **Decidi cosa vuol dire “sbagliare”**
    - definisci una funzione di errore (**loss**)
	- La **loss** è una funzione che misura **quanto la predizione del modello è sbagliata** rispetto al valore corretto (etichetta) **per un singolo esempio**
		- $ℓ(\hat{y}​,y)$
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


#### REGRESSIONE LINEARE

![[Pasted image 20260105114805.png]]
- La y rappresenta subito una soluzione qua perché è la retta, prima andava comunque definita da h(x)
- $\hat y$​ è **direttamente il valore predetto**
- funzione di loss:    
	- qui: errore quadratico  
	        $(y - h_w(x))^2$
##### Ottimizzazione di w
- asse x: valori possibili di $w_1$
- asse y: **errore (MSE sul training set)**
	- Errore Quadratico Medio
- prendiamo il minimo
### N TRAINING
- effettuo un aggiornamento in batch dei pesi
	- $N$ = dimensione del training set
Nel learning supervisionato, i dati di training sono:
$(x^{(1)}, y^{(1)}), (x^{(2)}, y^{(2)}), \dots, (x^{(N)}, y^{(N)})$
dove:
- $x^{(i)}$= vettore di feature del dato iii
- $y^{(i)}$ = etichetta (classe o valore corretto)
- **N** = numero totale di esempi
👉 Ogni coppia $(x^{(i)}, y^{(i)})$ è **un training point**
### Aggiornamento del bias (qui chiamato $w_0$​)
$w_0 \leftarrow w_0 + \alpha \sum_j (y_j - h_w(x_j))$
Significa:
- calcolo l’errore **per ogni punto**
- li **sommo tutti**
- aggiorno il bias **una sola volta**
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

## Rete neurale multistrato
![[Pasted image 20260105115652.png]]
Miglioramento del percettrone
- contiene più neuroni del percettrone
- Una rete neurale non è altro che una grande funzione composta, fatta da tante somme pesate e non linearità collegate in catena.

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
- hidden layer: singolo strato della funzione 
### Feedforward structure
“Feedforward” vuol dire:
- l’informazione va solo in avanti
- da input → hidden layer → output
- nessun ciclo
![[Pasted image 20260111195805.png]]

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
# Training delle Reti Neurali Multistrato (MLP): Backpropagation

## Contesto generale

Una **rete neurale multistrato (MLP)** è una funzione parametrica che approssima una funzione target ignota$f^*(x)$ tramite una composizione di trasformazioni lineari e non lineari.
Nel caso di una rete a **due layer** (uno hidden + output), il modello può essere scritto come:
$f(x; W, c, w, b) = w^T \, g(W^T x + c) + b$

dove:
- $W, c$ sono pesi e bias dello **strato nascosto**
- $w, b$ sono pesi e bias dello **strato di output**
- $g(\cdot)$è una funzione di attivazione del neurone 
L’obiettivo del training è trovare i parametri tali che:
$f(x) \approx f^*(x)$
##### 1️⃣ Forward propagation (classificazione / predizione)
La **forward propagation** è il processo con cui la rete:
- prende un input $x$
- lo propaga **in avanti** attraverso i layer
- produce un output $\hat y$
Formalmente:
1. hidden layer: $h = g(W^T x + c)$
2. output layer: $\hat y = w^T h + b$
In questa fase:
- **non si impara nulla**
- si calcola solo l’output dato lo stato attuale dei parametri
##### 2️⃣ Backpropagation (apprendimento vero e proprio)
La **backpropagation** è l’algoritmo che consente di:
- calcolare **come ogni parametro contribuisce all’errore**
- aggiornare i pesi usando **Gradient Descent**
![[Pasted image 20260111201107.png]]

![[Pasted image 20260111201308.png]]
- notare come in forward viene effettuato il calcolo, in questo caso con un output di 0.55
	- il tasso di errore visto il target a 1.0 è di 0.45
	- viene rimandato indietro l'errore a tutti i layer e vengono aggiornati i pesi
- **Forward pass** → calcolo dell’output
- **Loss** → misura dell’errore
- **Backward pass** → correzione dei pesi
##### **Come si induce (si apprende) un’ipotesi h a partire da esempi?**
In Machine Learning :
- l’**ipotesi $h$ è il modello
- deve approssimare una funzione target ignota
- come trovo i parametri adatti a $h$?
## 1️⃣ Cosa significa “learn the parameters $\theta$ and $b$”

L’ipotesi ha una forma fissata, ad esempio:
- $h(x; \theta, b)$
- $\theta$ (o $w$) = **pesi**
- $b$ = **bias**

👉 **Imparare $h$**non significa cambiare la formula,  
ma **trovare i valori migliori di $\theta$ e $b$**.
## 2️⃣ Perché guardiamo i dati passati (training data)

Non conosciamo la funzione vera $f^*(x)$
Quello che abbiamo sono esempi:
$(x^{(i)}, y^{(i)})$
Quindi:
- usiamo i dati passati
- per capire **quanto sbaglia il modello**
- e correggerlo
Questo è il principio dell’**apprendimento supervisionato**.
## 3️⃣ Funzione obiettivo (Objective Function)
La slide dice:
> _Objective function: the error we make on the training data_
Cioè:
- dobbiamo **misurare l’errore**
- per sapere se un’ipotesi è buona o cattiva
Questa funzione si chiama:
- **Loss function** (per un singolo esempio)
- **Cost function** o **Objective function** (su tutto il dataset)
## 4️⃣ Cosa misura la funzione di costo
Se sono uguali → errore piccolo  
Se sono molto diverse → errore grande

## 5️⃣ La formula della funzione di costo
$J(\theta,b) = \sum_{i=1}^{m} \big(h(x^{(i)};\theta,b) - y^{(i)}\big)^2$

Significa:
- $m$ = numero di esempi di training
- per ogni esempio:
    - calcolo la differenza tra **predizione** e **valore vero**
    - la elevo al quadrato (per penalizzare errori grandi)
- poi sommo tutto
👉 Questa è la **somma degli errori quadratici**.
## 6️⃣ Perché minimizzare $J(\theta,b)$
L’idea fondamentale è:
> **la migliore ipotesi è quella che sbaglia meno sui dati di training**
Quindi:
- non cerchiamo direttamente $h$
- cerchiamo i parametri $\theta, b$
- che **minimizzano la funzione di costo**
Formalmente:
$\min_{\theta,b} J(\theta,b)$
Questo porta naturalmente a:
- **Gradient Descent**
- **SGD**
- **Backpropagation** (nelle reti neurali)
##### BP(Back Propagation) as Local Search
![[Pasted image 20260111202112.png]]
Il backpropagation è un algoritmo di ricerca locale nello spazio dei parametri della rete.
Ogni neurone:
- **non conosce tutta la rete**
- per questo si dice locale
# 1️⃣ Stochastic Gradient Descent: idea generale

La slide dice:
> _Optimizing $J$ means minimizing it_
### Cosa significa davvero
- $J(\theta, b)$ è la **funzione di costo**
- misura **quanto il modello sbaglia** sui dati di training
- **imparare** significa trovare i parametri che rendono $J$ il più piccolo possibile
👉 Tutto il training ruota attorno a: $\min_{\theta,b} J(\theta,b)$
# 2️⃣ Perché “Gradient Descent”
La funzione di costo dipende dai parametri:
$J = J(\theta_1, \theta_2, \dots, b)$
Il **gradiente**:
- indica la direzione di **massima crescita**
- quindi, andando nella direzione opposta, **scendiamo** verso un minimo
Aggiornamento generale:
$\theta_i \leftarrow \theta_i - \alpha \,\Delta \theta_iθi​←θi​−αΔθi​ b←b−α Δbb \leftarrow b - \alpha \,\Delta b$
dove:
- $\Delta$ = derivate parziali della loss
- $\alpha$ = **learning rate** (quanto grande è il passo)
# 3️⃣ Perché “Stochastic”

In **SGD**:
- non si usa tutto il dataset in una volta
- si aggiornano i pesi **iterando sugli esempi** (o piccoli batch)
👉 Questo rende:
- l’algoritmo più veloce
- più rumoroso
- ma molto efficace per reti neurali grandi
# 4️⃣ Collegamento alla seconda slide: Reweighting through GD
Qui vedi **cosa succede fisicamente ai pesi**.
![[Pasted image 20260111203127.png]]
### Parte alta della figura
- la rete fa una **forward pass**
- produce un output (es. 0.55)
- confronta con il target (1.0)
- ottiene un errore (0.45)
### Parte centrale
- l’errore viene propagato all’indietro (**backpropagation**)
- si calcola: $\frac{\partial E}{\partial w_i}$
cioè:
> quanto ogni peso ha contribuito all’errore
### Parte bassa
- i pesi vengono **aggiornati**
$w_{\text{new}} = w - \eta \frac{\partial E}{\partial w}$
Noti che:
- alcuni pesi diminuiscono
- altri aumentano
- tutti cambiano **di poco**
👉 Questo è il **reweighting**.
# 5️⃣ Messa insieme (pipeline completa)
Per ogni iterazione di training:
1. **Forward pass**
    - calcolo dell’output
2. **Loss**
    - misura dell’errore
3. **Backpropagation**
    - calcolo dei gradienti
4. **SGD**
    - aggiornamento dei parametri

Ripetendo:
- l’errore diminuisce
- il modello migliora
- l’ipotesi $h$ si avvicina alla funzione target
# SISTEMI DI TRAINING PER I MODELLI
 ## 1. Il problema dell’apprendimento

In Machine Learning abbiamo sempre lo stesso obiettivo:

> **trovare i parametri di un modello che lo facciano comportare bene sui dati**

Un modello (regressione, classificatore, rete neurale) è descritto da:

- **parametri**: pesi θ\thetaθ, bias bbb
    
- una **funzione di costo** J(θ,b)J(\theta, b)J(θ,b)
    

La funzione di costo misura **quanto il modello sbaglia** sui dati di addestramento.

📌 **Imparare = minimizzare il costo**

---

## 2. La funzione di costo come superficie

Possiamo immaginare la funzione di costo come una **superficie nello spazio dei parametri**:

- ogni punto = una scelta dei parametri
    
- l’altezza = valore del costo JJJ
    

Il nostro obiettivo è trovare **il punto più basso** della superficie, cioè il **minimo**.

Questo è un **problema di ottimizzazione**.

---

## 3. L’idea del Gradient Descent

Il Gradient Descent nasce da una domanda semplice:

> _Se sono in un punto della superficie, come faccio a sapere in che direzione scendere?_

La risposta è il **gradiente**.

### Il gradiente

- è un vettore di derivate parziali
    
- indica la direzione in cui il costo cresce più velocemente
    

Se vogliamo **ridurre** il costo, dobbiamo muoverci **nella direzione opposta** al gradiente.


#### PASSAGGI DEL GD
- inizializza i parametri (casualmente)
- prende tutti gli esempi (o mini-batch)
- calcola l’errore $J$
- calcola le derivate
- aggiorna i parametri
- ripeti per molte iterazioni (epoche)
più lento!
---

## 4. La regola di aggiornamento dei parametri

Per ogni parametro del modello applichiamo la stessa idea:

nuovo parametro=vecchio parametro−α⋅∂J∂parametro\text{nuovo parametro} = \text{vecchio parametro} - \alpha \cdot \frac{\partial J}{\partial \text{parametro}}nuovo parametro=vecchio parametro−α⋅∂parametro∂J​

Nel caso della slide:

θ1=θ1−αΔθ1\theta_1 = \theta_1 - \alpha \Delta \theta_1θ1​=θ1​−αΔθ1​ θ2=θ2−αΔθ2\theta_2 = \theta_2 - \alpha \Delta \theta_2θ2​=θ2​−αΔθ2​ b=b−αΔbb = b - \alpha \Delta bb=b−αΔb

### Cosa sta succedendo?

- le **derivate** dicono _come_ il parametro influenza l’errore
    
- il **segno meno** garantisce che stiamo scendendo
    
- il tutto viene scalato da α\alphaα
    

---

## 5. Il learning rate α\alphaα

Il **learning rate** è un **iperparametro** scelto dall’essere umano.

Stabilisce **quanto grande è il passo** che facciamo:

- α\alphaα grande → passi lunghi, rischio instabilità
    
- α\alphaα piccolo → passi sicuri ma lenti


### SGD 
- prende un solo esempio dal dataset di addestramento
- molto più veloce ma meno preciso e rumoroso
- evoluzione dell'SGD
	- uso mini batch quindi uso m esempi
