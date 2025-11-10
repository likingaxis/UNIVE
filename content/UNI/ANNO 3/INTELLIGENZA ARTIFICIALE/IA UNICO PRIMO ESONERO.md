## Definizione di IA
L’**Intelligenza Artificiale (IA)** è la disciplina che studia **come creare sistemi capaci di osservare, comprendere e riprodurre comportamenti intelligenti**.  
In altre parole, mira a costruire macchine in grado di **percepire l’ambiente**, **ragionare sulle informazioni ricevute** e **agire in modo autonomo** per raggiungere un obiettivo.
## Definizione di Agente
Nel linguaggio dell’IA, un **agente** è un’entità autonoma capace di **percepire l’ambiente** (attraverso percettori) e **intervenire su di esso** attraverso le proprie azioni con gli attuatori.  
Un singolo sistema può essere considerato un agente, ma in molti casi si parla di **sistemi multi-agente**, in cui più entità collaborano o competono per raggiungere determinati obiettivi.
## IA FORTE VS DEBOLE
L’IA può essere studiata e progettata da diverse prospettive. Le due principali sono:
- **IA FORTE**
	- **L’IA forte** si pone l’obiettivo ambizioso di *riprodurre il ragionamento umano*.
	- Non si limita quindi a fornire risposte corrette, ma cerca di *simulare i processi cognitivi* che portano un essere umano a elaborarle.
- **IA DEBOLE**
	- L’**IA debole**, al contrario, punta a *risolvere problemi pratici specifici*, senza preoccuparsi di replicare il pensiero umano.  
	- L’obiettivo è ottenere *prestazioni efficaci*, anche se il sistema non “comprende” davvero ciò che fa.  

## UMANITÀ O RAZIONALITÀ
![[Pasted image 20251013184910.png]]
L’IA può essere progettata per ispirarsi a due diversi principi:

- il **comportamento umano**, che riflette come le persone pensano e agiscono nella realtà;
- la **razionalità pura**, cioè l’ottimizzazione logica delle decisioni.
## Problem Solving
Una delle funzioni centrali dell’IA è il **problem solving**, ossia la capacità di risolvere problemi complessi partendo da informazioni incomplete o ambigue.

## Instruction Tuning
L’**Instruction Tuning** è una tecnica di addestramento in cui il modello impara a **seguire istruzioni testuali** in modo coerente.  
L’input è spesso costituito da una *premessa* seguita da una *domanda*, che attiva un processo di ragionamento iterativo.

## Prompt
Il **prompt** rappresenta la **base di comunicazione tra l’utente e il modello**.  
È una combinazione di tre elementi:
- *premessa*, contesto o introduzione al compito da eseguire
- *domanda*, ciò che si chiede al modello
- *contesto*, informazioni aggiuntive

## Il Test di Turing

Nel 1950, **Alan Turing** propose un esperimento per stabilire se una macchina potesse essere considerata intelligente.

> “Un sistema è intelligente se un osservatore umano, dialogando con esso, non riesce a distinguere se sta parlando con una persona o con una macchina.”

## L’Effetto IA
Ogni volta che una tecnologia basata sull’IA diventa di uso comune, **smettiamo di percepirla come intelligenza artificiale**.  
È il fenomeno noto come **Effetto IA**.


## Ciclo di un agente intelligente
- Ciclo dell'agente
	- *percepire una azione mediante i sensori*
		- riceve dei dati
	- *decido*
		- elabora la percezione ed effettua la sua funzione agente
	- *agisco con una azione*
		- esegue l'azione scelta anche mediante gli effettori
	- *si aggiorna*
		- aggiorna l'ambiente contando l'azione appena eseguita
![[Pasted image 20251013185628.png]]
## Percezioni e Azioni dell'agente
- come abbiamo detto l'agente riceve *percezioni* ,ovvero l'**input ricevuto dai sensori** dell'agente
	- l'insieme di tutte le percezioni passate rappresentano la *Sequenza Percettiva*
- La *Funzione Agente* serve per definire le azioni che esso può eseguire
	- Definisce l'**azione da compiere per ogni possibile sequenza percettiva**
	    - È una **descrizione matematica astratta** del comportamento dell'agente: $f: P^* \to A$ 
		    - (dove $P^*$ è l'insieme delle sequenze percettive e $A$ è l'insieme delle azioni)
