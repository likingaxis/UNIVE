#### Relevance feedback e query expansion
L'obiettivo di questa lezione è quello di ottimizzare la recall andando a recuperare documenti rilevanti che nella query originale non erano stati presi
mediante ad esempio query expansion
- Quando un utente inserisce una query con dei termini che non combaciano perfettamente con i termini presenti nei documenti ma che sono simili starei indicando il fenomeno di *Sinonimia*
##### Ad Hoc retrieval
Per Ad Hoc retrieval si intende quel classico sistema di retrieval dove l'utente formula una query, il sistema restituisce una lista di risultati ordinata e non si hanno successivi feedback
##### Relevance Feedback
Con relevance feedback invece il sistema prevede un sistema a feedback ad esempio da parte dell'utente per poi fare ipoteticamente query expansion
si distingue tra due grandi famiglie di metodi:
- *metodi locali*
	- il feedback si basa solo sui documenti recuperati la prima volta e una ipotetica query expansion si fa solo su quell'insieme di documenti
- *metodi globali*
	- non dipendono direttamente dai risultati della singola query ma sfruttano tutta la collezione per fare ad esempio query expansion
###### Relevance feedback locale
il metodo locale di relevance feedback ha la seguente catena operativa
- l'utente fa una query
- ottiene dei risultati
- contrassegna un feedback per quei risultati
- il sistema può osservare i termini presenti nei documenti ritenuti rilevanti e costruire una query migliore
Il relevance feedback funziona bene solo se seguiamo 2 assunzioni principali:
- la query originale dell'utente sia abbastanza vicino al suo information need altrimenti rischio query drift, quel fenomeno per cui la query va a recuperare informazioni completamente opposte a ciò che necessitava l'utente
- se i documenti rilevanti usando termini molto diversi tra loro non riesco ad avere un centroide che identifica un certo gruppo di termini per approfondire quella query avrei un centroide che fa la media di 3 gruppi diversi


>[!Example]- Esempio
> ![[Pasted image 20260519113238.png|462]]
> ![[Pasted image 20260519113314.png|462]]
> ![[Pasted image 20260519113343.png|462]]
###### Centroid e rocchio algorithm
- funziona SOLO con vector space model
Per avvicinarci ai termini dei documenti segnalati come rilevanti possiamo mediante rappresentazione con vector space model 
calcolare un centroide, ovvero un vettore medio di un insieme di documenti
Se $D$ è un insieme di documenti, il suo centroide è:
$$\vec{\mu}(D) = \frac{1}{|D|} \sum_{d \in D} \vec{v}(d)$$
- $D$ è un insieme di documenti
- $\vec{v}(d)$ è il vettore che rappresenta il documento $d$
- la somma dei vettori viene divisa per il numero di documenti, quindi si ottiene una media
###### Ipotizzando una Query ottima
Avremmo già a conoscenza 
- $C_r$: l’insieme di **tutti** i documenti rilevanti nella collezione
- $C_{nr}$​: l’insieme di **tutti** i documenti non rilevanti nella collezione
Sapendo questi due dettagli potremmo ipoteticamente rappresentare un vettore query ottimo che separi i documenti rilevanti da quelli non rilevanti
$$S(\vec{q}, C_r, C_{nr}) = s(\vec{q}, \vec{\mu}(C_r)) - s(\vec{q}, \vec{\mu}(C_{nr}))$$
- $\vec{\mu}(C_r)$ è il centroide dei documenti rilevanti
- $\vec{\mu}(C_{nr})$ è il centroide dei documenti non rilevanti
con confronto mediante Cosine similarity avremmo
$$\vec{q}_{opt} = \frac{1}{|C_r|} \sum_{\vec{d}_j \in C_r} \vec{d}_j - \frac{1}{|C_{nr}|} \sum_{\vec{d}_j \in C_{nr}} \vec{d}_j$$
Quindi la query ottima è la differenza tra il centroide dei documenti rilevanti e il centroide dei documenti non rilevanti
ovviamente questo è solo ipotetico perché non conosciamo in anticipo tutti i documenti rilevanti e non rilevanti ma possiamo sfruttarlo per fare delle approssimazioni con un certo algoritmo
![[Pasted image 20260519160332.png|496]]
###### Rocchio Algorithm
L'algoritmo di Rocchio va ad approssimare la query ottima andando ad usare le informazioni disponibili dopo il relevance feedback, quindi avremmo un insieme di documenti giudicati dall'utente come rilevanti e un insieme dei documenti giudicati dall'utente come non rilevanti
Rocchio va sostanzialmente a modificare la query originale
$$\vec{q}_m = \alpha \vec{q}_0 + \beta \frac{1}{|D_r|} \sum_{\vec{d}_j \in D_r} \vec{d}_j - \gamma \frac{1}{|D_{nr}|} \sum_{\vec{d}_j \in D_{nr}} \vec{d}$$
- $\alpha$: quanto peso dare alla query originale
- $\beta$: quanto peso dare ai documenti rilevanti
- $\gamma$: quanto peso dare ai documenti non rilevanti

ovviamente è più utile un feedback positivo che negativo e i parametri adottati spesso sono
$\alpha = 1, \qquad \beta = 0.75, \qquad \gamma = 0.15$
###### Pseudo-relevance feedback
Per automatizzare la fase di feedback senza il bisogno di un utente che ci contrassegni cosa è rilevante e cosa no andiamo a definire una procedura che assume i primi $k$ documenti per rilevanti 
e poi applica il metodo di relevance feedback su questi $k$ ad esempio con Rocchio algorithm
Ovviamente questo tipo di automatizzazione ha senso se il sistema già di base recupera i documenti in modo abbastanza buono andando quindi a migliorare la recall ovvero i documenti rilevanti recuperati
- se il sistema è pessimo si rischia il fenomeno di query drift
##### Global Query expansion
Tecnica usata per migliorare la recall di un sistema di IR modificando la query originale dell'utente aggiungendo ad esempio termini collegati semanticamente a quelli originali
- la riformulazione della query non dipende dai risultati restituiti dalla query originale dell'utente ma da una ricostruzione basandosi ad esempio su una collezione o su conoscenze esterne
Usa risorse generali come:
- tesauri
i tesauri sono quelle raccolte di termini collegate semanticamente e si dividono in due tipologie manuali e automatici
- manuali
	- raccolte di termini collegati tra loro costruite da editor umani
		- come Wordnet
- automatici
	- viene costruito automaticamente analizzando la collezione dei documenti
La query expansion ricordiamo che aumenta la recall ma rischia di ridurre la precision poiché andiamo ad aggiungere termini possibili nel ranking
###### SVD E LSI NEL QUERY EXPANSION
SVD e LSI possono essere viste come tecniche che aiutano mediante lo spazio latente un possibile query expansion creando correlazione tra termini che si trovano vicini tra loro e che possono creare un topic