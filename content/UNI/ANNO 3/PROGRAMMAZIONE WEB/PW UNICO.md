### DNS WEB ECC...

## GIT
- DEFINIZIONE -> 
	- strumento di versionamento per utilizzo produzione software ecc...

DIVIDE IN:
- WORKING TREE
	- cartella di lavoro locale
- INDEX
	- commit indicizzazione dei cambiamenti in teoria
- REPOSITORY locale
	- release del prodotto somma dei commit in locale
	- contiene tutte le commit tutte le info ecc anche in locale!
- REPOSITORY REMOTO SERVER
	- stessa repo ma su un server

- COMPOSTO DA COMMIT
	- SNAPSHOT DELLA REPOSITORY, LA LORO SOMMA MOSTRA IL PRODOTTO FINALE
- operazioni
	- push -> carico sulla repo
	- pull -> scarico dalla repo, in realtà fa 2 step
		- fetch recupera le modifiche dalla repo ma senza modificarle
		- merge congiunge le modifiche dalla working tree alle modifiche del fetch	
		- commit -> indicizzazione delle modifiche
