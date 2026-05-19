- il seguente laboratorio si è tenuto in 2 giornate diverse
#### Giorno 1
##### Diversi tipi di jammer
Nel laboratorio precedente abbiamo visto attacchi con Jamming, ovvero inserimento intenzionale di rumore o interferenza per disturbare una comunicazione radio
- i principali tipi di jammer sono:
	- Broadband jammer:
		- disturba una banda estremamente ampia di frequenze
	- Narrowband jammer:
		- disturba una determinata frequenza
	- Spot jammer:
		- simile al narrowband ma segue in modo dinamico un determinato canale

>[!attention] in questo laboratorio non vedremo l'uso effettivo di jammer ma avremo una simulazione di rumore tramite un blocco detto AWGN

##### Modulazione BPSK
prima di introdurre il modello Simulink utilizzato in questo laboratorio vorrei precisare delle cose relative a cosa è la modulazione digitale e cosa è il BPSK
>[!info] La modulazione digitale
>serve per rappresentare una sequenza di bit mediante del segnale fisico trasmissibile modificando una delle seguenti caratteristiche della portante
>- ampiezza
>- frequenza
>- fase
>portante o carrier che ricordiamo essere 
>$c(t) = A cos(2πft + φ)$
>con $A$ ampiezza f frequenza e $φ$ la fase

>[!info] BPSK(**Binary Phase Shift Keying**) è un tipo di modulazione digitale
>il BPSK è una delle modulazioni più semplici ma allo stesso tempo robuste
>- come caratteristica della portante si modifica la fase lasciando il resto invariato
>	- avremo 2 simboli differenziati da un cambio di fase
>		- es: 0 gradi e 180 gradi
##### Come è composto il progetto BPSK Simulink
In questo laboratorio è stato utilizzato un modello Simulink che simula tutta la catena di comunicazione sfruttando BPSK
![[Pasted image 20260519203118.png]]
- il **primo blocco** è il generatore Bernoulli Binary(informazione originale da voler trasmettere)
	- questo blocco genera una sequenza casuale di bit cioè valori binari tra 0 e 1 con probabilità impostata a $1/2$
- poi abbiamo il **trasmettitore**
	- il **secondo blocco** trasforma i bit in simboli modulati sfruttando la BPSK
	- il **terzo blocco** è detto Rectangular Pulse Filter, modella il segnale nel tempo producendo una forma d'onda trasmissibile
- abbiamo il **quarto blocco** **AWGN Channel**
	- Additive *White Gaussian Noise*
	- blocco che simula un canale in cui il segnale trasmesso vede una aggiunta di rumore
	- viene gestito tramite un parametro che è $Eb/N0$ che rappresenta il rapporto tra l'energia per bit e la densità spettrale del rumore
		- quando è **alto** c'è più segnale che rumore
		- quando è **basso** il rumore è più significativo del segnale e la comunicazione peggiora
- successivamente possiamo vedere il **ricevitore**
	- composto dal **quinto blocco** *Integrate and Dump*
		- serve a integrare il segnale ricevuto in un effettivo intervallo di tempo simbolico andando a sommare i campioni di segnali per capire quale segnale è stato trasmesso in quel determinato range
			- se il risultato dell'integrale è maggiore di 0 allora presumibilmente sarà il simbolo del bit a 1
			- se il risultato è minore di 0 allora ci sarà un bit a 0
	- un **sesto blocco** di gain con $Ts/Tb$ 
	- un **settimo blocco** di modulazione *BPSK*, capiremo molto bene come funziona mediante analizzatori come quello di costellazione
##### Strumenti di analisi utilizzati nel modello
Durante il laboratorio sono stati utilizzati parecchi strumenti di analisi per capire a pieno con cosa stavamo lavorando
###### Spectrum analyzer
- visto anche al laboratorio precedente ci permette di analizzare il segnale su un certo range di frequenze
	- sulle x la frequenza sulle y la potenza
- utile per confrontare il segnale prima e dopo il rumore aggiunto
![[Pasted image 20260519205524.png|228]]
###### Time Scope
Ha 3 ingressi e serve per osservare il segnale nel tempo infatti abbiamo
- sulle x il tempo
- sulle y l'ampiezza del segnale
- con i 3 ingressi possiamo osservare
	- il segnale prima del rumore
	- il segnale dopo il rumore
	- il segnale dopo il blocco di integrazione
per rendere più chiara la visualizzazione ho messo uno stile stem per rappresentare i campioni in modo più chiaro
![[Pasted image 20260519205930.png|370]]

