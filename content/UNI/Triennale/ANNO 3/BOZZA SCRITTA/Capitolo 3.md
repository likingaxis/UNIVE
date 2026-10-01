##### 3.1 Perchè non usare un harness già presente
Analizzando lo stato dell'arte attuale abbiamo diverse offerte di harness agentici che consentono a un LLM di interagire con la nostra macchina eseguendo comandi es:
- deepseek harness
- antigravity
- codex
- claude code
- Pi
- Cursor

tutti questi non consentono un forte controllo operativo sul workflow da dover svolgere e si vogliono evidenziare problematiche che si possono dividere in 2 livelli differenti
- livello 1) problematiche relative al LLM utilizzato
	- molti harness obbligano l'utilizzo di modelli forniti dall'azienda stessa come claude code o antigravity
	- quest'ultimi presentano guardrail stringenti che non permettono operazioni delicate come quelle che dovrebbe fare un agente che effettua pentesting
	- inoltre aggiungerei che utilizzare un modello di frontiera per eseguire operazioni così numerose comporta costi decisamente elevati
- livello 2) il livello 1 è facilmente aggirabile utilizzando modelli con meno guardrail ed economici, utilizzando harness opensource o che permettono l'uso di api per qualsiasi modello LLM come quelli locali ma restano una serie di problematiche legate al poco controllo che abbiamo di quest'ultimi
	- un harness non avrebbe permesso un buon controllo delle azioni svolte dal nostro LLM e il nostro unico controllo su ques'ultimo sarebbe stato esclusivamente sul system prompt e i tool MCP che può utilizzare in aggiunta a quelli già presenti nel sistema adottato
	- il modello seguendo solo ed esclusivamente il system prompt si sarebbe preso troppe libertà e non avrebbe avuto qualcosa che lo forzasse a restituire delle evidenze concrete, lo sbaglio principale che fa qualcuno quando lavora con questi agenti è chiedere di restituire delle evidenze quando quest'ultime possono essere perfettamente inventate da un modello generativo

nel mio lavoro di tesi ho inizialmente adottato una possibile soluzione con l'uso di questi harness come antigravity, le principali problematiche evidenziate sono quelle sopracitate anche con dei system prompt precisi e un server MCP come Hexstrike
oltre a incorrere in problemi di guardrail notavo una tendenza al goal reaching da parte del modello e una scarsa considerazione di problematiche importanti della macchina che andavano risolte

tra le macchine realizzate mediante la pipeline vulcamind vulcaforge ho realizzato una macchina di una pizzeria che esponeva un sito web, nella descrizione di questa challenge avevo riportato la presenza di una chat, quest'ultima è stata omessa in fase di generazione e l'harness non ha rilevato la cosa perchè portato ad analizzare troppo contesto

> This request was blocked by Gemini's filters. They can occasionally trigger by mistake on safe coding, security, or biology-related queries. Please try rephrasing your prompt. You can [send feedback](https://ai.google.dev/gemini-api/docs/troubleshooting#file-bug) or read more about [our policies here](https://policies.google.com/terms/generative-ai/use-policy).


le principali problematiche sono relative a una scarsa possibilità anche di salvare delle metriche utili per valutare il lavoro svolto, controllare le azioni svolte, poco rigore di esecuzione


##### 3.2 principi cardine di design
Progettare Vulcatest ha portato alla definizione di 5 principi di design
1. non utilizzare LLM per ogni operazione
	- è importante aggiungere parti di codice fondamentali per restituire una maggior robustezza architetturale e di esecuzione, non tutte le operazioni dovranno essere esclusivamente delegate ad un LLM
2. no self-certification
	- è importante che ci sia una infrastruttura dietro a questo sistema che forzi il modello a non dichiarare il falso, come ad esempio un comando eseguito per finta
3. separation of concerns
	- è fondamentale in una architettura agentica separare i compiti
4. intercambiabilità e modularità
	- definire un'architettura che da la possibilità di cambiare le componenti facilmente, anche semplicemente dare la possibilità di decidere quali modelli LLM utilizzare e regolare alcuni parametri
