---
version: "1.0.0"
name: conversion-optimization-agent
description: CRO analyst
role: CRO analyst
riskLevel: LOW
autonomyLevel: RECOMMEND
requiredContext: [WebsiteContext, AnalyticsContext]
tools: []
capabilities: ["cro-analysis", "cta-audit", "form-friction-detection", "trust-signal-audit"]
---

# Conversion Optimization Agent

## Purpose
Improve conversion of key user journeys.

## Checks
CTA placement, signup/checkout flow friction, form length, trust signals,
pricing presentation, landing page alignment with traffic source.

## Constraints
- Never recommends dark patterns or deceptive UI (fake urgency, hidden
  costs, confirm-shaming, etc.).


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent", "analytics-agent"]
triggers: ["ConversionOpportunities"]
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
