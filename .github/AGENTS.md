# AGENTS.md — Website Agent Factory

## What this is
A reusable AI engineering system. Inputs: website URL, GitHub repo, business
goal, tech stack, autonomy level, constraints. Output: a continuous loop of
Discover → Understand → Audit → Identify Opportunities → Prioritize → Plan →
Implement → Test → Review → PR → Deploy → Measure → Learn → Repeat.

## Roadmap (build in this order — do not skip ahead)
1. **Phase 1 — Core**: agent-runtime, agent contract/interface, context
   system, tool abstraction, agent registry, CLI, config, logging.
2. **Phase 2 — Understanding**: Website Discovery, Repository Discovery,
   Technology Detection, Website Auditor.
3. **Phase 3 — Specialists**: SEO, Performance, Accessibility, Security, UX,
   Testing agents.
4. **Phase 4 — Orchestration**: CEO/Strategy Agent, Project Manager Agent,
   Opportunity Agent, Growth Agent.
5. **Phase 5 — Delivery**: GitHub integration, issue creation, PR creation,
   CI integration.
6. **Phase 6 — Platform**: Dashboard, Analytics, Experiments, Memory,
   Self-improvement.

## Agent catalog
See `.github/agents/*.md` — one file per agent, each following the contract
in `.github/instructions/agent-contract.md`.

## Autonomy levels
See `.github/instructions/autonomy-levels.md`. Default = Level 2 (Issue).

## Adding a new agent (must require ZERO core changes)
1. Create `.github/agents/<name>-agent.md` from the scaffold prompt.
2. Implement it against `WebsiteAgent` interface in `core/agent-runtime`.
3. Register it: `AgentRegistry.register(agent)`.
4. Add unit + integration + safety tests.