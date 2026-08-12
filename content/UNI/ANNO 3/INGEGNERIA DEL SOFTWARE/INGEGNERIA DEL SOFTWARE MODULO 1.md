##### Definizione di ingegneria del software
L'ingegneria del software è la disciplina per la produzione del software secondo i principi dell'ingegneria, in particolare sotto il punto di vista di progettazione e validazione.
È essenziale per trasformare il software in un prodotto industriale
Gli obiettivi principali sono:
- fornire metodi e tecnologie per inquadrare la produzione del software come disciplina ingegneristica;
- presentare il processo software attraverso tecniche di produzione moderne.

L'assenza di principi di ingegneria del software può portare a:
- scarsa qualità del prodotto;
- scarsa competitività;
- *cost overrun*;
- *time overrun*.

### Origine della disciplina

Il termine **Software Engineering** fu coniato nel 1968 durante la conferenza NATO di Garmisch.

L'obiettivo era inquadrare il software all'interno di una disciplina ingegneristica, riconoscendo che la programmazione:
- non è soltanto scienza;
- non è soltanto matematica;
- comporta la costruzione di un prodotto.

Storicamente, per anni la produzione del software è stata vista dai costruttori di hardware come:
- un'attività banale basata sulla sola abilità di programmazione;
- una branca della teoria della programmazione.

Parnas, nel 1997, descrive il rapporto storico tra teoria della programmazione e principi dell'ingegneria come un **"matrimonio non consumato"**:
- gli ingegneri devono conoscere la teoria;
- gli informatici teorici devono conoscere i principi ingegneristici.

>[!question]- Che cos'è l'Ingegneria del Software e perché è necessaria?
> >[!done]- la risposta
> > L'Ingegneria del Software è la disciplina che applica principi ingegneristici alla produzione del software, in particolare progettazione e validazione, rendendolo un prodotto industriale. La mancanza di tali principi può portare a scarsa qualità, scarsa competitività e sforamenti di costi e tempi.
## Prodotto, Artefatto, Codice e Sistema Software

### Def Prodotto Software
Un **Prodotto Software**, o **Software**, è composto da:
- codice;
- documentazione.

### Def Artefatto
Un **Artefatto** è un prodotto software intermedio.

Che può essere:
- documento dei requisiti;
- documento di specifica;
- documento di progetto.

### Def Codice
Il **Codice** è il prodotto software finale.

### Def Sistema Software
Un **Sistema Software** è un insieme organizzato di prodotti software.

>[!question]- Si distinguano Prodotto Software, Artefatto, Codice e Sistema Software.
> >[!done]- la risposta
> > Il Prodotto Software è composto da codice e documentazione. Un Artefatto è un prodotto software intermedio, come un documento dei requisiti, di specifica o di progetto. Il Codice è il prodotto software finale. Un Sistema Software è un insieme organizzato di prodotti software.

## Aspetti del prodotto software

Gli aspetti del prodotto software vengono distinti in **accidentali** ed **essenziali**.

### Aspetti accidentali
Gli aspetti accidentali sono superabili con il progresso della tecnologia,
problemi o difetti nel software non legati alla natura intrinseca del software ma a situazioni temporanee
- attitudine
	- problemi legati all'inesperienza del team di sviluppo
- manutenzione
	- sfide legate alla manutenzione del software dopo il suo rilascio
- specifica e progetto
	- problemi legati a una cattiva scrittura delle specifiche
- *teaming*
	- problemi relativi alla gestione delle dinamiche di squadra

### Aspetti essenziali
Gli aspetti essenziali non sono superabili con il progresso di mezzi e conoscenze:
- complessità
	- la gestione della complessità è fondamentale per sviluppare software facilmente comprensibili manutenibili e estendibili
- conformità
	- capacità del software di rispettare standard, linee guida, specifiche requisiti di sicurezza ecc...
- cambiabilità
	- la capacità di apportare modifiche al software senza dover riscrivere tutto
- invisibilità
	- gli utenti finali devono interagire con l'interfaccia utente del software, non con la complessità interna del sistema

## Costo e dimensione del software

Il costo di produzione cresce con il quadrato della dimensione del prodotto:

$$
C = aS^2
$$

- $C$ = costo;
- $S$ = *size* del prodotto;
- $a$ = coefficiente della relazione.

Conseguenza:
- produrre due prodotti di dimensione dimezzata costa meno che produrre un unico prodotto intero.

Un'altra caratteristica economica importante è che:
- produrre una replica del software non comporta alcun costo.

### Dimensione, prezzo e mercato

Se la dimensione del prodotto raddoppia, a parità delle altre condizioni indicate:
- a parità di ampiezza del mercato:
    - il prezzo deve essere quattro volte superiore;
- a parità di prezzo:
    - il mercato deve essere quattro volte più grande.

>[!question]- Come varia il costo del software rispetto alla sua dimensione?
> >[!done]- la risposta
> > Il costo è proporzionale al quadrato della dimensione, secondo la relazione $C=aS^2$. Per questo produrre due prodotti di dimensione dimezzata costa meno che produrne uno intero. Inoltre, produrre una replica del software non comporta costo.

## Ciclo di Vita del Software

### Def ciclo di vita

Il ciclo di vita del software è articolato in tre stadi:

1. **Sviluppo**
2. **Manutenzione**
3. **Dismissione**

La **Produzione Software** comprende:
- sviluppo;
- manutenzione.

### Stadio di Sviluppo

Lo sviluppo consiste in sei fasi:

1. **Requisiti**
	- identificare e definire i requisiti del software
2. **Specifiche**
    - Analizzare e definire in dettaglio i requisiti raccolti
3. **Pianificazione**
	- Definire il processo di sviluppo con anche tempi e risorse
4. **Progetto**
	- creare progetti per l'architettura e il design del software
    - preliminare;
    - dettagliato;
5. **Codifica**
	- scrittura del codice sorgente
6. **Integrazione**
	- integrare i moduli o componenti del software in un unica soluzione
### Stadio di Manutenzione
- Correggere e Gestire eventuali problemi nel software dopo il rilascio
La manutenzione rappresenta una parte molto rilevante del ciclo di vita:
- copre circa il **60% dei costi** dell'intero ciclo di vita.
### Stadio di Dismissione
Stadio che coinvolge la rimozione del software obsoleto o non più supportato


### Effetto delle modifiche

L'effetto di una modifica dipende dalla fase in cui viene introdotta.

Quando una modifica viene introdotta in fasi avanzate può comportare:
- rivolgimenti;
- necessità di nuove risorse;
- correzioni importanti;
- costi supplementari.

Se si svolge una modifica durante la fase dei requisiti, la correzione costerà 1; se invece avviene tra la fase di pianificazione e progettazione, costerà tra 1.5 a 6 volte; se avviene dopo il rilascio, costerà tra le 60 e 100 volte
![[5928463e_p8_i1.png|400]]

>[!question]- Si descrivano gli stadi del ciclo di vita e le fasi dello sviluppo.
> >[!done]- la risposta
> > Il ciclo di vita comprende Sviluppo, Manutenzione e Dismissione. La Produzione Software comprende sviluppo e manutenzione. Lo sviluppo è composto da sei fasi: requisiti, specifiche o analisi dei requisiti, pianificazione, progetto preliminare e dettagliato, codifica e integrazione.

## Testing, Verification e Validation

Il ***testing*** non è una fase separata:
- accompagna l'intero sviluppo;
- viene svolto attraverso:
    - *verification*;
    - *validation*.
### Verification

La ***Verification*** ha luogo alla fine di ogni fase.

Serve ad accertare se la fase è stata svolta correttamente:

> *Are we building the product right?*

### Validation

La ***Validation*** si svolge alla fine dello sviluppo.

Serve ad accertare se il prodotto finale è quello corretto:

> *Are we building the right product?*

La distinzione quindi è:
- *Verification*:
    - riguarda la correttezza dello svolgimento delle singole fasi;
- *Validation*:
    - riguarda il prodotto finale alla conclusione dello sviluppo.

>[!question]- Qual è la differenza tra Verification e Validation?
> >[!done]- la risposta
> > La Verification viene svolta alla fine di ogni fase e controlla se quella fase è stata eseguita correttamente: "are we building the product right?". La Validation avviene alla fine dello sviluppo e controlla se il prodotto finale è quello giusto: "are we building the right product?".

## Defect Removal Efficiency

### Def DRE
La **Defect Removal Efficiency (DRE)** indica la percentuale di difetti trovati prima del rilascio rispetto al numero totale di difetti.

Nel totale vengono considerati:
- i difetti trovati prima del rilascio;
- i difetti trovati dagli utenti in un intervallo standard successivo al rilascio.

Il valore medio della DRE negli Stati Uniti, aggiornato al 2016, è:
- **92%**.

Il valore può variare in funzione del modello di ciclo di vita.

>[!question]- Che cosa misura la Defect Removal Efficiency?
> >[!done]- la risposta
> > La DRE misura la percentuale dei difetti trovati prima del rilascio rispetto ai difetti totali, includendo nel totale anche quelli individuati dagli utenti in un intervallo standard dopo il rilascio. Il valore medio indicato per gli Stati Uniti, aggiornato al 2016, è del 92%, ma varia con il modello di ciclo di vita.

## Ruoli nella produzione e nell'uso del software

Nel contesto di un prodotto software si distinguono tre soggetti:

- **cliente**
    - ordina il prodotto software;
- **sviluppatore**
    - produce il prodotto software;
- **utente**
    - usa il prodotto software.

### Software interno e software a contratto

La relazione tra cliente e sviluppatore permette di distinguere:

| Tipologia | Cliente | Sviluppatore |
| --- | --- | --- |
| **software interno** | coincide con lo sviluppatore | coincide con il cliente |
| **software a contratto** | soggetto distinto | soggetto distinto dal cliente |

>[!question]- Qual è la differenza tra software interno e software a contratto?
> >[!done]- la risposta
> > Nel software interno cliente e sviluppatore coincidono. Nel software a contratto, invece, cliente e sviluppatore sono soggetti differenti.

## Affidabilità Software

### Def Reliability

L'***affidabilità*** (*reliability*) può essere espressa a due livelli:

- **informalmente**
    - è la credibilità del prodotto software;
- **formalmente**
    - è la probabilità che il prodotto software lavori correttamente in un determinato intervallo temporale.

Intuitivamente:
- un prodotto con molti difetti è poco affidabile;
- l'affidabilità migliora man mano che il numero di difetti viene ridotto.

>[!question]- Come si definisce formalmente l'affidabilità software?
> >[!done]- la risposta
> > Formalmente, l'affidabilità software è la probabilità che il prodotto lavori correttamente in un determinato intervallo temporale. In modo informale può essere vista come la credibilità del prodotto.

## Errore, Difetto e Guasto

I tre concetti sono collegati ma non coincidono.

### Def errore
Un **errore** è l'azione errata di chi introduce un difetto nel prodotto software.

Può derivare, per esempio, da:
- ignoranza;
- distrazione.

### Def defect
Un **difetto** (*defect*) è un'anomalia presente in un prodotto software.

### Def failure
Un **guasto** (*failure*) è il comportamento anomalo del prodotto software dovuto alla presenza di un difetto.

La relazione è:

```text
errore → difetto → guasto
```

- l'errore introduce il difetto;
- il difetto può causare il guasto.

>[!question]- Si distinguano errore, difetto e guasto.
> >[!done]- la risposta
> > L'errore è l'azione errata che introduce un difetto nel prodotto software. Il difetto è un'anomalia presente nel prodotto. Il guasto è il comportamento anomalo del software dovuto alla presenza di un difetto. La relazione è quindi errore → difetto → guasto.

