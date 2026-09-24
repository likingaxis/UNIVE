# Resoconto Corso: Reti di Calcolatori

- **Anno:** 2° Anno Triennale
- **Area:** Sistemi di Elaborazione delle Informazioni / Telecomunicazioni e Architetture di Rete (ING-INF/05 - INF/01)
- **Crediti/Collocazione:** Insegnamento cardine per comprendere l'architettura, i protocolli e le comunicazioni telematiche nell'ecosistema Internet

---

## Obiettivi del Corso in Sintesi

Il corso analizza in modo sistematico l'architettura di Internet e delle reti di telecomunicazione moderne, adottando un approccio top-down strutturato sulla pila protocollare a 5 livelli (TCP/IP). Lo studente acquisisce le competenze teoriche e operative per:
1. **Comprendere l'architettura globale di Internet:** analizzare la suddivisione tra nucleo di rete (core) e periferia (edge), i paradigmi di commutazione di circuito e di pacchetto, e le sorgenti fisiche e logiche dei ritardi di trasmissione.
2. **Padroneggiare i protocolli applicativi standard:** studiare il funzionamento di HTTP (1.0, 1.1, 2, 3), DNS, sistemi di posta elettronica (SMTP, IMAP) e architetture distribuite (Client-Server e P2P).
3. **Approfondire i meccanismi di trasporto affidabile e controllo della congestione:** progettare protocolli a trasferimento dati affidabile (RDT), comprendere TCP (handshake, controllo di flusso, AIMD, varianti Reno, Tahoe, Cubic) e UDP.
4. **Analizzare il livello di rete (Data e Control Plane):** studiare l'indirizzamento IPv4/IPv6, CIDR, NAT, frammentazione, algoritmi di instradamento (Dijkstra e Bellman-Ford), routing inter e intra-dominio (OSPF, BGP) e le architetture SDN.
5. **Comprendere le tecnologie di collegamento locale e wireless:** analizzare l'accesso multiplo (CSMA/CD, CSMA/CA), Ethernet, apparati di commutazione di livello 2 (Switch, VLAN), rilevazione errori (CRC) e reti mobili (Wi-Fi, 4G/5G).

---

## Mappa / Elenco Macro-Aree e Moduli Tematici

### 1. Architettura di Internet, Prestazioni e Pila Protocollare
- **Struttura di Internet:**
  - Periferia della rete (Edge): end systems/host, client, server, data center.
  - Nucleo della rete (Core): magliatura di commutatori di pacchetto (router e switch) e link di interconnessione.
  - Gerarchia degli ISP: ISP Tier-1 globali, IXP (Internet Exchange Point), ISP regionali e ISP d'accesso locali.
- **Tecniche di commutazione:**
  - Commutazione di circuito: allocazione esclusiva delle risorse end-to-end (FDM - Frequency Division Multiplexing, TDM - Time Division Multiplexing).
  - Commutazione di pacchetto: trasmissione a memorizzazione e inoltro (store-and-forward), multiplexing statistico dei flussi, frammentazione del messaggio in pacchetti di $L$ bit.
- **Metriche di prestazione e ritardi di rete:**
  - **Ritardo di trasmissione ($T_{tx}$):** tempo per immettere tutti i bit del pacchetto sul canale: $T_{tx} = \frac{L}{R}$ (dove $L$ è la dimensione in bit e $R$ è la velocità di trasmissione in bps).
  - **Ritardo di propagazione ($T_{prop}$):** tempo impiegato dal singolo bit per percorrere il mezzo fisico: $T_{prop} = \frac{d}{v}$ (con $d$ distanza e $v \approx 2 \cdot 10^8\text{ m/s}$ velocità di propagazione nel mezzo).
  - **Ritardo di accodamento ($T_{queue}$):** tempo di sosta nel buffer del router in attesa di trasmissione, dipendente dall'intensità di traffico $I = \frac{L \cdot a}{R}$.
  - **Ritardo di elaborazione ($T_{proc}$):** tempo per la verifica degli errori di header e la consultazione della tabella di inoltro.
  - **Ritardo totale end-to-end:** $D_{e2e} = \sum (T_{tx} + T_{prop} + T_{queue} + T_{proc})$.
  - **Throughput e collo di bottiglia (Bottleneck Link):** calcolo della capacità effettiva di trasferimento limitata dal link con throughput minimo: $R_{eff} = \min(R_1, R_2, \dots, R_k)$.
