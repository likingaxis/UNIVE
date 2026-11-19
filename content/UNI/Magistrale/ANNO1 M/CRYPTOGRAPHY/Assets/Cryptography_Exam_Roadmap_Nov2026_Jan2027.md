# Cryptography — Exam Preparation Roadmap

**Versione:** 1.0 · 18 novembre 2026  
**Corso:** Cryptography, Sapienza, A.A. 2026/27 · Prof. Daniele Venturi  
**Orizzonte:** 19 novembre 2026 → 8 gennaio 2027  
**Appello previsto:** tra **11 e 13 gennaio 2027** (data esatta da confermare)  
**Regime ordinario:** martedì **3h**, giovedì **4h**, venerdì **2h**  
**Metodo vincolante:** `Cryptography_Study_Method_Charter.md`

> **Obiettivo.** Arrivare a risolvere e spiegare autonomamente problemi di *provable security* (definizioni, prove, riduzioni, attacchi, costruzioni), non terminare semplicemente la lettura delle dispense. **Fresh start** significa non dare per padroneggiato un argomento solo perché è già stato seguito.

> **Avvertenza realistica.** Con le sole **54 ore essenziali**, ripartendo quasi da zero, la padronanza dell'**intero** programma — specialmente delle lezioni successive a L13 — **non è garantita**. Il piano prioritizza i prerequisiti, organizza un recupero mirato e rende visibili i rischi. Le **15 ore flessibili** sono particolarmente preziose per PKE, firme, LWE e simulazioni. Se possibile, vanno recuperate anche in date alternative quando saltano le festività.

---

## 1. Regole operative non negoziabili

1. **Prima comprendere, poi formalizzare, poi provare.** Breve intuizione → definizione/game rigoroso → strategia della dimostrazione → tentativo dello studente → correzione.
2. **Esercizi originali prioritari.** Prima i problemi del professore nelle lezioni e negli esami precedenti; pochi esercizi inventati, solo per correggere una lacuna specifica.
3. **Mai mostrare subito la soluzione.** Suggerimenti progressivi: domanda guida → hint → scheletro → soluzione completa (solo dopo un tentativo autentico).
4. **Teoria e pratica nella stessa settimana.** Non studiare un intero capitolo teorico per rinviare tutti gli esercizi a gennaio.
5. **La prova è anche teoria.** Lo scritto dura **3 ore** e prevede **3 esercizi + 3 domande aperte**, senza libri, appunti o dispositivi: esercitarsi sia a *prove/disprove* sia a enunciare/costruire/dimostrare.
6. **Spiegazioni e risposte tecniche in inglese.** Pianificazione e feedback organizzativo in italiano; correggere anche l'inglese delle risposte scritte, senza penalizzare la comprensione durante l'apprendimento.
7. **Non riscrivere le dispense.** Conservare riferimenti, un piccolo *error log* e proof skeletons personali; non produrre una seconda dispensa integrale.
8. **Il professore è il riferimento di impostazione.** Preservare la scelta delle tecniche e la notazione dove verificabili, senza considerare infallibili slide o soluzioni non ufficiali.
9. **Il calendario è una previsione, non un vincolo rigido.** Si ricalibra ogni venerdì secondo le evidenze di autonomia; se un argomento è essenziale e fragile, riprenderlo prima di avanzare.
10. **Distinguere fonte e ipotesi.** Qualunque porzione *Post-L13* nel piano è provvisoria finché non arrivano le lezioni 2026/27.

## 2. Fonti e affidabilità

| Fonte | Impiego | Stato |
|---|---|---|
| `crittografia_L1_L13.md` | Riferimento operativo **principale** per L1–L13; sezioni, lezioni, teoremi, esercizi del professore e note sulle prove omesse | Compendio dichiarato verificato rispetto alle slide/trascrizioni disponibili, **non audit matematico indipendente completo** |
| Slide/trascrizioni ufficiali | Stabilire cosa il professore spiega, come imposta le prove e cosa considera esercizio | Fonte primaria quando disponibili; alcune trascrizioni/slide mancano, come annotato nel compendio |
| `Cryptography.pdf` (Simone Bianco) | Seconda spiegazione, definizioni e rinforzo del contesto | Controllare sempre proof omitted, convenzioni e possibili errori |
| `Cryptography_Study_Method_Charter.md` | Regole stabili della didattica e delle verifiche | Vincolante per il metodo |
| Esami condivisi (immagini datate 2022–2025 e raccolta precedente) | Banca di quesiti autentici, difficoltà e varianti | Non trattare le frequenze come probabilità per gennaio |
| `june2026_matteo_solutions.pdf` | Tre esempi di soluzioni **non ufficiali**: MAC, collision resistance, PKE/ElGamal | Confronto **dopo** il tentativo; controllare la correttezza |

