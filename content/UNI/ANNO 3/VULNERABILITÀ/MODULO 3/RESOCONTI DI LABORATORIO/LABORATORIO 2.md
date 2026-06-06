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
- sulle x ho la In-phase amplitude
- sulle y ho la Quadrature Amplitude
- nel caso della BPSK avrò due punti della costellazione che si trovano una a sinistra e una a destra
	- poi avrò i punti ricevuti che rappresentano il segnale e possono essere interpretati come bit
	- se si trovano a sx posso vederli come 0 se si trovano a dx come 1
###### Eye Diagram
Vedendo più intervalli di tempo ci permette di capire la qualità della comunicazione
se l'occhio figurativo che si forma è chiuso allora la qualità è pessima se l'occhio è aperto allora la qualità è buona
##### Misurazioni fatte e considerazioni
ho provato due $Eb/N0$ diverse e sfruttando gli strumenti di analisi mi sono fatto delle considerazioni interessanti sul variare del rumore e su quanto effettivamente il segnale può disperdersi fino al raggiungimento di una situazione dove effettivamente non si può distinguere quale dei due simboli si sta ricevendo
ciò che non è per niente cambiato sicuramente è il segnale del primo spectrum analyzer prima che passi per il AWGN channel
![[Eb10 spectrum analyzer prima rumore.png|478]]
##### Con $Eb/N0=10$
con $Eb/N0=10$ abbiamo un rumore davvero basso quindi dovremmo vedere una qualità del segnale davvero buona, andiamo a vedere i nostri strumenti di analisi come hanno reagito

###### Spectrum analyzer del segnale dopo AWGN
![[Eb10 spectrum analyzer dopo il rumore.png|537]]
- possiamo vedere sicuramente più rumore confrontando lo spettro prima che passasse per l'AWGN(vedi foto sopra)
###### Constellation diagram
![[Eb10 constellation.png|537]]
- possiamo vedere che in questo caso i due simboli sono abbastanza riconoscibili e non si incrociano a vicenda

