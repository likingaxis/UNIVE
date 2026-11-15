# Specifica Rapida di Progetto — Learning Harness (TutorAI)

> **Obiettivo del documento:** Riferimento rapido e compatto con tutti i dettagli funzionali, pedagogici e tecnici necessari per spiegare il progetto durante la presentazione e rispondere alle domande.

---

## 1. Idea Generale e Problema

- **Il Paradosso dell'AI nello Studio (Bastani et al., 2025):**
  - Gli studenti che usano chatbot generalisti (es. ChatGPT) ottengono **+48%** durante gli esercizi svolti con l'AI, ma **-17%** all'esame finale affrontato da soli.
  - **Causa:** *Cognitive Offloading* (delega cognitiva) e **illusione di competenza**. L'AI produce riassunti e risposte pronte; lo studente legge passivamente senza costruire schemi mentali propri.
- **La Nostra Proposta — AI Learning Harness:**
  - Non un chatbot che genera appunti al posto dello studente, ma un **ambiente di studio guidato** che accompagna lo studente universitario (target iniziale: corsi STEM) dalla prima lezione fino all'esame.
  - **Principio chiave:** L'AI automatizza il carico **logistico/estraneo** (organizzazione fonti, mappa concettuale, pianificazione, verifica), ma protegge e stimola lo **sforzo generativo** (*Germane Load*) che solo lo studente può compiere.

---

## 2. Interfaccia e Flusso di Studio (UX Simmetrica Dual-Pane)

L'interfaccia elimina il cambio continuo di finestre (*Anti-Switching Workspace*, ispirato a **Revision2000** + **Obsidian**) ed è divisa in **barra dei blocchi + due pannelli affiancati**:

### Fase 0 · Onboarding & Organizzazione del Corso
1. **Caricamento materiali:** Slide, PDF, trascrizioni, appunti, programma ed esami passati.
2. **Mappa dei concetti e Prerequisiti:** Il sistema estrae la gerarchia (`Corso → Moduli → Lezioni → Blocchi concettuali`) e il grafo delle dipendenze (DAG). Prima di un nuovo modulo propone un rapido check sui prerequisiti necessari.

### Fase 1 · Studio del Blocco (Interazione Simmetrica)
- **Pannello Sinistro — Spiegazione AI Interattiva:**
  - Spiegazione calibrata sulle conoscenze dello studente, ancorata alle fonti del professore (con formule, esempi e schemi SVG).
  - **Selezione dello studente → Pop-up contestuale:** Lo studente può sottolineare qualsiasi frase a sinistra per far apparire un pop-up ancorato al testo con cui:
    1. **Approfondire** o fare una domanda specifica su quel passaggio.
    2. **Dare feedback ("Poco chiaro" / "Rispiega")** per ottenere subito una riformulazione più semplice o un esempio concreto senza uscire dalla lezione in una chat separata.
- **Pannello Destro — Blank Page personale (stile Obsidian):**
  - Uno spazio di scrittura pulito e libero (`# Titoli`, `## Sottotitoli`, bullet point, formule) dove lo studente **deve rielaborare con parole proprie** ciò che ha capito prima di passare al blocco successivo.
  - **Regola Anti-Riassunto:** L'AI non autocompleta e non genera riassunti "one-click" al posto dello studente.

### Fine Blocco · Pop-up dell'AI sulle Note & Merge
1. **Pop-up dell'AI ancorati ai punti scritti dallo studente:**
   - Quando lo studente clicca *"Blocco completato"*, i ruoli si invertono: l'AI analizza gli appunti di destra, evidenzia i punti specifici in cui rileva un'incomprensione, un salto logico o un'omissione, e **fa apparire dei pop-up direttamente su quelle righe della nota** ponendo **domande mirate aperte** (ragionamento socratico, non quiz a crocette banali).
2. **Merge Intelligente nella struttura dello studente:**
   - Una volta risposto ai pop-up, il sistema propone un **Merge inline** (stile diff: errore barrato in rosso + correzione/integrazione in verde) che arricchisce la nota **mantenendo intatta la struttura e le parole dello studente**, con riferimenti diretti alle slide.

### Fase 2 · Quiz Mirati e Ripassi fino all'Esame
- **Separazione fondamentale (`Knowledge Artifact ≠ Learning State`):**
  - Avere appunti finali perfetti dopo il Merge (**Knowledge Artifact**) **non** significa che il concetto sia già padroneggiato (**Learning State**).