**Attenzione alle fonti:** `crittografia_L1_L13.md` è attualmente un documento che termina con L13 e la prova per Merkle–Damgård a lunghezza fissa. Nell'introduzione menziona una *Part V* post-L13 come provvisoria: **non pianificare studiandola come se fosse già contenuta e verificata nel file caricato**.

**Le tre soluzioni Matteo non sono un answer key certificato:** per l'esercizio di collision resistance basato sull'ordine lessicografico, l'argomento «esiste sempre una stringa in mezzo» non vale in generale; nella prova ElGamal/DDH il passaggio all'ibrido necessita di maggiore giustificazione. Usare soluzione e controverifica, non copiarle.

---

## 3. Disponibilità e calendario verificato

**Ore nominali pianificate = ore di lavoro da dedicare alla materia.** Inserire brevi pause fuori dal conteggio quando possibile; se rientrano nelle ore segnate, ridurre proporzionalmente il carico anziché fingere che siano ore effettive.

| Settimana | Date | Sessioni **essenziali** | Ore core | Sessioni **flessibili** | Ore extra |
|---|---|---|---:|---|---:|
| **W0** | 19–20 nov | Gio **19** (4h), Ven **20** (2h) | 6 | — | 0 |
| **W1** | 24–27 nov | Mar **24** (3h), Gio **26** (4h), Ven **27** (2h) | 9 | — | 0 |
| **W2** | 1–4 dic | Mar **1** (3h), Gio **3** (4h), Ven **4** (2h) | 9 | — | 0 |
| **W3** | 8–11 dic | Gio **10** (4h), Ven **11** (2h) | 6 | Mar **8** (3h, Immacolata) | 3 |
| **W4** | 15–18 dic | Mar **15** (3h), Gio **17** (4h), Ven **18** (2h) | 9 | — | 0 |
| **W5** | 22–25 dic | Mar **22** (3h) | 3 | Gio **24** (4h), Ven **25** (2h) | 6 |
| **W6** | 29 dic – 1 gen | Mar **29** (3h) | 3 | Gio **31** (4h), Ven **1 gen** (2h) | 6 |
| **W7** | 5–8 gen | Mar **5** (3h), Gio **7** (4h), Ven **8** (2h) | 9 | — | 0 |
| **Totale** | | | **54h** | | **15h** |

**Massimo disponibile: 69h.** Le ore delle festività non sono cancellate né date per certe: sono opportunità da confermare oppure recuperare altrove. **Non mettere una dimostrazione indispensabile esclusivamente in un giorno flessibile.**

### Cadenza di ogni settimana ordinaria (3–4–2)

- **Martedì — 3h: Understand & Formalize.** 20m richiamo → ~90m nuovo argomento → ~60m definizioni/prova guidata → ~10m micro-check. Introdurre una prima applicazione quando il topic lo consente.
- **Giovedì — 4h: Prove & Apply.** 20m richiamo → ~80m prova/teoria difficile → ~100m esercizi del professore senza soluzione → ~40m confronto, correzione e proof skeleton. Prevedere pause.
- **Venerdì — 2h: Verify & Consolidate.** ~20m recall cumulativo → ~70m esercizio o domanda aperta **senza appunti** → ~30m correzione, error log e scelta del blocco seguente.

**Eccezione W0:** cominciamo giovedì 19 novembre. **Eccezioni W3/W5/W6:** compensiamo le giornate festive nel quadro core/extra senza cambiare la filosofia della sessione.

---

## 4. Roadmap dei moduli (partire dai prerequisiti, non dal numero di pagine)

