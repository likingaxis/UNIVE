---
title: "Piano benchmark — spiegazione semplice (con gergo)"
---

> Versione "terra terra" ma **con i termini tecnici spiegati**, così impari la parola *e* il concetto e hai le fonti da citare in tesi.
> Documento tecnico di supporto: `SESSIONE 0 - Fondamenta e stato metriche.md`.

---

## Il quadro in una frase

Vogliamo dimostrare, con dei numeri, che il sistema **vede** se una macchina è buona o rotta, **capisce** perché è rotta, e **la ripara** bene. Poi lo mostriamo su 2-3 macchine di esempio.

---

## Glossario (impara la parola + il concetto)

- **Benchmark** = la domanda a cui rispondi con un numero.
- **Metrica** = il numero che risponde.
- **Ground-truth** (verità nota) = la macchina la costruisci tu, quindi sai già se è buona/rotta e cosa c'è di rotto. È il metro con cui dai i voti al tester.
- **Confusion matrix** (matrice di confusione) = tabella 2×2 che incrocia "verità" e "verdetto del tester". Da lì escono precision e recall.
- **Precision** (precisione) = quando dice "rotta", quante volte ha ragione.
- **Recall** (richiamo/sensibilità) = di tutte le rotte davvero esistenti, quante ne becca.
- **F1** = media armonica di precision e recall, un voto unico.
- **Subtask** (sotto-compito) = spezzare una sfida in tanti passi verificabili, invece di un solo "risolta sì/no". Nel tuo sistema i subtask sono le voci della checklist.
- **Progress rate** (tasso di progresso) = quanti subtask ha superato, es. 7 su 10. Voto a gradini invece che secco.
- **RCA** (Root Cause Analysis, analisi della causa radice) = individuare *perché* è fallita, non solo *che* è fallita.
- **Grounding** (aderenza / ancoraggio) = quanto le azioni che l'agente produce sono davvero eseguibili nell'ambiente (comandi validi, non inventati). *Metrica avanzata — futura.*
- **Verifier gap** (scarto del verificatore) = i casi in cui l'agente crede di aver risolto ma il giudice esterno dice di no. *Avanzata — futura.*
- **Leakage** (fuga di informazione) = quando l'agente "vince" per una scorciatoia non prevista (es. bug dell'infrastruttura), non risolvendo davvero. *Avanzata — futura.*
- **Perturbazione meccanica** = rompere di proposito una macchina buona con una modifica precisa e programmata (es. cambiare un permesso), così sai *esattamente* cosa hai rotto.
- **Scaffold** (impalcatura) = tutto ciò che sta attorno al modello (prompt, tool, gestione del contesto). La performance osservata dipende da *modello + scaffold*, non dal solo modello.

---

## I benchmark (le domande)

1. **Il tester vede giusto?** → riconosce buone e rotte.
2. **Il tester capisce?** → indovina *cosa* è rotto.
3. **Il tester ripara?** → dopo il fix rifunziona e ha cambiato poco.
4. **Quanto costa?** → tempo, passi, token.

---

## Le metriche (nome tecnico + formula + fonte)

Consiglio: **4 metriche principali** per Pasquale, più il costo come extra.

### Metrica 1 — Riconoscimento (Precision / Recall / F1)

**Cosa misura:** se distingue le macchine buone dalle rotte.
**Tabella (confusion matrix)** — "positivo" = "macchina rotta" (è ciò che vogliamo rilevare):

| | Tester dice FAIL | Tester dice PASS |
|---|---|---|
| **Macchina rotta** (verità) | TP (rilevata ✅) | FN (sfuggita ⚠️ pericoloso) |
| **Macchina buona** (verità) | FP (falso allarme) | TN (ok ✅) |

**Formule:**
$$\text{Precision} = \frac{TP}{TP+FP} \qquad \text{Recall} = \frac{TP}{TP+FN} \qquad F_1 = 2\cdot\frac{P\cdot R}{P+R}$$

