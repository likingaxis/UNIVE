# Capitolo 2 — Contesto

VulcaTest nasce per verificare macchine didattiche generate automaticamente, e per capire cosa significhi verificarle bisogna partire dal tipo di sfide a cui queste macchine sono destinate e dal sistema che le produce, per poi descrivere i concetti alla base della progettazione e dell'implementazione del framework stesso.

## 2.1 Cyber Range, CTF e macchine Boot-to-Root

Un Cyber Range è una piattaforma interattiva che simula reti, sistemi, strumenti e applicazioni, usata per l'addestramento e la sperimentazione nel campo della sicurezza informatica [@nist2023cyberrange; @yamin2020cyberranges]. Il vantaggio è quello di avere un ambiente isolato, in cui gli studenti possono attaccare i sistemi senza conseguenze reali, con uno scenario ripristinabile più volte. In ambito didattico i Cyber Range ospitano spesso sfide nel formato Capture The Flag (CTF), in cui il partecipante deve sfruttare una o più vulnerabilità per recuperare una flag, di solito una stringa segreta che dimostra il superamento della sfida.

Le macchine generate da VulcAIn appartengono a una categoria di CTF molto diffusa in ambito didattico, le macchine Boot-to-Root (B2R), costruite attorno a un singolo sistema: il partecipante parte senza alcun accesso, ottiene una shell come semplice utente e da lì arriva ai privilegi di amministratore (root). Ogni passaggio di livello, compreso quello finale da utente a root, detto _privilege escalation_, richiede tre attività: l'_enumeration_, cioè la raccolta di informazioni sul sistema target, l'individuazione dei vettori di attacco, cioè di vulnerabilità o misconfigurazioni sfruttabili, e l'_exploitation_, cioè il loro sfruttamento per ottenere un livello di accesso superiore.

## 2.2 Intended path e conformità di una macchina didattica

Le vulnerabilità di una macchina B2R didattica sono scelte e concatenate dall'autore, in modo che ogni passaggio corrisponda a un obiettivo formativo. La sequenza di passaggi progettata prende il nome di _intended path_ ed è di norma documentata in un writeup. Raramente è l'unica soluzione, perché in questo genere di challenge la scoperta di percorsi alternativi è spesso incoraggiata. Resta però il percorso su cui l'autore ha costruito gli obiettivi didattici, ed è su questo che si concentra la tesi.

Il requisito principale di una macchina didattica è quindi che possa essere risolta lungo l'intended path, e in questa tesi una macchina che lo soddisfa si dice **conforme**: ogni passaggio del percorso progettato funziona sulla macchina in esecuzione. Arrivare alla root non basta a dimostrarlo, perché il partecipante può ottenere i privilegi di amministratore anche con un percorso alternativo, aggirando un passaggio che non funziona. In questo caso la macchina è **compromettibile** ma non conforme, e non insegna ciò per cui è stata progettata.

Realizzare macchine di questo tipo richiede molto tempo e competenze, perché oltre alla progettazione bisogna configurare il sistema operativo, i servizi, gli utenti e i permessi in modo che le vulnerabilità volute siano sfruttabili senza introdurne altre. Si procede poi con la verifica, che consiste nel risolvere la macchina seguendo il writeup e va ripetuta a ogni modifica, perché anche un piccolo cambiamento di configurazione può rendere impraticabile un passaggio del percorso.

## 2.3 L'ecosistema VulcAIn: VulcaMind, VulcaForge e VulcaShip

VulcAIn è un ecosistema modulare, ideato e sviluppato da Danilo Dell'Orco e Michele Salvatori, che combina agenti AI e Infrastructure as Code (IaC)[^iac] per ridurre il lavoro richiesto dalla realizzazione e lasciare all'autore più spazio per la progettazione. La generazione è divisa in tre moduli (Figura 2.1):

