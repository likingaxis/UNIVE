# Lesson 7 — Implementing Failure Detectors

[[DS LESSON 6]] introduced the perfect-detector interface. Here we implement it with heartbeat messages, use synchrony to organize communication into rounds, and then adapt the timeout to obtain an eventually perfect detector.

## Perfect Failure Detector ($\mathcal{P}$)

### Algorithm 2.5: Exclude on Timeout

Each process periodically asks every peer for a heartbeat reply. The set `alive` records replies received during the current timeout window; `detected` records crashes already reported.

![[DS-L6-slide-11-exclude-on-timeout.png|780]]

```text
Implements:
    PerfectFailureDetector, instance P

Uses:
    PerfectPointToPointLinks, instance pp2p

upon event < P, Init > do
    alive := Pi
    detected := empty_set
    starttimer(Delta)

upon event < Timeout > do
    for all p in Pi do
        if (p not in alive) and (p not in detected) then
            detected := detected U {p}
            trigger < P, Crash | p >
        send < pp2p, Send | p, [HEARTBEATREQUEST] >
    alive := empty_set
    starttimer(Delta)

upon event < pp2p, Deliver | q, [HEARTBEATREQUEST] > do
    send < pp2p, Send | q, [HEARTBEATREPLY] >

upon event < pp2p, Deliver | p, [HEARTBEATREPLY] > do
    alive := alive U {p}
```

Initializing `alive := Pi` matters: no requests have been sent when the first timeout fires. It prevents this first check from declaring everyone crashed. After each new request batch, clearing `alive` starts a fresh observation window. Entries in `detected` are never removed, so a crash notification is emitted only once per peer.

Choose $\Delta$ large enough to complete the request–reply exchange. In the simplified model, the round trip is bounded by $2\,\text{max\_delay}$; taking $\Delta>2\,\text{max\_delay}$ leaves a strict margin. At equality, the model must process a reply arriving exactly at the deadline before checking the timeout. Real processing and timer drift must also be covered by the chosen timeout.

### Correctness and Detection Delay

**Strong accuracy.** Suppose $p$ has not crashed when a timeout check occurs. It received the request from the start of that window and returned a reply. By synchrony, the whole exchange finishes within the window, so $p\in\text{alive}$ and the detector cannot report it. A premature detection would therefore contradict the timing assumptions.

**Strong completeness.** Once $p$ crashes, it sends no new replies. In the worst case, its last reply still counts in the current window. The next window contains no reply, so the following timeout detects the crash. Under the same round-trip bound, a crash at time $t$ is detected by every correct observer by $t+2\Delta$.

![[DS-L6-slide-12-completeness-latency.png|720]]

The implementation's $2\Delta$ latency bound is stronger than the abstraction's requirement of eventual detection. Different observers need not detect at the same instant: their timers can be out of phase, and the crashing process may have replied to some observers but not others.

![[DS-L6-slide-17-detection-times.png|740]]

In this example, $p_3$ replies to $p_1$ before crashing but does not reply to $p_0$. Process $p_0$ detects it at its next check; $p_1$ first counts the final reply and detects it one window later.

Also, **not detected does not mean alive now**. Accuracy says that a detection is trustworthy, while completeness allows a delay before it occurs. A process can have crashed recently without yet appearing in another process's `detected` set.

With all $n$ processes active and self-messages counted, each cycle exchanges $n^2$ requests and $n^2$ replies: $2n^2$ messages per $\Delta$ period. This is a worst-case count; crashed processes stop replying.

## Round-Based Perfect Failure Detector ($\mathcal{P}$)

Can we remove the heartbeat requests? If processes agree sufficiently closely on round boundaries, every process can proactively send one `BEAT` to each peer per round. A missing beat then carries information:

> “In synchronous networks, silences are expressive.” — N. Santoro

This reduces the all-active message count to $n^2$ beats per round, including self-messages, instead of a request and a reply for each pair.

