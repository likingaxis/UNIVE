#### Clock Synchronization Fundamentals

##### Bounding the Skew: Maximum Resynchronization Interval
- Even if two correct physical clocks start perfectly synchronized at real time $t = 0$ ($C_1(0) = C_2(0)$), their readings will gradually diverge because each hardware oscillator drifts at a rate within $[1 - \rho, 1 + \rho]$.
- **Worst-case divergence**:
  - Clock $1$ runs as fast as allowed: $C_1(t) = (1 + \rho)t$.
  - Clock $2$ runs as slow as allowed: $C_2(t) = (1 - \rho)t$.
- At real time $t$, the maximum **clock skew** between them grows linearly with $t$:

$$|C_1(t) - C_2(t)| \le (1 + \rho)t - (1 - \rho)t = 2\rho t$$

![[DS-L4-skew-growth.svg|580]]

- To guarantee that the skew between any two correct clocks never exceeds a maximum tolerated bound $\Delta$ ($|C_1(t) - C_2(t)| \le \Delta$), the system must resynchronize at least once every $t_{\max}$ seconds, where:

$$2\rho t \le \Delta \implies \boxed{t \le \frac{\Delta}{2\rho}}$$

---

##### Monotonicity and Clock Adjustments

> **Monotonicity**: A clock $C$ is **monotonic** if it never runs backward in real time:
> $$t' > t \implies C(t') > C(t)$$

###### Why Stepping a Clock Backward Breaks Applications
- If a fast clock (e.g., reading `08:05` when real time is `08:00`) is corrected by instantaneously **stepping it backward** to `08:00`, the same clock values (`08:00` to `08:05`) will occur **twice**:
  1. **Event and Message Ordering**: An event $e_1$ occurring just before the step may receive timestamp `08:04`, while a later event $e_2$ occurring after the step receives timestamp `08:01`, reversing their apparent order.
  2. **Build Systems (`make`)**: If a source file is modified at `08:04`, then the clock jumps back and the object file is compiled at `08:01`, the build tool sees the source file as newer than the binary or vice versa, corrupting incremental builds.
  3. **Security Tickets (Kerberos)**: A ticket or session key that already expired at `08:03` could become valid again after the clock is stepped back to `08:00`.

###### Slewing: Preserving Monotonicity via Software Clock Scaling
- Instead of jumping backward, the operating system preserves monotonicity by **slewing** the software clock $C_i(t) = \alpha H_i(t) + \beta$:
  - **If the clock is slow** (behind reference time): increase $\alpha$ temporarily so the software clock runs slightly faster until it catches up.
  - **If the clock is fast** (ahead of reference time): decrease $\alpha$ (keeping $\alpha > 0$) so the software clock advances more slowly (or temporarily suppress a fraction of hardware timer interrupts) until real time catches up, then restore normal speed.

![[DS-L4-step-slew.svg|600]]

###### Operating System Support: `CLOCK_MONOTONIC` vs. `CLOCK_REALTIME`
- Modern POSIX systems (such as Linux `clock_gettime`) separate timekeeping into two distinct clock interfaces:
  - **`CLOCK_REALTIME`**: Wall-clock time synchronized to external UTC; can jump forward or backward if the system administrator or NTP steps the clock.
  - **`CLOCK_MONOTONIC`**: Non-settable clock that measures elapsed time since an arbitrary starting point (such as system boot); cannot jump backward, though its rate may still be gently slewed by NTP. Used for measuring durations and timeouts.

---

##### External vs. Internal Synchronization

###### Coordinated Universal Time (UTC)
- **UTC (Coordinated Universal Time)** is the international physical reference time standard, maintained by a global network of **atomic clocks** (primarily Cesium-133 oscillators with drift rate $\rho \approx 10^{-13}$) and adjusted with leap seconds to remain aligned with astronomical time.
- UTC is broadcast globally via **GPS satellites**, **radio stations** (e.g., WWV, DCF77), and the **Internet (NTP)**.

###### Formal Definitions ($n$ Clocks $C_1, C_2, \dots, C_n$)

