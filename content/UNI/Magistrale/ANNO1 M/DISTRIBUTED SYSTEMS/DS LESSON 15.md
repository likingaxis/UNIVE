The professor start with the algoritm in slide 29
regards the uniform hierarchical consensus the professor said that you can remove the ack but i dont know what he intended maybe you should listen to the lesson record start
once you receive the ack from everyone...

message complexity of this algorithm
the complexity if we have failures is O(f*n) and O(f)
f+1 round is the best you can do

##### What happens you substitute reliable broadcast with beb
this means that the 5 properties we defined in the previous lesson can fail
motivate why the first 4 properties cannot be violated
the fifth termination does

###### Exercise and we can call it a break

(38:00)

###### Consesus in synchronous systems lower bound on time
a synchrionous round ensure us that the message will be sended to everyone and use the clock
we can mesure the complexity of an algorithm with new rounds
if the source fails in the end of the round is possible that not all the process receives the message
###### Full information protocol
if at every round a process take his memory and sends it to everyone
i didnt understand the statement of the professor that say if a process reach round 3 the other one cannot be in a next round?
Round 1:
- what we can send is everyone value
Round 2:
- if there is no failure every process receive all the values, know everything else
- we can for example decide the minimum (as a rule that can be used by everyone to decide what value can be picked)
- suppose process 3 fails, is it possible that it sends a message to p2 and then fails
	- we have p1 {0,1} p2 {0,1} p3 crashed
	- you can use a number of round as the failed one?
	- k=f+2 on slide 44
- the previous algorithm uses n rounds but now we can use less than f+1
- 1:02 i farted
###### What happens to consensus in the remaining system we didnt study yet?
asynchronus: if f>0 it is unsolvale in such system in a deterministic way


theorem if f>=n/2 then consesus is unsolvable in such system we only want to prove this not f>0 i think

i lost again concentration 1:20
