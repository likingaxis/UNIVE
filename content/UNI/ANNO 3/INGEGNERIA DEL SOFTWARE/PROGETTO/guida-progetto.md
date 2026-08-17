# Guida operativa al progetto di Ingegneria del Software - MyAma

## Versione 1.0

Questa guida serve a spiegare **come svolgere concretamente il progetto di Ingegneria del Software su MyAma**, partendo da una situazione in cui il gruppo non ha ancora completato lo studio di tutta la teoria necessaria.

Non è la relazione finale da consegnare al professore.

È una guida interna che deve rispondere, fase per fase, a domande come:

- da dove partiamo?
- cosa dobbiamo fare concretamente?
- quali decisioni dobbiamo prendere?
- quale teoria ci serve?
- quale strumento usiamo?
- cosa produciamo?
- come capiamo se il risultato va bene?
- quell'output a cosa servirà dopo?

La guida è costruita a partire da:

- istruzioni dirette del professore;
- tre progetti reali di esempio;
- teoria del corso;
- materiale già esistente su MyAma.

---

# 0. Come usare questa guida

## 0.1 Fare il progetto e scrivere la relazione sono due cose diverse

Una delle prime fonti di confusione è pensare che l'ordine in cui compaiono le sezioni nella relazione coincida perfettamente con l'ordine in cui conviene lavorare.

Non è così.

### Processo di lavoro

Il lavoro reale può essere iterativo.

Per esempio:

```text
Use Case
    ↓
bozza del Class Diagram
    ↕
Sequence Diagram
    ↕
raffinamento delle classi
```

Un Sequence Diagram può far emergere:

- una nuova operazione;
- una nuova classe;
- una responsabilità assegnata all'oggetto sbagliato.

Quindi può obbligarci a tornare sul Class Diagram.

### Struttura della relazione

Nella relazione, invece, gli artefatti vengono presentati in modo più ordinato.

Nei progetti di esempio compare tipicamente una struttura simile a:

```text
Introduzione
Glossario
User Requirements
System Requirements
Activity Diagram
Sequence Diagram
Class Diagram Unrefined
Class Diagram Refined
Design Pattern
```

Quindi:

> l'ordine della relazione serve a presentare il lavoro;
> l'ordine operativo serve a costruirlo.

---

## 0.2 Legenda delle indicazioni

Durante la guida useremo queste etichette.

### [OBBLIGATORIO]

Richiesto direttamente dal professore.

### [PRASSI CONSOLIDATA]

Non nominato esplicitamente nelle istruzioni sintetiche, ma presente sistematicamente nei benchmark e coerente con il metodo del corso.

### [OPZIONALE]

Utile solo se il dominio o il modello lo richiedono.

### [SCELTA DEL GRUPPO]

Decisione che deve essere presa dal team.

### [DA VERIFICARE]

Punto non determinato in modo univoco dalle fonti.

---

## 0.3 Artefatti interni e artefatti da consegnare

Durante il progetto produrremo due tipi di materiali.

### [INTERNO]

Serve per lavorare meglio, ma non è necessariamente destinato alla consegna.

Esempi:

- tabella di scoping;
- lista classi candidate;
- matrice di tracciabilità;
- bozza preliminare del Class Diagram;
- registro delle decisioni.

### [DA CONSEGNARE]

È destinato alla relazione o ai sorgenti Visual Paradigm.

Esempi:

- Problem Statement;
- Glossario;
- Use Case;
- requisiti;
- Activity Diagram;
- Sequence Diagram;
- Class Diagram;
- appendice Design Pattern.

---

## 0.4 Tracciabilità

Una delle regole più importanti del progetto sarà:

> ogni artefatto deve avere una ragione per esistere.

Per evitare di creare requisiti o diagrammi scollegati, conviene assegnare ID fin dall'inizio.

Esempio:

```text
UC-CLI-01  Prenota ritiro a domicilio
RF-01      Verifica CAP
RNF-01     Tempo massimo di risposta
RD-01      Vincolo sulla zona servita
```

E mantenere una matrice interna:

| Use Case | Requisiti | Activity | Sequence | Classi principali |
|---|---|---|---|---|

Questa matrice verrà aggiornata man mano.

---

# 1. Comprendere e delimitare MyAma

**Classificazione:** [OBBLIGATORIO come attività preparatoria]

## Perché esiste

Prima di scrivere requisiti o diagrammi bisogna capire **che cosa rappresenta davvero MyAma**.

Il vecchio progetto di Basi di Dati contiene molto materiale utile, ma non va copiato automaticamente.

Serve come fonte di dominio.

## Cosa devi sapere prima

Teoria minima:

- dominio applicativo;
- stakeholder;
- confine del sistema.

Non serve ancora conoscere OOA o Design Pattern.

## Da cosa partiamo

- vecchio progetto MyAma;
- `ideaprogetto.md`;
- eventuali decisioni già prese dal gruppo.

## Dove lavoriamo

- documento Markdown condiviso;
- eventuale tabella di scoping.

## Procedimento passo per passo

### 1. Raccogliere tutte le funzionalità candidate

Dal vecchio materiale possono emergere, ad esempio:

