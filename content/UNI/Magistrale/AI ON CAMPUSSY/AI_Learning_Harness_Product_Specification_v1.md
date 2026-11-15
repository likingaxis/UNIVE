# AI Learning Harness
## Consolidated Product & Functional Specification (Steps 2-3)

**Version:** 1.0 | **Audience:** Design and engineering team | **Initial market:** University STEM students  
**Decision status:** The two learning paths, dual-pane workspace, student-authored notes, targeted feedback, and merge workflow are agreed. **Question 4 is now confirmed:** onboarding must be fast for Lecture by Lecture and more thorough for full Exam Preparation. Other detailed choices below are recommended defaults unless explicitly validated by the team.

## 1. Purpose and product promise

General-purpose AI tools can generate explanations and summaries, but receiving a correct answer is not the same as understanding or independently applying it. The **AI Learning Harness** is a purpose-built study environment that coordinates sources, explanations, personal note-writing, targeted questions, corrections, assessment, and review in one continuous process.

**North star:** Optimize what students can understand, retain, and apply independently, not how much content the AI generates.

**Distinctive interaction:** A stable **two-pane workspace**: AI explanation on the left; the student's own notes on the right. The student thinks and writes before the tutor checks their reasoning. AI then proposes corrections and additions, while keeping a separate record of what the student has actually demonstrated. The product is not a chatbot beside a document, nor an automatic summary generator.

## 2. Audience and foundational rules

- **Initial audience:** University STEM courses, including mathematics, algorithms, systems, networks, and cybersecurity; support equations, LaTeX, code, diagrams, and proofs.
- **Two pathways, one learning engine:** Lecture by Lecture prioritizes first-time understanding; Exam Preparation prioritizes diagnosing gaps, retrieval, problems, and exam readiness. Individual topics may switch between novice and revision support as needed.
- **Personal elaboration matters:** Students compose their own notes in the right pane. AI does not silently write the first draft for them.
- **Support depends on prior knowledge:** Give explicit explanations and worked examples for unfamiliar topics; use more independent reasoning and progressively fewer hints for well-known topics.
- **One focused feedback episode per completed learning unit:** A small number of high-value questions about important errors or gaps, not constant interruptions or obligatory trivial checks.
- **Notes are not mastery:** A polished merged document is a study artifact. Independent recall, explanation, or problem-solving supplies stronger evidence of learning.
- **Student autonomy:** The tutor recommends corrections, explanations, and study plans; the student can ask questions, review evidence, and override noncritical progression recommendations.
- **Source transparency:** Distinguish course material, external supplements, and AI-generated examples. Never hide substantive disagreement between sources.
- **Low-friction UX:** Few visible controls, context-sensitive actions, and no forced switching to a separate chatbot.

## 3. Entry paths and onboarding

### A. Lecture by Lecture - fast start

For a student following classes or starting a new subject, the application should reach a useful lesson quickly.

1. Choose **Lecture by Lecture** and identify the course.
2. Add available material: slides, PDFs, transcripts, lecture notes, or a syllabus. Material can be complete, partial, or absent.
3. Show a provisional course outline and the first usable unit; ask prerequisite questions only when they materially affect understanding.
4. Start the dual-pane study session. Refine the broader course map and weekly plan progressively rather than holding the student in a lengthy setup.

**Recommended default:** Minimal initial setup, with optional study schedule and an easily editable outline. If there are no materials, request at least a topic outline or syllabus when available; label externally reconstructed content as provisional rather than presenting it as the professor's course.

### B. Exam Preparation - deeper start

For a student preparing for an entire exam, initial diagnosis and prioritization are more important than reaching the first explanation immediately.

1. Choose **Exam Preparation**; collect exam date, format (written, oral, practical, mixed), syllabus, and available study time.
2. Import notes, slides, professor exercises, and past papers, where available.
3. Build a syllabus coverage map and run a compact but representative diagnostic using open questions or problems. Do not assign 'mastered' to untested topics; distinguish **unassessed**, **self-reported**, and **verified** knowledge.
4. Identify gaps, critical prerequisites, exam-relevant topics, and remaining time.
5. Present a prioritized study and review plan for confirmation, then start the highest-value activity.

**Principle:** This pathway may require a longer setup, but it must remain focused and skippable where possible. Unknown topics should receive full first-time explanations rather than being treated as revision material.

## 4. Sources and course structure

The ingestion system accepts PDFs, slide decks, lecture transcripts, notes, and syllabus documents; later versions may add audio/video processing. It extracts content while preserving **source name, page/slide/section, and relevant formulas, figures, and code**.

The course is organized as **Course -> Modules -> Lessons -> Conceptual Learning Units**, supported by a concept/prerequisite graph. Units are defined by coherent learning objectives, not a fixed number of minutes or words. Short cards and progressive disclosure are useful defaults, but long proofs or explanations must remain logically complete.

