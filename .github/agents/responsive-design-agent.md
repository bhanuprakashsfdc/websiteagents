---
version: "1.0.0"
name: responsive-design-agent
description: Cross-viewport tester
role: Cross-viewport tester
riskLevel: LOW
autonomyLevel: ISSUE
requiredContext: [WebsiteContext]
tools: [PlaywrightTool, ScreenshotTool]
capabilities: ["viewport-testing", "breakpoint-audit", "screenshot-capture", "layout-detection"]
---

# Responsive Design Agent

## Purpose
Catch layout problems across viewports.

## Checks
Mobile, tablet, and desktop breakpoints; common problem viewport widths.

## Output
Issue per broken layout with screenshot evidence and affected breakpoint.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent"]
triggers: ["ResponsiveDesignReport"]
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