**Come le leggi:** Precision = "quando accusa, ha ragione". Recall = "non se ne fa scappare". F1 = voto unico.
**Fonte:** metriche classiche di classificazione. Il concetto "environment/oracle integrity" per non avere falsi successi → *SWE-Bench Pro Verified* e *AgentBoard*.

### Metrica 2 — Punteggio a gradini (Progress rate / subtask)

**Cosa misura:** quanto ci va vicino, passo per passo, invece del binario "risolta sì/no". I tuoi subtask sono le voci della checklist.
**Formula (semplice):**
$$\text{progress} = \frac{\text{voci di checklist superate}}{\text{voci totali}}$$

**Formula (formale, AgentBoard):** il progresso è il massimo raggiunto fino al passo $t$:
$$r_t = \max_{i \le t} f(s_i, g)$$
dove $f(s_i,g)$ è quanto lo stato $s_i$ è vicino all'obiettivo $g$.

**Perché conta:** una metrica binaria nasconde quasi tutta l'informazione. Due macchine "fallite" possono essere 2/10 e 8/10 — molto diverse.
**Fonte:** *Cybench* (idea dei subtask) e *AgentBoard* (progress rate, e validazione con umani a correlazione $\rho > 0.95$).

### Metrica 3 — Diagnosi corretta (RCA accuracy)

**Cosa misura:** quando fallisce, il ticket indica il difetto vero (quello che hai iniettato tu).
**Formula:**
$$\text{RCA accuracy} = \frac{\text{diagnosi corrette}}{\text{fallimenti totali}}$$

**Versione avanzata (futura) — Verifier gap:**
$$\text{VerifierGap} = P(\text{SelfPass} \wedge \text{OfficialFail})$$
cioè quante volte l'agente crede di aver risolto ma la verità dice di no.
**Fonte:** *SWE-Bench Pro Verified* (agent-generated oracle failure), sezione metriche derivate.

### Metrica 4 — Qualità della riparazione (healing)

**Cosa misura:** dopo l'healing la macchina ripassa il test, e la patch è piccola.
**Formule:**
$$\text{Closed-loop success} = \frac{\text{riparazioni che ripassano il test}}{\text{tentativi di riparazione}}$$
$$\text{Diff Bloat Ratio} = \frac{\text{righe effettivamente cambiate}}{\text{righe minime necessarie}}$$

**Nota onesta:** il denominatore del Diff Bloat ("patch minima ideale") lo devi definire tu a mano come riferimento. Versione facile subito: **numero di file toccati + righe cambiate** (patch minimal-invasive).
**Fonte:** ispirata al *program repair / patch minimality* (famiglia SWE-Bench). Il "didactic invariant" (non rompere la lezione) è un tuo contributo.

### Extra — Costo

**Cosa misura:** tempo, numero di passi/interazioni, token (input + output).
**Versione avanzata (futura) — successo pesato per difficoltà:**
$$\text{weight} = \log_2(\text{FST})$$
dove FST = *First Solve Time*, il tempo che un umano impiega a risolverla (proxy oggettivo di difficoltà — es. i tempi VDSI).
**Fonte:** *Cybench* (registra token in/out, tempo, interazioni; usa la FST come difficoltà).

---

## Good practice dai paper (le tue fonti da citare)

Queste sono i principi che i paper dimostrano e che tu **rispetti già** — vanno evidenziati in tesi con la citazione.

| Good practice | Fonte | Come la uso io |
|---|---|---|
| Non fermarsi al successo binario, usare i **subtask** | Cybench, AgentBoard | La checklist con AND-gate è già una scomposizione in subtask |
| **Oracle integrity**: chi risolve non deve creare anche il test | SWE-Bench Pro | Il Planner scrive la checklist, l'Executor esegue: sono separati, e la struttura Pydantic lo impedisce |
| **Model + Scaffold**: si misura il modello *dentro* il sistema | Cybench, AgentBoard | Documento l'architettura (mcp_bridge, Terminal Gateway, budget) come parte della misura |
| **Difficoltà misurata, non dichiarata** | Cybench (First Solve Time) | Uso i tempi umani VDSI come etichetta di difficoltà |
| **Ground-truth con difetti noti** + il benchmark va validato | Test Oracle Problem, SWE-Bench Pro | Costruisco macchine con difetti iniettati noti (v. perturbazione) |
| **No leakage / integrità dell'ambiente** | Cybench (bug docker), sezione integrità | Le macchine non devono essere risolvibili per scorciatoie d'infrastruttura |
| Valutare per **diagnosticare**, non solo classificare | AgentBoard | La mia RCA post-mortem fa esattamente questo |

