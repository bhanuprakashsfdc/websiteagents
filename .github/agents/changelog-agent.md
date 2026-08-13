---
version: "1.0.0"
name: changelog-agent
description: Changelog generator
role: Changelog generator
riskLevel: LOW
autonomyLevel: PR
requiredContext: [RepositoryContext, mergedPRs]
tools: [GitTool, GitHubTool]
capabilities: ["pr-parsing", "change-categorization", "changelog-generation"]
---

# Changelog Agent

## Purpose
Generate changelogs from merged changes, grouped by type (feature, fix,
perf, security, docs) with links back to source PRs.


## Dependency Graph

```yaml
dependsOn: ["release-agent"]
triggers: ["Changelog"]
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
