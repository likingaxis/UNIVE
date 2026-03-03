# INTRODUZIONE ALLA SOFTWARE ENGINEERING

## 1. Cos’è la Software Engineering
La **Software Engineering** è l’applicazione sistematica dei **principi dell’ingegneria** (progettazione, validazione, controllo dei costi e della qualità) alla produzione del software, con l’obiettivo di trasformarlo da semplice programma a **prodotto industriale**.
Senza un approccio ingegneristico si verificano:
- **Scarsa qualità**
- **Cost overrun** (superamento dei costi previsti)
- **Time overrun** (superamento dei tempi previsti)
- Perdita di competitività
L’esigenza di un approccio disciplinato nasce quando si passa dallo sviluppo di piccoli programmi allo sviluppo di **prodotti software complessi**, destinati a utenti reali e a contesti organizzativi.
⚠️ Anche con un approccio ingegneristico rigoroso, la cosiddetta _crisi del software_ non è stata completamente risolta.
# IL PRODOTTO SOFTWARE
## 2. Aspetti Accidentali ed Essenziali
### Aspetti Accidentali
Sono problemi superabili con il progresso tecnologico.
Esempio principale: **Ciclo di Vita del Software**
### Aspetti Essenziali
Non dipendono dalla tecnologia e non sono eliminabili.
- **Complessità** → numero elevato di configurazioni possibili.
- **Conformità** → il software deve adattarsi all’ambiente esistente (hardware, normative, sistemi legacy).
- **Cambiabilità** → il software viene modificato nel tempo.
- **Invisibilità** → non ha proprietà fisiche osservabili come un oggetto materiale.
# CICLO DI VITA DEL SOFTWARE
## 3. Definizione
Il **Ciclo di Vita del Software** è l’intervallo di tempo che va dalla nascita dell’esigenza del prodotto fino alla sua dismissione.
È composto da **3 stadi principali**:
### 1️⃣ Sviluppo
Comprende 6 fasi (sequenziali o iterabili):
1. **Requisiti** → definizione del _cosa_ deve fare il software.
2. **Specifiche (analisi dei requisiti)** → dettaglio formale dei requisiti.
3. **Pianificazione**
4. **Progetto**
    - Preliminare (architetturale)    
    - Dettagliato    
5. **Codifica**
6. **Integrazione**
### 2️⃣ Manutenzione
Rappresenta circa **il 60% del costo totale** del ciclo di vita.
### 3️⃣ Dismissione
Ritiro del prodotto.
## 4. Testing nel Ciclo di Vita
Il **testing non è una fase separata**, ma un’attività continua.
Si distingue in:
### Verifica
Controlla che ogni fase sia stata eseguita correttamente rispetto alla fase precedente.  
→ _“Sto costruendo bene il prodotto?”_
### Validazione
Controlla che il prodotto soddisfi i bisogni dell’utente.  
→ _“Sto costruendo il prodotto giusto?”_
⚠️ Il testing non può garantire l’assenza totale di difetti.
## 5. Defect Removal Efficiency (DRE)
**DRE** = percentuale di difetti eliminati prima del rilascio.
Esempio:
- 900 difetti trovati prima del rilascio
- 100 trovati dagli utenti  
    → DRE = 90%
Maggiore è la DRE, maggiore è la qualità del processo.
# DEFINIZIONI FONDAMENTALI
- **Prodotto Software** = Codice + Documentazione
- **Artefatto** = prodotto intermedio non eseguibile (requisiti, specifiche, progetto)
- **Codice** = artefatto eseguibile finale
- **Sistema Software** = insieme organizzato di prodotti software
- **Cliente** = chi commissiona
- **Sviluppatore** = chi realizza
- **Utente** = chi utilizza
### Software Interno
Cliente e sviluppatore coincidono.
### Software a Contratto
Cliente e sviluppatore sono soggetti distinti.
# COSTO DEL SOFTWARE
Il costo è proporzionale al quadrato della dimensione:
C=aS2C = aS^2C=aS2
Questo implica che:
- Due prodotti di dimensione S/2 costano meno di uno di dimensione S.
- Una volta sviluppato, replicarlo non costa praticamente nulla.
- Un prodotto doppio richiede prezzo 4 volte maggiore (a parità di mercato).
# AFFIDABILITÀ DEL SOFTWARE
## 1. Definizione
Formalmente:  
**Probabilità che il software funzioni correttamente in un dato intervallo temporale (mission time).**
## 2. Concetti chiave
- **Errore** → azione umana sbagliata.
- **Difetto (defect)** → anomalia nel software.
- **Guasto (failure)** → comportamento anomalo osservabile.
Relazione:  
Errore → Difetto → Guasto
⚠️ Un difetto può non causare mai un guasto.
## 3. Regola 10-90
Il 90% del tempo di esecuzione è speso nel 10% del codice.
👉 Se un difetto è nel “nucleo” del programma, incide molto sull’affidabilità.  
👉 Se è in una parte raramente usata, incide poco.
## 4. Profilo Operativo
L’affidabilità osservata dipende da **come** il software viene usato.
Utenti diversi → affidabilità percepita diversa.
# CONFRONTO HARDWARE vs SOFTWARE
### Hardware
- Si deteriora.
- Dopo la sostituzione torna come nuovo.
- Obiettivo: stabilità dell’affidabilità.
### Software
- Non si consuma.
- I guasti dipendono da difetti latenti.
- Dopo una correzione l’affidabilità può migliorare o peggiorare.
- Obiettivo: crescita dell’affidabilità (riduzione progressiva dei guasti).
Nel grafico (p.3):
- Hardware → curva a “vasca da bagno”
- Software → curva idealmente decrescente, ma nella realtà può risalire per effetto delle modifiche.
![[Pasted image 20260303185017.png|400]]

