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
3.2 Principi di progettazione del sistema
3.3 Architettura generale e flusso di coordinamento
3.4 Il Planner: generazione e formalizzazione dell’Attack Plan  
3.5 L’Orchestrator: controllo del workflow e gestione dello stato  
3.6 L’Executor: esecuzione degli step e modalità di auditing
3.7 Il Bridge di esecuzione: gestione degli strumenti e delle interazioni con il target 
3.8 Il Final Evaluator: valutazione deterministica e Root Cause Analysis  
3.9 Prompt engineering e definizione dei ruoli agentici
3.10 Modello locale e configurazione dell’inferenza
## 4. VulcaHealing: closed-loop self-healing

4.1 Dal rilevamento alla correzione: motivazioni e separazione del sottosistema  
4.2 Dalle evidenze alla causa: Root Cause Analysis e individuazione dei difetti nell’Infrastructure as Code
4.3 Delega operativa a harness agentici generici
4.4 Prompt costituzionale, vincoli operativi e perimetro di modifica  
4.5 Tracciamento delle modifiche: diff deterministico e validazione delle correzioni  
4.6 Chiusura del ciclo: ricostruzione dell’ambiente e regression testing

## 5. Valutazione sperimentale

5.1 Metodologia di valutazione e Test Oracle Problem
5.2 Dataset di riferimento e definizione della Golden Source
5.3 Metodologia di benchmark: baseline, perturbazioni controllate e configurazione delle run
5.4 TestBench: benchmark per detection, RCA, healing ed efficienza  
5.5 Disegno sperimentale e copertura dei casi
5.6 Analisi e discussione dei risultati
5.6.1 Caso di studio: validazione closed-loop end-to-end di Pizzeria_B2R
5.6.2 Confronto tra modelli locali e cloud
5.6.3 Studio di ablazione dei ruoli e impatto della modularità sul Goal Drift 
5.6.4 Discussione complessiva dei risultati

## 6. Conclusioni e sviluppi futuri

6.1 Sintesi dei contributi progettuali e sperimentali  
6.2 Limiti della soluzione attuale  
6.3 Sviluppi futuri: black-box testing, healing locale e supporto real-time agli esami  
6.4 Considerazioni finali