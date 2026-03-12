Perfetto, ora con il PDF posso riscriverli **aderendo davvero alla lezione** e chiarendo i punti che nel file erano solo accennati.  
Ti preparo una versione **più ordinata, più spiegata e più fedele alle slide**, senza saltare gli argomenti che hai elencato.

---

# LE PASSWORD

## Definizione

La **password** è un _shared secret_ tra due parti: l’utente e il servizio.  
Serve per autenticare l’utente, cioè per dimostrare la sua identità al sistema.

Nel modello più semplice:

1. l’utente invia **id + password**
    
2. il servizio controlla se l’utente esiste
    
3. confronta la password ricevuta con quella associata all’utente
    
4. se coincidono, concede l’accesso
    

Quindi la password è un meccanismo di autenticazione basato su qualcosa che **l’utente conosce**.

---

## Problema principale delle password

Se qualcuno conosce la password di Alice, può autenticarsi **come Alice**.  
Questo crea due responsabilità:

- lato **utente**, la password deve essere difficile da indovinare
    
- lato **servizio**, la password deve essere salvata in modo sicuro
    

Se il database viene compromesso e le password sono memorizzate male, l’attaccante può rubarle e impersonare gli utenti.

---

## Probabilità di azzeccare una password

Nelle slide il concetto viene introdotto così:  
la probabilità di indovinare una stringa casuale di lunghezza (N) è teoricamente:

[  
\frac{1}{2^N}  
]

Questa formula esprime l’idea che, se una stringa è davvero casuale, la probabilità di indovinarla è molto bassa.

Però il punto della lezione è che **le password reali non sono stringhe casuali**.  
Gli utenti scelgono password:

- comuni
    
- brevi
    
- riutilizzate
    
- legate a parole note
    
- costruite con pattern umani
    

Quindi la probabilità reale di indovinare una password è spesso **molto più alta** di quella teorica.

---

## Password deboli: perché lo sono

Le slide insistono sul fatto che le password sono spesso:

- **weak**
    
- **reused**
    
- **common**
    
- con **low entropy**
    
- collegate a **common words**
    

Questo significa che il problema non è solo matematico: è soprattutto **umano**.

---

## Password overload

Il **password overload** è il problema per cui gli utenti devono ricordare troppe password per troppi servizi diversi.

Per semplificarsi la vita, molte persone:

- riutilizzano la stessa password su più siti
    
- fanno piccole variazioni della stessa password
    
- scelgono password facili da ricordare
    

Questo apre la strada al **cross-site breach**:  
un attaccante compromette un sito “meno importante”, ruba le credenziali e poi prova le stesse password su servizi più seri, come banca, email o social.

Quindi il problema non è solo la password singola, ma il suo **riuso**.

---

## Restricted charset

Un altro problema evidenziato nelle slide è il **restricted charset**.

In teoria, una password di 8 byte potrebbe usare tutti i 256 possibili valori per ogni byte.  
In quel caso, lo spazio delle combinazioni sarebbe enorme:

[  
256^8  
]

e il brute force sarebbe molto costoso.

Ma nella pratica gli utenti scelgono quasi sempre caratteri visibili sulla tastiera, per esempio:

- lettere minuscole
    
- numeri
    
- pochi simboli
    

Quindi lo spazio di ricerca si restringe enormemente.  
Ad esempio, se una password di 8 caratteri usa solo **lettere minuscole + numeri**, il numero di combinazioni diventa:

[  
36^8  
]

e un brute force moderno può diventare molto più realistico.

### Idea importante

Ridurre l’insieme dei caratteri usati significa **ridurre la search space**, cioè l’insieme di password che l’attaccante deve provare.

---

## Entropia

L’**entropia** misura quanto una password è **imprevedibile**.  
Più entropia significa più casualità, quindi più difficoltà nel prevedere la password.

Nelle slide viene citata la **Shannon entropy**, cioè una misura della quantità di informazione contenuta in una stringa.

### Idea chiave

Una sequenza davvero casuale ha alta entropia.  
Una password creata da un essere umano, invece, tende ad avere bassa entropia perché segue schemi linguistici, culturali o personali.

---

## Bassa entropia

Una password ha **bassa entropia** quando è facile da prevedere perché deriva da scelte “naturali” per l’uomo, per esempio:

- parole del dizionario
    
- nomi
    
- date
    
- hobby
    
- nomi di animali
    
- pattern facili da ricordare
    

Le slide fanno notare che un byte casuale porta teoricamente 8 bit di entropia, ma il testo inglese normale contiene molta meno informazione per byte, perché è pieno di strutture prevedibili.

Quindi una password “memorizzabile” da un umano è spesso molto meno casuale di quanto sembri.

---

## Formula e definizione dell’entropia

Per una password scelta uniformemente da uno spazio di (S) possibilità, l’entropia può essere espressa come:

[  
H = \log_2(S)  
]

Se la password ha lunghezza (L) e ogni posizione può assumere (N) simboli, allora:

[  
H = L \cdot \log_2(N)  
]

