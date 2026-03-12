## LE PASSWORD
- La **password** è un _shared secret_ tra due parti: l’utente e il servizio.  
Serve per autenticare l’utente, cioè per dimostrare la sua identità al sistema.
- probabilità di azzeccare una pass
	- $\frac{1}{2^N}$  
- password overload
	- è il problema per cui gli utenti devono ricordare troppe password per troppi servizi diversi.
- entropia
	- L’**entropia** misura quanto una password è **imprevedibile**.  
		- Più entropia significa più casualità, quindi più difficoltà nel prevedere la password
- predicibilità di una password
	- **poor random number generators**.  
		- In pratica, gli esseri umani non sanno generare casualità vera
### WORDLIST 
- Una **wordlist** è un file contenente una lista di parole o password candidate che un attaccante può provare durante un attacco.
	- È usata soprattutto nei **dictionary attack**, dove non si provano tutte le combinazioni possibili, ma solo parole realistiche
##### Creare un custom wordlist
- Una **custom wordlist** è una wordlist costruita apposta per un bersaglio specifico.  
	- È spesso più efficace di un dizionario generico, perché tiene conto del contesto della vittima.
- `Crunch`
	- **Crunch** è un tool da riga di comando che crea wordlist basate su **combinazioni matematiche** di un certo insieme di caratteri.
		- lunghezza minima
		- lunghezza massima
		- charset
		- -o c.txt
			- salva in un certo file
```bash
crunch 8 8 0123456789 -o myDigitsWordlist.txt
```

- `CeWL`
	- **CeWL** (_Custom Word List generator_) è un tool scritto in Ruby che visita un sito web e raccoglie le parole trovate nelle sue pagine.
```bash
cewl https://www.target.xyz -w targetSpecificWordlist.txt
```

- `Username-Anarchy`
	- **Username-Anarchy** è un tool che genera possibili username a partire da nome e cognome, seguendo formati tipici aziendali
```bash
./username-anarchy [OPTIONS] Mario Rossi > TargetUsernamesList.txt
```

#### Attacchi alle password
- Gli attacchi alle password si dividono in due grandi categorie:
	- **online attack**
	- **offline attack**
- La differenza fondamentale è dove avviene il tentativo di verifica della password.

##### uso con Hydra
- **Hydra** è il tool principale mostrato per gli **attacchi online**.  
	- Invia direttamente richieste di login al servizio bersaglio, per esempio:
- SSH, web login, FTP, HTTP
- problemi: 
	- alta latenza
	- alta visibilità
	- rischio di essere bloccato fuori dalla macchina (lockout)
##### Attacchi offline
Negli **attacchi offline**, l’attaccante ottiene un database di password hashate e le prova **sulla propria macchina**
- limite: velocità della macchina, devo avere il database anche se hashato
- hashcat
	- **Hashcat** è un tool di cracking offline molto veloce, ottimizzato soprattutto per GPU.
- jhon the ripper
	- **John the Ripper** è uno dei password cracker più famosi e storici.
##### Come le password vengono criptate
Le password non vanno salvate in chiaro.  
- Il servizio usa una **one-way hash function**, cioè una funzione che:
- prende una stringa in input
- restituisce un digest
- è facile da calcolare in avanti
- è difficilissimo da invertire
- aggiunta del sale
	- Il **salt** è una stringa casuale unica aggiunta alla password prima di calcolare l’hash
		- $H(password || salt)$  
	- serve per prevenire situazioni in cui utenti hanno stessa password e quindi stesso hash
![[Pasted image 20260312161635.png]]
- Crackstation
	- **CrackStation** è l’esempio tipico di servizio/database che associa hash noti a password comuni.
![[Pasted image 20260312161739.png]]

#### Le Password su Linux
Su Linux le credenziali protette stanno in:
```bash
/etc/shadow
```
- con il seguente formato hashato
	- username
	- id dell’algoritmo
	- salt casuale
	- password digest(risultato in hash).
