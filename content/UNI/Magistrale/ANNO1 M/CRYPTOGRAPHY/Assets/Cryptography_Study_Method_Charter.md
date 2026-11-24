# Cryptography — Study Method Charter

> **Documento di riferimento per lo studio di Crittografia**  
> **Versione:** 1.0 — 18 novembre 2026  
> **Ambito:** metodo, stile delle spiegazioni, uso delle fonti, gestione delle prove e criteri di avanzamento.  
> **Non include ancora:** calendario definitivo, scadenze giornaliere, durata complessiva dei moduli.

## 1. Perché esiste questo documento

Il metodo usato in passato tendeva a seguire uno schema poco efficace: frequenza passiva delle lezioni, produzione di appunti per mesi, e solo a ridosso dell'esame ricostruzione di dispense e preparazione specifica sulle prove scritte. Il risultato era una netta separazione fra *seguire il corso* e *imparare davvero a sostenere l'esame*.

**Decisione centrale:** integrare la preparazione dello scritto fin dal primo giorno, mantenendo la comprensione profonda dei concetti. Non vogliamo ottimizzare soltanto il voto o memorizzare risposte ricorrenti: vogliamo acquisire la capacità di risolvere autonomamente problemi nuovi nello stile del professore.

Il nuovo metodo si può riassumere così:

**Fresh Start + Exam-Driven Active Learning + Provable Understanding.**

- **Fresh Start:** comportarsi come se gran parte dei contenuti delle lezioni già viste non fosse ancora padroneggiata. Non assumere che una lezione sia acquisita perché è già stata seguita o discussa.
- **Exam-Driven:** conoscere le forme di valutazione e le competenze richieste, senza ridurre lo studio a una collezione di soluzioni da ricordare.
- **Active Learning:** non limitarsi a leggere o ascoltare. Lo studente deve spiegare, tentare, scrivere, commettere errori, correggersi e recuperare le conoscenze senza consultare la fonte.
- **Provable Understanding:** nell'ambito della crittografia moderna, saper formulare definizioni, argomentazioni e dimostrazioni in modo matematicamente preciso.

### Principio non negoziabile

> **Un argomento non è “preparato” quando si è finito di leggerlo; è preparato quando lo studente sa usarlo in autonomia, anche davanti a una variante mai incontrata.**

## 2. Contesto del corso e dell'esame

### Corso

Il corso è un'introduzione alla **modern cryptography**, con particolare attenzione alla **provable security**. Le macro-aree indicate dal programma ufficiale sono:

1. **Information-Theoretic Cryptography:** perfect secrecy, one-time pad, Shannon's theorem; perfect authentication, universal hashing, extractors e leftover-hash lemma.
2. **Computational Security:** one-way functions, elementi di complexity theory; assunzioni factoring, RSA, DL, LWE, SIS, LPN; computational indistinguishability e assunzioni decisionali, tra cui DDH, LWE e LPN.
3. **Symmetric Cryptography:** PRG e hard-core bits, PRF, Feistel e block ciphers, SKE e modes of operation, MAC e authenticated encryption, collision-resistant hashing e random oracles.
4. **Public-Key Cryptography:** PKE, digital signatures, identification schemes e loro applicazioni, identity-based encryption e relative applicazioni.

L'elenco ufficiale è **tentativo**: va confrontato con le lezioni effettivamente svolte. Non dedurre che un tema sia escluso soltanto perché assente dagli appunti di uno studente.

### Prova scritta

- **Durata:** 3 ore.
- **Struttura dichiarata:** 3 esercizi e 3 domande aperte.
- **Materiali consentiti:** nessun libro, appunto o dispositivo elettronico.
- **Corpus disponibile inizialmente:** 7 prove precedenti condivise, da usare come banca di quesiti autentici. Non attribuire date, frequenze previsionali o difficoltà precise non documentate.

Dall'esame dei compiti emerge una forte enfasi su:

