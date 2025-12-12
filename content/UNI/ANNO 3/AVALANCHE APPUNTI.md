## Introduzione
Appunti presi durante le due lezioni del workshop di Avalanche
- studente: Luca Gugliotta 
- matricola: 0342634
### Definizione di blockchain
- È una catena di blocchi collegati tra loro tramite funzioni hash.
- questa catena di blocchi insieme forma un registro *condiviso, immutabile e decentralizzato*
- perché è immutabile?
	- modificare un blocco comporterebbe una alterazione del suo hash e di conseguenza si spezzerebbe la catena che tiene tutti i blocchi uniti
### banking tradizionale vs blockchain

- Con il banking tradizionale noi ci stiamo fidando completamente delle istituzioni che le controllano
	- allo stesso tempo una parte dei nostri depositi viene usata per investimenti da parte delle banche
- Come detto in precedenza invece le blockchain sono decentralizzate e si basano su una verifica crittografica
	- inoltre puoi fare *self-custody*, quindi puoi avere pieno controllo dei tuoi fondi senza affidarti a terze parti

### motivo della nascita delle blockchain
- Permettere interazioni senza intermediari e garantire indipendenza dalle banche
- indipendenza presente grazie a un utilizzo di reti *peer-to-peer* per validare collettivamente le transazioni
### Blockchain con funzioni hash
Prima di spiegare cosa c'entrano le Blockchain con le funzioni hash, spieghiamo prima cosa è una funzione hash(in modo molto semplice)
- Una funzione hash è una funzione che prende un input di qualsiasi lunghezza e produce un output di lunghezza fissa che distingue quel determinato input fornito facendolo sembrare una sequenza di valori casuali
	- il fatto che si abbia una lunghezza fissa come output ci consente di avere una maggior facilità di gestione di confronto dei dati memorizzati

Bitcoin usa SHA-256 che produce un hash di lunghezza fissa a 256 bit
#### Diverse proprietà delle funzioni hash
- *Pre-image resistance*
	- Dato un hash è computazionalmente impossibile risalire all'input originale
- *Second pre-image resistance*
	- Dato un messaggio e il suo hash
		- è impossibile trovare un altro messaggio diverso con stesso hash
- *Collision resistance*
	- È quasi impossibile trovare due input diversi che producono lo stesso hash
- *Effetto valanga*
	- un piccolo cambiamento nell'input 
		- produce un hash completamente differente

### Struttura di un  singolo blocco della blockchain
- Un singolo blocco è formato da:
	- dati(dettagli delle transazioni)
	- timestamp
	- hash del blocco
	- hash del blocco precedente(utile per mantenere immutabilità)
### Funzionamento di bitcoin
- sfrutta una firma digitale per autenticare chi invia le transazioni
	- utilizza
		- algoritmo di firma 
		- algoritmo di verifica di firma
	- L'algoritmo usato da Bitcoin è chiamato ECDSA
		- garantisce altissima sicurezza crittografica
##### Quadro completo
- $hash + firma digitale=integrità + autenticità$

- usare una funzione hash non è sufficiente, sarebbe troppo semplice da calcolare
	- abbiamo il proof of work

#### Proof of Work
- i miner devono trovare un valore chiamato nonce tale che
	- l'hash del blocco inizi con n zeri
- l'hash è imprevedibile quindi per trovarlo sono necessari milioni di tentativi
### Lavoro dei miner
- calcolare il sistema proof of work è elaborato
- per questo esistono i miner che competono per creare nuovi blocchi risolvendo il proof of work er in cambio ricevono una ricompensa
##### Una transazione è definita sicura dopo 6 blocchi
### Smart contract
- programmi che vivono *on-chain*
- anziché essere hostati su un server vengono hostati nella rete p2p della blockchain

### Avalanche vs bitcoin
- avalanche usa dei validatori, che mettono in stake AVAX, 
	- la loro gestione se scorretta comporta una perdita dello stake
	- se buona un guadagno
	- Proof of stake
- Avalanche
	- blockchain di terza generazione
		- sfrutta proof of stake
		- è *gossip-based*
			- si creano sottogruppi di validatori che si interrogano tra loro
			- per dare in esito un consenso statistico
	- permette di creare la tua blockchain
		- Puoi dare tue regole
		- un token nativo
		- parametri di rete dedicati
		- interoperabilità con la Primary Network
	- Avalanche si regge in piedi grazie a 3 chain
		- X-Chain
			- gestione o scambio asset
		- P-Chain
			- validatori e subnet
		- C-Chain
			- smart contract EVM compatibili
