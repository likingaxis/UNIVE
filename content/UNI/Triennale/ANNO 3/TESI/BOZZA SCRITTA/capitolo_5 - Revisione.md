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

## 5.5 Risultati

Di seguito sono riportati i risultati dei tre esperimenti, seguiti dall'analisi dei tempi di esecuzione e del consumo di token.

### 5.5.1 Valutazione del Planner (E1)

L'esperimento E1 comprende 24 esecuzioni sulle otto Golden Machine, con tre Attack Plan generati indipendentemente per ciascuna macchina e utilizzati senza correzioni manuali.

Delle 24 esecuzioni, 20 si sono concluse con stato `COMPLETED` e quattro con stato `FAILED`, per un tasso di completamento dell'83,33%. Nessuna run è stata esclusa dal calcolo. Cinque macchine hanno completato tutte e tre le ripetizioni, mentre AuthGate e TunnelGate ne hanno completate due e Citadel una.

| Macchina | Run completate | Tasso di completamento |
|---|---:|---:|
| Pizzeria | 3/3 | 100% |
| AuthGate | 2/3 | 66,67% |
| Citadel | 1/3 | 33,33% |
| CryptoVault | 3/3 | 100% |
| ConsoleGate | 3/3 | 100% |
| NetVault | 3/3 | 100% |
| GitPoison | 3/3 | 100% |
| TunnelGate | 2/3 | 66,67% |
| **Totale** | **20/24** | **83,33%** |

L'analisi delle run fallite ha evidenziato cause differenti. In AuthGate il Planner ha introdotto una condizione non necessaria sull'output di Hydra, mentre in Citadel una delle esecuzioni è fallita per un problema dell'Executor nella gestione della sessione interattiva. In TunnelGate il piano richiedeva invece una condizione documentata nel writeup, ma incompatibile con lo stato effettivo della Golden Machine. Soltanto uno dei quattro arresti è stato attribuito direttamente a un errore semantico del Planner.

La revisione dei piani ha rilevato contenuti sostanzialmente coerenti con il percorso previsto in 22 casi su 24. Il tasso di completamento dell'83,33% rappresenta quindi il risultato operativo dei piani generati, non una misura isolata della correttezza del Planner, poiché l'esito dipende anche dall'Executor e dalle condizioni di esecuzione.

### 5.5.2 Rilevazione delle non conformità (E2)

L'esperimento E2 comprende 84 esecuzioni, di cui 24 sulle Golden Machine e 60 sulle versioni perturbate. La valutazione principale considera le perturbazioni P1 e P2, per un totale di 64 esecuzioni comprendenti anche le Golden di riferimento.

| Condizione | Esecuzioni | Ticket emessi | Nessun ticket |
|---|---:|---:|---:|
| P1 — Rimozione o indisponibilità | 24 | 24 | 0 |
| P2 — Alterazione di valore | 16 | 14 | 2 |
| Golden Machine | 24 | 1 | 23 |
| **Totale** | **64** | **39** | **25** |

La matrice di confusione risultante presenta 38 true positive (TP), due false negative (FN), un false positive (FP) e 23 true negative (TN). La precision del 97,44% indica che quasi tutte le segnalazioni riguardano macchine effettivamente perturbate. La recall del 95,00% evidenzia la capacità del framework di intercettare le condizioni che compromettono l'intended path, riducendo il rischio che una macchina non conforme passi inosservata. La specificity del 95,83% mostra invece la capacità di non generare segnalazioni ingiustificate sulle macchine conformi, limitando i falsi allarmi e i potenziali interventi non necessari. L'F1-score del 96,20% riassume l'equilibrio tra precision e recall.

Le perturbazioni P1 sono state segnalate in tutte le 24 esecuzioni, mentre per le P2 sono stati emessi 14 ticket su 16, pari all'87,50%. I due falsi negativi riguardano CryptoVault e ConsoleGate, dove non è stato prodotto un ticket iniziale nonostante la presenza della perturbazione. L'unico falso positivo si è verificato sulla Golden Machine Citadel, a seguito di un problema nella gestione del contesto SSH durante l'esecuzione.

Le perturbazioni P3 sono state analizzate separatamente attraverso 20 esecuzioni, delle quali quattro hanno prodotto un ticket, pari al 20%. Tutte le segnalazioni riguardano Citadel, il cui Golden Plan prevedeva controlli indirettamente pertinenti alla modifica introdotta. Le evidenze non permettono tuttavia di attribuire con certezza tutti e quattro i fallimenti alla scorciatoia stessa. Le altre quattro configurazioni P3 non hanno generato segnalazioni.

