# Network Infrastructures — Module 2 Study Roadmap

**Version:** 1.1 · 24 November 2026  
**Course:** Sapienza MSc Cybersecurity, A.Y. 2026/27 — Prof. Marco Polverini  
**Companion:** `Network_Infrastructures_Module2_Study_Method_Charter.md`  
**Primary working source:** `NET UNICO MODULE 2.md` (Lectures 8–12 verified; later coverage pending)

## 1. Goal and constraints

- Target a solid preparation consistent with an overall exam grade of 26–28/30. Module 2 theory alone cannot determine the overall grade.
- Recover and consolidate everything taught through Lecture 12 by **Sunday 29 November 2026**. Keep new lectures in a separate incoming queue so the catch-up target remains measurable.
- Prepare for the January exam session (14 January 2027 is provisional). Use the 18 December intermediate quiz as a checkpoint on the same preparation path, not a separate curriculum.
- Scope: Module 2 theory only. Module 1, Kathara homework/practical exam and lab-theory preparation are outside this plan.
- The student remembers the main ideas but not all details. Provide complete, concise explanations of every in-scope concept, followed by independent reconstruction in English into **one unified personal theory file**. Diagnose to adjust depth, not to silently omit topics.
- Session length is flexible. Estimates include explanation, student writing and selective checks; they are planning ranges, not deadlines or guarantees.

## 2. Exam calibration

According to the compendium, Section A (Lecture 8 announcements):

| Component | Reported format | Preparation implication |
|---|---|---|
| Intermediate quiz, 18 Dec 2026 | 10 MCQs / 15 min; up to +1 bonus point | Distinctions, traps, short scenario reasoning; roughly 90 seconds per item on average |
| Final Module 2 written theory | One open question, maximum 6 points; one-page limit; about 20 minutes recommended out of 40 minutes shared with Module 1 | Answer every guiding subpoint; concise explanation, causal links and relevant diagram/example |
| January exam | 14 Jan 2027 proposed; confirm official schedule | Retention and full timed practice before the actual date |

The professor explicitly gave a sample open question on first- vs. second-generation optical networks (multiplexing, electronics, fiber type, light source, amplification) and an MCQ on unavailable all-optical functions. Treat these as strong calibration evidence, not predictions of the actual exam. The two student-compiled question PDFs have now been screened. See Section 7 for the deduplicated question index and source reliability. The session plan remains unchanged; the question bank strengthens practice priorities without defining the syllabus.

## 3. Scope map and priorities

Priority refers to depth and practice, not permission to omit in-scope theory: **P1** explain independently and apply; **P2** explain concisely and recognize; **P3** intuition/context only. Explicitly excluded material is not drilled. Priorities reflect current-year teaching and the initial question-bank analysis in Section 7; future topics remain provisional until classroom confirmation.

| Block | Source and status on 24 Nov | Learning scope | Priority |
|---|---|---|---|
| A — Transport foundations | Part I, §1.1–1.4, L8; taught | Access vs. transport, horizontal/vertical client–provider relations, PoP aggregation, statistical multiplexing, congestion, mesh routing, physical/logical views, shared optical underlay, traceroute and propagation | P1 principles; P2 latency/traceroute details |
| B — Optical principles and evolution | §2.1–2.2, §2.4, L9–10; taught | Circuit lifecycle vs. TCP/IP; static multiplexing, TDM clock bottleneck vs. WDM; wavelength/frequency and guard bands; generations, optical/electrical boundary; attenuation, distortion, dispersion; 1R/2R/3R; MMF/SMF, LED/MLM/SLM, four-stage evolution | P1 causal chain and generations; P2 frequency/grid facts |
| C — Optical architecture | §2.2–2.3 and all-optical subnets §2.4, L9–10; taught | Lightpath, continuity vs. capacity blocking, spatial reuse, RWA; metro ring/core mesh; OLT and transponders; OADM architecture (a), ROADM, OXC, transparency, grooming/muxponder, transponder economics, O/E/O boundaries and recursive layering | P1 mechanisms and topology reasoning; P3 device internals |
| D — Optical management | §2.5, L11–12; taught including Slide 41 recap | Planes, NMS/EMS, encapsulation and visibility; OPU grooming, ODU/OTU/OCh/OMS/OTS and OCC; performance vs. fault management, BER vs. optical power, trace; 129-alarm example, FDI/BDI; OSC vs. Pilot Tone vs. rate-preserving OTN | P1 layer scope, alarm propagation and overhead; P2 management implementation |
| E — MPLS foundations | §3.1–3.2 through Shim Header, NI03 slides 1–14, L12; taught | ISP above WDM, IP limits (connectionless, best effort, shortest path, destination-based forwarding) and statistical multiplexing; Reverse Path Tree and subpath optimality; flow differentiation, tunnels, integrated IP/MPLS router, stack evolution, shim fields and S bit | P1 motivation and forwarding model; P2 header facts/stack evolution; TC encoding excluded |
| F — MPLS forwarding/signaling | NI03 slides 15–25 and PHP slides 43–44; official material, classroom emphasis pending | FEC, LER/LSR/LSP, FIB/LFIB, label locality, PUSH/SWAP/POP, LDP vs. RSVP-TE, PATH/RESV, soft state, stacking, PHP | Anticipated P1; confirm after lectures |
| G — MPLS services | NI03 slides 26–44; official material, classroom emphasis pending | L3VPN (CE/PE/P, VRF, IGP and MP-BGP, two-label trace, overlapping prefixes and isolation vs. encryption), TE vs. OSPF/ECMP, fast recovery, BFD, FRR/path protection, multilayer protection | Anticipated P1; confirm after lectures |
| H — BGP and security | Part IV; topic preview confirmed, technical coverage provisional from 2024/25 | AS, IGP vs. BGP, path vectors and policies, sessions/updates, transit/peering, inbound/outbound control, export rules, leaks/hijacks, RPKI, ROAs and origin validation | Provisional; do not assume all historical details are examinable |