5. Plan+Execute a livello macro e ReAct a livello micro
	- strutturare una architettura che riprenda i principi descritti da (cita un paper forse)
	- dove a livello macro abbiamo un planner che scrive l'intero piano che dovrà poi essere eseguito da un esecutore
	- a livello micro abbiamo il principio di ReAct con un modello che esegue e per farlo segue la catena reasoning -> Act -> observe con una suddivisione di operazione a turni

aggiungere la citazione ai paper prendendo come esempio:
"Progettare VulcaTest ha portato alla definizione di 5 principi di design. [principio] … — _una scelta che riprende/trova fondamento in [Autore]_."
##### 3.3 L'effettiva visione d'insieme di VulcaTest 
Si vuole rappresentare l'architettura di vulcatest e vulcahealing
Prendendo come riferimento il paper CoALA è possibile classificare la mia architettura di tipologia a singolo agente cognitivo composto da moduli specializzati
memoria con working memory e procedural memory esplicita 
priva di memoria episodica e semantica per ridurre i costi e preservare una ridotta context window
azioni di tipo interno con reasoning+retrieval del tool da utilizzare
un decision making di tipo ReAct-like e senza un apprendimento persistente, questo è utile per mantenere una certa rigidità in fase di benchmarking

dovrei aggiungere delle motivazioni su questo?
![[Pasted image 20261001134308.png|504]]

possiamo notare dalla seguente architettura la presenza di 2 punti di inizio, questi sono dovuti all'esistenza o meno di un file di attack plan o se è stata forzata la generazione del plan per quella specifica macchina mediante ia flag `--generate-plan`

nel raccontare i nodi procederò anche a definire alcuni approcci di prompt engineering utilizzati per i nodi che utilizzano LLM

una precisazione da fare prima di andare a spiegare i nodi è che quest'ultimi non comunicano tra di loro direttamente bensì hanno una memoria condivisa presente in state.py che viene gestita direttamente dal nostro grafo citando il paper MetaGPT in teoria


##### 3.4 PLANNER
Il modulo del pianificatore è suddiviso in 2 parti che riprendono il principio numero 1
Una parte con uso di LLM che genera un `ATTACK_PLAN.md` a partire da:
- system prompt ben definito che obbliga l'LLM a generare un piano rigoroso e con un certo formato
- `DESCRIPTION.md`
	- descrizione scritta da un umano per definire il design della challenge
- `STORYLINE.md`
	- storyline generata da VulcaMind
- `WRITEUP.md`
	- writeup di esecuzione molto superficiale e non definisce degli step in modo rigoroso
Una seconda parte con  `plan_parser.py`
- uno script deterministico in python che trasforma `ATTACK_PLAN.md` in oggetti tipizzati definiti da una classe `pydantic`  `TestStep` in `models.py` con i seguenti attributi:
	- `id`
	- `objective`
	- `action`
	- `produces[]`
	- `checklist`
	- `allowed_tools`

ci tengo a precisare che `ATTACK_PLAN.md` dentro ha degli snippet in YAML, in questo caso è stato preferito al JSON poiché più permissivo

il planner per la parte LLM ha un system prompt ben definito su una base rule based (se non erro fa parte di un certo paper parlare di constitutional prompt?)
prendendo come riferimento un attack plan generato possiamo denotare delle precisazioni dovute ad un buon system prompt solido
il modello si ritroverà dopo aver letto questo system prompt con:
- un buon contesto per capire a chi sarà inviato questo plan ovvero l'executor e le sue limitazioni
- ogni fase deve essere auto contenuta, questo perché il nostro executor per non allucinare è stato definito con una memoria parzialmente persistente solo sui valori più utili
- ogni voce della checklist deve essere verificabile con quei determinati ruoli di accesso
- forzare ad utilizzare i connettivi corretti, utilizzare or solo se effettivamente esplicitato
- riprendendo le fonti di input, è importante dare una gerarchia di attestazione di quest'ultime soprattutto quando presentano delle divergenze, pertanto è importante dare maggior priorità a una lettura di storyline e description, e per ultimo writeup che invece fornisce una idea approssimata sul modo di eseguire la challenge senza dare troppo testo agli esatti comandi e all'esatto output atteso(è proprio questo che va verificato qui)
```
## FASE_1: Enumerazione della Rete e Identificazione Servizi

  

```yaml