| Modulo | Materiale verificabile | Focus / cosa saper fare | Priorità |
|---|---|---|---|
| **M0 – Prerequisites** | Trasversale, L1–L5 | XOR, probabilità condizionata, eventi, prodotti di distribuzioni, funzione negligible, differenza proof/attack, sintassi dei giochi | **Fondamentale, diagnostico** |
| **M1 – Information-Theoretic Secrecy** | **L1–L2**, Part I §§1–2 | Perfect secrecy, OTP, Shannon, definizione game-based, prove brevi, controesempi | **Core** |
| **M2 – Statistical MAC & Extraction** | **L2–L4**, Part I §§2–3 | Tag, pairwise independence, min-entropy, statistical distance, LHL (struttura della prova) | **Core, con profondità selettiva** |
| **M3 – Computational Foundations** | **L4–L5**, Part I §4, Part II L5 §5.1 | PPT, OWF, negligible, comp. indistinguishability, riduzione formale | **Core** |
| **M4 – PRG / Hard-Core / OWP** | **L5–L6**, Part II §§5–6 | PRG, stretch amplification, hybrid, OWP → PRG, Goldreich–Levin (come spiegato a lezione), PRG-OTP | **Core, frequente nel corpus** |
| **M5 – PRF & CPA** | **L7**, Part II §7 | PRF game, lazy sampling, CPA game, attacco a determinismo, PRF-OTP, collisioni nonce | **Core, frequente nel corpus** |
| **M6 – GGM** | **L8**, Part II §8 | Costruzione ad albero, multi-PRG lemma, prova per ibridi/induzione, varianti GGM | **Core** |
| **M7 – PRP / Feistel / CTR** | **L9–L10**, Part III | PRP, 1–2 round attacks, 3-round Feistel, modes, CTR CPA, esercizi L10 | **Core** |
| **M8 – Computational MACs** | **L11**, Part IV §1 | UF-CMA, PRF-MAC, domain extension, CBC-MAC, forgery attack | **Core** |
| **M9 – CCA / Authenticated Encryption** | **L12–L13**, Part IV §§2–3.1 | CCA, AUTH, Encrypt-then-MAC, perché CPA + AUTH ⇒ CCA, attacchi a MtE/E&M | **Core** |
| **M10 – Collision-Resistant Hashing** | **L13**, Part IV §§3.3–3.4 | Collision resistance, Merkle trees, fixed-length MD; non anticipare come già svolta la VIL MD | **Core** |
| **M11 – Post-L13 (da verificare)** | **Nuove lezioni 14+**; programma ufficiale ed esami solo per definire le necessità | ROM, number theory, DDH, RSA, PKE, signatures, identification, LWE/SIS/LPN, IBE **solo nella profondità confermata dalle lezioni** | **Essenziale per l'esame intero; materiale incompleto oggi** |

**Nota didattica:** la priorità non è una probabilità che il quesito esca. Il programma ufficiale resta il vincolo di copertura. Il materiale post-L13 non va ignorato: gli esami mostrano frequentemente PKE, firme e assunzioni decisionali.

---

## 5. Piano per settimane e singole giornate

Questa tabella definisce **l'attività**, non impone di terminare ogni teorema entro l'ora stimata. Per ogni riga si deve chiudere con una prova osservabile: spiegazione a memoria, *proof skeleton* o risposta scritta a un quesito.

### W0 — 19–20 novembre · 6h core · Fondamenta e perfect secrecy

| Giorno | Ore | Blocco | Attività concreta | Evidenza di apprendimento |
|---|---:|---|---|---|
| **Gio 19** | 4 | M0 → M1 | Diagnosi breve di XOR/probabilità; SKE/correctness; perfect secrecy, equivalent distributions e OTP; prime dimostrazioni in inglese | Spiegare perfect secrecy e dimostrare OTP senza leggere |
| **Ven 20** | 2 | M1 | Shannon's lower bound, formulazione game-based, esercizio L10 **uniform ciphertexts vs perfect secrecy** prima della soluzione | Counterexample o proof outline scritto autonomamente |

**Fonte:** `crittografia_L1_L13.md` Part I §§1–2 e Lecture 10, Exercise 1. **Checkpoint W0:** comprendere la differenza tra correttezza, secrecy e indistinguishability.

### W1 — 24–27 novembre · 9h core · Statistical authentication e passaggio a computational security

| Giorno | Ore | Blocco | Attività concreta | Evidenza di apprendimento |
|---|---:|---|---|---|
| **Mar 24** | 3 | M2 | Statistical MAC, forgery, pairwise-independent hashing e affine family; ricostruire un attacco di riuso chiave | Security definition + una prova/attacco |
| **Gio 26** | 4 | M2 | Min-entropy, statistical distance, seeded extractors, **Leftover Hash Lemma**: prima modello mentale e proof skeleton, poi passaggi chiave | Saper spiegare il ruolo di seed, collision probability e bound |
| **Ven 27** | 2 | M3 | PPT, negligible, perché passare alla sicurezza computazionale, OWF e riduzioni; breve check su temi W0 | Definizione OWF + prima riduzione semplice senza appunti |

**Fonte:** Part I §§2–4. **Profondità:** non spendere ore sulla prova combinatoria del t-time MAC key bound, esplicitamente omessa nel corso; trattare LHL seriamente, ma non pretendere di rifarla integralmente in autonomia al primo incontro.

