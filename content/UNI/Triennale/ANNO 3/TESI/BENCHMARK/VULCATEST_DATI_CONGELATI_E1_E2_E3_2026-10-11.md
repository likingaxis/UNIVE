# VulcaTest — dati sperimentali congelati (E1, E2, E3)

**Data di consolidamento:** 11 ottobre 2026  
**Stato:** snapshot di riferimento per il Capitolo 5; non è un nuovo esperimento.  
**Ambito:** le **otto** macchine del benchmark principale: Pizzeria, AuthGate, Citadel, CryptoVault, ConsoleGate, NetVault, GitPoison, TunnelGate. Le quattro macchine non incontrate durante lo sviluppo sono **escluse**: i relativi esperimenti sono ancora in corso.  
**Convenzione:** percentuali arrotondate a due decimali; per i calcoli fanno fede le frazioni e i conteggi interi. `N/D` indica numeratore/denominatore; `n/N` indica la copertura della telemetria.

> **Regola per non confondere le coorti:** E1 = **24 run distinte** (8 macchine × 3); E2 = **84 run distinte** (24 Golden + 60 perturbate). I **36 cicli E3 sono sottoinsiemi di run E2**, non altre 36 run indipendenti. Il totale distinto nel benchmark principale è quindi **108 run (24 + 84)**. Non usare più, per E1 principale, le statistiche del vecchio campione da 33 run.

## 1. Riepilogo delle misure da presentare nella tesi

| Esperimento | Indicatore | Risultato | Cosa significa |
|---|---|---:|---|
| E1 | Completamento operativo | **20/24 = 83,33%** | Piano nuovo generato a ogni run e test concluso `COMPLETED` sulla Golden Machine |
| E1 | Piani sostanzialmente coerenti (audit qualitativo) | **22/24 = 91,67%** | Criterio dell'audit sul contenuto, non completezza del parsing o successo operativo |
| E2 (P1+P2) | Precision | **38/39 = 97,44%** | Fra le segnalazioni su P1/P2 e Golden, quota su macchine perturbate |
| E2 (P1+P2) | Recall | **38/40 = 95,00%** | Frequenza di emissione del ticket iniziale sulle macchine P1/P2 |
| E2 (P1+P2) | Specificity | **23/24 = 95,83%** | Golden Machine senza ticket iniziale |
| E2 (P1+P2) | F1-score | **76/79 = 96,20%** | Sintesi di precision e recall |
| E2 (P3, esplorativo) | Emissione di ticket | **4/20 = 20,00%** | Non equivale a diagnosi causale della scorciatoia |
| E3 | Ripristino della proprietà IaC/bundle | **35/36 = 97,22%** | Correttezza tecnica osservata della riparazione; criterio dell'audit statico |
| E3 | Recupero operativo | **33/36 = 91,67%** | Riverifica post-healing `COMPLETED` sullo stesso piano |
| E3 | Successi fra i soli re-test avviati | **33/35 = 94,29%** | Indicatore condizionato, secondario; un ciclo è terminato prima del re-test |

**Interpretazione centrale:** le misure E1, E2 ed E3 riguardano fenomeni differenti e **non vanno presentate come tre percentuali direttamente comparabili di accuratezza**. Per E2 il benchmark principale comprende P1+P2; P3 ha funzione esplorativa e resta separata.

## 2. E1 — Generazione e verifica del piano

### 2.1 Campione ed esiti per macchina

Tre generazioni autonome di Attack Plan per ciascuna delle otto Golden Machine; nessuna correzione manuale del piano generato nella run. Per il calcolo operativo **nessuna run è esclusa**, anche in presenza di problemi dell'Executor o dell'ambiente.

| Macchina | Run 1 | Run 2 | Run 3 | `COMPLETED` |
|---|---|---|---|---:|
| Pizzeria | COMPLETED | COMPLETED | COMPLETED | 3/3 |
| AuthGate | COMPLETED | FAILED | COMPLETED | 2/3 |
| Citadel | FAILED | COMPLETED | FAILED | 1/3 |
| CryptoVault | COMPLETED | COMPLETED | COMPLETED | 3/3 |
| ConsoleGate | COMPLETED | COMPLETED | COMPLETED | 3/3 |
| NetVault | COMPLETED | COMPLETED | COMPLETED | 3/3 |
| GitPoison | COMPLETED | COMPLETED | COMPLETED | 3/3 |
| TunnelGate | COMPLETED | FAILED | COMPLETED | 2/3 |
| **Totale** | | | | **20/24** |

