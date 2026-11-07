# Lesson 5 — Logical Clocks and Distributed Mutual Exclusion

## Logical Time and the Happened-Before Relation

Physical clocks cannot be synchronized without error. When their uncertainty intervals overlap, their timestamps alone cannot reliably order two events. Many distributed algorithms do not need the exact UTC time: they need to know whether one event could have influenced another. **Logical time** records this causal information using local computation and message exchanges.

Consider $N$ sequential processes $P_1,\ldots,P_N$. An event is a local computation, a message send or a message receive. Events on the same process have a total local order, written $\to_i$.

![[DS-L5-local-order.svg|520]]

The **happened-before relation**, $\to$, is the smallest relation satisfying three rules:

1. If $e\to_i e'$ on one process, then $e\to e'$.
2. The send of a message happens before the receive of that same message.
3. If $e\to e''$ and $e''\to e'$, then $e\to e'$.

Thus, $e\to e'$ exactly when a directed path of local steps and message arrows connects $e$ to $e'$ in the execution diagram.

![[DS-L5-causal-path.svg|580]]

A message carries information from sender to receiver. Sending it does not tell the sender that it has arrived; that requires a causal reply, such as an acknowledgment.

![[DS-L5-scalar-ack.svg|480]]

### Concurrency ($\parallel$) and Partial Order

Two distinct events are **concurrent** when neither happens before the other:

$$
e\parallel e'\iff\neg(e\to e')\land\neg(e'\to e).
$$

Concurrency does not mean simultaneous physical execution. It means that neither event lies on a causal path to the other.

![[DS-L5-concurrency.svg|480]]

Happened-before is an irreflexive, asymmetric and transitive relation: a **strict partial order**. It is not total because concurrent events are incomparable. Concurrency itself is not transitive. If $e_1\to e_2$ on one process and $e_3$ is isolated on another, then $e_1\parallel e_3$ and $e_3\parallel e_2$, although $e_1$ and $e_2$ are causally ordered.

For example, suppose $P_1$ executes $e_1,e_2$, $P_2$ executes $e_3,e_4$, and $P_3$ executes $e_5,e_6$, in local order. Let one message connect $e_1$ to $e_3$ and another connect $e_4$ to $e_6$. The path

$$
e_1\to e_3\to e_4\to e_6
$$

establishes $e_1\to e_6$. However, $e_2\parallel e_3$: the message left $P_1$ before $e_2$, so it cannot carry information about that event. Similarly, $e_4\parallel e_5$ because $e_5$ occurs before the message reaches $P_3$.

## Scalar Clocks (Lamport Logical Clocks)

A **Lamport clock** assigns each event an integer timestamp $L(e)$ satisfying the **clock condition**:

$$
e\to e'\implies L(e)<L(e').
$$

Each process maintains a counter $L_i$, initially zero. It increments the counter before a local event or a send, and attaches the updated value to each outgoing message. On receiving a message timestamped $t_m$, it moves past both its current counter and the received timestamp.

```text
Process Pi:
    Init:
        Li := 0

    On local event e:
        Li := Li + 1
        L(e) := Li

    On send(m):
        Li := Li + 1
        L(send(m)) := Li
        send (m, Li)

    On receive(m, tm):
        Li := max(Li, tm) + 1
        L(receive(m)) := Li
```

**Why the clock condition holds.** Every local step increases the counter. Across a message edge, the receive rule gives

$$
L(\operatorname{receive}(m))
=\max(L_i,L(\operatorname{send}(m)))+1
>L(\operatorname{send}(m)).
$$

The timestamp therefore increases along every edge of a causal path. By transitivity, it increases from the first event to the last.

![[DS-L5-slide-20-scalar-trace.png|650]]

### Worked Example and Fundamental Limitation of Scalar Clocks

The converse does not hold. Suppose $P_0$ performs two local events $e_0,e_2$, with timestamps $1,2$, while an independent process $P_1$ performs $e_1$, timestamped $1$. If no messages connect them, then $e_1\parallel e_2$ despite $L(e_1)<L(e_2)$.

![[DS-L5-scalar-concurrent-events.svg|500]]

