# Specifiche Formali e Semi-formali

## Specifiche Formali

Le **specifiche formali** descrivono requisiti e comportamento del sistema attraverso notazioni matematiche precise.

Servono a:

- ridurre ambiguità e interpretazioni diverse;
- descrivere in modo rigoroso il comportamento del sistema;
- facilitare analisi e verifica.

Nel materiale vengono presentati tre formalismi principali:

- **Petri Net**;
- **Finite State Machine (FSM)**;
- **linguaggio Z**.

Quali formalismi vengono utilizzati per le specifiche formali?

la risposta

Nel materiale vengono presentate le **Petri Net**, le **FSM** (*Finite State Machine*) e il **linguaggio Z** come formalismi utilizzabili per esprimere specifiche formali.

---

## Specifiche Formali con Petri Net

Le **Petri Net** sono un modello matematico e grafico utilizzato per rappresentare il comportamento di sistemi in cui più attività possono avvenire in modo concorrente.

Sono costituite principalmente da:

- **Place**
  - rappresentano condizioni o stati del sistema;

- **Transition**
  - rappresentano eventi o azioni che modificano lo stato del sistema;

- **Arc**
  - collegano *place* e *transition*;
  - indicano come avviene il passaggio tra le diverse condizioni del sistema.

Graficamente:

- i *place* sono rappresentati con cerchi;
- le *transition* con rettangoli o barre;
- gli *arc* con frecce.

Le Petri Net permettono quindi di rappresentare in modo preciso il flusso delle attività e le condizioni necessarie affinché determinati eventi possano avvenire.

### Marked Petri Net

Una **Marked Petri Net** aggiunge alle Petri Net il concetto di **token**.

I *token*:

- sono contenuti nei *place*;
- rappresentano la situazione corrente del sistema;
- la loro distribuzione costituisce la **marcatura** della rete.

Una *transition* può effettuare il **firing** quando sono soddisfatte le condizioni necessarie nei *place* di input.

Con il *firing*:

- alcuni token vengono rimossi dai *place* di input;
- altri vengono inseriti nei *place* di output;
- cambia quindi la marcatura e, di conseguenza, lo stato del sistema.

Cosa caratterizza una Marked Petri Net?

la risposta

Una **Marked Petri Net** contiene dei *token* nei *place*. La distribuzione dei token rappresenta lo stato corrente del sistema e cambia quando una transizione effettua il *firing*.

### Inhibitor Arc

Un **Inhibitor Arc** è un particolare arco utilizzato per impedire il *firing* di una transizione quando una determinata condizione è presente.

Serve quindi a rappresentare situazioni in cui una transizione può avvenire solo in assenza di una certa condizione.

---

## Specifiche Formali con Finite State Machine

Le **FSM** (*Finite State Machine*) sono modelli matematici utilizzati per descrivere sistemi che possono trovarsi in un numero finito di stati.

Una FSM è composta principalmente da:

- **State**
  - rappresenta una possibile condizione del sistema;

- **Input / evento**
  - provoca, quando previsto, il passaggio da uno stato a un altro;

- **Transition**
  - rappresenta il cambiamento di stato.

Le FSM sono particolarmente utili per descrivere:

- il comportamento del sistema nel tempo;
- sequenze di azioni;
- reazioni a determinati eventi;
- eventuali condizioni di errore.

In pratica, una FSM descrive **in quale stato si trova il sistema e come cambia stato in risposta agli eventi**.

---

## Specifiche Formali con Linguaggio Z

Il **linguaggio Z** è un linguaggio formale basato su notazione matematica e logica.

Viene utilizzato per descrivere in modo preciso:

- lo stato del sistema;
- le proprietà che devono essere rispettate;
- le operazioni che possono modificare lo stato.

Una specifica in Z è composta da un insieme di **schemi Z**.

Ogni schema può descrivere:

- lo stato del sistema;
- uno stato iniziale;
- una particolare operazione.

### Specifica di Stato

Una **specifica di stato** descrive le variabili che rappresentano lo stato del sistema e i vincoli che devono rispettare.

Nel materiale compare anche un esempio di stato iniziale astratto:

`Button_init := [Button_State’ | pushed’ = ∅]`

### Specifica di Operazione

Una **specifica di operazione** descrive come un'operazione modifica lo stato del sistema.

Permette quindi di specificare matematicamente:

- condizioni iniziali;
- operazione eseguita;
- stato risultante.

Come è strutturata una specifica in linguaggio Z?

la risposta

Una specifica in **linguaggio Z** è composta da un insieme di schemi. Gli schemi possono descrivere lo stato del sistema, lo stato iniziale e le operazioni che ne modificano lo stato.

---

# Specifiche Semi-formali

Le **specifiche semi-formali** utilizzano modelli e diagrammi per descrivere il sistema in modo più strutturato rispetto al solo linguaggio naturale, ma senza arrivare al rigore matematico delle specifiche formali.

Un **modello del sistema** è una rappresentazione astratta del software che permette di comprenderne caratteristiche e comportamento prima della realizzazione.

I metodi di analisi possono essere:

- **analisi strutturata**
  - orientata principalmente a funzioni e processi;

- **analisi orientata agli oggetti**
  - organizza il sistema attorno a oggetti, classi e relazioni.

Per descrivere completamente un sistema non è sufficiente un unico modello.

Servono più punti di vista, in particolare:

- dati;
- funzionalità e comportamento;
- evoluzione dinamica del sistema.

---

## Tipi di Modelli del Sistema

Per descrivere una specifica semi-formale vengono utilizzati tre tipi principali di modelli:

1. **modello dei dati**;
2. **modello comportamentale**;
3. **modello dinamico**.

### Modello dei Dati

Il **modello dei dati** rappresenta gli aspetti statici e strutturali delle informazioni gestite dal sistema.

Descrive quindi:

- quali dati esistono;
- come sono organizzati;
- quali relazioni esistono tra essi.

Può essere rappresentato mediante:

- **ERD** (*Entity Relationship Diagram*)
  - non UML;

- **Class Diagram**
  - UML.

### Modello Comportamentale

Il **modello comportamentale** rappresenta ciò che il sistema deve fare, quindi i suoi **functional requirements**.

Descrive:

- funzioni offerte;
- flussi di informazioni;
- interazioni tra utenti e sistema;
- interazioni tra diverse parti del sistema.

Può essere rappresentato tramite:

- **DFD** (*Data Flow Diagram*)
  - non UML;

- **Use Case Diagram**
  - UML;

- **Activity Diagram**
  - UML;

- **Interaction Diagram**
  - UML.

### Modello Dinamico

Il **modello dinamico** descrive come il sistema cambia nel tempo in risposta a eventi e condizioni.

Rappresenta:

- gli stati che il sistema può assumere;
- gli eventi che provocano cambiamenti di stato;
- gli aspetti di controllo del sistema.

Può essere rappresentato mediante:

- **State Diagram**
  - UML.

---

Qual è la differenza tra specifiche formali e semi-formali?

la risposta

Le **specifiche formali** usano notazioni matematiche rigorose, come Petri Net, FSM e linguaggio Z. Le **specifiche semi-formali** usano invece modelli e diagrammi strutturati per rappresentare dati, funzioni e comportamento dinamico del sistema, senza utilizzare una formalizzazione matematica completa.

Quali sono i tre principali modelli utilizzati nelle specifiche semi-formali?

la risposta

Sono il **modello dei dati**, che descrive la struttura delle informazioni, il **modello comportamentale**, che rappresenta le funzionalità del sistema, e il **modello dinamico**, che descrive come il sistema cambia stato nel tempo.
