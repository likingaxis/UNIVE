# Regole di stile emerse dalla revisione dei Capitoli 3 e 4

Questo file integra `CONTESTO_REVISIONE_TESI.md`. Non lo sostituisce: raccoglie le decisioni concrete prese durante la revisione dei Capitoli 3 e 4. Il Capitolo 3 è il **riferimento di stile** per i capitoli successivi (`BOZZA SCRITTA/Capitolo 3 - Revisione.md`); anche il Capitolo 4 (`Capitolo 4 - Revisione.md`) segue le stesse regole.

In caso di dubbio, vale il principio: *scrivere come nel Capitolo 3 rivisto*.

---

## 1. Lessico e ritmo

- Ridurre le parole che tendono a ripetersi: **"utilizza/utilizzato"**, **"previsto"**, **"necessari"**, **"durante"**, **"quindi"**, **"inoltre"**. Alternative semplici: *usa, si appoggia a, impiega*, oppure ristrutturare la frase.
- Frasi lineari, senza catene di subordinate. Le frasi legate da causa, conseguenza o spiegazione si uniscono, perché spezzarle rende il testo a singhiozzo. Il punto fermo separa idee distinte. Se una frase supera le due subordinate, si divide. (Aggiornata il 7/10/2026: la vecchia regola "frasi brevi" aveva prodotto troppi punti.)
- **"Componente" sempre al femminile** (*le componenti distinte, componenti concrete, ciascuna componente*), con articoli, aggettivi e participi accordati.
- **"Il modello" solo quando si parla davvero del modello** (scelta, quantizzazione, runtime). Altrove nominare la componente (*il Planner*, *il Final Evaluator*), usare *l'LLM* per la parte generativa o *l'agente* per l'LLM che agisce dentro l'Executor. Per evitare che il nuovo termine si ripeta a sua volta: soggetto sottinteso, forma impersonale o passiva, frasi unite.
- Numeri decimali in prosa con la virgola (*3,5 bit*, *0,9 GB*); nelle formule LaTeX `1{,}15`.

## 2. Cosa togliere

- **Frasi finali che ripetono il paragrafo** senza aggiungere informazione. I raccordi che collegano a un'altra sezione invece vanno tenuti: rendono il testo naturale.
- **Frasi-riempitivo** del tipo "Prima di analizzare nel dettaglio…, è utile inquadrare…" o "Questi principi guidano le scelte descritte nelle sezioni successive". Meglio una frase che dica qualcosa di concreto (es. nominare i componenti).
- **Ripetizioni tra sezioni**: se un concetto è già spiegato (es. motivazioni del modello locale nel §3.1), nelle sezioni successive basta un rimando ("per i motivi discussi nella Sezione 3.1").
- **Etichette che non aggiungono informazione** nei titoli (es. "Auditor Mode" → "Il system prompt dell'Executor").

## 3. Esempi e dettagli tecnici

- **Pochi esempi in linea.** Elenchi di esempi tra parentesi o tra virgolette spezzano la scorrevolezza: meglio descrivere il meccanismo e, se serve, un solo esempio.
- **Niente valori di configurazione esatti** (soglie, dimensioni di finestra, ecc.): se la configurazione cambia, la tesi non deve essere riscritta. Eccezioni:
  - quando il valore è necessario per capire una formula o un meccanismo, scriverlo come **"di default"** (es. "di default impostati a 8 e 20 turni");
  - caratteristiche fisse dell'ambiente o del modello (es. GPU da 16 GB, file `mmproj` da circa 0,9 GB).
