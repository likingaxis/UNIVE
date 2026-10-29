# VulcaTest — Specifica narrativa e visiva delle slide

**Versione:** 1 — 13 ottobre 2026  
**Destinazione:** documento di progettazione da consegnare a Claude insieme allo script orale e alla tesi.  
**Consegna richiesta:** *specifica*, non PowerPoint, non rendering e non immagini già prodotte.  
**Obiettivo finale:** discussione di laurea triennale di circa 20 minuti; il numero di slide e le durate non sono ancora congelati.

> **Il senso di questo documento:** descrivere che cosa si deve vedere sullo schermo mentre il relatore pronuncia lo script, seguendo molto da vicino le immagini e le animazioni annotate dall'autore nelle sue bozze. Le parole proiettate sono poche; le motivazioni, i passaggi logici e le spiegazioni tecniche rimangono nella voce del relatore. Non è una riscrittura del copione e non introduce esperimenti, risultati o funzionalità nuove.

## 1. Fonti, precedenze e grado di libertà

La fonte **tecnica** è il PDF della tesi (`VulcAIn(20261013-085459).pdf`), in particolare le figure 3.1–3.3, 4.1 e 5.1–5.3 e le tabelle del capitolo 5. Per la narrazione fa fede lo script approvato (`VulcaTest_Script_Orale_Unificato_v1.md`) e la suddivisione attuale (`VulcaTest_Script_Diviso_Per_Slide_v1.md`), integrati con le idee *originali dell'autore* contenute in `SLIDE SCRIPT.md`, `Pasted text(6).txt`, nelle bozze dei blocchi 3 e 4 condivise in chat e in `VulcaTest_Brainstorming_Narrazione_Scaletta.md`.

**Ordine da rispettare in caso di divergenza:** correttezza dei fatti nel PDF; intenzioni visuali e narrative esplicitate e approvate dall'autore; copione diviso per slide per l'ordine; suggerimenti grafici di questo documento. `Slide.md` e il vecchio `template.pdf` possono servire come archivio di spunti, **non** come autorità sui dati, sul vecchio benchmark B1–B4, sulla quantizzazione o sul titolo finale.

Le indicazioni derivanti dal professore e dalla guida di **Ian Parberry**, come discusse e approvate nel brainstorming, sono applicate come criteri di comunicazione: storia comprensibile anziché indice dei capitoli, impostazione **top-down**, una sola idea dominante alla volta, immagini significative con poche parole, ripresa finale del problema iniziale. Non si riportano qui citazioni letterali della guida né nuove regole attribuite al professore.

### Cosa è deciso e cosa no

- **Da preservare:** collegamenti narrativi, idee figurative originali dell'autore, progressione delle figure della pipeline, architettura generale seguita da approfondimenti/zoom, distinzione **visione esterna / visione interna**, Pizzeria *prima/dopo* in due momenti, Golden Machine che emergono da un processo di revisione, Golden Plan spiegato nel contesto di E2, P3 come ultimo limite sperimentale e ripresa soltanto negli sviluppi futuri.
- **Da progettare liberamente:** stile tipografico, palette, icone, proporzioni precise, se usare transizioni Morph o frame successivi, e disposizione di dettaglio. Le proposte qui sotto indicano **contenuto e gerarchia**, non pixel da copiare.
- **Da confermare prima di produrre il materiale finale:** gli screenshot autentici della Pizzeria recuperati dall'autore; le eventuali clip del terminale e i log; i numeri dichiarati per **45 token/s** e **40k token di contesto**; eventuali costi API puramente ipotetici. Mai trasformare un TODO in un fatto proiettato.
- **Numero di slide:** partiamo da **28 unità narrative** del secondo script. Alcune potrebbero essere stati progressivi della medesima slide o fondersi dopo prova cronometrata. Non comprimere automaticamente i contenuti per forzare un numero prestabilito.

## 2. Direzione grafica comune a tutta la presentazione

**Pubblico:** commissione e colleghi con conoscenze di una triennale in Informatica, non necessariamente esperti di Cyber Range, MCP, ReAct o infrastrutture IaC. **Ambiente:** aula e proiettore, formato orizzontale 16:9, leggibilità da fondo sala.

**Aspetto desiderato:** sobrio, tecnico, naturale, non pubblicitario. I diagrammi devono sembrare costruiti per spiegare il *tuo sistema*, non provenire da un modello generico di dashboard SaaS. Claude può scegliere uno stile grafico coerente, ma eviti hacker incappucciati, sfondi di codice casuale, neon decorativi, scatole arrotondate ripetute per qualunque concetto e icone riempitive.

**Tipografia e testo:** titoli brevi, etichette di norma di 1–4 parole, pochissime frasi intere. Dimensionare prima per leggibilità e poi per estetica. Le formule e i frammenti di YAML devono essere ben più grandi di un tipico listato nel PDF della tesi. I numeri vanno mostrati con denominatori e unità corrette; la fonte del dato va mantenuta con discrezione.

**Quattro famiglie visuali da riutilizzare, non reinventare a ogni slide:**

1. **Challenge / intended path:** la stessa macchina vulnerabile, i ruoli del progettista e del partecipante e il percorso verso root (slide 01–02, richiamo in 07 e 28).
2. **Processo di generazione:** la stessa fila `Progettazione → Sviluppo → Distribuzione → Verifica` che evolve in `VulcaMind → VulcaForge → VulcaShip → verifica ancora necessaria`, poi lascia apparire **VulcaTest** (03 e 05, eventualmente richiamata in 26–27).
3. **Architettura di VulcaTest:** **un solo diagramma-madre** mostrato prima per intero e poi approfondito, con posizione dei nodi costante. Il relatore ha chiesto esplicitamente **zoom top-down**: tenerli come ipotesi primaria, non sostituirli a priori con schede autonome (08–15).
4. **Metodo sperimentale:** Golden Machine → perturbazione → E1/E2/E3 → misure → limite P3. Geometrie e colori coerenti tra le varianti; non costruire grafici con estetiche scollegate.

**Semantica visiva:** distinguere in modo coerente sistema di riferimento, sistema perturbato, fase di verifica, fase di modifica e stati sperimentali. Colori e icone possono rafforzare le distinzioni, ma non esserne l'unico veicolo: etichette e forme devono bastare. Nei grafici non forzare scale che esasperino o minimizzino differenze.

**Animazioni:** impiegarle soltanto per mostrare un *cambiamento di significato*: da LLM passivo a harness, da pipeline manuale a VulcAIn, da vista generale a zoom, da macchina difettosa a macchina ripristinata. Non animare ogni parola né introdurre oggetti decorativi sincronizzati ai termini pronunciati. In particolare, **non mettere un orologio che compare quando si dice «tempo»**: idea esplicitamente scartata durante la revisione.

**Testi tra virgolette o indicati come «schermo»:** sono **copy proposti**; Claude può armonizzarli, ma non trasformarli in paragrafi. **Materiali autentici:** se un asset non è disponibile, predisporre un placeholder chiaramente etichettato nel progetto, senza fabbricare screenshot, output, documenti o risultati verosimili.

---

# BLOCCO 1 — Introduzione

## Slide 01 — Titolo → Cyber Range e Boot-to-Root

**Messaggio che deve arrivare:** che cosa stiamo studiando e chi progetta/affronta una macchina Boot-to-Root.

