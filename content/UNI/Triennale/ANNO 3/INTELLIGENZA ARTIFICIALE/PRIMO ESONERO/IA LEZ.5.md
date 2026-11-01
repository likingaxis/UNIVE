
## Agenti classici
Gli agenti classici assumono che l'ambiente sia:
- **Completamente Osservabile:** L'agente conosce tutto ciò che è rilevante per la sua decisione in ogni momento. Non ci sono informazioni nascoste.
- **Deterministico:** Ogni azione ha un unico risultato, certo e prevedibile. Se un robot decide di andare avanti, andrà avanti, senza possibilità di scivolare o deviare.
**La conseguenza di queste due assunzioni è potentissima:**
- **Pianificazione Offline:** L'agente può calcolare l'intera sequenza di azioni per raggiungere l'obiettivo prima ancora di muovere un solo passo.
- **Esecuzione senza sorprese:** Una volta creato, il piano può essere eseguito a occhi chiusi, perché si è certi che il mondo non cambierà in modi imprevisti.

### Oggi vedremo algoritmi più improntati al mondo reale

Nella realtà, i problemi sono spesso più complicati. La ricerca sistematica che esplora l'intero spazio degli stati può diventare **troppo costosa** in termini di tempo e memoria, specialmente per problemi molto grandi. Inoltre, il mondo reale è raramente così semplice e prevedibile. Questo ci spinge a riconsiderare le nostre assunzioni e a cercare approcci più flessibili e realistici.
#### 💡 Introduzione alla Ricerca Locale

La prima grande evoluzione che studiamo è la **Ricerca Locale** (Local Search). L'idea alla base è un cambio di prospettiva radicale rispetto alla ricerca classica.
##### Il Percorso non Conta, Conta la Meta
Mentre gli algoritmi classici cercano un **cammino soluzione** (una sequenza di azioni per arrivare al goal), la ricerca locale si concentra su problemi dove **la soluzione è lo stato goal stesso**.
> In molti problemi, specialmente quelli di **ottimizzazione**, non ci interessa come siamo arrivati a una soluzione, ma solo trovare lo **stato finale** che rappresenta la soluzione migliore.

Un esempio perfetto è il problema delle 8 regine: non ci interessa la sequenza di mosse per posizionare le regine, ma solo la configurazione finale in cui nessuna regina minaccia le altre. In questo caso, partiamo da uno stato completo (tutte le regine sono sulla scacchiera, anche se in conflitto) e cerchiamo di migliorarlo passo dopo passo.
##### ⚙️ Come Funziona la Ricerca Locale?
Le sue caratteristiche principali sono:
- **Non è sistematica**: 
	- Non garantisce di esplorare tutte le possibilità.
- **Mantiene solo lo stato corrente**: 
	- A differenza degli algoritmi classici che memorizzano un'intera frontiera di nodi, la ricerca locale tiene traccia solo della posizione attuale (il **nodo corrente**).
- **Si muove tra nodi adiacenti**: 
	- Ad ogni passo, valuta gli stati vicini e si sposta in uno di essi, sperando di migliorare la situazione.
- **Memoria super efficiente**: 
	- Non tenendo traccia dei cammini passati, consuma una quantità di memoria minima e costante.
- **Ideale per problemi di ottimizzazione**: 
	- È perfetta per trovare lo stato "migliore" secondo una **funzione obiettivo** (che vogliamo massimizzare) o lo stato a **costo minore** (che vogliamo minimizzare).
### Lo spazio degli stati
![[Pasted image 20251028154347.png]]
L'algoritmo non vede tutta la mappa in una volta. Agisce come un esploratore che può solo sondare il terreno immediatamente circostante.
- **La Superficie (il "terreno")**: Rappresenta l'intero **spazio degli stati**. Ogni singolo punto sulla superficie è una possibile configurazione del problema.
- **L'Altitudine (l'asse verticale)**: È il valore della **funzione obiettivo** (o di valutazione). Misura la "bontà" di uno stato. Più alto è il punto, migliore è la soluzione (in un problema di massimizzazione).

1. **Stato Corrente**: L'algoritmo si trova in un punto (current state).
2. **Valutazione dei Vicini**: Esamina gli stati adiacenti (raggiungibili con una piccola mossa).
3. **Movimento**: Si sposta verso il vicino che ha l'altitudine migliore (più alta o più bassa, a seconda dell'obiettivo).


L'obiettivo finale è trovare il punto migliore dell'intera mappa.
- **Ottimo Globale (global maximum)**: È il picco più alto in assoluto, ovvero la **migliore soluzione possibile**.
Tuttavia, il paesaggio è complesso e pieno di "trappole" che possono ingannare un algoritmo semplice.
- **Ottimo Locale (local maximum) ⛰️**:
    - **Cos'è**: Un picco che è più alto di tutti i suoi vicini, ma **non è il picco più alto** dell'intera mappa.
    - **Il Problema**: Un algoritmo "ingordo" (greedy) che cerca solo il miglioramento immediato si **bloccherà** qui, pensando di aver trovato la soluzione, perché ogni mossa lo porterebbe più in basso.
- **Altopiano (shoulder o plateau) 🏜️**:
    - **Cos'è**: Una zona piatta dove tutti i vicini hanno la stessa altezza.
    - **Il Problema**: L'algoritmo non sa in che direzione muoversi per migliorare e potrebbe vagare a caso o fermarsi.
