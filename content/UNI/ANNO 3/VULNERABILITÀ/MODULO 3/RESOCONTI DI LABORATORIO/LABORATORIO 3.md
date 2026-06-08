Nel seguente laboratorio abbiamo analizzato un sistema di comunicazione basato su modulazione DBPSK(Differential Binary Phase Shift Keying)
l'obiettivo di questo laboratorio è quello di ricevere un vero e proprio segnale tramite RTL-SDR e osservarne il suo comportamento mediante anche una decodifica per recuperare un messaggio ASCII
##### Spiegazione teorica prima di vedere il progetto effettivo
In un sistema di comunicazione wireless reale, il segnale informativo non viene trasmesso direttamente in banda base, ma viene portato attorno a una frequenza portante
questo processo prende il nome di frequency upconversion
lato ricevitore poi avviene l'inverso ovvero la frequency downconversion
che riporta il segnale da banda passante a banda base
Quindi il segnale, che prima era centrato intorno a 0, viene traslato su una frequenza radio
![[Pasted image 20260514174431.png]]
in un sistema reale questi due processi non riescono ad essere perfettamente allineati e quindi possiamo avere errori di fase e di frequenza che potrebbero consentire una scorretta demodulazione
per questo è importante differenziare sistemi di comunicazione
- coerenti
	- il ricevitore deve sincronizzarsi con il trasmettitore sia per frequenza che per fase, basta che una delle due siano diverse per non riuscire a ricostruire il segnale
- non coerenti
	- non è necessario conoscere perfettamente la fase assoluta della portante
	- l'informazione viene recuperata tramite determinate relazioni varie un esempio è con DBPSK
##### DBPSK(Differential Binary Phase Shift Keying)
È una variante della BPSK dove l'informazione è codificata nella differenza tra la fase del simbolo precedente e il successivo
- se il bit da trasmettere è 0, il simbolo mantiene la stessa fase del simbolo precedente
- se il bit da trasmettere è 1, il simbolo cambia fase rispetto al simbolo precedente
In questo modo il ricevitore non deve necessariamente conoscere la fase assoluta del segnale, ma può confrontare ogni simbolo ricevuto con quello precedente
##### MODELLO SIMULINK
abbiamo in questo laboratorio usato il seguente modello Simulink
`receiveDBPSK_RTLSDR_030626.slx`
![[progetto simulink.PNG]]
- il segnale è ricevuto dal nostro blocco *RTL-SDR* Receiver e poi viene elaborato da un decimatore
- il blocco *x[3n]* riduce il numero di campioni per una elaborazione più semplice dei dati
- applichiamo un *filter designer* al segnale per filtrare rumore ecc
- abbiamo un blocco *Symbol Synchronizer* che ci consente il campionamento corretto dei simboli
- infine abbiamo il blocco *yout* che salva i campioni del `Symbol Synchronizer` in una variabile 

##### Foto del segnale ricevuto 
![[offset a 3500.png]]
Durante il laboratorio sono state provate diverse impostazioni di offset
con un offset non corretto il segnale risulta spostato rispetto alla posizione desiderata, mentre regolando il valore dell’offset è possibile portare i picchi dello spettro in una posizione più adatta alla ricezione
###### Usare yout
dopo aver terminato l'esecuzione quindi abbiamo la variabile yout
e la salviamo facendo
`save('esempiosegnalericevuto','yout');`


dopo aver ricevuto il segnale mediante degli script in MATLAB iniziamo a lavorare sui dati ricevuti 
###### FIGURA 1
carichiamo il file con i campioni ricevuti e prendiamo i primi 600 valori del segnale
inoltre poi applichiamo la funzione angle che ci mostra la fase di ciascun campione e poi mostriamo un grafico che ci fa vedere il comportamento del segnale ricevuto
```scss

load("C:\Users\Luca\Documents\MATLAB\esempiosegnalericevuto2.mat");

%% Caricamento dei campioni ricevuti

% Segnale complesso in banda base.

sig = yout.signals.values(1:600,1,20);

phase = angle(sig(1:200));

figure(1);

stem(phase,'filled');

grid on;

title('Fase dei simboli ricevuti');

xlabel('Indice simbolo');

ylabel('Fase [rad]');

```
![[figura1 dopo che mi sono avvicinato alla prof.png]]

###### FIGURA 2
applichiamo la vera e propria demodulazione differenziale del segnale DBPSK
confrontiamo ogni simbolo ricevuto al momento `r(k)`
con il precedente coniugato ovvero `conj(r(k-1))`
se due simboli hanno la stessa fase il risultato di `d(k)` risulta essere positivo altrimenti c'è una inversione di fase di circa $\pi$
- (+1), quando non c’è variazione di fase significativa tra due simboli consecutivi
- (-1), quando tra i due simboli c’è un salto di fase di circa ($\pi$)

AGGIUNTA DA SISTEMARE
`quando ho una fase a +1 sto trasmettendo 0 quando ho una fase -1 sto trasmettendo 0`

