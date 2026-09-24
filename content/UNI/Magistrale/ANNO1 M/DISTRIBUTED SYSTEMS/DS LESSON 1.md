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

#### DS SLIDE FILE 1
***fino a slide 25***
##### Methodology
- models
	- a set of object
- abstractions
	- what type of technology they use
- specifications
	- borg
- algorithms
	- algoritmos del deppeffozza

## Models, Abstraction and basic concepts
#### Models
##### System
- n processes in $\pi:{p0,...,p_n-1}$ with distinct identities(like an IP but we can see it like a number)
the system doesn't change during time
$$G:(\pi,E)$$ usually this graph is complete, every process(node) is connected with another using a link(edge)
- not in the algorithm exercises

(picture with the graph and the message)
###### Process(node)
A process has an upper layer with  input and output 
- the I and O are fore maybe another process or a human
- instead the process has also a rev MSG Y and a send MSG X
- connected with a link, a link has a inBuffer and an OutBuffer
in a formal way
> $$P_j ...$$

- internal states Q
- initial states Q_in subset Q
- a message M is formed by a triple `<sender,receiver,payload>`

the initial state is distinct for every process because at least they have different identities
##### Asynchronous system
- no concept of time
- any action can take an unpredictable time(!=slow) but slow is better than unpredictable
- action like a local action or send a message

###### Execution
is a story of our system
- on a computer is like a snapshot of the memory
- in a distributed system is also the sending of a message and the receives
- adversary is an entity that decides what is gonna happen in the execution
	- a scheduler that schedules events
- the input for an algorithm is also the time and not also the messages only

- execution of a local step - Exec(i): process i executes one step of its state machine

(picture from the slides)
Asynchrony is also in the local execution

Del stands for Delivery not delete
so we have 2 types of events and the time is discrete
- exec and delivery

Configuration_N stands for the state of my entire system after the event N
a configuration like the 0 is an array of n processes

>$$C_0=<(q_0,{},{}), ...$$

+ picture from the slides

- our scheduler cant create messages it follows the actual configuration

the local execution is always enabled, not depended by the configuration_N

because the time is discrete we mark only the event that happens, if nothing happens is chill

to analyse the states we use the space time diagram
image from the slides
everything happens in depending of the delay
- arrow=message m

###### Limit the power of the scheduler
fair execution
an execution is fair if every process p_i ...
- first property this means that ...01:20:00
- second property the message will be delivered but we dont know when, this happens but dont know when

Example of an Algorithm
(picture)
p_0 cannot answer if there is a process with 1
he can answer only if p_0 receive a message from p_1 that receives also a message from p_2

if the scheduler is not fair it can isolate every messages from p_2
we need fairness to give less powers to the adversary!
##### Local View or Local Execution
is a set of events that impact on this process
p2 knows about p3 until C2

picture slide (can a p answer if there is a 1 in the system?)
the local view of every process is not a part of the system is infact local
epsilon=execution

the process doesnt know nothing about the time and also the Configuration they only have the local view about what happens
(from the picture) indistinguishability theorem
we say that p_1 and p_2 cannot distinguish E from E'
