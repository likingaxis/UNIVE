TITOLO: VulcaTest: Un Framework agentico per la verifica di conformità e il self-healing di scenari Cyber Range

## 1. Introduzione

1.1 Il problema: verificare macchine vulnerabili generate automaticamente
1.2 Obiettivi e contributi della tesi
1.3 Struttura della tesi

## 2. Contesto

2.1 Cyber Range, CTF e macchine Boot-to-Root
2.2 Intended path e conformità di una macchina didattica
2.3 L’ecosistema VulcAIn: VulcaMind, VulcaForge e VulcaShip
2.4 Agenti basati su LLM: ReAct e Plan-and-Execute
2.5 Harness agentici

## 3. Architettura e implementazione di VulcaTest

3.1 Requisiti e limiti delle soluzioni generiche
3.2 Principi di progettazione del sistema
3.3 Architettura generale e flusso di coordinamento
3.4 Il Planner: generazione e formalizzazione dell’Attack Plan
3.5 L’Orchestrator: controllo del workflow e gestione dello stato
3.6 L’Executor: esecuzione e verifica degli step
3.7 Il Bridge di esecuzione: gestione dei tool e delle interazioni con il target
3.8 Il Final Evaluator: valutazione finale e Root Cause Analysis
3.9 Prompt engineering e sviluppo iterativo delle istruzioni
3.10 Modello locale e configurazione dei parametri
   3.10.1 Modello e runtime
   3.10.2 Dimensionamento della finestra di contesto

## 4. Il self-healing closed-loop in VulcaTest

4.1 Il nodo di healing nel workflow closed-loop
4.2 Il ticket di healing
4.3 L’agente di healing: delega a un harness agentico
4.4 Prompt dell’agente di healing e perimetro di modifica
4.5 Tracciamento e validazione delle modifiche
4.6 Chiusura del ciclo: ricostruzione dell'ambiente e riverifica della conformità

## 5. Valutazione sperimentale

5.1 Obiettivi della valutazione e Test Oracle Problem
5.2 Costruzione della ground truth
5.3 Dataset: macchine di riferimento e perturbazioni controllate
5.4 Disegno sperimentale e configurazione
5.5 Metriche di valutazione
5.6 Risultati
   5.6.1 Riconoscimento, diagnosi e riparazione
5.7 Casi di studio
   5.7.1 Pizzeria_B2R: validazione closed-loop end-to-end
5.8 Discussione e limiti della valutazione

## 6. Conclusioni e sviluppi futuri

6.1 Sintesi dei contributi
6.2 Limiti della soluzione attuale
6.3 Sviluppi futuri
