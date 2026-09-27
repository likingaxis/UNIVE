# Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
<mark style="background:#b1ffff">interessante parlare del discorso dei modelli parlando di qwen coder e invece giustificare la scelta della CoT per eseguire azioni</mark>
# Perché dovrebbe funzionare?

L'intuizione degli autori è che molti problemi non possono essere risolti bene con un unico “salto” input-output.

Un problema complesso può invece essere scomposto:

Problem→Step1→Step2→Step3→AnswerProblem \rightarrow Step_1 \rightarrow Step_2 \rightarrow Step_3 \rightarrow Answer

Questo permette al modello di affrontare separatamente i vari sottoproblemi.

Gli autori individuano quattro vantaggi principali. La CoT permette di scomporre problemi multi-step, consente di dedicare più computazione tramite token intermedi ai problemi più difficili, rende almeno parzialmente osservabile il percorso che porta alla risposta e può essere applicata a diversi domini come matematica, commonsense e ragionamento simbolico. Inoltre, non richiede necessariamente fine-tuning: basta inserire esempi di ragionamento nel prompt.

Quest'ultimo punto è particolarmente importante.

Non fanno:

training→nuovo modello\text{training} \rightarrow \text{nuovo modello}

ma semplicemente:

same model+different prompt\text{same model} + \text{different prompt}

---

# 1. Esperimenti sul ragionamento matematico

La prima parte importante del paper riguarda i **math word problems**.

Vengono utilizzati cinque benchmark:

- **GSM8K**
- **SVAMP**
- **ASDiv**
- **AQuA**
- **MAWPS**

Il confronto principale è:

Standard PromptingvsChain-of-ThoughtStandard\ Prompting \quad vs \quad Chain\text{-}of\text{-}Thought

Il setup CoT utilizza tipicamente **8 esempi few-shot** scritti manualmente dagli autori.

---

# Il risultato più famoso del paper

Su **GSM8K**, con PaLM 540B:

|Metodo|Accuracy|
|---|---|
|Standard prompting|17.9%|
|Chain-of-Thought|**56.9%**|

Quindi:

17.9%→56.9%17.9\% \rightarrow 56.9\%

un aumento di **39 punti percentuali**.

Anche GPT-3 175B mostra un miglioramento molto grande:

15.6%→46.9%15.6\% \rightarrow 46.9\%

mentre Codex passa:

19.7%→63.1%19.7\% \rightarrow 63.1\%

Quindi l'effetto non è specifico a un solo modello.


Gli autori osservano che nei modelli piccoli le catene possono essere linguisticamente fluenti ma logicamente sbagliate.

In forma intuitiva:

Small LLM+CoT⇏betterreasoning\text{Small LLM} + CoT \not\Rightarrow better reasoning

ma:

Large LLM+CoT⇒largeperformancegain\text{Large LLM} + CoT \Rightarrow large performance gain

---

# 3. Il vantaggio cresce con la complessità del problema(Giustifica OPERAZIONI DOVE DEVE USARE NANO E ALTRI TOOL VARI)

Un altro risultato molto interessante è che la CoT aiuta soprattutto quando il problema richiede **più passaggi**.

Gli autori mostrano che nei problemi molto semplici, ad esempio quelli con una sola operazione, il vantaggio è minimo o nullo. Nei problemi multi-step, invece, il vantaggio diventa enorme.

Per esempio, nel subset **MultiArith** di MAWPS:

PaLM 540B:

42.2%→94.7%42.2\% \rightarrow 94.7\%

mentre sul più semplice **SingleOp**:

94.1%→94.1%94.1\% \rightarrow 94.1\%

Questo è un risultato importante perché suggerisce che il CoT non è semplicemente un “trucco per migliorare qualunque risposta”.

Serve soprattutto quando esiste realmente una struttura intermedia da costruire.

# 4. Perché funziona? Le ablation studies

Questa è una delle parti migliori del paper.

Gli autori cercano di capire **cosa sia realmente utile nella Chain-of-Thought**.

Provano diverse varianti.

### Equation only

Il modello produce soltanto l'equazione:

5+2×3=115 + 2 \times 3 = 11

senza spiegazione linguistica.

Il risultato è peggiore della CoT completa, soprattutto su problemi semanticamente difficili come GSM8K. Gli autori concludono che non basta produrre un’equazione: il linguaggio naturale aiuta il modello a interpretare la semantica del problema.

