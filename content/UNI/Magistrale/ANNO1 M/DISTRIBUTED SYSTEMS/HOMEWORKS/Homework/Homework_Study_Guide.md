# Distributed Systems Homework Study Guide

## 1. Modeling message loss as an event

### Model the loss of a message

H01 · `DS-2425-02-Models.pdf` · PDF p. 35

Model the loss of a message as an event.

## 2. Classifying and constructing safety and liveness properties

### Safety or liveness?

H02 · `DS-2627-02-Models-reviewed (1).pdf` · PDF p. 56

Classify the following as safety or liveness.

- Fairness of an execution.
- **At most-f failures.** An execution E can contain at most f failures.
- **Eventual recovery.** If a process p experiences a crash(p), then it eventually experiences a recovery(p). This event starts process p again.
- **Time-bounded recovery.** If a process p experiences a recovery(p), then this recovery happens at most k events after its failure.

Write three new safety properties and three new liveness properties.

## 3. Implication between recovery properties

### Recovery implication

H04 · `DS-2627-02-Models-reviewed (1).pdf` · PDF p. 56

Does Time-bounded recovery imply Eventual recovery? Use the definitions in the preceding item on the same page.

## 4. Rewriting a compound specification

### Comparable output sets

H06 · `DS-2627-02-Models-reviewed (1).pdf` · PDF p. 56

How would you improve the writing of this property?

> If a process p outputs a set of integer O_p, then any other process q outputs also outputs a set O_q. For any two processes z and t we have either O_z is a subset of O_t or that O_t is a subset of O_z.

## 5. Adapting fairness to crash failures

### Fairness and failed processes

H08 · `DS-2425-02-Models.pdf` · PDF p. 89

We have seen that the fairness property requires a process to be scheduled forever, so if a process crashes the execution is not fair. The reason is that a failed process will never be scheduled again for execution. How is this consistent with the definition of fairness?

## 6. Counterexamples for strengthened delivery guarantees

### HOMEWORKS 1 — strengthened stubborn delivery

H09 · `DS-2627-02-Models-reviewed (1).pdf` · PDF p. 74

Show that our stubborn algorithm does not work if we change the first property to the following.

> **SL1 (Stubborn-delivery).** If a process p sends m to q, then q delivers m an infinite number of times. {Pay attention something is missing}.

Show that there is no algorithm that satisfies the property above using a fair-lossy link.

### Variation — PL1 with process crashes

H11 · `DS-2627-02-Models-reviewed (1).pdf` · PDF p. 78

In a system with crash failures, is there something wrong with this formulation of reliable delivery? “If a correct process p sends m to q, then q eventually delivers m.”

## 7. Implementing a perfect link with bounded memory

### HOMEWORKS 1 — fixed memory

H13 · `DS-2627-02-Models-reviewed (1).pdf` · PDF p. 74 · ★

Suppose you can use only a fixed amount k of memory (see it as having the possibility to store at most k different messages), could you implement a Perfect p2p link on a fair-lossy?

## 8. Stubborn delivery without a timer or an infinite loop

### HOMEWORKS 2 — Caio’s algorithm

H15 · `DS-2627-02-Models-reviewed (1).pdf` · PDF p. 81

One of your friends, Caio, is really excited about its new discovery. Caio claims to have implemented a stubborn over a fair-lossy without the need of any internal timer or infinite loop. It shows you this algorithm:

```text
upon event INIT
    set = ∅
upon event SL, SEND(⟨m, q⟩)
    set = set ∪ {⟨m, q⟩}
    for all ⟨x, y⟩ ∈ set do
        invoke fl Send(⟨x, y⟩)
upon event FL, DELIVER(⟨m, q⟩)
    invoke sl Deliver(⟨m, q⟩)
```

What is wrong with his algorithm? In which executions does it work? Could you find an argument that convinces Caio on the impossibility of implementing a stubborn (and thus a perfect link) over a fair-lossy without using a timer or an infinite loop? (Note that an infinite loop is actually a timer.)

## 9. Diagnosing a counting server over perfect links

### Counting server

H17 · `DS-2627-02-Models-reviewed (1).pdf` · PDF p. 92

You built a COUNTING SERVER that communicates with you using our Perfect-p2p algorithm over a stubborn link. The server stores a variable v (initially equal to 0) and it exposes three operations:

- INC increases v by 1.
- DEC decreases v by 1.
- GET invokes `⟨pl, Send | v, client⟩` (client is your name as a process).

The server executes an operation when it delivers the corresponding message. For example, the increase happens when the server sees the event `⟨pl, Deliver | INC, client⟩`.

You act as a client and invoke exactly three operations in the following order: `⟨pl, Send | INC, server⟩`, `⟨pl, Send | INC, server⟩`, `⟨pl, Send | GET, server⟩`. After a while you see `⟨pl, Deliver | 1, server⟩`. You ask again with `⟨pl, Send | GET, server⟩` and are still waiting for an answer.

What is happening? Is there any way to fix it? Find both possible explanations. (Hint: how much will you wait for an answer?)

## 10. Bounded delivery over fair-lossy links

### Timed delivery for surviving messages

H19 · `DS-2526-03-Time1.pdf` · PDF p. 61

You are on a synchronous system and you have a fair-lossy channel with the following additional property.

> **Timed delivery.** If p sends a message m to q at time t, and m is not lost, then q delivers m at time at most t+1.

Using such a channel, could you create a stronger version of perfect point-to-point that gives you a bound on the delivery time?

## 11. Analyzing clock synchronization

### Cristian’s algorithm — compare timing patterns

H21 · `DS-2526-03-Time1.pdf` · PDF p. 60

Which of the following patterns is bad for Cristian’s algorithm? Use the two request–reply diagrams on this page.

Algorithm and accuracy in the same PDF, pp. 42–46.

## 12. Reviewing neighbor averaging on an arbitrary graph

### Fully distributed synchronisation

H23 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 85

You have to peer review a synchronisation algorithm for arbitrary graphs. The main meat of the algorithm is as follows:

- You take the clocks of all your neighbours.
- You compute the average, and set your clock to its value.

Is there something wrong with this strategy?

## 13. Computing vector clocks from an execution

### Apply vector clocks

H24 · `DS-2425Time2.pdf` · PDF p. 44

Apply a vector clock to each event and then identify false statements among the following:

- e₁ → e₂
- e₁ → e₃
- e₂ → e₃

Use the four-process execution diagram on the exercise page.

## 14. Reconstructing an execution from vector timestamps

### Q3.1–Q3.2 — infer an execution from two observations

H26 · `DS-2425Time2.pdf` · PDF p. 47

Consider an asynchronous message-passing system that uses vector clocks to implement a causal consistency check. There are four processes with IDs 1 to 4. The vector clock positions are (p₁, p₂, p₃, p₄). Vector clocks are updated by increasing before send. Processes communicate by point-to-point links. You start debugging process p₁ in the middle of the execution and see the following traffic at its Ethernet card:

- **00:00, exiting.** Send Message [MSG CONTENT], vector clock (1, 0, 0, 0).
- **00:05, entering.** Received Message [MSG CONTENT], vector clock (1, 2, 3, 1).

**Q3.1** Draw an execution that justifies the vector clocks you are seeing. Is such an execution unique?

**Q3.2** Does there exist an execution that justifies the vector clocks and where at least one process does not send any message? Justify your answer.

## 15. Designing vector clocks with unknown membership

### Vector clocks with initially unknown IDs

H27 · `DS-2425Time2.pdf` · PDF p. 65

In the vector clock we are assuming that each process knows the number, and the IDs of all the other. Assuming that you do not know how many processes are in the system and initially you do not know the id of all the others. Assuming that everyone has an unique ID (no two processes have the same ID). can you implement something that is similar to a vector clock? Could you write the code? What is the peculiarity of these special vector clocks associated with two events that are concurrent?

## 16. Checking Lamport mutual exclusion with non-FIFO links

### Lamport’s algorithm without FIFO

H29 · `DS-2425Time2.pdf` · PDF p. 66

Suppose we run Lamport’s Mutual Exclusion (ME) algorithm in a system where links are not FIFO. For each property of Lamport’s ME algorithm, discuss whether it is violated. If a property is violated, provide an execution example, including a detailed space-time diagram and comments on the internal state of each process, that demonstrates the violation. If a property is not violated, explain why it remains intact.

Properties, assumptions, and pseudocode in the same PDF, pp. 51–53.

## 17. Choosing timing bounds for heartbeat failure detectors

### Minimum round duration

H30 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 29

Minimum T for round-based P?