Dependencies: A → B → C → D; A/B → E → F → G; A/E → H (G introduces MP-BGP but does not replace H). The recurring idea is client–provider abstraction across layers, resource sharing, visibility and controllable forwarding.

**Depth limits (compendium Section B):** no quantitative link-budget equations; OADM architecture (a) only; intuition for optical filters, MEMS and dispersion-engineered fiber; NMS schema/standard names not drilled; OPU adaptation/grooming included, exact OTN bytes and FEC codes excluded; MPLS TC encoding excluded, TTL brief unless later emphasized; SRv6 context only; detailed LDP/RSVP-TE binary formats not drilled. Revisit scope if the lecturer changes it. Distinguish the two meanings of FEC (Forward Error Correction vs. Forwarding Equivalence Class).

## 4. Session plan

### Catch-up: 24–29 November (6–8 active hours)

Suggested windows are movable around other courses. If a block cannot be completed with independent notes and checks, record the unfinished work rather than marking it done. Keep a short break between dense blocks.

| Session / suggested window | Scope | Time | Required output / checkpoint |
|---|---|---:|---|
| S1 — 24–25 Nov | A + B | 1.5–2 h | Theory sections on transport and optical principles/evolution; reconstruct the five-pillar generations comparison; explain why WDM avoids the TDM electronic bottleneck and distinguish 1R/2R/3R. |
| S2 — 25–26 Nov | C | 1.5–2 h | Device/domain comparison, lightpath and blocking diagrams, grooming explanation; solve a changed A–B–C wavelength or transponder-count scenario without hints. |
| S3 — 26–28 Nov | D | 2–2.5 h | OTN layer span/visibility sketch, overhead comparison and fault-management notes; trace a fiber cut through OTS/OMS/OCh/OTU/ODU and across O/E/O, explaining why only relevant alarms propagate. |
| S4 — 28–29 Nov | E | 1–1.5 h | IP limitations, MPLS motivation, architecture and shim notes; explain converging shortest paths and two apps with different needs; interpret an MPLS stack. End with mixed recall from A–E. |

A short 10–15 minute delayed recall of the previous session may be included at the start of the next. On 27 November (Friday), theory teaching is expected per L12 announcement; log any new material as incoming, verify the transcript/slides when available, and integrate after the baseline catch-up or earlier only if it fits. If needed, use 29 November as a buffer. Do not compress D or rush independent writing just to meet the date; record a carry-over if the estimated hours prove insufficient.

### Remaining course and exam preparation (6.5–9.5 active hours, excluding later optional retention reviews)

