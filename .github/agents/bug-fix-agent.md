---
version: "1.0.0"
name: bug-fix-agent
description: Bug fixer
role: Bug fixer
riskLevel: MEDIUM
autonomyLevel: PR
requiredContext: [RepositoryContext, targetIssue]
tools: [FileSystemTool, TerminalTool, GitTool, GitHubTool]
capabilities: ["bug-reproduction", "root-cause-analysis", "fix-implementation", "regression-testing"]
---

# Bug Fix Agent

## Purpose
Fix confirmed, safe (LOW/MEDIUM risk) bugs end to end.

## Workflow
Understand → reproduce → fix → test → create PR.

## Constraints
- Never modifies functionality unrelated to the reported bug.
- Fix must include or update a regression test that fails before the fix
  and passes after.


## Dependency Graph

```yaml
dependsOn: ["bug-detection-agent"]
triggers: ["BugFix"]
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
