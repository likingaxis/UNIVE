# Trascrizioni Filtrate (1:1 Parole del Docente, senza elementi di circostanza)

Questo documento contiene le trascrizioni ripulite delle lezioni di **Distributed Systems**.
Non si tratta di un riassunto accademico: le spiegazioni, gli esempi, le dimostrazioni e il ragionamento logico sono **1:1 nelle esatte parole pronunciate dal docente**, rimuovendo esclusivamente:
- Timestamp e interruzioni audio/video
- Codici e token di presenza (es. token Prodigy)
- Domande e verifiche tecniche sullo schermo/microfono ("can you see the screen", ecc.)
- Annunci di pause o informazioni burocratiche sul corso
- Balbettii, false partenze e rumore di trascrizione automatica

---

## Lezione 3: FIFO Link, Causalità e Logical / Vector Clocks

### 1. Introduzione e Obiettivo della Lezione
Today we will see the topic of logical time. Last time we have seen clock synchronization that is in physical time; today we will see that in systems that are asynchronous, you can have a certain concept of time, and this concept of time is called logical time.

Before going into logical time, we will finish the exercise that we started with the server, because its solution brings us to explain an important primitive: the First-In-First-Out link, the FIFO link.

---

### 2. The FIFO Point-to-Point Link Primitive
The FIFO links are important because they introduce, over the fair-loss link, the concept of order of messages that we have in our mind. Essentially, a link is FIFO if the order in which you send messages to someone is equal to the order that that someone will see in receiving the message. It means that if I send message $A$ and then message $B$ on a FIFO link, the receiver will see $A$ before $B$; you cannot see $B$ before $A$. This is impossible in a FIFO link.

A FIFO link is also a solution for the problem of the perfect point-to-point link. The perfect point-to-point link uses as assumption the fact that messages are unique. When we saw the code of the server, if you send twice the same message, the receiver does not receive the message twice, but just once. To fix this problem, we said that we need sequence numbers. The technique of sequence numbers does not only make messages unique, but it also automatically creates the possibility of ordering the messages according to the order sent by the sender, creating what is called a FIFO link.

#### Proprietà della primitiva FIFO Link
We build the FIFO link on top of the perfect point-to-point link. We assume to have a perfect link with the usual events: `send` and `deliver`. On top of this perfect link, we build our FIFO link.
The FIFO link has the three usual properties inherited from the perfect link:
1. **Reliable Delivery:** If a correct process $p$ sends $m$ to $q$, then $q$ eventually delivers $m$ (assuming $q$ is correct).
2. **No Duplication:** No message is delivered more than once.
3. **No Creation:** If a message $m$ is delivered, it was previously sent.

The new property is the **FIFO property** (FIFO ordering):
- **FIFO Order:** *If a process $p$ delivers $m$ before $m'$, then $m$ was sent before $m'$.*
If a process delivers message $A$ before message $B$ (delivers $A$ at time 1 and $B$ at time 2), then $A$ was sent before $B$. For any pair of messages that you deliver, the order in which you deliver is the same that was used by the sender.

Even if this property is stated only for a pair of messages, automatically it extends to a sequence of messages. If the sender sends $A, B, C, D$ in this order, then you will deliver $A, B, C, D$ in the exact same order. If you delivered in a different order (for instance $A, C, B, D$), then there is the pair $(C, B)$ that violates the property: you delivered $C$ before $B$, while the sender sent $B$ before $C$.

Remember that this is a link: a link exists only between two processes, a sender and a receiver. The link does not extend to a broadcast; broadcast is different.

---

### 3. Implementazione dell'Algoritmo FIFO Link
We implement the FIFO link on top of the perfect link:
- **Inizializzazione:**
  - `pending = {}`: a set of messages waiting to be delivered.
  - `sec = 0`: the sequence number used by the sender.
  - `deliver_sec = 0`: the delivery sequence number used by the receiver to order the events delivered to the upper layer.

- **Invio (`fifo_send(dest, m)`):**
  When there is an event to send a message $m$ to process $dest$:
  1. Call the perfect link: `pl_send(dest, [m, sec])`.
  2. Increase the sequence number: `sec = sec + 1`.

  *Importanza dell'atomicità dell'handler:*
  Notice that if the handler is not atomic, this algorithm does not work. If the handler is not atomic, there could be an interleaving where two messages are sent with the same sequence number (one handler is scheduled away before increasing `sec`, and another handler sends with the old `sec`). In our model, handler execution is atomic.

- **Ricezione dal Perfect Link (`pl_deliver(src, [m, s])`):**
  When the destination receives `[m, s]` from source $src$:
  - Add the message to the pending set: `pending = pending U {[m, s]}`.

- **Consegna al livello superiore (`fifo_deliver`):**
  This uses a guarded event (when the predicate is true, the handler triggers):
  - **Condizione:** *Exists $[m, s] \in pending$ such that $s == deliver\_sec$*.
  - **Azione:**
    1. Deliver message $m$ to the upper layer.
    2. Remove the message from pending: `pending = pending \ {[m, s]}`.
    3. Increment delivery sequence number: `deliver_sec = deliver_sec + 1`.

#### Gestione dei messaggi fuori ordine
Suppose the source sends $A$ with sequence 0 ($A_0$) and $B$ with sequence 1 ($B_1$). The underlying perfect link does not ensure ordering, so it is completely possible that $B_1$ arrives at the receiver before $A_0$.
When $B_1$ arrives, it is placed in `pending`. However, `deliver_sec` is 0. The predicate ($s == deliver\_sec$) is false for $B_1$ ($1 \neq 0$). So $B_1$ waits in the pending set.
How much time can a message wait in pending? It is unbounded: it will wait until $A_0$ arrives.
When $A_0$ arrives, it is added to `pending`. Now the predicate is true for $A_0$ ($0 == 0$). The receiver delivers $A_0$, increments `deliver_sec` to 1, and now the predicate becomes true for $B_1$. $B_1$ is delivered.

#### Perché i sequence number devono essere strettamente monotoni?
If you build the algorithm without increasing the sequence number strictly monotonically, you could have two different messages with the same sequence number. If two messages have the same sequence number, the receiver cannot decide their order. Therefore, strict monotonicity is required.

---

### 4. Dimostrazione Formale per Contraddizione della Proprietà FIFO
We prove by contradiction:
- **Assunzione per assurdo:** Suppose the destination delivers messages in reverse order: it delivers $B$ and then $A$, but $A$ was sent before $B$.
- Because $A$ was sent before $B$, and the sender strictly increments sequence numbers on each send, the timestamp (sequence number) of $A$ is strictly less than the timestamp of $B$:
  $$ts(A) < ts(B)$$
- Let $t$ be the instant at which the destination delivers $B$.
  By definition of the delivery handler, a process delivers $B$ only when:
  $$deliver\_sec == ts(B)$$
- Since `deliver_sec` starts at 0 and is strictly incremented by 1 each time a message is delivered, if `deliver_sec` reached $ts(B)$, and $ts(A) < ts(B)$, there must have been an earlier instant where:
  $$deliver\_sec == ts(A)$$
- In the algorithm, the only way to advance `deliver_sec` from $ts(A)$ to $ts(A) + 1$ is by executing the handler that delivers the message with sequence number $ts(A)$.
- Because sequence numbers are unique, the only message with sequence number $ts(A)$ is message $A$.
- Therefore, message $A$ must have been delivered before `deliver_sec` reached $ts(B)$.
- This contradicts the assumption that $B$ was delivered before $A$. Thus, the FIFO property always holds.

#### Domanda: cosa succede se un processo crasha e si riavvia?
In our current failure model (fail-stop), when a process crashes, it crashes forever; it cannot recover. If you wanted to support crash-recovery, when a process recovers it could query the receiver for the last delivered sequence number and resume from there.

---

### 5. Il bisogno di Tempo Logico e Causalità (L'esempio della chat distribuita)
The FIFO link provides the simplest kind of ordering, but FIFO ordering is only between one sender and one receiver. It does not solve ordering when multiple processes interact.

#### Lo scenario della Chat Distribuita (Trading Azionario)
Consider a mission-critical distributed chat without a central server (so there is no single point of failure). Because the system is asynchronous, we cannot synchronize physical clocks, nor can we use physical timestamps.

Imagine three people chatting: Alice, Mike, and Bob (with his Supervisor $S$):
1. Alice asks: *"If Apple stock drops, what should we do?"*
2. Mike replies to Alice: *"If Apple stock drops, sell Apple and buy Amazon."*
3. Alice asks: *"Who will do it?"*
4. Bob's Supervisor writes: *"Bob will do it."*

In a distributed asynchronous execution:
- Mike generates his answer because he received Alice's first question.
- Due to asynchrony on communication links, Mike's message reaches Bob quickly: Bob sees *"Sell Apple and buy Amazon"*.
- Next, the Supervisor's message reaches Bob: *"Bob will do it"*.
- Alice's initial question *"What if...?"* is delayed on the network and has not reached Bob yet!

From Bob's local view, he sees:
1. *"Sell Apple and buy Amazon."*
2. *"Bob will do it."*

Bob thinks this is an immediate command and sells Apple stock, causing a massive financial mistake. Later, Alice's message arrives, and Bob realizes it was only a hypothetical discussion.

Notice: FIFO links do not prevent this bug! Every individual link could be perfectly FIFO. The problem is that Mike's message was causally generated by Alice's message, but Bob received Mike's message before the message that caused it.
To avoid this problem, we need a mechanism where Bob, upon receiving Mike's message, knows that something happened before it and waits. We need to capture **causality**.

#### Ordine Totale vs. Ordine Causale
Total order (global order) means all processes deliver all messages in the exact same order.
Total order is orthogonal to causal order!
You could have a system with total order that delivers all messages in the exact reverse of the causal order: as long as all processes see the same order, it is a total order, but it completely violates causality.

---

### 6. La Relazione "Happens-Before" di Lamport ($\to$)
Leslie Lamport defined causality in asynchronous systems through the **Happens-Before** relation (denoted by $\to$).
It is based on two fundamental observations:
1. **Local Ordering:** If events $e_1$ and $e_2$ occur on the same process, and $e_1$ occurs before $e_2$, then $e_1 \to e_2$.
2. **Send/Receive Causality:** If event $e_1$ is the sending of a message $m$, and event $e_2$ is the receipt/delivery of that same message $m$, then $e_1 \to e_2$ (you cannot receive a message before it was sent).
3. **Transitivity:** If $e_1 \to e_2$ and $e_2 \to e_3$, then $e_1 \to e_3$.

#### Eventi Concorrenti ($e \parallel e'$)
The happens-before relation is a **partial order** (a poset, partially ordered set), not a total order.
If neither $e \to e'$ nor $e' \to e$, then $e$ and $e'$ are **concurrent** ($e \parallel e'$).
- **Significato intuitivo:** Two events are concurrent if they do not know about each other. There is no chain of messages or local events connecting them. In an asynchronous system, no one can tell which of the two happened "first" in physical time; their execution order is completely indistinguishable.
- **Regola:** Two events occurring on the same process can *never* be concurrent, because on the same physical entity one event locally precedes the other.

---

### 7. Lamport Scalar Clocks (Logical Clocks)
Lamport designed a simple algorithm to assign a timestamp $L(e) \in \mathbb{N}$ to every event $e$.

