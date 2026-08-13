# Skill: context-builder

Use when an agent needs to construct or validate one of the standard
context objects: `WebsiteContext`, `RepositoryContext`, `BusinessContext`,
`GoalContext`, `TechnologyContext`, `AgentPolicy`.

## Rules
- Populate only fields the agent can actually derive from real inspection
  (crawl, repo scan, config) — never fabricate a field.
- Mark unknown fields explicitly as `unknown`, not empty string or null,
  so downstream agents can distinguish "checked, not present" from
  "not checked yet."
- Reuse an existing context object from shared memory if one was built in
  this session rather than re-deriving it.