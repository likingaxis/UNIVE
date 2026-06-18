#### Language Model per ranking di information retrieval
##### INTRODUZIONE
In questa lezione si introduce l’uso dei **Language Models per l’Information Retrieval**. L’obiettivo è definire un framework probabilistico in cui, dato un documento $d$, si costruisce un modello generativo $M_d$​, cioè un modello linguistico associato a quel documento.
La differenza rispetto a BM25 o all'approccio probabilistico classico è che non ci chiediamo direttamente:

> quanto è probabile che un documento sia rilevante per una certa query?

ma ci chiediamo:

> quanto è probabile che la query dell’utente sia stata generata dal modello linguistico del documento?

Formalmente, quindi, il ranking non si basa più direttamente su una probabilità del tipo:
$$p(R \mid d, q)$$
ma su una probabilità del tipo:
$$p(q \mid M_d)$$
cioè la probabilità della query $q$ dato il modello linguistico del documento $d$.
Per esempio, data una query:
$$q = \text{Frodo Ring}$$
ogni documento avrà un proprio modello generativo. 
Un documento che parla di Frodo e dell’Anello dovrebbe assegnare una probabilità più alta a questa query rispetto a un documento che parla di un argomento completamente diverso.
- Quindi l’idea non è tanto misurare una “somiglianza” in senso geometrico, come nel Vector Space Model, ma stimare quanto bene il modello del documento riesca a **spiegare la query osservata**.
- la query è il dato fissato, mentre il modello cambia da documento a documento. Il documento più rilevante sarà quello il cui modello rende più probabile la query.
##### Come funziona il modello generativo
Il Language Model funziona in modo simile ai modelli probabilistici visti anche in altri contesti, come nello spelling correction: 
- si assegna una probabilità alla generazione di termini o sequenze di termini. 
In generale, un language model può dipendere dalla storia precedente, cioè dalle parole già generate:
$$p(w_i \mid w_1, \dots, w_{i-1})$$
Tuttavia, nel caso base dell’Information Retrieval, si usa una versione molto più semplice: il **modello unigram**. 
- si assume che le parole siano indipendenti tra loro e che il documento venga trattato come una distribuzione di probabilità sui termini. 
	- detto anche un approccio di tipo **bag of words**, in cui non conta l’ordine delle parole, ma la loro frequenza.
$$𝑝(𝑤_𝑖 ∣ 𝑤_1, … , 𝑤_𝑖−1, 𝑀_𝑑) = 𝑝(𝑤_𝑖 ∣ 𝑀_𝑑)$$
Quindi ogni modello di ogni documento sarà la probabilità della distribuzione dei termini
$$𝑀_𝑑 = {𝑝(𝑡 ∣ 𝑀_𝑑) ∶ 𝑡 ∈ 𝑉 }$$
###### AUTOMA A STATI FINITI E LANGUAGE MODEL
Per chiarire cosa significa che un modello “genera” una sequenza di termini, la lezione introduce l’idea di **automa a stati finiti**.
Un automa a stati finiti può essere visto come una macchina che, partendo da uno stato iniziale, produce una sequenza di parole seguendo certe transizioni. In una versione probabilistica, a ogni transizione o stato vengono associate delle probabilità: quindi il modello non dice solo quali sequenze sono possibili, ma anche quanto sono probabili
![[Pasted image 20260506110000.png]]
questo è un automa a stati finiti con STOP che è un simbolo speciale che indica all'automa di fermarsi
![[Pasted image 20260506110203.png|400]]
noi vedremo una versione più semplice con unigram
###### RANKING TRAMITE QUERY LIKELIHOOD
La likelihood misura **quanto bene il modello del documento spiega la query osservata**
Per capire quanto un documento sia rilevante rispetto a una query, nel Language Modeling approach si confrontano le probabilità che i diversi modelli-documento assegnano alla generazione della query.
Per esempio, se abbiamo due documenti $d_1$​ e $d_2$​, con due modelli linguistici diversi $M_{d_1}$​​ e $M_{d_2}$​​ confrontiamo:
- $p(q \mid M_{d_1})$ e $p(q \mid M_{d_2})$
Assumendo un modello unigram, la probabilità della query si calcola come **prodotto** delle probabilità dei singoli termini della query:
$$p(q \mid M_d) = \prod_i p(w_i \mid M_d)$$
>[!example]- esempio
>![[Pasted image 20260506111012.png]]