**[Figura X — Frequenza di emissione del ticket iniziale per classe di perturbazione: grafico a barre con P1 100% (24/24), P2 87,50% (14/16) e P3 20% (4/20). P3 va distinta visivamente come valutazione esplorativa, esclusa dalle metriche principali.]**

Le metriche principali descrivono la capacità di segnalazione delle perturbazioni P1 e P2, senza certificare la correttezza della causa indicata nel ticket. Il criterio adottato considera l'emissione iniziale anche nei sei casi in cui il documento archiviato risulta parziale o non interpretabile come JSON completo. La completezza dei ticket e la capacità di rilevare proprietà non previste dal Golden Plan rimangono pertanto distinte dai risultati di classificazione riportati.

### 5.5.3 Valutazione del self-healing (E3)

L'esperimento E3 comprende 36 sessioni di healing avviate nell'ambito delle esecuzioni già considerate in E2, senza costituire ulteriori run indipendenti del benchmark. Il conteggio considera l'effettivo avvio del nodo, anche nei casi in cui non è stato prodotto un ticket iniziale valido.

Con il limite di un solo tentativo per run, 35 interventi su 36 hanno prodotto una correzione tecnicamente valida della perturbazione introdotta, per un tasso di correzione del 97,22%.

La successiva riverifica ha raggiunto lo stato `COMPLETED` in 33 esecuzioni, pari al 91,67% dei cicli di healing. La differenza tra i due risultati è riportata nella tabella seguente.

| Esito | Esecuzioni |
|---|---:|
| Correzione valida e re-test completato | 33 |
| Correzione valida, ma re-test non completato | 2 |
| Nessuna correzione applicata (`DECLINED`) | 1 |
| **Totale** | **36** |

**[Figura X — Esiti E3: barra orizzontale impilata con 33 correzioni seguite da re-test `COMPLETED`, due correzioni valide senza completamento del re-test e un caso `DECLINED`.]**

I due re-test non completati riguardano GitPoison e TunnelGate. Nel primo caso, l'Executor ha esaurito il budget disponibile durante la nuova verifica, mentre nel secondo sono emersi problemi operativi legati allo strumento di cracking John the Ripper. In entrambi i casi, la revisione dei sorgenti ha confermato la correzione della perturbazione, distinguendo il fallimento operativo da quello dell'intervento di healing.

L'unica esecuzione senza correzione riguarda Citadel con perturbazione P3-02. L'Healer ha terminato con stato `DECLINED`, senza modificare i sorgenti della macchina. Poiché la perturbazione era presente, l'esito rappresenta un mancato successo rispetto all'obiettivo sperimentale.

La revisione delle 36 sessioni ha inoltre confermato il rispetto del perimetro di modifica previsto, limitatamente ai file testuali monitorati dal sistema di tracciamento.

Il confronto tra i due tassi mostra che una correzione tecnicamente valida non garantisce da sola il completamento della riverifica. Il 97,22% descrive quindi gli interventi giudicati corretti sui sorgenti, mentre il 91,67% rappresenta il completamento operativo del ciclo di recupero.

### 5.5.4 Tempi di esecuzione e consumo di token

Oltre agli esiti dei tre esperimenti, sono stati analizzati i tempi di esecuzione e il consumo di token delle componenti agentiche. Le durate si riferiscono agli intervalli interni registrati dal framework e comprendono le esecuzioni fallite, salvo dove diversamente indicato.

| Esperimento | Durata media | Esecuzioni |
|---|---:|---:|
| E1 — Generazione e verifica | 874,13 s | 24/24 |
| E2 — Verifica iniziale | 844,87 s | 84/84 |
| E2 + E3 — Verifica, healing e riverifica | 2.089,95 s | 35/36 |

In E1, la generazione del piano e la successiva verifica richiedono mediamente circa 14 minuti e 34 secondi. L'Executor impiega 655,06 secondi e il Final Evaluator 100,51 secondi. La durata restante comprende le attività preliminari e altre operazioni interne, mentre il tempo del Planner non è disponibile come misura isolata.

La verifica iniziale di E2 richiede in media circa 14 minuti e 5 secondi, con 718,54 secondi attribuiti all'Executor e 122,07 secondi al Final Evaluator. Le medie di E1 ed E2 si riferiscono a insiemi di esecuzioni differenti e non consentono quindi un confronto diretto tra le prestazioni dei singoli nodi.

Nei cicli comprendenti il self-healing, la durata media è di circa 34 minuti e 50 secondi. Nelle 35 esecuzioni con misurazione completa, la verifica iniziale richiede in media 668,80 secondi, il controller di healing 497,66 secondi e la riverifica circa 923,53 secondi. Il controller comprende anche l'intervento dell'agente, la gestione delle modifiche e la ricostruzione della macchina. L'esecuzione terminata con `DECLINED` non dispone di un checkpoint temporale finale e non contribuisce a questa media.

