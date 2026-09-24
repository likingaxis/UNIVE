dal paper 
# A Survey on Large Language Model Based Autonomous Agents
copio e incollo dei concetti interessanti:
# 3. Memory

La memoria consente all'agente di utilizzare ciò che è successo in precedenza per prendere decisioni future.

Gli autori distinguono soprattutto:

**Short-term memory**, cioè ciò che rimane direttamente nel context window dell'LLM.

**Long-term memory**, cioè informazioni salvate esternamente e recuperabili in futuro, per esempio tramite vector database.

Da qui derivano due architetture:

### Unified memory

Praticamente tutto rimane nel prompt/context.

È semplice, ma soffre del limite della context window.

### Hybrid memory

Combina:

**short-term memory + long-term external memory**

Per esempio:

```
Current terminal history
        ↓
Short-term memory
        ↓
Relevant successful attack paths
        ↓
Vector DB / long-term memory
```

Il paper cita agenti come **Generative Agents, AgentSims, GITM e Reflexion** come esempi.

Questa parte potrebbe diventare interessante anche nella tua tesi se volessi in futuro far ricordare all'agente:

- exploit riusciti;
- errori precedenti;
- strategie efficaci;
- caratteristiche ricorrenti delle macchine target.
# 4. Planning

Questa probabilmente è la sezione più rilevante per il tuo progetto.

Il paper divide il planning in:

**planning without feedback**

e

**planning with feedback**.

---

## Planning senza feedback

L'agente genera sostanzialmente il piano e poi lo segue.

Gli autori distinguono tre approcci.

### Single-path reasoning

C'è un'unica catena:

```
Task
 ↓
Step 1
 ↓
Step 2
 ↓
Step 3
 ↓
Result
```

Esempi:

- Chain-of-Thought;
- Zero-shot CoT;
- ReWOO;
- HuggingGPT.

---

### Multi-path reasoning

L'agente considera più possibili strategie.

```
                 ┌─ approach A
Task → reasoning ├─ approach B
                 └─ approach C
```

Esempi:

- Self-Consistency;
- Tree of Thoughts;
- Graph of Thoughts;
- MCTS-based approaches.

La Figura 3 del paper mostra proprio la differenza fra questi due paradigmi.

---

### External planner

L'LLM non deve necessariamente fare tutto.

Può produrre una rappresentazione del problema e delegare il planning ad algoritmi esterni.

Il paper cita ad esempio **LLM+P**, dove l'LLM converte il problema in PDDL, un planner classico risolve il problema e l'LLM riconverte il piano in linguaggio naturale.

# 5. Planning con feedback

Qui arriviamo alla parte che descrive molto bene un workflow agentico moderno.

Il problema del piano creato una sola volta è semplice:

> il mondo reale non si comporta sempre come previsto.

Il comando può fallire, il risultato può essere inatteso, un prerequisito può mancare.

Gli autori osservano quindi che per task complessi e **long-horizon**, l'agente deve aggiornare continuamente il piano in funzione del feedback ricevuto.

Dividono il feedback in tre categorie.

### Environmental feedback

```
Thought
 ↓
Action
 ↓
Environment
 ↓
Observation
 ↓
New Thought
```

È praticamente il paradigma **ReAct**.

Il paper descrive ReAct proprio come una sequenza:

**Thought → Act → Observation**, dove la nuova decisione dipende dall'osservazione precedente.

Per il tuo agente:

```
"I should enumerate HTTP"

        ↓

nmap / curl / gobuster

        ↓

"403 Forbidden"

        ↓

planner updates strategy
```

Questo è esattamente **environmental feedback**.

DIRE CHE NEL NOSTRO CASO NON È COSÌ PERCHÈ IL PIANO È 1 E SOLTANTO 1 DA SEGUIRE INTEDED WAY!
# 7. Come un agente acquisisce nuove capacità

Gli autori introducono poi una distinzione che trovo molto utile.

Un agente può migliorare in due modi principali.

## Con fine-tuning

Modificando direttamente i parametri del modello attraverso dataset:

