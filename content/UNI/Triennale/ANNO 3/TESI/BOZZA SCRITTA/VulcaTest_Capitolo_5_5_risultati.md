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
