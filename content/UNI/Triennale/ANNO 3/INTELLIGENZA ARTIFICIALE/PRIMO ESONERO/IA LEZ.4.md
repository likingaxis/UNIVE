# Ricerca esaustiva
Nella ricerca **non informata**, come BFS o UC, l’agente esplora tutto lo spazio degli stati “alla cieca”, senza sapere quale strada lo avvicina davvero alla soluzione.  
	→ Questo è **impraticabile** quando il numero di stati cresce in modo **esponenziale**.

### L’idea base dell’euristica
Una **euristica** è una _stima intelligente_ della distanza (o del costo) che manca per raggiungere l’obiettivo.
- Deriva da **esperienza o conoscenza del dominio**
- Non elimina la ricerca, ma **la rende più efficiente**, perché esplora prima i nodi più promettenti.
- Di solito non garantisce l’ottimo assoluto, ma una **buona soluzione in tempi accettabili**.

>[!tip] Conoscenza Euristica indica una "**scelta oculata**" o un'intuizione che aiuta a risolvere il problema



### Funzione di valutazione euristica
La conoscenza euristica si formalizza in una **funzione**:
$$f: n \rightarrow \mathbb{R}
$$
Questa associa a ogni **nodo n** (che rappresenta uno stato) un **valore numerico** che misura “quanto sembra promettente” quel nodo.

In pratica:
- $f(n)$ è un **numero reale**;
- più è **basso**, più il nodo è “vicino” o “economico” rispetto al goal;
- si calcola **a partire dallo stato del nodo (`n.Stato`)**, non dalla sua storia.


---

##### Alcuni esempi di euristica
![[Pasted image 20251025111157.png]]


#### Algoritmo di ricerca Best-first
#### Best-First classico
![[Pasted image 20251025113910.png]]
![[Pasted image 20251025111757.png]]

- **g(n)** = costo reale del cammino dall’inizio al nodo n.
- Nessuna euristica: usiamo solo il costo accumulato finora.
In questo caso, la “Best-First” **coincide esattamente con la Ricerca di Costo Uniforme (Uniform-Cost Search)**.

Infatti:
- l’algoritmo sceglie sempre il nodo con il **costo cumulativo minore** (`lowest-cost node in frontier`),
- e continua ad espandere fino a trovare il goal con costo minimo.

#### Best-First Greedy
![[Pasted image 20251025112102.png]]

![[Pasted image 20251025111949.png]]
- **h(n)** = stima euristica del costo _dal nodo n al goal_ (quanto “manca”).
- L’algoritmo ignora completamente il costo già speso **(g(n))**, guarda solo _chi sembra più vicino alla meta_.

È come dire:
> “Seguo sempre la direzione che sembra più promettente, anche se magari sto facendo un giro più lungo.”

**Vantaggi:**
- molto più veloce, perché guida subito verso il goal.  
**Svantaggi:**
- non è ottimale (può trovare percorsi più costosi).   
- non è garantito che sia completa se ci sono cicli o stime sbagliate.

###### **G(N) vs H(N): **
###### **1. g(n) (Passato)**
- Costo **reale e cumulativo** dall'inizio al nodo n.
- **NON è euristica.**
- Conosce il costo **già sostenuto** (certo, non stima)
###### **2. h(n) (Futuro)**
- **Stima euristica** del costo che manca da n al goal.
- **È euristica.**
- **Non conosce** il costo reale futuro (è una "scommessa").
- **Motivo:** Ambiente complesso, mancanza info, velocità.
- **Esempio:** Distanza in linea d'aria (stima approssimativa).
###### **3. Conclusione**
- Avere g(n) **NON rende euristico.** L'euristica è data da h(n).
---
# A* search
L'idea principale è cercare un equilibrio tra:
- **arrivare al goal** (come Greedy),
- **risparmiare sul costo fatto finora** (come Uniform Cost),  
Quindi l'alg, vuole **trovare il percorso totale più economico possibile**, stimando il costo complessivo.

