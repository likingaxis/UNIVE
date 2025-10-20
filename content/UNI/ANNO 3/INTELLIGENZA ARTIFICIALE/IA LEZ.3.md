# Agenti risolutori di problemi
- Tipologia di agenti che puntano a risolvere un problema attraverso un algoritmo ben definito
	- calcolando l'intera sequenza di azioni _prima_ di eseguirne una, tipicamente utilizzando **algoritmi di ricerca**
- effettuare una visita della sequenza degli stati, possiamo dire che corrisponde ad una risoluzione del problema
- Gli agenti risolutori di problemi utilizzano rappresentazioni **atomiche** in cui gli stati sono entità prive di una struttura interna *che non è sfruttata (o visibile/accessibile) dagli algoritmi di ricerca*.
- per atomiche si intende rappresentazioni indivisibili come i nodi di un grafo
- Gli agenti che utilizzano rappresentazioni di stati fattorizzate o strutturate sono solitamente chiamati agenti pianificatori.
Il ragionamento dell'agente atomico è puramente **algoritmico** e si basa sulla modellazione del problema come un **grafo**.
Consideriamo soltanto gli ambienti più semplici: episodici, a singolo agente, completamente osservabili, deterministici, statici, discreti e noti. 
Distingueremo tra 
- *algoritmi informati*
	- in cui l’agente è in grado di stimare la distanza dall’obiettivo
- *non informati*
	- in cui non c’è la disponibilità di tale stima.
## 🗺️ Il Processo di Risoluzione dei Problemi in 4 Fasi

Il processo decisionale di un Agente Risolutore di Problemi si articola in quattro fasi distinte, che trasformano la volontà (l'obiettivo) in un'azione pianificata (la soluzione).

###### 1. Formulazione dell'Obiettivo (Goal Formulation)
L'agente definisce cosa vuole ottenere. L'obiettivo serve a:
- **Organizzare il comportamento:** Fornisce uno scopo chiaro.
- **Limitare l'attenzione:** Ristringe l'enorme spazio delle possibilità e delle azioni da considerare.
- **Esempio:** L'agente adotta l'obiettivo di **raggiungere Bucarest**.
###### 2. Formulazione del Problema (Problem Formulation)

L'agente elabora un **modello astratto** della parte del mondo rilevante per l'obiettivo. Questo modello definisce:

- **Stati:** Le possibili configurazioni del mondo (es. la città in cui si trova l'agente).
    
- **Azioni:** Le mosse disponibili per passare da uno stato all'altro (es. "viaggiare da una città adiacente all'altra").
    
- **Esempio:** L'agente modella la Romania come una rete di città collegate da strade.
    

###### 3. Ricerca (Search)

Questa è la fase centrale della risoluzione del problema, in cui l'agente "pensa" prima di agire.

- **Simulazione:** L'agente simula **internamente** sequenze di azioni all'interno del suo modello astratto.
    
- **Soluzione:** Continua la simulazione finché non trova una sequenza di azioni che raggiunge lo stato obiettivo. Questa sequenza è chiamata **soluzione** o **piano**.
    
- **Risultato:** L'agente trova una soluzione oppure determina che l'obiettivo è irraggiungibile dato il modello.
    

###### 4. Esecuzione (Execution)

L'agente passa dalla simulazione all'azione nel **mondo reale**.
- ripercorre la ricerca al contrario

- **Azione Sequenziale:** L'agente esegue le azioni specificate nella soluzione, una alla volta, fino a completare il piano e raggiungere l'obiettivo.


### Algoritmi di ricerca
### Ricerca della soluzione
- un piano rappresenta il risalire per ricostruire la soluzione svolta
### I nodi dell'albero di ricerca
- g(n) costo del passato
### Struttura dati per la frontiera
### Diversi tipi di strategie
### Valutazione di una strategia
