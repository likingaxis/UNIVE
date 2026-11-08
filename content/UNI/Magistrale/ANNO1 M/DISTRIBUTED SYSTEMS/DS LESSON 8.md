# Lesson 8 — Leader Election and Fault-Tolerant Mutual Exclusion

## Correctness of Increasing Timeout

[[DS LESSON 7]] introduced the eventually perfect failure detector, $\Diamond\mathcal{P}$. A missed heartbeat reply causes a suspicion; if a reply later arrives, the next timeout can restore the process and increase the waiting period. We now prove why this implements strong completeness and eventual strong accuracy.

**Strong completeness.** Suppose a correct process $P_1$ monitors $P_2$, which crashes at time $t=10$. After the crash, $P_2$ cannot generate new heartbeat replies. It may still have finitely many replies in transit, but once those have arrived, $P_1$ receives no more evidence of activity and permanently suspects $P_2$.

A delayed reply may temporarily cause `Restore(P₂)` even at time $t=100$. This does not mean that $P_2$ recovered: it sent the reply before crashing. Strong completeness requires **eventual permanent suspicion**, not immediate permanent suspicion. Once the finite set of old replies is exhausted, there can be no more restorations.

**Eventual strong accuracy.** Now suppose both processes are correct. After the unknown global stabilization time, GST, message delays have a finite bound. If each direction takes at most 3 seconds, a complete heartbeat exchange takes at most:

$$
3\ \mathrm{s}\text{ (request)}+3\ \mathrm{s}\text{ (reply)}=6\ \mathrm{s}.
$$

![[Pasted image 20261107160107.png|464]]

In the lecture's simplified timing model, a timeout longer than twice the maximum one-way delay allows the whole exchange to finish. If the timeout is too short and produces a false suspicion, a later reply lets the algorithm discover the mistake and increase:

$$
\mathrm{delay}\gets\mathrm{delay}+\Delta.
$$

Repeated mistakes cannot keep the timeout below a finite bound forever: each correction increases it by $\Delta>0$. It either becomes sufficiently large, or false suspicions stop earlier. After transient old replies and suspicions are handled, correct processes are no longer suspected. Detector stabilization may occur **after GST**; network stabilization does not instantly repair the detector's state.

## Suspected Set Agreement

Let $S_1$ and $S_2$ be the suspected sets at two correct processes. There is a sufficiently late time $T$ after which:

$$
\boxed{S_1(t)=S_2(t)\qquad\forall t\ge T.}
$$

To see why, consider any process $P_k$. If it is correct, eventual strong accuracy eventually excludes it from both sets. If it crashes, strong completeness eventually includes it permanently in both sets. Since there are finitely many processes, we can choose $T$ after the last crash and all these detector stabilization times. Then:

$$
S_1(t)=S_2(t)=F\qquad\forall t\ge T,
$$

where $F$ is the set of processes that crash in the execution. The observers need not agree before $T$.

This suggests a way to choose a coordinator. If all correct processes eventually have the same candidate set and apply the same deterministic ranking, they can eventually select the same leader.

## Leader Election

A failure detector reports failures; a **leader-election module** identifies a process that should coordinate the others. Its indication is:

$$
\langle le,\operatorname{Leader}\mid p\rangle.
$$

The leader-election abstraction has two properties:

- **LE1 — Eventual detection:** if at least one correct process exists, some correct process is eventually elected leader.
- **LE2 — Accuracy:** if a process is leader, all previously elected leaders have crashed. A different living leader cannot replace a living predecessor.

![[ds-l08-slide-42-le-spec.png|850]]

### Permitted and Forbidden Election Histories

The professor first studies the specification, before introducing an implementation. Consider $\Pi=\{P_0,P_1,P_2\}$, with $P_0$ initially elected. After $P_0$ crashes, $P_1$ elects itself while $P_2$ still has the old local indication naming $P_0$.

This is permitted: the previous leader has crashed, so choosing $P_1$ does not violate LE2. Local leader indications do not have to change at the same physical instant. The implementation must eventually make progress, but detecting a crash is not instantaneous.

> [!example]- Permitted history from the slides
> ![[ds-l08-slide-43-le-valid-execution.png|850]]

Now change the history: $P_2$ also elects itself while $P_1$ remains alive. This violates LE2 because a previously elected leader, $P_1$, has not crashed.

![[ds-l08-slide-45-le-invalid-execution.png|850]]

