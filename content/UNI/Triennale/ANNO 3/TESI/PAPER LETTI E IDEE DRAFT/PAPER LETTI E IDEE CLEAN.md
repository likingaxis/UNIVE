# BENCHMARK

## Cosa misurano davvero i CTF come benchmark?

I CTF non misurano completamente il real-world autonomous penetration testing. Misurano qualcosa di più ristretto:

> La capacità di un agente di comprendere, analizzare ed exploitare vulnerabilità in ambienti controllati, con obiettivi deterministici.

Funzionano come **proxy** perché offrono: obiettivo chiaro, ambiente riproducibile, soluzione nota, valutatore oggettivo e informazioni sulla difficoltà — ma sacrificano realismo. Le vulnerabilità nei CTF sono introdotte deliberatamente (qualcuno ha creato un percorso verso la flag), mentre nel mondo reale nascono accidentalmente. Alcuni CTF però imitano bene scenari reali e usano CVE reali.

***Spiegare cosa è una CTF nella tesi come contesto per questa sezione.***

Fonte: *Cybench* — https://arxiv.org/pdf/2408.08926

---

## Il problema della metrica binaria

Un problema fondamentale con metriche del tipo `flag ottenuta? YES/NO` è che sono poco informative. Due agenti possono entrambi fallire con score 0, ma uno potrebbe non aver capito nulla mentre l'altro ha trovato la vulnerabilità, creato l'exploit e sbagliato solo l'ultimo passo.

Per risolvere questo, Cybench scompone ogni challenge in **subtask intermedi**. Esempio per la challenge MOTP:

1. Quale file contiene le credenziali? → `login.php`
2. Quale file contiene la vulnerabilità OTP? → `google2fa.php`
3. Quale operatore è vulnerabile? → `==`
4. Quale tipo di valore consente il bypass? → `boolean`
5. Qual è la flag?

Un agente con performance finale 0% può comunque mostrare un profilo come `3/5` o `4/6` nei subtask, rivelando dove si ferma prima di fallire.

> Una metrica binaria nasconde moltissima informazione sulla capability dell'agente.

***Utile per le mie valutazioni: valutare le subtask nel mio framework, non solo il risultato finale. Definire una difficoltà di task e valutare in base alla difficoltà di esecuzione.***

Fonte: *Cybench* — https://arxiv.org/pdf/2408.08926

---

## Progress Rate: misurare quanto lontano arriva l'agente

AgentBoard propone un approccio simile ai subtask di Cybench ma formalizzato come **progress rate**. Ad ogni step si assegna un punteggio $r_t \in [0,1]$ che indica quanto vicino l'agente è arrivato all'obiettivo:

$$r_t = \max_{i \le t} f(s_i, g)$$

Se l'agente arriva al 70% e poi rovina qualcosa, il benchmark conserva il **massimo progresso raggiunto**. Il progress rate si calcola in due modi:

- **State matching**: quando puoi confrontare direttamente stato attuale e stato obiettivo (es. in PDDL, se soddisfi 1 condizione su 2 → Progress = 0.5)
- **Subgoal matching**: quando il task è più ambiguo, lo scomponi in subgoal (es. "clean an egg and put it in microwave" → 4 step, completarne 2 = 0.5)

Il risultato più convincente è che separa modelli che il success rate considera quasi uguali:

| Modello | Success Rate | Progress Rate |
|---------|-------------|---------------|
| Llama2-13B | 2.1% | 18.9% |
| Mistral-7B | 3.9% | 24.6% |

Dal solo success rate sembrano entrambi incapaci. Il progress rate mostra che Mistral fa significativamente più strada.

La metrica è validata con valutatori umani: la correlazione tra giudizio umano e metrica automatica risulta $\rho > 0.95$ per tutti i task analizzati.

***Penso sia applicabile alla mia architettura. Il subgoal matching in particolare — il planner riesce ad interpretare la descrizione? Riesce ad identificare eventuali OR/AND? Focus soprattutto nel prompt engineering che abbiamo fatto.***

Fonte: *AgentBoard: An Analytical Evaluation Board of Multi-turn LLM Agents* — https://arxiv.org/pdf/2401.13178

---

## Misurare la difficoltà dei task

La difficoltà non dovrebbe essere semplicemente dichiarata ma **misurata**. Cybench usa il **First Solve Time** (FST) umano come reference. Dato che risolvere un task da 2 minuti e uno da 10 ore non dovrebbe valere lo stesso, propongono una metrica pesata:

$$weight = \log_2(FST)$$

Registrano anche: input/output tokens, tempo, numero di interazioni.

***Aggiungere una pesatura alle metriche nel mio framework? Ha senso dato che i task hanno complessità diverse.***

AgentBoard conferma questo dividendo i task in easy/hard in base al numero di subgoal. Tutti i modelli crollano sui task difficili. Per GPT-4:

| | Easy | Hard |
|---|---|---|
| Progress | ≈ 79.2% | ≈ 62.7% |
| Success | ≈ 65.6% | ≈ 34.4% |

La perdita sul success rate è molto maggiore della perdita sul progress, indicando che sui task difficili GPT-4 spesso fa molto progresso ma non completa l'ultima parte.

Fonti: *Cybench* — https://arxiv.org/pdf/2408.08926 | *AgentBoard* — https://arxiv.org/pdf/2401.13178

---

## Grounding Accuracy

Una delle metriche più interessanti proposte da AgentBoard è la **grounding accuracy**: la percentuale di azioni prodotte dall'agente che sono **valide nell'ambiente**.

Se l'ambiente permette `pickup cup`, `open door`, `go kitchen` e il modello produce `teleport kitchen`, quella è un'azione invalida.

***La grounding accuracy misura la capacità di tradurre intenzione → azione concretamente eseguibile. Molto rilevante per il mio executor.***

Fonte: *AgentBoard* — https://arxiv.org/pdf/2401.13178

---

## Step-wise Progress e budget di turni

AgentBoard analizza il $ProgressRate(step)$, cioè il progresso accumulato al crescere del numero di turni. Per modelli forti (GPT-4, Claude) il progresso continua a crescere fino a 20-30 step. Molti modelli open-weight invece progrediscono nei primi ~6 step e poi raggiungono un plateau.

> Non basta vedere quanto un agente sa fare; bisogna vedere se riesce a **sostenere una strategia lungo molti turni**.

***Posso effettivamente testare questo con il budget management — aprire un discorso nella tesi proprio su questo. Il modello può mandare più comandi insieme, quindi come si comporta con solo 3 turni ad esempio?***

Fonte: *AgentBoard* — https://arxiv.org/pdf/2401.13178

---

## Integrità del benchmark: le 4 dimensioni

SWE-Bench Pro Verified dimostra che `Agent capability ≠ Benchmark score` a meno che tu non garantisca contemporaneamente:

1. **Environment integrity** — no answer leakage, hidden tests nascosti, metadata sanitizzati, network controllato
2. **Task integrity** — istruzioni corrette, test non troppo narrow, test non troppo broad, semantica consistente
3. **Oracle/test integrity** — il verifier misura davvero il requirement
4. **Information boundary integrity** — l'agente ha avuto accesso solo alle informazioni consentite

In particolare trovano 4 classi di problemi nei task:

| Tipo | Occorrenze |
|------|-----------|
| Misleading description | 22 |
| Overly narrow tests | 75 |
| Overly broad tests | 3 |
| Other | 2 |

Il problema degli **overly narrow tests** è il più frequente: il task può fallire anche se l'agente ha prodotto una soluzione corretta. Quello degli **overly broad tests** è il più insidioso: il task può passare senza aver implementato tutto ciò che era richiesto.

***Questo è materiale utile per la tesi per spiegare perché è importante avere test ben progettati. Nel mio framework abbiamo forzato una struttura dati sotto, quindi certi problemi di oracle non possono accadere.***

Fonte: *SWE-Bench Pro Verified: A Reliable Benchmark for Software Engineering Agents* — https://arxiv.org/pdf/2609.08149