- Evitare anche i **nomi dei parametri di configurazione** (es. `MAX_HEALING_ATTEMPTS`): meglio "un parametro configurabile".
- Gli **aneddoti di sviluppo** hanno valore solo se mostrano un principio generale (es. il Planner che divideva in fasi operazioni consecutive → il prompt descrive il contesto dell'Executor invece di aggiungere regole sullo scenario). Vanno raccontati in poche righe: problema → causa → soluzione.
- Le **motivazioni** delle scelte vanno esplicitate brevemente quando non sono ovvie (es. evitare prompt specializzati sui casi di test = evitare overfitting del prompt).

## 4. Struttura

- Per ogni sezione: **cosa fa → come lo fa → perché**.
- I principi di progettazione (§3.2) sono paletti fissati **prima** dell'architettura: possono restare astratti, purché lo si dichiari.
- CoALA e gli altri modelli di letteratura servono a **classificare** l'architettura, non a fare una lezione su cosa dicono.
- Titoli descrittivi (es. "L'Executor: esecuzione e verifica degli step").
- **Pochi sottocapitoli.** Una gerarchia profonda con sottosezioni di uno o due paragrafi fa sembrare il testo generato. Le sezioni brevi restano senza sottosezioni; le sottosezioni si usano solo quando una sezione contiene argomenti davvero distinti (es. §3.10).
- **Mai una sola sottosezione** dentro una sezione: se c'è un 3.x.1 deve esserci almeno un 3.x.2, altrimenti il titolo va tolto.
- Prima di descrivere le singole componenti, dare al lettore una visione d'insieme dell'architettura e dell'ambiente in cui opera (come il paragrafo sul workflow nel §3.3).
- Ogni capitolo si apre con una **breve introduzione asciutta** (due o tre frasi): problema e ruolo del capitolo, con un rimando al capitolo successivo se serve.
- Quando si tolgono i titoli delle sottosezioni, controllare i **raccordi** tra i paragrafi che prima erano separati dai titoli (es. "Oltre ai vincoli, il prompt definisce…").

## 5. Fonti, citazioni e note

- Citare **solo fonti presenti in `BOZZA SCRITTA/FONTI.md`** e nel `references.bib`. Non aggiungere citazioni "decorative" che sostengono affermazioni non verificate.
- Le citazioni del tipo "uso questo strumento" (Antigravity, HexStrike, pexpect, LangGraph, llama.cpp, Unsloth, ecc.) vanno sempre messe alla prima occorrenza.
- Nel `.md` le citazioni si scrivono `[@chiave]` (stessa chiave del `.bib`).
- **Note a piè di pagina** per i termini tecnici che il lettore potrebbe non conoscere (PTY, GGUF, KV-cache, speculative decoding…), come nella tesi di riferimento. Nel `.md` sintassi Obsidian `[^nome]`, con la definizione in fondo al file.
- Attenzione alle voci `.bib` generate automaticamente: titoli e note devono corrispondere alla fonte reale.
- Le citazioni sono **numeriche** (`natbib` con opzioni `numbers,sort&compress`, stile `unsrtnat`): nel testo compaiono come [n], in ordine di apparizione. Nel `.tex` si usa sempre `\citep{…}`.
- Ogni nuova fonte va aggiunta **sia a `FONTI.md` sia a `references.bib`**, con il campo `year` (senza, la voce esce senza data).
- Se uno strumento viene nominato per la prima volta in un capitolo precedente (es. Docker e Ansible nel Capitolo 2), la citazione va **spostata alla nuova prima occorrenza**.

## 6. Terminologia fissata

- **VulcaTest** indica l'intera architettura closed-loop, compreso il **nodo di healing** (non si usa più "VulcaHealing").
- **Step** indica l'unità dell'Attack Plan, che nel codice corrisponde a un `TestStep`; **fase** si usa solo per le fasi del workflow (fase di test, fase di healing). Le singole azioni dell'agente dentro uno step sono i **turni**. (Aggiornata l'8/10/2026.)
- **Attack Plan** e piano di attacco sono sinonimi; nella stessa sezione usare un solo termine.
- **Target**: la macchina da verificare, raggiunta tramite il suo indirizzo IP. **Macchina Kali**: la postazione di attacco da cui partono le interazioni.
- **Orchestrator** (concetto: tutta la logica di coordinamento) va distinto dal **nodo `orchestrator`** (nodo di smistamento nel grafo).
- **Agente**: l'LLM che agisce dentro l'Executor; **agente di healing**: quello del nodo di healing, sempre scritto per esteso.
- **LLM** va definito per esteso nel Capitolo 2.

## 7. Metodo di lavoro

1. Si lavora **solo sul `.md`** finché il capitolo non è chiuso.
2. Revisione a blocchi di 3–5 sottocapitoli: l'assistente mostra la proposta **in chat**, con l'elenco delle modifiche e i punti da confermare; inserisce nel file solo dopo l'approvazione.
3. L'assistente non inventa motivazioni o comportamenti: se deduce qualcosa, lo segnala esplicitamente come da confermare.
4. Il codice **non va controllato**, salvo richiesta esplicita: si lavora sui materiali della cartella della tesi.
5. A capitolo chiuso si riporta tutto nel `.tex` (citazioni → `\citep{}`, note → `\footnote{}`, rimandi → `\ref{}`, immagini → blocchi `figure` esistenti) e si fa un **confronto frase per frase** tra `.md` e `.tex`.
6. Nel progetto LaTeX i capitoli sono `chapters/4_Title_Chapter_3.tex` e `chapters/5_Title_Chapter_4.tex` (gli unici inclusi da `main.tex`): non creare copie come `Capitolo_3.tex`. Le `\label` stanno sulle sezioni; quando si eliminano sottosezioni, aggiornare i `\ref` che le richiamano.
7. Dopo aver aggiunto citazioni o modificato il frontespizio (TikZ), compilare più volte o con **latexmk**, altrimenti compaiono `[?]` o elementi fuori posto.

## 8. Regole aggiunte nella revisione generale (7–8/10/2026)

- **Liste:** voci con etichetta nella forma `**Etichetta:** testo`, con minuscola dopo i due punti; voci senza etichetta come frasi complete, con maiuscola e punto finale. Mai `;`, nemmeno nelle liste o nelle note.
- **Stadi** di Planner e Final Evaluator come lista: `- **Stadio 1:** …`.
- **Executor e agente:** "Executor" è la componente Python (nodo `executor`), "agente" è l'LLM che invoca.
- **"Fase di test"**, non "collaudo" né "fase di attacco".
- **Introduzioni di capitolo:** non ripetere quanto detto nel capitolo precedente e non elencare gli argomenti come una lista della spesa. Meglio una o due frasi che dicano il filo del capitolo.
- **Figure:** subito dopo il paragrafo che le introduce, richiamate nel testo ("Figura 3.2"); nel `.tex` con `[H]`. Le etichette nelle figure sono in italiano (FINE, SÌ, NO).
- **Apostrofo dritto** `'` in tutti i `.md`.
- **Valore del lavoro:** le componenti sviluppate nella tesi vanno distinte dagli strumenti esterni integrati, senza toni autocelebrativi e senza aggiungere aneddoti di sviluppo.
- **Impaginazione:** `parskip` con spazio ridotto (`skip=6pt plus 2pt`), niente rientro della prima riga.
- **Porting nel `.tex`:** interventi mirati sui file esistenti, mantenendo le `\label`; poi confronto frase per frase in entrambe le direzioni e controllo di `\ref`, citazioni e ambienti.
