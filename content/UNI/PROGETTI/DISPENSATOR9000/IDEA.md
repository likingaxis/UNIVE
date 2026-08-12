

- progetto:
	- sistema di scrittura appunti
		- prende i tuoi appunti passati
		- prende in pasto il materiale che hai su quella materia
		- organizza ogni corso in cartelle separate
		- inizialmente si fa con google api key poi si integra un deepseek e chat gpt per riformulazione del testo (non da zero)
	- come funziona: mostra una prima versione poco approfondita degli argomenti e fornisce la possibilità di sottolineare e riscrivere determinati punti delle spiegazioni con un editor
	- se premi su una parola o un termine aggiunge sotto una breve spiegazione di quest'ultimo con lo stile basato nel modo scelto da te
	- fornire a chat gpt degli esempi di quello che sto facendo io con IS
- caso d'uso:
	- utente ha un suo "profilo" con vecchi appunti e dispense sparse (da quelle si genera semplicemente un user.md che rappresenta il modo in cui scrive)
	- se l'utente ha scritto altri appunti con l'app si possono creare dei knowledge.md (insieme di correzioni che ha fatto l'utente al primo elaborato che forniva l'ia)
	- utente aggiunge progetto "ingegneria del software" come nuovo corso e carica tutte le fonti che ha ecc
		- l'ia viene interrogata per fornire una mappa iniziale del corso dettagliata con argomenti macro argomenti capitoli moduli ecc
		- l'utente può chiedere di generare una parte di argomento, un modulo un macro argomento un determinato pacchetto di slide o simili (dipende dalle fonti e dalla struttura creata)
		- l'utente avrà una cartella organizzata con fotocorso (con le foto del corso) e poi le varie lezioni o moduli o altro divisi in file markdown
		- successivamente l'utente può sottolineare o evidenziare parti che si vanno ad eliminare nel testo o ad aggiungere
			- vedi sotto per esempi
		- idea: strumento di revisione per appunti redatti con ia, tante volte noto che l'ia salta dei pezzi ecc e io vorrei vederli
- problemi: se le slide hanno immagini o altro bisogna aggiungerle è fondamentale (forse conviene convertire in md quel determinato pdf o altro estraendo le immagini)
- potrebbe essere un add-on per obsidian? senza dover creare un'app di scrittura appunti da zero (molto complicato da fare altrimenti)

- esempi:
	-  scrivi i capitoli di questo blocco selezionato in h6 e non così
	- togli i troppi a capo generati
	- sottolinei la parola "sprint" (esempio di scrum in IS)
		- e premi un bottone che facilmente ti aggiunge a capo o tra parentesi una breve spiegazione di cosa è con un senso