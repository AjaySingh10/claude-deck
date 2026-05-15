export type Category = 'code' | 'testing' | 'docs' | 'git' | 'security' | 'devops' | 'data';
export type Source = 'anthropic' | 'community' | 'popular';

export interface CuratedSkill {
  id: string;
  name: string;
  title: string;
  description: string;
  category: Category;
  source: Source;
  content: string;
}

export const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: 'code',     label: 'Code',     icon: '⌨️' },
  { id: 'testing',  label: 'Testing',  icon: '🧪' },
  { id: 'docs',     label: 'Docs',     icon: '📄' },
  { id: 'git',      label: 'Git',      icon: '🔀' },
  { id: 'security', label: 'Security', icon: '🔒' },
  { id: 'devops',   label: 'DevOps',   icon: '🚀' },
  { id: 'data',     label: 'Data',     icon: '🗄️' },
];

export const CURATED_SKILLS: CuratedSkill[] = [

  // ── CODE ──────────────────────────────────────────────────────────────────

  {
    id: 'refactor',
    name: 'refactor',
    title: 'Refactor Code',
    description: 'Refactor selected code using SOLID principles and project conventions without changing behavior.',
    category: 'code',
    source: 'anthropic',
    content: `# /refactor — Refactor Code

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
- If \`$ARGUMENTS\` names a file or function, focus on that target. Otherwise work on the current selection or recently discussed code.
- Do not add features or new abstractions beyond what the task requires.
- Three similar lines is acceptable; four triggers an extraction.

## Quick recipes

| Goal | Command |
|------|---------|
| Refactor current file | \`/refactor\` |
| Target a function | \`/refactor src/auth.ts:validateToken\` |
| Refactor with test run | \`/refactor --verify\` |
`,
  },

  {
    id: 'explain',
    name: 'explain',
    title: 'Explain Code',
    description: 'Explain complex code clearly — what it does, why it exists, and any non-obvious gotchas.',
    category: 'code',
    source: 'anthropic',
    content: `# /explain — Explain Code

Give a clear, layered explanation of the selected or specified code: what it does, why it exists, and any non-obvious behaviors a maintainer should know.

## What to do

1. **One-sentence summary** — what this code accomplishes, in plain language.
2. **Walk through the logic** — narrate the key steps without restating every line; focus on the *why* not the *what*.
3. **Highlight non-obvious parts** — edge cases, implicit invariants, performance trade-offs, or surprising dependencies.
4. **Mention the context** — how this fits into the surrounding system if you can infer it from the codebase.
5. **Flag risks** — note anything that looks fragile, deprecated, or likely to confuse future maintainers.

## Behavior notes

- Calibrate depth to the code's complexity. A 3-line helper needs 2 sentences; a 200-line state machine needs structure.
- If \`$ARGUMENTS\` is a path or symbol name, explain that target. Otherwise explain the current selection.
- Do not suggest changes unless asked — this skill is read-only.
- Use code snippets sparingly; prefer prose for explanations.
`,
  },

  {
    id: 'optimize',
    name: 'optimize',
    title: 'Optimize Performance',
    description: 'Profile and optimize a function or module for speed or memory — with before/after measurements.',
    category: 'code',
    source: 'popular',
    content: `# /optimize — Optimize Performance

Identify and fix performance bottlenecks in the specified code. Prioritize algorithmic improvements over micro-optimizations.

## What to do

1. **Identify the bottleneck** — look for O(n²) loops, redundant computations, unnecessary allocations, or blocking I/O.
2. **Propose the fix** — explain the approach before touching code (algorithm swap, caching, batching, parallelism, etc.).
3. **Implement** — apply the improvement, preserving all existing behavior and tests.
4. **Measure if possible** — add a quick benchmark or timing log so the improvement is visible.
5. **Document the trade-off** — note any increased complexity, memory use, or correctness constraints introduced.

## Behavior notes

- Algorithmic improvements (O(n²) → O(n log n)) are always preferred over language-level tweaks.
- Do not optimize code that isn't a bottleneck — premature optimization is a bug.
- If \`$ARGUMENTS\` names a file, function, or "hot path", focus there. Otherwise analyze the current selection.
- Keep readability; add a comment only if the optimization would otherwise be mystifying.
`,
  },

  {
    id: 'debug',
    name: 'debug',
    title: 'Debug Issue',
    description: 'Systematically diagnose a bug — reproduce, isolate, explain root cause, and apply a minimal fix.',
    category: 'code',
    source: 'anthropic',
    content: `# /debug — Debug Issue

Systematically diagnose the described bug or error: reproduce it, isolate the root cause, and apply the minimal fix.

## What to do

1. **Understand the symptom** — restate what the user described (actual vs. expected behavior, error message, stack trace).
2. **Reproduce** — identify the smallest input or code path that triggers the bug.
3. **Isolate** — trace execution to the first point where state diverges from expectation.
4. **Explain the root cause** — one clear sentence: what assumption was wrong, what invariant was violated.
5. **Apply the fix** — make the minimal change that addresses the root cause without introducing new assumptions.
6. **Verify** — run tests or suggest a quick manual check to confirm the fix works.

## Behavior notes

- Fix the root cause, not the symptom. Masking errors with try/catch or null guards is not a fix.
- If the bug is in a dependency or external system, say so and suggest a workaround, not a vendored patch.
- If \`$ARGUMENTS\` contains an error message or stack trace, use that as the starting point.
- Ask clarifying questions only if you genuinely cannot proceed — show your reasoning first.
`,
  },

  // ── TESTING ───────────────────────────────────────────────────────────────

  {
    id: 'test-gen',
    name: 'test-gen',
    title: 'Generate Tests',
    description: 'Generate comprehensive unit/integration tests with edge cases for the selected code.',
    category: 'testing',
    source: 'anthropic',
    content: `# /test-gen — Generate Tests

Generate comprehensive tests for the selected or specified code using the project's existing test framework and conventions.

## What to do

1. **Detect the test framework** — check package.json, existing test files, or config (Jest, Vitest, pytest, Go test, etc.).
2. **Identify test cases** — cover: happy path, boundary values, invalid inputs, empty/null cases, and error handling.
3. **Write the tests** — use the project's existing test style, file naming, and assertion patterns.
4. **Place the file** — follow the project's convention (co-located \`*.test.ts\`, \`__tests__/\` folder, or \`*_test.go\`).
5. **Note coverage gaps** — flag any scenarios that are hard to test without mocks or integration setup.

## Behavior notes

- Generate real, runnable tests — not pseudocode or placeholder TODOs.
- Prefer testing behavior over implementation details; avoid mocking internals unless necessary.
- If the code has no existing tests, establish a pattern others can follow.
- If \`$ARGUMENTS\` names a file or function, target that. Otherwise test the current selection.

## Quick recipes

| Goal | Command |
|------|---------|
| Generate tests for a file | \`/test-gen src/utils/parser.ts\` |
| Generate only edge-case tests | \`/test-gen --edge-cases\` |
`,
  },

  {
    id: 'test-fix',
    name: 'test-fix',
    title: 'Fix Failing Tests',
    description: 'Diagnose and fix failing tests — distinguish implementation bugs from incorrect test expectations.',
    category: 'testing',
    source: 'popular',
    content: `# /test-fix — Fix Failing Tests

Diagnose why the tests are failing and apply the correct fix — either to the implementation or to the test itself.

## What to do

1. **Run the failing tests** — use the project's test command to get the current failure output.
2. **Classify the failure** — is this a broken implementation, an outdated test expectation, a missing mock, or an environment issue?
3. **Fix the right side** — fix the implementation if the behavior is wrong; fix the test only if the expectation was incorrect.
4. **Never delete failing tests** — comment with a TODO and open a follow-up if a test must be skipped temporarily.
5. **Run tests again** — confirm all previously failing tests now pass and no new failures were introduced.

## Behavior notes

- Changing a test to make it pass is only valid if the original expectation was wrong.
- Flaky tests (intermittent failures) need a root cause analysis, not a retry loop.
- If \`$ARGUMENTS\` names a specific test file or test name, focus there. Otherwise fix all currently failing tests.
`,
  },

  // ── DOCS ──────────────────────────────────────────────────────────────────

  {
    id: 'docstring',
    name: 'docstring',
    title: 'Add Docstrings',
    description: 'Add JSDoc, docstrings, or inline comments to functions — focusing on the "why" not the "what".',
    category: 'docs',
    source: 'anthropic',
    content: `# /docstring — Add Docstrings

Add documentation comments to the selected or specified functions, classes, or modules using the project's established format.

## What to do

1. **Detect the doc format** — check existing comments for JSDoc, Python docstrings (Google/NumPy/reStructuredText), Go doc comments, or Rustdoc.
2. **Write the doc comment** — include: one-line summary, parameter descriptions (type + purpose), return value, and any thrown exceptions.
3. **Focus on the "why"** — document intent, assumptions, and non-obvious constraints. Skip restating the function name in prose.
4. **Skip trivial functions** — simple getters/setters and self-evident one-liners do not need documentation.
5. **Preserve existing docs** — update stale comments rather than deleting them.

## Behavior notes

- Do not document every line — only document at the function/class/module boundary.
- If \`$ARGUMENTS\` names a file, add docs to all exported symbols. Otherwise document the current selection.
- Write in the language of the codebase — English unless the project uses another language.
`,
  },

  {
    id: 'readme-gen',
    name: 'readme-gen',
    title: 'Generate README',
    description: 'Generate or refresh a README with setup, usage, and API docs based on the actual codebase.',
    category: 'docs',
    source: 'popular',
    content: `# /readme-gen — Generate README

Generate or update the project README based on what the code actually does — not a generic template.

## What to do

1. **Scan the project** — read package.json/pyproject.toml, entry points, and existing docs to understand the project.
2. **Write the README** — include: project name + one-line description, prerequisites, installation, quick-start example, configuration, and API overview (if a library).
3. **Generate real examples** — pull actual function signatures, CLI flags, and config keys from the code.
4. **Add badges** if CI, coverage, or npm/PyPI configs are present.
5. **Output to README.md** at the repo root (or update it in-place if it exists).

## Behavior notes

- Write for the first-time user: they have cloned the repo and need to run it in under 5 minutes.
- Do not invent features that don't exist in the code.
- Keep it concise — long READMEs are not read.
`,
  },

  {
    id: 'api-docs',
    name: 'api-docs',
    title: 'Document API',
    description: 'Generate OpenAPI/Markdown documentation for REST or RPC endpoints from route definitions.',
    category: 'docs',
    source: 'community',
    content: `# /api-docs — Document API Endpoints

Generate API documentation for the project's HTTP endpoints, RPC methods, or SDK exports.

## What to do

1. **Find the routes** — locate route definitions (Express, FastAPI, Django, gRPC proto files, etc.).
2. **Extract the contract** — for each endpoint: method, path, path params, query params, request body schema, response schema, and error codes.
3. **Generate docs** — produce either an OpenAPI 3.0 YAML spec or clean Markdown tables, depending on what the project already uses.
4. **Include examples** — add at least one request/response example per endpoint.
5. **Place the output** — write to \`docs/api.md\` or \`openapi.yaml\` at the repo root.

## Behavior notes

- Infer schemas from TypeScript types, Pydantic models, or Zod schemas where possible.
- If authentication is required, document the auth scheme (Bearer, API key, OAuth).
- If \`$ARGUMENTS\` names a router file or prefix, document only that subset.
`,
  },

  // ── GIT ───────────────────────────────────────────────────────────────────

  {
    id: 'commit-msg',
    name: 'commit-msg',
    title: 'Generate Commit Message',
    description: 'Generate a Conventional Commits message from staged changes with a clear "why" in the body.',
    category: 'git',
    source: 'anthropic',
    content: `# /commit-msg — Generate Commit Message

Generate a well-structured commit message for the current staged changes following the project's commit conventions.

## What to do

1. **Read the diff** — run \`git diff --staged\` to see exactly what's changing.
2. **Detect the convention** — check recent \`git log --oneline\` to see if the project uses Conventional Commits, gitmoji, or a custom format.
3. **Write the message** — subject line (imperative, ≤72 chars), blank line, then a body explaining *why* the change was made (not what — the diff shows that).
4. **Reference issues** — if there's a ticket number in the branch name or context, add \`Closes #123\` in the footer.
5. **Output the message only** — ready to paste into \`git commit -m\`.

## Behavior notes

- Subject line must be imperative: "Add feature" not "Added feature" or "Adding feature".
- Body explains motivation, not implementation. "Fixes crash when user logs out while request is in flight" not "Changed null check in handler".
- If \`$ARGUMENTS\` provides a ticket number or context, incorporate it.
`,
  },

  {
    id: 'pr-desc',
    name: 'pr-desc',
    title: 'Generate PR Description',
    description: 'Generate a PR title, summary, and test plan from commits and diff since the base branch.',
    category: 'git',
    source: 'anthropic',
    content: `# /pr-desc — Generate PR Description

Generate a complete pull request title, summary, and test plan from the current branch's changes.

## What to do

1. **Gather changes** — run \`git log main..HEAD --oneline\` and \`git diff main...HEAD\` to understand what's on this branch.
2. **Write the PR title** — short (≤70 chars), imperative, descriptive.
3. **Write the summary** — 2-4 bullets covering: what changed, why, and any architectural decisions made.
4. **Write the test plan** — checklist of manual or automated steps a reviewer can run to verify correctness.
5. **Note breaking changes** — flag any API changes, schema migrations, or env var additions in a "Breaking Changes" section.

## Behavior notes

- Focus on *why* the change was made, not a line-by-line rehash of the diff.
- If the branch has a ticket/issue prefix (e.g., \`feat/PROJ-123-...\`), link it.
- Output formatted Markdown suitable for GitHub/GitLab PR body.
`,
  },

  {
    id: 'changelog',
    name: 'changelog',
    title: 'Generate Changelog',
    description: 'Generate a CHANGELOG entry for a release from commits since the last tag.',
    category: 'git',
    source: 'community',
    content: `# /changelog — Generate Changelog

Generate a CHANGELOG.md entry for the next release based on commits since the last version tag.

## What to do

1. **Find the last tag** — run \`git describe --tags --abbrev=0\` to get the last release.
2. **Collect commits** — run \`git log <last-tag>..HEAD --pretty=format:"%s %h"\` for all commits since then.
3. **Categorize changes** — group into: Added, Changed, Fixed, Removed, Security (Keep a Changelog format).
4. **Write the entry** — use the format \`## [Unreleased] - YYYY-MM-DD\` at the top of CHANGELOG.md.
5. **Prepend to the file** — insert above the previous entry, preserving all history.

## Behavior notes

- Skip merge commits and chore/ci commits unless they describe a user-visible change.
- Use the project's version numbering (semver implied by Conventional Commits types).
- If \`$ARGUMENTS\` provides a version number (e.g., \`1.4.0\`), use it instead of "Unreleased".
`,
  },

  // ── SECURITY ──────────────────────────────────────────────────────────────

  {
    id: 'security-audit',
    name: 'security-audit',
    title: 'Security Audit',
    description: 'Audit code for OWASP Top 10 vulnerabilities: injection, XSS, broken auth, IDOR, and more.',
    category: 'security',
    source: 'anthropic',
    content: `# /security-audit — Security Audit

Audit the specified code or the current branch's changes for security vulnerabilities, focusing on the OWASP Top 10.

## What to do

1. **Check for injection** — SQL/NoSQL injection, command injection, LDAP injection. Verify all user input is parameterized or properly escaped.
2. **Check authentication & session management** — token expiry, secret storage (no hardcoded keys), session fixation, JWT validation.
3. **Check access control** — IDOR, missing authorization checks, privilege escalation paths.
4. **Check for XSS** — reflected, stored, and DOM-based. Verify output encoding and Content Security Policy.
5. **Check data exposure** — sensitive fields in logs, verbose error messages, unencrypted PII.
6. **Check dependencies** — run \`npm audit\` / \`pip-audit\` / \`cargo audit\` to surface known CVEs.
7. **Report findings** — for each issue: severity (Critical/High/Medium/Low), location (file:line), description, and recommended fix.

## Behavior notes

- Report findings even if they require specific conditions to exploit — severity should reflect worst-case impact.
- Do not auto-fix security issues without user confirmation; some fixes have behavior implications.
- If \`$ARGUMENTS\` names a file, audit that file. Otherwise audit all changed files on the current branch.
`,
  },

  {
    id: 'secrets-scan',
    name: 'secrets-scan',
    title: 'Scan for Secrets',
    description: 'Scan for hardcoded API keys, passwords, tokens, and credentials across the codebase.',
    category: 'security',
    source: 'community',
    content: `# /secrets-scan — Scan for Hardcoded Secrets

Scan the codebase for hardcoded secrets — API keys, passwords, tokens, certificates, and private keys.

## What to do

1. **Search for patterns** — look for: strings matching \`sk-\`, \`AKIA\`, \`ghp_\`, \`eyJ\` (JWT), \`BEGIN PRIVATE KEY\`, and variable names like \`password\`, \`secret\`, \`api_key\`, \`token\` assigned literal strings.
2. **Check config files** — inspect \`.env\`, \`config.yml\`, \`appsettings.json\`, and any file not in \`.gitignore\`.
3. **Check git history** — run \`git log -p --all -S <pattern>\` for secrets that may have been committed and removed.
4. **Check test fixtures** — test files often contain real credentials copied for convenience.
5. **Report findings** — file path, line number, type of secret, and recommended remediation (rotate + move to env var or secrets manager).

## Behavior notes

- Flag only likely real secrets, not placeholder strings like \`YOUR_API_KEY_HERE\`.
- Do not print the secret value in the report — truncate to the first 6 characters followed by \`***\`.
- If \`$ARGUMENTS\` names a path, scan only there. Otherwise scan the entire working tree.
`,
  },

  // ── DEVOPS ────────────────────────────────────────────────────────────────

  {
    id: 'dockerfile',
    name: 'dockerfile',
    title: 'Generate Dockerfile',
    description: 'Generate a production-ready, multi-stage Dockerfile optimized for size and build cache.',
    category: 'devops',
    source: 'popular',
    content: `# /dockerfile — Generate Dockerfile

Generate a production-ready Dockerfile for this project, using multi-stage builds to minimize final image size.

## What to do

1. **Detect the runtime** — identify language, runtime version, and package manager from lock files (package-lock.json, poetry.lock, go.sum, Cargo.lock).
2. **Write multi-stage build** — build stage installs deps and compiles; runtime stage copies only the artifacts needed to run.
3. **Pin base image versions** — use specific digest or tag (e.g., \`node:20-alpine\`, not \`node:latest\`).
4. **Optimize layer caching** — copy dependency manifests first, install deps, then copy source. This way a source change doesn't invalidate the dep cache.
5. **Run as non-root** — add a \`USER\` instruction with a non-privileged user in the runtime stage.
6. **Add health check** — include a \`HEALTHCHECK\` if the service exposes HTTP.
7. **Add .dockerignore** — generate \`.dockerignore\` alongside the Dockerfile to exclude node_modules, .git, etc.

## Behavior notes

- Prefer \`alpine\` or \`distroless\` base images for smaller attack surface.
- Use \`COPY --chown\` to avoid permission issues.
- If \`$ARGUMENTS\` specifies a port or entry command, use it. Otherwise infer from package.json scripts or main entry point.
`,
  },

  {
    id: 'ci-setup',
    name: 'ci-setup',
    title: 'Generate CI Workflow',
    description: 'Generate a GitHub Actions workflow for lint, test, and build with caching and concurrency.',
    category: 'devops',
    source: 'popular',
    content: `# /ci-setup — Generate CI Workflow

Generate a GitHub Actions workflow (or other CI config) that runs lint, test, and build with proper caching.

## What to do

1. **Detect the stack** — read package.json, pyproject.toml, or go.mod to identify language, test command, and lint command.
2. **Write the workflow** — create \`.github/workflows/ci.yml\` with jobs for: lint, test, and build.
3. **Add caching** — cache node_modules, pip, or Go module cache keyed on the lock file hash.
4. **Add concurrency guard** — cancel in-progress runs on the same branch to avoid wasted compute.
5. **Run on correct triggers** — \`push\` to main, \`pull_request\` to main, and optionally \`workflow_dispatch\`.
6. **Add status badge** — output the Markdown badge snippet for the README.

## Behavior notes

- Prefer \`ubuntu-latest\` as the runner unless the project requires macOS or Windows.
- Use pinned action versions (e.g., \`actions/checkout@v4\`) for security.
- If \`$ARGUMENTS\` names a CI provider (gitlab, circle, bitbucket), generate that format instead of GitHub Actions.
`,
  },

  {
    id: 'code-review',
    name: 'code-review',
    title: 'Review Code',
    description: 'Review code for correctness, style, performance, and maintainability — with prioritized findings.',
    category: 'code',
    source: 'anthropic',
    content: `# /code-review — Review Code

Review the specified code or current branch diff for correctness, style, performance, and maintainability. Produce a prioritized finding list.

## What to do

1. **Read the full context** — understand what the code is supposed to do before judging it.
2. **Check correctness** — logic errors, off-by-one bugs, null/undefined handling, incorrect assumptions.
3. **Check style** — naming consistency, function length, unnecessary nesting, dead code.
4. **Check performance** — O(n²) patterns, redundant queries, missing indexes, blocking calls.
5. **Check security** — injection vectors, exposed secrets, missing auth checks, insecure defaults.
6. **Prioritize findings** — label each as Critical / High / Medium / Low. Explain the impact.
7. **Suggest fixes** — for each High+ finding, provide a concrete code snippet or approach.

## Behavior notes

- Do not rewrite the entire file — focus on the most impactful changes.
- Distinguish between "must fix" and "nice to have" findings.
- If \`$ARGUMENTS\` names a file or PR diff, review that. Otherwise review the current selection or latest diff.
`,
  },

  {
    id: 'type-annotate',
    name: 'type-annotate',
    title: 'Add Type Annotations',
    description: 'Add TypeScript or Python type annotations to untyped code without changing behavior.',
    category: 'code',
    source: 'community',
    content: `# /type-annotate — Add Type Annotations

Add accurate type annotations to the specified code using the project's type system (TypeScript, Python mypy/pyright).

## What to do

1. **Detect the type system** — TypeScript, Python with mypy/pyright, or Go (already typed — note this).
2. **Infer types from usage** — trace how values flow through the code to determine correct types.
3. **Annotate function signatures first** — parameter types and return types before internal variables.
4. **Use precise types** — prefer \`string[]\` over \`any[]\`, \`Record<string, User>\` over \`object\`.
5. **Introduce type aliases** — if a shape appears more than once, define an \`interface\` or \`type\`.
6. **Avoid \`any\`** — if a type is truly unknown, use \`unknown\` and add a narrowing guard.

## Behavior notes

- Do not change runtime behavior — types are annotations only.
- If a genuine type mismatch is found, flag it rather than silently casting.
- If \`$ARGUMENTS\` names a file, annotate all exported functions. Otherwise annotate the current selection.
`,
  },

  // ── TESTING ───────────────────────────────────────────────────────────────

  {
    id: 'e2e-gen',
    name: 'e2e-gen',
    title: 'Generate E2E Tests',
    description: 'Generate Playwright or Cypress end-to-end tests for user flows in the current app.',
    category: 'testing',
    source: 'popular',
    content: `# /e2e-gen — Generate E2E Tests

Generate end-to-end tests for the specified user flow using the project's E2E framework.

## What to do

1. **Detect the framework** — check for Playwright (\`playwright.config.*\`) or Cypress (\`cypress.config.*\`).
2. **Identify the flow** — parse \`$ARGUMENTS\` as a user journey (e.g., "sign up → verify email → dashboard").
3. **Write the test** — cover: happy path, invalid inputs, loading states, and error states.
4. **Use page objects** — if the project has a page-object pattern, follow it; otherwise create one.
5. **Add assertions** — assert URL, visible text, element state, and network requests where relevant.
6. **Place the file** — follow the project's E2E directory convention (\`e2e/\`, \`cypress/e2e/\`, \`tests/\`).

## Behavior notes

- Use \`data-testid\` selectors over CSS classes or XPath — they survive UI refactors.
- Do not hard-code sleep() — use framework waitFor/expect polling instead.
- If \`$ARGUMENTS\` names a page or route, generate tests for that page's critical flows.
`,
  },

  {
    id: 'test-coverage',
    name: 'test-coverage',
    title: 'Improve Test Coverage',
    description: 'Identify untested code paths and generate targeted tests to raise coverage.',
    category: 'testing',
    source: 'community',
    content: `# /test-coverage — Improve Test Coverage

Analyze the specified file or module for untested paths and generate tests to cover them.

## What to do

1. **Run coverage** — execute \`npx jest --coverage\`, \`pytest --cov\`, or \`go test -cover\` to get the baseline.
2. **Identify gaps** — find uncovered lines, branches (if/else), and error paths.
3. **Prioritize** — focus on business-critical paths and error handling over trivial getters.
4. **Write targeted tests** — one test per uncovered branch, named to describe the scenario.
5. **Re-run coverage** — confirm the new tests raise coverage on the target file.

## Behavior notes

- 100% coverage is not the goal — meaningful coverage is. Skip generated code, migrations, and trivial wrappers.
- If \`$ARGUMENTS\` names a file, target that file's coverage. Otherwise analyze the whole project.
`,
  },

  // ── DOCS ──────────────────────────────────────────────────────────────────

  {
    id: 'adr',
    name: 'adr',
    title: 'Write Architecture Decision Record',
    description: 'Document an architectural decision as an ADR with context, options considered, and rationale.',
    category: 'docs',
    source: 'community',
    content: `# /adr — Write Architecture Decision Record

Create a well-structured Architecture Decision Record (ADR) for the decision described in \`$ARGUMENTS\`.

## What to do

1. **Understand the decision** — parse \`$ARGUMENTS\` for the topic (e.g., "switch from REST to GraphQL").
2. **Write the ADR** using this structure:
   - **Title** — short imperative (e.g., "Use PostgreSQL for primary storage")
   - **Status** — Proposed / Accepted / Deprecated / Superseded
   - **Context** — the forces at play that make this decision necessary
   - **Decision** — the change we are making and why
   - **Options considered** — 2-3 alternatives with brief pros/cons
   - **Consequences** — what becomes easier, what becomes harder
3. **Save to** \`docs/adr/NNN-<slug>.md\` following the project's existing numbering.

## Behavior notes

- Be concise — an ADR is a decision log, not a design doc. Aim for under 400 words.
- Write in past tense for Accepted ADRs ("We chose..."), present for Proposed.
- If relevant ADRs already exist in the project, reference them.
`,
  },

  // ── GIT ───────────────────────────────────────────────────────────────────

  {
    id: 'conflict-resolve',
    name: 'conflict-resolve',
    title: 'Resolve Merge Conflicts',
    description: 'Analyze and resolve git merge conflicts, preserving intent from both sides.',
    category: 'git',
    source: 'popular',
    content: `# /conflict-resolve — Resolve Merge Conflicts

Find and resolve all merge conflict markers in the working tree, preserving the correct intent from both sides.

## What to do

1. **List conflicts** — run \`git diff --name-only --diff-filter=U\` to find all conflicted files.
2. **For each conflict**:
   - Read both \`<<<<<<< HEAD\` and \`>>>>>>> branch\` sides in full context.
   - Understand what each side was trying to achieve.
   - Produce a merged result that satisfies both intents — not just picking one side.
3. **Explain each resolution** — one line per file: what you kept and why.
4. **Stage resolved files** — run \`git add\` on each resolved file.
5. **Run tests** — confirm the resolution didn't break anything.

## Behavior notes

- Never silently discard one side without analysis. If the intent is unclear, ask.
- Flag conflicts where both sides modified the same logic differently — these need human judgment.
- If \`$ARGUMENTS\` names a specific file, resolve only that file's conflicts.
`,
  },

  {
    id: 'release-notes',
    name: 'release-notes',
    title: 'Generate Release Notes',
    description: 'Write user-facing release notes from commits and PRs since the last version tag.',
    category: 'git',
    source: 'community',
    content: `# /release-notes — Generate Release Notes

Generate polished, user-facing release notes for the next version from commits and PR titles since the last tag.

## What to do

1. **Find the base** — run \`git describe --tags --abbrev=0\` for the last tag.
2. **Collect changes** — \`git log <tag>..HEAD --pretty=format:"%s (%h)"\`.
3. **Translate to user language** — convert technical commit messages into plain benefits ("Fixed crash on logout" not "null-deref in auth handler").
4. **Group into sections**: ✨ New Features, 🐛 Bug Fixes, ⚡ Performance, 🔒 Security, 💥 Breaking Changes.
5. **Write in Markdown** — formatted for GitHub Releases or a CHANGELOG entry.
6. **If \`$ARGUMENTS\` provides a version number**, use it in the header.

## Behavior notes

- Omit purely internal changes (CI, deps, test fixes) unless they affect the user.
- For breaking changes, include a migration note showing what changed and how to update.
`,
  },

  // ── SECURITY ──────────────────────────────────────────────────────────────

  {
    id: 'dep-audit',
    name: 'dep-audit',
    title: 'Audit Dependencies',
    description: 'Scan dependencies for known CVEs and outdated packages, with upgrade recommendations.',
    category: 'security',
    source: 'popular',
    content: `# /dep-audit — Audit Dependencies

Scan the project's dependency tree for known vulnerabilities and critically outdated packages.

## What to do

1. **Run the audit tool** — \`npm audit\`, \`pip-audit\`, \`cargo audit\`, \`bundle audit\`, or \`go list -m -json all\` depending on the stack.
2. **Parse the output** — extract all High and Critical CVEs.
3. **For each finding**: package name, installed version, fixed version, CVE ID, and a one-line description of the vulnerability.
4. **Check for major version outdatedness** — flag packages more than 2 major versions behind.
5. **Recommend fixes** — provide the exact command to upgrade each package (\`npm install pkg@latest\`, etc.).
6. **Warn about breaking changes** — for major version bumps, check the package's CHANGELOG for breaking changes.

## Behavior notes

- Separate "fix available" from "no fix yet" vulnerabilities.
- Do not auto-upgrade without user confirmation — major version bumps can break the project.
- If \`$ARGUMENTS\` names a specific package, focus the audit there.
`,
  },

  // ── DEVOPS ────────────────────────────────────────────────────────────────

  {
    id: 'helm-chart',
    name: 'helm-chart',
    title: 'Generate Helm Chart',
    description: 'Generate a production-ready Helm chart for a Kubernetes deployment with values, probes, and RBAC.',
    category: 'devops',
    source: 'community',
    content: `# /helm-chart — Generate Helm Chart

Generate a production-ready Helm chart for deploying this service to Kubernetes.

## What to do

1. **Detect service type** — infer from the codebase: HTTP service, worker, cron job, or stateful set.
2. **Generate chart structure**:
   - \`Chart.yaml\` — name, description, version
   - \`values.yaml\` — image, replicas, resources, env vars, ingress config
   - \`templates/deployment.yaml\` — with liveness/readiness probes
   - \`templates/service.yaml\`
   - \`templates/ingress.yaml\` (if HTTP)
   - \`templates/hpa.yaml\` (horizontal pod autoscaler)
   - \`templates/serviceaccount.yaml\` + RBAC if needed
3. **Set resource limits** — include sensible default CPU/memory requests and limits.
4. **Add health checks** — infer the health endpoint from the codebase (e.g., \`/health\`, \`/api/health\`).

## Behavior notes

- Use \`{{ .Values.* }}\` for all environment-specific values — nothing hardcoded.
- If \`$ARGUMENTS\` specifies a namespace or image registry, use it.
- Prefer \`apps/v1\` Deployment over older API versions.
`,
  },

  {
    id: 'terraform-mod',
    name: 'terraform-mod',
    title: 'Generate Terraform Module',
    description: 'Generate a Terraform module for the described infrastructure with variables, outputs, and state config.',
    category: 'devops',
    source: 'community',
    content: `# /terraform-mod — Generate Terraform Module

Generate a Terraform module for the infrastructure described in \`$ARGUMENTS\`.

## What to do

1. **Understand the requirement** — parse \`$ARGUMENTS\` (e.g., "S3 bucket with versioning and lifecycle rules").
2. **Generate module files**:
   - \`main.tf\` — the core resources
   - \`variables.tf\` — all configurable values with descriptions and defaults
   - \`outputs.tf\` — useful outputs (ARN, URL, ID)
   - \`versions.tf\` — required Terraform and provider versions pinned
3. **Follow best practices** — use data sources over hardcoded IDs, tag all resources, enable encryption at rest.
4. **Add a usage example** in a comment block at the top of \`main.tf\`.

## Behavior notes

- Default to AWS unless \`$ARGUMENTS\` specifies GCP or Azure.
- Never put credentials in Terraform files — use variable references or provider env vars.
- For stateful resources (RDS, S3), add \`lifecycle { prevent_destroy = true }\`.
`,
  },

  {
    id: 'incident-report',
    name: 'incident-report',
    title: 'Write Incident Report',
    description: 'Generate a structured post-mortem / incident report with timeline, root cause, and action items.',
    category: 'devops',
    source: 'community',
    content: `# /incident-report — Write Incident Report

Draft a structured post-mortem (incident report) for the incident described in \`$ARGUMENTS\`.

## What to do

1. **Structure the report**:
   - **Summary** — one paragraph: what happened, impact, duration
   - **Timeline** — bullet list of events with timestamps (use relative times if exact times unknown)
   - **Root Cause** — the single underlying technical cause (not the symptom)
   - **Contributing Factors** — secondary conditions that made the impact worse
   - **Detection** — how was it found? (monitoring alert, user report, etc.)
   - **Resolution** — what fixed it?
   - **Action Items** — 3-5 concrete follow-up tasks with owners and due dates
2. **Use blameless language** — focus on systems and processes, not individuals.
3. **Save to** \`docs/incidents/YYYY-MM-DD-<slug>.md\`.

## Behavior notes

- Action items must be specific and measurable ("Add PagerDuty alert for queue depth > 1000" not "improve monitoring").
- Severity classification: SEV1 (total outage), SEV2 (major degraded), SEV3 (minor/partial).
`,
  },

  // ── DATA ──────────────────────────────────────────────────────────────────

  {
    id: 'migration-gen',
    name: 'migration-gen',
    title: 'Generate DB Migration',
    description: 'Generate a reversible database migration script for the described schema change.',
    category: 'data',
    source: 'popular',
    content: `# /migration-gen — Generate Database Migration

Generate an \`up\` and \`down\` migration for the schema change described in \`$ARGUMENTS\`.

## What to do

1. **Detect the migration framework** — Flyway, Liquibase, Alembic, Rails, Prisma, Drizzle, or raw SQL.
2. **Name the file** — follow the project's naming convention (e.g., \`V20240115__add_user_role.sql\` or \`20240115_add_user_role.py\`).
3. **Write the \`up\` migration** — the schema change with all constraints.
4. **Write the \`down\` migration** — the exact reversal (DROP, ALTER to previous state).
5. **Check for safe migration** — flag if the change is unsafe on a live table (adding NOT NULL without default, dropping columns, renaming).
6. **Suggest a backfill** — if the migration adds a column with existing rows, include the UPDATE statement.

## Behavior notes

- Never drop columns in the same migration as the code change — deploy code first (backward-compatible), then drop.
- If the table has >1M rows, note that the migration may require \`CONCURRENTLY\` or online schema change tooling.
`,
  },

  {
    id: 'seed-gen',
    name: 'seed-gen',
    title: 'Generate Seed Data',
    description: 'Generate realistic seed/fixture data for development and testing databases.',
    category: 'data',
    source: 'community',
    content: `# /seed-gen — Generate Seed / Fixture Data

Generate realistic seed data for the specified table or model, suitable for development and automated testing.

## What to do

1. **Find the schema** — locate the table definition, ORM model, or Zod/Pydantic schema.
2. **Generate realistic data** — use domain-appropriate values (real-looking names, valid emails, proper enums).
3. **Respect constraints** — foreign keys reference seeded parent records; unique fields do not repeat.
4. **Output format** — match the project's seeding pattern:
   - SQL: \`INSERT INTO...\` statements
   - JS/TS: factory function or array literal compatible with the ORM
   - Python: fixtures dict or factory_boy factories
5. **Volume** — generate enough rows to exercise pagination and edge cases (typically 20-50 per entity).

## Behavior notes

- Never use production data as a base — generate synthetic data only.
- If \`$ARGUMENTS\` names a model or table, seed that entity and its required dependencies.
- For date fields, distribute values across a realistic range rather than all using today.
`,
  },

  {
    id: 'sql-gen',
    name: 'sql-gen',
    title: 'Generate SQL',
    description: 'Translate a plain-English query description into correct, optimized SQL for the project\'s dialect.',
    category: 'data',
    source: 'popular',
    content: `# /sql-gen — Generate SQL

Translate the described data need into a correct, readable SQL query for the project's database dialect.

## What to do

1. **Identify the schema** — find table definitions in migration files, ORM models, or schema dumps.
2. **Understand the request** — parse \`$ARGUMENTS\` as a plain-English description of what data is needed.
3. **Write the query** — produce valid SQL that retrieves exactly what was described, no more.
4. **Optimize** — add appropriate indexes (as comments/suggestions) if the query would do a full table scan on a large table.
5. **Add comments** — one-line comment above complex JOINs or subqueries explaining intent.

## Behavior notes

- Default to the project's dialect (PostgreSQL, MySQL, SQLite, MSSQL) — infer from dependencies or config.
- Use CTEs instead of deeply nested subqueries for readability.
- Never use \`SELECT *\` — enumerate the columns explicitly.
- If the schema isn't found, ask the user to provide it rather than inventing table names.

## Examples

\`/sql-gen all users who placed an order in the last 30 days and have not opted out of email\`
`,
  },

  {
    id: 'schema-doc',
    name: 'schema-doc',
    title: 'Document Schema',
    description: 'Generate a Markdown ERD-style reference of the database schema from migrations or ORM models.',
    category: 'data',
    source: 'community',
    content: `# /schema-doc — Document Database Schema

Generate a readable Markdown reference document from the project's database schema.

## What to do

1. **Locate schema sources** — find migration files (Alembic, Flyway, Rails migrations), ORM models (SQLAlchemy, Prisma, ActiveRecord, Drizzle), or raw SQL DDL.
2. **Extract tables** — for each table: name, columns (name + type + constraints), primary key, and foreign keys.
3. **Generate the doc** — produce a \`docs/schema.md\` with: one table per section, a column reference table, and relationship descriptions (has-many, belongs-to, many-to-many).
4. **Add a Mermaid ERD** — include a \`\`\`mermaid erDiagram\`\`\` block showing the entity relationships.
5. **Note indexes** — list non-obvious indexes and explain why they exist.

## Behavior notes

- Focus on tables with business logic — skip purely technical tables (migrations, sessions) unless asked.
- If \`$ARGUMENTS\` names a specific table or module, document only that scope.
`,
  },
];