### 🧗‍♂️ Ricerca in Salita (Hill Climbing): L'Approccio dell'Alpinista "Ingordo"

L'Hill Climbing è l'algoritmo di ricerca locale più semplice e intuitivo. Se immaginiamo il nostro problema come un paesaggio montuoso (come nella slide precedente), l'Hill Climbing si comporta come un alpinista che, ad ogni passo, sceglie la direzione che lo porta più in alto possibile, senza avere una mappa completa.
È un approccio **greedy** (ingordo), perché prende sempre la decisione che sembra migliore nell'immediato, senza alcuna pianificazione a lungo termine.
##### ⚙️ Come Funziona il Processo?
L'algoritmo è un ciclo continuo che si ripete fino a quando non può più migliorare:
1. **Partenza**: Si inizia da uno stato iniziale casuale (nodo-corrente).
2. **Esplorazione**: Si generano tutti gli stati successori (i "vicini") dello stato attuale.
3. **Valutazione**: Si calcola il valore della funzione obiettivo per ogni vicino.
4. **Movimento**: Ci si sposta nello stato che rappresenta un miglioramento.
5. **Ripetizione**: Il nuovo stato diventa il nodo-corrente e il ciclo ricomincia.

**Importante**: l'algoritmo non tiene traccia degli stati precedenti o di altre alternative. Mantiene in memoria solo la sua posizione attuale, rendendolo estremamente efficiente in termini di spazio.
#### 🧭 Le Varianti dell'Hill Climbing

Esistono diversi modi per scegliere il "passo" successivo. La prima slide ne elenca tre:
- **⛰️ Salita Rapida (Steepest-Ascent)**: Si sceglie il vicino **migliore in assoluto**, quello che garantisce il maggior guadagno. È la versione descritta nello pseudocodice.
- **🎲 Stocastico (Stochastic)**: Si sceglie **a caso** tra tutti i vicini che rappresentano un miglioramento. Non garantisce il passo migliore, ma è più veloce se valutare tutti i vicini è costoso.
- **👆 Prima Scelta (First-Choice)**: Si generano i vicini uno alla volta e ci si sposta sul **primo** che risulta essere migliore dello stato attuale, senza esaminare gli altri. È molto efficiente se ci sono tanti successori.
#### 🔍 Analisi dell'Algoritmo (Pseudocodice)
![[Pasted image 20251028160108.png]]
#### 🛑 Il Punto Debole: Il Fallimento
Come menzionato nella prima slide: "Se non ci sono stati successori migliori l'algoritmo termina con fallimento".

> **Cosa significa "fallimento"?** Non significa che il programma va in crash. Significa che l'algoritmo **fallisce nel trovare l'ottimo globale**. Si blocca in una soluzione sub-ottimale (un massimo locale) perché la sua natura "ingorda" e a breve termine gli impedisce di fare una mossa temporaneamente peggiore per raggiungere, in seguito, un picco più alto.

### 👑 Il Problema delle 8 Regine: Hill Climbing in Azione

Il problema delle 8 Regine è l'esempio perfetto per vedere l'Hill Climbing al lavoro, con i suoi pregi e i suoi difetti. L'obiettivo è posizionare 8 regine su una scacchiera in modo che nessuna possa attaccarne un'altra.

![[Pasted image 20251028161005.png]]

#### 🎯 Preparare il Terreno: La Formulazione per la Ricerca Locale

Per usare l'Hill Climbing, dobbiamo definire tre cose fondamentali:

1. **Lo Stato**: Si parte da una configurazione "completa", cioè con tutte le 8 regine già sulla scacchiera, una per ogni colonna. Questo assicura che non ci siano mai conflitti verticali.
    
2. **La Funzione Obiettivo (h)**: È il nostro "termometro" della qualità. In questo caso, **h = numero di coppie di regine che si attaccano a vicenda** (orizzontalmente o in diagonale).
    
    - L'obiettivo finale è trovare uno stato con **h = 0**. Vogliamo quindi **minimizzare** il valore di h.
        
3. **I Successori (le mosse)**: Uno stato successore si ottiene prendendo una regina e spostandola in una qualsiasi delle altre 7 caselle della sua stessa colonna.
    

> **Perché i successori sono 7x8?**  
> Semplice: abbiamo **8** regine (una per colonna) e per ognuna di esse ci sono **7** possibili nuove posizioni nella sua colonna. Totale mosse possibili: 8 × 7 = 56.

---

#### ⚙️ L'Algoritmo al Lavoro: Un Passo di "Discesa"

La seconda slide ci mostra un passo concreto dell'algoritmo (nella sua versione a "salita rapida", che in questo caso è una "discesa rapida" perché minimizziamo).

1. **Stato Iniziale**: Partiamo da una configurazione molto scarsa, con h = 17 (17 coppie di regine in conflitto).
    
2. **Valutazione dei Successori**: L'algoritmo calcola il valore di h per ognuno dei 56 stati successori. La scacchiera con i numeri mostra esattamente questo: ogni numero in una casella vuota indica quale sarebbe il valore di h se spostassimo la regina di quella colonna in quella casella.
    