id: FASE_1

objective: "Identificare le porte aperte e i servizi esposti sul target per definire la superficie di attacco."

produces: [open_ports, ssh_port, http_port]

allowed_tools: [nmap]
mancano le virgolette perchè lo snippet sennò si attiva male su obsidian

  

### Comando/Azione di Riferimento

```bash

nmap -sV -sC -p- <TARGET_IP>


  

### Condizione di Successo Attesa

La scansione riporta due porte in stato 'open': la porta 22 (SSH) e la porta 80 (HTTP/Nginx).

  

### Checklist di Verifica


- [ ] La porta 22/TCP è riportata come aperta con servizio SSH.

- [ ] La porta 80/TCP è riportata come aperta con servizio HTTP (Nginx).

- [ ] Nessun'altra porta rilevante risulta aperta che non sia menzionata nei documenti.

```
```
```

##### 3.5 Orchestrator
Non è un singolo modulo ma possiamo racchiudervi un insieme di componenti atte a controllare il workflow in modo deterministico
L'elemento principale di questa orchestrazione è `graph.py`
- definisce l'attivazione condizionale dei nodi mediante l'utilizzo di archi, ho utilizzato LangGraph per realizzarlo, è importante non confonderlo con il grafo dell'architettura questo ha uno scopo prettamente di orchestrazione
- i nodi e gli archi condividono uno stato comune composto da attributi definiti da una classe in `state.py`, tra loro condividono cose come:
	- la lista dei `TestStep`
	- Indice corrente dello step che si sta svolgendo
	- lo stato attuale che può essere `RUNNING/COMPLETED/FAILED`
	- step completati e step falliti
	- risultati degli step e messaggi di errore
	- verified values, un dizionario di elementi utili per gli step successivi come password o username da salvare
	- sessioni attive della shell e `target_ip` 
- i nodi utilizzati sono i seguenti:
	- `orchestrator` un altro elemento dell'insieme degli orchestratori legge lo step corrente seleziona il `TestStep` dalla lista e lo mette come `current_step`
		- imposta status a COMPLETED se non vi sono più step da seguire
	- `executor` istanzia l'oggetto esecutore di `executor.py` esso restituisce uno `StepResult`verifica se lo step ha come status success  se all'interno vi sono `extracted_values`  aggiorna i `verified_values`
	- incrementa l'indice
	- in caso di fallimento mette lo step tra i `failed_steps` e marca status=FAILED
	- `final_evaluator` lo spiegherò con maggiore precisione dopo ma in sostanza genera un REPORT.md e altre evidenze per definire bene cosa è successo negli step eseguiti
	- `healer` Attiva la riparazione autonoma della macchina, delegando a un controller Python che pilota la CLI di Antigravity
- gli archi i seguenti:
	- `START-> ORCHESTRATOR`
	- `ORCHESTRATOR->EXECUTOR/FINAL_EVALUATOR`
		- se non ci sono ulteriori step o `status==completed` va al final evaluator
		- altrimenti chiama l'executor
	- `EXECUTOR->ORCHESTRATOR/FINAL_EVALUATOR`
		- se `status==failed` passa al final evaluator
		- altrimenti torna all'orchestratore per  uno step successivo
	- `FINAL_EVALUATOR->HEALER/END`
		- se l'healing è disabilitato, se la run ha avuto successo o se l'healing ha superato il massimo numero di possibilità termina
		- altrimenti chiama il nodo di healing
	- `HEALER->ORCHESTRATOR`
		- dopo che ha la correzione è stata effettuata passa all'orchestratore per eseguire di nuovo il test