| Session | Timing / trigger | Time | Required output / checkpoint |
|---|---|---:|---|
| S5 — MPLS forwarding and signaling | After the relevant L13+ lectures, ideally in early Dec | 1.5–2 h | F notes; label operations and dual-table trace, PATH/RESV and stack reconstruction; verify label-locality assumptions against lecture examples. Introduce PHP here or in S6 according to actual teaching order. |
| S6 — MPLS services | After relevant slides/lectures | 1.5–2.5 h | G notes; L3VPN packet trace, TE congestion example and FRR vs. path protection, with PHP where relevant. |
| S7 — BGP and inter-domain security | As current-year slides/lectures become available | 2–3 h | H notes; explain policy vs. shortest path, route export and security mechanisms actually taught; scenario-based check. Split into two sessions if current-year coverage expands. |
| S8 — Integration and exam simulation | Preferably 14–17 Dec, then repeat a short timed check in January if needed | 1.5–2 h | Mixed 10-MCQ/15-min simulation, one timed one-page/20-min open answer, marking and targeted error correction. Use actual confirmed syllabus. |

**Total initial estimate: 12.5–17.5 hours**, including writing and initial exam practice, excluding attendance, Module 1, Kathara, additional material not yet released and optional later reviews. This is not a fixed budget; independent reconstruction may take longer. Split/merge sessions based on concentration and evidence, not arbitrary quotas.

### Milestones

- **29 Nov:** A–E complete in the unified notes, all assessed; record residual gaps and the new-lecture queue separately.
- **30 Nov–13 Dec:** study newly taught material promptly (ideally within 2–4 days of availability), update the source map, and use short delayed recalls of A–E. Keep later sections provisional until confirmed.
- **14–17 Dec:** quiz-oriented timed practice using current scope, plus at least one written-answer rehearsal. If BGP is not complete, do not assume its full scope for the quiz; verify lecturer instructions.
- **18 Dec:** intermediate quiz; log results and errors when available. Do not infer mastery from the bonus alone.
- **After quiz through early Jan:** finish remaining confirmed topics, repair gaps, spaced recall and 1–2 additional timed written questions if useful. Suggested short recalls 1–3 days and about 1 week after study, adjusted to actual availability.
- **7–13 Jan (if 14 Jan is confirmed):** final mixed recall and exam simulation; prioritize weak P1 areas, question coverage and concise written answers. If date changes, shift the final week accordingly.

## 5. Concrete worked examples to master

Use the original compendium diagrams or reconstruct equivalent scenarios. Do not merely memorize their numeric answers.

| Source | Example / required reasoning |
|---|---|
| L8 | 1,000 FTTH subscribers: aggregate peak vs. busy-period average; why PoP granularity and shared underlay matter |
| L9 | A–B–C triangle: distinguish wavelength continuity blocking from exhausted capacity; identify when reuse is possible |
| L10 | A–B–C OADM: explain why 16 transponders become 10 in the stated example; solve changed traffic demands; relate cost to grooming |
| L10 | 10110 waveform: distinguish attenuation, distortion, dispersion, regeneration and noise limitations |
| L11–12 | Layer spans and visibility; 129 alarms; FDI/BDI staircase; cross-subnet ODU-FDI; OSC vs. Pilot Tone vs. OTN and OPU adaptation |
| L12 | Reverse Path Tree, same-host two-app tunnel motivation, incoming interface/label concept and S bit |
| Future (pending classroom confirmation) | FIB/LFIB packet trace, RSVP PATH/RESV, two-flow stacking, L3VPN two labels, TE 1.5 Mbps bottleneck, FRR and PHP |

## 6. Readiness and progress tracker

Status is evidence-based. Coverage and readiness are separate: having attended a lecture or written a note is not proof of retention. Use `U` = unassessed; `0` = cannot recall; `1` = recognize; `2` = explain with help; `3` = explain independently; `4` = apply independently to a new scenario; `5` = exam-ready with delayed/timed evidence. Use `N/A` only if a dimension genuinely does not apply. Do not assign an overall numerical grade from these scores.

| Block | Lecture status | Notes status | Theory | Architecture / application | MCQ | Written | Next action |
|---|---|---|---|---|---|---|---|
| A | Taught | To write | U | U | U | U | S1 |
| B | Taught | To write | U | U | U | U | S1 |
| C | Taught | To write | U | U | U | U | S2 |
| D | Taught | To write | U | U | U | U | S3 |
| E | Taught | To write | U | U | U | U | S4 |
| F | Pending lecture confirmation | Not started | U | U | U | U | S5 |
| G | Pending lecture confirmation | Not started | U | U | U | U | S6 |
| H | Provisional | Not started | U | U | U | U | S7 |