- registrazione cliente;
- prenotazione ritiro a domicilio;
- conferimento in sede;
- scelta di data e fascia oraria;
- verifica CAP;
- gestione disponibilità;
- assegnazione lavoratori;
- assegnazione veicoli;
- caricamento foto del rifiuto;
- calcolo costo;
- storico prenotazioni;
- valutazione del servizio;
- reportistica;
- notifiche.

Non significa che debbano entrare tutte.

### 2. Creare una tabella di scope

| Funzionalità | Chi la usa? | Fonte | Centrale? | Complessità | Decisione |
|---|---|---|---|---|---|

### 3. Valutare ogni funzionalità

Chiedersi:

- serve a un attore principale?
- è coerente con l'obiettivo centrale di MyAma?
- è supportata dalle fonti?
- introduce complessità sproporzionata?

### 4. Separare nucleo e funzionalità secondarie

Esempio:

```text
Prenotazione ritiro
→ nucleo centrale.

Reportistica avanzata
→ utile, ma probabilmente secondaria.
```

## Esempio verticale - Prenota ritiro

Decidiamo che:

```text
Prenota ritiro a domicilio
```

fa certamente parte del nucleo perché rappresenta uno dei servizi centrali del dominio MyAma.

## Cosa produciamo

- [INTERNO] tabella di scope;
- [INTERNO] lista preliminare attori;
- [INTERNO] lista servizi principali.

## Questo output a cosa serve dopo?

Serve per scrivere un Problem Statement coerente e non troppo ampio.

## Errori tipici

- tenere tutto ciò che esiste nel vecchio progetto;
- aggiungere funzionalità "perché sembrano belle";
- iniziare a scegliere pattern;
- parlare già di database o architettura.

## Gate di completamento

- [ ] sappiamo qual è il servizio centrale di MyAma;
- [ ] sappiamo chi lo usa;
- [ ] abbiamo deciso cosa è dentro lo scope;
- [ ] abbiamo esplicitato almeno le principali cose fuori scope.

---

# 2. Scrivere il Problem Statement

**Classificazione:** [OBBLIGATORIO]

## Perché esiste

Il Problem Statement descrive il dominio e il problema in modo sintetico.

Non è ancora una specifica dettagliata.

Serve a costruire una visione condivisa.

## Cosa devi sapere prima

- dominio;
- stakeholder;
- requisiti ad alto livello.

## Da cosa partiamo

Output della fase precedente.

## Dove lavoriamo

Documento Markdown / relazione.

## Procedimento passo per passo

Strutturare il testo in quattro blocchi.

### 1. Contesto

Dove opera il sistema?

### 2. Problema/esigenza

Quale necessità deve supportare?

### 3. Attori principali

Chi interagisce con il sistema?

### 4. Servizi principali

Cosa dovrà permettere di fare?

## Mini-template

```text
Nel dominio [...], gli attori [...] hanno la necessità di [...].

Le principali attività comprendono [...].

Il sistema MyAma è pensato per supportare [...].

Il sistema interagirà principalmente con [...] e gestirà [...],
senza entrare in questa fase nei dettagli implementativi.
```

## Esempio verticale

Per "Prenota ritiro":

Nel Problem Statement potrebbe comparire un passaggio del tipo:

> Il cittadino deve poter richiedere il ritiro a domicilio di un rifiuto ingombrante, specificando le informazioni necessarie e scegliendo tra le disponibilità compatibili con la propria zona.

Non è ancora un requisito numerato.

## Cosa produciamo

- [DA CONSEGNARE] sezione Introduzione / Problem Statement.

## Questo output a cosa serve dopo?

Serve per:

- inizializzare il Glossario;
- identificare attori;
- identificare Use Case.

## Errori tipici

- elencare decine di requisiti;
- inserire classi;
- parlare di design pattern;
- descrivere tecnologie.

## Gate di completamento

- [ ] descrive il dominio;
- [ ] chiarisce il problema;
- [ ] introduce gli attori principali;
- [ ] descrive i servizi fondamentali;
- [ ] non contiene dettagli implementativi prematuri.

---

# 3. Inizializzare il Glossario

**Classificazione:** [PRASSI CONSOLIDATA]

## Perché esiste

Serve a evitare che lo stesso concetto venga chiamato in modi diversi.

## Cosa devi sapere prima

Nessuna teoria avanzata.

## Da cosa partiamo

Problem Statement.

## Dove lavoriamo

Documento condiviso.

## Procedimento passo per passo

### 1. Evidenziare i termini importanti

Esempio:

- Cliente;
- Ritiro;
- Conferimento;
- Sede AMA;
- Prenotazione;
- Veicolo;
- Autista.

### 2. Definirli

| Termine | Definizione |
|---|---|

### 3. Scegliere una terminologia unica

Esempio:

```text
Cliente
```

oppure

```text
Cittadino
```

Ma non alternarli senza motivo.

## Artefatto vivo

Il Glossario non viene "chiuso" qui.

Ogni volta che compare un nuovo termine importante:

- lo aggiungiamo;
- lo correggiamo;
- verifichiamo che i documenti usino lo stesso nome.

