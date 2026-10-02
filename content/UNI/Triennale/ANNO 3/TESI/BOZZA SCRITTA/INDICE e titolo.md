TITOLO: Framework AI-driven per il self-healing di scenari Cyber Range 

## 1. Introduzione

1.1 Il problema di partenza: la validazione di ambienti vulnerabili generati automaticamente
1.2 Obiettivi e contributi della tesi: conformance testing e healing
1.3 Struttura della tesi

## 2. Contesto e lavori correlati

2.1 Ambienti Cyber Range vulnerabili e penetration testing come strumento di validazione
2.2 Intended path e conformità: vulnerabilità intenzionali e difetti di implementazione  
2.3 Agenti basati su LLM e principali pattern decisionali: ReAct e Plan-and-Execute  
2.4 Harness agentici e separazione tra reasoning, orchestrazione ed esecuzione  
2.5 L’ecosistema VulcAIn e la necessità del conformance testing automatico  
2.6 Stato dell’arte e posizionamento del lavoro: autonomous pentesting, conformance testing e self-healing

## 3. Architettura e implementazione di VulcaTest

3.1 Requisiti e limiti delle soluzioni generiche
   3.1.1 Il livello del modello: guardrail e costi di esecuzione
   3.1.2 Il livello del controllo operativo
3.2 Principi di progettazione del sistema
   3.2.1 Deterministico quando possibile, probabilistico quando necessario
   3.2.2 Esecuzione basata su evidenze e rifiuto dell’auto-certificazione
   3.2.3 Separazione delle responsabilità e specializzazione dei ruoli
   3.2.4 Intercambiabilità e modularità architetturale
   3.2.5 Controllo gerarchico: pianificazione a livello macro e ReAct a livello micro
3.3 Architettura generale e flusso di coordinamento
   3.3.1 Inquadramento architetturale e gestione dello stato
   3.3.2 Punti di ingresso e avvio del workflow
   3.3.3 Comunicazione tra i componenti e strutture dati tipizzate
3.4 Il Planner: generazione e formalizzazione dell’Attack Plan  
   3.4.1 Architettura ibrida a due stadi
   3.4.2 Gerarchia delle fonti e risoluzione delle ambiguità
   3.4.3 Regole per la definizione dei criteri di verifica
   3.4.4 Dimensionamento dinamico del contesto
3.5 L’Orchestrator: controllo del workflow e gestione dello stato  
   3.5.1 Working Memory: `VulcaTestState`
   3.5.2 Topologia del grafo e instradamento condizionale
3.6 L’Executor: esecuzione degli step e modalità di auditing
   3.6.1 Auditor Mode
   3.6.2 Gestione dinamica del budget operativo
   3.6.3 Tool interni e recupero dei valori verificati
   3.6.4 Il contratto `StepResult` e la verifica dello step
3.7 Il Bridge di esecuzione: gestione degli strumenti e delle interazioni con il target 
   3.7.1 Canale dell’azione: architettura a due livelli
   3.7.2 Canale della percezione: normalizzazione dell’output e informazioni di stato
   3.7.3 Gestione del contesto: troncamento degli output e tool-slicing
   3.7.4 Supporto alle applicazioni terminali interattive
3.8 Il Final Evaluator: valutazione deterministica e Root Cause Analysis  
   3.8.1 Stadio 1: raccolta delle metriche
   3.8.2 Stadio 2: diagnosi del fallimento e Root Cause Analysis
3.9 Prompt engineering e definizione dei ruoli agentici
   3.9.1 Sviluppo e specializzazione dei prompt
   3.9.2 Regole esplicite e formati vincolati
3.10 Modello locale e ottimizzazione dei parametri di inferenza
   3.10.1 Scelta del modello locale
   3.10.2 Configurazione e ottimizzazione dell’inferenza

## 4. VulcaHealing: closed-loop self-healing

4.1 Integrazione di VulcaHealing nel workflow closed-loop
   4.1.1 Separazione funzionale tra validazione e autoriparazione
   4.1.2 Estensione dello StateGraph e attivazione condizionale
4.2 Dal ticket diagnostico alla localizzazione del difetto nell’Infrastructure as Code
   4.2.1 Il principio dell’Heuristic Lead: sintomo vs causa radice
   4.2.2 Dalla diagnosi alla ricetta dichiarativa: il caso DataVault
4.3 L’Healer: delega operativa a harness agentici generici
   4.3.1 Il ruolo complementare degli harness generici nel code editing
   4.3.2 Architettura di integrazione con Antigravity CLI
4.4 Prompt dell’Healer, vincoli operativi e perimetro di modifica
   4.4.1 Vincoli di riparazione e preservazione delle vulnerabilità didattiche
   4.4.2 Delimitazione del perimetro di scrittura e protezione del bundle
   4.4.3 Feedback deterministico su errori di compilazione pregressi
4.5 Tracciamento e validazione delle modifiche
   4.5.1 Rifiuto dell’auto-certificazione nella fase di riparazione
   4.5.2 Snapshot, calcolo del diff deterministico e artefatti generati
4.6 Chiusura del ciclo: ricostruzione dell’ambiente e regression testing
   4.6.1 Pipeline di rebuild e il gate di compilazione Echo-Safe
   4.6.2 Ripristino dello stato e regression testing integrale
   4.6.3 Condizioni di terminazione del ciclo e limiti attuali

## 5. Valutazione sperimentale

5.1 Metodologia di valutazione e Test Oracle Problem
5.2 Dataset di riferimento e definizione della Golden Source
5.3 Metodologia di benchmark: baseline, perturbazioni controllate e configurazione delle run
5.4 TestBench: benchmark per detection, RCA, healing ed efficienza  
5.5 Disegno sperimentale e copertura dei casi
5.6 Analisi e discussione dei risultati
   5.6.1 Caso di studio: validazione closed-loop end-to-end di Pizzeria_B2R
   5.6.2 Valutazione comparativa dei modelli: impatto del reasoning e confronto con modelli orientati al codice
   5.6.3 Studio di ablazione dei ruoli e impatto della modularità sul Goal Drift 
   5.6.4 Discussione complessiva dei risultati

## 6. Conclusioni e sviluppi futuri

6.1 Sintesi dei contributi progettuali e sperimentali  
6.2 Limiti della soluzione attuale  
6.3 Sviluppi futuri: benchmark esteso con modelli cloud, black-box testing, healing locale e supporto real-time agli esami  
6.4 Considerazioni finali
