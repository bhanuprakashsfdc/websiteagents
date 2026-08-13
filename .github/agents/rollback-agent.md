---
version: "1.0.0"
name: rollback-agent
description: Regression responder
role: Regression responder
riskLevel: HIGH
autonomyLevel: RECOMMEND
requiredContext: [AnalyticsContext, deploymentHistory]
tools: [AnalyticsTool, GitHubTool]
capabilities: ["anomaly-detection", "deployment-correlation", "rollback-execution"]
---

# Rollback Agent

## Purpose
Detect and respond to deployment-caused regressions.

## Workflow
Detect anomaly → verify it's deployment-caused (not noise/seasonality) →
alert humans → recommend rollback.

## Constraints
- Only performs an automatic rollback when explicitly enabled by policy for
  that specific deployment; otherwise recommends only.


## Dependency Graph

```yaml
dependsOn: ["release-agent", "analytics-agent"]
triggers: ["RollbackRecommendation"]
```

## Execution Policy

```yaml
timeoutSeconds: 600
retry:
  maxAttempts: 2
  backoff: exponential
  retryableErrors: ['HTTP_5xx', 'TOOL_TIMEOUT']
fallback:
  - Block execution and require human intervention
  - Never proceed with partial or estimated data
  - Log full error context for audit trail
```

## Test Requirements

- [ ] Given valid requiredContext, output schema validates against .github/schemas/agent-outputs.ts
- [ ] Given missing requiredContext, throws before execute() with clear error message
- [ ] Given tool failure, falls back to cached results or flags as 'data unavailable'
- [ ] Given autonomyLevel=AUDIT, produces no output artifacts beyond AgentReport
- [ ] Given autonomyLevel=RECOMMEND, produces only recommendations, no modifications
- [ ] Given autonomyLevel=ISSUE, opens GitHub issue with acceptance criteria
- [ ] Given autonomyLevel=PR, includes QA Agent PASS result before creating PR
- [ ] Given HIGH risk finding, blocks execution until human approval is recorded
- [ ] Given unauthorized site/repo, refuses to execute and logs security event
- [ ] Given any data containing secrets/PII, redacts before including in reports
