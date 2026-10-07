# Piano sperimentale per il benchmark di VulcaTest

## Obiettivo generale

La valutazione sperimentale di VulcaTest viene strutturata in più fasi, con l'obiettivo di isolare il più possibile le responsabilità dei diversi componenti dell'architettura e ridurre l'ambiguità nell'interpretazione dei fallimenti.

Il principio generale è:

> **prima qualificare un riferimento affidabile, poi valutare separatamente generazione del piano, capacità di rilevazione e capacità di healing.**

La valutazione end-to-end completa con piano generato e macchina perturbata viene considerata opzionale, perché rende più difficile attribuire con precisione la causa di un fallimento.

---

# E0 — Qualificazione del ground truth

E0 non è un vero esperimento quantitativo, ma una fase preliminare necessaria per costruire il riferimento sperimentale.

Per ogni scenario si procede a:

1. verificare e rifinire manualmente gli artifact disponibili;
2. correggere la macchina fino a ottenere una versione considerata corretta;
3. verificare la coerenza con `description`, `storyline` e intended path;
4. generare e validare un Attack Plan di riferimento;
5. congelare lo stato risultante prima dell'inizio degli esperimenti.

## Golden Machine

La **Golden Machine** è la versione dello scenario considerata corretta e conforme alla specifica autoritativa dopo la fase di qualificazione.

Prima di ogni run sperimentale la macchina viene sempre ripristinata al Golden State.

## Golden Plan

Un **Golden Plan** è un Attack Plan validato empiricamente attraverso **tre esecuzioni consecutive con esito positivo sulla Golden Machine**.

Il Golden Plan viene utilizzato come controllo sperimentale negli esperimenti successivi.

La sua funzione non è rappresentare necessariamente l'unico piano corretto possibile, ma fornire un percorso di verifica stabile e già qualificato.

---

# E1 — Valutazione del Planner

## Domanda sperimentale

> Con artifact preventivamente curati e una macchina nota come corretta, quanto frequentemente il Planner genera un Attack Plan operativo e compatibile con l'Executor?

## Configurazione

```text
Artifact validati
      ↓
   Planner
      ↓
P_generated
      ↓
  Executor
      ↓
Final Evaluator
      ↓
Golden Machine
```

La macchina non viene perturbata.

Gli artifact forniti al Planner vengono revisionati preventivamente e resi i migliori possibili. La loro qualità non costituisce la variabile oggetto di E1.

## Assunzione fondamentale

Se il Planner produce un piano ambiguo, invalido o non comprensibile secondo il contratto dell'Executor, il fallimento viene attribuito al Planner.

L'Executor non ha il compito di reinterpretare semanticamente istruzioni ambigue per "salvare" il piano.

> **Il Planner deve produrre istruzioni comprensibili dall'Executor; l'Executor non deve trasformarsi in un secondo Planner.**

Poiché l'esecuzione si interrompe al primo fallimento, può essere generato al massimo un ticket per run.

## Metrica principale

Definendo:

- `T_g = 1` se viene generato un ticket;
- `T_g = 0` se la run termina senza ticket;

la success rate del Planner viene calcolata come:

\[
SR_{Planner} = 1 - \frac{\sum_{i=1}^{N} T_{g,i}}{N}
\]

Equivalentemente:

\[
SR_{Planner} =
\frac{\text{run completate senza ticket}}
{\text{run totali}}
\]

L'obiettivo non è verificare che il piano generato sia identico al Golden Plan, ma che sia **operativamente valido sulla Golden Machine**.

## Numero di run previsto

- 11 macchine;
- 3 run per macchina.

Totale:

\[
11 \times 3 = 33 \text{ run}
\]

Con un tempo medio di circa 20–22 minuti per ciclo completo:

\[
33 \times (20\text{–}22) \approx 11\text{–}12.1 \text{ ore}
\]

---

# E2 — Valutazione della capacità di rilevazione

## Domanda sperimentale

> Dato un Attack Plan già validato, quanto correttamente VulcaTest distingue una macchina conforme da una macchina contenente una perturbazione nota?

In E2 il Planner viene escluso dalla variabile sperimentale utilizzando il Golden Plan.

## Configurazioni

### Controllo negativo

```text
Golden Plan + Golden Machine
```

Risultato atteso: nessun ticket.

### Caso perturbato

```text
Golden Plan + Perturbed Machine
```

Risultato atteso: generazione del ticket relativo alla non conformità introdotta.

Il Final Evaluator viene mantenuto nella pipeline, ma non rappresenta il componente principale oggetto della valutazione: esso formalizza nel report l'esito derivante dall'esecuzione.

## Confusion matrix

| Stato reale | Risultato del sistema | Classe |
|---|---|---|
| Perturbata | Ticket | TP |
| Perturbata | Nessun ticket | FN |
| Golden | Nessun ticket | TN |
| Golden | Ticket | FP |

