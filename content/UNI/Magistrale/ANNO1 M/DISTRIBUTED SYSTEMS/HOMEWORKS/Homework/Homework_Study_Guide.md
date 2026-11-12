# Distributed Systems Homework Study Guide

Read the prompt first. Each completed entry has a short optional hint and one worked answer, including the assumptions needed for its reasoning. PDF references use 1-based page numbers; transcript and lesson links provide supporting explanations.

## 1. Modeling message loss as an event

### Model the loss of a message

H01 · `DS-2425-02-Models.pdf` · PDF p. 35

Model the loss of a message as an event.

> [!tip]- Hint
> Describe a loss as a transition between configurations: identify when it is enabled and which buffers change.

> [!check]- Worked answer
> A message in transit is represented by an entry in the sender's output buffer. A loss event removes that entry without producing a delivery or a local computation step at the receiver. Writing the destination explicitly, define $\operatorname{LM}(p,q,m)$ by:
>
> $$
> \text{enabled iff } m\in\mathrm{Out}_p \text{ and } \operatorname{dest}(m)=q,
> $$
> $$
> \mathrm{Out}_p' = \mathrm{Out}_p\setminus\{m\},\qquad
> \mathrm{In}_q'=\mathrm{In}_q.
> $$
>
> All other process states and buffers remain unchanged. If the destination is already encoded in $m$, the shorter notation $\operatorname{LM}(p,m)$ is enough. With multiset buffers, remove one occurrence corresponding to this transmission. Losing this occurrence does not prevent a separately retransmitted copy from being delivered later.

Sources and related explanations: [Lesson 1](<../../Assets/TRANSCRIPTED DS/DS LESSON 1 TRANSCRIPTED.md>) · [Lesson 2](<../../Assets/TRANSCRIPTED DS/DS LESSON 2 TRANSCRIPTED.md>).

## 2. Classifying and constructing safety and liveness properties

### Safety or liveness?

H02 · `DS-2627-02-Models-reviewed (1).pdf` · PDF p. 56

Classify the following as safety or liveness.

- Fairness of an execution.
- **At most-f failures.** An execution E can contain at most f failures.
- **Eventual recovery.** If a process p experiences a crash(p), then it eventually experiences a recovery(p). This event starts process p again.
- **Time-bounded recovery.** If a process p experiences a recovery(p), then this recovery happens at most k events after its failure.

Write three new safety properties and three new liveness properties.

> [!tip]- Hint
> For each property, ask whether a finite prefix can already make every continuation violate it. Read the antecedent of the recovery statements carefully.

> [!check]- Worked answer
> **Safety** means that every violating execution has a finite bad prefix: once that prefix occurs, no continuation can repair the violation. **Liveness** means that every finite prefix has some continuation satisfying the property. The word “eventually” alone is not a reliable classification rule; the lesson-2 exam warning specifically includes bounded statements that contain it.
>
> 1. **Fairness — liveness.** In the failure-free execution model used for this question, processes must keep taking steps and messages must eventually be delivered. A finite delay cannot establish a violation: a continuation can still schedule the process or deliver the message. This is the fairness assumption of that model, not a reliable-delivery guarantee for an arbitrary lossy channel.
> 2. **At most $f$ failures — safety.** The $(f+1)$-st failure is a finite, irreversible witness. For $f=3$, the fourth failure violates the bound.
> 3. **Eventual recovery — liveness.** After any finite wait following a crash, recovery can still occur later. An infinite execution without recovery violates the requirement.
> 4. **Time-bounded recovery, exactly as written on the slide — safety.** The antecedent is *if a recovery occurs*. A recovery more than $k$ events after the corresponding failure witnesses the violation at that recovery event. Merely passing the deadline without recovering does not violate this particular formulation: an execution that never recovers satisfies it vacuously. A different statement requiring recovery within $k$ events would also impose its occurrence.
>
> Three further **safety** examples are:
>
> - **No duplication:** a receiver delivers a message at most once. A second delivery is a finite witness.
> - **Bounded delivery delay:** every message sent at time $t$ is delivered by $t+\Delta$. Once time has passed the deadline without delivery, the violation is permanent; the time model must allow observing that deadline.
> - **FIFO order, conditional on both deliveries:** if $p$ sends $m_1$ before $m_2$ to $q$ and $q$ delivers both, it delivers $m_1$ first. A prefix containing the reversed pair of deliveries is a witness. Delivering only $m_2$ does not yet violate this conditional ordering property; if $m_1$ is never delivered, reliable delivery may fail separately.
>
> Three further **liveness** examples are:
>
> - **Reliable delivery:** if a correct sender sends $m$ to a correct receiver, the receiver eventually delivers $m$.
> - **Starvation freedom:** every request by a correct process eventually receives a grant, assuming current holders eventually release the resource.
> - **Stubborn delivery:** if a correct sender sends $m$ to a correct receiver, the receiver delivers $m$ infinitely often. Any finite prefix can still be followed by infinitely many deliveries.

Sources and related explanations: [Lesson 2](<../../Assets/TRANSCRIPTED DS/DS LESSON 2 TRANSCRIPTED.md>).

## 3. Implication between recovery properties

### Recovery implication

H04 · `DS-2627-02-Models-reviewed (1).pdf` · PDF p. 56

Does Time-bounded recovery imply Eventual recovery? Use the definitions in the preceding item on the same page.

> [!tip]- Hint
> To disprove an implication, find an execution satisfying its premise property and violating its conclusion property.

> [!check]- Worked answer
> **No.** Take an execution in which $p$ crashes and never recovers. Time-bounded recovery holds because its antecedent, the occurrence of $\operatorname{recovery}(p)$, is always false. Eventual recovery fails because the crash is not followed by a recovery.
>
> The distinction is between constraining **when a recovery may occur** and requiring **that a recovery occurs**. Under the slide's definitions, the first requirement does not imply the second. This conclusion depends on the exact antecedent in the exercise; replacing it with “if $p$ crashes, it recovers within $k$ events” would change the answer.

Sources and related explanations: [Lesson 2](<../../Assets/TRANSCRIPTED DS/DS LESSON 2 TRANSCRIPTED.md>).

## 4. Rewriting a compound specification

### Comparable output sets

H06 · `DS-2627-02-Models-reviewed (1).pdf` · PDF p. 56

How would you improve the writing of this property?

> If a process p outputs a set of integer O_p, then any other process q outputs also outputs a set O_q. For any two processes z and t we have either O_z is a subset of O_t or that O_t is a subset of O_z.

> [!tip]- Hint
> Identify separately the requirement to produce an output and the restriction on the values of outputs that have been produced.

> [!check]- Worked answer
> The statement combines an output-existence obligation with a restriction on output values. In a failure-free model, preserve its meaning by separating them:
>
> 1. **Output agreement / liveness:** if some process outputs a set of integers, every process eventually outputs a set of integers.
> 2. **Comparability / safety:** for any two output sets $O_z$ and $O_t$, either $O_z\subseteq O_t$ or $O_t\subseteq O_z$.
>
> The first property does not require an initial output to occur: it is conditional on somebody outputting. Calling it unconditional termination would be stronger than the original statement. The second property is violated by the finite observation of two incomparable output sets.
>
> If crash failures are allowed and the intended specification must remain implementable, formulate the first property over **correct** processes: if some process outputs, every correct process eventually outputs. That is an explicit adaptation to the failure model, not just a grammatical reformulation. Comparability still constrains every output actually produced, including one produced by a process that later crashes.

Sources and related explanations: [Lesson 2](<../../Assets/TRANSCRIPTED DS/DS LESSON 2 TRANSCRIPTED.md>).

## 5. Adapting fairness to crash failures

### Fairness and failed processes

H08 · `DS-2425-02-Models.pdf` · PDF p. 89

We have seen that the fairness property requires a process to be scheduled forever, so if a process crashes the execution is not fair. The reason is that a failed process will never be scheduled again for execution. How is this consistent with the definition of fairness?

> [!tip]- Hint
> Separate the scheduler’s obligation to give a process steps from the channel’s obligation to deliver messages.

> [!check]- Worked answer
> Fairness must be stated for the failure model being used. In a crash-stop execution, the appropriate process-scheduling condition is:
>
> $$
> \text{every correct process takes infinitely many local steps.}
> $$
>
> A correct process never crashes in that execution. A faulty process may take finitely many steps and then stop permanently; that does not make the execution unfair. The failure-free formulation implicitly quantified over a set in which every process was correct.
>
> The same scheduling condition can be expressed using process-step tasks: whenever a noncrashed process remains enabled, the scheduler must continue giving it opportunities to execute. After a crash, its computation steps are disabled, so task fairness does not require executing them. The equivalence depends on specifying fairness for each process's step task, not merely requiring that *some* enabled event occurs.
>
> Channel assumptions remain separate. A reliable channel may require eventual delivery to a correct receiver. A fair-lossy link permits a particular transmission to be lost; its fair-loss guarantee applies when a message is retransmitted infinitely often between correct processes. Scheduling fairness does not turn that channel into a reliable one.

Sources and related explanations: [Lesson 2](<../../Assets/TRANSCRIPTED DS/DS LESSON 2 TRANSCRIPTED.md>).

## 6. Counterexamples for strengthened delivery guarantees

### HOMEWORKS 1 — strengthened stubborn delivery

H09 · `DS-2627-02-Models-reviewed (1).pdf` · PDF p. 74

Show that our stubborn algorithm does not work if we change the first property to the following.

> **SL1 (Stubborn-delivery).** If a process p sends m to q, then q delivers m an infinite number of times. {Pay attention something is missing}.

Show that there is no algorithm that satisfies the property above using a fair-lossy link.

### Variation — PL1 with process crashes

H11 · `DS-2627-02-Models-reviewed (1).pdf` · PDF p. 78

In a system with crash failures, is there something wrong with this formulation of reliable delivery? “If a correct process p sends m to q, then q eventually delivers m.”

> [!tip]- Hint
> Test the sender and receiver assumptions separately. A useful counterexample must satisfy the underlying link properties.

> [!check]- Worked answer
> For the stubborn link, the intended guarantee is:
>
> $$
> \text{if a correct }p\text{ sends }m\text{ to a correct }q,
> \text{ then }q\text{ delivers }m\text{ infinitely often.}
> $$
>
> **Receiver failure.** If $q$ crashes before $p$ sends $m$, it cannot execute a later delivery. Delivering before the send would violate no creation. Thus both H09 and H11 need a correct receiver in their delivery guarantee. For H09, even a receiver that crashes after the send cannot deliver infinitely often before its finite crash prefix ends.
>
> **Sender failure in the given stubborn algorithm.** The sender retains $m$ and retransmits on every timeout. If it crashes after $K$ timeouts, it makes only finitely many transmissions. Finite duplication then permits only finitely many underlying deliveries, and the channel may lose every copy. This cannot satisfy H09's unconditional infinite-delivery requirement.
>
> **Impossibility for any implementation of the strengthened H09.** Let $p$ accept a fresh application message, take finitely many steps, and crash. Choose a finite prefix in which every transmission carrying information about that message is lost before any other process learns it. Fair-loss allows losing this finite set of transmissions. After the crash there is neither a surviving holder of the message nor an in-transit copy, so the receiver cannot produce it without violating no creation. Hence no algorithm can implement that unconditional specification over a fair-lossy link.
>
> H11 only concerns eventual delivery, but its receiver condition is still essential. Its corrected version is: if a correct $p$ sends $m$ to a correct $q$, then $q$ eventually delivers $m$.

