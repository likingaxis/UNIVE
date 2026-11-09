
#### Binary consensus definition
recap of what is consensus
every process propose a value in his local view
at the end the processes have to decide the same value
##### Consensus in synchronous systems algorithms
the specification contains 4 properties 2 events maybe because we need atleast it
C4 why only two?
Run examples:
in the consensus primitive we dont have process that decide majority

the run 3 assume that this execution stays here forever
the validity also assume non triviality, because without it we can return 0 every time and mantains the property correct
the validity property forces that if every process propose 1 everyone has to decide 1
we can decide a value of a process that is not correct

we dont need a correct process if it decide a number that is not proposed

###### How can we implement this?
using like a leader election, but with failure detector so if a leader crash we can change it to another one
we call this action round, like a change of phase that changes the leader
we have a problem of the new election because we can may have a new leader that decide locally a different value but some process can see the previous leader message

the solution is that you have an opinion that can be changed by new leader
but when you can finally decide?
leader election: number of round=id of the process
i decide when the process increase the round as the same id 
you can go to round n if n crashed or n decided the value (see slide with hierarchical consensus)

(psuedocode from the slides)
N is the number of round but also the number of processes?
rank(self) is the id of the process

how will round increment works?
i think with $delivered[r]$
if someone crash detected rounds is the variable that take count of this event

we cant know something about the previous process round state?
###### Correctness
we want to proof the four properties
- you cant decide twice so integrity is correct by construction, handler trigger once
- validity we can change proposal only in two part of the code, in the first one, by construction, in the second one, it means that we decide something, but this means that some process propose it, in the first code or we are the one that propose it
	- we can go back until the first process, so the values are all proposed and not invented recursively
- termination, by induction on the process id
	- base case id=1 it will trigger the handler of decide if it will not crash
	- inductive hypothesis id=k-1 a process can decide and terminate or crash
	- same for k
- agreement, every process has to receive the message from process x, every process switch the idea to this one, once every process that reach x+1 have the proposal of process x, the correct process with minimum id...(59:50)

###### Complexity
m square messages
time complexity is n
#### Uniform consensus
in the uniform hierarchical consensus we can have a process that crash and decide differently
we can make sure that every process has the same proposed value before deciding it with the ack
we see it in the next lecture