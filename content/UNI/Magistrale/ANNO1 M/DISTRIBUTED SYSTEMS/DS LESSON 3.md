#### Models of Time in Distributed Systems

##### Asynchronous vs. Synchronous Systems

> **Asynchronous System**: A distributed system with **no timing assumptions**:
> - **Message transmission delay** is finite but **arbitrary** (unbounded).
> - **Process execution speed** (processing delay) is finite but **arbitrary** (unbounded).
> - Processes do not have synchronized physical clocks with bounded drift.

> **Synchronous System**: A distributed system where **known upper bounds** hold at all times:
> - **Bounded message transmission delay**: every message sent over a non-faulty link is received within a known time $\Delta_{\text{msg}}$.
> - **Bounded processing delay**: every local computation step takes at most a known time $\Delta_{\text{proc}}$.
> - **Bounded clock drift rate**: every local physical clock drifts from real time by at most a known rate $\rho$.

###### The Fundamental Trade-Off

| Model | Realism of Assumptions | Algorithm Design & Solvability |
| :--- | :--- | :--- |
| **Asynchronous** | **Very general**: holds even under heavy congestion or unpredictable scheduling, so any purely asynchronous algorithm works everywhere. | **Very restrictive**: a slow process is indistinguishable from a crashed one (timeouts cannot detect crashes accurately), making many fundamental problems (such as consensus with crashes) impossible to solve deterministically. |
| **Synchronous** | **Very fragile**: requires worst-case delay bounds that either fail during network spikes or must be chosen so large that performance degrades severely. | **Very powerful**: timeouts are completely reliable; if a reply does not arrive within the worst-case bound, the remote process has definitely crashed. |

##### Partial Synchrony and Eventually Synchronous Systems

###### Real-World Network Behavior (`ping`)
- Observing a sequence of `ping` round-trip times on a real network reveals that message delays stay **low and predictable most of the time**, interrupted only occasionally by **congestion spikes** or routing transients.
- Rather than discarding timing bounds altogether (purely asynchronous) or assuming they never fail (purely synchronous), a system can alternate between **synchronous periods** (delays below a bound $\Delta$) and **asynchronous periods** (delays exceeding $\Delta$).

![[DS-L3-partial-synchrony.svg|680]]

> **Partially Synchronous System**: A system that alternates between synchronous intervals (during which all timing bounds hold) and asynchronous intervals (during which timing bounds may be violated), staying synchronous most of the time.

###### Eventually Synchronous System
- For formal algorithm analysis, partial synchrony is abstracted into the **eventually synchronous model**, which captures the requirement that the network eventually remains stable long enough for the algorithm to terminate.

> **Eventually Synchronous System**: A distributed system in which timing assumptions may be violated for an arbitrary initial period, but there exists an **unknown time $T$** (often called the *Global Stabilization Time*) after which all synchronous bounds on message delay, processing speed, and clock drift hold forever.

![[DS-L3-eventual-synchrony.svg|620]]

- Because $T$ is **unknown to the processes**, an algorithm cannot simply wait until time $T$ before starting; it must execute correctly across both the initial unstable phase and the subsequent synchronous phase.

###### Safety and Liveness in Eventually Synchronous Systems
- Designing an algorithm for an eventually synchronous system requires separating **Safety** ("nothing bad ever happens") from **Liveness** ("something good eventually happens"):
  - **Safety must hold at all times**, even during the asynchronous phase before $T$, when timeouts may fire prematurely and messages may be arbitrarily delayed.
  - **Liveness is guaranteed once the system becomes synchronous** (after $T$), when timing bounds hold and the algorithm can make progress without false suspicions.

![[DS-L3-safety-liveness.svg|520]]

![[DS-L3-eventual-progress.svg|640]]

###### Example: Distributed Mutual Exclusion
- Suppose processes compete for exclusive access to a shared **Critical Section (CS)**:
  - **Safety (Mutual Exclusion)**: *At most one process is in the critical section at any time.* This property must **never** be violated, even when the network is behaving asynchronously.
  - **Liveness (No Starvation / Progress)**: *Every process that requests entry eventually enters the critical section.* During asynchronous periods, message delays may temporarily prevent progress, but as soon as the system stabilizes after $T$, waiting processes are guaranteed to enter the critical section.

##### Relationships Between Executions and Solvable Problems

###### Inclusion of Allowed Executions
- Every execution permitted by a synchronous system satisfies the timing bounds from the very beginning ($T = 0$), so it is also a valid eventually synchronous execution.
- Every eventually synchronous execution has finite delays, so it is also a valid asynchronous execution.
- Therefore, in terms of **possible executions** (behaviors the environment can produce):

$$\text{Sync} \subseteq \text{E-Sync} \subseteq \text{Async}$$

![[DS-L3-time-models.svg|480]]

###### Inclusion of Solvable Problems
- Stronger system assumptions restrict the adversary (fewer bad executions can happen), making **more problems solvable**:
  - Any algorithm that solves a problem in an **asynchronous** system works over *all* executions, so it automatically solves that problem in **eventually synchronous** and **synchronous** systems.
  - Conversely, a problem solvable only under synchronous assumptions may be unsolvable when timing bounds are removed.
- Therefore, the inclusion **reverses** for the sets of **solvable problems**:

$$\text{Solvable}_{\text{Async}} \subseteq \text{Solvable}_{\text{E-Sync}} \subseteq \text{Solvable}_{\text{Sync}}$$

