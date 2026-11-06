# Network Infrastructures — Course Memory





Last update: **2026-11-06**, Europe/Rome: lesson-8 study completed and understood by student report, 60 active minutes; requested note cleanup and diagrams completed. Lesson 9 is partially studied and paused, with a reported intention to resume later. Independent verification remains pending. Initialized with explicit authorization on 2026-11-04. Follow [AGENTS.md](../../AGENTS.md) and [STUDY_PLAN.md](../STUDY_PLAN.md). Read [STUDY_STATE.md](../STUDY_STATE.md) for global priorities. Evidence labels: **Verified locally**, **Verified official**, **User-reported**, **Provisional**, **Unknown**, as defined in the plan.





## 1. Course identity and current status





Network Infrastructures (Network), MSc Cybersecurity, Sapienza, 2026/27. **User-reported:** attendance continues, general theoretical understanding is reasonably good, and rough notes are written during lectures. Several laboratories have been completed; at least one recent lab requires recovery, but its identity is unknown. Francesca Cuomo is named in the locally inspected PON deck (2026-11-05); current official instructor/course website not independently established here.





**Module mapping, 2026-11-06:** the user confirms two modules, with classroom lesson 8 starting the second. Notes are now located under `NETWORK/FIRST MODULE/` and `NETWORK/SECOND MODULE/`; slides have corresponding subdirectories under `NETWORK/Assets/SLIDES/`. The locally inspected second-module introduction and notebook identify Marco Polverini, A.Y. 2026/27, and transport networks. Lesson 8 maps to introductory deck NI01 and notebook chapter 1, rather than to the previous module's deck numbering.





## 2. Course-specific learning methodology





- Connect protocols and architectures to network behavior; prioritize labs, configurations, troubleshooting, independent reproduction and actual practical deadlines.


- Preserve rough notes, professor examples and material references. Address unclear concepts selectively; do not polish or rewrite every lecture. Assemble the personal theoretical UNICO during exam preparation.


- For labs preserve commands, configurations, observations, errors and the reasoning behind corrections. First attempt tasks independently, then use progressive hints; verify actual behavior rather than equating a finished document with practical success.


- ChatGPT is primary tutor; the student supplies substantive explanations and attempts. Codex manages materials, evidence and planning; Gemini is optional editorial review. Detailed global methodology remains in the plan.





## 3. Official sources and local materials





No centralized professor website or current official examination source is identified. Do not invent a URL. Request the relevant original slide deck, assignment or announcement when a concrete objective needs it.