### Synchronized Clocks and Round Timing Assumptions

The slides assume synchronized virtual clocks $C_{v,i}$ with global skew at most $\delta$:

$$
|C_{v,i}(t)-C_{v,j}(t)|\le\delta.
$$

They also assume link delays in $[d_{\min},\text{max\_delay}]$, with $d_{\min}>\delta$, and choose the round length

$$
T>2(\text{max\_delay}+\delta).
$$

![[DS-L6-slide-23-clock-sync-skew.png|740]]

The lower delay bound prevents a beat from reaching a receiver before it has entered the corresponding round. The round length leaves time for the latest beat to arrive before the receiver advances again.

> [!note] Timing model for the proof
> The slide argument treats $\delta$ as a bound on the physical separation of matching round boundaries and $T$ as the physical round duration. The derivation below uses that idealization. A bound on clock readings alone does not justify this conversion without clock-rate assumptions; a drift-aware version needs those bounds explicitly.

### Algorithm 3: Round-Based Perfect Failure Detector

`Corrects` contains processes not yet detected; `RoundAlive` contains peers heard from in the current round. The first positive clock boundary starts round 0.

![[DS-L6-slide-24-round-based-p.png|760]]

![[DS-L6-slide-25-round-based-crash.png|760]]

```text
Implements:
    PerfectFailureDetector, instance P

Uses:
    PerfectPointToPointLinks, instance pp2p
    LocalVirtualClock, instance C_v

upon event < P, Init > do
    r := -1
    Corrects := Pi
    RoundAlive := Corrects

upon event < C_v = k*T > (with k > 0) do
    r := r + 1
    for all p_j in Corrects \ RoundAlive do
        Corrects := Corrects \ {p_j}
        trigger < P, Crash | p_j >
    RoundAlive := {p_i}
    for all p_j in Corrects do
        send < pp2p, Send | p_j, <p_i, BEAT> >

upon event < pp2p, Deliver | p_j, <p_j, BEAT> > do
    RoundAlive := RoundAlive U {p_j}
```

At each boundary, the process advances its round counter, checks the completed round and reports missing peers. It then resets `RoundAlive` to contain itself and sends the new round's beats. The initial full set prevents the first check from reporting failures before any round has run.

### Same-Round Delivery and Correctness

The central lemma is that a beat sent at the start of round $r$ arrives while the receiver is also in round $r$.

![[DS-L6-round-timing-lemma.svg|780]]

Let $p_i$ start round $r$ at physical time $t$. Under the timing idealization above, $p_j$ enters that round between $t-\delta$ and $t+\delta$, and cannot leave before $t-\delta+T$. The beat arrives at some time

$$
t_{\mathrm{arr}}\in[t+d_{\min},\ t+\text{max\_delay}].
$$

It cannot arrive early because

$$
t_{\mathrm{arr}}\ge t+d_{\min}>t+\delta\ge t_{\mathrm{enter}}(p_j,r).
$$

It cannot arrive late because the chosen $T$ gives

$$
t_{\mathrm{arr}}\le t+\text{max\_delay}<t-\delta+T
\le t_{\mathrm{leave}}(p_j,r).
$$

Therefore the receiver has already reset its set for round $r$, and has not yet checked that round, when the beat arrives.

**Strong accuracy** follows: a process still alive at the check sent its beat, which arrived in time, so it is not missing from `RoundAlive`. **Strong completeness** follows because a crashed process sends no beats in later rounds; every correct observer eventually completes a round without hearing from it and detects it.

The slides ask for the minimum round length. In the idealized inequalities above, avoiding late arrivals only requires

$$
T>\text{max\_delay}+\delta,
$$

together with $d_{\min}>\delta$. This is the tighter bound obtained from that model; the slide algorithm uses the stronger $T>2(\text{max\_delay}+\delta)$. Do not transfer the tighter bound to drifting clocks without revisiting the timing assumptions.

### Logical Rounds and Mid-Loop Crashes