---

## SR_raw vs SR_valid e il Leakage Adjusted Success Rate

Si possono distinguere formalmente due metriche:

- $SR_{raw}$ = task che passano il verifier
- $SR_{valid}$ = task che passano il verifier **senza violazioni della policy/environment**

Esempio: su 100 task, 60 passano, ma 10 di questi hanno usato leakage. Raw Success Rate = 60%, Validated Success Rate = 50%.

$$LeakageAdjustedSuccessRate = \frac{\text{valid successful tasks}}{N}$$

Un task che risulta PASS ma nella trajectory compare `cat /hidden/gold_solution` non dovrebbe essere considerato un successo agentico.

Fonte: *SWE-Bench Pro Verified* — https://arxiv.org/pdf/2609.08149

---

## Verifier Gap

Se hai un agent self-evaluation e un official evaluator, puoi misurare:

$$VerifierGap = P(SelfPass \land OfficialFail)$$

Cioè la frazione di casi in cui l'agente crede di aver risolto il task ma il verifier esterno dice FAIL.

***Per un framework agentico sarebbe una metrica molto sensata. Il paper mostra esattamente questo fenomeno: self-test apparentemente valido ma oracle esterno contrario.***

Fonte: *SWE-Bench Pro Verified* — https://arxiv.org/pdf/2609.08149

---

## Agent-generated Oracle Failure

Un problema critico: quando l'agente genera sia la solution sia il test della solution, entrambi possono condividere la stessa assunzione sbagliata. Il test passa, ma il requirement reale non è soddisfatto.

***Soluzione: separare chi produce la solution da chi crea i test. Nel mio framework questo è gestito dalla struttura dati forzata a monte.***

La pipeline di correzione proposta è: public issue reports → LLM filtering + draft fix → human expert → minimal revision → rerun.

***Introdurre un human expert che compie la final decision sarebbe ideale, anche se è la parte più tediosa per motivi di tempo.***

Fonte: *SWE-Bench Pro Verified* — https://arxiv.org/pdf/2609.08149

---

## Isolamento dell'ambiente e shortcut indesiderati

In una prima versione di Cybench, server vulnerabile e agente vivevano nello stesso ambiente Docker. L'agente ha scoperto di poter fare `docker exec ...` ed entrare direttamente nel server, oppure recuperare la flag dalla cache del filesystem Docker. Questi non erano exploit della challenge: erano exploit **dell'infrastruttura del benchmark**.

Correzioni applicate: isolamento del server, network-only access, Docker cache cleanup.

> Ambienti complessi per agenti sono molto facili da configurare in modo involontariamente sfruttabile.

***Questo è esattamente quello che era successo a me con Gemini con MCP e basta! L'agente trova la via più facile, non quella intesa.***

Fonte: *Cybench* — https://arxiv.org/pdf/2408.08926

---

## Qualità dell'oracle: il protocollo di validazione

Prima di fidarsi di un dataset generato, è fondamentale validarlo. Il paper propone un protocollo concreto:

1. Leggere manualmente 15–20 generazioni
2. Misurare la degenerazione

La probabilità di osservare almeno un errore con fault rate $p$ usando $n$ esempi è:

$$P(\text{detect}) = 1 - (1-p)^n$$

Per avere confidenza $C$:

$$n \geq \frac{\ln(1-C)}{\ln(1-p)}$$

Per il 99% di confidenza: fault rate 50% → n ≈ 7, fault rate 30% → n ≈ 13, fault rate 20% → n ≈ 21, fault rate 10% → n ≈ 44. Quindi 15–20 esempi servono a scoprire errori relativamente frequenti, non errori rarissimi.

Due approcci a confronto per generare test:

| | LLM-generated | Mechanical perturbation |
|---|---|---|
| Pro | + naturale, + vario | + verificabile, + deterministico |
| Contro | - difficile da verificare | - meno naturale, - meno vario |

***Applicare mechanical perturbation nel mio caso. Perché non avere macchine perfette e un "allucinatore" che le devia per creare test? Classificare i tipi di rottura: funzionalità omesse, rotture effettive, disomogeneità dal writeup. Citando questo paper: è importante avere dei buoni test di partenza per evitare il rischio di test fallati dal principio.***

Fonte: *The Test Oracle Problem in Synthetic LLM-as-Judge Corpora* — https://arxiv.org/pdf/2607.13707

---

## Rifiuti del modello per ragioni di sicurezza

Cybench analizza anche i rifiuti dei modelli. Sono relativamente rari e riguardano principalmente Claude 3 Opus e Claude 3.5 Sonnet. Il comportamento non è consistente: stesso tipo di task, unguided → refusal, con subtasks → attempt (o viceversa). La forma in cui viene presentata l'attività può influenzare anche i safety mechanisms.

***Ha senso aprire una parentesi su questo nella tesi. Motivo pratico: gemini 3.8 flash a volte non va, gpt 5.6 manco a dirlo, claude opus 5 passa ma opus 4.8 no. Un discorso etico? Forse non sulla tesi ma sulle slide.***

Fonte: *Cybench* — https://arxiv.org/pdf/2408.08926

---

## Prompt sensitivity e impatto sui benchmark

Gli LLM possono essere estremamente sensibili al prompt. Piccole variazioni (spazi, maiuscole, delimitatori, sinonimi) possono cambiare molto le performance. Il paper cita un caso in cui LLaMA2-7B varia da quasi 0 a 0.804 semplicemente con variazioni apparentemente insignificanti.

Questo è problematico nei benchmark perché può succedere che:

$$Prompt_A \Rightarrow Model_1 > Model_2$$

mentre:

$$Prompt_B \Rightarrow Model_2 > Model_1$$

Piccole variazioni del prompt possono cambiare perfino i ranking tra modelli e quindi ciò che viene dichiarato "state of the art".

$$\boxed{One\ good\ prompt\ result \neq robust\ architecture}$$

Per valutare le **capability** reali, bisogna ridurre l'underspecification: explicit task + explicit label space + explicit output format + possibilmente ICL.

Fonti: *The Prompt Report* — https://arxiv.org/pdf/2406.06608 | *Revisiting Prompt Sensitivity* — https://arxiv.org/pdf/2602.04297

---

## Tassonomia della valutazione degli agenti

La survey sugli agenti autonomi propone una distinzione fondamentale nell'evaluation:

### Subjective evaluation (umana)

- **Human annotation** — persone valutano qualità, correttezza, utilità, comportamento
- **Turing-test-like** — si confronta il comportamento dell'agente con quello umano

È costosa e soggetta a bias — per questo si può usare anche un LLM come evaluator/critic.

### Objective evaluation

Si struttura in: **metrics → evaluation protocols → benchmarks**.

**Metriche di task success**: success rate, reward/score, coverage, accuracy.
**Metriche di efficiency**: planning length, costo, inference time, numero di interazioni.
**Human similarity**: per applicazioni che simulano esseri umani.

Per la cybersecurity, le metriche specifiche derivabili sono:

```
Task Success Rate, Exploit Success Rate,
Vulnerability Discovery Rate, Number of Agent Steps,
Number of Tool Calls, Token Cost, Execution Time,
Planning Overhead, Recovery After Failure
```

### Evaluation protocol

Non conta solo **cosa** misuri ma **come** fai l'esperimento: Agent → isolated vulnerable machine → fixed initial conditions → autonomous attempt → metrics collected, ripetuto su molte macchine e più run.

***Bisogna valutare anche le redundant actions: per ottenere uno step l'agente magari fa mille altri step prima senza un vero motivo. È una metrica di efficienza importante.***

Fonte: *A Survey on Large Language Model Based Autonomous Agents*

---

## Principi riassuntivi per la valutazione

