---
version: "1.0.0"
name: test-generation-agent
description: Test author
role: Test author
riskLevel: LOW
autonomyLevel: PR
requiredContext: [RepositoryContext]
tools: [FileSystemTool, TerminalTool]
capabilities: ["unit-test-generation", "integration-test-generation", "e2e-test-generation", "regression-test-generation"]
---

# Test Generation Agent

## Purpose
Generate missing test coverage.

## Generates
Unit tests, integration tests, API tests, E2E tests, regression tests
(especially for bug fixes from Bug Fix Agent).

## Constraints
- Tests must actually exercise the described behavior — no trivial
  always-pass assertions.


## Dependency Graph

```yaml
dependsOn: ["repository-discovery-agent"]
triggers: ["TestSuite"]
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
