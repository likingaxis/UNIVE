 - differenza tra un software tradizionale e un software AI
	- il software AI é un software che non lavora in isolamento, lavora in un ambiente che agisce in autonomia, lui riceve segnali dall'ambiente e ne risponde
		- è piu simile a un S.O rispetto a un software classico
		- l'agente non puo sapere prima le domande
		- l'agente puo avere degli effettori, coloro che consentono a lui di effettuare azioni fisiche
		- sensori, apparati in grado di vedere l'ambiente e riconoscerlo adeguatamente
		- Ciclo dell'agente
			- percepire una azione mediante i sensori
			- decido
			- agisco con una azione
			- si aggiorna
		- gli agenti hanno obiettivi e una percezione adeguata ma anche parziale del mondo esterno
			- il mondo esterno non è però una copia 1:1 bensi una copia senza tutte le informazioni, che vengono aggiunte in modo dinamico e astratto una volta che mi accorgo della loro necessità
### PERCEZIONI E AZIONI
- Percezione
- Sequenza
- l'azione è esclusivamente dopo una Percezione
### Agenti Razionali
- Per ogni possibile sequenza di percezioni, un agente razionale dovrebbe scegliere un'azione che **massimizzi il valore atteso della sua misura di prestazione**, date le informazioni fornite dalla sequenza percettiva e da ogni ulteriore conoscenza dell'agente
- quando si parla di *agente intelligente* si intende proprio *agente razionale*
**Razionalità $\neq$ Onniscienza:** Un agente razionale non è necessariamente **onnisciente** o addirittura *onnipotente*

##### Valutazione della prestazione
- ho due aspetti da analizzare per dare una valutazione a una prestazione attuabile
	- Natura della misura Esterna
		- Deve misurare gli **effetti** sull'ambiente (deve essere Esterna)
		- La misura è **esterna** all'agente. Non valuta la _modalità_ con cui l'agente si comporta, ma i **risultati effettivi** delle sue azioni sull'ambiente
	- Scopo della misura con un Criterio
		- È lo strumento con cui il **progettista** comunica all'agente l'obiettivo desiderato, definendo la **razionalità** per quel particolare problema
		- La misura è **selezionata dal progettista a seconda del problema** specifico che l'agente deve risolvere
	- questi due aspetti uniti tra loro portano alla *misura della prestazione*
#### 4 fattori della razionalità
La scelta razionale di un agente in un dato momento dipende da quattro elementi chiave:
1. **Misura di Prestazione:** Definisce il **criterio del successo** (quanto è desiderabile la sequenza di stati raggiunta).
	- Un'azione è razionale solo se contribuisce positivamente al raggiungimento degli obiettivi stabiliti da questa misura (es. un'azione è razionale se pulisce lo sporco, se la misura di prestazione premia la pulizia).
