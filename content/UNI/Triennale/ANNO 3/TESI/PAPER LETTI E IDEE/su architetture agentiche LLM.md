# ReAct: Synergizing Reasoning and Acting in Language Models
## 1. Il problema da cui parte il paper

Prima di ReAct, due filoni venivano studiati quasi separatamente.

Il primo è il **reasoning**, soprattutto con Chain-of-Thought:

> domanda → ragionamento interno → risposta

Il problema è che il modello ragiona usando soltanto quello che ha nei pesi o nel contesto. Se parte da una premessa sbagliata, può continuare a costruire una catena perfettamente plausibile ma falsa. Gli autori evidenziano quindi due problemi: **hallucination** ed **error propagation**.

Il secondo filone è invece l’**acting**:

> osservazione → azione → osservazione → azione

Qui il modello può interagire con un ambiente, ma se non ragiona esplicitamente rischia di compiere azioni senza una strategia, dimenticare il goal o ripetere azioni inutili.

ReAct cerca quindi di prendere il meglio di entrambi.

IO ALLORA NON FACCIO PROPRIO REACT FACCIO UN MIX DI QUESTI DUE? 
# 2. L’idea di ReAct

La formulazione del paper è sorprendentemente semplice.

Normalmente un agente sceglie un’azione:

at∼π(at∣ct)a_t \sim \pi(a_t|c_t)

dove ctc_t è tutta la storia vista fino a quel momento.

ReAct estende lo spazio delle azioni aggiungendo anche il linguaggio:

A^=A∪L\hat A = A \cup L

dove:

- AA = azioni reali sull’ambiente;
- LL = linguaggio, cioè i **thought**.

Un **Thought** non modifica l’ambiente. Serve invece a modificare il contesto mentale dell’agente: pianificare, ricordare cosa è già successo, decidere il prossimo subgoal, reinterpretare un errore, ecc.

Quindi un ciclo tipico è:

```
Thought:
Devo trovare X e poi usarlo per fare Y.

Action:
search[X]

Observation:
...

Thought:
Ora so che X si trova in Z.
Devo cercare Z.

Action:
search[Z]

Observation:
...
```

Questa è praticamente la struttura che oggi si vede in tantissimi agenti LLM.

---

# 3. “Reason to act” e “act to reason”

Questa distinzione secondo me è la parte concettualmente più importante del paper.

ReAct funziona in entrambe le direzioni.

### Reason → Act

Il reasoning guida le azioni.

Ad esempio:

```
Thought:
Devo prima trovare il peppershaker,
poi portarlo nel drawer.
```

Il modello costruisce quindi un piano e sceglie le azioni coerentemente.

### Act → Reason

Le azioni permettono invece al modello di ottenere nuove informazioni dall’ambiente.

```
Action:
Search[Front Row]

Observation:
Could not find ...
```

A quel punto il modello può ragionare:

```
Thought:
La ricerca non ha funzionato.
Forse devo cercare "Front Row (software)".
```

È quindi un **closed loop**.

Il ragionamento influenza l’ambiente e l’ambiente influenza il ragionamento.
# 5. Che tipo di “Thought” genera ReAct?

Una cosa interessante è che gli autori non impongono un unico tipo di reasoning.

I thought possono servire a:

- decomporre il task;
- creare un piano;
- ricordare lo stato;
- interpretare un’osservazione;
- decidere il prossimo subgoal;
- usare conoscenza commonsense;
- correggere il piano;
- riformulare una ricerca.

Gli autori sottolineano esplicitamente questa flessibilità.

Per esempio:

```
Goal:
put a clean lettuce on the dining table

Thought:
To solve the task, I need to find and take a lettuce,
then clean it with sinkbasin,
then put it in diningtable.
```

Poi:

```
Thought:
First I need to find a lettuce.
A lettuce is more likely to appear in fridge,
diningtable, sinkbasin...
```

E dopo averla trovata:

```
Thought:
Now I find a lettuce.
Next, I need to take it.
```

È praticamente una forma rudimentale di **task decomposition + state tracking**.

---

# 6. Come viene implementato ReAct?

Questa è una cosa importante: nel paper originale **non costruiscono un sistema multi-agent complesso**.