- **Modelli a strati e principio di incapsulamento:**
  - Architettura a 5 livelli TCP/IP:
    1. **Applicazione:** scambio di *messaggi* tra processi.
    2. **Trasporto:** trasferimento di *segmenti* end-to-end.
    3. **Rete:** instradamento di *datagrammi* tra host sorgente e destinazione.
    4. **Collegamento (Link):** inoltro di *frame* tra nodi fisicamente adiacenti.
    5. **Fisico:** trasmissione di singoli *bit* sul segnale fisico.
  - Confronto con il modello ISO/OSI a 7 livelli (inclusione dei livelli di Presentazione e Sessione).
  - Processo di incapsulamento dati con aggiunta progressiva di intestazioni (header) e decapsulamento al ricevitore.

### 2. Livello di Applicazione
- **Paradigmi architetturali di rete:**
  - Architettura Client-Server: server sempre attivo con IP noto, client che avviano le connessioni; problemi di scalabilità e colli di bottiglia.
  - Architettura Peer-to-Peer (P2P): decentralizzazione, auto-scalabilità; studio del caso BitTorrent (divisione file in chunk, tracker, strategia Tit-for-Tat per contrastare i free-rider, unchoking ottimistico).
- **Interfaccia di comunicazione: i Socket:**
  - Identificazione univoca dell'endpoint: combinazione di Indirizzo IP e Numero di Porta a 16 bit.
- **Il Protocollo HTTP (HyperText Transfer Protocol):**
  - Caratteristiche: protocollo stateless su trasporto TCP (porta 80 standard, 443 HTTPS).
  - Struttura dei messaggi: riga di richiesta (metodo, URL, versione), righe di intestazione (Host, User-Agent, Accept), corpo del messaggio. Metodi principali: `GET`, `POST`, `HEAD`, `PUT`, `DELETE`.
  - Codici di stato HTTP: 1xx (informativi), 2xx (successo, es. `200 OK`), 3xx (reindirizzamento, es. `301 Moved Permanently`, `304 Not Modified`), 4xx (errore client, es. `400 Bad Request`, `404 Not Found`), 5xx (errore server, es. `500 Internal Server Error`).
  - Evoluzione storica e prestazionale:
    - HTTP/1.0: connessione TCP non persistente (1 RTT di handshake + 1 RTT per ciascun oggetto).
    - HTTP/1.1: connessioni persistenti con supporto al pipelining (riduzione a 1 RTT per più oggetti consecutivi).
    - HTTP/2: framing binario, multiplexing di stream multipli su un'unica connessione TCP, compressione header HPACK, Server Push.
    - HTTP/3: trasporto basato su UDP tramite protocollo QUIC per eliminare l'Head-of-Line blocking a livello trasporto e velocizzare l'handshake crittografico (0-RTT).
  - Gestione dello stato: Cookies (header `Set-Cookie` e `Cookie`), identificativi di sessione lato server e tracciamento.
  - Web Caching e Proxy: conservazione locale delle risposte, richieste condizionali `GET` con `If-Modified-Since` per risparmiare banda di transito, reti di distribuzione dei contenuti (CDN).
- **Domain Name System (DNS):**
  - Servizio fondamentale di traduzione tra nomi di dominio simbolici (FQDN) e indirizzi IP numerici.
  - Architettura gerarchica distribuita: Root DNS Server, Top-Level Domain (TLD) Server (.com, .org, .it), Server Autorevoli (Authoritative), e Local DNS Server / Resolver.
  - Modalità di risoluzione:
    - Query ricorsiva: il server contattato si assume il carico di risolvere l'intera richiesta per conto del client.
    - Query iterativa: il server risponde indicando l'indirizzo del server DNS di livello successivo da contattare.
  - Record di risorsa (Resource Records - RR): tipo `A` (IPv4), `AAAA` (IPv6), `CNAME` (alias di nome canonico), `NS` (server autorevole), `MX` (mail server), gestione della validità temporale con TTL (Time-To-Live).
- **Posta Elettronica:**
  - Componenti: User Agent (MUA), Mail Server (MTA), code di messaggi.
  - Protocollo SMTP (porta 25): protocollo di push per il trasferimento dei messaggi tra server di posta, basato su comandi testuali ASCII a 7 bit.
  - Protocolli di accesso alla casella (pull): POP3 (Post Office Protocol, download e cancellazione locale) e IMAP (Internet Message Access Protocol, sincronizzazione dinamica delle cartelle sul server).