**Testo proposto sullo schermo:** titolo ufficiale `VulcaTest` e sottotitolo della tesi; nelle fasi successive solo `Cyber Range`, `Boot-to-Root`, `Progettista`, `Partecipante`, `Root`. Non un paragrafo definitorio.

**Figura e composizione, aderenti alla bozza:** l'autore immagina di **indicare le parole «Cyber Range» nel titolo** e farle diventare il punto d'ingresso alla spiegazione; valutare una transizione in cui tale parola resta come etichetta principale in basso o nella zona sinistra, mentre compare un **computer/macchina B2R stilizzato**, possibilmente vettoriale/SVG. Accanto o attorno alla macchina si riconoscono il ruolo di chi la progetta e quello di chi la affronta. La figura dello studente al computer era un'idea dell'autore, **opzionale**: se rischia di diventare decorativa, usare due silhouette/icone semplici con etichette, non una scena illustrativa complessa. Un piccolo gruppo di vulnerabilità/servizi può affacciarsi vicino alla macchina, ma solo se non confonde il messaggio.

**Sequenza desiderata:** copertina pulita → attenzione su «Cyber Range» → nasce la macchina Boot-to-Root → si rendono riconoscibili progettista e partecipante → l'obiettivo `Root`. La sequenza può essere una slide con progressive build o due frame coordinati; è più importante preservare la fluidità del racconto che il conteggio esatto.

**Non rappresentare:** exploit specifici, icone casuali di minaccia, terminali pieni di codice, immagini decorative di studenti, né un'immediata spiegazione degli LLM. Il termine approvato per lo studente/professionista è **partecipante**.

**Collegamento:** la stessa macchina rimane disponibile visivamente nella slide 02, quando da «arrivare a root» passiamo a «attraverso quale percorso?».

## Slide 02 — Intended path: un percorso di obiettivi formativi

**Messaggio:** il progettista definisce non soltanto la destinazione root, ma i passaggi formativi previsti.

**Testo a schermo:** `Intended path` con una piccola etichetta `Obiettivi formativi`; nel percorso, ad esempio, `Enumerazione → Exploit → Credenziali → Privilegi → Root`. Queste parole sono illustrative, non la sequenza obbligatoria di ogni challenge.

**Figura:** sviluppare la macchina della slide 01 in **una mappa/percorso** o una checklist visiva — erano le due alternative esplicitamente proposte nella bozza. Ogni tappa non è soltanto un «comando», ma rappresenta un obiettivo o una tecnica da apprendere. Si potrebbe integrare una spunta accanto a ciascuna tappa, senza ancora evocare le checklist implementative dell'Attack Plan (che introdurremo nella parte 2). Favorire un percorso leggibile da sinistra a destra o dall'alto al basso, con `Root` come arrivo.

**Transizione:** se la slide 01 mostrava soltanto macchina e obiettivo, ora tra partecipante e root **si inseriscono** le tappe formative; nessun nuovo universo grafico. Il relatore collega così le due frasi della sua bozza: «ottenere i privilegi massimi» e «seguendo un percorso didattico».

**Evitare:** due percorsi contrapposti già qui, definizioni scolastiche o una «dimostrazione» che ogni via alternativa sia sbagliata. Il confronto con le scorciatoie appartiene alla slide 07.

## Slide 03 — Dalle fasi di realizzazione a VulcAIn

**Messaggio:** la creazione della challenge è un processo articolato; VulcAIn automatizza la parte di generazione ma non sostituisce, nel progetto originario, il controllo di conformità.

**Testo a schermo per la prima fase:** `Progettazione`, `Sviluppo`, `Distribuzione`, `Verifica`. Per la seconda: `VulcaMind`, `VulcaForge`, `VulcaShip`, `Verifica / correzione manuale`. Piccole etichette opzionali `Descrizione iniziale` e `Macchina generata`.

**Figura originale dell'autore, da rispettare con priorità alta:** **una sola pipeline che cambia sotto gli occhi del pubblico.** Inizialmente quattro fasi generiche collegate; poi, con un passaggio fluido, le prime tre assumono le etichette **VulcaMind / VulcaForge / VulcaShip**. L'ultima fase resta chiaramente distinta perché la verifica e la correzione dell'intended path richiedevano intervento umano. Una descrizione entra nel workflow e ne esce una macchina vulnerabile. La complessità si capisce dal processo: **nessuna icona-orologio dedicata**.

**Composizione:** diagramma orizzontale al centro, abbastanza largo da distinguere tutte le fasi. Le frecce hanno direzione esplicita, mentre un piccolo riferimento «VulcAIn» raggruppa i primi moduli. Il focus non deve essere su Docker/Ansible o su come siano implementati i tre moduli.

**Animazione:** fare evolvere **la stessa identica geometria**, non scomparire il primo diagramma e sostituirlo con uno completamente diverso. Conservare questa geometria in memoria per la slide 05.

**Cautela tecnica:** non affermare che VulcaShip sia già orchestrato da VulcaTest end-to-end; stiamo illustrando il ruolo dei sistemi in una pipeline **concettuale**.

## Slide 04 — Pizzeria: il passaggio didattico non disponibile

**Messaggio:** una macchina generata e avviata può mancare di una componente necessaria all'intended path.

