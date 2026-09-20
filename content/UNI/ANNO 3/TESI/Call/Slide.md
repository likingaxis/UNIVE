#### Slide 1
- nome studente: Luca Gugliotta
- nome relatore: Francesco Pasquale
- Corso di Laurea: Tor Vergata Informatica (L-31)
- Progetto: VulcaTest & VulcaHealing
- Titolo: Conformance testing agentico e self-healing per macchine vulnerabili generate da AI: progettazione e validazione di un framework evidence-based per laboratori didattici di cybersecurity

#### Slide 2: Mappa degli argomenti

Cosa vedremo oggi, in ordine:
1. **Il progetto in breve** — l'ecosistema VulcAIn e i miei due moduli (VulcaTest & VulcaHealing)
2. **Il problema** — perché non basta delegare a un harness AI generico (guardrail, troppe libertà, imprecisioni)
3. **L'architettura di VulcaTest** — i principi di design e i componenti:
	- Planner → Orchestratore (nodi + archi) → Executor → Bridge → Final Evaluator
4. **VulcaHealing** — la riparazione autonoma della macchina
5. **Scelte trasversali** — l'uso di modelli locali (motivazioni e costi)
6. **Risultati pratici** — le 8 macchine realizzate e le vulnerabilità testate
7. **Analisi scientifica** — piano sperimentale e i 4 benchmark quantitativi (B1–B4)
8. **Chiusura** — struttura della tesi e prossimi passi

#### Slide 3: Reintroduzione e spiegazione rapida del progetto

**VulcAIn** è un ecosistema che combina **agenti AI** e **IaC** (Infrastructure as Code) per generare macchine vulnerabili per sfide **CTF** e **B2R**.
È un workflow composto principalmente da 3 moduli:
- **VulcaMind**: a partire da una descrizione iniziale definisce la storyline, la struttura della challenge, il percorso di attacco della macchina e la relativa soluzione
- **VulcaForge**: traduce questa struttura in qualcosa di eseguibile in IaC, mediante Ansible, Dockerfile e script di verifica
- **VulcaShip**: effettua il deployment sull'effettiva struttura di virtualizzazione

Il mio compito è stato introdurre **VulcaTest** e **VulcaHealing**, due moduli aggiuntivi che rispettivamente devono:
- **verificare** la validità della macchina mediante pentesting agentico (Quality Assurance)
- **riparare** la macchina nel caso emerga qualche problema

#### Slide 4: Cosa succede se delego il modulo vulcatest ad un harness AI come antigravity?

##### Sono presenti 3 problematiche principali
###### 1. Guardrail stringenti soprattutto su modelli di frontiera
> This request was blocked by Gemini's filters. They can occasionally trigger by mistake on safe coding, security, or biology-related queries. Please try rephrasing your prompt. You can [send feedback](https://ai.google.dev/gemini-api/docs/troubleshooting#file-bug) or read more about [our policies here](https://policies.google.com/terms/generative-ai/use-policy).


###### 2. Troppe libertà, anche se non definite dal prompt
in questi casi possiamo vedere l'agente **manipolare direttamente il Docker** o andare a controllare **file al di fuori della challenge** di interesse

![[Pasted image 20260920124129.png|487]]

###### 3. Imprecisioni
un harness generico lavora **senza il rigore di un oracolo evidence-based**: si accontenta di ciò che l'agente dichiara e tende a dare uno step per riuscito se il risultato "sembra" giusto, senza pretendere una prova puntuale. Così facendo lascia passare difetti sottili di conformità, che invece il mio executor intercetta perché è vincolato a una **checklist con evidenze testuali punto per punto**.
(per quanto i modelli di frontiera siano ottimi, il problema qui non è la loro potenza ma la **mancanza di vincoli sul giudizio**)

**Esempio concreto — Pizzeria**: la storyline prevedeva che l'endpoint nascosto si scoprisse tramite una chat di assistenza, ma la chat non era stata generata e il link era esposto in chiaro. Un harness libero completa comunque la challenge e la dà per valida; il mio executor invece **rileva l'incoerenza e blocca la fase**, perché la checklist richiede esplicitamente quel canale come *intended way*.