> **External Synchronization (Accuracy)**: For a synchronization bound $D > 0$ and an external UTC source $S(t)$, the clocks are **externally synchronized** within $D$ if, at all times $t$ in the interval of interest:
> $$|S(t) - C_i(t)| < D \quad \forall i \in \{1, 2, \dots, n\}$$

![[Pasted image 20261025123122.png|360]]

![[DS-L4-external-bound.svg|540]]

> **Internal Synchronization (Agreement)**: For a synchronization bound $D > 0$, the clocks are **internally synchronized** within $D$ if, at all times $t$ in the interval of interest, every pair of clocks agrees within $D$:
> $$|C_i(t) - C_j(t)| < D \quad \forall i, j \in \{1, 2, \dots, n\}$$

![[DS-L4-internal-target.svg|540]]

###### Relationship Between External and Internal Synchronization
- **Internal synchronization does NOT imply external synchronization**: all nodes in a cluster might agree that the time is `03:00` ($|C_i(t) - C_j(t)| = 0$), even when actual UTC is `08:00`.
- **External synchronization within $D$ implies internal synchronization within $2D$**:
  - Suppose $|S(t) - C_i(t)| < D$ and $|S(t) - C_j(t)| < D$.
  - By the triangle inequality (in the worst case, $C_i$ is almost $+D$ above $S(t)$ while $C_j$ is almost $-D$ below $S(t)$):

$$|C_i(t) - C_j(t)| = |(C_i(t) - S(t)) - (C_j(t) - S(t))| \le |C_i(t) - S(t)| + |S(t) - C_j(t)| < D + D = 2D$$

---

#### Physical Clock Synchronization Algorithms

##### Cristian's Algorithm (External Synchronization)

###### Protocol Mechanism
- Designed for **external synchronization**: a client process $p$ synchronizes its local clock $C_p$ with a **time server $S$** connected to a UTC source.

![[DS-L4-time-server.svg|480]]

1. Process $p$ sends a time request message $m_r$ to server $S$ and records the sending instant using its local clock (or starts a local monotonic timer).
2. Upon receiving $m_r$, server $S$ reads its current UTC timestamp $t$ and replies with message $m_t(t)$.
3. Process $p$ receives $m_t(t)$ and measures the total **Round-Trip Time ($\mathrm{RTT}$)** elapsed between sending $m_r$ and receiving $m_t(t)$.
4. Assuming the network delay is approximately symmetric and server processing time is negligible, $p$ estimates the one-way reply transit time as $\frac{\mathrm{RTT}}{2}$ and sets its clock to:

$$\boxed{C_p \gets t + \frac{\mathrm{RTT}}{2}}$$

![[Pasted image 20261025125607.png|550]]

![[DS-L4-cristian-rtt.svg|580]]

###### Accuracy Derivation (With Known Minimum One-Way Delay $\min$)
- Suppose the system is asynchronous (no upper bound on message delay), **except** that any message takes at least a known **minimum transmission time $\min > 0$** to traverse the link in either direction:
  - Request delay $d_{\text{req}} \ge \min$
  - Reply delay $d_{\text{rep}} \ge \min$
  - Total round-trip time $\mathrm{RTT} = d_{\text{req}} + d_{\text{rep}}$

![[Pasted image 20261025131716.png|550]]

- We bound the actual real time $T_{\text{actual}}$ at the moment $p$ receives $m_t(t)$ by analyzing the two extreme cases for the reply delay $d_{\text{rep}}$:
  - **Case 1 (Fastest possible reply)**: The request took almost the entire $\mathrm{RTT}$ ($d_{\text{req}} = \mathrm{RTT} - \min$), and the reply took the minimum possible time ($d_{\text{rep}} = \min$). Then the earliest possible actual time upon reception is:
    $$T_{\min} = t + \min$$
  - **Case 2 (Slowest possible reply)**: The request took the minimum possible time ($d_{\text{req}} = \min$), and the reply took the rest of the $\mathrm{RTT}$ ($d_{\text{rep}} = \mathrm{RTT} - \min$). Then the latest possible actual time upon reception is:
    $$T_{\max} = t + \mathrm{RTT} - \min$$
