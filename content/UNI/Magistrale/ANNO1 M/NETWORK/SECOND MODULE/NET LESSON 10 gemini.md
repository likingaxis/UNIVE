# Lesson 10 — Optical Devices, Transparency, and Signal Regeneration

*AI-assisted study guide combining the professor's lecture explanations, whiteboard sketches, slides, and study notebook.*

## Signal quality, SLAs, and the cost of transponders

When a customer asks an optical operator to build a lightpath between two sites, they negotiate a **Service Level Agreement (SLA)**. Along with maximum latency, the customer often requires a guarantee on **signal quality**, which can be checked in two very different ways:

- **Measuring optical power (optical domain):** checks how much light power reaches the receiver. This is easy to do directly in optics, without converting the signal, but it is only a rough check: it tells you whether enough light arrived, not whether the bits inside are readable.
- **Measuring Bit Error Rate, $\mathrm{BER}$ (electrical domain):** checks the fraction of received bits that are wrong (for example, keeping $\mathrm{BER}$ below a strict threshold). Because light inside an optical fiber is just an analog electromagnetic wave with no visible bits, measuring $\mathrm{BER}$ requires converting the optical signal back into electricity (`O/E`) inside a **transponder**.

This creates a fundamental design tension. On one hand, **transponders** are essential at network boundaries and at selected monitoring points because converting to electricity lets us adapt gray client signals ($1.3\ \mu\mathrm{m}$) to standard WDM wavelengths ($1.55\ \mu\mathrm{m}$), add OTN/FEC error-correction headers, and monitor $\mathrm{BER}$. On the other hand, transponders are expensive, physically large (an OLT rack can be the size of a refrigerator), and consume a lot of power. A network designer therefore tries to minimize the number of transponders and avoid converting transit traffic back into electricity unnecessarily.

## Optical Add/Drop Multiplexers (OADMs)

### Logical demand vs. physical links

To see why ordinary point-to-point OLTs waste transponders, consider three branches of the same company in cities $A$, $B$, and $C$. Suppose their **logical network** requires:

- $1$ optical channel between $A$ and $B$,
- $1$ optical channel between $B$ and $C$,
- $3$ optical channels between $A$ and $C$ (where traffic between the two sites is much heavier).

Physically, however, there is no direct fiber linking $A$ and $C$. Instead, the underlying **physical substrate** is a line $A - B - C$ made of two spans: $A\text{–}B$ and $B\text{–}C$. Because the three $A\text{–}C$ connections have to cross $B$ to reach $C$, every fiber span carries four wavelengths in total: $1 + 3 = 4$ wavelengths on $A\text{–}B$, and $1 + 3 = 4$ wavelengths on $B\text{–}C$.

![[net-l10-abc-logical-vs-physical.svg|820]]

*Professor's sketch ([NI_L3-2026-11-09.pdf](<../Assets/SLIDES/SECOND MODULE/NI_L3-2026-11-09.pdf>), p. 1): top, the 3-node logical demand; bottom, why both physical spans carry 4 wavelengths.*

### Reading the OLT vs. OADM diagram

When looking at the diagram below, notice how the three sites map onto the hardware boxes:

- The **3 nodes** are the three sites labeled at the top: **Node A**, **Node B**, and **Node C**.
- Each **dark-gray square** is a **transponder** (one for each of the $4$ wavelengths carried on the fiber), not a network node.
- Each **light-gray rectangle** is an **OLT** containing a multiplexer/demultiplexer and $4$ transponders. In **(a)**, Node $B$ sits between two point-to-point links ($A\text{–}B$ and $B\text{–}C$), so it needs **two OLTs**: one to terminate all $4$ channels arriving from $A$, and a second to retransmit $4$ channels toward $C$. That is why there are $4$ OLT rectangles in **(a)** even though there are only $3$ cities.

![[net-l10-slide-17-oadm-savings.png|760]]

*Source: [NI02 — Optical Networks](<../Assets/SLIDES/SECOND MODULE/NI02 - optical networks.pdf>), slide 17 (PDF page 18).*

Comparing the transponder count in **(a)** and **(b)** shows why an **Optical Add/Drop Multiplexer (OADM)** matters:

- **Point-to-point OLTs, diagram (a):** Node $A$ uses $4$ transponders, Node $C$ uses $4$, and Node $B$ uses $4 + 4 = 8$, for a total of $4 + 8 + 4 = 16$ transponders. Yet of the $4$ channels reaching Node $B$ from $A$, only $1$ is actually destined for $B$. The other $3$ carry $A\text{–}C$ traffic and undergo two useless `O/E/O` conversions just to pass through $B$.
- **Using an OADM at Node $B$, diagram (b):** An OADM lets the $3$ transit $A\text{–}C$ wavelengths stay completely in the optical domain (**optical pass-through**). Node $B$ terminates only the $1$ local $A\text{–}B$ channel (**Drop**) and transmits only the $1$ local $B\text{–}C$ channel (**Add**), cutting Node $B$ from $8$ transponders down to $2$. The total becomes $4 + 2 + 4 = 10$ transponders, saving $6$ transponders ($37.5\%$). When most traffic at an intermediate node is pass-through, the transponder savings at that node approach $50\%$.

