##### Ricezione FM analisi del rumore e del canale
In questo secondo laboratorio la professoressa ha introdotto un nuovo dispositivo SDR chiamato USRP B210, che oltre ad avere la possibilità di ricevere il segnale radio ha anche la possibilità di trasmetterlo
>[!info] noi abbiamo comunque usato il ricevitore RTL-SDR 
###### introdurre il concetto di rumore più nel dettaglio
- questa lezione ha come obiettivo quella di farci comprendere i concetti base relativi al rumore 
in un sistema di comunicazione reale il segnale ricevuto non coincide mai  perfettamente con quello trasmesso, durante la propagazione di quest'ultimo è possibile che ci siano disturbi del segnale di varie tipologie
Un modello molto usato per rappresentare questo fenomeno di rumore è il AWGN(Additive White Gaussian Noise)
- che fondamentalmente descrive il segnale ricevuto con la seguente formula:
$$r(t) = s(t) + n(t)$$
- $s(t)$ è il segnale trasmesso
- $n(t)$ è il rumore aggiunto dal canale, segue una ampiezza con distribuzione gaussiana
- $r(t)$ è il segnale ricevuto
>[!info] piccola parentesi sulle distribuzioni gaussiane
>aggiungi dopo

>[!attention] all'aumentare della potenza del rumore aumenta anche il livello medio dello spettro ovvero il cosiddetto noise floor

- oggi possiamo vedere un esempio tangibile di noise floor e di misurazione di quest'ultimo

##### Modello Simulink più avanzato
A lezione è stato introdotto un modello Simulink più complesso in grado di ricevere il vero e proprio segnale FM sempre sfruttando la RTL-SDR
quest'ultimo non è stato utilizzato ai fini del laboratorio ma solo con lo scopo di farci vedere come è composto e da quali moduli è formato
![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 2/capture 4.PNG]]
- i moduli utilizzati sono stati i seguenti:
	- il blocco per impostare la **frequenza centrale**
	- il blocco **RTL-SDR Receiver**
	- un analizzatore di spettro per osservare il segnale FM ricevuto
	- un blocco di **demodulazione FM**
		- consente di effettuare quel processo di recupero delle informazioni effettive
		- vengono inizialmente trasmesse con una modulazione ad esempio moltiplicando per una certa portante, questo ci consente di inviare il segnale a frequenze più elevate
		- il demodulatore consente di riottenere l'informazione originale 
	- un secondo analizzatore di spettro per osservare il segnale dopo la demodulazione
	- un filtro
		- ci consente di vedere solo la banda utile del segnale e rimuove le componenti da non considerare
		- ad esempio un segnale può condividere più dati
			- l'audio mono
			- l'audio stereo
			- il tono pilota per la sincronizzazione
			- RBDS che danno informazioni come il nome della radio o altro
	- un blocco di sotto-campionamento per ridurre le frequenze da utilizzare
	- l’uscita audio
- applicato ad RTL abbiamo... 
	- screen che manca di come si vede il tutto
##### Il Channel measurements e Occupied Bandwidth
- lo spectrum Analyzer ha uno strumento che ci permette di calcolare automaticamente alcune misure utili di un certo canale, questo strumento si chiama Channel Measurements
![[2026-05-1410-13-46-ezgif.com-crop.gif|657]]
- possiamo vedere che ci da informazioni sul Channel power la banda occupata in kHz e la frequency Error
- il canale viene specificato da un range in MHz ad esempio questo è
	- `-100000`di start Frequency e `100000` di stop Frequency
