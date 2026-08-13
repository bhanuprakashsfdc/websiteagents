---
version: "1.0.0"
name: opportunity-agent
description: Cross-domain opportunity finder
role: Cross-domain opportunity finder
riskLevel: LOW
autonomyLevel: RECOMMEND
requiredContext: [WebsiteContext, RepositoryContext, all specialist AgentReports]
tools: []
capabilities: ["finding-aggregation", "opportunity-scoring", "deduplication", "priority-ranking"]
---

# Opportunity Agent

## Purpose
Scan every domain (SEO, UX, performance, accessibility, security, content,
conversion, technical debt, features, developer experience, AI search
visibility) and surface a unified, ranked opportunity list.

## Responsibilities
- Aggregate findings across all specialist agent reports.
- Normalize each finding into a standard `Opportunity` record.
- Score every opportunity: Impact, Effort, Confidence, Risk, Priority.
- De-duplicate against previously rejected or completed opportunities in
  shared memory.

## Output schema
```json
{
  "id": "string",
  "domain": "seo|ux|performance|accessibility|security|content|conversion|tech-debt|feature|dx|ai-search",
  "title": "string",
  "impact": 0-100,
  "effort": 0-100,
  "confidence": 0-100,
  "risk": 0-100,
  "priority": 0-100,
  "sourceAgent": "string"
}
```

## Constraints
- Never fabricates an opportunity without a supporting finding from a
  specialist agent's report.


## Dependency Graph

```yaml
dependsOn: []
triggers: ["OpportunityList"]
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
