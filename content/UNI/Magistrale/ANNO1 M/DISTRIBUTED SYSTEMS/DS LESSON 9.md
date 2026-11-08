# Lesson 9 — Reliable Broadcast

## Broadcast communication

Until now, we have mainly studied point-to-point communication between two processes.

![[ds-l09-point-to-point.svg|680]]

We now move to **broadcast communication**, where one process sends a message to every process in the system, including itself.

![[ds-l09-broadcast-group.svg|680]]

Think of $p_0$ as the source of the broadcast. A basic implementation is straightforward: $p_0$ takes a message $m$ and sends it to $p_1$, $p_2$, and every other destination. If the sender and destinations are correct, perfect point-to-point links guarantee eventual delivery.

But what happens if the source crashes while broadcasting?

![[ds-l09-sender-crash.svg|680]]

Some processes may receive the message while others never do. Perfect links alone do not solve this problem: their reliable-delivery guarantee requires both endpoints to be correct. If the sender eventually crashes, delivery is not guaranteed to every correct destination. We therefore want stronger broadcast guarantees when the source fails.

### BEB(Best-Effort Broadcast)

**Best-Effort Broadcast (BEB)** is the simplest broadcast abstraction. A process sends a message to every process in the system using perfect point-to-point links. It has three properties:

- **BEB1 — Validity:** if a correct process broadcasts $m$, every correct process eventually delivers $m$.
- **BEB2 — No duplication:** no process delivers the same message more than once.
- **BEB3 — No creation:** every delivered message must have been previously broadcast by its claimed sender.

![[ds-l09-slide-06-beb.png|850]]

The architectural idea is to build a higher-level abstraction using a lower-level one. We do not reimplement perfect links; we use their properties. However, BEB leaves delivery unconstrained when the original sender crashes, so it does not ensure that correct processes agree on which messages to deliver.

### Regular Reliable Broadcast

**Regular Reliable Broadcast (RB)** adds an **Agreement** property: if some correct process delivers a message $m$, every correct process eventually delivers it.

$$
\operatorname{Deliver}_p(m)\land p\in C
\quad\Longrightarrow\quad
\forall q\in C,\;\Diamond\operatorname{Deliver}_q(m),
$$

where $C$ is the set of correct processes and $\Diamond$ means “eventually.” The original sender need not be correct for Agreement to apply; what matters is that a correct process delivers the message.

RB has four properties:

- **RB1 — Validity:** if a correct process broadcasts $m$, it eventually delivers $m$ itself.
- **RB2 — No duplication:** no process delivers the same message more than once.
- **RB3 — No creation:** every delivered message was previously broadcast by its claimed sender.
- **RB4 — Agreement:** if one correct process delivers $m$, all correct processes eventually deliver $m$.

Validity and Agreement together ensure that a correct sender's message eventually reaches every correct process.

We distinguish two events: **Broadcast($m$)** requests that $m$ be sent to everyone; **Deliver($m$)** passes the message from the broadcast abstraction to the upper layer. Receiving a lower-level message is not necessarily the same as delivering it to the application.

## Lazy Reliable Broadcast

**Lazy Reliable Broadcast (Lazy RB)** implements RB using two abstractions:

- **Best-Effort Broadcast (BEB)** to send messages to everyone.
- **Perfect Failure Detector ($\mathcal{P}$)** to detect crashes.

When the original sender crashes, other processes help by retransmitting messages that it may have failed to send to everyone.

![[ds-l09-lazy-partial-delivery.svg|680]]

Here, $P_2$ knows the message, but $P_1$ and $P_3$ do not. When $P_2$ detects that $P_0$ has crashed, it broadcasts $m$ again on behalf of $P_0$.

![[ds-l09-lazy-relay.svg|680]]

The algorithm is **lazy** because it retransmits a message only after detecting the original sender's crash.

![[ds-l09-slide-12-lazy-rb.png|850]]

The set `correct` contains processes that have not been detected as crashed; initially, it contains every process in $\Pi$. The structure `from[p]` stores messages already RB-delivered from original sender $p$. For example:

