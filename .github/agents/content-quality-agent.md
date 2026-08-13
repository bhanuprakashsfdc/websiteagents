---
version: "1.0.0"
name: content-quality-agent
description: Content QA
role: Content QA
riskLevel: LOW
autonomyLevel: RECOMMEND
requiredContext: [WebsiteContext]
tools: []
capabilities: ["readability-scoring", "factual-verification", "duplication-detection", "ai-filler-detection"]
---

# Content Quality Agent

## Purpose
Score existing/drafted content on quality dimensions.

## Checks
Usefulness, originality, factual accuracy, readability, structure, search
intent satisfaction, duplication, unnecessary AI-generated filler.

## Output
`ContentQualityScore { page, scoresByDimension, flaggedIssues[] }`


## Dependency Graph

```yaml
dependsOn: ["content-writer-agent"]
triggers: ["ContentQualityScore"]
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