- annotati da umani;
- generati dagli LLM;
- raccolti dal mondo reale.

---

## Senza fine-tuning

Ed è la parte più interessante per la maggioranza dei sistemi agentici.

Gli autori distinguono:

**Prompt engineering**

e

**Mechanism engineering.**

Il secondo termine è particolarmente importante.

### Mechanism engineering

Non migliori il modello stesso.

Migliori **il sistema intorno al modello**.

Per esempio aggiungi:

```
planner
critic
memory
retry logic
feedback loops
multiple agents
verification
```

Il paper considera esempi di mechanism engineering:

- trial-and-error;
- crowd-sourcing / multi-agent debate;
- experience accumulation;
- self-driven evolution.

Questa distinzione descrive molto bene anche il senso di una tesi come la tua.

Il contributo non deve necessariamente essere:

> “ho creato un LLM migliore”.

Può essere:

> “ho progettato un meccanismo agentico migliore intorno a un LLM esistente”


### PIÙ SULLA PARTE BENCHMARK MA LO METTO QUI
# 9. Valutazione degli agenti

Questa parte per la tua tesi è probabilmente importante quasi quanto quella sul planning.

Gli autori dividono l'evaluation in:

**subjective evaluation**

e

**objective evaluation**.

---

## Subjective evaluation

Valutazione umana.

Due metodi principali:

### Human annotation

Persone valutano aspetti come:

- qualità;
- correttezza;
- utilità;
- comportamento.

### Turing-test-like evaluation

Si confronta il comportamento dell'agente con quello umano.

È però costosa e soggetta a bias.

Per questo il paper menziona anche l'uso di LLM come evaluator/critic.

---

# 10. Objective evaluation

Qui il paper distingue:

**metrics → evaluation protocols → benchmarks.**

### Metriche di task success

Per esempio:

- success rate;
- reward/score;
- coverage;
- accuracy.

### Human similarity

Per applicazioni che simulano esseri umani.

### Efficiency

Per esempio:

- planning length;
- costo;
- inference time;
- numero di interazioni necessarie.

Per la tua tesi, questo suggerisce molto naturalmente metriche come:

```
Task Success Rate
Exploit Success Rate
Vulnerability Discovery Rate
Number of Agent Steps
Number of Tool Calls
Token Cost
Execution Time
Planning Overhead
Recovery After Failure
```

Le prime categorie sono direttamente coerenti con la tassonomia proposta dal paper; le metriche cybersecurity specifiche sarebbero una tua specializzazione.

---

# 11. Evaluation protocol

Non conta solo **cosa misuri**, ma anche **come fai l'esperimento**.

Il paper distingue ad esempio:

- real-world simulation;
- social evaluation;
- multi-task evaluation;
- software testing.

Nel tuo caso sarebbe qualcosa di simile a:

```
Agent
  ↓
isolated vulnerable machine
  ↓
fixed initial conditions
  ↓
autonomous attempt
  ↓
metrics collected
```

ripetuto magari su molte macchine e più run.

# Cognitive Architectures for Language Agents
# 1. Da dove nasce CoALA

La parte iniziale del paper fa un collegamento storico con le **cognitive architectures** classiche, in particolare sistemi come **Soar**.

L’idea tradizionale era:

```
perception
   ↓
working memory
   ↓
rules / productions
   ↓
action selection
   ↓
action
```

Le architetture cognitive cercavano di modellare processi umani come:

- memoria;
- percezione;
- pianificazione;
- problem solving;
- apprendimento.

Il problema dei vecchi sistemi simbolici era che richiedevano moltissime regole scritte a mano e funzionavano bene solo in domini molto strutturati. Gli autori sostengono che gli LLM sono interessanti proprio perché possono sostituire gran parte di queste regole manuali grazie alla conoscenza acquisita nel pretraining.

---

# 2. L’analogia fondamentale: LLM come “production system probabilistico”

Questa è una delle parti più teoriche ma anche più interessanti.

Nei vecchi production system avevi regole del tipo:

```
X → Y
```

cioè:

> se la situazione è X, trasformala in Y.