- **VulcaMind:** a partire da una descrizione iniziale, definisce struttura, storyline, percorso di attacco e soluzione della challenge. La storyline e il writeup che produce descrivono l'intended path: la prima l'ordine dei passaggi, il secondo i dettagli tecnici per eseguirli.
- **VulcaForge:** traduce la progettazione in infrastruttura. Un agente compone i moduli di un registro di vulnerabilità, servizi e configurazioni in una _ricetta IaC_, un file YAML dichiarativo che descrive l'intera macchina, da cui vengono poi generati il playbook Ansible [@ansible] e i file di supporto, come i Dockerfile [@docker] delle applicazioni web.
- **VulcaShip:** gestisce il deploy della macchina sull'infrastruttura di virtualizzazione del Cyber Range.

![[Pasted image 20261004204727.png]]
_Figura 2.1 — **Pipeline VulcAIn originale, senza VulcaTest**_

La pipeline originale è lineare e priva di retroazione: se l'agente di VulcaForge commette un errore, ad esempio dimentica di esporre una porta, la macchina viene messa in esecuzione già difettosa. I controlli presenti in questa pipeline si limitano a verificare che i servizi siano avviati, non che la macchina sia risolvibile lungo l'intended path, e i problemi emergono solo quando qualcuno la prova manualmente e la corregge a mano.

Questa tesi propone VulcaTest per chiudere il ciclo: il framework verifica la conformità della macchina in esecuzione con un penetration test agentico e, se trova una non conformità, la ripara con il nodo di healing. Nella pipeline completa VulcaTest si inserirà dopo VulcaShip, anche se la fase di test non dipende dagli altri moduli: le bastano la documentazione della challenge e l'indirizzo IP della macchina da verificare, che può quindi essere prodotta anche al di fuori di VulcAIn. Il nodo di healing richiede invece VulcaForge, perché corregge la ricetta IaC e la usa per ricostruire la macchina, che in questo lavoro viene eseguita come container Docker senza passare da VulcaShip. L'integrazione automatica di VulcaTest nel workflow di VulcAIn è uno degli sviluppi futuri.

## 2.4 Agenti basati su LLM: ReAct e Plan-and-Execute

VulcaMind, VulcaForge e VulcaTest affidano parte del proprio lavoro ad agenti basati su Large Language Model (LLM), modelli addestrati su grandi quantità di testo che, ricevuto un input testuale (prompt), ne generano una continuazione, ma da soli non possono osservare un ambiente né agire su di esso. Si parla di _language agent_, o agente basato su LLM, quando il modello è inserito in un'architettura che gli permette di interagire con un ambiente esterno attraverso memoria, ragionamento, pianificazione e azioni [@sumers2024coala; @wang2024survey].

Per descrivere la struttura di un agente di questo tipo si può usare il framework CoALA (_Cognitive Architectures for Language Agents_), che lo scompone in tre elementi: la memoria, le azioni che può compiere e il ciclo decisionale che, passo dopo passo, determina l'azione da eseguire [@sumers2024coala]. Le azioni possono essere interne, come il ragionamento, che modifica solo ciò che l'agente sa, oppure esterne, che agiscono sull'ambiente e prendono il nome di _grounding_. Lanciare un comando su una macchina remota è un esempio di azione esterna.

Il ciclo decisionale può essere organizzato in modi diversi, e due schemi molto diffusi sono ReAct e Plan-and-Execute. ReAct (_Reasoning + Acting_) [@yao2023react] nasce dall'unione di due capacità che, prese da sole, mostrano dei limiti. Il ragionamento esplicito, introdotto con il Chain-of-Thought [@wei2022chain], aiuta a scomporre un problema ma, se resta isolato dall'ambiente, può propagare errori e allucinazioni, mentre un agente che agisce senza ragionare tende a perdere di vista l'obiettivo e a ripetere azioni inutili. In ReAct l'agente alterna quindi un ragionamento sullo stato corrente, un'azione sull'ambiente e l'osservazione del risultato, che guida il ragionamento successivo. Anche questo schema ha dei limiti: l'agente può entrare in cicli in cui ripete la stessa azione, e la sequenza di ragionamenti e osservazioni può riempire la finestra di contesto[^contesto].

