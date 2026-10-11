# Capitolo 5 – Valutazione sperimentale

I Capitoli 3 e 4 hanno descritto l'architettura di VulcaTest e il ciclo di verifica e correzione delle macchine. Questo capitolo ne valuta l'affidabilità attraverso una serie di esperimenti su macchine didattiche vulnerabili, presentando la metodologia adottata, i risultati ottenuti e i limiti della valutazione.

## 5.1 Obiettivi della valutazione

Valutare VulcaTest significa verificare non soltanto se riesce a completare un test, ma anche se i suoi risultati corrispondono al comportamento effettivo della macchina. Ad esempio, una run conclusa con successo non dimostra necessariamente che tutti i passaggi dell'intended path siano funzionanti, così come un fallimento potrebbe dipendere da un errore dell'agente anziché da un difetto della macchina. Per giudicare l'affidabilità del framework è quindi necessario conoscere in anticipo il comportamento atteso dell'ambiente su cui viene eseguito.

Questa difficoltà è riconducibile al *Test Oracle Problem*, un problema noto nel software testing che riguarda la disponibilità di un riferimento affidabile con cui confrontare i risultati di una verifica [26]. Nel caso di VulcaTest, tale riferimento deve permettere di distinguere gli errori del sistema di test dai difetti effettivamente presenti nelle macchine.

Per costruirlo, sono state preparate versioni delle challenge verificate manualmente come conformi all'intended path, accompagnate da Attack Plan validati attraverso esecuzioni ripetute. Queste costituiscono il riferimento iniziale della valutazione. Successivamente, nei sorgenti delle macchine sono state introdotte modifiche controllate, chiamate *perturbazioni*, progettate per alterare specifiche condizioni della challenge. Conoscendo la modifica introdotta e il comportamento atteso, è possibile confrontare i risultati di VulcaTest con una situazione definita prima dell'esecuzione. La costruzione di questo riferimento e le perturbazioni adottate sono descritte nelle Sezioni 5.2 e 5.3.

La valutazione deve inoltre distinguere le responsabilità delle diverse componenti. Un fallimento può infatti derivare da un piano ambiguo, da un problema durante l'esecuzione oppure da una correzione inefficace. Per questo sono stati definiti tre esperimenti, ciascuno associato a una domanda specifica:

- **E1 – Planner:** con quale frequenza il Planner genera un Attack Plan eseguibile su una macchina conforme?
- **E2 – Rilevazione delle non conformità:** con quale affidabilità VulcaTest riconosce i difetti che compromettono l'intended path, utilizzando un piano già validato?
- **E3 – Self-healing:** con quale efficacia il nodo di healing ripristina la conformità dopo il rilevamento di un difetto?

Gli esperimenti valutano aspetti distinti del workflow, pur potendo utilizzare dati della stessa esecuzione. Le modalità di svolgimento e le relative assunzioni sono descritte nella Sezione 5.4.

## 5.2 Costruzione della ground truth

La preparazione del benchmark è stata preceduta da una fase di sviluppo iterativo di VulcaTest, condotta su diverse macchine generate attraverso VulcaMind e VulcaForge, comprese le otto successivamente selezionate per la valutazione principale. Le esecuzioni preliminari sono state utilizzate per individuare sia difetti nelle macchine sia problemi nel framework, intervenendo di volta in volta sui sorgenti delle challenge o sull'architettura e sulle istruzioni degli agenti. Le modifiche ai prompt sono state formulate come regole generali, evitando istruzioni specifiche per le singole challenge, per limitare il rischio di adattamento agli scenari incontrati.

Questa attività non costituisce un esperimento controllato, poiché nel corso dello sviluppo sono cambiati sia VulcaTest sia gli ambienti utilizzati. I risultati delle esecuzioni preliminari non vengono quindi utilizzati come misure sperimentali. Al termine della fase di sviluppo sono state preparate le versioni di riferimento delle macchine e dei relativi piani di test.

Per ciascuna macchina, la costruzione della ground truth ha richiesto quattro attività:

