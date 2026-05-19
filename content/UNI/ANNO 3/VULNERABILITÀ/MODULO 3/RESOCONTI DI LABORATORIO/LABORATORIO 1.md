#### Giornata 1
In questo laboratorio abbiamo utilizzato **MATLAB** per analizzare lo spettro radio ricevuto tramite un dispositivo RTL-SDR
- acquistabile su  qui https://www.amazon.it/Nooelec-RTL-SDR-Bundle-100kHz-1-75GHz-Alluminio/dp/B01GDN1T4S/ref=sr_1_1?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-1
- questo dispositivo è un **ricevitore radio** che permette l'analisi via software della ricezione dei segnali 
	- il segnale ricevuto è stato adeguatamente elaborato mediante *MATLAB/Simulink*
	- e visualizzato tramite uno *spectrum Analyzer* che permette di vedere il segnale come funzione di potenza del segnale e della frequenza
 ![[Pasted image 20260516084424.png|209]]

##### Configurazione Iniziale
- La configurazione è avvenuta mediante un dispositivo WINDOWS
- per poter comunicare con il nostro(in realtà è della professoressa) **RTL-SDR**
	- sono stati installati dei driver mediante *Zadig*
- successivamente abbiamo tramite **simulink** e **MATLAB**, che ora possono comunicare correttamente con il ricevitore, aperto un modello **simulink**
	- `spectrumAnalyzer_RTLSDR.slx`
- sotto è possibile vedere una foto di come si presenta **MATLAB**, da qui è possibile importare dei progetti su 
	- Open -> e si seleziona il nome del file
![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 1/capture 3.PNG]]
#### Il modello Simulink
- il modello Simulink si presenta così
![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 1/capture 2.PNG|526]]
- è composto da 3 blocchi principali
	- un *blocco costante* che serve per impostare la frequenza centrale
	- un *blocco RTL-SDR* Receiver che serve proprio per ricevere il segnale radio
		- l'input viene inviato in fc e l'output è Data
	- lo *Spectrum Analyzer* per visualizzare l'effettivo spettro del segnale ricevuto
		- il nostro Spectrum Analyzer mostra le frequenze relative infatti 91MHz lo avremo con le x a 0 
>[!attention] la frequenza centrale è in Hz ma dobbiamo convertirla in MHz quindi dobbiamo moltiplicare per $10^6$ aggiungendo $e6$

>[!attention] fc sta per frequenza centrale, la frequenza attorno alla quale il nostro ricevitore si sintonizza per acquisire una determinata porzione di spettro(una certa banda di frequenza)

>[!attention] La banda rappresenta l’intervallo di frequenze osservato o occupato da un segnale

##### Come appare lo spettro analizzato

![[capture 1.PNG|440]]

- *L'asse X* rappresenta la frequenza in MHz
- *l'asse Y* la potenza del segnale espressa in dBm
	- poteva anche essere espressa in Watt o milliWatt ma abbiamo già il logaritmo applicato
- dove c'è un picco c'è maggiore potenza energetica
- invece i punti più bassi sono zone rumorose o segnali deboli
Inizialmente il segnale(come da foto) risulta estremamente rumoroso con variazioni continue
###### Applicazione di algoritmi di averaging
Per permettere una *migliore leggibilità* dello spettro è stato modificato il metodo di stima 
- è stato impostato un metodo esponenziale con *forgetting factor* a 1
	- riduce le fluttuazioni casuali mostrando le cose in modo **più definito e chiaro**
![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 1/capture 6.PNG]]

###### Considerazioni sulla frequenza centrale
Durante il laboratorio abbiamo provato diverse frequenze centrali
- nella foto mostrata in precedenza era stata provata una fc a `102.5e6 Hz`
	- ma si può notare come quest'ultima al centro dello spettro mostrava un **segnale debole** o comunque non centrato perfettamente
- quindi è stato scelto di impostare una frequenza centrale pari a 
	- `106.6e6 Hz`
###### Lo strumento di misurazione di Spectrum Analyzer
Spectrum Analyzer ci offre diversi strumenti per poter fare varie misurazioni, in questo primo laboratorio abbiamo *sfruttato i cursori*
- i cursori ci consentono di selezionare due punti dello spettro e *misurare* *2 differenze* in particolare
	- la differenza tra i due punti in termini di MHz o kHz(a seconda di quanto abbiamo ingrandito la visualizzazione dello spettro)
	- la differenza di potenza tra i due punti espressa in dBm
![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 1/capture 8.PNG]]
- qui è possibile vedere come si sono registrate all'incirca le seguenti misure
```scss
ΔMHz = 0.2108 MHz
ΔdBm = 0.5221 dBm
```
##### Conclusione del laboratorio
in questo laboratorio iniziale abbiamo configurato adeguatamente MATLAB e i vari driver e abbiamo applicato e visto metodologie per apprendere le nozioni base su come funziona la ricezione di un segnale radio e come viene letto uno spettro di segnali
l'obiettivo di questa prima sessione di laboratorio è stata familiarizzare con gli strumenti che sfrutteremo nelle successive sessioni e preparare i software da adoperare