- Therefore, the true time at reception is guaranteed to lie within the interval:

$$T_{\text{actual}} \in [t + \min, \; t + \mathrm{RTT} - \min]$$

- The total width of this uncertainty interval is $(t + \mathrm{RTT} - \min) - (t + \min) = \mathrm{RTT} - 2\min$.
- Because $p$ sets $C_p = t + \frac{\mathrm{RTT}}{2}$, which is the **exact midpoint** of $[t + \min, \; t + \mathrm{RTT} - \min]$, the maximum synchronization error (accuracy) is half the interval width:

$$\boxed{\text{Accuracy} = \pm\left(\frac{\mathrm{RTT}}{2} - \min\right)}$$

![[DS-L4-slide-46-cristian-accuracy.png|650]]

- **Consequence**: A smaller $\mathrm{RTT}$ yields tighter accuracy. If a measurement suffers a large congestion spike (large $\mathrm{RTT}$), $p$ can discard the reading and retry until it obtains a small $\mathrm{RTT}$.

###### Limitations of Cristian's Algorithm
1. **Single Point of Failure (SPOF)**: If the single time server $S$ crashes, no client can synchronize.

![[Pasted image 20261025132829.png|360]]

2. **Redundant Server Group**: To tolerate crashes, the single server can be replaced by a group of replicated time servers ($S_1, S_2, S_3$); the client multicasts its request to the group and uses the **first reply** (smallest $\mathrm{RTT}$).

![[Pasted image 20261025142750.png|420]]

3. **Malicious / Faulty Server**: Cristian's algorithm assumes a trustworthy server; a Byzantine server reporting forged timestamps cannot be handled by taking the fastest reply alone.

---

##### Berkeley's Algorithm (Internal Synchronization)

###### Protocol Mechanism
- Designed for **internal synchronization** among a group of machines when no external UTC receiver is required.
- One node is elected to act as the **master (coordinator)**; all other nodes act as **slaves**.

![[DS-L4-berkeley-master.svg|500]]

1. **Polling**: The master periodically polls all slaves for their current clock readings.
2. **Offset Estimation**: Upon receiving replies, the master estimates each slave $p_i$'s current clock offset $\Delta_{p_i} = C_{p_i} - C_{\text{master}}$ relative to the master's own clock (using Cristian-style $\mathrm{RTT}/2$ compensation for message transit delays). The master's own offset is $\Delta_{\text{master}} = 0$.
3. **Outlier Filtering**: To prevent a single faulty or severely drifted clock from skewing the entire cluster, the master discards any offset $\Delta_{p_i}$ that differs from the master (or group) by more than a configurable fault-tolerance threshold $\gamma$.
4. **Fault-Tolerant Average**: The master computes the arithmetic mean $\mathrm{avg}$ of the remaining **non-faulty** offsets (including $\Delta_{\text{master}} = 0$).
5. **Relative Adjustments**: Instead of sending an absolute timestamp (which would suffer new variable network delays on the way back), the master sends each process $p_i$ (including outliers!) its **individual relative adjustment**:

$$\boxed{\mathrm{adg}_{p_i} = \mathrm{avg} - \Delta_{p_i}}$$

###### Complete Worked Example (With Outlier Rejection)
- Consider a master at `03:05` and three slaves ($P_1, P_2, P_3$) with outlier threshold $\gamma = 15\text{ min}$:

![[DS-L4-berkeley-outliers.svg|540]]

| Process | Current Clock | Offset $\Delta_{p_i}$ vs. Master (`03:05`) | Within Threshold ($\|\Delta_{p_i}\| \le 15\text{ min}$)? |
| :--- | :---: | :---: | :---: |
| **Master** | `03:05` | $0\text{ min}$ | **Yes** (included in average) |
| **Slave 1 ($P_1$)** | `02:55` | $-10\text{ min}$ | **Yes** (included in average) |
| **Slave 2 ($P_2$)** | `03:00` | $-5\text{ min}$ | **Yes** (included in average) |
| **Slave 3 ($P_3$)** | `03:25` | $+20\text{ min}$ | **No** (excluded from average as outlier) |