**Block completion gate:** all in-scope concepts have been explained at appropriate depth, student-authored notes reviewed, no unresolved critical misconception, core ideas independently explained (at least 3/5 in relevant theory dimension), representative P1 application attempted independently (aim for 4/5). If a check fails, reopen only the affected subtopic; an assessed weak point stays open even if the notes are complete.

**Pre-exam target (internal heuristic, not official grading):** all confirmed P1 blocks at least 3/5 in theory and relevant application, preferably 4/5; aim for at least 8/10 in two independent mixed timed MCQ sets and two one-page timed written answers covering different high-priority themes with no major conceptual mistakes. Use an actual professor rubric if available; otherwise assess guiding-point coverage, correctness, causal explanation, diagram/example when useful, and time/page compliance. Do not equate these thresholds with a guaranteed exam score.

Record each session: date, source version, actual minutes, sections completed, independent evidence, mistakes, next recall and next action. Track errors separately within this roadmap (or append a compact log); do not pollute the unified theory file with all raw study attempts.

## 7. Past open-question PDFs — integration protocol

**Status (24 November):** Both PDFs screened and compared with the current-year compendium. They are student compilations, not authenticated exam papers; dates and independent exam occurrences are not established. A question listed in both PDFs is not evidence of two separate exams.

- **Q-A:** `Raccolta Domande Network Infrastructures_261124_113126.pdf`, 4 pages. Telegram answers are explicitly unverified.
- **Q-B:** `Exam_-_questions-1 (1)_261124_113057.pdf`, 25 pages. The initial question list is on p. 1; the explicitly self-authored practice list begins on pp. 1–2 and is developed on pp. 15–25.

### 7.1 Deduplicated historical-question index

Prompts below are normalized for clarity, not verbatim transcriptions. Current-year classroom scope determines when they are used.

| ID | Normalized prompt | Provenance | Block / session | Status |
|---|---|---|---|---|
| H01 | Discuss the advantages and disadvantages of wavelength conversion in optical networks. | Q-A pp. 3–4; Q-B pp. 1, 11–12 | C / S2 | Taught |
| H02 | Explain signal regeneration in optical networks. | Q-A p. 4 | B / S1 | Taught |
| H03 | Compare connectionless and connection-oriented packet networks with an example. | Q-A p. 4 | B/E / S1/S4 | Taught |
| H04 | Describe the fields of an IP routing table and demonstrate packet forwarding. | Q-A p. 4; Q-B pp. 1, 13–14 | E / S4 | Supporting prerequisite; review LPM, next hop and interface |
| H05 | Explain the role of alarm management in optical fault management with an example. | Q-A p. 4; Q-B pp. 1, 14 | D / S3 | Taught |
| H06 | Describe OTN/optical overhead types and their operation. | Q-A p. 3; Q-B pp. 1, 10–11, 15 | D / S3 | Taught; wrongly grouped under Access in part of both sources |
| H07 | Explain the adaptation function in second-generation optical networks. | Q-B pp. 1, 15 | C/D / S2/S3 | Taught |
| H08 | Explain MPLS packet forwarding with an example. | Q-A p. 4; Q-B pp. 1, 12–13 | F / S5 | Foundations taught; full trace pending |
| H09 | Explain LSP actions and RSVP signaling. | Q-A p. 4 | F / S5 | Pending full classroom coverage |
| H10 | Describe how to implement an MPLS VPN. | Q-A p. 4 | G / S6 | Pending classroom coverage |
| H11 | Explain why MPLS can recover from failures faster than conventional IP. | Q-B pp. 1, 15 | G / S6 | Pending classroom coverage |

**Current-year direct exam cues:** first vs. second generation optical networks (five pillars: multiplexing, electronics, fiber type, light source, amplification; S1) and unavailable functions in all-optical networks (MCQ; S2). Source: compendium Section A, L8.

### 7.2 Student-authored practice prompts (not historical exam evidence)

Q-B pp. 2, 18–25: optical architecture/topology and OLT (S2); three functional planes (S3); optical generations (S1); connectionless vs. connection-oriented MPLS (S4); VPN, TE and protection (S6); BGP characteristics (S7). Use as practice variants, not evidence of past exam frequency. BGP security remains important because it is a current-year announced topic, despite limited historical-question evidence.

### 7.3 Exclusions and source reconciliation