###### Eye Diagram prima del modulo che fa il calcolo integrale
![[Eye diagram prima dell'integrale.png|537]]
- notiamo qui estrema instabilità del segnale
	- fa riflettere molto su quanto sia utile integrare per avere decisioni sui simboli più equilibrate
###### Eye Diagram dopo calcolo integrale
![[Eb10 eye diagram.png|537]]
- l'occhio non è perfettamente aperto ma comunque non è chiuso(dopo vedremo con Eb3 la differenza), di conseguenza possiamo dire che la qualità del segnale è più che accettabile
###### Time scope
![[Eb10 Time Scope.png|537]]
- **primo grafico** prima del canale AWGN abbiamo un segnale pulito che assume valori precisi `-1` e `1`
- **secondo grafico** qui vediamo del segnale distorto dopo essere passato per il canale AWGN ma è comunque riconoscibile e si comprende l'intenzione iniziale che voleva avere
- **terzo grafico** qui abbiamo più decisione del valore dei segnali dopo aver sfruttato l'integrale che per l'appunto somma e da un valore più deciso


###### Modulo di calcolo dell'errore
![[Eb10 error rate calculation.png|537]]
- qui abbiamo praticamente 0 errori, fa capire come il rumore aggiunto è stato processato con successo senza perdere informazioni particolari
##### Con $Eb/N0=3$
- ora procediamo con un'aggiunta dell'errore particolarmente decisa, qui ho deciso di mettere a sinistra le foto precedenti con valore a 10 e a destra quelle con valore a 3
###### Spectrum analyzer del segnale dopo AWGN
![[collage_04.png]]
###### Costellazione
![[collage_01.png]]

###### Eye diagram prima dell'integrale
![[collage_03.png]]

###### Eye Diagram dopo calcolo integrale
![[collage_05.png]]
###### Time scope
![[collage_06.png]]
###### Error rate calculation
![[collage_02.png]]

###### Domande di laboratorio
>[!Question] domanda 1
> 
> Add a Time Scope block and display the output of the Ideal Rectangular Pulse Filter block. What is its average signal power?

>[!success] risposta
> una volta aggiunto il time scope 
> per misurare la average signal power ci sono 2 metodi
> - metodo 1
> 	- se il segnale è bipolare e assume dei valori $+A$ e $-A$ si può calcolare l'average signal power facendo $A^2$ 
> 		- nel nostro caso è 1
> 		- $s(t)^2=1$
> 		- dove $s(t)$ rappresenta il segnale nel tempo
> - metodo 2
> 	- uso uno strumento presente nei tools di misurazione del Time Scope
> 	- prendo RMS(Root Mean Square) con strumento di misurazione del time scope tools > measurements
> 	- appare il valore del RMS 
> 		- $P=RMS^2$ che è uguale proprio a 1
> ![[Pasted image 20260520102209.png|280]]


>[!question] domanda 2
> Add a Time Scope block and display the input to the AWGN Channel block, the output of the AWGN Channel block, and the output of the Gain block. In the AWGN Channel block, set the Input signal power to the value you calculated in the previous problem and set $Eb/N0$ to $12dB$. Set the remaining parameters based on your understanding of the simulation. Run the simulation, and take a screen capture of the Time Scope block. Explain and interpret the plots

>[!success] risposta
> ![[Pasted image 20260520102842.png|482]]
> - posso notare come il tutto sia ancora perfettamente riconoscibile e che si possono definire perfettamente i simboli che si vogliono rappresentare
> 	- il calcolo integrale è davvero utile

>[!question] domanda 3
> 
> Add Eye Diagram and Constellation Diagram blocks to the signal at the input of the BPSK Demodulator Baseband block. Set the AWGN Channel block for $Eb/N0$ of $12dB$. Run the simulation, and take screen captures of the eye diagram and signal constellation. Repeat for $Eb/N0$ of $6dB$. Explain and interpret the plots. Comment on how the plots change as a function of $Eb/N0$

>[!success] risposta
> - a sinistra abbiamo $Eb/N0$ a $12$ invece a destra con valore a $6dB$
> ![[collage_02.png]]
> - **12 dB**: l'occhio risulta abbastanza aperto indica probabilità di errore bassa e buon margine decisionale dei simboli
> - **6dB**: l'occhio inizia a chiudersi mostrando una possibile indecisione nell'interpretare i simboli
> ![[collage_01.png]]
> - **12 dB**: le costellazioni sono perfettamente circoscritte al loro dominio di appartenenza, mi chiedo cosa possa accadere se aumentassimo l'interpretazione simbolica con ad esempio una estensione come la QPSK a un certo valore
> - **6dB**: alcuni bit che dovrebbero stare in una delle due fasi inizia quasi a toccarsi mostrano una possibile incertezza del segnale


>[!question] domanda 4
> 
> You will now use the model to simulate the system performance over a range of Eb/N0 values. Run the simulation for Eb/N0 values of 0dB to 12dB in 1dB steps. Set the simulation time to ensure the results are meaningful. This is especially important when very few bit errors are expected. Observe and record the error rate for each run. Plot bit error rate vs Eb/N0 and compare to the theoretical prediction. Comment on the results

>[!success] risposta
> per svolgere prima questa simulazione ho scoperto che esiste un blocco che mi salva in un array i risultati chiamato`To Workspace` che ho collegato al blocco di calcolo degli errori
> 
> ![[Pasted image 20260520105335.png|336]]
> 
> ![[Pasted image 20260520105259.png|336]]
> poi mi è sufficiente ad ogni simulazione chiamare la variabile in formato long e ottenere solo la riga finale(quella utile davvero)
> ```scss
> format long g
> errStats(end,:)
> ```
> 
> La simulazione è stata eseguita su `101000` simboli per ogni valore di `Eb/N0`.
> **BER** = numero di bit errati / numero totale di bit trasmessi
> 
>
> |Eb/N0 [dB]|Error Rate / BER|Number of Errors|Total Number of Symbols|
> |---|---|---|---|
> |0|0.0796732673|8047|101000|
> |1|0.0578712871|5845|101000|
> |2|0.0383267327|3871|101000|
> |3|0.0233762376|2361|101000|
> |4|0.0130099010|1314|101000|
> |5|0.0058514851|591|101000|
> |6|0.0023366337|236|101000|
> |7|0.0007722772|78|101000|
> |8|0.0001683168|17|101000|
> |9|0.0000198020|2|101000|
> |10|0|0|101000|
> |11|0|0|101000|
> |12|0|0|101000|
> 
> - Dai risultati si nota che la percentuale di BER diminuisce progressivamente all’aumentare di `Eb/N0`.
> - Da 10 dB in poi si nota come l'error rate è a 0
> ![[Pasted image 20260520111028.png]]
> - grafico che fa vedere al variare dei dB quanto cambia il BER
> per ottimizzare i tempi ho fatto creare da `chat GPT` questo script molto simpatico che aumenta automaticamente il dB e salva l'array `errStats`
> ```scss
> clear errStats
> 
> EbN0_values = 0:12;
> results = zeros(length(EbN0_values), 4);
> 
> modelName = "simulateBPSK_pulseShapingRectangular_VDSI2026";
> 
> for i = 1:length(EbN0_values)
>     EbN0 = EbN0_values(i);
> 
>     sim(modelName);
> 
>     last = errStats(end,:);
> 
>     results(i,:) = [EbN0, last(1), last(2), last(3)];
> end
> 
> T = array2table(results, ...
>     "VariableNames", ["EbN0_dB", "ErrorRate", "NumberOfErrors", "TotalNumberOfSymbols"]);
> 
> disp(T)
> 
> writetable(T, "risultati_BER.txt");
> ```

#### Giorno 2
questa seconda giornata di laboratorio volge a voler definire con mezzi pratici l'accesso simultaneo di mezzi di trasferimento Wireless o via cavo
È quindi bene definire delle *regole* per decidere quando e come ogni dispositivo può trasmettere
##### Protocollo ideale di multiple access protocol
Il protocollo ideale ad accesso multiplo funziona così:
Quando il dispositivo è *unico trasmette* a massima potenza sfruttando tutta la capacità del canale $R$ 
quando invece *ci sono più dispositivi* trasmette a R/M
inoltre deve essere decentralizzato e semplice
##### protocolli famosi utilizzati si dividono principalmente in
- channel partitioning
- random access
- taking turns
###### TDMA
Time Division Multiple Access, il *canale* viene *diviso* in *slot temporali* e ogni utente trasmette solo nel suo intervallo di tempo
- spreca tantissime risorse con slot inutilizzati se l'utente non invia nulla
###### FDMA
Frequency Division Multiple Access, lo spettro radio viene *diviso* in *bande di frequenza* prefissate e ogni stazione riceve una propria banda di invio
- se alcune bande non vengono usate comporta degli sprechi
###### OFDM
Orthogonal Frequency Division Multiplexing, *divide* la *banda* in tante *sotto-portanti* che vengono dette subcarriers
usato tutt'oggi 
![[Pasted image 20260604151004.png|459]]
###### CDMA
Code Division Multiple Access, gli utenti non vengono *separati* da frequenze o tempi diversi ma *attraverso codici*
- ogni *utente* ha una *sequenza* di codice chiamata **chipping sequence**
	- questo codice viene moltiplicato con il messaggio che si vuole inviare per l'invio
	- il ricevitore conoscendo lo stesso codice lo usa per la decodifica
- se i codici sono trasmessi bene più utenti possono trasmettere sulla stessa banda con una interferenza limitata
*CODIFICA*
$$Z_{i,m}=d_i \cdot c_m$$
*DECODIFICA*
$$D_i=\sum_{m=1}^{M} Z_{i,m} \cdot c_m$$
##### DSSS Simulation Simulink
In questo laboratorio usiamo il progetto `simulateDSSS_binaryMessage_VDSI2026.slx`
che simula un *DSSS* che sta per **Direct Sequence Spread Spectrum**, una vera realizzazione del modello CDMA visto in precedenza dove ogni bit viene moltiplicato per una sequenza di chip più veloce così che il segnale venga distribuito su una banda più ampia creando un fenomeno detto spreading
- questo spreading accade poiché il chip rate è maggiore del bit rate quindi questo aumenta la banda
	- ricordiamo che la banda dipende da quante volte il segnale cambia nel tempo, più cambiamenti equivalgono a una banda più larga, e viceversa
###### FOTO E DESCRIZIONE DEL PROGETTO
![[foto progetto.png]]
Il seguente progetto si divide in due parti principali
- **trasmettitore DSSS**
- **ricevitore DSSS**
**parte del trasmettitore**
Abbiamo un modulo che genera un messaggio binario che poi passa per un modulo *BPSK(Binary Phase Shift Keying)* che li trasforma in simboli BPSK e poi passa per il
*rectangular pulse filter*, che rende il segnale più adatto alla trasmissione
sotto poi abbiamo la *sequenza di valori* che dopo essere passata per un rectangular pulse filter
viene moltiplicato insieme al *BPSK* con il modulo di moltiplicazione
- qui avviene il vero e proprio **spreading**
il tutto passa per un *AWGN channel* che aggiunge del rumore prima di passare per i blocchi del ricevitore
**parte del ricevitore**
abbiamo i moduli che fanno l'operazione inversa **(De-spreading)**
- il tutto poi viene passato al modulo di *Integrate and Dump*
	- utile per capire meglio quale simbolo è stato trasmesso in un certo range di tempo simbolico
- il *blocco di gain* poi serve per riportare i valori in un intervallo corretto dopo l'integrate and dump infatti viene fatto il rapporto tra `tempo di campionamento/ simbolo e tempo di bit`
##### Strumenti di analisi utilizzati nel modello
Abbiamo aggiunto 4 *Spectrum Analyzer* per misurare(nel dominio della frequenza) rispettivamente
- il segnale prima del prodotto lato mittente
- il segnale dopo il prodotto lato mittente
- il segnale prima del prodotto lato ricevente
- il segnale dopo il prodotto lato ricevente
e 2 *time scope* per confrontare il segnale nel tempo prima e dopo lo spreading
###### Gli spectrum Analyzer
![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 4/collage_01.png]]
- in questa foto vediamo il segnale prima e dopo il prodotto lato trasmettitore
	- possiamo vedere come il segnale dopo il prodotto risulti più distribuito nello spettro 
	- mentre prima era più concentrato vicino a 0 Hz
![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 4/collage_02.png]]
- qui il segnale prima e dopo il prodotto lato ricevente
	- il segnale risulta come prima ma invertito proprio dovuto al prodotto effettuato che riporta il segnale originale
