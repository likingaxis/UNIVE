# Modulo 1
14 agosto - Fondamenti e modelli di processo
### Definizione di Ingegneria del Software
L'ingegneria del Software è la disciplina che applica principi, metodi e pratiche dell'ingegneria alla realizzazione del software.
Un prodotto Software non deve essere visto come semplice codice scritto da un programmatore ma come il risultato di un processo organizzato che comprende analisi, progettazione, costruzione, verifica, manutenzione e gestione.

Questo nasce da una esigenza dovuta dal dover realizzare prodotti industriali, ovvero prodotti che non vengono sviluppati da singole persone
invece con più persone, software che deve essere manutenuto rispettare costi è necessario avere un approccio ingegneristico
altrimenti lo sviluppo potrebbe incappare in
- cost overrun
	- costo reale supera quello previsto
- time overrun
	- il progetto richiede più tempo del previsto

l'obiettivo quindi dell'ingegneria del Software è risolvere il problema della software crisis, dove la difficoltà nel produrre software di grandi dimensioni aumentava

##### Cosa si intende per Prodotto software
Un prodotto software racchiude il codice e la documentazione associata al prodotto
##### Cosa si intende per artefatto
Un artefatto software è un prodotto intermedio generato durante il processo di sviluppo
non deve per forza essere codice eseguibile può anche essere

- documento dei requisiti, una specifica oppure uno schema
##### Cosa si intende per sistema software
Un sistema software è un insieme organizzato di prodotti o componenti software che cooperano per raggiungere un determinato obiettivo
- un singolo programma può essere un prodotto software;
- un sistema software può comprendere più programmi, componenti, servizi, dati e documentazione che collaborano tra loro.
##### Cosa si intende per Cliente, sviluppatore e utente
- Cliente: chi richiede il prodotto
- Sviluppatore: chi lo realizza
- Utente: chi lo utilizza

quando cliente=sviluppatore si dice Software interno
quando cliente != sviluppatore si dice Software a contratto
### Ciclo di vita di un software
il ciclo di vita del software è l'intervallo di tempo che va dalla nascita dell'esigenza di realizzare il prodotto fino alla sua dismissione
Viene suddivisa in 3 grandi **stadi**
##### Sviluppo
si suddivide a sua volta in 6 fasi principali
- Requisiti
	- si stabilisce che cosa deve fornire il software
	- necessità del cliente, servizi richiesti e vincoli da rispettare
- Specifica
	- riscrittura dei requisiti in modo migliore(ci sarà un capitolo apposito)
- Pianificazione
	- si stabilisce come organizzare il progetto in termini gestionali
	- tempi, risorse, costi ecc...
- Progettazione
	- si decide come costruire il sistema
- Codifica
	- effettivo codice sorgente del progetto
- Integrazione
	- Le parti realizzate separatamente vengono combinate per formare il prodotto completo
##### Manutenzione
Dopo il rilascio del software avviene la manutenzione
- tutte le modifiche effettuate sul prodotto durante il periodo in cui esso viene utilizzato
	- può essere la parte maggiore dei costi
###### Diversi tipi di manutenzione
- Correttiva
	- eliminazione di difetti che potrebbero produrre comportamenti errati
- Adattiva
	- adattare il software a cambiamenti dell'ambiente come un nuovo hardware su cui deve girare
- Perfettiva o Evolutiva
	- estensione o miglioramento del prodotto come aggiungere una nuova funzionalità
- Preventiva
	- migliorare il software per renderlo più semplice da manutenere
##### Dismissione
Momento in cui il prodotto viene ritirato definitivamente dall'uso ad esempio dovuto ad obsolescenza

### Verifica e Validazione
Ad accompagnare l'intero ciclo sviluppo del prodotto vi sono attività di Verification&Validation 
- Verification
	- controlla che ciò che viene prodotto in una fase sia coretto rispetto a ciò che quella fase aveva ricevuto in input
	- **“Are we building the product right?”**
