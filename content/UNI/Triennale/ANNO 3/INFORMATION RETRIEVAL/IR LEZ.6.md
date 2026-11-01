### VALUTAZIONE DEI SISTEMI
si vuole valutare un sistema di information retrieval tramite un metodo standard e replicabile mediante benchmark in modo tale che si misuri la soddisfazione dell'utente
si ha per fare questi benchmark
- una collezione di documenti di test
- un insieme di query realistiche
- un insieme di giudizi di rilevanza(gold standard)
si valuta l'output finale e non le singole componenti del sistema IR
#### Gold standard
processo di creazione dei dati etichettati come verità di riferimento **ground truth**
detta anche collezione annotata
si valuta la rilevanza in modo soggettivo ma se si usano più utenti giudicanti si aumenta l'affidabilità di questo insieme di dati
divisione in step:
- preparazione di query rappresentative
- recupero dei documenti candidati con un sistema di IR base che massimizza la recall(cerco di recuperare tutti i possibili documenti)
- annotazione umana che dice se un documento è rilevante o meno
#### Precision & Recall
dopo avere la nostra collezione di riferimento per fare i benchmark definiamo delle misure che consentono un confronto tra quelli rilevanti per il gold standard e quelli rilevanti per il nostro sistema di IR che vogliamo confrontare
- formule:
    - **Precision**
        - tra i documenti che ho preso, quanti sono davvero rilevanti?
        - quando vogliamo recuperare pochi documenti ma buoni$$P = \frac{TP}{TP + FP}$$
    - **Recall**
        - tra tutti i documenti rilevanti, quanti sono riuscito a trovare?
        - usata quando vogliamo recuperare tanti documenti e assecondare eventuali falsi positivi$$R = \frac{TP}{TP + FN}$$
- si cerca un trade off tra i due sfruttando la **F-measure**
- ovvero la media armonica, basta che uno dei due sia basso per avere un risultato finale basso **bilanciamento tra le due**$$F1 = \frac{2PR}{P + R}$$
- poi viene calcolato $error = 1 - accuracy$ dove la accuracy e 
	- quante classificazioni sono corrette sul totale$$accuracy = \frac{TP + TN}{TP + FP + FN + TN}$$
	- non usata perché darei punteggi buoni anche a sistemi che non restituiscono nulla
#### Rank based measures
![[Pasted image 20260410174904.png|390]]
Precision e Recall sono **globali** questo significa che non attuano delle misure sulla posizione in cui è stato messo quel determinato documento
- sistema A mette documenti rilevanti subito
- sistema B li mette in fondo
- → stessi P e R, ma qualità percepita diversa
quindi vediamo delle metriche che tengono conto della posizione
##### A Rilevanza binaria
- una risposta può essere rilevante oppure no
	- 1 o 0
###### Precision@K e Recall@K
Guardo solo i primi $K$ risultati e misuro la precision o la recall
$Precision@K = \frac{\text{relevant nei primi K}}{K}$
- misuro i punteggi del sistema al variare di $K$
- creo un grafico con precision recall sugli assi
- per avere delle misure più regolari prendo a certi punti della recall, solo le precision massime
- andando poi a cercare come break-even point un punto dove precision=recall
![[Pasted image 20260410180214.png|400]]
###### Average Precision (AP) e Mean Average Precision (MAP)
- sono comunque binarie
- *Average Precision (AP)*
	- ogni volta che trovo un documento rilevante calcolo **Precision@K** e poi faccio la media di questi valori
- *Mean Average Precision (MAP)*
	- applico AP su più query
	- $MAP = \frac{1}{|Q|} \sum_{q \in Q} AP(q)$	
	- di tipo macro
- micro: considera tutte le decisioni insieme, query con più documenti pesano di più
- macro: ogni query pesa allo stesso modo indipendentemente da quanti documenti rilevanti ha
##### A più livelli di rilevanza
avere una rilevanza binaria non è molto utile se si vuole effettuare del vero e proprio ranking è bene definire delle misure con **scala di rilevanza** non binaria
###### Discounted Cumulative Gain
misuro:
- quanto è rilevante un documento ovvero il **gain** con rilevanza $r_i$ 
- dove si trova nel ranking con il **discount** con $\frac{1}{\log_2(i)}$
	- un documento in alto vale di più uno in basso vale meno
si calcola quindi il cumulative gain come la somma di un certo range di giudizi di rilevanza
$$CG = r_1+r_2+..r_n$$
poi si applica il discount per misurare i contributi in base alla posizione 
$$DCG_p = rel_1 + \sum_{i=2}^{p} \frac{rel_i}{\log_2 i}$$
###### NDCG (Normalized Discounted Cumulative Gain)
- il valore del DCG da solo non è molto confrontabile e utile per questo si vuole confrontare il DCG con un IDCG ovvero un punteggio migliore possibile ideale
$$NDCG = \frac{DCG}{IDCG}$$
##### Metriche per un solo risultato corretto
se si vuole misurare il recupero di un solo risultato corretto non si usano precision e recall bensì
###### Reciprocal Rank(RR) e Mean Reciprocal Rank (MRR)
- guardo **la posizione del primo documento rilevante** in posizione $K$
$$RR = \frac{1}{K}$$
- estendo a più query con il 
$MRR = \frac{1}{|Q|} \sum_{q \in Q} \frac{1}{rank_q}$
##### Ottimizziamo i giudizi umani
sfruttando i click degli utenti possiamo ottimizzare e automatizzare i giudizi di rilevanza
- stando però attenti ai *click position bias*, se presento una lista a un utente di ranking lui tenderà a cliccare i primi sempre
![[Pasted image 20260418083556.png|300]]
- quindi si prova ad esempio ad applicare valutazioni **relative pairwise**
	- dove, per ridurre il bias faccio fare delle scelte all'utente mettendo a paragone due documenti
- oppure applico confronto con **interleaving e click**
	- calcolo due ranking diversi e mostro all'utente i due ranking intervallati
	- se ottiene più click il gruppo A allora ha vinto il primo sistema di ranking
![[Pasted image 20260418082931.png|500]]
- **A/B testing**
	- creo due gruppi di utenti e vedo le metriche che generano
	- utile per verificare eventuali aggiornamenti di sistema di retrieval
	- tipo se era meglio il sistema A dal sistema B