**Testo a schermo:** `Pizzeria` e, solo come annotazione sull'immagine, `Chat prevista` / `Non disponibile come previsto` oppure una piccola domanda `Dov'è la chat?`. Tenere la spiegazione tecnica nel parlato.

**Figura:** **screenshot autentico della Pizzeria storica recuperato dall'autore**, grande, leggibile, preferibilmente uno soltanto. Nella bozza l'autore proponeva **un cerchio e un punto interrogativo** nel punto dell'interfaccia dove la chat avrebbe dovuto essere accessibile: conservarne l'intenzione, ma posizionare l'annotazione soltanto dopo aver controllato la schermata reale. Un bordo/callout discreto è spesso più preciso di un grande simbolo interrogativo. L'immagine deve far percepire una **mancanza funzionale rispetto al design**, non un errore generico del sito.

**Composizione:** screenshot dominante, poche annotazioni laterali o sovrapposte senza coprire ciò che conta. Possibile piccolo «Previsto» da documentazione vs «Ottenuto» nell'interfaccia, **solo se fondato su materiale autentico**.

**Timing del racconto:** qui si mostra il **prima**. Non rivelare ancora la correzione; riutilizzare il caso dopo il ciclo di self-healing alla slide 15. Non introdurre ancora bypass di Antigravity o dettagli di deployment.

**Divieto di confusione:** **Pizzeria storica con problema alla chat ≠ Pizzeria P1-01** del benchmark formale (modulo `web-app-deploy` assente, HTTP 404). Non sovrapporre screenshot o far passare una riparazione per l'altra.

## Slide 05 — VulcaTest appare nella pipeline

**Messaggio:** il contributo originale della tesi automatizza verifica e possibile correzione del percorso didattico.

**Testo a schermo:** `VulcaTest`; due parole-guida separate `Verifica` e `Correzione`; se serve un richiamo minuscolo: `Intended path`.

**Figura e animazione come descritti dall'autore:** **riprendere il diagramma della slide 03**, spostare o ridimensionare in modo fluido il gruppo VulcAIn verso sinistra e **far apparire VulcaTest sulla destra**, eventualmente con una lieve *bubble animation* (senza effetti esagerati). La parte prima occupata da «Verifica manuale» diventa la **necessità a cui VulcaTest risponde**. Un ritorno discreto verso la macchina comunica il controllo e il possibile ciclo di correzione. La figura può riassumere anche il loop manuale immaginato nella bozza originale: prima una verifica umana ripetuta, poi la proposta di un componente dedicato.

**Significato visivo preciso:** mostrare **l'affiancamento concettuale** a VulcAIn, non una connessione software già automatizzata fra tutte le sue parti. Se sono presenti connettori fra VulcaShip e VulcaTest, usare etichetta o tratteggio che ne espliciti il carattere di architettura-obiettivo, perché l'integrazione end-to-end resta futura.

**Da non fare:** aprire subito Planner/Executor, introdurre metriche, mostrare la Pizzeria riparata oppure sovraccaricare con icone per ogni funzione. La slide lascia volutamente aperta la domanda «come si automatizza una verifica che interpreta output e sceglie azioni?».

---

# BLOCCO 2 — LLM, harness, architettura e implementazione

## Slide 06 — Da un LLM testuale a un agente che usa strumenti

**Messaggio:** un LLM può interpretare informazioni e produrre decisioni in forma testuale; l'harness fornisce il collegamento operativo con gli strumenti e l'ambiente.

**Testo a schermo:** `Input → LLM → Output` all'inizio; dopo la trasformazione `Harness`, `Tool calling`, `Osservazioni`, `Azioni`, `Target` (solo le etichette indispensabili).

**Figura: riprodurre l'intuizione esatta della bozza originale in due stati.** Primo stato: a sinistra un testo d'ingresso, al centro **LLM**, a destra testo generato; nessuna linea verso una macchina. Secondo stato: **un involucro/contorno identificato come harness avvolge visivamente il modello**. All'esterno, il target; fra harness e target **doppia freccia**, perché gli strumenti inviano azioni e riportano osservazioni. La nuova capacità non è un «LLM più potente», ma la possibilità software di usare tool e leggere risultati.

**Progressione:** ingresso testuale → LLM → uscita testuale → compare l'harness → compaiono tool e doppio flusso verso macchina. Si può rappresentare l'interpretazione senza inventare un vero *chain of thought* interno del modello.

**Da evitare:** diagrammi delle architetture Transformer, tokenizzazione, catene di pensiero stampate sullo schermo, immagini stock di cervelli digitali. Il caso SSH/HTTP resta nel parlato.

## Slide 07 — Harness general-purpose e verifica di conformità

**Messaggio:** arrivare all'obiettivo non significa avere verificato tutti i passaggi dell'intended path; VulcaTest sceglie controllo e tracciabilità anziché massima autonomia globale.

**Testo a schermo:** due titoli principali `Harness general-purpose` e `VulcaTest / conformance testing`. Sotto, al massimo due coppie: `Flessibilità verso il risultato` / `Aderenza agli step` e `Obiettivo raggiunto` / `Evidenze per ogni passaggio`.

**Figura espressamente richiesta dall'autore:** **due percorsi paralleli** dallo stesso punto di partenza verso `Root`. Il primo può seguire una **scorciatoia** e saltare una tappa; il secondo attraversa **gli step previsti** con elementi di verifica/checklist/evidenze. Utilizzare la stessa grammatica di percorso della slide 02: il pubblico riconosce immediatamente la differenza. Non rendere la linea VulcaTest geometricamente perfettamente retta per suggerire assenza di adattamento: dentro uno step l'agente può effettuare tentativi e reagire; ciò che è vincolato è l'avanzamento dei requisiti.

**Loghi:** nella bozza erano suggeriti Antigravity, Claude Code, Codex, Hermes e altri. Se migliorano l'inquadramento, **massimo pochi nomi/loghi discreti**, preferendo quelli riconoscibili, senza far sembrare la slide un benchmark fra prodotti. **Antigravity** merita un richiamo leggero perché ricomparirà nel healing. I loghi non sono il centro della figura.

**Cautela:** evitare frasi come `garantisce tutti i passaggi` o `harness generico sempre scorciatoia`. È un **confronto di esigenze e responsabilità progettuali**, non una legge universale né una valutazione sperimentale competitiva.

## Slide 08 — Architettura di VulcaTest: prima l'intero workflow

**Messaggio:** risolvere il problema richiede componenti con ruoli separati, sotto controllo di un'Orchestrator.

**Testo a schermo:** soltanto i nomi necessari: `Planner`, `Attack Plan`, `Executor`, `Bridge`, `Target`, `Final Evaluator`, `Healer`, `Rebuild`, `Re-test`, `Orchestrator`. Condizione unica visibile, se serve: `Problema?` con `Sì/No`.

**Figura:** usare come **base semantica la figura 3.1 della tesi (PDF p. 16)**, ma ridisegnare una versione adatta alla proiezione. Figura-madre con `Planner → Attack Plan → Executor → Target → Final Evaluator`, flusso di strumenti attraverso il `Bridge`, ramo eventuale `Healer → Rebuild → Re-test`. L'**Orchestrator** deve figurare come ruolo che governa i passaggi e gli stati, **non come componente interna all'Executor**. Evitare la foresta di archi LangGraph nella vista iniziale. Un solo ramo `Problema?` può rendere intelligibile il percorso generale, come scritto dall'autore.

**La principale richiesta visiva dell'autore:** **questa figura deve restare l'ancora per le slide 09–15**. In quelle slide si entra/zooma sul componente di turno e si svelano soltanto allora i dettagli — LLM vs codice nel Planner e nell'Executor, Kali e backend nel Bridge, controller dell'Healer. Non introdurre in anticipo dettagli nascosti.

**Implementazione possibile:** vista-madre vettoriale con elementi nominati e poi frame successivi simili a una *camera move*. Se veri zoom rendono il testo piccolo, conservare coordinate e morfologia costanti e aprire un riquadro di dettaglio, senza perdere l'effetto top-down. **La scelta tecnica finale resta a Claude e all'autore.**

## Slide 09 — Zoom Planner e Attack Plan

**Messaggio:** il Planner trasforma la documentazione in un piano diviso in step con obiettivi, strumenti e checklist di condizioni osservabili.

**Testo a schermo:** `Planner`; `Documentazione → LLM → Attack Plan → Parser / TestStep`; tre mini-etichette `Obiettivo`, `Strumenti`, `Checklist`.

**Figura:** partire dal Planner evidenziato nella figura-madre e fare **zoom sulla sua struttura a due stadi**: input `DESCRIPTION.md`, `STORYLINE.md`, `WRITEUP.md` (solo se leggibili; altrimenti `Documentazione`), fase **LLM** che genera `ATTACK_PLAN.md` con blocchi YAML, fase **Python/parser** che restituisce `TestStep` strutturati. Accanto una lente su **un unico TestStep reale** in cui si evidenziano `objective`, `allowed_tools` e `checklist`.

**Asset specifico già disponibile nella tesi:** **Listato 3.1, PDF p. 17**: `FASE_3` legge `/etc/passwd` tramite LFI usando `curl`, con checklist sulle righe attese. Claude può usare un **ritaglio breve fedele** o una riduzione letterale della struttura; non inventare YAML apparentemente autentico. Se l'estratto reale risultasse illeggibile, usare una rappresentazione **chiaramente schematica** dei campi anziché falso codice.

**Progressione:** vista Planner → documenti/LLM → piano → dettaglio di step/checklist → parser tipizzato. La transizione all'Executor avviene quando il piano è pronto.

**Confine scientifico:** il parser controlla **formato/struttura**, non certifica la correttezza semantica del piano. Niente dump integrale dei file di progetto.

## Slide 10 — Zoom Executor e Orchestrator

**Messaggio:** l'agente decide azioni nello step; il codice governa vincoli e avanzamento del workflow.

**Testo a schermo:** `Orchestrator — avanzamento`, `Executor — esecuzione dello step`, `LLM / ReAct`, `Controllo checklist`, `Budget turni`. Piccolo `Step n → Step n+1` soltanto quando il controllo lo permette.

**Figura:** nella mappa architetturale si mette in evidenza **il collegamento tra Orchestrator ed Executor**. Zoom: l'Orchestrator consegna **uno step per volta**; l'Executor è un **contenitore Python** in cui compaiono distinti un **agente LLM** con ciclo `Osserva → Decide → Agisce → Osserva` e il codice che seleziona tool, limita i turni, raccoglie `StepResult` ed esegue il controllo di coerenza della checklist. Dall'Executor parte una freccia verso il Bridge, che sarà approfondito subito dopo. Usare come riferimento logico **figura 3.2, PDF p. 20**.

**Animazione suggerita:** prima mostrare il ciclo locale dell'agente; poi evidenziare la parte deterministica del risultato; solo allora illuminare la freccia dell'Orchestrator verso lo step successivo. Se checklist non soddisfatta, interrompere/valutare invece di proseguire automaticamente.

**Cosa non falsificare:** il codice dell'**Executor**, non l'Orchestrator, ricalcola lo stato coerente con gli esiti delle voci della checklist. Non verifica semanticamente la verità di tutte le evidenze testuali. Il limite riguarda i **turni agentici per step**, non il numero di step del piano. Vietato far sembrare l'LLM libero di sostituire il piano.

## Slide 11 — Zoom Bridge e Terminal Gateway

**Messaggio:** tool stateless e interazioni persistenti richiedono backend diversi; il Bridge li astrae e seleziona gli strumenti pertinenti allo step.

**Testo a schermo:** `Bridge`, `HexStrike — stateless`, `Terminal Gateway — sessioni PTY`, `Kali`, `Target`; piccola etichetta `Tool selezionati per step`.

**Figura:** richiamare la **figura 3.3 della tesi (PDF p. 21)**. Zoom da Executor al Bridge; dal Bridge partono due rami **HexStrike** (tool indipendenti) e **Terminal Gateway** (implementazione propria) che operano da Kali verso la macchina target. **Idea originale dell'autore:** mostrare **più schermate di terminale affiancate**, a suggerire sessioni shell che rimangono aperte e possono essere riprese dall'agente. Due mini-terminali (`sessione A`, `sessione B`) bastano; contenuto dei terminali illustrativo e riconoscibile come tale, salvo si impieghino log autentici.

**Seconda idea dell'autore, da non perdere:** il modello **non riceve tutti i tool**. Mostrare una selezione dal catalogo generale (alcuni strumenti attivi, altri attenuati) che deriva dai tool previsti per quello step dell'Attack Plan. È un sottodettaglio del Bridge/Executor, non una seconda grande slide obbligatoria.

**Evitare:** affermare che l'autore ha sviluppato HexStrike; descrivere il Bridge come se «esponesse due server» invece di mediare backend. Non disegnare una shell persistente sulla macchina target come se fosse necessariamente sempre ottenuta: la **persistenza è della sessione PTY gestita dal Gateway su Kali**.

## Slide 12 — Zoom Final Evaluator e tracce di esecuzione

**Messaggio:** dal comportamento osservato si ottengono un report leggibile e, nei fallimenti, un ticket con una possibile causa.

**Testo a schermo:** `Evidenze → Final Evaluator → Report`; se fallisce: `Ticket / ipotesi diagnostica`.

**Figura:** nel diagramma-madre si evidenzia il Final Evaluator. Zoom con **diversi StepResult** che convergono: status, checklist, porzioni di output e riferimenti ai tool; un blocco `Final Evaluator` li riordina in **REPORT.md** e, quando previsto, **healing_ticket.json**. L'autore aveva immaginato di far intuire la «miriade» di osservazioni: rappresentarla mediante poche tracce sovrapposte o righe evidenziate, non con decine di output illeggibili. Se esiste un report autentico utilizzabile, usarne un piccolo frammento rielaborato fedelmente.

**Progressione:** prima evidenze → report; poi, solo in caso di fallimento, ramo al ticket. Il ticket può contenere un'ipotesi di causa; **non scrivere «causa certa»**. L'errore visto dall'esterno non coincide necessariamente con il punto da modificare nei sorgenti.

## Slide 13 — Visione esterna / Visione interna

**Messaggio:** il testing deve vedere la challenge come il partecipante; la correzione ha bisogno di leggere i sorgenti.

**Testo a schermo, terminologia scelta esplicitamente dall'autore:** `Visione esterna` e `Visione interna`. In piccolo, rispettivamente `Servizi esposti` e `Sorgenti / configurazioni`.

**Figura:** **la stessa macchina target**, rappresentata in due modi complementari. Nella metà sinistra o prima fase, Kali e Executor comunicano soltanto con le interfacce/servizi del target, che dall'esterno appare come una «scatola chiusa». Nella metà destra o seconda fase, **si apre visivamente la macchina** e appaiono file di configurazione, IaC e sorgenti, accessibili all'Healer. Questa è un'ottima occasione per uno **zoom verso l'interno** coerente con il linguaggio top-down scelto.

**Animazione:** non fare apparire un secondo target non collegato; far cambiare prospettiva allo **stesso oggetto**. L'agente di testing non legge sorgenti; l'Healer non cambia l'Attack Plan o i criteri della prova.

**Da evitare:** titoli «in-band/out-of-band» come se avessero un unico significato universale. Se necessario possono essere detti oralmente come sinonimi circostanziati, ma **a schermo restano «Visione esterna» e «Visione interna»**, come deciso.

## Slide 14 — Zoom Healer: Antigravity e i vincoli di VulcaTest

**Messaggio:** un harness general-purpose è utile per correggere il codice; VulcaTest controlla e documenta quel processo.

**Testo a schermo:** `Healer`, `Antigravity`, `Vincoli`, `Snapshot / diff`, `Tentativi limitati`. Se c'è spazio un richiamo `Preservare le vulnerabilità didattiche`.

**Figura:** il ramo Healing della figura-madre viene ingrandito. Al centro **Google Antigravity**, chiaramente etichettato come **agente esterno**; intorno un **controller VulcaTest** separato, che fornisce il contesto del ticket/report, monitora l'intervento e governa il proseguimento. Le **tre informazioni che l'autore voleva visualizzare** possono stare come richiami discreti intorno al controller: (1) istruzioni restrittive / mantenere le vulnerabilità didattiche, senza leak o scorciatoie, (2) snapshot e diff/controllo modifiche sui file testuali monitorati, (3) limite dei tentativi di healing.

**Progressione:** compare la libertà necessaria all'analisi dei sorgenti; poi compaiono i vincoli e la tracciabilità come risposta al bisogno di controllo. Collegare graficamente questa scena ai «general-purpose harness» mostrati nella slide 07, ma senza rifare quel confronto per intero.

**Rigore:** il controller e le logiche di monitoraggio sono lavoro della tesi, Antigravity no. I vincoli di prompt e il controllo delle modifiche **non costituiscono una sandbox preventiva infallibile**. Non raffigurare alcun agente che modifica l'Attack Plan per far superare la verifica.

## Slide 15 — Rebuild, re-test e Pizzeria ripristinata

**Messaggio:** la correzione deve superare una nuova verifica completa, eseguita con lo stesso piano.

**Testo a schermo:** `Test → Valutazione → Healing → Rebuild → Re-test` e, discreto ma importante, `Stesso Attack Plan`.

**Figura principale:** semplificare il ciclo della **figura 4.1 della tesi (PDF p. 27)**. Il ramo di healing ritorna **all'inizio** del test, non direttamente allo step fallito. Il diagramma deve comunicare un circuito, non un'affermazione «patch = successo».

**Ritorno visivo intenzionale alla slide 04:** l'autore ha **già recuperato il materiale della Pizzeria storica** e desidera mostrare qui la versione ripristinata, chiudendo il «prima/dopo». Preparare una **coppia coerente di screenshot**: a sinistra la vista difettosa già riconosciuta, a destra la vista della chat effettivamente disponibile/riparata; etichette minime `Prima` / `Dopo`. Se il materiale è leggibile soltanto a schermo pieno, utilizzare **due stati della stessa slide** (prima loop, poi prima/dopo) o separare questo reveal in una slide molto breve. Non forzare un collage illeggibile di screenshot e grafo.

**Nota probatoria:** verificare dagli asset se il «dopo» documenta **l'intervento reale che si intende attribuire a VulcaTest** o una ricostruzione/dimostrazione successiva. In quest'ultimo caso distinguerla come dimostrazione separata. **Mai attribuire alla chat storica il risultato della Pizzeria P1-01 del benchmark.**

**Transizione:** una volta chiuso il ciclo, domanda naturale del relatore: «come sappiamo se questo processo produce risultati affidabili?».

---

# BLOCCO 3 — Progettazione sperimentale e risultati

## Slide 16 — Test Oracle Problem

**Messaggio:** gli stati riportati dall'agente non sono, da soli, un riferimento sufficiente per giudicare la correttezza del test.

**Testo a schermo:** `COMPLETED ?` e `FAILED ?` molto evidenti; domanda breve `Qual è l'esito corretto?` oppure `Serve un riferimento indipendente`.