- **Revisione della documentazione:** i file `DESCRIPTION.md`, `STORYLINE.md` e `WRITEUP.md` sono stati controllati manualmente e corretti dove necessario, per ottenere una descrizione coerente dell'intended path.
- **Qualificazione della macchina:** i sorgenti sono stati corretti fino a ottenere un ambiente risolvibile lungo il percorso previsto, verificandone manualmente i passaggi documentati.
- **Preparazione dell'Attack Plan:** tra i piani generati durante le prove è stato selezionato un piano di riferimento, correggendo manualmente gli eventuali problemi che ne impedivano l'esecuzione, compresi errori nei comandi o nelle checklist.
- **Validazione del piano:** il piano è stato eseguito sulla macchina qualificata e considerato valido dopo tre esecuzioni consecutive concluse con esito `COMPLETED`.

La macchina ottenuta prende il nome di *Golden Machine*: rappresenta la versione della challenge considerata conforme all'intended path. Il relativo piano, denominato *Golden Plan*, costituisce un riferimento fisso, verificato rispetto alla documentazione e risultato eseguibile nelle tre ripetizioni. Queste ultime ne dimostrano la stabilità operativa osservata, ma non ne certificano da sole la correttezza semantica, che dipende anche dalla verifica manuale.

La revisione degli artefatti introduce un'assunzione metodologica: ai fini della valutazione, la documentazione viene considerata sufficientemente corretta e completa da costituire un riferimento per il Planner. La qualità degli artefatti generati da VulcaMind, componente preesistente a VulcaTest, non viene quindi misurata quantitativamente. Questa scelta permette di concentrare la valutazione sul framework sviluppato, pur non escludendo la presenza di eventuali errori residui nella documentazione.

Prima della valutazione, codice e prompt di VulcaTest sono stati congelati. Ogni run viene eseguita a partire da una macchina ricostruita nello stato previsto per quella configurazione, senza condividere con le esecuzioni precedenti contesto agentico, risultati o modifiche ai sorgenti. Anche il nodo di healing dispone soltanto delle informazioni prodotte durante la run corrente. Questo isolamento impedisce agli agenti di sfruttare informazioni raccolte nelle esecuzioni precedenti, permettendo di osservare la variabilità del sistema nelle ripetizioni dello stesso scenario.

## 5.3 Dataset: macchine di riferimento e perturbazioni controllate

### 5.3.1 Dataset principale

Il benchmark principale comprende otto Golden Machine, selezionate tra quelle utilizzate durante lo sviluppo di VulcaTest. Le macchine presentano percorsi didattici differenti, che comprendono attività di enumerazione, sfruttamento di servizi di rete e applicazioni web, gestione di credenziali e privilege escalation. Questa varietà permette di osservare il comportamento del framework su challenge che richiedono strumenti e modalità di interazione diversi, pur rimanendo nell'ambito delle macchine Boot-to-Root. La Tabella 1 riporta le tecniche principali dell'intended path e il numero di step del relativo Golden Plan.

**Tabella 1 – Macchine del benchmark principale**

| Macchina | Tecniche principali dell'intended path | Step |
|---|---|---:|
| Pizzeria | Enumerazione web, estrazione di credenziali, privilege escalation | 10 |
| AuthGate | Cracking SSH, gestione di chiavi, privilege escalation | 10 |
| Citadel | SQL injection, command injection, SUID hijacking | 13 |
| CryptoVault | Decodifica locale, movimento laterale, SUID hijacking | 8 |
| ConsoleGate | Interazione socket TCP, cronjob, module hijacking | 8 |
| NetVault | Trasferimento DNS, cracking offline, privilege escalation | 10 |
| GitPoison | Ricognizione Git, log poisoning, privilege escalation | 10 |
| TunnelGate | Tunneling SSH, cracking offline, privilege escalation | 12 |

A partire dalle Golden Machine sono state preparate versioni modificate attraverso l'iniezione controllata di perturbazioni nei sorgenti IaC. L'iniezione intenzionale di difetti è una tecnica utilizzata nel software testing per valutare il comportamento di un sistema in presenza di errori noti [27]. Nel caso di VulcaTest, ogni perturbazione altera una condizione specifica della macchina, mantenendo nota la modifica introdotta e permettendo di riprodurla nelle successive ricostruzioni.

Per il benchmark principale sono state definite quindici perturbazioni, suddivise in tre classi in base all'effetto prodotto sulla challenge.

**Tabella 2 – Classi delle perturbazioni controllate**

