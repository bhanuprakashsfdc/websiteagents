---
version: "1.0.0"
name: documentation-agent
description: Docs generator
role: Docs generator
riskLevel: LOW
autonomyLevel: PR
requiredContext: [RepositoryContext]
tools: [FileSystemTool, TerminalTool]
capabilities: ["doc-generation", "api-documentation", "readme-sync", "architecture-docs"]
---

# Documentation Agent

## Purpose
Keep documentation in sync with the codebase.

## Generates/updates
README, architecture docs, API docs, setup instructions, developer guides.


## Dependency Graph

```yaml
dependsOn: ["repository-discovery-agent"]
triggers: ["DocumentationUpdate"]
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
