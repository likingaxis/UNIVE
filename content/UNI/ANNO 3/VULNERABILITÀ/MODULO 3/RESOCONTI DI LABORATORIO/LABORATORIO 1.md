In questo laboratorio abbiamo utilizzato Matlab per analizzare uno spettro dato dalla ricezione di frequenze da un dispositivo chiamato Nooelec RTL-SDR v5 Bundle
- acquistabile su amazon https://www.amazon.it/Nooelec-RTL-SDR-Bundle-100kHz-1-75GHz-Alluminio/dp/B01GDN1T4S/ref=sr_1_1?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-1

##### Configurazione
- inizialmente il dispositivo andava configurato e installato mediante zendac(su windows)
- dopo averlo fatto è stato eseguito su matlab un progetto dato dalla prof che sfrutta un simulink
- matlab inzialmente si presenta come Capture 3
	- un simulink fondamentalmente è una simulazione di...
- progetto strutturato dalla seguente cosa Capture 2 foto
	- a sinistra abbiamo la Centratura della frequenza che sara per l'appunto la nostra fc
		- che manderemo in input al nostro RTL SDR receiver
		- ci fornirà diversi dati sulla frequenza a cui ci stiamo appoggiando su una determinata porzione di banda da noi visibile
	- Capture 1 possiamo vedere diverse frequenze rumorose 
		- (scarica tool per fare video sarebbe carino mettere gif di frequenze rumorose)
		- spiega asse x asse y e cosa stiamo vedendo in generale
	- una volta settata una center frequency da noi decisa 102.5(con elevazione a 6 poichè l'input è espresso in Hz)
		- ci siamo messi in ascolto di una frequenza da noi desiderata
		- il tutto era estremamente rumoroso
		- mettendo un averaging method esponenziale sotto suggerimento dell'insegnante a 1 siamo riusciti a definire bene i picchi di frequenza
			- possiamo dedurre che è li che si hanno le vere e proprie informazioni utili
		- come visto è stato messo 102.5 ma probabilmente non prendeva adeguatamente perchè in Capture 6 a 0 non abbiamo picchi ne onde particolari
			- in realtà prende a 92.4
		- con capture 8 mi connetto a una diversa frequenza 106.6 capture 9 per vedere il cambio di input
		- con uno strumento di misurazione basilare di spectrum analyzer posso misurare ampiezza in mhz e in dbm altezza di un determinato range da me definito della banda totale da me visibile
- specchietto di cosa ho imparato...
	- asse x 
	- asse y
	- ampiezza 
	- banda
- con il metodo di misura abbiamo la distanza in ampiezza e in dbm e in khz