- Il *programma Agente* è l'**implementazione concreta** della funzione agente, in esecuzione all'interno di un sistema fisico (l'architettura dell'agente)
## Struttura di un Agente con Ambiente
![[Pasted image 20251016085815.png]]

## Agenti Razionali
- quando si parla di *agente intelligente* si intende proprio *agente razionale*
	- **Razionalità $\neq$ Onniscienza:** Un agente razionale non è necessariamente **onnisciente** o addirittura *onnipotente*
- L'agente Razionale è colui che per ogni possibile sequenza di percezioni, cerca di scegliere un'azione che **massimizzi il valore atteso della sua misura di prestazione**, considerando le sue percezioni passate e le sue capacità. 
	- Per **Misura di Prestazione** si intende un criterio volto a valutare l'efficacia di una azione scelta dall'agente 
		- Per costruire una misura di prestazione utile, bisogna considerare **due aspetti fondamentali**:
			- *Natura* della misura esterna
				- La misura deve essere **esterna all’agente**, cioè guardare **agli effetti che le sue azioni producono sull’ambiente**, non ai processi interni.
			- *Scopo* della misura → “Criterio del progettista”
				- La misura della prestazione è quindi uno strumento per **definire la razionalità** del comportamento: ossia, cosa significa “agire bene” in quel contesto.
				- questo è demandato al progettista

## 4 fattori della razionalità
La scelta razionale di un agente in un dato momento dipende da quattro elementi chiave:
- *Misura di prestazione*
	- Un'azione è razionale solo se contribuisce positivamente al raggiungimento degli obiettivi stabiliti da questa misura