3. **La Scelta "Greedy"**: L'algoritmo cerca la mossa che porta al miglioramento più grande, ovvero allo stato con il valore di h **più basso**. In questo caso, il valore minimo che si può ottenere è **12**.
    
4. **Gestione dei Pareggi**: Ci sono più mosse che portano a uno stato con h = 12. L'algoritmo ne **sceglie una a caso** e si sposta in quella nuova configurazione. Il ciclo poi ricomincia da lì.
    

---

#### 🛑 La Trappola: Bloccati in un Minimo Locale

La terza slide mostra il vero punto debole dell'Hill Climbing.

- **La Situazione**: L'immagine mostra una configurazione quasi perfetta, con **h = 1**. C'è solo una coppia di regine che si minacciano (evidenziate dal cerchio e dalla linea rossa).
    
- **Il Problema**: Da questa posizione, **qualsiasi mossa possibile peggiora la situazione**. Se proviamo a spostare una qualsiasi regina per risolvere quell'unico conflitto, finiremo inevitabilmente per crearne di nuovi, risultando in uno stato con h > 1.
    
- **La Conseguenza**: L'algoritmo Hill Climbing, valutando tutti i suoi 56 vicini e vedendo che nessuno di essi ha un valore h inferiore a 1, si convince di essere arrivato alla soluzione migliore possibile.
    
    > L'algoritmo **si blocca e termina**, restituendo questa soluzione imperfetta.
    
Questa configurazione è un **minimo locale**: è migliore di tutti i suoi vicini, ma non è la soluzione ottima (h = 0), che sarebbe il **minimo globale**.

### 🧗‍♀️ I Problemi con l'Hill Climbing: Perché l'Alpinista si Perde

Abbiamo visto che l'Hill Climbing è veloce ma spesso fallisce. La prima slide riassume in modo visuale le "trappole" del paesaggio dello spazio degli stati che ingannano il nostro algoritmo "ingordo".

1. **⛰️ Massimi Locali (le "colline")**:
    
    - **Il problema**: L'algoritmo raggiunge un picco (collina) che non è il più alto in assoluto (montagna). Da lì, ogni mossa è in discesa, quindi l'algoritmo si ferma, convinto di aver finito. È la trappola più comune.
![[Pasted image 20251028162118.png]]

        
2. **🏜️ Altipiani (Plateaux)**:
    
    - **Il problema**: L'algoritmo arriva in una zona piatta, dove tutte le mosse vicine hanno lo stesso valore. Non essendoci una "salita" chiara, non sa dove andare e potrebbe vagare a caso o terminare prematuramente.

![[Pasted image 20251028162130.png]]

2. **🔪 Crinali (o Creste)**:
    
    - **Il problema**: Una situazione più rara e complessa. Immagina di essere sulla cresta di una montagna. Per continuare a salire lungo la cresta, potresti dover fare una serie di mosse coordinate (es. due passi in diagonale). Un algoritmo che esamina una sola mossa alla volta (es. solo Nord, Sud, Est, Ovest) vedrà solo discese ripide su entrambi i lati e si bloccherà, non riuscendo a vedere il percorso complesso che gli permetterebbe di salire.
![[Pasted image 20251028162157.png]]
### 💪 Estensioni e Miglioramenti: Come Rendere l'Alpinista più Intelligente

Dato che l'Hill Climbing di base è inaffidabile, sono state sviluppate diverse strategie per aiutarlo a superare queste trappole.

#### 1. Consentire Mosse Laterali ↔️
- **L'idea**: Per sfuggire agli altipiani e alle "spalle" delle colline, permettiamo all'algoritmo di muoversi "lateralmente", cioè di spostarsi verso un vicino con lo **stesso valore**, sperando che da lì si apra un nuovo percorso in salita.
	- **Come funziona**: Si imposta un limite al numero di mosse laterali consecutive per evitare loop infiniti su un altopiano.
	- **Efficacia**: Nel problema delle 8 regine, questa semplice modifica aumenta la percentuale di successo dal 14% al **94%**! Il prezzo da pagare è un numero maggiore di passi per trovare la soluzione.
#### 2. Hill Climbing Stocastico 🎲
- **L'idea**: Invece di scegliere sempre il passo "migliore" (salita rapida), si sceglie **a caso** tra tutte le mosse che portano a un miglioramento.
	- **Perché funziona**: Introduce un elemento di casualità che può aiutare a esplorare percorsi diversi, a volte meno ovvi ma più promettenti. Si può anche pesare la probabilità di scelta in base alla "pendenza" (i miglioramenti maggiori sono più probabili).
	- **Efficacia**: Generalmente converge più lentamente, ma a volte può trovare soluzioni migliori evitando percorsi che portano a massimi locali poco interessanti.
#### 3. Hill Climbing Casuale con Prima Scelta 👆
- **L'idea**: Combina la casualità con l'efficienza. Invece di valutare tutti i vicini, li genera in ordine casuale e si sposta sul **primo** che trova che sia migliore dello stato attuale.
	- **Efficacia**: È molto utile quando il numero di successori è enorme. Invece di perdere tempo a calcolare il valore di tutti, si "accontenta" del primo miglioramento che trova, accelerando il processo.
