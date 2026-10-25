#### Physical time and clock synchronization

> [!info] Sources and scope
> Clock synchronization continues [[../Percorso STUD2/Materiali/Distributed_Physical_Time_A.pdf|Time in Distributed Systems I]], physical PDF pages **28–59**, with a short recap of drift from Lesson 3.
> The causality story and FIFO variants are retained from the existing Lesson 4 notes; they are separate from that PDF's physical-time material.

Prerequisites: processes and messages; fair-loss, stubborn, perfect and FIFO links; safety and liveness (Lessons 2–3).

##### Physical clocks and drift

A hardware clock counts oscillator ticks. Temperature and other conditions affect its rate, so a fixed correction may cease to be suitable.
- A slow clock may measure 30 minutes per real hour; an ideal clock measures 1 hour; an exaggerated fast clock measures 2 hours.
- Clock rate/drift concerns **how fast a clock runs**; skew concerns **the difference between clock readings**.

A correct hardware clock satisfies a known rate bound:

$$
\boxed{1-\rho\leq\frac{dH(t)}{dt}\leq1+\rho},\qquad \rho>0.
$$

Over $T$ real seconds, it advances between $(1-\rho)T$ and $(1+\rho)T$. Its elapsed-time error can be as large as $\rho T$.
- This is a **rate bound**, not a fixed error in the reading. Synchronization must be repeated.

##### Clock skew and how often to synchronize

*Slides, physical PDF pages 28–29.*

###### Clock skew

For two clocks $C_1$ and $C_2$, the **clock skew** at the same real instant $t$ is

$$
\boxed{\operatorname{Skew}(t)=|C_1(t)-C_2(t)|.}
$$

For example, if one computer displays `12:00:05` and another displays `12:00:02`, the skew is 3 seconds.

###### The professor's thought experiment

Assume that:

1. Both clocks respect the same drift-rate bound $\rho$.
2. At $t=0$, an imaginary *perfect synchronization algorithm* makes their readings identical: $C_1(0) = C_2(0)$.
3. We want their skew never to exceed a specified tolerance $\Delta$.

**Question:** In the worst case, how far apart can the two clocks be after $T$ seconds?

The worst case occurs when one clock runs as fast as allowed and the other as slowly as allowed **throughout the interval**:

$$
C_1(T)-C_1(0)=(1+\rho)T,
$$

$$
C_2(T)-C_2(0)=(1-\rho)T.
$$

Subtracting their elapsed readings (their starting readings were equal):

$$
\begin{aligned}
\operatorname{Skew}(T)
&\leq (1+\rho)T-(1-\rho)T\\
&=\boxed{2\rho T}.
\end{aligned}
$$

To guarantee skew at most $\Delta$, require

$$
2\rho T\leq\Delta
\quad\Longrightarrow\quad
\boxed{T\leq\frac{\Delta}{2\rho}}.
$$

This is the **maximum resynchronization interval** in the professor's idealized case (perfect initial synchronization).

![[DS-L4-skew-growth.svg|480]]

*Existing explanatory diagram; reference: slides 28–29.*

###### Example

If $\rho = 0.01$ and $\Delta = 2 \text{ seconds}$, then

$$
T_{\max}=\frac{2}{2(0.01)}=100\text{ seconds}.
$$

The clocks must be synchronized at least every 100 seconds to maintain the required bound under these assumptions.

**Interpretation:**

- Smaller permissible skew $\Delta$ → **more frequent** synchronization.
- Larger drift bound $\rho$ (worse clocks) → **more frequent** synchronization.
- Perfectly synchronizing clocks **once** is not enough; their rates can immediately diverge again.

**Practical refinement:** Real synchronization is not perfect.
- If a synchronization step leaves an initial skew up to $\varepsilon$, then the subsequent skew can be bounded by $\varepsilon + 2\rho T$; to keep it within $\Delta$, choose $T \leq  (\Delta-\varepsilon)/(2\rho)$ (assuming $\varepsilon < \Delta$).
- The professor first derives the simpler zero-initial-skew case.

##### Monotonicity: why clocks should not go backward

*Slides, physical PDF pages 30–34.*

###### The professor's question

One computer displays `12:00`; another displays `11:00`.
To make them equal, should we:

- Move `12:00` **backward** to `11:00`?
- Move `11:00` **forward** to `12:00`?

Both achieve agreement, but moving a clock backward can invalidate assumptions made by programs.

###### The message-timestamp problem

Consider **one process** generating two messages:

1. At its local time `12:00`, it creates $m_1$ with timestamp `12:00`.
2. A synchronization adjustment moves the local wall clock back to `11:00`.
3. One minute later in real time, the process creates $m_2$ with timestamp `11:01`.

Actual order:

$$m_1\text{ is created before }m_2.$$

Timestamp order:

$$
\begin{aligned}
\operatorname{timestamp}(m_2)&=11{:}01\\
&<12{:}00=\operatorname{timestamp}(m_1).
\end{aligned}
$$

Sorting by timestamp reverses their creation order, **even on a single process**.

**Kerberos example from the existing notes:** backward wall-clock adjustments can interfere with ticket and replay-window checks.
- This illustrates a timing assumption; it does not mean a clock step alone defeats the protocol's other defenses.

###### Formal meaning

A **nondecreasing (monotonic) clock** satisfies

