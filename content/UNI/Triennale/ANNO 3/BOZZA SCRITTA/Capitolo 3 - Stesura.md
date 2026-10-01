## 3.1 Dal prototipo all'architettura: perché un harness generico non basta

L'obiettivo fondamentale di VulcaTest è verificare la conformità di una macchina didattica vulnerabile rispetto al suo progetto pedagogico originario, garantendo che essa sia effettivamente risolvibile mediante il percorso di attacco previsto (*intended way*) e senza fare affidamento sull'auto-certificazione dell'agente collaudatore.

Come anticipato al termine del capitolo precedente, la necessità di governare in modo strutturato l'interazione tra modello linguistico e ambiente operativo conduce naturalmente all'impiego di un *harness* agentico. La prima ipotesi esplorata in questo lavoro è stata dunque quella apparentemente più diretta: demandare il collaudo di conformità a un framework generico già consolidato sullo stato dell'arte — nel mio caso Google Antigravity — confidando che un modello di frontiera, guidato da un system prompt meticoloso e dotato di strumenti di sicurezza via protocollo MCP, fosse sufficiente a condurre un penetration testing rigoroso.

L'esperienza sperimentale ha tuttavia smentito tale presupposto, dimostrando come un harness generico, progettato per l'assistenza allo sviluppo o l'esplorazione autonoma, sia strutturalmente inadatto a un compito di verifica di conformità. I limiti emersi si collocano su due livelli distinti.

