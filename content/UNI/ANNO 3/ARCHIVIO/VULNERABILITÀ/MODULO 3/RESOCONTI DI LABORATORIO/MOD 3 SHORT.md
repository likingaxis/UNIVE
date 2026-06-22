#### FORMULE SPARSE
$$dBm=10*log_{10}(mW)$$
$$r(t)=s(t)+n(t)$$
$$SNR(dB)=P_{Signal}(dB)-P_{Noise}(dB)$$
$$C(t)=A*cos(2\pi f_t+\phi)$$
$$\frac{E_b}{N_0}$$

$$BER=\frac{bit_{errati}}{bit_{trasmessi}}$$
$$s(t)=Re\{A*m(t)*\exp^{J(2\pi f_{ct}+\phi)}\}$$
$$d(k)=A*m(k)*exp^{(j*2\pi \Delta f_{ck}+\phi)}*A*m(k-1)*exp^{-(j*2 \pi \Delta f_{ck-1}+\phi)}$$  
- d(k)>0 bit 0
- d(k)<0 bit 1
###### BPSK
protocollo di modulazione del segnale coerente
di tipo binario
sfrutta cambio di fase per modulare o demodulare un segnale per rappresentare dei simboli
- simboli differenziati da un cambio di fase 0 e 180 gradi
###### Jammer
- broadband
	- disturbo di una banda ampia
- narrowband
	- disturbo di una banda più ristretta
- spot
	- specifico per una certa frequenza ben precisa o canale
###### Protocolli Ad accesso multiplo
- *TDMA*
	- time division multiple access
	- dividi la banda tra più trasmettitori in base all'unità del tempo
- *FDMA*
	- Frequency division multiple access
	- dividi il canale in più frequenze, ognuno sfrutta una porzione per trasmettere ciò di cui ha bisogno
- *OFDM*
	- Orthogonal Frequency Division Multiplexing
	- suddivide il canale in multi portanti tra loro ortogonali per trasmettere più segnali
- *CDMA*
	- Code Division Multiple Access
	- consente accesso multiplo in base a dei codici utilizzati per fare codifica e decodifica, è possibile trasmettere sulla stessa banda più segnali, ogni utente usa un suo insieme di chip bit
	- $z_{i,m}=d_i*C_m$
	- $D_i=\sum_{i=1}^{M}{z_{i,m}*C_m}$
###### DSSS
Il DSSS, Direct Sequence Spread Spectrum, è una tecnica che aggiunge spreading a una modulazione digitale, ad esempio BPSK
L’idea è moltiplicare ogni bit/simbolo informativo per una sequenza di chip pseudo-casuale. La chip rate è maggiore della bit rate, quindi ogni singolo bit viene rappresentato da più chip
Questo aumenta la banda occupata dal segnale, perché per trasmettere lo stesso bit rate si inviano variazioni più rapide nel tempo. In cambio, il segnale diventa più robusto a rumore, interferenze e jamming, perché al ricevitore si può fare il despreading usando la stessa sequenza di chip
###### DBPSK
tecnica di modulazione non coerente dove è necessario conoscere solo la frequenza e il timing dei simboli
il ricevitore confronta il simbolo ricevuto corrente con quello ricevuto precedente, e decide il bit in base alla variazione di fase tra i due
- se il simbolo è 1 allora il segnale vede un cambio di fase rispetto alla precedente
- se il simbolo è 0 allora il segnale mantiene la stessa fase 
#### SEMINARIO 1
- sicurezza delle reti mobili
- SDR Utilizzate per analizzare, trasmettere, inviare segnali radio
- mediante servizi opensource 
###### Analizzare 3 livelli di sicurezza
- design security
	- sicurezza by design dei prodotti, possono lasciare vulnerabilità già in fase del progetto stesso
- configuration security
	- misconfigurazione da parte degli utenti, lasciando flag attivi che non dovevano essere attive
- security assurance
	- sicurezza vera e propria dei dispositivi, rispettando i 2 livelli di sicurezza precedenti e una serie di regole
###### Network mapper per base station
- *5G MAP*
	- necessario:
	- SIM, SDR, SOFTWARE OPEN SOURCE
	- utile per scoprire informazioni di una rete
	- integrità e algoritmi che usa
	- invia un plot di algoritmi di cifratura ripetutamente finché per deduzione logica non si ottengono tutti quelli che può definire
###### Privacy degli utenti
- la privacy degli utenti con le reti mobili è molto precaria
- identificativi degli utenti con UE(User Equipment)
	- IMSI, IMEI, TMSI
- *IMSI CATCHER*
	- creiamo una falsa base station chiamata rogue base station, trasmettiamo a una potenza maggiore della base station originale
	- la maggior parte degli UE non si fanno troppi scrupoli ad inviare informazioni private come IMSI e IMEI, ce li facciamo inviare
###### Man in the middle
ci poniamo come intermediari per ricevere e manipolare informazioni inviate mediante radio
- *DNS SPOOFING OVER THE AIR*
	- ci si pone tra UE e BS
	- conoscendo IP del DNS andiamo a modificare l'IP da inviare all'UE
	- tante volte UE e BS comunicano con cifratura per poter inviare il messaggio manipolato eseguiamo queste operazioni
	- conoscendo il ciphertext dato da
		- $ciphertext= plaintext \oplus keystream$ 
	- prendiamo il $mask=plaintext \oplus plaintext_{nuovo}$
	- $ciphertext_{nuovo}= ciphertext_{vecchio}\oplus mask$ 
		- e otteniamo il nuovo $ciphertext$ da inviare
	- inoltre poi bisogna gestire checksum e altro sempre seguendo una logica simile dove si cerca di modificare in modo che tutto torni
