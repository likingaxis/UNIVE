##### Diversi tipi di jammer
- nel laboratorio precedente abbiamo visto gli attacchi con jammer e alla fine era stato spiegato un macrocategoria specifica ovvero dei selective jammer
- i jammer si dividono in
	- broadband 
	- narrowband
	- spot 
abbiamo aperto un file simulink bpsk  per capire bene la modulazione
la bpsk è una delle più semplici e robuste
- vederemo il diagramma a costellazione
- l'eye diagram
- il bit error rate al variare dell'SNR
##### Come è composto il progetto BPSK simulink
- il primo modulo genera bernoulli valori casuali
- il secondo
- il terzo
- ecc
abbiamo aggiunto due analizzatori 

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

>[!question]- domanda 3

>[!question]- domanda 4