## Affidabilità osservata e difetti latenti

La relazione tra:
- affidabilità osservata;
- numero di difetti latenti (difetti presenti ma non ancora scoperti);

non è semplice.

Eliminare un difetto non produce sempre lo stesso miglioramento dell'affidabilità.

In particolare:
- eliminare difetti presenti in parti del prodotto raramente utilizzate ha piccoli effetti sull'affidabilità osservata;
- il miglioramento ottenuto dipende dalla localizzazione del difetto.

## Regola 10-90

Secondo la **regola 10-90**:
- il **90% del tempo di esecuzione totale** viene speso eseguendo;
- soltanto il **10% delle istruzioni**.

Questo 10% delle istruzioni costituisce il *core*, cioè il nucleo del programma.

Di conseguenza, l'effetto dell'eliminazione di un difetto sull'affidabilità dipende anche dalla sua posizione:
- se il difetto appartiene al *core*;
- se il difetto si trova fuori dal *core*.

>[!question]- Che cosa afferma la regola 10-90 e perché è rilevante per l'affidabilità?
> >[!done]- la risposta
> > La regola 10-90 afferma che il 90% del tempo di esecuzione totale viene speso eseguendo soltanto il 10% delle istruzioni, chiamato core del programma. Per questo il miglioramento dell'affidabilità ottenuto eliminando un difetto dipende dalla sua localizzazione e, in particolare, dal fatto che appartenga o meno al core.

## Operational Profile

### Def operational profile
L'***operational profile*** descrive come viene usato il prodotto software.

L'affidabilità osservata dipende dal profilo operativo:
- utenti differenti possono usare lo stesso software in modi diversi;
- quindi possono esercitare parti differenti del prodotto;
- un difetto può manifestarsi per un utente e non per un altro.

Conseguenza:
- l'affidabilità dipende anche dall'utente.

>[!question]- Perché l'affidabilità software dipende dall'utente?
> >[!done]- la risposta
> > L'affidabilità osservata dipende dall'operational profile, cioè da come il prodotto viene utilizzato. Utenti diversi possono avere profili operativi diversi, quindi un difetto può manifestarsi per un utente e non per un altro. Per questo l'affidabilità dipende anche dall'utente.

## Guasti Hardware e Software

Hardware e software possono entrambi manifestare guasti, ma la natura dei difetti è diversa.

### Software

I guasti software sono dovuti alla presenza di difetti nei programmi.

Il punto fondamentale è che:
- il software **non si consuma**;
- i difetti software sono *latenti*;
	- nascosti finché non si presentano
- se non vengono corretti, possono continuare a causare guasti del sistema.

### Hardware

I guasti hardware sono quasi sempre collegati ai componenti fisici:
- consumo;
- deterioramento;
- comportamento diverso da quello specificato;
- rottura.

Esempi di difetti hardware:
- alterazione di un resistore;
- condensatore in corto;
- porta logica bloccata:
    - su `1`;
    - su `0`.

### Conseguenza sulle metriche

A causa della differenza tra gli effetti dei difetti hardware e software:
- le metriche usate per l'affidabilità hardware **non sono estensibili al software**.

>[!question]- Perché le metriche di affidabilità hardware non possono essere estese direttamente al software?
> >[!done]- la risposta
> > I guasti hardware sono quasi sempre legati a consumo, deterioramento o rottura dei componenti, mentre i guasti software derivano da difetti latenti nei programmi e il software non si consuma. Poiché gli effetti dei difetti sono diversi, le metriche di affidabilità hardware non sono estensibili al software.

## Riparazione Hardware vs Software

Anche l'effetto della riparazione è diverso.

### Riparazione Hardware

Per riparare un difetto hardware:
- si sostituisce il componente difettoso.

Dopo la riparazione:
- l'affidabilità dell'hardware torna ai livelli originali.

### Riparazione Software

Dopo una riparazione del software:
- l'affidabilità può aumentare;
- l'affidabilità può anche diminuire.

Quindi, mentre la sostituzione del componente hardware riporta l'affidabilità al livello originale, una modifica software non garantisce automaticamente un aumento dell'affidabilità.

## Obiettivi di affidabilità

### Hardware: stabilità

L'obiettivo dell'affidabilità hardware è la **stabilità**:
- mantenere costante la frequenza di guasto.

### Software: reliability growth

L'obiettivo dell'affidabilità software è la **crescita dell'affidabilità**:
- far decrescere la frequenza di guasto.

| Aspetto | Hardware | Software |
| --- | --- | --- |
| origine tipica dei guasti | consumo, deterioramento, comportamento non conforme o rottura dei componenti | difetti latenti nei programmi |
| consumo | i componenti possono consumarsi | il software non si consuma |
| riparazione | sostituzione del componente difettoso | modifica del software |
| effetto della riparazione | affidabilità riportata al livello originale | affidabilità può aumentare o diminuire |
| obiettivo | stabilità della frequenza di guasto | diminuzione della frequenza di guasto |

>[!question]- Si confrontino gli obiettivi di affidabilità di hardware e software.
> >[!done]- la risposta
> > Per l'hardware l'obiettivo è la stabilità, cioè mantenere costante la frequenza di guasto. Per il software l'obiettivo è invece la crescita dell'affidabilità, ottenuta facendo diminuire la frequenza di guasto.

## Frequenza di guasto nel tempo

### Hardware

L'andamento della frequenza di guasto hardware nel tempo è influenzato da due fenomeni:
1. manifestazione di malfunzionamenti inziali
    - indicata come *mortalità infantile*;
2. usura nel tempo che fa aumentare la frequenza di guasto
![[p006-fig-001.png|600]]
### Software
La frequenza di guasto software è influenzata:
1. da una curva che parte con una frequenza di guasto molto alta in corrispondenza del lancio
2. il tutto si stabilizza dopo le correzioni alle modifiche ma 
3. dopo le modifiche la frequenza di guasto aumenta dovuto  a effetti collaterali

la curva ideale mostra un inizio con failure rate alto ma che poi tende a 0 errori(è ideale)

![[5928463e_p31_i3.png|400]]

La differenza resta quindi legata alla diversa natura dei due prodotti:
- per l'hardware intervengono fenomeni fisici dei componenti;
- per il software l'andamento è collegato all'eliminazione dei difetti e alla manutenzione.

## Availability

### Def disponibilità
La **disponibilità** (*availability*) del software è la percentuale del tempo in cui il software è risultato usabile nel corso della propria vita.

Dipende da:
- numero di guasti che si verificano;
- tempo necessario per ripararli.

### Importanza di Reliability e Availability

*Reliability* e *availability* sono cruciali nei sistemi in cui una caduta del servizio può causare:
- perdite economiche;
- perdite sociali;
- rischi di sicurezza.

>[!question]- Da quali fattori dipende la disponibilità del software?
> >[!done]- la risposta
> > La disponibilità è la percentuale del tempo in cui il software è risultato usabile nel corso della sua vita. Dipende dal numero di guasti che si verificano e dal tempo necessario per ripararli.

## Evoluzione della produzione del software

La produzione del software è passata attraverso tre fasi:
1. **abilità individuale**;
2. **fase artigianale**;
3. **fase industriale**.

Il termine **Ingegneria del Software** fu coniato nel 1968 durante la conferenza NATO di Garmisch.

### Definizione IEEE

Lo standard **IEEE Std. 610.12 (1990)** definisce l'Ingegneria del Software come l'applicazione di un approccio:
- sistematico;
- disciplinato;
- misurabile;

a:
- sviluppo;
- esercizio;
- manutenzione del software.

## Configurazione e caratteristiche del software

Il software è una configurazione di:
- programmi;
- documenti;
- dati multimediali.

Le caratteristiche indicate sono:
- deve essere ingegnerizzato;
- non si consuma;
- è complesso;
- è invisibile;
- si conforma;
- cambia.

## Scopi dei metodi di Software Engineering

I metodi e le tecniche di ingegneria del software servono a:
- assicurare la qualità;
- controllare il budget;
- gestire sistemi *legacy*;
- evitare ritardi;
- applicare nuove tecnologie.

>[!question]- Come viene definita l'Ingegneria del Software dallo standard IEEE Std. 610.12?
> >[!done]- la risposta
> > È definita come l'applicazione di un approccio sistematico, disciplinato e misurabile allo sviluppo, esercizio e manutenzione del software.

## Miti del Software

Tra i miti da sfatare rientrano le convinzioni che:
- aumentare il numero di programmatori risolva i ritardi;
- descrizioni generiche siano sufficienti;
- il lavoro finisca con il *deploy*;
- la qualità possa essere valutata soltanto alla fine;
- l'Ingegneria del Software sia costosa e rallenti la produzione.

>[!question]- Quali miti sul software vengono indicati?
> >[!done]- la risposta
> > I miti indicati sono che aggiungere programmatori risolva i ritardi, che bastino descrizioni generiche, che il lavoro termini con il deploy, che la qualità si possa valutare solo alla fine e che l'Ingegneria del Software sia costosa e rallenti la produzione.

# Capitolo 2 — Software Process
### Def processo software
Il **processo software** è la serie di attività necessarie alla realizzazione di un prodotto software:
- nei tempi previsti;
- con i costi previsti;
- con le caratteristiche di qualità desiderate.

All'interno del processo software:
- si applicano metodi, tecniche e strumenti;
- si producono prodotti:
    - intermedi;
    - finali;
- si stabilisce il controllo gestionale del progetto;
- si garantisce la qualità;
- si governano le modifiche.

Il processo software segue un ciclo di vita articolato in stadi e fasi.

### Def ciclo di vita
Il **ciclo di vita del software** è l'intervallo di tempo compreso tra l'istante in cui nasce l'esigenza di costruire un prodotto software e l'istante in cui il prodotto viene dismesso.

Il ciclo di vita è articolato in tre stadi:
- **sviluppo**;
- **manutenzione**;
- **dismissione**.
##### Stadio di Sviluppo
Nello stadio di sviluppo si distinguono due tipi di fasi:
- **fasi di definizione**
    - riguardano *che cosa* il software deve fornire;
    - comprendono:
        - definizione dei requisiti;
        - produzione delle specifiche.
- **fasi di produzione**
    - definiscono *come* realizzare quanto stabilito nelle fasi di definizione;
    - comprendono:
        - progettazione del software;
        - codifica;
        - integrazione;
        - rilascio al cliente.

Nel complesso, il ciclo di vita include:
- definizione dei requisiti;
- specifica;
- pianificazione;
- progetto preliminare;
- progetto dettagliato;
- codifica;
- integrazione;
- *testing*;
- uso;
- manutenzione;
- dismissione.

Le fasi possono sovrapporsi ed essere eseguite in modo iterativo. Durante **ogni fase** viene effettuato il *testing* di ciò che è stato prodotto attraverso tecniche di *Verification & Validation* (V&V) sui prodotti intermedi e sul prodotto finale.

##### Stadio di Manutenzione
Lo stadio di manutenzione supporta il software già realizzato e può comprendere al proprio interno fasi di definizione e di produzione.

| Tipo           | Scopo                                                                                                                            |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **correttiva** | eliminare i *fault* che producono *failure* del software                                                                         |
| **adattativa** | adattare il software ai cambiamenti dell'ambiente operativo per cui è stato sviluppato                                           |
| **perfettiva** | estendere il software per accomodare funzionalità aggiuntive                                                                     |
| **preventiva** | effettuare modifiche che rendano più semplici correzioni, adattamenti e migliorie (indicata anche come *software reengineering*) |
- **Stadio di Dismissione:** Questo stadio coinvolge la rimozione del software obsoleto o non più supportato. 


