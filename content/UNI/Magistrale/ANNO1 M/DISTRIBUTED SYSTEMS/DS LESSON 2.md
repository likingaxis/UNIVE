#### Synchronous vs Asynchronous

In this course we will see three definitions of synchrony:

- **Asynchronous system:**
  - there is no known fixed upper bound on message delays or on the time required for processes to execute their steps.
- **Eventually synchronous system:**
  - covered in module M2.
- **Synchronous system:**
  - there is a fixed upper bound on message delays (e.g., every message is delivered within 5 clock ticks).
  - This does not mean faster or slower: what matters is the bound.

#### Models for process failures

> A **failure model** is a set of assumptions describing how a process is allowed to fail.

There are two main models:

- **Crash-stop failure:**
  - after $\operatorname{Crash}(p_j)$, process $p_j$ stops executing local steps permanently.
- **Byzantine failure:**
  - after $\operatorname{Byz}(p_j)$, process $p_j$ may behave arbitrarily; it no longer has to follow its original algorithm.

Failure models are **orthogonal** to synchrony and asynchrony.

##### Crash-stop failure in a space-time diagram

![[Pasted image 20260930102851.png|401]]

Stars indicate crashes.
- The teacher will not use stars, but will stop the process's timeline at the crash.

In this course there is **no crash recovery**: if a process crashes, it will not recover.

##### Byzantine failure in a space-time diagram

![[Pasted image 20260930102930.png|441]]

A Byzantine process may still follow the original algorithm, or it may deviate from it (e.g., fake a send).

Byzantine failure is more general than crash-stop failure: a crash-stop process follows the protocol until it crashes, whereas a Byzantine process does not have to.
- An algorithm that tolerates Byzantine failures also tolerates crash-stop failures: doing nothing forever is one possible Byzantine behaviour.

![[Pasted image 20260930103732.png|452]]

$$
\text{Crash-stop failures} \subseteq \text{Byzantine failures}
$$

![[Pasted image 20260930104113.png|282]]

> [!info] Failure terminology in this course
> Until the lesson on Byzantine algorithms, “failure” refers to a crash-stop failure. After that, it can also refer to a Byzantine failure.

##### Correct process

> A process is **correct** if it does not experience a failure.

We indicate with $f$ the maximum number of processes that can experience a failure event in an execution.

For example, with $n=10$ processes and $f<n/2=5$, **at most 4 processes** can fail, but we do not know which ones.

- We usually put a bound on $f$, such as $f\leq n-1$.
- We make no assumptions about **when** a failure occurs: we consider the worst-case scenario.

##### Homework 1

![[Pasted image 20260930115239.png|549]]

###### Answer 1

A delivery event such as $\operatorname{Del}(1,3,m)$ specifies **source, destination and message**.
- Similarly, we can formalize a message-loss event as $\operatorname{LM}(p_1,m)$, removing $m$ from the output buffer:

$$
\mathrm{Out}_{p_1} \gets \mathrm{Out}_{p_1} \setminus \{m\}.
$$

![[Pasted image 20260930115947.png|283]]

#### Abstractions, pseudocode conventions and first algorithm

##### Abstraction

> An **abstraction** is a formal description of a problem or system component that specifies **what it should do**, without specifying **how it is implemented**.

Steps to formalize and implement an abstraction:

1. Define a **system model**.
2. Formalize the problem: design an abstraction with unambiguous properties that capture what we want to solve.
3. Implement the abstraction with a **distributed protocol**.
4. Prove that the protocol implements the abstraction.

##### Abstracting a real communication link

A communication link:

- Loses messages with a certain probability $p_r$.
- Can duplicate a message a finite number of times, without the sender necessarily resending it intentionally.
- Does not create messages.

Its interface exposes two events:

- **Request:**
  - `⟨Send | q, m⟩`
  - Send message $m$ to process $q$.
- **Indication:**
  - `⟨Deliver | p, m⟩`
  - Deliver message $m$ from process $p$.

![[Pasted image 20260930121002.png|334]]

To define the link's guarantees without explicitly modeling probabilities, we use an **idealized infinite-execution model**.
- Instead of calculating loss probabilities in proofs, we reason about repeated transmissions and deliveries.

> **FL1 — Fair-loss**
> If a correct process $p$ sends $m$ infinitely often to a correct process $q$, then $q$ delivers $m$ infinitely often.

> **FL2 — Finite duplication**
> If a correct process $p$ sends $m$ a finite number of times to $q$, then $q$ cannot deliver $m$ infinitely often.

