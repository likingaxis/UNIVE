### P E A S
- P le prestazioni dell'agente
- E 
- A le azioni
- S i sensori
### MODELLO AMBIENTE

>[!tip]- ### Osservabilità
> - **Completamente Osservabile**
> 	- L'agente ha accesso allo **stato completo** dell'ambiente in ogni momento, attraverso i suoi sensori. È sufficiente che i sensori misurino tutti gli aspetti _rilevanti_ per la scelta dell'azione.
> 
> - **Parzialmente Osservabile**
> 	- L'agente non può vedere l'intero stato dell'ambiente a causa di sensori rumorosi, inaccurati o incompleti. Se l'agente non ha sensori, l'ambiente è **inosservabile**.
> ### Numero di agenti
> - **Agente Singolo**
> 	- L'ambiente contiene solo un agente che opera e le "altre" entità possono essere trattate come semplici oggetti che si comportano secondo le leggi della fisica.
> 
> - **Multi-Agente**
> 	- L'ambiente contiene **più agenti**, e la distinzione chiave è se il comportamento di un'altra entità può essere descritto come il tentativo di **massimizzare una misura di prestazione** il cui valore dipende dalle azioni del tuo agente.
> 
> ### Prevedibilità del Modello di Transizione
> - **Deterministico**
> 	- Lo stato successivo dell'ambiente è **completamente determinato** dallo stato corrente e dall'azione dell'agente (o degli agenti).
> - **Stocastico**
> 	- Il modello dell'ambiente è associato esplicitamente a **probabilità** per i risultati delle azioni (es. "c'è una probabilità del 25% che domani piova").
> 
> - **Non Deterministico**
> 	- Lo stato successivo non è completamente determinato, e le varie possibilità di risultato sono elencate **senza essere quantificate** (es. "c'è la possibilità che domani piova").
> ### Struttura del Ciclo di Interazione
> - **Episodico**
> 	- L'esperienza dell'agente è divisa in episodi atomici. Ogni decisione è **indipendente** dalle azioni intraprese negli episodi precedenti.
> 
> - **Sequenziale**
> 	- Ogni decisione può **influenzare tutte le decisioni successive**. Le azioni a breve termine hanno conseguenze a lungo termine (es. gli scacchi, guidare).
> ### Cambiamento Temporale
> - **Statico**
> 	- L'ambiente **non cambia** mentre l'agente sta decidendo come agire.
> 
> - **Dinamico**
> 	- L'ambiente **può cambiare** mentre l'agente sta decidendo. Richiede che l'agente osservi continuamente e risponda rapidamente (es. un taxi autonomo).
> 
> - **Semi-Dinamico**
> 	- L'ambiente in sé **non cambia** col tempo, ma la **misura di prestazione** (la valutazione) dell'agente sì (es. scacchi giocati con l'orologio).
> ### Natura delle Variabili
> - **Discreto**
> 	- Lo stato dell'ambiente, la gestione del tempo, le percezioni e le azioni sono rappresentabili con un **numero finito** di valori (es. le caselle su una scacchiera, input digitali).
> 
> - **Continuo**
> 	- Le variabili (stato, tempo, azioni) sono descritte da **numeri reali** e possono assumere un numero infinito di valori (es. la velocità di un'auto, l'angolo di sterzo).
> ### Visibilità
> - **Ambiente Noto (Known)**
> 	- L'agente (o il suo progettista) **conosce le regole del gioco**. Sono noti i risultati (o le probabilità di risultato, se l'ambiente è stocastico) per tutte le azioni.
> 	- L'agente può eseguire una **ricerca _offline_** (pianificazione) per calcolare la sequenza di azioni ottimali prima di agire.
> 
> - **Ambiente Ignoto (Unknown)**
> 	- L'agente **non conosce le regole del gioco**. L'agente non sa come l'ambiente reagirà alle sue azioni.
> 	- L'agente **dovrà apprendere come funziona** l'ambiente. Dovrà compiere **azioni esplorative** (sperimentazione) per acquisire la conoscenza dinamica necessaria a prendere buone decisioni.


e i costi
### TIPO DI ARCHITETTURA AGENTE
- goal modello ecc...
- pianificatore non pianificatore
### DEFINIZIONE STATI
- stato del mondo
- spazio degli stati
	- la sua cardinalità
- differenza tra stato del mondo e stato del processo di ricerca
-  **Lo stato dello spazio di ricerca**
	è **una descrizione astratta e minimale** di una configurazione possibile del mondo, così come usata dall’algoritmo di ricerca (A*, BFS, DFS…).
