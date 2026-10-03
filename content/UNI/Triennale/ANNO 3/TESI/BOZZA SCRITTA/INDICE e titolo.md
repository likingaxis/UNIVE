TITOLO: VulcaTest: Framework agentico per verifica di conformità e self-healing di scenari Cyber Range

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
   3.1.1 Limiti del modello: guardrail e costi di esecuzione
   3.1.2 Limiti sul controllo
3.2 Principi di progettazione del sistema
3.3 Architettura generale e flusso di coordinamento
   3.3.1 Inquadramento architetturale e gestione dello stato
   3.3.2 Punti di ingresso e avvio del workflow
   3.3.3 Comunicazione tra i componenti e strutture dati tipizzate
3.4 Il Planner: generazione e formalizzazione dell’Attack Plan  
   3.4.1 Generazione del piano e parsing deterministico
   3.4.2 Gerarchia delle fonti e gestione delle ambiguità
   3.4.3 Regole per la definizione dei criteri di verifica
3.5 L’Orchestrator: controllo del workflow e gestione dello stato  
   3.5.1 Stato condiviso: `VulcaTestState`
   3.5.2 Grafo di esecuzione e condizioni di transizione
3.6 L’Executor: esecuzione e verifica degli step
   3.6.1 Il system prompt dell’Executor
   3.6.2 Gestione dinamica del budget
   3.6.3 Recupero dei valori verificati
   3.6.4 Il contratto `StepResult` e la verifica dello step
3.7 Il Bridge di esecuzione: gestione dei tool e delle interazioni con il target
   3.7.1 Esecuzione dei tool: HexStrike e Terminal Gateway
   3.7.2 Normalizzazione degli output e stato delle sessioni
   3.7.3 Gestione del contesto: troncamento degli output e tool-slicing
   3.7.4 Supporto alle applicazioni terminali interattive
3.8 Il Final Evaluator: valutazione finale e Root Cause Analysis
   3.8.1 Stadio 1: raccolta delle metriche
   3.8.2 Stadio 2: diagnosi del fallimento e Root Cause Analysis
3.9 Prompt engineering e definizione dei ruoli agentici
3.10 Modello locale e configurazione dei parametri
   3.10.1 Scelta del modello locale
   3.10.2 Configurazione del runtime e gestione del contesto

## 4. Il self-healing closed-loop in VulcaTest

4.1 Il nodo di healing nel workflow closed-loop
   4.1.1 Separazione tra verifica e correzione
   4.1.2 Posizione del nodo nel grafo
4.2 Il ticket di healing
4.3 L’agente di healing: delega a un harness agentico
   4.3.1 Uso di un harness generico nella fase di correzione
   4.3.2 Integrazione con Antigravity CLI
4.4 Prompt dell’agente di healing e perimetro di modifica
   4.4.1 Vincoli di riparazione e preservazione delle vulnerabilità didattiche
   4.4.2 Perimetro di lettura e scrittura
   4.4.3 Feedback tra tentativi successivi
4.5 Tracciamento e validazione delle modifiche
   4.5.1 Snapshot e registrazione delle modifiche
   4.5.2 Verifica del perimetro di scrittura
   4.5.3 Classificazione dell’intervento
4.6 Chiusura del ciclo: rebuild dell’ambiente e regression testing
   4.6.1 Generazione del bundle e build dell’immagine
   4.6.2 Ricreazione dell’ambiente e regression testing
   4.6.3 Numero massimo di tentativi

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
