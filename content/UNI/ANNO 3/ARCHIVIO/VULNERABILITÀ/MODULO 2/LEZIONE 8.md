- Internet è una rete di reti in cui miliardi di dispositivi comunicano scambiandosi pacchetti attraverso link e dispositivi di inoltro
	- dispositivi come host, switch, router, link di comunicazione, ISP
- switch host
##### Divisione in servizi TCP/IP ISO/OSI
- perché dividiamo in layer i vari servizi? 
	- Le reti sono sistemi complessi: ci sono host, router, link, applicazioni, protocolli, hardware e software. Per gestire questa complessità si usa una struttura a **livelli**, o **layer**
	- Il motivo principale è duplice:
	1. **Organizzativo**  
	    Dividere il sistema in livelli aiuta a capire meglio chi fa cosa.
	2. **Implementativo**  
	    Ogni layer offre un servizio al layer superiore e usa i servizi del layer inferiore. Questo rende il sistema più modulare.
- la tabella TCP/IP
![[Pasted image 20260514163356.png|414]]
##### Implementazione dietro al livello di collegamento
Il livello link è implementato in ogni host, spesso dentro la **scheda di rete**, detta **NIC**, Network Interface Card.
- La NIC implementa:
	- livello **link**
	- livello **physical**
- questi due livelli quindi sono una combinazione di hardware e software
##### Come funziona l'incapsulamento
L’incapsulamento è il meccanismo con cui ogni livello aggiunge il proprio header ai dati ricevuti dal livello superiore.
- `M` = messaggio applicativo
- `Ht` = header del livello transport
- `Hn` = header del livello network
- `Hl` = header del livello link
![[Pasted image 20260514163501.png|394]]
- gli **host** implementano tutti i livelli: application, transport, network, link, physical;
- i **router** guardano principalmente fino al livello network;
- gli **switch** lavorano soprattutto al livello link.
##### Come funziona una richiesta google
Le slide spiegano cosa succede quando un client si collega a una rete e richiede `www.google.com`.

Scenario:
1. Il dispositivo arriva nella rete.
2. Deve ottenere una configurazione IP.
3. Usa DHCP.
4. Deve risolvere il nome `www.google.com`.
5. Usa DNS.
6. Deve inviare pacchetti al router.
7. Usa ARP per trovare il MAC del router.
8. Apre una connessione TCP.
9. Invia una richiesta HTTP.
10. Riceve la risposta HTTP con la pagina web.

![[Pasted image 20260514163749.png|398]]
- *DHCP* serve a ottenere automaticamente informazioni di rete, come:
	- indirizzo IP del client;
	- indirizzo del router di primo hop, cioè default gateway;
	- indirizzo del server DNS.
	-  prima di fare una richiesta http il browser con aiuto del SO apre una socket per
		- su porta UDP 67 abbiamo il server
		- su porta UDP 68 il client
##### Livello fisico con ARP
Prima di inviare pacchetti fuori dalla LAN, il client deve conoscere il **MAC address** del router di primo hop.
ARP è un protocollo di risoluzione di indirizzi e serve per trovare il MAC di un indirizzo IP
1. Il client manda una ARP request in broadcast.
2. Il router riceve la richiesta.
3. Il router risponde con una ARP reply contenente il proprio MAC address.
4. Il client salva l’informazione nella tabella ARP.
5. Ora può inviare frame Ethernet al router.

La tabella ARP ha un **TTL**, cioè le entry non restano valide per sempre. Dopo un certo tempo scadono e devono essere aggiornate.

ARP è insicuro perché nella LAN assume fiducia implicita tra i dispositivi.
Problemi principali:
- non c’è autenticazione;
- qualunque host può rispondere a una richiesta ARP;
- le risposte ARP possono essere accettate senza verifica.
###### Tipi di attacchi con ARP
| Attacco               | Descrizione                                                        |
| --------------------- | ------------------------------------------------------------------ |
| **ARP spoofing**      | L’attaccante finge di avere il MAC address di un altro dispositivo |
| **ARP poisoning**     | L’attaccante avvelena la tabella ARP della vittima                 |
| **Man-in-the-Middle** | L’attaccante si mette tra vittima e gateway                        |
| **Denial of Service** | L’attaccante interrompe o devia il traffico                        |
Dopo aver ottenuto la configurazione IP e il MAC del gateway, il client deve conoscere l’indirizzo IP di `www.google.com`.

