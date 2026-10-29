# VulcaTest — Specifica delle slide per la discussione (20 min)

**Versione:** 14/10/2026 · **Autore della narrazione:** Luca Gugliotta · **Destinatario:** la chat che realizza le slide nel deck reveal.js.

## 0. Come usare questo documento

- **La fonte della narrazione è la bozza di Luca** (`BOZZA SCRITTA/SLIDE/SLIDE SCRIPT.md`). I collegamenti tra un argomento e l'altro sono suoi e vanno preservati: ogni slide nasce da una domanda lasciata aperta da quella precedente. Non riordinare i blocchi e non cambiare le transizioni senza chiedere.
- I file di ChatGPT (`VulcaTest_Script_*`, `VulcaTest_Specifica_Visiva_*`) sono stati usati solo per controllare i fatti. **Non vanno seguiti come struttura** né come tono del parlato (troppo lunghi: ~4.900 parole contro le ~2.600 della bozza di Luca, che corrispondono già ai 20 minuti).
- Ogni slide ha: **Titolo** (frase che dice il messaggio, regola assertion-evidence) · **Cosa dico** (parlato condensato dalla bozza, nelle parole di Luca: va nelle note relatore, non sulla slide) · **Cosa si vede** · **Animazione** · **Attenzione** (fatti da non sbagliare).
- I titoli proposti sono bozze: Luca può riscriverli. Il resto delle scelte grafiche è libero (vedi §6).
- Regole di riferimento: `claude/linee_guida_slide.md` del progetto (Parberry, Alley, Mayer, Naegle, Peyton Jones, Duarte). Le più importanti sono riassunte nel §6.

## 1. Messaggio centrale

> Il contributo non è un agente capace di arrivare a root, ma un **processo controllato** che verifica il percorso didattico passo per passo, sulla base delle evidenze, e quando trova un difetto prova a ripararlo e lo riverifica.

Questo messaggio va detto nell'introduzione (slide 6), ripreso a metà (slide 8) e ridetto in chiusura (slide 27).

## 2. Mappa e tempi

| Blocco | Slide | Tempo |
|---|---|---|
| 1 — Contesto e problema | 1–6 | ~4:45 |
| 2 — Agenti, architettura e healing | 7–15 | ~7:30 |
| 3 — Valutazione sperimentale | 16–24 | ~6:30 |
| 4 — Conclusioni | 25–27 | ~1:45 |
| **Totale** | **27** | **~20:30** |

Le slide di zoom (10–14) sono stati della stessa figura e durano 40–50 secondi l'una. Se le prove cronometrate sforano: unire 20 dentro 19 (E1 come numero nella slide degli esperimenti) e 16 con 17 (oracolo e Golden Machine in due tempi della stessa slide).

Slide di riserva per le domande (dopo i ringraziamenti, `data-visibility="hidden"` o in coda): matrice degli esiti E2/E3, dettaglio tempi per nodo, modello locale e ottimizzazioni, Attack Plan completo, valutazione supplementare sulle 4 macchine nuove.

## 3. Famiglie visive (da riusare, non reinventare)

1. **Macchina e percorso** — computer B2R, carte che diventano l'intended path, root come arrivo (slide 2, 3, 8, 27).
2. **Pipeline** — una sola fila di fasi che si trasforma: fasi manuali → VulcaMind/VulcaForge/VulcaShip → compare VulcaTest (slide 4, 6, 26).
3. **Architettura** — una sola figura madre con posizioni costanti, mostrata intera e poi a zoom (slide 9–15, versione completa in 25).
4. **Metodo sperimentale** — Golden Machine → perturbazioni → E1/E2/E3 → numeri, con la stessa geometria e palette dei grafici della tesi (slide 16–24).

---

# Blocco 1 — Contesto e problema

## Slide 1 — Copertina
- **Titolo:** VulcaTest: Framework agentico per la verifica di conformità e il self-healing di scenari Cyber Range.
- **Cosa dico:** «Buongiorno a tutti, sono Luca Gugliotta e vi presento il mio progetto di tesi: VulcaTest, un framework agentico per il conformance testing e il self-healing di scenari Cyber Range.»
- **Cosa si vede:** copertina come già decisa (logo Tor Vergata, corso di laurea, titolo, A.A. 2025/2026, candidato, relatore Prof. Francesco Pasquale).
- **Animazione:** quando dice «partendo da quest'ultimo elemento», la parola **Cyber Range** nel titolo si evidenzia e diventa il ponte verso la slide 2 (con `auto-animate` può "scivolare" in basso a sinistra e restare come etichetta nella slide successiva).

## Slide 2 — Che cos'è una macchina Boot-to-Root
- **Titolo:** Una macchina Boot-to-Root è un esercizio: qualcuno la progetta, qualcun altro la risolve.
- **Cosa dico:** i Cyber Range sono ambienti di simulazione per riprodurre scenari realistici di cybersecurity, una risorsa fondamentale per l'apprendimento. Un esempio concreto sono le macchine Boot-to-Root: computer progettati da qualcuno per offrire esercizi su diversi ambiti della sicurezza. Da una parte il **progettista**, dall'altra il **partecipante** (termine scelto per indicare sia lo studente sia chi fa formazione professionale), che deve trovare vulnerabilità e arrivare all'utente con i privilegi massimi, **root**.
- **Cosa si vede:** a sinistra il progettista, al centro un computer stilizzato (SVG, una sola icona, non stock), a destra il partecipante; sopra il computer l'obiettivo `root`. Dal computer escono 3 carte con etichette generiche: `Enumeration`, `Vulnerabilità`, `Privilege escalation`.
- **Animazione:** le carte escono dal computer in un solo fragment.
- **Attenzione:** niente hacker incappucciati, codice di sfondo, terminali pieni. Due figure umane semplici, non una scena.