Use Algorithm 3, its synchronizer clock, global clock skew δ, and the link-delay assumptions in the same PDF, pp. 23–26.

## 18. Designing adaptive timeouts for an eventually perfect detector

### Increase and decrease the timeout

H32 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 77 · ★

Suppose to be in a synchronous system with an unknown maximum channel delay. You want to create an eventually perfect P. What is a good strategy to increase, and decrease the internal timeout in such a way to:

1. Stabilise to perfect P in the fastest way.
2. Have a minimum latency when suspecting an actual crash.

## 19. Comparing solvability across system models

### Synchronous versus fail-stop

H34 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 78

Describe two problems that can be solved in sync but not in fail-stop. Describe one problem that can be solved in fail-stop but not in sync.

## 20. Designing fault-tolerant mutual exclusion with leader changes

### Fault-tolerant mutual exclusion — code and proofs

H36 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 77

Write code and proofs of the Fault Tolerant ME algorithm explained before.

Use the algorithm description in the same PDF, pp. 75–76.

## 21. Assessing whether fault-tolerant mutual exclusion is possible

### Fault-tolerant mutual exclusion in fail-silent and fail-noisy models

H38 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 80

Do you think that is possible to solve fault-tolerant mutual exclusion in a fail-silent system? (Write your considerations, they do not have to be a formal proof)

Do you think that is possible to solve fault-tolerant mutual exclusion in a fail-noisy system? (Write your considerations, they do not have to be a formal proof)

## 22. Checking safety and liveness under failure-detector violations

### Exercise 2.8 — safety with a faulty detector

H40 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 81

Suppose an algorithm A implements a distributed programming abstraction M using a failure detector D that is assumed to be eventually perfect. Can A violate a safety property of M if D is not eventually perfect, for example, when D permanently outputs the empty set?

### Variation — Main Book Exercise 2.9 — construct a liveness counterexample

H42 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 77

Specify a distributed programming abstraction M and an algorithm A implementing M using a failure detector D that is supposed to satisfy a set of properties, such that the liveness of M is violated if D does not satisfy its properties.

Assigned on p. 77. The statement is in the PDF text layer on p. 81 and is covered in the rendered slide.

### Variation — Exercise 3.5 — All-Ack Uniform Reliable Broadcast

H44 · `DS-1920-07-Broadcast.pdf` · PDF p. 57

Consider the “All-Ack Uniform Reliable Broadcast” algorithm (Algorithm 3.4). What happens if the strong accuracy property of the perfect failure detector is violated? What if its strong completeness property is violated?

Analyze each failure of the detector separately using the pseudocode on the exercise page.

### Variation — Lazy Reliable Broadcast — use ◇P instead of P

H45 · `DS-1920-07-Broadcast.pdf` · PDF p. 25

What happens if we use ◇P (eventually perfect failure detector) in place of P?

Use Algorithm 3.2 in the same PDF, p. 12.

## 23. Leader election with heterogeneous link guarantees

### Exercise 4 — mixed channels and crash restrictions

H46 · `DS-2324Ordered_communications_1_NOSOLUTION.pdf` · PDF p. 47

Let channel A and channel B be two different types of point-to-point channels satisfying the following properties:

- **Channel A.** If a correct process pᵢ sends a message m to a correct process pⱼ at time t, then m is delivered by pⱼ by time t+x.
- **Channel B.** If a correct process pᵢ sends a message m to a correct process pⱼ at time t, then m is delivered by pⱼ with probability p₍cons₎, where p₍cons₎ < 1.

Consider the three systems of four processes p₁, p₂, p₃ and p₄ connected through channels A and B in the figure. Assume each process pᵢ is aware of the type of channel connecting it to any other process.

1. Is it possible to design an algorithm implementing a leader election primitive in system 1 if any process can fail by crash?
2. Is it possible to design an algorithm implementing a leader election primitive in system 2 if only processes having an outgoing channel of type B can fail by crash?
3. Is it possible to design an algorithm implementing a leader election primitive in system 2 if any process can fail by crash?
4. Is it possible to design an algorithm implementing a leader election primitive in system 3?

For each point, if an algorithm exists write its pseudocode, otherwise show the impossibility.

Use all three channel-topology diagrams on the exercise page.

## 24. Checking quorum thresholds in uniform reliable broadcast

### Majority-Ack with |F| = n/2 + 1