###### i time scope
![[Time scope 1(prima del prodotto,bit codice,dopo il prodotto).PNG]]
- il time scope analizza i seguenti input:
	- segnale prima del prodotto
	- segnale del codice di spreading
	- segnale dopo il prodotto 
		- possiamo notare grazie al time scope un aumento delle variazioni dovuto proprio allo spreading
abbiamo la stessa informazione ma più "spalmata"

![[Time scope 2(output finale,prima del prodotto,bit codice).PNG]]
- il time scope analizza i seguenti input:
	- segnale dell'output finale
		- possiamo vedere un segnale estremamente leggibile
	- segnale prima del prodotto
		- molto indeciso e poco leggibile
		- integrate and dump risolve molto la cosa
	- segnale del codice
		- fa vedere una chip rate molto alta
##### Domande guidate di laboratorio
>[!Question] domanda 1
>Open the spectrum analyzer after the BPSK modulator, then open the one after the DSSS Spreader. How much wider did the signal get?

>[!success] risposta
> per rispondere alla domanda ho usato Channel Measurements dello spectrum analyzer
> per capire la banda occupata
> 
> ![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 4/collage_03.png]]
> - Prima del prodotto lato trasmettitore, quindi prima dello spreading, la banda occupata misurata è circa 101.59 Hz
> - Dopo il prodotto lato trasmettitore, quindi dopo la moltiplicazione con la chipping sequence, la banda occupata è circa 146.76 Hz
> quindi facendo il rapporto avremmo
> $146.76 / 101.59 ≈ 1.44$
> che rappresenta circa il 44% quindi avviene effettivamente lo spreading
> - non è un valore assoluto perchè dipende dal sistema di misurazione usato, ma ci da una idea molto forte sul concetto