These are examples of the **specification**, not executions of the highest-ID algorithm below: their initial choice of $P_0$ is not that algorithm's ranking rule.

### Monarchical leader election

Every process knows the same set $\Pi$ and the same total ranking of IDs. With a perfect failure detector, $\mathcal{P}$, it chooses the highest-ranked process not reported as crashed:

$$
\boxed{\mathrm{leader}=\operatorname{maxrank}(\Pi\setminus\mathrm{suspected}).}
$$

![[ds-l08-slide-47-monarchical-le.png|850]]

Initially, `suspected` is empty and `leader` is $\bot$, meaning undefined. A `Crash(p)` indication adds $p$ to `suspected`. Whenever the highest-ranked candidate differs from the current leader, the module updates `leader` and emits a `Leader` indication.

For example, with $\Pi=\{P_0,P_1,P_2,P_3\}$ and `suspected` $=\{P_3\}$, the chosen leader is $P_2$. The set only grows: $\mathcal{P}$ never reports a process before its crash, and crash-stop processes do not recover, so no `Restore` operation is needed. The underlying detector may exchange heartbeats; this election module adds no separate voting protocol.

> [!question]- If every process elects independently, why can't two different living leaders be chosen?
> Electing a leader does not mean electing oneself. Every process applies the same ranking. With $\Pi=\{P_1,P_2,P_3\}$, a living $P_3$ cannot be excluded by $\mathcal{P}$, so no observer can choose $P_2$ instead. More generally, choosing a lower-ranked process requires crash reports for every higher-ranked candidate.
>
> ![[Pasted image 20261108131932.png|680]]
>
> LE2 excludes two different living leaders; simultaneous local steps are not a loophole. After a crash, observers may temporarily hold different local indications, but the superseded leader is already dead.

### Correctness

**LE1.** Suppose $P_2$ and $P_3$ crash in the four-process example, leaving $P_0$ and $P_1$ correct. Strong completeness eventually adds both crashed processes to every correct observer's suspected set. Strong accuracy keeps the correct processes eligible. Each observer therefore selects:

$$
\operatorname{maxrank}(\{P_0,P_1\})=P_1,
$$

which is correct. The same argument applies to any finite process set with at least one correct member.

**Accuracy: uniqueness of living leaders.** Suppose two different elected leaders are both alive, with one ranked higher than the other. For an observer to select the lower-ranked one, it must have excluded the higher-ranked one through a crash notification. That contradicts strong accuracy. In the professor's example, selecting $P_7$ while an elected $P_{10}$ is alive would require an impossible `Crash(P10)` report. This rules out two different living leaders, while allowing stale local indications naming an already crashed process.

The source defines leadership as lasting from the election indication until the leader crashes. A stale indication naming an already crashed candidate therefore must not be confused with a second living leader. The argument concerns overlapping living leaders; it does not require every observer to update at the same instant.

## Eventually leader election (Omega)

The same rule cannot implement ordinary LE using $\Diamond\mathcal{P}$ without weakening the specification. False suspicions may initially produce different living leaders. For example, with three correct processes, $P_1$ may suspect $P_3$ and choose $P_2$, while $P_2$ suspects nobody and chooses $P_3$.

**Eventually leader election**, denoted $\Omega$, permits these temporary mistakes. Its indication is `Trust(p)`: the observer currently trusts $p$ as leader, and may later change its choice.

![[ds-l08-slide-50-omega-spec.png|850]]

- **ELD1 — Eventual accuracy:** there is a time after which every correct process trusts some correct process.
- **ELD2 — Eventual agreement:** there is a time after which no two correct processes trust different correct processes.

We need both properties. Agreement alone does not guarantee a correct leader, and correct choices alone do not guarantee agreement.

### Two Examples of the Properties

In both examples, $P_2$ and $P_3$ crash, leaving $P_1$ and $P_4$ correct:

| Permanent behavior | ELD1 | ELD2 |
| --- | --- | --- |
| Both correct observers trust the crashed $P_3$ forever | Violated: the leader is faulty | Satisfied: the observers do not disagree |
| $P_1$ trusts $P_4$, while $P_4$ trusts $P_1$, forever | Satisfied: both choices are correct | Violated: they choose different correct leaders |

![[Pasted image 20261108134721.png|850]]

Observing the second situation for ten seconds does **not** prove the algorithm incorrect. Both are eventual properties: a finite observation may still be followed by stabilization. The disagreement must persist indefinitely to refute eventual agreement.

