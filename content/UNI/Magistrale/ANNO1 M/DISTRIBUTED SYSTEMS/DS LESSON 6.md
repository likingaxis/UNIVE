# Lesson 6 — Failure Detection

## Why Distributed Algorithms Need Failure Detection

Lamport's mutual exclusion assumes that every process eventually replies and releases the critical section. Under **crash-stop failures**, one process can break this progress guarantee. If it crashes before acknowledging a request, the requester waits forever. If it crashes with the smallest active request, no release arrives to remove that request from the other queues.

![[DS-L6-mutex-blocking.svg|780]]

A **failure detector** gives higher-level algorithms information about failed peers. It separates monitoring, heartbeats and timing assumptions from the application protocol. How safely an algorithm can use this information depends on the detector's guarantees; a timeout alone is not evidence of a crash in an asynchronous system.

Two dimensions describe those guarantees:

- **Completeness:** crashed processes are eventually detected or suspected. Missing a real crash can leave an algorithm waiting forever.
- **Accuracy:** the detector avoids false detections or suspicions. Excluding an active process on incorrect information can endanger safety.

![[DS-L6-completeness-vs-accuracy.svg|760]]

In a synchronous system, known timing bounds allow a **perfect failure detector**, $\mathcal{P}$. Under eventual synchrony, timeouts can be wrong before stabilization, so an **eventually perfect failure detector**, $\Diamond\mathcal{P}$, must be able to revise its suspicions.

![[DS-L6-slide-09-sync-vs-async-fd.png|760]]

## Perfect Failure Detector ($\mathcal{P}$)

### System Model and Specification

The implementation assumes crash-stop processes and synchronous perfect point-to-point links: messages between non-crashed endpoints arrive within a known bound $\text{max\_delay}$. The timeout analysis below follows the slides' simplified model, where local processing and clock drift are negligible relative to message delays.

![[DS-L6-slide-10-pfd-spec.png|720]]

The detector emits $\langle\mathcal{P},\operatorname{Crash}\mid p\rangle$ and satisfies:

- **PFD1 — Strong completeness:** eventually, every crashed process is permanently detected by every correct process.
- **PFD2 — Strong accuracy:** if any process detects $p$, then $p$ has already crashed.

A **correct** process never crashes in the execution. Completeness cannot require a process that later crashes to keep executing detection steps. Accuracy is stronger: even a process that will eventually crash must not be detected prematurely. In the crash-stop model, a valid crash notification is irrevocable.

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

## Sources

- [Local failure-detection slides](<Assets/SLIDES/DS-2425Failure_detection_leader_election.pdf>): perfect detector and request–reply implementation, round-based detector and timing argument, eventually perfect detector and adaptive timeout. The filename is from an older academic year; current-year alignment remains unverified.