> **FL3 — No creation**
> If some process $q$ delivers a message $m$ with sender $p$, then $m$ was sent by $p$ to $q$.

A **weak** abstraction provides minimal guarantees.
- An abstraction is represented as follows:

![[Pasted image 20260930122816.png|385]]

##### Two categories of properties

- **Safety:**
  - if the property is violated at time $t$, the violation cannot be repaired later.
  - Formally: if a safety property is violated in execution $E$, there is a **finite prefix** $E'$ of $E$ such that every extension of $E'$ also violates the property.
- **Liveness:**
  - specifies that something good will happen; a violation cannot be established from a finite execution.
  - Formally: given a finite execution $E$ that does not satisfy a liveness property, there is an extension of $E$ that satisfies it.
  - Intuitive example: “At the end of time, we all resurrect.” No finite observation can rule it out.

These categories apply beyond communication links.
For the Fair-Lossy Link:

- **FL1 — Fair-loss** → Liveness
- **FL2 — Finite duplication** → Liveness
- **FL3 — No creation** → Safety

FL2 does not impose a fixed upper bound on the number of duplicates.
- An **“at most $k$ deliveries”** property would instead be safety: the $(k+1)$-th delivery establishes a violation.

![[Pasted image 20260930124100.png|375]]

###### Examples of properties

Classify the properties as safety or liveness:

![[Pasted image 20260930124123.png|443]]

Answers, in order: **safety, liveness, liveness**.

###### Badly written properties

Mixing two aspects in one statement makes a property harder to classify.
- For example:

> If process $p$ sends a message $m$ to $q$, then $q$ will eventually deliver it, and this delivery is unique.

This should be decomposed into two properties:

- **Liveness:**
  - if $p$ sends $m$ to $q$, then $q$ eventually delivers it.
- **Safety:**
  - if $p$ sends $m$ to $q$, then $m$ is delivered at most once.

###### Homework

![[Pasted image 20260930124523.png|535]]

#### Algorithms: communication link

We add a module on top of a Fair-Lossy Link to provide stronger properties.
- The algorithm implements this stronger abstraction using the weaker link.

![[Pasted image 20260930140734.png|237]]

##### Stubborn Link

![[Pasted image 20261018130256.png|128]]

A **Fair-Lossy Link** can lose messages.
- FL1 guarantees infinitely many deliveries only if a correct sender sends the message infinitely often to a correct receiver.

The **Stubborn Link (SL)** handles these retransmissions automatically: the application requests a transmission **only once**, and the link provides:

- **SL1 — Stubborn-delivery:**
  - if two correct processes $p$ and $q$ are connected and $p$ sends $m$ to $q$, then $q$ delivers $m$ infinitely often.
- **FL3 — No creation:**
  - if $q$ delivers $m$ from $p$, then $m$ must have been sent by $p$ to $q$.

The Stubborn Link does **not prevent duplicate deliveries**.
- Removing duplicates is the responsibility of a higher-level abstraction, the **Perfect Link**.

###### Algorithm

```text
upon event ⟨ sl, Init ⟩ do
    sent := ∅;
    starttimer(Δ);

upon event ⟨ Timeout ⟩ do
    forall (q, m) ∈ sent do
        trigger ⟨ fll, Send | q, m ⟩;
    starttimer(Δ);

upon event ⟨ sl, Send | q, m ⟩ do
    trigger ⟨ fll, Send | q, m ⟩;
    sent := sent ∪ {(q, m)};

upon event ⟨ fll, Deliver | p, m ⟩ do
    trigger ⟨ sl, Deliver | p, m ⟩;
```

###### Proof 1 — No creation (FL3)

**To prove:** if $q$ performs `sl.Deliver(p, m)`, then $p$ must have requested `sl.Send(q, m)`.

1. **Assume the opposite:**
   - $q$ performs `sl.Deliver(p, m)`, but $p$ never requested `sl.Send(q, m)`.
2. **Receiving handler:**
   - every `sl.Deliver(p, m)` is triggered by an `fll.Deliver(p, m)`.
3. **Sending handlers:**
   - an `fll.Send(q, m)` occurs only after an `sl.Send(q, m)` request or a retransmission from `sent`.
   - Pairs enter `sent` only through `sl.Send`, so without that request, $p$ cannot have performed `fll.Send(q, m)`.
4. **Contradiction:**
   - an `fll.Deliver(p, m)` without a corresponding `fll.Send(q, m)` violates the underlying link's FL3.