## Esempio verticale

Per "Prenota ritiro" servono almeno termini coerenti per:

- Cliente;
- Prenotazione;
- Ritiro;
- CAP;
- Rifiuto.

## Cosa produciamo

- [DA CONSEGNARE] Glossario;
- [INTERNO] convenzioni terminologiche.

## Questo output a cosa serve dopo?

Stabilizza il linguaggio usato in:

- Use Case;
- requisiti;
- classi;
- diagrammi.

## Errori tipici

- definire termini usando sinonimi non chiariti;
- introdurre termini tecnici inutili;
- dimenticare di aggiornare il Glossario.

## Gate di completamento

- [ ] i termini principali del Problem Statement sono definiti;
- [ ] non usiamo sinonimi ambigui;
- [ ] il gruppo condivide le stesse definizioni.

---

# 4. Identificare gli attori

**Classificazione:** [PRASSI CONSOLIDATA / necessaria per i Use Case]

## Perché esiste

Gli attori rappresentano chi o cosa interagisce con il sistema dall'esterno.

## Cosa devi sapere prima

- attore UML;
- stakeholder;
- confine del sistema.

## Da cosa partiamo

- Problem Statement;
- Glossario.

## Dove lavoriamo

Prima su Markdown, poi su Visual Paradigm.

## Procedimento passo per passo

### 1. Elencare persone e sistemi esterni

### 2. Per ciascuno chiedersi

- interagisce direttamente con MyAma?
- ha un obiettivo?
- avvia richieste o riceve risposte?
- è esterno al software?

### 3. Eliminare elementi interni

Tabella didattica:

| Elemento | Attore? | Possibile classe? | Perché |
|---|---|---|---|
| Cliente | sì | sì | usa il sistema e i suoi dati possono essere modellati |
| Prenotazione | no | sì | concetto del dominio |
| SPID | possibile | non necessariamente | sistema esterno |
| GestionePrenotazione | no | sì | elemento interno |

## Esempio MyAma

Candidati:

- Cliente;
- Autista AMA;
- Operatore di sede;
- eventuale Gestore operativo.

Da verificare:

- SPID;
- servizio notifiche;
- eventuale gateway di pagamento.

## Esempio verticale

Il caso "Prenota ritiro" viene attivato dal:

```text
Cliente
```

## Cosa produciamo

- [INTERNO] lista attori;
- [DA CONSEGNARE] attori nel Use Case Diagram.

## Questo output a cosa serve dopo?

Serve a chiedersi:

> cosa vuole ottenere ciascun attore?

## Errori tipici

- confondere classe e attore;
- usare come attori elementi interni;
- creare un attore per ogni ruolo minimo.

## Gate di completamento

- [ ] ogni attore è esterno;
- [ ] ogni attore ha almeno un obiettivo;
- [ ] non ci sono duplicati concettuali;
- [ ] i nomi rispettano il Glossario.

---

# 5. Identificare i Use Case

**Classificazione:** [PRASSI CONSOLIDATA]

## Perché esiste

I Use Case rappresentano gli obiettivi che gli attori vogliono raggiungere usando il sistema.

## Cosa devi sapere prima

- Use Case;
- Actor;
- System Boundary.

## Da cosa partiamo

Lista attori.

## Dove lavoriamo

- brainstorming su Markdown;
- diagramma su Visual Paradigm.

## Procedimento passo per passo

### 1. Scegliere un attore

Esempio:

```text
Cliente
```

### 2. Chiedersi cosa vuole ottenere

Non cosa clicca.

Esempio:

- prenotare un ritiro;
- prenotare un conferimento;
- vedere le prenotazioni;
- annullare una prenotazione.

### 3. Raggruppare azioni che fanno parte dello stesso obiettivo

### 4. Usare nomi verbo + oggetto

Esempio corretto:

```text
Prenota ritiro a domicilio
```

## Test di granularità

### Troppo piccolo

```text
Inserisce CAP
Seleziona data
Premi conferma
```

### Corretto

```text
Prenota ritiro a domicilio
```

## Relazioni tra Use Case

### `include`

Comportamento riutilizzato obbligatoriamente.

### `extend`

Comportamento aggiuntivo o condizionale.

### generalizzazione

Specializzazione quando realmente utile.

Non usarle solo per rendere il diagramma più complesso.

## Esempio verticale

Creiamo:

```text
UC-CLI-01 Prenota ritiro a domicilio
```

## Cosa produciamo

- [INTERNO] elenco Use Case;
- [DA CONSEGNARE] Use Case Diagram.

## Questo output a cosa serve dopo?

Ogni Use Case deve essere documentato.

## Errori tipici

- Use Case troppo granulari;
- dettagli UI;
- duplicazioni;
- relazioni UML decorative.

## Gate di completamento

- [ ] ogni Use Case ha almeno un attore;
- [ ] il nome esprime un obiettivo;
- [ ] non descrive un click;
- [ ] non duplica altri Use Case.

---

# 6. Documentare i Use Case

**Classificazione:** [PRASSI CONSOLIDATA]

## Perché esiste

Il diagramma mostra solo che un attore può attivare una funzionalità.

