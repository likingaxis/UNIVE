# Script sintetico — Presentazione VulcaTest

## Blocco 1 — Introduzione

**Slide 1 — Titolo**  
Buongiorno a tutti, oggi vi presento il mio progetto di tesi: VulcaTest, un framework agentico per il conformance testing e il self-healing di scenari Cyber Range. Partiamo proprio da quest'ultimo concetto.

**Nuova slide — Cyber Range**  
I Cyber Range sono ambienti informatici di simulazione che permettono di riprodurre scenari realistici di cybersecurity in un contesto controllato e isolato, con finalità formative. Un esempio concreto di questi scenari sono le macchine Boot-to-Root.

**Slide 3 — Macchine Boot-to-Root**  
Sono macchine vulnerabili sulle quali un partecipante deve svolgere una serie di esercizi per raggiungere un obiettivo finale. Questi esercizi possono essere rappresentati come una sequenza di passaggi.

**Slide 4 — Intended Path**  
Questa sequenza costituisce il percorso didattico previsto, chiamato _intended path_, che conduce dall'accesso iniziale fino all'ottenimento dei privilegi root. Ma chi definisce questo percorso? Il progettista della macchina.

**Transizione — Comparsa del progettista**  
Il progettista definisce gli obiettivi formativi e il percorso che il partecipante dovrebbe seguire. Deve poi realizzare una macchina che permetta effettivamente di affrontarlo.

**Slide 5 — Processo di realizzazione**  
La realizzazione di queste macchine comprende diverse fasi: progettazione, sviluppo, distribuzione e testing. È un processo elaborato che richiede tempo.

**Slide 6 — VulcAIn**  
Per automatizzare buona parte di questo lavoro nasce VulcAIn, un workflow agentico che, partendo da una descrizione fornita da un essere umano, genera una macchina vulnerabile. Vediamo un caso concreto.

**Slide 7 — Caso Pizzeria**  
Ho utilizzato VulcAIn per generare una macchina Boot-to-Root ambientata in una pizzeria. Nella descrizione iniziale era prevista, tra le altre cose, una chat di assistenza contenente una vulnerabilità.

**Slide 8 — Chat mancante**  
Questo è il risultato della generazione: il sito della pizzeria è presente, ma manca proprio la chat richiesta. La macchina generata, quindi, non rispetta completamente il percorso didattico previsto.

**Slide 9 — Problema della verifica manuale**  
Questo esempio mostra una problematica più generale: la generazione mediante agenti AI non garantisce sempre il rispetto dei requisiti. Di conseguenza, sono ancora necessari operatori che verifichino le macchine e correggano eventuali problemi.

**Slide 10 — VulcaTest**  
Il mio contributo di tesi consiste nella progettazione e implementazione di VulcaTest, con l'obiettivo di automatizzare proprio queste due attività: verifica e correzione. Ma come possiamo automatizzare un processo che richiede sia di interpretare informazioni sia di interagire con una macchina?

## Blocco 2 — Architettura e implementazione

**Slide 11 — LLM e harness**  
Per interpretare le informazioni possiamo utilizzare un LLM, che riceve testo e genera risposte, ma non interagisce autonomamente con l'ambiente. Per permettergli di osservare ed eseguire azioni utilizziamo un harness, ovvero un software che mette a disposizione strumenti e ne gestisce l'utilizzo.

**Slide 12 — Harness general-purpose e VulcaTest**  
Esistono già harness general-purpose capaci di svolgere operazioni complesse, ma sono progettati per essere flessibili nel raggiungimento di un obiettivo. VulcaTest deve invece verificare uno specifico percorso, passo dopo passo, mantenendo un controllo maggiore e raccogliendo evidenze.

**Slide 13 — Architettura generale**  
Queste necessità hanno guidato la progettazione dell'architettura, composta da nodi con responsabilità differenti e coordinati da un orchestratore. I nodi agentici utilizzano un LLM, mentre l'orchestratore controlla lo svolgimento del workflow; per il testing abbiamo utilizzato anche un modello locale, che riprenderemo nei risultati.

**Slide 14 + 15 — Planner (accorpamento)**  
Partiamo dal Planner, che utilizza la documentazione della macchina per generare un Attack Plan suddiviso in passaggi, ciascuno con obiettivi e condizioni verificabili. Un parser trasforma poi il piano in TestStep strutturati, che vengono passati uno alla volta all'Executor.

**Slide 16 — Executor**  
L'Executor riceve un TestStep e utilizza gli strumenti disponibili per eseguirlo sulla macchina, raccogliendo le evidenze richieste dalla checklist. L'orchestratore ne controlla l'avanzamento e verifica che le condizioni dello step siano soddisfatte prima di procedere.

**Slide 17 — Bridge e strumenti**  
Ma come vengono eseguite concretamente queste azioni? Ho predisposto un Bridge che media le chiamate ai tool, integrando HexStrike e un Terminal Gateway sviluppato per gestire sessioni persistenti, con la possibilità di filtrare gli strumenti disponibili all'Executor.

**Slide 18 — Final Evaluator**  
Al termine dell'esecuzione disponiamo di comandi, output ed evidenze raccolte durante il testing. Il Final Evaluator le analizza e, in caso di fallimento, produce un ticket con le informazioni necessarie per tentare una correzione.

**Slide 20 — Nodo di Healing (anticipata)**  
Il ticket viene passato al nodo di Healing, che utilizza un harness general-purpose per analizzare e modificare i sorgenti della macchina. Ho previsto un controller che limita e traccia le operazioni, conservando le modifiche effettuate.