Gli autori osservano che un LLM fa qualcosa di concettualmente simile:

```
Prompt X → possibile continuazione Y
```

ma in modo probabilistico.

Quindi l’LLM viene visto come una specie di:

> **probabilistic production system**

che assegna probabilità a differenti possibili “produzioni” o continuazioni.

Questo spiega anche uno dei vantaggi e degli svantaggi degli LLM:

- sono molto più flessibili delle regole simboliche;
- ma sono anche opachi e stocastici.

# 4. Il cuore del paper: CoALA

La Figura 4 a pagina 8 è probabilmente la più importante di tutto il paper.

CoALA organizza un agente lungo tre dimensioni:

1. **Memory**
2. **Action space**
3. **Decision-making procedure**

L’agente contiene:

```
              ┌────────────────────┐
              │ Procedural Memory  │
              ├────────────────────┤
              │ Semantic Memory    │
              ├────────────────────┤
              │ Episodic Memory    │
              ├────────────────────┤
              │ Working Memory     │
              └─────────┬──────────┘
                        │
          ┌─────────────┼─────────────┐
          │             │             │
       Reasoning     Retrieval      Learning
          │             │             │
          └─────────────┼─────────────┘
                        │
                  Decision Making
                        │
                     Action
                        │
                     World
```

Questa è la struttura concettuale centrale del paper.

# 5. Memory

CoALA divide la memoria in quattro categorie.

## Working Memory

È la memoria attiva corrente.

Contiene:

- osservazioni recenti;
- obiettivi;
- risultati intermedi;
- informazioni recuperate;
- variabili necessarie per la decisione corrente.

La cosa importante è che non coincide necessariamente con il semplice context window: gli autori la descrivono come una struttura persistente attraverso più chiamate all’LLM.

Per il tuo agente potrebbe essere:

```
target IP
open ports
current hypothesis
current subgoal
last command
last terminal output
known credentials
```

---

## Episodic Memory

Salva **esperienze precedenti**.

Per esempio:

```
Task A
→ tried X
→ failed
→ tried Y
→ success
```

Queste esperienze possono successivamente essere recuperate per aiutare il planning.

In un agente cybersecurity sarebbe molto naturale salvarci:

- precedenti tentativi;
- traiettorie di pentest;
- exploit falliti;
- exploit riusciti;
- sequenze di comandi.

---

## Semantic Memory

Contiene conoscenza generale.

Per esempio:

```
"Apache 2.4.x has..."
"NFS enumeration can be done with..."
"Service X commonly exposes..."
```

Questa memoria può inizialmente essere alimentata da documentazione esterna e poi arricchirsi con conoscenza derivata dalle esperienze dell’agente.

In pratica è qualcosa di simile a una knowledge base / RAG.

---

## Procedural Memory

Questa è forse la distinzione più interessante.

Contiene **come fare le cose**.

Il paper divide la procedural memory in due parti:

```
implicit procedural memory
= conoscenza nei pesi dell'LLM

explicit procedural memory
= codice dell'agente
```

Il codice dell’agente definisce procedure per:

- reasoning;
- retrieval;
- grounding;
- learning;
- decision-making.

Nel tuo progetto, ad esempio:

```
interactive_terminal_exec()
parser del terminale
retry logic
planner loop
diagnostician logic
```

sono tutti elementi di **procedural memory esplicita**.

---

# 6. Action space

CoALA fa una distinzione molto elegante:

```
ACTIONS
├── INTERNAL
│   ├── reasoning
│   ├── retrieval
│   └── learning
│
└── EXTERNAL
    └── grounding
```

È uno dei concetti più importanti del paper.

# 7. Grounding

Il grounding è l’interazione con il mondo esterno.

Gli autori distinguono tre tipi di ambiente:

### Physical

Robot, sensori, attuatori.

### Dialogue

Interazioni con esseri umani o altri agenti.

### Digital

- siti web;
- API;
- giochi;
- interpreti;
- esecuzione di codice.

Per il tuo progetto il terminale remoto è chiaramente:

> **digital environment**

e una chiamata tipo:

```
interactive_terminal_exec("nmap ...")
```

è una **grounding action**.

Questa definizione è estremamente utile per descrivere formalmente il tuo sistema.

# 8. Retrieval

Retrieval significa:

> prendere informazione dalla long-term memory e inserirla nella working memory.

Per esempio:

```
Current situation:
SSH 7.2 detected

        ↓ retrieval

Memory:
previous experience / documentation / exploit knowledge

        ↓

Working memory
```

Può essere implementato con:

- keyword search;
- vector embeddings;
- dense retrieval;
- regole;
- similarity.

---

# 9. Reasoning

Reasoning invece lavora **all’interno della working memory**.

La distinzione è molto bella:

```
Retrieval:
long-term memory → working memory

Reasoning:
working memory → working memory
```

Il reasoning crea nuove informazioni:

- riassunti;
- ipotesi;
- piani;
- inferenze;
- riflessioni.

Per esempio:

```
Observation:
Port 80 open
Apache
/cgi-bin/ present

Reasoning:
"CGI endpoint may expose Shellshock-like attack surface"
```

Quella nuova ipotesi entra nella working memory.

# 12. Decision-making

Questa è probabilmente la parte più utile per il tuo progetto.

La decision-making procedure è il **main loop dell’agente**.

Il ciclo fondamentale è:

```
Observation
    ↓
Planning
    ↓
Proposal
    ↓
Evaluation
    ↓
Selection
    ↓
Execution
    ↓
Observation
    ↓
...
```

Questa struttura appare nella Figura 4B.

---

# 13. Proposal → Evaluation → Selection

CoALA spezza il planning in tre fasi.

## Proposal

Genera una o più azioni candidate.

```
Possible next actions:

1. run nmap -sV
2. enumerate SMB
3. inspect HTTP
4. test SSH credentials
```

---

## Evaluation

Valuta le alternative.

Può usare:

- euristiche;
- LLM;
- value functions;
- simulatori;
- world models.

---

## Selection

Sceglie l’azione migliore.

Per esempio:

```
argmax(score(action))
```

oppure:

- majority voting;
- softmax;
- altre strategie.

Poi l’azione viene eseguita e il risultato torna nell’ambiente/working memory.


# 15. ReAct visto tramite CoALA

ReAct è probabilmente il caso più vicino a un agente semplice come quello che stai sviluppando.

Ha:

```
internal action:
reasoning

external action:
grounding
```

e il ciclo:

```
reason
→ act
→ observation
→ reason
→ act
...
```

Non ha vera long-term memory né learning persistente.

Quindi un agente che usa:

```
LLM
→ terminal command
→ terminal output
→ LLM
```

è praticamente un **ReAct-like agent** secondo questa tassonomia.# 16. Voyager

Voyager è molto più sofisticato.

Possiede tutte e quattro le categorie di azioni:

```
grounding
reasoning
retrieval
learning
```

e mantiene una libreria di skill in procedural memory.

Il ciclo è:

```
create task
→ generate code
→ execute
→ observe result

if success:
    store skill

if failure:
    reason
    modify code
    retry
```

È praticamente un agente che **costruisce progressivamente una libreria di competenze**.
# 9. Insight principale: agenti modulari

La raccomandazione forse più forte del paper è:

> **gli agenti dovrebbero essere modulari.**

Gli autori propongono di pensare in termini di componenti:

```
Memory
Action
Agent
Decision procedure
```

piuttosto che creare un enorme prompt monolitico.

Questo è molto rilevante per la tua architettura.

---

# 20. LLM vs codice

Altro punto molto importante.

Il paper vede due fonti di “intelligenza procedurale”:

```
LLM
= flessibile
= generalizza
= stocastico
= poco interpretabile

Code
= deterministico
= interpretabile
= affidabile
= meno flessibile
```

La raccomandazione è usare codice per gli algoritmi generali dove serve struttura, e lasciare all’LLM le parti che richiedono flessibilità.

Questo è particolarmente rilevante per il tuo sistema:

```
LLM:
- strategia
- interpretazione
- decisione

Python/code:
- timeout
- parsing
- PTY handling
- retries
- state management
- validation
```

È esattamente il tipo di divisione che CoALA suggerisce.

---

# 21. Non tutto deve essere reasoning

Gli autori criticano implicitamente l’idea:

> “basta mettere un LLM che pensa meglio”.

Un agente deve invece essere progettato considerando:

1. memoria;
2. action space;
3. decision procedure.

Questa è una delle idee più forti del paper.

# 26. Un punto estremamente rilevante per il tuo Diagnostician

A pagina 18 il paper discute esplicitamente la domanda:

> se ho un proposer e un evaluator, sono due agenti o un solo agente?

Gli autori rispondono che dipende dal **coupling**.

Se:

```
Proposal module
+
Evaluation module
```

sono progettati specificamente per funzionare insieme e dipendono l’uno dall’altro, allora è più naturale considerarli **componenti dello stesso agente**.

Se invece sono moduli indipendenti e autonomamente utili, allora si può parlare di sistema multi-agent.

Questo è direttamente rilevante alla discussione che avevamo sul tuo:

```
Planner
Executor
Diagnostician
```

Non sei obbligato a chiamarli “tre agenti”.

Potresti descrivere l’intero sistema come:

> **un singolo cognitive language agent composto da moduli specializzati**.

Secondo CoALA è una descrizione perfettamente coerente.

---

# 27. Il caso del tuo terminale è addirittura menzionato

Il paper fa un esempio concettualmente quasi identico al tuo:

> eseguire codice in un ambiente interno può essere considerato reasoning interno, mentre eseguire codice su una macchina esterna, potenzialmente vulnerabile, è un’**external grounding action**.

Quindi nel tuo sistema:

```
LLM generates:
nmap -sV target

        ↓

interactive_terminal_exec

        ↓

remote Linux machine
```

è chiaramente:

> **digital external grounding**

secondo CoALA.

Questa citazione secondo me è ottima da usare nella tesi.

---

# 28. Cosa succede se gli LLM diventano molto più forti?(utile per dare valore alla mia architettura se ci pensi)

Gli autori si chiedono anche se modelli futuri possano rendere inutili alcune componenti.

Per esempio:

- context window enorme → meno bisogno di external memory;
- reasoning migliore → planning più lungo direttamente nel modello;
- self-evaluation migliore → meno critic esterni.

Ma il framework CoALA continuerebbe comunque a essere utile come modello concettuale per capire **quali funzioni cognitive vengono svolte**, anche se fossero tutte implementate dentro un singolo modello

# Large Language Model based Multi-Agents: A Survey of Progress and Challenges
Questo mi sembra un paper per definire bene delle cose che già ho riporto principalmte quello posso più che altro giustificare quanto ho fatto prendendo da queste letterature cose che ho già implementato

# 2. La tassonomia principale del paper

La survey analizza i sistemi LLM-MA attraverso **quattro dimensioni**:

```
1. Agents–Environment Interface
2. Agent Profiling
3. Agent Communication
4. Agent Capability Acquisition
```

La Figura 2 a pagina 4 visualizza bene questa struttura: il sistema multi-agent gestisce profiling, comunicazione, acquisizione delle capacità e orchestrazione, mentre gli agenti ricevono osservazioni dall’ambiente e producono azioni.

---

# 3. Agents–Environment Interface

La prima domanda è:

> **con cosa interagiscono gli agenti?**

Gli autori distinguono tre casi.

### Sandbox

Ambiente virtuale/simulato.

Esempi:

- interprete di codice;
- videogiochi;
- simulazioni;
- regole artificiali.

Per il tuo progetto, una macchina Linux vulnerabile isolata o una VM/container di test rientra molto naturalmente in questa categoria.

---

### Physical

Ambiente reale.

Esempio:

```
LLM agents
→ robots
→ physical world
```

Gli agenti devono osservare, agire e adattarsi iterativamente alle conseguenze fisiche delle azioni.

---

### None

Non esiste un vero ambiente esterno.

