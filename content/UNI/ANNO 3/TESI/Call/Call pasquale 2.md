struttura del seguente testo:
- reintroduzione e spiegazione rapida del progetto
- cosa succede se applico vulcatest a un classico sistema con harness tipo antigravity? mostra il problema devi trovare la chat
- soluzione:
- architettura e decisioni progettuali prese in vulcatest (alto livello)(mermaid)
- Executor a basso livello con un focus sulle decisioni progettuali prese
- architettura bridge utilizzata su vulcatest per utilizzo dei tool(mermaid)
- vulcahealing 
- utilizzo di modelli locali
- test eseguiti (descrivi le 8 macchine realizzate e portati i report se vuole analizzarli) (caso studio principale pizzeria_B2R)
- piano scientifico, benchmark+metriche

#### 1. Reintroduzione e spiegazione rapida del progetto
VulcAIn è un ecosistema che combina agenti AI e IaC(Infrastructure as Code) per generare macchine vulnerabili per sfide CTF e B2R
è composta principalmente da un workflow composto da 3 moduli:
- VulcaMind: a partire da una descrizione iniziale definisce la storyline la struttura della challenge il percorso di attacco della macchina e la relativa soluzione
- VulcaForge: ha il compito di tradurre questa struttura in un qualcosa di eseguibile IaC mediante Ansible, Dockerfile e script di verifica
- VulcaShip: effettua il deployment sull'effettiva struttura di virtualizzazione

Il mio compito è stato quello di introdurre Vulcatest e VulcaHaling due moduli aggiuntivi che rispettivamente devono:
- verificare la validità della macchina mediante del pentesting agentico Quality Assurance
- riparare la macchina in caso emerga qualche problema
#### 2. Cosa succede se delego il modulo vulcatest ad un harness AI come antigravity?
##### Sono presenti 3 problematiche principali
###### 1. Guardrail stringenti soprattutto su modelli di frontiera
> This request was blocked by Gemini's filters. They can occasionally trigger by mistake on safe coding, security, or biology-related queries. Please try rephrasing your prompt. You can [send feedback](https://ai.google.dev/gemini-api/docs/troubleshooting#file-bug) or read more about [our policies here](https://policies.google.com/terms/generative-ai/use-policy).


###### 2. troppe libertà anche se non definite dal prompt
in questi casi possiamo vedere come l'agente vada a manipolare direttamente il docker o controlli dei file al di fuori della challenge di interesse

![[Pasted image 20260920124129.png|487]]

###### 3. imprecisioni
inoltre lavorando senza rigore (per quanto questi modelli siano ottimi e aggiungi delle parole fighe e tecniche) non ha notato difetti su sottigliezze che invece il mio executor ha notato(es: pizzeria con chat)

#### 3. Architettura VulcaTest in modalità White-Box
Come soluzione per la verifica delle intended ways per determinare la conformance della macchina ho realizzato una architettura di tipologia role-based che ha il compito di risolvere la problematica esposta in precedenza

Vorrei innanzi tutto definire dei principi cardine che mi sono prefissato a priori nella fase di progettazione dell'architettura
##### 1. Deterministico quando è possibile agentico quando necessario
Non ogni componente deve essere un LLM, quando possibili è bene introdurre delle parti deterministiche come ad esempio delle parti di parsing, di orchestrazione e di convalida dei dati
##### 2. Esecuzione basata su evidenze
Un Executor non deve poter considerare uno step completato semplicemente perché dichiara di averlo fatto, è importante definire le azioni concretamente, gli output raccolti e avere dei metadati sul lavoro svolto
##### 3. Separation of concerns
Alla base come detto precedentemente abbiamo una architettura di tipo Role-Based con ogni componente che ha una responsabilità circoscritta
##### 4. intercambiabilità e modularità
definire un'architettura che da la possibilità di cambiare le componenti facilmente, anche semplicemente dare la possibilità di cambiare modelli utilizzati, context window e altri parametri in gioco

##### 5. ReAct e Plan+Execute
a livello macro abbiamo il principio di Plan+Execute:
- il planner scrive l'intero piano che poi viene utilizzato da un esecutore
a livello micro abbiamo ReAct:
- un esecutore che fa reasoning-> Act -> observe 
- tutto questo con una suddivisione in turni