#### Slide 5: Progettazione Architetturale di VulcaTest in modalità White-Box
Come soluzione per la verifica delle *intended ways* e la determinazione della **conformance** della macchina ho realizzato un'architettura di tipo **role-based**, pensata per risolvere le problematiche esposte in precedenza.

Innanzitutto definisco i **principi cardine** che mi sono prefissato a priori in fase di progettazione:
##### 1. Deterministico quando è possibile, agentico quando necessario
non ogni componente deve essere un LLM: quando possibile è bene introdurre parti **deterministiche**, ad esempio il parsing, l'orchestrazione e la convalida dei dati
##### 2. Esecuzione basata su evidenze
un Executor non deve poter considerare uno step completato solo perché dichiara di averlo fatto: è importante definire concretamente le azioni, gli output raccolti e avere **metadati** sul lavoro svolto
##### 3. Separation of concerns
alla base, come detto, abbiamo un'architettura **role-based**, con ogni componente che ha una **responsabilità circoscritta**
##### 4. Intercambiabilità e modularità
definire un'architettura che dia la possibilità di **cambiare le componenti facilmente**, anche solo per sostituire i modelli utilizzati, la context window e altri parametri in gioco
##### 5. ReAct e Plan+Execute
- a livello **macro**, il principio **Plan+Execute**: il planner scrive l'intero piano, che poi viene eseguito da un esecutore
- a livello **micro**, **ReAct**: un esecutore che fa *reasoning → act → observe*, il tutto suddiviso in turni

#### Slide 6: Architettura effettiva
IMPORTANTE DA METTERE NELLE SLIDE LA FOTO DELL'ARCHITETTURA
![[Pasted image 20260920161552.png|451]]

#### Slide 7: Planner

Il modulo del pianificatore è suddiviso in **2 parti**, che riprendono il principio n.1 (deterministico/agentico).

**Parte agentica (LLM)** — genera un `ATTACK_PLAN.md` a partire da:
- un **system prompt** ben definito, che obbliga l'LLM a generare un piano rigoroso e con un certo formato
- `DESCRIPTION.md` — descrizione scritta da un umano per definire il design della challenge
- `STORYLINE.md` — storyline generata da VulcaMind
- `WRITEUP.md` — writeup di esecuzione molto superficiale, che non definisce gli step in modo rigoroso

**Parte deterministica** — `plan_parser.py`:
- uno script Python che trasforma `ATTACK_PLAN.md` in **oggetti tipizzati**, definiti dalla classe `pydantic` `TestStep` in `models.py`, con i seguenti attributi:
	- `id`
	- `objective`
	- `action`
	- `produces[]`
	- `checklist`
	- `allowed_tools`

Ci tengo a precisare che dentro `ATTACK_PLAN.md` ci sono **snippet in YAML**: preferito al JSON perché più permissivo.
#### Slide 8: Orchestratore
Non è un singolo modulo: possiamo racchiudervi un **insieme di componenti** che controllano il workflow in modo **deterministico**.

L'elemento principale di questa orchestrazione è `graph.py`:
- definisce l'**attivazione condizionale dei nodi** mediante archi; l'ho realizzato con **LangGraph**. È importante non confonderlo con il grafo dell'architettura: questo ha uno scopo prettamente di orchestrazione
- nodi e archi condividono uno **stato comune**, composto da attributi definiti da una classe in `state.py`; tra loro condividono cose come:
	- la lista dei `TestStep`
	- l'**indice corrente** dello step che si sta svolgendo
	- lo **stato attuale**, che può essere `RUNNING` / `COMPLETED` / `FAILED`
	- gli step completati e gli step falliti
	- i risultati degli step e i messaggi di errore
	- i **verified values**: un dizionario di elementi utili per gli step successivi (es. password o username da salvare)
	- le sessioni attive della shell e il `target_ip`

#### Slide 9: Orchestratore - i nodi
I nodi utilizzati sono i seguenti:
- **`orchestrator`** — un altro elemento dell'insieme degli orchestratori: legge lo step corrente, seleziona il `TestStep` dalla lista e lo imposta come `current_step`
	- imposta lo status a `COMPLETED` se non vi sono più step da seguire
