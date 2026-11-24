# Network Infrastructures — Module 2: Unified Study Compendium (Sapienza 2026/27)

> **Purpose:** Self-contained single-file Markdown + LaTeX reference for interactive exam preparation with AI (Prof. Marco Polverini, Sapienza University of Rome, MSc Cybersecurity, A.Y. 2026/27).
> - **Parts I–II (Lectures 8–12 — Transport Intro & Optical Networks Complete):** Verified against **2026/27** slides (`NI01`, `NI02`), in-class whiteboards (`NI_L1–L5`), audio transcripts (`L8–L12` recap), Polverini's `NI_Notebook.pdf` (Ch. 1–2), and student notes (`NET LESSON 8–11`, `NET LEZIONE 12`). Supersedes prior years where terminology or scope changed.
> - **Part III (MPLS — `NI03` Slides 1–14 Verified in Lecture 12; Slides 15–44 Pending Lecture 13+):** Built from **2026/27** official slides (`NI03`, 45 PDF pages: Title + Slides 1–44) and `NI_Notebook.pdf` (Ch. 3, pp. 56–82), with **§3.1–§3.2 up through the 32-bit Shim Header (`NI03` Slides 1–14) verified against Lecture 12 (`L12` transcript + `NI_L5` pp. 2–5)** and Slides 15–44 awaiting the upcoming lecture/transcript.
> - **Part IV (Inter-Domain Routing & BGP — Provisional):** Previewed on `NI01` Slide 24 (`BGP`, `Peering / Transit`, `RPKI`, `ROAs`, `Origin validation`, `BGP security`) and in Lecture 8 (`08:30`, `1:16:00`, including OSPF review and the Dec 14 NAMEX seminar); current notes are sourced provisionally from `Network Infrastructures Theory 24-25 2.5.pdf` (pp. 98–110) until 2026/27 slides, `NI_Notebook` Ch. 4, and transcripts are released.

---

## ⚠️ Exam Scope, Classroom Emphasis, Omitted Topics & Exam Calibration

> **How to weight explanations:** Prof. Polverini's `NI_Notebook.pdf` gives smooth textbook coverage across every subsection, whereas his **lectures, whiteboards, and transcripts concentrate heavily on architectural motivation, domain boundaries (electrical vs. optical), concrete numerical/topology examples, and layered management/control abstractions**, while explicitly skipping hardware internals and message-bit formats. Explain topics proportionally to the emphasis tags below rather than giving every slide equal depth.

### A. Assessment Structure & Official Exam Cues (Attributed Lecture-8 Speech, Subject to Confirmation)

- **Module 2 Intermediate Quiz (Self-Assessment):** Scheduled **Friday 18 December 2026** (in person on Moodle, followed by lab), **10 MCQs in 15 minutes**, awards up to **+1 bonus point** (usable in the January/February winter sessions).
- **Final Written Theory (`40` minutes shared freely across Access + Transport):** Module 2 receives **1 open question** (max **6 points**), recommended **20 minutes**, with a strict **1-page answer limit**. Polverini explicitly warns that 20 minutes is tight (`L8` `04:54`, `14:06`): allocate ~20 minutes per question cleanly, write concisely, and hit every requested guiding sub-point.
- **Kathara Practical + New Lab Theory Quiz:** December Kathara homework (max `16` pts) or `1.5h` live Kathara exam, plus a new **4-point MCQ quiz** on theoretical concepts taught during the Kathara lab sessions (timing provisional, expected similar to `10` MCQs in `15` min). *Note (`L8` `09:22`, `15:04`): proposed Jan 14 / Feb 17 dates and lab-quiz rules remain subject to administrative confirmation; the `16` homework points and intermediate bonus points are **single-use** across winter attempts (failing or rejecting a grade in Jan forces the full `1.5h` live Kathara + written exam in Feb).*
- **Schedule Shift Announced in Lecture 12 (`23/11/26`, `L12` line 255):** Polverini explicitly announced *"on Friday we will have theoretical classes again. No more practical lectures up to the end of the semester... from now on, all the Fridays we will have theoretical classes."*
- **Literal Sample Questions Announced by Polverini (`L8` `04:54`):**
  1. **Open question:** *"What are the main differences between first- and second-generation optical networks?"* — expected rubric pillars explicitly named: **multiplexing, electronics, fiber type, light source, amplification**.
  2. **MCQ:** *"In an all-optical network, which function is not available?"* (4 options; tests what requires `O/E/O` vs. optical domain).

### B. Omitted, Skimmed & Low-Weight Topics (Keep Brief — Do Not Over-Drill)

| Source / Slide | Topic | Classroom Status (Transcripts / Whiteboards) |
| :--- | :--- | :--- |
| **`NI01` Slide 23** | Chapter-1 summary recap slide | **Skipped in class (`L8` `1:13:36`)** as redundant after the walkthrough. |
| **`NI02` Slide 6 & Notebook §1.6** | Quantitative $\mathrm{dB/km}$ link-budget equations / free-space $1/d^2$ law | **Out of scope:** only know attenuation is measured in $\mathrm{dB/km}$ and why $1550\ \mathrm{nm}$ ($\approx 193.5\ \mathrm{THz}$) is chosen (minimal, flat attenuation). |
| **`NI02` Slide 18** | OADM internal architectures **(b), (c), (d)** | **Explicitly omitted (`L10` line 2):** *"let's forget about these others, for us we are interested only on this [architecture (a): Demux → Drop/Pass-through/Add → Mux]."* |
| **`NI02` Slides 16, 19–20** | Detailed physics of prisms, thin-film filters, AWGs, MEMS fabrication, all-optical $\lambda$ conversion | **Intuition only (`L9` line 81, `L10` lines 6–8, `L11` line 7):** prism (*Dark Side of the Moon*) / thin-film *eclipse-glasses* analogies for Mux/Demux; movable mirrors for OXC; `O/E/O` transponder as the practical model for $\lambda$ conversion. |
| **`NI02` Slide 28 & `L10`** | Optical fiber manufacturing for chromatic-dispersion compensation | **Conceptual only (`L10` line 18):** focus on *why* modal vs. chromatic dispersion occur and how `SMF`, `SLM` laser, $1550\ \mathrm{nm}$ window, and dispersion-engineered fiber address them. |
| **`NI02` Slide 30** | NMS database schema & specific industry standard names | **High-level only (`L11`):** remember NMS modules (`Topology & resource view`, `Lightpath provisioning`, `Performance monitoring`, `Fault management`) and vendor lock-in / **ossification** motivating **EMS**. |
| **`NI02` Slides 33–34** | **OPU** sublayer & exact OTN frame byte layouts / FEC codes | **Concept clarified in `L12` recap (`lines 7–21`, `NI_L5` p. 1) after being skipped in `L11` (`line 129`):** focus only on how **`OPU` adapts/grooms** low-rate clients (`10 Gbps` NIC) into a fixed transponder bitrate $C$ (`100 Gbps`, via `OPU1`/`OPU2`/`OPU4` container sizing). Exact G.709 byte layouts and FEC codes remain out of scope. |
| **`NI02` Slide 41** | Summary Overhead Table | Deferred at end of `L11` (`line 243`) and **walked through in full in `L12` (`lines 65–89`)** (§2.5). |
| **`NI03` Slide 14** *(Verified `L12`)* & **Slides 22–24** *(Pending `L13`)* | `TC` 3-bit QoS encoding; binary packet layouts of `LDP`/`RSVP-TE` | **`TC` explicitly excluded in `L12` (`line 241`):** *"TC okay we don't use it I mean in this course."* (`TTL` was not walked through in `L12`.) Binary `LDP`/`RSVP-TE` header formats are out of scope (`Notebook §3.2.2`): focus on `PATH`/`RESV`, `Router Alert`, soft state, and 32-bit shim layout (`20/3/1/8`, `0x8847`). |
| **`NI03` Slide 9** | **SRv6** (Segment Routing over IPv6) | **Context only (`L12` lines 223–225):** *"beyond this stack with the advent of segment routing... [covered in] Programmable Networks, second semester."* *(Note: 2023 historical test had SR/IPv6 questions, which are **not** in `NI_Notebook.pdf` Ch. 3 or `NI03` for 2026/27.)* |

### C. High-Emphasis Core Topics, Worked Examples & Whiteboard Walkthroughs

| Lecture | Core Concept / Worked Example | Observed or Anticipated Emphasis |
| :--- | :--- | :--- |
| **L8** | Access vs. Transport, `traceroute` Rome–Milan/Bologna, 1,000 FTTH aggregation | Recursive customer–provider (horizontal & vertical); statistical aggregation ($1000\times 1\ \mathrm{Gbps}=1\ \mathrm{Tbps}$ nominal vs. $50\ \mathrm{Gbps}$ busy avg) and PoP-level visibility; congestion & mesh routing (delivery, restoration, load balancing); `traceroute` L1 blindness + WAN propagation dominance; shared L1 infrastructure. |
| **L9** | Connection-oriented optical lifecycle, TDM vs. WDM, `A–B–C` Triangle Blocking, OLT | Why setup vs. long lifetime justifies circuits (vs. endpoint-only TCP); static-mux idle waste vs. **TDM electronic $N\times B$ clock bottleneck**; $\lambda=c/f$ ($1550\ \mathrm{nm}\approx 193.5\ \mathrm{THz}$, $100\ \mathrm{GHz}$ channel spacing); **1st vs. 2nd gen + 3-cylinder router lookup model**; **`A–B–C` triangle** (spatial $\lambda$ reuse + continuity vs. capacity blocking); **OLT** double `O/E`+`E/O` transponder (€20k–€40k $\times$ 96 ch $\to$ cost causes real blocking), `FEC` vs. IP checksum, `OSC`. |
| **L10** | **$A$–$B$–$C$ OADM savings**, OXC mirrors & limits, Grooming/Muxponder, `10110` 1R/2R/3R & Evolution | $N_{AB}=1, N_{BC}=1, N_{AC}=3 \implies 16 \to 10$ transponders ($37.5\%$, approaching $50\%$ network-wide); dropped $\lambda_1$ reuse; MEMS OXC vs. electrical grooming/$\lambda$-conversion; all-optical subnetworks (`Slide 21` recursive stacks + `Slide 22` SNR); threshold detection & `1R` noise amplification Q&A; **1R/2R (`jitter` & residual broadening)/3R (clock recovery fixes dispersion) trade-off**; 4-stage optical evolution spectra & fiber core/cladding. |
| **L11** | 3 Planes, `Host/Sw/R` Encapsulation (`NI_L4` p. 2), OTN/Optical Stack (`OCC`), **FDI/BDI Staircase**, `OSC` vs. `Pilot Tone` | Data (ns, rigid) vs. Control (s/min, centralized NMS vs. decentralized OSPF) vs. Management (Docker CLI/automation, EMS for ossification); decapsulation rule + **L5 apps/IDS vs. L3 host/switch invisibility**; `ODU/OTU/OCh/OMS/OTS` visibility logic (transponder vs. amplifier visibility); **129 alarms & `OTS→OMS→OCh→ODU` FDI staircase**; `OSC` (per-span `OTS`) vs. guard-band `Pilot Tone` (optical tap at OADM/Amp) vs. `Rate-Preserving OTN`. |
| **L12** | **Optical recap (`OPU`, `OCh` cascade, `Pilot Tone` power)** + **IP Limits vs. MPLS Core (`NI03` Slides 1–14, `NI_L5` pp. 1–5)** | `OPU1–4` (`10 Gbps` NIC inside `100 Gbps` transponder avoiding `90 Gbps` waste); lightpath as cascade of `OCh` $\lambda$s across subnets; why `Pilot Tone` stays low-power inside guard band (`avoid interfering with client signal`) vs. post-cut `OSC` carrying `DI`; **why ISP/IP backbone sits above `96`-$\lambda$ DWDM**; 4 IP keywords + restaurant-booking analogy + queuing curve $\bar{d}_q(\rho)$ + **Reverse Path Tree & subpath optimality**; **`H1–H2` dual-app (`BW` vs. `latency`) tunnels**; `(In Iface, In ID)` switching table; **`RSVP`** (*reservation*) + **32-bit shim (`TC` unused, nested-pipe `S=0/1`, `MP` over POS/Ethernet & IPv4/IPv6)**. |
| **Part III (`Slides 15–44`)** *(Pending L13+)* | `PUSH/SWAP/POP`, Dual-Table `FIB/LFIB`, `PATH/RESV`, 2-Flow Stacking, 3-Move L3VPN, TE & `FRR/BFD` | **`[Anticipated from 2026/27 NI03 Slides 15–44 / Ch. 3 & 24/25 clues — classroom emphasis unconfirmed until Lecture 13+]`:** `p0,0026->POP->IP` vs. `p1,0045->SWAP`; local label uniqueness; `LDP` vs. `RSVP-TE` (`PATH`/`RESV`/`Non-RSVP hop X`/soft state); 2-flow Trunk LSP (`Slide 25`); `PHP` double-lookup & L3VPN edge cases; **Checkmate L3VPN** (`/32` IGP + `MP-BGP` + `VRF` + 2-label trace); **$1.5\ \mathrm{Mbps}$ TE + ECMP**; `BFD` + multilayer `Slide 42` + double-PHP `FRR` (`19->29`, `35->45`) vs. Path Protection. |

### D. Exam Calibration, Historical Quiz Traps & Resolved Student Doubts

