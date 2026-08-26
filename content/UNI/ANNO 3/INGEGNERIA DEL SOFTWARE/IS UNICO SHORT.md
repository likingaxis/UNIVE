### MODULO 1
### Introduzione ISW
- **Definizione di Ingegneria del software**
	- è la disciplina che applica principi, metodi e pratiche dell'ingegneria alla realizzazione del software per risolvere problemi di cost overrun e time overrun
- **Prodotto Software**= codice+ documentazione associata
- **Artefatto**= prodotto intermedio generato durante il processo di sviluppo(non solo codice)
- **Sistema Software**= insieme organizzato di prodotti o componenti software che lavorano insieme

- **Cliente**: chi richiede il prodotto
- **Sviluppatore**: chi lo realizza
- **Utente**: chi lo utilizza
- quando **cliente=sviluppatore** si dice Software interno
- quando **cliente != sviluppatore** si dice Software a contratto
#### Affidabilità hardware e software
Si vuole distinguere la differenza tra le due affidabilità che manifestano guasti di tipo differente:
- Hardware
	- si guasta fisicamente per usura rottura o deterioramento
		- dopo una sostituzione riprende una condizione simile a prima
- Software
	- si guasta sulla base di difetti già presenti o introdotti con nuove modifiche
	- non si consuma fisicamente

Guasto Hardware si può vedere dal grafico come ci sia mortalità infantile per difetti grossi, poi si stabilizza poi si guasta per usura

![[GPT PREMIUMS/14_agosto_appunti/assets/p003-fig-001.png|254]]

Guasto Software invece si nota come ad ogni modifica aumenta la possibilità di avere guasti ma poi scende, non segue la curva ideale

![[GPT PREMIUMS/14_agosto_appunti/assets/p003-fig-002.png|255]]
#### Le problematiche del Software
Ci sono alcuni problemi legati alla produzione del software ma si dividono principalmente in:
- ***Accidentali***
	- difficoltà dovute agli strumenti usati per sviluppare il software
- ***Essenziali***
	- non dipendono dagli strumenti usati sono caratteristiche intrinseche
	- **Complessità**
		- diviso in troppe componenti che interagiscono o troppe righe di codice fatte male
	- **Conformità**
		- dovuto ad una scarsa adattabilità con protocolli già presenti o con hardware già presente
	- **Cambiabilità**
		- software che va modificato di frequente ma con scarsa progettazione=problemi
	- **Invisibilità**
		- problematiche nel ragionare su un software invisibile, non è un edificio
#### Aspetti economici
il costo del software può essere descritto da
$$C = aS^2$$
dove:
- *C*=costo
- *S*=dimensione del sistema espressa in linee di codice(LOC) o complessità
- *a*=costante legata alla produttività del team
la dimensione di un sistema se raddoppiata fa quadruplicare l'effort necessario
#### Il Ciclo di Vita del Software
Intervallo di tempo che va dalla nascita dell'esigenza di realizzarlo fino alla sua dismissione si divide in 3 stadi:
##### Sviluppo
Fase di effettivo sviluppo del software si descrive meglio con 6 fasi:
- **Requisiti**
	- si stabilisce cosa deve fornire il software rispetto alle necessità del cliente, vincoli ecc...
- **Specifica**
	- si riscrivono i requisiti in modo migliore
- **Pianificazione**
	- Come organizzare il progetto
- **Codifica**
	- scrittura del codice
- **Integrazione**
	- si combinano tutte le parti realizzate per formare il prodotto completo

più tardi viene individuato un errore o viene richiesta una modifica, **maggiore sarà il costo necessario per intervenire**
dopo il rilascio, a costare circa **60-100 volte di più**

##### Manutenzione
Dopo lo sviluppo si modificano parti del prodotto durante il periodo in cui viene utilizzato, comporta gran parte dei costi
La manutenzione si divide in 4 tipologie:
- **Correttiva**
	- elimina difetti che potrebbero creare comportamenti errati
- **Adattiva**
	- modifiche per l'ambiente, es: hardware diverso
- **Perfettiva**
	- aggiungere nuove funzionalità
- **Preventiva**
	- migliorare la possibilità di manutenere il software
##### Dismissione
momento in cui il prodotto viene ritirato e non più utilizzato per diverse ragioni

***Regola 10-90***
- in software grandi si dice che
	- il **90% del tempo** è **dedicato** al **10% delle istruzioni** disponibili(parte detta come nucleo)
- l'importanza di un difetto dipende quindi dalla sua localizzazione
#### Affidabilità, Disponibilità e Sistemi Critici
Per **affidabilità** intendiamo la **probabilità** che quel prodotto software **funzioni** in un certo **intervallo di tempo** detto **mission time** seguendo certe **condizioni di utilizzo**

Si definisce quella che è la *catena dell'errore*:
- ***Errore Umano***
	- tipo sviluppatore che scrive una cosa in modo sbagliato
- ***Difetto***
	- anomalia che rimane nel prodotto dopo un errore umano
- ***Guasto***
	- comportamento scorretto che avviene se presente un difetto

Seguendo la regola 10-90, se un difetto si trova al di fuori del nucleo (in codice poco o mai eseguito), esso rimane un **difetto latente** e il guasto potrebbe non manifestarsi.

Per **Profilo Operativo** si intende **l'insieme** delle **funzioni usate** e della **frequenza** con cui vengono forniti gli **input**
- ogni profilo operativo è diverso e **mostra affidabilità differenti**

Per **Disponibilità** si intende la **percentuale di tempo** in cui il software è **utilizzabile** ed operativo calcolata come
$$\text{Availability} = \frac{\text{MTBF}}{\text{MTBF} + \text{MTTR}}$$
dove:
- **MTBF** (*Mean Time Between Failures*): tempo medio tra un guasto e il successivo
- **MTTR** (*Mean Time To Repair*): tempo medio necessario per riparare e ripristinare il sistema

Per **Software Critico** si intende un Software che se fallisce causa
- *Safety-Critical*: rischio per vite umane(es: dispositivi medici)
- *Mission-Critical*: blocco delle attività o del business(es: sistemi bancari)



### Modelli di Ciclo di Vita e Processi Software
