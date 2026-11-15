# Lesson 9 — Optical Networks

Optical transport networks form the high-capacity physical backbone underneath packet networks such as IP. Rather than forwarding data packet by packet, the optical layer typically establishes dedicated, long-lived connections across the network infrastructure.

## Connectionless and connection-oriented services

In a **connectionless service**, a sender transmits each unit of data independently without negotiating an end-to-end path beforehand. When a laptop sends an IP packet, for example, routers inspect its destination address hop by hop without reserving capacity in advance.

In a **connection-oriented service**, a connection must be established before information exchange begins. **TCP** provides a familiar example at the transport layer, using a three-way handshake before application data flows. That handshake, however, creates state only between the two endpoints over IP; it does not reserve a physical path or optical channel inside the network infrastructure. An optical transport network, by contrast, is connection-oriented inside the network itself, allocating optical resources across intermediate nodes before client traffic is sent.

## Why optical transport networks are connection-oriented

Whether connection establishment pays off depends on comparing **setup time** against **connection lifetime**. Configuring an optical path across intermediate switches takes far longer than forwarding an individual IP packet. Yet an optical link requested by an IP backbone—for instance, a logical link connecting core routers in Rome and Milan—typically remains active for months or even years. Spread over that service lifetime, the one-time setup cost becomes negligible.

![[net-l09-setup-vs-lifetime.svg|540]]

*Setup happens once when provisioning the link, whereas traffic exchange spans a vastly longer active service lifetime.*

## Optical connection lifecycle

As summarized below, an optical connection follows four sequential phases:

![[net-l09-slide-10-connection-setup.png|820]]

*Source: NI02, slide 10 (PDF page 11).*

1. **Connection request.** A client asks the optical provider for connectivity between two endpoints—for example, router `R1` in Rome and router `R2` in Milan. At this stage, no network resources have been reserved yet.
2. **Connection setup.** The provider selects an end-to-end route, reserves an available optical channel on each traversed link, and configures the switching state of intermediate devices along the path.
3. **Traffic exchange (active and maintenance phase).** Once setup finishes, the client transmits data over the allocated resources while the network continuously monitors signal quality and faults to maintain the service.
4. **Connection teardown.** When the connection is no longer needed, the provider removes the node configurations and releases the reserved resources for other clients.

The resulting end-to-end optical connection is called a **lightpath**.

## Multiplexing: sharing an optical fiber

Because deploying long-distance fiber cables between cities is costly, operators must let multiple client connections share each physical fiber. Combining several signals onto one common transmission medium is **multiplexing**.

Unlike the **statistical multiplexing** covered in Lesson 8—where packet streams share link capacity dynamically based on instantaneous activity—the connection-oriented optical service considered here relies on **static multiplexing**. Each connection receives a dedicated transmission resource (such as a recurring time slot or a specific optical channel) that remains reserved exclusively until teardown.

### Time and frequency multiplexing (TDM and FDM)

Two classical schemes illustrate the trade-off between sharing capacity in time and dividing it in spectrum.

**Time Division Multiplexing (TDM)** assigns each user a recurring time slot within each periodic frame. Below, users `A`, `B`, and `C` each receive one slot per frame:

![[net-l09-tdm.svg|500]]

Static TDM suffers from two limitations. First, an allocated slot remains idle whenever its owner has no data to send. Second, interleaving more tributary streams forces a single electronic circuit to serialize bits at a higher aggregate bit rate, which eventually creates an electronic bottleneck.

**Frequency Division Multiplexing (FDM)** avoids interleaving bits in time by assigning each user a separate, non-overlapping frequency band so all streams transmit simultaneously:

![[net-l09-fdm.svg|500]]

**Wavelength Division Multiplexing (WDM)** applies this same parallel-channel principle in the optical domain, where channels are conventionally identified by wavelength rather than frequency.

### Optical carriers: frequency, wavelength, and fiber attenuation

Because optical fibers guide light—an electromagnetic wave—partitioning spectrum into WDM channels depends on three distinct physical and digital quantities:

- **Frequency ($f$, in hertz, Hz):** the number of wave oscillations completed per second.
- **Wavelength ($\lambda$, in meters, m, or nanometers, nm):** the physical length of one complete spatial cycle.
- **Bit rate (in bits per second, bit/s):** the volume of digital information transmitted per second—a property of the encoded data stream, not the oscillation rate of the light carrier itself.

![[net-l09-wavelength.svg|460]]

*Spatial view of a wave: the wavelength $\lambda$ spans one complete oscillation cycle.*

In vacuum, electromagnetic waves travel at the constant speed of light $c \approx 3 \times 10^8\ \mathrm{m/s}$, linking frequency and wavelength inversely:

$$
c = \lambda f
\qquad\Longrightarrow\qquad
\boxed{\lambda = \frac{c}{f}}
$$

Because $c$ is fixed, higher frequency gives a shorter wavelength and lower frequency gives a longer wavelength. For example, a carrier at $\lambda = 1550\ \mathrm{nm} = 1550 \times 10^{-9}\ \mathrm{m}$ corresponds to $f = \frac{3 \times 10^8}{1550 \times 10^{-9}} \simeq 193.5\ \mathrm{THz}$.

![[net-l09-frequency-wavelength.svg|480]]

*Inverse relationship at fixed propagation speed: faster oscillation yields a shorter wavelength.*

Inside a physical fiber, light actually travels more slowly than $c$. Nevertheless, optical systems conventionally specify carrier channels using the **vacuum wavelength** computed from $c$ above.

Not every wavelength propagates equally well through glass fiber. As light travels, its power decays due to **attenuation** (measured in $\mathrm{dB/km}$), whose magnitude varies sharply with wavelength:

![[net-l09-slide-06-attenuation.png|760]]

*Source: NI02, slide 6 (PDF page 7).*

The shaded regions highlight three low-attenuation transmission windows around $0.85\ \mu\mathrm{m}$, $1.31\ \mu\mathrm{m}$, and $1.55\ \mu\mathrm{m}$ ($1550\ \mathrm{nm}$). Because attenuation reaches its minimum near **1550 nm**, long-haul WDM networks place their optical channels in that band.

### Wavelength Division Multiplexing (WDM) and channel spacing

In **WDM**, independent lasers modulate separate client streams onto distinct carrier wavelengths ($\lambda_1, \lambda_2, \lambda_3, \dots$). An optical multiplexer combines those channels onto one physical fiber, where they propagate concurrently, and a demultiplexer separates them again at the destination:

![[net-l09-wdm.svg|500]]

In class, the professor illustrates these wavelengths as "red, green, and blue." That analogy is only a visual simplification: the wavelengths used in long-distance fiber around $1550\ \mathrm{nm}$ lie in the infrared and are invisible to the human eye, so it is better to think of distinct **optical carrier wavelengths** than literal colors.

Because WDM transmits $N$ independent channels of rate $B$ in parallel—yielding aggregate fiber capacity $N B$ without combining them into a single faster electronic stream—it scales capacity while sidestepping TDM's single-stream electronic bottleneck.

Adjacent channels still need spectral separation to avoid overlapping. **Channel spacing** measures the frequency separation between adjacent carrier centers, whereas **signal bandwidth** is the narrower spectral width actually occupied by each modulated optical signal:

![[net-l09-slide-09-channel-spacing.png|546]]

*Source: NI02, slide 9 (PDF page 10).*

In this grid, neighboring carriers are spaced by **100 GHz** around $193\ \mathrm{THz}$. Because $\lambda = c/f$ is nonlinear, uniform $100\ \mathrm{GHz}$ frequency steps correspond to slightly unequal wavelength intervals (roughly $0.8\ \mathrm{nm}$ per step near $1552\ \mathrm{nm}$).

## First- and second-generation optical networks (exam question)

*Exam context: the professor mentioned the comparison between first- and second-generation optical networks as an example open exam question in the Lesson 8 introduction. This is a preparation cue, not a guarantee that the question will recur.*