A smaller scalar timestamp is therefore compatible with either causal precedence or concurrency. The useful negative inference is $L(e)\ge L(e')\implies e\not\to e'$.

## Complete Causal Histories

To understand how to capture causality in both directions, first imagine storing every known event. The **causal history** of event $e$ consists of one ordered list per process, containing its known events up to and including $e$:

$$
H(e)=[\operatorname{History}_{P_1}(e),\ldots,\operatorname{History}_{P_N}(e)].
$$

All lists start empty. A local or send event appends itself to its process's list; a send also attaches the updated history. A receive merges the local history with the message history, component by component, then appends the receive event to the receiver's list.

![[DS-L5-causal-history-update.svg|700]]

Each component contains a prefix of that process's sequential execution. Merging two components therefore means keeping the longer list, rather than combining arbitrary divergent lists.

### Comparing Causal Histories and Bidirectional Proof

We write $H(e)<H(e')$ when every component of $H(e)$ is a prefix of the corresponding component of $H(e')$, and at least one is a proper prefix.

For example,

$$
[[e_0,e_2],[]]<[[e_0,e_2],[e_1,e_3,e_4]],
$$

because the first lists are equal and the second grows. In contrast, $[[],[e_1]]$ and $[[e_0,e_2],[]]$ are incomparable: each contains information missing from the other.

This comparison captures causality exactly:

$$
e\to e'\iff H(e)<H(e').
$$

For the forward direction, histories never lose information along a causal path, and the distinct event $e'$ adds new information. For the reverse direction, $H(e)<H(e')$ means that $e$ itself appears in $H(e')$. Information about $e$ can reach $e'$ only through local execution and messages, so a causal path must connect them.

## From Causal Histories to Vector Clocks

Full histories grow with the number of events. The **prefix property** lets us replace each list with its length: only $P_i$ generates events in component $i$, always in the same sequential order. A list containing its first $k$ events is completely identified by $k$.

![[DS-L5-prefix-property.svg|450]]

For two valid history components, being a proper prefix is equivalent to having smaller length. Replacing every component by its length gives the **vector timestamp**:

$$
V(e)=[|\operatorname{History}_{P_1}(e)|,\ldots,|\operatorname{History}_{P_N}(e)|].
$$

![[DS-L5-slide-37-history-to-vector.png|650]]

This uses $N$ integers per timestamp instead of an ever-growing collection of event identifiers. A scalar clock uses one integer but cannot recover the same causal information.

### Vector Clock Algorithm and Comparison Rules

At process $P_i$, component $V_i[i]$ counts its own events. Another component $V_i[j]$ records how many events of $P_j$ are known through causality. Each local or send event increments the local component. Receiving a message takes the component-wise maximum, then increments the receiver's component to count the receive event itself.

```text
Process Pi:
    Init:
        Vi := [0, 0, ..., 0]

    On local event e:
        Vi[i] := Vi[i] + 1
        V(e) := copy(Vi)

    On send(m):
        Vi[i] := Vi[i] + 1
        V(send(m)) := copy(Vi)
        send (m, copy(Vi))

    On receive(m, Vm):
        for k := 1 to N do
            Vi[k] := max(Vi[k], Vm[k])
        Vi[i] := Vi[i] + 1
        V(receive(m)) := copy(Vi)
```

Vector comparisons are **component-wise**:

$$
\begin{aligned}
V=V'&\iff\forall k:\ V[k]=V'[k],\\
V\le V'&\iff\forall k:\ V[k]\le V'[k],\\
V<V'&\iff V\le V'\land V\ne V'.
\end{aligned}
$$

Strict comparison requires at least one smaller component; it does not require every component to be smaller. Two vectors are incomparable, written $V\parallel V'$, when neither is $\le$ the other.

![[Pasted image 20261026140027.png|650]]

Since lengths preserve the history-prefix comparison, the history proof also proves the **strong clock condition**, for distinct events:

$$
\boxed{e\to e'\iff V(e)<V(e')}
\qquad
\boxed{e\parallel e'\iff V(e)\parallel V(e')}.
$$