>[!question]- Si descrivano i tre stadi del ciclo di vita del software e la distinzione interna allo sviluppo.
> >[!done]- la risposta
> > Il ciclo di vita comprende sviluppo, manutenzione e dismissione. Nello sviluppo si distinguono fasi di definizione, che stabiliscono che cosa il software deve fornire attraverso requisiti e specifiche, e fasi di produzione, che stabiliscono come realizzarlo attraverso progettazione, codifica, integrazione e rilascio.

### Def modello del ciclo di vita
Il **modello del ciclo di vita del software** specifica la serie di fasi attraverso cui il prodotto software progredisce, l'ordine con cui tali fasi devono essere eseguite e il percorso dalla definizione dei requisiti fino alla dismissione. La scelta del modello dipende da natura dell'applicazione, maturità dell'organizzazione, metodi e tecnologie utilizzati ed eventuali vincoli imposti dal cliente.
i modelli vengono definiti dal seguente sistema di rappresentazione
RETTANGOLI = attività/fasi di sviluppo 
FRECCE CONTINUE = attività condotte in fase sviluppo 
FRECCE TRATTEGGIATE = attività condotte in fase di manutenzione

L'assenza di un modello di ciclo di vita corrisponde alla modalità **Build & Fix** (*Fix-it-later*):
- il prodotto software viene sviluppato;
- successivamente viene rilavorato;
- la rilavorazione continua fino a soddisfare le necessità del cliente.
Questa è una modalità di sviluppo molto costosa e poco utilizzata. BUILD FIRST VERSION = codifica prodotto 
MODIFY UNTIL CLIENT IS SATISFIED = prodotto rilasciato al cliente e rilavorato fino a quando il cliente non è soddisfatto 
OPERATION MODE = prodotto entra in modalità operativa quando è accettato dal cliente 
RETIREMENT = prodotto viene dismesso
![[p007-fig-003.jpeg|600]]

### Modello Waterfall
Il **Waterfall** è un modello sequenziale del ciclo di vita del software, nel quale lo sviluppo procede attraverso una successione ordinata di fasi. Ogni fase produce risultati che vengono controllati prima di procedere a quella successiva.

Qui il cliente se presente viene interrogato solo all'inizio e alla fine del processo di sviluppo

Le principali fasi rappresentate nel modello sono:


![[p008-fig-004.png|600]]

- **Requirements phase**
    - vengono individuati e definiti i requisiti del sistema;
    - al termine della fase viene effettuata una **verification**.
- **Specification phase**
    - i requisiti vengono trasformati in una specifica più precisa del comportamento atteso del sistema;
    - anche questa fase è seguita da **verification**.
- **Design phase**
    - viene progettata la soluzione software necessaria a realizzare quanto specificato
    - il risultato del design viene sottoposto a **verification**.
- **Implementation phase**
    - il progetto viene tradotto in codice;
    - il software implementato viene sottoposto a **test**.
- **Integration phase**
    - le diverse parti del sistema vengono integrate;
    - il sistema integrato viene nuovamente sottoposto a **test**.
- **Operations mode**
    - il sistema entra in esercizio e viene utilizzato nel suo ambiente operativo.
- **Retirement**
    - il sistema viene infine dismesso quando termina il suo ciclo di vita.

Un aspetto importante del modello mostrato è che la sequenzialità non significa assenza completa di ritorni alle fasi precedenti. Durante lo sviluppo sono possibili correzioni verso la fase immediatamente precedente, mentre durante la **maintenance** una modifica può richiedere di tornare a Implementation, Design, Specification o Requirements.

##### Verification and Validation
Nel modello Waterfall, il processo di *V&V* avviene alla fine di ciascuna fase, prima di passare alla successiva. Lo scopo di questo processo è quello di individuare eventuali errori o problemi prima che diventino problemi più significativi nelle fasi successive dello sviluppo.

- La verifica è il processo di conferma che il software è stato sviluppato in conformità con i requisiti specificati e che è stato eseguito correttamente. Coinvolge il controllo e la revisione dei prodotti software per identificare errori, difetti o discrepanze rispetto ai requisiti stabiliti.
- La validazione è il processo di conferma che il software soddisfi effettivamente le esigenze dell'utente e sia in grado di funzionare in modo efficace nell'ambiente operativo previsto. Si concentra sulla comprensione delle esigenze dell'utente e sulla verifica che il software risponda a tali esigenze.

![[FOTOIS/d234c4c9_p7_i1.png|500]]
### Software Prototyping

Il _**software prototyping**_ consiste nello sviluppo rapido di una versione semplificata e funzionante del software, detta **prototipo**, con lo scopo principale di comprendere meglio e validare i requisiti del sistema.

Il prototipo permette infatti a clienti, utenti e sviluppatori di interagire con una rappresentazione concreta del sistema prima che il prodotto definitivo sia completato.

![[FOTOIS/d234c4c9_p12_i1.png|500]]

Il prototipo interviene soprattutto in due attività legate ai requisiti:
- _**requirements elicitation**_
    - gli utenti possono sperimentare direttamente con il prototipo;
    - osservando il suo comportamento, riescono a comprendere meglio ciò di cui hanno realmente bisogno;
    - possono quindi emergere nuovi requisiti oppure requisiti inizialmente poco chiari.
        
- _**requirements validation**_
    - il prototipo permette di verificare concretamente se i requisiti raccolti corrispondono alle esigenze degli utenti;
    - rende più facilmente visibili **errori, omissioni, incomprensioni o requisiti poco chiari**.

Il _prototyping_ può quindi essere considerato un'attività di **riduzione del rischio**, soprattutto rispetto ai rischi dovuti a requisiti incompleti, errati o mal compresi.

### Rapid Prototyping Model
Il **Rapid Prototyping Model** è un approccio allo sviluppo software basato sulla creazione rapida e iterativa di prototipi, che vengono mostrati al cliente o agli utenti per raccogliere feedback e comprendere progressivamente meglio i requisiti

![[p009-fig-005.png|450]]

È particolarmente utile quando i requisiti:
- non sono ancora completamente definiti;
- sono poco chiari;
- possono cambiare durante lo sviluppo.
Il processo procede attraverso cicli successivi:
1. **Definizione dei requisiti iniziali**
    - vengono raccolti i requisiti conosciuti inizialmente;
    - non è necessario che siano già completi o estremamente dettagliati.
2. **Creazione del prototipo**
    - viene realizzata rapidamente una versione semplificata del sistema;
    - il prototipo implementa principalmente gli aspetti necessari per permettere agli utenti di valutarlo.
3. **Valutazione e feedback**
    - il prototipo viene mostrato agli utenti o al cliente;
    - gli _stakeholder_ possono valutarne comportamento, funzionalità e caratteristiche;
    - dal loro utilizzo emergono eventuali problemi, esigenze mancanti o incomprensioni.
    -  Gli *stakeholder* sono individui, gruppi o entità che hanno un interesse o un coinvolgimento nel processo di sviluppo del software
4. **Raffinamento**
    - il prototipo viene modificato sulla base del feedback ricevuto;
    - requisiti e funzionalità possono essere chiariti, aggiunti oppure modificati.
5. **Iterazione**
    - il ciclo **prototipo → valutazione → feedback → raffinamento** viene ripetuto più volte;
    - ad ogni iterazione aumenta la comprensione del sistema desiderato.

> Il punto centrale del Rapid Prototyping non è quindi realizzare immediatamente il prodotto definitivo, ma **imparare rapidamente dai prototipi e dal feedback degli utenti**.

***Vantaggi del prototyping***
L'utilizzo di prototipi può:
- **rendere visibili i fraintendimenti**
    - utenti e sviluppatori possono accorgersi rapidamente di avere interpretazioni diverse dello stesso requisito;
- **individuare servizi mancanti o poco chiari**
    - utilizzando il prototipo possono emergere funzionalità necessarie che non erano state inizialmente considerate;
- **fornire precocemente un sistema funzionante**
    - gli utenti possono vedere e utilizzare una versione concreta del sistema già nelle prime fasi dello sviluppo;
- **supportare la definizione della specifica software**
    - l'esperienza ottenuta tramite il prototipo può aiutare a definire in maniera più precisa il comportamento richiesto al sistema;
- **supportare il training degli utenti**
    - il prototipo può essere utilizzato per familiarizzare gli utenti con il futuro sistema;
- **supportare il testing**
    - permette di effettuare valutazioni e test preliminari prima della realizzazione completa del prodotto.
***Limiti del prototipo come specifica***

Un prototipo può aiutare a costruire la specifica del sistema, ma **non dovrebbe essere considerato automaticamente una specifica completa**.
In particolare:
- alcuni requisiti possono essere difficili o impossibili da rappresentare tramite un prototipo;
    - ad esempio aspetti relativi a sistemi _**safety-critical**_ potrebbero non emergere adeguatamente;

- un'implementazione non possiede necessariamente lo stesso **valore formale o contrattuale** di una specifica;    

- i _**non-functional requirements**_ possono essere difficili da valutare correttamente attraverso un semplice prototipo.

Quindi il prototipo è molto utile per **scoprire, comprendere e validare i requisiti**, ma non sostituisce necessariamente una specifica completa del sistema.
>[!question]- Qual è lo scopo del software prototyping e come può aiutare nella gestione dei requisiti?
> >[!done]- la risposta
> > Il software prototyping consiste nello sviluppo rapido di software per elicitare o validare i requisiti. Durante la requirements elicitation permette agli utenti di sperimentare il sistema, mentre durante la requirements validation può far emergere errori e omissioni. Per questo viene considerato anche un'attività di riduzione del rischio legato ai requisiti.

### Def Throw-away Prototyping
Nel **Throw-away Prototyping** viene realizzato un prototipo pratico per aiutare a individuare problemi nei requisiti. Il flusso fondamentale è:
1. si parte da un requisito iniziale;
2. si sviluppa il *throw-away prototype*;
3. il prototipo viene consegnato per la sperimentazione;
4. dopo la sperimentazione viene scartato;
5. il prodotto viene sviluppato tramite un altro processo di sviluppo.

![[FOTOIS/d234c4c9_p15_i3.png|600]]

Il *throw-away prototype* **non deve essere considerato un prodotto finale**. Nel prototipo:
- alcune caratteristiche del prodotto possono essere state omesse;
- non esiste una specifica per la manutenzione a lungo termine;
- la struttura sarà scarsamente organizzata e difficile da mantenere.
- può essere impossibile adattarlo ai *non-functional requirements*;
	- potrebbe non soddisfare funzionalità cruciali come scalabilità prestazioni e sicurezza
- è privo di documentazione;
- potrebbero non essere stati applicati i normali standard di qualità.

>[!warning]
> *Throw-away* significa che il prototipo va scartato: il fatto che sia funzionante non lo rende adatto a diventare il prodotto finale.

>[!question]- Si descriva il Throw-away Prototyping e si spieghi perché il prototipo non dovrebbe essere consegnato come prodotto finale.
> >[!done]- la risposta
> > Nel Throw-away Prototyping si sviluppa rapidamente un prototipo a partire da un requisito iniziale per sperimentare e individuare problemi nei requisiti. Il prototipo viene poi scartato. Non dovrebbe diventare il prodotto finale perché può essere incompleto, privo di documentazione, difficile da mantenere e non conforme ai requisiti non funzionali.

### Rapid e Visual Programming
Per i prototipi, la rapidità di sviluppo è essenziale e può richiedere compromessi come l'omissione di funzionalità o il rilassamento di vincoli non funzionali.
La programmazione visuale rappresenta un approccio allo sviluppo software che si basa sull'uso di elementi grafici e interfacce utente per creare il codice.
Nel contesto della programmazione visuale, il prototipo viene creato mediante la progettazione di un'interfaccia utente utilizzando elementi grafici standard. I componenti vengono associati a questi elementi per definire il comportamento del prototipo.
Il *visual programming* è indicato come parte intrinseca della maggior parte dei metodi di sviluppo di prototipi.

