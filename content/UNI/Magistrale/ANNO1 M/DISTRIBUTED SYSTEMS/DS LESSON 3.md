#### Time in distributed systems

> [!info] Slides and scope
> Reference: [[../Percorso STUD2/Materiali/Distributed_Physical_Time_A.pdf|Time in Distributed Systems I]], physical PDF pages **1–27**.
> The examples and explanations already in these notes are retained alongside the slide material.

##### The Three Models of Time

*Slides, physical PDF pages 4–7.*

In distributed systems, time assumptions determine how processes communicate and how algorithms can behave.

We distinguish three models: **asynchronous**, **synchronous**, and **eventually synchronous**.

###### Asynchronous systems

In an asynchronous system:

- There is **no known upper bound on message delays**.
- Processes can execute local computational steps at unpredictable times.
- We cannot assume a globally synchronized clock.

For example, a message may take 10 milliseconds, 5 seconds, or several hours to arrive.
- An algorithm cannot rely on a maximum delivery time.

The advantage of the asynchronous model is that it is very general: algorithms designed for it can work under many different timing conditions.

> [!info]- Additional context already in these notes
> However, this generality makes certain problems impossible to solve under specific failure assumptions. For example, deterministic consensus cannot be guaranteed in a fully asynchronous system with even one possible crash failure (the FLP impossibility result).

###### Synchronous systems

In a synchronous system:

- Message delays have a **known upper bound**.
- Local computation times are bounded.
- Processes can be scheduled according to known timing constraints.

If the maximum message delay is $\delta$, a message sent at time $t$ must be delivered no later than:

$$
t_{\text{delivery}}\leq t+\delta
$$

For example, if $\delta=100\text{ ms}$, every message covered by this guarantee must arrive within 100 milliseconds.

Synchronous systems provide stronger timing guarantees, making more distributed problems solvable.
- However, these guarantees are difficult to maintain in unrestricted real-world networks.

**Important:** The system provides the timing guarantee; the algorithm decides whether to use it.

An asynchronous algorithm can run in a synchronous system without knowing $\delta$.
- It simply does not need that additional guarantee.

###### Eventually synchronous systems

An eventually synchronous system combines aspects of the previous two models.

> **Definition:** There exists a time $T$, unknown to us, after which the system becomes synchronous and remains synchronous forever.

The time $T$ is called the **stabilization time**.

Before $T$, the system may experience unpredictable delays.
- After $T$, message delays and execution times satisfy stable bounds.

In many eventually synchronous algorithms, neither the exact stabilization time nor the eventual delay bound needs to be known in advance.

![[DS-L3-eventual-synchrony.svg|480]]

*Existing explanatory diagram; reference: slide 13.*

##### Why Do We Need Eventual Synchrony?

*Slides, physical PDF pages 8–10.*

Real networks often behave synchronously in practice, even though they cannot guarantee strict timing bounds at all times.

The professor illustrates this using a `ping` experiment:

- Most round-trip times are approximately 40–45 milliseconds.
- Occasionally, a round-trip time is much larger, such as 739 milliseconds.

These occasional spikes invalidate a strict 50 ms round-trip bound. The reported values are round-trip times (RTT); a one-way message-delay bound $\delta$ is a different quantity.

We therefore need a model that allows unpredictable behavior initially but still provides conditions under which algorithms can eventually make progress.

Notice that **usually observing small delays does not prove eventual synchrony**.
- Eventual synchrony requires a permanent stabilization after some unknown time.

##### Safety and Liveness in Eventually Synchronous Systems

*Slides, physical PDF pages 11–13.*

Recall the distinction from Lesson 2:

- **Safety:**
  - Something bad must never happen.
- **Liveness:**
  - Something good must eventually happen.

A safety violation can be demonstrated using a finite execution prefix.
- Once it happens, extending the execution cannot undo the violation.

A liveness violation, on the other hand, generally requires an infinite execution in which the expected progress never occurs.

###### Mutual exclusion example

