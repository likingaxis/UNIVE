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
#### Esempio di simulatore
![[Pasted image 20251016140906.jpg]]

--- 

## STRUTTURA DI UN AGENTE
$$ AGENTE=ARCHITETTURA + PROGRAMMA$$
### Funzione agente
- citata in precedenza rappresenta l'implementazione pratica di quello che chiama un programma Agente
- `Agent()`
$$Agent:Percezioni \rightarrow Azioni$$ 
##### Pseudo programma agente
![[Pasted image 20251016141848.jpg]]

# Diverse architetture di agenti

## 🤖 Agente basato su tabella
La scelta di una azione (per volta) corrisponde ad un accesso a una **tabella che associa un'azione ad ogni possibile sequenza di percezioni**.  
> Tutti gli algoritmi che abbiamo visto si basano su questo.  

In ambito IA è **molto difficile da costruire**, e soprattutto NON é autonomo.

## Un esempio: Schema di agenti reattivi semplici

![[Pasted image 20251016143808.jpg]]

Partendo dall'ambiente, l'agente
- riceve delle percezioni tramite i sensori
	- capisce lo stato dell'ambiente
- guarda nella sua tabella (percezioni -> azioni)
	- esegue l'azione  


## Programma agenti reattivi
![[Pasted image 20251016144146.jpg]]

>[!tip]- Esempio col Wumpus
>![[Pasted image 20251016144405.jpg]]
>IL WUMPUS GENERA Il puzzo mentre il buco genera il venticello
>![[Pasted image 20251016144415.jpg]]


# 🧠 Agenti basati sul modello
Gli **agenti basati su modello** hanno una **memoria interna** che gli permette di rappresentare il mondo in cui si trovano.  
A differenza di quelli reattivi semplici (che agiscono solo in base alla percezione immediata), questi **mantengono e aggiornano uno stato interno** che descrive _cosa credono che stia succedendo_ 

## Struttura logica
![[Pasted image 20251016144855.jpg]]

L’agente riceve le **percezioni dai sensori** e aggiorna il proprio **stato interno** in base a:
- la percezione attuale,
- la conoscenza di come **il mondo evolve** nel tempo,
- e di **come le proprie azioni** modificano l’ambiente.
Con queste informazioni l’agente costruisce un modello di “**come il mondo è adesso**” (_what the world is like now_).  

Su questo modello applica poi le **regole condizione–azione** per decidere **che cosa fare ora** (_what action I should do now_).

Le azioni vengono infine inviate agli **attuatori**, che le eseguono nell’ambiente.

## Codice

![[Pasted image 20251016145402.jpg]]


- l’agente **ricorda cosa è successo prima**,
- **aggiorna il suo stato interno** dopo ogni azione,
- **cerca la regola** corrispondente a quello stato
- e **decide l’azione successiva** in base alla nuova conoscenza del mondo.


---

# 🎯 Agenti con obiettivo
Gli **agenti basati su obiettivo** sono un’evoluzione degli agenti basati su modello.  
Come loro, **mantengono uno stato interno** del mondo (memoria e conoscenza di come si evolve), 
ma in più **hanno un obiettivo da raggiungere (goal)** che guida la scelta delle azioni.

>[!tip] **NOTA BENE:**  Gli **obiettivi del task** (cioè quelli definiti dal progettista) e quelli **dell’agente** (cioè come l’agente li rappresenta internamente) possono non coincidere perfettamente, ma l’importante è che **l’agente li conosca e li interpreti correttamente**.
>
In generale, i _goals_ sono una **rappresentazione o approssimazione** dell’obiettivo reale da raggiungere.


## Struttura logica
![[Pasted image 20251016145830.jpg]]

- **Percepiscono** l’ambiente tramite i sensori,  
    aggiornano lo **stato interno** (cioè cosa credono che stia succedendo).
- Usano il modello del mondo per **prevedere cosa succederebbe** se eseguissero una certa azione  
    → _“What it will be like if I do action A”_.
    
- Confrontano il risultato previsto con il **goal**  
    → scelgono l’azione che **avvicina di più** all’obiettivo.
    
- L’azione scelta viene inviata agli **attuatori** e quindi eseguita.

## Caratteristiche principali
- **Guidati da un obiettivo:** l’agente non si limita a reagire, ma agisce per _raggiungere_ qualcosa.  
    → Esempio: “arrivare a destinazione”, “raggiungere la temperatura ideale”.
    
- **Pianificano** una sequenza di azioni per arrivare allo stato desiderato.  
    → Non si fermano alla singola mossa, ma valutano più passi avanti.
    
- **Più flessibili** degli agenti reattivi, ma anche **meno efficienti**:  
    richiedono più calcolo, tempo e memoria.


---

# ⚖️ Agenti con valutazioni di utilità
Gli **agenti con valutazione di utilità** sono un’estensione degli agenti basati su obiettivo.  
Anziché limitarsi a _raggiungere un goal_, valutano **quanto è “buono” o vantaggioso** ciascun possibile stato del mondo.

## Obiettivi alternativi
L’agente può avere **più obiettivi possibili** e deve scegliere verso quale muoversi.  
→ serve una **funzione di utilità** per valutare quale stato finale offre il miglior compromesso.
#### Funzione di utilità
È una **funzione che assegna a ogni stato un valore numerico** → rappresenta **quanto l’agente è soddisfatto** in quello stato (“quanto sarò felice se arrivo lì”).
$$U(s) = \text{grado di utilità dello stato }$$
- **Più alto è il valore**, più quello stato è desiderabile.
- Permette di **confrontare obiettivi diversi** e scegliere quello migliore.

