### ROBA GIT DA AGGIUNGERE
### Concetto di branch in git
- definizione
	- linee di sviluppo parallele
	- costruisce più flussi di sviluppo
	- branch è un puntatore al commit
- di solito si ha la linea di sviluppo principale
	- branch principale main
	- da questo poi se ne derivano diverse linee di sviluppo
	- fare merge abitualmente così che non si creino conflitti alla fine
comandi
- `git branch nome` a partire dal main crea un nuovo branch
- `git checkout nome/id` cambia la working directory in base al branch, ti fa passare da un branch a un'altro
	- il passaggio puoi farlo solo dopo aver fatto COMMIT dalla tua branch attuale
- head punta al valore del commit di un certo branch a cui stiamo puntando
- `git shash` ti fa fare un salvataggio temporaneo e torni al commit precedente
- `git pop` ti recupera lo stato salvato da stash
- `git merge` consente di unire due branch tra loro
	- fenomeno del fast forward: il main prosegue i comit del nuovo branch
	- merge commit: merge dove ci possono essere conflitti, può essere automatico o manuale
		- alla fine comunque mi trovo con un nuovo commit nato dalle modifiche di queste operazioni di merge
		- dietro c'è un lavoro riga per riga, ma con i binari possono esserci difficoltà quindi magari possiamo solo scartare determinate righe
- foto circa a slide 7- 9
- fenomeno di rebase quando hai due modifiche 
- git ignore, file per dirgli cosa ignorare
	- file, cartelle, pure tipo node modules
#### HTML
- path relativi o diretti
- peffozza
	- il browser li mette inautomatico concatenando il path attuale con quello messo
	- / davanti assoluto al server web
	- ../ oppure file e basta relativa alla pagina web e verrà sostituita