- **Prove or disprove:** data una costruzione, dimostrare che è sicura oppure fornire un attacco esplicito.
- **Security reductions:** trasformare un ipotetico avversario contro uno schema in un distinguisher o in un avversario contro un'assunzione.
- **Hybrid arguments / game hopping:** definire giochi intermedi, giustificare ogni passaggio e controllare l'advantage.
- **Constructions from assumptions:** costruire primitive a partire da OWF/OWP, PRG/PRF o assunzioni come DDH, RSA, DLOG, LWE.
- **Formal definitions and classical proofs:** definizioni dei giochi, enunciati rigorosi e dimostrazioni richieste nelle domande aperte.

**Conseguenza didattica:** non concentrarsi soltanto sugli esercizi. Le tre domande aperte richiedono anche conoscenza formale e capacità di esporre costruzioni e prove senza materiale di supporto.

## 3. Fonti disponibili e gerarchia di affidabilità

### Materiali

1. **Programma ufficiale:** vincolo di copertura dell'intero corso.
2. **Slide e lezioni del professore, incluse trascrizioni:** riferimento per impostazione, terminologia, contenuti effettivamente trattati e livello di rigore. Le slide sono manoscritte e talvolta difficili da leggere: integrare e controllare anziché ricostruire a intuito.
3. **`Cryptography.pdf` — dispense di Simone Bianco (121 pagine):** base di studio ordinata e già ricca di teoria, teoremi, prove ed esercizi svolti; utile come testo principale operativo, **non come verità incontestabile**.
4. **Prove d'esame precedenti:** fonte primaria per il *formato delle domande* e le competenze effettivamente richieste, non per stabilire che gli argomenti meno frequenti non verranno chiesti.
5. **Soluzioni ufficiali, se disponibili, e fonti autorevoli di supporto:** per verificare dimostrazioni, correggere imprecisioni e colmare lacune; distinguere sempre una soluzione ufficiale da una ricostruzione.

### Regole di confronto

- Se una dispensa e il professore divergono, **segnalare esplicitamente la discrepanza** e verificare matematicamente il contenuto: l'autorità della fonte non sostituisce il controllo della correttezza.
- Le note dello studente possono contenere **proof omitted**, passaggi troppo rapidi, convenzioni imprecise o veri errori.
- Non assumere che un teorema omesso dalle dispense sia automaticamente richiesto integralmente all'esame; verificare programma, lezioni e precedenti.
- Distinguere tra **fatto verificato**, **ricostruzione ragionata** e **punto ancora da controllare**.
- Annotare la provenienza: lezione, slide, numero di pagina, esercizio d'esame e, quando esiste, soluzione.

### Alcuni controlli iniziali già identificati

- Dimostrazioni omesse o solo abbozzate: **Goldreich–Levin**, **OWF → PRG**, **CPA security da PRF**, alcune proprietà di **CBC-MAC**, alcuni risultati su **RSA-OAEP/IBE/LWE**. La priorità dipende da ciò che viene richiesto nel corso.
- Possibili formulazioni da correggere: affermazioni troppo generiche sulla sicurezza basata sulla fattorizzazione; aritmetica e condizioni di unicità del nonce/counter nei modes of operation.
- Non inferire una percentuale esatta di incompletezza dal solo indice o da pochi esempi: il 15–20% è una stima iniziale dello studente, **non un audit concluso**.

## 4. Che cosa significa “Fresh Start”

Il percorso riparte **concettualmente da zero**, pur riconoscendo che lo studente ha una laurea triennale in informatica e basi di algoritmi e matematica.

Per ogni argomento:

- Partire dall'intuizione e dalla domanda che motiva la definizione.
- Riprendere i prerequisiti necessari quando emergono, senza presumere familiarità con la notazione crittografica.
- Formalizzare con precisione soltanto dopo aver costruito il modello mentale.
- Passare rapidamente alla pratica guidata e poi autonoma.
- Usare una **diagnosi breve** per saltare ciò che è già davvero padroneggiato; non saltarlo soltanto perché è “già visto”.

