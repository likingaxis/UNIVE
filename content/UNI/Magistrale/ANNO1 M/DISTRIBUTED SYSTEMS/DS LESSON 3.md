### TIME IN DISTRIBUTED SYSTEMS
we have already seen asynchronous and synchronous systems
short explaining of synch and asynch
we also have eventually synchronous system 
- there is a time, unknown to us after which the system will be synchronous

if you create an asynchronous algorithm it will work everywhere -> models everything
in synchronous almost everything is possible -> models only restricted networks

real systems are asynchronous most of the time ex: ping to google.com
- with the roundtrip time we have a solid 43 ms but we can have a spike to 739 ms
we have to formalise most of the time or the algorithm will have problems
- how can we create a system that works also when we have a spike
##### Eventually synchronous system
(picture on the slides)
there is a stabilization time T when the system will be synchronous forever
- also the engineers dont know when?
55:00
- an algorithm dont know if we are in an async or sync situation
starvation

Definition: there is a time t unknown to us after which the system is synchronous and will be synchronous forever
- after a threshold the algorithm asynchronous


Relationship between executions
Async eventual sync and sync picture

sync subseteq eventually synchronous subseteq async
- evenually synchronous with t=0 is synchronous

if we are building A with synchronous system it will works only for sync A for sync and eventuall sync and if we build an algorithm for asynchronous it will works also in synchronous and eventual sync
picture with sets

##### why we need cock
Total order of events
- how do we measure time? with cock

How a cock works in our device?
we have a crystal of quartz in certain frequency it creates sparks, with stable times
H_i(t)=integral from 0 to t h_i(tao)dtao

C_i(t)=alfaH_i(t)+Beta

if we have uncosistency we use the alfa parameter to slow or speed up the clock
to synchronyze time we have to use Beta

Two concepts:
- Skew difference in time between two software clocks
Skew_{i,j}=|C_i(t)-C_j(t)|
- once we communicate and fix the skew is done
Drift rate
a clock is perfect if 1 hour of the real time will be equal to 1 hour of harware time
- if i do the ratio of 1 hour of real time and 1 hour of hardware time i get a ratio 1
1 hour of real life hardware hour says 2 this is a fast clock
slow clock peffoz

we can be unlucky and we can have a clock that is slow or is fast
- in real life clock are not always fast and not always slow

temperature changes the oscillation of the quartz
graph in the slides

we say that a clock is correct if it drift rate has an upper bound and a lower bound in the perfect clock(threshold)
1-p<=dHt/dt<=1+p