### W2 — 1–4 dicembre · 9h core · PRG, hard-core e inizio PRF/CPA

| Giorno | Ore | Blocco | Attività concreta | Evidenza di apprendimento |
|---|---:|---|---|---|
| **Mar 1** | 3 | M3 → M4 | Computational indistinguishability, PRG security game, stretch amplification e hybrid arguments; scegliere cosa falsifica un PRG | Una mini-riduzione o un distinguisher valido |
| **Gio 3** | 4 | M4 | Hard-core predicates, OWP → one-bit PRG, enunciato GL, PRG-OTP e prova; esercizio L10 **PRG n→2n implies OWF** | Scrivere uno *skeleton* di riduzione e quantificare advantage |
| **Ven 4** | 2 | M5 | PRF game, lazy sampling, CPA security e perché una SKE deterministica fallisce; recall di PRG/OWF | Definizioni PRF/CPA + attacco al determinismo |

**Fonte:** Part II L5–L7 e Lecture 10, Exercise 2a. **Profondità:** la prova completa della proprietà hard-core di GL e OWF generale → PRG sono segnalate come omesse dal professore: sapere enunciati, intuizione e percorso OWP; non investire ore non giustificate nella prova generale.

### W3 — 8–11 dicembre · 6h core + 3h flessibili · CPA/GGM/PRP

| Giorno | Ore | Stato | Blocco | Attività concreta |
|---|---:|---|---|---|
| **Mar 8** | 3 | **Flessibile** | M5 | Prova completa CPA di PRF-OTP; evento nonce collision; esercizio di PRF candidate da L10 |
| **Gio 10** | 4 | **Core** | M5 → M6 | Ripresa dei passaggi indispensabili CPA; GGM tree, *multiple PRG lemma*, prova GGM a grandi linee e ibridi |
| **Ven 11** | 2 | **Core** | M6 → M7 | Esercizio genuino su GGM/PRF, poi introduzione PRP/Feistel e distinguisher a 1–2 round |

**Fallback se salta mar 8:** spostare la dimostrazione CPA di PRF-OTP nei primi 60–90 minuti di gio 10; completare GGM ven 11 e differire parte di Feistel a mar 15. **Non saltare CPA o GGM per rispettare la riga successiva.**

**Fonte:** Part II L7–L8, Part III L9 §1–3, Lecture 10 Exercise 3. **Checkpoint W3:** indicare correttamente in una prova GGM dove si usa la seed independence e perché gli ibridi sono polynomialmente molti.

### W4 — 15–18 dicembre · 9h core · Modes, MAC, CCA e primi hash

| Giorno | Ore | Blocco | Attività concreta | Evidenza di apprendimento |
|---|---:|---|---|---|
| **Mar 15** | 3 | M7 | Feistel 2-round distinguisher e 3-round theorem (se non già fatto), CTR mode e prova CPA; uno dei problemi L10 | Dimostrare/riassumere CTR CPA e costruire attacco a 2 round |
| **Gio 17** | 4 | M8 → M9 | UF-CMA/MAC da PRF, CBC-MAC (FIL vs VIL), CCA, integrity, EtM vs MtE/E&M | Attacco MAC originale e proof skeleton di CPA+AUTH⇒CCA |
| **Ven 18** | 2 | M9 → M10 | EtM formal proof *outline*, collision-resistant hashing, Merkle–Damgård a lunghezza fissa | Risposta scritta breve su EtM/CCA oppure CRH senza note |

**Fonte:** Part III L9–L10 e Part IV L11–L13. **Rischio:** è una settimana densa. Se necessario, differire *formal proof* di MD a mar 22, **non** sacrificarne definizione e security model. Esercizi originali pertinenti: L11 slide 22 CBC-MAC, L12 slide 6 PRF-OTP fails CCA, L12 slide 13 break MtE.

### W5 — 22–25 dicembre · 3h core + 6h flessibili · Chiudere L13 e aprire Post-L13

| Giorno | Ore | Stato | Blocco | Attività concreta |
|---|---:|---|---|---|
| **Mar 22** | 3 | **Core** | M10 + ingresso M11 | Fixed-length Merkle–Damgård e collision-resistance proof, oppure recupero lacune M8/M9; introdurre DDH/PKE se il checkpoint lo consente |
| **Gio 24** | 4 | **Flessibile** | M11 | Number theory, DDH/DLOG, ElGamal CPA e anonimità; utilizzare **nuove lezioni ufficiali** se già disponibili |
| **Ven 25** | 2 | **Flessibile** | M11 | Esercizio di ElGamal/anonymous PKE da compito precedente, seguito da correzione critica |