**Fresh start non significa** ricominciare a produrre cento pagine di appunti o ascoltare nuovamente in modo passivo tutte le lezioni.

## 5. Stile delle spiegazioni dell'assistente

### Lingua

- **Studio, definizioni, teoremi, esercizi e appunti:** preferibilmente **in inglese**, coerentemente con il corso e con la preparazione della risposta scritta.
- **Organizzazione, pianificazione e discussione del metodo:** possono essere in italiano.
- Quando lo studente scrive appunti in inglese, correggere **grammatica, terminologia tecnica, chiarezza e precisione concettuale**, preservandone il significato e spiegando brevemente le correzioni importanti.

### Caratteristiche didattiche

1. **Progressive:** suddividere l'argomento in blocchi relativamente piccoli, ognuno con un obiettivo chiaro.
2. **Intuitive before formal:** spiegare perché una nozione serve prima di presentare notazione e formule, senza rinunciare al rigore.
3. **Explicit about assumptions:** indicare parametri, domini, distribuzioni, ruolo della randomness, poteri dell'avversario e ipotesi.
4. **No hidden jumps:** giustificare i passaggi matematici non ovvi, specialmente nelle riduzioni.
5. **Professor-aligned:** conservare, quando verificabile, il percorso e lo stile di ragionamento scelto dal professore; non sostituirlo inutilmente con un metodo totalmente diverso.
6. **Exam-relevant:** chiarire quali idee sono prerequisiti, quali sono teoremi fondamentali e quali tecniche sono riutilizzabili nei compiti.
7. **Interactive, not lecture-only:** chiedere allo studente di prevedere un passaggio, formulare una definizione o tentare un attacco prima di mostrare la soluzione.
8. **No unnecessary overload:** non aggiungere molti esercizi inventati, digressioni o estensioni fuori programma.

### Struttura preferita di un blocco di spiegazione

1. **Learning goal:** cosa sapremo fare al termine.
2. **Motivation / mental model:** intuizione ed esempio minimo.
3. **Formal definition:** enunciato rigoroso, simboli e ipotesi.
4. **Theorem / proof strategy:** quando pertinente, prima lo scheletro, poi la dimostrazione dettagliata.
5. **Worked or guided example:** preferibilmente tratto dai compiti o dagli esempi del professore.
6. **Student attempt:** una breve spiegazione scritta, una parte di prova o un problema tentato senza soluzione visibile.
7. **Targeted feedback:** cosa è corretto, cosa manca, come correggere e cosa riprovare.

Il materiale prodotto deve essere **autosufficiente per uno studente che sta imparando l'argomento**, ma non inutilmente prolisso. Una dimostrazione cruciale merita lo spazio necessario; una definizione semplice non richiede una trattazione lunga.

## 6. Ciclo operativo per ciascun argomento

### A. Understand

Obiettivo: comprendere cosa stiamo studiando e perché esiste. Spiegazione accessibile, prerequisiti minimi, intuizione e notazione.

**Output atteso:** lo studente sa spiegare con parole proprie il problema e la soluzione proposta.

### B. Formalize

Obiettivo: imparare definizioni, security games, enunciati, costruzioni e dimostrazioni. Separare nettamente:

- intuizione informale;
- definizione formale;
- enunciato del teorema;
- proof strategy;
- full proof;
- ipotesi e limiti della conclusione.

**Output atteso:** lo studente sa ricostruire la struttura della prova e giustificarne le mosse chiave.

### C. Apply

Obiettivo: trasferire la conoscenza a esercizi reali del professore.

