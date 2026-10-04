# AI-Native Writing Environment — Product Specification

## 0. Executive Summary

L'obiettivo del prodotto è creare un ambiente di scrittura **AI-native**, orientato principalmente a scrittori generici con forte focus STEM, technical writing, tesi, report, paper, documentazione, specifiche, whitepaper e documenti professionali complessi.

Il prodotto non deve essere un editor tradizionale con una chat AI laterale.  
La filosofia centrale è:

> **Non mettere l'AI accanto al documento. Mettere l'AI dentro l'atto di scrivere e modificare.**

L'AI deve essere integrata nelle azioni native dell'editor: selezione del testo, commenti, feedback, riscritture, revisione, propagazione di modifiche, controllo delle dipendenze, gestione delle fonti, costruzione del contesto, style guide, memoria persistente e apprendimento continuo delle preferenze dell'utente.

L'interfaccia deve essere uno dei principali elementi differenzianti.  
L'utente non dovrebbe percepire l'AI come un chatbot separato, ma come un sistema operativo del documento.

Il prodotto dovrà essere:

- desktop-first;
- mobile secondario ma previsto architetturalmente;
- local-first nella prima fase;
- utilizzabile con API key dell'utente inizialmente;
- predisposto fin dall'inizio per cloud, syncing, account e abbonamenti;
- indipendente dal provider LLM;
- indipendente, per quanto possibile, dal framework editoriale scelto;
- altamente estensibile tramite nuovi tool AI;
- capace di costruire una memoria persistente del documento;
- capace di gestire modifiche che hanno effetti a lunga distanza nel testo;
- capace di imparare progressivamente dallo stile e dalle correzioni dell'utente.

---

# 1. Product Vision

## 1.1 Problema

Gli strumenti di scrittura AI attuali tendono a seguire uno schema ricorrente:

```text
Documento | Sidebar Chat AI
```

L'utente deve:

1. interrompere la scrittura;
2. passare alla chat;
3. spiegare cosa vuole cambiare;
4. descrivere il contesto;
5. leggere la risposta;
6. capire dove applicarla;
7. copiare o accettare la modifica;
8. verificare manualmente se la modifica rompe altre parti del documento.

Questo modello è funzionale, ma non è nativamente integrato nel processo di editing.

Il prodotto qui descritto vuole sostituire questo paradigma con:

```text
Documento
   ↓
Interazione diretta
   ↓
AI contestuale
   ↓
Patch controllata
   ↓
Verifica delle conseguenze
```

L'utente deve poter lavorare sul testo direttamente, senza trasformare ogni operazione in una conversazione.

---

## 1.2 Visione

Il prodotto può essere descritto come:

> **Un IDE intelligente per documenti.**

L'analogia di riferimento è quella con un IDE moderno per il codice.

Un IDE non si limita a mostrare del testo: comprende struttura, riferimenti, simboli, dipendenze, errori, warnings e possibili refactoring.

Allo stesso modo, questo prodotto dovrebbe comprendere:

- struttura del documento;
- entità;
- terminologia;
- claims;
- definizioni;
- numeri;
- decisioni;
- fonti;
- riferimenti interni;
- relazioni tra sezioni;
- dipendenze semantiche;
- stile;
- preferenze dell'autore;
- contesto del progetto.

L'obiettivo finale è passare da:

```text
AI Writer
```

a:

```text
Semantic Document IDE
```

---

# 2. Target User

## 2.1 Utente primario

Il target iniziale sono **scrittori generici con prevalenza STEM**.

Esempi:

- studenti universitari;
- tesisti;
- dottorandi;
- ricercatori;
- ingegneri;
- software engineer;
- cybersecurity analyst;
- technical writer;
- consulenti;
- analisti;
- product manager;
- architect;
- professionisti che scrivono report tecnici;
- autori di documentazione;
- persone che producono whitepaper, RFC, ADR, specifiche e documenti strutturati.

---

## 2.2 Tipologie di documento

Il sistema dovrebbe funzionare bene con:

- tesi;
- paper;
- report tecnici;
- technical documentation;
- security assessment;
- architecture document;
- design document;
- RFC;
- ADR;
- proposal;
- whitepaper;
- business report;
- email;
- memo;
- articoli;
- documenti accademici;
- documenti creativi;
- long-form writing.

La piattaforma non dovrebbe essere vincolata esclusivamente all'accademico.

---

# 3. Core Product Principles

## 3.1 AI come proprietà dell'editor

Regola di design:

> **Every recurring AI action should eventually have a native UI representation.**

Se l'utente chiede spesso:

```text
"accorcia questo"
```

deve esistere:

```text
Shorten
```

Se chiede:

```text
"rendilo più tecnico"
```

deve esistere:

```text
Technical Rewrite
```

Se chiede:

```text
"trova cosa diventa incoerente se modifico questo"
```

deve esistere:

```text
Check Related Changes
```

La chat resta disponibile come **escape hatch universale**, non come interfaccia principale.

---

## 3.2 Operazione > Prompt

L'utente dovrebbe pensare in termini di azioni:

- Rewrite;
- Shorten;
- Expand;
- Clarify;
- Naturalize;
- Add source;
- Explain;
- Simplify;
- Check consistency;
- Resolve feedback;
- Review;
- Apply related changes.

Non in termini di:

> "Parla con il chatbot e spiegagli tutto."

---

## 3.3 Controllo umano

L'AI non deve essere libera di riscrivere grandi parti del documento senza controllo.

Il sistema deve ragionare in termini di **patch**:

```text
Current document
      ↓
AI proposes changes
      ↓
User reviews
      ↓
Accept / Reject / Edit
```

La granularità della modifica deve essere evidente.

---

## 3.4 Estensibilità

Uno dei requisiti centrali è la possibilità di aggiungere facilmente nuovi tool AI.

Il sistema dovrebbe quindi avere un **Tool Registry**.

Esempio:

```text
AI Tools
├── Rewrite
├── Shorten
├── Expand
├── Naturalize
├── Formalize
├── Simplify
├── Add evidence
├── Check claim
├── Find citation
├── Explain
├── Convert tone
├── Check consistency
├── Update dependent sections
└── Custom tools
```

Ogni tool dovrebbe dichiarare:

```yaml
id: naturalize
label: Naturalize
scope:
  - selection
  - block
  - section
context_policy:
  local_context: true
  project_memory: optional
  rag: false
output:
  type: patch
```

Nuovi tool dovrebbero poter essere aggiunti senza modificare il core dell'editor.

---

# 4. Main Interaction Model

## 4.1 Selection-first editing

L'interazione principale parte dalla selezione di testo.

Esempio:

```text
The proposed architecture provides a very significant improvement.
                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

L'utente seleziona e compare una UI contestuale.

```text
┌────────────────────────────────────┐
│ Rewrite | Shorten | Naturalize | ✦ │
└────────────────────────────────────┘
```

Premendo `✦`:

```text
┌────────────────────────────────────┐
│ What should change?                │
│                                    │
│ [_______________________________]  │
│                                    │
│ Style: Technical                   │
│ Context: Auto                      │
│                                    │
│ Preview        Apply               │
└────────────────────────────────────┘
```

---

## 4.2 Inline diff

La risposta non deve apparire in chat.

Deve apparire direttamente nel punto modificato.

```diff
- The proposed architecture provides a very significant improvement.
+ The proposed architecture provides a significant improvement.
```

Azioni:

```text
Accept
Reject
Edit
Regenerate
```

---

## 4.3 Animated replacement

L'esperienza visiva deve essere fluida.

Pipeline concettuale:

```text
selected text
    ↓
ghost overlay
    ↓
old content fades
    ↓
editor transaction
    ↓
new content appears
```

L'animazione non deve interferire con il DOM/editor state.

---

# 5. Persistent Feedback System

## 5.1 Feedback come oggetto persistente

Il feedback non deve necessariamente essere un prompt usa-e-getta.

Esempio:

```text
"Questo punto non è abbastanza motivato."
```

può essere memorizzato come:

```json
{
  "feedback_id": "fb_183",
  "anchor": {
    "block_id": "block_81",
    "from": 24,
    "to": 91
  },
  "instruction": "Questo punto non è abbastanza motivato.",
  "status": "open",
  "author": "user"
}
```

---

## 5.2 Risoluzione manuale o AI

UI:

```text
💬 Questo punto non è abbastanza motivato.

[Resolve manually]
[Resolve with AI]
```

L'utente mantiene il controllo.

---

## 5.3 Fonti di feedback

Il sistema deve poter avere feedback proveniente da:

```text
👤 User
✨ AI Review
📐 Style Guide
🔗 Consistency Engine
📚 Source Checker
⚠ Document Memory
```

Tutti devono poter essere rappresentati con una UI coerente.

---

# 6. AI Autonomy Modes

L'utente deve poter scegliere quanto l'AI può essere autonoma.

## 6.1 Only Suggestions

L'AI non modifica direttamente nulla.

```text
AI
↓
suggestion
↓
user review
↓
manual accept
```

Massima sicurezza.

---

## 6.2 Always Ask

L'AI può preparare modifiche multiple e operazioni complesse, ma chiede conferma prima di applicarle.

```text
AI finds 6 affected locations
↓
review
↓
Apply selected
```

Questa può essere la modalità predefinita.

---

## 6.3 Turbo Mode

L'AI può applicare automaticamente determinate categorie di modifica.

Esempio:

```text
Grammar            auto
Spelling           auto
Cross-reference    auto
Terminology        auto
Style rewrite      ask
Structural rewrite ask
Claims             ask
```

La modalità Turbo dovrebbe essere configurabile.

---

# 7. Patch Engine

## 7.1 Principio

Il modello non deve restituire il documento completo.

Deve restituire operazioni.

Esempio:

```json
{
  "patches": [
    {
      "op": "replace_text",
      "block_id": "b_1892",
      "from": 42,
      "to": 87,
      "replacement": "..."
    }
  ]
}
```

---

## 7.2 Primary e dependent patches

Quando una modifica causa effetti altrove:

```json
{
  "primary_patch": {
    "block_id": "b_1892",
    "replacement": "..."
  },
  "dependent_patches": [
    {
      "block_id": "b_18",
      "reason": "Introduction still refers to three architectures",
      "replacement": "..."
    },
    {
      "block_id": "b_412",
      "reason": "Conclusion references removed architecture",
      "replacement": "..."
    }
  ]
}
```

---

## 7.3 Conflict detection

Ogni richiesta AI deve partire da uno snapshot.

```text
revision_1842
```

Quando arriva la risposta:

```text
current revision == 1842 ?
```

Se no:

```text
Source changed
[Rebase]
[Review]
[Discard]
```

Mai applicare modifiche alla cieca.

---

# 8. Long-Distance Changes

Questa è una delle feature centrali.

## 8.1 Caso

Pagina iniziale:

```text
We compare three architectures.
```

Molto più avanti:

```text
Architecture C
```

L'utente elimina C.

Il sistema deve trovare:

```text
Introduction
Table
Figure
Methodology
Results
Conclusion
```

e determinare quali parti sono diventate incoerenti.

---

## 8.2 UI proposta

```text
✦ 6 related changes found

