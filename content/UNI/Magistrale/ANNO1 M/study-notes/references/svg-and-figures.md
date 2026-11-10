# SVG diagrams and source figures

Read this reference when a note needs visual work. Choose the figure's explanatory purpose before drawing; preserve what the source or student's example actually says.

## Choose what to show

| Learning task | Useful visual | Content to verify |
| --- | --- | --- |
| Architecture, network or lab | Nodes, interfaces, links and relevant layers | Logical versus physical connectivity; actual labels and direction |
| Algorithm or protocol | State changes, sequence diagram or trace | Guards, event order, sender/receiver identities and assumptions |
| Proof or reduction | Dependencies, cases, mapped objects or adversary interfaces | Direction of implications; what is given, constructed and concluded |
| Signals, spectra or geometry | Labeled conceptual diagram | Axis meaning, units and distinctions such as time versus distance |
| Quantitative result | Plot generated from data or a stated equation | Values, scales, units and provenance; do not invent measurements |

One diagram should explain one coherent relationship. Use multiple panels when comparing cases, with the same visual conventions. Do not replace a precise explanation with an attractive but ambiguous picture.

## Construct readable, portable SVGs

- Prefer native vector elements for these diagrams. Raster image generation is not needed for an editable SVG, protocol trace or source-figure extraction.
- Use `xmlns` and a `viewBox` with enough margin for text, arrowheads and captions. Let the embed control display width; keep aspect ratio stable. Use explicit coordinates and intentional line breaks rather than relying on browser wrapping.
- Give labels room. Size text for the note's actual embed width, not just a large preview. A modest set of readable font sizes and generous spacing is better than dense tiny labels. Start with the established course style when one exists.
- Use a portable system-font stack, explicit text colors, and a small consistent palette. Choose either an intentional opaque background or tested transparency. Avoid white `currentColor` text that disappears on a light page, and avoid assuming the reader's theme.
- Use contrast, labels, line styles or shapes together; color alone should not identify a failure, direction or category. Use the same symbol and color for the same concept across a figure.
- Draw connectors behind nodes and route them around labels. Set arrow-marker geometry so the arrowhead points at the intended endpoint without covering text. Avoid overlapping labels, clipped strokes, unexplained crossings and decorative shadows that obscure structure.
- Add a short SVG `title` and `desc` when useful for accessibility. Avoid external fonts, scripts, linked resources and `foreignObject` for ordinary study diagrams; a self-contained file is easier to render in Obsidian and exports.

### Small construction example

This is a starting pattern for two labeled nodes, not a mandatory layout or a domain model. Change the content, spacing and arrow meaning to match the actual lesson.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 220"
     role="img" aria-labelledby="example-title example-desc"
     font-family="Segoe UI, Arial, sans-serif">
  <title id="example-title">A message between two nodes</title>
  <desc id="example-desc">An arrow labeled message leads from A to B.</desc>
  <defs>
    <marker id="example-arrow" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0L10 5L0 10Z" fill="#2563eb"/>
    </marker>
  </defs>
  <rect width="800" height="220" rx="14" fill="#f8fafc"/>
  <path d="M240 110H560" stroke="#2563eb" stroke-width="2.5"
        marker-end="url(#example-arrow)"/>
  <rect x="60" y="65" width="180" height="90" rx="10"
        fill="#ffffff" stroke="#64748b" stroke-width="2"/>
  <rect x="560" y="65" width="180" height="90" rx="10"
        fill="#ffffff" stroke="#64748b" stroke-width="2"/>
  <text x="150" y="118" text-anchor="middle" font-size="24"
        fill="#0f172a">A</text>
  <text x="650" y="118" text-anchor="middle" font-size="24"
        fill="#0f172a">B</text>
  <text x="400" y="86" text-anchor="middle" font-size="20"
        fill="#334155">message</text>
</svg>
```

## Check the represented reasoning

Diagrams can introduce conceptual errors even when the prose is correct:

- In a shared time-axis trace, sends must precede their deliveries and each process's events must respect local order. If there is no common time scale, say so; do not accidentally imply one through precise alignment.
- Keep message identifiers, timestamps, states, queue contents and counter updates consistent with the algorithm and worked example. A crash may leave earlier messages in transit. A missing reply is not automatically proof of a crash.
- Label arrows by meaning: communication, implication, set inclusion, dependency and resource flow are different relations. Explain which direction is stronger or which set is contained when a hierarchy could be misread.
- Distinguish a topology from a routing decision, a logical connection from physical spans, and a schematic waveform from quantitative data. Label axes and units where applicable.
- For proofs and security reductions, distinguish the original problem, constructed instance, oracle access and conclusion. Do not draw a reverse implication or additional interface that the source does not establish.

These are checks to apply when relevant, not content to add to every note. If a diagram reveals an uncertain statement, flag that statement instead of redrawing it into an unsupported claim.

## Convert supplied diagrams without losing them

Inspect a supplied SVG or screenshot before editing. For inline SVG or SVG data URLs, decode according to the declared encoding (percent encoding or base64) and parse it into a normal `.svg` attachment in the existing course asset directory. Preserve its labels, geometry and meaning; make only necessary compatibility or legibility adjustments and inspect the result. Check XML escaping, math characters, text color and background after conversion.

Replace the inline payload with an Obsidian embed. Preserve the source image file when redrawing a screenshot. Keep a collapsible original reference if useful, rather than displaying two large versions of the same explanation in the main reading path. Record supplied/unknown, instructor-original and AI-redrawn provenance accurately; conversion alone does not establish authorship.

## Extract the right source figure

- Inspect the actual page or figure. A requested page may be a title while the intended architecture is on the next page. Select the intended content and state the correct reference.
- Identify the exact PDF edition and distinguish PDF pages from printed slide labels. Never derive these solely from an attachment's name.
- Extract or render the needed original figure without changing labels, data, equations or diagram content. A crop must preserve the necessary legend/context; do not re-create an instructor algorithm as a picture from memory.
- Use the available PDF workflow for page rendering/extraction. Use existing bundled rendering libraries or tools when possible; do not hardcode a particular machine's temporary runtime path into the skill.
- Name the attachment descriptively, such as `course-lNN-slide-PP-topic.png`, and place it near the relevant explanation with a short source caption or an unambiguous Sources entry. Link the note from the course index when applicable, so its assets are reachable through the normal navigation.
- Put optional original figures or long source galleries in collapsed callouts when they interrupt the explanation. Keep essential figures visible. Do not add every slide just because the deck is available.

## Render, inspect and integrate

1. Parse each new/changed SVG to catch malformed XML. Render it with an available SVG renderer, browser or vector tool; use source-page rendering for PDF figures. Save review previews outside course-note directories.
2. Open the rendered result. Check missing glyphs, cropped text, overlap, arrow direction, palette contrast and readable size. A contact sheet helps review several figures; inspect dense algorithms or doubtful details at sufficient resolution.
3. Compare the rendered labels and trace with the final note and inspected source. Fix the actual error, then re-render and re-inspect the changed figure. Do not claim visual review from XML validation alone.
4. Verify every final embed resolves to the intended unique file and renders at a reasonable note width. Preserve the originals and the asset/source distinction. If visual inspection is unavailable, disclose that limitation instead of reporting the figure as verified.

Deliver diagrams as working note attachments, not screenshots of code or huge data URLs. Keep detailed validation output in the work process; the note itself needs explanations and provenance, not an editing log.