- **20 `COMPLETED`, 4 `FAILED`**, **5/8** macchine con successo in tutte e tre le ripetizioni.
- Quattro fallimenti: **AuthGate run2**, **Citadel run1**, **Citadel run3**, **TunnelGate run2**. Le cause vanno discusse individualmente: il `FAILED` non dimostra automaticamente un errore del Planner.
- **24/24** piani nuovi salvati; **22/24** contenuti sostanzialmente coerenti secondo la revisione qualitativa già condotta. I due giudizi negativi sono AuthGate run2 e TunnelGate run2.

### 2.2 Formula (4) della tesi

$$SR_{E1}=\frac{N_{\mathrm{COMPLETED}}}{N_{\mathrm{run}}-N_{\mathrm{escluse}}}
=\frac{20}{24-0}=\boxed{83{,}33\%}.$$

**Definizione dell'endpoint:** completamento del sistema Planner + Executor + Final Evaluator, con piano generato nella run. Non è un'accuratezza semantica del solo Planner.

## 3. E2 — Rilevazione delle non conformità

### 3.1 Disegno del campione

- **24 Golden**, tre run per ognuna delle otto macchine (controlli negativi).
- **60 perturbate**, 15 celle sperimentali con quattro ripetizioni ciascuna: **P1 = 6 × 4 = 24**, **P2 = 4 × 4 = 16**, **P3 = 5 × 4 = 20**.
- Ogni run E2 utilizza una copia del **Golden Plan già qualificato e congelato**; il Planner **non** genera un piano nuovo in E2. Le copie archiviate risultano coerenti con i piani usati nel benchmark.
- **Endpoint binario:** emissione di testo del **ticket iniziale**, prima di eventuale healing. I sei ticket salvati come testo parziale/non parseabile contano come emissione; un semplice stato `FAILED` **senza ticket** non conta.
- Due run precedentemente segnate TP sono quindi **FN** nell'endpoint operativo: `consolegate_P2-06_run1` e `cryptovault_P2-03_run1` (assenza del ticket iniziale). Questa riclassificazione sostituisce i vecchi conteggi TP=44, FN=16, non annulla i fallimenti osservati.

### 3.2 Matrice principale, P1 + P2 soltanto

| Stato reale | Ticket iniziale emesso | Nessun ticket iniziale | Totale |
|---|---:|---:|---:|
| Perturbata P1/P2 | **TP = 38** | **FN = 2** | **40** |
| Golden conforme | **FP = 1** | **TN = 23** | **24** |
| **Totale** | **39** | **25** | **64** |

Formule **(5)–(6)** della tesi, con sostituzione numerica:
$$\mathrm{Precision}=\frac{TP}{TP+FP}=\frac{38}{38+1}=\frac{38}{39}=\boxed{97{,}44\%},$$
$$\mathrm{Recall}=\frac{TP}{TP+FN}=\frac{38}{38+2}=\frac{38}{40}=\boxed{95{,}00\%},$$

$$\mathrm{Specificity}=\frac{TN}{TN+FP}=\frac{23}{23+1}=\frac{23}{24}=\boxed{95{,}83\%},$$
$$F_1=\frac{2TP}{2TP+FP+FN}=\frac{2\cdot38}{76+1+2}=\frac{76}{79}=\boxed{96{,}20\%}.
$$

Indicatore derivabile **aggiuntivo**, non incluso fra le quattro formule principali della tesi: accuracy = `(38+23)/64 = 61/64 = 95,31%`. Se non necessario, **non riportarlo** per evitare ridondanza.

### 3.3 Risultati per classe e per perturbazione

| Classe | Ticket emessi | Senza ticket | Totale | Frequenza ticket |
|---|---:|---:|---:|---:|
| P1 — rimozione/indisponibilità | **24** | 0 | 24 | **100,00%** |
| P2 — alterazione di valore | **14** | 2 | 16 | **87,50%** |
| **P1 + P2 — principale** | **38** | **2** | **40** | **95,00%** |
| P3 — scorciatoia aggiuntiva (*esplorativa*) | **4** | **16** | **20** | **20,00%** |