![[Pasted image 20260920161552.png|451]]

###### Planner
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
###### Orchestrator
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
###### Executor
nodo di esecuzione che è stato progettato seguendo il principio ReAct spiegato precedentemente
viene istanziato e richiamato ogni volta dal nodo di executor del grafo
in executor ho portato diverse idee progettuali e non è un semplice LLM che ha la possibilità di chiamare dei tool di un server MCP come HexStrike
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
- un server bridge che fa da intermediario tra la macchina Kali e il nostro LLM che spiegherò ora come nodo a se per definire al meglio la sua architettura e struttura
###### Bridge
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
##### Final Evaluator
nodo che trae le conclusioni e genera le evidenze sulla base di ciò che è stato fatto
anche qui abbiamo una parte deterministica che calcola le metriche  e scrive un `run_summary.json` a partire dagli oggetti realizzati durante l'esecuzione del codice come `state` `StepResult` e `ToolCallRecord`
poi avviene invece un secondo stadio con delle chiamate a LLM locali che generano
- un `REPORT.md` sulla base del piano di attacco e dalle evidenze realizzate
- un `healing_ticket.json` se la macchina presenta delle problematiche vengono evidenziate qui
##### VulcaHealing
il nodo di healing presenta delle differenze dal nodo executor e per questo motivo è bene descriverlo seperatamente
innanzitutto a differenza di tutto il resto la responsabilità di healing è stata affidata ad un software chiamato antigravity di google che consente l'utilizzo di agentic AI sfruttando modelli che mette a disposizione, questo consente un healing molto più avanzato e con dei tool potenzialmente infiniti forniti dal seguente software all'LLM utilizzato(in questo caso gemini 3.8 flash)

un'altra distinzione importante da fare è che il nodo di testing lavorava a stretto contatto con la macchina generata, mentre qui invece abbiamo un agente che ha piena visione dei file ansible creati e di tutto ciò che permette una correzione dalle fondamenta

all'healer viene pasato un system prompt dettagliato con un flag impostato a `/goal` quest'ultimo è una skill di antigravity che permette all'agente di perseguire un obiettivo
il system prompt obbliga all'agente di scrivere solo ed esclusivamente sui file della macchina in analisi e non di toccare altre cartelle e si vogliono evidenziare ulteriori vincoli che impone quali:
- risolvere il minimo necessario per rendere la challenge valida
- non abbassare la difficoltà della macchina mostrando a schermo suggerimenti sulla challenge(no leakage)
- preservare le vulnerabilità didattiche volute senza risolvere problemi che dovrebbero esserci

ad ogni chiamata di healing viene creato uno snapshot della macchina in quel momento e viene inserito in una cartella apposita per rendere possibile un recupero di quello che era in precedenza

la chiamata ad antigravity CLI viene effettuata come un subprocess in python che trasmette in tempo reale l'output in formato JSON
```
agy --mode accept-edits --dangerously-skip-permissions --model <HEALING_MODEL> --add-dir <WORKSPACE_ROOT> --output-format stream-json --print-timeout=<T>s -p <prompt>
```

viene inoltre eseguito un diff deterministico da uno script python `diff_tracker.py` che definisce cosa è stato modificato prima e dopo l'healing

dopo aver terminato viene effettuato un build del docker e viene rimesso in esecuzione per effettuare un nuovo test

#### 4. Utilizzo di modelli locali
In questo progetto ho utilizzato un modello locale
`Qwen 3.8 27B Q3_K_XL` con thinking a low che lavora ai nodi di planning esecuzione e final evaluator
come sviluppi futuri potrei realizzare anche il nodo di healing in locale così da rendere tutto completamente indipendente e a costo zero ma per il momento ancora non è così
per quanto riguarda la scelta di uso dei modelli locali abbiamo principalmente la problematica relativa ai guardrail che hanno i modelli di spicco come google anthropic e openai
e inoltre anche un fattore di costi, avere un modello locale permette un azzeramento dei costi e questo mi è stato molto utile per ogni test che ho dovuto fare

