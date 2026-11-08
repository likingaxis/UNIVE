# Distributed Systems — Course Memory

Last update: **2026-11-08** (Europe/Rome): lessons 5–7 reordered against the official lecture log, local slides and supplied transcripts. Lesson 8 is an active incomplete draft by student report; it was inspected for the boundary and not edited. The student's preferred note style remains in §3. No completed lesson-8 study, independent assessment or active duration is inferred. Initialized under explicit Phase 1, Step 3 authorization. This is a state/evidence index, not lecture notes. Follow [AGENTS.md](../../AGENTS.md) and [STUDY_PLAN.md](../STUDY_PLAN.md) for global rules. Read [STUDY_STATE.md](../STUDY_STATE.md) for global priorities; unrelated course memories are not needed for a DS-only task.

Evidence labels retain the plan's meanings: **Verified locally**, **Verified official**, **User-reported**, **Provisional**, **Unknown**. File presence verifies neither completeness nor learning. Dates below describe the scope actually checked.

## 1. Course identity and sources

Distributed Systems (DS), Sapienza MSc Cybersecurity, 2026/27; instructor **Giuseppe Antonio Di Luna** (DS-S2, official information previously verified in this conversation and recorded in the plan).

| Existing source ID | Reference and authority | Verification / limits |
| --- | --- | --- |
| DS-S1 | [Official lecture log](https://sites.google.com/view/distributedsystems-202627/lectures) | Last successful web text check: 2026-11-08, scoped to lesson boundaries 5–8. Lecture 5 lists logical/vector clocks; 6 mutex and PFD; 7 PFD/EPFD; 8 LE/Omega, failure models and applications. Lists overlap: the supplied lesson-7 transcript places detailed PFD implementations after a recap of lesson 6; lesson 8 starts with EPFD proofs. Linked Drive viewer titles identify both local FD-deck editions, but remote PDF contents were not retrieved. The returned snapshot still ends at 11; preserve the report of at least 12 without treating the snapshot as a live endpoint guarantee. No new material downloaded. |
| DS-S2 | [Official course home](https://sites.google.com/view/distributedsystems-202627/home-page) | Last successful web text check: 2026-11-04, before initialization. Course identity and algorithm-design/correctness objectives; not a verified exam specification. |
| DS-L1 | [Local index](<../../DISTRIBUTED SYSTEMS/DS INDICE.md>) and lecture notes linked below | Lessons 1–6 read for the 2026-11-07 editorial revision. On 2026-11-08, current notes 5–7 read/reordered and active draft 8 inspected; the index now links 5–8 as well as 1 and DS-S1. No exhaustive technical audit. |
| DS-L2 | `../../DISTRIBUTED SYSTEMS/Assets/SLIDES/` — local slide copies | Four PDFs. Selected clock/mutex/FD pages consulted on 2026-11-07 and 2026-11-08. Two FD editions differ: 94-page `DS-2425Failure_detection_leader_election.pdf` has Increasing Timeout on PDF p.38, correctness p.39, set agreement p.40; 79-page `DS-Failure_detection_leader_election (1).pdf` has them on pp.37–39. Note references specify the edition. Current remote-copy equivalence is unverified. |
| DS-L3 | `../../DISTRIBUTED SYSTEMS/Assets/TRANSCRIPTED DS/` — local transcripts | Files for 4, 5, 7, 8 and 9 observed on 2026-11-08; import dates unknown. Transcripts 5 and 7 and the opening/transition of 8 consulted for lesson boundaries; 9 was inventoried only. No separate lesson-6 transcript found in this inventory. Transcription fidelity remains unverified. |
| DS-L4 | `../../DISTRIBUTED SYSTEMS/HOMEWORKS/` — local exercises/reconstructions | Four files inspected 2026-11-04; see §7. Not proof of completed work or official provenance for every item. |

## 2. Exam requirements and open questions

**Current examination format: not yet verified.** Components, grading rules, duration, permitted materials, dates, booking rules and expected exercise types are unknown. Do not infer these from older papers, local notes or transcript statements.

**Verified official guidance retained from DS-S1:** homework is ungraded; one-star difficulty may be exam-relevant, while harder starred tasks are enrichment. **DS-S2 course objectives:** design fault-tolerant algorithms and justify correctness. These facts guide learning but do not establish the current exam format.

No clearly identified past-exam paper, mock exam or current grading document was found in the inspected DS inventory. PDF contents and embedded exercise images have not been audited. The lesson-4 transcript discusses analyzing modified algorithms and counterexamples in relation to exams; this is a secondary-source lead, not confirmed 2026/27 examination policy.

**Just-in-time exam analysis:** at the next relevant study start or exam-planning task:

1. Check for official 2026/27 examination instructions using DS-S1/DS-S2 and any identified official exam source; retain access results and dates.
2. Inspect available relevant exercises, past/mock exams and grading instructions. Start with DS-L4 where useful; do not assume a local reconstruction is an official paper.
3. If necessary, ask the student for a representative DS exam or professor instructions, explaining that they help calibrate required reasoning and assessment preparation. Do not request materials for all courses.
4. Analyze representative tasks for competencies, question patterns, difficulty and reasoning. Label findings as sample-based inferences; one exercise does not establish a recurring pattern.
5. Separate confirmed current rules from older-paper patterns. Propose methodological adjustments, then record evidence, source/year, verification date and remaining uncertainty here. Old papers never guarantee the current format.

This process is scoped to DS in this file; other courses will keep their own exam analysis in their separately authorized memories. No examination analysis or new source retrieval is claimed by initialization alone.

## 3. Course-specific study method

- Prioritize models and failure assumptions, algorithm execution, safety/liveness and correctness, with independent algorithmic reasoning and professor homework.
- For attended lectures, retain rough notes and selectively revisit doubts. For recovery, use official material plus checked transcripts in conceptual blocks; the student writes substantive explanations whenever practical, and ChatGPT reviews them.
- Attempt a trace, invariant, proof or counterexample before hints. Use progressive hints, then retry independently; full solutions only when explicitly requested. Record assistance separately from correctness.
- ChatGPT is the primary interactive tutor; Codex maintains materials, evidence and planning context. Use short recall/verification sessions rather than polishing all existing notes.
- **Note-writing preference, student-confirmed 2026-11-07:** use Network lessons 8–9 as the prose reference: connected explanations, restrained headings, precise definitions, useful examples and diagrams. Avoid long AI-generated expansions, repetitive summaries/comparison recaps and formulaic proof scaffolding. Shorten repetition while preserving substantive reasoning, model assumptions and correctness arguments; detailed worked calculations may use collapsible Obsidian callouts. Readability matters more than an arbitrary character target.
- Theory and exercise proficiency are separate. Calibrate workload using actual session effort; global weekly hours are a hypothesis, not a rigid course quota. Detailed methodology remains in the global plan.

## 4. Lecture and material inventory

| Lecture | Available local note / material | Coverage and uncertainty |
| --- | --- | --- |
| 1 | [Lesson 1](<../../DISTRIBUTED SYSTEMS/DS LESSON 1.md>) | Complete notes, user-reported. |
| 2–3 | [Lesson 2](<../../DISTRIBUTED SYSTEMS/DS LESSON 2.md>), [Lesson 3](<../../DISTRIBUTED SYSTEMS/DS LESSON 3.md>) | Complete notes, user-reported. |
| 4 | [Lesson 4](<../../DISTRIBUTED SYSTEMS/DS LESSON 4.md>); DS-L3 transcript | Complete note, user-reported; earlier editorial/source checks retained. |
| 5 | [Lesson 5](<../../DISTRIBUTED SYSTEMS/DS LESSON 5.md>); lesson-5 transcript; Time II PDF pp.3–49 | Logical/scalar/vector clocks and exercises. Mutex moved to 6 on 2026-11-08; the transcript only previews it before ending with vector exercises. |
| 6 | [Lesson 6](<../../DISTRIBUTED SYSTEMS/DS LESSON 6.md>); Time II PDF pp.50–66, FD PDF pp.3–10 | Mutex, then FD motivation and PFD interface/specification. Boundary supported indirectly by the lesson-7 recap; no separate lesson-6 transcript found. The official log also groups implementation topics here. |
| 7 | [Lesson 7](<../../DISTRIBUTED SYSTEMS/DS LESSON 7.md>); lesson-7 transcript; 94-page FD PDF pp.11–38 | PFD request–reply and round implementations, EPFD specification/Increasing Timeout, ending with unpredictable final timeout. Existing proofs/set-agreement figures retained only in a collapsed reference explicitly belonging to the lesson-8 continuation. |
| 8 | [Lesson 8](<../../DISTRIBUTED SYSTEMS/DS LESSON 8.md>); [transcript](<../../DISTRIBUTED SYSTEMS/Assets/TRANSCRIPTED DS/DS LESSON 8 transcription.md>) | **In progress and incomplete**, student-confirmed 2026-11-08. Draft starts with Increasing Timeout correctness (94-page FD PDF p.39), then suspected-set agreement, LE and Omega. DS-S1: 19 Oct. Draft inspected, not edited; current coverage is not completion or independently verified understanding. |
| 9 | No separate note file found | DS-S1 snapshot: 21 Oct 2026, reliable broadcast. Recovery required, user-reported. |
| 10 | [Lesson 10](<../../DISTRIBUTED SYSTEMS/DS LESSON 10.md>) | Rough notes on quorums/ordered communication; broadly consistent with DS-S1's 26 Oct broadcast topics. |
| 11 | No separate note file found | DS-S1 snapshot: 28 Oct, causal broadcast/shared registers. Investigate overlap with local lesson 12; missing filename is not a knowledge diagnosis. |
| 12 | [Lesson 12](<../../DISTRIBUTED SYSTEMS/DS LESSON 12.md>) | Rough notes on register operations/semantics. Official publication through at least 12 is user-reported; date and numbering not independently reconciled. |
| 13 | [Lesson 13](<../../DISTRIBUTED SYSTEMS/DS LESSON 13.md>) | Rough notes on sequential consistency, linearizability and atomic registers. Official publication/date not verified. |

The official snapshot is not a current endpoint guarantee. Local numbering, attendance, independent study and official publication remain distinct. No additional lectures are inferred.

DS-L2 files: `DS-2526-03-Time1.pdf`, `DS-2425Time2.pdf`, `DS-2425Failure_detection_leader_election.pdf`, `DS-Failure_detection_leader_election (1).pdf`. Older-year filenames require alignment before treating these as current authoritative material.

DS-L3 references: [lesson 4 transcript](<../../DISTRIBUTED SYSTEMS/Assets/TRANSCRIPTED DS/DS LESSON 4 transcripted.md>), [lesson 5 transcript](<../../DISTRIBUTED SYSTEMS/Assets/TRANSCRIPTED DS/DS LESSON 5 transcripted.md>), [lesson 7 transcript](<../../DISTRIBUTED SYSTEMS/Assets/TRANSCRIPTED DS/DS LESSON 7 TRANSCRIPTED.md>), [lesson 8 transcript](<../../DISTRIBUTED SYSTEMS/Assets/TRANSCRIPTED DS/DS LESSON 8 transcription.md>), [lesson 9 transcript](<../../DISTRIBUTED SYSTEMS/Assets/TRANSCRIPTED DS/DS LESSON 9 TRANSCRIPTION.md>). Images and diagrams also exist under `../../DISTRIBUTED SYSTEMS/Assets/DS PIC/`; availability is not correctness or study evidence. Official linked slides/recordings are not necessarily imported locally.

## 5. Notes status and authorship

- **User-reported:** lecture 1 primarily student-authored, AI-reviewed; lectures 2–7 predominantly ChatGPT-generated. All seven are complete as documents, not independently audited for correctness or learning.
- **User-reported / locally observed drafts:** recently attended lectures have rough notes, including files 10, 12 and 13. Exact authorship mix is **unknown**; preserve content and clarify only when needed.
- **Requested editorial revision, 2026-11-07:** lessons 1–6 restructured with AI assistance, using three editing subagents and a second review of each pair by another agent, plus the main agent's review. Repeated recaps and proof scaffolding removed; core explanations, examples and all 101 existing embeds preserved. Lesson 4's FIFO definition and separate guarded delivery handler were aligned with the existing slide images and transcript; its supporting SVG was corrected. Lesson 5's mutex proof was clarified. Lesson 6's round-based pseudocode was aligned with its embedded slide, and its timing derivation explicitly uses the slide's idealized clock model. Original authorship remains as reported above. This is editorial/source evidence, not student study, independent proficiency or an exhaustive technical certification.
- **Requested source-order correction, 2026-11-08:** moved the existing mutex section and its five embeds from 5 to 6; moved PFD implementations/rounds from 6 into 7, following the supplied transcript. All 39 existing embeds and five code blocks across the current 5–7 files were retained. Lesson 7's proofs/set agreement are clearly marked as a collapsed lesson-8 continuation reference; the active student draft 8 was not edited. This corrects the previous editorial grouping of topics by slide deck rather than class boundary. No learning achievement is inferred.
- No separate notes 9 or 11 found. Lesson 8 now exists as an active draft; do not create duplicates or overwrite that work.

## 6. Understanding and verification

| Dimension | Initial status |
| --- | --- |
| Attendance | Resumed, user-reported; exact per-lecture attendance unknown. |
| Self-reported theory understanding | Understands much of the explanations; per-topic depth unknown. |
| Independent understanding, lectures 1–7 | **Unverified**; complete notes are not evidence. |
| Understanding of recovery/current topics | Lesson 8 study is in progress by report on 2026-11-08; per-topic understanding and independent outcomes remain **unknown**. Lesson 9 recovery remains pending. |
| Independent exercise proficiency | Difficulty reported; no independently verified performance recorded here. |
| Completed notes | 1–7, user-reported; rough notes remain separate. |

No topic is marked mastered. Future evidence entries should be brief: topic/task, date, unaided or assistance used, outcome, evidence link or user confirmation, gap and next review. Keep attempted, completed and correctly completed exercises distinct.

## 7. Homework and exercises

| Local reference (DS-L4) | Observed content | Student progress |
| --- | --- | --- |
| [Homeworks 1](<../../DISTRIBUTED SYSTEMS/HOMEWORKS/Homeworks 1.md>) | Empty file (0 bytes). | Attempts unknown; no confirmed completion. |
| [Homeworks 2](<../../DISTRIBUTED SYSTEMS/HOMEWORKS/Homeworks 2.md>) | FIFO algorithm modification exercise, explicitly reconstructed from lesson-4 notes; asks for property analysis, counterexamples and invariants. | Attempts/assistance unknown; no confirmed correct completion. |
| [Homeworks x](<../../DISTRIBUTED SYSTEMS/HOMEWORKS/Homeworks x.md>) | Empty file (0 bytes). | Attempts unknown; no confirmed completion. |
| [homeworks x2](<../../DISTRIBUTED SYSTEMS/HOMEWORKS/homeworks x2.md>) | Empty file (0 bytes). | Attempts unknown; no confirmed completion. |

**User-reported baseline: no homework completed.** Existing prompts, embedded images and worked examples in notes are not personal attempts. Which professor assignments remain beyond this inventory, their exact provenance and any deadlines are unknown. All unconfirmed exercises remain pending assessment, not marked attempted or solved.

## 8. Difficulties and knowledge gaps

- **User-reported difficulty:** translating theoretical explanations into independent homework solutions and algorithmic reasoning.
- **Known recovery need:** lectures 8–9. **Unknown:** precise prerequisite weaknesses within 1–7; diagnose rather than presume failure.
- **Organizational gaps:** lesson-11 mapping, official dates/topics for 12–13, current exam rules and full homework inventory. Keep these separate from conceptual gaps.

## 9. Current recovery priorities

1. Maintain attendance and useful rough notes without letting editing displace practice.
2. Diagnose relevant assumptions/failure-detector/leader-election prerequisites briefly, then recover 8–9 in manageable blocks with student explanations and independent checks.
3. Start recurring independent homework attempts; a small FIFO variant from DS-L4 is a provisional diagnostic candidate, not a claim about the exam.
4. Reconcile lecture 11 with 12–13 by topics and source dates when that material is needed; preserve discrepancies until evidence resolves them.

## 10. Next actions and future reviews

- **Current work, student-reported 2026-11-08:** studying and writing lesson 8; the draft is explicitly incomplete. Continue from the student's actual stopping point, using the 94-page FD deck to match the draft's page references. Active time and assessment evidence have not been supplied; do not mark the lesson complete or infer duration from this organizational chat.
- **6 Nov planning review:** DS is the next main independent-study priority after the current Network lesson-9 session. The existing Saturday 7 Nov, 09:30–11:30 slot should cover one manageable lesson-8 block (failure-detector prerequisites, perfect/eventual leader election) and one independent trace or reasoning attempt; completing an entire lecture is not required. Thursday's DS execution remains unreported. An optional 30–45-minute start on Friday is only a conditional suggestion if the student still has time/energy, not an additional booked block or completed activity.
- Perform the just-in-time exam check in §2 when study/exam alignment requires it; request only a useful missing DS example or instruction. Missing exam papers need not block foundational study.
- After a studied block, provisionally review within 1–2 days, around one week and after 2–3 weeks, adjusted to performance and availability. **No review dates are booked and no reminders are configured.** Retry assisted exercises later on fresh or unaided tasks.
- Update this memory only for meaningful confirmed changes; keep explanations elsewhere. Update global state only for cross-course impacts. Do not rewrite the global plan or touch every memory after a short session. Prefer updating existing topic/exercise records over appending repetitive session summaries. Keep meaningful assessment evidence and decision history, references, provenance and unresolved gaps; do not discard useful historical evidence merely to shorten the file.

## 11. Update and verification history

- **2026-11-04 — prior source checks, retained from approved plan:** DS-S1/DS-S2 successfully read; repeated DS-S1 snapshots ended at 11 despite the report of publication through at least 12. Preserve both, without promoting the user report to independent web verification.
- **2026-11-04 — initialization:** read root instructions and plan; inspected DS inventory/index, homework files, selected note/transcript content and slide filenames. Confirmed three empty homework files and the FIFO reconstruction in the fourth. PDFs/images were not content-verified; no new official web check performed in this initialization.
- **2026-11-06 — scoped official check and planning review:** accessed DS-S1 web text; the returned snapshot still ends at lecture 11 and retains the earlier homework guidance. Reconfirmed lesson-8 topics for the next recovery block, without downloading sources, asserting later material absent or changing learning status. The global agenda's existing Saturday slot is refined around one conceptual block and an independent attempt; no extra Friday commitment is booked.
- **Initial learning evidence:** user-reported baseline only; no new independent assessment or exercise completion. Memory creation is organizational progress only. Outstanding uncertainties remain in §§2, 4 and 8.
