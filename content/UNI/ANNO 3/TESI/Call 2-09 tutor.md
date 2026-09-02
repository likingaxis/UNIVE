###### Allega spiegazione obiettivo 0 molto easy
Problema ancora aperto di obiettivo 0

ma così con i prompt di questo agente non rischio che verification non viene messo su nuove vulnerabilità?
Leggi antigravity

#### Obiettivo 1:
Lo dividerei in 
- White box testing
	- Planner-guided Executor
- Black box testing
	- Autonomous Executor


per il black box ho già diverse idee ma intanto concentriamoci su


la macchina è **risolvibile correttamente**, ma **didatticamente difettosa** perché permette di saltare parti del percorso.
Nel tuo progetto potresti arrivare a una filosofia del tipo:

> deterministic where possible, agentic where necessary.


##### White-box testing
> **Verificare automaticamente che il percorso intenzionale progettato per la challenge sia realmente eseguibile sulla macchina generata e che gli step previsti producano i risultati attesi.**

Questo punto è fondamentale perché giustifica un'architettura guidata dagli artefatti di design e differenzia nettamente il White-Box dal futuro ramo Black-Box.

Interchangeability by design
***PLANNER***
- Riceve `STORYLINE.md`, `writeup.md` e gli altri artefatti utili della challenge.
- Genera un `ATTACK_PLAN` strutturato, con:
    - step;
    - dipendenze;
    - input richiesti;
    - output attesi;
    - checklist;
    - artifact/evidence richiesti.
- Può essere:
    - deterministico;
    - LLM-based;
    - ibrido.
- Viene mantenuto separato da VulcaMind per:
    - non sovraccaricare il nodo di design;
    - permettere di sostituirlo e benchmarkarlo.
- Rimane da valutare se, in futuro, l'`ATTACK_PLAN` possa essere prodotto direttamente da VulcaMind.
***ORCHESTRATOR***
- Componente principalmente **deterministico**.
- Gestisce l'esecuzione step-by-step dell'`ATTACK_PLAN`.
- Per ogni step:
    1. legge dipendenze e input richiesti;
    2. costruisce un piccolo `ExecutorContext`;
    3. invoca l'Executor;
    4. riceve lo `StepResult`;
    5. verifica schema, checklist e completezza;
    6. aggiorna stato, metriche e artifact;
    7. decide `next / retry / stop`.

***TestState***
Rappresenta una struttura dati delle **informazioni attendibili e utili alla run**, ad esempio:
- step completati/falliti;
- valori estratti;
- credenziali;
- servizi scoperti;
- sessioni;
- retry;
- riferimenti alle evidence.

viene fatto dall'orchestrator in modo deterministico(se gli stati prodotti da Executor sono effettivamente schematici)
L'Executor non legge o modifica direttamente il `TestState`.
Può invece richiedere informazioni tramite:
```text
request_context(key)
```
L'Orchestrator recupera e restituisce soltanto il dato richiesto, evitando di sovraccaricare il contesto dell'Executor.

***Evidence Store***
Contiene i dati più pesanti o completi:
- stdout/stderr;
- trace;
- screenshot;
- file;
- response HTTP;
- artifact;
- log;
- altre evidenze grezze.
Il `TestState` mantiene principalmente riferimenti a questi elementi.

***Retry Policy***
L'Orchestrator applica una Retry Policy definita.

I casi semplici possono essere gestiti deterministicamente.

Se il fallimento è ambiguo o richiede interpretazione, viene chiamato il `Diagnostician`.

***EXECUTOR***
- Riceve uno step dell'Attack Plan e un piccolo `ExecutorContext`.
- Interagisce realmente con la macchina target.
- Segue la checklist associata allo step.
- Produce un risultato strutturato.
```text
StepResult
├── actions
├── tool_calls
├── stdout
├── stderr
├── raw_responses
├── extracted_values
├── artifacts
├── checks_performed
└── candidate_evidence
```
- Artifact, trace e metriche dovrebbero essere raccolti il più possibile automaticamente tramite codice/tooling, evitando di affidare all'LLM la loro compilazione manuale.
- Può effettuare piccoli adattamenti operativi.
- I retry significativi dello step vengono invece controllati dall'Orchestrator.
- Può richiedere informazioni aggiuntive tramite `request_context()`.
Se lo `StepResult` non soddisfa checklist o contratto richiesto, l'Orchestrator lo rimanda all'Executor per completare ciò che manca.

***DIAGNOSTICIAN***
- Viene chiamato solo quando un errore non è facilmente classificabile con regole deterministiche.
- Evita di sovraccaricare l'Executor con reasoning diagnostico.
- Analizza:
    - errore dell'Executor;
    - errore transitorio;
    - problema dell'Attack Plan;
    - comportamento inatteso del target;
    - probabile problema nella macchina generata.
