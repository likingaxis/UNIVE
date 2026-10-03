VulcaTest permette di rilevare una non conformità e di raccogliere le evidenze necessarie a descriverne la causa. Il solo rilevamento, tuttavia, lascia ancora all’operatore il compito di intervenire sui sorgenti della macchina e verificare nuovamente il risultato.

Per chiudere questo ciclo è stato sviluppato **VulcaHealing**, il componente incaricato di tentare la correzione automatica delle macchine non conformi. A partire dalla diagnosi prodotta dal Final Evaluator, VulcaHealing individua il difetto nei sorgenti Infrastructure as Code, applica una modifica, ricostruisce l’ambiente e avvia un nuovo test con VulcaTest.

Il capitolo descrive l’integrazione di questa fase nel workflow, il modo in cui la diagnosi viene usata per individuare il punto da correggere e l’architettura adottata per eseguire le modifiche.

## 4.1 Integrazione di VulcaHealing nel workflow closed-loop

VulcaHealing estende il workflow di verifica introducendo una fase di correzione successiva al rilevamento di una non conformità. Testing e healing rimangono però due attività separate, con accessi all’ambiente e responsabilità differenti.

### 4.1.1 Separazione funzionale tra collaudo e autoriparazione

Affidare la correzione allo stesso agente che esegue il test mescolerebbe due compiti che richiedono punti di vista differenti.

L’Executor di VulcaTest lavora **in-band**: parte dalla macchina Kali e interagisce soltanto con i servizi esposti dal target. Non accede ai file utilizzati per generare la macchina, perché queste informazioni non sarebbero disponibili a un utente che affronta la challenge.

L’Healer lavora invece **out-of-band** sui sorgenti dell’infrastruttura. Una correzione deve infatti essere applicata ai file da cui la macchina viene generata, come ricette, playbook Ansible, Dockerfile o sorgenti applicativi. Modificare soltanto il container già in esecuzione produrrebbe un cambiamento temporaneo, destinato a scomparire alla successiva ricostruzione.

La separazione mantiene inoltre indipendenti verifica e correzione. L’Healer può modificare i sorgenti, ma non i criteri con cui VulcaTest stabilisce la conformità; l’Executor può verificare la macchina, ma non correggerla durante il test.

### 4.1.2 Estensione dello StateGraph e attivazione condizionale

VulcaHealing è integrato nello stesso `StateGraph` utilizzato da VulcaTest. Il Planner opera a monte del grafo e produce l’Attack Plan iniziale; il workflow runtime è invece composto dai quattro nodi `orchestrator`, `executor`, `final_evaluator` e `healer`.

Il ciclo può essere rappresentato in forma semplificata come:

$$
\text{Orchestrator}
\rightleftarrows
\text{Executor}
\longrightarrow
\text{Final Evaluator}
\xrightarrow[\text{non conforme}]{\text{healing abilitato}}
\text{Healer}
\longrightarrow
\text{Orchestrator}
$$

Il passaggio al nodo `healer` dipende dall’esito del test, dall’abilitazione del self-healing e dal numero di tentativi di correzione ancora disponibili. Il ticket diagnostico prodotto dal Final Evaluator accompagna invece la non conformità e fornisce le informazioni utilizzate nella fase di analisi.

Dopo l’intervento dell’Healer, il flusso torna all’Orchestrator e il test riparte utilizzando lo stesso Attack Plan già strutturato. Le condizioni di terminazione e il numero massimo di tentativi sono descritti nella Sezione 4.6.

## 4.2 Dal ticket diagnostico alla localizzazione del difetto nell’Infrastructure as Code

La Root Cause Analysis eseguita dal Final Evaluator identifica lo step fallito, il componente coinvolto e la possibile causa della non conformità. VulcaHealing usa questa diagnosi come punto di partenza per individuare il file o la direttiva da modificare nei sorgenti dell’infrastruttura.

### 4.2.1 Il ticket come punto di partenza per la ricerca della causa

Il punto in cui un errore si manifesta durante il test può non coincidere con il punto dei sorgenti in cui il difetto è stato introdotto. Una risposta HTTP errata, un servizio non disponibile o un permesso mancante possono dipendere da configurazioni generate in una fase precedente della pipeline.

