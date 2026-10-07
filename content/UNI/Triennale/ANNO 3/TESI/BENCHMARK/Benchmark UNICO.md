---
title: "Benchmark UNICO — Metodologia Sperimentale, Tassonomia P1-P4, Catalogo delle Macchine e Dati di Tracciamento"
---

# Benchmark di VulcaTest: Documento Unico di Riferimento

Questo documento costituisce la trattazione unificata, rigorosa ed esaustiva dell'intero apparato sperimentale di **VulcaTest**. Integra organicamente il protocollo metodologico a isolamento dei nodi (**E0–E3**), la formalizzazione della **Golden Machine** e del **Golden Plan**, la tassonomia delle perturbazioni (**P1–P3**), le schede tecniche approfondite delle macchine del *core benchmark*, il dataset di tracciamento e il capitolo dedicato agli **elementi esclusi dal test quantitativo** (la classe di perturbazione **P4** e le 3 macchine considerate estensione opzionale).

---

## 1. Obiettivo Generale e Principi Guida

La valutazione sperimentale di VulcaTest è concepita per superare i limiti delle valutazioni end-to-end monolitiche. Sottoporre un sistema agentico multi-stadio a test "ciechi" completi (generazione del piano da zero + esecuzione + autoriparazione su una macchina con guasto sconosciuto) introduce un elevato grado di *confounding*: se la sessione fallisce, risulta impossibile attribuire con certezza la causa del fallimento al prompt del Planner, a un'ambiguità dell'oracolo, all'instabilità stocastica dell'Executor o all'incapacità riparativa dell'Healer.

Per garantire validità scientifica e precisione diagnostica, il benchmark adotta il principio fondamentale:

> **Prima qualificare un riferimento empirico affidabile (Golden State e Golden Plan), poi valutare separatamente e in isolamento la generazione del piano (E1), la capacità di rilevazione (E2) e l'efficacia dell'autoriparazione (E3).**

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                      FLUSSO SPERIMENTALE A QUATTRO STADI                      │
├───────────────────┬───────────────────────────────────────────────────────────┤
│ E0: Riferimento   │ Qualificazione manuale di Golden Machine e Golden Plan    │
│ E1: Planner       │ Misura la validità dei piani generati su macchine sane    │
│ E2: Detection     │ Isola l'Executor/Evaluator tramite Golden Plan congelato  │
│ E3: Self-Healing  │ Valuta l'Healer unicamente sui True Positive certi di E2  │
└───────────────────┴───────────────────────────────────────────────────────────┘
```

---

## 2. E0 — Qualificazione del Ground Truth

La fase E0 non costituisce un esperimento statistico, bensì il protocollo sistematico e deterministico per costruire il terreno di riferimento (*ground truth*) contro cui misurare il comportamento del sistema.

Per ciascuno scenario si procede alle seguenti operazioni:
1. **Verifica e rifinitura manuale degli artifact upstream**: analisi e correzione preventiva di `description`, `storyline` e writeup per garantire la totale assenza di ambiguità;
2. **Qualificazione della macchina**: correzione e configurazione del manifest IaC in VulcaForge fino a ottenere una versione pienamente conforme all'*intended path*;
3. **Generazione e congelamento del piano d'attacco**: sintesi di un piano strutturato contenente la sequenza di step e la checklist con AND-gate;
4. **Validazione empirica**: certificazione del piano a runtime prima dell'avvio degli esperimenti.

### Definizione di Golden Machine
La **Golden Machine** è la versione dello scenario considerata corretta, stabile e pienamente conforme alla specifica didattica autoritativa.
> **Regola del ripristino**: prima di ciascuna esecuzione sperimentale (in E1, E2 ed E3), la macchina viene sempre ripristinata al suo stato Golden (*clean slate* via Docker reset/rebuild).

### Definizione di Golden Plan
Un **Golden Plan** è un Attack Plan validato empiricamente attraverso **tre esecuzioni consecutive con esito positivo (`COMPLETED`, nessun fallimento bloccante) sulla rispettiva Golden Machine**.

Il Golden Plan non pretende di essere l'unico percorso teoricamente valido, ma fornisce un oracolo operativo stabile, verificato e congelato che funge da costante di controllo negli esperimenti successivi.

---

## 3. Disegno Sperimentale: Fasi E1, E2 ed E3

```
   [E1: Valutazione Planner]            [E2: Valutazione Detection]            [E3: Valutazione Healer]
 
      Artifact validati                       Golden Plan                           TP reali da E2
              │                                    │                                      │
              ▼                                    ▼                                      ▼
           Planner                         ┌───────┴───────┐                           Healer
              │                            ▼               ▼                              │
              ▼                       Golden State    Perturbata                          ▼
         P_generated                   (Controllo-)    (Caso+)                        Patch IaC
              │                            │               │                              │
              ▼                            └───────┬───────┘                              ▼
          Executor                                 ▼                                Rebuild Docker
              │                                Executor                                   │
              ▼                                    │                                      ▼
        Golden Machine                             ▼                              Retest con stesso
      (Nessuna perturbazione)               Final Evaluator                          Golden Plan
              │                                    │                                      │
              ▼                                    ▼                                      ▼
      Success Rate (SR)                    Confusion Matrix (B1/B2)             Healing Success Rate (HSR)
