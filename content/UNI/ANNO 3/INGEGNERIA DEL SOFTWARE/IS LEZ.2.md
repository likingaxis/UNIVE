## processo software

- serie di attivita necessarie alla realizzazione del prodotto software nei tempi e con risorse desiderate

- nel processo:

	- si applicano metodi

	- si creano prodotti

	- si stabilisce il controllo gestionale del progetto

	- si garantisce la qualità

	- si governano le modifiche

### stadi del processo

il processo software innanzitutto possiamo dire che ha un ciclo di vita in 3 stadi (sviluppo, manutenzione, dismissione)

ci sono due tipi differenti di fasi nella fase di sviluppo

fasi di definizione, si occupano di cosa il software deve fornire , praticamente si producono le specifiche

fasi di produzione, fefiniscono il come realizzare quanto ottenuto dalle fasi di definizione, si progetta il software, si codifica, si integra e si rilascia al cliente

nello stadio di manutenzione si effettua un supporto del software ecc...

invece lo stadio di dismissione non ho scritto cosa fa

- tipi di manutenzione

- correttiva

- adattativa

- perfettiva(la piú usata)
	- si chiama anche evolutiva
	- estende il software per aggiungere nuove funzionalità

- preventiva
	- si dice anche software reengineering
	- aggiornamento e miglioramento di tutta la documentazione dei requisiti
#### Definizione di ciclo di vita per iEEE Std 610-12
- intervallo di tempo che intercorre tra l'istante in cu i nasce l'esigenza...
- include le fasi di definizione dei requisiti in un ordine temporale ben preciso
- il testing potrebbe avvenire in ogni istanza, quindi si aggiunge una nota che dice che OGNI FASE puo sovrapporsi e puo essere eseguita in modo iterativo, praticamente puoi fare ogni fase quando ti pare
#### MODELLI DI CICLO DI VITA
- ciclo di vita: definizione temporale
- modello invece rappresenta la serie di fasi che passo passo dobbiamo fare
- non esiste il modello migliore, la scelta deve essere consapevole, si basa su diversi fattori:
	- tipologia di software che vogliamo realizzare
	- maturità dell'organizzazione
		- se ho una organizzazione avanzata posso usare determinati modelli avanzati
	- metodi e tecnologie usate
	- vincoli dettati dal cliente
- se non si ha un modello di ciclo di vita si applica il
	- BUILD & FIX
		- il software viene sviluppato e successivamente rilavorato finché non soddisfa il cliente/ finiscono i soldi
		- dopo averlo soddisfatto possono esserci attività di manutenzione
	- di solito il cliente non veniva mai soddisfatto
		- per questo é stato introdotto un approccio rigoroso in modelli studiati appunto ad Ingegneria del Software
	- foto grafico build and fix

#### Modello Waterfall
- rappresenta una evoluzione strutturata e diretta che vuole sistemare il Build and Fix model
- Modello a cascata, segue un approccio piú rigoroso
- nel modello waterfall ad ogni fase verifico la sua correttezza
- foto modello waterfall
- descrizione delle varie fasi con 1 riga
- nel modello waterfall quando una fase viene verificata viene congelata
	- perché non deve subire modifiche, per rimanere rigoroso
	- se cambia una certa fase comporta costi molto elevati perche poi va sistemato tutto di conseguenza
- il modello waterfall non é friendly per il cliente, visto che lui dovrà vedere solo il progetto una volta finito
	- il fatto che i clienti e gli sviluppatori non possono comunicare può causare delle asincronie tra progetto e cio che vuole il cliente
- nota: al posto di verify dovrebbe esserci scritto static verification, si usa per i documenti
- nota: al posto di test Dynamic verification, si usa per i codici
#### Differenza tra verifica, convalida e certificazione
- verifica
	- vado a verificarne il funzionamento intrinseco?
- convalida
	- va a confrontare il prodotto con i goal del progetto
	- viene fatta alla fine 
- certificazione
	- V V & A
	- bho
	- non certifico il prodotto, ma chi lo ha progettato
	- se l'organizzazione é matura viene assunto che i loro progetti lo siano
	- il prodotto in se é difficile da certificare
### Rapid Prototyping Model
- Successore del modello waterfall
	- unica cosa che manca é la fase di definizione dei requisiti
	- Come riduco il rischio dei requisiti?
		- ovvero come riduco il rischio che i requisiti vengano definiti in modo scorretto
	- per farlo applico il prototipo rapido
		- si divide in due parti
			- elicitation ?
			- validation ?
		- creare un prototipo riduce potenzialmente di molto il rischio dei requisiti
			- inoltre riduce
				- le incomprensioni
				- il fatto che possano mancare dei servizi
				- i tempi che il cliente veda qualcosa, infatti il cliente ha subito un prototipo da vedere e usare, tipo una GUI
###### Processo di prototyping
- foto
- il prototipo non si deve buttare per forza ma spesso é cosí
- puo essere esteso e migliorato per produrre il prodotto finale
	- questa cosa però non é consigliata perché spesso possiede una struttura troppo vuota e solo rappresentativa