Sources and related explanations: [Lesson 2](<../../Assets/TRANSCRIPTED DS/DS LESSON 2 TRANSCRIPTED.md>).

## 7. Implementing a perfect link with bounded memory

### HOMEWORKS 1 — fixed memory

H13 · `DS-2627-02-Models-reviewed (1).pdf` · PDF p. 74 · ★

Suppose you can use only a fixed amount k of memory (see it as having the possibility to store at most k different messages), could you implement a Perfect p2p link on a fair-lossy?

> [!tip]- Hint
> State what counts toward the memory bound and whether the interface allows arbitrarily many outstanding send requests.

> [!check]- Worked answer
> **Under the slide's unrestricted send interface, no fixed capacity of $k$ message payloads suffices.** The model matters: the application may submit arbitrarily many distinct messages without waiting for delivery, each handler terminates, and all storage retaining pending payloads counts toward the bound. An unbounded queue in another layer, or an encoding holding arbitrarily many payloads inside one variable, would bypass that bound rather than satisfy it.
>
> Let correct $p$ accept $k+1$ arbitrary distinct messages for correct $q$. During this finite prefix, let the fair-lossy channel lose every transmission and schedule no delivery at $q$. This is legal: fair-loss restricts infinite retransmission behaviour, not the number of losses in a finite prefix. The receiver therefore knows none of the messages and cannot have acknowledged them.
>
> At the end of the prefix, the sender's state cannot retain enough information to reconstruct all $k+1$ arbitrary payloads in $k$ message slots. At least one message has no recoverable copy at either endpoint or in the channel. Continuing the execution cannot restore that information. The lost message will never be delivered, contradicting reliable delivery. This is an information-storage argument; it does not depend on using the particular `sent` set from the lecture.
>
> **Why an ACK is not enough to evade the argument.** No ACK can arrive in the constructed prefix. A protocol that refuses further requests until an ACK arrives instead imposes backpressure or needs an external queue, so it changes the unrestricted interface used above. Such a restricted interface requires its own analysis.
>
> The lecture implementation also has growing receiver storage: if its `delivered` set forgets an old message, a delayed copy can be delivered twice. This explains why simply truncating that implementation is unsafe. It is not a separate impossibility proof for every receiver design: sequence numbers can retain information about old messages without storing each payload. Also distinguish a fixed number of message slots from a fixed number of bits—an unbounded sequence counter does not use a fixed number of bits. These distinctions specify the scope of the answer rather than treating one cache implementation as the only possible algorithm.

Sources and related explanations: [Lesson 2](<../../Assets/TRANSCRIPTED DS/DS LESSON 2 TRANSCRIPTED.md>) · [Lesson 3](<../../Assets/TRANSCRIPTED DS/DS LESSON 3 TRANSCRIPTED.md>).

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

> [!tip]- Hint
> Identify every event that triggers retransmission, then consider an application that sends one message and becomes silent.

> [!check]- Worked answer
> The `for all` loop runs only when the upper layer invokes `SL, SEND`; it does not run periodically. If correct $p$ sends one message $m$ to correct $q$ and makes no further requests, the algorithm transmits $m$ once. The channel may lose it. Even if it arrives, finite duplication prevents one transmission from producing infinitely many deliveries, as stubborn delivery requires.
>
> For a nonempty set of requests to correct receivers, the liveness guarantee is satisfied when correct $p$ keeps invoking `SL, SEND` infinitely often: each stored pair occurs in all sufficiently late retransmission loops, so it is transmitted infinitely often and fair-loss yields infinitely many deliveries. With finitely many such invocations, each message is sent only finitely often and stubborn delivery fails. An execution with no requests satisfies the delivery implication vacuously; a request whose receiver crashes is outside its correct-receiver premise. No-creation and finite-duplication properties of the implementation must still be checked independently of this liveness condition.
>
> To see why external requests cannot replace an internal trigger, consider any reactive implementation after a single application request. Let every finitely generated initial packet be lost. This leaves no packet capable of triggering a reply, and let the application remain silent. If every handler terminates and there is no internally scheduled action, there can be no further send. The execution is legal for a fair-lossy channel and violates the required delivery guarantee.
>
> Thus the implementation needs a mechanism that can keep scheduling retransmission independently of new application or network input. A periodic timeout, a recurring internal action, or a fairly scheduled retransmission loop supplies it. “Timer or infinite loop” describes this role in the exercise's event-driven model; it does not require a hardware timer specifically.

Sources and related explanations: [Lesson 2](<../../Assets/TRANSCRIPTED DS/DS LESSON 2 TRANSCRIPTED.md>).

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

> [!tip]- Hint
> Check message ordering and message identity separately. Repeated application operations need not be retransmissions of the same message.

> [!check]- Worked answer
> There are two explanations, under different assumptions about message identity. Assume both processes are correct and the server processes delivered requests.
>
> **Distinct requests over a non-FIFO perfect link.** Give every request and reply its own identity. The server can receive `INC(1)`, then `GET(3)`, and only later `INC(2)`, although the client sent both increments before its query. The first reply is then $1$. Perfect links guarantee eventual delivery, not the order of different messages. The second query eventually receives a reply, but that reply need not already be $2$: this query can also overtake the delayed second increment. Preserve request order with a FIFO perfect link, or wait for the server to acknowledge that each update has been executed before issuing the next operation.
>
> **Repeated payloads mistaken for the same message.** In the lecture implementation, the receiver tests message membership:
>
> ```text
> upon sl.Deliver(p, m):
>     if m not in delivered:
>         delivered := delivered union {m}
>         trigger pl.Deliver(p, m)
> ```
>
> If the application uses the identical object `INC` for both increments, the receiver delivers it once and filters the second occurrence. The value stays $1$. Likewise, after delivering the first identical `GET`, it filters every later copy of `GET`; the application never receives a second query and sends no second response. Waiting longer cannot fix this case.
>
> Attach a fresh per-sender sequence number to each invocation, for example `(INC,1)`, `(INC,2)`, `(GET,3)`, `(GET,4)`, and include sender identity if different senders share a deduplication table. Replies also need distinct identities and a correlation to their requests. This restores the distinction between separate operations and retransmissions. FIFO ordering and unique identities solve different problems and may both be needed.

> [!example]- Related FIFO correctness exercise
> The five FIFO modifications A–E are worked through in the lesson-4 note linked below. For variant A (`sn >= next`, followed by `next := next + 1`), delivering only $m_2$ while $m_1$ remains blocked violates reliable delivery, but does not give a reversed pair of deliveries. A FIFO counterexample uses three messages: deliver $m_3$ first and $m_2$ second, obtaining the reversed pair $(m_3,m_2)$. This illustrates the conditional FIFO definition used in section 2.
>
> In variant E, `seq := 2` and `next := 1` mean that the first message has sequence number three while the receiver waits for one. With no messages delivered, reliable delivery fails, while no creation, no duplication and conditional FIFO ordering hold vacuously.

