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

### Formulazione dei problemi(quello della fase 2)
- un problema può essere definito in modo formale mediante cinque componenti:
	- 1. Stato iniziale, stato in cui si trova l'agente inizialmente
	- 2. Azioni possibili in s:Azioni(s)
		- Azioni(s) restituisce un insieme finito di azioni che può svolgere quell'agente 
	- 3. insieme di stati obiettivo
	- 4. Modello di transizione, descrive ciò che fa ogni azione
		- Risultato:stato x azione $\rightarrow$ stato
		- Risultato(s,a)=s' è detto stato successore
		- es: Risultato(Arad,VersoZerind)=Zerind
	- 5. Una funzione di costo per le azioni di un certo cammino
		- $C(s,a,s')$ sempre positivo
- una soluzione è un cammino che porta dallo stato iniziale a uno stato obiettivo
- una soluzione ottima è quella con C minore tra tutte
	- Lo spazio degli stati, ovvero un insieme con tutti i possibili stati dell'ambiente è un grafo
- formulare un problema tipo raggiungere una certa città rappresenta un *modello*, una descrizione matematica astratta
	- il processo di rimozione dei dettagli da una rappresentazione si dice *astrazione*
	- **Astrazione Valida:** Si può espandere ogni soluzione astratta in una soluzione nel mondo più dettagliato.
		- molto utile per semplificare un problema
	- **Astrazione Utile:** Eseguire ogni azione nella soluzione è più facile che nel problema originale.
### Algoritmi di ricerca
- gli algoritmi di ricerca prendono in input un problema e restituiscono un cammino soluzione
- Misura delle prestazioni
	- Trovare una soluzione ha un costo
	- Costo totale= costo della ricerca+costo del cammino soluzione
### Esempio
![[Pasted image 20251021123557.jpg]]
![[Pasted image 20251021123607.jpg]]


## 🧩 Problemi Esemplificativi: Standardizzati vs. Reali  

​La distinzione tra queste due categorie di problemi è fondamentale per illustrare come i principi di risoluzione vengano prima testati in ambienti controllati (standardizzati) e poi applicati a contesti complessi (reali).
### 1. Problemi esemplificativi
​Questi problemi sono astratti, semplici da definire e vengono utilizzati per illustrare o mettere alla prova diversi metodi di risoluzione.
![[Pasted image 20251021125057.jpg]]
![[Pasted image 20251021125109.jpg]]
​
- Scopo: Mettere alla prova algoritmi di ricerca e ottimizzazione di base.  
- Stati: Uno stato indica la posizione dell'agente e la presenza di sporco in ogni cella.  
	- La dimensione dello spazio degli stati è limitata e calcolabile: $\text{n} \times 2^\text{n}$ stati (es. 8 stati per 2 celle).  
- Stato Iniziale: Qualsiasi stato può essere designato come iniziale.  
- Azioni: Sinistra, Destra, e Aspira (nel mondo a due celle).  
- Modello di Transizione: L'azione Aspira rimuove lo sporco dalla cella
	- lo Spostamento muove l'agente a meno che non incontri un muro.  
- Stati Obiettivo: Qualsiasi stato in cui ogni cella è pulita.  
- Costo di Azione: Costo uniforme (ogni azione costa 1).  
- Spazio degli Stati: Il grafo è relativamente piccolo e gestibile (es. un grafo con 8 nodi).
## Altri esempi
Dai frammenti di immagine che hai caricato, posso analizzare e spiegare la formulazione di due problemi classici utilizzati per illustrare le tecniche di ricerca nello spazio degli stati: il Puzzle dell'Otto e il problema delle Otto Regine.
#### 🧩 1. Puzzle dell'Otto: Formulazione Standard
![[Pasted image 20251021132649.jpg]]

Il Puzzle dell'Otto è un classico problema standardizzato utilizzato per testare algoritmi di ricerca . È un esempio di problema con costo di cammino non nullo.
 * Stati: Tutte le possibili configurazioni della scacchiera $3 \times 3$  con i numeri da 1 a 8 e la casella vuota (lo spazio).
 * Stato Iniziale: Una configurazione specifica da cui si inizia.
 * Obiettivo: Una configurazione specifica (spesso i numeri in ordine, con lo spazio in basso a destra).
 * Goal-Test: Verificare se lo stato corrente corrisponde allo stato obiettivo.
 * Azioni: Le mosse della casella bianca (vuota): 
 * su $(\uparrow)$, 
 * giù $(\downarrow)$, 
 * a destra $(\rightarrow)$, 
 * a sinistra $(\leftarrow)$.
 * Costo Cammino: Ogni passo costa 1 (costo uniforme).
 * Spazio degli Stati: È un grafo in cui si possono verificare cicli.
#### 👑 2. Il Problema delle Otto Regine: 
![[Pasted image 20251021132907.jpg]]

- Formulazioni
	- L'obiettivo è collocare 8 regine su una scacchiera $8 \times$
	- 8 in modo tale che nessuna regina sia attaccata (ovvero, nessuna è sulla stessa riga, colonna o diagonale di un'altra).
- Questo problema viene spesso utilizzato per confrontare diverse strategie di formulazione e l'impatto della formulazione sull'efficienza della ricerca.
- Formulazione Incrementale 1 (La Meno Efficiente)
Questa è la formulazione più semplice, ma ha un enorme spazio di stati da esplorare.
 * Stati: Scacchiere con un numero di regine compreso tra 0 e 8.
 * Goal-Test: Ci sono 8 regine sulla scacchiera e nessuna è sotto scacco.
 * Azioni: Aggiungi una regina in una qualsiasi delle 64 caselle.
 * Costo Cammino: Zero (Il perché? è perché l'obiettivo è solo raggiungere uno stato finale valido, non il numero di mosse necessarie. Il costo è irrilevante/nullo in questo tipo di problema di "soddisfacimento di vincoli").
 * Spazio di Ricerca: Il numero di sequenze da considerare è altissimo, circa 1$.8 \times 10^{14} (64 \times 63 \times \dots \times 57$ posizionamenti distinti).
Formulazione Incrementale 2 (Migliorata)
Questa formulazione riduce drasticamente lo spazio di ricerca introducendo un vincolo implicito nelle azioni.
 * Stati: Scacchiere con un numero di regine compreso tra 0 e 8, con l'aggiunta di un vincolo implicito: nessuna minacciata (se questo vincolo viene applicato durante la ricerca).
 * Goal-Test: Ci sono 8 regine sulla scacchiera e nessuna è minacciata.
 * Azioni: Aggiungi una regina nella colonna vuota più a destra in modo che non sia sotto scacco con le regine già presenti.
 * Costo Cammino: Zero.
 * Spazio di Ricerca: L'uso del vincolo riduce le sequenze da considerare a solo 2057, rendendo il problema gestibile con algoritmi di backtracking.
Formulazione a Stato Completo (Completa)
Questa formulazione non "aggiunge" regine, ma parte da una configurazione completa e cerca di migliorarla. È spesso usata con algoritmi di ricerca locale (come Hill-Climbing).
 * Stati: Scacchiere che hanno 8 regine, una per colonna.
 * Goal-Test: Ci sono 8 regine sulla scacchiera e nessuna è minacciata.
 * Azioni: Sposta una regina nella sua colonna in un'altra riga, se minacciata.
 * Costo Cammino: Zero (il costo è focalizzato sul miglioramento della qualità dello stato, non sul conteggio dei passi).
 * Logica: L'agente parte da una configurazione qualsiasi (spesso casuale) e cerca di ridurre il numero di attacchi reciproci ad ogni mossa, fino a raggiungere lo stato obiettivo.
#### Problemi del Mondo Reale (Real-World Problems)  
 Questi problemi hanno soluzioni effettivamente utili alle persone, ma la loro formulazione è specifica, complessa e non standardizzata, catturando la ricchezza di dettagli dell'ambiente.  
- Esempio: Il Problema di Ricerca dell'Itinerario Aereo ✈️
### Dimostrazione di teoremi, il problema
- si vuole rappresentare un problema dove si vogliono dimostrare i teoremi
- Dato un insieme di formule logiche (le premesse 
- Dalle premesse (formule logiche):
	- Si vuole dimostrare la proposizione p.
- La Regola di Inferenza
- Nel calcolo proposizionale, per dimostrare nuovi teoremi a partire dalle premesse, è sufficiente utilizzare un'unica regola fondamentale, il Modus Ponens (MP)
![[Pasted image 20251021134751.jpg]]

🔍 Formulazione come Problema di Ricerca
Per far sì che un agente risolva il problema, lo si modella in termini di stati, obiettivo e operatori:
 * Stati:
   * Sono definiti come insiemi di formule proposizionali. Ogni stato rappresenta la collezione di proposizioni che sono state dimostrate come vere fino a quel punto della ricerca.
 * Stato Iniziale:
   * È l'insieme iniziale di formule proposizionali fornite, ovvero le premesse.
   * Esempio: Lo stato iniziale è $S_{iniziale} = \{s, t, q \Rightarrow p, r \Rightarrow p, v \Rightarrow q, t \Rightarrow r, s \Rightarrow v\}$.
 * Stato Obiettivo:
   * È un qualsiasi stato (insieme di formule) che contiene il teorema da dimostrare.
   * Esempio: Se si vuole dimostrare p, lo stato obiettivo è un insieme $S_{obiettivo}$ tale che $p \in S_{obiettivo}$ 
 * Operatori (Azioni):
   * Sono l'applicazione della regola del Modus Ponens (MP).
   * Un operatore prende due formule (es.$A \ e \ A \Rightarrow B$) da uno stato e aggiunge la formula risultante (B) a quel set, creando un nuovo stato.
###### Logica della Ricerca
- L'agente inizia con lo stato iniziale (le premesse) e applica ripetutamente l'operatore Modus Ponens in tutte le combinazioni possibili fino a quando non genera uno stato che contiene la proposizione obiettivo p.
- La soluzione è la sequenza di applicazioni del Modus Ponens che parte dalle premesse e conduce a p.
#### Spazio degli stati
![[Pasted image 20251021135104.jpg]]

#### I problemi applicativi sono quelli reali

#### Ricerca della soluzione

![[Pasted image 20251021140538.jpg]]
#### Ricerca ad albero
- prima voglio specificare che:
	- frontiera: lista dei nodi in attesa di essere espansi(foglie dell'albero di ricerca)
	- implementata come una coda con operazioni
		- vuota?(coda)
		- POP(coda) estrae il primo elemento
		- inserisci (elemento, coda)
	- l'albero di ricerca è composto da nodi:
		- un nodo n composto da:
			- uno stato n.stato
			- un padre n.padre
			- una azione per generarlo n.azione
		- costo del cammino dal nodo iniziale al nodo n.costo-cammino indicato come $g(n)$ 
#### Pseudocodice
![[Pasted image 20251021140935.jpg]]

### Ricerca X 
![[Pasted image 20251021141804.jpg]]

##### Diversi tipi di strategie
- FIFO
- LIFO
- Coda con priorità
	- viene estratto quello con priorità più alta in base a una funzione di ordinamento
#### Strategie non informate che conosciamo
- Ricerca in ampiezza
• Ricerca di costo uniforme
• Ricerca in profondità
• Ricerca in profondità limitata
• Ricerca con approfondimento iterativo
##### Strategie informate
• Strategie di Ricerca Euristica (o informata)
- fanno uso di informazioni riguardo alla distanza
stimata dalla soluzione
### Valutazione di una strategia
i quattro criteri fondamentali utilizzati per valutare l'efficacia e l'efficienza di qualsiasi Algoritmo di Ricerca (AdR) nello spazio degli stati
• Completezza: 
-  se la soluzione esiste l’Algoritmo di Ricerca riesce a trovarla
• Ottimalità (ammissibilità): 
-  l’AdR trova la soluzione migliore, quella cioè con costo minore
• Complessità nel tempo: 
-  tempo richiesto affinché l’AdR trovi la soluzione
• Complessità nello spazio: 
-  quanta memoria viene richiesta dal completamento di una elaborazione completa dell’AdR
##### Ricerca in ampiezza
![[Pasted image 20251021142331.jpg]]
##### Pseudo
![[Pasted image 20251021142416.jpg]]
##### Complessità e analisi
- b= numero max di successori detto anche fattore di ramificazione
- d= profondità del nodo obiettivo più superficiale
- m= lunghezza massima dei cammini nello spazio di ricerca
se gli operatori hanno tutti costo k ovvero $g(n)=k*depth(n)$
- complessità temporale
	- $T(b,d)=b+b^2+...+b^d \ \rightarrow O(b^d)$
### Una miglioria: Ricerca di costo uniforme (UC) oppure Best-First
- tipo dijkstra
![[Pasted image 20251021142933.jpg]]

#### PSEUDOCODICE

![[Pasted image 20251021143052.jpg]]

#### Analisi dei costi e ottimalità
- se il costo degli archi è $\epsilon>0$ l'algoritmo è ottimo e completo  
- $C^*$ è il costo della soluzione ottima
![[Pasted image 20251021143529.jpg]]

Aggiungendo $1$, si tiene conto del fatto che si sta contando il **numero totale di livelli** (o passi) espansi, **compreso il livello zero** (la radice stessa).
- L'esponente $\left(1 + \lfloor C^*/\epsilon \rfloor\right)$ può essere interpretato come la **profondità massima** dell'albero di ricerca che deve essere esplorato per garantire che il nodo obiettivo con costo $C^*$ venga trovato per primo, assicurando l'**ottimalità**.
### Ricerca in profondità
![[Pasted image 20251021151954.png]]

#### Analisi costi

• Se m distanza massima della soluzione nello spazio di ricerca 
• b fattore di diramazione 
	• Allora la complessità temporale è: $O(b^{m+1})$

profondità usa meno memoria di ampiezza


### Ricerca in profondità limitata
La Ricerca in Profondità Limitata è una strategia di ricerca non informata che esegue la ricerca in profondità fino a un livello massimo predefinito, chiamato **limite di profondità ($\ell$)**.
- **Principio Operativo:** La ricerca procede in profondità, espandendo il nodo più recente, ma si ferma non appena si raggiunge il livello $\ell$.
- **Limite $\ell$:** Questo valore predefinito agisce come un "muro" o un vincolo; i nodi al livello $\ell$ non vengono espansi, evitando così che la ricerca si perda indefinitamente in rami profondi o cicli.
- **Esempio di Utilizzo:** È utile per problemi in cui si conosce un **limite superiore** per la profondità della soluzione (es. in un problema di _Route-finding_ tra $N$ città, la soluzione più lunga non può superare $\text{N}-1$ mosse).
• Complessità tempo: $O(b^d)$
- Spazio: $O(b*d)$
![[Pasted image 20251021152344.png]]
![[Pasted image 20251021152421.png]]

### Direzione di una ricerca
da quale punto dello spazio degli stati si inizia l'esplorazione: 
- ricerca in avanti o guidata dai dati: si esplora lo spazio di ricerca dallo stato iniziale allo stato obiettivo
-  ricerca all’indietro o guidata dall’obiettivo: si esplora lo spazio di ricerca a partire da uno stato goal e riconducendosi a sotto-goal fino a trovare uno stato iniziale
#### # 🎯 Quando Scegliere l'una o l'altra Direzione

La strategia ottimale è solitamente quella che mantiene il **fattore di diramazione minore** (cioè, l'esplorazione del grafo più stretta e focalizzata).
###### Indietro
Si preferisce la ricerca *all'indietro* quando la **diramazione dall'obiettivo è minore** o quando l'obiettivo è ben definito.

- **Obiettivo Definito:** L'obiettivo è chiaro e circoscritto, permettendo di formulare una **serie limitata di ipotesi** su come arrivarci (es. nella **dimostrazione di teoremi**).
- **Dati Ignorati o Non Noti:** I dati di partenza (stato iniziale) non sono noti o la loro acquisizione può essere **guidata dall'obiettivo** (si cercano solo i dati che sono rilevanti per il _goal_).
###### avanti
Si preferisce la ricerca *in avanti* quando la **diramazione dallo stato iniziale è minore** o quando l'obiettivo è ampio.

- **Obiettivi Multipli:** Ci sono **molti obiettivi possibili** da raggiungere o l'obiettivo è meno specifico (tipico nei problemi di _design_ o _planning_).
- **Dati come Punto di Partenza:** Si ha una **serie di dati ben definiti da cui partire** (lo stato iniziale) e l'esplorazione è necessaria per capire dove portano quei dati (es. una _funzione costo_ da minimizzare).

##### Ricerca bidirezionale
Si procede nelle due direzioni fino ad incontrarsi
![[Pasted image 20251021154403.png]]
- Complessità tempo: $O(b^ {d/2})$ (test intersezione in tempo costante, es. hash table) 
- Complessità spazio: $O(b^ {d/2})$ (almeno tutti i nodi in una direzione in memoria, 

es. usando BF) NOTA: non sempre applicabile, es. predecessori non definiti, troppi stati obiettivo …

#### TUTTE LE STRATEGIE A CONFRONTO
![[Pasted image 20251021154529.png]]

### Cosa comporta dei cicli in generale?
- Avere un grafo con dei cicli
![[Pasted image 20251021154647.png]]

- Su spazi di stati a grafo si generano più volte gli stessi nodi nella ricerca, anche in assenza di cicli.
![[Pasted image 20251021154713.png]]

- pure nelle griglie
![[Pasted image 20251021154739.png]]


#### Soluzione:
• Ricordare gli stati già visitati occupa spazio ma ci consente di evitare di visitarli di nuovo 
• Gli algoritmi che dimenticano la propria storia sono destinati a ripeterla!
##### Tre soluzioni pratiche
![[Pasted image 20251021154940.png]]

##### Esempio di soluzione con i grafi
![[Pasted image 20251021155035.png]]

### Fix della ricerca-grafo in ampiezza
![[Pasted image 20251021155104.png]]
### Fix della ricerca-grafo con costo uniforme UC
![[Pasted image 20251021155139.png]]

## Ripasso da sapere assolutamente
![[Pasted image 20251021155242.png]]
![[Pasted image 20251021155252.png]]

