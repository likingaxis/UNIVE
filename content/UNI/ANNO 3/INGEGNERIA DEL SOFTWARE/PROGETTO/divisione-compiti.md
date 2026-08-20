# Divisione dei compiti — Progetto MyAma

## Scopo di questo documento

Questo file serve a organizzare il lavoro del gruppo di cinque persone sul progetto MyAma.

I membri vengono indicati con:

- **A**
- **B**
- **C**
- **D**
- **E**

I nomi reali potranno essere assegnati successivamente.

La divisione non è pensata come una spartizione rigida del progetto in cinque parti indipendenti.

Il progetto è troppo collegato internamente per funzionare bene in questo modo.

La logica scelta è invece:

> dividere il lavoro quando è possibile lavorare in parallelo senza perdere coerenza, e tornare a lavorare insieme nei momenti in cui una decisione influenza tutto il progetto.

Per questo i gruppi cambiano da una fase all'altra.

In generale useremo soprattutto:

- lavoro tutti insieme per le decisioni che condizionano l'intero progetto;
- coppie quando un'attività può essere divisa per attore, scenario o blocco;
- gruppi da tre quando serve più confronto;
- review comune quando bisogna riallineare i risultati;
- più sorgenti Visual Paradigm quando questo facilita il lavoro parallelo, mantenendo però convenzioni e modelli coerenti.

---

# Principio generale

La divisione dei compiti segue direttamente la struttura della `guida-operativa.md`.

Quindi il progetto procede così:

```text
Problem Statement
↓
Glossario
↓
Attori
↓
Use Case
↓
System Requirements
↓
Verificabilità
↓
Activity Diagram
↓
Sequence Diagram
↓
Class Diagram
↓
Design Pattern
↓
Review finale
```

Non conviene assegnare una persona diversa a ogni blocco.

Per esempio:

```text
A → Use Case
B → Requirements
C → Activity
D → Sequence
E → Class Diagram
```

sarebbe una divisione poco efficace, perché ogni fase dipende fortemente da quella precedente.

Meglio invece lavorare **orizzontalmente**, suddividendo attività parallele all'interno della stessa fase.

---

# Fase 0 — Allineamento iniziale

## Obiettivo

Assicurarsi che tutti e cinque abbiano la stessa idea di MyAma e conoscano il percorso generale del progetto.

## Lavoro

### Tutti insieme

- leggere `idea.md`;
- leggere `guida-progetto.md`;
- leggere almeno una volta `guida-operativa.md`;
- chiarire eventuali dubbi;
- concordare le convenzioni principali.

## Decisioni da prendere insieme

- nomi degli attori;
- termini principali;
- scope del progetto;
- struttura dei file;
- convenzione per ID dei Use Case;
- convenzione per ID dei requisiti;
- organizzazione dei file Visual Paradigm.

## Output

- idea condivisa;
- convenzioni comuni;
- struttura iniziale del progetto.

## Review

Non serve una review separata: questa fase è già svolta tutti insieme.

---

# Fase 1 — Problem Statement

Questa parte conviene farla quasi completamente insieme.

Il Problem Statement condiziona tutto ciò che verrà dopo.

Se cinque persone partono da cinque interpretazioni diverse del sistema, anche Use Case e requisiti divergeranno.

## Divisione consigliata

### Gruppo da 3 — A, B, C

Prima bozza di:

- contesto;
- problema;
- obiettivi del sistema;
- utenti;

### Coppia — D, E

Controllo parallelo su:

- scope;
- funzionalità da includere;
- funzionalità da lasciare fuori;
- coerenza con `idea.md`.

## Merge

A, B, C producono la bozza.

D ed E la revisionano.

Poi:

### Tutti insieme

- discutono le modifiche;
- approvano il Problem Statement definitivo.

## Perché questa divisione

Scrivere in cinque contemporaneamente la stessa introduzione sarebbe poco efficiente.

Meglio:

```text
3 scrivono
+
2 revisionano
↓
5 decidono
```

---

# Fase 2 — Glossario

Il Glossario può essere preparato rapidamente in parallelo, ma deve poi essere approvato insieme.

## Divisione consigliata

### Coppia — A, B

Estrae termini da:

- `idea.md`;
- Problem Statement;
- vecchio progetto MyAma.

