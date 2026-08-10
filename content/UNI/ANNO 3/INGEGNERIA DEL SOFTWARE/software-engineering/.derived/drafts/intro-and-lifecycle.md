# Fondamenti e Ciclo di Vita

## Ingegneria del Software

### Def Ingegneria del Software
L'**Ingegneria del Software** è la disciplina per la produzione del software secondo i principi dell'ingegneria, in particolare progettazione e validazione.

È essenziale per trasformare il software in un prodotto industriale.

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

Esempi indicati:
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
Gli aspetti accidentali sono superabili con il progresso della tecnologia:
- attitudine;
- manutenzione;
- specifica e progetto;
- *teaming*.

### Aspetti essenziali
Gli aspetti essenziali non sono superabili con il progresso di mezzi e conoscenze:
- complessità;
- conformità;
- cambiabilità;
- invisibilità.

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

### Sviluppo

Lo sviluppo consiste in sei fasi:

1. **Requisiti**
2. **Specifiche**
    - indicate anche come analisi dei requisiti;
3. **Pianificazione**
4. **Progetto**
    - preliminare;
    - dettagliato;
5. **Codifica**
6. **Integrazione**

### Manutenzione

La manutenzione rappresenta una parte molto rilevante del ciclo di vita:
- copre circa il **60% dei costi** dell'intero ciclo di vita.

### Effetto delle modifiche

L'effetto di una modifica dipende dalla fase in cui viene introdotta.

Quando una modifica viene introdotta in fasi avanzate può comportare:
- rivolgimenti;
- necessità di nuove risorse;
- correzioni importanti;
- costi supplementari.

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