**Conclusion:** the Stubborn Link preserves FL3 (No creation).

###### Proof 2 — Stubborn-delivery (SL1)

**To prove:** if correct processes $p$ and $q$ are connected and $p$ requests `sl.Send(q, m)`, then $q$ performs `sl.Deliver(p, m)` infinitely often.

1. **Assume the opposite:**
   - $p$ and $q$ are correct and connected, and $p$ requests `sl.Send(q, m)`, but $q$ performs `sl.Deliver(p, m)` only finitely often.
2. **Sending handlers:**
   - the request stores $(q,m)$ in `sent`.
   - Every timeout retransmits all stored messages and restarts the timer.
   - Since $p$ is correct, it requests `fll.Send(q, m)` infinitely often.
3. **FL1 and receiving handler:**
   - since both processes are correct, FL1 guarantees infinitely many `fll.Deliver(p, m)` events at $q$.
   - Each triggers an `sl.Deliver(p, m)`.
4. **Contradiction:**
   - $q$ must deliver $m$ infinitely often, contradicting the assumption of finitely many deliveries.

**Conclusion:** the Stubborn Link satisfies SL1 (Stubborn-delivery).

##### Perfect P2P Link

![[Pasted image 20261018134242.png|135]]

Stubborn Links guarantee infinitely many deliveries, so the application can receive the same message repeatedly.
- For example, if $p$ sends the instruction “Transfer €100” to $q$, processing every delivery could execute the same transfer multiple times.

The **Perfect Link** filters these duplicates.
- When the Stubborn Link triggers `sl.Deliver(p, m)`, it checks whether $m$ has already been delivered:

- **First delivery:**
  - record $m$ in `delivered` and trigger `pl.Deliver(p, m)`.
- **Duplicate:**
  - ignore it.

It provides three properties:

- **PL1 — Reliable delivery:**
  - if a correct process $p$ sends $m$ to a correct process $q$, then $q$ eventually delivers $m$.
- **PL2 — No duplication:**
  - a message is delivered at most once.
- **FL3 — No creation:**
  - a delivered message must have been sent by its claimed sender.

Together, **PL1 + PL2** guarantee **exactly-once delivery** between correct processes.

###### Algorithm

```text
upon event ⟨ pl, Init ⟩ do
    delivered := ∅;

upon event ⟨ pl, Send | q, m ⟩ do
    trigger ⟨ sl, Send | q, m ⟩;

upon event ⟨ sl, Deliver | p, m ⟩ do
    if m ∉ delivered then
        delivered := delivered ∪ {m};
        trigger ⟨ pl, Deliver | p, m ⟩;
```

###### Proof 1 — No creation (FL3)

**To prove:** if $q$ performs `pl.Deliver(p, m)`, then $p$ must have requested `pl.Send(q, m)`.

1. **Assume the opposite:**
   - $q$ performs `pl.Deliver(p, m)`, but $p$ never requested `pl.Send(q, m)`.
2. **Receiving handler:**
   - a `pl.Deliver(p, m)` can occur only after an `sl.Deliver(p, m)`.
3. **Sending handler:**
   - every `sl.Send(q, m)` made by the Perfect Link originates from a `pl.Send(q, m)` request.
   - Without that request, $p$ could not have requested `sl.Send(q, m)`.
4. **Contradiction:**
   - the Stubborn Link would have delivered a message never sent through its interface, violating its FL3.

**Conclusion:** the Perfect Link preserves FL3 (No creation).

###### Proof 2 — No duplication (PL2)

**To prove:** a message $m$ is delivered at most once by the Perfect Link at a receiving process.

1. **Assume the opposite:**
   - $q$ performs `pl.Deliver(p, m)` twice, at times $t$ and $t'$, with $t<t'$.
2. **First delivery:**
   - at time $t$, the handler adds $m$ to `delivered` before triggering `pl.Deliver(p, m)`.
   - Event handlers are **atomic**, so no other delivery handler can execute between these steps.
3. **Second delivery:**
   - at time $t'$, $m$ is already in `delivered`, and entries are never removed.
   - The condition `m ∉ delivered` is false, so the handler cannot trigger another `pl.Deliver(p, m)`.
4. **Contradiction:**
   - a second delivery is impossible, contrary to the assumption.

**Conclusion:** the Perfect Link satisfies PL2 (No duplication).

###### Proof 3 — Reliable delivery (PL1)

**To prove:** if correct processes $p$ and $q$ are connected and $p$ requests `pl.Send(q, m)`, then $q$ eventually performs `pl.Deliver(p, m)`.