Esempio tipico:

```
Agent A
  ↕
Agent B
  ↕
Agent C

→ debate
→ consensus
```

Qui l’obiettivo è soprattutto far comunicare gli agenti tra loro.

Questo è interessante perché un **critic puramente interno**, che non interagisce con la macchina target, assomiglia maggiormente a questo tipo di componente.

---

# 4. Agent Profiling

Nei sistemi multi-agente i diversi agenti devono avere ruoli distinti.

Per esempio, nello sviluppo software:

```
Product Manager
Programmer
Tester
```

oppure in un debate:

```
Proponent
Opponent
Judge
```

Gli autori classificano i metodi per creare questi profili in tre categorie.

### Pre-defined

Il progettista definisce esplicitamente il ruolo:

```
You are the Planner...
You are the Executor...
You are the Diagnostician...
```

### Model-generated

È l'LLM stesso a creare nuovi profili.

### Data-derived

Il profilo viene ricavato da dataset esistenti.

Il tuo sistema, se usi ruoli definiti tramite system prompt, è quindi chiaramente **pre-defined profiling**.
# 5. Agent Communication

Questa è probabilmente la parte più importante del paper per la tua architettura.

Gli autori scompongono la comunicazione secondo tre dimensioni:

```
Communication Paradigm
Communication Structure
Communication Content
```

---

# 6. Communication paradigms

Esistono tre grandi paradigmi.

### Cooperative

Gli agenti condividono lo stesso obiettivo.

```
Planner
    ↓
Executor
    ↓
Verifier

all want:
complete task successfully
```

È il paradigma più vicino al tuo progetto.

---

### Debate

Gli agenti producono e criticano opinioni differenti.

```
Agent A: solution X
Agent B: solution Y
Agent C: critique
        ↓
      consensus
```

L'obiettivo è ottenere una soluzione migliore attraverso il confronto.

---

### Competitive

Gli agenti hanno obiettivi potenzialmente contrastanti.

Per esempio:

```
attacker agent
vs
defender agent
```

oppure giochi strategici.

---

# 7. Communication structure

La Figura 3 a pagina 4 è particolarmente utile.

Il paper identifica quattro strutture principali:

```
Layered
Decentralized
Centralized
Shared Message Pool
```

### Layered

Gerarchia:

```
Planner
   ↓
Executor
   ↓
Validator
```

Ogni livello comunica principalmente con quello vicino.

Per un sistema come il tuo probabilmente è la descrizione più naturale.

---

### Centralized

C'è un coordinatore centrale:

```
        Coordinator
       /     |      \
      A      B       C
```

Il coordinator assegna compiti e raccoglie risultati.

---

### Decentralized

```
A ↔ B
↕   ↕
C ↔ D
```

Gli agenti comunicano direttamente senza un controller centrale.

È molto comune nelle simulazioni sociali o robotiche.

---

### Shared Message Pool

MetaGPT usa un modello simile a:

```
       Shared Memory / Message Pool
       ↑       ↑       ↑
      A        B        C
```

Gli agenti pubblicano messaggi e ricevono soltanto quelli rilevanti per il proprio ruolo.

È concettualmente simile a un event bus.

---

# 8. Cosa comunicano gli agenti?

Principalmente testo.

Ma il contenuto dipende dal dominio.

Software development:

```
code
requirements
test results
```

Gaming:

```
beliefs
strategy
suspicions
```

Nel tuo caso potrebbe essere:

```
Planner → Executor:
"Enumerate HTTP on port 8080"

Executor → Planner:
"Found /admin and Apache version X"

Diagnostician → Planner:
"Previous assumption was unsupported;
prefer enumeration before exploitation"
```

molti parlano di improvement e self evolution o cose simili, l'idea ha senso e posso anche implementarla ma ciò potrebbe modificare troppo i test e le verifiche che devo fare quindi lo terrei come implementazione futura post tesi

BISOGNA VALUTARE ANCHE redundant actions questo ha senso immagino per ottenere uno step magari fa mille altri step prima senza un vero motivo 