#### 4. Hill climbing con riavvio casuale
- Se si blocca, RIPARTE DA UN NUOVO STATO INIZIALE CASUALE
	- Ripete questo processo più volte finché non trova una soluzione ottimale.
	- TENDENZIALMENTE è **completo** (basta ripetere!!)
	- Il funzionamento **non dipende molto dalla forma** del paesaggio, perché il riavvio consente di "saltare" in zone nuove.

## Simulated Annealing (Tempra simulata)
È una combinazione tra:
- **Hill Climbing**, che cerca sempre di migliorare lo stato,
- e una **scelta stocastica controllata**, che _a volte_ accetta anche stati peggiori.

Questo serve a **scappare dai massimi locali**:  
accettare temporaneamente un peggioramento può permettere di uscire da una “collina” e raggiungere un picco più alto (la soluzione globale).

#### Il ruolo della temperatura
La temperatura `T` controlla quanto l’algoritmo è disposto ad accettare peggioramenti:
- all’inizio `T` è alta → le mosse peggiori vengono accettate spesso (esplorazione ampia);
- col tempo `T` scende → il comportamento diventa più “rigido”, simile all’Hill Climbing.

👉 Quando la temperatura è molto bassa, l’algoritmo si comporta come un normale Hill Climbing deterministico.


#### Funzionamento effettivo
A ogni iterazione, l’algoritmo sceglie **un successore a caso** dello stato corrente (cioè una nuova possibile soluzione vicina).  
Poi decide **se accettarlo o no**, secondo queste regole:
1. ***CASO 1***: il successore è migliore della soluzione attuale
	- Se il nuovo stato `n'` ha un valore migliore di quello attuale `n` -> viene accettato subito (hill climbing classico)
	