Questa formula però funziona bene solo se la scelta dei caratteri è davvero casuale.  
Nelle password umane questo spesso **non vale**, perché l’utente non sceglie in modo uniforme, ma privilegia combinazioni prevedibili.

---

## Predicibilità di una password

Le slide sottolineano che gli utenti sono **poor random number generators**.  
In pratica, gli esseri umani non sanno generare casualità vera.

Quando scelgono una password, usano regole “umane”, per esempio:

- nome del cane
    
- hobby
    
- data significativa
    
- parola comune + numeri
    
- sostituzioni semplici tipo `a -> @`, `o -> 0`
    

Questa **predicibilità** rende gli attacchi molto più efficaci.  
Spesso non serve nemmeno un brute force puro: bastano dizionari, OSINT, SOCMINT o informazioni personali sull’utente.

---

# WORDLIST

## Definizione e utilizzo

Una **wordlist** è un file contenente una lista di parole o password candidate che un attaccante può provare durante un attacco.

È usata soprattutto nei **dictionary attack**, dove non si provano tutte le combinazioni possibili, ma solo parole realistiche, per esempio:

- password già usate in leak precedenti
    
- parole comuni
    
- nomi propri
    
- stringhe legate al target
    

Il vantaggio è che una wordlist sfrutta proprio il fatto che le persone scelgono password **prevedibili**.

Le slide citano anche una fonte pubblica famosa:

- **SecLists**
    

che raccoglie wordlist aggiornate e molto usate in ambito security testing.

---

# CREARE UNA CUSTOM WORDLIST

Una **custom wordlist** è una wordlist costruita apposta per un bersaglio specifico.  
È spesso più efficace di un dizionario generico, perché tiene conto del contesto della vittima.

---

## Crunch

**Crunch** è un tool da riga di comando che crea wordlist basate su **combinazioni matematiche** di un certo insieme di caratteri.

Tu specifichi:

- lunghezza minima
    
- lunghezza massima
    
- charset da usare
    

### Quando è utile

È utile quando conosci la **struttura della password**.  
Per esempio, se sai che la password è fatta da 8 cifre numeriche, puoi generare tutte le combinazioni possibili di 8 numeri.

### Esempio della slide 21

```bash
crunch 8 8 0123456789 -o myDigitsWordlist.txt
```

### Spiegazione del comando

- `8 8` = lunghezza minima e massima, quindi genera solo stringhe di 8 caratteri
    
- `0123456789` = charset usato
    
- `-o myDigitsWordlist.txt` = salva il risultato nel file indicato
    

### Cosa produce

Genera tutte le possibili stringhe di 8 cifre, da `00000000` fino a `99999999`.

### Idea chiave

Crunch è ottimo per un attacco **esaustivo ma strutturato**, quando sai già “come è fatta” la password.

---

## CeWL

**CeWL** (_Custom Word List generator_) è un tool scritto in Ruby che visita un sito web e raccoglie le parole trovate nelle sue pagine.

### Quando è utile

È utile per costruire una wordlist **context-aware**, cioè legata al contesto del target.

Se stai prendendo di mira un’azienda, il suo sito può contenere:

- nomi di prodotti
    
- nomi di dipendenti
    
- gergo aziendale
    
- codici interni
    
- slogan
    

Tutte parole che potrebbero finire dentro password reali.

### Esempio della slide 22

```bash
cewl https://www.target.xyz -w targetSpecificWordlist.txt
```

### Spiegazione del comando

- `cewl` = avvia il tool
    
- `https://www.target.xyz` = sito da cui estrarre le parole
    
- `-w targetSpecificWordlist.txt` = salva la wordlist nel file specificato
    

### Idea chiave

CeWL non genera combinazioni matematiche come Crunch:  
estrae parole **realmente presenti** nel contesto del bersaglio.

---

## Username-Anarchy

**Username-Anarchy** è un tool che genera possibili username a partire da nome e cognome, seguendo formati tipici aziendali.

### Quando è utile

È utile quando hai una lista di dipendenti ma **non conosci gli username** reali.

Molte aziende usano convenzioni prevedibili, ad esempio:

- nome.cognome
    
- iniziale + cognome
    
- cognome + iniziale
    
- nome abbreviato
    

### Esempio della slide 23

```bash
./username-anarchy [OPTIONS] Mario Rossi > TargetUsernamesList.txt
```

### Spiegazione del comando

- il tool prende in input `Mario Rossi`
    
- genera molti formati possibili
    
- redirige l’output in `TargetUsernamesList.txt`
    

### Esempi di output possibili

- `m.rossi`
    
- `marior`
    
- `rossim`
    
- `mrossi`
    
- `mario.rossi`
    

### Idea chiave

Questo tool non genera password, ma **username plausibili**, molto utili negli attacchi online.

---

# ATTACCHI ALLE PASSWORD

## Introduzione e spiegazione

Gli attacchi alle password si dividono in due grandi categorie:

- **online attack**
    
- **offline attack**
    

La differenza fondamentale è dove avviene il tentativo di verifica della password.

---

## Uso con Hydra

### Cos’è Hydra

