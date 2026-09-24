# Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
interessante parlare del discorso dei modelli parlando di qwen coder e invece giustificare la scelta della CoT per eseguire azioni
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