Introduction                ✓
Methodology                 ✓
Table 2                     ✓
Results                     ✓
Conclusion                  ✓
Figure 7 caption            !
```

L'utente può:

```text
Apply all
Review individually
Ignore
```

---

# 9. Persistent Document Memory

## 9.1 Motivazione

La context window di un LLM non deve diventare la memoria del documento.

La memoria deve essere persistente e gestita dall'applicazione.

```text
Document
   ↓
Persistent Document Memory
   ↓
Context Engine
   ↓
LLM
```

---

## 9.2 Memoria consultabile

La memoria deve essere almeno parzialmente visibile e modificabile dall'utente.

Possibile pannello:

```text
Document Knowledge

Entities             47
Claims              138
Definitions          21
Tracked numbers      34
Relationships       291
Potential issues      3
```

---

## 9.3 Structural Memory

```text
Document
├── Introduction
│   ├── Motivation
│   └── Contributions
├── Background
├── Methodology
├── Results
└── Conclusion
```

---

## 9.4 Semantic Memory

Contiene:

- entities;
- facts;
- definitions;
- claims;
- numbers;
- terminology;
- decisions;
- references.

Esempio:

```yaml
entity:
  id: qwen_38_27b
  type: model

facts:
  role: planner
  context_length: 32768
```

---

## 9.5 Dependency Memory

Relazioni:

```text
claim_184
depends_on
experiment_28

paragraph_83
references
architecture_C

table_5
summarizes
experiment_28
```

È uno dei componenti principali per le modifiche a lunga distanza.

---

## 9.6 Summary Memory

Gerarchia:

```text
block summary
section summary
chapter summary
document summary
```

L'LLM riceve il livello di dettaglio necessario.

---

## 9.7 Retrieval Memory

Ogni blocco rilevante può avere embedding.

Serve per trovare riferimenti indiretti.

Esempio:

```text
"the third approach"
```

può essere semanticamente collegato a:

```text
Architecture C
```

anche se il nome non compare esplicitamente.

---

## 9.8 Revision Memory

Il sistema deve conoscere l'evoluzione.

```text
revision 381
Architecture C active

revision 382
Architecture C removed
reason:
user removed it from experiments
```

---

# 10. Document Graph

La Document Memory deve includere un grafo semantico.

Esempio:

```text
             architecture_count = 3
                     │
            ┌────────┴─────────┐
            │                  │
        supported_by       mentioned_by
            │                  │
            ▼                  ▼
     Architecture C       Introduction
            │
      ┌─────┼─────┐
      ▼     ▼     ▼
   Results Table Figure
```

Quando cambia un nodo:

```text
Architecture C
active → removed
```

il sistema traversa il grafo e cerca i nodi potenzialmente interessati.

---

# 11. Incremental Memory Updates

Non bisogna rianalizzare l'intero documento dopo ogni modifica.

Pipeline:

```text
old block
   ↓
new block
   ↓
semantic diff
   ↓
changed entities / claims / facts
   ↓
update graph
   ↓
invalidate affected memory
   ↓
update summaries / embeddings
```

---

## 11.1 Debounce

La memoria non deve aggiornarsi ad ogni carattere.

Possibili trigger:

- 2–5 secondi di inattività;
- cambio blocco;
- salvataggio;
- AI patch applicata;
- fine sezione;
- comando manuale.

---

# 12. Document Invariants

Il documento può avere condizioni che devono restare vere.

```yaml
invariants:
  evaluated_architectures:
    count: 2
    values:
      - A
      - B

  benchmark_gpu:
    value: RTX 5090

  terminology:
    preferred:
      LLM: Large Language Model
```

Il sistema può segnalare:

```text
⚠ Document invariant potentially broken
```

Questa feature equivale concettualmente a test automatici per documenti.

---

# 13. Context Engine

Il Context Engine è uno dei componenti principali.

## 13.1 Principio

```text
LLM = reasoning engine
LLM ≠ database
```

Non bisogna inviare tutto il progetto ad ogni richiesta.

---

## 13.2 Context hierarchy

```text
Current request
      ↓