> [!remember] Three different stabilization events
> **GST** concerns the network's timing bounds. **Failure-detector stabilization** means that false suspicions of correct processes have ceased. **Leader stabilization** means that all correct observers permanently trust the same correct leader. These need not occur at the same time.

### Implementing Omega with an Eventually Perfect Detector

The algorithm on PDF page 54 reuses the ranking rule, but handles both `Suspect(p)` and `Restore(p)`. Suspicion adds $p$ to the local candidate-exclusion set; restoration removes it. A changed highest-ranked candidate produces a new `Trust` indication.

![[ds-l08-slide-54-omega-algorithm.png|850]]

The rule remains $\operatorname{maxrank}(\Pi\setminus\mathrm{suspected})$. Its inputs may disagree initially, but the suspected-set lemma tells us what happens eventually.

### Correctness Proof of Omega

Assume at least one process is correct. After the last crash and detector stabilization, every correct observer has `suspected` $=F$. Strong completeness includes all crashed processes; eventual strong accuracy excludes the correct ones. Thus the candidate set $C=\Pi\setminus F$ is nonempty and contains exactly the correct processes.

Its highest-ranked member is correct, proving **ELD1**. Every correct observer uses the same $C$ and the same ranking, so all choose the same member, proving **ELD2**. As the sets remain stable, so does the leader. No additional communication between election modules is needed.

For example, if $P_3,P_4$ crash and $P_1,P_2$ are correct, every correct observer eventually has `suspected` $=\{P_3,P_4\}$ and chooses $P_2$.

> [!example]- Original correctness slide
> ![[ds-l08-slide-55-omega-proof.png|850]]

## Failure models

The professor now classifies systems by the failure information they provide. All three models below use crash-stop processes and perfect point-to-point links; they differ in the failure-detector abstraction available to algorithms.

![[ds-l08-failure-models.svg|850]]

**Fail-Silent** provides perfect links but no failure-detector oracle. If $P_1$ asks $P_2$ “Are you alive?” and receives no reply, it cannot distinguish a crash from a delay. Reliability between correct endpoints does not provide a known delivery-time bound.

**Fail-Noisy** adds $\Diamond\mathcal{P}$. It supplies `Suspect` and `Restore` indications, with temporary false suspicions allowed. After detector stabilization, correct processes are no longer suspected and crashed processes are permanently suspected.

**Fail-Stop** adds $\mathcal{P}$. A `Crash(P₂)` indication is trustworthy: $P_2$ has already crashed. Detection may take time; absence of a notification does not establish that a process is alive now.

### Inclusion between models

A perfect detector also satisfies the eventually perfect specification. A system with a detector can ignore it and use only its perfect links. In the slide's hierarchy of permitted behaviors:

$$
\mathrm{Fail\text{-}Stop}\subseteq\mathrm{Fail\text{-}Noisy}\subseteq\mathrm{Fail\text{-}Silent}.
$$

Stronger guarantees rule out more behaviors. The direction reverses for **sets of solvable problems**, because an algorithm can use the extra guarantees or ignore them:

$$
\mathrm{Solvable}_{\mathrm{Fail\text{-}Silent}}
\subseteq\mathrm{Solvable}_{\mathrm{Fail\text{-}Noisy}}
\subseteq\mathrm{Solvable}_{\mathrm{Fail\text{-}Stop}}.
$$

The two inclusions concern different sets; a stronger model permits fewer behaviors while supporting at least as many solvable problems.

> [!example]- Original model figures and supplied sketch
> ![[ds-l08-slide-56-failure-models.png|850]]
>
> ![[ds-l08-slide-57-model-inclusion.png|850]]
>
> ![[Pasted image 20261108135746.png|680]]

### Fail stop vs synchronous system

Are synchrony and Fail-Stop equivalent? The professor offers three possibilities: **A**, equivalence; **B**, synchrony is stronger; **C**, Fail-Stop is stronger. The answer is **B** in the comparison discussed here.

A synchronous system has known timing bounds and can implement $\mathcal{P}$. A Fail-Stop system is given $\mathcal{P}$ directly, but that oracle does not supply message-delay bounds.

Consider clock synchronization. If a message takes at most 3 seconds, its receiver can bound the age of a transmitted timestamp. A perfect failure detector reports crashes, but does not tell the receiver how old a timestamp is. The oracle therefore does not replace the timing information used for bounded-error clock synchronization.

