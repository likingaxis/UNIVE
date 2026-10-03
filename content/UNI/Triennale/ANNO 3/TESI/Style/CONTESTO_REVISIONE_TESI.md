# Contesto di lavoro per la revisione della tesi

## Obiettivo

Sto scrivendo una tesi in ambito cybersecurity relativa al progetto **VulcAIn** e, in particolare, ai moduli **VulcaTest** e **VulcaHealing**.

L'obiettivo di questa chat non è sviluppare o implementare codice offensivo, ma **revisionare e migliorare la scrittura della tesi**. Il lavoro deve essere svolto come revisione editoriale e tecnica di un elaborato accademico già basato su un progetto reale.

La priorità è ottenere un testo:

- tecnicamente preciso;
- concreto;
- denso di contenuto reale;
- formalmente adatto a una tesi;
- leggibile;
- privo di formulazioni vaghe o eccessivamente "da AI";
- coerente con ciò che è stato effettivamente progettato e implementato.

Non voglio una riscrittura artificiosamente accademica. Voglio mantenere il più possibile il mio modo di spiegare il progetto, migliorandone forma, struttura e rigore.

---

## Riferimento principale per lo stile

Fornirò un **PDF di esempio** che rappresenta lo stile di scrittura che apprezzo e che deve essere utilizzato come riferimento.

Il PDF va usato come **bussola stilistica**, non come contenuto da copiare.

Le caratteristiche da mantenere sono:

- frasi relativamente lineari;
- linguaggio tecnico ma leggibile;
- termini specialistici usati quando servono;
- spiegazione concreta prima dell'astrazione;
- poca retorica;
- pochi "paroloni" non necessari;
- collegamenti logici chiari;
- tono accademico senza diventare artificioso;
- preferenza per formulazioni che descrivono cosa fa realmente il sistema.

Il livello di formalità della tesi può essere leggermente superiore a quello del PDF, ma senza perdere la sua chiarezza.

Regola pratica:

> Scrivere come nel PDF di riferimento, ma con il rigore e il livello di approfondimento richiesti da una tesi.

---

## Fonti che fornirò in ogni nuova chat

Quando apro una nuova chat per revisionare un capitolo, fornirò normalmente questi materiali.

### 1. PDF di riferimento stilistico

Serve esclusivamente a definire:

- tono;
- ritmo;
- livello di formalità;
- densità;
- semplicità delle frasi;
- rapporto tra spiegazione tecnica e discorsiva.

Non deve essere usato come fonte tecnica per inventare contenuti.

### 2. Documento di spiegazione del progetto scritto a parole mie

È un documento informale, spesso in Markdown, nato per spiegare il progetto al relatore o per raccogliere idee.

Questo documento deve essere considerato molto importante perché contiene:

- il significato reale delle scelte progettuali;
- le motivazioni originali;
- esempi concreti;
- dettagli che potrebbero essersi persi nelle successive riscritture;
- il mio modo naturale di spiegare il sistema.

La forma può essere grezza. Il contenuto è più importante dello stile.

### 3. Eventuale prima bozza precedente

Può contenere formulazioni vecchie o meno rifinite.

Non va trattata come riferimento stilistico né come testo da preservare obbligatoriamente. Va usata soprattutto per:

- recuperare idee;
- verificare se sono stati eliminati dettagli utili;
- confrontare l'intenzione originaria con la versione attuale.

### 4. Indice completo della tesi

Serve per capire:

- cosa appartiene al capitolo in revisione;
- cosa deve essere soltanto accennato;
- cosa verrà spiegato più avanti;
- quali ripetizioni evitare;
- quali anticipazioni sono eccessive.

L'indice deve quindi essere usato come vincolo di struttura.

### 5. Regole di stile e capitolo di riferimento

`REGOLE_STILE.md` raccoglie le decisioni concrete prese durante la revisione del Capitolo 3, che è il riferimento di stile per i capitoli successivi (`BOZZA SCRITTA/Capitolo 3 - Revisione.md`). Le regole di quel file hanno la precedenza sulle indicazioni generali di questo documento quando sono più specifiche.

### 6. Capitolo attuale da revisionare

