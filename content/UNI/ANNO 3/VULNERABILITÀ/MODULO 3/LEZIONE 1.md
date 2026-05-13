##### Modulazione 
- importante: 
- baseband vs passband
- frequenza e conversione
##### Attacco di spoofing
- come viene fatto lo spoofing di un segnale GPS?
#### Cosa è una software defined radio
- dispositivo radio dove una o tutte le funzioni, demodulazione encoding decoding 
	- le definisco tutte via software, molto flessibile!
- i bit vengono modulati in simboli 
	- ma siamo ancora in un dominio discreto
- lo strumento D/A è un convertitore digitale analogico
	- mediante campionamento
		- quanti campioni prendo in un dato secondo
		- con la formula Ts=1/fs
		- sampling time e frequency sampling
	- DAC and ADC
		- tramite teorema di campionamento è stata dimostrato che
		- per avere un buon campionamento
		- $fsample>2*B$
- che li invia una catena a radio frequenza
- che li manda a sua volta ad una antenna
- e viceversa poi accadrà la ricezione
FOTO SLIDE 
- Front end spiegazione della prima parte vicina a una antenna
	- abbiamo anche l'oscillatore che moltiplica
##### RF Zero IF architecture
spiegazione
##### The SDR trend
- di quali dispositivi hardware posso disporre
- in questo schema l'accesso al digitale indica quanto presto posso processare il segnale
	- posso campionare direttamente il segnale in radio frequenza
- la radio deve essere definita su un software totalmente general purpose
###### SDR Architecture
