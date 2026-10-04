Il seguente capitolo ha il compito di descrivere e definire il contesto operativo del problema a cui risponde il mio progetto di tesi
##### Cyber Range, CTF e macchine Boot-to-Root
Un Cyber Range rappresenta un ambiente virtuale composto da componenti che simulano infrastrutture del mondo reale come network computer e sistemi con l'obiettivo di consentire un apprendimento didattico delle conoscenze della cybersecurity.
Spesso i seguenti Cyber Range vengono contestualizzati a un obiettivo comune e che promuove lo svolgimento didattico, ovvero l'impiego di challenge con CTF, Capture The Flag, challenge che prevedono la scoperta di vulnerabilità di questi Cyber Range con conseguente ottenimento di risultati tangibili definiti da delle Flag spesso di tipo testuale
Un tipo di Cyber Range sono le macchine Boot-to-Root ovvero macchine che prevedono un pattern ben preciso che parte da ruoli di basso livello fino al raggiungimento del ruolo più importante all'interno di una macchina il root

##### Intended path e conformità di una macchina didattica
Macchine di questo tipo vengono spesso progettate con delle falle e delle vulnerabilità prestabilite che delineano il piano didattico che vogliono offrire, quest'ultimo può anche essere definito intended path ovvero il percorso che è stato progettato.
ciò definisce una caratteristica intrinseca che deve rispettare la macchina, rappresentare il reale percorso progettato

queste macchine sono molto utili ma al tempo stesso sono difficili e complesse da dover realizzare deve essere progettata, realizzata e verificata.

##### VulcAIn: VulcaMind, VulcaForge e VulcaShip
A tal proposito è stato ideata una pipeline per automatizzare la generazione delle macchine vulnerabili favorendo un maggior investimento del tempo sulla fase di progettazione e invece consentendo una riduzione della fase di realizzazione  definita come VulcAIn, l'idea alla base di ciò e la realizzazione è merito di Danilo Dell'Orco e Michele Salvatori

VulcAIn è un ecosistema modulare che combina agenti AI e IaC (Infrastructure as Code) per automatiz-  
zare la progettazione e la generazione di macchine vulnerabili destinate a CTF e scenari B2R (Boot to  
Root). Il sistema è suddiviso nel seguente workflow:  
• VulcaMind: a partire da una descrizione iniziale definisce la struttura della challenge, la storyline, il  
percorso di attacco alla macchina e la relativa soluzione.  
• VulcaForge: traduce questa progettazione in una descrizione concreta dell’infrastruttura che avrà  
la macchina, selezionando e combinando vulnerabilità, servizi e configurazioni già presenti. Successivamente, una componente Python genera le configurazioni Ansible, il Dockerfile e gli script di  
verifica.  
• VulcaShip: gestisce il deployment delle macchine sull’infrastruttura effettiva di virtualizzazione.

non so se qui devo ribadire il fatto che io aggiungo VulcaTest o se devo parlarne solo nel capitolo 1

per eseguire vulcamind e vulcaforge l'automatismo è delegato a degli agenti AI
#### Agenti basati su LLM
In letteratura, i _language agents_ vengono descritti come sistemi di intelligenza artificiale che impiegano Large Language Model per interagire con il mondo, integrando il modello all’interno di un’architettura che può comprendere memoria, ragionamento, pianificazione e interazione con l’ambiente(citazione a CoALA)

Includendo modelli differenti di struttura, alcuni adattano ad esempio
Plan+Execute o ReAct


#### Harness agentici

qui spiego cosa è un harness tipo quello di antigravity claude code o hermes?