Per questo il ticket non viene interpretato come una prescrizione diretta della modifica da applicare. Il componente e la causa indicati dalla diagnosi restringono l’area da analizzare, mentre l’Healer deve ricostruire la catena che collega il sintomo osservato ai file Infrastructure as Code responsabili della configurazione.

[Mantenere qui lo schema sintomo → analisi delle dipendenze → localizzazione nei sorgenti → modifica.]

### 4.2.2 Dalla diagnosi alla ricetta dichiarativa: il caso DataVault

Un esempio è emerso durante il test della macchina _DataVault_. La richiesta a una webshell con estensione `.pHP` restituiva `403 Forbidden` con corpo `Access denied.`, indicando un problema nella catena di elaborazione della richiesta web.

La richiesta veniva però inoltrata correttamente da Nginx al backend FastCGI. Il rifiuto avveniva in PHP-FPM, che manteneva la configurazione predefinita e non consentiva l’esecuzione dell’estensione `.pHP`.

La configurazione prevista avrebbe dovuto essere applicata durante il provisioning. Il task Ansible incaricato di modificare `security.limit_extensions` veniva invece saltato perché il costrutto `with_fileglob` veniva risolto sul nodo di controllo anziché sul target.

La correzione non consisteva quindi nel modificare il punto in cui il `403` diventava visibile, ma il task di provisioning che avrebbe dovuto produrre la configurazione corretta. Il caso mostra perché la diagnosi del test deve essere usata come riferimento per la ricerca, senza assumere che il componente in cui compare il sintomo coincida con il sorgente da modificare.

## 4.3 L’Healer: delega operativa a un harness agentico

La fase di healing richiede capacità diverse da quelle utilizzate durante il conformance testing. L’Executor interagisce con un target già costruito attraverso un ciclo ReAct, entro i vincoli definiti dal `TestStep`, dalla checklist e dai tool disponibili. L’Healer deve invece navigare i sorgenti del progetto, mettere in relazione file differenti e applicare modifiche a configurazioni Ansible, Dockerfile, codice applicativo e file di sistema.

Per questa ragione la modifica dei sorgenti viene delegata a un agente di coding esterno, invocato attraverso la CLI di **Google Antigravity** (`agy`) [@googleantigravity2026].

### 4.3.1 Uso di un harness generico nella fase di correzione

Lo stesso grado di libertà che rende poco adatto un harness general-purpose al conformance testing risulta utile nella modifica dei sorgenti.

Durante il test è necessario controllare il percorso seguito dall’agente, i tool disponibili e le condizioni che determinano il successo di ogni step. Nella fase di healing, invece, il modello deve poter esplorare file differenti, ricostruire dipendenze e scegliere autonomamente dove intervenire.

Questa libertà rimane comunque confinata dal controller di VulcaHealing, che definisce il perimetro dei file interessati, registra le modifiche e sottopone il risultato ai controlli descritti nelle sezioni successive.

### 4.3.2 Integrazione con Antigravity CLI

L’integrazione con Antigravity è concentrata nel controller Python `healer.py`, che avvia la CLI `agy` come sottoprocesso in modalità non interattiva.

L’esecuzione viene avviata tramite `-p`, mentre `--mode accept-edits` permette all’agente di applicare direttamente le modifiche ai file senza richiedere conferme manuali. Il flag `--dangerously-skip-permissions` evita ulteriori richieste interattive legate ai permessi durante la sessione.

La directory di lavoro viene impostata sui sorgenti di VulcaForge, mentre `--add-dir` rende visibile all’agente l’intera radice del workspace. L’accesso in lettura è quindi più ampio del perimetro entro cui l’agente è autorizzato a scrivere; quest’ultimo viene controllato separatamente dal controller, come descritto nella Sezione 4.4.2.

L’opzione `--output-format stream-json` permette di ricevere gli eventi della sessione in formato strutturato e di registrare informazioni come token consumati e tool utilizzati. L’obiettivo della correzione viene invece fornito nel prompt tramite il prefisso `/goal`.

