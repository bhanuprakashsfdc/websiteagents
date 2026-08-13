# Skill: agent-writer

Use when asked to create, extend, or restructure an agent `.md` file in
`.github/agents/`.

## Rules
- Always follow the frontmatter + section structure used by existing
  agent files (see `.github/instructions/agent-contract.md`).
- Never embed a hard-coded domain, URL, company name, or keyword.
- Always define: Purpose, Responsibilities/Checks, Output, Constraints.
- Always set the lowest `defaultAutonomy` that still lets the agent be
  useful; justify anything at PR or above.
- Cross-check the new agent doesn't duplicate an existing one — search
  `.github/agents/` first.