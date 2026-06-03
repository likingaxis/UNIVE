riprendiamo il concetto di BPSK usato nel Lab 02
frequency upconvention quando passiamo da banda base a frequenza portante
deve essere identico al frequency downconvention
noi lo avevamo immaginato in uno scenario ideale dove il segnale ritorna uguale 
desideriamo che la sincronizzazione sia quasi perfetta per una buona demodulazione
quindi ho 2 sistemi di comunicazione che possono essere coerenti e non coerenti si differenziano
dalla necessità che hanno per potersi sincronizzare:
- peffozza 1 spiega coerenti
- peffozza 2 spiega non coerenti(gay)
per ricostruire il segnale potrei usare una funzione diversa di demodulazione con quella usata 
devo allinearmi in tempo e in frequenza
le comunicazioni non coerenti sono utili per funzionare con una demodulazione senza dover conoscere propriamente fc ovvero la funzione portante in teoria quindi tipo il coseno
##### Comunicazioni non coerenti
in questa giornata di laboratorio vedremo degli esempi applicativi di comunicazioni non coerenti con la DBPSK:
- quando vogliamo trasmettere una sequenza di bit li trasmettiamo a un certo istante di tempo
- se il bit è a 1 inverto il bit dell'istante precedente
- se il bit è a 0 non inverto il bit precedente
questo è utile a slide 16 abbiamo un esempio
nella pratica quando abbiamo un segnale lo moltiplichiamo con l'oscillatore complesso per codificarlo
invio quindi in questo caso bit differenziale 1 o -1 a seconda se è 1 o 0
per il recupero e la decodifica vorrei fare la stessa cosa ma con una certa delta che cambia leggermente la formula e con anche uno sfasamento
Costellazione del deppeffozza che fa vedere uno shifting con un anello per ricostruire un segnale anche se abbiamo un anello fatto così
se il carrier frequency offset cambia ogni volta posso ricostruirlo solo perchè deltaf è costante se cambiasse continuamente non riuscirei a risolvere

###### Come è fatto il file del deppeffozza progetto simulink
abbiamo un nostro ricevitore rtl sdr con un offset per provare a centrare lo spettro possiamo alzarlo un pochettino fino a 60
prendiamo un campione ogni tot per allineare la frequenza con il decimatore
poi c'è un filtro che fa bho
poi lo spectrum analyzer che lavora sul dominio delle frequenze
poi abbiamo un symbol sinchronizer con il yout to workspace
alter symbol synch

vediamo una costellazione a cerchio e lo spectrum analyzer con un certo offset, ora vediamo che mettendo a 0 l'offset andiamo a spostarei l segnale centrale a destra
l'obiettivo e cercare di portare i picch a destra e a sinistra
ho registrato 2 clip una con offset a 3500 e l'altra con offset default e 0
###### Usare yout
dopo aver terminato l'esecuzione abbiamo la variabile yout che ha salvato la nostra SDR
il segnale in yout è a banda passante o base? la risposta è base perchè abbiamo filtrato e elaborato tutto
###### Obiettivo 
```scss
%% Visualizzazione della fase dei simboli ricevuti
% La fase assoluta può mostrare eventuali rotazioni dovute
% a errori di sincronizzazione di fase o di frequenza.

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
% Re{d_corr} < 0  -> bit 1
% Re{d_corr} > 0  -> bit 0

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
pre = [0 0 0 0 1 1 1 1 0 0 0 0 1 1 1 1];
```
visualizzo ognuno di questi pallini che rappresenta la fase del segnale in quell'istante
faccio la differenza di fase moltiplicando ogni campione per il cognugato del precedente
decodifica differenziale ci fa vedere il simbolo che ha fase 0 o pi greco che vale 1 o -1 in ampiezza
dopo la decodifica differenziale

possiamo salvare il file come `save('esempiosegnalericevuto','yout');`
dopo la decodifica differenziale possiamo definire bene il simbolo
se Re{d_corr}<0 allora il bit è 1 
se Re{d_corr}>0 allora il bit è 0

mi sono avvicinato alla prof ora le 3 figure sono:


###### Come leggo ora questi bit come segnale?
quindi con un codice posso decodificare e leggere del testo
uso la funzione xcorr e uso questa funzione di correlazione con i bit di preambolo
poi dobbiamo convertire i bit in ascii
come cercare altrimenti il preambolo sapendo che il preambolo è quello scritto sotto
```scss
pre= [0 0 0 0 1 1 1 1 0 0 0 0 1 1 1 1];
```

ho 600 campioni e vedo 2 picchi quindi 2 volte il preambolo, sappiamo che ho una codifica ascii
in 600 bit probabilmente il messaggio è lungo 256 bit dovuto al fatto che abbiamo 2 ripetizioni quindi $2^8$
