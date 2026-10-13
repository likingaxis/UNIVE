# Blocco 1 - Introduzione
Buongiorno a tutti sono Luca Gugliotta e vi presento il mio progetto di tesi: VulcaTest un framework agentico per il conformance testing e self-healing di scenari cyberrange

Partendo proprio da quest'ultimo elemento (indico cyber range nel titolo cercando di metterlo che appare in basso centrato a sx nelle slide)
Per Cyebrrange ci si riferisce ad ambienti informatici di simulazione progettati per riprodurre scenari realistici di cybersecurity, rappresentando una risorsa fondamentale per l'apprendimento. 
Un esempio concreto di Scenario Cyberrange sono le macchine Boot-To-Root (icona (io direi svg ma poi sceglie claude come farla o come prenderla da internet) di un computer che rappresenta una macchina B2R)
questo genere di macchine sono come dei computer progettate da qualcuno con lo scopo di fornire esercizi di vario genere con l'obiettivo di fornire degli spunti di apprendimento professionale in diversi ambiti della sicurezza informatica.
Quindi in sostanza queste macchine vengono progettate da qualcuno e poi devono essere svolte come degli esercizi da qualcun'altro (trova un modo per dire qualcuno)(nelle slide immagino una figura con uno studente al computer)(dimmi se esagero troppo con le figure)
l'obiettivo per chi deve esercitarsi è quello di rilevare vulnerabilità nella macchina e altre cose per il raggiungimento dell'utente con i privilegi massimi(root) (figura con il computer e fuori escono non per forza con una animazione delle card con scritto vulnerabilità, ecc...)
nota: da questo punto in poi dovrei aver definito bene cosa sono queste macchine
Quello che deve fare un progettista spesso con questo genere di macchine è quello di definire un percorso didattico, possiamo vederlo come esercizi che hanno come obiettivo quello di fornire uno o più obiettivi formativi da dare allo studente(trova un termine per dire sia studente che persona che fa formazione professionale).
questo percorso didattico può essere definito nel mio progetto di tesi come un intended path (mostra una figura che rappresenta una checklist con una sorta di percorso da seguire oppure una mappa con scritti vulenrabilità 1,2 ecc... oppure enumerazione exploit privilegi root ecc...).

La realizzazione di queste macchine è scandito da un processo particolarmente elaborato definito da una fase di progettazione, poi una di sviluppo, distribuzione e testing(mostra una figura con queste fasi)
Tutto ciò richiede molto tempo (mostra orologio)
Per sopperire a questa problematica e far dedicare più tempo alla ideazione riducendo in particolar modo la parte di implementazione esiste questo progetto chiamato Vulcain: un workflow agentico che automatizza le parti più tediose della realizzazione di queste macchine delegando il lavoro all'AI(valuta se togliere i termini agentici qui e di solo AI così sembra più chiaro oppure scrivere agenti AI) (mostra come ora le fasi precedenti hanno vulcamind vulcaforge e vulcaship con in input una descrizione e in output una macchina vulnerabile)
Far generare macchine B2R spesso non è un processo oneshot, soprattutto dovuto alla variabilità degli agenti AI.

Un esempio che possiamo analizzare è relativo a una macchina pizzeria_B2R che ho generato personalmente utilizzando il workflow di VulcAIn
quest'ultima è stata realizzata correttamente ma presentava una problematica dal punto di conformance rispetto a quello che era il piano didattico previsto e inserito in input mediante la descrizione
doveva essere presente una chat nell'interfaccia web che poi avrebbe esposto una vulnerabilità nota

(mostra in figura la chat mancante con un punto interrogativo e un cerchio)

 vi è quindi la necessità di  controllare e monitorare il loro operato per verificare che le macchine vengano generate correttamente e che rispettino l'intended path mostra nella figura una sorta di loop come nelle figure che avevo nelle slide di prima dove si verifica e corregge la macchina da parte di operatori
 come detto in precedenza però l'idea alla base di questo progetto è quello di ridurre il più possibile tutte quelle che sono le fasi noiose, e sicuramente una fase come quella di testing e correzione di bug risulta essere tra queste

Da questa necessità nasce l'idea di realizzare
VulcaTest progettato per automatizzare due attività
(mostra due attività con scritto verifica e correzione)

il primo problema incontrato durante la progettazione di vulcatest risiede nel dover automatizzare un qualcosa che prevede l'interpretazione e l'esecuzione di comandi su una macchina vulnerabile 