Linguaggi di *scripting* supportano il *visual programming*, in cui il prototipo viene costruito:
1. creando una *user interface* a partire da elementi standard;
2. associando componenti a questi elementi.

Questo sviluppo è supportato da una vasta libreria di componenti adattabili.
![[FOTOIS/d234c4c9_p19_i1.png|500]]

Limiti dello sviluppo visuale:
- rende difficile coordinare uno sviluppo basato su team;
- non presenta un'architettura software esplicita;
- dipendenze complesse tra parti del programma possono creare problemi di *maintainability*.

>[!question]- Qual è il ruolo del Visual Programming nello sviluppo dei prototipi e quali problemi può introdurre?
> >[!done]- la risposta
> > Il visual programming permette di costruire rapidamente prototipi creando una user interface da elementi standard e associandovi componenti. Può però rendere difficile il coordinamento del team, non fornire un'architettura software esplicita e creare problemi di maintainability a causa di dipendenze complesse.

## Sviluppo Iterativo e Modello a Spirale

### Process Iteration
Nei progetti software grandi i requisiti evolvono durante il progetto. Per questo la ***process iteration***, la rielaborazione di stadi già affrontati, fa parte del processo. Può essere applicata a qualsiasi modello generico e permette di tornare su stadi precedenti attraverso due approcci: **Incremental Development** e **Spiral Development**.

### Modello Incrementale
Nel **Modello Incrementale** il software non viene sviluppato e consegnato tutto insieme, ma attraverso una serie di _**increment**_ o _**build**_ successivi.
Ogni incremento aggiunge nuove funzionalità al sistema e produce una versione utilizzabile del prodotto. In questo modo:
- una parte del sistema può essere già disponibile mentre il resto è ancora in sviluppo;
- gli utenti possono utilizzare gli incrementi già consegnati;
- il feedback ottenuto può influenzare gli incrementi successivi;
- gli incrementi già realizzati possono quindi svolgere anche una funzione simile a quella di un _**prototype**_.

Il modello incrementale combina quindi alcuni vantaggi del _**prototyping**_ con un processo di sviluppo più strutturato e gestibile.

È particolarmente utile quando:
- il cliente vuole osservare e verificare progressivamente l'avanzamento del prodotto;
- i requisiti possono evolvere durante lo sviluppo;
- si vuole rendere disponibile una parte funzionante del sistema prima che l'intero prodotto sia completato.
Il modello può essere applicato in due modi principali:
1. **con _overall architecture_**, definendo prima una struttura architetturale complessiva;
2. **senza _overall architecture_**, iniziando direttamente dallo sviluppo degli incrementi.
#### Con _overall architecture_
![[p011-fig-006.jpeg|600]]

In questa variante, prima di iniziare lo sviluppo dei singoli incrementi viene definita una **architettura complessiva del sistema**
L'architettura fornisce una visione generale di come sarà organizzato il prodotto finale e di come le diverse parti dovranno interagire tra loro.
- **Definizione iniziale dell'architettura**
    - viene stabilita una struttura generale del sistema prima dello sviluppo dei vari _build_.
- **Guida per gli incrementi**
    - ogni incremento viene sviluppato rispettando la struttura architetturale stabilita;
    - questo permettedi mantenere maggiore coerenza tra le diverse parti del sistema.
- **Integrazione più controllata**
    - conoscere in anticipo la struttura complessiva riduce il rischio che gli incrementi risultino difficili da integrare tra loro
- **Maggiore lavoro iniziale**
    - prima di iniziare a produrre gli incrementi è necessario dedicare tempo alla progettazione dell'architettura complessiva;
    - l'avvio dello sviluppo può quindi essere meno immediato.

L'esistenza di un'architettura iniziale **non elimina il carattere incrementale del modello**: gli incrementi vengono comunque sviluppati e consegnati progressivamente e possono essere modificati sulla base del feedback ricevuto.

#### Senza _overall architecture_

![[FOTOIS/d234c4c9_p26_i2.png|600]]

In questa variante non viene definita in anticipo una struttura architetturale completa del sistema.
Lo sviluppo inizia direttamente dai primi incrementi e la struttura complessiva emerge progressivamente insieme al prodotto.
- **Sviluppo immediato degli incrementi**
    - non è prevista una fase iniziale dedicata alla definizione completa dell'architettura;
    - si può quindi iniziare prima a realizzare funzionalità concrete.
- **Maggiore flessibilità**
    - gli incrementi possono essere adattati rapidamente all'evoluzione dei requisiti e al feedback degli utenti
- **Risultati iniziali più rapidi**
    - concentrandosi direttamente sulle funzionalità da implementare, è possibile ottenere prima una versione utilizzabile del sistema
- **Maggiore rischio architetturale**
    - non avendo una struttura complessiva di riferimento, i diversi incrementi possono essere sviluppati in modo poco coerente;
    - quando vengono combinati possono emergere maggiori difficoltà di integrazione.
- **Possibile aumento della complessità nel tempo**
    - una soluzione semplice nelle prime iterazioni può diventare più difficile da mantenere e integrare man mano che vengono aggiunti nuovi incrementi.

La differenza fondamentale tra le due varianti è quindi questa
- **con _overall architecture_** → prima si definisce una struttura generale e poi si costruiscono gli incrementi al suo interno;
- **senza _overall architecture_** → si costruiscono direttamente gli incrementi e la struttura del sistema emerge progressivamente.

In entrambi i casi, però, l'idea centrale rimane la stessa: **il prodotto cresce attraverso versioni successive e funzionanti, invece di essere realizzato interamente prima della prima consegna**


>[!question]- Si descriva il modello incrementale e si spieghi in quali situazioni risulta efficace.
> >[!done]- la risposta
> > Nel modello incrementale il prodotto viene sviluppato e consegnato attraverso incrementi successivi. Gli utenti possono sperimentare gli incrementi disponibili mentre il resto è in sviluppo, combinando i vantaggi del prototyping con un processo strutturato. È efficace quando il cliente vuole verificare l'avanzamento regolarmente e i requisiti possono cambiare.

### Modello Incrementale vs Waterfall

| Aspetto | Waterfall | Modello Incrementale |
| --- | --- | --- |
| *client feedback* | avviene solo dopo la conclusione dello sviluppo | è continuo durante lo sviluppo |
| fasi | strettamente sequenziali | possono essere condotte in parallelo |
| *detailed design* e *coding* | riguardano l'intero prodotto | vengono svolti sui singoli *build* |
| team di sviluppo | un team di grandi dimensioni | più team di piccole dimensioni |
| requisiti | vengono congelati dopo la fase di specifica | vengono divisi in classi di priorità e sono modificabili |

>[!question]- Si confrontino Waterfall e Modello Incrementale.
> >[!done]- la risposta
> > Nel Waterfall il feedback arriva alla fine, le fasi sono sequenziali, design e coding riguardano l'intero prodotto e i requisiti vengono congelati.


### Modello a Spirale

![[FOTOIS/d234c4c9_p29_i1.png|500]]
Il **Modello a Spirale** è un modello di sviluppo **iterativo e guidato dal rischio**.
L’idea fondamentale è che il software venga sviluppato attraverso una successione di **cicli**, rappresentati graficamente come giri di una spirale.
Ogni giro della spirale corrisponde a una nuova iterazione del processo:
- si definisce cosa fare;
- si analizzano i rischi;
- si sviluppa una parte del sistema;
- la si rilascia o la si rende valutabile;
- il cliente fornisce feedback;
- si pianifica il ciclo successivo.

La caratteristica più importante del modello è la **Risk Analysis**: prima di investire ulteriormente nello sviluppo, si cerca di individuare e ridurre i rischi principali del progetto.

***Attività di ogni ciclo***
Ogni iterazione comprende le seguenti attività.
- **Customer Communication**
    - viene mantenuto il confronto con il cliente o con gli utenti;
    - serve a comprendere esigenze, aspettative e problemi emersi.
- **Planning**
    - vengono pianificate le attività dell’iterazione;
    - si stabiliscono obiettivi, risorse e lavoro da svolgere.
- **Risk Analysis**
    - vengono identificati i rischi associati al progetto e alle decisioni prese;
    - si cerca di capire come eliminarli o ridurne l’impatto;
    - quando necessario, possono essere realizzati anche prototipi per chiarire aspetti incerti.
- **Engineering**
    - viene progettata e sviluppata la parte di sistema prevista per l’iterazione.
- **Construction & Release**
    - ciò che è stato sviluppato viene costruito, verificato e reso disponibile per la valutazione.
- **Customer Evaluation**    
    - il cliente valuta il risultato dell’iterazione;
    - il feedback ottenuto viene usato per influenzare il ciclo successivo.
Terminata la valutazione, si avvia una nuova iterazione della spirale.
La spirale rappresenta il fatto che il prodotto viene sviluppato **progressivamente**.
Procedendo verso l’esterno:
- aumenta il lavoro svolto sul sistema;
- aumenta il livello di definizione del prodotto;
- vengono affrontati progressivamente nuovi problemi e nuovi rischi.
Quindi ogni giro non rappresenta semplicemente “la stessa cosa ripetuta”, ma una nuova fase di evoluzione del prodotto.

Il **rischio** è l’elemento centrale del modello.
Ad ogni iterazione ci si chiede quali siano i problemi che potrebbero compromettere il progetto e si cerca di affrontarli prima di procedere.
Per questo il modello a spirale è particolarmente utile quando:
- il progetto è complesso;
- esistono molte incertezze;
- i requisiti non sono completamente definiti;
- alcune scelte tecniche sono rischiose;
- gli errori potrebbero avere conseguenze importanti o costose.
Il principio è quindi:
**identificare i rischi presto e ridurli prima di investire troppo nello sviluppo.**

Il **Modello a Spirale** combina:
- sviluppo iterativo;
- coinvolgimento del cliente;
- pianificazione progressiva;
- prototyping quando necessario;
- **analisi continua dei rischi**.

La differenza fondamentale rispetto ad altri modelli iterativi è proprio questa: **ogni iterazione viene organizzata attorno all'identificazione e alla riduzione dei rischi principali del progetto**.


**FINO A QUI**
### Risk Management
Il ***risk management*** riguarda l'identificazione dei rischi (circostanze avverse) e la definizione di piani per minimizzare il loro effetto.

I rischi si classificano in:

| Categoria        | Effetto                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| *project risks*  | influenzano la pianificazione temporale o le risorse interne come il personale                                |
| *product risks*  | influenzano la qualità o le prestazioni del prodotto in sviluppo, ritardi cambiamenti delle specifiche ecc... |
| *business risks* | influenzano l'organizzazione sul contesto commerciale, competizione obsolescenza ecc...                       |

Il processo si articola in quattro attività:
1. **risk identification**: individuare i rischi (*technology, people, organizational, tools, requirements, estimation risks*).
2. **risk analysis**: valutare ogni rischio per probabilità (da *very low* a *very high*) e serietà (*catastrophic, serious, tolerable, insignificant*).
3. **risk planning**: sviluppare piani per evitare il rischio o contromisure per evitare che si verifichi *avoidance strategies*, *minimization strategies* e *contingency plans*.
4. **risk monitoring**: controllare regolarmente l'evoluzione di probabilità ed effetti dei rischi.

![[FOTOIS/d234c4c9_p36_i1.png|600]]

>[!question]- Si descriva il processo di Risk Management e la classificazione dei rischi.
> >[!done]- la risposta
> > Il processo comprende identification (individuare i rischi), analysis (valutare probabilità e serietà), planning (creare strategie di evitamento, minimizzazione e contingenza) e monitoring (controllo continuo). I rischi si classificano in project risks, product risks e business risks.

