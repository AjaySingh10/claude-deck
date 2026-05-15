import { Category } from './curatedSkills';

export interface SkillTemplate {
  category: Category;
  starter: string;
}

export const TEMPLATES: Record<Category, SkillTemplate> = {
  code: {
    category: 'code',
    starter: `# /{name} — {title}

{description}

## What to do

1. **Read the code first** — understand the existing logic and patterns before making changes.
2. **[Describe step 2]**
3. **[Describe step 3]**
4. **Verify correctness** — run tests or perform a manual check after applying changes.

## Behavior notes

- Preserve existing behavior unless explicitly asked to change it.
- Match the project's style and naming conventions.
- If \`$ARGUMENTS\` names a file or function, target that. Otherwise work on the current selection.
`,
  },

  testing: {
    category: 'testing',
    starter: `# /{name} — {title}

{description}

## What to do

1. **Detect the test framework** — check package.json or existing test files (Jest, Vitest, pytest, Go test…).
2. **Identify test cases** — happy path, edge cases, invalid inputs, error conditions.
3. **Write the tests** — match the project's test file naming and assertion style.
4. **Run the suite** — confirm new tests pass and no regressions are introduced.

## Behavior notes

- Test behavior, not implementation details.
- Do not mock internals unless testing across a boundary requires it.
- If \`$ARGUMENTS\` names a file or function, generate tests for that target.
`,
  },

  docs: {
    category: 'docs',
    starter: `# /{name} — {title}

{description}

## What to do

1. **Survey existing docs** — check the current documentation format and style before adding anything.
2. **Gather facts from the code** — read actual function signatures, config keys, and entry points — do not invent.
3. **Write the documentation** — clear, concise, and accurate.
4. **Place the output** — follow project conventions for doc file location.

## Behavior notes

- Write for the reader who has no context, not for yourself.
- Do not document the obvious — focus on the "why" and the non-obvious constraints.
- If \`$ARGUMENTS\` names a specific scope, document only that.
`,
  },

  git: {
    category: 'git',
    starter: `# /{name} — {title}

{description}

## What to do

1. **Read the git state** — run \`git log\`, \`git diff\`, or \`git status\` as needed to understand what changed.
2. **[Describe the core action]**
3. **Format the output** — follow the project's commit/PR/changelog conventions found in existing history.

## Behavior notes

- Base output strictly on what is in the diff or log — do not invent descriptions.
- If \`$ARGUMENTS\` provides a version, ticket number, or context, incorporate it.
`,
  },

  security: {
    category: 'security',
    starter: `# /{name} — {title}

{description}

## What to do

1. **Scope the audit** — determine which files or code paths to examine.
2. **Check for [vulnerability type]** — describe what to look for and how to spot it.
3. **Check for [vulnerability type 2]** — describe what to look for.
4. **Report findings** — for each issue: severity (Critical/High/Medium/Low), file:line, description, and recommended fix.

## Behavior notes

- Report every finding, even if it requires specific conditions to exploit.
- Do not auto-fix security issues without user confirmation.
- Severity reflects worst-case impact assuming the vulnerability is reachable.
- If \`$ARGUMENTS\` names a file or scope, limit the audit to that.
`,
  },

  devops: {
    category: 'devops',
    starter: `# /{name} — {title}

{description}

## What to do

1. **Detect the stack** — read manifest files (package.json, pyproject.toml, go.mod) to identify runtime and dependencies.
2. **Generate the configuration** — produce the file with correct syntax and project-specific values.
3. **Optimize for production** — apply security hardening, caching, and non-root execution where applicable.
4. **Write the output** — create the file at the standard path for the project type.

## Behavior notes

- Pin versions — never use \`latest\` tags in generated configs.
- Add comments explaining non-obvious configuration choices.
- If \`$ARGUMENTS\` specifies a target environment or platform, use it.
`,
  },

  data: {
    category: 'data',
    starter: `# /{name} — {title}

{description}

## What to do

1. **Locate the schema** — find migration files, ORM models, or DDL in the project.
2. **Understand the request** — parse \`$ARGUMENTS\` for the data need or table scope.
3. **Generate the output** — produce correct, readable SQL or schema documentation.
4. **Optimize if needed** — suggest indexes or query improvements for large-table operations.

## Behavior notes

- Use the project's database dialect — infer from dependencies or config files.
- Never invent table or column names — use only what the schema defines.
- If the schema isn't found, ask the user to provide it.
`,
  },
};