### 3. Livello di Trasporto
- **Ruolo del livello di trasporto:**
  - Comunicazione logica tra processi applicativi; multiplexing (al mittente, tramite aggiunta degli header con porte di origine e destinazione) e demultiplexing (al destinatario, instradamento alla corretta socket di processo).
- **Protocollo UDP (User Datagram Protocol):**
  - Caratteristiche: connectionless, best-effort, nessun handshake, overhead ridotto (header di soli 8 byte contenente Porta Sorgente, Porta Destinazione, Lunghezza, Checksum).
  - Meccanismo di Checksum: somma binaria a 16 bit dei campi del segmento (con pseudo-header) e calcolo del complemento a uno per rilevare alterazioni di bit durante il transito.
  - Casi d'uso: streaming multimediale real-time, DNS, SNMP, DHCP, protocollo QUIC.
- **Principi del Trasferimento Dati Affidabile (RDT - Reliable Data Transfer):**
  - Evoluzione dei modelli a macchina a stati finiti (FSM):
    - **RDT 1.0:** canale perfettamente affidabile.
    - **RDT 2.0:** canale con corruzione di bit; introduzione di codici di controllo, riscontri positivi (ACK) e negativi (NAK).
    - **RDT 2.1:** gestione della corruzione degli stessi ACK/NAK mediante numeri di sequenza alternati a 1 bit (0/1) per rilevare duplicazioni.
    - **RDT 2.2:** eliminazione dei NAK; utilizzo di soli ACK recanti il numero di sequenza dell'ultimo pacchetto ricevuto correttamente (ACK duplicato come NAK implicito).
    - **RDT 3.0:** canale con perdite di pacchetti; introduzione di timer di ritrasmissione lato mittente; protocollo Stop-and-Wait e analisi del suo scarso utilizzo del canale ($U_{sender} = \frac{L/R}{RTT + L/R}$).
  - Protocolli a pipeline (a finestra scorrevole):
    - **Go-Back-N (GBN):** invio fino a $N$ pacchetti senza attendere ACK; ACK cumulativi; singolo timer per il pacchetto non riscontrato più vecchio; scarto di pacchetti arrivati fuori ordine al ricevitore; ritrasmissione in blocco di tutti i pacchetti da quello perso in poi.
    - **Ripetizione Selettiva (Selective Repeat - SR):** riscontri individuali per ciascun pacchetto; buffer di ricezione per mantenere pacchetti fuori sequenza; timer indipendente per ciascun frame; vincolo sulla dimensione della finestra $N \le 2^{k-1}$ per evitare ambiguità con lo spazio dei numeri di sequenza.
- **Protocollo TCP (Transmission Control Protocol):**
  - Caratteristiche: orientato alla connessione, punto a punto, affidabile, full-duplex, flusso di byte non strutturato.
  - Struttura del segmento TCP: Porte, Sequence Number (offset in byte), Acknowledgment Number (prossimo byte atteso), Header Length (Offset), Flag di controllo (URG, ACK, PSH, RST, SYN, FIN, ECE, CWR), Finestra di Ricezione (`rwnd`), Checksum, Urgent Pointer, Opzioni (MSS - Maximum Segment Size).
  - Gestione della connessione:
    - Apertura con Three-Way Handshake: `SYN` (seq=$x$), `SYN-ACK` (seq=$y$, ack=$x+1$), `ACK` (seq=$x+1$, ack=$y+1$). Prevenzione di connessioni spurie da vecchi duplicati.
    - Chiusura a 4 vie: invio `FIN`, ricezione `ACK`, invio contro-`FIN`, ricezione `ACK`; stato di attesa `TIME_WAIT` (2 MSL) per garantire la consegna dell'ultimo ACK e drenare segmenti residui nella rete.
  - Stima del Timeout di Ritrasmissione (RTO):
    - Calcolo adattativo: misurazione di `SampleRTT`, calcolo della media mobile esponenziale pesata $\text{EstimatedRTT} = (1-\alpha)\text{EstimatedRTT} + \alpha\text{SampleRTT}$ ($\alpha = 0.125$).
    - Calcolo della dispersione $\text{DevRTT} = (1-\beta)\text{DevRTT} + \beta|\text{SampleRTT} - \text{EstimatedRTT}|$ ($\beta = 0.25$).
    - Definizione del timeout: $\text{TimeoutInterval} = \text{EstimatedRTT} + 4 \cdot \text{DevRTT}$.
  - Controllo di Flusso: prevenzione del sovraccarico del buffer del ricevitore; il ricevitore comunica lo spazio libero residuo tramite il campo `rwnd`; vincolo $LastByteSent - LastByteAcked \le rwnd$.
