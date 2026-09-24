# Resoconto Corso: Basi di Dati (e Basi di Conoscenza)

- **Anno:** 2° Anno Triennale
- **Area:** Sistemi Informativi, Gestione dei Dati e Ingegneria del Software (INF/01, ING-INF/05)
- **Riferimento Docente/Materiali:** Materiali didattici, linee guida di progetto e compendi d'esame

---

## Obiettivi del corso in sintesi

Il corso introduce i principi teorici, metodologici e pratici per la progettazione, modellazione, interrogazione e gestione di basi di dati relazionali. Vengono approfondite tutte le fasi del ciclo di vita di una base di dati: dall'analisi dei requisiti e progettazione concettuale (Modello E-R), alla progettazione logica (Modello Relazionale) e teoria formale della normalizzazione (3NF, BCNF), fino all'interrogazione formale (Algebra e Calcolo Relazionale) e pratica tramite SQL. Il corso tratta inoltre l'architettura interna dei DBMS, le proprietà delle transazioni (ACID), i meccanismi di ripristino dai guasti, il controllo della concorrenza, i trigger e l'ottimizzazione fisica tramite indici.

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### 1. Progettazione Concettuale e Modello Entità-Relazione (E-R)
- **Fondamenti della Modellazione Concettuale:**
  - Analisi dei requisiti del dominio applicativo, strutturazione del glossario dei termini ed eliminazione di ambiguità e ridondanze.
  - **Entità:** entità forti (dotate di identificatore univoco autonomo) ed entità deboli (identificate tramite un'entità proprietaria).
  - **Attributi:** attributi semplici, composti, opzionali, multivalore; attributi identificatori (chiavi).
- **Associazioni / Relazioni:**
  - Definizione matematica come sottoinsieme del prodotto cartesiano tra entità coinvolte.
  - Cardinalità minime e massime dei costrutti: associazioni uno-a-uno ($1:1$), uno-a-molti ($1:N$), molti-a-molti ($N:M$).
  - Attributi delle associazioni (dati dipendenti dall'interazione tra le entità).
- **Gerarchie di Generalizzazione e Specializzazione:**
  - Relazioni ISA tra entità genitore (super-classe) ed entità figlie (sotto-classi); ereditarietà di attributi e relazioni.
  - Classificazione formale delle gerarchie: totale vs parziale, esclusiva vs sovrapposta.
- **Ristrutturazione dello Schema E-R:**
  - Eliminazione di ridondanze computabili.
  - Ristrutturazione delle gerarchie tramite (1) accorpamento delle figlie nel genitore, (2) partizione del genitore nelle figlie, oppure (3) traduzione esplicita con entità separate e vincoli di integrità referenziale.
  - Definizione formale degli identificatori primari stabili.

### 2. Modello Relazionale e Progettazione Logica
- **Struttura Matematica del Modello Relazionale:**
  - Relazione (tabella), tupla (riga), attributo (colonna), schema di relazione $R(A_1, \dots, A_n)$ e istanza di relazione.
  - Domini degli attributi, valore speciale `NULL` (informazione sconosciuta, non applicabile o non presente).
- **Vincoli di Integrità:**
  - Vincoli intra-relazionali: vincoli di tupla, vincoli di dominio (`CHECK`), vincoli di unicità (`UNIQUE`) e obbligatorietà (`NOT NULL`).
  - Vincolo di Chiave Primaria (Primary Key): unicità e non nullità per l'identificazione della tupla.
  - Vincolo di Integrità Referenziale (Foreign Key): garanzia di consistenza tra relazioni correlate; politiche di reazione alla cancellazione/aggiornamento (`CASCADE`, `SET NULL`, `RESTRICT` / `NO ACTION`).
- **Regole di Derivazione Logica da Schema E-R a Schema Relazionale:**
  - Traduzione di entità in tabelle con relative chiavi primarie.
  - Traduzione di relazioni $1:N$: inserimento della chiave primaria del lato "1" come chiave esterna (Foreign Key) nella tabella del lato "$N$".
  - Traduzione di relazioni $N:M$: creazione di una nuova tabella ponte (tabella di associazione) la cui chiave primaria è formata dalla coppia di chiavi esterne verso le due entità.
  - Traduzione di relazioni $1:1$: accorpamento in un'unica relazione o inserimento di chiave esterna con vincolo `UNIQUE` sul lato a partecipazione obbligatoria.

### 3. Linguaggi Formali di Interrogazione
- **Algebra Relazionale (Linguaggio Procedurale):**
  - **Operatori primitivi fondamentali:**
    - Selezione ($\sigma_C$): filtro orizzontale delle tuple che soddisfano la condizione booleana $C$.
    - Proiezione ($\pi_L$): filtro verticale che estrae le sole colonne presenti nella lista $L$, con eliminazione implicita dei duplicati.
    - Ridenominazione ($\rho_{S \leftarrow R}$): modifica dei nomi delle relazioni o degli attributi.
    - Unione ($R \cup S$): aggregazione di tuple da due relazioni con schemi compatibili.
    - Differenza ($R \setminus S$): estrazione delle tuple presenti in $R$ ma assenti in $S$.
    - Prodotto Cartesiano ($R \times S$): combinazione di ogni tupla di $R$ con ogni tupla di $S$.
  - **Operatori derivati ad alto livello:**
    - Intersezione ($R \cap S = R \setminus (R \setminus S)$).
    - Theta-Join ($R \bowtie_\theta S = \sigma_\theta(R \times S)$) ed Equi-Join.
    - Join Naturale ($R \bowtie S$): unione su attributi con stesso nome ed uguaglianza di valori.
    - Outer Join (Left $\bowtie_L$, Right $\bowtie_R$, Full $\bowtie_F$): conservazione delle tuple sbilanciate completate con `NULL`.
    - Divisione Relazionale ($R \div S$): soluzione per query a quantificazione universale ("trova le entità collegate a *tutti* gli elementi").
- **Calcolo Relazionale (Linguaggi Dichiarativi basati sulla Logica del Primo Ordine):**
  - **Calcolo Relazionale su Tuple (TRC):** espressioni della forma $\{t \mid \varphi(t)\}$, dove le variabili denotano intere tuple.
  - **Calcolo Relazionale su Domini (DRC):** espressioni della forma $\{(x_1, \dots, x_n) \mid \varphi(x_1, \dots, x_n)\}$, dove le variabili denotano singoli attributi di dominio.
  - **Teorema di Codd e Concetto di Safety:** equivalenza espressiva tra Algebra Relazionale e la variante "safe" del Calcolo Relazionale.

### 4. Linguaggio SQL (Structured Query Language)
- **Data Definition Language (DDL):**
  - Creazione, modifica ed eliminazione di schemi: `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`.
  - Tipi di dato standard: `INT`, `VARCHAR(n)`, `CHAR(n)`, `DECIMAL(p,s)`, `DATE`, `TIME`, `BOOLEAN`.
  - Definizione formale dei vincoli di colonna e di tabella: `PRIMARY KEY`, `FOREIGN KEY ... REFERENCES`, `NOT NULL`, `UNIQUE`, `CHECK`, `DEFAULT`.
- **Data Manipulation Language (DML):**
  - Inserimento di nuove tuple: `INSERT INTO ... VALUES` o `INSERT INTO ... SELECT`.
  - Modifica dello stato dei dati: `UPDATE ... SET ... WHERE`.
  - Rimozione di tuple: `DELETE FROM ... WHERE`.
- **Data Query Language (DQL - Interrogazione dei Dati):**
  - Struttura fondamentale del costrutto: blocco `SELECT ... FROM ... WHERE`.
  - Condizioni booleane complesse, intervalli (`BETWEEN`), appartenenza insiemistica (`IN`), pattern matching su stringhe (`LIKE '%abc_'`), gestione di `NULL` (`IS NULL`, `IS NOT NULL`).
  - Query multi-tabella con sintassi esplicita di Join: `INNER JOIN ... ON`, `LEFT/RIGHT OUTER JOIN ... ON`.
  - **Aggregazione e Raggruppamento:**
    - Funzioni aggregate: `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.
    - Clausola `GROUP BY` per la partizione delle righe in gruppi omogenei.
    - Clausola `HAVING` per il filtraggio a posteriori dei gruppi basato su predicati aggregati (differenza fondamentale con `WHERE`).
  - Ordinamento dei risultati (`ORDER BY colonna [ASC|DESC]`) e limitazione (`LIMIT`, `OFFSET`).
  - **Viste (Views):** creazione tramite `CREATE VIEW` per modellare tabelle virtuali, facilitare l'accesso per specifici profili utente e garantire riservatezza dei dati.

### 5. Teoria della Progettazione Relazionale e Normalizzazione
- **Anomalie nei Database Mal Progettati:** anomalie di ridondanza, inserimento inconsistente, cancellazione impropria e modifica parziale.
- **Dipendenze Funzionali (DF):**
  - Definizione formale: $X \to Y$ su relazione $R$.
  - Assiomi di Armstrong (sound e complete): riflessività, arricchimento/aumento, transitività; regole derivate di unione, scomposizione e pseudotransitività.
  - Chiusura di un insieme di attributi ($X^+$) rispetto a un insieme di dipendenze $F$.
  - Individuazione algoritmica di superchiavi e chiavi candidate / minimali.
  - Copertura minimale di un insieme di dipendenze funzionali: decomposizione del lato destro in singoli attributi, rimozione di attributi ridondanti a sinistra, eliminazione di dipendenze transitive ridondanti.
- **Forme Normali:**
  - **Prima Forma Normale (1NF):** tutti gli attributi contengono valori atomici e non divisibili (eliminazione di liste, tabelle annidate o attributi multivalore).
  - **Seconda Forma Normale (2NF):** la relazione è in 1NF e ogni attributo non primo dipende funzionalmente in modo completo dall'intera chiave primaria (assenza di dipendenze funzionali parziali su sottoinsiemi della chiave).
  - **Terza Forma Normale (3NF):** la relazione è in 2NF e non contiene dipendenze funzionali transitive tra attributi non chiave. Formalmente: per ogni dipendenza non banale $X \to A$, $X$ è superchiave oppure $A$ è un attributo primo (parte di una chiave candidata).
  - **Forma Normale di Boyce-Codd (BCNF):** forma restrittiva in cui, per ogni dipendenza funzionale non banale $X \to A$, $X$ deve essere necessariamente una superchiave.
- **Decomposizione di Schemi:**
  - Proprietà di decomposizione senza perdita di informazione (*lossless-join decomposition* tramite test dell'intersezione comune che determina una delle due tabelle).
  - Conservazione delle dipendenze funzionali: garanzia che l'unione delle proiezioni delle DF sulle tabelle decomposte preservi l'insieme originale $F$.

### 6. Architettura del DBMS, Transazioni e Affidabilità
- **Concetto di Transazione:** sequenza atomica di istruzioni di lettura/scrittura delimitata da `START TRANSACTION`, `COMMIT` e `ROLLBACK`.
- **Proprietà ACID:**
  - **Atomicità (A):** esecuzione "tutto o niente" della transazione.
  - **Consistenza (C):** rispetto di tutti i vincoli di integrità prima e dopo la transazione.
  - **Isolamento (I):** esecuzione concorrente equivalente a una qualche esecuzione seriale.
  - **Durabilità (D):** persistenza permanente delle modifiche in memoria non volatile a seguito di `COMMIT`.
- **Gestione dei Guasti e Recovery Manager:**
  - Distinzione tra guasti transitori di memoria volatile (guasti soft - crash di sistema) e guasti permanenti di supporto di memorizzazione (guasti hard - rottura disco).
  - **File di Log:** registrazione sequenziale ad accesso garantito delle operazioni con valori prima dell'aggiornamento (*Before State* - BS per operazioni di UNDO) e dopo l'aggiornamento (*After State* - AS per operazioni di REDO). Meccanismo del checkpoint per circoscrivere l'analisi di ripristino.
  - **Tecniche di Ripristino:**
    - Ripresa a Caldo (Warm Recovery): scansione a ritroso dal checkpoint nel log per costruire gli insiemi di transazioni da annullare (fase UNDO) e transazioni completate da riapplicare (fase REDO).
    - Ripresa a Freddo (Cold Recovery): ripristino fisico a partire da una copia di backup periodica (dump) e riapplicazione sequenziale del log fino al crash.
- **Gestione della Concorrenza:**
  - Anomalie da interferenza: perdita di aggiornamento (lost update), lettura sporca (dirty read), lettura non ripetibile (unrepeatable read), lettura fantasma (phantom read).
  - Concetto di serializzabilità dei piani di esecuzione (schedule) e tecniche di blocco a due fasi (2PL - Two-Phase Locking).

### 7. Meccanismi Attivi e Ottimizzazione Fisica
- **Trigger:**
  - Programmazione di regole attive (Event-Condition-Action) che reagiscono ad eventi di `INSERT`, `UPDATE` o `DELETE` su una tabella.
  - Tipologie di trigger: `BEFORE` (eseguito prima della mutazione, utile per validazione o rettifica) e `AFTER` (eseguito dopo, utile per audit e sincronizzazione).
  - Granularità: `FOR EACH ROW` con accesso agli stati storici della riga (`OLD.attributo` e `NEW.attributo`).
  - Generazione di eccezioni applicative per violazione di vincoli complessi tramite `SIGNAL SQLSTATE`.
- **Indici e Ottimizzazione delle Prestazioni:**
  - Nozione di indice come struttura fisica di indicizzazione per l'accesso diretto ai record (tipicamente B+Tree o Hash Table).
  - Creazione con sintassi `CREATE INDEX nome_indice ON tabella (colonna)`.
  - Valutazione del trade-off prestazionale: velocizzazione drastica delle letture selettive (`SELECT` con clausola `WHERE` indicizzata o `JOIN`) a fronte di overhead computazionale e di spazio nelle operazioni di scrittura (`INSERT`, `UPDATE`, `DELETE`).

---

## Linguaggi, Strumenti e Tecnologie

- **Linguaggi di Interrogazione e Manipolazione:** SQL standard (DDL, DML, DQL), Algebra Relazionale, Calcolo Relazionale su Tuple e su Domini (TRC, DRC).
- **DBMS Utilizzati e Testati:** MySQL, MariaDB.
- **Strumenti di Sviluppo e Modellazione:** MySQL Workbench, phpMyAdmin, XAMPP, software di modellazione grafica per diagrammi concettuali e logici (draw.io, dbdiagram.io, Lucidchart).

---

## Tipologia Esercizi e Prove d'Esame

La verifica del profitto si articola nella presentazione di un progetto completo di base di dati, in una prova scritta e in un colloquio orale:
1. **Progetto Completo di Basi di Dati (sviluppato a gruppi o individuale):**
   - Redazione del documento formale dei requisiti di dominio, glossario dei termini, profili d'utenza, operazioni e stima dei volumi di carico.
   - Progettazione del Diagramma E-R (schema scheletro non ristrutturato, schema raffinato e ristrutturato con eliminazione di gerarchie e ridondanze).
   - Derivazione dello Schema Relazionale Logico completo di vincoli di chiave primaria e referenziale.
   - Analisi formale di normalizzazione delle tabelle fino alla 3NF / BCNF.
   - Script SQL eseguibile: istruzioni DDL per tabelle e vincoli, popolamento con dati realistici, viste dedicate per classi di utenza, e almeno 15 query complesse con join e aggregazioni.
   - Traduzione analitica formale di query complesse in Algebra Relazionale e Calcolo Relazionale.
2. **Prova Scritta:**
   - **Esercizio di Modellazione Concettuale e Logica:** stesura dello schema E-R e del corrispondente schema relazionale a partire da una specifica testuale in linguaggio naturale.
   - **Interrogazioni in Algebra Relazionale:** scrittura di espressioni algebriche per estrarre informazioni vincolate senza duplicati.
   - **Interrogazioni in SQL:** scrittura di query con costrutti `JOIN`, `GROUP BY` e `HAVING` (spesso con il vincolo esplicito di evitare subquery o select nidificate).
   - **Esercizi di Teoria della Normalizzazione:** determinazione della chiusura di insiemi di attributi ($X^+$), ricerca di tutte le chiavi candidate, individuazione delle anomalie e scomposizione di schemi in 3NF o BCNF.
3. **Colloquio Orale:**
   - Discussione e difesa delle scelte progettuali del database realizzato.
   - Domande di approfondimento sui meccanismi interni dei DBMS: affidabilità, file di log BS/AS, procedure di ripresa a caldo e a freddo, proprietà ACID, trigger, concorrenza e indici.
