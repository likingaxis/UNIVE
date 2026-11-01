- Multi layer perceptron

 Introduzione al problema

Si considera il problema di apprendere la funzione

$y = \sin(x) + 3$
nell’intervallo $[0, \pi/2]$
Dal punto di vista del Machine Learning, il problema è formulato come un **task di regressione supervisionata**, in cui l’obiettivo è apprendere una funzione che approssimi una relazione continua tra una variabile di input $x$ e una variabile di output $y$.

Definizione del training set

Il **training set** è costituito da un insieme di coppie $(x, y)$, dove:
- $x \in [0, \pi/2]$,
- $y = \sin(x) + 3$ è il valore noto della funzione.
Il dataset può essere costruito scegliendo alcuni valori noti di $x$ (ad esempio $x = 0, \pi/4, \pi/3$ e calcolando i corrispondenti valori di $y$.  
Questi esempi rappresentano le osservazioni disponibili per l’addestramento del modello.

Percettrone semplice (modello lineare)
Un **percettrone semplice senza funzione di attivazione non lineare** implementa una **legge puramente lineare**.  
Nel caso monodimensionale, il modello può essere scritto come:
$$h_w(x) = m x + q$$
dove:
- $m$ è il coefficiente angolare,
- $q$ è il termine noto.
Il percettrone tenta quindi di approssimare la funzione data mediante una retta nel piano $(x, y)$

Funzione di loss

La **loss function** è una funzione che misura l’errore tra il valore predetto dal modello e il valore reale della funzione sui punti di training.
Per un problema di regressione si utilizza lo **scarto quadratico**, definito come:
$$\ell(y, h_w(x)) = (y - h_w(x))^2$$
Questa loss penalizza maggiormente errori grandi e fornisce una misura continua della qualità dell’approssimazione.  
L’obiettivo dell’addestramento è minimizzare questa loss sui dati di training.

Dato un punto di training $(x, y)$, il percettrone produce una predizione $h_w(x)$.  
L’errore viene misurato tramite la loss $(y - h_w(x))^2$
Se l’errore è elevato, i parametri del modello vengono aggiornati per ridurre la loss sui dati di training, migliorando progressivamente l’approssimazione della funzione target.


Soluzione finale del percettrone lineare

L’addestramento del percettrone consiste nel trovare i parametri $m$ e $q$ che minimizzano la loss sui punti del training set.
La soluzione finale è una retta che approssima la funzione $\sin(x) + 3$ nel modo migliore possibile dato il modello lineare.  
Tuttavia, poiché la funzione target è **non lineare**, una singola retta non è in grado di seguirne l’andamento, e rimane quindi un errore residuo.
Questo mette in evidenza il **limite del percettrone lineare**, legato alla sua scarsa capacità espressiva.

Introduzione di una funzione di attivazione non lineare

Introducendo una **funzione di attivazione non lineare** (ad esempio la sigmoide) nel percettrone, il modello non rappresenta più una semplice retta, ma una funzione non lineare.
Questo consente di migliorare l’adattamento ai dati e ridurre la loss rispetto al caso puramente lineare, pur mantenendo una struttura semplice.

Utilizzo di un MLP con uno strato nascosto

Un **Multi-Layer Perceptron (MLP)** con uno strato nascosto è composto da più neuroni non lineari che operano in parallelo.
Ogni neurone dello strato nascosto apprende una diversa trasformazione dell’input; la loro combinazione consente di costruire **approssimazioni più flessibili**, capaci di seguire l’andamento non lineare della funzione seno.
L’MLP viene addestrato utilizzando la stessa funzione di loss basata sullo scarto quadratico, ma grazie alla maggiore capacità espressiva riesce a ridurre ulteriormente l’errore rispetto al percettrone semplice.

