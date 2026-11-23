#### Proof of paxos
we want to prove 3 properties
1. only a value proposed can be chosen (validity)
2. a single value is chosen
3. only a chosen value is learned by learners


for the induction proof the professor create a table with i=8
in the columns we have k ... i-2 i-1 r=i in the rows we have A1 A2 A3 A4 
(photo reference for you when have to explain me it)
![[JPEG_20261123_163842_754414922966226150.jpg|500]]

Deliberate practice

#### Introduction on total order broadcast
the example of replicas represent problem of replicas
is a broadcast primitive 
property for total order broadcast
Uniform agreement
if a process TODelivers a message m then all correct processes will eventually TODeliver m
Non Uniform agreement
if a correct process TODelivers a message m then all correct processes will eventually TODeliver

Specification of the primitive TotalOrderBroadcast
the TOB4 is not the uniform agreement is the weak one
even if TOB5 is specified for a couple of a message it works also for a sequence of messages

cool image of how it is implemented
TOB with consensus 

pseudocode of it