Il Plan-and-Execute segue un approccio diverso: l'agente costruisce prima un piano completo, scomposto in passi, e solo dopo li esegue uno alla volta. Nella classificazione di Wang et al. si tratta di una pianificazione senza feedback, mentre ReAct è l'esempio tipico di pianificazione con feedback [@wang2024survey]. Il vantaggio è un'esecuzione più prevedibile, perché i passi sono noti in anticipo, mentre il limite è che il piano non cambia anche quando l'ambiente restituisce qualcosa di inatteso.

Quando i ruoli sono più di uno conta anche il modo in cui il lavoro viene distribuito tra di essi: MetaGPT mostra che la collaborazione tra agenti migliora quando ogni ruolo ha compiti definiti e i ruoli si scambiano documenti strutturati, invece di dialogare liberamente [@hong2024metagpt].

## 2.5 Harness agentici

Il comportamento di un agente non dipende solo dal modello, ma anche dal software che lo circonda, chiamato _harness_. L'harness costruisce il prompt, espone i tool ed esegue le chiamate, gestisce il ciclo di esecuzione e decide quando interromperlo, oltre a stabilire cosa l'agente può leggere, modificare ed eseguire. Il suo peso sui risultati non è trascurabile: in Cybench, a parità di task, lo stesso cambio di harness migliora le prestazioni di un modello e peggiora quelle di un altro [@zhang2025cybench].

Wang et al. distinguono due modi per migliorare un agente senza modificare i pesi del modello: il _prompt engineering_, che agisce sulle istruzioni, e il _mechanism engineering_, che agisce sui meccanismi costruiti attorno al modello [@wang2024survey]. Il lavoro di questa tesi interviene su entrambi i fronti, ma il contributo principale riguarda il secondo.

Gli harness più diffusi sono general-purpose, come Google Antigravity [@googleantigravity2026] e Claude Code [@claudecode], pensati per compiti aperti come lo sviluppo software, in cui l'agente ragiona sul codice e opera attraverso editor e terminale. Tramite il Model Context Protocol (MCP)[^mcp] [@mcp2025] possono essere estesi con nuovi tool, e quindi collegati anche a strumenti di sicurezza offensiva come quelli raccolti da HexStrike AI [@hexstrikeai].

Accanto a questi esistono harness pensati appositamente per il penetration testing. PentestGPT nasce dall'osservazione che, nei test lunghi, gli LLM tendono a perdere il contesto della sessione e a dimenticare i risultati ottenuti nei passi precedenti, e per questo divide il lavoro tra tre moduli: uno di ragionamento, che tiene traccia dello stato complessivo del test, uno che traduce i passi in comandi e uno che riassume gli output degli strumenti [@deng2024pentestgpt]. Cybench affronta invece il problema della valutazione: misura le capacità degli agenti su challenge CTF professionali e, scomponendo ogni challenge in subtask intermedi, mostra fin dove arriva l'agente anche quando non ottiene la flag [@zhang2025cybench]. In entrambi i casi l'obiettivo è risolvere la challenge, o misurare quanto bene il modello riesce a farlo, e nessuno dei due verifica che una macchina sia risolvibile lungo un percorso dato.

In tutti questi casi l'harness lascia all'agente ampia autonomia nel raggiungere l'obiettivo, e la Sezione 3.1 mostra perché, nella verifica della conformità, questa autonomia diventa un limite.

[^iac]: _Infrastructure as Code_: approccio in cui l'infrastruttura (sistemi, servizi, configurazioni) viene descritta in file di testo eseguibili e versionabili, invece di essere configurata a mano.
[^contesto]: Quantità massima di testo, misurata in token, che il modello può considerare in una singola chiamata.
[^mcp]: Protocollo aperto che standardizza il modo in cui un'applicazione basata su LLM si collega a strumenti e fonti di dati esterne.

---

## Note per la revisione (da togliere)

- **Fonte VulcAIn:** in attesa della risposta dei tutor. Quando arriva, citarla nel §2.3 accanto ai nomi degli autori.
