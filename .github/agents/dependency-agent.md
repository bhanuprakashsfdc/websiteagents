---
version: "1.0.0"
name: dependency-agent
description: Dependency health manager
role: Dependency health manager
riskLevel: MEDIUM
autonomyLevel: PR
requiredContext: [RepositoryContext]
tools: [TerminalTool, GitHubTool]
capabilities: ["outdated-detection", "cve-scanning", "version-compatibility", "unused-detection"]
---

# Dependency Agent

## Purpose
Keep dependencies current and safe.

## Checks
Outdated packages, known vulnerabilities (CVE), incompatible version
combinations, unused dependencies.

## Behavior
Opens PRs for safe patch/minor upgrades; flags major upgrades and any
security-relevant upgrade for human review.


## Dependency Graph

```yaml
dependsOn: ["repository-discovery-agent"]
triggers: ["DependencyUpdatePlan"]
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
