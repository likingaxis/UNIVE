suppose that we have 5 acceptors in our system, and suppose that 3 of them have accepted proposal 6 with value X.
Once this has happened is it possible that any server in the cluster could accept a different value Y?

- if possible shows an execution
- if not possib le describe the rules of the algorithm that prevent such behaviour

the quorum is defined by lower n/2+1
due to the prepare phase 1 property that say a proposer first should send a request of proposing a number n to the acceptors, but the acceptors are going to answer with a nack because they are already in a quorum with the the tuple (round 6 value X)
for this exercise is important to distinguish logical time to physical time

#### PAXOS EXERCISE 2