- **Step 1 — Compute fault-tolerant average** over the $3$ non-outlier clocks (Master, $P_1$, $P_2$):

$$\mathrm{avg} = \frac{0 + (-10) + (-5)}{3} = \frac{-15}{3} = -5\text{ min}$$

- **Step 2 — Compute individual adjustments** $\mathrm{adg}_{p_i} = \mathrm{avg} - \Delta_{p_i}$ for **all** processes (including $P_3$, so $P_3$ is also brought back into agreement):

| Process | Formula $\mathrm{adg}_{p_i} = \mathrm{avg} - \Delta_{p_i}$ | Adjustment Sent | Corrected Clock Reading |
| :--- | :---: | :---: | :---: |
| **Master** | $-5 - 0$ | $-5\text{ min}$ | `03:00` |
| **Slave 1 ($P_1$)** | $-5 - (-10)$ | $+5\text{ min}$ | `03:00` |
| **Slave 2 ($P_2$)** | $-5 - (-5)$ | $0\text{ min}$ | `03:00` |
| **Slave 3 ($P_3$)** | $-5 - (+20)$ | $-25\text{ min}$ | `03:00` |

![[DS-L4-slides-51-52-berkeley-corrections.png|680]]

###### Fault Handling in Berkeley's Algorithm
- **Slave crash**: If a slave fails to reply within a timeout, the master simply excludes it from the current averaging round.
- **Master crash**: If the master crashes, slaves elect a new master using a **leader election algorithm**.
- **Comparison with Cristian's Algorithm**:

| Feature | Cristian's Algorithm | Berkeley's Algorithm |
| :--- | :--- | :--- |
| **Synchronization Type** | **External** (synchronizes clients to UTC) | **Internal** (brings group into mutual agreement) |
| **UTC Source Required?** | Yes (at the time server) | No |
| **Initiator** | Passive server; clients pull time on demand | Active master; polls slaves periodically |
| **Message Sent to Nodes** | Absolute server timestamp $t$ | Relative clock adjustment $\mathrm{adg}_{p_i} = \mathrm{avg} - \Delta_{p_i}$ |

---

##### Network Time Protocol (NTP)

###### Hierarchical Stratum Architecture
- **NTP (Network Time Protocol)** is the standard protocol for synchronizing clocks across the global Internet to UTC.
- To achieve both **scalability** (billions of clients cannot query the same atomic clock directly) and **fault tolerance** (redundant servers and paths), NTP organizes servers into a hierarchy of levels called **strata**:
  - **Stratum 0**: High-precision physical reference clocks (atomic clocks, GPS receivers, radio time clocks). They are not servers on the network; they are directly attached to Stratum 1 computers.
  - **Stratum 1**: Primary time servers directly connected to a Stratum 0 reference device.
  - **Stratum 2**: Secondary servers that synchronize over the network with one or more Stratum 1 servers (and peer with other Stratum 2 servers).
  - **Stratum 3 (and higher, up to 15)**: Downstream servers and end-user machines that synchronize with the stratum above them. Accuracy degrades slightly at each deeper stratum due to cumulative network jitter.

![[DS-L4-ntp-strata.svg|500]]

###### Redundancy and Filtering in NTP
- Each NTP server typically queries **multiple upstream servers** across multiple message exchanges, applying statistical filtering to discard high-jitter samples (similar to choosing the minimum $\mathrm{RTT}$ in Cristian's algorithm) and outlier rejection (similar to Berkeley's algorithm) before slewing the local clock.

![[Pasted image 20261025195614.png|520]]

![[Pasted image 20261025195727.png|520]]

---

#### Limits of Physical Clocks and Motivation for Logical Time

##### Overlapping Uncertainty Intervals
- Even with external synchronization guaranteeing $|S(t) - C_i(t)| < D$ for every process $p_i$, physical timestamps **cannot** reliably order arbitrary distributed events that occur close together in time.
- **Example**: Suppose synchronization accuracy is $D = 5\text{ ms}$:
  - Process $P_1$ records event $e_1$ with local timestamp $C_1(e_1) = 100\text{ ms}$. Its true UTC time lies in $t(e_1) \in [95, 105]\text{ ms}$.
  - Process $P_2$ records event $e_2$ with local timestamp $C_2(e_2) = 106\text{ ms}$. Its true UTC time lies in $t(e_2) \in [101, 111]\text{ ms}$.