## Slide 3 — L'intended path
- **Titolo:** Il progettista non decide solo l'arrivo, ma il percorso: l'intended path.
- **Cosa dico:** il progettista definisce un percorso didattico, una sequenza di esercizi con uno o più obiettivi formativi. Nel mio progetto questo percorso si chiama **intended path**. Conta che il partecipante arrivi a root **seguendo il percorso previsto**, non per una strada qualunque.
- **Cosa si vede:** le carte della slide 2 si mettono in fila e diventano tappe di un percorso (componente `fig-path`) che termina in `root`. Piccola etichetta `obiettivi formativi`. Ogni tappa può avere una spunta discreta.
- **Animazione:** `auto-animate` dalle carte sparse al percorso in fila (continuità con la slide 2).
- **Attenzione:** è un esempio concettuale, non un Attack Plan reale. Non mostrare ancora scorciatoie: arrivano nella slide 8.

## Slide 4 — Dalle fasi manuali a VulcAIn
- **Titolo:** Realizzare una macchina richiede tempo: VulcAIn automatizza la generazione con agenti AI.
- **Cosa dico:** la realizzazione segue un processo elaborato: progettazione, sviluppo, distribuzione e testing. Richiede molto tempo. Per far dedicare più tempo all'ideazione esiste **VulcAIn**, un progetto preesistente che automatizza le parti più tediose delegandole ad agenti AI: da una descrizione in input esce una macchina vulnerabile. Ma generare una macchina spesso non è un processo one-shot, soprattutto per la variabilità degli agenti AI.
- **Cosa si vede:** una fila orizzontale di 4 fasi `Progettazione → Sviluppo → Distribuzione → Testing`. Nel secondo stato le prime tre diventano `VulcaMind`, `VulcaForge`, `VulcaShip` raggruppate sotto `VulcAIn`, con `descrizione` in ingresso e `macchina vulnerabile` in uscita. La fase `Testing` resta distinta e manuale.
- **Animazione:** la **stessa geometria** cambia etichette (auto-animate), non un nuovo diagramma. Niente orologio.
- **Attenzione:** VulcAIn è di Danilo Dell'Orco e Michele Salvatori, non di Luca. Qui si dice "agenti AI" senza spiegare cosa sia un agente (lo si fa nella slide 7).

## Slide 5 — La Pizzeria: la chat che manca
- **Titolo:** La macchina funziona, ma un passaggio del percorso didattico non c'è.
- **Cosa dico:** un esempio che possiamo analizzare è una macchina, Pizzeria, che ho generato personalmente con VulcAIn. È stata realizzata correttamente, ma presentava un problema di conformità rispetto al piano didattico: doveva esserci una chat di assistenza nell'interfaccia web, che avrebbe portato il partecipante al passaggio successivo. La chat non c'era.
- **Cosa si vede:** screenshot `Artefatti/Pizzeria_Demo/01_web_PRIMA_senza_chat.png` grande, **a sfondo scuro così com'è** (Luca eventualmente fornirà una versione chiara). Sotto la colonna "Servizi Rapidi", nel punto dove dovrebbe stare il riquadro della chat, un riquadro tratteggiato con `chat di assistenza prevista` e un punto interrogativo, cerchio rosso discreto.
- **Animazione:** prima lo screenshot, poi il riquadro tratteggiato.
- **Attenzione:** non anticipare qui il link diretto usato come scorciatoia (arriva nella slide 8) né la correzione (slide 15). Questa Pizzeria "storica" **non è** la perturbazione Pizzeria P1-01 del benchmark: non confonderle.

## Slide 6 — Nasce VulcaTest
- **Titolo:** VulcaTest automatizza la verifica del percorso e la sua correzione.
- **Cosa dico:** serve controllare l'operato degli agenti per verificare che le macchine rispettino l'intended path. Oggi lo fanno degli operatori, in un ciclo di verifica e correzione. Ma l'idea di VulcAIn è ridurre le fasi noiose, e il testing con la correzione dei bug è sicuramente tra queste. Da qui nasce **VulcaTest**, progettato per automatizzare due attività: **verifica** e **correzione**. Il primo problema incontrato è che bisogna automatizzare qualcosa che richiede di interpretare output ed eseguire comandi su una macchina vulnerabile.
- **Cosa si vede:** la pipeline della slide 4 si sposta a sinistra; al posto del `Testing` manuale compare un piccolo ciclo `verifica ↔ correzione` con un operatore; poi il ciclo viene sostituito da un box **VulcaTest** con due etichette `Verifica` e `Correzione`. Legenda minima: VulcAIn preesistente, VulcaTest contributo della tesi.
- **Animazione:** auto-animate dalla slide 4 (stessa geometria), poi un fragment per la comparsa di VulcaTest.
- **Attenzione:** l'integrazione end-to-end con VulcaShip non esiste ancora: se c'è una freccia VulcaShip → VulcaTest, tratteggiata.

---

# Blocco 2 — Agenti, architettura e healing

