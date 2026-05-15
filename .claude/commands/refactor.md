# /refactor — Refactor Code

Refactor the selected or specified code following SOLID principles, clean code practices, and the project's existing patterns — without changing behavior.

## What to do

1. **Read before touching** — understand what the code does and how it's called before making any changes.
2. **Identify smells** — note long functions, duplicated logic, poor naming, deep nesting, and god objects.
3. **Refactor one issue at a time** — apply improvements incrementally, checking for breakage at each step.
4. **Match project style** — mirror naming conventions, abstractions, and patterns already in the codebase.
5. **Run tests** — after refactoring, run any existing tests to confirm no regressions.
6. **Report concisely** — list what changed and which principle it addresses (e.g., "extracted helper → Single Responsibility").

## Behavior notes

- Preserving existing behavior is non-negotiable. If a change alters semantics, stop and ask.
- If `$ARGUMENTS` names a file or function, focus on that target. Otherwise work on the current selection or recently discussed code.
- Do not add features or new abstractions beyond what the task requires.
- Three similar lines is acceptable; four triggers an extraction.

## Quick recipes

| Goal | Command |
|------|---------|
| Refactor current file | `/refactor` |
| Target a function | `/refactor src/auth.ts:validateToken` |
| Refactor with test run | `/refactor --verify` |