- Solo **root** può leggerlo
In forma semplificata:
```bash
$id$salt$digest
```

esiste anche
```bash
/etc/passwd
```
- ma a differenza di shadow contiene informazioni pubbliche sugli utenti
	- Al posto del campo password hashate compare di solito una `x`.
![[Pasted image 20260312162229.png|500]]

##### Come funziona il controllo password
Su Linux il controllo funziona così:
1. tu inserisci la password in chiaro
2. il sistema recupera da `/etc/shadow`:
    - **algoritmo di hashing**
    - **salt**
    - **digest** salvato
3. prende la password che hai scritto
4. la rihasha usando **lo stesso algoritmo** e **lo stesso salt**
5. confronta il digest appena calcolato con quello memorizzato
##### Cracking Hashes offensive side
-  i password cracking tools sono in sostanza dei **comparison engines** che generano candidati
	- 1️⃣ si prende una **password candidata**  
		- (esempio: `"password123"` dalla wordlist)
	- 2️⃣ si calcola il suo hash con **lo stesso algoritmo e salt**
	- 3️⃣ si confronta con l’hash rubato
	- 4️⃣ se coincidono → hai trovato la password
![[Pasted image 20260312164221.png]]

### CRACKING HASHES JHON THE RIPPER
- spiegazione migliore di jhon the ripper e cosa può fare davvero
###### Unshadow
- `unshadow` serve a combinare `/etc/passwd` e `/etc/shadow` in un file leggibile da John.
- `/etc/passwd` contiene dati utente
- `/etc/shadow` contiene gli hash
- John vuole un formato unificato
```bash
unshadow /etc/passwd /etc/shadow > hashesFile
```
#### SINGLE CRACK
La modalità **Single Crack** è il primo tentativo, il più veloce.
- Si basa sull’assunto che gli utenti siano prevedibili e usino il proprio nome o username nella password.
	- se utente si chiama admin allora si provano tutte le varianti di admin
		- admin123, nimda, admin2000 ecc...
```bash
john --single hashesFile
```
- John applica regole interne definite in `john.conf`, nella sezione:
	- `[List.Rules:Single]`
#### DICTIONARY
La modalità **Dictionary** usa una wordlist precompilata di password note.
- `rockyou.txt` come dizionario
	- uso -w per specificare il path della wordlist
	- Se la password non viene trovata direttamente, John può applicare **regole** per generare varianti della wordlist definite in `[List.Rules:Wordlist]`
```bash
john -w=baseWordlist.txt --rules=All --stdout > newWordlist.txt
```
- prende la wordlist base
- applica tutte le regole
- stampa in txt
#### INCREMENTAL
La modalità **Incremental** è il brute force vero e proprio.
```bash
john --incremental hashesFile
```

#### CUSTOM
La modalità **Custom** permette all’utente di definire regole proprie per modificare una wordlist.
```bash
john --wordlist=baseWordlist.txt --config=myRules.conf --rules=MyRuleName --stdout > newWordlist.txt
```
- `--wordlist=...` = wordlist di partenza
- `--config=...` = file con le regole personalizzate
- `--rules=MyRuleName` = nome della regola da usare
![[Pasted image 20260312164309.png|400]]
- `c` = rende maiuscola la prima lettera
- `A0` = inserisce qualcosa all’inizio
- `Az` = aggiunge qualcosa alla fine
- `[xyz]` = prova uno dei caratteri in quella posizione
- `@sXY` = sostituisce X con Y
ESEMPIO
`password` con `csa@Az"1[!?]"so0ss5`  sarà una di queste due
- `P@55w0rd1!`
- `P@55w0rd1?`
### CRACKING HASHES WITH HASHCAT