| Existing ID | Local source / authority | Verification and limits |
| --- | --- | --- |
| NI-L1 | [Index](<../../NETWORK/NET INDICE.md>) and lecture notes in §4; local student notes | Initially empty on 2026-11-04; 2026-11-05 index links the requested AI review. Original drafts preserved; provenance/authorship mix and completeness are not fully established. |
| NI-L2 | `../../NETWORK/LABORATORY/` — local lab notes | Three files read 2026-11-04. No official assignment sequence, latest task or deadline established. |
| NI-L3 | [Older theory PDF](<../../NETWORK/Network Infrastructures Theory 24-25 2.5.pdf>) | Existence verified 2026-11-04; content not opened. Provenance and relevance to 2026/27 unverified. |
| NI-L4 | `../../NETWORK/Assets/`, including `../../NETWORK/Assets/NET PIC/` | Initial 2026-11-04 inventory identified images. Four new conceptual SVGs support the 2026-11-05 AI review; existing attachments preserved. Slides/transcripts are now indexed separately below. |
| NI-L5 | `../../NETWORK/Assets/SLIDES/` — local decks 01-04; [03 PON](<../../NETWORK/Assets/SLIDES/FIRST MODULE/03_Infrastructures_PON.pdf>) and [04 Wireless](<../../NETWORK/Assets/SLIDES/FIRST MODULE/04_Wireless_infrastructures_new.pdf>) | 2026-11-05: 01/02 file presence only; 03/04 text and relevant figures inspected (42/78 PDF pages). Academic-year applicability/publication and original import dates unverified. Deck 04 attributes Kurose/Ross 8th edition (2020); historical numerical examples retained as such. |
| NI-L6 | [Transcript 03](<../../NETWORK/Assets/TRANSCRIPTION NETWORK/network 03 lessons transcription.md>) and [Transcript 04](<../../NETWORK/Assets/TRANSCRIPTION NETWORK/network 04 lessons transcription.md>) | 2026-11-05: text inspected for lecture emphasis and checked against 03/04 slides and drafts. Recognition errors/gaps; dates and transcript authorship unknown. Deck numbers are not established classroom lesson numbers. |
| NI-L7 | `../../NETWORK/Assets/TESTEXAMSECC/`: `Tests.pdf`, `secondIntermediateTest.md`, `Risposte QUIZ II Parte.pdf`, `test-optical-network-2023.pdf` | Supplied by user and inspected 2026-11-05 (text and scanned screenshots). Historical/reconstructed mixed-topic questions; selected answers are not guaranteed correct, and official provenance/current applicability unverified. Specific conflicts and scope recorded in the review §15.2. |
| NI-L8 | [Module-2 introduction](<../../NETWORK/Assets/SLIDES/SECOND MODULE/NI01 - intro to transport networks.pdf>), [whiteboard](<../../NETWORK/Assets/SLIDES/SECOND MODULE/NI_L1-2026-11-02.pdf>), [instructor notebook](<../../NETWORK/Assets/SLIDES/SECOND MODULE/NI_Notebook.pdf>) and [lesson-8 transcript](<../../NETWORK/Assets/TRANSCRIPTION NETWORK/network lesson 8 transcripted.md>) | 2026-11-06: introduction text inspected (25 PDF pages), initial access/transport diagram visually checked; whiteboard page 1 visually inspected and dated 2/11/26; notebook provenance/contents and chapter 1 inspected (printed pp. 1–10). Notebook declares AI assistance and instructor review, with possible residual errors. Transcript teaching content begins around 17:32 and aligns with lesson 8; recognition errors remain, e.g. ADSL described as wireless. Opening administrative announcements are locally available attributed speech, not independently verified current exam/calendar rules. Materials were already local; subsequent transcript/note editing is recorded in §11. |





**Module-2 source roles, user-confirmed 2026-11-06:** `NI_Notebook.pdf` is the professor's study notebook written with ChatGPT; `NI01 - intro to transport networks.pdf` is the slide deck; `NI_L1-2026-11-02.pdf` is the notebook containing sketches drawn by the professor while explaining in class. These are separate supporting sources, not student-authored notes. For lesson 8, use the slides for structure, the in-class sketches and transcript for the professor's reasoning/examples, and notebook chapter 1 for connected explanations; keep any disagreements explicit.





## 4. Lecture and material inventory





Observed note topics below are navigation aids from inspected text, not an official syllabus or correctness assessment.





| Local note | Observed coverage |
| --- | --- |
| [Lesson 1](<../../NETWORK/FIRST MODULE/NET LESSON 1.md>) | Access/core networks and access technologies. |
| [Lesson 2](<../../NETWORK/FIRST MODULE/NET LESSON 2.md>) | Wireless local loop and cellular architectures. |
| [Lesson 4](<../../NETWORK/FIRST MODULE/NET LESSON 4.md>) | Optical fiber/attenuation and access deployment notes. |
| [Lesson 6](<../../NETWORK/FIRST MODULE/NET LESSON 6.md>) | Wireless hosts, base stations and wireless access concepts. |
| [Lesson 7](<../../NETWORK/FIRST MODULE/NET LESSON 7.md>) | Multiple access, including TDMA/FDMA/CDMA. |
| [Lesson 8 — module 2 begins](<../../NETWORK/SECOND MODULE/NET LESSON 8.md>) | Access versus transport, WAN/carriers, traffic aggregation, topology/routing, logical versus physical connectivity and shared infrastructure; mapped to NI-L8 on 2026-11-06. |





**Unresolved discrepancy:** user originally reported notes 1–2 and 4–8; separate files 3 and 5 are absent. Inspected openings and internal lesson references do not establish whether their topics are merged elsewhere. Lesson 8 refers to a recap of previous lessons, but does not prove complete coverage of 3/5. Obtain relevant topic/date or slide mapping when needed before deciding whether recovery or a new note is necessary. Missing numbering is not proof of missing learning.





Official publication inventory, dates and current endpoint are unknown. Local materials are available; publication and import histories are not reconstructed from filenames.





