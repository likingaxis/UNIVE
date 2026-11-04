#### 1. What Is a Distributed System?

##### Definition of a Distributed System
> A **distributed system** is a set of spatially separated entities, each with computational power, that communicate and coordinate with one another to achieve a common goal.

- **Entities:** computers, physical machines, or software processes ($\text{process} = \text{machine}$).
- **Distributed:** the entities are spatially separated and execute independently.
- **Common Goal:** the entities communicate and coordinate, possibly sharing resources, to achieve a shared objective.

In this course we focus on **static networks of processes**:
- Nothing changes at the infrastructure level during the execution (the set of processes and the network topology are fixed).

---

##### Fault-Tolerant Agreement and the Consensus Problem

- **Fault-Tolerant Agreement:**
  - Several computers perform the same task.
  - Some computers may fail.
  - The goal is to make the surviving computers still reach an agreement despite failures.
- **Consensus Problem:** formalizes the idea of agreement among multiple processes:
  - Each process starts with its own initial value/opinion (e.g., **Commit** or **Abort**).
  - The processes communicate with each other by exchanging messages.
  - All non-faulty processes must eventually agree on the **same final decision**, even in the presence of failures.

![[Pasted image 20260924103257.png|533]]

---

##### Failures and How Systems Handle Them

We assume that **all computer systems fail** (sooner or later); therefore, building robust systems is essential. A system can handle failures in four different ways:
- **Detection:** notice that something went wrong.
- **Masking:** hide the effects of the failure from the user or upper layer.
- **Tolerance** *(main focus of this course)*: continue operating correctly despite failures, as long as the number of faulty processes stays below a certain threshold (for instance, if the threshold is $1/3$, the system works properly as long as more than $2/3$ of the processes are non-faulty).
- **Recovery:** restore a system's state after a failure has occurred.

---

##### Asynchrony and the Main Difficulty of Distributed Systems

An **asynchronous system** has **no global clock**. This means that:
- Processes cannot rely on a shared notion of physical time.
- Communication delays and local execution speeds are **unpredictable**.
- A process cannot know when another process will execute a step or when a sent message will arrive.
- **Unpredictable does not mean slow** (in fact, a predictably slow system is easier to reason about than an unpredictable one).
- Because of this uncertainty, a waiting process **cannot distinguish a crashed process from a very slow process** (or a process whose messages are delayed).

> **Core Challenge of Distributed Systems:**
> Distributed algorithms are a **fight against uncertainty** caused by three factors:
> 1. **Asynchrony:** execution speeds and message delays are unpredictable.
> 2. **Failures:** processes or communication links may fail.
> 3. **Local View:** each process only observes its own local state and received messages, never the complete global state of the system.

---

#### 2. Methodology and System Model

##### Four Foundational Concepts

To design and reason about distributed systems rigorously, we separate four concepts:
- **Model:** the formal set of objects and assumptions in the system (processes, communication links, timing assumptions, failure assumptions).
- **Abstraction:** the high-level component or service we want to provide, defined without implementation details.
- **Specification:** the formal properties (safety and liveness) that the abstraction must satisfy.
- **Algorithm:** the concrete distributed procedure executed by the processes to implement the abstraction under the assumed model.

---

##### Formal System Model

###### Network Graph and Processes
- A system consists of $n$ processes in a fixed set $\Pi = \{p_0, p_1, \dots, p_{n-1}\}$ with **distinct identities** (like an IP address, represented abstractly as an integer ID).
- The network topology is modeled as a static graph:
  $$G = (\Pi, E)$$
  Usually this graph is complete: every process (node) is connected to every other process by a communication link (edge).

![[Pasted image 20260926085113.png|311]]

###### Process as an I/O Automaton (State Machine)
Each process $p_j$ is modeled as a (possibly infinite-state) **I/O automaton** that interacts with two boundaries:
- **Upper layer:** receives an input $X$ from (and produces an output $Y$ to) a higher-level software component or external user.
- **Link layer:** sends messages (`Send MSG x`) and receives delivered messages (`Rcv MSG y`).

Each process maintains two message buffers:
- **$\text{InBuf}_j$:** contains messages that have been delivered to $p_j$ by the network since its last local step.
- **$\text{OutBuf}_j$:** contains messages that $p_j$ has sent into the network but that have not yet been delivered to their destinations.

![[Pasted image 20260926085524.png|363]]