**Fallback senza le festività:** mar 22 resta un checkpoint di L1–L13; la parte PKE passa obbligatoriamente nelle priorità di mar 29 e mar 5, segnalando **copertura post-L13 insufficiente**. Se possibile, recuperare almeno una delle sessioni flessibili in giorni non festivi.

### W6 — 29 dicembre – 1 gennaio · 3h core + 6h flessibili · Post-L13 e tecniche asimmetriche

| Giorno | Ore | Stato | Blocco | Attività concreta |
|---|---:|---|---|---|
| **Mar 29** | 3 | **Core** | M11 | PKE security games, DDH/ElGamal e RSA **secondo lezioni disponibili**; un proof-or-attack autentico |
| **Gio 31** | 4 | **Flessibile** | M11 | Digital signatures, UF-CMA, costruzioni da RSA/DLOG, Fiat–Shamir se trattato; primo esercizio originale |
| **Ven 1 gen** | 2 | **Flessibile** | M11 | ROM, LWE/identification/IBE secondo copertura reale; richiamo cumulativo |

**Regola Post-L13:** se le lezioni 14+ non sono arrivate, usare il programma e `Cryptography.pdf` **solo come preparazione provvisoria**. Distinguere ciò che è effettivamente trattato nel 2026/27 da materiale di anni precedenti; non attribuire una lezione inventata a un teorema.

### W7 — 5–8 gennaio · 9h core · Consolidamento e prova completa

| Giorno | Ore | Blocco | Attività concreta | Evidenza di apprendimento |
|---|---:|---|---|---|
| **Mar 5** | 3 | M11 / recupero | Colmare il deficit più importante fra PKE, firme, DDH, hash/ROM, LWE, identification, IBE; niente lettura indiscriminata | Due risposte scritte brevi senza appunti su temi deboli |
| **Gio 7** | 4 | **Mock exam** | **3h di simulazione senza appunti e senza dispositivi**: 3 esercizi + 3 domande aperte da prove autentiche, bilanciati per argomento; 1h correzione diagnostica | Tempo di risposta, qualità prove, errori di formalizzazione |
| **Ven 8** | 2 | Final review | Ripasso esclusivo degli errori più rilevanti, definizioni e prove ricorrenti, mini-test di richiamo; niente nuovi capitoli lunghi | Foglio mentale: modelli, giochi, template delle riduzioni |

**Nota:** se una simulazione completa non è praticabile prima del 7 gennaio, inserirne almeno una *mini-simulazione* da 90–120 minuti tra 18 e 29 dicembre, riducendo contenuto nuovo a bassa priorità. **Meglio una simulazione integrale prima del 7**, usando 3 delle 15h flessibili, per lasciare tempo di correggere le lacune.

---

## 6. Banca iniziale di esercizi autentici: collegamento ai blocchi

Non risolvere questi esercizi durante la costruzione del piano. **Conservare il primo tentativo completamente autonomo** e consultare la soluzione soltanto in correzione.

| ID | Fonte / testo identificabile | Moduli | Tipologia / quando |
|---|---|---|---|
| **EX01** | L10, Exercise 1: uniform ciphertexts vs perfect secrecy (`crittografia_L1_L13.md`) | M1 | Counterexample · **W0** |
| **EX02** | L10, Exercise 2a: PRG `n→2n` implies OWF | M3–M4 | Reduction · **W2**; il prof lo considera di difficoltà da esame |
| **EX03** | L10, Exercise 3: four candidate PRF constructions | M5–M6 | Prove/disprove · **W3–W4** |
| **EX04** | L11, slide 22: CBC-MAC on fixed input length | M8 | UF-CMA proof · **W4** |
| **EX05** | L12, slide 6: PRF-OTP fails CCA; slide 13: break MtE | M9 | Explicit attacks · **W4** |
| **EX06** | `2025-01-13.png`, section 1: random-message one-time secrecy + counter mode | M1/M5/M7 | Proof and formalization · **W4 o ripasso** |
| **EX07** | `2025-06-09.png`, section 1: PRG/PRF SKE variants CPA | M4/M5/M7 | Secure/insecure + reduction · **dopo W4** |
| **EX08** | `2025-02-03.png`, section 1: construct OWF from three functions; OWP→PRG | M3/M4 | Reduction/construction · **W2–W3** |
| **EX09** | `2025-09-08.png`, sections 1–2: PRF construction and circular security | M5/M7 | Proof/disprove · **dopo W4** |
| **EX10** | `june2026_matteo_solutions.pdf`, Exercise 1.1: two PRF-based MAC constructions | M8 | UF-CMA attacks · **dopo W4**, soluzione da verificare |
| **EX11** | `june2026_matteo_solutions.pdf`, Exercise 2.1: order-preserving collision resistance | M10 | CR attack/proof · **W5**, soluzione da verificare |
| **EX12** | `june2026_matteo_solutions.pdf`, Exercise 3.1: shared-r ElGamal for two receivers | M11 | DDH game/rigorous reduction · **dopo PKE**, soluzione da verificare |
| **EX13** | `2025-06-09.png`, section 3: anonymous ElGamal vs RSA | M11 | Definitions + DDH reasoning · **dopo PKE** |
| **EX14** | `2025-11-05.png`, section 3: ROM PRF and prefix-MAC vs concrete MD | M10/M11 | ROM / hash length-extension · **dopo L14+** |
| **EX15** | `2025-09-08.png`, section 3: UF-CMA signature derived from two signatures | M11 | Prove/disprove · **dopo signatures** |
| **EX16** | `2023-07-05.png`: search-LWE reduction and selective UF-CMA signatures | M11 | Advanced reductions · **solo dopo le relative lezioni** |