#### Le Regole di Aggiornamento:
Each process $p_i$ maintains an integer counter $L_i$, initialized to 0.
1. **Regola Locale:** Before generating an event (internal event or send event), process $p_i$ increments its clock:
   $$L_i = L_i + 1$$
   The event $e$ receives timestamp $L(e) = L_i$.
   When sending a message $m$, process $p_i$ attaches $L(e)$ to the message: $(m, L(e))$.
2. **Regola di Ricezione:** When process $p_j$ receives message $(m, L_{msg})$, it updates its clock taking the maximum and adding 1:
   $$L_j = \max(L_j, L_{msg}) + 1$$
   The receive event receives this updated timestamp.

#### Proprietà Fondamentale:
$$\text{If } e \to e' \implies L(e) < L(e')$$
- **Dimostrazione:** If $e \to e'$, there is a directed path connecting $e$ to $e'$ in the space-time diagram. On every step along this path (whether a local step on the same process via Rule 1, or a message transmission via Rule 2), the logical clock increases by at least 1. Therefore, $L(e) < L(e')$.

#### Limite fondamentale del Logical Clock Scalare (Mancanza della doppia implicazione):
The reverse does **not** hold:
$$L(e) < L(e') \;\not\implies\; e \to e'$$
If we look at two events and $L(e) < L(e')$, we cannot conclude that $e$ happened before $e'$. They could be concurrent events that just happened to receive different numbers. Scalar clocks cannot detect concurrency.

---

### 8. Vector Clocks (Mattern & Fidge)
To obtain the double implication:
$$V(e) < V(e') \iff e \to e'$$
Mattern and Fidge introduced **Vector Clocks**.

#### L'intuizione della Storia degli Eventi
To capture causality completely, a single number is insufficient. An event is causally related to another if it knows about the other event.
Imagine that each process maintains an array of lists: for each process $p_k$, it maintains the list of all events generated by $p_k$ that are known to the current process.
When an event occurs locally, you append it to your own list. When you receive a message, you take the union of the lists.
Since events on each process occur in sequential order, instead of storing the full list of events, you only need to store the **number of events** (the length of the list). That is exactly a Vector Clock: an array of $N$ integers (where $N$ is the total number of processes in the system).

#### Regole dei Vector Clocks:
Each process $p_i$ maintains a vector $V_i[1 \dots N]$, initialized to all zeros: $[0, 0, \dots, 0]$.
1. **Evento locale o invio:**
   Process $p_i$ increments its own entry:
   $$V_i[i] = V_i[i] + 1$$
   The event is timestamped with $V_i$. If sending a message, $V_i$ is attached to the message.
2. **Ricezione di un messaggio con vettore $V_{msg}$:**
   When $p_i$ receives $(m, V_{msg})$:
   - For all $k \in \{1 \dots N\}$: $V_i[k] = \max(V_i[k], V_{msg}[k])$
   - Then increment its own component: $V_i[i] = V_i[i] + 1$

#### Regola di Confronto tra Vettori:
- $V \le V' \iff \forall k \in \{1 \dots N\}, V[k] \le V'[k]$
- $V < V' \iff V \le V' \text{ and } \exists k \text{ such that } V[k] < V'[k]$
- **Eventi Concorrenti:** If neither $V(e) \le V(e')$ nor $V(e') \le V(e)$ (meaning some components are greater in $V$ and others are greater in $V'$), the vectors are **not comparable**. This proves that the events are concurrent:
  $$e \parallel e' \iff V(e) \text{ and } V(e') \text{ are not comparable}$$

---

### 9. Esercizio d'Esame sui Vector Clocks (Appello di Settembre)
**Testo:**
Consider a message passing system of 4 processes ($p_1, p_2, p_3, p_4$) communicating via perfect point-to-point links. Vector clocks have 4 components $[V[1], V[2], V[3], V[4]]$.
You are debugging process $p_1$ by sniffing packets on its network interface card:
- At time $t_0$, a message exits $p_1$'s network card with vector timestamp:
  $$[1, 0, 0, 0]$$
- Later, at time $t_1$, a message enters $p_1$'s network card with vector timestamp:
  $$[1, 2, 3, 1]$$

**Domanda 1: Disegnare un'esecuzione che giustifichi questi vettori. Tale esecuzione è unica?**
- **Analisi dei componenti del messaggio in ingresso $[1, 2, 3, 1]$:**
  - $p_1$ ha generato 1 evento (il messaggio iniziale inviato).
  - $p_2$ ha generato 2 eventi.
  - $p_3$ ha generato 3 eventi.
  - $p_4$ ha generato 1 evento.
- Il messaggio ricevuto da $p_1$ deve provenire da uno dei processi (ad esempio $p_3$), e la catena di messaggi deve aver propagato la conoscenza degli eventi di tutti e 4 i processi.
- **Unicità:** L'esecuzione **non è unica**. È possibile variare l'ordine o la sequenza dei messaggi intermedi tra $p_2, p_3, p_4$ preservando gli stessi conteggi finali nei vettori.

**Domanda 2: Può esistere un'esecuzione che giustifichi questo vettore in cui almeno un processo non invia alcun messaggio?**
- **Risposta:** **No, non è possibile.**
  Se un processo non inviasse alcun messaggio, nessun altro processo nel sistema potrebbe mai conoscere i suoi eventi. Di conseguenza, la componente corrispondente a quel processo nel messaggio ricevuto da $p_1$ dovrebbe essere 0.
  Poiché nel vettore finale $[1, 2, 3, 1]$ tutte le componenti sono strettamente maggiori di zero ($> 0$), ogni singolo processo deve necessariamente aver inviato almeno un messaggio per comunicare i propri eventi.

---
---

## Lezione 4: Lamport Mutual Exclusion e Failure Detectors

### 1. Il Problema della Mutua Esclusione Distribuita
The mutual exclusion problem consists in sharing a resource (called the **Critical Section**, CS) among distributed processes such that only one process at a time can access it.

#### Eventi dell'Astrazione:
- `Request`: generated by the upper layer to request access to the critical section.
- `Grant`: issued by the mutual exclusion primitive to inform the process that it is free to enter the critical section.
- `Release`: issued by the process when it finishes using the resource to let others enter.

#### Proprietà Fondamentali:
1. **Safety (Mutual Exclusion):** At any time $t$, at most one process is inside the critical section.
2. **Liveness (Deadlock-freedom / No starvation):** If a process requests access to the critical section, it eventually enters.
3. **Fairness:** If the request of process $p$ happens-before the request of process $q$ ($req_p \to req_q$), then $q$ cannot enter the critical section before $p$.

---

### 2. L'Algoritmo di Mutua Esclusione di Lamport
Lamport solved this problem using logical clocks to create a **total order** of requests.
To break ties when two logical clocks are equal ($L(e) = L(e')$), we use the unique process identifiers:
$$(L(e), i) < (L(e'), j) \iff L(e) < L(e') \;\text{or}\; (L(e) == L(e') \;\text{and}\; i < j)$$

#### Assunzioni:
- Reliable point-to-point channels with FIFO ordering.
- No process crashes (correct processes).

#### Funzionamento dell'Algoritmo:
Each process maintains a local queue `request_queue` of pending requests, ordered by $(L, id)$.
1. **Richiesta (`Request`):**
   When process $p_i$ wants to enter the critical section:
   - It increments its local logical clock $L_i$.
   - It places its own request $(L_i, i)$ into its local `request_queue`.
   - It sends a message `REQUEST(L_i, i)` to all other processes in the system.
2. **Ricezione di una `REQUEST`:**
   When process $p_j$ receives `REQUEST(L_i, i)`:
   - It updates its logical clock $\max(L_j, L_i) + 1$.
   - It inserts $(L_i, i)$ into its local `request_queue`.
   - It sends an acknowledgement `REPLY` (or timestamped message) back to $p_i$.
3. **Ingresso nella Critical Section (`Grant`):**
   Process $p_i$ is granted access to the critical section if and only if both conditions hold:
   - **Condizione 1:** Its own request $(L_i, i)$ is at the head of its local `request_queue` (it has the lowest timestamp among all known requests).
   - **Condizione 2:** Process $p_i$ has received a message (either a `REPLY` or another request) from **every other process** with a timestamp greater than $(L_i, i)$.
   *Perché serve la Condizione 2?* Because channels are FIFO, once $p_i$ receives a message from process $p_j$ with a timestamp greater than $(L_i, i)$, $p_i$ is guaranteed that $p_j$ will never send any future request with a timestamp smaller than $(L_i, i)$.
4. **Rilascio (`Release`):**
   When $p_i$ exits the critical section:
   - It removes its own request from its local queue.
   - It broadcasts `RELEASE(L_i, i)` to all other processes.
   - Upon receiving `RELEASE`, every process removes $p_i$'s request from its local queue.

---

### 3. Introduzione ai Failure Detectors
Lamport's mutual exclusion algorithm assumed processes never crash. In real distributed systems, processes crash. This motivates the study of **Failure Detectors**.
A Failure Detector is a distributed oracle/primitive that monitors processes and outputs a list of processes suspected of having crashed.

#### Modelli di Monitoraggio e Complessità dei Messaggi:
1. **Pattern Request-Reply (Ping-Ack):**
   Every monitoring round, a process sends a ping to all $N$ processes and waits for replies.
   - Messages sent: $N \times N = N^2$ pings, plus $N^2$ replies $\implies 2N^2$ messages per round.
2. **Pattern Heartbeat ("I am alive"):**
   Instead of asking for replies, every process periodically broadcasts an "I am alive" heartbeat message.
   If a process remains silent for a given threshold of time, others suspect it.
   - Messages sent: $N^2$ messages per round.
   - This cuts message complexity in half!

#### Il ruolo del silenzio nei sistemi sincroni vs. asincroni:
As Nicola Santoro notes in his book:
- In a **synchronous system**, *silence conveys information*. If a process does not send a message within the known bound $\Delta + \Phi$, we know with certainty that it has failed.
- In an **asynchronous system**, *silence conveys nothing*. You cannot distinguish whether a process is dead or simply running very slowly / network delay is high.

#### Proprietà dei Failure Detectors:
A failure detector is characterized by two orthogonal properties:
1. **Completeness:** Relates to detecting actual failures.
   - *Strong Completeness:* Eventually, every process that crashes is permanently suspected by every correct process.
2. **Accuracy:** Relates to avoiding false suspicions (mistakes).
   - *Strong Accuracy:* No correct process is ever suspected.
   - *Weak Accuracy:* There exists at least one correct process that is never suspected.
   - *Eventual Strong Accuracy ($\diamond \mathcal{P}$):* Eventually, after a stabilization time, no correct process is suspected.

A **Perfect Failure Detector ($\mathcal{P}$)** satisfies both **Strong Completeness** and **Strong Accuracy**. It can be implemented in synchronous systems with timeouts, but cannot be implemented in purely asynchronous systems due to the FLP impossibility result.

---
---

# Lezione 6: Eventually Perfect Failure Detector ($\diamond \mathcal{P}$), Leader Election ($\Omega$) ed Esercizi d'Esame

Questo documento contiene la trascrizione filtrata e pulita della Lezione 6 di **Distributed Systems**.
Non si tratta di un riassunto universitario: le spiegazioni, il ragionamento logico, le formule, gli algoritmi e gli esercizi svolti sono riportati **1:1 nelle esatte parole pronunciate dal docente**, rimuovendo esclusivamente gli elementi di circostanza (verifiche audio/video, pause, token di presenza ed esitazioni del parlato).

---

## 1. Dal Sistema Sincrono al Sistema Parzialmente (Eventualmente) Sincrono

### Recap: Il Perfect Failure Detector ($\mathcal{P}$)
Last time we have seen the perfect failure detector $\mathcal{P}$, and the perfect failure detector is a module that we can construct in a synchronous system and allows us to detect failures in a complete way—that means to detect everyone that fails—and precise/accurate—that means to not detect as failed someone that is not dead.

However, the system in which we have to work is not always synchronous. We have already seen that in an asynchronous system, creating a failure detector is impossible (due to the FLP impossibility result).

### La domanda aperta: Cosa possiamo fare nei sistemi parzialmente sincroni?
And so now the question that remains open is: what can we do in a system that is partially synchronous?
Let us remember: partially synchronous is equivalent to eventually synchronous.
It turns out that in this kind of system, we are able to build something that behaves as a perfect failure detector when the system stabilizes.

When the system stabilizes, I mean when the eventually synchronous system reaches the synchrony point.
Let us recall the definition of an eventually synchronous system:
- It is a system in which we have a certain delay, and initially the delay can be unbounded (there can be an asynchronous period).
- Then, there is a time $T$ after which the system becomes synchronous, and the delays are always below a certain bound $B$.

### I due problemi fondamentali
What are the problems?
1. **Prima del tempo $T$:** Since the system could be asynchronous, we have no way of creating a failure detector. So whatever we build in this time period will behave in a wrong way, and that is something we have to accept; we cannot change it.
2. **Dopo il tempo $T$:** Even when we are in the synchronous part of our system, there is a problem: the bound $B$ is unknown! Why is it unknown? Because the definition of an eventually synchronous system says that there exists a time after which the system becomes synchronous, but it does not specify a bound on the delay of the channel.

We will see that we can still solve this. We can build something that after a certain time $T_{algo}$ (which is not necessarily the same time $T$ of the system) will behave as a perfect failure detector.
What we will build is called the **Eventually Perfect Failure Detector**, denoted by $\diamond \mathcal{P}$.

---

## 2. Astrazione e Proprietà dell'Eventually Perfect Failure Detector ($\diamond \mathcal{P}$)

### Il simbolo $\diamond$ e il concetto di Sospetto
The diamond here—this is the symbol $\diamond \mathcal{P}$, a square diamond—in temporal logic means *eventually*. So it is $\diamond \mathcal{P}$ because it is *eventually perfect*.

What we do to build this kind of failure detector is to trade off the notion of perfect detection of a crash:
- With the perfect failure detector $\mathcal{P}$, we have the perfect detection of a crash: when someone crashes and the perfect failure detector says detected, we know that it is dead forever.
- In an eventually synchronous system, we need the concept of **suspicion**: that is, we suspect that someone has crashed, and this suspicion will change. I can suspect process $p_1$ and say that process $p_1$ crashed because the system is asynchronous and delays are unbounded; and then after a while, the system synchronizes, I start receiving packets from $p_1$, and I say: *"Oh no, $p_1$ is actually alive!"* And what I have to do is to **restore** $p_1$, to say that $p_1$ is not dead, it is alive.

### Specifica Formale degli Eventi di $\diamond \mathcal{P}$
In our usual box, this module provides two events:
- `Suspect(p_i)`: notifies that process $p_i$ is suspected to have crashed.
- `Restore(p_i)`: notifies that process $p_i$ is not suspected anymore (it notifies that probably you made a mistake and the process is indeed alive).

Remember: both events are indications (they come from the lower layer to the upper layer). The failure detector never receives anything from the upper layer; it only gives information, it does not take information from the upper layer.
The semantic of `Suspect` is: we do not know for sure if it has crashed or not, because if we are in the asynchrony period of the eventually synchronous system, we cannot know.

#### Chiarimento fondamentale sul modello di guasto (Crash vs Crash-Recovery)
Just to clarify something that I told you when we have seen the classes of failures (crash and Byzantine): we do not assume that processes recover. Never.
This `Suspect` and `Restore` means just that the failure detector was wrong; it does not mean that the process crashed and then came alive again!
In our model, when someone crashes, it crashes forever. (On the textbook there is an entire section on crash-recovery systems, but we do not cover crash-recovery).

### Le Proprietà di $\diamond \mathcal{P}$
Let us look at the two formal properties of the eventually perfect failure detector:

1. **Strong Completeness:**
   $$\text{Eventually, every process that crashes is permanently suspected by every correct process.}$$
   This is exactly the same completeness property of the perfect failure detector. It tells us that if someone dies, sooner or later you will permanently suspect it. Permanently suspected means that if $p_2$ dies and $p_1$ is correct, there will be a time after which $p_1$ says *"I suspect $p_2$"* and never changes its mind.

2. **Eventual Strong Accuracy:**
   $$\text{Eventually, no correct process is suspected by any correct process.}$$
   This property is radically different from the accuracy of the perfect failure detector. We may have that in finite time, process $p_3$ suspects $p_1$ even if $p_1$ is alive. However, this property tells us that eventually, if $p_1$ is correct, $p_3$ has to change its mind and say: *"No, I restore $p_1$, $p_1$ is correct"*, and it must never suspect $p_1$ again.

#### Natura delle proprietà: Safety vs Liveness
Which one of these properties is a safety property?
Neither! **They are both liveness properties.**
Why? Because you cannot violate them in finite time:
- To violate Strong Completeness, you would have to fail to suspect a crashed process *forever*. You cannot violate this in finite time.
- To violate Eventual Strong Accuracy, you would have to suspect a correct process *forever*. In any finite time, if a correct process is suspected, the system could still restore it in the future. You cannot exhibit a finite execution trace that violates it.
Therefore, both properties are liveness properties.

### Comportamento e Stabilizzazione dell'Insieme `suspected`
A process can be suspected a finite number of times: you can suspect, restore, suspect, restore, and so on.
If you look at these two properties together, they imply that the set of suspected processes—which on a single process changes, oscillates, grows, and shrinks—eventually stabilizes on all correct processes to the exact same set!

After some time, if $p_1$ is correct and $p_5$ is correct:
- Any correct process eventually disappears forever from the suspected set of every correct process (by Eventual Strong Accuracy).
- Any crashed process eventually appears forever and is never restored in the suspected set of all correct processes (by Strong Completeness).

So the suspected sets of all correct processes must stabilize to the same set:
$$\text{Eventually, } suspected_1 = suspected_5 = \text{set of all crashed processes}$$

By "stabilize", I mean that an algorithm can change its mind a finite number of times, but after a while it fixes on a certain suspected set and stays there forever.
Notice that the stabilization time of the algorithm ($T_{algo}$) is different from the stabilization time of the eventually synchronous system ($T$). In general, they are different times.

---

## 3. Algoritmo dell'Eventually Perfect Failure Detector ($\diamond \mathcal{P}$) con Timeout Adattivo

### La Strategia del Ping-Pong e il problema del ritardo sconosciuto
What is the strategy of this failure detector?
This is still a failure detector, so the only strategy we have is **ping-pong** (request-reply): you ping someone, you wait for a timeout $\Delta$, and if you receive the response within $\Delta$, you say it is alive; if you do not receive it within $\Delta$, you suspect it.

The problem is: after time $T$, the delays are bounded by an unknown bound $B$. How do we pick $\Delta$?
If we pick a $\Delta$ that is below the real bound (for instance, we guess $\Delta = 5$ seconds, but the real round-trip delay is $10$ seconds), we will timeout and suspect correct processes.

How do we recognize that our timeout is too low?
**You get a pong after the timeout expires!**
When you receive a reply from a process that you already suspected, you know for sure that your $\Delta$ was too low.
And what is the only thing you have to do? **You increase it!**

How many times can you be wrong? A finite number of times!
Because if you increase by $\Delta$ (from 5 to 6, then to 7, etc.), even if you do not know the real threshold $B$, after a finite number of increases you will reach and exceed $B$. Once your timeout exceeds the bound, you will never falsely suspect that correct process again.
We do not have optimal performance, but we achieve correctness.

### Pseudocodice Completo dell'Algoritmo

```
Implements:
    EventuallyPerfectFailureDetector, instance diamond_p

State:
    alive: set of process IDs, initially Pi (all processes)
    suspected: set of process IDs, initially empty
    delay: duration, initially Delta

upon event < Init > do:
    start timer (delay)

upon event < Timeout > do:
    // Check if any process was both alive and suspected (timeout was too small!)
    if (alive intersect suspected) != empty then:
        delay = delay + Delta

    for each p in Pi do:
        if p not in alive and p not in suspected then:
            suspected = suspected U {p}
            trigger < diamond_p, Suspect | p >
        else if p in alive and p in suspected then:
            suspected = suspected \ {p}
            trigger < diamond_p, Restore | p >

    for each p in Pi do:
        trigger < pl, Send | p, [PING] >

    alive = empty
    start timer (delay)

upon event < pl, Deliver | src, [PING] > do:
    trigger < pl, Send | src, [PONG] >

upon event < pl, Deliver | src, [PONG] > do:
    alive = alive U {src}
```

### Walkthrough dell'Algoritmo
Let us trace an execution between process $p_1$ and process $p_2$, where $p_2$ is correct:
1. At the beginning, `alive` is $\Pi$, `suspected` is empty, and `delay` is $\Delta$.
2. Process $p_1$ times out, resets `alive = empty`, sends a PING to $p_2$, and restarts the timer with `delay`.
3. If we are in the asynchronous period, or if our guessed $\Delta$ was less than the actual channel delay, $p_2$'s PONG takes longer than $\Delta$ to arrive.
4. When $p_1$ times out again, $p_2 \notin alive$ and $p_2 \notin suspected$. Process $p_1$ puts $p_2$ into `suspected` and triggers `< diamond_p, Suspect | p_2 >`.
5. Process $p_1$ sends a new PING and restarts the timer.
6. Now, the delayed PONG from $p_2$ arrives! Process $p_1$ puts $p_2$ into `alive`.
7. At the next timeout, process $p_1$ checks the condition: $p_2 \in alive \land p_2 \in suspected$.
   - This means $p_1$ suspected $p_2$, but $p_2$ was actually alive!
   - Process $p_1$ increments its timeout: `delay = delay + Delta`.
   - Process $p_1$ removes $p_2$ from `suspected`: `suspected = suspected \ {p_2}`.
   - Process $p_1$ triggers `< diamond_p, Restore | p_2 >` to tell the upper layer: *"Restore $p_2$, I made a mistake."*

### Domanda: Il delay può crescere all'infinito?
Can I bound the delay that the algorithm will reach?
**No, I cannot.** Because before time $T$, when the system is asynchronous, delays are unbounded. Whatever delay I choose, the adversary can delay messages longer, forcing me to increase `delay` again and again. It can trespass any threshold (e.g. 100 seconds, 1 hour).
However, the delay **cannot grow up to infinity**, because there is a time $T$ after which the system synchronizes. Once the system becomes synchronous, delays stop growing, and after a finite number of increases, `delay` exceeds the maximum round-trip time and never increases again.

### Dimostrazione Formale di Correttezza

#### 1. Strong Completeness
$$\text{Eventually, every process that crashes is permanently suspected by every correct process.}$$
The proof is trivial:
- If a process crashes, it will stop sending messages.
- A faulty process can send only a finite number of messages before crashing.
- Therefore, after a finite time, that process will never again appear in the `alive` set of any correct process.
- Since it is never in `alive`, it can never satisfy the condition for `Restore`.
- Hence, the process will be suspected by every correct process and no correct process will ever revise its judgment.

#### 2. Eventual Strong Accuracy
$$\text{Eventually, no correct process is suspected by any correct process.}$$
We prove this property after time $T$ (system stabilization time):
- Before time $T$, we have no guarantees because the system is asynchronous.
- After time $T$, the system becomes synchronous: any message sent by a correct process $p$ to another correct process $q$ is delivered within an unknown bounded time $MaxDelay$.
- If $p$ was wrongly suspected by $q$, then $q$ eventually receives the PONG from $p$, restores $p$, and increases its `delay`.
- If the new `delay` is still less than $2 \cdot MaxDelay$ (the round-trip time), $q$ might timeout and suspect $p$ again, but it will receive the PONG and increase `delay` again.
- After a finite number of errors, the `delay` of $q$ will become strictly greater than $2 \cdot MaxDelay$.
- Once `delay > 2 \cdot MaxDelay`, $q$ will receive $p$'s PONG before the timeout expires, every single round.
- Thus, $p$ will always be in `alive`, and $q$ will never suspect $p$ again.

### Il Fenomeno dei "Ping from the Dead" ed eventuale Ottimizzazione
Consider this scenario:
- Process $p_2$ crashes at time $t_1$.
- Later, at time $T > t_1$, the system becomes synchronous.
- Is it possible that process $p_1$, at some point after $t_1$, triggers `Restore(p_2)`?

**Yes, it is possible!**
Why? Because before crashing, $p_2$ may have sent PONG messages that were delayed in the network during the asynchronous period. These old messages—"pings/pongs from the dead"—can arrive at $p_1$ long after $p_2$ is dead.
Since messages do not have sequence numbers, an old pong from the past looks just as valid as a pong from a living process!
Process $p_1$ receives this old pong, places $p_2$ into `alive`, and triggers `Restore(p_2)`.

How many times can this happen?
**A finite (bounded) number of times.** Because in a finite time before crashing, $p_2$ could only send a finite number of messages. Once all these in-flight messages are delivered, $p_2$ will never send another message, and $p_1$ will suspect $p_2$ permanently.

#### Ottimizzazione proposta a lezione:
A student suggested: what if we send PING requests only to processes that are not currently suspected, i.e., to $\Pi \setminus suspected$?
If you do not send a PING to a suspected process, you do not trigger new replies. Does this break the algorithm?
No, it does not break the algorithm. If a correct process was falsely suspected, its in-flight reply will eventually arrive (via the reliable link), causing it to be restored. Once restored, it will receive PINGs again.

---

## 4. Lemma di Stabilizzazione dell'Insieme `suspected`

We now prove a fundamental lemma about the suspected set. We will use this lemma to easily prove the correctness of Leader Election.

### Enunciato del Lemma
> **Lemma (Stabilizzazione dei Sospetti):**
> Let $p_1$ and $p_2$ be two correct processes, and let $suspected_1$ and $suspected_2$ be their respective suspected sets.
> There exists a time $T_{stab}$ after which:
> $$suspected_1 = suspected_2$$
> and this set remains identical forever on all correct processes.

### Dimostrazione per Assurdo
We prove the lemma by contradiction:
- Suppose that after stabilization, $suspected_1 \neq suspected_2$.
- The only way they can be different is if there exists some process ID $p$ that belongs to one set but not the other. Without loss of generality, suppose:
  $$p \in suspected_1 \quad \text{and} \quad p \notin suspected_2$$
- Now, there are only two possibilities for process $p$:
  1. **Caso 1: Process $p$ is correct.**
     If $p$ is correct and $p \in suspected_1$, then process $p_1$ suspects a correct process permanently. This directly violates **Eventual Strong Accuracy**! (Because by Eventual Strong Accuracy, every correct process must eventually stop suspecting any correct process).
  2. **Caso 2: Process $p$ is faulty (crashed).**
     If $p$ is faulty and $p \notin suspected_2$, then process $p_2$ does not suspect a crashed process. This directly violates **Strong Completeness**! (Because by Strong Completeness, every crashed process must eventually be permanently suspected by every correct process).
- Both cases lead to a contradiction.
- Therefore, no such $p$ can exist. For every pair of correct processes, their suspected sets must eventually become identical, containing all crashed processes and zero correct processes.

---

## 5. Leader Election in Sistemi Sincroni (Astrazione Perfetta)

### Motivazione e Relazione Duale con i Failure Detectors
We have seen two kinds of failure detectors: the perfect failure detector $\mathcal{P}$ and the eventually perfect failure detector $\diamond \mathcal{P}$.
However, there is an alternative: sometimes you do not need to understand who failed; it is enough that you know **someone that is correct**, and everyone trusts the same correct process.
This is the **dual from a logical perspective** of the failure detector: instead of finding who is dead, we find who is alive and elect them.

This primitive is called **Leader Election**. In leader election, processes elect a leader that is unique and agreed upon by all processes.

#### Perché il Leader Election è importante?
Because if everyone trusts the same leader, you can create a pattern similar to the **Client-Server pattern** in distributed systems:
- The elected leader becomes the central coordinator.
- Everyone sends requests to the coordinator, and the coordinator manages the state.
- For example, distributed **Mutual Exclusion** becomes trivial with a coordinator: a process asks the coordinator *"Is the critical section free?"*; the coordinator checks its memory, grants access, and when the process releases, grants access to the next one.

### Specifica del Leader Election (Sincrono)
The leader election primitive provides a single event:
- `Leader(p)`: indication telling the local process that process $p$ is elected as leader.

#### Proprietà Formali:
1. **Eventual Detection:**
   $$\text{Either there is no correct process in the system, or some correct process is eventually elected as leader.}$$
   Eventually, your leader cannot be a dead process; you must point to a correct process.

2. **Accuracy (Monarchical Safety / Local Agreement):**
   $$\text{If a process is elected as leader, then all previously elected leaders have crashed.}$$
   What this property rules out is having two different correct processes acting as leaders at the same time. If process $p_2$ elects process 3, and previously process 1 was the leader, then process 1 must have crashed. You cannot have two active, correct leaders simultaneously.

*Nota tecnica sul testo del libro:*
What happens if two leaders are elected at the exact same physical time on two different processes? If two elections occur at the exact same instant, the concept of "previously" is ill-defined. To avoid this ambiguity, we assume that elections on different processes never occur at the exact same instant (they are separated by at least $\epsilon$).

### Implementazione con Perfect Failure Detector ($\mathcal{P}$)
We implement Leader Election on top of the Perfect Failure Detector $\mathcal{P}$, without needing to exchange any messages on the network!

```
Implements:
    LeaderElection, instance le

Uses:
    PerfectFailureDetector, instance p

State:
    suspected: set of process IDs, initially empty
    leader: process ID or null, initially null

upon event < Init > do:
    leader = null
    suspected = empty

upon event < p, Crash | p_j > do:
    suspected = suspected U {p_j}

upon leader != max_rank(Pi \ suspected) do:
    leader = max_rank(Pi \ suspected)
    trigger < le, Leader | leader >
```

#### Funzionamento dell'Algoritmo:
- `max_rank(S)` is a deterministic function that returns the process with the maximum identifier in set $S$. (Using `min_rank` works identically).
- At the beginning, on all processes, `suspected` is empty. The set $\Pi \setminus suspected$ is $\{1, 2, 3, 4, 5\}$. Every process deterministically elects process 5.
- If process 5 crashes:
  - By the completeness of $\mathcal{P}$, each correct process eventually receives `< p, Crash | 5 >` and adds 5 to `suspected`.
  - The set $\Pi \setminus suspected$ becomes $\{1, 2, 3, 4\}$.
  - The condition `leader != max_rank` triggers, and the process updates `leader = 4` and triggers `< le, Leader | 4 >`.
- Can process 1 still trust 5 while process 2 has already elected 4?
  - Yes! Because the failure detector guarantees eventual detection. Process 1 might detect the crash of 5 slightly later than process 2.
  - This does not violate accuracy: 4 is elected while 5 has already crashed.

#### Dimostrazione di Correttezza:
- **Eventual Detection:** Follows directly from the Strong Completeness of $\mathcal{P}$. If the current leader crashes, $\mathcal{P}$ eventually detects it, the crashed leader is added to `suspected`, and a new leader is chosen from the remaining processes.
- **Accuracy:** Follows from the Strong Accuracy of $\mathcal{P}$ and the total order on process IDs. As long as the current leader $x$ is alive, no correct process can suspect $x$ (by strong accuracy of $\mathcal{P}$). Therefore, $x$ remains in $\Pi \setminus suspected$ on all correct processes, and since $x$ has the maximum rank, no process can elect a different leader $y < x$ while $x$ is alive.

---

## 6. Il Problema della Simmetria e le Reti Anonime

The leader election algorithm relies on the existence of a **total order on process ranks/IDs** (`max_rank`).
What happens if processes do not have identifiers? Such systems are called **Anonymous Systems**.

### Perché l'Elezione del Leader è Impossibile in Reti Anonime Simmetriche
Consider an anonymous system arranged in a symmetric topology, such as a **Ring Graph**:
- Every process has identical hardware and code.
- There are no process IDs.
- The algorithm is **deterministic** (no random number generators).
- Every process starts in the exact same initial memory state $M$.

Can we elect a unique leader in this system?
**No, it is impossible!**
Let us trace why:
1. At step 0, all processes have memory $M$.
2. Since the code is deterministic, every process evaluates its state and sends the exact same message $X$ to its neighbors.
3. Every process receives the exact same message $X$ from its left and right neighbors.
4. Every process updates its memory to the exact same new state $M'$.
5. If at any step one process's state transitions to *"I am the leader"*, then **every process in the ring simultaneously transitions to *"I am the leader"*!**

You cannot break symmetry. Whatever deterministic algorithm you run, all processes will execute the exact same state transitions.
Therefore, in anonymous networks, electing a leader is mathematically impossible unless the topology breaks symmetry.

#### Quando è possibile rompere la simmetria?
Leader election in anonymous networks is possible only if the graph has **topological asymmetry**.
For instance, if one node has degree 4 (four links) and all other nodes have degree 2:
- Nodes communicate their degree.
- The unique node with degree 4 discovers it is unique and elects itself.
(There is an entire branch of mathematics studying leader election on graphs via *graph fibrations*).

---

## 7. Eventually Perfect Leader Election ($\Omega$)

When the underlying system is eventually synchronous, we do not have $\mathcal{P}$; we have the eventually perfect failure detector $\diamond \mathcal{P}$.
On top of $\diamond \mathcal{P}$, we can build the **Eventually Perfect Leader Election**, denoted by the symbol $\Omega$ (Omega).

The relationship between $\Omega$ and Leader Election is identical to the relationship between $\diamond \mathcal{P}$ and $\mathcal{P}$:
- There is a time after which $\Omega$ behaves as a perfect leader election.
- Before that time, it can make arbitrary mistakes (e.g., multiple leaders, trusting crashed processes).

### Specifica Formale di $\Omega$
The abstraction provides an indication event:
- `Trust(p)`: indicates that process $p$ is currently trusted to be the leader.

#### Proprietà Formali:
1. **Eventual Accuracy:**
   $$\text{There is a time after which every correct process trusts some correct process.}$$
   It is not possible that correct processes permanently trust a faulty process.

2. **Eventual Agreement:**
   $$\text{There is a time after which no two correct processes trust different processes.}$$
   Eventually, all correct processes must agree on the exact same leader.

Both properties are **liveness properties**. At finite time, processes can trust different leaders or change their minds repeatedly.

#### Analisi di Esecuzioni Esemplari:
- **Run 1:** All processes initially trust different leaders, but eventually all processes permanently trust process $p_3$. However, $p_3$ has crashed!
  - *Eventual Accuracy:* **Violated!** Because they permanently trust a dead process.
  - *Eventual Agreement:* **Satisfied.** Because they all agree on the same process.
- **Run 2:** Processes $p_1$ and $p_2$ permanently trust $p_4$, while processes $p_3$ and $p_4$ permanently trust $p_1$. Both $p_1$ and $p_4$ are correct.
  - *Eventual Accuracy:* **Satisfied.** Because everyone trusts a correct process.
  - *Eventual Agreement:* **Violated!** Because two correct processes permanently trust different leaders.

### Implementazione di $\Omega$ su $\diamond \mathcal{P}$

```
Implements:
    EventualLeaderElection, instance omega

Uses:
    EventuallyPerfectFailureDetector, instance diamond_p

State:
    suspected: set of process IDs, initially empty
    leader: process ID or null, initially null

upon event < Init > do:
    leader = null
    suspected = empty

upon event < diamond_p, Suspect | p > do:
    suspected = suspected U {p}

upon event < diamond_p, Restore | p > do:
    suspected = suspected \ {p}

upon leader != max_rank(Pi \ suspected) do:
    leader = max_rank(Pi \ suspected)
    trigger < omega, Trust | leader >
```

### Dimostrazione di Correttezza tramite il Lemma di Stabilizzazione
The proof of correctness is an immediate consequence of the **Stabilization Lemma** that we proved earlier:
1. By the Stabilization Lemma, there exists a time $T_{stab}$ after which the set `suspected` becomes identical on all correct processes.
2. By Strong Completeness of $\diamond \mathcal{P}$, `suspected` contains all crashed processes.
3. By Eventual Strong Accuracy of $\diamond \mathcal{P}$, `suspected` contains no correct processes.
4. Therefore, on all correct processes, the set $\Pi \setminus suspected$ stabilizes to the exact set of correct processes.
5. Since every correct process evaluates `max_rank(\Pi \setminus suspected)` on the exact same non-empty set of correct processes, and `max_rank` is deterministic, every correct process elects the exact same correct leader!
This simultaneously satisfies both Eventual Accuracy and Eventual Agreement.

---

## 8. Classificazione dei Modelli di Sistema ed Equivalenza Computazionale

We can classify distributed system models based on their failure detection capabilities:

### I Tre Modelli di Rilevamento dei Guasti
1. **Fail-Stop:** Perfect Point-to-Point Links + Perfect Failure Detector $\mathcal{P}$.
2. **Fail-Noisy:** Perfect Point-to-Point Links + Eventually Perfect Failure Detector $\diamond \mathcal{P}$.
3. **Fail-Silent:** Perfect Point-to-Point Links only (no failure detector, purely asynchronous).

Notice that in none of these models do we explicitly talk about time: we characterize the model by the quality of the failure detector oracle.

#### Gerarchia e Relazione di Inclusione:
$$\text{Fail-Stop} \subset \text{Fail-Noisy} \subset \text{Fail-Silent}$$
This hierarchy corresponds directly to the synchrony hierarchy:
$$\text{Synchronous} \subset \text{Eventually Synchronous} \subset \text{Asynchronous}$$
In Fail-Stop, we can solve more problems than in Fail-Noisy, and in Fail-Noisy we can solve more problems than in Fail-Silent.

### Domanda Teorica: Qual è la relazione tra Sistema Sincrono e Fail-Stop?
Consider a Synchronous system and a Fail-Stop system. What is their computational relationship?
- **Opzione A:** Sono computazionalmente equivalenti.
- **Opzione B:** Il Sistema Sincrono è strettamente più potente del Fail-Stop.
- **Opzione C:** Il Fail-Stop è strettamente più potente del Sistema Sincrono.

**La risposta corretta è B: il Sistema Sincrono è più potente del Fail-Stop.**

#### Perché?
In a synchronous system, we have a known bound $\Delta$ on channel delays. In a Fail-Stop system, we have a perfect failure detector $\mathcal{P}$, but the underlying communication links have **unbounded delay**.

Which problem can we solve in a Synchronous system that is **impossible** to solve in Fail-Stop?
**Clock Synchronization!**
To synchronize physical clocks, you explicitly need the bound on channel delays (to calculate round-trip bounds). In Fail-Stop, since link delays are unbounded, physical clock synchronization is impossible.

#### Il potere del modello Fail-Stop:
However, having a perfect failure detector $\mathcal{P}$ is extraordinarily powerful. In Fail-Stop, you can solve almost all other fundamental distributed computing problems:
- Distributed Consensus
- Total Order Broadcast
- Distributed Turing Machines
The only problems you cannot solve are those that explicitly depend on physical time.

---

## 9. Esercizio d'Esame (Settembre 2021): Canale Bounded $k$-Lossy

### Testo del Problema
Consider a distributed system composed of two processes: a Sender and a Receiver. Both processes are correct (no crashes).
The processes are connected by a bidirectional **Bounded Loss Point-to-Point Link** that exposes the standard `Send` and `Deliver` events.

#### Proprietà del Link:
1. **No Duplication:** If a process sends a message $m$, $m$ is delivered at most once.
2. **No Creation:** If a process delivers $m$ with sender $p$, then $m$ was previously sent by $p$.
3. **Bounded $k$-Loss:**
   $$\text{If process } p \text{ sends } T > k \text{ messages on the link, process } q \text{ delivers at least } T - k \text{ messages.}$$
   The parameter $k$ is known.

*Significato intuitivo:* Out of any sequence of messages sent, the channel can lose **at most $k$ messages**. If you send 10 messages and $k = 3$, the receiver delivers at least 7 messages.

---

### Domanda 1: Implementare un Perfect Point-to-Point Link con overhead finito

**Richiesta:** Progettare un algoritmo che implementi un Perfect Point-to-Point Link sopra questo canale bounded $k$-loss, garantendo che l'overhead di messaggi sia finito.
(Non è possibile usare l'algoritmo classico con stub e ritrasmissioni infinite).

#### Soluzione e Intuizione:
Since the channel can lose at most $k$ messages, if the sender transmits each message **$k + 1$ times**, at least one copy is guaranteed to survive and reach the receiver!

#### Pseudocodice dell'Algoritmo:

```
Implements:
    PerfectPointToPointLink, instance pp2p

Uses:
    BoundedLossLink, instance bll

State:
    delivered: set of message IDs, initially empty

// Sender side:
upon event < pp2p, Send | dest, m > do:
    for i = 0 to k do:
        trigger < bll, Send | dest, m >

// Receiver side:
upon event < bll, Deliver | src, m > do:
    if m not in delivered then:
        delivered = delivered U {m}
        trigger < pp2p, Deliver | src, m >
```

#### Calcolo dell'Overhead:
To transmit $X$ distinct application messages:
- The sender transmits each message $k + 1$ times.
- Total messages sent on the channel:
  $$\text{Total Sent} = X \cdot (k + 1) = X \cdot k + X$$
- Since $X$ messages are required to communicate the data, the transmission overhead is:
  $$\text{Overhead} = X \cdot k$$
As long as $X$ is finite, the overhead is strictly finite.

---

### Domanda 2: Overhead Minimo per trasmettere 1 messaggio vs $X$ messaggi

#### Parte A: Overhead minimo per trasmettere un singolo messaggio ($X = 1$)
What is the minimal overhead $O$ that any algorithm must pay to deliver a single message?
**The minimal overhead is $k$.**
- You must send at least $k + 1$ copies of the message.
- If you sent $k$ or fewer copies, the adversary channel could drop all of them (since it can drop up to $k$ messages), violating reliable delivery.
- Therefore, $k$ retransmissions are strictly necessary: $\text{Overhead} = k$.

#### Parte B: Trasmissione di $X$ messaggi ($X > 1$) – Si può fare meglio di $X \cdot k$?
Suppose we want to transmit $X = 10$ messages ($m_1, \dots, m_{10}$), with $k = 3$.
The trivial algorithm sends each message $k + 1 = 4$ times, resulting in:
$$\text{Overhead} = X \cdot k = 10 \cdot 3 = 30 \text{ extra messages}$$

Can we do significantly better?
**Yes! By using an acknowledgment (ACK) mechanism!**

#### Strategia Ottimizzata a Due Fasi:
1. **Fase 1 (Invio iniziale):**
   The sender transmits each of the $X = 10$ messages **once** (10 transmissions).
2. **Ricezione parziale:**
   Because the channel can lose at most $k = 3$ messages, the receiver is guaranteed to deliver at least $X - k = 7$ messages.
3. **Feedback:**
   The receiver sends ACKs for the messages it delivered.
4. **Fase 2 (Ritrasmissione mirata):**
   - The sender inspects the received ACKs. At most $k = 3$ messages were lost.
   - For each missing message (at most $k$), the sender retransmits it **$k + 1$ times** (or $k$ times) to ensure it reaches the destination.
5. **Conteggio dei messaggi del Sender:**
   $$\text{Total Messages Sent} \le X + k \cdot k = X + k^2$$
   The overhead paid by the sender drops to:
   $$\text{Overhead} \le k^2$$

#### Confronto di Scalabilità:
- If $X = 100$ and $k = 3$:
  - Trivial algorithm overhead: $X \cdot k = 100 \cdot 3 = 300$ extra messages.
  - ACK-based algorithm overhead: $k^2 = 3^2 = 9$ extra messages!
- $X + k^2 \ll X \cdot (k + 1)$, demonstrating that $X \cdot k$ is not the minimal overhead when transmitting multiple messages.

---

## 10. Conclusione e Prossimi Passi

In the next lecture, we will study how to apply Failure Detectors and Leader Election to solve the **Distributed Mutual Exclusion** problem in the presence of crash failures.

---
---

# Trascrizione Lezione 7: Broadcast Abstractions, Reliable Broadcast e Uniformità

Questa trascrizione riporta fedelmente le spiegazioni, i ragionamenti, le definizioni formali e gli esercizi svolti dal docente in prima persona (1:1 con il parlato della lezione), eliminando unicamente gli elementi accessori e di circostanza (verifiche tecniche audio/video, token di presenza Prodigy, gestione delle pause e rumore di trascrizione).

---

## 1. Recap e Mutua Esclusione Fault-Tolerant con Failure Detector Perfetto ($P$)

### Collegamento con la lezione precedente
In the last lecture we have seen the failure detector and the leader election, and those are two modules that are able to solve important functions in our distributed system. Namely:
1. The failure detector is able to understand if something crashes: the perfect one that never makes mistakes ($P$), and the eventually perfect ($\diamondsuit P$) that eventually becomes a perfect failure detector.
2. The leader elector that is able to elect a single leader. The normal leader election ensures that you can never trust two different correct leaders at the same time in the system (there are no two processes that trust two different correct leaders); the eventual leader election is the same thing but with a stabilization period.

These modules together can create conceptually clean algorithms for fault tolerance. Today we will see how to enrich the Lamport algorithm for mutual exclusion to make it fault-tolerant using the perfect failure detector $P$.

We assume that we have the Lamport algorithm for mutual exclusion that we have seen in the lecture on logical time. For people who do not remember it, it is fairly simple to describe but fairly complex to understand: when you have to enter the mutual exclusion, you send a request to everyone, you wait for the ACKs, and then you use the logical timestamp on the requests and ACKs to understand if you can enter. When I described the original Lamport mutual exclusion, I was really careful and told you: look, the model that we are seeing for this algorithm does not assume failures; we assume that everyone is correct.

---

### Ridefinizione delle Proprietà di Mutua Esclusione in presenza di Crash
If we assume that processes can fail, the first thing to do is to change the definition of mutual exclusion. The classical mutual exclusion properties were defined in a system without failures. If we add failures, the events of the mutual exclusion algorithm do not change:
- `request`: triggered to ask to enter the critical section.
- `grant`: given by the mutual exclusion algorithm to notify that you are free to enter the critical section.
- `release`: triggered when you exit the critical section.

Now let us see how the properties change when we consider failures:

#### 1. Safety (Mutual Exclusion)
- **Definizione originale (no crash):** *At any time $t$, at most one process is inside the critical section.*
- **Nuova definizione con crash:** *At any time $t$, at most one uncrashed (alive) process is inside the critical section.*

Why do we change the definition in this way? Let us say that we are process $p_1$: we ask to enter the critical section, and we enter at 1:00 PM. We start doing our operations in the critical section, and then at 2:00 PM we die. What happens at this point is that conceptually there is still a process in the critical section ($p_1$, even if it is dead). But if it is dead, it is not executing any more critical operations: for example, if it was writing to shared memory or using a printer, from the moment it crashed it is not doing it anymore. To allow other processes to enter, we say: okay $p_2$, now you can enter the critical section, because even though conceptually there are two processes in the critical section (since $p_1$ died before releasing and can never release), only one of them is alive. If $p_2$ also crashes inside, we can allow $p_3$ to enter: at that point conceptually three processes are inside, but just one is alive. You can share the critical section as long as the other processes inside are dead.

#### 2. Liveness (Eventual Entry)
- **Definizione originale (no crash):** *If a process requests access to the critical section, then it eventually enters the critical section.*
- **Nuova definizione con crash:** *If a correct process $p$ requests access to the critical section, then it eventually enters the critical section.*

We must specify that the process has to be **correct**. Why? Suppose I am a faulty process $p_1$: I request to enter the critical section, and then I die immediately. Then, of course, I cannot enter the critical section. For instance, my request may not have even left my network card: I trigger the request locally, it travels down the system toward the network card, and I die. If I am dead, I cannot enter. If we do not specify "correct", in a system with crashes it is impossible to implement an algorithm that satisfies the property, because it would have to guarantee entry also for faulty processes that die right after requesting.

#### 3. Ordering (FIFO Order)
- **Definizione con crash:** *If a correct process $p$ requests access before a process $q$, then $q$ cannot access the critical section before $p$.*
Again, we add the requirement that $p$ is correct for the exact same reason.

---

### Punti Critici nell'Algoritmo di Lamport Originale in caso di Crash
When we want to modify an algorithm to make it fault-tolerant, the first step is to identify where processes can get locked forever if failures occur. In Lamport's algorithm, there are two main dangerous points:

1. **Attesa degli ACK da tutti i processi:**
   In the original algorithm without failures, before entering the critical section you send a request to all processes and you wait for an ACK from every process. If you send a request to $p_1, p_2, p_3$, and process $p_3$ dies, how long will you wait for the ACK of $p_3$? Forever. You are blocked forever. This is the first dangerous point we must patch.

2. **Mancato rilascio della Sezione Critica in caso di Crash:**
   Once a process enters the critical section, it is assumed that after executing its operations it sends a `release` message. If a process dies inside the critical section, it will never send the release. Its request remains in the `request_set` of all other processes forever. Since that request has a smaller timestamp than subsequent requests, it blocks every other process forever (the condition *exists a request with timestamp smaller than yours* remains true forever).

---

### La Patch con il Perfect Failure Detector ($P$)

#### Risoluzione del Punto 1 (Attesa degli ACK)
With a perfect failure detector $P$, if someone dies, $P$ reliably signals the crash event. We maintain a set `crashed` that collects all processes detected as dead. In the algorithm, instead of waiting for ACKs from the entire set of processes $\Pi$, we only wait for ACKs from the processes that are currently believed correct:
$$\Pi \setminus crashed$$
In this way, we do not wait forever for an ACK from a dead process.

#### Risoluzione del Punto 2 (Rimozione delle richieste di processi crashati)
Suppose process $p_0$ sends a request with timestamp $(ts_0, p_0)$ to all processes. Process $p_1$ puts $(ts_0, p_0)$ in its `request_set`. If $p_0$ dies inside the critical section, it cannot send a release. When $p_1$ receives the event `crash(p0)` from the failure detector, what should $p_1$ do? It simply deletes the request of $p_0$ from its `request_set`. Since $p_0$ is dead, we do not care about its request anymore.

#### Race Condition: La necessità della patch completa
Is this naive patch entirely correct? Not yet. There is still an asynchronous timing pattern that can lock a process forever.
Suppose process $p_1$ is running. Process $p_0$ sends a request. Because the system is asynchronous and communication links have arbitrary delays:
1. Process $p_1$ detects the crash of $p_0$ first (via $P$), and removes all existing requests of $p_0$ from `request_set`.
2. Afterwards, the delayed request message originally sent by $p_0$ before dying finally reaches $p_1$.
3. Process $p_1$ receives the request message and, following the original message handler, inserts it into `request_set`.
4. Because the crash event of $p_0$ is delivered only once by $P$, $p_1$ will never execute the crash handler for $p_0$ again. The request of dead process $p_0$ remains stuck in `request_set` forever!

**La soluzione definitiva:**
Every time a process receives a message (not only requests), it checks whether the sender is in `crashed`. If the sender is already dead, the message is simply discarded:
$$\text{if } m \text{ is a request and } sender(m) \notin crashed \text{ then process } m$$
Discarding messages from a dead process never breaks correctness: it is logically indistinguishable from the case where the sender died a few microseconds earlier and the message was never delivered over the network.

Thanks to the perfect failure detector $P$, we turned a complex algorithm into a fault-tolerant one by adding just about six lines of code. Notice also that we never had to manipulate time or timeouts directly: the time complexity and timeouts are encapsulated inside the failure detector module (abstraction layering).

---

## 2. Mutua Esclusione Centralizzata con Leader Election e Failure Detector

Now let us build an alternative, simpler mutual exclusion algorithm using:
- Perfect Point-to-Point Links (`pp2p`)
- Perfect Failure Detector ($P$)
- Perfect Leader Election module ($LE$)

The idea is centralized: the Leader Election module elects a single leader (e.g., $p_1$), and all processes send their requests to the leader.

### Caso 1: Crash di un client all'interno della Sezione Critica
A client process asks the leader: "May I enter the critical section?" The leader grants permission. The client enters, and then dies inside the critical section without releasing.
With the perfect failure detector $P$, the leader eventually receives `crash(client)`. The leader interprets this crash as an implicit release, frees the lock, and grants the critical section to the next client in the queue.

### Caso 2: Crash del Leader
What happens if the leader itself dies?
1. The Leader Election module detects the crash of the leader and elects a new leader.
2. But consider this dangerous scenario:
   - Client $p_2$ requests access from Leader 0.
   - Leader 0 grants access to $p_2$, and immediately crashes.
   - Process $p_2$ is now legitimately inside the critical section.
   - Leader 1 is elected.
   - Client $p_3$ requests access from Leader 1. If Leader 1 blindly grants access to $p_3$, both $p_2$ and $p_3$ are inside the critical section simultaneously—violating safety!

#### Come risolve il nuovo Leader?
The newly elected leader cannot immediately start granting requests. It must first discover whether someone is already inside the critical section.
The new leader broadcasts a query to all processes: *"Are you in the critical section?"*
How long does the leader wait, and for whose replies?
Since processes can crash, the leader cannot wait for everyone; it waits for replies from:
$$\Pi \setminus crashed$$
Once all alive processes have answered, the leader knows the exact system state. If a process is in the critical section, the leader waits until that process releases (or crashes). The leader cannot forcibly expel a process from the critical section, because operations in the critical section (e.g. database transactions or physical writes) must run to completion.

#### Comportamento del client che aveva richiesto al vecchio leader
If client $p_2$ asked Leader 0, and Leader 0 crashed before granting permission:
Client $p_2$ eventually detects that Leader 1 has been elected. Process $p_2$ stops trusting Leader 0 (any late message from Leader 0 is discarded), and simply re-sends its pending request to Leader 1.

### Complessità in Messaggi dell'algoritmo Leader-Based
- **Best case (nessun crash del leader):** A client sends 1 request message (and receives 1 grant), which is $O(1)$ compared to $O(N)$ of decentralized algorithms.
- **Worst case con $f$ crash:** If up to $f$ consecutive leaders crash while a client is requesting access, the client re-sends to the next leader up to $f+1$ times. In the worst case, $f+1$ request messages are needed until a correct leader answers.

---

## 3. Introduzione alle Astrazioni di Broadcast

### Il modello e il passaggio da Point-to-Point a Broadcast
Until now, our focus has been on point-to-point interactions between two processes (links, failure detectors pinging someone).
Now we move to the **Broadcast** problem: one process has a message and wants to send it to everyone in the system.
- If there are **no failures**, broadcast is trivial: it is just a `for` loop in memory:
  ```python
  for p in Pi:
      send(m, p)
  ```
- When there are **failures**, broadcast is much more than a simple loop. If the source process crashes while iterating through the loop, it may have sent the message to only a subset of processes. Some processes receive the message, while others never will.

In distributed systems, leaving replicas in an inconsistent state (where some saw an operation and others did not) is dangerous. We need formal broadcast abstractions.

---

### Best-Effort Broadcast (BEB)
The most basic broadcast abstraction is **Best-Effort Broadcast**. It corresponds to the simple loop over reliable point-to-point links.

#### Interfaccia ed Eventi
- **Richiesta (`beb_broadcast(m)`):** Used by an upper layer process to broadcast message $m$ to all processes.
- **Indicazione (`beb_deliver(src, m)`):** Triggered on the receiver to deliver message $m$ from source $src$ to the upper layer.

#### Proprietà Formali di Best-Effort Broadcast
1. **Validity:** If a correct process broadcasts a message $m$, then every correct process eventually delivers $m$.
2. **No Duplication:** No message is delivered more than once.
3. **No Creation:** If a process delivers a message $m$ with sender $s$, then $m$ was previously broadcast by process $s$.

*Nota di implementazione:* In all broadcast algorithms, a process also broadcasts messages to itself (self-delivery) to maintain algorithmic symmetry, without treating itself as a special case.

#### Implementazione di Best-Effort Broadcast
The algorithm is built directly on top of the Perfect Point-to-Point Link (`pp2p`):
```text
Module BestEffortBroadcast (beb):
  upon event beb_broadcast(m) do:
      for each p in Pi:
          trigger pl_send(p, m)

  upon event pl_deliver(src, m) do:
      trigger beb_deliver(src, m)
```

#### Dimostrazione delle Proprietà
The proof follows directly from the properties of the underlying Perfect Link:
- **Validity:** The sender loops through all processes. If the sender is correct and uses a perfect link, the reliable delivery property of the perfect link ensures that every correct process eventually receives the message.
- **No Duplication & No Creation:** Guaranteed directly by the no duplication and no creation properties of the perfect link.

#### Limite fondamentale di BEB
Notice carefully: **Validity only applies if the sender is correct.**
If the sender is faulty and crashes mid-broadcast, validity guarantees absolutely nothing. Process $p_1$ may deliver to $p_2$ and $p_3$, and then crash before sending to $p_4, p_5, p_6$. Process $p_2$ and $p_3$ deliver $m$, but $p_4, p_5, p_6$ never will.
For replicated state machines (e.g., bank accounts replicated across machines), this partial delivery causes replicas to diverge and become inconsistent.

---

## 4. Regular Reliable Broadcast (RB / RRB)

To prevent inconsistency, we need an "all-or-nothing" semantic among correct processes: either **all** correct processes deliver the message, or **none** of them do.

### Specifica ed Eventi
- **Richiesta:** `rb_broadcast(m)`
- **Indicazione:** `rb_deliver(src, m)`

### Proprietà di Regular Reliable Broadcast
1. **Validity:** If a correct process broadcasts $m$, then every correct process eventually delivers $m$.
2. **No Duplication:** No message is delivered more than once.
3. **No Creation:** If a process delivers a message $m$ with sender $s$, then $m$ was previously broadcast by $s$.
4. **Agreement (Non-Uniform Agreement):**
   *If a message $m$ is delivered by some correct process, then $m$ is eventually delivered by every correct process.*

If even a single correct process delivers $m$, the agreement property guarantees that all other correct processes in the system will eventually deliver $m$ as well.

### Classificazione Safety vs Liveness
- **Agreement** is a **liveness property**: it cannot be violated in finite time. If a correct process delivers $m$ and another correct process has not yet delivered it, we cannot declare agreement violated because the second process might deliver it in the very next step.
- **Validity** is also a **liveness property**.
- **No Duplication** and **No Creation** are **safety properties** (a violation can be demonstrated in finite time by observing a duplicated or created message).

---

### Analisi delle Tracce di Esecuzione (BEB vs RB)
Consider possible system runs:
- **Traccia 1:** Process $p_1$ crashes. Process $p_2$ (correct) delivers the green message. Process $p_3$ (correct) never delivers the green message.
  - *Classificazione:* This is **Best-Effort Broadcast (BEB)**, but **NOT Reliable Broadcast (RB)**, because a correct process delivered a message that another correct process never delivered (violating Agreement).
- **Traccia 2:** Process $p_1$ crashes. No correct process ever delivers the green message (or all correct processes deliver it).
  - *Classificazione:* This is **Reliable Broadcast (RB)** (and therefore also BEB). Every run of RB is also a run of BEB, because RB has all the properties of BEB plus Agreement ($RB \implies BEB$). When asked at an exam, always identify the **strongest specification** that the run satisfies.
- **Traccia 3:** A correct process broadcasts the orange message, but another correct process never delivers it.
  - *Classificazione:* This is **neither RB nor BEB**, because it violates the basic Validity property.

---

## 5. Algoritmo Lazy Reliable Broadcast (con Perfect Failure Detector $P$)

How do we implement Regular Reliable Broadcast?
In a fail-stop model (with Perfect Failure Detector $P$), we can implement **Lazy Reliable Broadcast** on top of Best-Effort Broadcast.
It is called "lazy" because processes only re-broadcast (relay) messages when strictly necessary—specifically, when they detect that the original source has crashed.

### Struttura Dati e Inizializzazione
- `correct = Pi`: initially all processes in the system.
- `from[s] = {}`: set of messages delivered from sender $s$ (used to prevent duplicate deliveries and track messages that may need relaying).

### Algoritmo Pseudocodice
```text
Module LazyReliableBroadcast (lrb):
  Initialization:
      correct = Pi
      for each p in Pi:
          from[p] = {}

  upon event rb_broadcast(m) do:
      trigger beb_broadcast([DATA, self, m])

  upon event beb_deliver(src, [DATA, s, m]) do:
      if m not in from[s] then:
          trigger rb_deliver(s, m)
          from[s] = from[s] U {m}
          if s not in correct then:
              trigger beb_broadcast([DATA, s, m])   # Relay 1: source is already dead

  upon event crash(p) do:
      correct = correct \ {p}
      for each m in from[p] do:
          trigger beb_broadcast([DATA, p, m])       # Relay 2: source died after delivering its message
```

*Nota sul messaggio `[DATA, s, m]`*: `DATA` è un flag/header per identificare il tipo di pacchetto; `s` rappresenta la **sorgente originale** del messaggio (che viene preservata durante il relay affinché il layer superiore sappia da chi proveniva il messaggio); `m` è il payload.

### I due punti di Relay
1. **Relay su ricezione (Relay 1):** Process $p$ receives message $m$ whose original source $s$ is already in $crashed$ ($s \notin correct$). Process $p$ delivers $m$ and immediately starts relaying $m$ via BEB to help the deceased source.
2. **Relay su crash (Relay 2):** Process $p$ previously delivered message $m$ from source $s$ when $s$ was thought correct. Later, $p$ receives `crash(s)`. To ensure that any other correct process also receives $m$, $p$ relays all messages in `from[s]` via BEB.

---

### Dimostrazione Formale dell'Accordo (per Contraddizione)
- **Assunzione per assurdo:** Suppose a correct process $p$ delivers message $m$ with original sender $q$, while another correct process $p'$ never delivers $m$.
- **Caso 1: La sorgente $q$ non crasha (è corretta).**
  If $q$ does not crash, then by the Validity property of Best-Effort Broadcast, since $q$ is correct and broadcast $m$, every correct process in the system (including $p'$) must eventually deliver $m$. This contradicts the assumption that $p'$ never delivers $m$.
- **Caso 2: La sorgente $q$ crasha.**
  Since $q$ crashes and process $p$ is correct, $p$ must detect the crash of $q$ via the perfect failure detector $P$.
  - If $p$ detects the crash of $q$ *before* receiving $m$, upon receiving $m$ from BEB, $p$ executes Relay 1 (`if s not in correct`).
  - If $p$ detects the crash of $q$ *after* delivering $m$, upon receiving `crash(q)`, $p$ executes Relay 2.
  In both sub-cases, since process $p$ is correct, it initiates a Best-Effort Broadcast of $m$.
  By the Validity property of BEB, when a correct process ($p$) broadcasts a message, every correct process in the system (including $p'$) eventually delivers it.
  Therefore, $p'$ delivers $m$. Contradiction!
Thus, Agreement always holds.

---

### Analisi di Complessità

#### 1. Complessità in Messaggi (Unicast Messages)
- **Best Case (la sorgente è corretta):**
  The source broadcasts via BEB ($N$ messages). Since no process ever detects the source as faulty, no relay is ever triggered.
  $$\text{Best case} = O(N) \text{ messaggi}$$
- **Worst Case (la sorgente crasha):**
  The source sends up to $N$ messages and crashes. All alive processes detect the crash and trigger Relay 2, each broadcasting $N$ messages via BEB.
  $$\text{Worst case} = O(N^2) \text{ messaggi}$$

#### 2. Message Delay / Communication Steps
Message delay measures time assuming each transmission step takes 1 time unit:
- **Best Case:** 1 communication step (source sends, all correct processes receive).
- **Worst Case:** Suppose we have $N$ processes ($p_1, \dots, p_N$). Process $p_1$ sends $m$ only to $p_2$ and crashes (1 step). Process $p_2$ relays $m$ only to $p_3$ and crashes (1 step). Process $p_3$ relays only to $p_4$ and crashes (1 step)... This forms a cascading chain of crashes of length $N-1$.
  $$\text{Worst case delay} = O(N) \text{ communication steps}$$

---

### Cosa succede se usiamo un Eventually Perfect Failure Detector ($\diamondsuit P$)?
What if the failure detector is $\diamondsuit P$ instead of $P$? An eventually perfect failure detector can make mistakes (false suspicions): it can suspect an alive process $p_2$ as crashed.
Does this break the safety or correctness of Lazy Reliable Broadcast?
**No.** If process $p_1$ falsely suspects $p_2$, $p_1$ simply begins relaying messages on behalf of $p_2$. Since $p_2$ is actually alive, both $p_2$ and $p_1$ broadcast the message. Redundant copies of the message are safely discarded by the `from[s]` check on all receivers. The only cost is extra redundant messages, but correctness is fully preserved!

---

## 6. Algoritmo Eager Reliable Broadcast (Senza Failure Detector, Asincrono)

Notice what happens if we take the relay line from the Lazy algorithm and execute it **unconditionally** (without checking `if s not in correct`):
Every time any process delivers a message for the first time, it immediately relays it to everyone.
This eliminates the need for any failure detector!
This algorithm is called **Eager Reliable Broadcast** (every process acts as an "eager beaver", re-broadcasting immediately).

### Proprietà Chiave: Funziona in Sistemi Puramente Asincroni
Since it does not rely on failure detection, **Reliable Broadcast can be implemented in a purely asynchronous system (fail-silent model)** using Eager Reliable Broadcast!

### Algoritmo Pseudocodice
```text
Module EagerReliableBroadcast (erb):
  Initialization:
      delivered = {}

  upon event rb_broadcast(m) do:
      trigger beb_broadcast([DATA, self, m])

  upon event beb_deliver(src, [DATA, s, m]) do:
      if m not in delivered then:
          delivered = delivered U {m}
          trigger rb_deliver(s, m)
          trigger beb_broadcast([DATA, s, m])   # Unconditional relay!
```

### Correttezza
If any correct process delivers $m$, it immediately triggers `beb_broadcast([DATA, s, m])`. Since that process is correct, by BEB Validity, every correct process in the system eventually receives and delivers $m$. Agreement is trivially satisfied.

### Complessità di Eager Reliable Broadcast
- **Message Complexity:** In the best case (no crashes), the source broadcasts ($N$ messages), and *all* $N$ processes receive it and immediately re-broadcast ($N \times N$ messages).
  $$\text{Best case} = O(N^2) \text{ messaggi}$$
  $$\text{Worst case} = O(N^2) \text{ messaggi}$$
  $O(N^2)$ message complexity even in the failure-free case is a heavy communication penalty.
- **Message Delay:**
  - Best case: 1 communication step.
  - Worst case: $O(N)$ steps (same cascading crash chain).

### Singolo Set `delivered` vs Set per Sorgente `from[s]`
- In Eager Reliable Broadcast, we used a single set `delivered = {}`. If two different processes independently broadcast identical message payloads $m$, the second one would be filtered out as duplicate.
- In practice, messages are tagged with a unique identifier: `(source_id, sequence_number, content)`. With unique message IDs, a single global `delivered` set works correctly.

---

## 7. Uniform Reliable Broadcast (URB)

### Il Limite di Regular Reliable Broadcast: Mancanza di Uniformità
Look closely at the Agreement property of Regular Reliable Broadcast:
$$\text{If a } \mathbf{correct} \text{ process delivers } m, \text{ then every correct process eventually delivers } m.$$
What does this property say if a **faulty** process delivers $m$ and then crashes?
**Nothing!**
If a faulty process $p_3$ delivers message $m_4$ and immediately crashes, Agreement is still trivially satisfied even if **no correct process ever delivers $m_4$**.

#### L'Esempio del Conto Bancario e delle Repliche
Imagine your bank account replicated across 5 machines. You issue a withdrawal of 100€.
The message reaches replica $R_1$. Replica $R_1$ delivers the message, dispenses cash (or commits locally), and then immediately crashes.
The remaining 4 replicas are correct, but because $R_1$ crashed before relaying, they never deliver the withdrawal request.
You got your 100€, but the surviving replicas have no record of the transaction! This is a catastrophic consistency violation for external actions.

---

### La Proprietà di Uniform Agreement e la Specifica di URB
Can we demand that *all* faulty processes deliver every message? No, because a process could have crashed hours before the message was created.
The correct requirement is that if **any** process (whether correct or faulty) delivers a message, all correct processes must deliver it.

#### Specifica di Uniform Reliable Broadcast (URB)
1. **Validity:** If a correct process broadcasts $m$, every correct process eventually delivers $m$.
2. **No Duplication:** No message is delivered more than once.
3. **No Creation:** If a process delivers $m$ with sender $s$, then $m$ was previously broadcast by $s$.
4. **Uniform Agreement:**
   *If a message $m$ is delivered by **some process** (whether correct or faulty), then $m$ is eventually delivered by **every correct process**.*

#### Relazione di Inclusione tra Messaggi Consegnati
Under Uniform Reliable Broadcast:
$$\text{Messages delivered by any faulty process } p_{faulty} \subseteq \text{Messages delivered by all correct processes } P_{correct}$$
- Correct processes deliver the complete set of all delivered messages.
- Faulty processes can only deliver a **subset** of the messages delivered by correct processes.
- It is impossible for a faulty process to deliver an "orphan" message that correct processes never see.

### Il Significato del termine "Uniform" nei Sistemi Distribuiti
In this course (and widely in fault-tolerant distributed computing):
- **Non-Uniform property:** Enforces constraints only on correct processes (e.g. Regular Agreement).
- **Uniform property:** Enforces constraints on **all** processes that take actions, including faulty ones before they crash (e.g. Uniform Agreement).
*(Nota: in altre parti della letteratura informatica, "uniform" è talvolta usato per indicare algoritmi che non richiedono di conoscere a priori la dimensione $N$ del sistema; nel nostro corso indica sempre l'inclusione dei processi faulty nella specifica).*

---

## 8. Esercizi e Domande d'Esame Svolti

### Esercizio 1: Peer Review di Algoritmo di Clock Synchronization su Grafi Arbitrari
**Testo:**
Dovete revisionare un algoritmo di sincronizzazione dei clock per grafi arbitrari. L'algoritmo proposto funziona così: ciascun nodo chiede il valore del clock a tutti i suoi vicini, calcola la media aritmetica di tutti i clock ricevuti, e imposta il proprio clock locale a questo valore medio. Questa strategia è corretta o presenta problemi?

**Soluzione del docente:**
L'algoritmo è scorretto: è una pessima idea.
Nel clock synchronization esiste una regola fondamentale: **un clock fisico può solo essere avanzato nel futuro, non può MAI essere portato indietro nel passato** (portare indietro il clock crea gravissimi problemi di consistenza, timestamp duplicati, sicurezza e causalità).
Se un nodo calcola la media aritmetica dei vicini, può facilmente ritrovarsi a portare indietro il proprio orologio:
- Esempio: Il mio orologio segna le 13:00 ($3$). I miei quattro vicini hanno clock $2, 2, 1, 3$.
- La media è:
  $$\frac{3 + 2 + 2 + 1 + 3}{5} = \frac{11}{5} \approx 2.2 \implies 2$$
- Il nodo dovrebbe retrocedere il proprio clock da $3$ a $2$. Questo viola le proprietà di sincronizzazione dei clock fisici.

---

### Esercizio 2: Calcolo di Vector Clocks e Verifica delle Relazioni Causali
**Testo:**
Dati tre eventi con i seguenti orologi vettoriali (dimensione 4):
- $e_1 = [2, 0, 0, 0]$
- $e_2 = [1, 1, 0, 0]$
- $e_3 = [4, 4, 4, 3]$

Determinare le relazioni causali tra le coppie di eventi e indicare quali affermazioni sono vere o false:
1. $e_1 \to e_2$
2. $e_1 \to e_3$
3. $e_2 \to e_3$

**Soluzione del docente:**
- **Coppia $(e_1, e_2)$:**
  $e_1[1] = 2 > 1 = e_2[1]$, ma $e_1[2] = 0 < 1 = e_2[2]$.
  I due vettori non sono comparabili: né $e_1 \le e_2$ né $e_2 \le e_1$.
  Quindi gli eventi sono concorrenti: $e_1 \parallel e_2$. L'affermazione $e_1 \to e_2$ è **falsa**.
- **Coppia $(e_1, e_3)$:**
  $e_1 = [2, 0, 0, 0]$ e $e_3 = [4, 4, 4, 3]$.
  Ogni componente di $e_1$ è strettamente minore o uguale alla corrispondente di $e_3$ ($2 < 4, 0 < 4, 0 < 4, 0 < 3$).
  Quindi $e_1 \to e_3$ è **vera**.
- **Coppia $(e_2, e_3)$:**
  $e_2 = [1, 1, 0, 0]$ e $e_3 = [4, 4, 4, 3]$.
  Tutte le componenti sono inferiori ($1 < 4, 1 < 4, 0 < 4, 0 < 3$).
  Quindi $e_2 \to e_3$ è **vera**.

---

### Esercizio 3: Vector Clocks con Dimensione $N$ e ID Sconosciuti a Priori
**Testo:**
Nell'algoritmo standard dei Vector Clocks si assume che ciascun processo conosca a priori il numero totale di processi $N$ e i loro identificatori, creando un array di dimensione fissa $N$.
Supponete di svegliarvi in un sistema senza sapere quanti processi esistono né quali siano i loro ID. È possibile implementare un meccanismo equivalente ai Vector Clocks? Con quale struttura dati? Come vengono gestiti gli eventi concorrenti?

**Soluzione del docente:**
Sì, è possibile:
1. **Struttura dati:** Non possiamo usare un array a dimensione fissa. Dobbiamo usare un **dizionario / Hash Map** locale (`id -> timestamp`).
2. **Inizializzazione:** Iniziamo con una mappa vuota `{}` (o contenente solo noi stessi con contatore 0).
3. **Ricezione da altri:** Quando riceviamo una hash map da un altro processo, se contiene un ID che non abbiamo mai visto prima, lo inseriamo nella nostra mappa con il valore ricevuto. Questo è esattamente equivalente ad avere un vettore dove la nostra componente per quell'ID era implicitamente $0$, e facciamo $\max(0, val) = val$.
4. **Avanzamento locale:** Quando generiamo un evento locale, incrementiamo la chiave corrispondente al nostro ID nella mappa.
5. **Eventi concorrenti:** Per confrontare due hash map per due eventi: se una chiave compare in una mappa ma non nell'altra, il valore mancante viene trattato come $0$. Il confronto componente per componente funziona esattamente nello stesso modo dell'algoritmo standard dei vector clock.

---

### Esercizio 4: Variante Vector Clocks con Incremento Post-Invio
**Testo:**
Nell'algoritmo standard dei Vector Clocks, un processo incrementa la propria componente nel vettore **prima** di inviare un messaggio (`send`).
Cosa succede se modifichiamo l'algoritmo in modo che il processo alleghi al messaggio il vettore corrente e incrementi la propria componente **subito dopo l'invio**? L'algoritmo continua a preservare la relazione di causalità o si rompe?

**Soluzione del docente:**
L'algoritmo **continua a funzionare**:
- Il primo messaggio inviato trasporterà $[0, 0, \dots]$ anziché avere la propria componente a $1$.
- Se due processi inviano entrambi come primo messaggio $[0, 0, \dots]$, i due eventi di invio saranno considerati concorrenti, esattamente come sarebbero stati considerati concorrenti nell'algoritmo standard (dove uno avrebbe inviato $[1, 0, \dots]$ e l'altro $[0, 1, \dots]$).
- Questa modifica introduce semplicemente una traslazione (shift) uniforme di $-1$ su tutti i timestamp generati da ciascun processo. Poiché lo shift è simmetrico e uniforme per tutti i processi del sistema, la comparabilità e l'ordine parziale sono pienamente preservati.

---

### Esercizio 5: Failure Detector su Link Sincrono con Perdita di al più $k$ messaggi
**Testo:**
Considerate un canale sincrono con bound di ritardo $\Delta$, che però può perdere fino a un massimo di $k$ messaggi consecutivi.
1. È possibile costruire un Perfect Failure Detector ($P$)?
2. E se il numero di messaggi persi fosse illimitato?

**Soluzione del docente:**
1. **Con al più $k$ messaggi persi: SÌ.**
   Basta inviare contemporaneamente $k + 1$ messaggi di ping (heartbeat). Poiché il canale perde al massimo $k$ messaggi, almeno un messaggio su $k+1$ è garantito arrivare a destinazione entro il bound $\Delta$. Il timeout effettivo del failure detector sarà opportunamente bounded (es. $\Delta + (k+1) \times \epsilon$), permettendo di costruire un failure detector perfetto $P$.
2. **Con numero arbitrario/illimitato di messaggi persi: NO.**
   Se il numero di perdite è illimitato, i messaggi possono essere ritrasmessi un numero arbitrario $x$ di volte tale per cui il ritardo complessivo accumulato supera qualsiasi timeout prefissato. Il canale diventa de facto asincrono, rendendo impossibile garantire l'accuratezza forte di un Perfect Failure Detector.

---

### Esercizio 6: Consegna Immediata (Immediate Delivery) in Link FIFO
**Testo:**
Un algoritmo ha la proprietà di **Immediate Delivery** se consegna immediatamente al livello superiore qualsiasi messaggio ricevuto dalla rete, senza mai farlo attendere in una coda o insieme pending.
Il link FIFO standard visto a lezione non possiede la consegna immediata, perché se il messaggio 3 arriva prima del messaggio 2, deve attendere nel set `pending` finché non arriva il messaggio 2.
È possibile implementare un link FIFO con Consegna Immediata su un canale perfetto? A quale costo?

**Soluzione del docente:**
Sì, è possibile:
- **Meccanismo:** Quando la sorgente invia un nuovo messaggio $m_k$, non invia soltanto $m_k$, ma invia **l'intera lista cumulativa della storia dei messaggi inviati fino a quel momento**:
  $$[m_1, m_2, \dots, m_k]$$
- Quando il destinatario riceve il pacchetto contenente la lista, non ha bisogno di aspettare nessun messaggio mancante dalla rete: esamina la lista, estrae tutti i messaggi che non ha ancora consegnato dal prefisso della sequenza, e li consegna immediatamente in ordine al livello superiore.
- **Svantaggio / Costo:** Questa strategia richiede una quantità illimitata / crescente di memoria e di banda sul canale di comunicazione, poiché ogni messaggio trasporta l'intera storia precedente ($O(k)$ payload per il $k$-esimo messaggio), risultando estremamente inefficiente e impraticabile per stream lunghi di messaggi.
