we are on slide 39
we understood how increasing timeout works
in less words we have a timer, we put in suspicious the process, if the process respond after a time we put them in live ones
we want to prove why it works
in terms of strong completeness:
- Every crashed process is eventually and permanently suspected by every correct process.
Imagine two processes:
- \(P_1\) is correct and continuously monitors \(P_2\).
- \(P_2\) crashes at time \(t=10\).
After crashing, \(P_2\) cannot generate any new heartbeat replies.

Therefore, eventually, \(P_1\) receives no more replies and adds \(P_2\) to its `suspected` set.

But there's an interesting detail the professor highlights.

Suppose \(P_2\) sent a heartbeat reply before crashing, and that reply was delayed for a very long time.

It's possible that \(P_1\) receives it at \(t=100\), even though \(P_2\) crashed at \(t=10\).

In that case, \(P_1\) might temporarily execute `Restore(P₂)`!

Does this violate Strong Completeness?

No, because Strong Completeness requires eventual permanent suspicion, not immediate permanent suspicion.

Since \(P_2\) crashed, it could only have generated finitely many replies before the crash. Eventually, those old replies have all arrived, and no new replies can be produced.

From that moment onward, \(P_1\) will permanently suspect \(P_2\).

That's the first proof.

the second say
Eventually, no correct process is suspected by any correct process.
Let's use \(P_1\) and \(P_2\) again, but this time both are correct.

After GST(Global Stabilization Time), suppose every message takes at most 3 seconds to arrive.

A complete heartbeat exchange requires:

\[ 3 \text{ s (request)}+3 \text{ s (reply)}=6\text{ s} \]

![[Pasted image 20261107160107.png|464]]

If the timeout is already greater than twice the maximum one-way message delay, correct processes will not be falsely suspected during stable communication.

Otherwise, the algorithm can discover false suspicions and increase the timeout:

\[ \text{delay}\leftarrow\text{delay}+\Delta \]Because the eventual maximum message delay is finite, only finitely many increases are needed to make the timeout sufficiently large.

Once this happens, correct processes are no longer falsely suspected.

And that proves Eventual Strong Accuracy.
##### Suspected Set Agreement
Let's consider two correct processes, \(P_1\) and \(P_2\), with suspected sets \(S_1\) and \(S_2\).

The lemma states that there is a time \(T\) after which:

\[ \boxed{S_1(t)=S_2(t)\quad\forall t\ge T} \]
Case 1 — \(P_k\) is correct.

If either correct observer still suspects \(P_k\) after stabilization, that violates Eventual Strong Accuracy.

Case 2 — \(P_k\) has crashed.

If either correct observer does not suspect \(P_k\) after stabilization, that violates Strong Completeness.

Both cases contradict the guarantees of \(\Diamond\mathcal P\).

Therefore, after a sufficiently late time:

\[ \boxed{S_1=S_2=\text{set of crashed processes}} \]

And this holds for every pair of correct processes.

Here's the interesting part.

Imagine that our distributed system needs a coordinator: one process responsible for organizing some operation.

If all processes eventually agree on which processes have crashed, they can apply the same deterministic rule to select a coordinator.

For example:

> Choose the alive process with the highest ID.

If the correct processes eventually agree on the same suspected set, they will also eventually select the same leader.

That's the key insight behind the next topic: Leader Election.

##### Leader Election
Until now, we have studied Failure Detectors, which answer a question like:

“Which processes have crashed?”
But sometimes we don't need to know the status of every process. We simply need to identify one process responsible for coordinating the others.
Imagine a distributed system with four servers. Instead of having every server independently decide who can access a shared resource, we could elect one server as the coordinator.

That coordinator could manage requests and decide which server gets access first.
This gives us a new question:

“Which process should everyone recognize as the leader?”

Just like a Failure Detector, Leader Election is represented as a module exposing an event:

\[ \langle le,\operatorname{Leader}\mid p\rangle \]

It tells the application that process \(p\) has been elected leader.

The professor defines two properties:

LE1 — Eventual Detection

If at least one correct process exists, some correct process must eventually be elected leader.

In other words, the system cannot remain without a leader forever when a correct process is available.

LE2 — Accuracy

When a new leader is elected, all previously elected leaders must have crashed.

This is the stronger and more interesting property. It prevents the system from replacing a leader that is still alive with another one.

