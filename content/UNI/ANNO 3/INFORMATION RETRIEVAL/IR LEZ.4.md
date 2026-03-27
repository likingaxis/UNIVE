#### SPELL CORRECTION
- fino ad ora: match esatto dei termini
- problema: utenti **sbagliano a scrivere / non sanno la parola precisa**
quindi introduciamo:
- wildcard queries
- spelling correction
obiettivo:
- recuperare documenti **anche con errori o varianti**
##### WILD CARD
Una wildcard è un simbolo (come `*`) che rappresenta una sequenza arbitraria di caratteri, permettendo di cercare termini anche senza conoscerne esattamente la forma.
- `mon*` → tutte le parole che iniziano con _mon_
	- scendo nel tree con `m → o → n`
- `*mon` → tutte le parole che finiscono con _mon_
	- salvo le parole al contrario e le cerco come prima
- `pro*cent` → parole che iniziano con _pro_ e finiscono con _cent_
	- per risolvere questa query dovrei fare `pro* AND *cent` 
	- estremamente costoso
###### Permuterm index
- è una struttura dati che permette di gestire **wildcard query generali**
- idea: trasformare una wildcard query in una **ricerca per prefisso**
per ogni termine:
- aggiungo un simbolo speciale `$` alla fine
- genero **tutte le rotazioni** della parola
- ogni rotazione punta al termine originale, così da trovarlo facilmente
![[Pasted image 20260325103249.png|400]]
- `$` indica la **fine della parola**
- serve per trovare parole che iniziano con una lettera e finiscono con un'altra
	- ci saranno rotazioni dove appare prima del `$` la fine della parola e dopo il `$` l'inizio 
esempio: 
![[Pasted image 20260325103830.png|500]]

- con una query tipo `X*Y*Z`
	- riscontro dei problemi
	- faccio prima  `X*Z`
	- poi filtro controllando se ognuna di quelle parole ha `Y` in mezzo
###### Bigram (k-gram) indexes
- Il k-gram index indicizza sottostringhe dei termini e permette di trovare candidati che condividono parti della query, ma richiede un post-filtering per eliminare i falsi positivi.
- con k=2 creiamo una lista del seguente tipo
`hello → $h, he, el, ll, lo, o$`
- `$h` → parola che **inizia con h**
- `he` → contiene `"he"`
- `el` → contiene `"el"`
- `ll` → contiene `"ll"`
- `lo` → contiene `"lo"`
- `o$` → parola che **finisce con `o`**
- per cercare ad esempio `mon*`
- → `$m AND mo AND on`
	- interseco le liste dei k-gram
**FALSI POSITIVI**
- alcuni termini passano il filtro ma non matchano davvero
	- `mon*` → trova anche `moon`
*EFFETTUO POST FILTERING*
- controllo finale sulla stringa reale
#### SPELLING TASK
- si divide in:
	- **spelling error detection**
	    - capire se una parola è sbagliata
	- **spelling error correction**
	    - generare la parola corretta
##### TIPI DI ERRORI DI SPELLING
- **non-word**
    - la parola non esiste nel dizionario
    - es: `teh`, `graffe`
    - 👉 facile da individuare (non è nel dizionario)
- **real-word**
    - la parola esiste ma è sbagliata nel contesto
    - es: `form → from`, `there → three`
    - 👉 difficile, serve il **contesto**
- **cognitive**
    - errori dovuti a pronuncia/suono simile (homophones)
    - es: `peace → piece`, `two → too`
    - 👉 legati a come si pronuncia la parola
##### Risolvere non word spelling
- situazione:
    - l’utente scrive una parola che **non esiste nel dizionario**
	    - es: `teh`, `acress`
- costruisco un sistema che:
	-  **genera candidati**
	    - parole reali simili all’errore
	-  **sceglie il migliore**
	    - tra i candidati
- cosa useremo
	- **query word (x)**
	    - parola sbagliata osservata
	    - es: `acress`
	- **candidate word (w)**
	    - possibile parola corretta
	    - es: `actress`, `across`, `access`
	- **candidate set**
	    - insieme di tutte le possibili correzioni
##### Noisy Channel Model
- utilizzo di noisy channel intuition
	- volevo scrivere una parola **corretta `w`**
	- ma ho scritto **`x` per errore**
	- dato `x`, trovare la parola corretta `w`
$$\hat{w}=argmax \ P(w | x)$$
- inverto la probabilità applicando bayes:
	- la frazione si toglie perché è una costante
	$$\hat{w}=argmax​ \ P(x∣w)⋅P(w)$$
- la probabilità di errore dipende da:
	- errori comuni
	- vicinanza dei tasti
	- typo frequenti
- **P(x∣w)** → CHANNEL MODEL PROBABILITY
	- probabilità di fare errore
	- se volevo scrivere `w`, quanto è probabile scrivere `x`?
	- viene approfondita sotto dopo la confusion matrix!
- **P(w)** → UNIGRAM PRIOR PROBABILITY
    - quanto è comune la parola `w`
    - stimata da:
$$P(w) = C(w) / T$$
- dove:  
	- `C(w)` = numero di occorrenze della parola  
	- `T` = numero totale di parole nel corpus
	- più una parola è frequente → più è probabile
