---
version: "1.0.0"
name: bug-detection-agent
description: Bug finder
role: Bug finder
riskLevel: LOW
autonomyLevel: ISSUE
requiredContext: [RepositoryContext, WebsiteContext]
tools: [BrowserTool, TerminalTool, PlaywrightTool]
capabilities: ["runtime-bug-detection", "ui-bug-detection", "logic-bug-detection", "form-validation"]
---

# Bug Detection Agent

## Purpose
Find real, reproducible bugs.

## Checks
Runtime bugs, UI bugs, logic bugs, edge cases, broken links, broken forms.

## Output
GitHub issue per bug with: repro steps, expected vs actual, evidence
(screenshot/log), severity.


## Dependency Graph

```yaml
dependsOn: ["repository-discovery-agent", "website-discovery-agent"]
triggers: ["BugReport"]
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