- Because the two uncertainty intervals **overlap** on $[101, 105]\text{ ms}$, it is entirely possible that $t(e_1) = 104\text{ ms}$ and $t(e_2) = 102\text{ ms}$ ($e_2$ actually occurred before $e_1$), despite $C_1(e_1) < C_2(e_2)$!

![[DS-L4-timestamp-uncertainty.svg|580]]

![[DS-L4-slide-59-timestamp-uncertainty.png|650]]

- **Sufficient Condition for Physical Timestamp Ordering**: Two events $e_1$ and $e_2$ with synchronization bound $D$ are guaranteed to satisfy $t(e_1) < t(e_2)$ on the basis of their physical timestamps alone **if and only if** their uncertainty intervals are disjoint:

$$\boxed{C(e_2) - C(e_1) > 2D}$$

---

##### Causality: Why FIFO Delivery is Not Enough

###### Distributed Group Chat Scenario
- Consider four participants in a distributed trading chat room where every message is broadcast to all participants over an asynchronous network:
  1. **Alice sends $m_1$**: *"If Apple's stock price drops, what should we do?"*
  2. **Mike receives $m_1$ and replies $m_2$**: *"Sell Apple and buy Amazon."*
  3. **Alice receives $m_2$ and replies $m_3$**: *"Who will do it?"*
  4. **Bob's supervisor receives $m_3$ and replies $m_4$**: *"Bob will do it."*

![[Pasted image 20261025210732.png|580]]

- Each message is **causally dependent** on the preceding one:

$$m_1 \to m_2 \to m_3 \to m_4$$

![[DS-L4-causal-chain.svg|540]]

###### What Goes Wrong Under FIFO Delivery Alone
- Because network delays vary across different sender–receiver paths, Bob may receive the messages in the order:
  1. $m_2$ from Mike (*"Sell Apple and buy Amazon"*)
  2. $m_4$ from Supervisor (*"Bob will do it"*)
  3. $m_1$ from Alice (*"If Apple's stock price drops..."*)
  4. $m_3$ from Alice (*"Who will do it?"*)

![[Pasted image 20261025210923.png|580]]

- **Does this execution violate FIFO?** **No!**
  - FIFO only constrains messages sent by the **same sender**:
    - Alice sent $m_1$ then $m_3$, and Bob delivered $m_1$ before $m_3$ ($\checkmark$).
    - Mike sent only $m_2$ ($\checkmark$).
    - The supervisor sent only $m_4$ ($\checkmark$).
- Yet Bob sees an unconditional order to sell Apple and buy Amazon before seeing Alice's condition ($m_1$).
- Preserving the meaning of cross-sender interactions requires **Causal Order** (tracked via **Logical Clocks**), not merely per-sender FIFO order.

---

#### FIFO Link Correctness Exercises

##### Reference Specification and Original Algorithm
- Recall the four properties of a **FIFO Perfect Point-to-Point Link** (built on top of a **Perfect Link**, which already guarantees Reliable Delivery, No Duplication, and No Creation):
  1. **FIFO Delivery (Safety)**: If a process sends message $m_1$ before message $m_2$ to the same destination, then no process delivers $m_2$ unless it has already delivered $m_1$ (equivalently, if both are delivered, $m_1$ is delivered before $m_2$).
  2. **Reliable Delivery (Liveness)**: If a correct process sends a message $m$ to a correct destination, then $m$ is eventually delivered.
  3. **No Duplication (Safety)**: No message is delivered by a process more than once.
  4. **No Creation (Safety)**: If a message $m$ is delivered by a process, then $m$ was previously sent to it by the sender.

![[DS-HW2-FIFO-properties-slide-97.png|650]]

![[DS-HW2-FIFO-algorithm-slide-98.png|650]]

