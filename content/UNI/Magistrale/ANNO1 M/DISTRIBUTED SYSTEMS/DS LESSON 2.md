### Synchronous vs Asynchronous
- in this course we will see three definitions of synchrony
	- Asynchronous system
		- there is no known fixed upper bound on message delays or on the time required for processes to execute their steps
	- Eventually synchronous (module M2)
	- Synchronous System
		- where the delay of messages are bounded
		- you have a bound on the delay of every message  (ex: after 5 clock the message is delivered)
		- so a System is synchronous if there is a fixed bound on the delay of messages
			- this doesn't mean faster or slower
### Models for process failures
A failure model is a set of assumptions describing how a process is allowed to fail
- two main models
	- ***crash stop failure***
		- after $Crash(p_j)$ process $p_j$ stops executing local steps permanently
	- ***Byzantine failure***
		- after $Byz(p_j)$ process $p_j$ may behave arbitrarily, it no longer has to follow its original algorithm
Model of failures are orthogonal to sync and async concepts
###### Crash stop failure in a space time diagram
![[Pasted image 20260930102851.png|401]]
stars=crash the teacher wont use the stars but it stops the arrow when the communication ends
- in this course we do not have crash recovery, if a process crash it wont restore
###### Byzantine failure in a space time diagram
![[Pasted image 20260930102930.png|441]]
- it can use also the original algorithm
- maybe it can fake a send

Byzantine failure is worst than crash stop
- because crash stop follow the protocol until it crashes, but byzantine should not
byzantine algorithm will support also a crash failure, suppose that as a byzantine failure it do nothing, is like a crash failure
![[Pasted image 20260930103732.png|452]]

##### $\text{Crash-stop failures} \subseteq \text{Byzantine failures}$
![[Pasted image 20260930104113.png|282]]

>[!info] when the teacher says failure we refer to crash stop failure after the lesson about byzantine algorithm we also mean this

##### Correct process
A process is correct if it does not experience a failure
we indicate with f the maximum number of processes that can experience a failure event in an execution
an example: $m=10  \ \ f<m/2=5$ 
- we know that almost 5 process can fail, but we dont know which one
- f cannot be more than n-1 (is an example but we put a bound to f usually)
- we never do assumptions on when a failure event happens
	- we try to mention the worst scenario



##### Homework 1
![[Pasted image 20260930115239.png|549]]

###### Answer 1
like a delivery event $Del(1,3,m)$ 
- source, destination, message
i can formalize like
$LM(p_1,m)$ 
$Outp_1=Outp_1{\backslash}{m}$
so we remove from the output buffer the message
![[Pasted image 20260930115947.png|283]]


### Abstractions, PSEUDOCODE CONVENTIONS and first algorithm
#### Abstraction
Is a formal description of a problem or system component that specifies what it should do, without specify how is implemented
Steps to formalize an abstraction
1. define a system model
2. formalize a problem -> design an abstraction formal object that captures the problem that you want to solve, unambiguously properties have to be specified
3. implements the abstraction with a distributed protocol
4. prove that the protocol implements the abstraction
###### Abstracting a real communication Link
- communication link
	- loses messages with a certain probability pr
	- the channel can duplicate a message a finite number of times (like TCP)
		- not necessarily the sender intentionally resending
	- the link does not create a message

How can we formalize this things? ->
- the interface of a link exposes two events 
	- requests: `<Send|q,m>` sends a message m to process q
	- indication: `<Deliver,p,m>` delivers m from process p

![[Pasted image 20260930121002.png|334]]

we want to define formal properties of a communication links
but first  we use the concept of infinite to remove the probabilities
We use an idealized infinite-execution model to reason about the guarantees of the link without explicitly modeling probabilities
- is useful because when we make proofs we dont have to do probability 
- we say that for any probability (not 1) there is always a certain number of repetition 

> property FL1(fair-loss) if a correct process p sends m infinitely often to a correct process q then q delivers m an infinite number of times


>property FL2 (finite duplication) if a correct process p sends m a finite number of time to q then q cannot deliver m an infinite number of times
- you cannot duplicate a message infinite times

> property FL3(No creation) if some process q delivers a message m with sender p, then m was sent by p to q

weak means that our property is minimal
an abstraction is represented like
![[Pasted image 20260930122816.png|385]]


##### two categories of properties
- ***safety properties***
	- if this property is violated at time t it can never be satisfied after t
formally:
> if a safety property is violated in execution $E$, there is a prefix $E'$ of $E$ such that any extension of $E'$ also violates the property


- ***liveness properties***
	- cannot be violated in finite executions
	- specify that something good will happen
formally:
> given a finite execution $E$ that does not satisfy a liveness property there is an extension of $E$ that satisfy it

- an example in real life (at the end of the time we all resurrect)

they are not only for the FL properties but we can use it for examples

FL1 is a liveness property
FL2 is a liveness property
FL3 is a safety property


if FL2 is in at most property it is safety
![[Pasted image 20260930124100.png|375]]

##### EXAMPLE OF PROPERTIES
classify if they are liveness or safety
![[Pasted image 20260930124123.png|443]]

- safety
- liveness
- liveness

###### Badly written properties
if you mix two aspects you will write a badly property
example:
- if process p sends a message m to q then q will eventually deliver it and this deliver is unique
the two aspects:
- `q will eventually deliver it` -> liveness
- `the deliver i unique` -> safety

it should be decomposed in two properties:
- If p sends a message m to q, then q eventually delivers it
- If p sends a message m to q, then m is delivered at most once

###### Homeworks
![[Pasted image 20260930124523.png|535]]

#### Algorithms: communication link
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