For instance, suppose \(P_1\) is the leader and is still alive. If another process elects \(P_2\) as a new leader, we would violate LE2.

The system is allowed to change leaders when the previous leader crashes, but it cannot arbitrarily replace a living leader.


picture and algorithm at slide 42

##### Example of this algorithm
we have 3 processes  pi={P_0,P_1,P_2}
initially there is P_0 as their leader, but at some point it crashes
what happens immediately after its crash?
also if we are using a perfect failure detector this does not guarantee that every process detects a crash instantaneously
It guarantees that every correct process will eventually detect it, without falsely reporting crashes.
At the third moment, \(P_1\) and \(P_2\) have different opinions about the leader.

The professor asks:

Is this execution allowed by the Leader Election specification?

Yes, it is allowed.
> If a process is elected leader, all previously elected leaders must have crashed.

When \(P_1\) becomes leader, the previously elected leader \(P_0\) has already crashed.

Therefore, LE2 is satisfied.

The fact that \(P_2\) hasn't yet updated its local view is not itself a violation.

This is an important distinction:

Leader Election does not require every process to change its leader at exactly the same instant.
Since \(P_0\) has crashed and at least one correct process remains, the system must eventually elect a correct leader.

In our example, \(P_2\) cannot continue trusting the crashed \(P_0\) forever.

Eventually, it must recognize the new leader \(P_1\).

This is why LE1 is a liveness property: it guarantees that the system eventually makes progress, but not that every process updates immediately.

trying to changing the execution like that 
EXECUTION FROM SLIDE 45

1. Initially: All processes elect \(P_0\) as leader.
    
2. Crash: \(P_0\) crashes.
    
3. First new election: \(P_1\) elects itself. \(P_2\) still trusts \(P_0\).
    
4. Second new election: \(P_2\) elects itself, although \(P_1\) is still alive.

we can notice that it doenst respect L2
> If a process is elected leader, all previously elected leaders must have crashed.

When \(P_2\) elects itself, \(P_1\) is a previously elected leader.

But \(P_1\) hasn't crashed!

Therefore, we have violated LE2.

\[ \boxed{P_1\text{ elected before }P_2 \quad\land\quad P_1\text{ still alive}} \]

>[!question]- If every process independently elects a leader, how can we guarantee that two processes won't elect two different leaders at the same time?
>(codex clear the answer please)
>First, an important clarification: when we say that \(P_1\) elects a leader, we don't mean that \(P_1\) elects itself.
> 
> Every process runs its own instance of the Leader Election module, which determines who the leader should be.
> 
> For example:
> 
> \[ \Pi=\{P_1,P_2,P_3\} \]
> 
> Suppose the algorithm uses this rule:
> 
> \[ \boxed{leader=\max(\Pi\setminus suspected)} \]
> 
> Since \(P_3\) has the highest ID, all three processes initially elect \(P_3\).
> ![[Pasted image 20261108131932.png]]
> First: Everyone uses the same rule.
> 
> All processes know the same set of process IDs and use the same ordering. So if they have the same `suspected` set, they necessarily select the same leader.
> 
> Second: The Perfect Failure Detector never makes mistakes.
> 
> Suppose \(P_3\) is alive.
> 
> Could \(P_1\) elect \(P_2\) instead?
> 
> No! To select \(P_2\), \(P_1\) would have to exclude \(P_3\) from its candidates.
> 
> But excluding \(P_3\) requires a crash notification from the Perfect Failure Detector, which cannot falsely report that a living process crashed.
> 
> Therefore, as long as \(P_3\) is alive, no process can correctly elect a different living leader.

The abstract LE2 property is phrased in terms of previously elected leaders. If two elections are genuinely simultaneous, the property alone does not fully specify how to resolve their ordering.

However, the Monarchical Leader Election algorithm on next part of the lecture avoids electing different living leaders, even when processes independently execute the election rule, because they use the same ranking and a Perfect Failure Detector.

Also, there is no requirement that every process elect its leader at precisely the same physical instant. That would be much harder to guarantee.

###### Monarchical leader election
lets see how to implement Leader Election using a Perfect Failure Detector (\(\mathcal P\)).
(slide 47 algorithm picture)
Imagine we have four processes:

\[ \Pi=\{P_0,P_1,P_2,P_3\} \]

Each process knows the complete set \(\Pi\), and every process runs the same algorithm.

The rule is simple:

Choose the process with the highest ID among those not detected as crashed.

\[ \boxed{leader=\operatorname{maxrank}(\Pi\setminus suspected)} \]

For example, if:

\[ suspected=\{P_3\} \]

then:

\[ \Pi\setminus suspected=\{P_0,P_1,P_2\} \]

and the leader becomes \(P_2\).

This deterministic rule is important: processes with the same information will make the same decision.

(this part in the upper repeats what we said a lot of time so i think we can shorten it)

algorithm explaination
this algorithm use perfect failure detector
initialize suspected as empty and leader with this symbol that means no leader has been selected yet (undefined)

next this will handle a crash with suspected whenever a perfect failure detector reports it

next we have leader election if leader is different from the max of this set, it updates the leader and then generate leader event
The professor explicitly emphasizes this. The Leader Election module simply processes crash notifications from \(\mathcal P\). The underlying Failure Detector may exchange heartbeat messages, but this election algorithm does not need its own voting protocol.
`suspected` only grows.

Why don't we have a `Restore(p)` operation like in \(\Diamond\mathcal P\)?

Because we're using the Perfect Failure Detector. When \(\mathcal P\) reports a crash, it is never a false suspicion. And under the crash-stop model used here, a crashed process never recovers.
##### Correctness
How can we prove that Monarchical Leader Election actually satisfies the Leader Election specification?
Remember that our algorithm uses a Perfect Failure Detector (\(\mathcal P\)) and elects the highest-ranked process that has not been detected as crashed.

\[ \boxed{leader=\operatorname{maxrank}(\Pi\setminus suspected)} \]

We must prove two properties: LE1 — Eventual Detection and LE2 — Accuracy.

(compact this proof but not too much thanks)
> If at least one correct process exists, some correct process must eventually be elected leader.

Let's consider four processes:

\[ \Pi=\{P_0,P_1,P_2,P_3\} \]

Suppose \(P_2\) and \(P_3\) crash, while \(P_0\) and \(P_1\) are correct.

Initially, a process might still believe that \(P_3\) is alive and keep it as its leader.

But remember Strong Completeness of the Perfect Failure Detector:

Every crashed process is eventually detected by every correct process.

Therefore, eventually, every correct process has:

\[ suspected=\{P_2,P_3\} \]

So each calculates:

\[ \operatorname{maxrank}(\{P_0,P_1\})=P_1 \]

And \(P_1\) is correct!

We have proved that as long as at least one correct process exists, the algorithm eventually elects a correct leader.

That's LE1.

LE2 says:

> Whenever a new leader is elected, all previously elected leaders must have crashed.

The professor uses a proof by contradiction.

Suppose two different processes are elected as leaders, and both are alive.

Let's say:

- One process elects \(P_{10}\).
    
- Another process later elects \(P_7\).
    
- Both \(P_{10}\) and \(P_7\) are still alive.
The professor asks:

How could the second process elect \(P_7\) instead of \(P_{10}\)?

Since the algorithm always selects the highest-ranked candidate, \(P_{10}\) must have been excluded from the candidate set.

And why would it be excluded?

Because the Perfect Failure Detector reported:

```
Crash(P10)
```

But we assumed that \(P_{10}\) is still alive!

This contradicts Strong Accuracy of \(\mathcal P\), which guarantees that no correct process is falsely reported as crashed.

Therefore, this execution is impossible.

More generally, all processes use the same total ordering of IDs, and every exclusion is based on a genuine crash. An election can move to a different candidate only after the previously selected higher-ranked candidate has crashed.
Hence LE2 holds.
#### Eventually leader election (Omega)
We have finished Monarchical Leader Election using the Perfect Failure Detector \(\mathcal P\).

Now the professor introduces a new problem. We'll examine the specification first, then study the examples and algorithm separately.
Remember our previous algorithm:

\[ leader=\operatorname{maxrank}(\Pi\setminus suspected) \]

It worked because \(\mathcal P\) never falsely suspects a living process.

But what happens in an eventually synchronous system, where we have \(\Diamond\mathcal P\) instead?
Imagine three correct processes:

\[ \Pi=\{P_1,P_2,P_3\} \]

Because network delays can initially be unpredictable, two processes might have different suspected sets:

|Process|`suspected`|Elected leader|
|---|---|---|
|\(P_1\)|\(\{P_3\}\)|\(P_2\)|
|\(P_2\)|\(\varnothing\)|\(P_3\)|