```text
Upon event <Init> do
    seq := 0;
    next := 1;
    pending := {};

Upon event <Send, q, m> do
    seq := seq + 1;
    trigger <plSend, q, (m, seq)>;

Upon event <plDeliver, p, (m, sn)> do
    pending := pending U {(m, sn)};
    while exists (m', sn') in pending such that sn' = next do
        next := next + 1;
        pending := pending \ {(m', sn')};
        trigger <Deliver, p, m'>;
```

##### Analysis of Algorithm Modifications

![[DS-L4-fifo-variants-trace.svg|720]]

###### Modification A — Change guard `sn' = next` to `sn' >= next`
```text
    while exists (m', sn') in pending such that sn' >= next do
        next := next + 1;
        pending := pending \ {(m', sn')};
        trigger <Deliver, p, m'>;
```
- **FIFO Delivery — Violated ($\times$)**:
  - *Counterexample*: Sender $p$ sends $m_1(1)$, $m_2(2)$, $m_3(3)$ to $q$ (initially `next = 1`). Suppose $m_3(3)$ arrives first from the Perfect Link: since $3 \ge 1$, $q$ delivers $m_3$, removes it from `pending`, and increments `next` to $2$. Next, $m_2(2)$ arrives: since $2 \ge 2$, $q$ delivers $m_2$ and increments `next` to $3$. Thus $m_3$ is delivered before $m_2$, violating FIFO. *(Note: a 3-message trace is required because if $m_2(2)$ arrived first and set `next = 2`, $m_1(1)$ would never be delivered, so no out-of-order pair would be delivered.)*
- **Reliable Delivery — Violated ($\times$)**:
  - *Counterexample*: In the same execution, when $m_1(1)$ finally arrives at $q$, `next = 3`. Since $1 < 3$ and `next` never decreases, $m_1(1)$ remains in `pending` forever and is never delivered.
- **No Duplication — Holds ($\checkmark$)**:
  - The Perfect Link delivers $(m, \mathrm{sn})$ at most once, inserting it into `pending` once, and the `while` loop immediately removes $(m', \mathrm{sn}')$ from `pending` upon delivery.
- **No Creation — Holds ($\checkmark$)**:
  - Only messages delivered by `<plDeliver>` are added to `pending`, and the Perfect Link satisfies No Creation.

###### Modification B — Change guard to `sn' >= next` AND update to `next := sn' + 1`
```text
    while exists (m', sn') in pending such that sn' >= next do
        next := sn' + 1;
        pending := pending \ {(m', sn')};
        trigger <Deliver, p, m'>;
```
- **FIFO Delivery — Holds ($\checkmark$)**:
  - Whenever any message with sequence number $\mathrm{sn}'$ is delivered, `next` jumps to $\mathrm{sn}' + 1$. Because `next` strictly increases above $\mathrm{sn}'$, no earlier message with $\mathrm{sn}'' < \mathrm{sn}'$ can ever satisfy $\mathrm{sn}'' \ge \text{next}$ afterward. Hence, any two messages that *are* delivered must be delivered in strictly increasing sequence-number (send) order.
- **Reliable Delivery — Violated ($\times$)**:
  - *Counterexample*: Sender $p$ sends $m_1(1)$ and $m_2(2)$. If $m_2(2)$ arrives at $q$ first (`next = 1`), $2 \ge 1$ holds, so $m_2$ is delivered and `next` becomes $2 + 1 = 3$. When $m_1(1)$ later arrives, $1 < 3$, so $m_1$ is stuck in `pending` forever.
- **No Duplication — Holds ($\checkmark$)**:
  - Delivered messages are removed from `pending` and `next` advances past $\mathrm{sn}'$.
- **No Creation — Holds ($\checkmark$)**:
  - Only messages received from the Perfect Link enter `pending`.