## Worked Examples and Exercises

### Worked 3-Process Example

![[DS-L5-slide-43-vector-example.png|680]]

Let $e_i^j$ be the $j$-th event on $P_i$. Starting from $[0,0,0]$, the events in the diagram give:

| Event | Operation | Vector timestamp |
| --- | --- | --- |
| $e_1^1$ | Local event | $[1,0,0]$ |
| $e_1^2$ | Send to $P_2$ at $e_2^1$ | $[2,0,0]$ |
| $e_1^3$ | Send to $P_3$ at $e_3^3$ | $[3,0,0]$ |
| $e_1^4$ | Receive from $P_2$ at $e_2^3$ | $[4,3,2]$ |
| $e_2^1$ | Receive from $P_1$ at $e_1^2$ | $[2,1,0]$ |
| $e_2^2$ | Receive from $P_3$ at $e_3^2$ | $[2,2,2]$ |
| $e_2^3$ | Send to $P_1$ at $e_1^4$ | $[2,3,2]$ |
| $e_3^1$ | Local event | $[0,0,1]$ |
| $e_3^2$ | Send to $P_2$ at $e_2^2$ | $[0,0,2]$ |
| $e_3^3$ | Receive from $P_1$ at $e_1^3$ | $[3,0,3]$ |

For example, the receive at $e_1^4$ computes $\max([3,0,0],[2,3,2])+[1,0,0]=[4,3,2]$.

The comparison $[0,0,1]<[4,3,2]$ shows $e_3^1\to e_1^4$, along the path $e_3^1\to e_3^2\to e_2^2\to e_2^3\to e_1^4$. However, $[4,3,2]$ and $[3,0,3]$ are incomparable: the first is larger in components 1 and 2, and smaller in component 3. Thus $e_1^4\parallel e_3^3$.

### Exercise 1 — 4-Process Vector Clock Execution

![[DS-L5-slide-44-vector-exercise.png|680]]

The events are labelled from left to right on each process: $a_j$ on $P_1$, $b_j$ on $P_2$, $c_j$ on $P_3$, and $d_j$ on $P_4$. The marked events are $e_1=c_1$, $e_2=d_3$, and $e_3=a_4$.

> [!example]- Annotated solution and event calculations
> ![[DS-L5-exercise-44-solution.svg|750]]
>
> At a send, increment the sender's component; at a receive, merge with the sending event's vector and increment the receiver's component.
>
> | Event | Operation | Vector timestamp |
> | --- | --- | --- |
> | $a_1$ | Send to $b_1$ | $[1,0,0,0]$ |
> | $a_2$ | Receive from $c_1$ | $[2,0,1,0]$ |
> | $a_3$ | Send to $b_3$ | $[3,0,1,0]$ |
> | $a_4=e_3$ | Receive from $b_7$ | $[4,7,4,3]$ |
> | $b_1$ | Receive from $a_1$ | $[1,1,0,0]$ |
> | $b_2$ | Send to $d_2$ | $[1,2,0,0]$ |
> | $b_3$ | Receive from $a_3$ | $[3,3,1,0]$ |
> | $b_4$ | Send to $c_3$ | $[3,4,1,0]$ |
> | $b_5$ | Receive from $c_4$ | $[3,5,4,1]$ |
> | $b_6$ | Receive from $d_3$ | $[3,6,4,3]$ |
> | $b_7$ | Send to $a_4$ | $[3,7,4,3]$ |
> | $c_1=e_1$ | Send to $a_2$ | $[0,0,1,0]$ |
> | $c_2$ | Receive from $d_1$ | $[0,0,2,1]$ |
> | $c_3$ | Receive from $b_4$ | $[3,4,3,1]$ |
> | $c_4$ | Send to $b_5$ | $[3,4,4,1]$ |
> | $d_1$ | Send to $c_2$ | $[0,0,0,1]$ |
> | $d_2$ | Receive from $b_2$ | $[1,2,0,2]$ |
> | $d_3=e_2$ | Send to $b_6$ | $[1,2,0,3]$ |
>
> For instance, $b_5$ computes $\max([3,4,1,0],[3,4,4,1])+[0,1,0,0]=[3,5,4,1]$.
>
> $V(e_1)=[0,0,1,0]$ and $V(e_2)=[1,2,0,3]$ are incomparable: component 3 is larger in the first, while components 1, 2 and 4 are smaller. Therefore $e_1\not\to e_2$ and $e_1\parallel e_2$.
>
> Both vectors are strictly below $V(e_3)=[4,7,4,3]$, so $e_1\to e_3$ and $e_2\to e_3$.

