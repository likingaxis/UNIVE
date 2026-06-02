#### Probabilistic Retrieval
Nei modelli vettoriali, come il Vector Space Model, il ranking si basa sulla somiglianza geometrica tra query e documenti. L’approccio probabilistico, invece, cerca di stimare direttamente la probabilità che un documento sia rilevante per una query:
$$p(R|d,q)$$
dove $(R)$ indica l’evento “il documento $(d)$ è rilevante per la query $(q)$”.
L’idea nasce dal fatto che la rilevanza è incerta: utenti diversi possono giudicare diversamente lo stesso documento, il contesto può cambiare e il sistema osserva solo una rappresentazione approssimata di documenti e query.

$R = \text{“il documento } d \text{ è rilevante rispetto alla query } q\text{”}$
Possiamo rappresentarlo con una variabile binaria:  
$$R_{d,q} =  
\begin{cases}  
1 & \text{se } d \text{ è rilevante per } q \\  
0 & \text{se } d \text{ non è rilevante per } q  
\end{cases}  $$

> [!note] Differenza con il VSM
> Il VSM misura somiglianza tra vettori, non direttamente utilità per l’utente. Due testi possono condividere parole ma non essere rilevanti nello stesso senso informativo.

I principali modelli probabilistici trattati sono:
- Binary Independence Model, BIM;
- modelli basati su Poisson e 2-Poisson;
- Okapi BM25;
- Language Models per l’IR.

#### Odds di rilevanza
Per confrontare rilevanza e non rilevanza possiamo usare gli odds:

$$O(R|d,q)=\frac{p(R|d,q)}{p(\bar R|d,q)}$$

Interpretazione:
- \($O(R|d,q)>1$\): il documento è più probabilmente rilevante;
- \($O(R|d,q)=1$\): rilevanza e non rilevanza sono bilanciate;
- \($O(R|d,q)<1$\): il documento è più probabilmente non rilevante.
Gli odds sono utili perché mantengono lo stesso ordinamento dei documenti, ma rendono più comodo il confronto tra rilevanza e non rilevanza.
#### Due prospettive per stimare la rilevanza
La probabilità $p(R|d,q)$ non è osservabile direttamente, quindi viene stimata in modi diversi.
###### Approccio probabilistico classico

Usato da BIM, 2-Poisson e BM25.  
Si fissa la query e si chiede quanto sia probabile osservare il documento tra quelli rilevanti:
$$p(R|d,q)=\frac{p(d|R,q)p(R|q)}{p(d|q)}$$
###### Approccio dei Language Models

Si inverte la prospettiva: dato un documento, si valuta quanto è probabile generare la query:
$$p(q|d)$$
Un documento è considerato buono se il suo modello linguistico rende probabile la query dell’utente.
#### Ranking probabilistico e assunzioni
Applicando Bayes:
$$p(R|d,q)=\frac{p(d|R,q)p(R|q)}{p(d|q)}$$

Nel ranking la query $q$ è fissata, quindi $p(R|q)$ è costante per tutti i documenti e può essere ignorata.
Assumendo inoltre indipendenza tra documento e query:

$$p(d|q)=p(d)$$
e uniformità dei documenti:
$$\forall d,d': p(d)=p(d')$$
anche il denominatore è costante. Quindi, ai fini del ranking:
$$p(R|d,q)=_{rank}p(d|R,q)$$
*In pratica, per ordinare i documenti stimiamo quanto è probabile osservare ciascun documento tra quelli rilevanti per la query.*
#### PRP: Probability Ranking Principle

Il **Probability Ranking Principle** afferma che, in assenza di altre informazioni, il ranking ottimale ordina i documenti per probabilità decrescente di rilevanza.

L’idea è:

> se devo mostrare i primi \(k\) risultati, conviene mostrare i \(k\) documenti che hanno probabilità maggiore di essere rilevanti.

Il principio è ottimale se:
- la rilevanza di un documento è indipendente da quella degli altri;
- gli errori hanno costo uniforme.
#### Error cost of retrieval
Il PRP può essere giustificato tramite il rischio atteso, cioè il costo medio degli errori del sistema.
Errori possibili:
- **falso positivo**: restituisco un documento non rilevante;
- **falso negativo**: non restituisco un documento rilevante.
Il rischio atteso è:
$$R(D(q)) =
\sum_{d \in D(q)} C'(d,q)p(\bar R|d,q)
+
\sum_{d \notin D(q)} C(d,q)p(R|d,q)$$
dove:
- $C'(d,q)$ è il costo di restituire un documento non rilevante;
- $C(d,q)$ è il costo di non restituire un documento rilevante.