1. **Assume the opposite:**
   - $p$ and $q$ are correct and connected, and $p$ requests `pl.Send(q, m)`, but $q$ never performs `pl.Deliver(p, m)`.
2. **The receiving handler must execute:**
   - `pl.Send(q, m)` triggers `sl.Send(q, m)`.
   - By **SL1**, $q$ receives infinitely many `sl.Deliver(p, m)` events, so the receiving handler is eventually triggered.
3. **Examine the two cases:**
   - If $m$ is already in `delivered`, an earlier execution of the same atomic handler must also have triggered `pl.Deliver(p, m)`: $q$ has already delivered it.
   - If $m$ is not in `delivered`, the handler adds it and triggers `pl.Deliver(p, m)`.
4. **Contradiction:**
   - both cases contradict the assumption that $q$ never delivers $m$.

**Conclusion:** the Perfect Link satisfies PL1 (Reliable delivery).

##### FIFO problem

![[Pasted image 20261018161948.png|170]]

We want to build a **FIFO Link on top of a Perfect P2P Link**.
- For a given source $p$ and receiver $q$, if $p$ sends $m_1$ before $m_2$, then $q$ must deliver $m_1$ before $m_2$.

FIFO ordering applies to **each sender–receiver pair**.
- The system can contain more than two processes; no global order is imposed on messages from different senders.

###### Counters and pending messages

We attach a sequence number to each message and keep two local arrays at every process:

- **`seq[q]`:**
  - the last sequence number used for messages sent to destination $q$.
  - It starts at $0$ and is incremented **before** sending, so the first message has number $1$.
- **`next[s]`:**
  - the sequence number expected next from source $s$.
  - It starts at $1$.

For a fixed pair, the sender transmits $[1,m_1]$, then $[2,m_2]$, and so on.
- If $[2,m_2]$ arrives first, the receiver stores it in **`pending`** and waits for $[1,m_1]$.
- After delivering $m_1$, it increments `next[s]` and can deliver $m_2$.

> [!info]- Example
> $p_1$ sends $m_1,m_2$ to $p_2$, then $m_3$ to $p_3$.
> - Its `seq` array, with entries for $p_1,p_2,p_3$, changes as follows:
>
> $$
> [0,0,0] \xrightarrow{m_1\text{ to }p_2} [0,1,0]
> \xrightarrow{m_2\text{ to }p_2} [0,2,0]
> \xrightarrow{m_3\text{ to }p_3} [0,2,1].
> $$
>
> The first message to $p_3$ has sequence number $1$, independently of the messages sent to $p_2$.
> - Each process maintains its own arrays; processes may also send messages to themselves.

###### Algorithm

```text
1:  upon event ⟨ fpl, Init ⟩ do
2:      pending := ∅;
3:      forall process q do
4:          seq[q] := 0;
5:          next[q] := 1;
6:  upon event ⟨ fpl, Send | q, m ⟩ do
7:      seq[q] := seq[q] + 1;
8:      trigger ⟨ pl, Send | q, [seq[q], m] ⟩;
9:  upon event ⟨ pl, Deliver | s, [k, m] ⟩ do
10:     pending := pending ∪ {(s, k, m)};
11: upon ∃(s, k, m) ∈ pending such that k = next[s] do
12:     pending := pending \ {(s, k, m)};
13:     next[s] := next[s] + 1;
14:     trigger ⟨ fpl, Deliver | s, m ⟩;
```

The handler at **line 11** is enabled when `pending` contains a message with the expected sequence number.
- It removes that message, advances `next[s]` and delivers it to the application.

###### Proof — FIFO ordering

**To prove:** if $p$ sends $m$ before $m'$ to $q$, then $q$ must deliver $m$ before $m'$.

1. **Assume the opposite:**
   - $p$ sends $m$ before $m'$, but $q$ delivers $m'$ before $m$.
2. **Sequence numbers:**
   - since `seq[q]` increases before every send to $q$, the messages have sequence numbers $k<k'$.
3. **Delivery condition:**
   - to deliver $m'$, the receiver must have `next[p]` equal to $k'$.
   - This counter starts at $1$ and increases by exactly $1$ only when the message with the currently expected number is delivered.
4. **Contradiction:**
   - to reach $k'$, the counter must first pass through $k$.
   - It can advance from $k$ only by delivering $m$.
   - Therefore, $m$ must already have been delivered before $m'$, contradicting the assumption.

**Conclusion:** the FIFO Link satisfies the FIFO ordering property.
