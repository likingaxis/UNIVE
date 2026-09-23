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
