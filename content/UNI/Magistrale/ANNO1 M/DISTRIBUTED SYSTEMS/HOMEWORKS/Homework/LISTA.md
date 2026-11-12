## `DS-2425-02-Models.pdf`

- **P. 35 — Modellare la perdita di un messaggio come evento.** Allena a rappresentare un guasto del canale nel modello di esecuzione.
- **P. 89 — Fairness con processi che possono andare in crash.** Chiede di adattare la definizione di fairness quando un processo può smettere di essere schedulato.

## `DS-2627-02-Models-reviewed (1).pdf`

- **P. 56 — Safety or liveness?** Fa classificare proprietà date e costruire nuovi esempi.
- **P. 56 — Time-bounded recovery implica eventual recovery?** Fa verificare un’implicazione tra due proprietà partendo dalle loro definizioni.
- **P. 56 — Riscrivere la proprietà sugli insiemi di output.** Fa scomporre una specifica che combina più requisiti.
- **P. 74 — Stubborn delivery senza condizioni sulla correttezza dei processi.** Chiede sia di trovare un controesempio per l’algoritmo sia di dimostrare l’impossibilità generale.
- **P. 74 — Perfect link su fair-lossy link con memoria limitata ★.** Introduce il vincolo di poter memorizzare al massimo \(k\) messaggi.
- **P. 81 — Algoritmo di Caio, senza timer né loop infinito.** Fa individuare in quali esecuzioni funziona un algoritmo e in quali smette di garantire la consegna.
- **P. 92 — Counting server su perfect link.** Fa diagnosticare due comportamenti anomali osservando richieste e risposte tra client e server.

## `DS-2526-03-Time1.pdf`

- **P. 60 — Quale diagramma è sfavorevole all’algoritmo di Cristian?** Fa confrontare due scambi richiesta-risposta e ragionare sull’errore nella stima del tempo.
- **P. 61 — Perfect link con tempo di consegna limitato.** Fa ragionare su cosa si può garantire quando il ritardo è limitato per i messaggi che arrivano, ma il canale può perderli.

## `DS-2425Time2.pdf`

- **P. 44 — Calcolare i vector clock e verificare le relazioni causali.** Unisce il calcolo dei timestamp alla verifica di _happened-before_.
- **P. 47 — Ricostruire un’esecuzione da due vector timestamp.** Inverte il problema precedente e chiede anche di verificare se la ricostruzione è unica.
- **P. 65 — Vector clock con numero di processi e ID inizialmente sconosciuti.** Richiede di adattare la struttura del clock mantenendo la possibilità di riconoscere eventi concorrenti.
- **P. 66 — Algoritmo di Lamport per la mutua esclusione con link non FIFO.** Fa verificare le proprietà una per una e costruire tracce con lo stato interno dei processi.

## `DS-2425Failure_detection_leader_election.pdf`

- **P. 29 — Durata minima del round per il failure detector \(P\).** Fa ricavare un limite usando lo scarto tra gli orologi e i ritardi del canale.
- **P. 77 — Timeout adattivo per un eventually perfect failure detector ★.** Fa progettare una strategia che bilanci rapidità di stabilizzazione e rapidità nel sospettare un crash.
- **P. 77 — Codice e dimostrazioni per la mutua esclusione fault-tolerant.** Richiede di implementare la gestione delle richieste e il recupero dopo un cambio di leader.
- **P. 78 — Problemi risolvibili nel modello sincrono e nel fail-stop.** Fa confrontare i modelli in base ai problemi che possono risolvere.
- **P. 80 — Mutua esclusione fault-tolerant in fail-silent e fail-noisy.** Fa valutare la fattibilità dello stesso problema con due diverse garanzie sui guasti.
- **P. 81 — Esercizio 2.8, safety con un failure detector che viola le ipotesi.** Fa verificare quali garanzie di safety dipendono dal comportamento del detector.
- **P. 85 — Sincronizzazione facendo la media degli orologi dei vicini.** Fa valutare se una regola locale produce sincronizzazione su un grafo arbitrario.

## `DS-1920-07-Broadcast.pdf`

- **P. 41 — Majority-Ack con \(|F| = n/2 + 1\).** Fa verificare se la soglia di ACK permette ancora all’algoritmo di funzionare con quel numero di crash.
- **Pp. 50–51 e 56 — Ridurre il costo in messaggi di Lazy Reliable Broadcast.** Richiede di modificare l’algoritmo e analizzare quanti messaggi invia al crescere dei guasti.

## `DS-2324Ordered_communications_1_NOSOLUTION.pdf`

- **P. 38 — Completare una storia con vincoli FIFO, causali e totali.** È la traccia più completa del gruppo. Chiede sia di elencare sequenze valide sia di costruirne altre che rispettano solo alcuni vincoli.
- **P. 39 — Esercizio 3.11, confrontare due definizioni di causal delivery.** Fa verificare se le due definizioni accettano le stesse esecuzioni quando manca una consegna.
- **P. 41 — Esercizio 3.12, best-effort broadcast con causal delivery.** Fa verificare se si può garantire la consegna causale senza l’agreement del reliable broadcast.
- **Pp. 45–46 — Reliable Broadcast su una linea con un oracolo dei vicini.** Richiede di progettare il broadcast quando un crash può cambiare i vicini con cui si comunica.
- **P. 47 — Esercizio 4, leader election con canali di tipo A e B.** Fa confrontare tre topologie e decidere, caso per caso, se scrivere un algoritmo o dimostrare l’impossibilità.

## `DS-1920-Consensus.pdf`

- **P. 35 — Hierarchical Uniform Consensus con BEB al posto di RB.** Fa verificare cosa succede alla decisione quando si indebolisce la garanzia con cui viene diffusa.

## `DS-Distributed_registers.pdf`

- **P. 89 — Valori ammessi dalle letture di un registro regolare o atomico.** È la traccia più completa del gruppo perché combina più scrittori, operazioni sovrapposte e una scrittura interrotta da un crash.

## `DS-1819-10-Distributed_registers 2.pdf`

- **P. 58 — Implementare un registro atomico \((N,N)\) in due modelli di guasto.** Fa confrontare cosa serve quando si dispone di \(P\) e quando si assume una maggioranza di processi corretti.
- **P. 59 — Simulare il message passing con registri atomici \((1,1)\).** Richiede di costruire la comunicazione a partire da primitive di memoria condivisa.
- **P. 61 — Esercizio 4.7, progettare un registro atomico \((1,1)\) più efficiente.** Fa sfruttare la presenza di un solo lettore per ripensare il protocollo.
- **P. 64 — Esercizio 4.6, quando si possono omettere gli identificatori di richiesta.** Fa confrontare due protocolli e capire quali garanzie servono per associare le risposte all’operazione giusta.