### La funzione di valutazione
A* usa:$$
f(n)=g(n)+h(n)$$
dove:
- **g(n)** = costo _reale_ per arrivare fino al nodo `n` (già percorso);
- **h(n)** = stima _euristica_ del costo rimanente per arrivare al goal;
- quindi **f(n)** = stima del costo _totale_ del cammino passando per n.

In altre parole:
> A* valuta ogni nodo come “quanto ho speso finora + quanto (credo) manchi ancora”.


### Come funziona in pratica
L’algoritmo mantiene una **coda con priorità** ordinata per $f(n)$:
1. sceglie il nodo con f(n) più basso (il “più promettente” considerando costi reali + stimati);
2. lo espande, generando i successori;
3. aggiorna la frontiera con i nuovi nodi e i loro f(n).

Continua finché trova un nodo obiettivo.
### Proprietà della funzione $h(n)$
Per garantire che A* sia **completo e ottimale**, servono due condizioni:
1. **h(n) ≥ 0** — i costi stimati non possono essere negativi (ovvio ma importante);
2. **h(goal) = 0** — al goal il costo residuo è nullo.

Se poi l’euristica è **ammissibile** (cioè non sovrastima mai il vero costo), A* trova **sempre la soluzione ottima**.

### Relazioni con altri algoritmi
A* è una **famiglia di algoritmi “A”**, e in base a come scegli h(n) o g(n) ottieni casi particolari:

| Caso     | Condizione           | Diventa…                     | Significato                                      |
| -------- | -------------------- | ---------------------------- | ------------------------------------------------ |
| h(n) = 0 | ⇒ f(n) = g(n)        | **Uniform Cost Search (UC)** | ignora la stima futura → esplora per costo reale |
| g(n) = 0 | ⇒ f(n) = h(n)        | **Greedy Best-First Search** | ignora il costo fatto → segue la stima del goal  |
| entrambi | ⇒ f(n) = g(n) + h(n) | **A***                       | bilancia costo reale + stimato                   |

- quando la h ha certe caratteristiche diventa A* altrimenti è solo A
#### Esempi algoritmi A
![[Pasted image 20251025114716.png]]
![[Pasted image 20251025114733.png]]

## A è  completo
>[!lemma] Teorema: L'algoritmo `A` con la condizione $$g(n) \ge d(n) \cdot \epsilon$$è completo. 
>Con
>- **g(n)** = costo accumulato per arrivare al nodo n (cioè quanto abbiamo speso fino a lì);
>- **d(n)** = profondità del nodo (cioè quanti passi/azioni abbiamo fatto);   
>- **ε** = il **costo minimo possibile** di un’azione (quindi un numero positivo).

Questa condizione dice:
> “Ogni volta che l’agente fa un passo, quel passo deve costare _almeno un po’_, mai zero.”
> In altre parole, **non possono esistere archi di costo zero o negativo**.

### Perché la condizione ci garantisce completezza?
Imponendo che ogni passo costi **almeno ε**, cioè che il costo **cresca un minimo a ogni azione**, otteniamo due effetti:
1. **Ogni cammino ha un costo che aumenta** man mano che scendiamo di livello (non rimaniamo fermi a costo quasi 0).
2. **Esistono solo un numero finito di nodi con un costo minore del costo della soluzione** → l’algoritmo non può esplorare all’infinito.

Questa è la chiave della completezza.