- *Conoscenza pregressa*
	- La conoscenza pregressa (come ad esempio le regole della fisica o la mappa di un'area) aiuta l'agente a **prevedere le conseguenze** delle sue azioni
- *Percezioni presenti e passate*
	- Tutta la storia delle percezioni ricevute dai sensori.
- *Capacità dell'agente*
	- Un'azione è razionale solo se rientra nelle **possibilità di esecuzione** dell'agente.
## Agenti autonomi
Un agente è definito *autonomo* nella misura in cui il suo comportamento dipende dalla sua esperienza (cioè, dalle percezioni passate e dall'apprendimento che ne deriva). 
## Definizione di Ambiente Operativo e PEAS
- Il **problema P** di un agente, ovvero la sua attività principale, è definito dalla **caratterizzazione adeguata dell'ambiente operativo**.
- La progettazione di un **agente razionale** corrisponde alla **soluzione** per questo problema.

Il framework **PEAS** fornisce un metodo sistematico per specificare *l'ambiente operativo*, identificando i quattro fattori cruciali che influenzano la progettazione dell'agente:
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
#### Esempio con Chat GPT
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
#### ESEMPI
![[Pasted image 20251016094914.png]]

## Ambiente simulato
In un sistema automatizzato o simulato, l’ambiente **non è reale**, ma **modellato da un software** che ne gestisce gli stati e le regole di funzionamento.
Il software che simula l’ambiente deve ricreare l’intero **ciclo percezione–azione–valutazione**.  
Per farlo, svolge una serie di funzioni fondamentali:
- generare stimoli per gli agenti
- raccogliere le azioni in risposta
- aggiornare il proprio stato
- attivare altri processi implicati dal cambiamento effettuato
- valutare le prestazioni degli agenti
#### Esempio di **ambiente di simulazione** che serve per valutare uno o più **agenti**.
![[Pasted image 20251016140906.jpg]]
## STRUTTURA DI UN AGENTE
$$ AGENTE=ARCHITETTURA + PROGRAMMA$$
- l'agente ha una sua funzione ( come spiegato in precedenza)
- `Agent()`
$$Agent:Percezioni \rightarrow Azioni$$
##### Pseudo programma agente
![[Pasted image 20251016141848.jpg]]

# Diverse architetture di agenti
- <u><font color="#4bacc6">Basata su tabella</font></u>
	- Ogni azione dell'agente viene decisa in base a una **tabella che associa un'azione ad ogni possibile sequenza di percezioni**.  
	- gli *agenti reattivi semplici* usano questo tipo di architettura
![[Pasted image 20251016143808.jpg]]
Partendo dall'ambiente, l'agente
- riceve delle percezioni tramite i sensori
	- capisce lo stato dell'ambiente
- guarda nella sua tabella (percezioni -> azioni)
	- esegue l'azione  
![[Pasted image 20251016144146.jpg]]


- <u><font color="#4bacc6">Basata su modello</font></u>
- Gli agenti che usano questa architettura hanno una **memoria interna** che gli permette di rappresentare il mondo in cui si trovano. questi **mantengono e aggiornano uno stato interno** che descrive _cosa credono che stia succedendo_ 
![[Pasted image 20251016144855.jpg]]
🔹 1️⃣ Percezione e costruzione del modello del mondo
L’agente:
- **riceve le percezioni** dall’ambiente attraverso i **sensori**;
- elabora da queste informazioni la rappresentazione di **“what the world is like now”**, cioè com’è il mondo in questo momento;
- **aggiorna lo stato interno** (la sua memoria) combinando:
    - le percezioni **attuali**,
    - le **percezioni passate**,
    - la conoscenza di **come il mondo evolve naturalmente** nel tempo (“how the world evolves”),
    - e la conoscenza di **come le proprie azioni influenzano il mondo** (“what my actions do”).
🔹 2️⃣ Predizione e decisione
Una volta aggiornato il proprio stato interno, l’agente:
- utilizza il modello del mondo per **prevedere** cosa accadrà dopo e per valutare le possibili conseguenze delle sue azioni;
- decide **“what action I should do now”**, ossia l’azione più opportuna da eseguire in base:
    - al proprio stato interno aggiornato,
    - alle **regole condizionali azione–condizione** (_condition–action rules_),
    - e alla **misura di prestazione** (il criterio con cui il progettista valuta l’efficacia del comportamento).
🔹 3️⃣ Esecuzione dell’azione
Infine:
- l’agente invia l’azione scelta agli **attuatori**,
- che la eseguono sull’ambiente, modificandone lo stato.

👉 A questo punto il ciclo ricomincia: l’ambiente cambia, genera nuove percezioni e l’agente aggiorna di nuovo il proprio modello interno.

![[Pasted image 20251016145402.jpg]]


- <u><font color="#4bacc6">Basata su obiettivo</font></u>
	- Gli **agenti basati su obiettivo** sono un’evoluzione degli agenti basati su modello.  
	- Come loro, **mantengono uno stato interno** del mondo (memoria e conoscenza di come si evolve), 
	- ma in più **hanno un obiettivo da raggiungere (goal)** che guida la scelta delle azioni.
![[Pasted image 20251016145830.jpg]]
L’**agente basato su obiettivo**, **va oltre**:  
→ non si limita a prevedere _cosa succederà_, ma **decide cosa vuole che succeda**, e **sceglie le azioni** per raggiungere un _goal_ (obiettivo) desiderato.

- <u><font color="#4bacc6">Basato su utilità</font></u>
Gli **agenti con valutazione di utilità** sono un’estensione degli agenti basati su obiettivo.  
Anziché limitarsi a _raggiungere un goal_, valutano **quanto è “buono” o vantaggioso** ciascun possibile stato del mondo.
- utilizzano una funzione di utilità
	- È una **funzione che assegna a ogni stato un valore numerico** → rappresenta **quanto l’agente è soddisfatto** in quello stato (“quanto sarò felice se arrivo lì”).
$$U(s) = \text{grado di utilità dello stato }$$

- <u><font color="#4bacc6">Basata su apprendimento</font></u>
	- Questi agenti sono in grado di **migliorare il proprio comportamento nel tempo**, grazie a un meccanismo di apprendimento interno.
![[Pasted image 20251016150117.jpg]]
- 🔹 **Performance Element**
	- È il **cuore operativo** dell’agente:
	- Riceve **le percezioni** dai sensori.
	- Sceglie **le azioni** da eseguire tramite gli attuatori.
	- È la parte che determina **“come si comporta l’agente ora”**.

- 🔹 **Critic**
	- Valuta la qualità delle azioni dell’agente.
	- Confronta le prestazioni osservate con un **performance standard** (criterio di riferimento) e fornisce **feedback**.
	- Usa le percezioni ricevute dai sensori per osservare gli effetti delle azioni.
	- Produce un segnale di feedback (positivo o negativo) che dice all’agente quanto bene ha agito.

- 🔹 **Learning Element**
	- Il **modulo di apprendimento** utilizza il feedback del _critic_ per **migliorare il comportamento futuro** dell’agente.
	- Aggiorna il _performance element_ (cioè modifica il modo in cui l’agente prende decisioni).

- 🔹 **Problem Generator**
	- Suggerisce **nuove azioni da provare** per ottenere esperienze utili all’apprendimento.

## Rappresentazione degli stati
Quando un agente deve ragionare o apprendere, ha bisogno di **una rappresentazione interna dello stato del mondo**.  

##### 1. Rappresentazione atomica
![[Pasted image 20251016150129.jpg]]
- Ogni **stato** o **situazione** è considerato come un **blocco unico e indivisibile**.
- L’agente conosce solo _che quello stato esiste_, ma **non ha informazioni sulla sua struttura interna**.
- È il modello più semplice:
	→ **stati finiti**, **transizioni semplici**, a volte con **probabilità associate** (se stocastico).

##### 2. Rappresentazione fattorizzata
![[Pasted image 20251016150349.jpg]]
- Ogni stato è **descritto tramite un insieme di variabili (fattori)**.
- Invece di trattare tutto come un unico blocco, l’agente **rappresenta le caratteristiche principali** dello stato (es. posizione, temperatura, velocità, ecc.).
- Queste variabili possono essere viste come **dimensioni in uno spazio vettoriale**.

##### 3. Rappresentazione strutturata
![[Pasted image 20251016150400.jpg]]
- È la più **ricca e complessa**.
- Gli oggetti non sono solo elenchi di valori, ma **entità con relazioni tra loro** (come in un grafo o in un linguaggio logico).
- Permette di descrivere **relazioni, gerarchie e dipendenze**.

## AGENTI RISOLUTORI DI PROBLEMI
- si basano sull'architettura basata sui goal
	- Tipologia di agenti che puntano a risolvere un problema attraverso un algoritmo ben definito
		- Di solito usano algoritmi di ricerca
			- che possono essere di tipo:
				- *informato*
					- L’agente stima quanto è vicino al goal, riducendo la ricerca
						- Greedy Search, A*
				- *non informato*
					- L’agente non conosce la distanza dal goal, esplora tutto lo spazio
						- BFS, DFS, Uniform Cost
	- l’agente risolutore di problemi **costruisce prima un piano completo di azioni**, tramite un **processo di ricerca interna**.
#### 🧩 Rappresentazione e categorie
- Gli agenti risolutori di problemi utilizzano rappresentazioni **atomiche**,  
    dove gli **stati del mondo** sono **entità indivisibili** (nodi di un grafo) **senza struttura interna visibile**.
- Gli agenti che invece utilizzano **rappresentazioni fattorizzate o strutturate** (cioè con sottocomponenti interne agli stati) sono detti **agenti pianificatori**.
- Il **ragionamento dell’agente atomico** è puramente **algoritmico** e basato su **modelli di grafo** (stati = nodi, azioni = archi).
Gli agenti risolutori di problemi operano in ambienti **semplici e controllabili**, tipicamente:
- Episodici
- A singolo agente
- **Completamente osservabili**
- **Deterministici**
- **Statici** (non cambiano mentre l’agente pensa)
- **Discreti** (stati e azioni finite)
- **Noti** (modello di transizione conosciuto)
####  Esecuzione: anello aperto vs anello chiuso
- In un **ambiente completamente osservabile, deterministico e noto**, la soluzione è una **sequenza fissa di azioni**.  
    → L’agente può **ignorare le percezioni durante l’esecuzione**:  
    si parla di **sistema ad anello aperto (open-loop)**.
- Se invece:
    - il modello può essere impreciso, oppure
    - l’ambiente non è deterministico,  
        → l’agente deve **monitorare le percezioni e riadattarsi**,  
        quindi lavora in **anello chiuso (closed-loop)**.
#### ⚙️  Le quattro fasi principali del processo di risoluzione

| Fase                               | Descrizione                                         |
| ---------------------------------- | --------------------------------------------------- |
| **1. Formulazione dell’obiettivo** | L’agente decide cosa vuole raggiungere              |
| **2. Formulazione del problema**   | Definisce stati, azioni, transizioni e costi        |
| **3. Ricerca (Search)**            | Calcola una sequenza ottimale di azioni nel modello |
| **4. Esecuzione (Execution)**      | Esegue il piano nel mondo reale                     |

📌 Durante la **ricerca**, l’agente non agisce fisicamente: pensa, simula e valuta internamente.
## DEFINIZIONE FORMALE DEL PROBLEMA DI RICERCA
Un **problema di ricerca** è una **descrizione astratta** di una situazione in cui un agente deve **trovare una sequenza di azioni** che porti dallo **stato iniziale** a uno **stato obiettivo**.
$$\text{Problema di ricerca} = \langle S, S_0, A, Result, Goal, C \rangle$$
Un problema di ricerca è definito da **cinque elementi principali**:

|#|Componente|Descrizione|
|---|---|---|
|**1️⃣**|**Stato iniziale**|È lo stato in cui si trova l’agente all’inizio del problema.|
|**2️⃣**|**Azioni possibili**|La funzione **Azioni(s)** restituisce l’insieme finito di azioni eseguibili nello stato `s`. Ogni azione è _applicabile_ in `s`.  <br>Es: `Azioni(Arad) = {VersoSibiu, VersoTimisoara, VersoZerind}`|
|**3️⃣**|**Modello di transizione**|Descrive come le azioni modificano lo stato del mondo.  <br>Formalmente: `Risultato(s, a) = s′` indica lo stato successivo ottenuto eseguendo l’azione `a` nello stato `s`.  <br>Es: `Risultato(Arad, VersoZerind) = Zerind`|
|**4️⃣**|**Insieme di stati obiettivo**|Contiene uno o più stati che soddisfano il goal dell’agente (le condizioni di successo).|
|**5️⃣**|**Funzione di costo**|La funzione `CostoAzione(s, a, s′)` (o `c(s, a, s′)`) assegna un valore numerico positivo al costo di eseguire `a` in `s` per raggiungere `s′`.  <br>Serve per confrontare soluzioni e trovare quella più economica.|
- Una **sequenza di azioni** forma un **cammino** (_path_) attraverso lo spazio degli stati.
- Una **soluzione** è un cammino che parte dallo stato iniziale e arriva a uno stato obiettivo.
- Una **soluzione ottima** è quella con **costo totale minimo**, rispetto alla funzione di costo definita.
- Lo **spazio degli stati** può essere rappresentato come un **grafo**:
    - i **nodi** (vertici) rappresentano gli **stati**;
    - gli **archi orientati** rappresentano le **azioni** e le **transizioni**;
    - i **pesi degli archi** rappresentano i **costi delle azioni**.
#### Modello e Tipi di astrazione
Quando formuliamo un problema (es. “**raggiungere una certa città**”), stiamo creando un **modello**,  
cioè una **descrizione matematica astratta** della realtà.  
Non rappresentiamo il mondo in tutti i suoi dettagli, ma solo gli aspetti **rilevanti per la risoluzione del problema**.
Il processo con cui **semplifichiamo una rappresentazione** eliminando dettagli non essenziali  
è chiamato **astrazione**.


|Tipo di astrazione|Definizione|Utilità|
|---|---|---|
|**Astrazione Valida**|Ogni soluzione trovata nel modello astratto può essere **espansa** in una soluzione valida nel mondo reale più dettagliato.|Garantisce che la soluzione “astratta” sia **corretta e applicabile** nella realtà.|
|**Astrazione Utile**|Le azioni nella soluzione astratta sono **più facili o più economiche** da eseguire rispetto a quelle nel problema reale.|Permette di **semplificare la ricerca** e ridurre il costo computazionale.|

📌 Una buona astrazione è **sia valida che utile**.



### PROBLEMI ESEMPLIFICATIVI E REALI
Lo studio dei **problemi di ricerca** avviene partendo da **problemi esemplificativi (standardizzati)**,  
che servono a **testare metodi di risoluzione**, per poi passare a **problemi reali**,  
più complessi e legati a contesti pratici.

- I problemi **esemplificativi**:
	- Servono per **illustrare o mettere alla prova diversi metodi di risoluzione** (ricerca, ottimizzazione, pianificazione, ecc.).
	- Sono **astratti**, **semplificati** e **standardizzati**, cioè formulati in modo generico per poter essere applicati a diversi algoritmi.
- Invece, i **problemi reali**:
    - Hanno una formulazione specifica e non standard,
    - e le soluzioni trovate hanno **utilità pratica**.
###### 🔸 Problemi ESEMPLIFICATIVI
###### 🧹 Esempio: Mondo dell’Aspirapolvere
Uno dei problemi classici su griglia, usato per testare gli algoritmi di ricerca di base.
![[Pasted image 20251021125057.jpg]]
![[Pasted image 20251021125109.jpg]]


|Elemento|Descrizione|
|---|---|
|**Stati**|Ogni stato indica la posizione dell’agente e la presenza o assenza di sporco in ogni cella.  <br>In un mondo con `n` celle, ci sono `n × 2ⁿ` stati possibili.|
|**Stato iniziale**|Può essere qualunque configurazione iniziale di agente e sporco.|
|**Azioni**|`Sinistra`, `Destra`, `Aspira` (nel mondo a due celle).|
|**Modello di transizione**|`Aspira` rimuove lo sporco dalla cella; `Sinistra` e `Destra` spostano l’agente (se non ci sono muri).|
|**Stati obiettivo**|Stati in cui **tutte le celle sono pulite**.|
|**Costo di azione**|Tutte le azioni hanno **costo uniforme = 1**.|

📌 Lo **spazio degli stati** è un piccolo grafo, gestibile, utile per illustrare i concetti di esplorazione e soluzione ottimale.

---

###### 🧩 Puzzle dell’Otto

Un classico problema di ricerca usato per confrontare algoritmi come A*, BFS, DFS, ecc.
![[Pasted image 20251021132649.jpg]]

|Elemento|Descrizione|
|---|---|
|**Stati**|Tutte le possibili configurazioni della scacchiera 3×3 con i numeri da 1 a 8 e una casella vuota.|
|**Stato iniziale**|Una configurazione specifica del puzzle.|
|**Obiettivo**|Configurazione ordinata (numeri da 1 a 8, casella vuota in basso a destra).|
|**Azioni**|Spostare la casella vuota **su, giù, destra, sinistra**.|
|**Goal test**|Verificare se la configurazione corrente corrisponde allo stato obiettivo.|
|**Costo del cammino**|Costo uniforme (ogni mossa = 1).|
|**Spazio degli stati**|Molto ampio, può contenere cicli; adatto a testare efficienza degli algoritmi.|

###### 👑 Problema delle Otto Regine
![[Pasted image 20251021132907.jpg]]

Un altro problema classico per testare **formulazioni diverse** e strategie di ricerca.

|Formulazione|Descrizione|Spazio di ricerca|
|---|---|---|
|**Incrementale 1 (base)**|Si aggiungono regine una per volta su qualunque casella.|~1.8 × 10¹⁴ sequenze (molto grande).|
|**Incrementale 2 (migliorata)**|Si aggiunge una regina per colonna, assicurandosi che non minacci le precedenti.|Solo 2057 stati (molto più efficiente).|
|**A stato completo**|La scacchiera contiene 8 regine (una per colonna) e si spostano finché non sono tutte non minacciate.|Usata in algoritmi di ricerca locale (es. _Hill Climbing_).|

📌 Questo problema mostra come **la formulazione influenza l’efficienza della ricerca**:  
più il modello è compatto e vincolato, più facile sarà trovare una soluzione.


######  Problemi del mondo reale

I problemi reali sono molto più **complessi** dei modelli astratti e le loro soluzioni sono **praticamente utili**.  
Spesso la loro formulazione è **specifica e non standardizzata**.
✈️ Esempio: Problema di ricerca dell’itinerario aereo

| Elemento                   | Descrizione                                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Stati**                  | Includono posizione (aeroporto), ora corrente e altre informazioni storiche (es. tratte, tariffe, voli precedenti). |
| **Stato iniziale**         | L’aeroporto di partenza dell’utente.                                                                                |
| **Azioni**                 | Prendere un volo disponibile dopo l’ora corrente, rispettando i tempi di trasferimento.                             |
| **Modello di transizione** | Lo stato successivo aggiorna la posizione e l’orario di arrivo del volo.                                            |
| **Stato obiettivo**        | Aeroporto di destinazione desiderato.                                                                               |
| **Costo dell’azione**      | Combinazione di fattori: costo del biglietto, tempo, durata, coincidenze, dogane, qualità del posto, ecc.           |

# 🔎 Algoritmi di Ricerca

Un **algoritmo di ricerca** riceve in input un **problema di ricerca** e restituisce una **soluzione** (un cammino verso lo stato obiettivo) o un **fallimento**.
- Gli algoritmi costruiscono un **albero di ricerca** sul **grafo dello spazio degli stati**.
- Ogni **nodo** rappresenta uno **stato**, ogni **ramo** un’**azione**.
- **nodo** dell’albero contiene:
	- `n.stato` → lo stato rappresentato
	- `n.padre` → il nodo da cui è stato generato
	- `n.azione` → l’azione che ha portato a questo stato
	- `n.costo-cammino = g(n)` → costo totale dal nodo iniziale fino a `n`
- La **radice** corrisponde allo stato iniziale.
	- Espandere un nodo = generare i **nodi figli** applicando le azioni possibili (`Risultato(s, a)`).

📌 **Distinzione chiave:**

- **Spazio degli stati** → tutti i possibili stati del mondo.

- **Albero di ricerca** → cammini esplorati dall’agente durante la ricerca.

- La **frontiera** è l’insieme dei nodi generati ma non ancora espansi.
	- Separa gli **stati esplorati** (interni) da quelli **ancora da esplorare** (esterni).
	- È implementata come una **coda**(FIFO,LIFO,PRIOR) , con le operazioni:
		- `VUOTA?(coda)` → verifica se la frontiera è vuota
		- `POP(coda)` → estrae un nodo dalla frontiera
		- `INSERISCI(elemento, coda)` → aggiunge nuovi nodi (figli)
- La **strategia di scelta del nodo da espandere** determina il tipo di algoritmo (BFS, DFS, A*, ecc.).
- *tipi di misura di prestazioni: *

|Criterio|Descrizione|
|---|---|
|**Completezza**|Trova una soluzione se esiste.|
|**Ottimalità**|Restituisce la soluzione di costo minimo.|
|**Tempo**|Numero di nodi generati.|
|**Spazio**|Memoria richiesta.|

$$\text{Costo totale} = \text{Costo della ricerca} + \text{Costo del cammino soluzione}$$

L’obiettivo è **minimizzare il costo complessivo**: trovare una soluzione **valida e conveniente** con il minor sforzo possibile.

#### 🧮 Tipi di Gestione della Frontiera (strategie)

|Strategia|Struttura dati|Comportamento|
|---|---|---|
|**FIFO**|Coda|Ricerca in ampiezza (Breadth-First Search)|
|**LIFO**|Pila|Ricerca in profondità (Depth-First Search)|
|**Coda con priorità**|Ordinata da una funzione di costo o euristica|Ricerca di costo uniforme, Greedy, A*|

##### 🔹 Tipi di strategie

###### 🔸 Non informate (cieche)

- Non usano informazioni sul goal.  
    Esempi:
    - **Ricerca in ampiezza (BFS)**
    - **Ricerca di costo uniforme (UCS)**
    - **Ricerca in profondità (DFS)**
    - **Profondità limitata**
    - **Approfondimento iterativo**
###### 🔸 Informate (euristiche)
- Usano una **funzione euristica** `h(n)` che stima la distanza dal goal.  
    Esempi:
    - **Greedy Search**
    - **A*** (ricerca ottimale euristica)

📌 Ogni strategia cerca un equilibrio tra **tempo**, **spazio**, **completezza** e **ottimalità**.

#### Pseudocodice generico di ricerca albero
![[Pasted image 20251021140935.jpg]]

#### Pseudocodice più dettagliato
![[Pasted image 20251021141804.jpg]]


#### Ricerca in ampiezza
![[Pasted image 20251021142331.jpg]]
##### Pseudo
![[Pasted image 20251021142416.jpg]]
- È una **ricerca non informata** e **sistematica**, completa anche su spazi di stati infiniti (se ogni stato ha un numero finito di successori).
- Usa una **coda FIFO**: i nuovi nodi vengono aggiunti in fondo, e quelli più vecchi vengono espansi per primi.

| Aspetto            | Descrizione                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------- |
| **Frontiera**      | Implementata come coda FIFO                                                              |
| **Test obiettivo** | Può essere effettuato subito dopo la generazione di un nodo (“anticipato”)               |
| **Raggiunti**      | Insieme degli stati già visitati, per evitare di riespandere stati già esplorati         |
| **Espansione**     | Tutti i nodi di profondità $d$ vengono generati **prima** di quelli a profondità $d + 1$ |

#####  Proprietà della BFS

| Proprietà                        | Valore                                                   |
| -------------------------------- | -------------------------------------------------------- |
| **Completezza**                  | ✅ Sempre completa (trova una soluzione se esiste)        |
| **Ottimalità**                   | ✅ Ottimale se **tutti i costi delle azioni sono uguali** |
| **Tempo**                        | $O(b^d)$                                                 |
| **Spazio**                       | $O(b^d)$                                                 |
| **Fattore di ramificazione (b)** | Numero massimo di successori di un nodo                  |
| **Profondità (d)**               | Profondità della soluzione più superficiale              |
| **Cammino massimo (m)**          | Lunghezza massima di un cammino nello spazio di ricerca  |
##### Complessità
Se tutti gli operatori hanno costo costante $k$:
$g(n) = k \times \text{profondità}$
- **Complessità temporale:**
    $$T(b, d) = b + b^2 + \dots + b^d = O(b^d)$$
- **Complessità spaziale:**  
    Anch’essa $$O(b^d)$$ poiché tutti i nodi devono essere mantenuti in memoria.
📌 Entrambe le complessità sono **esponenziali**, quindi la BFS è praticabile solo per problemi di piccola scala.
#### Ricerca a Costo Uniforme (Uniform-Cost Search, UC)
- È una **generalizzazione della ricerca in ampiezza**, usata quando **le azioni hanno costi diversi**
- L’idea è di **espandere sempre il nodo con costo di cammino minimo** $g(n)$
- Usa una **coda con priorità** come frontiera (invece della coda FIFO della BFS).
- Espande i nodi **in ordine di costo crescente**
- Si comporta come l’**algoritmo di Dijkstra**: la ricerca si “espande a onde” di costo uniforme
![[Pasted image 20251021143052.jpg]]
## Proprietà

| Proprietà       | Descrizione                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| **Completezza** | ✅ Completa se $\varepsilon > 0$ (cioè se ogni azione ha un costo positivo). |
| **Ottimalità**  | ✅ Ottimale rispetto al costo del cammino.                                   |
| **Tempo**       | $O(b^{1 + \lfloor C^*/\varepsilon \rfloor})O$                               |
| **Spazio**      | $O(b^{1 + \lfloor C^*/\varepsilon \rfloor})O$                               |

dove:

- $C^*$ = costo della soluzione ottima
- $\varepsilon$ = costo minimo possibile per un’azione

📌 L’esponente $1 + \lfloor C^*/\varepsilon \rfloor$rappresenta la **profondità massima** che deve essere esplorata per garantire l’ottimalità, includendo anche il livello iniziale.
##### 💡 Confronto con la Ricerca in Ampiezza

|Caso|Comportamento|
|---|---|
|**Tutti i costi uguali**|UC ≡ BFS (stesse prestazioni e soluzione minima in numero di azioni).|
|**Costi diversi**|UC esplora prima i cammini a costo minore, garantendo la soluzione più economica.|

#### Ricerca in profondità DFS
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

#### Ricerca Bidirezionale

La **ricerca bidirezionale** esplora simultaneamente:
- **In avanti** dallo **stato iniziale**, e
- **All’indietro** dallo **stato obiettivo**,
fino a far **incontrare le due ricerche** in un punto intermedio dello spazio degli stati.
- Invece di esplorare $O(b^d)$ nodi, ne esplora circa:
    $O(b^{d/2} + b^{d/2}) \approx O(b^{d/2})$
- Questo riduce drasticamente il numero di nodi da analizzare, **a parità di profondità** $d$.
📌 Funziona bene solo se:
- È possibile **ragionare all’indietro** (cioè generare predecessori),
- E lo **stato obiettivo** è **ben definito**.
- Mantiene **due frontiere** (una per ogni direzione) e due insiemi di **stati raggiunti**.
- Espande **il nodo con costo minore** tra i due lati (strategia best-first).
- Se la funzione di valutazione è il **costo di cammino**, otteniamo una **ricerca bidirezionale a costo uniforme**, ottimale come UC.
- Nessun nodo con costo >$C^*/2$ (dove $C^∗$ è il costo ottimo) viene espanso.
![[Pasted image 20251021154403.png]]

#### TUTTE LE STRATEGIE A CONFRONTO
![[Pasted image 20251021154529.png]]

#### PROBLEMA DEI CICLI
##### Tre soluzioni pratiche
![[Pasted image 20251021154940.png]]

##### Esempio di soluzione con i grafi
![[Pasted image 20251021155035.png]]

### Fix della ricerca-grafo in ampiezza
![[Pasted image 20251021155104.png]]
### Fix della ricerca-grafo con costo uniforme UC
![[Pasted image 20251021155139.png]]