- **`executor`** — istanzia l'oggetto esecutore di `executor.py`, che restituisce uno `StepResult`; verifica se lo step ha status *success* e, se al suo interno ci sono `extracted_values`, aggiorna i `verified_values`
	- incrementa l'indice
	- in caso di fallimento mette lo step tra i `failed_steps` e marca `status=FAILED`
- **`final_evaluator`** — lo spiegherò con maggiore precisione dopo; in sostanza genera un `REPORT.md` e altre evidenze per definire bene cosa è successo negli step eseguiti
- **`healer`** — attiva la riparazione autonoma della macchina, delegando a un controller Python che pilota la CLI di Antigravity

#### Slide 10: Orchestratore - gli archi
Gli archi sono i seguenti:
- **`START → ORCHESTRATOR`**
- **`ORCHESTRATOR → EXECUTOR / FINAL_EVALUATOR`**
	- se non ci sono ulteriori step o `status == completed`, va al final evaluator
	- altrimenti chiama l'executor
- **`EXECUTOR → ORCHESTRATOR / FINAL_EVALUATOR`**
	- se `status == failed`, passa al final evaluator
	- altrimenti torna all'orchestratore per lo step successivo
- **`FINAL_EVALUATOR → HEALER / END`**
	- termina se l'healing è disabilitato, se la run ha avuto successo o se l'healing ha superato il numero massimo di tentativi
	- altrimenti chiama il nodo di healing
- **`HEALER → ORCHESTRATOR`**
	- una volta effettuata la correzione, passa all'orchestratore per eseguire di nuovo il test

#### Slide 11: Executor

Nodo di esecuzione progettato seguendo il principio **ReAct** spiegato in precedenza; viene istanziato e richiamato ogni volta dal nodo `executor` del grafo.
In executor ho portato diverse idee progettuali: **non è un semplice LLM** che chiama i tool di un server come HexStrike.
- **budget** che limita le azioni che un esecutore può svolgere per una singola fase:
	- di default **8**, estendibili fino a un tetto massimo di **20**
	- se raggiunge il limite, l'esecutore può inviare una **richiesta di aggiunta turni** mediante un tool
- **raccolta solida dei valori** (password, username…) derivanti dagli step precedenti: consente di **ridurre notevolmente la context window**, tenendo nel prompt solo le chiavi e recuperando i valori all'occorrenza tramite una funzione *get*
- obbligo per l'LLM di riempire un oggetto **`StepResult`** e inviarlo tramite il tool **`submit_step_result`**, per ottenere evidenze solide come:
	- un identificativo del singolo step
	- il suo status
	- un sommario di cosa è stato fatto
	- la spunta delle checklist prese da `TestStep`
	- le chiamate ai tool effettuate
	- i turni utilizzati in quel momento
	- il consumo dei token
- un **server bridge** che fa da intermediario tra la macchina Kali e il nostro LLM, che spiegherò ora come punto a sé per definirne meglio architettura e struttura

#### Slide 12: Bridge
![[Pasted image 20260920230436.png]]
I tool che l'executor può utilizzare si dividono in **2 livelli distinti**: per questo ho definito un **bridge** che nasconde tale suddivisione all'utilizzatore. L'executor chiama un tool e **il bridge decide dove mandarlo**.

**Tool di livello 1**
- eseguiti mediante il server **HexStrike** in esecuzione sulla macchina Kali; la comunicazione avviene tramite **chiamate HTTP**, sfruttando il client di HexStrike
- consente l'esecuzione di tool tipici come `nmap` e `hydra`, ma è di tipo **stateless**: lancia il comando, ne restituisce lo *stdout* e, una volta terminato, il processo muore → da qui la necessità dei tool di livello 2

**Tool di livello 2**
- un server REST **terminal gateway** in esecuzione sulla macchina Kali che, mediante la libreria `pexpect`, gestisce **più sessioni PTY parallele** identificate da un `session_name` ed esegue comandi con il tool `interactive_terminal_exec`

Il Bridge, per scelta progettuale, oltre a fornire i tool ne **gestisce anche gli output**:
- per ridurre la context window, una funzione **tronca gli output** che superano un tetto prestabilito
	- introdotta dopo un `find` particolarmente grosso che aveva riempito completamente la context window del modello locale