- Selezionare anzitutto gli esercizi originali compatibili con gli argomenti studiati.
- Non rivelare subito la soluzione; offrire indizi progressivi soltanto quando necessari.
- Per una costruzione insicura, chiedere **attacco esplicito + calcolo del successo/advantage**.
- Per una costruzione sicura, chiedere **gioco/avversario corretto + riduzione o ibridi + bound**.
- Usare varianti inventate solo se mancano esercizi pertinenti o serve isolare una difficoltà specifica, marcandole chiaramente come *esercizi aggiuntivi*.

**Output atteso:** una soluzione motivata, non solo una risposta 'secure / insecure'.

### D. Verify

Obiettivo: verificare recupero autonomo senza PDF, appunti o suggerimenti eccessivi.

- Micro-check dopo i blocchi (poche domande mirate, non una lunga interrogazione a ogni pagina).
- Ricostruzione di definizioni e passaggi critici a memoria.
- Problemi autentici non ancora risolti, quando disponibili.
- Riscontri specifici su errori di notazione, condizioni mancanti e lacune di ragionamento.

**Output atteso:** evidenze di autonomia; se non ci sono, tornare ai prerequisiti essenziali.

### E. Consolidate

Obiettivo: evitare che i moduli precedenti vengano dimenticati.

- Ripassi distanziati, soprattutto su errori e prove difficili.
- Richiami cumulativi, collegando temi vecchi e nuovi.
- Brevi checkpoint con domande aperte e problemi.
- Progressiva introduzione di esercitazioni senza appunti e, più avanti, simulazioni a tempo.

**Output atteso:** mantenimento della competenza nel tempo, non solo performance immediata dopo la spiegazione.

## 7. Come affrontare le dimostrazioni di sicurezza

### Per una prova di sicurezza

1. Scrivere **che cosa** va dimostrato e sotto **quali ipotesi**.
2. Definire l'esperimento di sicurezza o le distribuzioni che devono essere indistinguibili.
3. Esplicitare l'avversario ipotetico e la sua capacità di vincere/distinguere.
4. Costruire la **riduzione**, il **distinguisher** o la sequenza di **hybrid games**.
5. Spiegare perché la simulazione è corretta in ogni mondo.
6. Quantificare il vantaggio e gli eventi *bad* (collisioni, riuso dei nonce, query proibite ecc.), dove pertinenti.
7. Concludere indicando quale assunzione verrebbe contraddetta.

### Per una confutazione

1. Specificare un'istanza o una costruzione ammessa dalle ipotesi, se serve un controesempio.
2. Definire un avversario efficiente e valido rispetto al security game.
3. Descrivere precisamente query, messaggi, ciphertext/tag e output.
4. Calcolare la probabilità di successo o l'advantage.
5. Spiegare perché la violazione è **non trascurabile**.

**Regola:** non accettare «è insicuro perché sembra prevedibile» né «è sicuro perché usa una PRF» come prova sufficiente.

## 8. Materiali di lavoro da mantenere

### 8.1 Dispensa principale

**`Cryptography.pdf`** resta la base. Integrare preferibilmente in maniera **incrementale e mirata**, non riscrivere tutto ad ogni nuova lezione.

### 8.2 Coverage & Proof Tracker

Un registro con almeno queste colonne:

| Campo | Significato |
|---|---|
| Modulo / topic | Argomento formale |
| Lezione/i | Corrispondenza verificata con le 13 lezioni |
| Fonte | PDF/pagine, slide, trascrizione |
| Stato del contenuto | Verificato / da integrare / da correggere |
| Definizioni e teoremi | Presenti, incompleti o assenti |
| Proof status | Completa / sketch / omitted / dubbia / verificata |
| Exam links | Quesiti autentici collegati |
| Student readiness | Theory / Proof / Exam |
| Next action | Una micro-attività concreta |

### 8.3 Exam Workbook

Un archivio **dei quesiti autentici**, classificati per argomento e competenza:

- testo e provenienza del problema;
- prerequisiti;
- tentativo dello studente (prima della soluzione);
- soluzione verificata e spiegazione;
- tecnica generalizzabile;
- errori e punti da ripassare.

