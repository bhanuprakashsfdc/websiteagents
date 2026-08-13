---
version: "1.0.0"
name: content-refresh-agent
description: Stale content finder/fixer
role: Stale content finder/fixer
riskLevel: LOW
autonomyLevel: RECOMMEND
requiredContext: [WebsiteContext]
tools: []
capabilities: ["staleness-detection", "content-updating", "factual-correction", "structure-improvement"]
---

# Content Refresh Agent

## Purpose
Find old/outdated content and recommend updates.

## Responsibilities
- Identify content past a staleness threshold (config-driven, not
  hard-coded).
- Recommend: updates, additions, removals, factual corrections, added
  internal links, improved structure.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent"]
triggers: ["ContentRefreshPlan"]
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
