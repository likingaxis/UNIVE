### Def di blockchain
- catena dì blocchi collegate tra loro con funzioni hash che hnano delle prioprietà, vedi sotto
### blockchain vs banking classico

- con il banking tradizionale una % dei nostri depositi vengono usati per investimenti della banca
- con la blockchain puoi fare self cast

### motivo della nascita delle blockchain
- rete peer-to-peer 
### Blockchain con funzioni hash
SHA 256
### Struttura di un blocco della blockchain
- ha anche l'Hash del blocco precedente
- ogni Hash di un blocco i+1 dipende dal precedente i, quindi è impossibile manometterli

### Funzionamento di bitcoin
- sfrutta una firma digitale
	- ovvero...
	- algoritmo di firma e algoritmo di verifica di firma
	- Algoritmo chiamato ECDSA
##### Quadro completo
- hash+firma digitale

- usare una funzione hash e basta sarebbe troppo semplice
	- abbiamo il proof of work
### Lavoro dei miner
- calcolare il sistema proof of work è elaborato
- per questo esistono i miner che ad ogni operazione ricevono dei blocchi nella blockchain
##### Una transazione è definita sicura dopo 6 blocchi
- per evitare che essa venga rimossa
### Smart contract
- anziche essere hostata su un server viene hostato nella rete p2p della blockchain

### Avalanche vs bitcoin
- avalanche usa dei validatori, che stakkano dei soldi, la loro gestione se scorretta comporta una perdita dello stake, oppure se buona un guadagno
	- Proof of stake
- Avalanche
	- blockchain di terza generazione
		- sfrutta proof of stake
	- permette di creare la tua blockchain
		- che differenza c'è tra una mia o una di qualcun'altro?
			- Puoi dare tue regole
			- un token nativo
			- parametri di rete dedicati
			- subnet indipendenti ma possono interagire con la primary network
	- Avalanche si regge in piedi grazie a 3 chain
		- e poi alle sotto chain create dai vari utenti, pure toyota
	- ha un sistema a gossip, per questo i validatori sono molto validi a trovare una soluzione
		- si creano sottogruppi di validatori che si interrogano tra loro
			- per dare in esito un consenso statistico
	- STEP PER FAR VALIDARE UN NUOVO BLOCCO
	- EVM Compatibile
	- uso degli smart contract
	- Ogni chain ha un suo scopo
		- X e P per il backend
		- C per la gestione degli smart contract
### Solidity
- facciamo prima un ripasso su cosa è uno smart contract
	- ...
	- immutabile
- Linguaggio usato per scrivere smart contract
	- il codice viene distribuito sulla block chain 
- useremo forge
	- per compilare e testare 
- fuji
	- rete di test della blockchain di Avalanche
- Le Blockchain usano solo interi
	- ma poi ci sono vari tipi di dato? ahahaha
- modificatori di visibilità
	- public
	- private
	- internal
	- external
- Modificatori di funzioni
	- pure
		- utility senza uso di stati
	- view
		- letture allo smart contract
	- payable
		- ricevi AVAX 
- Variabili speciali
	- msg.sender
	- msg.value
- Core wallet usa le seed phrase per rigenerare i propri wallet


### Lezione 2
#### DE-FI
#### Significato di decentralizzazione
- vivono sulla C-CHAIN
- DE-HEALTH
- GAMING
- IDENTITY
- SUPPLY CHAIN
#### CEX
- Azienda centralizzata
- che custodisce i fondi
- con singolo punto di fallimento
	- se non hai le chiavi non sono i tuoi soldi
#### DEX
- un esempio in avalanche è trader joe
	- non custodial
	- non costudisce i fondi
	- ha un codice pubblico
#### AUTOMATED MARKET MAKER(AMM)
- sostituisce quello che è l'order book
- il prezzo viene determinato da una formula
- chiunque può essere un liquidity provider
	- e questo ha diversi vantaggi
##### 4 tipi di formule
- constant product(CPMM)
	- $X*Y=K$ 
- constant sum (CSMM)
	- $X+Y=K$ 
- hybrid/stableswap
	- $K=A(X+Y)+(1-A)(X*Y)$ 
- pesi bilanciati
	- $X^{W_x} Y^{W_y}=K$ 
#### Rischi del liquidity provider
- permanent loss
#### Lending e borrowing
- mercato dei prestiti(money market)
	- chiunque può chiedere in prestito asset e chiunque può darli
	- Liquidazione di un prestito in caso alla volatilità dell'asset
##### ESEMPI
- BENQUI
	- letteralmente il money market visto prima
- AAVE
	- blocchi i tuoi asset rendendo più sicura la chain e in cambio ricevi degli asset virtuali
- TVL
	- bho
- DE-FI LLAMA
	- utile per monitorare le blockchain e quanto volume hanno bloccato
- STRATEGIE
	- bho


###### ULTERIORI TECNOLOGIE
- ZERO-PROOF KNOWLEDGE

- L1 LA TUA BLOCKCHAIN
	- puoi creare la tua blockchain con poco 
	- hai già validatori e tutto

#### Sistema di governance