---

### Variable compute only

Potrebbe esserci una spiegazione banale:

> forse la CoT funziona semplicemente perché il modello genera più token.

Gli autori testano quindi una variante in cui il modello produce una sequenza di punti:

```
..............
```

prima della risposta, ottenendo quindi più “tempo computazionale” senza vero ragionamento.

Risultato: praticamente nessun miglioramento.

Quindi:

more tokens≠CoT benefit\text{more tokens} \neq \text{CoT benefit}

La struttura semantica degli step intermedi sembra essere importante.

---

### Reasoning after answer

Provano anche:

Question→Answer→ReasoningQuestion \rightarrow Answer \rightarrow Reasoning

invece di:

Question→Reasoning→AnswerQuestion \rightarrow Reasoning \rightarrow Answer

Il risultato è simile al prompting normale.

Questo indica che il ragionamento non è utile soltanto come “spiegazione” dell’output: deve comparire **prima** della risposta per aiutare a produrla.

Questo esperimento è particolarmente importante.

Distingue:

**explanation**

Answer→explanationAnswer \rightarrow explanation

da

**reasoning**

reasoning→Answerreasoning \rightarrow Answer

---

# 5. Commonsense reasoning

Gli autori verificano poi se il metodo funziona anche al di fuori della matematica.

Usano:

- **CommonsenseQA**
- **StrategyQA**
- **Date Understanding**
- **Sports Understanding**
- **SayCan**

Anche qui i modelli grandi migliorano.

Per PaLM 540B:

|Benchmark|Standard|CoT|
|---|---|---|
|CSQA|78.1|79.9|
|StrategyQA|68.6|77.8|
|Date|49.0|65.3|
|Sports|80.5|95.4|
|SayCan|80.8|91.7|

Si vede però anche qualcosa di importante:

**non tutti i task migliorano allo stesso modo.**

Su CSQA, per esempio, il miglioramento è piccolo.
# 10. Tool use: aggiungere una calcolatrice

Gli autori fanno anche un esperimento molto interessante.

Prendono le equazioni generate dal modello e le fanno calcolare da un programma Python esterno.

Quindi:

LLM→reasoning/equationsLLM \rightarrow reasoning/equations

e poi:

Calculator→computationCalculator \rightarrow computation

Questo migliora ulteriormente le prestazioni.

Concettualmente è un'anticipazione importante del paradigma moderno:

LLM+toolsLLM + tools

Il modello si occupa della parte semantica e del planning, mentre uno strumento esterno esegue un'operazione affidabile.

Per il tuo progetto di tesi questo collegamento è particolarmente interessante:

```
LLM reasoning
      ↓
tool invocation
      ↓
environment result
      ↓
LLM reasoning
```

È molto vicino a ciò che poi faranno architetture come **ReAct**

# 11. Chain-of-Thought NON significa necessariamente vero ragionamento interno

Gli autori sono prudenti su questo punto.

Il fatto che il modello produca:

```
Step 1
Step 2
Step 3
Answer
```

non significa automaticamente che stiamo osservando il vero processo computazionale interno della rete.

Scrivono esplicitamente che la CoT emula un processo di ragionamento umano, ma non dimostra che la rete stia realmente “ragionando” nello stesso senso.

Quindi è meglio pensare alla CoT come a:

generated intermediate reasoning representation\text{generated intermediate reasoning representation}

e non necessariamente:

faithful dump of internal cognition\text{faithful dump of internal cognition}

Questo è importante anche quando analizzi agenti: una spiegazione plausibile non garantisce che sia una spiegazione fedele.

---

# 12. Quando conviene usare Chain-of-Thought?

Nell'appendice gli autori danno una risposta molto pratica.

Secondo loro funziona particolarmente bene quando:

1. il problema è difficile;
2. richiede ragionamento multi-step;
3. viene utilizzato un modello sufficientemente grande;
4. il prompting standard ha prestazioni relativamente basse o una scaling curve piatta.

In altre parole:

CoT usefulness≈problem complexity×model capability\boxed{ CoT\ usefulness \approx problem\ complexity \times model\ capability }

# Constitutional AI: Harmlessness from AI Feedback
# 2. Che cosa significa “Constitutional AI”

