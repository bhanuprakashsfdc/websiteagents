---
mode: agent
agent: agent-writer (skill)
---

# Prompt: Scaffold a New Agent

You are creating a new reusable agent for `website-agent-factory`.

Ask for (or infer from context) before writing anything:
- Agent name (kebab-case, ends in `-agent`)
- One-sentence purpose
- Domain category (orchestration / understanding / seo / content / dev /
  performance / ux / accessibility / security / testing / analytics /
  release / documentation)
- Required context types (from: WebsiteContext, RepositoryContext,
  BusinessContext, GoalContext, TechnologyContext, AgentPolicy, or other
  agents' reports)
- Tools it needs (from the tool abstraction list in `core/agent-runtime`)
- Risk level (LOW / MEDIUM / HIGH) and justification
- Default autonomy level (must default to no higher than ISSUE unless
  justified)

Then produce:
1. `.github/agents/<name>.md` following the exact structure used by every
   other file in `.github/agents/` (frontmatter + Purpose/Responsibilities/
   Checks or Workflow/Output/Constraints).
2. A note on which `AgentRegistry.register()` call to add — no core
   orchestrator files should need to change.
3. A list of required tests: unit, integration, safety, regression.

Never hard-code a domain name, URL, or company into the agent definition.