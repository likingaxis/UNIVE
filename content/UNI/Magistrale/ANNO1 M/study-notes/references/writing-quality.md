# Writing clear study notes

Read this before drafting or editing note prose. Its purpose is to improve the explanation itself, including when an agent is efficient at tools, organization and source retrieval. A completed workflow does not establish that the text is easy to learn from.

Apply these principles within the user's editing scope. Proofreading should preserve the existing explanation; an authorized rewrite can change its structure more substantially. Neither permits adding unsupported intellectual content.

## Develop an explanation, not just correct sentences

Give a paragraph a clear job: introduce a problem, define an object, explain a mechanism, justify a step, interpret an example or state a limitation. Its sentences should develop that job rather than collect loosely related facts. Combine fragments that belong to one explanation; split a paragraph when the subject or reasoning genuinely changes.

Anchor the reader in something already introduced, then explain the new point. Name the actor or object, say what happens, and give the condition or reason that matters. Place a necessary assumption before the conclusion that uses it. This is a way to diagnose weak prose, not a requirement to make every paragraph follow the same pattern or contain the same number of sentences.

Use explicit nouns when a reference is ambiguous. “When the receiver advances its counter” is more useful than “when this changes.” Once the object is clear, ordinary pronouns are fine; repeating a full technical name in every sentence is also tiring. Keep a consistent name for the same object instead of introducing decorative synonyms.

Prefer concrete verbs and familiar sentence structures. Explain what a component **stores**, **checks**, **compares**, **sends** or **excludes**. A phrase such as “the mechanism facilitates the management of the situation” usually hides the action that the reader needs to understand. Preserve established technical terminology where precision requires it.

## Connect ideas through their actual relationship

Use “because,” “therefore,” “if,” “when” and “however” to express relationships supported by the material. These words should identify a cause, consequence, condition or contrast; adding them mechanically does not create coherence.

A transition is useful when it explains what remains unresolved and why the next concept is needed. Repeated “Now let us move to another important topic” sentences announce the document's movement without explaining the subject. Often the preceding paragraph already leads naturally into the next one and no extra transition is needed.

Avoid using “clearly,” “obviously,” “simply” or “this is important” to cover a missing argument. Replace the announcement with the reason, or remove it if the reason is already stated. Likewise, a conversational lecture transcript can be edited into natural prose without retaining every rhetorical question, emphatic answer or promise about what will be studied next. Keep genuine student questions and the professor's useful reasoning.

## Make mathematical and technical explanations readable

Introduce a formula with the quantity or relationship it expresses. Identify necessary symbols and assumptions, then interpret the result or use it in the next step. Do not leave a display equation floating between unrelated paragraphs, or translate every symbol into a second equally opaque sentence.

For a derivation or proof, retain the logical bridge: which hypothesis, definition, bound or invariant licenses the next step? Shorten repeated statements of the goal and ceremonial conclusions before cutting intermediate reasoning. Use a contradiction proof when the argument needs it, not because every proof has been given that template.

For an algorithm or lab, explain the purpose of the relevant state or command and the behavior it produces under the stated conditions. Prose should help the reader interpret the code rather than repeat each line mechanically. Preserve exact commands, code semantics and the distinction between expected and observed results.

Introduce an example by saying what it illustrates. After the concrete steps, identify the result it establishes and any limit on that conclusion. Do not turn one successful execution into a general correctness proof or one numerical value into an asymptotic claim.

## Compress without making the reader fill the gaps

Remove duplicated propositions, repeated definitions, empty introductions and conclusions that repeat the preceding sentence. Preserve the example, assumption or intermediate calculation that makes the explanation understandable. Concise writing can include several sentences when each supplies a different necessary part of the reasoning.

Choose the representation for the job. A paragraph is usually best for a causal explanation; a list can express actual steps or parallel properties; a table can make distinct cases comparable. Turning every sentence into a bullet or heading does not improve the underlying prose. A polished diagram supports the explanation but cannot supply an omitted assumption.

Preserve the student's observations and uncertainty. A sentence such as “I do not yet see why this case is excluded” should remain a recognizable question when it is unresolved. Do not replace it with a confident answer just to make the note sound finished.

## Small examples of useful revision

These examples illustrate writing choices. They are not lesson content to insert automatically, and their factual assumptions must match the actual source before reuse.

### Fragmented facts into a connected explanation

**Weak:** “Capacity is 10 Gbit/s. Two flows. One is 6 and one is 5. Total 11. Congestion. This is important.”

**Better:** “Two streams offer 6 Gbit/s and 5 Gbit/s to a link with a capacity of 10 Gbit/s. Their combined demand is 11 Gbit/s, so the link cannot serve the sustained offered traffic in full.”

The revision identifies what the numbers measure and why their comparison matters. It does not imply that 11 Gbit/s was successfully transmitted through a 10 Gbit/s link.

### Proof scaffolding into the actual argument

**Weak:** “We prove no duplication. Suppose there are two deliveries. The first adds the message to the set. The second checks the set. This gives a contradiction. Therefore no duplication is satisfied.”

**Better, with the stated algorithm assumptions:** “The first delivery adds the message to `delivered` before notifying the application. Because the handler is atomic and entries are never removed, every later copy fails the membership check.”

The shorter version keeps the assumptions that make the argument work. Removing “atomic” or “never removed” would remove reasoning, not just words.

### A formula connected to its meaning

**Weak:** “Propagation delay: $t=d/v$. This is the formula that we use.”

**Better:** “A signal traveling a distance $d$ at constant speed $v$ has propagation time $t=d/v$. At a fixed propagation speed, doubling the distance doubles this time.”

The revision states the model and interprets the relationship. It does not confuse propagation speed with link bit rate.

### A precise explanation of a formal requirement

Suppose the source definition quantifies over every allowed adversary and requires advantage negligible in a parameter $\lambda$.

**Weak:** “The advantage is small. So it is secure. The parameter is important.”

**Better:** “The definition requires every allowed adversary's advantage to be negligible as $\lambda$ grows. A small advantage at one fixed parameter value does not establish that asymptotic requirement.”

The quantification and dependence on the parameter are part of the meaning. Smooth prose must preserve them.

## Revise the text before handing it back

Make a focused prose pass after drafting or substantive reorganization. Read the whole explanatory sequence, including the paragraphs around formulas and figures. Check what each paragraph teaches, whether the next sentence follows, whether references are clear and whether a prerequisite has been introduced before it is used. Rewrite weak passages; checking a box or reporting a character reduction is not a substitute.

Then compare the revision with the source and the student's draft: confirm that better flow has not strengthened a claim, erased a doubt or removed an essential case. If clarity would require a fact that the available material does not establish, mark the precise gap instead of inventing a bridge. For a small language correction, scale this review to the passage being edited.

The delivered note should contain the lesson's explanations, examples and open questions. Keep the agent's editorial process, tool activity and quality assessment in the brief handoff, rather than adding them to the student's study text.