**[Figura X — Ripartizione del tempo medio del ciclo E2 + E3: barra orizzontale impilata con verifica iniziale, controller di healing e riverifica. Utilizzare esclusivamente le 35 esecuzioni con misurazione completa, indicando i valori medi delle tre fasi.]**

Il consumo medio di token, ricostruito dai contatori disponibili, è riportato nella tabella seguente.

| Esperimento e componente | Input medi | Output medi | Esecuzioni |
|---|---:|---:|---:|
| E1 — Qwen, Executor e Final Evaluator | 288.929 | 20.994 | 24/24 |
| E2 — Qwen, verifica iniziale | 225.382 | 17.843 | 84/84 |
| E2 + E3 — Qwen, verifica iniziale e re-test | 462.970 | 36.548 | 36/36 |
| E3 — Antigravity, agente di healing | 134.470 | 13.856 | 36/36 |

In E1 non è stato possibile recuperare un conteggio attendibile dei token del Planner. I valori riportati comprendono pertanto soltanto Executor e Final Evaluator. In E2 il consumo riguarda la verifica iniziale, mentre per le esecuzioni E3 comprende anche l'eventuale re-test.

I consumi dell'agente Antigravity sono stati ricostruiti dalle richieste registrate nella CLI, eliminando le duplicazioni presenti nella telemetria originale. I token di ragionamento dell'agente sono già inclusi negli output riportati, mentre quelli relativi alla cache sono mantenuti separati. I consumi di Qwen e Antigravity non vengono aggregati, poiché provengono da sistemi di contabilizzazione differenti.

Queste misure caratterizzano il tempo e le risorse richieste dai percorsi operativi osservati, ma non quantificano direttamente il risparmio rispetto alla verifica e alla manutenzione manuale delle macchine, che non sono state oggetto di un confronto sperimentale.
### 5.5.5 Valutazione supplementare su scenari aggiuntivi

A differenza del benchmark principale, questa valutazione non mira a misurare sistematicamente la ripetibilità dei risultati, ma a osservare il comportamento di VulcaTest su quattro macchine non utilizzate durante lo sviluppo del framework: PingProbe, DocuPortal, LogViewer e JobDesk. L'obiettivo è verificare come il sistema si comporti su percorsi didattici differenti, mantenendo invariati il framework e la configurazione sperimentale.

Per ciascuna macchina sono state inizialmente eseguite tre run del Golden Plan, allo scopo di verificarne la corretta esecuzione. Successivamente sono state introdotte tre perturbazioni, una per ciascuna tipologia P1, P2 e P3, con una singola esecuzione per perturbazione. La valutazione comprende quindi 24 run complessive, i cui risultati sono riportati nella Tabella 5.X.

|Macchina|Golden|P1|P2|P3|
|---|---|---|---|---|
|PingProbe|3/3|Rilevata e corretta|Rilevata e corretta|Rilevata e corretta|
|DocuPortal|3/3|Rilevata e corretta|Rilevata e corretta|Non rilevata|
|LogViewer|3/3|Rilevata e corretta|Rilevata e corretta|Non rilevata|
|JobDesk|3/3|Rilevata e corretta|Rilevata e corretta|Non rilevata|

_Tabella 5.X – Risultati della valutazione supplementare. «Rilevata e corretta» indica una perturbazione che ha prodotto un fallimento iniziale, seguito da un intervento di self-healing e da un re-test completato con successo. La colonna Golden riporta le run del Golden Plan concluse con stato `COMPLETED`._

Tutte le dodici esecuzioni iniziali dei Golden Plan si sono concluse con stato `COMPLETED`, senza generare ticket diagnostici. Il risultato conferma che VulcaTest è riuscito a eseguire i percorsi previsti sulle quattro macchine aggiuntive, che comprendono tecniche differenti di accesso iniziale ed escalation dei privilegi.

Anche le otto perturbazioni P1 e P2 hanno prodotto risultati uniformi: in ogni caso l'Executor ha rilevato una difformità rispetto al piano, il Final Evaluator ha generato un ticket e il nodo di healing è intervenuto sui sorgenti della macchina. Dopo la rigenerazione e il redeploy, tutti gli otto re-test hanno completato le fasi previste. Lo stesso comportamento è stato osservato per la perturbazione P3 di PingProbe, che introduceva privilegi sudo più ampi rispetto a quelli attesi.

