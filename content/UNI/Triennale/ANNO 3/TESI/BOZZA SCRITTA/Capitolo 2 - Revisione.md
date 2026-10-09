# Capitolo 2 — Contesto

Per comprendere il problema affrontato da VulcaTest è necessario introdurre il contesto delle macchine didattiche vulnerabili, il concetto di conformità rispetto al percorso di attacco previsto e l'ecosistema VulcAIn in cui il framework si inserisce. Il capitolo presenta inoltre i principali paradigmi e strumenti agentici su cui si basa la soluzione proposta.

## 2.1 Cyber Range, CTF e macchine Boot-to-Root

Un Cyber Range è una piattaforma interattiva che simula reti, sistemi, strumenti e applicazioni, usata per l'addestramento e la sperimentazione nel campo della sicurezza informatica [@nist2023cyberrange; @yamin2020cyberranges]. Questi ambienti permettono di esercitarsi in scenari controllati e ripristinabili, limitando i rischi per i sistemi esterni all'ambiente di addestramento. In ambito didattico i Cyber Range ospitano spesso sfide nel formato Capture The Flag (CTF), in cui il partecipante deve sfruttare una o più vulnerabilità per recuperare una flag, di solito una stringa segreta che dimostra il superamento della sfida.

Le macchine generate da VulcAIn appartengono a una categoria di CTF diffusa in ambito didattico, le macchine Boot-to-Root (B2R), costruite attorno a un singolo sistema. Il partecipante parte senza alcun accesso, ottiene un primo accesso alla macchina e prosegue fino a raggiungere i privilegi dell'amministratore (_root_). Il percorso comprende generalmente una fase di accesso iniziale e una successiva fase di _privilege escalation_, ossia l'acquisizione di privilegi superiori. Durante la risoluzione ricorrono attività di _enumeration_, cioè raccolta di informazioni sul sistema target, individuazione di vulnerabilità o configurazioni errate sfruttabili, ed _exploitation_, ovvero il loro sfruttamento per ottenere accessi o privilegi ulteriori.
## 2.2 Intended path e conformità di una macchina didattica

Le vulnerabilità di una macchina B2R didattica sono scelte e concatenate dall'autore, in modo che ogni passaggio corrisponda a un obiettivo formativo. La sequenza di passaggi progettata prende il nome di _intended path_ ed è di norma documentata in un writeup. L'intended path non è necessariamente l'unico percorso di risoluzione: una macchina può infatti presentare soluzioni alternative. Esso rappresenta tuttavia il percorso su cui l'autore ha costruito gli obiettivi didattici, ed è su questo che si concentra la presente tesi.

Ai fini di questa tesi, una macchina si considera conforme quando ogni passaggio dell'intended path risulta eseguibile secondo il comportamento previsto dall'autore. La conformità così definita riguarda il funzionamento del percorso didattico e non implica l'assenza di vulnerabilità aggiuntive o di percorsi alternativi non previsti. Arrivare alla root non basta a dimostrarlo, perché il partecipante può ottenere i privilegi di amministratore anche con un percorso alternativo, aggirando un passaggio che non funziona. In questo caso la macchina risulta compromettibile, ma non conforme al percorso previsto, poiché il completamento della challenge non dimostra che tutti i passaggi didattici progettati siano effettivamente funzionanti.

Realizzare macchine di questo tipo richiede tempo e competenze, perché oltre alla progettazione del percorso didattico è necessario configurare il sistema operativo, i servizi, gli utenti e i permessi affinché le vulnerabilità previste siano effettivamente sfruttabili. La verifica consiste quindi nel percorrere la sequenza di attacco documentata nel writeup e deve essere ripetuta dopo ogni modifica rilevante, poiché anche un cambiamento apparentemente marginale della configurazione può compromettere uno dei passaggi previsti.

## 2.3 L'ecosistema VulcAIn: VulcaMind, VulcaForge e VulcaShip

