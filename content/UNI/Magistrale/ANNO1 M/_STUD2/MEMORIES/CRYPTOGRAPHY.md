# Cryptography — Course Memory

Last update: **2026-11-04**, Europe/Rome. Initialized with explicit authorization; this records context, not learning achievement. Follow [AGENTS.md](../../AGENTS.md) and [STUDY_PLAN.md](../STUDY_PLAN.md). Read [STUDY_STATE.md](../STUDY_STATE.md) for global priorities. Evidence labels: **Verified locally**, **Verified official**, **User-reported**, **Provisional**, **Unknown**, as defined in the plan.

## 1. Course identity and current status

Cryptography (Crypto), MSc Cybersecurity, Sapienza, 2026/27. **User-reported:** systematic study has not started; current lectures are not being attended. Recover foundations before resuming when attendance becomes educationally useful; completing the entire backlog is not required. A lecture-1 draft exists and must be preserved.

## 2. Course-specific learning methodology

- Develop intuition, then precise probability reasoning, formal definitions, theorem assumptions, constructions, proof reconstruction and security reductions. Introduce independent exercises early.
- Recover missed material in conceptual blocks using official slides and available transcripts with ChatGPT as primary tutor. The student reconstructs the explanation and writes the first substantive Markdown; ChatGPT reviews accuracy, completeness and English. Codex organizes sources, progress and planning; Gemini is optional editorial support.
- Respect prerequisites without requiring perfect mastery of every proof before advancing. Move from secrecy/authentication and probability foundations toward computational security, OWFs, PRGs, PRFs and security constructions as understanding permits.
- Attempt definitions, proofs and exercises independently before progressive hints. Record assistance; retry assisted work later unaided. Do not generate complete notes to replace reasoning. Use brief distributed recall; detailed methodology stays in the plan.

## 3. Official sources and local materials

Reuse these source IDs; historical checks are not fresh retrievals during initialization.