**Hydra** è il tool principale mostrato per gli **attacchi online**.  
Invia direttamente richieste di login al servizio bersaglio, per esempio:

- SSH
    
- web login
    
- FTP
    
- HTTP
    
- altri protocolli autenticati
    

### Idea del tool

Hydra automatizza il tentativo di molte combinazioni di username e password contro un servizio reale.

---

## Problemi degli attacchi online

### Alta latenza

Ogni tentativo deve attraversare la rete e aspettare la risposta del server.  
La velocità dell’attacco è quindi limitata da:

- rete
    
- latenza
    
- tempi del servizio
    

### Alta visibilità

Ogni tentativo lascia tracce nei log.  
Questo rende l’attacco facilmente individuabile da:

- IDS
    
- sistemi di monitoraggio
    
- amministratori
    

### Rischio di lockout

Molti sistemi bloccano l’account dopo pochi tentativi falliti.  
Di conseguenza un brute force online può interrompersi quasi subito.

---

# ATTACCHI OFFLINE

Negli **attacchi offline**, l’attaccante ottiene un database di password hashate e le prova **sulla propria macchina**.

## Vantaggi

- velocità molto più alta
    
- nessun traffico verso il sistema bersaglio
    
- nessuna visibilità immediata lato server
    
- nessun lockout online
    

## Prerequisito

Serve però una compromissione iniziale, per esempio:

- SQL injection
    
- data breach
    
- accesso al filesystem
    
- dump di memoria
    

Solo così si ottengono gli hash.

---

## Hashcat

**Hashcat** è un tool di cracking offline molto veloce, ottimizzato soprattutto per GPU.

### Caratteristiche

- enorme velocità
    
- supporto a molti algoritmi
    
- varie modalità di attacco
    
- molto usato per cracking massivo
    

### Idea chiave

Hashcat è particolarmente potente quando si hanno:

- tanti hash
    
- password deboli
    
- hardware potente
    

---

## John the Ripper

**John the Ripper** è uno dei password cracker più famosi e storici.

### Caratteristiche

- modalità dictionary
    
- modalità brute force
    
- supporto a molti algoritmi
    
- multi-platform
    
- nelle versioni moderne può anche sfruttare GPU
    

### Idea chiave

John è molto flessibile e viene usato spesso in contesti Unix/Linux, ma non solo.

---

## Limite degli attacchi offline

Anche se gli attacchi offline sono forti, hanno un limite:  
la velocità dipende dalla macchina dell’attaccante.

Quindi contano:

- CPU/GPU disponibili
    
- algoritmo di hashing
    
- presenza del salt
    
- robustezza della password
    

Inoltre serve comunque il **database degli hash**, cioè bisogna aver prima ottenuto i dati.

---

# COME LE PASSWORD VENGONO PROTETTE

## Hash function e funzione one-way

Le password non vanno salvate in chiaro.  
Il servizio usa una **one-way hash function**, cioè una funzione che:

- prende una stringa in input
    
- restituisce un digest
    
- è facile da calcolare in avanti
    
- è difficilissimo da invertire
    

### Proprietà chiave dalle slide

- dato l’hash, non si deve poter risalire all’input
    
- non si devono trovare facilmente due input diversi con lo stesso output
    

---

## Esempio della banca con Alice

Quando Alice inserisce la sua password:

1. il server non salva né confronta la password in chiaro
    
2. prende la password inserita
    
3. la passa nella stessa funzione di hash
    
4. ottiene un digest temporaneo
    
5. confronta quel digest con quello salvato nel database
    

Se i due digest coincidono, Alice entra.

### Idea chiave

Il sistema non ha bisogno di “vedere” la password originale una volta registrata:  
gli basta verificarne matematicamente l’impronta.

---

# AGGIUNTA DEL SALE

## Cos’è il salt

Il **salt** è una stringa casuale unica aggiunta alla password prima di calcolare l’hash.

Nelle slide compare come:

[  
H(password || salt)  
]

dove `||` indica concatenazione.

---

## Perché serve il salt

Se due utenti hanno la stessa password e non si usa il salt, il loro hash sarà identico.  
Questo crea un problema, perché un attaccante può:

- accorgersi che più utenti condividono la stessa password
    
- usare tabelle pre-calcolate o confronti rapidi
    

Con il salt, invece, la stessa password genera hash diversi per utenti diversi.

---

## Spiegazione della slide 29

La slide 29 mostra il caso in cui **user1** e **user2** hanno la stessa password ma salt diversi.

Quindi:

- stessa password
    
- salt diversi
    
- hash finali diversi
    

### Perché è importante

L’attaccante non può più crackare “in blocco” tutti gli utenti con una sola operazione.  
Deve trattare ogni hash **uno per uno**, perché ogni salt modifica il risultato finale.

### Conseguenza pratica

Il salt trasforma una violazione massiva in un cracking molto più lento e costoso, account per account.

---

## Reverse hash e hash comuni

Le slide spiegano anche che, senza protezioni aggiuntive, password comuni come:

- `admin`
    
- `123456`
    
- `root`
    

producono hash prevedibili e riconoscibili.