> ### 🎯 EXAM TRAPS & SOURCE RECONCILIATIONS
> 1. **Two All-Optical Subnetworks + Fiber Cut (`test-optical-network-2023.pdf` pp. 1, 9; `Theory 24-25` p. 112 Q6; `L11` lines 197–220):** If Subnetwork A and Subnetwork B are connected via an OXC with `O/E/O` transponders and a fiber is cut in A, **only `ODU-FDI`** propagates from A to B (`OTS-FDI`, `OMS-FDI`, `OCh-FDI`, and **`OTU-FDI`** all terminate inside A or at the `O/E/O` boundary because B's optical and OTU sections are healthy; only end-to-end electronic `ODU-FDI` crosses the transponder boundary!). *Source Warning:* `Tests.pdf` Q13 prints a conflicting key (`b) Only OTS-FDI`), which the graded Moodle feedback in `test-optical-network-2023.pdf` p. 9 explicitly marks incorrect (`correct: only ODU-FDI`).
> 2. **Role of `FDI` (`test-optical-network-2023.pdf` p. 3):** `FDI` is sent **downstream by the node immediately downstream of the failure** (never upstream — that node sends **`BDI`** upstream), works in both optical (`OSC`) and electrical (`OTU`/`ODU`) domains, and exists **to suppress redundant alarms**.
> 3. **All-Optical Network Limitation (`L8` `04:54`):** In a purely all-optical region, functions needing bit inspection, memory buffering, or clock recovery — **BER measurement, FEC, TDM grooming, 2R/3R regeneration, IP header lookup** — are **not** available without `O/E/O` (nor is practical wavelength conversion).
> 4. **MPLS Label Uniqueness (`Theory 24-25` pp. 79, 112–113 Wooclap Q8 — `[Re-confirm after 2026/27 MPLS L13+]`):** Two packets traversing the **same link** (same node, same output port) **cannot** carry the same MPLS label (though two different ports on one router may reuse the same label value because labels have **local** link significance).
> 5. **MPLS Data Plane & VPN Traps (`[Historical 2023 test — re-confirm after 2026/27 MPLS L13+]`):**
>    - An **ingress LER always performs `PUSH`** (core LSRs inspect **only the top label**, never the whole stack; classification happens **only at ingress**, not every hop; MPLS does not exist to overcome IP router switching-rate limits).
>    - In **BGP/MPLS L3VPN**: PEs maintain **one VRF per VPN** (NOT one shared VRF for all VPNs); different VPNs **can** use overlapping private prefixes (e.g., both `10.0.0.0/24`); **MPLS does NOT provide cryptographic confidentiality or authentication** (it isolates routing/forwarding, not encryption); the **inner label** tells the egress PE which customer `VRF` / outgoing interface gets the packet (even when `PHP` removes the outer label).
> 6. **Resolved Student Doubts from `NET LESSON 10 DRAFT`, `NET LESSON 11.md` & `NET LEZIONE 12.md`:**
>    - *Why 4 boxes in `NI02` Slide 17 `(a)` if there are 3 cities (`A, B, C`)?* There are **4 light-grey OLT rectangles** (`Node B` needs **two** OLTs in `(a)`: one terminating `A–B`, one retransmitting `B–C`), containing **16 dark-grey transponder squares** (`4` per OLT).
>    - *Is grooming related to OXCs?* Yes: grooming happens at the edge (**muxponder** / **`OPU` container sizing in `L12`**) and inside core OXCs equipped with electrical TDM cards (§2.3, §2.5).
>    - *Core/cladding & dispersion confusion (`NET LESSON 10 DRAFT`):* Shrinking the glass **core** while keeping the **cladding** thick eliminates multiple ray paths (**modal dispersion**); note Polverini accidentally wrote `CROMATIC DISP` above the multimode sketch on `NI_L3` p. 5 before separating modal vs. chromatic dispersion (§2.4).
>    - *Slide 30 two zones (`NET LESSON 11.md`):* In centralized optical networks, the `Control/Management Plane` and `Optical Data Plane` are **both logically distinct and physically separate** (NMS/EMS run on dedicated remote servers, unlike decentralized IP/OSPF routers).
>    - *In `R1–Sw–R2`, does `R1` need `R2`'s MAC, and do routers work at L2 or L3?* **Yes**, `R1` resolves `R2`'s interface MAC (e.g., via ARP) because L2 addresses have per-link scope; `Sw` operates at **L2 only** (`DST_L2 != Sw`'s MAC), while `R2` terminates L2 when `DST_L2` matches its interface and routes at **L3** without touching L4/L5 (because `R2` is not `DST_IP`).
>    - *`NI_L4` p. 3 horizontal `Client/ODU/OTU` sketch:* Drawn and explained in §2.5 below (updated with `L12` `OPU` + `OCh` cascade clarifications).
>    - *`NET LEZIONE 12.md` (`lines 1–16`) cutoff at `38:00`:* The first 29 minutes (`L12` optical recap) are integrated into §2.5 (`OPU`, `OCh` cascade, `Pilot Tone` power constraint, `NI_L5` p. 2), and the rest of Lecture 12 (`38:00` onward through `NI03` Slide 14 `Shim Header` & `POS/Ethernet`) is captured completely in §3.1–§3.2 below.

---

### Table of Contents & Quick Glossary

- **Part I (L8 — Verified 2026/27):** §1 Transport Networks: Role, Aggregation, Topologies, `traceroute`, Logical/Physical Abstraction & Shared Layer-1
- **Part II (L9–L12 Optical Complete — Verified 2026/27):** §2.1 Connection-Oriented WDM & Multiplexing | §2.2 1st vs. 2nd Gen (`A–B–C` Cylinder & Triangle Blocking) | §2.3 Devices (`OLT`, `OADM`, `OXC`, `Muxponder`, Recursive Layering) | §2.4 All-Optical Subnets, Impairments, `1R/2R/3R` & 4-Stage Evolution | §2.5 Planes, `NMS/EMS`, OTN/Optical Stack (`OPU`–`OTS`, `OCC`), `FDI/BDI` Staircase, `OSC` vs. `Pilot Tone` & Optical Self-Check
- **Part III (MPLS — `NI03` Slides 1–14 Verified `L12` | Slides 15–44 Pending `L13+`):** §3.1 ISP/DWDM Bridge, 4 IP Limits, Reverse Path Tree & Evolution (`L12`) | §3.2 Architecture, Shim Header (`L12`), Dual Tables (`FIB/LFIB`), `LDP` vs. `RSVP-TE`, 2-Flow Stacking & `PHP` (`Pending L13+`) | §3.3 MPLS Services (`L3VPN`, `TE`, `FRR/BFD` Protection & Past-Quiz Checkpoints)
- **Part IV (Provisional — `2024/25` Notes + `NI01` Slide 24 / `L8` Preview):** §4 Inter-Domain Routing, Autonomous Systems, BGP & Security Outlook (`RPKI`, `ROAs`, Route Leaks)

| Term / Symbol | Meaning |
| :--- | :--- |
| **PoP / CO** | Point of Presence (interconnection between access and transport) / Central Office (local access hub) |
| **WDM / TDM / FDM** | Wavelength / Time / Frequency Division Multiplexing ($c = \lambda f$, $1550\ \mathrm{nm} \approx 193.5\ \mathrm{THz}$) |
| **OLT / OADM / ROADM / OXC** | Optical Line Terminal / fixed Optical Add-Drop Multiplexer / Reconfigurable OADM / Optical Cross-Connect |
| **O/E/O & RWA** | Optical–Electrical–Optical conversion / Routing and Wavelength Assignment |
| **1R / 2R / 3R** | Reamplification / + Reshaping / + Retiming (clock recovery) |
| **NMS / EMS** | Network Management System (global brain) / Element Management System (vendor-specific mediator) |
| **OPU / ODU / OTU / OCC** | Electronic OTN (`OPU/ODU/OTU` headers) + `OCC` (optical non-associated overhead between `OCh` and `OMS/OTS`) |
| **OCh / OMS / OTS** | Optical layers: Optical Channel (single $\lambda$) / Multiplex Section (WDM bundle) / Transmission Section (btw consecutive optical stages) |
| **FDI / BDI** | Forward / Backward Defect Indicator (downstream alarm suppression / upstream failure notification) |
| **OSC / Pilot Tone** | Optical Supervisory Channel (per-`OTS` $\lambda_{\mathrm{OSC}}$) / low-power guard-band tone per `OCh` |
| **LER / LSR / LSP / FEC** | Label Edge Router / Label Switching Router / Label Switched Path / Forwarding Equivalence Class |
| **PE / CE / P / VRF** | Provider Edge / Customer Edge / Provider core router / VPN Routing & Forwarding table |
| **BFD / FRR / PHP / SRLG** | Bidirectional Forwarding Detection / Fast Reroute / Penultimate Hop Popping / Shared Risk Link Group |
| **AS / ASN / BGP / RPKI / ROA** | Autonomous System / AS Number / Border Gateway Protocol / Resource PKI & Route Origin Authorization (`NI01` Slide 24) |

---

# Part I — Transport Networks: Role and Architectural Principles (Lecture 8 — Verified 2026/27)

## 1.1 Access vs. Transport Networks, Scope & Recursive Relationships

An **access network** (ADSL, FTTH/PON, 5G/Wi-Fi) covers a limited geographical footprint (a neighborhood, block, or small town, a few kilometers) to connect end users (residential households, enterprises, sensors) to a network operator. Because users communicate with destinations outside their local area, a wider infrastructure — the **transport network**, often called a **Wide Area Network (WAN)** — interconnects geographically separated access regions across cities, countries, continents, or even globally via submarine cables or satellite constellations. The exact access/transport boundary depends on the operator and technology. Moreover, WANs are deployed not only by telecom carriers (`TIM Sparkle`), but also by research consortiums (`GÉANT` interconnecting European router PoPs) and cloud hyperscalers (`Google` interconnecting private data centers worldwide, `NI01` Slide 5). Crucially, `L8` (`25:48`, `1:03:21`) contrasts these maps along the core theme of this chapter: `TIM Sparkle`'s submarine map is a **physical view** (actual cables), whereas `GÉANT` and `Google`'s WAN maps show **logical interconnections** among routers/PoPs without showing underlying fiber paths.

Moving from access into transport shifts who acts as the "customer" and creates **recursive customer–provider relationships** along two axes (`NI01` Slides 7–8, `L8` `22:22`, `1:11:08`):
- **Horizontal relationships (across domains):** End user $\to$ Access provider $\to$ **Transport carrier** (transit operator moving traffic flows from an ingress PoP to an egress PoP) $\to$ Remote transport/access networks. Here the carrier's customer is an **entire network infrastructure or router**, not an individual subscriber.
- **Vertical relationships (across protocol layers):** An upper client layer (e.g., an IP backbone belonging to TIM, Vodafone, WindTre, or a bank) requests logical point-to-point connectivity as a *customer* of a lower Layer-1 transport provider (e.g., an optical network).

## 1.2 Traffic Aggregation, Statistical Multiplexing & High Capacity

At the boundary between an access network and the transport core sits a **Point of Presence (PoP)** — an interconnection router/gateway (outside the access network itself). An access network multiplexes many small low-bit-rate application flows (`VoIP/video call`, `web browsing`, `Spotify`, `NI01` Slide 9) — called individual user **tributary flows** $F_i$ ($i = 1, \dots, N$) — into an **aggregated traffic demand** injected at each PoP:

$$
F_{\mathrm{agg}} = \sum_{i=1}^{N} F_i.
$$

Because real user traffic is **bursty** rather than continuously saturated at peak subscribed rates, operators rely on **statistical multiplexing** when provisioning upstream capacity (`NI01` Slides 10–12, `L8` `31:53–38:22`):
- **Worked Example (`1,000` FTTH users):** Suppose $1{,}000$ residential users subscribe to a $1\ \mathrm{Gbit/s}$ nominal access rate. Their theoretical peak sum is $1{,}000 \times 1\ \mathrm{Gbit/s} = 1\ \mathrm{Tbit/s}$, whereas if each averages $50\ \mathrm{Mbit/s}$ during the busy period, the actual PoP aggregate demand is $1{,}000 \times 50\ \mathrm{Mbit/s} = 50\ \mathrm{Gbit/s}$ (still dimensioned with headroom for bursts, though far below nominal sum). Because a transport carrier serves **many** access PoPs simultaneously, its backbone handles **hundreds of $\mathrm{Gbit/s}$ per link up to tens of $\mathrm{Tbit/s}$ aggregate** — orders of magnitude above residential $1\text{–}2.5\ \mathrm{Gbit/s}$ access lines (`L8` `31:53`, `37:07`).
- **Carrier visibility & control granularity (`L8` `34:08`):** From the transport provider's standpoint, each PoP injects **one single large aggregated demand**. Therefore, the carrier monitors and engineers **PoP-level aggregates**, not individual residential subscribers.

## 1.3 Topologies, Congestion & Why Routing Becomes Central

- **Access topologies (`NI01` Slide 13, `NI_L1` p. 3):** A **point-to-point** link and a **tree** (e.g., PON) determine a **unique path** between user and Central Office (`CO`); any cut on the root/shared upstream link disconnects all downstream users, and **congestion** — defined explicitly in `L8` (`44:06`) as **incoming traffic demand exceeding link/server capacity**, causing rising queuing delay first and packet loss next — cannot be bypassed because no alternate link exists (`L8` `46:48`). A **ring** offers two directions (typically configured by simple rule of thumb: clockwise primary, counter-clockwise backup).
- **Transport mesh topologies (`NI01` Slides 14–15, `NI_L1` pp. 3–4):** Because paths are NOT unique in a **mesh**, explicit **routing** ceases to be trivial and becomes central (`L8` `50:13–52:33`). Path selection governs **resource utilization, resilience, delay, and available capacity** across three operational functions:
  1. **Service delivery:** selecting a feasible end-to-end route through the mesh graph.
  2. **Service restoration:** bypassing failed links or nodes using redundant paths.
  3. **Load balancing (traffic engineering):** shifting a flow off a link whose utilization is approaching $100\%$ (`NI_L1` p. 3 utility graph) onto underutilized alternate paths before queuing delay and loss spike.

## 1.4 `traceroute`, Physical Span Reality, Latency & Shared Layer-1

Running `traceroute` between Rome and Milan (`NI01` Slide 17: e.g., 8 L3 hops passing `gw.rome`/`core1.rome` access $\to$ `r1.roma-bologna`/`r2.bologna`/`r3.bologna-milan`/`core1.milan` transport $\to$ `gw.milan`/`milan.example.net` access) reveals **only Layer-3 IP router hops** (`ICMP`/`TTL`). It **hides** both whether traffic crossed multiple transport providers (`L8` `56:53`) and all underlying **Layer-1 optical amplifiers, fibers, and switches**, as well as exact physical routes (`NI01` Slide 17–18, `L8` `54:41–1:03:21`). Two physical laws dominate at WAN scale:
1. **LAN vs. WAN Latency Rule of Thumb (`L8` `58:21`):** Across hundreds or thousands of kilometers ($d$), signal **propagation delay** $t = d/v$ becomes the **largest component of end-to-end latency**, unlike in a LAN.
2. **Multiple Spans & Economic Resource Sharing (`NI01` Slides 18–21, `NI_L1` p. 4):** Attenuation, distortion, and noise prevent running one uninterrupted $300\text{–}500\ \mathrm{km}$ wire between Rome and Bologna/Milan; the real link consists of multiple shorter fiber spans bridged by amplifiers/regenerators. Furthermore, digging nationwide trenches for every operator leaves parallel capacity underutilized and is economically unfeasible (`L8` `1:05:15`). Thus, a **Layer-1 transport provider** deploys **one shared physical optical mesh** and offers isolated logical connections to competing Layer-3 clients (e.g., `TIM` `RM1–ML1` on subnet `10.0.0.1/24–.2/24` and `WindTre` `RM2–ML2`), upholding the **client–provider abstraction**: the client sees logical links without needing internal physical details, while the provider owns physical fibers, maps logical connections onto paths, and shares hardware safely across clients (`NI01` Slides 20–21).

```text
LOGICAL VIEW (Layer 3 / IP clients — "sees logical link only"):
   TIM:   [RM1 (.1)] ------------------ 10.0.0.0/24 ------------------ [ML1 (.2)]
   Wind:  [RM2] ------------------------------------------------------ [ML2]

PHYSICAL VIEW (Shared Layer-1 Optical Mesh — hidden from traceroute):
   [RM1] \                                                            / [ML1]
          +--(fiber)--[OADM/OXC]---[Amp]---[OXC]---[Amp]---[OXC]-----+
   [RM2] /               \________[Amp]_____[OXC]_____[Amp]_/         \ [ML2]
```

| Comparison Axis | Access Network | Transport Network (WAN / Carrier) |
| :--- | :--- | :--- |
| **Geographical span** | Neighborhood / town (few km) | Regional / national / continental / global (100s–1000s km; submarine/satellite) |
| **Typical customers** | Households, individuals, small companies | Access providers, other carriers, hyperscalers, banks (**fewer clients**) |
| **Traffic scale & visibility** | Small individual tributary flows ($1\text{–}2.5\ \mathrm{Gbps}$ FTTH); per-user visible | Large **PoP-level aggregates** (100s $\mathrm{Gbps}$/link to 10s $\mathrm{Tbps}$ total) |
| **Typical topologies** | Point-to-point, Tree (`PON`), Ring | **Mesh** (rich path diversity $\implies$ routing is essential) |
| **Dominant latency factor** | Minimal propagation; access/queuing dominates | **Propagation delay ($t = d/v$)** is usually the largest component |
| **Infrastructure sharing** | Dedicated drop or shared local tree (`PON`) | **Shared Layer-1 optical underlay** hosting isolated multi-tenant logical topologies |

To serve diverse clients (`IP`, `Ethernet`, `SONET/SDH`) and bit rates (`100G` vs. `400G`, `L10` line 2) over one optical underlay, the transport layer must maintain **transparency**: just as IP carries TCP or UDP blindly without changing how IP routes (`L9` line 17), optical lightpaths should carry arbitrary client protocols and bit rates without peeking at client bits.

---

# Part II — Optical Networks (Lectures 9–11 — Verified 2026/27)

## 2.1 Connection-Oriented Optical Service, Multiplexing & WDM

### Why Optical Networks Are Connection-Oriented (`[High Emphasis — L9]`)

Unlike connectionless IP forwarding, an optical transport network is **connection-oriented inside the network**. Contrast this carefully with **TCP** (`NI_Notebook` §2.1, `NET LESSON 9`): TCP's 3-way handshake sets connection state *exclusively at the two endpoints* while intermediate IP routers reserve nothing; an optical network instead computes a route and **reserves physical optical channel state at intermediate nodes** before any data flows (`NI02` Slide 3).

Circuit setup pays off here because of **setup time vs. connection lifetime**: configuring intermediate optical devices takes orders of magnitude longer than forwarding a single IP packet, yet a logical backbone lightpath requested by an IP carrier remains active for **months or years**, amortizing setup overhead. Every **lightpath** (end-to-end optical connection) follows four phases (`NI02` Slide 10, `NI_L2` p. 4):
1. **Connection request:** client specifies endpoints (`Rome`, `Milan`) and QoS/SLA requirements to the server layer; zero network resources are reserved yet.
2. **Connection setup:** provider selects an end-to-end route, statically allocates an optical channel ($\lambda$) on every traversed link, and installs intermediate switching state.
3. **Active / maintenance phase (traffic exchange):** client transmits over the lightpath while the provider monitors performance (`BER`, optical power) and faults.
4. **Connection teardown:** upon client release, provider deletes node switching state and frees wavelengths for future requests.

### Static Multiplexing: TDM vs. FDM / WDM (`[Core Concept — L9]`)

To share one fiber across multiple circuits, optical networks use **static multiplexing** (pre-allocating dedicated channel capacity until teardown), contrasted with packet-level **statistical multiplexing** (`NI02` Slide 7, `NI_L2` p. 3). Notice a subtle trap (`L9` lines 25–37): **idle capacity waste belongs to static multiplexing as a whole** (an idle connection wastes its dedicated TDM slot *or* its dedicated WDM wavelength — which motivates **traffic grooming** in §2.3!). What separates **WDM** from **TDM** is overcoming the **electronic speed wall**:
- **Time Division Multiplexing (TDM):** slices time into repeating frames of $N$ fixed slots (`slot 1` in Frame 1, Frame 2, ...) assigned statically to each circuit (`L9` line 27). **Electronic Bottleneck:** interleaving $N$ tributaries each at bit rate $B$ (e.g., five $1\ \mathrm{Mbps}$ streams) forces the output electronic multiplexer and clock to run at aggregate rate $N \times B$ (`5 Mbps`). At carrier scales ($N$ massive, $B$ tens of Gbps), aggregate electronics hit physical clock ceilings.
- **Frequency Division Multiplexing (FDM) / Wavelength Division Multiplexing (WDM):** leaves time unslotted and partitions spectrum bandwidth $W$ into parallel non-overlapping carrier frequencies (recovered at a receiver via a simple **frequency filter**, `L9` line 27). In optics, frequency carriers are expressed by wavelength $\lambda$ (**"virtual fibers"**, `NI02` Slide 8): each client modulates its own laser at rate $B$ onto a distinct $\lambda_i$, and **passive optics (mirrors/prisms)** combine $\lambda_1, \dots, \lambda_N$ onto one fiber yielding $N \times B$ total throughput **without any electronic circuit exceeding rate $B$**. *(Classroom red/green/blue colors are strictly visual analogies — real WDM channels sit in invisible infrared.)*

### Optical Carriers and Transmission Windows (`NI02` Slides 5–6, 9)

Light obeys $c = \lambda f$ in vacuum ($c \approx 3 \times 10^8\ \mathrm{m/s}$), so higher frequency implies shorter wavelength. Never confuse carrier frequency ($f$) or wavelength ($\lambda$) with encoded **bit rate** (`bps`). Although light travels slower inside glass than vacuum, optical systems label channels by **vacuum wavelength**.

- **Minimal-Attenuation WDM Window (`1550 nm`):** Fiber attenuation ($\mathrm{dB/km}$) exhibits three low-loss windows around $0.85\,\mu\mathrm{m}$, $1.31\,\mu\mathrm{m}$, and **$1.55\,\mu\mathrm{m}$ ($1550\ \mathrm{nm}$)**. Long-haul WDM operates near $1550\ \mathrm{nm}$ because fiber attenuation reaches its absolute minimum **and** the curve is flat (`NI02` Slide 6, `L9` line 31 — minimizing differential distortion across adjacent channels):
  $$
  f = \frac{3 \times 10^8}{1550 \times 10^{-9}} \simeq 193.5\ \mathrm{THz}.
  $$
- **Channel Spacing vs. Signal Bandwidth (`NI02` Slide 9):** Standard WDM grids place adjacent carrier center frequencies **$100\ \mathrm{GHz}$** apart around $193\ \mathrm{THz}$ (`193.3, 193.2, 193.1, 193.0, 192.9 THz`). Crucially (`NI02` Slide 9 diagram): the **$100\ \mathrm{GHz}$ channel spacing** (distance between adjacent carrier centers) is wider than each modulated channel's **signal bandwidth**, leaving unoccupied **guard bands** between neighboring channels to prevent inter-channel interference. Because $\lambda = c/f$ is nonlinear, uniform $100\ \mathrm{GHz}$ steps map to slightly unequal intervals around **$0.8\ \mathrm{nm}$** near $1552.5\ \mathrm{nm}$ (`1550.918 -> 1551.721 -> 1552.524 nm`).

## 2.2 First- vs. Second-Generation Optical Networks, Node Domains & Blocking

> ### 🎯 EXAM OPEN-QUESTION CORE (`L8` `04:54` + `L9` lines 41–50 + `L10` line 18)
> **Question:** *"What are the main differences between first- and second-generation optical networks?"* (`20` min, max `1` page).
> **5 Required Rubric Pillars & Causal Summary (details in §2.4):**
> 1. **Role of optics & Electronics:** 1st gen uses fiber *only* for point-to-point transmission while **every intermediate node performs `O/E/O`** (electronic switching/routing/TDM); 2nd gen (**wavelength-routed**) performs **routing, switching, and optical passthrough (`OADM`/`OXC`) directly in the optical domain**, keeping `O/E/O` only at edges (adaptation) or occasional subnet boundaries.
> 2. **Multiplexing:** 1st gen relies on electronic **TDM** ($N \times B$ clock bottleneck); 2nd gen exploits parallel **WDM** ($\lambda_1, \dots, \lambda_N$ switched/routed independently).
> 3. **Fiber type:** 1st gen started on thick-core **multimode fiber (`MMF`)** (causing *modal dispersion*, different spatial path lengths) before evolving to **single-mode fiber (`SMF`)** (thin core eliminating modal paths).
> 4. **Light source:** 1st gen started with wide-spectrum **LEDs** (`~1.3 um`, impossible for dense WDM), progressed to multi-peak **MLM lasers** (*chromatic dispersion*), and reached narrow-peak **Single-Mode Lasers (`SLM`)** at **$1.55\,\mu\mathrm{m}$** (enabling WDM + minimal flat attenuation).
> 5. **Amplification / Regeneration:** 1st gen needed frequent electronic **`3R` regenerators** (`O/E/O`); 2nd gen relies primarily on transparent **`1R` optical amplifiers** (e.g., `EDFA`, amplifying all WDM $\lambda$s simultaneously without bit inspection), preserving end-to-end **transparency** inside long all-optical regions over meshed cores + metro rings.

Why did optics replace copper (`NI02` Slide 11, `L9` line 47)? Fiber offers **orders-of-magnitude higher bandwidth**, **much lower attenuation**, and **immunity to electromagnetic interference**. Yet why couldn't early optical networks inspect packets optically? Polverini models every node (`A`, `B`, `C` cylinders on `NI_L2` p. 5, `L9` lines 41–49) split horizontally into an **Electrical Domain (top)** and **Optical Domain (bottom)**:

```text
  NI_L2 p. 5 CYLINDER MODEL (Intermediate Transit Node B):
   ===========================================================================
   ELECTRICAL  |  Store packet in RAM -> Read DST IP -> LPM lookup -> Out port |  [1st Gen: crosses UP via O/E,
   (Digital)   |  (easy for CPUs: FEC, BER, TDM grooming, IP routing, buffering)|   switches digitally, back DOWN E/O]
   - - - - - - +--------------------------------------------------------------+- - - - - - - - - - - - - - - - - - -
   OPTICAL     |  Analog light ray: NO optical RAM, NO IP header lookup!       |  [2nd Gen: stays BELOW line via
   (Analog)    |  (Passive optics/mirrors only -> keeps full transparency!)    |   OADM/OXC optical passthrough!]
   ===========================================================================
```

| Dimension | First-Generation Optical Networks | Second-Generation (Wavelength-Routed) Optical Networks |
| :--- | :--- | :--- |
| **Role of optics** | Point-to-point physical transmission cable only | Transmission **plus switching and routing** of $\lambda$ lightpaths |
| **Topology** | **Point-to-point** links between electronic switches (`Theory 24-25` Q2) | **Meshed core** (`OXC`s) + peripheral **metro rings** (`OADM`s) |
| **Intermediate nodes** | `O/E` $\to$ RAM buffer / IP or TDM electronic switch $\to$ `E/O` at every hop | Optical passthrough (`OADM`, `OXC` mirrors) keeps transit traffic optical |
| **Multiplexing** | **TDM** (single shared high-rate digital stream) | **WDM** (parallel optical channels $\lambda_1, \dots, \lambda_N$ on one fiber) |
| **Fiber & Source** | Evolved from `MMF` + `LED` (`1.3 um`) $\to$ `SMF` + `MLM/SLM` (`1.55 um`, §2.4) | Single-mode fiber (`SMF`) + narrow single-mode laser (`SLM`) at $1.55\ \mu\mathrm{m}$ |
| **Amplification / Regen.** | Frequent **3R** electronic regenerators (`O/E/O`, §2.4) | Mostly **1R optical amplifiers** (e.g., EDFA) across long all-optical spans |
| **Transparency** | Destroyed at every intermediate hop | Preserved end-to-end inside each all-optical subnetwork |

*(Slide Visual Convention: specifically on **`NI02` Slide 28 (`Network Evolution`)**, solid grey Tx/Rx are electrical, diagonal half-shaded squares are `O/E/O` 3R regenerators, and solid black triangles are `1R` optical amplifiers. Elsewhere in `NI02` — e.g., Slides 13, 17, 35, 39 — light-grey rectangles/triangles depict OLT/OADM/muxes while dark-grey squares represent `O/E/O` transponders/regenerators.)*

### Multi-Tier Overview (`NI02` Slide 13) & `A–B–C` Triangle: Spatial Reuse, Continuity & Blocking (`NI_L2` p. 6)

Second-generation networks organize into two tiers (`NI_L2` p. 5, `L9` lines 56–62): peripheral **metro rings** of **OADMs** connecting neighborhood **Central Offices (`CO`)** to a **meshed core backbone** of **OXCs** (linked by `OLT` fiber spans). On `NI02` Slide 13, a single lightpath $\lambda_2$ leaves `IP router A` $\to$ enters a metro OADM ring $\to$ crosses an `OLT` into core `OXC`s $\to$ drops onto a remote metro ring (`lambda_1`/`lambda_2`) $\to$ reaches `IP router F` over the exact same physical fabric simultaneously serving `SONET` terminals (`B`, `C`) and other `IP` routers (`D`, `E`).

Without intermediate wavelength converters, every lightpath must obey the **wavelength-continuity constraint**: it keeps the **exact same $\lambda_i$** on every traversed link from source to destination (`NI_Notebook` §2.3, `L9` line 68). Polverini's whiteboard `A–B–C` **triangle** (`NI_L2` p. 6, using 2 available colors `{green, red}`) proves two critical properties often conflated in MCQs:

```text
  NI_L2 p. 6 TRIANGLE EXAMPLE (pool = {green, red} on every undirected link):
     [IP_A] --- (A) ======[ green,  FREE(red) ]====== (B)
                   \                                 /
                    \ [ green, red ]   [ red, FREE(green) ]
                     \  (BOTH USED!)               /
                      +------------ (C) ----------+ --- [IP_B]

  1. Spatial Wavelength Reuse (SUPPORTED!): "green" serves A-B AND A-C simultaneously
     (link-disjoint paths); "red" serves A-C AND B-C simultaneously without interference.
  2. New request IP_A (at A) -> IP_B (at C) suffers BLOCKING across BOTH candidate paths:
     - Route 1 (A -> B -> C): A-B only has RED free, B-C only has GREEN free -> blocked by WAVELENGTH CONTINUITY!
     - Route 2 (direct A -> C): both GREEN and RED already occupied -> blocked by EXHAUSTED CAPACITY!
```

Blocking occurs only when **no** candidate physical route satisfies continuity; joint path + wavelength selection is **Routing and Wavelength Assignment (`RWA`)**. Installing an `O/E/O` transponder at `B` relaxes continuity (`red -> green`) at the price of breaking transparency and adding expensive hardware.

## 2.3 Recursive Layering, Optical Devices & Transponder Economics (`L9`–`L10`)

### Recursive Protocol Layering (`NI02` Slide 21 — `The Optical Layer`)

Even though a Layer-3 `IP router — IP router` client views an optical lightpath as a single Layer-1 `Physical` wire (`NI01` Slide 18), `NI02` Slide 21 highlights that **multiple protocol stacks reside one on top of the other**: the client's `[Network | Data link]` stack sits atop an optical transport underlay that *itself* contains a full multi-node `[Network (routing/OXCs) | Data link (OTN framing) | Physical (WDM fiber/amps)]` hierarchy.

### 1. Optical Line Terminal (`OLT`), Transponder Mechanics & Economics

OLTs terminate both ends of point-to-point WDM fiber links (`NI02` Slides 15–16, `NI_L2` pp. 6–8). They contain **Transponders (`O/E/O`)**, passive **Wavelength Mux/Demux**, **Optical Amplifiers**, and the **Optical Supervisory Channel (`OSC`)**.

```text
  NI_L2 p. 7 — WHY EDGE OLTs USE O/E/O DESPITE 2ND-GEN STAYING OPTICAL IN THE CORE:
   Client Router      |   O/E/O Transponder (Edge Boundary Only!)
   (gray 1.3 um ray)  |      Electrical: [OTN | CLIENT] (101110.. bits, BER check + FEC!)
                      |          ^                            |
     ---(red ray)-----+---> (O/E)|                            v (E/O)
   Optical Domain     |          +----------------------------+----(green ITU lambda_i)---> Mux -> Fiber
```

- **Why `O/E/O` inside an edge OLT?** Although 2nd-gen networks avoid intermediate `O/E/O` switching, a **client–OLT boundary** performs three tasks (`NI02` Slide 15, `L9` lines 75–77): (1) converts arbitrary client optical signals (e.g., short-reach `1.3 um` gray light) into standardized operator ITU-grid WDM wavelengths (`1.55 um` colored light) **and vice versa**; (2) inserts/terminates **OTN overhead** — crucially including **Forward Error Correction (`FEC`)**, which unlike simple error-detecting **IP checksums** can both **detect and correct** binary transmission errors (`L9` line 77), and differs fundamentally from **protection** (`FEC` corrects bits along the active path, whereas protection reroutes around failed elements, `NI_Notebook` §2.6.1); and (3) monitors digital **Bit Error Rate (`BER`)** at **both ingress and egress** points (`NI02` Slide 15).
- **Direct client bypass (`NI02` Slide 16, `ITU λ_3`):** If a client router card **already integrates a compliant transponder** emitting the exact operator-assigned ITU $\lambda$, it bypasses the external OLT transponder and connects straight into the passive Mux (`L9` line 83).
- **Static Wavelengths, Cost & Practical Blocking (`NI02` Slide 16, `L9` line 79, `L10` line 2):** Conventional transponders are **fixed-wavelength** (unable to retune dynamically), fridge-rack-sized, power-hungry, and cost **€20,000–€40,000 each**. Because equipping all **96** fiber channels up front costs millions per OLT (`96 × €20k–€40k`), operators deploy transponders incrementally — creating a design tension (**minimize cost/footprint vs. each transponder = 1 $\lambda$ = 1 more client served**) and explaining Polverini's key insight: **blocking in real networks happens mostly for economic transponder limits, not physical fiber channel scarcity** (`L9` line 79).
- **Mux/Demux & `OSC` intuition:** Passive WDM muxes combine colors with mirrors and demuxes split composite light using **prism dispersion** (*Pink Floyd — The Dark Side of the Moon*, `L9` line 81) or **thin-film filters** (passing only a narrow band like *solar eclipse glasses*, `L11` line 7). Meanwhile, a dedicated **`OSC`** transponder injects a supervisory wavelength $\lambda_{\mathrm{OSC}}$ alongside data channels ($\lambda_1, \lambda_2, \lambda_3, \lambda_{\mathrm{OSC}}$ on `NI_L2` p. 8) strictly for **operator management** — e.g., monitoring $\lambda_{\mathrm{OSC}}$ power to detect and localize fiber cuts (`L9` line 85; §2.5).

### 2. Optical Add/Drop Multiplexer (`OADM`), `ROADM` & the 3-Node $A$–$B$–$C$ Calculation (`[CORE EXAM EXAMPLE — L10]`)

An **OADM** (`NI02` Slides 17–18, `NI_L3` p. 1) is a **4-port optical device** (`In`, `Out`, `Drop`, `Add`) lowering passthrough cost in **both metro rings and long-haul chains**. For this course, **keep only Architecture `(a)`** (`L10` line 2): `Demux` splits wavelengths, local signals exit via `Drop`, transit channels stay **purely optical** (**optical passthrough**) to the `Mux`, and local signals enter via `Add`. Dropping $\lambda_1$ removes it from the fiber so `B` **must reuse that exact freed $\lambda_1$** slot (`Add`) for `B–C` because all transit wavelengths remain occupied (`L10` line 2). Basic **fixed OADMs** wire add/drop ports statically (requiring manual intervention to change which $\lambda$ drops), whereas **Reconfigurable OADMs (`ROADMs`)** allow software-controlled dynamic selection (`NI_Notebook` §2.6.2).

**Worked Example (`NI02` Slide 17 & `NI_L3` p. 1):** Three sites $A - B - C$ have logical demands $N_{AB} = 1$, $N_{BC} = 1$, and $N_{AC} = 3$ channels (so spans $A\text{–}B$ and $B\text{–}C$ each carry $1 + 3 = 4$ wavelengths; Slide 17 light-grey boxes = OLTs, 16 dark-grey squares = transponders):
- **Point-to-point OLTs (`a`):** `A` needs $4$, `C` needs $4$, and `B` needs **two OLTs** ($4$ receiving from `A` + $4$ retransmitting to `C` = $8$):
  $$
  N_{\mathrm{TP}}^{\mathrm{OLT}} = 4 + (4 + 4) + 4 = 16\text{ transponders.}
  $$
- **OADM at `B` (`b`):** The `3` $A\text{–}C$ channels pass through optically; `B` needs only $1$ transponder to **Drop** $A\text{–}B$ and $1$ to **Add** $B\text{–}C$:
  $$
  N_{\mathrm{TP}}^{\mathrm{OADM}} = 4 + 2 + 4 = 10\text{ transponders.}
  $$
  Savings: **$75\%$ at Node `B`** ($8 \to 2$) and **$37.5\%$ network-wide** ($16 \to 10$, saving `6` transponders). Letting $N_{AC} = K \to \infty$ (`2K` vs. `4K` total transponders), network-wide savings approach **$50\%$** (`NI_Notebook` §2.6.2, p. 31).

### 3. Optical Cross-Connect (`OXC`) & Traffic Grooming (`Muxponder`)

To route dynamically across multi-fiber meshed backbones while attaching local clients (`IP`, `SONET/SDH`, `ATM`, `NI02` Slide 19), core sites deploy **OXCs** (`NI02` Slides 19–20, `NI_L3` p. 2). An **all-optical OXC** demuxes incoming fibers and deflects wavelengths via **electronically tilted movable mirrors (`MEMS`)** programmed once during setup (`L10` line 6), preserving bit-rate/format transparency. By contrast, an **electrical-matrix OXC** converts signals `O/E/O` internally (`NI_Notebook` §2.6.3 p. 33) — which is **required** whenever an OXC must convert wavelengths or switch sub-wavelength traffic, because **passive MEMS mirrors cannot change a beam's color or split a TDM bit stream**!

Five OXC functions (`NI02` Slide 20):
1. **Service provisioning:** automated software setup/reconfiguration (eliminating manual patch panels).
2. **Protection:** rapid failure detection and optical rerouting.
3. **Bit-rate and format transparency:** held *only* when paths traverse purely optical MEMS switching.
4. **Wavelength conversion ($\lambda_{\mathrm{in}} \to \lambda_{\mathrm{out}}$):** requires `O/E/O` transponders, **breaking transparency (Function 3)**.
5. **Multiplexing & Traffic Grooming:** switching internally at **finer sub-wavelength granularities** — demuxing TDM tributaries, rearranging low-rate flows across outgoing $\lambda$s, and repacking — which **must run in the electrical domain** (also breaking optical transparency).

**Grooming & Muxponder (`NI_L3` p. 2, `NI_Notebook` Fig. 2.10):** Distinguish cleanly: **WDM** combines multiple $\lambda$s *optically* onto 1 fiber, whereas **Grooming** combines multiple low-bit-rate client flows ($f_1, \dots, f_K$) *electrically via TDM* onto **one shared transponder and one $\lambda$** so small ISPs share the $€20\text{k}\text{–}€40\text{k}$ transponder cost. Grooming occurs **at the edge** inside a **muxponder** (`TDM Mux + single transponder`) or **inside core OXCs** fitted with electrical TDM cards; extracting an individual tributary $f_i$ at egress requires `O/E` conversion plus TDM demultiplexing (`L10` line 6).

## 2.4 All-Optical Subnetworks, Impairments, Regeneration & Optical Evolution (`L10`)

### All-Optical Subnetworks & Analog SNR Limit (`NI02` Slides 22–23, `NI_L3` p. 3)

Ideally, `O/E/O` would sit **only at the network edge** for client **adaptation** (`Slide 23`). In reality, **analog optical signals require a higher signal-to-noise ratio (`SNR`) than digital signals** (`Slide 22`): digital receivers recover `0`/`1` across discrete thresholds and correct bit errors with `FEC`, whereas continuous analog light accumulates noise and amplifier/nonlinear distortion end to end without resetting bits. Combined with needs for **signal regeneration**, **wavelength conversion**, **TDM grooming**, and **`BER` monitoring**, core `O/E/O` points partition an optical carrier into separate **all-optical subnetworks** bridged by electronics — just as routers join separate LANs (`L10` lines 6–8).

### Signal Impairments, Threshold Q&A & `1R / 2R / 3R` Regeneration (`[High Emphasis — L10]`)

Sending `10110` via On-Off Keying (`OOK`: laser ON for bit duration $T$ = `1`, OFF = `0`, `NI_L3` pp. 4–5) faces three distinct impairments (`NI02` Slide 24):
- **Attenuation:** optical power shrinks (rectangular pulse shrinks vertically while keeping shape/duration).
- **Distortion:** noise and nonlinear effects deform the square waveform shape (rounded hump).
- **Dispersion:** pulse broadens in time ($T' > T$), overlapping neighboring bit slots (**inter-symbol interference**).

**Critical Classroom Q&A on Threshold Recovery & `1R` Noise (`L10` lines 10–18):** A student asked what happens if attenuation drops `1` power below the receiver threshold, or if `1R` boosts noise above threshold. Polverini clarified: (1) weak signals must first be **amplified (`1R`) before threshold detection**; (2) real receivers do not trigger on instantaneous spikes alone — a pulse must stay above threshold for a minimum duration; yet (3) **upstream `1R` amplifies accumulated noise/distortion alongside data**, so once SNR drops low enough that noise crosses threshold/duration bounds, downstream **`2R` freezes that noise into permanent bit errors** (`L10` lines 8, 16–18).

| Type | Functions | Impairments Fixed (Contrast Slides 25–27) | Domain | Transparency & Limitations |
| :--- | :--- | :--- | :--- | :--- |
| **1R** | **Reamplification** (optical amplifier, e.g., EDFA) | **Attenuation only** | **Optical** | **Highest transparency** (supports analog signals and arbitrary bit rates/formats; stays inside one all-optical subnet). Does **not** fix distortion/dispersion and **amplifies accumulated noise**, failing once SNR drops too low. |
| **2R** | **Reamplification + Reshaping** | **Attenuation + Distortion** *(does NOT fix dispersion!)* | **Electrical (`O/E/O`)** | Breaks all-optical subnet and assumes a known **pulse shape** (e.g., square, failing on Gaussian), though remaining bit-rate transparent. Because `2R` fires fixed-shape pulses at threshold crossings without clock recovery, **residual temporal broadening remains (`Slide 26`)**, producing edge-timing shifts (**jitter**) that accumulate across hops. |
| **3R** | **Reamplification + Reshaping + Retiming** (transponder) | **Attenuation + Distortion + Dispersion** (`Slide 27`: restores original pulse width & clock) | **Electrical (`O/E/O`)** | **Lowest transparency:** clock recovery requires knowing **both** pulse shape and exact bit rate/framing, yielding a "fresh," resynchronized digital copy (`Slide 27`). |

### Four-Stage Evolution of Optical Transmission Systems (`NI02` Slide 28, `NI_L3` pp. 5–6)

An optical fiber confines light inside a glass **core** surrounded by a lower-index **cladding** via total internal reflection (`L10` line 18, `NI_L3` p. 5; *note: Polverini briefly wrote `CROMATIC DISP` above the multimode core/cladding sketch on `NI_L3` p. 5 before separating modal vs. chromatic dispersion*):

1. **Stage (a) — `LED` + Multimode Fiber (`1.3 um`), `TDM`:** An **LED** emits a **broad continuous power spectrum** across many $\lambda$s (unable to isolate sharp WDM channels). Thick-core **multimode fiber (`MMF`)** allows rays along steeper bounce angles to travel longer physical distances than straight axial rays, causing severe **modal dispersion** ($T' > T$); paired with higher `1.3 um` attenuation, links need **dense `3R` regenerators**.
2. **Stage (b) — `MLM Laser` + Single-Mode Fiber (`1.3 um`), `TDM`:** Shrinking the glass **core** dramatically while keeping the **cladding** thick creates **single-mode fiber (`SMF`)**, restricting propagation to the fundamental axial mode and **eliminating modal dispersion** (cutting `3R` count). However, a **multi-longitudinal-mode (`MLM`) laser** still emits a **multi-peak comb of discrete $\lambda$s** (`NI02` Slide 28(b)); because propagation velocity in glass varies slightly with $\lambda$, different color components arrive at slightly different times (`NI_L3` p. 6 bottom blue/red/yellow lines), causing **chromatic dispersion / distortion** ($T' > T$) and still impeding clean WDM.
3. **Stage (c) — `SLM Laser` + `SMF` (`1.55 um`), `TDM`:** Two distinct causes cut `3R` frequency even further: shifting transmission from `1.3 um` to the **$1.55\,\mu\mathrm{m}$ window reduces attenuation** (extending reach, `NI_Notebook` §2.8.3), while narrowing the source to a **Single-Mode Laser (`SLM`) single sharp peak** (plus **dispersion-engineered fiber** making $\lambda$ speeds more uniform, `L10` line 18) **suppresses chromatic dispersion**.
4. **Stage (d) — `SLM` Lasers + `WDM` + Optical Amplifiers (`1R`), Second-Gen:** All four enablers (`SMF` + `SLM` + `1.55 um` low-loss window + broadband `1R` optical amplifiers boosting $\lambda_1, \lambda_2, \lambda_3$ together in light form) unlock **second-generation WDM optical networks**, leaving `O/E/O` only at domain boundaries (`NI_Notebook` §2.8.4).

## 2.5 Control & Management Planes, OTN/Optical Layering, Alarms & Overhead (`L11`)

### Three Functional Planes & Centralized `NMS/EMS` (`NI02` Slides 30–31, `NI_L4` p. 1)

| Plane | Responsibility & Concrete `L11` Kathara Examples | Execution Timescale | Implementation |
| :--- | :--- | :--- | :--- |
| **Data Plane** | Forwarding user traffic (`IP` TTL/checksum/lookup; `ping`/`iperf` in Kathara; optical mirror switching) | **Per-packet / continuous** (ns at 100+ Gbps) | Fast, rigid hardware / optical mirrors |
| **Control Plane** | Path selection & connection setup (`Dijkstra`/`FRR/OSPF` in Kathara; RWA + mirror programming in optical) | **Event-triggered** (seconds to minutes) | **Decentralized** (`OSPF`) or **Centralized** (`NMS` in optical) |
| **Management Plane** | Operator configuration & health/SLA monitoring (`Docker CLI` or automated scripts in Kathara; NMS/EMS) | **Operational / continuous** | Human `CLI` or automated **NMS** + **EMS** |

In `NI02` Slide 30 (`Management and Control Architecture`), the **Control and Management duties blend inside the centralized `NMS` box** (`NI_Notebook` §2.9 p. 43: `Topology & resource view`, `Lightpath provisioning`, `Performance monitoring`, `Fault management`), which sits **both logically and physically separate** on dedicated remote (typically replicated/hierarchical, `L11` line 39) servers above the `Optical Data Plane`. Because multi-vendor equipment (`Nokia`, `Cisco`) exhibits closed interoperability (**ossification**, `L11`), the `NMS` coordinates vendor families through intermediate **Element Management Systems (`EMS`)**:
- **Workflow (`NI02` Slides 30–31, `NI_L4` p. 1):** Client sends `Request(endpoints, bandwidth, adaptation?, target BER, protection level, jitter, max delay)` $\to$ `NMS` computes constrained RWA $\to$ sends `Setup` commands via `EMS` to program OXC mirrors $\to$ monitors active SLAs (`99.99999%`) and recomputes detours on cuts (`NI_L4` p. 1 red `X` $\to$ blue path). Slide 31 explicitly notes this simple NMS interface suffices *precisely because lightpaths are provisioned infrequently and stay nailed down for months/years*.

### Encapsulation & Layer-Visibility Trade-Off (`[Core L11 Bridge — NI_L4 p. 2, L11 lines 90–120]`)

1. **When decapsulation happens (`R1 — Sw — R2`):** A device decapsulates a header **only when it is the destination of that outermost active header** (`L11` line 95). `R1` encapsulates `[IP (SRC_IP, DST_IP)]` inside Ethernet `[L2 (SRC_L2, DST_L2 = R2's MAC)]` (resolved via ARP, per-link scope). Layer-2 switch `Sw` checks `DST_L2 != Sw`'s MAC and switches at L2 **without decapsulating**; `R2` sees `DST_L2 == R2`'s MAC, decapsulates L2, reads `DST_IP` at **L3**, and forwards onward in a new L2 frame without touching L4/L5 (because neither `R1` nor `R2` is `DST_IP`).
2. **Visibility vs. Flow Granularity (`Host <-> Host` red/blue app sketch, `NI_L4` p. 2, `L11` lines 97–120):** Moving **down** the stack (`App → Transport → Network → Link → Physical`) trades flow precision for physical detail:
   - **Layer 5 (Application):** Purely logical; sees **only communicating processes** (`Web` vs. `WhatsApp` red/blue client–server sessions) — **no hosts, no IP, no Ethernet switches, no firewalls**. Ideal for client SLA monitoring and semantic inspection (e.g., **Intrusion Detection Systems (`IDS`)** reading application requests vs. replies).
   - **Layer 3 (Network):** Reveals physical **hosts and underlying IP clouds**, **but collapses red and blue apps into one aggregate host-to-host flow** (losing message semantics). **Crucial `L11` Student Q&A (`lines 115–119`):** When Polverini asked where to monitor infrastructure health, a student guessed *"Upper"*, which he corrected: **at Layer 3 an Ethernet switch is completely invisible**, so **infrastructure health monitoring belongs in lower layers** (pinpointing faulty components), whereas **client QoS/SLA monitoring belongs in upper layers**.

### Layers Within the Optical & Electronic Transport Stack (`NI02` Slides 32–35, `NI_L4` p. 3, `L11` lines 121–166)

```text
  NI02 SLIDE 35 & NI_L4 p. 3 HORIZONTAL SPAN (Across 2 All-Optical Subnetworks):
    Client:   [R1] ======================================================================== [R2]
    ODU:      [OLT] ====================(end-to-end electronic service)=================== [OLT]
    OTU:      [OLT] ===(Subnet 1: OH|ODU|FEC)===[Tpdr]---[Tpdr]===(Subnet 2: OH|ODU|FEC)===[OLT]
    ========== ELECTRICAL / OPTICAL BOUNDARY (OCC = Non-associated overhead below OCh) =========
    OCh:      [OLT] -------(single lambda)----->[Tpdr]   [Tpdr]-----(lambda')------------->[OLT]
    OMS:      [OLT]<----->[OADM]<----------------->[OLT] [OLT]<--------------------------->[OLT]
    OTS:      [OLT]<->[OADM]<->[1R Amp]<---------->[OLT] [OLT]<--------------------------->[OLT]
```

- **Electrical Layers (`OPU`, `ODU`, `OTU` — digital frames & headers):**
  - **`OPU` (`L12` lines 7–21, `NI_L5` p. 1):** adapts and grooms heterogeneous client traffic into a transponder's fixed electrical bitrate $C\ [\mathrm{bps}]$. **Concrete `L12` Example:** if a client IP router NIC operates at $10\ \mathrm{Gbps}$ while the optical transponder transmits at $C = 100\ \mathrm{Gbps}$, dedicating that transponder to one customer wastes **$90\ \mathrm{Gbps}$**. Using sized containers (`OPU1`, double-sized `OPU2`, ..., up to `OPU4`), `OPU` packs multiple small client tributaries into the `100 Gbps` transponder (TDM grooming) without exceeding hardware boundaries or wasting $\lambda$ capacity.
  - **`ODU`:** spans **end-to-end** across all optical subnetworks, tracking overall client SLA compliance (**tells you *that* the service degraded, not *where***, `L11` line 145).
  - **`OTU`:** wraps `OH | ODU | FEC` (`Slide 34`) and terminates at every intermediate **`O/E/O` transponder/regenerator**, enabling **digital `BER` localization per all-optical subnetwork** (`L12`: also the boundary where a signal can jump from $\lambda_1$ to a different $\lambda_2$).
- **Optical Layers (`OCh`, `OMS`, `OTS` — physical light abstractions, NOT binary packet headers!):** `Slide 34` marks **`OCC` (`Non associated overhead`)** bridging `OCh` to `OMS/OTS`, emphasizing that optical layers add physical supervision rather than binary frame headers (`NI_Notebook` p. 47):
  - **`OCh`:** monitors an individual client $\lambda$ across one all-optical subnet. Crucially (`L12` lines 31–33, `NI_L5` p. 1 red/blue), one logical end-to-end lightpath (`ODU`) is physically a **cascade of distinct `OCh` channels** across subnetworks (`red λ1` in Subnet 1 $\to$ `O/E/O` at `OTU` $\to$ `blue λ2` in Subnet 2). Why have *both* `OTU` and `OCh` if their span looks identical (`Slide 35`)? Because **`OCh` exposes the optical transponder/laser itself** (`L11` line 147), whereas `OTU` sees only bits.
  - **`OMS`:** views the multiplexed WDM bundle $\{\lambda_1, \lambda_2, \lambda_3\}$ between mux/demux/OADM points (`Slide 32`, `L11` lines 155–159). Losing per-client control, `OMS` sees multiplexers/OADMs **but hides intermediate `1R` optical amplifiers**.
  - **`OTS`:** exposes each individual **fiber span between consecutive optical stages (`OLT`, `OADM`, or `1R Amplifier`)**, giving exact visibility of every fiber cable and amplifier.

### Performance vs. Fault Management, 129 Alarms & `FDI/BDI` Staircase (`NI02` Slides 36–39)

- **Performance vs. Fault Management (`L11` lines 163–166, `NI_Notebook` §2.10.1):** Performance management tracks gradual signal degradation (`BER` electronically; **Optical Power** optically) plus **Optical Trace** (unique fiber/lightpath ID such as endpoint router IPs, solving *"which of 10,000 fibers failed?"*, `L11` line 178). Fault management handles abrupt failures in two sequential phases: **(1) Detection & root-cause localization (`FDI/BDI` alarm suppression)** $\to$ **(2) Control-plane restoration** (detour calculation).
- **The `129`-Alarm Flood (`NI02` Slide 38):** A linear chain of **4 total nodes** carrying $32$ bidirectional lightpaths suffers a single fiber cut: `1` link failure alarm plus $32$ lightpath loss-of-signal alarms at all $4$ nodes ($32 \times 4 = 128$) = **`129` alarms** sent to the NMS from one cut.
- **Staircase Alarm Suppression (`FDI` & `BDI` — `NI02` Slide 39 & `L11` lines 197–220):** Only the node *immediately downstream* of the cut raises the root-cause alarm; `FDI` (downstream) and `BDI` (upstream) suppress redundant alarms **only along the exact layers and elements that actually observe loss of signal**, climbing the stack like stairs (`BDI` obeys the same selective rule upstream, `NI_Notebook` p. 51):

```text
  NI02 SLIDE 39 — FIBER CUT A-B STAIRCASE SUPPRESSION:
    OLT A ---X(cut)---> Amp B -----> Amp C -----> OADM D -----> OLT/OXC E ===> [Subnet 2: F -> G]
                          |                         |               |          [Subnet 3: H -> I]
       <-- OTS-BDI ---    |--- OMS-FDI ------------>|--- OCh-FDI -->|
                   [OTS failure alarm]                         [O/E/O boundary]
                     (ROOT CAUSE!)                                  |--- ODU-FDI -------> (to G & I)
```

  1. Fiber `A–B` is cut. `Amp B` sees optical LOS, sends **one root-cause `OTS failure alarm`** to NMS, sends **`OTS-BDI`** upstream to `A`, and does **not** send `OTS-FDI` to `C` (because `B–C` and `C–D` OTS fibers are healthy and notice nothing wrong on their OTS interfaces!). Instead, `B` sends **`OMS-FDI`** through `C` to **`OADM D`** (whose incoming `OMS` bundle lost `OSC`/power).
  2. **`OADM D`** terminates the `A–D` `OMS` and starts a healthy new `OMS` toward `E`, so `OMS-FDI` stops at `D` and becomes **`OCh-FDI`** sent across to **`E`'s transponders** (which otherwise raise per-$\lambda$ alarms).
  3. At **`E`** (`O/E/O` boundary into Subnetworks 2 and 3), the optical sections and `OTU` sections of Subnetworks 2 and 3 remain physically healthy — so **`OTS-FDI`, `OMS-FDI`, `OCh-FDI`, and `OTU-FDI` ALL stop inside or at `E`**. Only end-to-end **`ODU-FDI`** propagates across `E` to suppress client alarms at final transponders `G` and `I` (`NI_Notebook` p. 50; reconciles `test-optical-network-2023.pdf` p. 9!).

### Optical Layer Overhead: `OSC` vs. `Pilot Tone` vs. `Rate-Preserving OTN` (`NI02` Slides 40–41, `NI_L4` p. 4)

```text
  NI02 SLIDE 40 — SPATIAL SPAN OF EACH OVERHEAD MECHANISM:
   Rate-Preserving OTN: [Insert] ====================(ODU end-to-end; OTU monitor/modify at O/E/O)====================> [Remove]
   Pilot Tone (per OCh): [Insert] -> (tap monitor) -> (tap monitor) -> [Terminate] | [Insert] ------------------------> [Terminate]
   OSC (per OTS span):   [Ins]->[Ext][Ins]---------->[Ext][Ins]------>[Ext]       | [Ins]--------------------------->[Ext]
   Physical Devices:     [OLT/Tpdr]----[OADM]----------[1R Amp]--------[O/E/O Tpdr / Regenerator]--------------------->[OLT/Tpdr]
```

*(Slide 41 table was walked through in full at `L12` lines 65–89, matching `NI02` Slide 41 and `NI_Notebook` Table 2.1.)*

| Management Function | `OSC` (All-Optical Subnet) | `Pilot Tone` (All-Optical Subnet) | Rate-Preserving `OTN` (End-to-End / `O/E/O`) |
| :--- | :--- | :--- | :--- |
| **Mechanism & Span** | Separate $\lambda_{\mathrm{OSC}}$ (dedicated supervisory laser), inserted & extracted **hop-by-hop on every `OTS` span** (`OLT–OADM–Amp–OLT`) | Low-power sub-modulated tone injected by client transponder inside the **guard band** next to $\lambda_0$ (`NI_L4` p. 4, `NI_L5` p. 1); tapped optically at OADM/Amp, terminated at `O/E/O` | Digital overhead + `FEC` inside electronic `OTU`/`ODU` frames (*scales line rate slightly to carry overhead without shrinking client bit rate*) |
| **Trace (Identification)** | **`OTS`** (physical fiber section) | **`OCh`** (individual client $\lambda$) | **`OTU`**, **`ODU`** (connection) |
| **Defect Indicators (`FDI/BDI`)** | **`OTS`**, **`OMS`**, **`OCh`** | **None** *(cut kills pilot tone along with client signal!)* | **`OTU`**, **`ODU`** |
| **Performance Monitoring** | **None** for client signal *(separate transponder!)* | **Optical power** of that single $\lambda_0$ | **`BER`** (digital bit errors via parity/FEC) |
| **Client Compatibility** | Any | Any | Any |

**Key Trade-Offs (`L11` lines 227–242, `L12` lines 57–89, `NI_L5` pp. 1–2):**
1. **Why `Pilot Tone` must stay low-power / low-capacity (`L12` line 61):** Increasing the pilot tone's bitrate requires higher optical power, which would **interfere directly with the client's main $\lambda_1$ signal** inside the narrow guard band (`NI_L5` p. 1 bottom).
2. **Why `OSC` carries `DI` after a fiber cut while `Pilot Tone` cannot (`NI_L5` p. 2 top):** Because `OSC` regenerates hop-by-hop on every fiber span using its own laser, cutting span 1 kills $\lambda_{\mathrm{OSC},1}$ and lets the downstream node inject `FDI` (`DI`) onto **intact span 2's `OSC`** — whereas the **`OCh` and its `Pilot Tone` go completely dead downstream of the cut**. Conversely, `OSC` cannot catch a failing client transponder laser or monitor client $\lambda$ power (`L12` line 87).

### Solved Part-II Practice Checkpoints (`Theory 24-25` Wooclap + `2023` Moodle)
- **Wooclap `Q1` (8-Step Optical Circuit Setup Order):** Client requests circuit $\to$ network computes path $\to$ network checks free sub-channel per link $\to$ switching rules installed in nodes $\to$ clients notified circuit is up $\to$ communication $\to$ monitoring $\to$ teardown (`Theory 24-25` p. 110).
- **Wooclap `Q2` & `Q3` (1st vs. 2nd Gen + Devices):** Optics used only for P2P links + electronic switching = **1st gen** (`point-to-point` topology); optical switching/routing + full fiber BW + mesh topology = **2nd gen**. Cost-effective passthrough = **`OADM`**; large-scale optical switching = **`OXC`**; optical link termination = **`OLT`** (`Theory 24-25` pp. 110–111).
- **Wooclap `Q5` & `Q7` (OTN Matching & Trace Overhead):** End-to-end client logical connection = **`ODU`**; optical amplifier visibility = **`OTS`**; between multiplexers = **`OMS`**; single $\lambda$ optical access = **`OCh`**; subnetwork electrical endpoints = **`OTU`**. Trace overhead: fiber link = **`OSC`**; optical channel = **`Pilot Tone`**; lightpath = **`Rate-Preserving Channel`** (`Theory 24-25` pp. 111–112).
- **Wooclap `Q6` & `2023` Moodle (`Failure in Optical Subnet 1`):** Client/remote Subnetwork 2 receives **only `ODU-FDI`** (`OTU-FDI`, `OCh-FDI`, `OMS-FDI`, `OTS-FDI` stop at/before the `O/E/O` boundary).

---

# Part III — Multiprotocol Label Switching (MPLS) `[NI03 Slides 1–14 Verified L12 | Slides 15–44 Pending L13+]`

> **Provenance Split:**
> - **§3.1–§3.2 (`NI03` Title + Slides 1–14 through 32-bit Shim Header):** **Verified against 2026/27 Lecture 12** (`network lesson 12 transcripted.md` lines 91–257, `NI_L5-2026-11-23.pdf` pp. 2–5, `NET LEZIONE 12.md`) plus `NI_Notebook.pdf` Ch. 3.
> - **§3.2 (`Terminology / Dual-Table / PATH-RESV / Stacking`, Slides 15–25) & §3.3 (`L3VPN / TE / FRR`, Slides 26–44):** Sourced from official 2026/27 `NI03` + `NI_Notebook.pdf` Ch. 3 (`pp. 61–82`) + 2023/24–25 quizzes; classroom emphasis & omitted slides remain pending Lecture 13+.

## 3.1 Why ISPs Sit Above WDM & Why Plain IP Needs "Layer 2.5" (`[Verified — L12]`)

### 1. Why Not Wire Access Networks Directly to Optical Lightpaths? (`L12` lines 97–111, `NI_L5` p. 2)

Polverini opened MPLS by asking why carriers deploy an electrical **IP backbone** atop optical lightpaths (`NI03` over `NI02`) instead of connecting access networks directly to WDM channels:
1. **Scalability (`DWDM 96-λ` limit):** Dense WDM (`DWDM`) provides at most **`96` wavelengths per fiber**, whereas an operator serves **far more than `96` access networks**. Moving to the electrical domain lets an ISP statistically multiplex many access feeds at edge PoPs into a small number of massive **PoP-to-PoP aggregated traffic demands** large enough to exploit full optical channel bandwidth (`NI_L5` p. 2 bottom).
2. **Rich electrical services:** Beyond raw end-to-end connectivity, enterprise/access clients require SLA guarantees (`QoS`, `VPNs`, `Traffic Engineering`, `<50 ms` recovery) plus cost-effective **convergence of voice and data services** (`NI03` Slide 2) — intelligence requiring electrical packet headers, buffers, and CPUs.

### 2. Four Structural Limits of Conventional IP (`L12` lines 113–164, `NI_L5` pp. 3–4, `NI03` Slides 3–4)

Conventional IP forwarding follows **four interconnected characteristics**:
- **Connectionless & Statistical Multiplexing (Walk-In Restaurant Analogy):** Booking a restaurant table guarantees immediate service if available (or **blocking** if full = static optical mux). IP works like **walking in unannounced**: if free, packets transmit immediately; otherwise they wait in **router buffers**, maximizing resource reuse **at the cost of stochastic queuing delay $\bar{d}_q$ and packet drop when buffers overflow**. As link load ratio $\rho = \text{demand}/\text{capacity} \to 1$ (`NI_L5` p. 3 curve), $\bar{d}_q \to \infty$ rapidly (**congestion**).
- **Best Effort:** Offers zero SLA guarantees on minimum bandwidth or maximum delay (e.g., `2–3 s` delay ruins real-time voice calls).
- **Shortest Path + Destination-Based (`LPM`) $\implies$ `Reverse Path Tree` (`NI03` Slides 3–4, `NI_L5` pp. 3–4):** Router forwarding tables (`DST -> Next Hop`) match **paths (destination prefixes)** rather than flows (`"Entries in routing tables are NOT associated to flows, but to paths"`). The union of all least-cost paths toward destination `B`/`H3` forms a **Reverse Path Tree**. Whenever two converging demands (`Blue H1→H3` and `Red H2→H3`) meet at an intermediate node before `R3`, they **cannot split downstream** for two reasons: (1) **subpath optimality** (if `Rome→Milan` visits `Bologna`, then `Bologna→Milan` is itself shortest), and (2) both flows match the exact **same lookup key (`DST = H3`)** (`NI_L5` p. 4). Changing an OSPF weight shifts *every* destination crossing that link globally rather than moving one demand (`NI03` Slides 37–38).

### 3. MPLS Idea, Same-Host Dual-App Tunneling & Stack Evolution (`L12` lines 171–225, `NI_L5` pp. 4–5)

```text
  NI_L5 p. 5 TOP — WHY TWO APPS BETWEEN THE SAME HOSTS (H1, H2) NEED FLOW-BASED TUNNELS:
     Red App  (Needs High Bandwidth) --> [H1] ===(Red Tunnel: longer high-capacity path)====> [H2]
     Blue App (Needs Low Latency)   --> [H1] ===(Blue Tunnel: shorter low-capacity path)====> [H2]
     (Plain IP sees identical SRC_IP=H1, DST_IP=H2 and merges both! Switching table: (In Iface, In ID)->(Out Iface, Out ID))
```

MPLS does **not** exist because IP header lookup was too slow (`NI_Notebook` p. 82). Instead, it adds **connection-oriented packet tunnels (LSPs)** between Layer 2 and Layer 3 (**"Layer 2.5"** — informal, not a formal OSI layer) while keeping traffic packetized (**retaining statistical multiplexing**, like reserving the restaurant table ahead of arrival via signaling). Because **tunneling means header encapsulation** (`L12` line 219), classifying traffic once at ingress maps flows into switching tables `(In Iface, In ID) -> (Out Iface, Out ID)` (**entries associated with flows**, `NI03` Slide 7, `NI_L5` p. 4 bottom). As `NI_L5` p. 5 and `NI03` Slide 8 (`red 26->17` vs. `green 27->34`) prove, two demands between the **same** ingress/egress pair (even two apps on the *same* hosts `H1, H2`) take disjoint paths (**path differentiation**).
- **Packet Transport Evolution (`NI03` Slides 5 & 9; `L12` lines 177–179, 223–225, 249–254):** Legacy networks ran **Packet over SONET (`POS`: `IP / PPP / SONET-SDH / 1st-gen optical TDM`)**. Today's carrier transport stack runs **MPLS over Ethernet** (`IP / MPLS / Ethernet / WDM Optical Layer 0–1`), leveraging cheap Ethernet switching while keeping MPLS's VPN, TE, and fast protection guarantees (**`Multiprotocol`** means any L2 — legacy `PPP/SONET`, `Frame Relay`, `ATM`, `Ethernet` — and any L3, `IPv4` or `IPv6`). Emerging **`SRv6 over Ethernet`** (`Slide 9`) replaces MPLS headers with IPv6 extension routing (**context only here; studied in second-semester *Programmable Networks***, `L12` line 225).

## 3.2 MPLS Architecture, Control/Forwarding Components & Shim Header (`NI03` Slides 11–14 — Verified `L12`)

### IP/MPLS Router Coexistence (`NI03` Slides 12–13, `L12` lines 227–238)

An **IP/MPLS router** extends a standard IP router in one integrated node (`Slides 12–13`):
- **Control Component:** Conventional Layer-3 IP routing (`OSPF`/`IS-IS`) alongside tunnel reservation/label distribution (`RSVP` / `LDP` — Polverini emphasizes **`RSVP`** *Reservation Protocol* in `Slide 12` & `L12` line 231 because setting up a tunnel requires signaling request + resource reservation ahead of time).
- **Forwarding Component:** Keeps label-switching capability alongside conventional IP longest-prefix matching, identifying flows by **`(In Iface, In Label)`** (`NI_L5` p. 4) rather than destination IP address (`Slide 13`).

### 32-Bit MPLS Shim Header & Nested-Tunnel Stack (`NI03` Slide 14 — Verified `L12`, `NI_L5` p. 5)

Between Layer 2 (`EtherType 0x8847` for unicast Ethernet; `0x8848` multicast for context) and Layer-3 IP (`IPv4`/`IPv6`) sits a **32-bit (4-byte) MPLS Shim Header**:

```text
  [ Layer-2 Header | Outer MPLS (S=0) | ... | Inner MPLS (S=1) | IP Packet ]

 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                Label (20 bits)                | TC  |S|  TTL  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
                                                  3b   1b  8 bits
```

*(Diagram convention: text notation here writes headers outer-to-inner left-to-right as `[Outer (S=0) | Inner (S=1) | IP]`, whereas `NI03` packet arrows draw packets nose-right with the outer/leading header on the right edge.)*
- **Label (`20` bits):** purely a numeric locally significant forwarding ID (`L12` line 239).
- **TC (`3` bits, formerly `EXP`):** Traffic Class / QoS marking — **explicitly excluded in 2026/27 (`L12` line 241: *"TC okay we don't use it I mean in this course"*)**.
- **S (`1` bit — Bottom of Stack):** Just as one concentric pipe fits inside an outer pipe (`NI_L5` p. 5 bottom **`NESTED TUNNELS`** cylinder sketch), carrying an inner tunnel inside an outer tunnel stacks multiple MPLS shims. Every outer MPLS header carries **`S = 0`**, while **`S = 1` marks the innermost MPLS label**, signaling that the next header underneath is **IP** (`L12` lines 243–245).
- **TTL (`8` bits):** copied/decremented at every MPLS hop for loop prevention because core LSRs never inspect the inner IP header's TTL (`Slide 14` field kept from `NI_Notebook`; not separately walked through at end of `L12`).

---

> **`[Remaining Part III below — NI03 Slides 15–44 & NI_Notebook §§3.2.1–3.6 — Pending Live Lecture 13+ / Transcript]`**

### Terminology, `FEC`, Dual-Table Lookup & Label Locality (`NI03` Slides 15–21)

An integrated IP/MPLS forwarding component keeps the **Traditional IP Routing Table** (`FIB`: `Destination -> Next Hop`) **alongside** the **MPLS Forwarding Table** (`LFIB`: `(In Port, In Label) -> (Action, Out Port, Out Label)` — `Slides 18–19`), where **`(In Port, In Label)` together form the lookup key**:

```text
  NI03 SLIDE 19 — DUAL-TABLE PACKET TRACE INSIDE AN IP/MPLS LSR:
   Incoming Pkt 1 (p0, 0026): Match (p0, 0026) -> Action: POP, Out: IP
      ==> strips label, hands bare IP (DST 161.80.5.4) UP to Traditional IP Routing Table
      ==> matches 161.80.5.0 -> Next Hop B ==> exits as plain IP packet to Router B!

   Incoming Pkt 2 (p1, 0045): Match (p1, 0045) -> Action: SWAP, Out Port: p3, Out Label: 0078
      ==> stays BELOW dashed boundary (never touches IP routing table)
      ==> exits Out Port p3 carrying label 0078 toward Router C!
```

- **Forwarding Equivalence Class (`FEC` — `Slide 15`):** formally *"a set of packets that are forwarded in the same way and receive the same treatment."* A FEC can be defined by destination IP prefix (`160.80.1.0/24`), 5-tuple, QoS/application class, or ingress VPN port. **Classification happens ONLY at the Ingress LER** (`Slides 20–21` contrast: best-effort IP travels `A–B–E–F` consulting routing tables at every router, whereas MPLS classifies `160.80.1.0/24` once at Ingress `A -> B – PUSH 12`, core LSRs only swap `12->35->06->67` via `A–B–C–D–F`, and Egress `F` pops `67 -> IP`).
- **LER vs. LSR (`Slides 15–16`):** Ingress **LER** classifies and **`PUSH`es**; core **LSRs** **`SWAP`** labels (or execute **`POP` $\to$ `IP`** under **`PHP`**); Egress **LER** **`POP`s** (if not already popped by PHP) and forwards IP.
- **Local Label Uniqueness Rule (`Theory 24-25` pp. 79, 112–113 Wooclap Q8):** Labels have **strictly local per-link significance**. One router *can* assign the same numerical label value on two **different** ports/links, **but two distinct LSPs sharing the same physical link MUST carry distinct label values** (or the downstream router cannot distinguish them).

### Control Plane: `LDP` vs. `RSVP-TE` & Soft-State `PATH / RESV` Walkthrough (`NI03` Slides 12, 15, 22–24, `NI_Notebook` §3.2.2)

Distinguish the two protocols named across `NI03`:
- **`LDP` (`Slide 15` & `Notebook` §3.2.2 terminology):** automatically binds and distributes labels along **existing hop-by-hop IGP shortest paths** (simple setup, **cannot** enforce explicit routes or bandwidth/TE constraints).
- **`RSVP-TE` (`Slide 12`, `Slide 22`, `Notebook` §3.8 RFC 3209):** explicit signaling (`PATH`/`RESV`/`ResvTear`) capable of setting up **hop-by-hop OR explicitly routed/TE tunnels** (**strict** = every intermediate hop fixed; **loose** = mandatory waypoints fixed, IP routing picks hops between them).

```text
  NI03 SLIDE 22 — RSVP-TE LSP SIGNALING WITH A NON-RSVP TRANSIT HOP X:
   Sender (V) -------- RSVP (W) -------- Non-RSVP (X) -------- RSVP (Y) -------- Receiver (Z)
     | --- PATH (Dst=Z, Prev=V, RouterAlert=ON) --> |   (X ignores Router Alert & forwards transparently to Y)
     |                    | --- PATH (Dst=Z, Prev=W, RA=ON) -----------> | --- PATH (Dst=Z, Prev=Y, RA=ON) --> |
     |                    |                                              | <-- RESV (Dst=Y, Next=Z, RA=OFF) --- |
     |                    | <-- RESV (Dst=W, Next=Y, RA=OFF; jumps X!) - |   (Downstream Y picks In-Label for W)
     | <-- RESV (Dst=V, Next=W, RA=OFF) --- |
     | ==================== DATA FLOWS ALONG INSTALLED LSP (V -> W -> X -> Y -> Z) ========================= |
     | <-- periodic PATH & RESV "Reservation refresh" keep SOFT STATE alive (auto-expires after crashes) ---> |
     | <-- ResvTear (addressed hop-by-hop to Previous Hop, RouterAlert=OFF) removes LSP state on teardown -- |
```

Why does `PATH` set `Destination = Z` + **`Router Alert ON`** while `RESV`/`ResvTear` address **`Previous Hop`** with **`Router Alert OFF`**?
1. Forward `PATH` doesn't yet know which nodes support RSVP, so setting `Dst = Z` lets any non-RSVP router `X` forward it transparently while RSVP routers intercept it via `Router Alert ON` and store **`Previous Hop` flow state** (e.g., `Y` saves `Prev Hop: W`, skipping `X`).
2. Reverse `RESV` must follow the **exact same path backward** even if forward and reverse IP routing or link weights are **asymmetric** (`Theory 24-25` p. 84): unicasting directly to `Previous Hop` guarantees exact path symmetry without needing `Router Alert`.
3. Every node maintains **`PATH`/`RESV` as soft state**: unless periodically refreshed (`Reservation refresh`), stale LSP state self-deletes after node crashes or link cuts.

### Two-Flow Label Stacking (`NI03` Slide 25) & `PHP` Mechanics (`Slides 43–44`)

`NI03` Slide 25 traces **two separate customer LSPs (`Blue 25` and `Green 35`)** multiplexed inside **one shared `Trunk LSP` (`42 -> 3`)**:

```text
  NI03 SLIDE 25 — TWO FLOWS NESTED INSIDE ONE TRUNK LSP (Standard [Outer | Inner | IP] notation):
   Blue  [25 | IP] --(port 1)--> LER1: (1,25)->(2, 7, Push 42) => [42 | 7 | IP] \                    / [15 | IP] -> (4,15)->(2,56) => [56 | IP]
                                                                                  Core Trunk LSR      |
   Green [35 | IP] --(port 3)--> LER1: (3,35)->(2, 1, Push 42) => [42 | 1 | IP] /  (5,42)->(6, 3) => Trunk Egress: (2,3)->Pop[3] then 7->15 / 1->28
                                                                                  (ONLY ONE ENTRY!)   \ [28 | IP] -> (4,28)->(5,17) => [17 | IP]
```

Inside the trunk (`Core Trunk LSR`), routers inspect **only the top label (`S = 0`: `42 -> 3`)**, carrying both flows in **1** forwarding-table entry instead of $N$! At trunk egress `(2, 3) -> Pop [3]`, popping `3` exposes inner label `7` (`S = 1`, swapped to `15`) or `1` (`S = 1`, mapped to `28`), isolating internal trunk scaling from per-customer LSP state.

**Penultimate Hop Popping (`PHP` — `NI03` Slides 43–44):** Normally the Egress LER would have to perform **two lookups** per arriving packet (first pop the outer MPLS label, then look up the exposed IP header or inner label). With **`PHP`** enabled, the **second-to-last LSR** pops the outer label one hop early so the egress node receives the underlying packet (or inner VPN label) directly in **one lookup**:
- *Edge case 1 (`Slide 43` Double-PHP):* In FRR link protection, the penultimate hop of the **Protection Tunnel** pops tunnel label `45` (so the Merge Point sees `[29 | IP]` directly), AND if that Merge Point is itself the penultimate hop of the **Primary LSP**, it **also pops `29`**, sending bare unlabeled `[IP]` to the Egress LER!
- *Edge case 2 (`L3VPN`):* In MPLS L3VPN, `PHP` removes **only the outer PE-to-PE transport label**, keeping the **inner VPN label `L1`** intact for `PE-2` (because popping `L1` early would lose which `VRF` owns overlapping `10.0.0.0/24`!). `PHP` is also bypassed if egress QoS needs the outer `TC` bits.

## 3.3 MPLS Services (`NI03` Slides 26–44, `NI_Notebook` §§3.4–3.6)

### 1. MPLS Layer-3 Virtual Private Networks ("Checkmate in Three Moves")

**Problem (`NI03` Slides 28–29):** Private leased lines are prohibitively expensive (`Theory 24-25` pp. 86–87), and plain IP sharing cannot isolate overlapping private addresses (`Customer 1 Rome` and `Customer 2 Turin` both use **`10.0.0.0/24`** inside `AS 100`, `80.0.0.0/8`). Customer Edge (`CE`) routers remain **MPLS/VPN-unaware**, core **`P`** routers must hold **zero customer routes**, and Provider Edge (`PE` = border LER) routers enforce logical isolation (**note:** MPLS isolates routing/forwarding over the shared backbone, **NOT cryptographic encryption or integrity** — confidential data still needs TLS/IPsec).

Built in **three moves** (`NI03` Slides 30–35):
- **Move 1 — Any-to-any IP reachability among `PE`s:** Assign every `PE` a `/32` loopback (`LER1: 80.80.80.1/32`, `LER2: 80.80.80.4/32`, `LER3: 80.80.80.5/32` — stays UP even if an interface link fails!) advertised via the provider **`IGP`** (`OSPF`/`IS-IS`: `LER1> show ip route` learns `O 80.80.80.4/32 via 80.1.1.2, Lo0`). *IGP answers: "how does PE1 reach PE2?"*
- **Move 2 — Distribute customer prefixes via `MP-BGP`:** Each `CE` sends its prefixes to its attached `PE` via `eBGP` (or static/IGP). PEs form a full mesh of **`iBGP` / Multi-Protocol BGP (`MP-BGP`)** sessions using a dedicated VPN address family with a customer **`L3VPN identifier`** so overlapping `10.0.0.0/24` routes stay distinct. *MP-BGP answers: "which customer prefixes live behind which PE?" — `P` routers stay blind to customer routes.*
- **Move 3 — Per-VPN `VRF`s & Two-Label Stack (`NI03` Slides 33–35):** Each `PE` keeps **one Global Routing Table** (provider IGP) plus **one separate `VRF` per VPN** (e.g., `PE-1` binds both `Roma` and `Firenze` CEs of `VPN-A` into `VRF-A`, separate from `VRF-B`).

```text
  NI03 SLIDE 33 — MPLS L3VPN END-TO-END PACKET TRACE ([Outer | Inner | IP] notation):
   [CE-1] ==IP==> [PE-1 (VRF-X)] ===[L2 (Outer) | L1 (Inner) | IP]===> [Core P] ===[L3 (Outer) | L1 (Inner) | IP]===> [PE-2] ==IP==> [CE-2]
                     |                                                    |                                           |
     1. In-interface selects VRF-X                         2. P swaps ONLY Outer (L2->L3)             3. PE-2 (or PHP) pops L3,
     2. VRF lookup yields L1 (target port/VRF)                (completely blind to L1 & IP!)              uses L1 -> target VRF-X/CE-2,
     3. Pushes L1 (S=1) then Outer PE-PE L2 (S=0)                                                         pops L1, emits bare IP to CE-2!
```

*Slide 33–35 subtleties:* (1) The PE–PE LSP (`L2 -> L3`) may be either **hop-by-hop** or **explicitly routed**; (2) when one egress `PE` connects **multiple CEs of the same VPN** (e.g., two `Torino` sites in `VPN-B` on `PE-2`, `Slide 35`), the PE resolves the exact outgoing CE either via **distinct per-prefix/CE inner labels** or via **`VRF` destination-IP lookup** (`incoming interface/L1 -> VRF-B -> DST_IP lookup -> CE interface`).

### 2. MPLS Traffic Engineering (`TE`) — Bottleneck Example (`NI03` Slides 36–40)

Static demands `R2→R4 = 1 Mbps`, `R1→R3 = 2 Mbps`, `R1→R4 = 2 Mbps`; link capacities `LSR1–LSR2 = 1.5 Mbps`, `LSR1–LSR3 = 4.5 Mbps`, `LSR3–LSR2 = 4.5 Mbps`:
1. **Default OSPF Shortest Path (`Slide 36`):** `R1→R4` (`2`) + `R2→R4` (`1`) both take `LSR1–LSR2` (`3 Mbps > 1.5 Mbps` $\implies$ **congestion!**).
2. **Raise `LSR1–LSR2` OSPF metric (`Slide 37`):** Moves *both* `R1→R4` and `R2→R4` onto `LSR1–LSR3` alongside `R1→R3` (`2+1+2 = 5 Mbps > 4.5 Mbps` $\implies$ **congestion shifts to `LSR1–LSR3`**, leaving `LSR1–LSR2` 100% idle!).
3. **OSPF `ECMP` (`Slide 38`):** Balancing IGP weights so `cost(LSR1–LSR2) = cost(LSR1–LSR3) + cost(LSR3–LSR2)` splits `R4`-bound traffic (`3 Mbps` total) across both equal-cost paths; destination-based ECMP cannot steer just `R1→R4`, leaving `LSR1–LSR2` overloaded (`2 Mbps > 1.5`) or pinned at `100%` (`1.5/1.5`).
4. **MPLS Explicit LSP + IP Coexistence (`Slide 39`):** Place **only** `R1→R4` (`2 Mbps`) onto explicit LSP `<R1, LSR1, LSR3, LSR2, R4>`, while **all other flows remain on default OSPF shortest paths** (`LSR1–LSR3`: `2+2 = 4.0 <= 4.5`, `LSR3–LSR2`: `2 <= 4.5`, `LSR1–LSR2`: `1 <= 1.5` $\implies$ **zero congestion!**). MPLS TE and ordinary IP routing coexist seamlessly.
- **Computation Taxonomy (`Slide 40`):** **`Who`**: external/central controller configuring routers vs. autonomous distributed constraint-based routing (`QoS` constraints). **`How`**: **`on-line`** (computes one greedy LSP at arrival time — fast/incremental, potentially suboptimal globally) vs. **`off-line`** (solves global optimization over all demands — highest utilization, requires full traffic matrix).

### 3. MPLS Fast Recovery, Multilayer Coordination & `FRR/BFD` (`NI03` Slides 41–44, `NI_Notebook` §3.6)

- **Why IP/MPLS needs its own protection (`Slides 41–42`):** Standard OSPF reconvergence takes **seconds to tens of seconds** (`too slow` for SLAs). Optical **OTN protection** reacts in **$<50\ \mathrm{ms}$**: on the left of `Slide 42`, OTN reroutes around a fiber cut invisibly underneath IP/MPLS; on the right, IP/MPLS rides directly over **unprotected fiber** where the optical underlay offers no protection — so IP/MPLS must supply its own sub-50ms recovery using **pre-computed alternative forwarding state** (never sharing the same physical fiber / **Shared Risk Link Group (`SRLG`)** between primary and backup!).
- **`BFD` vs. `OSPF Hello` Complementarity (`NI_Notebook` §3.6 pp. 78, 81):** **`BFD` (`Bidirectional Forwarding Detection`)** runs ultra-lightweight sub-second/ms keepalives strictly for rapid failure detection, triggering immediate local protection **without shortening OSPF Hello timers** (which would trigger global LSA flooding storms on brief flaps). Once `BFD` activates fast local protection, `OSPF` subsequently reconverges globally to shift traffic onto an optimal post-failure route.

| Strategy | Trigger, Label Mechanics (`PHP` Shown on Slides 43–44) & Scaling | Speed vs. Path Optimality |
| :--- | :--- | :--- |
| **Link Protection (`Fast Reroute, FRR`)** | Upstream **Point of Local Repair (`PLR`)** detects link failure locally via `BFD`, **swaps primary label `19 → 29`**, and **`PUSH`es outer Protection Tunnel label `35`** (`[35 \| 29 \| IP]`). Tunnel LSR swaps `35→45`, penultimate tunnel hop **`PHP`s `45`** so Merge Point receives `[29 \| IP]`; Merge Point (penultimate hop of primary LSP on `Slide 43`) **also `PHP`s `29`**, sending bare `[IP]` to Egress! **Scaling:** **one** shared link tunnel bypasses and protects *all* primary LSPs on that link. | **Fastest possible reaction** (purely local repair, zero upstream notification delay), at the cost of a **longer / possibly sub-optimal detour** until OSPF converges. |
| **Path Protection (`Backup LSP`)** | Failure notice must travel upstream to the **Ingress LER**, which switches traffic onto a pre-built link/node-disjoint **Backup LSP** (`44 → 55 → 66 → PHP`, no extra stacked protection label). **Scaling:** requires a dedicated Backup LSP **per primary LSP** (higher control/state overhead). | **Slightly slower** (upstream notification propagation), but establishes an **end-to-end optimal path** over the residual topology. |

### Solved Part-III Practice Checkpoints (`Theory 24-25` Wooclap `Q8–Q10` + `2023` Moodle)
- **Wooclap `Q8` (Label Assignment Trap):** Across two routers merging two flows (`A, B`) into a shared core link (`C, D`), options claiming *"we can assign whatever values"* or forcing specific cross-link equality (`D=A, C=B`) are **false** (`Answer: none of the above`) because assigning "whatever" allows `C = D` on the same link (`Theory 24-25` pp. 112–113).
- **Wooclap `Q9` & `Q10` (`IP` vs `MPLS` & Node Actions):** Outside the MPLS domain / before Ingress classification and after Egress `POP`, forwarding is **`IP`** (`1, 3, 4` = `IP`, `2, 5` = `MPLS`); node roles along an LSP are **Ingress = `PUSH`**, **Core = `SWAP`**, **Egress = `POP`** (`Theory 24-25` pp. 113–114).
- **`2023` Moodle L3VPN Traps:** Overlapping `10.0.0.0/24` allowed; one `VRF` per VPN; `PE` uses inner label to select egress customer interface/VRF; MPLS offers **routing isolation, NOT confidentiality/authentication encryption**.

---

# Part IV — Inter-Domain Routing & BGP `[Provisional — 2024/25 Notes + NI01 Slide 24 / L8 Preview]`

> **Provenance Note:** Both `NI01` Slide 24 (`Coming next` green **Security Focus** box: **`RPKI`, `ROAs`, `Origin validation`, `BGP security`**) and Lecture 8 (`08:30`, `1:16:00`: *OSPF review $\to$ AS $\to$ BGP $\to$ security threats, countermeasures, best practices & PKI*, paired with the Dec 14 NAMEX IXP seminar) confirm the final Module 2 scope. Because 2026/27 slides, `NI_Notebook` Ch. 4, and transcripts are not yet released, the technical details below rely provisionally on `Network Infrastructures Theory 24-25 2.5.pdf` (pp. 98–110).

## 4.1 Intra-Domain (Link-State / OSPF) vs. Inter-Domain (Distance/Path-Vector / BGP)

- **Intra-domain (`IGP`, e.g., `OSPF` — Global Link-State):** Inside one administrative domain, routers flood **Link-State Advertisements (`LSAs`)** to share an identical **Topology Database** and run Dijkstra under two strict invariants: **(1) consistent topology view** and **(2) unified routing objective** (preventing loops).
- **Inter-domain (`EGP`, `BGP` — Distance / Path-Vector):** In Distance/Path-Vector routing, routers hold *no* global map; they exchange reachability vectors with peers so each domain applies independent commercial policies. The Internet consists of **Autonomous Systems (`AS`)** — networks under one organization's unified policy identified by unique **AS Numbers (`ASN`)** (originally 16-bit with `64512–65535` private; extended to 32-bit in 2007). Competing ASes refuse to leak internal topologies (privacy/scale) and pursue conflicting commercial goals (breaking OSPF's unified objective), so `OSPF` cannot run globally. Border routers speak both **`EGP` (`BGP`)** externally and **`IGP` (`OSPF`)** internally so internal routers learn which exit border router leads to each external prefix.

## 4.2 BGP Session Mechanics, `AS_PATH` & Traffic Control Asymmetry

- **Session & Phases:** Point-to-point BGP peering runs over **TCP port `179`**: (1) establish TCP + BGP session $\to$ (2) exchange **all active routes** $\to$ (3) exchange **incremental `UPDATE`s** while connected (`Theory 24-25` p. 103).
- **Four Message Types:** `OPEN` (initiate peering), `KEEPALIVE` (periodic liveness), `NOTIFICATION` (error/shutdown), `UPDATE` (prefix announcements with path attributes like `AS_PATH`, or route withdrawals).
- **Stub vs. Transit AS:** A **stub AS** (leaf network carrying only its own/customer traffic) announces local prefixes upstream and typically installs a **default route** toward a **transit AS** (ISP).
- **Path Selection, Loop Detection & Asymmetry:** Each `UPDATE` records traversed ASNs in **`AS_PATH`** (dropping any update containing its own ASN prevents AS-level loops). Shortest `AS_PATH` hop count is the default preference — explaining why **CDNs** establish **direct peering** shortcuts with major access ISPs — **but**:
  1. Fewer AS hops $\neq$ lower latency, because each AS hides internal hop count and topology (`Theory 24-25` p. 106).
  2. **Commercial policies** override hop count, and inter-domain routing between two ASes is commonly **asymmetric** (`MSU ↔ JANET ↔ CUHK`, `Theory 24-25` p. 108).
- **Outbound vs. Inbound Control Asymmetry (`Theory 24-25` p. 109):** An AS exercises **strong direct control over outbound traffic** by modifying **`Local Preference`** on received routes (`Local Pref = 100` on primary vs. `50` on backup), whereas it can only **indirectly nudge inbound traffic** via **`AS_PATH Prepending`** on outbound announcements (repeating its own ASN multiple times on backup links — still overridable if remote ASes set higher `Local Preference`).

## 4.3 Peering Wars, Export Policies, Route Leaks & `RPKI` Security Outlook (`NI01` Slide 24)

- **Peering Wars (`Theory 24-25` p. 107):** Operators balance free **peering** (cuts transit bills, improves latency, mandatory among Tier-1 peers) against withholding peering (preserving paid transit customers over rivals, under confidential agreements).
- **Export Filter Rules & Route Leaks (`Theory 24-25` pp. 107–108):** Commercial relationships enforce strict route-export boundaries:
  - **To a Provider or Peer:** announce **only customer routes + own ISP routes** (never leak provider or peer routes).
  - **To a Customer:** announce **all routes** (own, customer, peer, and provider).
  - **Route Leak Trace (`Theory 24-25` p. 108):** Provider `C` serves both `A` and `B` (who also peer directly), and `A` announces customer prefix `C2` to peer `B`. If `B` misconfigures export filtering and re-advertises `(C2, (A, B))` upward to provider `C`, `C` accepts a cheaper "customer-facing" route via `B`, hijacking traffic (`C → B → A → C2`) instead of `C → A → C2` and violating commercial agreements. Mitigated via strict **prefix and AS-path import/export filters**.
- **Confirmed 2026/27 Security Scope (`NI01` Slide 24 & `L8` `06:56`, `1:16:00`):** Upcoming 2026/27 lectures will detail inter-domain routing attacks (e.g., BGP hijacks), operational countermeasures, best practices, **`RPKI`**, **`ROAs` (Route Origin Authorizations)**, and **Origin Validation** *(plus note `Theory 24-25` p. 101 briefly mentioned `SCION` as a clean-slate resilient routing architecture)*.
