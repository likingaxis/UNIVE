# AI-Native Writing Environment — Product Overview

## 1. Visione

Il progetto nasce con l'obiettivo di creare un ambiente di scrittura in cui l'intelligenza artificiale non sia un assistente separato, ma una parte naturale dell'editor.

Il modello di riferimento non è:

```text
documento + chat AI laterale
```

ma:

```text
documento intelligente
```

L'utente lavora direttamente sul testo, sui paragrafi, sulle immagini, sulle fonti e sulle note. L'AI emerge solo quando serve e nel punto esatto in cui serve.

L'obiettivo è avvicinare la scrittura a un'esperienza simile a quella di un moderno IDE: il sistema non si limita a contenere testo, ma comprende progressivamente struttura, relazioni, riferimenti, stile, fonti e intenzioni dell'autore.

---

# 2. Utenti e casi d'uso

Il prodotto è pensato principalmente per chi produce documenti lunghi o strutturati, con particolare attenzione al mondo STEM.

Esempi:

- studenti e tesisti;
- ricercatori;
- ingegneri;
- technical writer;
- analisti;
- consulenti;
- professionisti;
- autori di report, paper, documentazione e whitepaper.

Il sistema rimane comunque abbastanza generale da poter supportare anche email, articoli, documenti professionali e scrittura creativa.

---

# 3. Principio centrale dell'interfaccia

La caratteristica più importante del prodotto è l'integrazione dell'AI nell'atto stesso di scrivere.

L'utente non deve continuamente:

1. aprire una chat;
2. spiegare cosa sta guardando;
3. copiare il testo;
4. descrivere dove intervenire;
5. riportare la risposta nel documento.

Il documento stesso diventa l'interfaccia.

Una regola progettuale centrale è:

> Le operazioni AI frequenti devono diventare azioni native dell'editor, non prompt da riscrivere ogni volta.

---

# 4. Selection AI Handle

Una delle interazioni principali parte dalla normale selezione del testo.

L'utente seleziona una frase o un paragrafo e, vicino alla selezione, compare una piccola icona AI.

È sufficiente spostare leggermente il cursore verso l'icona per aprire un campo contestuale.

```text
seleziona testo
      ↓
     ✦
      ↓
"rendilo più tecnico"
      ↓
modifica proposta direttamente nel documento
```

L'interazione può offrire sia un prompt libero sia comandi rapidi come:

- Rewrite;
- Shorten;
- Expand;
- Naturalize;
- Simplify;
- Formalize;
- Explain;
- Add source;
- Check consistency.

Il risultato appare come modifica inline, con possibilità di accettare, rifiutare o correggere.

---

# 5. AI Lasso

Oltre alla selezione tradizionale, il prodotto introduce un'interazione più libera: il **Lasso AI**.

L'utente può cerchiare una zona del documento per indicare facilmente:

- più paragrafi;
- testo e figura;
- tabella e commento;
- immagine e caption;
- un'intera area visiva.

Dopo il gesto può lasciare un feedback come:

> "Questa figura e il paragrafo sotto non sono coerenti."

oppure:

> "Questa parte è troppo ridondante."

Il lasso serve quindi quando il problema non coincide con una semplice porzione lineare di testo.

Su tablet può diventare particolarmente naturale con penna o stylus.

---

# 6. Revision Mode

Una delle modalità principali del prodotto è la **Revision Mode**.

Durante una revisione l'obiettivo non è applicare ogni modifica immediatamente.

L'utente legge e accumula piccoli feedback:

```text
"troppo generico"
"serve una fonte"
"ripetitivo"
"spiegare meglio"
"claim troppo forte"
```

Questi feedback rimangono collegati ai punti corretti del documento.

L'utente può continuare a leggere senza interrompere continuamente il proprio flusso.

Alla fine della sessione:

```text
Done
↓
AI raccoglie tutti i feedback
↓
li interpreta insieme
↓
propone una revisione coerente
```

Questo permette all'AI di evitare modifiche che si contraddicono o si sovrascrivono tra loro.

La revisione può riguardare una pagina, una sezione, un capitolo o l'intero documento.

---

# 7. Voice Interaction

La voce è considerata un metodo di input importante, non soltanto una funzione di dettatura.

