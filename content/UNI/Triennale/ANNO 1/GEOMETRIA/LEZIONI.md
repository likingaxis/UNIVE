# 🟦 LEZIONE 1 — VETTORI, RIFERIMENTI AFFINI, RETTE E PIANI

## 1️⃣ Punto e vettore (prima distinzione fondamentale)

### 🔹 Punto
Un **punto** è un ente geometrico che indica una posizione nello spazio euclideo.
> ⚠️ Un punto **non** è un vettore.
### 🔹 Vettore applicato
Un **vettore applicato** è un **segmento orientato** con:
- punto di applicazione
- direzione
- verso
- modulo
Si indica come $(\vec{OA})$, dove:
- ($O$) è il punto di applicazione
- ($A$) è il punto finale
### 🔹 Vettori equipollenti
Due vettori applicati sono **equipollenti** se hanno:
- stessa direzione
- stesso verso
- stesso modulo
L’insieme delle classi di equivalenza dei vettori equipollenti dà luogo ai **vettori liberi**.
👉 **All’orale puoi dire**:
> “Identificando vettori applicati equipollenti otteniamo il concetto di vettore libero.”
## 2️⃣ Operazioni sui vettori
### 🔹 Somma
La **somma tra vettori** si definisce tramite la **regola del parallelogramma**.
Proprietà:
- commutativa
- associativa
- esiste il vettore nullo $(\vec{0})$
- ogni vettore ha un opposto
### 🔹 Prodotto per scalare
Dato uno scalare $( \lambda \in \mathbb{R} )$ e un vettore ($v$), il prodotto ( $\lambda v$ ) è un vettore con:
- stessa direzione
- verso concorde se ( $\lambda > 0$ ), opposto se ( $\lambda < 0$ )
- modulo moltiplicato per $(|\lambda|)$
## 3️⃣ Base e coordinate dei vettori (PASSAGGIO CHIAVE)
### 🔹 Base di vettori applicati
Un insieme di vettori $( {v_1, \dots, v_n} )$ è una **base** se:
- i vettori sono linearmente indipendenti
- ogni vettore dello spazio si scrive come loro combinazione lineare
### 🔹 Coordinate di un vettore
Scelta una base $(B={v_1,\dots,v_n})$, ogni vettore $(v)$ si scrive **in modo unico**:  
$[  v = a_1 v_1 + \dots + a_n v_n  ]$
I numeri $(a_1,\dots,a_n)$ sono le **coordinate di (v) rispetto alla base (B)**.
👉 Frase da orale:
> “Fissata una base, la rappresentazione di un vettore come combinazione lineare è unica e i coefficienti sono le sue coordinate.”
## 4️⃣ Riferimento affine (punti + vettori)

### 🔹 Definizione
Un **riferimento affine** è dato da:
- un punto $(O)$ (origine)
- una base di vettori $( {v_1,\dots,v_n} )$
### 🔹 Coordinate di un punto
Dato un punto $(P)$, il vettore posizione $(\vec{OP})$ si scrive:  
$[  \vec{OP} = a_1 v_1 + \dots + a_n v_n  ]$
I coefficienti $(a_i)$ sono le **coordinate del punto (P)** nel riferimento affine scelto.
👉 Frase da orale:
> “Le coordinate di un punto dipendono dal riferimento affine scelto.”
## 5️⃣ Retta: definizione ed equazioni
### 🔹 Retta come insieme di punti
Una **retta** è l’insieme dei punti:  
$[  r = { P = P_0 + t,v \mid t \in \mathbb{R} }  ]$  
dove:
- $(P_0)$ è un punto fissato
- $(v \neq 0)$ è un vettore direttore
### 🔹 Equazione vettoriale della retta
$\vec{OP} = \vec{OP_0} + t,v$
### 🔹 Equazioni parametriche

Scrivendo in coordinate: 

$\begin{cases}  x = x_0 + tv_1 \  y = y_0 + tv_2 \  z = z_0 + tv_3  \end{cases}$
👉 Frase da orale:
> “Una retta non è un sottospazio vettoriale perché non passa per l’origine, ma è un sottospazio affine.”
## 6️⃣ Piano: definizione ed equazioni

### 🔹 Piano come sottospazio affine
Un **piano** è l’insieme dei punti:  
$\pi = { P = P_0 + s,v + t,w \mid s,t \in \mathbb{R} }$  
dove:
- $(v,w)$ sono vettori non proporzionali
- generano la giacitura del piano
### 🔹 Equazione vettoriale del piano
$\vec{OP} = \vec{OP_0} + s,v + t,w$  
👉 Frase da orale:
> “I vettori (v) e (w) sono detti vettori di giacitura del piano.”
## 7️⃣ Collegamento con i sistemi lineari (IMPORTANTISSIMO)
- Intersezione di rette o piani ⇔ risoluzione di un **sistema lineare**
- Parametri ⇔ incognite
- Compatibilità ⇔ esistenza di intersezioni
👉 Frase jolly:
> “Lo studio geometrico di rette e piani si riconduce allo studio di sistemi lineari.”
## 8️⃣ Mini–domande tipiche da orale
1. Perché una retta non è un sottospazio vettoriale?
2. In cosa differisce uno spazio affine da uno spazio vettoriale?
3. Le coordinate di un punto sono univoche?
4. Cosa cambia se cambio riferimento?
5. Perché servono i parametri?
## 🎯 Cosa devi fare ORA
1. Trascrivi **solo le definizioni in grassetto** → appunti
2. Memorizza **le frasi da orale**
3. Prova a dire ad alta voce:
    > “Data una retta… la scrivo in forma vettoriale…”