**Gestione duplicati:** non rifare la stessa formulazione identica senza motivo. Per esempi ripetuti (anonymous PKE, derandomized signatures, circular security, CTR), usare un originale come prima prova e una variante come recupero a distanza. Gli altri compiti già condivisi restano nel corpus: aggiungere gli ID quando vengono introdotti i loro prerequisiti.

**Ordine di tentativo per ogni esercizio:** 5–10m per classificare il problema → 25–60m di lavoro autonomo (in base alla difficoltà) → hint se realmente bloccati → confronto → **error log**. Se il problema richiede ancora concetti non studiati, marcarlo *blocked*, non trasformarlo in una lezione completa non programmata.

---

## 7. Profondità delle dimostrazioni: cosa memorizzare e cosa ricostruire

| Tecnica / teorema | Trattamento richiesto nella roadmap |
|---|---|
| OTP perfect secrecy, Shannon key bound | **Full reconstruction**: semplici, fondativi e allenanti |
| Pairwise independence → one-time MAC | **Full proof** e capacità di attacco al riuso |
| LHL | Comprendere **proof skeleton + passaggi probabilistici chiave**; approfondire integralmente se richiesto dal professore o se emerge lacuna |
| OWF formal security; PPT/negligible | Definizioni precise e riduzioni di base, non formalismo di macchine di Turing superfluo |
| PRG stretch amplification, PRG-OTP | **Full proof / hybrid reasoning**; molto riutilizzabile |
| Goldreich–Levin, general OWF→PRG | Enunciato, intuizione, percorso **OWP→PRG**; le prove generali sono dichiarate omesse in lezione |
| PRF-OTP CPA, random-nonce collision | **Full reduction + bad event bound** |
| GGM security | Costruzione, multiple-PRG lemma e **proof strategy**; tentare in autonomia almeno una transizione ibrida |
| Feistel 1/2 round attacks, 3 round PRP | Attacchi espliciti e struttura della prova a 3 round; non dedicare tempo alla prova 4-round SPRP se fuori programma |
| CTR CPA | **Full game-hopping proof** e gestione dei counter collisions |
| CBC-MAC UF-CMA, CPA+AUTH⇒CCA, EtM | **Proof skeleton formale + attacchi alle alternative**; completare i passaggi che il professore lascia come esercizio |
| Collision resistance e fixed-length MD | Definizione + riduzione al compression function; VIL strengthened MD soltanto quando L14 la conferma |
| Post-L13: PKE, signatures, LWE, ROM, IBE | Profondità da decidere **dopo confronto con le nuove lezioni** e con gli esami, non per analogia con i vecchi appunti |

Non scrivere una prova completa da zero per un argomento esplicitamente non trattato se questo sottrae tempo alle tecniche ricorrenti fondamentali; **ma** non rimuovere una dimostrazione che il professore ha assegnato come esercizio solo perché non compare già svolta nelle dispense.

---

## 8. Checkpoint: come misurare la preparazione

**Tre livelli per ogni sottoargomento:**
- **T — Theory ready:** spiegare il senso, le ipotesi e la definizione senza guardare.
- **P — Proof ready:** ricostruire scheletro e passaggi obbligati, motivando simulazione e perdita di advantage.
- **E — Exam ready:** risolvere un quesito autentico **nuovo**, senza appunti e nel tempo assegnato.

**Non autodefinire E solo per aver capito una soluzione letta.**