### Solidity
- facciamo prima un ripasso su cosa è uno smart contract
	- è un codice immutabile una volta che viene deployato
- Linguaggio usato per scrivere smart contract si chiama proprio solidity
	- ha una sintassi simile a JavaScript
	- il codice viene distribuito sulla blockchain 
- useremo *Foundry*
	- forge per compilare e testare il codice
	- cast per interagire con il terminale
	- anvil per creare la blockchain locale
- *fuji*
	- rete di test della blockchain di Avalanche
- Le Blockchain usano *solo interi*
	- ma con diverse varianti
- *modificatori di visibilità*
	- public
	- private
	- internal
	- external
- *Modificatori di funzione*
	- **pure**
		- utility senza uso di stati
	- **view**
		- letture allo smart contract
	- **payable**
		- ricezione di AVAX 
- Variabili speciali
	- `msg.sender`
	- `msg.value`
	- `block.timestamp`
- Core wallet usa le seed phrase per rigenerare i propri wallet
## Lezione 2
#### DE-FI
- insieme di servizi finanziari costruiti sulla block-chain
- La DeFi vive sulla C-chain grazie agli smart contract
#### Settori di utilizzo
- DE-HEALTH
	- gestione dati sanitari senza un ente centrale
- GAMING
	- asset di gioco realmente possedibili da utenti
- IDENTITY
	- identità digitali
- SUPPLY CHAIN
	- tracciabilità
#### CEX
- exchange centralizzato
- Rappresenta una azienda centralizzata
- che custodisce i fondi
- gestisce scambi tramite order book
- con singolo punto di fallimento
	- se non hai le chiavi non sono i tuoi soldi
#### DEX
- exchanger decentralizzato
- un esempio in avalanche è trader joe
	- non custodial
		- non custodisce i fondi
	- non ha un order book
	- ha un codice pubblico sempre di tipo smart contract
#### AUTOMATED MARKET MAKER(AMM)
- sostituiscono l'order book attraverso 
	- formule matematiche
	- pool di liquidità
- il prezzo viene determinato da una formula 
- chiunque può essere un liquidity provider
	- e questo ha diversi vantaggi in termini di commissioni
##### 4 tipi di formule
- constant product(CPMM)
	- $X*Y=K$ 
- constant sum (CSMM)
	- $X+Y=K$ 
- hybrid/stableswap
	- $K=A(X+Y)+(1-A)(X*Y)$ 
- pesi bilanciati
	- $X^{W_x} * Y^{W_y}=K$ 
#### Lending e borrowing
- mercato dei prestiti(money market)
	- chiunque può chiedere in prestito asset e chiunque può darli
		- per chiedere prestiti devi fornire un collaterale
		- se il collaterale scende sotto una certa soglia il prestito viene liquidato automaticamente
##### ESEMPI di money market
- BENQUI
	- letteralmente il money market visto prima
- AAVE
	- blocchi i tuoi asset come collaterale per prestare o prendere in prestito asset 

##### Metriche e strumenti
- TVL
	- misura il capitale bloccato in DEX, money market o altri protocolli DeFi
- DE-FI LLAMA
	- utile per monitorare le blockchain e quanto volume hanno bloccato

###### ULTERIORI TECNOLOGIE
- ZERO-PROOF KNOWLEDGE
	- dimostrano che qualcosa è vero senza rivelare informazioni
		- es: dimostri di avere un certo numero di fondi sufficienti senza dire quanti
- Off-chain/On-chain
	- On-chain sono i dati scritti sulla blockchain sicuri ma
		- lenti e costosi
	- Off-chain sono operazioni fuori dalla blockchain

- L1 LA TUA BLOCKCHAIN
	- con avalanche subnets puoi creare una L1 personalizzata
	- puoi creare la tua blockchain con poco 
	- hai già validatori e tutto

#### Sistema di governance
- definisce chi può prendere decisioni e come vengono aggiornate le regole
- nella DeFi questa cosa è decentralizzata quindi si basa su:
	- token di governance
	- proposte
	- sistemi di voto on-chain
- questo consente di prendere decisioni su tassi di interesse, parametri di rischio come liquidazioni o aggiornamenti degli smart contract