Both \(P_2\) and \(P_3\) are alive, but the two processes have elected different leaders.

This violates the Accuracy property of ordinary Leader Election.

So the professor asks: could we create a weaker Leader Election abstraction, one that allows temporary mistakes but eventually becomes reliable?

Yes. That abstraction is called Eventually Leader Election, denoted by \(\Omega\) (Omega).

the omega specification adds a new module 
(take a picture from slide 49 or 50 i dont remember)

Notice that the event is now called `Trust(p)` instead of `Leader(p)`.

It means: the local process currently trusts process p as its leader.

The important difference is that this decision may change before stabilization.

now lets take a look to this two properties
ELD1- Eventual Accuracy

The formal property says:

> There is a time after which every correct process trusts some correct process.

In simpler words:

Eventually, every correct process must trust a leader that has not crashed and will not crash.

For example, suppose \(P_3\) has crashed.

Initially, \(P_1\) might still trust \(P_3\). That's allowed.

But \(P_1\) cannot continue trusting \(P_3\) forever.

Eventually, it must trust a correct process instead.

ELD2- Eventual Agreement
The formal property says:

> There is a time after which no two correct processes trust different correct processes.

This is a different guarantee!

Consider \(P_1\) and \(P_2\), both correct.

Suppose:

- \(P_1\) trusts \(P_2\).
    
- \(P_2\) trusts \(P_3\).
    
- \(P_2\) and \(P_3\) are both correct.
    

Initially, this disagreement is permitted.

But eventually, the two processes must agree on the same correct leader.

Notice the distinction between the properties:

- ELD1 ensures that the trusted leader is correct.
    
- ELD2 ensures that the correct processes agree on that leader.
    

We need both.

Before stabilization, leaders can change arbitrarily, and different living leaders can be trusted at the same time.
we can call the moment after which the leader no longer changes the leader stabilization time.
This time is not necessarily GST.
>[!remember] Remember:
> - GST: The system's timing behavior becomes bounded.
> - Failure Detector stabilization: \(\Diamond\mathcal P\) stops falsely suspecting correct processes.
> - Leader stabilization: All correct processes permanently trust the same correct leader.


>[!example] example 1 for this properties
> 
> Everyone agrees, but the leader has crashed
> In the first execution, the professor considers four processes.
> 
> Two processes crash: \(P_2\) and \(P_3\).
> 
> The remaining correct processes are \(P_1\) and \(P_4\).
> 
> At some point, both correct processes trust \(P_3\), and their choice never changes.
> ![[Pasted image 20261108134721.png]]
> Let's examine the properties.
> 
> ELD1 — Is Eventual Accuracy satisfied?
> 
> No.
> 
> Both correct processes continue trusting \(P_3\), which has crashed.
> 
> If they keep trusting \(P_3\) forever, there is no time after which they trust a correct process.
> 
> Therefore, ELD1 is violated.
> 
> ELD2 — Is Eventual Agreement satisfied?
> 
> Yes!
> 
> Both correct processes trust the same process, \(P_3\).
> 
> They don't disagree about the leader.
> 
> The important observation is that agreement alone does not guarantee that the selected leader is correct.
> 
> That's why Ω needs both properties.
> 
> The leaders are correct, but processes disagree


>[!example] example 2
The professor now considers a different execution.
> 
> Again, \(P_2\) and \(P_3\) crash, leaving \(P_1\) and \(P_4\) correct.
> 
> But this time:
> 
> - \(P_1\) trusts \(P_4\).
>     
> - \(P_4\) trusts \(P_1\).
>     
> 
> Both trusted processes are correct. However, the two processes never agree on a single leader.
> ELD1 — Is Eventual Accuracy satisfied?
> 
> Yes.
> 
> \(P_1\) trusts \(P_4\), which is correct.
> 
> \(P_4\) trusts \(P_1\), which is also correct.
> 
> Therefore, every correct process trusts a correct process.
> 
> ELD2 — Is Eventual Agreement satisfied?
> 
> No.
> 
> The two correct processes permanently trust different leaders.
> 
> This violates ELD2.
> 
> Suppose we observe Run 2 for just ten seconds.
> 
> At that moment, \(P_1\) trusts \(P_4\), and \(P_4\) trusts \(P_1\).
> 
> Can we immediately conclude that the Ω algorithm is incorrect?
> 
> No.