- stato
- stato iniziale
- stato finale
- azioni possibili e in base a cosa vengono scelte
- modello di transizione
- costo
### CICLO DI VITA DELL'AMBIENTE
>[!tip]-  
> 
> ```scss
> function RUN-EVAL-ENVIR (state, UPDATE-FN, agent, PERFORMANCE-FN) returns score
>   local variables  score   % inizialmente 0
> 
>   repeat
>       (NWpos, Dpos, PRpos, EXpos) ← GET-PERCEPT(agent, state)
> 
>       Action ← CV-PROG(NWpos, Dpos, PRpos, EXpos)
> 
>       state  ← UPDATE-FN(state, Action)
> 
>       score     ← PERFORMANCE-FN(state, score)
> 
>   until TERMINATION(state)
> 
>   return score
> ```
> 

### CICLO DI VITA DELL'AGENTE

>[!tip]- 
> 
> ```scss
> function agent-PROGRAM(percept) returns action
>     persistent:
>         plan      % sequenza di azioni
>         state     % stato interno stimato (posizioni ecc.)
>         goal      % goal corrente
> 	    problem 
> 
>     if (CVpos = PRpos) and (hasPrincess = false) then
>         hasPrincess ← true
>         goal ← "torna_all_uscita"
>         plan ← EMPTY          % forza una nuova pianificazione
>     if (hasPrincess = true) and (CVpos = EXpos) then
>         return exit           % oppure null-action e TERM(state) nell’ambiente
>     if plan = EMPTY then
>         if hasPrincess = false then
>             goal ← PRpos      % primo goal: raggiungi principessa
>         else
>             goal ← EXpos      % secondo goal: torna all’uscita
>         end if
>         problem ← FORMULATE-PROBLEM(perception, goal)
>         plan    ← SEARCH(problem)   % es. A* su MAZE evitando Dpos
>         if plan = failure then
>             return null-action
>         end if
>     end if
>     % 3. Esegui la prossima azione del piano
>     action ← FIRST(plan)
>     plan   ← REST(plan)
>     return action
> end function
> ```
> 

### EURISTICA da inventare
- se si parla di A* puoi usare manhattan distance che è
	- ammissibile
		- non sovrastima mai la distanza $h(n)\leq h^*(n)$ 
	- monotona
		- la funzione nella sua esecuzione non decresce mai poichè
			- i costi sono $\geq 0$ 
	- $h(n) \geq 0$ 
	- $h(goal)=0$ 
#### MISURA DI PRESTAZIONE
- quanto costa una singola azione?
- score= somma totale del percorso da eseguire
- confronto applicando algoritmi diversi, si va a vedere
- Costo della soluzione
	- Lo score finale (lunghezza totale del percorso).
- Tempo di calcolo
	- Numero di nodi espansi, tempo reale, profondità.
- Memoria utilizzata
	- Dimensione massima della frontiera.
### algoritmo DI RICERCA

```scss
function A* (problem) returns a solution or failure
nodo <- nodo con stato = problem.initialstate
frontiera <- coda di priorità ordinata in base a f(n) con all'inizio solo nodo "nodo"
esplorati <- insieme dei nodi esplorati inizialmente vuoto
loop do
    if frontiera is empty? then return failure
    nodo <- POP(frontiera)
    if problem.GOALTEST(nodo.state) then return SOLUTION(nodo)
    add nodo.state to esplorati
    for each action in problem.ACTIONS(nodo.state) do
        child <- CHILD-NODE(problem, nodo, action)
        if child.state non in frontiera or esplorati then
            frontiera <- INSERT(child.state)
        else if child.state is in frontiera con f(n) più alto allora
            replace that frontier node with child
```
🔹 `problem.initialstate`
Stato iniziale del problema: da dove parte la ricerca.
🔹 `frontiera` (priority queue su f(n))
Insieme dei nodi “da esplorare dopo”, ordinati per **f(n) = g(n) + h(n)**.  
`POP(frontiera)` prende il nodo con f più piccolo.
🔹 `esplorati`
Insieme degli **stati già espansi**: serve per non riesplorare gli stessi stati.

🔹 `problem.GOALTEST(nodo.state)`
Test logico: controlla se lo stato del nodo corrente è un **goal**.  
Se sì → ricostruisce e ritorna la soluzione (`SOLUTION(nodo)` seguendo i parent).
🔹 `problem.ACTIONS(nodo.state)`
Restituisce l’insieme delle **azioni applicabili** in quello stato (es. {su, giù, dx, sx}).
🔹 `CHILD-NODE(problem, nodo, action)`
Crea il **nodo figlio**:
- calcola il nuovo stato con il modello di transizione
- aggiorna g(n), h(n), f(n)
- mette il `parent` = `nodo` e l’azione usata.
🔹 Test su `frontiera` / `esplorati`
- se lo stato del figlio non è mai stato visto → lo inserisce in `frontiera`
- se è già in `frontiera` ma con f peggiore → lo **sostituisce** con la versione migliore