## Slide 7 — Dall'LLM all'agente: l'harness
- **Titolo:** Un LLM da solo genera testo: l'harness gli permette di agire.
- **Cosa dico:** il compito si può delegare a un LLM capace di interpretare le osservazioni e scegliere le azioni successive. Ma un LLM, ricevuta una sequenza di testo, ragiona e genera altro testo: non può eseguire comandi né interagire con l'ambiente. Per questo esistono gli **harness**, software che avvolgono l'LLM e gli permettono di percepire e agire tramite chiamate a tool.
- **Cosa si vede:** stato 1: `testo → LLM (ragionamento) → testo`. Stato 2: un contorno etichettato `harness` avvolge l'LLM e una doppia freccia `azioni / osservazioni` lo collega a una macchina.
- **Animazione:** un fragment: compare l'harness e poi la doppia freccia.
- **Attenzione:** niente transformer, token o "cervelli digitali".

## Slide 8 — Perché un harness general-purpose non basta
- **Titolo:** Arrivare a root non è verificare il percorso.
- **Cosa dico:** sul mercato esistono diversi harness agentici; si chiede un'attività e l'agente la esegue sulla macchina. Sembrerebbe la soluzione fatta e finita, ma l'obiettivo di VulcaTest non è eseguire comandi che portano a root: è **verificare un percorso ben definito**. Sono due operazioni che sembrano simili ma sono diverse: gli harness general-purpose privilegiano la flessibilità tra il punto A e il punto B per ottenere il risultato; VulcaTest ha bisogno di aderenza al piano step by step, riducendo i comandi che si discostano dall'intended path e tenendo traccia di tutte le evidenze. *(Una frase sulla Pizzeria:)* «Con la Pizzeria è successo proprio questo: invece di usare la chat, l'agente ha usato un link rimasto nella pagina ed è arrivato comunque in fondo.» Serve quindi un agente meno flessibile, su cui avere più controllo e la certezza che esegua un piano prestabilito raccogliendo le evidenze.
- **Cosa si vede:** in alto 3 loghi piccoli in grigio (Antigravity, Claude Code, Codex). Al centro due percorsi verso `root` con la grammatica della slide 3: sopra `harness general-purpose`, che salta una tappa con una scorciatoia; sotto `VulcaTest`, che passa da tutte le tappe con una spunta e un'icona di evidenza per tappa. Sotto ciascuno 2 parole chiave (`flessibilità verso il risultato` / `aderenza agli step + evidenze`). Ritaglio piccolo dello screenshot "prima" con il link **"Consulta gli orari delle sedi"** cerchiato, collegato alla scorciatoia.
- **Animazione:** prima i due percorsi, poi (fragment) il ritaglio della Pizzeria.
- **Attenzione:** è una scelta di **identità narrativa** di Luca che il riferimento alla Pizzeria resti una sola frase e un piccolo ritaglio: non deve diventare il centro della slide. Non è un confronto tra prodotti né una legge generale ("l'harness generico prende sempre scorciatoie"). Il percorso di VulcaTest non deve sembrare rigido: dentro lo step l'agente può tentare e adattarsi.

## Slide 9 — L'architettura d'insieme
- **Titolo:** Ogni componente ha un compito: pianificare, eseguire, valutare, correggere.
- **Cosa dico:** queste necessità, cioè trovare il giusto equilibrio tra la flessibilità dell'agente e il controllo sul percorso, hanno guidato la progettazione. L'architettura è composta da nodi con compiti diversi: il **Planner** prepara il percorso, l'**Executor** lo esegue, il **Final Evaluator** interpreta i risultati, il nodo di **healing** interviene quando serve; tutto è coordinato da un **Orchestrator**.
- **Cosa si vede:** versione **semplificata** della Fig. 3.1: `Planner → Attack Plan → Executor ⇄ Bridge → Target → Final Evaluator → problema? (sì/no) → Healing → Rebuild → re-test`. L'**Orchestrator** è una cornice o fascia che abbraccia tutti i nodi (coordina l'intero workflow, non sta dentro l'Executor). Nessun altro blocco condizionale: gli altri dettagli si scoprono negli zoom. Zone per fase (Pianificazione · Esecuzione · Valutazione e healing) come nella versione attuale del deck. Legenda minima: componente VulcaTest / strumento esterno (tratteggiato).
- **Animazione:** nessuna; questa figura diventa la mini-mappa degli zoom successivi.
- **Attenzione:** la figura completa con i due Start (Planning & Execution Mode / Execution Mode) compare **solo nella slide 25**.

## Slide 10 — Zoom: Planner e Attack Plan
- **Titolo:** L'LLM scrive il piano, il codice lo rende verificabile.
- **Cosa dico:** il Planner usa la documentazione della challenge per generare un piano diviso in step, ognuno con un obiettivo e delle condizioni verificabili. La **checklist** è importante: l'esecutore non deve solo svolgere il lavoro, ma certificare step by step cosa sta facendo, con le evidenze per ogni voce. Questo spinge il modello a ragionare su ciò che spunta. Il Planner ha una parte di generazione testuale con un LLM, poi una parte deterministica che trasforma il piano in strutture dati scambiate durante l'esecuzione.
- **Cosa si vede:** `documentazione → LLM → ATTACK_PLAN.md → parser (codice) → TestStep`. Accanto, una lente su uno step con 3 campi evidenziati: `objective`, `allowed_tools`, `checklist`. **Estratto di Attack Plan: placeholder chiaramente etichettato**, Luca inserirà quello reale (lo stesso del Listato del §3.4).
- **Animazione:** fragment: prima il flusso, poi la lente sullo step con la checklist.
- **Attenzione:** il parser controlla la **struttura**, non la correttezza semantica del piano. Non inventare YAML che sembri autentico.