H47 · `DS-1920-07-Broadcast.pdf` · PDF p. 41

If |P| = n and |F| = n/2 + 1, does this algorithm work? The slide gives Algorithm 3.5 with `candeliver(m)` returning `#(ack[m]) > |F|`.

The homework uses the threshold printed on p. 41. Use Algorithm 3.4 on p. 57 for the shared pseudocode.

## 25. Reducing Lazy Reliable Broadcast message cost

### Variation of Exercise 3.2 — Lazy RB message cost

H48 · `DS-1920-07-Broadcast.pdf` · PDF pp. 50–51, 56

Modify the “Lazy Reliable Broadcast” algorithm (Algorithm 3.2) to reduce the number of messages sent in case of k failures (with k < n) to k*n (written as O(k*n) on p. 51).

**Cost analysis (p. 56).** There are at most k leaders. Why? To do alone: write the pseudocode.

Starting execution diagram on p. 50. Original Algorithm 3.2 on p. 12. Further diagrams on pp. 52–55.

## 26. Implementing reliable broadcast on a line

### Reliable Broadcast with a neighbor oracle

H50 · `DS-2324Ordered_communications_1_NOSOLUTION.pdf` · PDF pp. 45–46

Consider a distributed system composed of n processes {p₁, p₂, …, pₙ} that communicate by exchanging messages on a line topology. Processes p₁ and pₙ are respectively the first and the last process of the network.

Initially each process knows only its left and right neighbours, if they exist, and stores their identifiers in local variables LEFT and RIGHT. Processes may fail by crashing. A perfect oracle notifies each process of its new neighbour when one of its two neighbours fails:

- `Left_neighbour(pₓ)` means pₓ is the new left neighbour of pᵢ.
- `Right_neighbour(pₓ)` means pₓ is the new right neighbour of pᵢ.

Both events may return NULL if pᵢ becomes the first or the last process of the line. Each process can communicate only with its neighbours.

Implement Regular Reliable Broadcast as shown on p. 46 using the Neighbour Oracle and Perfect Point-to-Point Links. You cannot use P or LE.

The interfaces and permitted abstractions are shown in the block diagram on p. 46.

## 27. Enumerating or completing FIFO, causal, and total delivery histories

### Combined total, causal, and FIFO delivery orders

H51 · `DS-2324Ordered_communications_1_NOSOLUTION.pdf` · PDF p. 38

1. Provide the list of all the possible delivery sequences that satisfy both Total Order and Causal Order.
2. Complete the history (by adding the missing delivery events) in order to satisfy Total Order but not Causal Order.
3. Complete the history (by adding the missing delivery events) in order to satisfy FIFO Order but not Causal Order nor Total Order.

Use the four-process broadcast/delivery diagram on p. 38, including the crash on P3.

### Variation — Causal enumeration and a FIFO counterexample

H52 · `DS-2324Ordered_communications_1_NOSOLUTION.pdf` · PDF p. 37

Using the three-process diagram, provide all the possible sequences satisfying Causal Order. Complete the execution to satisfy FIFO order but not causal order.

### Variation — Causal order only

H54 · `DS-2324Ordered_communications_1_NOSOLUTION.pdf` · PDF p. 36

Provide all the delivery sequences such that causal order is satisfied. Use the three-process diagram on this page.

### Variation — Causal order after instant t

H55 · `DS-Distributed_registers.pdf` · PDF p. 92

Provide all the delivery sequences after instant t such that causal order is satisfied. Use the marked instant t and the broadcast/delivery diagram on this page.

## 28. Comparing causal delivery specifications

### Exercise 3.11 — two causal delivery definitions

H56 · `DS-2324Ordered_communications_1_NOSOLUTION.pdf` · PDF p. 39

Compare the causal delivery property of Module 3.9 with the following property: “If a process delivers messages m₁ and m₂, and m₁ → m₂, then the process must deliver m₁ before m₂.”

**CRB5 (Causal delivery).** For any message m₁ that potentially caused a message m₂, i.e., m₁ → m₂, no process delivers m₂ unless it has already delivered m₁.

## 29. Separating causal delivery from reliable-broadcast agreement

### Exercise 3.12 — causal best-effort broadcast

H57 · `DS-2324Ordered_communications_1_NOSOLUTION.pdf` · PDF p. 41