### Altri modelli iterativi
L'**Object-Oriented** Incentrato sull'approccio di sviluppo orientato agli oggetti dove il software è progettato e strutturato intorno a oggetti classi e relazioni
- consente di creare software modulare riutilizzabile e flessibile
Il **Simultaneous / Concurrent Engineering** mira a ridurre tempo e costo di sviluppo attraverso un approccio sistematico al design integrato e concorrente. 

la progettazione delle diverse parti del prodotto e del processo **non avviene una dopo l’altra in modo isolato**, ma viene svolta in parallelo e coordinando fin dall'inizio più aspetti tra loro.
Le fasi coesistono e non sono puramente sequenziali.
Il **Formal Methods Model** (es. *Cleanroom Software Engineering*, 1987) usa una specifica matematica formale del software per eliminare l'ambiguità e facilitare la verifica dei programmi.

>[!question]- Cos'è il Concurrent Engineering e cos'è il Formal Methods Model?
> >[!done]- la risposta
> > Il Concurrent Engineering fa coesistere le fasi per ridurre tempi e costi tramite design integrato e concorrente. Il Formal Methods Model usa specifiche matematiche formali per eliminare le ambiguità e facilitare la verifica (es. Cleanroom).

## Modelli Corporate (Microsoft, Netscape)
#### Modello Microsoft — Synchronize-and-Stabilize
Dalla metà degli anni '80 Microsoft sviluppa un processo *iterative*, *incremental* e *concurrent* con l'obiettivo di:
- aumentare la qualità del software;
- ridurre tempi e costi;
- valorizzare la creatività.
L'approccio è noto come **Synchronize-and-Stabilize**.
### Principio di funzionamento
Il modello si basa su due idee centrali:
- **synchronization**
    - avviene quotidianamente;
    - utilizza *daily build*;
    - coinvolge team da 3 a 8 persone;
- **stabilization**
    - avviene periodicamente;
    - il prodotto viene stabilizzato in incrementi successivi;
    - ogni incremento corrisponde a una *milestone*;
    - la stabilizzazione non viene rimandata a un'unica fase finale.

Il ciclo di sviluppo è diviso in tre fasi:
1. **Planning**
	- vengono definiti obiettivi, specifiche e pianificazione
2. **Development**
	- suddivisione in 3 o 4 sotto progetti che una volta conclusi portano a una milestone
3. **Stabilization**
	- fare verifica e validazione del prodotto
	- testi interni ed esterni per identificare difetti
>[!question]- In cosa consiste il modello Microsoft Synchronize-and-Stabilize?
> >[!done]- la risposta
> > È un processo iterativo, incrementale e concorrente basato sulla sincronizzazione quotidiana tramite daily build e sulla stabilizzazione periodica del prodotto attraverso milestone successive. Il ciclo di sviluppo è diviso in Planning, Development e Stabilization.

#### Strategie e principi del modello Microsoft
##### Strategia per prodotto e processo
scelte organizzative usate nel modello Microsoft per decidere **che prodotto costruire e come organizzare il lavoro per costruirlo**

La ***creatività*** viene considerata un elemento essenziale.
I principi associati sono:
- dividere il progetto in 3-4 *milestone*;
- definire:
    - una *product vision*;
    - una specifica funzionale che evolve durante il progetto;
- selezionare funzionalità e priorità in base alle necessità dell'utente;
- definire un'architettura modulare per replicare la struttura del prodotto;
- assegnare task elementari;
- limitare le risorse.

***Strategia per lo sviluppo***
Lo sviluppo procede in parallelo con sincronizzazioni frequenti.
I principi sono:
- definire team paralleli;
- utilizzare *daily build*;
- avere sempre un prodotto consegnabile;
    - con versioni per ogni piattaforma;
- testare continuamente il prodotto;
- utilizzare metriche a supporto delle decisioni.

>[!question]- Quali sono i principali principi organizzativi del modello Microsoft?
> >[!done]- la risposta
> > Il progetto viene diviso in 3-4 milestone, con una product vision e una specifica funzionale evolutiva. Le funzionalità vengono prioritarizzate in base alle necessità dell'utente, si usa un'architettura modulare, si assegnano task elementari e si limitano le risorse. Lo sviluppo avviene con team paralleli, daily build, testing continuo e metriche a supporto delle decisioni.


###### SYNCH AND STABILIZE VS WATERFALL

| SYNC-AND-STABILIZE                                           | MODELLO A CASCATA                                                       |
| ------------------------------------------------------------ | ----------------------------------------------------------------------- |
| È iterativo e incrementale.                                  | È sequenziale.                                                          |
| Coinvolge milestone periodiche di stabilizzazione.           | Le fasi si susseguono in un flusso lineare.                             |
| Lavora in modo parallelo e sincronizzato.                    | Richiede il completamento di una fase prima di passare alla successiva. |
| Promuove la creatività e l'evoluzione delle specifiche.      | Si basa su specifcihe complete e fisse all'inizio.                      |
| Abbraccia il concetot di "daily build" e test continui.      | Può essere meno adattabile ai cambiamenti dei requisit.i                |
| Adatot a proget tiche richiedono flessibilità e adattamento. | Adatot a proget ticon requisiti chiari e stabili.                       |

## Modello Netscape
Netscape(azienda che ha fallito) adotta un modello **Synchronize-and-Stabilize** adattato allo sviluppo di applicazioni Internet
### Organizzazione dello sviluppo
Lo staffing prevede in media:
- 1 *tester* ogni 3 sviluppatori.
Nonostante questa organizzazione, la produttività rimane comparabile a quella di Microsoft.
### Pianificazione e documentazione
Il processo presenta:
- scarso effort di pianificazione;
    - con eccezione dei server;
- documentazione incompleta.
### Controllo del progetto
Sono presenti:
- scarso controllo sull'avanzamento;
    - affidato soprattutto all'esperienza dei *project manager*;
- scarso controllo sulla *code review*;
- pochi dati storici a supporto delle decisioni.

>[!question]- Quali caratteristiche distinguono il modello Netscape?
> >[!done]- la risposta
> > Netscape usa un modello Synchronize-and-Stabilize adattato alle applicazioni Internet.

 Ha in media un tester ogni tre sviluppatori, poco effort di pianificazione salvo sui server, documentazione incompleta, scarso controllo su avanzamento e code review e pochi dati storici per supportare le decisioni.
 
- **Fase di Sincronizzazione (Synchronize):** Durante questa fase, l'attenzione è rivolta a sviluppare e introdurre nuove funzionalità.
- **Fase di Stabilizzazione (Stabilize):** Dopo aver aggiunto le nuove funzionalità, la fase di stabilizzazione si concentra sulla risoluzione dei bug, sull'ottimizzazione delle prestazioni e sulla migliorare la qualità generale del software.

## Metodologie Agile e Scrum
### Metodi Agile
Negli anni 2000, come reazione ai processi troppo restrittivi, è emerso l'approccio **Agile**: non un singolo modello, ma un insieme di principi che guidano flessibilità, collaborazione e consegna rapida di valore.

Include:
- comunicazione intensiva;
- feedback rapido dei clienti;
- autonomia dei team con poche regole esterne.
### L'Agile Manifesto
L'**Agile Manifesto** (2001) pone maggiore importanza su 4 valori rispetto ai loro corrispettivi tradizionali:
1. **Individui e interazioni** più di *processi e strumenti*.
2. **Software funzionante** più di *documentazione esaustiva*.
3. **Collaborazione col cliente** più di *negoziazione contrattuale*.
4. **Risposta al cambiamento** più di *seguire un piano*.

Contiene anche 12 principi pratici orientati alla consegna continua e all'accettazione del cambiamento.

### Scrum
**Scrum** è un framework Agile leggero, **iterativo e incrementale**, utilizzato per affrontare problemi complessi e sviluppare prodotti attraverso piccoli cicli di lavoro successivi.

Un ***framework*** è un'infrastruttura di supporto predefinita e strutturata che fornisce un insieme di strumenti, librerie, linee guida e componenti riutilizzabili per semplificare lo sviluppo di software, applicazioni o altre soluzioni

![[FOTOIS/4f64ac69_p7_i1.png|600]]

L'idea centrale è:
- il lavoro complessivo viene organizzato in un **Product Backlog**;
- una parte del lavoro viene selezionata per un periodo breve chiamato **Sprint**;
- durante lo Sprint il team realizza uno o più **Increment** utilizzabili del prodotto;
- al termine dello Sprint il risultato e il modo di lavorare vengono valutati;
- il feedback ottenuto influenza gli Sprint successivi.

Scrum si basa quindi su un ciclo continuo di:

**pianificazione → sviluppo → controllo → adattamento**

e permette al prodotto di evolvere progressivamente invece di essere definito e realizzato completamente in un'unica fase.
#### Scrum Team
Lo **Scrum Team** è composto da:
- **Scrum Master**: assicura la corretta implementazione della metodologia e rimuove gli ostacoli.
- **Product Owner**: prioritizza i requisiti nel *Product Backlog*(con e funzionalità e le attività da realizzare).
- **Development Team**: responsabile dello sviluppo e di produrre gli incrementi funzionanti.

Lo Scrum Team è **self-managing**: decide internamente chi fa cosa, quando e come svolgere il lavoro necessario per raggiungere gli obiettivi.
#### Sprint
Lo **Sprint** è un periodo di lavoro a durata fissa, generalmente breve, durante il quale il team cerca di raggiungere uno **Sprint Goal** e produrre un Increment funzionante.

Durante lo Sprint avvengono:
1. **Sprint Planning**
    - si decide cosa realizzare nello Sprint;
    - vengono selezionati elementi dal Product Backlog.
2. **Daily Scrum**
    - breve riunione giornaliera;
    - serve a sincronizzare il lavoro e verificare i progressi.
3. **Sprint Review**
    - si mostra e valuta ciò che è stato realizzato;
    - si raccoglie feedback dagli stakeholder.
4. **Sprint Retrospective**
    - il team riflette su come ha lavorato;
    - individua possibili miglioramenti per lo Sprint successivo.
#### Artefatti
- **Product Backlog**
    - lista ordinata di tutto ciò che potrebbe essere necessario sviluppare nel prodotto.
- **Sprint Backlog**
    - parte del Product Backlog scelta per lo Sprint corrente, insieme al piano per realizzarla.
- **Increment**
    - parte di prodotto realmente completata e funzionante al termine dello Sprint.
#### Definition of Done
Scrum richiede una **Definition of Done (DoD)** per garantire alta qualità prima di integrare un work item

La **Definition of Done (DoD)** stabilisce i criteri che un lavoro deve rispettare per essere considerato realmente completato.
Ad esempio può richiedere che il codice sia implementato, integrato e testato.
#### User Stories
Le **User Stories** descrivono un requisito dal punto di vista dell'utente.
Formato tipico:
`As a <role>, I want <goal> so that <benefit>`

Le **Epics** sono User Stories troppo grandi o complesse e vengono suddivise in storie più piccole.

Sono uno strumento chiave per comprendere e soddisfare i requisiti degli utenti in modo iterativo ed efficiente

## Capability Maturity Model (CMM)
Il **Capability Maturity Model (CMM)** è un modello introdotto dal **SEI** (*Software Engineering Institute*) a partire dal 1993 per determinare il livello di maturità del processo software di un'organizzazione.

Il livello di maturità misura l'efficacia globale con cui vengono applicate le tecniche di *software engineering*.


Il CMM fornisce una scala a cinque livelli di maturità, ognuno dei quali rappresenta un grado crescente di disciplina e controllo nei processi di sviluppo.