- all'executor non viene inviata l'intera lista dei tool: viene **tagliata** mostrando solo quelli compatibili con gli `allowed_tools`
	- vengono comunque sempre assegnati alcuni **tool di default** tra quelli descritti in precedenza

Un'altra cosa che il Bridge consente, come parte integrante dell'harness del nostro LLM, è l'**uso di editor a schermo**: i comandi da tastiera inviati dall'LLM vengono convertiti in testo leggibile dal server che usa `pexpect`.

#### Slide 13: Final Evaluator

Nodo che **trae le conclusioni** e genera le evidenze sulla base di ciò che è stato fatto.

**Stadio deterministico** — calcola le metriche e scrive un `run_summary.json` a partire dagli oggetti prodotti durante l'esecuzione, come `state`, `StepResult` e `ToolCallRecord`.

**Stadio agentico (LLM locali)** — genera:
- un `REPORT.md`, sulla base del piano di attacco e delle evidenze raccolte
- un `healing_ticket.json`, in cui vengono evidenziate le eventuali problematiche della macchina

#### Slide 14: VulcaHealing

Il nodo di healing presenta delle differenze rispetto al nodo executor, per questo è bene descriverlo **separatamente**.

- a differenza di tutto il resto, la responsabilità dell'healing è affidata a un software chiamato **Antigravity** (di Google), che consente l'uso di *agentic AI* sfruttando i modelli che mette a disposizione. Questo permette un healing molto più avanzato, con tool potenzialmente infiniti forniti dal software all'LLM utilizzato (in questo caso **gemini 3.8 flash**)
- un'altra distinzione importante: il nodo di **testing** lavorava a stretto contatto con la macchina generata, mentre qui abbiamo un agente che ha **piena visione dei file Ansible** creati e di tutto ciò che permette una correzione **dalle fondamenta**

#### Slide 15: VulcaHealing - implementazione

All'healer viene passato un **system prompt dettagliato**, preceduto dal prefisso `/goal`: quest'ultimo è una **skill di Antigravity** che permette all'agente di perseguire un obiettivo.
Il system prompt obbliga l'agente a **scrivere esclusivamente sui file della macchina** in analisi, senza toccare altre cartelle, e impone ulteriori vincoli:
- risolvere il **minimo necessario** per rendere la challenge valida
- **non abbassare la difficoltà** della macchina mostrando a schermo suggerimenti sulla challenge (*no leakage*)
- **preservare le vulnerabilità didattiche** volute, senza risolvere problemi che invece devono esserci

- ad ogni chiamata di healing viene creato uno **snapshot** della macchina in quel momento, riposto in una cartella apposita per rendere possibile un **recupero** dello stato precedente
- la chiamata ad Antigravity CLI viene effettuata come un **subprocess** Python che trasmette in tempo reale l'output in formato JSON:

```
agy --mode accept-edits --dangerously-skip-permissions --model <HEALING_MODEL> --add-dir <WORKSPACE_ROOT> --output-format stream-json --print-timeout=<T>s -p <prompt>
```

- viene inoltre eseguito un **diff deterministico** dallo script Python `diff_tracker.py`, che definisce cosa è stato modificato prima e dopo l'healing
- al termine viene effettuato un **build del Docker**, che viene rimesso in esecuzione per un nuovo test

#### Slide 16: Utilizzo di modelli locali

In questo progetto ho utilizzato un **modello locale**: `Qwen 3.8 27B Q3_K_XL`, con *thinking* a `low`, che lavora ai nodi di **planning, esecuzione e final evaluator**.
Come sviluppo futuro potrei realizzare anche il nodo di **healing in locale**, così da rendere tutto completamente indipendente e a costo zero — ma per il momento non è ancora così.

Le motivazioni della scelta dei modelli locali sono principalmente due:
- i **guardrail** dei modelli di spicco (Google, Anthropic, OpenAI), che ostacolano un task di security come questo
- il **fattore costi**: un modello locale permette di **azzerare i costi**, cosa molto utile per ogni test che ho dovuto fare

Guardando lo storico del server API che gestisce i modelli sulla mia macchina, per i vari test di questo progetto ho utilizzato:

- **Tokens sent**: 12.9M
- **Tokens generated**: 1.4M
- **Total tokens**: 14.3M

per un **costo stimato**, se si fosse pagato tutto, di **$6,58**.

#### Slide 17: Raccolta delle macchine realizzate e testate con successo
Ho realizzato complessivamente **8 macchine** e tutte e 8 hanno riportato buone risposte da parte della mia architettura (dopo qualche bug fixing).
Raggruppando le **vulnerabilità testate** avremmo:

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

#### Slide 18: Vulnerabilità testate (2)

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

#### Slide 19: Analisi scientifica

Si vuole definire un **piano sperimentale** capace di rendere le prestazioni del workflow **misurabili, confrontabili e riproducibili**.
Si vogliono quindi definire **4 benchmark quantitativi**, individuati dopo un'attenta lettura dei paper:
- **PentestGPT**
    - _Presentazione video e slide_: [https://www.youtube.com/watch?v=eGqjYo_vdTg](https://www.youtube.com/watch?v=eGqjYo_vdTg)
    - _Riferimento_: _PentestGPT: An LLM-powered Autonomous Penetration Testing Framework_
- **Cybench**
    - _Titolo_: _Cybench: A Cybersecurity Benchmark for Evaluating Large Language Models_
    - _Link_: [https://arxiv.org/pdf/2408.08926](https://arxiv.org/pdf/2408.08926)
- **The Test Oracle Problem in Synthetic LLM-as-Judge Corpora**
    - _Titolo_: _The Test Oracle Problem in Synthetic LLM-as-Judge Corpora: Disappearance, Distortion and a Validation Protocol_
    - _Link_: [https://arxiv.org/pdf/2607.13707](https://arxiv.org/pdf/2607.13707)
- **SWE-Bench Pro Verified**
    - _Titolo_: _SWE-Bench Pro Verified: A Reliable Benchmark for Software Engineering Agents_
    - _Link_: [https://arxiv.org/pdf/2609.08149](https://arxiv.org/pdf/2609.08149)
- **AgentBoard**
    - _Titolo_: _AgentBoard: An Analytical Evaluation Board of Multi-turn LLM Agents_
    - _Link_: [https://arxiv.org/pdf/2401.13178](https://arxiv.org/pdf/2401.13178)

#### Slide 20: Definizione della TestBench
I benchmark che definirò saranno tutti basati su **macchine generate a priori**, che rappresenteranno un **Dataset**. Il procedimento di generazione segue un paradigma ben definito dal paper (_The Test Oracle Problem in Synthetic_), dimensionato da una formula:
- il numero di campioni $n$ si dimensiona con $n \ge \frac{\ln(1-C)}{\ln(1-p)}$, dove $C$ è il livello di confidenza e $p$ la probabilità di guasto (es. per $C=99\%$ e $p=20\%$ servono circa **21 macchine**)

L'idea alla base, per effettuare più test senza generare tante macchine da zero, è usare una tecnica di **perturbazione controllata** (_The Test Oracle Problem in Synthetic LLM-as-Judge Corpora_):
- creare macchine **Golden state**, corrette al 100%, dove VulcaTest non sbaglia nemmeno una fase
- aggiungere **alterazioni mirate** alla macchina
- conoscendo il punto preciso dell'alterazione, possiamo confrontare i due output e trarne buone conclusioni

Questo consente quindi di definire:
$$M\times N=n$$
per ottenere $n$ campioni sono sufficienti $M$ macchine e $N$ perturbazioni.

#### Slide 21: B1 - Capacità di riconoscimento
**Nasce da una domanda:** il sistema è in grado di accorgersi in autonomia se una macchina presenta un difetto, distinguendola da una sana?

Si costruisce una **confusion matrix**:

|                        | test `FAILED` | test `COMPLETED` |
| ---------------------- | ------------- | ---------------- |
| **macchina difettosa** | **TP**        | *FN*             |
| **macchina sana**      | *FP*          | **TN**           |

da cui possiamo calcolare:

$$\text{Accuracy} = \frac{\text{TP} + \text{TN}}{\text{TP} + \text{TN} + \text{FP} + \text{FN}} \qquad \text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}}$$

$$\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}} \qquad F_1 = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}$$

