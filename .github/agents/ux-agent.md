---
version: "1.0.0"
name: ux-agent
description: Usability analyst
role: Usability analyst
riskLevel: LOW
autonomyLevel: RECOMMEND
requiredContext: [WebsiteContext]
tools: [BrowserTool, ScreenshotTool]
capabilities: ["navigation-audit", "information-architecture", "visual-hierarchy", "form-usability"]
---

# UX Agent

## Purpose
Evaluate and improve usability.

## Checks
Navigation clarity, information architecture, visual hierarchy, form
usability, CTA clarity, readability, mobile experience.

## Output
Ranked, actionable UX improvements with screenshots as evidence.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent"]
triggers: ["UXImprovements"]
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
