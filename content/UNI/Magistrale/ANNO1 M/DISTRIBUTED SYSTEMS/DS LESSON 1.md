#### DS SLIDE FILE 1
##### Definition of distributed systems
> Is a set of spatially separate entities, each with computational power, that can communicate and coordinate with one another to achieve a common goal
- Entities: like computers, machines, software
- Distributed: the entities are spatially separated and independent
- Common Goal: the entities communicate and coordinate, possibly sharing resources, to achieve a common objective

process=machine
We will focus on static networks of processes
- nothing changes at the infrastructure level during the execution

##### Fault tolerant Agreement
- several computer perform the same task
- some computers may fail
- the goal is to make them still reach an agreement despite failures
##### Consensus problem
formalizes the idea of agreement among multiple processes
- each process has its own value/opinion
- the process comunicate with each other
- they must eventually agree on a common decision, even in the presence of failures

![[Pasted image 20260924103257.png|533]]

Each process can have a local decision, for example: - **Commit** - **Abort** The problem is that different processes may initially have different decisions. The goal is to make all processes agree on the same final decision.

##### Failures definition
We assume that ALL computer system fail (sooner or later). it is good design practice to build robust systems.
different way a system can handle failures:
- **detection* -> notice something went wrong
- **masking** -> hide the effects of the failure 
- ***tolerance***-> continue operating despite failures
	- we focus on this
	- the system continues to work correctly as long as the number of faulty processes stay below a certain threshold (if is 1/3 it works only if 2/3 are not faulty)
- **recovery** -> restore a system after a failure

##### Another problem: Asynchrony
An asynchronous system has **no global clock**
this means that:
- processes cannot rely on a shared notion of time
- communication delays are unpredictable
- a process cannot know exactly when another process will execute or when a message will arrive
- **Unpredictable does not mean slow**
- Because of this uncertainty, it can be difficult to distinguish a failed process from a slow process
##### Main Difficulty of Distributed Systems

Distributed systems are a **fight against uncertainty** caused by:

- **Asynchrony:** execution and message delays are unpredictable
- **Failures:** processes or communication may fail
- **Local view:** each process only knows its own local information, not the complete global state

#### DS SLIDE FILE 2
***up to slide 25***
##### Methodology/ Main concepts
we have four main concepts:
- **model**
	- a set of object in the system like
		- processes, communication links, timing assumptions, failures
- **abstractions**
	- describes the high-level object or service we want to provide without implementation details
- **specifications**
	- describes which properties the abstraction must satisfy
- **algorithms**
	- the concrete distributed procedure used to implement the abstraction

## Models, Abstractions and Basic Concepts
#### Model
A model tells us what kind of distributed system we assume. But what do we mean by a system?
##### System
- n processes in $\pi:\{p0,...,p_n-1\}$ with distinct identities(like an IP but we can see it like a number)
the system doesn't change during time
$$G:(\pi,E)$$ usually this graph is complete, every process(node) is connected with another using a link(edge)
- We assume a **static system**: the set of processes and the network topology do not change during the execution.
![[Pasted image 20260926085113.png|311]]
###### Process(node)
A process is modeled as a possibility infinite-state I/O automaton
It interacts with two levels:
- Upper layer:
	- receives input X and produces output Y
	- this layer interact with another component or an external user(human)
- Link layer:
	- receives messages: "Rcv MSG y"
	- sens messages: "Send MSG X"
Each process is connected to communication links and has:
- InBuffer: contains received messages
- OutBuffer: contains messages that have been sent but not yet delivered

![[Pasted image 20260926085524.png|363]]