## Software Rejuvenation
Tecnica che consiste nel “resettare” periodicamente il sistema per riportarlo a uno stato stabile.
Serve perché, pur non usurandosi, il software può degradarsi per interazioni con sistema operativo e ambiente.
# DISPONIBILITÀ DEL SOFTWARE
**Disponibilità (Availability)** = percentuale di tempo in cui il sistema è utilizzabile.
Dipende da:
- Numero di guasti
- Tempo medio di riparazione
È critica nei sistemi:
- Bancari
- Industriali
- Sicurezza
Per stimare affidabilità si usa **Statistical Testing**:  
test prolungato, registrazione dei fallimenti, stima probabilistica.
# EVOLUZIONE DELLA PRODUZIONE SOFTWARE
1. **Fase di Abilità** → lavoro individuale creativo.
2. **Fase Artigianale** → piccoli gruppi specializzati.
3. **Fase Industriale** → pianificazione, coordinamento, strumenti automatici.
# PROCESSO SOFTWARE
È l’insieme di attività necessarie per:
- Rispettare tempi
- Rispettare costi
- Garantire qualità
Comprende:
- Fasi di definizione (cosa)
- Fasi di produzione (come)
- Manutenzione
- Dismissione
# TIPI DI MANUTENZIONE
1. **Correttiva** → elimina difetti.
2. **Adattativa** → adatta a nuovi ambienti.
3. **Perfettiva (Evolutiva)** → aggiunge funzionalità (più costosa).
4. **Preventiva (Reengineering)** → migliora struttura e documentazione per facilitare interventi futuri.
⚠️ Il reengineering è molto costoso.
# MODELLI DI CICLO DI VITA
Non esiste un modello migliore in assoluto.
![[Pasted image 20260303185050.png|400]]

# MODELLO WATERFALL
Attività sequenziali rigide.
Si passa alla fase successiva solo dopo verifica della precedente.
### Limiti:
- Difficile tornare sui requisiti.
- Cliente coinvolto solo all’inizio e alla fine.
- Scarso feedback continuo.
## Certificazione
È una dichiarazione formale di conformità a uno standard.
Nel software si certifica più spesso:
- La maturità dell’organizzazione
- La qualità del processo
![[Pasted image 20260303185102.png|600]]

# MODELLO A PROTOTIPO RAPIDO
Nasce per migliorare il Waterfall.
## Idea centrale:
Creare rapidamente un prototipo dell’interfaccia (1 settimana/10 giorni).
### Obiettivi:
- **Requirements Elicitation** (far emergere i requisiti)
- **Requirements Validation** (validarli con l’utente)
⚠️ Il prototipo:
- Non è il prodotto finale
- Non copre bene requisiti non funzionali
- Non ha valenza legale
- Non garantisce sicurezza
Deve essere **“usa e getta”**.
## Svantaggi
- L’utente può sottovalutare la complessità reale.
- Pressione sul team.
- Tecniche di visual programming non adatte a grandi progetti.
- Difficoltà di manutenzione.
![[Pasted image 20260303185126.png|600]]

# PROCESS ITERATION
Per superare la rigidità Waterfall si introduce lo sviluppo iterativo.
Due approcci:
1. **Sviluppo Incrementale**
2. **Sviluppo a Spirale**
# SVILUPPO INCREMENTALE
Il prodotto viene rilasciato in **build successive**.
## Vantaggi:
- Feedback continuo
- Riduzione costi iniziali
- Maggiore flessibilità
- Mantiene rigore strutturale
![[Pasted image 20260303185337.png|500]]

## Due versioni
### 1️⃣ Con Overall Architecture (più sicura)
- Architettura definita prima.
- Ogni componente diventa una build.
- Minor rischio di integrazione.
![[Pasted image 20260303185353.png|600]]

### 2️⃣ Senza Overall Architecture (più rischiosa)
- Build basate su requisiti prioritari.
- Rischi di integrazione tardiva.
- Possibili problemi alla k-esima build.

![[Pasted image 20260303185404.png|600]]

## Scelta del numero di Build
Più build:
- Minor costo di modifica
- Maggior costo di integrazione
Si cerca una **regione di costo minimo** (come mostrato nel grafico p.10).
![[Pasted image 20260303184839.png]]
# CONFRONTO WATERFALL vs INCREMENTALE

|Waterfall|Incrementale|
|---|---|
|Sequenziale rigido|Iterativo|
|Feedback solo finale|Feedback continuo|
|Modifiche costose|Modifiche più semplici|
|Coinvolgimento cliente limitato|Coinvolgimento continuo|

# CONCETTI CHIAVE DA MEMORIZZARE
- Software Engineering = disciplina ingegneristica
- Ciclo di vita = sviluppo + manutenzione + dismissione
- Manutenzione = 60% dei costi
- Verifica ≠ Validazione
- Affidabilità ≠ Disponibilità
- DRE = efficienza rimozione difetti
- Waterfall = sequenziale
- Prototipo = usa e getta
- Incrementale = build successive
- Architettura riduce rischio integrazione

# MODELLO A SPIRALE
## Struttura generale
Il **Modello a Spirale** è un modello iterativo che rappresenta il processo di sviluppo come una spirale che si espande progressivamente.
- La **dimensione radiale** rappresenta l’aumento dei costi.
- La **dimensione angolare** rappresenta l’avanzamento temporale.
- Ogni giro completo della spirale corrisponde a una **build**.
- Anche la **manutenzione** può essere vista come un ulteriore giro della spirale.
📌 **Figura (pag. 1)**: viene rappresentata una spirale suddivisa in settori:  
Customer Communication → Planning → Risk Analysis → Engineering → Construction & Release → Customer Evaluation.
![[Pasted image 20260303190040.png]]

## Le fasi di ogni iterazione
Ogni ciclo della spirale comprende sempre le stesse attività:
1. **Customer Communication**  
    Interazione con il cliente per comprendere esigenze e feedback.
2. **Planning**  
    Pianificazione delle attività.
3. **Risk Analysis (fase chiave)**  
    È l’elemento distintivo del modello.  
    Si analizzano i rischi prima di procedere.
    ⚠️ Se i rischi risultano eccessivi, il progetto può essere interrotto anche durante un’iterazione.
4. **Engineering**  
    Specifica, progettazione e preparazione tecnica.
5. **Construction & Release**  
    Codifica, integrazione e rilascio.
6. **Customer Evaluation**  
    Il cliente valuta la build e fornisce feedback.
