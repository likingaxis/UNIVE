https://colab.research.google.com/drive/1Bxyw8YfE60BS_YoDHwYSPdB6BgUHuXEZ?usp=sharing

Ogni colonna è un documento.
Ogni riga è un termine.
Quindi un documento è rappresentato come un vettore nello spazio dei termini.
Per esempio, il documento d1 è la prima colonna della matrice.
##### Singular Value Decomposition
La SVD decompone la matrice termine-documento $A$ come:
$$

A = U \Sigma V^T

$$
- $U$ contiene i vettori latenti associati ai termini;
- $\Sigma$ contiene i valori singolari; sono gli autovalori della radice ma sono gli autovalori della trasposta
- $V^T$ contiene i vettori latenti associati ai documenti.
I valori singolari indicano quanta informazione è catturata da ciascuna dimensione latente.
I valori singolari più grandi catturano le direzioni principali della matrice.
Possiamo misurare quanta "energia" viene spiegata dalle prime $k$ componenti usando:
$$

\frac{\sum_{i=1}^{k}\sigma_i^2}{\sum_i \sigma_i^2}

$$
In LSI manteniamo le direzioni associate ai valori singolari più grandi e scartiamo quelle associate ai valori più piccoli, interpretate come dettagli o rumore
$$

A_k = U_k\Sigma_k V_k^T

$$
L’**energia** misura quanto una componente latente contribuisce a ricostruire la matrice originale.
Confrontiamo la matrice originale $A$ con la sua approssimazione $A_2$ data da k=2
Notiamo che $A_2$ non è identica ad $A$, ma introduce associazioni latenti.
Alcune celle che erano zero possono diventare leggermente positive o negative:
questo è il segnale che LSI sta ricostruendo relazioni indirette.

Original matrix A:

||d1|d2|d3|d4|d5|d6|
|---|---|---|---|---|---|---|
|animal|0.000|0.000|0.000|1.847|1.847|0.000|
|car|1.560|1.560|0.000|0.000|0.000|1.560|
|cat|0.000|0.000|0.000|1.847|0.000|1.847|
|dog|0.000|0.000|0.000|1.847|1.847|0.000|
|engine|1.560|1.560|1.560|0.000|0.000|0.000|
|highway|0.000|0.000|2.253|0.000|0.000|0.000|
|kitten|0.000|0.000|0.000|0.000|0.000|2.253|
|pet|0.000|0.000|0.000|0.000|2.253|0.000|
|road|1.847|1.847|0.000|0.000|0.000|0.000|
|truck|1.847|0.000|1.847|0.000|0.000|0.000|
|wheel|0.000|2.253|0.000|0.000|0.000|0.000|

Low-rank approximation A_2:

||d1|d2|d3|d4|d5|d6|
|---|---|---|---|---|---|---|
|animal|-0.085|-0.055|-0.152|1.685|1.728|0.668|
|car|1.463|1.432|0.894|0.264|0.181|0.605|
|cat|0.228|0.241|0.072|1.170|1.183|0.561|
|dog|-0.085|-0.055|-0.152|1.685|1.728|0.668|
|engine|1.651|1.609|1.030|-0.072|-0.175|0.529|
|highway|0.572|0.556|0.359|-0.074|-0.111|0.163|
|kitten|0.301|0.300|0.163|0.412|0.402|0.272|
|pet|-0.080|-0.061|-0.111|1.040|1.068|0.402|
|road|1.487|1.450|0.925|-0.024|-0.116|0.493|
|truck|1.221|1.190|0.763|-0.080|-0.157|0.380|
|wheel|0.895|0.873|0.556|-0.006|-0.061|0.300|

## Errore di ricostruzione
Più alto è $k$, più $A_k$ si avvicina ad $A$.
Misuriamo l'errore con la norma di Frobenius:
$$

\|A-A_k\|_F

$$

###### Documenti e Termini
$$

D_k = \Sigma_k V_k^T

$$
$$

T_k = U_k\Sigma_k

$$
Una dimensione latente è una specie di “asse semantico” costruito combinando:
$$u_i,\ \sigma_i,\ v_i^T$$
$$

T_k=U_k\Sigma_k^{1/2}

$$
$$