Sono previste più modalità:

### Dictation
La voce viene trasformata direttamente in testo.

### AI Instruction
L'utente seleziona qualcosa e dice:

> "Rendilo più sintetico ma mantieni questo dato."

L'AI propone immediatamente la modifica.

### Revision Feedback
Durante Revision Mode:

```text
selezione
↓
push-to-talk
↓
"qui serve una fonte"
↓
feedback salvato
```

### Voice Note
L'utente registra una nota da risolvere più avanti.

La combinazione di selezione, lasso e voce permette di lasciare feedback con pochissimo attrito.

---

# 8. Modifiche collegate nel documento

Una delle funzioni più importanti riguarda le modifiche che hanno conseguenze in altre parti del documento.

Esempio:

All'inizio di un report è scritto:

> "Vengono confrontate tre architetture."

Molte pagine dopo l'utente elimina la terza architettura.

Il sistema dovrebbe essere capace di individuare che potrebbero dover cambiare anche:

- introduzione;
- metodologia;
- tabelle;
- figure;
- risultati;
- conclusioni.

L'interfaccia può quindi mostrare:

```text
5 related changes found

Introduction        ✓
Table 2             ✓
Results             ✓
Conclusion          ✓
Figure caption      !
```

L'utente decide cosa applicare.

L'idea è trasformare il documento da semplice testo a insieme di informazioni collegate.

---

# 9. Document Memory

Il prodotto mantiene progressivamente una memoria del documento.

Questa memoria può comprendere:

- concetti importanti;
- definizioni;
- entità;
- decisioni;
- numeri;
- terminologia;
- affermazioni;
- relazioni tra parti del documento;
- fonti associate;
- elementi modificati o rimossi.

La memoria deve essere almeno in parte consultabile.

Esempio:

```text
Document Knowledge

Models              4
Claims             31
Definitions         8
Tracked facts      17
Potential issues    3
```

L'utente può correggere informazioni che il sistema ha interpretato male.

La memoria permette all'AI di ragionare su documenti molto lunghi senza dover rileggere tutto ogni volta.

---

# 10. Context Awareness

L'AI non riceve necessariamente l'intero documento per ogni operazione.

Il sistema decide quali informazioni sono utili in base al tipo di richiesta.

Per una correzione grammaticale possono bastare:

```text
frase
+
paragrafo
+
style guide
```

Per una revisione di coerenza possono servire:

```text
sezione
+
informazioni rilevanti del documento
+
fonti
+
parti correlate
```

Il prodotto gestisce quindi il contesto in modo dinamico e trasparente.

---

# 11. Style System

Gli stili non vengono trattati come semplici pulsanti:

```text
Academic
Professional
Friendly
```

ma come profili completamente personalizzabili.

Uno stile può definire:

- tono;
- struttura;
- lunghezza delle frasi;
- terminologia;
- livello di formalità;
- regole sulle citazioni;
- uso di figure e tabelle;
- espressioni da evitare;
- preferenze dell'autore.

È possibile:

- creare uno stile da zero;
- modificare uno stile esistente;
- duplicarlo;
- importarlo;
- esportarlo;
- generarlo partendo da una descrizione;
- generarlo partendo da documenti di esempio.

In futuro può esistere uno **Style Hub** con profili condivisi.

---

# 12. Personal Learning

Il prodotto deve imparare progressivamente come l'utente preferisce scrivere e lavorare.

Ogni volta che l'AI propone una modifica, l'utente può:

```text
Accept
Reject
Edit
```

Questi comportamenti permettono al sistema di capire progressivamente:

- stile preferito;
- terminologia;
- tono;
- tipi di modifiche normalmente accettati;
- pattern normalmente rifiutati;
- livello di autonomia desiderato.

L'utente può decidere dalle impostazioni:

- cosa il sistema può imparare;
- da quali documenti;
- da quali progetti;
- cosa deve rimanere locale a un singolo documento.

L'obiettivo non è soltanto:

> "L'AI impara come scrivo."

ma anche:

> "L'AI impara come voglio collaborare."

---

# 13. Modalità di autonomia

L'utente può scegliere quanto controllo lasciare al sistema.

## Only Suggestions

L'AI propone solamente modifiche.

