Definition of Register

register operations:
- read
- write

every operation is characterized by two events:
- invocation
- return
	- confirmation for the write completed
	- a value for the read operation
a start of an operation is atomic
this means that it cannot be interrupted or divided
an operation instead is not atomic

a register sores only positive integers and it is initialized to 0 or bottom symbol
you cannot start writing on x and in the same tipe you cant read on x
- we can write and read in two different register like writing on x and reading on x1
a failed operation is an operation that crashes
example on slides
an operation that crashes is concurrent to an operation that starts 
- we imagine a failure like the operation belongs to infinity

Register semantics
the easiest semantic is the strictly serialised semantic
- liveness
- safety
you can implement it but is hard because you have to lock the other process during an operation, (in eventually synchronous systems you cannot handle access exclusion?14:30)
concurrency semantic of the register
- several processes can access the register
- concurrent access
- no failures
we do operations like write 5 and write 8 after that we do read, what value it reads? we dont know
register semantic for failures


our goal is define a set of useful semantics ...


linearizability is the strongest one semantic (what is a semantic? maybe is from the previous lessons)


Fail Stop
register notation
(x,y)- reg mens that this register can be written by x processes and rode by y processes
(1,1)- reg 1 process write and 1 process read
(1,n)- reg 1 can write and n can read
(n,n) etc...
a register (1,1) is fixed to 1 writer and 1 reader

regular register
Termination if a correct process invokes an operation then the operation eventually...
validity ...

(28:00)
why i read 6 and during write 6 read 5?
the read is like a pop?

if a process crashes while writing 8 the raed operation can return 5 or 8

regular register interface
the write of the register here works that every process overwrite the register value
in this example with (1,N) only p0 can write?

a write operation terminate when all processes finish to send an ack
(35:00) the teacher explains the algorithm but it is not clear

number of messages 2n 
how many messages 0
how many failures we can tollerate? 

what happens if you cancel writeset:=0 near the latest lines in the right
step complexity for write operation? 2 unit
how many step for read? 0

proof of the correctness

we cannot write 5 and after read bottom on the same process (51:00 say that right?)

read one write all regular register
regular register discussion

fail silent variant
majority voting regular register
i've lost in this second part of the lesson
majority voting