###### Constellation Diagram
ci permette di vedere i simboli ricevuti su un piano $I/Q$
- sulle x ho la In-phase
- sulle y ho la Quadratura(chiedi meglio domani alla prof cosa sono)
- nel caso della BPSK avrò due punti della costellazione che si trovano una a sinistra e una a destra
	- poi avrò i punti ricevuti che rappresentano il segnale e possono essere interpretati come bit
	- se si trovano a sx posso vederli come 0 se si trovano a dx come 1
###### Eye Diagram
Vedendo più intervalli di tempo ci permette di capire la qualità della comunicazione
se l'occhio figurativo che si forma è chiuso allora la qualità è pessima se l'occhio è aperto allora la qualità è buona
##### Misurazioni fatte e considerazioni
ho provato due $Eb/N0$ diverse e sfruttando gli strumenti di analisi mi sono fatto delle considerazioni interessanti sul variare del rumore e su quanto effettivamente il segnale può disperdersi fino al raggiungimento di una situazione dove effettivamente non si può distinguere quale dei due simboli si sta ricevendo



per capire inizialmente il progetto abbiamo aggiunto due spectrum analyzer
- uno prima il modulo AWGN
- uno dopo il modulo AWGN
- lo abbiamo modificato a 5 dentro
- e ora abbiamo un error rate maggiore
- possiamo anche vedere il constellation diagram
	- vediamo il segnale che mostra l'ampiezza e la fase
	- l'ampiezza resta costante ma cambia la fase perchè sono con BPSK
	- stessa cosa se ho un 2ASK
- mostra 2 confronti uno a 5 uno a 100
il time scope ha 3 ingressi
- prima del rumore
- dopo il rumore
- vedo cosa ha fatto l'integrale
	- somma la grandezza dei campioni(vedi sul time scope)
	- se era >0 il bit è a 1
	- vedi con time sc
	- se avessi più simboli avrei più problemi
- dopo il rumore non capisco più nnt
- analisi foto del time scope
	- nell'asse delle x ho il tempo passato
	- in quello delle y ho l'ampiezza
- ho messo pure modalità di visualizzazione axes style stem
	- passando dal digitale all'analogico
	- metti capture 2

quando la nuvola inizia ad allargarsi troppo della costellazione
- non si distinguono i bit a dx e sx
- fai schema della prof su `excalidraw` fatto foto della prof sul tel

- abbiamo anche visto come misurazione gli eye diagram
	- formano un occhio se le cose vanno bene
	- quando si chiude troppo rumore
	- vedi foto slide

quindi abbiamo visto lo spectrum analysis(misura frequenza e potenza) poi il time scope(che si chiama) poi la costellazione(che misura) il diagramma ad occhio(che misura)
Dentro AWGN channel dobbiamo modificare il Eb/No che equivale all'SNR

la media si vede con SMR
###### Domande di laboratorio
>[!Question]- domanda 1
> 
> Add a Time Scope block and display the output of the Ideal Rectangular Pulse Filter block. What is its average signal power?

per misurare la average signal power
- metodo 1
	- calcoliamo la ampiezza e la eleviamo al quadrato
		- $s(t)$ è l'ampiezza nel tempo del segnale
		- la calcolo facendo in questo caso è 1 
		- $s(t)^2$
- metodo 2
	- faccio RMS con strumento di misurazione del time scope tools > measurements
	- $P=RMS^2$

>[!question]- domanda 2


Add a Time Scope block and display the input to the AWGN Channel block, the output of the AWGN Channel block, and the output of the Gain block. In the AWGN Channel block, set the Input signal power to the value you calculated in the previous problem and set Eb/N0 to 12dB. Set the remaining parameters based on your understanding of the simulation. Run the simulation, and take a screen capture of the Time Scope block. Explain and interpret the plots

>[!question]- domanda 3

Add Eye Diagram and Constellation Diagram blocks to the signal at the input of the BPSK Demodulator Baseband block. Set the AWGN Channel block for Eb/N0 of 12dB. Run the simulation, and take screen captures of the eye diagram and signal constellation. Repeat for Eb/N0 of 6dB. Explain and interpret the plots. Comment on how the plots change as a function of Eb/N0

>[!question]- domanda 4

You will now use the model to simulate the system performance over a range of Eb/N0 values. Run the simulation for Eb/N0 values of 0dB to 12dB in 1dB steps. Set the simulation time to ensure the results are meaningful. This is especially important when very few bit errors are expected. Observe and record the error rate for each run. Plot bit error rate vs Eb/N0 and compare to the theoretical prediction. Comment on the results