#### Giornata 2
##### Ricezione FM analisi del rumore e del canale
In questa seconda giornata di laboratorio la professoressa ha introdotto un nuovo dispositivo **SDR** chiamato **USRP B210**, che oltre ad avere la possibilità di ricevere il segnale radio ha anche la possibilità di trasmetterlo
>[!info] noi abbiamo comunque usato il ricevitore RTL-SDR 
###### introdurre il concetto di rumore più nel dettaglio
- questa lezione ha come obiettivo quella di farci comprendere i *concetti base relativi al rumore*
in un sistema di comunicazione reale il segnale ricevuto non coincide mai perfettamente con quello trasmesso, durante la **propagazione** di quest'ultimo è possibile che ci siano **disturbi** del segnale di varie tipologie
Un modello molto usato per rappresentare questo fenomeno di rumore è il *AWGN(Additive White Gaussian Noise)*
- che fondamentalmente descrive il segnale ricevuto con la seguente formula:
$$r(t) = s(t) + n(t)$$
- $s(t)$ è il segnale trasmesso
- $n(t)$ è il rumore aggiunto dal canale, segue una ampiezza con distribuzione gaussiana
- $r(t)$ è il segnale ricevuto
>[!info] piccola parentesi sulle distribuzioni gaussiane
>aggiungi dopo

>[!attention] all'aumentare della potenza del rumore aumenta anche il livello medio dello spettro ovvero il cosiddetto noise floor

- oggi possiamo vedere un esempio tangibile di **noise** floor e di misurazione di quest'ultimo

##### Modello Simulink più avanzato
A lezione è stato introdotto un modello *Simulink* più complesso in grado di ricevere il vero e proprio segnale FM sempre sfruttando la RTL-SDR
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
	- **un filtro**
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
- lo spectrum Analyzer ha uno *strumento* che ci permette di calcolare automaticamente alcune misure utili di un certo canale, questo strumento si chiama **Channel Measurements**
![[2026-05-1410-13-46-ezgif.com-crop.gif|657]]
- possiamo vedere che ci da informazioni sul Channel power la banda occupata in kHz e la frequency Error
- il canale viene specificato da un range in MHz ad esempio questo è
	- `-100000`di start Frequency e `100000` di stop Frequency
##### Misurazioni del segnale trasmesso dall'insegnante
- abbiamo ricevuto del segnale trasmesso dal dispositivo *USRP B210*
- il segnale inizialmente si presentava in questo modo e vedeva dei picchi misurati adeguatamente sempre grazie agli strumenti forniti da spectrum analyzer
![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 2/capture 8.PNG|498]]
le misure effettuate sono state le seguenti:
- *misurare le distanze* dello spettro del primo e secondo picco e anche *l'altezza massima* dei due
- il *noise floor*
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
- ovviamente è stato escluso il picco quello a 0 che è dovuto a **limitazioni hardware**
- qua sotto le rispettive foto delle misurazioni
![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 2/capture 7.PNG|517]]
![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 2/capture 6.PNG|517]]
![[capture14.png|355]]

###### Stima dell'SNR
- da queste misurazioni fatte possiamo stimare l'**SNR** ovvero **il rapporto segnale rumore**
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
in laboratorio abbiamo successivamente *simulato* del *rumore* in aggiunta nella stessa zona di interesse 
- simulando una sorta di **attacco jamming** che disturbava la comunicazione
nel seguente video si può vedere l'esatto momento in cui arrivava il rumore
>[!attention] il video è stato velocizzato in 3x e ho ritoccato un po i metodi di averaging

![[il segnale cambia.gif]]

- il *noise floor* è aumentato nella zona di interesse in modo decisamente esagerato
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
- ora è possibile calcolare *l'SNR*, considerando il picco che risulta ancora confrontabile con quello osservato prima del jamming, ovvero l'attuale P3 si ottiene:
```scss
SNR3 = 30.4302 - 30.0  
SNR3 ≈ 0.4 dB
```
- possiamo notare un forte peggioramento del rapporto segnale-rumore.
- è pressoché inutilizzabile
###### Selective Jamming
- questo rumore ricevuto **si nota davvero molto**, spesso i veri attacchi di Jamming sono di tipo selettivo(più intelligenti)
- Un **attacco** più mirato può concentrarsi solo su una componente importante del segnale, ad esempio il *tono pilota* usato per la sincronizzazione
- Nel caso del segnale FM stereo, disturbare il tono pilota può compromettere la sincronizzazione e quindi peggiorare la ricostruzione del segnale stereo, anche senza alzare enormemente il rumore su tutta la banda
##### Conclusione del laboratorio
abbiamo calcolato l'SNR prima e dopo il disturbo di un segnale trasmesso dalla docente
notando un deterioramento significativo
l'obiettivo della seguente sessione in laboratorio è stata quella di analizzare e misurare il noise floor e i vari picchi e sfruttare realmente la formula dell'SNR