| Cella | Macchina | Alterazione controllata, in sintesi | Ticket iniziale |
|---|---|---|---:|
| P1-01 | Pizzeria | Rimosso il deploy dell'applicazione web | 4/4 |
| P1-03 | AuthGate | Alterata disponibilità del virtual host previsto | 4/4 |
| P1-10 | Citadel | Rimosso `/opt/backup.sh` | 4/4 |
| P1-13 | ConsoleGate | Rimossa scrittura di gruppo necessaria | 4/4 |
| P1-14 | GitPoison | Rimossa esposizione del repository Git | 4/4 |
| P1-16 | NetVault | Rimosso componente DNS | 4/4 |
| P2-03 | CryptoVault | Alterato il materiale di decodifica | 3/4 |
| P2-04 | Pizzeria | Credenziale SSH incoerente con il percorso | 4/4 |
| P2-06 | ConsoleGate | Autenticazione incoerente con informazione trapelata | 3/4 |
| P2-07 | TunnelGate | Alterato hash/leak utilizzato nel cracking | 4/4 |
| P3-02 | Citadel | Permesso del file cron ampliato (`0644 → 0666`) | 4/4 |
| P3-03 | CryptoVault | Proprietario di un file protetto reso meno restrittivo | 0/4 |
| P3-06 | NetVault | Record DNS aggiuntivo esposto nella zona | 0/4 |
| P3-07 | TunnelGate | Utente inserito nel gruppo privilegiato `shadow` | 0/4 |
| P3-08 | GitPoison | Permessi del file finale allargati (`0400 → 0644`) | 0/4 |

**Note interpretative E2:**

1. Il solo ticket misura **segnalazione**, non accuratezza della *root cause* descritta dal Final Evaluator. Un ticket può essere genericamente pertinente oppure dipendere da un errore dell'Executor.
2. Il **falso positivo Golden** è una run **Citadel**, riconducibile alle difficoltà di gestione del contesto/sessione SSH nel framework; non va omesso.
3. Il **4/4 P3 Citadel** è una segnalazione su macchina perturbata, **non** una prova di rilevamento causale dei permessi cron. Nessun Golden Plan contiene un controllo diretto della specifica restrizione P3 introdotta; Citadel include solo controlli indiretti del percorso. Negli altri quattro scenari P3 il percorso può restare eseguibile senza asserzioni pertinenti alla scorciatoia.
4. Due run TunnelGate P2-07 sono confondibili con problemi del tool di cracking John; alcuni casi Citadel P3-02 sono confondibili con anomalie SSH/sessione. Non attribuire automaticamente ogni blocco alla perturbazione.
5. Le **84 copie storiche del Golden Plan** soffrono anch'esse della perdita della checklist dell'ultimo step durante il parsing. Ciò limita la copertura dimostrata dell'oracolo, pur lasciando intatti i risultati operativi registrati.

### 3.4 Aggregazione P1+P2+P3 — *solo descrittiva, non metrica principale*

Se serve per riconciliare tutti gli 84 record E2: **TP = 42, FN = 18, FP = 1, TN = 23**; 42+18+1+23=84.

| Metrica su tutte le classi | Calcolo | Risultato |
|---|---|---:|
| Precision | 42/43 | 97,67% |
| Recall / frequenza ticket sulle perturbate | 42/60 | 70,00% |
| Specificity | 23/24 | 95,83% |
| F1 | 84/103 | 81,55% |
| Accuracy (derivata) | 65/84 | 77,38% |

**Non sostituire** con questa aggregazione la matrice P1+P2 della Sezione 5.4.2: P3 risponde a una domanda esplorativa diversa.

### 3.5 Audit qualitativo della diagnosi — sottocampione, non accuratezza globale

Un audit separato ha riesaminato **20** ticket che il validatore storico aveva classificato `ticket_matches_fault=false`: **4** risultano tecnicamente corretti (causa e componente), **12** descrivono correttamente solo componente/sintomo, **3** non sono pertinenti alla mutazione e **1** non è valutabile perché il ticket iniziale è stato sovrascritto dal re-test. Questi venti casi **non costituiscono tutto l'insieme dei ticket E2**; non calcolare un'accuratezza diagnostica globale da questa distribuzione.

