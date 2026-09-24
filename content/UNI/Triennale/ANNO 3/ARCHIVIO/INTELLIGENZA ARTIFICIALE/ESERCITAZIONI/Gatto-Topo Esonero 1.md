![[Domanda_Agente.pdf]]
# <font color="#2DC26B">1 Analisi PEAS</font>
## P (performance)
L'obiettivo è minimizzare il costo totale per raggiungere e mangiare il topo.
Nel nostro caso il costo di questa misura è il prodotto tra il costo di ogni mossa più il numero di mosse più il costo dell'azione mangia (+2).
## E (envivorment, ambiente)
Un labirinto a griglia 14x14 che include ostacoli invalicabili, un gatto e un topo fermo.
## A (attuatori)
Gli attuatori permettono al gatto di muoversi di una cella alla volta verso N,S,E,O e mangiare il topo quando raggiunge la sua cella.
$\large A = \{\text{N, S, E, O,M}\}$
## S (sensori)
L'agente Gatto ha sensori che gli permettono  di percepire l'intera mappa fin dall'inizio. Conosce la propria posizione, la posizione del topo e la posizione degli ostacoli sulla griglia e le mura.

# <font color="#2DC26B"> 2 Proprietà dell'ambiente</font> 

L'ambiente è completamente osservabile, deterministico, discreto, sequenziale, statico e a singolo agente.

>[!EXAMPLE]- Significato definizioni sopra se richiesto dal testo
>**Completamente osservabile**: oltre che specificato nel testo l'agente percepisce tutto fin dall'inizio, conosce le posizioni di tutto.
>**Discreto**: perché il labirinto è modellato come una griglia e ogni mossa corrisponde a 1 passo.
>**Singolo agente** perché il gatto è l'unico che agisce, il topo è fermo passivamente.
>**Sequenziale**: la soluzione richiede una sequenza di azioni.
>**Statico**: l'ambiente non cambia mentre sta pianificando.
>**Deterministico**: presa un azione uno stato associato all'azione lo stato di arrivo è unico.

# <font color="#2DC26B">3 Tipo di agente</font>

Agente basato su obiettivi (in questo caso uno solo) che agisce come un agente pianificatore. Dato che l'ambiente è statico e totalmente osservabile può calcolare l'intero piano ottimale offline prima di muoversi.

# <font color="#2DC26B">4 Descrizione dello stato del mondo</font>

### Stato del mondo (tutte le informazioni che ho)

Lo **Stato del Mondo** $S_{mondo}$ è  una tupla che include tutte le informazioni sull'ambiente: $$\large S_{mondo} = (\text{posizione\_gatto}, \text{posizione\_topo}, \text{mappa\_ostacoli}, \text{topo\_mangiato})$$
### Stato della ricerca (la versione "semplificata" di quello sopra)

A noi interessa solo la sequenza di mosse per arrivare al topo, inoltre alcune variabili dello stato del mondo sono fisse, o cambiano solo quando arrivo al topo.

Ai fini della soluzione del problema, lo stato $\large s$ utilizzato nel processo di ricerca è definito semplicemente dalla posizione del gatto $$\Large s=(x,y)$$
### Cardinalità

Lo spazio degli stati del mondo è 14x14x2.
Lo spazio degli stati di ricerca è (14x14)-(numero ostacoli).

### Stato iniziale e stato goal

$\Large S_{start} = (x_{g}, y_{g})$ che corrisponde allo posizione del gatto

$\Large S_{goal} = (x_{t}, y_{t})$ che corrisponde alla posizione del topo (mettere la cosa del 2)


Nel nostro problema il gatto deve raggiungere la posizione del topo per poi mangiarlo.

### Modello di transizione e funzione di costo

L'agente percepisce tutto sin dall'inizio e sa dove si trova tutto quello già descritto sopra.

Chiamo la funzione di transizione $\large risultato(s, a)$ la quale definisce in quale stato $\large s'$ si arriva partendo dallo stato $\large s$ ed eseguendo l'azione di movimento $\large a$. Questa funzione è valida solo se il movimento è entro i limiti della mappa e non sugli ostacoli.

