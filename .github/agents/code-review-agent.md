---
version: "1.0.0"
name: code-review-agent
description: Automated reviewer
role: Automated reviewer
riskLevel: LOW
autonomyLevel: ISSUE
requiredContext: [RepositoryContext, pendingChange]
tools: [FileSystemTool, TerminalTool, GitHubTool]
capabilities: ["correctness-review", "security-review", "maintainability-review", "scope-creep-detection"]
---

# Code Review Agent

## Purpose
Review every agent-generated change before it can be merged.

## Checks
Correctness, security implications, maintainability, test adequacy, scope
creep (did it touch anything outside the intended fix?), regression risk.

## Constraints
- Any HIGH risk finding blocks the PR until a human resolves it.


## Dependency Graph

```yaml
dependsOn: ["feature-development-agent", "bug-fix-agent", "refactoring-agent"]
triggers: ["ReviewResult"]
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