**2026-11-05 topic mapping:** lesson-4 draft aligns with deck 03; lesson-6/7 drafts align with deck 04. This supports source navigation but does not resolve missing classroom lessons 3/5 or establish complete lecture coverage. Transcript 04 includes a final recap reaching earlier access topics; it is not limited to one classroom session.





## 5. Notes status and authorship





**User-reported:** the student writes rough lecture notes. Existing files contain rough phrasing, questions and placeholders; completed theoretical coverage is **not verified**. Exact user/AI authorship per file is **unknown**; preserve the student's writing and do not assume polished passages are independently learned. The older PDF is not a confirmed current authoritative note set.





**Requested reference, 2026-11-05:** `NET REVIEW 03-04 - PON and Wireless.md` was explicitly **AI-generated** (creation recorded on 5 Nov; file not found in the 6 Nov inventory, not recreated), in English, with beginner explanations, four SVGs in existing `Assets/NET PIC`, source/page mapping and recall prompts. Created at the user's explicit request from NI-L5/6, drafts 4/6/7 and relevant NI-L7 questions; it is separate from the student's UNICO. Original notes and supplied sources are unchanged. Reading, understanding, active study time and independent performance are not reported by its creation.





**Lesson-8 editorial update, 2026-11-06:** the student-maintained [note](<../../NETWORK/SECOND MODULE/NET LESSON 8.md>) was updated after study, then edited by Codex for English, paragraph flow, minimal headings and Obsidian math/embeds. Paragraph-level user/AI authorship remains unknown. Existing screenshots and the `traceroute` command were preserved. One requested access/transport SVG was created; eight supplied inline SVGs were combined into three attachments, and the ninth was saved as a fourth attachment (five local SVGs in total). Four figures were extracted unchanged from NI-L8 slides 9, 13, 14 and 20. Assets use the prefix `net-l08-` in `NETWORK/Assets/NET PIC/` and are embedded in the note, now linked from the course index. New comparison artwork is AI-authored; the other SVGs derive from supplied diagrams of unconfirmed authorship; slide figures retain instructor-source provenance.

## 6. Understanding and independent verification





| Dimension | Initial status |
| --- | --- |
| Attendance | Ongoing, user-reported; exact per-lecture record unknown. |
| Theory understanding | Generally reasonably good, user-reported; per-topic depth unknown. |
| Independent theoretical verification | Not verified; no assessment evidence recorded. |
| Practical proficiency | Several labs completed, user-reported; task-level independent reproduction/correctness unknown. |
| Notes completeness | Lesson-8 updated draft received and editorially cleaned on 6 Nov; other notes remain unaudited for completeness. |





**Current study, user-reported 2026-11-06:** lesson 8 has now been studied successfully in one hour, and the student supplied an updated note for cleanup. Record lesson-8 study completion and understanding as **self-reported**. The student has stopped lesson 9 and intends to continue later. The reported time “6:25” is interpreted provisionally as **18:25, Europe/Rome**, given the afternoon context. Lesson 9 is **partial / paused**; original estimate, start time, active minutes, exact covered topics, difficulties and independent outcomes remain unknown. Study was in another chat; assistance intensity is unknown. Resumption is not scheduled. Codex has not read the tutor conversation or received a brief tutor report.

### Lesson 8 — theory activity record, 6 November 2026

- **Estimate / actual:** no separate original estimate for this added theory session; **60 active minutes reported by the student**. Start/end clock times were not supplied. Do not substitute the practical block's 60-minute estimate.
- **Completed work:** study of the module-2 introduction and an updated [lesson-8 note](<../../NETWORK/SECOND MODULE/NET LESSON 8.md>), covering access/transport roles, aggregation, topologies/routing, logical/physical connectivity, delay and infrastructure sharing.
- **Result / evidence:** the student reports having studied the lesson correctly; the note was inspected and cleaned. Understanding is self-reported, with no unaided explanation, exercise result or independent assessment recorded.
- **Assistance / authorship:** study with ChatGPT in another chat, as previously reported; assistance intensity and paragraph-level user/AI origin are unknown. Codex performed editorial/source checks and prepared the requested diagrams and figure attachments. No tutor report was supplied.
- **Difficulties / next action:** no study difficulty or interruption reported. The draft's transport-network/layer, PoP/access-network and shared-physical/logical terminology was clarified and explicitly flagged for review, not diagnosed as demonstrated misconceptions. Suggested brief unaided recall on 7–8 Nov, subject to availability; no extra calendar slot or reminder created.

