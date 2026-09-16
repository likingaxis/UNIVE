#### Con cosa mi presento
- pantaloni
- slide che spiegano cosa ho fatto
- esempio di esecuzione
- portatile collegato al mio pc in remoto per fargli vedere il lavoro svolto

#### Piccolo ripasso sul progetto su cui sto lavorando
vulcAIN è un workflow agentico di generazione delle macchine vulnerabili: prendi le spiegazioni dal pdf che gli avevi mandato
la mia parte: vulcatest e vulcahealing
#### Spiegazione del lavoro
ho strutturato vulcatest in 3 parti differenti:
- white-box
	- testing con piena consapevolezza di ciò che bisogna fare
- black-box
	- testing per verificare unintended ways, al momento non è ancora fatto ma per l'utilizzo andrò a fare ciò: dopo l'healing se ha successo vado alla ricerca di black-box
	- per quanto riguarda questo posso sfruttare il 90% del codice python usato in white-box ma cambiando l'obiettivo dell'agente e dandogli meno restrizioni
- healing
	- nodo che chiama antigravity CLI e effettua healing, inoltre è presente uno script python che tiene traccia delle differenze usando una libreria python per i diff

##### White-box
mostrare a schermo come è stata ideata l'architettura vulcatest con white-box mediante uno schema langgraph

funzionamento:
- se abilitato `--generate-plan` oppure se non presente ATTACK_PLAN.md nella cartella di riferimento si abilita il nodo ***planner*** del grafo
	- realizza `ATTACK_PLAN.md` a partire da file di riferimento generati da vulcamind come `DESCRIPTION.md` `STORYLINE.md` `WRITEUP.md`
	- dopo aver generato il piano di attacco invoca `plan_parser.py`
		- effettua il parsing del file markdown e istanzia degli oggetti TestStep
		- restituisce la lista di questi oggetti che rappresentano i singoli step da seguire
- viene chiamato il grafo che ha START da `orchestrator node` presente in `nodes.py`
	- questo ha il compito di restituire i singoli step del piano
	- poi abbiamo `executor node` invoca l'executor e aggiorna lo stato condiviso tra i nodi
	- `executor.py` riceve in input il singolo `TestStep` il `target_ip` i 
		- `verified_values` dizionario che ha al suo interno le evidenze utili per gli step successivi come password nomi utente ecc
		-  `output_dir` cartella dove salvare i log dell'output del singolo step dell'executor
		- per eseguire i comandi utilizza `mcp_bridge`
			- un bridge che consente la comunicazione e la definizione dei tool mediante server Hexstrike e un server terminal gateway che sfrutta il modulo python pexpect per eseguire comandi via terminale direttamente sulla macchina su cui si esegue in questo caso la macchina kali e gestire più sessioni ognuna con un suo `id`
			- il seguente bridge consente l'invio di più comandi da eseguire contemporaneamente e di gestire casi in cui l'agente deve inserire la password o cose simili
			- il bridge ha anche il compito di evitare problemi di context window per il modello consentendo di troncare l'output dei tool per evitare saturazioni del caso
			- inoltre possiamo da qui mettere metriche interessanti da aggiungere in ToolCallRecord una classe che se instanziata permette di rappresentare una singola chiamata con dati interessanti
		-  `executor.py` esegue gli step mediante i tool che invoca dal bridge, ha un budget definito di turni e all'ultimo turno è obbligato a scegliere se dare la fase per FAILED oppure se richiedere altri turni se non viene superato il budget massimo 
		- mediante il tool `submit_step_result` produce StepResult  un oggetto pydantic che ha uno stato di successo o fallimento contenente produced_values che verranno poi messi come verified_values dopo essere passati per nodes.py che verifica se lo step è avvenuto con SUCCESS
		- inoltre produce un file evidence_log con tutti i vari turni e la durata effettiva
		- elenco di alcuni tool possibili da parte di executor descritti e definiti su mcp bridge
			- ci tengo a precisare che i seguenti tool avvengono con una ricerca su matching basati su 3 principi 1. ricerca parole di lunghezza >=3 2. ricerca per iniziale es: nmap trova nmap_scan 3. spezza le parole del tool in underscore, e ne fa una ricerca per ognuno
			- se tutto ciò fallisce consente di fare execute_command oppure interactive_terminal_exec (per operazioni sincrone e con sessione)
		- come funziona la interactive shell, spiega l'architettura HTTP realizzata
			- scrivi qui l'elenco
		- l'orchestratore controlla se i passi sono stati eseguiti con successo se la risposta è FAILED oppure c'è un PASSED a un determinato elemento della checklist allora si passa al final evaluator
	- `final evaluator node` nodo che ha una parte in cui raccoglie tutte le evidenze create dalle variabili e da state.py scambiato tra i nodi del grafo e genera un file json di tutti i teststep ecc...
		- successivamente il tutto viene passato a un modello che genera un REPORT dettagliato di quanto accaduto
- nodo di healing
	- nodo di healing che fa una chiamata al software ANTIGRAVITY CLI
	- basandosi sul report e i file ansible della macchina va a correggere quelli che sono gli step definiti come failed dall'executor
	- genera un healing report e chiama un file diff_tracker.py che tiene traccia delle modifiche dei file effettuati generando un file chiamato patch.diff
	- inoltre viene fatto uno snapshot della cartella della macchina prima delle modifiche per facilitare un riutilizzo
	- il nodo di healing in automatico fa anche il remove e build della nuova macchina per rieseguire l'esecuzione per un controllo futuro
	- viene gestita una possibile differenza di indirizzo ip andando a modificare il target ip così da non consentire ulteriori problematiche
	- ad ogni chiamata di antigravity CLI il system prompt viene arricchito dai report healing differenti delegati ad una lettura da parte dell'agente
- inoltre ci tengo a precisare che è possibile gestire 3 modelli differenti con 3 settings differenti per l'architettura grazie a `model_manager.py`


#### Come si esegue