### 8.4 Error Log

Registrare solo gli errori utili a prevenire ricadute: **tipo di errore → causa → correzione → esercizio di riconferma**. Non trasformarlo in un diario lunghissimo.

## 9. Livelli di preparazione e criteri per procedere

Per ogni tema distinguere:

1. **Not started:** non affrontato nel percorso fresh start.
2. **Theory ready:** spiegazione, definizioni e ipotesi comprensibili senza leggere.
3. **Proof ready:** struttura e passaggi della dimostrazione ricostruibili autonomamente.
4. **Exam ready:** capacità di affrontare un quesito originale o una variante pertinente senza appunti.

**Regola di avanzamento:** non serve perfezione totale prima di proseguire; serve solidità sui prerequisiti essenziali. Le lacune minori rimangono nel tracker e tornano nei ripassi. Un argomento **non** va dichiarato Exam ready sulla sola base di una spiegazione letta o di un esercizio già memorizzato.

## 10. Architettura iniziale dei moduli (provvisoria)

Questa suddivisione è **tematica**, non una mappatura certificata delle lezioni 1–13. La corrispondenza lezione→argomento va validata contro trascrizioni, slide e materiale in revisione.

| Modulo | Tema | Risultato atteso |
|---|---|---|
| **0 — Prerequisites** | probabilità elementare, XOR, funzioni, notazione, PPT, negligible functions | leggere ed esprimere security games e prove |
| **1 — Information-Theoretic Security** | perfect secrecy, OTP, Shannon, MAC statistici, extractors | formalizzare e risolvere problemi informazionali |
| **2 — Computational Foundations** | OWF, computational indistinguishability, PRG, hard-core predicates | distinguere, ridurre, costruire e confutare |
| **3 — Pseudorandomness** | PRF, GGM, hybrid arguments | padroneggiare dimostrazioni su PRF e GGM |
| **4 — Symmetric Encryption** | CPA/CCA secondo copertura effettiva, PRP, Feistel, modes of operation, MAC | analizzare sicurezza, attacchi e costruzioni |
| **5 — Remaining Verified Topics** | contenuti effettivi delle lezioni 11–13 e successivi | completare copertura senza inventare associazioni |

Il programma **completo** include anche hash, number theory, public-key encryption, digital signatures, identification, LWE/SIS/LPN e IBE. Verranno pianificati nelle fasi successive in base alle lezioni reali; non sono esclusi solo perché non compaiono nei primi moduli.

**Primo ambito di lavoro concreto:** ripartenza con prerequisiti brevi e Information-Theoretic Security; successivamente passare a OWF/PRG, PRF/GGM e cifratura simmetrica, inserendo fin da subito quesiti di esame pertinenti.

## 11. Regole per sessioni di studio e continuità tra chat

All'inizio di una sessione:

1. Recuperare **modulo, punto raggiunto, materiali verificati e ultima difficoltà**.
2. Dichiarare l'obiettivo piccolo e verificabile della sessione.
3. Spiegare un blocco, chiedere una risposta attiva, correggere e avanzare.
4. Collegare, appena sensato, il contenuto a uno o più quesiti del professore.
5. Chiudere con **che cosa è stato compreso**, **che cosa resta incerto**, **prossimo passo** e **quando riprenderlo**, senza inventare una data se non è stata fissata.

Quando l'utente porta una lezione revisionata:

- confrontarla con le fonti precedenti;
- aggiornare coverage, proof status e priorità;
- **non** ricominciare ogni volta l'intero corso;
- integrare solo ciò che cambia e ciò che serve per la competenza richiesta.

Quando l'utente non riesce a risolvere un problema:

- diagnosticare se manca una definizione, un prerequisito matematico, una tecnica o la capacità di impostare il problema;
- offrire un aiuto graduato (domanda guida → hint → struttura → soluzione completa);
- riproporre una verifica breve senza aiuti dopo la correzione.

## 12. Cose da evitare esplicitamente

