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

**[Figura X — Risultati E1 per macchina: grafico a barre orizzontali impilate che distingue le esecuzioni `COMPLETED` e `FAILED` nelle tre ripetizioni.]**

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

## 5.7 Discussione e limiti della valutazione

I risultati ottenuti mostrano come VulcaTest possa contribuire ad automatizzare la verifica e la manutenzione degli scenari Cyber Range. Il contributo principale risiede nell'integrazione tra controllo della conformità, individuazione dei problemi e ripristino delle macchine, con l'obiettivo di ridurre il lavoro manuale necessario a mantenerle funzionanti.

La valutazione ha messo in evidenza l'importanza del rapporto tra Planner ed Executor. Per essere efficace, un Attack Plan deve descrivere correttamente il percorso didattico, rispettarne le dipendenze e stabilire quali evidenze siano necessarie per considerare superato ciascun passaggio. È però altrettanto importante non vincolare l'esecuzione a dettagli secondari, come particolari formulazioni degli output degli strumenti. L'Executor deve poter gestire queste variazioni senza modificare gli obiettivi del piano, mentre eventuali errori nella specifica non dovrebbero essere compensati arbitrariamente. Il completamento della verifica dipende quindi tanto dalla qualità del piano quanto dalla capacità di eseguirlo.

Le perturbazioni P3 hanno mostrato un altro aspetto importante: verificare il corretto funzionamento dell'intended path non significa necessariamente escludere la presenza di scorciatoie o configurazioni indesiderate. Il comportamento dell'Executor dipende infatti dai controlli previsti nell'Attack Plan. Questa caratteristica non impedisce di ampliare la verifica: si potrebbero aggiungere controlli specifici su permessi, configurazioni o altre proprietà della macchina, estendendo gli obiettivi del piano. Si tratta tuttavia di una possibilità che richiederebbe ulteriori prove per valutarne l'efficacia.

Per quanto riguarda il self-healing, la separazione tra verifica *in-band* e correzione *out-of-band* consente di osservare la macchina dal punto di vista del partecipante e, successivamente, intervenire sui sorgenti per correggere i problemi riscontrati. La diagnosi del Final Evaluator rappresenta un'indicazione iniziale che l'Healer può verificare, senza doverla necessariamente considerare corretta. Una volta applicata la modifica, il Golden Plan viene rieseguito dall'inizio, permettendo di verificare il ripristino dell'intero percorso anziché del solo passaggio fallito. Anche la tracciabilità svolge un ruolo importante: piani, risultati dei comandi, report e patch permettono di ricostruire quanto accaduto e facilitano l'intervento dell'operatore nei casi in cui l'automazione non sia sufficiente.

Restano alcuni limiti da considerare nell'interpretazione dei risultati. Le otto macchine principali erano già state utilizzate durante lo sviluppo e la loro documentazione era stata revisionata manualmente. Il numero contenuto di scenari e ripetizioni non permette quindi di estendere automaticamente i risultati ad ambienti più eterogenei. Inoltre, durante E1 un problema di parsing ha impedito di trasferire l'ultima checklist dei piani generati, limitando la completezza delle verifiche effettivamente eseguite. Anche il self-healing è stato valutato con un solo tentativo di correzione, senza esplorare gli effetti di eventuali tentativi successivi.

Infine, pur avendo osservato numerose verifiche e correzioni completate autonomamente, non è stato svolto un confronto diretto con il lavoro di un operatore umano. La riduzione dell'impegno manuale rimane quindi un obiettivo concreto del framework, sostenuto dalle capacità dimostrate, ma non ancora quantificato sperimentalmente.