Il validatore storico confrontava campi e stringhe, senza ispezionare semanticamente la causa; i suoi booleani originali **non** possono essere presentati come una misura rigorosa della qualità causale delle diagnosi. Se nel Capitolo 5 si menziona la diagnosi, preferire un'analisi qualitativa esemplificata anziché una percentuale globale non supportata.

## 4. E3 — Self-healing

### 4.1 Coorte e definizioni

- **36 cicli di healing realmente avviati** all'interno delle run perturbate E2 (nessuna nuova run indipendente). `MAX_HEALING_ATTEMPTS = 1`.
- **35/36** sessioni `PATCHED` con ripristino tecnico della proprietà alterata verificato negli artefatti IaC/bundle; **1/36** `DECLINED` senza riparazione pertinente.
- **35** rebuild/deploy e re-test avviati; **33** re-test `COMPLETED` e **2** non completati. Un ciclo si interrompe prima di build e re-test.
- **36/36** senza residui testuali non autorizzati *entro il perimetro monitorato*. Questa evidenza **non** è un'attestazione globale di integrità/sicurezza del filesystem host.
- **Due** cicli E3 riusciti sono nelle due run iniziali riclassificate E2 come **FN senza ticket** (`consolegate_P2-06_run1`, `cryptovault_P2-03_run1`): il denominatore **36 riguarda l'healing osservato**, non “36 TP E2”. Perciò la descrizione del campionamento E3 va allineata ai fatti e non può dichiarare che ogni ciclo E3 provenga da un ticket iniziale valido.

### 4.2 Formula (7) della tesi e indicatore operativo distinto

La formula della 5.4.3 è `SR_E3 = N_correzioni_riuscite / N_healing_eseguiti`. Se “correzione riuscita” indica il **ripristino tecnico verificato della proprietà alterata**, allora:

$$SR_{E3,\,\mathrm{tecnico}}=\frac{35}{36}=\boxed{97{,}22\%}.$$

Misura **distinta**, da definire esplicitamente in tesi:

$$SR_{E3,\,\mathrm{operativo}}=\frac{N_{\mathrm{retest\ COMPLETED}}}{N_{\mathrm{healing\ avviati}}}
=\frac{33}{36}=\boxed{91{,}67\%}.$$

Fra i 35 re-test effettivamente avviati: `33/35 = 94,29%`. Il 33/36 rimane l'endpoint operativo non condizionato principale. I giudizi tecnici derivano soprattutto dal confronto dei sorgenti IaC post-patch e del bundle ricostruito; la riparazione corretta non implica da sola un re-test completato.

### 4.3 Esiti per classe e per cella sperimentale

| Classe | Cicli avviati | Ripristino tecnico | Re-test `COMPLETED` |
|---|---:|---:|---:|
| P1 | 19 | 19/19 | 18/19 |
| P2 | 13 | 13/13 | 12/13 |
| P3 | 4 | 3/4 | 3/4 |
| **Totale** | **36** | **35/36** | **33/36** |

| Cella | Macchina | Healing osservati | Ripristino IaC/bundle | Recupero `COMPLETED` |
|---|---|---:|---:|---:|
| P1-01 | Pizzeria | 4 | 4 | 4 |
| P1-03 | AuthGate | 3 | 3 | 3 |
| P1-10 | Citadel | 3 | 3 | 3 |
| P1-13 | ConsoleGate | 3 | 3 | 3 |
| P1-14 | GitPoison | 3 | 3 | 2 |
| P1-16 | NetVault | 3 | 3 | 3 |
| P2-03 | CryptoVault | 3 | 3 | 3 |
| P2-04 | Pizzeria | 4 | 4 | 4 |
| P2-06 | ConsoleGate | 3 | 3 | 3 |
| P2-07 | TunnelGate | 3 | 3 | 2 |
| P3-02 | Citadel | 4 | 3 | 3 |
| **Totale** | | **36** | **35** | **33** |

**I tre mancati recuperi operativi:**