###### STIMA DELLE PROBABILITÀ NEL MODELLO UNIGRAM
Una volta definito il Language Model associato a un documento, bisogna capire come ottenere le probabilità dei termini (per riempire la tabella del modello)
Nel caso dell’Information Retrieval si usa un modello molto semplice: il **modello unigram**. In questo modello, ogni termine viene generato indipendentemente dagli altri, quindi a ogni termine $t_i$​ viene associata una probabilità:
$$p(t_i \mid M_d) = p_i$$
Come detto non ci interessa l’ordine dei termini, ma quante volte ogni termine compare (Bagof words)
A questo punto entra in gioco il **modello multinomiale**. Il modello multinomiale è adatto quando abbiamo un vocabolario di possibili termini e osserviamo una sequenza di estrazioni da una distribuzione di probabilità. Nel nostro caso, le “estrazioni” sono i termini della query, e la distribuzione da cui vengono generati è il Language Model del documento.
Quindi, se un termine $t$ compare nella query $tf_{t,q}$​ volte, la probabilità assegnata a quel termine dal documento viene considerata $f_{t,q}$​ volte. Per questo la probabilità della query dato il modello del documento può essere scritta come:
$p(q \mid M_d)  \propto  \prod_{t:tf_{t,q}>0}  p(t \mid M_d)^{tf_{t,q}}$
Per questo si usa la term frequency nella query:
$$tf_{t,q}=𝑘_𝑖$$
cioè il numero di occorrenze del termine $t$ nella query.
##### Spiegazione formula del modello multinomiale
A questo punto, sotto il **modello multinomiale**, la probabilità della query dato il modello del documento è:
$$p(q \mid M_d) = \frac{|q|!}{\prod_{t \in V} tf_{t,q}!} \prod_{t \in V} p(t \mid M_d)^{tf_{t,q}}$$
Il primo fattore:
$$\frac{|q|!}{\prod_{t \in V} tf_{t,q}!}$$
è il **coefficiente multinomiale**. Tuttavia, ai fini del ranking, può essere ignorato perché dipende solo dalla query e non dal documento. Quindi, per ordinare i documenti, basta considerare la formula scritta sopra
$p(q \mid M_d)  \propto  \prod_{t:tf_{t,q}>0}  p(t \mid M_d)^{tf_{t,q}}$
In altre parole, confrontiamo i documenti guardando quanta probabilità il loro modello assegna ai termini presenti nella query.
###### Maximum likelihood Estimation
- per stimare $p(t \mid M_d)$ viene usata questa specifica stima
$$\hat{p}(t_i \mid M_d) = \frac{tf_{t_i,d}}{|d|}$$
dove:
- $tf_{t_i,d}​$ è il numero di volte in cui il termine $t$ compare nel documento $d$;
- $|d|$ è la lunghezza del documento, cioè il numero totale di termini nel documento.
In questo modo, ogni documento diventa un vettore di probabilità  di dimensione $∣V∣$sui termini del vocabolario:
$$M_d = [p(t_1 \mid M_d), \dots, p(t_{|V|} \mid M_d)]$$
e la somma di tutte le probabilità del documento deve essere uguale a 1:
$$\sum_{i=1}^{|V|} p(t_i \mid M_d) = 1$$
#### Smoothing
- LO smoothing cerca di stabilizzare le cose come se ci fosse una sorta di IDF
- per stimare la probabilità di un termine nel modello del documento abbiamo usato 
- ma potrebbe lasciare qualche valore a 0 se il termine non è presente
siccome la probabilità della query viene calcolata come prodotto delle probabilità dei suoi termini, basta un solo termine con probabilità zero per ottenere:
$p(q \mid M_d) = 0$
Questo è un problema perché un documento potrebbe essere comunque rilevante anche se non contiene esattamente tutti i termini della query
###### SOL.1 **Laplace smoothing / add-1 smoothing**
- primo tentativo è quello di applicare il classico smoothing di Laplace con add-1
La formula diventa:$$p_{Lap}(t \mid d) = \frac{tf_{t,d} + 1}{|d| + |V|}$$
- Poiché aggiungo 1 al conteggio di ogni termine del vocabolario, devo normalizzare nuovamente aggiungendo $|V|$ al denominatore.
Questo può alterare troppo le probabilità, soprattutto quando il vocabolario è grande
###### SOL.2 **collection language model**
- aggiungere un modello linguistico stimato sull’intera collezione di documenti.
- Oltre alla probabilità stimata sul singolo documento, si introduce anche un modello della collezione $M_c$​, stimato sull’intero corpus. 
- Questo modello serve come distribuzione di background e permette di assegnare probabilità non nulla anche a termini assenti nel documento
$$p(t \mid M_c) = \frac{cf_t}{T}$$
###### SOL.3 **Jelinek-Mercer smoothing**
- sfruttando la <span style="color:#d3869b">SOL.2</span> **collection language model**
- combiniamo sempre due fonti di informazione:
1. il modello del documento;
2. il modello della collezione.
La formula è:
$$p_{JM}(t \mid d) = \lambda \frac{tf_{t,d}}{|d|} + (1-\lambda)\frac{cf_t}{T}$$
- λ è un **iperparametro**, cioè un valore che non viene imparato direttamente dal singolo documento, ma viene scelto/tarato tramite benchmark.
	- Se $λ$ è alto, diamo più peso al documento
		- produce una ricerca più “conjunctive-like”, cioè tende a favorire documenti che contengono tutti o quasi tutti i termini della query
	- Se $λ$ è basso, diamo più peso alla collezione
		- produce una ricerca più disgiuntiva e può essere più adatto a query lunghe o verbose.