La dipendenza da Antigravity rimane confinata a questo livello di integrazione. Le fasi successive — controllo del perimetro, tracciamento delle modifiche, ricostruzione dell’ambiente e nuovo test — non dipendono dall’harness utilizzato per modificare i sorgenti.


## 4.4 Prompt dell’Healer e perimetro di modifica

Come per i componenti descritti nella Sezione 3.9, anche il comportamento dell’Healer viene delimitato attraverso un prompt dedicato. In questo caso è necessario tenere conto di una caratteristica particolare delle macchine didattiche: alcune configurazioni che un agente di coding potrebbe interpretare come problemi di sicurezza costituiscono in realtà vulnerabilità previste dalla challenge e devono essere preservate.

Il prompt deve quindi guidare la correzione della non conformità senza trasformarsi in una generica attività di hardening dell’infrastruttura.

### 4.4.1 Vincoli di riparazione e preservazione delle vulnerabilità didattiche

Nella definizione del prompt è stata ripresa l’idea, proposta nel lavoro sulla _Constitutional AI_, di esplicitare un insieme di principi che delimitano il comportamento del modello [citazione]. Nel caso di VulcaHealing questi principi riguardano direttamente il modo in cui può essere modificata la macchina:

1. **Modifica minima.** La correzione deve interessare soltanto ciò che è necessario per risolvere la non conformità individuata.
    
2. **Assenza di leakage didattico.** La modifica non deve introdurre suggerimenti, credenziali in chiaro o altre informazioni che rendano più semplice la risoluzione della challenge.
    
3. **Preservazione delle vulnerabilità previste.** Vulnerabilità come SQL injection, binari SUID o configurazioni `sudo` deboli possono appartenere al percorso didattico e non devono essere corrette se fanno parte della specifica della macchina.
    
4. **Nessuna modifica arbitraria.** Se l’analisi non individua un difetto nei sorgenti, l’agente deve poter terminare senza applicare una patch.
    
5. **Esplorazione limitata alla macchina interessata.** L’analisi deve concentrarsi sui file pertinenti alla challenge corrente, evitando modifiche o ricerche non necessarie nel resto del repository.
    

Questi vincoli definiscono ciò che l’agente dovrebbe fare. Il rispetto del perimetro di scrittura viene però controllato anche dal codice, senza dipendere soltanto dal prompt.

### 4.4.2 Perimetro di scrittura e protezione degli artefatti generati

L’Healer dispone di un accesso in lettura ampio al workspace, necessario per ricostruire le dipendenze tra documentazione, ricette e sorgenti. Le modifiche sono invece consentite soltanto sui file associati alla macchina corrente.

Il perimetro viene suddiviso in tre categorie:

- **modificabili:** la ricetta della macchina (`machines/<slug>.yaml`) e gli eventuali sorgenti applicativi dedicati, ad esempio `registry/web/webapps/<slug>/`;
- **in sola lettura:** la documentazione della challenge, il report prodotto dal collaudo e gli artefatti generati in `out/<slug>/`;
- **esclusi dalla modifica:** VulcaTest, VulcaHealing, le altre challenge e l’ambiente host.

Questa distinzione non viene affidata soltanto alle istruzioni del prompt. Al termine della sessione, e prima della rigenerazione del bundle, il controller confronta i file modificati con il perimetro consentito. Le modifiche rilevate al di fuori di esso vengono ripristinate utilizzando lo snapshot raccolto prima dell’esecuzione dell’agente.

Quando vengono rilevate scritture fuori perimetro, il controller genera inoltre `PERIMETER_VIOLATIONS.md`, che registra i file interessati prima del ripristino. Il tentativo di modifica rimane quindi tracciato anche se i cambiamenti vengono neutralizzati.

La directory `out/<slug>/` viene mantenuta in sola lettura perché contiene artefatti derivati dalla ricetta sorgente, come il Dockerfile e il playbook `setup_machine.yml` generati da VulcaForge. Una modifica applicata direttamente a questi file andrebbe persa alla generazione successiva. La correzione deve quindi essere effettuata sui sorgenti da cui il bundle viene prodotto.