### Rappresentazione semplificata
📌 **Figura (pag. 2)**: rappresentazione simile al Waterfall, ma con una differenza fondamentale:  
prima di ogni fase compare una **fase di Risk Analysis**.
👉 Questo evidenzia che nel modello a spirale ogni avanzamento è subordinato alla valutazione dei rischi.
![[Pasted image 20260303190057.png]]
## Versione di Boehm
📌 **Figura (pag. 3)**: rappresentazione originale di Boehm.
Caratteristiche:
- Prototipi utilizzati per l’analisi dei rischi (diversi dal prototipo rapido).
- Uso di simulazioni, benchmark e test nelle fasi di sviluppo.
⚠️ È applicato con successo soprattutto in **software interno** (es. NASA).  
Non è adatto a software a contratto: non si può dire al cliente vicino alla consegna che il progetto va fermato per rischi emersi.
![[Pasted image 20260303190112.png]]

# RISK MANAGEMENT
## Definizione di rischio
**Rischio** = probabilità che si verifichi una circostanza avversa durante lo sviluppo.
Il **Risk Management** è un sottoprocesso del processo software che serve a:
- Identificare
- Analizzare
- Pianificare
- Monitorare i rischi
## Tipologie di rischio
- **Project Risks** → impatto su tempo e risorse.
- **Product Risks** → impatto su qualità e performance.
- **Business Risks** → impatto sull’organizzazione.
📌 **Tabella (pag. 4)**: esempi concreti:
- Staff turnover
- Hardware non disponibile
- Cambiamenti nei requisiti
- Sottostima dimensione sistema
- Cambio tecnologia
![[Pasted image 20260303190127.png]]
![[Pasted image 20260303190137.png]]

## Attività del Risk Management
### 1. Risk Identification
Output: documento con elenco completo dei rischi.
Rischi tipici:
- Tecnologia
- Persone
- Organizzazione
- Tool
- Requisiti
- Stima
### 2. Risk Analysis
Si assegna a ogni rischio:
- **Probabilità** (very low → very high)
- **Effetto** (catastrofico, serio, tollerabile, insignificante)
📌 **Tabella (pag. 5)**: mostra esempio di classificazione.
I rischi ad alta priorità sono:
- Effetto catastrofico o serio
- Probabilità almeno alta
Si identificano i **Top-Ten Risks** (i più critici).
![[Pasted image 20260303190207.png]]

### 3. Risk Planning
Strategie:
- **Avoidance** → ridurre la probabilità.
- **Minimisation** → ridurre l’impatto.
- **Contingency Plans** → piano B.
📌 **Tabella (pag. 5)**: esempio di strategie associate ai rischi.
![[Pasted image 20260303190454.png|500]]
### 4. Risk Monitoring
Monitoraggio continuo per:
- Rivedere rischi già identificati
- Individuare nuovi segnali di allarme
📌 **Tabella (pag. 6)**: indicatori di rischio (es. ritardi hardware, turnover, molte richieste di modifica).
![[Pasted image 20260303190520.png|400]]
# MODELLO OBJECT-ORIENTED (A FONTANA)
Prevede uso dell’approccio **object-oriented** in:
- Analisi dei requisiti
- Progettazione
⚠️ L’implementazione può anche usare linguaggi non object-oriented.
## Caratteristiche distintive
📌 **Figura (pag. 6)**: cerchi sovrapposti.
- Le fasi si sovrappongono → sviluppo concorrente.
- Iterazioni intra-fase (frecce interne).
- Iterazioni inter-fase (frecce esterne).
Differenza rispetto al Waterfall:
- Non è sequenziale rigido.
- Le fasi possono iniziare prima che le precedenti siano concluse.
Vantaggio:
- Manutenzione più semplice (software più modulare).
![[Pasted image 20260303190601.png|400]]

# INGEGNERIA SIMULTANEA (CONCORRENTE)
Obiettivo:
- Ridurre costi e tempi.
Caratteristiche:
- Fasi eseguite in parallelo.
- Forte uso di strumenti collaborativi.
- Condivisione file e riunioni online.
Richiede:
- Ottimo supporto software per project management.
# MODELLO BASATO SU METODI FORMALI
Applicabile solo a **software critici**.
Caratteristiche:
- Specifica matematica formale.
- Eliminazione ambiguità.
- Verifica automatizzata.
Esempio:
- **Cleanroom Software Engineering** → estrema attenzione a evitare errori già dalla fase di requisiti.
# MODELLO MICROSOFT
## “SYNCHRONIZE-AND-STABILIZE”
Modello usato per software commerciale.
Caratteristiche generali:
- Iterativo
- Incrementale
- Concorrente
- Creatività valorizzata
## Due pilastri
### 1️⃣ Sincronizzazione quotidiana
- Team piccoli (3–8 sviluppatori)
- Ogni giorno: **daily build**
- Codice caricato nel repository
- Compilazione automatica
- Test immediato
Se qualcosa non funziona:
- Chi ha introdotto l’errore deve sistemarlo.
### 2️⃣ Stabilizzazione periodica
3–4 milestone durante il progetto.
## Ciclo di sviluppo Microsoft
### 1. Planning
- Vision Statement
- Documento di specifica
- Formazione team (1 tester per sviluppatore)
### 2. Development
Sottoprogetti (milestone).  
Il primo contiene funzionalità critiche.
### 3. Stabilization
- Alpha test (interno)
- Beta test (esterno)
- Versione finale
## Strategie principali
### Strategia 1: definire prodotto e processo
Principi:  
a) 3–4 milestone  
b) Specifica evolutiva  
c) Priorità definite dal Product Manager  
d) Architettura modulare  
e) Task elementari e risorse limitate
### Strategia 2: sviluppo parallelo con sincronizzazioni frequenti
- Daily build
- Prodotto sempre rilasciabile
- Testing continuo
- Uso limitato delle metriche
## Grafico difetti
![[Pasted image 20260303190703.png|400]]
- Nero = Opened Bugs
- Rosso = Resolved Bugs
- Verde = Fixed Bugs
- Linea curva = difetti attivi stimati
Osservazione importante:  
Se la data promessa è vicina, il prodotto può essere rilasciato anche con difetti pur di rispettare la scadenza.
👉 La reputazione aziendale è prioritaria.
## Struttura milestone
![[Pasted image 20260303190713.png|300]]

