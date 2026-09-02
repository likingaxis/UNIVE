###### Allega spiegazione obiettivo 0 molto easy
Problema ancora aperto di obiettivo 0

ma così con i prompt di questo agente non rischio che verification non viene messo su nuove vulnerabilità?
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



L'architettura è la seguente
- PLANNER
	- riceve storyline.md writeup.md e tutto ciò che può essere utile
	- restituisce un ATTACK_PLAN.md con un determinato formato+checklist
	- utilizzato per non sovraccaricare il nodo vulcamind (capire sennò se fare ATTACK PLAN direttamente da li)
- ORCHESTRATOR
	- deterministico
- EXECUTOR
- DIAGNOSTICIAN
- FINAL EVALUATOR


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