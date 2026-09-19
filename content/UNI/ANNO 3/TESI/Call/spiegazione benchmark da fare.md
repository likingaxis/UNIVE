# Framework di Benchmark e Metriche di Valutazione (VulcaTest & VulcaHealing)

Sintesi schematica delle metriche, delle formule matematiche e della metodologia sperimentale per valutare quantitativamente sia la fase di collaudo (**VulcaTest**) sia quella di autoriparazione (**VulcaHealing**).

Tutte le metriche sono raccolte ed esportate in modo deterministico a fine esecuzione nel file strutturato `run_summary.json`.

---

## B1 — Capacità di Riconoscimento (Detection & Progress)

Misura se il collaudatore distingue una macchina difettosa da una sana. 
Convenzione diagnostica: consideriamo **Positivo** il riscontro di un difetto o blocco nella macchina.

### Matrice di Confusione
* **True Positive (TP)**: macchina difettosa $\to$ test `FAILED` (difetto correttamente intercettato).
* **False Positive (FP)**: macchina sana $\to$ test `FAILED` (falso allarme / allucinazione dell'agente).
* **False Negative (FN)**: macchina difettosa $\to$ test `COMPLETED` (difetto sfuggito, macchina non conforme promossa).
* **True Negative (TN)**: macchina sana $\to$ test `COMPLETED` (macchina conforme regolarmente promossa).

$$\text{Accuracy} = \frac{\text{TP} + \text{TN}}{\text{TP} + \text{TN} + \text{FP} + \text{FN}} \qquad \text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}}$$

$$\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}} \qquad F_1 = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}$$

### Avanzamento a grana fine (*Progress*)
Cattura i successi parziali lungo il percorso di collaudo senza appiattire l'esito su un semplice valore binario (Pass/Fail):

$$\text{Progress} = \frac{\sum \text{checkpoint della checklist superati con successo}}{\text{totale checkpoint previsti nel piano}}$$

---

## B2 — Accuratezza Diagnostica (Root Cause Analysis)

Misura se il Final Evaluator comprende la reale causa interna del blocco anziché fermarsi alla segnalazione del sintomo esteriore:

$$\text{RCA Accuracy} = \frac{\text{diagnosi corrette}}{\text{totale fallimenti analizzati}}$$

> **Criterio di correttezza**: Una diagnosi è classificata come corretta se individua esattamente sia la tipologia del guasto (`defect_type`), sia il componente sorgente o file alterato (`affected_component`) formalizzati in `healing_ticket.json`.

---

## B3 — Efficacia di Riparazione (Self-Healing)

Valuta la capacità del modulo di healing di ripristinare la piena risolvibilità della macchina mediante interventi minimi e rispettosi del design didattico originale:

### 1. Tasso di Successo Closed-Loop
Percentuale di riparazioni che, al secondo run di collaudo, consentono all'agente di completare l'intera catena fino a root:

$$\text{Closed-Loop Success Rate} = \frac{\text{riparazioni con retest COMPLETED}}{\text{totale riparazioni avviate}}$$

### 2. Invasività della Patch (Minimalità)
Quantifica l'ampiezza dell'intervento rispetto alla correzione minima necessaria, calcolata tramite diff deterministico (`patch.diff`):

$$\text{Ampiezza Patch} = \#\text{file modificati} + \#\text{righe alterate}$$

---

## B4 — Costi ed Efficienza (quanto ci costa far girare il sistema)

Qui misuriamo le risorse reali consumate durante ogni test, divise in tre aspetti pratici:

* **Tempo impiegato (diviso per fasi)**:
  * *Avvio Docker*: quanto tempo serve per resettare e avviare i container puliti da zero (tenuto separato per non falsare i dati dell'agente).
  * *Collaudo*: tempo puro impiegato dall'agente a ragionare ed eseguire i comandi di test:
    $$T_{\text{collaudo}} = T_{\text{executor}} + T_{\text{orchestrator}}$$
  * *Diagnosi*: tempo impiegato per capire la causa dell'errore ($T_{\text{evaluator}}$).
  * *Riparazione*: tempo per scrivere la patch con l'Healer e ricostruire la macchina ($T_{\text{healer}}$).
* **Token consumati (costo economico delle chiamate LLM)**:
  * Tracciamo con precisione i token inviati (prompt) e ricevuti (risposte) per ogni singolo modulo: chi pianifica (Planner), chi esegue i test (Executor, sia totale che step per step), chi analizza l'errore (Evaluator) e chi ripara (Healer):
    $$\text{Token}_{\text{totali}} = \text{Token}_{\text{planner}} + \text{Token}_{\text{executor}} + \text{Token}_{\text{evaluator}} + \text{Token}_{\text{healer}}$$
  * Permette di calcolare direttamente il costo vivo in euro/dollari: $\text{Costo} = (\text{Token}_{\text{in}} \cdot P_{\text{in}}) + (\text{Token}_{\text{out}} \cdot P_{\text{out}})$.
* **Comandi eseguiti e tentativi**:
  * Quanti comandi a terminale sono stati lanciati e quanti tentativi/turni di ragionamento ha usato l'agente prima di superare lo step o fermarsi.

---

## Metodologia: Ground Truth per Perturbazione

Per calcolare oggettivamente TP/FP/FN/TN e l'accuratezza RCA, utilizziamo il **Mutation Testing**:
1. **Golden State**: Si parte da macchine didattiche pienamente funzionanti e verificate al 100%.
2. **Iniezione Controllata**: Si applica una singola mutazione nota nei sorgenti infrastrutturali (IaC) o applicativi (es. permessi errati su chiavi SSH, porte chiuse, configurazioni Nginx/PHP errate).
3. **Verifica Deterministica**: Conoscendo a priori il punto esatto di rottura e il componente colpevole, si confronta l'output dell'agente con il Ground Truth atteso.

---

## Sviluppi Futuri ed Esperimenti in Programma

1. **Confronto tra Modelli (Cloud vs Locale)**:
   * Esecuzione del benchmark confrontando modelli LLM avanzati via API cloud (es. Qwen 2.5 / DeepSeek) con modelli open-weights eseguiti in locale su GPU offline.
   * *Obiettivo*: Quantificare trade-off tra costi, latenze, consumi e accuratezza diagnostica in ambienti isolati (air-gapped).
2. **Ablazione Architetturale (Multi-Agente a Ruoli vs Agente Monolitico)**:
   * Confronto sperimentale tra la pipeline modulare a ruoli specializzati (Planner $\to$ Orchestrator $\to$ Executor $\to$ Evaluator $\to$ Healer) e un singolo agente generico "tuttofare".
   * *Obiettivo*: Dimostrare empiricamente che la separazione dei compiti previene il *goal drift*, limita le allucinazioni e garantisce contratti di stato più affidabili.
3. **Dataset di Perturbazione Esteso (Dimensionamento del Campione)**:
   * Per decidere quante macchine o mutazioni testare senza scegliere un numero arbitrario, utilizziamo la formula probabilistica di dimensionamento del campione:
     $$n \ge \frac{\ln(1-C)}{\ln(1-p)}$$
     * $C$ (Livello di Confidenza): certezza statistica desiderata (es. $95\%$ o $99\%$).
     * $p$ (Frequenza minima del difetto): probabilità minima del guasto che vogliamo intercettare (es. $20\%$).
     * *Esempio pratico*: per avere il **99% di confidenza** ($C = 0.99$) di intercettare difetti con una frequenza del **20%** ($p = 0.20$), servono matematicamente:
       $$n \ge \frac{\ln(0.01)}{\ln(0.80)} \approx 20.6 \implies \mathbf{21\text{ macchine/mutazioni}}$$
