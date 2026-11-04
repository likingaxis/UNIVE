#### Logical Time and the Happened-Before Relation

##### Why Logical Time?
- Physical clocks in a distributed system cannot be synchronized with zero error: whenever two events are separated by less than $2D$ (where $D$ is the synchronization accuracy bound), their physical timestamps cannot determine which event occurred first.
- For most distributed algorithms, however, knowing the exact wall-clock UTC instant of an event is unnecessary; what matters is whether one event could **causally affect** another.
- **Logical Time** replaces physical timestamps with mathematical counters or structures that capture **cause-and-effect relationships** directly from process execution and message passing.

---

##### Events and the Happened-Before Relation ($\to$)

###### Process Execution and Local Ordering ($\to_i$)
- A distributed system consists of $N$ sequential processes $P_1, P_2, \dots, P_N$.
- Each process executes a sequence of **events** of three kinds:
  1. **Local (internal) computation event**
  2. **Message send event**: $\operatorname{send}(m)$
  3. **Message receive event**: $\operatorname{receive}(m)$
- Within a single sequential process $P_i$, events occur one after another in a well-defined total order denoted $\to_i$: if $e$ occurs before $e'$ on process $P_i$, we write $e \to_i e'$.

![[DS-L5-local-order.svg|520]]

###### Formal Definition of Happened-Before ($\to$)

> **Happened-Before Relation ($\to$)**: Lamport's **happened-before** (or **causal precedence**) relation $\to$ is the smallest relation on the set of system events satisfying the following three rules:
> 1. **Local Ordering**: If $e$ and $e'$ occur on the same process $P_i$ and $e \to_i e'$, then $e \to e'$.
> 2. **Send–Receive Ordering**: If $e = \operatorname{send}(m)$ is the sending of a message $m$ and $e' = \operatorname{receive}(m)$ is the reception of that same message $m$, then $e \to e'$.
> 3. **Transitivity**: If there exists an event $e''$ such that $e \to e''$ and $e'' \to e'$, then $e \to e'$.

![[DS-L5-causal-path.svg|580]]

- **Causal Path Interpretation**: $e \to e'$ holds if and only if there is a directed **causal path** of local process steps and message arrows leading forward in time from $e$ to $e'$.
- **Asymmetry of Unacknowledged Sends**: Sending a message establishes $e_{\text{send}} \to e_{\text{recv}}$, meaning the receiver learns about the sender's prior state, **not** vice versa. For the sender to know that its message was received, the receiver must send a causal reply (such as an `ACK`) back to the sender.

![[DS-L5-scalar-ack.svg|480]]

---

##### Concurrency ($\parallel$) and Partial Order

> **Concurrent Events ($\parallel$)**: Two distinct events $e$ and $e'$ are **concurrent**, written $e \parallel e'$, if neither happened before the other:
> $$e \parallel e' \iff \neg(e \to e') \land \neg(e' \to e)$$

![[DS-L5-concurrency.svg|480]]

- **Meaning of Concurrency**: $e \parallel e'$ does **not** mean $e$ and $e'$ occurred at the exact same physical instant; it means **no causal information could have flowed** from $e$ to $e'$ or from $e'$ to $e$.
- **Strict Partial Order (POSET)**:
  - The relation $\to$ is **irreflexive** ($\neg(e \to e)$), **asymmetric** ($e \to e' \implies \neg(e' \to e)$), and **transitive**, so it forms a **strict partial order** on the set of events (not a total order, because concurrent events are incomparable).
  - **Concurrency is NOT transitive**: for example, if $e_1$ and $e_2$ are on the same process ($e_1 \to e_2$) and $e_3$ is an isolated event on another process with no messages exchanged, then $e_1 \parallel e_3$ and $e_3 \parallel e_2$, yet $e_1 \not\parallel e_2$ because $e_1 \to e_2$.

###### Example: Evaluating Causal Precedence and Concurrency
- Consider a 3-process execution with messages $S_1: e_1 \to e_3$ (from $P_1$ to $P_2$) and $S_2: e_4 \to e_6$ (from $P_2$ to $P_3$), where:
  - $P_1$ executes $e_1$ then $e_2$ ($e_1 \to_1 e_2$)
  - $P_2$ executes $e_3$ then $e_4$ ($e_3 \to_2 e_4$)
  - $P_3$ executes $e_5$ then $e_6$ ($e_5 \to_3 e_6$)
- **Causal chains**:
  - $e_1 \to e_3$ (via $S_1$), $e_3 \to e_4$ (local on $P_2$), and $e_4 \to e_6$ (via $S_2$), so by transitivity **$e_1 \to e_6$**.
  - $e_5 \to e_6$ (local on $P_3$).
- **Concurrent pairs**:
  - **$e_2 \parallel e_3$**: $e_2$ occurs on $P_1$ *after* $S_1$ was already sent at $e_1$, so no causal path leads from $e_2$ to $e_3$ or from $e_3$ to $e_2$.
  - **$e_4 \parallel e_5$**: $e_5$ occurs on $P_3$ *before* $S_2$ arrives at $e_6$, so neither can influence the other.

---

#### Scalar Clocks (Lamport Logical Clocks)

##### The Clock Condition and Update Algorithm
- A **Scalar (or Lamport) Logical Clock** assigns a single integer timestamp $L(e) \in \mathbb{N}$ to each event $e$ so as to preserve causal precedence:

> **Clock Condition**: For any two events $e$ and $e'$:
> $$e \to e' \implies L(e) < L(e')$$

###### Algorithm Rules
- Each process $P_i$ maintains a local integer counter $L_i$, initialized to $0$:
  1. **Initialization**:
     $$L_i \gets 0$$
  2. **Local Event or Send Event at $P_i$**: Before timestamping a local event or sending a message $m$, $P_i$ increments its counter by $1$:
     $$L_i \gets L_i + 1$$
     If the event is $\operatorname{send}(m)$, $P_i$ attaches the updated timestamp $t_m = L_i$ to message $m$.
  3. **Receive Event at $P_i$**: Upon receiving message $(m, t_m)$, $P_i$ sets its clock to be strictly greater than both its previous local value and the incoming message timestamp:
     $$L_i \gets \max(L_i, t_m) + 1$$

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