### Coppia — C, D

Controlla:

- sinonimi;
- termini ambigui;
- ruoli;
- concetti operativi.

### E

Riunisce i termini in una prima tabella unica.

## Review

### Tutti insieme

Controllano soprattutto termini come:

- Cliente / Cittadino;
- Sede AMA / Centro di Raccolta;
- Ritiro;
- Conferimento;
- Prenotazione;
- Autista;
- Operatore di sede;
- eventuale Gestore.

## Nota

Il Glossario non viene chiuso definitivamente.

Da questo momento in poi può essere aggiornato durante tutto il progetto.

---

# Fase 3 — Attori e primo elenco dei Use Case

Questa è una fase importante e conviene farla quasi interamente insieme.

Prima di dividere i Use Case, infatti, bisogna essere d'accordo su **quali Use Case esistono**.

## Tutti insieme

1. confermare gli attori;
2. prendere un attore alla volta;
3. elencare gli obiettivi dell'attore;
4. trasformare gli obiettivi in candidati Use Case;
5. eliminare:
   - duplicati;
   - micro-azioni;
   - funzionalità fuori scope.

## Output

Una tabella iniziale come:

| ID | Attore | Use Case |
|---|---|---|
| UC-CLI-01 | Cliente | Prenota ritiro |
| UC-CLI-02 | Cliente | Prenota conferimento |
| UC-AUT-01 | Autista | Visualizza ritiri assegnati |
| ... | ... | ... |

## Perché insieme

Se questa fase venisse divisa subito:

```text
A-B → Cliente
C-D → Autista
E → Operatore
```

potremmo creare sovrapposizioni e differenze di granularità.

Prima bisogna definire insieme il livello corretto.

---

# Fase 4 — Primo Use Case campione

Prima di parallelizzare davvero, conviene scrivere **uno o due Use Case tutti insieme**.

## Tutti insieme

Scegliere per esempio:

```text
UC-CLI-01 — Prenota ritiro a domicilio
```

e costruire:

- diagramma;
- attori;
- precondizioni;
- passi;
- scenario principale;
- scenari alternativi;
- post-condizioni.

## Obiettivo reale

Non serve soltanto a completare quel Use Case.

Serve a creare lo **standard del gruppo**.

Dopo questa fase tutti devono sapere:

- quanto dettagliamo i passi;
- come scriviamo gli scenari alternativi;
- quali termini usiamo;
- che formato hanno le schede.

Solo a questo punto ha senso dividere il lavoro.

---

# Fase 5 — Completamento dei Use Case

Qui il lavoro può diventare realmente parallelo.

La divisione va fatta **per blocchi coerenti**, non casualmente.

Supponiamo, a titolo di esempio, che gli Use Case principali siano divisi tra:

- Cliente;
- Autista;
- Operatore di sede;
- Gestore.

## Divisione consigliata

### Coppia 1 — A, B

Use Case del **Cliente**.

È probabilmente il blocco più ampio.

### Coppia 2 — C, D

Use Case di:

- Autista;
- Operatore di sede.

### E

Use Case del:

- Gestore / Responsabile operativo;

oppure, se questo blocco è troppo piccolo:

- supporto alla coppia con più lavoro;
- controllo di coerenza;
- gestione del documento complessivo.

## Regola importante

E non deve diventare automaticamente "il revisore che lavora meno".

Se il blocco assegnato è piccolo, E deve assorbire parte del lavoro della coppia più carica.

La divisione deve rimanere equilibrata.

---

# Review Use Case

Quando tutti hanno completato il proprio blocco:

## Prima review incrociata

```text
A-B revisionano C-D
C-D revisionano A-B
E controlla entrambi
```

Poi:

## Review tutti insieme

Controllare:

- nomi;
- granularità;
- scenari;
- precondizioni;
- post-condizioni;
- eventuali duplicati;
- coerenza del diagramma generale.

Solo dopo la review i Use Case vengono considerati abbastanza stabili da produrre i requisiti.

---

# Fase 6 — System Requirements

Ora possiamo partire dai Use Case consolidati.

Questa parte può essere nuovamente parallelizzata.

La cosa più utile è mantenere, almeno inizialmente, una certa continuità con i Use Case appena analizzati.

