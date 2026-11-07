# Lesson 1 — Distributed Systems and the Execution Model

## What Is a Distributed System?

A **distributed system** consists of spatially separated entities that have computational power and communicate to achieve a common goal. An entity may be a physical machine or a software process; in the course model, we reason in terms of processes. They execute independently and coordinate by exchanging messages.

We focus on **static networks**: the set of processes and the network topology remain fixed during an execution. A process may still fail; a fixed topology does not mean that every participant keeps working.

### Fault-Tolerant Agreement and the Consensus Problem

Suppose several computers cooperate on a task, but some may fail. **Fault-tolerant agreement** asks how the surviving computers can still agree. In the **consensus problem**, each process starts with an initial value, such as `Commit` or `Abort`, and processes exchange messages so that all non-faulty participants eventually reach the same decision despite failures.

![[Pasted image 20260924103257.png|533]]

Failures can be handled by **detecting** them, **masking** their effects, **tolerating** them while continuing to operate, or **recovering** afterward. This course mainly studies tolerance: an algorithm must work under its stated failure bound. For example, a model may require fewer than one third of processes to be faulty; that is an assumption of the particular model, not a universal threshold.

### Asynchrony and the Main Difficulty of Distributed Systems

In an **asynchronous system**, processes cannot rely on a shared physical clock or known upper bounds on communication delays and local execution times. A process does not know when another process will take its next step or when a message will arrive. Unpredictable does not mean slow: a predictably slow system is easier to reason about than one whose delays cannot be bounded.

A waiting process therefore cannot tell whether a peer has crashed, is running slowly, or has a delayed message. This uncertainty combines with the process's **local view**: it sees its own state and received messages, rather than the complete state of the system.

## Methodology and System Model

To reason precisely, we distinguish the **model**, which states assumptions about processes, links, timing and failures; the **abstraction**, which identifies the service we want; its **specification**, which gives the properties that service must satisfy; and the **algorithm**, which implements it under the model. An algorithm is correct only relative to those assumptions and properties.

### Network Graph and Processes

The system contains a fixed set of $n$ processes with distinct identities:

$$
\Pi = \{p_0,p_1,\dots,p_{n-1}\}.
$$

We represent the network by a static graph $G=(\Pi,E)$, with processes as nodes and communication links as edges. The graph is usually complete: each process can communicate directly with every other process. Identities are represented abstractly by integers, much as addresses identify machines in a real network.

![[Pasted image 20260926085113.png|311]]

### Process as an I/O Automaton (State Machine)

Each process $p_j$ is modeled as a deterministic **I/O automaton**, possibly with infinitely many states. It receives inputs and produces outputs at an upper boundary, connected to an application or user, and sends and receives messages at a lower boundary, connected to communication links.

Its local state includes two buffers:

- $\mathrm{InBuf}_j$: messages delivered by the network since the process's last local step.
- $\mathrm{OutBuf}_j$: messages sent by the process but not yet delivered to their destinations.

![[Pasted image 20260926085524.png|363]]

Let $Q$ be its internal state space, $Q_{\mathrm{in}}\subseteq Q$ its initial states, and $M$ the set of messages. Initial states may differ between processes, which have distinct identities. Each message records $\langle\text{sender},\text{receiver},\text{payload}\rangle$. The transition function maps the current state and input buffer to a new state and outgoing messages:

$$
P_j(q,\mathrm{InBuf}_j)=(q',\mathrm{Send\_msg}),
\qquad q,q'\in Q,\quad \mathrm{Send\_msg}\subseteq M.
$$

During one **atomic local step**, $p_j$ consumes its input buffer, changes state from $q$ to $q'$, and appends the generated messages to its output buffer:

$$
\mathrm{OutBuf}_j\gets\mathrm{OutBuf}_j\cup\mathrm{Send\_msg},
\qquad
\mathrm{InBuf}_j\gets\varnothing.
$$

## Configurations, Events, and Executions

### Configuration (Global State)

A **configuration** $C_t$ describes the entire system at step $t$. It is an $n$-tuple whose entry for $p_j$ contains the internal state and both buffers:

$$
C_t[j]=(q_j,\mathrm{InBuf}_j,\mathrm{OutBuf}_j).
$$

For example, the configuration below has a message waiting in $p_1$'s input buffer:

$$
C_0=\big\langle(q_0,\{\},\{\}),\;(q_1,\{m\},\{\}),\;(q_2,\{\},\{\})\big\rangle.
$$

![[Pasted image 20260926100143.png|525]]

### Events and the Scheduler (Adversary)

An **event** is an atomic transition between configurations. The **scheduler**, also called the **adversary**, chooses which enabled event occurs next. In the basic model there are two event types:

- $\mathrm{Exec}(i)$: $p_i$ takes a local step, consuming its input and generating outgoing messages.
- $\mathrm{Del}(i,j,m)$: the network moves message $m$ from $\mathrm{OutBuf}_i$ to $\mathrm{InBuf}_j$.

![[ezgif.com-speed.gif]]

The scheduler controls the order of these events, but cannot invent messages or arbitrary state changes. $\mathrm{Exec}(i)$ is enabled while $p_i$ has not crashed; $\mathrm{Del}(i,j,m)$ is enabled only when the message, addressed to $p_j$, is in $\mathrm{OutBuf}_i$.

### Execution and Space-Time Diagrams

An **execution** is one possible evolution of the system, written as an alternating sequence of configurations and enabled events:

$$
\varepsilon=(C_0,e_0,C_1,e_1,C_2,e_2,\dots).
$$

Here $C_0$ is initial, and applying $e_k$ to $C_k$ produces $C_{k+1}$. A **space-time diagram** draws each process as a horizontal timeline running from left to right, with points for local steps and arrows from message sends to deliveries.

![[Pasted image 20260926101131.png|578]]

### Fairness: Limiting the Power of the Scheduler

Without restrictions, the scheduler could prevent progress by never scheduling a process or by delaying a message forever. In the reliable-message execution model used here, an execution is **fair** when every correct process takes infinitely many local steps and every message sent between correct processes is eventually delivered. Fairness provides eventual progress opportunities, without telling us how long a process or message will wait.

![[Pasted image 20260926101817.png|300]]

For example, let $p_0$ and $p_1$ start with value `0`, and $p_2$ with `1`, in the topology $p_0-p_1-p_2$. To learn that some process holds `1`, $p_0$ needs information to travel from $p_2$ through $p_1$. Without fairness, the scheduler could isolate $p_2$ forever by withholding its messages or steps. Fairness excludes that behavior.

## Local View and the Indistinguishability Theorem

A process cannot observe the global configuration or execution. Its **local view**, denoted $\varepsilon|p_i$, consists of its initial state and the events involving it: its own $\mathrm{Exec}(i)$ steps and incoming $\mathrm{Del}(*,i,m)$ events.

![[Pasted image 20260926102907.png|498]]

Two different global executions can give $p_i$ the same local view. For example, a remote process might have crashed in one execution while its messages are merely delayed in another. Until a distinguishing message arrives, $p_i$ has the same information in both.

### The Indistinguishability Theorem

![[Pasted image 20260926103001.png|532]]

If a deterministic process $p_i$ has the same local view in two executions, it takes the same actions, reaches the same local states and sends the same messages in both:

$$
\varepsilon|p_i=\varepsilon'|p_i
\quad\Longrightarrow\quad
\text{the behavior of }p_i\text{ is identical in both executions}.
$$

This follows from its transition function: equal initial states and equal inputs produce equal next states. It is the basis of **indistinguishability arguments** in impossibility proofs. If two executions require different behavior from $p_i$ but give it identical information, a deterministic algorithm cannot choose differently between them.