Consider two processes, $p_1$ and $p_2$, that want to access a shared critical section.

The algorithm must guarantee:

**Safety — Mutual Exclusion**

At most one process can be inside the critical section at any given time.

**Liveness — No-Starvation**

A correct process requesting access must eventually be allowed to enter, under the algorithm's assumptions.

Suppose the network experiences high latency.

If the algorithm allows both processes to enter the critical section simultaneously, it violates safety.

Even if the network stabilizes afterward, the violation cannot be undone.

Instead, the algorithm can make both processes wait until sufficient coordination is possible.

This does not necessarily violate liveness because **waiting is acceptable as long as progress eventually occurs**.

###### Why safety must always hold

In an eventually synchronous system, the network may behave asynchronously before stabilization time $T$.

Therefore, an algorithm correct under this model cannot rely on eventual timing guarantees to preserve safety.

Safety must hold:

- Before $T$, when delays may be unpredictable.
- After $T$, when delays become bounded.

For example, mutual exclusion must never be violated, even during periods of high latency.

###### Why liveness can depend on synchrony

Liveness is different because progress can be delayed without immediately violating the property.

Before $T$, processes may be unable to coordinate and may temporarily stop making progress.

After $T$, the system remains synchronous forever.
- This provides the algorithm with a sufficiently long period of stable communication to eventually make progress.

For example, a process may wait for 30 minutes before entering the critical section.
- If it eventually enters, no-starvation has not been violated.

![[DS-L3-eventual-progress.svg|460]]

*Existing illustration of the 30-minute waiting example in these notes.*

However, if a correct requesting process waits forever without entering, no-starvation is violated.

**Key idea:** Safety must hold throughout the entire execution, while liveness may rely on the eventual stabilization of the system.

![[DS-L3-safety-liveness.svg|520]]

*Existing explanatory diagram; reference: slides 11–13.*

The definition of eventual synchrony is useful because the permanent synchronous period allows us to prove eventual progress without knowing how much time the algorithm will need.

##### Relationship Between Time Models

*Slides, physical PDF pages 14–15.*

The professor distinguishes two different relationships.

###### Relationship between possible executions

An execution is a possible sequence of events performed by the distributed system.

The three models allow different sets of executions:

$$
\text{Sync}\subseteq\text{E-Sync}\subseteq\text{Async}
$$

This means:

1. Every synchronous execution is also eventually synchronous, because the system can be considered stable starting at $T=0$.
2. Every eventually synchronous execution is compatible with the asynchronous model, because that model imposes no timing bounds.
3. The reverse implications do not hold in general.

An asynchronous system permits more possible executions because messages and processes can experience arbitrary delays.

![[DS-L3-time-models.svg|430]]

*Existing explanatory diagram; reference: slide 14.*

###### Relationship between solvable problems

The relationship between solvable problems is reversed:

$$
\begin{aligned}
\text{Solvable}_{\text{Async}}
&\subseteq \text{Solvable}_{\text{E-Sync}} \\
&\subseteq \text{Solvable}_{\text{Sync}}.
\end{aligned}
$$

![[DS-L3-slide-15-solvable-problems.png|520]]

*Source: Time in Distributed Systems I, physical PDF page 15; cropped from the slide.*

The intuition is:

**The fewer possible executions an algorithm must handle, the more timing assumptions it can exploit, and the more problems it may be able to solve.**

Therefore:

- An asynchronous algorithm also works in an eventually synchronous or synchronous system, assuming the same other system conditions.
- An eventually synchronous algorithm also works in a synchronous system.
- A synchronous algorithm is not guaranteed to work in an asynchronous system.

For example, a synchronous algorithm might use a timeout to detect a possible process failure.
- In an asynchronous system, a message could simply be delayed beyond that timeout, causing an incorrect decision.

**Important:** A synchronous system does not automatically introduce timeouts or generate errors.
- It provides timing guarantees that algorithms may use.

##### Why Is Time Important in Distributed Systems?

*Slides, physical PDF pages 17–21.*

