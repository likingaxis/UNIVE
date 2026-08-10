# Modelli Sequenziali (Waterfall, Prototyping)

## Processo software

### Def processo software
Il **processo software** è la serie di attività necessarie alla realizzazione del prodotto software:
- nei tempi previsti;
- con i costi previsti;
- con le caratteristiche di qualità desiderate.

Nel processo software:
- si applicano metodi, tecniche e strumenti;
- si creano prodotti:
    - intermedi;
    - finali;
- si stabilisce il controllo gestionale del progetto;
- si garantisce la qualità;
- si governano le modifiche.

Il processo segue un ciclo di vita articolato in stadi e fasi.

![[assets/d234c4c9_p0_i0.png|400]]

## Ciclo di vita del software

### Def ciclo di vita
Secondo **IEEE Std 610-12**, il **ciclo di vita del software** è l'intervallo di tempo compreso tra:
- la nascita dell'esigenza di costruire un software;
- la sua dismissione.

Il processo software segue un ciclo di vita articolato in tre stadi:
1. **sviluppo**
2. **manutenzione**
3. **dismissione**

![[assets/d234c4c9_p1_i0.png|500]]

### Stadio di sviluppo

Lo sviluppo comprende due tipi di fasi.

- **fasi di definizione**
    - stabiliscono *cosa* il software deve fornire;
    - comprendono:
        - definizione dei requisiti;
        - specifiche.
- **fasi di produzione**
    - stabiliscono *come* realizzare quanto ottenuto nelle fasi di definizione;
    - comprendono:
        - progettazione;
        - codifica;
        - integrazione;
        - rilascio.

### Fasi del ciclo di vita

Nel ciclo di vita rientrano:
- definizione dei requisiti;
- specifica;
- pianificazione;
- progetto:
    - preliminare;
    - dettagliato;
- codifica;
- integrazione;
- *testing*;
- uso;
- manutenzione;
- dismissione.

Le fasi:
- possono sovrapporsi;
- possono essere iterative.

Durante ogni fase viene effettuato il *testing* dei prodotti tramite tecniche di *Verification & Validation* (V&V):
- sui prodotti intermedi;
- sui prodotti finali.

![[assets/d234c4c9_p3_i0.png|500]]

>[!question]- Si descriva il ciclo di vita del software e la distinzione tra fasi di definizione e di produzione.
> >[!done]- la risposta
> > Il ciclo di vita va dalla nascita dell'esigenza di costruire un software fino alla sua dismissione ed è articolato in sviluppo, manutenzione e dismissione. Nello sviluppo, le fasi di definizione stabiliscono cosa il software deve fornire attraverso requisiti e specifiche; le fasi di produzione stabiliscono come realizzarlo attraverso progettazione, codifica, integrazione e rilascio.

## Manutenzione

Lo stadio di manutenzione supporta il software realizzato e può comprendere al proprio interno:
- fasi di definizione;
- fasi di produzione.

### Tipi di manutenzione

| Tipo | Scopo |
| --- | --- |
| **correttiva** | eliminare i *fault* che producono *failure* del software |
| **adattativa** | adattare il software ai cambiamenti dell'ambiente operativo per cui è stato sviluppato |
| **perfettiva** | estendere il software per accomodare funzionalità aggiuntive |
| **preventiva** | rendere più semplici correzioni, adattamenti e migliorie tramite modifiche al software |

La manutenzione preventiva è indicata anche come *software reengineering*.

![[assets/d234c4c9_p2_i0.png|400]]

>[!question]- Quali sono i quattro tipi di manutenzione software?
> >[!done]- la risposta
> > La manutenzione correttiva elimina i fault che causano failure; quella adattativa adegua il software ai cambiamenti dell'ambiente operativo; quella perfettiva estende il software con funzionalità aggiuntive; quella preventiva, o software reengineering, modifica il software per rendere più semplici correzioni, adattamenti e migliorie.

## Modelli di ciclo di vita

### Def modello del ciclo di vita
Il **modello del ciclo di vita** specifica:
- le fasi attraverso cui il prodotto software progredisce;
- il loro ordine di esecuzione;
- il percorso dalla definizione dei requisiti alla dismissione.

La scelta del modello dipende da:
- natura dell'applicazione;
- maturità dell'organizzazione;
- metodi utilizzati;
- tecnologie utilizzate;
- vincoli imposti dal cliente.

### Build & Fix

L'assenza di un modello corrisponde allo sviluppo *Build & Fix*, detto anche *Fix-it-later*:
- il software viene sviluppato;
- viene successivamente rilavorato;
- le rilavorazioni continuano fino a soddisfare il cliente.

![[assets/d234c4c9_p4_i0.png|400]]

>[!question]- Che cosa specifica un modello di ciclo di vita e da cosa dipende la sua scelta?
> >[!done]- la risposta
> > Un modello di ciclo di vita specifica le fasi attraverso cui il software progredisce e il loro ordine di esecuzione, dalla definizione dei requisiti alla dismissione. La scelta dipende dalla natura dell'applicazione, dalla maturità dell'organizzazione, dai metodi e dalle tecnologie usate e dai vincoli del cliente.

## Software Prototyping

### Def software prototyping
Il ***software prototyping*** consiste nello sviluppo rapido del software con lo scopo di:
- elicitare i requisiti;
- validare i requisiti.