(continue here)
##### How can we implement Ω using the Eventually Perfect Failure Detector \(\Diamond\mathcal P\)?
The solution is surprisingly simple: reuse Monarchical Leader Election, but replace the Perfect Failure Detector with \(\Diamond\mathcal P\).
We keep the same election rule:

\[ \boxed{leader=\operatorname{maxrank}(\Pi\setminus suspected)} \]

However, there's one important difference.

With a Perfect Failure Detector, once a process is suspected, it can never be restored.

With \(\Diamond\mathcal P\), suspicions can be wrong, so the election algorithm must handle both `Suspect(p)` and `Restore(p)`.
(put here slide 54 with the algorithm thanks)

Remember the suspected-set property from slide 40:

\[ \exists T:\quad S_i(t)=S_j(t)\quad\forall t\geq T \]

for any two correct processes \(P_i,P_j\).

Eventually, their suspected sets contain exactly the crashed processes.

Therefore, all correct processes calculate:

\[ \operatorname{maxrank}(\Pi\setminus suspected) \]

using the same set and the same total ordering.

They eventually choose the same correct process.

That's the intuition behind Ω's correctness.

###### Correctness Proof of Ω
we wants to prove that our algorithm satisfies both properties of Ω:
- ELD1 — Eventual Accuracy
    
- ELD2 — Eventual Agreement


ELD1 proof
> There is a time after which every correct process trusts some correct process.

The professor starts from Strong Completeness of \(\Diamond\mathcal P\).

Remember what Strong Completeness guarantees:

Every crashed process is eventually permanently suspected by every correct process.

Let's consider four processes:

\[ \Pi=\{P_1,P_2,P_3,P_4\} \]

Suppose \(P_3\) and \(P_4\) crash, while \(P_1\) and \(P_2\) are correct.

Eventually, every correct process's `suspected` set contains:

\[ \{P_3,P_4\} \]

It might temporarily contain other processes as well, but Eventual Strong Accuracy guarantees that correct processes will eventually stop being suspected.

So, after stabilization:

\[ suspected=\{P_3,P_4\} \]

Therefore:

\[ \Pi\setminus suspected=\{P_1,P_2\} \]

And the algorithm chooses:

\[ leader=P_2 \]

Since \(P_2\) is correct, the property is satisfied.

The professor's main reasoning: If a crashed process were trusted forever, it would mean the Failure Detector never permanently suspected that crashed process. But this would contradict Strong Completeness.

Thus, eventually, the algorithm trusts a correct process.

ELD2 proof
There is a time after which no two correct processes trust different correct processes.

This proof uses something we've already studied in slide 40: Suspected Set Agreement.

Remember the lemma:

For any two correct processes \(P_i\) and \(P_j\), there exists a time after which:

\[ suspected_i=suspected_j \]

Now suppose two correct processes have the same suspected set:

\[ suspected_1=suspected_2=\{P_3,P_4\} \]

Both independently execute:

\[ leader=\operatorname{maxrank}(\Pi\setminus suspected) \]

Since they have the same process set \(\Pi\), the same suspected set, and the same total ordering of process IDs, they must obtain the same leader.

\[ leader_1=leader_2=P_2 \]

No additional communication is required between the two Leader Election modules. Their decisions agree because their inputs eventually become identical.

And the suspected sets remain equal after stabilization, so the leader remains the same.

That proves ELD2.

##### Failure models
We've finished Failure Detectors and Leader Election. Now the professor introduces a new way of classifying distributed systems.

The question is:

How much information about process failures does our system provide?
This is important because the more information we have, the more distributed problems we may be able to solve.
three models: Fail-Silent, Fail-Noisy, and Fail-Stop.
(do me an svg version of this thanks)
![[Pasted image 20261108135746.png]]

(and then compact this thanks)
In this model, we have Perfect Point-to-Point Links, but no Failure Detector.

Imagine \(P_1\) sends a message to \(P_2\):

```
P1 → P2 : Are you alive?
```

And \(P_1\) receives no response.

What can \(P_1\) conclude?

Not much! \(P_2\) might have crashed, or the communication might simply be delayed.

Perfect Links guarantee reliable delivery between correct processes, but they do not guarantee a known delivery-time bound.

So Fail-Silent provides no failure-detection oracle.

This doesn't mean we cannot communicate. It means we're not given a mechanism that reliably tells us which processes have crashed.

