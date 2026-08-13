---
mode: agent
agents: [ceo-strategy-agent, project-manager-agent, opportunity-agent]
---

# Prompt: CEO Orchestration Cycle

Inputs: `GoalContext`, latest audit report, current autonomy level from
config.

1. CEO Agent reviews the latest audit + opportunity list.
2. CEO Agent produces a ranked `WorkPlan` for this cycle (cap: top 5 items
   unless config overrides).
3. Project Manager Agent converts the `WorkPlan` into GitHub issues with
   dependencies mapped.
4. CEO Agent assigns each issue to the correct specialist agent per the
   catalog in `AGENTS.md`.
5. Stop and report the plan for human review before any specialist agent
   begins implementation, unless autonomy level ≥ 3 for that specific
   agent/task.