# Blocco 2 - uso di LLM Agentici Harness architettura e implementazione di vulcatest
Questo compito è possibile delegarlo ad un LLM in grado di interpretare le osservazioni e scegliere dinamicamente le azioni successive da dover eseguire sulla macchina.
un LLM da solo però a seguito di una sequenza testuale è in grado di ragionare(reasoning con chain of thought) e generare altro testo
(mostra una figura con un LLM che riceve in input testo -> ragionamento -> altro testo)
non può eseguire comandi o in generale interagire con l'ambiente
A tale scopo nascono gli harness , software che avvolgono (wrap) l'LLM permettendo a quest'ultimo di avere delle percezioni e di eseguire azioni mediante chiamate a tool
(mostra una figura con un LLM con attorno un harness come se l'LLM fosse avvolto che interagisce con la macchina con una doppia freccia <->)

attualmente nel mercato esistono diversi harness agentici che permettono questo genere di operazioni (mostra nelle slide antigravity claude code codex hermes grok bot)
si impartiscono delle azioni che bisogna svolgere e l'agente in automatico le esegue direttamente sulla macchina che si sta utilizzando ad esempio svolgendo operazioni come la scrittura di codice in un ambiente dedicato
questo può apparentemente rappresentare la soluzione che voleva risolvere VulcaTest fatta e finita, ma non dobbiamo dimenticarci assolutamente cosa volevamo effettivamente risolvere con vulcatest, l'obiettivo non è semplicemente quello di eseguire comandi su una macchina che portino alla soluzione (root) l'obiettivo è quello di verificare un percorso ben definito, qui stiamo svolgendo quindi due operazioni che possono sembrare simili ma in realtà sono differenti
- gli harness general purpose privilegiano la flessibilità nelle fasi intermedie che incorrono tra l'inizio e la fine di una operazione per ottenere quel determinato risultato, questo non è per forza negativo è semplicemente diverso da ciò di cui abbiamo bisogno
- vulcatest necessita un'aderenza sul piano step by step su ciò che sta accadendo e deve ridurre il più possibile che tra il punto A e il punto B vengano eseguiti altri comandi che si discostino troppo dall'intended path garantendo una tracciabilità di tutte le evidenze incontrate durante il percorso

(farei due scritte una con scritto harness general purpose e una con scritto vulcatest un pò schematizzate come le ho messe io qui)

Ciò di cui abbiamo bisogno è quindi un agente meno flessibile su cui possiamo avere più controllo e su cui possiamo avere la certezza che esegua un piano prestabilito raccogliendo le evidenze necessarie
(mostrerei due grafici dei percorsi facendo intuire che un harness general purpose potrebbe prendere una scorciatoia mentre quello di cui abbiamo bisogno con una verifica di conformità è un percorso lineare da seguire)

Queste necessità che ha vulcatest nel fare un conformance testing in grado di creare il giusto equilibrio tra flessibilità dell'agente e controllo sul percorso da seguire hanno guidato la progettazione e l'implementazione dell'architettura.
essa è composta da diversi nodi con ognuno che presenta compiti differenti.
il planner prepara il percorso di attacco, l'executor lo esegue, il final evaluator interpreta i risultati, il nodo di healing interviene per correggere problemi quando necessario, tutto questo viene coordinato da un orchestratore.
(figura con le varie componenti in modo però molto semplificato, poi man mano che spiego le varie componenti scorrendo con le slide è possibile zoommare sulle singole parti seguendo lo script ed evidenziando le varie parti, quindi ad es: per planner mostrare solo dopo che è diviso in 2 parti deterministica e non executor far vedere solo dopo che ha un llm e una parte di codice ecc... mostrando anche cosa ricevono rispettivamente in input e output e mostrando gli scambi, ovviamente rimanendo comunque ad alto livello
la figura deve quindi mostrare di base planner -> attack plan -> executor -> target -> final evaluator -> healing -> rebuild un pò come figura 3.1 ma senza blocchi condizionali che poi mostriamo nei vari zoom e un executor che invece prende in realtà tutti i nodi, l'unica condizione da far vedere per dare un senso alla lettura generica è solo quella di problema? si no e in caso porta al nodo di healing)


Pianificazione (zoom su pianificazione)
abbiamo la fase di pianificazione gestita da un planner che prepara il percorso da dover seguire (mostra l'attack plan quello presente sulla tesi, visto che non puoi leggerlo usa del testo falso che poi sostituirò io con l'effettivo attack plan)
il planner utilizza la documentazione della challenge per generare un piano suddiviso in step, ognuno con un obiettivo e delle condizioni verificabili
la checklist è importante perchè ci permette di avere un esecutore che non dovrà semplicemente svolgere il lavoro ma dovrà step by step certificare quanto sta facendo, fornendo inoltre anche delle evidenze relative a un determinato esito della checklist (questo è utile poichè spinge il modello a dover ragionare su ciò che sta spuntando)
Il planner è composto da una fase di generazione testuale del piano d'attacco mediante un LLM che poi viene trasformato in strutture dati concrete scambiate durante il corso dell'esecuzione una volta definito il percorso vi è la necessità di doverlo eseguire.
passaggio a executor (zoom dove si vede il bridge orchestratore la macchina kali ecc...)
un executor che ha il compito di svolgere il percorso e un orchestratore che opera per tutto il workflow ma in particolar modo in queste fasi

l'executor riceve dei singoli step del testing da dover eseguire, mediante tool calling al bridge effettua queste operazioni e riporta le evidenze+ le checklist da spuntare, ad ogni step sceglie le operazioni da compiere in base ai risultati osservati.
l'orchestratore segue direttamente ciò che sta facendo l'executor, invia uno step alla volta da fargli eseguire e prima di definire l'esito di uno step con successo controlla se tutta la checklist è stata spuntata correttamente
Per evitare il fenomeno di loop calling l'executor ha un numero di step massimi prestabiliti estendibili ad un altro valore che indica il tetto massimo raggiungibile
(non so bene come spiegare che executor si divide in 2 punti executor +LLM)

(zoom al bridge che separa la cosa)
in che modo l'executor riesce ad interagire con la macchina target?
è stato realizzato appositamente un bridge che espone 2 server che permettono il tool calling, uno non è stato realizzato da me ovvero HexStrike, un MCP server che permette il tool calling, il problema di questo però è che è di tipo stateless, per tale motivo è stato implementato un altro server eseguito direttamente sulla macchina kali che permette all'esecutore di utilizzare più sessioni della shell (come se ci fossero più schermate aperte (volendo si possono mettere più shell una di seguito all'altra come figura)) e consentire all'LLM di gestirle introducendo un approccio stateful e ampliando ancora di più i tool possibili che può eseguire
difatti una scelta progettuale che ci tengo ad evidenziare è che l'aggiunta di questo bridge consente nell'effettivo di poter implementare in futuro nuovi server da poter aggiungere e che può utilizzare il nostro executor.
una cosa interessante è che quest'ultimo non li riceve tutti insieme bensì in base al piano (che definisce quali tool sono necessari per quello step) vengono filtrati quelli non necessari per dare meno manovra all'executor e avere un controllo diretto su quelli che sono gli input e gli output che vengono scambiati tra il nostro LLM e il server(secondo me è molto importante)