### B. Fail-Noisy — A stronger model

Now we add an Eventually Perfect Failure Detector:

\[ \Diamond\mathcal P \]

This means that our system can generate:

- `Suspect(P₂)`
    
- `Restore(P₂)`
    

But these suspicions can initially be wrong.

For example, \(P_1\) might suspect \(P_2\), even though \(P_2\) is alive.

Later, \(P_1\) receives a heartbeat and restores \(P_2\).

After stabilization, however, the Failure Detector behaves correctly.

That's why the professor calls this model Fail-Noisy: failure information is available, but it can temporarily contain errors or noise.

### C. Fail-Stop — The strongest of the three

Finally, we have Perfect Links and a Perfect Failure Detector:

\[ \mathcal P \]

Remember its two guarantees:

- Strong Completeness: Every crashed process is eventually detected.
    
- Strong Accuracy: No process is reported as crashed before it has actually crashed.
    

Therefore, when the module generates:

```
Crash(P₂)
```

we know \(P_2\) has really crashed.

Unlike Fail-Noisy, there are no false crash notifications.

Important: Perfect failure detection does not mean instantaneous detection. The notification can arrive later, but it cannot be incorrect.


A Fail-Stop system has both Perfect Links and \(\mathcal P\).

But if we have \(\mathcal P\), we can provide the guarantees of \(\Diamond\mathcal P\), because a detector that never makes mistakes also satisfies a specification that allows temporary mistakes.

Similarly, a Fail-Noisy system still has Perfect Links, so it can operate as a Fail-Silent system if we ignore the Failure Detector.

Therefore, the models are nested:

\[ \boxed{\text{Fail-Stop}\subseteq\text{Fail-Noisy}\subseteq\text{Fail-Silent}} \]
Here we're comparing the sets of executions permitted by the models, as shown in the professor's slide.

A stronger model permits fewer kinds of behavior because it imposes more guarantees.

You might expect the strongest model to be the largest set.

But we're talking about allowed system behaviors, not the number of problems we can solve.

Fail-Silent allows more uncertainty and therefore more possible executions.

Fail-Stop rules out executions involving incorrect failure notifications.

Consequently, Fail-Stop has a more restricted set of permitted behaviors.

This is the opposite direction from the inclusion of solvable problems, which the professor introduces on slide 58.

(use slide55 picture and also 56 and 57 put them when you think is better)
This distinction is worth remembering for the exam.

|What are we comparing?|Inclusion direction|
|---|---|
|Permitted system executions (slide 57)|Fail-Stop ⊆ Fail-Noisy ⊆ Fail-Silent|
|Solvable problems (slide 58)|Fail-Silent ⊆ Fail-Noisy ⊆ Fail-Stop|

The intuition is:

- A stronger model restricts more possible behaviors, because it imposes more guarantees.
    
- A stronger model allows us to solve at least as many problems, because algorithms can rely on more guarantees.
    

These are not contradictory statements. They concern two different sets.


##### Fail stop vs synchronous system
Now the professor asks an interesting question.

Remember our previous lectures about synchrony:

In a synchronous system, we have known bounds on message transmission delays and process execution times.

Because of these known bounds, we can implement a Perfect Failure Detector.

But in a Fail-Stop system, the professor gives us a Perfect Failure Detector directly as an abstraction.

We do not necessarily know how long messages take to arrive.

So the question becomes:

Are these two system models equally powerful?

The professor proposes three possibilities.

## A

Synchronous and Fail-Stop are equivalent

Both models can solve exactly the same problems.

## B

Synchronous is stronger than Fail-Stop

Known timing bounds provide some additional capabilities beyond perfect failure detection.

## C

Fail-Stop is stronger than Synchronous

Having a Perfect Failure Detector as an oracle provides capabilities beyond known timing bounds.

### What does each model provide?

|Synchronous system|Fail-Stop system|
|---|---|
|Known bounds on message delays|Perfect Point-to-Point Links|
|Known timing guarantees|Perfect Failure Detector (\(\mathcal P\))|
|Can implement \(\mathcal P\)|No known message-delay bounds are guaranteed|

Here's the key idea:

In a synchronous system, we can implement a Perfect Failure Detector because we know the timing bounds.

But the opposite is not true.

If someone gives us a Perfect Failure Detector, we can detect crashed processes correctly, but we still don't know how long messages take to travel.