Many distributed applications need to measure time or determine the order of events.

Examples discussed by the professor include:

- Ordering events in distributed applications.
- Stock market operations and buy/sell orders.
- Authentication protocols that use timestamps to help prevent replay attacks.
- Network monitoring and measurements.
- Sensor networks using Time Division Multiple Access (TDMA) to assign access to a shared communication medium.

A common approach is **timestamping**: associating a timestamp with each event.

By comparing timestamps, processes may attempt to reconstruct a global history of the distributed system.

However, this approach requires sufficiently accurate clocks.
- If clocks are not properly synchronized, timestamps may produce an incorrect ordering.

![[DS-L3-slide-19-event-ordering.png|640]]

*Source: Time in Distributed Systems I, physical PDF page 19; two space-time diagrams illustrating different global event orders.*

This motivates the study of physical clocks and clock synchronization.

##### Hardware and Software Clocks

*Slides, physical PDF pages 22–23.*

###### Hardware clocks

Computers typically measure time using a hardware oscillator, often based on quartz.

A quartz oscillator generates electrical oscillations at an approximately regular frequency.

By counting these oscillations, the computer can measure elapsed time.

For example, suppose an oscillator generates 1,000 ticks per second:

- 1,000 ticks correspond to approximately 1 second.
- 2,000 ticks correspond to approximately 2 seconds.
- 5,000 ticks correspond to approximately 5 seconds.

The hardware clock of process $i$ is denoted by:

$$
H_i(t)
$$

In the mathematical representation used in the lecture notes:

$$
H_i(t)=\int_0^t h_i(\tau)\,d\tau
$$

Here, $h_i(\tau)$ represents the instantaneous rate at which the hardware clock advances, in the chosen clock units.

The main idea is that **the hardware clock measures elapsed time by accumulating oscillator ticks**.

However, the frequency is not perfectly stable, so hardware clocks can run faster or slower than real time.

###### Software clocks

The time displayed by an operating system is obtained by interpreting and adjusting the underlying hardware clock.

The professor models the software clock as:

$$
\boxed{C_i(t)=\alpha H_i(t)+\beta}
$$

Where:

- $H_i(t)$:
  - Hardware clock of process $i$.
- $C_i(t)$:
  - Software clock of process $i$.
- $\alpha$:
  - Scaling factor that adjusts the clock's speed.
- $\beta$:
  - Offset used to adjust the displayed time.

**Parameter $\alpha$ — Speed correction**

Suppose the hardware clock is twice as fast as real time.

For every 1 second of real time, it advances by 2 seconds.

To compensate, we can choose:

$$
\alpha=\frac12
$$

If the hardware clock is instead twice as slow, we can choose:

$$
\alpha=2
$$

**Parameter $\beta$ — Offset correction**

Suppose two computers display different times:

- Computer $p_1$: 10:00
- Computer $p_2$: 11:00

They have an offset of one hour.

Adjusting $\beta$ allows the software clock to change its displayed value without changing the underlying hardware clock's rate.

Clock synchronization algorithms use adjustments to clock offsets and rates to keep software clocks aligned.

##### Clock Skew and Drift Rate

*Slides, physical PDF pages 24–26.*

The professor introduces two important concepts: **skew** and **drift rate**.

###### Clock skew

Clock skew is the difference between the readings of two software clocks at the same real time $t$.

$$
\boxed{\operatorname{Skew}_{i,j}(t)=|C_i(t)-C_j(t)|}
$$

For example:

- Computer $p_1$ displays 10:00.
- Computer $p_2$ displays 10:05.

Their clock skew is 5 minutes.

If skew were the only problem, synchronization would be relatively simple: we could compare the clocks, correct their offsets, and keep them synchronized.

Unfortunately, clocks can advance at different speeds.

###### Clock drift rate

Clock drift describes the deviation of a clock's advancement rate from the rate of real time.

The professor uses the derivative:

$$
\frac{dH(t)}{dt}
$$

This tells us how quickly hardware time advances compared with real time.

We distinguish three situations.