Tre cicli di sviluppo:
- Development
- Buffer time (per assorbire ritardi)
- Alpha release
- Beta release
- Feature Complete
- UI Freeze (interfaccia congelata)
- Final release
Definizioni:
- **Feature Complete** → non si aggiungono nuove funzionalità.
- **UI Freeze** → interfaccia non modificabile.
- **Buffer time** → margine temporale per gestire imprevisti.
# MODELLO NETSCAPE
Simile a Microsoft ma adattato a Internet.
Differenze:
- 3 sviluppatori per 1 tester (vs 1:1 Microsoft)
- Pianificazione meno rigorosa
- Documentazione incompleta
- Meno controllo avanzamento
- Pochi dati storici
Vision generata tramite:
- **APM (Advanced Planning Meeting)**  
    Coinvolge:
    - Marketing
    - Sviluppatori
    - Executives
# CONCETTI CHIAVE DA MEMORIZZARE
- Spirale = iterazioni + analisi rischi
- Risk management = identificazione → analisi → pianificazione → monitoraggio
- Object-oriented = concorrenza + iterazione
- Metodi formali = software critico
- Microsoft = daily build + milestone + buffer
- Netscape = meno controllo, più orientamento al mercato
# MODELLI AGILI, CMM E INGEGNERIA DEI REQUISITI
# 1. METODI AGILI
## Origine e motivazione
I **Metodi Agili** nascono all’inizio degli anni 2000 come reazione alla eccessiva formalizzazione dei modelli tradizionali (es. Waterfall).
Obiettivo:
- Ridurre la rigidità del processo.
- Valorizzare la creatività degli sviluppatori.
- Favorire comunicazione continua e feedback rapido.
Non sono un ritorno al _Build & Fix_:  
pur essendo più “leggeri”, rimangono organizzati in modo sistematico.
## Agile Manifesto – Valori fondamentali
I valori chiave sono:
- **Individui e interazioni** più importanti di processi e strumenti.
- **Software funzionante** più importante della documentazione.
- **Collaborazione con il cliente** più importante della negoziazione contrattuale.
- **Rispondere al cambiamento** più importante del seguire un piano rigido.
⚠️ Attenzione: non significa assenza di processo, ma priorità diversa.
# 2. SCRUM
Uno dei metodi Agili più diffusi.
È basato su concetti di **knowledge management** (gestione e condivisione della conoscenza nel team).
📌 **Figura (pag. 2)**: mostra il ciclo Scrum con Sprint, Daily Scrum, Sprint Review, Sprint Retrospective e gli artefatti (Product Backlog, Sprint Backlog, Increment).

![[Pasted image 20260303191616.png]]

## Ruoli principali
### Scrum Master
- Garantisce che Scrum venga applicato correttamente.
- Non sviluppa direttamente.
- Facilita il lavoro del team.
### Product Owner
- Gestisce e prioritizza i requisiti.
- Responsabile del **Product Backlog**.
### Development Team (3–9 persone)
- Sviluppo e testing.
- Team auto-organizzato.
## Eventi principali
1. **Sprint**
    - Incremento di software.
    - Durata tipica: 2–4 settimane.
    - Concetto di _timeboxing_ (tempo fisso, contenuto variabile).
2. **Sprint Planning**
    - Trasferimento attività dal Product Backlog allo Sprint Backlog.
3. **Development Work**
    - Lavoro tecnico.
    - Daily Scrum Meeting (riunioni quotidiane brevi).
4. **Sprint Review**
    - Presentazione incremento al cliente.
5. **Sprint Retrospective**
    - Analisi interna.
    - Pianificazione miglioramenti.
    - Attività non completate passano allo Sprint successivo.
## Artefatti
- **Product Backlog** → elenco completo dei requisiti.
- **Sprint Backlog** → requisiti dello Sprint corrente.
- **Definition of Done** → criterio condiviso per stabilire quando un’attività è completata.
- **Incremento** → risultato dello Sprint.
# 3. USER STORY
Concetto centrale nei metodi Agile.
## Definizione
Una **User Story** è una descrizione breve di un requisito dal punto di vista dell’utente.
Formato standard:
```> “As a <role>, I want <goal> so that <benefit>.”```
Se il requisito è complesso → si parla di **Epic** (suddivisibile in più User Stories).
Le User Story alimentano:
- Product Backlog
- Sprint Backlog
# 4. CERTIFICAZIONE DEL PROCESSO: CMM / CMMI
Nel software non si certifica il prodotto, ma il **processo dell’organizzazione**.
## CMM – Capability Maturity Model
Introdotto nel 1993 dal SEI.
Misura la **maturità del processo software**.
Modello additivo a 5 livelli:
### Livello 1 – Initial
- Nessun processo definito.
- “Success depends on heroes”.
### Livello 2 – Repeatable
- Tecniche base di project management.
- Pianificazione e monitoraggio minimi.
KPA tipiche:
- Software configuration management
- Software quality assurance
- Subcontract management
### Livello 3 – Defined
- Processo documentato e standardizzato.
- Peer reviews.
- Training program.
### Livello 4 – Managed
- Uso di metriche.
- Processo misurato quantitativamente.
### Livello 5 – Optimizing
- Miglioramento continuo.
- Defect prevention.
📌 **Figura (pag. 4)**: mostra crescita di produttività e qualità al crescere del livello e riduzione del rischio.
⚠️ Nota importante:
- Si certifica il reparto software, non l’intera azienda.
- La maggior parte delle organizzazioni è certificata a livello 3.
![[Pasted image 20260303191634.png|400]]

# 5. REQUISITI SOFTWARE
## Definizione generale
Un **requisito software** è:
> Descrizione dei servizi che il sistema deve fornire + vincoli di sviluppo e manutenzione.

Secondo IEEE:
1. Condizione necessaria per risolvere un problema.
2. Condizione necessaria per soddisfare contratto/standard.
3. Rappresentazione documentale della condizione.
## Livelli di astrazione
### Requisiti Utente (Requirement Definition)
- Linguaggio naturale.
- Comprensibili a cliente e stakeholder.
### Requisiti di Sistema (Specification)
- Più dettagliati.
- Linguaggi strutturati o modellazione.
- Base per progettazione.
Documento che li raccoglie:  
👉 **Documento di Analisi dei Requisiti (Documento di Specifica)**
## Categorie di requisiti
### 1️⃣ Requisiti Funzionali
Descrivono i servizi offerti dal sistema.
Esempio:
> “Il sistema deve fornire un visualizzatore appropriato per i documenti.”
### 2️⃣ Requisiti Non Funzionali
Descrivono proprietà e vincoli.
Possono riguardare:
- Qualità (efficienza, affidabilità, sicurezza)
- Processo (standard, linguaggi, ambienti)
- Vincoli esterni (privacy, leggi)
Esempi:
- Tempo di risposta < 10 sec.
- Conformità a standard ABC.
- Protezione dati personali.
### 3️⃣ Requisiti di Dominio
Derivano dal contesto applicativo.  
Possono essere funzionali o non funzionali.
## Gerarchia dei requisiti non funzionali
📌 **Figura (pag. 7)**: mostra suddivisione in:
- Product requirements
- Organizational requirements
- External requirements
Con sottocategorie:
- Efficienza
- Affidabilità
- Portabilità
- Interoperabilità
- Privacy
- Sicurezza
- Standard
- Vincoli legislativi
![[Pasted image 20260303191707.png|500]]