Therefore:

\[ \boxed{\text{Synchronous}\Longrightarrow\text{Fail-Stop}} \]

Imagine two processes, \(P_1\) and \(P_2\), each with its own local clock.

They want to synchronize their clocks.

In a synchronous system:

Suppose we know that message delivery takes at most 3 seconds.

If \(P_1\) sends its current timestamp to \(P_2\), the receiver can reason about how old that timestamp could be.

This timing knowledge helps us synchronize clocks within a bounded error.

In a Fail-Stop system:

We have a Perfect Failure Detector, so we know whether a process has crashed.

But consider a timestamp sent from \(P_1\) to \(P_2\).

How old is that timestamp when \(P_2\) receives it?

Without a known message-delay bound, \(P_2\) cannot determine a guaranteed maximum age.

The Perfect Failure Detector doesn't provide that information.

This is why the professor uses Clock Synchronization as an example of a problem that benefits from the stronger synchronous model.
##### Lamport Mutual Exclusion Fault-Tolerant
Recall its purpose: multiple processes need access to a shared resource, but only one should enter the Critical Section (CS) at a time.

The original algorithm works when no process crashes. Now we want to modify it using the Perfect Failure Detector \(\mathcal P\).
But the professor emphasizes that before modifying an algorithm, we must check whether its specification still makes sense when crashes are possible.
### Mutual Exclusion

The original requirement was that at most one process is inside the CS.

Suppose \(P_1\) enters the CS and crashes before leaving.

If we continue counting \(P_1\) as occupying the CS forever, no other process could enter.

The professor therefore changes the requirement to:

> At any time, at most one non-crashed process is inside the Critical Section.

So after \(P_1\) crashes, another process may enter without violating this new specification.

This is a logical rule within the crash-stop model. It doesn't automatically repair external resources that a crashed process may have left in an inconsistent state.

### Liveness

The original requirement was that every requesting process eventually enters the CS.

But what if a process crashes after requesting access?

It can never enter!

So the professor changes the property to:

> If a correct process requests access, it eventually enters the Critical Section.

This excludes processes that crash, since we cannot guarantee their progress.

### Fairness

The professor keeps the requirement that if a correct process \(p\) requests access before process \(q\), then \(q\) cannot access the CS before \(p\).

Notice why the word correct matters: if \(p\) crashes, forcing everyone else to wait for \(p\) would destroy fault tolerance.

These are the three properties on slide 64.
The professor now displays the original algorithm and asks us to identify exactly where crashes cause problems.

Remember its three message types:

|Message|Purpose|
|---|---|
|`REQ`|Request access to the CS|
|`ACK`|Acknowledge a request|
|`RLS`|Announce that a request has been released|

The algorithm uses Lamport timestamps to order requests.

To enter the CS, a process needs its request to be the earliest in its local queue and sufficiently recent acknowledgments from every process.

Now, what happens if a process crashes?

## 3. Slide 66 — The two critical problems

The professor identifies two distinct failure scenarios.

### Problem 1 — A crashed process cannot release

Imagine \(P_1\) has the earliest request and enters the CS.

Then \(P_1\) crashes.

Normally, when leaving the CS, it would send an `RLS` message so that other processes remove its request from their queues.

But \(P_1\) is dead. It cannot send anything.

EXAMPLE: BLOCKED REQUEST QUEUE AT P₂

|   |   |   |
|---|---|---|
|Order|Request|Status|
|1|\(P_1\)|Crashed, no RLS|
|2|\(P_2\)|Waiting|

The request from \(P_1\) remains at the front of \(P_2\)'s queue, preventing \(P_2\) from entering.

Problem: A crashed process can permanently block the request ordering.

### Problem 2 — A crashed process cannot acknowledge

Now imagine \(P_2\) wants to enter the CS.

It broadcasts `REQ` to all processes, including \(P_3\).

But \(P_3\) crashes before sending its `ACK`.

The original algorithm requires acknowledgments from every process:

\[ \forall p\in\Pi:\quad \text{a suitable ACK from }p \]

Since \(P_3\) never responds, \(P_2\) waits forever.

Problem: A crashed process can permanently block the acknowledgment condition.
We identified two problems in the original Lamport Mutual Exclusion algorithm:

1. A crashed process cannot send `RLS`, so its request may block everybody else.
    
2. A crashed process cannot send `ACK`, so other processes may wait forever.
    