| Run | Riparazione tecnica | Esito operativo / limite |
|---|---|---|
| `citadel_P3-02_run4` | No: `DECLINED` | Nessun rebuild e nessun re-test; alterazione del cron ancora presente |
| `gitpoison_P1-14_run3` | Sì | Re-test fallito per esaurimento della finestra di contesto dell'Executor |
| `tunnelgate_P2-07_run4` | Sì | Re-test interrotto dal lock del recovery file del tool John su Kali |

**Confronto Golden dei 35 ripristini tecnici:** 29 ricette IaC strutturalmente coincidenti con la Golden e 6 semanticamente equivalenti rispetto alla proprietà alterata (1 Citadel, 3 GitPoison, 2 Pizzeria). Il rispetto del perimetro è verificato sul diff testuale monitorato, non sull'intero runtime.

## 5. Telemetria consolidata: tempi

**Definizione temporale:** intervalli **interni strumentati** di VulcaTest, generalmente da `start_ts` di `main.py` al checkpoint dopo il Final Evaluator; non corrispondono al tempo completo del runner né comprendono necessariamente ogni attività esterna di provisioning. Le medie non sono misure della sola inferenza LLM.

### 5.1 Durata complessiva dei percorsi

| Percorso | Durata media (s) | Durata media leggibile | Copertura |
|---|---:|---:|---:|
| **E1 — generazione + verifica** | **874,13** | **14 min 34 s** | 24/24 |
| **E2 — detection iniziale** | **844,87** | **14 min 05 s** | 84/84 |
| **E2+E3 — detection + healing + eventuale re-test** | **2.089,95** | **34 min 50 s** | 35/36 |

L'ultima media include due re-test non completati; manca il checkpoint conclusivo del solo `citadel_P3-02_run4` (`DECLINED`). Non imputare a zero l'intervallo mancante; **la media 35/36 non descrive tutte le 36 run senza riserve**. In `pizzeria_P2-04_run1` è documentata una discrepanza di **−1,875 s** fra wall clock e somma dei timer: non forzare la riconciliazione. Controllo escludendo il solo caso anomalo: 2.109,13 s su 34/36.

### 5.2 Tempi medi per fase

| Esperimento / campione | Fase | Media (s) | Copertura / precisazione |
|---|---|---:|---|
| E1 | Finestra preparazione del piano | 114,67 | 24/24; include caricamento, generazione, parsing e salvataggio; **non** tempo isolato Planner |
| E1 | Executor iniziale | 655,06 | 24/24 |
| E1 | Final Evaluator iniziale | 100,51 | 24/24 |
| E1 | Planner isolato | **N/D** | 0/24; non separabile |
| E2 | Executor iniziale | 718,54 | 84/84 |
| E2 | Final Evaluator iniziale | 122,07 | 84/84 |
| E2+E3 | Detection iniziale sulle run con checkpoint finale | 668,80 | 35/35; **sottoinsieme appaiato**, non l'intero E2 |
| E2+E3 | Executor iniziale sullo stesso sottoinsieme | 519,01 | 35/35 |
| E2+E3 | Final Evaluator iniziale sullo stesso sottoinsieme | 145,47 | 35/35 |
| E2+E3 | Controller healing (agente + preparazione/build/deploy) | 497,66 | 35/35; include il tempo CLI sottostante |
| E2+E3 | Sessione agente Antigravity (nel controller) | 169,83 | 35/35; **non aggiungere** al controller |
| E2+E3 | Controller meno sessione agente | 327,83 | 35/35; residuo complessivo, non solo build |
| E2+E3 | Executor re-test | 827,90 | 35/35 |
| E2+E3 | Final Evaluator re-test | 95,63 | 35/35; finestra FE corrente |
| E3 | Sessione Antigravity, compreso `DECLINED` | 166,71 | 36/36; diversa coorte dalla riga 35/35 |

I subtimer possono sovrapporsi (es. Antigravity dentro controller) e alcuni confini hanno piccole discrepanze: **non sommare righe indiscriminatamente**. Build, deploy e generazione bundle **non** dispongono di timer indipendenti validati.

## 6. Telemetria consolidata: token input/output