|Comando / Opzione|Significato|
|---|---|
|`hashcat`|avvia il tool|
|`-m`|specifica il tipo di hash|
|`-a`|specifica la modalità di attacco|
|`-o cracked.txt`|file di output delle password crackate|
|`hashes.txt`|file contenente gli hash bersaglio|
|`--stdout`|stampa i candidati senza effettuare cracking reale|
ESEMPIO 
```bash
hashcat -m 0 -a 0 -o cracked.txt hashes.txt /usr/share/wordlists/rockyou.txt
```

|Parte|Spiegazione|
|---|---|
|`-m 0`|indica il tipo di hash; `0` corrisponde a MD5|
|`-a 0`|modalità straight/dictionary|
|`-o cracked.txt`|salva le password trovate|
|`hashes.txt`|file con gli hash target|
|`rockyou.txt`|wordlist usata per il dictionary attack|

```bash
hashcat -a 6 example.dict '?d?d?d?d' --stdout
```
Prende ogni parola della wordlist e le aggiunge 4 cifre finali.

| Parte          | Spiegazione                                                           |
| -------------- | --------------------------------------------------------------------- |
| `-a 6`         | modalità ibrida wordlist + mask                                       |
| `example.dict` | wordlist di partenza                                                  |
| `'?d?d?d?d'`   | maschera che indica **4 cifre numeriche** da aggiungere alla password |
| `--stdout`     | stampa i candidati                                                    |

```bash
hashcat -m 0 -a 1 -j '$_' dict1.txt dict2.txt --stdout
```
Combina parole provenienti da due dizionari, eventualmente applicando trasformazioni.

|Parte|Spiegazione|
|---|---|
|`-m 0`|tipo hash MD5|
|`-a 1`|modalità combinazione|
|`-j '$_'`|applica una regola: aggiunge `_`|
|`dict1.txt dict2.txt`|due dizionari da combinare|
|`--stdout`|mostra i candidati|

### CRACKING ARCHIVE PASSWORDS
Le password degli archivi compressi possono essere attaccate offline.
##### fcrackzip
È un tool usato per crackare password di archivi ZIP.
- Prova password candidate contro l’archivio finché ne trova una valida.
```bash
fcrackzip -u -b -v -D -p myWordlist.txt target.zip
```
Si può prima estrarre l’hash dell’archivio con strumenti del tipo:
`zip2john target.zip > hashList.txt`
Poi usare:
```bash
john --wordlist=myWordlist.txt hashList.txt
```
### HYDRA

```bash
hydra -l <user name> -p <password> <protocol://hostname>
hydra -L <user list> -P <password list> <protocol://hostname>
```
- `-l` = username singolo
- `-p` = password singola
- `-L` = lista di username
- `-P` = lista di password

ESEMPIO
```bash
hydra -l Alice -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.15
```
- Prova tutte le password di `rockyou.txt` per l’utente `Alice` sul servizio SSH della macchina indicata.

## WINDOWS
##### Windows- active directory
**Active Directory (AD)** è il servizio centralizzato di Microsoft per gestire:
- utenti
- gruppi
- computer
- autenticazione, autorizzazioni, policy di sicurezza
In una rete Windows aziendale, invece di gestire ogni macchina separatamente, si usa Active Directory come archivio centrale delle identità.
- Il **Domain Controller** autentica e autorizza utenti e computer.

In un ambiente AD, un hash molto privilegiato può aprire l’accesso a un’intera organizzazione.
### LA WINDOWS AUTHENTICATION
L’autenticazione Windows va distinta in due parti:
- **authentication protocol**
	- È il modo in cui le credenziali vengono usate e trasmesse durante il login in rete.
- **password hash**
	- È il formato in cui la password è salvata “a riposo”.

Bisogna distinguere **come la password è memorizzata** da **come viene usata sulla rete**.
### HASHING 
- prima era l'algoritmo LM(**LAN Manager Hash**) ma è vecchietto
	- è comunque bene saperlo perché tante volte aziende non hanno sistemi aggiornati
- più recente NT hash
	- L’**NT Hash** è il formato standard moderno per memorizzare la password a riposo in Windows.
	- NTLM è il protocollo di autenticazione, verrà spiegato bene dopo
		- ma viene usato anche per dire NT hash

