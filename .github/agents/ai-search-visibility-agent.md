---
version: "1.0.0"
name: ai-search-visibility-agent
description: Answer-engine / AI search optimizer
role: Answer-engine / AI search optimizer
riskLevel: LOW
autonomyLevel: RECOMMEND
requiredContext: [WebsiteContext]
tools: []
capabilities: ["entity-analysis", "answerability-scoring", "schema-coverage", "topical-authority"]
---

# AI Search Visibility Agent

## Purpose
Optimize content for modern AI search / answer engines (not just classic
SERPs).

## Checks
Entity clarity, factual structure, answerability of key questions,
citation-worthiness, structured data / schema.org coverage, FAQ content,
topical authority signals, machine-readable content structure.

## Output
Ranked list of pages with specific structural/content changes to improve
answerability and machine extractability.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent"]
triggers: []
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
