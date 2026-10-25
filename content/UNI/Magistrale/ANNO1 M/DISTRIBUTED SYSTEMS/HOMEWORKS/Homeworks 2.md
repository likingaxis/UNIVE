![[Pasted image 20261025214822.png]]

#### FIFO links — algorithm modifications

*Exercise restated from the existing [[../DS LESSON 4#FIFO correctness exercises|Lesson 4 notes]]. The pseudocode below is an explanatory reconstruction.*

A **FIFO perfect link** is built on top of a **perfect link**. Assume correct sender and receiver processes and fair execution of enabled handlers.
- The first message sent to each destination has sequence number $1$.
- At the receiver, `next[p]` starts at `1` and `pending` is initially empty.

##### Original algorithm

```text
Sender p:
    for each destination q: seq[q] := 0
    on fifo.Send(q, m):
        seq[q] := seq[q] + 1
        pl.Send(q, (seq[q], m))

Receiver q:
    for every sender p: next[p] := 1
    pending := {}

    on pl.Deliver(p, (k, m)):
        pending := pending union {(p, k, m)}

    whenever there exists (p, k, m) in pending with k = next[p]:
        remove (p, k, m) from pending
        next[p] := next[p] + 1
        fifo.Deliver(p, m)
```

##### Task

Analyze each variant below **separately**, starting from the original algorithm except for the changes explicitly stated.

For each variant, determine whether the algorithm still satisfies:

1. **FIFO ordering:** messages from the same sender that are both delivered must be delivered in their send order.
2. **No creation:** a delivered message must have been sent by its claimed sender.
3. **No duplication:** each message is delivered at most once.
4. **Reliable delivery:** a message sent by a correct process to a correct receiver is eventually delivered.

For every property:
- If it fails, construct a **valid counterexample execution**, showing the send/receive order, the guard and the successive values of `next[p]`.
- If it holds, explain the **invariant or mechanism** that preserves it in every allowed execution.

###### A — More permissive guard

Replace `k = next[p]` with `k >= next[p]`.
- Keep `next[p] := next[p] + 1`.
- Keep removing the delivered message from `pending`.

###### B — Advance to the delivered sequence number

Use `k >= next[p]` and replace the update with `next[p] := k + 1`.
- Keep removing the delivered message from `pending`.

###### C — Keep delivered messages pending

Use `k >= next[p]` and keep `next[p] := next[p] + 1`.
- Do **not** remove the delivered message from `pending`.

###### D — Different receiver initialization

Initialize `next[p] := 4` instead of `1`.
- Keep the original equality guard, increment and removal.
- The sender still transmits sequence numbers starting at $1$.

###### E — Different first sequence number

Keep `next[p] := 1`, the original equality guard, increment and removal.
- The sender's first transmitted message has sequence number $3$, followed by $4,5,\ldots$.

##### Worked analysis

See [[../DS LESSON 4#FIFO correctness exercises|the variant-by-variant explanations in Lesson 4]].