## Always Ask

L'AI prepara le modifiche, ma richiede conferma prima di applicarle.

## Turbo Mode

Alcune categorie di modifiche possono essere applicate automaticamente.

Esempio:

```text
Grammar             automatic
Spelling            automatic
Cross references    automatic
Terminology         automatic
Style rewrite       ask
Structure           ask
Claims              ask
```

Il livello di autonomia può evolvere insieme all'apprendimento delle preferenze dell'utente.

---

# 14. Naturalize / Anti-Generic AI Patterns

Il prodotto può includere strumenti dedicati alla rimozione di pattern di scrittura troppo generici o tipici dei modelli generativi.

Esempi:

- transizioni ripetitive;
- formule standard;
- frasi eccessivamente uniformi;
- conclusioni generiche;
- over-explaining;
- intensificatori inutili;
- strutture troppo prevedibili.

Il sistema può evidenziare i pattern individuati e permettere una revisione mirata.

L'obiettivo non è "ingannare un detector AI", ma produrre testo meno generico e più coerente con la voce reale dell'autore.

---

# 15. Sources e RAG

L'utente può associare al progetto materiali come:

- PDF;
- paper;
- documenti;
- immagini;
- note;
- pagine web;
- file del progetto.

L'AI può utilizzare queste fonti quando serve.

Possibili azioni:

```text
Find source
Verify claim
Explain source
Use source in paragraph
Find supporting evidence
Compare sources
```

Le fonti diventano parte del contesto del progetto, non semplici allegati.

---

# 16. Creazione guidata di nuovi documenti

La creazione di un documento può partire da un workflow strutturato.

```text
Titolo
↓
Tipo di documento
↓
Descrizione dell'obiettivo
↓
Fonti disponibili
↓
Style profile
↓
Outline
↓
Scrittura
```

L'AI può proporre una struttura iniziale che l'utente può:

- riordinare;
- modificare;
- espandere;
- ridurre;
- rigenerare parzialmente.

L'obiettivo è sostituire il classico:

> "Scrivimi un report su..."

con un processo di costruzione più controllabile.

---

# 17. Immagini e contenuti non testuali

Il documento deve supportare naturalmente:

- immagini;
- diagrammi;
- screenshot;
- figure;
- tabelle;
- caption.

L'AI può:

- descrivere un'immagine;
- generare alt text;
- creare caption;
- fare OCR;
- spiegare una figura;
- verificare la coerenza tra immagine e testo;
- usare immagini come parte del contesto di una revisione.

Questo è particolarmente importante per documenti STEM.

---

# 18. Version History

Ogni modifica significativa deve essere reversibile.

La cronologia dovrebbe distinguere chiaramente:

```text
User edit
AI edit
Revision session
Consistency fix
Style pass
```

Esempio:

```text
14:21 User
Changed introduction

14:24 AI
Applied 3 consistency fixes

14:31 User
Rejected one conclusion change
```

È inoltre utile poter creare snapshot nominati:

```text
Before supervisor review
After review
Submitted version
Final draft
```

---

# 19. Local-First e Cloud

La prima versione è pensata principalmente come applicazione locale.

Il documento rimane sul dispositivo e l'utente può utilizzare le proprie API key per i modelli AI.

Questo consente:

- maggiore privacy;
- costi iniziali più bassi;
- sviluppo più semplice;
- libertà nella scelta dei modelli.

In seguito il prodotto può evolvere verso:

- account;
- cloud sync;
- storage;
- AI inclusa nell'abbonamento;
- RAG cloud;
- accesso web;
- team workspace;
- condivisione.

La transizione al cloud deve essere prevista fin dalla progettazione iniziale.

---

# 20. Desktop e Mobile

Il prodotto è **desktop-first**.

Desktop è il luogo principale per:

- scrittura lunga;
- revisione;
- documenti complessi;
- multi-section editing;
- gestione delle fonti.

Mobile è inizialmente complementare.

Le attività principali su mobile possono essere:

- leggere;
- fare quick edit;
- registrare feedback;
- usare la voce;
- approvare o rifiutare modifiche;
- aggiungere fonti;
- annotare.

Su tablet, penna + lasso + voce può diventare un'esperienza particolarmente interessante.