Local context
      ↓
Section context
      ↓
Document memory
      ↓
Project memory
      ↓
Retrieved knowledge
```

---

## 13.3 Context budget

Esempio:

```text
System instructions       2k
Task                      1k
Selection                 2k
Local context             3k
Document memory           4k
RAG                       8k
Style                     2k
User memory               2k
────────────────────────────
Total                    24k
```

Il budget varia in base al task.

---

## 13.4 Task-specific context

### Grammar

```text
selection
+
paragraph
+
style
```

### Rewrite section

```text
section
+
section summary
+
neighbor summaries
+
style
```

### Global consistency

```text
document summary
+
claims
+
dependency graph
+
retrieved sections
```

### Generate section

```text
outline
+
project memory
+
sources
+
previous summaries
+
style
```

---

# 14. Retrieval Architecture

Il retrieval dovrebbe combinare più strategie.

```text
                  Query
                    │
      ┌─────────────┼─────────────┐
      ▼             ▼             ▼
 semantic        lexical        graph
  search          search       traversal
      │             │             │
      └─────────────┼─────────────┘
                    ▼
                 reranker
                    │
                    ▼
              selected context
```

Non bisogna affidarsi solamente agli embeddings.

---

# 15. Progressive Context Disclosure

Per operazioni complesse l'LLM può chiedere informazioni aggiuntive.

Tools interni:

```text
search_document(query)
search_project(query)
get_section(id)
get_block(id)
get_source(id)
get_claim(id)
get_related_entities(id)
```

L'agent non riceve tutto subito.

```text
LLM
↓
needs information
↓
tool call
↓
context retrieved
↓
continue reasoning
```

---

# 16. Fast Edit vs Deep Edit

## 16.1 Fast Edit

```text
selection
+
local context
+
style
↓
one LLM call
```

Usato per:

- rewrite;
- shorten;
- grammar;
- naturalize;
- tone;
- explain.

---

## 16.2 Deep Edit

```text
selection
↓
retrieve
↓
inspect dependencies
↓
search sources
↓
plan patches
↓
verify patches
```

Usato per:

- global consistency;
- dependent changes;
- whole section rewrite;
- source checking;
- project-wide terminology;
- complex structural operations.

---

# 17. AI Tool System

Il prodotto deve essere costruito come piattaforma di tool.

Possibili categorie.

## 17.1 Text transforms

- Rewrite;
- Shorten;
- Expand;
- Simplify;
- Formalize;
- Technical rewrite;
- Academic rewrite;
- Naturalize;
- Improve clarity;
- Improve flow;
- Remove redundancy;
- Convert tense;
- Change voice.

---

## 17.2 Analysis

- Check consistency;
- Detect contradiction;
- Find unsupported claims;
- Find ambiguous terms;
- Find missing definitions;
- Check terminology;
- Check numeric consistency;
- Check cross-references;
- Check figures/tables references.

---

## 17.3 Source-aware tools

- Find citation;
- Verify claim against source;
- Suggest supporting source;
- Explain source;
- Extract relevant passages;
- Compare sources.

---

## 17.4 Structure tools

- Generate outline;
- Reorganize section;
- Split section;
- Merge sections;
- Generate transition;
- Generate conclusion;
- Update dependent sections.

---

## 17.5 Custom tools

L'utente deve poter creare tool personali.

Esempio:

```yaml
name: Rewrite like my thesis
scope: selection
style: my_thesis
memory: project
rag: current_project
output: patch
```

---

# 18. Style System

## 18.1 Style profile

Gli stili devono essere estremamente personalizzabili.

Non solamente:

```text
Academic
Professional
Friendly
```

ma vere specification.

```yaml
name: IEEE Technical Paper

purpose:
  technical research writing

tone:
  formal
  concise
  neutral

sentence_rules:
  max_average_length: 24
  avoid_rhetorical_questions: true

claims:
  require_evidence_for_quantitative_claims: true

terminology:
  prefer:
    - "results indicate"
  avoid:
    - "proves"
    - "obviously"
    - "clearly"

structure:
  - abstract
  - introduction
  - methodology
  - results
  - conclusion
```

---

## 18.2 Style creation

Possibilità:

- creare profilo da zero;
- duplicare uno stile;
- modificare stile;
- importare stile;
- esportare stile;
- generare stile da descrizione;
- generare stile da documenti di esempio.

---

## 18.3 Style from examples

L'utente carica documenti:

```text
paper1.pdf
paper2.pdf
paper3.pdf
```

Il sistema estrae:

- tono;
- lunghezza frasi;
- vocabolario;
- struttura;
- formatting;
- transizioni;
- citation behavior;
- cose da evitare;
- ritmo;
- livello di formalità.

---

## 18.4 Style Hub

Possibile marketplace/community:

```text
Academic
├── IEEE
├── ACM
├── Thesis
└── Literature Review

Professional
├── Consulting Report
├── Executive Memo
└── Technical Proposal

