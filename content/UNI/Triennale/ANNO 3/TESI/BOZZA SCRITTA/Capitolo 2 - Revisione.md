# Capitolo 2 — Contesto

VulcaTest verifica macchine didattiche generate automaticamente. Per descriverlo servono alcuni concetti legati al suo contesto, introdotti in questo capitolo.

## 2.1 Cyber Range, CTF e macchine Boot-to-Root

Un Cyber Range è una piattaforma interattiva che simula reti, sistemi, strumenti e applicazioni, usata per l'addestramento e la sperimentazione nel campo della sicurezza informatica [@nist2023cyberrange; @yamin2020cyberranges]. Il vantaggio è che si ha un ambiente isolato, in cui gli studenti possono attaccare i sistemi senza conseguenze reali e lo scenario può essere ripristinato più volte.

In ambito didattico i Cyber Range ospitano spesso sfide nel formato Capture The Flag (CTF), in cui il partecipante deve sfruttare una o più vulnerabilità per recuperare una flag, spesso una stringa segreta che dimostra il superamento della sfida.

Tra le CTF usate in ambito didattico sono molto diffuse le macchine Boot-to-Root (B2R), sfide costruite attorno a un singolo sistema. Il partecipante parte senza alcun accesso, ottiene una shell come semplice utente e da lì arriva ai privilegi di amministratore (root). Ogni passaggio di livello richiede tre attività: l'_enumeration_, cioè la raccolta di informazioni sul sistema target, l'individuazione dei vettori di attacco, cioè di vulnerabilità o misconfigurazioni sfruttabili, e il loro _exploitation_. Il passaggio finale da utente a root prende il nome di _privilege escalation_. Le macchine generate da VulcAIn appartengono a questa categoria.

## 2.2 Intended path e conformità di una macchina didattica

Le vulnerabilità di una macchina B2R didattica sono scelte e concatenate dall'autore, in modo che ogni fase corrisponda a un obiettivo formativo. La sequenza di passaggi progettata prende il nome di _intended path_ e di norma è documentata in un writeup. Non è necessariamente l'unica soluzione, perché in questo genere di challenge la scoperta di percorsi alternativi è spesso incoraggiata, ma resta il percorso su cui l'autore ha costruito gli obiettivi didattici, ed è quello su cui si concentra questa tesi.

Da questa caratteristica deriva il requisito principale di una macchina didattica: deve poter essere risolta lungo l'intended path. In questa tesi una macchina si dice **conforme** quando ogni passaggio del percorso progettato funziona sulla macchina in esecuzione. Raggiungere la root non basta a dimostrarlo: se un passaggio non funziona, il partecipante può comunque arrivare alla root per un'altra strada. In questo caso la macchina è **compromettibile** ma non conforme, e non insegna ciò per cui è stata progettata.

Realizzare macchine di questo tipo richiede molto tempo e competenze. Oltre alla progettazione, bisogna configurare il sistema operativo, i servizi, gli utenti e i permessi in modo che le vulnerabilità volute siano sfruttabili senza introdurne altre. La verifica consiste infine nel risolvere la macchina seguendo il writeup, e va ripetuta a ogni modifica, perché anche un piccolo cambiamento di configurazione può interrompere un passaggio del percorso.

## 2.3 L'ecosistema VulcAIn: VulcaMind, VulcaForge e VulcaShip

VulcAIn nasce per ridurre il lavoro richiesto dalla realizzazione e lasciare all'autore più spazio per la progettazione. È un ecosistema modulare, ideato e sviluppato da Danilo Dell'Orco e Michele Salvatori, che combina agenti AI e Infrastructure as Code (IaC)[^iac]. La generazione è divisa in tre moduli (Figura 2.1):

- **VulcaMind**, a partire da una descrizione iniziale, definisce struttura, storyline, percorso di attacco e soluzione della challenge. La storyline e il writeup che produce descrivono l'intended path: la prima l'ordine dei passaggi, il secondo i dettagli tecnici per eseguirli.
- **VulcaForge** traduce la progettazione in infrastruttura. Un agente compone i moduli di un registro di vulnerabilità, servizi e configurazioni in una _ricetta IaC_, un file YAML dichiarativo che descrive l'intera macchina. Dalla ricetta vengono poi generati il playbook Ansible [@ansible] e i file di supporto, come i Dockerfile [@docker] delle applicazioni web.
- **VulcaShip** gestisce il deploy della macchina virtuale sull'infrastruttura di virtualizzazione.
![[Pasted image 20261004204727.png]]
_Figura 2.1 — **Pipeline VulcAIn originale, senza VulcaTest**_