### Electrical domain vs. optical domain

Comparing the two network generations rests on the split between two functional domains inside a node:

- **Electrical domain (digital processing):** recovers digital bits from the received signal, buffers packets, inspects IP headers, performs forwarding-table lookups, and selects output ports.
- **Optical domain (waveform handling):** carries light over fiber, multiplexes or demultiplexes wavelengths, and switches entire optical channels across links.

Because an arriving optical signal is an electromagnetic wave rather than binary bits in RAM, a conventional processor cannot read an IP destination address directly off the waveform without converting the signal into electricity first.

![[net-l09-electrical-optical-domains.svg|720]]

To make this separation concrete, the professor models a network node as a cylinder with electronic processing above and optical transmission and wavelength handling below:

![[net-l09-node-domains.svg|720]]

### First generation: fiber as a transmission medium

In **first-generation optical networks**, fiber acted essentially as a high-capacity point-to-point cable, while switching and multiplexing remained in electronics. At every intermediate switching node, signals undergo **O/E/O conversion**:

1. **Optical-to-electrical (O/E):** convert the incoming light wave into a digital electrical signal.
2. **Electronic processing:** inspect headers or channels and switch data to the chosen outgoing port.
3. **Electrical-to-optical (E/O):** modulate a laser to send light onto the next fiber hop.

![[net-l09-first-generation.svg|500]]

Because even transit traffic passing straight through a node must be converted to electronics and processed, rising link capacities eventually turn intermediate electronic switching into a bottleneck.

### Second generation: wavelength-routed optical networks

**Second-generation optical networks**—also called **wavelength-routed optical networks**—bring part of the switching intelligence directly into optics. Intermediate nodes follow pre-configured **lightpaths** and switch whole wavelength channels optically, avoiding unnecessary O/E/O conversions along transit hops:

![[net-l09-second-generation.svg|500]]

> [!example]- Optical switching without per-packet inspection
> A node can be configured so that incoming wavelength $\lambda_1$ switches toward Milan, $\lambda_2$ toward Bologna, and $\lambda_3$ toward Naples. The optical switch follows those lightpath configurations directly without examining individual IP packet headers.

This architecture introduces three core optical devices:

- **OLT (Optical Line Terminal):** terminates an optical transport link and handles client adaptation, wavelength multiplexing/demultiplexing, and optical amplification.
- **OXC (Optical Cross-Connect):** switches optical wavelength channels from **incoming links** (fibers carrying signals into a node) onto **outgoing links** (fibers carrying signals away from it).
- **OADM (Optical Add/Drop Multiplexer):** inserts ("adds") or extracts ("drops") selected wavelength channels locally while allowing pass-through wavelengths to continue optically.

![[net-l09-slide-13-optical-network.png|760]]

*Source: NI02, slide 13 (PDF page 14).*

At an intermediate OXC, wavelength channels are routed directly from an incoming fiber to an outgoing fiber:

![[net-l09-oxc.svg|480]]

## Lightpaths, wavelength continuity, and blocking

As introduced in the connection lifecycle above, a **lightpath** is the end-to-end optical connection built across intermediate OXCs and OADMs (`A → B → C → D`):

![[net-l09-lightpath.svg|500]]

Whenever intermediate nodes **do not provide wavelength conversion**, a lightpath must occupy the exact same wavelength on every fiber link along its route—the **wavelength-continuity constraint**. For example, a lightpath assigned $\lambda_1$ on its first hop must use $\lambda_1$ on every subsequent hop:

![[net-l09-wavelength-continuity.svg|500]]

> [!note] Scope of wavelength continuity
> Wavelength continuity applies specifically when intermediate nodes lack wavelength conversion. If intermediate nodes can convert wavelengths (all-optically or via O/E/O regeneration), consecutive spans of a lightpath can use different wavelengths (see NI02, slide 12, and the study notebook, §2.4.2).

### Wavelength contention and connection blocking