>[!tip]- Esempio  
Un’auto autonoma deve decidere se andare per la strada più **breve ma trafficata**, o per quella **più lunga ma più sicura** → la funzione di utilità combina tempo, rischio, comfort e sceglie la soluzione _più vantaggiosa complessiva_.


## Obiettivi con probabilità diverse
La funzione di utilità considera anche la **probabilità di successo**:
> un obiettivo molto buono ma difficilissimo può avere meno valore atteso di uno più facile da raggiungere.


>[!lemma] Più il modello è ricco, **più l’utilità migliora**.  


>[!tip] Bisogna distinguere tra:
>  - **autovalutazione dell’agente**
>  - **valutazione dell’ambiente**  
  (non combaciano mai perfettamente)



---

# 📈 Agenti che apprendono
Questi agenti sono in grado di **migliorare il proprio comportamento nel tempo**, grazie a un meccanismo di apprendimento interno.

## Struttura logica
![[Pasted image 20251016150117.jpg]]


###### **Performance Element**
- È **l’elemento esecutivo**, cioè il **programma agente**.
- Interagisce direttamente con l’ambiente: riceve le percezioni dai sensori e compie azioni tramite gli attuatori.
- Rappresenta **“ciò che l’agente sa fare”** in un dato momento.

###### **Performance Standard**
- Fornisce **informazioni esterne di riferimento**, cioè una misura delle prestazioni dell’agente.
- Serve a capire **quanto bene** l’agente sta eseguendo il compito.
    - Es: il sensore rileva che si sta avvicinando un muro.
    - Se la previsione è errata (ho colpito il muro) → interviene il performance standard.
###### **Critic**
- Analizza i risultati e **interpreta il comportamento dell’agente**.
- Fornisce **feedback** al modulo di apprendimento (positivo o negativo).
    - Es: l’agente sbatte contro un muro → feedback negativo.
- Serve per valutare quanto le azioni passate siano state efficaci.

###### **Learning Element**
- Riceve i feedback dal critic e **capisce cosa cambiare** nel comportamento dell’agente.
- Produce **modifiche** al programma agente (performance element).
- È la parte che **apprende dai propri errori o successi**.

###### **Problem Generator**
- Suggerisce **nuove situazioni da esplorare**.
- Crea **problemi o scenari ipotetici** per migliorare l’apprendimento.
- Genera nuovi dati o esperienze utili per aggiornare il modello interno.


## 🔄 Meccanismo di apprendimento
1. Il **performance element** agisce nell’ambiente reale.    
2. I risultati vengono analizzati dal **critic** e confrontati con il **performance standard**.
3. Gli errori o i successi vengono passati al **learning element**, che li usa per migliorare il comportamento.
    - LAVORA IN UN AMBIENTE SIMULATO
4. Il **problem generator** fornisce nuovi stimoli per continuare l’apprendimento.
5. Il **learning element** aggiorna il **performance element**, che poi verrà riutilizzato nel mondo reale.


---

# 💻 Implicazioni computazionali

## Tipi di rappresentazione
Quando un agente deve ragionare o apprendere, ha bisogno di **una rappresentazione interna dello stato del mondo**.  
Questa rappresentazione può essere più o meno complessa a seconda del tipo di informazione che deve gestire.

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

>[!tip]- Digressione su Semantic Embedding (Wordspace)
>
>![[Pasted image 20251016150450.jpg]]
>![[Pasted image 20251016150513.jpg]]
>
>Queste slide mostrano un esempio pratico di **rappresentazione strutturata basata sul linguaggio**.
>
>- “Wordspace” è un **modello semantico** che rappresenta le **parole come vettori in uno spazio multidimensionale**, in base al contesto in cui compaiono.
>    
>- Parole con significati simili → **vettori vicini** nello spazio.
>    
>- Serve per **capire le relazioni semantiche** tra concetti in modo automatico (embedding linguistico).
>
>Esempio:
>
>- La parola “Parma” è collegata a “culatello”, “Langhirano”, “salame”…
>    
>- Questo perché compaiono spesso negli stessi contesti → l’algoritmo li percepisce come _semanticamente correlati_.
>
> In pratica, è un modo per tradurre la **rappresentazione strutturata** (relazioni concettuali) in **una forma numerica continua** usata nelle reti neurali.



---

## 🎯 Desiderata di un agente
I sistemi di **Intelligenza Artificiale** (e gli agenti in particolare) sono **complessi da progettare e implementare**, perché devono operare in ambienti reali e dinamici.  
Per questo la progettazione e il rilascio sono **costosi** e richiedono molta cura.

#### ⚙️ Sfide principali
- **Accuratezza:** prestazioni vicine a quelle umane o di esperti.
- **Generalità:** capacità di adattarsi a **domini e compiti diversi** (portabilità).
- **Sostenibilità:** deve poter **evolvere nel tempo** con costi contenuti di manutenzione.
- **Modularità:** i componenti devono essere **riutilizzabili** e facilmente aggiornabili.
- **Trasparenza:** deve essere chiaro **come e perché** l’agente prende certe decisioni.
- **Scalabilità:** deve funzionare bene anche **con molti dati o utenti**.
