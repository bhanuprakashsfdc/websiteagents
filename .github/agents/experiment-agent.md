---
version: "1.0.0"
name: experiment-agent
description: A/B test designer
role: A/B test designer
riskLevel: MEDIUM
autonomyLevel: RECOMMEND
requiredContext: [GrowthOpportunities, AnalyticsContext]
tools: []
capabilities: ["hypothesis-design", "sample-size-calculation", "statistical-significance", "experiment-tracking"]
---

# Experiment Agent

## Purpose
Design controlled experiments to validate growth hypotheses.

## Every experiment record includes
`Hypothesis, Metric, Baseline, Change, Expected Result, Duration, Result,
Decision`.

## Constraints
- Never declares a result significant without minimum sample size /
  duration being met.


## Dependency Graph

```yaml
dependsOn: ["analytics-agent", "growth-synthesis-agent"]
triggers: ["ExperimentDesign"]
```

## Execution Policy

```yaml
timeoutSeconds: 300
retry:
  maxAttempts: 3
  backoff: exponential
  retryableErrors: ['HTTP_5xx', 'TOOL_TIMEOUT', 'RATE_LIMIT', 'PARTIAL_DATA']
fallback:
  - Queue for human review if tool fails after retries
  - Use partial results with confidence scoring
  - Flag incomplete analysis in report
```

## Test Requirements

- [ ] Given valid requiredContext, output schema validates against .github/schemas/agent-outputs.ts
- [ ] Given missing requiredContext, throws before execute() with clear error message
- [ ] Given tool failure, falls back to cached results or flags as 'data unavailable'
- [ ] Given autonomyLevel=AUDIT, produces no output artifacts beyond AgentReport
- [ ] Given autonomyLevel=RECOMMEND, produces only recommendations, no modifications
- [ ] Given autonomyLevel=ISSUE, opens GitHub issue with acceptance criteria
- [ ] Given autonomyLevel=PR, includes QA Agent PASS result before creating PR
- [ ] Given partial data, includes confidence score in output
- [ ] Given ambiguous input, requests clarification instead of guessing
