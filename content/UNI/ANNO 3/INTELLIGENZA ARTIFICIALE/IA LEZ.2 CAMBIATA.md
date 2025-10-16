### SOFTWARE TRADIZIONALE VS AGENTE IA
- **Software Tradizionale** è tipicamente un programma che esegue una serie fissa e predefinita di istruzioni per elaborare un input e produrre un output, lavorando spesso in isolamento.

- Il **Software AI (Agente AI)**, al contrario, non lavora in isolamento. È progettato per operare in un **ambiente** con un certo grado di **autonomia**, ricevendo segnali da esso e rispondendo con azioni.


## Definizione e ciclo di un agente intelligente

- Un agente è un'entità generica che riceve percezioni (percepts) dall'ambiente tramite sensori e agisce sull'ambiente mediante azioni attraverso attuatori (effectors). È il termine tecnico che descrive l'entità che ha un'interfaccia con il mondo. Qualsiasi programma o robot che percepisce e agisce è, per definizione, un agente.
- Ciclo dell'agente
	- percepire una azione mediante i sensori
		- riceve dei dati
	- decido
		- elabora la percezione ed effettua la sua funzione agente
	- agisco con una azione
		- esegue l'azione scelta anche mediante gli effettori
	- si aggiorna
		- aggiorna l'ambiente contando l'azione appena eseguita

![[Pasted image 20251013185628.png]]
### Percezione e Azioni
### 1. Percezione (Percept)
-  L'**input ricevuto dai sensori** dell'agente
### 2. Sequenza Percettiva (Percept Sequence)
-  La **storia completa di tutto ciò che l'agente ha percepito** (nella sua intera esistenza)
### 3. Funzione Agente (Agent Function)

- Definisce l'**azione da compiere per ogni possibile sequenza percettiva**
    - È una **descrizione matematica astratta** del comportamento dell'agente: $f: P^* \to A$ (dove $P^*$ è l'insieme delle sequenze percettive e $A$ è l'insieme delle azioni)
    - **La scelta dell'azione è funzione unicamente della sequenza percettiva** (e della conoscenza interna)
### 4. Programma Agente (Agent Program)
-  È l'**implementazione concreta** della funzione agente, in esecuzione all'interno di un sistema fisico (l'architettura dell'agente)
- A differenza della funzione agente (che considera l'intera sequenza percettiva), il programma agente **prende in input solo la percezione corrente** e deve preoccuparsi di memorizzare lo stato interno per tenere traccia della storia passata, se necessario

### AGENTE E AMBIENTE
![[Pasted image 20251016085815.png]]

## Agenti Razionali
- Per ogni possibile sequenza di percezioni, un agente razionale dovrebbe scegliere un'azione che **massimizzi il valore atteso della sua misura di prestazione**, date le informazioni fornite dalla sequenza percettiva e da ogni ulteriore conoscenza dell'agente
- quando si parla di *agente intelligente* si intende proprio *agente razionale*
**Razionalità $\neq$ Onniscienza:** Un agente razionale non è necessariamente **onnisciente** o addirittura *onnipotente*
#### Valutazione della prestazione
- ho due aspetti da analizzare per dare una valutazione a una prestazione attuabile
	- Natura della misura Esterna
		- Deve misurare gli **effetti** sull'ambiente (deve essere Esterna)
		- La misura è **esterna** all'agente. Non valuta la _modalità_ con cui l'agente si comporta, ma i **risultati effettivi** delle sue azioni sull'ambiente
	- Scopo della misura con un Criterio
		- È lo strumento con cui il **progettista** comunica all'agente l'obiettivo desiderato, definendo la **razionalità** per quel particolare problema
		- La misura è **selezionata dal progettista a seconda del problema** specifico che l'agente deve risolvere
	- questi due aspetti uniti tra loro portano alla *misura della prestazione*
### i 4 fattori della razionalità
La scelta razionale di un agente in un dato momento dipende da quattro elementi chiave:
1. **Misura di Prestazione:** Definisce il **criterio del successo** (quanto è desiderabile la sequenza di stati raggiunta).
	- Un'azione è razionale solo se contribuisce positivamente al raggiungimento degli obiettivi stabiliti da questa misura (es. un'azione è razionale se pulisce lo sporco, se la misura di prestazione premia la pulizia).
