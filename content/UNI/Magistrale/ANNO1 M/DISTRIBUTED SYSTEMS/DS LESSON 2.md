# Lesson 2 — Failures and Communication Links

## Synchronous vs Asynchronous

In an **asynchronous system**, there is no known fixed upper bound on message delays or the time processes need to execute their steps. In a **synchronous system**, timing bounds are known: for example, every message must arrive within five clock ticks. The distinction concerns guarantees, rather than speed. The **eventually synchronous** model, introduced later, relaxes when timing bounds must hold.

## Models for process failures

A **failure model** states how a process is allowed to fail. Under **crash-stop**, a process follows its algorithm until $\operatorname{Crash}(p_j)$ and then stops permanently. Under **Byzantine failure**, after $\operatorname{Byz}(p_j)$ it may behave arbitrarily, including deviating from the algorithm or claiming to have sent something it did not send.

Failure assumptions are independent of timing assumptions: either failure model can be combined with synchrony or asynchrony. This course initially uses crash-stop, with no recovery; Byzantine failures are introduced later.

### Crash-stop failure in a space-time diagram

![[Pasted image 20260930102851.png|401]]

The stars mark crashes. The professor instead ends the process's timeline at its crash.

### Byzantine failure in a space-time diagram

![[Pasted image 20260930102930.png|441]]

A Byzantine process may deviate, but is also allowed to keep following the algorithm. It can even do nothing forever, so crash-stop behavior is included among the behaviors Byzantine failures permit. An algorithm that tolerates Byzantine failures therefore also tolerates crash-stop failures under the same other assumptions.

![[Pasted image 20260930103732.png|452]]

$$
\text{Crash-stop failures}\subseteq\text{Byzantine failures}
$$

![[Pasted image 20260930104113.png|282]]

### Correct process

A process is **correct** if it never experiences a failure in the execution. Let $f$ be the maximum number of processes allowed to fail. With $n=10$ and $f<n/2=5$, for example, at most four processes may fail. A bound such as $f\le n-1$ restricts how many can fail; it does not identify them or restrict when they fail. The algorithm must handle every permitted choice and timing.

### Homework 1

![[Pasted image 20260930115239.png|549]]

A delivery event $\operatorname{Del}(1,3,m)$ records source, destination and message. A message-loss event can similarly be written $\operatorname{LM}(p_1,m)$, removing $m$ from the sender's output buffer:

$$
\mathrm{Out}_{p_1}\gets\mathrm{Out}_{p_1}\setminus\{m\}.
$$

![[Pasted image 20260930115947.png|283]]

## Abstractions, pseudocode conventions and first algorithm

An **abstraction** specifies what a component must do without prescribing its implementation. We first choose a system model, then state the abstraction's properties, implement it with a distributed protocol, and prove that the protocol satisfies those properties under the model.

### Abstracting a real communication link

A real link may lose a transmission with some probability $p_r$ or produce a finite number of duplicates, but does not invent messages. Its interface has a request `⟨Send | q, m⟩`, asking to send $m$ to $q$, and an indication `⟨Deliver | p, m⟩`, reporting delivery from $p$.

![[Pasted image 20260930121002.png|334]]

The **Fair-Lossy Link** models this behavior without calculating loss probabilities. Instead, it specifies guarantees over infinite executions:

- **FL1 — Fair-loss:** if a correct process $p$ sends $m$ infinitely often to a correct process $q$, then $q$ delivers $m$ infinitely often.
- **FL2 — Finite duplication:** if a correct $p$ sends $m$ only finitely many times to $q$, then $q$ cannot deliver it infinitely often.
- **FL3 — No creation:** if $q$ delivers $m$ with sender $p$, then $p$ previously sent $m$ to $q$.

This is a **weak abstraction**: one transmission need not succeed, and delivery need not be unique.

![[Pasted image 20260930122816.png|385]]

### Two categories of properties

A **safety property** rules out bad behavior. A violation has a finite witness that no continuation can repair: once an unsent message has been delivered, later events cannot undo that violation.

A **liveness property** requires eventual good behavior. No finite observation proves that it will never happen, because the execution may still continue in a way that satisfies it. The professor's example, “At the end of time, we all resurrect,” illustrates how postponement differs from a definitive violation.

For the Fair-Lossy Link, **FL1 and FL2 are liveness properties**, while **FL3 is safety**. FL2 does not fix a maximum number of duplicates: any finite number is allowed, so observing more duplicates does not yet establish infinite duplication. By contrast, “at most $k$ deliveries” is safety, since delivery number $k+1$ is a finite witness of failure.

![[Pasted image 20260930124100.png|375]]

**Classification exercise:**