Nella capacità di riconoscimento possiamo integrare anche un **benchmark di avanzamento** basato su subtask, prendendo ispirazione dai paper (_Cybench_ e _AgentBoard_).
Cattura i **successi parziali** lungo il percorso di collaudo, senza appiattire l'esito su un valore binario (*Pass/Fail*):

$$\text{Progress} = \frac{\sum \text{checkpoint della checklist superati con successo}}{\text{totale checkpoint previsti nel piano}}$$

questo permette considerazioni su **misure non binarie**, invece del semplice `PASSED/FAILED`.
#### Slide 22: B2 - Accuratezza Diagnostica
**Nasce da una domanda:** il Final Evaluator comprende la reale causa interna dell'errore?

$$\text{RCA Accuracy} = \frac{\text{diagnosi corrette}}{\text{totale fallimenti analizzati}}$$
#### Slide 23: B3 - Efficacia di Riparazione
**Nasce da una domanda:** il nodo di healing è in grado di ripristinare la macchina effettuando interventi minimi?

Andiamo a calcolare:

$$\text{Closed-Loop Success Rate} = \frac{\text{riparazioni con retest COMPLETED}}{\text{totale riparazioni avviate}}$$
quantifica la % di riparazioni che, al secondo run, consentono all'agente di completare tutti gli step.
$$\text{Ampiezza Patch} = \#\text{file modificati} + \#\text{righe alterate}$$
quantifica l'ampiezza dell'intervento rispetto alla correzione minima necessaria, calcolata tramite **diff deterministico** (`patch.diff`).
#### Slide 24: B4 - Costi ed Efficienza
**Nasce dalle domande:** quanto ci costa? quanto tempo impiega? quanti token consumiamo?
Misuriamo i tempi con:
$$T_{\text{collaudo}} = T_{\text{executor}} + T_{\text{orchestrator}}$$
$$T_{\text{evaluator}}$$
$$T_{\text{healer}}$$
Token consumati da cui poi possiamo derivare anche i costi
$$\text{Token}_{\text{totali}} = \text{Token}_{\text{planner}} + \text{Token}_{\text{executor}} + \text{Token}_{\text{evaluator}} + \text{Token}_{\text{healer}}$$

$\text{Costo} = (\text{Token}_{\text{in}} \cdot P_{\text{in}}) + (\text{Token}_{\text{out}} \cdot P_{\text{out}})$

#### Slide 25: Benchmark da aggiungere in futuro
- **confrontare modelli differenti**
	- risponde a una domanda nata dai paper (_Cybench_ e _SWE-Agent_)
	- quanto stiamo confrontando i **modelli** e quanto lo **scaffold** (l'infrastruttura che li gestisce)
- **confrontare l'architettura** con una architettura **monolitica agentica** (magari confrontando anche i costi)
- **modalità Black-Box pura**, sottoponendola a CTF come quelle di TryHackMe o a esami svolti dagli studenti di VDSI, confrontando tempi e soluzioni
	- dovrebbe essere fattibile modificando alcuni parametri, ma l'executor (il cuore) rimarrebbe quasi invariato

#### Slide 26: Struttura della tesi

Ho ideato la mia tesi con i seguenti capitoli:
- **capitolo 1 — Introduzione e contesto**
	- definisco il dominio didattico delle CTF, cos'è un workflow agentico, un agente LLM e il problema da risolvere
	- circa 5-7 pagine discorsive
- **capitolo 2 — Architettura e scelte di design**
	- descrivo la pipeline di VulcAIn e spiego i perché di alcune scelte di design e prompt engineering
	- 8-10 pagine
- **capitolo 3 — Spiegazioni tecniche**
	- come il sistema funziona nel dettaglio e i tool utilizzabili
	- 8-11 pagine
- **capitolo 4 — Valutazione sperimentale con benchmark**
	- 10 pagine
- **capitolo 5 — Conclusioni e sviluppi futuri**
	- 3-4 pagine

#### Slide 27: Scrittura + cosa manca da fare
Cosa farò ora?
- mentre eseguo i benchmark, scrivo i primi 3 capitoli
- se termino tutto e mi rimane tempo, provo ad aggiungere confronti con più modelli e la modalità black-box