Un attaccante può confrontare gli hash rubati con liste di hash già noti: è l’idea dei **reverse hashes** o database di corrispondenza.

---

## Crackstation

**CrackStation** è l’esempio tipico di servizio/database che associa hash noti a password comuni.

### A cosa serve nella spiegazione

Serve a mostrare che, se una password è debole e non ben protetta, spesso qualcuno ha già fatto il lavoro di crackarla prima.

### Idea chiave

Hashare una password non basta, se:

- l’algoritmo è debole
    
- manca il salt
    
- la password è banale
    

---

# LE PASSWORD SU LINUX

## Dove stanno

Su Linux le credenziali protette stanno in:

```bash
/etc/shadow
```

---

## Formato generale

Le slide mostrano che in `/etc/shadow` troviamo informazioni come:

- username
    
- id dell’algoritmo
    
- salt casuale
    
- password digest
    

In forma semplificata:

```bash
$id$salt$digest
```

---

## Differenza tra `/etc/passwd` e `/etc/shadow`

## `/etc/passwd`

Contiene informazioni pubbliche sugli utenti, per esempio:

- username
    
- uid
    
- gid
    
- home directory
    
- shell
    

Non contiene più le password hashate.  
Al posto del campo password compare di solito una `x`.

### Significato della `x`

La `x` indica che il vero dato sensibile è stato spostato in `/etc/shadow`.

---

## `/etc/shadow`

Contiene la parte sensibile:

- username
    
- algoritmo di hashing
    
- salt
    
- digest della password
    
- altre informazioni di validità/scadenza
    

Solo **root** può leggerlo.

---

## Spiegazione di algoritmo, salt e digest

### Hashing algorithm id

L’**id** indica quale algoritmo è stato usato per creare l’hash.  
Serve al sistema per sapere come verificare correttamente la password.

### Random salt

Il **salt** è la stringa casuale associata a quella password.  
Serve a differenziare hash uguali e a rendere più difficile il cracking massivo.

### Password digest

Il **digest** è il risultato finale della funzione di hash applicata alla password insieme al salt.  
È la “firma matematica” che il sistema confronta durante il login.

### Nota importante

Il digest **non è una cifratura reversibile**.  
Non è il testo della password “nascosto”, ma il risultato di una trasformazione one-way.

---

## Nota sugli algoritmi Linux moderni

Le slide fanno anche un confronto importante:

- algoritmi vecchi: **CPU-hard**
    
- algoritmi più moderni come **yescrypt**: **memory-hard**
    

### Significato

Un algoritmo memory-hard non richiede solo potenza di calcolo, ma anche molta memoria RAM.  
Questo rende il cracking più costoso, soprattutto con hardware specializzato.

Quindi yescrypt è più robusto contro attaccanti che usano GPU o ASIC.

---

# CRACKING HASHES - OFFENSIVE SIDE

## Idea generale

Le slide dicono che i password cracking tools sono in sostanza dei **comparison engines**.

Cioè:

1. si prende una password candidata
    
2. si calcola il suo hash con lo stesso algoritmo
    
3. si confronta il risultato con l’hash bersaglio
    
4. se coincidono, la password è stata trovata
    

Quindi sì: il concetto corretto è  
**“provo una parola e vedo se corrisponde a quel codice hash”**,  
ma detto bene significa che si confrontano **digest calcolati** con **digest memorizzati**.

---

## Spiegazione della slide 38

La slide 38 vuole proprio farti passare questa idea:

- i tool non “invertono magicamente” l’hash
    
- generano candidati
    
- li trasformano nello stesso formato dell’hash reale
    
- confrontano i risultati
    

Se c’è collisione tra candidato corretto e hash bersaglio, la password è trovata.

---

# CRACKING HASHES - JOHN THE RIPPER

## unshadow

`unshadow` serve a combinare `/etc/passwd` e `/etc/shadow` in un file leggibile da John.

### Comando della slide 40

```bash
unshadow /etc/passwd /etc/shadow > hashesFile
```

### Perché serve

- `/etc/passwd` contiene dati utente
    
- `/etc/shadow` contiene gli hash
    
- John vuole un formato unificato
    

Questa operazione si chiama **unshadowing**.

---

## SINGLE CRACK

La modalità **Single Crack** è il primo tentativo, il più veloce.

### Idea

Si basa sull’assunto che gli utenti siano prevedibili e usino il proprio nome o username nella password.

Per esempio, se l’utente si chiama `admin`, John può provare varianti come:

- `admin123`
    
- `nimda`
    
- `admin2000`
    
- `4dm1n`
    

### Comando della slide 41

```bash
john --single hashesFile
```

### Come lavora

John applica regole interne definite in `john.conf`, nella sezione:

```text
[List.Rules:Single]
```

### Idea chiave

Questa modalità non prova tutto: prova solo trasformazioni intelligenti dei nomi utente.

---

## DICTIONARY

La modalità **Dictionary** usa una wordlist precompilata di password note.

### Comando della slide 42

```bash
john -w=/path/to/wordlist.txt hashesFile
```

### Come funziona