##### 3.6 Executor
nodo di esecuzione che è stato progettato seguendo il principio ReAct spiegato precedentemente
viene istanziato e richiamato ogni volta dal nodo di executor del grafo
in executor ho portato diverse idee progettuali e non è un semplice LLM che ha la possibilità di chiamare dei tool di un server come HexStrike
- impostato un budget che limita le azioni che può svolgere un esecutore per una singola fase
	- di default sono 8 estendibili ad un tetto massimo di 20 ciò significa che
	- l'esecutore se raggiunge le azioni svolte può inviare una richiesta di aggiunta dei turni mediante un tool
- come detto in precedenza una raccolta solida dei valori come password o nomi utente derivanti da step eseguiti in precedenza, questo consente di ridurre notevolmente la context window aggiungendo solo le chiavi e poi poter ottenere i valori mediante una funzione get
- obbligare l'LLM a riempire un oggetto `StepResult` e inviarlo mediante un tool `submit_step_result` per ottenere delle evidenze solide come:
	- un identificativo del singolo step
	- un suo status
	- un sommario di cosa è stato fatto
	- la spunta delle checklist prese da TestStep
	- chiamate ai tool effettuate
	- turni utilizzati in quel momento
	- il consumo dei token
- un server bridge che fa da intermediario tra la macchina Kali e il nostro LLM che spiegherò ora come punto a sé per definire al meglio la sua architettura e struttura
non so bene cosa aggiungere su questa parte di executor forse il prompt?
##### 3.7 Bridge(non è un nodo fa parte di executor)
i tool che può utilizzare l'executor si dividono in 2 livelli distinti e per tale ragione è stato deciso di definire un bridge che nasconde la seguente suddivisione all'utilizzatore
l'executor chiama un tool e il bridge decide dove mandarlo
tool di livello 1
sono dei tool che vengono eseguiti mediante un server HexStrike che si esegue sulla macchina Kali, il funzionamento avviene mediante chiamate HTTP verso quest'ultimo sfruttando il client di hexstrike
consente l'esecuzione di tool tipici come nmap e hydra ma è di tipo stateless di conseguenza lancia il comando e una volta terminato restituisce uno stdout e il processo muore di conseguenza ho ideato dei 
tool di livello 2
viene eseguito un server REST terminal gateway sulla macchina con la distro di kali linux che mediante una libreria `pexpect` consente di gestire più sessioni PTY parallele identificate da un nominativo `session_name` ed eseguire comandi con il tool `interactive_terminal_exec`

Il Bridge per scelta progettuale oltre a fornire dei tool gestisce anche quelli che sono i loro output
ad esempio per ridurre la context window è stata definita una funzione che effettua il troncamento degli output se quest'ultimi superano un certo tetto prestabilito:
- introdotto dopo aver eseguito un find particolarmente grosso che ha riempito completamente la context window del modello locale
inoltre all'executor non viene per forza inviata tutta la lista dei tool possibili bensì questa viene tagliata mostrando solo i tool compatibili con gli `allowed_tools`
vengono sempre assegnati però dei tool di default tra quelli descritti in precedenza

una cosa che il Bridge consente di effettuare come parte integrante dell'harness del nostro LLM è quella di consentire l'utilizzo di editor a schermo mediante l'invio di comandi da tastiera da parte dell'LLM convertiti in testo leggibile dal nostro server che usa `pexpect`

##### 3.8 Final Evaluator
nodo che trae le conclusioni e genera le evidenze sulla base di ciò che è stato fatto
anche qui abbiamo una parte deterministica che calcola le metriche  e scrive un `run_summary.json` a partire dagli oggetti realizzati durante l'esecuzione del codice come `state` `StepResult` e `ToolCallRecord`
poi avviene invece un secondo stadio con delle chiamate a LLM locali che generano
- un `REPORT.md` sulla base del piano di attacco e dalle evidenze realizzate
- un `healing_ticket.json` se la macchina presenta delle problematiche vengono evidenziate qui

manca la parte sul system prompt

##### 3.9 Prompt Engineering


##### 3.10 Modello Locale e gestione dei suoi parametri
da aggiungere domani
