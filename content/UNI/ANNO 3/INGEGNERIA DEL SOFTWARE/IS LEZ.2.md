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