## Fault-Tolerant Lamport Mutual Exclusion

[[DS LESSON 6]] studied Lamport's algorithm without crashes. Before adding failure handling, we must adapt the specification so that it still makes sense under crash-stop failures:

- **Mutual exclusion:** at most one **non-crashed** process is inside the critical section at a time.
- **Liveness:** every **correct** process that requests entry eventually enters.
- **Fairness:** an earlier request from a correct process cannot be bypassed by a later request. As in Lesson 6, we interpret this using causal request order; the slide's word “before” does not define a separate physical-time ordering.

![[ds-l08-slide-64-fault-tolerant-mutex-spec.png|850]]

If $P_1$ crashes inside the CS, it no longer counts as occupying it under this specification. This logical rule does not repair external resources left inconsistent by a crash. Restricting liveness and fairness to correct requesters also avoids requiring progress by a process that has stopped forever.

### The two critical problems

The original algorithm uses `REQ` to request entry, `ACK` to acknowledge requests, and `RLS` to remove a released request. Entry requires both the smallest active request and sufficiently recent acknowledgments from every process. Crashes can block either condition.

**A crashed process cannot release.** Suppose $P_1$ has the earliest request, enters the CS and crashes. Without an `RLS`, its request remains ahead of $P_2$'s request and blocks $P_2$ indefinitely.

![[ds-l08-blocked-request-queue.svg|900]]

**A crashed process cannot acknowledge.** If $P_2$ requests entry but $P_3$ crashes before replying, the requirement for an acknowledgment from every $p\in\Pi$ can never be met.

### Introducing the `Crashed` set

Each process keeps the set of peers reported as crashed by $\mathcal{P}$. On a crash indication, it records the failure and removes that peer's pending requests:

```text
upon Init:
    Crashed := {}

upon Crash(pj):
    Crashed := Crashed ∪ {pj}
    for each req in Requests where sender(req) = pj:
        remove req from Requests
```

The acknowledgment condition now quantifies only over processes not yet detected as crashed:

$$
\forall p\in\Pi\setminus\mathrm{Crashed}:\quad
\text{a suitable ACK from }p\text{ is available}.
$$

For example, if $P_1$ is waiting for $P_2$ and $P_3$, detection of $P_3$'s crash removes the need for its acknowledgment; $P_2$'s acknowledgment is still required. Strong completeness guarantees eventual detection, rather than an immediate change when the crash occurs.

Removing a request has the same relevant effect as receiving an `RLS`: it stops that request from blocking the queue. If $P_2$'s crashed request has timestamp 5, ahead of waiting requests from $P_1$ at 8 and $P_3$ at 11, removing it makes $P_1$ the next candidate. The timestamp-ordering condition remains in force.

> [!example]- The first patch proposed in class
> ![[ds-l08-slide-67-initial-mutex-patch.png|1000]]
>
> This is an intermediate patch. The delayed-request case below explains why it still needs another check.

### Correctness of the patch

An old request may arrive **after** its sender's crash has already been detected:

1. $P_0$ sends a `REQ` to $P_1$, but the network delays it.
2. $P_0$ crashes.
3. $P_1$ receives `Crash(P₀)`, adds $P_0$ to `Crashed` and removes its existing requests. The delayed request is not in the queue yet.
4. The old `REQ` arrives and the unmodified receive handler inserts it.
5. If its timestamp is earlier than $P_1$'s request, $P_1$ is blocked forever.

The resulting local state is inconsistent with the intended cleanup: `Crashed` contains $P_0$, while `Requests` contains both $P_0$'s and $P_1$'s requests, with $P_0$ first. The crash handler has already run, so there is no second notification to remove the newly arrived request. A crashed $P_0$ cannot send `RLS` either. Liveness can fail.

The professor fixes this by rejecting requests from senders already in `Crashed`. The following is the **modified REQ branch**, not a complete receive handler:

```text
upon event Deliver Message(m):
    if m is REQ and sender(m) not in Crashed:
        scalar_clock := max(clock(m), scalar_clock) + 1
        Requests := Requests ∪ {m}
        scalar_clock := scalar_clock + 1
        Send ACK to sender(m)
    else if m is ACK:
        ...
```

The new condition is $\operatorname{sender}(m)\notin\mathrm{Crashed}$. In the example, the delayed `REQ(P₀)` is discarded, so it cannot reinsert a blocking request. The full algorithm must retain the original handling of `ACK`, `RLS` and clock updates for other message types; the excerpt isolates the new request filter.