**Pace calibration:** this is one 60-minute observation for introductory Network theory. It is not a lab timing estimate or a reliable average for later, more technical lessons.



Never equate lab notes, AI solutions or copied commands with proficiency. Future evidence should identify the task, date, behavior checked, outcome, assistance, evidence link/user confirmation, remaining difficulty and next action.





## 7. Laboratory, exercise and homework progress





| NI-L2 reference | Observed note content | Progress evidence |
| --- | --- | --- |
| [Lab 1](<../../NETWORK/LABORATORY/LAB 1.md>) | Collision domain, iproute2, interfaces and traceroute prompts. | Actual attempt, completion and independent success for this lab: unknown. |
| [Lab 2](<../../NETWORK/LABORATORY/LAB 2.md>) | Layers, ARP, subnetting, routing/longest-prefix match; exercise reference to slide 35. | Actual attempt, completion and independent success: unknown. |
| [Lab 3](<../../NETWORK/LABORATORY/LAB 3.md>) | SSH, client/server configuration, keys, forwarding and a Kathara command. | Actual attempt, completion and independent success: unknown. |





Preserve the aggregate user report of several completed labs and at least one recent outstanding lab, without assigning those statuses to filenames. Lab 3 is the highest local number, not automatically the latest or outstanding assignment. Submission/grading status and active homework/intermediate assessments are unknown. A note question or exercise reference is not an attempt record.





## 8. Examination information and unresolved requirements





**2026/27 exam format: not yet verified.** Components, grading, duration, permitted resources, practical requirements, dates and deadlines are unknown. On 2026-11-05 the user reported an upcoming test and supplied historical examples (NI-L7); no current date or complete scope was supplied. These supersede the initial absence of identified samples, not the unknown status of current requirements. The older theory PDF has not been assessed for examination information.





**Historical evidence only:** NI-L7 contains multiple-choice questions on PON scheduling/cost/WDM, multipath, wireless interference, hidden terminals and latency, alongside earlier access and other course topics. Use the sample style to practise conceptual distinctions, without guaranteeing question recurrence. Keys can conflict: `Tests.pdf` Q13 gives OTS-FDI, while `test-optical-network-2023.pdf` p. 9 shows assessment feedback giving ODU-FDI. Figure-dependent reconstructed questions also need their original diagrams. The new review covers decks 03/04, not the whole sample folder.





Provisional preparation emphasis: practical assessments, lab requirements, configuration/troubleshooting and theory questions. These are investigation priorities, not confirmed exam components.





When substantial study/exam planning needs alignment, check identified official current instructions and available representative assignments/papers. If missing, ask for a specific Network example or professor announcement and explain its immediate use. Analyze competencies, difficulty and patterns across samples; separate historical inferences from current official requirements. Propose refinements to §2 and record sources/year, evidence and uncertainties here. Old papers do not guarantee current format; do not request all courses' exam materials at once.





## 9. Current learning gaps and difficulties





- **User-reported recovery:** at least one recent lab; identity and remaining work unknown.


- **Local unresolved questions to revisit, not verified misconceptions:** Lab 2 asks about IP/MAC roles, gateways, routing selection and a slide-35 exercise; Lab 3 asks about key passphrases and contains unfinished forwarding sections. Confirm which doubts remain live before diagnosing gaps.


- **Organizational uncertainty:** lectures 3/5 mapping, official current materials, practical deadlines and assessment rules. Do not infer theoretical failure from numbering or rough wording.


- **Source discrepancies surfaced during synthesis (2026-11-05):** draft CSMA/CD vs slide CSMA/CA; transcript multiple colours called multimode; transcript transmit-power discussion vs slide-29 burst receiver AGC; deep-sleep milliseconds in speech vs seconds on slide 54. Clarifications are in the AI review, not replacements of the personal drafts or diagnoses of present student misconceptions.





## 10. Next study actions and review priorities