È il testo principale su cui lavorare.

Va corretto liberamente quando necessario. Non bisogna assumere che una frase sia corretta solo perché è già presente nella stesura.

---

## Metodo di revisione

La revisione deve avvenire **sottocapitolo per sottocapitolo**, non riscrivendo l'intero capitolo in una volta sola.

Per ogni sezione, procedere idealmente in questo ordine:

1. Capire che cosa deve comunicare realmente la sezione.
2. Confrontarla con gli appunti e con la spiegazione originale del progetto.
3. Individuare:
   - frasi troppo astratte;
   - formulazioni "da AI";
   - ripetizioni;
   - passaggi troppo lunghi;
   - concetti poco giustificati;
   - parole tecniche usate senza reale necessità;
   - informazioni che appartengono ad altri capitoli;
   - dettagli importanti che invece mancano.
4. Discutere eventuali dubbi con me prima di riscrivere.
5. Se necessario, io posso spiegare a voce o in modo colloquiale cosa intendevo.
6. Trasformare quella spiegazione in una formulazione accademica precisa.
7. Fare una rifinitura finale mantenendo il tono del PDF di riferimento.

Non voglio che il testo venga semplicemente "abbellito". Ogni frase deve avere una funzione chiara.

---

## Criteri anti-AI da seguire

Prestare particolare attenzione a questi segnali.

### Formulazioni da evitare quando non necessarie

Esempi tipici:

- "In questo contesto..."
- "Tale approccio consente..."
- "Questo permette di..."
- "Inoltre..."
- "Pertanto..."
- "risulta fondamentale"
- "riveste un ruolo centrale"
- "garantisce un'efficace orchestrazione"
- "ottimizzazione strategica"
- "gestione dinamica"
- "robusto, scalabile e affidabile"

Queste espressioni non sono vietate in assoluto, ma devono essere usate solo quando aggiungono davvero informazione.

### Preferire formulazioni concrete

Per esempio:

- meglio "gestisce l'esecuzione degli step e mantiene lo stato del workflow"
- rispetto a "garantisce un'efficace orchestrazione dinamica del processo operativo".

### Evitare terne decorative

Aggettivi o proprietà come:

> "controllabile, tracciabile e riproducibile"

devono rimanere solo se il testo dimostra concretamente tutte e tre le proprietà.

### Evitare l'astrazione inutile

Prima spiegare **cosa succede realmente**, poi eventualmente introdurre il concetto generale.

---

## Struttura concettuale da privilegiare

Quando possibile, organizzare la spiegazione secondo questa logica:

**cosa fa -> come lo fa -> perché è stato progettato così**

Non ogni paragrafo deve contenere tutte e tre le parti, ma il lettore deve poter ricostruire chiaramente queste tre dimensioni.

Per le decisioni progettuali può essere utile anche:

**problema osservato -> scelta progettuale -> conseguenza concreta**

---

## Principi di scrittura

### Concretezza

Ogni affermazione dovrebbe poter essere ricondotta a:

- un componente;
- una decisione progettuale;
- un comportamento osservato;
- un vincolo reale;
- un artefatto;
- una struttura dati;
- un test;
- una motivazione tecnica.

### Densità

Ridurre le frasi che ripetono un concetto già espresso.

Il testo deve contenere più informazione reale e meno raccordi verbosi.

### Precisione terminologica

Usare termini inglesi quando sono termini tecnici reali e già naturali nel dominio, ad esempio:

- workflow;
- deployment;
- feedback loop;
- self-healing;
- intended path;
- tool calling;
- reasoning;
- harness;
- fail-fast.

Evitare invece inglesismi o formule tecniche inserite solo per rendere il testo più sofisticato.

### Formalismo controllato

La tesi deve avere un registro accademico, ma non deve sembrare scritta per impressionare il lettore.

Se una frase semplice esprime meglio il concetto, preferire la frase semplice.

---

## Rapporto tra autore e revisore

Il contenuto tecnico nasce dal mio progetto e dalle mie spiegazioni.

Il compito dell'assistente è:

- evidenziare problemi;
- fare domande quando una frase non è supportata dai materiali;
- proporre formulazioni migliori;
- migliorare struttura e coerenza;
- aiutare a mantenere il rigore accademico;
- segnalare quando un passaggio sembra più elegante che sostanziale.

Non deve inventare motivazioni progettuali mancanti.

Se una frase non è sufficientemente supportata dai documenti o dalle mie spiegazioni, bisogna chiedermi chiarimenti.

---

## Modalità di lavoro con spiegazioni vocali

Posso usare il microfono e spiegare in maniera colloquiale ciò che ho fatto.

Queste spiegazioni possono contenere:

- ripetizioni;
- frasi incomplete;
- esempi;
- correzioni in corsa;
- espressioni informali.

Non vanno giudicate per la forma.

Devono essere usate per ricostruire il significato reale e successivamente trasformarlo in una formulazione da tesi.

---

## Confini del lavoro

Il progetto riguarda cybersecurity e penetration testing in ambienti didattici e Cyber Range.

La revisione può descrivere normalmente:

- architettura;
- agenti LLM;
- conformance testing;
- penetration testing didattico;
- CTF e B2R;
- orchestrazione;
- strumenti;
- sessioni terminali;
- intended path;
- self-healing;
- Root Cause Analysis;
- prompt engineering;
- modelli locali;
- benchmark.

L'obiettivo della chat è la **scrittura e revisione della tesi**, non la realizzazione di nuovo codice offensivo.

---

## Contesto sintetico del progetto

**VulcAIn** è un ecosistema che combina agenti AI e Infrastructure as Code per generare macchine vulnerabili destinate a CTF e scenari Boot-to-Root.

La pipeline di base comprende:

- **VulcaMind**, che definisce struttura, storyline e percorso di attacco;
- **VulcaForge**, che traduce la progettazione in infrastruttura eseguibile;
- **VulcaShip**, che gestisce il deployment.

Il lavoro di tesi introduce principalmente:

- **VulcaTest**, dedicato alla validazione della macchina tramite conformance testing e pentesting agentico;
- **VulcaHealing**, dedicato alla correzione automatica delle non conformità rilevate.

Il punto centrale non è verificare soltanto se una macchina sia genericamente compromettibile, ma se sia risolvibile secondo il percorso didattico previsto.

---

## Architettura di VulcaTest: riferimenti minimi

Quando serve capire il progetto, considerare come riferimento generale questa struttura:

- Planner;
- Orchestrator;
- Executor;
- Bridge di esecuzione;
- Final Evaluator;
- eventuale passaggio successivo a VulcaHealing.

Il Planner formalizza il percorso atteso.

L'Orchestrator governa il workflow e lo stato.

L'Executor esegue i singoli step e raccoglie evidenze.

Il Bridge media l'accesso agli strumenti e alle sessioni terminali.

Il Final Evaluator consolida risultati e diagnosi.

VulcaHealing appartiene alla fase di correzione e può essere trattato separatamente a seconda dell'indice del capitolo.

---

## Obiettivo finale della revisione

La versione finale dovrebbe essere tale che, se il relatore indica una frase e chiede:

> "Perché hai scritto questo?"

io possa ricondurla immediatamente a una scelta progettuale, a un comportamento osservato o a una motivazione reale del progetto.

Il testo non deve sembrare generico o intercambiabile con la descrizione di un qualsiasi sistema agentico.

Deve descrivere **questo progetto**, con il mio ragionamento, ma in una forma accademica più precisa.

---

## Istruzione da dare all'inizio di una nuova chat

Dopo aver allegato questo file e le fonti necessarie, si può usare un messaggio simile:

> Usa `CONTESTO_REVISIONE_TESI.md` e `REGOLE_STILE.md` come istruzioni di lavoro e il Capitolo 3 rivisto come riferimento di stile.  
> Ti allego anche il PDF che definisce lo stile di scrittura, l'indice completo della tesi, i miei appunti sul progetto e il capitolo che voglio revisionare.  
> Lavoriamo sottocapitolo per sottocapitolo. Non riscrivere tutto in una volta: prima analizziamo la sezione, individuiamo cosa suona artificiale, astratto o ridondante e poi la sistemiamo mantenendo il contenuto tecnico reale.