```scss
oltretutto aggiungi pure quella roba con s(t) spiegata al fly
dove c'è il coseno e prendiamo la parte reale dell'esponenziale complesso per leggere se il messaggio è 1 o -1
dove il coseno bla bla bla è la portante
quando inviamo il segnale moltiplichiamo per la portante
quando lo riceviamo lo facciamo e elevato a una portante ecc con fc+un lambda f che rappresenta un disturbo

quando prendo un filtro banda base per leggere il segnale ricevuto non mi metto a 0 ma mi sposto di un certo deltaf
oltre a uno sfasamento di frequenza ne ho anche uno di fase 
(vedi formula in foto)

AGGIUNGI FOTO DELLA COSTELLAZIONE CON UN CERCHIO PERCHÈ TUTTI SI SPOSTANO
per colpa del disturbo ci troviamo con deltaf e uno di fase ovvero phi

prendo due campioni del segnale presi a due istanti di tempo vicini
t1 e t2 
prende il coniugato dei due perchè vogliamo approssimarli
tolgo gli sfasamenti e se i due disturbi deltaf sono vicini li tolgo anche e rimane 

di tutta la roba in foto rimane questo 
m(t1)*m(t2) dove se sono uguali allora vale 1 se diversi vale -1

quindi elimino lo sfasamento
```

quindi nel grafico sotto posso vedere il risultato del confronto tra un simbolo con il precedente
abbiamo quasi una forma decodificata del segnale perchè distinguiamo tra regione positiva e negativa
```scss
%% Demodulazione differenziale DBPSK

% Si confronta ogni simbolo con il precedente:

%

% d(k) = r(k) * conj(r(k-1))

%

% In questo modo un offset di fase costante viene eliminato

% automaticamente.

phase_diff = sig(2:end) .* conj(sig(1:end-1));

figure(2);

stem(real(phase_diff),'filled');

grid on;

title('Parte reale dei simboli differenziali');

xlabel('Indice simbolo');

ylabel('Re\{d(k)\}');
```
![[figura2 dopo che mi sono avvicinato alla prof.png]]

###### FIGURA 3
dopo aver ottenuto i simboli differenziali il passo successivo consiste nel trasformarli in una vera e propria sequenza di bit
quindi andiamo a definire una decisione sui bit
- se (Re{d(k)} < 0), il bit ricevuto viene interpretato come **1**;
- se (Re{d(k)} > 0), il bit ricevuto viene interpretato come **0**.
restituendo quindi poi un vettore logico formato dai valori 0 e 1
rappresentiamo poi in figura 3 i primi 100 bit decodificati
```scss
%% Decisione sui bit

% I i simboli DBPSK dovrebbero essere

% concentrati attorno a +1 e -1 sull'asse reale.

%

% Re{d_corr} < 0 -> bit 1

% Re{d_corr} > 0 -> bit 0

questo perché se ho bit uguali allora vale 0 se ho bit diversi allora vale 1

rxBits = real(phase_diff) < 0;

%% Visualizzazione dei primi bit decodificati

figure(3);

stem(rxBits(1:100),'filled');

grid on;

ylim([-0.2 1.2]);

title('Primi 100 bit decodificati');

xlabel('Indice bit');

ylabel('Bit');
```

![[figura3 dopo che mi sono avvicinato alla prof.png]]

###### Come leggo ora questi bit come segnale?
Dopo aver ottenuto la sequenza dei bit ricevuti in un vettore rxBits dobbiamo capire dove inizia e finisce il messaggio utile
andiamo quindi ad utilizzare un preambolo, una sequenza nota di bit che serve a sincronizzarsi con il messaggio
```scss
pre= [0 0 0 0 1 1 1 1 0 0 0 0 1 1 1 1];
```

creiamo un oggetto `comm.PreambleDetector` per cercare la fine di questi preamboli nel segnale, che nel nostro caso sono 2
il messaggio vero e proprio quindi si trova tra i 2 preamboli
- prendiamo i bit subito dopo la fine del primo preambolo e ci fermiamo all'inizio del secondo preambolo
- poi leggiamo dalla fine del secondo preambolo e ci fermiamo alla fine della lunghezza della stringa di bit
poi utilizzo bin2dec per esprimere ogni gruppo di 8 bit in decimale
per poi convertire il tutto in ASCII con char
```scss
%% Preambolo atteso

pre = [0; 0; 0; 0; 1; 1; 1; 1; 0; 0; 0; 0; 1; 1; 1; 1];

%% andiamo a trovare la fine del preambolo

prbdet = comm.PreambleDetector(pre,Input='Bit');

idx = prbdet(rxBits);

display(idx);

lunghezza=length(rxBits);

%% converto il messaggio in ascii

Lpre = length(pre);

indiceuno = idx(1) + 1;

indicedue = idx(2) - Lpre;

bits_msg = rxBits(indiceuno:indicedue);

binstr8 = reshape(bits_msg, 8, []).';

binstr8 = char(binstr8 + '0');

binmtx = bin2dec(binstr8);

chrmtx = char(binmtx).';

disp(chrmtx)
```

