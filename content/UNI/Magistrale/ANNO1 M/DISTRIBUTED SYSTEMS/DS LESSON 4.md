# Lesson 4 — Clock Synchronization and Message Ordering

## Clock Synchronization Fundamentals

### Bounding the Skew: Maximum Resynchronization Interval

Two clocks can start with the same reading and still diverge because their rates differ. With drift bound $\rho$, the worst case is one clock running at $1+\rho$ and the other at $1-\rho$. After real time $t$, their skew is bounded by:

$$
|C_1(t)-C_2(t)| \le (1+\rho)t-(1-\rho)t=2\rho t.
$$

![[DS-L4-skew-growth.svg|580]]

If the maximum tolerated skew is $\Delta$, clocks that start perfectly synchronized must be resynchronized within:

$$
2\rho t\le\Delta
\qquad\Longrightarrow\qquad
\boxed{t_{\max}=\frac{\Delta}{2\rho}}.
$$

### Monotonicity and Clock Adjustments

Correcting a clock introduces another problem: applications may depend on time moving forward. A strictly increasing clock satisfies:

$$
t'>t \implies C(t')>C(t).
$$

Suppose a clock reads `08:05` when the reference time is `08:00`. Stepping it backward repeats the readings from `08:00` to `08:05`. An event recorded at `08:04` before the correction can appear later than an event recorded at `08:01` afterward. File timestamps can confuse incremental builds such as `make`, and a time-based security ticket that appeared expired may fall within its validity interval again.

Instead of jumping backward, the system can **slew** the clock. In $C_i(t)=\alpha H_i(t)+\beta$, it temporarily increases $\alpha$ if the clock is behind, or decreases it while keeping it positive if the clock is ahead. The reading continues to advance while the error gradually decreases.

![[DS-L4-step-slew.svg|600]]

The distinction also appears in operating-system interfaces. **`CLOCK_REALTIME`** provides wall-clock time and can jump when corrected. **`CLOCK_MONOTONIC`** measures elapsed time from an arbitrary origin and cannot jump backward, although its rate may be adjusted. A monotonic clock is appropriate for durations and timeouts, where backward jumps would be misleading.

### External vs. Internal Synchronization

**UTC (Coordinated Universal Time)** is the external reference used for physical time. Atomic clocks underpin the reference, which is made available through services such as radio time signals, GPS-based receivers and NTP.

For clocks $C_1,\ldots,C_n$ and reference $S(t)$, **external synchronization within $D$** means that each clock is close to the reference:

$$
|S(t)-C_i(t)|<D \qquad \forall i.
$$

![[Pasted image 20261025123122.png|360]]

![[DS-L4-external-bound.svg|540]]

**Internal synchronization within $D$** means that clocks are close to one another:

$$
|C_i(t)-C_j(t)|<D \qquad \forall i,j.
$$

![[DS-L4-internal-target.svg|540]]

Internal agreement does not imply external accuracy: every machine could read `03:00` when UTC is `08:00`. External synchronization within $D$, however, implies internal synchronization within $2D$. By the triangle inequality:

$$
|C_i(t)-C_j(t)|
\le |C_i(t)-S(t)|+|S(t)-C_j(t)|<2D.
$$

The worst case is one clock almost $D$ ahead of the reference and another almost $D$ behind it.

## Physical Clock Synchronization Algorithms

### Cristian's Algorithm (External Synchronization)

A client $p$ asks a time server $S$, connected to an external reference, for the current time. The server replies with its timestamp $t$, while the client measures the **round-trip time (RTT)** from request transmission to reply reception.

![[DS-L4-time-server.svg|480]]

With negligible server processing and approximately symmetric network delay, the client estimates the reply's transit time as $\mathrm{RTT}/2$. At reception it estimates the current time as:

$$
\boxed{C_p\gets t+\frac{\mathrm{RTT}}{2}}.
$$

![[Pasted image 20261025125607.png|550]]

![[DS-L4-cristian-rtt.svg|580]]

**How accurate is this estimate if the two delays differ?** Suppose each direction has a known minimum delay $d_{\min}>0$, while there is no known maximum. The slides denote this minimum by $\min$. Ignoring server processing:

$$
d_{\text{req}}+d_{\text{rep}}=\mathrm{RTT},
\qquad d_{\text{req}},d_{\text{rep}}\ge d_{\min}.
$$

![[Pasted image 20261025131716.png|550]]

The reply can take as little as $d_{\min}$, leaving $\mathrm{RTT}-d_{\min}$ for the request, or as much as $\mathrm{RTT}-d_{\min}$ if the request took the minimum. Therefore, the true reference time at reception lies in:

$$
T_{\text{actual}}\in[t+d_{\min},\ t+\mathrm{RTT}-d_{\min}].
$$

The estimate $t+\mathrm{RTT}/2$ is the midpoint. Its maximum error is half the interval width:

$$
\boxed{\text{error}\le\frac{\mathrm{RTT}}{2}-d_{\min}}.
$$

![[DS-L4-slide-46-cristian-accuracy.png|650]]

A smaller RTT gives a tighter error bound. The client can discard a delayed sample and retry instead of using a measurement affected by congestion.

A single time server is a **single point of failure**: clients cannot synchronize through it after it crashes.

![[Pasted image 20261025132829.png|360]]

A replicated group allows a client to send requests to several servers and use the first reply, reducing dependence on one server and favoring a short RTT.

![[Pasted image 20261025142750.png|420]]

This still assumes trustworthy time sources. Taking the fastest reply does not protect against a Byzantine server returning a fabricated timestamp.

### Berkeley's Algorithm (Internal Synchronization)

Berkeley's algorithm aims to bring a group of clocks into agreement without requiring an external UTC source. One process acts as the **master (coordinator)** and periodically polls the other processes, called **slaves** in the original terminology.

![[DS-L4-berkeley-master.svg|500]]

The master estimates each clock's offset relative to its own, compensating for transit delay using an RTT-based estimate:

$$
\Delta_{p_i}=C_{p_i}-C_{\text{master}},
\qquad \Delta_{\text{master}}=0.
$$

It filters out offsets beyond a chosen threshold $\gamma$, then averages the remaining offsets, including its own zero. Filtering limits the influence of outliers; being retained is not proof that a clock is non-faulty.

Each process receives a **relative adjustment**, rather than an absolute timestamp that would be delayed in transit:

$$
\boxed{\mathrm{adg}_{p_i}=\mathrm{avg}-\Delta_{p_i}}.
$$

For example, let the master read `03:05`, and three peers read `02:55`, `03:00` and `03:25`. With $\gamma=15\ \mathrm{min}$, the $+20$ minute offset is excluded from the average:

![[DS-L4-berkeley-outliers.svg|540]]

$$
\mathrm{avg}=\frac{0+(-10)+(-5)}{3}=-5\ \mathrm{min}.
$$

The adjustments are sent to all processes, including the excluded outlier:

| Process | Reading | Offset | Adjustment $\mathrm{avg}-\Delta_{p_i}$ | Target reading |
| :--- | :--- | :--- | :--- | :--- |
| Master | `03:05` | $0$ min | $-5$ min | `03:00` |
| $P_1$ | `02:55` | $-10$ min | $+5$ min | `03:00` |
| $P_2$ | `03:00` | $-5$ min | $0$ min | `03:00` |
| $P_3$ | `03:25` | $+20$ min | $-25$ min | `03:00` |

![[DS-L4-slides-51-52-berkeley-corrections.png|680]]

A peer that fails to reply before the timeout is excluded from the round. If the master crashes, a leader-election mechanism is needed to select a replacement. Unlike Cristian's client-initiated requests for external time, Berkeley uses coordinator-initiated polling and relative corrections to achieve internal agreement.

### Network Time Protocol (NTP)

NTP distributes external time across the Internet through a hierarchy of **strata**, avoiding a design in which every client queries the same physical clock directly.