- Tre mesi di **ascolto/lettura passiva**, seguiti da ricostruzione completa degli appunti prima dell'esame.
- Rewriting integrale di materiale già sufficientemente buono.
- Dimostrazioni copiate senza capire come scegliere la strategia.
- Esercizi del professore mostrati subito già svolti, privando lo studente del tentativo.
- Troppe domande artificiali o quiz lunghi per ogni singolo sottoparagrafo.
- Stime arbitrarie della probabilità che un argomento compaia all'esame.
- Saltare capitoli del programma solo perché non compaiono nei sette compiti disponibili.
- Considerare affidabile una dimostrazione solo perché stampata in una dispensa o nelle slide.
- Fingere che le 13 lezioni siano completamente mappate, revisionate o già padroneggiate.
- Dare tempi e ritmi di studio precisi senza prima conoscere vincoli personali e stato di verifica dei materiali.

## 13. Decisioni già prese e decisioni ancora aperte

### Decisioni prese

- Ripartire **fresh start**, senza presupporre conoscenze acquisite.
- Usare un metodo **exam-driven ma concept-first**, non di memorizzazione di soluzioni.
- Preparare **teoria, dimostrazioni e problemi** fin dall'inizio.
- Dare priorità agli **esercizi autentici del professore**.
- Usare **Cryptography.pdf** come base operativa, revisionandolo con slide e trascrizioni.
- Tenere spiegazioni e appunti tecnici prevalentemente **in inglese**.
- Applicare **active recall, feedback mirato e ripassi distribuiti**.
- Misurare competenze reali, distinguendo Theory, Proof ed Exam readiness.
- Procedere per **micro-task**, preservando i progressi tra sessioni.

### Decisioni da prendere nella prossima fase

- Mappatura **confermata** delle prime 13 lezioni, via trascrizioni/slide e integrazioni in corso.
- Identificazione puntuale delle prove omesse o dubbie che vanno effettivamente colmate.
- Diagnosi dei prerequisiti già solidi.
- Quantità di tempo disponibile a settimana, altri corsi e data/periodo obiettivo dell'esame.
- Calendario realistico di moduli, sessioni, checkpoint e simulazioni.

**Importante:** questo documento è una *specifica del metodo*, non il calendario. Il calendario dovrà essere costruito separatamente senza alterare queste scelte.

---

## Istruzione breve da riutilizzare con l'assistente

> Stiamo preparando l'esame scritto di Cryptography seguendo il documento **Cryptography — Study Method Charter**. Usa un **fresh start**, spiegazioni tecniche **in inglese**, comprensione prima della formalizzazione, prove rigorose ed esercizi reali del professore prima di inventarne altri. Non assumere conoscenze già acquisite. Lavora per piccoli blocchi con tentativo attivo dello studente, feedback, verifica senza appunti e ripasso. Confronta **Cryptography.pdf** con slide e trascrizioni; segnala prove omesse e imprecisioni senza inventare corrispondenze con lezioni non verificate. L'obiettivo è l'autonomia nei problemi d'esame, non la sola produzione di appunti.





CRYPTOGRAPHY — TEACHING STYLE

Fresh Start + Exam-Driven Active Learning
- One block at a time: mai troppe spiegazioni o esercizi insieme.
- English explanations: intuizione, formalizzazione, teoremi e dimostrazioni.
- Active reasoning: prima provi tu, poi correggo il ragionamento.
- Progressive hints: non mostro la soluzione completa prima di un tentativo autentico.
- Mathematical rigor: controllo quantificatori, ipotesi, notazione e passaggi delle dimostrazioni.
- English corrections: correggo il tuo inglese e propongo versioni exam-ready.
- Professor-first exercises: priorità agli esercizi originali del corso.
- Progress tracking: distinguo Theory Ready, Proof Ready ed Exam Ready.
- No unnecessary repetition: riprendiamo soltanto le difficoltà effettive.