# 🟦 LEZIONE 2 — SPAZI VETTORIALI, SOTTOSPAZI, COMBINAZIONI LINEARI, BASE, DIMENSIONE
## 1️⃣ Spazio vettoriale (DEFINIZIONE DA ORALE)
### 🔹 Definizione
Uno **spazio vettoriale** su un campo ($K$) è un insieme ($V$) su cui sono definite:
- una **somma** tra vettori
- un **prodotto per scalare**
tali che valgano gli **8 assiomi** (gruppo commutativo per la somma + compatibilità col campo).
👉 Frase da orale:
> “La struttura fondamentale è quella di gruppo abeliano rispetto alla somma, arricchita dal prodotto per scalare.”
### 🔹 Esempi
- $( \mathbb{R}^n ) su ( \mathbb{R} )$
- $( \mathbb{C}^n ) su ( \mathbb{C} )$
- Spazio delle soluzioni di un sistema omogeneo
## 2️⃣ Sottospazio vettoriale (DOMANDA CLASSICA)

### 🔹 Definizione
Un sottoinsieme $(W \subseteq V)$ è un **sottospazio vettoriale** se:
1. $(0 \in W)$
2. è chiuso rispetto alla somma
3. è chiuso rispetto al prodotto per scalare
👉 Frase da orale:
> “Un sottospazio è uno spazio vettoriale contenuto in un altro.”
### 🔹 Osservazione fondamentale
Ogni sottospazio **deve contenere il vettore nullo**.
👉 Tipica trappola:
- una retta **passante per l’origine** è un sottospazio
- una retta **non passante per l’origine** **non lo è**
## 3️⃣ Combinazioni lineari

### 🔹 Definizione
Dati vettori $(v_1,\dots,v_n \in V)$ e scalari $(a_1,\dots,a_n)$,  
$a_1 v_1 + \dots + a_n v_n$  
è una **combinazione lineare**.
### 🔹 Sottospazio generato (SPAN)
Lo **span** di $(v_1,\dots,v_n)$ è:  
$\text{Span}(v_1,\dots,v_n)$  
l’insieme di **tutte** le loro combinazioni lineari.
👉 Frase da orale:
> “Lo span è il più piccolo sottospazio che contiene quei vettori.”

## 4️⃣ Sistema di generatori
### 🔹 Definizione
Un insieme di vettori $(G)$ è un **sistema di generatori** di $(V)$ se:  
$\text{Span}(G) = V$  
👉 Collegamento con sistemi lineari:
> “Dire che un vettore (b) appartiene allo span delle colonne di (A) equivale a dire che il sistema (Ax=b) è compatibile.”

## 5️⃣ Dipendenza e indipendenza lineare
### 🔹 Dipendenza
I vettori $(v_1,\dots,v_n)$ sono **linearmente dipendenti** se esistono scalari **non tutti nulli** tali che:  
$a_1 v_1 + \dots + a_n v_n = 0$  
### 🔹 Indipendenza
Sono **linearmente indipendenti** se l’unica combinazione che dà zero è quella con **tutti i coefficienti nulli**.
👉 Frase da orale:
> “La linearità indipendenza garantisce l’unicità delle coordinate.”

### 🔹 Conseguenza importante
Se i vettori sono dipendenti, **uno di essi è combinazione lineare degli altri**.
## 6️⃣ Base di uno spazio vettoriale
### 🔹 Definizione
Un insieme $(B={v_1,\dots,v_n})$ è una **base** di $(V)$ se:
1. è linearmente indipendente
2. genera tutto (V)
👉 Frase da orale:
> “Una base è un insieme minimalmente generatore e massimalmente indipendente.”
## 7️⃣ Coordinate rispetto a una base
Dato $(v \in V)$, se $(B)$ è una base allora:  
$v = a_1 v_1 + \dots + a_n v_n$
con **coefficienti unici**.
👉 Frase chiave:
> “La rappresentazione rispetto a una base è unica.”
## 8️⃣ Dimensione

### 🔹 Definizione
La **dimensione** di uno spazio vettoriale è il **numero di elementi di una sua base**.
- $( \dim({0}) = 0 )$
- se $( \dim(V)=n )$, nessun insieme di più di $(n)$ vettori può essere indipendente
### 🔹 Proprietà fondamentali
Se $( \dim(V)=n )$:
- ogni insieme di $(n)$ vettori indipendenti è una base
- ogni insieme di $(n)$ generatori è una base
- ogni sottospazio $(W\subseteq V)$ ha $( \dim(W)\le n )$
## 9️⃣ Mini–domande da orale (QUESTE LE FANNO)
1. Perché lo span è un sottospazio?
2. Perché una base garantisce l’unicità delle coordinate?
3. Perché una retta passante per l’origine è un sottospazio?
4. Può esistere una base infinita?
5. Perché $(\dim({0})=0)$?
## 🎯 Cosa fare ORA
1. Scrivi **solo**:
    - definizione di spazio vettoriale
    - sottospazio    
    - combinazione lineare
    - base
    - dimensione