### How an OADM works and where it is used

In real networks, OADMs are especially common in **metropolitan rings** that connect several local central offices to the wider backbone. Each central office along the ring only needs to inject its own outgoing traffic and extract its own incoming traffic, while letting every other city's wavelengths continue uninterrupted around the ring.

Logically, you can picture an OADM as a **4-port optical device**: an incoming WDM fiber, an outgoing WDM fiber, a **Drop** port, and an **Add** port.

![[net-l10-oadm-4port.svg|720]]

*Professor's 4-port OADM sketch ([NI_L3-2026-11-09.pdf](<../Assets/SLIDES/SECOND MODULE/NI_L3-2026-11-09.pdf>), p. 1).*

Notice how wavelengths are reused in that 4-port view. When the OADM drops $\lambda_1$ (red) down to Node $B$'s local receiver, $\lambda_1$ is removed from the main fiber. Because that exact wavelength slot is now empty on the outgoing fiber toward $C$, Node $B$ can immediately add its own $B\text{–}C$ signal onto $\lambda_1$ without interfering with the transit channels ($\lambda_2, \lambda_3, \lambda_4$).

Internally, the course focuses on the basic Demux/Mux architecture shown in **(a)** below (the other variants (b), (c), and (d) are not required here):

![[net-l10-slide-18-oadm-architectures.png|820]]

*Source: [NI02 — Optical Networks](<../Assets/SLIDES/SECOND MODULE/NI02 - optical networks.pdf>), slide 18 (PDF page 19). Focus on **(a)**.*

In **(a)**, a **Demux** splits the incoming WDM fiber into individual wavelengths ($\lambda_1, \lambda_2, \dots, \lambda_W$). Selected local wavelengths ($\lambda_1, \lambda_2$) exit through the **Drop** ports, while all remaining channels continue optically straight to a **Mux**, which combines them with newly injected wavelengths from the **Add** ports onto the outgoing fiber.

Because this basic OADM is **fixed** (physically wired to drop and add predetermined wavelengths) and connects only **one incoming fiber to one outgoing fiber**, it cannot dynamically steer lightpaths across multiple outgoing directions in a large meshed backbone. For that, optical networks use Optical Crossconnects.

## Optical Crossconnects (OXCs)

While OADMs serve peripheral rings, the **core backbone** is a **mesh network** where each node connects multiple fibers heading to different cities and must dynamically create, reconfigure, or close (**tear down**) lightpaths as demand changes or links fail. An **Optical Crossconnect (OXC)** is the multi-fiber optical switch built for the core.

![[net-l10-slide-19-oxc.png|680]]

*Source: [NI02 — Optical Networks](<../Assets/SLIDES/SECOND MODULE/NI02 - optical networks.pdf>), slide 19 (PDF page 20).*

As shown above, an OXC connects several incoming and outgoing WDM fibers (through demultiplexers and multiplexers) and can also attach local client equipment such as **IP** routers, **SONET/SDH** terminals, or **ATM** switches.

### How an OXC switches light: movable mirrors

It helps to contrast an optical OXC with an IP router. An IP router converts incoming signals to digital packets in memory and reads every packet's destination IP header to choose an output port dynamically, packet by packet. An optical OXC never reads packets because the traffic inside it remains a beam of light.

Instead, switching works **at the wavelength level** and is configured when a lightpath is set up:

1. Each incoming multi-wavelength fiber passes through a **demultiplexer** at the entrance so individual wavelengths enter separately.
2. Inside the OXC lies a matrix of microscopic, electronically controlled **movable mirrors (MEMS)**. Tilting a mirror physically bounces an incoming light ray from one input fiber onto a chosen output fiber (for instance, steering the red wavelength from Input fiber 1 down to Output fiber 2 while other colors pass straight through).
3. To establish an end-to-end lightpath between two clients across a mesh, the network first computes a route with a common available wavelength, then programs the mirror angles on every OXC along that route. Those mirrors stay fixed for the lifetime of the lightpath until teardown.

![[net-l10-oxc-mirrors-and-mesh.svg|820]]

*Professor's OXC sketches ([NI_L3-2026-11-09.pdf](<../Assets/SLIDES/SECOND MODULE/NI_L3-2026-11-09.pdf>), p. 2): top, redirecting a wavelength across fibers with movable mirrors; bottom, setting mirrors along a meshed lightpath.*

### Key capabilities of an OXC

