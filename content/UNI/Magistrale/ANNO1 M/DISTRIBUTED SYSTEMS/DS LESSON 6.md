# Lesson 6 — Lamport's Mutual Exclusion and Failure Detectors

## Application of Scalar Clocks: Lamport's Distributed Mutual Exclusion

Vector clocks let us identify causal relationships and concurrency, which is useful for causal broadcast. Mutual exclusion needs a different service: a total order on requests to enter a **critical section (CS)**, so processes can coordinate exclusive access without a central coordinator. Scalar timestamps, supplemented with process IDs, are enough for this.

### The Mutual Exclusion (ME) Abstraction

![[DS-L5-slide-51-mutex-abstraction.png|760]]

The application issues `Request`, receives `Grant` when entry is allowed, and issues `Release` on leaving. The abstraction requires:

- **ME1 — Mutual exclusion:** at most one process is in the CS at any time.
- **ME2 — Liveness:** every requesting process eventually enters.
- **ME3 — Fairness:** if $p$'s request happens before $q$'s, then $q$ cannot enter before $p$.

### System Assumptions and Total Ordering of Requests

Lamport's algorithm assumes **no crashes** ($f=0$), FIFO perfect point-to-point links, and processes that eventually release the CS. A process waiting for an acknowledgment or release cannot otherwise be guaranteed to progress.

Concurrent requests can have equal scalar timestamps. To break ties, the slide code stores a timestamp as $\langle i,L_i\rangle$, but compares **clock value first, process ID second**:

$$
\operatorname{ts}(x)<\operatorname{ts}(y)
\iff L(x)<L(y)\ \lor\ \big(L(x)=L(y)\land\operatorname{id}(x)<\operatorname{id}(y)\big).
$$

Unique IDs make requests totally ordered, and the clock condition ensures that this order respects happened-before.

![[DS-L5-lamport-mutex-conditions.svg|780]]

### Lamport's Mutual Exclusion Protocol

Each process maintains a scalar clock, a set `Requests` of active requests, a set `Acks` of received acknowledgments, and its current request `my_req` (or $\bot$ when idle).

![[DS-L5-slide-53-lamport-mutex-code.png|780]]

When $p_i$ requests entry, it increments its clock and sends its timestamped `REQ` to all processes, including itself. On receiving any message, it first updates the scalar clock using the receive rule. It then handles the message as follows:

- **`REQ`:** add it to `Requests`, increment the clock for the send, and return a timestamped `ACK`.
- **`ACK`:** add it to `Acks`.
- **`RLS`:** remove the sender's active request from `Requests`.

A process with an active request can enter only when **both** conditions hold:

1. Its request has the smallest timestamp in its local `Requests` set.
2. It has an `ACK` from **every process**, timestamped later than its request.

The first condition chooses a winner among known requests. The second, together with FIFO delivery, prevents an earlier request from remaining hidden in transit while that winner enters. Old acknowledgments do not suffice: the timestamp test must hold for the current request.

On release, the process removes its own request, clears `my_req`, increments its clock and broadcasts `RLS`. Peers can then remove that request and reconsider their waiting requests.

### Step-by-Step Execution Example

In the following example, pairs are written as **(clock, ID)** for comparison. Initially all clocks are zero. An application message from $p_1$ advances $p_3$'s clock to 2. At clock 3, $p_3$ requests entry with timestamp $(3,3)$. Processes $p_1,p_2$ receive it at clock 4, record it, and acknowledge at clock 5.

At clock 6, $p_1$ also requests entry, with timestamp $(6,1)$.

![[DS-L5-slide-59-mutex-example-wait.png|740]]

Even after $p_1$ receives the required acknowledgments with timestamps later than its request, it must wait: its queue still contains $(3,3)<(6,1)$. Meanwhile, $p_3$ receives its remaining acknowledgment at clock 9. Its request is the smallest, so it enters.

![[DS-L5-slide-61-mutex-example-release.png|740]]