Developer
├── RFC
├── ADR
├── README
└── API Documentation

Creative
├── Narrative
├── Blog
└── Storytelling
```

---

# 19. Anti-AI Pattern / Naturalize System

Il prodotto può includere un tool dedicato a pattern tipici dei testi generativi.

Nome consigliato:

- Naturalize;
- De-genericize;
- Human Style Pass;
- Remove AI clichés.

Non deve essere presentato come sistema per ingannare detector AI.

---

## 19.1 Pattern detector

Può segnalare:

- transizioni ripetitive;
- "Moreover";
- "Furthermore";
- "It is important to note that";
- intensificatori generici;
- conclusioni troppo perfette;
- parallelismi ripetuti;
- struttura "not X, but Y";
- frasi tutte della stessa lunghezza;
- generic abstraction;
- over-explaining;
- semantic redundancy.

---

## 19.2 UI

```text
AI Tell

12 patterns found

████ Generic abstraction
████ Repeated transition
███  Uniform sentence rhythm
██   Over-explanation

[Review]
[Rewrite selected]
[Rewrite all]
```

---

# 20. Personal Learning System

## 20.1 Principio

L'app deve imparare il più possibile, ma in maniera controllabile.

L'utente deve poter scegliere:

- cosa imparare;
- da quali documenti;
- da quali progetti;
- quali categorie ignorare;
- se la memoria è globale o locale.

---

## 20.2 Signals

Ogni interazione produce:

```text
ACCEPT
REJECT
EDIT
```

L'evento più prezioso è:

```text
AI suggestion
↓
user correction
↓
final text
```

---

## 20.3 User Writing Profile

Esempio:

```text
Writing Profile

Tone
- technical
- concise
- neutral

Vocabulary
- prefers "significant"
- avoids "very significant"

Claims
- avoids strong causal claims

Structure
- explanation → evidence → conclusion
```

---

## 20.4 Behavioral preferences

Il sistema deve imparare non solo lo stile, ma come collaborare.

```text
Grammar             95% auto-accept
Cross references    88%
Terminology         72%
Style               51%
Structure           31%
Claims              12%
```

Questo può alimentare la modalità Turbo.

---

## 20.5 Memory scopes

Separare:

```text
USER MEMORY
PROJECT MEMORY
DOCUMENT MEMORY
STYLE MEMORY
```

Esempio:

```text
USER:
prefers concise technical prose

PROJECT:
Architecture C removed

DOCUMENT:
LLM defined as Large Language Model

STYLE:
IEEE technical tone
```

---

## 20.6 Learning settings

Possibile UI:

```text
Learning

[x] Learn from accepted AI edits
[x] Learn from manual corrections
[x] Learn terminology
[x] Learn preferred tone
[x] Learn structural preferences
[x] Learn AI autonomy preferences

Sources

[x] Current document
[x] Current project
[ ] All documents
[ ] Imported documents
```

---

# 21. Fine-Tuning Roadmap

Non partire dal fine-tuning.

Progressione:

```text
Level 0
prompt + style

Level 1
persistent preferences

Level 2
retrieve similar corrections

Level 3
automatic preference extraction

Level 4
preference optimization

Level 5
optional fine-tuning / adapters
```

Possibili dati futuri:

```text
context
instruction
AI output
final user edit
accept/reject
document type
style
```

---

# 22. RAG System

## 22.1 Sources

L'utente può aggiungere:

- PDF;
- Markdown;
- DOCX;
- TXT;
- immagini;
- webpage;
- documenti del progetto;
- note;
- reference documents.

---

## 22.2 Pipeline

```text
source
↓
extraction
↓
chunking
↓
metadata
↓
embedding
↓
index
↓
retrieval
↓
reranking
```

---

## 22.3 Scope

Il retrieval deve poter essere limitato a:

- current document;
- current project;
- selected sources;
- user knowledge base;
- global workspace.

---

# 23. New Document Workflow

Creazione guidata.

```text
Create document

Title
[________________________]

Document type
[Technical Report       ▾]

What are you writing?
[________________________]
[________________________]

Sources
[+ Add files]
[Use project knowledge]

Writing style
[Technical concise      ▾]

[Create outline]
```

---

## 23.1 Outline editing

```text
1. Introduction       ☰
2. Background         ☰
3. Architecture       ☰
4. Evaluation         ☰
5. Conclusion         ☰