### Exercise 2 — Second 4-Process Vector Clock Execution

![[DS-L5-slide-45-vector-exercise.png|680]]

Use the same process-based event labels. Here $e_1=a_2$, $e_2=b_1$, $e_3=a_4$, $e_4=b_6$, and $e_5=d_4$.

> [!example]- Annotated solution and event calculations
> ![[DS-L5-exercise-45-solution.svg|750]]
>
> | Event | Operation | Vector timestamp |
> | --- | --- | --- |
> | $a_1$ | Send to $b_1$ | $[1,0,0,0]$ |
> | $a_2=e_1$ | Send to $d_2$ | $[2,0,0,0]$ |
> | $a_3$ | Send to $b_6$ | $[3,0,0,0]$ |
> | $a_4=e_3$ | Receive from $c_4$ | $[4,4,4,3]$ |
> | $b_1=e_2$ | Receive from $a_1$ | $[1,1,0,0]$ |
> | $b_2$ | Receive from $d_1$ | $[1,2,0,1]$ |
> | $b_3$ | Receive from $c_1$ | $[1,3,1,1]$ |
> | $b_4$ | Send to $c_2$ | $[1,4,1,1]$ |
> | $b_5$ | Send to $d_4$ | $[1,5,1,1]$ |
> | $b_6=e_4$ | Receive from $a_3$ | $[3,6,1,1]$ |
> | $c_1$ | Send to $b_3$ | $[0,0,1,0]$ |
> | $c_2$ | Receive from $b_4$ | $[1,4,2,1]$ |
> | $c_3$ | Receive from $d_3$ | $[2,4,3,3]$ |
> | $c_4$ | Send to $a_4$ | $[2,4,4,3]$ |
> | $d_1$ | Send to $b_2$ | $[0,0,0,1]$ |
> | $d_2$ | Receive from $a_2$ | $[2,0,0,2]$ |
> | $d_3$ | Send to $c_3$ | $[2,0,0,3]$ |
> | $d_4=e_5$ | Receive from $b_5$ | $[2,5,1,4]$ |
>
> For example, $c_3$ computes $\max([1,4,2,1],[2,0,0,3])+[0,0,1,0]=[2,4,3,3]$.
>
> $V(e_1)=[2,0,0,0]$ and $V(e_2)=[1,1,0,0]$ are incomparable, so $e_1\not\to e_2$. Both are strictly below $V(e_3)=[4,4,4,3]$, establishing $e_1\to e_3$ and $e_2\to e_3$.
>
> Also, $V(e_1)<[3,6,1,1]=V(e_4)$ and $V(e_1)<[2,5,1,4]=V(e_5)$, so $e_1\to e_4$ and $e_1\to e_5$. The vectors of $e_3,e_4,e_5$ are pairwise incomparable, so those three events are pairwise concurrent.


### Exercise 3 — Reconstructing an Execution from Network Observations

An asynchronous system contains four processes using the vector-clock rules above. While observing $P_1$'s network card, we see an outgoing packet timestamped $[1,0,0,0]$ at `00:00`, then an incoming packet timestamped $[1,2,3,1]$ at `00:05`.

The questions are to draw a compatible execution, decide whether it is unique, and determine whether a compatible execution can contain a process that never sends a message.

The incoming packet carries the **sender's timestamp**, before $P_1$ processes the receive event. In the construction below, its receive timestamp is

$$
\max([1,0,0,0],[1,2,3,1])+[1,0,0,0]=[2,2,3,1].
$$

The packet's components suggest one event at $P_1$, two at $P_2$, three at $P_3$, and one at $P_4$ in the causal history of its send. Send and receive must count as separate events.