### Il livello del modello: guardrail e sostenibilità
Il primo livello di criticità riguarda le restrizioni intrinseche dei modelli linguistici utilizzati dagli harness commerciali. I modelli di frontiera integrano filtri di allineamento e guardrail di sicurezza particolarmente severi nei confronti di comandi e tecniche offensive. Nel contesto del penetration testing didattico, azioni perfettamente legittime e necessarie (quali la scansione aggressiva di porte, il brute-forcing di credenziali o l'iniezione di payload SQL e comandi di sistema) vengono sistematicamente intercettate e bloccate dai filtri dei provider cloud, che le classificano come attività malevole non autorizzate. A questo ostacolo si aggiunge il profilo economico: l'esecuzione di un collaudo esaustivo richiede decine di iterazioni e scambi di contesto voluminosi, rendendo l'utilizzo continuo di API commerciali estremamente oneroso sul piano dei costi computazionali e monetari.

Sebbene questo primo livello possa essere mitigato ricorrendo a modelli open-source o self-hosted privi di filtri restrittivi, è il secondo livello a costituire la vera barriera architetturale, indipendente dal modello adottato.

### Il livello del controllo operativo e dell'oracolo
Un harness convenzionale è concepito per compiti di sviluppo assistito, in cui l'obiettivo primario è la massima autonomia nel problem-solving. Quando applicato al conformance testing, questo paradigma introduce tre problematiche critiche:

1. **Eccesso di libertà e distorsione verso il goal-reaching:** Lasciato operare all'interno di un harness generico, l'agente tende a privilegiare il raggiungimento del risultato finale a qualunque costo (*goal-reaching* opportunistico), ignorando i vincoli di perimetro. Durante le sperimentazioni iniziali è emerso come l'agente tentasse frequentemente vie out-of-band: invece di procedere come uno studente collegato alla rete esterna, interagiva direttamente con il demone Docker dell'host di virtualizzazione o ispezionava il filesystem sottostante alla ricerca di flag e configurazioni. Questo comportamento snatura la finalità del test, il cui scopo non è verificare se una macchina sia genericamente compromettibile, ma se lo sia rispettando rigorosamente le vulnerabilità didattiche progettate.
2. **Assenza di un oracolo evidence-based e rischio di allucinazione:** Un harness generico tratta l'LLM sia come esecutore sia come giudice del proprio operato. Tuttavia, per la natura probabilistica dei modelli generativi, dichiarare uno step come completato o inventare un output verosimile richiede lo stesso sforzo computazionale del produrre una prova reale. In assenza di vincoli rigidi sul controllo delle risultanze empiriche, l'agente tende a considerare soddisfatti requisiti di cui non possiede reale riscontro nei log di sistema, generando falsi positivi di conformità.
3. **Mancanza di rigore analitico e telemetria:** Gli ambienti agentici generici non forniscono strutture deterministiche per il tracciamento granulare delle metriche di esecuzione (tempi di permanenza per fase, budget di token per nodo, persistenza delle sessioni terminali e mappatura punto per punto delle checklist).

Un caso empirico emblematico si è verificato durante il collaudo della macchina *Pizzeria_B2R*, generata tramite la pipeline VulcAIn. Il design della challenge stabiliva che la scoperta di un endpoint web vulnerabile dovesse avvenire unicamente attraverso l'interazione con un servizio di chat di assistenza. A causa di un'anomalia nella generazione dell'infrastruttura, il componente della chat non era stato istanziato, ma il link all'endpoint era rimasto esposto in chiaro all'interno del codice HTML dell'applicazione. Sottoposto al test di un harness generico, l'agente ha individuato direttamente il collegamento, completato l'intrusione e certificato la macchina come perfettamente funzionante. L'agente ha ignorato la discrepanza didattica perché il suo unico oracolo implicito era il conseguimento della shell. Al contrario, un sistema di collaudo rigoroso deve fallire la fase: la macchina era tecnicamente attaccabile, ma non conforme al percorso formativo previsto.

Queste evidenze dimostrano come il problema centrale del testing autonomo non risieda nella potenza computazionale del modello linguistico, bensì nella carenza di un'architettura di controllo esterna che ne vincoli perimetro, azioni e capacità di giudizio. VulcaTest nasce per rispondere a questa esigenza: un'infrastruttura di *mechanism engineering* che trasforma l'agente da operatore libero a un auditor vincolato a evidenze empiriche riproducibili.


## 3.2 Principi di design architetturale

I limiti strutturali emersi dall'analisi degli harness convenzionali hanno imposto la definizione di una serie di linee guida progettuali preliminari. L'obiettivo non era semplicemente quello di aggiungere regole restrittive a un prompt, ma di concepire un'architettura software capace di garantire rigore metodologico, tracciabilità e isolamento dei compiti. Da questa riflessione sono scaturiti cinque principi cardine di progettazione, che guidano l'intera implementazione di VulcaTest e trovano un preciso inquadramento nei paradigmi teorici della letteratura scientifica sugli agenti autonomi.

### 1. Deterministico quando possibile, probabilistico quando necessario
Una delle criticità più frequenti nelle architetture agentiche di prima generazione è la tendenza a delegare indistintamente ogni operazione a un modello linguistico. In un'attività di collaudo e conformance testing, tuttavia, la riproducibilità è un requisito imprescindibile. Come formalizzato nel framework CoALA (*Cognitive Architectures for Language Agents*), l'asse corretto di progettazione non contrappone "deterministico" ad "agentico", bensì *codice deterministico* a *modello linguistico probabilistico*. 
Un modello linguistico opera come un sistema di produzione stocastico: eccelle nel ragionamento contestuale, nell'interpretazione di output non strutturati e nella sintesi concettuale, ma introduce inevitabilmente variabilità e opacità. Al contrario, il codice software tradizionale è rigidamente deterministico, efficiente e pienamente verificabile.
In VulcaTest questo principio si traduce in una rigida ripartizione dei compiti:
- Tutto ciò che risponde a regole sintattiche, flussi di controllo, parsing di documenti, transizioni di stato e calcolo di metriche quantitative è implementato rigorosamente in codice Python deterministico.
- L'impiego dell'LLM è circoscritto esclusivamente agli stadi in cui è necessaria una reale capacità generativa o interpretativa: l'elaborazione dell'Attack Plan a partire dalla narrativa didattica, l'esecuzione interattiva dei comandi di exploit e la diagnosi qualitativa a posteriori (*Root Cause Analysis*).

### 2. Esecuzione basata su evidenze e rifiuto dell'auto-certificazione
Un agente non deve poter considerare superata una fase di collaudo sulla base di una propria autodichiarazione. Questo principio risponde al fenomeno noto in letteratura come *verifier gap* (ampiamente analizzato in benchmark come SWE-bench Pro): la marcata asimmetria tra la facilità con cui un modello linguistico può asserire di aver risolto un problema e la reale correttezza empirica della soluzione.
In VulcaTest, l'onere della prova è imposto dalla struttura stessa dei dati:
- Ogni voce della checklist di collaudo costituisce un oracolo formale e deve essere accompagnata da un estratto testuale inequivocabile raccolto direttamente dai canali operativi (output di comando, risposta HTTP, codice di errore, banner di servizio o stringa di flag).
- La validazione non è affidata a una richiesta discorsiva nel prompt, ma è applicata programmaticamente dal codice: anche qualora l'agente emetta un giudizio positivo, il motore di orchestrazione esamina i campi strutturati e forza lo stato a fallimento (*FAILED*) se anche una sola voce della checklist risulta priva di riscontro oggettivo o non soddisfatta.

### 3. Separazione delle responsabilità (Architettura Role-Based)
Affidare l'intero ciclo di vita del test a un unico agente monolitico favorisce il fenomeno del *goal drift*, ovvero la progressiva perdita di allineamento rispetto all'obiettivo iniziale man mano che il contesto si satura di informazioni eterogenee.
Per prevenire tale deriva, l'architettura adotta il principio della separazione delle responsabilità (*Separation of Concerns*), articolando il sistema in ruoli cognitivi nettamente distinti:
- Un modulo per la pianificazione concettuale (*Planner*);
- Un motore di controllo del flusso a stati finiti (*Orchestrator*);
- Un operatore tattico operativo di esecuzione (*Executor*);
- Un analista forense e diagnostico a posteriori (*Final Evaluator*).
Ciascun ruolo dispone di un perimetro funzionale isolato, opera su un prompt altamente specializzato e interagisce con gli altri componenti esclusivamente attraverso contratti di interfaccia fortemente tipizzati.

### 4. Intercambiabilità e modularità architetturale
L'architettura è stata concepita sin dal principio per essere completamente disaccoppiata dall'infrastruttura di calcolo e dai singoli modelli di inferenza. Il sistema garantisce piena modularità:
- È possibile sostituire il motore di inferenza (passando da server locali ad alte prestazioni basati su Unsloth/vLLM a modelli proprietari su cloud) modificando unicamente le variabili di configurazione d'ambiente;
- I parametri operativi (dimensione della finestra di contesto, livello di Chain-of-Thought, campionamento di temperatura e quantizzazione) possono essere calibrati per singolo nodo;
- Il catalogo dei tool di sicurezza e gli endpoint di rete sono gestiti attraverso interfacce standardizzate.
Questa modularità si rivela strategica anche in ottica futura, consentendo l'estensione del framework e preparando il terreno per il modulo di autoriparazione VulcaHealing (approfondito nel Capitolo 4), nel quale l'agente riparatore opera come un'entità esterna completamente pluggabile.

### 5. Controllo gerarchico: Plan-and-Execute a livello macro e ReAct a livello micro
La gestione dell'azione agentica adotta un modello di controllo su due scale dimensionali distinte:
- **A livello macro (Plan-and-Execute):** La pipeline adotta il paradigma *Plan-and-Solve*. Prima dell'inizio delle attività operative sul bersaglio, il Planner formula l'intera sequenza di attacco strutturandola in fasi ordinate e immutabili. Il piano non viene rinegoziato o modificato dinamicamente a runtime: trattandosi di un conformance testing, l'obiettivo non è consentire all'agente di cercare vie d'uscita alternative se incontra un ostacolo, ma verificare se l'esatto percorso didattico prestabilito (*intended way*) sia percorribile.
- **A livello micro (ReAct):** All'interno della singola fase, l'Executor opera secondo il paradigma ciclico *ReAct* (Reasoning + Action + Observation). In ogni turno, il modello valuta lo stato corrente, formula un passaggio logico di ragionamento, seleziona e invoca uno strumento operativo attraverso il Bridge e ne analizza l'output restituito, iterando fino alla chiusura della fase o all'esaurimento del budget di turni concesso.

L'insieme di questi cinque principi fornisce la solida base concettuale su cui poggia l'architettura software di VulcaTest. Nella sezione successiva viene presentata la visione d'insieme del sistema, illustrando come tali criteri si traducano nella cooperazione coordinata tra memoria condivisa, nodi funzionali e grafo di orchestrazione.


## 3.3 Visione d'insieme e architettura di coordinamento

Prima di analizzare nel dettaglio il funzionamento dei singoli moduli, è opportuno definire la struttura complessiva dell'architettura di VulcaTest: come vengono coordinati i ruoli, quali forme di memoria sono impiegate e secondo quali modalità avviene lo scambio informativo tra i componenti.

### Inquadramento nel framework CoALA
Facendo riferimento alla tassonomia formale introdotta dal framework CoALA (*Cognitive Architectures for Language Agents*), VulcaTest può essere classificato come un **singolo agente cognitivo modulare governato da ruoli specializzati**, anziché come un sistema multi-agente cooperativo non vincolato. L'architettura non prevede agenti autonomi che negoziano liberamente tra loro; al contrario, le facoltà cognitive necessarie al collaudo sono ripartite in moduli distinti (pianificazione, esecuzione, valutazione), coordinati in modo rigido da un flusso di controllo a stati.

È fondamentale precisare il perimetro di questa classificazione:
- L'architettura qui descritta modella l'intero sottosistema di collaudo (**VulcaTest Tester**), costituito da Planner, Orchestrator, Executor e Final Evaluator.
- Il modulo di autoriparazione (**VulcaHealing**), approfondito nel Capitolo 4, opera invece come un agente autonomo separato, invocato a valle in modalità *loosely coupled* (a basso accoppiamento) unicamente al termine del collaudo, qualora emerga una non conformità.

### Gestione e modellazione della memoria
All'interno del framework di collaudo, la memoria dell'agente è stata volutamente limitata a due sole tipologie:
1. **Working Memory (Memoria di Lavoro):** È implementata attraverso una struttura dati tipizzata condivisa in RAM (`VulcaTestState`, definita in `state.py`). Essa costituisce la *blackboard* del sistema e traccia le variabili che devono persistere lungo l'intera sequenza di test: la lista dei passi di collaudo (`TestStep`), l'indice della fase corrente, lo stato globale (`RUNNING`, `COMPLETED`, `FAILED`), le evidenze raccolte, i valori empirici convalidati (*verified values*, come credenziali e flag) e l'elenco delle sessioni terminali PTY attualmente aperte sul target.
2. **Procedural Memory (Memoria Procedurale):** Non è appresa o memorizzata nello spazio dei pesi del modello linguistico, ma è interamente *esplicita ed esternalizzata nel codice software*. I flussi decisionali, le grammatiche di parsing, le macchine a stati del grafo e le regole vincolanti dei system prompt costituiscono la conoscenza procedurale immutabile con cui l'agente opera.

Al contrario, la **memoria episodica** (lo storico delle sessioni passate) e la **memoria semantica** (database vettoriali o basi di conoscenza esterne) sono state deliberatamente omesse. Questa decisione di design persegue due obiettivi tecnici precisi:
- **Minimizzazione del contesto e abbattimento dei costi:** Evitare l'accumulo di contesto non pertinente permette di mantenere ridotta la finestra di token inviata ai modelli locali, preservando velocità di inferenza (tok/s) e stabilità computazionale.
- **Isolamento e riproducibilità sperimentale:** L'assenza di memoria tra run consecutive impedisce che la conoscenza acquisita durante un test contamini le esecuzioni successive. In un contesto di benchmark scientifico, ogni collaudo deve iniziare da uno stato *Clean Slate*, garantendo la piena riproducibilità dei risultati.

### Punti d'ingresso e ciclo di vita dell'esecuzione
Il framework prevede due distinti punti di ingresso operativi:
- **Flusso standard (Execution Mode):** Qualora sia già disponibile un Attack Plan precedentemente generato e validato (`ATTACK_PLAN.md`), il sistema avvia direttamente il motore di orchestrazione, instradando l'esecuzione verso la prima fase del collaudo.
- **Flusso con generazione forzata (Planning & Execution Mode):** Se il piano non è presente o se viene specificato il flag CLI `--generate-plan`, il sistema invoca in via preliminare il nodo del Planner. Questo modulo trasforma la documentazione sorgente della challenge in un nuovo piano strutturato, ne verifica la validità sintattica e lo salva su disco; successivamente, il flusso converge sul grafo di esecuzione ordinario.
![[Pasted image 20261001134308.png|504]]

### Comunicazione tra nodi: contratti tipizzati di interfaccia
Un elemento cardine della robustezza del sistema riguarda il paradigma di comunicazione inter-modulo. I componenti dell'architettura **non comunicano mediante messaggi liberi in linguaggio naturale**. La trasmissione di testo non strutturato tra modelli linguistici è intrinsecamente fragile e soggetta a perdite di precisione sintattica.

I nodi operano invece scambiandosi **artefatti fortemente tipizzati**, modellati mediante classi Pydantic:
- Il Planner consegna all'Orchestratore una lista di oggetti `TestStep`;
- L'Orchestratore alimenta l'Executor fornendogli esclusivamente la specifica dello step corrente e il dizionario delle variabili convalidate;
- L'Executor restituisce al grafo un oggetto formale `StepResult`, contenente l'esito della fase, le evidenze testuali registrate e la telemetria di consumo;
- Il Final Evaluator aggrega tali contratti per produrre i report strutturati finali (`run_summary.json` e `healing_ticket.json`).

Questo modello di scambio strutturato (*Structured Artifact Handoff*) vincola ogni passaggio logico a uno schema rigido, permettendo al codice deterministico di verificare i tipi e validare i dati prima che essi vengano propagati allo stadio successivo.

Definita la topologia complessiva del sistema, le sezioni seguenti analizzano singolarmente ciascun nodo funzionale, a partire dal modulo responsabile della formalizzazione dell'attacco: il Planner.


## 3.4 Il Planner: formalizzazione e parsing dell'Attack Plan

Collocato a monte del grafo di esecuzione, il **Planner** è il modulo deputato alla formalizzazione dell'Attack Plan operativo (`ATTACK_PLAN.md`). A differenza di un piano d'azione redatto per un analista umano, il documento prodotto dal Planner costituisce una specifica tecnica formale concepita per essere eseguita in modo autonomo da un agente artificiale (l'Executor). Di conseguenza, ogni fase generata deve risultare auto-consistente, dipendente unicamente dallo stato effettivamente maturato fino a quel momento ed empiricamente verificabile con i privilegi posseduti.

### Architettura ibrida a due stadi
In piena conformità con il primo principio di progettazione (*deterministico quando possibile, probabilistico quando necessario*), il Planner non demanda l'intero processo a una singola inferenza, ma si articola in una pipeline a due stadi:

1. **Stadio Generativo (LLM):** Un modello linguistico elabora la documentazione sorgente della challenge ed emette un testo strutturato che combina sezioni descrittive in Markdown con blocchi formali in sintassi YAML. Il formato YAML è stato preferito al JSON per la sua maggiore flessibilità sintattica e per la capacità nativa di rappresentare in modo leggibile comandi shell multi-riga, payload complessi e liste senza richiedere caratteri di escape invasivi.
2. **Stadio Deterministico (`plan_parser.py`):** Uno script Python analizza il documento generato combinando parser YAML sicuri (`yaml.safe_load`) ed espressioni regolari per estrarre le checklist e i comandi. Il parser convalida la correttezza strutturale del testo e lo converte in una sequenza ordinata di oggetti `TestStep`, una classe dati Pydantic definita in `executor/models.py`.

Ciascuna istanza di `TestStep` formalizza la specifica operativa della singola fase didattica: oltre all'identificativo e all'obiettivo pedagogico, essa circoscrive il perimetro rigido degli strumenti autorizzati (`allowed_tools`), traccia la catena di propagazione delle nuove entità scoperte (`produces`, come credenziali o flag) e, soprattutto, definisce la `checklist` di verifica atomica, che fungerà da oracolo formale per l'Executor.

Se il testo generato dal modello presenta anomalie strutturali, blocchi incompleti o violazioni di schema, il parser deterministico rigetta il piano prima che esso possa raggiungere il motore di esecuzione, scongiurando errori a runtime durante il collaudo.

### Gerarchia delle fonti e risoluzione delle ambiguità
Il Planner riceve in ingresso tre documenti eterogenei prodotti dai moduli a monte dell'ecosistema VulcAIn (`VulcaMind` e `VulcaForge`):
- `DESCRIPTION.md`: specifica discorsiva dell'ambientazione e degli obiettivi generali;
- `STORYLINE.md`: articolazione narrativa del percorso di attacco didattico;
- `WRITEUP.md`: traccia tecnica contenente i comandi per la risoluzione della challenge.

Poiché tali documenti sono generati in fasi distinte della pipeline, possono emergere divergenze tra la linea narrativa e i comandi effettivi. In assenza di vincoli, un modello generativo tenderebbe a mediare arbitrariamente tra le fonti, producendo piani incoerenti. Per risolvere questa criticità, ho introdotto nel system prompt una rigida **gerarchia di precedenza delle fonti**:
1. **Priorità 1 — `STORYLINE.md` (Autorità Strutturale e Didattica):** Definisce tassativamente quali sono le fasi, il loro ordine sequenziale e gli stati del sistema attesi. In caso di discrepanza sul flusso logico, la Storyline prevale sempre.
2. **Priorità 2 — `WRITEUP.md` (Autorità di Implementazione Sintattica):** Fornisce la sintassi precisa dei comandi, le opzioni CLI e i payload. È rigidamente subordinato alla Storyline e non può essere impiegato per inserire passaggi non previsti dalla narrativa.
3. **Priorità 3 — `DESCRIPTION.md` (Autorità di Contesto Globale):** Fornisce l'inquadramento di contorno, le credenziali di default e i pattern dei flag format.

A questa gerarchia si affianca una regola di **grounding procedurale**: ogni porta, percorso, credenziale o parametro deve derivare testualmente dai documenti di input. Quando un dato è assente (come l'indirizzo IP della macchina target o il percorso di una wordlist locale), il modello ha il divieto di allucinare valori fittizi ed è obbligato a utilizzare segnaposto espliciti e standardizzati (es. `<TARGET_IP>`), che verranno risolti a runtime dall'Orchestratore.

### Le regole costituzionali dell'oracolo
Per impedire che il Planner generi oracoli permissivi, il system prompt del modulo è stato arricchito con regole vincolanti ispirate ai principi della *Constitutional AI*:
- **Fedeltà dei connettori logici (Regola 5):** L'utilizzo di alternative disgiuntive ("o", "oppure") è categoricamente vietato, salvo nei rari casi in cui il design didattico preveda esplicitamente due percorsi d'attacco equivalenti. Ogni checklist deve operare secondo una rigorosa congiunzione logica `AND`.
- **Fedeltà al meccanismo di scoperta (Regola 6):** Se una risorsa o credenziale è qualificata come nascosta e sbloccabile solo attraverso un canale specifico (una chat, un parametro cifrato, un file di log), la checklist deve imporre la verifica di quel canale operativo specifico, rigettando accessi diretti o scorciatoie.
- **Verificabilità dell'effetto tangibile:** Ogni voce deve verificare un effetto osservabile sul target (stato del filesystem, presenza di una porta aperta, banner o token estratto), vietando l'uso dell'exit code di un processo come indicatore di successo, poiché molti tool di sicurezza (come scanner di rete o utility di brute-force) restituiscono codici di uscita non nulli anche a fronte di un'esecuzione corretta.
- **Gestione dei fallimenti intenzionali (Trap):** Nei laboratori didattici sono frequenti configurazioni volutamente vulnerabili o malformate (ad esempio chiavi private SSH esposte con permessi `0644`). In tali frangenti, il client SSH rifiuta la connessione per motivi di sicurezza: la checklist non deve pretendere il successo nominale del comando, ma verificare l'emissione dell'errore atteso, validando l'esperienza didattica senza causare falsi fallimenti.

### Dimensionamento dinamico del contesto
La generazione dell'intero Attack Plan in un'unica invocazione (dall'enumerazione preliminare fino alla flag di root, per evitare fenomeni di frammentazione) comporta un elevato consumo di token sia in ingresso che in uscita. Nei modelli locali operanti con risorse VRAM finite, questo stadio presenta il rischio concreto di troncamento dell'output a metà esecuzione (*stop per length limit*).

Per mitigare tale problematica prima ancora di interrogare il modello, ho implementato in `executor/token_utils.py` un meccanismo euristico di dimensionamento dinamico della finestra (`plan_context_length`). Il calcolo si articola in tre passaggi:

1. **Stima preventiva dei token di input:** Data la lunghezza complessiva in caratteri $C_{\text{tot}}$ dei testi di ingresso (system prompt unito a Storyline, Writeup e Description), il numero di token viene stimato per eccesso mediante un fattore di compressione conservativo $k = 3.0$ caratteri/token (calibrato su codice misto e lingua italiana):
$$T_{\text{input}} = \left\lceil \frac{C_{\text{tot}}}{k} \right\rceil + 1$$

2. **Calcolo della capacità richiesta con margine di sicurezza:** Al volume di input viene sommata la riserva dedicata all'output del piano $R_{\text{out}}$ (parametro `PLANNER_OUTPUT_RESERVE`), applicando un coefficiente di sicurezza cautelativo $\alpha = 1.15$ per assorbire eventuali fluttuazioni di tokenizzazione:
$$T_{\text{richiesti}} = \lfloor (T_{\text{input}} + R_{\text{out}}) \cdot \alpha \rfloor$$

3. **Allineamento alla KV-Cache e saturazione hardware:** Per ottimizzare l'allocazione della memoria KV-cache sul backend di inferenza, la dimensione della finestra viene arrotondata per eccesso al multiplo intero più vicino del passo $S = 2048$ token (`_CTX_STEP`), rimanendo compresa tra la finestra base del profilo di sistema $W_{\text{base}}$ e il tetto massimo invalicabile di memoria VRAM $W_{\text{max}}$ (`hard_max`):
$$W_{\text{effettiva}} = \min \left( \max \left( W_{\text{base}}, \, \left\lceil \frac{T_{\text{richiesti}}}{S} \right\rceil \cdot S \right), \, W_{\text{max}} \right)$$

Qualora $T_{\text{richiesti}} > W_{\text{max}}$, il sistema attiva un flag diagnostico di saturazione (`capped = True`), segnalando che il carico eccede la memoria fisica allocabile. Se durante l'esecuzione il piano generato dovesse risultare troncato o interrotto, il parser deterministico rigetta immediatamente il file e invalida la run, scongiurando collaudi basati su piani incompleti.

Una volta validato e trasformato nella sequenza tipizzata di `TestStep`, l'Attack Plan viene consegnato al componente responsabile di scandire e controllare l'avanzamento dell'intero workflow: l'Orchestratore.


## 3.5 L'Orchestratore: grafo di controllo e gestione dello stato

Una volta formalizzato l'Attack Plan, l'esecuzione del collaudo richiede un motore di coordinamento che scandisca la successione delle fasi, propaghi le informazioni scoperte sul campo e stabilisca in modo rigoroso quando procedere o interrompere il test. Questo compito è affidato all'**Orchestratore**.

In coerenza con il principio di impiegare codice deterministico dove l'attività è strutturata, il coordinamento del workflow **non è demandato a un modello linguistico, bensì a una macchina a stati finiti programmata in Python**. Affidare la regia del test a un LLM introdurrebbe instabilità stocastica nelle decisioni di routing e nella gestione degli errori; al contrario, un'orchestrazione algoritmica garantisce che le regole di transizione siano prevedibili, trasparenti e pienamente riproducibili.

Sul piano terminologico è opportuno distinguere due livelli: con il termine "Orchestratore" si identifica l'intero sottosistema di governo del flusso, mentre all'interno del grafo operativo tale ruolo si concretizza nel nodo specifico `orchestrator`.

### La Working Memory: `VulcaTestState`
L'intero ciclo di vita del collaudo è incardinato su una memoria di lavoro condivisa in RAM, modellata tramite la classe `VulcaTestState` in `orchestrator/state.py`. Questa struttura dati, conforme al tipo `TypedDict`, funge da *blackboard* centrale del sistema: ogni nodo riceve lo stato corrente, ne legge i parametri necessari per operare e restituisce al grafo un dizionario contenente esclusivamente i campi da aggiornare.

Oltre a gestire l'indice di avanzamento lungo il piano d'attacco e lo stato globale del collaudo (`RUNNING`, `COMPLETED`, `FAILED`), la struttura di `VulcaTestState` incapsula tre decisioni di progettazione determinanti per l'affidabilità dell'agente:
- **La blackboard dei dati convalidati (`verified_values`):** Un dizionario chiave-valore che accumula in modo incrementale le sole entità effettivamente verificate sul campo (credenziali di accesso, username, porte attive, token e flag). L'esposizione controllata di questo stato aggregato evita che l'agente debba reiterare ricognizioni già compiute nei passi precedenti, proteggendo la finestra di contesto da informazioni ridondanti.
- **La persistenza delle sessioni terminali (`sessions`):** Un registro delle shell interattive PTY allocate sulla macchina bersaglio. Questo meccanismo consente di preservare canali di accesso persistenti (ad esempio una reverse shell ottenuta in una fase iniziale) e di riutilizzarli nelle fasi successive per il movimento laterale o l'escalation dei privilegi.
- **La telemetria granulare (`node_timings`):** Un tracciatore dei tempi fisici di esecuzione (*wall-clock time*) accumulati deterministicamente da ciascun nodo, indispensabile per alimentare l'analisi quantitativa e il bilancio di efficienza affrontati nel Capitolo 5.

Lo schema tipizzato completo e la definizione formale di tutti gli attributi sono riportati in Appendice.

### Topologia del Grafo e instradamento condizionale
L'architettura di controllo è stata implementata tramite la libreria **LangGraph**, definendo uno `StateGraph` compilato che governa quattro nodi operativi (`orchestrator`, `executor`, `final_evaluator`, `healer`) interconnessi da archi orientati e funzioni di instradamento condizionale (*conditional routing*).

Il ciclo di esecuzione si articola secondo le seguenti regole di transizione:

1. **Da `START` a `orchestrator`:** Il flusso si inizializza predisponendo lo stato iniziale e puntando alla prima fase del piano (`current_step_index = 0`).
2. **Instradamento `route_orchestrator`:** Il nodo verifica l'indice corrente. Se vi sono ancora fasi da eseguire, assegna il corrispondente `TestStep` al campo `current_step`, imposta lo stato a `RUNNING` e instrada l'esecuzione verso il nodo `executor`. Se tutte le fasi del piano sono state eseguite con successo, imposta lo stato globale a `COMPLETED` e devia il flusso direttamente al `final_evaluator`.
3. **Instradamento `route_executor` e principio del Fail-Fast:** Al termine dell'esecuzione della fase da parte dell'Executor, il router analizza l'oggetto `StepResult` restituito. Se lo step è stato superato con successo (`SUCCESS`), l'Orchestratore estrae le nuove credenziali o entità scoperte arricchendo il dizionario `verified_values`, incrementa l'indice di avanzamento e riporta il flusso al nodo `orchestrator` per affrontare la fase successiva.
Se invece lo step è fallito (`FAILED`) — condizione che scatta deterministicamente qualora anche una sola voce della checklist risulti non verificata — il router attiva il meccanismo di **Fail-Fast**: l'intero collaudo viene immediatamente marcato come `FAILED` e instradato al `final_evaluator`. Interrompere tempestivamente il test in caso di fallimento risponde a una logica pedagogica e di sicurezza: poiché le fasi successive poggiano sui privilegi conquistati in quelle precedenti, proseguire l'esecuzione lungo una catena d'attacco compromessa genererebbe una cascata di errori spuri e sprecherebbe risorse di calcolo.
4. **Instradamento `route_final_evaluator` e chiusura del loop:** Il nodo `final_evaluator` redige il bilancio forense e diagnostico della run. Se lo stato è `COMPLETED`, oppure se l'opzione di autoriparazione è disabilitata (`HEALING=False`), l'esecuzione converge al nodo terminale `END`. Se invece il collaudo è fallito (`FAILED`) e l'autoriparazione è attiva, il router verifica che il numero di tentativi effettuati non abbia superato la soglia massima consentita (`MAX_HEALING_ATTEMPTS`). In caso positivo, il controllo viene trasferito al nodo `healer`.
5. **Chiusura del cerchio (`healer` verso `orchestrator`):** Una volta applicata la correzione sui sorgenti dell'infrastruttura IaC e ricompilato il container Docker, l'healer instrada nuovamente il flusso verso `orchestrator`, che provvede a rieseguire il collaudo da capo per accertare se l'intervento abbia effettivamente ripristinato la conformità didattica della macchina.

Definito il meccanismo di controllo e instradamento deterministico del workflow, la sezione successiva esplora il componente operativo più critico dell'architettura: l'Executor, incaricato di condurre le azioni di collaudo sul target senza cadere nella trappola dell'auto-certificazione.


## 3.6 L'Executor: collaudatore in-band e Auditor Mode

Se il Planner ha il compito di formalizzare la specifica di collaudo, l'**Executor** ne costituisce il braccio operativo. All'interno del workflow, l'Executor impersona il comportamento metodico di uno studente di sicurezza o di un auditor tecnico, interagendo direttamente con l'ambiente bersaglio per convalidare ciascuna fase dell'Attack Plan.

A livello micro, il modulo adotta il paradigma ciclico **ReAct** (*Reasoning + Action + Observation*), teorizzato da Yao et al. [ReAct]. A ogni iterazione, il modello linguistico riceve lo stato corrente, formula una riflessione analitica esplicita nel canale di reasoning (Chain-of-Thought), seleziona uno strumento operativo da invocare e ne analizza l'output per pianificare l'azione successiva. Tuttavia, a differenza dei sistemi agentici aperti in cui il ReAct opera in modo esplorativo e non vincolato, in VulcaTest il ciclo è rigidamente imbrigliato all'interno dei confini prescritti dal singolo `TestStep`.

La sfida ingegneristica principale nella progettazione dell'Executor non è stata consentire a un modello di eseguire comandi, bensì **impedirgli di aggirare le regole del test**. Di fronte a un ambiente parzialmente difettoso o a un comando che non produce l'esito sperato, un modello linguistico lasciato privo di barriere manifesta una naturale tendenza alla compiacenza e alla *specification gaming* [Cybench]: tende a dichiarare il successo a parole, a considerare superati controlli che non ha realmente effettuato, o a cercare scorciatoie out-of-band che snaturano la prova didattica. Per neutralizzare queste derive, ho strutturato l'Executor attorno a tre pilastri architetturali: la Modalità Auditor, il controllo dinamico del budget operativo e il ricalcolo deterministico del verdetto.

### L'Auditor Mode: prompt costituzionale e regole deontologiche
Il comportamento operativo dell'agente è disciplinato da un esteso prompt di sistema denominato **Modalità Auditor** (`Auditor Mode`). Piuttosto che un insieme di raccomandazioni euristiche, il prompt è strutturato come una vera e propria costituzione comportamentale a regole deontologiche esplicite e vincolanti, richiamando i principi del *Constitutional AI* [Constitutional AI]. 

Tali regole riflettono decisioni di progetto maturate sul campo per contrastare specifici pattern di fallimento dell'agente:

1. **Esecuzione esclusivamente in-band e certificazione del difetto:** L'agente è autorizzato a interagire con la macchina bersaglio unicamente attraverso i canali di rete, le porte aperte e i servizi esposti (approccio *black/grey box in-band*). È severamente vietato qualunque accesso *out-of-band* all'host di virtualizzazione (ad esempio invocando comandi del demone Docker sull'host per forzare riavvii, ispezionare container o visualizzare file di configurazione). Se un servizio sul target non risponde, è mal configurato o va in crash, l'Executor non deve tentare di risolverlo dall'esterno: la sua funzione istituzionale è proprio accertare e certificare l'anomalia come difetto della macchina.
2. **Giudizio vincolato all'evidenza empirica ("ESEGUI, non dedurre"):** Nessuna assunzione teorica o inferenza probabilistica è ammessa a supporto di una voce di collaudo. L'agente non può dare per soddisfatto un requisito perché "ovvio", perché deducibile dal contesto o perché emerso in una fase passata: ogni punto della checklist esige l'esecuzione diretta del rispettivo comando di verifica nella sessione corretta e la contestuale lettura dell'evidenza testuale nei log di ritorno. 
Il principio impone inoltre una **simmetria dell'onere della prova**: così come il successo esige una prova positiva, anche la dichiarazione di fallimento richiede un riscontro oggettivo (un messaggio di errore esplicito o l'esito negativo di un controllo mirato), impedendo all'agente di arrendersi o dedurre un malfunzionamento dalla sola assenza passiva di segnale senza aver prima ritentato o indagato attivamente la causa.
3. **Consapevolezza dell'ambiente (Host Awareness) e igiene del terminale (TTY Hygiene):** Operando simultaneamente su più macchine (la postazione attaccante Kali Linux e il container target), l'agente deve verificare sistematicamente il prompt restituito dal terminale (`kali@kali` rispetto al prompt utente o root del bersaglio) prima di inviare comandi, scongiurando l'esecuzione accidentale di exploit o script locali sulla macchina di attacco. Inoltre, in caso di prompt di autenticazione bloccanti (richieste di password sconosciute su comandi `sudo` o `su`), l'agente ha l'obbligo di esaurire i tentativi mediante invii a vuoto anziché trasmettere combinazioni di interruzione come `Ctrl+C`, che causerebbero la chiusura immediata della reverse shell sottostante. Analogamente, prima di concludere la fase, l'agente deve forzare l'uscita ordinata da qualsiasi interfaccia a schermo intero (come gli editor `nano` o `vim`), ripristinando il terminale a un prompt shell pulito.
4. **Disciplina economica dei turni:** Ogni invocazione di uno strumento e ogni input trasmesso al terminale consuma esattamente un turno del budget di fase, incentivando l'agente a un'esecuzione lineare priva di ridondanze o comandi fittizi.

### Gestione dinamica del budget: Graceful Nudge e Checkpoint
Nelle architetture ad agenti autonomi, la gestione del ciclo di vita dei turni presenta un classico compromesso: un limite di passi troppo rigido rischia di troncare catene di exploit articolate prima del completamento, mentre l'assenza di tetti espone a loop infiniti e sprechi di token.

Per conciliare flessibilità operativa e terminazione garantita, ho implementato un modello di budget adattivo:
- **Budget iniziale ed estensioni controllate:** A ciascuna fase viene assegnato un budget iniziale predefinito di 8 turni. Se la sequenza operativa richiede ulteriori passaggi empirici, l'agente può richiedere una proroga incrementale invocando il tool interno `request_turn_extension`, fino al raggiungimento di un tetto massimo invalicabile fissato a 20 turni (`EXECUTOR_HARD_LIMIT`).
- **Il Graceful Nudge (Sollecito Conservativo):** Quando il contatore dei turni si avvicina alla soglia critica (esattamente a 2 turni dalla conclusione del budget corrente), il sistema inietta automaticamente nel contesto un messaggio di sistema che funge da sollecito procedurale. Il messaggio avverte l'agente dell'imminente esaurimento dei passi, spronandolo a valutare lo stato dell'azione: se l'operazione sta progredendo regolarmente, l'agente viene invitato a richiedere per tempo l'estensione dei turni; se invece rileva un blocco oggettivo non superabile sul target, viene esortato a non sprecare turni e a procedere direttamente alla chiusura con fallimento.
- **Il Checkpoint di fine budget:** Raggiunto l'ultimo turno disponibile senza che sia stato emesso un verdetto, un secondo avviso vincolante costringe l'agente a una biforcazione formale: richiedere un'ulteriore proroga motivata (se il tetto massimo non è ancora stato raggiunto) oppure dichiarare conclusa la fase. In questo modo si azzerano le terminazioni accidentali dovute a disattenzione sul consumo dei passi.

### I Tool Interni e il recupero a due stadi dei dati convalidati
L'Executor non si interfaccia unicamente con gli strumenti di sicurezza esterni, ma dispone di un corredo di **tool interni integrati** dedicati alla governance del processo e alla gestione ottimale del contesto:
- `submit_step_result`: tool obbligatorio di chiusura con cui l'agente certifica la conclusione della fase, trasmettendo il verdetto, la valutazione della checklist e i dati estratti;
- `request_turn_extension`: tool con cui l'agente negozia l'aggiunta di turni operativi prima dell'esaurimento del budget corrente;
- `show_verified_values` e `get_verified_value`: coppia di strumenti che realizza un pattern di **recupero a due stadi (Two-Stage Lazy Retrieval)** delle entità convalidate.

La gestione dello storico delle credenziali rappresenta un elemento critico per i modelli locali a contesto ristretto: riversare integralmente all'inizio di ogni fase tutte le password, gli hash, le chiavi SSH e le flag scoperte nei passi precedenti saturerebbe rapidamente la finestra di token, inducendo distrazioni o allucinazioni. Per evitare questo fenomeno di *context bleeding*, il sistema inietta nel prompt di fase unicamente le *chiavi identificative* delle variabili note (es. `['ssh_user', 'web_admin_password']`). Qualora l'agente necessiti del valore puntuale per condurre un attacco, invoca `get_verified_value` specificando la chiave di interesse, risolvendo il dato puntuale on-demand. Questa separazione tra metadati visibili e contenuti dereferenziati garantisce un consumo di contesto estremamente compatto e costante lungo tutta la catena di collaudo.

### Il contratto `StepResult` e la No-Self-Certification nel codice
Il passaggio conclusivo della fase avviene quando l'agente invoca formalmente lo strumento `submit_step_result`. L'input fornito dal modello viene elaborato dal metodo `_build_step_result` in `executor/executor.py`, che lo traduce nell'oggetto fortemente tipizzato `StepResult`.

La struttura di `StepResult` riflette il principio della trasparenza forense:
- Raccoglie l'identificativo dello step (`step_id`), la sintesi descrittiva delle azioni condotte (`summary`) e il dizionario delle entità estratte (`extracted_values`);
- Incapsula la telemetria completa della fase: la lista dettagliata delle chiamate ai tool (`tool_calls`), i turni effettivi consumati (`turns_used`) e il computo granulare dei token elaborati (`input_tokens`, `output_tokens`, `total_tokens`);
- Registra la lista `checklist_evaluation`, composta da istanze tipizzate di `ChecklistItemResult`, in cui ciascuna voce della checklist originale viene associata al rispettivo esito booleano (`passed: bool`) e all'evidenza testuale obbligatoria (`evidence: str`).

È in questo esatto frangente architetturale che trova la sua attuazione più rigorosa il secondo principio di progettazione: **il rifiuto dell'auto-certificazione garantito dal codice**.

Nonostante il modello linguistico sia chiamato a esprimere un proprio giudizio sintetico iniziale nel campo `status`, il codice Python non si fida della dichiarazione dell'agente. Immediatamente prima di istanziare l'oggetto finale, la logica deterministica di `_build_step_result` esamina iterativamente ciascuna voce contenuta in `checklist_evaluation`:

```python
status = parsed.get("status", "FAILED")
if any(not c.passed for c in checklist_eval):
    status = "FAILED"
```

Se anche un solo controllo della checklist presenta un valore `passed` pari a `False`, oppure risulta privo della necessaria evidenza empirica nei log, il codice **sovrascrive d'autorità lo stato forzandolo a `FAILED`**, ignorando qualunque proclamazione di successo generata dall'LLM. 

La conformità didattica non è dunque una concessione verbale del modello, ma un invariante matematico applicato dal codice. Come teorizzato nel framework MetaGPT [MetaGPT], la formalizzazione delle interazioni attraverso contratti strutturati tipizzati disinnesca l'ambiguità del linguaggio naturale, trasformando un agente probabilistico in un componente di collaudo affidabile e riproducibile.

Per poter interagire materialmente con la macchina bersaglio, l'Executor deve tuttavia poter disporre di strumenti capaci sia di operare sulla rete sia di mantenere sessioni terminali interattive. Questo strato di mediazione operativa costituisce il Bridge, analizzato nella sezione successiva.


## 3.7 Il Bridge: mediazione operativa, livelli di esecuzione e interazione interattiva

L'Executor non interagisce direttamente con l'ambiente bersaglio né con la macchina attaccante: tra la logica decisionale del modello e il sistema operativo si interpone un componente software dedicato, denominato **Bridge** (`executor/mcp_bridge.py`). 

Sul piano architetturale, il Bridge non costituisce un nodo autonomo del grafo di orchestrazione, bensì il sottosistema specialistico di *digital grounding* dell'Executor [CoALA]. Il suo ruolo è duplice: implementa il pattern strutturale *Façade / Adapter*, aggregando backend operativi eterogenei e mascherandone la complessità dietro un catalogo unificato di tool, e al contempo funge da membrana bidirezionale tra il mondo simbolico dell'LLM (fatto di stringhe e token) e il mondo fisico del sistema operativo (fatto di socket, processi Unix e sequenze di controllo del terminale).

Il Bridge articola la propria azione su due canali complementari: il **canale dell'azione** (smistamento dell'input e invocazione dei comandi) e il **canale della percezione** (bonifica, interpretazione e adattamento dinamico dell'output).

### Canale dell'azione: l'architettura a due livelli (L1 vs L2)
Nel penetration testing didattico convivono due tipologie di operazioni radicalmente differenti: attività di ricognizione di rete e scansione, che si prestano a un'esecuzione atomica *fire-and-forget*, e manovre di intrusione, exploit o privilege escalation, che esigono un terminale interattivo persistente capace di gestire prompt di password, navigazione di filesystem e shell remote.

Per riconciliare queste esigenze, ho strutturato gli strumenti esposti dal Bridge su due livelli operativi distinti:

```
                      ┌──────────────────────┐
                      │  VulcaTest Executor  │
                      └──────────┬───────────┘
                                 │ Invocazione tool
                                 ▼
                      ┌──────────────────────┐
                      │      MCP Bridge      │
                      └────┬────────────┬────┘
                           │            │
       [Livello 1: Stateless]            [Livello 2: Stateful]
              Chiamata HTTP                      Chiamata REST
              porta 8888                         porta 8889
                   │                                  │
                   ▼                                  ▼
         ┌──────────────────┐               ┌──────────────────┐
         │ HexStrike Server │               │ Terminal Gateway │
         │ (FastMCP Client) │               │(FastAPI + pexpect)
         └─────────┬────────┘               └─────────┬────────┘
                   │                                  │
                   │ nmap, hydra, curl                │ sessioni PTY persistenti,
                   │ comandi one-shot                 │ reverse shell, TUI editor
                   ▼                                  ▼
         ┌─────────────────────────────────────────────────────┐
         │       Ambiente Operativo Kali Linux & Target        │
         └─────────────────────────────────────────────────────┘
```

1. **Livello 1 (L1) — Tool Stateless via HexStrike (Porta 8888):**
   Rappresenta l'interfaccia verso gli strumenti classici di sicurezza offensiva (`nmap`, `hydra`, `gobuster`, `nikto`, `curl`), erogati tramite un server FastMCP basato su **HexStrike** in esecuzione sulla macchina Kali Linux. L'interazione avviene tramite client HTTP sincrono: l'Executor invoca il tool specificando i parametri, il server HexStrike avvia il binario su Kali, ne attende la conclusione, cattura stdout e stderr e restituisce il pacchetto di risposta.
   La caratteristica distintiva del Livello 1 è la sua natura *stateless*: ogni comando viene eseguito in un processo isolato che termina immediatamente dopo aver restituito l'output. Questo modello è ideale per compiti di scansione ed enumerazione ad alto rendimento, ma risulta strutturalmente incapace di sostenere flussi che richiedono memoria di stato, autenticazioni interattive o sessioni continuative.

2. **Livello 2 (L2) — Terminal Gateway e Shell PTY Persistenti (Porta 8889):**
   Per superare l'intrinseco limite dei comandi stateless, ho sviluppato un microservizio dedicato denominato **Terminal Gateway** (`terminal_gateway/terminal_gateway.py`), basato su framework FastAPI e in esecuzione sulla macchina Kali. Il gateway sfrutta la libreria Linux `pexpect` per istanziare e gestire pseudo-terminali Unix autentici (PTY/TTY).
   Attraverso il tool `interactive_terminal_exec`, l'Executor dispone di funzionalità avanzate:
   - **Persistenza dello stato:** Una sessione terminale aperta rimane allocata in memoria tra turni consecutivi e attraverso le diverse fasi dell'Attack Plan. Questo consente di preservare variabili d'ambiente, directory di lavoro correnti, contesti di autenticazione e, soprattutto, reverse shell stabilizzate.
   - **Gestione multi-sessione e concorrenza (`session_name`):** Il Bridge consente all'agente di istanziare molteplici terminali indipendenti e paralleli, identificati da un'etichetta arbitraria. Questa capacità è essenziale per gli scenari di exploit asincroni: l'agente può predisporre un listener in ascolto (`nc -lvnp`) in primo piano su una sessione dedicata (`session_name='listener'`), mentre su un'altra sessione (`session_name='default'`) lancia il trigger che attiva il payload web verso il target, per poi ritornare sulla sessione del listener a raccogliere e stabilizzare la shell ottenuta.

### Canale della percezione: bonifica, telemetria e prompt injection attiva
Il Bridge non si limita a inoltrare i comandi, ma pre-elabora sistematicamente il flusso di ritorno per renderlo intelligibile e sicuro per la context window del modello linguistico:
- **Bonifica delle sequenze ANSI/VT100:** L'output grezzo catturato da una sessione PTY contiene una notevole quantità di sequenze di escape dedicate al colore, al posizionamento del cursore e al ridisegno dello schermo. Il Bridge applica una regex compilata che depura il testo da tutti i codici di controllo, normalizzando i caratteri di a capo (`\r\n` $\rightarrow$ `\n`), restituendo all'LLM un testo chiaro e privo di rumore sintattico.
- **Rilevamento euristico dei prompt di autenticazione:** Se la lettura del terminale si interrompe su una riga che richiede una credenziale (rilevando parole chiave quali `password`, `passphrase`, `enter pin`, `sudo`), e il processo risulta ancora vivo senza aver rilasciato un prompt di shell, il Bridge inietta automaticamente in calce all'output un avviso diagnostico (`[⚠️ PROMPT PASSWORD ATTIVO]`). L'avviso istruisce il modello sul comportamento da adottare al turno successivo: inviare la password se nota nei `verified_values`, oppure trasmettere un `enter` a vuoto per abortire l'autenticazione in sicurezza, impedendo l'uso accidentale di comandi di interruzione distruttivi.
- **Adattamento dinamico delle descrizioni dei tool a runtime:** Prima di inoltrare l'elenco dei tool all'Executor (`get_tools_for_step`), il Bridge ne riscrive dinamicamente le descrizioni in funzione dello stato corrente. Se sono attive sessioni PTY remote, la descrizione di `interactive_terminal_exec` viene arricchita con la lista delle sessioni disponibili (`[⚠️ SESSIONI PTY ATTIVE: ['default', 'listener']]`), mentre la descrizione del tool stateless `execute_command` viene marcata con un avviso esplicito che ne sconsiglia l'uso per comandi destinati al bersaglio. In questo modo le regole di contesto raggiungono il modello esattamente nel momento in cui deve operare la scelta.

### Governo del contesto: troncamento e tool-slicing
La gestione della finestra di contesto rappresenta un vincolo critico, in particolare quando si impiegano modelli locali con budget di memoria limitati. Comandi di ricognizione estesi (come un'istruzione `find / -perm -4000 2>/dev/null` eseguita sull'intero filesystem) possono produrre migliaia di righe di testo, saturando istantaneamente la memoria dell'agente.

Per garantire la stabilità dell'harness, il Bridge implementa due misure di salvaguardia:
1. **Troncamento proporzionale degli output (`MAX_TOOL_OUTPUT_CHARS = 8000`):** Qualora l'output di un comando superi la soglia prestabilita di 8.000 caratteri, il Bridge non si limita a tagliare la coda del testo, ma applica una politica di troncamento intelligente: preserva la testa e la coda del messaggio (dove solitamente risiedono il comando iniziale e gli errori conclusivi), inserendo al centro un marcatore esplicito:
   ```text
   [... TRUNCATED 14520 CHARS; USE MORE SPECIFIC COMMANDS (e.g. grep, head, tail, or limit scope) ...]
   ```
   L'avviso fornisce contestualmente all'agente un'indicazione operativa su come rifinire la ricerca senza saturare il contesto.
2. **Tool-Slicing mirato (`allowed_tools`):** Il catalogo complessivo di HexStrike comprende oltre cento strumenti di sicurezza. Inviare all'LLM l'intera specifica JSON di tutti i tool ad ogni turno comporterebbe un overhead di diverse migliaia di token di sistema. Il metodo `get_tools_for_step` attua una proiezione mirata: confronta l'elenco `allowed_tools` definito nel `TestStep` corrente con il registro degli strumenti disponibili, esponendo al modello esclusivamente i tool autorizzati per quella fase didattica, oltre ai tool universali di default (`interactive_terminal_exec` ed `execute_command`).

A queste misure si affianca un **watchdog a timeout adattivo** (`wait_utils`), che nell'interazione con il PTY non attende un intervallo temporale prefissato, ma monitora il flusso di dati campionando a intervalli regolari: un'operazione viene considerata terminata solo quando il terminale entra in una finestra di *silenzio* (assenza di nuovo output) o quando viene riscontrato un pattern di arresto atteso (`stop_pattern`).

### Supporto ad editor interattivi e comandi a schermo intero (TUI)
Un limite storico nell'interazione tra modelli linguistici e sistemi operativi riguarda l'incapacità degli agenti di operare su programmi visuali interattivi a schermo intero (TUI, *Terminal User Interface*), quali gli editor di testo (`nano`, `vi`, `vim`) o i visualizzatori a scorrimento (`less`, `more`). 

Un LLM produce nativamente sequenze di testo alfanumerico standard; al contrario, un'applicazione TUI basata su librerie come `curses` non legge linee di testo da standard input, ma cattura eventi di tastiera a basso livello e sequenze di escape raw del terminale. Se un agente invoca `nano /etc/passwd` per completare una fase di privilege escalation, i normali comandi inviati tramite stringhe standard falliscono o provocano il blocco irreversibile della sessione.

Per colmare questo scarto tecnologico, ho dotato il Bridge di un motore di emulazione dei tasti speciali (`SPECIAL_KEYS_MAP`):
- Il driver accetta nomi simbolici di tasto (`enter`, `esc`, `tab`, `backspace`, frecce direzionali `up`, `down`, `left`, `right`, combinazioni `ctrl+x`, `ctrl+o`) e li converte nelle corrispondenti sequenze di byte conformi allo standard VT100/ANSI prima di trasmetterli allo pseudo-terminale PTY;
- Consente la trasmissione atomica di macro ordinate tramite il parametro array `commands: [...]`, permettendo all'agente di compiere modifiche, salvataggi e uscite da un editor in un singolo turno operativo.

Il livello di fedeltà richiesto da questo meccanismo emerge chiaramente nel caso specifico dell'editor `nano`. In ambiente terminale interattivo canonico, l'invio del convenzionale carattere di fine riga Unix `\n` (Line Feed, ASCII 10) non corrisponde alla pressione del tasto Invio, bensì alla combinazione di controllo `^J`. All'interno di `nano`, `^J` attiva la funzione interna di giustificazione e riformattazione del testo (*Justify*), alterando irreversibilmente i rientri del file senza andare a capo. Il Bridge intercetta sistematicamente ogni istruzione di invio e la traduce nel byte di Carriage Return `\r` (ASCII 13), emulando fedelmente il comportamento fisico della tastiera umana.

Grazie a questa mediazione trasparente, l'Executor è in grado di operare con pari naturalezza sia su comandi di rete complessi sia su editor visuali a tutto schermo, mantenendo l'integrità delle sessioni e la continuità del collaudo.

Una volta completate tutte le fasi dell'Attack Plan, o qualora l'Orchestratore abbia interrotto il test a seguito di una non conformità, il flusso converge sul componente deputato a tirare le somme forensi dell'intera esecuzione: il Final Evaluator.


## 3.8 Il Final Evaluator: metrologia deterministica e Root Cause Analysis

Il **Final Evaluator** costituisce il nodo terminale dell'architettura di collaudo: viene invocato dall'Orchestratore al termine della catena di fasi (in caso di completamento dell'intero piano) oppure immediatamente a valle del primo fallimento (per effetto del principio di Fail-Fast). Il suo compito istituzionale è tirare le somme dell'intera esecuzione, calcolare gli indicatori quantitativi di prestazione e condurre un'analisi diagnostica approfondita sulle eventuali anomalie emerse.

Sul piano progettuale, la realizzazione del Final Evaluator risponde a una tensione fondamentale tra due requisiti operativi antitetici:
- Da un lato, le metriche sperimentali che alimentano la valutazione scientifica del sistema (tassi di completamento, tempi fisici di esecuzione, volumi di token elaborati) devono essere rigorosamente esatte, prive di variabilità stocastica e pienamente riproducibili;
- Dall'altro lato, la comprensione delle cause radice di un guasto infrastrutturale (*Root Cause Analysis*, RCA) e la formulazione di indicazioni correttive richiedono capacità di sintesi semantica e correlazione logica, prerogative tipiche dei modelli generativi.

Per conciliare questi due aspetti senza compromettere la validità scientifica dell'oracolo, ho articolato il Final Evaluator in una **struttura a due stadi sequenziali**, applicando ancora una volta il principio di affidare al codice ciò che deve essere deterministico e all'LLM ciò che richiede interpretazione qualitativa.

Inoltre, coerentemente con il principio di separazione delle responsabilità (*Separation of Concerns*), la diagnosi delle cause viene condotta unicamente in questa fase conclusiva: durante il collaudo l'Executor si concentra esclusivamente sulla verifica empirica dei comandi sul target, mentre al Final Evaluator spetta l'analisi globale retrospettiva sull'intero quadro delle evidenze raccolte.

### Stadio 1 (Deterministico): Metrologia e `run_summary.json`
Il primo stadio opera in modo puramente algoritmico in Python, senza invocare alcun modello linguistico. Il nodo aggrega i dati accumulati nella memoria condivisa (`VulcaTestState`), analizza la cronologia degli `StepResult` e computa deterministicamente il bilancio quantitativo della sessione:
- Calcola il tasso di avanzamento effettivo del test (*Progress Rate*, espresso come rapporto tra checkpoint superati e requisiti complessivi del piano didattico);
- Ripartisce con precisione millimetrica i tempi fisici di esecuzione (*wall-clock timings*), separando la fase di setup iniziale, il tempo speso per ciascun nodo del grafo (`by_node`) e la durata netta delle interazioni di rete sui tool esterni;
- Traccia la contabilità analitica dei token consumati, aggregando input, output e totali per ciascun attore del workflow (Planner, Executor suddiviso per singola fase, Evaluator e Healer).

Tutte queste risultanze vengono serializzate su disco nel file **`run_summary.json`**. Questo documento costituisce il contratto formale di metrologia su cui si fonda l'intera valutazione sperimentale descritta nel Capitolo 5. Delegare il calcolo delle metriche a codice Python garantisce l'assoluta integrità dei dati numerici, proteggendo il benchmark da allucinazioni o approssimazioni di calcolo.

### Stadio 2 (LLM): `REPORT.md` e Triage dell'Oracolo (`healing_ticket.json`)
Il secondo stadio impiega un modello linguistico locale a cui vengono forniti come base di analisi tre elementi strutturati: l'Attack Plan intenzionale, la cronologia degli output registrati e il dettaglio dello step bloccante estratto dallo Stadio 1. L'LLM opera a bassa temperatura ($T = 0.2$) senza vincoli di troncamento, producendo due distinti artefatti:

1. **La Relazione Forense Ufficiale (`REPORT.md`):**
   Un documento esaustivo e leggibile dall'operatore umano, strutturato secondo uno schema a cinque sezioni obbligatorie: *Executive Summary* e certificazione di conformità, *Metriche Quantitative (KPI)*, *Analisi Forense delle Fasi Eseguite*, *Root Cause Analysis (RCA)* dell'anomalia e *Azioni Correttive Raccomandate*. La diagnosi non è lasciata alla fantasia del modello, ma scaturisce dalla comparazione puntuale tra il comportamento didattico atteso e i riscontri di rete effettivi.

2. **Il Ticket di Autoriparazione (`healing_ticket.json`):**
   Se la macchina ha superato integralmente il collaudo, il processo termina senza generare ulteriori file. Se invece il test ha certificato una non conformità, il Final Evaluator sintetizza il problema in un contratto JSON formalizzato, espressamente concepito per essere consumato dal modulo di autoriparazione VulcaHealing (Capitolo 4).

All'interno di questo ticket, la scelta progettuale più innovativa risiede nel meccanismo di **triage e classificazione della natura del difetto**, che tutela l'integrità dell'oracolo di collaudo [SWE-Bench Pro]:
- Se la macchina è oggettivamente malfunzionante (un servizio non avviato, permessi errati sul filesystem, un task Ansible omesso), il difetto viene classificato come anomalia di macchina (`IAC_GENERATION_DEFECT` o `CONFIG_DEFECT`). In questo caso, il ticket indica il file sorgente impattato e raccomanda la specifica patch infrastrutturale.
- Se invece la macchina bersaglio si comporta in modo perfettamente lecito e coerente con la realtà sistemistica, ma è la voce della checklist formulata dal Planner a pretendere un output errato o irrealistico, il problema viene formalmente classificato come difetto della specifica didattica (**`SPECIFICATION_DEFECT`**).

Questa distinzione disinnesca il rischio più insidioso dei sistemi autonomi a ciclo chiuso: la "falsa riparazione". Senza un triage preventivo dell'oracolo, l'agente riparatore tenterebbe di alterare e corrompere un'infrastruttura di per sé corretta al solo scopo di assecondare un test errato. Imponendo la classificazione `SPECIFICATION_DEFECT`, il Final Evaluator blocca l'applicazione di patch indebite, notificando che la macchina didattica è sana e che la correzione deve essere applicata a monte, sui documenti di specifica pedagogica.

Con la generazione di `run_summary.json`, `REPORT.md` e dell'eventuale `healing_ticket.json`, si conclude il **Movimento A** dell'architettura di VulcaTest, dedicato alla topologia del sistema e al flusso di controllo tra i nodi. Nella seconda parte del capitolo (**Movimento B**), l'attenzione si sposta sulle sfide trasversali di ingegneria dell'harness: come governare sperimentalmente i prompt di sistema e come calibrare l'infrastruttura di inferenza locale per sostenere il collaudo.


## 3.9 Prompt engineering come metodo e processo sperimentale

Accanto alla scrittura del codice e alla definizione delle macchine a stati del grafo, una parte sostanziale dello sviluppo ha riguardato la formulazione dei prompt di sistema per i nodi dotati di modelli linguistici (Planner, Executor, Final Evaluator e Healer). 

È opportuno chiarire una distinzione concettuale fondamentale: l'attività svolta **non è una procedura di fine-tuning**. Non sono stati modificati i pesi sinaptici dei modelli, né sono stati condotti addestramenti supervisionati o percorsi di allineamento tramite Reinforcement Learning (RLHF). L'approccio adottato ricade interamente nell'ambito del *mechanism engineering*: il modello linguistico è trattato come un motore di inferenza immutabile, attorno al quale viene costruita un'infrastruttura di vincoli, convenzioni sintattiche e regole procedurali capace di guidarne deterministicamente l'output verso gli standard richiesti dal collaudo.

### Il ciclo iterativo: test, fallimento empirico e regola
La stesura dei prompt non è avvenuta come esercizio di scrittura a tavolino, ma secondo una rigorosa metodologia sperimentale analoga a una ricerca di iperparametri (*hyperparameter search*) [Prompt Report]. Ciascuna regola introdotta nei prompt non è frutto di un'ipotesi astratta, ma costituisce la risposta ingegneristica diretta a uno specifico fallimento osservato sul campo:

```
    ┌────────────────────────┐
    │  Esecuzione del test   │
    │  su macchina bersaglio │
    └───────────┬────────────┘
                │
                ▼
    ┌────────────────────────┐
    │ Rilevamento anomalia / │
    │  deriva comportamentale│ (scorciatoia, allucinazione, blocco TUI)
    └───────────┬────────────┘
                │
                ▼
    ┌────────────────────────┐
    │ Isolamento della causa │
    │ e formulazione regola  │ (vincolo deontologico o formato rigido)
    └───────────┬────────────┘
                │
                ▼
    ┌────────────────────────┐
    │ Iniezione nel prompt e │
    │  re-test di convalida  │
    └────────────────────────┘
```

Il punto di partenza di questa evoluzione è stato il contrasto del cosiddetto **cheating agent**: un modello linguistico dotato di strumenti e istruito genericamente a "collaudare la macchina" tende naturalmente ad adottare il percorso di minima resistenza computazionale. Nelle prime sperimentazioni sono emersi comportamenti anomali ricorrenti:
- Dichiarazioni arbitrarie di successo senza aver eseguito i comandi di controllo;
- Conclusione affrettata della fase di fronte al primo ostacolo;
- Tentativi di eludere il percorso didattico invocando comandi distruttivi o accedendo all'host di virtualizzazione;
- Blocco irreversibile del terminale causato dall'apertura di editor interattivi senza sequenze di uscita.

Ogni singola iterazione di sviluppo ha isolato uno di questi comportamenti indesiderati, traducendolo in una specifica clausola vincolante inserita nel prompt del rispettivo nodo.

### La forma costituzionale dei prompt
Invece di affidarsi a lunghe istruzioni discorsive o a formulazioni descrittive (che i modelli tendono a interpretare con eccessiva elasticità), i prompt di VulcaTest sono stati strutturati secondo il paradigma della **Constitutional AI** [Constitutional AI]. 

Il prompt opera come una vera e propria carta costituzionale per l'agente: articola i requisiti in principi deontologici numerati, definisce divieti perentori, stabilisce l'onere della prova e impone formati di risposta standardizzati. Il valore di questo approccio risiede nella sua natura non negoziabile:
- Nel **Planner** (§3.4), la costituzione impone la congiunzione logica `AND` per ogni voce di checklist, la fedeltà al canale di scoperta e il divieto categorico di assumere l'exit code come oracolo;
- Nell'**Executor** (§3.6), l'Auditor Mode prescrive l'interazione esclusivamente in-band, sancisce la regola fondamentale "ESEGUI, non dedurre", vincola il verdetto alla presenza di evidenze testuali e impone l'igiene dei terminali PTY;
- Nell'**Healer** (approfondito nel Capitolo 4), il prompt vincola la riparazione a preservare le vulnerabilità volute e a rispettare il principio della correzione minima necessaria (*no leakage* didattico).

La specificazione dei prompt ha trasformato componenti stocastici opachi in operatori prevedibili, capaci di integrarsi stabilmente con le componenti deterministiche del software.

I testi integrali e non compressi di ciascun prompt di sistema sono documentati dettagliatamente in Appendice. Nella sezione seguente viene invece esaminato il substrato computazionale dell'intero sistema: la scelta del modello locale e l'ottimizzazione dell'infrastruttura di inferenza.

---

## 3.10 Il Modello Locale e l'Infrastruttura di Inferenza

L'efficacia operativa di un'architettura agentica non dipende unicamente dalla logica di orchestrazione o dal rigore dei prompt costituzionali, ma poggia sul substrato computazionale su cui avviene l'inferenza. Nel contesto di VulcaTest, la scelta e la configurazione del modello linguistico non hanno rappresentato una decisione accessoria, bensì una specifica sfida di *model and inference engineering*, finalizzata a conciliare l'autonomia operativa richiesta dalle attività di penetrazione e collaudo con i vincoli fisici di una postazione di lavoro dedicata.

### La motivazione: guardrail di frontiera, riservatezza e sostenibilità

La decisione di basare VulcaTest su un modello linguistico ospitato localmente, anziché fare affidamento su API cloud di modelli di frontiera (quali OpenAI GPT-4, Anthropic Claude o Google Gemini), è scaturita da due motivazioni primarie riscontrate durante le prime fasi del progetto:

1. **Il blocco sistematico causato dai safety guardrail**: i modelli proprietari commerciali sono sottoposti a rigidi protocolli di allineamento e filtraggio dei contenuti (RLHF e filtri di moderazione pre- e post-inferenza). Quando l'agente tenta di eseguire attacchi informatici realistici — come la formulazione di payload di SQL Injection, l'invocazione di reverse shell, la scansione massiva di porte o lo sfruttamento di vulnerabilità note — i guardrail di frontiera intervengono bloccando la richiesta e restituendo messaggi di rifiuto categorico (*"This request was blocked by safety filters on security-related queries"*). Questo fenomeno rende impossibile condurre un collaudo continuo e automatizzato, costringendo lo sviluppatore a un continuo ed estenuante lavoro di *adversarial prompt engineering* o a interruzioni repentine del workflow. L'inferenza locale su pesi aperti elimina alla radice questa censura contestuale, permettendo all'agente di operare nel perimetro didattico autorizzato senza interferenze esterne.
2. **La sostenibilità economica e l'economia di scala**: il collaudo approfondito di macchine vulnerabili è un'attività ad altissima intensità di token. L'interazione ReAct multi-turno, l'acquisizione di output di shell voluminosi e l'iterazione su molteplici macchine e fasi comportano scambi continui di contesto. Nei soli test di sviluppo e validazione del sistema sono stati transitati oltre 14,3 milioni di token complessivi (circa 12,9 milioni in input e 1,4 milioni in generazione). Se gestito tramite chiamate a servizi commerciali con tariffazione a consumo, questo volume avrebbe comportato un costo stimato equivalente a circa $6,58 per le sole esecuzioni di prova. Un modello locale, al contrario, abbatte drasticamente i costi marginali per token, consentendo di ripetere i test all'infinito senza preoccupazioni di budget.

In merito al profilo economico, è doverosa una precisazione metodologica: l'inferenza locale non può essere considerata a "costo zero" in senso assoluto, poiché permangono i costi fissi di ammortamento dell'hardware di calcolo e l'assorbimento di potenza elettrica della scheda grafica durante i carichi prolungati. Tuttavia, essa garantisce un costo marginale prevedibile ed estremamente ridotto, elemento cruciale per rendere il sistema replicabile all'interno di un laboratorio universitario o in una pipeline di Continuous Integration.

### Esplorazione e selezione dell'architettura: il fallimento dell'approccio act-only

La ricerca del modello idoneo ha richiesto una valutazione empirica comparativa tra diverse famiglie architetturali di dimensioni compatibili con l'hardware a disposizione (stazione di lavoro dotata di una singola GPU consumer con 24 GB di VRAM):

- **Modelli di grandi dimensioni (70B+)**: modelli con un volume di parametri pari o superiore a 70 miliardi, pur esibendo ottime capacità di comprensione, hanno mostrato tempi di generazione intollerabili (inferiori a 3-5 token al secondo con quantizzazioni spinte su una singola GPU). Poiché il ciclo ReAct dell'Executor richiede frequenti interazioni a turni serrati, una tale latenza rendeva il collaudo di una singola fase eccessivamente prolungato nel tempo (wall-clock time insostenibile).
- **Modelli specializzati nel codice senza CoT (Qwen Coder)**: un tentativo sperimentale significativo ha riguardato l'adozione di Qwen Coder, modello verticalizzato sulla sintassi e sulla programmazione ma privo di meccanismi nativi di Chain-of-Thought (CoT) esteso. L'esito ha evidenziato il tipico fallimento del paradigma *act-only*: privato di una fase di riflessione esplicita prima di agire, il modello tendeva a generare immediatamente comandi shell impulsivi, ricadendo in loop infiniti di fronte a errori o risposte inattese del terminale (ad esempio ripetendo lo stesso comando errato con micro-variazioni sintattiche, senza comprendere la causa del blocco).

La configurazione ottimale è stata individuata nel modello **Qwen 3.8 27B** (in variante con quantizzazione GGUF e allineamento RCO — *Reasoning and Code Optimization*). Questa classe di parametri si è dimostrata il punto di equilibrio perfetto: offre una capacità di astrazione concettuale sufficiente a interpretare piani di collaudo complessi e a diagnosticare risposte di shell ostiche, mantenendo al contempo un throughput di generazione elevato (superiore a 25-30 token al secondo) su una singola GPU commerciale.

### Chain-of-Thought e bilanciamento del reasoning effort

L'adozione della Chain-of-Thought [Chain-of-Thought] si è rivelata una condizione indispensabile per il successo dell'Executor. Il processo logico con cui l'agente analizza l'output del Bridge, confronta i dati ottenuti con le aspettative del `TestStep` e formula il comando successivo necessita di uno spazio di elaborazione simbolica (*scratchpad*) prima dell'emissione del payload o del verdetto finale.

Tuttavia, nei modelli dotati di ragionamento integrato (*reasoning models*), un'eccessiva verbosità di pensiero comporta due gravi controindicazioni: una rapida saturazione della finestra di contesto disponibile e un consumo sproporzionato di tempo per deduzioni filosofiche non necessarie al collaudo operativo. Per governare questo comportamento, ho introdotto una calibrazione differenziata del parametro di sforzo cognitivo (`reasoning_effort`):

- **Livello `medium` per il Planner e per l'Executor**: consente all'agente di vagliare attentamente le precondizioni, pianificare la sequenza di attacco e interpretare con sufficiente profondità i messaggi di errore restituiti dalla macchina bersaglio prima di invocare il tool successivo;
- **Livello `low` per il Final Evaluator**: nella fase di valutazione finale e sintesi diagnostica, i dati empirici e le telemetrie sono già stati integralmente raccolti nello stato. Un ragionamento breve e stringente evita derive speculative nell'attribuzione delle cause di fallimento, costringendo l'LLM a limitarsi alla pura correlazione dei fatti registrati.

### Ottimizzazione dell'inferenza locale: quantizzazione e speculative decoding

Per consentire l'esecuzione stabile di un modello da 27 miliardi di parametri all'interno dei 24 GB di VRAM della GPU, unitamente alla presenza di una finestra di contesto profonda (fino a 40.000 token per il Planner e 30.000 per l'Executor), è stato necessario implementare una serie di ottimizzazioni mirate a livello di runtime:

1. **Quantizzazione GGUF (varianti `IQ3_S` e `UD-Q3_K_XL`)**: l'adozione di formati quantizzati avanzati basati su matrici a quantizzazione di importanza (Importance Matrix) ha permesso di comprimere i pesi del modello fino a una media di circa 3,5 bit per parametro. Questo abbattimento dimezza l'ingombro statico del modello (da circa 54 GB a poco più di 13-14 GB di VRAM), lasciando un margine di memoria video sufficiente per allocare la memoria di lavoro dinamica (*KV-cache*).
2. **Ablazione della componente visiva (`disable_vision=True`)**: sebbene il modello originale supporti funzionalità multimodali per l'elaborazione di immagini, il collaudo di sistemi via shell e HTTP opera esclusivamente su flussi testuali. Disattivando a livello di caricamento la torre di codifica visuale (*vision tower*), è stato possibile recuperare preziosa memoria video e velocizzare i tempi di inizializzazione.
3. **Speculative Decoding (`mtp+ngram`)**: i comandi inviati al terminale e gli output di sistema contengono un'elevata frequenza di pattern testuali ricorsivi e sintassi standardizzate (es. `grep`, `awk`, percorsi di file `/var/www/html/`, intestazioni HTTP). L'abilitazione del decoding speculativo — combinando la predizione multi-token (*Multi-Token Prediction*) con un meccanismo di cache ad n-grammi — ha permesso di incrementare il throughput di decodifica fino al 30-40% nei turni operativi più densi, accelerando notevolmente l'esecuzione complessiva del test.
4. **Dimensionamento della finestra e allocazione della KV-cache**: come introdotto nel paragrafo 3.4, l'infrastruttura supporta sia una gestione a dimensione fissa (42.000 token per il Planner, 30.000 per l'Executor e 40.000 per il Final Evaluator), sia un dimensionamento dinamico a priori del contesto (`AUTO_CONTEXT`). Questo garantisce che la KV-cache sia sempre sufficiente ad accogliere gli ampi documenti di specifica o le lunghe tracce di collaudo senza incorrere in troncamenti imprevisti durante la generazione (*Out of Memory* o *Stop Length*).

### Architettura di serving e hot-swapping dinamico (`model_manager.py`)

L'infrastruttura di inferenza è servita mediante un backend ad alte prestazioni basato su Unsloth, che espone API conformi allo standard OpenAPI/v1. Per governare il ciclo di vita dei modelli e rispettare il principio di modularità e disaccoppiamento (§3.2, Principio 4), ho sviluppato il componente `model_manager.py`.

Il modulo opera come un gestore deterministico della memoria video e delle impostazioni di inferenza. Quando un nodo del grafo (Planner, Executor o Final Evaluator) richiede l'esecuzione di un'operazione, `model_manager.py` interroga preventivamente l'endpoint `/v1/models` per accertare quale modello e quale dimensione di contesto siano attualmente caricati in VRAM:

```
        ┌────────────────────────────────────────────────────────┐
        │ Richiesta attivazione nodo con specifiche di contesto  │
        └───────────────────────────┬────────────────────────────┘
                                    │
                                    ▼
        ┌────────────────────────────────────────────────────────┐
        │     Interrogazione GET /v1/models verso il server      │
        └───────────────────────────┬────────────────────────────┘
                                    │
                     Modello e contesto corretti?
                     /                         \
                SÌ  /                           \  NO
                   ▼                             ▼
        ┌──────────────────────┐   ┌─────────────────────────────┐
        │ Procedi con inferenza│   │ Invia POST /api/inference/  │
        │  (zero ricaricamenti)│   │ load con quant, contesto,   │
        └──────────────────────┘   │ no-vision e speculative     │
                                   └──────────────┬──────────────┘
                                                  │
                                                  ▼
                                   ┌─────────────────────────────┐
                                   │ Hot-swap completato in VRAM │
                                   └─────────────────────────────┘
```

Se il modello residente coincide con quello target e la finestra di contesto allocata è sufficiente (tolleranza entro 1.000 token), il sistema procede immediatamente con l'inferenza senza alcuna interruzione. Qualora invece sia necessario un riassetto (ad esempio nel passaggio dal Planner, che richiede 42.000 token di contesto, all'Executor, ottimizzato per 30.000 token), il componente esegue una chiamata `POST /api/inference/load` forzando lo swap atomico a caldo con i parametri fini (`LOCAL_GGUF_VARIANT`, `LOCAL_SPECULATIVE_TYPE`, `LOCAL_DISABLE_VISION`).

In virtù di questa architettura, l'intero sistema di collaudo è svincolato da qualunque dipendenza cablata nel codice: ciascun nodo acquisisce i propri parametri di connessione (`base_url`, `api_key`, `model`) da un file di configurazione centrale (`.env`), consentendo all'operatore di sostituire istantaneamente il modello locale con un server alternativo (come vLLM o LM Studio) o con endpoint cloud, senza alterare una sola riga della logica di collaudo.

---

## 3.11 Conclusioni del Capitolo: dal Collaudo alla Riparazione Autonoma

In questo capitolo è stata esaminata in dettaglio l'architettura di **VulcaTest**, il sistema ideato per trasformare il collaudo di sicurezza delle macchine didattiche da un processo manuale o stocastico in un'attività rigorosa, metodica ed evidence-based. 

Attraverso la formalizzazione di cinque principi architetturali fondamentali — tra cui spiccano la netta separazione tra codice deterministico e modelli probabilistici, il rifiuto categorico dell'autocertificazione dell'agente e la rigida demarcazione dei ruoli operativi — è stato possibile superare tutti i limiti che rendevano inapplicabili i comuni harness generici:
- Il **Planner** traduce la documentazione di progetto in una sequenza tipizzata di `TestStep`, vincolando i criteri di successo a oracoli composti in congiunzione logica `AND`;
- L'**Orchestratore** controlla deterministicamente la progressione del test lungo un grafo a stati esplicito, impedendo all'agente di deviare dagli obiettivi assegnati;
- L'**Executor**, operando in regime di *Auditor Mode*, interagisce con l'ambiente esclusivamente tramite comandi in-band e raccoglie evidenze testuali verificabili per ciascun checkpoint, subordinando il verdetto a un ricalcolo deterministico condotto dal codice Python;
- Il **Bridge** fornisce un canale robusto di azione e percezione, garantendo l'igiene dei contesti mediante tool-slicing, troncamento dinamico degli output e gestione di sessioni PTY interattive;
- Il **Final Evaluator** consolida la telemetria di esecuzione in metriche strutturate e conduce un'analisi retrospettiva delle cause radice qualora il collaudo registri un fallimento.

Al termine di una sessione di collaudo che ha rilevato la non conformità della macchina bersaglio, VulcaTest non si limita a emettere un verdetto negativo generico, ma produce un artefatto strutturato formale: il file `healing_ticket.json`. Tale documento isola con precisione lo step bloccante, il componente di sistema coinvolto e la natura del difetto riscontrato.

A questo punto si apre un interrogativo fondamentale, che segna il passaggio al capitolo successivo: **è possibile sfruttare l'evidenza puntuale prodotta dal collaudatore per riparare automaticamente i difetti della macchina, chiudendo il ciclo tra verifica e correzione?**

Tentare di demandare la correzione al medesimo agente di collaudo o intervenire direttamente all'interno dell'ambiente virtualizzato attivo costituirebbe una grave violazione architetturale, riparando l'effetto visibile anziché la causa d'origine. Nel Capitolo 4 verrà introdotto **VulcaHealing**, il sottosistema autonomo progettato per ricevere il ticket diagnostico e intervenire chirurgicamente sui sorgenti *Infrastructure-as-Code* a monte, implementando un ciclo completo di auto-riparazione a loop chiuso.
