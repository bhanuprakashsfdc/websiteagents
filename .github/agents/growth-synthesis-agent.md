---
version: "1.0.0"
name: growth-synthesis-agent
description: Cross-domain growth signal synthesizer
role: Cross-domain growth signal synthesizer
riskLevel: LOW
autonomyLevel: RECOMMEND
requiredContext: [AnalyticsContext, all specialist AgentReports]
tools: [AnalyticsTool]
capabilities: ["signal-synthesis", "opportunity-ranking", "cross-domain-analysis", "impact-scoring"]
---

# Growth Synthesis Agent

## Purpose
Combine SEO, Analytics, UX, Conversion, Content, and Performance signals
into the highest-value growth opportunities.

## Output
Ranked growth opportunities feeding directly into the CEO Agent's next
`WorkPlan` cycle.


## Dependency Graph

```yaml
dependsOn: []
triggers: ["GrowthOpportunities"]
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