```

---

### E1 — Valutazione del Planner

#### Domanda di ricerca
> *Con artifact documentali preventivamente curati e una macchina nota come corretta (Golden Machine), con quale frequenza il Planner genera un Attack Plan operativo e compatibile con il contratto di esecuzione dell'Executor?*

#### Configurazione e assunzioni
In E1 la macchina **non viene perturbata**. Gli artifact forniti al modello sono stati revisionati e rifiniti in E0, per cui la loro qualità intrinseca non rappresenta una variabile dello studio.

Vale l'**assunzione fondamentale sul contratto tra i nodi**:
- Se il Planner produce un piano ambiguo, invalido, privo di comandi concreti o semanticamente incompatibile con l'ambiente, il fallimento viene attribuito interamente al Planner.
- L'Executor non ha il compito di interpretare euristicamente istruzioni vaghe per "salvare" un piano difettoso.
> **Il Planner deve produrre istruzioni comprensibili dall'Executor; l'Executor non deve trasformarsi in un secondo Planner.**

Poiché l'esecuzione dell'Executor si arresta al primo fallimento bloccante, per ogni run può essere emesso al massimo un ticket di anomalia.

#### Metrica di prestazione
Definendo la variabile binaria $T_{g,i}$:
- $T_{g,i} = 1$ se la run $i$ termina con un fallimento e la conseguente generazione di un ticket;
- $T_{g,i} = 0$ se la run $i$ si conclude con stato `COMPLETED` senza ticket;

il Success Rate del Planner ($SR_{Planner}$) è calcolato come:

$$SR_{Planner} = 1 - \frac{\sum_{i=1}^{N} T_{g,i}}{N} = \frac{\text{run completate con successo}}{\text{run totali}}$$

L'obiettivo non è verificare che il piano generato sia testualmente identico al Golden Plan, ma certificare che sia **operativamente valido** sulla macchina sana.

#### Dimensionamento delle run
- **Dataset**: tutte le 11 macchine del progetto;
- **Repliche**: 3 run per ciascuna macchina.

$$\text{Totale run E1} = 11 \times 3 = 33 \text{ run}$$

Considerando una durata media osservata di circa 20–22 minuti per ciclo completo di pianificazione ed esecuzione:

$$\text{Tempo stimato E1} \approx 33 \times (20\text{--}22\text{ min}) \approx 11\text{--}12.1 \text{ ore}$$

---

### E2 — Valutazione della Capacità di Rilevazione (Detection)

#### Domanda di ricerca
> *Dato un Attack Plan già validato e congelato (Golden Plan), con quale accuratezza VulcaTest distingue una macchina conforme da una contenente una perturbazione nota?*

In E2 la variabilità del Planner viene azzerata passando il Golden Plan tramite parametro CLI (`--plan`). L'esperimento valuta congiuntamente l'Executor (nel rilevare l'anomalia empirica a terminale) e il Final Evaluator (nel formalizzare la discrepanza nel report e nel ticket di anomalia).

#### Configurazioni di controllo
Per ciascuno scenario vengono condotte due tipologie di run:
1. **Controllo Negativo (Clean run)**: `Golden Plan` eseguito su `Golden Machine`. Esito atteso: `COMPLETED`, nessun ticket emesso.
2. **Caso Perturbato**: `Golden Plan` eseguito su `Perturbed Machine`. Esito atteso: `FAILED`, emissione di un ticket di anomalia descrittivo del guasto introdotto.

#### Matrice di Confusione e Metriche
L'esito del rilevamento viene mappato nella matrice di confusione binaria, dove la condizione "positiva" corrisponde alla presenza reale del difetto:

| Stato Reale della Macchina | Verdetto del Sistema: TICKET | Verdetto del Sistema: NESSUN TICKET |
|---|:---:|:---:|
| **Macchina Perturbata (Difetto presente)** | **True Positive (TP)** — Rilevata | **False Negative (FN)** — Difetto sfuggito |
| **Golden Machine (Macchina sana)** | **False Positive (FP)** — Falso allarme | **True Negative (TN)** — Conforme |

Le metriche di classificazione sono definite come segue:

$$\text{Recall (Sensitivity / TPR)} = \frac{TP}{TP + FN}$$

$$\text{Specificity (TNR)} = \frac{TN}{TN + FP}$$

$$\text{Precision (PPV)} = \frac{TP}{TP + FP}$$

$$F_1\text{-Score} = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}$$

Oltre alla detection binaria, viene valutata l'accuratezza diagnostica (RCA), verificando se il campo `defect_type` del ticket corrisponde alla tipologia di guasto effettivamente iniettata.

#### Dimensionamento delle run per E2
E2 impiega il **sottoinsieme principale di 8 macchine** e le relative **15 perturbazioni** (classi P1, P2, P3):
- **Run perturbate**: 15 perturbazioni $\times$ 3 ripetizioni = 45 run;
- **Run di controllo (clean)**: 8 Golden Machine $\times$ 3 ripetizioni = 24 run.

$$\text{Totale run E2} = 45 + 24 = 69 \text{ run}$$

Con una durata media stimata di 16–18 minuti per esecuzione (grazie al piano già pronto che salta il tempo del Planner):

$$\text{Tempo stimato E2} \approx 69 \times (16\text{--}18\text{ min}) \approx 18.4\text{--}20.7 \text{ ore}$$

Le tre ripetizioni sulla medesima perturbazione non rappresentano guasti indipendenti, ma misurano la stabilità stocastica del modello a fronte del medesimo scenario operativo.

---

### E3 — Valutazione dell'Healer (Self-Healing)

#### Domanda di ricerca
> *A fronte di un problema reale correttamente rilevato e diagnosticato, con quale frequenza il modulo di autoriparazione riesce a ripristinare la conformità dello scenario senza alterare gli invarianti didattici?*

#### Criterio di ammissione rigoroso
E3 viene eseguito **esclusivamente sui casi che risultano essere True Positive (TP) certi provenienti da E2**.  
Non vengono mai inoltrati all'Healer:
- Falsi positivi (la macchina era sana, l'Healer non deve inventare patch);
- Casi in cui il difetto non è stato rilevato (FN);
- Difetti di specifica esclusi dal perimetro quantitativo.

#### Ciclo operativo di riparazione a loop chiuso
1. L'Healer riceve il ticket di diagnosi del TP ed esamina il codice sorgente IaC in `vulcaforge/`;
2. L'Healer applica una modifica al manifest IaC;
3. La macchina viene interamente ricostruita (*clean build* senza cache e ridistribuzione del container);
4. Viene rieseguito lo **stesso Golden Plan** impiegato in precedenza;
5. Si verifica se lo scenario termina con esito `COMPLETED` senza che la non conformità originaria si ripresenti.

#### Metriche di Healing
La metrica primaria è l'Healing Success Rate ($HSR$):

$$HSR = \frac{\text{True Positive correttamente risolti}}{\text{True Positive totali sottoposti all'Healer}}$$

Qualora l'infrastruttura consenta tentativi iterativi di riparazione su feedback, si distinguono:
- $HSR_1$: tasso di successo conseguito al primo tentativo di modifica;
- $HSR_{\le k}$: tasso di successo cumulativo entro un numero massimo $k$ di iterazioni;
- $\text{MeanHealingAttempts}$: numero medio di tentativi richiesti per le riparazioni riuscite.

#### Dimensionamento massimo di E3
Nel caso teorico ideale in cui tutte le 45 run perturbate di E2 risultino True Positive:

$$\text{Casi massimi E3} \le 45 \text{ casi}$$

La sola riesecuzione di retest post-healing richiederebbe:

$$\text{Tempo di retest E3} \approx 45 \times (16\text{--}18\text{ min}) \approx 12\text{--}13.5 \text{ ore}$$

A questo intervallo vanno sommati il tempo di inferenza dell'Healer (sintesi della patch), il tempo di rebuild dell'immagine Docker su Kali e gli eventuali retry.

---

### Stima Temporale Complessiva della Campagna

| Fase Sperimentale | Target / Condizione | Numero Run | Tempo Medio per Run | Stima Oraria Totale |
|---|---|:---:|:---:|:---:|
| **E1 — Planner** | 11 macchine sane $\times$ 3 run | 33 | 20–22 min | ~11.0–12.1 h |
| **E2 — Detection** | 15 perturbazioni $\times$ 3 run + 8 clean $\times$ 3 run | 69 | 16–18 min | ~18.4–20.7 h |
| **E3 — Healing** | $\le 45$ True Positive $\times$ 1 retest | $\le 45$ | 16–18 min (+ build) | $\ge 12.0–13.5$ h |
| **TOTALE CAMPAGNA** | **E1 + E2 + E3** | **$\le 147$** | — | **~41–46 h (effettive: ~45–50 h)** |

La stima realistica supera le 45–50 ore continuative di calcolo tenendo conto dei tempi di rebuild Docker e dei reset infrastrutturali tra le run.

---

## 4. Tassonomia delle Perturbazioni del Core Benchmark (P1, P2, P3)

Il benchmark quantitativo principale si concentra sulle perturbazioni iniettate direttamente nel codice sorgente IaC (`machines/<slug>.yaml`), classificate secondo l'asse causale di deviazione:

```
                  ┌───────────────────────────────────────────────┐
                  │    Tassonomia Perturbazioni Meccaniche IaC    │
                  └───────────────────────┬───────────────────────┘
                                          │
         ┌────────────────────────────────┼────────────────────────────────┐
         ▼                                ▼                                ▼
   ┌───────────┐                    ┌───────────┐                    ┌───────────┐
   │ P1 Blocco │                    │ P2 Valore │                    │ P3 Hardening
   └─────┬─────┘                    └─────┬─────┘                    └─────┬─────┘
         │                                │                                │
         ▼                                ▼                                ▼
  [Under-provisioning]             [Mis-provisioning]               [Over-provisioning]
  Errore esplicito a video         Silenzioso (exit code 0)         Troppo permissiva
  (404, 502, Denied, Utente ass.)  Auth failure differito a valle   Fallisce check negativo
         │                                │                                │
         ▼                                ▼                                ▼
  [Healer: Additivo]               [Healer: Valore]                 [Healer: Sottrattivo]
  Ripristina componente/utente     Allinea la stringa/chiave        Stringe permessi spuri