- **Generazione Quiz sulle Lacune:**
  - Gli errori e i dubbi emersi nei pop-up sulle note vengono salvati nello stato di apprendimento e alimentano una **seconda fase di Quiz mirati e ripassi distribuiti** (domande aperte, esercizi stile esame, problemi misti *interleaved* tra capitoli diversi e simulazioni d'esame **senza aiuto AI**).

---

## 3. I Due Percorsi (Casi d'Uso)

Entrambi i percorsi usano la stessa interfaccia Dual-Pane, ma adattano il livello di supporto (*Guidance Fading*):

| Caratteristica | Percorso A — Lecture by Lecture | Percorso B — Exam Preparation |
|---|---|---|
| **Quando si usa** | Seguire il corso passo dopo passo partendo da zero | Preparare l'esame avendo già visto parte del programma |
| **Punto di partenza** | Verifica dei prerequisiti e spiegazione guidata completa | Diagnosi iniziale delle lacune e pianificazione per priorità |
| **Pannello Sinistro** | Spiegazioni strutturate, esempi guidati (*Worked Examples*) | Spiegazioni sintetiche mirate solo sui punti deboli |
| **Pannello Destro** | Costruzione degli appunti da zero + Pop-up AI + Merge | Ricostruzione attiva dei concetti chiave e risoluzione esercizi |
| **Fase 2 (Verifica)** | Consolidamento progressivo tra una lezione e l'altra | Drill intensivi su temi d'esame del prof, *interleaving* e **Simulazione d'Esame senza AI** |

---

## 4. Architettura e Tecnicismi

Il sistema è progettato come un **Intelligent Tutoring System (ITS) a 4 moduli** (non un semplice wrapper attorno a un system prompt):

1. **Domain Model (Modello della Materia):**
   - Indicizza i materiali del corso e costruisce il **Grafo delle Dipendenze Concettuali (DAG)** (`Materia → Moduli → Blocchi → Concetti + Prerequisiti`).
   - **Gerarchia del contesto a 3 livelli** (per evitare di saturare la finestra di contesto dell'LLM con centinaia di pagine):
     - *Tier 1 (Sempre attivo):* Obiettivo didattico, regole pedagogiche, stato dell'unità corrente.
     - *Tier 2 (Contesto Modulo):* Mappa strutturata della lezione, concetti chiave e prerequisiti.
     - *Tier 3 (Fonti di dettaglio via RAG):* Slide, PDF e trascrizioni originali recuperati puntualmente con citazione della pagina.
2. **Student Model (Modello dello Studente):**
   - Traccia per ogni concetto: stato di padronanza (*Non visto → In studio → Verificato → Consolidato*), storico delle risposte ai pop-up, lacune ricorrenti e disponibilità a calendario.
3. **Pedagogical Engine (Motore Pedagogico):**
   - Decide la profondità della spiegazione, seleziona i punti della nota su cui aprire i pop-up di domanda, blocca le risposte dirette premature (*Non-Permissive Guardrails*), riduce i suggerimenti man mano che cresce la padronanza (*Guidance Fading*) e ricalcola il piano settimanale.
4. **Interaction Layer (UI Dual-Pane):**
   - Gestisce le 5 modalità contestuali nella stessa schermata (*progressive disclosure*): `Study` (selezione a sinistra + scrittura a destra) → `Review` (pop-up AI sulle note) → `Merge` (diff inline) → `Recall / Quiz` (Fase 2) → `Exam Simulation` (senza supporto AI).

### Basi Scientifiche Integrate nel Design
- **Step-Based Tutoring (VanLehn, 2011):** Feedback sui singoli passaggi del ragionamento ($d = 0.76$, quasi pari a un tutor umano $d = 0.79$).
- **Self-Explanation & Socratic Tutoring (Bisra et al., 2018; Kestin et al., 2025):** Scrivere con parole proprie e rispondere a domande socratiche raddoppia i guadagni di apprendimento rispetto alla lezione passiva.
- **Retrieval & Interleaved Practice (Dunlosky et al., 2013; Brunmair & Richter, 2019):** Recupero attivo dalla memoria e quiz che mescolano argomenti diversi nella Fase 2.
- **Spaced Repetition / FSRS:** Pianificazione dei ripassi basata su *Difficoltà*, *Stabilità* e *Recuperabilità* delle singole lacune emerse durante il Merge.

---

## 5. Delimitazione del Prototipo (MVP) e Sviluppi Futuri

### MVP (Prototipo Iniziale per Validare il Metodo)
1. Upload di slide/PDF di un corso e suddivisione automatica in blocchi concettuali.
2. **Pannello sinistro** con spiegazione ancorata alle fonti e **pop-up su selezione del testo** (`Approfondisci` / `Poco chiaro`).
3. **Pannello destro** con editor pulito stile Obsidian per la scrittura autonoma degli appunti.
4. **Pop-up dell'AI ancorati ai punti scritti** dallo studente a fine blocco + **Merge inline** degli appunti.
5. Generazione della **Fase 2 di Quiz mirati** basati sugli errori rilevati nei pop-up.

### Sviluppi Futuri
- **Pianificazione settimanale dinamica** sincronizzata con il calendario accademico e ricalcolo automatico senza "debito punitivo" se si salta una sessione.
- **Simulazione d'esame orale** con interazione vocale e valutazione passo-passo del ragionamento.
- **Verifica formale per materie STEM** (esecuzione codice/test per Algoritmi, verifica simbolica per Matematica/Fisica).
- **Modalità inversa *"Teach the AI"* (*Protégé Effect*):** lo studente spiega l'argomento da zero a un'AI che interpreta un compagno di corso con dubbi mirati.