**Source priority:** Course and professor material first for course-specific scope and terminology; trusted external references for clarification and verification; clearly labeled AI-generated examples for illustration. When sources conflict, explain the disagreement and let the student inspect the provenance. Do not silently settle uncertain technical claims.

## 5. Shared learning-unit workflow

Each unit follows **Prepare -> Explain -> Elaborate -> Review -> Merge -> Check/Review later**.

| Stage | Student experience | System responsibility |
|---|---|---|
| **Prepare** | Sees the concept objective and relevant prerequisites | Retrieves sources and adapts the depth to prior evidence |
| **Explain** | Reads the left pane, selects text for contextual clarification | Provides accurate, source-linked explanations, examples, diagrams, LaTeX/code as needed |
| **Elaborate** | Writes their own structured notes in the right pane | Preserves the draft; does not auto-complete the student's thinking |
| **Review** | Submits the draft, answers a short set of targeted questions | Checks key omissions, errors, and reasoning; prioritizes useful questions |
| **Merge** | Reviews AI-proposed edits and accepts/rejects changes | Produces a source-linked diff; preserves the student's voice and revision history |
| **Retention** | Later recalls, explains, or applies the concept without assistance | Records evidence and schedules appropriate follow-up |

**Entry to review:** Require meaningful student-authored content, not an arbitrary word count. If the draft is empty or incoherent because the student is stuck, offer guided explanation and a starting prompt rather than trapping them behind a locked button.

**Feedback policy:** Normally wait until the student submits a unit. Allow contextual questions while reading/writing, but avoid uninvited mid-thought interruptions. A review episode can contain multiple questions if justified; if the student repeatedly struggles, escalate from hints to an explicit worked explanation. Hints-first applies primarily to attempted exercises and checks, **not** to teaching material the student has never learned.

**Merge policy:** Default to targeted corrections and additions. Show what changed, why, and where it came from. The student can accept/reject changes and challenge questionable corrections. A disputed claim can remain flagged without forcing agreement. Use the student's answers during review to address genuine misconceptions, not simply to generate a prettier document.

**Progression:** Prefer guidance over rigid gating. Flag critical prerequisite gaps before dependent content and offer a review; allow a controlled override without marking the concept mastered. Noncritical gaps enter the review queue.

## 6. How the two pathways differ during study

| Dimension | Lecture by Lecture | Exam Preparation |
|---|---|---|
| **Primary goal** | Build new understanding and original notes | Identify gaps and perform independently under exam conditions |
| **Explanation** | Detailed, stepwise, with worked examples | Brief for known material; full explanation for genuine gaps |
| **Right-pane activity** | Student creates a new personal explanation | Student reconstructs known concepts, corrects existing notes, or explains solutions |
| **Feedback** | Checks conceptual interpretation after a unit | Checks misconceptions and exam-critical reasoning |
| **Practice** | Gradually introduces examples and prerequisite links | Prioritizes professor exercises, mixed problems, and oral/written simulations |
| **Scheduling** | Continuous progress through lectures, with spaced recall | Deadline- and gap-driven plan with cumulative review |

Professor-authored exercises and past papers take priority over AI-generated alternatives. AI-generated exercises are labeled clearly. For STEM exercises, assess intermediate reasoning where feasible, not just final answers. In an **unassisted assessment**, ordinary hints and explanations are unavailable until submission.

## 7. Main interface and interaction rules

**Persistent desktop layout:** Left **AI Explanation**, right **My Notes**. A small course breadcrumb shows module/lesson/unit; additional panels are contextual rather than permanent. Use a responsive layout for smaller screens without changing the learning model.

- **Left pane:** Progressive, coherent explanation blocks; source previews/citations; selected-text actions such as *Explain differently*, *Give an example*, *Go deeper*, and *Show source*. Clarifications should remain accessible as collapsible annotations without cluttering the reading flow.
- **Right pane:** Student-controlled headings and structure; text, LaTeX, code, and diagrams as needed; draft persistence and version history. Notes should form a coherent lesson document with links to the relevant conceptual units.
- **Review state:** Show the tutor's question near the affected concept. Keep internal feedback categories hidden; students should see plain-language prompts and useful next steps.
- **Merge state:** Display proposed changes as an inspectable diff with evidence. Accept/reject and resolve conflicts without losing original notes.
- **Recall/exam state:** Temporarily restrict supporting answers as appropriate; return to the normal two-pane workspace afterward.
- **Continuity:** Autosave drafts, preserve the exact point of progress, prefetch upcoming material where feasible, and show a concise recap after returning from a pause.

**Attention policy:** Change activity at meaningful conceptual boundaries rather than fixed intervals. Suggest optional breaks after substantial units; do not infer attention loss from idle time alone. Reduce avoidable generation waits, but do not fill every pause with another question.

## 8. Planning, student model, and learning evidence

Use **weekly goals with manageable daily tasks**, adapted to actual progress and availability. After study sessions, update priorities based on completed work, prerequisite gaps, recurring errors, exam relevance, and time remaining. Missed sessions should be redistributed without creating overwhelming review debt.