```

### P1 — Modifica Additiva (*Blocco / Under-provisioning*)
- **Definizione**: manca fisicamente un elemento essenziale alla risoluzione del passaggio (task di copia rimosso dal playbook, utente non creato in `/etc/passwd`, file mancante nel container, record DNS assente, SUID non impostato).
- **Sintomo a runtime**: errore esplicito e bloccante (`404 Not Found`, `502 Bad Gateway`, `Permission Denied`, `command not found`). L'esecuzione si arresta deterministicamente.
- **Azione dell'Healer**: **Additiva**. L'Healer introduce nel manifest la risorsa o la direttiva mancante.

### P2 — Modifica di Valore (*Alterazione Silenziosa / Mis-provisioning*)
- **Definizione**: il componente esiste ed è richiamabile, ma contiene un valore o una credenziale errata, disallineata o alterata (es. chiave di decodifica modificata di un singolo carattere, hash di backup non coincidente con la password dell'utente, token demone alterato, password in `.bash_history` errata).
- **Sintomo a runtime**: nessun errore immediato a video; lo step di estrazione o decodifica termina con codice `0`. L'anomalia si manifesta in modo differito allo step dipendente successivo (es. `su: Authentication failure` o connessione SSH respinta).
- **Azione dell'Healer**: **Allineamento di valore**. L'Healer corregge il dato letterale disallineato senza aggiungere o togliere entità.

### P3 — Modifica Sottrattiva (*Scorciatoia / Over-provisioning / Hardening*)
- **Definizione**: la macchina è accessibile e risolvibile, ma presenta una configurazione indebitamente permissiva che consentirebbe di scavalcare passaggi formativi (permessi `0644` anziché `0400` su `root.txt`, script eseguiti da root resi *world-writable*, utente iniziale inserito a priori nel gruppo privilegiato `shadow`).
- **Sintomo a runtime**: per essere rilevabile, **la checklist dell'oracolo deve comprendere un controllo negativo di conformità didattica** (es. `cat /root/root.txt` come utente non privilegiato deve restituire `Permission Denied`). Se il comando riesce, il controllo negativo fallisce e la macchina viene dichiarata non conforme.
- **Azione dell'Healer**: **Sottrattiva (*Hardening*)**. L'Healer restringe i permessi, rimuove la cartella world-writable o espelle l'utente dal gruppo sensibile.

> **Regola aurea di non interferenza**: le vulnerabilità intenzionali per il percorso didattico (es. `/opt/backup.sh` a `0777` in Citadel, `/etc/passwd` a `0666` in NetVault, `id_rsa` a `0644` in AuthGate) **non devono mai essere scambiate per P3**, pena la distruzione dello scenario formativo.

---

## 5. Le 8 Macchine del Core Benchmark (E2 ed E3)

Il sottoinsieme principale adottato per le fasi quantitative E2 ed E3 è costituito da **8 macchine** che ospitano complessivamente **15 perturbazioni meccaniche** (6 di classe P1, 4 di classe P2, 5 di classe P3).

| # | Macchina | Dominio Tecnologico | P1 | P2 | P3 | Totale Perturbazioni |
|:--:|---|---|:---:|:---:|:---:|:---:|
| 1 | **Pizzeria** | Web PHP / Nginx / Credential Hunting / GTFOBins Nano | P1-01 | P2-04 | — | 2 |
| 2 | **AuthGate** | Web / OpenSSH / Key abuse / GTFOBins Vi | P1-03 | — | — | 1 |
| 3 | **Citadel** | Web LAMP / SQLi / Cronjob / SUID PATH Hijack | P1-10 | — | P3-02 | 2 |
| 4 | **CryptoVault** | SSH / Local Script Decryption / SUID Tar | — | P2-03 | P3-03 | 2 |
| 5 | **ConsoleGate** | Raw TCP Socket / Cronjob / Python Module Hijacking | P1-13 | P2-06 | — | 2 |
| 6 | **NetVault** | BIND DNS AXFR / 7z John / Writable /etc/passwd | P1-16 | — | P3-06 | 2 |
| 7 | **GitPoison** | Exposed .git / Hydra form brute-force / Log Poisoning | P1-14 | — | P3-08 | 2 |
| 8 | **TunnelGate** | SSH Local Port Forwarding / Unshadow / Group Shadow | — | P2-07 | P3-07 | 2 |
| **TOT** | | | **6** | **4** | **5** | **15** |

---

### Schede Dettagliate delle 8 Macchine del Core Benchmark

#### 1. `Pizzeria_B2R`
- **Dominio e Stack**: Debian container, server web Nginx con PHP-FPM, script di manutenzione locale.
- **Golden Attack Path**:
  1. *Web Recon*: Richiesta su porta 80 e analisi dell'applicazione;
  2. *Credential Hunting*: Ispezione del file `/opt/test.sh` che contiene le credenziali in chiaro dell'utente `franchino`;
  3. *Lateral Movement*: Switch utente tramite `su - franchino`;
  4. *Privesc*: Esecuzione di `sudo /usr/bin/nano /etc/passwd` autorizzata da sudoers; exploit GTFOBins in Nano (inserimento riga utente UID 0) per acquisire root e leggere `/root/root.txt`.
- **Competenze**: Ricognizione web, credential harvesting locale, sudo editor escape.
- **Invarianti**: Credenziali in `/opt/test.sh` non alterate.
- **Perturbazioni assegnate**:
  - `P1-01`: rimozione del task `web-app-deploy` (riga 25 `pizzeria.yaml`). Sintomo: `404 Not Found`. Tripla: `FAILED` / `IAC_GENERATION_DEFECT` / deploy app (additivo).
  - `P2-04`: disallineamento della password tra `/opt/test.sh` e l'account di sistema `franchino`. Sintomo: `su - franchino` fallisce con autenticazione respinta. Tripla: `FAILED` / `CONFIG_DEFECT` / riallinea credenziale (valore).

#### 2. `AuthGate_B2R`
- **Dominio e Stack**: Nginx, OpenSSH server, utility Vi configurata in sudoers.
- **Golden Attack Path**:
  1. *Web Enumeration*: Leak di nominativi utente dal web;
  2. *SSH Brute-forcing*: Hydra contro il demone SSH per ottenere il foothold come utente `operator`;
  3. *Key Abuse*: Reperimento della chiave privata `id_rsa` di `sysadmin`, creata con permessi `0644`;
  4. *Hardening didattico*: Esecuzione obbligatoria di `chmod 600 id_rsa` per consentirne l'uso con SSH e switch a `sysadmin`;
  5. *Privesc*: `sudo /usr/bin/vi` con escape GTFOBins `:!/bin/bash` per ottenere root.
- **Competenze**: Password cracking di rete, gestione permessi chiavi OpenSSH, GTFOBins Vi.
- **Invarianti da preservare**: Permesso iniziale `0644` su `id_rsa` (richiede l'intervento dello studente).
- **Perturbazioni assegnate**:
  - `P1-03`: disallineamento vhost Nginx (`is_default: false`, `keep_default_site: true`). Sintomo: porta 80 risponde con la pagina predefinita di Nginx, fallimento enumerazione. Tripla: `FAILED` / `CONFIG_DEFECT` / correggi vhost Nginx (additivo).

#### 3. `Citadel_B2R`
- **Dominio e Stack**: Apache, PHP, MySQL, demone Cron, binario SUID proprietario.
- **Golden Attack Path**:
  1. *SQL Injection*: Bypass del form di login via SQLi classico;
  2. *Command Injection*: Esecuzione comandi da endpoint di diagnostica per ottenere foothold `www-data`;
  3. *Lateral Movement*: Cronjob periodico eseguito da `sysadmin` su `/opt/backup.sh` (reso scrivibile `0777`); modifica dello script per ottenere reverse shell come `sysadmin`;
  4. *Privesc via PATH Hijack*: Analisi del binario SUID `/usr/local/bin/citadel_report` (`4755`) che invoca `curl` senza path assoluto; iniezione binario malevolo in `/tmp` e alterazione di `PATH=/tmp:$PATH` per ottenere root.
- **Competenze**: SQLi, web RCE, cron exploitation, SUID PATH hijacking.
- **Invarianti da preservare**: Permessi `0777` su `/opt/backup.sh`.
- **Perturbazioni assegnate**:
  - `P1-10`: rimozione dello script `/opt/backup.sh` dal manifest IaC (`system-file-setup`). Sintomo: FASE_9 fallisce (`ls: cannot access '/opt/backup.sh': No such file or directory`). Tripla: `FAILED` / `IAC_GENERATION_DEFECT` / ripristina script di backup con permessi 0777 (additivo).
  - `P3-02`: introduzione di uno script sensibile extra in `/opt` reso *world-writable* (`0777`). Sintomo: fallimento del controllo negativo di conformità. Tripla: `FAILED` / `CONFIG_DEFECT` / hardening permessi file (sottrattivo).

#### 4. `CryptoVault_B2R`
- **Dominio e Stack**: OpenSSH, script locale di decodifica Python, binario SUID di backup.
- **Golden Attack Path**:
  1. *Foothold*: Accesso SSH con credenziali note `student:student123`;
  2. *Artifact Carving*: Individuazione del file cifrato `/opt/vault/backup.enc` e della chiave `/opt/vault/.key` contenente `K3y_Vault_2026!`;
  3. *Decodifica Meccanica*: Esecuzione di `python3 /opt/vault/decrypt.py` che stampa la password di `vault_admin` (`Adm1n_P4ss_Secur3!`);
  4. *Lateral Movement*: `su - vault_admin` e lettura user flag;
  5. *Privesc*: Esecuzione del binario SUID `/usr/local/bin/vault_backup` che invoca `tar` con percorso relativo; wildcard injection o path hijack per scalare a root.
- **Competenze**: Enumerazione locale, reverse engineering di script deterministici, SUID exploit.
- **Invarianti da preservare**: Permessi `0644` sul file `.key`.
- **Perturbazioni assegnate**:
  - `P2-03`: alterazione di un singolo carattere nella chiave `.key` (`2026! -> 2026?`). Sintomo: lo script decodifica senza errori (exit 0) ma emette una password errata; `su - vault_admin` fallisce con authentication failure. Tripla: `FAILED` / `CONFIG_DEFECT` / correggi valore chiave (valore).
  - `P3-03`: assegnazione dell'ownership o dei permessi completi di lettura di `.key` o `backup.enc` direttamente all'utente `student`. Sintomo: violazione del vincolo di conformità didattica. Tripla: `FAILED` / `CONFIG_DEFECT` / correggi ownership file (sottrattivo).

#### 5. `ConsoleGate_B2R`
- **Dominio e Stack**: Demone TCP custom su porta 20000, OpenSSH, demone Cron, moduli Python.
- **Golden Attack Path**:
  1. *Network Recon*: Scansione porte che rivela la porta `20000/TCP`;
  2. *Raw Socket Interaction*: Connessione via `nc <IP> 20000`; invio del comando `STATUS` e successivo comando `AUTH <token>` che restituisce le credenziali per `operator`;
  3. *Foothold*: Accesso SSH come `operator`;
  4. *Crontab Inspection*: Ispezione di `/etc/crontab` che esegue periodicamente `/opt/cron/job.py` come root;
  5. *Module Hijacking*: La cartella dei moduli usata dallo script appartiene al gruppo `operator` ed è scrivibile (`0775`); creazione di un modulo malevolo (es. `random.py`) che assegna il bit SUID a `/bin/bash` all'invocazione del cron.
- **Competenze**: Interazione con protocolli testuali non-HTTP, netcat, cronjob, Python module hijacking.
- **Invarianti da preservare**: Il protocollo testuale del demone e i permessi di gruppo `0775` sulla cartella dei moduli.
- **Perturbazioni assegnate**:
  - `P1-13`: permessi della cartella script cron ristretti da `0775` a `0755` (rimozione permesso di scrittura al gruppo). Sintomo: creazione del modulo malevolo fallisce con `Permission Denied`. Tripla: `FAILED` / `CONFIG_DEFECT` / ripristina scrittura al gruppo (additivo).
  - `P2-06`: token di autenticazione del demone TCP alterato nel manifest. Sintomo: il comando `AUTH` rilascia credenziali errate e il login SSH fallisce silenziosamente. Tripla: `FAILED` / `CONFIG_DEFECT` / riallinea token demone (valore).

#### 6. `NetVault_B2R`
- **Dominio e Stack**: BIND DNS server, Nginx vhost, archivio 7z protetto, permessi `/etc/passwd`.
- **Golden Attack Path**:
  1. *DNS Recon*: `dig axfr @<IP> domain.vdsi` consente il trasferimento di zona, rivelando il vhost `backup.corp.vdsi`;
  2. *Vhost Routing*: Richiesta HTTP con header host configurato verso Nginx per raggiungere il sito di backup;
  3. *Artifact Carving*: Download del file `backup.7z`;
  4. *Password Cracking*: Estrazione dell'hash con `7z2john` e cracking a dizionario con regole John the Ripper;
  5. *Privesc*: Ispezione del filesystem che rivela `/etc/passwd` con permessi `0666`; scrittura diretta di una riga utente UID 0 (`toor:x:0:0:...`) e switch a root via `su toor`.
- **Competenze**: DNS Zone Transfer, Vhost enumeration, cracking archivi 7z, privilege escalation via `/etc/passwd`.
- **Invarianti da preservare**: Permessi `0666` su `/etc/passwd`.
- **Perturbazioni assegnate**:
  - `P1-16`: rimozione della configurazione DNS / zona AXFR in BIND. Sintomo: `dig axfr` non restituisce alcun record e il vhost non viene scoperto. Tripla: `FAILED` / `CONFIG_DEFECT` / ripristina zona BIND (additivo).
  - `P3-06`: aggiunta di una zona AXFR secondaria non protetta o file sensibile esposto oltre la specifica. Sintomo: fallimento del controllo di conformità didattica. Tripla: `FAILED` / `CONFIG_DEFECT` / restringi zone BIND (sottrattivo).

#### 7. `GitPoison_B2R`
- **Dominio e Stack**: Apache web server, repository Git esposto, form web PHP, Apache access logs.
- **Golden Attack Path**:
  1. *Web Recon*: Rilevamento della directory `/.git/` esposta pubblicamente;
  2. *Git Dump*: Dump completo del repository tramite `git-dumper` e analisi dei commit log per scoprire credenziali ed endpoint;
  3. *Brute-force*: Attacco con Hydra al form web di login per ottenere il foothold;
  4. *Log Poisoning & LFI*: Identificazione di un parametro LFI; invio di una richiesta HTTP contenente codice PHP nell'header `User-Agent` per avvelenare `/var/log/apache2/access.log`;
  5. *RCE*: Inclusione del file di log tramite LFI per ottenere comandi root.
- **Competenze**: Git metadata carving, web form brute-forcing, log poisoning, LFI to RCE.
- **Invarianti da preservare**: Esposizione web della directory `.git`.
- **Perturbazioni assegnate**:
  - `P1-14`: rimozione del task di esposizione della cartella `.git` (`web-git-leak`). Sintomo: `git-dumper` restituisce `404 Not Found`. Tripla: `FAILED` / `IAC_GENERATION_DEFECT` / esponi repository (additivo).
  - `P3-08`: alterazione dei permessi di `root.txt` da `0400` a `0644`. Sintomo: violazione del controllo negativo in checklist. Tripla: `FAILED` / `CONFIG_DEFECT` / hardening permessi `0400` (sottrattivo).

#### 8. `TunnelGate_B2R`
- **Dominio e Stack**: OpenSSH server, web server locale confinato su `127.0.0.1:8080`, unshadow, gruppo shadow.
- **Golden Attack Path**:
  1. *SSH Foothold*: Accesso iniziale con utente a bassi privilegi `trainee`;
  2. *Local Discovery*: `netstat -tlpn` individua un portale web in ascolto solo su `127.0.0.1:8080`;
  3. *Port Forwarding*: Creazione di tunnel locale con `ssh -L 8080:127.0.0.1:8080 trainee@<IP>`;
  4. *Portal Recon*: Navigazione nel portale interno ed estrazione di un backup contenente hash di sistema;
  5. *Cracking & Privesc*: Esecuzione di `unshadow` e cracking con John per ottenere la password di `sysadmin`; l'utente appartiene al gruppo `shadow`, consentendo la lettura diretta di `/etc/shadow` e l'acquisizione di root.
- **Competenze**: SSH local port forwarding, ricognizione porte localhost, cracking shadow, permessi di gruppo.
- **Invarianti da preservare**: Binding esclusivo del portale interno su `127.0.0.1`.
- **Perturbazioni assegnate**:
  - `P2-07`: disallineamento dell'hash di backup rispetto alla reale password dell'utente. Sintomo: l'hash viene craccato ma la password risultante fallisce l'autenticazione. Tripla: `FAILED` / `CONFIG_DEFECT` / riallinea hash backup (valore).
  - `P3-07`: aggiunta dell'utente `trainee` al gruppo privilegiato `shadow` sin dal manifest iniziale. Sintomo: violazione dell'invariante di conformità didattica (scorciatoia non prevista). Tripla: `FAILED` / `CONFIG_DEFECT` / rimuovi utente da gruppo shadow (sottrattivo).

---

## 6. Regole Sperimentali e Tracciamento dei Dati

### Le 7 Regole Sperimentali Non Negoziabili
1. **Stato Iniziale Noto**: ogni singola run parte da uno stato rigorosamente noto e documentato.
2. **Ripristino Golden State**: prima di qualunque esecuzione (sia essa di controllo, perturbata o di retest post-healing), la macchina viene resettata allo stato Golden.
3. **Applicazione Deterministica**: le perturbazioni vengono applicate unicamente *dopo* il ripristino del Golden State, manipolando il manifest IaC prima della rigenerazione del container.
4. **Piano Congelato**: il Golden Plan rimane rigorosamente immutato per tutte le run di E2 ed E3.
5. **Tracciamento Univoco**: ogni perturbazione è univocamente associata alla sua run, al suo report e all'evidenza salvata su disco.
6. **Diff Deterministiche**: tutte le modifiche introdotte dall'Healer devono essere tracciate tramite file di diff unificato.
7. **Isolamento delle Domande**: i risultati vengono interpretati esclusivamente in relazione alla specifica domanda di ricerca dello stadio sperimentale (E1, E2 o E3).

### Schema del Dataset di Tracciamento
I risultati di tutte le esecuzioni vengono registrati nel dataset strutturato (`ledger.jsonl` e `per_run.csv`) secondo il seguente schema di campi:

```text
machine_id               # slug della macchina (es. pizzeria, authgate)
golden_state_version     # hash git dello snapshot baseline
golden_plan_version      # hash sha256 del file ATTACK_PLAN.md congelato
experiment_id            # E1, E2, E3
run_id                   # identificativo univoco progressivo della run
perturbation_id          # ID cella (es. P1-01, CLEAN per le run di controllo)
perturbation_type        # P1, P2, P3, NONE
is_perturbed             # boolean: True se la macchina contiene una perturbazione
ticket_generated         # boolean: True se la run ha prodotto un ticket di anomalia
confusion_matrix_class   # TP, FP, TN, FN
diagnosis_expected       # enum atteso (IAC_GENERATION_DEFECT, CONFIG_DEFECT)
diagnosis_observed       # enum diagnosticato nel report
report_path              # percorso assoluto del REPORT.md generato
healing_called           # boolean: True se è stato invocato l'Healer (solo TP)
healing_attempts         # numero di tentativi di riparazione effettuati
healing_success          # boolean: True se il retest post-healing ha dato COMPLETED
post_healing_report      # percorso del report di retest
tokens_total             # token totali consumati (input + output per ruolo)
execution_time_seconds   # durata complessiva della run in secondi
```

---

## 7. Limitazioni Metodologiche Dichiarate

Per preservare l'integrità scientifica dello studio, vengono esplicitate due limitazioni metodologiche:

### 1. Artifact Upstream e Planner (Esperimento E1)
Gli artifact documentali forniti al Planner (`description`, `storyline`, writeup) vengono revisionati e rifiniti manualmente durante la fase E0. Nonostante tale accorgimento, non esiste un formalismo matematico assoluto in grado di disaccoppiare in ogni possibile scenario un fallimento intrinseco del Planner da una sottile ambiguità presente nella documentazione upstream.  
Tale limitazione viene gestita circoscrivendo lo scopo della tesi:
- Gli artifact revisionati in E0 sono assunti sufficientemente accurati;
- L'analisi dei moduli upstream di VulcaMind (generazione automatica di storyline/writeup) non rientra nell'oggetto di studio;
- Eventuali anomalie che richiedono modifiche sostanziali alla specifica didattica vengono demandate all'intervento umano (*Human-in-the-Loop*).

### 2. Assunzione di Stabilità dell'Executor nel Retest (Esperimento E3)
La valutazione dell'Healer assume che l'ambiente e il percorso di verifica eseguiti dall'Executor rimangano stabili prima e dopo l'intervento di autoriparazione.  
Se la seconda run post-healing dovesse fallire, non è possibile discriminare con certezza assoluta tra:
- Persistenza della non conformità (patch inefficace o errata);
- Un errore stocastico sopravvenuto nell'Executor;
- Un'anomalia transitoria dell'infrastruttura di rete/container.

Il rischio viene mitigato mediante:
- L'impiego del medesimo Golden Plan validato tre volte consecutive;
- Il ripristino controllato e la rigenerazione pulita del container;
- L'analisi dettagliata dei log e delle diff prodotte dall'Healer.

---

## 8. Elementi Esclusi dal Test (o Trattati come Estensione Opzionale)

Questa sezione raggruppa formalmente tutti gli elementi che, per precise motivazioni concettuali o di budget computazionale, **non rientrano nel perimetro quantitativo principale di E2 ed E3**.

---

### 8.1 Perturbazioni di Classe P4 (Difetti di Specifica / Oracolo)

#### Motivazione teorica dell'esclusione
Le perturbazioni di classe **P4** non rappresentano guasti del software della macchina target, bensì **difetti introdotti nella specifica didattica o nell'oracolo di test** (writeup o checklist congelata). In un caso P4, la macchina è sana, fedele al 100% al proprio design e risponde correttamente ai comandi standard del sistema operativo. Il disallineamento nasce dal fatto che la specifica richiede condizioni impossibili o incoerenti con i protocolli reali.

In uno scenario P4:
- Il comportamento corretto dell'agente **non è riparare la macchina**, poiché applicare una patch al codice per assecondare una specifica erronea distruggerebbe un software legittimo;
- L'azione attesa del sistema è la formulazione della diagnosi `SPECIFICATION_DEFECT` e la successiva emissione di un **rifiuto motivato di intervento (*Decline / No patch*)**, demandando la correzione della documentazione didattica al docente (*Human-in-the-Loop*).

Poiché l'esperimento E3 è finalizzato a misurare quantitativamente l'efficacia dell'Healer nel riparare il codice sorgente IaC, includere la classe P4 nel ciclo quantitativo di autoriparazione avrebbe inquinato la metrica $HSR$. La classe P4 viene pertanto esclusa dal benchmark quantitativo principale e preservata come **studio qualitativo del principio di discernimento causale e rifiuto di riparazione**.

#### Le 3 Perturbazioni P4 Formalizzate
Nel repository del benchmark (`white-box/benchmark/perturbations/`) sono state codificate 3 specifiche P4:

1. **`P4-02` (AuthGate)**: la checklist congelata impone l'esecuzione di `ssh-keygen -y` su una chiave privata dotata di permessi `0644`. OpenSSH rifiuta categoricamente di operare su chiavi con permessi laschi. Sintomo: l'operazione fallisce per i rigidi vincoli di sicurezza di OpenSSH sulla macchina sana. Diagnosi attesa: `SPECIFICATION_DEFECT`. Azione attesa: *decline* (correzione del writeup).
2. **`P4-03` (ConsoleGate)**: la checklist impone la ricezione della stringa `HTTP/1.1 200 OK` a fronte del comando `STATUS` inviato al socket TCP grezzo sulla porta 20000. Il demone risponde legittimamente con il proprio header testuale `STATUS: OK - Service Ready (v1.0)`. Diagnosi attesa: `SPECIFICATION_DEFECT`. Azione attesa: *decline*.
3. **`P4-04` (Pizzeria)**: iniezione nella checklist di una premessa fasulla che pretende l'ascolto di una porta o di un banner di servizio inesistente su una macchina web standard. Diagnosi attesa: `SPECIFICATION_DEFECT`. Azione attesa: *decline*.

#### Architettura Software e Stato Empirico
- **Assenza di file `.patch` by design**: come stabilito in `SCHEMA.md`, le specifiche P4 hanno campo `target: plan` e `patch: n/a`. Non esiste alcun file `.patch` sul filesystem per P4 perché il sorgente IaC della macchina non deve essere modificato.
- **Supporto nel runner**: l'orchestratore `run_matrix.py` (righe 1070–1084) implementa nativamente il supporto a `target: plan`, iniettando a runtime la clausola difettosa in una copia del piano d'attacco (`injected_ATTACK_PLAN.md`).
- **Stato empirico**: le perturbazioni P4 non sono state eseguite nel testbench quantitativo batch (non compaiono nel registro `ledger.jsonl`). Il comportamento di rifiuto a fronte di difetti di specifica è stato tuttavia documentato empiricamente come **incidente naturale reale** durante la fase pilota di AuthGate (caso di studio CS-4 in `memoria.md`).

---

### 8.2 Le 3 Macchine Escluse dal Core Benchmark (DataVault, WebMaster, PrivAudit)

#### Motivazione dell'esclusione dal core di E2/E3
Il catalogo completo di VulcaForge conta 11 macchine Boot2Root. Per ragioni di **budget computazionale e sostenibilità temporale**, il benchmark quantitativo principale per E2 ed E3 è stato dimensionato su un sottoinsieme di 8 macchine.

Eseguire E2 ed E3 su tutte le 11 macchine avrebbe comportato:
- 11 macchine $\times$ 3 run clean = 33 run;
- Almeno 21 perturbazioni $\times$ 3 run = 63 run perturbate;
- Totale E2: 96 run ($\approx 28\text{--}30$ ore);
- Totale campagna: oltre 70–75 ore continuative di calcolo su un singolo host.

Le 8 macchine prescelte coprono già esaustivamente l'intero ventaglio di vulnerabilità (web, database, socket TCP grezzi, cronjob, SUID, DNS AXFR, cracking offline, SSH tunneling) senza duplicazioni ridondanti.  
Si evidenzia tuttavia che:
- **Nella fase E1 (Valutazione del Planner), partecipano tutte le 11 macchine** (33 run totali), garantendo che la capacità generativa del Planner sia verificata sull'intero catalogo;
- Le 3 macchine escluse da E2/E3 dispongono già di manifest qualificati, Golden Machine validate e perturbazioni codificate, costituendo l'**estensione opzionale della suite**.

---

#### Schede Tecniche delle 3 Macchine Escluse da E2/E3

#### 1. `DataVault_B2R`
- **Dominio e Stack**: Nginx, PHP-FPM, Linux POSIX Capabilities.
- **Golden Attack Path**:
  1. *Web Upload*: Ispezione del form di upload documenti;
  2. *Bypass Filtri*: Caricamento di una webshell PHP sfruttando estensioni alternative (es. `.pHP` o bypass MIME type) nella directory `/uploads/`;
  3. *Foothold*: Richiesta HTTP alla webshell e acquisizione shell interattiva come `www-data`;
  4. *Local Enumeration*: Ricerca di capabilities mediante `getcap -r / 2>/dev/null`;
  5. *Privesc*: Individuazione di `cap_setuid+ep` sul binario `/usr/bin/python3`; esecuzione di `python3 -c 'import os; os.setuid(0); os.system("/bin/bash")'` per ottenere immediatamente root.
- **Competenze**: File upload bypass, webshell trigger, Linux capabilities exploitation.
- **Invarianti**: Permessi `0777` su `/var/www/html/uploads/`.
- **Perturbazioni codificate nel repository**:
  - `P1-04`: alterazione della document root Nginx (`document_root -> /wrong`). Sintomo: `404 Not Found` al caricamento del portale. Tripla: `FAILED` / `CONFIG_DEFECT` / ripristina docroot (additivo). Patch: `P1-04.patch` (esistente).
  - `P2-02`: rimozione del componente `php-fpm-allow-extensions`. Sintomo: upload riuscito ma l'interprete PHP-FPM non esegue file con estensioni non convenzionali, provocando un fallimento semantico nel trigger. Tripla: `FAILED` / `CONFIG_DEFECT` / riabilita estensioni (valore). Patch: `P2-02.patch` (esistente).

#### 2. `WebMaster_B2R`
- **Dominio e Stack**: Nginx, PHP-FPM, MySQL, Linux POSIX Capabilities.
- **Golden Attack Path**:
  1. *Web Recon*: Rilevamento del file `/dev/TODO.txt` indicante i parametri dell'applicazione;
  2. *LFI Discovery*: Individuazione del parametro vulnerabile `/view.php?file=/etc/passwd`;
  3. *Base64 Wrapper Extraction*: Lettura dei sorgenti protetti tramite wrapper stream `php://filter/read=convert.base64-encode/resource=config.php` per estrarre le credenziali del database;
  4. *Upload & Foothold*: Autenticazione a `/upload.php` con le credenziali DB e deployment della webshell;
  5. *Privesc*: Elevazione a root sfruttando la capability `cap_setuid` presente su `/usr/bin/python3`.
