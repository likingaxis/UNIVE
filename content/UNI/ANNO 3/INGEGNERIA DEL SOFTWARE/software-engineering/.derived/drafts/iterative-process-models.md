# Sviluppo Iterativo e Modello a Spirale

## Process Iteration

### Perché il processo viene iterato

Nei progetti software di grandi dimensioni i requisiti evolvono durante il progetto. Per questo la ***process iteration***, cioè la rielaborazione di stadi già affrontati, fa parte del processo.

L'iterazione:
- può essere applicata a qualsiasi modello di processo generico;
- permette di tornare su stadi precedenti e rielaborarli quando necessario;
- può essere realizzata attraverso due approcci collegati:
    - **Incremental Development**;
    - **Spiral Development**.

## Modello Incrementale

### Def Incremental Development

Nel **Modello Incrementale** il prodotto viene sviluppato e consegnato attraverso *increment* successivi, detti anche *build*, dopo aver stabilito un'architettura complessiva.

Il prodotto quindi non viene consegnato tutto insieme:
- viene realizzato attraverso più *build*;
- ogni *build* rappresenta un incremento successivo del prodotto;
- gli utenti possono sperimentare gli incrementi già consegnati mentre il resto del prodotto è ancora in sviluppo.

Gli incrementi consegnati possono quindi agire anche come *prototype*:
- l'utente può provare concretamente quanto già realizzato;
- il resto del prodotto può continuare a essere sviluppato nello stesso periodo.

### Vantaggi e contesto d'uso

Il modello incrementale combina:
- i vantaggi del *prototyping*;
- un processo più gestibile;
- una struttura migliore.

È particolarmente efficace quando:
- il cliente vuole verificare continuamente l'avanzamento;
- i requisiti sono soggetti a modifiche.

### Versioni del modello incrementale

Il modello può essere realizzato in due versioni alternative:

1. **con architettura complessiva**
    - l'architettura generale viene stabilita prima dello sviluppo e della consegna dei successivi *build*;
2. **senza architettura complessiva**
    - lo sviluppo incrementale procede senza una struttura architetturale complessiva già stabilita;
    - questa versione è più rischiosa.

>[!question]- Si descriva il modello incrementale e si spieghi in quali situazioni risulta efficace.
> >[!done]- la risposta
> > Nel modello incrementale il prodotto viene sviluppato e consegnato attraverso incrementi o build successivi. Gli utenti possono sperimentare gli incrementi già disponibili mentre il resto del prodotto è ancora in sviluppo, e questi incrementi possono agire come prototipi. Il modello combina quindi i vantaggi del prototyping con un processo più gestibile e una struttura migliore. È efficace quando il cliente vuole verificare continuamente l'avanzamento e quando i requisiti possono cambiare.

## Modello Incrementale vs Waterfall

Le differenze principali tra **Waterfall** e **Modello Incrementale** riguardano il momento in cui entra il feedback del cliente, l'organizzazione delle fasi, la granularità di design e coding, la struttura dei team e la gestione dei requisiti.

| Aspetto | Waterfall | Modello Incrementale |
| --- | --- | --- |
| *client feedback* | avviene solo dopo la conclusione dello sviluppo | è continuo durante lo sviluppo |
| fasi | strettamente sequenziali | possono essere condotte in parallelo |
| *detailed design* e *coding* | riguardano l'intero prodotto | vengono svolti sui singoli *build* |
| team di sviluppo | un team di grandi dimensioni | più team di piccole dimensioni |
| requisiti | vengono congelati dopo la fase di specifica | vengono divisi in classi di priorità e sono facilmente modificabili |

La differenza sul feedback è particolarmente netta:
- nel Waterfall il cliente fornisce feedback quando lo sviluppo è ormai concluso;
- nel modello incrementale il feedback può accompagnare lo sviluppo in modo continuo.

Anche la gestione del lavoro cambia:
- Waterfall:
    - le fasi procedono in sequenza;
    - *detailed design* e *coding* coprono l'intero prodotto;
- Incrementale:
    - le fasi possono procedere in parallelo;
    - *detailed design* e *coding* vengono applicati ai singoli *build*.

>[!question]- Si confrontino Waterfall e Modello Incrementale.
> >[!done]- la risposta
> > Nel Waterfall il feedback del cliente arriva solo alla fine dello sviluppo, le fasi sono strettamente sequenziali, design dettagliato e coding riguardano l'intero prodotto, il team è grande e i requisiti vengono congelati dopo la specifica. Nel modello incrementale il feedback è continuo, le fasi possono essere svolte in parallelo, design e coding lavorano sui singoli build, operano più team piccoli e i requisiti sono organizzati in classi di priorità e facilmente modificabili.

## Modello a Spirale

Il **Modello a Spirale** è uno dei due approcci collegati alla *process iteration*, insieme allo sviluppo incrementale.

Il modello è presentato in due versioni:
- **versione semplificata**
    - lineare;
- **versione completa a spirale**
    - indicata come *full-spiral version*;
    - associata a Boehm, 1988.

