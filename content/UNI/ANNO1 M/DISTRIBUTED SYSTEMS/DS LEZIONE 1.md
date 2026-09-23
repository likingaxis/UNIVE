##### Definition of distributed systems
- Entities
- Distributed
- Common Goal

- process=machine
- with a static network

Consensus problem
a problem with more process

##### Failures definition
different manage of a failure:
- detection
- masking
- **tolerance**
	- we focus on this
	- 20:00 definition of tolerance
- recovery

##### Another problem: Asynchrony
systems without world clock

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