2. **Conoscenza Pregressa:** La conoscenza iniziale dell'ambiente fornita al progettista.
	- La conoscenza pregressa (come ad esempio le regole della fisica o la mappa di un'area) aiuta l'agente a **prevedere le conseguenze** delle sue azioni e quindi a scegliere l'azione più razionale.
3. **Le Percezioni Presenti e Passate (Sequenza Percettiva):** Tutta la storia delle percezioni ricevute dai sensori.
	- Poiché la razionalità massimizza il risultato _atteso_, l'agente deve basare le sue aspettative sulle **informazioni disponibili**. La sequenza percettiva è l'unica fonte di informazione in tempo reale che l'agente ha sull'attuale stato dell'ambiente.
4. **Le Capacità dell'Agente:** L'insieme delle azioni che l'agente è fisicamente o logicamente in grado di compiere attraverso i suoi attuatori.
	- Un'azione è razionale solo se rientra nelle **possibilità di esecuzione** dell'agente. Un agente razionale non sceglierà mai un'azione che non può compiere (es. un agente aspirapolvere non sceglierà di "preparare il caffè" se non ha un attuatore per farlo).

#### Razionalità e apprendimento
- l'agente non riceve quasi mai *a priori tutta la conoscenza* 
- *L’agente razionale* deve essere in grado di modificare il proprio comportamento con l’esperienza (le percezioni passate)
### Agenti autonomi
- Un agente è definito *autonomo* nella misura in cui il suo comportamento dipende dalla sua esperienza (cioè, dalle percezioni passate e dall'apprendimento che ne deriva). 
- Al contrario un agente il cui *comportamento* è determinato soltanto dalla sua *conoscenza built-in* (la conoscenza pre-programmata) è considerato non autonomo.

# AMBIENTE E CODIFICA PEAS
- Il **problema P** di un agente, ovvero la sua attività principale, è definito dalla **caratterizzazione adeguata dell'ambiente operativo**.
- La progettazione di un **agente razionale** corrisponde alla **soluzione** per questo problema.

Il framework **PEAS** fornisce un metodo sistematico per specificare l'ambiente operativo, identificando i quattro fattori cruciali che influenzano la progettazione dell'agente:

1. **P**erformance (Prestazioni)
- **Definizione:** La **misura di prestazione** che definisce il **criterio del successo**. Valuta la sequenza di stati dell'ambiente per determinare la desiderabilità del comportamento dell'agente.
- _Esempio: Autista di taxi automatico:_ Sicurezza, velocità, legalità, massimizzazione dei profitti.

 2. **E**nvironment (Ambiente)

- **Definizione:** La **parte dell'universo** di cui ci interessa lo stato quando progettiamo l'agente — la parte che influenza ciò che l'agente percepisce e sulla quale influiscono le sue azioni.
- _Esempio: Autista di taxi automatico:_ Strade, altri veicoli nel traffico, pedoni, clienti, tempo atmosferico.
    

 3. **A**ctuators (Attuatori)

- **Definizione:** I **mezzi** che l'agente utilizza per **agire sull'ambiente**.
- _Esempio: Autista di taxi automatico:_ Sterzo, acceleratore, freni, clacson.

 4. **S**ensors (Sensori)

- **Definizione:** I **dispositivi** attraverso i quali l'agente **percepisce** il suo ambiente. Il dato percepito è chiamato **percezione** (_percept_).
- _Esempio: Autista di taxi automatico:_ Telecamere, radar, tachimetro, GPS.

### UN ambiente e il problema hanno diverse proprieta
- completamente o parzialmente osservabile
- agente singolo o multiplo
	- agente non indicava multiple ia?
- deterministico, stocazzo, non deterministico
	- il primo e se sono sicuro al 100% di cosa succede
	- stocazzo se ho una certa prob
	- non det se ho difficolta a determinare cosa deve avvenire
- episodico vs sequenziale
	- episodico quando decisioni sono prese singolarmente
	- sequenziale decisioni in sequenza
- statico o dinamico
	- definiti da un cambiamento ambientale o meno
	- statico quando l'agente va piu veloce dei cambiamenti quindi non cambia l'ambiente ecc
	- dinamico quando le scelte vanno di paripasso ai cambiamenti dell'ambiente
		- tipo taxi autonomo
	- semi dinamico, l'ambiente non cambia ma la valutazione dell'agente si
- discreto o continuo
	- discreti, ambienti di esame
		- modificano ogni tot tick o scansioni e transizioni temporali
		- continuo quando le variabile vengono descritte da numeri reali
### Osservabilità dell'ambiente
- completamente osservabile
- parzialmente osservabile
## Come automatizzare un ambiente
- attraverso uno strumento software che vuole:
	- generare stimoli per gli agenti
	- raccogliere le azioni in risposta
	- aggiornare il proprio stato
	- attivare altri processi implicati dal cambiamento effettuato
	- valutare le prestazioni degli agenti
### AGENTE
architettura+programma
funzione che prende percezioni e manda in output azioni
una funzione di un agente prende in input una percezione
manda in output una azione
ha una memoria che deve aggiornare
effettua una azione scegliendo la migliore
aggiorna la memoria a seguito di una azione
restituisco l'azione
****
## DIVERSI TIPI DI AGENTE
- studiare le funzioni degli agenti!
- AGENTE BASATO SU TABELLA
	- AGENTE REATTIVO SEMPLICE, DI CUI UN ESEMPIO AGENTE BASATO SU TABELLA?
	- IL PUZZO DEL WUMPUS
- AGENTI BASATI SU MODELLO 
	- molto piu complessi, non scrivi solo una tabella con match della regola e match condizionale
	- devo avere la memorizzazione del modello(ovvero, prendere i dettagli essenziali di un certo oggetto e codificarli in dati comprensibili)
	- lo scopo viene definito dall'azione, devi fare l'azione e basta
- AGENTE CON OBIETTIVO
	- un agente ancora piú complesso ragiona ponendosi degli obiettivi
	- un goal non e per forza la soluzione migliore possibile ma cio che ci direziona verso una soluzione valida e accettabile
- utility e il goal?
	- utility e una autovalutazione dell'agente
ENUMERATI E NON VALUTATI
- AGENTI CON VALUTAZIONE DI UTILITÀ
	- valutazione da parte dell'ambiente
- AGENTI CHE APPRENDONO
	- dentro performance element abbiamo state world and utility
	- il performance element quando lavora non si addestra subito, bensi una volta accumulati gli addestramenti viene interrotto il performance element e viene sostituito da una nuova versione addestrata dai feedback ricevuti
		- ambiente simulato a volte usato nel batch learning
### IMPLICAZIONI COMPUTAZIONALI
- rappresentazioni
- funzioni principale degli agenti
- sborra
## TIPI DI RAPPRESENTAZIONE
- ATOMICA
- FATTORIZZATAf
- STRUTTURATA
## Pattern linguistici via machine learning con encoder e decoders per NL
- meccanismo di encoding che ci porta ad avere per ogni d appartenente a D d freccia sopra appartenente a R con 256 che fa encoding e cardinalita di D circa 250k
- con una certa probabilita abbiamo il decoding in teoria
- si chiamano LANGUAGE MODEL perche forniscono un modello stocastico che predice la transizione successiva ovvero la parola che va detta dopo
### DESIDERATA DI UN AGENTE
