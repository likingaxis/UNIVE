### PROBLEMA DI MEMORIZZAZIONE
il numero totale di token $T$ nella collezione può essere enorme, quindi salvare tutte le coppie `(termID, docID)` in memoria può diventare impossibile.

→ Token string = la singola parola estratta dal testo del documento.

#### RCV1
**RCV1 (Reuters Corpus Volume 1)** è una collezione di documenti usata spesso negli esempi di Information Retrieval per **stimare dimensioni e costi della costruzione di un indice**.
##### Come è fatto un documento in questo esempio
Un documento della collezione è **una notizia Reuters**, composta principalmente da:
- **title**
- **body**
Durante la costruzione dell’indice:
- il testo del titolo e del corpo viene **analizzato e segmentato**
- il testo viene diviso in **token (parole)** tramite **tokenization**
- questi token vengono poi usati per costruire l’inverted index

##### RCV1 in numeri
![[Pasted image 20260314181945.png]]
- È composta da **circa 800.000 documenti** di notizie Reuters.
- Ogni documento contiene mediamente **circa 200 token** (parole).
- Il numero totale di token nella collezione è quindi circa **100 milioni**.
- DOMANDA CHE FA SEMPRE ALL'ESAME
	- perché la media del numero di bytes per token è inferiore a quella per termine?
		- i **token** rappresentano **tutte le occorrenze delle parole nel testo**
			- molte parole molto frequenti sono **molto corte** (es. _the, a, of, to_)
			- queste parole corte compaiono **migliaia di volte** e abbassano la media della lunghezza dei token
		- i **term**, invece, rappresentano **le parole distinte del vocabolario** e quindi **ogni parola viene contata una sola volta**
			- di conseguenza le parole lunghe (che spesso sono meno frequenti) **pesano di più nella media dei term**, rendendo la media dei byte per term **più alta** rispetto a quella dei token.
###### TOKEN vs TERM
- **Token (token stream)**
    - sono **le parole effettivamente estratte dal testo dei documenti**
    - rappresentano **tutte le occorrenze delle parole**, nell’ordine in cui appaiono nei documenti
- Il **token stream** è l’insieme di tutte le coppie:
	- `(termID, docID)`
	- generate durante il parsing dei documenti.
- **Term**
    - sono **le parole distinte del vocabolario**
    - cioè **le parole nel dizionario dell’indice**, ogni parola compare **una sola volta**
- tutta questo vedendo i dati (slide con quelle tabelle) occupa tanta memoria
##### Come risolvere?
#### ALGORITMI DI SORTING
##### BSBI
- È un algoritmo per **costruire l’inverted index quando la collezione è 
- Idea principale:
1. **si divide il token stream in blocchi**
2. ogni blocco viene **ordinato in memoria RAM**
3. il blocco ordinato viene **scritto su disco**
4. alla fine **si fa il merge dei blocchi** per ottenere l’indice finale.
- potrei usare il 90% della ram senza sfruttarla tutta
##### PSEUDOCODICE
![[Pasted image 20260314183331.png]]
Dato che il dataset è troppo grande per stare in memoria:
- si usa **solo una parte della RAM** (ad esempio il 90%)
- si salva il resto su **disco**
##### Procedura:
- sia **N** il numero totale di coppie `(termID, docID)`
- si divide il token stream in **blocchi di dimensione B**
- B è scelto in modo che **ogni blocco possa stare in RAM**
- costi
	- si hanno `N/B` blocchi
	- ogni blocco si sposta in ram e si ordina
		- costo `O(B log B)`
		- facciamolo per ogni blocco
		- ``O((N/B) * B log B)`
			- `O(N log B)``
###### Fase di merge
Durante il merge:
- si leggono i blocchi dal disco
- si uniscono le posting list dei termini uguali
Se un termine compare in più blocchi:
`postings_final = concatenazione(postings_blocco1, postings_blocco2, ...)`
Dato che ogni blocco è già ordinato:
- le posting list sono **già in ordine**
- quindi basta **concatenarle/mergiarle sequenzialmente**.
![[Pasted image 20260314183959.png|400]]
##### SPIMI
- **SPIMI** significa **Single-Pass In-Memory Indexing**.  
- È un algoritmo di costruzione dell’indice invertito pensato per collezioni grandi, quando non conviene usare l’approccio con ordinamento globale dei record come in BSBI.
- Idea principale:
	- l’obiettivo è **sfruttare al massimo la RAM disponibile**
	- lavora **un blocco alla volta in memoria**
	- per ogni blocco costruisce direttamente un **indice invertito parziale**
	- quando la memoria finisce, scrive il blocco su disco e ricomincia con un nuovo blocco.
### Caratteristiche principali
- **Single-pass**: i token vengono processati **una sola volta**
	- non usa una struttura globale `term -> termID` come BSBI
	- usa direttamente i **termini** invece dei `termID`