2. Prova a rispondere ad alta voce alle 5 domande finali.
Perfetto.  
Questa è una **lezione chiave per l’orale**: qui il prof capisce subito se “parli algebra” o se stai solo applicando algoritmi.

Stesso stile: **orale vero**, definizioni + frasi da dire + collegamenti.

---

# 🟦 LEZIONE 3 — TEOREMI SULLE BASI E DIMENSIONE

---

## 1️⃣ Insiemi massimali e minimalità (IDEA CONCETTUALE)

Prima dei teoremi, una **idea guida** (importantissima all’orale):

- una **base** è:
    
    - _minimalmente generatrice_
        
    - _massimalmente indipendente_
        

👉 Frase da orale:

> “La nozione di base sta al confine tra generazione e indipendenza.”

---

## 2️⃣ Teorema di esistenza delle basi

### 🔹 Enunciato

Ogni spazio vettoriale **finitamente generato** ammette almeno una **base**.

👉 Versione più pratica:

> “Se uno spazio vettoriale è generato da un insieme finito di vettori, allora esiste una base finita.”

---

### 🔹 Significato

- non è ovvio che esistano insiemi “buoni”
    
- il teorema garantisce che **possiamo sempre coordinatizzare lo spazio**
    

👉 Frase da orale:

> “Questo teorema garantisce che ogni spazio vettoriale di dimensione finita è isomorfo a (K^n).”

---

## 3️⃣ Teorema del completamento (o di scambio)

### 🔹 Enunciato

Sia (V) uno spazio vettoriale di dimensione (n).  
Sia (W={w_1,\dots,w_k}) un insieme di vettori **linearmente indipendenti** con (k \le n).  
Allora esistono (n-k) vettori tali che:  
[  
{w_1,\dots,w_k,\dots}  
]  
è una **base di (V)**.

---

### 🔹 Interpretazione

- ogni insieme indipendente “incompleto” può essere **completato a base**
    
- non stai mai “buttando via” indipendenza
    

👉 Frase da orale:

> “Ogni insieme linearmente indipendente può essere esteso a una base.”

---

## 4️⃣ Teorema di equicardinalità delle basi

### 🔹 Enunciato

Tutte le basi di uno stesso spazio vettoriale hanno lo **stesso numero di elementi**.

---

### 🔹 Conseguenza fondamentale

La **dimensione** è ben definita.

👉 Frase da orale:

> “Il numero di vettori di una base non dipende dalla base scelta.”

---

## 5️⃣ Dimensione: conseguenze operative (QUESTE LE CHIEDONO)

Sia ( \dim(V)=n ).

### 🔹 Proprietà

1. Ogni insieme di più di (n) vettori è **linearmente dipendente**
    
2. Ogni insieme di (n) vettori indipendenti è una base
    
3. Ogni insieme di (n) generatori è una base
    
4. Ogni sottospazio (W \subseteq V) ha:  
    [  
    \dim(W)\le \dim(V)  
    ]
    

---

### 🔹 Caso limite

[  
\dim({0}) = 0  
]

👉 Frase da orale:

> “Lo spazio nullo non ha direzioni libere.”

---

## 6️⃣ Sottospazi e dimensione

### 🔹 Teorema

Se (W\subseteq V) è un sottospazio e:  
[  
\dim(W)=\dim(V)  
]  
allora:  
[  
W = V  
]

👉 Frase da orale:

> “Un sottospazio che ha la stessa dimensione dello spazio coincide con lo spazio stesso.”

---

## 7️⃣ Collegamento con i sistemi lineari

Questo è **fondamentale** per l’orale:

- le **colonne** di una matrice:
    
    - generano l’immagine
        
- una base dell’immagine ⇔ colonne linearmente indipendenti
    
- rango ⇔ dimensione dell’immagine
    

👉 Frase jolly:

> “I teoremi sulle basi giustificano il concetto di rango.”

---

## 8️⃣ Mini–domande tipiche da orale

1. Perché tutte le basi hanno lo stesso numero di elementi?
    
2. Perché un insieme di (n+1) vettori in uno spazio di dimensione (n) è dipendente?
    
3. Si può completare **sempre** un insieme indipendente?
    
4. Perché la dimensione è un invariante?
    
5. Perché il teorema di esistenza delle basi non è banale?
    

---

## 🎯 Cosa fare ORA

1. Scrivi come appunti:
    
    - enunciato **breve** dei tre teoremi
        
    - 3 frasi da orale (quelle in grassetto)
        
2. Prova a spiegare ad alta voce:
    
    > “Perché la dimensione è ben definita?”
    

---

## 🔜 Prossimo passo

Ti propongo due strade (scegline una):

### 👉 **Lezione 4 — Applicazioni lineari, nucleo, immagine, rango**

_(è la parte più interrogata)_

oppure