##### Misurazioni del segnale trasmesso dall'insegnante
- abbiamo ricevuto del segnale trasmesso dal dispositivo USRP B210
- il segnale inizialmente si presentava in questo modo e vedeva dei picchi misurati adeguatamente sempre grazie agli strumenti forniti da spectrum analyzer
![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 2/capture 8.PNG|498]]
le misure effettuate sono state le seguenti:
- misurare le distanze dello spettro del primo e secondo picco e anche l'altezza massima dei due
- il noise floor
```scss
Misure del primo picco P1
	distanze:
		ΔkHz:49.3904
		ΔdBm:2.5438
	altezza massima:
		kHz:31.2500
		dBm:41.2747
Misure del secondo picco P2
	distanze:
		ΔkHz:27.4434
		ΔdBm:1.3774
	altezza massima:
		kHz:61.1979
		dBm:38.9725
noise floor:
	distanze:
		ΔkHz:241.0246
		ΔdBm:0.2505
	i due cursori rispettivamente:
		Cursor 1:  
			kHz:-147.2153  
			dBm:4.5737  
		Cursor 2:  
			kHz:-388.2400  
			dBm:4.8016
```
- ovviamente è stato escluso il picco quello a 0 che è dovuto a limitazioni hardware
- qua sotto le rispettive foto delle misurazioni
![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 2/capture 7.PNG|517]]
![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 2/capture 6.PNG|517]]
![[capture14.png|355]]

###### Stima dell'SNR
- da queste misurazioni fatte possiamo stimare l'SNR ovvero il rapporto segnale rumore
	- utile per valutare la qualità della ricezione
si calcola di solito con:
$$SNR = Psignal / Pnoise$$
ma con potenze espresse in dBm si fa la differenza
$$SNR(dB) = Psignal(dBm) - Pnoise(dBm)$$

quindi prendendo il $Pnoise ≈ 4.7 dBm$ facendo la media tra i due dBm dei cursori
gli SNR dei due picchi saranno:
```scss
primo picco P1:
	SNR ≈ 41.2747 - 4.7  
	≈ 36.6 dB
secondo picco P2:
	SNR ≈ 38.9725 - 4.7  
	≈ 34.3 dB
```

##### Possibile jamming in aggiunta
in laboratorio abbiamo successivamente simulato del rumore in aggiunta nella stessa zona di interesse 
- simulando una sorta di attacco jamming che disturbava la comunicazione
nel seguente video si può vedere l'esatto momento in cui arrivava il rumore
>[!attention] il video è stato velocizzato in 3x e ho ritoccato un po i metodi di averaging

![[il segnale cambia.gif]]

- il noise floor è aumentato nella zona di interesse in modo decisamente esagerato
###### Misurazione del noise floor e ricalcolo dell'SNR
![[capture 12.PNG]]
- varie misure post jamming:
```scss
il noise floor ora è tra circa
	29.8 dBm e 30.3 dBm
	quindi 
		Pnoise ≈ 30.0 dBm
i picchi P1 e P2 sono cambiati particolarmente
	il picco che prima si vedeva P2 ora non è più visibile
	invece il picco P3 ora rappresenta quello che prima era il picco P1
	e ha le seguenti misurazioni
		dBm:30.4302 precedentemente era dBm:41.2747
```
- ora è possibile calcolare l'SNR, considerando il picco che risulta ancora confrontabile con quello osservato prima del jamming, ovvero l'attuale P3 si ottiene:
```scss
SNR3 = 30.4302 - 30.0  
SNR3 ≈ 0.4 dB
```
- possiamo notare un forte peggioramento del rapporto segnale-rumore.
- è pressoché inutilizzabile
###### Selective Jamming
- questo rumore ricevuto si nota davvero molto, spesso i veri attacchi di Jamming sono di tipo selettivo(più intelligenti)
- Un attacco più mirato può concentrarsi solo su una componente importante del segnale, ad esempio il tono pilota usato per la sincronizzazione
- Nel caso del segnale FM stereo, disturbare il tono pilota può compromettere la sincronizzazione e quindi peggiorare la ricostruzione del segnale stereo, anche senza alzare enormemente il rumore su tutta la banda
##### Conclusione del laboratorio
abbiamo calcolato l'SNR prima e dopo il disturbo di un segnale trasmesso dalla docente
notando un deterioramento significativo
l'obiettivo della seguente sessione in laboratorio è stata quella di analizzare e misurare il noise floor e i vari picchi e sfruttare realmente la formula dell'SNR