- Validation
	- controlla che il prodotto realizzato soddisfi realmente le necessità dell'utente
	- **“Are we building the right product?”**

Un software può quindi essere:
- corretto rispetto alla specifica
- ma non valido rispetto alle esigenze reali dell’utente
#### Testing
Si sottopone il software a controlli per individuare problemi e verificare il suo comportamento
viene fatto durante l'intero sviluppo

**Verifica e validazione descrivono cosa vogliamo controllare; il testing è uno degli strumenti con cui effettuiamo questi controlli.**

![[assets/p006-fig-005.png|315]]

Il diagramma evidenzia proprio questa differenza: la verifica mette in relazione le fasi vicine del processo, mentre la validazione collega il prodotto sviluppato agli obiettivi dell'utente

### Problemi accidentali ed essenziali del software
Si possono distinguere quelli che sono dei problemi legati alla produzione del software
- Problemi accidentali
	- Difficoltà che emergono dagli strumenti e le tecnologie con cui il software viene sviluppato
	- ridotte dall'evoluzione organizzativa e tecnologica
- Problemi essenziali
	- caratteristiche intrinseche del software che non scompaiono grazie a computer più veloci o linguaggi migliori
	- un problema essenziale può derivare dalle seguenti difficoltà
	- Complessità
		- non significa per forza + righe di codice
		- Un sistema software può essere diviso in più componenti, una parte può essere complessa se queste componenti interagiscono tra loro molte volte
	- Conformità
		- Il software deve adattarsi ad un ambiente con hardware, sistemi operativi o protocolli già definiti
	- Cambiabilità
		- Il software viene modificato frequentemente su richiesta e questo può essere un problema se non vi è una progettazione buona alla base
	- Invisibilità
		- problema nel ragionare su sistemi complessi poiché invisibili, un software non è visibile come un edificio
### Aspetti economici del software
- il costo del software può essere descritto dalla seguente espressione
`C = aS^2`
con:
- `C` = costo;
- `S` = dimensione;
- `a` = costante.
questo ci serve per dire che:
- raddoppiare la dimensione di un sistema non significa raddoppiare lo sforzo

ricordiamo che una volta creata una copia creare una copia aggiuntiva ha un costo marginale rispetto al costo di sviluppo, soprattutto se il software è digitale
### Affidabilità di un software
Per affidabilità si intende la fiducia che possiamo riporre nel corretto funzionamento del prodotto
in modo formale invece
>[!quote] la probabilità che il software funzioni correttamente durante un determinato intervallo di tempo detto *mission time* nelle condizioni d'uso considerate

si distinguono quindi 3 concetti
- Errore
	- azione umana sbagliata
	- ad esempio uno sviluppatore scrive una cosa in modo sbagliato
- Difetto
	- anomalia che rimane nel prodotto come conseguenza dell'errore
- Guasto
	- comportamento scorretto del prodotto dovuta ad un difetto
	- 
Un punto fondamentale è che **un difetto non produce necessariamente sempre un guasto**.

Se la parte di codice contenente il difetto non viene mai eseguita in una certa modalità d'uso, quel difetto rimane latente.
infatti un difetto si può definire latente
- un difetto presente nel software che non ha ancora provocato un comportamento osservabile errato
infatti il numero di difetti non determina l'affidabilità percepita
supponiamo che due difetti siano presenti nel sistema
- il primo si trova in una funzione usata centinaia di volte al giorno
- il secondo in una funzione utilizzata una volta all'anno
eliminare il primo avrà più impatto
da qui nasce la regola
###### 10-90
in programmi di notevoli dimensioni il 90% del tempo di esecuzione totale è dedicato all'esecuzione del 10% delle istruzioni detta nucleo del programma
Di conseguenza, l'effetto di un difetto dipende anche dalla sua **localizzazione**

