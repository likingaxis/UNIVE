Introduzione
Il problema proposto è un **problema di classificazione supervisionata binaria**, in cui si vuole assegnare a ciascun punto del piano una delle due classi (blu o rosa) in base alle sue coordinate.
In un primo approccio, si utilizza un **modello di classificazione lineare**, che tenta di separare le due classi mediante una **frontiera di decisione lineare** (retta).  
L’obiettivo è verificare se l’insieme di punti è **linearmente separabile** e, in caso contrario, valutare come migliorare la classificazione e superare i limiti del modello lineare.
1️⃣ Modello lineare r1 (Percettrone)
Un **percettrone** è un **classificatore lineare supervisionato** che assegna una classe in base al segno di una combinazione lineare delle feature di input.
La funzione di decisione è:
$h(x) = \text{sign}(w^T x + b)$
dove:
- $w$ è il **vettore dei pesi**, che determina l’orientamento della frontiera,
- $b$ è il **bias**, che trasla la retta nello spazio.
La **frontiera di decisione** è l’insieme dei punti per cui il modello è indeciso ed è definita dalla retta:
$r_1: w_1 x_1 + w_2 x_2 + b = 0$
Essa divide il piano in due semispazi, ciascuno associato a una classe.  
Come mostrato in figura (retta blu), r1 separa **parzialmente** le classi blu e rosa, ma **alcuni punti risultano misclassificati**, quindi il dataset **non è perfettamente linearmente separabile**.
2️⃣ Punti non correttamente classificati e misura di prestazione
Un punto è **misclassificato** quando il segno di $h(x)$ non coincide con la sua etichetta reale.  
La **prestazione** del classificatore è misurata tramite **accuracy**, definita come la percentuale di punti correttamente classificati.
Nel caso di r1, l’accuracy è inferiore al 100% a causa della sovrapposizione delle classi.
3️⃣ Miglioramento con una seconda legge lineare r2
Modificando i parametri $w$ e $b$ si ottiene una nuova frontiera di decisione:
$r_2: w'_1 x_1 + w'_2 x_2 + b' = 0$
La retta r2 (rossa in figura) recupera almeno uno dei punti precedentemente errati, **aumentando l’accuracy della classificazione**.
Questo mostra che, pur migliorando la prestazione, **un singolo modello lineare non è sufficiente** a risolvere completamente il problema.
4️⃣ Limite del modello lineare
Un classificatore lineare può risolvere solo problemi **linearmente separabili**, cioè casi in cui esiste almeno una retta che separa perfettamente le classi.
In presenza di distribuzioni non lineari, il modello soffre di **scarsa espressività**, indipendentemente dall’ottimizzazione dei parametri.
5️⃣ Architettura neurale proposta (MLP)
Una **rete neurale multistrato (MLP)** è una funzione composta da più trasformazioni lineari seguite da **funzioni di attivazione non lineari**.
Si propone un’architettura con:
- **2 neuroni di input** (feature spaziali),
- **1 strato nascosto con 3 neuroni**,
- **1 neurone di output** per la classificazione binaria.
Lo **strato nascosto** permette alla rete di apprendere **confini di decisione non lineari**, combinando più separatori lineari.
6️⃣ Addestramento della rete
L’addestramento avviene tramite:
- **forward propagation**, che calcola l’output del modello,
- **loss function**, che misura l’errore tra output predetto e target,
- **backpropagation**, che calcola il contributo di ogni peso all’errore,
- **gradient descent**, che aggiorna i parametri per minimizzare la loss.
Durante il training la loss diminuisce e l’errore di classificazione tende a ridursi, consentendo alla rete di risolvere il problema in modo più generale rispetto al percettrone.