- **Controllo della Congestione in TCP:**
  - Cause ed effetti della congestione: ritardi di accodamento elevati, ritrasmissioni inutili dovute a timeout prematuri, spreco di capacità per pacchetti scartati a valle.
  - Approccio end-to-end (deduzione dalle perdite/tempi) vs assistito dalla rete (marcatura bit ECN / ECE).
  - Meccanismo AIMD (Additive Increase, Multiplicative Decrease): incremento lineare di 1 MSS per RTT in assenza di perdite, dimezzamento moltiplicativo della finestra di congestione (`cwnd`) alla rilevazione di una perdita.
  - Fasi del ciclo vitale della congestione:
    - **Slow Start:** inizio con $\text{cwnd} = 1\text{ MSS}$, raddoppio ad ogni RTT (crescita esponenziale) fino alla soglia $\text{ssthresh}$.
    - **Congestion Avoidance:** al superamento di $\text{ssthresh}$, crescita lineare di 1 MSS per RTT.
    - **Fast Retransmit:** ritrasmissione immediata del segmento mancante alla ricezione di 3 ACK duplicati (segno di perdita isolata, rete ancora parzialmente operativa), senza attendere lo scadere del timer.
    - **Fast Recovery:** gestione della ripresa post-duplicati senza azzerare la finestra.
  - Varianti storiche e moderne:
    - **TCP Tahoe:** ad ogni evento di perdita (timeout o 3 ACK duplicati), imposta $\text{ssthresh} = \text{cwnd}/2$ e resetta $\text{cwnd} = 1\text{ MSS}$.
    - **TCP Reno:** su timeout resetta $\text{cwnd}=1$, ma su 3 ACK duplicati applica Fast Recovery: $\text{ssthresh} = \text{cwnd}/2$ e $\text{cwnd} = \text{ssthresh} + 3\text{ MSS}$, evitando di ricominciare da Slow Start.
    - **TCP Cubic:** funzione cubica del tempo per la crescita della finestra, ideale per reti ad alto prodotto banda-ritardo (BDP).
    - **TCP Vegas:** controllo proattivo basato sulla variazione dell'RTT anziché sulla perdita di pacchetti.
  - Formula del throughput medio di TCP Reno a regime: $\text{Throughput} \approx \frac{3}{4} \cdot \frac{W_{max} \cdot \text{MSS}}{\text{RTT}}$.
  - Equità (Fairness) di TCP: convergenza geometrica a una spartizione equa della banda tra connessioni concorrenti con RTT simile.

### 4. Livello di Rete: Piano Dati e Piano di Controllo
- **Funzioni fondamentali del livello di rete:**
  - **Inoltro (Forwarding / Data Plane):** trasferimento hardware locale di un pacchetto da un'interfaccia di ingresso a un'interfaccia di uscita dello stesso router.
  - **Instradamento (Routing / Control Plane):** determinazione software globale del percorso ottimale end-to-end attraversato dai pacchetti da sorgente a destinazione.
  - Modello di servizio Internet: **Best-Effort** (nessuna garanzia formale su consegna, ordine, latenza o jitter).