```text
from[P0] = {m1, m2}
from[P1] = {m3}
from[P2] = {}
```

This means we have delivered $m_1$ and $m_2$ from $P_0$, $m_3$ from $P_1$, and no messages from $P_2$. Checking this structure before delivery prevents duplicates.

In `beb.Deliver(p, [DATA, s, m])`, the two process identifiers may differ: `p` is the process that transmitted this BEB copy, while `s` is the **original sender**. If $m\notin\texttt{from[s]}$, the algorithm RB-delivers $m$ and records it in `from[s]`.

There are two cases in which it relays the message:

1. **The crash is detected before the message arrives.** When the message arrives, `s` is already absent from `correct`, so the delivery handler rebroadcasts it.
2. **The message arrives before the crash is detected.** On `Crash(p)`, the algorithm removes $p$ from `correct` and rebroadcasts all messages stored in `from[p]`.

![[Pasted image 20261108195547.png|401]]

For the second case, suppose $P_3$ broadcasts $m$, crashes, and only $P_5$ receives the message:

1. $P_5$ receives $m$ while it still considers $P_3$ correct.
2. It delivers $m$ and adds it to `from[P3]`, without rebroadcasting it yet.
3. Later, the detector reports that $P_3$ crashed.
4. $P_5$ reads `from[P3]` and rebroadcasts $m$.

Because $P_5$ is correct, its BEB retransmission eventually reaches every correct process.

![[ds-l09-slide-14-lazy-run.png|850]]

What if every process that receives the message eventually crashes? Suppose $P_3$ broadcasts $m$ and $P_5$ receives and delivers it, but both eventually crash. Meanwhile, $P_1$ and $P_2$ remain correct and never deliver $m$.

![[ds-l09-faulty-only-delivery.svg|680]]

This is permitted by regular Agreement. Neither $P_3$ nor $P_5$ is a correct process, because both eventually crash. No correct process delivers $m$, so Agreement imposes no delivery obligation for this message.

### Proving LRB

The first three properties follow from BEB and the local duplicate check:

- **Validity:** a correct sender's BEB broadcast eventually reaches every correct process, including itself. The delivery handler then RB-delivers the message.
- **No creation:** the algorithm only delivers messages obtained through BEB, retaining the original sender's identity when relaying them.
- **No duplication:** before delivery, it checks whether $m$ is already in `from[s]` and records it after the first delivery.

To prove **Agreement by contradiction**, suppose a correct process $p$ delivers $m$, but another correct process $p'$ never does. Let $q$ be the original sender.

**Case 1 — $q$ never crashes.** Its initial BEB broadcast eventually reaches every correct process. Therefore, $p'$ receives and RB-delivers $m$, contradicting the assumption.

**Case 2 — $q$ crashes, and $p$ detects the crash before receiving $m$.** When $p$ receives $m$, it already knows that $q$ crashed and rebroadcasts the message. Since $p$ is correct, its BEB broadcast eventually reaches $p'$, which must deliver $m$: a contradiction.

**Case 3 — $q$ crashes, and $p$ detects the crash after receiving $m$.** Initially, $p$ delivers $m$ and stores it in `from[q]`, without retransmitting it. Strong completeness ensures that $p$ eventually detects $q$'s crash. It then retransmits the stored message, and BEB guarantees that $p'$ eventually receives and delivers it: again a contradiction.

These cases cover both possible orders of message reception and crash detection, so Agreement holds.

## Complexity and delays of LRB

Let $\Pi$ be the set of all processes, $C$ the correct processes, $F$ the faulty processes, and $\operatorname{DELMSG}(p)$ the set of messages RB-delivered by $p$ during the complete execution.

For two correct processes, Agreement guarantees:

$$
\operatorname{DELMSG}(p)=\operatorname{DELMSG}(p')
\qquad\text{for all }p,p'\in C.
$$

This concerns the complete sets eventually delivered, not equal sets at every instant. It also gives no delivery-order guarantee.

For two faulty processes there is no general equality or inclusion guarantee. For example, one may deliver $\{a,b\}$ and another $\{a,c,d\}$ before crashing. Nor is there a general equality or inclusion guarantee between a correct and a faulty process: a faulty process may deliver something that no correct process ever delivers. This distinction motivates Uniform Reliable Broadcast later.

### Message complexity of Lazy RB

We count the lower-level point-to-point messages generated for **one logical reliable broadcast**, with $n=|\Pi|$.

If the original sender is correct, it invokes BEB once. BEB sends $m$ to all $n$ processes, including the sender itself, and no relay is needed:

$$
\boxed{M_{\mathrm{best}}(n)=n=O(n).}
$$

If the original sender crashes, many surviving processes may independently retransmit the same message. There can be on the order of $n$ BEB broadcasts, each sending to $n$ destinations:

$$
\boxed{M_{\mathrm{worst}}(n)=O(n^2).}
$$

Even **one sender crash** can produce quadratic traffic. This does not violate No duplication: processes may receive several lower-level copies, while `from` ensures that they RB-deliver the logical message at most once.

### Communication delays of Lazy RB

The professor also measures performance in **communication steps**, or **message delays**. For this analysis, each successfully delivered message takes one time unit. This is a performance convention, not a synchrony assumption needed for correctness.

In the best case, the sender's messages travel in parallel and reach every correct process in one step. In the worst case, a chain of crashing relays passes the message to only one new process at each step:

$$
\boxed{D_{\mathrm{best}}=1,\qquad D_{\mathrm{worst}}=O(n).}
$$

These communication-step counts do not give a fixed real-time bound on crash detection by the abstract failure detector.

![[ds-l09-crash-chain.svg|680]]

## Eager Reliable Broadcast

Can we implement RB **without a failure detector**? First, consider replacing $\mathcal{P}$ in Lazy RB with an eventually perfect detector, $\Diamond\mathcal{P}$.

A perfect detector eventually detects every crash and never reports a process before it crashes. An eventually perfect detector can make false suspicions initially, but eventually stops suspecting correct processes and permanently suspects crashed ones.

Suppose $P_0$ broadcasts $m$ and remains correct, but $P_1$ mistakenly suspects it and retransmits $m$. This wastes messages, but does not violate RB: `from` still prevents duplicate deliveries. The lecture uses this observation to ask why relaying must wait for a crash indication at all.

The relevant Lazy RB handler is:

```text
upon beb.Deliver(p, [DATA, s, m]):
    if m ∉ from[s]:
        rb.Deliver(s, m)
        from[s] := from[s] ∪ {m}

        if s ∉ correct:
            beb.Broadcast([DATA, s, m])
```

If we remove the last `if`, every process retransmits a message the first time it receives it, regardless of whether the original sender has crashed. We can then remove the failure detector and its crash handler entirely. This gives **Eager Reliable Broadcast (Eager RB)**, which works in the fail-silent model using BEB alone.

![[ds-l09-slide-26-eager-rb.png|850]]

For example, suppose $P_0$ crashes after sending $m$ only to $P_1$. If $P_1$ is correct, it receives and delivers $m$, then uses BEB to relay it to everyone. By BEB Validity, every correct process eventually receives the message, satisfying Agreement.

The algorithm is **eager** because each process relays a new message immediately instead of waiting for a crash indication.

### Message complexity

In a failure-free execution, every process receives $m$ and triggers a BEB relay, each costing $n$ point-to-point messages. Hence the relay traffic is:

$$
n\times n=n^2,\qquad \boxed{M(n)=O(n^2).}
$$

The initial broadcast adds only $O(n)$ traffic, so it does not change this asymptotic bound. Unlike Lazy RB, Eager RB generates quadratic traffic even without failures. Crashes may reduce the actual count; the lecture's comparison emphasizes that Eager RB lacks Lazy RB's linear-message advantage in a failure-free execution.

### Communication delays

The communication-delay bounds remain the same:

| Algorithm | Best case | Worst case |
| --- | --- | --- |
| Lazy RB | 1 step | $O(n)$ steps |
| Eager RB | 1 step | $O(n)$ steps |

In the best case, the original sender's BEB broadcast reaches everyone in parallel. In the worst case, a chain of crashing relays lets only one new process receive the message at each step.

Both algorithms tolerate up to $n-1$ crash failures while leaving at least one correct process. If all processes eventually crash, Validity and regular Agreement impose no liveness obligations on correct processes; No creation and No duplication must still hold.

## Uniform Reliable Broadcast

Regular Agreement only applies when a **correct** process delivers a message. Suppose instead that:

- $P_0$ broadcasts $m$ and crashes.
- $P_1$ delivers $m$, then crashes.
- $P_2$ remains correct but never delivers $m$.

![[ds-l09-rb-not-uniform.svg|680]]

RB permits this: no correct process delivered $m$, so regular Agreement is not violated. **Uniform Reliable Broadcast (URB)** forbids it through **Uniform agreement**:

> If any process delivers a message $m$, whether correct or faulty, every correct process eventually delivers $m$.

URB retains RB's Validity, No duplication and No creation properties. An execution satisfying URB also satisfies RB and BEB; the reverse need not hold.

### All-Ack Uniform Reliable Broadcast

Suppose $P_0$ broadcasts $m$ using BEB and delivers it as soon as it receives its own copy. If it then crashes before anyone else receives $m$, Uniform agreement may be violated. The algorithm therefore needs evidence that delivery is safe even if the delivering process crashes immediately afterward.

One idea is to have receivers send **acknowledgments (ACKs)** confirming reception. Waiting for all $n$ ACKs, however, would block forever if even one process crashed before acknowledging. A correct sender could then fail to deliver its own message, violating Validity.

With $\mathcal{P}$, we can instead wait for an acknowledgment from every process **not yet detected as crashed**. A crashed process may temporarily remain in this set, but strong completeness eventually removes it.

Explicit ACK messages are unnecessary: as in Eager RB, each process relays a message on first seeing it. Receiving that relay is also evidence that the relaying process has seen $m$. Relaying both propagates the message and acknowledges reception.

The **All-Ack URB** algorithm uses four data structures:

| Variable | Purpose |
| --- | --- |
| `delivered` | Messages already URB-delivered; prevents duplicate deliveries. |
| `pending` | Sender–message pairs seen or initiated and retained for the delivery check. |
| `correct` | Processes not yet detected as crashed; initially $\Pi$. |
| `ack[m]` | Processes from which a BEB copy of $m$ has been received, serving as an acknowledgment. |

The function `candeliver(m)` tests:

```text
function candeliver(m):
    return correct ⊆ ack[m]
```

A pending message is URB-delivered only when this condition holds and it has not already been delivered. The detector updates `correct`; falsely removing a process that has not crashed could make the condition unsafe.

![[ds-l09-slide-31-all-ack-urb.png|850]]

The professor introduces this pseudocode on PDF page 31 and leaves its formal correctness proof for the next lecture.

### Why ACKs solve this

Imagine three robots that must execute the command **START PLANTING**. If $P_0$ acts on the message and then crashes while $P_1$ and $P_2$ never see it, regular RB can permit the resulting disagreement. URB requires the correct robots eventually to deliver the command as well.

Compare the two sequences, assuming $P_1$ and $P_2$ are correct:

- **Without sufficient acknowledgment:** $P_0$ receives $m$ → URB-delivers $m$ → crashes. The others may never receive it.
- **With sufficient acknowledgment:** $P_1$ and $P_2$ receive and relay $m$ → $P_0$ receives the required ACKs → URB-delivers $m$ → crashes. The correct processes already know the message and can eventually deliver it themselves.

If $P_0$ crashes before obtaining enough ACKs, it never URB-delivers $m$. Other processes may still propagate and deliver it. The point is to prevent a process from delivering before it has sufficient evidence that the correct processes will eventually deliver too.

> [!note]- Original screenshot reference
> The following screenshot was referenced in the draft but was not found locally during cleanup. The source algorithm is shown above from PDF page 31.
>
> ![[Pasted image 20261108210641.png]]