# 6. PROBLEMI COMUNI NELLA DEFINIZIONE DEI REQUISITI
## 1. Ambiguità
Requisito interpretabile in più modi.
Esempio:  
“Visualizzatore appropriato” → cosa significa?
## 2. Incompletezza
Mancano dettagli.
Il prototipo rapido può aiutare.
## 3. Inconsistenza
Requisiti in conflitto.
Esempio:  
Max 5 campi vs form con 6 campi obbligatori.
## 4. Verificabilità
Devono essere misurabili.
Esempi:
- Usabilità → training time.
- Portabilità → percentuale di codice dipendente dalla piattaforma.
# 7. COME SCRIVERE I REQUISITI
Linee guida:
- Linguaggio naturale controllato.
- Evitare termini tecnici inutili.
- Numerazione rigorosa.
- Uso coerente di “deve” (obbligatorio) vs “dovrebbe” (desiderabile).
- Inserire:
    - Rationale (motivazione)
    - Puntatore alla specifica di sistema.
📌 **Figura (pag. 8)**: esempio di requisito utente con numerazione, rationale e riferimento alla specifica.
![[Pasted image 20260303191721.png|400]]
# 8. NOTAZIONI PER REQUISITI DI SISTEMA
Esistono tre livelli:
### Informale
Linguaggio naturale strutturato.
### Semi-formale
- PDL (Program Design Language, pseudocodice)
- Notazioni grafiche
### Formale
Specifiche matematiche (per software critico).
## Esempio linguaggio naturale strutturato
📌 **Figura (pag. 9)**:  
Struttura tipo “dichiarazione di funzione”:
- Inputs
- Outputs
- Pre-condizioni
- Post-condizioni
- Side effects
Questo riduce ambiguità rispetto al testo libero.
![[Pasted image 20260303191735.png|500]]
## Uso del PDL
📌 **Figura (pag. 10)**: esempio ATM in Java-like.
Vantaggio:
- Riduce ambiguità.
Svantaggio:
- Rischio di anticipare dettagli implementativi.
- Potrebbe interferire con progettazione.
👉 Meglio usarlo per definire **interfacce**, non algoritmi.
![[Pasted image 20260303191754.png|500]]
# 9. DOCUMENTO DI ANALISI DEI REQUISITI
Tutti i requisiti (utente + sistema) confluiscono nel:
**Documento di Analisi dei Requisiti (Documento di Specifica)**
È il documento guida dell’intero progetto software.
# CONCETTI CHIAVE DA MEMORIZZARE
- Agile ≠ assenza di processo.
- Scrum = Sprint + ruoli definiti + artefatti.
- User Story = requisito dal punto di vista utente.
- CMM misura maturità del processo.
- Requisiti = funzionali + non funzionali + dominio.
- Problemi principali: ambiguità, incompletezza, inconsistenza, verificabilità.
- PDL riduce ambiguità ma va usato con cautela.
- Documento di Analisi dei Requisiti = base del progetto.
# DOCUMENTO DI SPECIFICA E REQUIREMENTS ENGINEERING
# 1. IL DOCUMENTO DI SPECIFICA DEI REQUISITI
## Finalità del documento
Il documento di specifica **descrive cosa il sistema deve fornire**, cioè il **dominio del problema**, e non come deve essere sviluppato (dominio della soluzione, che appartiene alle fasi successive).
Il documento:
- interviene continuamente durante sviluppo e manutenzione;
- è centrale anche dopo la consegna;
- se assente, può costringere a fare **reverse engineering** (ricostruzione dei requisiti a partire dal codice).
## Ruoli coinvolti
Contribuiscono alla sua stesura:
- **Cliente**
- **Manager** (valuta investimenti)
- **System Engineers** (sviluppo)
- **System Test Engineers** (definiscono test plan e test case)
- **System Maintenance Engineers**
⚠️ Nota importante: la manutenzione più comune non è quella correttiva, ma quella **perfettiva** (modifiche ai requisiti).
## Tracciabilità
Le modifiche ai requisiti implicano modifiche al documento.
Per questo è fondamentale:
- mantenere **link di tracciabilità**
- valutare l’impatto delle modifiche
**Tracciabilità** = capacità di risalire dalle specifiche al progetto, al codice e ai test, e viceversa.
## Struttura secondo IEEE 830-1998
Il documento si basa su un template standard:
1. **Preface**
    - Lettori attesi
    - Cronologia versioni
    - Riepilogo modifiche
2. **Introduction**
    - Scopo
    - Descrizione sintetica
    - Interazione con altri sistemi
    - Contesto aziendale
3. **Glossary**
    - Definizione termini tecnici
4. **User Requirements Definition**
    - Requisiti utente (funzionali e non funzionali)
5. **System Architecture**
    - Panoramica componenti
6. **System Requirements**
    - Requisiti di sistema dettagliati
7. **System Models**
    - Relazioni tra componenti e ambiente
8. **System Evolution**
    - Assunzioni su evoluzioni future (hardware, bisogni)
9. **Appendices**
    - Informazioni applicative (hardware, DB)
10. **Index**
# 2. REQUIREMENTS ENGINEERING (RE)
La Requirements Engineering varia in base a:
- Dominio applicativo (es. software critico → specifica matematica)
- Persone coinvolte
- Organizzazione
Approccio considerato: **Object Oriented**.
## Fasi della Requirements Engineering
### 1️⃣ Studio di Fattibilità
Fase preliminare che stabilisce se sviluppare il sistema.
Caratteristiche:
- Basata su descrizione sommaria
- Deve essere rapida
- Produce un report finale
Coinvolge:
- Client Manager
- Esperti di dominio
- Esperti tecnologici
- Utenti finali
### 2️⃣ Identificazione e Analisi dei Requisiti