### **completezza di A* (Dimostrazione Veloce) ✅**
**💡 Idea di Base:** Se una soluzione esiste, A* la trova sempre!
###### **1. Partiamo da un Cammino Soluzione Esistente 🛤️**
- Immaginiamo che esista un percorso dallo START al GOAL.
- Chiamiamo questo percorso: $[n_0, n_1, ..., n_* ..., n_k = GOAL]$.
###### **2. n* un Nodo "Importante" sulla Frontiera 🌟**
- Consideriamo un nodo n* che fa parte di quel cammino soluzione e si trova nella frontiera (la lista dei nodi da esplorare).
- **A* espanderà n* (prima o poi)!**
    - **Perché?** A* sceglie sempre il nodo con il f(n) = g(n) + h(n) più basso.
    - Se h(n) è "ammissibile" (cioè, non sovrastima mai il costo reale), allora i f(n) dei nodi sul cammino soluzione non saranno mai "troppo alti".
    - Ci sono **solo un numero finito** di nodi x che hanno un f(x) minore o uguale a f(n*).
    - Questo significa che A* li esplorerà tutti, e poi arriverà anche a n*. Non può "ignorare" n* all'infinito! ⏳
###### **3. A* Fa Progressi sul Cammino Soluzione ➡️**
- Quando A* espande n*, cosa succede?
    - I nodi vicini a n* vengono aggiunti alla frontiera.
    - **Cruciale:** Anche il **prossimo nodo** sul cammino soluzione originale verrà aggiunto! ✨
###### **4. Iterazione Fino al Goal! 🎯**
- Questo processo si ripete! Ogni volta che A* espande un nodo del cammino soluzione, aggiunge il successivo nodo del cammino soluzione alla frontiera.
- Quindi, A* continua a "muoversi" lungo il cammino soluzione.
- Alla fine, A* sarà costretto a selezionare ed espandere anche il nodo GOAL. 🎉
###### **Algoritmo A*: L'Euristica "Ideale" vs. Quella Reale 🧠**

###### **1. Funzione di Valutazione Ideale (Oracolo) 🔮**
- Immaginiamo di avere un **"oracolo"** che conosce tutto il futuro.
- **f*(n) = g*(n) + h*(n)**
    - **g*(n):** Costo **minimo reale** dal START alla radice n. (Il meglio che si possa fare fino a n).
    - **h*(n):** Costo **minimo reale** da n al GOAL. (Il meglio che si possa fare da n in poi).
    - **f*(n):** Costo **minimo reale** del percorso totale dal START al GOAL passando per n.
- **Questo è ciò che vorremmo sapere sempre, ma non è possibile!** 😔
###### **2. La Realtà dei Fatti (Normalmente) 🌍**
- **g(n):** Il costo accumulato che calcoliamo è **sempre maggiore o uguale** al costo minimo reale: g(n) ≥ g*(n).
    - Non possiamo fare meglio del percorso ottimo, e il nostro percorso potrebbe essere sub-ottimale.
- **h(n):** La nostra euristica è solo una **stima** di h*(n).
    - Non possiamo conoscere il costo minimo reale futuro.
##### **Algoritmo A*: La Chiave è l'Euristica Ammissibile 🗝️**

###### **1. Definizione: Euristica Ammissibile (Consistent/Admissible Heuristic) ✅**
- Per **ogni nodo n**, la nostra stima h(n) **NON deve MAI sovrastimare** il costo reale minimo per arrivare al goal:
    - ∀n. h(n) ≤ h*(n) ➡️ h è una **sottostima**.
- **Esempio:** La distanza in linea d'aria. È sempre minore o uguale al costo reale del percorso (non puoi fare meno strada che andare dritto!). 📏
###### **2. Definizione: Algoritmo A* 🤖**
- Un algoritmo di ricerca che usa una funzione f(n) = g(n) + h(n), dove h(n) è una **funzione euristica ammissibile**.
###### **3. Teorema Importante: Ottimalità di A* 🏆**
- Gli algoritmi A* (con euristica ammissibile) sono **sempre ottimali**.
- **Corollario (Conseguenza):**
    - **Best-First (BF)** e **Uniform-Cost Search (UCS)** sono casi speciali di A* (o algoritmi ottimali) quando h(n)=0.
        - Se h(n)=0, allora f(n) = g(n) + 0 = g(n). Questo è esattamente come funziona Uniform-Cost Search! 💡