## Slide 11 — Zoom: Executor e Orchestrator
- **Titolo:** L'agente sceglie le azioni dentro lo step, il codice decide quando si passa al successivo.
- **Cosa dico:** una volta definito il percorso bisogna eseguirlo. L'Executor riceve uno step alla volta, effettua le operazioni tramite tool calling al Bridge e riporta le evidenze con la checklist spuntata; a ogni turno sceglie l'azione in base a ciò che osserva. L'Executor è diviso in due: un **LLM** che ragiona, agisce e osserva, e una parte di **codice** che gli dà i tool consentiti, conta i turni e raccoglie il risultato. L'Orchestrator segue cosa fa l'Executor, invia uno step alla volta e, prima di considerarlo superato, controlla che tutta la checklist sia stata spuntata. Per evitare loop di chiamate, l'Executor ha un numero massimo di turni per step, estendibile fino a un tetto massimo.
- **Cosa si vede:** a sinistra `Orchestrator` che consegna `step n`; al centro il box `Executor` diviso in due: in alto `LLM` con il ciclo `ragiona → agisce → osserva`, in basso `codice` con `tool consentiti`, `budget turni`, `StepResult`; a destra la freccia verso il Bridge (approfondito subito dopo); in basso il ritorno all'Orchestrator `checklist completa? → step n+1`.
- **Animazione:** fragment in due tempi: prima il ciclo dell'LLM, poi il controllo della checklist e il passaggio allo step successivo (riprende la figura `ciclo` già nel deck).
- **Attenzione:** il budget riguarda i **turni dentro uno step**, non il numero di step del piano. L'LLM non può cambiare il piano. Non scrivere valori numerici di configurazione.

## Slide 12 — Zoom: il Bridge
- **Titolo:** Il Bridge dà all'agente solo gli strumenti che servono allo step.
- **Cosa dico:** in che modo l'Executor interagisce con la macchina target? Ho realizzato un Bridge che collega l'Executor a due server di tool. Il primo, **HexStrike**, non l'ho realizzato io: espone molti strumenti, ma è stateless. Per questo ho implementato un secondo server, il **Terminal Gateway**, eseguito sulla macchina Kali, che permette all'agente di usare più sessioni di shell contemporaneamente, come più schermate aperte, introducendo un approccio stateful. Una scelta che ci tengo a evidenziare: il Bridge permette di aggiungere in futuro nuovi server. Inoltre l'Executor non riceve tutti i tool insieme: in base al piano vengono filtrati quelli non necessari allo step, per dargli meno margine di manovra e avere il controllo diretto su ciò che passa tra l'LLM e i server.
- **Cosa si vede:** `Executor → Bridge` che si apre in due rami: `HexStrike` (tratteggiato, esterno, etichetta `stateless`) e `Terminal Gateway` (pieno, suo, con 2–3 piccole finestre di terminale sovrapposte `sessione A`, `sessione B`); entrambi su `Kali → Target`. Accanto un piccolo catalogo di tool: alcuni accesi, altri sbiaditi, etichetta `filtrati per step`. Uno slot vuoto tratteggiato `nuovi server` per dire l'estendibilità.
- **Animazione:** fragment: prima i due server, poi il filtro dei tool.
- **Attenzione:** la persistenza è delle sessioni gestite dal Gateway sulla Kali. Contenuto dei terminali illustrativo e generico (nessun comando reale di attacco).

