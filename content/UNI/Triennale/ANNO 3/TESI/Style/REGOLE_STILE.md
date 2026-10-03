# Regole di stile emerse dalla revisione del Capitolo 3

Questo file integra `CONTESTO_REVISIONE_TESI.md`. Non lo sostituisce: raccoglie le decisioni concrete prese durante la revisione del Capitolo 3, che è diventato il **riferimento di stile** per i capitoli successivi (`BOZZA SCRITTA/Capitolo 3 - Revisione.md`).

In caso di dubbio, vale il principio: *scrivere come nel Capitolo 3 rivisto*.

---

## 1. Lessico e ritmo

- Ridurre le parole che tendono a ripetersi: **"utilizza/utilizzato"**, **"previsto"**, **"necessari"**, **"durante"**, **"quindi"**, **"inoltre"**. Alternative semplici: *usa, si appoggia a, impiega*, oppure ristrutturare la frase.
- Frasi brevi e lineari. Se una frase ha più di una subordinata, valutare se dividerla in due.
- **"Componente" sempre al maschile** (*i componenti distinti, componenti concreti*).
- Numeri decimali in prosa con la virgola (*3,5 bit*, *0,9 GB*); nelle formule LaTeX `1{,}15`.

## 2. Cosa togliere

- **Frasi finali che ripetono il paragrafo** senza aggiungere informazione. I raccordi che collegano a un'altra sezione invece vanno tenuti: rendono il testo naturale.
- **Frasi-riempitivo** del tipo "Prima di analizzare nel dettaglio…, è utile inquadrare…" o "Questi principi guidano le scelte descritte nelle sezioni successive". Meglio una frase che dica qualcosa di concreto (es. nominare i componenti).
- **Ripetizioni tra sezioni**: se un concetto è già spiegato (es. motivazioni del modello locale in §3.1.1), nelle sezioni successive basta un rimando ("per i motivi discussi nella Sezione 3.1.1").
- **Etichette che non aggiungono informazione** nei titoli (es. "Auditor Mode" → "Il system prompt dell'Executor").

## 3. Esempi e dettagli tecnici

- **Pochi esempi in linea.** Elenchi di esempi tra parentesi o tra virgolette spezzano la scorrevolezza: meglio descrivere il meccanismo e, se serve, un solo esempio.
- **Niente valori di configurazione esatti** (soglie, dimensioni di finestra, ecc.): se la configurazione cambia, la tesi non deve essere riscritta. Eccezioni:
  - quando il valore è necessario per capire una formula o un meccanismo, scriverlo come **"di default"** (es. "di default impostati a 8 e 20 turni");
  - caratteristiche fisse dell'ambiente o del modello (es. GPU da 16 GB, file `mmproj` da circa 0,9 GB).
- Gli **aneddoti di sviluppo** hanno valore solo se mostrano un principio generale (es. il Planner che divideva in fasi operazioni consecutive → il prompt descrive il contesto dell'Executor invece di aggiungere regole sullo scenario). Vanno raccontati in poche righe: problema → causa → soluzione.
- Le **motivazioni** delle scelte vanno esplicitate brevemente quando non sono ovvie (es. evitare prompt specializzati sui casi di test = evitare overfitting del prompt).

## 4. Struttura

- Per ogni sezione: **cosa fa → come lo fa → perché**.
- I principi di progettazione (§3.2) sono paletti fissati **prima** dell'architettura: possono restare astratti, purché lo si dichiari.
- CoALA e gli altri modelli di letteratura servono a **classificare** l'architettura, non a fare una lezione su cosa dicono.
- Titoli descrittivi (es. "L'Executor: esecuzione e verifica degli step").

## 5. Fonti, citazioni e note

- Citare **solo fonti presenti in `BOZZA SCRITTA/FONTI.md`** e nel `references.bib`. Non aggiungere citazioni "decorative" che sostengono affermazioni non verificate.
- Le citazioni del tipo "uso questo strumento" (Antigravity, HexStrike, pexpect, LangGraph, llama.cpp, Unsloth, ecc.) vanno sempre messe alla prima occorrenza.
- Nel `.md` le citazioni si scrivono `[@chiave]` (stessa chiave del `.bib`).
- **Note a piè di pagina** per i termini tecnici che il lettore potrebbe non conoscere (PTY, GGUF, KV-cache, speculative decoding…), come nella tesi di riferimento. Nel `.md` sintassi Obsidian `[^nome]`, con la definizione in fondo al file.
- Attenzione alle voci `.bib` generate automaticamente: titoli e note devono corrispondere alla fonte reale.

## 6. Metodo di lavoro

1. Si lavora **solo sul `.md`** finché il capitolo non è chiuso.
2. Revisione a blocchi di 3–5 sottocapitoli: l'assistente mostra la proposta **in chat**, con l'elenco delle modifiche e i punti da confermare; inserisce nel file solo dopo l'approvazione.
3. L'assistente non inventa motivazioni o comportamenti: se deduce qualcosa, lo segnala esplicitamente come da confermare.
4. Il codice **non va controllato**, salvo richiesta esplicita: si lavora sui materiali della cartella della tesi.
5. A capitolo chiuso si riporta tutto nel `.tex` (citazioni → `\citep{}`, note → `\footnote{}`, rimandi → `\ref{}`, immagini → blocchi `figure` esistenti) e si fa un **confronto frase per frase** tra `.md` e `.tex`.