- **Stratum 0:** reference devices such as atomic clocks or GPS receivers, directly attached to time servers rather than acting as network servers themselves.
- **Stratum 1:** servers connected directly to those reference devices.
- **Stratum 2:** servers synchronizing with Stratum 1; they may also peer with other servers at their level.
- **Higher strata, up to 15:** further levels of downstream servers and clients.

![[DS-L4-ntp-strata.svg|500]]

Servers can consult several upstream sources and take repeated measurements. Filtering reduces the influence of high-delay samples and inconsistent sources before the local clock is adjusted. The hierarchy provides scalability, while multiple sources and paths provide redundancy.

![[Pasted image 20261025195614.png|520]]

![[Pasted image 20261025195727.png|520]]

## Limits of Physical Clocks and Motivation for Logical Time

### Overlapping Uncertainty Intervals

Even synchronized physical clocks have uncertainty. With error bound $D=5\ \mathrm{ms}$, an event stamped $100\ \mathrm{ms}$ can have occurred in $[95,105]\ \mathrm{ms}$, while an event stamped $106\ \mathrm{ms}$ can have occurred in $[101,111]\ \mathrm{ms}$.

The intervals overlap: the first event could have occurred at $104\ \mathrm{ms}$ and the second at $102\ \mathrm{ms}$. Increasing timestamps alone therefore do not establish their physical order.

![[DS-L4-timestamp-uncertainty.svg|580]]

![[DS-L4-slide-59-timestamp-uncertainty.png|650]]

A sufficient condition for ordering the events from these timestamp bounds is:

$$
\boxed{C(e_2)-C(e_1)>2D}.
$$

Then the intervals are disjoint, with every possible time for $e_1$ earlier than every possible time for $e_2$. When the intervals overlap, these bounds alone leave the order unresolved.

### Causality: Why FIFO Delivery is Not Enough

Consider a trading group chat in which every message is broadcast to all participants:

1. Alice sends $m_1$: “If Apple's stock price drops, what should we do?”
2. Mike receives $m_1$ and sends $m_2$: “Sell Apple and buy Amazon.”
3. Alice receives $m_2$ and sends $m_3$: “Who will do it?”
4. Bob's supervisor receives $m_3$ and sends $m_4$: “Bob will do it.”

![[Pasted image 20261025210732.png|580]]

Each reply depends on the preceding message, forming a causal chain:

$$
m_1\to m_2\to m_3\to m_4.
$$

![[DS-L4-causal-chain.svg|540]]

With variable delays on different links, Bob may deliver $m_2,m_4,m_1,m_3$ in that order.

![[Pasted image 20261025210923.png|580]]

This respects FIFO: Alice's two messages, $m_1$ and $m_3$, retain their order, and the other senders each sent only one message. Yet Bob sees the response and assignment before the condition that motivated them. FIFO constrains each sender–receiver pair; **causal ordering** must also preserve dependencies across different senders. Logical clocks will let us track those dependencies without relying on exact physical synchronization.

## FIFO correctness exercises

### Reference Specification and Original Algorithm

The exercises analyze four properties of a FIFO perfect point-to-point link:

- **FIFO delivery — safety:** if a receiver delivers $m$ before $m'$ from the same sender, that sender sent $m$ before $m'$.
- **Reliable delivery — liveness:** a message sent by a correct process to a correct destination is eventually delivered.
- **No duplication — safety:** a receiver delivers a message at most once.
- **No creation — safety:** a delivered message was previously sent to that receiver by its claimed sender.

![[DS-HW2-FIFO-properties-slide-97.png|650]]

*The FIFO formulation here follows the professor's [lesson-4 discussion](<Assets/TRANSCRIPTED DS/DS LESSON 4 transcripted.md>): it constrains the order of messages that are delivered. Delivery of every message is required separately by reliable delivery. This distinction matters in modifications B and D.*

The following is the **two-process / fixed sender–receiver pair** version. The general algorithm in Lesson 2 uses a counter per destination and tracks the expected number per sender. As in the slide, receiving a message and delivering an eligible pending message are separate handlers; message arrivals can occur between successive delivery steps.

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

Upon exists (m', sn') in pending such that sn' = next do
    pending := pending \ {(m', sn')};
    next := next + 1;
    trigger <Deliver, p, m'>;
