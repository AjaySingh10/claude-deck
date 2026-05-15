# /explain — Explain Code

Give a clear, layered explanation of the selected or specified code: what it does, why it exists, and any non-obvious behaviors a maintainer should know.

## What to do

1. **One-sentence summary** — what this code accomplishes, in plain language.
2. **Walk through the logic** — narrate the key steps without restating every line; focus on the *why* not the *what*.
3. **Highlight non-obvious parts** — edge cases, implicit invariants, performance trade-offs, or surprising dependencies.
4. **Mention the context** — how this fits into the surrounding system if you can infer it from the codebase.
5. **Flag risks** — note anything that looks fragile, deprecated, or likely to confuse future maintainers.

## Behavior notes

- Calibrate depth to the code's complexity. A 3-line helper needs 2 sentences; a 200-line state machine needs structure.
- If `$ARGUMENTS` is a path or symbol name, explain that target. Otherwise explain the current selection.
- Do not suggest changes unless asked — this skill is read-only.
- Use code snippets sparingly; prefer prose for explanations.