Prima di fare una richiesta HTTP, il browser, con l’aiuto del sistema operativo, apre una **socket TCP** verso il server web.
#### Transmission rate dei pacchetti
![[Pasted image 20260514164103.png|264]]
si calcola il tempo per trasmettere un pacchetto facendo
$$\text{transmission delay}= \frac{L}{R}$$
- qui **bandwidth** significa capacità del link, cioè quanti bit al secondo posso trasmettere;
- a livello fisico, “banda” può anche indicare un intervallo di frequenze.
- più **bandwidth** → potenzialmente più bit al secondo;
- info utili:
	- frequenza più alta → spesso più banda disponibile
	- ma frequenze più alte possono avere più problemi di propagazione, ostacoli e attenuazione
#### Reti wireless
- una rete Wireless è formata da 
	- wireless host
	- base station o access point
	- wireless link
	- rete cablata interna all'access point
![[Pasted image 20260514164640.png|486]]

Nel wireless più dispositivi condividono lo stesso mezzo radio. Serve quindi un protocollo per coordinare l’accesso al canale.
- come 

|Protocollo|Idea|
|---|---|
|**FDMA**|Frequency Division Multiple Access: utenti separati per frequenze diverse|
|**TDMA**|Time Division Multiple Access: utenti separati per intervalli di tempo|
|**CDMA**|Code Division Multiple Access: utenti separati tramite codici|
|**Random access**|i dispositivi provano ad accedere al canale secondo regole probabilistiche|
|**Polling**|un nodo centrale autorizza chi può trasmettere|

- per instaurare connessioni wireless ci sono due tecniche
	- beacon: AP inviano pacchetti beacon 
	- probing: device invia pacchetti alle base station
- Evil Twin
	- Un attacco **Evil Twin** avviene quando l’attaccante crea un access point falso con lo stesso SSID di una rete legittima.
![[Pasted image 20260514170002.png]]
##### Connettersi con il wifi
Dopo l’associazione, il dispositivo deve:
1. autenticarsi con la rete;
2. verificare la rete, nei sistemi con mutual authentication;
3. derivare chiavi crittografiche;
4. cifrare i frame trasmessi via radio.
Nel WiFi personale può esserci una password condivisa. Nel WiFi enterprise c’è spesso un Authentication Server.
- I dispositivi possono inviare probe request per cercare reti note.
	- Un attaccante può ascoltare queste richieste e ottenere informazioni su:
		- dispositivo
		- reti cercate
		- spostamenti
		- abitudini dell’utente
		- profilo dell’utente
##### Software Defined Radio
La **Software Defined Radio**, SDR, è una radio in cui molte funzioni normalmente implementate in hardware vengono gestite via software.
Half-duplex significa che la comunicazione può avvenire in entrambe le direzioni, ma **non contemporaneamente**.
Nel wireless questo è molto importante perché spesso un dispositivo non può trasmettere e ricevere nello stesso momento sullo stesso canale.

| Modalità        | Significato                                               |
| --------------- | --------------------------------------------------------- |
| **Simplex**     | Comunicazione solo in una direzione                       |
| **Half-duplex** | Comunicazione in entrambe le direzioni, ma una alla volta |
| **Full-duplex** | Comunicazione simultanea in entrambe le direzioni         |

###### Come funziona la comunicazione Elettromagnetica
La comunicazione wireless avviene tramite **antenne**.  
Un trasmettitore fa circolare corrente in un’antenna; questa corrente genera un **campo elettromagnetico** nello spazio. Il campo si propaga e, quando raggiunge un’altra antenna, induce una corrente nel ricevitore. In questo modo l’informazione può essere trasferita senza fili.
![[Pasted image 20260514171608.png|385]]
##### Onde elettromagnetiche 
Un’onda elettromagnetica è caratterizzata da alcune grandezze fondamentali:
- lunghezza d'onda
	- La **lunghezza d’onda**, indicata con $\lambda$, è la distanza tra due punti equivalenti consecutivi dell’onda, ad esempio tra due picchi.
- frequenza
	- La **frequenza** indica quante oscillazioni avvengono in un secondo. Si misura in **Hz**.
	- la frequenza è data dalla velocità della luce fratto la lunghezza d'onda :
		- $f = \frac{c}{\lambda}$​
- ampiezza
	- L’**ampiezza** indica quanto è “forte” il segnale.  
		- Dal punto di vista fisico è collegata alla potenza del segnale elettromagnetico.
