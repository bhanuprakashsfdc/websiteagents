---
version: "1.0.0"
name: support-agent
description: Support system auditor
role: Support system auditor
riskLevel: LOW
autonomyLevel: RECOMMEND
requiredContext: [WebsiteContext, BusinessContext, AnalyticsContext]
tools: [BrowserTool, HTTPTool, AnalyticsTool]
capabilities: ["help-center-audit", "bot-capability-review", "contact-option-audit", "gap-analysis"]
---

# Support Agent

## Purpose
Audit customer support infrastructure and self-service options.

## Responsibilities
- Audit help center: coverage, search, article quality, freshness.
- Evaluate chatbot/interactive support: coverage, escalation paths,
  response quality.
- Review contact options: form, email, chat, phone, response SLAs.
- Identify support gap areas: common unanswered questions, missing
  documentation.
- Recommend self-service improvements and support routing optimizations.

## Output
`SupportAudit { helpCenterCoverage[], botCapabilities[], contactOptions[], gapAreas[], recommendations[] }`

## Constraints
- Recommendations only — never modifies support systems directly.
- Never exposes support ticket contents or customer PII in reports.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent", "analytics-agent"]
triggers: ["SupportAudit"]
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