When $p_3$ releases at clock 10, it broadcasts `RLS`. At clock 11, $p_1$ receives it and removes $(3,3)$. Its own request is now smallest and its acknowledgments are already available, so it enters.

### Correctness Proofs and Performance

**Mutual exclusion.** Suppose two active requests $r_i,r_j$ overlap in the CS, with $\operatorname{ts}(r_i)<\operatorname{ts}(r_j)$. To enter, $p_j$ must have received an acknowledgment from $p_i$ timestamped later than $r_j$, hence later than $r_i$. Since $p_i$'s clock increases, it sent $r_i$ before sending that acknowledgment. FIFO delivery ensures that $p_j$ receives $r_i$ before the acknowledgment that permits entry. Because $r_i$ has not been released, it remains in $p_j$'s queue and is smaller than $r_j$, contradicting the entry condition.

**Fairness.** If $r_j\to r_i$, the clock condition gives $\operatorname{ts}(r_j)<\operatorname{ts}(r_i)$. Before entering for $r_i$, $p_i$ needs a later acknowledgment from $p_j$. Process $p_j$ sent $r_j$ before that acknowledgment, so FIFO delivers $r_j$ to $p_i$ first. Unless $p_j$ has already released it, the earlier request blocks $p_i$. Thus $p_i$ cannot enter ahead of $p_j$.

> [!warning] What Happens If Links Are NOT FIFO? (Slide 66 Homework)
> The FIFO step in these proofs is essential. Without it, an acknowledgment can overtake the sender's earlier request. For example, $p_j$ sends request $(1,j)$, then acknowledges $p_i$'s request $(2,i)$ at $(4,j)$. If $p_i$ sees the acknowledgment while $(1,j)$ is still in transit, it can satisfy both entry conditions prematurely. A full counterexample must also show $p_j$'s entry conditions and the overlapping CS intervals; the overtaking step alone does not establish simultaneous entry.

Each CS execution exchanges $N-1$ requests, $N-1$ acknowledgments and $N-1$ releases with remote processes:

$$
3(N-1)\text{ messages per CS execution}.
$$

With no competing request, entry needs one request–acknowledgment round trip, or two message transmission delays in the simplified timing model.

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

The synchronous implementation assumes crash-stop processes and perfect point-to-point links: messages between non-crashed endpoints arrive within a known bound $\text{max\_delay}$. The heartbeat implementations developed in Lesson 7 use the slides' simplified timing model, where local processing and clock drift are negligible relative to message delays.

![[DS-L6-slide-10-pfd-spec.png|720]]

The detector emits $\langle\mathcal{P},\operatorname{Crash}\mid p\rangle$ and satisfies:

- **PFD1 — Strong completeness:** eventually, every crashed process is permanently detected by every correct process.
- **PFD2 — Strong accuracy:** if any process detects $p$, then $p$ has already crashed.

A **correct** process never crashes in the execution. Completeness cannot require a process that later crashes to keep executing detection steps. Accuracy is stronger: even a process that will eventually crash must not be detected prematurely. In the crash-stop model, a valid crash notification is irrevocable.

The next lesson implements this interface using heartbeat requests and synchronized rounds, then weakens accuracy for eventual synchrony: [[DS LESSON 7]].

## Sources

- [Time II slides](<Assets/SLIDES/DS-2425Time2.pdf>), PDF pages 50–66: mutual-exclusion abstraction, Lamport’s algorithm, examples, correctness and non-FIFO homework.
- [Failure-detection slides](<Assets/SLIDES/DS-2425Failure_detection_leader_election.pdf>), 94-page version, PDF pages 3–10: motivation, timing assumptions and the perfect-detector specification.
- [Professor’s lecture log](https://sites.google.com/view/distributedsystems-202627/lectures), lecture 6, 12 October 2026. The [lesson 7 transcript](<Assets/TRANSCRIPTED DS/DS LESSON 7 TRANSCRIPTED.md>) opens by recalling mutex and the perfect-detector interface from the preceding class, before developing the implementations.