Can we devise a best-effort broadcast algorithm that satisfies the causal delivery property without being a causal broadcast algorithm, i.e., without satisfying the agreement property of a reliable broadcast?

Use CRB5 on the same page: for any m₁ → m₂, no process delivers m₂ unless it has already delivered m₁.

The follow-up diagrams on pp. 42–44 show a sender crash and ask what happens if p₂ does not generate any more messages.

## 30. Testing changes to hierarchical consensus

### Hierarchical Uniform Consensus — BEB in place of RB

H58 · `DS-1920-Consensus.pdf` · PDF p. 35

What happens if we use Beb instead of Rb?

Use the pseudocode on this page. The replacement concerns dissemination of the DECIDED message, which the algorithm broadcasts and delivers through RB.

### Variation — Hierarchical Consensus — remove a rank guard

H59 · `DS-1920-Consensus.pdf` · PDF p. 33

What happens if we remove the highlighted condition `r > proposer` from the DECIDED-message handler of Algorithm 5.2?

Use the pseudocode and circled guard on p. 33.

## 31. Finding legal reads in regular and atomic registers

### Regular and atomic register reads — multiple writers

H60 · `DS-Distributed_registers.pdf` · PDF p. 89

Consider the execution depicted in the following figure and answer the questions.

1. Define ALL the values that can be returned by read operations (Rx) assuming the run refers to a regular register.
2. Define ALL the values that can be returned by read operations (Rx) assuming the run refers to an atomic register.

Use the P1–P4 execution on the exercise page, including the crash during P3’s write.

### Variation — Regular and atomic register reads — single writer

H61 · `DS-Distributed_registers.pdf` · PDF p. 85

Answer the same two questions using the different execution on p. 85. All writes now belong to P1. Use the diagram, including the crash during P1’s third write.

## 32. Designing an efficient single-reader atomic register

### Exercise 4.7 — efficient (1,1) atomic register

H63 · `DS-1819-10-Distributed_registers 2.pdf` · PDF p. 61

Give an algorithm that implements a (1,1) atomic register in the fail-silent model and that is more efficient than the “Read-Impose Write-Majority” algorithm (Algorithm 4.6–4.7, which implements a (1,N) atomic register in the fail-silent model).

### Variation — Exercise 4.7 follow-up — write to the only reader

H64 · `DS-1819-10-Distributed_registers 2.pdf` · PDF p. 63

Why not use the illustrated pattern where each write sends to the only reader P1 and waits for its acknowledgement? Each write is two messages in the illustrated pattern.

Use the point-to-point send and ACK diagram on p. 63.

## 33. Justifying request identifiers in register protocols

### Exercise 4.6 — request identifiers and acknowledgements

H65 · `DS-1819-10-Distributed_registers 2.pdf` · PDF p. 64

Explain why the request identifier included in WRITE, ACK, READ, and VALUE messages of the “Majority Voting” algorithm (Algorithm 4.2) can be omitted in the “Read-One Write-All” algorithm (Algorithm 4.1).

Algorithm excerpts in the same PDF, pp. 64–65.

## 34. Implementing multiwriter atomic registers across failure models

### (N,N) atomic registers on message passing

H66 · `DS-1819-10-Distributed_registers 2.pdf` · PDF p. 58

Is it possible to implement (N,N)-AR on message passing using P?

Is it possible to implement (N,N)-AR on fail-silent assuming majority of correct processes?

## 35. Simulating message passing with atomic registers

### Message passing using (1,1) registers

H67 · `DS-1819-10-Distributed_registers 2.pdf` · PDF p. 59

Could you show how to simulate message passing using (1,1)-atomic registers?

Use the five-process communication diagram on p. 59.

## Textbook homework references

The slides give the exercise numbers and book pages.

- Main Book Exercise 2.4 (book p. 67) — H68 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 77; H69 · `DS-Failure_detection_leader_election (1).pdf` · PDF p. 75.
- Main Book Exercise 2.6 (book p. 67) — H70 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 77; H71 · `DS-Failure_detection_leader_election (1).pdf` · PDF p. 75.
- Main Book Exercise 2.7 (book p. 67) — H72 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 77; H73 · `DS-Failure_detection_leader_election (1).pdf` · PDF p. 75.
- Main Book Exercise 2.10 (book p. 68) — H74 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 77; H75 · `DS-Failure_detection_leader_election (1).pdf` · PDF p. 75.
