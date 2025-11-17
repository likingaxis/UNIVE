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
- stato
- stato iniziale
- stato finale
- azioni possibili e in base a cosa vengono scelte
- modello di transizione
- costo
### CICLO DI VITA DELL'AMBIENTE

### CICLO DI VITA DELL'AGENTE
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