## Slide 13 — Zoom: Final Evaluator e le due visioni
- **Titolo:** Il test guarda la macchina da fuori, la correzione da dentro.
- **Cosa dico:** dopo gli step, VulcaTest deve produrre un risultato facile da interpretare a partire dalla miriade di evidenze raccolte: ogni step, ogni output, ogni errore. Il **Final Evaluator** riassume le evidenze in un report e, se il test fallisce, prepara un ticket per il nodo di healing. Prima di vedere come si corregge un problema, distinguo due punti di vista: tutto ciò visto finora fa testing con una **visione esterna**, vede la macchina come chi affronta la challenge. Il nodo di healing invece ha una **visione interna**: analizza e modifica i sorgenti, esplorando codice e configurazioni.
- **Cosa si vede:** stato 1: più StepResult che convergono in `Final Evaluator → report` e, in caso di fallimento, `ticket`. Stato 2: la stessa macchina target vista come scatola chiusa (`servizi esposti`, a sinistra, con Executor e Kali) e poi "aperta" (`sorgenti e configurazioni`, a destra, con l'healing).
- **Animazione:** auto-animate dalla macchina chiusa alla macchina aperta (stesso oggetto, non due target).
- **Attenzione:** il ticket contiene un'**ipotesi** sulla causa, non una causa certa. Luca cambierà in-band/out-of-band anche nella tesi: a schermo e a voce si dice solo **visione esterna / visione interna**.

## Slide 14 — Zoom: il nodo di healing
- **Titolo:** Per correggere serve flessibilità, ma dentro dei limiti.
- **Cosa dico:** ciò che prima avevamo detto non adatto alla verifica qui diventa utile. Un harness general-purpose, in questo caso **Antigravity**, dà quella flessibilità che l'esecuzione non doveva avere: risolvere un problema ha molte sfaccettature, tra lettura del codice, correzioni e nuove risorse. Questo però avviene con dei limiti e raccogliendo le evidenze: si tiene traccia di tutto ciò che il nodo modifica, salvando un file con le righe cambiate o aggiunte; si limita il numero di chiamate a questo nodo; con prompt molto restrittivi si chiede di non dare suggerimenti, non facilitare la challenge e non toccare le vulnerabilità didattiche.
- **Cosa si vede:** al centro il logo **Antigravity** (tratteggiato, esterno) dentro una cornice **VulcaTest** (suo). Intorno alla cornice tre richiami, ciascuno con una piccola icona e 2–3 parole: `diff delle modifiche`, `tentativi limitati`, `vincoli nel prompt`. In ingresso `ticket + report`, in uscita `patch`.
- **Animazione:** prima Antigravity da solo, poi la cornice e i tre vincoli insieme (un fragment).
- **Attenzione:** i vincoli non sono una sandbox infallibile. L'healing non modifica l'Attack Plan né i criteri del test.

## Slide 15 — Il ciclo si chiude: rebuild e re-test (Pizzeria dopo)
- **Titolo:** Una correzione vale solo se supera di nuovo tutto il test.
- **Cosa dico:** finita la correzione è fondamentale rifare il test per chiudere il ciclo: la macchina viene ricostruita e testata di nuovo **dall'inizio**, con lo **stesso Attack Plan**. Torniamo alla Pizzeria: il nodo di healing ha aggiunto la chat mancante, e ora alla domanda sugli orari l'assistente indica la pagina giusta. *(Transizione:)* Dopo aver definito VulcaTest viene spontaneo chiedersi: come possiamo dimostrare che funziona davvero?
- **Cosa si vede:** stato 1: il ciclo semplice `test → valutazione → healing → rebuild → re-test` con la freccia che torna **all'inizio** del test, etichetta `stesso Attack Plan`; colore terracotta solo sul ritorno (come nel deck). Stato 2: confronto `prima` / `dopo` con `01_web_PRIMA_senza_chat.png` e `03_web_DOPO_interazione_chat.png` (eventualmente `02_web_DOPO_con_chat.png` se più leggibile), sfondo scuro come sono.
- **Animazione:** auto-animate dal ciclo al prima/dopo, oppure due slide brevi.
- **Attenzione:** la correzione mostrata **l'ha fatta il nodo di healing di VulcaTest** (confermato da Luca). Anche qui è la Pizzeria storica, non P1-01 del benchmark.

---

# Blocco 3 — Valutazione sperimentale

## Slide 16 — Il problema dell'oracolo
- **Titolo:** COMPLETED o FAILED non bastano a dire se il test ha ragione.
- **Cosa dico:** per questo tipo di framework non esistono benchmark o dataset già pronti. Per stabilire se VulcaTest valuta bene una macchina bisogna affrontare un problema noto, il **test oracle problem**: non basta vedere se la run è finita con COMPLETED o FAILED, perché l'esito può dipendere da molti fattori (la macchina, l'agente, uno strumento, il piano). Serve un riferimento indipendente che dica in anticipo il comportamento atteso.
- **Cosa si vede:** due parole grandi `COMPLETED ?` e `FAILED ?`, sotto ciascuna le possibili cause in piccolo; in basso `serve un riferimento indipendente`.
- **Animazione:** nessuna o un solo fragment per la frase in basso.

## Slide 17 — Golden Machine
- **Titolo:** Prima di misurare, ho costruito macchine di riferimento corrette a mano.
- **Cosa dico:** per farlo con rigore ho generato con VulcAIn diverse macchine, poi le ho risolte e corrette: dietro c'è un lavoro di analisi dei problemi e di correzione, fino ad avere macchine in cui l'intended path si percorre senza problemi. Sono le **Golden Machine**.
- **Cosa si vede:** tante piccole macchine grigie entrano in un nodo `revisione e correzione` ed escono "d'oro" (colore dorato sobrio o contorno, etichetta `Golden Machine`).
- **Animazione:** le macchine attraversano il nodo (un fragment o auto-animate).
- **Attenzione:** il Golden Plan **non** si introduce qui (scelta narrativa di Luca: arriva con E2). "Golden" = considerata conforme dopo revisione, non priva di qualsiasi difetto.

## Slide 18 — Perturbazioni controllate
- **Titolo:** Su ogni macchina corretta introduco un difetto noto.
- **Cosa dico:** su queste macchine ho realizzato delle perturbazioni controllate. Ognuna è specifica della sua macchina, ma si raccolgono in tre categorie: **P1** toglie un elemento necessario al percorso, **P2** lascia l'elemento ma ne altera un valore (per esempio una password o una chiave), **P3** aggiunge una scorciatoia non prevista. Applicandole a una Golden Machine possiamo fare controlli mirati e ridurre molto l'ambiguità sulla causa del problema.
- **Cosa si vede:** una Golden Machine al centro con tre varianti con la stessa forma base: P1 una tappa del percorso mancante (tratteggio barrato), P2 una tappa con un valore sbagliato (chiave rossa), P3 un ramo aggiuntivo che porta a root saltando tappe mentre il percorso originale resta. Piccola separazione: `P1 · P2 → conformità` / `P3 → esplorativa`.
- **Animazione:** P1, P2, P3 compaiono in sequenza (fragment).
- **Attenzione:** non tutte le macchine hanno una P1, una P2 e una P3 (15 perturbazioni su 8 macchine, progettate per singola challenge).

