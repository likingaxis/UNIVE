
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

### Why Increasing Timeout Eventually Works

**Strong completeness.** After a crash, no new replies are generated. Only finitely many earlier replies remain in transit, so they can add the crashed process to `alive` only finitely often. After the last one, a subsequent check suspects it, and no later reply can restore it.

**Eventual strong accuracy.** After stabilization, correct processes' round trips have a finite bound, $2\,\text{MAX\_DELAY}$ in the simplified model. Suppose false suspicions continue. Replies from the correct peers eventually cause restorations and increases of $\Delta$, so `delay` cannot remain below this bound forever. Once it is large enough, every fresh request–reply exchange finishes within its window. If increases stop earlier, that can only be because the repeated suspicion–reply pattern has stopped. In either case, after any transient old messages and suspicions are handled, correct processes cease to be suspected.

The final timeout cannot be predicted from the post-stabilization delay bound alone. The initial asynchronous period can last arbitrarily long and produce arbitrarily many increases before stabilization. Thus the timeout eventually becomes adequate, but can be much larger than the eventual network delay.


### Stabilization of the Suspected Sets

![[Pasted image 20261103121236.png|740]]

With finitely many crash-stop processes, there is a time after the last crash. Completeness eventually puts every crashed process permanently into every correct observer's suspected set; eventual accuracy eventually excludes every correct process from those sets. Taking the maximum of these finitely many times gives a time $t$ such that

$$
\forall t'\ge t:\quad
\operatorname{suspected}_{p_1}(t')
=\operatorname{suspected}_{p_2}(t')
=\operatorname{Crashed}
$$

for any correct observers $p_1,p_2$. This is eventual agreement on the set of processes that crash in the execution; it does not require observers to agree during the unstable period.

![[Pasted image 20261103121557.png|680]]