## Metriche

\[
Recall = TPR = \frac{TP}{TP+FN}
\]

\[
Specificity = \frac{TN}{TN+FP}
\]

\[
Precision = \frac{TP}{TP+FP}
\]

Eventualmente:

\[
F_1 =
2 \frac{Precision \cdot Recall}
{Precision + Recall}
\]

Oltre alla sola detection, è utile verificare anche la correttezza della diagnosi rispetto alla ground truth associata alla perturbazione.

---

# Classi di perturbazione utilizzate

Le perturbazioni di classe P4 vengono escluse dal benchmark quantitativo principale.

P4 rappresentava infatti difetti della specifica/oracolo e richiedeva come comportamento corretto un `DECLINE` o un intervento human-in-the-loop, invece di una modifica della macchina.

Il benchmark principale si concentra quindi sui difetti effettivamente introdotti nell'implementazione dello scenario.

## P1 — Modifica additiva

Manca un elemento necessario al corretto funzionamento dello scenario.

Esempi:

- task di deployment rimosso;
- utente mancante;
- file mancante;
- zona DNS mancante.

## P2 — Modifica di valore

Un elemento esiste, ma contiene un valore errato o disallineato.

Esempi:

- password errata;
- hash incoerente;
- token errato;
- chiave modificata.

## P3 — Modifica sottrattiva / hardening

È presente qualcosa che non dovrebbe esserci o un privilegio è eccessivo.

Esempi:

- permessi troppo permissivi;
- ownership errata;
- gruppo aggiuntivo;
- esposizione DNS non prevista.

---

# Sottoinsieme principale di macchine per E2/E3

Per contenere i costi computazionali mantenendo eterogeneità, il benchmark principale utilizza 8 macchine.

| Macchina | P1 | P2 | P3 |
|---|:---:|:---:|:---:|
| Pizzeria | ✓ | ✓ | |
| AuthGate | ✓ | | |
| Citadel | ✓ | | ✓ |
| CryptoVault | | ✓ | ✓ |
| ConsoleGate | ✓ | ✓ | |
| NetVault | ✓ | | ✓ |
| GitPoison | ✓ | | ✓ |
| TunnelGate | | ✓ | ✓ |

Totale perturbazioni:

\[
6\ P1 + 4\ P2 + 5\ P3 = 15
\]

## Numero di run perturbate

Tre run per perturbazione:

\[
15 \times 3 = 45
\]

## Numero di run clean

Tre run sulla Golden Machine per ciascuna delle 8 macchine:

\[
8 \times 3 = 24
\]

## Totale E2

\[
45 + 24 = 69 \text{ run}
\]

Con una durata media di 16–18 minuti per esecuzione:

\[
69 \times (16\text{–}18) \approx 18.4\text{–}20.7 \text{ ore}
\]

Le tre repliche della stessa perturbazione non vengono considerate tre fault indipendenti, ma tre osservazioni della stabilità del sistema rispetto allo stesso caso.

---

# E3 — Valutazione dell'Healer

## Domanda sperimentale

> Dato un problema reale correttamente rilevato, quanto frequentemente l'Healer riesce a ripristinare la conformità dello scenario?

E3 utilizza esclusivamente i **True Positive reali provenienti da E2**.

Non vengono sottoposti all'Healer:

- falsi positivi;
- casi in cui la perturbazione non è stata realmente rilevata;
- difetti di specifica esclusi dal perimetro quantitativo principale.

## Flusso

```text
TP di E2
   ↓
 Healer
   ↓
 modifica
   ↓
 rebuild
   ↓
 stesso Golden Plan
   ↓
 nuova verifica
```

## Definizione di healing corretto

Una perturbazione viene considerata correttamente risolta quando:

1. il ticket iniziale corrisponde a un difetto reale;
2. l'Healer produce una modifica;
3. la macchina viene ricostruita;
4. viene rieseguito lo stesso Golden Plan;
5. la non conformità originaria non viene più rilevata.

## Metrica principale