VulcAIn è un ecosistema modulare, ideato e sviluppato da Danilo Dell’Orco e Michele Salvatori, che combina agenti basati su AI e Infrastructure as Code (IaC)[^iac] per automatizzare parte della realizzazione delle macchine didattiche vulnerabili, riducendo il lavoro di configurazione e lasciando all'autore maggiore spazio per la progettazione delle challenge. 
La pipeline si articola in tre moduli (Figura 2.1):
- **VulcaMind:** a partire da una descrizione iniziale, definisce struttura, storyline, percorso di attacco e soluzione della challenge. La storyline e il writeup che produce descrivono l'intended path: la prima l'ordine dei passaggi, il secondo i dettagli tecnici per eseguirli.
- **VulcaForge:** traduce la progettazione in infrastruttura. Un agente compone i moduli di un registro di vulnerabilità, servizi e configurazioni in una ricetta IaC, rappresentata da un file YAML dichiarativo che definisce la composizione della macchina. A partire da questa ricetta e dai sorgenti necessari, il generatore produce il playbook Ansible [@ansible] e i file di supporto, come i Dockerfile [@docker] delle applicazioni web.
- **VulcaShip:** gestisce il deploy della macchina sull'infrastruttura di virtualizzazione del Cyber Range.

![[Pasted image 20261004204727.png]]
_Figura 2.1 — **Pipeline VulcAIn originale, senza VulcaTest**_

La pipeline originale segue un flusso lineare, senza una fase di verifica della conformità dell'ambiente generato. Sebbene siano presenti controlli sull'avvio dei servizi, questi non permettono di stabilire se la macchina sia effettivamente risolvibile lungo l'intended path. Un errore di generazione, come la mancata esposizione di una porta necessaria, può quindi compromettere il percorso didattico senza essere rilevato dai controlli esistenti. Eventuali problemi devono pertanto essere individuati e corretti attraverso una verifica manuale della macchina.

Per colmare questa lacuna, la presente tesi introduce VulcaTest, un framework che verifica la conformità delle macchine in esecuzione attraverso un penetration test agentico e, in caso di non conformità, permette di avviare un processo di correzione automatizzata.
La fase di verifica richiede soltanto la documentazione della challenge e l'indirizzo IP della macchina, e può quindi operare indipendentemente dagli altri moduli di VulcAIn. Il self-healing dipende invece da VulcaForge, poiché interviene sulla ricetta IaC e sui sorgenti della macchina per ricostruirla. Nell'architettura completa VulcaTest è destinato a inserirsi dopo VulcaShip, mentre nel presente lavoro le macchine vengono eseguite come container Docker senza passare da quest'ultimo. L'integrazione automatica nella pipeline VulcAIn rimane uno sviluppo futuro.

## 2.4 Agenti basati su LLM: ReAct e Plan-and-Execute

VulcaMind, VulcaForge e VulcaTest affidano parte delle proprie attività ad agenti basati su Large Language Model (LLM). Un LLM è un modello addestrato su grandi quantità di dati che può generare risposte a partire da un input, ma non dispone autonomamente degli strumenti necessari per agire su un ambiente esterno. Si parla di agente basato su LLM quando il modello è integrato in un sistema che ne organizza il processo decisionale e gli permette di interagire con l'ambiente attraverso azioni e osservazioni  [@sumers2024coala; @wang2024survey].

Per descrivere l'organizzazione di questi sistemi si può fare riferimento a CoALA (Cognitive Architectures for Language Agents) [@sumers2024coala], che distingue memoria, azioni e processo decisionale. Le azioni possono essere interne, come l'elaborazione delle informazioni già disponibili, oppure esterne, attraverso le quali l'agente interagisce con l'ambiente. L'esecuzione di un comando su una macchina remota costituisce un esempio di azione esterna, il cui risultato può essere utilizzato per aggiornare le informazioni disponibili all'agente.

Il ciclo decisionale può essere organizzato in modi diversi, e due schemi molto diffusi sono ReAct e Plan-and-Execute. ReAct (_Reasoning + Acting_) [@yao2023react] combina due capacità complementari: il ragionamento, che permette di pianificare e interpretare le informazioni disponibili, e l'azione, che consente di interagire con l'ambiente e raccogliere nuove osservazioni. Il solo ragionamento, come quello sollecitato dal Chain-of-Thought prompting [@wei2022chain], può basarsi su informazioni incomplete o errate quando non viene confrontato con l'ambiente. D'altra parte, un'esecuzione guidata soltanto dalle osservazioni immediate può risultare poco orientata all'obiettivo. ReAct integra quindi le due capacità in un ciclo nel quale l'agente ragiona sullo stato corrente, esegue un'azione e ne osserva il risultato per orientare il passo successivo.

