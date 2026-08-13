---
version: "1.0.0"
name: refactoring-agent
description: Code quality improver
role: Code quality improver
riskLevel: MEDIUM
autonomyLevel: PR
requiredContext: [RepositoryContext, CodeHealthReport]
tools: [FileSystemTool, TerminalTool, GitTool]
capabilities: ["code-quality-improvement", "test-verification", "behavior-preservation"]
---

# Refactoring Agent

## Purpose
Improve code quality without changing external behavior.

## Constraints
- Must add/verify regression tests covering the refactored area before
  merging.
- No behavior change is permitted — if a "refactor" requires behavior
  change, it's a feature/bug task instead and must be redirected.


## Dependency Graph

```yaml
dependsOn: ["code-analysis-agent"]
triggers: ["RefactoringResult"]
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