**Figura:** due stati contrapposti, come annotato dall'autore. Sotto `COMPLETED` un piccolo dubbio visivo sulla conformità effettiva; sotto `FAILED` un dubbio sulla causa (difetto della macchina? errore dell'agente o di uno strumento?). Non fare apparire una macchina reale difettosa con etichette inventate; si tratta di un **diagramma del problema metodologico**.

**Composizione:** presentazione quasi editoriale: due parole grandi, una sola domanda comune, molto spazio libero. L'«oracolo» non deve diventare un personaggio o un'icona esoterica. Il nome *Test Oracle Problem* arriva dopo che il relatore ha posto il dubbio.

**Da evitare:** scrivere che non esiste alcun benchmark agentico al mondo; la difficoltà riguarda l'assenza di un benchmark immediatamente adatto a questo specifico obiettivo di conformità e healing.

## Slide 17 — Dalle challenge generate alle Golden Machine

**Messaggio:** la ground truth nasce da un lavoro effettivo di analisi, esecuzione e correzione manuale dei casi di riferimento.

**Testo a schermo:** `Challenge generate → Revisione e correzione → Golden Machine`. Accanto al passaggio centrale, mini-etichette possibili `Documentazione`, `Percorso`, `Sorgenti`.

**Figura fortemente basata sull'immagine dell'autore:** **diverse piccole macchine generate con VulcAIn** entrano in una fase chiaramente riconoscibile di revisione/fixing e ne escono **evidenziate come Golden Machine**. L'utente aveva immaginato che «diventassero d'oro»: la metafora cromatica va bene se significa *riferimento qualificato*, non «certificato perfetto». Meglio una transizione di colore/contorno o una piccola etichetta `Golden` che un effetto prezioso decorativo.