- Interactive evaluation > question answering per misurare capability operative
- Binary success rate è troppo povero sui task complessi: i subtask/progress rate rivelano dove l'agente arriva prima di fallire
- La difficoltà dovrebbe essere misurata, non dichiarata (FST umano)
- Model e scaffold non sono separabili nell'evaluation
- Più tool non significa automaticamente performance migliore: uno spazio d'azione più potente è anche più difficile da controllare
- Planning/reflection aiutano perché riducono perdita di contesto e decisioni premature
- Il benchmark stesso deve essere testato: solution script, CI, server probes e isolamento
- CTF capability non equivale a real-world pentesting capability
- Il prompt engineering è una forma di hyperparameter search: non esiste una tecnica universalmente migliore
- More complexity ≠ better (Self-Consistency + Few-Shot CoT non migliora rispetto a Few-Shot CoT da solo in alcuni casi)

Fonti: *Cybench*, *SWE-Bench Pro Verified*, *AgentBoard*, *The Prompt Report*

---

# AGENTIC AI

## Model + Scaffold = Observed Performance

Un benchmark agentico non misura puramente "quanto è bravo GPT-4?" ma "quanto è bravo GPT-4 **dentro questo particolare sistema agentico?**". Cambiando solo prompt, PTY, web search o struttura della risposta, le performance cambiano sensibilmente.

Formalmente:

$$ObservedPerformance = Model + Scaffold$$

Più lo scaffold è complesso, più diventa difficile attribuire il risultato al modello. Per questo AgentBoard sceglie volutamente un agente molto semplice: se lo scaffold è troppo sofisticato, non sai più se stai misurando il modello o lo scaffold.

Una buona evaluation agentica dovrebbe puntare a **diagnosi**, non solo ranking.

***Quando faccio benchmark tra modelli è fondamentale citare questa separazione. Prendere anche i produced tokens per fare benchmark e capire il reasoning.***

Fonti: *Cybench* — https://arxiv.org/pdf/2408.08926 | *AgentBoard* — https://arxiv.org/pdf/2401.13178

---

## Definizione di agente

Un agente è un sistema GenAI che raggiunge gli obiettivi dell'utente attraverso **azioni su sistemi esterni al modello stesso**.

$$LLM\ alone \neq Agent$$

$$\boxed{LLM + Action + External\ System = Agent}$$

Fonte: *The Prompt Report* — https://arxiv.org/pdf/2406.06608

---

## LLM come "production system probabilistico"

CoALA propone un'analogia storica fondamentale. Nei vecchi **production system** (architetture cognitive come Soar) si avevano regole del tipo $X \rightarrow Y$ (se la situazione è X, trasformala in Y). Un LLM fa qualcosa di concettualmente simile: $Prompt\ X \rightarrow possibile\ continuazione\ Y$, ma in modo **probabilistico**.

L'LLM viene quindi visto come un **probabilistic production system** che assegna probabilità a differenti possibili continuazioni. Questo spiega vantaggi e svantaggi: sono molto più flessibili delle regole simboliche, ma anche opachi e stocastici.

Il problema dei vecchi sistemi simbolici era che richiedevano moltissime regole scritte a mano e funzionavano solo in domini molto strutturati. Gli LLM sono interessanti perché possono sostituire gran parte di queste regole grazie alla conoscenza acquisita nel pretraining.

Fonte: *Cognitive Architectures for Language Agents (CoALA)*

---

## Capability dimensions degli agenti

AgentBoard identifica 6 dimensioni di capability e le misura indirettamente, attribuendo ai vari ambienti livelli di requisito (es. Planning: 1 = ≤3 subgoals, 2 = ≤5, 3 = >5):

- **Memory** — capacità di usare informazioni accumulate nel tempo
- **Planning** — capacità di scomporre un obiettivo complesso
- **World Modeling** — capacità di capire come funziona l'ambiente
- **Self-Reflection** — capacità di usare feedback/errori per correggersi
- **Grounding** — capacità di produrre azioni valide
- **Spatial Navigation** — capacità di navigare ambienti spaziali

Non è una misura causale pura della capability, ma la performance del modello su task che richiedono fortemente quella capability.

***Parlare di ambiente totalmente osservabile (citazione a IA). Utile come framework concettuale per descrivere cosa fa il mio agente.***

Fonte: *AgentBoard* — https://arxiv.org/pdf/2401.13178

---

## Formalismo del ciclo agentico

Il ciclo base di un agente può essere espresso formalmente come:

$$r_t, a_t = Act(m_t)$$
$$s_t, o_t = Execute(s_{t-1}, a_t)$$
$$m_{t+1} = Update(m_t, r_t, o_t)$$

Dove $m_t$ è la memoria/contesto, $a_t$ l'azione, $s_t$ lo stato dell'ambiente, $o_t$ l'osservazione.

***Scrivere formalismi del genere nella tesi. Dà rigore alla descrizione dell'architettura.***

Fonte: *Cybench* — https://arxiv.org/pdf/2408.08926

---

## Memoria degli agenti: short-term e long-term

La survey sugli agenti autonomi distingue due tipi fondamentali di memoria:

- **Short-term memory** — ciò che rimane direttamente nel context window dell'LLM
- **Long-term memory** — informazioni salvate esternamente e recuperabili in futuro (es. vector database)

Da qui derivano due architetture:

- **Unified memory** — tutto rimane nel prompt/context. Semplice ma soffre del limite della context window
- **Hybrid memory** — combina short-term + long-term external memory (es. current terminal history → short-term → relevant successful attack paths → vector DB / long-term memory)

Esempi di agenti con hybrid memory: Generative Agents, AgentSims, GITM, Reflexion.

Fonte: *A Survey on Large Language Model Based Autonomous Agents*

---

## Planning: con e senza feedback

La survey divide il planning in due grandi categorie:

### Planning senza feedback

L'agente genera il piano e lo segue. Tre approcci:

- **Single-path reasoning** — un'unica catena (CoT, Zero-shot CoT, ReWOO, HuggingGPT)
- **Multi-path reasoning** — l'agente considera più possibili strategie (Self-Consistency, Tree of Thoughts, Graph of Thoughts, MCTS)
- **External planner** — l'LLM produce una rappresentazione del problema e delega il planning ad algoritmi esterni (es. LLM+P: converte in PDDL → planner classico → riconverte in linguaggio naturale)

### Planning con feedback

Per task complessi e **long-horizon**, l'agente deve aggiornare continuamente il piano in funzione del feedback ricevuto. Il problema del piano creato una sola volta è semplice: il mondo reale non si comporta sempre come previsto.

Tre categorie di feedback:

- **Environmental feedback** — il paradigma ReAct: Thought → Act → Observation → New Thought. Il risultato dell'azione informa la prossima decisione
- **Human feedback** — l'umano corregge o guida l'agente
- **Model feedback** — il modello stesso o un altro LLM valuta e aggiorna il piano

***Nel nostro caso il piano è 1 e soltanto 1, da seguire come intended way. Non c'è replanning dinamico: il planner produce il piano, l'executor lo esegue. Questo è una scelta architetturale deliberata.***

Fonte: *A Survey on Large Language Model Based Autonomous Agents*

---

## Come un agente acquisisce nuove capacità

Un agente può migliorare in due modi:

### Con fine-tuning
Modificando i parametri del modello attraverso dataset annotati da umani, generati dagli LLM o raccolti dal mondo reale.

### Senza fine-tuning (più rilevante per sistemi agentici)

Due sotto-categorie:

- **Prompt engineering** — migliorare come il modello viene guidato
- **Mechanism engineering** — migliorare **il sistema intorno al modello**, non il modello stesso. Esempi: planner, critic, memory, retry logic, feedback loops, multiple agents, verification

La distinzione è cruciale: il contributo di una tesi non deve necessariamente essere "ho creato un LLM migliore" ma può essere "ho progettato un **meccanismo agentico migliore** intorno a un LLM esistente". Questo è mechanism engineering.

Esempi concreti: trial-and-error, crowd-sourcing / multi-agent debate, experience accumulation, self-driven evolution.