[+ section]
```

Azioni:

- drag;
- delete;
- rewrite;
- regenerate;
- split;
- merge;
- add section.

---

# 24. Images and Assets

Il prodotto deve supportare:

```text
/image
```

con:

- upload;
- project library;
- screenshot;
- diagram;
- generated image;
- image description;
- OCR;
- alt text;
- caption;
- AI explanation;
- reference inside text.

---

# 25. UI Architecture

## 25.1 Main layout

```text
┌──────────────────────────────────────────────────────────────┐
│ Project                                    Sync ✓   Profile  │
├─────────────┬────────────────────────────────┬───────────────┤
│             │                                │               │
│ PROJECT     │           DOCUMENT             │ CONTEXT       │
│             │                                │               │
│ Intro       │   Main editable content        │ Sources       │
│ Methods     │                                │ Memory        │
│ Results     │                                │ Issues        │
│ Conclusion  │                                │ Outline       │
│             │                                │ Review        │
│ SOURCES     │                                │               │
│             │                                │               │
└─────────────┴────────────────────────────────┴───────────────┘
```

La colonna destra non è una chat.

---

## 25.2 Context panel

Possibili tab:

```text
Sources
Memory
Issues
Outline
Review
Styles
History
```

Deve poter sparire.

---

## 25.3 Margin intelligence

Indicatori vicino al testo:

```text
💬 feedback
✦ AI suggestion
⚠ inconsistency
↔ dependent edit
◉ source
```

---

# 26. Mobile Strategy

Mobile è secondario rispetto al desktop.

Priorità mobile:

- leggere;
- quick edit;
- commentare;
- review;
- accept/reject patch;
- voice instruction;
- aggiungere fonte;
- catturare note;
- controllare issues.

Non è necessario replicare immediatamente tutta la complessità desktop.

---

## 26.1 Mobile interaction

Su desktop:

```text
selection
↓
floating toolbar
```

Su mobile:

```text
selection
↓
toolbar sopra tastiera
```

Esempio:

```text
┌──────────────────────────────────┐
│ ✦ Rewrite │ Comment │ More      │
└──────────────────────────────────┘
████████████ KEYBOARD █████████████
```

---

# 27. Editor Engine Strategy

Non assumere automaticamente un framework.

Candidati:

```text
BlockNote
Tiptap
Lexical
```

---

## 27.1 Decision criteria

Valutare:

- desktop behavior;
- iOS keyboard;
- Android keyboard;
- selection API;
- stable ranges;
- custom inline marks;
- AI overlays;
- persistent anchors;
- diff rendering;
- custom blocks;
- 100+ page performance;
- undo/redo;
- extensibility;
- license;
- maintenance;
- portability.

---

## 27.2 Required abstraction

Il formato documento non deve essere uguale al formato dell'editor scelto.

```text
Our Document Model
        │
    Editor Adapter
        │
BlockNote/Tiptap/Lexical
```

Questo permette migrazione futura.

---

# 28. Internal Document Model

Possibile forma:

```json
{
  "id": "block_392",
  "type": "paragraph",
  "content": [],
  "annotations": [],
  "metadata": {}
}
```

Ogni blocco deve avere ID persistente.

Questo è fondamentale per:

- comments;
- patches;
- sync;
- memory;
- dependencies;
- history;
- RAG;
- mobile;
- cloud.

---

# 29. Persistent Anchors

Per selezioni persistenti:

```json
{
  "block_id": "block_392",
  "start": 12,
  "end": 27,
  "exact": "quick brown fox",
  "prefix": "The ",
  "suffix": " jumps",
  "hash": "..."
}
```

Uso:

- offsets;
- exact text;
- prefix/suffix;
- fingerprint;
- fuzzy re-anchor se necessario.

Per multi-block:

```text
anchor[]
```

---

# 30. Local-First Architecture

Prima versione:

```text
Desktop App
   │
SQLite
   │
Local assets
   │
User API Key
   │
External LLM provider
```

Nessun cloud obbligatorio.

---

## 30.1 Motivazione

Permette:

- sviluppo più semplice;
- privacy;
- costi cloud bassi;
- test rapido;
- controllo utente;
- nessun billing iniziale;
- nessuna dipendenza da account.

---

# 31. Future Cloud Architecture

Il prodotto deve essere progettato per aggiungere facilmente:

```text
Account
Subscription
Sync
Cloud storage
Hosted AI
RAG service
Shared styles
Team workspace
Web app
```

---

## 31.1 Possible architecture

```text
Clients
  │
Sync API
  │
┌───────────────┬───────────────┬────────────────┐
│               │               │                │
PostgreSQL      Object Storage  AI Service       Auth
│               │               │
documents       PDF/images      LLM Gateway
revisions                       RAG
memory                          Context Engine
styles                          embeddings
```

---

# 32. Sync

## 32.1 Initial sync model

Non partire con CRDT.

Utilizzare:

```text
revision-based sync
```

Ogni documento:

```text
revision = 1842
```

Ogni modifica:

```text
based_on_revision = 1842
```

Se server:

```text
revision = 1845
```

allora:

```text
conflict
```

---

## 32.2 Future collaboration

Solo in una fase futura:

- WebSocket;
- presence;
- CRDT;
- Yjs/Automerge;
- realtime collaboration.

---

# 33. Version History

Ogni modifica importante deve essere tracciata.

```text
14:21 User
Changed introduction

14:24 AI
Applied 3 consistency fixes

14:31 User
Rejected conclusion patch