### 3️⃣ Specifica dei Requisiti
Se la fattibilità è positiva:
Si organizza un incontro tra:
- Team sviluppo
- Cliente
- Utenti
- Stakeholder (chiunque abbia interesse diretto o indiretto)
## Attività principali
### Comprensione del Dominio
L’analista deve comprendere rapidamente il dominio (es. funzionamento ufficio postale).
### Raccolta Requisiti
Interazione con stakeholder.
### Classificazione
Suddivisione in sottoinsiemi (es. dati, interfaccia, ecc.).
### Risoluzione Conflitti
Individuare contraddizioni.
### Assegnazione Priorità
Fondamentale in sviluppo incrementale.
### Verifica
Controllo di:
- Completezza
- Consistenza
# 3. TECNICHE DI IDENTIFICAZIONE
- **Prototipazione**
- **Casi d’uso**
- **Etnografia** (osservazione diretta del lavoro)
# 4. TECNICHE DI ANALISI E SPECIFICA
## Semi-formali
- Metodi strutturati
- Metodi orientati agli oggetti
## Formali
- Macchine a stati finiti
- Petri Net
# 5. CONVALIDA DEI REQUISITI
Obiettivo: evitare rework costosi.
Controlli:
- Validità
- Consistenza
- Completezza
- Realizzabilità
- Verificabilità
Tecniche:
- Revisioni informali
- Walkthrough
- Ispezioni (più formali e costose)
- Prototipazione
- Generazione test case
- Analisi automatizzata (per specifiche formali)
# 6. GESTIONE DEI REQUISITI
I requisiti cambiano continuamente.
## Classificazione:
### Requisiti Stabili
Poco soggetti a modifica.
### Requisiti Volatili
Alto rischio di modifica:
- Mutabili
- Emergenti
- Consequenziali
- Di compatibilità
## Pianificazione modifiche
Richiede:
- Identificazione univoca
- Analisi costi/impatto
- Politiche di tracciabilità
- Tool CASE (es. IBM DOORS)
# 7. SPECIFICHE FORMALI – PETRI NET
⚠️ Molto costose ma riducono costi nelle fasi successive.
## Costrutti fondamentali
📌 **Figura pag. 3–4**: rete di Petri con places, transitions e token
- **Place (cerchio)** → stato o condizione
- **Transition (barra)** → evento
- **Archi orientati** → collegamenti
- **Token** → rappresentano stato corrente
- **Marking** → distribuzione token
![[Pasted image 20260303192635.png]]

## Regole
Transizione **abilitata** se ogni place in ingresso ha almeno un token.
**Firing**:
- Rimuove token dagli ingressi
- Inserisce token nelle uscite
## Esempio numerico (pag. 4)
Stato iniziale S0 = (1,2,0,1)
Evoluzione:
- S1 = (2,1,0,0)
- S2 = (2,0,2,0)
Lo stato finale è raggiunto quando nessuna transizione è abilitata.
## Arco Inibitore
📌 **Figura pag. 4**: arco con pallino bianco.
Transizione abilitata solo se non c’è token.
![[Pasted image 20260303192713.png]]

## Esempio ascensore
Modellazione requisito:  
“Se l’ascensore è al piano terra e viene chiamato dal primo piano, deve salire.”
Places:
- Fg (ground floor)
- Ff (first floor)
- EBf (pulsante)
Transizione:
- Elevator in action
Serve anche una transizione con arco inibitore per modellare la pressione del pulsante.
## Limiti PN
- Transizioni istantanee (nessun tempo)
- Stato rappresentato indirettamente
## Dialetti
- **GSPN** → aggiunge tempo (analisi prestazionale)
- **CPN** → introduce colori (classi utenti)
# 8. MACCHINE A STATI FINITI (FSM)
📌 **Figura pag. 5–6**: esempio cassaforte.
- Rettangolo = stato
- Arco orientato = evento
- Stato iniziale (grigio scuro)
- Stato finale (grigio chiaro)
Qualsiasi errore → stato “Sound Alarm”.
![[Pasted image 20260303192728.png|400]]

## Problema
Possibile esplosione numero stati.
Soluzione:  
Table of Next States.
# 9. LINGUAGGIO Z
Notazione formale progettata per software.
Primitiva base: **Schema**
Formato:
- Nome
- Dichiarazione variabili
- Predicati
## Esempio stato (pag. 6)
📌 **Figura pag. 6**
Button_State:
- floor_buttons
- elevator_buttons
- buttons
- pushed
Predicati:
- Intersezione vuota
- Unione = insieme totale
![[Pasted image 20260303192743.png|400]]
## Esempio operazione (pag. 7)
📌 **Figura pag. 7**
Push_Button:
- Δ indica modifica stato
- ? parametro input
- ’ indica nuovo valore
Se bottone non premuto → aggiunto a pushed  
Se già premuto → nessuna modifica
![[Pasted image 20260303192807.png|400]]
# 10. SPECIFICHE SEMI-FORMALI
Approccio:  
Costruire modelli del sistema da diversi punti di vista:
- Dati
- Funzioni
- Dinamica
## Modelli utilizzati
### Modello dati
- ERD (non UML)
- Class Diagram (UML)
### Modello comportamentale
- DFD (non UML)
- Use case
- Activity diagram
- Interaction diagram
### Modello dinamico
- State diagram (UML)
# 11. ERD e DFD
📌 **Figura pag. 8**: simboli DFD
DFD:
- Sorgente/destinazione (double square)
- Freccia = flusso dati
- Rettangolo arrotondato = processo
- Rettangolo aperto = data store
Non si legge in ordine temporale.
![[Pasted image 20260303192828.png|400]]

# 12. SSA – STRUCTURED SYSTEM ANALYSIS

