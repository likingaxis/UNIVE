##### Relevance feedback e query expansion
- posso migliorare la mia funzione di ranking?
	- impostare e definire la funzione di rilevanza
- valutare un benchmark
	- usiamo precision e recall
	- che si sfruttano con F measure, media armonica pessimistica
###### Ad hoc retrieval
va in contrapposizione del feedback dell'utente
- se ho aircraft ma cerco aeroplano non troverò nulla perchè non ho word embedding
- se io avessi fatto click sul documento recuperato da aircraft 
	- il query reformulation è una operazione che fa l'utente e che può essere utile 
- sarebbe ottimo se il modello linguistico può fare query reformulation
	- per migliorare la recall
- vedremo due approcci
	- locale 
		- spiegazione
	- globale
		- prendere informazioni non tra la singola query e dai risultati recuperati 
		- ma dall'intera collezione dei documenti
###### Relevance feedback
- l'utente inserisce la query
- il search engine ritorna dei risultati
- l'utente inserisce rilevante e non rilevante dei risultati
- il search engine si adatta
- riesegue la query sperabilmente avendo introdotto qualcosa
	- con il vantaggio che il documento selezionato rilevante possa dare più termini da aggiungere alla query reformulation
- si può applicare a tutti i modelli ma in particolare ora lo vedremo per vector space model
- Esempio: a slide 12 13 ecc
	- i documenti sono stati selezionati per tf-idf
###### Centroid e rocchio algorithm
- funziona SOLO con il vector space model
	- la query è un vettore in uno spazio vettoriale
	- usare documenti con molta densità in un certo spazio per avvicinare la query 
	- uso un centroide ovvero la media
- in un mondo geometrico posso assumere l'insieme di tutti e solo i documenti rilevanti dalla query e tutti e solo quelli non rilevanti
	- potrei avere la query ottima
	- data dalla formula della optimal query che massimizza S formula a slide 16
	- al posto di includere il vettore query dentro lo tiro fuori e fare la differenza
- non avrò sicuramente la certezza della rilevanza o meno, quindi la query ottima non si può fare
	- posso però approssimare un sottoinsieme di documenti
- per spostare il vettore query ai documenti più importanti e rilevanti
	- posso spostare la query su quel punto centroide
	- ma cerco di spostarmi in modo non eccessivo bensì a metà
- faccio la combinazione lineare
	- me lo lascio parametrico perchè
	- non so se dare importanza alla query alla rilevanza o alla non rilevanza
	- si consiglia sempre di essere conservativi e dare valori
- in modo quasi virtuale aggiunge termini alla query, spostando la query in un altro punto
	- Dnr sta per segnalati non rilevanti dopo un feedback
- questo schema funziona bene anche per classificazione di machine learning applicando algoritmo k-nn
- Non Automatizzazione del feedback
	- faccio 2 assunzioni
		- che l'utente sia molto consapevole della collezione
		- che i documenti rilevanti contengono termini simili
	- relevance feedback non è un bullseye
###### Come automatizzare il feedback(Pseudo relevance feedback)
- lo faccio di nascosto all'utente
- assunzione
	- il primo sistema di ad hoc retrieval non sia così male
- i documenti meno rilevanti che appaiono in pagina 12213213312
	- potrebbero contenere termini diversi
		- li metto tipo al 4-5 posto per migliorare la recall
	- i primi 1-3 saranno davvero i migliori recuperati
	- questo viene detto query drift
###### Migliorare la recall non con metodi locali
- potrei usare metodi globali
	- tipo una rete semantica
	- 