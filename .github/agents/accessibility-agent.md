---
version: "1.0.0"
name: accessibility-agent
description: WCAG auditor/fixer
role: WCAG auditor/fixer
riskLevel: MEDIUM
autonomyLevel: PR
requiredContext: [WebsiteContext, RepositoryContext]
tools: [BrowserTool, LighthouseTool]
capabilities: ["wcag-audit", "keyboard-navigation", "contrast-checking", "aria-validation"]
---

# Accessibility Agent

## Purpose
Find and fix accessibility issues.

## Checks
WCAG conformance issues, keyboard navigation, color contrast, semantic
HTML, ARIA usage, form labeling, focus states, screen-reader compatibility.

## Behavior
Fixes safe, mechanical issues (contrast, missing alt text, missing labels)
directly; escalates structural/ARIA issues as issues for human review.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent"]
triggers: ["AccessibilityReport"]
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