### 👉 **Simulazione orale 1**

Io ti interrogo su:

- Lezione 1
    
- Lezione 2
    
- Lezione 3
    

come farebbe il prof (esercizio + teoria).

Dimmi tu 🔥
Perfetto.  
Questa è **la lezione più importante di tutto il corso**: se questa la domini, l’orale gira bene anche se inciampi altrove.

Stesso schema: **orale vero**, frasi da dire, collegamenti continui con esercizi.

---

# 🟦 LEZIONE 4 — APPLICAZIONI LINEARI, NUCLEO, IMMAGINE, RANGO

---

## 1️⃣ Applicazione lineare (DEFINIZIONE DA ORALE)

### 🔹 Definizione

Siano (V,W) spazi vettoriali su un campo (K).  
Una funzione (T: V \to W) è un’**applicazione lineare** se:

1. (T(v_1+v_2)=T(v_1)+T(v_2))
    
2. (T(\lambda v)=\lambda T(v))
    

per ogni (v_1,v_2\in V) e (\lambda\in K).

👉 Frase da orale:

> “Un’applicazione lineare preserva le operazioni di somma e prodotto per scalare.”

---

### 🔹 Endomorfismo

Se (V=W), (T) si chiama **endomorfismo**.

---

## 2️⃣ Nucleo e immagine

### 🔹 Nucleo

[  
\ker(T)={v\in V\mid T(v)=0}  
]

👉 Frase da orale:

> “Il nucleo misura quanto l’applicazione non è iniettiva.”

---

### 🔹 Immagine

[  
\mathrm{Im}(T)={T(v)\mid v\in V}  
]

👉 Frase da orale:

> “L’immagine misura quanto l’applicazione copre lo spazio di arrivo.”

---

### 🔹 Proprietà fondamentali

- (\ker(T)) è un **sottospazio** di (V)
    
- (\mathrm{Im}(T)) è un **sottospazio** di (W)
    

👉 Domanda tipica:

> _Perché il nucleo è un sottospazio?_  
> Risposta: contiene 0 ed è chiuso per combinazioni lineari.

---

## 3️⃣ Iniettività e suriettività

### 🔹 Iniettiva

[  
T \text{ è iniettiva } \iff \ker(T)={0}  
]

---

### 🔹 Suriettiva

[  
T \text{ è suriettiva } \iff \mathrm{Im}(T)=W  
]

👉 Frase jolly:

> “L’iniettività si legge sul nucleo, la suriettività sull’immagine.”

---

## 4️⃣ Immagine tramite una base (COLLEGAMENTO CHIAVE)

Sia ({v_1,\dots,v_n}) una base di (V). Allora:  
[  
\mathrm{Im}(T)=\mathrm{Span}(T(v_1),\dots,T(v_n))  
]

👉 Frase da orale:

> “L’immagine di un’applicazione lineare è generata dalle immagini dei vettori di una base.”

⚠️ Non è detto che (T(v_i)) siano indipendenti.

---

## 5️⃣ Rango

### 🔹 Definizione

Il **rango** di (T) è:  
[  
\mathrm{rg}(T)=\dim(\mathrm{Im}(T))  
]

---

## 6️⃣ Teorema della dimensione (o del rango)

### 🔹 Enunciato

Se (T: V \to W) è lineare e (V) è di dimensione finita:  
[  
\dim(V)=\dim(\ker(T))+\dim(\mathrm{Im}(T))  
]

👉 Frase da orale:

> “La dimensione si distribuisce tra nucleo e immagine.”

---

### 🔹 Conseguenze IMPORTANTI

- (T) è iniettiva ⇔ (\mathrm{rg}(T)=\dim(V))
    
- (T) è suriettiva ⇔ (\mathrm{rg}(T)=\dim(W))
    
- se (\dim(V)=\dim(W)):
    
    - iniettiva ⇔ suriettiva ⇔ isomorfismo
        

---

## 7️⃣ Isomorfismi

### 🔹 Definizione

Un’**isomorfismo** è un’applicazione lineare **invertibile**.

👉 Frase da orale:

> “Due spazi vettoriali isomorfi hanno la stessa struttura algebrica.”

---

### 🔹 Conseguenza fondamentale

Tutti gli spazi vettoriali di dimensione (n) su (K) sono isomorfi a (K^n).

---

## 8️⃣ Collegamento con le matrici

Scelte basi di (V) e (W), ogni applicazione lineare è rappresentata da una **matrice**.

👉 Frase da orale:

> “La matrice dipende dalla base, l’applicazione no.”

---

## 9️⃣ Mini–domande tipiche da orale

1. Perché il nucleo è un sottospazio?
    
2. Perché (\ker(T)={0}) implica iniettività?
    
3. Perché il rango non dipende dalla base?
    
4. Come si legge la suriettività su una matrice?
    
5. Perché (\dim(V)=\dim(\ker)+\dim(\mathrm{Im}))?
    

---

## 🎯 Cosa fare ORA

1. Scrivi:
    
    - definizione di applicazione lineare
        
    - definizione di nucleo, immagine, rango
        
    - enunciato del teorema della dimensione
        