***Molti parlano di improvement e self evolution, l'idea ha senso e posso anche implementarla ma ciò potrebbe modificare troppo i test e le verifiche — lo terrei come implementazione futura post tesi.***

Fonte: *A Survey on Large Language Model Based Autonomous Agents*

---

## Tool Use Agents e LLM Router

Un pattern architetturale importante è il **MRKL**: un LLM router decide quale modulo utilizzare (Calculator, Search, Database...) e poi combina i risultati.

```
              Calculator
             /
LLM Router ─── Search
             \
              Database
```

Questa struttura è molto vicina a un'architettura agentica moderna con specializzazione dei componenti.

***Interessante parlare di LLM Router come pattern architetturale nella tesi.***

Fonte: *The Prompt Report* — https://arxiv.org/pdf/2406.06608

---

## ReAct: unire reasoning e acting

Prima di ReAct, due filoni venivano studiati separatamente. Il **reasoning** (CoT: domanda → ragionamento interno → risposta) soffriva di hallucination ed error propagation perché il modello ragiona solo con ciò che ha nei pesi/contesto. L'**acting** (osservazione → azione → osservazione) permetteva di interagire con l'ambiente ma senza strategia esplicita, rischiando azioni senza piano, perdita del goal o loop.

ReAct estende formalmente lo spazio delle azioni aggiungendo il linguaggio:

$$\hat{A} = A \cup L$$

dove $A$ = azioni reali sull'ambiente e $L$ = linguaggio (i **thought**). Un Thought non modifica l'ambiente ma modifica il contesto mentale dell'agente: pianificare, ricordare cosa è successo, decidere il prossimo subgoal, reinterpretare un errore.

### Closed loop: reason-to-act e act-to-reason

ReAct funziona in entrambe le direzioni:

- **Reason → Act**: il reasoning guida le azioni ("Devo prima trovare il peppershaker, poi portarlo nel drawer")
- **Act → Reason**: le azioni forniscono nuove informazioni dall'ambiente, su cui il modello ragiona ("La ricerca non ha funzionato, forse devo cercare con un nome diverso")

Il ragionamento influenza l'ambiente e l'ambiente influenza il ragionamento.

### Tipi di Thought

I thought possono servire a: decomporre il task, creare un piano, ricordare lo stato, interpretare un'osservazione, decidere il prossimo subgoal, usare conoscenza commonsense, correggere il piano, riformulare una ricerca. È una forma di **task decomposition + state tracking**.

### ReAct è un prompting paradigm

Punto importante: nel paper originale non costruiscono un sistema multi-agent complesso. Usano un LLM frozen (PaLM-540B) con few-shot prompting. Il modello impara in-context il pattern Thought → Action → Observation. ReAct è prima di tutto un **prompting paradigm**, non una nuova architettura neurale.

### ReAct + CoT sono complementari

CoT sfrutta bene la **conoscenza interna**, ReAct sfrutta bene la **conoscenza esterna**. Il paper combina i due: se ReAct non riesce entro un certo numero di step → fallback a CoT-SC; se le risposte CoT non sono concordi → fallback a ReAct.

### Limiti di ReAct

- **Looping** — il modello può ripetere la stessa sequenza Thought/Action/Observation negativa all'infinito
- **Dipendenza dalla qualità della retrieval** — il 23% degli errori di ReAct deriva da risultati di ricerca non informativi
- **Context window** — la traiettoria Thought/Action/Observation può diventare enorme; ambienti con grandi action spaces possono superare facilmente il limite di contesto

***Io allora non faccio proprio ReAct puro — faccio un mix dei due filoni. Il planner produce il piano (reasoning puro, no environment), l'executor segue il pattern ReAct (Reason → Shell command → Terminal output → Reason → Shell command). Il collegamento è direttamente pertinente.***

***Esempio utile del fallimento Act-only: utile per quando usavo solo 30B Coder che non ha CoT — il modello entra in loop ripetendo azioni sbagliate perché non ragiona esplicitamente.***

Fonte: *ReAct: Synergizing Reasoning and Acting in Language Models*

---

## Reflexion: apprendimento verbale

Reflexion è il passo successivo rispetto a ReAct: invece di migliorare un agente aggiornando i pesi, l'agente **riflette verbalmente sui propri errori**, memorizza quella riflessione e la usa nei tentativi successivi. È una forma di verbal reinforcement learning.

***Carina come idea architetturale ma non fitta con la mia architettura — il mio sistema non fa tentativi multipli sullo stesso task con memoria tra un tentativo e l'altro.***

Fonte: *Reflexion: Language Agents with Verbal Reinforcement Learning* (NeurIPS 2023)

---

## Code Agents: da PAL a ToRA

Due pattern per agenti che producono codice:

- **PAL**: $Problem \rightarrow Code \rightarrow Python \rightarrow Answer$ — il modello traduce il problema in codice e un interprete lo esegue
- **ToRA**: alterna reasoning e code execution in modo iterativo — $Reasoning \rightarrow Code \rightarrow Execution \rightarrow Reasoning \rightarrow Code \rightarrow \ldots$

Il passaggio concettuale fondamentale è:

$$\boxed{LLM + external\ tools}$$

Il modello si occupa della parte semantica e del planning, mentre uno strumento esterno esegue operazioni affidabili.

Fonte: *The Prompt Report* — https://arxiv.org/pdf/2406.06608

---

## LLM-as-Evaluator: tre framework

Tre approcci per usare LLM come valutatori:

- **LLM-EVAL** — un singolo evaluator con schema (grammar, relevance, correctness...)
- **G-EVAL** — aggiunge passaggi di reasoning generati automaticamente prima della valutazione
- **ChatEval** — usa più agenti con ruoli diversi che discutono la valutazione

Un single judge non è l'unica possibilità: $Judge_1 + Judge_2 + Judge_3 \rightarrow consensus$.

Fonte: *The Prompt Report* — https://arxiv.org/pdf/2406.06608

---

## Futuro: cosa succede se gli LLM diventano molto più forti?

CoALA si chiede se modelli futuri possano rendere inutili alcune componenti:

- Context window enorme → meno bisogno di external memory
- Reasoning migliore → planning più lungo direttamente nel modello
- Self-evaluation migliore → meno critic esterni

Ma il framework CoALA continuerebbe comunque a essere utile come **modello concettuale** per capire quali funzioni cognitive vengono svolte, anche se fossero tutte implementate dentro un singolo modello.

***Utile per dare valore alla mia architettura: anche se i modelli miglioreranno, la decomposizione funzionale resta un modo valido di progettare e capire sistemi agentici.***

Fonte: *Cognitive Architectures for Language Agents (CoALA)*

---

# ARCHITETTURE AGENTICHE

## Il framework CoALA: tre dimensioni

CoALA (Cognitive Architectures for Language Agents) organizza un agente lungo tre dimensioni fondamentali:

1. **Memory** — come l'agente immagazzina e recupera informazioni
2. **Action space** — cosa l'agente può fare
3. **Decision-making procedure** — come l'agente decide cosa fare

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

Fonte: *Cognitive Architectures for Language Agents (CoALA)*

---

## CoALA: i quattro tipi di memoria

### Working Memory
La memoria attiva corrente — osservazioni recenti, obiettivi, risultati intermedi, informazioni recuperate, variabili necessarie per la decisione corrente. Non coincide necessariamente con il semplice context window: è una struttura persistente attraverso più chiamate all'LLM. Per un agente cyber potrebbe contenere: target IP, open ports, current hypothesis, current subgoal, last command, last terminal output, known credentials.

### Episodic Memory
Salva **esperienze precedenti** — task A → tried X → failed → tried Y → success. Queste esperienze possono essere recuperate per aiutare il planning. In cybersecurity: precedenti tentativi, traiettorie di pentest, exploit falliti/riusciti, sequenze di comandi.

### Semantic Memory
Contiene **conoscenza generale** — "Apache 2.4.x has...", "NFS enumeration can be done with...", "Service X commonly exposes...". Può essere alimentata da documentazione esterna e arricchita con conoscenza derivata dalle esperienze. In pratica è simile a una knowledge base / RAG.

