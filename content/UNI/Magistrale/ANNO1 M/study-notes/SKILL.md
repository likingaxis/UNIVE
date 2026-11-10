---
name: study-notes
description: "Create, edit or review readable study notes across subjects, with source-aware explanations, precise mathematics and code, and useful SVG diagrams or slide figures. Use for lesson-note cleanup, authorized synthesis and note illustrations; not for ordinary chat answers, planning alone or automatic homework solutions."
---

# Study Notes

Produce notes the student can learn from in one continuous reading: concise explanations, useful examples, precise statements and diagrams that explain something. Preserve the student's intellectual work. This skill applies across subjects; course-specific methods and source requirements come from the applicable workspace instructions and course context.

## Start with the actual request

- Read the applicable `AGENTS.md` in the target workspace and its required study context. For this vault, the entry point is [../AGENTS.md](../AGENTS.md). When working elsewhere, use that workspace's instructions rather than the skill folder's parent. Use the relevant course memory when one exists; missing configuration does not prevent ordinary editing.
- Inspect the entire current note, its attachments and any editing requests in the draft. For a new note, inspect the supplied material and existing course conventions before choosing a structure.
- Distinguish proofreading, substantive restructuring, source/order review and illustration work. Follow the scope already authorized by the user; do not request the same approval again. A narrow language edit does not authorize replacing the student's explanations, finishing an incomplete lesson or solving homework.
- Preserve user-authored reasoning, observations, questions, examples, authorship labels and meaningful intermediate steps. Keep uncertain authorship uncertain. A personal synthesis such as UNICO remains the student's work.
- Keep a temporary comparison copy for substantial edits. Before saving, check for concurrent changes and incorporate them instead of restoring an old snapshot. Do not leave backup notes or test fixtures in course directories.

## Write for studying

Before drafting or editing note prose, read [references/writing-quality.md](references/writing-quality.md). Apply its paragraph-level guidance and examples, including when the task also involves substantial source checks, file management or diagrams. Writing quality is an explicit acceptance criterion, alongside technical correctness and working assets.

Use connected paragraphs that explain why an idea is needed, what it means and how it works. Introduce intuition before formal detail when helpful, and connect each formula, algorithm or figure to the surrounding explanation. This is a writing principle, not a mandatory section template.

- Match the note's language and preserve the student's voice. Improve grammar and flow without converting personal observations into generic textbook narration.
- Use a clear title and a restrained hierarchy of meaningful headings. Avoid a heading for every sentence, numbered fragments, excessive bold text and repeated separators. Preserve heading/block targets; inspect inbound links before changing their text or moving sections.
- Use lists for genuinely parallel items or sequences; use tables when a comparison is easier to read that way. Do not repeat the same explanation in prose, a table, a diagram and a final recap without a learning purpose.
- Remove duplicated definitions, repeated introductions, filler transitions and mechanical conclusions. Do not append summaries, key-takeaway lists, review quizzes or exam tips unless requested or already meaningful parts of the student's note. Preserve actual lecturer exam cues with their provenance.
- Shorten a proof by removing scaffolding, not its reasoning. A direct argument may be clearer than forcing every proof into “assume the opposite / contradiction / conclusion.” Retain necessary cases, invariants, quantifiers, dependencies and derivation steps.
- Keep worked examples near the idea they illustrate. Long calculations or supplied solutions can use collapsed Obsidian callouts when that improves the main reading path; required explanations and unresolved conceptual points must remain visible. Never hide material just to make a note appear short.
- Treat length as a diagnostic, not a quota. Avoid both oversized AI expansions and telegraphic revision sheets. There is no fixed character limit or required reduction percentage. Distinguish prose reduction from removing encoded image data when reporting size changes.

### Make a deliberate prose revision

After the content and structure are settled, reread the actual sentences as a student would. Within the authorized editing scope, rewrite passages that fail these criteria:

- Each paragraph develops a concrete point and supplies enough reasoning to understand it; a list of correct facts alone may leave the explanation missing.
- Actors, actions and references are clear. Replace vague “this,” “it” or “the mechanism” where the reader would have to guess the antecedent; keep technical names consistent.
- Causal links, conditions and transitions explain the connection between ideas. “This is important” or “the algorithm works” must not stand in for the relevant reason.
- Formulas, examples and figures are introduced and interpreted in the prose. Preserve the reasoning between expressions and explain what the example establishes.
- Compression removes repeated propositions and filler while retaining assumptions, cases and meaningful intermediate steps. The reader should not have to reconstruct the missing argument.

Judge the resulting explanation, not the number of completed tool calls, headings or characters removed. Fix weak passages before delivery. Keep this revision process in the work itself; do not append a writing checklist, self-evaluation or editing commentary to the student's note.

## Keep technical meaning intact