### 4.4.3 Feedback sugli errori di compilazione

Ogni invocazione dell’agente di healing parte da una nuova sessione e non mantiene la cronologia del tentativo precedente. Le informazioni necessarie tra un tentativo e il successivo vengono conservate dal controller attraverso gli artefatti prodotti sul filesystem.

Se una modifica provoca il fallimento del build, ad esempio per un errore Docker o nell’esecuzione del playbook Ansible, l’output viene salvato in `BUILD_ERROR.md`. Quando viene effettuato un nuovo tentativo, il contenuto del file viene inserito nel prompt insieme alla diagnosi, in modo che l’agente possa tenere conto dell’errore introdotto dalla modifica precedente.

Nella configurazione utilizzata per gli esperimenti del Capitolo 5 il numero massimo di tentativi è pari a uno; questo meccanismo diventa operativo quando viene configurato un budget di healing superiore.

## 4.5 Tracciamento e validazione delle modifiche

Come nel collaudo, anche nella fase di healing l’output dichiarato dal modello non viene utilizzato come prova del risultato. Il controller verifica direttamente le modifiche presenti sul filesystem e conserva il relativo diff.

### 4.5.1 Snapshot e calcolo del diff

Il controllo è implementato nel modulo `diff_tracker.py` e si articola in tre passaggi.

Prima dell’avvio dell’agente, `take_folder_snapshot` registra lo stato dei file sorgente presenti nel repository VulcaForge. Viene inoltre creata una copia fisica dello stato iniziale della macchina (`draft_pre_fix`), utilizzabile come riferimento e per eventuali ripristini.

Antigravity viene quindi eseguito all’interno del workspace previsto e può applicare le modifiche consentite dal prompt e dal perimetro definito nella Sezione 4.4.

Al termine della sessione, `compute_folder_diff` confronta il filesystem con lo snapshot iniziale. Dal confronto vengono prodotti due artefatti:

- `patch.diff`, che contiene le differenze riga per riga;
    
- `HEALING_REPORT.md`, che riassume i file interessati dalla modifica.
    

Lo stesso confronto viene utilizzato per individuare eventuali scritture al di fuori del perimetro consentito e ripristinarle prima delle fasi successive.

### 4.5.2 Classificazione dell’intervento

L’esito della sessione di healing viene ricavato dal comportamento osservato sul filesystem e dall’esito dell’agente, distinguendo quattro casi:

- `PATCHED`: è presente almeno una modifica valida all’interno del perimetro consentito;
    
- `DECLINED`: la sessione termina senza errori ma non produce modifiche ai sorgenti autorizzati;
    
- `OUT_OF_SCOPE`: le modifiche rilevate interessano esclusivamente file esterni al perimetro e vengono ripristinate;
    
- `ERROR`: l’esecuzione dell’harness termina con un errore o supera il timeout previsto.
    

Questa distinzione è necessaria perché il codice di uscita dell’agente non permette da solo di capire se sia stata effettivamente applicata una correzione.

Nell’implementazione attuale, anche un diff vuoto non interrompe immediatamente il ciclo: bundle e ambiente vengono comunque ricostruiti e VulcaTest viene eseguito nuovamente. Evitare rebuild e re-test nei casi `DECLINED` o `OUT_OF_SCOPE` rappresenta una possibile ottimizzazione, non applicata alla configurazione utilizzata per raccogliere i dati sperimentali del Capitolo 5.

## 4.6 Chiusura del ciclo: rebuild dell’ambiente e regression testing

Una patch sui sorgenti non è sufficiente a considerare risolta la non conformità. La modifica deve essere trasformata nuovamente in un ambiente eseguibile e la macchina deve superare un nuovo collaudo.

La fase successiva all’Healer segue quindi questa sequenza:

**modifica dei sorgenti → generazione del bundle → build dell’immagine → ricreazione della macchina → aggiornamento del target → nuovo test**

[Figura: ciclo Healer → VulcaForge → build → redeploy → VulcaTest. In caso di errore di build, il flusso torna al tentativo successivo con `BUILD_ERROR.md`.]