- potenza
- La **potenza** rappresenta l’energia trasmessa o ricevuta per unità di tempo.
	- Può essere misurata in:
		- watt;
		- milliwatt;
		- decibel;
		- dBm.
	- Il dBm è una scala logaritmica riferita a 1 milliwatt.
		- $P_{dBm} = 10 \log_{10}\left(\frac{P_{mW}}{1mW}\right)$
![[Pasted image 20260514175938.png|237]]
- direzione di propagazione
	- L’onda elettromagnetica si propaga in una certa direzione nello spazio.  
	- Nel caso reale, però, l’ambiente può modificarne il percorso a causa di ostacoli, riflessioni, assorbimenti e diffrazioni.
- fase
	- La **fase** descrive lo “spostamento temporale” di un segnale periodico rispetto a un riferimento.
		- Due segnali possono avere:
			- stessa frequenza;
			- stessa ampiezza;
			- ma fase diversa.
			- Se un segnale è traslato nel tempo rispetto a un altro, si dice che è **sfasato**.
![[Pasted image 20260514174342.png]]

##### Codifica dei bit in un segnale radio
Per trasmettere bit tramite onde elettromagnetiche, devo modificare una caratteristica del segnale portante.
Le tre caratteristiche principali che posso modificare sono:
1. **ampiezza**;
2. **frequenza**;
3. **fase**.
Quindi posso avere:
- modulazione in ampiezza;
- modulazione in frequenza;
- modulazione in fase.
- Potrei pensare: “trasmetto un segnale forte per indicare 1 e un segnale debole per indicare 0”.
	- Il problema è che in wireless ci sono interferenze, rumore e possibili attacchi
###### La banda
Un segnale in **banda base** è un segnale centrato intorno alla frequenza 0.
È il segnale “originale”, prima di essere spostato su una frequenza radio.
- Per esempio, un segnale digitale o audio può essere pensato inizialmente come segnale in banda base.
- Il problema è che non posso trasmettere direttamente molti segnali diversi tutti in banda base, perché si sovrapporrebbero e interferirebbero tra loro.
Per questo nel wireless si usa una **portante**.

###### Portante
La portante è una sinusoide ad alta frequenza:
$\cos(2\pi f_c t)$
- dove $f_c$ è la **frequenza di carrier**, cioè la frequenza centrale su cui trasmetto.
- Moltiplicando il segnale in banda base per la portante, lo sposto intorno a $f_c$
###### Banda passante
La **banda passante** è il segnale dopo lo spostamento intorno alla frequenza portante.
Quindi:
- banda base: segnale centrato intorno a 0 Hz;
- banda passante: segnale centrato intorno a una frequenza radio $f_c$.
##### Passaggio da banda base a passante
Il segnale originale è $A(t)$.
- Per trasmetterlo via radio, lo moltiplico per una portante:
	- $\cos(2\pi f_c t)$
Questa operazione sposta lo spettro del segnale intorno a $+f_c$ e $-f_c$
Quindi il segnale, che prima era centrato intorno a 0, viene traslato su una frequenza radio
![[Pasted image 20260514174431.png]]
##### Da banda passante a banda base
Il ricevitore riceve il segnale:
- $A(t)\cos(2\pi f_c t)$
Per riportarlo in banda base, lo moltiplica di nuovo per la stessa portante:
- $\cos(2\pi f_c t) \cdot \cos(2\pi f_c t)$
Poiché:
- $\cos^2(2\pi f_c t) = \frac{1}{2}\left(1 + \cos(4\pi f_c t)\right)$
si ottiene:
$\frac{A(t)}{2}\left(1 + \cos(4\pi f_c t)\right)$
Questo contiene due parti:
1. una componente in banda base, cioè $\frac{A(t)}{2}$;
2. una componente ad alta frequenza, intorno a $2f_c$.
Poi il ricevitore usa un **filtro passa-basso** o **filtro banda base** per eliminare la componente a $2f_c$ e tenere solo la banda base.
Quindi il segnale utile torna vicino a 0 Hz.
- la larghezza di banda si misura in Hz ed è l'intervallo di frequenze occupato da un segnale
	- un segnale occupa un certo range di frequenze di una banda
		- la larghezza è la differenza dei due punti
![[Pasted image 20260514180002.png|199]]