**Progressione:** macchina generata → intervento manuale che verifica l'intended path → macchina di riferimento. **Non mostrare ancora il Golden Plan**: scelta narrativa precisa dell'autore, che lo introdurrà quando discuterà E2 e l'isolamento della pianificazione.

**Da non falsificare:** la Golden Machine è **considerata conforme all'intended path dopo revisione e qualificazione**, non formalmente priva di bug di qualunque natura. Non aggiungere al benchmark le prove di sviluppo preliminare.

## Slide 18 — Perturbazioni controllate P1 / P2 / P3

**Messaggio:** condizioni note e riproducibili permettono test mirati; tre classi accomunano modifiche concrete diverse da macchina a macchina.

**Testo a schermo:** `P1 — Elemento assente`, `P2 — Valore alterato`, `P3 — Scorciatoia aggiuntiva` e, se serve, `Specifiche per ogni macchina`.

**Figura:** partire da **una Golden Machine** che produce **versioni perturbate**. Tre esempi schematici, con **la stessa forma grafica di base** per rendere confrontabile il tipo di modifica: P1 un componente/passaggio necessario barrato o mancante; P2 una credenziale/chiave sostituita da valore non coerente; P3 un **ramo aggiuntivo** nel percorso che consente una possibilità extra mentre il tracciato formativo originario resta presente. Una singola figura ben fatta comunica più di tre tabelle descrittive.

**Progressione:** fare comparire P1 → P2 → P3, ma evitare di dare a P3 lo stesso ruolo valutativo delle prime due. Una piccola indicazione sobria può separare `Verifica intended path: P1/P2` da `Esplorativa: P3`.

**Precisione:** le 15 perturbazioni sono progettate per **specifiche challenge**, non le stesse tre modifiche applicate universalmente alle otto macchine. Nessuna freccia deve suggerire che **ogni macchina** abbia obbligatoriamente una variante P1, P2 e P3.

## Slide 19 — E1, E2, E3: perché tre esperimenti e il Golden Plan

**Messaggio:** si prova a distinguere il ruolo della pianificazione, del rilevamento e della correzione evitando, per E2, la variabilità dei nuovi piani.

**Testo a schermo:** tre titoli in sequenza `E1 — Pianificazione`, `E2 — Rilevazione`, `E3 — Healing` e un'etichetta nuova `Golden Plan (piano fisso validato)`. Facoltativa una riga piccola `3 run COMPLETED di qualificazione`.

**Figura:** rielaborare **figura 5.1 della tesi (PDF p. 37)** con **tre brevi flussi paralleli**, non una tabella enorme. E1: `Planner → Nuovo piano → Golden Machine → Esito`. E2: `Golden Plan → Golden / Perturbata → Executor + Evaluator → Ticket iniziale`. E3: partire **dal ramo delle run E2 che attivano healing**, poi `Healer → Rebuild → Re-test` sempre con Golden Plan. Quest'ultimo è mostrato come lo **stesso oggetto riutilizzato**, non un piano rigenerato durante il test.