##### Processo del prototyping throw away
- foto
- quello che cambia bho
- ovviamente alcune cose del prototipo possono comunque essere usate, tipo se ha una GUI figa, si può riutilizzare
### Programmazione Visuale
- tipo drag and drop senza codici
- posso creare prototipi velocemente
- strumenti CASE (Computer Aided Software Engineering)
##### Problemi della programmazione visuale
- difficolta nel coordinare il team
- non ci sono esplicite architetture software, perché il codice non é scritto alla base bensi é una cosa fatta dal generatore di codice
- problemi di manutenzione dovuto al problema superiore
#### Modello waterfall con Process Iteration
- nasce dal fatto che i requisiti si evolvono sempre anche nel corso del processo di realizzazione del progetto
- si divide in 2 approcci
	- incremental development
	- spiral development

### Incremental development
normalmente il prodotto software é sviluppato in fasi (quei quadratini)
- con questo approccio invece si vuole avere un approccio incrementale
- si sviluppa ogni fase in modo incrementale, e poi vengono unite
	- ad ogni iterazione aggiungiamo un po di lavoro a ogni fase
	- ogni volta si raggiunge una fase finale del prodotto ma non finita, che però sia funzionante
	- ogni fase del prodotto ogni volta viene diciamo reso visibile in modo che siano funzionanti separatamente
- questi incrementi si chiamano build
FOTO MODELLO INCREMENTALE
## VERSIONE CON O SENZA OVERALL ARCHITECTURE
- breve spiegazione di cosa é
- foto con overall architecture
	- le prime 3 fasi non vengono partizionate
	- la fase di design non é solo come abbiamo visto nel modello rapido bensi si divide in 2 fasi distinte
	- architectural design -> si vuole creare la architettura software
	- non ho capito le altre
- senza overall architecture
	- non ho questa divisione in 3 fasi
	- maggiormente sostenibile per una gestione in parallelo
	- più rischiosa, poiche non ho una architecture che ci consente di avere una coordinazione dei team
- approccio incrementale più vantaggioso di quello waterfall!
### Impatto sui costi del software in base al numero delle build
- foto grafico
- dobbiamo sommare i costi di integrazione e costo dei build
	- costo di integrazione è...
	- costo dei build è...
- ottenendo il costo totale che presenta una regione di costo minimo
### Confronto waterfall vs incrementale
trasforma in tabella la foto della slide 29
### Modello a spirale
- si parte dal centro e si va verso l'esterno
- dimensione radiale=costi
- la dimensione angolare= tempo
- ogni ciclo della spirale viene vista come una reiterazione
- divisione in settori 
- risk analysis porta anche a una chiusura di esso se non sostenibile
- ogni ciclo= una nuova build possiamo dire
- si applica al software interno perché cliente e organizzatore sono sotto la stessa ala
- foto modello a spirale semplificato(linearizzato)
- la rappresentazione originale ha un modello full spiral
	- foto
	- i prototipi non sono quelli rapidi ma sono usati per fare analisi dei rischi
### Processo di Risk management
- riguarda TUTTI I TIPI DI MODELLO E DI PROGETTO
- per rischio si intende la probabilità che una qualche circostanza avversa possa intaccare il progetto
##### Categoria di rischio
tabella

Il processo di risk management si divide in 4 fasi differenti
- risk identification
- risk analysis
- risk planning
	- avoidance strategies
		- probabilita che una occorrenza cresca
	- minimisation strategies
		- si punta a minimizzare una cosa già alta
	- se non posso attuare nessuna delle due -> contingency plans
	- 
- risk monitoring
	- avviene a intervalli regolari
	- SAL(Riunioni dove ci si aggiorna sullo stato dei lavori)
		- Stato di avanzamento dei lavori
### Lista con altri modelli
#### Modello object-oriented(a fontana)
- ogni fase é un cerchio
	- possiamo notare che tra le fasi è presente un overlap
	- paradigma object-oriented
	- solo una fase ha un diametro differente
		- quello di Maintenance
			- ha un effort inferiore poiché si vuole evidenziare il fatto che se seguo questo paradigma, dovrò fare meno maintenance
#### Modello di Ingegneria concorrente
- ha come obiettivo quello di ridurre tempi e costi di sviluppo
- si applica a team largamente distribuiti, favoriva un approccio concorrente
- fasi di sviluppo coesistevano, anziché essere eseguite in sequenza

#### Modello basato su metodi formali
- si usa soprattutto con un software critico
- si chiamano formali
	- la specifica non usa linguaggi informali bensì linguaggi formali basati su linguaggi matematici
- Es:
	- cleanroom software engineering
		- software che cerca di ridurre a zero eventuali difetti
		- 5 step
			- modelli a stati finiti
			- sviluppo incrementale del prodotto secondo la priorità accordata assieme al cliente
			- codifica
			- verificato staticamente
			- testing statistico
				- x stimare affidabilità del prodotto
### Modello Microsoft
- approccio iterativo, incrementale e concorrente
- approccio dal nome synchronize-and-stabilize
	- sincronizzazione quotidiana produzione di una daily build
	- stabilizzazione periodica del prodotto in incrementi(milestone)
		- successivi durante l'avanzamento del progetto
#### 3 fasi di sviluppo
- Planning phase
	- 
- Development phase
	- 
- Stabilization phase
### Strategie e principi


##### Esempio di metriche di collezione
- resolved = identificato
- fixed = risolto

#### 3 sottoprogetti milestone
- buffer time
	- tempo a disposizione per sviluppare il prodotto in più a quello già definito
- UI FREEZE
	-  una volta testata una interfaccia essa non si modifica più

#### Tabella waterfall vs synch-and-stabilize