14:37 AI
Naturalized section 4
```

---

## 33.1 Named snapshots

```text
Before supervisor review
After supervisor review
Submitted version
Final draft
```

---

# 34. Privacy Model

Prima fase:

```text
local documents
+
user API key
```

La chiave può essere gestita in modo sicuro sul dispositivo.

Fase futura:

```text
standard cloud
private mode
local model
BYOK
hosted AI
```

---

# 35. AI Provider Abstraction

Il prodotto non deve dipendere da un modello specifico.

```text
AI Gateway
│
├── OpenAI-compatible
├── Anthropic
├── Google
├── Local model
├── Qwen
└── future providers
```

---

## 35.1 Model routing

In futuro:

```text
grammar
→ small model

rewrite
→ medium model

global consistency
→ strong model

embedding
→ embedding model

reranking
→ reranker
```

---

# 36. Multi-Model Architecture

```text
Context Engine
   │
   ├── small extraction model
   ├── embedding model
   ├── reranker
   └── strong reasoning model
```

L'LLM più costoso deve essere usato solo dove necessario.

---

# 37. Product Extensibility

La piattaforma deve consentire:

- custom AI tools;
- custom styles;
- custom commands;
- custom parsers;
- custom memory extractors;
- custom source connectors;
- custom context policies;
- custom patch processors.

Possibile futuro:

```text
Plugin SDK
```

---

# 38. Suggested Technology Direction

Questa sezione non rappresenta una decisione definitiva.

## Frontend

Possibili:

```text
React
TypeScript
Vite
```

UI:

```text
Tailwind CSS
shadcn/ui
Motion
Floating UI
Lucide
```

State:

```text
Zustand
TanStack Query
Zod
```

---

## Desktop

Possibile:

```text
Tauri
```

Vantaggi:

- desktop packaging;
- filesystem;
- SQLite;
- secure credentials;
- native integration;
- possibilità futura mobile.

---

## Backend futuro

Possibile:

```text
Python
FastAPI
PostgreSQL
pgvector
Redis
S3-compatible storage
```

---

# 39. Proposed Code Architecture

```text
product/
│
├── apps/
│   ├── desktop/
│   ├── web/
│   └── mobile/
│
├── packages/
│   ├── editor/
│   ├── document-model/
│   ├── editor-adapter/
│   ├── ui/
│   ├── ai-protocol/
│   ├── ai-tools/
│   ├── patch-engine/
│   ├── context-engine/
│   ├── document-memory/
│   ├── style-engine/
│   ├── learning/
│   ├── rag/
│   ├── sync/
│   └── common/
│
└── services/
    ├── api/
    ├── ai/
    ├── sync/
    └── indexing/
```

---

# 40. Core Internal Modules

## Editor Adapter

Converte tra editor e document model.

## Patch Engine

Applica operazioni strutturate.

## Context Engine

Decide quali informazioni inviare al modello.

## Document Memory

Mantiene la rappresentazione semantica persistente.

## Retrieval Engine

Trova contesto rilevante.

## Style Engine

Gestisce style specification.

## Learning Engine

Estrae preferenze dalle correzioni.

## Dependency Engine

Determina quali parti possono essere influenzate da una modifica.

## AI Tool Registry

Gestisce tool estensibili.

---

# 41. Suggested LLM Pipeline

```text
USER ACTION
     ↓
Task Classification
     ↓
Context Policy
     ↓
Context Engine
     ↓
Retrieval
     ↓
Reranking
     ↓
Planner
     ↓
Patch Generator
     ↓
Verifier
     ↓
Patch Engine
     ↓