A questa funzione è associata una funzione di costo $\large C(s, a, s')$, se l'azione è valida la mossa ha costo unitario, se non valida l'agente non si muove e ha costo 0.

Questo modello di transizione non include l'azione di mangiare poiché ho ritenuto opportuno vederla come un'azione separata (di costo 2) che l'agente esegue solo dopo che l'algoritmo di ricerca è arrivato al goal.

# <font color="#2DC26B">5 Algoritmo di risoluzione della funzione agente</font>

### Fasi di pianificazione e esecuzione

L'agente usa l'algoritmo di ricerca per calcolare l'intera sequenza di mosse ottimale, dopodiché l'agente esegue il piano e al termine delle mosse mangia il topo.

### Algoritmo scelto

L'algoritmo scelto per la pianificazione è A*, perché trova il percorso minimo in modo efficiente espandendo meno nodi rispetto ad altri algoritmi. È completo e ottimale.

### Funzioni di valutazione

A* seleziona quale nodo espandere tramite la funzione di valutazione:
$$\Large f(n) = g(n) + h(n)$$
Dove `g(n)` è il costo reale per raggiungere il nodo `n` partendo dallo stato iniziale, in questo caso dato che ogni mossa costa 1 è il numero di passi fatti per arrivare ad un nodo.
mentre `h(n)` è  il costo stimato (euristica) per andare dal nodo $\large n$ fino allo stato goal.

### Euristica h(n) e ammissibilità

L'euristica scelta è la distanza Manhattan, possiamo considerarla come il fiuto del gatto verso il topo.

Se il Gatto si trova nel nodo $\large n$ alla posizione $(x, y)$ e il topo si trova alla posizione goal $(x_g, y_g)$


$$\Large h(n) = |x - x_g| + |y - y_g|$$
Questa euristica è ammissibile perché non sovrastima mai il costo reale per raggiungere l'obiettivo.
### Misura prestazione primaria

Per il problema dato è il costo totale che l'agente esegue per raggiungere e mangiare il topo, le mosse hanno tutte costo 1 e mangiare il topo costa 2:

$$\Large Costo Totale = (Numero di mossenelpercorsoottimale) + 2$$

# <font color="#00b050">6 Architettura (alto livello)</font>

### Funzione ambiente

`//definisco lo stato del mondo con tutto ciò che ho nella mappa e i costi`

`stato_mondo={mappa_ostacoli, posizione_agente, posizione_obiettivo, obiettivo_raggiunto}`
`costo_movimento=1`
`costo_obiettivo=2`

`def Simulazione(programma_agente):`
	`InizializzaStato(stato_mondo)`
	`stato_mondo.obiettivo=FALSE`
	`programma_agente.esegui(GETpercezioni(stato_mondo))`

`def EseguiAzione(azione)`:
    
    `//funzione per gestire il movimento`
    SE Azione_è_Movimento(azione):
        Pos_Nuova = CalcolaTransizione(Stato_Mondo.Posizione_Agente, azione)
        `//funzione che retituisce true se la nuova pos è valida`
        SE È_Valida(Pos_Nuova, Stato_Mondo.Mappa_Ostacoli): 
            Stato_Mondo.Posizione_Agente = Pos_Nuova
            return costo_movimento 
	    return 0
            
    // funzione per controllare il movimento
    ALTRIMENTI SE Azione_è_Obiettivo(azione): //sarebbe come se azione==mangia
        
        SE Condizioni_Obiettivo_soddisfatte(Stato_Mondo):
            Stato_Mondo.Obiettivo_Raggiunto = TRUE //flag di mangi
            return Costo_Obiettivo // Restituisce 2
			
	    return 0 `per gestire cose fuori da quello detto sopra`

### Programma agente

`// Variabili persistenti`
`persistent: piano_azioni, costo_totale=0 , H`
    
`def Esegui(percezione_iniziale):`
    
    Start = percezione_iniziale.pos_gatto
    Goal  = percezione_iniziale.pos_topo
    Mappa = percezione_iniziale.mappa
    
    problema = CreaProblema(Start, Goal, Mappa) 
    
    risultato_ricerca = ASTAR(problema, H) 

    IF risultato_ricerca == "fallimento":
        return Costo_Totale  //l'ho messo a 0 sopra
    
    ELSE:
        Piano_Azioni = risultato_ricerca + ["MANGIA"] 

        WHILE Piano_Azioni NON è vuoto:
            azione = pop(Piano_azioni)
            costo_restituito = Ambiente.EseguiAzione(azione)
            Costo_Totale = Costo_Totale + costo_restituito
            
    return Costo_Totale

![[Pasted image 20251116155251.png]]













