In questo laboratorio abbiamo utilizzato MATLAB per analizzare lo spettro radio ricevuto tramite un dispositivo RTL-SDR
- acquistabile su  qui https://www.amazon.it/Nooelec-RTL-SDR-Bundle-100kHz-1-75GHz-Alluminio/dp/B01GDN1T4S/ref=sr_1_1?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-1
- questo dispositivo è un ricevitore radio che permette l'analisi via software della ricezione dei segnali 
	- il segnale ricevuto è stato adeguatamente elaborato mediante MATLAB/Simulink 
	- e visualizzato tramite uno spectrum Analyzer che permette di vedere il segnale come funzione di potenza del segnale e della frequenza
 ![[Pasted image 20260516084424.png|209]]

##### Configurazione Iniziale
- La configurazione è avvenuta mediante un dispositivo WINDOWS
- per poter comunicare con il nostro(in realtà è della professoressa) RTL-SDR
	- sono stati installati dei driver mediante Zadig
- successivamente abbiamo tramite simulink e MATLAB, che ora possono comunicare correttamente con il ricevitore, aperto un modello simulink
	- `spectrumAnalyzer_RTLSDR.slx`
- sotto è possibile vedere una foto di come si presenta MATLAB, da qui è possibile importare dei progetti su 
	- Open -> e si seleziona il nome del file
![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 1/capture 3.PNG]]
#### Il modello Simulink
- il modello Simulink si presenta così
![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 1/capture 2.PNG|526]]
- è composto da 3 blocchi principali
	- un blocco costante che serve per impostare la frequenza centrale
	- un blocco RTL-SDR Receiver che serve proprio per ricevere il segnale radio
		- l'input viene inviato in fc e l'output è Data
	- lo Spectrum Analyzer per visualizzare l'effettivo spettro del segnale ricevuto
		- il nostro Spectrum Analyzer mostra le frequenze relative infatti 91MHz lo avremo con le x a 0 
>[!attention] la frequenza centrale è in Hz ma dobbiamo convertirla in MHz quindi dobbiamo moltiplicare per $10^6$ aggiungendo $e6$

>[!attention] fc sta per frequenza centrale, la frequenza attorno alla quale il nostro ricevitore si sintonizza per acquisire una determinata porzione di spettro(una certa banda di frequenza)

>[!attention] La banda rappresenta l’intervallo di frequenze osservato o occupato da un segnale

##### Come appare lo spettro analizzato

![[capture 1.PNG|440]]

- L'asse X rappresenta la frequenza in MHz
- l'asse Y la potenza del segnale espressa in dBm
	- poteva anche essere espressa in Watt o milliWatt ma abbiamo già il logaritmo applicato
- dove c'è un picco c'è maggiore potenza energetica
- invece i punti più bassi sono zone rumorose o segnali deboli
Inizialmente il segnale(come da foto) risulta estremamente rumoroso con variazioni continue
###### Applicazione di algoritmi di averaging
Per permettere una migliore leggibilità dello spettro è stato modificato il metodo di stima 
- è stato impostato un metodo esponenziale con forgetting factor a 1
	- riduce le fluttuazioni casuali mostrando le cose in modo più definito e chiaro
![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 1/capture 6.PNG]]

###### Considerazioni sulla frequenza centrale
Durante il laboratorio abbiamo provato diverse frequenze centrali
- nella foto mostrata in precedenza era stata provata una fc a `102.5e6 Hz`
	- ma si può notare come quest'ultima al centro dello spettro mostrava un segnale debole o comunque non centrato perfettamente
- quindi è stato scelto di impostare una frequenza centrale pari a 
	- `106.6e6 Hz`
###### Lo strumento di misurazione di Spectrum Analyzer
Spectrum Analyzer ci offre diversi strumenti per poter fare varie misurazioni, in questo primo laboratorio abbiamo sfruttato i cursori
- i cursori ci consentono di selezionare due punti dello spettro e misurare 2 differenze in particolare
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