*(Gli ID arXiv esatti sono nel tuo file `PAPER LETTI E IDEE.md`. Verificali prima di citarli.)*

---

## Come generiamo le macchine: la perturbazione meccanica

**La tua domanda "genero così i test, ha senso?" → sì, ed è il metodo giusto.**

Il paper *Test Oracle Problem* mette a confronto due modi di creare i difetti:

```
Difetti generati da un LLM     → naturali, vari, MA difficili da verificare
Perturbazione meccanica        → deterministica, VERIFICABILE, ma meno "naturale"
```

Per un **benchmark** ti serve la seconda, perché devi sapere *con certezza* cosa hai rotto (altrimenti non puoi misurare precision/recall della diagnosi). Il metodo:

1. Parti da una **macchina buona** (intended way passa al 100%).
2. Applichi **una singola modifica precisa e programmata** — es. `owner: operator → owner: root` sulla chiave (il caso che hai già provato), o rimuovere un file, o cambiare un permesso.
3. Sai *esattamente* qual è il difetto → **ground-truth perfetto**.
4. Da **una** macchina buona generi **tante** varianti rotte (una mutazione ciascuna) → dataset economico da scalare.

**Bonus:** lo stai già facendo senza chiamarlo così (l'ownership di AuthGate, il difetto di Pizzeria).
**Limite da dichiarare (onestà):** le perturbazioni meccaniche sono meno "naturali" dei difetti reali. Per una triennale va bene: il controllo vale più del realismo, perché serve a *dimostrare che la misura funziona*.
**Attenzione:** questa perturbazione rompe la **macchina** (difetto sanabile dall'healer). Il caso AuthGate era diverso — un difetto dell'**oracolo/writeup** — categoria più avanzata, per ora a parte.

### Quante macchine servono? (formula)

Sempre dal Test Oracle Problem. La probabilità di scoprire almeno un errore con tasso di guasto $p$ usando $n$ esempi:
$$P(\text{detect}) = 1 - (1-p)^n$$
Per avere una confidenza $C$ servono:
$$n \ge \frac{\ln(1-C)}{\ln(1-p)}$$

Per il 99% di confidenza: guasto 20% → $n \approx 21$, guasto 10% → $n \approx 44$.
**Per Pasquale bastano 3 macchine** (dimostrazione, non statistica). La formula ti serve dopo, per il dataset grande.

---

## Cosa va aggiunto nel codice (due strumentazioni)

Quasi tutto è già raccolto. Servono **due** aggiunte, entrambe descritte in dettaglio in `IMPLEMENTAZIONE benchmark (specs per agente).md`:

1. **Catturare i token** dei modelli e salvarli (oggi solo l'healer li stampa a schermo, senza salvarli). Sblocca la parte "costo" e il confronto tra modelli.
2. **Tempi di fase** (setup Docker / collaudo / RCA / healing). Il tempo attuale mescola il setup — e a volte il Planner — ed esclude RCA e healing. Vanno separati con dei timestamp, **tenendo il reset del container sempre attivo** (il clean slate serve alla validità dei test).

Il resto è **aggregare** dati già raccolti (metriche 1, 2, 4) e **confrontare a mano** ticket vs difetto (metrica 3, poche macchine).

**Nota di fedeltà (verificata nel codice):** `duration_seconds` non è "tempo dell'agente" (include setup e forse Planner, esclude RCA/healing), `exit_code` è semi-sintetico e inaffidabile, `total_tool_calls` conta anche i meta-tool. Le parti *deterministiche* (verdetto, diff, retest, tempo dei tool) sono invece affidabili subito.

---

## Le macchine del mini-test

3 macchine, costruite per perturbazione:
- **1 buona** → deve dare PASS.
- **1 rotta** (difetto evidente, es. ownership) → deve dare FAIL + diagnosi.
- **1 sneaky** (perturbazione sottile) → il caso difficile.

Hai già materiale: **Pizzeria** (riparata) e **AuthGate** (caso oracolo).

---

## Il percorso, in 5 passi

1. **Fissare le 4 metriche** (fatto).
2. **Aggiungere token + tempi di fase nel codice** (le due strumentazioni, v. specs).
3. **Costruire le 3 macchine** per perturbazione.
4. **Eseguire i test** e raccogliere i numeri.
5. **Presentare a Pasquale**: metriche + risultati sulle 3 macchine.

---

## Cosa porti a Pasquale

- Le **4 metriche** con formula e fonte (vede / capisce / ripara / costo).
- I **numeri reali** su 3 macchine.
- Le **good practice dei paper** che l'architettura già rispetta (le citazioni).
- La frase chiave: *"non è teoria — ecco le metriche, le formule, le fonti, ed ecco che le so calcolare sul mio sistema."*

---

## Dopo la call — Fase 2 (concreto, implementabile se approvato e c'è tempo)

In ordine di rapporto **valore/sforzo**:

1. **Confronto tra modelli** (locale vs cloud + **costo in €** / offline). Sforzo **basso**: l'architettura è già parametrizzata sul modello. Cade quasi gratis dalla cattura dei token. Stima API ~10-20€ per pochi modelli, ma **misura prima il costo di UNA run** e poi estrapola (i modelli con molto reasoning bruciano token). I locali costano 0€.
2. **Modalità black-box** (piano dalle domande CTFd). Sforzo **basso-medio**: convertitore CTFd→piano + oracolo *exact-match* sulla `Correct Answer` + system prompt riscritto ("scopri la risposta" invece di "esegui il passo") + budget più alto. Sblocca il confronto coi **tempi umani VDSI**. Misura la *capacità di scoperta*, non alimenta l'healing.
3. **Ablazione architetturale** (3 ruoli vs agente monolitico). Sforzo **medio**: costruire un baseline monolitico e girarlo sulle stesse macchine. Il più costoso, ma il più forte — giustifica il design.
4. **Alcune metriche avanzate mirate** (v. nota sotto su quali e come).

## Sviluppi futuri veri (nominare in tesi, NON implementare)

- **Dataset grande statistico** ($n \approx 21$-$44$ con $n \ge \ln(1-C)/\ln(1-p)$): troppa generazione di macchine per una triennale.
- **Qualità del Planner come asse completo** / auto-consistenza automatica dell'oracolo (nasce dal caso AuthGate, è ricerca a sé).
- **Trittico di LLM come sistema di validazione rigoroso e validato**: l'idea è tua, ma renderla solida è un mini-progetto.
- Metriche avanzate che richiedono infrastruttura pesante.

## Nota — metriche avanzate e il "trittico di modelli"

Il **trittico** (giuria di 3 LLM che votano, tecnicamente *LLM-as-judge*) NON risolve tutte le metriche avanzate. Serve per i giudizi **soggettivi / difficili da automatizzare**:
- **Validare** le metriche automatiche contro un giudizio "umano-simile" (sostituisce l'annotazione umana di AgentBoard, che validava con $\rho > 0.95$). ← uso principale.
- Giudicare la **legittimità del percorso** (leakage: ha usato scorciatoie?).
- Giudicare la **qualità della diagnosi** su larga scala.

Invece queste NON hanno bisogno del trittico:
- **Grounding** = deterministico → conti le chiamate a tool malformate/rifiutate dal bridge (serve codice, non giuria).
- **Verifier gap** = si calcola dal ground-truth → l'Executor dice "passato" ma la verità dice "rotto" (non serve giuria).

*Promemoria di scope (triennale): il cuore della tesi sono le **4 metriche + 3 macchine**. La Fase 2 è bonus — da prioritizzare, non da fare tutta.*
