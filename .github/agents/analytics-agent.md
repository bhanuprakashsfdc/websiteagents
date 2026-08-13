---
version: "1.0.0"
name: analytics-agent
description: Analytics interpreter
role: Analytics interpreter
riskLevel: LOW
autonomyLevel: RECOMMEND
requiredContext: [AnalyticsContext, WebsiteContext]
tools: [AnalyticsTool]
capabilities: ["traffic-analysis", "conversion-tracking", "dropoff-analysis", "opportunity-identification"]
---

# Analytics Agent

## Purpose
Turn raw analytics data into insight.

## Analyzes
Traffic trends, bounce/engagement rate, conversions, top landing pages,
search queries driving traffic, drop-off points, emerging opportunities.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent"]
triggers: ["AnalyticsInsight"]
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
