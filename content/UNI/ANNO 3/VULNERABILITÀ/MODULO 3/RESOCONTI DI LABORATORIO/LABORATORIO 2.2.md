##### Giornata 2
In questa seconda giornata di laboratorio introduciamo il problema dell'accesso alle risorse in modo multiplo



questa lezione volge a voler definire con mezzi pratici l'accesso simultaneo di mezzi di trasferimento Wireless o via cavo
- in un sistema wifi non associo in modo statico la frequenza a un solo dispositivo
##### Sistema ideale di multiple access protocol
- trasferimento R quando ci sono più dispositivi R/M
- decentralizzato e semplice
##### protocolli famosi utilizzati si dividono principalmente in
- channel partitioning
- random access
- taking turns
###### TDMA
fa schifo spreco tempo
spiegazione rapida
###### FDMA
spettro radio diviso in bande di frequenza prefissate
ogni stazione ha la sua banda di frequenza
###### OFDM
- ha un massimo e dove ho meno energia ho degli zeri
- ci sovrapponiamo sugli zeri per trovare un'altra informazione
- così sfrutto molto meglio la banda permettendo molti più canali(giusto?)
- anche lo stesso utente ma che manda più info in parallelo
- viene usato nelle reti più moderne
- tabella carina che fa vedere aumento della banda con aumento dei subcarriers possibili
	- discorso anche sul sistema di modulazione usato
- un simbolo equivale a 66.6 umsec
- la base station decide come allocare l'utente
- le sub carrier possono muoverti fino a 120 khz servendo più clienti con banda da 100 khz
tabella carina con tecnologie di gestione del segnale

Spread Spectrum è ancora non male per uso militars
OFDM OFDMA MIMO
###### CDMA
- uso un codice unico assegnato a ogni utente 
- mortiplica e divide pe capi quanto sta a invia stessa cosa chi manda e riceve
- moltiplica $M$ e $D_i$
+velocitàditrasferimento +banda
lo uso per nascondermi nello spettro, moltiplicando per il coding ritorno a una banda più piccola
ci sono 2 schemi
- Direct Sequence CDMA
- Frequency Hopping CDMA
	- sulla frequenza il trasmettitore fa hope mediante il codice
	- tanto sono ortogonali quindi con un altro trasmettitore non avrò incrocio del segnale
- Time Hopping CDMA
	- bho inutile spiega poco

##### DSSS Simulation Simulink
aggiungiamo uno spectrum analyzer
prima e dopo lo spreading lato ricevitore

abbiamo la bit rate e la chip rate
dopo la moltiplicazione abbiamo la Chip Rate
il seed serve per riottenere la stessa simulazione di prima
abbiamo messo un time scope con 2 input 
over time possiamo vedere che i bit sono meno frequenti dei bit
abbiamo aggiunto un nuovo input al chip skylark
misuro la banda dello spettro andando tra più o meno 100 e -100 hz e potenza -18 e 12