## Slide 19 — Tre esperimenti, uno per componente
- **Titolo:** Tre esperimenti per isolare pianificazione, rilevazione e correzione.
- **Cosa dico:** sono nati tre esperimenti, ognuno con un focus su cosa isolare. **E1** isola il Planner: genera ogni volta un piano nuovo e lo esegue sulla Golden Machine. **E2** isola la rilevazione: per non far dipendere il risultato da un piano diverso ogni volta, ho fissato per ogni macchina un **Golden Plan**, un piano corretto e verificato che deresponsabilizza il Planner in questi test. **E3** isola il nodo di healing: quando in E2 parte una correzione, si controlla se la patch è valida e se il re-test arriva in fondo. In numeri: 8 Golden Machine, 15 perturbazioni, 108 run, di cui 24 per E1 e 84 per E2; dentro le run di E2 ci sono 36 sessioni di healing, valutate in E3.
- **Cosa si vede:** tre flussi paralleli brevi (dalla Fig. 5.1):
  E1 `documentazione → Planner → piano nuovo → Golden Machine → esito`;
  E2 `Golden Plan → Golden / Perturbata → ticket?`;
  E3 `ticket → healing → rebuild → re-test`.
  In basso una barra di 108 unità divisa in 24 (E1) e 84 (E2), con una parentesi dentro E2 per le 36 sessioni di healing.
- **Animazione:** E1, E2, E3 in sequenza; la barra dei numeri per ultima.
- **Attenzione:** le 36 sessioni di healing sono **dentro** le 84 run di E2, non si sommano alle 108. Nessun esperimento isola un nodo in modo perfetto: dirlo con "per quanto possibile".

## Slide 20 — E1: pianificazione
- **Titolo:** I piani generati dal Planner completano il percorso in 20 run su 24.
- **Cosa dico:** misura quante volte il piano generato arriva in fondo sulla Golden Machine. Su 24 run, 20 COMPLETED: 83,3%. È un tasso di completamento operativo: un piano corretto può comunque fermarsi per problemi in esecuzione.
- **Cosa si vede:** formula grande e numeri sostituiti:
  $SR_{E1} = \dfrac{N_{COMPLETED}}{N_{run}} = \dfrac{20}{24} = 83{,}3\%$
  e una barra di 24 quadratini (20 pieni, 4 vuoti).
- **Attenzione:** non chiamarla "accuratezza del Planner".

## Slide 21 — E2: rilevazione delle non conformità
- **Titolo:** VulcaTest segnala 38 macchine perturbate su 40, con un solo falso allarme.
- **Cosa dico:** si considerano P1 e P2, che toccano l'intended path; una segnalazione è l'emissione del ticket. Su 40 run perturbate VulcaTest ha emesso il ticket in 38 casi, e sulle 24 run delle Golden Machine ha dato un solo falso allarme. **Recall**: di tutte le macchine rotte, quante ne becco, 95%. **Precision**: quando dico "rotta", quante volte ho ragione, 97,4%. **F1** mette insieme le due in un solo valore, 96,2%. *(Se serve: specificity, quante macchine sane non segnalo, 95,8%.)*
- **Cosa si vede:** matrice 2×2 grande (`fig-confusion`): righe `perturbata P1/P2` / `golden`, colonne `ticket` / `nessun ticket`; TP 38, FN 2, FP 1, TN 23. Accanto le formule con i numeri:
  $\text{Recall} = \dfrac{TP}{TP+FN} = \dfrac{38}{40} = 95\%$
  $\text{Precision} = \dfrac{TP}{TP+FP} = \dfrac{38}{39} = 97{,}4\%$
  $F_1 = \dfrac{2TP}{2TP+FP+FN} = 96{,}2\%$
  (Specificity $= \dfrac{TN}{TN+FP} = \dfrac{23}{24} = 95{,}8\%$ solo se non affolla.)
- **Animazione:** prima la matrice, poi le formule (fragment).
- **Attenzione:** la metrica misura l'emissione del ticket, non che la causa individuata sia corretta. Il 95% vale per 38 run su 40, non per 40 macchine. Le P3 sono fuori da questa matrice.

## Slide 22 — E3: correzione e re-test
- **Titolo:** 35 correzioni valide su 36 al primo tentativo, 33 confermate dal re-test.
- **Cosa dico:** in E3 c'è un solo tentativo di healing per sessione. Controllando a mano le modifiche, 35 correzioni su 36 sono valide: 97,2%. Ma una patch corretta non basta: il re-test completo è arrivato a COMPLETED in 33 casi su 36, 91,7%. Nei due casi di differenza la patch era giusta, ma il re-test si è fermato per problemi operativi; nel caso rimanente l'agente non ha proposto una correzione.
- **Cosa si vede:** due formule e due barre con lo stesso denominatore 36:
  $SR_{E3} = \dfrac{N_{correzioni\ valide}}{N_{healing\ eseguiti}} = \dfrac{35}{36} = 97{,}2\%$
  $SR_{re\text{-}test} = \dfrac{N_{re\text{-}test\ COMPLETED}}{N_{healing\ eseguiti}} = \dfrac{33}{36} = 91{,}7\%$
  (la seconda formula **non è nella tesi**: introdotta per le slide con la stessa notazione; Luca decide se aggiungerla al §5.4.3). In alternativa un waffle di 36 quadratini con tre colori: 33 · 2 · 1.
- **Attenzione:** le 36 sessioni sono dentro E2. Non presentare i 3 casi come "patch sbagliate".

