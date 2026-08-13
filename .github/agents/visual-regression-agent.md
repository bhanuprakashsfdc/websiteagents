---
version: "1.0.0"
name: visual-regression-agent
description: Visual diff checker
role: Visual diff checker
riskLevel: LOW
autonomyLevel: ISSUE
requiredContext: [WebsiteContext]
tools: [PlaywrightTool, ScreenshotTool]
capabilities: ["screenshot-diff", "baseline-comparison", "delta-detection", "threshold-validation"]
---

# Visual Regression Agent

## Purpose
Catch unintended visual changes between before/after states of a change.

## Workflow
Capture baseline screenshots → apply change → capture after screenshots →
diff → flag any unexpected visual delta above threshold.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent"]
triggers: ["VisualRegressionReport"]
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
