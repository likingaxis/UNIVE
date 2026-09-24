
Il seminario riguarda la **sicurezza del positioning nel 5G**, cioè l’utilizzo della rete 5G non solo per la comunicazione, ma anche per stimare la posizione di un dispositivo. Questa funzionalità è importante perché il 5G può offrire **alta precisione**, anche a livello molto fine, e **bassa latenza**, quindi aggiornamenti rapidi della posizione. 
Inoltre può essere utile in ambienti dove il GPS funziona male o non è disponibile, come fabbriche, stadi, aree sotterranee o zone urbane dense. Il GPS, infatti, può essere vulnerabile a interferenze, jamming e spoofing, quindi il positioning tramite rete mobile può rappresentare un’alternativa o un supporto importante.

Nel sistema di localizzazione 5G entrano in gioco alcuni elementi principali: 
lo **UE**, cioè il dispositivo utente da localizzare, 
il **gNB**, cioè la stazione base 5G
la **LMF**, ovvero la funzione della core network che gestisce le informazioni di localizzazione. 

Per stimare la posizione vengono usati protocolli e segnali specifici, tra cui **LPP**, **NRPPa**, **PRS** e **SRS**.

In particolare, i **PRS**, cioè _Positioning Reference Signals_, sono segnali di riferimento usati per effettuare misure legate alla posizione. 
Questi segnali vengono inseriti nella griglia **OFDM**, che organizza le risorse radio in due dimensioni: 
il tempo, diviso in simboli OFDM, e la frequenza, divisa in sottoportanti.

Il problema centrale presentato nelle slide è che questi segnali di riferimento possono essere manipolati da un attaccante. 
L’attacco principale discusso è il **meaconing/replay attack**. 
In questo scenario, l’attaccante riceve un segnale legittimo trasmesso dalla stazione base e lo ritrasmette verso il dispositivo vittima. 
La ritrasmissione avviene con un certo **ritardo** e spesso con una **potenza maggiore**, in modo che il segnale malevolo risulti più evidente rispetto a quello originale. 
Il dispositivo riceve quindi sia il segnale legittimo sia quello ritrasmesso dall’attaccante, e questo può alterare le misure usate per calcolare la posizione.

Un concetto fondamentale è il **Time of Arrival**, cioè il tempo di arrivo del segnale. Se l’attaccante introduce artificialmente un ritardo, il ricevitore può stimare un tempo di arrivo sbagliato. Di conseguenza, anche la distanza apparente dalla stazione base cambia, e quindi la posizione stimata dello UE può risultare falsata. 
Dal punto di vista del segnale, l’attacco può generare un **picco falso** nella correlazione: il ricevitore potrebbe interpretare questo picco come quello corretto e basare su di esso la stima della posizione.

Le slide mostrano anche una parte sperimentale realizzata con dispositivi **SDR/USRP**, cioè radio programmabili via software usate per trasmettere, ricevere e manipolare segnali radio. 
Nel testbed sono presenti un trasmettitore legittimo, un ricevitore, un attaccante chiamato “Parrot”, analizzatori di spettro e dispositivi 5G reali. Dal punto di vista pratico, le difficoltà principali sono due: 
- la **self-interference**, perché l’attaccante rischia di disturbare la propria ricezione mentre ritrasmette, 
- e il **timing**, perché deve ricevere e ritrasmettere il segnale molto velocemente.

Per ridurre la self-interference vengono usate antenne direttive, mentre per migliorare il timing si passa da una soluzione software più lenta a una gestione più vicina all’hardware, tramite FPGA.

Infine, le slide mostrano che l’attacco ha effetti sia sul **servizio di positioning** sia sulla **comunicazione**. 
Sul positioning, l’effetto principale è la comparsa di un picco falso che può causare una stima errata della posizione. 
Sulla comunicazione, invece, l’attacco può peggiorare la qualità del collegamento, influenzando parametri come potenza ricevuta, SINR, bitrate e modulazione. 

In sintesi, il messaggio principale del seminario è che il 5G positioning è molto utile e promettente, ma deve essere protetto perché la manipolazione dei segnali di riferimento può portare a errori nella posizione stimata e a un degrado della comunicazione.