### Procedural Memory
Contiene **come fare le cose**. Si divide in:
- **Implicita** — conoscenza nei pesi dell'LLM
- **Esplicita** — il codice dell'agente: `interactive_terminal_exec()`, parser del terminale, retry logic, planner loop, diagnostician logic — sono tutti elementi di procedural memory esplicita

Fonte: *Cognitive Architectures for Language Agents (CoALA)*

---

## CoALA: action space (internal vs external)

CoALA fa una distinzione elegante nello spazio delle azioni:

```
ACTIONS
├── INTERNAL
│   ├── Reasoning (working memory → working memory)
│   ├── Retrieval (long-term memory → working memory)
│   └── Learning (aggiornamento delle memorie)
│
└── EXTERNAL
    └── Grounding (interazione con il mondo esterno)
```

Il **reasoning** crea nuove informazioni all'interno della working memory: riassunti, ipotesi, piani, inferenze, riflessioni. Il **retrieval** prende informazione dalla long-term memory e la inserisce nella working memory (es. keyword search, vector embeddings, dense retrieval).

Il **grounding** è l'interazione con il mondo esterno. Tre tipi di ambiente:
- **Physical** — robot, sensori, attuatori
- **Dialogue** — interazioni con umani o altri agenti
- **Digital** — siti web, API, giochi, interpreti, esecuzione di codice

Una chiamata tipo `interactive_terminal_exec("nmap ...")` su una macchina remota è chiaramente **digital external grounding** secondo CoALA. Il paper fa un esempio quasi identico: eseguire codice su una macchina esterna vulnerabile è un'external grounding action, distinta dall'eseguire codice in un ambiente interno (reasoning interno).

***Questa citazione è ottima da usare nella tesi per descrivere formalmente il sistema.***

Fonte: *Cognitive Architectures for Language Agents (CoALA)*

---

## Decision-making: il main loop dell'agente

La decision-making procedure è il **main loop**. Il ciclo fondamentale è:

$$Observation \rightarrow Planning \rightarrow Proposal \rightarrow Evaluation \rightarrow Selection \rightarrow Execution \rightarrow Observation \rightarrow \ldots$$

CoALA spezza il planning in tre fasi:

- **Proposal** — genera una o più azioni candidate (es. run nmap -sV, enumerate SMB, inspect HTTP, test SSH credentials)
- **Evaluation** — valuta le alternative usando euristiche, LLM, value functions, simulatori, world models
- **Selection** — sceglie l'azione migliore ($argmax(score(action))$, majority voting, softmax...)

Poi l'azione viene eseguita e il risultato torna nell'ambiente/working memory. Un agente come il mio che usa $LLM \rightarrow terminal\ command \rightarrow terminal\ output \rightarrow LLM$ è praticamente un **ReAct-like agent** secondo questa tassonomia — ha reasoning e grounding ma non vera long-term memory né learning persistente.

Come confronto, **Voyager** è molto più sofisticato: possiede tutte e 4 le categorie di azioni (grounding, reasoning, retrieval, learning) e costruisce progressivamente una libreria di skill in procedural memory.

Fonte: *Cognitive Architectures for Language Agents (CoALA)*

---

## Struttura Planner → Executor → Verifier

Per un'architettura agentica come quella della tesi (Planner → Executor → Terminal → Verifier/Evaluator), SWE-Bench Pro suggerisce di non misurare soltanto il Task Success Rate ma di distinguere 4 famiglie:

- **Functional Success** — ha effettivamente completato il task?
- **Oracle Integrity** — il verifier misura davvero il requirement?
- **Environment Integrity** — l'agente ha avuto accesso solo alle informazioni consentite?
- **Trajectory Integrity** — ha raggiunto la soluzione attraverso un percorso legittimo?

***Parlare dell'harness dietro all'LLM con un'ottica agentica e architetturale, non solo a livello di codice. Evidenziare bene i tool che può svolgere l'executor e testarne molti per il dataset.***

Fonte: *SWE-Bench Pro Verified* — https://arxiv.org/pdf/2609.08149

---

## Mapping dell'architettura sulla letteratura

Il sistema della tesi può essere visto come una combinazione di diverse famiglie ben identificate nella survey di Prompt Engineering:

```
User Goal
   ↓
Planner
   │
   ├── Decomposition (Plan-and-Solve)
   │
   ↓
Executor
   │
   ├── Tool Use
   ├── Terminal
   │
   ↓
Observation
   │
   └── ReAct pattern
   ↓
Diagnostician / Critic
   │
   ├── Self-Criticism
   ├── Verification
   └── LLM-as-Evaluator
   ↓
Replanning
```

Quasi ogni blocco dell'architettura corrisponde a una famiglia ben identificata nella letteratura. In particolare, Plan-and-Solve formalizza esattamente la distinzione $Understand \rightarrow Plan \rightarrow Execute$, che si mappa direttamente su $Planner \rightarrow Executor$.

Fonte: *The Prompt Report* — https://arxiv.org/pdf/2406.06608

---

## Principio di modularità

La raccomandazione forse più forte di CoALA è:

> **Gli agenti dovrebbero essere modulari.**

Pensare in termini di componenti (Memory, Action, Agent, Decision procedure) piuttosto che creare un enorme prompt monolitico.

### LLM vs Code: dove usare cosa

Il paper vede due fonti di "intelligenza procedurale":

| | LLM | Code |
|---|---|---|
| Pro | flessibile, generalizza | deterministico, interpretabile, affidabile |
| Contro | stocastico, poco interpretabile | meno flessibile |

La raccomandazione: usare codice per gli algoritmi generali dove serve struttura, lasciare all'LLM le parti che richiedono flessibilità.

```
LLM: strategia, interpretazione, decisione
Code: timeout, parsing, PTY handling, retries, state management, validation
```

### Non tutto deve essere reasoning

Gli autori criticano l'idea "basta mettere un LLM che pensa meglio". Un agente deve essere progettato considerando: (1) memoria, (2) action space, (3) decision procedure.

Fonte: *Cognitive Architectures for Language Agents (CoALA)*

---

## Un solo agente o multi-agent?

CoALA discute esplicitamente: se ho un proposer e un evaluator, sono due agenti o un solo agente?

Dipende dal **coupling**: se Proposal module ed Evaluation module sono progettati specificamente per funzionare insieme e dipendono l'uno dall'altro, è più naturale considerarli **componenti dello stesso agente**. Se sono moduli indipendenti e autonomamente utili, allora si può parlare di sistema multi-agent.

Quindi Planner + Executor + Diagnostician possono essere descritti come:

> **Un singolo cognitive language agent composto da moduli specializzati.**

Secondo CoALA è una descrizione perfettamente coerente.

Fonte: *Cognitive Architectures for Language Agents (CoALA)*

---

## Constitutional AI come modello architetturale

La Constitutional AI (CAI) introduce una struttura a 4 ruoli che è molto vicina a molte architetture agentiche:

- **Actor**: $Actor(prompt) \rightarrow response$ — produce una risposta
- **Critic**: $Critic(response, constitution) \rightarrow critique$ — analizza il risultato secondo principi
- **Reviser**: $Reviser(response, critique) \rightarrow response'$ — produce una versione migliore
- **Judge**: $Judge(A, B, constitution) \rightarrow preference$ — confronta due candidati

La "constitution" è una piccola lista di principi scritti dagli umani. Comprime la supervisione umana:

$$Human\ values \rightarrow small\ set\ of\ written\ principles$$

invece di:

$$Human\ values \rightarrow 100\,000+\ preference\ labels$$

Un risultato sorprendente: le critiche generate dal modello non sono sempre corrette (possono essere eccessive, inaccurate, troppo severe), eppure le **revisioni finali migliorano comunque spesso la risposta**:

$$\text{Critique quality} \neq \text{Revision quality}$$