**Slide 19 — Due punti di vista (posticipata)**  
Qui è importante distinguere le due attività: durante il testing osserviamo la macchina dall'esterno, come farebbe un partecipante; durante l'healing possiamo invece accedere ai sorgenti. È proprio questa differenza a rendere utile un harness più flessibile per la correzione.

**Slide — Rebuild e retest**  
Dopo la correzione, la macchina viene ricostruita e sottoposta a un nuovo test. In questo modo non ci limitiamo a modificare i sorgenti, ma verifichiamo anche se il problema è stato effettivamente risolto.

**Richiamo alla Pizzeria**  
Riprendiamo il caso della Pizzeria per mostrare il risultato della correzione e chiudere il collegamento con il problema presentato nell'introduzione.

**Slide 21 — Da eliminare, se il contenuto è già assorbito nelle precedenti.**

## Blocco 3 — Benchmark e risultati

_Per le slide del benchmark non identificate con certezza dai vocali, i titoli sono riferimenti ai contenuti dello script originale._

**Slide — Introduzione al benchmark**  
Dopo aver descritto l'architettura, dobbiamo capire come valutarne il funzionamento. Ci siamo posti tre domande: quanto funziona bene il Planner, quanto funziona bene la rilevazione e quanto funziona bene la correzione?

**Slide — Oracle Problem**  
Per valutare correttamente il framework non basta osservare se un'esecuzione termina con successo o fallimento. Abbiamo bisogno di conoscere in anticipo il comportamento atteso della macchina.

**Slide — Golden Machine**  
Abbiamo quindi generato macchine con VulcAIn, analizzandole e correggendole manualmente fino a ottenere otto Golden Machine, cioè macchine sulle quali il percorso previsto è stato verificato.

**Slide — Perturbazioni controllate**  
A partire dalle Golden Machine abbiamo introdotto perturbazioni controllate, specifiche per ciascuna macchina. Le abbiamo suddivise in tre categorie: P1, P2 e P3, con quest'ultima dedicata alla valutazione trasversale delle scorciatoie.

**Slide — Esperimento E1: Planner**  
Nel primo esperimento utilizziamo una Golden Machine non perturbata per verificare se il Planner riesca a generare un piano che consenta all'Executor di completare il percorso previsto.

**Slide — Esperimento E2: Rilevazione**  
Nel secondo esperimento utilizziamo un Golden Plan prestabilito per isolare la generazione del piano e valutare la capacità di rilevare non conformità su macchine Golden e perturbate.

**Slide — Esperimento E3: Healing**  
Nel terzo esperimento partiamo da esecuzioni fallite che hanno prodotto un ticket, verificando se il nodo di Healing riesca a correggere il problema e quale sia l'esito del successivo retest.

**Slide — Dimensione del benchmark**  
Complessivamente abbiamo utilizzato otto Golden Machine e quindici perturbazioni, effettuando 108 run di testing tra E1 ed E2, oltre a 36 sessioni di healing associate a E3. Vediamo ora i risultati.

**Slide 29 — Confusion Matrix**  
Per valutare la rilevazione distinguiamo quattro casi, confrontando la presenza effettiva di una perturbazione con la generazione di un ticket: veri positivi, falsi positivi, veri negativi e falsi negativi.

**Slide 30 — Risultati sperimentali**  
I grafici mostrano i risultati ottenuti nei tre esperimenti: completamento dei piani, capacità di rilevazione e correzioni confermate dal retest. Questi dati permettono di evidenziare sia le capacità del framework sia i suoi limiti.

**Slide 31 — Tempi, token e modello locale**  
Un aspetto che non abbiamo ancora approfondito è che la parte agentica del testing è stata eseguita con un modello Qwen da 27 miliardi di parametri in locale. Attraverso quantizzazione e ottimizzazioni come MTP e NGRAM ho raggiunto circa 45 token al secondo, con una finestra di contesto da 40k, utilizzando hardware personale.

**Slide — Perturbazioni P3**  
Ho inoltre valutato trasversalmente la capacità di rilevare scorciatoie non previste. I risultati mostrano che il sistema riesce a individuarle soprattutto quando il piano richiede controlli espliciti, evidenziando i limiti dell'approccio rispetto al testing esplorativo.

## Blocco 4 — Conclusioni e sviluppi futuri

**Slide 32 — Sintesi del contributo**  
VulcaTest introduce un processo controllato per verificare il rispetto dell'intended path e tentare di correggere le non conformità rilevate. Il contributo non è realizzare un agente capace semplicemente di ottenere root, ma automatizzare una verifica tracciabile del percorso didattico.

**Slide — Sviluppi futuri**  
Due possibili sviluppi sono l'introduzione del testing esplorativo, per individuare percorsi alternativi, e l'integrazione end-to-end delle componenti VulcAIn, dalla generazione alla verifica e correzione, attraverso un'interfaccia di gestione.

**Slide finale — Ringraziamenti**  
Grazie per l'attenzione. Sono disponibile per eventuali domande.

---

## Modifiche narrative già concordate

- Nuova slide generale sui Cyber Range.
    
- Partecipante mostrato prima del progettista; percorso rappresentato con Step 1, Step 2, …, Root.
    
- Progettista introdotto attraverso l'intended path.
    
- Testing visibile nel processo generale, senza anticipare il problema della verifica manuale.
    
- Esempio Pizzeria mantenuto prima della formalizzazione del problema.
    
- Accorpamento delle slide 14 e 15.
    
- Slide 20 anticipata rispetto alla 19; possibile eliminazione della 21.
    
- Breve anticipazione del modello locale nell'architettura, dettagli prestazionali nella slide 31.
    
- Confusion Matrix da rendere più intuitiva.
    
- Sviluppi futuri mantenuti invariati.