| Classe | Descrizione | Esempio |
|---|---|---|
| P1 – Rimozione o indisponibilità | Un elemento necessario al percorso previsto viene rimosso o reso inutilizzabile. | Pagina web mancante o permesso necessario rimosso. |
| P2 – Alterazione di valore | Un elemento rimane presente, ma contiene un valore non coerente con quello previsto. | Password, token o chiave di decodifica errati. |
| P3 – Scorciatoia aggiuntiva | Una configurazione consente un'azione non prevista, senza necessariamente compromettere l'intended path. | File accessibile con privilegi insufficienti o utente appartenente a un gruppo privilegiato. |

Le perturbazioni P1 e P2 compromettono passaggi dell'intended path e costituiscono il nucleo della valutazione di conformità. Le perturbazioni P3 introducono invece scorciatoie che possono lasciare funzionante il percorso previsto e vengono quindi analizzate separatamente, come valutazione esplorativa.

Il loro rilevamento dipende dai controlli presenti nell'Attack Plan: se il piano non verifica una determinata restrizione, l'Executor non è tenuto a cercare autonomamente la relativa scorciatoia. Un mancato rilevamento può quindi dipendere dalla copertura della checklist anziché dall'esecuzione del test.

### 5.3.2 Scenari non incontrati durante lo sviluppo

Il benchmark principale utilizza macchine già incontrate durante lo sviluppo di VulcaTest, sebbene le perturbazioni siano state introdotte soltanto dopo il congelamento del framework. Per valutare il comportamento del sistema su scenari mai utilizzati nel suo raffinamento, è stato preparato un secondo gruppo di quattro macchine, generate e qualificate senza modificare codice o prompt di VulcaTest.

Le nuove challenge presentano percorsi differenti, comprendenti vulnerabilità applicative, gestione di credenziali e diverse tecniche di privilege escalation. La Tabella 3 ne riporta le tecniche principali e il numero indicativo di step dei Golden Plan.

**Tabella 3 – Macchine non incontrate durante lo sviluppo (dati provvisori)**

| Macchina | Tecniche principali dell'intended path | Step (provvisori) |
|---|---|---:|
| PingProbe | OS command injection, enumerazione web, privilege escalation tramite `find` | ~8 |
| DocuPortal | Upload non validato, credential leak, Python module hijacking | ~10 |
| LogViewer | Local File Inclusion / path traversal, information disclosure, SUID PATH hijacking | ~9 |
| JobDesk | Carving di backup, cracking offline MD5, privilege escalation tramite cronjob | ~9 |

Per ciascuna macchina sono state progettate tre perturbazioni controllate, una per ciascuna delle classi P1, P2 e P3 descritte nella Sezione 5.3.1, per un totale previsto di dodici perturbazioni. I risultati di questo gruppo vengono mantenuti distinti da quelli del benchmark principale.

*Nota di lavoro: i conteggi degli step sono provvisori e le dodici perturbazioni held-out sono ancora bozze non integrate nel benchmark. Verificare e aggiornare prima della versione definitiva.*

## 5.4 Disegno sperimentale e metriche di valutazione

La valutazione è articolata in tre esperimenti, ciascuno dedicato a una specifica componente del workflow. Gli esperimenti sono stati organizzati per distinguere, per quanto possibile, il contributo delle diverse componenti.

Le run seguono le condizioni di isolamento descritte nella Sezione 5.2. Codice, prompt e parametri di VulcaTest rimangono invariati anche nelle prove sulle quattro macchine aggiuntive (Sezione 5.3.2).

### 5.4.1 Valutazione del Planner (E1)

E1 valuta la capacità del Planner di generare un Attack Plan eseguibile a partire dalla documentazione revisionata di una challenge. A ogni run viene generato un nuovo piano, senza correzioni manuali, ed eseguito sulla Golden Machine. Il piano non deve coincidere con il Golden Plan, ma permettere il completamento dell'intended path.

La documentazione revisionata viene considerata sufficientemente corretta e completa. Il Planner deve quindi produrre istruzioni non ambigue, senza richiedere all'Executor di compensare eventuali errori del piano. I fallimenti vengono comunque esaminati manualmente, per distinguere quelli dovuti al Planner da problemi dell'Executor o dell'infrastruttura.

Il tasso di completamento è definito come:

\[
SR_{E1}=\frac{N_{\mathrm{COMPLETED}}}{N_{\mathrm{run}}-N_{\mathrm{escluse}}}
\]

Sono escluse soltanto le run il cui fallimento risulta indipendente dal Planner, sulla base delle evidenze raccolte. Le esclusioni vengono riportate separatamente, mentre i piani errati o ambigui rimangono nel calcolo.

### 5.4.2 Rilevazione delle non conformità (E2)

