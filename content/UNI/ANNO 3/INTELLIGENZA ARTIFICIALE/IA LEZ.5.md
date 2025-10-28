
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
### ✨ La Soluzione Definitiva: Hill Climbing con Riavvio Casuale (Random Restart)
Questa è la strategia più potente ed efficace per risolvere i problemi dell'Hill Climbing.
- **L'idea**: È brutalmente semplice. Se l'algoritmo Hill Climbing si blocca in un massimo locale, **non arrenderti**. **Ricomincia da capo** da un nuovo punto di partenza completamente casuale.
- **Come funziona**: Si continua a eseguire l'Hill Climbing da punti iniziali diversi fino a quando non si trova una soluzione (o si esaurisce il tempo).
#### Perché è così Efficace?

- **Completezza**: Se una soluzione esiste, prima o poi un riavvio casuale ci farà partire da un punto dal quale l'Hill Climbing riuscirà a raggiungerla. Per questo si dice che è **tendenzialmente completo**: basta insistere.
- **Probabilità**: Se la probabilità p che una singola esecuzione di Hill Climbing abbia successo è, ad esempio, del 14% (p=0.14), ci aspettiamo di dover fare in media 1/p (cioè 1/0.14 ≈ 7) tentativi per trovare la soluzione.
- **Prestazioni**: Per il problema delle 8 regine, questo approccio è incredibilmente veloce. Riesce a trovare una soluzione in **meno di un minuto** analizzando milioni di configurazioni, semplicemente riavviando un algoritmo molto semplice.
### 🔥 Simulated Annealing (Tempra Simulata): L'Alpinista Saggio

Abbiamo visto che l'Hill Climbing è un alpinista "ingordo" che si blocca sulla prima collina che trova. Il **Simulated Annealing (SA)** è un approccio molto più intelligente. È come un alpinista saggio che sa che a volte, per raggiungere la vetta più alta, è necessario **scendere da una collina per poterne scalare una più grande**.