>[!Question] domanda 2
> Check the Noise Floor Measurement: Look at the peak power of the signal. Did spreading the signal make its peak sink down closer to the noise floor?

>[!success] risposta
> il channel power(preso dal channel measurements della domanda precedente) non cambia particolarmente
> il Channel Power prima del prodotto è circa `29.9490 dBm`, mentre dopo il prodotto è circa `29.5021 dBm`. 
> Quindi la potenza complessiva del segnale non cambia in modo significativo ma quest'ultima viene spalmata sulla frequenza, questo fenomeno causa un avvicinamento al noise floor che possiamo vedere visibilmente nella seconda foto del collage riportata alla domanda 1

>[!Question] domanda 3
> Check the De-Spreading Effect: Look at the spectrum right before the receiver’s DSSS multiplier, and then right after it. What happened to the wide signal? Did it shrink back down to its original narrow shape?

>[!success] risposta
> 
> prima del prodotto lato ricevitore:  
> - Occupied Bandwidth ≈ 163.2966 Hz
> dopo il prodotto lato ricevitore:  
> - Occupied Bandwidth ≈ 129.3670 Hz
> facendo il rapporto quindi abbiamo
> $129.3670 / 163.2966 ≈ 0.79$
> - e quindi abbiamo una riduzione del 21%
>![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 4/collage_04.png]]

