### Parte 0 formalizzazione del problema
Il problema è un task di **apprendimento supervisionato di classificazione binaria**.  
La classe positiva è `Y = 1` (…), la classe negativa è `Y = 0` (…).  
Gli attributi osservabili sono: A1, A2, …, Ak.
- il nostro training set è composto esattamente da
Conta:
- $p$ = numero di esempi positivi
- $n$ = numero di esempi negativi
- $N = p + n$
Scrivi esplicitamente:
> Nel training set sono presenti p = … istanze positive e n=… negative.

### Parte 1 Entropia del nodo iniziale con tutto S
Dato il training set $S$, composto da $N = p+n$ istanze, di cui:
- $p$ istanze della classe positiva
- $n$ istanze della classe negativa
l’entropia del nodo iniziale è definita come:
$H(S) = -\frac{p}{N}\log_2\frac{p}{N} - \frac{n}{N}\log_2\frac{n}{N}$
_(sostituire i valori di $p$ e $n$ e calcolare il valore numerico)

### Parte 3 Calcolo radice iniziale
Considero tutte le suddivisioni del training set S sugli attributi $A_1,...,A_4$
Per ciascun attributo $A_i$​ del training set si procede come segue.
Si considera una suddivisione del training set $S$ sull’attributo $A_i$​, che genera i sottoinsiemi:
$S_{A_i = v} \  , \quad v \in \{0,1\}$
Per ciascun sottoinsieme si contano:
- $p_v$​: numero di istanze positive
- $n_v$​: numero di istanze negative
quindi:
per ogni attributo fai questo
![[Pasted image 20260128185010.png|400]]


**2.2 Entropia dei sottoinsiemi**
Per ciascun sottoinsieme $S_{A_i = v}$ si calcola l’entropia:

$(S_{A_i = v}) = -\frac{p_v}{|S_v|}\log_2\frac{p_v}{|S_v|} - \frac{n_v}{|S_v|}\log_2\frac{n_v}{|S_v|}$
**2.3 Calcolo del remainder**
Il remainder associato all’attributo $A_i$​ è definito come:
$Remainder(S, A_i) = \sum_{v \in \{0,1\}} \frac{|S_v|}{|S|} \cdot H(S_{A_i = v})$
**2.4 Calcolo dell’Information Gain**
L’Information Gain associato all’attributo $A_i​$ è quindi:
$IG(S, A_i) = H(S) - Remainder(S, A_i)$
**3. Scelta del nodo radice**
Si calcola l’Information Gain per ciascun attributo $A_i$e si seleziona come nodo radice l’attributo che massimizza tale valore.
$A^* = \arg\max_{A_i} IG(S, A_i)$

> Poiché l’attributo $A$ massimizza l’Information Gain, viene scelto come **nodo radice** del Decision Tree.

📌 Se c’è parità:

> In caso di parità dell’IG, scelgo arbitrariamente $A$.

Verifica della purezza del nodo**

🔧 Cosa fare

- guarda le etichette di classe nel sottoinsieme
- verifica se sono **tutte uguali**

✍️ Cosa scrivere (scegline UNA)

**Caso A — Nodo puro**

> Tutte le istanze di $S′$ appartengono alla stessa classe, pertanto il nodo è una foglia e viene assegnata la classe $Y = c$

**Caso B — Nodo non puro**

> Il nodo non è puro, quindi è necessario procedere con una ulteriore suddivisione.

### LOOP
Una volta scelto il nodo radice, la costruzione del Decision Tree prosegue in modo ricorsivo applicando lo stesso criterio di Information Gain ai sottoinsiemi generati.
- prendi **un valore alla volta** dell’attributo radice
- crea il sottoinsieme corrispondente
✍️ Cosa scrivere

> Considero il ramo corrispondente a $A^* = v$, che genera il sottoinsieme $S'$


### Calcolo precision recall ecc... con confusion matrix
**3. Calcolo di Precision, Recall, F1 e discussione della qualità del DT**
Qui devi **applicare il DT ai dati noti A–H**.
🔹 3.1 Applica il DT alle istanze A–H
🔧 Cosa fare
- prendi ogni istanza A–H
- segui il percorso nel DT
- confronta **classe predetta vs classe reale**
🔹 3.2 Costruisci la confusion matrix
Definisci:
- **TP**: predetti 1 e realmente 1
- **TN**: predetti 0 e realmente 0
- **FP**: predetti 1 ma realmente 0
- **FN**: predetti 0 ma realmente 1
✍️ Puoi scriverlo così:
`Applicando il DT al training set si ottengono: TP = … TN = … FP = … FN = …`
🔹 3.3 Calcola le metriche (OBBLIGATORIE)
Scrivi SEMPRE le formule:
$Precision = \frac{TP}{TP+FP}$
$Recall=\frac{TP}{TP+FN}$
$F1=\frac{2⋅Precision⋅Recall​}{Precision+Recall}​$


`Il Decision Tree ottenuto classifica correttamente tutte (o la maggior parte) delle istanze del training set, mostrando valori elevati di Precision, Recall e F1-measure.  Il modello risulta interpretabile e poco profondo, ma è stato addestrato su un dataset di dimensioni ridotte, quindi potrebbe soffrire di overfitting.  Per una valutazione più affidabile sarebbe opportuno validare il modello su dati non visti o mediante tecniche di cross-validation.`

🔹 4.1 Classificazione delle istanze X–Z
Per ogni istanza:

✍️ Template

`Per l’istanza X, seguendo il percorso nel Decision Tree: A1 = … A2 = … ⇒ viene assegnata la classe Y = …`

Ripeti per Y e Z.
🔹 4.2 Discussione: seguiresti il DT per mangiare i funghi?
Qui devi **pensare come una persona responsabile**, non come una macchina.
✍️ Risposta ideale (copiabile)
`Il Decision Tree fornisce una decisione basata esclusivamente sui dati di addestramento disponibili.  Tuttavia, considerando la ridotta dimensione del training set e il fatto che alcune decisioni sono basate su pochi esempi, seguire ciecamente il modello potrebbe comportare un rischio.  In un problema critico come quello del consumo di funghi, potrebbe essere preferibile adottare una politica prudenziale, evitando decisioni positive in presenza di incertezza, anche a costo di scartare funghi commestibili.`