###### Modification C — Change guard to `sn' >= next` (`next := next + 1`), AND omit removal from `pending`
```text
    while exists (m', sn') in pending such that sn' >= next do
        next := next + 1;
        // pending := pending \ {(m', sn')} IS REMOVED
        trigger <Deliver, p, m'>;
```
- **No Duplication — Violated ($\times$)**:
  - *Counterexample*: Sender $p$ sends $m_1(1), m_2(2), m_3(3)$. Suppose $m_3(3)$ arrives first when `next = 1`. In iteration 1 of the `while` loop, $3 \ge 1$ holds: $m_3$ is delivered (#1), `next` becomes $2$, and $(m_3, 3)$ remains in `pending`. In iteration 2, $3 \ge 2$ holds: $m_3$ is delivered (#2) and `next` becomes $3$. In iteration 3, $3 \ge 3$ holds: $m_3$ is delivered (#3) and `next` becomes $4$. Thus $m_3$ is delivered three times.
- **FIFO Delivery — Violated ($\times$)**:
  - If $m_3(3)$ arrives when `next = 1`, it is delivered three times and `next` becomes $4$; if $p$ had also sent $m_4(4), m_5(5)$ and $m_5(5)$ arrived before $m_4(4)$, out-of-order deliveries still occur.
- **Reliable Delivery — Violated ($\times$)**:
  - When $m_1(1)$ and $m_2(2)$ arrive after $m_3(3)$ has pushed `next` to $4$, neither can ever satisfy $\mathrm{sn}' \ge 4$.
- **No Creation — Holds ($\checkmark$)**:
  - Delivering the same sent message $m_3$ multiple times violates No Duplication, not No Creation (since $m_3$ was genuinely sent by $p$).

###### Modification D — Original algorithm, except initialize `next := 4` (instead of `1`)
- **Reliable Delivery — Violated ($\times$)**:
  - *Counterexample*: Sender $p$ sends $m_1(1)$, $m_2(2)$, $m_3(3)$. At receiver $q$, `next = 4`, so $m_1, m_2, m_3$ never match $\mathrm{sn}' = 4$ and remain in `pending` forever.
- **FIFO Delivery — Holds ($\checkmark$)**:
  - Messages $m_1, m_2, m_3$ are never delivered, while $m_4(4), m_5(5), \dots$ are delivered in exact sequential order $4, 5, \dots$
- **No Duplication & No Creation — Hold ($\checkmark$)**:
  - The equality guard and removal from `pending` are unchanged.

###### Modification E — Original algorithm, except initialize `seq := 2` (so first sent message has `sn = 3`) while `next := 1`
- **Reliable Delivery — Violated ($\times$)**:
  - *Counterexample*: The sender transmits messages starting at sequence number $3, 4, 5, \dots$, while the receiver waits at `next = 1` for a message with $\mathrm{sn}' = 1$ that will never be sent. Consequently, **zero messages are ever delivered**.
- **FIFO Delivery, No Duplication, No Creation — All Hold Vacuously ($\checkmark$)**:
  - Because no message is ever delivered, it is impossible to deliver two messages out of order, deliver a message twice, or deliver a fabricated message. (This illustrates why **Safety** alone is trivial to satisfy by doing nothing, whereas **Liveness** requires progress.)

##### Summary of FIFO Modification Exercises

| Algorithm Variant | Modification Summary | FIFO Delivery (Safety) | No Creation (Safety) | No Duplication (Safety) | Reliable Delivery (Liveness) |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Original** | `sn' = next`, `next++`, remove from `pending` | $\checkmark$ | $\checkmark$ | $\checkmark$ | $\checkmark$ |
| **Variant A** | Guard `sn' >= next` (`next++`, remove) | $\times$ | $\checkmark$ | $\checkmark$ | $\times$ |
| **Variant B** | Guard `sn' >= next`, update `next := sn' + 1` (remove) | $\checkmark$ | $\checkmark$ | $\checkmark$ | $\times$ |
| **Variant C** | Guard `sn' >= next`, `next++`, **no removal** from `pending` | $\times$ | $\checkmark$ | $\times$ | $\times$ |
| **Variant D** | Initialize receiver `next := 4` (with `seq := 0`) | $\checkmark$ | $\checkmark$ | $\checkmark$ | $\times$ |
| **Variant E** | Initialize sender `seq := 2` (first `sn = 3`, `next := 1`) | $\checkmark$ | $\checkmark$ | $\checkmark$ | $\times$ |