| ID | Source / authority | Verification and limitations |
| --- | --- | --- |
| CR-S1 | [Professor course page](https://dventuri83.github.io/teaching/1_crypto/) | Web retrieval attempts on 2026-11-04 failed; no successful independent page retrieval. The user supplied the inventory in §4 from this page. Failure does not prove the site is offline. |
| CR-S2 | [Professor repository PDFs](https://github.com/dventuri83/dventuri83.github.io/tree/master/assets/pdf) | GitHub directory inventory verified 2026-11-04 after initial web-tool failure: `crypto_lecture01_2627.pdf` through `crypto_lecture10_2627.pdf`, alongside older files. PDF contents not yet inspected/imported. |
| CR-S3 | [Course page source](https://github.com/dventuri83/dventuri83.github.io/blob/master/_teaching/1_crypto.md) | GitHub metadata checked 2026-11-04: 0-byte file. Does not establish deployed-page contents or exam rules. |
| CR-L1 | [Index](<../../CRYPTOGRAPHY/CR INDICE.md>), [lecture-1 draft](<../../CRYPTOGRAPHY/CR LESSON 1.md>) | Text read 2026-11-04. Local draft has introductory content and proof sketches; no full accuracy assessment. Index calls the repository older lectures, but CR-S2 also contains 2026/27 filenames. |
| CR-L2 | `../../CRYPTOGRAPHY/Assets/` | Inspected 2026-11-04: empty. Student transcripts are expected, user-reported, but their location is unknown. |

## 4. Lecture and material inventory

**User-provided information originating from CR-S1**, reported 2026-11-04; dates below are in 2026. Topic/date mapping is not independently web-verified. CR-S2 independently establishes PDF filenames, not their contents or study completion.

| Lecture | Date | Reported coverage |
| --- | --- | --- |
| 1 | 25 Sep | SKE, perfect secrecy, equivalent definitions, one-time pad. |
| 2 | 30 Sep | Shannon's impossibility result, statistically secure one-time MACs. |
| 3 | 2 Oct | Pairwise independent hashing, one-time MACs, randomness extraction, seeded extractors. |
| 4 | 6 Oct | Leftover hash lemma, computational security, one-way functions. |
| 5 | 9 Oct | PRGs and polynomial stretch. |
| 6 | 13 Oct | Hard-core predicates, Goldreich–Levin, one-time SKE and CPA security. |
| 7 | 16 Oct | PRFs, CPA-secure SKE and constructions from PRFs. |
| 8 | 20 Oct | GGM construction and security proof. |
| 9 | 23 Oct | DES, AES, Feistel networks, modes of operation and CTR security. |
| 10 | 27 Oct | Exercises. |

Only lecture 1 has a separate local draft in the inspected directory. No local lecture PDFs or transcripts were found. Ten is the known inventory, not a claim that the course ends there or the website is unchanged.

## 5. Notes status and authorship

The earlier report of no written notes is reconciled with the existing [lecture-1 draft](<../../CRYPTOGRAPHY/CR LESSON 1.md>): it is a rough artifact, not evidence of systematic study. It contains definitions, one-time-pad material and proof sketches. Authorship/AI involvement, completeness and accuracy remain **unknown**; preserve it and review selectively. No completed note set is confirmed.

## 6. Understanding and independent verification

- Self-reported systematic study: not yet started. Per-topic understanding: **unknown**.
- Independently verified understanding, proof reconstruction and exercise proficiency: **not verified**; no evidence recorded here.
- A downloaded PDF is available material, a draft is written material, and a copied proof is not independent proof-writing ability. Keep these statuses separate; no topic is marked mastered.
- Future evidence: task/topic, date, outcome, assistance, link or user confirmation, remaining gap and next review. Use unknown rather than assuming either success or failure.

## 7. Exercises, proofs and homework progress

No separate exercise/homework or past-paper files were found locally. Lecture 10 is reported as exercises; exact tasks have not been inspected. The draft's proofs do not establish personal attempts. **Attempted, completed and correctly completed exercises/proofs: unknown**, with no independently verified outcome. The draft's reminder to ask about exercises is an unresolved lead, not a completed action.

## 8. Examination information and unresolved requirements

**2026/27 exam format: not yet verified.** Components, duration, grading, permitted materials, dates and deadlines are unknown. The draft mentions three parts, each with an exercise and theory question: preserve this as an **unverified local note**, not a current rule. CR-S1 is the official starting point; no specific current exam instruction or representative past paper has been inspected.

Provisional preparation emphasis: definitions, formal proofs, mathematical exercises and security reasoning. These are learning priorities, not confirmed question types.

At substantial study/exam preparation, check available official current instructions and relevant exercises/past papers. If needed, request a specific representative Crypto paper or professor instruction to calibrate reasoning and assessment demands. Analyze sample competencies, difficulty and patterns; distinguish historical inferences from confirmed current requirements. Propose adjustments to §2 and record sources, year, dates and uncertainty here. Old papers never guarantee the current format; do not request every course's materials upfront.

## 9. Current learning gaps and difficulties

Foundation recovery is needed, user-reported; precise weaknesses in probability, notation, definitions or proofs remain **unknown pending diagnosis**. Transcript location and current exam requirements are missing organizational information. Do not treat rough wording in the draft as a verified misconception without checking the student's reasoning.

## 10. Next study actions and review priorities

1. Use the existing lecture-1 draft and select the correct 2026/27 PDF from CR-S2; inspect its content before relying on it. Start a small block on SKE/perfect secrecy/OTP, with a prerequisite diagnostic.
2. Have the student reconstruct a definition and a short argument, then attempt a related exercise. Record real effort, assistance and gaps; adjust workload to observed pace rather than enforce weekly quotas.
3. Request a transcript only when needed for that block. Reassess readiness to resume attendance from actual ability to follow prerequisites and identify manageable gaps, not complete backlog recovery.
4. After meaningful study, plan brief recall within 1–2 days, roughly one week and 2–3 weeks, adjusting to results. No reviews or reminders are currently scheduled.

Update only this memory after meaningful confirmed changes. Link to work instead of copying explanations; global state changes only for cross-course priorities/scheduling. Prefer updating existing topic/exercise records over appending repetitive session summaries. Keep meaningful assessment evidence and decision history, references, provenance and unresolved gaps; do not discard useful historical evidence merely to shorten the file.

## 11. Last update and source-verification history

- **2026-11-04, retained history:** CR-S1 retrieval unsuccessful; user supplies course-page lecture mapping. CR-S2 inventory successfully checked via GitHub; CR-S3 metadata shows empty source file. No PDFs read by those checks.
- **2026-11-04, initialization:** CR-L1 text and local inventory inspected; CR-L2 empty. No new web retrieval or learning assessment performed. Sources and user reports remain distinct.
- When explicitly asked to update course information, check accessible official sources against this inventory, distinguish new publication/first observation from import, and record new assignments/deadlines with provenance. Adjust organizational priorities without changing learning status. Record failed checks separately; request missing sources just in time. **No continuous monitoring is configured.**
