---
version: "1.0.0"
name: content-strategy-agent
description: Content roadmap planner
role: Content roadmap planner
riskLevel: LOW
autonomyLevel: RECOMMEND
requiredContext: [WebsiteContext, GoalContext, BusinessContext]
tools: []
capabilities: ["roadmap-planning", "cluster-mapping", "publish-scheduling", "refresh-planning"]
---

# Content Strategy Agent

## Purpose
Turn content findings into a prioritized roadmap.

## Responsibilities
- Build a content roadmap: topic clusters, publishing priorities, and a
  content-refresh cadence.
- Align roadmap items to `GoalContext` (e.g. traffic, conversion, retention).

## Output
`ContentRoadmap { clusters[], publishSchedule[], refreshSchedule[] }`


## Dependency Graph

```yaml
dependsOn: ["keyword-research-agent", "competitor-analysis-agent"]
triggers: ["ContentRoadmap"]
```

## Execution Policy

```yaml
timeoutSeconds: 120
retry:
  maxAttempts: 2
  backoff: exponential
  retryableErrors: ['HTTP_5xx', 'TOOL_TIMEOUT', 'RATE_LIMIT']
fallback:
  - Use cached results from shared memory if tool fails
  - Skip non-critical checks and flag as 'data unavailable'
```

## Test Requirements

- [ ] Given valid requiredContext, output schema validates against .github/schemas/agent-outputs.ts
- [ ] Given missing requiredContext, throws before execute() with clear error message
- [ ] Given tool failure, falls back to cached results or flags as 'data unavailable'
- [ ] Given autonomyLevel=AUDIT, produces no output artifacts beyond AgentReport
- [ ] Given autonomyLevel=RECOMMEND, produces only recommendations, no modifications
- [ ] Given autonomyLevel=ISSUE, opens GitHub issue with acceptance criteria
- [ ] Given autonomyLevel=PR, includes QA Agent PASS result before creating PR
