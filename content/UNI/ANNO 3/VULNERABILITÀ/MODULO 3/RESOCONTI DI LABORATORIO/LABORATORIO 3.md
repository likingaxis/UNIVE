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
##### Gif della costellazione
![[gif costellazione.gif]]
aggiungi spiegazione del perchè è un cerchio
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

>[!Question]- perchè fare il prodotto tra il simbolo ricevuto al momento k e il coniugato al momento k-1 porta al simbolo in quel momento k?
> 
> 
> La portante può essere rappresentata come:
> $$cos(2πfct)$$
> Quindi, in modo semplificato, il segnale trasmesso può essere scritto come:
> $$s(t) = A m(t) cos(2πfct)$$
> - $A$ è l’ampiezza
> - $m(t)$ è il simbolo informativo, che può valere +1 oppure -1
> - $cos(2πfct)$ è la portante radio
> usando i numeri complessi abbiamo
> $$s(t) = Re\{A \ m(t) \  e^{(j \ 2π \ fct)}\}$$
> Il problema è che, nel ricevitore reale, la portante locale non è mai perfettamente uguale a quella del trasmettitore. Il ricevitore prova a riportare il segnale in banda base, ma può avere:
> $$r(t) ≈ C m(t) e^{(j(2πΔf t + φ))}$$
> dove C rappresenta un fattore di ampiezza, 
> mentre il termine esponenziale rappresenta la rotazione causata dall’errore di frequenza e di fase.
> - un errore di frequenza Δf;
> - un errore di fase φ.
> Facendo il prodotto con il complesso coniugato del simbolo all'istante precedente $k-1$:
> $$r(k) · conj(r(k-1))$$
> il termine di fase costante φ si elimina. Rimane solo una piccola rotazione dovuta alla differenza temporale tra due simboli consecutivi:
> $$e^{(j2πΔfT)}$$
> dove T è l’intervallo simbolico.
> Se l’offset di frequenza Δf è piccolo rispetto alla velocità dei simboli, questa rotazione tra due simboli vicini è abbastanza limitata. Quindi il prodotto differenziale conserva soprattutto il termine:
> $m(k) · m(k-1)$
> Questo termine è il punto fondamentale:
> - se due simboli consecutivi hanno la stessa fase, il prodotto vale +1;
> - se due simboli consecutivi hanno fase opposta, il prodotto vale -1.

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
Con la convenzione usata nel codice:
- Re{d(k)} > 0 indica assenza di cambio di fase, quindi bit 0
- Re{d(k)} < 0 indica cambio di fase di circa π, quindi bit 1
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

##### Giorno 2
in questa seconda giornata avremo 3 esperimenti da analizzare con l'obiettivo di definire il tipo di disturbo che la professoressa sta aggiungendo al segnale di base trasmesso il progetto Simulink usato è il medesimo della giornata precedente
##### Esperimento 0
quella fatta nella prima giornata
##### Esperimento 1
![[collage_esperimento1.png]]
a sinistra abbiamo il segnale dell'esperimento 0 mentre a destra il segnale dell'esperimento 1
possiamo dire sicuramente che il segnale nell'esperimento 1 risulta molto simile a quello nell'esperimento 0 
forse solo leggermente variato di offset visto che con l'esperimento 0 avevamo messo offset a 3500Hz e ora è a 2500Hz
![[collage_costellazioneesperimento1.png]]
per quanto riguarda il confronto delle costellazioni possiamo definire con certezza un forte rumore e una scarsa distinzione dei segnali
nell'esperimento 0 i punti risultavano più strutturati ora abbiamo una nuvola invece

in sostanza la decisione dei bit sembra decisamente meno affidabile
l'output dello script usato nella giornata precedente risulta essere il seguente
```
Preamboli trovati nelle posizioni finali:  
134  
390  
  
  
Messaggio 1:  
WlàeEn@# kfahlciPïo!\n  
Tutti i messaggi estratti:  
WlàeEn@# kfahlciPïo!\n

```
il fatto che siano stati trovati 2 preamboli significa che la struttura del messaggio non è completamente persa
sicuramente possiamo dire che i messaggi siano corrotti e penso sia un caso compatibile con un overshadowing mal riuscito dove il preambolo ancora rimane ma il messaggio è illeggibile

lo yout salvato si chiama `esperimento1segnalericevuto2`

##### Esperimento 2
Qui il comportamento del sistema cambia completamente rispetto all'esperimento 0
![[collage_esperimentosegnale2.png]]
possiamo vedere chiaramente come lo spettro risulti disturbato
![[collage_costellazioneesperimento2.png]]
vediamo come la costellazione mostri un disturbo ancora maggiore è impossibile definire i simboli adeguati
l'output dello script usato nella giornata precedente risulta essere il seguente
```
Error using [untitled](matlab:matlab.lang.internal.introspective.errorDocCallback\('untitled',%20'C:\Users\Luca\Documents\MATLAB\untitled.m',%2075\)) ([line 75](matlab:%20opentoline\('C:\Users\Luca\Documents\MATLAB\untitled.m',75,0\)))  
Sono stati trovati meno di 2 preamboli: impossibile estrarre messaggi delimitati.
```
il fatto che non ci siano nemmeno i preamboli significa che non è possibile delimitare il messaggio per la decodifica
dati gli effetti descritti è possibile ipotizzare un noise jamming che va a disturbare il canale utilizzato
una possibile soluzione potrebbe essere il frequency hopping dove il mittente cambia diverse volte la frequenza utilizzata nell'invio del segnale sotto accordo con il ricevente
oppure potremmo usare il DSSS (Direct Sequence Spread Spectrum) analizzato nel laboratorio precedente che applica effettivamente l'idea dietro i CDMA

##### Esperimento 3
Questo esperimento rappresenta un caso di overshadowing ben riuscito e ora cercherò di spiegare il motivo
![[collage_segnaleesperimento3.png]]
andando a confrontare lo spettro possiamo notare che sia differente ma comunque sembra essere strutturato
![[collage_costellazioneesperimento3.png]]
la costellazione ci indica molto bene come il segnale ricevuto sia facilmente interpretabile con una interpretazione dei simboli ben definita

l'output dello script usato nella giornata precedente risulta essere il seguente
sono stati trovati 3 preamboli e effettivamente il messaggio visualizzato è perfettamente leggibile ma sotto suggerimento dell'insegnante non è quello aspettato
il messaggio doveva essere lo stesso della giornata 1
il segnale inviato dall'attaccante può essere stato inviato con potenza maggiore e quindi andiamo a decodificare quello
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

```

##### Conclusione
In questo laboratorio abbiamo analizzato la ricezione di segnali DBPSK contenenti messaggi codificati in ASCII e abbiamo analizzato diversi scenari di disturbo riassumibili in questa tabella

![[Pasted image 20260608230612.png]]
- Se l'attaccante trasmette il segnale in assenza del target si sta creando effettivamente il messaggio 
- Se l'attaccante trasmette il segnale in presenza del target  può creare un effetto di annihilation o noise jamming con un messaggio che verrà eliminato(esperimento 2)
- Se l'attaccante vuole modificare il messaggio può fare symbol flipping oppure overshadowing(esperimento 3)