>[!tip] Se assumiamo una **Loss `0/1`** (ovvero $C = C' = 1$), il rischio è minimo quando restituiamo i $k$ documenti con la più alta probabilità di rilevanza.

 il **Probability Ranking Principle** è ottimo
#### Binary Independence Model, BIM
Il **Binary Independence Model** è uno dei modelli probabilistici più semplici per il retrieval
L’idea è rappresentare documenti e query tramite vettori binari, dove ogni componente indica la presenza o assenza di un termine.
Per un documento:
$$v_d=(x_1,\dots,x_M)$$

$$x_i =
\begin{cases}
1 & \text{se il termine } t_i \text{ compare nel documento} \\
0 & \text{se il termine } t_i \text{ non compare nel documento}
\end{cases}$$
Per una query:
$v_q=(y_1,\dots,y_M)$
dove:
$$y_i =
\begin{cases}
1 & \text{se il termine } t_i \text{ compare nella query} \\
0 & \text{altrimenti}
\end{cases}$$
Quindi il BIM è un modello **binario**: non considera quante volte un termine compare, ma solo se compare oppure no.
Le assunzioni principali sono:
1. **rilevanza binaria**: un documento è rilevante oppure non rilevante;
2. **rappresentazione binaria dei termini**: ogni termine è presente o assente;
3. **indipendenza condizionale dei termini**: data la rilevanza, la presenza di un termine è indipendente dalla presenza degli altri.
Quest’ultima è l’assunzione di tipo **Naive Bayes**
##### odds di rilevanza
Nel BIM non lavoriamo direttamente sul documento $d$, ma sulla sua rappresentazione binaria $v_d$
L’obiettivo diventa stimare:
$p(R|v_d,v_q)$
cioè la probabilità che il documento sia rilevante data la rappresentazione del documento e della query.
Per il ranking si usano spesso gli **odds di rilevanza**:
$$O(R|v_d,v_q)=\frac{p(R|v_d,v_q)}{p(\bar R|v_d,v_q)}$$
Gli odds confrontano quanto il documento sembri rilevante rispetto a quanto sembri non rilevante.
Applicando Bayes e ignorando i fattori costanti per il ranking, si ottiene che conta il rapporto tra:

$p(v_d|R,v_q)$ e $p(v_d|\bar R,v_q)$

cioè:
> quanto è probabile osservare quel documento tra i documenti rilevanti rispetto ai documenti non rilevanti.

Con l’assunzione di indipendenza condizionale dei termini, questa probabilità complessiva viene scomposta nel contributo dei singoli termini:
$$
O(R|v_d,v_q)
=
\prod_{i=1}^{M}
\frac{p(x_i|R,v_q)}
{p(x_i|\bar R,v_q)}$$

In pratica, ogni termine contribuisce separatamente al punteggio del documento.
###### Parametri $p_i$ e $u_i$
Dopo aver definito il BIM, sappiamo che il modello non usa la frequenza dei termini, ma solo la loro presenza o assenza nei documenti. A questo punto il problema diventa: **quanto è informativo un termine della query per distinguere i documenti rilevanti da quelli non rilevanti?**  
Per rispondere, il BIM 
per ogni termine $t_i$ definisce due probabilità fondamentali:
$$p_i=p(x_i=1|R,v_q)$$
$$u_i=p(x_i=1|\bar R,v_q)$$

dove:

- $p_i$ è la probabilità che il termine ($t_i$ compaia in un documento rilevante;
- $u_i$è la probabilità che il termine $t_i$ compaia in un documento non rilevante.
Se:
$$p_i \gg u_i$$
allora il termine compare molto più spesso nei documenti rilevanti che in quelli non rilevanti, quindi è utile per il ranking.

| Caso             | Documenti rilevanti | Documenti non rilevanti |
| ---------------- | ------------------- | ----------------------- |
| Termine presente | \($p_i$\)           | \($u_i$\)               |
| Termine assente  | \($1-p_i$\)         | \($1-u_i$\)             |

Dopo le semplificazioni del BIM, il contributo di un termine della query presente nel documento è dato dal **log odds ratio**:

$$c_i=\log \frac{p_i(1-u_i)}{u_i(1-p_i)}$$
Questo valore è il peso probabilistico del termine.
- \($c_i>0$\): il termine è più tipico dei documenti rilevanti;
- \($c_i=0$\): il termine non distingue rilevanti e non rilevanti;
- \($c_i<0$\): il termine è più tipico dei documenti non rilevanti.
Quindi \($c_i$\) misura quanto un termine aiuta a distinguere documenti rilevanti da documenti non rilevanti.

##### Retrieval Status Value, RSV
Applicando il logaritmo, la produttoria degli odds diventa una sommatoria. Otteniamo così il **Retrieval Status Value**, cioè il punteggio finale del documento:
$$RSV_d=\sum_{i:x_i=y_i=1} c_i$$

dove $x_i$ sono i termini del doc e $y_i$ sono i termini della query
Il documento riceve quindi un punteggio pari alla somma dei pesi dei termini che:
- sono presenti nella query;
- sono presenti anche nel documento.
Questa è la formula operativa finale del BIM.
> [!note] Collegamento con il modello vettoriale
> A livello operativo, BIM e Vector Space Model sono simili: entrambi calcolano uno score sommando pesi dei termini e possono usare strutture come l’inverted index.
> La differenza è nel significato dei pesi: nel VSM sono geometrici/statistici, nel BIM sono probabilistici.

i valori effettivi di $p_i$ e $u_i$ sono rispetivamente
- \($N$\): numero totale di documenti nella collezione;
- \($R$\): numero di documenti rilevanti;
- \($r_i$\): numero di documenti rilevanti che contengono il termine \($t_i$\);
- \($df_i$\): numero totale di documenti che contengono \($t_i$\).

$$p_i=\frac{r_i}{R}$$
$$u_i=\frac{df_i-r_i}{N-R}$$
Quindi:
- \($p_i$\) guarda quanto spesso il termine compare nei documenti rilevanti;
- \($u_i$\) guarda quanto spesso compare nei documenti non rilevanti.
Per evitare problemi con conteggi nulli, si può aggiungere una costante di smoothing, spesso \($\alpha=0.5$\), ai conteggi della tabella.
###### BIM senza feedback di rilevanza
Nel retrieval ad-hoc spesso non abbiamo però giudizi di rilevanza, quindi non conosciamo \($R$\) e \($r_i$\).
Si assume allora che i documenti rilevanti siano pochissimi rispetto alla collezione:
$$R \ll N$$
Di conseguenza, la probabilità che un termine compaia nei documenti non rilevanti può essere approssimata con la sua frequenza globale nella collezione:
$u_i \approx \frac{df_i}{N}$
Inoltre, si assume spesso:
$p_i=0.5$
cioè il termine ha uguale probabilità di apparire o non apparire in un documento rilevante.

Con queste assunzioni, il BIM si riduce a una somma di pesi IDF:

$$RSV_d \approx \sum_{i:x_i=y_i=1} \log \frac{N}{df_i}$$
Quindi, in assenza di feedback, il BIM assegna punteggio a un documento sommando gli IDF dei termini della query presenti nel documento.
#### BIM vs Vector Space Model
A livello operativo, BIM e modello vettoriale non sono troppo diversi:
- entrambi assegnano uno score ai documenti;
- entrambi sommano contributi dei termini;
- entrambi possono usare un inverted index.
La differenza principale è teorica:
- il **Vector Space Model** usa similarità geometrica e pesi come tf-idf;
- il **BIM** deriva i pesi da un ragionamento probabilistico.
Nel caso senza feedback, però, il BIM si avvicina molto a una semplice somma di IDF
Il BIM ha limiti importanti:
1. **Natura binaria**  
   Considera solo presenza o assenza del termine.
2. **Assenza di Term Frequency**  
   Non distingue tra un termine presente una volta e uno presente molte volte.
3. **Assenza di normalizzazione per la lunghezza**  
   Non corregge il fatto che documenti più lunghi tendono naturalmente a contenere più termini.
Per questi motivi il BIM funziona meglio su testi brevi, come titoli o abstract, ma non è adatto alla full-text search moderna.
Questi limiti motivano il passaggio ai modelli successivi, come Poisson, 2-Poisson e BM25.
#### Introduzione della Term Frequency: modello di Poisson
Il BIM rappresenta i documenti in modo binario: per ogni termine considera solo se compare oppure no
$x_i \in \{0,1\}$
Questo però è limitante, perché non distingue tra un termine presente una volta e uno presente molte volte
Introduciamo quindi la **Term Frequency**
Quindi il documento viene rappresentato come vettore di conteggi:
$(d_{t_1}, \dots, d_{t_n})$
dove \($d_{t_i}=n_i$\) indica quante volte il termine \($t_i$\) compare nel documento.
Il problema diventa quindi:

> come modelliamo probabilisticamente il numero di occorrenze di un termine in un documento?
#### Distribuzione di Poisson
Per modellare il numero di occorrenze di un termine si usa la **distribuzione di Poisson**.
L’idea è che la comparsa di un termine possa essere vista come un evento raro distribuito tra molti “slot”, cioè le posizioni disponibili nel documento.
La probabilità di osservare \($x$\) occorrenze di un termine, dato un numero medio atteso ($\lambda$), è:
$Poisson(x|\lambda)=\frac{e^{-\lambda}\lambda^x}{x!}$

- \($x$\) è il numero di occorrenze osservate;
- \($\lambda$\) è il numero medio atteso di occorrenze.
Una stima semplice di \($\lambda$\) per un termine \($t_j$\) è:
$$\lambda \approx \frac{CF_j}{N}$$
dove:
- \($CF_j$\) è il numero totale di occorrenze del termine \($t_j$\) nella collezione;
- \($N$\) è il numero totale di documenti.
Nel ranking interessa confrontare due quantità:
- \($\rho_j$\): numero medio atteso di occorrenze del termine nei documenti rilevanti;
- \($\gamma_j$\): numero medio atteso di occorrenze del termine nella collezione generale.
#### RSV nel modello di Poisson semplice
Usando il modello di Poisson, il punteggio del documento può essere scritto come:
$$RSV_d=\sum_{t_i:y_i=1} n_i \log \frac{\rho_i}{\gamma_i}$$

- \($n_i$\) è il numero di occorrenze del termine \($t_i$\) nel documento;
- \($\rho_i$\) è la frequenza media attesa nei documenti rilevanti;
- \($\gamma_i$\) è la frequenza media attesa nella collezione generale.

> ogni occorrenza del termine contribuisce al punteggio in modo lineare.

Quindi, se un termine compare 1 volta, dà un certo contributo; se compare 10 volte, dà 10 volte quel contributo.
Questo introduce finalmente la Term Frequency, ma crea un problema: la crescita lineare è troppo forte. 
Dopo un certo punto, ripetere molte volte lo stesso termine non dovrebbe aumentare proporzionalmente la rilevanza.
###### Limite della Poisson semplice
La Poisson semplice descrive abbastanza bene i termini poco informativi, detti **contentless**, come parole comuni o molto frequenti.
Per i termini semanticamente importanti, detti **contentful**, la situazione è diversa.
Se un documento parla davvero di un certo argomento, i termini legati a quell’argomento tendono a comparire molte più volte del normale.
Questo fenomeno prende il nome di **eliteness**:
> un documento è elite per un termine quando quel termine rappresenta un concetto centrale del documento.

Quindi una sola Poisson non basta, perché un termine può comportarsi in due modi diversi:
1. compare casualmente in documenti in cui non è centrale;
2. compare spesso in documenti in cui è centrale.
![[Pasted image 20260502144641.png]]
#### Modello 2-Poisson

Il modello **2-Poisson** nasce per descrivere meglio i termini contentful.
L’idea è usare due distribuzioni di Poisson:
- una per i documenti **non-elite**, dove il termine compare poco;
- una per i documenti **elite**, dove il termine compare molto.

Per ogni termine \($t_i$\), introduciamo una variabile nascosta di `eliteness`:
$E_i$
- \($E_i$\): il documento è elite per il termine \($t_i$\);
- \($\bar E_i$\): il documento non è elite per il termine \($t_i$\).
La probabilità di osservare \($n_i$\) occorrenze diventa una combinazione pesata di due Poisson:
$$p(d_{t_i}=n_i|R,v_q)
=
p_i \cdot Poisson(n_i|\mu_i)
+
(1-p_i)\cdot Poisson(n_i|\bar \mu_i)$$
- \($p_i$\) è la probabilità che il documento sia elite per il termine;
- \($\mu_i$\) è la media delle occorrenze nei documenti elite;
- \($\bar \mu_i$\) è la media delle occorrenze nei documenti non-elite.

> il 2-Poisson distingue tra occorrenze casuali di un termine e occorrenze dovute al fatto che il termine è centrale nel documento.
###### Problema pratico del 2-Poisson
Il modello 2-Poisson è teoricamente più realistico, ma difficile da usare in pratica.
Per ogni termine bisognerebbe stimare diversi parametri:
- \($\mu_i$\): media nei documenti elite;
- \($\bar \mu_i$\): media nei documenti non-elite;
- \($p_i$\): probabilità di eliteness nei documenti rilevanti;
- \($\bar p_i$\): probabilità di eliteness nella collezione.
Questi parametri non sono facili da conoscere a priori.
Per questo, invece di usare direttamente il 2-Poisson completo, si cerca una funzione più semplice che ne approssimi il comportamento.
![[Pasted image 20260502152923.png|500]]
> **Visualizzazione**: Il grafico mostra due picchi: uno stretto vicino allo zero (non-elite) e uno più ampio e spostato a destra (elite).
#### Saturazione della Term Frequency
La funzione cercata deve avere tre proprietà:
1. valere zero se il termine non compare;
2. crescere quando aumenta il numero di occorrenze;
3. saturare, cioè crescere sempre meno dopo un certo punto.

La funzione scelta è:
$$\frac{(k+1)n_i}{k+n_i}$$
- \($n_i$\) è la frequenza del termine nel documento;
- \($k$\) è un parametro da ottimizzare.
Questa funzione introduce la **saturazione della Term Frequency**:

> se un termine compare più volte, il documento riceve più punteggio, ma dopo un certo punto ulteriori occorrenze aggiungono sempre meno informazione.

Combinando questa saturazione con il peso IDF, si ottiene una prima forma dei modelli Best Match:

$$RSV_d=
\sum_{t_i:y_i=1}
\frac{(k+1)n_i}{k+n_i}
\log \frac{N}{df_{t_i}}$$
> **Importanza**: Questo è il "primo passo verso il modello BM25". Il fattore $\frac{(k+1)n_i}{k+n_i}$ è ciò che permette di pesare la **Term Frequency** in modo non lineare, introducendo il concetto di **saturazione**.

Per **saturazione** si intende che il contributo della term frequency **cresce all’inizio**, ma poi **aumenta sempre meno** fino a tendere a un valore massimo.
se un termine compare più volte, il documento prende più punteggio; però dopo un certo punto, altre occorrenze aggiungono pochissimo.
Questa formula è il passaggio concettuale verso **BM25**
#### Modello Okapi BM25
Il modello **Okapi BM25** (o semplicemente BM25) rappresenta l'evoluzione moderna del BIM. È un modello probabilistico **non binario** che risolve le limitazioni dei modelli precedenti integrando la frequenza dei termini (TF) e la normalizzazione della lunghezza.
Mentre il BIM era adatto a record brevi (titoli o abstract) di lunghezza omogenea, il BM25 è progettato per il **full-text search** moderno. 
Le sue caratteristiche principali sono:
* **Sensibilità alla TF**: non si limita a rilevare la presenza di un termine, ma ne pesa l'occorrenza.
* **Sensibilità alla lunghezza**: adatta il peso dei termini in base a quanto è lungo il documento.
* **Robustezza**: è considerato uno dei modelli di ranking più efficaci e utilizzati nello stato dell'arte
Il nucleo fondamentale del BM25 è il peso **IDF**. Nella sua forma più semplice (che coincide con il BIM in assenza di feedback), il punteggio di un documento è la somma dei pesi IDF dei termini della query presenti nel documento:
$$RSV_d = \sum_{t \in q} \log \frac{N}{df_t}$$
Per migliorare il semplice IDF, BM25 introduce la frequenza del termine nel documento ($tf_{td}$) attraverso una funzione di saturazione. La formula base diventa:
$$RSV_d = \sum_{t \in q} \frac{(k_1 + 1)tf_{td}}{k_1 + tf_{td}} \log \frac{N}{df_t}$$

* **$k_1$**: è un parametro di *tuning* che controlla la scala di saturazione della valenza della TF.
	- solitamente impostato tra **1.2** e **2.0**.
	- Un valore di $k_1$ **basso** porta a una saturazione rapida (già con poche occorrenze il termine raggiunge quasi il suo peso massimo).
    * Un valore di $k_1$ **alto** rende la crescita del punteggio più lenta e "più vicina" a una crescita lineare (tipica del tf-idf classico).
* **Fattore $(k_1 + 1)$**: serve a normalizzare il punteggio in modo che, quando $tf_{td} = 1$, il contributo della componente TF sia pari a 1 (rendendo il punteggio finale pari all'IDF puro).
* **Bounded scores**: a differenza del modello vettoriale (dove la TF può crescere quasi linearmente), qui il punteggio è **limitato superiormente** da un asintoto.
![[Pasted image 20260502154640.png]]
- quanto k fa variare la valenza della TF per un certo termine
###### Ulteriore correzione
Dopo aver gestito la saturazione della TF, è necessario correggere un altro bias fondamentale: i documenti lunghi tendono ad avere valori di TF più elevati per ragioni puramente statistiche.
Un documento può essere più lungo per due motivi principali:
1. **Verbosità (Verbosity)**: L'autore utilizza molte parole per esprimere lo stesso concetto. In questo caso, le alte frequenze dei termini sono "artificiali" e vanno penalizzate.
2. **Ampiezza del contenuto (Larger Scope)**: Il documento tratta molti argomenti diversi. In questo caso, le frequenze osservate possono essere corrette.
Poiché una collezione reale contiene entrambi i tipi di documenti, è necessaria una **normalizzazione parziale**.
Definiamo innanzitutto i parametri di calcolo:
* **$L_d$**: Lunghezza del documento $d$, calcolata come somma delle frequenze di tutti i termini in esso contenuti $$L_{d} = \sum_{t} tf_{td}$$
* **$L_{ave}$**: Lunghezza media dei documenti nell'intera collezione $D$ $$L_{ave} = \frac 1 {|D|} \sum\limits_{d \in D}L_{d}$$
* **Fattore di normalizzazione $B$**: $$B = (1 - b) + b \frac{L_d}{L_{ave}} \quad \text{con } 0 \leq b \leq 1$$
	Il parametro **$b$** regola l'intensità della normalizzazione:
	*   **$b = 1$**: Normalizzazione totale (penalizza pesantemente la lunghezza).
	*   **$b = 0$**: Nessuna normalizzazione (modello sordo alla lunghezza).
Il fattore $B$ viene inserito al denominatore della componente TF.
Di conseguenza:   
**Valore Standard**: Empiricamente, si è dimostrato che un valore di **$b \approx 0.75$** offre il miglior compromesso tra verbosità e ampiezza di contenuto.

###### Okapi BM25+correzioni varie
$$RSV_d = \sum_{t \in q} \log \left( \frac{N}{df_t} \right) \cdot \frac{(k_1 + 1)tf_{td}}{k_1 \left( (1 - b) + b \frac{L_d}{L_{ave}} \right) + tf_{td}}$$
#### Riepilogo dei Parametri Operativi
1.  **$tf_{td}$**: Frequenza del termine della query nel documento.
2.  **$L_d$ e $L_{ave}$**: Lunghezza del documento corrente e lunghezza media della collezione.
3.  **$k_1$ (TF Saturation)**: Controlla la saturazione della frequenza. 
    *   Se $k_1 = 0$, il modello diventa binario (BIM).
    *   Valori tipici: **1.2 - 2.0**.
4.  **$b$ (Length Normalization)**: Controlla quanto penalizzare i documenti lunghi. 
    *   Valori tipici: **0.75**.
- Per qualcosa di **semplice e basico**: usare Modello Vettoriale con pesatura tf-idf.    
    - Per un **ranking robusto e performante**: usare BM25 (o modelli del linguaggio) con parametri ottimizzati.
- **BM25 nella pratica reale:**
    - **Elasticsearch:** utilizza BM25 come modello di default per la similarità.
    - **Apache Solr:** utilizza BM25 come default dalla versione 8.x in poi

N.B è possibile sfruttare la saturazione delle term frequency della query usando k3
BM25 è robusto con valori compresi tra k1=1.2-2.0 e b circa 0.75
Questi valori non sono leggi universali.
In un sistema reale, i parametri andrebbero scelti su un development set, misurando metriche come:
- precision
- recall
- MAP
- nDCG
- MRR
COSINE SIMILARITY VS BM25 
- TF-IDF + cosine normalizza geometricamente i vettori
- BM25 usa saturazione della term frequency e normalizzazione esplicita della lunghezza
- cosine similarity ritorna un valore compreso tra 0 e 1 mentre BM25 uno score numerico che va a infinito
BM25 È USATO SU LUCENE