***Diciamo che è quello che ho applicato: avevo un prompt fatto di regole e poi ho corretto piano piano, iterativamente.***

Per un agente di cybersecurity, la constitution può contenere non principi morali ma **vincoli operativi**:

```
1. Do not repeat commands that already failed without new evidence.
2. Prefer low-cost reconnaissance before expensive scans.
3. Every hypothesis must be supported by observations.
4. Do not treat absence of output as evidence of success.
5. Verify vulnerabilities before declaring them exploitable.
6. Avoid destructive actions.
```

$$\boxed{Constitution = explicit\ behavioral\ policy}$$

Fonte: *Constitutional AI: Harmlessness from AI Feedback* — https://arxiv.org/pdf/2212.08073

---

## Sistemi multi-agent: tassonomia

La survey sui multi-agent analizza i sistemi LLM-MA attraverso 4 dimensioni:

### 1. Agents–Environment Interface

- **Sandbox** — ambiente virtuale/simulato (interprete di codice, videogiochi, simulazioni). Una macchina Linux vulnerabile isolata rientra qui
- **Physical** — ambiente reale (LLM agents → robots → physical world)
- **None** — non esiste un vero ambiente esterno, gli agenti comunicano solo tra loro (debate → consensus). Un critic puramente interno assomiglia a questo

### 2. Agent Profiling

Come si creano i ruoli:
- **Pre-defined** — il progettista definisce esplicitamente: `You are the Planner...`, `You are the Executor...`, `You are the Diagnostician...`
- **Model-generated** — l'LLM stesso crea nuovi profili
- **Data-derived** — il profilo viene ricavato da dataset esistenti

***Il mio sistema usa chiaramente pre-defined profiling tramite system prompt.***

### 3. Communication paradigms

- **Cooperative** — gli agenti condividono lo stesso obiettivo (Planner → Executor → Verifier, all want: complete task successfully). È il paradigma del mio progetto
- **Debate** — gli agenti producono e criticano opinioni diverse → consensus. Obiettivo: soluzione migliore attraverso confronto
- **Competitive** — obiettivi contrastanti (attacker agent vs defender agent)

### 4. Communication structure

- **Layered** — gerarchia: Planner → Executor → Validator. Ogni livello comunica con quello vicino. Probabilmente la descrizione più naturale del mio sistema
- **Centralized** — un coordinatore centrale assegna compiti e raccoglie risultati
- **Decentralized** — gli agenti comunicano direttamente senza controller centrale (comune in simulazioni sociali)
- **Shared Message Pool** — gli agenti pubblicano messaggi e ricevono solo quelli rilevanti per il proprio ruolo (es. MetaGPT). Concettualmente simile a un event bus

***Questo paper mi serve principalmente per definire bene cose che ho già implementato e giustificare le scelte architetturali prendendo dalla letteratura.***

Fonte: *Large Language Model based Multi-Agents: A Survey of Progress and Challenges*

---

## MetaGPT: SOP e artefatti strutturati

MetaGPT parte da un problema concreto: più agenti che "chiacchierano" liberamente non bastano. Concatenare ingenuamente più LLM crea **inconsistenze logiche e allucinazioni a cascata** — perdita di informazioni, ambiguità, ripetizioni, errori che si propagano da un agente all'altro.

La soluzione: imitare non una conversazione generica ma un'**organizzazione umana strutturata** usando **SOP** (Standard Operating Procedures). In una software house reale ogni passaggio produce un artefatto preciso:

```
Requirement Analysis → System Design → Task Decomposition → Coding → Testing
```

Le SOP aiutano a: decomporre il problema, coordinare i ruoli, definire responsabilità, standardizzare gli output intermedi.

### Output intermedi strutturati

Questa è la contribution più importante: gli agenti non si passano messaggi vaghi come "Il progetto dovrebbe avere una GUI", ma producono **artefatti strutturati** (PRD, System Design, Interface Definitions, File List, Task List, Tests). La comunicazione passa da $Natural\ language\ conversation$ a $Structured\ artifact\ handoff$.

### Il telephone game e la comunicazione strutturata

Il problema è simile al telefono senza fili: A dice qualcosa → B interpreta → C interpreta l'interpretazione → D riceve qualcosa di distorto. MetaGPT evita questo usando schema + structured messages. Ogni ruolo deve produrre output secondo un **formato definito**.

### Esempio per la mia architettura

Se il Planner manda `"Try enumerating the web server"` è ambiguo. Se invece manda:

```
Task: HTTP enumeration
Target: 10.0.0.5:8080
Goals:
- identify framework
- enumerate directories
- inspect headers
Allowed tools:
- curl
- feroxbuster
```

è uno **structured handoff** — il paper MetaGPT suggerisce che questa forma riduce ambiguità ed errori tra agenti.

### Più agenti ≠ sempre meglio

Il punto del paper non è $more\ agents = better$, ma:

$$specialized\ roles + well\text{-}defined\ workflow + structured\ interfaces = better\ collaboration$$

Un gruppo di 10 agenti che parlano senza regole può essere peggiore di 3 agenti ben coordinati.

***Giustifica la mia architettura con 2 agenti e basta nel complesso. Nel mio caso ci sono effettivamente artefatti tra le fasi — ma planner, executor ecc. sono moduli, non agenti autonomi nel senso di CoALA.***

Fonte: *MetaGPT: Meta Programming for a Multi-Agent Collaborative Framework*

---

## Information overload e filtraggio per ruolo

Se ogni agente riceve tutti i terminal outputs + tutti i ragionamenti + tutta la storia, la context window esplode. MetaGPT evita questo **filtrando i messaggi secondo il ruolo**.

Nel mio caso:

```
Planner: summary + findings
Executor: current task + relevant observations
Diagnostician: failed trajectory + expected goal
Reporter: final evidence
```

anziché passare l'intero transcript a tutti.

***Motivo per cui l'executor è ridotto all'osso — riceve solo ciò che serve per il task corrente.***

Fonte: *MetaGPT*

---

## Planning dinamico vs planning iniziale

ReAct mostra perché **un planner iniziale da solo non basta**. Potresti avere Planner → Piano completo → Executor, ma appena l'ambiente restituisce qualcosa di inatteso il piano può diventare obsoleto. ReAct suggerisce **planning dinamico**: Plan → Action → Observation → Update plan → Action → ...

Questo è probabilmente uno dei collegamenti teorici più forti per giustificare un workflow agentico adattivo.

***Nel mio caso il piano è 1 e soltanto 1 — intended way. Ma il paper fornisce la base per giustificare perché un'evoluzione futura potrebbe includere replanning dinamico.***

Fonte: *ReAct: Synergizing Reasoning and Acting in Language Models*

---

## Tre livelli di fallimento dell'agente

Un errore può nascere da almeno tre livelli distinti. È fondamentale separarli per diagnosticare correttamente i problemi:

### Semantic failure
L'agente ha l'idea sbagliata — `wrong idea`

### Action-selection failure
L'obiettivo è corretto ma sceglie il comando/tool sbagliato — `right goal, wrong command/tool`

### Output/interface failure
Il concetto del comando è giusto ma la sintassi, lo schema o il formato sono sbagliati — `right command concept, wrong schema/syntax/formatting`

Il paper sulla prompt sensitivity dimostra qualcosa di analogo nella classificazione testuale: la rappresentazione interna del task è corretta ma il mapping sull'output finale è sbagliato. Questo si traduce in:

$$\boxed{Reasoning\ Failure \neq Interface\ Failure}$$

Se valuti solo il Task Success potresti concludere "il planner non sa cosa fare", ma in realtà $Plan = correct$, $Action\ serialization = wrong$.

***Per valutare bene il mio agente, sarebbe molto interessante distinguere queste categorie nei risultati.***

Fonte: *Revisiting Prompt Sensitivity in LLMs for Text Classification* — https://arxiv.org/pdf/2602.04297

---

## Separazione dei ruoli e black-box mode