dopo aver eseguito gli step Vulcatest deve produrre un risultato facilmente interpretabile sulla base della miriade di evidenze raccolte durante l'esecuzione: ogni step svolto, ogni output, ogni singolo errore ecc...
zoom sul final evaluator
dunque è stato predisposto un nodo di final evaluation che prende le evidenze e le riassume producendo un report su quanto accaduto
in vista del nodo di healing che interviene in caso di esito negativo del test per correggere la problematica
(zoom sul nodo di healing con il logo di antigravity in mezzo a quello che invece ho imposto io)
Prima di discutere su come il nodo di healing effettivamente è in grado di correggere una eventuale problematica è fondamentale distinguere due punti di vista differenti che hanno due macro gruppi di vulcatest
tutto ciò che abbiamo visto finora, prima del nodo di healing aveva il compito di effettuare un testing in-band(forse devo cambiare al volo queste 2 terminologie in qualcosa di meglio), vedere la macchina dall'esterno come chi deve affrontare la challenge.
invece il nodo di healing ha una visione out of band della cosa, analizza e modifica i sorgenti che caratterizzano la macchina potendo esplorare il codice e le varie configurazioni.
ciò che avevamo additato prima come non adatto in questa specifica necessità può diventare invece qualcosa di utile.
utilizzare un harness general purpose in questo caso antigravity permette quella flessibilità che l'esecuzione non doveva avere, risolvere un problema è qualcosa che ha diverse sfaccettatura e include correzione, lettura di codice e implementazione di nuove risorse.
tutto questo però include comunque delle limitazioni e ove possibile una raccolta delle evidenze svolte
- viene tenuta traccia di tutto ciò che modifica il nodo di healing, salvando come evidenza un file che mostra le righe di codice modificate o i file aggiunti
- viene limitato il numero di chiamate che è possibile effettuare a questo nodo, mediante un parametro
- mediante prompt molto restrittivi viene esplicitamente richiesto di non fornire suggerimenti o facilitare le challenge
(questi 3 punti li vedo con qualche figura o altro dimmi tu che ne pensi)


chiusura con il rebuild

una volta terminata la correzione è fondamentale effettuare un retesting per chiudere il ciclo creato (figura semplice che fa capire il loop effettivo)

PROBLEMA: MANCA LA FIGURA CHE MOSTRA PIZZERIA AGGIUSTATA, ERA QUI CHE DOVEVO METTERLA NO? QUANDO PARLAVO DI HEALING


## BLOCCO 3