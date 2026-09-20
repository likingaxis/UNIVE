- fregatene dei voti, stai costruendo la persona che sarai in magistrale, lì puoi grindare di brutto sei bravo in quelle cose e inoltre farai esperienze come erasmus ecc... (Se ti impegni davvero)


- [x] [  ] Prima di fare brainstorming crea un bug in citadel o datavalut e vedi se executor e healing risolvono la cosa
- [x] [  ] Chiedi come fanno ora a essere raccolte effettivamente le metriche, quali raccogliamo già?
- [x] [  ] Brainstorming sui paper mentre eseguo fix delle macchine
- [x] [  ] Ripristino delle macchine
- [x] [  ] Definire i benchmark
- [x] [  ] Definire le metriche
- [x] [  ] Creare 3-4 esempi di macchine e salvarne le metriche
- [x] aggiustarle(sono tutte sbagliate)
- [ ] [  ] Scrivere bene la presentazione da fare al pasquale con impronta architetturale e progettuale della cosa, es: perché ho usato yaml al posto di JSON(può essere interessante)
- [ ] [  ] Fare le slide e prepararsi alla presentazione(aurora ti ascolta)
- [ ] [  ] Mentre creo e testo le macchine inizio a scrivere la tesi (i primi capitoli che funzionano senza dati effettivi,chiedi per sicurezza se ha senso)
- [ ] [  ] Prima di realizzare i benchmark devo accertarmi che la linea produttiva funzioni su 3-4 casi

- [ ] Completare call pasquale.md
- [x] Leggere i paper+video su yt
- [ ] Brainstorming su quali benchmark usare
- [ ] definire le metriche per ottenere quei benchmark(prendere i più fattibili)
- [ ] testare e vedere se le metriche vengono effettivamente restituite
- [ ] costruire una lista di macchine(Dataset) da generare
- [ ] alcune con dei difetti, altre perfette dove intended way è al 100%
	- [ ] per quelle con dei difetti, analizzare e creare una lista di difetti che avvengono solitamente
- [ ] creare le macchine dalla lista(sarà noioso, decidere a priori un numero)
- [ ] eseguire e raccogliere i dati (è possibile automatizzare la cosa? tipo creare uno script in python che tutta la notte fa partire macchina 1 poi macchina 2 poi macchina N e così via?)
PRIMA DI FARLO IN GRANDE (QUELLO SOPRA) MAGARI PROVARE CON 3 MACCHINE 1 ROTTA 1 BUONA 1 CON QUALCOSA DI ROTTO MA PIÙ SNEAKY e calcolare le metriche solo su quelle 3(per farlo vedere al pasquale)
- [ ] dopo aver raccolto i dati schematizzarli e contestualizzarli per raccogliere le metriche
- [ ] slide pasquale
farlo su N macchine(definire un numero per capire la precisione)
HackTheBox?
- [ ] scrivere la tesi



Ecco la scaletta in step, divisa netta pre-call / post-call, con l'ordine giusto e le dipendenze.

## 🎯 PRE-CALL — arrivare pronti

**Fase A — Credibilità / correttezza (farla per prima, è la base)**

- **A1. ✅ COMPLETATO (16-17/09/2026).** Loop reale chiuso end-to-end su Pizzeria con **oracolo severo**: da macchina difettosa (senza chat) → ticket con RCA corretta → healer che costruisce la chat e **rimuove il link diretto** (bypass) → retest `run_summary.json` = `COMPLETED`, 7/7 step fino a root. Evidenze in `white-box/evidence/11.Pizzeria_B2R/latest/` + `healing/healing_1/`; formalizzato come **CS-3 (milestone A1)** in `idee_e_struttura_tesi.md`. Prerequisito risolto: i bug del loop di rebuild (echo sentinel, gate su `__BUILD_SUCCESS__`, idle-watchdog) — v. `memoria.md` §10.7 #35.
- **A2.** (rafforzativo) Rerun pulito di **Exam_1APP26** per confermare il fix del Planner → allarga la tabella di validazione.

**Fase B — Materiale espositivo (punti 1-3)**