Sources and related explanations: [Lesson 2](<../../Assets/TRANSCRIPTED DS/DS LESSON 2 TRANSCRIPTED.md>) · [Lesson 3](<../../Assets/TRANSCRIPTED DS/DS LESSON 3 TRANSCRIPTED.md>) · [Lesson 4](<../../Assets/TRANSCRIPTED DS/DS LESSON 4 transcripted.md>) · [DS LESSON 4 — FIFO correctness exercises](<../../DS LESSON 4.md#FIFO correctness exercises>).

## 10. Bounded delivery over fair-lossy links

### Timed delivery for surviving messages

H19 · `DS-2526-03-Time1.pdf` · PDF p. 61

You are on a synchronous system and you have a fair-lossy channel with the following additional property.

> **Timed delivery.** If p sends a message m to q at time t, and m is not lost, then q delivers m at time at most t+1.

Using such a channel, could you create a stronger version of perfect point-to-point that gives you a bound on the delivery time?

> [!tip]- Hint
> Ask what the delivery bound says about packets that are lost, not just packets that survive.

> [!check]- Worked answer
> **No fixed delivery-time bound follows from these assumptions.** Let a proposed perfect link promise delivery by time $t_0+B$ for any message sent at $t_0$ by a correct sender to a correct receiver. In the usual non-Zeno execution model, only finitely many transmissions occur before that finite deadline. Lose every transmission carrying the fresh message during this interval.
>
> This finite loss prefix respects fair-loss: if retransmissions continue forever, the channel can deliver infinitely many later copies. It also respects the additional timed-delivery condition, because that condition constrains only copies that survive. By the deadline, the receiver has learned nothing about the message. Its local view is indistinguishable from one without that send, so no creation prevents delivering it by guesswork. The promised bound is violated.
>
> Retransmission can still provide eventual delivery. A deterministic time bound would require an additional restriction, such as a known upper bound on consecutive losses together with bounds on retransmission frequency and local processing. Synchrony alone does not supply a loss bound.

Sources and related explanations: [Lesson 4](<../../Assets/TRANSCRIPTED DS/DS LESSON 4 transcripted.md>).

## 11. Analyzing clock synchronization

### Cristian’s algorithm — compare timing patterns

H21 · `DS-2526-03-Time1.pdf` · PDF p. 60

Which of the following patterns is bad for Cristian’s algorithm? Use the two request–reply diagrams on this page.

Algorithm and accuracy in the same PDF, pp. 42–46.

> [!tip]- Hint
> Write the estimate and the actual reference time at receipt in terms of the two one-way delays. Then compare their difference.

> [!check]- Worked answer
> Ignoring server processing time and clock drift during the exchange, let $d_{\rm req}$ and $d_{\rm rep}$ be the request and reply delays. If the server timestamps the reply with $t$, then at receipt:
>
> $$
> \mathrm{RTT}=d_{\rm req}+d_{\rm rep},\qquad
> C_p^{\rm estimate}=t+\frac{\mathrm{RTT}}2,\qquad
> T^{\rm reference}=t+d_{\rm rep}.
> $$
>
> The signed estimation error is therefore
>
> $$
> \varepsilon=\frac{d_{\rm req}-d_{\rm rep}}2.
> $$
>
> In the **left-hand pattern**, the two delays are symmetric, so the idealized error is zero even if the exchange is slow. In the **right-hand pattern**, the delays are strongly asymmetric, making the midpoint estimate inaccurate. Asymmetry, rather than a large RTT by itself, is the issue illustrated by these two diagrams.
>
> If each one-way delay is at least $d_{\min}$, the reply delay lies between $d_{\min}$ and $\mathrm{RTT}-d_{\min}$. Thus
>
> $$
> |\varepsilon|\le\frac{\mathrm{RTT}}2-d_{\min},
> $$
>
> with equality in the extreme asymmetric case. The right-hand diagram illustrates that worst case. Nonnegligible processing time and clock-rate error require corresponding adjustments to the model.

Sources and related explanations: [Lesson 4](<../../Assets/TRANSCRIPTED DS/DS LESSON 4 transcripted.md>).

## 12. Reviewing neighbor averaging on an arbitrary graph

### Fully distributed synchronisation

H23 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 85

You have to peer review a synchronisation algorithm for arbitrary graphs. The main meat of the algorithm is as follows:

- You take the clocks of all your neighbours.
- You compute the average, and set your clock to its value.

Is there something wrong with this strategy?

> [!tip]- Hint
> Start with a two-node graph and simultaneous updates. A single legal nonconverging execution is enough to refute a general convergence claim.

> [!check]- Worked answer
> The strategy is underspecified and does not guarantee synchronization on arbitrary graphs. Even without failures or network delay, it can fail. Take two connected nodes whose clock offsets are initially $10$ and $20$, and let them update simultaneously in rounds using only their neighbour's value:
>
> $$
> (10,20)\longrightarrow(20,10)\longrightarrow(10,20)\longrightarrow\cdots.
> $$
>
> Their common physical advance can be subtracted when tracking offsets; the difference still oscillates instead of approaching zero. The same construction works on a bipartite graph by giving every node in one partition the first offset and every node in the other partition the second. This is a counterexample to convergence under the stated update rule.
>
> Including a positive self-weight is one way to eliminate this periodic behaviour in a suitable connected, fixed, synchronous averaging model. It is not the only possible repair, and convergence also depends on connectivity, update scheduling and the weights. Disconnected components cannot generally agree on a common time through neighbour messages alone.
>
> A physical-clock implementation must additionally account for stale timestamps received over the network, avoid backward jumps if monotonicity is required, and specify which clock failures it tolerates. An unfiltered average is sensitive to outliers. These are further design requirements; the two-node oscillation already refutes the naive strategy in a failure-free setting.

Sources and related explanations: [Lesson 4](<../../Assets/TRANSCRIPTED DS/DS LESSON 4 transcripted.md>).

## 13. Computing vector clocks from an execution

### Apply vector clocks

H24 · `DS-2425Time2.pdf` · PDF p. 44

Apply a vector clock to each event and then identify false statements among the following:

- e₁ → e₂
- e₁ → e₃
- e₂ → e₃

Use the four-process execution diagram on the exercise page.

> [!tip]- Hint
> Compute the vectors first, using one increment per event, and compare them component by component. A larger component in each direction means incomparability.

> [!check]- Worked answer
> Start from the all-zero vector. A local or send event at $p_i$ increments component $i$. A receive event first takes the componentwise maximum with the received vector and then increments component $i$. These are disjoint event cases, so no event is counted twice. Write $V<W$ when $V[k]\le W[k]$ for every component and at least one inequality is strict.
>
> For H24, label events from left to right as $a_1,\ldots,a_4$ on $P_1$, $b_1,\ldots,b_7$ on $P_2$, $c_1,\ldots,c_4$ on $P_3$, and $d_1,\ldots,d_3$ on $P_4$. The marked vectors are:
>
> $$
> V(e_1)=V(c_1)=[0,0,1,0],\qquad
> V(e_2)=V(d_3)=[1,2,0,3],\qquad
> V(e_3)=V(a_4)=[4,7,4,3].
> $$
>
> For the second vector, $d_1=[0,0,0,1]$ and $d_2$ receives $b_2=[1,2,0,0]$, giving $d_2=[1,2,0,2]$. The next send increments component four to obtain $d_3$.
>
> The complete event vectors for both source diagrams are below; labels restart independently in each diagram. A dash means that the diagram has no such event.
>
> | Event | H24, PDF p.44 | H25, PDF p.45 |
> | --- | --- | --- |
> | $a_1$ | $[1,0,0,0]$ | $[1,0,0,0]$ |
> | $a_2$ | $[2,0,1,0]$ | $[2,0,0,0]$ |
> | $a_3$ | $[3,0,1,0]$ | $[3,0,0,0]$ |
> | $a_4$ | $[4,7,4,3]$ | $[4,4,4,3]$ |
> | $b_1$ | $[1,1,0,0]$ | $[1,1,0,0]$ |
> | $b_2$ | $[1,2,0,0]$ | $[1,2,0,1]$ |
> | $b_3$ | $[3,3,1,0]$ | $[1,3,1,1]$ |
> | $b_4$ | $[3,4,1,0]$ | $[1,4,1,1]$ |
> | $b_5$ | $[3,5,4,1]$ | $[1,5,1,1]$ |
> | $b_6$ | $[3,6,4,3]$ | $[3,6,1,1]$ |
> | $b_7$ | $[3,7,4,3]$ | — |
> | $c_1$ | $[0,0,1,0]$ | $[0,0,1,0]$ |
> | $c_2$ | $[0,0,2,1]$ | $[1,4,2,1]$ |
> | $c_3$ | $[3,4,3,1]$ | $[2,4,3,3]$ |
> | $c_4$ | $[3,4,4,1]$ | $[2,4,4,3]$ |
> | $d_1$ | $[0,0,0,1]$ | $[0,0,0,1]$ |
> | $d_2$ | $[1,2,0,2]$ | $[2,0,0,2]$ |
> | $d_3$ | $[1,2,0,3]$ | $[2,0,0,3]$ |
> | $d_4$ | — | $[2,5,1,4]$ |
>
> For H24's last vector, receiving $b_7$ at $a_4$, after $a_3=[3,0,1,0]$, gives
>
> $$
> V(a_4)=\max([3,0,1,0],[3,7,4,3])+[1,0,0,0]=[4,7,4,3].
> $$
>
> Consequently, $e_1\to e_2$ is **false**: their vectors are incomparable, since component three is larger at $e_1$ while components one, two and four are larger at $e_2$. Both $e_1\to e_3$ and $e_2\to e_3$ are **true** by componentwise comparison. The annotated execution and complete event table are linked below.
>
> For **H25 on PDF p.45**, use the labels actually printed on that figure: $e_1=a_2$, $e_2=b_1$, and $e_3=a_4$. Thus $V(e_1)=[2,0,0,0]$, $V(e_2)=[1,1,0,0]$, and $V(e_3)=[4,4,4,3]$. The first two are incomparable, so $e_1\to e_2$ is **false**, while both $e_1\to e_3$ and $e_2\to e_3$ are **true**. The other marked events are $e_4=b_6=[3,6,1,1]$ and $e_5=d_4=[2,5,1,4]$: both follow $e_1$, whereas $e_3,e_4,e_5$ are pairwise incomparable. Do not reuse event labels or conclusions from a different trace.

Sources and related explanations: [Lesson 5](<../../Assets/TRANSCRIPTED DS/DS LESSON 5 transcripted.md>) · [DS LESSON 5 — Exercise 1](<../../DS LESSON 5.md#Exercise 1 — 4-Process Vector Clock Execution>).

## 14. Reconstructing an execution from vector timestamps

### Q3.1–Q3.2 — infer an execution from two observations

H26 · `DS-2425Time2.pdf` · PDF p. 47

Consider an asynchronous message-passing system that uses vector clocks to implement a causal consistency check. There are four processes with IDs 1 to 4. The vector clock positions are (p₁, p₂, p₃, p₄). Vector clocks are updated by increasing before send. Processes communicate by point-to-point links. You start debugging process p₁ in the middle of the execution and see the following traffic at its Ethernet card:

- **00:00, exiting.** Send Message [MSG CONTENT], vector clock (1, 0, 0, 0).
- **00:05, entering.** Received Message [MSG CONTENT], vector clock (1, 2, 3, 1).

**Q3.1** Draw an execution that justifies the vector clocks you are seeing. Is such an execution unique?

**Q3.2** Does there exist an execution that justifies the vector clocks and where at least one process does not send any message? Justify your answer.

> [!tip]- Hint
> Distinguish the vector carried by an incoming packet from the receiver’s vector after processing it. Construct one execution before deciding whether it is unique.

> [!check]- Worked answer
> The outgoing packet records a send at $p_1$ with vector $(1,0,0,0)$. The incoming vector $(1,2,3,1)$ belongs to the remote send event; it is not yet the timestamp of the receive event at $p_1$. Under the event-counting convention of this exercise, its components summarize the causal history of that send, including the sender's own event.
>
> **Q3.1.** One compatible execution is:
>
> | Event | Vector after the event |
> | --- | --- |
> | $p_1$ sends $m_1$ to $p_2$ | $(1,0,0,0)$ |
> | $p_2$ receives $m_1$ | $(1,1,0,0)$ |
> | $p_2$ sends $m_2$ to $p_3$ | $(1,2,0,0)$ |
> | $p_4$ sends $m_3$ to $p_3$ | $(0,0,0,1)$ |
> | $p_3$ receives $m_2$ | $(1,2,1,0)$ |
> | $p_3$ receives $m_3$ | $(1,2,2,1)$ |
> | $p_3$ sends $m_4$ to $p_1$ | $(1,2,3,1)$ |
>
> The first and last packets are the observations at `00:00` and `00:05`. If $p_1$ has no additional intervening local events, processing the last packet gives it $(2,2,3,1)$. The two network-card observations alone do not exclude unobserved local events, so that internal receive vector is conditional on this chosen execution.
>
> The execution is **not unique**. For example, exchange the two receive events at $p_3$: receiving $m_3$ first gives $(0,0,1,1)$, and subsequently receiving $m_2$ gives $(1,2,2,1)$ again. The final send still carries $(1,2,3,1)$.
>
> Because component four is exactly one in the incoming message, the first event of $p_4$ in its causal history must have sent information out. If it were a receive or a purely local event, a later send would be needed to expose it elsewhere, raising that component to at least two. This reasoning uses the convention that sends and receives both increment the clock.
>
> **Q3.2.** No process can remain silent throughout a compatible execution. Process $p_1$ explicitly sends the first packet. For any other process $p_k$, a positive component $k$ at a different process requires a causal chain beginning with a send by $p_k$: other processes cannot create its counter increments. All four components of the incoming packet are positive, so each process has sent at least one message.

Sources and related explanations: [Lesson 5](<../../Assets/TRANSCRIPTED DS/DS LESSON 5 transcripted.md>).

## 15. Designing vector clocks with unknown membership

### Vector clocks with initially unknown IDs

H27 · `DS-2425Time2.pdf` · PDF p. 65

In the vector clock we are assuming that each process knows the number, and the IDs of all the other. Assuming that you do not know how many processes are in the system and initially you do not know the id of all the others. Assuming that everyone has an unique ID (no two processes have the same ID). can you implement something that is similar to a vector clock? Could you write the code? What is the peculiarity of these special vector clocks associated with two events that are concurrent?

> [!tip]- Hint
> Replace fixed array positions with unique process IDs, and decide how comparisons should treat an absent entry.

> [!check]- Worked answer
> Use a map from process IDs to counters, with default value zero for an absent ID. Each process initially stores only its own zero entry. On receiving a message it merges all entries carried by that message. The code uses three disjoint event cases:
>
> ```text
> upon Init at process p:
>     V := {p: 0}                     // absent keys have value 0
>
> upon an internal computation event e:  // excludes send and receive
>     V[p] := V[p] + 1
>     timestamp(e) := copy(V)
>
> upon Send(q, m):
>     V[p] := V[p] + 1
>     timestamp(send(m)) := copy(V)
>     send (m, copy(V)) to q
>
> upon Receive(m, W):
>     for k in keys(W):
>         V[k] := max(V.get(k, 0), W[k])
>     V[p] := V[p] + 1
>     timestamp(receive(m)) := copy(V)
> ```
>
> To compare clocks $V$ and $W$, use $K=\operatorname{keys}(V)\cup\operatorname{keys}(W)$ and interpret missing entries as zero:
>
> $$
> V\le W\iff\forall k\in K:\ V[k]\le W[k],\qquad
> V<W\iff V\le W\ \land\ V\ne W.
> $$
>
> This is the ordinary vector-clock construction with zero entries omitted. Merging by maximum propagates exactly the same causal information, so $e\to f$ iff $V(e)<V(f)$, and concurrency is equivalent to incomparability. Unique IDs are necessary to keep different processes' components distinct.
>
> Concurrent clocks **may** have different key sets or sizes, but need not. For example, two processes that already know each other's IDs can subsequently execute concurrent events with maps on the same keys. If neither process has causally heard from the other, its timestamp omits the other's positive component. More generally, if each timestamp has a **positive** entry missing from the other, they are incomparable immediately. Comparing raw key sets alone is insufficient if explicit zero-valued entries are allowed. The maps can also grow with the number of processes encountered; unknown membership does not imply a fixed memory bound.

Sources and related explanations: [Lesson 5](<../../Assets/TRANSCRIPTED DS/DS LESSON 5 transcripted.md>).

## 16. Checking Lamport mutual exclusion with non-FIFO links

### Lamport’s algorithm without FIFO

H29 · `DS-2425Time2.pdf` · PDF p. 66

Suppose we run Lamport’s Mutual Exclusion (ME) algorithm in a system where links are not FIFO. For each property of Lamport’s ME algorithm, discuss whether it is violated. If a property is violated, provide an execution example, including a detailed space-time diagram and comments on the internal state of each process, that demonstrates the violation. If a property is not violated, explain why it remains intact.

Properties, assumptions, and pseudocode in the same PDF, pp. 51–53.

> [!tip]- Hint
> Find the reason that an ACK from a process normally rules out an unseen earlier request from that same process. Then remove the channel-order assumption.

> [!check]- Worked answer
> Keep perfect delivery, no crashes, and eventual release by every process that enters the CS. Removing FIFO breaks the implication that an ACK arrives after every earlier request sent on that channel.
>
> **Mutual exclusion can fail.** Consider two processes $q,p$, with requests $r_q=(1,q)<r_p=(2,p)$. Only the relative timestamps matter. Schedule these events; each process's own request and self-acknowledgment are processed locally as usual:
>
> | Step | At $p$ | At $q$ / channel state |
> | --- | --- | --- |
> | 1 | Requests $r_p$; its queue contains only $r_p$. | $q$ has already requested $r_q$, but `REQ(q)` is delayed toward $p$. |
> | 2 | Its `REQ(p)` reaches $q$. | $q$ queues $r_q,r_p$ and sends an ACK with timestamp greater than $r_p$. |
> | 3 | The ACK overtakes `REQ(q)`. All ACK conditions hold and the visible queue head is $r_p$, so $p$ enters. | $q$ still waits. |
> | 4 | The delayed `REQ(q)` arrives. $p$ queues it and sends its ACK; receiving a request does not revoke a grant already issued. | $q$ receives this ACK; its queue head is $r_q$, so it also enters. |
>
> Both are now inside the CS. Every message can eventually be delivered, so the counterexample respects perfect links. FIFO would prevent step 3: `REQ(q)` was sent by $q$ before the ACK and would arrive first.
>
> **Request-order fairness can fail too.** In the same trace, $r_q<r_p$ and $q$ requested first, but $p$ enters first. More generally, Lamport timestamps order causally related requests, with IDs breaking ties; they do not reveal an arbitrary global physical order between concurrent requests. Interpret the slide's ordering requirement with that limitation even in the original FIFO model.
>
> **Liveness needs the exact queue semantics.** The slide removes an entry satisfying `sender(req)=sender(RLS)` rather than naming a request. Without FIFO, a process can receive a new request from $q$ before receiving $q$'s previous release. If the set-based removal chooses the newer entry, it can leave the old request permanently blocking the queue. For a concrete execution, let $q$ finish $r_1$, delay its release to $p$, let $p$ request $r_p$, and then let $q$ request $r_2$, with $r_1<r_p<r_2$. At $p$, deliver $r_2$ before the old release and let that release remove $r_2$. Then $p$ waits behind stale $r_1$, while $q$ waits behind $r_p$; neither can enter and produce a further release. ACKs have already arrived, so eventual packet delivery does not resolve the deadlock.
>
> That last execution uses a removal choice permitted by the slide's existential set operation. An implementation that explicitly removes the oldest matching entry needs a separate liveness analysis; the trace is not a proof against every possible queue implementation. The mutual-exclusion and fairness failures above do not depend on this ambiguity. Identifying requests in release messages removes this matching ambiguity, but alone does not repair the ACK-overtaking safety counterexample.

## 17. Choosing timing bounds for heartbeat failure detectors

### Minimum round duration

H30 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 29

Minimum T for round-based P?

Use Algorithm 3, its synchronizer clock, global clock skew δ, and the link-delay assumptions in the same PDF, pp. 23–26.

> [!tip]- Hint
> Compare the latest possible heartbeat arrival with the earliest end of the receiver’s round. Also check that the heartbeat cannot arrive before that round begins.

> [!check]- Worked answer
> Let $D=\text{max\_delay}$ and $d_{\min}$ be the link-delay bounds. Use the timing idealization of PDF pp.23–26: corresponding round boundaries at two processes are separated by at most $\delta$ units of physical time, and rounds last $T$ in those units. The slide also assumes $d_{\min}>\delta$.
>
> If $p$ enters round $r$ at time $t$ and immediately sends its heartbeat, receiver $q$ enters that round between $t-\delta$ and $t+\delta$. The heartbeat arrives in $[t+d_{\min},t+D]$.
>
> - **Not too early:** $t+d_{\min}>t+\delta$, so $q$ has entered round $r$ before the beat arrives.
> - **Not too late:** $q$ cannot leave round $r$ before $t-\delta+T$. Hence it is sufficient to require $t+D<t-\delta+T$, or
>
> $$
> \boxed{T>D+\delta.}
> $$
>
> This is the tight worst-case threshold under these inequalities. If $T<D+\delta$, take the earliest possible receiving-round end and the maximum link delay: a correct process can be suspected because its heartbeat arrives too late. At equality, arrival and timeout can coincide; strict inequality avoids depending on their scheduling order. There is therefore an infimum $D+\delta$, rather than a smallest admissible real-valued duration under the strict condition.
>
> The code on pp.24–25 chooses the more conservative $T>2(D+\delta)$, which also satisfies this condition. It is a sufficient choice, not the minimum derived above. If $\delta$ only bounds clock readings rather than physical boundary separation, clock-rate/drift bounds are needed before making this conversion. The fuller derivation is in [lesson 7](<../../DS LESSON 7.md#Same-Round Delivery and Correctness>).

## 18. Designing adaptive timeouts for an eventually perfect detector

### Increase and decrease the timeout

H32 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 77 · ★

Suppose to be in a synchronous system with an unknown maximum channel delay. You want to create an eventually perfect P. What is a good strategy to increase, and decrease the internal timeout in such a way to:

1. Stabilise to perfect P in the fastest way.
2. Have a minimum latency when suspecting an actual crash.

> [!tip]- Hint
> Separate a heuristic for short timeouts from the property that eventually no correct process is ever suspected again.

> [!check]- Worked answer
> The objective combines two competing costs: a timeout that is too short causes false suspicions, while one that is too long delays detection of a real crash. With an unknown delay bound, there is no universally fastest timeout or known minimum detection latency. A complete answer must give a strategy and state what it guarantees.
>
> Use periodic request/reply probes to each monitored process, with sequence numbers to match replies to their probes. Let $B_q>0$ be a persistent timeout floor. On evidence that a timed-out probe to $q$ eventually receives its matching reply, increase the floor geometrically, for example $B_q\gets2B_q$. This is evidence of a false suspicion for that probe, not merely the arrival of an unrelated packet. Retain timestamps and expired probe IDs long enough to identify it.
>
> A separate recent-delay estimate $E_q$ can decrease when replies become faster. Choose the operational timeout as
>
> $$
> \tau_q=\max(B_q,E_q).
> $$
>
> Thus the heuristic can reduce an oversized estimate, but cannot undo the persistent floor that was learned from false suspicions. Match every timeout to its own still-unanswered probe, clear suspicions on replies, and continue probing suspected processes. A crashed process eventually produces no new replies and remains suspected.
>
> For a correct process, synchrony supplies some finite bound $R$ on probe response time, including local processing and the return path. If infinitely many false timeouts occurred, infinitely many matching late replies would eventually arrive and double $B_q$; after finitely many such increases it would exceed $R$, making further false timeouts impossible. Thus false suspicions are finite, giving eventual strong accuracy. Periodic probes and finite timeouts give strong completeness. This implements $\Diamond P$.
>
> Unrestricted multiplicative decrease is unsafe for this specification: even with constant real delay, repeatedly dropping below it can create infinitely many false suspicions. A decrease rule therefore needs the floor above, or another proof that its probing reductions cause only finitely many mistakes. If the probe period is $H$, detection after stabilization is on the order of one probe interval plus its timeout. This is a tradeoff bound, not a claim of an optimal latency for every unknown network.

## 19. Comparing solvability across system models

### Synchronous versus fail-stop

H34 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 78

Describe two problems that can be solved in sync but not in fail-stop. Describe one problem that can be solved in fail-stop but not in sync.

> [!tip]- Hint
> Check whether one model can implement the abstractions supplied by the other before looking for examples in both directions.

> [!check]- Worked answer
> Here **synchronous** means reliable communication with known bounds on communication and processing, while **fail-stop** means asynchronous reliable communication augmented with a perfect failure detector $P$. Compare the same crash patterns and process assumptions in both models.
>
> Two requirements available with synchrony but not guaranteed in asynchronous fail-stop are:
>
> 1. **Known bounded-time message delivery to a correct receiver.** After sending, return within a specified bound once the receiver has obtained the message. A synchronous system can use its delay and processing bounds. In the asynchronous model, even between two correct processes, a legal delay may exceed any proposed deadline; $P$ cannot declare either process faulty.
> 2. **Known bounded-time crash notification.** Detect a crashed process within a fixed delay after its crash. Synchronous heartbeat schemes can provide such a bound. The specification of $P$ gives eventual detection, with no bound on when the notification arrives.
>
> **The requested example in the other direction does not exist under this model comparison.** A synchronous system can implement $P$ and reliable links, so it can run any algorithm that only needs the fail-stop abstractions. In that sense it is at least as strong. There is no problem solvable in fail-stop but impossible in synchrony merely because one model exposes a detector and the other exposes timing bounds.
>
> Changing the failure budget, the task, or the meanings of “sync” and “fail-stop” could change the comparison. With the course's definitions, the last request is a check of model inclusion rather than an invitation to invent a separating problem.

## 20. Designing fault-tolerant mutual exclusion with leader changes

### Fault-tolerant mutual exclusion — code and proofs

H36 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 77

Write code and proofs of the Fault Tolerant ME algorithm explained before.

Use the algorithm description in the same PDF, pp. 75–76.

> [!tip]- Hint
> A new coordinator must account for both an occupied CS and an old grant still in transit. A snapshot saying “not inside” is not enough by itself.

> [!check]- Worked answer
> Use reliable links, a perfect detector $P$, and a perfect leader election implemented by choosing the minimum ID not yet detected as crashed. A live leader is never replaced by a different live leader. Every correct process that enters the CS must eventually release it. A crash removes that process from the active execution, including any CS occupancy; retaining an external resource after a crash would require a different resource model.
>
> Each leader tenure has a unique identifier $e$ (the elected leader's ID suffices for this monotone crash-stop election). Each client has at most one outstanding request and state `OUT`, `WAIT(id)` or `IN(id)`, with a monotonically increasing state version. A coordinator reserves `owner` **when sending a grant**, not when receiving confirmation that the client entered. Otherwise two grants could be in transit simultaneously.
>
> The following pseudocode gives the protocol's main actions. `Update(p,v,s)` retains only the highest-version client state, queues new waiting requests once in arrival order, and removes released or crashed requests. Incoming client messages are matched to their tenure and request IDs.
>
> ```text
> at client p:
>     state := OUT; version := 0; tenure := none
>
>     on Request:
>         create fresh id
>         state := WAIT(id); version++
>         send STATE(tenure, version, state) to current leader
>
>     on RECOVER(e) from the currently elected leader:
>         tenure := e                 // invalidate grants from older tenures
>         version++
>         send STATE(e, version, state) to that leader
>
>     on GRANT(e, id) from the current leader:
>         if tenure = e and state = WAIT(id):
>             state := IN(id); version++
>             send STATE(e, version, state) to leader
>             trigger Grant to application
>
>     on Release with state = IN(id):
>         state := OUT; version++
>         send STATE(tenure, version, OUT) to current leader
>
>     on learning a new leader:
>         keep state and outstanding id
>         send HELLO to that leader    // leader replies with RECOVER
>
> at a newly elected leader e:
>     mode := RECOVERY; owner := none
>     reports := empty; queue := empty; latest := empty
>     send RECOVER(e) to every process not detected as crashed
>
>     on STATE(e, v, s) from p:
>         record that p has answered this recovery
>         Update(p, v, s)
>         if s is the newest state IN(id): owner := (p, id)
>         if p = owner.process and its newest state is OUT:
>             owner := none
>
>     on Crash(p):
>         remove p from required recovery replies and queue
>         if owner.process = p: owner := none
>
>     when all processes not detected as crashed have answered:
>         mode := NORMAL
>
>     when mode = NORMAL and owner = none and queue not empty:
>         take oldest still-valid WAIT(id) of a noncrashed p
>         owner := (p, id)
>         send GRANT(e, id) to p
> ```
>
> In normal mode the same `STATE` and crash handlers maintain the owner and queue. The leader accepts no new grant decision until the recovery barrier finishes. If multiple state messages arrive out of order, version comparison applies **before** changing `owner`; the state tests in the pseudocode refer to the retained newest report, never to a stale message.
>
> **Why delayed grants are safe.** If an old grant arrives before its client handles `RECOVER(e)`, the client may enter and its recovery report says `IN`. If it arrives afterward, the old tenure is rejected. Thus a report saying `OUT` or `WAIT` cannot later be invalidated by entering on an old grant. A reported holder remains reserved until its release or a genuine crash notification.
>
> **Safety.** One live leader exists at a time and reserves at most one owner. A successor grants only after every surviving process has either invalidated old grants or reported its current occupancy. Genuine crash notifications never remove a live holder. These facts preserve at most one active CS occupant through normal service and leader replacement.
>
> **Liveness.** After finitely many crashes, a correct leader remains. Every correct process eventually answers recovery, while $P$ eventually removes every crashed process from the barrier. The current correct holder eventually releases, and FIFO service then reaches every correct queued request. Clients resend their outstanding IDs on leader changes, and duplicates are not queued twice.
>
> FIFO here means the service order of the current coordinator's queue. Recovering the exact original arrival order across a leader crash would require persisting or replicating that order, which the two-slide sketch does not provide. The protocol ensures starvation freedom, not an unrecorded global physical order of all pre-crash requests.

## 21. Assessing whether fault-tolerant mutual exclusion is possible

### Fault-tolerant mutual exclusion in fail-silent and fail-noisy models

H38 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 80

Do you think that is possible to solve fault-tolerant mutual exclusion in a fail-silent system? (Write your considerations, they do not have to be a formal proof)

Do you think that is possible to solve fault-tolerant mutual exclusion in a fail-noisy system? (Write your considerations, they do not have to be a formal proof)

> [!tip]- Hint
> Compare a holder that crashed before releasing with a correct holder that has merely stopped taking steps for a long finite interval.

> [!check]- Worked answer
> Under the course's crash-tolerant ME requirement, a correct requester must eventually enter even if the current holder crashes, and safety forbids simultaneous occupancy at any time. **Neither fail-silent nor fail-noisy is sufficient in general for this requirement.**
>
> Take two processes, with $p$ inside the CS and $q$ requesting it. In an execution where $p$ crashes without releasing, liveness requires $q$ to enter after some finite prefix. Now reproduce that prefix with $p$ correct but paused inside the CS, and delay all its messages. An asynchronous fail-silent system gives $q$ no observation distinguishing the two prefixes. It therefore enters in the second execution too, while $p$ still holds the CS: safety fails. Afterwards resume $p$ to make the execution fair; the finite safety violation remains.
>
> A fail-noisy detector $\Diamond P$ does not remove this indistinguishability. It may falsely suspect the paused correct holder throughout an arbitrarily long finite prefix and become accurate later. Hence treating its suspicion as permission to reassign the resource can still violate safety before stabilization.
>
> A perfect detector can safely remove a genuinely crashed holder, which is why the preceding construction uses $P$. Leases, fencing at an external resource, or relaxing safety to hold only eventually would change the problem. Also distinguish the classical non-fault-tolerant setting, where liveness may assume that every holder eventually releases: that weaker specification does not require recovering from a holder's crash.

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

> [!tip]- Hint
> A safety violation has a finite witness. Ask which finite detector-output histories are compatible with eventual perfection; then analyze the two All-Ack detector properties separately.

> [!check]- Worked answer
> **H40: violating eventual perfection cannot by itself cause a safety violation in an algorithm correct for every $\Diamond P$ history.** Suppose a bad detector history produced a finite safety violation. Keep that finite prefix and then make the detector permanently accurate and complete. Eventual perfection allows an arbitrary finite mistake prefix, so this extended history is legal for $\Diamond P$, yet it contains the same safety violation. That contradicts correctness under $\Diamond P$.
>
> This argument assumes the usual asynchronous model and a detector whose outputs have the required format. It does not say that an algorithm remains live under an arbitrary detector. Nor does it apply to replacing $P$: a false suspicion is already forbidden in a finite prefix of a perfect-detector history.
>
> **H42: an explicit liveness counterexample.** Let $M$ be Uniform Reliable Broadcast, let $A$ be the All-Ack algorithm, and let $D=P$. Take a correct broadcaster $p$ and a process $q$ that crashes before acknowledging $p$'s message. With $P$, strong completeness eventually removes $q$ from the required ACK set, so the correct processes can deliver. If the detector instead outputs the empty suspect set forever, they wait for $q$ forever and validity is violated. The lower-level links and all surviving processes can remain correct; the missing detector property alone prevents progress.
>
> **H44: All-Ack URB with a violation of strong accuracy.** Let a faulty broadcaster send $m$ only to $b$, then crash. Let $b$ falsely suspect the remaining correct process $c$, relay $m$, obtain its own ACK evidence, and deliver while considering only itself alive. Then let $b$ crash before its best-effort relay reaches $c$. A faulty process has delivered, but correct $c$ never sees $m$: uniform agreement is violated. This execution is possible because false suspicion removed the correct process from the ACK requirement. No creation and no duplication are still enforced by the message checks and `delivered` set.
>
> **H44: All-Ack URB with a violation of strong completeness.** If a process crashes without relaying $m$ and is never removed from `correct`, the condition `correct subset ack[m]` can remain false forever. A correct broadcaster's message may then never be delivered: validity/liveness fails. Assuming strong accuracy still holds, waiting too long does not justify a premature delivery and does not break the uniform-agreement safety argument.
>
> **H45: Lazy RB with $\Diamond P$ instead of $P$.** Regular RB still works. A false suspicion causes extra retransmissions, which do not create new messages or duplicate upper-layer deliveries. If a correct process receives a message from a sender that really crashes, eventual strong completeness eventually causes forwarding; the code handles both receiving-before-suspecting and suspecting-before-receiving. Once a correct process rebroadcasts, BEB reaches every correct process. Because the slide removes suspected senders permanently, a false suspicion can increase traffic for later messages too. The original optimization is affected, but the regular RB specification remains satisfied. This conclusion does not extend to All-Ack URB, whose safety uses strong accuracy.

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

> [!tip]- Hint
> Identify any process that the failure restriction guarantees to be correct. For impossibility, leave two potential leaders connected only by unreliable channels.

> [!check]- Worked answer
> Use **perfect LE**, as in the course, rather than the weaker eventual-leader abstraction $\Omega$. For reference, name the four positions top-left $p_1$, top-right $p_2$, bottom-left $p_3$, and bottom-right $p_4$; the figure itself does not label them. Read arrow directions from the PDF. In system 2, $p_3$ has only outgoing type-A channels, whereas the other positions have outgoing type-B channels.
>
> **1. System 1, arbitrary crashes: possible.** Every pair of surviving processes is connected by bounded type-A communication. Implement a perfect heartbeat detector using the known delay and processing bounds and elect the minimum ID not detected as crashed. In round-based notation:
>
> ```text
> initialize alive := all process IDs
> in every sufficiently long synchronous round:
>     send BEAT(round) to every other process
>     collect this round's beats until the safe deadline
>     permanently remove any missing sender from alive
>     output min(alive)
> ```
>
> Choose deadlines to avoid false suspicions, including startup alignment and local processing. Two live processes cannot disagree on a live minimum: a higher candidate could be chosen only after removing the lower one, which requires its actual crash. Eventually all correct processes remove all failed lower IDs and elect the same correct minimum, provided at least one process survives.
>
> **2. System 2, only processes with outgoing B channels may crash: possible.** Position $p_3$ cannot crash under this restriction. If its ID is known, all processes simply output $p_3$ from initialization. With only the local outgoing-channel information stated in the question, each process checks whether all its outgoing channels are A. The unique such process is $p_3$: it sends `CANDIDATE(self)` on its outgoing A links to the other three processes; each receiver elects that ID, and $p_3$ elects itself. Crash-stop processes follow this rule honestly, and bounded A delivery from the guaranteed-correct candidate supplies the announcements. No unreliable message is needed to certify its survival.
>
> **3. System 2, arbitrary crashes: impossible in general.** The formerly guaranteed-correct $p_3$ may now crash. Among the remaining positions, communication needed to distinguish candidate failures relies on B channels. In particular, leave two positions connected only by B while the others crash. A finite absence of B messages is compatible both with a peer crash and with losses/delays while both peers are alive. LE must eventually elect a surviving candidate in each single-survivor execution. Reproduce those two finite decision prefixes with both candidates alive and their B traffic absent: they can elect different live leaders, violating perfect LE accuracy.
>
> **4. System 3, arbitrary crashes: likewise impossible in general.** The one solid diagonal does not protect every possible surviving pair. Let its useful endpoint(s) crash and retain a pair whose only communication is B. The same indistinguishability argument applies. This answer takes the arbitrary-crash setting of question 3; a separate restriction guaranteeing a particular process correct would change it.
>
> The stated $p_{\rm cons}<1$ is not a deterministic delivery deadline, nor does it assert independence across transmissions. Repeating B packets therefore does not implement perfect failure detection. Even with independent positive success probability, a finite all-loss prefix has nonzero probability, so a timeout-based deterministic perfect-LE guarantee cannot be inferred from it. Probabilistic or eventual-election specifications need their own assumptions.

## 24. Checking quorum thresholds in uniform reliable broadcast

### Majority-Ack with |F| = n/2 + 1

H47 · `DS-1920-07-Broadcast.pdf` · PDF p. 41

If |P| = n and |F| = n/2 + 1, does this algorithm work? The slide gives Algorithm 3.5 with `candeliver(m)` returning `#(ack[m]) > |F|`.

The homework uses the threshold printed on p. 41. Use Algorithm 3.4 on p. 57 for the shared pseudocode.

> [!tip]- Hint
> Let all faulty processes stop without sending ACKs, and compare the maximum remaining ACK count with the strict threshold on the slide.

> [!check]- Worked answer
> **The algorithm does not guarantee validity/termination with that failure allowance.** Its condition is
>
> $$
> |\operatorname{ack}[m]|>|F|.
> $$
>
> If $|F|=n/2+1$ processes crash without contributing an ACK, only $n-|F|=n/2-1$ processes remain. Even a correct broadcaster can collect at most that many distinct ACKs, which cannot exceed $|F|$. Its message remains pending forever. For example, with $n=6$ and four crashes, two survivors cannot collect the five ACKs required by `ack > 4`.
>
> The safety motivation for the threshold is still understandable: more than $|F|$ ACKs would include a correct process, whose relay reaches all correct processes. But that threshold is attainable in every permitted execution only when $n-|F|>|F|$, or $n>2|F|$. The premise of a correct majority is therefore needed for liveness. Distinguish the maximum allowed number of failures used in the threshold from ACKs that happen to arrive before actual crashes.

## 25. Reducing Lazy Reliable Broadcast message cost

### Variation of Exercise 3.2 — Lazy RB message cost

H48 · `DS-1920-07-Broadcast.pdf` · PDF pp. 50–51, 56

Modify the “Lazy Reliable Broadcast” algorithm (Algorithm 3.2) to reduce the number of messages sent in case of k failures (with k < n) to k*n (written as O(k*n) on p. 51).

**Cost analysis (p. 56).** There are at most k leaders. Why? To do alone: write the pseudocode.

Starting execution diagram on p. 50. Original Algorithm 3.2 on p. 12. Further diagrams on pp. 52–55.

> [!tip]- Hint
> Cache the message at every recipient, but permit only the current leader to rebroadcast it after the original sender crashes. Account for the final correct leader in the cost.

> [!check]- Worked answer
> Use BEB, perfect point-to-point links, $P$, and the minimum-ID leader derived from $P$. Each broadcast has a unique key `(origin, id)`. Correct recipients keep its payload even after upper-layer delivery, because it may have to survive a later leader change.
>
> ```text
> initialize failed, seen, relayed, forwarded := empty sets
> cache := empty map
> leader := minimum process ID
>
> procedure Repair:
>     for each cached key with origin in failed:
>         if leader = self and key not in relayed:
>             relayed.add(key)
>             beb.Broadcast(DATA(key, cache[key]))
>         else if leader != self and (leader, key) not in forwarded:
>             forwarded.add((leader, key))
>             pl.Send(leader, FORWARD(key, cache[key]))
>
> on rb.Broadcast(m):
>     allocate fresh key := (self, nextID)
>     beb.Broadcast(DATA(key, m))
>
> on beb.Deliver(_, DATA(key, m)) or pl.Deliver(_, FORWARD(key, m)):
>     cache[key] := m
>     if key not in seen:
>         seen.add(key)
>         trigger rb.Deliver(key.origin, m)
>     Repair()
>
> on P.Crash(p):
>     failed.add(p)
>     leader := minimum ID outside failed
>     Repair()
> ```
>
> A forwarding recipient may cache a message before it knows the origin failed or before it becomes leader. Running `Repair` both on reception and on failure/leader changes covers these orders. Forward once per **leader and key**, not just once globally: the old leader may crash before relaying.
>
> **Correctness.** A correct original broadcaster's BEB reaches all correct processes. If the original broadcaster crashes and some correct process delivers, that process retains the message. Eventually it detects the crash and forwards to a leader; if that leader fails, it forwards again on the change. Eventually a correct leader receives the message and BEB-broadcasts it, so all correct processes deliver. The unique key and `seen` enforce no duplication; forwarding only cached messages enforces no creation.
>
> **Cost per message.** If $k$ processes crash, there are at most $k$ failed leaders plus one final correct leader, hence at most $k+1$ tenures. Each process forwards to each tenure at most once, and each leader makes at most one $O(n)$ rebroadcast. Including the initial broadcast, the bound is $O((k+1)n)$. For a message whose origin crashes, $k\ge1$, so this is $O(kn)$ as requested. For $k=0$, it is $O(n)$, not zero. The slide's “at most $k$ leaders” should be read with care: the final correct leader must also be counted unless a different counting convention is explicitly used.

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

> [!tip]- Hint
> After a crash, a new edge may connect processes that were not previously neighbours. Decide which old messages must cross that edge.

> [!check]- Worked answer
> Flood each newly seen message along the current line and retain it. When an oracle event introduces a new neighbour, replay the cache to that neighbour. Merely forwarding on first receipt is insufficient: a failed intermediate process may have prevented a message from crossing before the topology changed.
>
> ```text
> initialize cache := empty map
> initialize delivered := empty set
> LEFT, RIGHT := initial neighbours
>
> procedure Accept(key, m):
>     if key not in cache:
>         cache[key] := m
>         if key not in delivered:
>             delivered.add(key)
>             trigger rb.Deliver(key.origin, m)
>         for q in {LEFT, RIGHT} excluding NULL:
>             pl.Send(q, DATA(key, m))
>
> on rb.Broadcast(m):
>     allocate fresh key := (self, nextID)
>     Accept(key, m)
>
> on pl.Deliver(_, DATA(key, m)):
>     Accept(key, m)
>
> on Left_neighbour(q):
>     LEFT := q
>     if q != NULL:
>         for (key, m) in cache: pl.Send(q, DATA(key, m))
>
> on Right_neighbour(q):
>     RIGHT := q
>     if q != NULL:
>         for (key, m) in cache: pl.Send(q, DATA(key, m))
> ```
>
> The algorithm sends only on current neighbour edges and uses neither $P$ nor LE. Unique keys distinguish broadcasts with equal payloads.
>
> **Validity and agreement.** There are finitely many crash-stop processes, so after the last crash and the corresponding oracle updates, the surviving correct processes form a connected line. A correct process that has delivered a message keeps it. Across each final edge, either the message is first accepted after that edge was installed, causing forwarding, or it was already cached when the neighbour was installed, causing replay. Perfect links between the two correct endpoints eventually deliver it. Induction along the final line reaches every correct process. Apply this argument to the correct broadcaster for validity, or to any correct delivering process for regular agreement.
>
> No-creation follows because only a broadcast creates a key and the crash-stop processes only forward such records. The `delivered` set prevents duplicate indications. Keeping the entire cache is permitted here; bounded-memory reclamation would need an additional protocol and is not part of the question.

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

> [!tip]- Hint
> Extract message dependencies from send order and delivery-before-broadcast edges. Distinguish complete delivery permutations from ordering-only histories that may omit messages.

> [!check]- Worked answer
> Write a delivery history as a sequence of message numbers. A full sequence lists each of $m_1,m_2,m_3,m_4$ once. **Causal order** requires delivering a dependency before the message depending on it. **FIFO order** preserves each broadcaster's own message order. **Total order** requires processes that deliver the same two messages to agree on their relative order; by itself it does not require delivering every message.
>
> **H51, PDF p.38.** The broadcast dependencies are
>
> $$
> m_1\to m_2\to m_4,\qquad m_3\to m_4.
> $$
>
> Process $P_1$ delivers $m_1$ before broadcasting $m_2$; $P_2$ broadcasts $m_3$, delivers $m_2$, and then broadcasts $m_4$. Messages $m_1$ and $m_3$ are independent in this dependency graph. Its topological permutations are `1234`, `1324`, and `3124`.
>
> 1. **Total and causal.** The existing history already has $P_1$ deliver $m_1$ before $m_3$ has been broadcast, so a common full sequence cannot be `3124`. The possible common full sequences are therefore **`1234` and `1324`**. Insert the missing deliveries into each correct process's row according to the chosen sequence. The crashed $P_3$ may retain only its existing history `12`. If it also delivers $m_3$ in a `1324` completion, insert that delivery between its existing deliveries of $m_1$ and $m_2$. No delivery can be added after its crash.
> 2. **Total but not causal, assuming only ordering as requested.** One completion is $P_1$: `1234`, $P_2$: `234`, $P_3$: `12` before its crash, $P_4$: `34`. Every row is a subsequence of the same total order `1234`, so all common pairs agree. But $P_2$ delivers $m_2$ without delivering its dependency $m_1$, and $P_4$ delivers $m_4$ without $m_1,m_2$: causal delivery fails. This completion deliberately makes no reliable-delivery claim.
> 3. **FIFO but neither causal nor total.** Complete the correct rows as $P_1$: `1234`, $P_2$: `2134`, $P_4$: `3421`, leaving $P_3$: `12` before crashing. The only nontrivial same-broadcaster constraint is $m_3$ before $m_4$, since both are broadcast by $P_2$; every row respects it. At $P_2$, delivery `2` before `1` violates causality. Processes disagree on the order of common messages, so total order fails too.
>
> If question 2 additionally requires Reliable Broadcast and every correct process to deliver all four messages, **no such completion exists for this fixed diagram**. The existing deliveries force $m_1<m_2$ at $P_1$, $m_2<m_4$ at $P_2$, and $m_3<m_4$ at $P_4$. A shared full total order must respect all three, which are precisely the causal dependencies. Omitting the reliability assumption is therefore essential to the ordering-only example, not a missing delivery to add later.
>
> **H52 / H53, Ordered Communications p.37 / Registers I p.94.** Here $P_1$ broadcasts $m_1,m_2$, $P_2$ delivers $m_2$ before broadcasting $m_4$, and $P_3$ broadcasts independent $m_3$. In particular, the delivery of $m_3$ at $P_1$ occurs *after* its broadcast of $m_2$ and does not create $m_3\to m_2$ or $m_3\to m_4$. The dependency chain is $m_1\to m_2\to m_4$, with $m_3$ independent. The full causal permutations are **`1243`, `1234`, `1324`, `3124`**. At $P_1$, keep its fixed delivery of $m_1$ before $m_3$, so only the first three fit that row. Other rows must likewise retain their fixed events. For FIFO without causality, keep the same-broadcaster order $m_1<m_2$ everywhere, but let $P_3$ deliver `1432`, placing $m_4$ before its dependency $m_2$. At $P_1$ use `1324`, and at $P_2$ insert $m_1$ before its existing $m_2$, then deliver $m_3,m_4$ in that order. These completions preserve the shown events and sender order.
>
> **H54, Ordered Communications p.36.** Its dependencies are $m_1\to m_2\to m_4$ and $m_3\to m_4$, so the full causal permutations are **`1234`, `1324`, `3124`**. They describe causal delivery orders, not a requirement that different receivers choose the same one. At the middle process, retain the shown delivery of $m_1$ and insert the other deliveries in the chosen order; an added delivery of $m_3$ can precede that fixed delivery because $m_3$ has already been broadcast. At the bottom process, insert delivery of $m_1$ before its already shown delivery of $m_2$. Prefixes are allowed if delivery of every message is not required, but a prefix may not skip a dependency of a message it delivers.
>
> **H55, Registers I p.92, suffix after $t$.** It has the same dependencies as H54. At the middle process, $m_1$ was delivered before $t$, so the possible complete suffixes are **`234` and `324`**. At the top and bottom processes no delivery is shown before $t$; the complete suffixes are `1234`, `1324`, or `3124`, subject to inserting $m_1$ before the bottom process's fixed delivery of $m_2$. Broadcasts before $t$ do not count as deliveries before $t$.

## 28. Comparing causal delivery specifications

### Exercise 3.11 — two causal delivery definitions

H56 · `DS-2324Ordered_communications_1_NOSOLUTION.pdf` · PDF p. 39

Compare the causal delivery property of Module 3.9 with the following property: “If a process delivers messages m₁ and m₂, and m₁ → m₂, then the process must deliver m₁ before m₂.”

**CRB5 (Causal delivery).** For any message m₁ that potentially caused a message m₂, i.e., m₁ → m₂, no process delivers m₂ unless it has already delivered m₁.

> [!tip]- Hint
> Test a receiver that delivers only the causally later message. An implication about two delivered messages can then become vacuous.

> [!check]- Worked answer
> The proposed alternative is **weaker** than CRB5. CRB5 says that delivering $m_2$ requires having already delivered every causally preceding $m_1$. It therefore implies the stated relative order whenever both messages are delivered.
>
> The converse fails. Let $p$ broadcast $m_1$, let $q$ deliver it and then broadcast $m_2$, and let receiver $r$ deliver only $m_2$. We have $m_1\to m_2$. The alternative property is satisfied at $r$ because its premise that both messages are delivered is false. CRB5 is violated immediately upon delivery of $m_2$ without the earlier delivery of $m_1$.
>
> Even if reliable delivery eventually supplies $m_1$, delivering it later would not repair CRB5's earlier violation; it would also make the alternative's reversed pair visible. Thus distinguish a dependency that is missing now from a condition tested only on pairs that the process actually delivers.

## 29. Separating causal delivery from reliable-broadcast agreement

### Exercise 3.12 — causal best-effort broadcast

H57 · `DS-2324Ordered_communications_1_NOSOLUTION.pdf` · PDF p. 41

Can we devise a best-effort broadcast algorithm that satisfies the causal delivery property without being a causal broadcast algorithm, i.e., without satisfying the agreement property of a reliable broadcast?

Use CRB5 on the same page: for any m₁ → m₂, no process delivers m₂ unless it has already delivered m₁.

The follow-up diagrams on pp. 42–44 show a sender crash and ask what happens if p₂ does not generate any more messages.

> [!tip]- Hint
> If a correct broadcaster depends on a message from a faulty sender, other receivers still need that dependency. Consider carrying the causal past with the new broadcast.

> [!check]- Worked answer
> **Yes, causal delivery and best-effort validity can be achieved without reliable-broadcast agreement.** One construction piggybacks the complete causal past on each best-effort broadcast. It uses unbounded metadata, which the question does not forbid.
>
> Maintain an ordered history of every message locally broadcast or delivered, deduplicated by unique message ID. To broadcast $m$, send the preceding history plus $m$ using BEB, then include $m$ in local history for future broadcasts. Upon receiving such a bundle, deliver its previously unseen entries in their listed causal order, updating local history before delivering the final new message. Histories must include payloads, not just identifiers, so dependencies from a faulty broadcaster can actually be delivered.
>
> ```text
> initialize history := empty ordered list; delivered := empty set
>
> on cbeb.Broadcast(m):
>     assign fresh key to m
>     beb.Broadcast(history followed by (key, m))
>     append (key, m) to history if absent
>
> on beb.Deliver(_, bundle):
>     for each (key, m) in bundle in order:
>         if key not in delivered:
>             delivered.add(key)
>             append (key, m) to history if absent
>             trigger cbeb.Deliver(key.origin, m)
> ```
>
> The locally maintained list respects dependencies because a dependency is recorded before any later broadcast or delivery that can depend on it. Each bundle therefore contains all predecessors of its entries. Delivering in that order establishes CRB5. A correct broadcaster's bundle reaches every correct process by BEB, establishing best-effort validity; unique keys enforce no duplication and copied histories preserve no creation.
>
> Agreement can still fail: a faulty process broadcasts $m$ only to correct $q$ and crashes. Process $q$ delivers $m$ but never broadcasts again. No bundle subsequently carries $m$ to another correct receiver, so that receiver never delivers it. Causal delivery holds because there is no later dependent delivery there, while reliable-broadcast agreement fails.
>
> Simply buffering vector-clock messages until dependencies arrive is not enough for this construction: if a correct broadcaster's message depends on a faulty sender's missing message, it could remain blocked forever, violating even best-effort validity. Carrying the dependency payloads is what avoids that problem.

## 30. Testing changes to hierarchical consensus

### Hierarchical Uniform Consensus — BEB in place of RB

H58 · `DS-1920-Consensus.pdf` · PDF p. 35

What happens if we use Beb instead of Rb?

Use the pseudocode on this page. The replacement concerns dissemination of the DECIDED message, which the algorithm broadcasts and delivers through RB.

### Variation — Hierarchical Consensus — remove a rank guard

H59 · `DS-1920-Consensus.pdf` · PDF p. 33

What happens if we remove the highlighted condition `r > proposer` from the DECIDED-message handler of Algorithm 5.2?

Use the pseudocode and circled guard on p. 33.

> [!tip]- Hint
> For the BEB replacement, inspect the guard that stops a process from proposing after it has decided. For the rank-guard removal, try delivering an older proposal after a newer one.

> [!check]- Worked answer
> **H58: replacing RB with BEB can break termination.** Use ranks $1,2,3$, with $p_1$ faulty and $p_2,p_3$ correct. Process $p_1$ BEB-broadcasts proposal $v$ and receives the required ACKs from $p_2,p_3$ (plus the normal local contribution). It sends `DECIDED(v)` using the proposed BEB replacement, reaches only $p_2$, and crashes.
>
> Process $p_2$ decides $v$. Process $p_3$ has seen the proposal and ACKed it, but has not received the decision. After detecting $p_1$'s crash, it moves to round two, retaining $v$ as its proposal. It now waits for the rank-two process.
>
> But $p_2$ is correct and has already decided. Its own proposal-broadcast guard includes `decision = bottom`, so it does not begin the normal rank-two proposal/ACK sequence. Process $p_3$ cannot skip a correct $p_2$ using $P$, and no reliable decision relay reaches it. It can wait forever. With RB, a correct delivery of `DECIDED(v)` by $p_2$ guarantees its eventual delivery to $p_3$, independently of this guard. The failure demonstrated is termination; merely noting that all processes saw the initial proposal would miss it.
>
> **H59: removing `r > proposer` can break agreement.** Use three ranks again, with proposed values $v_1\ne v_2$:
>
> 1. $p_1$ broadcasts `[DECIDED,v_1]` and crashes; delay that message to $p_3$ and omit it at $p_2$.
> 2. Both correct processes detect the crash. Process $p_2$ advances to its own round, retains $v_2$, broadcasts it, and decides $v_2$.
> 3. Deliver $p_2$'s message to $p_3$. It sets `proposal := v_2`, `proposer := 2`, and can advance to round three.
> 4. Before $p_3$ executes its own-round broadcast, deliver the delayed message from $p_1$. Without the removed condition, rank one overwrites `proposal` with $v_1$ and `proposer` with one, even though rank two's newer information was already adopted.
> 5. Process $p_3$ broadcasts and decides $v_1$ in its own round.
>
> The two correct processes disagree. With the guard present, $1>2$ is false and the delayed rank-one proposal cannot overwrite the rank-two one. Perfect failure detection does not prevent old messages sent before a crash from arriving afterward.

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

> [!tip]- Hint
> For each read, mark completed preceding writes and overlapping writes. Then test whole combinations of answers against one common linearization.

> [!check]- Worked answer
> Let the initial value be $\bot$. A regular read may return the last preceding completed value or a value from an overlapping write, using the course's register semantics. Atomicity additionally requires one sequential explanation of **all** operations, respecting real-time precedence. Individual sets of possible read values are therefore not enough to describe all atomic executions.
>
> **H60, multiple writers, PDF p.89.** Write $W_1$ for `write(1)` at $P_1$, $W_3$ for `write(3)` at $P_4$, and $W_2$ for the incomplete `write(2)` at $P_3$. The displayed intervals impose $W_1<W_3<W_2$ on completed/participating writes: $W_3$ finishes before $W_2$ begins. The possible values of each read are:
>
> | Read | Regular | Atomic, considered individually | Reason |
> | --- | --- | --- | --- |
> | $R_1$ | $\{1\}$ | $\{1\}$ | After $W_1$, before either later write. |
> | $R_2$ | $\{1,3\}$ | $\{1,3\}$ | Overlaps $W_3$, finishes before $W_2$. |
> | $R_3$ | $\{1,3,2\}$ | $\{1,3,2\}$ | Starts during $W_3$ and ends after $W_2$ starts. |
> | $R_4$ | $\{3,2\}$ | $\{3,2\}$ | Starts after completed $W_3$ and overlaps pending $W_2$. |
>
> The atomic combinations have two further restrictions: if $R_2=3$, then $R_3\ne1$; if $R_3=2$, then $R_4=2$. With $R_1=1$, the full atomic triples $(R_2,R_3,R_4)$ are:
>
> $$
> (1,1,3),(1,1,2),(1,3,3),(1,3,2),(1,2,2),
> (3,3,3),(3,3,2),(3,2,2).
> $$
>
> For example, $(R_2,R_3)=(3,1)$ is regular but not atomic: the nonoverlapping reads would see a new value and then revert to its predecessor. The pending write may be omitted or included consistently; a crash is not a successful `WriteReturn`.
>
> **H61, single writer, PDF p.85.** Here the writes are already ordered $W_1<W_2<W_3$, and the writer crashes during $W_3$. The individual sets are:
>
> | Read | Regular | Atomic, considered individually |
> | --- | --- | --- |
> | $R_1$ | $\{1,2\}$ | $\{1,2\}$ |
> | $R_2$ | $\{\bot,1,2\}$ | $\{\bot,1,2\}$ |
> | $R_3$ | $\{2,3\}$ | $\{2,3\}$ |
> | $R_4$ | $\{2,3\}$ | $\{2,3\}$ |
> | $R_5$ | $\{2,3\}$ | $\{2,3\}$ |
>
> Read $R_2$ begins while $W_1$ is in progress and spans into $W_2$, which explains its larger set, including the initial value. Reads $R_1$ and $R_2$ overlap, as do $R_3$ and $R_4$; atomicity does not force their order from their subscripts. Both early reads finish before the later reads begin, and $R_3$ finishes before $R_5$ begins. Under the usual completion rule for pending operations described below, the atomic combinations are exactly the choices in the table **excluding $R_3=3,R_5=2$**. There are $2\cdot3\cdot2\cdot2\cdot2=48$ independent regular choices and $36$ atomic choices. The excluded twelve would make a later nonoverlapping read revert from three to two. Reads $R_4$ and $R_5$ overlap, so their return order must not be inferred from their subscripts either.
>
> To decide any full combination without guessing from the table, place one point for each completed operation within its interval, keep $W_1<W_2<W_3$, and require each read to return the latest write preceding its point. Treat incomplete $W_3$ once for the whole history: omit it if it has no effect, or complete it in an extension and choose a single position consistent with the observations. Its crash does not itself create a successful response; in-flight effects of an incomplete operation may still be observed. This linearization test supplies the joint constraint missing from independent per-read sets.

## 32. Designing an efficient single-reader atomic register

### Exercise 4.7 — efficient (1,1) atomic register

H63 · `DS-1819-10-Distributed_registers 2.pdf` · PDF p. 61

Give an algorithm that implements a (1,1) atomic register in the fail-silent model and that is more efficient than the “Read-Impose Write-Majority” algorithm (Algorithm 4.6–4.7, which implements a (1,N) atomic register in the fail-silent model).

### Variation — Exercise 4.7 follow-up — write to the only reader

H64 · `DS-1819-10-Distributed_registers 2.pdf` · PDF p. 63

Why not use the illustrated pattern where each write sends to the only reader P1 and waits for its acknowledgement? Each write is two messages in the illustrated pattern.

Use the point-to-point send and ACK diagram on p. 63.

> [!tip]- Hint
> With only one reader, that reader can remember the largest timestamp it has ever returned. Determine which part of a multi-reader read protocol this replaces.

> [!check]- Worked answer
> Use the single-writer majority-voting regular register, with timestamps increasing at each write, and a correct majority. Preserve monotone replica storage. The sole reader additionally remembers the maximum timestamp/value it has observed, and includes that memory in every read result. It no longer needs the write-back phase used to make different readers agree on how far a read has advanced.
>
> ```text
> at writer:
>     on Write(v):
>         wts++
>         send WRITE(wts, v) to all replicas
>         wait for ACK(wts) from a distinct majority
>         return WriteReturn
>
> at every replica:
>     on WRITE(t, v):
>         if t > stored.ts: stored := (t, v)
>         send ACK(t) to writer
>     on READ(rid) from reader:
>         send VALUE(rid, stored) to reader
>
> at the sole reader:
>     remembered := (0, bottom)
>     on Read:
>         rid++
>         send READ(rid) to all replicas
>         wait for VALUE(rid, _) from a distinct majority
>         remembered := maximum by timestamp of
>                       {remembered} union received values
>         return remembered.value
> ```
>
> Only one read is active at the reader at a time. Request IDs and ACK timestamps prevent old replies from satisfying a later operation. The reader's remembered value never decreases, even if an incomplete write is seen once and then absent from a later read majority.
>
> Every write completed before a read begins has reached a majority; the read majority intersects it, and monotone replica timestamps prevent returning an older value. Every returned timestamp belongs to an actual write. Together with the single reader's nondecreasing returned timestamps, these facts allow reads to be placed consistently among the single writer's ordered writes, including a pending write if it was observed. Operations by correct processes terminate because a correct majority answers.
>
> Writes use one request/reply phase, and reads now use one phase rather than two: at most about $2N$ messages per operation instead of $4N$ for a general atomic read, with two communication steps per phase. The improvement relies on having one reader; separate readers with private caches would not share this monotonic history.
>
> **H64: why not write only to the reader and wait for its ACK?** If that sole reader crashes, a correct writer waits forever, even if a majority of the other replicas survives. This violates write termination in the fail-silent model. Two messages are attractive only under an additional assumption that the reader cannot fail, or a weaker termination requirement. The majority-based construction remains live despite that crash.

## 33. Justifying request identifiers in register protocols

### Exercise 4.6 — request identifiers and acknowledgements

H65 · `DS-1819-10-Distributed_registers 2.pdf` · PDF p. 64

Explain why the request identifier included in WRITE, ACK, READ, and VALUE messages of the “Majority Voting” algorithm (Algorithm 4.2) can be omitted in the “Read-One Write-All” algorithm (Algorithm 4.1).

Algorithm excerpts in the same PDF, pp. 64–65.

> [!tip]- Hint
> After a write finishes, ask whether any still-correct replica can have an unreceived response from that earlier write.

> [!check]- Worked answer
> In **Read-One Write-All**, writes by the single writer are sequential and a write returns only after acknowledgments from every process not detected as crashed. Strong accuracy ensures that this set includes every process that is still alive. Thus every still-correct replica has processed and acknowledged the old write before the next write begins, and its old ACK has already been consumed. Perfect links do not duplicate it. A replica that was excluded really crashed and cannot participate in later writes. A late packet from an excluded process cannot replace an acknowledgment from a currently required live process.
>
> This full barrier prevents an old write from being mistaken for a later write at a live replica, and prevents an untagged old ACK from satisfying a later write's all-live acknowledgment requirement. Reads are local, so there is no network read request/response to correlate. Under these assumptions, the operation identifiers used in majority voting can be omitted.
>
> In **Majority Voting**, completing a write only accounts for one majority. A correct process outside that majority can still have an old WRITE or ACK in transit when a later write starts. If that stale ACK were counted toward the new operation, the writer could return before a majority actually stored the new value. Acknowledgment timestamps distinguish the writes. Similarly, delayed VALUE replies from an earlier read must not populate the later read's response set; `rid` identifies the read instance. Value timestamps also prevent delayed old WRITEs from overwriting newer replica values.
>
> The argument depends on sequential writes, perfect links, $P$, and crash-stop failures. It does not justify removing identifiers from an arbitrary protocol, pipelining concurrent writes, or accepting all messages from previously crashed participants as current responses.

## 34. Implementing multiwriter atomic registers across failure models

### (N,N) atomic registers on message passing

H66 · `DS-1819-10-Distributed_registers 2.pdf` · PDF p. 58

Is it possible to implement (N,N)-AR on message passing using P?

Is it possible to implement (N,N)-AR on fail-silent assuming majority of correct processes?

> [!tip]- Hint
> Give concurrent writers globally comparable tags. For a read, remember that observing a value at one responder is not enough to make later readers observe it.

> [!check]- Worked answer
> **Yes in both cases, provided the stated failure assumptions hold.** Use lexicographically ordered tags $(counter,writerID)$, initialized to $(0,\bot)$, and retain only the largest stored tag at each replica. Unique writer IDs break ties between concurrent writers. Every operation has a fresh request ID, and each phase counts distinct, matching replies.
>
> For the **fail-silent correct-majority** case, implement a multiwriter atomic register with two phases:
>
> ```text
> QUERY(rid):
>     ask all replicas for their stored (tag, value)
>     wait for replies from a distinct majority
>     return the pair with maximum tag
>
> IMPOSE(rid, tag, value):
>     send (tag, value) to all replicas
>     each replica stores it iff tag is larger, but ACKs every request
>     wait for matching ACKs from a distinct majority
>
> Write(v) at p:
>     (tag, _) := QUERY(freshID)
>     newTag := (tag.counter + 1, p)
>     IMPOSE(freshID, newTag, v)
>     return
>
> Read:
>     (tag, v) := QUERY(freshID)
>     IMPOSE(freshID, tag, v)       // write back the observed value
>     return v
> ```
>
> Local operations at each process are serialized. Two concurrent writers can choose the same counter, but their tags differ by ID. A write following a completed operation observes a tag at least that operation's tag and chooses a strictly larger one. A completed read/write imposes its tag on a majority; every later query intersects that majority and sees that tag or a newer one. Replica tags never decrease. Ordering writes by tag and placing each read after its returned write yields an atomic history; request/response phases preserve real-time precedence. A correct majority supplies termination.
>
> For the **fail-stop case with $P$**, use the same query-and-impose structure but wait in each phase for every process not yet detected as crashed, reevaluating that requirement as crash notifications arrive. Each completed phase has replies from every process that remains correct, because strong accuracy never removes one. Any two phases intersect in every surviving correct process, assuming at least one survives. Strong completeness removes nonresponding crashed participants, so operations at correct processes terminate. This tolerates up to $N-1$ crashes; a fixed majority is unnecessary because $P$ identifies genuine failures.
>
> The perfect detector and majority are alternative ways to justify both response availability and the necessary intersection. Simply using the maximum locally assigned counter without the query phase would not preserve the real-time order of writes by different writers.

## 35. Simulating message passing with atomic registers

### Message passing using (1,1) registers

H67 · `DS-1819-10-Distributed_registers 2.pdf` · PDF p. 59

Could you show how to simulate message passing using (1,1)-atomic registers?

Use the five-process communication diagram on p. 59.

> [!tip]- Hint
> A single overwritten mailbox can lose an unread message. Decide how to retain every message until the reader can identify all unseen sequence numbers.

> [!check]- Worked answer
> Allocate one atomic single-writer/single-reader register $R[p,q]$ for each ordered pair $p\ne q$. Only $p$ writes it and only $q$ reads it. A simple implementation stores an append-only sequence of messages rather than just the last payload; unbounded register values and local storage are allowed in this construction.
>
> ```text
> at sender p, for each destination q:
>     log[q] := empty sequence
>     on Send(q, m), serialized with other sends to q:
>         append (next sequence number, m) to log[q]
>         R[p,q].Write(copy(log[q]))
>
> at receiver q:
>     next[p] := 1 for each p != q
>     repeatedly poll all incoming registers fairly:
>         L := R[p,q].Read()
>         for each entry (s, m) of L in increasing sequence order:
>             if s = next[p]:
>                 next[p]++
>                 trigger Deliver(p, m)
> ```
>
> The sender serializes writes, or queues application requests and processes them fairly; it must not let an older prefix overwrite a newer one. Every written value is a prefix extension, so an entry remains available even when later sends occur. The receiver need not catch each intermediate register value: reading a later prefix reveals all earlier messages too.
>
> **Reliable delivery:** a correct sender eventually completes a write containing the message. A correct receiver polls the register again, and atomicity prevents a read begun after that completed write from returning an earlier prefix. It eventually delivers the entry. Atomic register operations by correct processes must terminate, and polling must be fair across senders.
>
> **No creation:** entries originate only in the sender's append operation. **No duplication:** the receiver advances `next[p]` once per entry, so repeated reads cannot produce another delivery. The sequence order additionally gives FIFO delivery per sender. If a sender crashes during a pending write, that write may or may not take effect; reliable delivery only requires a correct sender, so this is permitted.
>
> A register holding only the latest message would be insufficient: $p$ could overwrite $m_1$ with $m_2$ before $q$ polls. An alternative uses an acknowledgment register in the reverse direction and a stop-and-wait mailbox, with pending sends queued at $p$. That can bound the mailbox contents but does not eliminate the need to store an unbounded number of pending application requests somewhere when the interface permits them.

## Textbook homework references

The slides give the exercise numbers and book pages.

- Main Book Exercise 2.4 (book p. 67) — H68 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 77; H69 · `DS-Failure_detection_leader_election (1).pdf` · PDF p. 75.
- Main Book Exercise 2.6 (book p. 67) — H70 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 77; H71 · `DS-Failure_detection_leader_election (1).pdf` · PDF p. 75.
- Main Book Exercise 2.7 (book p. 67) — H72 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 77; H73 · `DS-Failure_detection_leader_election (1).pdf` · PDF p. 75.
- Main Book Exercise 2.10 (book p. 68) — H74 · `DS-2425Failure_detection_leader_election.pdf` · PDF p. 77; H75 · `DS-Failure_detection_leader_election (1).pdf` · PDF p. 75.

The full statements of these four textbook assignments are not available in the current archive. Their references are retained; a worked solution requires checking the actual statement first.