- **Competenze**: LFI, PHP filter wrappers, estrazione credenziali DB, Linux capabilities.
- **Invarianti**: Supporto dei wrapper stream in PHP-FPM.
- **Perturbazioni codificate nel repository**:
  - `P1-08`: rimozione del file `view.php` dal playbook IaC. Sintomo: la richiesta HTTP a `view.php` restituisce `404 Not Found`. Tripla: `FAILED` / `IAC_GENERATION_DEFECT` / ripristina view.php (additivo). Patch: `P1-08.patch` (esistente).
  - `P2-08`: rimozione del componente di supporto alle estensioni multiple in PHP-FPM (`php-fpm-allow-extensions`). Sintomo: upload formalmente riuscito ma la webshell non viene interpretata. Tripla: `FAILED` / `CONFIG_DEFECT` / riabilita estensioni (valore). Patch: `P2-08.patch` (esistente).

#### 3. `PrivAudit_B2R`
- **Dominio e Stack**: Linux OS ambiente di sviluppo, leak di cronologia shell, sudo git pager.
- **Golden Attack Path**:
  1. *Foothold*: Connessione SSH con credenziali fornite `student:student123`;
  2. *Credential Hunting*: Ispezione del file `.bash_history` in cui sono memorizzate in chiaro le credenziali dell'utente `developer`;
  3. *Lateral Movement*: Switch utente tramite `su - developer`;
  4. *Privesc*: Ispezione di `sudo -l`, che consente `sudo /usr/bin/git help config`;
  5. *GTFOBins Pager Escape*: Git invoca il pager di sistema `less`; digitazione del comando interattivo `!/bin/bash` all'interno del pager per ottenere una shell con privilegi root; lettura di `/root/root.txt`.