**Idea narrativa originale da proteggere:** la spiegazione del Golden Plan compare **qui**, perché la necessità del piano fisso emerge quando il relatore spiega come non confondere un errore di pianificazione con uno di rilevamento. Il piano era stato preparato e validato nella fase di ground truth, anche se lo raccontiamo adesso.

**Eventuali formule:** l'autore è disponibile a mostrare formule molto semplici. Non riempire questa slide con TP/FP/FN/TN: qui le tre domande sperimentali e i flussi sono più importanti. Le formule possono comparire nella slide 22 dove diventano pertinenti.

**Cautela:** nessun esperimento isola **perfettamente** un singolo nodo. E1 comprende esecuzione, E2 include Executor/strumenti/Final Evaluator, E3 comprende anche controlli e re-test.

## Slide 20 — Dimensione del benchmark: 8, 15, 108, 36

**Messaggio:** la valutazione deriva da un protocollo preparato e ripetuto, non da una sola dimostrazione.

**Testo a schermo:** `8 Golden Machine`, `15 perturbazioni`, `108 run principali`, `24 E1 + 84 E2`, `36 sessioni di healing incluse in E2`.

**Figura:** **108** è il numero più grande. Un rettangolo/barra di 108 unità concettuali si divide in 24 (E1) e 84 (E2); **dentro il gruppo E2**, un sottoinsieme o una parentesi indica **36 sessioni di healing E3**, **non** una terza barra sommata alle 108. Le 8 macchine e le 15 perturbazioni fungono da contesto, visivamente subordinato ma leggibile.

**Composizione e ritmo:** numeri ampi, pochissime parole, niente blocchi KPI in griglia ripetitiva; si devono capire i rapporti. Se si rappresentano le 8 macchine come iconcine, che siano sobrie e non un enorme insieme di decorative thumbnails.

**Precisione:** 84 run E2 = 24 su Golden Machine + 60 su macchine perturbate, comprendendo P3. La valutazione supplementare su quattro macchine **non** è parte dei 108 e, per decisione dell'autore, resta fuori dal corpo principale.

## Slide 21 — E1: generazione e completamento del piano

**Messaggio:** 20 dei 24 workflow E1 con piani appena generati si completano; il risultato non è accuratezza isolata del Planner.

**Testo a schermo:** `E1 — 20/24 COMPLETED`, `83,33%`. Se davvero utile e chiaramente separato: `22/24 piani sostanzialmente coerenti (revisione qualitativa)`.

**Figura:** un **rapporto visivo 20/24** onesto: una barra segmentata da 24 parti oppure una percentuale molto grande con un piccolo grafico del resto `4 FAILED`. Evitare grandi cruscotti. Se si aggiunge il 22/24, collocarlo come **secondo riscontro** di natura diversa, non come sostituzione del 20/24.

**Interpretazione grafica obbligatoria:** denominatore 24, e dicitura **`Completamento operativo`** o equivalente. Non etichettare 83,33% come `Accuracy Planner`. Le cause dei 4 FAILED sono differenti: i dettagli rimangono nel parlato/Q&A.

## Slide 22 — E2: matrice di confusione e metriche

**Messaggio:** il benchmark P1/P2 mostra una forte capacità di emettere il ticket iniziale per le macchine perturbate.

**Testo a schermo:** `E2 — P1/P2`, `TP 38 · FN 2 · FP 1 · TN 23`, `Recall 95,00%`, `Precision 97,44%`; `F1 96,20%` solo in secondo piano, se non appesantisce. Nota chiave `Segnalazione = ticket iniziale`.

**Figura:** una **matrice di confusione 2×2**, ampia e comprensibile, organizzata con assi `Macchina: Golden / perturbata P1-P2` e `Ticket: emesso / non emesso`, evidenziando 38 veri positivi, 2 falsi negativi, 1 falso positivo e 23 veri negativi. A fianco o in basso **una formula semplice**: `Recall = 38 / (38 + 2) = 95%`, e, se c'è spazio, `Precision = 38 / (38 + 1) = 97,44%`. Questa risponde all'idea dell'autore di mostrare matematica elementare senza fare una lezione sulle metriche.

**Gerarchia:** dominano matrice leggibile e **95%**. Non forzare nella stessa vista specificity, F1, precision e altre formule a dimensione microscopica. F1 può restare come piccola annotazione o nel parlato.

**Cautela scientifica:** il 95% misura **ticket iniziale emesso su una run con P1/P2**, non diagnosi causalmente giusta, non scoperta di P3. I due FN sono run `FAILED` senza ticket iniziale prodotto dal Final Evaluator; non raffigurarli come completamenti riusciti di una macchina difettosa.

## Slide 23 — E3: patch tecnicamente valida ≠ re-test completato

**Messaggio:** una correzione verificata sui sorgenti e il completamento dell'intero ciclo sono due risultati diversi.

**Testo a schermo:** `35/36 patch valide — 97,22%` e `33/36 re-test COMPLETED — 91,67%`.

**Figura:** due **indicatori direttamente confrontabili**, preferibilmente due barre con lo **stesso denominatore 36** o due linee di avanzamento. Prima la barra della correzione tecnica, poi quella del re-test. Le differenze devono essere visibili senza falsare la scala. Collegamento discreto al workflow Healing → Rebuild → Re-test illustrato nella slide 15.

**Possibile dettaglio subordinato:** due patch valide hanno re-test incompleto per problemi operativi (GitPoison, TunnelGate); una sessione P3 Citadel è `DECLINED`. Non mostrare questi casi come tre «patch sbagliate» né introdurre altri dati se il disegno diventa affollato.

**Cautela:** il giudizio sulla validità della patch viene da revisione manuale delle modifiche; il re-test `COMPLETED` è un indicatore operativo differente. Le 36 sono **sessioni healing** incluse in E2, non run indipendenti ulteriori.

## Slide 24 — Tempi, token e scelta del modello locale

**Messaggio:** il framework ha un costo operativo temporale/di inferenza, reso gestibile dall'adattamento di un modello locale all'hardware disponibile.

**Testo a schermo:** `E2: 14 min 05 s` (verifica iniziale su 84 run); `E2+E3: 34 min 50 s` (ciclo misurato su 35); `Qwen3.8-27B · IQ3_S`; facoltativo `MTP + N-gram`. `Token: [DA SELEZIONARE DAI CONTATORI]` **solo come TODO nel progetto, non proiettarlo al pubblico**.

**Figura:** prendere spunto dalla **figura 5.3 della tesi (PDF p. 44)**. Una sola barra orizzontale a segmenti mostra, nel sottoinsieme dei **35 cicli completi**, `Verifica 11,1 min | Controller healing 8,3 min | Re-test 15,4 min`. A lato si può dare il valore `34m50s` per il ciclo; altrove `14m05s` come media generale della verifica E2 su **84** run. **Attenzione: 11,1 min e 14,1 min hanno campioni differenti**, quindi non presentarli come numeri contraddittori o sommabili.

**Modello locale:** banda tecnica sobria con `Qwen3.8-27B / IQ3_S / 16 GB VRAM / 64 GB RAM`, se leggibile; le motivazioni dei guardrail commerciali e le ottimizzazioni rimangono soprattutto orali. Facoltativo un sottodettaglio visivo per `speculative decoding: MTP + N-gram`. Se questo riempie troppo la slide, creare due **stati**: prima tempi, poi modello/consumi, anziché ridurre i caratteri.