Once same-round delivery is established, synchronous executions can be described using **logical rounds**: correct processes move through corresponding rounds, and their messages sent at the start of a round reach the correct destinations by its end. This abstraction hides the physical clock offsets and delays used to implement it.

![[DS-L6-slide-29-synchronous-rounds.png|740]]

A send-to-all loop is still a sequence of individual sends, rather than an atomic broadcast. A process can crash partway through it.

![[DS-L6-slide-31-mid-loop-crash.png|760]]

In the example, $p_3$ starts sending its round-2 beats to $p_1,p_5,p_6$, then crashes before reaching $p_0,p_2$. The latter receive no round-2 beat and detect the crash at the start of round 3. Processes $p_1,p_5,p_6$ count the final beat, then miss the round-3 beat and detect at the start of round 4. All beats that were sent can arrive within their round, while observers still detect in adjacent rounds.

## Eventually Perfect Failure Detector ($\Diamond\mathcal{P}$)

### From Synchronous to Eventually Synchronous Systems

A shorter timeout can detect crashes sooner, but it also expires during a sufficiently slow request–reply exchange. Without a known timing bound that holds from the beginning, an irreversible crash declaration can be wrong.

Under **eventual synchrony**, there is an unknown stabilization time $t_{\mathrm{stab}}$ after which message delays between correct processes are bounded by an unknown $\text{MAX\_DELAY}$. Before then, delays can be arbitrarily large. The detector therefore reports **suspicions**, retracts them when replies arrive, and increases its timeout when a suspicion is followed by a reply.

### Specification of $\Diamond\mathcal{P}$ (Module 2.8)

![[DS-L6-slide-34-epfd-spec.png|740]]

The indication $\langle\Diamond\mathcal{P},\operatorname{Suspect}\mid p\rangle$ starts a suspicion; $\langle\Diamond\mathcal{P},\operatorname{Restore}\mid p\rangle$ ends it. The properties are:

- **EPFD1 — Strong completeness:** eventually, every crashed process is permanently suspected by every correct process.
- **EPFD2 — Eventual strong accuracy:** eventually, no correct process is suspected by any correct process.

Temporary false suspicions and restorations are allowed. The requirement is that they eventually stop for correct processes, while suspicions of crashed processes eventually become permanent.

### Algorithm 2.7: Increasing Timeout

As before, `alive` records replies during the latest window. The set `suspected` can now both grow and shrink, while the timeout `delay` increases in steps of $\Delta>0$.

![[DS-L6-slide-37-increasing-timeout.png|780]]

```text
Implements:
    EventuallyPerfectFailureDetector, instance <>P

Uses:
    PerfectPointToPointLinks, instance pp2p

upon event < <>P, Init > do
    alive := Pi
    suspected := empty_set
    delay := Delta
    starttimer(delay)

upon event < Timeout > do
    if alive intersect suspected != empty_set then
        delay := delay + Delta
    for all p in Pi do
        if (p not in alive) and (p not in suspected) then
            suspected := suspected U {p}
            trigger < <>P, Suspect | p >
        else if (p in alive) and (p in suspected) then
            suspected := suspected \ {p}
            trigger < <>P, Restore | p >
        send < pp2p, Send | p, [HEARTBEATREQUEST] >
    alive := empty_set
    starttimer(delay)

upon event < pp2p, Deliver | q, [HEARTBEATREQUEST] > do
    send < pp2p, Send | q, [HEARTBEATREPLY] >

upon event < pp2p, Deliver | p, [HEARTBEATREPLY] > do
    alive := alive U {p}
```

At a timeout, `alive` intersecting `suspected` means that a peer was suspected but a reply has since arrived. The detector increases `delay`, then restores each suspected peer present in `alive`. Conversely, a peer absent from both `alive` and `suspected` becomes suspected. Requests are sent again and the observation set is cleared.

![[DS-L6-epfd-suspect-restore.svg|780]]