$$
\boxed{t_1<t_2\ \Longrightarrow\ C(t_1)\leq C(t_2).}
$$

The clock never reports an earlier reading at a later real instant.
- The lecturer describes a strictly increasing clock intuitively; nondecreasing is the usual guarantee for sampled monotonic clocks.

###### Step versus slew

A clock can be corrected in two broad ways:

- **Step:** change the clock reading immediately (possibly forward or backward).
- **Slew:** temporarily change the rate of the clock, letting it gradually catch up with or be caught by the reference clock. When behind, speed it up; when ahead, slow it down.

Slewing can maintain monotonicity if the clock's rate remains nonnegative.

![[DS-L4-step-slew.svg|480]]

*Existing diagram: a forward step versus gradually speeding up a clock that is behind.*

- Real time synchronization software may use steps in some circumstances; the monotonicity guarantee must be checked for the clock interface actually used.

###### Programming implication

For elapsed-time measurements, use a monotonic timer:

```python
import time
start = time.monotonic()
# ... operation ...
elapsed = time.monotonic() - start
```

The corresponding POSIX clock is `clock_gettime(CLOCK_MONOTONIC, ...)`.

**Important:** Such a local monotonic clock does **not** provide UTC date/time and is not a globally synchronized timestamp source.
- Use it for durations, timeouts, and local intervals, not as a replacement for synchronized wall time.

##### External and internal synchronization

*Slides, physical PDF pages 35–39.*

###### UTC as an external reference

**Coordinated Universal Time (UTC)** is the internationally used time standard, connected to atomic timekeeping and kept aligned with Earth's rotation by the UTC system.
- The professor treats it as an ideal external reference; the precise timekeeping machinery is not central to the algorithms.

There are two different synchronization goals.

###### External synchronization

A set of computers is **externally synchronized with bound $D$** to reference clock $S$ when every clock stays within $D$ of that reference:

$$
\boxed{\forall i,t:\ |C_i(t)-S(t)|<D.}
$$

This is about **accuracy with respect to an external source**, such as UTC.

![[Pasted image 20261025123122.png|560]]

*Existing illustration of external synchronization.*

###### Internal synchronization

A set of computers is **internally synchronized with bound $D$** when every pair of clocks agrees to within $D$:

$$
\boxed{\forall i,j,t:\ |C_i(t)-C_j(t)|<D.}
$$

This is about **agreement among processes**.

![[DS-L4-internal-target.svg|500]]

*Existing illustration: clocks at 11:00 and 12:00 can agree on a common 11:30 target; this does not establish UTC accuracy.*

- The computers may all display a time that is far from UTC.

###### Does one imply the other?

If every clock is within $D$ of UTC, then for any two processes:

$$
\begin{aligned}
|C_i(t)-C_j(t)|
&\leq |C_i(t)-S(t)|+|S(t)-C_j(t)|\\
&<D+D=2D.
\end{aligned}
$$

Therefore:

$$
\boxed{\begin{gathered}
\text{External bound }D\\
\Longrightarrow \text{internal bound }2D.
\end{gathered}}
$$

**Why not $D$?** Imagine UTC is `10:00`, one computer is nearly $D$ ahead, and another is nearly $D$ behind.
- Their separation can approach $2D$.

**The converse is false:** computers can agree perfectly with one another while all being hours away from UTC.

![[DS-L4-external-bound.svg|500]]

*Existing diagram; the separation between two clocks can approach twice their external error bound (slide 39).*

- **Reference:**
  - External: UTC or another external clock
  - Internal: The other clocks in the group
- **Requirement:**
  - External: Accuracy
  - Internal: Agreement
- **Typical algorithm in this lesson:**
  - External: Cristian
  - Internal: Berkeley

##### Cristian's algorithm: external synchronization

*Slides, physical PDF pages 40–47.*

###### The initial idea — and why it fails

![[DS-L4-time-server.svg|480]]

*Existing diagram of clients using one reference time server.*

Each client independently asks a reference server: **"What time is it?"** The server replies with its current timestamp $T_s$.

A naive client sets its clock to $T_s$ upon receipt.
- But the server's time has advanced while the reply traveled over the network, so the timestamp is already stale.

###### The professor's insight: measure RTT

![[DS-L4-cristian-rtt.svg|470]]

*Existing request/reply diagram; reference: slides 45–46.*

Let:

- $d_1$ = one-way delay of the **request** (client → server).
- $d_2$ = one-way delay of the **reply** (server → client).
- $\mathrm{RTT}$ = *round-trip time*, locally measured from sending the request to receiving the reply.
- $T_s$ = the server timestamp placed in the reply when it is sent.

For the lecture's simplified model, assume the server responds immediately and the client's timer measures the round trip accurately:

$$
\mathrm{RTT}=d_1+d_2.
$$

The **ideal** client adjustment would be

$$
C_{\text{new}}=T_s+d_2,
$$

because only the **reply delay** elapses *after* the timestamp $T_s$ is generated.
- The request delay has already happened.

**But how does the client know $d_2$?** Its clock is not synchronized with the server, so it cannot directly compute this one-way delay from the two clocks.

Cristian's algorithm **assumes approximately symmetric network delays**:

$$d_1\approx d_2.$$

Hence it estimates $d_2 \approx  \mathrm{RTT}/2$ and updates:

$$
\boxed{C_{\text{new}}=T_s+\frac{\mathrm{RTT}}{2}.}
$$