###### uso di edit distance per eventuali correzioni
- la **edit distance** misura **quanto due parole sono diverse**
	- più precisamente:
	- è il **numero minimo di operazioni** necessarie per trasformare una parola in un’altra	
	- con operazioni semplici come
	- **insertion**
		- inserisco un carattere
	- **deletion**
		- elimino un carattere
	- **substitution**
		- sostituisco un carattere con un altro
	- **transposition**
	    - scambio due caratteri adiacenti
si usa per trovare parole del dizionario **vicine** alla parola sbagliata
- la edit distance si calcola di solito con una **tabella di programmazione dinamica**
- nella tabella:
    - righe = prefissi della prima parola
    - colonne = prefissi della seconda parola
- ogni cella contiene il **costo minimo** per trasformare un prefisso nell’altro
![[Pasted image 20260325111724.png]]
- circa **l’80% degli errori** sta entro **edit distance 1**
- quasi tutti gli errori reali stanno entro **edit distance 2**
###### Come generare i candidati
- obiettivo:
    - dato un errore `x`, trovare parole simili nel dizionario
1. **brute force**
    - confronto `x` con tutte le parole del dizionario (edit distance)  
        ❌ troppo costoso
2. **genero tutte le parole con edit distance ≤ k**
    - poi le confronto con il dizionario  
        ❌ ancora costoso se il vocabolario è grande
3. **k-gram index (metodo più importante)**
    - uso i k-gram per trovare parole simili 
        ✔ molto più efficiente
4. **finite state automata / transducer**
    - calcolo veloce della edit distance  
        ✔ più avanzato
5. **liste precomputate**
    - mapping errore → correzioni  
        ✔ veloce ma poco flessibile
###### Computing error probability Confusion matrix
- una matrice che contiene quanto è probabile ogni tipo di errore, sotto una certa trasformazione di quelle viste con la edit distance
	- es:`sub[r,c]` → quante volte `r` diventa `c`
![[Pasted image 20260325112927.png|400]]
###### Channel model
- definizione operativa del channel model
- bello vedere nella formula del noisy channel model $P(x∣w)$
	- cosa è esattamente?
![[Pasted image 20260325113523.png]]

- esempio con sub:
	- `sub[c,r]` = quante volte scrivo `c` invece di `r`
		- Hai un dataset di errori, quante volte succede che quella parola viene inserita al posto di un altra
	- `count[r]` = quante volte compare `r`
		- count sta per quante volte compare quella determinata occorrenza

![[Pasted image 20260325114032.png]]

###### Concetto di smoothing di laplace
- problema:
    - usando la confusion matrix
    - alcune probabilità possono essere **0**
	- e questo **azzera tutto il prodotto**
$$P(x∣w)⋅P(w)=0$$
- aggiungo una piccola quantità a tutte le probabilità(tipo 1) 
- 👉 così:  nessun evento ha probabilità 0

appunti da qui sotto
##### Noisy channel in base al contesto per spell correction
- sapere che il 25-40% delle spelling error sono real world
	- spiegazione di cosa significa
- il modello qui usa più sentence
	- da mettere nel calcolo probabilistico
		- formula a slide 48, dentro w ci sono le frasi candidate
- w1 a slide 49 è la prima parola della frase o la prima parola di un errore?
- le uniche cose che posso fare visto che il campione è ridotto, posso vedere solo data una parola la parola successiva e basta
	- sono modelli markoviani
		- slide 50, formula probabilistica, dice che aggiunge dello smoothing per le parole mai uscite, forse aggiungiamo come smoothing quante volte appare la parola singolarmente UNI
			- uso lambda come valore per dare un peso alle probabilità
				- della parola singola o della parola nel bi gramma
				- quanto vale lambda?
					- lo definisco costruendo un benchmark provando i vari valori di lambda, ottenendo una stima 
		- per non far esplodere tutto con la produttoria(tra le probabilità fatte per confrontarle)
		- uso il logaritmo per alleggerire le stime
- esempio
	- scritto a slide 52
		- dentro ci sarebbe stato across
		- invece qui viene messo actress
###### Hidden markov model
- markov nasce per tradurre sequenze
- composto da
	- osservazioni cosa vedo
	- hidden cosa devo indovinare
	- tutta la struttura viene chiamata trennis?
- slide 54, cosa vediamo
- ho la probabilità di osservazione e transizione
- se le vedo tutte affitto domani
- da qui viene l'algoritmo di viterbi
	- scrivi decentemente cosa è
	- non verrà usato, potrebbe suggerire troppo?
- andiamo invece a semplificare, con one/two error per sentence
- rischio: la probabilità potrebbe cambiare tutto
	- magari l'utente usa parole rare
	- cerchiamo di correggere artificialmente che quella parola sia effettivamente quella
- slide 59, peter norvig, le probabilità di tutti i cambiamenti
	- ma se non abbiamo dei cambiamenti?
	- prendiamo per assodato che la probabilità che la parola scritta sia corretta alta
	- poi il tutto si scontra con le successive?
- qui a slide 60 usiamo Beta per cercare di non dare troppa probabilità alla frequenza