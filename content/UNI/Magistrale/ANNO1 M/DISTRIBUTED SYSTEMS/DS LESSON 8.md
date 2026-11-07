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