Separate a definition or specification from an implementation, example execution or proof when the distinction matters. Explain which assumptions support a conclusion and what remains unknown.

- Preserve notation, terminology, theorem hypotheses, units, probability spaces, security parameters, state variables and relevant system assumptions. Do not strengthen an implication into an equivalence or turn an eventual guarantee into an immediate one.
- In algorithms and labs, preserve guards, update order, event-handler boundaries, atomicity, interfaces and commands. Changing a separately enabled action into a loop, or omitting message identity or a timing assumption, can change the algorithm. Editorial cleanup is not permission to silently repair code semantics.
- In practical notes, distinguish intended configuration and expected results from commands actually executed and output actually observed. A written configuration is not evidence that it was applied or tested; editing the note does not authorize running its commands against a live system.
- Classify examples correctly: a specification example is not automatically an execution of the later implementation. A lecture design sketch, incomplete patch or proof outline must not be presented as a complete verified solution.
- Fix conceptual statements only within the authorized scope and on inspected evidence; identify consequential corrections in the handoff and keep the source traceable. Otherwise flag the precise doubtful statement and continue the safe editorial work. Do not invent a missing proof, definition, lab result or theorem to remove an awkward gap.
- Tidy LaTeX for Obsidian: `$...$` inline and `$$...$$` displays, consistent symbols and readable aligned derivations. Preserve mathematical meaning; define symbols where they first become necessary. Keep pseudocode separate from prose and distinguish excerpts from complete algorithms.

## Reconcile sources and lesson boundaries

Use the sources for what each can actually establish: current official pages for announced scope and requirements; instructor slides for formal statements and figures; recordings/transcripts for the session's explanations and stopping point. Transcripts can be inaccurate, and source inventories are not evidence that their contents were read.

- Check academic year, actual file contents, edition, slide labels and PDF page numbers. Filenames do not establish a source's year or a lesson's boundary. One deck can span several classes, and two editions can have different pagination.
- When ordering is in scope, compare the course log, transcript transitions and the note's actual coverage. Distinguish a recap from new teaching. Record conflicts instead of pretending the sources agree; state the basis for the chosen boundary.
- Do not rewrite or complete a neighboring draft that the student is still writing. Move material between existing notes only when the user has authorized that scope; preserve unique explanations, asset references and links. Clearly separate optional later-lecture reference material from the current lesson's main progression.
- Acquire only sources needed for this task. Missing or inaccessible material is an unresolved dependency, not proof that nothing exists. Ask for a specific missing resource only when it materially affects the edit; continue reliable work in the meantime.
- Keep a short, useful Sources section or nearby figure captions identifying the exact local source and relevant pages. Separate a source-supported correction from an editorial inference. Do not claim current exam rules from older notes or informal remarks.

## Use diagrams and figures deliberately

Read [references/svg-and-figures.md](references/svg-and-figures.md) when creating, converting, replacing or reviewing a diagram or source figure. This reference contains the SVG construction and visual-check workflow.

Choose the medium that explains the content: native SVG for editable topology, sequence, state, architecture or conceptual diagrams; plotting tools for quantitative graphs; unchanged source figures when the professor's notation or example is what matters. Not every section needs a picture.

Store note assets in the course's existing `Assets` structure. Use stable descriptive names, such as `course-lNN-concept.svg`, and Obsidian embeds such as `![[course-lNN-concept.svg|800]]`. Reuse existing files, preserve originals and avoid broken links or duplicate notes. Keep original figure provenance distinct from AI-authored/redrawn artwork.

## Review the result before delivery

Check the full revised note against its previous version and relevant sources, not just the opening paragraphs or word count.

- **Coverage:** retain meaningful examples, doubts, proof steps, commands and algorithms; distinguish intentional consolidation from lost content. Ensure every authorized inline request was addressed or explicitly left unresolved.
- **Flow and precision:** read it as a student. Check prerequisites, notation, assumptions, example labels, reasoning and transitions. Remove repetition without removing the explanation needed to understand the result.
- **Obsidian integrity:** check local source/attachment links, heading/block targets, code and math fences, tables and callout quoting. Check converted images by their targets and content, not only literal embed strings whose widths may have changed. Remove resolved editing placeholders.
- **Visuals:** render and inspect new or changed SVGs and extracted source figures at a realistic reading size. XML validity alone does not prove legibility or mathematical correctness. Check labels against the final text, not an earlier draft.
- Use an independent review when substantial technical restructuring or illustration work makes it useful. For small grammar edits, a careful self-review is sufficient. Parallel editors should own separate files or review read-only to avoid overwriting one another.

Finish with the note link, concrete changes, relevant checks and remaining uncertainties. Update existing course records selectively under `AGENTS.md`; a readable file or newly drawn diagram does not establish understanding, exercise completion or unaided proficiency. Do not create tracking files or infer study time as part of cleanup.
