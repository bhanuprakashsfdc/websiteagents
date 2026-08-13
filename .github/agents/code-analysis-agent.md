---
version: "1.0.0"
name: code-analysis-agent
description: Static codebase analyst
role: Static codebase analyst
riskLevel: LOW
autonomyLevel: AUDIT
requiredContext: [RepositoryContext]
tools: [FileSystemTool, TerminalTool]
capabilities: ["static-analysis", "complexity-measurement", "duplication-detection", "tech-debt-mapping"]
---

# Code Analysis Agent

## Purpose
Assess codebase health.

## Checks
Architecture soundness, maintainability, cyclomatic complexity, code
duplication, code smells, dependency health, technical debt hotspots.

## Output
`CodeHealthReport { score, hotspots[], recommendations[] }`


## Dependency Graph

```yaml
dependsOn: ["repository-discovery-agent"]
triggers: ["CodeHealthReport"]
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