**Regola:** medie aritmetiche per run dei contatori originali. Qwen locale (`ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF`) e Gemini via Antigravity (alias CLI `gemini-3.8-flash-high`, `response_model` `gemini-3.8-flash-n`) hanno contatori/runtime diversi: mantenere **separati** gli input e gli output, senza sommarli in un unico numero. Per Gemini, output **già comprensivo di thinking**; cache separata.

### 6.1 Medie per nodo e percorso

| Esperimento | Runtime / nodo | Input medi | Output medi | Copertura |
|---|---|---:|---:|---:|
| E1 | Qwen — Planner | **N/D** | **N/D** | 0/24 (usage perso, zero strumentale non valido) |
| E1 | Qwen — Executor | 286.109,13 | 16.057,33 | 24/24 |
| E1 | Qwen — Final Evaluator | 2.819,75 | 4.936,63 | 24/24 |
| **E1** | **Qwen — subtotal Executor+FE; Planner escluso** | **288.928,88** | **20.993,96** | **24/24** |
| E2 | Qwen — Executor iniziale, sottoinsieme disponibile | 274.397,31 | 15.391,90 | **49/84**, selezione non casuale |
| E2 | Qwen — Final Evaluator iniziale, stesso sottoinsieme | 3.080,08 | 4.710,47 | **49/84**, selezione non casuale |
| **E2** | **Qwen — intera detection iniziale, Executor+FE** | **225.381,52** | **17.842,60** | **84/84** |
| E3 | Qwen — Executor re-test, se avviato | 311.526,40 | 17.748,71 | 35/35 re-test |
| E3 | Qwen — Final Evaluator re-test, se avviato | 2.291,00 | 4.476,71 | 35/35 re-test |
| E3 | Qwen — subtotal re-test | 313.817,40 | 22.225,43 | 35/35 re-test |
| **E2+E3** | **Qwen — detection + eventuale re-test, stessa coorte healing** | **462.969,78** | **36.548,31** | **36/36 cicli** |
| **E3** | **Gemini / Antigravity — sole sessioni agente deduplicate** | **134.469,67** | **13.856,22** | **36/36 sessioni** |

**Attenzioni essenziali:**

- E1: i token Planner **non sono recuperabili**; `planner_tokens.json = 0` è un errore di estrazione, non un utilizzo nullo. Il subtotal Qwen E1 non è il consumo complessivo della pipeline E1.
- E2: la ripartizione Executor/Final Evaluator iniziale esiste per **49/84** run senza sovrascrittura del summary; **non** aggiungere le due medie 49/84 e trattarle come media generale di 84. La riga E2 84/84 è il dato completo della detection.
- E3: il **totale Qwen 36/36** include per ogni ciclo la detection iniziale e il re-test se realmente avviato. Il ciclo `DECLINED` consuma soltanto Qwen iniziale; non assume token di re-test inesistenti.
- Antigravity: usage recuperato dai **36 DB CLI**, con **664 richieste distinte** identificate per `message_id` e `response_id`. I vecchi `healer_tokens.json` erano **doppi**: i valori qui indicati sommano ogni richiesta **una volta**. Input/output dell'agente vanno letti nei campi nativi `ModelUsageStats`; non includere due volte il thinking.
- Cache Antigravity **tenuta separata**: `cache_read_tokens = 30.407.583` in totale, media **844.655,08** a sessione, `cache_write_tokens = 0`. Dagli artefatti non si giustifica il suo riaccorpamento ad altri campi per calcolare un unico volume di contesto o un costo.

### 6.2 Somme originali di controllo

| Coorte | Token input totali | Token output totali | n | Ambito |
|---|---:|---:|---:|---|
| E1 Qwen Executor+FE | 6.934.293 | 503.855 | 24 | Escluso Planner |
| E2+E3 Qwen nelle run con healing | 16.666.912 | 1.315.739 | 36 | Verifica iniziale + eventuale re-test |
| E3 Antigravity deduplicato | 4.840.908 | 498.824 | 36 | Sessioni agente, thinking incluso nell'output |

## 7. Confini e limiti da tenere fermi nella scrittura