>[!Question] domanda 4
> If a jammer is turned on, look at its sharp spike before the multiplier. What happens to that sharp spike after the multiplier?

>[!success] risposta
> Qui non abbiamo usato un vero e proprio jammer selettivo, ma un canale AWGN, che aggiunge rumore al segnale in modo più generale
> ipoteticamente, se fosse stato presente un jammer narrowband, nello Spectrum Analyzer lo avremmo visto come uno spike di potenza concentrato in un punto specifico della banda
> dopo la moltiplicazione lato ricevitore con il codice DSSS, però, questo disturbo non verrebbe ricompattato come il segnale utile, perché il jammer non usa lo stesso codice di spreading. Di conseguenza, il suo picco verrebbe distribuito su una banda più ampia e avrebbe meno rilevanza sul segnale recuperato

>[!Question] domanda 5
> If DSSS is so amazing at stopping interference and noise, why don't we use it to stream 4K video on modern 5G or Wi-Fi networks? What do we sacrifice when we spread a signal?

>[!success] risposta
> - il DSSS migliora la robustezza del segnale ma sacrifichiamo troppa banda a causa dello spreading
> - quindi vengono usate cose come OFDM viste in precedenza


>[!Question] domanda 6
>Check the Bit Rate vs. Chip Rate: Look at the time scope of the original BPSK data bits, then look at the DSSS spread signal. How many tiny chips fit inside just one single data bit?

>[!success] risposta
> Prendendo la foto del Time scope presa in precedenza possiamo dire con certezza che la chip rate è maggiore della bit rate ma non riesco a definire un numero preciso
> posso però dire che il numero di chip per bit corrisponde alla lunghezza della chipping sequence ovvero 16 bit
> ![[Time scope 1(prima del prodotto,bit codice,dopo il prodotto).PNG]]


>[!question] domanda 7
>Check the Phase Changes: Zoom in on the DSSS signal. Do you see the sharp phase flips happening much faster than the original BPSK signal?

