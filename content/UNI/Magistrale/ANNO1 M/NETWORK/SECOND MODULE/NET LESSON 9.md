# Lesson 9 — Optical Networks

## Connectionless and connection-oriented networks

In a **connectionless network**, a sender can transmit data without first establishing an end-to-end network connection. When a laptop sends an IP packet, it does not need to negotiate a new end-to-end path before transmitting it.

In a **connection-oriented service**, a connection must be established before information exchange begins. TCP, for example, uses a three-way handshake before exchanging application data. This is an example of connection establishment between endpoints; it does not mean that TCP reserves an optical path through the network.

## Why are optical networks connection-oriented?

The professor asks us to compare a connection's lifetime with the time required to establish it. Imagine an IP backbone needing a logical link between Rome and Milan. The link may remain active for months or even years, so the initial optical-connection setup cost becomes small compared with the service's lifetime.

![[Pasted image 20261106181232.png]]

## How is an optical connection established?

The professor describes four phases:

![[net-l09-slide-10-connection-setup.png|1000]]

*Source: NI02, slide 10 (PDF page 11).*

### 1

**Connection request.** The client asks the optical provider to establish connectivity between two endpoints, for example R1 in Rome and R2 in Milan.

### 2

**Connection setup.** The provider selects a route, reserves an available optical channel on each traversed link, and configures the intermediate devices.

### 3

**Traffic exchange.** Once the connection is established, the client can transmit information using the allocated optical resources. The slide calls this the active/maintenance phase.

### 4

**Connection teardown.** When the connection is no longer needed, its allocated resources are released for other clients.

The resulting end-to-end optical connection is called a **lightpath**.

## Multiplexing

An optical operator with an expensive physical link between two cities wants multiple connections to share that link. This requires **multiplexing**: combining multiple signals or traffic streams so that they share a common transmission resource.

The connection-oriented optical service considered here uses **static multiplexing**. A particular resource is allocated to a connection and remains reserved until the allocation is released. It might be a recurring time slot or a frequency channel.

This differs from the **statistical multiplexing** discussed in Lesson 8, where traffic streams share capacity dynamically according to their transmission activity.

### Three techniques

- **Time Division Multiplexing (TDM):** connections receive recurring time slots.
- **Frequency Division Multiplexing (FDM):** connections receive different portions of the frequency spectrum.
- **Wavelength Division Multiplexing (WDM):** optical channels at different wavelengths share the same physical fiber.

## Explaining WDM better

Optical fibers transmit information using light, an electromagnetic wave. We need to distinguish three quantities:

- **Frequency, $f$:** the number of oscillations completed per second, measured in hertz (Hz).
- **Wavelength, $\lambda$:** the physical distance occupied by one complete oscillation, measured in meters.
- **Bit rate:** the amount of digital information transmitted per second, measured in bits per second (bit/s).

![[net-l09-frequency.svg|660]]

*Frequency describes cycles per unit time.*

![[net-l09-wavelength.svg|680]]

*Wavelength describes the distance occupied by one cycle in a spatial view of the wave.*

![[net-l09-frequency-wavelength.svg|680]]

*Conceptual illustration: frequency and wavelength are inversely related when propagation speed is fixed.*

In vacuum:

$$
c = \lambda f
\qquad\Longrightarrow\qquad
\boxed{\lambda = \frac{c}{f}}
$$

Here, $c \approx 3 \times 10^8\ \mathrm{m/s}$ is the speed of light in vacuum. Therefore, higher frequency corresponds to shorter wavelength, and lower frequency to longer wavelength. Frequency and wavelength are two ways of identifying an optical carrier; neither should be confused with its bit rate.

In a physical fiber, propagation speed is lower than $c$. The formula above uses the **vacuum wavelength**, which is the conventional way optical carrier wavelengths are specified.

Not all wavelengths propagate equally well through fiber. As light travels, its power decreases: this is **attenuation**, whose magnitude depends on wavelength. The figure shows the transmission windows, including the low-attenuation region around 1550 nm.

![[net-l09-slide-06-attenuation.png|850]]

*Source: NI02, slide 6 (PDF page 7).*

### Using multiplexing

The techniques introduced above provide different ways for independent flows to share one transmission medium.

**TDM example.** Users A, B and C receive slots that recur in each frame:

![[net-l09-tdm.svg|672]]

There are two limitations to consider:

- With a static allocation, A's slot remains reserved even when A has no data to send.
- Combining more tributary flows into a single higher-rate stream requires faster electronic processing. At sufficiently high aggregate rates, this can become an electronic bottleneck.

**FDM example.** The users transmit in separate frequency bands:

![[net-l09-fdm.svg|672]]

**WDM example.** The principle is similar to FDM, but optical channels are identified by their wavelengths. Imagine three lasers: A transmits at $\lambda_1$, B at $\lambda_2$ and C at $\lambda_3$.

![[net-l09-wdm.svg|680]]

An optical multiplexer combines the signals into a single physical fiber, where all three propagate simultaneously. At the destination, a demultiplexer separates the channels again.

The professor's red, green and blue analogy is a simplification. The wavelengths commonly used in long-distance optical networks, especially around 1550 nm, are infrared and invisible to the human eye. It is better to think of different **optical carrier wavelengths** than literally visible colors.

WDM increases the aggregate capacity of a fiber by transmitting several independent wavelength channels simultaneously. It does not require combining all channels into one faster electronic bit stream.

### Optical channels and channel spacing

**Channel spacing** is the separation between the center frequencies of adjacent optical carriers. The figure illustrates a spacing of **100 GHz**; the signal bandwidth is a different quantity, describing the spectral width occupied by the modulated signal.

![[net-l09-slide-09-channel-spacing.png|900]]

*Source: NI02, slide 9 (PDF page 10).*

## Optical network first and second generation (exam question)

*Exam context: the professor presented the differences between first- and second-generation optical networks as an example open question in the Lesson 8 introduction. This is a preparation cue, not a guarantee that the question will recur.*

### Electrical domain vs Optical domain

Before comparing the generations, we need to distinguish the electrical and optical domains. A conventional IP router recovers digital data from the received signal, buffers the packet, reads its destination address, looks it up in the forwarding table, selects an output interface and forwards the packet. Electronic circuits can perform these operations because the data is available in a digital representation.

An incoming optical signal is an electromagnetic wave. A conventional CPU cannot directly inspect an IP destination address inside that waveform as though it were a binary string in RAM. Optical transmission and wavelength switching operate on optical signals rather than performing the same per-packet processing.

![[net-l09-electrical-optical-domains.svg|900]]

The professor illustrates the distinction by dividing a network node into electrical and optical functional domains:

![[net-l09-node-domains.svg|900]]

### First generation

In first-generation optical networks, fiber was mainly a high-capacity transmission medium. More complex functions, including multiplexing and switching, were largely performed electronically.

At an intermediate electronic switching node, the signal undergoes **O/E/O**:

1. **Optical to electrical (O/E):** recover an electrical representation of the received optical signal.
2. **Electronic processing:** perform the required multiplexing or switching.
3. **Electrical to optical (E/O):** generate light for transmission over the next fiber.

![[net-l09-first-generation.svg|676]]

As more signals are aggregated, the speed of electronic processing can become a bottleneck.

### Second generation

Second-generation networks introduce an architectural change: optics is used for certain network functions as well as transmission. These are also called **wavelength-routed optical networks**.

The network establishes lightpaths and switches their wavelength channels through intermediate optical devices, avoiding unnecessary O/E/O conversions at those nodes.

![[net-l09-second-generation.svg|676]]

> [!example]- Optical switching example
> Three incoming wavelengths can be configured to leave toward different destinations: $\lambda_1$ toward Milan, $\lambda_2$ toward Bologna and $\lambda_3$ toward Naples. The optical node follows the configured lightpaths without inspecting each IP packet's destination.

The main devices are:

- **OLT — Optical Line Terminal:** terminates an optical transport link and provides functions such as signal adaptation and wavelength multiplexing/demultiplexing.
- **OXC — Optical Cross-Connect:** connects incoming optical channels to outgoing links.
- **OADM — Optical Add/Drop Multiplexer:** adds or removes selected wavelength channels while allowing the others to pass through.

![[net-l09-slide-13-optical-network.png|900]]

*Source: NI02, slide 13 (PDF page 14).*

![[net-l09-oxc.svg|660]]

An **incoming link** carries a signal into a node; an **outgoing link** carries a signal away from it.

## Lightpath and wavelength

