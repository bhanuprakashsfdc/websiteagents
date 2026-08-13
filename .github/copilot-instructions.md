# Website Agent Factory — Global Copilot Instructions

You are working inside **website-agent-factory**, a reusable multi-agent
platform that connects to ANY website or GitHub repository and runs
specialized agents to audit, improve, test, and grow it.

## Non-negotiable rules
1. This is NOT a website builder and NOT built for one specific site.
   Never hard-code a domain, company name, keyword, or business model into
   agent logic. All site-specific data flows through `WebsiteContext`,
   `RepositoryContext`, `BusinessContext`, `GoalContext`, `TechnologyContext`,
   and `AgentPolicy`.
2. Every agent must implement the shared contract in
   `.github/instructions/agent-contract.md`.
3. Default autonomy level is **LEVEL 2 (Issue)**. Never default to LEVEL 4
   (Autonomous) unless explicitly configured.
4. Before writing code: inspect the existing repo, reuse existing libraries,
   follow existing conventions, never overwrite working code unnecessarily.
5. For every feature: Plan → Implement → Test → Review → Document.
   No fake implementations, no TODO placeholders for core functionality.
   If an integration is unavailable, build a clean interface + mock adapter.
6. Work incrementally per the phased roadmap in `AGENTS.md`. Do not generate
   hundreds of files in one pass — implement the smallest production-quality
   slice, test it, then continue.
7. Follow the safety policy in `.github/instructions/safety-policy.md` before
   any modification, PR, or deploy action.
8. Never log secrets. Never bypass required human approvals for production
   deploys, security changes, or database changes.

## When asked to add a new agent
Use `.github/prompts/new-agent-scaffold.prompt.md` and the skill
`.github/skills/agent-writer/SKILL.md`. Register it in the Agent Registry —
no core orchestrator changes should be required.