Because continuity demands a common wavelength across all hops, free capacity on each individual link is not enough. Consider a route `A → B → C` with two available wavelengths per fiber, $\lambda_1$ and $\lambda_2$, where existing connections already occupy $\lambda_2$ on `A–B` and $\lambda_1$ on `B–C`:

![[net-l09-wavelength-blocking.svg|540]]

Link `A–B` still has $\lambda_1$ free, and link `B–C` still has $\lambda_2$ free, yet **no single wavelength is free across the entire `A → B → C` path**. Without wavelength conversion at node `B`, the requested `A → C` lightpath cannot be established on this route.

If alternative physical routes exist between `A` and `C`, the provider can evaluate them. A connection request is **blocked** when no feasible route with suitable wavelength resources exists under the network's constraints. Route selection alone is therefore insufficient: path computation must couple routing with channel availability—a combined problem formally called **Routing and Wavelength Assignment (RWA)** (useful formal terminology framing the professor's allocation example).

## Inside optical transport devices: OLT, transponders, and OSC

### Optical Line Terminal (OLT)

An **Optical Line Terminal (OLT)** terminates a WDM optical link, connecting client equipment (such as IP routers or SONET/SDH terminals) to the optical transport line. It combines three main functional blocks:

- **Transponders:** adapt non-compliant client optical signals to the operator's standardized WDM wavelengths.
- **Wavelength multiplexers and demultiplexers:** merge outgoing WDM channels onto one fiber and separate incoming channels toward receivers.
- **Optical amplifiers:** increase optical signal power to overcome attenuation along the fiber.

![[net-l09-slide-16-olt.png|760]]

*Source: NI02, slide 16 (PDF page 17).*

### Transponders and boundary adaptation

If second-generation networks avoid intermediate O/E/O conversions, why does an OLT use O/E/O inside a transponder? The reason is placement: a transponder sits at the **boundary between the client and the optical transport network**, where client signals often need adaptation before sharing the WDM line.

A client router's optical port, for instance, typically emits light around **1310 nm** (a short-reach, non-ITU wavelength), whereas long-haul WDM transport operates over standardized ITU channels in the low-loss window near **1550 nm**. The transponder converts the arriving client light to the electrical domain, processes the digital signal, and regenerates it as light at the assigned WDM channel wavelength:

![[net-l09-transponder.svg|500]]

Operating briefly in electronics also lets the transponder monitor the **Bit Error Rate (BER)**—the fraction of received bits in error—before the OLT multiplexes the wavelength onto the fiber. Conversely, as Slide 16 shows on its bottom port ($\text{ITU }\lambda_3$), a client interface already transmitting at a compliant ITU WDM wavelength can enter the multiplexer directly without a transponder.

In class, the professor mentions an illustrative price of roughly **€20,000–€40,000 per transponder** for this class of WDM equipment. In a **96-channel** system, populating every channel from day one represents a substantial capital investment, which explains why operators often install transponders gradually as demand grows. *(These figures are lecture examples, not current equipment quotations.)*

### Optical Supervisory Channel (OSC)

While data wavelengths carry customer traffic, operators also need continuous monitoring and management of the physical link. As depicted inside the OLT diagram ($\lambda_{\text{OSC}}$ Laser and Receiver), the **Optical Supervisory Channel (OSC)** uses a dedicated wavelength strictly for supervisory signaling.

For example, losing the supervisory signal immediately alerts the operator to amplifier faults or a fiber cut. In short: **data wavelengths carry client information; the OSC carries network-management information.**

## Sources

- [NI02 — Optical Networks](<../Assets/SLIDES/SECOND MODULE/NI02 - optical networks.pdf>), introductory material and devices through slide 16. Printed slide numbers are one less than PDF page numbers.
- [Professor's study notebook](<../Assets/SLIDES/SECOND MODULE/NI_Notebook.pdf>), relevant parts of chapter 2, especially §§2.1–2.4 and §2.6.1.
- [Lesson 9 transcript](<../Assets/TRANSCRIPTION NETWORK/network lesson 9 transcripted.md>).
