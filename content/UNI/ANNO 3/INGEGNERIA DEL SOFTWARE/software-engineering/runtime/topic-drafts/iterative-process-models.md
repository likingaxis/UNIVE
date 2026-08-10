# Sviluppo Iterativo e Modello a Spirale

## Process Iteration

Nei progetti software di grandi dimensioni i requisiti evolvono nel tempo. Quando questo accade, alcune attività già svolte devono essere riprese e rielaborate: da qui nasce la *process iteration*.

La *process iteration*:
- può essere applicata a qualunque modello di processo generico;
- serve a gestire l'evoluzione dei requisiti;
- comprende due approcci strettamente collegati:
    - *incremental development*;
    - *spiral development*.

![[assets/d234c4c9_p21_i0.png|500]]

>[!question]- Perché si introduce la process iteration nei progetti software?
> >[!done]- la risposta
> > Nei progetti di grandi dimensioni i requisiti evolvono nel tempo, quindi può essere necessario rielaborare attività già svolte. La process iteration permette di ripetere parti del processo ed è applicabile ai diversi modelli generici.

## Incremental Development

### Def incremental development

Nel **Incremental Development** il prodotto viene sviluppato e consegnato attraverso incrementi successivi, detti anche *build*.

Ogni incremento:
- rappresenta una parte del prodotto;
- viene consegnato mentre altri incrementi sono ancora in sviluppo;
- può essere sperimentato dagli utenti come un prototipo.

Questo approccio combina:
- i vantaggi del *rapid prototyping*;
- un processo più gestibile;
- una struttura migliore.

![[assets/d234c4c9_p22_i0.png|500]]

### Quando è efficace

L'Incremental Development è particolarmente efficace quando:
- il cliente vuole verificare continuamente il progresso;
- i requisiti cambiano frequentemente.

Può essere realizzato in due versioni:
- con un'architettura complessiva;
- senza un'architettura complessiva;
    - questa versione è più rischiosa.

![[assets/d234c4c9_p24_i0.png|500]]

>[!question]- Come funziona l'Incremental Development e quando è particolarmente efficace?
> >[!done]- la risposta
> > Il prodotto viene sviluppato e consegnato attraverso build successive. Gli utenti possono sperimentare gli incrementi già consegnati mentre gli altri vengono sviluppati. È efficace quando il cliente vuole verificare continuamente l'avanzamento e quando i requisiti cambiano frequentemente.

## Incremental vs Waterfall

I due modelli differiscono soprattutto nel modo in cui gestiscono feedback, fasi, progettazione, team e requisiti.

| Aspetto | Waterfall | Incremental |
| --- | --- | --- |
| *feedback* del cliente | arriva solo dopo la fine dello sviluppo | è continuo |
| esecuzione delle fasi | strettamente sequenziale | può avvenire in parallelo |
| progettazione e codifica | dettagliate per l'intero prodotto | svolte per il singolo *build* |
| team di sviluppo | tipicamente un team grande | più team piccoli |
| requisiti | vengono congelati dopo la specifica | vengono prioritizzati e modificati più facilmente |

![[assets/d234c4c9_p28_i0.png|500]]

>[!question]- Si confrontino Waterfall e Incremental Development.
> >[!done]- la risposta
> > Nel Waterfall il feedback del cliente arriva solo alla fine, le fasi sono sequenziali, progettazione e codifica riguardano l'intero prodotto, si usa tipicamente un team grande e i requisiti vengono congelati dopo la specifica. Nell'Incremental il feedback è continuo, le fasi possono procedere in parallelo, progettazione e codifica avvengono per build, lavorano più team piccoli e i requisiti possono essere prioritizzati e modificati più facilmente.

## Spiral Model

Il **full-spiral model** è stato proposto da Boehm nel 1988.

![[assets/d234c4c9_p32_i0.jpeg|500]]

>[!question]- Chi ha proposto il full-spiral model e quando?
> >[!done]- la risposta
> > Il full-spiral model è stato proposto da Boehm nel 1988.

## Risk Management

### Def rischio

Un ***risk*** è la probabilità che si verifichi una circostanza avversa.

Il *risk management* serve a:
- identificare i rischi;
- creare piani per minimizzare il loro effetto sul progetto.

### Categorie di rischio

I rischi possono essere classificati in tre categorie:

- **project risks**
    - influenzano:
        - pianificazione;
        - risorse.
- **product risks**
    - influenzano:
        - qualità;
        - prestazioni del prodotto.
- **business risks**
    - influenzano l'organizzazione.

![[assets/d234c4c9_p33_i0.png|500]]

### Processo di Risk Management

Il processo di *risk management* comprende quattro passi:

1. **Risk identification**
2. **Risk analysis**
3. **Risk planning**
4. **Risk monitoring**