###### Worked example

The reply contains `12:00:00.000`; measured $\mathrm{RTT} = 400 \text{ ms}$.

> [!info]- Existing slide excerpt
> ![[Pasted image 20261025125607.png|560]]
> The request/reply diagram is from physical PDF page 45.
- Assuming symmetry, the estimated reply delay is `200 ms`, so the client sets its clock to approximately **12:00:00.200** on receiving the reply.

###### When does the estimate make an error?

If the network is asymmetric, $d_1$ and $d_2$ need not match.
- The signed synchronization error (client reading minus true server reading at receipt) is

$$
\boxed{E=\frac{\mathrm{RTT}}{2}-d_2.}
$$

- $E>0$: the client sets its clock **too far ahead**.
- $E<0$: the client sets its clock **behind** the server.
- $E=0$: the estimate is correct in this model.

For example, with $d_1 = 20 \text{ ms}$ and $d_2 = 180 \text{ ms}$, $\mathrm{RTT} = 200 \text{ ms}$.
- The algorithm adds `100 ms`, but should add `180 ms`: $E=-80\text{ ms}$.

###### Derive the worst-case accuracy bound

The professor assumes that **each one-way network delay is at least $\mathrm{min}$**.
- This is a known lower bound, not the average or an estimate of half the RTT.

$$
d_1\geq \mathrm{min},\quad d_2\geq \mathrm{min},\quad d_1+d_2=\mathrm{RTT}.
$$

Since $d_2 = \mathrm{RTT} - d_1$, it follows that

$$
\boxed{\mathrm{min}\leq d_2\leq \mathrm{RTT}-\mathrm{min}.}
$$

Why no division by two in $d_2,max = \mathrm{RTT} - \mathrm{min}$? **We are finding the largest possible $d_2$, not assuming symmetry.** To maximize the reply delay for a fixed RTT, make the request delay as small as allowed: $d_1 = \mathrm{min}$.

Now substitute the extreme values of $d_2$ into $E = \mathrm{RTT}/2 - d_2$:

$$
\begin{aligned}
E_{\max}&=\frac{\mathrm{RTT}}{2}-\mathrm{min},\\
E_{\min}&=\frac{\mathrm{RTT}}{2}-(\mathrm{RTT}-\mathrm{min})
= -\left(\frac{\mathrm{RTT}}{2}-\mathrm{min}\right).
\end{aligned}
$$

Therefore:

$$
\boxed{\left|E\right|\leq\frac{\mathrm{RTT}}{2}-\mathrm{min}.}
$$

Or equivalently, the error is bounded by **plus or minus** $(\mathrm{RTT}/2-\mathrm{min})$.

**Numerical example from the existing notes:** If $\mathrm{RTT} = 100 \text{ ms}$ and $\mathrm{min} = 20 \text{ ms}$, the largest reply delay is `80 ms`.
- Cristian estimates `50 ms`, giving an error of `−30 ms`.
- Reversing the delays yields `+30 ms`.
- Maximum absolute error: **30 ms**.

![[DS-L4-slide-46-cristian-accuracy.png|680]]

*Professor's original accuracy cases, [[../Percorso STUD2/Materiali/Distributed_Physical_Time_A.pdf#page=46|physical PDF page 46]]. The slide labels the signed error $\Delta$; these notes use $E$.*

**Key observation:** A large RTT does not *necessarily* imply a large **actual** error.
- A 1000 ms round trip split into 500 ms each way gives zero delay-estimation error in the simplified model.
- Asymmetry causes the actual error; $\mathrm{RTT}$ and $\mathrm{min}$ bound how bad it might be.

**Assumptions to state at an exam:** accurate reference server, negligible server-processing time (or compensated for), sufficiently precise local RTT measurement, and known minimum one-way delay.
- Unbounded/unpredictable network delay means this exchange alone cannot guarantee a fixed useful clock-accuracy bound without stronger assumptions.

###### Failure scenario: the single point of failure

> [!info]- Existing illustrations: server failure and redundancy
> ![[Pasted image 20261025132829.png|560]]
>
> ![[Pasted image 20261025142750.png|560]]

- If **one client crashes**, the others can still synchronize with the server.
- If the **only server crashes**, clients lose the reference for future corrections. The server is a **single point of failure (SPOF)**.

The professor suggests using multiple reference servers: try an alternative, use a suitable available server, or combine estimates from several servers.
- Redundancy improves availability and can reduce sensitivity to a bad clock, although naïvely averaging timestamps is not a universal fault-tolerance solution.

##### Berkeley's algorithm: internal synchronization

*Slides, physical PDF pages 48–53.*

###### Why Berkeley?

Suppose a network is isolated and no computer knows the correct UTC time.
- The computers still want their clocks to **agree with each other**.
- Cristian's external reference is not available.

The Berkeley approach selects a **master/leader** that coordinates a synchronization round.
- Unlike the time server in Cristian's algorithm, the master is **not assumed to have the correct time**: it also participates in the adjustment.

###### The procedure

![[DS-L4-berkeley-master.svg|530]]

*Existing diagram of the master coordinating polling and corrections; reference: slides 48–50.*