>[!info] in a formal way
>$$P_j(q\in Q  \ \cup \ Q_{in}, InBuf_j)=(q'\in Q, Send_{msg} \subset M)$$
>-  $P_j$ is a state transition function of process $p_j$ it takes the Input Buffer and have a current internal state
>- process $p_j$ execute a local step and produce a message to send
> 
> after this transition
> $$OutBuf_j=OutBuf_j \cup Send_msg$$
> $$InBuf_j=\varnothing$$
> 
> - $InBuf_j$ contains the messages already delivered to process $p_j$
> - When $p_j$ executes its next local step, it consumes the current contents of $InBuf_j$
> - After the step, $InBuf_j$ becomes empty.

- a set of internal states $Q$
- a set of initial states $Q_{in} ⊆ Q$
- a set of possible messages $M$

A message has the triple:
$$<sender, receiver, payload>$$

Each process can have a different initial state, because processes have distinct identities
##### Asynchronous system
- no known bound on how long actions or message deliveries take
- any action can take an unpredictable time(!=slow)
	- we can say that slow is better than unpredictable
- Examples of actions:
	- execution of a local step
	- delivery of a message

##### Execution
An execution describes the evolution of the whole distributed system over time
It can be seen as the "story" of the system
which events happen and how the global state changes after each event
is not a single event is the whole sequence of things that happen formally
is an infinite sequence that alternates configurations and events
$$(C_0,e_0,C_1,e_1,C_2,e_2,\dots)$$

###### Events
An event is one atomic step that can change the system state
We have an adversary(or scheduler) that decides which enabled event happens next
the execution model has two main types of events:
- $Exec(i)$:
	- process $p_i$ executes one local step of its state machine
- $Del(i,j,m)$:
	- message $m$ is delivered from process $p_i$ to process $p_j$ 
![[ezgif.com-speed.gif]]

Asynchrony is also in the local execution

##### Configuration
a Configuration $C_t$ represents the global state of the system at step $t$
It contains the state of every process
a configuration an array of n processes
$$
C_t[j] = (q_j, InBuf_j, OutBuf_j)
$$
it can be seen like a set of triple
>example $$
C_0 = \langle
(q_0,\{\},\{\}),
(q_1,\{m\},\{\}),
(q_2,\{\},\{\})
\rangle
$$
>![[Pasted image 20260926100143.png|525]]

- our scheduler cant create messages it follows the actual configuration


we know that an execution is a set of configurations
every configuration has an event $(e_0,e_1,e_2,\dots)$ they are individual
one single possible history of the distributed system is an execution
$$\varepsilon = (C_0,e_0,C_1,e_1,C_2,\ldots)$$



##### Enabled Events
An event can happen only if it is **enabled** in the current configuration
for example
- A local step `Exec(i)` is enabled for the process.
- A delivery `Del(i,j,m)` is enabled only if message `m`
  is currently in `OutBuf_i`.

Therefore, the scheduler cannot invent messages:
it can only choose among events that are possible in the current configuration.

##### Space-Time Diagram
Executions can also be represented using a **space-time diagram**:
- one horizontal line for each process
- time progresses along the horizontal axis
- local events happen on the process line
- arrows represent messages exchanged between processes
The exact position of events depends on delays and on the order chosen by the scheduler
- arrow=message m
![[Pasted image 20260926101131.png|578]]

###### Limit the power of the scheduler
A **fair execution** is an execution in which:
1. every process $p_i$ executes infinitely many local steps
2. every sent message is eventually delivered (the message will be delivered, but we don't know when)

This means that the scheduler cannot indefinitely stop a process
and cannot delay a sent message forever

>[!info]- Example of an Algorithm
> ![[Pasted image 20260926101817.png|300]]
> $p_0$ has value 0
> $p_1$ has value 0
> $p_2$ has value 1
> only $p_2$ knows that there exists a process with value `1`
> to let $p_0$ "answer is there some process with value 1?"
> the information must travel from $p_2$ to $p_1$ and after that to $p_0$
> 
> The scheduler does not "want" to block the algorithm.
> It models every possible ordering and delay of events.
> if the scheduler is not fair it can isolate every messages from p_2
> we need fairness to give less powers to the adversary!

##### Local View or Local Execution
The **local view** of a process is the subsequence of events in the global execution that affect that process
So a process does not see the entire execution of the system

This means that two different global executions may look identical to a process.

If process $p_i$ has the same local view in executions $E$ and $E'$,
then $p_i$ cannot distinguish $E$ from $E'$
![[Pasted image 20260926102907.png|498]]
the process doesn't know nothing about the time and also the Configuration they only have the local view about what happens

so we have the
###### Indistinguishability Theorem
![[Pasted image 20260926103001.png|532]]
