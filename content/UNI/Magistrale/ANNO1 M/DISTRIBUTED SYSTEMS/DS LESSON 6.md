#### 1. Motivation: Why Distributed Algorithms Need Failure Detection

In the protocols studied so far (such as Lamport's Mutual Exclusion), processes were implicitly assumed to be reliable: every process that starts participating continues executing and eventually replies to or broadcasts the messages required by the protocol.

Consider what happens to **Lamport's Mutual Exclusion** when a single process crashes under a **Crash-Stop** failure model:
- If process $p_i$ crashes **before** sending its `ACK` to a `REQUEST` from $p_j$, then $p_j$ waits forever for that `ACK` and can never enter the Critical Section.
- If process $p_i$ crashes **while inside** the Critical Section (or while holding the smallest timestamp at the head of everyone's request queue) before broadcasting `RELEASE`, every other waiting process remains permanently blocked behind $p_i$'s entry.

![[DS-L6-mutex-blocking.svg|780]]

Even a single process crash compromises the **liveness** (progress) of the entire distributed algorithm unless the surviving processes have a mechanism to detect that a peer has crashed and stop waiting for it.

---

##### 1.1 The Failure Detector Abstraction

Determining whether a remote process has crashed requires **timing assumptions** (for instance, setting a timeout on expected replies). However, scattering physical timers and network delay bounds inside every higher-level distributed algorithm makes those algorithms brittle and tied to a specific timing model.

Instead, we encapsulate all timing assumptions inside an architectural module called a **Failure Detector**:
- **Failure Model:** Processes fail by **Crash-Stop** (once a process crashes, it stops executing steps forever and never recovers).
- **Architectural Role:** The Failure Detector sits beneath the distributed application protocol. It monitors peer processes (typically via periodic **heartbeats**) and emits failure notifications or suspicion events to the upper layer, allowing the application algorithm to remain purely event-driven.

---

##### 1.2 The Two Fundamental Dimensions: Completeness and Accuracy

Every failure detector is specified along two orthogonal correctness dimensions:

> **Completeness (Detecting Real Crashes):**
> The ability of the failure detector to eventually detect every process that actually crashes. Without completeness, a surviving process could wait forever for a crashed peer, violating **liveness**.

> **Accuracy (Avoiding False Detections):**
> The ability of the failure detector to avoid blaming (suspecting or declaring crashed) processes that are still alive and correct. Without accuracy, a slow process whose message was delayed could be falsely excluded while still active, potentially violating **safety**.

![[DS-L6-completeness-vs-accuracy.svg|760]]

The exact strength of Completeness and Accuracy that a system can achieve depends on the underlying **synchrony model**:
- In a **Synchronous System** (bounded processing speeds and known upper bound on message delivery delay), we can implement a **Perfect Failure Detector ($\mathcal{P}$)** that never makes mistakes.
- In a **Partially Synchronous / Eventually Synchronous System** (where bounds hold only after an unknown stabilization time), false suspicions can occur temporarily, so we weaken accuracy to obtain an **Eventually Perfect Failure Detector ($\Diamond\mathcal{P}$)**.

![[DS-L6-slide-09-sync-vs-async-fd.png|760]]

---

#### 2. Perfect Failure Detector ($\mathcal{P}$)

##### 2.1 System Model and Specification

To implement a **Perfect Failure Detector ($\mathcal{P}$)**, we assume:
1. **Synchronous System:** Processing delays and local clock drift are bounded.
2. **Crash Failures (Crash-Stop):** A process executes correctly up to the moment it crashes, and once crashed it never executes again.
3. **Perfect Synchronous Point-to-Point Links ($pp2p$):** Every message sent between two non-crashed processes is reliably delivered within a known upper bound $\text{max\_delay}$ (also written $d_{\max}$).

![[DS-L6-slide-10-pfd-spec.png|720]]

> **Module 2.6 — Perfect Failure Detector ($\mathcal{P}$):**
> - **Events (Indications):** $\langle \mathcal{P}, \text{Crash} \mid p \rangle$ — notifies the upper layer that process $p$ has crashed.
> - **Properties:**
>   - **PFD1 — Strong Completeness:** Eventually, every process that crashes is permanently detected by every correct process.
>   - **PFD2 — Strong Accuracy:** If a process $p$ is detected by any process, then $p$ has in fact crashed (i.e., no process is ever detected before it crashes).

Here, a **correct process** means a process that **never crashes** throughout the entire execution. Because a crashed process never recovers in the Crash-Stop model, once $\mathcal{P}$ emits $\langle \mathcal{P}, \text{Crash} \mid p \rangle$, that verdict is final and irrevocable.

---

##### 2.2 Algorithm 2.5: *Exclude on Timeout*

The classic request-reply implementation of $\mathcal{P}$ is **Exclude on Timeout** (Algorithm 2.5). Every process periodically probes all peers with a `HEARTBEATREQUEST` and expects a `HEARTBEATREPLY` before the next timer expiration $\Delta$.

![[DS-L6-slide-11-exclude-on-timeout.png|780]]

```text
Implements:
    PerfectFailureDetector, instance P

Uses:
    PerfectPointToPointLinks, instance pp2p

upon event < P, Init > do
    alive := Pi
    detected := empty_set
    starttimer(Delta)

upon event < Timeout > do
    for all p in Pi do
        if (p not in alive) and (p not in detected) then
            detected := detected U {p}
            trigger < P, Crash | p >
        send < pp2p, Send | p, [HEARTBEATREQUEST] >
    alive := empty_set
    starttimer(Delta)

upon event < pp2p, Deliver | q, [HEARTBEATREQUEST] > do
    send < pp2p, Send | q, [HEARTBEATREPLY] >

upon event < pp2p, Deliver | p, [HEARTBEATREPLY] > do
    alive := alive U {p}
```

###### Role of Each State Variable and Step
- **`alive := \Pi` at initialization:** When the **first** `<Timeout>` fires at time $t = \Delta$, no `HEARTBEATREQUEST` has ever been sent yet! Initializing `alive := \Pi` prevents the first timeout from falsely declaring the entire system crashed; the first timeout simply sends out the initial batch of `HEARTBEATREQUEST` messages and resets `alive := \emptyset`.
- **`alive := \emptyset` at the end of `<Timeout>`:** Clears the set of responders for the newly started $\Delta$-window so that only processes replying during the **current** window are added back to `alive`.
- **`detected`:** Ensures that `<P, Crash | p>` is triggered **at most once** per crashed peer $p$, even though $p \notin \text{alive}$ will remain true in all subsequent $\Delta$-windows.
- **Message Complexity:** In every period of length $\Delta$, each of the $n$ processes sends $n$ `HEARTBEATREQUEST` messages, and each of the $n$ processes replies with $n$ `HEARTBEATREPLY` messages, yielding a total of **$2n^2$ messages per $\Delta$ cycle**.

---

##### 2.3 Correctness Proofs for *Exclude on Timeout*

###### Proof of PFD1 (Strong Completeness) and Worst-Case Detection Latency

![[DS-L6-slide-12-completeness-latency.png|720]]

> **Theorem (Strong Completeness & Detection Bound):**
> If a process $p_1$ crashes at physical time $t$, every correct process $p_0$ triggers $\langle \mathcal{P}, \text{Crash} \mid p_1 \rangle$ by at most time $\boxed{t + 2\Delta}$.

**Proof:**
1. Suppose $p_1$ crashes at physical time $t$. From time $t$ onward, $p_1$ never sends any `HEARTBEATREPLY`.
2. In the worst case, $p_1$ crashes immediately **after** replying to $p_0$'s most recent `HEARTBEATREQUEST` (sent just before time $t$). Thus, at $p_0$'s next timeout $t_1 \le t + \Delta$, $p_1$ is still present in $p_0$'s `alive` set from that final reply.
3. At timeout $t_1 \le t + \Delta$, $p_0$ resets `alive := \emptyset`, sends a fresh `HEARTBEATREQUEST` to $p_1$, and starts a new timer of duration $\Delta$.
4. Because $p_1$ is already crashed, it never replies during the interval $[t_1, t_1 + \Delta]$.
5. When $p_0$'s next timeout fires at $t_2 = t_1 + \Delta \le t + 2\Delta$, $p_1 \notin \text{alive}$, so $p_0$ adds $p_1$ to `detected` and triggers $\langle \mathcal{P}, \text{Crash} \mid p_1 \rangle$. $\blacksquare$

---

###### Proof of PFD2 (Strong Accuracy)

> **Theorem (Strong Accuracy under $\Delta \ge 2 \cdot \text{max\_delay}$):**
> Assuming local processing takes negligible time and the timeout period satisfies
> $$\Delta \ge 2 \cdot \text{max\_delay}$$
> no process $p$ is ever detected before $p$ crashes.

**Proof (by contradiction):**
1. Suppose for contradiction that at some timeout $t_{\text{out}}$, a process $p_0$ triggers $\langle \mathcal{P}, \text{Crash} \mid p \rangle$ even though $p$ has **not** crashed up to time $t_{\text{out}}$.
2. By the algorithm, $p_0$ triggers `Crash` at $t_{\text{out}}$ only if $p \notin \text{alive}$ at the end of the window $[t_{\text{out}} - \Delta, t_{\text{out}}]$.
3. At the beginning of that window (time $t_{\text{out}} - \Delta$), $p_0$ sent a `HEARTBEATREQUEST` to $p$.
4. For $p$'s `HEARTBEATREPLY` not to have been delivered to $p_0$ by time $t_{\text{out}}$ (given that both $p_0$ and $p$ are alive throughout $[t_{\text{out}} - \Delta, t_{\text{out}}]$), the round-trip time of `HEARTBEATREQUEST` + `HEARTBEATREPLY` must have exceeded $\Delta$:
   $$d_{\text{req}} + d_{\text{reply}} > \Delta \ge 2 \cdot \text{max\_delay}$$
5. Therefore, either $d_{\text{req}} > \text{max\_delay}$ or $d_{\text{reply}} > \text{max\_delay}$, which contradicts the **Perfect Synchronous Point-to-Point Links** assumption that every message between alive processes is delivered within $\text{max\_delay}$. $\blacksquare$

---

##### 2.4 Key Subtleties of $\mathcal{P}$

###### 1. Do All Correct Processes Detect a Crash at the Exact Same Time?
**No.** Even in a synchronous system running *Exclude on Timeout*, different correct processes can have local timers that are out of phase, and a process may crash while replying to some peers and before replying to others.

![[DS-L6-slide-17-detection-times.png|740]]

As shown in the timeline above:
- Process $p_3$ crashes right after sending its `HEARTBEATREPLY` to $p_1$, but before receiving/replying to $p_0$'s `HEARTBEATREQUEST`.
- Consequently, $p_0$ detects $p_3$'s crash at its very next timeout $t'''$, whereas $p_1$ receives $p_3$'s last reply at $t''$, includes $p_3 \in \text{alive}$ at $t''$, and only detects $p_3$'s crash at $t'' + \Delta$ (within $2\Delta$ of $p_3$'s crash).
- Notice the distinction between **specification** and **implementation**: the specification of **PFD1** only requires that every crashed process is *eventually* detected by every correct process, whereas the synchronous implementation *Exclude on Timeout* guarantees a concrete upper bound of $2\Delta$.

###### 2. Why Does PFD1 Say "Detected by Every *Correct* Process"?
A process $q$ that crashes shortly after $p$ crashes may halt before its own timer fires to detect $p$. We cannot require a dead process to execute detection steps; hence **Strong Completeness** quantifies over every **correct** process (processes that never crash).

###### 3. If $p \notin \text{detected}$ at Time $t$, Is $p$ Guaranteed to Be Alive at Time $t$?
**No!** Strong Accuracy guarantees the contrapositive in one direction only:
- **If $p \in \text{detected}$ at time $t$** $\implies$ $p$ is definitely crashed at time $t$.
- **If $p \notin \text{detected}$ at time $t$** $\implies$ $p$ is **not** necessarily alive at time $t$. In any distributed system with message delay $d > 0$, a process $p_0$ at time $t$ only observes the state of $p$ through messages that left $p$ at time $t - d$ or earlier. Process $p$ could have crashed in the interval $(t - 2\Delta, t]$ and simply not yet reached $p_0$'s detection deadline.

---

#### 3. Round-Based Perfect Failure Detector ($\mathcal{P}$)

In *Exclude on Timeout* (Algorithm 2.5), every process sends both `HEARTBEATREQUEST` and `HEARTBEATREPLY`, costing **$2n^2$ messages per $\Delta$ cycle**. Why do we need explicit requests if every process knows it must periodically prove it is alive?

> *"In synchronous networks, silences are expressive."* — **N. Santoro**

If all processes share an approximately synchronized notion of **rounds**, each process can proactively send a one-way `BEAT` message to all peers at the start of every round. Absence of a `BEAT` from peer $p$ by the end of the round is sufficient proof that $p$ has crashed, cutting the message complexity in half to **$n^2$ messages per round**.

---

##### 3.1 Synchronized Clocks and Round Timing Assumptions

In practice, physical hardware clocks drift apart. However, in a synchronous system, processes can run a clock synchronization protocol to maintain a **virtual (software) clock** $C_v$ whose deviation from any other correct process's virtual clock is bounded by a known maximum **clock skew** $\delta$:
$$\forall i, j, \forall t: \quad |C_{v,i}(t) - C_{v,j}(t)| \le \delta$$

![[DS-L6-slide-23-clock-sync-skew.png|740]]

Even with bounded skew $\delta$, two processes $p_i$ and $p_j$ do **not** enter round $r$ (when their local virtual clock hits $C_v = rT$) at the exact same physical instant: if $p_i$'s clock reaches $rT$ at physical time $t$, then $p_j$'s clock reaches $rT$ at some physical time in $[t - \delta, t + \delta]$.

To prevent a `BEAT` sent by $p_i$ in round $r$ from arriving at $p_j$ while $p_j$ is still in round $r-1$ (too early) or after $p_j$ has already advanced to round $r+1$ (too late), we assume:
1. **Bounded Clock Skew:** Global clock skew is bounded by $\delta$.
2. **Synchronous Point-to-Point Links with Minimum and Maximum Delay:** Every message sent between correct processes has transmission delay $d \in [d_{\min}, \text{max\_delay}]$ satisfying:
   $$d_{\min} > \delta$$
3. **Sufficiently Long Round Duration $T$:**
   $$T > 2(\text{max\_delay} + \delta)$$

---

##### 3.2 Algorithm 3: Round-Based Perfect Failure Detector $\mathcal{P}$

![[DS-L6-slide-24-round-based-p.png|760]]

![[DS-L6-slide-25-round-based-crash.png|760]]

```text
Implements:
    PerfectFailureDetector, instance P

Uses:
    PerfectPointToPointLinks, instance pp2p
    LocalVirtualClock, instance C_v

upon event < P, Init > do
    r := 0
    Corrects := Pi
    RoundAlive := Pi
    wait until C_v = 0
    for all p_j in Corrects do
        send < pp2p, Send | p_j, <p_i, BEAT> >

upon event < C_v = k*T > (with k > 0) do
    for all p_j in Corrects do
        if p_j not in RoundAlive then
            Corrects := Corrects \ {p_j}
            trigger < P, Crash | p_j >
    r := r + 1
    RoundAlive := empty_set
    for all p_j in Corrects do
        send < pp2p, Send | p_j, <p_i, BEAT> >

upon event < pp2p, Deliver | p_j, <p_j, BEAT> > do
    RoundAlive := RoundAlive U {p_j}
```

- **Message Complexity:** In each round of duration $T$, each of the $n$ processes sends at most $n$ one-way `BEAT` messages (and no replies), requiring at most **$n^2$ messages per round** (half of Algorithm 2.5's $2n^2$).

---

##### 3.3 The Central Timing Lemma and Correctness Proof

The correctness of Algorithm 3 hinges on proving that **round alignment is preserved across message deliveries**: a `BEAT` sent by $p_i$ at the start of $p_i$'s round $r$ is always delivered to $p_j$ while $p_j$ is also executing round $r$.

![[DS-L6-round-timing-lemma.svg|780]]

> **Lemma (Same-Round Delivery of `BEAT` Messages):**
> If process $p_i$ sends a `BEAT` to $p_j$ when $p_i$'s round number is $r$, the `BEAT` reaches $p_j$ when $p_j$'s round number is also $r$.

**Proof:**
Let $t$ be the physical time at which $p_i$ enters round $r$ (i.e., $C_{v,i}(t) = rT$) and sends its `BEAT` to $p_j$.
- Because the clock skew between $p_i$ and $p_j$ is at most $\delta$:
  - The **latest** physical time at which $p_j$ can enter round $r$ is $\boxed{t_{\text{enter, max}} = t + \delta}$ (if $p_j$'s clock lags behind $p_i$'s by $\delta$).
  - The **earliest** physical time at which $p_j$ could have entered round $r$ is $\boxed{t_{\text{enter, min}} = t - \delta}$ (if $p_j$'s clock leads $p_i$'s by $\delta$), which means the **earliest** physical time at which $p_j$ can leave round $r$ (entering round $r+1$) is $\boxed{t_{\text{leave, min}} = t - \delta + T}$.
- Meanwhile, the `BEAT` sent by $p_i$ at time $t$ arrives at $p_j$ at some physical time $t_{\text{arr}} \in [t + d_{\min}, \, t + \text{max\_delay}]$.
- **No Early Arrival (arrives after $p_j$ enters round $r$):**
  Since $d_{\min} > \delta$, we have:
  $$t_{\text{arr}} \ge t + d_{\min} > t + \delta \ge t_{\text{enter}}(p_j, r)$$
  Thus, when the `BEAT` reaches $p_j$, $p_j$ has already entered round $r$ (and already reset `RoundAlive := \emptyset` for round $r$).
- **No Late Arrival (arrives before $p_j$ leaves round $r$):**
  Since $T > 2(\text{max\_delay} + \delta)$, the earliest time $p_j$ can finish round $r$ satisfies:
  $$t_{\text{leave, min}} = t - \delta + T > t - \delta + 2\delta + 2\text{max\_delay} = t + \delta + 2\text{max\_delay} > t + \text{max\_delay} \ge t_{\text{arr}}$$
  Thus, the `BEAT` arrives strictly before $p_j$ finishes round $r$. Combining both inequalities:
  $$\boxed{t + \delta < t + d_{\min} \le t_{\text{arr}} \le t + \text{max\_delay} < t - \delta + T}$$
  which proves that $p_j$ is in round $r$ when $p_i$'s `BEAT` is delivered. $\blacksquare$

###### Strong Completeness, Strong Accuracy, and Minimum Round Length $T$
- **PFD1 (Strong Completeness):** If $p_i$ crashes during round $r$, it sends no `BEAT` in round $r+1$ (or subsequent rounds). By the end of round $r+1$, $p_i \notin \text{RoundAlive}$ at every correct process $p_j$, so every correct $p_j$ removes $p_i$ from `Corrects` and triggers $\langle \mathcal{P}, \text{Crash} \mid p_i \rangle$.
- **PFD2 (Strong Accuracy):** If $p_i$ has not crashed up to the end of round $r$, then $p_i$ sent a `BEAT` at the start of round $r$. By the Lemma above, that `BEAT` is delivered to every correct $p_j$ while $p_j$ is in round $r$, adding $p_i$ to `RoundAlive` before $p_j$'s round-$r$ check at $C_v = (r+1)T$. Thus $p_i$ is never falsely detected.
- **Tighter Bound on $T$ (Slide 28 Question):** Notice from the inequality $t + \text{max\_delay} < t - \delta + T$ that the strict minimum round duration required for the proof is actually:
  $$\boxed{T > \text{max\_delay} + \delta}$$
  (while the slide's $T > 2(\text{max\_delay} + \delta)$ provides a conservative safety margin).

---

##### 3.4 Abstracting Synchronous Systems as Logical Rounds & Mid-Loop Crashes

Thanks to the Round-Based $\mathcal{P}$ timing lemma, we can abstract away physical clocks $C_v$, skew $\delta$, and link delays $[d_{\min}, \text{max\_delay}]$, and view a synchronous distributed system as executing in **discrete logical rounds** $r = 0, 1, 2, \dots$:
- All alive processes switch from round $r$ to round $r+1$ simultaneously in logical round time.
- Every message sent by a process at the start of round $r$ is delivered to its destination before the end of round $r$.

![[DS-L6-slide-29-synchronous-rounds.png|740]]

###### Why Can Two Processes Detect a Crash in Adjacent Rounds $r=3$ and $r=4$?

Look closely at the round diagram above: process $p_3$ crashes during round $r=2$, yet processes $p_0$ and $p_2$ detect $p_3$'s crash at the start of **$r=3$**, while processes $p_1, p_5, p_6$ detect $p_3$'s crash only at the start of **$r=4$**! How is that possible if every message sent in round $r=2$ arrives in round $r=2$?

![[DS-L6-slide-31-mid-loop-crash.png|760]]

**Explanation (Non-Atomic `for all` Send Loop):**
- In Algorithm 3, sending a `BEAT` at the start of round $r=2$ is implemented by a sequential loop:
  ```text
  for all p_j in Corrects do
      send < pp2p, Send | p_j, <p_3, BEAT> >
  ```
- This loop is **not an atomic broadcast**. Process $p_3$ can crash **in the middle of executing the `for all` loop** at the start of round $r=2$:
  1. $p_3$ successfully sends its round-2 `BEAT` to $p_1, p_5, p_6$.
  2. $p_3$ **crashes** before the loop reaches $p_0$ and $p_2$.
- Consequently, during round $r=2$, $p_1, p_5, p_6$ receive $p_3$'s `BEAT` (so at the start of $r=3$ they still consider $p_3 \in \text{RoundAlive}$), whereas $p_0$ and $p_2$ receive no `BEAT` from $p_3$ in round $r=2$ and immediately trigger $\langle \mathcal{P}, \text{Crash} \mid p_3 \rangle$ at the start of **$r=3$**.
- In round $r=3$, $p_3$ is completely dead and sends no `BEAT` to anyone, so $p_1, p_5, p_6$ detect $p_3$'s crash at the start of **$r=4$** (at most **1 round later**).

---

#### 4. Eventually Perfect Failure Detector ($\Diamond\mathcal{P}$)

##### 4.1 From Synchronous to Partially Synchronous Systems

In *Exclude on Timeout* (Algorithm 2.5), choosing a smaller timeout $\Delta$ reduces the crash detection latency ($2\Delta$), which is desirable when waiting processes are blocked. However, if $\Delta$ is chosen smaller than the actual round-trip delay of a slow network spike, a correct process's `HEARTBEATREPLY` will arrive **after** the timeout, causing a **false detection**.

In many real networks (such as the Internet or shared data centers), message delays are mostly small, but occasional congestion spikes make it impossible to guarantee a hard upper bound $\text{max\_delay}$ that holds from $t=0$ with reasonable latency. Instead, we model the system as **Partially Synchronous (Eventually Synchronous)**:

> **Eventual Synchrony Assumption:**
> There is no known bound on message transmission delay initially, **except that there exists an (unknown) stabilization time $t_{\text{stab}}$ after which the system becomes synchronous**, i.e., every message sent after $t_{\text{stab}}$ is delivered within an (unknown) bound $\text{MAX\_DELAY}$.

Because a timeout $\Delta$ chosen too small initially may cause false suspicions before $t_{\text{stab}}$, the failure detector **cannot permanently declare a process crashed**. Instead:
1. It emits **revocable suspicions** ($\langle \Diamond\mathcal{P}, \text{Suspect} \mid p \rangle$).
2. Whenever a previously suspected process $p$ later proves it is alive (by delivering a heartbeat reply), the detector **corrects its mistake** ($\langle \Diamond\mathcal{P}, \text{Restore} \mid p \rangle$) and **increases its timeout period** so it stops making the same mistake once the network stabilizes.

---

##### 4.2 Specification of $\Diamond\mathcal{P}$ (Module 2.8)

![[DS-L6-slide-34-epfd-spec.png|740]]

> **Module 2.8 — Eventually Perfect Failure Detector ($\Diamond\mathcal{P}$):**
> - **Events (Indications):**
>   - $\langle \Diamond\mathcal{P}, \text{Suspect} \mid p \rangle$ — notifies the upper layer that process $p$ is currently suspected of having crashed.
>   - $\langle \Diamond\mathcal{P}, \text{Restore} \mid p \rangle$ — notifies the upper layer that a previously suspected process $p$ is no longer suspected.
> - **Properties:**
>   - **EPFD1 — Strong Completeness:** Eventually, every process that crashes is permanently suspected by every correct process.
>   - **EPFD2 — Eventual Strong Accuracy:** Eventually, no correct process is ever suspected by any correct process.

---

##### 4.3 Algorithm 2.7: *Increasing Timeout*

![[DS-L6-slide-37-increasing-timeout.png|780]]

```text
Implements:
    EventuallyPerfectFailureDetector, instance <>P

Uses:
    PerfectPointToPointLinks, instance pp2p

upon event < <>P, Init > do
    alive := Pi
    suspected := empty_set
    delay := Delta
    starttimer(delay)

upon event < Timeout > do
    if alive intersect suspected != empty_set then
        delay := delay + Delta
    for all p in Pi do
        if (p not in alive) and (p not in suspected) then
            suspected := suspected U {p}
            trigger < <>P, Suspect | p >
        else if (p in alive) and (p in suspected) then
            suspected := suspected \ {p}
            trigger < <>P, Restore | p >
        send < pp2p, Send | p, [HEARTBEATREQUEST] >
    alive := empty_set
    starttimer(delay)

upon event < pp2p, Deliver | q, [HEARTBEATREQUEST] > do
    send < pp2p, Send | q, [HEARTBEATREPLY] >

upon event < pp2p, Deliver | p, [HEARTBEATREPLY] > do
    alive := alive U {p}
```

###### Step-by-Step Mechanism of *Increasing Timeout*
1. **Detecting a Premature Timeout (`if alive \cap suspected \neq \emptyset`):**
   How does $p_0$ know its timeout `delay` was too short? If some peer $p$ is currently in `suspected` (meaning $p$ missed an earlier deadline) **and** $p$ is now in `alive` (meaning $p$'s `HEARTBEATREPLY` arrived during the most recent window), then $p$ was **not** crashed when $p_0$ suspected it! Recognizing this false suspicion, $p_0$ increments its timeout:
   $$\text{delay} := \text{delay} + \Delta$$
2. **Suspecting Quiet Processes (`(p \notin alive) \land (p \notin suspected)`):**
   If $p$ did not reply during the last window and is not already suspected, $p_0$ adds $p$ to `suspected` and triggers $\langle \Diamond\mathcal{P}, \text{Suspect} \mid p \rangle$.
3. **Restoring Falsely Suspected Processes (`(p \in alive) \land (p \in suspected)`):**
   If $p$ was in `suspected` but replied during the last window, $p_0$ removes $p$ from `suspected` and triggers $\langle \Diamond\mathcal{P}, \text{Restore} \mid p \rangle$.

![[DS-L6-epfd-suspect-restore.svg|780]]

###### Why are `<Restore | p>` and `delay := delay + \Delta` triggered only on `<Timeout>` instead of immediately inside `Deliver([HEARTBEATREPLY])`?
- **Both designs are correct**, and triggering `<Restore | p>` immediately upon `Deliver([HEARTBEATREPLY])` is a valid alternative that restores $p$ slightly earlier.
- Algorithm 2.7 checks `alive \cap suspected` at `<Timeout>` so that even if **multiple** suspected processes reply late during the same window, `delay` is incremented only **once per timeout window** (`delay := delay + \Delta`) rather than once per late message, and all state transitions (`Suspect` / `Restore`) are batched cleanly at timeout boundaries.

---

##### 4.4 Correctness of *Increasing Timeout* and Properties of `suspected`

###### Proof of EPFD1 (Strong Completeness) and EPFD2 (Eventual Strong Accuracy)
- **EPFD1 (Strong Completeness):** If a process $p$ crashes at time $t$, it stops sending `HEARTBEATREPLY` messages forever. Because links do notforge messages, $p$ can be added to `alive` only finitely many times (from messages already in transit before $t$). After the last such message is delivered, in the next timeout window $p \notin \text{alive}$, so $p$ is added to `suspected` (if not already there) and is **never** restored again.
- **EPFD2 (Eventual Strong Accuracy):** After the unknown stabilization time $t_{\text{stab}}$, every message between correct processes is delivered within the unknown bound $\text{MAX\_DELAY}$, so every round-trip `HEARTBEATREQUEST` + `HEARTBEATREPLY` completes within $2 \cdot \text{MAX\_DELAY}$.
  - Suppose a correct process $p_0$ keeps falsely suspecting some correct process $p$ after $t_{\text{stab}}$.
  - Because $p$ is correct and links are reliable, $p$'s `HEARTBEATREPLY` eventually arrives at $p_0$, placing $p \in \text{alive} \cap \text{suspected}$ at a subsequent timeout and forcing $p_0$ to execute `delay := delay + \Delta` and `Restore(p)`.
  - Each false suspicion after $t_{\text{stab}}$ increases `delay` by $\Delta > 0$. Therefore, after finitely many increments, `delay` reaches a value $\ge 2 \cdot \text{MAX\_DELAY}$ (or stops incrementing earlier because no false suspicions occur anymore).
  - Once `delay` $\ge 2 \cdot \text{MAX\_DELAY}$ after $t_{\text{stab}}$, every correct process replies within a single timeout window, so no correct process is ever suspected again (and `delay` stops growing).

###### Can We Predict the Final Value of `delay` in Advance?
**No.** Even if an omniscient observer told us the post-stabilization bound $\text{MAX\_DELAY}$, we still could **not** bound the final value of `delay` in advance! Before the unknown stabilization time $t_{\text{stab}}$, message delays can be arbitrarily large and last arbitrarily long, causing arbitrarily many false suspicions and therefore arbitrarily many `delay := delay + \Delta` increments before $t_{\text{stab}}$ is even reached.

---

##### 4.5 Stabilization of the `suspected` Sets Across Correct Processes

![[Pasted image 20261103121236.png|740]]

> **Theorem (Eventual Agreement of `suspected` Sets):**
> In any execution of Algorithm 2.7 ($\Diamond\mathcal{P}$), for any two correct processes $p_1$ and $p_2$, there exists a time $t$ after which:
> $$\forall t' \ge t: \quad \text{suspected}_{p_1}(t') = \text{suspected}_{p_2}(t') = \text{Crashed}$$
> where $\text{Crashed}$ is the set of all processes that crash during the execution.

![[Pasted image 20261103121557.png|680]]

**Proof (by contradiction):**
1. Since the system has finitely many processes $\Pi$, there is a time $t_{\text{crash}}$ by which all processes that ever crash in the execution have already crashed.
2. By **EPFD1 (Strong Completeness)**, for every crashed process $q \in \text{Crashed}$, there is a time after which $q$ is permanently in $\text{suspected}_{p_1}$ and permanently in $\text{suspected}_{p_2}$.
3. By **EPFD2 (Eventual Strong Accuracy)**, for every correct process $r \in \Pi \setminus \text{Crashed}$, there is a time after which $r$ is never in $\text{suspected}_{p_1}$ and never in $\text{suspected}_{p_2}$.
4. Taking $t$ to be the maximum of all these finitely many stabilization times across all processes in $\Pi$:
   - Suppose for contradiction that at some time $t' \ge t$, $\text{suspected}_{p_1}(t') \neq \text{suspected}_{p_2}(t')$.
   - Then there exists some process $x \in \Pi$ such that (without loss of generality) $x \in \text{suspected}_{p_1}(t')$ and $x \notin \text{suspected}_{p_2}(t')$.
   - **Case 1 ($x$ is a correct process):** Since $t' \ge t$, $x \in \text{suspected}_{p_1}(t')$ contradicts **EPFD2** (no correct process is suspected after $t$).
   - **Case 2 ($x$ is a crashed process):** Since $t' \ge t$, $x \notin \text{suspected}_{p_2}(t')$ contradicts **EPFD1** (every crashed process is permanently suspected by every correct process after $t$).
   - Both cases yield a contradiction. Hence $\text{suspected}_{p_1}(t') = \text{suspected}_{p_2}(t')$ for all $t' \ge t$. $\blacksquare$

---

#### 5. Summary Comparison of Failure Detectors

| Feature | Perfect FD ($\mathcal{P}$) — *Exclude on Timeout* | Perfect FD ($\mathcal{P}$) — *Round-Based* | Eventually Perfect FD ($\Diamond\mathcal{P}$) — *Increasing Timeout* |
| :--- | :--- | :--- | :--- |
| **Synchrony Assumption** | Synchronous ($d \le \text{max\_delay}$) | Synchronous ($d \in [d_{\min}, \text{max\_delay}]$, clock skew $\le \delta$) | Eventually Synchronous ($d \le \text{MAX\_DELAY}$ after unknown $t_{\text{stab}}$) |
| **Timing Condition** | $\Delta \ge 2 \cdot \text{max\_delay}$ | $d_{\min} > \delta$ and $T > \text{max\_delay} + \delta$ (slide uses $T > 2(\text{max\_delay} + \delta)$) | Adaptive: `delay := delay + \Delta` whenever $\text{alive} \cap \text{suspected} \neq \emptyset$ |
| **Indications** | $\langle \mathcal{P}, \text{Crash} \mid p \rangle$ (irrevocable) | $\langle \mathcal{P}, \text{Crash} \mid p \rangle$ (irrevocable) | $\langle \Diamond\mathcal{P}, \text{Suspect} \mid p \rangle$ and $\langle \Diamond\mathcal{P}, \text{Restore} \mid p \rangle$ |
| **Completeness** | **Strong Completeness (PFD1)** (within $2\Delta$) | **Strong Completeness (PFD1)** (within 2 rounds) | **Strong Completeness (EPFD1)** |
| **Accuracy** | **Strong Accuracy (PFD2)** (never false) | **Strong Accuracy (PFD2)** (never false) | **Eventual Strong Accuracy (EPFD2)** (no false suspicions after stabilization) |
| **Message Pattern** | Request + Reply (`HEARTBEATREQUEST` / `HEARTBEATREPLY`) | One-way proactive `BEAT` (*silences are expressive*) | Request + Reply (`HEARTBEATREQUEST` / `HEARTBEATREPLY`) |
| **Messages per Period** | $2n^2$ messages per $\Delta$ | $n^2$ messages per round $T$ | $2n^2$ messages per `delay` window |