Before communication begins, the provider selects a route, reserves an optical channel on each link and configures the intermediate optical devices. These are the setup operations; the resulting optical connection is the **lightpath**.

![[net-l09-lightpath.svg|680]]

In the architecture considered here, **when intermediate nodes do not provide wavelength conversion**, the lightpath must use the same wavelength on every link along its route. This is the **wavelength-continuity constraint**. For example, a lightpath assigned $\lambda_1$ must use $\lambda_1$ on each traversed link.

![[net-l09-wavelength-continuity.svg|680]]

> [!note] Scope of wavelength continuity
> The draft stated continuity as a general requirement. It applies to the case **without intermediate wavelength conversion**. If conversion is available, different portions of a lightpath may use different wavelengths. NI02 slide 12 and notebook §2.4.2 make this distinction explicit.

### What happens if a wavelength is not available?

Consider the route A → B → C, with two wavelengths on each link: $\lambda_1$ (red) and $\lambda_2$ (green). Existing connections already occupy some channels:

![[Pasted image 20261107095021.png]]

On A–B, $\lambda_2$ is occupied, so only $\lambda_1$ is free. On B–C, $\lambda_1$ is occupied, so only $\lambda_2$ is free. Each link has a free channel, but there is **no common free wavelength** across the whole route. Without wavelength conversion, the requested A–C lightpath cannot be established along this route.

If the network offers other routes, it can try one of them. A connection request is **blocked** when no feasible route with suitable wavelength resources exists under the network's constraints.

Selecting a route is therefore not sufficient: the wavelength resources must also be available along it. The combined problem is called **Routing and Wavelength Assignment (RWA)**. This is additional terminology; the main point is the professor's wavelength-allocation example.

## What happens inside optical devices

### Optical Line Terminal (OLT)

An OLT is located at the termination of an optical transport link. It provides the functions needed to transmit and receive signals over that link, with three main functional components:

- **Transponders:** adapt client signals to the optical transport network.
- **Wavelength multiplexers/demultiplexers:** combine or separate optical channels.
- **Optical amplifiers:** increase optical signal power.

![[net-l09-slide-16-olt.png|900]]

*Source: NI02, slide 16 (PDF page 17).*

### The transponder

Imagine an IP router sending traffic into the optical transport network. Its optical interface may already produce light, but its wavelength may not match a WDM channel assigned by the operator. For example, the router may transmit around **1310 nm**, while the provider requires a channel near **1550 nm**.

The transponder receives the client optical signal, converts it to the electrical domain, processes the digital information, and converts it back to an optical signal at the assigned wavelength:

![[net-l09-transponder.svg|680]]

It can also monitor the **Bit Error Rate (BER)**, the proportion of received bits that are erroneous.

Earlier, we saw that second-generation networks avoid unnecessary O/E/O conversions at intermediate optical switching nodes. Why does a transponder use O/E/O? It operates at the **boundary between the client and the optical transport network**, where signal adaptation may be necessary. Once the transponders produce signals at their assigned wavelengths, the OLT multiplexes them onto the fiber.

The professor gives an illustrative cost of approximately **€20,000–€40,000 per transponder** for the equipment discussed in class. If a WDM system supports **96 channels**, equipping every channel with a transponder represents a substantial investment. This helps explain why an operator may not install the maximum channel count immediately. These figures are lecture examples, not current equipment quotations.

## OSC Optical Supervisory Channel

Most wavelengths carry customer traffic, but the operator also needs to monitor the infrastructure. The **Optical Supervisory Channel (OSC)** is a separate optical channel, using a dedicated wavelength, for monitoring and management.

For example, loss of the supervisory signal can indicate damage or a fiber cut. **Data wavelengths carry client information; the OSC carries network-management information.**

## Sources

- [NI02 — Optical Networks](<../Assets/SLIDES/SECOND MODULE/NI02 - optical networks.pdf>), introductory material and devices through slide 16. Printed slide numbers are one less than PDF page numbers.
- [Professor's study notebook](<../Assets/SLIDES/SECOND MODULE/NI_Notebook.pdf>), relevant parts of chapter 2, especially §§2.1–2.4 and §2.6.1.
- [Lesson 9 transcript](<../Assets/TRANSCRIPTION NETWORK/network lesson 9 transcripted.md>).