- **B1.** Completare `call pasquale.md` (finire la sezione "Come si esegue"), tenendolo a **livello relatore**: top-down, si scende nel dettaglio solo su richiesta.
- **B2.** **Slide** con arco narrativo: problema → architettura a 3 ruoli _e perché_ (Auditor Mode / no-Diagnostician) → numeri di validazione (4 macchine 100%) → self-healing a contesto asimmetrico → **piano sperimentale**.
- **B3.** **Demo kit**: artefatti reali già pronti come sostanza + fallback (`REPORT.md`, `run_summary.json`, `patch.diff`); run live breve solo se c'è tempo. La guida comandi = appendice/per te, non da esporre.
- **B4. Accumulare il materiale espositivo ORA, scrivere i capitoli DOPO.** Scelta: i Cap. 2/3 si scrivono a **fine progetto** (dopo aver raccolto tutti i dati), per non riscrivere man mano che numeri e struttura si assestano. Ma il *materiale grezzo* si cattura adesso finché è fresco — così alla scrittura finale non si perde nulla. Contenitori: `call pasquale.md` (dettagli architettura a livello relatore, **NON in forma-capitolo**), il notebook `idee_e_struttura_tesi.md` (struttura + casi di studio CS-1/2/3). `call pasquale.md` = **seme riutilizzabile** per la tesi, non versione completa.

**Fase C — Piano scientifico come _design_ (punti 4-6, la metà "prima")**

> **Ordine interno consigliato: C3 → C1 → C2 → C5.** Prima i paper-àncora (danno il vocabolario alle metriche), poi il brainstorming metriche, poi la prova di fattibilità, infine la tassonomia (le macchine si disegnano _sulle_ metriche). Tenere i paper **limitati** (2-3): la rassegna completa è in fase di scrittura, non ora.

- **C1.** **Metriche**: definire i 4 assi (accuratezza RCA / qualità healing / modello locale-vs-cloud / efficienza contesto) con metriche candidate. Per l'healing: Diff Bloat Ratio, Didactic Invariant Preservation, Minimal-Invasive Patch.
- **C2.** **Prova di fattibilità** (1 solo campione, non la suite): calcolare es. il Diff Bloat Ratio sul `patch.diff` di Pizzeria `output_41` già esistente → dimostri che la metrica è _misurabile_, non teorica.
- **C3.** **Related work**: 2-3 paper àncora da Scholar (agentic eval: SWE-bench/AgentBench; cyber-agent: Cybench/CyberSecEval; program repair per patch-minimality).
- **C4.** **Struttura tesi**: bozza dei capitoli (da definire insieme nel prossimo brainstorming).
- **C5.** **Tassonomia macchine di benchmark** come proposta (Idea 27 stress-test asincroni/stateful + Idea 11 difetti IaC iniettati per la confusion matrix). **Cardine scientifico da non perdere:** il dataset deve includere macchine con **difetti iniettati noti (ground truth)**, non solo macchine sane che passano — è ciò che permette di misurare precision/recall della diagnosi (true/false positive dell'oracolo). Senza ground truth non si può *dimostrare* che il tester funziona, solo che non rompe le macchine buone.

**Fase D — Framing della call**

- **D1.** Preparare le **3 decisioni da far approvare**: (a) struttura della tesi, (b) priorità degli assi di benchmark per una triennale, (c) black-box / corpus esterno HTB: in-scope o sviluppi futuri.

---

## 🚀 POST-CALL — esecuzione (dopo l'ok di Pasquale)

- **P1.** Recepire il feedback: finalizzare metriche approvate + tassonomia macchine approvata.
- **P2.** Strumentare la **raccolta dati mancante**: `generate_thesis_tables.py` (Idea 13) + eventuali campi extra in `ToolCallRecord`/`run_summary.json` se le metriche approvate lo richiedono.
- **P3.** **Costruire le macchine** di benchmark approvate (VulcaMind → VulcaForge).
- **P4.** Eseguire la **matrice** (la parte meccanica): per ogni macchina/scenario → run → raccogli `run_summary`/`REPORT`/`patch`.
- **P5.** **Elaborare i dati** → tabelle/grafici (confusion matrix della RCA, metriche di healing, confronto modelli…).
- **P6.** Scrivere i **capitoli sperimentali** riempiendo i placeholder della struttura definita in C4.
- **P7.** (se approvato in D1) **black-box / corpus esterno** per la validità esterna.

---

**Dipendenze chiave da tenere a mente:** A1 prima di tutto (correttezza); C1 → C2 → C5 (le macchine si disegnano _sulle_ metriche); e nel post, P1 → P3 → P4 → P5 → P6.

Vuoi che la salvi da qualche parte (in fondo a `call pasquale.md`, o in un file `scaletta.md` a parte), o la teniamo qui e passiamo a lavorare il primo step di contenuto — tipo **C4 (struttura tesi)** o **C1 (metriche)**?