2. ***CASO 2***: il successore è peggiore
	- se `n'` è peggiore (cioè $\Delta E = f(n^{'}) - f(n) < 0$) -> l'algoritmo può **accettarlo comunque**, ma con una **certa probabilità** $$p = e^{\Delta E/T}$$dove
		- $\Delta E$ è il peggioramento 
		- $T$ è la tempra corrente
		Poiché $\Delta E < 0$, il valore di $e^{\Delta E/T}$ sarà compreso tra `0` e `1`
	
	👉 Quindi, l’algoritmo **genera un numero casuale tra 0 e 1** e **accetta il nuovo stato** solo se il numero casuale è **minore di p**.  
	In pratica: più la mossa è “poco peggiore”, più è probabile che venga accettata.

##### Ruolo della temperatura `T`
La temperatura **controlla la probabilità di accettare peggioramenti**:
- Quando `T` è **alta**, anche stati peggiori vengono accettati spesso → grande esplorazione.
- Quando `T` **scende**, la probabilità diminuisce → il comportamento diventa più “rigido”, simile a Hill Climbing.

Man mano che l’algoritmo avanza, `T` **decresce gradualmente** secondo un piano definito (chiamato _cooling schedule_), ad esempio: $$T_{k+1} = \alpha \cdot T_{k} \ \ \  \ \ \text{con 0} < \alpha \ \text{< 1}$$
#### Altre caratteristiche
- p è **inversamente proporzionale al peggioramento**: se una mossa peggiora molto, sarà accettata con una probabilità più bassa.
- Col passare del tempo, `T` si riduce → anche `p` si riduce → l’algoritmo diventa sempre più selettivo.
- Alla fine, quando `T` è molto bassa, il comportamento converge a un **Hill Climbing deterministico**.

### Algoritmo
![[Pasted image 20251029193033.png]]![[Pasted image 20251029193044.png]]

# Ricerca local beam
L’idea della **ricerca local beam** nasce per affrontare i limiti di memoria della ricerca locale tradizionale, che di solito mantiene un solo stato alla volta (come nell’Hill Climbing).  
In questo caso, invece, **vengono mantenuti contemporaneamente `k` stati**.

### Funzionamento
1. L’algoritmo inizia con `k` stati generati casualmente.
2. A ogni passo:
    - Si generano **tutti i successori** di questi `k` stati.
    - Se uno dei successori è una **soluzione**, l’algoritmo termina.
    - Altrimenti, si **selezionano i `k` migliori successori** (in base alla funzione di valutazione) e si ripete il processo.

### Differenza con la ricerca a riavvio casuale
A prima vista, la local beam può sembrare semplicemente **una versione parallela** della ricerca con riavvio casuale (che esegue più ricerche indipendenti).  

In realtà, **non è così**:
- Nella **ricerca a riavvio casuale**, ogni ricerca procede indipendentemente.
- Nella **local beam**, invece, **le ricerche comunicano tra loro**:
    - le informazioni sui migliori stati trovati vengono condivise,
    - e le risorse si concentrano dove i progressi sono più promettenti.

In questo modo, l’algoritmo **abbandona rapidamente** le direzioni poco fruttuose e continua a esplorare quelle più promettenti.

### ⚠️ Problema principale
Con il tempo, i `k` stati possono **convergere tutti nella stessa zona** dello spazio delle soluzioni (formando un _cluster_).  
Questo riduce la diversità della ricerca e la rende **simile a un Hill Climbing moltiplicato per `k`** — quindi più lenta ma non necessariamente più efficace.

### 🎲 Variante: Ricerca Beam Stocastica
Per evitare questa mancanza di diversificazione, esiste una variante chiamata **ricerca beam stocastica**:
- invece di scegliere sempre i migliori `k` successori,
- si scelgono **in modo probabilistico**, con una probabilità **proporzionale al loro valore euristico**.

Così si bilancia **esplorazione e sfruttamento**, evitando che tutti i cammini si concentrino sugli stessi stati promettenti.


---

# Ricerca con azioni non deterministiche
### 🧩 Contesto di partenza
Negli algoritmi di ricerca classici, si assume che:
- l’ambiente sia **completamente osservabile** (cioè l’agente sa sempre dove si trova);
- e che sia **deterministico**, quindi ogni azione ha **un solo risultato prevedibile**.

In questo caso, il piano è semplicemente una **sequenza di azioni** fisse, decise in anticipo (_offline_), e le percezioni servono solo **all’inizio** per determinare lo stato iniziale.

### ⚙️ Quando l’ambiente non è deterministico
In un ambiente **non deterministico** o **parzialmente osservabile**, la situazione cambia:
- l’agente **non conosce esattamente lo stato attuale** in cui si trova;
- e non può sapere **in quale stato arriverà** dopo aver eseguito un’azione.

Per gestire questa incertezza, l’agente mantiene un **insieme di stati possibili**, detto **stato-credenza** (_belief state_), cioè l’insieme di tutte le situazioni che ritiene plausibili.


### 🧠 Piani condizionali
In questi ambienti, una semplice sequenza di azioni non basta.  
Serve un **piano condizionale** (o _piano di contingenza_), cioè una **strategia** che specifica:
> “cosa fare in base a ciò che l’agente percepisce lungo il percorso”.

In pratica, il piano si adatta **alle percezioni e agli eventi imprevisti** durante l’esecuzione.


>[!tip]- 🧹 Esempio: Il mondo dell’aspirapolvere erratico
In questo ambiente:
>
>- Se l’azione **Aspira** è eseguita su un riquadro **sporco**, può:
>    
>    - pulirlo normalmente,
>        
>    - **e a volte pulire anche un riquadro adiacente**.
>        
>- Se invece è eseguita su un riquadro **già pulito**, può **sporcarlo di nuovo** in modo casuale.
>    
>
>Quindi l’ambiente è **non deterministico**, perché lo stesso comando può produrre **risultati diversi**.


### 🔄 Generalizzazione del modello di transizione
Per modellare questo comportamento, si passa:
- da una funzione classica **Risultato(s, a)** → _ritorna un solo stato_,
- a una nuova funzione **Risultati(s, a)** → _ritorna un insieme di stati possibili_.

In questo modo possiamo rappresentare tutti gli esiti che un’azione può produrre.


---

# Alberi di ricerca AND-OR
Quando ci troviamo in **ambienti non deterministici**, l’albero di ricerca classico (quello usato negli ambienti deterministici) **non basta più**.  
In questi casi si utilizza una struttura chiamata **albero AND–OR**, che rappresenta sia **le scelte dell’agente** sia **le incertezze dell’ambiente**.
### 🧠Differenza tra nodi OR e nodi AND
- **Nodi OR** → rappresentano **le scelte dell’agente**  
    Esempio: “Posso muovermi a destra oppure aspirare”.  
    L’agente sceglie **una sola** delle azioni disponibili.
    
- **Nodi AND** → rappresentano **le diverse conseguenze possibili di una stessa azione**, causate dall’ambiente non deterministico.  
    Esempio: “Se aspiro, potrei ottenere due risultati diversi: il pavimento resta sporco oppure si pulisce”.

Questi due tipi di nodi **si alternano** nell’albero:
- ai nodi OR corrispondono le decisioni dell’agente,
- ai nodi AND corrispondono i possibili risultati dell’ambiente.

Il risultato è un **albero di ricerca AND–OR**, dove la ricerca deve tener conto sia delle proprie scelte che delle reazioni dell’ambiente.

![[Pasted image 20251029193155.png]]
- NODI OR -> cerchio singolo
- NODI AND -> cerchio singolo + semicerchio


### ✅ Soluzione di un problema AND–OR
Una **soluzione** non è una semplice sequenza di azioni (come nei problemi deterministici), ma un **sottoalbero** dell’albero di ricerca che rispetta tre condizioni:
1. Ogni **foglia** del sottoalbero è un **nodo obiettivo**.
2. In ogni **nodo OR**, è specificata **una sola azione** da eseguire.
3. In ogni **nodo AND**, **tutti i rami** devono essere inclusi, perché rappresentano i diversi possibili risultati dell’ambiente.


### Pseudocodice
![[Pasted image 20251029193206.png]]


## Soluzioni cicliche per problemi non deterministici
Pensiamo al **mondo dell’aspirapolvere scivoloso**, una variante del classico problema dell’aspirapolvere in cui:
- le azioni di movimento (**Sinistra**, **Destra**) **a volte falliscono**,
- e quindi l’agente può **rimanere fermo** anche se ha tentato di spostarsi.

### 🧩 Problema
A causa di questo comportamento **non deterministico**, non esiste una **soluzione aciclica** che porti sempre con certezza allo stato obiettivo.  
Se usassimo la normale ricerca AND–OR, l’algoritmo **fallirebbe**, perché non troverebbe un piano che garantisca il successo in tutti i casi.

### 🔁 Soluzione ciclica
Esiste però una **soluzione ciclica**, che consiste nel **ripetere un’azione finché non riesce**.  
Per esempio:
> “Continua a provare **Destra** finché non ti sposti davvero a destra”.

In pseudocodice, questa soluzione si esprimerebbe con un costrutto simile a:
```scss
while (non sei nel riquadro destro)
    esegui Destra
```

### Esempio visivo
![[Pasted image 20251029193219.png]]

### ⚙️ Condizioni di correttezza
Perché un piano ciclico sia valido, devono valere due condizioni:
1. **Ogni foglia** (cioè ogni possibile esito del piano) deve essere uno **stato obiettivo**;
2. Da **ogni punto del piano**, deve esserci **almeno un percorso** che porta a una foglia obiettivo.

In altre parole, qualunque cosa accada, esiste sempre una sequenza di azioni che **prima o poi** porta alla soluzione.

>[!danger] ATTENZIONE: l'ultima frase di prima è vera SE E SOLO SE il fallimento è dovuto a una casualità; se invece il fallimento è dovuto a una condizione fissa e non osservata, ripetere non cambierà nulla. 


---

# Ricerca con osservazioni parziali
Quando l’agente si trova in un ambiente **parzialmente osservabile**, le sue percezioni **non bastano per sapere con certezza in quale stato si trova**.  
In questi casi, l’agente deve **gestire l’incertezza**, e a volte alcune delle sue azioni servono **non tanto a raggiungere un obiettivo**, ma a **raccogliere informazioni** e ridurre il dubbio sul proprio stato attuale.

### 🧠 Ricerca in assenza di osservazioni (problema senza sensori)
Se l’agente **non riceve nessuna informazione** dal mondo (cioè non ha sensori), si parla di **problema senza sensori** o **problema conformante**.

In questo tipo di problema:
- L’agente non sa dove si trova né lo stato esatto del mondo.
- Tuttavia, può comunque **ragionare su un insieme di stati possibili**, chiamato **stato-credenza (belief state)**.


>[!tip]- 🧩 Esempio: il mondo dell’aspirapolvere senza sensori
Immaginiamo il mondo dell’aspirapolvere deterministico, ma:
>- l’agente **conosce la mappa** del suo ambiente (sa che ci sono due stanze, ad esempio),
>- però **non sa dove si trova né quali riquadri sono sporchi**.
>
>Il suo stato iniziale, quindi, non è un singolo stato fisico, ma **l’insieme di tutti gli stati possibili**:
>
> {1, 2, 3, 4, 5, 6, 7, 8}
>
>Questo insieme rappresenta il **suo stato-credenza iniziale**.


### ⚙️ Come si svolge la ricerca
In questo caso, la ricerca non si svolge nello spazio degli stati reali, ma nello **spazio degli stati-credenza**.  
Ogni stato-credenza rappresenta **tutte le situazioni fisiche possibili** in cui l’agente potrebbe trovarsi.

In questo nuovo spazio:
- il problema diventa **completamente osservabile**,  
    perché l’agente conosce sempre **il proprio stato-credenza**, anche se non sa quale stato fisico specifico sta vivendo.


### 🧩 Componenti del problema di stati-credenza
1. **Stati:**  
    Ogni stato-credenza è un sottoinsieme degli stati fisici originali.  
    Se il problema `P` ha **`N` stati fisici**, allora il nuovo problema può avere fino a **2ⁿ stati-credenza**, anche se non tutti sono effettivamente raggiungibili.
    
2. **Stato iniziale:**  
    Di solito è l’insieme di **tutti gli stati fisici possibili**, ma può essere ridotto se l’agente ha informazioni parziali.
    
3. **Azioni:**  
    Sono l’insieme di tutte le azioni possibili nei vari stati fisici inclusi nello stato-credenza.  
    In pratica:
    - se un’azione è lecita in almeno uno degli stati, può essere considerata;
    - ma se è pericolosa o dannosa in certi stati, conviene includere solo quelle **sicure in tutti**.
    
4. **Modello di transizione:**  
    L’effetto di un’azione su uno stato-credenza è l’**unione** di tutti gli stati ottenibili applicando quell’azione a ciascuno degli stati possibili del belief state.
    
5. **Test obiettivo:**  
    Uno stato-credenza soddisfa l’obiettivo se **almeno uno dei suoi stati fisici** soddisfa la condizione obiettivo.
    
6. **Costo dell’azione:**  
    Se un’azione ha **costi diversi** nei vari stati, il costo nel belief state può essere:
    - il **valore medio** dei costi possibili,
    - oppure una **stima prudente** (es. il massimo), in base all’approccio adottato.


### Come vengono aggiornati gli stati credenza (versione deterministica e non)
![[Pasted image 20251029193235.png]]

### Spazio degli stati completo
![[Pasted image 20251029193247.png]]
Quando si lavora con stati-credenza, lo spazio cresce esponenzialmente: nel caso dell’aspirapolvere con 8 stati fisici si avrebbero 2⁸ = 256 stati-credenza, ma solo 12 realmente raggiungibili.  
Per evitare esplorazioni inutili si usa una **ricerca su grafo**, ignorando gli stati già visitati.  

Si può anche **potare** in modo più efficiente:
- se uno stato già incontrato `s'` è contenuto in `s` (`s'⊂s`), `s` è inutile e si scarta;
- se `s` è contenuto in `s'` (`s⊂s'`) e da `s'` esiste una soluzione, anche `s` si può scartare.

Poiché rappresentare tutti gli stati è costoso, si può applicare una **ricerca incrementale**:  
si trova una soluzione per un singolo stato, poi si verifica se funziona anche per gli altri.  
Questo approccio riduce i fallimenti precoci e mira a ottenere **una sola soluzione valida per tutti gli stati possibili**.


---

# Ricerca in ambienti parzialmente osservabili
In molti casi, un agente **non può risolvere un problema senza sensori**, perché non saprebbe mai in quale stato si trova.  

Per gestire questo tipo di situazioni, nella definizione del problema si introduce una funzione chiamata **Percezione(s)**, che restituisce la percezione che l’agente riceve quando si trova nello stato `s`.

Se i sensori sono **non deterministici**, la funzione diventa **Percezioni(s)**, e restituisce **un insieme di percezioni possibili**.
- Nei problemi **completamente osservabili**, vale **Percezione(s) = s**, perché l’agente conosce lo stato con certezza.
- Nei problemi **senza sensori**, invece, **Percezione(s) = null**, poiché l’agente non riceve alcuna informazione.

### 🧠 Transizione in ambienti parzialmente osservabili
Quando l’agente esegue un’azione, il passaggio da uno stato-credenza al successivo avviene in **tre fasi distinte**:
1. **Fase di predizione**  
    Si calcola lo **stato-credenza previsto** dopo aver eseguito un’azione, esattamente come nel caso senza sensori.  
    
2. **Fase delle percezioni possibili**  
    A partire dallo stato-credenza previsto, si calcola l’insieme di **tutte le percezioni** che l’agente potrebbe osservare.  
    Questa fase serve a stimare che tipo di informazioni i sensori potranno fornire.
    
3. **Fase di aggiornamento**  
    Per ogni possibile percezione, si calcola il nuovo **stato-credenza aggiornato**, che contiene solo gli stati coerenti con quella percezione.  
    In altre parole, si eliminano gli stati incompatibili con ciò che l’agente ha percepito.

Mettendo insieme le tre fasi (predizione → percezioni → aggiornamento), si ottiene l’insieme **dei possibili stati-credenza** che possono risultare da una data azione, tenendo conto anche delle percezioni future.

Durante la pianificazione, l’agente **non conosce ancora le percezioni future** che riceverà, ma deve comunque tenerne conto.  


---

# Agenti per ricerca online e ambienti sconosciuti
Finora abbiamo parlato di agenti che usano **ricerca offline**, cioè che **calcolano tutto il piano d’azione prima di iniziare ad agire**.  

Negli **ambienti reali**, però, questo approccio non sempre è possibile:  
l’ambiente può cambiare, le informazioni possono essere incomplete o il tempo per pianificare può essere limitato.  
In questi casi entra in gioco la **ricerca online**.

### 🧠 Cos’è la ricerca online
Nella **ricerca online**, l’agente **non pianifica tutto in anticipo**, ma alterna continuamente:
1. **Azione** – esegue un passo nell’ambiente;
2. **Osservazione** – percepisce il nuovo stato o le conseguenze dell’azione;
3. **Aggiornamento** – decide la prossima mossa in base a ciò che ha imparato.

La ricerca online è particolarmente efficace in:
- **ambienti dinamici o semidinamici**, dove lo stato del mondo cambia rapidamente e non c’è tempo per calcolare tutto in anticipo;
- **ambienti non deterministici**, dove le azioni possono produrre risultati diversi, e l’agente deve reagire alle situazioni reali che si verificano, invece di pianificare per tutte le possibilità teoriche.


>[!tip] PIANIFICAZIONE vs AZIONE
>C’è un compromesso importante: più un agente pianifica in anticipo, meno rischia di trovarsi in difficoltà; ma più pianifica, più tempo impiega prima di agire.
>
>Un buon agente deve quindi **bilanciare** il tempo speso a pianificare e quello speso ad agire.


### In ambienti sconosciuti
In un **ambiente sconosciuto**, l’agente **non conosce gli stati né gli effetti delle azioni**.  
Deve quindi imparare tutto **sperimentando**:
- ogni azione diventa un **test**,
- le osservazioni raccolte servono per **costruire progressivamente un modello** dell’ambiente.

Un esempio tipico è il **problema della costruzione di mappe**:  
un robot esplora un ambiente che non conosce, registrando passo dopo passo la posizione degli ostacoli e aggiornando la sua mappa interna.


### Problemi di ricerca online
Un **problema di ricerca online** si risolve attraverso tre attività fondamentali: **elaborazione, percezione e azione**.  
A differenza della ricerca offline, l’agente **non può conoscere in anticipo** il risultato di un’azione:  
non può cioè determinare **Risultato(s, a)** se non **trovandosi effettivamente nello stato `s` ed eseguendo l’azione `a`**.

In alcuni casi, l’agente può disporre di una **funzione euristica ammissibile h(s)**, che fornisce una stima della distanza tra lo stato corrente e uno stato obiettivo.

#### 🧩 Assunzioni per un problema di esplorazione
Nel contesto della ricerca online, si assumono le seguenti condizioni:
- Solo **lo stato corrente** è osservabile, mentre l’ambiente è **ignoto**.
- Non si conoscono **gli effetti** delle azioni né il **loro costo**.
- Gli **stati futuri** e le **azioni possibili** non sono noti a priori.
- L’agente deve eseguire **azioni esplorative** come parte della risoluzione del problema.

#### 🧠 Conoscenze dell’agente online nello stato s
Quando l’agente si trova in uno stato `s`, le sue conoscenze sono limitate a:
- le **azioni legali** nello stato attuale;
- il risultato **Risultato(s, a)**, ma solo **dopo aver eseguito l’azione `a`**;
- il **costo della mossa** $c(s, a, s^{'})$, anch’esso noto solo dopo l’esecuzione;
- il **Goal-Test(s)**, per verificare se lo stato è un obiettivo;
- la **stima della distanza** dal goal fornita dalla funzione euristica `h(s)`.

#### ⚙️ Obiettivo e costo della ricerca
Generalmente, lo scopo dell’agente è **raggiungere uno stato obiettivo minimizzando il costo complessivo del percorso**.  
Questo costo rappresenta **la somma effettiva dei costi delle azioni realmente eseguite**.

È prassi comune confrontare questo costo con quello che l’agente **avrebbe sostenuto conoscendo già l’intero spazio di ricerca** (cioè il cammino ottimo in un ambiente noto).  
Il rapporto tra questi due valori è chiamato **rapporto di competitività (competitive ratio)**, e idealmente dovrebbe essere **il più piccolo possibile**.

#### ⚠️ Limiti e problemi della ricerca online
Gli agenti di ricerca online sono **vulnerabili ai vicoli ciechi**, ossia a stati dai quali **non è più possibile raggiungere l’obiettivo**.  
Se l’agente **non conosce il significato delle azioni**, può compiere scelte che lo portano in situazioni **irreversibili** o da cui non può più uscire.

In generale, **nessun algoritmo può evitare i vicoli ciechi in tutti gli spazi degli stati**.  
Gli ambienti sono **esplorabili in modo sicuro** solo se:
- **non esistono azioni irreversibili**, e
- **lo stato obiettivo è sempre raggiungibile**.

Tuttavia, anche in questi casi, **non è garantito un rapporto di competitività limitato**, quindi la ricerca online può risultare comunque meno efficiente rispetto a una pianificazione offline completa.


## Agenti per ricerca online
Gli agenti online ad ogni passo decidono l'**azione da fare** (non il piano) e la eseguono.
La ricerca in profondità online consiste nell’esplorazione sistematica delle alternative, è
necessario ricordarsi ciò che si è scoperto. 
Il backtracking significa appunto tornare sui propri passi.


### Ricerca locale online
Nella **ricerca online**, il valore della **funzione euristica** è conosciuto **solo dopo aver esplorato effettivamente uno stato**.  
Come la ricerca in profondità, anche la **ricerca Hill Climbing** è locale: infatti espande solo gli stati vicini e **mantiene in memoria un solo stato per volta**.  
Per questo motivo, l’Hill Climbing può essere considerato **un algoritmo già online**.


### ⚠️ Limiti dell’Hill Climbing
Nonostante la sua natura locale, l’Hill Climbing **non è efficace per l’esplorazione**, perché:
- può **bloccarsi in un massimo locale**;
- non può utilizzare **riavvii casuali** come nella versione offline, poiché l’agente non ha la possibilità di “teletrasportarsi” in un nuovo stato iniziale.


### 🧩 Alternative ai riavvii casuali
Per superare questi limiti, si possono usare due varianti:
1. **Random Walk**  
    L’agente, in alcuni casi, sceglie **casualmente una delle azioni possibili** nello stato corrente.  
    Questo introduce una componente di casualità che può aiutarlo a uscire da massimi locali.
    
2. __Apprendimento Real-Time (LRTA)__  
    In alternativa, si può rendere l’Hill Climbing **più intelligente** aggiungendo **memoria e apprendimento** anziché casualità.  
    L’agente **aggiorna i valori euristici** man mano che esplora, rendendoli progressivamente più realistici.  
    Questo approccio è chiamato **LRTA*** (_Learning Real-Time A*_).


### ⚙️ Funzionamento di LRTA
L’algoritmo LRTA* simula il comportamento di A*, ma **in tempo reale** e **in modo locale**:
- aggiorna la **stima del costo** dello stato appena lasciato;
- poi sceglie la **mossa apparentemente migliore** in base alle stime correnti della funzione euristica `H`.  
    In questo modo l’agente impara progressivamente a valutare meglio i costi reali del percorso.
![[Pasted image 20251030112816.png]]
![[Pasted image 20251030112825.png]]


### 📊 Proprietà di LRTA
- È **completo** negli spazi **esplorabili in modo sicuro** (cioè senza azioni irreversibili).
- Nel **caso peggiore**, visita **ogni stato due volte**, ma in media è **più efficiente della ricerca in profondità online**.
- **Non è ottimale**, a meno che l’agente non disponga di **un’euristica perfetta**.