###### **Proprietà di A* 🎯**
- **Completezza?** ✅ **Sì.**
    - Trova sempre soluzione se esiste (se non infiniti nodi con f(n) ≤ f(Goal)).
- **Ottimalità?** ✅ **Sì.**
    - Trova sempre il cammino meno costoso (con euristica ammissibile).
- **Tempo?** ⏱️ **Esponenziale.**
    - Può esplorare molti nodi nel caso peggiore.
- **Spazio?** 🧠 **Mantiene tutti i nodi in memoria.**
    - Può essere un problema per problemi grandi.
###### **Osservazioni su A* 🤔**
1. **Sottostima (h(n) ≤ h*(n))**
    - Può causare lavoro inutile (più nodi esplorati). 🚶‍♂️
    - **MA** garantisce di trovare il cammino migliore. 🏆
2. **Ruolo di g(n)**
    - Fa abbandonare cammini che si approfondiscono troppo e diventano costosi. 🛑
3. **Sovrastima (h(n) > h*(n))**
    - Può far perdere la soluzione ottimale. 🚫 (Per questo serve ammissibilità).
###### **Ottimalità di A*: Contesto 🌟**
- **Ricerca su Albero:**
    - L'**ammissibilità** di h(n) è sufficiente per l'ottimalità. ✅
- **Ricerca su Grafo:**
    - Serve una proprietà **più forte**: la **consistenza** (o monotonicità). 💪
### Euristica consistente o monotòna
La definizione formale di euristica consistente è $$h(goal) = 0$$e $$\forall n, \ h(n) \le c(n,a,n') + h(n')$$dove
- $n′$ è un **successore** di $n$,
- $c(n,a,n^{′})$ è il **costo reale** dell’azione per andare da $n$ a $n^{′}$.

>[!tip]- Tradotto in parole semplici:
Un’**euristica è consistente** se la **stima del costo** da un nodo $n$ al goal **non è mai maggiore** del costo reale per andare a un successore n′ **più** la stima da n′ al goal.
>
In altre parole:
> “Ogni passo che faccio verso il goal deve ridurre la stima h(n) di un valore **non superiore** al costo effettivo del passo.”

