#### RANKED RETRIEVAL
- introduzione su cosa è questo sistema di ordinamento delle k più importanti
###### Boolean Search
- voglio avere un soft AND per trovare ricerche che prevedono anche solo una parte della query fatta
	- cercando di stimare la rilevanza di un certo documento
	- assegnando uno score tra 0 e 1 di quel determinato match 
- calcolo la jaccard similarity
- uso di una incidence matrix
	- con vector space model
- l'ordine delle parole non mi interessa con la count matrix
- ma count matrix è diversa da incidence matrix?
	- per rappresentare i valori, uso il logaritmo per aggiustare la frequenza delle parole
- questo sistema studiato sopra non funziona benissimo
- la funzione di ordinamento sarà proporzionale al contributo delle singole parole nel documento come esse sono riportate all'interno della query
##### usiamo il modello tf-idf
- modello a slide 31
- per ridimensionare il tutto facciamo il logaritmo di N/la frequenza 
	- tipo per le stop word
	- le tolgo
- non ho capito come viene penalizzata o premiata una determinata parola
- 