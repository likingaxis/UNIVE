# Cryptography — Course Memory

Last update: **2026-11-06**, Europe/Rome: student reports revisiting lesson 2's second part for about 30 active minutes and now understanding it; lesson 3 is next. Independent verification and exercise performance remain separate. Initialized with explicit authorization on 2026-11-04. Follow [AGENTS.md](../../AGENTS.md) and [STUDY_PLAN.md](../STUDY_PLAN.md). Read [STUDY_STATE.md](../STUDY_STATE.md) for global priorities.

## 1. Course identity and current status

Cryptography (Crypto), MSc Cybersecurity, Sapienza, 2026/27. **User-reported, 2026-11-05:** lecture-1 study and first draft are confirmed complete by the student, with an approximate 10:00–12:00 session window (very rough recollection). Student reports completing lesson-2 study at 17:22 after starting at 15:17 (Europe/Rome): 125 elapsed minutes, roughly 20 minutes distracted and about 105 estimated active minutes. The earlier statement of proceeding was an intention, not evidence of an earlier start. At that point, hashing/pairwise independence was not well understood and exercises had not been independently attempted. **User-reported, 2026-11-06:** lesson 2's second part has now been revisited for approximately 30 active minutes and is reported understood; the student chooses lesson 3 as the next Crypto activity. No fresh unaided explanation, exercise result or tutor report was supplied with this update. Understanding and exercise performance are not independently verified. Current attendance remains paused per the 2026-11-04 report. Recover foundations before resuming when attendance becomes educationally useful; completing the entire backlog is not required. Preserve the student's draft.

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
| CR-S2 | [Professor repository PDFs](https://github.com/dventuri83/dventuri83.github.io/tree/master/assets/pdf) | GitHub directory inventory verified 2026-11-04 and rechecked 2026-11-05: `crypto_lecture01_2627.pdf` through `crypto_lecture10_2627.pdf`, alongside older files. Only [lecture 1](../../CRYPTOGRAPHY/Assets/SLIDES/crypto_lecture01_2627.pdf) imported on 2026-11-05: 11 PDF pages, bytes checked against repository size/Git blob SHA. Text extraction of the opening is poor (handwritten material); no full content/accuracy assessment. On the student's subsequent request, [lecture 2](../../CRYPTOGRAPHY/Assets/SLIDES/crypto_lecture02_2627.pdf) also imported on 2026-11-05 (8 pages), verified against previously retrieved Git blob SHA; all 8 pages visually inspected for scope. Covers Shannon bound/proof, game-based perfect secrecy/equivalence exercise, one-time statistical MACs, three exercises and pairwise-independence introduction. Lectures 3–10 remain linked inventory, not locally imported. |
| CR-S3 | [Course page source](https://github.com/dventuri83/dventuri83.github.io/blob/master/_teaching/1_crypto.md) | GitHub metadata checked 2026-11-04: 0-byte file. Does not establish deployed-page contents or exam rules. |
| CR-L1 | [Index](<../../CRYPTOGRAPHY/CR INDICE.md>), [lecture-1 draft](<../../CRYPTOGRAPHY/CR LESSON 1.md>) | Text read 2026-11-04. Local draft has introductory content and proof sketches; no full accuracy assessment. Index calls the repository older lectures, but CR-S2 also contains 2026/27 filenames. |
| CR-L2 | [Course material index](<../../CRYPTOGRAPHY/CR INDICE.md>) and `../../CRYPTOGRAPHY/Assets/` | Empty at the 2026-11-04 inspection. On 2026-11-05, `Assets/TRANSCRIPTION/CR LEZ.1 TRANSCRIPTED.md` observed already present (42,132 bytes); content, provenance/year and transcription quality not assessed. This transcript path was not present in the subsequent lesson-2 preparation inventory on the same date; do not recreate it or assume why it is absent. User reports poor recording audio and chooses to proceed with other sources. Current imported material is linked in the course index. |
| CR-S4 | [Friend's notes repository](https://github.com/DavideLights/appunti/tree/main/1o%20anno%20M/cockgraphy), secondary student material | Directory accessed through GitHub on 2026-11-05: files numbered 1–5 and 8. Only [lecture 1](<../../CRYPTOGRAPHY/Assets/APPUNTI_DAVIDE/lez. 1.md>) imported unchanged on 2026-11-05, size/Git blob SHA checked. Lecture 1 read: SKE, perfect secrecy, equivalent definitions/proof, OTP and limitations; contains additions tagged `#gemini` and image embeds not included in the local copy. User describes these as rough notes by a friend; academic year not established. On the student's request, [lecture 2](<../../CRYPTOGRAPHY/Assets/APPUNTI_DAVIDE/lez. 2.md>) also imported unchanged on 2026-11-05, Git blob SHA checked; text read. Contains hints/solutions and an affine-hashing example beyond official lecture-2 slides. Embedded images not imported. No full accuracy audit; notes 3–5 and 8 not imported. |
| CR-L3 | [Supplementary student compilation](../../CRYPTOGRAPHY/Assets/MATERIALE_STUDENTI/Cryptography.pdf), original `C:/Users/Luca/Desktop/Cryptography.pdf` | Verified locally 2026-11-05: 121 PDF pages, Simone Bianco, title-page date 2026-08-31; describes notes integrated with Katz–Lindell. User identifies it as last year's material with some proofs omitted; academic-year applicability remains unverified. Read title, contents and opening through printed p. 8 (PDF pp. 1–11); rendered/visually checked PDF p. 9. Lesson-1 support: §2.1, printed pp. 4–8 (PDF pp. 7–11), covering SKE, perfect secrecy, equivalence proof, OTP/security proof and Shannon's bound. Lesson-2 support: printed p. 8 for Shannon and §2.2, printed pp. 8–10 (PDF pp. 11–13), for MACs/pairwise independence. Relevant text read; the compilation also introduces t-time MACs, while official lesson 2 uses the one-time case. Affine construction on printed p. 11 is beyond the official lesson-2 slides. Some formulations require checking against official material; no full accuracy audit. Copied intact into Assets on 2026-11-05; SHA-256 matches the Desktop original, which is preserved. |

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

Lecture-1 and lecture-2 study drafts are now present in the course directory; the lesson-2 draft was read and edited on the student's request on 2026-11-05. No official lecture PDFs or transcripts were found there in the 2026-11-04 inspection. On 2026-11-05, official lecture 1, CR-S4 lecture 1 and CR-L3 were imported; a lecture-1 transcript was also observed already present, without content assessment. Subsequently, official lecture 2 and friend lecture-2 notes were imported at the student's explicit request; preparation is not evidence of learning or study time. Acquisition remains incremental for the requested lesson/block. Ten is the known official PDF inventory, not a claim that the course ends there or the website is unchanged.

## 5. Notes status and authorship

The earlier report of no written notes is reconciled with the existing [lecture-1 draft](<../../CRYPTOGRAPHY/CR LESSON 1.md>): it is a rough artifact, not evidence of systematic study. It contains definitions, one-time-pad material and proof sketches. Authorship/AI involvement, completeness and accuracy remain **unknown**; preserve it and review selectively. No completed note set is confirmed.

**2026-11-05 update:** student reports writing a new first draft after studying lecture 1 and explicitly identifies it as their own. Authorship: user-authored draft with subsequent Codex editorial assistance; this does not establish unaided learning. Current file covers SKE/correctness, perfect secrecy, equivalent definitions and proof, OTP/correctness/security/limitations. Earlier authorship uncertainty above refers to the 2026-11-04 baseline.

**Requested editorial cleanup completed, 2026-11-05:** English, paragraph flow, heading hierarchy and Obsidian math notation revised; examples, proof steps, existing heading titles and image embeds retained. Five existing inline SVGs saved under `Assets/CRPIC` and embedded as attachments; escaped labels corrected, plus requested XOR truth table added. All six SVGs rendered and visually checked, attachment targets verified. A marked review callout flags the positive-probability condition in the (ii) ⇒ (iii) proof; this is a document-completeness issue to discuss with the tutor, not a diagnosed student misconception. No full source/conceptual audit or independent assessment claimed.

**Lesson-2 editorial cleanup, 2026-11-05:** [student-provided study draft](<../../CRYPTOGRAPHY/CR LESSON 2.md>) revised for English, paragraph flow, Markdown and Obsidian math. Repeated MAC explanations/duplicated pairwise-definition passage shortened while preserving examples, proof steps, existing heading targets and the student's review warning. Existing exercise solutions are written material, not evidence of an unaided attempt. Explicit editorial callouts clarify zero difference versus zero individual probabilities in the secrecy game, and two inputs to the same random keyed hash function versus two independently chosen functions. Three existing SVGs externalized into `Assets/CRPIC`; requested illustrative hash diagram added, original reference images preserved. No full conceptual/source audit or independent proficiency claimed.

## 6. Understanding and independent verification

- Self-reported study: lectures 1 and 2 confirmed finished on 2026-11-05; lesson 2 ran 15:17–17:22. The hashing/pairwise-independence difficulty flagged on 5 Nov was revisited on 6 Nov for about 30 active minutes; the student now reports understanding it. Readiness to advance is self-reported; lesson 3 has not yet been reported started. The student's uncertainty concerns the recalled timing, not this completion report. No per-topic independent assessment supplied.
- Independently verified understanding, proof reconstruction and exercise proficiency: **not verified**; no evidence recorded here.
- A downloaded PDF is available material, a draft is written material, and a copied proof is not independent proof-writing ability. Keep these statuses separate; no topic is marked mastered.
- Future evidence: task/topic, date, outcome, assistance, link or user confirmation, remaining gap and next review. Use unknown rather than assuming either success or failure.

## 7. Exercises, proofs and homework progress

No separate exercise/homework or past-paper files were found locally. Lecture 10 is reported as exercises; exact tasks have not been inspected. The draft's proofs do not establish personal attempts. **Attempted, completed and correctly completed exercises/proofs: unknown**, with no independently verified outcome. The draft's reminder to ask about exercises is an unresolved lead, not a completed action.

**Lesson-2 update, 2026-11-05:** student answers that exercises were not independently attempted. The draft contains explanations/solutions for the first two MAC exercises and states the alternative forgery game; their presence does not establish correctness of a personal attempt. Independent reattempts and the game-equivalence exercise remain to assess.

## 8. Examination information and unresolved requirements

**2026/27 exam format: not yet verified.** Components, duration, grading, permitted materials, dates and deadlines are unknown. The draft mentions three parts, each with an exercise and theory question: preserve this as an **unverified local note**, not a current rule. CR-S1 is the official starting point; no specific current exam instruction or representative past paper has been inspected.

Provisional preparation emphasis: definitions, formal proofs, mathematical exercises and security reasoning. These are learning priorities, not confirmed question types.

At substantial study/exam preparation, check available official current instructions and relevant exercises/past papers. If needed, request a specific representative Crypto paper or professor instruction to calibrate reasoning and assessment demands. Analyze sample competencies, difficulty and patterns; distinguish historical inferences from confirmed current requirements. Propose adjustments to §2 and record sources, year, dates and uncertainty here. Old papers never guarantee the current format; do not request every course's materials upfront.

## 9. Current learning gaps and difficulties

Foundation recovery is needed, user-reported; precise weaknesses in probability, notation, definitions or proofs remain **unknown pending diagnosis**. The previously observed transcript is absent from the latest inventory; current exam requirements remain unresolved. Do not treat rough wording in the draft as a verified misconception without checking the student's reasoning.

**Self-reported difficulty, 2026-11-05:** the student explicitly marks the hashing section as not well understood and to be reviewed before lesson 3. The editorial review clarified joint outputs under one random key. **Follow-up, 2026-11-06:** the student reports having studied the second part correctly and now understanding it after roughly 30 active minutes. Treat the immediate difficulty as resolved by self-report; retain a brief future recall/independent attempt rather than requiring the same remedial study again. Independent verification is still pending.

## 10. Next study actions and review priorities

1. **Next Crypto topic: lesson 3**, selected by the student on 2026-11-06 after the reported lesson-2 second-part review. Start with a brief recall of keyed hash families and joint uniformity, then proceed in conceptual blocks; acquire only the source material needed for that lesson when preparing the handoff. Current study activity is Network 8–9 in another chat, not Crypto lesson 3. Keep the pending lesson-1 check and independent MAC exercises as practice needs, without treating them as a requirement to repeat all of lesson 2.
2. Have the student reconstruct a definition and a short argument, then attempt a related exercise. Record real effort, assistance and gaps; adjust workload to observed pace rather than enforce weekly quotas.
3. Locate a transcript only if needed for a specific gap; its previously observed file is absent from the latest inventory. Reassess readiness to resume attendance from actual ability to follow prerequisites and identify manageable gaps, not complete backlog recovery.
4. After meaningful study, plan brief recall within 1–2 days, roughly one week and 2–3 weeks, adjusting to results. No reviews or reminders are currently scheduled.

Update only this memory after meaningful confirmed changes. Link to work instead of copying explanations; global state changes only for cross-course priorities/scheduling. Prefer updating existing topic/exercise records over appending repetitive session summaries. Keep meaningful assessment evidence and decision history, references, provenance and unresolved gaps; do not discard useful historical evidence merely to shorten the file.

### Initial activity record — 5 November 2026

| Activity | Original estimate | Actual active minutes | Work/result and evidence | Assistance / difficulties | Next action |
| --- | --- | --- | --- | --- | --- |
| Lecture-1 theory/proofs and first explanation | 120 min agenda block, not an estimate proven sufficient for the whole lecture | Approx. 10:00–12:00 session (about 120 min elapsed), student-reported with very low confidence; breaks and net active minutes unknown | Student confirms finishing lesson 1 and writing their own first draft; requested editorial cleanup completed, details in §5. No independent exercise/check outcome supplied. | Intended ChatGPT-guided workflow; actual study hints and unaided performance not established. Codex editorial assistance recorded separately; proof-detail review callout remains. | Brief unaided check/tutor report and marked proof-detail review. Use the rough session duration only as an initial low-confidence observation, without inferring active time or requesting it repeatedly. |
| Lecture-2 theory/proofs/exercises and drafting | Not separately estimated; additional activity beyond the initial lecture-1 block | 15:17–17:22 on 5 Nov 2026 (Europe/Rome): 125 min elapsed; approximately 20 min distracted, about 105 active min estimated by the student | Study completion reported; [draft](<../../CRYPTOGRAPHY/CR LESSON 2.md>) inspected and editorial cleanup completed. Coverage: Shannon proof, perfect-secrecy game, one-time MAC definition, written exercise explanations and pairwise hashing/MAC connection. No independent assessment supplied. | Student reports no independent exercise attempts. Hashing not understood well, per the student's prominent note; amount of tutor help otherwise unknown. Codex editorial assistance and two explicit conceptual clarifications recorded in §5. | Review keyed hash families and joint uniformity before lesson 3; retry professor exercises without solutions, then assess. This single mixed-activity estimate does not establish separate proof/exercise speeds. |

### Follow-up activity — 6 November 2026

| Activity | Original estimate | Actual active minutes | Work/result and evidence | Assistance / difficulties | Next action |
| --- | --- | --- | --- | --- | --- |
| Lesson-2 second-part review: hashing/pairwise independence | Not separately estimated; the future 60-min recall block is a different planned activity | About 30 min, student estimate; start/end not supplied | Student reports studying the second part correctly and now understanding it, with explicit request to move on. User confirmation only; no unaided attempt or tutor report supplied. | Amount of assistance unknown. Previously reported difficulty now resolved by self-report, retaining its dated history. Exercise performance status unchanged. | Lesson 3 next, with a brief recall and independent practice; no lesson-3 study completion inferred. |

## 11. Last update and source-verification history

- **2026-11-04, retained history:** CR-S1 retrieval unsuccessful; user supplies course-page lecture mapping. CR-S2 inventory successfully checked via GitHub; CR-S3 metadata shows empty source file. No PDFs read by those checks.
- **2026-11-04, initialization:** CR-L1 text and local inventory inspected; CR-L2 empty. No new web retrieval or learning assessment performed. Sources and user reports remain distinct.
- **2026-11-05, supplementary inventory:** user supplied CR-S4 and CR-L3 and announced forthcoming transcripts. GitHub directory/lecture-1 text and the PDF opening were inspected as scoped in §3. References recorded without copying/replacing notes or importing sources. No learning assessment, study duration, exercise performance or agenda completion established.
- **2026-11-05, incremental material preparation:** user authorizes local Assets copies and a standing storage rule, then explicitly limits acquisition to lesson 1. Final imported set: official lecture-1 PDF, unchanged friend lecture-1 note and the intact supplied compilation; existing transcript preserved. Downloads checked against Git blob SHA/size and local PDF copy against original SHA-256. Course index updated; standing incremental-storage rule added to AGENTS.md. Learning status and agenda completion unchanged.
- **2026-11-05, lesson-2 preparation:** student explicitly requests lesson-2 study materials. Official lecture-2 PDF and friend lecture-2 note imported with Git blob SHA verification; official pages rendered/inspected, relevant compilation text read. Course index now includes attachment links, scoped reading order and a ready-to-send tutor message with progressive hints. No later lectures acquired, and no lesson-2 learning, exercise outcome or schedule completion recorded. A fresh individual-file GitHub metadata request failed (UTF-8-only response); direct raw download succeeded and was checked against the previously verified inventory SHA.
- When explicitly asked to update course information, check accessible official sources against this inventory, distinguish new publication/first observation from import, and record new assignments/deadlines with provenance. Adjust organizational priorities without changing learning status. Record failed checks separately; request missing sources just in time. **No continuous monitoring is configured.**