Il limite di questo metodo è che usa lo stesso parametro $\lambda$ per tutti i documenti. 
Questo significa che tutti i documenti vengono smussati nello stesso modo, indipendentemente dalla loro lunghezza.
ESEMPIO E ESERCIZIO3
>[!example]- esempio con Jelinek-Mercer smoothing e esercizio alla fine
> ![[Pasted image 20260506120739.png|500]]
> ![[Pasted image 20260506120750.png|500]]
> ![[Pasted image 20260506120800.png|500]]
> - Confronto dei punteggi: $0.0126 > 0.0028$
> - **Risultato Finale:** $d_2 > d_1$ (Il documento 2 è classificato come più rilevante del documento 1 per la query inserita).
> [[ESERCIZI CROCS#LEZIONE 10|ESERCIZIO]]
###### SOL.4 **DIRICHLET SMOOTHING**
in Dirichlet la quantità di smoothing dipende dalla lunghezza del documento. L’intuizione è:
- se un documento è lungo, abbiamo più osservazioni e quindi possiamo fidarci di più delle sue frequenze interne;
- se un documento è corto, abbiamo pochi dati e quindi dobbiamo appoggiarci di più al modello della collezione.
Dirichlet usa il classico *collection language Model* ma gli moltiplica un iperparametro $μ$
$$p(t \mid M_c) = \frac{cf_t}{T}$$
diventa quindi
$$\mu p(t \mid M_c)$$
$μ$ è un iperparametro globale che rappresenta la quantità totale di pseudo-count aggiunti a ogni documento. 
È come se a ogni documento venisse aggiunto uno pseudo-documento di lunghezza $\mu$, distribuito secondo il collection language model. $\mu$ è uguale per tutti i termini e documenti, ma il contributo virtuale di ciascun termine cambia perché dipende da $p(t \mid M_c)$
grazie a $\mu$ diciamo quanto la collezione conta, quindi:
- il modello specifico del documento conta meno, mentre conta di più la probabilità generale del termine nella collezione
la formula finale con aggiunta la $tf_{t,d}$ poi quindi diventa:
$$p_{Dir}(t \mid d) = \frac{tf_{t,d} + \mu p(t \mid M_c)} {|d| + \mu}$$
dove:
- $f_{t,d}$è il conteggio reale del termine nel documento
- $p(t \mid M_c)$ è la probabilità del termine nella collezione
- $\mu p(t \mid M_c)$ è il conteggio virtuale aggiunto
- $|d|$ è la lunghezza del documento
- $\mu$ controlla quanto smoothing viene applicato
	- se $\mu$ aumenta, aumenta il peso della collezione
	- se $\mu$ diminuisce, aumenta il peso del documento
	- $\mu$ è un iperparametro positivo, scelto/tarato sperimentalmente
- “Dir” sta per Dirichlet, più precisamente Dirichlet smoothing o Dirichlet prior smoothing
La formula di Dirichlet può essere riscritta come interpolazione tra modello del documento e modello della collezione:
$$p_{Dir}(t \mid d) = \lambda_d p(t \mid \hat{M}_d) + (1-\lambda_d)p(t \mid \hat{M}_c)$$
dove:
$$\lambda_d = \frac{|d|}{|d|+\mu}$$
Questa è la parte importante: in Jelinek-Mercer $\lambda$ era fisso, mentre in Dirichlet diventa $\lambda_d$​, cioè un peso che dipende dal documento.
- Se il documento è lungo, 
	- $|d|$ è grande
	- $\lambda_d$ più alto. Questo significa che si dà più peso al modello del documento
- Se il documento è corto,
	- $|d|$ è piccola
	- $\lambda_d$ più basso. Questo significa che si dà più peso al modello della collezione.
*APPLICAZIONE ALLA QUERY*
Per usare Dirichlet nel ranking, si calcola la probabilità della query moltiplicando le probabilità smoothed dei suoi termini:
$$p_{Dir}(q \mid d) = \prod_{k=1}^{n} p_{Dir}(w_k \mid d)$$
$$p_{Dir}(q \mid d) = \prod_{k=1}^{n} \frac{tf_{w_k,d} + \mu p(w_k \mid M_c)} {|d|+\mu}$$
Per ogni documento si calcola questo valore e poi si ordinano i documenti in base alla query likelihood. Le slide mostrano anche la forma con i logaritmi, usata nella pratica per evitare problemi numerici.
Il prodotto diventa somma grazie alla proprietà dei logaritmi:
$$\log(a \cdot b) = \log a + \log b$$
Questa operazione si chiama semplicemente **passaggio al logaritmo**, oppure uso della **log-likelihood**.
Quindi:
$$\log p_{Dir}(q \mid d) = \sum_{k=1}^{n} \log \frac{tf_{w_k,d} + \mu p(w_k \mid M_c)} {|d|+\mu}$$

Si fa perché moltiplicare tante probabilità piccole può produrre numeri estremamente vicini a zero, causando **underflow numerico**. Usando i logaritmi, il prodotto diventa una somma e il ranking rimane lo stesso, perché il logaritmo è una funzione monotona crescente
lo score sarà probabilmente negativo
cerco lo score più piccolo perché voglio la probabilità più alta, quindi a 1, quindi una somma di probabilità a 1
la formula viene allargata nell'esercizio
![[Pasted image 20260512163635.png]]

QUINDI INFINE ABBIAMO

$$\log p_{Dir}(t \mid d) = \log \frac{\mu p(t \mid C)} {|d|+\mu} + \log \left( 1+ \frac{tf_{t,d}} {\mu p(t \mid C)} \right)$$
facendo poi, data una query q
cioè la query è composta da più termini. A quel punto applichi la formula sopra **a ogni termine della query** e sommi i log:
$$\log p_{Dir}(q \mid d) = \sum_{k=1}^{n} \log p_{Dir}(w_k \mid d)$$
Quindi nella formula del singolo termine devi sostituire:
$t = w_k$
- Qui la formula viene separata in due contributi.
il primo è il contributo di **background**, cioè quanto il termine è probabile nella collezione in generale.
- il secondo è il contributo specifico del documento: misura quanto il documento aumenta la probabilità di quel termine rispetto al background della collezione
###### CONFRONTO TRA VECTOR SPACE MODEL, BM25 E LANGUAGE MODELS
- BM25 e Language Models sono entrambi motivati da una modellazione probabilistica, anche se rispondono a domande diverse
	- BM25 ragiona in termini di evidenza di rilevanza: quanto il documento fornisce evidenza rispetto alla query
	- I Language Models, invece, ragionano in termini generativi: quanto è probabile che il modello linguistico del documento generi la query
	- Il Vector Space Model, invece, è diverso: non nasce da una modellazione probabilistica, ma da una nozione geometrica di similarità
La term frequency compare in tutti e tre i modelli, ma viene usata in modo diverso:
- nei Language Models, la term frequency serve per stimare probabilità dei termini
- in BM25 e nel Vector Space Model, la term frequency viene trasformata in un peso
Anche la lunghezza del documento viene gestita in modo diverso:
- nel Vector Space Model si normalizzano i vettori
- in BM25 si usano parametri per controllare la normalizzazione rispetto alla lunghezza
- nei Language Models la lunghezza entra nella stima delle probabilità e nello smoothing, soprattutto con Dirichlet
Una differenza importante riguarda l’idf. 
- BM25 e Vector Space Model usano direttamente l’inverse document frequency, cioè danno più peso ai termini rari nei documenti della collezione
- Nei Language Models, invece, l’idf non compare esplicitamente. 
Tuttavia, l’uso del modello della collezione produce un effetto simile: termini rari nella collezione, ma frequenti in un certo documento, hanno un impatto maggiore sul ranking
Quindi i Language Models non usano direttamente la document frequency come BM25, ma usano la collection frequency attraverso il collection language model
**BM25 ha un maggior controllo dei fenomeni**