![[DS-L5-execution-reconstruction.svg|680]]

| Event | Operation | Vector timestamp |
| --- | --- | --- |
| $e_1$ at $P_1$ | Send to $P_2$, observed outgoing | $[1,0,0,0]$ |
| $e_2$ at $P_2$ | Receive from $e_1$ | $[1,1,0,0]$ |
| $e_3$ at $P_2$ | Send to $P_3$ | $[1,2,0,0]$ |
| $e_4$ at $P_4$ | Send to $P_3$ | $[0,0,0,1]$ |
| $e_5$ at $P_3$ | Receive from $e_3$ | $[1,2,1,0]$ |
| $e_6$ at $P_3$ | Receive from $e_4$ | $[1,2,2,1]$ |
| $e_7$ at $P_3$ | Send to $P_1$, observed incoming | $[1,2,3,1]$ |
| $e_8$ at $P_1$ | Receive from $e_7$ | $[2,2,3,1]$ |

This execution is **not unique**. If $P_3$ receives $P_4$'s message first, its vectors become $[0,0,1,1]$, then $[1,2,2,1]$ after receiving from $P_2$, and finally $[1,2,3,1]$ on sending to $P_1$. The observations are unchanged. Another construction can send $P_1$'s message directly to $P_3$ while $P_2$ performs a local event and sends $[0,2,0,0]$ to $P_3$.

A process that **never sends** cannot contribute positive causal knowledge to another process's vector:

$$
P_k\text{ never sends}\implies\forall i\ne k:\ V_i[k]=0.
$$

Here $P_1$ is observed sending, and the incoming packet has positive entries for every other process. Its sender counts its own send event; positive entries for the remaining processes require information to have left them. Thus every process must have sent at least one message in any compatible execution.

## Application of Scalar Clocks: Lamport's Distributed Mutual Exclusion

Vector clocks let us identify causal relationships and concurrency, which is useful for causal broadcast. Mutual exclusion needs a different service: a total order on requests to enter a **critical section (CS)**, so processes can coordinate exclusive access without a central coordinator. Scalar timestamps, supplemented with process IDs, are enough for this.

### The Mutual Exclusion (ME) Abstraction

![[DS-L5-slide-51-mutex-abstraction.png|760]]

The application issues `Request`, receives `Grant` when entry is allowed, and issues `Release` on leaving. The abstraction requires:

- **ME1 — Mutual exclusion:** at most one process is in the CS at any time.
- **ME2 — Liveness:** every requesting process eventually enters.
- **ME3 — Fairness:** if $p$'s request happens before $q$'s, then $q$ cannot enter before $p$.

### System Assumptions and Total Ordering of Requests

Lamport's algorithm assumes **no crashes** ($f=0$), FIFO perfect point-to-point links, and processes that eventually release the CS. A process waiting for an acknowledgment or release cannot otherwise be guaranteed to progress.

Concurrent requests can have equal scalar timestamps. To break ties, the slide code stores a timestamp as $\langle i,L_i\rangle$, but compares **clock value first, process ID second**:

$$
\operatorname{ts}(x)<\operatorname{ts}(y)
\iff L(x)<L(y)\ \lor\ \big(L(x)=L(y)\land\operatorname{id}(x)<\operatorname{id}(y)\big).
$$

Unique IDs make requests totally ordered, and the clock condition ensures that this order respects happened-before.

![[DS-L5-lamport-mutex-conditions.svg|780]]

### Lamport's Mutual Exclusion Protocol

Each process maintains a scalar clock, a set `Requests` of active requests, a set `Acks` of received acknowledgments, and its current request `my_req` (or $\bot$ when idle).

![[DS-L5-slide-53-lamport-mutex-code.png|780]]

When $p_i$ requests entry, it increments its clock and sends its timestamped `REQ` to all processes, including itself. On receiving any message, it first updates the scalar clock using the receive rule. It then handles the message as follows:

- **`REQ`:** add it to `Requests`, increment the clock for the send, and return a timestamped `ACK`.
- **`ACK`:** add it to `Acks`.
- **`RLS`:** remove the sender's active request from `Requests`.