I livelli sono cumulativi:
- ogni livello comprende anche tutte le caratteristiche definite per i livelli precedenti.

***Level 1 — Initial***
Il processo è **poco organizzato e imprevedibile**.
- non esiste un modo di lavorare stabile;
- i risultati dipendono soprattutto dall'esperienza e dalle capacità dei singoli;
- il successo è spesso legato agli "_heroes_", cioè persone particolarmente capaci che riescono a compensare le carenze del processo.

***Level 2 — Repeatable***
Vengono introdotte pratiche di **project management di base**.
- i progetti vengono pianificati e monitorati;
- vengono controllati tempi, attività e avanzamento;
- si cerca di rendere ripetibili i risultati ottenuti nei progetti precedenti.
L'obiettivo è quindi passare da un processo improvvisato a un processo **gestibile e ripetibile**.

***Level 3 — Defined***
Il processo non viene più definito solo per il singolo progetto, ma viene **standardizzato a livello di organizzazione**
- esistono procedure e modalità di lavoro definite;
- i processi vengono documentati e istituzionalizzati;
- i diversi progetti seguono una base comune.
Quindi il processo diventa **formalmente definito e condiviso**.

***Level 4 — Managed***
Il processo definito viene anche **misurato quantitativamente**.
- vengono raccolte metriche;
- si controllano qualità e prestazioni del processo;
- le decisioni vengono prese sulla base di dati misurabili.
L'organizzazione non si limita quindi a seguire un processo: **misura quanto bene sta funzionando**.

***Level 5 — Optimizing***
Il processo viene continuamente **analizzato e migliorato**.
- si cercano le cause dei problemi;
- si introducono miglioramenti;
- si adottano nuove tecniche quando utili;
- il processo viene adattato continuamente sulla base dei risultati ottenuti.
L'obiettivo finale è il **miglioramento continuo del processo software**.

>[!question]- Che cos'è il Capability Maturity Model e che cosa misura?
> >[!done]- la risposta
> > Il CMM è un modello introdotto dal Software Engineering Institute a partire dal 1993 per determinare la maturità del processo software di un'organizzazione. La maturità misura l'efficacia globale nell'applicazione delle tecniche di software engineering. La valutazione usa un questionario e cinque livelli cumulativi.

| Livello | Nome | Focus principale | Risultato |
| --- | --- | --- | --- |
| 1 | Initial | processo *ad hoc* | successo dipendente dagli "*heroes*" |
| 2 | Repeatable | *basic project management* | supervisione, tracking, pianificazione e baseline stabili |
| 3 | Defined | definizione del processo | processo definito e istituzionalizzato per il controllo della qualità |
| 4 | Managed | misurazione del processo | pianificazione della qualità e tracking del processo misurato |
| 5 | Optimizing | controllo e miglioramento | miglioramento continuo della capacità del processo |

>[!question]- Si descrivano i cinque livelli del CMM.
> >[!done]- la risposta
> > Il Level 1 Initial è ad hoc e dipende dagli heroes. Il Level 2 Repeatable introduce il basic project management con pianificazione e baseline stabili. Il Level 3 Defined definisce e istituzionalizza il processo. Il Level 4 Managed misura il processo e ne traccia qualità e andamento. Il Level 5 Optimizing punta al controllo e al miglioramento continuo della capacità del processo.

## Key Process Areas

### Def KPA
Il CMM associa a ciascun livello di maturità alcune **Key Process Areas (KPA)**, scelte tra **18 KPA definite**.

Le KPA descrivono le funzioni che devono essere presenti per garantire l'appartenenza a un determinato livello.

Ogni KPA viene descritta rispetto a:
- obiettivi;
- impegni e responsabilità da assumere;
- capacità e risorse necessarie;
- attività da implementare;
- metodi per monitorarne l'implementazione;
- metodi per verificarne l'implementazione.

>[!question]- Che cosa sono le Key Process Areas nel CMM?
> >[!done]- la risposta
> > Le KPA sono le funzioni richieste per garantire l'appartenenza a un determinato livello di maturità. Il CMM ne definisce 18 complessive e le associa ai diversi livelli. Ogni KPA specifica obiettivi, responsabilità, capacità e risorse necessarie, attività, modalità di monitoraggio e modalità di verifica.
## Classificazione dei Requisiti
#### Requisiti Software
I **requisiti software** descrivono:
- i servizi che il sistema deve fornire;
- i vincoli che il sistema e il processo di sviluppo devono rispettare.
Servono quindi a definire **cosa ci si aspetta dal software** e costituiscono la base per lo sviluppo.
#### Requisiti Utente e Requisiti di Sistema
I requisiti possono essere descritti con diversi livelli di dettaglio.
##### Requisiti Utente
I **requisiti utente** descrivono in modo generale:
- i servizi che il sistema deve fornire;
- i vincoli operativi.
Sono:
- espressi soprattutto in **linguaggio naturale**;
- eventualmente accompagnati da diagrammi;
- scritti **per e con il cliente**;
- pensati per essere comprensibili anche a persone non tecniche.
##### Requisiti di Sistema
I **requisiti di sistema** descrivono in modo più preciso e dettagliato ciò che il sistema deve fare.
Sono:
- raccolti in un documento strutturato;
- utilizzati come base per la progettazione e lo sviluppo;
- sufficientemente precisi da costituire un riferimento tra **cliente** e **fornitore**.
Quindi:
- **requisiti utente** → descrizione generale e comprensibile;
- **requisiti di sistema** → descrizione tecnica e dettagliata.

#### Categorie di Requisiti

##### Requisiti Funzionali
I **requisiti funzionali** descrivono **cosa deve fare il sistema**.
Definiscono:
- servizi e funzionalità offerte;
- comportamento del sistema in risposta a determinati input;
- comportamento in situazioni specifiche.
Esempio:
- permettere la ricerca di un documento
##### Requisiti Non Funzionali
I **requisiti non funzionali** descrivono **proprietà, qualità e vincoli** del sistema, invece di una specifica funzionalità.
Possono riguardare:
- **proprietà del sistema**
    - performance;
    - affidabilità;
    - safety;
    - usabilità;
- **processo di sviluppo**
    - standard da utilizzare;
    - linguaggi di programmazione;
    - metodi di sviluppo;
    - strumenti e ambienti CASE;      
- **vincoli esterni**
    - interoperabilità;
    - normative;
    - vincoli legislativi.
Esempio:
- tempi di risposta specifici

**funzionali → cosa fa il sistema**  
**non funzionali → con quali proprietà e vincoli deve farlo**

##### Requisiti di Dominio
I **requisiti di dominio** derivano dal particolare contesto applicativo in cui il sistema viene utilizzato.

Non nascono necessariamente da una richiesta esplicita dell'utente, ma da:
- regole del settore;
- procedure;
- standard;
- normative;
- caratteristiche proprie del dominio.
Possono essere:
- **funzionali**
    - introducono funzioni specifiche del dominio;
- **non funzionali**
    - impongono vincoli o standard propri del dominio.

Esempio: un software contabile può dover rispettare determinate regole contabili previste dal dominio.
##### Problemi dei Requisiti Software
I requisiti devono essere descritti in modo chiaro e coerente.
I problemi principali sono:
###### Ambiguità
Un requisito è **ambiguo** quando può essere interpretato in modi diversi.
Questo può portare utenti e sviluppatori ad avere aspettative differenti sul comportamento del sistema.
###### Incompletezza
Un insieme di requisiti è **incompleto** quando non descrive tutte le funzionalità o caratteristiche necessarie.

Di conseguenza alcune esigenze possono essere dimenticate durante lo sviluppo.
###### Inconsistenza
I requisiti sono **inconsistenti** quando due o più requisiti:
- si contraddicono;
- impongono comportamenti incompatibili.

##### Verificabilità dei Requisiti
Un requisito deve essere formulato in modo tale da poter verificare se il sistema lo soddisfa.
Questo problema è particolarmente importante per i **requisiti non funzionali**.
Ad esempio:

> Il sistema deve essere facile da usare.

è poco utile perché **“facile da usare” non è una misura precisa**.
È meglio utilizzare criteri quantificabili, ad esempio:
> Il tempo necessario per completare una determinata operazione non deve superare X secondi.

In questo modo il requisito diventa:
- misurabile;
- verificabile;
- testabile.

>[!question]- Come si classificano i requisiti software?
> >[!done]- la risposta
> > I requisiti possono essere distinti in **requisiti funzionali**, che descrivono funzionalità, servizi e comportamenti del sistema, **requisiti non funzionali**, che specificano qualità, caratteristiche e vincoli, e **requisiti di dominio**, che derivano dalle caratteristiche del particolare dominio applicativo.

>[!question]- Qual è la differenza tra requisiti utente e requisiti di sistema?
> >[!done]- la risposta
> > I **requisiti utente** descrivono in linguaggio naturale i servizi e i vincoli operativi e sono scritti per e con il cliente. I **requisiti di sistema** hanno invece un livello di dettaglio maggiore, sono contenuti in un documento strutturato e costituiscono un riferimento contrattuale tra cliente e fornitore.

>[!question]- Perché è importante rendere verificabili i requisiti non funzionali?
> >[!done]- la risposta
> > Un requisito non funzionale formulato genericamente può essere difficile da quantificare e quindi da verificare. Esprimerlo mediante una misura determinata permette di controllare quantitativamente se il sistema lo soddisfa.


### Specifica dei Requisiti
Una volta individuati i requisiti, questi devono essere **descritti e documentati** in maniera adeguata.

La forma utilizzata dipende dal livello di dettaglio richiesto

#### Scrittura dei Requisiti Utente
I requisiti utente devono essere comprensibili anche a persone non tecniche.
Per questo conviene:
- utilizzare un formato standard;
- usare il linguaggio naturale in modo consistente;
- evitare termini tecnici non necessari;
- evidenziare le parti più importanti;
- distinguere chiaramente:
    - **deve** → requisito obbligatorio;
    - **dovrebbe** → requisito desiderabile.

#### Requisiti di Sistema
I **requisiti di sistema** traducono i requisiti utente in una descrizione più precisa e dettagliata.
Possono essere espressi attraverso diverse notazioni.
##### Structured Natural Language
Utilizza il linguaggio naturale, ma attraverso:
- form;
- template;
- strutture predefinite.
Serve a ridurre l'ambiguità rispetto al linguaggio naturale completamente libero.
##### PDL — Program Description Language
Il **PDL** è un linguaggio simile a un linguaggio di programmazione, ma più astratto.
Permette di descrivere:
- operazioni;
- comportamenti;
- logica del sistema,
senza arrivare necessariamente al livello del codice vero e proprio.
##### Graphical Notations
Utilizzano diagrammi accompagnati da annotazioni testuali.
Possono essere usate per rappresentare:
- requisiti funzionali;
- struttura;
- comportamento del sistema.
##### Mathematical Specifications
Usano una rappresentazione matematica formale.
Possono utilizzare, ad esempio:
- insiemi;
- _finite-state machines_.
Il vantaggio principale è ottenere specifiche molto precise e poco ambigue.
Lo svantaggio è che possono risultare difficili da comprendere per il cliente o per utenti non tecnici.
### Documento di Specifica
Il **documento di analisi dei requisiti**, detto anche documento di ***specifica***, è il documento ufficiale che descrive in dettaglio le caratteristiche del sistema da sviluppare.

è il contenitore ufficiale in cui i requisiti vengono documentati

Deve concentrarsi principalmente sul **dominio del problema**, cioè:
> ***cosa deve fare il sistema***

e non sul **dominio della soluzione**, cioè:

> *come verrà concretamente sviluppato