## Slide 23 — Tempi e modello locale
- **Titolo:** Tutto il test gira in locale, su una sola GPU da 16 GB.
- **Cosa dico:** una run di verifica in E2 dura in media circa 14 minuti; un ciclo completo con healing e re-test circa 35 minuti. Una cosa importante per questa tesi, che mi ha permesso di superare i limiti dei modelli commerciali, è l'uso di un modello locale, **Qwen 3.8 27B quantizzato**: con il tuning che ho fatto e lo speculative decoding MTP + n-gram ho raggiunto prestazioni notevoli per l'hardware disponibile, in media **45 token al secondo** con una finestra di contesto fino a **40k**. Il nodo di healing usa invece Antigravity.
- **Cosa si vede:** a sinistra una barra orizzontale a segmenti del ciclo completo (dalla Fig. 5.3): `verifica 11,1 min | healing 8,3 min | re-test 15,4 min` = `34 min 50 s`; sotto, in piccolo, `verifica E2 su 84 run: 14 min 05 s`. A destra una banda tecnica: `Qwen 3.8 27B · IQ3_S · 16 GB VRAM · 64 GB RAM · MTP + n-gram · ~45 tok/s* · contesto fino a 40k*`. Token medi: `xx` (**TODO Luca**).
- **Attenzione:** `45 tok/s` e `40k` sono **da verificare** da Luca (marcati con asterisco finché non confermati). I tempi 11,1 min (35 cicli) e 14,1 min (84 run) hanno campioni diversi: non vanno sommati né confrontati. Non sommare i token di Qwen con quelli di Antigravity. Non stampare `xx` nella versione finale.

## Slide 24 — P3: il limite della copertura
- **Titolo:** VulcaTest controlla ciò che il piano chiede: le scorciatoie non previste restano fuori.
- **Cosa dico:** oltre alle P1 e P2 ho fatto test trasversali al focus principale della tesi, con le P3, che richiedono una capacità che oggi l'agente non ha in modo autonomo: riconoscere unintended path e scorciatoie. Questa autonomia è limitata, per scelta, dalla necessità di dire esattamente all'Executor cosa deve fare: le uniche segnalazioni sono arrivate su una sola macchina, Citadel, il cui piano conteneva già controlli vicini alla scorciatoia. L'Executor è ottimo per eseguire ciò che gli viene detto, ma volutamente troppo stretto per esplorare oltre il piano. È un limite di copertura, coerente con lo scopo del conformance testing.
- **Cosa si vede:** il percorso della slide 3 con il ramo P3 della slide 18 accanto, il ramo fuori dal "cono" di ciò che il piano controlla (zona evidenziata `controllato dal piano`). Dato piccolo: `ticket in 4 run P3 su 20, tutte su Citadel`.
- **Attenzione:** **non** dire "non è una limitazione del sistema": dire che è un limite di copertura voluto. Il 4/20 non è una recall delle scorciatoie: niente grafico intitolato "20% detection". NetVault **non** si cita (scelta di Luca).

---

# Blocco 4 — Conclusioni

## Slide 25 — Ricapitolando
- **Titolo:** VulcaTest porta in VulcAIn un ciclo controllato di verifica e correzione.
- **Cosa dico:** ricapitolando abbiamo visto VulcaTest e il suo contributo a VulcAIn. Gli esperimenti mostrano che, nelle condizioni considerate, il framework verifica le macchine, segnala le non conformità e produce correzioni confermate da un nuovo test. Allo stesso tempo l'affidabilità dipende molto dalla qualità dell'Attack Plan.
- **Cosa si vede:** **l'architettura completa** (Fig. 3.1 adattata, con entrambi gli Start, zone per fase, transizioni etichettate come nella tesi), mostrata per l'unica volta. Nessuna nuova batteria di numeri.
- **Animazione:** auto-animate dalla versione semplificata della slide 9 alla completa, se l'effetto regge.

## Slide 26 — Sviluppi futuri
- **Titolo:** Due direzioni: esplorare oltre il piano e unire tutta la pipeline.
- **Cosa dico:** il primo sviluppo, che riprende le P3, è affiancare alla verifica di conformità una componente **esplorativa**, capace di cercare comportamenti indesiderati non previsti dal piano. Il secondo è integrare le componenti di VulcAIn in un **unico workflow end-to-end**, dalla generazione alla verifica, con un'**interfaccia grafica** per gestire e monitorare il processo. La modularità dell'architettura permette di pensare a queste estensioni senza riprogettare tutto.
- **Cosa si vede:** due metà. Sinistra: il percorso con un secondo agente tratteggiato che esplora rami laterali (`testing esplorativo`, etichetta `futuro`). Destra: la pipeline `VulcaMind → VulcaForge → VulcaShip → VulcaTest` unita in una sola barra, con un piccolo bozzetto di finestra `GUI`.
- **Attenzione:** entrambi sono **futuri**, non risultati. Solo due direzioni.

## Slide 27 — Contributo e grazie
- **Titolo:** Il percorso conta quanto root.
- **Cosa dico:** il contributo della tesi non è realizzare un agente capace di ottenere i permessi di root, ma introdurre un processo controllato per verificare e correggere il percorso didattico previsto. Grazie per l'attenzione, ci sono domande?
- **Cosa si vede:** ritorno alla figura del percorso della slide 3, semplificata, con tutte le tappe spuntate fino a `root`. Grande `Grazie per l'attenzione`, ringraziamenti come già previsti nel template, bibliografia essenziale in piccolo in basso a destra.

---

## 4. Versione da 5 minuti (estratto)