A process with an active request can enter only when **both** conditions hold:

1. Its request has the smallest timestamp in its local `Requests` set.
2. It has an `ACK` from **every process**, timestamped later than its request.

The first condition chooses a winner among known requests. The second, together with FIFO delivery, prevents an earlier request from remaining hidden in transit while that winner enters. Old acknowledgments do not suffice: the timestamp test must hold for the current request.

On release, the process removes its own request, clears `my_req`, increments its clock and broadcasts `RLS`. Peers can then remove that request and reconsider their waiting requests.

### Step-by-Step Execution Example

In the following example, pairs are written as **(clock, ID)** for comparison. Initially all clocks are zero. An application message from $p_1$ advances $p_3$'s clock to 2. At clock 3, $p_3$ requests entry with timestamp $(3,3)$. Processes $p_1,p_2$ receive it at clock 4, record it, and acknowledge at clock 5.

At clock 6, $p_1$ also requests entry, with timestamp $(6,1)$.

![[DS-L5-slide-59-mutex-example-wait.png|740]]

Even after $p_1$ receives the required acknowledgments with timestamps later than its request, it must wait: its queue still contains $(3,3)<(6,1)$. Meanwhile, $p_3$ receives its remaining acknowledgment at clock 9. Its request is the smallest, so it enters.

![[DS-L5-slide-61-mutex-example-release.png|740]]

When $p_3$ releases at clock 10, it broadcasts `RLS`. At clock 11, $p_1$ receives it and removes $(3,3)$. Its own request is now smallest and its acknowledgments are already available, so it enters.

### Correctness Proofs and Performance

**Mutual exclusion.** Suppose two active requests $r_i,r_j$ overlap in the CS, with $\operatorname{ts}(r_i)<\operatorname{ts}(r_j)$. To enter, $p_j$ must have received an acknowledgment from $p_i$ timestamped later than $r_j$, hence later than $r_i$. Since $p_i$'s clock increases, it sent $r_i$ before sending that acknowledgment. FIFO delivery ensures that $p_j$ receives $r_i$ before the acknowledgment that permits entry. Because $r_i$ has not been released, it remains in $p_j$'s queue and is smaller than $r_j$, contradicting the entry condition.

**Fairness.** If $r_j\to r_i$, the clock condition gives $\operatorname{ts}(r_j)<\operatorname{ts}(r_i)$. Before entering for $r_i$, $p_i$ needs a later acknowledgment from $p_j$. Process $p_j$ sent $r_j$ before that acknowledgment, so FIFO delivers $r_j$ to $p_i$ first. Unless $p_j$ has already released it, the earlier request blocks $p_i$. Thus $p_i$ cannot enter ahead of $p_j$.

> [!warning] What Happens If Links Are NOT FIFO? (Slide 66 Homework)
> The FIFO step in these proofs is essential. Without it, an acknowledgment can overtake the sender's earlier request. For example, $p_j$ sends request $(1,j)$, then acknowledges $p_i$'s request $(2,i)$ at $(4,j)$. If $p_i$ sees the acknowledgment while $(1,j)$ is still in transit, it can satisfy both entry conditions prematurely. A full counterexample must also show $p_j$'s entry conditions and the overlapping CS intervals; the overtaking step alone does not establish simultaneous entry.

Each CS execution exchanges $N-1$ requests, $N-1$ acknowledgments and $N-1$ releases with remote processes:

$$
3(N-1)\text{ messages per CS execution}.
$$

With no competing request, entry needs one request–acknowledgment round trip, or two message transmission delays in the simplified timing model.

## Sources

- [Local time and logical-clock slides](<Assets/SLIDES/DS-2425Time2.pdf>): happened-before, histories and vector clocks; exercises on slides 43–45; mutual exclusion on slides 51–66. The filename is from an older academic year; current-year alignment remains unverified.
- [Lesson 5 transcript](<Assets/TRANSCRIPTED DS/DS LESSON 5 transcripted.md>), a secondary transcription of the explanations and examples.