2. **Conoscenza Pregressa:** La conoscenza iniziale dell'ambiente fornita al progettista.
	- La conoscenza pregressa (come ad esempio le regole della fisica o la mappa di un'area) aiuta l'agente a **prevedere le conseguenze** delle sue azioni e quindi a scegliere l'azione più razionale.
3. **Le Percezioni Presenti e Passate (Sequenza Percettiva):** Tutta la storia delle percezioni ricevute dai sensori.
	- Poiché la razionalità massimizza il risultato _atteso_, l'agente deve basare le sue aspettative sulle **informazioni disponibili**. La sequenza percettiva è l'unica fonte di informazione in tempo reale che l'agente ha sull'attuale stato dell'ambiente.
4. **Le Capacità dell'Agente:** L'insieme delle azioni che l'agente è fisicamente o logicamente in grado di compiere attraverso i suoi attuatori.
	- Un'azione è razionale solo se rientra nelle **possibilità di esecuzione** dell'agente. Un agente razionale non sceglierà mai un'azione che non può compiere (es. un agente aspirapolvere non sceglierà di "preparare il caffè" se non ha un attuatore per farlo).

### Razionalità e apprendimento
- l'agente non riceve quasi mai *a priori tutta la conoscenza* 
- *L’agente razionale* deve essere in grado di modificare il proprio comportamento con l’esperienza (le percezioni passate)
## Agenti autonomi
- Un agente è definito *autonomo* nella misura in cui il suo comportamento dipende dalla sua esperienza (cioè, dalle percezioni passate e dall'apprendimento che ne deriva). 
- Al contrario un agente il cui *comportamento* è determinato soltanto dalla sua *conoscenza built-in* (la conoscenza pre-programmata) è considerato non autonomo.

## AMBIENTE E CODIFICA PEAS
- Il **problema P** di un agente, ovvero la sua attività principale, è definito dalla **caratterizzazione adeguata dell'ambiente operativo**.
- La progettazione di un **agente razionale** corrisponde alla **soluzione** per questo problema.

Il framework **PEAS** fornisce un metodo sistematico per specificare l'ambiente operativo, identificando i quattro fattori cruciali che influenzano la progettazione dell'agente:

##### **P**erformance (Prestazioni)
- **Definizione:** La **misura di prestazione** che definisce il **criterio del successo**. Valuta la sequenza di stati dell'ambiente per determinare la desiderabilità del comportamento dell'agente.
- _Esempio: Autista di taxi automatico:_ Sicurezza, velocità, legalità, massimizzazione dei profitti.
##### **E**nvironment (Ambiente)
- **Definizione:** La **parte dell'universo** di cui ci interessa lo stato quando progettiamo l'agente — la parte che influenza ciò che l'agente percepisce e sulla quale influiscono le sue azioni.
- _Esempio: Autista di taxi automatico:_ Strade, altri veicoli nel traffico, pedoni, clienti, tempo atmosferico.
##### **A**ctuators (Attuatori)
- **Definizione:** I **mezzi** che l'agente utilizza per **agire sull'ambiente**.
- _Esempio: Autista di taxi automatico:_ Sterzo, acceleratore, freni, clacson.

##### **S**ensors (Sensori)
- **Definizione:** I **dispositivi** attraverso i quali l'agente **percepisce** il suo ambiente. Il dato percepito è chiamato **percezione** (_percept_).
- _Esempio: Autista di taxi automatico:_ Telecamere, radar, tachimetro, GPS.

##### ESEMPIO CON CHAT GPT
![[Pasted image 20251016093738.png]]
## Proprietà dell’ambiente e del problema
I diversi ambienti di lavoro di un agente si caratterizzano lungo alcune dimensioni che ne influenzano la complessità e la progettazione.
### Osservabilità
- **Completamente Osservabile**
	- L'agente ha accesso allo **stato completo** dell'ambiente in ogni momento, attraverso i suoi sensori. È sufficiente che i sensori misurino tutti gli aspetti _rilevanti_ per la scelta dell'azione.

- **Parzialmente Osservabile**
	- L'agente non può vedere l'intero stato dell'ambiente a causa di sensori rumorosi, inaccurati o incompleti. Se l'agente non ha sensori, l'ambiente è **inosservabile**.
### Numero di agenti
- **Agente Singolo**
	- L'ambiente contiene solo un agente che opera e le "altre" entità possono essere trattate come semplici oggetti che si comportano secondo le leggi della fisica.

- **Multi-Agente**
	- L'ambiente contiene **più agenti**, e la distinzione chiave è se il comportamento di un'altra entità può essere descritto come il tentativo di **massimizzare una misura di prestazione** il cui valore dipende dalle azioni del tuo agente.

### Prevedibilità del Modello di Transizione
- **Deterministico**

	- Lo stato successivo dell'ambiente è **completamente determinato** dallo stato corrente e dall'azione dell'agente (o degli agenti).
- **Stocastico**
	- Il modello dell'ambiente è associato esplicitamente a **probabilità** per i risultati delle azioni (es. "c'è una probabilità del 25% che domani piova").

- **Non Deterministico**
	- Lo stato successivo non è completamente determinato, e le varie possibilità di risultato sono elencate **senza essere quantificate** (es. "c'è la possibilità che domani piova").
### Struttura del Ciclo di Interazione
- **Episodico**
	- L'esperienza dell'agente è divisa in episodi atomici. Ogni decisione è **indipendente** dalle azioni intraprese negli episodi precedenti.

- **Sequenziale**
	- Ogni decisione può **influenzare tutte le decisioni successive**. Le azioni a breve termine hanno conseguenze a lungo termine (es. gli scacchi, guidare).
### Cambiamento Temporale
- **Statico**

	- L'ambiente **non cambia** mentre l'agente sta decidendo come agire.

- **Dinamico**

	- L'ambiente **può cambiare** mentre l'agente sta decidendo. Richiede che l'agente osservi continuamente e risponda rapidamente (es. un taxi autonomo).

- **Semi-Dinamico**

	- L'ambiente in sé **non cambia** col tempo, ma la **misura di prestazione** (la valutazione) dell'agente sì (es. scacchi giocati con l'orologio).
### Natura delle Variabili
- **Discreto**

	- Lo stato dell'ambiente, la gestione del tempo, le percezioni e le azioni sono rappresentabili con un **numero finito** di valori (es. le caselle su una scacchiera, input digitali).

- **Continuo**

	- Le variabili (stato, tempo, azioni) sono descritte da **numeri reali** e possono assumere un numero infinito di valori (es. la velocità di un'auto, l'angolo di sterzo).
### Visibilità
- **Ambiente Noto (Known)**
	- L'agente (o il suo progettista) **conosce le regole del gioco**. Sono noti i risultati (o le probabilità di risultato, se l'ambiente è stocastico) per tutte le azioni.
	- L'agente può eseguire una **ricerca _offline_** (pianificazione) per calcolare la sequenza di azioni ottimali prima di agire.

- **Ambiente Ignoto (Unknown)**
	- L'agente **non conosce le regole del gioco**. L'agente non sa come l'ambiente reagirà alle sue azioni.
	- L'agente **dovrà apprendere come funziona** l'ambiente. Dovrà compiere **azioni esplorative** (sperimentazione) per acquisire la conoscenza dinamica necessaria a prendere buone decisioni.
## ESEMPI
![[Pasted image 20251016094914.png]]


# Ambiente e automazione
L’ambiente richiede la simulazione attraverso uno strumento software che si occupa di:
- generare stimoli per gli agenti
- raccogliere le azioni in risposta
- aggiornare il proprio stato
- attivare altri processi implicati dal cambiamento effettuato
- valutare le prestazioni degli agenti