Il documento comprende sia:
- definizione dei requisiti utente;
- specifica dettagliata dei requisiti di sistema.

#### Struttura del Documento di Specifica
La struttura proposta è basata sullo standard **IEEE 830-1998**.

Le sezioni principali sono:
* *Preface*
	  * destinatari previsti;
  * *version history*;
	  * sintesi delle modifiche;
* *Introduction*
	- scopo;
	-  breve descrizione del sistema;
	- interazioni con altri sistemi;
	- collocazione del sistema nel contesto aziendale;
* *Glossary*
	- definizione dei termini tecnici usati nel documento;
* *User requirements definition*
	- requisiti utente funzionali;
	- requisiti utente non funzionali;
* *System architecture*
	- vista ad alto livello dei componenti del sistema;
* *System requirements specification*
	- requisiti di sistema funzionali;
	- requisiti di sistema non funzionali;
* *System models*
	- relazioni tra i componenti;
	- relazioni tra sistema e ambiente;
* *System evolution*
	- assunzioni su cui si basa il sistema;
	- cambiamenti previsti nel tempo;
* *Appendices*
	- informazioni specifiche dell'applicazione;
* *Index*
	- indice dei contenuti;
	- indice alfabetico;
	- lista dei diagrammi.
### Processo di Ingegneria dei Requisiti

La **Requirements Engineering** è il processo attraverso cui vengono:
- individuate le esigenze degli utenti;
- analizzate;
- trasformate in requisiti;
- documentate;
- controllate nel tempo.
Il processo può cambiare in base a:
- dominio applicativo;
- persone coinvolte;
- organizzazione.

Nonostante queste differenze, si possono individuare cinque attività generiche:

1. **studio di fattibilità**;
2. **identificazione e analisi dei requisiti**;
3. **specifica dei requisiti**;
4. **convalida dei requisiti**;
5. **gestione dei requisiti**.

#### 1.Studio di Fattibilità
Lo **studio di fattibilità** è la fase iniziale del processo di *requirements engineering*.
Parte da:
* descrizione sommaria del sistema software;
* necessità degli utenti.
Le informazioni vengono raccolte tramite colloqui con:

* *client manager*;
* ingegneri del software con esperienza nel dominio applicativo;
* esperti delle tecnologie da utilizzare;
* utenti finali.
Il risultato dello studio è un **report di fattibilità**, che stabilisce se sia opportuno procedere o meno allo sviluppo del sistema.
Le domande principali riguardano:
* **obiettivi strategici**
  * in che modo il sistema contribuisce agli obiettivi strategici del cliente?
* **fattibilità tecnologica, temporale ed economica**
  * il sistema può essere realizzato con le tecnologie correnti?
  * possono essere rispettati i vincoli di durata e costo?
* **integrazione**
  * il sistema può essere integrato con altri sistemi già in uso?

#### 2.Identificazione e Analisi dei Requisiti
Durante l'**identificazione e analisi dei requisiti**, il team di sviluppo incontra:
* cliente;
* utenti finali.
L'obiettivo è identificare i requisiti utente, dalla cui analisi vengono poi generati i requisiti di sistema.

Uno **stakeholder** è qualunque soggetto che abbia un interesse diretto o indiretto sui requisiti del sistema software da sviluppare.
Task principali
* **comprensione del dominio**
  * l'analista deve acquisire conoscenza del dominio applicativo;
* **raccolta dei requisiti**
  * attraverso l'interazione con gli *stakeholder* vengono identificati i requisiti utente;
* **classificazione**
  * i requisiti raccolti vengono suddivisi in sottoinsiemi coerenti;
* **risoluzione dei conflitti**
  * contraddizioni e conflitti tra requisiti vengono identificati e risolti;
* **assegnazione delle priorità**
  * attraverso l'interazione con gli *stakeholder* viene assegnata una classe di priorità ai requisiti;
* **verifica dei requisiti**
  * si controllano:
    * completezza;
    * consistenza.
#### 3. Tecniche di identificazione e Analisi
Per individuare i requisiti possono essere utilizzate:
- **Ethnography**
    - osservazione diretta degli utenti nel loro ambiente di lavoro;
- **casi d'uso basati su scenari**
    - descrivono situazioni concrete di utilizzo del sistema;
- **prototipazione**
    - permette agli utenti di interagire con una prima versione del sistema e fornire feedback.

Le tecniche

Possono essere:
- **semi-formali**
    - basate su modelli del sistema;
    - utilizzate nell'analisi strutturata o orientata agli oggetti;
- **formali**
    - basate su formalismi come:
        - _Petri Net_;
        - FSM;
        - Z.
#### 4. Convalida dei Requisiti
La **convalida dei requisiti** serve a controllare che i requisiti documentati rappresentino realmente il sistema desiderato dal cliente.

Individuare errori in questa fase è importante perché evita costosi **rework** nelle fasi successive dello sviluppo.

#### Controlli di convalida
I requisiti vengono controllati rispetto a:
* validità;
* consistenza;
* completezza;
* realizzabilità;
* verificabilità.
#### Tecniche di convalida
I requisiti vengono controllati rispetto a:
- **validità**
    - rappresentano realmente le esigenze del cliente?
- **consistenza**
    - esistono contraddizioni?
- **completezza**
    - manca qualche requisito importante?
- **realizzabilità**
    - possono essere effettivamente implementati?
- **verificabilità**
    - sarà possibile controllare se sono stati soddisfatti?

Le principali sono:
- revisioni informali;
- revisioni formali:
    - _walkthrough_;
    - ispezioni;
- prototipazione;
- generazione dei _test-case_;
- analisi automatizzata della consistenza:
    - utilizzabile soprattutto con requisiti formali.
#### 5. Gestione dei Requisiti
La **gestione dei requisiti** serve a identificare e controllare le modifiche che i requisiti possono subire durante il ciclo di vita del software.
I requisiti infatti non rimangono necessariamente invariati dopo essere stati definiti.
In base alla probabilità di cambiamento si distinguono:
- **requisiti stabili**
    - hanno una bassa probabilità di cambiare;
- **requisiti volatili**
    - hanno un'elevata probabilità di cambiare.

I requisiti volatili possono essere:
- **mutabili**
    - cambiano perché cambia l'ambiente operativo;
- **emergenti**
    - emergono o cambiano grazie a una migliore comprensione del sistema;
- **consequenziali**
    - cambiano come conseguenza dell'introduzione del nuovo sistema nel modo di lavorare;
- **di compatibilità**
    - cambiano a causa di modifiche nei sistemi o nei processi con cui il software deve interagire.

### Gestione delle Modifiche dei Requisiti
Le modifiche ai requisiti devono essere controllate attraverso:
- **identificazione univoca**
    - ogni requisito deve poter essere riconosciuto senza ambiguità;
- **gestione delle modifiche**
    - analisi del costo;
    - analisi dell'impatto;
    - analisi della realizzazione;
- **tracciabilità**
    - relazioni tra requisiti;
    - relazioni tra requisiti e progetto del sistema;
- **tool CASE**
    - possono supportare tracciabilità e gestione delle modifiche.

> [!question]- Si descrivano le principali attività del processo di requirements engineering.
>
> > [!done]- la risposta
> > Il processo di *requirements engineering* comprende cinque attività generiche: studio di fattibilità, identificazione e analisi dei requisiti, specifica dei requisiti, convalida dei requisiti e gestione dei requisiti.

> [!question]- In cosa consiste lo studio di fattibilità?
>
> > [!done]- la risposta
> > È la fase iniziale del *requirements engineering*. Parte da una descrizione sommaria del sistema e delle necessità utente e produce un report che stabilisce se sia opportuno procedere con lo sviluppo, considerando obiettivi strategici, tecnologie disponibili, vincoli di costo e tempo e integrazione con sistemi esistenti.

> [!question]- Quali sono i task dell'identificazione e analisi dei requisiti?
>
> > [!done]- la risposta
> > I task principali sono comprensione del dominio, raccolta dei requisiti tramite gli *stakeholder*, classificazione dei requisiti, risoluzione dei conflitti, assegnazione delle priorità e verifica di completezza e consistenza.

> [!question]- In cosa consiste la convalida dei requisiti?
>
> > [!done]- la risposta
> > La convalida verifica che il documento dei requisiti descriva realmente il sistema atteso dal cliente. Vengono controllate validità, consistenza, completezza, realizzabilità e verificabilità, cercando di individuare gli errori prima che producano costosi *rework* nelle fasi successive.

> [!question]- Come vengono classificati i requisiti rispetto alla loro evoluzione?
>
> > [!done]- la risposta
> > Si distinguono requisiti stabili, con bassa probabilità di modifica, e requisiti volatili, con alta probabilità di modifica. I requisiti volatili possono essere mutabili, emergenti, consequenziali o di compatibilità.

## Specifiche Formali e Informali
Le specifiche dei requisiti possono essere espresse sia in modo formale che informale. 
Ogni approccio ha vantaggi e svantaggi, a seconda delle esigenze del progetto e delle preferenze dell'organizzazione.
Ecco una panoramica dei due approcci:

|           | INFORMALI                                                                                                                                                                                                                | FORMALI                                                                                                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| VANTAGGI  | Facili da comprendere per gli stakeholder non tecnici. Flessibilità nell'espressione dei requisit. Facilitano la comunicazione diretta con gli utenti e il cliente. Semplici da scrivere e da interpretare inizialmente. | Elevato grado di precisione e detatglio. Riducono l'ambiguità e le interpretazioni diverse. Supportano l'analisi formale e l'automazione della verifica. Adatte per sistemi critici o complessi.                   |
| SVANTAGGI | Possono essere ambigue o soggette a interpretazioni diverse. Manca di precisione matematica e dettaglio tecnico. Non è adatta per requisiti complessi che richiedono chiarezza assoluta.                                 | Potrebbero essere difficili da comprendere per gli stakeholder non tecnici. Richiedono competenze specializzate per la scrittura e l'interpretazione. Potrebbero richiedere più tempo per essere create e gestite. |


### Specifiche Formali con Petri Net

![[p022-fig-009.jpeg|600]]

Le **Petri Net** sono un modello matematico e grafico utilizzato per rappresentare il comportamento di sistemi in cui più attività possono avvenire in modo concorrente.
Sono costituite principalmente da:
- **Place**
	- rappresentano condizioni o stati del sistema;
- **Transition**
	- rappresentano eventi o azioni che modificano lo stato del sistema;
- **Arc**
	- collegano *place* e *transition*;
	- indicano come avviene il passaggio tra le diverse condizioni del sistema.
Graficamente:
- i *place* sono rappresentati con cerchi;
- le *transition* con rettangoli o barre;
- gli *arc* con frecce.

Le Petri Net permettono quindi di rappresentare in modo preciso il flusso delle attività e le condizioni necessarie affinché determinati eventi possano avvenire.

#### Marked Petri Net

![[p022-fig-010.png|450]]
Una **Marked Petri Net** aggiunge alle Petri Net il concetto di **token**.

I *token*:
- sono contenuti nei *place*;
- rappresentano la situazione corrente del sistema;
- la loro distribuzione costituisce la **marcatura** della rete.

Una *transition* può effettuare il **firing** quando sono soddisfatte le condizioni necessarie nei *place* di input.

Con il *firing*:
- alcuni token vengono rimossi dai *place* di input;
- altri vengono inseriti nei *place* di output;
- cambia quindi la marcatura e, di conseguenza, lo stato del sistema.

Un **Inhibitor Arc** è un particolare arco utilizzato per impedire il *firing* di una transizione quando una determinata condizione è presente.

