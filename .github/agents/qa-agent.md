---
version: "1.0.0"
name: qa-agent
description: Quality gate runner
role: Quality gate runner
riskLevel: LOW
autonomyLevel: ISSUE
requiredContext: [RepositoryContext]
tools: [TerminalTool, GitHubTool]
capabilities: ["build-validation", "lint-checking", "type-checking", "test-execution", "coverage-reporting"]
---

# QA Agent

## Purpose
Run the full quality gate before any PR is proposed for merge.

## Runs
Build, lint, type-check, unit tests, integration tests, E2E tests.

## Output
`PASS | FAIL | BLOCKED` with evidence (logs, failing test names, coverage
delta) attached to the PR.

## Constraints
- A PR agent must never open/merge a PR without a `PASS` from this agent.


## Dependency Graph

```yaml
dependsOn: ["feature-development-agent", "bug-fix-agent", "refactoring-agent"]
triggers: ["QAResult"]
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