In a large backbone, an OXC supports five main functions:

- **Service provisioning:** set up, reconfigure, and tear down lightpaths automatically in software rather than manually plugging fiber patch cables.
- **Protection:** detect link failures and rapidly reroute affected lightpaths onto backup paths.
- **Bit-rate and format transparency:** switch optical signals regardless of client bit rate or framing format, as long as switching remains purely optical.
- **Wavelength conversion:** translate an incoming wavelength to a different outgoing wavelength when continuity would otherwise block a path.
- **Multiplexing and grooming:** switch or pack smaller traffic flows inside a wavelength, an operation that must happen in the **electrical domain** via time-division multiplexing (TDM).

## Traffic grooming and the Muxponder

Because a transponder and a full optical wavelength are expensive, dedicating an entire wavelength to one client makes economic sense only for large operators or heavy traffic streams. Smaller customers, such as small ISPs, generate **low-bit-rate flows** and cannot afford one transponder each.

**Traffic grooming** solves this by letting multiple low-rate customers share **one transponder** and **one wavelength**:

1. $K$ low-bit-rate customer flows ($f_1, f_2, \dots, f_K$) enter a **TDM multiplexer**, which interleaves them in the **electrical domain** into a single high-bit-rate digital stream.
2. That combined electrical stream enters **one shared transponder**, which transmits all $K$ flows together on a single optical wavelength $\lambda$.
3. Combining the TDM multiplexer and the transponder forms a **muxponder**.
4. At the destination, recovering a single customer's tributary flow $f_i$ requires converting that wavelength back to electricity (`O/E`) and running a **TDM demultiplexer**.

![[net-l10-grooming-muxponder.svg|800]]

*Professor's grooming and muxponder sketch ([NI_L3-2026-11-09.pdf](<../Assets/SLIDES/SECOND MODULE/NI_L3-2026-11-09.pdf>), p. 2).*

### How grooming relates to OXCs

Grooming can happen both **at the network edge** (inside a muxponder so small customers share one transponder) and **inside a core OXC**. When an OXC includes electrical TDM grooming hardware, it is no longer limited to switching whole wavelengths: it can step into the electrical domain, unpack individual low-rate streams, and repack them onto outgoing wavelengths.

In both places, however, TDM grooming (just like wavelength conversion) requires leaving the optical domain and returning to **electronics**.

## Transparency and all-optical subnetworks

Modern networks stack protocol layers one on top of another: for example, an IP layer runs over an optical transport layer. Inside that optical infrastructure, **transparency** means the ability to carry any client technology (IP, Ethernet, SONET/SDH) at different bit rates (such as $100\ \mathrm{Gbit/s}$ or $400\ \mathrm{Gbit/s}$) over the same physical fibers without changing the optical switches inside the network, because data travels from source to destination as light.

In a theoretically ideal world, electronics would exist **only at the network edge** for **adaptation**: converting diverse client interfaces into uniform OTN frames and standardized WDM wavelengths. In practice, real optical networks almost always need electronics **inside the core** as well, either for **wavelength conversion** or for **signal regeneration** when a signal degrades over long distances.

Whenever a lightpath passes through an `O/E/O` device in the middle of the network, the single transparent optical cloud is broken into smaller **all-optical subnetworks** linked by electronic points. This works just like an IP internetwork, where separate local area networks (LANs) are interconnected by routers.

![[net-l10-all-optical-subnets.svg|800]]

*Professor's sketch ([NI_L3-2026-11-09.pdf](<../Assets/SLIDES/SECOND MODULE/NI_L3-2026-11-09.pdf>), p. 3): intermediate electronics splits an optical network into subnetworks, just as a router joins two LANs.*

![[net-l10-slide-23-all-optical.png|740]]

*Source: [NI02 — Optical Networks](<../Assets/SLIDES/SECOND MODULE/NI02 - optical networks.pdf>), slide 23 (PDF page 24).*

## Signal degradation in optical fibers

Even if a lightpath stays completely optical, light cannot propagate forever without degrading. When a transmitter sends a clean pulse train $s(t)$ into a fiber, the received signal $r(t)$ suffers from three physical impairments:

- **Attenuation:** the optical power drops along the fiber, so received pulses arrive weaker (smaller amplitude).
- **Distortion:** noise and nonlinear physical effects deform the pulse shape (a sharp rectangular pulse arrives rounded or jagged).
- **Dispersion:** pulses stretch out in time (**temporal broadening**), lasting longer than their original bit duration $T$.

![[net-l10-slide-24-degradation.png|820]]

*Source: [NI02 — Optical Networks](<../Assets/SLIDES/SECOND MODULE/NI02 - optical networks.pdf>), slide 24 (PDF page 25).*