## Divisione consigliata

### A, B

Derivano i requisiti dai Use Case del Cliente.

### C, D

Derivano i requisiti dai Use Case di Autista e Operatore.

### E

Lavora su:

- requisiti trasversali;
- regole di dominio;
- eventuali requisiti del Gestore.

## Poi

Le tre parti vengono unite.

---

# Review Requirements

### Gruppo da 3 — A, C, E

Controlla:

- duplicati;
- formulazioni;
- copertura funzionale.

### Coppia — B, D

Controlla:

- classificazione tra:
  - funzionali;
  - non funzionali;
  - dominio;
- eventuali requisiti vaghi.

Poi:

### Tutti insieme

approvano la versione consolidata.

---

# Fase 7 — Verificabilità

La verificabilità è trasversale ai requisiti, quindi conviene lavorare in piccoli gruppi ma fare una review comune.

## Divisione consigliata

### A, C

Requisiti funzionali.

### B, D

Requisiti non funzionali.

### E

Requisiti di dominio + controllo generale.

## Procedimento

Per ogni requisito chiedersi:

```text
Qual è la condizione iniziale?
↓
Quale azione/comportamento osserviamo?
↓
Quale risultato deve verificarsi?
```

Per i non funzionali:

```text
Quale caratteristica misuriamo?
↓
Con quale metrica?
↓
Con quale soglia?
```

## Review

### Tutti insieme

Controllano soprattutto che nessun requisito importante rimanga impossibile da verificare.

---

# Fase 8 — Activity Diagram

Questa è una fase molto adatta al lavoro in parallelo.

Il lavoro può essere diviso per scenari.

## Prima decisione comune

### Tutti insieme

Decidono:

- quali processi meritano un Activity Diagram;
- quanti diagrammi sono necessari;
- convenzioni grafiche.

## Divisione possibile

### Coppia — A, B

Activity relativi ai principali flussi del Cliente.

### Coppia — C, D

Activity relativi ai flussi operativi AMA.

### E

Activity rimanenti oppure supporto alla coppia più carica.

## Visual Paradigm

In questa fase i gruppi possono lavorare anche su `.vpp` diversi.

Una possibile organizzazione è:

```text
CLIENTE.vpp
→ Activity del Cliente

OPERATORI.vpp
→ Activity di Autista / Operatore di sede
```

oppure, se conviene separarli ulteriormente:

```text
AUTISTA.vpp
OPERATORE-SEDE.vpp
```

Non serve quindi fondere necessariamente tutti i diagrammi in un unico file.

La cosa importante è che:

- vengano usate le stesse convenzioni;
- i diagrammi facciano riferimento agli stessi Use Case;
- i nomi degli attori siano coerenti;
- durante la review comune vengano risolte eventuali differenze.

---

# Review Activity

### Review incrociata

```text
A-B controllano C-D
C-D controllano A-B
E controlla il collegamento con i Use Case
```

Poi tutti insieme verificano che i diagrammi non introducano comportamenti non previsti.

---

# Fase 9 — Classi candidate e primo Class Diagram

Questa parte è più delicata.

Non conviene dividere cinque persone su cinque pezzi del Class Diagram, perché il risultato deve essere un **modello unico**.

## Divisione consigliata

### Gruppo da 3 — A, C, E

Costruisce la prima proposta di:

- classi candidate;
- attributi principali;
- relazioni;
- generalizzazioni.

### Coppia — B, D

Lavora parallelamente come gruppo critico:

- cerca classi mancanti;
- segnala classi che sembrano attributi;
- confronta il modello con Use Case e requisiti;
- controlla che non si stia copiando semplicemente il database precedente.

## Review

### Tutti insieme

Si discute il modello.

Questa review è importante: il risultato sarà la base dei Sequence Diagram.

---

# Fase 10 — Sequence Diagram

Questa fase è di nuovo molto parallelizzabile.

## Prima decisione comune

### Tutti insieme

Scelgono:

- quali Use Case/scenari richiedono Sequence;
- convenzioni BCE;
- stile dei messaggi;
- livello di dettaglio.

Poi si divide.

## Divisione consigliata

### Coppia — A, D

Sequence del blocco Cliente 1.

### Coppia — B, E

