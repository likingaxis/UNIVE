# University Study System — Implementation Plan

Baseline inspected **2026-11-04**. Study workflow revised **2026-11-24 (Europe/Rome)** using the four course documents supplied by the student.

This plan coordinates Distributed Systems, Cryptography and Network Infrastructures in the Sapienza MSc Cybersecurity semester. It defines cross-course priorities, planning rules and how to record evidence. The Cryptography and Network Module 2 charters govern tutoring in their respective scopes. Their roadmaps govern course sequencing, practice and milestones. Use [current study state](STUDY_STATE.md) for the calendar and [course memories](#5-hierarchical-memory-architecture) for recorded progress and source checks.

## 1. Scope and evidence

The global plan, state, three course memories and [workspace instructions](../AGENTS.md) are in use. The original 22 December semester-end target was an internal planning assumption. Use the current course milestones in §6–7 and keep official dates distinct from internal targets. Add further components only within the student's authorization.

Evidence labels used throughout:

- **Verified locally:** a path or inspected content was observed on 2026-11-04; this does not verify authorship, completeness or learning.
- **Verified official:** information retrieved from the identified official page, with date and access scope recorded in §11.
- **User-reported:** baseline supplied by the user; preserve it until clarified, including discrepancies with the file inventory.
- **Provisional:** a planning assumption or proposed method of implementation, not an established commitment.
- **Unknown:** not confirmed; never silently convert this into zero progress or completion.

## 2. Current baseline and discrepancies

This section preserves the 4 November 2026 snapshot. For current source coverage, assessment evidence and progress, use the course memories and the current workflow below.

### Distributed Systems

- **User-reported:** lectures 1–7 are complete as documents. Lecture 1 is primarily user-authored with AI review; lectures 2–7 are predominantly ChatGPT-generated from slides and transcripts. Independent understanding has not been established by their existence.
- **Verified locally:** `DS LESSON 1.md` through `DS LESSON 7.md` exist. Separate files for lectures 8–9 were not found. Files for 10, 12 and 13 exist and inspected openings contain rough notes; no separate lecture 11 file was found.
- **Discrepancy:** the reported rough-note coverage of lectures 10–13 needs mapping to the actual files. Lecture 11 may be merged, differently numbered or missing; do not assume which.
- **User-reported:** attendance has resumed; explanations are generally understandable, but exercises and algorithmic reasoning are a substantial difficulty. No homework has been completed.
- **Verified locally:** `HOMEWORKS` contains `Homeworks 1.md`, `Homeworks 2.md`, `Homeworks x.md` and `homeworks x2.md`. These are not evidence of completed attempts. `Assets` includes slides, images and transcripts for lectures 4, 5 and 7.
- **Verified official snapshot:** the retrieved lecture log lists lectures through 11. This does not invalidate local files 12–13 or prove that later teaching has not occurred; reconcile topic/date mappings on a later source check. See DS-S1.

**Reconciliation follow-up (2026-11-04):** the user reports that the previous discussion identified published material through at least lecture 12. A repeat retrieval of DS-S1 still returned a listing ending at 11; retain both records. The returned snapshot may lag the live page. No official date/topic for 12 or 13 was established by this check.

| Lecture | Official snapshot / user report | Local evidence and mapping |
| --- | --- | --- |
| 8–9 | 19 and 21 Oct 2026: leader election/failure models, then reliable broadcast (DS-S1). | No separate files; recovery is user-reported, not inferred from missing filenames. |
| 10 | 26 Oct 2026: uniform and ordered broadcasts (DS-S1). | `DS LESSON 10.md` discusses quorums and ordered communication; thematic match, not proof of attendance or study. |
| 11 | 28 Oct 2026: causal broadcast and shared registers (DS-S1). | No separate file. Register material in local lesson 12 overlaps the official topic; a numbering mismatch is possible, not established. |
| 12 | Publication reported by user; date/topic not independently verified. | `DS LESSON 12.md` opens with register operations and semantics; no verified lecture date. |
| 13 | Official publication/date not verified. | `DS LESSON 13.md` discusses sequential consistency, linearizability and atomic registers; no verified lecture date. |

Attendance is reported as resumed, without a verified per-lecture attendance ledger. Independent study/understanding remains unverified by these files; homework completion remains user-reported as none. Obtain the relevant official entry or user clarification when needed, without treating numbering gaps as missing knowledge.

### Cryptography

- **User-reported:** no lecture notes had been written; the first ten lectures had been identified, covering perfect secrecy, MACs, hashing, randomness extraction, OWFs, PRGs, hard-core predicates, PRFs, CPA security, GGM, blockciphers and exercises. The dated mapping below was subsequently provided by the user from the professor page; it was not independently retrieved.
- **Verified locally / discrepancy:** `CR LESSON 1.md` already contains a rough draft on introductory cryptography and perfect secrecy, including proof sketches. Preserve and assess it before planning a replacement. Authorship, completeness and understanding are unknown.
- **Verified locally:** `CR INDICE.md` contains the professor page and an older-material repository link. `Assets` exists but was empty in the inspection. No student transcripts were found in this course directory; their expected availability remains user-reported.
- **User-reported:** current lectures are not being attended. Recover essential foundations before returning when attendance becomes educationally useful; do not require all backlog to be finished first.
- **Verified repository inventory (2026-11-04):** the professor's GitHub repository contains `crypto_lecture01_2627.pdf` through `crypto_lecture10_2627.pdf` in `assets/pdf`, alongside older-year materials. File presence was verified through the GitHub connector; PDF contents have not yet been read or imported into Obsidian. This provides an accessible starting point for recovery, not proof of syllabus completeness.
- **Unknown:** current exam rules, calendar and transcript locations. The professor page could not be retrieved with the available web tool; this does not establish that the website is offline. The user can supply calendar, exam format, deadlines and other course announcements when direct verification is unavailable (see §11).

**User-provided lecture inventory (reported 2026-11-04; origin: [professor course page](https://dventuri83.github.io/teaching/1_crypto/), academic year 2026/27):**

| Lecture | Date (2026) | Reported topics |
| --- | --- | --- |
| 1 | 25 Sep | Secret-key encryption, perfect secrecy, equivalent notions, one-time pad. |
| 2 | 30 Sep | Shannon's impossibility result, statistically secure one-time MACs. |
| 3 | 2 Oct | Pairwise independent hash functions, one-time MACs, randomness extraction, seeded extractors. |
| 4 | 6 Oct | Leftover hash lemma, computational security, one-way functions. |
| 5 | 9 Oct | Pseudorandom generators, polynomial stretch. |
| 6 | 13 Oct | Hard-core predicates, Goldreich-Levin, one-time SKE and CPA security. |
| 7 | 16 Oct | Pseudorandom functions, CPA-secure SKE and constructions from PRFs. |
| 8 | 20 Oct | GGM construction and its security proof. |
| 9 | 23 Oct | DES, AES, Feistel networks, modes of operation and CTR security. |
| 10 | 27 Oct | Exercises. |

This is the known inventory, not a claim that teaching ends at lecture 10. The existing lecture-1 draft remains a separate local artifact, with learning status unchanged.

### Network Infrastructures

- **User-reported:** notes cover lectures 1–2 and 4–8; lecture 3 needs investigation. Several laboratories have been completed, and the latest needs recovery. Attendance continues and material is generally understood.
- **Verified locally / discrepancy:** separate note files exist for 1, 2, 4, 6, 7 and 8. Neither lecture 3 nor lecture 5 has a separate file in the inspected directory. Investigate whether content is merged or absent before declaring a learning gap.
- **Verified locally:** the existing directory is `NETWORK`, with `Assets` and **`LABORATORY`**, not `laboratori`. Laboratory files 1–3 exist; their existence does not establish which labs are completed or which assignment is latest.
- **Verified locally:** `Network Infrastructures Theory 24-25 2.5.pdf` exists. Its filename suggests older material; its contents, provenance and applicability to 2026/27 have not been verified. `Assets` currently contains images, not an identified slide collection.
- Prioritize practical work and real deadlines during the semester. Reorganize theory progressively and perform fuller consolidation near the exam.

## 3. Agreed study methodology

The general lecture workflow applies when the course has no more specific method. For Cryptography and Network Module 2, start with the current method below.

### A. Attended lectures

Attend and record when recording is available and permitted. Write a rough Obsidian draft with key concepts, the professor's reasoning, examples, doubts and source references. Do not try to produce final polished notes during class. Review unclear points selectively, ideally in the next available study block. Attendance and a readable draft do not establish understanding.

### B. Missed lectures

1. Locate official slides and any available transcripts; distinguish professor material from student transcription.
2. Divide the lesson into coherent conceptual blocks and study interactively with ChatGPT.
3. Explain the content without copying before writing notes.
4. The user writes the first Markdown explanation using their own reasoning.
5. ChatGPT checks conceptual accuracy, completeness, clarity and English; the user resolves issues and approves the result.
6. Attempt exercises independently before requesting progressively stronger hints. Record the help used and retry later without it.

The student writes the first substantive explanation whenever practical. Short recall sessions and independent exercises should progressively reduce dependence on AI; optimize independent learning rather than AI-generated output. Avoid generating polished notes as a substitute for learning. Existing AI-generated notes are reference material to diagnose and consolidate, not a reason to rewrite everything or mark topics mastered.

### C. Course-specific exam preparation

- **Cryptography.** Follow the [method charter](../CRYPTOGRAPHY/Assets/Cryptography_Study_Method_Charter.md) and [exam roadmap](../CRYPTOGRAPHY/Assets/Cryptography_Exam_Roadmap_Nov2026_Jan2027.md). Start with a brief prerequisite check, then work through intuition, precise security definitions, proof strategy and student attempts. Pair theory and proof work with original professor questions each week. Use English for technical work and Italian for organization. Use progressive hints after an attempt and record Theory, Proof and Exam readiness separately. Use the L1–L13 compendium and later verified material as references. The student writes selected definitions, explanations and proof skeletons in [CR UNICO](<../CRYPTOGRAPHY/CR UNICO.md>) and keeps a short error log for practice.
- **Network Module 2 theory.** Follow the [method charter](../NETWORK/Assets/Network_Infrastructures_Module2_Study_Method_Charter.md) and [roadmap](../NETWORK/Assets/Network_Infrastructures_Module2_Study_Roadmap.md). Explain confirmed scope at the depth used in class, then have the student reconstruct each block in English in [NET UNICO](<../NETWORK/NET UNICO.md>). Review that draft and use a few diagnostic checks. Integrate both MCQs and one-page written answers. Keep the AI-assisted compendium available as a source. Module 1, Kathara and lab theory use their separate course records.
- **Distributed Systems.** Continue the existing approach in the [course memory](MEMORIES/DISTRIBUTED_SYSTEMS.md). Combine lecture recovery, algorithm traces, correctness reasoning and independent homework. Develop personal synthesis as useful alongside deliberate practice.

The student drafts each personal UNICO section in their own words. On request, Codex reviews that section for prose, Markdown/LaTeX formatting and useful figures while preserving the student's reasoning. For Network, check diagrams against the corresponding in-class sketch or slide and cite it when redrawing or improving an SVG.

## 4. Responsibilities

| Tool or participant | Responsibility |
| --- | --- |
| User | Independent reasoning, first explanations, exercise attempts, confirmation of work and approval of substantive note changes. |
| Interactive tutor | ChatGPT is the usual tutor. Any assistant tutoring follows the relevant charter or course memory and uses guided explanations, student reasoning and independent exam practice as appropriate. |
| Codex | Workspace, sources, evidence, workload estimates and cross-course planning. When tutoring on request, follow the same course instructions and preserve the student's authorship. |
| Gemini | Optional editorial review of material already understood and verified; never a mandatory pipeline stage. |
| Obsidian | Persistent source of truth for approved notes, plans and recorded progress. Conversations alone do not silently become confirmed records. |

## 5. Hierarchical memory architecture

Management paths below are relative to the workspace root `ANNO1 M`. The implemented plan/state and course memories now live under `_STUD2`; teaching materials remain in their original course directories. `AGENTS.md` remains at the root.

| File | Owns | Must not become |
| --- | --- | --- |
| `AGENTS.md` | Persistent responsibilities, reading order, learning safeguards, editing and memory-update rules. | A changing task list or lecture archive. |
| `_STUD2/STUDY_PLAN.md` | Semester objectives, methodology, recovery roadmap, scheduling principles, milestones and source-registry entry points. | A duplicate detailed course progress table. |
| `_STUD2/STUDY_STATE.md` | Concise cross-course status, current priorities, confirmed upcoming deadlines, capacity/conflicts and links to course memories. | A record of every lecture or exercise. |
| `_STUD2/MEMORIES/DISTRIBUTED_SYSTEMS.md` | Distributed Systems evidence, materials, learning gaps and next actions. | A copy of lecture explanations. |
| `_STUD2/MEMORIES/CRYPTOGRAPHY.md` | Cryptography evidence, materials, learning gaps and next actions. | A transcript of tutoring sessions. |
| `_STUD2/MEMORIES/NETWORK.md` | Network theory, practical work, evidence, gaps and next actions. | A duplicate global schedule. |

Each course memory should contain concise sections for:

1. Course identity, academic year, instructor when verified, official source IDs and applicable source versions.
2. Exam format, source authority and required competencies, with open rules and provisional dates identified.
3. Course-specific methodology and prerequisites.
4. Available lectures, slides, transcripts and assignments, with source/local links and publication/import status.
5. Note coverage and authorship: user-authored, AI-generated, mixed or unknown.
6. Self-reported understanding and independently demonstrated understanding in separate fields, with evidence/date and assistance used.
7. Exercises, homework and laboratory status, attempts, remaining work and submission status where relevant.
8. Difficulties, misconceptions and prerequisite gaps.
9. Brief relevant revision history, assessment outcomes and next review dates.
10. Current priorities, next concrete actions and blockers.
11. Last memory update, last successful source verification **per source**, and failed-check dates separately.

Use a compact topic record: `topic/source ID | published | imported | notes/authorship | understood | verified/evidence | exercises/labs | gap | next review/action`. Allow `unknown`, `partial` and `not applicable`; do not compress these dimensions into a single percentage.

At session start, [AGENTS.md](../AGENTS.md) routes workspace agents through this plan, global state, the relevant course memory and any applicable charter and roadmap. Cross-course planning reads all three memories. For a tutor without vault access, use [the portable tutor context](CHATGPT_CONTEXT.md) with the relevant files and latest handoff. Report missing context briefly and use the reliable evidence available.

After meaningful work, update only confirmed progress and unresolved issues in the relevant course memory, with a dated evidence link or explicit user confirmation. Summarize only scheduling impacts in global state. These Markdown records provide continuity across Codex conversations without relying exclusively on native model memory. The global agent coordinates capacity and priorities; each course memory preserves the subject's distinct learning requirements. Keep brief decision history; never store complete conversations or duplicate explanations.

## 6. Course priorities and exam requirements

| Course | Learning priorities | Exam evidence and limits |
| --- | --- | --- |
| Distributed Systems | System models, assumptions, algorithm execution, correctness, fault tolerance; increasingly prioritize professor homework and algorithm design. | Official home page confirms algorithm design and correctness as objectives (DS-S2). Official lecture log says homework is ungraded; one-star difficulty can be exam-relevant, harder starred tasks are optional enrichment (DS-S1). Exam components, duration, dates and booking rules remain unknown. |
| Cryptography | Fresh start guided by prerequisite evidence. Prepare definitions, proofs, reductions and original exercises together. | The 18 November charter and roadmap report a three-hour written exam with three exercises and three open questions, without books, notes or devices. The 11–13 January 2027 window is a planning assumption. See the [exam evidence](MEMORIES/CRYPTOGRAPHY.md#8-examination-information-and-unresolved-requirements). |
| Network Infrastructures | Module 2 transport theory, English reconstruction and representative applications, MCQs and written answers. Track Module 1 and practical work separately. | L8 announces a 10-MCQ, 15-minute Module 2 quiz on 18 December, up to +1 bonus, and a final open question worth up to 6 points. The answer occupies one page, with about 20 minutes recommended out of the 40 shared with Module 1. 14 January 2027 is provisional. See the [exam evidence](MEMORIES/NETWORK.md#8-examination-information-and-unresolved-requirements). |

Use the attributed exam formats to calibrate practice. Verify administrative dates and any unresolved rules when needed. The 4 November DS source check established homework guidance and left the detailed exam format open.

## 7. Active recovery and exam roadmaps

| Course | Current planning reference |
| --- | --- |
| Distributed Systems | Use the [course memory](MEMORIES/DISTRIBUTED_SYSTEMS.md) for the next lecture and homework block. Preserve short independent checks and correctness practice while continuing recovery. |
| Cryptography | Follow the [19 November–8 January roadmap](../CRYPTOGRAPHY/Assets/Cryptography_Exam_Roadmap_Nov2026_Jan2027.md), including the Friday decisions to proceed, repair or carry work forward. Protect core prerequisites, authentic exercises and the timed simulation. Update Post-L13 coverage from 2026/27 teaching. |
| Network Module 2 | Follow the [Module 2 roadmap](../NETWORK/Assets/Network_Infrastructures_Module2_Study_Roadmap.md). Aim to recover and document A–E (L8–L12) by 29 November. Queue newly taught topics and integrate them as their scope is confirmed. Use the 18 December quiz as part of the same January preparation. |

Use [STUDY_STATE.md](STUDY_STATE.md) to reconcile these windows with real availability, practical deadlines and the other courses. When a milestone slips, carry forward the specific unfinished work and preserve the evidence already recorded.

## 8. Weekly planning and study hours

### Recurring timetable

**Provenance:** user-reported, corroborated by visual inspection of [ORARIO.png](../ORARIO.png) on 2026-11-04 during global-state initialization. This is not independently confirmed university scheduling. Times are Europe/Rome; cancellations and holiday exceptions require separate confirmation.

| Day | Scheduled active-course lectures |
| --- | --- |
| Monday | Network 10:00–12:00; Distributed Systems 16:00–19:00. |
| Tuesday | Cryptography 08:00–10:00. |
| Wednesday | Distributed Systems 17:00–19:00. |
| Thursday | No active-course lectures. |
| Friday | Network 08:00–11:00; Cryptography 16:00–19:00. |

Statistics is outside the active three-course plan. The image also shows Statistics on Thursday 14:00–20:00; exclusion does not establish free personal time. Scheduled lectures do not imply attendance or understanding. Current attendance decisions, temporary exceptions and capacity consequences belong in [STUDY_STATE.md](STUDY_STATE.md).

### Independent-study capacity

The **5–11 November pilot** used a tentative **14 hours** of independent study (DS 5, Crypto 6, Network 2, buffer 1). The earlier 11–12-hour option also belongs to that experiment. See the pilot record in [STUDY_STATE.md](STUDY_STATE.md).

The current Crypto roadmap uses **3h Tuesday, 4h Thursday, 2h Friday** in ordinary weeks, with **54 essential + 15 flexible hours** over the full roadmap. Network Module 2 estimates **6–8 active hours** for the 24–29 November catch-up and **12.5–17.5 hours** overall. These course estimates specify demand. Confirm compatible windows before turning them into a combined agenda. Account for attendance, commuting, breaks, fatigue, practical work and other commitments.

Weekly principles:

- Place attendance and confirmed deadlines first, then prerequisite recovery, then repeated independent practice and short recall sessions.
- Protect Cryptography foundation blocks and DS exercise blocks; do not let note editing consume them.
- Use focused blocks of roughly 60–90 minutes with a specific output; split long tasks and allow breaks. Use short recall sessions of about 10–20 minutes across the week.
- Select a small number of concrete weekly outcomes; identify what will be deferred if capacity is exceeded.
- Track actual time for a few representative tasks before forecasting the whole backlog. Use ranges and confidence, not invented precision or lecture count alone.
- For each topic estimate remaining acquisition, explanation, verification and practice work separately. Subtract only confirmed work; avoid counting the same proof or exercise twice.
- Review plans when explicitly requested. A suggested weekly review is a user-initiated habit, not background monitoring.

## 9. Checklists and completion criteria

For each topic or assignment, track distinct evidence in the relevant course memory or existing roadmap tracker:

- [ ] Material published/available: source, version and relevant coverage identified.
- [ ] Material imported into Obsidian: usable local file or reference recorded; distinguish linked-only from downloaded.
- [ ] Notes completed: coverage checked against sources, authorship recorded and unresolved defects identified.
- [ ] Topic understood: user can explain it in their own words; record this as self-reported unless assessed.
- [ ] Understanding independently verified: dated unaided explanation/problem attempt evaluated, with outcome and gaps.
- [ ] Exercises completed: identify exercises and evidence or user confirmation; record correctness and help separately.

These are independent statuses, not an automatic pipeline. A student may solve an exercise without finished notes, or have complete notes without understanding. Publication does not imply import; exercise completion does not imply correctness. A reviewed solution is not an independent attempt. Submission and grading, where applicable, are additional fields.

### Distributed Systems milestones

- [ ] Reconcile missing file numbers and source lecture numbering.
- [ ] Diagnose understanding of AI-generated lectures 2–7 without rewriting them wholesale.
- [ ] Recover lectures 8–9 with user explanations and dated checks.
- [ ] Complete representative independent homework attempts, then correct and retry failed reasoning.
- [ ] Explain model assumptions, trace algorithms, construct counterexamples and justify safety/liveness on fresh tasks.

### Cryptography milestones

Use the roadmap's weekly evidence and T/P/E checkpoints. Protect an independent definition, a proof or attack, and an authentic exercise or open question each week as scope permits. Check what remains of L1–L13 and later current-year coverage before the planned January simulation.

### Network Infrastructures milestones

Use the Module 2 roadmap's A–H tracker and note status. For each confirmed block, record coverage, reviewed student notes, an independent core explanation and representative P1 application. Track MCQ and written evidence separately. Keep practical deadlines and lab progress in the relevant course-memory records.

An independent verification is performance by the user **without contemporaneous hints or copying**, not an AI declaration. Record prompt/task, date, outcome, evidence and assistance. Tutor review can evaluate such an attempt, but does not make the tutor's own solution evidence of user proficiency. A later fresh check is needed after a heavily assisted solution. No current topic is declared mastered by this plan.

## 10. Revision and transition to exam preparation

Use the course roadmaps for recall and exam practice. In DS, combine assumptions, traces and correctness arguments. In Crypto, combine definitions, proof reconstruction and fresh professor questions, then retest significant errors unaided. In Network Module 2, use short delayed recall, topology or architecture scenarios, mixed MCQs and timed one-page answers. The student's attempt and its outcome determine what to revisit.

For substantial source revisions, update only the affected scope and record the reason. Label study simulations with the format and evidence used.

## 11. Source registry and existing material references

Verification date means successful access at the stated scope, not a guarantee of freshness or correctness. Failed attempts never replace the last successful check. Linked downloads, PDFs, images and recordings are **not content-verified merely because their parent page or filename was inspected**. The tables below preserve the initial source checks. Current source status belongs in the relevant memory. The course method and roadmap links are in §3 and §7.

### Distributed Systems

| ID / source | Type and authority | Last verification | Provides / access limits |
| --- | --- | --- | --- |
| DS-S1 — [Lecture log](https://sites.google.com/view/distributedsystems-202627/lectures) | Official professor course page, 2026/27 | 2026-11-04, retrieved web text | Lecture topics and material links; homework difficulty/grading guidance. Initial and refinement retrievals on 2026-11-04 end at 11; the user reports publication through at least 12. See §2 reconciliation; do not interpret either snapshot as the live course endpoint. Linked files were not individually accessed. |
| DS-S2 — [Course home](https://sites.google.com/view/distributedsystems-202627/home-page) | Official professor course page, Giuseppe Antonio Di Luna | 2026-11-04, retrieved web text | Course identity, competencies and published timetable: Monday 16–19, Wednesday 17–19. Recheck timetable before scheduling. Does not establish exam dates or format. |
| DS-L1 — [Index](<../DISTRIBUTED SYSTEMS/DS INDICE.md>) and `../DISTRIBUTED SYSTEMS/DS LESSON *.md` | Local student/AI notes | 2026-11-04, inventory; index and selected draft openings read | Notes 1–7, 10, 12, 13; authorship for 1–7 is user-reported. No full accuracy audit performed. |
| DS-L2 — `../DISTRIBUTED SYSTEMS/Assets/SLIDES/` | Local slide copies; provenance/version requires alignment | 2026-11-04, inventory only | Four PDFs; some names contain 2425/2526. Contents and match to current syllabus not checked. |
| DS-L3 — `../DISTRIBUTED SYSTEMS/Assets/TRANSCRIPTED DS/` | Local transcripts; authorship/accuracy unverified | 2026-11-04, inventory only | Lecture 4, 5 and 7 transcript files; secondary material to check against official sources. |
| DS-L4 — `../DISTRIBUTED SYSTEMS/HOMEWORKS/` | Local exercise collection/reconstructions | 2026-11-04, inventory and file openings | Four files; prompts and explanatory material do not demonstrate completed homework or official provenance for every item. |

### Cryptography

| ID / source | Type and authority | Last verification | Provides / access limits |
| --- | --- | --- | --- |
| CR-S1 — [Professor course page](https://dventuri83.github.io/teaching/1_crypto/) | Professor source supplied by user and local index | No successful verification; attempted 2026-11-04 | Expected starting point for current lectures and rules. Initial web retrieval failed twice and failed again during refinement; no successful page retrieval. The user supplied the 2026/27 lecture mapping in §2 from this page; that mapping is user-reported, not independently web-verified. |
| CR-S2 — [Repository material directory](https://github.com/dventuri83/dventuri83.github.io/tree/master/assets/pdf) | Professor's website repository; current and archived course materials | 2026-11-04, directory inventory accessed through GitHub connector after an initial web-tool failure | Verified files `crypto_lecture01_2627.pdf` through `crypto_lecture10_2627.pdf`, plus older-year materials. PDF contents not yet inspected or imported; distinguish academic years when selecting files. |
| CR-S3 — [Course page source](https://github.com/dventuri83/dventuri83.github.io/blob/master/_teaching/1_crypto.md) | Professor's website source file on `master` | 2026-11-04, GitHub directory metadata | File exists but has size 0 bytes in the checked inventory; it does not provide calendar or exam rules. This does not prove the deployed website has identical contents. |
| CR-L1 — [Index](<../CRYPTOGRAPHY/CR INDICE.md>) and [lecture-1 draft](<CR LESSON 1.md>) | Local notes; authorship unknown | 2026-11-04, text read | Source links, introductory content and unverified exam-format note. Not evidence of mastered foundations. |
| CR-L2 — `../CRYPTOGRAPHY/Assets/` | Local material directory | 2026-11-04, directory inspected | Empty at inspection. Expected student transcripts have no verified local path yet. |

### Network Infrastructures

| ID / source | Type and authority | Last verification | Provides / access limits |
| --- | --- | --- | --- |
| NI-L1 — [Index](<../NETWORK/NET INDICE.md>) and `../NETWORK/NET LESSON *.md` | Local course notes; authorship unknown | 2026-11-04, inventory; index read | Files 1, 2, 4, 6, 7, 8. Index supplies no centralized professor URL. Contents not comprehensively audited. |
| NI-L2 — `../NETWORK/LABORATORY/` | Local lab notes; original assignment authority unverified | 2026-11-04, inventory | `LAB 1.md`, `LAB 2.md`, `LAB 3.md`; no verified latest assignment/deadline or completion evidence. |
| NI-L3 — [Theory PDF](<../NETWORK/Network Infrastructures Theory 24-25 2.5.pdf>) | Local theory compilation; provenance unknown | 2026-11-04, existence only | Older-year filename; PDF not opened or assessed. Confirm applicability before using as syllabus authority. |
| NI-L4 — `../NETWORK/Assets/` | Local images/attachments | 2026-11-04, inventory | Images under `NET PIC`; centralized professor website and current original slides remain unidentified. |

Additional context: [existing exam organization](<../ORGANIZZAZIONE ESAMI.md>) and [study prompts](<../STUDIARE.md>) were read as local planning notes, not official rules. `../ORARIO.png` was initially inventoried without visual inspection; the subsequent 2026-11-04 visual comparison corroborates the user-reported timetable in §8, without establishing university verification. A university study-plan search result was found at [Sapienza Cybersecurity](https://cybersecurity.uniroma1.it/node/20), but direct retrieval timed out on 2026-11-04; it is a discovery lead, not verified current calendar or exam evidence.

For future registry additions record: stable source ID, URL/exact local path, type, authority, academic year/version, information supplied, successful verification date, failed attempt date if any, access limitations and next check reason. Add official exam pages, repositories and schedules only when identified; never guess URLs. Prefer current professor/university sources for rules and use transcripts as secondary learning aids. Source contradictions stay visible until resolved.

**Just-in-time acquisition:** inspect existing sources, identify the material needed for the current learning objective, and use appropriate accessible official sources. If an important resource is missing, ask the user for that specific item and briefly explain its immediate value for learning, exam alignment or planning. Continue with reliable available material and record unresolved dependencies without inventing content. Sources may include slides, recordings/transcripts, student notes, past exam papers, professor exercises/homework, lab assignments, exam/grading rules, screenshots, diagrams or supplementary PDFs. Do not collect everything before study begins or request large document collections without an immediate purpose. Finding/importing a source is never completion of its associated learning task.

**User-provided information is an accepted fallback:** the user can report exam format, calendar, deadlines and course announcements when official pages are inaccessible or incomplete. Record the exact information, date reported, applicable course/year and stated origin when available. It may inform planning with the label **user-reported**, without claiming independent official verification. If the user supplies an official document or announcement that Codex actually reads, record that source and the scope of verification separately. Request clarification only for consequential ambiguities; unavailable website access alone should not block useful planning or study from the verified PDF inventory.

## 12. Dynamic reassessment workflow

**Pedagogical update — after meaningful study activity:** record topics actually studied, independent understanding demonstrated, exercises attempted/completed, conceptual difficulties, assistance used and future reviews in the relevant course memory or its linked roadmap tracker. Use evidence or user confirmation; AI explanations and completed documents do not establish mastery. Summarize only cross-course scheduling impacts in global state.

**Organizational update — when explicitly checking sources or reviewing the plan:** use the workflow below to record newly observed lectures, exercises/homework, labs, deadlines/exam information, workload changes and proposed scheduling adjustments. A new publication changes inventory, not demonstrated understanding. No background monitoring exists.

1. Read global plan and state plus relevant course memories, then the applicable charters and roadmaps.
2. Check accessible official sources and relevant local inventories. Record exact source/date/access result; inaccessible does not mean unchanged.
3. Compare with the last verified inventory by source ID, topic/date/version and local mapping. Identify newly observed lectures, exercises, homework, labs, rules or deadlines. On the first check, establish a baseline rather than claiming everything is newly published.
4. Distinguish publication date, first observation date and local import date. Compare each item's publication, import, notes, understanding, verification and exercise statuses independently.
5. Estimate the **change** in outstanding work using observed pace and remaining task types. State ranges and uncertainty; never infer study completion from files, elapsed time or AI output.
6. Compare demand against real capacity, prerequisite dependencies and confirmed deadlines. Flag clashes, growing backlog, stale sources and effects on other courses.
7. Propose focused adjustments: added/deferred work, hours affected, priority rationale and milestone impact. Use buffer first where appropriate. Do not silently replace the whole semester roadmap for a new lecture.
8. Record confirmed factual changes in the appropriate course memory; summarize only cross-course impacts in global state. Label proposed schedule changes as provisional until accepted or authorized by the user's update request. Change this plan only for material objective, policy or milestone revisions, with a brief dated rationale.
9. Report what changed, what remains inaccessible/uncertain, and the next recommended action. If no verified change was found, say so without implying all sources were accessible.



## 13. Risks, unresolved questions and dependencies

| Issue | Impact / next action |
| --- | --- |
| Combined workload exceeds the historic pilot estimate | Confirm real windows and prioritize exam milestones and essential DS practice. Use actual time and completed work to calibrate. |
| Winter exam dates are provisional | Confirm current official dates and booking deadlines before committing to a final exam week. |
| File coverage differs from reported baseline | Resolve DS 11, Network 3/5 and the existing Crypto draft through topic mapping/user clarification; do not rename or remove files. |
| Crypto Post-L13 coverage | Use the current-year materials that become available and the course memory's inventory. Keep older-year preparation provisional. |
| Network after L12 and practical rules | Confirm classroom coverage for the remaining MPLS slides and BGP, and verify outstanding practical requirements in their own workflow. |
| AI notes can conceal weak independent understanding | Diagnose and practice before marking learning verified; preserve authorship and assistance records. |
| DS official/local lecture numbering differs; older slide filenames exist | Map by content and date, not filename alone; retain uncertainty about source freshness. |
| Latest labs and completed exercises lack item-level evidence | Request specific user confirmation or inspect attempts during the relevant study task; do not overwrite the reported baseline with guesses. |
| Editing consumes practice time | Protect independent practice and recall. Maintain only the synthesis required by the relevant course method. |
| Expanding semester workload exceeds capacity | Reduce optional scope, reprioritize by prerequisites/deadlines and explicitly carry unresolved work into exam planning. |

## 14. Implementation history

The November pilot initialized this plan, [workspace instructions](../AGENTS.md), the [global state](STUDY_STATE.md) and the three course memories. On 24 November the user supplied the two active course charters and roadmaps. This revision makes those documents discoverable from the existing workflow and preserves earlier learning records.