###### Ad alte frequenze posso creare più canali
Lo spettro assegnato a quelle bande è più largo.
Se ho una “strada” larga, posso dividerla in più corsie.  
Se ho una banda radio più ampia, posso dividerla in più canali.
- con 100 MHz disponibili posso avere circa 5 canali;
- con 1000 MHz disponibili posso avere circa 50 canali.
Quindi le alte frequenze spesso permettono più canali perché offrono porzioni di spettro più ampie.

##### Spettro radio
Lo spettro radio è una risorsa condivisa.  
Non tutti possono trasmettere dove vogliono e con la potenza che vogliono, perché altrimenti ci sarebbero interferenze continue.
- lo spettro si divide in 3 categorie
	- sotto licenza
	- condiviso dinamicamente(con priorità)
	- non licenziato(libero)
		- usato per wifi e bluetooth
##### Layer fisico
Il **layer fisico** prende i bit e li trasforma in segnali trasmissibili sul mezzo fisico, cioè nel nostro caso onde elettromagnetiche.
![[Pasted image 20260514180121.png]]
- i dati originali come bit possono presentare bit di EDC
	- Error detection and correction
	- come bit di parità o codici di correzione
##### Modulazione digitale
- la modulazione è il processo che trasforma i bit in simboli e poi informe d'onda
- diverse tipologie di modulazione:
###### ASK Amplitude Shift Keying
Nella **ASK**, cioè Amplitude Shift Keying, i bit vengono codificati cambiando l’ampiezza del segnale
- ampiezza alta = 1
- ampiezza bassa o nulla = 0
È semplice, ma può essere fragile, perché rumore e attenuazione influenzano molto l’ampiezza
###### FSK Frequency Shift Keying
Nella **FSK**, cioè Frequency Shift Keying, i bit vengono codificati cambiando la frequenza.
- frequenza più bassa = 0;
- frequenza più alta = 1.
Il ricevitore deve capire quale frequenza è stata trasmessa.

###### PSK Phase Shift Keying
Nella **PSK**, cioè Phase Shift Keying, i bit vengono codificati cambiando la fase.
Nel caso più semplice, la **BPSK**, ci sono due fasi:
- una fase rappresenta 0
- la fase opposta rappresenta 1
Le due fasi sono sfasate di 180°
![[Pasted image 20260514180639.png|331]]
###### QPSK
La **QPSK**, cioè Quadrature Phase Shift Keying, estende la PSK usando quattro fasi diverse
Invece di trasmettere un bit per simbolo, trasmette due bit per simbolo
![[Pasted image 20260514180833.png]]
#### Rappresentazione di un segnale sinusoidale usando due componenti
La rappresentazione **IQ** serve a rappresentare un segnale sinusoidale usando due componenti:
- componente **I**, in-phase;
- componente **Q**, quadrature.
Le due componenti sono sfasate di 90°.
Un segnale può essere scritto combinando:
- un coseno;
- un seno.
L’idea è che invece di descrivere direttamente ampiezza e fase, posso descrivere il segnale come punto in un piano bidimensionale:
- asse orizzontale: componente I;
- asse verticale: componente Q.
![[Pasted image 20260514181038.png]]

##### Costellazione diagrammi
Il **diagramma di costellazione** rappresenta graficamente i simboli trasmessi.
Ogni punto nel piano indica:
- una certa ampiezza, data dalla distanza dall’origine;
- una certa fase, data dall’angolo rispetto all’asse orizzontale.
###### QAM Quadrature Amplitude Modulation
La **QAM** generalizza la QPSK.
Nella QPSK cambio solo la fase, mantenendo costante l’ampiezza.  
Nella QAM posso cambiare sia la fase sia l’ampiezza.
- La formula generale è:
	- $\log_2(M)$