2. Ripeti ad alta voce:
    
    > “Se (T:V\to W) è lineare allora…”
    

---

## 🔜 Prossimo passo

Ti consiglio di fare **Lezione 5 — Sistemi lineari, Gauss, struttura delle soluzioni**  
(perché ora hai _tutti_ gli strumenti concettuali).

Quando vuoi, partiamo 🚀
Perfetto.  
Questa è **la parte più “esercizio + teorema” dell’orale**.  
Qui devi saper fare i conti **ma soprattutto spiegare cosa stai facendo**.

Stesso formato: chiaro, strutturato, frasi da dire.

---

# 🟦 LEZIONE 5 — SISTEMI LINEARI, GAUSS, STRUTTURA DELLE SOLUZIONI, ROUCHÉ–CAPELLI

---

# 1️⃣ Sistema lineare

### 🔹 Definizione

Un **sistema lineare** di (m) equazioni in (n) incognite è un insieme di equazioni della forma:

[  
a_{i1}x_1 + \dots + a_{in}x_n = b_i  
]

che in forma matriciale si scrive:

[  
Ax = b  
]

dove:

- (A) è la matrice dei coefficienti (m \times n)
    
- (x) è il vettore delle incognite
    
- (b) è la colonna dei termini noti
    

👉 Frase da orale:

> “Un sistema lineare è la traduzione coordinata di un problema di combinazioni lineari.”

---

# 2️⃣ Sistema omogeneo

### 🔹 Definizione

È un sistema della forma:

[  
Ax = 0  
]

👉 Proprietà fondamentale:  
Le soluzioni formano un **sottospazio vettoriale** di (K^n).

👉 Domanda tipica:  
**Perché?**

Perché:

- contiene lo zero
    
- è chiuso per somma
    
- è chiuso per prodotto per scalare
    

---

# 3️⃣ Sistema non omogeneo

[  
Ax = b  
]

Le soluzioni **non** formano un sottospazio, ma un **sottospazio affine**.

👉 Struttura fondamentale:

Se (x_0) è una soluzione particolare, allora:

[  
\text{Soluzioni} = x_0 + \ker(A)  
]

👉 Frase da orale:

> “L’insieme delle soluzioni è un traslato del nucleo.”

---

# 4️⃣ Operazioni elementari e Gauss

Le operazioni di Gauss:

1. scambio di righe
    
2. moltiplicazione di una riga per uno scalare non nullo
    
3. somma di multipli di righe
    

👉 Proprietà:  
Non cambiano l’insieme delle soluzioni.

---

# 5️⃣ Matrice a scala e pivot

Una matrice è **a scala** se:

- ogni pivot è a destra del precedente
    
- sotto ogni pivot ci sono zeri
    

👉 I pivot determinano:

- il rango
    
- le variabili libere
    
- la struttura delle soluzioni
    

---

# 6️⃣ Rango di una matrice

### 🔹 Definizione

Il rango è:  
[  
\text{numero di pivot}  
]

oppure:  
[  
\dim(\text{Im}(A))  
]

---

# 7️⃣ Teorema di Rouché–Capelli

### 🔹 Enunciato

Il sistema (Ax=b) è compatibile  
**se e solo se**

[  
\text{rg}(A)=\text{rg}(A|b)  
]

👉 Frase da orale:

> “Il sistema è compatibile quando il termine noto appartiene allo span delle colonne.”

---

### 🔹 Unicità della soluzione

Se il sistema è compatibile e:

[  
\text{rg}(A)=n  
]

(numero incognite)

allora la soluzione è unica.

---

# 8️⃣ Dimensione dello spazio delle soluzioni

Se il sistema è compatibile e (A) ha rango (r):

[  
\dim(\text{Soluzioni}) = n - r  
]

👉 Frase chiave:

> “Il numero di gradi di libertà è dato dalle variabili libere.”

---

# 9️⃣ Struttura completa (questa la devi sapere fluida)

Per (Ax=b):

- Se (rg(A) \neq rg(A|b)) → nessuna soluzione
    
- Se (rg(A)=rg(A|b)=r):
    
    - Se (r=n) → unica soluzione
        
    - Se (r<n) → infinite soluzioni  
        [  
        x = x_0 + \ker(A)  
        ]
        

---

# 🔟 Collegamento con applicazioni lineari

Il sistema (Ax=b) equivale a:

[  
T(x)=b  
]

dove (T) è l’applicazione lineare associata alla matrice (A).

👉 Compatibilità ⇔ (b \in \mathrm{Im}(T))

---

# 1️⃣1️⃣ Mini–domande da orale (molto probabili)

1. Perché le soluzioni di un sistema omogeneo formano un sottospazio?
    
2. Perché le soluzioni di (Ax=b) sono un traslato del nucleo?
    
3. Come si legge la compatibilità sulla matrice?
    
4. Cosa rappresentano le variabili libere?
    
5. Perché il rango è il numero di pivot?
    

---

# 🎯 Schema mentale da usare all’esercizio

Quando ti dà un sistema:

1. Fai Gauss
    
2. Conti i pivot
    
3. Determini il rango
    
4. Applichi Rouché–Capelli
    
5. Scrivi la struttura delle soluzioni
    