vedendo lo storico che ho sul mio server API che gestisce i modelli sulla mia macchina per eseguire i vari test di questo progetto ho utilizzato

Tokens sent12.9M
Tokens generated1.4M
Total tokens14.3M

raggiungendo un costo stimato di $6,58


### 5. Raccolta delle macchine realizzate e testate con successo
ho realizzato complessivamente 8 macchine e tutte e 8 hanno riportato delle buone risposte da parte della mia architettura(dopo qualche bug fixing)
Se volessimo raggruppare le vulnerabilità testate avremmo:

**Tool e tecniche di ricognizione/accesso**
- `nmap scan` per l'enumerazione di porte e servizi (SSH, HTTP, servizio telemetria su porta custom `20000`)
- `hydra` per il bruteforce SSH a dizionario (AuthGate: `operator:Summer2026!` trovata sfruttando le wordlist esposte sul web `staff.txt` e `passwords.txt`)
- enumerazione web e directory (individuazione di endpoint come `/upload.php`, `/view.php`, `/admin`)
- `exiftool` per l'estrazione di un segreto nascosto nei **metadati EXIF** di un'immagine (DataVault)
- `strings` / `pdftotext` per estrarre un endpoint nascosto nel **corpo di un PDF** di audit (Citadel)

**Vulnerabilità web**
- `sql injection` con `' OR 1=1--` per il bypass dell'autenticazione (Citadel, login SQLite admin)
- **LFI (Local File Inclusion)** con `php://filter` / stream wrapper per leggere `/etc/passwd` e sorgenti come `config.php` (Pizzeria, WebMaster)
- **OS command injection** tramite quote breakout in un parametro non sanitizzato (Citadel, `diagnostic.php` con `shell_exec` su `ping`)
- **file upload non validato** con bypass della blacklist sfruttando l'estensione case-insensitive `.pHP` e directory `uploads/` a `0777` (DataVault, WebMaster)
- **information disclosure** su web: file esposti in chiaro, credenziali in file di configurazione/script

**Credenziali, autenticazione e movimento laterale**
- credential leak in file di sistema: `/opt/test.sh` (Pizzeria), `.bash_history` (PrivAudit)
- **movimento laterale** via `su` riusando credenziali raccolte (`su franchino`, `su developer`, `su vault_admin`)
- **chiave SSH privata con permessi errati** (`id_rsa` a `0644`, world-readable) corretta con `chmod 600`, e **riuso di chiave** tra utenti (AuthGate)
- **autenticazione su raw socket**: servizio di telemetria che richiede un `session_token` statico inviato via socket grezzo (ConsoleGate, porta `20000`)

**Crittografia / forensics**
- **artifact carving + decifratura XOR**: recupero di `backup.enc` + chiave nascosta `.key` e decifratura meccanica tramite `decrypt.py` per ottenere la password di `vault_admin` (CryptoVault)

**Reverse shell**
- **reverse shell** con listener `nc -lvnp` e trigger via cURL, stabilizzata con `python3 pty.spawn`
- gestione **asincrona multi-sessione**: listener e trigger su due PTY parallele identificate da `session_name` (DataVault)

**Privilege escalation a root**
- `sudo` GTFOBins su editor e tool: `sudo nano /etc/passwd` (Pizzeria), `sudo vi` (AuthGate), `sudo git help config` con escape dal pager (PrivAudit)
- **Linux capabilities**: `cap_setuid+ep` su `/usr/bin/python3` (DataVault, WebMaster)
- **SUID binary + PATH hijacking**: binario SUID che invoca `tar` senza path assoluto (CryptoVault)
- **cron job + file world-writable**: script di backup a `0777` eseguito da cron di root (Citadel), sfruttato anche in modalità **time-aware** (attesa dell'esecuzione periodica del cron)
- **Python module hijacking via cron**: directory di import scrivibile e modulo (`random`) importato da uno script eseguito dal cron di root (ConsoleGate)

### 6. Analisi scientifica


### 7. Struttura della tesi

### 8. Scrittura+ Cosa manca da fare