Usano essenzialmente un LLM frozen, principalmente **PaLM-540B**, con few-shot prompting.

Gli forniscono alcuni esempi completi del tipo:

```
Question
Thought
Action
Observation
Thought
Action
Observation
...
Answer
```

e il modello impara in-context il pattern.

Quindi ReAct è prima di tutto un **prompting paradigm**, non una nuova architettura neurale
# 11. Perché ReAct + CoT funziona meglio

Gli autori quindi combinano i due.

### ReAct → CoT-SC

Provano ReAct.

Se ReAct non riesce a rispondere entro un certo numero di step:

```
fallback → CoT-SC
```

### CoT-SC → ReAct

Provano più reasoning CoT.

Se le risposte non sono abbastanza concordi:

```
fallback → ReAct
```

L’idea è:

```
CoT
    → sfrutta bene la conoscenza interna

ReAct
    → sfrutta bene la conoscenza esterna
```

I due metodi sono quindi complementari.
# 14. Esempio molto interessante del fallimento Act-only(UTILE PER QUANDO USAVO SOLO 30B CODER? CHE NON HA COT?)

Nell’appendice fanno vedere un task:

```
put a clean knife in countertop
```

Act-only trova correttamente il coltello:

```
take knife 1 from countertop 2
```

ma poi prova:

```
clean knife 1 with sinkbasin 1
```

senza essere andato al sink.

L’ambiente risponde:

```
Nothing happens.
```

Da lì il modello entra in un loop e continua a ripetere azioni sbagliate.

ReAct invece fa:

```
Thought:
Now I take a knife.
Next, I need to go to sinkbasin and clean it.

Action:
go to sinkbasin

Action:
clean knife

Thought:
Now I clean a knife.
Next I need to put it on countertop.
```

Qui si vede benissimo perché il reasoning funge da **state tracker / planner**.

# 16. Sparse reasoning

Un dettaglio molto interessante: gli autori non sostengono che l’agente debba “pensare” dopo ogni azione.

Per task di question answering usano reasoning piuttosto denso:

```
Thought
Action
Observation
Thought
Action
Observation
```

Per task con moltissime azioni come ALFWorld, invece, il reasoning può essere **sparse**.

Per esempio:

```
Thought: devo trovare il coltello

Action
Action
Action
Action

Thought: trovato il coltello,
ora devo pulirlo

Action
Action

Thought: ora devo posizionarlo
```

Il modello decide autonomamente quando produrre thought.

Questa idea secondo me è ancora molto attuale perché reasoning troppo frequente aumenta:

```
token
latenza
costo
possibilità di errori
```

senza necessariamente aiutare.

# 19. I limiti di ReAct

Il paper è abbastanza chiaro anche sui limiti.

Il primo è il **looping**.

Il modello può fare:

```
Thought X
Action Y
Observation negativa

Thought X
Action Y
Observation negativa

Thought X
Action Y
...
```

Il secondo è la dipendenza dalla qualità della retrieval.

Nel loro studio, il **23% degli errori di ReAct** deriva da risultati di ricerca non informativi.

Il terzo problema è il context window.

Tra:

```
Thought
Action
Observation
Thought
Action
Observation
...
```

la traiettoria può diventare enorme.

Gli autori lo indicano esplicitamente come limite: ambienti con grandi action spaces possono richiedere molti esempi e superare facilmente il limite di contesto.


# 21. Collegamento con il tuo progetto di tesi

Per il framework agentico di cybersecurity che stai sviluppando, questo paper è **direttamente pertinente**.

Il tuo ciclo è concettualmente qualcosa come:

```
Observation
↓
LLM reasoning
↓
Tool call / terminal command
↓
Terminal output
↓
LLM reasoning
↓
next command
```

cioè esattamente il principio ReAct.

Ad esempio:

```
Thought:
Il port scan mostra SSH e HTTP.
Prima analizzo HTTP.

Action:
nmap ...

Observation:
Apache 2.x...

Thought:
La versione potrebbe essere vulnerabile.
Controllo le directory esposte.

Action:
feroxbuster ...

Observation:
...
```

Quello che nel paper è:

```
Wikipedia API
ALFWorld
WebShop
```

nel tuo caso diventa:

```
Linux terminal
network tools
filesystem
target machine
```

Concettualmente l’ambiente cambia, ma il loop è lo stesso.

---

## Una distinzione molto importante per la tua tesi

Il paper mostra anche perché **un planner iniziale da solo non basta**.

Potresti avere:

```
Planner
   ↓
Piano completo
   ↓
Executor
```

ma appena l’ambiente restituisce qualcosa di inatteso, il piano può diventare obsoleto.

ReAct suggerisce invece:

```
Plan
↓
Action
↓
Observation
↓
Update plan
↓
Action
↓
Observation
↓
...
```

cioè **planning dinamico**, non soltanto planning iniziale.

Questo è probabilmente uno dei collegamenti teorici più forti che puoi usare per giustificare un workflow agentico adattivo


# Reflexion: language agents with verbal reinforcement learning
Certo. Questo paper è **“Reflexion: Language Agents with Verbal Reinforcement Learning”**, pubblicato a **NeurIPS 2023**. L’idea centrale è molto semplice ma importante: invece di migliorare un agente LLM aggiornando i pesi del modello, gli autori fanno sì che l’agente **rifletta verbalmente sui propri errori, memorizzi quella riflessione e la usi nei tentativi successivi**.

Rispetto al paper ReAct che hai appena visto, questo è praticamente il passo successivo.

carina come idea architetturale ma non fitta con la mia architettura se ci si pensa
# MetaGPT: Meta Programming for a Multi-Agent Collaborative Framework
più agenti che “chiacchierano” liberamente non bastano; per collaborare bene servono workflow strutturati, ruoli chiari e output standardizzati.
# 1. Il problema che vuole risolvere

Molti framework multi-agent precedenti facevano qualcosa tipo:

```
Agent A
   ↕
Agent B
   ↕
Agent C
```

e lasciavano che gli agenti comunicassero liberamente in linguaggio naturale.

Il problema è che questo porta facilmente a:

- perdita di informazioni;
- ambiguità;
- ripetizioni;
- conversazioni inutili;
- errori che si propagano da un agente all’altro;
- “cascading hallucinations”.

Gli autori lo dicono esplicitamente: concatenare ingenuamente più LLM può creare **inconsistenze logiche e allucinazioni a cascata**.

MetaGPT propone quindi di imitare non una conversazione generica tra persone, ma una **organizzazione umana strutturata**.

Per esempio una software company.

---

# 2. L’idea chiave: SOP

Una SOP è una procedura operativa standard.

In una software house reale non succede:

```
Programmatore:
"boh, iniziamo a scrivere codice?"

Architetto:
"ok"
```

Piuttosto:

```
Requirement Analysis
↓
System Design
↓
Task Decomposition
↓
Coding
↓
Testing
```

Ogni passaggio produce un artefatto preciso.

Gli autori sottolineano che le SOP aiutano a:

- decomporre il problema;
- coordinare i ruoli;
- definire responsabilità;
- standardizzare gli output intermedi.

MetaGPT codifica queste procedure direttamente nei prompt e nel workflow degli agenti.

NEL MIO CASO CI SONO EFFETTIVAMENTE ARTEFATTI MA TRA I DUE AGENTI GLI LLM PENSO NON CONTINO COME PLANNER ECC NON SONO AGENTI GIUSTO?

# 1. Il problema che vuole risolvere

Molti framework multi-agent precedenti facevano qualcosa tipo:

```
Agent A
   ↕
Agent B
   ↕
Agent C
```

e lasciavano che gli agenti comunicassero liberamente in linguaggio naturale.

Il problema è che questo porta facilmente a:

- perdita di informazioni;
- ambiguità;
- ripetizioni;
- conversazioni inutili;
- errori che si propagano da un agente all’altro;
- “cascading hallucinations”.

Gli autori lo dicono esplicitamente: concatenare ingenuamente più LLM può creare **inconsistenze logiche e allucinazioni a cascata**.

MetaGPT propone quindi di imitare non una conversazione generica tra persone, ma una **organizzazione umana strutturata**.

Per esempio una software company.

---

# 2. L’idea chiave: SOP

Una SOP è una procedura operativa standard.

In una software house reale non succede:

```
Programmatore:
"boh, iniziamo a scrivere codice?"

Architetto:
"ok"
```

Piuttosto:

```
Requirement Analysis
↓
System Design
↓
Task Decomposition
↓
Coding
↓
Testing
```

Ogni passaggio produce un artefatto preciso.

Gli autori sottolineano che le SOP aiutano a:

- decomporre il problema;
- coordinare i ruoli;
- definire responsabilità;
- standardizzare gli output intermedi.

MetaGPT codifica queste procedure direttamente nei prompt e nel workflow degli agenti.
# 4. Il workflow completo

Il flusso centrale è:

```
User requirement
↓
Product Manager
↓
PRD
↓
Architect
↓
System Design
↓
Project Manager
↓
Task decomposition
↓
Engineer
↓
Code
↓
QA Engineer
↓
Tests
↓
Final software
```

Questo è il cuore del paper.

Il Product Manager prende la richiesta dell’utente e produce un **Product Requirements Document**.

L’Architect trasforma quel documento in:

- file list;
- data structures;
- interface definitions;
- flow diagrams.

Il Project Manager trasforma il design in task concreti.

L’Engineer implementa.

Il QA Engineer genera test e controlla il risultato.

---

# 5. Perché gli output intermedi sono così importanti

Questa è probabilmente la contribution più importante del paper.

Gli agenti non si limitano a passarsi messaggi tipo:

```
"Il progetto dovrebbe avere una GUI."
```

Producono artefatti strutturati come:

```
PRD
System Design
Interface Definitions
File List
Task List
Tests
```

Gli autori sostengono che questi output riducono ambiguità e perdita di informazioni durante il passaggio tra agenti.

Quindi:

```
Natural language conversation
```

diventa:

```
Structured artifact handoff
```

Questo è un passaggio concettuale molto importante.
# 7. Structured communication

Il secondo elemento fondamentale è la comunicazione strutturata.

Gli autori fanno una critica diretta al normale dialogo tra agenti.

Il problema è simile al **telephone game**:

```
A dice qualcosa
↓
B interpreta
↓
C interpreta l'interpretazione
↓
D riceve qualcosa di distorto
```

MetaGPT evita questo usando:

```
schema
+
structured messages
```

Ogni ruolo deve produrre output secondo un formato definito.

Per esempio, l’Architect deve produrre:

```
System Interface Design
Sequence Flow Diagram
```

non un generico paragrafo.
# 19. Ma attenzione: non significa “più agenti = sempre meglio”(GIUSTIFICA LA MIA ARCHITETTURA CON 2 AGENTI E BASTA NEL COMPLESSO)

Il punto del paper non è:

```
more agents = better
```

È:

```
specialized roles
+
well-defined workflow
+
structured interfaces
=
better collaboration
```

Un gruppo di 10 agenti che parlano senza regole può essere peggiore di 3 agenti ben coordinati.

Ed è esattamente ciò che gli autori vogliono dimostrare con le SOP.

# 27. Il punto degli artefatti strutturati è probabilmente il più utile per te

Immagina:

```
Planner → Executor
```

Se il Planner manda:

```
"Try enumerating the web server."
```

è ambiguo.

Se invece manda:

```
Task:
HTTP enumeration

Target:
10.0.0.5:8080

Goals:
- identify framework
- enumerate directories
- inspect headers

Allowed tools:
- curl
- feroxbuster
```

hai uno **structured handoff**.

Il paper MetaGPT suggerisce esattamente che questa seconda forma riduce l’ambiguità e gli errori tra agenti.

# 29. Information overload(motivo per cui executor è ridotto all'osso)

Questa parte è particolarmente rilevante per il tuo progetto.

Se ogni agente riceve:

```
all terminal outputs
+
all reasoning
+
all messages
+
all history
```

la context window esplode.

MetaGPT evita questo filtrando i messaggi secondo il ruolo.

Nel tuo caso potresti avere:

```
Planner:
summary + findings

Executor:
current task + relevant observations

Diagnostician:
failed trajectory + expected goal

Reporter:
final evidence
```

anziché passare l’intero transcript a tutti.

# per le architetture viene anche citato coala che invece ho usato per un'idea generale sugli LLM ma posso anche citare per la parte architetturale
