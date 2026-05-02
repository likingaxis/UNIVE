Mentre i modelli algebrici (vettoriali), che abbiamo visto finora, si basano sulla somiglianza geometrica, l'approccio probabilistico nasce per gestire l'incertezza intrinseca nel processo di ricerca. L'incertezza deriva da:
- **Utenti**: Diversi utenti hanno diverse opinioni sulla rilevanza della stessa query. 
- **Contesto**: Il bisogno informativo varia a seconda della situazione dell'utente. 
- **Rappresentazione**: Il sistema ha una visione limitata/approssimata del documento e della query.
Obiettivo: Stimare la probabilità che un documento $d$ sia rilevante rispetto a una query $q$: 
$P(\text{relevant} | d,q) = \text{probabilita che il documento e' buono dati } d,q$.




**come lo calcolo la rilevanza**?
* **modelli probabilistici**: *binary independence model e bestmatch25.*
* **language model**: che si applica anche all'information retrieval.

> [!note] nel Vector Space Model il criterio è la somiglianza tra parole/vettori, non direttamente la “vera utilità” del documento per l’utente
> Il Vector Space Model (VSM) si basa sulla **somiglianza sintattica** (coseno tra i vettori). Se la tua query è "panca" e il documento parla di "panca" intesa come attrezzo da palestra, ma tu cercavi un elemento d'arredo, il VSM ti darà un'alta similarità perché le parole coincidono, ma la **rilevanza** per te è zero. L'approccio probabilistico cerca di modellare proprio questa incertezza dell'utente.

Nel caso dell’IR, però, l’evento interessante non è più un evento astratto $A$, ma:
$R = \text{“il documento } d \text{ è rilevante rispetto alla query } q\text{”}$
Più precisamente, una variabile casuale indicatrice:
$$R_{d,q}$$
dove:
- $R_{d,q}=1$
	- se il documento $d$ è rilevante rispetto alla query $q$, mentre:
- $R_{d,q}=0$
	- se il documento non è rilevante.
#### Ripassino probabilità
Il modello si basa sulla Teoria della Probabilità (Regola della Catena, Partizione, Teorema di Bayes).

###### Regola della Catena
Indica che la probabilità che due eventi A e B avvengano contemporaneamente è il prodotto della probabilità di uno per la probabilità dell'altro dato il primo.
$P(A,B) = P(A \cap B) = P(A|B)P(B) = P(B|A)P(A)$.
###### Regola del Complemento
Indica la probabilità che un evento NON avvenga
$p(\bar A) = 1 − p(A)$
###### Regola della Partizione 
Se un evento B può essere diviso in un insieme esaustivo di sotto casi disgiunti (che non si sovrappongono), la probabilità di B è la somma delle probabilità dei singoli sotto casi.
* $P(B) = P(A,B) \cdot P(\bar A, B)$.
###### Teorema di Bayes
Ci permette di aggiornare la nostra conoscenza su un evento alla luce di nuove prove (evidenza).
$$
p(A|B) = \frac{p(B|A) p(A)}{p(B)}
$$
* **priori**: $P(A)$ = la stima iniziale della probabilità di A prima di vedere l'evidenza B
* **posteriori**: $P(A|B)$ = la probabilità aggiornata dopo aver visto l'evidenza.
* **ossia**: posso trovare la probabilità a posteriori di $A$ usando quella a priori.

Il denominatore p(B) può essere espanso tramite la regola della partizione: $$p(B) = \sum_{X \in \{A, \bar{A}\}} p(B|X) \cdot p(X)$$ *Questo è il cuore del sistema. Vogliamo calcolare la probabilità che un documento sia rilevante (A) data la query/evidenza (B).

###### Odds (Rapporto di Probabilità)
In IR è molto utile ragionare in termini di Odds (O), che in statistica indica il rapporto tra la probabilità che un dato evento accada e la probabilità che lo stesso evento NON accada
$$O(A) = \frac{P(A)}{P(\bar{A})} = \frac{P(A)}{1-P(A)}$$
* se $O(A) > 1$ allora e' più probabile che il documento sia rilevante
* se $O(A) = 1$ allora non si sa
* se $O(A) < 1$ allora e' più probabile che il documento non sia rilevante
nel caso di IR sarebbe
$$O(R|d,q)=\frac{P(R=1|d,q)}{P(R=0|d,q)}$$

#### Rilevanza probabilistica di un documento  
Quindi l’obiettivo del sistema IR è stimare:  
  
$$  
p(R|d,q)  
$$
cioè la **probabilità che il documento $d$ sia rilevante data la query $q$**.  
Questa probabilità può essere interpretata come la probabilità che un utente casuale giudichi rilevante $d$ per $q$. Formalmente, considerando un insieme $U$ di utenti:  
  
$$  
p(R|d,q)=\sum_{u \in U} p(R|d,q,u)p(u)  
$$
dove:  
- $p(R|d,q,u)$ è la probabilità che l’utente $u$ giudichi rilevante il documento $d$ rispetto alla query $q$;  
- $p(u)$ è la probabilità che l’utente $u$ sia l’utente che effettua il giudizio.  

In pratica, però, la variabile utente viene spesso ignorata: il sistema cerca di stimare una rilevanza “media” rispetto agli utenti. Inoltre, ai fini del ranking, eventuali fattori costanti non cambiano l’ordinamento dei documenti.  
##### Regola di decisione tramite odds  
Un documento viene considerato preferibile quando è più probabile che sia rilevante rispetto al fatto che non lo sia:  
$$  
p(R|d,q)>p(\bar R|d,q)  
$$
Equivalentemente, possiamo usare gli **odds di rilevanza**:  
  
$$  
O(R|d,q)=\frac{p(R|d,q)}{p(\bar R|d,q)}  
$$
- se $O(R|d,q)>1$, il documento è più probabilmente rilevante;  
- se $O(R|d,q)=1$, rilevanza e non rilevanza hanno la stessa probabilità;  
- se $O(R|d,q)<1$, il documento è più probabilmente non rilevante.  
###### come stimiamo questa probabilità  p(R|d, q) usando cose che possiamo osservare davvero?
La probabilità condizionata può essere decomposta in due modi:
1. **Approccio BIM, 2-Poisson e BM25:** Con Bayes si fissa la query e si guarda alla probabilità dei documenti rilevanti/non rilevanti: $p(d|R, q)$. È l'approccio che approfondiremo inizialmente.
	 $p(R|d,q) = \frac{p(d|R,q)p(R|q)}{p(d|q)}$, ed $p(\bar{ R}| d,q)$ si ricava similmente
2. **Approccio dei Language Models:** Si inverte la logica. Dato un documento, quanto è probabile che l'utente avesse in mente proprio quel documento quando ha scritto la query? $p(q|R, d)$.
	$p(R|d,q) = \frac{p(q|R,d)p(R|d)}{p(q|d)}$, ed $p(\bar{R}|d,q)$ si ricava similmente
#### Il Ranking Probabilistico e le sue Assunzioni 
L'obiettivo di un sistema di Ranked Retrieval è restituire una lista ordinata di documenti in base alla loro probabilità stimata di rilevanza rispetto alla query: $p(R|d,q)$.
- applichiamo prima Bayes
faccio il ranking dei documenti osservando dunque $O(R|d,q)$ (odds).
*Nota fondamentale:* Poiché un documento o è rilevante o non lo è, la somma delle due probabilità deve essere sempre 1: $p(R|d, q) + p(\bar{R}|d, q) = 1$.

**assunzioni**:
* **indipendenza**: assumiamo $d$ e $q$  indipendenti $\forall d,q$
* **uniformita documenti**: $\forall d,d': p(d) = p(d')$ (questa assunzione non vale per altri contesti, es: pagerank)
* **ignorare**: $p(R|q)$ puo essere ignorato. e' un valore costante per tutti i documenti.
$$
p(R|d,q) = \frac{p(d|R,q)p(R|q)}{p(d|q)} = \frac{p(d|R,q)p(R|q)}{p(d)}
$$
**definizioni**:
* $p(d|R,q) = \text{p. che } d \text{ venga scelto u.a.r dai documenti rilevanti per } q$.
* $p(R|q) = \text{p. che un documento scelto dalla collezione sia rilevante per } q$
* $p(d|q) = p(d) = \text{la probabilita che } d \text{ sia pescato dalla collezione}$, si assumono $d,q$  indipendenti $\forall d,q$.
##### PRP (Probability Ranking Principle)
Il PRP dice che se non hai altre informazioni, l'ordine basato sulla probabilità di rilevanza decrescente è quello che ti garantisce, statisticamente, il minor numero di documenti irrilevanti nelle prime posizioni. È l'ottimo teorico sotto l'ipotesi che la rilevanza di un documento sia indipendente da quella degli altri.
##### Error cost of retrieval
**A che serve il rischio**? si puo' usare come misura inversa rispetto alla qualità di un risultato
**Voglio calcolare il rischio**. siano:
* $C(d,q)$ Costo se $d$ è rilevante ma non viene restituito (Falso Negativo).
* $C'(d,q)$ Costo se $d$ non è rilevante ma viene restituito (Falso Positivo).