Metodo strutturato in 9 step basato su **step-wise refinement**.
## Step 1
Costruzione DFD.
## Step 2
Automatizzazione:
- Online (real-time)
- Batch (a lotti)
📌 **Figura pag. 9**: esempio DFD con “verify order is valid” (online) e “place order” (batch).
## Step 3
Raffinamento data flow fino a dati elementari.
## Step 4
Definizione logica processi (es. albero decisionale sconto educativo).
## Step 5
Definizione data store (es. DIAD)
📌 **Figura pag. 9–10**: DIAD con campi di ricerca (name, function, machine).
![[Pasted image 20260303192914.png|400]]
## Step 6
Definizione risorse fisiche (DBMS vs file system).
## Step 7
Specifiche input/output (layout, form).
## Step 8
Dimensionamento:
- Volume input
- Frequenza report
- Dimensioni file
## Step 9
Requisiti hardware:
- Memoria
- Backup
- Terminali
Il documento finale doveva essere approvato dal cliente prima della progettazione.
# CONCETTI CHIAVE DA MEMORIZZARE
- Documento IEEE 830 struttura standard.
- RE = fattibilità → analisi → specifica → convalida → gestione.
- Requisiti volatili vs stabili.
- Petri Net = token + firing.
- FSM = stati espliciti.
- Z = schema con variabili + predicati.
- DFD non temporale.
- SSA = raffinamento progressivo in 9 step.
# OBJECT ORIENTED ANALYSIS (OOA) E INTRODUZIONE A UML

## 1. Cos’è la OOA
### Definizione generale
La **Object Oriented Analysis (OOA)** è la fase di analisi del software orientato agli oggetti che si concentra su:
> **COSA deve fare il sistema**, non su **COME deve farlo**.

Il _come_ sarà affrontato nella fase successiva, detta **Object Oriented Design (OOD)**.
## 2. Obiettivo di OOA e OOD
OOA e OOD devono produrre una rappresentazione:
- **Corretta**
- **Completa**
- **Consistente**
del sistema software, attraverso tre modelli fondamentali:
### 1️⃣ Modello dei Dati (Statico)
Descrive:
- struttura dei dati
- classi
- attributi
- relazioni tra classi
Rappresenta gli aspetti **statici e strutturali** del sistema.
### 2️⃣ Modello Comportamentale (Funzionale)
Descrive:
- cosa fa il sistema
- quali funzioni offre
- come reagisce agli eventi
Rappresenta gli aspetti **funzionali**.
### 3️⃣ Modello Dinamico (Controllo)
Descrive:
- come le funzioni modificano i dati
- evoluzione nel tempo
- transizioni di stato
Rappresenta il comportamento dinamico del sistema.
## 3. Metodo OOA
Un metodo OOA non è solo un insieme di tecniche, ma comprende:
- procedure
- strumenti
- linee guida
- notazioni
### Input
- Requisiti utente
### Output
- Modelli del sistema (specifica del software)
## 4. Caratteristiche della OOA
### ✔ Non è sequenziale ma iterativa
- I modelli vengono raffinati progressivamente.
- Si lavora per iterazioni successive.
- I modelli vengono costruiti in parallelo.
### ✔ È semi-formale
Usa:
- Diagrammi (notazione visuale)
- Linguaggio naturale per descrizioni complementari
# UML (Unified Modeling Language)
## 1. Perché nasce UML
Esistevano diversi metodi OOA/OOD:
- Objectory (use case)
- OMT
- Booch
- Catalysis
- Fusion
- Shaler/Mellor
Per unificare le notazioni (classi, oggetti, relazioni ecc.) nel 1997 l’OMG (Object Management Group) standardizza **UML**.
## 2. Cos’è UML
⚠ UML **NON è un metodo**, ma un linguaggio di modellazione.
È una notazione che:
- Non impone un processo
- Può essere usata con qualsiasi metodo
## 3. I 9 diagrammi UML principali
### 1. Use Case Diagram
Mostra:
- attori
- casi d’uso
- scenari di utilizzo del sistema
Molto importante per i requisiti.
### 2. Class Diagram
Diagramma strutturale:
- classi
- attributi
- operazioni
- associazioni
Base del modello dei dati.
### 3. State Diagram
Rappresenta:
- stati di un oggetto
- transizioni tra stati
- eventi che causano cambiamenti
### 4. Activity Diagram
Particolare tipo di state diagram.  
Rappresenta:
- flussi di attività (workflow)
### 5. Sequence Diagram
Mostra:
- interazioni tra oggetti
- ordine temporale dei messaggi
### 6. Collaboration Diagram
Mostra:
- messaggi tra oggetti
- relazioni tra istanze
(Stessa semantica del Sequence Diagram, ma diversa rappresentazione.)
### 7. Object Diagram
Istanzia un class diagram in un caso specifico.
### 8. Component Diagram
Rappresenta:
- struttura dei componenti software
- dipendenze
### 9. Deployment Diagram
Rappresenta:
- nodi fisici
- distribuzione dei componenti
⚠ Gli ultimi due sono più vicini alla progettazione (OOD).
# MODELLO DEI DATI
## 1. Definizione
Il modello dei dati rappresenta l’organizzazione logica dei dati del sistema.
Si costruisce tramite:
- **Class Diagram**
Un sistema orientato agli oggetti è un insieme di oggetti che collaborano.
## 2. Processo iterativo
Prima iterazione:
- Si identificano le **Entity Classes**
Iterazioni successive:
- Si aggiungono attributi
- Si aggiungono associazioni
- Si introducono altre classi (control, boundary)
## 3. Tipi di classi
### 🔹 Entity Classes
Rappresentano concetti del dominio applicativo.
### 🔹 Control Classes
Gestiscono la logica di esecuzione.
### 🔹 Boundary Classes
Interfaccia con l’utente.
# IDENTIFICAZIONE DELLE CLASSI

## 1. Approccio Noun Phrase
Metodo:
1. Si estraggono i sostantivi dai requisiti.
2. Ogni sostantivo diventa una classe candidata.
3. Si classificano come:
- **Rilevante (Entity)**
- **Irrilevante**
- **Fuzzy** (incerto)
## 2. Common Class Patterns
Si parte da categorie generali:
- People
- Organization
- Events
- Places
- Concepts
⚠ Non sistematico → può creare ambiguità.
## 3. Use Case Driven
- Si parte dagli use case.
- Gli attori diventano automaticamente entity classes.
- Si integra con noun phrase.
## 4. CRC (Class Responsibility Collaborators)
Metodo basato su card:
- Nome classe
- Responsabilità
- Collaborazioni
Utile quando le classi sono già state identificate.
## 5. Approccio Mixed
Combinazione dei precedenti:
1. Common Class Patterns
2. Noun Phrase
3. Use Case Driven
4. Verifica CRC
# LINEE GUIDA PER LE ENTITY CLASSES
Una entity class:
1. Deve avere uno **statement of purpose** chiaro.
2. Deve essere istanziabile in più oggetti.
    - Le singleton non sono generalmente entity.