John prende ogni parola nella wordlist, la trasforma nell’hash corretto e la confronta con gli hash bersaglio.

L’attacco ha successo se la password reale è presente nel dizionario o in una sua variante.

---

## RockYou come dizionario

`rockyou.txt` è una delle wordlist più famose, derivata da password reali trapelate in un leak.

### Perché è importante

Contiene milioni di password realmente usate dagli utenti, quindi è molto efficace contro password comuni.

---

## Regole di John

Se la password non viene trovata direttamente, John può applicare **regole** per generare varianti della wordlist.

Le regole sono definite in:

```text
[List.Rules:Wordlist]
```

### Esempio della slide 42

```bash
john -w=baseWordlist.txt --rules=All --stdout > newWordlist.txt
```

### Cosa fa

- prende la wordlist base
    
- applica tutte le regole
    
- stampa il risultato in output
    
- salva la nuova wordlist trasformata
    

### Idea chiave

Non usa solo le parole “pure”, ma anche versioni modificate.

---

## INCREMENTAL

La modalità **Incremental** è il brute force vero e proprio.

### Idea

Se Single e Dictionary falliscono, John prova tutte le combinazioni possibili.

### Comando della slide 43

```bash
john --incremental hashesFile
```

Oppure limitando il set:

```bash
john --incremental:<set> hashesFile
```

ad esempio:

- `Digits`
    
- `Alpha`
    

### Ottimizzazione

Per risparmiare tempo puoi limitare la lunghezza:

```bash
--min-length=N
--max-length=N
```

### Idea chiave

Questa è la modalità più generale, ma anche la più costosa.  
Funziona meglio se si restringe il dominio di ricerca.

---

## CUSTOM

La modalità **Custom** permette all’utente di definire regole proprie per modificare una wordlist.

### Obiettivo

Costruire password candidate molto vicine a quelle che un utente reale potrebbe aver scelto.

### Comando generale della slide 44

```bash
john --wordlist=baseWordlist.txt --config=myRules.conf --rules=MyRuleName --stdout > newWordlist.txt
```

### Significato

- `--wordlist=...` = wordlist di partenza
    
- `--config=...` = file con le regole personalizzate
    
- `--rules=MyRuleName` = nome della regola da usare
    
- `--stdout` = stampa i candidati generati
    
- `>` = salva il risultato
    

---

## Significato di alcune istruzioni

Dalla slide 44:

- `c` = rende maiuscola la prima lettera
    
- `A0` = inserisce qualcosa all’inizio
    
- `Az` = aggiunge qualcosa alla fine
    
- `[xyz]` = prova uno dei caratteri in quella posizione
    
- `@sXY` = sostituisce X con Y
    

Queste regole permettono di simulare le trasformazioni tipiche usate dagli utenti.

---

## Esempi slide 45-50 spiegati bene

### Esempio 1

```text
Az"[!?]1"
password
```

### Significato

Aggiunge alla fine una combinazione tra:

- `!1`
    
- `?1`
    

Quindi da `password` ottieni:

- `password!1`
    
- `password?1`
    

---

### Esempio 2

```text
A0"[!?]1"
password
```

### Significato

Aggiunge all’inizio:

- `!1`
    
- `?1`
    

Quindi:

- `!1password`
    
- `?1password`
    

---

### Esempio 3

```text
csA@so0
password
```

### Significato approssimato

Questa sequenza combina più trasformazioni:

- `c` = maiuscola iniziale
    
- sostituzioni tipo `a -> @`
    
- sostituzioni tipo `o -> 0`
    

Da `password` può uscire qualcosa come:

- `Passw0rd`
    

---

### Esempio 4

```text
csa@Az"1[!?]"so0ss5
password
```

### Cosa mostra

Qui vengono combinate più regole:

- maiuscola iniziale
    
- sostituzioni (`a -> @`, `o -> 0`, `s -> 5`)
    
- aggiunta finale di `1!` oppure `1?`
    

### Output possibili

- `P@55w0rd1!`
    
- `P@55w0rd1?`
    

### Idea chiave

Questa è esattamente la logica delle password “umane ma un po’ furbe”.

---

### Esempio 5

```text
cA0"qwerty"
password
```

### Significato

Prima rende maiuscola la prima lettera, poi aggiunge `qwerty` all’inizio.

Output:

- `qwertyPassword`
    

---

### Esempio 6

```text
A0"qwerty"c
password
```

### Significato

Prima aggiunge `qwerty` all’inizio, poi applica la maiuscola iniziale al risultato.

Output:

- `Qwertypassword`
    

### Punto fondamentale della slide 50

**L’ordine delle istruzioni è importante**.  
Applicare prima una regola e poi un’altra può cambiare completamente l’output finale.

---

## Format normalization

Le slide ricordano che John è potente ma “pignolo” sul formato di input.

Per questo esistono i tool:

```text
[fileFormat]2john
```

### A cosa servono

- eliminano dati inutili
    
- estraggono hash e salt
    
- convertono tutto in una riga che John capisce
    

Quindi sono preprocessori di normalizzazione del formato.

---

# CRACKING HASHES WITH HASHCAT