Per capire il modo in cui un prodotto viene usato si descrive il Profilo operativo che comprende
- quali funzioni vengono utilizzate e con quel frequenza, quali input vengono forniti ecc...
Utenti differenti possono avere profili operativi differenti per questo lo stesso prodotto può mostrare un'affidabilità diversa in base al contesto
# Affidabilità hardware e software
Si vuole distinguere la differenza tra le due, entrambi possono manifestare guasti ma con cause diverse
- Hardware
	- oggetto fisico che può deteriorarsi dovuto a
		- usura, rottura o deterioramento
	- dopo la sua sostituzione può tornare a una condizione simile alla precedente
	- l'obiettivo è quindi mantenere la frequenza di guasto il più possibile stabile
- Software
	- non si consuma fisicamente 
	- i guasti derivano da difetti già presenti oppure introdotti durante delle modifiche
	- possiamo correggere un software eliminando il difetto
	- ma possiamo per sbaglio metterne un'altro
Ora si analizzano due grafici uno del guasto hardware e uno software

![[assets/p003-fig-001.png|371]]

Nel grafico hardware si riconoscono tre zone concettuali:

- una fase iniziale con frequenza di guasto elevata, detta spesso **mortalità infantile**;
- una fase relativamente stabile;
- una fase finale in cui l'usura fa aumentare i guasti.

![[assets/p003-fig-002.png|520]]

Nel software l'andamento è differente:
- le correzioni dovrebbero far diminuire la frequenza di guasto ma in realtà
- ogni modifica può introdurre nuovi difetti e causare temporanei aumenti della frequenza di guasto

concetto di **software rejuvenation**: in alcuni sistemi a lunga esecuzione si può periodicamente riportare il sistema in uno stato operativo più pulito o stabile per contrastare fenomeni di degradazione dovuti all'interazione con l'ambiente di esecuzione
### Disponibilità
La disponibilità indica la percentuale di tempo durante la quale il sistema risulta effettivamente utilizzabile

Disponibilità e Affidabilità sono collegate ma esprimono due cose diverse
infatti la disponibilità dipende dalla frequenza dei guasti e dal tempo necessario per ripristinare il servizio
invece affidabilità vede la frequenza dei guasti ma non per forza il tempo necessario per risolverli
## Dal ciclo di vita al processo software
Il ciclo di vita del software come detto in precedenza descrive le grandi fasi attraversate dal prodotto, dalla nascita fino alla dismissione

per realizzare il software concretamente bisogna stabilire quali attività svolgere in quale ordine e con quali modalità
Questo prende il nome di processo software
- l'insieme organizzato delle attività necessarie per sviluppare, mantenere e gestire un prodotto software rispettando
	- tempi, costi, requisiti e qualità attesa
Per attività invece si intende
- un insieme organizzato di operazioni svolte per ottenere un risultato
	- riceve un input, svolge un lavoro e produce uno o più output come artefatti
	- raccogliere i requisiti
	- scrivere codice
	- eseguire testing

## Modello di ciclo di vita
Descrive come organizzare le attività dello sviluppo software
ad esempio:
- quali attività vengono svolte
- in quale ordine
- quali attività possono sovrapporsi
- quando vengono prodotte versioni utilizzabili del software
- quando coinvolgere il cliente

Non esiste un modello universalmente migliore. La scelta dipende da fattori quali:

- stabilità dei requisiti
- dimensione del progetto
- criticità del sistema
- esperienza dell'organizzazione
- necessità del cliente
- livello di rischio
### Modello Build & Fix
Il **Build & Fix** rappresenta sostanzialmente l'assenza di un processo strutturato
L'idea è:
1. si costruisce rapidamente una prima versione;
2. la si mostra o consegna;
3. la si modifica in base ai problemi e alle richieste;
4. si continua a correggerla finché il cliente non è soddisfatto.

![[assets/p005-fig-003.png|480]]

Il problema è che nel Build & Fix le modifiche non sono inserite in una struttura progettuale controllata comportando un prodotto difficile da comprendere e mantenere
### Modello Waterfall
