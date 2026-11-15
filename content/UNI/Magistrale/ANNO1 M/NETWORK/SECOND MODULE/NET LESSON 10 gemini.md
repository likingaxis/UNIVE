# Lesson 10 — Optical Devices, Signal Impairments, and Management (Study Guide)

*AI-assisted study guide derived from `NI02` slides, `NI_L3-2026-11-09.pdf`, `NI_Notebook.pdf`, the Lesson 10 transcript, and your original rough draft [[NET LESSON 10]]. Block 1 below covers the opening SLA/OLT recap and Optical Add/Drop Multiplexers (OADMs).*

---

## Block 1 — SLA Monitoring, Logical vs. Physical Topologies, and OADMs

### From OLT transponders to SLAs and bit error rate

Before installing a lightpath, a client—such as an enterprise or an IP operator—negotiates a **Service Level Agreement (SLA)** specifying constraints like maximum latency and minimum signal quality. Signal quality can be checked at two levels:

- **Optical power (optical domain):** a coarse physical measurement that checks whether enough light arrives, without inspecting the digital content.
- **Bit Error Rate, $\mathrm{BER}$ (electrical domain):** the fraction of received bits that are corrupted. Measuring $\mathrm{BER}$ requires recovering the actual binary stream (`O/E` conversion), because raw light waves inside a fiber have no notion of bits.

Because $\mathrm{BER}$ monitoring, client adaptation (converting gray $1.3\ \mu\mathrm{m}$ client interfaces to ITU $1.55\ \mu\mathrm{m}$ WDM channels), and OTN/FEC framing happen in electronics inside a **transponder**, an operator must place transponders carefully: they give full visibility and control at network boundaries, yet they dominate the cost, rack space (footprint), and power consumption of an Optical Line Terminal (OLT). That trade-off raises the central design question of Lesson 10: **how do we avoid wasting transponders on traffic that merely passes through an intermediate site?**

---

### Why point-to-point OLTs waste transponders: the 3-node $A$–$B$–$C$ example

Suppose a company wants to connect three regional sites $A$, $B$, and $C$ according to a **logical network** (the optical channels required between site pairs):

- $N_{AB} = 1$ optical channel between $A$ and $B$,
- $N_{BC} = 1$ optical channel between $B$ and $C$,
- $N_{AC} = 3$ optical channels between $A$ and $C$ (higher expected traffic).

In the real world, however, those three sites lie along a single **physical substrate** $A - B - C$ made of two point-to-point fiber links: $A\text{–}B$ and $B\text{–}C$. Because the three $A\text{–}C$ lightpaths have no direct fiber bypassing $B$, both physical spans must carry four wavelengths simultaneously: $1 + 3 = 4$ on $A\text{–}B$, and $1 + 3 = 4$ on $B\text{–}C$.

![[net-l10-abc-logical-vs-physical.svg|820]]
*Vector redraw of the professor's whiteboard sketch ([NI_L3-2026-11-09.pdf](<../Assets/SLIDES/SECOND MODULE/NI_L3-2026-11-09.pdf>), p. 1): top, the 3-node logical demand; bottom, why each physical span carries 4 wavelengths.*

#### Resolving the slide confusion: 3 nodes vs. 4 boxes

When comparing the sketch with Slide 17, it is easy to misread the dark-gray squares as "nodes." In reality:

- **The 3 nodes** are the three physical sites labeled at the top: **Node A**, **Node B**, and **Node C**.
- **Each dark-gray box is a transponder**—one per wavelength carried on the attached fiber. Because each span carries $4$ wavelengths, Node A's OLT has $4$ transponders, Node C's OLT has $4$ transponders, and the middle of the link shows how Node B handles those $4$ wavelengths.
- **Why there are 4 light-gray OLT boxes in diagram (a):** without an OADM, Node B must terminate the fiber arriving from A with **one OLT** (left box, $4$ transponders) and launch the outgoing fiber toward C with **a second OLT** (right box, $4$ transponders).

![[net-l10-slide-17-oadm-savings.png|760]]
*Source: [NI02 — Optical Networks](<../Assets/SLIDES/SECOND MODULE/NI02 - optical networks.pdf>), slide 17 (PDF page 18).*

Counting transponder functions across the two architectures makes the waste immediate:

1. **Without OADM — architecture (a) with point-to-point OLTs:**
   Node A uses $4$ transponders, Node C uses $4$, and Node B uses $4 + 4 = 8$ transponders ($4$ to convert every incoming wavelength from A into electricity, and $4$ more to retransmit them toward C):
   $$N_{\mathrm{TP}}^{\mathrm{OLT}} = 4 + 8 + 4 = 16.$$
   Of the $4$ channels arriving at Node B from A, only $1$ is actually meant for B. The other $3$ belong to $A\text{–}C$ and pay an unnecessary $\mathrm{O/E/O}$ conversion twice just to cross B.

2. **With an OADM at Node B — architecture (b):**
   An **Optical Add/Drop Multiplexer (OADM)** keeps the three transit $A\text{–}C$ channels entirely in the optical domain (**optical pass-through**). Node B terminates only the $1$ local $A\text{–}B$ wavelength (**Drop**) and generates the $1$ local $B\text{–}C$ wavelength (**Add**), reducing Node B from $8$ transponders to $2$:
   $$N_{\mathrm{TP}}^{\mathrm{OADM}} = 4 + 2 + 4 = 10.$$
   Replacing point-to-point OLTs at Node B eliminates $6$ transponders—a **37.5% saving** in this example, and approaching a **50% reduction** at intermediate nodes when most traffic is pass-through.

---

### How an OADM works: 4-port abstraction and internal architecture

From a logical perspective, an OADM acts as a **4-port optical device** placed along a line or a metropolitan ring interconnecting central offices:

![[net-l10-oadm-4port.svg|720]]
*Vector redraw of the professor's 4-port OADM sketch ([NI_L3-2026-11-09.pdf](<../Assets/SLIDES/SECOND MODULE/NI_L3-2026-11-09.pdf>), p. 1).*

Notice an important wavelength-reuse detail in the 4-port view: when the OADM **drops** wavelength $\lambda_1$ (red) to Node B's local client, $\lambda_1$ is removed from the optical signal continuing downstream. Because $\lambda_1$ is now free on the outgoing fiber toward Node C, Node B can **add** its own local $B\text{–}C$ traffic onto that exact same wavelength $\lambda_1$ without interfering with the transit wavelengths ($\lambda_2, \lambda_3, \lambda_4$).

Internally, the professor leaves variants (b), (c), and (d) aside and focuses strictly on **architecture (a)** from Slide 18:

![[net-l10-slide-18-oadm-architectures.png|820]]
*Source: [NI02 — Optical Networks](<../Assets/SLIDES/SECOND MODULE/NI02 - optical networks.pdf>), slide 18 (PDF page 19). Focus on **(a)**.*

In architecture **(a)**, the composite incoming WDM signal ($\lambda_1, \lambda_2, \dots, \lambda_W$) enters a **Demux** that separates wavelengths spatially:

- Wavelengths destined locally (here $\lambda_1, \lambda_2$) exit through the **Drop** ports to local receivers.
- Remaining pass-through wavelengths (up through $\lambda_W$) continue straight across to the **Mux** inside the optical domain without electronic conversion.
- Locally originated signals enter through the **Add** ports and combine with the pass-through wavelengths inside a **Mux** onto the outgoing fiber.

Because this basic OADM is **fixed** (physically wired for specific add/drop wavelengths) and sits on a **single incoming/outgoing fiber** (typical of metro rings), it cannot dynamically steer lightpaths across multiple outgoing directions in a meshed backbone—which motivates **Optical Crossconnects (OXCs)** in the next block.

---

## Sources (Block 1)

- [NI02 — Optical Networks](<../Assets/SLIDES/SECOND MODULE/NI02 - optical networks.pdf>), slides 15–18 (PDF pages 16–19).
- [Professor's whiteboard sketches](<../Assets/SLIDES/SECOND MODULE/NI_L3-2026-11-09.pdf>), page 1.
- [Professor's study notebook](<../Assets/SLIDES/SECOND MODULE/NI_Notebook.pdf>), §2.6.1 (monitoring/BER) and §2.6.2 (OADMs), printed pages 25–32.
- [Lesson 10 transcript](<../Assets/TRANSCRIPTION NETWORK/network lesson 10 transcripted.md>), opening recap through OADM architectures.
- Student rough draft: [[NET LESSON 10]].