User Review
```

---

# 42. Deep Consistency Pipeline

Caso:

```text
Remove Architecture C
```

Pipeline:

```text
USER EDIT
↓
semantic diff
↓
Memory Updater
↓
changed fact detected
↓
Dependency Graph
↓
Graph retrieval
↓
Semantic retrieval
↓
Lexical retrieval
↓
Rerank
↓
LLM verification
↓
dependent patches
```

---

# 43. Product Differentiation

Il prodotto non deve competere principalmente su:

- chatbot;
- autocomplete;
- generic rewrite;
- tone selector.

Queste feature sono commodity.

Le principali differenziazioni possono essere:

1. AI embedded nell'interazione;
2. persistent editorial feedback;
3. dependency-aware editing;
4. controlled multi-location patches;
5. document semantic memory;
6. user learning;
7. highly customizable styles;
8. extensible AI tool system;
9. explainable document intelligence;
10. local-first architecture.

---

# 44. Key Product Statement

Possibile formulazione:

> **An intelligent document editor that understands the relationships inside your writing. Change one thing, and it finds what else should change with it.**

Principio interno:

> **Don't put AI next to the document. Put AI inside the act of editing.**

---

# 45. MVP Philosophy

L'obiettivo finale include praticamente tutte le feature discusse.

Tuttavia, per ridurre il rischio tecnico, lo sviluppo deve essere sequenziale.

Non significa eliminare feature dal prodotto finale.

Significa costruire vertical slice complete in ordine strategico.

---

# 46. Development Roadmap

## Phase 0 — Editor Benchmark

Prototipi:

```text
BlockNote
Tiptap
Lexical
```

Test:

```text
type
select
anchor
AI popover
replace
undo
mobile
long document
```

Decisione finale sull'editor dopo benchmark reale.

---

## Phase 1 — Core Editing

- document model;
- persistent block IDs;
- editor adapter;
- selection;
- floating AI toolbar;
- rewrite;
- streaming;
- inline diff;
- accept/reject;
- undo;
- animations.

---

## Phase 2 — Feedback

- persistent comments;
- feedback anchors;
- resolve manually;
- resolve with AI;
- AI-generated review comments.

---

## Phase 3 — Patch Engine

- structured patch protocol;
- multi-patch;
- conflict detection;
- dependent patch representation;
- patch history.

---

## Phase 4 — Document Memory

- structure extraction;
- entity extraction;
- claim extraction;
- semantic diff;
- summaries;
- embeddings;
- dependency graph.

---

## Phase 5 — Context Engine

- retrieval policies;
- token budgeting;
- hybrid retrieval;
- reranking;
- task-specific context.

---

## Phase 6 — Dependent Edits

- graph traversal;
- semantic search;
- candidate detection;
- LLM verification;
- related changes UI.

---

## Phase 7 — Style System

- structured styles;
- custom styles;
- style editor;
- style extraction;
- Style Hub architecture.

---

## Phase 8 — Personal Learning

- correction logging;
- user profile;
- project memory;
- preference extraction;
- confidence;
- autonomy model.

---

## Phase 9 — RAG

- source imports;
- chunking;
- metadata;
- embeddings;
- retrieval;
- citation-aware editing.

---

## Phase 10 — New Document Workflow

- title;
- intent;
- sources;
- style;
- outline;
- drafting.

---

## Phase 11 — Assets

- images;
- OCR;
- captions;
- diagrams;
- screenshots;
- generated visual integration.

---

## Phase 12 — Sync / Cloud

- account;
- revision sync;
- cloud storage;
- hosted RAG;
- hosted AI;
- subscription.

---

## Phase 13 — Mobile

- review-focused UI;
- quick edit;
- selection actions;
- voice instruction;
- sync.

---

# 47. Product Risk Areas

## Technical

- stable text anchors;
- multi-block editing;
- document synchronization;
- semantic memory correctness;
- graph drift;
- AI hallucinated dependencies;
- latency;
- long document performance;
- mobile keyboard behavior;
- version conflicts.

---

## Product

- too many features exposed simultaneously;
- UI becoming visually noisy;
- AI actions difficult to discover;
- users not trusting automatic changes;
- memory becoming confusing;
- style system becoming too complex;
- over-automation.

---

# 48. UX Safety Principles

1. every AI modification should be reversible;
2. dependent changes must explain why they are suggested;
3. potentially destructive operations require review unless explicitly allowed;
4. history must distinguish user edits and AI edits;
5. memory facts should be inspectable;
6. AI confidence should not be presented as certainty;
7. source-related claims should expose provenance;
8. Turbo Mode must remain configurable.

---

# 49. Non-Goals for Early Development

Even though the final product is broad, initial development should avoid spending excessive effort on:

- Google Docs-level realtime collaboration;
- complex team permissions;
- enterprise admin;
- custom billing;
- fine-tuning infrastructure;
- native mobile editor parity;
- massive plugin marketplace.

These can be architecturally anticipated without blocking the core writing experience.

---

# 50. The Core Moat

Il vantaggio competitivo non dovrebbe essere:

```text
better prompt
```

o:

```text
better LLM
```

perché entrambi sono facilmente replicabili.

Il moat dovrebbe essere:

```text
Interaction Model
+
Document Memory
+
Context Engine
+
Patch Engine
+
User Learning
+
Dependency Graph
+
Accumulated user/project knowledge
```

Con il tempo:

```text
new user
≈ generic AI editor
```

ma:

```text
long-term user
=
editor
+
writing profile
+
project memory
+
document graph
+
styles
+
correction history
+
trusted automation behavior
```

Il prodotto diventa progressivamente più utile e più personale.

---

# 51. Final Product Concept

Il sistema finale può essere riassunto così:

```text
                        DOCUMENT
                           │
                           ▼
                    SMART EDITOR UI
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
         Feedback       AI Tools       Sources
             │             │             │
             └─────────────┼─────────────┘
                           ▼
                      Context Engine
                           │
          ┌────────────────┼─────────────────┐
          ▼                ▼                 ▼
   Document Memory    User Memory        RAG
          │                │                 │
          └────────────────┼─────────────────┘
                           ▼
                          LLM
                           │
                           ▼
                      Patch Engine
                           │
                ┌──────────┴──────────┐
                ▼                     ▼
           Primary Edit        Related Changes
                │                     │
                └──────────┬──────────┘
                           ▼
                       User Review
                           │
                           ▼
                        Learning
```

Il risultato desiderato non è "un Word con ChatGPT".

È un ambiente di scrittura in cui il documento stesso possiede:

- memoria;
- struttura;
- relazioni;
- contesto;
- revisioni;
- fonti;
- regole;
- stili;
- feedback;
- capacità di suggerire conseguenze di una modifica.

Il paradigma finale è:

> **Writing as a structured, contextual and continuously learning process.**