La pipeline originale è lineare e priva di retroazione. Se l'agente di VulcaForge commette un errore, ad esempio dimentica di esporre una porta, la macchina viene messa in esecuzione già difettosa. I controlli presenti verificano che i servizi siano avviati, non che la macchina sia risolvibile lungo l'intended path, e il problema emerge solo quando qualcuno la prova manualmente e la corregge a mano. Questa tesi propone VulcaTest (Capitoli 3 e 4), progettato per inserirsi dopo VulcaShip e chiudere il ciclo: verifica la conformità della macchina in esecuzione con un penetration test agentico e, se trova una non conformità, la ripara con il nodo di healing. La fase di test non dipende dal resto della pipeline: le servono la documentazione della challenge e la macchina eseguita come container Docker, e può quindi verificare anche macchine prodotte al di fuori di VulcAIn. Il nodo di healing invece lavora sulla ricetta IaC e usa il generatore di VulcaForge per ricostruire la macchina, quindi richiede VulcaForge. VulcaTest è pensato per integrarsi nel workflow di VulcAIn, e la sua integrazione automatica è uno degli sviluppi futuri.

## 2.4 Agenti basati su LLM: ReAct e Plan-and-Execute

VulcaMind, VulcaForge e VulcaTest affidano parte del proprio lavoro ad agenti basati su Large Language Model (LLM). Un LLM è un modello addestrato su grandi quantità di testo che, ricevuto un input testuale (prompt), ne genera una continuazione, ma da solo non può osservare un ambiente né agire su di esso. Si parla di _language agent_, o agente basato su LLM, quando il modello è inserito in un'architettura che gli permette di interagire con un ambiente esterno attraverso memoria, ragionamento, pianificazione e azioni [@sumers2024coala; @wang2024survey].

Per descrivere la struttura di un agente di questo tipo si può usare il framework CoALA (_Cognitive Architectures for Language Agents_), che lo scompone in tre elementi: la memoria, le azioni che può compiere e il ciclo decisionale con cui sceglie, a ogni passo, quale azione eseguire [@sumers2024coala]. Le azioni possono essere interne, come il ragionamento, che modifica solo ciò che l'agente sa, oppure esterne, che agiscono sull'ambiente e prendono il nome di _grounding_. Lanciare un comando su una macchina remota è un esempio di azione esterna.

Il ciclo decisionale può essere organizzato in modi diversi, e due schemi molto diffusi sono ReAct e Plan-and-Execute. In ReAct (_Reasoning + Acting_) [@yao2023react] l'agente alterna un ragionamento sullo stato corrente, un'azione sull'ambiente e l'osservazione del risultato, che guida il ragionamento successivo. Il ragionamento esplicito, introdotto con il Chain-of-Thought [@wei2022chain], aiuta a scomporre un problema ma, se resta isolato dall'ambiente, può propagare errori e allucinazioni. Un agente che agisce senza ragionare tende invece a perdere di vista l'obiettivo e a ripetere azioni inutili. ReAct unisce i due aspetti, ma ha anche dei limiti: l'agente può entrare in cicli in cui ripete la stessa azione, e la sequenza di ragionamenti e osservazioni può riempire la finestra di contesto[^contesto].

Il Plan-and-Execute segue un approccio diverso: l'agente costruisce prima un piano completo, scomposto in passi, e solo dopo li esegue uno alla volta. Nella classificazione di Wang et al. si tratta di una pianificazione senza feedback, mentre ReAct è l'esempio tipico di pianificazione con feedback [@wang2024survey]. Il vantaggio è un'esecuzione più prevedibile, perché i passi sono noti in anticipo. Il limite è che il piano non cambia anche quando l'ambiente restituisce qualcosa di inatteso.

Oltre al ciclo del singolo agente, conta il modo in cui il lavoro viene distribuito quando i ruoli sono più di uno. MetaGPT mostra che la collaborazione tra agenti migliora quando ogni ruolo ha compiti definiti e passa al successivo artefatti strutturati, invece di dialogare liberamente [@hong2024metagpt].

## 2.5 Harness agentici

Il comportamento di un agente non dipende solo dal modello, ma anche dal software che lo circonda, chiamato _harness_. L'harness costruisce il prompt, espone i tool ed esegue le chiamate, gestisce il ciclo di esecuzione e decide quando interromperlo. Si occupa anche del contesto e dei permessi, cioè di cosa l'agente può leggere, modificare ed eseguire. Il suo peso sui risultati non è trascurabile: in Cybench, a parità di task, lo stesso cambio di harness migliora le prestazioni di un modello e peggiora quelle di un altro [@zhang2025cybench].

Wang et al. distinguono due modi per migliorare un agente senza modificare i pesi del modello: il _prompt engineering_, che agisce sulle istruzioni, e il _mechanism engineering_, che agisce sui meccanismi costruiti attorno al modello [@wang2024survey]. È in questa seconda categoria che si colloca il lavoro di questa tesi.