>[!success] risposta
Sì, nel segnale DSSS si osservano cambi di fase più rapidi rispetto al BPSK originale. Questo accade perché il segnale viene moltiplicato per il codice di spreading, che varia alla chip rate. Di conseguenza il segnale dopo il prodotto segue anche le variazioni veloci dei chip, non solo quelle dei bit informativi.
> - Nel primo segnale, cioè il BPSK originale, le variazioni sono più lente perché dipendono dai bit informativi
> - Nel terzo segnale, cioè dopo il prodotto, vedo più cambi di segno/fase perché il BPSK è stato moltiplicato per il codice di spreading
> 	- quindi il segnale segue anche le variazioni veloci del codice

>[!question] domanda 8
>Check the Corrupted Signal: Look at the time scope of the incoming signal from the channel with noise/jamming. Can you visually see any square digital pulses at all?

>[!success] risposta
> per rispondere alla seguente domanda aggiungo un time scope all'uscita della AWGN
> ![[Pasted image 20260604181154.png]]
> - si possono intuire le zone positive e negative ma sicuramente il segnale non risulta pulito e immediatamente leggibile

>[!question] domanda 9
>Check the Recovered Signal: Now look at the time scope right after the de-spreader multiplier. Did the clean, slow-moving data pulses magically reappear?

>[!success] risposta
> 
> ![[time scope dopo de spreading con e senza integrate and dump.PNG]]
> ho aggiunto un time scope dopo il de spreading prima e dopo integrate and dump
> possiamo vedere che il segnale dopo il de spreading contiene molti campioni e risulta irregolare ma è comunque tornato e visibile
> con integrate and dump cambia tutto e vediamo molta decisione nell'interpretazione dei bit

>[!question] domanda 10
> Check the Standard BPSK Dots: Open the BPSK constellation. Turn up the noise. How far apart do the two dots scatter before they start crossing the center line?

>[!success] risposta
> 
> 
> ![[constellation diagram dopo AWGN.PNG|456]]
> ho aggiunto un constellation diagram di tipo BPSK e posso dire che abbiamo 2 nuvolette ma non abbastanza grandi da non far capire il simbolo
> 
> aumentando il noise togliendo il seed 67 e mettendo $E_b/N_0$ a 2 vediamo come il tutto sia estremamente incomprensibile
> ![[Pasted image 20260604182734.png|425]]

>[!question] domanda 11
>Check the DSSS Dots Before and After: Look at the DSSS constellation before the de-spreader. Now look after the de-spreader. Did it snap back into two clean BPSK dots?

>[!success] risposta
> 
> 
> ![[content/UNI/ANNO 3/VULNERABILITÀ/MODULO 3/RESOCONTI DI LABORATORIO/FOTOLAB/LAB 4/collage_06.png]]
> mettendo un constellation diagram prima e dopo lo spreading notiamo una buona sincronizzazione dei due, il secondo constellation diagram mostrava quelli in un certo istante di tempo quindi prima andava nella fase a -1 poi nella fase a 1

##### Conclusione del laboratorio
In questo laboratorio abbiamo analizzato il funzionamento di un sistema di comunicazione digitale tramite Simulink, concentrandoci sulla modulazione BPSK, sull'effetto del rumore AWGN e sul comportamento del BER al variare di ($E_b/N_0$)
Dalle simulazioni è emerso che, aumentando il rumore, il segnale diventa più difficile da interpretare: la costellazione si disperde, l'eye diagram tende a chiudersi e il numero di errori aumenta. Al contrario, con valori più alti di ($E_b/N_0$), la comunicazione risulta più stabile e il BER diminuisce fino ad annullarsi
Nella seconda parte del laboratorio abbiamo osservato il funzionamento del DSSS, che permette di rendere il segnale più robusto distribuendolo su una banda più ampia. Questo però comporta un maggiore utilizzo di banda
In conclusione, il laboratorio ha permesso di comprendere meglio il rapporto tra rumore, qualità del segnale, probabilità di errore e tecniche di trasmissione digitale