l'indice della fine dei due preamboli erano rispettivamente a 
```scss
173  
429
```
###### Messaggio ricevuto
```scss
Grande!!! Ci sei riuscita/o!\n
```


###### codice finale completo
```scss
%% Visualizzazione della fase dei simboli ricevuti

% La fase assoluta può mostrare eventuali rotazioni dovute

% a errori di sincronizzazione di fase o di frequenza.

load("C:\Users\Luca\Documents\MATLAB\esempiosegnalericevuto2.mat");

%% Caricamento dei campioni ricevuti

% Segnale complesso in banda base.

sig = yout.signals.values(1:600,1,20);

phase = angle(sig(1:200));

figure(1);

stem(phase,'filled');

grid on;

title('Fase dei simboli ricevuti');

xlabel('Indice simbolo');

ylabel('Fase [rad]');

%% Demodulazione differenziale DBPSK

% Si confronta ogni simbolo con il precedente:

%

% d(k) = r(k) * conj(r(k-1))

%

% In questo modo un offset di fase costante viene eliminato

% automaticamente.

phase_diff = sig(2:end) .* conj(sig(1:end-1));

figure(2);

stem(real(phase_diff),'filled');

grid on;

title('Parte reale dei simboli differenziali');

xlabel('Indice simbolo');

ylabel('Re\{d(k)\}');

%% Decisione sui bit

% I i simboli DBPSK dovrebbero essere

% concentrati attorno a +1 e -1 sull'asse reale.

%

% Re{d_corr} < 0 -> bit 1

% Re{d_corr} > 0 -> bit 0

rxBits = real(phase_diff) < 0;

%% Visualizzazione dei primi bit decodificati

figure(3);

stem(rxBits(1:100),'filled');

grid on;

ylim([-0.2 1.2]);

title('Primi 100 bit decodificati');

xlabel('Indice bit');

ylabel('Bit');

%% Preambolo atteso

pre = [0; 0; 0; 0; 1; 1; 1; 1; 0; 0; 0; 0; 1; 1; 1; 1];

%% andiamo a trovare la fine del preambolo

prbdet = comm.PreambleDetector(pre,Input='Bit');

idx = prbdet(rxBits);

display(idx);

lunghezza=length(rxBits);

%% converto il messaggio in ascii

Lpre = length(pre);

indiceuno = idx(1) + 1;

indicedue = idx(2) - Lpre;

bits_msg = rxBits(indiceuno:indicedue);

binstr8 = reshape(bits_msg, 8, []).';

binstr8 = char(binstr8 + '0');

binmtx = bin2dec(binstr8);

chrmtx = char(binmtx).';

disp(chrmtx)
```

##### Giorno 2!
avremo 3 esperimentis ma non ci vuole dire la prof cosa sono dobbiamo per ognis esperimentos
- analizzare lo spettros 
- la costellaziones
- la fase raws
- i bits ricevutis
- l ricercas del preambolos
- decodificas
devo capire cosa sta succedendo al segnale i primi 2 dovrebbero essere con jamming il terzo sta arrivando un altro tizios
possibili soluzioni DSS e frequency hopping
una di queste a quanto pare era uno shadowing farlocco
##### Esperimentaziones 0
quella fatta la volta scorza
##### Esperimetaziones 1
- analizzare lo spettros 
- la costellaziones
- la fase raws
- i bits ricevutis
- l ricercas del preambolos
- decodificas
messaggio non leggibile, diverso offset a 2500 hz l'altra volta era a 3500 hz
è difficile definire dei picchi
yout salvato si chiama `esperimento1segnalericevuto2`
CONFRONTA LO SPETTRO E LA COSTELLAZIONE DELL'ALTRA VOLTA FACENDO RAGIONAMENTI DECENTI

DECODIFICA INCOMPRENSIBILE output
CHE TIPO DI DISTURBO È?

```
Preamboli trovati nelle posizioni finali:  
134  
390  
  
  
Messaggio 1:  
WlàeEn@# kfahlciPïo!\n  
Tutti i messaggi estratti:  
WlàeEn@# kfahlciPïo!\n

>>
```
##### Esperimentaziones 2
non possiamo nemmeno dire chi sta trasmettendo
```
Error using [untitled](matlab:matlab.lang.internal.introspective.errorDocCallback\('untitled',%20'C:\Users\Luca\Documents\MATLAB\untitled.m',%2075\)) ([line 75](matlab:%20opentoline\('C:\Users\Luca\Documents\MATLAB\untitled.m',75,0\)))  
Sono stati trovati meno di 2 preamboli: impossibile estrarre messaggi delimitati.
```

##### Esperimentaziones 3
non sara un jammer
overshadowing 
la prof sta inviando grande ci 6 riuscito ma io ricevo un altro segnale

```scss
Preamboli trovati nelle posizioni finali:  
78  
334  
590  
  
  
Messaggio 1:  
Un alieno ha mangiato i bit!\n  
  
Messaggio 2:

Un alieno ha mangiato i bit!\n  
Tutti i messaggi estratti:  
"Un alieno ha mangiato i bit!\n"  
"Un alieno ha mangiato i bit!\n"

>>
```