3. Deve avere più attributi.
4. Deve avere operazioni (anche se inizialmente omesse).
5. Bisogna distinguere tra:
    - Classe
    - Attributo
# SPECIFICA DELLE CLASSI
## Convenzioni di naming
### Classi
- Nome significativo
- Singolare
- CamelCase
### Attributi
- snake_case
- minuscolo
### Operazioni
Inserite dopo aver costruito il modello comportamentale.

# Attributi e Chiavi
## Convenzioni
- Nome classe → singolare, significativo
- Attributi → minuscolo, snake_case
## Stereotipi UML
Notazione `<< >>` = **Stereotipo**
- `<<PK>> Primary Key`
- `<<CK>> Candidate Key`
![[Pasted image 20260303201051.png]]

Questo è un esempio di **Profilo UML DBMS**, cioè un’estensione di UML per modellazione database.
# 5. Associazioni (Terza Iterazione)
Le associazioni collegano classi.
Devono avere:
- Nome significativo
- Molteplicità su entrambi i lati
- Ruoli (role name)
Esempio Contact–Organization (pag. 1 file 6):
- 1 Contact lavora in 1 Organization
- 1 Organization ha 1..* Contact
Implementazione:
- In Contact: attributo theOrganization : Organization
- In Organization: lista di Contact
![[Pasted image 20260303201132.png]]
## Attributi di tipo classe
Se un attributo ha come tipo una classe → rappresenta un riferimento (associazione).
## Associazioni ternarie
Possono essere sostituite da cicli di associazioni binarie  
⚠ Risparmio spazio ma meno efficienza.
# 6. Aggregation e Composition
Relazioni whole-part.
## Aggregation (◇)
Contenimento debole  
Semantica per riferimento  
Non c’è dipendenza di esistenza.
Esempio:
- Course ◇ CourseOffering
## Composition (◆)
Contenimento forte  
Semantica per valore  
Proprietà:
- Transitiva
- Asimmetrica
- Existence dependency
- Fixed property (in alcuni casi)
Esempio University (pag. 4 file 6):
![[Pasted image 20260303201330.png]]
Student ◆ AcademicRecord  
Se cancello lo studente → cancello anche gli esami.
# 7. Generalizzazione (Ereditarietà)
Freccia verso la superclasse.
## Principi fondamentali
### Sostituibilità
Un oggetto della sottoclasse può sostituire la superclasse.
### Polimorfismo
Un metodo può avere implementazioni diverse nelle sottoclassi.
## Classi Astratte
Nome in corsivo.
Esempio VideoStore (pag. 4 file6 ):
- VideoMedium (astratta)
    - VideoTape
    - VideoDisk
        - BetaTape
        - VHSTape
        - DVDDisk
# 8. Attributi speciali UML
- /is_in_stock → attributo derivato
- $number_currently_available → attributo statico
Derivato = calcolato runtime  
Statico = condiviso tra tutte le istanze
# 9. Object Diagram
Rappresenta istanze concrete di classi.
Esempio (pag. 5 file 6):
- Don Donaldson : Student
    - COMP224 : AcademicRecord
    - COMP326 : AcademicRecord
Mostra esplicitamente:
- Composition
- Associazioni tra oggetti
# 10. MODELLO COMPORTAMENTALE
Rappresenta:
> Come gli oggetti collaborano per offrire i servizi

Gli oggetti si scambiano **messaggi** (invocazioni di metodo).
Diagrammi usati:
- Use Case
- Activity
- Sequence
- Collaboration
# 11. Use Case Diagram
Rappresenta scenari d’uso del sistema.
Un caso d’uso deve essere:
- Funzionalità completa
    
- Visibile dall’esterno
    
- Indipendente (ortogonale)
    
- Attivato da un attore
    
- Produrre risultato significativo
## Relazioni

### Associazione
Attore → caso d’uso
### Include
A include B → B obbligatorio
Esempio University (pag. 7 file 6):  
Enter Program of Study  
`<<include>> Validate Program of Study`
### Extend
A extend B → A opzionale
Esempio:  
Provide Examination Result  
`<<extend>> Provide Enrolment Instructions`
### Generalizzazione tra attori
Esempio Contact Management:  
Employee  
↳ Customer Services Employee  
↳ Customer Services Manager
Il manager può fare tutto ciò che fa l’employee.
# 12. Activity Diagram
Usato per descrivere il flusso di un caso d’uso.
Elementi:
- Nodo iniziale (cerchio pieno)
- Nodo finale (cerchio pieno cerchiato)
- Attività
- Transizioni
- Rombi (decisioni)
- Fork/Join (concorrenza)
## Esempio: Rent Video (pag. 10 file 6)
Flusso:
1. Scan Customer Card
2. Scan Video Medium (loop)
3. Verify Customer
4. Decisione:
    - Delinquent → fine
    - Unreliable → Request Deposit
    - Reliable → Initialize Transaction
5. Verifica ≤ 8 video (loop)
6. Accept Payment
7. Fork:
    - Update Stock

    - Print Receipt    
8. Join
9. Commit Transaction
Importanza: elimina ambiguità del linguaggio naturale.

# 13. Riassunto delle Iterazioni
## Prima iterazione
Identificazione entity classes
## Seconda iterazione
Definizione attributi e nuove classi
## Terza iterazione
Definizione associazioni, molteplicità, contenimento
Poi si passa al modello comportamentale.

# CONCETTI CHIAVE
- OOA = cosa, OOD = come
- UML = linguaggio standard
- Entity classes prima di control/boundary
- Include = obbligatorio
- Extend = opzionale
- Composition = dipendenza forte
- Aggregation = contenimento debole
- Sostituibilità e polimorfismo
- Attributi derivati (/)
- Attributi statici ($)
- Classi astratte in corsivo

vedere file 8 per finire gli argomenti