Ti metto la parte come tabella, come volevi.

## Tabella comandi Hashcat

|Comando / Opzione|Significato|
|---|---|
|`hashcat`|avvia il tool|
|`-m`|specifica il tipo di hash|
|`-a`|specifica la modalità di attacco|
|`-o cracked.txt`|file di output delle password crackate|
|`hashes.txt`|file contenente gli hash bersaglio|
|`--stdout`|stampa i candidati senza effettuare cracking reale|

---

## Slide 53 - STANDARD

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

### Idea

È il classico attacco a dizionario.

---

## Slide 54 - HYBRID

```bash
hashcat -a 6 example.dict '?d?d?d?d' --stdout
```

|Parte|Spiegazione|
|---|---|
|`-a 6`|modalità ibrida wordlist + mask|
|`example.dict`|wordlist di partenza|
|`'?d?d?d?d'`|maschera da aggiungere; `?d` significa cifra|
|`--stdout`|stampa i candidati|

### Cosa fa

Prende ogni parola della wordlist e le aggiunge 4 cifre finali.

Esempio:

- `password` -> `password1234`
    

---

## Slide 55 - COMBINATION

```bash
hashcat -m 0 -a 1 -j '$_' dict1.txt dict2.txt --stdout
```

|Parte|Spiegazione|
|---|---|
|`-m 0`|tipo hash MD5|
|`-a 1`|modalità combinazione|
|`-j '$_'`|applica una regola: aggiunge `_`|
|`dict1.txt dict2.txt`|due dizionari da combinare|
|`--stdout`|mostra i candidati|

### Cosa fa

Combina parole provenienti da due dizionari, eventualmente applicando trasformazioni.

### Idea chiave

Hashcat permette attacchi molto più raffinati del semplice brute force.

---

# CRACKING ARCHIVE PASSWORDS

## Slide 57

Le password degli archivi compressi possono essere attaccate offline.

### ZIP FILES con fcrackzip

```bash
fcrackzip -u -b -v -D -p myWordlist.txt target.zip
```

## Cos’è fcrackzip

È un tool usato per crackare password di archivi ZIP.

### Significato generale

Prova password candidate contro l’archivio finché ne trova una valida.

---

## Metodo alternativo con John / Hashcat

Si può prima estrarre l’hash dell’archivio con strumenti del tipo:

```bash
zip2john target.zip > hashList.txt
rar2john target.rar > hashList.txt
[format]2john target.[format] > hashList.txt
```

Poi usare:

```bash
john --wordlist=myWordlist.txt hashList.txt
```

oppure

```bash
hashcat -m [corresponding_mode] hashList.txt myWordlist.txt
```

### Idea chiave

Prima trasformi l’archivio in un formato “crackabile”, poi usi John o Hashcat.

---

# HYDRA

## Comandi slide 58

```bash
hydra -l <user name> -p <password> <protocol://hostname>
hydra -L <user list> -P <password list> <protocol://hostname>
```

### Significato

- `-l` = username singolo
    
- `-p` = password singola
    
- `-L` = lista di username
    
- `-P` = lista di password
    

---

## Esempio 1

```bash
hydra -l Alice -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.15
```

### Cosa fa

Prova tutte le password di `rockyou.txt` per l’utente `Alice` sul servizio SSH della macchina indicata.

---

## Esempio 2

```bash
hydra -L usernames.txt -p Password1234 192.168.1.1 http-get / -s 80
```

### Cosa fa

Prova tutti gli username in `usernames.txt` contro il servizio HTTP, usando sempre la stessa password `Password1234`.

---

## Slide 59

```bash
hydra -t 4 -l EdoMan000 -P /usr/share/wordlists/rockyou.txt -vV 10.10.10.6 ftp
```

|Opzione|Significato|
|---|---|
|`-t 4`|numero di connessioni parallele|
|`-l EdoMan000`|username fisso|
|`-P ...`|wordlist di password|
|`-vV`|verbose molto dettagliato|
|`10.10.10.6`|target|
|`ftp`|protocollo bersaglio|

---

# WINDOWS

## Windows Active Directory

**Active Directory (AD)** è il servizio centralizzato di Microsoft per gestire:

- utenti
    
- gruppi
    
- computer
    
- autenticazione
    
- autorizzazioni
    
- policy di sicurezza
    

### Spiegazione semplice

In una rete Windows aziendale, invece di gestire ogni macchina separatamente, si usa Active Directory come archivio centrale delle identità.

Il **Domain Controller** autentica e autorizza utenti e computer.

### Perché è importante

In un ambiente standalone, compromettere un hash può dare accesso a una sola macchina.  
In un ambiente AD, un hash molto privilegiato può aprire l’accesso a un’intera organizzazione.

---

# LA WINDOWS AUTHENTICATION

L’autenticazione Windows va distinta in due parti:

- **authentication protocol**
    
- **password hash**
    

## Authentication protocol

È il modo in cui le credenziali vengono usate e trasmesse durante il login in rete.

## Password hash

È il formato in cui la password è salvata “a riposo”.

### Idea chiave

