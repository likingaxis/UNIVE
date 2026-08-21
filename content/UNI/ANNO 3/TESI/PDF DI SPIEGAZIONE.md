#### INDICE IN LATEX DA METTERE
#### 1. Cos’è VulcAIn
VulcAIn è un ecosistema modulare che combina agenti AI e IaC (Infrastructure as Code) per automatizzare la progettazione e la generazione di macchine vulnerabili destinate a CTF e scenari B2R (Boot to Root).
Il sistema è suddiviso nel seguente workflow:
- VulcaMind: a partire da una descrizione iniziale definisce la struttura della challenge, la storyline, il percorso di attacco alla macchina e la relativa soluzione.
- VulcaForge: traduce questa progettazione in una descrizione concreta dell'infrastruttura che avrà la macchina, selezionando e combinando vulnerabilità, servizi e configurazioni già presenti. Successivamente, una componente Python genera le configurazioni Ansible, il Dockerfile e gli script di verifica.
- VulcaShip: gestisce il deployment delle macchine sull'infrastruttura effettiva di virtualizzazione.
#### 2. Problema attuale
L'attuale workflow permette la generazione completa della macchina, ma la validazione finale è estremamente limitata, con semplici controlli automatici che verificano la presenza e il corretto funzionamento di configurazioni e componenti della macchina.
Tuttavia, questi controlli non garantiscono affatto che la macchina sia realmente risolvibile seguendo il percorso ideato.
Da questa necessità nasce l'obiettivo del mio lavoro di tesi.
#### 3. Obiettivo della tesi - VulcaTest
Il mio obiettivo è quello di progettare e implementare un nuovo componente, VulcaTest, da integrare nel workflow.
Il compito di VulcaTest sarà quello di eseguire un’operazione di validazione della macchina generata tramite attività di pentesting, verificando che il comportamento della macchina corrisponda a quello previsto in fase di progettazione.
#### 4. Sviluppo, feedback loop e valutazione sperimentale
In caso di fallimento, VulcaTest dovrà raccogliere le problematiche riscontrate e consentire una correzione automatica (Self-Healing), attraverso un ciclo iterativo che termina una volta raggiunto il comportamento atteso oppure sotto determinate condizioni.
Una volta completata questa parte, si potranno esplorare migliorie avanzate, come la ricerca di percorsi di attacco alternativi rispetto a quelli previsti e ulteriori controlli automatici per verificare la qualità e la correttezza delle macchine generate.
Oltre ad implementare VulcaTest, il lavoro di tesi in contemporanea dovrà avere una forte impronta nella valutazione delle diverse scelte progettuali da adottare, confrontando vari approcci e variando sia la struttura del workflow che le informazioni fornite all'agente durante il pentesting.
Verranno inoltre analizzate l'efficacia delle diverse soluzioni, la frequenza e la tipologia degli errori commessi e l'affidabilità complessiva del processo di validazione, con l'obiettivo di adottare le strategie più efficaci motivandole.