Track per-concept states such as **Not studied / In progress / Studied but unverified / Needs review / Demonstrated independently**. Each status must be backed by inspectable evidence such as an explanation given without hints, a solved problem, or a delayed recall result. The notes' correctness never automatically proves mastery.

Retention should use spaced, active retrieval and sometimes interleave related concepts. An FSRS-style scheduler may be adopted later; it is not required to validate the core MVP. Verification may occur after a lesson and again later; during exam preparation, increase mixed practice and unassisted exam simulations.

## 9. Functional architecture

Use four logical layers, not necessarily four services:

1. **Domain Model:** Source library, provenance, syllabus, conceptual units, prerequisite graph, professor exercises.
2. **Student Model:** Drafts, notes, assessments, misconception history, evidence-backed concept states, study availability.
3. **Pedagogical Engine:** Selects topic, explanation depth, feedback, guidance level, progression, exercises, and reviews.
4. **Interaction Layer:** Two-pane workspace, contextual Q&A, note editor, review, diff/merge, navigation, progress.

Functional responsibilities can be grouped into **Setup & Sources**, **Course/Knowledge Mapping**, **Diagnosis & Planning**, **Explanation & Workspace**, **Feedback & Notes Consolidation**, **Assessment & Retention**, and **Session Coordination**. These correspond to the original N1-N12 functional nodes without requiring a separate AI agent for every node.

**Minimum persistent entities:** Course, Source, Concept, LearningUnit, StudyPlan, StudySession, Explanation, StudentDraft, FeedbackSession, ConsolidatedNotes, LearningEvidence, StudentProgress, ReviewTask. Keep provenance and relationships between concepts, questions, notes, and source passages.

**Context strategy:** Keep the current task and guardrails readily available, retrieve relevant course/lesson context on demand, and fetch precise source passages for factual grounding. Do not repeatedly load full documents or all past conversations into each model call.

## 10. MVP boundaries and acceptance criteria

**MVP must support:**

1. Both pathway choices with **fast Lecture by Lecture** and **deeper Exam Preparation** setup.
2. Multi-file upload, basic source extraction, course organization, and traceable citations.
3. Semantic unit navigation and source-grounded explanations with native STEM formatting.
4. Two-pane workspace with autosaved, student-authored notes and contextual left-pane questions.
5. One targeted feedback episode after a draft, with escalation from hints to explanations.
6. AI-proposed, student-approved diff/merge into retained final notes.
7. Basic per-concept progress and error history, plus at least one **unassisted verification**.
8. Resumable study sessions and a basic weekly plan/review queue.

**Example acceptance scenarios:**

- A student uploads a lecture PDF, opens the first concept quickly, writes notes, receives a question about a real misconception, resolves it, and approves an evidence-linked merge.
- A student imports an exam syllabus and past paper, receives a representative gap diagnosis and prioritized plan, then studies one weak topic and completes a hint-free exercise.
- A student requests clarification on unfamiliar material and receives a direct explanation, rather than being forced into an unhelpful guessing game.
- A student rejects an incorrect AI merge suggestion and retains the original note and source reference.
- A student returns to a paused session without losing drafts or their location.

**Post-MVP:** Advanced FSRS optimization, full oral-exam simulation, sophisticated planning/calendar integrations, behavioral break optimization, and automated diagram generation beyond basic source visuals.

## 11. Reliability, privacy, and unresolved choices

- **Reliability:** The AI can be wrong. Cite course sources, disclose external material and uncertainty, allow correction challenges, and do not present unverified claims as facts. Formal or numerical work should use additional validation where possible.
- **Student control:** Provide a way to export notes and delete study data. Clearly describe which materials are processed by external models.
- **Deployment:** Keep provider/model routing modular. **Cloud-only versus local-only processing remains undecided**; do not claim a privacy guarantee the chosen architecture cannot provide.
- **Validation:** Evaluate the usability of the study loop and, when possible, compare **unassisted performance and delayed retention** against ordinary AI-assisted study. Note quality and student satisfaction are secondary metrics, not substitutes for learning outcomes.
- **Experimental defaults, not scientific laws:** Word counts per card, target minutes per unit, feedback question count, mastery thresholds, break cadence, and exact review intervals should be configurable and tested, never imposed as universal cognitive limits.

**Decisions explicitly still to confirm:** initial prototype's degree of real AI integration; precise note structure and merge controls; source-disagreement policy; exam scheduling trade-offs; data/deployment requirements; primary evaluation metric. Recommended defaults in this specification are sufficient to build a first vertical slice, but they should not be misrepresented as choices already approved by the team.

---

**Product definition in one sentence:** An evidence-informed AI study workspace that structures the course on the left, requires students to construct understanding on the right, uses targeted feedback to reveal mistakes, and turns those interactions into better notes and better-directed independent practice.