Bisogna distinguere **come la password è memorizzata** da **come viene usata sulla rete**.

---

# HASHING

## LM

**LM** significa **LAN Manager Hash**.

### Cos’è

È un vecchio algoritmo/formato di hashing delle password Windows, risalente agli anni ’80.

### Perché è importante

Oggi è considerato **legacy** e debole, ma può ancora comparire in ambienti vecchi o con compatibilità retroattiva attivata.

### Dove si trova

- **SAM** nelle macchine standalone
    
- **NTDS.dit** sui Domain Controller
    

---

## NT Hash

L’**NT Hash** è il formato standard moderno per memorizzare la password a riposo in Windows.

### Nota importante

Spesso viene chiamato impropriamente “NTLM hash”, ma in realtà:

- **NT Hash** = hash della password
    
- **NTLM** = protocollo di autenticazione
    

---

## SAM

**SAM** = _Security Accounts Manager_.

È il database locale Windows che memorizza gli hash degli account locali.

### Standalone significato

Una macchina **standalone** è una macchina non appartenente a un dominio Active Directory, che gestisce localmente utenti e credenziali.

---

## NTDS.dit

`NTDS.dit` è il database principale di Active Directory sul Domain Controller.

### Differenza con SAM

- `SAM` = account locali
    
- `NTDS.dit` = account del dominio
    

---

## Pass the Hash (PtH)

Il **Pass the Hash** è una tecnica in cui l’attaccante usa direttamente l’hash NT per autenticarsi, senza conoscere la password in chiaro.

### Perché è possibile

Perché in certi contesti il possesso dell’hash è sufficiente per autenticarsi verso una risorsa.

---

## SSO

**SSO** = _Single Sign-On_.

L’utente si autentica una sola volta e poi accede a più risorse senza reinserire continuamente la password.

### Rischio

Se un attaccante ruba il materiale giusto, può sfruttarlo su più servizi.

---

# DUMPING TOOLS PER WINDOWS

## Definizione di post exploitation

La **post exploitation** è la fase successiva alla compromissione iniziale del sistema.

Dopo essere entrato, l’attaccante punta a:

- rubare credenziali
    
- alzare i privilegi
    
- muoversi lateralmente
    
- mantenere accesso
    
- raccogliere dati sensibili
    

I dumping tools appartengono proprio a questa fase.

---

## Mimikatz

**Mimikatz** è uno dei tool di post exploitation più famosi e potenti in ambiente Windows.

Serve a estrarre:

- hash
    
- credenziali
    
- secret di sistema
    
- informazioni di autenticazione
    

---

## Dumping SAM

Le slide mostrano:

```text
mimikatz # lsadump::sam SystemBkup.hiv SamBkup.hiv
```

### Significato

Mimikatz estrae gli hash dal database SAM usando anche gli hive di sistema necessari.

---

## Dumping LSASS.EXE

Comandi delle slide:

```text
mimikatz # privilege::debug
mimikatz # sekurlsa::logonPasswords full
```

### Spiegazione

- `privilege::debug` = ottiene privilegi adeguati per interagire con processi protetti
    
- `sekurlsa::logonPasswords full` = estrae informazioni di autenticazione dalla memoria del processo `lsass.exe`
    

### Cos’è `lsass.exe`

È il processo _Local Security Authority Subsystem Service_, che gestisce funzioni centrali dell’autenticazione Windows e può contenere in memoria dati molto sensibili.

---

# SPIEGAZIONE APPROFONDITA DI NET-NTLM / NTLM

## Protocollo challenge-response

NTLM è un protocollo di autenticazione **challenge-response**.

### Cosa significa

Il server non chiede al client di inviare la password in chiaro.  
Invece:

1. il server manda una **challenge**
    
2. il client calcola una **response**
    
3. la response dipende dalla challenge e dal segreto derivato dalla password
    
4. il server verifica la response
    

### Punto chiave

L’hash della password non “cambia” ogni volta.  
Quello che cambia a ogni autenticazione è la **challenge**, e quindi cambia la **response**.

---

## Net-NTLMv1

È una versione legacy del protocollo, oggi considerata debole.

### Caratteristiche

- challenge-response
    
- derivazione da NT Hash e/o LM Hash
    
- catturabile in rete
    
- vulnerabile a downgrade o cracking rapido
    

---

## Net-NTLMv2

È la versione più moderna del protocollo NTLM, usata di default da molti anni.

### Cosa cambia rispetto a v1

La struttura è sempre challenge-response, ma usa:

- **HMAC-MD5**
    
- challenge più robuste
    
- timestamp
    
- target information
    
- struttura più resistente al cracking
    

### Però

La vulnerabilità concettuale resta: se l’attaccante riesce a farsi inviare una response valida, può catturarla e provare a crackarla offline o usarla in altri attacchi.

---

# PROTOCOLLO v2 FUNZIONAMENTO IN STEP

Questa è la parte che volevi spiegata bene.

## 1. Il server invia SC

Il server manda al client una **Server Challenge (SC)**, cioè una stringa casuale di 8 byte.

### A cosa serve