La “constitution” è semplicemente una piccola lista di principi scritti dagli esseri umani.

Esempi concettuali:

```
Do not assist with illegal activity.

Avoid harmful, racist, sexist or dangerous content.

Prefer responses that are helpful, honest and harmless.

Avoid being excessively preachy or accusatory.
```

La supervisione umana viene quindi compressa in qualcosa come:

\[ Human\ values \rightarrow small\ set\ of\ written\ principles \]

invece di:

\[ Human\ values \rightarrow 100\,000+\ preference\ labels \]

Gli autori descrivono infatti la CAI come una forma estrema di **scaled supervision**: gli esseri umani definiscono i principi, mentre gli AI aiutano a scalare l'applicazione di quei principi.
# 3. L'architettura generale(DICIAMO CHE È QUELLO CHE HO APPLICATO? AVEVO UN PROMPT MOLTO FATTO DA REGOLE E POI HO CORRETTO PIANO PIANO)

Il diagramma più importante è **Figura 1, pagina 2**.

Il metodo è diviso in **due fasi**:

```
1. Supervised Constitutional AI
2. Reinforcement Learning from AI Feedback
```

Più precisamente:

\[ \boxed{ Critique \rightarrow Revision \rightarrow Supervised\ Learning \rightarrow AI\ Preferences \rightarrow Preference\ Model \rightarrow RL } \]

La prima fase serve a portare il modello verso una distribuzione di risposte più sicure.

La seconda fase raffina il comportamento tramite reinforcement learning.

# 8. Una critica importante: il critic può sbagliare

Gli autori osservano anche che le critiche generate dal modello non sono sempre corrette.

A volte sono:

- eccessive;
- inaccurate;
- troppo severe;
- basate su problemi che non esistono realmente.

Eppure, sorprendentemente, le **revisioni finali migliorano comunque spesso la risposta**. 2212.08073v1

Questa distinzione è molto interessante:

\[ \text{Critique quality} \neq \text{Revision quality} \]

Un critic può quindi non essere perfettamente interpretabile o accurato, ma può comunque essere utile come segnale intermedio.

---

# 9. Fase 2: Reinforcement Learning from AI Feedback

Questa è la parte più innovativa.

Nel RLHF classico:

\[ Human \rightarrow A > B \]

Nella CAI:

\[ AI \rightarrow A > B \]

Ovvero il modello stesso giudica quale risposta sia migliore.

Gli autori chiamano questo:

\[ \boxed{RLAIF} \]

**Reinforcement Learning from AI Feedback**.

2212.08073v1

Per il tuo progetto, secondo me il modo più interessante di leggere questo paper è attraverso tre ruoli.

### Actor

Produce una risposta:

\[ Actor(prompt) \rightarrow response \]

### Critic

Analizza il risultato secondo una serie di principi:

\[ Critic(response,constitution) \rightarrow critique \]

### Reviser

Produce una versione migliore:

