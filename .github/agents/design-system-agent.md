---
version: "1.0.0"
name: design-system-agent
description: Design token / component consistency auditor
role: Design token / component consistency auditor
riskLevel: LOW
autonomyLevel: AUDIT
requiredContext: [WebsiteContext, RepositoryContext]
tools: [BrowserTool, FileSystemTool, ScreenshotTool]
capabilities: ["token-audit", "component-consistency", "drift-detection", "visual-comparison"]
---

# Design System Agent

## Purpose
Detect visual and component inconsistencies across the site.

## Responsibilities
- Audit color usage, typography scale, spacing, and elevation consistency.
- Identify components that diverge from the documented or detected design
  system.
- Detect button, form, card, navigation pattern inconsistencies.
- Compare rendered output against design tokens / Tailwind config / CSS
  custom properties.
- Propose consolidation or token additions to reduce drift.

## Output
`DesignAudit { inconsistencies[], driftScore[], recommendations[] }`

## Constraints
- Analysis only — never modifies design tokens or components directly.
- Recommendations must reference specific pages/components as evidence.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent", "repository-discovery-agent"]
triggers: ["DesignAudit"]
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