La scheda testuale spiega cosa succede.

## Cosa devi sapere prima

- precondizione;
- scenario principale;
- scenario alternativo;
- post-condizione.

## Da cosa partiamo

Use Case Diagram.

## Dove lavoriamo

Documento Markdown / relazione.

## Procedimento passo per passo

Per ogni Use Case:

### Attori

Chi partecipa?

### Precondizioni

Cosa deve essere vero prima?

### Passi

Qual è la sequenza normale?

### Scenario principale

Qual è l'obiettivo/esito normale?

### Scenari alternativi

Quali deviazioni importanti possono verificarsi?

### Post-condizioni

Cosa deve essere vero dopo?

## Esempio verticale

### UC-CLI-01 - Prenota ritiro a domicilio

**Attore**
- Cliente

**Precondizioni**
- Cliente autenticato;
- indirizzo disponibile nel profilo o inserito durante la procedura.

**Passi**
1. Il Cliente seleziona "ritiro a domicilio".
2. Inserisce i dati del rifiuto.
3. Il sistema verifica la zona.
4. Il sistema mostra le disponibilità.
5. Il Cliente seleziona uno slot.
6. Il sistema registra la prenotazione.

**Scenario alternativo**
- CAP non servito.

**Post-condizione**
- esiste una prenotazione registrata.

Questo esempio è didattico e potrà essere modificato.

## Cosa produciamo

- [DA CONSEGNARE] schede Use Case.

## Questo output a cosa serve dopo?

Serve per:

- derivare requisiti;
- costruire Activity;
- costruire Sequence.

## Errori tipici

- ripetere solo il nome del Use Case;
- descrivere codice;
- ignorare alternative.

## Gate di completamento

- [ ] attori presenti;
- [ ] precondizioni chiare;
- [ ] passi comprensibili;
- [ ] almeno le alternative rilevanti sono descritte;
- [ ] post-condizione chiara.

---

# 7. Derivare i System Requirements

**Classificazione:** [PRASSI CONSOLIDATA]

## Perché esiste

I Use Case descrivono obiettivi e scenari.

I System Requirements descrivono in modo più strutturato **cosa deve fare il sistema**.

## Cosa devi sapere prima

- requisiti utente;
- requisiti di sistema;
- funzionali;
- non funzionali;
- di dominio.

## Da cosa partiamo

- schede Use Case;
- Problem Statement;
- Glossario.

## Dove lavoriamo

Documento Markdown / relazione.

## Procedimento passo per passo

## 1. Prendere un Use Case

Esempio:

```text
UC-CLI-01 Prenota ritiro a domicilio
```

## 2. Estrarre le capacità del sistema

Dallo scenario emergono:

- acquisire dati del rifiuto;
- verificare zona;
- mostrare disponibilità;
- registrare prenotazione.

## 3. Trasformarle in requisiti

```text
RF-01
Il sistema deve consentire al Cliente di specificare
le informazioni necessarie sul rifiuto.

RF-02
Il sistema deve verificare che l'indirizzo indicato
appartenga a una zona servita.

RF-03
Il sistema deve mostrare al Cliente le disponibilità compatibili.

RF-04
Il sistema deve registrare una prenotazione confermata.
```

## 4. Aggiungere requisiti non funzionali

Solo se pertinenti.

Esempio:

```text
RNF-01
La ricerca delle disponibilità deve essere completata
entro una soglia definita.
```

La soglia non va inventata senza motivo.

## 5. Aggiungere requisiti di dominio

Esempio:

```text
RD-01
Un ritiro può essere prenotato solo per un CAP servito.
```

## Cosa produciamo

- [DA CONSEGNARE] requisiti funzionali;
- [DA CONSEGNARE] requisiti non funzionali;
- [DA CONSEGNARE] requisiti di dominio.

## Questo output a cosa serve dopo?

Serve per:

- verificabilità;
- OOA;
- controllo di copertura.

## Errori tipici

- copiare i Use Case parola per parola;
- formulazioni vaghe;
- numeri casuali;
- mescolare categorie.

## Gate di completamento

- [ ] ogni requisito ha ID;
- [ ] ogni requisito ha significato preciso;
- [ ] esiste una fonte o motivazione;
- [ ] non contraddice altri requisiti;
- [ ] è collegato almeno a un Use Case o vincolo di dominio.

---

# 8. Rendere verificabili i requisiti

**Classificazione:** [OBBLIGATORIO]

## Perché esiste

Il professore richiede esplicitamente la verificabilità.

Un requisito deve permettere di stabilire se è soddisfatto o meno.

## Cosa devi sapere prima

- verifica;
- validazione;
- testabilità.

## Da cosa partiamo

Requirements.

## Dove lavoriamo

Tabella requisiti / relazione.

## Procedimento passo per passo

## Caso A - Requisito funzionale

Schema:

```text
azione
→ condizione iniziale
→ risultato osservabile
```

Esempio:

```text
RF-04
Il sistema deve registrare una prenotazione confermata.
```

Verifica:

> Data una richiesta valida e confermata, deve risultare presente una prenotazione attiva associata al Cliente.