dove $M$ è il numero di punti nella costellazione
- 4-QAM usa 4 simboli e trasmette 2 bit per simbolo;
- 16-QAM usa 16 simboli e trasmette 4 bit per simbolo;
- 64-QAM usa 64 simboli e trasmette 6 bit per simbolo.
Se aumento il numero di punti nella costellazione, trasmetto più bit per simbolo
Però i punti sono più vicini tra loro
Questo significa che il ricevitore deve misurare ampiezza e fase con maggiore precisione
- QAM alta = più bitrate;
- QAM alta = richiede canale migliore;
- QAM alta = richiede SNR più alto.
si usa spesso con modulazione adattiva
- consente di cambiare lo schema di modulazione magari con un massimo di 64-QAM
![[Pasted image 20260514181413.png]]
- foto di adaptive modulation
![[Pasted image 20260514181954.png]]
#### SNR
L’SNR è il rapporto tra la potenza del segnale e la potenza del rumore.
$$SNR_{dB} = 10\log_{10}\left(\frac{P_{signal}}{P_{noise}}\right)$$
Se l’SNR è alto, il segnale è molto più forte del rumore.  
Se l’SNR è basso, il segnale è vicino al rumore e diventa difficile da distinguere.
- SNR alto: il ricevitore capisce bene i simboli;
- SNR basso: il ricevitore può confondere i simboli;
- SNR = 0 dB: segnale e rumore hanno la stessa potenza.

La capacità del canale indica il massimo bitrate teorico possibile, dato un certo canale, una certa banda e un certo SNR.
La formula di Shannon è:
$$C = B\log_2(1 + SNR)$$
- $C$ è la capacità in bit/s;
- $B$ è la larghezza di banda in Hz;
- $SNR$ è il rapporto segnale-rumore in forma lineare, non in dB.
##### Path loss
Il **path loss** è la perdita di potenza del segnale mentre si propaga nello spazio.
Più il ricevitore è lontano, più il segnale ricevuto è debole.
In spazio libero, una relazione approssimata è:
$$\text{path loss} \sim (fd)^2$$
oppure, guardando il rapporto tra potenza ricevuta e trasmessa:$$\frac{P_{received}}{P_{transmitted}} \sim \frac{1}{(fd)^2}$$
- $f$ è la frequenza;
- $d$ è la distanza.
![[Pasted image 20260514181709.png|239]]

###### Problemi noti e tempo di coerenza
- Il problema del **terminale nascosto** nasce quando alcuni dispositivi non riescono a sentirsi tra loro, ma interferiscono comunque su un ricevitore comune.
![[Pasted image 20260514181753.png]]
- Il **multipath** avviene quando il segnale radio arriva al ricevitore seguendo più percorsi.
- Il **tempo di coerenza** indica per quanto tempo il canale può essere considerato stabile.
	- Se il canale cambia troppo velocemente, il ricevitore fa fatica a interpretare correttamente i simboli.
Il tempo di coerenza dipende da:
- frequenza;
- velocità del ricevitore;
- movimento nell’ambiente;
- riflessioni e multipath.
![[Pasted image 20260514181931.png]]
##### Layer fisico
- dati originali: bit
- coding+correzione errori e bit:
	- aggiungo EDC
- digital modulation: tecnica che massimizza 
	- modulazione dei bit per tempo di bit (bit per secondo è l'inverso )
		- + modulazione richiede più banda
		- vado a modulare questa portante su 3 caratteristiche
			- ampiezza frequenza o fase
			- in ampiezza: moltiplico 1 e 0 sulla sinusoide
			- frequenza: frequenza più bassa quando trasmetto 0 frequenza più alta 1
			- fase: parti da una certa fase, cambio di fase indica lo scambio tra 0 o 1
		- ASK e PSK
			- usate in ambito radio le ask
				- usato in ambito amplitude
			- psk cambia la fase di 180 gradi
			- qpsk
				- in un cambio di fase di 4 trasmetto 4 possibili segnali 00 01 10 11
- pulse shaping: match trasmission bandwidth
- rf modulation: trasmette segnale 
iq represenation:
- posso scrivere un coseno sommando due componenti in quadratura, ovvero sfasate di 90 gradi
	- scelta della fase del segnale mantenendo l'ampiezza costante
- diagramma di costellazione 
	- qpsk visto in precedenza si può rappresentare in uno spazio bidimensionale
		- che indica il cambio di fase
	- qpsk supremo che generalizza ampiezza e fase con qam
	- lavorando a 64 qam per il wifi
		- più aumento qam più devo avere frequenza e fase precisi devo avere
- rapporto segnale rumore SNR
	- un snr basso permette qam alti
	- un snr alto porta a qam bassi
	- effettuando quindi una modulazione di fase
- path loss wireless
	- preceived/ptransmitted ~ $1/(fd)^2$
	- hidden terminal problema principale del path loss
- multipath
	- riflessioni ambientali
	- tempo di coerenza, troppe riflessioni la bitrate deve essere ridotta
		- altrimenti non capisco quale bit corrisponde a quale