> [!info] Formal State Transition of a Process
> Each process $p_j$ has a set of internal states $Q$, a subset of initial states $Q_{\text{in}} \subseteq Q$ (which may differ across processes since processes have distinct identities), and a set of possible messages $M$, where each message is a triple:
> $$\langle \text{sender}, \text{receiver}, \text{payload} \rangle$$
> The deterministic state transition function $P_j$ of process $p_j$ maps its current internal state and input buffer to a new internal state and a set of outgoing messages:
> $$P_j(q \in Q, \, \text{InBuf}_j) = (q' \in Q, \, \text{Send\_msg} \subseteq M)$$
> When process $p_j$ executes one atomic local step:
> 1. It consumes all messages currently in $\text{InBuf}_j$ and updates its internal state from $q$ to $q'$.
> 2. It appends the newly generated messages to its output buffer and clears its input buffer:
>    $$\text{OutBuf}_j \gets \text{OutBuf}_j \cup \text{Send\_msg}, \qquad \text{InBuf}_j \gets \varnothing$$

---

#### 3. Configurations, Events, and Executions

##### Configuration (Global State)
A **configuration** $C_t$ is a snapshot of the complete global state of the distributed system at step $t$. It is an $n$-tuple containing the local state, input buffer, and output buffer of every process $p_j \in \Pi$:
$$C_t[j] = (q_j, \, \text{InBuf}_j, \, \text{OutBuf}_j)$$

> **Example:**
> $$C_0 = \big\langle (q_0, \{\}, \{\}), \; (q_1, \{m\}, \{\}), \; (q_2, \{\}, \{\}) \big\rangle$$
> ![[Pasted image 20260926100143.png|525]]

---

##### Events and the Scheduler (Adversary)
An **event** is a single atomic transition that changes the system configuration. We model asynchrony through an abstract **scheduler** (or **adversary**) that chooses which **enabled event** happens next.

There are two fundamental types of events in the basic execution model:
- **$\text{Exec}(i)$:** process $p_i$ executes one atomic local step of its state machine $P_i$ (consuming $\text{InBuf}_i$ and placing any sent messages into $\text{OutBuf}_i$).
- **$\text{Del}(i, j, m)$:** message $m$ from sender $p_i$ is delivered across the link to receiver $p_j$ (moving $m$ from $\text{OutBuf}_i$ into $\text{InBuf}_j$).

![[ezgif.com-speed.gif]]

###### Enabled Events
The scheduler cannot invent messages or force arbitrary state jumps; it can only schedule an event if that event is **enabled** in the current configuration $C_t$:
- $\text{Exec}(i)$ is enabled for any non-crashed process $p_i$.
- $\text{Del}(i, j, m)$ is enabled **if and only if** message $m$ (with destination $p_j$) is currently in $\text{OutBuf}_i$.

---

##### Execution and Space-Time Diagrams

> **Execution:**
> An **execution** $\varepsilon$ describes one complete possible evolution ("story") of the distributed system over time. Formally, it is an alternating sequence of configurations and events:
> $$\varepsilon = (C_0, e_0, C_1, e_1, C_2, e_2, \dots)$$
> where $C_0$ is an initial configuration and each $C_{k+1}$ is the configuration obtained by applying enabled event $e_k$ to $C_k$.

Executions are visually represented using **space-time diagrams**:
- Each process is drawn as a horizontal timeline progressing from left to right.
- Points on a line represent local events ($\text{Exec}$).
- Directed arrows between lines represent messages ($m$) from their send step to their delivery event ($\text{Del}$).

![[Pasted image 20260926101131.png|578]]

---

##### Fairness: Limiting the Power of the Scheduler

If the scheduler had unrestricted power, it could trivially prevent any distributed algorithm from making progress simply by never scheduling a process or delaying a message forever. To rule out such degenerate schedules, we require **fair executions**:

> **Fair Execution:**
> An execution is **fair** if:
> 1. Every correct process $p_i$ executes infinitely many local steps ($\text{Exec}(i)$ occurs infinitely often).
> 2. Every message sent between correct processes is eventually delivered ($\text{Del}(i, j, m)$ eventually occurs for every sent message $m$, though we do not know when).

> [!info]- Example: Why Fairness Is Necessary
> ![[Pasted image 20260926101817.png|300]]
> Suppose $p_0$ has initial value `0`, $p_1$ has `0`, and $p_2$ has `1`. Only $p_2$ initially knows that some process holds the value `1`.
> - For $p_0$ to learn whether any process holds `1` in the topology $p_0 - p_1 - p_2$, information must travel from $p_2$ to $p_1$ and then from $p_1$ to $p_0$.
> - Without fairness, the scheduler could indefinitely delay every message from $p_2$, isolating $p_2$ forever. Fairness forces the scheduler to eventually deliver every sent message and step every live process.

---

#### 4. Local View and the Indistinguishability Theorem

##### Local View of a Process
A process $p_i$ does **not** observe the global configuration $C_t$ or the global execution $\varepsilon$. It only observes its own **local view** (or **local execution**) $\varepsilon|p_i$:
- The initial state of $p_i$ in $C_0$.
- The sequence of events in $\varepsilon$ that directly involve $p_i$ (namely $\text{Exec}(i)$ and deliveries $\text{Del}(*, i, m)$ to $p_i$).

![[Pasted image 20260926102907.png|498]]

Because $p_i$'s state transitions depend **only** on its current local state and its $\text{InBuf}_i$, two completely different global executions $\varepsilon$ and $\varepsilon'$ (for example, one where a remote process $p_k$ has crashed and one where $p_k$'s messages are simply delayed) can produce the **exact same local view** at $p_i$ up to step $t$.

---

##### The Indistinguishability Theorem

![[Pasted image 20260926103001.png|532]]

> **Indistinguishability Theorem:**
> If a process $p_i$ has the same local view in two executions $\varepsilon$ and $\varepsilon'$ ($\varepsilon|p_i = \varepsilon'|p_i$), then $p_i$ cannot distinguish $\varepsilon$ from $\varepsilon'$ and **must take the exact same sequence of actions** (reaching the same local states and sending the same messages) in both executions.

- **Why this theorem is foundational for impossibility proofs:** Whenever an adversary can construct two executions $\varepsilon$ and $\varepsilon'$ that require different global outcomes (e.g., in $\varepsilon$ peer $p_k$ is alive, whereas in $\varepsilon'$ peer $p_k$ has crashed) but yield the **exact same local view** at $p_i$, no deterministic algorithm at $p_i$ can behave differently in $\varepsilon$ and $\varepsilon'$.