Gli harness più diffusi sono general-purpose, come Google Antigravity [@googleantigravity2026] e Claude Code [@claudecode], e sono pensati per compiti aperti come lo sviluppo software: l'agente ragiona sul codice e opera attraverso editor e terminale. Tramite il Model Context Protocol (MCP)[^mcp] [@mcp2025] possono essere estesi con nuovi tool, e quindi collegati anche a strumenti di sicurezza offensiva come quelli raccolti da HexStrike AI [@hexstrikeai].

Accanto a questi esistono harness pensati appositamente per il penetration testing. PentestGPT nasce dall'osservazione che, nei test lunghi, gli LLM tendono a perdere il contesto della sessione e a dimenticare i risultati ottenuti nei passi precedenti. Per questo divide il lavoro tra tre moduli: uno di ragionamento, che tiene traccia dello stato complessivo del test, uno che traduce i passi in comandi e uno che riassume gli output degli strumenti [@deng2024pentestgpt]. Cybench affronta invece il problema della valutazione: misura le capacità degli agenti su challenge CTF professionali e, scomponendo ogni challenge in subtask intermedi, mostra fin dove arriva l'agente anche quando non ottiene la flag [@zhang2025cybench]. In entrambi i casi l'obiettivo è risolvere la challenge, o misurare quanto bene il modello riesce a farlo. Nessuno dei due verifica che una macchina sia risolvibile lungo un percorso dato.

In tutti questi casi l'harness lascia all'agente ampia autonomia nel raggiungere l'obiettivo. La Sezione 3.1 mostra perché, nella verifica della conformità, questa autonomia diventa un limite.

[^iac]: _Infrastructure as Code_: approccio in cui l'infrastruttura (sistemi, servizi, configurazioni) viene descritta in file di testo eseguibili e versionabili, invece di essere configurata a mano.
[^contesto]: Quantità massima di testo, misurata in token, che il modello può considerare in una singola chiamata.
[^mcp]: Protocollo aperto che standardizza il modo in cui un'applicazione basata su LLM si collega a strumenti e fonti di dati esterne.

---

## Note per la revisione (da togliere)

- **Ordine delle sezioni cambiato rispetto all'indice:** VulcAIn spostato da 2.5 a 2.3, prima di agenti e harness.
- **Fonte VulcAIn:** in attesa della risposta dei tutor.
- **Chiavi .bib da creare** (tutte verificate il 4/10/2026):
  - `nist2023cyberrange`: Cyber Range Project Team, NICE Community Coordinating Council, "The Cyber Range: A Guide", NIST, settembre 2023. https://nist.gov/system/files/documents/2023/09/29/The%20Cyber%20Range_A%20Guide.pdf
  - `yamin2020cyberranges`: M. M. Yamin, B. Katt, V. Gkioulos, "Cyber ranges and security testbeds: Scenarios, functions, tools and architecture", Computers & Security, vol. 88, 101636, 2020. DOI 10.1016/j.cose.2019.101636
  - `zhang2025cybench`: A. K. Zhang et al., "Cybench: A Framework for Evaluating Cybersecurity Capabilities and Risks of Language Models", ICLR 2025.
  - `deng2024pentestgpt`: G. Deng et al., "PentestGPT: Evaluating and Harnessing Large Language Models for Automated Penetration Testing", USENIX Security 2024.
  - `mcp2025`: Model Context Protocol, Specification (versione 2025-06-18), https://modelcontextprotocol.io/specification/2025-06-18
  - `claudecode`: Anthropic, Claude Code — documentazione, https://code.claude.com/docs
  - `wang2024survey`, `wei2022chain`, `hong2024metagpt`: già in FONTI.md, manca solo la voce .bib.
- **Da aggiungere a FONTI.md:** NIST, Yamin et al., MCP, Claude Code.
- **Citazioni da spostare dal cap. 3:** `[@docker]` e `[@ansible]` ora compaiono prima qui.
- **Ripetizioni da ridurre nel cap. 3:** definizione di conformità nel primo paragrafo del §3.1 (→ rimando alla Sezione 2.2), spiegazione di ReAct nel §3.6 (→ rimando alla Sezione 2.4), eventuale nota sulla finestra di contesto nel §3.10.2.
- **Da spostare fuori dal cap. 2:** nel §3.2 (principio 5) aggiungere la motivazione "il piano non cambia durante il test perché il percorso da verificare è uno solo, quello progettato dall'autore". Nell'1.2 dichiarare il contributo come mechanism engineering: "non si addestra un nuovo modello, ma si progetta l'harness che ne controlla l'esecuzione". Nel Capitolo 3 si può citare MetaGPT per l'impostazione role-based (CoALA nel principio 1 scartato: il paper consiglia di usare il codice con parsimonia, il contrario del principio).
- **§3.6:** la definizione di ReAct può diventare un rimando alla Sezione 2.4.
- **Cap. 6:** aggiungere tra gli sviluppi futuri la ricerca degli unintended path con VulcaTest black-box (richiamata nel §2.2).
