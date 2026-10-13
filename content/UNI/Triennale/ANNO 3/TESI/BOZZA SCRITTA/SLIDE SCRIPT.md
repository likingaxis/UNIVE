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
questo percorso didattico può essere definito nel mio progetto di tesi come un inteded path (mostra una figura che rappresenta una checklist con una sorta di percorso da seguire oppure una mappa con scritti vulenrabilità 1,2 ecc... oppure enumerazione exploit privilegi root ecc...).

La realizzazione di queste macchine è scandito da un processo particolarmente elaborato definito da una fase di progettazione, poi una di sviluppo, distribuzione e testing(mostra una figura con queste fasi)
Tutto ciò richiede molto tempo (mostra orologio)
Per sopperire a questa problematica e far dedicare più tempo alla ideazione riducendo in particolar modo la parte di implementazione esiste questo progetto chiamato Vulcain: un workflow agentico che automatizza le parti più tediose della realizzazione di queste macchine delegando il lavoro all'AI(valuta se togliere i termini agentici qui e di solo AI così sembra più chiaro oppure scrivere agenti AI) (mostra come ora le fasi precedenti hanno vulcamind vulcaforge e vulcaship con in input una descrizione e in output una macchina vulnerabile)
Far generare macchine B2R spesso non è un processo oneshot, soprattutto dovuto alla variabilità degli agenti AI.

Un esempio che possiamo analizzare è relativo a una macchina pizzeria_B2R che ho generato personalmente utilizzando il workflow di VulcAIn
quest'ultima è stata realizzata correttamente ma presentava una problematica dal punto di conformance rispetto a quello che era il piano didattico previsto e inserito in input mediante la descrizione
doveva essere presente una chat nell'interfaccia web che poi avrebbe esposto una vulnerabilità nota 

(mostra in figura la chat mancante con un punto interrogativo e un cerchio)

 vi è quindi la necessità di  controllare e monitorare il loro operato per verificare che le macchine vengano generate correttamente e che rispettino l'inteded path mostra nella figura una sorta di loop come nelle figure che avevo nelle slide di prima dove si verifica e corregge la macchina da parte di operatori
 come detto in precedenza però l'idea alla base di questo progetto è quello di ridurre il più possibile tutte quelle che sono le fasi noiose, e sicuramente una fase come quella di testing e correzione di bug risulta essere tra queste

Da questa necessità nasce l'idea di realizzare
VulcaTest progettato per automatizzare due attività
(mostra due attività con scritto verifica e correzione)

il primo problema incontrato durante la progettazione di vulcatest risiede nel dover automatizzare un qualcosa che prevede l'interpretazione e l'esecuzione di comandi su una macchina vulnerabile 

##### Blocco 2 - uso di LLM Agentici Harness architettura e implementazione di vulcatest