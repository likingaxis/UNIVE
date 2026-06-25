idea: chiedere al professore Lorenzo Bracciale
campi dove ha lavorato:
https://nam.cnit.it/people/lorenzo-bracciale
https://lorenzobracciale.github.io/

|Area di ricerca|Idea centrale|Esempi concreti|
|---|---|---|
|**E-health e cybersecurity sanitaria**|Proteggere dati, dispositivi e sistemi sanitari digitali|FHIR, ospedali, dispositivi medici|
|**Data privacy**|Usare dati personali riducendo il rischio di identificazione|anonimizzazione, pseudonimizzazione, GDPR|
|**Crittografia applicata**|Applicare tecniche crittografiche a sistemi reali|gestione chiavi nel cloud|
|**Blockchain e smart grid**|Rendere verificabili le operazioni energetiche senza perdere privacy|energia, transazioni, trasparenza|
|**Network softwarization**|Rendere le reti programmabili e monitorabili via software|eBPF, testbed federati|
|**IoT a basso consumo**|Far comunicare sensori con poca energia|energy harvesting, LoRa, neighbor discovery|
|**Monitoraggio animale**|Usare sensori e reti per conservazione ambientale|iguane rosa delle Galápagos|
|**ICN e sistemi distribuiti**|Organizzare la rete attorno ai contenuti/dati|IoT device management|
Sicurezza e privacy nei sistemi e-health: simulazione di una piattaforma sanitaria e analisi delle principali superfici d’attacco
**Digital Health / eHealth**
progetti interessanti: 
- In Plain Sight: A Pragmatic Exploration of the Italian Medical Landscape (In)security
- Cybersecurity vulnerability analysis of medical devices purchased by national health services
- Anonymization and Pseudonymization of FHIR Resources for Secondary Use of Healthcare Data
### IDEE
1. Simulazione di una porzione di ambiente ospedaliero digitale, con servizi web/API e vulnerabilità controllate da analizzare e mostrare.
2. Progettazione di un honeypot didattico, eventualmente ambientato in un contesto sanitario simulato, per raccogliere e classificare tentativi di attacco.
3. Progettazione di un agente AI a supporto dell’analisi di vulnerabilità, limitato a scenari controllati, codice selezionato o output di strumenti di sicurezza.
4. Uso di tecniche di IA/ML per supportare l’analisi di sicurezza in ambito e-health o network security, ad esempio tramite classificazione di eventi, log o traffico anomalo.
5. Studio delle vulnerabilità dei sistemi LLM e degli agenti AI, come prompt injection, data leakage, tool misuse e limiti delle difese.

###### IDEA 1
Per rendere il progetto credibile, puoi prendere come riferimento il **Fascicolo Sanitario Elettronico 2.0**.

Developers Italia spiega che nel FSE 2.0 confluiscono dati in formato **HL7 FHIR**, acquisiti dai sistemi produttori delle strutture e archiviati nel Data Repository Centrale, e documenti in formato **HL7 CDA2** inseriti in PDF firmati e archiviati nei repository documentali delle strutture sanitarie.
```scss
Backend:
- FastAPI, Node.js/Express o Spring Boot

Database:
- PostgreSQL

Storage documentale:
- MinIO, cioè uno storage locale compatibile S3
  oppure filesystem controllato

Autenticazione:
- JWT oppure sessioni server-side

Containerizzazione:
- Docker Compose

Testing:
- Postman / pytest / script automatici

Security testing:
- OWASP ZAP per test web/API
- test manuali per access control
- eventualmente Semgrep per analisi statica base
```

###### IDEA 2