Il modello è rappresentato anche graficamente:

![[assets/d234c4c9_p29_i0.png|500]]

>[!question]- Quali versioni del Modello a Spirale vengono presentate?
> >[!done]- la risposta
> > Vengono presentate una versione semplificata, lineare, e una versione completa a spirale, indicata come full-spiral version e associata a Boehm, 1988.

## Risk Management

### Def Risk Management

Il ***risk management*** riguarda:
- l'identificazione dei rischi;
- la definizione di piani per minimizzare il loro effetto sul progetto.

### Def Risk

Un **risk** è la probabilità che si verifichi una circostanza avversa.

I rischi possono essere classificati in tre categorie principali:

| Categoria | Effetto |
| --- | --- |
| *project risks* | influenzano la pianificazione temporale o le risorse |
| *product risks* | influenzano la qualità o le prestazioni del prodotto |
| *business risks* | influenzano l'organizzazione |

### Tipi di rischio

I tipi di rischio comprendono:
- *technology risks*;
- *people risks*;
- *organizational risks*;
- *tools risks*;
- *requirements risks*;
- *estimation risks*.

### Processo di Risk Management

Il processo di *risk management* è composto da quattro attività:

1. **risk identification**
2. **risk analysis**
3. **risk planning**
4. **risk monitoring**

### Risk Identification

La prima attività consiste nell'identificazione dei rischi che devono essere gestiti.

I rischi individuati diventano l'input delle successive attività di analisi, pianificazione e monitoraggio.

### Risk Analysis

La ***risk analysis*** valuta ogni rischio lungo due dimensioni:

- **probabilità**
    - può variare da *very low* a *very high*;
- **serietà**
    - può essere:
        - *catastrophic*;
        - *serious*;
        - *tolerable*;
        - *insignificant*.

L'analisi serve quindi a caratterizzare il rischio considerando sia quanto è probabile che si verifichi, sia quanto sarebbero seri i suoi effetti.

### Risk Planning

La ***risk planning*** consiste nello sviluppare, per ciascun rischio:
- *avoidance strategies*;
- *minimization strategies*;
- *contingency plans*.

Queste tre forme di pianificazione affrontano il rischio predisponendo strategie e piani destinati a minimizzarne l'effetto sul progetto.

### Risk Monitoring

Il ***risk monitoring*** controlla regolarmente l'evoluzione dei rischi identificati.

Durante il monitoraggio si valuta:
- se un rischio sta diventando:
    - più probabile;
    - meno probabile;
- se i suoi effetti sono cambiati.

Il monitoraggio non è quindi una valutazione eseguita una sola volta: i rischi già individuati vengono riesaminati regolarmente per verificare come cambiano probabilità ed effetti.

>[!question]- Si descriva il processo di Risk Management.
> >[!done]- la risposta
> > Il risk management riguarda l'identificazione dei rischi e la preparazione di piani per minimizzarne gli effetti sul progetto. Il processo comprende risk identification, risk analysis, risk planning e risk monitoring. L'analisi valuta probabilità e serietà dei rischi; il planning predispone avoidance strategies, minimization strategies e contingency plans; il monitoring verifica regolarmente se probabilità ed effetti dei rischi identificati stanno cambiando.

>[!question]- Come vengono classificati e analizzati i rischi?
> >[!done]- la risposta
> > I rischi possono essere project risks, che influenzano schedule o risorse, product risks, che influenzano qualità o performance, e business risks, che influenzano l'organizzazione. La risk analysis valuta per ogni rischio la probabilità, da very low a very high, e la serietà, classificabile come catastrophic, serious, tolerable o insignificant.

## Altri modelli

### Simultaneous / Concurrent Engineering

Il **Simultaneous Engineering**, o **Concurrent Engineering**, mira a ridurre:
- tempo di sviluppo;
- costo di sviluppo.

Lo fa attraverso un approccio sistematico al design integrato e concorrente:
- del prodotto software;
- del relativo processo.

La caratteristica strutturale indicata è che:
- le fasi coesistono;
- non vengono eseguite semplicemente in sequenza.

### Formal Methods Model

Il **Formal Methods Model** comprende attività che portano a una specifica matematica formale del software.

La specifica formale viene utilizzata per:
- eliminare l'ambiguità;
- facilitare la verifica dei programmi.

Come esempio viene indicato **Cleanroom Software Engineering**, 1987.

>[!question]- Qual è la differenza fondamentale nell'organizzazione delle fasi del Concurrent Engineering?
> >[!done]- la risposta
> > Nel Concurrent Engineering le fasi coesistono invece di essere eseguite in sequenza. L'approccio mira a ridurre tempo e costo di sviluppo attraverso il design integrato e concorrente del prodotto software e del relativo processo.

>[!question]- Qual è l'obiettivo del Formal Methods Model?
> >[!done]- la risposta
> > Il Formal Methods Model conduce a una specifica matematica formale del software, con l'obiettivo di eliminare l'ambiguità e facilitare la verifica dei programmi. Nel materiale viene indicato come esempio Cleanroom Software Engineering del 1987.