![[DS-L3-slide-15-solvable-problems.png|550]]

---

#### Why Time is Important in Distributed Systems

##### Ordering Events and Messages
- In a single machine, all processes share one central clock and one memory space, making the order of operations unambiguous.
- In a distributed system, there is **no global shared clock**, and variable network delays can cause messages or events to be observed in different orders at different nodes.

![[DS-L3-message-ordering.svg|680]]

- Similarly, when two events $e_1$ and $e_2$ occur on different machines ($P_1$ and $P_2$), determining whether $e_1$ happened before $e_2$ requires either **synchronized physical clocks** or **logical causality tracking**.

![[DS-L3-slide-19-event-ordering.png|550]]

##### Practical Applications of Time in Distributed Systems
1. **TDMA (Time-Division Multiple Access)**:
   - Multiple nodes share a single communication medium (radio frequency or shared bus) by dividing time into recurring frames of fixed **time slots**.
   - Each process transmits only during its assigned slot; if clocks disagree on slot boundaries, transmissions overlap and collide.

![[DS-L3-tdma.svg|680]]

2. **Security Protocols and Certificates**:
   - **SSL/TLS (X.509 certificates)** and **Kerberos authentication tickets** contain validity intervals (`notBefore`, `notAfter` or expiration timestamps) to prevent replay attacks and enforce revocation.
3. **Distributed Logs, Debugging, and Financial Systems**:
   - Reconstructing the sequence of crashes across microservices, enforcing causality in distributed databases, and ordering stock-market orders all depend on accurate event timestamps.

---

#### Physical Computer Clocks

##### Timestamping Events
- Each process $p_i$ has access to a local clock $C_i$.
- Whenever $p_i$ wishes to measure time or **timestamp** a local event $e$ occurring at real (physical) time $t$, it reads the current value of its local software clock:

$$C(e) := C_i(t)$$

##### Hardware Clocks vs. Software Clocks

![[DS-L3-hw-sw-clock.svg|700]]

###### 1. Hardware Clock $H_i(t)$
- Built from a **quartz crystal oscillator** kept under tension, which vibrates at a nearly constant resonant frequency when stimulated electrically.
- Each oscillation decrements a counter register; when the counter reaches zero, it triggers a **hardware timer interrupt** and reloads, incrementing an internal tick counter.
- $H_i(t)$ represents the total number of hardware ticks elapsed since a fixed reference origin.

###### 2. Software Clock $C_i(t)$
- The operating system scales and shifts the raw hardware tick count $H_i(t)$ into human- or application-meaningful units (such as seconds, milliseconds, or nanoseconds since the Unix Epoch):

$$C_i(t) = \alpha H_i(t) + \beta$$

- **$\alpha$ (clock speed / rate factor)**: scales the tick duration and allows the OS to **slew** the clock (speed it up or slow it down smoothly).
- **$\beta$ (clock offset)**: shifts the origin to match a chosen reference epoch or to adjust the reading.

---

#### Clock Skew and Clock Drift

##### Definitions: Skew vs. Drift

> **Clock Skew**: The instantaneous difference between the readings of two clocks $C_i$ and $C_j$ at the **same real-time instant $t$**:
> $$\text{Skew}(t) = |C_i(t) - C_j(t)|$$

> **Clock Drift**: The phenomenon whereby a physical clock counts time at a rate different from real physical time $t$, causing the error (and the skew between different clocks) to change continuously over time.

##### Drift Rate $\frac{dH(t)}{dt}$
- Plotting the hardware clock reading $H(t)$ against real physical time $t$ reveals three behaviors according to the derivative (slope) $\frac{dH(t)}{dt}$:
  - **Perfect Clock**: $\frac{dH(t)}{dt} = 1$ (slope $45^\circ$; ticks at the exact rate of real time).
  - **Fast Clock**: $\frac{dH(t)}{dt} > 1$ (accumulates more than $1$ unit of clock time per unit of real time).
  - **Slow Clock**: $\frac{dH(t)}{dt} < 1$ (accumulates less than $1$ unit of clock time per unit of real time).

![[DS-L3-clock-rates.svg|520]]

##### Why Drift Rate is Not Constant
- Even two crystals cut from the same quartz bar do not oscillate at the exact same frequency due to microscopic **manufacturing tolerances** and **crystal aging**.
- Furthermore, a single clock's drift rate **changes dynamically with ambient temperature**, so one cannot simply measure a clock's error once and compensate for it permanently with a fixed constant.

![[DS-L3-slide-26-temperature-drift.png|550]]

##### Correct Hardware Clock Specification
- Manufacturers specify a **maximum drift rate $\rho$** (for typical quartz crystal oscillators, $\rho \approx 10^{-6}$, meaning the clock loses or gains at most $1\text{ }\mu\text{s}$ per second, or about $86.4\text{ ms}$ per day).

> **Correct Hardware Clock**: A hardware clock $H(t)$ is **correct** (non-faulty) if its instantaneous rate of change with respect to real time $t$ always remains within $[1 - \rho, 1 + \rho]$:
> $$1 - \rho \le \frac{dH(t)}{dt} \le 1 + \rho$$

- Integrating this bound over any real-time interval $[t_0, t]$ (with $t \ge t_0$) yields the elapsed hardware time bound:

$$(1 - \rho)(t - t_0) \le H(t) - H(t_0) \le (1 + \rho)(t - t_0)$$