- **Piano Dati (Data Plane):**
  - **Formato del Datagramma IPv4:** campi Versione, IHL (Internet Header Length), Type of Service (TOS/DiffServ), Datagram Length, Identificativo, Flag (DF - Don't Fragment, MF - More Fragments), Fragment Offset (in unità di 8 byte), Time to Live (TTL), Protocollo (es. 6 per TCP, 17 per UDP, 1 per ICMP), Checksum dell'header, Indirizzi IP Sorgente e Destinazione.
  - **Frammentazione e Riassemblaggio IP:** gestione di MTU (Maximum Transmission Unit) eterogenei lungo il percorso; suddivisione dei datagrammi nei router intermedi e riassemblaggio esclusivo presso l'host destinatario; Path MTU Discovery (PMTUD) tramite messaggi ICMP.
  - **Indirizzamento IPv4 e Subnetting:**
    - Indirizzi a 32 bit divisi in parte di Rete (Network ID) e parte di Host (Host ID).
    - Superamento delle classi storiche (A, B, C) mediante il CIDR (Classless Inter-Domain Routing): notazione con maschera di sottorete `/x`.
    - Regola di dimensionamento: con $h$ bit dedicati all'host, numero di indirizzi disponibili $= 2^h - 2$ (escludendo indirizzo di rete e broadcast).
    - Inoltro con Longest Prefix Match (LPM): selezione della riga di tabella di inoltro avente la maschera più specifica coincidente con l'IP destinazione.
    - Aggregazione delle rotte (Route Summarization): riduzione della dimensione delle tabelle di routing globali propagando un unico supernet ID.
    - Implementazione ad altissima velocità tramite TCAM (Ternary Content-Addressable Memory) e Priority Encoder.
  - **DHCP (Dynamic Host Configuration Protocol):**
    - Configurazione plug-and-play di IP, subnet mask, default gateway e server DNS.
    - Sequenza dei 4 messaggi DORA: `DHCP Discover` (broadcast), `DHCP Offer` (proposta IP), `DHCP Request` (conferma del client), `DHCP ACK` (assegnazione formale con lease time).
  - **NAT (Network Address Translation):**
    - Meccanismo di risparmio indirizzi: mappatura di un'intera rete privata (es. `192.168.x.x`, `10.x.x.x`) su un singolo IP pubblico mediante la tabella di traduzione NAT che riscrive le coppie (IP privato, Porta sorgente) $\leftrightarrow$ (IP pubblico, Nuova porta esterna).
    - Criticità architetturali (violazione della trasparenza end-to-end) e tecniche di NAT Traversal.
  - **Protocollo IPv6:**
    - Motivazione: esaurimento dello spazio di indirizzamento a 32 bit.
    - Struttura: indirizzi a 128 bit; header semplificato a lunghezza fissa di 40 byte; eliminazione del checksum di livello rete e dei campi di frammentazione intermedi (frammentazione solo alla sorgente); supporto a Flow Label e Next Header.
    - Strategie di transizione: Dual Stack e Tunneling di pacchetti IPv6 incapsulati in datagrammi IPv4 su router intermedi non aggiornati.
  - **Architettura interna dei Router:**
    - Porte di ingresso: terminazione fisica, elaborazione data link, consultazione locale della tabella di inoltro (decentralizzata).
    - Struttura di commutazione (Switching Fabric): a memoria condivisa (prima generazione), a bus condiviso (limitato dalla banda del bus), a matrice a barre incrociate (crossbar switch), e multistage (reti di Clos per alta scalabilità).
    - Porte di uscita: accodamento e schedulazione dei pacchetti.
    - Politiche di gestione code e scarto buffer: Tail Drop, Random Early Detection (RED), schedulazione a Priorità, Round Robin e Fair Queuing. Fenomeno del Bufferbloat.
- **Piano di Controllo (Control Plane):**
  - **Algoritmi di Instradamento:**
    - **Link-State (LS):** ogni nodo possiede la mappa completa della topologia di rete; scambio periodico di pacchetti Link State Advertisement (LSA); esecuzione locale dell'algoritmo di **Dijkstra** per calcolare l'albero dei cammini minimi da una radice; complessità $O(V^2)$ o $O(E \log V)$.
    - **Distance-Vector (DV):** algoritmo decentralizzato e asincrono basato sull'equazione di **Bellman-Ford**: $d_x(y) = \min_v \{ c(x,v) + d_v(y) \}$; i nodi scambiano vettori di stima di costo solo con i vicini diretti; problema del "conteggio all'infinito" in caso di guasto di link e contromisura dello *Split Horizon con Poisoned Reverse*.
  - **Routing Gerarchico nei Sistemi Autonomi (Autonomous Systems - AS):**
    - Ripartizione della rete globale in domini amministrativi distinti per scalabilità e autonomia gestionale.
    - **Routing Intra-AS (Interior Gateway Protocol - IGP):**
      - OSPF (Open Shortest Path First): protocollo Link-State aperto, autenticato, con supporto a metriche di costo multiple, partizione gerarchica in aree incentrate sull'Area 0 di backbone.
      - RIP (Routing Information Protocol): storico protocollo Distance-Vector basato sul conteggio degli hop (massimo 15).
    - **Routing Inter-AS (Exterior Gateway Protocol - EGP):**
      - BGP (Border Gateway Protocol - versione BGP-4): il collante dell'Internet globale; protocollo di tipo *Path-Vector*.
      - Sessioni eBGP (tra router di confine di AS adiacenti) e iBGP (propagazione interna all'AS).
      - Attributi fondamentali della rotta BGP: `AS-PATH` (sequenza di AS attraversati, usato per prevenire loop) e `NEXT-HOP` (indirizzo IP del router di confine del prossimo balzo).
      - Instradamento basato su policy commerciali (accordi di transito a pagamento vs accordi di peering gratuiti / customer-provider).
  - **Protocollo ICMP (Internet Control Message Protocol):**
    - Protocollo ausiliario per segnalazione di errori e diagnostica (incapsulato in IP).
    - Messaggi notevoli: Echo Request / Echo Reply (alla base del comando `ping`), Time-to-Live Exceeded in Transit (sfruttato dal comando `traceroute` per ricostruire l'elenco dei router intermedi), Destination Unreachable (con codici per porta, host o rete non raggiungibile).
  - **Software-Defined Networking (SDN):**
    - Rottura del modello monolitico tradizionale: disaccoppiamento fisico e logico tra Piano Dati (switch programmabili) e Piano di Controllo centralizzato (Controller SDN, es. ONOS, OpenDaylight).
    - Protocollo standard **OpenFlow**: astrazione "Match-Plus-Action" (analisi flessibile di campi multi-livello da Layer 2 a Layer 4, esecuzione di azioni come forward, drop, alter header, e aggiornamento contatori).
    - API Southbound (comunicazione controller-switch) e API Northbound (sviluppo di applicazioni di rete su policy globali).
  - **Gestione di rete:** architettura SNMP (Simple Network Management Protocol), base di dati MIB (Management Information Base), protocollo NETCONF e linguaggio di modellazione YANG.

### 5. Livello di Collegamento (Link Layer) e Reti Wireless/Mobili
- **Funzioni e servizi del livello di collegamento:**
  - Trasferimento di datagrammi tra nodi adiacenti attraverso un singolo canale di comunicazione.
  - Incapsulamento del datagramma in Frame con aggiunta di intestazione e delimitatori di trama.
  - Indirizzamento fisico: Indirizzo MAC (Media Access Control) a 48 bit (notazione esadecimale), univoco al mondo, assegnato alla scheda di rete (NIC) dal produttore (primi 24 bit OUI IEEE).
  - Rilevazione e correzione degli errori (EDC):
    - Controllo di parità a singolo bit (rileva errori dispari) e parità bidimensionale (rileva doppi errori e corregge singoli errori di bit).
    - Algoritmo di Checksum.
    - **Cyclic Redundancy Check (CRC):** divisione polinomiale binaria modulo 2 con polinomio generatore $G$ concordato; calcolo dei bit di ridondanza $R$ tali che il frame complessivo $D \cdot 2^r \oplus R$ sia divisibile esattamente per $G$.
- **Protocolli di Accesso Multiplo (MAC - Multiple Access Control):**
  - Gestione della contesa su canali broadcast condivisi per prevenire collisioni di segnale:
    1. **A suddivisione di canale:** TDMA (divisione temporale in slot), FDMA (bande di frequenza dedicate), CDMA (Code Division Multiple Access tramite sequenze di chipping ortogonali).
    2. **Ad accesso casuale (Random Access):**
       - Slotted ALOHA: nodi sincronizzati in slot temporali fissi; efficienza massima teorica pari a $\frac{1}{e} \approx 36.8\%$.
       - Pure ALOHA: trasmissione immediata asincrona; raddoppio della finestra vulnerabile; efficienza massima dimezzata a $\frac{1}{2e} \approx 18.4\%$.
       - CSMA (Carrier Sense Multiple Access): "ascolta prima di trasmettere" (carrier sensing) per evitare collisioni palesi; persistenza 1-persistente, non-persistente, p-persistente.
       - **CSMA/CD (Collision Detection per reti Ethernet cablate):** il nodo ascolta il canale anche *durante* la trasmissione; all'intercettazione di collisione interrompe l'invio, emette un segnale di disturbo (jamming signal) e applica l'algoritmo di **Binary Exponential Backoff** (attesa casuale scelta nell'intervallo $[0, 2^k - 1] \cdot 512\text{ bit times}$).
       - Vincolo fondamentale di CSMA/CD: il tempo di trasmissione del frame deve essere almeno il doppio del tempo di propagazione massimo ($T_{tx} \ge 2 \cdot T_{prop}$), imponendo una dimensione minima del pacchetto Ethernet (64 byte).
    3. **A turni (Taking-Turns):** Polling (un nodo master interroga a turno gli slave; overhead e single-point-of-failure) e Token Passing (un token circola lungo un anello logico; latenza ad anello scarico, perdita del gettone).
- **Reti Locali Cablate (Ethernet e Switch):**
  - Standard IEEE 802.3; formato del frame Ethernet (Preambolo a 8 byte con SFD, Indirizzo MAC Destinazione, Indirizzo MAC Sorgente, Type/EtherType, Dati di carico utile 46-1500 byte, FCS/CRC-32 a 4 byte).
  - **Protocollo ARP (Address Resolution Protocol):**
    - Risoluzione dinamica di indirizzi di livello 3 (IP) in indirizzi di livello 2 (MAC) sulla medesima sottorete broadcast.
    - Messaggio ARP Request inviato in broadcast all'indirizzo MAC `FF:FF:FF:FF:FF:FF`.
    - Messaggio ARP Reply inviato in unicast dal proprietario dell'IP.
    - Gestione della tabella ARP locale con scadenza a tempo e vulnerabilità di ARP Spoofing / Poisoning.
  - **Switch di Livello 2 (Link-Layer Switch):**
    - Apparati ad inoltro intelligente: filtraggio ed instradamento dei frame basato sugli indirizzi MAC di destinazione.
    - Meccanismo di **auto-apprendimento (Self-Learning):** popolamento automatico della tabella di commutazione registrando l'associazione `(Indirizzo MAC Sorgente, Porta d'ingresso, Timestamp)`.
    - Operazioni: Forwarding mirato (se la porta è nota e diversa da quella di arrivo), Filtering (se il destinatario risiede sullo stesso segmento), Flooding (inoltro su tutte le porte se il MAC non è presente in tabella).
    - Isolamento completo dei domini di collisione su ciascuna porta (full-duplex senza contesa CSMA/CD).
  - **Virtual LAN (VLAN):**
    - Segmentazione logica dei domini di broadcast all'interno della medesima infrastruttura fisica di switch.
    - VLAN basate su porta e VLAN multilivello inter-switch; collegamenti di Trunking con aggiunta dell'header standard **IEEE 802.1Q** (inserimento di 4 byte contenenti il campo VLAN ID a 12 bit tra MAC sorgente e Type).
- **Reti Wireless e Mobili:**
  - Particolarità del mezzo wireless: elevata attenuazione del segnale con la distanza ($1/d^2$ o superiore), riflessioni e propagazione su percorsi multipli (Multipath Fading), interferenze da altre sorgenti elettromagnetiche, rapporto segnale/rumore (SNR) e correlazione con il tasso di errore sui bit (BER).
  - Problema del nodo nascosto (due nodi fuori portata reciproca trasmettono simultaneamente allo stesso AP causando collisione) e del nodo esposto.
  - **Standard Wi-Fi (IEEE 802.11):**
    - Architettura: Basic Service Set (BSS) coordinato da un Access Point (AP) connesso alla rete di distribuzione (Distribution System).
    - Scansione delle frequenze: passiva (ascolto dei Beacon Frame periodici dell'AP) e attiva (invio di Probe Request da parte del client).
    - Protocollo di accesso al mezzo **CSMA/CA (Collision Avoidance):** impossibilità pratica di effettuare collision detection mentre si trasmette in radiofrequenza; utilizzo di spazi di inter-trama DIFS (Distributed IFS) e SIFS (Short IFS) con backoff casuale decrementato solo a canale rilevato libero.
    - Risoluzione del problema del terminale nascosto tramite scambio preliminare di trame corte di prenotazione: **RTS (Request to Send)** e **CTS (Clear to Send)** con impostazione del Network Allocation Vector (NAV) per silenziare i nodi terzi.
  - **Reti Personali (WPAN):** Bluetooth (IEEE 802.15.1), architettura Piconet (1 master e fino a 7 slave attivi), tecnica di trasmissione a salti di frequenza pseudo-casuali (FHSS).
  - **Reti Cellulari (4G/LTE e 5G):**
    - Architettura di rete: User Equipment (UE), stazione radio base eNodeB/gNodeB, e rete centrale Evolved Packet Core (EPC) con entità MME (Mobility Management Entity), HSS (Home Subscriber Server), Serving Gateway (S-GW) e Packet Data Network Gateway (P-GW).
    - Gestione della mobilità: Home Network vs Visited Network; instradamento indiretto tramite Home Agent vs instradamento diretto ottimizzato; procedure di Handoff (passaggio continuo di connessione tra celle adiacenti) e tunneling di trasporto tramite protocollo GTP.

---

## Linguaggi, Strumenti e Tecnologie

- **Analisi e Ispezione del Traffico di Rete:**
  - **Wireshark / tcpdump:** cattura pacchetti promiscuo, ricostruzione di stream TCP (Follow TCP Stream), analisi del Three-Way Handshake, ispezione frame Ethernet, pacchetti ARP, query DNS e transazioni HTTP.
- **Suite di Comandi e Diagnostica di Sistema (Linux/Unix/Windows):**
  - Verifica raggiungibilità e latenza: `ping` (ICMP Echo), `traceroute` / `tracert` (ricostruzione hop e tempi di transito con incremento progressivo del TTL).
  - Ispezione interfacce e tabelle locali: `ip a`, `ip route`, `ifconfig`, `netstat -tulpn`, `ss -tuln` (censimento socket aperte e porte in ascolto TCP/UDP).
  - Risoluzione dei nomi DNS: `dig`, `nslookup`, `host`.
  - Tabelle di livello 2: `arp -a`, `ip neigh`.
  - Trasferimento dati e testing: `curl`, `wget`, `nc` (netcat per apertura socket TCP/UDP arbitrarie).
- **Linguaggi e Programmazione di Rete:**
  - Linguaggio C con Socket API POSIX di Berkeley: primitive `socket()`, `bind()`, `listen()`, `accept()`, `connect()`, `send()` / `write()`, `recv()` / `read()`, gestione delle strutture `sockaddr_in` e conversione endianness con `htons()`, `ntohs()`, `htonl()`, `ntohl()`.

---

## Tipologia Esercizi e Prove d'Esame

La componente applicativa ed analitica della materia comprende verifiche quantitative e risoluzioni analitiche ricorrenti:
1. **Calcolo dei Ritardi e Throughput End-to-End:**
   - Calcolo del tempo complessivo di trasmissione di un file di dimensione assegnata attraverso più commutatori di pacchetto intermedi, considerando $T_{tx}$, $T_{prop}$, ritardi di accodamento e overhead delle intestazioni.
   - Individuazione analitica del collo di bottiglia (bottleneck link) in topologie miste con canali condivisi.
2. **Subnetting e Indirizzamento CIDR:**
   - Calcolo della maschera di sottorete `/x`, dell'indirizzo di rete e dell'indirizzo di broadcast per partizionare blocchi di indirizzi IP soddisfacendo requisiti di numero minimo di host per sottorete ($2^h - 2 \ge N$).
   - Aggregazione di rotte contigue e simulazione dell'inoltro basato su Longest Prefix Match (LPM) data una tabella di routing.
3. **Algoritmi di Instradamento Passo-Passo:**
   - Esecuzione manuale dell'algoritmo di Dijkstra: compilazione della tabella iterativa nodo per nodo con l'aggiornamento dei costi provvisori e definitivi e costruzione dell'albero dei cammini minimi.
   - Esecuzione dell'algoritmo Distance-Vector (Bellman-Ford): simulazione dei vettori di distanza inviati tra vicini e determinazione degli stati di convergenza o cicli di conteggio all'infinito.
4. **Codici di Rilevazione Errori:**
   - Calcolo del bit di parità bidimensionale su matrici di dati e correzione di singoli bit errati.
   - Calcolo della Checksum Internet a 16 bit con somma binaria e complemento a uno.
   - Divisione polinomiale binaria (XOR) per il calcolo del codice di ridondanza ciclica (CRC) dato un polinomio generatore $G$.
5. **Dinamica del Controllo della Congestione TCP Reno:**
   - Tracciamento della curva di crescita della finestra di congestione `cwnd` (Slow Start con raddoppio esponenziale, soglia `ssthresh`, Congestion Avoidance ad incremento lineare di 1 MSS per RTT).
   - Reazione ad eventi di perdita: azzeramento a 1 MSS su timeout vs dimezzamento $\text{ssthresh} = \text{cwnd}/2$ su ricezione di 3 ACK duplicati (Fast Retransmit / Fast Recovery).
   - Calcolo del throughput medio teorico: $\frac{3}{4} \frac{W_{max} \cdot \text{MSS}}{\text{RTT}}$ e del numero di RTT necessari per transitare da $W_{max}/2$ a $W_{max}$.
6. **Vincolo CSMA/CD su Reti ad Accesso Multiplo:**
   - Verifica del vincolo di collision detection $T_{trasm} \ge 2 \cdot T_{prop}$: calcolo della lunghezza massima della tratta di cavo o della dimensione minima del frame dati i parametri fisici del mezzo.