![[Pasted image 20260930124123.png|443]]

The recorded answers, in order, are **safety, liveness, liveness**.

A statement can mix the two categories. “If $p$ sends $m$ to $q$, then $q$ eventually delivers it exactly once” should be separated into eventual delivery (**liveness**) and at-most-once delivery (**safety**). Keeping them separate makes the proof obligations clear.

**Homework:**

![[Pasted image 20260930124523.png|535]]

## Algorithms: communication link

We build stronger communication abstractions in layers. Each algorithm uses a weaker link and adds a missing guarantee.

![[Pasted image 20260930140734.png|237]]

### Stubborn Link

![[Pasted image 20261018130256.png|128]]

A **Stubborn Link (SL)** turns one application send request into repeated transmissions over a Fair-Lossy Link. It provides **SL1 — Stubborn-delivery**: if correct processes $p$ and $q$ are connected and $p$ requests a send of $m$ to $q$, then $q$ delivers $m$ infinitely often. It also preserves **FL3 — No creation**. Duplicate deliveries are allowed.

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

The sender stores every requested pair $(q,m)$ in `sent`, retransmits all stored pairs at each timeout, and restarts the timer. The receiver passes every lower-layer delivery upward.

**Why the properties hold.** A pair enters `sent` only through `sl.Send`, so every lower-layer transmission originates from an application request. By the underlying link's no-creation property, every `sl.Deliver` therefore corresponds to a requested send. For stubborn-delivery, a correct sender retransmits the stored message infinitely often; FL1 then supplies infinitely many deliveries at the correct receiver, each of which is passed upward.

### Perfect P2P Link

![[Pasted image 20261018134242.png|135]]

Repeated delivery is inconvenient for an application: processing the instruction “Transfer €100” several times could repeat the transfer. A **Perfect Link** filters the Stubborn Link's duplicates and provides:

- **PL1 — Reliable delivery:** a message sent by a correct process to a correct destination is eventually delivered.
- **PL2 — No duplication:** each message is delivered at most once at a receiver.
- **FL3 — No creation:** every delivered message was sent by its claimed sender.

PL1 and PL2 together give exactly-once delivery between correct processes in this abstraction.

The code below assumes that $m$ identifies a distinct message, rather than only its payload. Separate sends of the same application data need distinct message identities so they are not filtered as duplicates.

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

On the first lower-layer delivery, the receiver records $m$ in `delivered` and notifies the application. Later copies fail the membership check.

**Why the properties hold.** No creation follows through the layers: `pl.Deliver` requires `sl.Deliver`, and every `sl.Send` originates from `pl.Send`. For no duplication, the first delivery adds $m$ to `delivered` before notifying the application. Handlers are atomic and entries are never removed, so a second copy cannot pass the check. Finally, stubborn-delivery guarantees that the receive handler eventually runs. Either $m$ was delivered earlier, or this first execution records and delivers it; reliable delivery holds in both cases.

### FIFO problem

![[Pasted image 20261018161948.png|170]]

A Perfect Link does not preserve send order. To build a **FIFO Link**, we need messages from a given sender $p$ to a given receiver $q$ to be delivered in the order they were sent. This is a guarantee for each sender–receiver pair, not a global order across different senders.

Every process keeps `seq[q]`, the last sequence number used for destination $q$, and `next[s]`, the next number expected from source $s$. The sender increments `seq[q]` before sending, so numbering begins at $1$; the receiver also begins by expecting $1$.

If $[2,m_2]$ arrives before $[1,m_1]$, the receiver keeps it in `pending`. After delivering $m_1$, it advances `next[s]` and can release $m_2$.

For example, if $p_1$ sends $m_1,m_2$ to $p_2$ and then $m_3$ to $p_3$, its `seq` array changes as follows:

$$
[0,0,0]\xrightarrow{m_1\text{ to }p_2}[0,1,0]
\xrightarrow{m_2\text{ to }p_2}[0,2,0]
\xrightarrow{m_3\text{ to }p_3}[0,2,1].
$$

The first message to $p_3$ has number $1$, independently of messages sent to $p_2$. Each process maintains its own arrays and may also send to itself.

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

The guard at line 11 becomes enabled when `pending` contains the next expected message from some source. Its handler removes that message, advances the corresponding counter, and delivers it upward.

**Why FIFO ordering holds.** Suppose $p$ sends $m$ before $m'$ to $q$, giving them sequence numbers $k<k'$. Delivering $m'$ requires `next[p] = k'`. This counter starts at $1$ and increases by exactly one only when the currently expected message is delivered. It therefore cannot reach $k'$ without first passing through $k$ and delivering $m$.
