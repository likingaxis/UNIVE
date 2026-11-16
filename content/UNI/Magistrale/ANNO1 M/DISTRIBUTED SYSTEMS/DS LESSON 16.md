In the previous lectures we saw the consensus with synchronous and asynchronous systems
what remains is the eventually synchronous system
###### Paxos algorithm

solve consensus in an eventually system and always satisfy safety but the liveness is guaranteed when the network behaves in a good way for long enough periods of time
assumption majority of processes is correct so f<n/2 and so it uses quorum

actors in the basic paxos protocol are
proposers
acceptors
learners

failed acceptors should be < |A|/2

The consensus protocol the choose happen when every process make an agreement of the value
instead the decide we know

First idea of PAXOS Algorithm
p3 send the value to the acceptor, and then the others deny the others
>[!bug] problem of this first idea is about the number of the acceptor, if we have one it can fail

Second idea of PAXOS algorithm
increasing the number of acceptor, and the chosen one is the majority sended
 >[!bug] but the acceptor can receive all different values one from each process

Third idea of PAXOS algorithm
the acceptor can change idea, accepting multiple proposal they distinguish proposal using different round numbers, this number are sended directly by the proposer, and everyone cant send the same proposal round number to do that they can send different type of messages like even odd ecc...

>[!attention] 26:10 prof dice 67 e muore

previosuly we had "a value once is chosen", cant be changed, now we can use it with a majority rule

we can define properties 
P2: if a proposal with value v is chosen 
we can enforce this property to choose only a value
P2a right?
P2b if a proposal with value v is chosen every higher numbered proposal issued by any proposer has value v
P2c

>[!bug] the problem is that we can have more majority for different values proposed

the acceptor cant understand if a message can be send by round number 3 or 1?(55:47)

a solution can be to send the round number to the acceptor (but we dont do it also previously?)

###### Execution example
Phase 1) 
Phase 2)
what is missing by this example is the learner one

>[!quote] At this moment life is life and is it clear that we can call it a day

###### Pseudocode

##### PAXOS PROOF

(01:51:49)