Le altre tre perturbazioni P3 hanno invece evidenziato un limite della verifica. In DocuPortal e JobDesk, le modifiche ai permessi della root flag non hanno impedito il completamento dei rispettivi piani, mentre in LogViewer l'aggiunta di un gruppo privilegiato è rimasta senza segnalazione, pur comparendo nelle evidenze raccolte. In tutti e tre i casi, l'esecuzione è terminata con stato `COMPLETED`, senza generare ticket né attivare il self-healing. Questi risultati mostrano che il completamento del percorso didattico non garantisce, da solo, l'assenza di configurazioni aggiuntive o potenziali scorciatoie non previste: il rilevamento dipende anche dai controlli definiti nell'Attack Plan.

Nel complesso, la valutazione fornisce evidenze favorevoli sulla capacità di VulcaTest di operare su scenari aggiuntivi, eseguendo i percorsi previsti e intervenendo sulle difformità che ne compromettono la conformità. Al tempo stesso, i risultati delle P3 evidenziano i limiti di una verifica basata prevalentemente sul comportamento atteso. Considerati il numero contenuto di macchine e la singola esecuzione per perturbazione, queste osservazioni hanno carattere esplorativo e non costituiscono una misura generale delle prestazioni del framework.


## 5.6 Casi di studio

Per approfondire il comportamento di VulcaTest oltre i risultati aggregati, sono state selezionate tre esecuzioni che illustrano situazioni differenti: un ciclo di ripristino completato, una correzione riuscita senza completamento della riverifica e una perturbazione non rilevata perché esterna ai controlli previsti dall'Attack Plan.

### 5.6.1 Pizzeria: rilevamento e ripristino di un difetto

Il percorso d'attacco della macchina Pizzeria inizia con l'esplorazione di un'applicazione web, dalla quale il partecipante deve individuare le risorse necessarie per proseguire nelle fasi successive. La perturbazione P1-01 rimuove dalla ricetta IaC il componente responsabile della distribuzione dell'applicazione sul server. Durante la verifica, l'Executor raggiunge la seconda fase del Golden Plan, ma le risorse web previste non risultano disponibili e restituiscono risposte HTTP 404. Il Final Evaluator segnala il fallimento e individua, tra le possibili cause, un problema nel deployment dell'applicazione.

L'Healer esamina quindi i sorgenti della macchina e ripristina il componente `web-app-deploy` nella ricetta IaC. VulcaTest rigenera il bundle, ricostruisce la macchina e avvia una nuova verifica con lo stesso Golden Plan. Questa volta le risorse web risultano accessibili e l'esecuzione prosegue fino allo stato `COMPLETED`. Il caso mostra come il framework possa partire da un'anomalia osservata durante il percorso d'attacco, intervenire sulla configurazione della macchina e verificare il ripristino attraverso una nuova esecuzione completa.

### 5.6.2 GitPoison: correzione riuscita e riverifica incompleta

Nella macchina GitPoison, il percorso previsto richiede inizialmente di recuperare un repository Git esposto attraverso il servizio web, per consultarne la cronologia e ottenere informazioni utili alle fasi successive. La perturbazione P1-14 rimuove il componente che rende accessibile il repository, impedendo quindi di proseguire nell'attacco. Durante la verifica iniziale, l'Executor tenta di accedere alla risorsa Git prevista dal piano, ma riceve una risposta HTTP 404. L'Healer interviene sui sorgenti ripristinando il componente `web-git-leak`, dopodiché la macchina viene ricostruita.

Nel re-test, il repository torna accessibile e l'Executor riesce a recuperarne i contenuti, completando le prime cinque fasi del Golden Plan. L'esecuzione si interrompe però alla sesta fase, quando il modello linguistico supera la finestra di contesto disponibile. Il risultato finale rimane quindi `FAILED`, nonostante il difetto introdotto sia stato corretto. Questo caso evidenzia come il successo della riparazione e quello dell'intero ciclo operativo siano due aspetti distinti: una modifica corretta ai sorgenti non garantisce, da sola, che la successiva verifica venga completata.

### 5.6.3 NetVault: limiti della copertura dell'Attack Plan

La macchina NetVault prevede, tra i primi passaggi del percorso d'attacco, un trasferimento della zona DNS, attraverso il quale il partecipante può ottenere i record del dominio e individuare informazioni utili a proseguire. La perturbazione P3-06 aggiunge un record DNS TXT denominato `vault-internal`, non previsto dalla configurazione di riferimento, senza rimuovere i record necessari al percorso didattico. Durante la verifica, l'Executor esegue correttamente il trasferimento della zona e riceve anche il record aggiuntivo introdotto dalla perturbazione.