1. **Coorti:** solo E1 24 + E2 84 sono run distinte del benchmark principale. E3 è contenuto in E2; non fare `24 + 84 + 36`.
2. **E1:** 83,33% è completamento operativo; 91,67% riguarda un giudizio qualitativo sul contenuto; nessuna delle due misure garantisce la completezza dei controlli terminali, persi nel parsing.
3. **E2:** 95% recall è limitato a P1+P2. Un ticket emesso non equivale a diagnosi tecnicamente esatta né dimostra la causalità della perturbazione. I sei ticket testuali parziali sono conteggiati per l'endpoint *emissione*, non come JSON strutturati validi.
4. **P3:** la bassa frequenza di ticket riflette anche la mancata copertura della proprietà aggiuntiva nei Golden Plan. I 4 ticket Citadel non certificano riconoscimento diretto della scorciatoia.
5. **E3:** 35/36 è ripristino tecnico nei sorgenti IaC/bundle; 33/36 è recupero operativo. In due run la patch è corretta ma il test fallisce. Nessuna delle due percentuali misura protezione globale contro modifiche out-of-band.
6. **Telemetria:** tempi end-to-end interni e non dell'intero runner; valori medi con copertura esplicita; input/output Qwen e Gemini non aggregabili in un costo unico; niente stima arbitraria dei token Planner.
7. **Scenari non incontrati:** PingProbe, DocuPortal, LogViewer, JobDesk e relative perturbazioni sono **fuori da questo snapshot**. Quando saranno disponibili risultati, pubblicare un supplemento separato, senza cambiare retroattivamente denominatori E1/E2/E3.
8. **Versionamento:** eventuali audit futuri che correggano criteri o dati devono creare una nuova versione del documento e registrare le modifiche, non sovrascrivere silenziosamente questo snapshot.

## 8. Tracciabilità degli audit utilizzati

File sorgenti consultati (nomi relativi, da archiviare con il consolidato):

| Fonte | Informazioni principali | SHA-256 del file disponibile al congelamento |
|---|---|---|
| `CODEX_E1_8_MACHINES_FINAL.md` | Coorte E1 a 8 macchine, status, coerenza e telemetria | `afec5aba5c2b3d30c490c1926f56cdda032657070a9dd3737071d32dacf537d4` |
| `CODEX_E2_EXECUTION_AUDIT.md` | Coorte E2, validità degli input, anomalie del ticket e dell'esecuzione | `3263c523a92967885dd6ac530c010f899abe1a5da6a8b2b8e9134caa5e4189c7` |
| `CODEX_E2_EXECUTION_REVIEW.csv` | 84 righe E2, emissione ticket iniziale per run (correzione TP→FN) | `a6cc91c3889b113196adff86b02389cf067d9837f49d39df23d423bdf13aec96` |
| `CODEX_E3_PATCH_AUDIT.md` | Correttezza tecnica delle patch, perimetro e tre fallimenti | `35dc60cf8ae3c65138a16d6681a10c07d04254763a0fac8d9a5abc0fcd93131e` |
| `CODEX_E3_PATCH_REVIEW.csv` | 36 righe, esiti E3 per sessione | `7c5d9e264c0d25762e875aa31ea851fb11fb86989d61f713a6f979f05f46dec9` |
| `CODEX_TELEMETRY_FINAL.md` | Token deduplicati Antigravity, coorti e tempi E2/E3 | `ae1514c0d5f2b2ad08eca79797f5b1b9f9d408668cc842550ec4a172d954e5cc` |
| `CODEX_DIAGNOSIS_AUDIT.md` | Revisione qualitativa di 20 ticket originariamente penalizzati | `8fe848f744a4ef83ce030ceb73b42d8ff71fe14961ba87de014fe319662b6bbc` |
| `CODEX_PLAN_PARSING_IMPACT.md` | Dimostrazione della perdita della checklist terminale | `9667b8b31c933a3a125de57bc78faa76ca7f615d2060a4012feb9fee5132a99b` |
| `main.pdf` | Definizione degli esperimenti e formule (4)–(7), Capitolo 5 | `55d7363c232ca5b0ad83b118fcb51b882da9289d414ede6315ddfb1525c8767d` |

**Fonti supersedute:** non sostituire queste misure con le prime matrici di `BENCHMARK_ANALYSIS_REPORT.md`, `E2_DATA_AUDIT.md` o le classificazioni automatiche dei vecchi scorer, che applicavano definizioni e/o conteggi differenti. I risultati delle quattro macchine nuove non sono ancora incorporati.