Sequence del blocco Cliente 2 / altri scenari importanti.

### C

Sequence degli scenari operativi AMA.

Se il lavoro assegnato a C è troppo grande:

```text
A-D → gruppo scenari 1
B-E → gruppo scenari 2
C → coordina + sviluppa scenari rimanenti
```

oppure si riassegnano i diagrammi in modo più equilibrato.

La divisione concreta va fatta quando conosceremo il numero effettivo dei Sequence.

---

# Fase 11 — Integrazione Sequence → Class Diagram

Questa fase deve essere fatta insieme.

I Sequence possono anche trovarsi in `.vpp` diversi. Non è necessario fonderli fisicamente in un unico file.

Ogni gruppo presenta i Sequence realizzati e, per ciascuno, segnala:

- nuove classi emerse;
- nuove operazioni;
- responsabilità;
- problemi nel modello precedente.

## Tutti insieme

Aggiornano il Class Diagram.

La logica deve essere:

```text
Sequence
↓
informazione nuova
↓
discussione
↓
aggiornamento del modello comune
```

Non:

```text
ogni gruppo modifica il Class Diagram comune per conto proprio
```

senza coordinamento.

Il punto di convergenza è quindi il **Class Diagram condiviso**, non necessariamente un unico `.vpp` contenente tutti i Sequence.

---

# Fase 12 — Class Diagram Unrefined

Ora il modello può essere consolidato.

È sensato conservare questo modello in un sorgente dedicato, ad esempio:

```text
CLASSE-UNREFINED.vpp
```

## Divisione consigliata

### Coppia — A, C

Lavora sul diagramma principale in Visual Paradigm.

### Coppia — B, D

Controlla sistematicamente:

- classi;
- attributi;
- associazioni;
- molteplicità;
- generalizzazioni;
- composizioni/aggregazioni.

### E

Controlla la tracciabilità rispetto a:

- Use Case;
- Sequence;
- Requirements.

## Review

### Tutti insieme

Approvano il Class Diagram Unrefined.

---

# Fase 13 — Class Diagram Refined

Anche questa parte è troppo centrale per essere completamente divisa.

Anche il Refined può essere conservato in un file dedicato, ad esempio:

```text
CLASSE-REFINED.vpp
```

## Divisione consigliata

### Gruppo da 3 — B, D, E

Produce la proposta di raffinamento:

- operazioni;
- parametri;
- visibilità;
- responsabilità;
- elementi BCE;
- relazioni da correggere.

### Coppia — A, C

Confronta continuamente il Refined con:

- Unrefined;
- Sequence Diagram;
- requisiti.

## Review

### Tutti insieme

Il gruppo discute le modifiche e consolida il diagramma.

---

# Fase 14 — Checkpoint prima dei Design Pattern

Questa fase deve essere tutti insieme.

Non si scelgono ancora i pattern.

Si controlla il Class Diagram e si cercano **problemi progettuali**.

Ognuno può proporre problemi, ma la lista finale deve essere condivisa.

## Tutti insieme

Costruire una tabella:

| Problema | Dove emerge | Possibili conseguenze |
|---|---|---|

Esempi di domande:

- una classe ha troppe responsabilità?
- un comportamento potrebbe cambiare?
- ci sono molti oggetti da notificare?
- la creazione di alcuni oggetti è troppo accoppiata?
- alcuni stati cambiano molto il comportamento?

---

# Fase 15 — Design Pattern

Qui è molto naturale lavorare in coppie.

Il professore richiede almeno due pattern.

I modelli relativi ai pattern possono essere raccolti in un sorgente dedicato, ad esempio:

```text
DESIGN-PATTERNS.vpp
```

## Prima decisione

### Tutti insieme

Scelgono almeno due problemi di design reali.

Poi si dividono.

## Divisione consigliata

### Coppia — A, B

Analizza e applica il **Pattern 1**.

### Coppia — C, D

Analizza e applica il **Pattern 2**.

### E

Lavora come terzo punto di vista:

- confronta entrambe le soluzioni con il Class Diagram;
- verifica eventuali conflitti;
- può esplorare un terzo pattern candidato se utile;
- aiuta la coppia con il pattern più complesso.

## Ogni coppia deve produrre