D_k=\Sigma_k^{1/2}V_k^T

$$
facciamo il prodotto scalare termine documento dei vettori per avere il valore 
$$A_k(t,d) \approx \langle \vec t,\vec d\rangle$$
## Effetto del numero di dimensioni latenti $k$
Il parametro $k$ controlla la dimensionalità dello spazio latente.
- $k$ troppo piccolo: perdiamo troppa informazione;
- $k$ troppo grande: ci avviciniamo allo spazio originale e manteniamo più rumore;
- $k$ intermedio: possiamo ottenere una buona rappresentazione semantica compressa.
Per esempio, se cerchiamo le parole più vicine a `car`, ci aspettiamo parole come `engine`, `cars`, `road`, `auto`, `vehicle`.
Questo rende visibile l'effetto di LSI:
$$\text{similarità lessicale diretta}

\longrightarrow

\text{similarità latente}$$
Useremo una matrice più grande e un valore di $(k)$ maggiore, perché con solo 2 dimensioni latenti perdiamo troppa informazione
  

I termini vicini nello spazio LSI possono essere usati anche per fare **query expansion**.

Per esempio, se la query contiene `space` e nello spazio latente troviamo termini vicini come `orbit`, `nasa`, `shuttle`, `mission`, `launch`, possiamo costruire una query espansa aggiungendo alcuni di questi termini.

###### LSI 4 EBMEDDING
Qui confronti due termini:
$$\cos(t_{1,k}, t_{2,k})$$
$$\cos(\text{car}, \text{truck})$$
Serve a vedere se due parole vengono percepite come semanticamente vicine

```scss
LSI_RANKING(DOCUMENTI, QUERY, k):

    A ← matrice termine-documento pesata con TF-IDF

    U, Σ, V^T ← SVD(A)

    U_k ← prime k colonne di U
    Σ_k ← primi k valori singolari
    V_k^T ← prime k righe di V^T

    DOCUMENTI_LATENTI ← Σ_k V_k^T

    q ← vettore TF-IDF della QUERY

    q_k ← q^T U_k Σ_k^{-1}

    per ogni documento d_j:
        d_j,k ← colonna j di DOCUMENTI_LATENTI
        score_j ← coseno(q_k, d_j,k)

    restituisci i documenti ordinati per score_j decrescente
```


# Esercizi finali

  

## Esercizio 1 — Interpretare la mini-collezione


Usa la mini-collezione iniziale
1. Osserva la matrice termine-documento originale.
2. Osserva la matrice approssimata $A_2$.
3. Quali termini finiscono vicini nello spazio latente?
	- dovrei scriverli tutti ma in sostanza kitten cat pet dog animal creano un insieme mentre invece wheel highway truck road car engine un altro
4. I documenti sugli animali e quelli sui veicoli vengono separati?
	- decisamente si
  

## Esercizio 2 — Cambiare $k$
Nella mini-collezione prova:

$$

k=1,\ 2,\ 3,\ 4

$$

  

Domande:
1. Come cambia l'errore di ricostruzione?
	- da k=3 in su iniziamo ad avere un errore utilizzabile
2. Come cambia il plot dei documenti?
	- 
3. Con $k=1$, quali informazioni vengono perse?
	- Con $k=1$, viene mantenuta solo la prima dimensione latente. Questo permette di conservare il pattern principale della collezione, ma elimina le informazioni contenute nelle componenti successive
4. Con $k$ massimo, cosa succede?
	1. abbiamo quasi 0 quindi  non abbiamo quasi errore

  

---

  

## Esercizio 3 — Confrontare TF-IDF e LSI
Sulla collezione reale prova query come:
- `space mission orbit`
- `car engine speed`
- `image rendering graphics`
- `political government law`
Per ogni query confronta:
1. top-5 con TF-IDF;
2. top-5 con LSI;
3. categorie dei documenti recuperati;
4. documenti comuni ai due ranking.

TF-IDF tende a favorire i documenti che condividono direttamente i termini della query o termini molto pesati nel vocabolario originale. LSI, invece, proietta query e documenti in uno spazio latente e quindi può recuperare documenti semanticamente vicini al topic della query anche quando la corrispondenza lessicale non è perfetta