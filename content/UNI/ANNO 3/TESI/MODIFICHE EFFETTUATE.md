### Obiettivo 0: Verifica integrità di base della macchina
Attualmente, durante la generazione Ansible, viene creato un file `VulcaForge/out/<nome_macchina>/verify_solution.sh` che dovrebbe verificare che tutte le configurazioni pensate in fase di design vengano mantenute anche in fase di generazione ansible. Questo script presenta due problematiche principali da risolvere:
- **Copertura parziale:** Spesso viene creato in modo incompleto e non verifica tutte le vulnerabilità/configurazioni della macchina. È necessario assicurarsi che *ogni* elemento del vulnerability registry abbia un comando di verifica associato (verification step) e che questo venga sempre e correttamente incluso nello script `verify_solution.sh`.
- **Esecuzione e segnalazione:** Attualmente lo script non viene eseguito in automatico o, in caso di fallimento, l'errore non viene segnalato opportunamente. Occorre integrare un meccanismo che lo avvii in modo consistente (ad esempio all'interno del `Dockerfile` nel caso di generazione per Docker, dentro `entrypoint.sh`) e che notifichi esplicitamente l'esito.
##### SOLUZIONE
La risoluzione dell'Obiettivo 0 è stata progettata secondo i principi di affidabilità architetturale e _Fail-Fast_, intervenendo su tre layer distinti del motore VulcaForge:

1. **Risoluzione della Copertura Parziale (Parser e Registry):**
    - **Fix Architetturale su `collector.py`**: È stato corretto un bug di fallback nel parser Python che ignorava la raccolta dei task di verifica per i componenti di tipo _config_ definiti nelle chiavi legacy (`all_challenges`, `boot_to_root`) e per le _Web App_ modulari. Attraverso l'astrazione del metodo `process_any_component()`, il generatore ora intercetta e accumula sistematicamente il dizionario `verification` per ogni nodo logico, indipendentemente dal suo tipo.
    - **Sanitizzazione in `scripts_builder.py`**: Il generatore dello script bash è stato blindato introducendo un layer di type-checking e escaping. È stata gestita la tolleranza verso tipizzazioni scorrette nei manifesti (dizionari passati come liste), è stato introdotto l'escape degli apici singoli nei payload generati per non rompere la sintassi bash, ed è stato uniformato lo shebang in `#!/bin/sh` per garantire compatibilità universale in ambienti containerizzati leggeri (es. Alpine Linux).
    - **Data-Layer Completeness**: È stato condotto un audit manuale dell'intero _Vulnerability Registry_, individuando 15 moduli (tra servizi, container annidati e vulnerabilità) sprovvisti di step di validazione. I file YAML (es. `web-nginx-basic-auth.yaml`, `privesc-sudo-socat-revshell.yaml`) sono stati patchati iniettando comandi di sanity-check bash idonei. Questo ha portato la copertura di convalida statica al 100%.
2. **Esecuzione e Meccanismo Fail-Fast (Builder Docker):**
    - **Iniezione in Boot-Time**: Piuttosto che dipendere da task esterni, il motore infrastrutturale (`docker_builder.py`) è stato modificato in modo che lo script `verify_solution.sh` venga copiato all'interno del layer finale tramite `Dockerfile.tpl` e richiamato direttamente come processo init da `entrypoint.sh.tpl`.
    - **Fail-Fast Design**: L'esecuzione di `verify_solution.sh` all'interno dell'entrypoint è stata legata a un meccanismo di arresto forzato (costrutto `sh /opt/verify_solution.sh || exit 1`). Se l'assemblaggio Ansible produce una macchina non conforme all'intento progettuale, il check fallisce causando l'arresto immediato del container. Questo approccio _Fail-Fast_ garantisce che una macchina non valida non entri mai nello stato di _running_, bloccando a monte i successivi cicli di testing automatico e fornendo un feedback immediato all'orchestratore.


### Obiettivo 1: Assessment automatico delle macchine (HexStrike / MCP)
Partendo da tool come **HexStrike** (o valutando server MCP alternativi), lo scopo è relaizzare un assessment automatico delle macchine generate tramite VulcaMind + VulcaForge. 
Il processo partirà dalla generazione di una macchina stile esame (seguendo la documentazione in `GUIDE.md`), saltando le fasi di verifica intermedie manuali per arrivare direttamente a un container Docker funzionante. A prescindere dalla perfetta conformità dell'infrastruttura rispetto all'idea iniziale, l'importante è avere il container buildato e in esecuzione.

Una volta attiva la macchina, l'MCP automatico verrà impiegato per eseguire due compiti **totalmente separati e non consequenziali**:

#### 1 - ALTA PRIORITÀ: Verifica della Risoluzione Prevista (Intended Way)
Fornire all'MCP il file `STORYLINE.md` (che descrive la *intended way*).
- **Compito dell'Agente:** Verificare se la macchina rispecchia l'idea originale di come dovrebbe essere risolta.
- **Output Atteso:** Un report strutturato che dichiari se l'esito è positivo ("Tutto OK") oppure, al contrario, che spieghi in dettaglio le divergenze, i pezzi mancanti e le ragioni per cui non è stato possibile risolvere la challenge usando il metodo richiesto.
- **Raffinamento Agentico:** Qualora i risultati dei test siano scarsi a causa del formato discorsivo della storyline, occorrerà valutare la possibilità di creare nel flusso agentico un nuovo file di istruzioni, generato a partire da `STORYLINE.md`, che sia molto più dettagliato e formattato esplicitamente per esser "digerito" dall'MCP di pentest.
- **Validazione Manuale (Tesista):** Durante la tesi, occorre validare il lavoro dell'MCP provando manualmente a "rompere" la macchina. Lo scopo è confermare che quanto indicato nel report sulla conformità della soluzione corrisponda alla realtà empirica (verificando se l'MCP si sbaglia o se ha individuato falle reali).

#### 2 - BASSA PRIORITÀ: Esplorazione di Percorsi Alternativi (Unintended Way)
In una sessione di assessment completamente slegata da quella precedente, l'MCP dovrà tentare di trovare vettori d'attacco che non rientrano nel design ufficiale.
- **Compito dell'Agente:** Agire come attaccante in enumerazione libera (senza seguire la Storyline) per scovare vulnerabilità accidentali o bypass ("scorciatoie").
- **Output Atteso:** Un report sulle eventuali misconfiguration infrastrutturali o credenziali/vulnerabilità di default che consentono di ottenere privilegi aggirando la logica di risoluzione prevista.
- **Validazione Manuale (Tesista):** Qualsiasi *finding* "unintended" scovato dall'agente andrà replicato a mano dal tesista. In questo modo sarà possibile scremare falsi positivi/allucinazioni e, in caso di esito positivo, correggere il processo Ansible a monte.