> [!example]- Corrected patch from the slides
> ![[ds-l08-slide-71-correct-mutex-patch.png|1000]]

## Simplified Fault-Tolerant Mutual Exclusion

Can we avoid having every requester negotiate with every process? The professor proposes electing one coordinator. Perfect links carry messages, $\mathcal{P}$ reports crashes, and LE chooses a replacement when the coordinator fails.

![[ds-l08-slide-73-coordinator-modules.png|850]]

### Normal Operation

Suppose $P_0$ is leader. When $P_1$ requests the CS, it sends `REQUEST` to $P_0$. If the CS is free, $P_0$ returns `GRANT`. If $P_2$ requests while $P_1$ is inside, the leader queues $P_2$. On receiving $P_1$'s `RELEASE`, it can grant entry to $P_2$.

![[ds-l08-coordinator-sequence.svg|680]]

The leader keeps the current holder and a waiting queue. Requests are served in **arrival order at the leader**. This provides a local FIFO scheduling rule; it does not by itself prove Lamport's causal fairness property when network delays vary.

### Case A — The crashed process is waiting

If the queue is $[P_1,P_2,P_3]$ and $P_2$ crashes, the leader eventually detects the crash and removes its request, leaving $[P_1,P_3]$.

### Case B — The crashed process is inside the CS

If $P_1$ crashes after receiving `GRANT`, no `RELEASE` arrives. Once the leader detects the crash, it can treat $P_1$ as no longer occupying the CS and serve the next request. This uses the modified specification, which counts only non-crashed occupants.

Both cases are manageable because the leader remains alive and retains the state.

### The problem: P₁ doesn't know the current state

Now suppose leader $P_0$ crashes while $P_2$ is inside the CS and $P_3$ is waiting. LE eventually chooses a new leader, say $P_1$. If it immediately grants $P_3$'s request, both $P_2$ and $P_3$ could be inside.

Electing a new leader does not transfer the old leader's knowledge. The replacement first enters a **`new_leader` recovery phase**:

1. Contact every process not detected as crashed and ask about CS occupancy, and possibly pending requests.
2. Wait for replies from the currently non-crashed processes, accounting for further crash notifications.
3. Reconstruct the known occupancy state before resuming grants. If $P_2$ reports that it occupies the CS, wait for its release or crash detection.

A missing reply cannot simply be treated as “not inside.” The process may be slow and still occupying the CS. If it is correct, its reply eventually arrives through the perfect link; if it crashes, strong completeness eventually supplies the notification.

### Recovering Waiting Requests

A client whose request went to the old leader must not wait forever. The lecture discusses recovering pending requests during `new_leader`, or having clients resend unsatisfied requests when they learn the new leader. PDF page 76 explicitly includes retransmission. Reconstructing or retransmitting the queue can lose its previous FIFO order.

> [!question] Details left for the full protocol
> The lecture gives a design sketch and assigns full pseudocode and correctness proofs as homework. Querying who is **already inside** does not, by itself, settle an old `GRANT` still in transit: a client could report “not inside” before that grant arrives. Outstanding grants and recovery ordering must be accounted for in the full protocol. Fairness across leader changes also remains to be formalized. These points are not a completed homework solution.

### Message Cost

In stable operation, one CS access uses `REQUEST`, `GRANT` and `RELEASE`: three messages, or $O(1)$, independent of $n$. A successful leader-recovery exchange contacts the other processes and collects their state, requiring $O(n)$ messages. These counts concern the CS protocol; they exclude ongoing failure-detector and leader-election maintenance traffic.

## Sources

- [Failure detection and leader election slides](<Assets/SLIDES/DS-2425Failure_detection_leader_election.pdf>), **94-page version**. PDF pages 39–40: detector correctness and suspected sets; 42–55: LE and Omega; 56–62: failure models and synchrony; 64–71: fault-tolerant Lamport ME; 72–76: coordinator-based ME. The figures use PDF page numbers, which differ from the 79-page edition.
- [Lesson 8 transcript](<Assets/TRANSCRIPTED DS/DS LESSON 8 transcription.md>), including the class examples and recovery discussion.
- The model hierarchy and blocked-queue SVGs redraw the requested examples. The coordinator sequence SVG preserves the supplied inline diagram as an attachment. Original screenshots remain available.