### 4.6.1 Generazione del bundle e gate di compilazione

Dopo la modifica dei sorgenti, VulcaHealing richiama `generator/main.py` di VulcaForge per rigenerare il bundle della macchina. La ricetta aggiornata viene quindi tradotta nel nuovo playbook Ansible e nel Dockerfile presenti in `out/<slug>/`.

L’immagine Docker viene successivamente compilata sulla macchina Kali attraverso il Terminal Gateway. Il controller attende un marcatore prodotto soltanto al termine del comando di build, così da distinguere una compilazione conclusa correttamente da una sessione ancora in esecuzione.

Durante lo sviluppo è emerso un problema dovuto al local echo del PTY. Nelle prime versioni, il comando inviato al terminale conteneva direttamente la stringa usata come marcatore di successo. Poiché il PTY restituisce anche i caratteri digitati, il watchdog poteva intercettare il marcatore nell’eco del comando prima che il build fosse realmente terminato.

Per evitare questo falso positivo, il marcatore viene costruito nel comando in forma separata e compare come stringa completa soltanto nell’output prodotto dopo l’esecuzione. Il watchdog può così utilizzarlo come conferma della conclusione effettiva del build.

Se la compilazione fallisce, il deploy viene interrotto e l’output dell’errore viene salvato in `BUILD_ERROR.md`. Non viene quindi avviato un test su un ambiente che non corrisponde ai sorgenti appena modificati.

### 4.6.2 Ripristino dell’ambiente e regression testing integrale

Quando il build termina correttamente, l’ambiente viene ricreato a partire dalla nuova immagine. Il controller utilizza `reset.sh`, quando disponibile; negli altri casi rimuove il container precedente e ne avvia uno nuovo.

Dopo l’avvio viene applicata una pausa di stabilizzazione di 5 secondi. Il nuovo indirizzo IPv4 assegnato al container viene quindi recuperato con `docker inspect` e salvato nel campo `target_ip` dello stato condiviso.

Il nuovo collaudo non riparte dallo step che aveva provocato il fallimento. `current_step_index` viene riportato a `0` e VulcaTest esegue nuovamente l’intero Attack Plan.

La ripetizione completa è necessaria perché una modifica che risolve lo step fallito potrebbe aver alterato un passaggio precedente. Il successo della correzione viene quindi stabilito sul comportamento dell’intera macchina, utilizzando gli stessi criteri di conformità del test iniziale.

### 4.6.3 Condizioni di terminazione e limiti attuali

Il numero di interventi dell’Healer è limitato da `MAX_HEALING_ATTEMPTS`. Nella configurazione utilizzata per la valutazione sperimentale il valore è impostato a `1`: ogni macchina riceve quindi un solo tentativo di correzione automatica.

L’implementazione prevede anche un controllo di convergenza per configurazioni con più tentativi. Se un ciclo `DECLINED` o `OUT_OF_SCOPE` viene seguito da un nuovo test che si blocca sullo stesso step, il sistema può interrompere ulteriori iterazioni invece di ripetere lo stesso comportamento. Con `MAX_HEALING_ATTEMPTS=1` questo controllo non interviene nei test descritti nel Capitolo 5.

Gli errori dell’infrastruttura di collaudo vengono inoltre mantenuti distinti dalle non conformità della macchina. Un problema nel Terminal Gateway, nel rebuild o in un altro componente del framework non viene registrato come fallimento della challenge.

Un ultimo limite riguarda il modello utilizzato per la correzione. VulcaTest viene eseguito con il modello locale descritto nella Sezione 3.10, mentre l’Healer utilizza Antigravity e il modello Gemini 3.8 Flash nella configurazione sperimentale adottata. L’impiego futuro di modelli locali specializzati nel code editing permetterebbe di rimuovere questa dipendenza esterna.

Con questa fase il ciclo avviato da VulcaTest viene completato: una non conformità rilevata può essere diagnosticata, corretta sui sorgenti e sottoposta nuovamente allo stesso processo di verifica. Il Capitolo 5 valuta separatamente le prestazioni del collaudo, della Root Cause Analysis e della fase di healing.