To see why these impairments cause bit errors, consider sending a binary sequence such as `10110` using simple On-Off Keying: the laser switches on for duration $T$ to encode a `1` and switches off for a `0`. At the receiver, a threshold detector checks whether the incoming power stays above a decision threshold to read a `1` or below it to read a `0`. If attenuation makes pulses too weak to cross the threshold, if noise pushes a `0` above the threshold, or if dispersion smears one pulse into the next bit slot, the receiver misinterprets bits and **$\mathrm{BER}$ increases**.

## 1R, 2R, and 3R signal regeneration

To keep signals readable over long spans, operators place **regenerators** along the route. There are three regeneration levels, creating a direct trade-off between **how cleanly the signal is restored** and **how much transparency is preserved**.

### 1R: Reamplification

A **1R regenerator** is an **optical amplifier** that simply boosts the power of the degraded input signal $i(t)$ to produce a higher-power output $o(t)$.

![[net-l10-slide-25-1r.png|780]]

*Source: [NI02 — Optical Networks](<../Assets/SLIDES/SECOND MODULE/NI02 - optical networks.pdf>), slide 25 (PDF page 26).*

Because amplification works **100% in the optical domain** without `O/E/O` conversion, 1R preserves full transparency and even supports analog signals. Its drawback is that it only counters **attenuation**: it amplifies accumulated noise and waveform distortion along with the signal, and it does not shrink broadened pulses. Therefore, 1R works only as long as the signal-to-noise ratio (SNR) stays sufficiently high.

*(In practice, if an incoming signal is too weak to cross a receiver's decision threshold, the first step before threshold detection is amplifying the signal to bring its power back up.)*

### 2R: Reamplification and reshaping

A **2R regenerator** restores both power and pulse shape. It first amplifies the signal, converts it to electricity (`O/E`), detects the transmitted bits, and generates clean new square pulses back into light (`E/O`).

![[net-l10-slide-26-2r.png|780]]

*Source: [NI02 — Optical Networks](<../Assets/SLIDES/SECOND MODULE/NI02 - optical networks.pdf>), slide 26 (PDF page 27).*

2R eliminates **attenuation** and **waveform distortion**, and can remain transparent to different bit rates if it reshapes pulses without locking onto a clock. However, it introduces two limitations:

- **Loss of transparency:** requiring `O/E/O` breaks the all-optical path, and the hardware must assume a specific pulse shape (for example, rectangular pulses). If a new client sends a different pulse shape (such as Gaussian pulses), this 2R device cannot regenerate it without deploying different hardware.
- **Residual timing errors (jitter):** 2R does not undo **dispersion** or small timing shifts in where pulses begin and end. Across several 2R regenerators in a row, this timing shift (**jitter**) can accumulate until bits fall out of alignment.

### 3R: Reamplification, reshaping, and retiming

A **3R regenerator** performs reamplification, reshaping, and **retiming**: it recovers the sender's **clock** (knowing the exact bit duration and timing grid) and resynchronizes every pulse to its proper slot. In practice, a standard **transponder** acts as a 3R regenerator.

![[net-l10-slide-27-3r.png|740]]

*Source: [NI02 — Optical Networks](<../Assets/SLIDES/SECOND MODULE/NI02 - optical networks.pdf>), slide 27 (PDF page 28).*

3R counters **attenuation**, **distortion**, and **timing jitter**, delivering a "fresh" digital copy of the original signal. The cost is losing even more **transparency**: to recover the clock, the 3R regenerator must know both the client's **pulse shape** and its **exact bit rate**, so it works only for clients transmitting at that rate and format.

| Level | Operations | Impairments fixed | Domain | Transparency |
| :--- | :--- | :--- | :--- | :--- |
| **1R** | Reamplification | Attenuation only (also amplifies noise) | Optical | Full transparency (analog and any bit rate) |
| **2R** | Reamplification + Reshaping | Attenuation and waveform distortion | `O/E/O` (electrical) | Partial (fixed pulse shape; can stay bit-rate transparent) |
| **3R** | Reamplification + Reshaping + Retiming | Attenuation, distortion, and timing jitter | `O/E/O` (electrical) | Lowest (fixed pulse shape and fixed bit rate) |

## Sources

- [NI02 — Optical Networks](<../Assets/SLIDES/SECOND MODULE/NI02 - optical networks.pdf>), slides 15–27 (PDF pages 16–28).
- [Professor's whiteboard sketches](<../Assets/SLIDES/SECOND MODULE/NI_L3-2026-11-09.pdf>), pages 1–5.
- [Professor's study notebook](<../Assets/SLIDES/SECOND MODULE/NI_Notebook.pdf>), §§2.6.1–2.6.3 and §2.7, printed pages 25–38.
- [Lesson 10 transcript](<../Assets/TRANSCRIPTION NETWORK/network lesson 10 transcripted.md>), opening recap through 3R regeneration.
- Student rough draft: [[NET LESSON 10]].