- **non ordina tutte le coppie `(termID, docID)`** prima di costruire le posting list
	- costruisce le **posting list direttamente mentre legge i token**.
		- appena si legge un token, si va subito nella posting list giusta
###### PSEUDOCODICE
![[Pasted image 20260314184903.png]]
- costi
	- `Θ(T)`
###### USO DELLE TABELLE HASH
- si usa una **tabella hash** come dizionario
- la hash table serve a capire **se un termine è già presente nel dizionario del blocco**
- se il termine è già presente, si recupera la sua **posting list**
- se non è presente, si crea una **nuova entry nel dizionario** e una nuova posting list.
Quando la memoria è piena:
1. **si ordinano i termini del dizionario del blocco**
2. si scrivono su disco:
    - il **dizionario**
    - le **posting list**
Quindi su disco viene salvato **un blocco di indice invertito già costruito**.
Poi:
- si svuota la RAM
- si ricomincia a processare **i token successivi della collezione**.
Alla fine avrai **molti blocchi di indice invertito su disco**.
Dopo aver processato tutta la collezione:
- si fa il **merge dei blocchi**
- si uniscono le posting list dello stesso termine
- si ottiene **l’indice invertito finale**.
##### INDEXING DISTRIBUITO
- significato di distribuito
	- ricordiamo che distribuito significa che il lavoro di costruzione dell’indice **non viene fatto su una singola macchina**, ma viene **suddiviso tra molte macchine (nodi)** che lavorano in parallelo.
- *SLA*
	- Service level agreement
		- Lo **SLA** indica il livello di disponibilità del sistema, cioè **quanto tempo il sistema deve rimanere operativo**.
		- lo SLA al 99.99% non è sempre fattibile per costi
Quando si hanno **molte macchine**, la probabilità che **qualcuna si rompa aumenta**.
Esempio concettuale:
- se ho **1000 nodi**
- anche se ogni nodo ha una probabilità molto alta di funzionare
- è molto probabile che **in un certo momento almeno uno fallisca**.
![[Pasted image 20260314190106.png]]

Quando l’indice è distribuito su più macchine, possiamo dividerlo in due modi principali.
##### Term-partitioned index
In questo caso:
- ogni macchina gestisce **un sottoinsieme dei termini**
- quindi memorizza le **posting list di quei termini**
Esempio:
```scss
Macchina 1 → termini A–F  
Macchina 2 → termini G–P  
Macchina 3 → termini Q–Z
```
Se l’utente cerca:
`brutus AND caesar`
la query deve essere inviata **alle macchine che gestiscono quei termini**.

##### Document-partitioned index
In questo caso:
- ogni macchina gestisce **un sottoinsieme dei documenti**
- quindi memorizza **tutti i termini**, ma solo per quei documenti.
Esempio:
```scss
Macchina 1 → documenti 1–1M  
Macchina 2 → documenti 1M–2M  
Macchina 3 → documenti 2M–3M
```
Se l’utente cerca:
`brutus AND caesar`
la query viene **eseguita su tutte le macchine**, ma ciascuna restituisce risultati solo per **i propri documenti**.

I grandi motori di ricerca (Google, Bing, ecc.) **preferiscono il document partitioning**.
#### MODELLO MAP REDUCE
Per costruire l’indice in un sistema distribuito si usa spesso il modello **MapReduce**.
Le due fasi principali sono:
##### MAP
- i documenti vengono **divisi in blocchi (splits)**
- ogni macchina **parserizza i documenti**
- produce coppie:
	`(termID, docID)`
Queste coppie vengono scritte in **segment files**.
##### REDUCE
- le coppie con lo stesso termine vengono **raccolte insieme**
- si costruiscono le **posting list finali**.
Ogni nodo reduce si occupa **di un sottoinsieme dei termini**.
##### Fault tolerance
Un aspetto fondamentale dei sistemi distribuiti è la **tolleranza ai guasti**.
- esiste un **master node** che assegna i task alle macchine disponibili
- i nodi eseguono i task (map o reduce)
Se una macchina fallisce:
- il **master riassegna il lavoro** a un’altra macchina disponibile.
Questo meccanismo permette:
- **scalabilità**
- **affidabilità**
- capacità di lavorare anche con **macchine economiche e non perfettamente affidabili**.
##### Problema del master
Il **master node** coordina tutto il sistema:
- assegna i task
- monitora i worker
- riassegna il lavoro in caso di guasto.
Se il master si rompe:
- il sistema può avere problemi.
Per questo nei sistemi reali:
- si usano **più master**
- oppure meccanismi di **replica o backup del master**

- **MapReduce** viene usato soprattutto nella **fase di costruzione dell’indice** (index construction).
- **Term-partitioned** e **Document-partitioned** descrivono **come l’indice è distribuito tra le macchine**, cosa che è particolarmente importante **quando si eseguono le query (ricerca)**.