6. Se serve, richiami:
    
    > “Per il teorema della dimensione…”
    

---

# 🔥 Punto cruciale

Se sai dire bene:

> “Le soluzioni sono (x_0 + \ker(A))”

hai fatto un salto di qualità enorme per l’orale.

---

## Prossimo passo

Ti consiglio:

### 👉 Lezione 6 — Matrici invertibili e criteri equivalenti

oppure

### 👉 Simulazione orale su applicazioni lineari + sistemi

Dimmi tu 💪
Perfetto.  
Questa è una lezione **molto amata agli orali** perché unisce:

- applicazioni lineari
    
- sistemi lineari
    
- rango
    
- determinante (che faremo dopo)
    

Se questa la sai bene, sembri solidissimo.

---

# 🟦 LEZIONE 6 — MATRICI INVERTIBILI E CRITERI EQUIVALENTI

---

# 1️⃣ Matrice invertibile

### 🔹 Definizione

Una matrice quadrata (A \in M_{n \times n}(K)) è **invertibile** se esiste una matrice (B) tale che:

[  
AB = BA = I  
]

dove (I) è la matrice identità.

La matrice (B) si chiama **inversa** di (A) e si indica con (A^{-1}).

---

### 🔹 Proprietà fondamentale

L’inversa è **unica**.

👉 Frase da orale:

> “Se una matrice è invertibile, la sua inversa è unica.”

---

# 2️⃣ Collegamento con applicazioni lineari

Ad una matrice (A) è associata un’applicazione lineare:

[  
L_A(x)=Ax  
]

Allora:

[  
A \text{ invertibile } \iff L_A \text{ invertibile}  
]

👉 Frase chiave:

> “L’invertibilità matriciale equivale all’invertibilità dell’applicazione lineare associata.”

---

# 3️⃣ Criteri equivalenti di invertibilità (QUESTA È LA PARTE DA SAPERE BENISSIMO)

Per (A \in M_{n\times n}(K)), sono equivalenti:

1. (A) è invertibile
    
2. (L_A) è invertibile
    
3. (L_A) è iniettiva
    
4. (L_A) è suriettiva
    
5. (\mathrm{rg}(A)=n)
    
6. Le colonne di (A) sono linearmente indipendenti
    
7. Le righe di (A) sono linearmente indipendenti
    
8. Il sistema omogeneo (Ax=0) ha unica soluzione
    
9. Per ogni (b), il sistema (Ax=b) ha unica soluzione
    
10. In una riduzione a scala, tutti i pivot sono non nulli
    

---

👉 Frase da orale IMPORTANTISSIMA:

> “L’invertibilità equivale ad avere rango massimo.”

---

# 4️⃣ Interpretazione geometrica

Se (A) è invertibile:

- non schiaccia dimensioni
    
- non perde informazione
    
- trasforma lo spazio in modo biiettivo
    

👉 Frase da orale:

> “Una matrice invertibile non annulla direzioni.”

---

# 5️⃣ Collegamento con il rango

Se (A) è (n\times n):

[  
\mathrm{rg}(A)=n \iff \ker(A)={0}  
]

Per il teorema della dimensione:

[  
n=\dim(\ker(A))+\mathrm{rg}(A)  
]

Quindi:

- se il nucleo è nullo → rango massimo
    
- se rango massimo → invertibile
    

---

# 6️⃣ Gruppo lineare

L’insieme delle matrici invertibili si chiama:

[  
GL_n(K)  
]

È un gruppo rispetto al prodotto.

---

# 7️⃣ Proprietà dell’inversa

Se (A,B) sono invertibili:

[  
(AB)^{-1}=B^{-1}A^{-1}  
]

[  
(A^{-1})^{-1}=A  
]

[  
(A^T)^{-1}=(A^{-1})^T  
]

---

# 8️⃣ Collegamento con i sistemi lineari

Se (A) è invertibile:

[  
Ax=b \Rightarrow x=A^{-1}b  
]

👉 Frase da orale:

> “Un sistema quadrato con matrice invertibile ha sempre unica soluzione.”

---

# 9️⃣ Mini–domande tipiche da orale

1. Perché iniettività e suriettività coincidono nel caso quadrato?
    
2. Perché rango massimo implica invertibilità?
    
3. Perché (Ax=0) ha unica soluzione se (A) è invertibile?
    
4. Cosa significa geometricamente avere pivot nulli?
    
5. Perché le righe indipendenti implicano colonne indipendenti?
    

---

# 🎯 Schema mentale da usare all’esercizio

Se ti dà una matrice quadrata:

1. Fai Gauss
    
2. Conti i pivot
    
3. Se tutti non nulli → invertibile
    
4. Se uno zero → non invertibile
    

E puoi dire:

> “Per i criteri equivalenti di invertibilità…”

---

# 🔥 Punto fortissimo per l’orale

Se dici fluido:

> “Per una matrice quadrata, invertibilità, rango massimo, indipendenza delle colonne e unicità delle soluzioni sono tutte condizioni equivalenti.”

il prof capisce che hai capito la struttura del corso.

---

## Prossimo passo

Ora viene la parte teorica più delicata:

### 👉 Lezione 7 — Determinante (proprietà, esistenza, significato)

oppure

### 👉 Simulazione orale completa su sistemi + invertibilità

Dimmi tu 💪
Perfetto.  
Adesso entriamo nella parte **più teorica e più pericolosa dell’orale**: il **determinante**.

Qui il prof può fare due cose:

- chiederti proprietà teoriche
    
- chiederti di collegarlo all’invertibilità
    

Se lo sai bene, fai un figurone.

---

# 🟦 LEZIONE 7 — DETERMINANTE: DEFINIZIONE, PROPRIETÀ, TEOREMI

---

# 1️⃣ Cos’è il determinante (IDEA CONCETTUALE)

Il **determinante** è una funzione:

[  
\det : M_{n\times n}(K) \to K  
]

che associa a ogni matrice quadrata uno scalare.

👉 Frase da orale:

> “Il determinante misura se le colonne di una matrice sono linearmente indipendenti.”

---

# 2️⃣ Definizione assiomatica

Il determinante è l’unica funzione che soddisfa:

### 🔹 (1) Multilinearità nelle righe

È lineare rispetto a ciascuna riga separatamente.

### 🔹 (2) Alternanza

Se due righe sono uguali → determinante zero.

### 🔹 (3) Normalizzazione

[  
\det(I)=1  
]

---

👉 Frase importante:

> “Il determinante è multilineare alternante e normalizzato.”

---

# 3️⃣ Proprietà fondamentali

Da queste proprietà si deduce:

### 🔹 Se una riga è nulla → det = 0

### 🔹 Scambio di due righe

Cambia segno.

### 🔹 Moltiplicazione di una riga per scalare (t)

Il determinante si moltiplica per (t).

### 🔹 Somma di multiplo di una riga a un’altra

Il determinante non cambia.

---

👉 Collegamento con Gauss:  
Possiamo calcolare il determinante tramite riduzione triangolare.

---

# 4️⃣ Calcolo tramite forma triangolare

Se (A) è triangolare:

[  
\det(A)= \text{prodotto degli elementi diagonali}  
]

Se abbiamo fatto scambi di righe:  
[  
\det(A)=(-1)^k \cdot (\text{prodotto diagonale})  
]

---

# 5️⃣ Teorema di Binet

### 🔹 Enunciato

[  
\det(AB)=\det(A)\det(B)  
]

👉 Frase da orale:

> “Il determinante trasforma il prodotto di matrici nel prodotto dei determinanti.”

---

# 6️⃣ Determinante e invertibilità (FONDAMENTALE)

[  
A \text{ è invertibile } \iff \det(A)\neq 0  
]

---

### 🔹 Perché?

Se (\det(A)=0):

- le righe sono linearmente dipendenti
    
- il rango è minore di (n)
    
- non è invertibile
    

Se (\det(A)\neq 0):

- rango massimo
    
- invertibile
    

👉 Frase potentissima da orale:

> “Il determinante è il criterio scalare dell’invertibilità.”

---

# 7️⃣ Formula dell’inversa

Se (A) è invertibile:

[  
A^{-1}=\frac{1}{\det(A)} \mathrm{Adj}(A)  
]

(dove Adj è la matrice aggiunta)

---

# 8️⃣ Teorema di Cramer

Per un sistema quadrato (Ax=b) con (\det(A)\neq 0):

[  
x_i=\frac{\det(A_i)}{\det(A)}  
]

dove (A_i) è la matrice con la colonna (i) sostituita da (b).

👉 Frase da orale:

> “Cramer fornisce una formula esplicita della soluzione quando la matrice è invertibile.”

---

# 9️⃣ Teorema degli Orlati (per il rango)

Il rango di una matrice è il massimo ordine di una sottomatrice con determinante non nullo.

👉 Frase da orale:

> “Il rango si può determinare cercando il massimo minore non nullo.”

---

# 🔟 Interpretazione geometrica (bella da dire)

In (\mathbb{R}^n):

- (|\det(A)|) misura il fattore di scala dei volumi
    
- segno → orientazione
    

👉 Frase elegante:

> “Il determinante misura la variazione di volume indotta dalla trasformazione lineare.”

---

# 1️⃣1️⃣ Mini–domande tipiche

1. Perché se due righe sono uguali il determinante è zero?
    
2. Perché det(AB)=det(A)det(B)?
    
3. Perché det ≠ 0 implica invertibilità?
    
4. Perché il determinante è multilineare?
    
5. Qual è il legame tra rango e minori?
    

---

# 🎯 Schema mentale per esercizio

Se ti dà una matrice:

1. Riduci a triangolare
    
2. Moltiplica diagonale
    
3. Aggiusta segni
    
4. Se det ≠ 0 → invertibile
    
5. Se det = 0 → rango < n
    

---

# 🔥 Punto decisivo per l’orale

Se dici fluido:

> “Il determinante è una funzione multilineare alternante che caratterizza l’invertibilità e misura la variazione di volume.”

sei a livello alto.

---

## Ultimo blocco del programma

Rimane:

### 👉 Lezione 8 — Autovalori, autovettori, diagonalizzazione

È l’ultima parte e può valere tanto all’orale.

