# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary User / Relatore:** Studente universitario del corso di laurea in Informatica presso l'Università di Roma Tor Vergata, impegnato nell'esposizione orale per il corso di Gender & Inclusion (A.A. 2025–2026).
- **Primary Audience:** Docente titolare dell'insegnamento e studenti/colleghi di informatica presenti in aula.

## Product Purpose

- Deck di presentazione accademico in 9 slide dal titolo «Donne, gaming e inclusione».
- Fornire un supporto visivo e concettuale rigoroso all'esposizione orale, collegando la cultura videoludica con l'ingegneria del software e il design dei sistemi interattivi.
- Il successo del prodotto consiste nel dimostrare efficacemente che la presenza femminile nel gaming è già un dato di fatto consolidato (~48% dei videogiocatori), mentre la piena inclusione resta compromessa da ostacoli sistemici, molestie vocali e squilibri nell'industria tecnologica.

## Positioning

- Trattazione con prospettiva esplicitamente informatica e ingegneristica («Perché parlarne da informatici?»), distinta da generiche rassegne sociologiche o aziendali.
- Tesi cardine non replicabile da prodotti generici: **«L’inclusione è un requisito di progettazione»**.
- L'analisi connette direttamente le scelte architetturali di sistema (chat vocale priva di tutele, moderazione reattiva, design degli avatar) e la composizione dei team di sviluppo (solo 20–25% nei ruoli tecnici) con le dinamiche di esclusione e invisibilità difensiva delle giocatrici.

## Operating Context

- **Ambiente d'uso:** Aula universitaria con videoproiettore a contrasto variabile; esposizione dal vivo in condizioni autonome offline.
- **Flusso operativo:** Navigazione da tastiera (Frecce, Spazio, PgUp/PgDown), supporto per note del relatore (tasto `N`), modalità a schermo intero (`F`), scorciatoia rapida di stampa (`P`).
- **Canale primario confermato:** Sorgente web HTML/CSS autonomo per browser (deliverable primario). Formati PDF 16:9 e PowerPoint modificabile (PPTX) considerati deliverable secondari/derivati.

## Capabilities and Constraints

- **Struttura fissa in 9 slide narrative:**
  1. *Copertina / Hero:* «Donne, gaming e inclusione» (apertura editoriale premium).
  2. *Informatica e design:* «Perché parlarne da informatici?» (triade concettuale: chi gioca, cosa vediamo, chi sviluppa).
  3. *Dati demografici:* «La realtà è quasi paritaria. La percezione no.» (paradosso percettivo, 48% giocatrici).
  4. *Molestie e voce:* «Quando basta una voce per diventare un bersaglio» (costo della visibilità, voice chat, strategie difensive).
  5. *Rappresentazione:* «Da contorno a soggetto» (timeline evolutiva: Peach, Lara, Aloy/Senua/Ellie, identità modulare contemporanea).
  6. *Industria:* «Quasi metà gioca. Solo un quarto sviluppa.» (gap nella forza lavoro: 48% giocatrici vs 23–25% industria vs ~20% ruoli tecnici).
  7. *Seniority e competizione:* «Il gap cresce salendo di livello» (pay gap, leadership, esports, programmi correttivi come VCT Game Changers ed ESL Impact).
  8. *Manifesto:* «Non basta essere presenti: bisogna poter partecipare» (design inclusivo, community sicure, opportunità eque).
  9. *Chiusura:* «La presenza non è ancora piena inclusione» (sintesi della tesi e fonti secondarie).
- **Vincoli tecnici:**
  - Codice statico puro HTML/CSS completamente locale e offline (zero dipendenze CDN esterne o bundler complessi).
  - Stili basati su `utilities.css` (utilità precompilate) e `final.css` (override specifici e layout rifiniti).
  - Risorse grafiche in `Assets/` e font locali in `Fonts/`.
  - Workflow per nuove superfici impostato su `comp-first` (`.impeccable/config.json`).

## Brand Commitments

- **Titolo:** «Donne, gaming e inclusione».
- **Tono e voce:** Academic Gaming Editorial: rigoroso, accademico, asciutto, analitico e intimamente legato alla cultura grafica del videogioco.
- **Divieti stilistici espliciti:** Rifiuto assoluto di estetiche "AI startup", layout a dashboard generica, sequenze di card ripetitive, glassmorphism decorativo ed enfasi cromatica immotivata.
- **Accenti cromatici semantici:**
  - *Graphite:* superficie e sfondo disciplinato.
  - *Cyan:* dati quantitativi, tecnologia, logica sistemica.
  - *Violet:* identità, cultura, rappresentazione.
  - *Coral:* attrito, divari, barriere, molestie vocali.

## Evidence on Hand

- `copione.md`: copione integrale dell'esposizione orale per ciascuna delle 9 slide (fonte primaria per contenuto e narrativa).
- `BRIEF.md` e `BRIEF_SINTESI.md`: specifiche editoriali e confini di revisione.
- `FONTI.md`: catalogo ragionato delle evidenze bibliografiche (ISFE/EGDF, IIDEA, ESA, Reach3 Insights, GDC State of the Game Industry, Bryter) con segnalazione esplicita delle metriche aperte da chiarire prima dell'esposizione finale (47,8% Europa, ≈20% ruoli tecnici, 33% pubblico esports).
- `Assets/`: archivio locale di illustrazioni, ritagli di personaggi videoludici e schermate autentiche.
- `Fonts/`: set di font locali (`Chakra Petch`, `Syne`, `Space Grotesk`, `JetBrains Mono`).

## Product Principles

1. **L'inclusione è un requisito di progettazione:** L'inclusione non è un'aggiunta morale accessoria, ma una specifica funzionale che riguarda l'architettura del software, i canali di comunicazione vocale e le meccaniche di gioco.
2. **Il rigore dei dati guida la forma:** Le affermazioni poggiano su studi empirici e statistiche reali di settore; le lacune di documentazione vengono dichiarate apertamente e mai colmate con dati inventati.
3. **Autonomia offline del deliverable web:** La visualizzazione vive in modo autosufficiente nel browser, senza dipendere da connettività o servizi terzi in aula.
4. **Composizione editoriale contro l'omologazione:** Nessun ricorso a pattern visivi standardizzati o card ripetitive; ogni slide possiede una struttura ritmata che supporta la scansione dell'attenzione del pubblico e le pause dell'oratore.

## Accessibility & Inclusion

- Progettato specificamente per videoproiezione accademica in aula: contrasti marcati per resistere a luce ambientale e proiettori degradati.
- Gerarchia tipografica ad alta leggibilità anche dai banchi posteriori dell'aula.
- Evitata la codifica semantica affidata unicamente al colore: ogni indicatore associa variazioni tipografiche, testuali o posizionali.