- **Competenze**: Analisi forense locale su cronologia comandi, GTFOBins pager escape, audit sui permessi di root.
- **Invarianti**: Presenza della password in chiaro in `.bash_history` e permessi `0400` su `/root/root.txt`.
- **Perturbazioni codificate nel repository**:
  - `P2-05`: disallineamento tra la password annotata in `.bash_history` e la password reale dell'account `developer`. Sintomo: estrazione della stringa riuscita, ma `su - developer` fallisce per password errata. Tripla: `FAILED` / `CONFIG_DEFECT` / riallinea credenziale (valore). Patch: `P2-05.patch` (esistente).
  - `P3-04`: alterazione dei permessi di `root.txt` da `0400` a `0644`. Sintomo: il controllo negativo in checklist (`cat /root/root.txt` come utente student non deve riuscire) fallisce perché il file risulta leggibile, evidenziando una scorciatoia che viola il percorso didattico. Tripla: `FAILED` / `CONFIG_DEFECT` / hardening permessi `0400` (sottrattivo). Patch: `P3-04.patch` (esistente, flagship P3).

---

### Protocollo per l'Estensione Opzionale
Qualora al termine della campagna principale sulle 8 macchine residuasse tempo di calcolo, le 3 macchine escluse possono essere integrate immediatamente eseguendo il medesimo protocollo:
1. 3 run clean per ciascuna macchina su Golden State ($3 \times 3 = 9$ run);
2. 3 run per ciascuna delle 6 perturbazioni aggiuntive ($6 \times 3 = 18$ run);
3. Esecuzione di E3 sui soli True Positive emersi.

Grazie all'adozione del medesimo schema di tracciamento e delle stesse metriche formali, i dati dell'estensione opzionale potranno essere aggregati direttamente al dataset principale senza alcuna discontinuità metodologica.