1. The master **polls** the clocks of the other processes (periodically).
2. It gathers their readings, accounting for message transit delay as appropriate.
3. It computes each process's offset relative to the master's clock.
4. It **excludes outliers from the average** according to a configured policy/threshold.
5. It computes the mean of the remaining offsets (including the master's offset `0`).
6. It sends an **individual correction** to each process; the master adjusts itself as well.

###### Formulas

Let $C_m$ be the master's clock and $C_i$ another process's clock at the corresponding point in time.
- Define the offset

$$
\boxed{\delta_i=C_i-C_m},\qquad\delta_m=0.
$$

For the set $I$ of **included** clocks (after outlier rejection), the mean offset is

$$
\boxed{\overline{\delta}=\frac{\sum_{i\in I}\delta_i}{|I|}.}
$$

The common target clock reading is $C_m + \overline{\delta}$.
- Therefore the correction sent to process $i$ is

$$
\boxed{\operatorname{Correction}_i=\overline{\delta}-\delta_i.}
$$

> **Don't confuse the two:** $\overline{\delta}$ is the group's mean offset **relative to the master**; $\operatorname{Correction}_i$ is **how much that particular clock must move**.

###### Professor's worked example: outlier rejection

![[DS-L4-berkeley-outliers.svg|540]]

*Existing offset diagram; the three included clocks determine the mean (slides 51–52).*

| Process | Current time | Offset $\delta_i$ from master | Included in average? |
|---|---:|---:|---|
| Master | 03:05 | 0 min | Yes |
| $P_1$ | 02:55 | −10 min | Yes |
| $P_2$ | 03:00 | −5 min | Yes |
| $P_3$ | 03:25 | +20 min | **No**, treated as an outlier |

The threshold is a configurable aspect of the algorithm.

*Slide 51 prints `03:25 − 03:20 = 20`; the consistent calculation is `03:25 − 03:05 = 20 min`, using the master's 03:05 time.* **For this example**, the professor excludes $P_3$'s `+20 min` reading.

Compute the average over the **three included clocks**:

$$
\overline{\delta}=\frac{0-10-5}{3}=\boxed{-5\text{ min}}.
$$

The master shows 03:05, so the target is `03:05 − 5 min = 03:00`.

Now compute **every** correction, including the clock excluded from averaging:

| Process | Calculation $\overline{\delta} - \delta_i$ | Correction | Clock after adjustment |
|---|---|---:|---:|
| Master | `−5 − 0` | −5 min | 03:00 |
| $P_1$ | `−5 − (−10)` | +5 min | 03:00 |
| $P_2$ | `−5 − (−5)` | 0 min | 03:00 |
| $P_3$ | `−5 − (+20)` | −25 min | 03:00 |

> [!info]- Professor's Berkeley example: before and after correction
> ![[DS-L4-slides-51-52-berkeley-corrections.png|680]]
>
> Cropped figures from [[../Percorso STUD2/Materiali/Distributed_Physical_Time_A.pdf#page=51|physical PDF pages 51–52]]: initial clock readings on the left, corrected clocks on the right. The correction table above gives the individual adjustments.

**Professor's emphasis:** Excluding $P_3$ from **computing** the mean does not automatically exclude $P_3$ from **receiving** a correction.
- Otherwise $P_3$ would remain unsynchronized.
- In actual code, handling a faulty or unresponsive process may need extra care.

**Why reject outliers?** A badly inaccurate (or maliciously incorrect) reported time could shift the group's average and induce needless corrections to every good clock.
- Excluding very distant values limits that influence.

**Monotonicity reminder:** Directly subtracting 5 or 25 minutes in these classroom calculations is a simplification.
- Implementations can *slew* a clock instead of abruptly stepping it backward.

**Mathematical clarification:** The professor motivates the mean as a central value that reduces corrections.
- Formally, the arithmetic mean minimizes the sum of **squared** deviations; the median minimizes the sum of **absolute** deviations.
- The lesson's algorithm uses the mean.

###### Failures

- A **regular process crashes or doesn't answer**: the master can proceed with the available readings after deciding not to wait indefinitely.
- The **master crashes**: synchronization stops unless another master is selected; a **leader-election** mechanism can replace it (studied later in the course).
- The **master is Byzantine**: it could send wrong or inconsistent corrections. Simple leader election and outlier rejection do not solve this difficult failure model. The professor explicitly puts Byzantine-master tolerance outside the scope of this lecture.

###### Can Berkeley produce external synchronization?

**Professor's question:** What if one participant happens to be synchronized to UTC?

Including such a clock in the average can pull the target time closer to UTC, but **external synchronization is not guaranteed merely because one participant knows UTC**.
- For instance, if that clock is far from the rest, the master might reject it as an outlier.
- Even when included, it does not by itself establish a particular accuracy bound for the group.

###### Contrast with Cristian

- **Cristian:** external synchronization; the server supplies reference time and the client uses $T_s+\mathrm{RTT}/2$. UTC synchronization requires an appropriate external source; one reference server is a failure point.
- **Berkeley:** internal synchronization; the master polls, averages and sends $\overline{\delta}-\delta_i$ to each participant. UTC is not required; one master is a failure point.

##### Network Time Protocol (NTP)

*Slides, physical PDF page 54.*

The professor briefly describes **NTP**, the protocol family used in real systems to distribute accurate time.
- It performs timestamp-based synchronization, conceptually related to Cristian's request/reply reasoning but more sophisticated in practice.

###### Stratum hierarchy

![[DS-L4-ntp-strata.svg|480]]

*Existing schematic hierarchy; reference: slide 54. Multiple upstream sources can be used.*

- **Stratum 0:** high-quality reference clocks (for example atomic-clock or satellite-based reference devices).
- **Stratum 1:** primary servers connected directly to Stratum 0 reference devices.
- **Stratum 2:** servers obtaining time from Stratum 1.
- **Stratum 3 and higher:** further levels obtaining time from upstream sources.

The lecture describes an intuitive tree, but **real deployments are not a strict single-parent tree**: a server can use several synchronization peers/sources.

> [!info]- Existing illustrations of NTP exchanges
> ![[Pasted image 20261025195614.png|560]]
>
> ![[Pasted image 20261025195727.png|560]]

###### Why a hierarchy?

**Professor's question:** What if every phone and computer tried to contact the same primary time source?
- It would not scale, and any single source would be a serious failure point.

NTP's hierarchy distributes the workload (**scalability**) and multiple sources give servers alternatives when one fails (**fault tolerance**).
- More sophisticated implementations also compare/filter candidate time sources rather than trusting every response equally.

**Connection to monotonicity:** NTP software may correct time by slewing or stepping according to configuration.
- An ordinary wall clock that is synchronized with UTC is **not automatically monotonic**.
- A local monotonic timer is useful for intervals, but it is **not** a UTC-synchronized replacement.

**Study emphasis:** understand what strata mean and why the hierarchy is used.

##### The limits of physical timestamps

*Slides, physical PDF pages 55–59.*

###### The initial assumption

Suppose $P_1$ generates event $e_1$ with physical timestamp 100 ms and $P_2$ generates $e_2$ with timestamp 106 ms.
- It is tempting to conclude immediately that $e_1$ happened first.

But physical clocks have a **synchronization uncertainty**, even when they are synchronized by a good algorithm.

Suppose each timestamp differs from the corresponding real reference time by at most $D=5\text{ ms}$.
- Then the real occurrence times could lie in these intervals:

$$
\begin{aligned}
t(e_1)&\in[95,105]\text{ ms},\\
t(e_2)&\in[101,111]\text{ ms}.
\end{aligned}
$$

The intervals **overlap** from 101 ms to 105 ms.

![[DS-L4-timestamp-uncertainty.svg|570]]

*Existing numerical illustration of uncertainty intervals; references: slides 55–59.*

> [!info]- Professor's diagram: overlapping timestamp uncertainty
> ![[DS-L4-slide-59-timestamp-uncertainty.png|680]]
>
> [[../Percorso STUD2/Materiali/Distributed_Physical_Time_A.pdf#page=59|Physical PDF page 59]] shows events on different processes with overlapping uncertainty regions. It provides the distributed setting for the numerical example above.

Thus $e_2$ could occur at real time 102 ms and $e_1$ at 104 ms, even though $100 < 106$ is the timestamp comparison. **Physical timestamps alone do not settle the real order in this case.**

###### When are physical timestamps sufficient?

If every timestamp has error at most $D$, and

$$
\boxed{C(e_2)-C(e_1)>2D,}
$$

then their uncertainty intervals do not overlap, and we can conclude $e_1$ occurred before $e_2$ in real time.

**Professor's observation:** Higher event rates make overlapping uncertainty intervals more common.
- In a system producing millions of events per second, a clock error of milliseconds can be large relative to the time between events.
- Ordering events by wall-clock timestamps may then cause application errors.

###### Why not just build a better clock?

Better synchronization helps, but:

1. It does not make physical clocks perfectly accurate.
2. In an **asynchronous system**, message delays have no known fixed upper bound, so physical-clock synchronization by message exchange cannot generally guarantee an arbitrarily tight error bound without extra assumptions.
3. Applications often care about **which event influenced which**, not only which numerical physical timestamp is smaller.

This motivates **logical time**.
- The professor only introduces it here; the detailed treatment of scalar/Lamport clocks and vector clocks follows in the next lesson.

##### Causality: why FIFO is not enough

*This story is retained from the existing Lesson 4 notes; it is not contained in the supplied physical-time PDF.*

###### The professor's trading story

Four people communicate through a distributed messaging application:

1. **Alice ($m_1$):** "If Apple's stock price drops, what should we do?"
2. **Mike ($m_2$):** "Sell Apple and buy Amazon." He replies after seeing $m_1$.
3. **Alice ($m_3$):** "Who will do it?" She sends this after seeing $m_2$.
4. **Bob's supervisor ($m₄$):** "Bob will do it." The supervisor replies after seeing $m_3$.

The conversation has dependencies:

```text
m1 (Alice's conditional question)
  -> m2 (Mike's answer)
  -> m3 (Alice's follow-up)
  -> m4 (supervisor's assignment)
```

The arrows mean that later messages are generated **in response to** earlier information: this is the intuitive notion of **causal order**.

![[DS-L4-causal-chain.svg|530]]

*Existing diagram of the conversation dependencies.*

###### What can go wrong?

> [!info]- Existing illustrations: conversation and Bob's local view
> ![[Pasted image 20261025210732.png|600]]
>
> ![[Pasted image 20261025210923.png|600]]

The network is asynchronous, so messages sent to Bob can experience different delays.
- Imagine Bob's application receives/delivers:

```text
1. m2 from Mike:       "Sell Apple and buy Amazon"
2. m4 from supervisor: "Bob will do it"
3. m1 from Alice:      "IF Apple's price drops ..."
4. m3 from Alice:      "Who will do it?"
```

Bob sees an action and an assignment **before** the condition and conversation explaining them.
- He might trade immediately, without knowing the decision was conditional.

###### Why FIFO delivery does not prevent it

Recall FIFO from Lesson 2: for messages sent **by the same sender** to a receiver, the receiver must preserve their sending order.

Alice sends $m_1$ before $m_3$, and Bob receives/delivers $m_1$ before $m_3$ in the above execution. **FIFO is respected.**

But $m_1$ and $m_2$ have different senders (Alice and Mike), so FIFO alone does not require Bob to deliver $m_1$ before $m_2$, even though Mike's message depends on Alice's.

**Causal order** is a stronger requirement: a receiver should not deliver a causally dependent message to the application before the earlier message it depends on.
- In the professor's story, Bob would need to hold $m_2$ until $m_1$ becomes deliverable, and similarly respect the later dependencies.

###### The bridge to logical time

**Professor's question:** How can Bob know that a message depends on another one he has not yet seen?

The coming lectures develop logical information carried with messages, including **scalar (Lamport/logical) clocks** and **vector clocks**, to express relationships between distributed events.
- Logical time is about ordering and causality, **not about providing the physical UTC time of an event**.

**Main distinction:** FIFO preserves order from **one sender** ($m_1$ before $m_3$); causal order also constrains dependencies across **different senders** ($m_1$ before Mike's $m_2$). Only the latter prevents Bob's premature out-of-context delivery.

#### FIFO correctness exercises

These variants are attributed to the lecture in the existing Lesson 4 notes and restated below.
- They revisit the FIFO algorithm from Lesson 2; their attribution has not been checked against an original exercise statement, and they do not appear in the supplied physical-time PDF.

**Method:** change one line, then check each property separately.
- A failure needs a **valid counterexample**; a preserved property needs an invariant or an argument covering all allowed executions.

##### Original FIFO mechanism (conceptual reconstruction)

We use the simplified mechanism discussed in class.
- This is **explanatory pseudocode, not a verbatim copy of the slides**.
- The underlying communication primitive is a **perfect link**, which provides no creation, no duplication, and reliable delivery between correct processes.

For each sender $p$, the receiver stores:

- `next[p]`: the next sequence number expected from $p$ (initially `1`).
- `pending`: messages received from the perfect link but not yet delivered to the upper layer.

For a fixed sender–receiver pair `(p, q)`, the sender’s sequence counter begins at `0`, is incremented for each send to that receiver, and is attached to outgoing messages.
- Therefore the first message to $q$ has sequence number `1`, then `2`, then `3`, etc. 

```text
Sender p:
    for each destination q: seq[q] := 0
    on fifo.Send(q, m):
        seq[q] := seq[q] + 1
        pl.Send(q, (seq[q], m))

Receiver q:
    for every sender p: next[p] := 1
    pending := {}

    on pl.Deliver(p, (k, m)):
        pending := pending union {(p, k, m)}

    whenever there exists (p, k, m) in pending with k = next[p]:
        remove (p, k, m) from pending
        next[p] := next[p] + 1
        fifo.Deliver(p, m)
```

The exact handler syntax and set operations may differ from the course slides; the essential guards and updates are the features modified in the exam exercises.

###### Four properties to analyze

1. **FIFO delivery (safety):** If two messages from the same source are both delivered, their delivery order must match their send order. Equivalently, delivering `m` before `m′` from the same sender implies that sender sent `m` before `m′`.
2. **No creation (safety):** A delivered message must have been sent by its claimed source.
3. **No duplication (safety):** Each message is delivered at most once.
4. **Reliable delivery (liveness):** If a correct sender sends a message to a correct receiver, the receiver eventually delivers it (assuming the link's required conditions).

**Counterexample method:** A single execution violating the property is enough to disprove it.
- To prove a property holds, an isolated successful execution is **not** enough: argue why *all* allowed executions preserve it.

##### Modification A — Replace `k = next[p]` with `k >= next[p]`

Keep the update `next[p] := next[p] + 1` and keep **removing the delivered message from `pending`**.

```text
whenever (p, k, m) in pending AND k >= next[p]:
    remove (p, k, m) from pending
    next[p] := next[p] + 1
    fifo.Deliver(p, m)
```

###### Does FIFO still hold? **No.**

**Professor's key reasoning:** The modified guard allows a message with sequence `3` to be delivered while `next[p]` is only `1`.
- Because `next[p]` increases by **one**, it becomes `2`, so message `2` can still be delivered later.

**Counterexample (minimal useful trace):**

```text
Sender p sends:     m1(k=1), m2(k=2), m3(k=3)

Receiver q: next[p] initially 1

q receives m3(k=3): 3 >= 1  TRUE
    deliver m3
    next[p] becomes 2

q receives m2(k=2): 2 >= 2  TRUE
    deliver m2
    next[p] becomes 3

Delivery order: m3, m2
Send order:     m2 before m3
```

This violates FIFO: $m_3$ is delivered before $m_2$, despite having been sent later.

**Why not use only $m_1$ and $m_2$?** If $m_2$ is delivered when `next[p] = 1`, then `next[p]` becomes `2`, so $m_1$ (sequence `1`) can never pass the modified guard.
- You **cannot** deliver $m_2$ then $m_1$.
- Three messages make the counterexample work because delivering $m_3$ first increments `next[p]` only to `2`.

###### Does reliable delivery still hold? **No.**

Continue the same execution: $m_1$ is sent by a correct process and eventually received, but its `k = 1` is now below `next[p] = 3`.
- It remains pending forever and cannot be delivered.
- The liveness guarantee is violated.

###### Does no creation hold? **Yes.**

Only perfect-link deliveries enter `pending`.
- The modified guard never fabricates a new message.
- Since the underlying perfect link has no creation, neither does this algorithm.

###### Does no duplication hold? **Yes, under the stated perfect-link assumption.**

On delivery, the message is **removed from `pending`**; the underlying perfect link will not re-deliver the same message to insert a second copy.
- Therefore the same message cannot be delivered twice.
- The professor explicitly warns that simply citing `next[p]` here is insufficient: with `k >= next[p]`, a very large `k` might still pass after one increment if it could reappear.

**Result A:** FIFO **fails**; reliable delivery **fails**; no creation **holds**; no duplication **holds**.

##### Modification B — Keep `k >= next[p]`, but set `next[p] := k + 1`

Now, whenever a message with sequence number `k` is delivered, the receiver expects `k + 1` next.

```text
whenever (p, k, m) in pending AND k >= next[p]:
    remove (p, k, m) from pending
    next[p] := k + 1
    fifo.Deliver(p, m)
```

###### FIFO: **Holds** (for messages that actually get delivered).

**Reason:** Suppose a delivered message has sequence number `k`.
- After its delivery, `next[p] = k+1`.
- Any older message with a smaller sequence number `k′ < k` can no longer satisfy `k′ >= next[p]`.
- Thus two messages cannot be delivered in the *reverse* of their sending order.

A crucial subtlety: this does **not** mean all messages get delivered.
- A message may be skipped forever.
- FIFO is a statement about the **relative order of messages that are delivered**.

###### Reliable delivery: **Fails.**

Suppose the receiver gets $m_3$ before $m_1$ and $m_2$.
- It delivers $m_3$ and sets `next[p] = 4`; $m_1$ and $m_2$ can never satisfy the guard when they arrive.
- Correct messages are never delivered.

###### No creation / no duplication: **Hold**, for the same reasons as Modification A (perfect link + removal from `pending`).

**Result B:** FIFO **holds**; reliable delivery **fails**; no creation **holds**; no duplication **holds**.

##### Modification C — Keep `k >= next[p]` and `next[p]++`, but *do not remove* from `pending`

This is a further modification of A, **not** a change to the original `k = next[p]` algorithm.

```text
whenever (p, k, m) in pending AND k >= next[p]:
    // Do NOT remove (p, k, m)
    next[p] := next[p] + 1
    fifo.Deliver(p, m)
```

###### No duplication: **Fails.**

A **single** message can be delivered repeatedly because it remains in `pending` and its sequence number can satisfy the guard more than once:

```text
q receives m3(k=3); pending contains m3; next[p] = 1

3 >= 1 -> deliver m3; next[p] := 2; m3 stays pending
3 >= 2 -> deliver m3; next[p] := 3; m3 stays pending
3 >= 3 -> deliver m3; next[p] := 4; m3 stays pending
3 >= 4 -> FALSE

m3 has been delivered THREE TIMES.
```

This is a valid counterexample even though the **perfect link itself never duplicated the message**: the **upper-layer algorithm** duplicated the delivery.

###### FIFO: **Fails.**

The $m_3$-then-$m_2$ counterexample from Modification A remains possible (the guard is still too permissive).

###### Reliable delivery: **Fails.**

As before, older messages can become permanently ineligible after `next[p]` increases.

###### No creation: **Holds.**

Every pending message still originated from a perfect-link delivery; repeated delivery is **duplication**, not **creation** of a message that nobody sent.

**Result C:** FIFO **fails**; reliable delivery **fails**; no creation **holds**; no duplication **fails**.

##### Modification D — Original guard, but initialize `next[p] := 4`

Restore the original equality guard `k = next[p]` and the original update/removal behavior, but initialize the receiver's expected sequence number incorrectly:

```text
next[p] := 4      // instead of 1
```

Suppose the sender correctly starts at sequence number 1 and sends $m_1$, $m_2$, $m_3$, $m₄$.

- On $m_1$, $m_2$, $m_3$, the receiver expects `4`, so those messages remain pending.
- On $m₄$, sequence `4` matches, so $m₄$ can be delivered and `next[p]` becomes `5`.
- Earlier messages are now permanently below the expected sequence number.

**Reliable delivery fails** even though the underlying perfect link delivered every message.

**FIFO still holds:** the mechanism cannot deliver messages out of sequence; it may simply **skip** earlier messages forever. **No duplication and no creation still hold** because the relevant protective mechanisms have not changed.

**Result D:** FIFO **holds**; reliable delivery **fails**; no creation **holds**; no duplication **holds**.

##### Modification E — Original guard, but the sender starts at sequence number 3

Keep `next[p] := 1` at the receiver and restore the original `k = next[p]` delivery condition.
- Now the first **transmitted** message is assigned sequence number `3` (subsequent messages use `4`, `5`, ...).

The receiver waits forever for a message numbered `1`.
- No such message will be sent.
- Consequently **no message can be delivered**, regardless of how reliably the perfect link transmits them.
- **Reliable delivery fails**: correct sent messages never reach the application.
- **FIFO holds**: there are no two delivered messages in the wrong order (indeed, none are delivered).
- **No duplication holds**: no message is delivered twice.
- **No creation holds**: no unsent message is delivered.

**Professor's lesson:** An algorithm that never delivers anything can satisfy these **safety** properties while violating **liveness**.
- The absence of bad deliveries is not the same thing as guaranteeing eventual delivery.

##### Summary table — all variants

| Variant | FIFO | NC | ND | RD |
|---|---|---|---|---|
| Original | ✅ | ✅ | ✅ | ✅ |
| A | ❌ | ✅ | ✅ | ❌ |
| B | ✅ | ✅ | ✅ | ❌ |
| C | ❌ | ✅ | ❌ | ❌ |
| D | ✅ | ✅ | ✅ | ❌ |
| E | ✅ | ✅ | ✅ | ❌ |

NC = no creation; ND = no duplication; RD = reliable delivery.
- The variants are defined above.

These conclusions assume the perfect-link properties and the rest of the algorithm as stated in the professor's exercise. **Always say which change you are analyzing**, because removing `pending` under an equality guard is *not* the same as removing it under the permissive `>=` guard.

##### How to answer this type of exam question

The professor explicitly recommends examining **each property separately**, even if one violation has already shown that the modified algorithm is not correct overall.

**When you suspect a property fails:**

1. **State the property** precisely.
2. **Construct an execution** showing a violation (send order, receive order, guard, value of `next[p]`, whether a message remains pending).
3. **Show that every step is permitted** by the modified pseudocode and underlying link assumptions.
4. **Point to the contradiction**: e.g. $m_3$ delivered before $m_2$, although $m_2$ was sent first; or a correct sent message stuck forever.
5. **Conclude** explicitly: *the property does not hold*.

**When you believe a property holds:**

1. State what would constitute a violation.
2. Identify the relevant **invariant** (e.g. `next[p]` never decreases; delivered messages are removed from pending; only link-delivered messages enter pending).
3. Explain why the algorithm cannot produce the violation in **any** execution.
4. Conclude explicitly: *the property holds*.

The trace in **Modification A** illustrates this counterexample structure: state FIFO, apply each enabled handler, and compare send order with delivery order.

#### Quick reference for revision

> [!info]- Formula recap
>
> - **Clock drift-rate bound:**
>   - $1-\rho\leq\frac{dH}{dt}\leq1+\rho$
>   - Correct hardware-clock rate stays near real time
> - **Clock skew:**
>   - $\lvert C_i(t)-C_j(t)\rvert$
>   - Difference between two readings at the same instant
> - **Worst-case skew after perfect sync:**
>   - $\operatorname{Skew}(T)\leq2\rho T$
>   - Fastest and slowest correct clocks diverge
> - **Maximum resynchronization interval:**
>   - $T\leq\frac{\Delta}{2\rho}$
>   - Maintain skew no greater than $\Delta$
> - **Monotonicity:**
>   - $t_1<t_2\implies C(t_1)\leq C(t_2)$
>   - Local clock never goes backward
> - **External synchronization:**
>   - $|C_i(t)-S(t)|<D$
>   - Each clock is near UTC/reference source
> - **Internal synchronization:**
>   - $|C_i(t)-C_j(t)|<D$
>   - Every pair of clocks agrees
> - **External ⇒ internal:**
>   - $D_{\mathrm{internal}}=2D_{\mathrm{external}}$ (guaranteed bound)
>   - Triangle inequality
> - **Cristian's clock update:**
>   - $C_{\mathrm{new}}=T_s+\mathrm{RTT}/2$
>   - Assume symmetric request and reply delays
> - **Cristian's accuracy:**
>   - $|E|\leq \mathrm{RTT}/2-\mathrm{min}$
>   - Lower-bound each one-way delay by $\mathrm{min}$
> - **Berkeley offset:**
>   - $\delta_i=C_i-C_m$
>   - Process offset relative to master
> - **Berkeley correction:**
>   - $\operatorname{Correction}_i=\overline{\delta}-\delta_i$
>   - Adjustment needed to reach the average
> - **Physical-time order sufficient condition:**
>   - $C(e_2)-C(e_1)>2D$
>   - Event uncertainty intervals do not overlap

##### Concept checks

Use the explanations above to answer without looking at the solutions:

- If two correct clocks agree now, why will they diverge?
- Why can't synchronization be done just once?
- Why is moving the clock backward dangerous?
- Does external synchronization with $D$ imply internal synchronization with $D$?
- Why add only $\mathrm{RTT}/2$ to Cristian's server timestamp?
- Why is $d_2,max = \mathrm{RTT} - \mathrm{min}$ rather than $\mathrm{RTT}/2$?
- In Berkeley, does rejecting an outlier mean sending it no correction?
- Why use NTP strata?
- Why can't timestamps always order events?
- Why is FIFO not enough for the trading example?
- Why can changing one FIFO guard also break reliable delivery?

##### The most important connection across Lessons 3 and 4

Lesson 2 introduced **FIFO links and their correctness**; Lesson 3 introduced physical clocks.
- These notes connect them: FIFO variants test each safeguard, while clock uncertainty motivates **causal relationships and logical time**.

> **Next topic:** scalar/Lamport clocks, vector clocks and causal delivery. This note introduces the motivation rather than those algorithms.