Now the professor asks: Can we solve both problems using a Perfect Failure Detector (\(\mathcal P\))?

His first proposed solution is surprisingly small.

## 1. Introducing the `Crashed` set

Each process maintains a new variable:

```
Crashed := {}
```

This set contains processes that the local Perfect Failure Detector has reported as crashed.

Remember: because we use \(\mathcal P\), these reports are never false.

When a crash is detected:

```
upon event Crash(pj):
    Crashed := Crashed ∪ {pj}
```

For example, if \(P_3\) crashes:

\[ Crashed=\{P_3\} \]

Now we can modify the original algorithm.

## 2. First modification — Stop waiting for ACKs from crashed processes

In Lamport's original algorithm, a process could enter its Critical Section only after receiving the required acknowledgments from every process.

The original condition involves:

\[ \forall p\in\Pi \]

But what if one of those processes has crashed?

We would wait forever for an acknowledgment that can never be generated.

The professor changes the condition to:

\[ \boxed{\forall p\in\Pi\setminus Crashed} \]

In words:

Wait for acknowledgments only from processes that have not been detected as crashed.

Imagine:

\[ \Pi=\{P_1,P_2,P_3\} \]

\(P_1\) wants to enter the CS, but \(P_3\) crashes before sending its ACK.

ACKNOWLEDGMENT CONDITION AT P₁

|   |   |   |
|---|---|---|
|Process|Status|Required ACK?|
|\(P_2\)|Alive|Yes|
|\(P_3\)|Crashed|No, after detection|

As soon as \(P_1\)'s Failure Detector reports `Crash(P₃)`, \(P_1\) no longer needs \(P_3\)'s acknowledgment.

Notice that the detection might take some time, but Strong Completeness guarantees that the crashed process is eventually detected.

This solves our second problem.

## 3. Second modification — Remove requests belonging to crashed processes

Now consider the first problem.

Suppose \(P_2\) has the earliest request in the queue:

|Request|Timestamp|Status|
|---|---|---|
|\(P_2\)|5|Crashed|
|\(P_1\)|8|Waiting|
|\(P_3\)|11|Waiting|

Ordinarily, \(P_2\) would send `RLS` when leaving the Critical Section.

But it has crashed, so it cannot release its request.

The professor asks an interesting question:

What does receiving an `RLS` message actually do?

The receiver removes the sender's request from its local `Requests` set.

Therefore, when we detect that a process has crashed, we can perform this removal directly.

```
upon event Crash(pj):
    Crashed := Crashed ∪ {pj}

    for each req in Requests
        where sender(req) = pj:
            remove req from Requests
```

There is no need to simulate a release message or ask another process to send it.

We simply remove the requests belonging to the crashed process.

After detecting \(P_2\)'s crash, the queue becomes:

|Request|Timestamp|Status|
|---|---|---|
|\(P_1\)|8|Next candidate|
|\(P_3\)|11|Waiting|

Now \(P_1\) can enter the Critical Section once its other conditions are satisfied.

This solves the first problem.

## 4. Putting the modifications together

The essential additions from slide 67 are:

```
upon Init:
    Crashed := {}

upon Crash(pj):
    Crashed := Crashed ∪ {pj}

    for each req in Requests
        where sender(req) = pj:
            remove req from Requests
```

And in the condition for granting access, replace the requirement for acknowledgments from all processes with:

\[ \forall p\in(\Pi\setminus Crashed) \]

Importantly, we have not removed the timestamp-ordering requirement.

Our algorithm still needs to respect Lamport's ordering of requests. We have only changed how crashed processes are handled.

## 5. Slide 68 — But is this patch actually correct?

Here the professor does something important: he presents the patch and then labels it:

“PATCH — UNCORRECT”

He asks:

Is it enough?

At first, our modifications seem reasonable:

- A crashed process no longer blocks us through missing ACKs.
    
- Its requests are removed from the queue.
    

But there's still a problem.

Think about what we learned earlier regarding delayed heartbeat replies:

A message sent before a process crashes can arrive after the crash has already been detected.

The same thing can happen with a `REQ` message.

This observation is the starting point for slides 69–71, where the professor shows a counterexample and corrects the patch.

For now, the important lesson is that fixing the obvious failure cases doesn't necessarily make an algorithm fault-tolerant. We also have to consider the order in which crash notifications and delayed messages arrive.