##### Proof that $e \to e' \implies L(e) < L(e')$
- If $e \to e'$, there exists a causal path $e = e_1 \to e_2 \to \dots \to e_k = e'$ where each step $e_r \to e_{r+1}$ is either:
  - **Same process ($e_r \to_i e_{r+1}$)**: every subsequent event on $P_i$ increments $L_i$ by at least $1$, so $L(e_r) < L(e_{r+1})$.
  - **Message send–receive ($e_r = \operatorname{send}(m), \; e_{r+1} = \operatorname{receive}(m)$)**: the message carries $t_m = L(e_r)$, and the receiver sets $L(e_{r+1}) = \max(L_j, L(e_r)) + 1 \ge L(e_r) + 1 > L(e_r)$.
- By induction along the path, $L(e_1) < L(e_2) < \dots < L(e_k)$, hence $L(e) < L(e')$. $\blacksquare$

##### Worked Example and Fundamental Limitation of Scalar Clocks

![[DS-L5-slide-20-scalar-trace.png|650]]

- **Why the Converse Fails ($L(e) < L(e') \not\implies e \to e'$)**:
  - Consider two processes $P_0$ and $P_1$ that do not exchange any messages initially:
    - $P_0$ executes local event $e_0$ $\implies L(e_0) = 1$, then $e_2$ $\implies L(e_2) = 2$.
    - Independently, $P_1$ executes local event $e_1$ $\implies L(e_1) = 1$.
  - Here $L(e_1) = 1 < 2 = L(e_2)$, yet **$e_1 \parallel e_2$** (no causal path exists between $e_1$ and $e_2$)!

![[DS-L5-scalar-concurrent-events.svg|500]]

- **Conclusion**: Scalar clocks only satisfy a **one-way implication**:
  - If $e \to e'$, then $L(e) < L(e')$ (so if $L(e) \ge L(e')$, we know for sure that $e \not\to e'$).
  - However, observing $L(e) < L(e')$ **cannot distinguish** whether $e \to e'$ or $e \parallel e'$.

---

#### Complete Causal Histories

##### Intuition and Update Rules
- To obtain an **if-and-only-if** characterization of causality ($e \to e' \iff C(e) < C(e')$), each event's timestamp must record the **exact set of all events that causally preceded it** (plus the event itself).
- For an $N$-process system $(P_0, P_1, \dots, P_{N-1})$, the **Complete Causal History** of event $e$ is a tuple of $N$ ordered lists (one list per process):

$$H(e) = [\operatorname{History}_{P_0}(e), \; \operatorname{History}_{P_1}(e), \; \dots, \; \operatorname{History}_{P_{N-1}}(e)]$$

- **Update Rules at Process $P_i$**:
  1. **Initialization**: Every process starts with $N$ empty lists $H_i = [\,[\,], [\,], \dots, [\,]\,]$.
  2. **Local Event or Send Event $e$ at $P_i$**: Append $e$ to $P_i$'s own list $\operatorname{History}_{P_i}$; if sending a message, attach the updated history $H_i$ to the message.
  3. **Receive Event $e$ at $P_i$ (receiving message history $H_m$)**:
     - For each process $k \in \{0, \dots, N-1\}$, merge the two histories by taking their union (which is simply the **longer list** between $H_i[k]$ and $H_m[k]$).
     - Append the new receive event $e$ to $P_i$'s own list $H_i[i]$.

![[DS-L5-causal-history-update.svg|700]]

##### Comparing Causal Histories and Bidirectional Proof
- Given two causal histories $H(e)$ and $H(e')$:

$$H(e) < H(e') \iff \Big(\forall k: H(e)[k] \text{ is a prefix of } H(e')[k]\Big) \land \Big(\exists j: H(e)[j] \text{ is a proper prefix of } H(e')[j]\Big)$$

- **Example from the trace above**:
  - Compare $e_2$ ($H(e_2) = [[e_0, e_2], [\,]]$) and $e_4$ ($H(e_4) = [[e_0, e_2], [e_1, e_3, e_4]]$):
    - Component $0$: $[e_0, e_2]$ is a prefix of $[e_0, e_2]$.
    - Component $1$: $[\,]$ is a proper prefix of $[e_1, e_3, e_4]$.
    - Therefore $H(e_2) < H(e_4) \implies e_2 \to e_4$.
  - Compare $e_1$ ($H(e_1) = [[\,], [e_1]]$) and $e_2$ ($H(e_2) = [[e_0, e_2], [\,]]$):
    - Neither is component-wise a prefix of the other $\implies e_1 \parallel e_2$.

###### Proof that $e \to e' \iff H(e) < H(e')$
1. **Forward Direction ($e \to e' \implies H(e) < H(e')$)**:
   - Along any causal path from $e$ to $e'$, local steps append events and message receptions take component-wise unions before appending the receive event. Thus no previously known event is ever lost, and at $e'$ (which is distinct from $e$) at least $e'$ itself has been newly added, so $H(e)$ is a strict prefix of $H(e')$.
2. **Reverse Direction ($H(e) < H(e') \implies e \to e'$)**:
   - By construction, event $e$ on $P_i$ is recorded inside $H(e)[i]$. If $H(e) < H(e')$, then $H(e)[i]$ is a prefix of $H(e')[i]$, which means $e \in H(e')[i]$.
   - Because information about $e$ can only reach the process executing $e'$ through local steps and messages, there must exist a directed causal path from $e$ to $e'$, hence $e \to e'$. $\blacksquare$

---

#### From Causal Histories to Vector Clocks

##### The Prefix Property: Compressing Lists into Lengths
- Full causal histories grow unboundedly in size as the number of events increases, making them too expensive to attach to every network packet.
- **Key Observation (Prefix Property)**:
  - Because each process $P_x$ is sequential, only $P_x$ generates events for component $x$, and it always appends them in the single fixed sequence $e_x^1, e_x^2, e_x^3, \dots$
  - Consequently, it is **impossible** for two histories in the system to contain diverging lists for the same process $P_x$ (such as $[e_0, e_1, e_2]$ vs. $[e_0, e_1, e_3]$).
  - Any valid history entry $\operatorname{History}_x$ is uniquely determined by how many events of $P_x$ it contains!

![[DS-L5-prefix-property.svg|450]]

> **Prefix Property**: For any fixed process $P_x$, one history list $\operatorname{History}_x$ is a proper prefix of another list $\operatorname{History}_x'$ if and only if its length is strictly smaller:
> $$\operatorname{History}_x \subset \operatorname{History}_x' \iff \operatorname{len}(\operatorname{History}_x) < \operatorname{len}(\operatorname{History}_x')$$

- Replacing each list $\operatorname{History}_{P_k}(e)$ in $H(e)$ with its integer length $|\operatorname{History}_{P_k}(e)|$ compresses the unbounded history into a fixed-size array of $N$ integers — a **Vector Clock**:

$$V(e) = \Big[\,|\operatorname{History}_{P_0}(e)|, \; |\operatorname{History}_{P_1}(e)|, \; \dots, \; |\operatorname{History}_{P_{N-1}}(e)|\,\Big]$$

![[DS-L5-slide-37-history-to-vector.png|650]]

---

##### Vector Clock Algorithm and Comparison Rules

###### Vector Clock Structure
- In a system of $N$ processes, each process $P_i$ maintains an array of $N$ integers $V_i[1 \dots N]$ (or $0 \dots N-1$):
  - **$V_i[i]$**: the number of events that have occurred on process $P_i$ itself so far.
  - **$V_i[j]$ ($j \ne i$)**: the number of events on process $P_j$ that have causally preceded $P_i$'s current state.

###### Update Rules
1. **Initialization**:
   $$V_i \gets [0, 0, \dots, 0]$$
2. **Local Event or Send Event at $P_i$**: Increment $P_i$'s own component by $1$:
   $$V_i[i] \gets V_i[i] + 1$$
   If sending message $m$, attach a copy of the updated vector $V_m = V_i$ to $m$.
3. **Receive Event at $P_i$ (upon receiving $(m, V_m)$)**:
   - First, merge causal knowledge via the **component-wise maximum** (corresponding to taking the longer history in each entry):
     $$\forall k \in \{1, \dots, N\}: \quad V_i[k] \gets \max(V_i[k], \; V_m[k])$$
   - Second, increment the **receiver's own** component to count the receive event itself:
     $$V_i[i] \gets V_i[i] + 1$$

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

###### Component-Wise Vector Comparisons
- Given two $N$-element vectors $V$ and $V'$:
  - **Equality ($=$)**:
    $$V = V' \iff \forall k: V[k] = V'[k]$$
  - **Less than or equal ($\le$)**:
    $$V \le V' \iff \forall k: V[k] \le V'[k]$$
  - **Strictly less than ($<$)**: Every component of $V$ is $\le$ the corresponding component of $V'$, and **at least one** component is strictly smaller:
    $$V < V' \iff (V \le V') \land (V \ne V') \iff \Big(\forall k: V[k] \le V'[k]\Big) \land \Big(\exists j: V[j] < V'[j]\Big)$$
  - **Concurrency ($\parallel$)**: Neither vector is $\le$ the other (one vector is strictly larger in some index $a$, while the other is strictly larger in some index $b$):
    $$V \parallel V' \iff \neg(V \le V') \land \neg(V' \le V)$$

![[Pasted image 20261026140027.png|650]]

> **Strong Clock Condition (Vector Clocks)**: For any two distinct events $e$ and $e'$:
> $$\boxed{e \to e' \iff V(e) < V(e')} \qquad \text{and} \qquad \boxed{e \parallel e' \iff V(e) \parallel V(e')}$$

###### Summary Comparison: Scalar Clocks vs. Vector Clocks

| Property | Scalar (Lamport) Clock $L(e)$ | Vector Clock $V(e)$ |
| :--- | :--- | :--- |
| **Timestamp Size** | $1$ integer ($O(1)$) | $N$ integers ($O(N)$, where $N$ = number of processes) |
| **Forward Implication** | $e \to e' \implies L(e) < L(e')$ ($\checkmark$) | $e \to e' \implies V(e) < V(e')$ ($\checkmark$) |
| **Reverse Implication** | $L(e) < L(e') \not\implies e \to e'$ ($\times$) | $V(e) < V(e') \implies e \to e'$ ($\checkmark$) |
| **Detects Concurrency ($e \parallel e'$)?** | **No** | **Yes** ($V(e) \not\le V(e') \land V(e') \not\le V(e)$) |

---

#### Worked Examples and Exercises

##### Worked 3-Process Example

![[DS-L5-slide-43-vector-example.png|680]]

- Let $e_i^j$ denote the $j$-th local event on process $P_i$ ($i \in \{1, 2, 3\}$), starting from $[0, 0, 0]$:

| Process | Event | Operation | Computation | Vector Timestamp $V(e)$ |
| :---: | :---: | :--- | :--- | :---: |
| **$P_1$** | $e_1^1$ | Local event | Increment $V_1[1]$ | $[1, 0, 0]$ |
| **$P_1$** | $e_1^2$ | Send to $P_2$ ($e_2^1$) | Increment $V_1[1]$ | $[2, 0, 0]$ |
| **$P_1$** | $e_1^3$ | Send to $P_3$ ($e_3^3$) | Increment $V_1[1]$ | $[3, 0, 0]$ |
| **$P_1$** | $e_1^4$ | Receive from $P_2$ ($e_2^3$) | $\max([3,0,0], [2,3,2]) + [1,0,0]$ | $[4, 3, 2]$ |
| **$P_2$** | $e_2^1$ | Receive from $P_1$ ($e_1^2$) | $\max([0,0,0], [2,0,0]) + [0,1,0]$ | $[2, 1, 0]$ |
| **$P_2$** | $e_2^2$ | Receive from $P_3$ ($e_3^2$) | $\max([2,1,0], [0,0,2]) + [0,1,0]$ | $[2, 2, 2]$ |
| **$P_2$** | $e_2^3$ | Send to $P_1$ ($e_1^4$) | Increment $V_2[2]$ | $[2, 3, 2]$ |
| **$P_3$** | $e_3^1$ | Local event | Increment $V_3[3]$ | $[0, 0, 1]$ |
| **$P_3$** | $e_3^2$ | Send to $P_2$ ($e_2^2$) | Increment $V_3[3]$ | $[0, 0, 2]$ |
| **$P_3$** | $e_3^3$ | Receive from $P_1$ ($e_1^3$) | $\max([0,0,2], [3,0,0]) + [0,0,1]$ | $[3, 0, 3]$ |

- **Causal Checks**:
  - **$e_3^1$ vs. $e_1^4$**: $V(e_3^1) = [0, 0, 1] < [4, 3, 2] = V(e_1^4) \implies \mathbf{e_3^1 \to e_1^4}$ (via path $e_3^1 \to e_3^2 \to e_2^2 \to e_2^3 \to e_1^4$).
  - **$e_1^4$ vs. $e_3^3$**: $V(e_1^4) = [4, 3, 2]$ and $V(e_3^3) = [3, 0, 3]$. In index $1$, $4 > 3$; in index $3$, $2 < 3$. Neither is $\le$ the other $\implies \mathbf{e_1^4 \parallel e_3^3}$.

---

##### Exercise 1 — 4-Process Vector Clock Execution

![[DS-L5-slide-44-vector-exercise.png|680]]

###### Annotated Solution Diagram

![[DS-L5-exercise-44-solution.svg|750]]

###### Step-by-Step Event Table
- Label the events from left to right on each process:
  - $P_1$: $a_1, a_2, a_3, a_4$ (where **$a_4 = e_3$**)
  - $P_2$: $b_1, b_2, b_3, b_4, b_5, b_6, b_7$
  - $P_3$: $c_1, c_2, c_3, c_4$ (where **$c_1 = e_1$**)
  - $P_4$: $d_1, d_2, d_3$ (where **$d_3 = e_2$**)

| Process | Event | Operation | Vector Calculation | Vector Clock |
| :---: | :---: | :--- | :--- | :---: |
| **$P_1$** | $a_1$ | Send to $P_2$ ($b_1$) | $[0,0,0,0] + [1,0,0,0]$ | $[1, 0, 0, 0]$ |
| **$P_1$** | $a_2$ | Receive from $P_3$ ($c_1$) | $\max([1,0,0,0], [0,0,1,0]) + [1,0,0,0]$ | $[2, 0, 1, 0]$ |
| **$P_1$** | $a_3$ | Send to $P_2$ ($b_3$) | $[2,0,1,0] + [1,0,0,0]$ | $[3, 0, 1, 0]$ |
| **$P_1$** | $a_4 = \mathbf{e_3}$ | Receive from $P_2$ ($b_7$) | $\max([3,0,1,0], [3,7,4,3]) + [1,0,0,0]$ | $\mathbf{[4, 7, 4, 3]}$ |
| **$P_2$** | $b_1$ | Receive from $P_1$ ($a_1$) | $\max([0,0,0,0], [1,0,0,0]) + [0,1,0,0]$ | $[1, 1, 0, 0]$ |
| **$P_2$** | $b_2$ | Send to $P_4$ ($d_2$) | $[1,1,0,0] + [0,1,0,0]$ | $[1, 2, 0, 0]$ |
| **$P_2$** | $b_3$ | Receive from $P_1$ ($a_3$) | $\max([1,2,0,0], [3,0,1,0]) + [0,1,0,0]$ | $[3, 3, 1, 0]$ |
| **$P_2$** | $b_4$ | Send to $P_3$ ($c_3$) | $[3,3,1,0] + [0,1,0,0]$ | $[3, 4, 1, 0]$ |
| **$P_2$** | $b_5$ | Receive from $P_3$ ($c_4$) | $\max([3,4,1,0], [3,4,4,1]) + [0,1,0,0]$ | $[3, 5, 4, 1]$ |
| **$P_2$** | $b_6$ | Receive from $P_4$ ($d_3$) | $\max([3,5,4,1], [1,2,0,3]) + [0,1,0,0]$ | $[3, 6, 4, 3]$ |
| **$P_2$** | $b_7$ | Send to $P_1$ ($a_4$) | $[3,6,4,3] + [0,1,0,0]$ | $[3, 7, 4, 3]$ |
| **$P_3$** | $c_1 = \mathbf{e_1}$ | Send to $P_1$ ($a_2$) | $[0,0,0,0] + [0,0,1,0]$ | $\mathbf{[0, 0, 1, 0]}$ |
| **$P_3$** | $c_2$ | Receive from $P_4$ ($d_1$) | $\max([0,0,1,0], [0,0,0,1]) + [0,0,1,0]$ | $[0, 0, 2, 1]$ |
| **$P_3$** | $c_3$ | Receive from $P_2$ ($b_4$) | $\max([0,0,2,1], [3,4,1,0]) + [0,0,1,0]$ | $[3, 4, 3, 1]$ |
| **$P_3$** | $c_4$ | Send to $P_2$ ($b_5$) | $[3,4,3,1] + [0,0,1,0]$ | $[3, 4, 4, 1]$ |
| **$P_4$** | $d_1$ | Send to $P_3$ ($c_2$) | $[0,0,0,0] + [0,0,0,1]$ | $[0, 0, 0, 1]$ |
| **$P_4$** | $d_2$ | Receive from $P_2$ ($b_2$) | $\max([0,0,0,1], [1,2,0,0]) + [0,0,0,1]$ | $[1, 2, 0, 2]$ |
| **$P_4$** | $d_3 = \mathbf{e_2}$ | Send to $P_2$ ($b_6$) | $[1,2,0,2] + [0,0,0,1]$ | $\mathbf{[1, 2, 0, 3]}$ |

###### Evaluating the Causal Statements
1. **Is $e_1 \to e_2$?**
   - Compare $V(e_1) = [0, 0, 1, 0]$ and $V(e_2) = [1, 2, 0, 3]$.
   - Component $3$ has $1 > 0$, while components $1, 2, 4$ have $0 < 1, 2, 3$. Neither vector is $\le$ the other ($e_1 \parallel e_2$).
   - **Statement $e_1 \to e_2$ is FALSE.**
2. **Is $e_1 \to e_3$?**
   - Compare $V(e_1) = [0, 0, 1, 0]$ and $V(e_3) = [4, 7, 4, 3]$.
   - $[0, 0, 1, 0] < [4, 7, 4, 3]$ holds component-wise.
   - **Statement $e_1 \to e_3$ is TRUE.**
3. **Is $e_2 \to e_3$?**
   - Compare $V(e_2) = [1, 2, 0, 3]$ and $V(e_3) = [4, 7, 4, 3]$.
   - $[1, 2, 0, 3] < [4, 7, 4, 3]$ holds component-wise.
   - **Statement $e_2 \to e_3$ is TRUE.**

---

##### Exercise 2 — Second 4-Process Vector Clock Execution

![[DS-L5-slide-45-vector-exercise.png|680]]

###### Annotated Solution Diagram

![[DS-L5-exercise-45-solution.svg|750]]

###### Step-by-Step Event Table
- Label the events from left to right on each process:
  - $P_1$: $a_1, a_2, a_3, a_4$ (where **$a_2 = e_1$** and **$a_4 = e_3$**)
  - $P_2$: $b_1, b_2, b_3, b_4, b_5, b_6$ (where **$b_1 = e_2$** and **$b_6 = e_4$**)
  - $P_3$: $c_1, c_2, c_3, c_4$
  - $P_4$: $d_1, d_2, d_3, d_4$ (where **$d_4 = e_5$**)

| Process | Event | Operation | Vector Calculation | Vector Clock |
| :---: | :---: | :--- | :--- | :---: |
| **$P_1$** | $a_1$ | Send to $P_2$ ($b_1$) | $[0,0,0,0] + [1,0,0,0]$ | $[1, 0, 0, 0]$ |
| **$P_1$** | $a_2 = \mathbf{e_1}$ | Send to $P_4$ ($d_2$) | $[1,0,0,0] + [1,0,0,0]$ | $\mathbf{[2, 0, 0, 0]}$ |
| **$P_1$** | $a_3$ | Send to $P_2$ ($b_6$) | $[2,0,0,0] + [1,0,0,0]$ | $[3, 0, 0, 0]$ |
| **$P_1$** | $a_4 = \mathbf{e_3}$ | Receive from $P_3$ ($c_4$) | $\max([3,0,0,0], [2,4,4,3]) + [1,0,0,0]$ | $\mathbf{[4, 4, 4, 3]}$ |
| **$P_2$** | $b_1 = \mathbf{e_2}$ | Receive from $P_1$ ($a_1$) | $\max([0,0,0,0], [1,0,0,0]) + [0,1,0,0]$ | $\mathbf{[1, 1, 0, 0]}$ |
| **$P_2$** | $b_2$ | Receive from $P_4$ ($d_1$) | $\max([1,1,0,0], [0,0,0,1]) + [0,1,0,0]$ | $[1, 2, 0, 1]$ |
| **$P_2$** | $b_3$ | Receive from $P_3$ ($c_1$) | $\max([1,2,0,1], [0,0,1,0]) + [0,1,0,0]$ | $[1, 3, 1, 1]$ |
| **$P_2$** | $b_4$ | Send to $P_3$ ($c_2$) | $[1,3,1,1] + [0,1,0,0]$ | $[1, 4, 1, 1]$ |
| **$P_2$** | $b_5$ | Send to $P_4$ ($d_4$) | $[1,4,1,1] + [0,1,0,0]$ | $[1, 5, 1, 1]$ |
| **$P_2$** | $b_6 = \mathbf{e_4}$ | Receive from $P_1$ ($a_3$) | $\max([1,5,1,1], [3,0,0,0]) + [0,1,0,0]$ | $\mathbf{[3, 6, 1, 1]}$ |
| **$P_3$** | $c_1$ | Send to $P_2$ ($b_3$) | $[0,0,0,0] + [0,0,1,0]$ | $[0, 0, 1, 0]$ |
| **$P_3$** | $c_2$ | Receive from $P_2$ ($b_4$) | $\max([0,0,1,0], [1,4,1,1]) + [0,0,1,0]$ | $[1, 4, 2, 1]$ |
| **$P_3$** | $c_3$ | Receive from $P_4$ ($d_3$) | $\max([1,4,2,1], [2,0,0,3]) + [0,0,1,0]$ | $[2, 4, 3, 3]$ |
| **$P_3$** | $c_4$ | Send to $P_1$ ($a_4$) | $[2,4,3,3] + [0,0,1,0]$ | $[2, 4, 4, 3]$ |
| **$P_4$** | $d_1$ | Send to $P_2$ ($b_2$) | $[0,0,0,0] + [0,0,0,1]$ | $[0, 0, 0, 1]$ |
| **$P_4$** | $d_2$ | Receive from $P_1$ ($a_2$) | $\max([0,0,0,1], [2,0,0,0]) + [0,0,0,1]$ | $[2, 0, 0, 2]$ |
| **$P_4$** | $d_3$ | Send to $P_3$ ($c_3$) | $[2,0,0,2] + [0,0,0,1]$ | $[2, 0, 0, 3]$ |
| **$P_4$** | $d_4 = \mathbf{e_5}$ | Receive from $P_2$ ($b_5$) | $\max([2,0,0,3], [1,5,1,1]) + [0,0,0,1]$ | $\mathbf{[2, 5, 1, 4]}$ |

###### Evaluating the Causal Statements
- **$e_1 \to e_2$**: $V(e_1) = [2,0,0,0]$ vs. $V(e_2) = [1,1,0,0]$ $\implies$ **FALSE** ($e_1 \parallel e_2$).
- **$e_1 \to e_3$**: $V(e_1) = [2,0,0,0] < [4,4,4,3] = V(e_3)$ $\implies$ **TRUE**.
- **$e_2 \to e_3$**: $V(e_2) = [1,1,0,0] < [4,4,4,3] = V(e_3)$ $\implies$ **TRUE**.
- **$e_1 \to e_4$**: $V(e_1) = [2,0,0,0] < [3,6,1,1] = V(e_4)$ $\implies$ **TRUE**.
- **$e_1 \to e_5$**: $V(e_1) = [2,0,0,0] < [2,5,1,4] = V(e_5)$ $\implies$ **TRUE**.
- **$e_3, e_4, e_5$ pairwise**: $[4,4,4,3]$, $[3,6,1,1]$, and $[2,5,1,4]$ are all pairwise incomparable $\implies$ **$e_3 \parallel e_4 \parallel e_5$**.

---

##### Exercise 3 — Reconstructing an Execution from Network Observations

###### Problem Statement
- Consider an asynchronous distributed system with $4$ processes $(P_1, P_2, P_3, P_4)$ communicating over point-to-point links using Vector Clocks.
- While debugging $P_1$'s **network card (NIC)**, we intercept two packets:
  1. At `00:00`: an **outgoing** message sent by $P_1$ carrying timestamp **$[1, 0, 0, 0]$**.
  2. At `00:05`: an **incoming** message addressed to $P_1$ carrying timestamp **$[1, 2, 3, 1]$**.
- **Questions**:
  - **Q3.1**: Draw a global execution compatible with these observations. Is the execution unique?
  - **Q3.2**: Can there be a compatible execution in which at least one process **never sends any message**?

###### Crucial Observation: In-Flight Packet Timestamp vs. Post-Receive Timestamp
- Because the incoming packet is intercepted at $P_1$'s network interface **before** $P_1$ processes the receive event, $[1, 2, 3, 1]$ is the **sender's vector clock** at the moment the packet was sent.
- Once $P_1$ actually processes the receive event ($e_8$), $P_1$'s own vector clock will become:

$$\max([1,0,0,0], \; [1,2,3,1]) + [1,0,0,0] = [2, 2, 3, 1]$$

###### Step-by-Step Construction of a Compatible Execution (Q3.1)
- Reading the components of the incoming packet $[1, 2, 3, 1]$ tells us how many events occurred at each process in the causal past of the send event:
  - $1$ event on $P_1$ (the outgoing send `[1,0,0,0]` observed at `00:00`)
  - $2$ events on $P_2$ (e.g., $1$ receive from $P_1$ + $1$ send to $P_3$)
  - $3$ events on $P_3$ (e.g., $1$ receive from $P_2$ + $1$ receive from $P_4$ + $1$ send to $P_1$)
  - $1$ event on $P_4$ (e.g., $1$ send to $P_3$)
- *(Remember: each receive and each send is a separate event that increments the local component by $1$; a process cannot receive and forward a message while incrementing its component only once!)*

![[DS-L5-execution-reconstruction.svg|680]]

| Event | Process | Operation | Vector Clock After Event |
| :---: | :---: | :--- | :---: |
| **$e_1$** | $P_1$ | Send to $P_2$ *(observed outgoing at `00:00`)* | **$[1, 0, 0, 0]$** |
| **$e_2$** | $P_2$ | Receive from $P_1$ ($e_1$) | $[1, 1, 0, 0]$ |
| **$e_3$** | $P_2$ | Send to $P_3$ ($e_5$) | $[1, 2, 0, 0]$ |
| **$e_4$** | $P_4$ | Send to $P_3$ ($e_6$) | $[0, 0, 0, 1]$ |
| **$e_5$** | $P_3$ | Receive from $P_2$ ($e_3$) | $[1, 2, 1, 0]$ |
| **$e_6$** | $P_3$ | Receive from $P_4$ ($e_4$) | $[1, 2, 2, 1]$ |
| **$e_7$** | $P_3$ | Send to $P_1$ *(observed incoming at `00:05`)* | **$[1, 2, 3, 1]$** |
| **$e_8$** | $P_1$ | Receive from $P_3$ ($e_7$) *(after NIC observation)* | $[2, 2, 3, 1]$ |

###### Is the Execution Unique? (Q3.1)
- **No, the execution is NOT unique.**
- For example, on $P_3$, if the message from $P_4$ ($[0,0,0,1]$) arrives **before** the message from $P_2$ ($[1,2,0,0]$):
  1. $P_3$'s first receive (from $P_4$) yields $[0, 0, 1, 1]$.
  2. $P_3$'s second receive (from $P_2$) yields $\max([0,0,1,1], [1,2,0,0]) + [0,0,1,0] = [1, 2, 2, 1]$.
  3. $P_3$'s send to $P_1$ yields $[1, 2, 3, 1]$.
- Both executions produce the exact same observations at $P_1$. (Similarly, $P_2$ could execute a local event $[0,1,0,0]$ before sending $[0,2,0,0]$ to $P_3$, while $P_1$'s message goes directly to $P_3$, etc.)

###### Can One Process Never Send Messages? (Q3.2)
- **No, not in this execution.**
- **General Invariant for a Silent Process**: If a process $P_k$ never sends any message, it can still increment its own local counter $V_k[k]$ via local events, but no other process can ever learn about $P_k$'s events:

$$P_k \text{ never sends a message} \implies \forall i \ne k: \; V_i[k] = 0$$

- In our observation, $P_1$ sent the outgoing message at `00:00`, and the incoming packet $[1, 2, 3, 1]$ sent to $P_1$ by another process has **strictly positive entries in all four components** ($V_m[2] = 2 > 0$, $V_m[3] = 3 > 0$, $V_m[4] = 1 > 0$).
- Therefore, information from every process $P_1, P_2, P_3, P_4$ must have been transmitted across the network, which requires **every process to have sent at least one message**.

---

#### 9. Application of Scalar Clocks: Lamport's Distributed Mutual Exclusion

On slide 46 we saw that different logical time mechanisms solve different distributed problems:
- **Vector Timestamps** $\longrightarrow$ **Causal Broadcast** (where exact causal concurrency detection $V(e) < V(e') \iff e \to e'$ is needed).
- **Scalar Timestamps** $\longrightarrow$ **Lamport's Distributed Mutual Exclusion** (where we need a **total order** on Critical Section requests that extends the happened-before relation).

---

##### 9.1 The Mutual Exclusion (ME) Abstraction

Processes in a distributed system often need exclusive access to a shared resource or **Critical Section (CS)** without relying on a central coordinator.

![[DS-L5-slide-51-mutex-abstraction.png|760]]

> **Mutual Exclusion Abstraction:**
> - **Events:**
>   - $\langle \text{Request} \rangle$ *(from upper layer)*: requests access to the Critical Section (CS).
>   - $\langle \text{Grant} \rangle$ *(to upper layer)*: grants exclusive access to enter the CS.
>   - $\langle \text{Release} \rangle$ *(from upper layer)*: notifies that the process has exited the CS.
> - **Properties:**
>   - **ME1 — Mutual Exclusion (Safety):** At any time $t$, at most one process is inside the CS.
>   - **ME2 — Liveness (No Deadlock / No Starvation):** If a process $p$ requests access to the CS, then $p$ eventually enters the CS.
>   - **ME3 — Fairness (Causal FIFO Entry):** If the request of process $p$ happens-before ($\to$) the request of process $q$, then $q$ cannot enter the CS before $p$.

---

##### 9.2 System Assumptions and Total Ordering of Requests

Lamport's Mutual Exclusion algorithm relies on three key assumptions:
1. **No Process Crashes ($f = 0$):** Every participating process is correct and eventually replies to requests and releases the CS after entering it.
2. **FIFO Perfect Point-to-Point Links:** Messages between any pair of processes $(p_i, p_j)$ are delivered reliably, at most once, and in the exact order they were sent.
3. **Scalar Clocks with Lexicographical Tie-Breaking (Total Order):**
   - Scalar clocks alone satisfy $e \to e' \implies L(e) < L(e')$, which is only a **partial order** because two concurrent requests $r_i \parallel r_j$ can have equal scalar clock values $L_i = L_j$.
   - To obtain a strict **total order** across all requests in the system, each request from process $p_i$ is stamped with the pair $\text{ts}(r_i) = \langle i, L_i \rangle$ (process ID $i$ and scalar clock $L_i$), ordered lexicographically by clock value first and process ID second:
     $$\text{ts}(x) < \text{ts}(y) \iff \big(L(x) < L(y)\big) \;\lor\; \big(L(x) = L(y) \land \text{id}(x) < \text{id}(y)\big)$$
   - Since process IDs are unique ($i \neq j$), no two requests from different processes can ever have the same timestamp $\text{ts}$, and whenever $\text{req}_i \to \text{req}_j$, we strictly have $L(\text{req}_i) < L(\text{req}_j) \implies \text{ts}(\text{req}_i) < \text{ts}(\text{req}_j)$.

![[DS-L5-lamport-mutex-conditions.svg|780]]

---

##### 9.3 Algorithm 1: Lamport's Mutual Exclusion Protocol

Each process $p_i$ maintains:
- `scalar_clock`: local Lamport scalar clock (initialized to $0$, incremented on every send and receive event).
- `Requests`: local set of active Critical Section requests $\langle \text{REQ}, \text{ts} = \langle j, L_j \rangle \rangle$ (including $p_i$'s own request when active).
- `Acks`: set of `ACK` messages received by $p_i$.
- `my_req`: $p_i$'s current active request (or $\bot$ if $p_i$ is not requesting the CS).

![[DS-L5-slide-53-lamport-mutex-code.png|780]]

###### Summary of Protocol Rules for Process $p_i$
1. **Requesting the CS (`upon event Request`):**
   - $p_i$ increments `scalar_clock`, creates `my_req = (REQ, ts = <i, scalar_clock>)`, and sends `my_req` over the `FIFOPerfectLink` to **all** processes $p_j \in \Pi$ (including itself, which places `my_req` in `Requests`).
2. **Receiving a Message (`upon event Deliver Message(m)`):**
   - First updates `scalar_clock := max(clock(m), scalar_clock) + 1`.
   - **If $m$ is a `REQ`:** adds $m$ to `Requests`, increments `scalar_clock`, and sends back `(ACK, ts = <i, scalar_clock>)` to `sender(m)`.
   - **If $m$ is an `ACK`:** adds $m$ to `Acks`.
   - **If $m$ is a `RLS` (Release):** removes the matching request from `sender(m)` out of `Requests`.
3. **Entering the CS (`trigger event Granted`):**
   Process $p_i$ is granted access to the CS **if and only if both conditions hold simultaneously**:
   - **Condition 1 (Smallest Timestamp in Queue):** No request in $p_i$'s `Requests` set has a timestamp smaller than `ts(my_req)`:
     $$\neg \exists \text{req} \in \text{Requests} : \text{ts}(\text{req}) < \text{ts}(\text{my\_req})$$
   - **Condition 2 (Newer `ACK` from Every Process):** For every process $p \in \Pi$, $p_i$ has received an `ACK` from $p$ whose timestamp is strictly greater than `ts(my_req)`:
     $$\forall p \in \Pi : \exists m \in \text{Acks} \mid \text{sender}(m) = p \land \text{ts}(m) > \text{ts}(\text{my\_req})$$
4. **Releasing the CS (`upon event Release`):**
   - $p_i$ removes its own request from `Requests` (sets `my_req := \bot`), increments `scalar_clock`, and broadcasts `(RLS, ts = <i, scalar_clock>)` over the `FIFOPerfectLink` to all $p_j \in \Pi$.

---

##### 9.4 Step-by-Step Execution Example

Consider three processes $p_1, p_2, p_3$:
1. Initially all clocks are $0$. Process $p_1$ sends an application message to $p_3$, advancing $p_3$'s clock to $2$.
2. At clock $3$, **$p_3$ requests the CS** with timestamp $(t=3, \text{id}=3)$, inserts it into its local queue, and sends `REQ(3, 3)` to $p_1$ and $p_2$.
3. $p_1$ and $p_2$ receive `REQ(3, 3)` at clock $4$, store $(t=3, \text{id}=3)$ in their `Requests` queues, and send back `ACK`s at clock $5$.
4. At clock $6$, **$p_1$ also requests the CS** with timestamp $(t=6, \text{id}=1)$, inserts $(t=6, \text{id}=1)$ into its local queue alongside $(t=3, \text{id}=3)$, and sends `REQ(6, 1)` to $p_2$ and $p_3$.

![[DS-L5-slide-59-mutex-example-wait.png|740]]

5. At clock $10$, $p_1$ has already received both `ACK`s (with timestamp $8 > 6$), so **Condition 2 holds** for $p_1$. However, $p_1$'s queue contains both $(t=3, \text{id}=3)$ and $(t=6, \text{id}=1)$: since $(3, 3) < (6, 1)$, **Condition 1 is false**, so $p_1$ **must wait**!
6. Meanwhile, at clock $9$, $p_3$ receives the second `ACK` from $p_2$. In $p_3$'s queue, $(t=3, \text{id}=3) < (t=6, \text{id}=1)$ is the smallest timestamp, and $p_3$ has newer `ACK`s from everyone, so **$p_3$ enters the CS**.

![[DS-L5-slide-61-mutex-example-release.png|740]]

7. When $p_3$ exits the CS at clock $10$, it removes $(t=3, \text{id}=3)$ and sends `Release` to $p_1$ and $p_2$. Upon delivering `Release` at clock $11$, $p_1$ deletes $(t=3, \text{id}=3)$ from its queue; now $(t=6, \text{id}=1)$ is the smallest timestamp in $p_1$'s queue, so **$p_1$ enters the CS**.

---

##### 9.5 Correctness Proofs and Performance

###### Proof of ME1 — Safety (Mutual Exclusion)
> **Theorem:** At no time can two distinct processes $p_i$ and $p_j$ ($i < j$) be in the Critical Section simultaneously.

**Proof (by contradiction):**
1. Suppose for contradiction that both $p_i$ and $p_j$ are inside the CS at the same time.
2. Then both $p_i$ and $p_j$ satisfied **Condition 1** and **Condition 2** while their respective requests $\text{req}_i$ and $\text{req}_j$ were still active (neither had sent `RLS` yet):
   - $p_i$ received an `ACK` from $p_j$ with $\text{ts}(\text{ack}_{j \to i}) > \text{ts}(\text{req}_i)$, and when $p_j$ sent that `ACK`, $p_j$ had already inserted $\text{req}_i$ into $\text{Requests}_j$.
   - $p_j$ received an `ACK` from $p_i$ with $\text{ts}(\text{ack}_{i \to j}) > \text{ts}(\text{req}_j)$, and when $p_i$ sent that `ACK`, $p_i$ had already inserted $\text{req}_j$ into $\text{Requests}_i$.
3. Since timestamps are **totally ordered**, either $\text{ts}(\text{req}_i) < \text{ts}(\text{req}_j)$ or $\text{ts}(\text{req}_j) < \text{ts}(\text{req}_i)$. Without loss of generality, assume $\boxed{\text{ts}(\text{req}_i) < \text{ts}(\text{req}_j)}$.
4. Consider when $p_i$ generated $\text{req}_i$ relative to when $p_i$ sent $\text{ack}_{i \to j}$ (which has timestamp $\text{ts}(\text{ack}_{i \to j}) > \text{ts}(\text{req}_j) > \text{ts}(\text{req}_i)$):
   - Because $p_i$'s scalar clock is strictly increasing and $\text{ts}(\text{req}_i) < \text{ts}(\text{ack}_{i \to j})$, $p_i$ **must have sent $\text{req}_i$ to $p_j$ before sending $\text{ack}_{i \to j}$ to $p_j$**.
5. By **FIFO link ordering** on the channel $p_i \to p_j$, $\text{req}_i$ must have been delivered to $p_j$ **before** $\text{ack}_{i \to j}$ was delivered to $p_j$.
6. Since $p_i$ has not released the CS yet, $\text{req}_i$ is still present in $\text{Requests}_j$ when $p_j$ receives $\text{ack}_{i \to j}$ and enters the CS.
7. But $\text{ts}(\text{req}_i) < \text{ts}(\text{req}_j)$, which contradicts **Condition 1** for $p_j$ ($\text{req}_j$ was supposed to have the smallest timestamp in $\text{Requests}_j$)! $\blacksquare$

---

###### Proof of ME3 — Fairness (Causal Entry Order)
> **Theorem:** If $\text{req}_j \to \text{req}_i$, then $p_i$ cannot enter the CS before $p_j$.

**Proof:**
1. By the Scalar Clock property, $\text{req}_j \to \text{req}_i \implies L(\text{req}_j) < L(\text{req}_i) \implies \boxed{\text{ts}(\text{req}_j) < \text{ts}(\text{req}_i)}$.
2. To enter the CS, $p_i$ must first receive an `ACK` from $p_j$ with $\text{ts}(\text{ack}_{j \to i}) > \text{ts}(\text{req}_i) > \text{ts}(\text{req}_j)$.
3. Since $\text{ts}(\text{req}_j) < \text{ts}(\text{ack}_{j \to i})$, process $p_j$ sent $\text{req}_j$ to $p_i$ **before** sending $\text{ack}_{j \to i}$ to $p_i$.
4. By **FIFO link ordering** on $p_j \to p_i$, $p_i$ delivers $\text{req}_j$ **before** delivering $\text{ack}_{j \to i}$.
5. Thus, by the time $p_i$ satisfies Condition 2, $\text{req}_j$ is already in $\text{Requests}_i$ with $\text{ts}(\text{req}_j) < \text{ts}(\text{req}_i)$, blocking $p_i$ from satisfying Condition 1 until $p_j$ enters and sends `RLS`. $\blacksquare$

> [!warning] What Happens If Links Are NOT FIFO? (Slide 66 Homework)
> If links are only Perfect Links without FIFO ordering, **both Mutual Exclusion (Safety) and Fairness are violated**:
> - Suppose $p_j$ sends $\text{req}_j$ at $\text{ts} = (1, j)$ to $p_i$, and shortly after receives $\text{req}_i$ with $\text{ts} = (2, i)$ and replies with $\text{ack}_{j \to i}$ at $\text{ts} = (4, j)$.
> - Without FIFO on link $p_j \to p_i$, the fast $\text{ack}_{j \to i}$ can overtake the slow $\text{req}_j$ in transit!
> - Then $p_i$ receives $\text{ack}_{j \to i}$ (satisfying Condition 2) while $\text{req}_j$ is still in flight (so $p_i$'s queue only contains $\text{req}_i$, satisfying Condition 1). Process $p_i$ enters the CS at the same time as $p_j$, violating **Safety (ME1)** and **Fairness (ME3)**.

---

###### Performance and Message Complexity
For a system of $N$ processes, each Critical Section execution in Lamport's algorithm requires:
- $N - 1$ `REQ` messages to remote peers,
- $N - 1$ `ACK` messages from remote peers,
- $N - 1$ `RLS` messages upon exiting the CS,
for a total message complexity of:
$$\boxed{3(N - 1) \text{ messages per CS execution}}$$
In the best case (when no other process is inside or competing for the CS), the **synchronization delay** from issuing `<Request>` to `<Grant>` is **2 message transmission delays** (1 `REQ` + 1 `ACK` round-trip).