- Produce una diagnosi strutturata e una raccomandazione.
Esempio:
```text
servizio previsto dalla storyline non disponibile
→ probabile problema della macchina
→ retry non consigliato
→ failure candidato
```
Non deve inventare un nuovo percorso alternativo per risolvere la challenge: nel White-Box l'obiettivo rimane verificare il percorso intenzionale.
***FINAL EVALUATOR***
- Riceve dall'Orchestrator il risultato complessivo della run.
- Analizza:
    - Attack Plan;
    - TestState;
    - errori;
    - retry;
    - artifact/evidence;
    - diagnostica;
    - metriche.
- Produce il `REPORT.md` finale.
La valutazione può essere **ibrida**:
Parte deterministica
Gestisce casi evidenti, ad esempio:
```text
Step 1 PASS
Step 2 PASS
Step 3 FAIL
Step 4 NOT_REACHED

→ challenge non conforme
```
Parte LLM
Serve per:
- interpretare le cause;
- descrivere le discrepanze;
- individuare il componente probabilmente responsabile;
- produrre una diagnosi utile.

Il report potrà essere utilizzato successivamente da
- Self-Healing;
- debugging;
- validazione finale;
- eventuale avvio del ramo Black-Box.


L'obiettivo non è quindi fissare a priori la migliore architettura, ma costruire VulcaTest in modo da poter **confrontare sperimentalmente più configurazioni e determinare quali risultano più affidabili, efficienti e adatte al White-Box Conformance Testing**.



parte benchmark forse richiederà più tempo della realizzazione effettiva
###### DOMANDE PROGETTUALI SUL WHITE BOX ARCHITECTURE

Sì, capito: vuoi domande che **servano davvero a migliorare il design prima di implementarlo**, non domande da difesa orale.

Allora le più utili, secondo me, sono queste:

- **Qual è il confine esatto tra Planner ed Executor?** Quanto dettaglio deve contenere l’Attack Plan prima che l’Executor diventi solo un esecutore meccanico?
    
- **L’Observer deve solo verificare completezza procedurale o anche qualità delle evidenze?** Questo cambia molto quanto diventa complesso.
    
- **Quando un dato entra nel TestState?** Basta che l’Observer abbia verificato che esista una source, oppure serve una validazione più forte?
    
- **Che cosa può chiedere `request_context()`?** Solo chiavi note oppure anche richieste semantiche? E chi autorizza la risposta?
    
- **Il TestState deve essere unico o separato per categorie?** Per esempio stato operativo, credenziali, evidence refs, metriche, retry counters.
    
- **Quanto deve essere “typed” l’Attack Plan?** Più è strutturato, più puoi tenere Orchestrator e context routing deterministici.
    
- **Cosa succede se il Planner sbaglia una dependency?** Chi se ne accorge: Observer, Executor, Diagnostician, Final Evaluator?
    
- **Come distingui “challenge rotta” da “Executor incapace”?** Questa è forse la domanda progettuale più importante, perché influenza retry, diagnosi e benchmark.
    
- **Il retry deve ripetere lo stesso step identico o può permettere una piccola variazione operativa?** Se sì, chi decide la variazione?
    
- **L’Executor può produrre nuovi valori non previsti in `produces[]`?** Se trova qualcosa di utile ma non previsto dal Planner, lo ignori o lo registri?
    
- **Gli artifact sono obbligatori per tutti gli step o solo per alcuni?** Fare screenshot sempre potrebbe essere costoso e inutile.
    
- **Il Final Evaluator deve essere solo diagnostico o può anche influenzare una nuova run?** Se lo usi nel self-healing futuro, cambia il contratto.
    
- **Vuoi che il framework sia challenge-agnostic davvero, o accetti una certa dipendenza dal formato generato da VulcAIn?**
    
- **Quali componenti devono essere sostituibili singolarmente senza rompere il benchmark?** Planner ed Executor sicuramente; Observer e Diagnostician forse.
    
- **Qual è il minimo set di dati che devi loggare fin dalla prima versione?** Conviene deciderlo presto, perché se manca non puoi ricostruire benchmark dopo.
    
- **Come rappresenti uno step che ha più rami o condizioni?** Se la challenge non è perfettamente lineare, `requires/produces` potrebbe non bastare.
    
- **Cosa succede se uno step produce più evidenze possibili equivalenti?** Il piano deve prevederle tutte o accetti una nozione di “evidence class”?
    
- **Quanto vuoi separare runtime e analisi post-run?** Alcune cose possono essere calcolate dopo, evitando di appesantire il loop live.
    
- **Vuoi che l’Observer sia completamente deterministico o semplicemente non-LLM nella V1?** Sono due obiettivi diversi.
    
- **Che cosa significa esattamente “successo di uno step” nel white-box?** Arrivare al risultato previsto, oppure arrivarci rispettando anche il percorso previsto?
    

Le tre che io affronterei **prima di metterti a studiare** sono:

1. **confine Planner/Executor**;
    
2. **challenge rotta vs Executor incapace**;
    
3. **quando un'informazione diventa abbastanza affidabile da entrare nel TestState**.
    

Sono quelle che possono cambiare davvero l’architettura, mentre molte altre sono dettagli che puoi decidere dopo.