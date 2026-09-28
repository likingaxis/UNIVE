### Sync vs Asynch
- in this course we will see three definitions of synchrony
	- Asynchronous sytem
	- Eventually synchronous (module M2)
	- Synchronous System

### Process failures
- two main models
	- crash stop failure
		- what means
	- Byzantine failure
		- what means
###### Crash stop failure
(slide pic with stars)
stars=crash the teacher wont use the stars but it stops the arrow when the communication ends
- in this course we do not have crash recovery, if a process crash it wont restore
###### Byzantine failure
a process that stop following the original algorithm, and execute also the others
- it can use also the original algorithm
- maybe it can fake a send

picture with byzantine failures

suppose we have an algorithm and this one supports 1 byzantine failure

byzantine algorithm will support also a crash failure, suppose that as a byzantine failure it do nothing, is like a crash failure

Cosa è esattamente un algoritmo?

byzantine failure is a subseteq of crash stop failure
picture

when the teacher says failure we refer to crash stop failure
after the lesson about byzantine algorithm we also mean this

A process is correct if it does not experience a failure
we indicate with f the maximum number of processes that can experience a failure event in an execution
an example: m=10 f<m/2=5 
- f cannot be more than n-1 (is an example but we put a bound to f usually)
### Abstractions, PSEUDOCODE CONVENTIONS and first algorithm
#### Abstraction
- formalization of a problem or a project
1. define a system model
2. formalize a problem
3. s
4. s

- communication link
	- exposes two events 
		- requests `<Send|q,m>` sends a message m to process q
		- indication `<Deliver,p,m>` delivers m from process p
- a link has a certain probability of failure(we means the pevious failures?)
- it can duplicate message (like in tcp it sends two times the ack and the other device just use one besides it receives two copies)
- it does not invents messages

`p []-------------------[]q `

we use the concept of infinite to remove the probabilities
> property FL1(fair-loss) if a correct process p sends m infinitely often to a correct process q then q delivers m an infinite number of times

- we say that for any probability (not 1) there is always a certain number of repetition 
- is useful because when we make proofs we dont have to do probability 

>property FL2 (finte duplication) if a correct process p sends m a finite number of time to q then q cannot deliver m an infinite number of times

- we dont want to quantify so we use infinite

we have a real link, we have a link that permitt infinite things, we build an algorithm based on the link with infinite, if it works with ifninite link it works with real link

> property FL3(No creation) if some process q delivers a message m with sender p, then m was sent by p to q

(foto con il tel)

###### Properties divided in 2 properties
- safety properties
	- if this property is violated at time t it can never be satisfied after t
	- formally from the slides
- liveness properties
	- cannot be violated during the execution
	- formally a property is 
	- an example in real life (at the end of the time we all resurrect)

in FL1 FL2 FL3 there is atleast a properties of this two
FL3 is associated to safety property
- sfety property can tell u that this thing wont happen
FL1 is associated to liveness property also FL2

##### EXAMPLE OF PROPERTIES
classify if they are liveness or safety

###### Badly written properties
if process p sends a message m to q then q will eventually deliver it and this deliver is unique

###### Homeworks

#### Algorithm communication link
we want to take the FL1 FL2 FL3 and remove infinite concept
so we take something more hard to make the fair lossy link stronger and better
###### Stubborn algorithm
Ci sono delle regole non scritte che ha detto a voce (cerca di capirle: alfredo dovrebbe)

Proof:
by contradiction
Suppose that process q executing our algorithm receives message m that 
...
...
...
...
...
...
...
