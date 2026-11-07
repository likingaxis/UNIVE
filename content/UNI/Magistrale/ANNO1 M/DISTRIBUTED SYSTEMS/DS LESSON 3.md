# Lesson 3 — Time Models and Physical Clocks

## Models of Time in Distributed Systems

What can a process assume about how long a message or a computation will take? The answer determines which algorithms we can design and what we can prove about them.

In an **asynchronous system**, there are no known upper bounds on message delay or process execution time, and synchronized physical clocks are not assumed. Delays can be arbitrarily long, so a process waiting for a reply cannot tell whether its peer has crashed or is simply slow. A timeout alone cannot establish that a crash occurred.

In a **synchronous system**, known bounds hold throughout the execution: messages over non-faulty links arrive within $\Delta_{\text{msg}}$, local computation takes at most $\Delta_{\text{proc}}$, and clock drift is bounded by a known rate $\rho$. A timeout chosen to cover the required communication and processing can therefore distinguish a missing response from an admissibly slow one, under the assumed failure model.

The distinction is about **guarantees**, not speed. A predictably slow system can be synchronous. Removing timing assumptions makes the model more general, but also makes problems harder to solve: the adversary has more freedom to delay steps and messages. This uncertainty is central to impossibility results for deterministic consensus in asynchronous systems with crashes.

### Partial Synchrony and Eventually Synchronous Systems

Real `ping` measurements often show short delays interrupted by congestion spikes or routing changes. An informal picture of **partial synchrony** is therefore a network with stable intervals and unstable intervals, rather than a fixed bound that always holds.

![[DS-L3-partial-synchrony.svg|680]]

For the analysis in these notes, we use the **eventually synchronous model**. There is an unknown stabilization time $T$ after which the timing bounds hold forever; before $T$, they may be violated.

![[DS-L3-eventual-synchrony.svg|620]]

Processes do not know when $T$ has occurred, so an algorithm cannot simply wait for stabilization and then start. Its **safety** properties must hold even before $T$, while its **liveness** argument can rely on the stable period after $T$.

![[DS-L3-safety-liveness.svg|520]]

![[DS-L3-eventual-progress.svg|640]]

For example, a distributed mutual-exclusion algorithm must never allow two processes into the **critical section (CS)** together, even during the unstable phase. Its progress guarantee requires every requesting process eventually to enter; an algorithm designed for eventual synchrony may need stabilization to ensure this progress.

### Relationships Between Executions and Solvable Problems

A synchronous execution satisfies its bounds from the start, so it is also eventually synchronous with $T=0$. Every eventually synchronous execution is also permitted by the asynchronous timing model. Thus the sets of allowed executions satisfy:

$$
\text{Sync} \subseteq \text{E-Sync} \subseteq \text{Async}.
$$

![[DS-L3-time-models.svg|480]]

An algorithm correct for all asynchronous executions is consequently correct for the smaller sets of eventually synchronous and synchronous executions, keeping the other model assumptions fixed. The inclusion reverses for the sets of solvable problems:

$$
\text{Solvable}_{\text{Async}} \subseteq \text{Solvable}_{\text{E-Sync}} \subseteq \text{Solvable}_{\text{Sync}}.
$$

![[DS-L3-slide-15-solvable-problems.png|550]]

## Why Time is Important in Distributed Systems

Different machines have separate clocks, and messages can take different amounts of time to arrive. Two receivers may therefore observe messages in different orders.

![[DS-L3-message-ordering.svg|680]]

When comparing events on different processes, we must distinguish their **physical occurrence times** from their **causal relationship**. Physical clocks estimate when events occurred; logical clocks, introduced later, track ordering through local execution and message passing.

![[DS-L3-slide-19-event-ordering.png|550]]

This matters in several practical settings:

- **TDMA:** nodes share a communication medium through recurring time slots. If they disagree on slot boundaries, transmissions can overlap and collide.
- **Security:** certificates and Kerberos tickets contain validity intervals or expiration times, so acceptance depends on clock readings.
- **Logs, databases and financial systems:** timestamps help reconstruct failures, coordinate operations and compare events across machines.

![[DS-L3-tdma.svg|680]]

## Physical Computer Clocks

Each process $p_i$ has a local clock $C_i$. If an event $e$ occurs at real time $t$, its physical timestamp is the local reading:

$$
C(e) := C_i(t).
$$

### Hardware Clocks vs. Software Clocks

![[DS-L3-hw-sw-clock.svg|700]]

A **hardware clock** uses a quartz oscillator and counters to generate ticks. In the simplified mechanism considered here, oscillations drive a counter; when it reaches zero, it generates a timer interrupt and reloads. The accumulated tick count is represented by $H_i(t)$.

The operating system converts this count into a **software clock**, expressed in units meaningful to applications, such as seconds since an epoch:

$$
C_i(t) = \alpha H_i(t) + \beta.
$$

The factor $\alpha$ controls the rate at which the software clock advances, while $\beta$ adjusts its offset. Changing the rate allows the operating system to correct a clock gradually, rather than abruptly jumping to a different reading.

## Clock Skew and Clock Drift

**Skew** is the difference between two clock readings at the same real instant:

$$
\operatorname{Skew}_{i,j}(t) = |C_i(t)-C_j(t)|.
$$

**Drift** concerns the clock's rate: a clock may advance faster or slower than real time, causing its error, and its skew relative to another clock, to change.

When clock readings and real time use the same units, the derivative describes three cases:

- $dH(t)/dt=1$: the clock advances at the ideal rate.
- $dH(t)/dt>1$: the clock is fast.
- $dH(t)/dt<1$: the clock is slow.

![[DS-L3-clock-rates.svg|520]]

Two quartz oscillators need not run at exactly the same rate, even if manufactured from the same material. Manufacturing differences and aging affect their frequencies; temperature also changes an individual oscillator's rate over time. A single calibration therefore cannot remove all future drift.

![[DS-L3-slide-26-temperature-drift.png|550]]

### Correct Hardware Clock Specification

A clock is **correct** under a drift bound $\rho$ if its rate always remains within:

$$
1-\rho \le \frac{dH(t)}{dt} \le 1+\rho.
$$

For example, $\rho=10^{-6}$ permits at most $1\ \mu\mathrm{s}$ of gain or loss per second, or $86.4\ \mathrm{ms}$ per day. Correct does not mean perfectly accurate; it means the clock respects its specified rate bound.

Integrating over any interval $[t_0,t]$ gives a bound on the elapsed time measured by the clock:

$$
(1-\rho)(t-t_0) \le H(t)-H(t_0) \le (1+\rho)(t-t_0).
$$

The next lesson uses this bound to determine how often clocks must be resynchronized.