**Ogni venerdì** il controllo minimo comprende:
1. Una definizione/security game scritta in inglese senza PDF (5–10m).
2. Una tecnica di prova o un *proof skeleton* (10–20m).
3. Un esercizio reale o una domanda aperta (il resto del tempo disponibile).
4. Error log e decisione **proceed / targeted repair / carry over**.

### Milestone chiave

| Entro | Traguardo osservabile | Rischio se manca |
|---|---|---|
| **20 nov** | Perfect secrecy/OTP: definizione, prova, un controesempio | Fondamenta passive |
| **27 nov** | MAC statistici/LHL: schema e probabilità; OWF e negligible comprensibili | Debolezza matematica nelle riduzioni |
| **4 dic** | PRG, OWP route, PRF/CPA: almeno una riduzione autonoma | Difficoltà generalizzata nei problemi *prove/disprove* |
| **11 dic** | PRF-OTP e GGM: usare correttamente ibridi e PRF games | Blocco su CPA/GGM/Feistel |
| **18 dic** | CTR, UF-CMA, CCA/EtM: sapere impostare proof e attack | Troppi concetti simmetrici non assimilati |
| **22 dic** | L1–L13: definizioni core e proof skeletons; hash/MD almeno avviati | Non resta spazio agli argomenti pubblici |
| **29 dic** | Prima verifica di copertura Post-L13 basata su nuove lezioni e compiti | Intero programma incompleto |
| **7 gen** | Simulazione 3h eseguita e corretta | Mancata calibrazione dello scritto |
| **8 gen** | Solo errori prioritari; nessun grosso capitolo nuovo | Ripasso dispersivo |

### Indicatori minimi, senza falsa precisione

- A una domanda aperta: **definizione corretta**, ipotesi esplicite, costruzione/formulazione precisa, passi logici giustificati.
- A *prove secure*: distinguisher/riduzione simulabile, giochi intermedi corretti, probabilità/advantage coerente.
- A *disprove*: attacco PPT valido, query consentite, output, probabilità di vittoria non trascurabile.
- Al checkpoint: se i prerequisiti essenziali mancano, dedicare i primi 45–90m della sessione seguente alla riparazione; non ricominciare da zero tutto il modulo.

---

## 9. Come affrontare il rischio reale della scadenza di gennaio

La **copertura ufficiale** include argomenti che non sono nelle lezioni L1–L13 attualmente caricate: number theory/DDH, RSA, ElGamal, altre PKE, firme, identification, ROM, LWE/SIS/LPN e IBE. Gli esami mostrano che **PKE e firme sono ricorrenti** nel corpus, quindi saltarle non sarebbe prudente.

### Scenario A — Si riescono a utilizzare/recuperare tutte le 15 ore flessibili

- **69h** totali: usare preferenzialmente gli extra per **Post-L13**, una **simulazione anticipata** e correzioni delle lacune.
- Mar 8 dic → rafforzare CPA/GGM prima dei successivi moduli.
- Gio 24 e Ven 25 → PKE/DDH/ElGamal e un esercizio autentico.
- Gio 31 e Ven 1 gen → signatures/ROM/LWE/identification/IBE **secondo lezioni effettive**, con selezione di profondità.
- Se alcune giornate festive non sono disponibili, **spostare** quelle ore in giorni liberi; non considerarle automaticamente perse o fatte.

### Scenario B — Solo le 54 ore core

- **Rischio alto** di copertura insufficiente del programma completo; la preparazione L1–L13 sarà più solida, ma il Post-L13 resterà compresso.
- Ridurre le rifiniture delle prove omesse dal professore e la parte più astratta non richiesta; preservare security games, riduzioni, CPA/CCA e almeno un problema autentico per famiglia fondamentale.
- Da metà dicembre, introdurre **in parallelo** argomenti Post-L13 verificati, anche se rimane un dettaglio secondario di L13 da consolidare.
- **Raccomandazione:** cercare **10–15h aggiuntive effettive** prima dell'appello, se sostenibile, soprattutto per PKE, firme e simulazione anticipata. Non pretendere che 54h garantiscano padronanza completa dall'inizio.

### Ritmo di aggiornamento

Ogni **venerdì sera** (o fine sessione):
1. Aggiornare lo stato dei moduli M0–M11.
2. Annotare le lezioni 14+ effettivamente tenute e il loro materiale verificato.
3. Contare **ore fatte**, non solo ore messe in calendario.
4. Scegliere i prossimi 2–3 quesiti autentici in base ai prerequisiti effettivamente acquisiti.
5. Se il ritardo previsto supera **3 ore**, spostare i temi non fondamentali nel backlog e **proteggere la prova integrale**.

---