**Perfect clock**

$$
\frac{dH(t)}{dt}=1
$$

The clock advances at exactly the same rate as real time.

For every 1 hour of real time, it measures exactly 1 hour.

**Fast clock**

$$
\frac{dH(t)}{dt}>1
$$

The clock advances faster than real time.

For example, if its rate is 2, it measures 2 hours for every 1 hour of real time.

**Slow clock**

$$
\frac{dH(t)}{dt}<1
$$

The clock advances slower than real time.

For example, if its rate is 0.5, it measures only 30 minutes for every 1 hour of real time.

![[DS-L3-clock-rates.svg|480]]

*Existing explanatory diagram; reference: slide 25.*

###### Why drift is a problem

Suppose two clocks are synchronized perfectly at 10:00.

If one clock advances slightly faster than the other, after several hours they will display different times.

Therefore, even if the initial skew is zero, **clock drift can cause the skew to increase over time**.

One might think that adjusting $\alpha$ once would solve the problem permanently.

However, physical clocks do not necessarily maintain a constant rate.

Their oscillation frequency can change due to environmental conditions, such as temperature.

For example, changes in the temperature of a quartz crystal may alter its oscillation frequency.

![[DS-L3-slide-26-temperature-drift.png|540]]

*Source: Time in Distributed Systems I, physical PDF page 26; quartz frequency error varies with temperature.*

A clock can therefore become faster or slower over time, making periodic correction necessary.

##### Correct Hardware Clocks

*Slides, physical PDF page 27.*

Since physical clocks are not perfect, the professor introduces the concept of a **correct clock**.

A hardware clock is correct if its advancement rate remains within a specified bound around the ideal rate.

Let $\rho>0$ represent the maximum permitted rate deviation.

A clock is correct if:

$$
\boxed{
1-\rho\leq\frac{dH(t)}{dt}\leq1+\rho
}
$$

This means the clock may run slightly faster or slower than real time, but it must always remain within the allowed interval.

For an illustrative example, suppose:

$$
\rho=0.01
$$

Then:

$$
0.99\leq\frac{dH(t)}{dt}\leq1.01
$$

A clock with rate $1.005$:

- Is **correct**, because its rate lies within the allowed interval.
- Is **not perfect**, because its rate is different from 1.
- Runs approximately 0.5% faster than real time.

A correct clock can still accumulate time errors.
- Correctness only guarantees that these errors grow within controlled bounds.

For a real-time interval $[t_0,t_1]$, with $t_1>t_0$, slide 27 gives:

$$
\begin{aligned}
(1-\rho)(t_1-t_0)
&\leq H(t_1)-H(t_0) \\
&\leq (1+\rho)(t_1-t_0).
\end{aligned}
$$

The measured interval can differ from real elapsed time, but the rate bound limits the error.

##### Key Concepts to Remember

- **Asynchronous system:**
  - No known upper bound on message delays or execution times
- **Synchronous system:**
  - Known timing bounds
- **Eventually synchronous system:**
  - Becomes permanently synchronous after an unknown time $T$
- **Safety:**
  - Something bad must never happen
- **Liveness:**
  - Something good must eventually happen
- **Hardware clock $H_i(t)$:**
  - Measures time using hardware oscillator ticks
- **Software clock $C_i(t)$:**
  - Adjustable clock obtained from hardware time
- **Clock skew:**
  - Difference between two clock readings at the same time
- **Clock drift:**
  - Deviation of a clock's advancement rate from real time
- **Perfect clock:**
  - Advances at exactly the rate of real time
- **Correct clock:**
  - Advances within the bounds $1-\rho$ and $1+\rho$

The central ideas of this lecture are:

**1.** Stronger timing assumptions make more problems solvable, but are harder to guarantee in real networks.

**2.** Eventual synchrony allows algorithms to preserve safety at all times while relying on permanent stabilization to guarantee eventual progress.

**3.** Physical clocks are imperfect.
- Even after synchronization, drift can cause their readings to diverge again.