The code checks the intersection **before** restoring processes, so the evidence that triggers the timeout increase is still present. It increases the delay once per window, even if several suspected peers replied. Restoring on receipt instead would need a corresponding change to the timeout-update logic; simply removing a peer from `suspected` early could erase that evidence.

A late reply proves that the peer sent a message earlier, not that it is alive at delivery time. It may already have crashed while the reply was in transit. This is why completeness concerns eventual permanent suspicion, after old replies have been exhausted.

In an all-active window the exchange still costs $2n^2$ messages with self-messages counted, but the window length is now adaptive.

### Can the Final Timeout Be Predicted?

The final timeout cannot be predicted from the post-stabilization delay bound alone. The initial asynchronous period can last arbitrarily long and produce arbitrarily many increases before stabilization. Thus the timeout eventually becomes adequate, but can be much larger than the eventual network delay.

The lecture ends with this question. The correctness proofs and agreement of the suspected sets continue in [[DS LESSON 8]], before leader election.

> [!note]- Reference — correctness continued in Lesson 8
> These existing explanations and figures are retained as an optional reference. They belong to the next lecture; your Lesson 8 draft develops this continuation.
>
> ### Correctness of Increasing Timeout
>
> **Strong completeness.** After a crash, no new replies are generated. Only finitely many earlier replies remain in transit, so they can add the crashed process to `alive` only finitely often. After the last one, a subsequent check suspects it, and no later reply can restore it.
>
> **Eventual strong accuracy.** After stabilization, correct processes' round trips have a finite bound, $2\,\text{MAX\_DELAY}$ in the simplified model. Suppose false suspicions continue. Replies from the correct peers eventually cause restorations and increases of $\Delta$, so `delay` cannot remain below this bound forever. Once it is large enough, every fresh request–reply exchange finishes within its window. If increases stop earlier, that can only be because the repeated suspicion–reply pattern has stopped. In either case, after any transient old messages and suspicions are handled, correct processes cease to be suspected.
>
> ### Stabilization of the Suspected Sets
>
> ![[Pasted image 20261103121236.png|740]]
>
> With finitely many crash-stop processes, there is a time after the last crash. Completeness eventually puts every crashed process permanently into every correct observer's suspected set; eventual accuracy eventually excludes every correct process from those sets. Taking the maximum of these finitely many times gives a time $t$ such that
>
> $$
> \forall t'\ge t:\quad
> \operatorname{suspected}_{p_1}(t')
> =\operatorname{suspected}_{p_2}(t')
> =\operatorname{Crashed}
> $$
>
> for any correct observers $p_1,p_2$. This is eventual agreement on the set of processes that crash in the execution; it does not require observers to agree during the unstable period.
>
> ![[Pasted image 20261103121557.png|680]]

## Sources

- [Failure-detection slides](<Assets/SLIDES/DS-2425Failure_detection_leader_election.pdf>), **94-page version**: PDF pages 11–33 cover perfect-detector implementations and rounds; pages 34–38 introduce the eventually perfect detector and Increasing Timeout. Pages 39–40 support the collapsed continuation reference.
- [Lesson 7 transcript](<Assets/TRANSCRIPTED DS/DS LESSON 7 TRANSCRIPTED.md>): perfect-detector implementations, rounds, Increasing Timeout and the final-timeout question.
- [Lesson 8 transcript](<Assets/TRANSCRIPTED DS/DS LESSON 8 transcription.md>), opening section: Increasing Timeout correctness and suspected-set agreement.
- [Professor’s lecture log](https://sites.google.com/view/distributedsystems-202627/lectures), lecture 7, 14 October 2026. Its topic lists overlap with lecture 6; the boundary used here follows the supplied transcripts.

Page numbers here refer to the 94-page PDF. The [79-page version](<Assets/SLIDES/DS-Failure_detection_leader_election (1).pdf>) has different pagination: Increasing Timeout is on page 37 instead of 38, and its correctness is on page 38 instead of 39.