- Exclude Module 1: PON multiple access and rate adaptation, FTTx access, DSL/ADSL/VDSL, DMT/water filling, NEXT/FEXT, CSMA/CA and hidden terminals, Wi-Fi, 4G/5G, channel-capacity calculations. Functional network areas/topologies are shared background; retain only the Module 2 transport perspective. General digital-signal noise questions are ambiguous; retain the optical impairment/regeneration component in S1, not DSL noise theory.
- Historical SRv6/MyLocalSID/Binding SID questions are not current exam drills (SRv6 context only per L12). IPv6 fragmentation, general IPv4/IPv6 comparison and IPsec ESP are not confirmed in the current Module 2 scope; keep out unless new current-year teaching supports them.
- Do not adopt student answers as an answer key. Q-B p. 14 reverses FDI and BDI, contradicting its own embedded slide; FDI is downstream, BDI upstream. Q-B p. 17 confuses modal and chromatic dispersion; SMF eliminates modal dispersion, narrow-spectrum sources and dispersion management mitigate chromatic dispersion. Q-B p. 24 misidentifies the inner VPN label: outer label transports toward egress PE, inner label selects VPN forwarding context there. Q-A pp. 3–4 confuses WDM with wavelength conversion: conversion relaxes wavelength continuity; it does not itself create WDM channels. Resolve against current-year material, not student responses.

### 7.4 Session calibration

| Session | Representative question target |
|---|---|
| S1 | Current-year five-pillar comparison; H02 regeneration |
| S2 | H01 wavelength conversion; H07 adaptation; all-optical limitations MCQ |
| S3 | H05 alarm management; H06 overhead; H07 OPU/OTN adaptation aspect |
| S4 | H03 connection models; H04 IP forwarding; reverse path tree and MPLS motivation |
| S5 | H08 MPLS packet trace; H09 LSP/signaling after teaching |
| S6 | H10 VPN; H11 fast recovery; TE scenario from official material |
| S7 | BGP practice prompt and current-year security coverage once verified |
| S8 | Unseen or varied mixed MCQs and timed open questions across the confirmed syllabus |

Use these as a pool, not a mandatory sequence of extra questions. At block end, select only the most diagnostic prompt(s); reserve variants for later timed recall. Keep the 6–8 hour catch-up and 12.5–17.5 hour overall initial estimates unchanged.

### 7.5 Protocol for further sources

1. Extract every question and its guiding subpoints verbatim when feasible, preserving source filename, page, date/session (if available) and original numbering. Inspect diagrams as necessary; mark uncertain readings.
2. Classify **M2 confirmed**, **M1**, **mixed**, or **ambiguous** by comparing content to current-year taught scope and official slide topics. Do not rely solely on section labels or historical grouping. Preserve mixed/ambiguous items for review; exclude clear M1 from this plan.
3. Map each M2 question to A–H, required skills and relevant source sections. Flag historical content not confirmed this year, possible outdated wording and source conflicts. Do not treat old questions as automatic current syllabus requirements.
4. Cluster duplicates/near-duplicates by concept, retain all provenance, and count distinct sessions only when dates are known. Repeated wording in two PDFs is not necessarily independent exam evidence.
5. Recalibrate P1/P2 priorities and allocate time based on explicit current-year exam cues, observed lecture emphasis, historical questions, dependencies and observed weaknesses. Frequency informs practice, not prediction; retain required topics even if absent from the bank.
6. Build question rubrics (guiding subpoints, required reasoning, optional diagram, likely pitfalls) and reserve unseen or paraphrased variants for timed practice. Keep solutions separate from questions until after an independent attempt.

Question index template: `ID | PDF/page/date | original question + subpoints | M1/M2/mixed/ambiguous | block(s) | current-year status | priority | practice result`.

## 8. Updating this roadmap

After every new lecture, compare the updated compendium and source excerpts with the baseline: newly taught topics, corrections, explicit exclusions, examples, exam announcements and remaining pending content. Update scope/status, adjust priorities and time estimates, and add or revise sections in the unified theory file. Preserve previously verified notes unless a correction is supported. Record the source and reason for material changes. Do not postpone catch-up because new lectures arrive; use the incoming queue and replan if it becomes too large.

**Initial action:** begin S1 with a brief recall of transport and optical foundations, then proceed through a complete, concise explanation and student-authored notes. The past-question PDFs are now integrated. Start S1 using the current-year sample question and H02 as calibration; no further organizational step is required.