---

# 21. UI Generale

Una possibile struttura dell'applicazione:

```text
┌─────────────────────────────────────────────────────────────┐
│ Project                                    Sync   Profile   │
├─────────────┬──────────────────────────────┬────────────────┤
│             │                              │                │
│ PROJECT     │          DOCUMENT            │ CONTEXT        │
│             │                              │                │
│ Intro       │                              │ Sources        │
│ Methods     │                              │ Memory         │
│ Results     │                              │ Issues         │
│ Conclusion  │                              │ Outline        │
│             │                              │ Review         │
│ SOURCES     │                              │ History        │
│             │                              │                │
└─────────────┴──────────────────────────────┴────────────────┘
```

La colonna destra non è una chat permanente.

È uno spazio contestuale dedicato a:

- fonti;
- memoria;
- problemi;
- outline;
- revisione;
- storico.

Può essere nascosto completamente quando non serve.

---

# 22. Tool System

Il prodotto deve essere pensato come piattaforma estensibile.

Nuovi tool devono poter essere aggiunti facilmente.

Categorie possibili:

### Writing

- Rewrite
- Shorten
- Expand
- Simplify
- Naturalize
- Formalize

### Analysis

- Check consistency
- Find contradictions
- Check terminology
- Find unsupported claims
- Review numbers

### Sources

- Find citation
- Verify claim
- Compare sources
- Explain evidence

### Structure

- Reorganize
- Merge
- Split
- Generate transition
- Update related sections

### Personal tools

L'utente può creare strumenti personalizzati per il proprio workflow.

---

# 23. Interaction Grammar

L'intero prodotto può essere riassunto attraverso poche primitive coerenti.

```text
SELECT
→ indica precisamente il testo

LASSO
→ indica una regione o più elementi

VOICE
→ descrive velocemente il problema

REVISION
→ accumula feedback

COMMAND
→ esegue operazioni più ampie
```

Queste primitive possono essere combinate.

Esempio:

```text
LASSO
+
VOICE
+
REVISION MODE
```

significa:

> "Sto revisionando, questa zona ha un problema, e lo descrivo a voce senza interrompere la lettura."

Questa grammatica costituisce una parte centrale dell'identità del prodotto.

---

# 24. Differenziazione

Il progetto non vuole differenziarsi principalmente attraverso:

- un modello AI esclusivo;
- una context window più grande;
- una chat migliore;
- un autocomplete migliore.

Queste caratteristiche possono essere replicate rapidamente.

La differenziazione principale è invece data dalla combinazione di:

```text
Interaction Model
+
Document Memory
+
Dependent Changes
+
Revision Mode
+
Personal Learning
+
Style System
+
Context Awareness
```

Il valore sta nel modo in cui tutte queste funzioni lavorano insieme.

---

# 25. Esperienza finale desiderata

Un utente dovrebbe poter:

1. iniziare un documento partendo da obiettivo, fonti e stile;
2. scrivere normalmente;
3. selezionare una frase e modificarla con AI senza lasciare il documento;
4. cerchiare una zona con il lasso e lasciare un feedback;
5. utilizzare la voce per annotare velocemente;
6. entrare in Revision Mode e accumulare decine di micro-feedback;
7. chiedere al sistema di risolverli insieme;
8. ricevere modifiche collegate in altre parti del documento;
9. controllare ciò che l'app ha imparato sul documento;
10. accettare, rifiutare o modificare ogni proposta;
11. vedere il sistema diventare progressivamente più coerente con il proprio stile e workflow.

L'esperienza deve dare la sensazione che il documento non sia semplicemente un contenitore di testo, ma un oggetto che il software comprende progressivamente.

---

# 26. Sintesi

Il progetto può essere descritto come:

> **Un ambiente di scrittura AI-native che integra modifica, revisione, memoria, fonti e apprendimento direttamente nel documento.**

Non:

```text
Word + chatbot
```

ma:

```text
Intelligent Writing Environment
```

Il nucleo del prodotto è una nuova interazione tra autore e AI:

```text
indicare
↓
commentare
↓
ragionare
↓
proporre
↓
revisionare
↓
imparare
```

L'AI rimane dietro l'interfaccia.

Il protagonista resta il documento.