Slide 1 → 3 (intended path) → 5 (Pizzeria prima) → 6 (VulcaTest) → 9 (architettura d'insieme) → 15 (ciclo + Pizzeria dopo) → 21 (E2) + 22 (E3) in una sola slide → 27. Stesse figure, parlato ridotto a una frase per slide.

## 5. Fatti che nessuna scelta grafica deve alterare

1. VulcAIn, HexStrike e Antigravity sono preesistenti. Sono di Luca: VulcaTest (architettura, Planner+parser, Executor, Orchestrator, Final Evaluator, controller di healing), il Bridge e il Terminal Gateway.
2. Il parser controlla la struttura del piano, non la sua correttezza semantica.
3. L'LLM sceglie le azioni **dentro** lo step; il passaggio allo step successivo lo decide il codice. Il budget è di turni per step.
4. Il Final Evaluator produce un report e, se fallisce, un ticket con un'**ipotesi** di causa.
5. Il nodo di healing lavora sui sorgenti con visione interna, non cambia l'Attack Plan, ha tentativi limitati e ogni modifica è tracciata con un diff.
6. Dopo la patch: rebuild e re-test **dall'inizio** con lo **stesso** Attack Plan.
7. La Pizzeria delle slide 5, 8 e 15 è la macchina storica, riparata dal nodo di healing di VulcaTest; non è la perturbazione P1-01 del benchmark.
8. Benchmark: 8 Golden Machine, 15 perturbazioni, 108 run = 24 E1 + 84 E2 (24 golden + 60 perturbate); 36 sessioni di healing dentro E2.
9. E1 20/24 = 83,3% (completamento operativo). E2 su P1/P2: TP 38, FN 2, FP 1, TN 23; recall 95%, precision 97,44%, specificity 95,83%, F1 96,20%. E3: 35/36 correzioni valide (97,22%), 33/36 re-test COMPLETED (91,67%), 1 DECLINED.
10. P3: 4 ticket su 20 run, tutti su Citadel; non è una recall.
11. Tempi: E1 ~14 min 34 s; verifica E2 ~14 min 05 s (84 run); ciclo con healing ~34 min 50 s (35 cicli: verifica 11,1 · healing 8,3 · re-test 15,4 min).
12. Modello: Qwen 3.8 27B, IQ3_S, GPU 16 GB VRAM, 64 GB RAM; healing su Antigravity (Gemini 3.8 Flash). 45 tok/s e contesto 40k da verificare. Token: TODO.
13. Testing esplorativo e pipeline end-to-end con GUI sono sviluppi futuri.

## 6. Indicazioni per chi realizza le slide

**Punto di partenza (consigliato, non vincolante):** il deck esistente `Desktop/TESI/SLIDE PRESENTAZIONE/NUOVO TEMPLATE/presentazione.html` (reveal.js, stile "terracotta evoluto", font Libron, cartelle `lib/` e `img/` condivise con `template.html`, che resta intatto). Contiene già componenti riusabili scrivendo testo: `fig-path`, `fig-flow`, `fig-bars`, `fig-waffle`, `fig-confusion`, `fig-matrix`, `fig-stack` e gli SVG `arch|planexec|ciclo|healing|bridge` con `data-focus`. Tempi per slide in `data-t`, mostrati nelle note relatore (tasto S). I testi attuali del deck sono bozze da sostituire con questo documento.

**Libertà di esplorare:** se una tecnica rende meglio, usala. Suggerimenti, non obblighi:
- zoom sull'architettura con `data-auto-animate` di reveal.js (elementi con lo stesso `data-id` che si trasformano) oppure animando il `viewBox` dell'SVG; in ogni caso una **mini-mappa** fissa in un angolo che indica il nodo attivo, così il testo non diventa minuscolo;
- formule con il plugin math di reveal (KaTeX), in corpo grande;
- grafici come SVG disegnati a mano o con una libreria leggera, con la stessa palette dei grafici del Cap. 5.

**Regole da rispettare** (da `linee_guida_slide.md`):
- titolo = messaggio; sotto, una prova visiva, non un elenco puntato; il parlato va nelle note;
- un'idea per slide, glance test (si capisce in 3 secondi), massimo ~6 elementi, testo grande e alto contrasto;
- parole vicine alla figura, evidenziare solo l'elemento di cui si parla;
- figure con ordine di lettura chiaro (sinistra → destra, zone per fase), pochi cambi di direzione, nessuna freccia che attraversa un blocco;
- aspetto non "fatto dall'IA": niente badge numerati colorati, box tutti pastello o corsivo ovunque; box neutri con bordo scuro, tratteggio per gli strumenti esterni, colore solo dove ha significato (re-test, difetti);
- mai togliere elementi concettualmente necessari da una figura (si semplifica la disposizione, non il modello);
- animazioni solo come comparse che dividono una figura in due tempi o come trasformazioni dello stesso oggetto; niente effetti decorativi;
- niente sfondi neri a tutto schermo; gli screenshot della Pizzeria restano scuri per ora;
- nessun dato, screenshot o output inventato: dove manca un asset, un placeholder chiaramente etichettato.

**Asset disponibili**
- Pizzeria: `Desktop/TESI/SLIDE PRESENTAZIONE/Artefatti/Pizzeria_Demo/` → `01_web_PRIMA_senza_chat.png`, `02_web_DOPO_con_chat.png`, `02_web_DOPO_panoramica_intermedia.png`, `03_web_DOPO_interazione_chat.png`.
- Figure della tesi (TikZ, da adattare, non incollare): `MASS_Thesis_Template_Tor_Vergata/images/tikz/`; grafici del Cap. 5 in `images/chapter5/`; logo Kali in `images/tikz/kali_logo.png`.
- Loghi Ateneo: `SLIDE PRESENTAZIONE/LOGO ATENEO 2023`.
- Estratto di Attack Plan: lo fornisce Luca.

**Prima di costruire:** mostrare a Luca una mappa delle composizioni (anche solo schizzi o descrizioni) per le slide 2–3, 9 e la sequenza di zoom, e segnalare se una scelta di layout costringe a tagliare un concetto o un collegamento della narrazione.