**Consumi di token:** l'autore ha chiesto per ora un `TODO`/`xx`. Il PDF contiene valori medi verificabili; prima di selezionarne qualcuno decidere quale confronto si vuole sostenere. Non sommare ingenuamente i contatori Qwen e Antigravity (telemetrie diverse); non includere i token Planner E1 come se fossero disponibili. Non stampare `xx` nella slide finale.

**Dati ancora da dimostrare con log/configurazione:** circa `45 token/s` e finestra contesto `40k`. Non aggiungerli automaticamente ai numeri esposti.

## Slide 25 — P3: che cosa il piano non cerca

**Messaggio:** una scorciatoia o informazione inattesa può essere presente negli output e non produrre ticket se la checklist non ne richiede la ricerca.

**Testo a schermo:** `P3 — Verifica esplorativa`, `4 ticket / 20 run` con sottotitolo **`Non è recall delle scorciatoie`**; caso `NetVault — record TXT aggiuntivo`.

**Figura:** una composizione dominata dall'**esempio NetVault**, non dalla percentuale. A sinistra una porzione leggibile e **fedele alle evidenze documentate** dell'output della zona DNS: alcuni record attesi e **il TXT extra `vault-internal`** evidenziato; se non è disponibile il vero output, usare una **ricostruzione concettuale dichiarata**, senza far credere che sia uno screenshot di run. A destra la checklist del Golden Plan: verifica **«record previsti presenti»**. Si vede che la casella è soddisfatta, mentre **non esiste una voce «nessun record extra»**. In basso `COMPLETED`, `Nessun ticket` per questo caso.

**Dato aggregato:** una piccola annotazione `4/20 run P3 con ticket (Citadel)` può precedere il caso NetVault; non usare un grafico che si intitoli `20% detection` o `recall P3`. Non sappiamo attribuire con certezza tutti e quattro i ticket alla scorciatoia introdotta.

**Transizione al blocco 4:** concludere **sul limite di copertura dell'Attack Plan**. Non disegnare ancora nuovi agenti esplorativi o sviluppi futuri: quelli appariranno soltanto dopo, nelle conclusioni. Non dire «nessuna vera limitazione», perché è un limite reale rispetto alle proprietà esterne al piano, anche se non contraddice l'obiettivo P1/P2.

---

# BLOCCO 4 — Conclusioni e sviluppi futuri

## Slide 26 — Il contributo e i risultati in una visione d'insieme

**Messaggio:** VulcaTest introduce un processo controllato per verificare l'intended path e tentare un ripristino; la valutazione ne descrive possibilità e confini.

**Testo a schermo:** `VulcaTest`, `Verifica di conformità`, `Evidenze`, `Self-healing`, `Re-test`. Evitare di ripetere tutte le percentuali già viste.

**Figura:** come suggerito dall'autore, **riprendere l'architettura una sola ultima volta**, ma **alla risoluzione concettuale della slide 08** o addirittura nel piccolo schema dell'intera pipeline, non la versione tecnica densissima dei singoli nodi. Si deve riconoscere la sequenza del lavoro: piano → test/evidenze → eventuale healing → rebuild → re-test. Metterla in relazione alla figura iniziale VulcAIn / VulcaTest per far percepire il contributo originale rispetto al problema della generazione.

**Progressione:** dopo il limite P3, tornare alla «grande figura» e al compito per cui il framework è stato costruito. Sintesi, non nuova lezione. La modularità può essere ricordata nel parlato come proprietà già realizzata, non una terza promessa futura.

## Slide 27 — Due direzioni di sviluppo future

**Messaggio:** il limite di copertura suggerisce una componente esplorativa; la modularità permette una maggiore integrazione del processo di generazione e controllo.

**Testo a schermo:** due titoli soltanto, `Testing esplorativo` e `Pipeline end-to-end + GUI`.

**Figura:** **due direzioni distinte**, non tre o cinque elenchi. Nella prima, il percorso «previsto» già riconoscibile dalle slide 02/07 si affianca a una **ricerca di possibili rami ulteriori**: il secondo ramo è etichettato come prospettiva **futura**, non già disponibile. Nella seconda, la stessa pipeline `VulcaMind → VulcaForge → VulcaShip → VulcaTest` si unifica con **una semplice indicazione di interfaccia grafica** per avvio/monitoraggio/risultati. Icona o bozzetto concettuale, non screenshot di GUI inesistente.

**Collegamento alle P3:** non ripetere NetVault, 4/20 o il ragionamento dettagliato; basta che il relatore riprenda oralmente la limitazione appena vista. La prima direzione deve risultare motivata, non introdotta dal nulla.

**Cautela:** l'integrazione end-to-end di VulcAIn è **futura**; la modularità di VulcaTest è una caratteristica dell'implementazione corrente. Il testing esplorativo non promette una copertura di sicurezza del 100%.

## Slide 28 — Chiusura e ringraziamenti

**Messaggio:** il valore del lavoro è verificare il *percorso didattico*, non soltanto ottenere root.

**Testo a schermo:** `Grazie per l'attenzione` oppure `Grazie`; piccolo `Domande?` se desiderato. Nessuno slogan obbligatorio.

**Figura:** tornare **alla figura del percorso formativo della slide 02**, ora come richiamo visivo molto semplificato. Idealmente si riconoscono le tappe dell'intended path e `Root` senza dover rileggere la spiegazione. La figura può convivere con un grande ringraziamento oppure dissolversi per lasciare uno schermo quieto. È la **ripresa deliberata** del problema introduttivo auspicata dal paper/guida e dal professore.

**Evitare:** una slide di ringraziamenti decorativa piena di loghi, un nuovo elenco di sviluppi futuri, l'impressione che la conclusione riguardi «un agente che sa hackerare». L'autore desidera chiudere ringraziando e rendendosi disponibile alle domande.

---

# 3. Continuità e ritmo: istruzioni operative a Claude

Questa è una **progettazione di contenuti**. Non chiediamo di produrre 28 slide isolate con 28 layout casuali. La presentazione deve funzionare come **un sistema visuale unico**:

- **01→02:** la macchina Boot-to-Root diventa un percorso formativo, senza cambiare completamente metafora.
- **03→05:** la pipeline evolve; 04 è l'intermezzo fotografico del problema Pizzeria. Il 05 dovrebbe sembrare una **continuazione** del 03, non un nuovo flowchart.
- **06→07:** l'harness trasforma il modello in un agente operativo, ma l'operatività generale **non basta** a garantire le condizioni del test.
- **08→15:** architettura-madre **stabile** e sequenza di zoom: Planner → Executor/Orchestrator → Bridge → evidenze/Evaluator → visione esterna/interna → Healer → ciclo/re-test. L'autore preferisce davvero l'effetto *top-down*; provare a ottenerlo senza rendere il testo microscopico.
- **04→15:** **Pizzeria prima/dopo**, realizzata con immagini autentiche e attribuzioni corrette. Può essere il picco visivo memorabile della parte implementativa.
- **16→20:** dal dubbio metodologico alla costruzione del benchmark e al protocollo; le cifre **arrivano solo dopo** aver introdotto i concetti.
- **21→23:** i tre risultati sono visivamente coerenti ma non identici; la matrice E2 è il momento analitico centrale; E3 deve rendere distinguibili patch e re-test.
- **24→25:** risorse operative e poi **limite P3**; il caso NetVault conta più del dato 4/20 preso isolatamente.
- **25→27:** nel 25 si **constata** il limite; nel 27 si propone il **testing esplorativo**. La conclusione non deve precedere i risultati.
- **26→28:** ricompare la visione d'insieme e infine la figura del percorso iniziale. La presentazione finisce sul **contributo realizzato**, non su una lista di carenze.