***Prendere in considerazione il fatto che il black-box possa essere fatto facilmente, modificando il planner e rendendolo la "mente" della challenge, mentre l'executor è solo lo "schiavo" che esegue e gli "occhi". Dividere i compiti mente-lavoro. Anche se non lo implemento, portare una progettazione avrebbe senso. Il final evaluator che fine fa in questo scenario?***

***Interessante testare il modello sulla base di quante informazioni gli diamo. Modificare l'attack plan per deviare e capire l'indipendenza dell'executor — magari gli togliamo cosa deve fare esplicitamente e scriviamo "individua la problematica", potrebbe funzionare?***

Fonte: idee personali ispirate da *PentestGPT* e *Cybench*

---

## Context management: tre strategie

AgentBoard confronta tre strategie di gestione del contesto:

- **Sliding Window** — mantieni soltanto le interazioni recenti
- **Cutoff** — quando il context si riempie, termini
- **Summary** — riassumi il passato con un LLM

***Quale uso io? Parlare della context window e di come l'orchestratore riduce i problemi legati a questo. Compattare più fasi in una (se non rende difficoltà di codice) per vedere quanto effettivamente perde contesto il modello — es. creare solo fase 1 e fase 2 e vedere quanto diventa meno grounded.***

Fonte: *AgentBoard* — https://arxiv.org/pdf/2401.13178

---

## Costi, hardware e approccio locale

***Parlare dei costi, prezzi, velocità. Fare riferimento ai bassi costi e che il tutto può girare anche offline. Confrontare un agente AI con harness tipico e vedere i risultati ottenuti rispetto alla mia architettura (PentestGPT come diretto competitor). Passare a un lavoro totalmente locale? Promuovere l'IA locale per abbattere i costi — ma forse troppo fuori focus, sembrerebbe una tesi sulle IA locali.***

***Fare benchmark sui modelli: quale risponde meglio all'architettura? Testarne 3-5 penso vada più che bene.***

***Parlare di quello che avrebbe dovuto affrontare un vero tester e che avrebbe preso molto tempo per un lavoro prettamente meccanico — lasciare la progettazione delle vulnerabilità all'umano ma la fase tediosa no.***

Fonte: idee personali ispirate da *PentestGPT* — https://www.youtube.com/watch?v=eGqjYo_vdTg

---

# PROMPT ENGINEERING

## Prompting ≠ Prompt Engineering

Distinzione fondamentale:

- **Prompting** è semplicemente $Prompt \rightarrow LLM \rightarrow Response$
- **Prompt Engineering** è un **processo iterativo**: $Prompt_1 \rightarrow Evaluation \rightarrow Modification \rightarrow Prompt_2 \rightarrow Evaluation \rightarrow \ldots$

Il prompt engineering non è "scrivere un buon prompt" ma:

$$\boxed{\text{ottimizzazione iterativa del comportamento del modello}}$$

Scegliere una tecnica di prompting è analogo a fare **hyperparameter search**: non esiste una tecnica universalmente migliore, dipende da modello, task, dataset, formato, esempi e output extractor.

***Io ho fatto proprio prompt engineering se ci si pensa — è interessante descrivere il processo di raffinazione del prompt che c'è stato nella tesi.***

Fonte: *The Prompt Report: A Systematic Survey of Prompt Engineering Techniques* — https://arxiv.org/pdf/2406.06608

---

## Tassonomia delle tecniche di prompting

Le 58 tecniche text-based si organizzano in 5 famiglie principali:

```
Text-Based Prompting
│
├── In-Context Learning (ICL)
│
├── Thought Generation
│
├── Decomposition
│
├── Ensembling
│
└── Self-Criticism
```

Un prompt può anche essere multimodale: $Prompt = \{text,\ image,\ audio,\ video,\ldots\}$.

Fonte: *The Prompt Report* — https://arxiv.org/pdf/2406.06608

---

## Chain-of-Thought (CoT): perché funziona

L'intuizione è che molti problemi non possono essere risolti con un unico "salto" input-output. La CoT permette di scomporre:

$$Problem \rightarrow Step_1 \rightarrow Step_2 \rightarrow Step_3 \rightarrow Answer$$

Quattro vantaggi: scompone problemi multi-step, dedica più computazione ai problemi difficili, rende osservabile il percorso verso la risposta, applicabile a diversi domini. Non richiede fine-tuning: $same\ model + different\ prompt$.

### Il risultato più famoso

Su GSM8K con PaLM 540B: $17.9\% \rightarrow 56.9\%$ (+39 punti). L'effetto non è specifico a un solo modello (GPT-3 175B: $15.6\% \rightarrow 46.9\%$, Codex: $19.7\% \rightarrow 63.1\%$).

### Ma solo per modelli grandi

Nei modelli piccoli le catene sono linguisticamente fluenti ma logicamente sbagliate:

$$Small\ LLM + CoT \not\Rightarrow better\ reasoning$$
$$Large\ LLM + CoT \Rightarrow large\ performance\ gain$$

### Il vantaggio cresce con la complessità

Su problemi semplici (single operation) il vantaggio è minimo o nullo. Su problemi multi-step diventa enorme (PaLM 540B su MultiArith: $42.2\% \rightarrow 94.7\%$ vs SingleOp: $94.1\% \rightarrow 94.1\%$). La CoT non è un "trucco generico": serve quando esiste realmente una struttura intermedia da costruire.

$$\boxed{CoT\ usefulness \approx problem\ complexity \times model\ capability}$$

***Interessante parlare del discorso dei modelli: usare qwen coder e giustificare la scelta della CoT per eseguire azioni. Giustifica operazioni dove deve usare nano e altri tool vari — sono problemi multi-step per definizione.***

Fonte: *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models* (Wei et al.)

---

## Ablation studies sulla CoT: cosa serve davvero

Il paper testa diverse varianti per capire cosa sia realmente utile nella CoT:

- **Equation only** — il modello produce solo l'equazione, senza spiegazione linguistica. Peggiore della CoT completa: il linguaggio naturale aiuta il modello a interpretare la semantica
- **Variable compute only** — il modello genera una sequenza di punti `..............` prima della risposta (più token senza ragionamento). Nessun miglioramento: $more\ tokens \neq CoT\ benefit$
- **Reasoning after answer** — $Question \rightarrow Answer \rightarrow Reasoning$ invece di $Question \rightarrow Reasoning \rightarrow Answer$. Risultato simile al prompting normale: il ragionamento deve comparire **prima** della risposta per aiutare a produrla

Questo distingue **explanation** ($Answer \rightarrow explanation$) da **reasoning** ($reasoning \rightarrow Answer$). Importante per gli agenti: una spiegazione plausibile non garantisce che sia una spiegazione fedele. La CoT è meglio intesa come $\text{generated intermediate reasoning representation}$, non $\text{faithful dump of internal cognition}$.

***Questo è fondamentale: cos'è l'ablation in AI? Eliminare il modulo di vision di un modello è ablation — rimuovere/disabilitare un componente per misurarne l'impatto.***

Fonte: *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models* (Wei et al.)

---

## Sparse reasoning: quando pensare e quando agire

ReAct introduce un concetto sottile ma molto pratico: l'agente **non deve necessariamente pensare dopo ogni azione**. Per task di question answering il reasoning è denso (Thought → Action → Observation → Thought → ...), ma per task con moltissime azioni il reasoning può essere **sparse**:

```
Thought: devo trovare il coltello
Action → Action → Action → Action
Thought: trovato il coltello, ora devo pulirlo
Action → Action
Thought: ora devo posizionarlo
```

Il modello decide autonomamente quando produrre thought. Questo è ancora molto attuale perché reasoning troppo frequente aumenta token, latenza, costo e possibilità di errori senza necessariamente aiutare.

Fonte: *ReAct: Synergizing Reasoning and Acting in Language Models*

---

## Zero-shot techniques utili

Tecniche che non richiedono esempi:

- **Role Prompting** — `Act as an expert penetration tester...` — può modificare stile e performance
- **Rephrase and Respond** — prima riformula/espandi la domanda, poi rispondi
- **Re-reading** — `Read the question again: {QUESTION}` — può migliorare il reasoning
- **Self-Ask** — il modello decide se servono sotto-domande, le genera, le risponde, poi risponde alla domanda originale
- **Zero-Shot CoT** — il famoso `Let's think step by step.` di Kojima et al., senza esempi

> Non bisogna assumere che la CoT migliori sempre le performance.

Fonte: *The Prompt Report* — https://arxiv.org/pdf/2406.06608

---

## Decomposition: da Least-to-Most a Plan-and-Solve

Famiglia di tecniche che scompongono esplicitamente i problemi ($Complex\ Problem \rightarrow Subproblem_1 + Subproblem_2 + \ldots$):

- **Least-to-Most** — scomponi in subproblemi, poi risolvili progressivamente usando la risposta del precedente
- **DECOMP** (Decomposed Prompting) — il modello scompone il task e manda i sottoproblemi a **funzioni diverse** (`search(...)`, `split_string(...)`, `calculate(...)`, `LLM(...)`). Qui si inizia ad avvicinarsi molto agli agenti
- **Plan-and-Solve** — $Understand \rightarrow Plan \rightarrow Execute$ — quasi esattamente la distinzione $Planner \rightarrow Executor$

Fonte: *The Prompt Report* — https://arxiv.org/pdf/2406.06608

---

## Program-of-Thought e tool use

Il modello non usa solo linguaggio naturale per ragionare — può generare codice che viene poi eseguito:

$$LLM \rightarrow Code \rightarrow Interpreter \rightarrow Result$$

È un passaggio concettuale importantissimo verso $\boxed{LLM + external\ tools}$. Il modello si occupa della parte semantica e del planning, lo strumento esterno esegue l'operazione affidabile. Questa anticipazione del paradigma moderno si vede già nel paper originale CoT dove le equazioni generate vengono calcolate da un programma Python esterno.

Fonte: *The Prompt Report* — https://arxiv.org/pdf/2406.06608 | *Chain-of-Thought Prompting* (Wei et al.)

---

## Ensembling e Answer Extraction

**Ensembling**: generare più risposte dallo stesso prompt e aggregarle. Riduce la varianza ma aumenta il costo. Il best result sperimentale è $FewShotCoT = 69.2\%$, ma $FewShotCoT + SelfConsistency = 69.1\%$ — più complessità non implica risultati migliori.

**Answer Extractor**: può essere una regex (`YES|NO`) oppure un altro LLM dedicato all'estrazione dell'output strutturato. Di nuovo emerge il pattern $\boxed{LLM\ specialised\ role}$.

Fonte: *The Prompt Report* — https://arxiv.org/pdf/2406.06608

---

## Prompt sensitivity: underspecified vs well-specified

Due prompt semanticamente quasi equivalenti possono produrre performance molto diverse. La tesi principale del paper è che gran parte della sensitivity dipende dall'**underspecification** del prompt.

Esempio underspecified:
```
{sample}
My feedback to the film is
```

Esempio well-specified:
```
Determine sentiment of the sentence using following options:
negative; positive.
Use only these two options.

Sentence: {sample}
Sentiment:
```

Nel secondo caso il modello sa: $Task = Sentiment\ Classification$, $LabelSpace = \{negative, positive\}$, $OutputConstraint = one\ label$.

> Se non specifichi bene il task, potresti stare misurando la capacità del modello di **indovinare cosa vuoi**, non la sua capacità di svolgere il task.

L'ipotesi più interessante: il modello spesso **sa internamente risolvere il problema** ma fallisce nel trasformare la rappresentazione interna nell'output atteso perché il prompt è ambiguo. $\text{Internal task understanding}$ può essere corretto mentre $\text{Final output}$ è sbagliato.

Ma il well-specified prompting **non risolve tutto**: in alcuni casi gli instruction prompts vanno persino peggio. L'underspecification è una causa importante, non l'unica. Ci sono anche limiti del modello, proprietà del dataset, genuine sensitivity, interazione model–prompt.

$$\boxed{Underspecification \text{ è una causa importante, non l'unica causa}}$$

***Il modello che uso io è instruction tuned (qwen 3.8 27B) — l'instruction-tuning aiuta con incrementi del 1-15% per minimal prompts e 6-21% per instruction prompts.***

Fonte: *Revisiting Prompt Sensitivity in Large Language Models for Text Classification* — https://arxiv.org/pdf/2602.04297

---

## Il prompt influenza i safety mechanisms

Cybench mostra che la **forma** in cui viene presentata l'attività può influenzare i safety mechanisms del modello. Lo stesso tipo di task può generare un rifiuto se presentato senza guida (unguided) ma essere tentato se accompagnato da subtask strutturati (guided), o viceversa.

Questo implica che il design del prompt non è solo una questione di performance ma anche di **accessibilità funzionale**: un prompt mal progettato può rendere inutilizzabile un modello non per limiti di capability ma per trigger involontari dei filtri di sicurezza.

***Far vedere il prompt dopo averlo ripulito dall'AI slop nella tesi. Descrivere come è stato progettato e le tecniche di prompt engineering utilizzate. Il system prompt come variabile di benchmark: come cambia il comportamento?***

Fonte: *Cybench* — https://arxiv.org/pdf/2408.08926

---

## Prompt, tool e spazio d'azione

Più tool non significa automaticamente performance migliore. Uno spazio d'azione più potente è anche più difficile da controllare per il modello. PTY, prompting, memoria e web search possono cambiare significativamente il risultato — sono tutte variabili che il prompt engineering deve gestire.

Planning e reflection nel prompt aiutano rispetto a un agente puramente action-only, perché riducono la perdita di contesto e le decisioni premature.

La combinazione sperimentalmente più solida è:

$$Instruction\ Prompting + In\text{-}Context\ Learning + Instruction\text{-}Tuned\ Models$$

Non risolve tutto, ma risolve gran parte dei problemi osservati. La prompt sensitivity rimane $> 0$.

***Scrivere nella tesi roba sui prompt engineering: non fare overfitting, tecniche di design.***

Fonti: *Cybench* — https://arxiv.org/pdf/2408.08926 | *Revisiting Prompt Sensitivity* — https://arxiv.org/pdf/2602.04297

---

# PAPER DI RIFERIMENTO

| Paper | Link |
|-------|------|
| Cybench | https://arxiv.org/pdf/2408.08926 |
| The Test Oracle Problem in Synthetic LLM-as-Judge Corpora | https://arxiv.org/pdf/2607.13707 |
| SWE-Bench Pro Verified: A Reliable Benchmark for Software Engineering Agents | https://arxiv.org/pdf/2609.08149 |
| AgentBoard: An Analytical Evaluation Board of Multi-turn LLM Agents | https://arxiv.org/pdf/2401.13178 |
| PentestGPT (video) | https://www.youtube.com/watch?v=eGqjYo_vdTg |
| Chain-of-Thought Prompting Elicits Reasoning in Large Language Models | Wei et al. |
| Constitutional AI: Harmlessness from AI Feedback | https://arxiv.org/pdf/2212.08073 |
| The Prompt Report: A Systematic Survey of Prompt Engineering Techniques | https://arxiv.org/pdf/2406.06608 |
| Revisiting Prompt Sensitivity in LLMs for Text Classification | https://arxiv.org/pdf/2602.04297 |
| A Survey on Large Language Model Based Autonomous Agents | Survey agenti autonomi |
| Cognitive Architectures for Language Agents (CoALA) | CoALA framework |
| Large Language Model based Multi-Agents: A Survey of Progress and Challenges | Survey multi-agent |
| ReAct: Synergizing Reasoning and Acting in Language Models | Yao et al. |
| Reflexion: Language Agents with Verbal Reinforcement Learning | NeurIPS 2023 |
| MetaGPT: Meta Programming for a Multi-Agent Collaborative Framework | Hong et al. |