- problema;
- motivo della scelta;
- ruoli del pattern;
- applicazione a MyAma;
- modifica proposta al diagramma;
- eventuali Sequence da aggiornare.

---

# Review Design Pattern

Prima:

```text
A-B presentano Pattern 1
C-D presentano Pattern 2
E presenta osservazioni
```

Poi:

### Tutti insieme

decidono:

- se i pattern sono realmente appropriati;
- se vanno modificati;
- come integrarli nel modello comune.

---

# Fase 16 — Aggiornamento dei diagrammi dopo i Pattern

Dopo l'approvazione bisogna applicare le modifiche.

## Divisione consigliata

### Coppia — A, C

Aggiorna il Class Diagram di riferimento.

### Coppia — B, D

Aggiorna i Sequence interessati nei rispettivi `.vpp`.

### E

Controlla che la spiegazione testuale dei pattern corrisponda ai diagrammi e che i diversi sorgenti restino coerenti.

## Review

Tutti insieme verificano il modello risultante.

---

# Fase 17 — Revisione completa della specifica

Questa fase non va delegata a una sola persona.

Possiamo però dividere il controllo e poi riunire i risultati.

## Primo passaggio

### Coppia — A, B

Controlla:

```text
Problem Statement
→ Glossario
→ Use Case
```

### Coppia — C, D

Controlla:

```text
Requirements
→ verificabilità
→ Activity
```

### E

Controlla:

```text
Sequence
→ Class Diagram
→ Design Pattern
```

---

# Secondo passaggio — Review incrociata

Cambiamo le responsabilità.

Per esempio:

```text
A, C
→ controllano Class Diagram + Pattern

B, E
→ controllano Use Case + Requirements

D
→ controllo trasversale nomenclatura e riferimenti
```

Questo evita che una persona valuti soltanto il lavoro che ha prodotto.

---

# Fase 18 — Review finale tutti insieme

Prima di considerare il progetto terminato, tutti e cinque devono fare almeno una lettura complessiva.

Bisogna controllare:

- stessa terminologia ovunque;
- stessi attori;
- stessi nomi dei Use Case;
- ID coerenti;
- requisiti coperti;
- diagrammi aggiornati;
- Pattern coerenti;
- nessuna vecchia versione rimasta nel documento;
- nessuna funzione comparsa senza essere stata introdotta.

---

# Fase 19 — Preparazione della consegna

Il professore richiede:

- documento di specifica;
- archivio con i sorgenti Visual Paradigm.

## Divisione consigliata

### A, B

Controllano:

- documento finale;
- impaginazione;
- indice;
- immagini;
- riferimenti.

### C, D

Controllano:

- tutti i file Visual Paradigm;
- diagrammi;
- nomi;
- coerenza tra i diversi `.vpp`;
- completezza dei sorgenti.

### E

Fa il controllo finale dell'archivio di consegna:

- file presenti;
- nomi corretti;
- versione corretta;
- niente file temporanei inutili.

## Ultimo controllo

### Tutti insieme

Approvano la versione che verrà consegnata.

---

# Schema riassuntivo

| Fase | Modalità consigliata |
|---|---|
| Allineamento | tutti |
| Problem Statement | 3 scrivono + 2 revisionano + tutti approvano |
| Glossario | 2 + 2 + 1 → review tutti |
| Attori | tutti |
| Use Case campione | tutti |
| Use Case completi | 2 + 2 + 1 → review |
| Requirements | 2 + 2 + 1 → review |
| Verificabilità | 2 + 2 + 1 → review |
| Activity | 2 + 2 + 1 → review |
| Classi candidate | 3 + 2 → review |
| Sequence | 2 + 2 + 1 → review e integrazione comune |
| Unrefined | 2 + 2 + 1 → review |
| Refined | 3 + 2 → review |
| Problemi di design | tutti |
| Pattern | 2 + 2 + 1 → review |
| Aggiornamento post-pattern | 2 + 2 + 1 → review |
| Revisione finale | controlli divisi + tutti |
| Consegna | 2 + 2 + 1 → tutti approvano |

---

# Come assegnare concretamente A, B, C, D, E

Le lettere non rappresentano ruoli permanenti.

Non esiste:

```text
A = requisiti
B = UML
C = scrittura
...
```

I gruppi cambiano volutamente.

