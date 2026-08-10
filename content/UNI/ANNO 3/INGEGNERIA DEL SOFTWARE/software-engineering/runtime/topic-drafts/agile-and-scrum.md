# Metodologie Agile e Scrum

## Agile Methods

Gli ***Agile Methods*** emergono nei primi anni 2000 come reazione ai processi software fortemente pianificati, percepiti come troppo restrittivi per gli sviluppatori.

L'approccio agile estende lo sviluppo *iterative* e *incremental* introducendo:
- comunicazione intensa;
- *feedback* rapido;
- poche regole esterne.

I valori e i principi comuni dei metodi Agile sono sintetizzati nell'**Agile Manifesto**.

![[assets/4f64ac69_p5_i0.png|500]]

>[!question]- Perché nascono gli Agile Methods e quali caratteristiche aggiungono allo sviluppo iterativo e incrementale?
> >[!done]- la risposta
> > Gli Agile Methods nascono nei primi anni 2000 come reazione ai processi software fortemente pianificati, considerati troppo restrittivi. Estendono lo sviluppo iterativo e incrementale introducendo comunicazione intensa, feedback rapido e poche regole esterne.

## Agile Manifesto

L'**Agile Manifesto** raccoglie i valori e i principi che definiscono i concetti di base dello sviluppo agile.

I quattro valori sono:

- **individuals and interactions** over processes and tools;
- **working software** over comprehensive documentation;
- **customer collaboration** over contract negotiation;
- **responding to change** over following a plan.

Oltre ai valori, il manifesto contiene anche **12 principi Agile** che forniscono ulteriori linee guida.

![[assets/4f64ac69_p6_i0.png|500]]

>[!question]- Quali sono i quattro valori dell'Agile Manifesto?
> >[!done]- la risposta
> > L'Agile Manifesto privilegia individuals and interactions rispetto a processes and tools, working software rispetto a comprehensive documentation, customer collaboration rispetto a contract negotiation e responding to change rispetto a following a plan. A questi valori si aggiungono 12 principi Agile.

## Scrum

**Scrum** è introdotto come un metodo Agile.

![[assets/4f64ac69_p7_i0.png|500]]

### Ruoli di Scrum

Scrum distingue tre ruoli principali.

- **Scrum Master**
    - assicura che la metodologia sia compresa;
    - assicura che venga implementata;
    - supporta il team;
    - aiuta gli altri a interagire secondo le regole di Scrum.
- **Product Owner**
    - gestisce i requisiti nel *product backlog*;
    - assegna loro le priorità.
- **Development Team**
    - è responsabile dello sviluppo del prodotto;
    - svolge:
        - progettazione;
        - codifica;
        - *testing*.

![[assets/4f64ac69_p8_i0.png|500]]

>[!question]- Quali sono i ruoli principali di Scrum e quali responsabilità hanno?
> >[!done]- la risposta
> > Lo Scrum Master assicura che Scrum sia compreso e applicato e supporta il team; il Product Owner gestisce e prioritizza i requisiti nel product backlog; il Development Team realizza il prodotto occupandosi di progettazione, codifica e testing.

## Sprint

### Def sprint

Uno ***sprint*** è un'iterazione della durata di **2-4 settimane** finalizzata a consegnare un nuovo incremento di software funzionante.

Il ciclo dello sprint comprende:

1. **Sprint Planning**
    - all'inizio dello sprint;
    - alcuni elementi vengono trasferiti:
        - dal *product backlog*;
        - allo *sprint backlog*.
2. **Esecuzione dello sprint**
    - il Development Team lavora sull'incremento;
    - si tengono brevi *daily Scrum* o *stand-up meeting*;
        - servono a sincronizzare il lavoro;
        - permettono di affrontare i problemi.
3. **Sprint Review**
    - alla fine dello sprint;
    - l'incremento viene presentato:
        - al Product Owner;
        - agli *stakeholder*.
4. **Sprint Retrospective**
    - conclude lo sprint;
    - serve a:
        - individuare miglioramenti;
        - pianificarli per lo sprint successivo.

![[assets/4f64ac69_p9_i0.png|500]]

>[!question]- Si descriva il ciclo completo di uno sprint Scrum.
> >[!done]- la risposta
> > Uno sprint dura 2-4 settimane e punta a produrre un incremento funzionante. Inizia con lo Sprint Planning, in cui elementi del product backlog passano allo sprint backlog. Durante lo sprint il team sviluppa l'incremento e si sincronizza con daily Scrum. Alla fine si svolgono Sprint Review, per presentare l'incremento a Product Owner e stakeholder, e Sprint Retrospective, per individuare miglioramenti per lo sprint successivo.

## Definition of Done

### Def Definition of Done

Scrum richiede una **Definition of Done**, stabilita dal Development Team.

La Definition of Done specifica che cosa significa considerare completato un elemento di lavoro prima della sua integrazione.

Tra i requisiti minimi tipici rientrano:
- *test case* adeguati;
- controlli di integrazione;
    - devono assicurare che il *main branch* non venga rotto;
- documentazione del codice adeguata;
    - il significato di "adeguata" viene definito dal team.

![[assets/4f64ac69_p10_i0.png|500]]

>[!question]- Che cos'è la Definition of Done in Scrum?
> >[!done]- la risposta
> > La Definition of Done è stabilita dal Development Team e definisce quando un elemento di lavoro può essere considerato completato prima dell'integrazione. Tipicamente richiede test case adeguati, controlli di integrazione che non rompano il main branch e documentazione del codice considerata adeguata dal team.

## User Stories

Le ***user stories*** sono una pratica comune nello sviluppo Agile e vengono spesso utilizzate insieme a Scrum, anche se **non sono definite nello Scrum Guide**.

### Def user story

Una **user story** è un formato breve, tipicamente una frase, usato per descrivere un requisito dal punto di vista dell'utente.

Il template comune è:

`As a <role>, I want <goal> so that <benefit>`

La struttura esplicita:
- il ruolo;
- l'obiettivo;
- il beneficio.

Le user stories di grandi dimensioni, successivamente suddivise in storie più piccole, sono chiamate ***epics***.

![[assets/4f64ac69_p11_i0.png|500]]

>[!question]- Che cos'è una User Story e che relazione ha con Scrum?
> >[!done]- la risposta
> > Una user story è una descrizione breve di un requisito dal punto di vista dell'utente, spesso espressa con il template "As a <role>, I want <goal> so that <benefit>". È una pratica comune nello sviluppo Agile e viene spesso usata con Scrum, ma non è definita nello Scrum Guide. Le user stories molto grandi che vengono poi suddivise sono chiamate epics.