Il Golden Plan richiede tuttavia di verificare che il trasferimento riesca e che siano presenti i record attesi, senza prevedere un controllo sull'eventuale presenza di informazioni aggiuntive. Di conseguenza, la fase viene considerata superata e l'intera esecuzione termina con stato `COMPLETED`, senza generare un ticket né avviare il self-healing. Il caso, appartenente alla valutazione esplorativa P3, evidenzia come una difformità possa essere visibile nei risultati della verifica senza essere segnalata, quando l'Attack Plan non contiene un controllo specifico per riconoscerla.

### 5.7 Discussione e limiti della valutazione

I risultati sperimentali mostrano che VulcaTest può ridurre significativamente il lavoro manuale necessario per verificare la conformità degli scenari Cyber Range e intervenire sui difetti riscontrati. Il contributo principale non consiste nell'automazione di singoli comandi di penetration testing, ma nell'integrazione di pianificazione, esecuzione, valutazione e ripristino all'interno di un workflow controllato, nel quale gli esiti delle verifiche possono guidare gli interventi successivi.

Un primo aspetto riguarda il rapporto tra Planner ed Executor. La separazione dei due componenti permette di definire preventivamente il percorso da verificare e di eseguirlo mantenendo distinti gli obiettivi del test dalle decisioni operative. Tuttavia, l'efficacia della verifica dipende dalla qualità dell'Attack Plan: un piano incompleto o contenente controlli non sufficientemente specifici può compromettere l'esito della valutazione anche quando l'Executor opera correttamente. La validazione dei Golden Plan costituisce quindi un passaggio fondamentale per distinguere i difetti della macchina da quelli della specifica di test.

Un limite strettamente collegato riguarda la copertura dei controlli. VulcaTest verifica principalmente che il percorso didattico previsto sia effettivamente percorribile, ma questo non garantisce l'assenza di vulnerabilità aggiuntive o scorciatoie non contemplate dal piano. Tale distinzione emerge anche nella valutazione supplementare sulle quattro macchine aggiuntive: mentre tutte le perturbazioni P1 e P2 sono state rilevate e corrette, tre delle quattro perturbazioni P3 non hanno prodotto alcuna segnalazione. In questi casi, il completamento dell'Attack Plan non è stato sufficiente a individuare le modifiche introdotte. L'estensione della copertura richiede pertanto controlli mirati anche ai comportamenti non previsti, senza confondere la verifica di conformità del percorso atteso con un'analisi esaustiva della sicurezza della macchina.

Per quanto riguarda il self-healing, gli esperimenti evidenziano la possibilità di passare dal rilevamento di una non conformità alla modifica dei sorgenti e alla successiva riverifica dello scenario. La distinzione tra controlli _in-band_, eseguiti dall'esterno della macchina, e interventi _out-of-band_, effettuati sui sorgenti durante il ripristino, consente di mantenere separati il punto di vista del test e quello della correzione. Il completamento del re-test fornisce una verifica operativa dell'intervento, ma non garantisce che la soluzione adottata sia l'unica possibile o che preservi ogni proprietà dello scenario non esplicitamente controllata dall'Attack Plan.

La tracciabilità costituisce un ulteriore elemento rilevante. La conservazione delle evidenze, dei ticket diagnostici, delle modifiche applicate e degli esiti dei re-test permette di ricostruire il comportamento del framework e di esaminare criticamente le decisioni degli agenti. Questo aspetto rimane particolarmente importante perché le diagnosi prodotte dai modelli linguistici sono ipotesi formulate sulla base delle informazioni disponibili, non accertamenti indipendenti della causa del difetto.

Infine, i risultati devono essere interpretati considerando i limiti del disegno sperimentale. Le perturbazioni controllate permettono di confrontare il comportamento osservato con una ground truth nota, ma non rappresentano l'intera varietà dei difetti riscontrabili in ambienti reali. Inoltre, gli scenari appartengono allo stesso ecosistema tecnologico e la valutazione supplementare, pur introducendo macchine non utilizzate durante lo sviluppo, comprende una sola esecuzione per perturbazione. Non è quindi possibile estendere automaticamente i risultati a Cyber Range differenti o ricavarne conclusioni sulla stabilità delle prestazioni in condizioni non esaminate.

Nel complesso, la valutazione sostiene l'utilità dell'approccio proposto per automatizzare la verifica e il ripristino dei percorsi didattici previsti. Al tempo stesso, evidenzia come l'affidabilità del processo dipenda non soltanto dalle capacità degli agenti, ma anche dalla qualità della specifica di test, dalla copertura dei controlli e dalla possibilità di verificare gli effetti delle correzioni applicate.