Questo permette di:

- distribuire meglio il lavoro;
- evitare che solo una persona conosca una parte;
- far controllare il lavoro da persone diverse;
- non dipendere troppo dalle competenze iniziali, che ancora non conosciamo.

Quando avremo capito chi è più bravo o più veloce in alcune attività, potremo adattare le assegnazioni senza cambiare la struttura generale.

---

# Come organizzare il lavoro con Visual Paradigm

Non è necessario imporre un unico file `.vpp` per tutto il progetto.

Dai materiali di un progetto precedente sappiamo che è possibile organizzare i sorgenti in più file distinti, per esempio:

```text
CLIENTE.vpp
UTENTE.vpp
SERVIZIO.vpp
AMMINISTRAZIONE.vpp

CLASSE UNREFINED.vpp
CLASSE REFINED.vpp
DESIGNPATTERNS.vpp
```

Per MyAma potremmo adottare una logica simile, adattandola ai nostri attori e alle nostre aree.

Per esempio:

```text
CLIENTE.vpp
AUTISTA.vpp
OPERATORE-SEDE.vpp
GESTIONE.vpp

CLASSE-UNREFINED.vpp
CLASSE-REFINED.vpp
DESIGN-PATTERNS.vpp
```

Questa struttura non è obbligatoria.

Il principio è:

> se due gruppi possono lavorare su diagrammi indipendenti, è meglio permettere loro di lavorare su sorgenti separati invece di costringerli a modificare continuamente lo stesso `.vpp`.

I file per attore/area possono contenere, quando ha senso:

- Use Case Diagram;
- Activity Diagram;
- Sequence Diagram.

I file trasversali possono invece raccogliere:

- Class Diagram Unrefined;
- Class Diagram Refined;
- modelli relativi ai Design Pattern.

## Cosa significa fare "merge"

Nel nostro workflow il merge non significa necessariamente:

```text
più .vpp
↓
un solo .vpp
```

Può significare soprattutto:

```text
più lavori paralleli
↓
review comune
↓
allineamento delle decisioni
↓
aggiornamento dei modelli trasversali
```

Quindi, per esempio:

```text
CLIENTE.vpp
        \
AUTISTA.vpp
         \
          → REVIEW COMUNE
         /
OPERATORE-SEDE.vpp
        /
↓
informazioni emerse
↓
CLASSE-UNREFINED.vpp
```

I file separati possono continuare a esistere.

La cosa importante è che descrivano tutti lo stesso sistema.

## Regole minime

Qualunque organizzazione scegliamo:

- stessi nomi degli attori;
- stessi ID dei Use Case;
- stessa terminologia;
- stessi nomi delle classi quando compaiono in più diagrammi;
- nessun diagramma basato su una versione vecchia del modello;
- review comune dopo ogni blocco importante.

Alla consegna dobbiamo semplicemente avere un **archivio ordinato e coerente dei sorgenti Visual Paradigm**.

# Regola semplice per decidere se dividere un lavoro

Durante il progetto incontreremo situazioni non previste da questo documento.

Possiamo decidere rapidamente usando tre domande.

## 1. Due gruppi possono lavorare senza modificare la stessa decisione?

Se sì:

> dividiamo.

## 2. Il risultato di un gruppo serve all'altro prima che possa iniziare?

Se sì:

> probabilmente non ha senso parallelizzare ancora.

## 3. Le due parti devono convergere in un unico modello?

Se sì:

> dividiamo il lavoro, ma fissiamo subito una review/merge.

In forma compatta:

```text
lavori indipendenti
→ parallelo

decisione strutturale
→ insieme

artefatti separabili ma collegati
→ coppie + review

modello unico
→ piccolo gruppo operativo + review di tutti
```

---

# Il principio più importante

La divisione non deve diventare:

> "ognuno fa il suo pezzo e alla fine uniamo i PDF."

Deve essere:

```text
decisione comune
↓
divisione del lavoro
↓
produzione parallela
↓
review incrociata
↓
integrazione / riallineamento
↓
nuova decisione comune
↓
fase successiva
```

Il progetto MyAma è un unico sistema.

La divisione dei compiti serve soltanto a costruirlo più velocemente, non a trasformarlo in cinque progetti separati.