L'uso principale dei prototipi di sistema è aiutare clienti e sviluppatori a comprendere meglio i requisiti.

### Prototyping e requisiti

Il prototipo supporta due attività.

- *requirements elicitation*
    - permette di sperimentare come il sistema supporta il lavoro.
- *requirements validation*
    - permette di rivelare:
        - errori;
        - omissioni nei requisiti.

Il prototyping è quindi anche un'attività di **riduzione del rischio**:
- riduce i rischi legati ai requisiti.

![[assets/d234c4c9_p10_i0.png|500]]

### Benefici del Prototyping

Il prototyping può:
- esporre incomprensioni;
- identificare:
    - servizi mancanti;
    - servizi confusi;
- rendere disponibile precocemente un sistema funzionante;
- fornire una base per derivare specifiche;
- supportare:
    - addestramento degli utenti;
    - *testing* del prodotto.

![[assets/d234c4c9_p11_i0.png|400]]

### Rapidità di sviluppo

Lo sviluppo rapido dei prototipi è essenziale.

Per ottenere questa rapidità può essere necessario:
- escludere alcune funzionalità;
- allentare alcuni vincoli non funzionali.

>[!question]- Qual è lo scopo del Software Prototyping e perché può essere considerato un'attività di riduzione del rischio?
> >[!done]- la risposta
> > Il software prototyping sviluppa rapidamente software per elicitare o validare i requisiti. Permette a clienti e sviluppatori di comprenderli meglio, facendo emergere errori, omissioni e incomprensioni; per questo riduce i rischi legati ai requisiti.

## Prototipi come specifiche

Un prototipo può essere usato come base per derivare specifiche, ma presenta limiti importanti.

- alcune parti dei requisiti possono essere impossibili da prototipare;
    - per esempio funzioni *safety-critical*;
    - quindi possono non comparire nelle specifiche derivate dal prototipo;
- un'implementazione prototipale non ha valore legale come contratto;
- i requisiti non funzionali non possono essere testati adeguatamente in un prototipo software.

![[assets/d234c4c9_p13_i0.png|400]]

>[!question]- Quali sono i limiti dell'uso di un prototipo come specifica?
> >[!done]- la risposta
> > Alcuni requisiti, come funzioni safety-critical, possono essere impossibili da prototipare e quindi non comparire nella specifica derivata. Inoltre il prototipo non ha valore legale come contratto e i requisiti non funzionali non possono essere testati adeguatamente su di esso.

## Throw-away Prototyping

### Def Throw-away Prototyping
Nel **Throw-away Prototyping** viene prodotto un prototipo per aiutare a scoprire problemi nei requisiti.

Il principio fondamentale è:
1. si realizza il prototipo;
2. lo si usa per comprendere meglio i requisiti;
3. il prototipo viene scartato;
4. il prodotto finale viene sviluppato usando un altro processo.

![[assets/d234c4c9_p14_i0.png|500]]

### Perché non è un prodotto finale

Il *throw-away prototype* non deve essere considerato un prodotto finale perché:
- alcune caratteristiche possono essere assenti;
- non esiste una specifica per la manutenzione a lungo termine;
- è strutturato male.

La consegna del prototipo come prodotto finale non è raccomandata anche perché:
- potrebbe essere impossibile adattarlo ai requisiti non funzionali;
- è privo di documentazione;
- la struttura viene degradata dai cambiamenti;
- i normali standard di qualità possono non essere stati applicati.

![[assets/d234c4c9_p16_i0.png|500]]

>[!warning]
> Un *throw-away prototype* viene costruito per comprendere i requisiti e poi scartato: non va trattato come prodotto finale.

>[!question]- Si descriva il Throw-away Prototyping e si spieghi perché il prototipo viene scartato.
> >[!done]- la risposta
> > Nel Throw-away Prototyping si costruisce un prototipo per individuare problemi nei requisiti e poi lo si scarta; il prodotto finale viene sviluppato con un altro processo. Il prototipo può essere incompleto, poco strutturato, non documentato, difficile da adattare ai requisiti non funzionali e può non rispettare i normali standard di qualità.

## Visual Programming

### Sviluppo del prototipo

Linguaggi di *scripting* come Visual Basic supportano il *visual programming*.

Nel visual programming il prototipo viene sviluppato:
- creando la *user interface* da componenti standard;
- associando tra loro i componenti disponibili in una grande libreria.

![[assets/d234c4c9_p18_i0.png|500]]

### Problemi dello sviluppo visuale

Lo sviluppo visuale presenta alcuni problemi:
- difficoltà nel coordinare lo sviluppo in team;
- assenza di un'architettura software esplicita;
- dipendenze complesse tra parti del programma;
    - possono causare problemi di *maintainability*.

![[assets/d234c4c9_p20_i0.png|500]]

>[!question]- Come viene usato il Visual Programming nel prototyping e quali problemi può introdurre?
> >[!done]- la risposta
> > Il visual programming permette di sviluppare il prototipo creando una user interface da componenti standard e associandoli tramite una grande libreria. Può però rendere difficile coordinare il lavoro in team, non fornire un'architettura software esplicita e introdurre dipendenze complesse che causano problemi di maintainability.