**Current student-selected theory task (2026-11-06):** lesson 8 / module 2 is studied and understood by student report (60 active minutes), and its requested editorial cleanup is complete. Lesson 9 is partially studied and paused; the student will resume later, with no new time commitment supplied. At resumption, recover the last covered topic rather than infer completion from elapsed time. Next useful lesson-8 action is a short unaided recall of the flagged terminology and routing/physical-layer distinctions, then a brief ChatGPT report if available. Preserve the established workflow: study and personal notes with ChatGPT, followed by requested Codex cleanup, evidence updates and necessary planning adjustments. The global agenda separates completed lesson-8 theory, paused lesson-9 study and the still-unreported practical block. The outstanding lab remains unidentified.





1. Maintain attendance and current rough notes. At the next practical session, identify the outstanding lab and check its actual task/deadline; request only the relevant assignment or announcement if absent.


2. Recover that task through a student attempt, observation of network behavior and explanation of configuration choices. Record errors/corrections and distinguish completion from independent reproducibility.


3. Reconcile lectures 3/5 against topic/date or slide information before creating or duplicating notes. Repair only relevant theoretical doubts; postpone broad polishing to UNICO preparation.


4. Use short recall/troubleshooting checks and later unaided reproduction. Provisional spacing after study: 1–2 days, about one week and 2–3 weeks, adjusted to outcomes. No reviews/reminders are scheduled.





For the reported upcoming test, the original deck-03/04 sources remain available. The AI review file recorded on 5 Nov is absent from the latest local inventory; its present location/status is unknown. Next useful preparation is a student explanation/attempt using its recall prompts or relevant historical questions; obtain current scope/date when needed for scheduling. No changes to the agreed weekly agenda were made without those constraints.





Use actual effort to adjust workload; weekly hours are experimental, not a quota. After meaningful confirmed work, update only this memory with concise state/gaps/evidence and links. Global state needs updates only for cross-course scheduling or priorities. Prefer updating existing topic/exercise records over appending repetitive session summaries. Keep meaningful assessment evidence and decision history, references, provenance and unresolved gaps; do not discard useful historical evidence merely to shorten the file.





## 11. Last update and source-verification history





- **2026-11-04, retained baseline:** NI-L1/NI-L2 note and lab inventory, NI-L3 PDF existence and NI-L4 attachments recorded in the approved plan. No verified centralized official website or current exam rules.


- **2026-11-04, initialization:** rechecked local inventory, empty index, selected lecture text/references and all three lab-note texts. Separate lectures 3/5 remain absent with mapping unresolved. No PDF/image content audit, new web check or learning assessment performed.


- **2026-11-05, requested material synthesis:** inspected NI-L5/6 and drafts 4/6/7/8; inspected the user-supplied NI-L7 collection including scanned pages. Created the linked AI reference and four original SVGs; added an index link. Recorded historical-test limits and source discrepancies. New observation does not establish recent publication/import, student study or proficiency. Current exam rules and dates remain unverified; global plan/state unchanged.


- **2026-11-06, lesson-8 preparation and requested transcript cleanup:** recorded the user-confirmed module split, corrected lecture inventory links to observed subdirectories and mapped NI-L8 to the existing lesson-8 draft. Lesson-9 file presence also observed in `SECOND MODULE`; contents not inspected. At the user's request, compacted the lesson-8 transcript in place: removed fillers/false starts/redundant repetitions, merged adjacent speech, retained explanations/examples, substantive questions and administrative announcements, with 44 chronological timestamp anchors. Unclear source wording is explicitly flagged; this is AI editorial work on a transcript, not new student-authored notes or independently verified exam rules. Source review/editing is organizational evidence only; no understanding or session duration inferred. Global plan/state and student lecture notes unchanged.


- **2026-11-06, confirmed study report and requested note cleanup:** recorded the student's lesson-8 completion/understanding report and 60 active minutes, with unknown original theory estimate and no independent assessment/tutor report. Edited the updated lesson-8 draft, completed its requested diagrams/slide-figure embeds and added an index link. Clarified source-supported terminology with explicit review flags; preserved existing screenshots, examples and command. Updated only the relevant global status/agenda rows; lesson 9 remains last-reported in progress and practical execution remains unknown. No semester-plan or other-course-memory changes.

- When explicitly asked to update, inspect accessible identified official sources and relevant local materials, compare inventories, and record newly observed lectures, labs, exercises or deadlines with dates/provenance. Keep publication distinct from import and organizational changes distinct from learning. Report priority impacts, preserve failed checks separately, and request missing sources just in time. **No continuous monitoring is configured.**