Il Plan-and-Execute [@wang2024survey] segue un'impostazione differente: il sistema definisce preliminarmente un piano suddiviso in passi, che vengono successivamente eseguiti. Questa separazione rende esplicita la sequenza delle attività e permette di controllarne l'avanzamento. A seconda dell'architettura, il piano può rimanere fisso oppure essere aggiornato durante l'esecuzione.

La separazione delle responsabilità è un principio adottato anche nelle architetture multi-agente. MetaGPT [@hong2024metagpt], ad esempio, organizza la collaborazione tra agenti attraverso ruoli specializzati e lo scambio di artefatti strutturati. Pur seguendo un'organizzazione differente, VulcaTest presenta un'impostazione analoga nella distinzione dei compiti e nell'utilizzo di rappresentazioni strutturate per il passaggio delle informazioni tra componenti.

## 2.5 Harness agentici

Il comportamento di un agente non dipende soltanto dal modello, ma anche dal software che lo circonda, chiamato _harness_. L'harness costruisce il prompt, espone i tool e ne gestisce le chiamate, controlla il ciclo di esecuzione e definisce le modalità con cui l'agente può interagire con l'ambiente. L'importanza di queste scelte emerge anche da Cybench [@zhang2025cybench], che confronta diverse configurazioni agentiche e mostra come le prestazioni possano variare in funzione dell'infrastruttura di esecuzione utilizzata.

Wang et al. [@wang2024survey] distinguono due modalità per migliorare il comportamento di un agente senza modificare i pesi del modello: il _prompt engineering_, che interviene sulle istruzioni, e il _mechanism engineering_, che riguarda i meccanismi costruiti attorno al modello. Il lavoro di questa tesi interviene su entrambi gli aspetti, ma il contributo principale riguarda il secondo.

Tra gli harness general-purpose rientrano strumenti come Google Antigravity [@googleantigravity2026] e Claude Code [@claudecode], progettati per attività aperte di sviluppo software, nelle quali l'agente può esplorare un progetto, modificare file ed eseguire comandi. Questi ambienti possono essere estesi attraverso interfacce come il Model Context Protocol (MCP)[^mcp] [@mcp2025], che permette di collegare strumenti e servizi esterni. Un esempio in ambito cybersecurity è HexStrike AI [@hexstrikeai], che espone strumenti di sicurezza offensiva utilizzabili da agenti basati su LLM.

Accanto agli strumenti general-purpose, sono state sviluppate soluzioni specifiche per il penetration testing e per la valutazione degli agenti in ambito cybersecurity. PentestGPT [@deng2024pentestgpt] affronta il problema della perdita di contesto nelle sessioni prolungate, suddividendo il lavoro tra moduli dedicati al ragionamento, alla generazione dei comandi e all'interpretazione degli output. Cybench, già citato, si concentra invece sulla valutazione delle capacità degli agenti LLM attraverso challenge CTF, suddivise in subtask intermedi per misurare l'avanzamento anche quando la sfida non viene completata.

Questi lavori si concentrano sull'automazione del penetration testing o sulla valutazione delle capacità degli agenti, mentre la verifica della conformità di una macchina rispetto a un percorso didattico prestabilito non costituisce il loro obiettivo principale. È su questa esigenza che si concentra VulcaTest: non basta completare una challenge, ma è necessario verificare che ogni passaggio dell'intended path funzioni secondo quanto previsto. La Sezione 3.1 approfondisce i limiti incontrati nell'utilizzo di un harness general-purpose per questo compito.

[^iac]: _Infrastructure as Code_: approccio in cui l'infrastruttura (sistemi, servizi, configurazioni) viene descritta in file di testo eseguibili e versionabili, invece di essere configurata a mano.
[^contesto]: Quantità massima di testo, misurata in token, che il modello può considerare in una singola chiamata.
[^mcp]: Protocollo aperto che standardizza il modo in cui un'applicazione basata su LLM si collega a strumenti e fonti di dati esterne.

---

## Note per la revisione (da togliere)

- **Fonte VulcAIn:** in attesa della risposta dei tutor. Quando arriva, citarla nel §2.3 accanto ai nomi degli autori.