## 10. Tracker da aggiornare durante lo studio

### Progressi dei moduli

| Modulo | Stato contenuto | T | P | E | Ultimo errore / prossima azione |
|---|---|---|---|---|---|
| M0 Prerequisites | Da avviare | ☐ | ☐ | ☐ | |
| M1 Perfect secrecy | Da avviare | ☐ | ☐ | ☐ | |
| M2 Statistical MAC/LHL | Da avviare | ☐ | ☐ | ☐ | |
| M3 Computational foundations | Da avviare | ☐ | ☐ | ☐ | |
| M4 PRG/GL | Da avviare | ☐ | ☐ | ☐ | |
| M5 PRF/CPA | Da avviare | ☐ | ☐ | ☐ | |
| M6 GGM | Da avviare | ☐ | ☐ | ☐ | |
| M7 PRP/CTR | Da avviare | ☐ | ☐ | ☐ | |
| M8 MAC/UF-CMA | Da avviare | ☐ | ☐ | ☐ | |
| M9 CCA/AE | Da avviare | ☐ | ☐ | ☐ | |
| M10 Hashing/MD | Da avviare | ☐ | ☐ | ☐ | |
| M11 Post-L13 | **In attesa di nuove lezioni** | ☐ | ☐ | ☐ | |

### Registro sessioni (duplicare una riga alla volta)

| Data | Ore pianificate | Ore reali | Modulo + fonte | Tentativo autonomo | Errori | Decisione |
|---|---:|---:|---|---|---|---|
| 2026-11-19 | 4 | — | M0/M1 | — | — | — |
| 2026-11-20 | 2 | — | M1 · EX01 | — | — | — |

### Registro errori essenziale

```text
Data / ID esercizio:
Tipo: [definizione / game / riduzione / ibrido / controesempio / inglese]
Errore specifico:
Perché è sbagliato:
Correzione in 1–3 frasi:
Data del nuovo tentativo:
Esito senza aiuti:
```

---

## 11. Istruzioni per avviare una sessione con ChatGPT

1. Indicare **settimana, giorno, modulo e paragrafo** del piano (esempio: `W2, gio 3 dic, M4`).
2. Chiedere all'assistente di usare `Cryptography_Study_Method_Charter.md` e di aprire il paragrafo pertinente di `crittografia_L1_L13.md`; verificare con il materiale ufficiale se emerge un dubbio.
3. Richiedere **spiegazioni tecniche in inglese**, uno step alla volta. Lo studente scrive una breve risposta o prova nei propri appunti prima di proseguire.
4. Concludere con **un tentativo autentico**, feedback e un breve *session log*; non generare un duplicato della lezione.
5. Riportare T/P/E ed eventuale carry-over nella tabella del §10. La sessione seguente deve iniziare da **quell'errore**, non da una nuova spiegazione generica.

**Prompt di avvio riutilizzabile:**

> We are following `Cryptography_Exam_Roadmap_Nov2026_Jan2027.md` and `Cryptography_Study_Method_Charter.md`. Today is **[date]**, session **[Wn/day, hours]**, module **[Mn]**, topic **[precise subsection]**. Start from near-zero assumed knowledge. Explain in English, intuitive before formal, follow Prof. Venturi's notation and proof style, use real professor exercises before invented ones. Work in small interactive steps. Do not reveal full solutions before my attempt. End with active recall, error feedback, an assessment of Theory/Proof/Exam readiness, and the next micro-task. The relevant source file is `crittografia_L1_L13.md` (or the latest verified lecture file).

---

## 12. Decisioni ancora da verificare (senza bloccare l'avvio)

- [ ] Confermare **data esatta** dell'appello (attualmente si assume **11–13 gennaio 2027**).
- [ ] Decidere quali fra 8/24/25/31 dicembre e 1° gennaio possono davvero essere sfruttati o recuperati altrove.
- [ ] Caricare progressivamente le **lezioni 14+** con slide e/o trascrizioni; sostituire le attività provvisorie delle W5–W7 con argomenti effettivamente svolti.
- [ ] Verificare, quando servono, le soluzioni non ufficiali e gli eventuali errori delle dispense.
- [ ] Dopo **W1** e **W3**, aggiornare le stime di difficoltà e la collocazione di blocchi rimasti incompleti.

**Start reale:** **giovedì 19 novembre 2026** con W0/Gio, Moduli M0→M1.  
**Scadenza interna:** **venerdì 8 gennaio 2027**.  
**Criterio finale:** saper argomentare **senza appunti** davanti a costruzioni e domande nuove, usando il modello di sicurezza appropriato e una prova o un attacco rigoroso.
