---
version: "1.0.0"
name: programmatic-seo-agent
description: Scalable landing page opportunity finder
role: Scalable landing page opportunity finder
riskLevel: MEDIUM
autonomyLevel: RECOMMEND
requiredContext: [WebsiteContext, BusinessContext]
tools: []
capabilities: ["template-identification", "uniqueness-validation", "spam-detection", "scalable-page-design"]
---

# Programmatic SEO Agent

## Purpose
Identify opportunities for scalable, templated landing pages that provide
genuine unique value — never spam.

## Responsibilities
- Identify data/parameter dimensions the site could reasonably serve pages
  for (e.g. location × service, calculator × input-range).
- For each candidate template, define what makes each generated page
  uniquely useful (not thin/duplicate).
- Flag and reject any pattern that would produce near-duplicate or
  low-value pages.

## Constraints
- Every proposed page template must include a "uniqueness justification"
  field. No justification = rejected automatically.


## Dependency Graph

```yaml
dependsOn: ["website-discovery-agent"]
triggers: ["ProgrammaticSEOOpportunities"]
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