Serve quindi a rappresentare situazioni in cui una transizione può avvenire solo in assenza di una certa condizione.
> [!question]- Quali formalismi vengono utilizzati per le specifiche formali?
>
> > [!done]- la risposta
> > Nel materiale vengono presentate le **Petri Net**, le **FSM** (*Finite State Machine*) e il **linguaggio Z** come formalismi utilizzabili per esprimere specifiche formali.

> [!question]- Cosa caratterizza una Marked Petri Net nel materiale presentato?
>
> > [!done]- la risposta
> > Nelle **Marked Petri Net** compare il *Token* e l'evoluzione della marcatura viene mostrata attraverso il *firing* delle transizioni, ad esempio `t1` e `t2`.


### Specifiche Formali con Finite State Machine
Le **FSM** (*Finite State Machine*) sono modelli matematici utilizzati per descrivere sistemi che possono trovarsi in un numero finito di stati.
Una FSM è composta principalmente da:
- **State**
	- rappresenta una possibile condizione del sistema;
- **Input / evento**
	- provoca, quando previsto, il passaggio da uno stato a un altro;
- **Transition**
	- rappresenta il cambiamento di stato.
Le FSM sono particolarmente utili per descrivere:
- il comportamento del sistema nel tempo;
- sequenze di azioni;
- reazioni a determinati eventi;
- eventuali condizioni di errore.
In pratica, una FSM descrive **in quale stato si trova il sistema e come cambia stato in risposta agli eventi**.

### Specifiche Formali con Linguaggio Z
![[p023-fig-011.png|450]]
Il **linguaggio Z** è un linguaggio formale basato su notazione matematica e logica.

Viene utilizzato per descrivere in modo preciso:
- lo stato del sistema;
- le proprietà che devono essere rispettate;
- le operazioni che possono modificare lo stato.

Una specifica in Z è composta da un insieme di **schemi Z**.
Ogni schema può descrivere:

- lo stato del sistema;
- uno stato iniziale;
- una particolare operazione.

#### Specifica di Stato
Una **specifica di stato** descrive le variabili che rappresentano lo stato del sistema e i vincoli che devono rispettare.
Nel materiale compare anche un esempio di stato iniziale astratto:
`Button_init := [Button_State’ | pushed’ = ∅]`
#### Specifica di Operazione
Una **specifica di operazione** descrive come un'operazione modifica lo stato del sistema.
Permette quindi di specificare matematicamente:
- condizioni iniziali;
- operazione eseguita;
- stato risultante.

> [!question]- Come è strutturata una specifica in linguaggio Z?
>
> > [!done]- la risposta
> > Una specifica in **linguaggio Z** consiste in un insieme di schemi. Il materiale mostra esempi sia di specifica di stato sia di specifica di operazione.





## Specifiche Semi-formali

### Specifiche Semi-formali e Modelli del Sistema

Un **modello del sistema** è una rappresentazione astratta del sistema che facilita la comprensione:

* delle sue proprietà;
* delle sue caratteristiche di funzionamento;
* prima che il sistema venga effettivamente costruito.

L'uso dei modelli software viene formalizzato all'interno di metodi di analisi e specifica dei requisiti basati su tecniche **semi-formali**.

I metodi di analisi dei requisiti software possono essere:

* **metodi di analisi strutturata**

  * detti anche procedurali;

* **metodi di analisi orientata agli oggetti**.

Per descrivere completamente un sistema non basta un solo modello: servono più rappresentazioni che mostrino il sistema da punti di vista differenti:

* informazioni;
* funzioni;
* comportamento dinamico.
![[assets/0878b9d6_p20_i0.png|600]]

### Tipi di Modelli del Sistema

Per una specifica semi-formale si utilizzano tre tipi principali di modelli.

#### Modello dei dati

Il **modello dei dati** rappresenta gli aspetti statici e strutturali relativi ai dati, cioè i *data requirements*.

Può essere rappresentato mediante:

* **ERD** (*Entity Relationship Diagram*)

  * non UML;

* *class diagram*

  * UML.

#### Modello comportamentale

Il **modello comportamentale** rappresenta gli aspetti funzionali del sistema, cioè i *functional requirements*.

Può utilizzare:

* **DFD** (*Data Flow Diagram*)

  * non UML;
* *use case diagram*

  * UML;
* *activity diagram*

  * UML;
* *interaction diagram*

  * UML.

#### Modello dinamico

Il **modello dinamico** rappresenta:

* gli aspetti di controllo del sistema;
* il modo in cui le funzioni del modello comportamentale modificano i dati introdotti nel modello dei dati.

Può essere espresso mediante:

* *state diagram*

  * UML.

### Entity Relationship Diagram

L'**ERD** (*Entity Relationship Diagram*) è un formalismo associato al modello dei dati.

Nel materiale vengono mostrati esempi di:

* relazioni uno-a-molti;
* relazioni molti-a-molti.
![[assets/0878b9d6_p22_i1.png|600]]
![[assets/0878b9d6_p23_i0.png|600]]

### Data Flow Diagram

Il **DFD** (*Data Flow Diagram*) è un formalismo associato al modello comportamentale.

Il materiale mostra che un DFD può essere raffinato progressivamente:

1. rappresentazione iniziale;
2. primo raffinamento;
3. secondo raffinamento;

   * può includere l'espansione di un processo.
![[assets/0878b9d6_p24_i1.png|600]]
![[assets/0878b9d6_p25_i2.png|600]]
![[assets/0878b9d6_p26_i2.png|600]]

### Structured System Analysis

La **SSA** (*Structured System Analysis*) è un metodo di analisi strutturata introdotto da Gane and Sarson nel 1979.

Caratteristiche principali:

* è composta da **9 step**;
* si basa sul concetto di *step-wise refinement*;
* alcuni step raffinano progressivamente:

  * *data flow*;
  * processi;
  * *data store*.

Altri metodi di analisi strutturata citati:

* DeMarco (1978);
* Yourdon and Constantine (1979).

### SSA — Step 1: Draw the DFD

Il primo step consiste nel costruire il **DFD** utilizzando:

* documento dei requisiti;
* oppure prototipo.

Dal materiale vengono identificati:

* *data flow*;
* sorgenti dei dati;
* destinazioni dei dati;
* processi che trasformano i dati.

Il DFD viene poi raffinato:

* aggiungendo nuovi *data flow*;
* aggiungendo dettagli ai flussi già esistenti.
![[assets/0878b9d6_p28_i0.png|600]]

### SSA — Step 2: Decide what Sections to Computerize and How

Nel secondo step si decide quali parti del DFD automatizzare tramite una *cost-benefit analysis*.

Le modalità di computerizzazione indicate sono:

* *batch operations*;
* *on-line processing*.

Nell'esempio:

* *order placement* → automatizzato in *batch*;
* *order validation* → automatizzata *online*.

Dopo questo step, i tre step successivi realizzano lo *step-wise refinement* di:

* *data flow*;
* processi;
* *data store*.
![[assets/0878b9d6_p29_i0.png|600]]

### SSA — Step 3: Determine the Details of the Data Flows

Il terzo step determina quali *data item* devono essere contenuti nei diversi *data flow*.

Ogni flusso viene poi raffinato progressivamente.

Esempio:

* `order`

  * `order_identification`
  * `customer_details`
  * `package_details`

Ulteriore raffinamento:

* `order_identification`

  * intero di 12 cifre;

* `customer_details`

  * `customer_name`;
  * `customer_address`;
  * ecc.
![[assets/0878b9d6_p30_i0.png|600]]

### SSA — Step 4: Define the Logic of Processes

Il quarto step consiste nel definire la **logica dei processi**.

Nell'esempio viene costruito un *decision tree* per il processo:

`give_educational_discount`
![[assets/0878b9d6_p31_i0.png|600]]

### SSA — Step 5: Determine the Data Stores

Nel quinto step vengono definiti i *data store*.

Per ciascun *data store* si stabiliscono:

* contenuto esatto;
* rappresentazione;

  * in un formato specifico di un determinato linguaggio di programmazione;
* livello di accesso.

Il livello di accesso viene definito mediante un **DIAD** (*data-immediate-access diagram*).
![[assets/0878b9d6_p32_i0.png|600]]

### SSA — Step 6: Define the Physical Resource

Il sesto step definisce le **risorse fisiche**.

Per ogni file vengono specificati:

* nome;
* organizzazione;
* supporto di memorizzazione;
* struttura dei record;

  * fino al livello dei singoli campi.

Se viene utilizzato un **DBMS**, vengono specificate anche le informazioni rilevanti per ciascuna tabella.
![[assets/0878b9d6_p33_i0.png|600]]

### SSA — Step 7: Determine the Input/Output Specifications

Il settimo step determina le specifiche di *input/output*.

Vengono specificati:

* form di input

  * componenti;
  * layout;

* schermate di output;

* output stampati

  * lunghezza stimata;
  * dettagli.
![[assets/0878b9d6_p34_i0.png|600]]

### SSA — Step 8: Determine the Sizing

L'ottavo step riguarda il **dimensionamento** del sistema.

Vengono calcolati:

* volume degli input

  * giornaliero;
  * orario;

* frequenza dei report stampati;

* scadenza dei report;

* dimensione e numero dei record trasferiti tra:

  * CPU;
  * *mass storage*;

* dimensione di ciascun file.
![[assets/0878b9d6_p35_i0.png|600]]

### SSA — Step 9: Determine the Hardware Requirements

Il nono step usa le informazioni di *sizing* ottenute nello step 8 per determinare i requisiti hardware.

Vengono valutati:

* requisiti di *mass storage*;
* *mass storage* necessario per il backup;
* caratteristiche dei terminali utente;
* caratteristiche dei dispositivi di output;
* adeguatezza dell'hardware già disponibile;
* costi dell'hardware da acquistare.
![[assets/0878b9d6_p36_i0.png|600]]

### Output e Limiti della Structured System Analysis

Lo step 9 conclude la SSA.

Dopo l'approvazione del cliente:

* il documento di specifica risultante viene consegnato al team di progettazione;
* il processo software prosegue.

#### Limiti

La SSA presenta alcuni limiti:

* non permette di determinare i tempi di risposta;
* dimensione della CPU e *timing* non possono essere determinati con un buon grado di accuratezza.
![[assets/0878b9d6_p37_i0.png|600]]

> [!question]- Quali sono i tre tipi di modelli utilizzati nelle specifiche semi-formali?
>
> > [!done]- la risposta
> > Sono il **modello dei dati**, che rappresenta gli aspetti statici e strutturali dei dati; il **modello comportamentale**, che rappresenta gli aspetti funzionali; e il **modello dinamico**, che rappresenta gli aspetti di controllo e il modo in cui le funzioni modificano i dati.

> [!question]- Cos'è la Structured System Analysis?
>
> > [!done]- la risposta
> > La **SSA** (*Structured System Analysis*) è un metodo di analisi strutturata introdotto da Gane and Sarson nel 1979. È composto da nove step ed è basato sul principio di *step-wise refinement*.

> [!question]- Si descrivano sinteticamente i nove step della SSA.
>
> > [!done]- la risposta
> >
> > 1. Costruzione e raffinamento del DFD.
> > 2. Scelta delle sezioni da automatizzare e della modalità di computerizzazione.
> > 3. Raffinamento dei *data flow*.
> > 4. Definizione della logica dei processi.
> > 5. Definizione dei *data store*.
> > 6. Definizione delle risorse fisiche.
> > 7. Specifica di input e output.
> > 8. Dimensionamento del sistema.
> > 9. Determinazione dei requisiti hardware.

> [!question]- Quali sono i principali limiti della SSA?
>
> > [!done]- la risposta
> > La SSA non permette di determinare i tempi di risposta e non consente di stabilire con accuratezza la dimensione della CPU e il *timing*.
