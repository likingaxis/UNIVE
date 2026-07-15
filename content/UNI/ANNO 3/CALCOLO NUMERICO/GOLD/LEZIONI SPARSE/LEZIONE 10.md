#### Matrici irriducibili
Ripasso rapido su definizione di grafo
è un diagramma formato da un certo numero di nodi e da un certo numero di archi
un arco è una freccia che va da un nodo a un'altro in modo orientato
se il grafo possiede n nodi, essi vengono denotati con 1,..,n
l'arco che va da i a j viene denotato con la freccia che va da i a j
un cammino all'interno di un grafo è un percorso che parte da un nodo i e arriva ad un nodo j seguendo gli archi del grafo se il nodo di arrivo j coincide con il nodo di partenza i allora il cammino si chiama anche ciclo
- un grafo fortemente connesso se vale una delle seguenti 2 condizioni equivalenti
	- 1. per ogni coppia di nodi i e j esiste un cammino nel grafo che va da i a j
	- 2. esiste un ciclo nel grafo che tocca tutti i nodi
Ex: dimostrare l'equivalenza quindi che 1<=>2
![[Pasted image 20260715111953.png]]
il grafo a sinistra è fortemente connesso
il grafo a destra non è fortemente connesso
##### Definizione di grafo associato a una matrice
data una certa matrice A in C nxn il grafo associato ad A è il grafo così definito
- i nodi sono 1,2,...,n
- gli archi ovvero le frecce le frecce i->j t.c aij neq 0
def A i C nxn si dice irriducibile se il suo grafo associato è fortemente connesso
#### Localizzazione degli autovalori
C(z0,r)={z in C:modulo x-z0<=r}= cerchio in C di centro z0 in C e raggio r>=0
ricordiamo che il modulo z-z0 è la distanza tra z e z0
quindi denotiamo tutti gli elementi che stanno dentro il cerchio
![[Pasted image (9).png|378]]
Diamo ora una definizione
Data A in C nxn, i cerchi di gershgorin (G) di A sono i cerchi K1,..,Kn definiti nel modo seguente:
per ogni i da 1 a n 
Ki=C(aii,somma j=1 a n tranne i di modulo di aij) 
quindi C con centro aii e raggio la somma 
i cerchi K1,Kn si chiamano anche cerchi di G per riga di A
esistono anche i cerchi per colonna H1,..,Hn dove al posto di aver fissato i di aij fisso i e metto aji
#### Teorema 3.3 primo teorema di Gershgorin
Gli autovalori di una matrice A in C nxn stanno tutti nell'unione dei cerchi di gershgorin di A
questo si dice localizzazione, ho identificato uno spazio dove al suo interno di sono tutti gli autovalori
Dim
sia lambda un autovalore di A. Mostriamo che lambda appartiene ad almeno un cerchio di G di A
e quindi sta nell'unione dei cerchi
siccome lambda è autovalore esiste u!=0 autovettore corrispondende
cioè Au=lambdau
due vettori sono uguali quando Au=lambdau <=> Aui=lambdaui per ogni i che va da 1 a n <=>sommatoria che va da j=1 a n aij per uj=scalare che moltiplica un vettore lambda per ui per ogni i da 1 a n
scelgo l'indice i0 in {1,..,n} t.c ui0 è una componente di modulo massimo quindi modulo di ui0 è il massimo tra u1 u2,...,un tutti a modulo
per i=i0 la sommatoria di j che va da 1 a n di aij uj=lambdaui per ogni i che va da 1 a n
ci dice che quella con i0 è uguale a lambda ui0 => lambda-ai0i0 per ui0
abbiamo tirato fuori dalla sommatoria il termine con j=i0 questo uguale alla sommatoria di j che va da 1 a n di j!=i0 di ai0juj
=> sapendo che modulo di alfa beta= modulo alfa per modulo di beta per ogni alfa beta in C abbiamo che modulo di alfa-ai0i0 per modulo ui0 è uguale al moudlo della sommatoria
usiamo la disuguaglianza triangolare ovvero per ogni afa1 alfa n in C il modulo della sommatoria che va da k=1 a n di alfak è minore uguale di k=1 a n di modlo di alfak
questo quindi è <= di sommatoria di j che va da 1 a j per j!=i0 n del modulo di ai0j per modulo di uj
sapendo che il modulo di uj è minore uguale del modulo di ui0 
quindi mettiamo minore uguale e mettiamo ui0
portiamo fuori modulo di ui0 e metiamo la sommatoria
visto che il vettore u è diverso da zero possiamo vedere la scelta di modulo di ui0 come las celda del max ma il max è diverso da 0
quindi lo semplifichiamo 
in conclusione
modulo di lambda -ai0i0 è minore uguale della sommatoria che va da j=1 a n per j!=j0 di modulo di ai0j
ai0i0 sarebbe il centro di Ki0 la sommatoria invece è il raggio
il modulo di lambda-ai0i0 sarebbe la distanza di lambda ai0i0
quindi lambda dista dal centro per una quantità minore del raggio quindi lambda appartiene a Ki0
#### Teorema 3.4 secondo teorema di Gershgorin
supponiamo che l'unione di K cerchi di G di A sia disgiunta dall'unione degli altri n-k
alora
k autovalori di A stanno nella prima unione e n-k stanno nella seconda unione
Esempio 
poniamo dia vere n=3 per cui 2 cerchi sono uniti e uno è fuori
allora quello fuori ha 1 autovalore e quelli dentro ne hanno 2
#### Teorema 3.5 terzo teorema di Gershgorin(forte)
supponiamo che A in C nxn sia irriducibile allora i punti che stanno sul bordo di quei cerchi di Gershgorin a cui appartengono ma non sul bordo di tutti i cerchi non sono autovalori di A
spiega bene la cosa dei punti sul bordo che non ho ben capito
il prof ha fatto una rappresentazione di questo ma alla lavagna quindi se puoi scrivermi tu un esempio sarebbe ottimo
![[Pasted image (12).png]]
ho trovato questa foto me la faccio spiegare da chat gpt e poi tu la spieghi bene
Supponiamo n=3n=3n=3, quindi abbiamo tre cerchi:

K1,K2,K3.K_1,\quad K_2,\quad K_3.K1​,K2​,K3​.

Immagina questa situazione:

- K1K_1K1​ e K2K_2K2​ si intersecano;
- K3K_3K3​ è separato dagli altri;
- AAA è irriducibile.

Graficamente:

K1∩K2≠∅,K_1\cap K_2 \neq \varnothing,K1​∩K2​=∅,

ma

K3K_3K3​

è lontano.

Per il secondo teorema di Gershgorin, se K1∪K2K_1\cup K_2K1​∪K2​ è una componente separata contenente due cerchi, allora dentro quella regione ci sono due autovalori.
Dentro K3K_3K3​ c’è un autovalore.

Questo è il senso del disegno del prof:

- la regione formata da K1K_1K1​ e K2K_2K2​ contiene 222 autovalori;
- il cerchio K3K_3K3​ isolato contiene 111 autovalore.
Supponi che un punto zzz sia sul bordo di K1K_1K1​, ma non sul bordo di K2K_2K2​ e non sul bordo di K3K_3K3​.

Per esempio:

z∈∂K1z\in \partial K_1z∈∂K1​

ma

z∉∂K2,z∉∂K3.z\notin \partial K_2,\qquad z\notin \partial K_3.z∈/∂K2​,z∈/∂K3​.

Allora, se AAA è irriducibile, quel punto **non può essere un autovalore**.

Anche se sta nell’unione dei cerchi.
mmagina tre cerchi che si toccano in un punto rosso.

Tipo:

K1, K2, K3K_1,\ K_2,\ K_3K1​, K2​, K3​

e il punto rosso sta contemporaneamente sui bordi di tutti e tre:

z∈∂K1∩∂K2∩∂K3.z\in \partial K_1\cap \partial K_2\cap \partial K_3.z∈∂K1​∩∂K2​∩∂K3​.

Allora il terzo teorema **non esclude** che quel punto sia autovalore.

Attenzione: non dice che sicuramente è autovalore.

Dice solo:

potrebbe esserlo.\text{potrebbe esserlo.}potrebbe esserlo.

Perché soddisfa la condizione necessaria: se è sul bordo, è sul bordo di tutti.

Invece, se un punto sta sul bordo solo di K1K_1K1​ e K2K_2K2​, ma non di K3K_3K3​, allora non può essere autovalore.



il prof ha detto che si accontenta che sappiamo definire l'enunciato del teorema


#### Teorema 3.6 Terzo teorema di Gershgorin(debole)
supponiamo che A in C nxn sia irriducibile e sia B il bordo dell'unione dei cerchi
allora i punti di B che non stanno sul bordo di tutti i cerchi non sono autovalori di A:
in questo esempio qua sotto nessuno può essere un autovalore di A
![[Pasted image (13).png|312]]
- recap di come si definisce una matrice irriducibile