### Cosa implica: $f(n) \le f(n^{'})$ (monotonia)
Dalla condizione sopra deriva automaticamente che:
$$f(n) = g(n) + h(n) \le g(n') + h(n') = f(n')$$

Questo significa che:
> lungo un cammino, il valore di $f(n)$ **non diminuisce mai**.

In altre parole:
- ogni volta che A* espande un nodo,
- i nodi successivi non potranno mai avere f più basso.

👉 ecco perché si dice **euristica “monotòna”**:  
	f(n) **cresce o resta uguale**, ma **non scende mai**.
- una euristica invece si dice ammissibile se: 
Un'euristica h(n) è **ammissibile** se, per qualsiasi nodo n, il suo valore è sempre minore o uguale al costo reale h*(n) per arrivare al goal.  

$h(n)≤h^∗(n)$

### Perché è importante
Questa proprietà ha due effetti pratici fondamentali per A*:
1. **Efficienza:**  
    Se h è consistente, A* **non deve mai riespandere un nodo** già visitato.  
    (perché non potrà mai trovare un percorso con f minore del precedente).
2. **Ordine perfetto:**  
    I nodi vengono espansi **in ordine non decrescente di f(n)**, cioè dal più promettente al meno promettente.

👉 Questo rende A* più semplice, più veloce e più sicuro nella gestione della frontiera.


## Proprietà delle euristiche monòtone
1. ***TEOREMA***: se un'euristica è **monotona**, allora è automaticamente ammissibile (non vale sempre il contrario!)
	
2. Esistono euristiche ammissibili che non sono monotone (ma sono rare)
	- nel senso che può esistere un'euristica che sottostimi (ammissibile), ma non rispetti la regola di monotonia
	
3. Le euristiche monotone garantiscono che la soluzione meno costosa venga trovata per prima
	Se h è monotona, allora:
	- i valori di f(n) **non diminuiscono mai** lungo i cammini;
	- quindi A* esplora i nodi **in ordine crescente di f(n)** (dal più economico al più costoso).
	
	👉 Risultato:
	- quando A* trova **una soluzione**, è **sicuramente quella col costo minimo** —  
> perché nessun altro percorso meno costoso poteva avere un f più basso e venire scelto prima.


>[!tip]- Esempi euristiche ammissibile
>![[Pasted image 20251025192755.jpg]]


## Bilancio su A*
![[Pasted image 20251025192844.jpg]]


>[!problem] PROBLEMA DI A* -> occupa troppo a livello di memoria $(O(b^{d+1}))$ 


---

# Migliorare l'occupazione in memoria di A*

# Beam Search
Invece di tenere in memoria TUTTI I NODI, l'idea è quella di ricordare solo i *k nodi più promettenti*, dove `k` è detto **ampiezza del raggio (beam)**.

>[!tip] LA BEAM SEARCH ***NON* È COMPLETA**

### Idea e pseudocodice
![[Pasted image 20251025193001.jpg]]

![[Pasted image 20251025193007.jpg]]


>[!tip]- Esempio
>![[Pasted image 20251025193059.jpg]]



>[!tip] Diverse applicazioni
>![[Pasted image 20251025193237.jpg]]
Tutti questi processi processi devono **scegliere una sequenza ottimale** di output fra milioni di possibilità.  
→ Qui entra in gioco **Beam Search**, che esplora solo le migliori _K_ continuazioni invece di tutte.
>
>![[Pasted image 20251025193250.jpg]]
>Qui abbiamo un `beam = 2` (è un'applicazione diretta dell'algoritmo)
>
>![[Pasted image 20251025193302.jpg]]
>Questa mostra **l’applicazione pratica** del beam search durante l’addestramento di un modello di _Speech Recognition_ o _Machine Translation_.


---

# IDA*
L'algoritmo IDA* combina
- A*
- ricerca in profondità iterativa (ID)
Più precisamente, combina i vantaggi di entrambe
- come A*: usa la funzione di valutazione $$f(n) = g(n) + h(n)$$
- come ID: esplora **in profondità**, ma **con un limite**.

### Differenza chiave: il limite su `f`, non sulla profondità
Nel classico “approfondimento iterativo” (ID), il limite è sulla **profondità** (quanti passi posso fare).

In IDA*, invece, il limite è sul valore di **f(n)** (cioè sul costo stimato totale).
Quindi:
- Si imposta un limite iniziale $f_{limit}$;
- Si esplora in profondità solo i nodi con $f(n) ≤ f_{limit}$
- Se non si trova la soluzione, si aumenta $f_limit$ e si ricomincia.

Questo processo si ripete finché non si trova una soluzione.

## Come funziona (riassunto operativo)
1. **Inizializza** $$f_{limit} = f(nodo \ iniziale)$$
2. **Ricerca in profondità limitata**  
    esplora tutti i nodi con$f(n) \le f_{limit}$
    
3. **Se non trovi il goal**, aumenta $f_{limit}$ al **minimo valore di f(n)** che ha superato il limite precedente
    
4. **Ripeti** finché non trovi il goal.

👉 Così IDA* si espande “a strati” di f crescenti


## Ma di quanto deve essere aumentato il limite $f_{limit}$?
Abbiamo due casi principali
1. CASO 1 -- Costi fissi delle azioni
	- Se ogni passo costa la stessa quantità (es. 1), allora possiamo aumentare il limite di `1` a ogni azione
	
2. CASO 2 -- Costi variabili
	- Se i passi costano diversamente **non possiamo aumentare il limite di una quantità fissa**,   perché non sappiamo qual è “il passo giusto” per includere la prossima soluzione.
	👉 Soluzione:  si guarda **tutti i nodi che sono stati scartati** perché avevano $f(n) \ge f_{limit}$
		Poi
		 - si prende **la più piccola di queste f**
		 - e la si usa come nuovo limite per la prossima iterazione


## Considerazioni
![[Pasted image 20251025193501.jpg]]

## Valutazioni funzioni euristiche
A parità di ammissibilità, una euristica può essere più efficiente di un'altra nel trovare il cammino soluzione migliore (visitare meno nodi) IN BASE A QUANTO È INFORMATA

>[!tip] Più informata = più vicina al costo reale $h^{*}(n)$

Abbiamo infatti
- $h(n) = 0$ -> minimo di informazione (BF o UC)
- $h^{*}(n)$ -> massimo di informazione (oracolo)
In generale, per le ***euristiche ammissibili*** $$0 \le h(n) \le h^{*}(n)$$


>[!lemma] TEOREMA
>Se $h_{1} \le h_{2}$, i nodi espansi da A* con $h_{2}$ sono **un sottoinsieme** dei nodi espansi da A* con $h_{1}$.
>Se $h_{1} \le h_{2}$, allora A* con $h_{2}$ è **almeno efficiente quanto** A* con $h_{1}$

Questo perché
- se $h_{1} \le h_{2}$, vuol dire che $h_{2}$ **fornisce stime "più alte"** (vicine al valore reale ($h^{*}(n)$) pur restando **ammissibile** 
	- allora possiamo dire che $h_{2}$ è **più precisa**.
		- più precisa vuol dire che **espande meno nodi**, da qui derivano
			- **SOTTOINSIEME** -> perché A* con $h_{2}$ visita meno nodi
			- **ALMENO EFFICIENTE** -> perché A* con $h_{2}$ impiega meno tempo (o al massimo lo stesso di A* con $h_{1}$)


>[!tip]- Esempio
>![[Pasted image 20251025193619.jpg]]
>La **distanza Manhattan** tra due caselle è il **numero di mosse orizzontali e verticali** (non diagonali) necessarie per spostarsi da una posizione all’altra.


## Compromesso tra costo del calcolo dell'euristica e il costo delle ricerca
![[Pasted image 20251025193638.jpg]]

Questo grafico mostra il compromesso tra quanto è informata un’euristica e il costo totale della ricerca.  
- Un’euristica poco informata è veloce da calcolare ma fa esplorare molti nodi, quindi la ricerca è lenta.  
- Al contrario, un’euristica molto precisa riduce la ricerca ma è più costosa da calcolare.  
Il **costo complessivo** è dato dalla somma di questi due effetti.  
L’obiettivo è trovare un equilibrio: un’euristica abbastanza informata da ridurre lo spazio di ricerca, ma non troppo complessa da rendere il calcolo inefficiente.


## Valutare l'efficacia di un'euristica
Per misurare quanto è “forte” o efficace un’euristica possiamo utilizzare un valore chiamato **fattore di diramazione effettivo (`b*`)**.
>b* rappresenta **quanti nodi, in media, vengono generati per ogni nodo esplorato** durante la ricerca.

Per calcolarlo, si considerano:
- **N** = il numero totale di nodi generati dall’algoritmo;
- **d** = la profondità della soluzione (cioè quanti passi servono per arrivare al goal).

Poi si immagina un **albero uniforme** che ha lo stesso numero di nodi, e si risolve l’equazione: $$N +1 = b^{*} + (b^{*})^{2} + ...+ (b^{*})^{d}$$per trovare $b^{*}$.

Più **b*** è basso, **più l’euristica è efficace**, perché l’algoritmo riesce a “stringere” la ricerca esplorando meno nodi.  
In generale, una buona euristica ha **b*** vicino a 1 (di solito sotto 1.5).

>[!tip]- Esempi
>![[Pasted image 20251025193652.jpg]]

#### Esempio utile
![[Pasted image 20251025193704.jpg]]
![[Pasted image 20251025193709.jpg]]


---

# Come inventare un'euristica
Diverse strategie.

## Rilassamento del problema
Se il problema originale è difficile da risolvere, possiamo “semplificarlo” togliendo alcune regole o vincoli.  
> La soluzione del problema semplificato può darci una **stima del costo minimo** per risolvere quello reale → cioè una **euristica ammissibile**.

>[!tip]- Esempio
>
>![[Pasted image 20251025193724.jpg]]


## Massimizzazione di euristiche
Se abbiamo più euristiche **senza dominazione reciproca** (cioè nessuna è sempre ≥ dell’altra),  
possiamo costruirne una nuova prendendo **il massimo** tra i loro valori: $$h(n) = max(h_{1}(n), h_{2}(n),...,h_{k}(n)$$
#### Perché funziona
- Poiché **ogni hᵢ è ammissibile** (cioè non supera mai il costo reale $h^*(n)$,  
    anche il loro massimo rimane **ammissibile**, perché non può superare $h^*(n)$.

- Inoltre, $h(n)$ sarà **più informata** di ciascuna hᵢ presa singolarmente,  
    perché in ogni nodo sceglie la stima più alta (cioè la più precisa).



## Euristiche da sottoproblemi
Spesso un problema grande può essere diviso in **sottoproblemi più piccoli**, che sono più facili da risolvere.  

L’idea è:
> il costo per risolvere un sottoproblema è sempre **una sottostima** del costo per risolvere l’intero problema.

Il passo successivo è rendere tutto automatico:
- si pre-calcola, una volta per tutte, **il costo minimo** per ogni possibile configurazione del sottoproblema;
    
- poi si salva tutto in un **database di pattern** (una tabella che mappa configurazioni → costi).
    
- durante la ricerca, basta consultare il database per sapere subito il valore dell’euristica $hDB(n)$.

#### Sottoproblemi multipli
Potremmo avere diversi sottoproblemi, ognuno che da origine a una **nuova euristica ammissibile**.
Possiamo combinarle in due modi:
1. PRENDERE IL MASSIMO $$h(n) = max(h_{1}(n), h_{2}(n),...)$$Questo funziona sempre e **resta ammissibile**, perché prendiamo la stima più alta senza mai superare il costo reale.
	
2. Sommare i valori
	In teoria, **sommare** più euristiche potrebbe dare una stima ancora più precisa, ma SOLO SE I SOTTOPROBLEMI SONO DISGIUNTI
		Questi casi si chiamano **pattern disgiunti**.  
			Ogni pattern (cioè sottoproblema indipendente) ha il suo _pattern database_  
			con i costi pre-calcolati, e le loro somme danno una stima molto accurata.


## Apprendere dall'esperienza
Invece di scrivere a mano un’euristica (come la distanza Manhattan, ecc.), possiamo **insegnare al programma** a stimare da solo il costo $h(n)$, basandosi sull’esperienza acquisita durante l’esecuzione.

Quindi l’euristica non è più definita da noi, ma **appresa automaticamente**.

![[Pasted image 20251025193757.jpg]]

## Combinazione di euristiche
A volte **una sola euristica non basta** per descrivere la difficoltà di uno stato.  
In questi casi possiamo **combinare più euristiche diverse** in una **formula unica**, pesandole secondo la loro importanza: $$h(n) = c_{1}h_{1}(n) + c_{2}h_{2}(n) + ... + c_{k}h_{k}(n)$$Dove:
- $hi​(n)$ = una diversa funzione euristica (che misura un certo aspetto del problema)
- $c_{i}$ = un coefficiente che ne indica il peso o l’importanza

>[!question] Come si scelgono i coefficienti `c`?
>Possono essere 
>- scelti a mano in base all'esperienza
>- oppure appresi automaticamente dal programma.


