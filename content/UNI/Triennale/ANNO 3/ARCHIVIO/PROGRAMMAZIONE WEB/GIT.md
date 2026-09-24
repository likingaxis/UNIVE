## GIT
- DEFINIZIONE -> 
	- strumento di versionamento per utilizzo produzione software ecc
	- **Git** è un **sistema di controllo di versione (Version Control System)** utilizzato nello sviluppo software per **gestire e tracciare le modifiche al codice nel tempo**.
### Concetto di branch in git
- Un **branch** è una **linea di sviluppo indipendente** all’interno di un repository
- Permette di lavorare su più funzionalità **in parallelo senza interferire**
- Ogni branch rappresenta una **istantanea del progetto in un certo momento**
- Tecnicamente:
	- un branch è un **puntatore a un commit**
	- spostandosi nel branch si cambia la “versione” del progetto
- di solito si ha la linea di sviluppo principale
	- branch principale main
	- da questo poi se ne derivano diverse linee di sviluppo
Best practice:
- creare **un branch per ogni task**
- fare merge spesso → evita conflitti grossi alla fine
- `HEAD` è un **puntatore al commit corrente**
	- indica:
		- su quale branch sei
		- quale versione stai usando
DIVIDE IN:
- WORKING TREE
	- È la **cartella di lavoro locale** sul computer dello sviluppatore locale
- INDEX (Staging Area)
	- È l'area dove si **preparano le modifiche prima del commit**.
	- Qui vengono messi i file che si vogliono includere nel prossimo commit.
- REPOSITORY locale
	- release del prodotto somma dei commit in locale
	- contiene tutte le commit tutte le info ecc anche in locale!
- REPOSITORY REMOTO SERVER
	- stessa repo ma su un server
- COMPOSTO DA COMMIT
	- SNAPSHOT DELLA REPOSITORY, LA LORO SOMMA MOSTRA IL PRODOTTO FINALE
	- Salva le modifiche preparate nello **staging area** dentro il **repository locale**.
- operazioni
	- push -> carico dal repository locale a quello remoto
	- pull -> scarico dalla repo remota , in realtà fa 2 step
		- fetch recupera le modifiche dalla repo ma senza modificare la working directory
		- merge congiunge il repository locale con quello remoto
	- add -> aggiunge i file allo staging area
	- status -> ti dice lo status della repository locale
	- git log -> ti dice tutti i commit della repo con nome, ora ecc...
### comandi
- `git branch nome`  
    crea un nuovo branch a partire dal commit corrente (di solito dal main)

- `git checkout nome/id`  
    cambia la working directory in base al branch o commit, ti fa passare da un branch a un altro
    - il passaggio puoi farlo solo se hai salvato le modifiche:
        - `git commit`
        - oppure `git stash`

- `HEAD`  
    punta al commit corrente del branch su cui stiamo lavorando (cioè la posizione attuale nella storia)

- `git stash`  
    salva temporaneamente le modifiche non committate e ti riporta allo stato del commit precedente

- `git stash pop`  
    recupera lo stato salvato con stash e lo riapplica alla working directory

- `git merge`  
    consente di unire due branch tra loro
    - **fast forward**:  
        il branch principale (es. main) viene semplicemente “spostato avanti” seguendo i commit dell’altro branch (storia lineare)
![[Pasted image 20260317152201.png|300]]
    - **merge commit**:  
        quando i branch hanno entrambi modifiche → viene creato un nuovo commit di merge
        - può esserci conflitto → automatico o manuale
        - alla fine ottieni un commit che unisce entrambe le modifiche
        - Git lavora riga per riga, ma con file binari spesso non riesce → devi scegliere quale versione tenere
![[Pasted image 20260317152315.png|300]]
![[Pasted image 20260317152347.png|300]]

- **rebase**  
    quando hai due linee di sviluppo, invece di fare merge puoi “spostare” i commit sopra un altro branch
    - rende la storia più lineare
    - attenzione: riscrive la history

- `.gitignore`  
    file per dire a Git cosa ignorare
    - file temporanei
    - cartelle (es. `node_modules/`)
    - file di build o sensibili
```scss
Working Tree
     ↓
   add
     ↓
   Index
     ↓
  commit
     ↓
Repository locale
     ↓
   push
     ↓
Repository remoto
```