## Caso B - Requisito non funzionale

Schema:

```text
caratteristica
→ metrica
→ soglia
→ condizioni
```

Esempio:

```text
tempo di risposta
→ secondi
→ soglia
→ carico specificato
```

## Formato consigliato

| ID | Requisito | Criterio di verifica |
|---|---|---|

## Cosa produciamo

- [DA CONSEGNARE] criteri di verificabilità.

## Questo output a cosa serve dopo?

Stabilizza la specifica prima dei modelli.

## Errori tipici

- rendere tutto quantitativo inutilmente;
- usare "veloce", "sicuro", "semplice" senza criterio;
- inventare soglie arbitrarie.

## Gate di completamento

- [ ] ogni requisito importante ha un criterio;
- [ ] il criterio produce un risultato osservabile;
- [ ] i numeri usati hanno una motivazione.

---

# 9. Costruire gli Activity Diagram

**Classificazione:** [PRASSI CONSOLIDATA]

## Perché esiste

Serve a rappresentare il flusso di attività di uno scenario.

## Cosa devi sapere prima

- Activity Diagram UML;
- Initial Node;
- Action;
- Decision;
- Guard;
- Final Node.

## Da cosa partiamo

Schede Use Case.

## Dove lavoriamo

Visual Paradigm.

## Procedimento passo per passo

Trasformare la scheda Use Case.

| Use Case | Activity |
|---|---|
| inizio | Initial Node |
| passo | Action |
| condizione | Decision |
| alternativa | branch |
| fine | Final Node |

## Esempio verticale

```text
Inizio
↓
Inserimento dati rifiuto
↓
Verifica CAP
↓
[CAP servito?]
├─ no → comunica indisponibilità → fine
└─ sì → mostra disponibilità
        ↓
      scelta slot
        ↓
      conferma
        ↓
       fine
```

## Cosa produciamo

- [DA CONSEGNARE] Activity Diagram significativi.

## Questo output a cosa serve dopo?

Aiuta a chiarire:

- flussi;
- decisioni;
- alternative.

## Errori tipici

- diagramma per ogni micro-operazione;
- testo copiato senza modellazione;
- dettagli implementativi.

## Gate di completamento

- [ ] copre i flussi principali;
- [ ] alternative coerenti con i Use Case;
- [ ] guardie comprensibili;
- [ ] nessuna contraddizione con i requisiti.

---

# 10. Identificare le classi candidate