Partiamo? 💪
Perfetto.  
Questa è l’**ultima grande parte teorica** del corso, e spesso è quella che il prof usa come “chiusura elegante” dell’orale.

Qui devi essere:

- chiaro sulle definizioni
    
- solido sui criteri
    
- preciso sulla differenza tra molteplicità algebrica e geometrica
    

Andiamo.

---

# 🟦 LEZIONE 8 — AUTOVALORI, AUTOVETTORI, DIAGONALIZZAZIONE

---

# 1️⃣ Autovalore e autovettore

### 🔹 Definizione

Sia (T: V \to V) un endomorfismo (oppure (A \in M_{n\times n}(K))).

Un numero (\lambda \in K) è un **autovalore** se esiste un vettore non nullo (v) tale che:

[  
T(v)=\lambda v  
]

oppure

[  
Av=\lambda v  
]

Il vettore (v\neq 0) si chiama **autovettore** associato a (\lambda).

---

👉 Frase da orale:

> “Un autovettore è una direzione che viene solo dilatata, non deviata.”

---

# 2️⃣ Interpretazione geometrica

Un autovettore è una direzione che:

- non cambia direzione
    
- viene solo moltiplicata per uno scalare
    

Se (\lambda=1) → direzione invariata  
Se (\lambda=0) → vettore mandato a zero

---

# 3️⃣ Autospazio

### 🔹 Definizione

L’**autospazio** associato a (\lambda) è:

[  
E_\lambda = \ker(A-\lambda I)  
]

È un **sottospazio vettoriale**.

---

👉 Frase da orale:

> “L’autospazio è il nucleo dell’operatore (A-\lambda I).”

---

# 4️⃣ Polinomio caratteristico

Per trovare gli autovalori:

[  
\det(A-\lambda I)=0  
]

Questa equazione è il **polinomio caratteristico**.

---

👉 Frase da orale:

> “Gli autovalori sono le radici del polinomio caratteristico.”

---

# 5️⃣ Molteplicità

### 🔹 Molteplicità algebrica

È la molteplicità della radice nel polinomio caratteristico.

### 🔹 Molteplicità geometrica

È:  
[  
\dim(E_\lambda)  
]

---

### 🔹 Relazione fondamentale

Per ogni autovalore:

[  
1 \le \text{molteplicità geometrica} \le \text{molteplicità algebrica}  
]

---

👉 Frase da orale:

> “La molteplicità geometrica non supera mai quella algebrica.”

---

# 6️⃣ Diagonalizzazione

### 🔹 Definizione

Una matrice (A) è **diagonalizzabile** se esiste una matrice invertibile (P) tale che:

[  
P^{-1}AP = D  
]

dove (D) è diagonale.

---

👉 Frase da orale:

> “Una matrice è diagonalizzabile se esiste una base composta da autovettori.”

---

# 7️⃣ Criterio di diagonalizzabilità

Una matrice (n\times n) è diagonalizzabile se e solo se:

- possiede (n) autovettori linearmente indipendenti
    

equivalentemente:

- la somma delle molteplicità geometriche è (n)
    

---

# 8️⃣ Caso importante

Se la matrice ha (n) autovalori distinti → è automaticamente diagonalizzabile.

---

# 9️⃣ Collegamento con dimensione e rango

Poiché:

[  
E_\lambda = \ker(A-\lambda I)  
]

la dimensione dell’autospazio si calcola usando:

- rango
    
- teorema della dimensione
    

---

# 🔟 Schema per esercizio tipico

1. Calcolo ( \det(A-\lambda I) )
    
2. Trovo le radici → autovalori
    
3. Calcolo ( \ker(A-\lambda I) )
    
4. Conto la dimensione degli autospazi
    
5. Verifico se la somma fa (n)
    

---

# 1️⃣1️⃣ Mini–domande tipiche da orale

1. Perché l’autospazio è un sottospazio?
    
2. Perché un autovettore non può essere nullo?
    
3. Quando una matrice è diagonalizzabile?
    
4. Perché autovalori distinti implicano diagonalizzabilità?
    
5. Che relazione c’è tra autospazi e nucleo?
    

---

# 🔥 Frase finale da esame

Se vuoi chiudere bene una risposta:

> “La diagonalizzazione equivale a trovare una base in cui la trasformazione agisce come semplice dilatazione lungo direzioni privilegiate.”

È una frase che piace moltissimo.

---

# 📅 Situazione attuale

Hai coperto:

- Geometria vettori
    
- Spazi vettoriali
    
- Basi e dimensione
    
- Applicazioni lineari
    
- Sistemi lineari
    
- Invertibilità
    
- Determinante
    
- Autovalori
    

Hai fatto **tutto il programma strutturale**.

---

Ora siamo a 12 febbraio.

Ti propongo una cosa seria:

### 🔴 Domani facciamo una SIMULAZIONE ORALE COMPLETA

(io faccio il prof, esercizio + teorema)

Oppure se vuoi possiamo:

- fare una **simulazione mirata sui punti deboli**
    
- oppure ripassare velocemente tutto con schema riassuntivo finale
    

Dimmi tu come vuoi chiudere la preparazione 💪