\[ Reviser(response,critique) \rightarrow response' \]

### Judge

Confronta due candidate:

\[ Judge(A,B,constitution) \rightarrow preference \]

Questa struttura è estremamente vicina a molte architetture agentiche moderne.

---

# 25. Collegamento diretto con il tuo workflow

Per un agente di cybersecurity potresti avere qualcosa del tipo:

```
Planner
   ↓
Action
   ↓
Observation
   ↓
Critic
   ↓
Revision / New Plan
```

La constitution potrebbe contenere non necessariamente principi morali, ma anche **vincoli operativi**.

Per esempio:

```
1. Do not repeat commands that already failed without new evidence.
2. Prefer low-cost reconnaissance before expensive scans.
3. Every hypothesis must be supported by observations.
4. Do not treat absence of output as evidence of success.
5. Verify vulnerabilities before declaring them exploitable.
6. Avoid destructive actions.
```

Quindi la stessa idea della CAI diventa:

\[ \boxed{ Constitution = explicit behavioral policy } \]

Il critic valuta il comportamento dell'agente rispetto a queste regole.

# The Prompt Report: A Systematic Survey of Prompt Engineering Techniques
<mark style="background:#b1ffff">cosa si intende per ablation in ai</mark>
<mark style="background:#b1ffff">eliminare il modulo di vision di un modello è ablation?</mark>

==Sì==, **eliminare il modulo di vision da un modello multimodale è a tutti gli effetti un ablation study**.

Gli autori danno una definizione molto generale:

> Un prompt è un input fornito a un sistema di Generative AI per guidarne l'output.

Non deve necessariamente essere testo.

Può essere:

\[ Prompt = \{text,\ image,\ audio,\ video,\ldots\} \]

# 4. Prompting ≠ Prompt Engineering

Questa distinzione è utile.

## Prompting

È semplicemente:

\[ Prompt \rightarrow LLM \rightarrow Response \]

## Prompt Engineering

È invece un **processo iterativo**:

\[ Prompt_1 \rightarrow Evaluation \rightarrow Modification \rightarrow Prompt_2 \rightarrow Evaluation \rightarrow \ldots \]

La **Figura 1.4 a pagina 7** rappresenta proprio questo ciclo:

<mark style="background:#b1ffff">io ho fatto proprio prompt engineering se ci si pensa, è interessante descrivere il processo di raffinazione del prompt che c'è stato</mark>
Quindi il prompt engineering non è semplicemente:

> “scrivere un buon prompt”

ma:

\[ \boxed{\text{ottimizzazione iterativa del comportamento del modello}} \]


# 5. La tassonomia principale

Una delle figure centrali è la **Figura 2.2 a pagina 9**.

Le 58 tecniche text-based vengono organizzate principalmente in queste famiglie:

```
Text-Based Prompting
│
├── In-Context Learning
│
├── Thought Generation
│
├── Decomposition
│
├── Ensembling
│
└── Self-Criticism
```

con varie sottocategorie. 2406.06608v6

Per il tuo progetto, le ultime quattro sono probabilmente le più interessanti.

# 8. Zero-shot techniques

Il paper raccoglie anche tecniche molto semplici.

### Role Prompting

```
Act as an expert penetration tester...
```

Può modificare stile e, in alcuni casi, performance. 2406.06608v6

### Rephrase and Respond

Prima:

```
rephrase / expand the question
```

poi:

```
answer it
```

2406.06608v6

### Re-reading

Una tecnica sorprendentemente banale:

```
Read the question again:
{QUESTION}
```

può migliorare alcuni task di reasoning. 2406.06608v6

### Self-Ask

Il modello decide se servono sotto-domande:

```
Do I need follow-up questions?
↓
generate them
↓
answer them
↓
answer original question
```

2406.06608v6

---

# 9. Thought Generation

Questa è la famiglia che include il paper sul Chain-of-Thought che hai letto.

Gli autori raggruppano qui le tecniche che inducono il modello a generare **passaggi intermedi** prima della risposta.

Il classico:

\[ Question \rightarrow Reasoning \rightarrow Answer \]

2406.06608v6

---

# 10. Zero-Shot Chain-of-Thought

La versione più semplice è:

```
Let's think step by step.
```

senza esempi.

È la famosa tecnica di Kojima et al. 2406.06608v6

Il paper però mostra una cosa importante più avanti:

> **non bisogna assumere che CoT migliori sempre le performance.**

Lo vedremo nel benchmark.
# 12. Decomposition

Un'altra grande famiglia:

\[ Complex\ Problem \rightarrow Subproblem_1 + Subproblem_2 + ... \]

Gli autori distinguono questa categoria dal semplice CoT perché qui la scomposizione è spesso **esplicitamente progettata**. 2406.06608v6

---

# 13. Least-to-Most

Prima decomponi:

```
Problem
↓
Subproblem 1
Subproblem 2
Subproblem 3
```

poi li risolvi progressivamente:

```
solve 1
↓
use answer in 2
↓
solve 2
↓
...
```

2406.06608v6

È molto simile a quello che potrebbe fare un planner agentico
# 14. DECOMP

**Decomposed Prompting** porta il concetto ancora oltre.

Il modello scompone il task e può mandare i sottoproblemi a **funzioni differenti**:

```
Problem
 │
 ├── search(...)
 ├── split_string(...)
 ├── calculate(...)
 └── LLM(...)
```

2406.06608v6

Qui iniziamo già ad avvicinarci molto agli agenti.

---

# 15. Plan-and-Solve

Prima:

```
understand the problem
```

poi:

```
create a plan
```

poi:

```
execute the plan step-by-step
```

Formalmente:

\[ Understand \rightarrow Plan \rightarrow Execute \]

2406.06608v6

Per il tuo progetto è quasi esattamente la distinzione:

\[ Planner \rightarrow Executor \]

# 17. Program-of-Thought

Qui il modello non usa solo linguaggio naturale per “ragionare”.

Genera codice:

```
x = ...y = ...print(...)
```

che viene poi eseguito.

Quindi:

\[ LLM \rightarrow Code \rightarrow Interpreter \rightarrow Result \]

2406.06608v6

È un passaggio concettuale importantissimo verso:

\[ \boxed{LLM + external tools} \]

---

# 18. Ensembling

L'idea generale:

\[ Prompt \rightarrow Response_1 \]\[ Prompt \rightarrow Response_2 \]\[ Prompt \rightarrow Response_3 \]

poi:

\[ Aggregate(Response_1,Response_2,Response_3) \rightarrow Final \]

Questo riduce la varianza ma aumenta il costo computazionale.
# 26. Answer Extractor

Può essere una regex:

```
YES|NO
```

oppure addirittura un altro LLM:

```
Agent output
    ↓
Extractor LLM
    ↓
Structured answer
```

2406.06608v6

E il paper nota che, con output complicati, un **separate LLM** può essere usato appositamente per estrarre il risultato. 2406.06608v6

Ancora una volta compare:

\[ \boxed{LLM\ specialised\ role} \]

# 27. La parte sugli agenti

Questa è probabilmente quella che ti interessa di più.

Gli autori definiscono un agent come un sistema GenAI che raggiunge gli obiettivi dell'utente attraverso **azioni su sistemi esterni al modello stesso**. 2406.06608v6

Quindi:

\[ LLM\ alone \neq Agent \]

ma:

\[ \boxed{ LLM + Action + External\ System = Agent } \]

almeno secondo la definizione della survey
# 29. Tool Use Agents

Esempio importante:

## MRKL

Un **LLM router** decide quale modulo utilizzare:

```
              Calculator
             /
LLM Router ─── Search
             \
              Database
```

poi combina i risultati. 2406.06608v6

Questa struttura è molto vicina a un'architettura agentica moderna 
<mark style="background:#b1ffff">INTERESSANTE PARLARE DI LLM ROUTER</mark>
# 31. Code Agents

Il paper cita diversi sistemi.

### PAL

\[ Problem \rightarrow Code \rightarrow Python \rightarrow Answer \]

### ToRA

Va oltre PAL e alterna:

```
Reasoning
↓
Code
↓
Execution
↓
Reasoning
↓
Code
...
```

2406.06608v6

Di nuovo, è molto simile al tuo workflow terminale:

```
Reason
↓
Shell command
↓
Terminal output
↓
Reason
↓
Shell command
```

# 32. Observation-Based Agents<mark style="background:#b1ffff">(SEMBRA IL MIO CASO)</mark>

Qui arriviamo direttamente a **ReAct**.

Gli agenti ricevono le observation dell'ambiente dentro il prompt. 2406.06608v6

## ReAct

```
Thought
↓
Action
↓
Observation
↓
Thought
↓
Action
↓
Observation
...
```

Il paper riassume ReAct proprio come la generazione iterativa di thought, action e observation, mantenendo la cronologia nel prompt come memoria

# 39. LLM-EVAL, G-EVAL e ChatEval

Tre framework interessanti:

### LLM-EVAL

Un solo evaluator con schema:

```
grammar: ...
relevance: ...
correctness: ...
```

### G-EVAL

Aggiunge passaggi di reasoning generati automaticamente.

### ChatEval

Usa più agenti con ruoli diversi che discutono la valutazione.

2406.06608v6

Quindi:

\[ Single\ Judge \]

non è l'unica possibilità.

Puoi avere:

\[ Judge_1 + Judge_2 + Judge_3 \rightarrow consensus \]
# 44. Prompt sensitivity

Un'altra conclusione importante è che gli LLM possono essere estremamente sensibili al prompt.

Piccole variazioni:

```
spaces
capitalization
delimiters
synonyms
```

possono cambiare molto le performance.

Il paper cita un caso in cui LLaMA2-7B varia da quasi 0 a **0.804** semplicemente con variazioni apparentemente insignificanti del prompt. 2406.06608v6

Quindi:

\[ \boxed{ One\ good\ prompt\ result \neq robust\ architecture } \]

Questo è molto importante quando valuti sperimentalmente il tuo agente.
# 50. Il migliore è Few-Shot CoT

Nel loro esperimento:

\[ FewShotCoT = 69.2\% \]

è il risultato migliore.

Ma:

\[ FewShotCoT + SelfConsistency = 69.1\% \]

quindi Self-Consistency in questo caso **non migliora praticamente nulla**.

Ancora una volta:

\[ more\ complexity \not\Rightarrow better \]# 51. Prompt engineering come hyperparameter search

Una frase concettualmente molto importante del paper è che scegliere una tecnica di prompting è simile a fare:

\[ \boxed{\text{hyperparameter search}} \]

Non esiste necessariamente:

```
Technique X > Technique Y
```

universalmente.

Dipende da:

- modello;
- task;
- dataset;
- formato;
- esempi;
- prompt;
- output extractor# Collegamento molto diretto con la tua tesi

Questo paper secondo me è uno dei più utili fra quelli che stai leggendo per **giustificare metodologicamente la tua architettura**.

Il tuo sistema può essere visto grossomodo come una combinazione di diverse categorie della survey:

```
User Goal
   ↓
Planner
   │
   ├── Decomposition
   │      Plan-and-Solve
   │
   ↓
Executor
   │
   ├── Tool Use
   │
   ├── Terminal
   │
   ↓
Observation
   │
   └── ReAct
   ↓
Diagnostician / Critic
   │
   ├── Self-Criticism
   ├── Verification
   └── LLM-as-Evaluator
   ↓
Replanning
```

Quindi non stai inventando componenti arbitrari: quasi ogni blocco della tua architettura corrisponde a una famiglia ben identificata nella letteratura.
# Revisiting Prompt Sensitivity in Large Language Models for Text Classification: The Role of Prompt Underspecification
# 1. Che cos'è la prompt sensitivity?

Per **prompt sensitivity** si intende il fatto che due prompt semanticamente quasi equivalenti possano produrre performance molto diverse.

Per esempio:

```
Classify the sentiment:
{TEXT}
```

contro:

```
Determine whether the following text is positive or negative:
{TEXT}
```

La task è sostanzialmente la stessa, eppure accuracy e output possono cambiare parecchio.

Questo è problematico soprattutto nei benchmark, perché può succedere che:

\[ Prompt_A \Rightarrow Model_1 > Model_2 \]

mentre:

\[ Prompt_B \Rightarrow Model_2 > Model_1 \]

Gli autori ricordano proprio che piccole variazioni del prompt possono cambiare perfino i ranking tra modelli e quindi ciò che viene dichiarato “state of the art”.
# 2. La tesi principale: forse stiamo usando prompt sbagliati

Molti lavori precedenti sulla prompt sensitivity utilizzano prompt nello stile del vecchio GPT-3.

Per esempio, per sentiment analysis:

```
This movie is fantastic.
My feedback to the film is
```

Il modello dovrebbe intuire che deve continuare con:

```
positive
```

Ma nessuno gli ha realmente detto:

- che sta facendo classificazione;
- quali sono le classi;
- che deve scegliere tra `positive` e `negative`;
- quale formato deve usare.

Gli autori chiamano questi:

\[ \boxed{\text{underspecified / minimal prompts}} \]
# 3. Prompt underspecified vs well-specified

Questa distinzione è il cuore del paper.

## Minimal / underspecified

Per SST2, uno degli esempi è:

```
{sample}
My feedback to the film is
```

## Instruction / well-specified

```
Determine sentiment of the sentence using following options:
negative; positive.
Use only these two options.

Sentence: {sample}
Sentiment:
```

Qui il modello sa:

\[ Task = Sentiment\ Classification \]\[ LabelSpace = \{negative, positive\} \]\[ OutputConstraint = one\ label \]

Gli esempi completi sono mostrati nell'appendice del paper. 2602.04297v1

La differenza può sembrare banale, ma è proprio ciò che gli autori vogliono dimostrare:

> se non specifichi bene il task, potresti stare misurando la capacità del modello di indovinare cosa vuoi, non la sua capacità di svolgere il task.

# 5. La loro ipotesi più interessante

Gli autori propongono un'idea forte:

> il modello spesso **sa internamente risolvere il problema**, ma fallisce nel trasformare quella rappresentazione interna nell'output atteso perché il prompt è ambiguo.

Quindi:

\[ \text{Internal task understanding} \]

può essere corretto, mentre:

\[ \text{Final output} \]

può essere sbagliato.

Lo formulano esplicitamente: i modelli sembrano avere la capacità interna di svolgere il task indipendentemente dal prompt, ma possono “fallire” nella fase di output a causa dell'underspecification. 2602.04297v1

Questa è probabilmente la conclusione concettualmente più interessante dell'intero paper

# 14. Ma il well-specified prompting non risolve tutto

Questo è importante.

Gli autori NON concludono:

> “basta scrivere prompt migliori e la prompt sensitivity sparisce”.

In alcuni casi gli instruction prompts vanno persino peggio.

Per esempio:

- alcuni modelli su SST2;
- AG News in diverse configurazioni.

2602.04297v1

Quindi:

\[ \boxed{ Underspecification \text{ è una causa importante, non l'unica causa} } \]

Ci sono anche:

- limiti del modello;
- proprietà del dataset;
- genuine sensitivity;
- interazione model–prompt.

---

# 15. Instruction-tuning aiuta <mark style="background:#b1ffff">(il modello che uso io è instruction tuned qwen 3.8 27B)</mark>

Passando dalla versione base alla versione instruction-tuned osservano incrementi medi circa nell'ordine di:

\[ 1\%-15\% \]

per minimal prompts e:

\[ 6\%-21\% \]

per instruction prompts, a seconda del setting. 2602.04297v1

Interpretazione:

un modello addestrato a seguire istruzioni è naturalmente più adatto a prompt del tipo:

```
Do X.
Use labels A/B/C.
Return only one label.
```
# 28. Questo cambia anche come dovremmo fare benchmark

Supponiamo che Model A ottenga:

\[ 60\% \]

con un prompt minimal.

E Model B:

\[ 70\% \]

Non puoi necessariamente concludere:

\[ B > A \]

perché A potrebbe essere semplicemente più sensibile alla formulazione o meno bravo a inferire il formato richiesto.

Per valutare le **capability**, il paper suggerisce implicitamente che bisogna cercare di ridurre l'underspecification:

```
explicit task
+
explicit label space
+
explicit output format
+
possibly ICL
```

---

# 29. Una distinzione utilissima per la tua tesi

Per il tuo agente, puoi tradurre il risultato in:

\[ \boxed{ Reasoning\ Failure \neq Interface\ Failure } \]

Immagina:

```
Goal:
find vulnerabilities
```

L'agente potrebbe internamente avere l'idea giusta:

```
I should inspect port 80.
```

ma il tool call risultante potrebbe essere:

```
nmap...
```

con:

- sintassi sbagliata;
- tool sbagliato;
- formato RPC sbagliato;
- parametri invalidi.

Se valuti solo:

\[ Task\ Success \]

potresti concludere:

> il planner non sa cosa fare.

Ma in realtà:

\[ Plan = correct \]\[ Action serialization = wrong \]

Il paper ti dà una base concettuale interessante per separare questi failure mode
# 30. Collegamento fortissimo con il tuo terminal wrapper

Pensa alla tua architettura:

```
LLM
 ↓
Tool Call
 ↓
PTY
 ↓
Observation
```

Un errore può nascere da almeno tre livelli:

### Semantic failure

```
wrong idea
```

### Action-selection failure

```
right goal, wrong command/tool
```

### Output/interface failure

```
right command concept,
wrong schema / syntax / formatting
```

Il paper dimostra qualcosa di analogo nel text classification:

```
internal task representation
✓

final output mapping
✗
```

Quindi per valutare bene il tuo agente, sarebbe molto interessante distinguere queste categorie

# 34. Instruction prompt + ICL sembra la combinazione più solida

La conclusione sperimentale del paper è che una combinazione di:

\[ Instruction\ Prompting + In\text{-}Context\ Learning + Instruction\text{-}Tuned\ Models \]

risolve gran parte dei problemi osservati. 2602.04297v1

Non completamente, però.

Quindi:

\[ Prompt\ sensitivity > 0 \]

rimane