**Classificazione:** [PRASSI CONSOLIDATA nell'OOA]

## Perché esiste

Serve a costruire il primo modello statico del dominio.

## Cosa devi sapere prima

- classe;
- oggetto;
- attributo;
- associazione;
- entity class.

## Da cosa partiamo

- Glossario;
- Use Case;
- requisiti.

## Dove lavoriamo

Prima Markdown, poi Visual Paradigm.

## Procedimento passo per passo

### 1. Evidenziare i sostantivi importanti

### 2. Creare lista candidati

### 3. Classificare

- rilevante;
- irrilevante;
- dubbio/fuzzy.

### 4. Per ogni candidato chiedersi

- ha identità propria?
- esistono più istanze?
- possiede più informazioni?
- ha responsabilità?

### 5. Distinguere classe e attributo

Esempio:

```text
peso
→ attributo.

Veicolo
→ classe candidata.
```

### 6. Individuare prime relazioni

## Esempio verticale

Da "Prenota ritiro" possono emergere candidati:

- Cliente;
- Prenotazione;
- Rifiuto;
- Sede;
- Veicolo.

Non significa che tutti partecipino necessariamente allo stesso modo nel modello finale.

## Cosa produciamo

- [INTERNO] lista classi candidate.

## Questo output a cosa serve dopo?

Serve per creare una prima bozza del Class Diagram.

## Errori tipici

- ogni sostantivo = classe;
- copiare lo schema del database;
- ignorare classi dubbie senza analizzarle.

## Gate di completamento

- [ ] ogni candidato è stato valutato;
- [ ] classe vs attributo motivato;
- [ ] i concetti centrali del dominio sono rappresentati.

---

# 11. Costruire la bozza del Class Diagram

**Classificazione:** [INTERNO]

## Perché esiste

Prima dei Sequence Diagram serve una prima ipotesi del modello.

Non è ancora il Class Diagram Unrefined ufficiale.

## Cosa devi sapere prima

- associazioni;
- molteplicità;
- generalizzazione;
- attributi.

## Da cosa partiamo

Lista classi candidate.

## Dove lavoriamo

Visual Paradigm.

## Procedimento passo per passo

1. inserire classi candidate rilevanti;
2. aggiungere attributi principali;
3. aggiungere associazioni evidenti;
4. definire molteplicità principali;
5. evitare operazioni inventate.

## Esempio verticale

Possibile bozza:

```text
Cliente
  |
  | 1
  | effettua
  | *
Prenotazione
  |
  | riguarda
  | 1
Rifiuto
```

È solo un esempio concettuale.

## Cosa produciamo

- [INTERNO] bozza Class Diagram.

## Questo output a cosa serve dopo?

Fornisce gli oggetti iniziali da verificare nei Sequence Diagram.

## Errori tipici

- trattarlo come definitivo;
- inserire pattern;
- riempire classi di metodi non giustificati.

## Gate di completamento

- [ ] rappresenta le principali entity;
- [ ] associazioni di base presenti;
- [ ] molteplicità principali ragionevoli.

---

# 12. Introdurre BCE

**Classificazione:** [PRASSI/METODO DEL CORSO]

## Perché esiste

Quando modelliamo le interazioni non bastano sempre le entity del dominio.

Serve distinguere responsabilità.

## Boundary

Gestisce l'interazione con l'attore.

## Control

Coordina la logica dello scenario.

## Entity

Rappresenta informazioni significative del dominio.

## Esempio didattico

```text
Cliente
↓
PrenotazioneUI <<boundary>>
↓
GestionePrenotazione <<control>>
↓
Prenotazione / Sede / Veicolo <<entity>>
```

Non è la soluzione definitiva di MyAma.

## Perché serve dopo

Aiuta a scegliere gli oggetti da inserire nei Sequence Diagram.

---

# 13. Costruire i Sequence Diagram

**Classificazione:** [PRASSI CONSOLIDATA]

## Perché esiste

Serve a capire come gli oggetti collaborano per realizzare uno scenario.

## Cosa devi sapere prima

- lifeline;
- messaggi;
- activation;
- BCE.

## Da cosa partiamo

- Use Case;
- bozza Class Diagram.

## Dove lavoriamo

Visual Paradigm.

## Procedimento passo per passo

### 1. Scegliere uno scenario

Esempio:

```text
UC-CLI-01 Prenota ritiro a domicilio
```

### 2. Inserire l'attore

Cliente.

### 3. Individuare Boundary

Chi riceve la richiesta?

### 4. Individuare Control

Chi coordina la logica?

### 5. Individuare Entity

Chi possiede le informazioni?

### 6. Trasformare i passi in responsabilità

### 7. Assegnare i messaggi

### 8. Annotare nuove operazioni

Se compare:

```text
verificaCAP()
```

bisogna capire quale classe deve possederla.

### 9. Aggiornare il Class Diagram

Regola chiave:

```text
Sequence
   ↕
Class Diagram
```

## Esempio verticale

Schema concettuale:

```text
Cliente
→ PrenotazioneUI
→ GestionePrenotazione
→ Sede/Zona
→ Prenotazione
```

## Cosa produciamo

- [DA CONSEGNARE] Sequence Diagram;
- [INTERNO] elenco operazioni/classi emerse.

## Questo output a cosa serve dopo?

Serve a consolidare il Class Diagram.

## Errori tipici

- usare oggetti senza classe;
- messaggi senza responsabilità;
- pseudo-codice;
- non aggiornare il Class Diagram.

## Gate di completamento

- [ ] ogni messaggio ha senso;
- [ ] ogni oggetto è motivato;
- [ ] operazioni emerse annotate;
- [ ] Class Diagram aggiornato se necessario.

---

# 14. Consolidare il Class Diagram Unrefined

**Classificazione:** [PRASSI CONSOLIDATA]

## Perché esiste

Nei benchmark compare sistematicamente una versione Unrefined.

La consideriamo la prima versione formalizzata e sufficientemente stabile del modello.

## Da cosa partiamo

- bozza;
- Sequence Diagram;
- lista operazioni emerse.

## Procedimento passo per passo

1. eliminare classi non necessarie;
2. aggiungere classi emerse;
3. correggere associazioni;
4. definire molteplicità;
5. aggiungere operazioni giustificate;
6. verificare naming.

## Cosa produciamo

- [DA CONSEGNARE] Class Diagram Unrefined.

## Questo output a cosa serve dopo?

Diventa la base per il raffinamento successivo.

## Gate di completamento

- [ ] supporta i principali Use Case;
- [ ] Sequence non richiedono classi mancanti;
- [ ] associazioni coerenti;
- [ ] operazioni principali giustificate.

---

# 15. Raffinare il modello

**Classificazione:** [PRASSI CONSOLIDATA / metodo]

## Perché esiste

Il modello deve diventare più preciso e coerente.

Non assumiamo una checklist ufficiale unica, perché le fonti non fissano una differenza rigida tra Unrefined e Refined.

## Possibili elementi da raffinare

- attributi;
- tipi;
- operazioni;
- parametri;
- visibilità;
- responsabilità;
- BCE;
- relazioni;
- dettagli progettuali.

## Da cosa partiamo

Class Diagram Unrefined + Sequence.

## Procedimento

Per ogni classe chiedersi:

- ha una responsabilità chiara?
- espone solo ciò che serve?
- le operazioni derivano davvero dagli scenari?
- le relazioni sono coerenti?
- esiste troppo accoppiamento?
- la logica è distribuita male?

## Cosa produciamo

- [DA CONSEGNARE secondo la prassi] Class Diagram Refined.

## Gate di completamento

- [ ] classi comprensibili;
- [ ] responsabilità coerenti;
- [ ] operazioni motivate;
- [ ] Sequence e Class concordano.

---

# 16. Individuare problemi di design

**Classificazione:** [OBBLIGATORIO come preparazione ai pattern]

## Perché esiste

I Design Pattern non devono essere scelti prima del problema.

## Cosa devi sapere prima

- coupling;
- cohesion;
- information hiding;
- pattern studiati.

## Da cosa partiamo

Class Diagram + Sequence.

## Procedimento passo per passo

Cercare problemi come:

- forte dipendenza da classi concrete;
- troppi `if` per comportamenti variabili;
- polling;
- creazione di oggetti complessa;
- estensioni dinamiche difficili;
- logica di stato dispersa.

## Esempio verticale

Se la prenotazione cambia stato e diversi soggetti devono essere notificati, potrebbe emergere un problema di notifica.

Non significa automaticamente usare Observer.

Prima va verificato.

## Cosa produciamo

- [INTERNO] lista problemi di design.

## Gate di completamento

- [ ] ogni problema è formulato chiaramente;
- [ ] è visibile nel modello;
- [ ] non stiamo partendo dal pattern.

---

# 17. Applicare almeno 2 Design Pattern

**Classificazione:** [OBBLIGATORIO]

## Perché esiste

Il professore richiede almeno due Design Pattern applicati al Class Diagram.

## Da cosa partiamo

Problemi di design.

## Procedimento problem-first

Per ogni pattern:

1. descrivere il problema;
2. indicare dove appare;
3. spiegare perché una soluzione semplice è debole;
4. scegliere il pattern;
5. mappare i ruoli del pattern sulle classi MyAma;
6. modificare il Class Diagram;
7. verificare Sequence e requisiti collegati.

## Struttura consigliata

```md
## Pattern X

### Problema
### Motivazione
### Applicazione a MyAma
### Classi coinvolte
### Modifiche al modello
```

## Esempio dai benchmark

Observer veniva usato quando era necessario notificare automaticamente interessati a cambiamenti di stato.

Factory Method veniva usato quando la creazione di oggetti concreti rischiava di accoppiare troppo il client.

Questi esempi servono a capire il ragionamento, non a decidere i pattern MyAma.

## Cosa produciamo

- [DA CONSEGNARE] appendice Design Pattern;
- [DA CONSEGNARE] modello aggiornato.

## Gate di completamento

- [ ] almeno due pattern;
- [ ] problema reale;
- [ ] ruoli chiari;
- [ ] modifica visibile nel modello;
- [ ] coerenza con gli altri artefatti.

---

# 18. Consolidare il modello finale

## Perché esiste

Il rapporto tra Refined e Design Pattern non va trattato come una sequenza rigida assoluta.

Meglio pensarlo così:

```text
Class Diagram di specifica
        ↓
raffinamento
        ↕
problemi di design
        ↕
pattern
        ↓
modello finale coerente
```

Dopo i pattern bisogna quindi ricontrollare il modello.

## Controlli

- classi aggiunte;
- responsabilità cambiate;
- operazioni;
- relazioni;
- Sequence da aggiornare;
- terminologia.

## Cosa produciamo

- [DA CONSEGNARE] versione finale coerente del Class Diagram.

---

# 19. Verificare tracciabilità e coerenza

**Classificazione:** [OBBLIGATORIO come controllo qualità]

## Perché esiste

Tutti gli artefatti devono descrivere lo stesso sistema.

## Da cosa partiamo

Tutto il progetto.

## Procedimento

Aggiornare la matrice:

| Use Case | Requisiti | Activity | Sequence | Classi |
|---|---|---|---|---|

Poi controllare:

```text
Problem Statement
↕
Glossario
↕
Use Case
↕
Requirements
↕
Activity
↕
Sequence
↕
Class Diagram
↕
Design Pattern
```

## Domande

- esiste un requisito senza motivazione?
- esiste un Use Case non supportato?
- Sequence usa classi inesistenti?
- pattern cambia il modello ma non i Sequence?
- termini incoerenti?

## Cosa produciamo

- [INTERNO] matrice finale di tracciabilità;
- [DA CONSEGNARE] artefatti corretti.

## Gate di completamento

- [ ] nessun artefatto orfano;
- [ ] naming coerente;
- [ ] requisiti coperti;
- [ ] diagrammi coerenti.

---

# 20. Preparare la consegna

**Classificazione:** [OBBLIGATORIO]

## Dove lavoriamo

- documento finale;
- Visual Paradigm;
- PDF.

## Controlli

- indice;
- numerazione;
- leggibilità diagrammi;
- font;
- riferimenti;
- sorgenti `.vpp`;
- appendice pattern;
- coerenza dei nomi.

## Output

- [DA CONSEGNARE] PDF;
- [DA CONSEGNARE] sorgenti Visual Paradigm.

---

# 21. Registro delle decisioni

Durante il progetto conviene mantenere:

| Decisione | Motivo | Artefatti da aggiornare |
|---|---|---|
| nuova classe | emersa da Sequence | Class + Sequence |
| termine rinominato | ambiguità | Glossario + requisiti |
| requisito modificato | conflitto | Use Case + Activity |

Questo documento è [INTERNO].

---

# 22. Parallelizzazione controllata

Prima di dividere il lavoro:

1. fissare Glossario;
2. fissare naming;
3. fissare ID;
4. fissare template Use Case;
5. fissare convenzioni UML.

Poi:

```text
parallelizzazione
↓
review incrociata
↓
merge
```

## Cosa può essere parallelizzato

- schede Use Case;
- Activity;
- Sequence;
- revisione requisiti.

## Cosa va rivisto insieme

- scope;
- attori;
- struttura Use Case;
- Class Diagram;
- Design Pattern;
- revisione finale.

---

# 23. Roadmap teoria -> progetto

| Teoria studiata | Attività sbloccata |
|---|---|
| dominio / stakeholder | scope, Problem Statement |
| Requirements Engineering | attori, Use Case, requisiti |
| verifica / validazione | verificabilità |
| UML Activity | Activity Diagram |
| OOA / classi | classi candidate, bozza Class Diagram |
| Sequence / BCE | interazioni e raffinamento |
| OOD | modello raffinato |
| Design Pattern | applicazione pattern |

Quindi non serve aspettare di aver finito tutto il corso.

---

# Appendice A - Esempio verticale "Prenota ritiro a domicilio"

Questa appendice mostra come una stessa funzionalità cambia forma durante il progetto.

## A.1 Dominio

Il Cliente vuole richiedere un ritiro a domicilio.

## A.2 Use Case

```text
UC-CLI-01 Prenota ritiro a domicilio
```

## A.3 Scenario

```text
1. Cliente seleziona ritiro.
2. Inserisce dati rifiuto.
3. Sistema verifica zona.
4. Sistema mostra disponibilità.
5. Cliente seleziona slot.
6. Sistema registra prenotazione.
```

## A.4 Requisiti

```text
RF-01 acquisire dati rifiuto.
RF-02 verificare zona.
RF-03 mostrare disponibilità.
RF-04 registrare prenotazione.
```

## A.5 Verificabilità

```text
RF-04:
dopo una conferma valida deve esistere
una prenotazione attiva associata al Cliente.
```

## A.6 Activity

```text
Inserimento dati
↓
Verifica CAP
↓
[servito?]
├─ no → errore
└─ sì → disponibilità → conferma
```

## A.7 Classi candidate

```text
Cliente
Prenotazione
Rifiuto
Sede
Veicolo
```

## A.8 Sequence

```text
Cliente
→ Boundary
→ Control
→ Entity
```

Durante il Sequence possono emergere operazioni come:

```text
verificaZona()
calcolaDisponibilita()
creaPrenotazione()
```

## A.9 Class Diagram

Le operazioni emerse vengono valutate e assegnate alle classi appropriate.

## A.10 Design

Solo dopo aver osservato il modello si cercano eventuali problemi progettuali.

---

# Appendice B - Checklist generale

## Dominio

- [ ] scope definito;
- [ ] attori preliminari;
- [ ] servizi centrali.

## Problem Statement

- [ ] contesto;
- [ ] problema;
- [ ] attori;
- [ ] servizi.

## Glossario

- [ ] termini principali;
- [ ] naming coerente.

## Use Case

- [ ] attori;
- [ ] obiettivi;
- [ ] diagrammi;
- [ ] schede.

## Requirements

- [ ] funzionali;
- [ ] non funzionali;
- [ ] dominio;
- [ ] verificabilità.

## OOA

- [ ] Activity;
- [ ] classi candidate;
- [ ] bozza Class;
- [ ] BCE;
- [ ] Sequence;
- [ ] Unrefined;
- [ ] raffinamento.

## Design Pattern

- [ ] problemi reali;
- [ ] almeno due pattern;
- [ ] modello aggiornato.

## Consegna

- [ ] PDF;
- [ ] sorgenti Visual Paradigm;
- [ ] revisione collettiva.

---

# Appendice C - Punti ancora non fissati rigidamente

## Numero di Activity Diagram

[SCELTA DEL GRUPPO]

Dipende dalla complessità dei flussi.

## Numero di Sequence Diagram

[SCELTA DEL GRUPPO]

Vanno coperti gli scenari significativi.

## State Diagram

[OPZIONALE]

Solo se un oggetto ha un ciclo di vita che vale la pena modellare.

## Struttura esatta della verificabilità

[SCELTA DEL GRUPPO]

Possibili forme:

- tabella;
- sottosezione;
- criterio associato a ogni requisito.

## Differenza operativa completa Unrefined / Refined

[DA VERIFICARE durante lo studio]

I benchmark mostrano entrambi, ma non imponiamo una checklist artificiale non supportata in modo univoco dalle fonti.

---

# Stato della guida

Questa versione 1.0 è pensata per essere utilizzata come **manuale operativo interno**.

Il suo obiettivo non è soltanto elencare gli artefatti, ma rendere visibili le trasformazioni:

```text
dominio
→ obiettivi
→ Use Case
→ requisiti
→ flussi
→ interazioni
→ classi
→ problemi di design
→ pattern
```

Il principio guida rimane:

> ogni output deve avere una ragione per esistere e deve alimentare esplicitamente una fase successiva.