**Fusioni da valutare, non eseguire automaticamente:** 01–02 se l'apertura fosse troppo lunga; 06 come singola slide a due stati; 08–15 come gruppi di Morph più che molte tavole indipendenti; 21–23 come sequenza coordinata di grafici; 26 e 28 se la conclusione richiedesse maggior sintesi. Le fusioni **non devono perdere** Pizzeria, confronto di obiettivi tra harness, ruoli Executor/Orchestrator, Bridge/PTY, visione esterna/interna, metodologie E1/E2/E3, distinzione E3 patch/re-test e limite P3.

## 4. Asset da consegnare / verificare prima della realizzazione

| Asset | Dove serve | Condizione prima della produzione |
|---|---|---|
| **PDF tesi definitivo** | Tutti i contenuti tecnici; fig. 3.1–3.3, 4.1, 5.1–5.3 | Consegnarlo a Claude. Le figure di tesi sono riferimenti da rielaborare, non screenshot minuscoli da incollare. |
| **Screenshot Pizzeria storica «prima»** | Slide 04, ritorno slide 15 | Già recuperato dall'autore; allegare originale e verificare che l'annotazione identifichi il punto corretto. |
| **Screenshot Pizzeria «dopo» / prova ripristino** | Slide 15 | Già recuperato dall'autore; stabilire se prova automatica reale, dimostrazione ripetuta o ripristino separato, e descriverlo coerentemente. |
| **Estratto reale Attack Plan** | Slide 09 | Preferire **Listato 3.1 della tesi, PDF p. 17**, oppure uno step reale fornito dall'autore. Non inventare YAML per riempire. |
| **Diagrammi Executor/Bridge/Healer** | Slide 08–15 | Fig. 3.1 PDF p. 16; 3.2 p. 20; 3.3 p. 21; 4.1 p. 27. |
| **Metodologia E1/E2/E3** | Slide 19 | Fig. 5.1, PDF p. 37. |
| **Risultati E2/E3** | Slide 21–23 | Dati cap. 5 e fig. 5.2, PDF p. 42. Preferire grafici ridisegnati selettivamente. |
| **Ripartizione dei tempi** | Slide 24 | Fig. 5.3, PDF p. 44; conservare diversi denominatori delle medie. |
| **Dati token, throughput e contesto** | Slide 24 | Token nel cap. 5, ma selezione da fare; `45 token/s` e `40k` da confermare con fonti dell'autore. |
| **Output NetVault autentico, se disponibile** | Slide 25 | Se manca, usare solo schema concettuale dichiarato; nessun falso screenshot. |

## 5. Fatti che nessuna scelta grafica deve alterare

1. **VulcAIn preesiste alla tesi**, così come HexStrike e Google Antigravity. Il contributo originale riguarda VulcaTest, architettura e orchestrazione, logiche, integrazione, controller e Terminal Gateway.
2. Il **Planner** genera un piano; il parser controlla il **formato strutturale**, non la corrispondenza semantica del piano alla challenge.
3. L'**Executor Python** governa il singolo step e ricalcola la coerenza della checklist; l'**Orchestrator** controlla l'avanzamento del workflow. L'agente LLM sceglie le azioni **dentro** lo step. Le evidenze testuali restano soggette a interpretazione agentica.
4. Il **Final Evaluator** produce report ed eventuale **ipotesi** di causa. Solo la visione interna del healing può esaminare i sorgenti; neanche ciò garantisce una diagnosi infallibile.
5. L'Healer può leggere/modificare i **sorgenti autorizzati**, ma non cambiare il piano o i criteri; il controller applica vincoli e controlla i **file testuali monitorati**. Non rappresentare una sandbox assoluta.
6. Dopo la patch avviene **rebuild e re-test dall'inizio dello stesso Attack Plan**, non una semplice verifica del singolo step fallito.
7. **Pizzeria storica della chat ≠ benchmark Pizzeria P1-01**. Il materiale dimostrativo non deve essere attribuito al protocollo numerico se non lo è.
8. **Golden Machine** indica una versione considerata conforme all'intended path **dopo revisione manuale**; **Golden Plan** è validato da tre run `COMPLETED` e revisione, non da garanzia formale di correttezza.
9. **108 run = 24 E1 + 84 E2**. Le **36 sessioni E3 sono incluse** nelle E2, non un terzo addendo indipendente.
10. **E1 20/24 = completamento operativo**; **E2 TP38/FN2/FP1/TN23, recall 95% = ticket iniziale**; **E3 35/36 patch tecnicamente valide, 33/36 re-test completati**.
11. **P3 4/20 = run con ticket**, non recall di scoperta delle scorciatoie; NetVault è un caso di record extra visibile ma non richiesto dalla checklist.
12. **Modello locale** documentato: Qwen3.8-27B, quantizzazione IQ3_S; le misure di latenza/token non provano risparmi economici rispetto a sistemi alternativi.
13. **Testing esplorativo** ed **end-to-end VulcAIn con GUI** sono **sviluppi futuri**, non risultati sperimentali già ottenuti.

## 6. Criteri di accettazione della bozza visiva di Claude

Prima di implementare il deck definitivo, Claude dovrebbe sottoporre **una mappa di anteprime/composizioni** e segnalare gli asset mancanti. Si valutano soprattutto queste domande:

- Dalle prime cinque slide si capisce, senza leggere paragrafi, perché serve verificare l'intended path?
- La pipeline manuale → VulcAIn → VulcaTest sembra **una sola storia in evoluzione**?
- Si percepisce che l'**architettura viene spiegata dall'alto verso il basso**, con zoom coerenti invece di schede scollegate?
- Il diagramma dell'Executor distingue chiaramente **decisione agentica** da **regole Python / avanzamento deterministico**?
- Il Gateway PTY si distingue dagli strumenti stateless e si capisce il ruolo delle sessioni persistenti?
- La **Pizzeria ripristinata** è una prova autentica, contestualizzata e visivamente collegata allo screenshot iniziale?
- Il benchmark si comprende **prima** di vedere i numeri? La relazione fra E1, E2 ed E3 impedisce doppi conteggi?
- I numeri E1, E2, E3 e P3 comunicano **metriche differenti** senza ribattezzarle impropriamente?
- Le slide restano leggibili in aula, con figure vettoriali/editabili dove possibile e niente testo minuscolo nel codice?
- La chiusura ritorna al percorso formativo e al **contributo reale** invece di finire con una lista di debolezze?

**Istruzione conclusiva a Claude:** eseguire una progettazione mirata, non una reinterpretazione libera. Se una proposta di layout richiede di tagliare o modificare un concetto approvato, segnalarlo all'autore **prima** di intervenire. Nessuna statistica, screenshot di challenge, comportamento del framework o integrazione futura va inventata per esigenze di design.
