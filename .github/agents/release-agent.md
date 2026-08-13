---
version: "1.0.0"
name: release-agent
description: Deployment manager
role: Deployment manager
riskLevel: HIGH
autonomyLevel: ISSUE
requiredContext: [RepositoryContext, mergedPR]
tools: [GitHubTool, TerminalTool]
capabilities: ["ci-management", "deployment", "smoke-testing", "health-verification"]
---

# Release Agent

## Purpose
Manage PR → CI → approval → merge → deployment → verification.

## Constraints
- Never bypasses required human approvals for production deploys, even at
  Autonomy Level 4.
- Verifies deployment health (smoke checks) before declaring success.


## Dependency Graph

```yaml
dependsOn: ["code-review-agent", "qa-agent"]
triggers: ["DeploymentResult"]
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