Serve a rendere unica quella sessione di autenticazione.

---

## 2. Il client genera CC

Il client genera una **Client Challenge (CC)**, anch’essa casuale, di 8 byte.

### A cosa serve

A introdurre ulteriore casualità lato client.

---

## 3. Il client costruisce CC*

Nelle slide compare:

```text
CC* = (X, time, CC2, domain name)
```

### Come interpretarlo

`CC*` non è semplicemente la challenge client “nuda”, ma una struttura più ricca, spesso chiamata **blob**, che include:

- campi di contesto
    
- timestamp
    
- challenge client
    
- nome del dominio / target info
    

### Perché serve

Serve a legare la response non solo alla challenge del server, ma anche al contesto preciso della sessione.

---

## 4. Il client calcola il v2-Hash

Le slide riportano:

```text
v2-Hash = HMAC-MD5(NT-Hash*, user name, domain name)
```

### Significato

Il client prende il proprio **NT Hash** e lo combina con:

- username
    
- domain name
    

per derivare un valore intermedio chiamato **v2-Hash**.

### Punto importante

Il client usa direttamente **l’hash della password**, non la password in chiaro.

---

## 5. Il client calcola LMv2 e NTv2

Le slide scrivono:

```text
LMv2 = HMAC-MD5(v2-Hash, SC, CC)
NTv2 = HMAC-MD5(v2-Hash, SC, CC*)
```

### Significato

A partire dal v2-Hash, il client produce due valori:

- **LMv2**, legato a `SC` e `CC`
    
- **NTv2**, legato a `SC` e `CC*`
    

### Differenza concettuale

`NTv2` incorpora più informazioni, quindi è più robusto e contestuale.

---

## 6. Il client risponde al server

La slide 76 dice che il client invia:

```text
[LMv2 | CC | NTv2 | CC*]
```

### Cosa riceve il server

Il server riceve tutto il materiale necessario per verificare la correttezza della response.

Se i calcoli tornano, l’autenticazione è valida.

---

## Riassunto semplice di NTLMv2

- il server manda una sfida casuale
    
- il client crea una propria sfida
    
- costruisce una struttura con contesto e timestamp
    
- usa il proprio NT Hash per derivare una response
    
- invia la response al server
    
- il server verifica
    

### Punto più importante da ricordare

La password in chiaro non viaggia, ma la **response** sì.  
E quella response può essere catturata da un attaccante in certe condizioni.

---

# ATTACCO DI POISONING CON SPIDERLABS / RESPONDER

## Cos’è Responder

Le slide lo definiscono come un poisoner di:

- LLMNR
    
- NBT-NS
    
- MDNS
    

con server rogue integrati per vari protocolli, come:

- HTTP
    
- SMB
    
- FTP
    
- LDAP
    
- DNS
    
- altri
    

### Significato semplice

È un tool che si finge il servizio che la vittima sta cercando, così la induce ad autenticarsi verso l’attaccante.

---

## Come funziona il poisoning

## 1. La vittima prova a connettersi a una risorsa

Per esempio sbaglia un nome di rete o cerca una macchina inesistente.

---

## 2. Il DNS fallisce

La risoluzione standard del nome non riesce.

---

## 3. La macchina della vittima manda richieste in broadcast

Usa protocolli legacy come **LLMNR** o **NBT-NS** e chiede alla rete locale:

“chi conosce questa risorsa?”

---

## 4. Responder risponde fingendosi il server

L’attaccante intercetta la richiesta e dice in sostanza:

“sono io quel server”

Questa è la fase di **poisoning/spoofing**.

---

## 5. La vittima crede di aver trovato il server corretto

A questo punto avvia l’handshake NTLMv2 verso la macchina dell’attaccante.

---

## 6. L’attaccante cattura la challenge-response

Responder registra il materiale di autenticazione risultante.

Le slide dicono esplicitamente:

- Responder logs the resulting hash
    
- per offline cracking o relaying
    

---

## Perché è pericoloso

Perché la vittima non sta consegnando volontariamente la password, ma viene indotta a fare una normale autenticazione automatica verso un host malevolo.

Quindi l’attaccante ottiene:

- challenge-response Net-NTLMv2
    
- dati sufficienti per tentare cracking offline
    
- oppure per fare relay, se le condizioni lo permettono
    

---

## Collegamento con NTLMv2

Questo attacco non “rompe” NTLMv2 matematicamente.  
Sfrutta il fatto che:

- la vittima si autentica verso chi pensa sia il server legittimo
    
- in realtà il server è l’attaccante
    
- l’attaccante cattura il materiale di autenticazione
    

### Frase da ricordare bene

NTLMv2 è più robusto di NTLMv1, ma resta pericoloso se l’attaccante riesce a **forzare o intercettare** un’autenticazione verso di sé.

---

Se vuoi, nel prossimo messaggio te li trasformo ancora in una versione **più “appunti da PDF”**, quindi meno discorsiva di questa, con:

- titoli puliti
    
- punti ordinati
    
- formule evidenziate
    
- comandi separati bene  
    praticamente pronta da copiare quasi direttamente.
    