##### DOVE SI SALVANO LE PASSWORD HASHATE
- in *SAM*
	- È il database locale Windows che memorizza gli hash degli account locali di una macchina standalone
		- non appartenente a un dominio active directory(aziende o cose)
- in *NTDS.dit* 
	- se hai una active directory
	- è il database principale di Active Directory sul Domain Controller

- attacco PTH
	- Il **Pass the Hash** è una tecnica in cui l’attaccante usa direttamente l’hash NT per autenticarsi, senza conoscere la password in chiaro.
	- sfruttando SSO
		- L’utente si autentica una sola volta e poi accede a più risorse senza reinserire continuamente la password.
##### Dumping tools per windows
- prima di spiegare questi dumping tools vorrei dare una definizione di post exploitation
	- La **post exploitation** è la fase successiva alla compromissione iniziale del sistema
		- I dumping tools appartengono proprio a questa fase
			- infatti dumping=estrarre dati sensibili dalla memoria o dai database di un sistema compromesso

- **Mimikatz** è uno dei tool di post exploitation più famosi e potenti in ambiente Windows
	- estrae: hash, credenziali e informazioni di autenticazione
dumping al SAM con Mimikatz
```text
mimikatz # lsadump::sam SystemBkup.hiv SamBkup.hiv
```
- `hiv` sono i file hive, file che contengono parti del registro di sistema
#### SPIEGAZIONE APPROFONDITA DI NET NTLM protocol
NTLMv1 è un protocollo di autenticazione **challenge-response**.
il server non chiede al client di inviare la password in chiaro.  
Invece:
1. il server manda una **challenge**, un valore casuale 
2. il client calcola una **response** prendendo la password effettiva, dividendola in blocchi, ognuno di quei blocchi viene cifrato con la challenge
3. il server verifica la response per vedere se corrisponde alla password
L’hash della password non “cambia” ogni volta.  
Quello che cambia a ogni autenticazione è la **challenge**, e quindi cambia la **response**.
- esiste una versione 2
	- usa MD5 al posto di MD4 e migliora in generale le challenge ecc...
La vulnerabilità concettuale resta: 
- se l’attaccante riesce a farsi inviare una response valida, può catturarla e provare a crackarla offline o usarla in altri attacchi.
#### protocollo v2 funzionamento in step
![[Pasted image 20260312172524.png]]
- 1. Il server manda al client una **Server Challenge (SC)**, cioè una stringa casuale di 8 byte.
- 2. Il client genera una **Client Challenge (CC)**, anch’essa casuale, di 8 byte.
- 3. costruisce una struttura con contesto e timestamp
- 4. usa il proprio NT Hash per derivare una response
La password in chiaro non viaggia, ma la **response** sì.  
E quella response può essere catturata da un attaccante in certe condizioni.

#### ATTACCO di poisoning con spiderlabs/responder
- È un tool che si finge il servizio che la vittima sta cercando, così la induce ad autenticarsi verso l’attaccante
- utilizzato anche in attacchi a NTLMv2
- passaggi da sapere:
	- La vittima prova a connettersi a una risorsa per esempio sbaglia un nome di rete o cerca una macchina inesistente
	- Il DNS fallisce La risoluzione standard del nome non riesce
	- La macchina della vittima manda richieste in broadcast 
		- Usa protocolli legacy come **LLMNR** o **NBT-NS** e chiede alla rete locale: “chi conosce questa risorsa?”
	- Responder risponde fingendosi il server 
		- L’attaccante intercetta la richiesta e dice in sostanza: “sono io quel server” 
		- Questa è la fase di **poisoning/spoofing**.
	- La vittima crede di aver trovato il server corretto 
		- A questo punto avvia l’handshake NTLMv2 verso la macchina dell’attaccante.
	- in questo modo l'attaccante riceve la challenge response