![[assets/d234c4c9_p35_i0.png|500]]

>[!question]- Che cos'è un rischio e quali sono le fasi del Risk Management?
> >[!done]- la risposta
> > Un rischio è la probabilità che si verifichi una circostanza avversa. Il Risk Management identifica i rischi e prepara piani per minimizzarne gli effetti attraverso quattro fasi: Risk identification, Risk analysis, Risk planning e Risk monitoring.

## Risk Identification

La **Risk Identification** è il primo passo del processo.

I principali tipi di rischio individuati sono:
- *Technology risks*;
- *People risks*;
- *Organisational risks*;
- *Tools risks*;
- *Requirements risks*;
- *Estimation risks*.

![[assets/d234c4c9_p37_i0.png|500]]

## Risk Analysis

La **Risk Analysis** è il secondo passo del processo e valuta almeno:
- probabilità del rischio;
- effetto del rischio.

### Probabilità

| Livello | Probabilità |
| --- | --- |
| *very low* | $<10\%$ |
| *low* | $10\%-25\%$ |
| *moderate* | $25\%-50\%$ |
| *high* | $50\%-75\%$ |
| *very high* | $>75\%$ |

### Effetti

Gli effetti possono essere:
- *catastrophic*;
- *serious*;
- *tolerable*;
- *insignificant*.

![[assets/d234c4c9_p39_i0.png|500]]

### Top-ten risks

I *top-ten risks* vengono individuati considerando:
- tutti i rischi *catastrophic*;
- i rischi *serious* con probabilità superiore a *moderate*.

Dopo la selezione, i rischi vengono ordinati in una classifica.

![[assets/d234c4c9_p41_i0.png|500]]

>[!question]- Come vengono valutati e selezionati i rischi nella Risk Analysis?
> >[!done]- la risposta
> > La probabilità viene classificata da very low a very high, mentre gli effetti possono essere catastrophic, serious, tolerable o insignificant. I top-ten risks comprendono tutti i rischi catastrophic e i serious con probabilità superiore a moderate, che vengono poi ordinati.

## Risk Planning

La **Risk Planning** è il terzo passo del processo.

Consiste nello sviluppare strategie per gestire i rischi:

- **avoidance**
    - ridurre la probabilità che il rischio si verifichi;
- **minimisation**
    - ridurre l'impatto del rischio;
- **contingency plans**
    - predisporre come affrontare il rischio nel caso si verifichi.

![[assets/d234c4c9_p42_i0.png|500]]

>[!question]- Quali strategie vengono usate nella Risk Planning?
> >[!done]- la risposta
> > Le strategie sono avoidance, per ridurre la probabilità del rischio; minimisation, per ridurne l'impatto; e contingency plans, per stabilire come affrontarlo qualora si verifichi.

## Risk Monitoring

La **Risk Monitoring** è il quarto passo del processo.

I rischi identificati vengono valutati regolarmente per seguire:
- variazioni della probabilità;
- variazioni degli effetti.

La valutazione utilizza:
- *risk factors*;
- potenziali indicatori associati ai diversi tipi di rischio.

I rischi vengono inoltre discussi durante i meeting di avanzamento del management.

![[assets/d234c4c9_p44_i0.png|500]]

>[!question]- In cosa consiste la Risk Monitoring?
> >[!done]- la risposta
> > Consiste nel rivalutare regolarmente i rischi identificati per controllare cambiamenti nella loro probabilità e nei loro effetti. La valutazione usa risk factors e indicatori potenziali, e i rischi vengono discussi nei meeting di avanzamento del management.

## Altri modelli di processo

### Object-Oriented Model

L'**Object-Oriented model** è presentato come un modello di processo alternativo.

![[assets/d234c4c9_p46_i0.png|500]]

### Concurrent Engineering

Il ***concurrent engineering***, detto anche *simultaneous engineering*, riduce:
- tempi di sviluppo;
- costi.

Lo fa facendo coesistere le fasi di sviluppo invece di eseguirle in modo strettamente sequenziale.

### Modelli basati su Formal Methods

I modelli basati su ***formal methods*** utilizzano una specifica matematica del software per:
- eliminare ambiguità;
- facilitare la verifica.

Un esempio è **Cleanroom Software Engineering**, del 1987.

![[assets/d234c4c9_p47_i0.png|500]]

>[!question]- Quali altri modelli di processo vengono presentati oltre a quelli iterativi?
> >[!done]- la risposta
> > Vengono indicati l'Object-Oriented model, il concurrent engineering, che fa coesistere le fasi per ridurre tempi e costi, e i modelli basati su formal methods, che usano specifiche matematiche per eliminare ambiguità e facilitare la verifica; Cleanroom Software Engineering del 1987 è un esempio.