```

Sequence numbers begin at $1$. Messages arriving before their turn remain in `pending`; the equality guard permits only the next number, and delivery advances `next` by one. To evaluate a modification, examine each property separately: changing the ordering mechanism can also break reliable delivery or duplication control.

![[DS-L4-fifo-variants-trace.svg|720]]

### Modification A — Change guard `sn' = next` to `sn' >= next`

```text
Upon exists (m', sn') in pending such that sn' >= next do
    pending := pending \ {(m', sn')};
    next := next + 1;
    trigger <Deliver, p, m'>;
```

Suppose $p$ sends $m_1(1),m_2(2),m_3(3)$ to $q$. If $m_3$ arrives first, $3\ge1$ allows its delivery and `next` becomes $2$. If $m_2$ arrives next, $2\ge2$ allows its delivery. The receiver has delivered $m_3$ before $m_2$, violating **FIFO**. When $m_1$ finally arrives, its number is below `next = 3`, so it remains pending forever: **reliable delivery also fails**.

A two-message example with $m_2$ delivered first would show lost delivery of $m_1$, but not a reversed pair of delivered messages. That is why the FIFO counterexample uses three messages.

**No duplication holds** because the underlying Perfect Link inserts each message only once and the handler removes it upon delivery. **No creation holds** because only messages received from that link enter `pending`.

### Modification B — Also update `next := sn' + 1`

```text
Upon exists (m', sn') in pending such that sn' >= next do
    pending := pending \ {(m', sn')};
    next := sn' + 1;
    trigger <Deliver, p, m'>;
```

**FIFO holds:** after delivering sequence number $k$, `next` becomes $k+1$, permanently excluding every number at most $k$. Any subsequent delivered message must have a larger sequence number, so delivered messages follow send order.

**Reliable delivery fails:** if $m_2(2)$ arrives before $m_1(1)$, the receiver delivers $m_2$ and sets `next = 3`. It can never deliver $m_1$. Skipping a message breaks reliable delivery even though the messages actually delivered remain ordered.

**No duplication and no creation hold:** delivered messages are removed, `next` advances past their numbers, and every pending message still comes from the Perfect Link.

### Modification C — Use `sn' >= next` and omit removal from `pending`

This version increments `next` by one, as in A, but leaves the delivered entry in `pending`:

```text
Upon exists (m', sn') in pending such that sn' >= next do
    // pending := pending \ {(m', sn')} IS REMOVED
    next := next + 1;
    trigger <Deliver, p, m'>;
```

If $m_3(3)$ arrives when `next = 1`, the delivery handler can select it at `next = 1`, then again at $2$, then again at $3$. Only when `next` becomes $4$ does its guard fail. Thus **no duplication fails**, and later arrivals of $m_1$ and $m_2$ remain pending forever, violating **reliable delivery**.

**FIFO also fails:** use a different schedule in which $m_3$ is delivered once, advancing `next` from $1$ to $2$. Before the delivery handler selects it again, let the arrival handler insert $m_2$. Both entries are eligible, so the delivery handler may select $m_2$. It has then delivered $m_3$ before $m_2$, reversing their send order. This trace relies on the separate handlers shown in the slide; replacing them with one atomic receive-and-drain loop would change the algorithm being analyzed.

**No creation holds:** delivering a genuinely sent message repeatedly does not fabricate a new message.

### Modification D — Initialize `next := 4`

Keep the original equality guard, removal and `seq := 0`. Messages $m_1,m_2,m_3$ never match `next = 4`, so **reliable delivery fails**. If further messages are sent, the receiver can deliver $m_4,m_5,\ldots$ in order. **FIFO, no duplication and no creation hold**, since the original delivery mechanism remains intact for that suffix.

### Modification E — Initialize `seq := 2` while `next := 1`

The first message receives sequence number $3$, but the receiver waits for number $1$, which is never sent. **No message is delivered**, so reliable delivery fails. FIFO, no duplication and no creation hold vacuously: without deliveries, none of those safety properties can be violated. Safety alone does not require the algorithm to make progress.