E2 valuta la capacità di VulcaTest di segnalare non conformità utilizzando un Golden Plan fisso, eseguito sia sulle Golden Machine sia sulle rispettive versioni perturbate. Il piano già validato evita di introdurre un'ulteriore variabile legata alla pianificazione.

La segnalazione viene identificata con l'emissione di un ticket iniziale, prima dell'eventuale intervento di healing. Il risultato viene confrontato con lo stato noto della macchina attraverso una *confusion matrix* (matrice di confusione):

| Stato della macchina | Ticket emesso | Nessun ticket |
|---|---|---|
| Perturbata (P1/P2) | **True Positive (TP)** | **False Negative (FN)** |
| Golden conforme | **False Positive (FP)** | **True Negative (TN)** |

I quattro casi sono definiti come segue:

- **True Positive (TP):** VulcaTest emette un ticket iniziale su una macchina perturbata.
- **False Negative (FN):** VulcaTest non emette un ticket iniziale su una macchina perturbata, indipendentemente dalla causa del mancato rilevamento.
- **False Positive (FP):** VulcaTest emette erroneamente un ticket iniziale su una Golden Machine conforme.
- **True Negative (TN):** VulcaTest completa la verifica su una Golden Machine conforme senza emettere ticket.

Questa classificazione misura la capacità di segnalazione, senza garantire che il ticket sia causalmente riconducibile alla perturbazione introdotta. Tale aspetto viene esaminato separatamente attraverso le evidenze delle esecuzioni.

Dalla matrice vengono calcolate le seguenti metriche:

\[
\mathrm{Precision}=\frac{TP}{TP+FP}
\qquad
\mathrm{Recall}=\frac{TP}{TP+FN}
\]

\[
\mathrm{Specificity}=\frac{TN}{TN+FP}
\qquad
F_1=\frac{2TP}{2TP+FP+FN}
\]

La *precision* indica la proporzione di segnalazioni emesse su macchine effettivamente perturbate, la *recall* la proporzione di esecuzioni perturbate che generano un ticket e la *specificity* la capacità di non segnalare anomalie sulle macchine conformi. L'F1-score combina precision e recall in un'unica misura.

La localizzazione viene analizzata separatamente, confrontando lo step in cui emerge il fallimento con quello atteso in base alla perturbazione. Le perturbazioni P3 non vengono incluse nella matrice principale, poiché possono lasciare funzionante l'intended path. Per queste viene esaminata la presenza di controlli pertinenti nel Golden Plan e l'eventuale rilevamento della scorciatoia, distinguendo i limiti del piano da quelli dell'esecuzione.

### 5.4.3 Valutazione del self-healing (E3)

E3 valuta la capacità del nodo di healing di correggere le perturbazioni rilevate durante la verifica. Le run con healing abilitato possono contribuire sia a E2, attraverso il risultato del test iniziale, sia a E3, attraverso l'eventuale correzione e la successiva riverifica.

Dopo l'intervento, la macchina viene ricostruita e sottoposta a un nuovo test con lo stesso Golden Plan. Per valutare la capacità di correzione al primo tentativo, `MAX_HEALING_ATTEMPTS` è impostato a 1. Ogni run prevede quindi al massimo una sessione di healing, senza ulteriori cicli di correzione basati sul feedback della riverifica.

La valutazione assume che l'Executor sia sufficientemente affidabile sia nella verifica iniziale sia nella riverifica. Poiché questa condizione non è garantita in ogni esecuzione, il risultato del retest viene affiancato dal controllo manuale della patch, verificando che la perturbazione sia stata effettivamente corretta senza compromettere l'intended path.

Il tasso di correzione viene calcolato sulle run in cui il nodo di healing è stato effettivamente eseguito:

\[
SR_{E3}=\frac{N_{\mathrm{correzioni\ riuscite}}}{N_{\mathrm{healing\ eseguiti}}}
\]

Gli esiti della riverifica vengono riportati separatamente, distinguendo i retest completati da quelli falliti. Vengono quindi evidenziati anche i casi in cui la patch è corretta, ma il retest non viene completato.

Accanto alle metriche principali vengono rilevati i tempi di esecuzione e, dove disponibili, i token utilizzati nelle diverse fasi del workflow. Questi dati vengono analizzati distinguendo pianificazione, verifica e healing.

*[Da completare: numero effettivo delle run e parametri utilizzati nella valutazione.]*