\[
HealingSuccessRate =
\frac{\text{TP correttamente risolti}}
{\text{TP sottoposti all'Healer}}
\]

Se sono previsti più tentativi di healing, possono essere riportate anche:

\[
HSR_1
\]

success rate al primo tentativo,

e:

\[
HSR_{\leq k}
\]

success rate entro il numero massimo di tentativi consentiti.

Può inoltre essere utile calcolare:

\[
MeanHealingAttempts =
\frac{\sum attempts}
{\text{healing riusciti}}
\]

## Numero massimo di casi

Nel caso limite in cui tutte le 45 run perturbate di E2 risultino True Positive:

\[
E3 \leq 45 \text{ casi}
\]

La sola riesecuzione post-healing richiederebbe circa:

\[
45 \times (16\text{–}18)
\approx 12\text{–}13.5 \text{ ore}
\]

a cui devono essere aggiunti il tempo dell'Healer, della build e degli eventuali retry.

---

# Stima temporale complessiva

| Esperimento | Run | Tempo stimato |
|---|---:|---:|
| E1 — Planner | 33 | ~11–12.1 h |
| E2 — Detection | 69 | ~18.4–20.7 h |
| E3 — Healing | ≤45 | ≥12–13.5 h + healing/build |

Tempo minimo complessivo:

\[
\approx 41\text{–}46 \text{ ore}
\]

senza includere completamente:

- tempo di healing;
- rebuild;
- retry;
- eventuali problemi infrastrutturali.

La campagna sperimentale può quindi superare realisticamente le 45–50 ore.

---

# Estensione opzionale

Se il tempo residuo lo consente, la stessa metodologia può essere estesa alle restanti macchine escluse dal sottoinsieme principale.

L'estensione deve mantenere invariati:

- protocollo;
- Golden Plan;
- numero di run;
- ripristino del Golden State;
- metriche;
- criteri di classificazione.

In questo modo i risultati aggiuntivi possono essere integrati direttamente nel benchmark principale senza modificarne la metodologia.

---

# Limitazioni metodologiche

## 1. Artifact upstream e Planner

Gli artifact forniti al Planner vengono controllati e rifiniti manualmente prima di E1.

Nonostante questa verifica, manca una metrica formale in grado di separare in ogni caso un errore intrinseco del Planner da un problema presente negli artifact upstream.

Questa limitazione viene gestita definendo chiaramente il perimetro dello studio:

- gli artifact vengono assunti sufficientemente corretti dopo la fase di qualificazione;
- la valutazione automatica di VulkaMind non costituisce l'oggetto principale del benchmark;
- eventuali incoerenze che richiedano una modifica di `description`, `storyline` o altre specifiche autoritative vengono demandate a revisione umana.

## 2. Assunzione sulla stabilità dell'Executor in E3

La valutazione dell'Healer assume che il percorso di verifica basato sul Golden Plan rimanga sufficientemente stabile prima e dopo la modifica.

La seconda run non permette di distinguere con certezza assoluta tra:

- persistenza del difetto;
- errore dell'Executor;
- altra anomalia runtime.

Il rischio viene mitigato attraverso:

- uso dello stesso Golden Plan;
- qualificazione preventiva del Golden Plan tramite tre run consecutive;
- ripristino controllato del Golden State;
- tracciamento completo delle run.

---

# Regole sperimentali

1. Ogni run parte da uno stato noto e riproducibile.
2. Prima di ogni test viene ripristinato il Golden State.
3. Le perturbazioni vengono applicate solo dopo il ripristino.
4. Il Golden Plan resta invariato durante E2 ed E3.
5. Ogni perturbazione viene associata alla relativa run e al relativo report.
6. Le modifiche introdotte dall'Healer devono essere tracciate.
7. I risultati vengono interpretati in relazione alla specifica domanda di ricerca dell'esperimento.

---

# Dataset di tracciamento delle run

Prima dell'avvio della campagna definitiva deve essere predisposto un dataset che mantenga la corrispondenza:

```text
perturbazione → run → report → ticket → healing
```

Campi consigliati:

```text
machine_id
golden_state_version
golden_plan_version
experiment_id
run_id
perturbation_id
perturbation_type
is_perturbed
ticket_generated
TP_FP_TN_FN
diagnosis_expected
diagnosis_observed
report_path
healing_called
healing_attempts
healing_success
post_healing_report
execution_time
```

Questo dataset sarà il riferimento per il calcolo delle metriche, la generazione dei grafici e l'analisi finale dei risultati.

---

# Sintesi finale

La metodologia definitiva è organizzata secondo il principio:

```text
E0 → costruisce il riferimento
E1 → valuta il Planner
E2 → valuta la capacità di rilevazione
E3 → valuta il self-healing
```

Il benchmark principale utilizza:

- 11 macchine in E1;
- 8 macchine in E2/E3;
- 15 perturbazioni P1–P3;
- 3 run per ogni perturbazione;
- 3 run clean per ogni macchina di E2;
- Golden State ripristinato prima di ogni run;
- Golden Plan congelato in E2/E3.

La configurazione scelta privilegia un equilibrio tra:

- eterogeneità degli scenari;
- ripetibilità;
- isolamento dei componenti;
- costo computazionale;
- interpretabilità dei risultati.

L'obiettivo non è dimostrare una validità universale di VulcaTest, ma fornire evidenza empirica controllata, riproducibile e sufficientemente varia sulle capacità di generazione del piano, rilevazione delle non conformità e self-healing.