Il rischio atteso $R(D(q))$ per un set di documenti restituiti $D(q)$ è:
$$R(D(q)) = \sum_{d \in D(q)} C'(d,q)p(\bar{R}|d,q) + \sum_{d \notin D(q)} C(d,q)p(R|d,q)$$
* **ossia**: $R(D(q)) = \sum_{d \in D} C'(d,q)(1-p(R|d,q)) + \sum_{d \not \in D} C(d,q) p(R|d,q)$
>[!tip] Se assumiamo una **Loss `0/1`** (ovvero $C = C' = 1$), il rischio è minimo quando restituiamo i $k$ documenti con la più alta probabilità di rilevanza. 


Sotto questa assunzione, il Rischio atteso $R(D(q))$ per un insieme di documenti restituiti $D(q)$ si semplifica nella somma delle probabilità di errore:
$$R(D(q)) = \sum_{d \in D(q)} (1 - p(R|d,q)) + \sum_{d \notin D(q)} p(R|d,q)$$
##### Minimizzazione del Rischio
Supponiamo che l'utente voglia vedere esattamente i migliori $k$ documenti ($|D(q)| = k$). Per minimizzare il rischio calcolato sopra, la matematica ci dice che dobbiamo massimizzare la differenza tra:
$$ \sum_{d \in D(q)} p(R|d,q) - \sum_{d \notin D(q)} p(R|d,q) $$
Questo valore è massimo solo se l'insieme $D(q)$ contiene i **top-k documenti con la più alta probabilità di rilevanza** $p(R|d,q)$. 

**Teorema**: assumendo una loss 0/1, cioè considerando uguale il costo di ogni errore ($C(d,q)=C'(d,q)=1$), il **Probability Ranking Principle** è ottimo: ordinare i documenti per probabilità decrescente di rilevanza $p(R|d,q)$ minimizza il rischio, cioè il costo atteso degli errori.

##### fare effettivamente i calcoli con BIM
**Binary Independence Model**: e' il modello piu' semplice
Per rendere il calcolo fattibile, il BIM introduce due assunzioni fondamentali (molto forti e semplificative):
1. **Indipendenza della Rilevanza dei Documenti:** Si assume che la rilevanza di un documento non dipenda da quali altri documenti sono già stati mostrati all'utente.
2. **Modello di Rilevanza Booleano:** La rilevanza è una scelta binaria (0 o 1). Non esistono sfumature come "parzialmente rilevante".
Ogni documento $d$ viene rappresentato come un **vettore di feature** $(f_1, f_2, \dots, f_n)$. In questo contesto, le feature sono i termini (le parole).
Applicando il Teorema di Bayes a questo vettore, otteniamo:
$$p(R|f_1, \dots, f_n, q) = \frac{p(f_1, \dots, f_n|R, q) \cdot p(R|q)}{p(f_1, \dots, f_n)}$$

Per scopi di **Ranking** (ordinamento), ci interessa solo ciò che cambia da documento a documento. 
**in BIM, ogni feature di un documento**:
1. e' associata ad un termine
2. e' binario: vale 1 se occorre nel documento, 0 altrimenti.
3. **il documento e'** $v_{d}= (x_{1},\dots,x_{m})$ con $x_{i} = 1$ se $t_{i} \in d$.
4. **la query e** '$v_{q} = (y_{1},\dots,y_{m})$ dove $y_{i} = 1$ se $t_{i} \in q$.
5. **collisioni**: *query e documenti differenti potrebbero essere rappresentati dallo stesso vettore*.
**rimodelliamo** $p(R|d,q)$ **usando i vettori**:
* $p(R|v_{d},v_{q}) = \frac{p(v_{d}|R,v_{q})p(R|v_{q})}{p(v_{d}|v_{q})} =_{rank} p(v_{d}|R,v_{q})$
* **similmente**: $p(\bar{R}|v_{d},v_{q}) = p(v_{d}| \bar{R}, v_{q})$
* $p(v_{d}|R,v_{q})$ e' la probabilita che se un documento rilevante e' stato selezionato, allora $v_{d}$ e' la sua rappresentazione.
##### L'Assunzione di Naive Bayes (Indipendenza Condizionale)
Si assume che la presenza o l'assenza di un termine in un documento sia indipendente dalla presenza o assenza di qualsiasi altro termine, data la rilevanza.
Matematicamente, la probabilità congiunta diventa il prodotto delle probabilità dei singoli termini:
$$p(f_1, \dots, f_n|R, q) = \prod_{i} p(f_i|R, q)$$
>[!tip] Il sistema stima quanto ogni singolo termine contribuisca alla rilevanza e poi "moltiplica" questi contributi per ottenere il punteggio totale del documento.
##### USO degli ODDS
Invece di calcolare $p(R|v_d, v_q)$, calcoliamo il rapporto tra la probabilità che il documento sia rilevante e quella che non lo sia. Questo non cambia l'ordine finale (ranking)
$$O(R|v_d, v_q) = \frac{p(R|v_d, v_q)}{p(\bar{R}|v_d, v_q)} = \frac{p(v_d|R, v_q) \cdot p(R|v_q)}{p(v_d|\bar{R}, v_q) \cdot p(\bar{R}|v_q)}$$
Poiché $p(R|v_q)$ e $p(\bar{R}|v_q)$ sono probabilità "a priori" della query (uguali per ogni documento), ai fini del ranking consideriamo solo il rapporto delle verosimiglianze e avendo assunto Naive Bayes allora:

la presenza o assenza di una parola non dipende dalle altre, data la rilevanza. Questo trasforma il rapporto tra probabilità congiunte in una **produttoria** di rapporti tra probabilità dei singoli termini $x_i$:

$$O(R|v_d, v_q) = \prod_{i=1}^{M} \frac{p(x_i|R, v_q)}{p(x_i|\bar{R}, v_q)}$$
###### CALCOLO ESCLUSIVO PER LA QUERY
Per limitare il calcolo ai soli termini cercati dall'utente, introduciamo l'**Assunzione sui termini non-query**: se un termine non è nella query ($y_i=0$), ipotizziamo che abbia la stessa probabilità di apparire sia in documenti rilevanti che non rilevanti.
*   Se $y_i=0 \implies p(x_i=1|R, v_q) = p(x_i=1|\bar{R}, v_q)$.

Grazie a questo, i termini fuori query si elidono (annullano) e la produttoria si restringe ai soli termini per cui $y_i=1$:
$$O(R|v_d, v_q) = \prod_{i:x_i=y_i=1} \frac{p(x_i=1|R, v_q)}{p(x_i=1|\bar{R}, v_q)} \cdot \prod_{i:x_i=0, y_i=1} \frac{p(x_i=0|R, v_q)}{p(x_i=0|\bar{R}, v_q)}$$
##### Parametrizzazione

Definiamo due parametri fondamentali per ogni termine:
* $p_{t} = p(x_{t}=1|R,v_{q})$ : probabilità che il termine $t_i$ compaia in un documento rilevante per la query $q$.
* $u_{t} = p(x_{t} = 1| \bar{R},v_{q})$ : probabilità che il termine $t_i$ compaia in un documento non rilevante per la query $q$.

Se per un termine vale:
$p_i \gg u_i$
vuol dire:
> il termine compare molto più spesso nei documenti rilevanti che in quelli non rilevanti.


Quindi quel termine è utile e deve dare un peso alto al documento.

| | Rilevante ($R$) | Non Rilevante ($\bar{R}$) |
| :--- | :--- | :--- |
| **Termine presente ($x_i=1$)** | $p_i$ | $u_i$ |
| **Termine assente ($x_i=0$)** | $1-p_i$ | $1-u_i$ |
Otteniamo quindi:

$$
\
O(R|v_{d},v_{q}) =_{rank} \prod_{t_{i}:x_{i}=1} \frac{p_{i}}{u_{i}} \cdot \prod_{t_{i}:x_{i}=0} \frac{1-p_{i}}{1-u_{i}}
$$
**e' equivalente a** (attenzione ai pedici delle produttorie):
$$
\
O(R|v_{d},v_{q}) =_{rank} \prod_{t_{i}:x_{i}=y_{i}=1} \frac{p_{i}(1-u_{i})}{u_{i}(1-p_{i})} \cdot \prod_{t_{i}:y_{i}=1} \frac{1-p_{i}}{1-u_{i}}
$$
**si semplifica in**:
$$
O(R|v_{d},v_{q}) =_{rank} \prod_{t_{i}:x_{i}=y_{i}=1} \frac{p_{i}(1-u_{i})}{u_{i}(1-p_{i})} 
$$
##### Retrieval Status Value (RSV)
Applichiamo il logaritmo (funzione monotona crescente) per trasformare la produttoria in una sommatoria. Il valore risultante è chiamato **RSV (Retrieval Status Value)**:
$$RSV_d = \log \prod_{i:x_i=y_i=1} \frac{p_i(1-u_i)}{u_i(1-p_i)} = \sum_{i:x_i=y_i=1} \log \frac{p_i(1-u_i)}{u_i(1-p_i)}$$
Il punteggio del documento è dunque la somma dei pesi $c_i$ dei termini della query presenti nel documento:
$$RSV_d = \sum_{i:x_i=y_i=1} c_i$$

Dove $c_i$ è il **log odds ratio**:
$$c_i = \log \frac{p_i(1-u_i)}{u_i(1-p_i)} = \log \frac{p_i}{1-p_i} - \log \frac{u_i}{1-u_i}$$
*   Il primo termine $\log \frac{p_i}{1-p_i}$ sono gli odds di presenza in documenti rilevanti.
*   Il secondo termine $\log \frac{u_i}{1-u_i}$ sono gli odds di presenza in documenti non rilevanti.

>[!tip] $c_{i}$ possiamo vederlo così
>- $c_{i} = 0$  -> il termine $t_{i}$ ha la stessa probabilità di apparire nei documenti rilevanti e NON rilevanti
>- $c_{i} > 0$ -> il termine $t_{i}$ ha più probabilità di apparire nei documenti rilevanti
>- $c_{i} < 0$ -> il termine $t_{i}$ ha più probabilità di apparire nei NON documenti rilevanti

>[!lemma] IMPORTANTE
>Con questi calcoli che abbiamo fatto possiamo notare che il BIM e il vector space model sono identici per quanto riguarda il livello delle operazioni, cambia solo il `term weights`.
>In particolare: possiamo utilizzare le stesse strutture dati (tipo inverted index) per entrambi i modelli.

##### Stima delle Probabilità nel BIM
Per poter calcolare concretamente il peso $c_i$ di ogni termine, dobbiamo stimare le probabilità $p_i$ (presenza in documenti rilevanti) e $u_i$ (presenza in documenti non rilevanti).
Esistono due situazioni operative principali:
1. **Presenza di giudizi di rilevanza**: disponiamo di informazioni su quali documenti siano rilevanti (es. tramite un *training set* fornito da esperti o tramite *pseudo-relevance feedback*).
2. **Assenza di informazioni (Ad-hoc retrieval)**: non abbiamo dati pregressi e dobbiamo stimare i parametri "al buio".
Nello scenario in cui i giudizi di rilevanza siano disponibili, definiamo le seguenti variabili basate sui conteggi della collezione:
*   $N$: Numero totale di documenti nella collezione.
*   $R$: Numero di documenti giudicati **rilevanti**.
*   $r_i$: Numero di documenti **rilevanti** che contengono il termine $t_i$.
*   $df_i$: Numero totale di documenti che contengono il termine $t_i$ (**document frequency**).
**La Tabella di Contingenza**

| | Documenti Rilevanti ($R$) | Documenti Non Rilevanti ($\bar{R}$) | Totale |
| :--- | :--- | :--- | :--- |
| **Termine Presente ($x_i=1$)** | $r_i$ | $df_i - r_i$ | $df_i$ |
| **Termine Assente ($x_i=0$)** | $R - r_i$ | $(N - df_i) - (R - r_i)$ | $N - df_i$ |
| **Totale** | $R$ | $N - R$ | $N$ |
A partire dalla tabella, le probabilità si calcolano come:
*   $p_i = \frac{r_i}{R}$
*   $u_i = \frac{df_i - r_i}{N - R}$

Il peso finale del termine (**log odds ratio**) diventa quindi:
$$c_i = \log \frac{\frac{r_i}{R - r_i}}{\frac{df_i - r_i}{(N - df_i) - (R - r_i)}}$$
Per evitare l'annullamento dei denominatori e gestire gli eventi rari, si aggiunge una costante $\alpha$ (solitamente **0.5**) a ogni cella della tabella di contingenza.

ESERCIZIO VEDI [[ESERCIZI CROCS#LEZIONE 9| esercizi crocs]]
#### Assunzione
Nello scenario di recupero "ad-hoc" (una ricerca standard senza feedback dell'utente), non conosciamo i valori di $R$ e $r_i$. Dobbiamo quindi introdurre un'assunzione forte per stimare $u_i$ (la probabilità che un termine appaia in un documento non rilevante). magari **non abbiamo il dataset etichettato con giudizi di rilevanza**.

Si assume che i documenti rilevanti per una specifica query siano una **percentuale infinitesima** dell'intera collezione ($R \ll N$). 
Sotto questa assunzione, la probabilità $u_i$ viene stimata tramite la frequenza globale del termine:
$$u_i \approx \frac{df_i}{N}$$
L'odds di presenza in documenti non rilevanti diventa quindi:
$$\log \frac{1 - u_i}{u_i} = \log \frac{N - df_i}{df_i} \approx \log \frac{N}{df_i}$$
Il peso del termine $c_i$ si semplifica in:
$$c_i = \log \frac{p_i(1-u_i)}{u_i(1-p_i)} \approx \log \frac{p_i}{1-p_i} + \log \frac{N}{df_i}$$
1. **Uniformità**: Si assume che $p_i$ (probabilità che un termine appaia in un documento rilevante) sia **costante** per tutti i termini della query.
2. **Neutralità**: Si assegna il valore $p_i = 0.5$. 

L'ipotesi $p_i = 0.5$ indica che un termine della query ha le stesse probabilità di apparire o meno in un documento rilevante. Matematicamente, questo fa sì che i termini legati a $p_i$ nella formula dell'RSV si eliminino:
$$\frac{p_i}{1 - p_i} = \frac{0.5}{0.5} = 1 \implies \log(1) = 0$$

**Conclusione**: In assenza di feedback, il modello probabilistico BIM si riduce a una semplice **sommatoria dei pesi IDF** dei termini della query presenti nel documento. 
*   Questa stima è considerata soddisfacente per documenti molto brevi, come titoli o abstract.
$$RSV_d \approx \sum_{i:x_i=y_i=1} \log \frac{N}{df_i}$$
ora la domanda sorge spontanea
###### BIM vs Modello Vettoriale 
A livello operativo, i due modelli non sono drasticamente diversi:
*  **Analogie**: Entrambi costruiscono lo schema di recupero nello stesso modo e possono utilizzare le stesse strutture dati (visto prima).
*  **Differenze**: Il modello vettoriale usa la *cosine similarity* e il peso *tf-idf* in uno spazio geometrico; il modello probabilistico usa una formula derivata dalla teoria della probabilità che, nel caso base, coincide con l'IDF.

Il modello BIM presenta dei limiti strutturali che lo rendono inadeguato per la ricerca full-text moderna:
1. **Natura Binaria**
2. **Mancanza di TF**
3. **Mancanza di Normalizzazione**
**limitazioni di BIM**: e' stato creato per fare retrieval su titoli e abstract. Non andrebbe usato per la ricerca su interi documenti, dovremmo porre attenzione alla term frequency e alla lunghezza dei documenti.
* BIM non analizza term frequency e doc length.
#### Si vuole introdurre la Term Frequency
Per introdurre la TF, dobbiamo cambiare la rappresentazione del documento:
* **BIM**: Vettore binario $\{0, 1\}$.
* **Nuovo Modello**: Vettore di interi $(d_{t_1}, \dots, d_{t_n})$, dove ogni componente rappresenta il **conteggio delle occorrenze** del termine nel documento.
Il valore **RSV** viene ridefinito per riflettere questa nuova natura non binaria. Utilizzando le semplificazioni già viste per il BIM, la formula diventa:
$$RSV_d = \sum_{i:y_i=1} \log \frac{P(d_{t_i} = n_i | R, v_q) \cdot P(d_{t_i} = 0)}{P(d_{t_i} = n_i) \cdot P(d_{t_i} = 0 | R, v_q)}$$

Dove $n_i$ è il numero di volte che il termine $i$ appare nel documento $d$. Il problema centrale diventa ora **stimare queste probabilità** per variabili discrete (conteggi).

